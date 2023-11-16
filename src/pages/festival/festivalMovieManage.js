import { useEffect, useState } from "react";
import axios from "../../api/config";
import apiUrl from "../../api/baseurl";
import FestivalList from "../../components/recyclingComponents/festivalList";

function FestivalMovieManage() {
  const [movies, setMovies] = useState([])
  const elements = {mov_title: '제목', cat_name: '구분', director: '감독', rating_txt: '관람등급', is_show: '공개여부'}
  const defaultShow =['mov_title', 'cat_name', 'director', 'rating_txt', 'is_show']

  const listBtns = [
    // {name: '삭제', api: '/movie/delete' },
    {name: '공개', api: '/toggle-show', body: {is_show: 1}},
    {name: '미공개', api: '/toggle-show', body: {is_show: 0}}
  ];

  useEffect(() => {
    axios.get(apiUrl+'/festival')
     .then((res) => {
       console.log(res.data)
       setMovies(res.data.rs.rs)
     })
  }, [])

  return(
    <div>
      <FestivalList datas={movies} dataLength={movies.length} elements={elements} 
        defaultShow={defaultShow} listName="영화"
        listBtns={listBtns} />
    </div>
  )
}

export default FestivalMovieManage;