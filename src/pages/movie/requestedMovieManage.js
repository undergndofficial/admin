import { useEffect, useState } from "react";
import ManageMain from "../../components/recyclingComponents/manageMain";
import Modal from "../../components/recyclingComponents/modal";

function RequestedMovieManage(){
  const [subtitles, setSubtitles] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [genres, setGenres] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [filmPeoples, setFilmPeoples] = useState([]);

  const listName = '등록 신청 영화'

  const elements = {title: '제목', directors: '감독', screenwriters: '각본', actors: '출연진', summary: '줄거리', rating: '관람등급', genres: '장르', date: '신청일'}

  const defaultShow = ['title', 'directors', 'screenwriters', 'tags'];
  const api = 'movie';
  
  const searchInputs = {
    title: {name: '제목', isPlural: true, type: 'default', addDataName: 'title'},
    director: {name: '감독', isPlural: true, type: 'default', addDataName: 'directors'},
    screenwriter: {name: '각본', isPlural: true, type: 'default', addDataName: 'screenwriters'},
    actor: {name: '출연진', isPlural: true, type: 'default', addDataName: 'actors'},
    // subtitle: {name: '자막', isPlural: true, type: 'select', addDataName: 'subtitles', selectMenus: subtitles, isForeign: true, valueKey: 'subtitleName'},
    // category: {name: '카테고리', isPlural: true, type: 'select', addDataName: 'categorys', selectMenus: categorys, isForeign: true, valueKey: 'categoryName'},
    // genre: {name: '장르', isPlural: true, type: 'select', addDataName: 'genres', selectMenus: genres, isForeign: true, valueKey: 'genreName'},
    // rating: {name: '관람등급', isPlural: true, type: 'select', addDataName: 'ratings', selectMenus: ratings, isForeign: true, valueKey: 'ratingName'},
    date: {name: '신청일', isPlural: false, type:'date', addDataName: 'date'},
    registrant: {name: '등록인', isPlural: true, type: 'default', addDataName: 'registrants'}
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
    // genres:[],
    // subtitles:[],
    // categorys:[],
    // ratings:[],
    date:['', ''],
    registrants:[]
  })

  const listBtns = [
    {name: '승인', api: '승인하는 api'},
    {name: '반려', api: '반려하는 api'}
  ];

  const modalInputs = {isOpen: {name: '공개여부', isPlural: false, type:'isTrue', addDataName: 'isOpen', menus:['공개', '미공개']}}
  const [addedModalDatas, setAddedModalDatas] = useState({isOpen: ''})

  return(
    <div className="manage">
      <ManageMain searchInputs={searchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listBtns={listBtns} listName={listName} uploadBtn={false} />
      <Modal modalName='승인 설정' inputs={modalInputs} addedDatas={addedModalDatas} setAddedDatas={setAddedModalDatas} />
    </div>
  )
}

export default RequestedMovieManage;