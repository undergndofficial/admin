
import { useEffect, useState } from "react";
import Upload from "../../components/recyclingComponents/upload";
import apiUrl from "../../api/baseurl";
import axios from "../../api/config";

function FestivalMovieUpload () {

  // const [dataLength, setDataLength] = useState();
  // const [queryData, setQueryData] = useState();
  const [categorys, setCategorys] = useState([]);
  const [genres, setGenres] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [langages, setLangages] = useState([]);
  const [nations, setNations] = useState([]);
  const [colorations, setColorations] = useState([]);

  const upload = () => {
    const movieInfo_1 = {
      mov_title: addedUploadDatas.mov_title,
      mov_title_en: addedUploadDatas.mov_title_en,
      cat_seq: parseInt(addedUploadDatas.cat_seq),
      gernes: addedUploadDatas.gernes,
      rating_seq: parseInt(addedUploadDatas.rating_seq),
      lang_code: addedUploadDatas.lang_code,
      nationality_seq: addedUploadDatas.nationality_seq,
      production_year: parseInt(addedUploadDatas.production_year),
      mov_plot: addedUploadDatas.mov_plot,
      director_note: addedUploadDatas.director_note,
      director: addedUploadDatas.director,
      running_time: parseInt(addedUploadDatas.running_time)
    }
    const movieInfo_2 = {
      mov_file: addedUploadDatas.mov_file
    }
    const movieInfo_3 = {
      coloration: addedUploadDatas.coloration
    }
    const movieInfo_4 = {
      remark: addedUploadDatas.remark
    }
    console.log(movieInfo_1)
    axios.put(apiUrl+'/festival', movieInfo_1)
      .then(async(res) => {
        const mov_seq = res.data.rs.mov_seq
        console.log(mov_seq)
        await axios.put(apiUrl+'/festival/'+mov_seq+'/movfile', movieInfo_2)
        await axios.post(apiUrl+'/festival/'+mov_seq+'/videoinfo', movieInfo_3)
        await axios.post(apiUrl+'/festival/'+mov_seq+'/remark', movieInfo_4)
        await axios.post(apiUrl+'/festival/'+mov_seq+'/publish')
          .then((res) => {console.log(res.data)})
      })
  }
  
  const uploadInputs = {
    // poster: {name: '영화 포스터', isPlural: false, isInput: true, type: 'file', addDataName: 'poster'},
    // subtitle: {name: '자막', isPlural: false, isInput: true, type: 'file', addDataName: 'subtitle'},
    mov_title: {name: '제목', isPlural: false, isInput: true, type: 'default', addDataName: 'mov_title'},
    mov_title_en: {name: '영문 제목', isPlural: false, isInput: true, type: 'default', addDataName: 'mov_title_en'},
    category: {name: '구분', isPlural: false, isInput: false, type: 'select', addDataName: 'cat_seq', selectMenus: categorys, isForeign: true, valueKey: 'cat_name', seq: 'cat_seq'},
    genre: {name: '세부 장르', isPlural: true, isInput: false, type: 'select', addDataName: 'gernes', selectMenus: genres, isForeign: true, valueKey: 'gern_name_en', seq: 'gern_seq' },
    rating: {name: '관람 등급', isPlural: false, isInput: false, type: 'select', addDataName: 'rating_seq', selectMenus: ratings, isForeign: true, valueKey: 'rating_txt', seq: 'rating_seq'}, 
    langage: {name: '사용 언어', isPlural: false, isInput: false, type: 'select', addDataName: 'lang_code', selectMenus: langages, isForeign: true, valueKey: 'lang_name', seq: 'lang_code'}, 
    nation: {name: '제작 국가', isPlural: false, isInput: false, type: 'select', addDataName: 'nationality_seq', selectMenus: nations, isForeign: true, valueKey: 'nation_en', seq: 'nationality_seq'}, 
    production_year: {name: '제작 년도', isPlural: false, isInput: true, type: 'default', addDataName: 'production_year'},
    mov_plot: {name: '시놉시스', isPlural: false, isInput: false, type: 'textarea', addDataName: 'mov_plot'},
    director_note: {name: '기획 의도', isPlural: false, isInput: false, type: 'textarea', addDataName: 'director_note'},
    director: {name: '감독', isPlural: false, isInput: false, type: 'default', addDataName: 'director'},
    mov_file: {name: '동영상', isPlural: false, isInput: true, type: 'file', addDataName: 'mov_file'},
    running_time: {name: '영상 길이', isPlural: false, isInput: false, type: 'default', addDataName: 'running_time'},
    coloration: {name: '색채', isPlural: false, isInput: false, type: 'select', addDataName: 'coloration', selectMenus: colorations, isForeign: true, valueKey: 'coloration_txt', seq:'coloration'},
    remark: {name: '문의/요청', isPlural: false, isInput: false, type: 'textarea', addDataName: 'remark'},
    // screenwriter: {name: '각본', isPlural: true, isInput: false, type: 'default', addDataName: 'screenwriters'},
    // actor: {name: '출연진', isPlural: true, isInput: false, type: 'default', addDataName: 'actors'},
    // tag: {name: '태그', isPlural: true, isInput: false, type: 'select', addDataName: 'tags', selectMenus: tags, isForeign: true, valueKey: 'tagName'},
    // isOpen: {name: '공개여부', isPlural: false, type:'isTrue', addDataName: 'isOpen', menus:['공개', '미공개']}
  };
  
  const [addedUploadDatas, setAddedUploadDatas] = useState({
    mov_title: '',
    mov_title_en: '',
    cat_seq: '',
    gernes: [],
    rating_seq: '',
    lang_code: '',
    nationality_seq: '',
    production_year: '',
    mov_plot: '',
    director_note: '',
    director: '',
    mov_file: '',
    running_time: '',
    coloration: '',
    remark: ''
  })
  
  useEffect(() => {
    axios.get(apiUrl+'/common/category')
    .then((res) => setCategorys(res.data.rs))
    
    axios.get(apiUrl+'/common/gerne')
    .then((res) => setGenres(res.data.rs))
    
    axios.get(apiUrl+'/common/rating-us')
    .then((res) => setRatings(res.data.rs))
    
    axios.get(apiUrl+'/common/lang')
    .then((res) => setLangages(res.data.rs))
    
    axios.get(apiUrl+'/common/nationality')
    .then((res) => setNations(res.data.rs))
    
    axios.get(apiUrl+'/common/coloration')
    .then((res) => setColorations(res.data.rs))
    
  }, [])

  // useEffect(() => {
  //   axios.post('/api/movie/getLength', {queryData: queryData}, {"Content-Type": 'application/json'})
  //   .then((response) => {
  //     setDataLength(response.data);
  //   })
  // },[queryData])

  return (
    <div className="festivalUpload">
      <h2>영화 업로드</h2>
        {
          categorys[0] && genres[0] && ratings[0] && langages[0] && nations[0] && colorations[0]
          ?
          <Upload uploadInputs={uploadInputs} addedUploadDatas={addedUploadDatas} setAddedUploadDatas={setAddedUploadDatas} upload={upload} />
          :
          <div>Loading...</div>
        }
        <button className="uploadBtn" onClick={upload}>등록</button>
    </div>
  )
}

export default FestivalMovieUpload;