import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

import { genderMapper } from "./enToKoMapper";
import { Gender } from "../../types/constants";
import TableSearchKeyword from "../../components/TableSearchKeyword";
import TableSearchDate from "../../components/TableSearchDate";

export const formatters = {
  date: (str?: string) => (str ? dayjs(str).format("YYYY-MM-DD") : ""),
  datetime: (str?: string) => (str ? dayjs(str).format("YYYY-MM-DD HH:mm") : ""),
  gender: (str: string) => genderMapper(str),
} as const;

export const customFilters = {
  keyword: (value: string, filter: string) => value.toLowerCase().includes(filter.toLowerCase()),
  date: (value: string, filter: string) => dayjs(value).format("YYYY-MM-DD") === filter,
};

export const filters = {
  gender: {
    filters: [Gender.MEN, Gender.WOMEN].map((value) => ({ value, text: genderMapper(value) })),
    filterMultiple: false,
  },
  allGender: {
    filters: Object.values(Gender).map((value) => ({ value, text: genderMapper(value) })),
  },
  keyword: {
    filterDropdown: TableSearchKeyword,
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  },
  date: {
    filterDropdown: TableSearchDate,
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  },
} as const;
