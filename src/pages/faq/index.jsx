/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  useCreateFaqMutation,
  useDeleteOneFaqMutation,
  useGetFaqQuery,
  useUpdateOneFaqMutation,
  useUpdateVisibilityMutation,
} from "../../redux/features/faq/faqApi";
import { Form, Input, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setEditValue } from "../../redux/features/dashboard/dashboardSlice";
import CustomModal from "../../components/common/CustomModal";
import { useForm } from "react-hook-form";
import { useColumn } from "./components/columns";
import useToaster from "../../hooks/useToaster";
import CustomTable from "../../components/common/CustomTable";
import CustomTableHeader from "../../components/common/CustomTable/CustomTableHeader";

const Faq = () => {
  const [dynamicUrl, setDynamicUrl] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
    isSelected: "",
  });
  const { register, handleSubmit, reset } = useForm();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [createFaq, createResult] = useCreateFaqMutation();
  const [updateOneFaq, updateResult] = useUpdateOneFaqMutation();
  const [deleteOneFaq, deleteResult] = useDeleteOneFaqMutation();
  const [updateVisibility, updateVisibilityResult] =
    useUpdateVisibilityMutation();
  const { data, isLoading } = useGetFaqQuery(dynamicUrl);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);

  const { dashboard } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const closeCreateModal = () => {
    form.resetFields();
    setOpen(false);
  };

  const closeEditModal = () => {
    dispatch(setEditValue(null));
    reset();
    setEditOpen(false);
  };

  const handleCreateFaq = (values) => {
    const options = {
      data: values,
    };
    createFaq(options);
    form.resetFields();
    closeCreateModal();
  };

  const handleUpdateForm = (data) => {
    data.id = dashboard?.editValue?._id;
    const options = {
      data: data,
    };
    updateOneFaq(options);
    closeEditModal();
  };

  const handleDeleteOneFaq = (id) => {
    deleteOneFaq(id);
  };

  const handleUpdateVisibility = (id) => {
    updateVisibility(id);
  };

  const { columns } = useColumn(
    setEditOpen,
    handleDeleteOneFaq,
    handleUpdateVisibility
  );

  useEffect(() => {
    if (createResult?.data?.statusCode === 200) {
      openNotificationWithIcon("success", "FAQ", createResult?.data?.message);
    }
    if (updateResult?.data?.statusCode === 200) {
      openNotificationWithIcon("success", "FAQ", updateResult?.data?.message);
    }
    if (deleteResult?.data?.statusCode === 200) {
      openNotificationWithIcon("success", "FAQ", deleteResult?.data?.message);
    }
    if (updateVisibilityResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "FAQ",
        updateVisibilityResult?.data?.message
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createResult, updateResult, deleteResult, updateVisibilityResult]);

  return (
    <>
      <div className=" bg-white p-4 rounded-md max-w-screen-xl mx-auto w-full shadow-md">
        <div className="w-full">
          <div>
            <h1 className="text-brand__font__size__xl text-brand__detail__text border-b">
              FAQ
            </h1>
          </div>

          <div className="w-full">
            <CustomTableHeader
              handleOpen={() => setOpen(true)}
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
              placeholder="Search by title/answer"
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
            />
          </div>
        </div>

        <CustomModal
          open={open}
          closeModal={closeCreateModal}
          id="createForm"
          title="Create FAQ"
          btnText="Submit"
        >
          <Form id="createForm" onFinish={handleCreateFaq} form={form}>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input question!",
                },
              ]}
              label="Question"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="answer"
              rules={[
                {
                  required: true,
                  message: "Please input answer!",
                },
              ]}
              label="Answer"
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </CustomModal>

        <CustomModal
          open={editOpen}
          closeModal={closeEditModal}
          id="editForm"
          title="Edit FAQ"
          btnText="Update"
        >
          <form id="editForm" onSubmit={handleSubmit(handleUpdateForm)}>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <label
                  htmlFor="title"
                  className="text-brand__font__size__base my-2 block basis-[10%]"
                >
                  Question:
                </label>
                <textarea
                  name="title"
                  id="title"
                  cols="30"
                  rows="2"
                  placeholder="Question"
                  className=" w-full p-2 basis-[90%] outline-none border rounded-md"
                  defaultValue={dashboard?.editValue?.title}
                  {...register("title")}
                />
              </div>

              <div className="flex gap-1 max-w-[1000px] w-full">
                <label
                  htmlFor="answer"
                  className="text-brand__font__size__base my-2 block basis-[15%]"
                >
                  Answer:
                </label>
                <textarea
                  name="answer"
                  id="answer"
                  cols="30"
                  rows="4"
                  placeholder="Answer"
                  className=" w-full p-2 basis-[85%] outline-none border rounded-md"
                  defaultValue={dashboard?.editValue?.answer}
                  {...register("answer")}
                />
              </div>
            </div>
          </form>
        </CustomModal>
      </div>
      {contextHolder}
    </>
  );
};

export default Faq;
