import { useState } from "react";
import Inputs from "../../components/recyclingComponents/inputs";


function NoticeSearchFilter(props) {
  const [inputs, setInputs] = useState({
    noticeTitle: {name: '공지 제목', isPlural: true, isInput: true, type: 'default', addDataName: 'noticeTitle', inputValue: ''},
    noticeContent: {name: '공지 내용', isPlural: true, isInput: true, type: 'default', addDataName: 'noticeContent', inputValue: ''},
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: ['startDate', 'endDate'], inputValue: ''}
  })

  const [addedDatas, setAddedDatas] = useState({
    noticeTitle:[],
    noticeContent: [],
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

export default NoticeSearchFilter;