import { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";

interface UseFilterProps {
  data: any[];
  filterFields: string[];
  searchField: string;
  chunkSize?: number;
}

const DEBOUNCE_DELAY = 200; // ms

const useFilter = ({
  data,
  filterFields,
  searchField,
  chunkSize = 10,
}: UseFilterProps) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadedChunks, setLoadedChunks] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesFilter =
        filters.length === 0 ||
        filters.some((filter) =>
          filterFields.some((field) => {
            if (field.startsWith("is_")) {
              // Check if the value of the boolean field is true
              return item[field] === true;
            } else if (typeof item[field] === "string") {
              return item[field].toLowerCase() === filter.toLowerCase();
            } else if (typeof item[field] === "number") {
              return item[field] === Number(filter);
            }
            return false;
          }),
        );
      const matchesSearch = item[searchField]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [data, filters, searchQuery, filterFields, searchField]);

  const displayedData = useMemo(() => {
    return filteredData.slice(0, chunkSize * loadedChunks);
  }, [filteredData, chunkSize, loadedChunks]);

  const loadMoreData = useCallback(() => {
    setLoadedChunks((prev) => prev + 1);
    console.log("Loaded more data");
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, DEBOUNCE_DELAY),
    [handleSearch],
  );

  const addFilter = useCallback((filter: string) => {
    setFilters((prevFilters) => [...prevFilters, filter]);
  }, []);

  const removeFilter = useCallback((filter: string) => {
    setFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters([]);
  }, []);

  return {
    displayedData,
    filters,
    searchQuery,
    handleSearch: debouncedHandleSearch,
    addFilter,
    removeFilter,
    clearFilters,
    loadMoreData,
  };
};

export default useFilter;
