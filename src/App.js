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
import { Cookies, useCookies } from 'react-cookie';
import NoticeManage from './pages/notice/noticeManage';
import ReportManage from './pages/report/reportManage';
import UserManage from './pages/user/userManage';
import InquiryManage from './pages/inquiry/inquiryManage';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import UploadNotice from './pages/notice/uploadNotice';
import UploadTag from './pages/tag/uploadTag';
import PrivateRoute from './privateRoute';

function App() {

  // const isLogin = () => {
  //   axios.post('/api/manager/auth', cookie[0].x_auth, {"Content-Type": 'application/json'})
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  //   console.log(cookie[0].x_auth);
  // }
  const [cookies, setCookies, removeCookies] = useCookies(['x_auth']);

  const logOut = () => {
    removeCookies('x_auth');
    window.location.reload();
  }

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

  const [isAuth, setIsAuth] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const [adminInfo, setAdminInfo] = useState({});

  useEffect(() => {
    axios.post('/api/admin/auth', {token: cookies.x_auth}, {"Content-Type": 'application/json'})
    .then((res) => {
      setIsAuth(res.data.isAuth);
      setIsDone(true);
    })
    .catch((error) =>
      console.log(error)
    )
  }, [])

  return (
    isDone ?
    <div className="App">
      <Header adminInfo={adminInfo} logOut={logOut}/>
      {/* <button onClick={() => {console.log(isAuth)}}>ddd</button> */}
      <main>
        <Routes>
          <Route path='/' element={<PrivateRoute isAuth={isAuth} Component={<Main />} />} />
          <Route path='/movieManage' element={<PrivateRoute isAuth={isAuth} Component={<MovieManage />} />} />
          <Route path='/tagManage' element={<PrivateRoute isAuth={isAuth} Component={<TagManage />} />} />
          <Route path='/uploadMovie' element={<PrivateRoute isAuth={isAuth} Component={<UploadMovie />} />} />
          <Route path='/noticeManage' element={<PrivateRoute isAuth={isAuth} Component={<NoticeManage />} />} />
          <Route path='/reportManage' element={<PrivateRoute isAuth={isAuth} Component={<ReportManage />} />} />
          <Route path='/userManage' element={<PrivateRoute isAuth={isAuth} Component={<UserManage />} />} />
          <Route path='/inquiryManage' element={<PrivateRoute isAuth={isAuth} Component={<InquiryManage />} />} />
          <Route path='/login' element={<Login setAdminInfo={setAdminInfo} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='uploadNotice' element={<PrivateRoute isAuth={isAuth} Component={<UploadNotice />} />} />
          <Route path='/uploadTag' element={<PrivateRoute isAuth={isAuth} Component={<UploadTag />} />} />
        </Routes>
      </main>
    </div>
    :
    null
  );
}

export default App;

