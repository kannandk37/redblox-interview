import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FallBack = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Something went wrong</h1>
      <button
        style={{
          width: "80px",
          height: "35px",
          color: "white",
          background: "black",
        }}
        onClick={() => {
          navigate("/list");
        }}
      >
        Retry
      </button>
    </div>
  );
};

export default FallBack;
