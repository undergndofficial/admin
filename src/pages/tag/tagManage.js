// import axios from "axios";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import ManageMain from "../../components/recyclingComponents/manageMain";
import Upload from "../../components/recyclingComponents/upload";

function TagManage () {

  // const [dataLength, setDataLength] = useState();
  // const [queryData, setQueryData] = useState();
  const elements = {tagName: '태그 이름', movies: ['영화', 'title'], date: '등록일'};

  const [searchInputs, setSearchInputs] = useState({
    tagName: {name: '태그 이름', isPlural: true, isInput: true, type: 'default', addDataName: 'tagName', inputValue: ''},
    movies: {name: '영화', isPlural: true, isInput: true, type: 'default', addDataName: 'movies', inputValue: ''},
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: 'date', inputValue: ''}
  })
  const [addedSearchDatas, setAddedSearchDatas] = useState({
    tagName:[],
    movies: [],
    date: ['', '']
  })

  const [uploadInputs, setUploadInputs] = useState({
    tagName: {name: '태그 이름', isPlural: false, isInput: true, type: 'default', addDataName: 'tagName', inputValue: ''},
  });
  const [addedUploadDatas, setAddedUploadDatas] = useState({tagName:''});


  const defaultShow = ['tagName', 'movies', 'date'];
  const listName = '태그';
  const api = 'tag';


  // const [searchOption, setSearchOption] = useState('and');

  const [tagMangeModal, setTagManageModal] = useState(0);

  return (
    <div className="manage">
      <h2>태그 관리 페이지</h2>
      <Routes>
        <Route path="/" element={<ManageMain searchInputs={searchInputs} setSearchInputs={setSearchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listName={listName} setManageModal={setTagManageModal} />} />
        <Route path="/upload" element={<Upload uploadInputs={uploadInputs} setUploadInputs={setUploadInputs} addedUploadDatas={addedUploadDatas} setAddedUploadDatas={setAddedUploadDatas} api={api} />} />
      </Routes>
      {tagMangeModal ? <TagManageModal id={tagMangeModal} setTagManageModal={setTagManageModal} /> : null}
    </div>
  )
}

function TagManageModal(props) {
  const [data, setData] = useState();
  
  useEffect(() => {
    axios.post('/api/tag/getDetail', {id: props.id}, {"Content-Type": 'application/json'})
    .then((response) => {
      setData(response.data);
    })
  }, [props])

  return(
    <>
    <div className="manageModal">
      <button onClick={()=>{props.setTagManageModal(0)}}>x</button>
      {
        data ? 
        Object.entries(data).map(([key, value]) => {
          return(
            <div>{value}</div>
          )
        })
        : null}
    </div>
    <div className="manageModalOut" />
    </>
  )
}

export default TagManage;