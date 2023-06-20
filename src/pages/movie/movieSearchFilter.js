import axios from "axios";
import { useEffect, useState } from "react";
import movieData from "../../movieData";
import Inputs from "../../components/recyclingComponents/inputs";

function MovieSearchFilter(props) {

  const [tags, setTags] = useState();
  const [tagSelectMenus, setTagsSelectMenus] = useState([]);
  
  const [inputs, setInputs] = useState({
    title: {name: '제목', isPlural: true, isInput: true, type: 'default', addDataName: 'title', inputValue: ''},
    director: {name: '감독', isPlural: true, isInput: true, type: 'default', addDataName: 'directors', inputValue: ''},
    screenwriter: {name: '각본', isPlural: true, isInput: true, type: 'default', addDataName: 'screenwriters', inputValue: ''},
    actor: {name: '출연진', isPlural: true, isInput: true, type: 'default', addDataName: 'actors', inputValue: ''},
    registrant: {name: '등록인', isPlural: true, isInput: true, type: 'default', addDataName: 'registrants', inputValue: ''},
    genre: {name: '장르', isPlural: true, isInput: false, type: 'select', addDataName: 'genres', inputValue: '', selectMenus: ['공포', '판타지', '액션', '멜로', '스릴러']},
    tag: {name: '태그', isPlural: true, isInput: false, type: 'select', addDataName: 'tags', inputValue: '', selectMenus: []},
    date: {name: '신청일', isPlural: false, isInput: false, type:'date', addDataName: ['startDate', 'endDate'], inputValue: ''}
  })

  const [addedDatas, setAddedDatas] = useState({
    title:[],
    directors:[],
    screenwriters:[],
    actors:[],
    registrants:[],
    genres:[],
    tags:[],
    startDate: '',
    endDate: ''
  })
  
  const search = () => {
    props.setQueryData(addedDatas);
  }

  useEffect(() => {
    axios.get('/api/tag/getTag')
    .then((res) => {
      setTags(res.data);
      var tagNames = [];
      res.data.map((tag) => {
        tagNames.push(tag.tagName);
      })
      setInputs({...inputs, tag: {...inputs.tag, selectMenus: tagNames}})
    })
  },[])

  return(
    <div className="searchFilter">
      <Inputs inputs={inputs} setInputs={setInputs} addedDatas={addedDatas} setAddedDatas={setAddedDatas} />
      <button className="searchBtn" onClick={search}>검색</button>
    </div>
  )
}

export default MovieSearchFilter;