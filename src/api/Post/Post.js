import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    //Post를 받을 때 마다 parent는 post parent
    // 요청한 id로 post에 (parent) like가 있는지를 확인
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          { post: { id } }
        ]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
