import { Popover, Tag } from "antd";
import { FiMoreHorizontal } from "react-icons/fi";
import { useAppDispatch } from "../../../redux/hook";
import { setEditValue } from "../../../redux/features/dashboard/dashboardSlice";

export const useColumn = (
  setEditOpen,
  handleDeleteOneFaq,
  handleUpdateVisibility
) => {
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "No",
      key: "index",
      rowScope: "row",
      width: 100,
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Question",
      key: "_id",
      width: 200,
      render: ({ title }) => <span>{title}</span>,
    },

    {
      title: "Answer",
      key: "_id",
      width: 250,
      render: ({ answer }) => <span>{answer}</span>,
    },

    {
      title: "Selected",
      key: "_id",
      width: 100,
      render: (item) => (
        <span>
          {item.isSelected ? (
            <Tag
              onClick={() => handleUpdateVisibility(item.id)}
              color="red"
              className="cursor-pointer"
            >
              Remove
            </Tag>
          ) : (
            <Tag
              onClick={() => handleUpdateVisibility(item.id)}
              color="blue"
              className="cursor-pointer"
            >
              Select
            </Tag>
          )}
        </span>
      ),
    },
    {
      title: "Action",
      key: "id",
      width: 50,
      render: (item) => (
        <Popover
          placement="leftTop"
          content={
            <div className="flex flex-col justify-between gap-y-1 w-[100px] ">
              <Tag
                className="cursor-pointer w-full"
                color="#1976D2"
                onClick={() => {
                  dispatch(setEditValue(item));
                  setEditOpen(true);
                }}
              >
                Edit
              </Tag>
              <Tag
                className="cursor-pointer w-full"
                color="#F70000"
                onClick={() => handleDeleteOneFaq(item.id)}
              >
                Delete
              </Tag>
            </div>
          }
          trigger="hover"
        >
          <button className="flex justify-center items-center w-full text-primary">
            <FiMoreHorizontal size={20} />
          </button>
        </Popover>
      ),
    },
  ];

  return { columns };
};
