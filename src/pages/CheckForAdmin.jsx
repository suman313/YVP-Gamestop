import React from "react";

function CheckForAdmin(props) {
  if (localStorage.getItem("UserEmail") == "admin@gmail.com")
    return <>{props.children}</>;
  else <></>;
}

export default CheckForAdmin;
