/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";

const CustomModal = ({ open, closeModal, children, id, title, btnText }) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={closeModal}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      footer={[
        <Button
          form={id}
          key="submit"
          className="bg-primary text-white hover:text-white w-full"
          htmlType="submit"
        >
          {btnText}
        </Button>,
      ]}
    >
      <div>{children}</div>
    </Modal>
  );
};

export default CustomModal;
