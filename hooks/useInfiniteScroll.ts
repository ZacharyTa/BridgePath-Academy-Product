import { useEffect, useCallback } from "react";
import throttle from "lodash.throttle";

interface UseInfiniteScrollProps {
  loadMoreData: () => void;
  isEnabled: boolean;
  containerSelector: string;
  throttleMs?: number;
}

const useInfiniteScroll = ({
  loadMoreData,
  isEnabled,
  containerSelector,
  throttleMs = 200,
}: UseInfiniteScrollProps): null => {
  const handleScroll = useCallback(
    throttle((event: any) => {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      console.log("Scrolling!!", scrollTop, scrollHeight, clientHeight);
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        loadMoreData();
      }
    }, throttleMs),
    [loadMoreData, throttleMs],
  );

  useEffect(() => {
    if (isEnabled) {
      const scrollContainer = document.querySelector(containerSelector);
      if (scrollContainer) {
        console.log("Adding scroll event listener");
        scrollContainer.addEventListener("scroll", handleScroll);
      } else {
        console.log("Scroll container not found");
      }

      return () => {
        if (scrollContainer) {
          console.log("Removing scroll event listener");
          scrollContainer.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [handleScroll, isEnabled, containerSelector]);

  return null;
};

export default useInfiniteScroll;
