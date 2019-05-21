import { isAuthenticated } from "../../../middlewares";
import { IdStrategy } from "prisma-datamodel";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request; //get user
      try {
        const existingLike = await prisma.$exists.like({
          AND: [
            {
              user: { id: user.id }
            },
            {
              post: { id: postId }
            }
          ]
        });
        if (existingLike) {
          //TO Do
        } else {
          const newLike = await prisma.createLike({
            connect: { id: user.id },
            post: { connect: { id: postId } }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};
