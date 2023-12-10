import { useEffect } from "react";

export default function UseOutsideClick(ref, exeptionId, cb) {
  useEffect(() => {
    function handelOutsideClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id != exeptionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handelOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handelOutsideClick);
    };
  }, [ref, cb]);
}
