
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;


export default withAuth(async function middleware(req) {
    // const session = await getToken({ req, secret, raw: true });
    // const { pathname } = req.nextUrl;
    // console.log(session);
    // if(session === null && !pathname.startsWith("/login")){
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }
}, {
  pages: {
    signIn: "/login",
  },
  secret: process.env.SECRET,
  callbacks: {
    authorized: ({ req,token }) => {
      if(token === null){
        return false;
      }
      return true;
    },
  },
});

// export default async function middleware(req){
//     const session = await getToken({ req, secret, raw: true });
//     const { pathname } = req.nextUrl;
//     console.log(session);
//     if(session === null && !pathname.startsWith("/login")){
//         return NextResponse.redirect(new URL("/login", req.url));
//       }
// }

export const config = {
  matcher: [
    "/talk/pay",
    "/talk/payLog",
    "/talk/useLog",
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|.png).*)",
  ],
};
