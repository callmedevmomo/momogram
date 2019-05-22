import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRGMENT } from "../../../fragements";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post({ id });
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRGMENT);
      const likeCount = await prisma
        .likesConnection({
          where: { post: { id } }
        })
        .aggregate()
        .count();
      const files = await prisma.post({ id }).files();
      const user = await prisma.post({ id }).user();
      return {
        post,
        comments,
        likeCounts: likeCount,
        files
      };
    }
  }
};
