import { useNavigate } from "react-router-dom";
import {isEmpty} from "lodash";

function Header(props){

  const navigate = useNavigate();
  const isLogin = !isEmpty(localStorage.getItem('x_access_token'));
  const logOut = () => {
    localStorage.removeItem('x_access_token');
    localStorage.removeItem('x_refresh_token');
  }

  return(
    <header>
      <nav>
        <button onClick={() => {navigate('/')}}>홈</button>
        <button onClick={() => {navigate('/movieManage')}}>영화</button>
        <button onClick={() => {navigate('/festival')}}>영화제</button>
        <button onClick={() => {navigate('/userManage')}}>회원</button>
        <button>통계</button>
        {isLogin ? <button className="logOutBtn" onClick={logOut}>로그아웃</button> : null}
      </nav> 
    </header>
  )
}

export default Header;