import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  Switch,
  Upload,
  notification,
} from "antd";
import { useParams } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useEditPackageMutation,
  useGetOnePackageQuery,
} from "../../redux/features/package/packageApi";
import {
  contentButtonData,
  contentValues,
  divider,
  modules,
} from "../../constants/editor";
import useToaster from "../../hooks/useToaster";
import axios from "axios";
import ReactQuill from "react-quill";
import { categories, countryCodes, tags } from "../../constants/package";
import { uploadButton } from "../../constants/common";
import getBase64 from "../../utils/imageProcessing";
import "react-quill/dist/quill.snow.css";
import { addPrice } from "../create-package/utils";

const EditPackageScreen = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(contentValues);
  const [currentTextEditor, setCurrentTextEditor] = useState("overview");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [deletedFeaturedPictureList, setDeletedFeaturedPictureList] = useState(
    []
  );
  const [featuredPictureList, setFeaturedPictureList] = useState([]);
  const [pictureList, setPictureList] = useState([]);
  const [deletedPictureList, setDeletedPictureList] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [editPackage, editPackageResult] = useEditPackageMutation();
  const { data } = useGetOnePackageQuery(id);

  useEffect(() => {
    setValue({
      ...value,
      overview: data?.data?.overview ? data?.data?.overview : "",
      location: data?.data?.location ? data?.data?.location : "",
      timing: data?.data?.timing ? data?.data?.timing : "",
      description: data?.data?.description ? data?.data?.description : "",
      inclusionExclusion: data?.data?.inclusionExclusion
        ? data?.data?.inclusionExclusion
        : "",
      additionalInformation: data?.data?.additionalInformation
        ? data?.data?.additionalInformation
        : "",
      options: data?.data?.options ? data?.data?.options : "",
      policy: data?.data?.policy ? data?.data?.policy : "",
    });
    setFeaturedPictureList([
      { url: data?.data?.featuredPicture.cloudinaryUrl },
    ]);
    setDeletedFeaturedPictureList([
      { cloudinaryId: data?.data?.featuredPicture.cloudinaryId },
    ]);

    setPictureList(
      data?.data?.pictures.map((item) => {
        return { url: item.cloudinaryUrl };
      })
    );
    setDeletedPictureList(
      data?.data?.pictures.map((item) => {
        return { url: item.cloudinaryUrl, cloudinaryId: item.cloudinaryUrl };
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data]);

  useEffect(() => {
    form.resetFields();
  }, [data?.data, form]);

  const handleEditPackage = async (values) => {
    setIsLoading(true);
    if (featuredPictureList[0].originFileObj) {
      const featuredPictureForm = new FormData();
      featuredPictureForm.append("upload_preset", "wi9geu2m");
      featuredPictureForm.append("cloud_name", "dqlxcdlce");
      featuredPictureForm.append("folder", "insignia/package-images/featured");
      featuredPictureForm.append("file", featuredPictureList[0].originFileObj);

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dqlxcdlce/upload",
        featuredPictureForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      values.featuredPicture = {
        cloudinaryId: data.public_id,
        cloudinaryUrl: data.secure_url,
      };
      values.deletedFeaturedPicture = deletedFeaturedPictureList[0];
    }

    // Find the item(s) that were removed from arr2 compared to arr1
    const removedItems = deletedPictureList.filter(
      (item1) => !pictureList.some((item2) => item2.url === item1.url)
    );
    values.removedItems = removedItems;

    const pictures = [];
    const picturesForm = new FormData();
    picturesForm.append("upload_preset", "wi9geu2m");
    picturesForm.append("cloud_name", "dqlxcdlce");
    picturesForm.append("folder", "insignia/package-images/picture");
    for (const item of pictureList) {
      if (item.originFileObj) {
        picturesForm.append("file", item.originFileObj);
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dqlxcdlce/upload",
          picturesForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        pictures.push({
          cloudinaryId: data.public_id,
          cloudinaryUrl: data.secure_url,
        });
      }
    }
    if (pictures.length) {
      values.pictures = pictures;
    }

    try {
      const prices = [];
      addPrice(prices, values, "regularPrice", "regular");
      addPrice(prices, values, "premiumPrice", "premium");
      addPrice(prices, values, "deluxePrice", "deluxe");
      values.prices = prices;

      const options = {
        data: values,
        id: id,
      };

      editPackage(options);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      openNotificationWithIcon("error", "FAILED", "Something went wrong!");
    }
  };

  useEffect(() => {
    if (editPackageResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        editPackageResult?.data?.message
      );
    }
    if (editPackageResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        editPackageResult?.error?.data?.errorMessages[0]?.message
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editPackageResult]);

  return (
    <>
      <div className="bg-white border p-4 rounded-md max-w-screen-2xl mx-auto w-full shadow-md h-full">
        <div className="w-full h-full">
          <div>
            <h1 className="text-brand__font__size__xl text-brand__detail__text uppercase">
              Create Package
            </h1>
          </div>

          <Divider />

          <Form
            id="createForm"
            onFinish={handleEditPackage}
            form={form}
            layout="vertical"
            autoComplete="off"
            initialValues={{
              overview: data?.data?.overview,
              location: data?.data?.location,
              timing: data?.data?.timing,
              description: data?.data?.description,
              inclusionExclusion: data?.data?.inclusionExclusion,
              additionalInformation: data?.data?.additionalInformation,
              options: data?.data?.options,
              policy: data?.data?.policy,
              name: data?.data?.name,
              cancelationText: data?.data?.cancelationText,
              durationText: data?.data?.durationText,
              area: data?.data?.locationDetails?.area,
              country: data?.data?.locationDetails?.country,
              alias: data?.data?.locationDetails?.alias,
              category: data?.data?.category,
              isPopular: data?.data?.isPopular,
              isSelected: data?.data?.isSelected,
              regularPrice: data?.data?.prices[0]?.price
                ? parseFloat(data?.data?.prices[0]?.price)
                : 0,
              premiumPrice: data?.data?.prices[1]?.price
                ? parseFloat(data?.data?.prices[1]?.price)
                : 0,
              deluxePrice: data?.data?.prices[2]?.price
                ? parseFloat(data?.data?.prices[2]?.price)
                : 0,
              packageTags: data?.data?.tags.map((item) => item?.title),
              countryCode: data?.data?.locationDetails?.countryCode,
              discounts: data?.data?.discounts.map((item) => {
                return {
                  applicablePersons: item?.applicablePersons,
                  percentages: item?.percentages,
                };
              }),
            }}
          >
            <div className="flex justify-between flex-col xl:flex-row gap-2 mb-5 h-full">
              <div className="basis-[50%] w-full border shadow-md rounded">
                <ReactQuill
                  value={`${value.overview} ${
                    value.description ? divider : ""
                  } ${value.description} ${value.location ? divider : ""} ${
                    value.location
                  } ${value.timing ? divider : ""} ${value.timing} ${
                    value.inclusionExclusion ? divider : ""
                  } ${value.inclusionExclusion} ${
                    value.additionalInformation ? divider : ""
                  } ${value.additionalInformation} ${
                    value.options ? divider : ""
                  } ${value.options} ${value.policy ? divider : ""} ${
                    value.policy
                  }`}
                  theme="bubble"
                  readOnly
                />
              </div>

              <div className="basis-[50%] p-2">
                <div className="py-1 flex flex-wrap gap-1 mb-1">
                  {contentButtonData.map((item) => (
                    <Button
                      key={item}
                      className={`${
                        currentTextEditor === item &&
                        "border border-primary text-primary rounded"
                      } capitalize`}
                      onClick={() => setCurrentTextEditor(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>

                <div>
                  {contentButtonData.map((item) => (
                    <Form.Item
                      key={item}
                      name={item}
                      className={`${
                        currentTextEditor === item ? "block" : "hidden"
                      }`}
                    >
                      <ReactQuill
                        className="h-[450px]"
                        theme="snow"
                        onChange={(val) => setValue({ ...value, [item]: val })}
                        placeholder="Type here..."
                        modules={modules}
                      />
                    </Form.Item>
                  ))}
                </div>

                <br />
                <br />

                <div>
                  <Form.Item
                    name="name"
                    // initialValue={data?.data?.name}
                    rules={[
                      {
                        required: true,
                        message: "Please input package name!",
                      },
                    ]}
                    label={
                      <label htmlFor="name" style={{ fontWeight: "bolder" }}>
                        Package Name
                      </label>
                    }
                  >
                    <Input.TextArea placeholder="Type..." />
                  </Form.Item>
                </div>

                <div className="flex gap-1">
                  <Form.Item
                    className="w-full"
                    name="cancelationText"
                    rules={[
                      {
                        required: true,
                        message: "Please input cancelation text!",
                      },
                    ]}
                    label={
                      <label
                        htmlFor="cancelationText"
                        style={{ fontWeight: "bolder" }}
                      >
                        Cancelation Text
                      </label>
                    }
                  >
                    <Input.TextArea placeholder="Type..." />
                  </Form.Item>

                  <Form.Item
                    className="w-full"
                    name="durationText"
                    rules={[
                      {
                        required: true,
                        message: "Please input duration text!",
                      },
                    ]}
                    label={
                      <label
                        htmlFor="durationText"
                        style={{ fontWeight: "bolder" }}
                      >
                        Duration Text
                      </label>
                    }
                  >
                    <Input.TextArea placeholder="Type..." />
                  </Form.Item>
                </div>

                <div className="flex gap-1">
                  <Form.Item
                    className="w-full"
                    name="regularPrice"
                    rules={[
                      {
                        required: true,
                        message: "Please input regular price!",
                      },
                    ]}
                    label={
                      <label
                        htmlFor="regularPrice"
                        style={{ fontWeight: "bolder" }}
                      >
                        Regular Price
                      </label>
                    }
                  >
                    <InputNumber className="w-full" placeholder="Type..." />
                  </Form.Item>
                  <Form.Item
                    name="premiumPrice"
                    className="w-full"
                    label={
                      <label
                        htmlFor="premiumPrice"
                        style={{ fontWeight: "bolder" }}
                      >
                        Premium Price
                      </label>
                    }
                  >
                    <InputNumber className="w-full" placeholder="Type..." />
                  </Form.Item>
                  <Form.Item
                    name="deluxePrice"
                    className="w-full"
                    label={
                      <label
                        htmlFor="deluxePrice"
                        style={{ fontWeight: "bolder" }}
                      >
                        Deluxe Price
                      </label>
                    }
                  >
                    <InputNumber className="w-full" placeholder="Type..." />
                  </Form.Item>
                </div>

                <div className="flex gap-1">
                  <Form.Item
                    className="w-full"
                    name="area"
                    rules={[
                      {
                        required: true,
                        message: "Please input location!",
                      },
                    ]}
                    label={
                      <label
                        htmlFor="locationName"
                        style={{ fontWeight: "bolder" }}
                      >
                        Area
                      </label>
                    }
                  >
                    <Input className="w-full" placeholder="Type..." />
                  </Form.Item>
                  <Form.Item
                    name="country"
                    className="w-full"
                    rules={[
                      {
                        required: true,
                        message: "Please input country!",
                      },
                    ]}
                    label={
                      <label htmlFor="country" style={{ fontWeight: "bolder" }}>
                        Country
                      </label>
                    }
                  >
                    <Input className="w-full" placeholder="Type..." />
                  </Form.Item>
                  <Form.Item
                    name="alias"
                    className="w-full"
                    rules={[
                      {
                        required: true,
                        message: "Please input alias!",
                      },
                    ]}
                    label={
                      <label htmlFor="alias" style={{ fontWeight: "bolder" }}>
                        Search Alias
                      </label>
                    }
                  >
                    <Input className="w-full" placeholder="Type..." />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Please input category",
                      },
                    ]}
                    label={
                      <label
                        htmlFor="category"
                        style={{ fontWeight: "bolder" }}
                      >
                        Category
                      </label>
                    }
                  >
                    <Select size="middle" options={categories} />
                  </Form.Item>
                </div>

                <div className="flex gap-1">
                  <Form.Item
                    name="packageTags"
                    className="basis-[70%]"
                    label={
                      <label
                        htmlFor="packageTags"
                        style={{ fontWeight: "bolder" }}
                      >
                        Tags
                      </label>
                    }
                  >
                    <Select
                      mode="tags"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Select tags"
                      options={tags}
                    />
                  </Form.Item>
                  <Form.Item
                    name="countryCode"
                    className="basis-[30%]"
                    rules={[
                      {
                        required: true,
                        message: "Please input country!",
                      },
                    ]}
                    label={
                      <label
                        htmlFor="countryCode"
                        style={{ fontWeight: "bolder" }}
                      >
                        Country Code
                      </label>
                    }
                  >
                    <Select
                      style={{
                        width: "100%",
                      }}
                      showSearch
                      placeholder="Select country"
                      optionFilterProp="label"
                      options={countryCodes}
                    />
                  </Form.Item>
                </div>

                <div className="mb-2">
                  <Form.List name="discounts">
                    {(fields, { add, remove }) => {
                      return (
                        <>
                          {fields.map(({ key, name, ...restField }) => {
                            return (
                              <div
                                key={key}
                                className="flex justify-between items-center mb-5 gap-1"
                              >
                                <Form.Item
                                  {...restField}
                                  className="m-0 w-full"
                                  name={[name, "applicablePersons"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing Applicable persons",
                                    },
                                  ]}
                                  label={
                                    <label
                                      htmlFor="applicablePersons"
                                      style={{ fontWeight: "bolder" }}
                                    >
                                      Person
                                    </label>
                                  }
                                >
                                  <InputNumber
                                    placeholder="Put applicable person number"
                                    className="w-full"
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  className="m-0 w-full"
                                  name={[name, "percentages"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing discount percentage",
                                    },
                                  ]}
                                  label={
                                    <label
                                      htmlFor="percentages"
                                      style={{ fontWeight: "bolder" }}
                                    >
                                      Percentages
                                    </label>
                                  }
                                >
                                  <InputNumber
                                    placeholder="Put applicable percentages"
                                    className="w-full"
                                  />
                                </Form.Item>
                                <Button
                                  className="mt-7"
                                  danger
                                  onClick={() => remove(name)}
                                >
                                  Remove
                                </Button>
                              </div>
                            );
                          })}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add discount
                            </Button>
                          </Form.Item>
                        </>
                      );
                    }}
                  </Form.List>
                </div>

                <div>
                  <Form.Item
                    name="isPopular"
                    label={
                      <label
                        htmlFor="isPopular"
                        style={{ fontWeight: "bolder" }}
                      >
                        Is Popular ?
                      </label>
                    }
                  >
                    <Switch
                      defaultChecked={data?.data?.isPopular}
                      size="small"
                      className="bg-brand__heading__text"
                    />
                  </Form.Item>
                  <Form.Item
                    name="isSelected"
                    label={
                      <label
                        htmlFor="isSelected"
                        style={{ fontWeight: "bolder" }}
                      >
                        Is Selected ?
                      </label>
                    }
                  >
                    <Switch
                      defaultChecked={data?.data?.isSelected}
                      size="small"
                      className="bg-brand__heading__text"
                    />
                  </Form.Item>
                </div>

                <div className="flex justify-between flex-row-reverse">
                  <Form.Item
                    name="featuredPicture"
                    className="w-full"
                    label={
                      <label
                        htmlFor="featuredPicture"
                        style={{ fontWeight: "bolder" }}
                      >
                        Featured Picture
                      </label>
                    }
                  >
                    <Upload
                      beforeUpload={() => {
                        return false;
                      }}
                      listType="picture-card"
                      fileList={featuredPictureList}
                      onPreview={async (file) => {
                        if (!file.url && !file.preview) {
                          file.preview = await getBase64(file.originFileObj);
                        }
                        setPreviewImage(file.url || file.preview);
                        setPreviewOpen(true);
                      }}
                      onChange={({ fileList: newFileList }) =>
                        setFeaturedPictureList(newFileList)
                      }
                    >
                      {featuredPictureList.length >= 1 ? null : uploadButton}
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    name="pictures"
                    label={
                      <label
                        htmlFor="pictures"
                        style={{ fontWeight: "bolder" }}
                      >
                        Pictures
                      </label>
                    }
                  >
                    <Upload
                      beforeUpload={() => {
                        return false;
                      }}
                      listType="picture-card"
                      fileList={pictureList}
                      onPreview={async (file) => {
                        if (!file.url && !file.preview) {
                          file.preview = await getBase64(file.originFileObj);
                        }
                        setPreviewImage(file.url || file.preview);
                        setPreviewOpen(true);
                      }}
                      onChange={({ fileList: newFileList }) =>
                        setPictureList(newFileList)
                      }
                      multiple
                    >
                      {uploadButton}
                    </Upload>
                  </Form.Item>
                </div>

                {isLoading ? (
                  <div className="w-full flex justify-center mt-2 border py-1">
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 24,
                          }}
                          spin
                        />
                      }
                    />
                  </div>
                ) : (
                  <Button
                    key="submit"
                    type="primary"
                    className="bg-primary text-white mt-1 hover:text-white w-full"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
      {contextHolder}
    </>
  );
};

export default EditPackageScreen;
