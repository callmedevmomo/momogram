import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) => {
      const { term } = args;

      console.log(term.length);
      if (term.length > 0) {
        const users = await prisma.users({
          where: {
            OR: [
              { name_contains: args.term },
              { firstName_contains: args.term },
              { lastName_contains: args.term }
            ]
          }
        });
        console.log(users);
        return users;
      } else {
        throw Error("Please enter a Something to search");
      }
    }
  }
};
