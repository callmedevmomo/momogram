import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport"; // verifyUser와 authenticateUser 사용
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});
server.express.use(logger("dev"));
server.express.use(authenticateJwt); // 서버에 전달되는 모든 요청은 authenticateJwt 함수를 거쳐 진행 (middleware)

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
