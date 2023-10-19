import { FiMoreHorizontal } from "react-icons/fi";
import { useAppDispatch } from "../../../redux/hook";
import { setEditValue } from "../../../redux/features/dashboard/dashboardSlice";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Avatar, Tag, Rate, Switch } from "antd";

export const useColumn = (
  setEditOpen,
  handleDeleteOne,
  handleUpdateVisibility
) => {
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "AVATAR",
      width: 100,
      render: (item) =>
        item?.photoUrl ? (
          <img
            src={item?.photoUrl}
            className="w-10 h-10 rounded-full object-cover inline-block"
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
            }}
            size="large"
            gap={4}
          >
            {item?.photoUrl}
          </Avatar>
        ),
    },
    {
      title: "NAME",
      dataIndex: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      title: "RATING",
      width: 350,
      render: (item) => <Rate allowHalf disabled defaultValue={item?.rate} />,
    },
    {
      title: "SELECTED",
      width: 100,
      render: (item) => (
        <Switch
          size="small"
          checked={item.isSelected}
          onClick={() => handleUpdateVisibility(item.id)}
          className="bg-brand__heading__text"
        />
      ),
    },
    {
      title: "VIEW",
      render: (item) =>
        item?.isRead ? (
          <Tag color="success">seen</Tag>
        ) : (
          <Tag color="processing">unseen</Tag>
        ),
    },
    {
      title: "MORE",
      width: 100,
      render: (item) => (
        <Menu as="div" className="relative flex justify-center items-center">
          <Menu.Button>
            <FiMoreHorizontal size={20} />
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
            <Menu.Items className="absolute right-5 mt-24 w-40 rounded-md bg-white shadow py-3 border text-brand__detail__text z-50">
              <Menu.Item>
                <button
                  onClick={() => {
                    dispatch(setEditValue(item));
                    setEditOpen(true);
                  }}
                  className="flex w-full items-center duration-300 px-4 py-0.5 text-sm capitalize hover:bg-primary hover:text-white gap-x-1 mb-2"
                >
                  View
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => handleDeleteOne(item.id)}
                  className="flex w-full items-center duration-300 px-4 py-0.5 text-sm capitalize hover:bg-danger hover:text-white gap-x-1"
                >
                  Delete
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ),
    },
  ];

  return { columns };
};
