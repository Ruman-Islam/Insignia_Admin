import { useEffect, useState } from "react";
import axios from "axios";
import CustomTable from "../../components/common/CustomTable";
import { useColumn } from "./components/columns";
import {
  useAddPhotoMutation,
  useDeleteManyPhotoMutation,
  useDeleteOnePhotoMutation,
  useGetAllPhotoQuery,
  useUpdatePhotoVisibilityMutation,
} from "../../redux/features/photo/photoApi";
import CustomTableHeader from "../../components/common/CustomTable/CustomTableHeader";
import CustomModal from "../../components/common/CustomModal";
import { DatePicker, Form, Input, notification } from "antd";
import Image from "../../components/UI/Image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useToaster from "../../hooks/useToaster";

const Photos = () => {
  const [dynamicUrl, setDynamicUrl] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
    isSelected: "",
  });
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [, setIsEditFormOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addPhoto, addPhotoResult] = useAddPhotoMutation();
  const [deleteOnePhoto, deleteOneResult] = useDeleteOnePhotoMutation();
  const [deleteManyPhoto, deleteManyResult] = useDeleteManyPhotoMutation();
  const [updatePhotoVisibility, visibilityResult] =
    useUpdatePhotoVisibilityMutation();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);

  const { data, isLoading } = useGetAllPhotoQuery(dynamicUrl);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const closeAddModal = () => {
    form.resetFields();
    setImage(null);
    setIsAddFormOpen(false);
  };

  const onLoadImage = (callBack, reader, file) => {
    reader.onload = () => {
      callBack({
        reader: reader.result,
        file: file,
      });
    };
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      onLoadImage(setImage, reader, file);
    }
  };

  const handleAddPhoto = async (values) => {
    const formData = new FormData();

    formData.append("upload_preset", "wi9geu2m");
    formData.append("cloud_name", "dqlxcdlce");
    formData.append("folder", "insignia/photo-gallery");
    formData.append("file", image.file);

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dqlxcdlce/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const options = {
        data: {
          place: values.place,
          date: values.date.format("DD-MM-YYYY"),
          photo: {
            cloudinaryId: data.public_id,
            cloudinaryUrl: data.secure_url,
          },
        },
      };

      addPhoto(options);
      form.resetFields();
      closeAddModal();
    } catch (error) {
      openNotificationWithIcon("error", "FAILED", "Something went wrong!");
    }
  };

  const handleDeleteOne = (id) => {
    deleteOnePhoto(id);
  };

  const handleDeleteMany = () => {
    const options = {
      data: selectedRowKeys,
    };
    deleteManyPhoto(options);
  };

  const handleUpdateVisibility = (id) => {
    updatePhotoVisibility(id);
  };

  const { columns } = useColumn(
    setIsEditFormOpen,
    handleDeleteOne,
    handleUpdateVisibility
  );

  useEffect(() => {
    if (addPhotoResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        addPhotoResult?.data?.message
      );
    }
    if (addPhotoResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        addPhotoResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addPhotoResult]);

  useEffect(() => {
    if (deleteOneResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteOneResult?.data?.message
      );
    }
    if (deleteOneResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        deleteOneResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteOneResult]);

  useEffect(() => {
    if (deleteManyResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteManyResult?.data?.message
      );
    }
    if (deleteManyResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        deleteManyResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteManyResult]);

  useEffect(() => {
    if (visibilityResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        visibilityResult?.data?.message
      );
    }
    if (visibilityResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        visibilityResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibilityResult]);

  return (
    <>
      <div className=" bg-white p-4 rounded-md max-w-screen-xl mx-auto w-full shadow-md">
        <div className="w-full">
          <div>
            <h1 className="text-brand__font__size__xl text-brand__detail__text border-b">
              Photos
            </h1>
          </div>

          <div className="w-full">
            <CustomTableHeader
              handleOpen={() => setIsAddFormOpen(true)}
              onChange={(value) =>
                setDynamicUrl({
                  ...dynamicUrl,
                  isSelected: value,
                })
              }
              onSearch={(value) =>
                setDynamicUrl({
                  ...dynamicUrl,
                  searchTerm: value,
                })
              }
              options={[
                {
                  value: "true",
                  label: "Selected",
                },
              ]}
              placeholder="Search by"
              hasSelected={hasSelected}
              handleDeleteMany={handleDeleteMany}
            />

            <CustomTable
              columns={columns}
              data={data?.data}
              pagination={{
                dynamicUrl,
                total: data?.meta?.total,
              }}
              isLoading={isLoading}
              onChange={({ current, pageSize }) =>
                setDynamicUrl({
                  ...dynamicUrl,
                  page: current,
                  limit: pageSize,
                })
              }
              rowSelection={rowSelection}
            />
          </div>
        </div>

        <CustomModal
          open={isAddFormOpen}
          closeModal={closeAddModal}
          id="createForm"
          title="Add Photo"
          btnText="Submit"
        >
          <Form id="createForm" onFinish={handleAddPhoto} form={form}>
            <Form.Item
              name="place"
              rules={[
                {
                  required: true,
                  message: "Please input place name!",
                },
              ]}
              label="Place"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please input date!",
                },
              ]}
              label="Date"
            >
              <DatePicker
                format="DD-MM-YYYY"
                allowClear
                className="w-full"
                dateString
              />
            </Form.Item>

            <label htmlFor="image">
              <span className="text-danger">*</span> Image:{" "}
            </label>
            {image ? (
              <div className="relative w-full">
                <Image
                  src={image.reader}
                  className="max-w-[600px] w-full h-[250px] shadow-md border-2 rounded-md object-cover inline-block"
                />
                <AiOutlineCloseCircle
                  onClick={() => setImage(null)}
                  size={18}
                  className="absolute top-1.5 right-1.5 text-danger cursor-pointer rounded-full"
                />
              </div>
            ) : (
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
            )}
          </Form>
        </CustomModal>

        {/* <CustomModal
            open={isEditFormOpen}
            closeModal={closeEditModal}
            id="editForm"
            title="Edit FAQ"
            btnText="Update"
          >
            <form id="editForm" onSubmit={handleSubmit(handleUpdateVideo)}>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <label
                    htmlFor="title"
                    className="text-brand__font__size__base my-2 block basis-[10%]"
                  >
                    Title:
                  </label>
                  <textarea
                    name="title"
                    id="title"
                    cols="30"
                    rows="2"
                    placeholder="Title"
                    className=" w-full p-2 basis-[90%] outline-none border rounded-md"
                    defaultValue={dashboard?.editValue?.title}
                    {...register("title")}
                  />
                </div>
  
                <div className="flex gap-1 max-w-[1000px] w-full">
                  <label
                    htmlFor="url"
                    className="text-brand__font__size__base my-2 block basis-[15%]"
                  >
                    URL:
                  </label>
                  <textarea
                    name="youtubeUrl"
                    id="url"
                    cols="30"
                    rows="4"
                    placeholder="URL"
                    className=" w-full p-2 basis-[85%] outline-none border rounded-md"
                    defaultValue={dashboard?.editValue?.youtubeUrl}
                    {...register("youtubeUrl")}
                  />
                </div>
              </div>
            </form>
          </CustomModal> */}
      </div>

      {contextHolder}
    </>
  );
};

export default Photos;
