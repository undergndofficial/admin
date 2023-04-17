import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ManageMain from "../../components/recyclingComponents/manageMain";
import Upload from "../../components/recyclingComponents/upload";

function NoticeManage() {

  const listName = '공지';

  const elements = {noticeName: '공지 제목', noticeContent: '내용', date: '등록일'};

  const defaultShow = ['noticeName', 'noticeContent', 'date'];
  const api = 'notice';

  const [searchInputs, setSearchInputs] = useState({
    noticeName: {name: '공지 제목', isPlural: true, isInput: true, type: 'default', addDataName: 'noticeName', inputValue: ''},
    noticeContent: {name: '공지 내용', isPlural: true, isInput: true, type: 'default', addDataName: 'noticeContent', inputValue: ''},
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: 'date', inputValue: ''}
  });
  const [addedSearchDatas, setAddedSearchDatas] = useState({
    noticeName:[],
    noticeContent: [],
    date: ['', '']
  });

  const [uploadInputs, setUploadInputs] = useState({
    noticeName: {name: '공지 제목', isPlural: false, isInput: true, type: 'default', addDataName: 'noticeName', inputValue: ''},
    noticeContent: {name: '공지 내용', isPlural: false, isInput: false, type: 'textarea', addDataName: 'noticeContent', inputValue: ''}
  });
  const [addedUploadDatas, setAddedUploadDatas] = useState({
    noticeName: '',
    noticetitle: ''
  });


  return(
    <div className="manage">
      <h2>공지 관리 페이지</h2>
      <Routes>
        <Route path="/" element={<ManageMain searchInputs={searchInputs} setSearchInputs={setSearchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listName={listName} uploadBtn={true} />} />
        <Route path="/upload" element={<Upload uploadInputs={uploadInputs} setUploadInputs={setUploadInputs} addedUploadDatas={addedUploadDatas} setAddedUploadDatas={setAddedUploadDatas} api={api} />} />
      </Routes>
    </div>
  )
}

export default NoticeManage;