import axios from "axios";
import { useEffect, useState } from "react";
import List from "../../components/recyclingComponents/list";
import SearchFilter from "../../components/recyclingComponents/searchFilter";

function InquiryManage () {

  const [dataLength, setDataLength] = useState();
  const [queryData, setQueryData] = useState();
  const elements = {inquiryName: '제목', inquiryCategory: '문의 유형', content: '내용', poster: ['질문자', 'userName'], isAnswered: '답변여부', date: '등록일'};

  const [searchInputs, setSearchInputs] = useState({
    inquiryName: {name: '제목', isPlural: true, isInput: true, type: 'default', addDataName: 'inquiryName', inputValue: ''},
    inquiryCategory: {name: '문의 유형', isPlural: true, isInput: false, type: 'select', addDataName: 'inquiryCategory', inputValue: '', selectMenus:['유형1', '유형2', '유형3']},
    content: {name: '문의 내용', isPlural: true, isInput: true, type: 'default', addDataName: 'content', inputValue: ''},
    poster: {name: '질문자', isPlural: true, isInput: true, type: 'default', addDataName: 'poster'}, 
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: ['startDate', 'endDate'], inputValue: ''},
    isAnswered: {name: '답변여부', isPlural: false, isInput: true, type:'checkbox', addDataName: 'isAnswered', inputValue: '', checkList:['답변완료', '미답변']}
  })

  const [addedSearchDatas, setAddedSearchDatas] = useState({
    inquiryName:[],
    inquiryCategory: [],
    content: [],
    poster: [],
    isAnswered: '',
    startDate: '',
    endDate: ''
  })

  const [searchOption, setSearchOption] = useState('and');

  return (
    <div className="manage">
      <h2>1대1 문의 관리 페이지</h2>
      <SearchFilter inputs={searchInputs} setInputs={setSearchInputs} addedDatas={addedSearchDatas} setAddedDatas={setAddedSearchDatas} queryData={queryData} setQueryData={setQueryData} searchOption={searchOption} setSearchOption={setSearchOption} setDataLength={setDataLength} getLengthApi={'inquiry/getLength'} />
      <List dataLength={dataLength} queryData={queryData} searchOption={searchOption} elements={elements} defaultShow={['inquiryName', 'inquiryCategory', 'poster', 'date']} listName='1대1 문의' getListApi={'inquiry/getInquiryList'} />
    </div>
  )
}

export default InquiryManage;