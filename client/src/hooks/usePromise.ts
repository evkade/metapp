import React, { useState, useEffect } from "react";

export default function usePromise(promise) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(
    function () {
      setData(null);
      setError(null);
      if (promise !== null && promise !== undefined) {
        promise.then((data) => setData(data)).catch((error) => setError(error));
      }
    },
    [promise]
  );
  return [data, error];
}
