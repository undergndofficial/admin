import { useState } from "react";
import ManageMain from "../../components/recyclingComponents/manageMain";

function ReportManage () {

  const listName = '오류 리포트';

  const elements = {reportCategory: '오류 종류', content: '내용', poster: ['등록인', 'userName'], date: '등록일'};

  const defaultShow = ['reportCategory', 'content', 'poster', 'date'];
  const api = 'report';

  const [searchInputs, setSearchInputs] = useState({
    reportCategory: {name: '오류 종류', isPlural: true, isInput: false, type: 'select', addDataName: 'reportCategory', inputValue: '', selectMenus:['이게 안돼요', '저게 안돼요', '이게 이렇게 돼요']},
    content: {name: '오류 내용', isPlural: true, isInput: true, type: 'default', addDataName: 'content', inputValue: ''},
    poster: {name: '등록인', isPlural: true, isInput: true, type: 'default', addDataName: 'poster'}, 
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: 'date', inputValue: ''},
    isAnswered: {name: '답변여부', isPlural: false, isInput: true, type:'checkbox', addDataName: 'isAnswered', inputValue: '', checkList:['답변완료', '미답변']}
  })

  const [addedSearchDatas, setAddedSearchDatas] = useState({
    reportCategory:[],
    content: [],
    poster: [],
    isAnswered: '',
    date: ['', '']
  })

  return (
    <div className="manage">
      <h2>오류 리포트 관리 페이지</h2>
      <ManageMain searchInputs={searchInputs} setSearchInputs={setSearchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listName={listName} />
    </div>
  )
}

export default ReportManage;