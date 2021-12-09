import React, { useEffect } from "react";

const Alert = ({ alert, removeAlert, items }) => {
  const { show, msg, type } = alert;

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [items]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
