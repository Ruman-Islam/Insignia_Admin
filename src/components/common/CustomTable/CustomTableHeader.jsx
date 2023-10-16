/* eslint-disable react/prop-types */
import { AutoComplete, Button, Select } from "antd";

const CustomTableHeader = ({
  handleOpen,
  onChange,
  options,
  onSearch,
  placeholder,
}) => {
  return (
    <div className="h-[80px] flex items-center justify-between">
      <div className="w-full">
        <Button
          onClick={handleOpen}
          type="primary"
          className="bg-primary max-w-[150px] w-full"
        >
          Add New
        </Button>
      </div>
      <div className="flex gap-2 w-full justify-end">
        <div className="w-[100px]">
          <Select
            className="w-full"
            placeholder="Filter"
            optionFilterProp="children"
            onChange={onChange}
            allowClear
            options={options}
          />
        </div>
        <div>
          <AutoComplete
            style={{
              width: 200,
            }}
            onSearch={onSearch}
            allowClear
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomTableHeader;
