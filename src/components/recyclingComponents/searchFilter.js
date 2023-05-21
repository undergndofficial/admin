import axios from "axios";
import { useState, useEffect } from "react";
import Inputs from "./inputs";

function SearchFilter(props) {

  const [searchOptionCheckbox, setSearchOptionCheckbox] = useState('and');

  const search = () => {
    console.log(props.addedDatas);
    console.log(props.inputs)
    props.setQueryData(props.addedDatas);
    props.setSearchOption(searchOptionCheckbox);
  }

  const {queryData, searchOption, api, setDataLength} = props;

  useEffect(() => {
    axios.post('/api/'+api+'/getLength', {queryData: queryData, searchOption: searchOption}, {"Content-Type": 'application/json'})
    .then((response) => {
      setDataLength(response.data);
    })
  }, [queryData, searchOption, api, setDataLength])

  return(
    <div className="searchFilter">
      <Inputs inputs={props.inputs} setInputs={props.setInputs} addedDatas={props.addedDatas} setAddedDatas={props.setAddedDatas} />
      <div className="searchOptionCheckbox">
        <input type={"checkbox"} checked={searchOptionCheckbox==='and'} value='and' onChange={(e) => {setSearchOptionCheckbox(e.target.value)}}/><span onClick={() => setSearchOptionCheckbox('and')} >and</span>
        <input type={"checkbox"} checked={searchOptionCheckbox==='or'} value='or' onChange={(e) => {setSearchOptionCheckbox(e.target.value)}}/><span onClick={() => setSearchOptionCheckbox('or')} >or</span>
      </div>
      <button className="searchBtn" onClick={search}>검색</button>
    </div>
  )
}

export default SearchFilter;