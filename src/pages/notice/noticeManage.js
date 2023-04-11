import axios from "axios";
import { useEffect, useState } from "react";
import List from "../../components/recyclingComponents/list";
import SearchFilter from "../../components/recyclingComponents/searchFilter";

function NoticeManage() {

  const [dataLength, setDataLength] = useState();
  const [queryData, setQueryData] = useState();
  const elements = {noticeName: '공지 제목', noticeContent: '내용', date: '등록일'};

  const [searchInputs, setSearchInputs] = useState({
    noticeName: {name: '공지 제목', isPlural: true, isInput: true, type: 'default', addDataName: 'noticeName', inputValue: ''},
    noticeContent: {name: '공지 내용', isPlural: true, isInput: true, type: 'default', addDataName: 'noticeContent', inputValue: ''},
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: 'date', inputValue: ''}
  })

  const [addedSearchDatas, setAddedSearchDatas] = useState({
    noticeName:[],
    noticeContent: [],
    date: ['', '']
  })

  const [searchOption, setSearchOption] = useState('and');

  return(
    <div className="manage">
      <h2>공지 관리 페이지</h2>
      <SearchFilter inputs={searchInputs} setInputs={setSearchInputs} addedDatas={addedSearchDatas} setAddedDatas={setAddedSearchDatas} queryData={queryData} setQueryData={setQueryData} searchOption={searchOption} setSearchOption={setSearchOption} setDataLength={setDataLength} getLengthApi={'notice/getLength'} />
      <List dataLength={dataLength} queryData={queryData} searchOption={searchOption} elements={elements} defaultShow={['noticeName', 'noticeContent', 'date']} listName='공지' getListApi={'notice/getNoticeList'} />
    </div>
  )
}

export default NoticeManage;