import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //토큰 추출
  secretOrKey: process.env.JWT_SECRET //토큰 시크릿키
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate(
    "jwt", // Strategy 사용
    { sessions: false },
    // Call back (verifyUser의 return 값을 인자로 받는)
    (error, user) => {
      //verifyUser함수가 주는 (error,user) 정보
      if (user) {
        req.user = user;
      }
      next(); //인증 이후 다음 스텝 수행할 수 있는 함수 middlewares (server.js 에서 사용)
    }
  )(req, res, next); // arrow fn 함수를 리턴하고 (req,res,next)로 함수 실행

//  passport FLOW
// 토큰을 받아서 해석하고, 사용자를 찾고, 사용자가 존재한다면 req 객체에  사용자를 추가한 다음, graphQL 함수 실행

passport.use(new Strategy(jwtOptions, verifyUser)); //사용자 인증을 위한 토큰 추출 및 콜백
passport.initialize();
