import Banner from "./components/Banner";
import BannerText from "./components/BannerText";
import WindowImages from "./components/WindowImages";
import { Divider } from "rsuite";

const Dashboard = () => {
  return (
    <div className="w-full h-full bg-white border p-4 rounded-md shadow-md">
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <Banner />
        <WindowImages />
      </div>
      <Divider />
      <BannerText />
    </div>
  );
};

export default Dashboard;
