import AdminProfile from "../pages/admin-profile";
import AdminList from "../pages/admin-list";
import Dashboard from "../pages/dashboard";
import Faq from "../pages/faq-list";
import Photos from "../pages/photo-list";
import Questions from "../pages/question-list";
import Reviews from "../pages/review-list";
import VideoScreen from "../pages/video-list";
import CustomerList from "../pages/customer-list";
import CustomerDetail from "../pages/customer-detail";
import PackageList from "../pages/package-list";
import CreatePackage from "../pages/create-package";
import EditPackageScreen from "../pages/edit-package";

const privateRoutes = [
  { name: "dashboard", Component: Dashboard },
  { path: "dashboard", name: "dashboard", Component: Dashboard },
  { path: "faq", name: "faq", Component: Faq },
  { path: "video", name: "video", Component: VideoScreen },
  { path: "questions", name: "questions", Component: Questions },
  { path: "reviews", name: "reviews", Component: Reviews },
  { path: "photos", name: "photos", Component: Photos },
  { path: "admin-profile", name: "admin-profile", Component: AdminProfile },
  { path: "admin-list", name: "admin-list", Component: AdminList },
  { path: "customer-list", name: "customer-list", Component: CustomerList },
  { path: "package-list", name: "package-list", Component: PackageList },
  { path: "create-package", name: "create-package", Component: CreatePackage },
  {
    path: "edit-package/:id",
    name: "edit-package",
    Component: EditPackageScreen,
  },
  {
    path: "customer-detail/:id",
    name: "customer-detail",
    Component: CustomerDetail,
  },
];

export default privateRoutes;
