import axios from "axios";
import { useState } from "react";

function UploadTag() {

  const [tag, setTag] = useState({tagName:''});

  const upload = () => {
    axios.post('/api/tag/upload', tag, {"Content-Type": 'application/json'})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {console.log(error)})
  }

  return(
    <div className="uploadTag">
      <input value={tag.tagName} onChange={(e) => {setTag({...tag, tagName: e.target.value})}}/>
      <button onClick={upload}>등록</button>
    </div>
  )
}

export default UploadTag;