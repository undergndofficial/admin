import axios from "axios";

const { useState } = require("react");

function Login() {
  const [loginInfo, setLoginInfo] = useState({id:'', password:''});
  
  const login = () => {
    axios.post('/api/manager/login', loginInfo, {"Content-Type": 'application/json'})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {console.log(error)})
  }

  return(
    <div className="loginPage">
      <input value={loginInfo.id} onChange={(e) => {setLoginInfo({...loginInfo, id: e.target.value})}}/>
      <input type={"password"} value={loginInfo.password} onChange={(e) => {setLoginInfo({...loginInfo, password: e.target.value})}}/>
      <button onClick={login}>로그인</button>
    </div>
  )
}

export default Login;