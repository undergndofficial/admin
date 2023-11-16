import axios from "../../api/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiUrl from "../../api/baseurl";


function FestivalMovieDetail() {
  const [movie, setMovie] = useState(true);
  const { id } = useParams();
  const elements = {
    videoInfo: {name: '영상 정보', fields: {'mov_file': '동영상', 'running_time': '영상 길이', 'coloration_txt': '색채'}},
    movieInfo: {name: '영화 정보', fields: {'mov_file_en': '영문 제목', 'cat_name': '구분', 'gerne': '세부 장르', 'rating_txt': '관람등급', 'nation': '제작국가', 'production_year': '제작년도', 'mov_plot': '시놉시스', 'director_note': '기획 의도'}},
    producerInfo: {name: '제작자 정보', fields: {'director': '감독'}},
    remark: {name: '문의/요청', fields: {'remarks': '문의/요청'}},
  };

  useEffect(() => {
    axios.get(apiUrl+'/festival/'+id)
      .then((res) => {setMovie(res.data.rs[0])})
    
  }, [])
 
  return(
    <div className="festivalMovieDetail">
      {
        movie ?
        Object.entries(elements).map(([key, values]) => {
          return (
            <div>
              <div>{values.name}</div>
              {
                Object.entries(values.fields).map(([key, value]) => { 
                  return (
                    <div> 
                      <span>{value}</span>
                      <span>{movie[key]}</span> 
                    </div>
                  )
                })
              }  
            </div>
          );
        })
        :
        <div>Loading...</div> 
      }
    </div>
  )
}

export default FestivalMovieDetail;