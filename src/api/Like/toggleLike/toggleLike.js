import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      // use middlewares
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request; //get user
      const filterOptions = {
        AND: [
          {
            user: { id: user.id }
          },
          {
            post: { id: postId }
          }
        ]
      };
      try {
        // prisma.$exists
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
          await prisma.deleteManyLikes(filterOptions);
          //if like doesn't exist
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
