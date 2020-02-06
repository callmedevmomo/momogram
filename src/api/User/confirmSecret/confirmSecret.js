import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args; // 관리자 패널에 입력하는 정보
      const user = await prisma.user({ email }); // prisma가 자체적으로 검열하는 과정
      if (user.loginSecret === secret) {
        // 입력한  secret이 Prisma 관리 패널에 있는 secret과 같다면..? Prisma 패널을 업데이트함
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            loginSecret: ""
          }
        });
        return generateToken(user.id); // 토큰을 생성 (prisma에 있는 id값)
      } else {
        throw Error("Wrong Email / SECRET Combination🤪");
      }
    }
  }
};
