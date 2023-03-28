import axios from "axios";
import { useEffect, useState } from "react";
import List from "../../components/recyclingComponents/list";
import SearchFilter from "../../components/recyclingComponents/searchFilter";

function TagManage () {

  const [dataLength, setDataLength] = useState();
  const [queryData, setQueryData] = useState();
  const elements = {tagName: '태그 이름', movies: ['영화', 'movieTitle'], date: '등록일'};

  const [searchInputs, setSearchInputs] = useState({
    tagName: {name: '태그 이름', isPlural: true, isInput: true, type: 'default', addDataName: 'tagName', inputValue: ''},
    movies: {name: '영화', isPlural: true, isInput: true, type: 'default', addDataName: 'movies', inputValue: ''},
    date: {name: '등록일', isPlural: false, isInput: false, type:'date', addDataName: ['startDate', 'endDate'], inputValue: ''}
  })

  const [addedSearchDatas, setAddedSearchDatas] = useState({
    tagName:[],
    movies: [],
    startDate: '',
    endDate: ''
  })

  const [searchOption, setSearchOption] = useState('and');

  const [tagMangeModal, setTagManageModal] = useState(0)

  return (
    <div className="manage">
      <h2>태그 관리 페이지</h2>
      <SearchFilter inputs={searchInputs} setInputs={setSearchInputs} addedDatas={addedSearchDatas} setAddedDatas={setAddedSearchDatas} queryData={queryData} setQueryData={setQueryData} searchOption={searchOption} setSearchOption={setSearchOption} setDataLength={setDataLength} getLengthApi={'tag/getLength'} />
      <List dataLength={dataLength} queryData={queryData} searchOption={searchOption} elements={elements} defaultShow={['tagName', 'movies', 'date']} listName='태그' getListApi={'tag/getTagList'} setManageModal={setTagManageModal} />
      {tagMangeModal ? <TagManageModal id={tagMangeModal} setTagManageModal={setTagManageModal} /> : null}
    </div>
  )
}

function TagManageModal(props) {
  return(
    <>
    <div className="manageModal">
      <button onClick={()=>{props.setTagManageModal(0)}}>x</button>
      {props.id}
    </div>
    <div className="manageModalOut" />
    </>
  )
}

export default TagManage;