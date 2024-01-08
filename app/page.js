"use client";

import { useSession } from "next-auth/react";
import SideMenuLayout from "@/components/SideMenuLayout";
import { useSelectedLayoutSegment, redirect } from "next/navigation";
import { Card, CardHeader, CardBody, Divider,Spinner } from "@nextui-org/react";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useAsyncList } from "@react-stately/data";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  // const session = await getServerSession();
  // if (!session) {
  //   redirect("/login");
  // }
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [countLog, setCountLog] = useState({sms:0, kakao:0});

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch("/api/monthLog", {
        signal,
      });
      let json = await res.json();
      json.data?.map((count) => {
        switch (count.type) {
          case "SMS":
            countLog.sms += count.count;
            break;
          case "KAKAO":
            countLog.kakao += count.count;
            break;
        }
      })
      setIsLoading(false);
      setCountLog({...countLog})
      console.log(countLog);
      return { items: json.data };
    },
  });

  useEffect(() => {
    if (session?.user === null) {
      alert("세션이 만료되었습니다");
      redirect("/login");
    }
  }, [session]);


  return (
    <>
      <SideMenuLayout />
      <div className="p-4 sm:ml-64">
        <div className="flex justify-center mb-4">알림톡 관리 페이지</div>
        <Card className="py-4 shadow-md mb-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="flex w-full justify-between">
              <h4 className="font-bold text-large">현재 남은 금액</h4>
              <span className="text-xl font-semibold flex">
                {session?.user.amount}
                <p>원</p>
              </span>
            </div>
          </CardHeader>
          <CardBody className="overflow-visible py-2"></CardBody>
        </Card>
        <Card className="py-4 shadow-md">
          <CardHeader className="pb-0 py-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large pb-4">
              이번달 메시지 사용통계
            </h4>
            <Divider />
          </CardHeader>
          <CardBody className="overflow-visible py-2 px-4">
            <div className="text-base font-semibold pb-4">
              <p className="float-left">총 사용건수</p>
              <p className="float-right">
                <b className="text-[#ff2121]">
                  {countLog.sms + countLog.kakao}
                </b>{" "}
                건
              </p>
            </div>
            <Divider />
            {isLoading ? (
              <Spinner label="Loading..." />
            ) : (
              <>
                <div className="flex justify-between font-semibold mt-4">
                  <span>SMS</span>
                  <span className="font-bold">{countLog.sms}건</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>MMS</span>
                  <span className="font-bold">0건</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>LMS</span>
                  <span className="font-bold">0건</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>알림톡 텍스트</span>
                  <span className="font-bold">{countLog.kakao}건</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>알림톡 이미지</span>
                  <span className="font-bold">0건</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>친구톡 텍스트</span>
                  <span className="font-bold">0건</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>친구톡 이미지</span>
                  <span className="font-bold">0건</span>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
