import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../api/baseurl";

const { useState } = require("react");

function Login(props) {
  const [loginInfo, setLoginInfo] = useState({admin_id:'', admin_pass:''});

  const navigate = useNavigate();
  
  const login = () => {
    if( !loginInfo.admin_id || !loginInfo.admin_pass) alert('아이디 혹은 비밀번호를 입력해주세요.')
    else {
      axios.post(apiUrl+'/member/signin', loginInfo, {"Content-Type": 'application/json'})
      .then((res) => {
        console.log(res);
        if (res.data.st) {
          // props.setIsDone(false)
          console.log(res.data.rs.x_access_token)
          localStorage.setItem('x_access_token', res.data.rs.x_access_token)
          localStorage.setItem('x_refresh_token', res.data.rs.x_refresh_token)
          if(!alert("반갑습니다!")) navigate('/');
        }
        else alert(res.data.err.desc);
      })
    }
  }

  const enterKey = (e) => {
    if(e.key === 'Enter'){
      login();
    };
  }

  return(
    <div className="loginPage" onKeyUp={(e) => {enterKey(e)}}>
      <input value={loginInfo.id} placeholder="아이디" onChange={(e) => {setLoginInfo({...loginInfo, admin_id: e.target.value})}}/>
      <input type={"password"} placeholder="비밀번호" value={loginInfo.password} onChange={(e) => {setLoginInfo({...loginInfo, admin_pass: e.target.value})}}/>
      <button className="loginBtn" onClick={login}>로그인</button>
    </div>
  )
}

export default Login;