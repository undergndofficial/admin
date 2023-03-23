import axios from "axios";
import React, { useEffect } from "react";
import { Cookies } from "react-cookie"
import { Navigate } from "react-router-dom";

function PrivateRoute(props) {
  return(
    props.isAuth ? props.Component : <Navigate to="/login" {...alert("로그인이 필요합니다.")}/>  
  )
}

export default PrivateRoute