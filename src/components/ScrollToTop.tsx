import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else {
      const id = hash.replace("#", "");
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
      scrollToElement();
      const timer = setTimeout(scrollToElement, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, search, hash]);

  return null;
}
