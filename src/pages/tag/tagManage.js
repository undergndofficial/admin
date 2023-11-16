// import axios from "axios";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import ManageMain from "../../components/recyclingComponents/manageMain";
import Upload from "../../components/recyclingComponents/upload";

function TagManage () {

  // const [dataLength, setDataLength] = useState();
  // const [queryData, setQueryData] = useState();
  const elements = {tagName: '태그 이름', movies: '영화', createdDate: '등록일'};

  const searchInputs = {
    tagName: {name: '태그 이름', isPlural: true, isInput: true, type: 'default', addDataName: 'tagName'},
    movies: {name: '영화', isPlural: true, isInput: true, type: 'default', addDataName: 'movies'},
    createdDate: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: 'createdDate'}
  };
  const [addedSearchDatas, setAddedSearchDatas] = useState({
    tagName:[],
    movies: [],
    createdDate: ['', '']
  })

  const uploadInputs = {
    tagName: {name: '태그 이름', isPlural: false, isInput: true, type: 'default', addDataName: 'tagName'},
  };
  const [addedUploadDatas, setAddedUploadDatas] = useState({tagName:''});


  const defaultShow = ['tagName', 'movies', 'createdDate'];
  const listName = '태그';
  const api = 'tag';

  const listBtns = [
    {name: '삭제', api: '/tag/delete', prompt: { msg: "'삭제하겠습니다'를 입력하시면 삭제됩니다.", value: '삭제하겠습니다' }}
  ];

  // const [searchOption, setSearchOption] = useState('and');

  const [tagMangeModal, setTagManageModal] = useState(0);

  return (
    <div className="manage">
      <h2>태그 관리 페이지</h2>
      <Routes>
        <Route path="/" element={<ManageMain searchInputs={searchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listBtns={listBtns} listName={listName} uploadBtn={true} setManageModal={setTagManageModal} />} />
        <Route path="/upload" element={<Upload uploadInputs={uploadInputs} addedUploadDatas={addedUploadDatas} setAddedUploadDatas={setAddedUploadDatas} api={api} />} />
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
      <div>{props.id}</div>
    </div>
    <div className="manageModalOut" />
    </>
  )
}

export default TagManage;