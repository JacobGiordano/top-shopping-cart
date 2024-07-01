import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useRouteChange(callback) {
  const location = useLocation();

  useEffect(() => {
    callback();
  }, [location.pathname]); // Only trigger on pathname change
}

export default useRouteChange;
