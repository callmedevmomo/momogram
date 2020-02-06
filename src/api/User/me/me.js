import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      // console.log("user Parent", _);
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts();
      return { user: userProfile, posts };
    }
    // },
    // // making Custom resolvers
    // User: {
    //   //parent gives me the parent resolvers
    //   // schema.js에서 모든  resolver를 merge ==> seeUser에서도 fullName 사용 가능
    //   fullName: parent => {
    //     return `${parent.firstName} ${parent.lastName}`;
    //   }
  }
};
