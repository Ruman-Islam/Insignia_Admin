import { Message, toaster } from "rsuite";

const useToaster = () => {
  const handleToaster = (message, type, header) => {
    toaster.push(
      <Message
        showIcon
        type={type}
        header={header}
        closable
        style={{ width: "350px" }}
      >
        {message}
      </Message>,
      { placement: "bottomStart", duration: 5000 }
    );
  };

  return handleToaster;
};

export default useToaster;
