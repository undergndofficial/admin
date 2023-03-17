import axios from "axios";
import { useState } from "react";
import Inputs from "../../components/recyclingComponents/inputs";

function ReportSearchFilter(props) {

  const [inputs, setInputs] = useState({
    reportCategory: {name: '오류 종류', isPlural: true, isInput: false, type: 'select', addDataName: 'reportCategory', inputValue: '', selectMenus:['이게 안돼요', '저게 안돼요', '이게 이렇게 돼요']},
    content: {name: '오류 내용', isPlural: true, isInput: true, type: 'default', addDataName: 'content', inputValue: ''},
    poster: {name: '등록인', isPlural: true, isInput: true, type: 'default', addDataName: 'poster'}, 
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: ['startDate', 'endDate'], inputValue: ''},
    isAnswered: {name: '답변여부', isPlural: false, isInput: true, type:'checkbox', addDataName: 'isAnswered', inputValue: '', checkList:['답변완료', '미답변']}
  })

  const [addedDatas, setAddedDatas] = useState({
    reportCategory:[],
    content: [],
    poster: [],
    isAnswered: '',
    startDate: '',
    endDate: ''
  })
  
  const search = () => {
    // props.setQueryData(addedDatas);
    console.log(addedDatas)
  }

  return(
    <div className="searchFilter">
      <Inputs inputs={inputs} setInputs={setInputs} addedDatas={addedDatas} setAddedDatas={setAddedDatas} />
      <button className="searchBtn" onClick={search}>검색</button>
    </div>
  )
}

export default ReportSearchFilter;