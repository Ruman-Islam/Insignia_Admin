import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Carousel, Loader } from "rsuite";
import useToaster from "../../../hooks/useToaster";
import Image from "../../../components/UI/Image";
import { AiOutlineCamera } from "react-icons/ai";
import { useUploadBannerImgMutation } from "../../../redux/features/dashboard/dashboardApi";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setSystemConfig } from "../../../redux/features/dashboard/dashboardSlice";

const Banner = () => {
  const handleToaster = useToaster();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadBannerImg, { data, error }] = useUploadBannerImgMutation();
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
          bannerId: id,
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
      file.bannerId = e.target.id;
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
    bodyFormData.append("folder", "insignia/banner");

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
          bannerId: item.bannerId,
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
      uploadBannerImg(options);
    }
  };

  return (
    <div className="flex-1">
      <div className="my-2">
        <h1 className="text-brand__font__size__xl text-brand__detail__text">
          Banner Images
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
              src={dashboard?.banner1?.cloudinaryUrl}
              className="w-full h-full object-cover rounded"
            />
            <Image
              src={dashboard?.banner2?.cloudinaryUrl}
              className="w-full h-full object-cover rounded"
            />
            <Image
              src={dashboard?.banner3?.cloudinaryUrl}
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
                id="banner1"
                onChange={handleImage}
              />
              {images.find((item) => item.bannerId === "banner1") ? (
                <Image
                  src={
                    images.find((item) => item.bannerId === "banner1")?.reader
                  }
                  className="w-full h-[100px] object-cover"
                />
              ) : (
                <div className="w-full h-[100px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="banner1"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Banner 1</small>
                  </label>
                </div>
              )}
            </div>

            <div className="text-primary font-brand__font__semibold border-primary w-full">
              <input
                type="file"
                className="hidden"
                id="banner2"
                onChange={handleImage}
              />
              {images.find((item) => item.bannerId === "banner2") ? (
                <Image
                  src={
                    images.find((item) => item.bannerId === "banner2")?.reader
                  }
                  className="w-full h-[100px] object-cover"
                />
              ) : (
                <div className="w-full h-[100px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="banner2"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Banner 2</small>
                  </label>
                </div>
              )}
            </div>

            <div className="text-primary font-brand__font__semibold border-primary w-full">
              <input
                type="file"
                className="hidden"
                id="banner3"
                onChange={handleImage}
              />
              {images.find((item) => item.bannerId === "banner3") ? (
                <Image
                  src={
                    images.find((item) => item.bannerId === "banner3")?.reader
                  }
                  className="w-full h-[100px] object-cover"
                />
              ) : (
                <div className="w-full h-[100px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="banner3"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Banner 3</small>
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

export default Banner;
