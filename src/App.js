import logo from './logo.svg';
import './App.scss';
import Header from './pages/header/header';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import MovieManage from './pages/movie/movieManage';
import UploadMovie from './pages/movie/uploadMovie';
import TagManage from './pages/tag/tagManage';
import axios from 'axios';
import { useState } from 'react';
import NoticeManage from './pages/notice/noticeManage';
import ReportManage from './pages/report/reportManage';
import UserManage from './pages/user/userManage';
import InquiryManage from './pages/inquiry/inquiryManage';

function App() {

  const [tag, setTag] = useState({tagName:''});
  const [notice, setNotice] = useState({noticeName:'', noticeContent:''});

  const upload = () => {
    axios.post('/api/notice/upload', notice, {"Content-Type": 'application/json'})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {console.log(error)})
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movieManage' element={<MovieManage />} />
          <Route path='/tagManage' element={<TagManage />} />
          <Route path='/uploadMovie' element={<UploadMovie />} />
          <Route path='/noticeManage' element={<NoticeManage />} />
          <Route path='/reportManage' element={<ReportManage />} />
          <Route path='/userManage' element={<UserManage />} />
          <Route path='/inquiryManage' element={<InquiryManage />} />
        </Routes>
      </main>
      {/* <input value={tag.tagName} onChange={(e) => {setTag({...tag, tagName: e.target.value})}}/>
      <button onClick={upload}>등록</button> */}
      {/* <input value={notice.noticeName} onChange={(e) => {setNotice({...notice, noticeName: e.target.value})}}/>
      <textarea value={notice.noticeContent} onChange={(e) => {setNotice({...notice, noticeContent: e.target.value})}} />
      <button onClick={upload}>등록</button> */}
    </div>
  );
}

export default App;

//mongodb+srv://jangjy0105:<password>@cluster0.k2wlodc.mongodb.net/?retryWrites=true&w=majority