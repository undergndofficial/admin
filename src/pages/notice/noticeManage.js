import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ManageMain from "../../components/recyclingComponents/manageMain";
import Upload from "../../components/recyclingComponents/upload";

function NoticeManage() {

  const listName = '공지';

  const elements = {noticeTitle: '공지 제목', noticeContent: '내용', createdDate: '등록일'};

  const defaultShow = ['noticeTitle', 'noticeContent', 'createdDate'];
  const api = 'notice';

  const searchInputs = {
    noticeTitle: {name: '공지 제목', isPlural: true, isInput: true, type: 'default', addDataName: 'noticeTitle'},
    noticeContent: {name: '공지 내용', isPlural: true, isInput: true, type: 'default', addDataName: 'noticeContent'},
    createdDate: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: 'createdDate'}
  };
  const [addedSearchDatas, setAddedSearchDatas] = useState({
    noticeTitle:[],
    noticeContent: [],
    createdDate: ['', '']
  });

  const uploadInputs = {
    noticeTitle: {name: '공지 제목', isPlural: false, isInput: true, type: 'default', addDataName: 'noticeTitle'},
    noticeContent: {name: '공지 내용', isPlural: false, isInput: false, type: 'textarea', addDataName: 'noticeContent'}
  };
  const [addedUploadDatas, setAddedUploadDatas] = useState({
    noticeTitle: '',
    noticeContent: ''
  });

  const listBtns = [
    {name: '삭제', api: '/notice/delete' },
    {name: '공개', api: '/notice/open'},
    {name: '미공개', api: '/notice/close'}
  ];


  return(
    <div className="manage">
      <h2>공지 관리 페이지</h2>
      <Routes>
        <Route path="/" element={<ManageMain searchInputs={searchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listName={listName} uploadBtn={true} listBtns={listBtns} />} />
        <Route path="/upload" element={<Upload uploadInputs={uploadInputs} addedUploadDatas={addedUploadDatas} setAddedUploadDatas={setAddedUploadDatas} api={api} />} />
      </Routes>
    </div>
  )
}

export default NoticeManage;