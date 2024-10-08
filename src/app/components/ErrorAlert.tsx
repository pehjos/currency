import React from "react";
import { ErrorAlertProps } from "../types/currencyTypes";

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div
      className="bg-red-100 z-4 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorAlert;
