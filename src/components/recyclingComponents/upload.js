import axios from "axios";
import Inputs from "./inputs";

function Upload(props) {
  
  const upload = () => {
    axios.post('/api/'+props.api+'/upload', props.addedUploadDatas, {"Content-Type": 'application/json'})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {console.log(error)})

    if(!alert("업로드 되었습니다!")) window.location.reload();
  }

  return(
    <div className="upload">
      <Inputs inputs={props.uploadInputs} setInputs={props.setUploadInputs} addedDatas={props.addedUploadDatas} setAddedDatas={props.setAddedUploadDatas} />
      <button className="uploadBtn" onClick={upload}>등록</button>
    </div>
  )
}

export default Upload;