import axios from "axios";
import { useEffect, useRef, useState } from "react";

function List(props) {

  const [showEl, setShowEl] = useState(props.defaultShow);
  
  const [listNum, setListNum] = useState(10);
  const totalPage = Math.ceil(props.dataLength/listNum);
  const listNumOptions = [5, 10, 25, 50, 100];
  const [currPage, setCurrPage] = useState(1);
  const [addShowElModal, setAddShowElModal] = useState(false);
  const pages = [];
  const [listData, setListData] = useState([]);

  const [sortOption, setSortOption] = useState('최신순');
  const sortOptions = ['최신순', '오래된순', '이름순'];

  const draggingItemIndex = useRef();
  const draggingOverItemIndex = useRef();

  const onDragStart = (e, index) => {
    e.target.classList.add('grabbing');
    draggingItemIndex.current = index;
  }
  
  const onDragEnter = (index) => {
    draggingOverItemIndex.current = index;
    const copyListItems = [...showEl];
    const dragItemContent = showEl[draggingItemIndex.current];
    copyListItems.splice(draggingItemIndex.current, 1);
    copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent);
    draggingItemIndex.current = draggingOverItemIndex.current;
    draggingOverItemIndex.current = null;
    setShowEl(copyListItems);
  }
  
  const onDragEnd = (e) => {
    e.target.classList.remove('grabbing');
  }
    
    // const ondDragOver = (e) => {
  //   // e.preventDefault();
  // }

  for(let i=0; i<totalPage; i++) {
    pages[i] = i+1;
  }
  
  const nextPage = () => {
    if (currPage !== pages[pages.length-1]) setCurrPage(currPage+1);
  }
  const prevPage = () => {
    if (currPage !== 1) setCurrPage(currPage-1);
  }
      
  const listNumChange = (num) => {
    setCurrPage(1);
    setListNum(num);
  } 
  
  // const aa = () => {
  //   history.pushState('/page/2');
  // }

  useEffect(() => {
    console.log(props.queryData);
    const req = {page: currPage, listNum: listNum, sortOption:sortOption, queryData: props.queryData}
    axios.post('/api/'+props.getListApi, req, {"Content-Type": 'application/json'})
    .then((response) => {
      setListData(response.data);
    })
  },[currPage, listNum, sortOption, props.queryData])

  useEffect(() => {
    setCurrPage(1);
  }, [props.queryData]);

  return(
    <div className="listBox">
    <div className="listTitle">{props.listName} 목록</div>
    <div className="listMenu">
      <button className="addShowElBtn" onClick={() => {setAddShowElModal(true)}}>구성 설정</button>
      {
        addShowElModal ?
        <AddShowElModal elements={props.elements} showEl={showEl} setShowEl={setShowEl} setAddShowElModal={setAddShowElModal}/> :
        null
      }
      <select value={listNum} onChange={(e) => {listNumChange(e.target.value)}} >
        {listNumOptions.map((option) => {return(<option key={option} value={option}>{option}개씩 보기</option>)})}
      </select>
      <select value={sortOption} onChange={(e) => {setSortOption(e.target.value)}}>
        {sortOptions.map((option) => {return(<option key={option} value={option}>{option}</option>)})}
      </select>
    </div>
    <table className="list">
      <thead>
      
      <tr>
        {showEl.map((elKeyName, index) => {return(<th draggable className="el" onDragStart={(e) => {onDragStart(e, index)}} onDragEnter={() => {onDragEnter(index)}} onDragEnd={(e) => {onDragEnd(e)}} >{Array.isArray(props.elements[elKeyName]) ? props.elements[elKeyName][0]: props.elements[elKeyName]}</th>)})}
      </tr>
      </thead>
      <Page showEl={showEl} listData={listData} elements={props.elements} setManageModal={props.setManageModal} />
    
    </table>
    <div className="pages">
        <button onClick={() => {setCurrPage(1)}}>{'<<'}</button>
        <button onClick={prevPage}>{'<'}</button>
        {
          pages.map((page) => {
            return(
              <button className={page === currPage ? "currPageBtn" : "pageBtn"} onClick={() => {setCurrPage(page)}}>{page}</button>
            )
          })
        }
        <button onClick={nextPage}>{'>'}</button>
        <button onClick={() => {setCurrPage(pages[pages.length-1])}}>{'>>'}</button>
      </div>
    </div>
  )
}

function AddShowElModal(props) {
  
  const checkRef = useRef();
  const change = (e, elKeyName) => {
    if(e.target.checked) props.setShowEl([...props.showEl, elKeyName]);
    else {
      props.setShowEl(props.showEl.filter((el) => {return el !== elKeyName}));
    }
  }

  return(
    <> 
    <div className="modalOut" onClick={() => {props.setAddShowElModal(false)}} />
    <div className="addShowElModal">
      {
        Object.keys(props.elements).map((elKeyName) => {
          return(
            <div>
              <input type={"checkbox"} id={'checkBox'+elKeyName} defaultChecked={props.showEl.includes(elKeyName)} onChange={(e) => {change(e, elKeyName)}}/>
              <button onClick={() => {document.getElementById('checkBox'+elKeyName).click()}}>{Array.isArray(props.elements[elKeyName]) ? props.elements[elKeyName][0]: props.elements[elKeyName]}</button>
            </div>
          )
        })
      }
    </div>
    </>
  )
}

function Page(props) {

  return(
      <tbody>
      {
        props.listData[0] ?
        props.listData.map((data) => {
          return(
            <ListElement data={data} showEl={props.showEl} elements={props.elements} setManageModal={props.setManageModal} />
          )
        })
        :
        <div className="noData">데이터가 없습니다.</div>
      }
    </tbody>
  )
}

function ListElement(props) {
  return(
    <tr onClick={() => {props.setManageModal(props.data._id)}}>
      {
        props.showEl.map((elKeyName) => {
        return(
          <td className="el" >
            {
              Array.isArray(props.elements[elKeyName])
                ?
                //console.log(elKeyName)
                props.data[elKeyName].map((dataEl) => {
                  return(
                    <div>
                      {dataEl[props.elements[elKeyName][1]]}
                    </div>
                  )
                })
                :
                Array.isArray(props.data[elKeyName])?
                props.data[elKeyName].map((dataEl) => {
                  return (
                    <div>
                      {dataEl}
                    </div>
                  )
                })
                :
                  <div>{elKeyName.toLowerCase().includes('date') ? props.data[elKeyName].substr(0,10): props.data[elKeyName]}</div>
            }
          </td>
        )
      })}
    </tr>
  )
}

export default List;