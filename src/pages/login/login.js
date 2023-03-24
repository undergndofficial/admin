import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const { useState } = require("react");

function Login(props) {
  const [loginInfo, setLoginInfo] = useState({id:'', password:''});

  const navigate = useNavigate();
  
  const login = () => {
    if( !loginInfo.id || !loginInfo.password) alert('아이디 혹은 비밀번호를 입력해주세요.')
    else {
      axios.post('/api/admin/login', loginInfo, {"Content-Type": 'application/json'})
      .then((res) => {
        console.log(res);
        if (res.data.loginSuccess) {
          props.setIsDone(false)
          if(!alert(res.data.name + "님 반갑습니다!")) navigate('/');
        }
        else alert(res.data.messege);
      })
      .catch((error) => {console.log(error)})
    }
  }

  const enterKey = (e) => {
    if(e.key === 'Enter'){
      login();
    };
  }

  return(
    <div className="loginPage" onKeyUp={(e) => {enterKey(e)}}>
      <input value={loginInfo.id} placeholder="아이디" onChange={(e) => {setLoginInfo({...loginInfo, id: e.target.value})}}/>
      <input type={"password"} placeholder="비밀번호" value={loginInfo.password} onChange={(e) => {setLoginInfo({...loginInfo, password: e.target.value})}}/>
      <button className="loginBtn" onClick={login}>로그인</button>
    </div>
  )
}

export default Login;