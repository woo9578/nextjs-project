import SideMenuLayout from "@/components/SideMenuLayout";
import { getServerSession } from "next-auth";
import { useSelectedLayoutSegment, redirect } from "next/navigation";

export default async function LogLayout({ children }) {
    // const session = await getServerSession();
    // if(!session){
    //     redirect("/login");
    // }

    return (
      <>
       <SideMenuLayout />
        <div className="p-4 sm:ml-64">
          {/* <div className="p-4"> */}
          {children}
        </div>
      </>
    );

}