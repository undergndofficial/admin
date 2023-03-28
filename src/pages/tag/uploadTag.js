import axios from "axios";
import { useState } from "react";
import Inputs from "../../components/recyclingComponents/inputs";

function UploadTag() {

  const [input, setInput] = useState({
    tagName: {name: '태그 이름', isPlural: false, isInput: true, type: 'default', addDataName: 'tagName', inputValue: ''},
  });

  const [tagInfo, setTagInfo] = useState({tagName:''});

  const upload = () => {
    axios.post('/api/tag/upload', tagInfo, {"Content-Type": 'application/json'})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {console.log(error)})

    if(!alert("업로드 되었습니다!")) window.location.reload();
  }

  return(
    <div className="upload">
      <Inputs inputs={input} setInputs={setInput} addedDatas={tagInfo} setAddedDatas={setTagInfo} />
      <button className="uploadBtn" onClick={upload}>등록</button>
    </div>
  )
}

export default UploadTag;