import _ from "lodash";
import { useMemo, useRef, useState } from "react";
import { TableProps } from "antd/lib/table/Table";
import { FilterValue, TablePaginationConfig } from "antd/lib/table/interface";

type SortType = "asc" | "desc";
interface OptionsInterface<D> {
  data: D[] | undefined;
  defaultPageSize?: number;
  status?: string;
  customFilter?: Record<string, (value: string, filter: string) => boolean>;
}

const useClientPagination = <D>({
  defaultPageSize,
  data,
  status,
  customFilter,
}: OptionsInterface<D>) => {
  const customFilterRef = useRef(customFilter || {});

  const [filters, setFilters] = useState<Record<string, null | FilterValue> | null>(null);
  const [sorter, setSorter] = useState<[string[], SortType[]] | null>(null);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    defaultPageSize: defaultPageSize || 20,
    showSizeChanger: false,
    position: ["bottomCenter"],
  });

  const onChange: TableProps<D>["onChange"] = ({ current }, nextFilters, nextSorter) => {
    let page = current;

    if (!Array.isArray(nextSorter)) {
      const nextSort: [[string], [SortType]] | null = nextSorter.order
        ? [[nextSorter.field as string], [nextSorter.order.slice(0, -3) as SortType]]
        : null;
      if (!_.isEqual(sorter, nextSort)) {
        page = 1;
        setSorter(nextSort);
      }
    }

    setFilters(nextFilters);

    setPagination((prevState) => ({
      ...prevState,
      current: page,
    }));
  };

  const dataSource = useMemo(() => {
    let chain = _.chain(data || []);
    // set sorting
    if (sorter) chain = chain.orderBy(...sorter);
    // set filter chain
    Object.entries(filters || {}).forEach(([key, filterValue]) => {
      if (!filterValue) return;
      if (customFilterRef.current?.[key])
        chain = chain.filter((value) =>
          customFilterRef.current[key](_.get(value, key), filterValue[0] as string),
        );
      else chain = chain.filter((value) => _.includes(filterValue, _.get(value, key)));
    });
    return chain.value();
  }, [data, filters, sorter]);

  return { loading: status === "loading", rowKey: "id", dataSource, pagination, onChange };
};

export default useClientPagination;
