import axios from "axios";
import { useState, useEffect } from "react";
import Inputs from "./inputs";

function SearchFilter(props) {

  const [searchMode, setSearchMode] = useState('모두 일치');

  const searchModeChange = () => {
    searchMode === '모두 일치'
    ?
    setSearchMode('하나 이상 일치')
    :
    setSearchMode('모두 일치')
  }

  const search = () => {
    // console.log(props.addedDatas);
    console.log(props.addedDatas);
    console.log(props.inputs)
    props.setQueryData(props.addedDatas);
    // props.setSearchOption(searchOptionCheckbox);
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
      <Inputs inputs={props.inputs} addedDatas={props.addedDatas} setAddedDatas={props.setAddedDatas} />
      {/* <div className="searchOptionCheckbox">
        <input type={"checkbox"} checked={searchOptionCheckbox==='and'} value='and' onChange={(e) => {setSearchOptionCheckbox(e.target.value)}}/><span onClick={() => setSearchOptionCheckbox('and')} >and</span>
        <input type={"checkbox"} checked={searchOptionCheckbox==='or'} value='or' onChange={(e) => {setSearchOptionCheckbox(e.target.value)}}/><span onClick={() => setSearchOptionCheckbox('or')} >or</span>
      </div> */}
      <div>
        {/* <button className="searchMode" onClick={searchModeChange}>{searchMode}</button> */}
        <button className="searchBtn" onClick={search}>검색</button>
      </div>
    </div>
  )
}

export default SearchFilter;