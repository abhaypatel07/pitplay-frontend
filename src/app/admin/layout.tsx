"use client"
import Sidebar from "../../ui/sidebar/sidebar";
import Navbar from "../../ui/navbar/navbar";
const layout = ({ children }: any) => {
  
  return (
    <div className="flex">
      <div className="w-2/6 md:w-1/6 lg:w-1/6 fixed h-full overflow-y-auto no-scrollbar">
        <Sidebar />
      </div>
      <div className="w-full h-screen  md:ml-auto md:w-5/6 p-2">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default layout
{/* <div className="flex">
        <div className="w-2/5 md:w-1/5 lg:w-1/5 fixed h-full overflow-y-auto">
          <Sidebar/>
          </div>
        <div className="w-4/5 ml-auto ">
           <Navbar/>
           {children}
        </div>
    </div> */}