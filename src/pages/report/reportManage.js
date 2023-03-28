import axios from "axios";
import { useEffect, useState } from "react";
import List from "../../components/recyclingComponents/list";
import SearchFilter from "../../components/recyclingComponents/searchFilter";

function ReportManage () {

  const [dataLength, setDataLength] = useState();
  const [queryData, setQueryData] = useState();
  const elements = {reportCategory: '오류 종류', content: '내용', poster: ['등록인', 'userName'], date: '등록일'};

  const [searchInputs, setSearchInputs] = useState({
    reportCategory: {name: '오류 종류', isPlural: true, isInput: false, type: 'select', addDataName: 'reportCategory', inputValue: '', selectMenus:['이게 안돼요', '저게 안돼요', '이게 이렇게 돼요']},
    content: {name: '오류 내용', isPlural: true, isInput: true, type: 'default', addDataName: 'content', inputValue: ''},
    poster: {name: '등록인', isPlural: true, isInput: true, type: 'default', addDataName: 'poster'}, 
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: ['startDate', 'endDate'], inputValue: ''},
    isAnswered: {name: '답변여부', isPlural: false, isInput: true, type:'checkbox', addDataName: 'isAnswered', inputValue: '', checkList:['답변완료', '미답변']}
  })

  const [addedSearchDatas, setAddedSearchDatas] = useState({
    reportCategory:[],
    content: [],
    poster: [],
    isAnswered: '',
    startDate: '',
    endDate: ''
  })

  const [searchOption, setSearchOption] = useState('and');

  return (
    <div className="manage">
      <h2>오류 리포트 관리 페이지</h2>
      <SearchFilter inputs={searchInputs} setInputs={setSearchInputs} addedDatas={addedSearchDatas} setAddedDatas={setAddedSearchDatas} queryData={queryData} setQueryData={setQueryData} searchOption={searchOption} setSearchOption={setSearchOption} setDataLength={setDataLength} getLengthApi={'report/getLength'} />
      <List dataLength={dataLength} queryData={queryData} searchOption={searchOption} elements={elements} defaultShow={['reportCategory', 'content', 'poster', 'date']} listName='오류 리포트' getListApi={'report/getReportList'} />
    </div>
  )
}

export default ReportManage;