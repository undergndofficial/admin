import axios from "axios";
import Inputs from "./inputs";
import { useState } from "react";

function Upload(props) {

  const upload = () => {
    // axios.post('/api/'+props.api+'/upload', props.addedUploadDatas, {"Content-Type": 'application/json'})
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((error) => {console.log(error)})
    console.log(props.addedUploadDatas)
    // if(!alert("업로드 되었습니다!")) window.location.reload();
  }

  return(
    <div className="upload">
      <Inputs inputs={props.uploadInputs} addedDatas={props.addedUploadDatas} setAddedDatas={props.setAddedUploadDatas} />
      <button className="uploadBtn" onClick={props.upload}>등록</button>
    </div>
  )
}

export default Upload;