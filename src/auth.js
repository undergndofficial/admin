import axios from "axios";
import React, { useEffect } from "react";

export default function () {
  function AuthCheck(props) {
    useEffect(() => {
      axios.get('/api/manager/auth')
    })
  }
}