import { Inter } from 'next/font/google'
import './globals.css'
import Script from "next/script";

import { getServerSession } from 'next-auth';
import  SessionProvider  from "@/utils/SessionProvider";
import ReactToast from '@/components/react-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "알림톡 관리 페이지",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
          <ReactToast />
        </SessionProvider>
      </body>
      <Script
        src="https://pg-web.nicepay.co.kr/v3/common/js/nicepay-pgweb.js"
        type="text/javascript"
      ></Script>
      <Script src="https://pay.nicepay.co.kr/v1/js/"></Script>
    </html>
  );
}
