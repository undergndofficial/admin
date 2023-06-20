import axios from "axios";
import { useEffect, useState } from "react";
import ManageMain from "../../components/recyclingComponents/manageMain";

function DeletedMovieManage () {

  const listName = '삭제 영화';

  const elements = {title: '제목', directors: '감독', screenwriters: '각본', actors: '출연진', summary: '줄거리', rating: '관람등급', genres: '장르', tags: ['태그', 'tagName'], date: '등록일', deletedDate: '삭제일'}

  const defaultShow = ['title', 'directors', 'screenwriters', 'tags'];
  const api = 'deletedMovie';

  const listBtns = [
    {name: '복원', api: '/deletedMovie/restore', prompt: { msg:"'복원하겠습니다'를 입력하시면 복원됩니다.", value: '복원하겠습니다'}},
    // {name: '복원', api: '/deletedMovie/restore' },
    {name: '영구 삭제', api: '/deletedMovie/delete', prompt: { msg: "'영구삭제하겠습니다'를 입력하시면 영구삭제 됩니다. 이 작업은 복원이 불가능합니다.", value: '영구삭제하겠습니다' }}
  ];
  
  const [searchInputs, setSearchInputs] = useState({
    title: {name: '제목', isPlural: true, isInput: true, type: 'default', addDataName: 'title', inputValue: ''},
    director: {name: '감독', isPlural: true, isInput: true, type: 'default', addDataName: 'directors', inputValue: ''},
    screenwriter: {name: '각본', isPlural: true, isInput: true, type: 'default', addDataName: 'screenwriters', inputValue: ''},
    actor: {name: '출연진', isPlural: true, isInput: true, type: 'default', addDataName: 'actors', inputValue: ''},
    registrant: {name: '등록인', isPlural: true, isInput: true, type: 'default', addDataName: 'registrants', inputValue: ''},
    genre: {name: '장르', isPlural: true, isInput: false, type: 'select', addDataName: 'genres', inputValue: '', selectMenus: ['공포', '판타지', '액션', '멜로', '스릴러']},
    tag: {name: '태그', isPlural: true, isInput: false, type: 'select', addDataName: 'tags', inputValue: '', selectMenus: []},
    date: {name: '신청일', isPlural: false, isInput: false, type:'date', addDataName: 'date', inputValue: ''},
    deletedDate: {name: '삭제일', isPlural: false, isInput: false, type:'date', addDataName: 'deletedDate', inputValue: ''}
  })

  const [addedSearchDatas, setAddedSearchDatas] = useState({
    title:[],
    directors:[],
    screenwriters:[],
    actors:[],
    registrants:[],
    genres:[],
    tags:[],
    date: ['', ''],
    deletedDate: ['', '']
  })
  
  useEffect(() => {
    axios.get('/api/tag/getTag')
    .then((res) => {
      var tagNames = [];
      for(let tag of res.data) {
        tagNames.push(tag.tagName);
      }
      setSearchInputs(inputs => ({...inputs, tag: {...inputs.tag, selectMenus: tagNames}}));
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
      <h2>삭제 영화 관리 페이지</h2>
      <ManageMain searchInputs={searchInputs} setSearchInputs={setSearchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listName={listName} listBtns={listBtns} />
    </div>
  )
}

export default DeletedMovieManage;