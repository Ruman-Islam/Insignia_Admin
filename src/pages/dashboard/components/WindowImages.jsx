import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Carousel, Loader } from "rsuite";
import useToaster from "../../../hooks/useToaster";
import Image from "../../../components/UI/Image";
import { AiOutlineCamera } from "react-icons/ai";
import { useUploadWindowImgMutation } from "../../../redux/features/dashboard/dashboardApi";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setSystemConfig } from "../../../redux/features/dashboard/dashboardSlice";

const WindowImages = () => {
  const handleToaster = useToaster();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadWindowImg, { data, error }] = useUploadWindowImgMutation();
  const { dashboard } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.statusCode === 200) {
      setLoading(false);
      setImages([]);
      dispatch(setSystemConfig(data?.data));
      handleToaster(data.message, "success", "Success");
    } else if (error?.status) {
      setLoading(false);
      setImages([]);
      handleToaster(error.data?.errorMessages[0]?.message, "error", "Error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const onLoadImage = (callBack, reader, id, file) => {
    reader.onload = () => {
      callBack((prev) => [
        ...prev,
        {
          windowId: id,
          reader: reader.result,
          file: file,
        },
      ]);
    };
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      file.windowId = e.target.id;
      reader.readAsDataURL(file);
      onLoadImage(setImages, reader, e.target.id, file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const uploadedImages = [];
    const bodyFormData = new FormData();

    bodyFormData.append("upload_preset", "wi9geu2m");
    bodyFormData.append("cloud_name", "dqlxcdlce");
    bodyFormData.append("folder", "insignia/window");

    for (const item of images) {
      try {
        bodyFormData.append("file", item.file);
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dqlxcdlce/upload",
          bodyFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        uploadedImages.push({
          cloudinaryId: data.public_id,
          cloudinaryUrl: data.secure_url,
          windowId: item.windowId,
        });
      } catch (error) {
        setLoading(false);
        handleToaster("Something went wrong!", "error", "Error");
      }
    }

    if (uploadedImages.length) {
      const options = {
        data: uploadedImages,
      };
      uploadWindowImg(options);
    }
  };

  return (
    <div className="flex-1">
      <div className="my-2">
        <h1 className="text-brand__font__size__xl text-brand__detail__text">
          Window Images
        </h1>
        <p className="text-primary">Note: Recommended size: 1280 * 1024</p>
      </div>

      <div className="flex justify-between gap-2 flex-col-reverse">
        <div className="w-full">
          <Carousel
            autoplay
            autoplayInterval={6000}
            shape="bar"
            className="h-[300px] rounded"
          >
            <Image
              src={dashboard?.window1?.cloudinaryUrl}
              className="w-full h-full object-cover rounded"
            />
            <Image
              src={dashboard?.window2?.cloudinaryUrl}
              className="w-full h-full object-cover rounded"
            />
            <Image
              src={dashboard?.window3?.cloudinaryUrl}
              className="w-full h-full object-cover rounded"
            />
            <Image
              src={dashboard?.window4?.cloudinaryUrl}
              className="w-full h-full object-cover rounded"
            />
          </Carousel>

          {loading ? (
            <Button
              type="button"
              disabled
              className="flex justify-center w-full mt-3"
            >
              <Loader content="LOADING..." />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={images.length < 1}
              className="bg-primary mt-3 w-full text-white uppercase rounded"
            >
              update
            </Button>
          )}
        </div>
        <div>
          <div className="flex gap-1">
            <div className="text-primary font-brand__font__semibold w-full">
              <input
                type="file"
                className="hidden"
                id="window1"
                onChange={handleImage}
              />
              {images.find((item) => item.windowId === "window1") ? (
                <Image
                  src={
                    images.find((item) => item.windowId === "window1")?.reader
                  }
                  className="w-full h-[100px] object-cover"
                />
              ) : (
                <div className="w-full h-[100px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="window1"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Window 1</small>
                  </label>
                </div>
              )}
            </div>

            <div className="text-primary font-brand__font__semibold border-primary w-full">
              <input
                type="file"
                className="hidden"
                id="window2"
                onChange={handleImage}
              />
              {images.find((item) => item.windowId === "window2") ? (
                <Image
                  src={
                    images.find((item) => item.windowId === "window2")?.reader
                  }
                  className="w-full h-[100px] object-cover"
                />
              ) : (
                <div className="w-full h-[100px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="window2"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Window 2</small>
                  </label>
                </div>
              )}
            </div>

            <div className="text-primary font-brand__font__semibold border-primary w-full">
              <input
                type="file"
                className="hidden"
                id="window3"
                onChange={handleImage}
              />
              {images.find((item) => item.windowId === "window3") ? (
                <Image
                  src={
                    images.find((item) => item.windowId === "window3")?.reader
                  }
                  className="w-full h-[100px] object-cover"
                />
              ) : (
                <div className="w-full h-[100px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="window3"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Window 3</small>
                  </label>
                </div>
              )}
            </div>

            <div className="text-primary font-brand__font__semibold border-primary w-full">
              <input
                type="file"
                className="hidden"
                id="window4"
                onChange={handleImage}
              />
              {images.find((item) => item.windowId === "window4") ? (
                <Image
                  src={
                    images.find((item) => item.windowId === "window4")?.reader
                  }
                  className="w-full h-[100px] object-cover"
                />
              ) : (
                <div className="w-full h-[100px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="window4"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Window 4</small>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* <div className="mt-1">
              <Button
                onClick={() => setImages([])}
                disabled={images.length < 1}
                className="bg-primary hover:bg-secondary w-full text-white hover:text-white uppercase rounded"
              >
                Reset
              </Button>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default WindowImages;
