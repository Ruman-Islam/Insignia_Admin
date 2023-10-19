import Dashboard from "../pages/dashboard";
import Faq from "../pages/faq";
import Photos from "../pages/photos";
import Questions from "../pages/questions";
import Reviews from "../pages/reviews";
import VideoScreen from "../pages/video";

const privateRoutes = [
  { name: "dashboard", Component: Dashboard },
  { path: "dashboard", name: "dashboard", Component: Dashboard },
  { path: "faq", name: "faq", Component: Faq },
  { path: "video", name: "video", Component: VideoScreen },
  { path: "questions", name: "questions", Component: Questions },
  { path: "reviews", name: "reviews", Component: Reviews },
  { path: "photos", name: "photos", Component: Photos },
];

export default privateRoutes;
