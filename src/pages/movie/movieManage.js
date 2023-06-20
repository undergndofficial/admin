import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ManageMain from "../../components/recyclingComponents/manageMain";
import Upload from "../../components/recyclingComponents/upload";
import Inputs from "../../components/recyclingComponents/inputs";

function MovieManage () {

  // const [dataLength, setDataLength] = useState();
  // const [queryData, setQueryData] = useState();
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filmPeoples, setFilmPeoples] = useState([]);

  const listName = '영화'

  const elements = {title: '제목', directors: '감독', screenwriters: '각본', actors: '출연진', summary: '줄거리', rating: '관람등급', genres: '장르', tags: ['태그', 'tagName'], date: '등록일'}

  const defaultShow = ['title', 'directors', 'screenwriters', 'tags'];
  const api = 'movie';
  
  const searchInputs = {
    title: {name: '제목', isPlural: true, isInput: true, type: 'default', addDataName: 'title'},
    director: {name: '감독', isPlural: true, isInput: true, type: 'default', addDataName: 'directors'},
    screenwriter: {name: '각본', isPlural: true, isInput: true, type: 'default', addDataName: 'screenwriters'},
    actor: {name: '출연진', isPlural: true, isInput: true, type: 'default', addDataName: 'actors'},
    registrant: {name: '등록인', isPlural: true, isInput: true, type: 'default', addDataName: 'registrants'},
    genre: {name: '장르', isPlural: true, isInput: false, type: 'select', addDataName: 'genres', selectMenus: genres, isForeign: true, valueKey: 'genreName'},
    tag: {name: '태그', isPlural: true, isInput: false, type: 'select', addDataName: 'tags', selectMenus: tags, isForeign: true, valueKey: 'tagName'},
    date: {name: '신청일', isPlural: false, isInput: false, type:'date', addDataName: 'date'}
  };

  // const [searchInputValues, setSearchInputValues] = useState({

  // })

  // const a = tags;

  // const [inputValues, setInputValues] = useState({})

  const [addedSearchDatas, setAddedSearchDatas] = useState({
    title:[],
    directors:[],
    screenwriters:[],
    actors:[],
    registrants:[],
    genres:[],
    tags:[],
    date:['', '']
  })
  
  
  const uploadInputs = {
    video: {name: '영화 동영상', isPlural: false, isInput: true, type: 'file', addDataName: 'video'},
    poster: {name: '영화 포스터', isPlural: false, isInput: true, type: 'file', addDataName: 'poster'},
    subtitle: {name: '자막', isPlural: false, isInput: true, type: 'file', addDataName: 'subtitle'},
    title: {name: '제목', isPlural: false, isInput: true, type: 'default', addDataName: 'title'},
    summary: {name: '줄거리', isPlural: false, isInput: false, type: 'textarea', addDataName: 'summary'},
    director: {name: '감독', isPlural: true, isInput: false, type: 'select', addDataName: 'directors', selectMenus: filmPeoples, isForeign: true, valueKey: 'filmPeopleName'},
    screenwriter: {name: '각본', isPlural: true, isInput: false, type: 'select', addDataName: 'screenwriters', selectMenus: filmPeoples, isForeign: true, valueKey: 'filmPeopleName'},
    actor: {name: '출연진', isPlural: true, isInput: false, type: 'select', addDataName: 'actors', selectMenus: filmPeoples, isForeign: true, valueKey: 'filmPeopleName'},
    genre: {name: '장르', isPlural: true, isInput: false, type: 'select', addDataName: 'genres', selectMenus: genres, isForeign: true, valueKey: 'genreName'},
    tag: {name: '태그', isPlural: true, isInput: false, type: 'select', addDataName: 'tags', selectMenus: tags, isForeign: true, valueKey: 'tagName'},
    rating: {name: '관람등급', isPlural: false, isInput: false, type: 'select', addDataName: 'rating', selectMenus: ['전체관람가', '12세이상 관람가', '15세이상 관람가', '청소년관람불가'], isForeign: false},
    specialNote: {name: '특이사항', isPlural: false, isInput: false, type: 'textarea', addDataName: 'specialNote',}
  };
  const [addedUploadDatas, setAddedUploadDatas] = useState({
    title: '',
    summary: '',
    rating: '',
    directors: [],
    screenwriters: [],
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

  const [manageModal, setManageModal] = useState();
  
  
  document.body.style.overflow = manageModal ? 'hidden': 'auto';

  useEffect(() => {
    axios.get('/api/tag/getTag')
    .then((res) => setTags(res.data))
      // var tagNames = [];
      // for(let tag of res.data) {
      //   tagNames.push(tag.tagName);
      // }
      // setSearchInputs(inputs => ({...inputs, tag: {...inputs.tag, selectMenus: tagNames}}));
      // setUploadInputs(inputs => ({...inputs, tag: {...inputs.tag, selectMenus: tagNames}}));
    
    axios.get('/api/genre/get')
    .then((res) => setGenres(res.data))

    axios.get('/api/filmPeople/get')
    .then((res) => setFilmPeoples(res.data));
    // axios.get('/api/filmPeople/get')
    // .then((res) => {
    //   let filmPeoples = [];
    //   for(let filmPeople in res.data) {
    //     filmPeoples.push(filmPeople);
    //   }
    //   setFilmPeople(filmPeoples);
    // })
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
        <Route path="/" element={<ManageMain searchInputs={searchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listName={listName} listBtns={listBtns} uploadBtn={true} setManageModal={setManageModal}/>} />
        <Route path="/upload" element={<Upload uploadInputs={uploadInputs} addedUploadDatas={addedUploadDatas} setAddedUploadDatas={setAddedUploadDatas} api={api} />} />
      </Routes>
      {manageModal ? <ManageModal id={manageModal} setManageModal={setManageModal} /> : null}
    </div>
  )
}

function ManageModal(props) {
  const [data, setData] = useState();
  
  const [inputs, setInputs] = useState({
    video: {name: '영화 동영상', isPlural: false, isInput: true, type: 'file', addDataName: 'video', inputValue: ''},
    poster: {name: '영화 포스터', isPlural: false, isInput: true, type: 'file', addDataName: 'poster', inputValue: ''},
    subtitle: {name: '자막', isPlural: false, isInput: true, type: 'file', addDataName: 'subtitle', inputValue: ''},
    title: {name: '제목', isPlural: false, isInput: true, type: 'default', addDataName: 'title', inputValue: ''},
    summary: {name: '줄거리', isPlural: false, isInput: false, type: 'textarea', addDataName: 'summary', inputValue: ''},
    director: {name: '감독', isPlural: true, isInput: true, type: 'default', addDataName: 'directors', inputValue: ''},
    screenwriter: {name: '각본', isPlural: true, isInput: true, type: 'default', addDataName: 'screenwriters', inputValue: ''},
    actor: {name: '출연진', isPlural: true, isInput: true, type: 'default', addDataName: 'actors', inputValue: ''},
    genre: {name: '장르', isPlural: true, isInput: false, type: 'select', addDataName: 'genres', inputValue: '', selectMenus: ['공포', '판타지', '액션', '멜로', '스릴러']},
    tag: {name: '태그', isPlural: true, isInput: false, type: 'select', addDataName: 'tags', inputValue: '', selectMenus: []},
    rating: {name: '관람등급', isPlural: false, isInput: false, type: 'select', addDataName: 'rating', inputValue: '', selectMenus: ['전체관람가', '12세이상 관람가', '15세이상 관람가', '청소년관람불가']},
    specialNote: {name: '특이사항', isPlural: false, isInput: false, type: 'textarea', addDataName: 'specialNote', inputValue: ''}
  });

  const [addedDatas, setAddedDatas] = useState({
    title: '',
    summary: '',
    rating: '',
    directors: [],
    screenwriters: [],
    actors: [],
    genres: [],
    tags: [],
    video: '',
    poster: '',
    subtitle: '',
    specialNote: ''
  })

  useEffect(() => {
    axios.post('/api/movie/getDetail', {id: props.id}, {"Content-Type": 'application/json'})
    .then((response) => {
      setData(response.data);
      console.log(response.data); 
    })
  }, [props.id])
  
  useEffect(() => {
    if(data){
      Object.entries(inputs).map(([key, value]) => {
        console.log(addedDatas)
        setAddedDatas(prevAddedDatas => ({...prevAddedDatas, [value.addDataName]: data[value.addDataName]}));
        console.log(addedDatas)
        if (!value.isPlural) {
          setInputs(prevInputs => ({...prevInputs, [key]: {...value, inputValue: data[value.addDataName]}}));
        }
      })
    }
  }, [data])
  
  return(
    <>
    <div className="manageModal">
      <button className="closeBtn" onClick={()=>{props.setManageModal(0)}}>x</button>
      <Inputs inputs={inputs} setInputs={setInputs} addedDatas={addedDatas} setAddedDatas={setAddedDatas} />
      <button className="modifyBtn">수정</button>
    </div>
    <div className="manageModalOut" />
    </>
  )
}

export default MovieManage;