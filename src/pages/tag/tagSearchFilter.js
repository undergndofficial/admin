import axios from "axios";
import { useState } from "react";
import Inputs from "../../components/recyclingComponents/inputs";

function TagSearchFilter(props) {

  const [inputs, setInputs] = useState({
    tagName: {name: '태그 이름', isPlural: true, isInput: true, type: 'default', addDataName: 'tagName', inputValue: ''},
    movies: {name: '영화', isPlural: true, isInput: true, type: 'default', addDataName: 'movies', inputValue: ''},
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: ['startDate', 'endDate'], inputValue: ''}
  })

  const [addedDatas, setAddedDatas] = useState({
    tagName:[],
    movies: [],
    startDate: '',
    endDate: ''
  })
  
  const search = () => {
    props.setQueryData(addedDatas);
  }

  return(
    <div className="searchFilter">
      <Inputs inputs={inputs} setInputs={setInputs} addedDatas={addedDatas} setAddedDatas={setAddedDatas} />
      <button className="searchBtn" onClick={search}>검색</button>
    </div>
  )
}

export default TagSearchFilter;