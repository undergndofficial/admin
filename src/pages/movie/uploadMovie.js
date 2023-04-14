import axios from "axios";
import { useEffect, useState } from "react";
import Inputs from "../../components/recyclingComponents/inputs";

function UploadMovie() {

  const [inputs, setInputs] = useState({
    video: {name: '영화 동영상', isPlural: false, isInput: true, type: 'file', addDataName: 'video', inputValue: ''},
    poster: {name: '영화 포스터', isPlural: false, isInput: true, type: 'file', addDataName: 'poster', inputValue: ''},
    subtitle: {name: '자막', isPlural: false, isInput: true, type: 'file', addDataName: 'subtitle', inputValue: ''},
    title: {name: '제목', isPlural: false, isInput: true, type: 'default', addDataName: 'title', inputValue: ''},
    summary: {name: '줄거리', isPlural: false, isInput: false, type: 'textarea', addDataName: 'summary', inputValue: ''},
    director: {name: '감독', isPlural: true, isInput: true, type: 'default', addDataName: 'directors', inputValue: ''},
    scenario: {name: '각본', isPlural: true, isInput: true, type: 'default', addDataName: 'scenarios', inputValue: ''},
    actor: {name: '출연진', isPlural: true, isInput: true, type: 'default', addDataName: 'actors', inputValue: ''},
    genre: {name: '장르', isPlural: true, isInput: false, type: 'select', addDataName: 'genres', inputValue: '', selectMenus: ['공포', '판타지', '액션', '멜로', '스릴러']},
    tag: {name: '태그', isPlural: true, isInput: false, type: 'select', addDataName: 'tags', inputValue: '', selectMenus: []},
    rating: {name: '관람등급', isPlural: false, isInput: false, type: 'select', addDataName: 'rating', inputValue: '', selectMenus: ['전체관람가', '12세이상 관람가', '15세이상 관람가', '청소년관람불가']},
    specialNote: {name: '특이사항', isPlural: false, isInput: false, type: 'textarea', addDataName: 'specialNote', inputValue: ''}
  })
  
  const [addedDatas, setAddedDatas] = useState({
    title: '',
    summary: '',
    rating: '',
    directors: [],
    scenarios: [],
    actors: [],
    genres: [],
    tags: [],
    video: '',
    poster: '',
    subtitle: '',
    specialNote: ''
  })

  const register = () => {
    // const formData = new FormData();
    // formData.append("posterFile", addedDatas.poster);
    // formData.append("jsonData", JSON.stringify(addedDatas));
    axios.post('/api/movie/upload', addedDatas, {"Content-Type": 'application/json'})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {console.log(error)})

    if(!alert("업로드 되었습니다!")) window.location.reload();
  }

  useEffect(() => {
    axios.get('/api/tag/getTag')
    .then((res) => {
      // setTags(res.data);
      var tagNames = [];
      for (let tag of res.data)  {
        tagNames.push(tag.tagName);
      }
      setInputs(i => ({...i, tag: {...i.tag, selectMenus: tagNames}}))
    })
  }, [])

  return (
    <div className="upload">
      <Inputs inputs={inputs} setInputs={setInputs} addedDatas={addedDatas} setAddedDatas={setAddedDatas} /> 
      <button className="uploadBtn" onClick={register}>등록</button>
      {/* <input type={"file"} onChange={(e) => {setinputFiles({...inputFiles, a:e.target.files[0]})}} />
      <button onClick={fileConsole}>test</button> */}
    </div>
  )
}

export default UploadMovie;