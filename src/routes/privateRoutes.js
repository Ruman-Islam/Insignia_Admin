import Dashboard from "../pages/dashboard";
import Faq from "../pages/faq";
import FaqEdit from "../pages/faq/components/FaqEdit";

const privateRoutes = [
  { name: "dashboard", Component: Dashboard },
  { path: "dashboard", name: "dashboard", Component: Dashboard },
  { path: "faq", name: "faq", Component: Faq },
  { path: "faq/faq-edit/:id", name: "faq-edit", Component: FaqEdit },
];

export default privateRoutes;
