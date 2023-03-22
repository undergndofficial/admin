import axios from "axios";
import { useState } from "react";
import Inputs from "../../components/recyclingComponents/inputs";

function Signup() {

  const [inputs, setInputs] = useState({
    id: {name: '아이디', isPlural: false, isInput: true, type: 'default', addDataName: 'id', inputValue: ''},
    name: {name: '이름', isPlural: false, isInput: true, type: 'default', addDataName: 'name', inputValue: ''},
    pheNumber: {name: '전화번호', isPlural: false, isInput: true, type: 'default', addDataName: 'phoneNumber', inputValue: ''},
    password: {name: '비밀번호', isPlural: false, isInput: true, type: 'default', addDataName: 'password', inputValue: ''}
  })

  const [signupInfo, setSignupInfo] = useState({id:'', name:'', phoneNumber:'', password:''});

  const signup = () => {
    axios.post('/api/manager/signup', signupInfo, {"Content-Type": 'application/json'})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {console.log(error)})
  }

  return(
    <div className="upload">
      <Inputs inputs={inputs} setInputs={setInputs} addedDatas={signupInfo} setAddedDatas={setSignupInfo} />
      <button className="uploadBtn" onClick={signup}>등록</button>
    </div>
  )
}

export default Signup;