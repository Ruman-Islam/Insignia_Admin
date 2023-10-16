/* eslint-disable react/prop-types */
import { Table } from "antd";

const CustomTable = ({ columns, data, isLoading, pagination, onChange }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={pagination}
      loading={isLoading}
      onChange={onChange}
      scroll={{
        x: "max-content",
        y: 600,
      }}
    />
  );
};

export default CustomTable;
