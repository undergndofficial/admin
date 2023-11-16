import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Inputs from "../../components/recyclingComponents/inputs";
import Reviews from "../../components/recyclingComponents/reviews";


function MovieDetail() {
  
  return(
    <>
      <h2>영화 명</h2>
      <div className="movieDetail">
        <Movie />
        <div className="movieDetailLine" />
        <Reviews />
      </div>
    </>
  )
}

function Movie() {
  
  const {id} = useParams();
  
  useEffect(() => {
    // id에 따른 영화 정보 get 요청
  }, [])
  
  const [subtitles, setSubtitles] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [filmPeoples, setFilmPeoples] = useState([]);

  const detailInputs = {
    video: {name: '영화 동영상', isPlural: false, isInput: true, type: 'file', addDataName: 'video'},
    poster: {name: '영화 포스터', isPlural: false, isInput: true, type: 'file', addDataName: 'poster'},
    subtitle: {name: '자막', isPlural: false, isInput: true, type: 'file', addDataName: 'subtitle'},
    title: {name: '영화 제목', isPlural: false, isInput: true, type: 'default', addDataName: 'title'},
    summary: {name: '줄거리', isPlural: false, isInput: false, type: 'textarea', addDataName: 'summary'},
    director: {name: '감독', isPlural: true, isInput: false, type: 'default', addDataName: 'directors'},
    screenwriter: {name: '각본', isPlural: true, isInput: false, type: 'default', addDataName: 'screenwriters'},
    actor: {name: '출연진', isPlural: true, isInput: false, type: 'default', addDataName: 'actors'},
    genre: {name: '장르', isPlural: true, isInput: false, type: 'select', addDataName: 'genres', selectMenus: genres, isForeign: true, valueKey: 'genreName'},
    rating: {name: '관람등급', isPlural: false, isInput: false, type: 'select', addDataName: 'ratings', selectMenus: ratings, isForeign: true, valueKey: 'ratingName'}, 
    specialNote: {name: '특이사항', isPlural: false, isInput: false, type: 'textarea', addDataName: 'specialNote'},
    tag: {name: '태그', isPlural: true, isInput: false, type: 'select', addDataName: 'tags', selectMenus: tags, isForeign: true, valueKey: 'tagName'},
    isOpen: {name: '공개여부', isPlural: false, type:'isTrue', addDataName: 'isOpen', menus:['공개', '미공개']}
  };

  const [addedDetailDatas, setAddedDetailDatas] = useState({
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
  
  return(
    <div>
      <Inputs inputs={detailInputs} addedDatas={addedDetailDatas} setAddedDatas={setAddedDetailDatas} />
    </div>
  )
}


export default MovieDetail;