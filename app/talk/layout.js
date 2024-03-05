import CompanyFooter from "@/components/CompanyFooter";
import SideMenuLayout from "@/components/SideMenuLayout";

export default async function LogLayout({ children }) {
    // const session = await getServerSession();
    // if(!session){
    //     redirect("/login");
    // }
    const styles={
      footer:{
        "z-index": 1,
        "position": "absolute",
        "left": 0,
        "bottom": 0,
        "width": "100%",
        "height": "150px",
        "font-size": "0.8em",
      }
    };

    return (
      <>
        <SideMenuLayout />
        <div className="p-4 sm:ml-64">
          {/* <div className="p-4"> */}
          {children}
          <CompanyFooter />
        </div>
      </>
    );

}