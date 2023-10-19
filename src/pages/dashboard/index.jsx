import Banner from "./components/Banner";
import BannerText from "./components/BannerText";
import WindowImages from "./components/WindowImages";

const Dashboard = () => {
  return (
    <div className="max-w-screen-xl mx-auto h-full bg-white rounded-md shadow-md flex flex-col lg:flex-row  gap-4 p-4">
      <Banner />
      <WindowImages />
      <BannerText />
    </div>
  );
};

export default Dashboard;
