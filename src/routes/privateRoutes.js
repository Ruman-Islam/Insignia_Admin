import Dashboard from "../pages/dashboard";

const privateRoutes = [
  { name: "dashboard", Component: Dashboard },
  { path: "dashboard", name: "dashboard", Component: Dashboard },
];

export default privateRoutes;
