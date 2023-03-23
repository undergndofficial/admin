import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const { useState } = require("react");

function Login(props) {
  const [loginInfo, setLoginInfo] = useState({id:'', password:''});

  const navigate = useNavigate();
  
  const login = () => {
    axios.post('/api/admin/login', loginInfo, {"Content-Type": 'application/json'})
    .then((res) => {
      console.log(res);
      if (res.data.loginSuccess) {
        props.setAdminInfo(res.data.admin);
        if(!alert(res.data.admin.name + "님 반갑습니다!")) navigate('/');
      }
      else alert(res.data.messege);
    })
    .catch((error) => {console.log(error)})
  }

  return(
    <div className="loginPage">
      <input value={loginInfo.id} placeholder="아이디" onChange={(e) => {setLoginInfo({...loginInfo, id: e.target.value})}}/>
      <input type={"password"} placeholder="비밀번호" value={loginInfo.password} onChange={(e) => {setLoginInfo({...loginInfo, password: e.target.value})}}/>
      <button className="loginBtn" onClick={login}>로그인</button>
    </div>
  )
}

export default Login;