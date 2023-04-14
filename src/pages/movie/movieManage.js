import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ManageMain from "../../components/recyclingComponents/manageMain";
import Upload from "../../components/recyclingComponents/upload";

function MovieManage () {

  // const [dataLength, setDataLength] = useState();
  // const [queryData, setQueryData] = useState();

  const listName = '영화'

  const elements = {title: '제목', directors: '감독', scenarios: '각본', actors: '출연진', summary: '줄거리', rating: '관람등급', genres: '장르', tags: ['태그', 'tagName'], date: '등록일'}

  const defaultShow = ['title', 'directors', 'scenarios', 'tags'];
  const api = 'movie';
  
  const [searchInputs, setSearchInputs] = useState({
    title: {name: '제목', isPlural: true, isInput: true, type: 'default', addDataName: 'title', inputValue: ''},
    director: {name: '감독', isPlural: true, isInput: true, type: 'default', addDataName: 'directors', inputValue: ''},
    scenario: {name: '각본', isPlural: true, isInput: true, type: 'default', addDataName: 'scenarios', inputValue: ''},
    actor: {name: '출연진', isPlural: true, isInput: true, type: 'default', addDataName: 'actors', inputValue: ''},
    registrant: {name: '등록인', isPlural: true, isInput: true, type: 'default', addDataName: 'registrants', inputValue: ''},
    genre: {name: '장르', isPlural: true, isInput: false, type: 'select', addDataName: 'genres', inputValue: '', selectMenus: ['공포', '판타지', '액션', '멜로', '스릴러']},
    tag: {name: '태그', isPlural: true, isInput: false, type: 'select', addDataName: 'tags', inputValue: '', selectMenus: []},
    date: {name: '신청일', isPlural: false, isInput: false, type:'date', addDataName: 'date', inputValue: ''}
  })
  const [addedSearchDatas, setAddedSearchDatas] = useState({
    title:[],
    directors:[],
    scenarios:[],
    actors:[],
    registrants:[],
    genres:[],
    tags:[],
    date:['', '']
  })
  
  const [uploadInputs, setUploadInputs] = useState({
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
  const [addedUploadDatas, setAddedUploadDatas] = useState({
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
  
  // const [searchOption, setSearchOption] = useState('and');
  
  const listBtns = [
    {name: '삭제', api: '/movie/delete', prompt: { msg: "'삭제하겠습니다'를 입력하시면 삭제됩니다.", value: '삭제하겠습니다' }},
    // {name: '삭제', api: '/movie/delete' },
    {name: '공개', api: '/movie/open'},
    {name: '미공개', api: '/movie/close'}
  ];
  
  useEffect(() => {
    axios.get('/api/tag/getTag')
    .then((res) => {
      // setTags(res.data);
      var tagNames = [];
      for(let tag of res.data) {
        tagNames.push(tag.tagName);
      }
      setSearchInputs(inputs => ({...inputs, tag: {...inputs.tag, selectMenus: tagNames}}));
      setUploadInputs(inputs => ({...inputs, tag: {...inputs.tag, selectMenus: tagNames}}));
    })
  }, [])

  // useEffect(() => {
  //   axios.post('/api/movie/getLength', {queryData: queryData}, {"Content-Type": 'application/json'})
  //   .then((response) => {
  //     setDataLength(response.data);
  //   })
  // },[queryData])

  return (
    <div className="manage">
      <h2>영화 관리 페이지</h2>
      <Routes>
        <Route path="/" element={<ManageMain searchInputs={searchInputs} setSearchInputs={setSearchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listName={listName} listBtns={listBtns} />} />
        <Route path="/upload" element={<Upload uploadInputs={uploadInputs} setUploadInputs={setUploadInputs} addedUploadDatas={addedUploadDatas} setAddedUploadDatas={setAddedUploadDatas} api={api} />} />
      </Routes>
    </div>
  )
}

export default MovieManage;