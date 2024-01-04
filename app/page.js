// import {} from "next-auth/client"
import { getServerSession } from "next-auth";
import SideMenuLayout from "@/components/SideMenuLayout";
import { useSelectedLayoutSegment, redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <SideMenuLayout />
      <div className="p-4 sm:ml-64">
         <div className="flex justify-center">알림톡 관리 페이지</div>
      </div>
    </>
  );
}
