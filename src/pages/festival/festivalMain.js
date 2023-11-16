import { useNavigate } from "react-router-dom";

function FestivalMain(){

  const navigate = useNavigate();
  return(
    <div className="festivalMain">
      <h1>영화제 메인</h1>
      <div className="btns">
        <button onClick={() => {navigate('/festival/upload')}}>업로드</button>
        <button onClick={() => {navigate('/festival/movieManage')}}>관리</button>
      </div>
    </div>
  )
}

export default FestivalMain;