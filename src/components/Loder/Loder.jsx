import React from "react";
import { LoaderIcon } from "react-hot-toast";

function Loder() {
  return (
    <div
      style={{
        display: "flex",
        color: "black",
        alignItems: "center",
        gap: "1rem",
        margin: "1rem auto",
      }}
    >
      <p>Loding...</p>
      <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />
    </div>
  );
}

export default Loder;
