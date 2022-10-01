import React from "react";

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-[#1e2337] p-2 rounded-md">
      Decrypted Message
    </button>
  );
};

export default Button;
