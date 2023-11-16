import { Route, Routes } from "react-router-dom";
import FestivalMain from "./festivalMain";
import FestivalMovieUpload from "./festivalMovieUpload";
import FestivalMovieManage from "./festivalMovieManage";
import FestivalMovieDetail from "./festivalMovieDetail";

function Festival(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<FestivalMain />} />
        <Route path="/upload" element={<FestivalMovieUpload />} />
        <Route path="/movieManage" element={<FestivalMovieManage />} />
        <Route path="/detail/:id" element={<FestivalMovieDetail />} />
      </Routes>
    </div>
  )
}

export default Festival;