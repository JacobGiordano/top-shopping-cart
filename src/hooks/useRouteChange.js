import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useRouteChange(callback) {
  const location = useLocation();

  useEffect(() => {
    callback();
  }, [location.pathname, callback]); // Include callback in dependency array
}

export default useRouteChange;
