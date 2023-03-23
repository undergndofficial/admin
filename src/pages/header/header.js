import { useNavigate } from "react-router-dom";

function Header(props){

  const navigate = useNavigate()

  return(
    <header>
      <nav>
        <button onClick={() => {navigate('/')}}>홈</button>
        <button onClick={() => {navigate('/movieManage')}}>영화</button>
        <button>게시판</button>
        <button onClick={() => {navigate('/userManage')}}>회원</button>
        <button>통계</button>
        {props.adminInfo ? <button className="logOutBtn" onClick={props.logOut}>로그아웃</button> : null}
      </nav> 
    </header>
  )
}

export default Header;