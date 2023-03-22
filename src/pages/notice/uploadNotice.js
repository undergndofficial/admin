import axios from "axios";
import { useState } from "react";
import Inputs from "../../components/recyclingComponents/inputs";

function UploadNotice() {

  const [inputs, setInputs] = useState({
    noticeName: {name: '공지 제목', isPlural: false, isInput: true, type: 'default', addDataName: 'noticeName', inputValue: ''},
    noticeContent: {name: '공지 내용', isPlural: false, isInput: false, type: 'textarea', addDataName: 'noticeContent', inputValue: ''}
  })

  const [notice, setNotice] = useState({
    noticeName: '',
    noticetitle: ''
  })

  const upload = () => {
    axios.post('/api/notice/upload', notice, {"Content-Type": 'application/json'})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {console.log(error)})
  }

  return(
    <div className="upload">
      <Inputs inputs={inputs} setInputs={setInputs} addedDatas={notice} setAddedDatas={setNotice} />
      <button className="uploadBtn" onClick={upload}>등록</button>
    </div>
  )
}

export default UploadNotice;