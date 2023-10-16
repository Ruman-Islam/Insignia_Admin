import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneFaqQuery,
  useUpdateOneFaqMutation,
} from "../../../redux/features/faq/faqApi";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useToaster from "../../../hooks/useToaster";

const FaqEdit = () => {
  const { id } = useParams();
  const result = useGetOneFaqQuery(id);
  const [updateOneFaq, { data, error }] = useUpdateOneFaqMutation();
  const handleToaster = useToaster();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data?.statusCode === 200) {
      reset()
      handleToaster(data.message, "success", "Success");
      navigate("/admin/faq");
    } else if (error?.status) {
      handleToaster(error.data?.errorMessages[0]?.message, "error", "Error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const onSubmit = (data) => {
    const options = {
      data: {
        title: data.title,
        answer: data.answer,
        id: id,
      },
    };

    updateOneFaq(options);
  };

  return (
    <div className="w-full bg-white p-4 rounded-md">
      {/* <Form fluid onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Form.ControlLabel className="font-brand__font__semibold">
            Question
          </Form.ControlLabel>
          <Input
            name="title"
            as="textarea"
            placeholder="FAQ Question"
            defaultValue={result?.data?.data?.title}
            className="text-brand__font__size__base"
            {...register("title", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          <Form.HelpText>
            <span className="text-danger">
              {errors?.title?.type === "required" && errors?.title?.message}
            </span>
          </Form.HelpText>
        </div>
        <div>
          <Form.ControlLabel className="font-brand__font__semibold">
            Answer
          </Form.ControlLabel>
          <Input
            name="answer"
            as="textarea"
            rows={4}
            placeholder="FAQ Answer"
            className="text-brand__font__size__base"
            defaultValue={result?.data?.data?.answer}
            {...register("answer", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          <Form.HelpText>
            <span className="text-danger">
              {errors?.answer?.type === "required" && errors?.answer?.message}
            </span>
          </Form.HelpText>
        </div>

        <Button
          type="submit"
          className="bg-success px-8 py-1 text-white rounded"
        >
          Add
        </Button>
      </Form> */}
    </div>
  );
};

export default FaqEdit;
