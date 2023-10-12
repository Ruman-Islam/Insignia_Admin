import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { closeAlertBox } from "../../redux/features/notification/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const Notification = () => {
  const {
    notification: { isAlert, message, type },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      open={isAlert}
      autoHideDuration={4000}
      onClose={() =>
        dispatch(
          closeAlertBox({
            isAlert: false,
            message: message,
            type: type,
          })
        )
      }
    >
      <Alert
      
        draggable
        sx={{ width: "350px" }}
        onClose={() =>
          dispatch(
            closeAlertBox({
              isAlert: false,
              message: message,
              type: type,
            })
          )
        }
        variant="filled"
        severity={type}
      >
        <AlertTitle>{type}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
