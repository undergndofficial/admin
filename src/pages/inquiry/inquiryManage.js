import { useState } from "react";
import ManageMain from "../../components/recyclingComponents/manageMain";

function InquiryManage () {

  const listName = '1대1 문의'

  const elements = {inquiryName: '제목', inquiryCategory: '문의 유형', content: '내용', poster: ['질문자', 'userName'], isAnswered: '답변여부', date: '등록일'};

  const defaultShow = ['inquiryName', 'inquiryCategory', 'poster', 'date'];
  const api = 'inquiry'

  const [searchInputs, setSearchInputs] = useState({
    inquiryName: {name: '제목', isPlural: true, isInput: true, type: 'default', addDataName: 'inquiryName', inputValue: ''},
    inquiryCategory: {name: '문의 유형', isPlural: true, isInput: false, type: 'select', addDataName: 'inquiryCategory', inputValue: '', selectMenus:['유형1', '유형2', '유형3']},
    poster: {name: '질문자', isPlural: true, isInput: true, type: 'default', addDataName: 'poster'}, 
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: 'date', inputValue: ''},
    // isAnswered: {name: '답변여부', isPlural: false, isInput: true, type:'checkbox', addDataName: 'isAnswered', inputValue: '', checkList:['답변완료', '미답변']}
    isAnswered: {name: '답변여부', isPlural: false, isInput: true, type:'isTrue', addDataName: 'isAnswered', inputValue: '', menus:['답변완료', '미답변']}
  })
  const [addedSearchDatas, setAddedSearchDatas] = useState({
    inquiryName:[],
    inquiryCategory: [],
    poster: [],
    isAnswered: '',
    date: ['', '']
  })

  return (
    <div className="manage">
      <h2>1대1 문의 관리 페이지</h2>
      <ManageMain searchInputs={searchInputs} setSearchInputs={setSearchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listName={listName} />
    </div>
  )
}

export default InquiryManage;