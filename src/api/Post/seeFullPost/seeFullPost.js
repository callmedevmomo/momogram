import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGEMNET } from "../../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post({ id });
      //comments + fragment
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGEMNET);
      const likeCount = await prisma
        .likesConnection({
          where: {
            post: {
              id
            }
          }
        })
        .aggregate()
        .count();
      return { post, comments, likeCount };
    }
  }
};
