import { Button, Form, Input, Loader } from "rsuite";
import { useForm } from "react-hook-form";
import { useUploadBannerTitleMutation } from "../../../redux/features/dashboard/dashboardApi";
import { useEffect } from "react";
import useToaster from "../../../hooks/useToaster";
import { useAppSelector } from "../../../redux/hook";

const BannerText = () => {
  const { dashboard } = useAppSelector((state) => state);
  const handleToaster = useToaster();
  const [uploadBannerTitle, { data, error, isLoading }] =
    useUploadBannerTitleMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data?.statusCode === 200) {
      handleToaster(data.message, "success", "Success");
    } else if (error?.status) {
      handleToaster(error.data?.errorMessages[0]?.message, "error", "Error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const onSubmit = (data) => {
    const options = {
      data: data,
    };
    uploadBannerTitle(options);
  };

  return (
    <div className="flex-1">
      <div className="my-2">
        <h1 className="text-brand__font__size__xl text-brand__detail__text my-2">
          Banner Titles
        </h1>
        <p className="text-primary">
          Note: You can update title/sub-title at anytime
        </p>
      </div>

      <div>
        <Form fluid onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div>
            <Form.ControlLabel className="font-brand__font__semibold">
              Title
            </Form.ControlLabel>
            <Input
              name="bannerText"
              as="textarea"
              rows={3}
              defaultValue={dashboard?.bannerTitle?.bannerText}
              placeholder="Banner Title"
              className="text-brand__font__size__base"
              {...register("bannerText", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
            />
            <Form.HelpText>
              <span className="text-danger">
                {errors?.bannerText?.type === "required" &&
                  errors?.bannerText?.message}
              </span>
            </Form.HelpText>
          </div>
          <br />
          <div>
            <Form.ControlLabel className="font-brand__font__semibold">
              Sub Title
            </Form.ControlLabel>
            <Input
              name="bannerSubText"
              as="textarea"
              rows={5}
              placeholder="Banner Sub Title"
              className="text-brand__font__size__md"
              defaultValue={dashboard?.bannerTitle?.bannerSubText}
              {...register("bannerSubText", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
            />
            <Form.HelpText>
              <span className="text-danger">
                {errors?.bannerSubText?.type === "required" &&
                  errors?.bannerSubText?.message}
              </span>
            </Form.HelpText>
          </div>

          {isLoading ? (
            <Button disabled className="flex justify-center w-full">
              <Loader content="LOADING..." />
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-primary w-full text-white uppercase rounded"
            >
              update
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default BannerText;
