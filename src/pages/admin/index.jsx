import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Admin = () => {

  return (
    <section className="h-screen w-full">
      <div className="flex justify-between gap-x-5">
        <Sidebar />

        <div className="flex-1 h-screen bg-slate-300">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Admin;
