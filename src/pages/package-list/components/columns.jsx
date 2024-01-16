import { FiMoreHorizontal } from "react-icons/fi";
import { Image, Popover, Switch } from "antd";
import { useNavigate } from "react-router-dom";

export const useColumn = (
  handleUpdatePopularity,
  handleUpdateVisibility,
  handleDeleteOne
) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "FEATURE",
      width: 200,
      render: (item) => (
        <Image
          className="w-28 h-20 shadow-md border-2 rounded-md object-cover inline-block"
          width={112}
          height={80}
          src={item?.featuredPicture?.cloudinaryUrl}
        />
      ),
    },
    {
      title: "NAME",
      dataIndex: "name",
    },
    {
      title: "PRICE",
      dataIndex: "regularPrice",
    },
    {
      title: "POPULAR",
      width: 100,
      render: (item) => (
        <Switch
          size="small"
          checked={item.isPopular}
          onClick={() => handleUpdatePopularity(item.id)}
          className="bg-brand__heading__text"
        />
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
                onClick={() => navigate(`/admin/edit-package/${item.id}`)}
                className="flex w-full items-center duration-300 px-4 py-0.5 text-sm capitalize hover:bg-primary hover:text-white gap-x-1 mb-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteOne(item.id)}
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
