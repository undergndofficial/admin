import axios from "axios";
import { useState, useEffect } from "react";
import Inputs from "./inputs";

function SearchFilter(props) {
  
  const search = () => {
    props.setQueryData(props.addedDatas);
  }

  useEffect(() => {
    axios.post('/api/'+props.getLengthApi, {queryData: props.queryData}, {"Content-Type": 'application/json'})
    .then((response) => {
      props.setDataLength(response.data);
    })
  },[props.queryData])

  return(
    <div className="searchFilter">
      <Inputs inputs={props.inputs} setInputs={props.setInputs} addedDatas={props.addedDatas} setAddedDatas={props.setAddedDatas} />
      <button className="searchBtn" onClick={search}>검색</button>
    </div>
  )
}

export default SearchFilter;