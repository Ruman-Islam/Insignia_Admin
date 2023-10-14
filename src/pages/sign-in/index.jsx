import { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAuth } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useCookie from "../../hooks/useCookie";
import { Form, Button, Loader, Checkbox } from "rsuite";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useToaster from "../../hooks/useToaster";
import { HashLink } from "react-router-hash-link";

const SignInScreen = () => {
  const { handleSetCookie } = useCookie();
  const navigate = useNavigate();
  const handleToaster = useToaster();
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
      handleToaster(data.message, "success", "Success");
      dispatch(setAuth(data.data));
    } else if (error?.status) {
      handleToaster(error.data?.errorMessages[0]?.message, "error", "Error");
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
    <div className="h-screen flex justify-between">
      <div className="bg-login__bg bg-cover bg-center duration-300 basis-[0%] md:basis-[60%]" />
      <div className="duration-300 w-full md:basis-[40%] h-full flex flex-col items-center p-2.5 lg:p-10">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-[42px] h-[42px] bg-[#9C27B0] rounded-full flex justify-center items-center text-white text-brand__font__size__xl">
              <MdLockOutline />
            </div>
            <h3 className="text-brand__font__size__lg font-brand__font__semibold">
              Sign In
            </h3>
          </div>
          <Form fluid onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div>
              <input
                name="email"
                className={`w-full  border-b-2 outline-none py-2 text-brand__font__size__base duration-500 placeholder:text-brand__font__size__sm ${
                  errors?.email?.type === "required"
                    ? "focus:border-danger border-danger placeholder:text-danger"
                    : "focus:border-primary border-black placeholder:text-brand__detail__text"
                }`}
                placeholder="Email Address *"
                {...register("email", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              <Form.HelpText>
                <span className="text-danger mt-0.5 block">
                  {errors?.email?.type === "required" && errors?.email?.message}
                </span>
              </Form.HelpText>
            </div>

            <div className="relative mt-4">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className={`w-full  border-b-2 outline-none py-2 text-brand__font__size__base duration-500 placeholder:text-brand__font__size__sm ${
                  errors?.password?.type === "required"
                    ? "focus:border-danger border-danger placeholder:text-danger"
                    : "focus:border-primary border-black placeholder:text-brand__detail__text"
                }`}
                placeholder="Password *"
                {...register("password", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              <Form.HelpText>
                <span className="text-danger mt-0.5 block">
                  {" "}
                  {errors?.password?.type === "required"
                    ? errors?.password?.message
                    : ""}
                </span>
              </Form.HelpText>
              <button
                onClick={handleClickShowPassword}
                type="button"
                className={`absolute top-3 right-1.5 text-brand__font__size__xl cursor-pointer ${
                  errors?.password?.type === "required" && "text-danger"
                }`}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>

            <div className="my-2.5">
              <Checkbox>
                <span className="block text-brand__font__size__base font-brand__font__semibold">
                  Remember me
                </span>
              </Checkbox>
            </div>

            {isLoading ? (
              <Button
                type="button"
                disabled
                className="flex justify-center w-full"
              >
                <Loader content="LOADING..." />
              </Button>
            ) : (
              <Button
                type="submit"
                // appearance="primary"
                className="bg-primary hover:bg-secondary text-white hover:text-white w-full duration-300"
              >
                SIGN IN
              </Button>
            )}
          </Form>
          <HashLink
            className="text-left block mt-4 underline text-primary"
            to="/"
          >
            Forgot password?
          </HashLink>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
