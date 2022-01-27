/* eslint-disable comma-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
import { useCallback, useRef } from 'react';

export default function useScrollLoading(
  loading,
  setPageNumber,
  callback,
  dependencies
) {
  const observer = useRef();
  const lastMarsElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPage) => prevPage + 1);
          callback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [...dependencies]
  );

  return lastMarsElementRef;
}
