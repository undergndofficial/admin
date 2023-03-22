import logo from './logo.svg';
import './App.scss';
import Header from './pages/header/header';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import MovieManage from './pages/movie/movieManage';
import UploadMovie from './pages/movie/uploadMovie';
import TagManage from './pages/tag/tagManage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import NoticeManage from './pages/notice/noticeManage';
import ReportManage from './pages/report/reportManage';
import UserManage from './pages/user/userManage';
import InquiryManage from './pages/inquiry/inquiryManage';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import UploadNotice from './pages/notice/uploadNotice';

function App() {

  // const isLogin = () => {
  //   axios.post('/api/manager/auth', cookie[0].x_auth, {"Content-Type": 'application/json'})
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  //   console.log(cookie[0].x_auth);
  // }

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
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='uploadNotice' element={<UploadNotice />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

//mongodb+srv://jangjy0105:<password>@cluster0.k2wlodc.mongodb.net/?retryWrites=true&w=majority