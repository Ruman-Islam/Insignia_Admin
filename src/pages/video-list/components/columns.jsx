import { Popover, Switch } from "antd";
import { FiMoreHorizontal } from "react-icons/fi";
import { useAppDispatch } from "../../../redux/hook";
import { setEditValue } from "../../../redux/features/dashboard/dashboardSlice";
import { HashLink } from "react-router-hash-link";

export const useColumn = (
  setEditOpen,
  handleUpdateVisibility,
  handleDeleteOneVideo
) => {
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "TITLE",
      dataIndex: "title",
    },

    {
      title: "URL",
      render: ({ youtubeUrl }) => (
        <HashLink target="_blank" to={youtubeUrl}>
          {youtubeUrl}
        </HashLink>
      ),
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
      title: "MORE",

      width: 100,
      render: (item) => (
        <Popover
          placement="leftTop"
          content={
            <>
              <button
                onClick={() => {
                  dispatch(setEditValue(item));
                  setEditOpen(true);
                }}
                className="flex w-full items-center duration-300 px-4 py-0.5 text-sm capitalize hover:bg-primary hover:text-white gap-x-1 mb-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteOneVideo(item.id)}
                className="flex w-full items-center duration-300 px-4 py-0.5 text-sm capitalize hover:bg-danger hover:text-white gap-x-1"
              >
                Delete
              </button>
            </>
          }
        >
          <FiMoreHorizontal size={20} className=" cursor-pointer w-full" />
        </Popover>
      ),
    },
  ];

  return { columns };
};
