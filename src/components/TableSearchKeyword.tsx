import styled from "@emotion/styled";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/lib/table/interface";

const TableSearchKeyword = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}: FilterDropdownProps) => {
  return (
    <SearchKeywordWrapper>
      <CustomInput
        placeholder="검색할 단어를 입력해주세요"
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys([e.target.value])}
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

export default TableSearchKeyword;

const SearchKeywordWrapper = styled.div`
  padding: 8px;
`;
const CustomInput = styled(Input)`
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
