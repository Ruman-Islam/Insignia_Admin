import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import profile__image from "../../assets/images/profile/profile.png";

import { useAppDispatch, useAppSelector } from "../../redux/hook";

import { useGetSystemConfigQuery } from "../../redux/features/dashboard/dashboardApi";
import { setSystemConfig } from "../../redux/features/dashboard/dashboardSlice";
import { Layout } from "antd";
import { Menu, Transition } from "@headlessui/react";
import Image from "../../components/UI/Image";
import { userMenuDropdownLinks } from "../../constants/menus";
import { HashLink } from "react-router-hash-link";
const { Content, Sider } = Layout;

const Admin = () => {
  const { data } = useGetSystemConfigQuery();
  const dispatch = useAppDispatch();
  const {
    auth: { user },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (data?.statusCode === 200) {
      dispatch(setSystemConfig(data?.data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Layout>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {

        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Sidebar />
      </Sider>

      <Layout id="sidebar" className="bg-[#EBF0F4]">
        <Content>
          <>
            <div className="px-4 xl:px-10 shadow-md flex items-center justify-end backdrop-blur-lg bg-white bg-opacity-20 z-50 sticky top-0">
              <Menu as="div" className="relative">
                <Menu.Button>
                  <div className="flex items-center mt-2">
                    <div className="w-10 h-10 rounded-full">
                      <Image
                        className="w-full h-full object-cover rounded-full"
                        src={
                          user?.photo?.cloudinaryUrl
                            ? user?.photo?.cloudinaryUrl
                            : profile__image
                        }
                      />
                    </div>
                  </div>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow py-2 border text-brand__detail__text">
                    {userMenuDropdownLinks.map(({ title, route, icon }) => (
                      <Menu.Item key={title}>
                        {title.includes("Logout") ? (
                          <button className="flex w-full items-center border-t duration-300 px-4 py-1 text-sm capitalize text-red-700 gap-x-1">
                            {icon}
                            {title}
                          </button>
                        ) : (
                          <HashLink
                            to={route}
                            className="flex w-full items-center duration-300 px-4 py-2 text-sm capitalize hover:bg-primary hover:text-white gap-x-1"
                          >
                            {icon}
                            {title}
                          </HashLink>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div
              style={{
                minHeight: 360,
                margin: "12px 16px 0",
              }}
            >
              <Outlet />
            </div>
          </>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
