import { useState } from "react";
import List from "./list"
import SearchFilter from "./searchFilter"

function ManageMain(props) {

  const [dataLength, setDataLength] = useState();
  const [queryData, setQueryData] = useState();

  const [searchOption, setSearchOption] = useState('and');

  return(
    <>
      <SearchFilter inputs={props.searchInputs} 
        addedDatas={props.addedSearchDatas} setAddedDatas={props.setAddedSearchDatas}
        queryData={queryData} setQueryData={setQueryData}
        searchOption={searchOption} setSearchOption={setSearchOption} 
        setDataLength={setDataLength} api={props.api}  
      />
      <List dataLength={dataLength} queryData={queryData} 
        searchOption={searchOption} elements={props.elements} 
        defaultShow={props.defaultShow} listName={props.listName}
        api={props.api} setManageModal={props.setManageModal}
        listBtns={props.listBtns} uploadBtn={props.uploadBtn}
      />
    </>
  )
}

export default ManageMain;