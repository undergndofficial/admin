import './App.scss';
import Header from './pages/header/header';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import MovieManage from './pages/movie/movieManage';
import TagManage from './pages/tag/tagManage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import NoticeManage from './pages/notice/noticeManage';
import ReportManage from './pages/report/reportManage';
import UserManage from './pages/user/userManage';
import InquiryManage from './pages/inquiry/inquiryManage';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import PrivateRoute from './privateRoute';
import DeletedMovieManage from './pages/movie/deletedMovieManage';
import CopyMovieManage from './pages/test/copyMovieManage';
import RequestedMovieManage from './pages/movie/requestedMovieManage';
import Festival from './pages/festival/festival';

function App() {

  const isAuth = true;
  const isDone = true;

  // const isLogin = () => {
  //   axios.post('/api/manager/auth', cookie[0].x_auth, {"Content-Type": 'application/json'})
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  //   console.log(cookie[0].x_auth);
  // }
  // const [, , removeCookies] = useCookies(['x_auth']);

  // const cookies = new Cookies();
  // var token = cookies.get('x_auth') 

  // const logOut = () => {
  //   removeCookies('x_auth');
  //   window.location.reload();
  // }

  // const sendToken = () => {
  //   let token = getCookieToken()
  //   axios.post('/api/admin/auth', {token: token}, {"Content-Type": 'application/json'})
  //   .then((res) =>
  //     console.log(res)
  //   )
  //   .catch((error) =>
  //     console.log(error)
  //   )
  // }

  // const [isAuth, setIsAuth] = useState(false);
  // const [isDone, setIsDone] = useState(false);

  // const [adminInfo, setAdminInfo] = useState({});

  // useEffect(() => {
  //   axios.post('/api/admin/auth', {token: token}, {"Content-Type": 'application/json'})
  //   .then((res) => {
  //     setIsAuth(res.data.isAuth);
  //     // setAdminInfo(res.data.admin);
  //     setIsDone(true);
  //   })
  //   .catch((error) =>
  //     console.log(error)
  //   )
  // }, [isDone, token])

  return (
    isDone ?
    <div className="App">
      <Header isAuth={isAuth} 
      // logOut={logOut}
      />
      <main>
        <Routes>
          
          <Route element={<PrivateRoute userAuthentication={false} />}>
            <Route path='/login' element={<Login />} />          
          </Route>
          
          <Route element={<PrivateRoute userAuthentication={true} />}>
            <Route path='/' element={<Main />} />
            <Route path='/festival/*' element={<Festival />} />
            <Route path='/movieManage/*' element={<MovieManage />} />
            <Route path='/deletedMovieManage' element={<DeletedMovieManage />} />
            <Route path='/requestedMovieManage' element={<RequestedMovieManage />} />
            <Route path='/tagManage/*' element={<TagManage />} />\
            <Route path='/noticeManage/*' element={<NoticeManage />} />
            <Route path='/reportManage' element={<ReportManage />} />
            <Route path='/userManage' element={<UserManage />} />
            <Route path='/inquiryManage' element={<InquiryManage />} />
          </Route>
          {/* <Route path='/signup' element={<Signup />} /> */}
          <Route path='/test' element={<PrivateRoute isAuth={isAuth} Component={<CopyMovieManage />} />} />
        </Routes>
      </main>
    </div>
    :
    null
  );
}

export default App;

