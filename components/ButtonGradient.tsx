"use client";

import React from "react";

const ButtonGradient = ({
  title = "Gradient Button",
  onClick = () => {},
}: {
  title?: string;
  onClick?: () => void;
}) => {
  return (
    <button className="btn-gradient animate-shimmer btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonGradient;
