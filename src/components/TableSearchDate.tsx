import dayjs from "dayjs";
import styled from "@emotion/styled";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/lib/table/interface";

import DatePicker from "./datepickers/DatePicker";

const TableSearchDate = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}: FilterDropdownProps) => {
  return (
    <SearchKeywordWrapper>
      <CustomDatePicker
        placeholder="날짜를 선택해주세요"
        value={selectedKeys[0] ? dayjs(selectedKeys[0]) : undefined}
        onChange={(dateObj, dateString) => setSelectedKeys([dateString])}
      />
      <ButtonWrapper>
        <CustomButton
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => confirm({ closeDropdown: true })}
        >
          검색
        </CustomButton>
        <CustomButton
          onClick={() => {
            clearFilters?.();
            confirm({ closeDropdown: true });
          }}
        >
          초기화
        </CustomButton>
      </ButtonWrapper>
    </SearchKeywordWrapper>
  );
};

export default TableSearchDate;

const SearchKeywordWrapper = styled.div`
  padding: 8px;
`;
const CustomDatePicker = styled(DatePicker)`
  display: block;
  margin-bottom: 8px;
  width: 190px;
`;
const ButtonWrapper = styled.div`
  display: flex;
`;
const CustomButton = styled(Button)`
  flex: 1;
  & + & {
    margin-left: 4px;
  }
`;
