import { useEffect, useState } from "react";

const useDetectMobile = (breakpoint: number = 400) => {
  const check = () => window.innerWidth < breakpoint;
  const [isMobile, setIsMobile] = useState(check());

  const handleResize = () => {
    setIsMobile(check());
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("load", handleResize);
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile };
};

export default useDetectMobile;
