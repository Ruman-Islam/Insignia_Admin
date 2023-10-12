import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { openAlertBox } from "../../redux/features/notification/notificationSlice";
import { HashLink } from "react-router-hash-link";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAuth } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useCookie from "../../hooks/useCookie";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Grid,
  Avatar,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";

const SignInScreen = () => {
  const { handleSetCookie } = useCookie();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const from = location.state?.from?.pathname || "/admin";
  const [login, { data, error, isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    auth: { user },
  } = useAppSelector((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  useEffect(() => {
    if (data?.statusCode === 200) {
      handleSetCookie(data.data?.refreshToken);
      dispatch(
        openAlertBox({ isAlert: true, message: data.message, type: "success" })
      );
      dispatch(setAuth(data.data));
    } else if (error?.status) {
      dispatch(
        openAlertBox({
          isAlert: true,
          message: error.data?.errorMessages[0]?.message,
          type: "error",
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = (data) => {
    const options = {
      data: data,
    };
    login(options);
  };

  return (
    <Box className="h-screen flex justify-between">
      <Box className="bg-login__bg bg-cover bg-center duration-300 basis-[0%] md:basis-[60%]" />
      <Box className="duration-300 w-full md:basis-[40%] h-full flex flex-col items-center justify-center p-2.5 lg:p-10">
        <Stack
          spacing={2}
          sx={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon size={25} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl fullWidth margin="normal">
              <TextField
                id="email"
                variant="standard"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errors?.email?.type === "required"}
                helperText={errors?.email?.message}
                {...register("email", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                id="password"
                variant="standard"
                name="password"
                label="Password"
                autoComplete="current-password"
                error={errors?.password?.type === "required"}
                type={showPassword ? "text" : "password"}
                helperText={errors?.password?.message}
                {...register("password", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ mb: 1.5 }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            {isLoading ? (
              <LoadingButton
                loading={isLoading}
                loadingIndicator="Loading..."
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 2 }}
              ></LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}

            <Grid container>
              <Grid item xs>
                <HashLink to="#" className="text-primary underline">
                  Forgot password?
                </HashLink>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignInScreen;
