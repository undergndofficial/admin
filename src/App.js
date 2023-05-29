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

function App() {

  // const isLogin = () => {
  //   axios.post('/api/manager/auth', cookie[0].x_auth, {"Content-Type": 'application/json'})
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  //   console.log(cookie[0].x_auth);
  // }
  const [, , removeCookies] = useCookies(['x_auth']);

  const cookies = new Cookies();
  var token = cookies.get('x_auth') 

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

  // const [adminInfo, setAdminInfo] = useState({});

  useEffect(() => {
    axios.post('/api/admin/auth', {token: token}, {"Content-Type": 'application/json'})
    .then((res) => {
      setIsAuth(res.data.isAuth);
      // setAdminInfo(res.data.admin);
      setIsDone(true);
    })
    .catch((error) =>
      console.log(error)
    )
  }, [isDone, token])

  
  return (
    isDone ?
    <div className="App">
      <Header isAuth={isAuth} logOut={logOut}/>
      <main>
        <Routes>
          <Route path='/' element={<PrivateRoute isAuth={isAuth} Component={<Main />} />} />
          <Route path='/movieManage/*' element={<PrivateRoute isAuth={isAuth} Component={<MovieManage />} />} />
          <Route path='/deletedMovieManage' element={<PrivateRoute isAuth={isAuth} Component={<DeletedMovieManage />} /> } />
          <Route path='/tagManage/*' element={<PrivateRoute isAuth={isAuth} Component={<TagManage />} />} />\
          <Route path='/noticeManage/*' element={<PrivateRoute isAuth={isAuth} Component={<NoticeManage />} />} />
          <Route path='/reportManage' element={<PrivateRoute isAuth={isAuth} Component={<ReportManage />} />} />
          <Route path='/userManage' element={<PrivateRoute isAuth={isAuth} Component={<UserManage />} />} />
          <Route path='/inquiryManage' element={<PrivateRoute isAuth={isAuth} Component={<InquiryManage />} />} />
          <Route path='/login' element={<Login setIsDone={setIsDone}/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/test' element={<PrivateRoute isAuth={isAuth} Component={<CopyMovieManage />} />} />
        </Routes>
      </main>
    </div>
    :
    null
  );
}

export default App;

