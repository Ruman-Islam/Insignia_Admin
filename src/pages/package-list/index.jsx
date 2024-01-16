import { useEffect, useState } from "react";
import { Divider, notification } from "antd";
import CustomTableHeader from "../../components/common/CustomTable/CustomTableHeader";

import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import {
  useDeleteManyPackageMutation,
  useDeleteOnePackageMutation,
  useGetAllPackageQuery,
  useUpdatePackagePopularityMutation,
  useUpdatePackageVisibilityMutation,
} from "../../redux/features/package/packageApi";
import CustomTable from "../../components/common/CustomTable";
import { useColumn } from "./components/columns";
import useToaster from "../../hooks/useToaster";

const PackageList = () => {
  const [dynamicUrl, setDynamicUrl] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
    isSelected: "",
    isPopular: "",
  });
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [deleteOnePackage, deleteOneResult] = useDeleteOnePackageMutation();
  const [deleteManyPackage, deleteManyResult] = useDeleteManyPackageMutation();
  const [updatePackageVisibility, visibilityResult] =
    useUpdatePackageVisibilityMutation();
  const [updatePackagePopularity, popularityResult] =
    useUpdatePackagePopularityMutation();

  const { data, isLoading } = useGetAllPackageQuery(dynamicUrl);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const onChange = (values) => {
    // Create a new state object based on the current state
    setDynamicUrl((prevDynamicUrl) => {
      let newState = { ...prevDynamicUrl };

      // Reset the values
      newState.isSelected = "";
      newState.isPopular = "";

      for (const val of values) {
        if (val === "selected") {
          newState.isSelected = true;
        }
        if (val === "popular") {
          newState.isPopular = true;
        }
      }

      return newState;
    });
  };

  const handleUpdatePopularity = (id) => {
    updatePackagePopularity(id);
  };

  const handleUpdateVisibility = (id) => {
    updatePackageVisibility(id);
  };

  const handleDeleteOne = (id) => {
    deleteOnePackage(id);
  };

  const handleDeleteMany = () => {
    const options = {
      data: selectedRowKeys,
    };
    deleteManyPackage(options);
  };

  const { columns } = useColumn(
    handleUpdatePopularity,
    handleUpdateVisibility,
    handleDeleteOne
  );

  useEffect(() => {
    if (visibilityResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        visibilityResult?.data?.message
      );
    }
    if (visibilityResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        visibilityResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibilityResult]);

  useEffect(() => {
    if (popularityResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        popularityResult?.data?.message
      );
    }
    if (popularityResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        popularityResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popularityResult]);

  useEffect(() => {
    if (deleteOneResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteOneResult?.data?.message
      );
    }
    if (deleteOneResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        deleteOneResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteOneResult]);

  useEffect(() => {
    if (deleteManyResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteManyResult?.data?.message
      );
    }
    if (deleteManyResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        deleteManyResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteManyResult]);

  return (
    <>
      <div className=" bg-white p-4 rounded-md max-w-screen-2xl mx-auto w-full shadow-md">
        <div className="w-full">
          <div>
            <h1 className="text-brand__font__size__xl text-brand__detail__text">
              Package list
            </h1>
          </div>

          <Divider />

          <div className="w-full">
            <CustomTableHeader
              handleOpen={() => navigate("/admin/create-package")}
              onChange={onChange}
              onSearch={(value) =>
                setDynamicUrl({
                  ...dynamicUrl,
                  searchTerm: value,
                })
              }
              options={[
                {
                  value: "selected",
                  label: "Selected",
                },
                {
                  value: "popular",
                  label: "Popular",
                },
              ]}
              placeholder="Search by"
              hasSelected={hasSelected}
              handleDeleteMany={handleDeleteMany}
            />

            <CustomTable
              columns={columns}
              data={data?.data}
              pagination={{
                dynamicUrl,
                total: data?.meta?.total,
              }}
              isLoading={isLoading}
              onChange={({ current, pageSize }) =>
                setDynamicUrl({
                  ...dynamicUrl,
                  page: current,
                  limit: pageSize,
                })
              }
              rowSelection={rowSelection}
            />
          </div>
        </div>
      </div>

      {contextHolder}
    </>
  );
};

export default PackageList;
