import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function List(props) {

  const [showEl, setShowEl] = useState(props.defaultShow);
  
  const [listNum, setListNum] = useState(10);
  const totalPage = Math.ceil(props.dataLength/listNum);
  const listNumOptions = [5, 10, 25, 50, 100];
  const [currPage, setCurrPage] = useState(1);
  const [setShowElModal, setSetShowElModal] = useState(false);
  const pages = [];
  const [listData, setListData] = useState([]);

  const [checkedData, setCheckedData] = useState([]);

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

  const changeCheckbox = (e) => {
    if (e.target.checked) {
      let listIds = [];
      for (let data of listData) {
        listIds.push(data._id);
      }
      setCheckedData(listIds);
    }
    else setCheckedData([]);
  }

  const clickListBtn = (btn) => {
    if (checkedData[0]){
      if (btn.prompt) {
        let text = prompt(btn.prompt.msg);
        
        if (text === btn.prompt.value) {
          axios.post('/api'+btn.api, checkedData, {"Content-Type": 'application/json'})
          if( !alert(btn.name+'되었습니다') ) window.location.reload();
        }
        else alert('취소되었습니다.');
      }
      else {
        axios.post('/api'+btn.api, checkedData, {"Content-Type": 'application/json'})
        if( !alert(btn.name+'되었습니다') ) window.location.reload();
      }
    }
    else alert('한 개 이상 선택해주세요');
  }

  const navigate = useNavigate();

  useEffect(() => {
    console.log(props.queryData);
    const req = {page: currPage, listNum: listNum, sortOption:sortOption, queryData: props.queryData, searchOption: props.searchOption}
    axios.post('/api/'+props.api+'/getList', req, {"Content-Type": 'application/json'})
    .then((response) => {
      setListData(response.data);
    })
  },[currPage, listNum, sortOption, props.queryData, props.searchOption, props.api])

  useEffect(() => {
    setCurrPage(1);
  }, [props.queryData]);

  return(
    <div className="listBox">
    <div className="listTitle">{props.listName} 목록</div>
    <div className="listMenu">
      <div className="leftMenu">
        {props.uploadBtn ? <button onClick={() => {navigate('../upload')}}>등록</button>: null}
        {
          props.listBtns ?
          props.listBtns.map((btn) => {
            return(
              <button key={btn.name} onClick={() => {clickListBtn(btn)}}>{btn.name}</button>
            )
          })
          :
          null
        }
      </div>

    <div className="rightMenu">
      <button className="setShowElBtn" onClick={() => {setSetShowElModal(true)}}>구성 설정</button>
      {
        setShowElModal ?
        <SetShowElModal elements={props.elements} showEl={showEl} setShowEl={setShowEl} setSetShowElModal={setSetShowElModal}/> :
        null
      }
      <select value={listNum} onChange={(e) => {listNumChange(e.target.value)}} >
        {listNumOptions.map((option) => {return(<option key={option} value={option}>{option}개씩 보기</option>)})}
      </select>
      <select value={sortOption} onChange={(e) => {setSortOption(e.target.value)}}>
        {sortOptions.map((option) => {return(<option key={option} value={option}>{option}</option>)})}
      </select>
    </div>
    </div>
    <table className="list">
      <thead>
      
      <tr>
        <td>
          <input className="listCheckbox" type={"checkbox"} checked={checkedData.length === listData.length} onChange={(e) => {changeCheckbox(e)}}/>
        </td>
        {showEl.map((elKeyName, index) => {return(<th key={elKeyName} draggable className="el" onDragStart={(e) => {onDragStart(e, index)}} onDragEnter={() => {onDragEnter(index)}} onDragEnd={(e) => {onDragEnd(e)}} >{Array.isArray(props.elements[elKeyName]) ? props.elements[elKeyName][0]: props.elements[elKeyName]}</th>)})}
      </tr>
      </thead>
      <Page showEl={showEl} listData={listData} elements={props.elements} checkedData={checkedData} setCheckedData={setCheckedData} setManageModal={props.setManageModal} />
    
    </table>
    <div className="pages">
        <button onClick={() => {setCurrPage(1)}}>{'<<'}</button>
        <button onClick={prevPage}>{'<'}</button>
        {
          pages.map((page) => {
            return(
              <button key={page} className={page === currPage ? "currPageBtn" : "pageBtn"} onClick={() => {setCurrPage(page)}}>{page}</button>
            )
          })
        }
        <button onClick={nextPage}>{'>'}</button>
        <button onClick={() => {setCurrPage(pages[pages.length-1])}}>{'>>'}</button>
      </div>
    </div>
  )
}

function SetShowElModal(props) {
  
  const change = (e, elKeyName) => {
    if(e.target.checked) props.setShowEl([...props.showEl, elKeyName]);
    else {
      props.setShowEl(props.showEl.filter((el) => {return el !== elKeyName}));
    }
  }

  return(
    <> 
    <div className="modalOut" onClick={() => {props.setSetShowElModal(false)}} />
    <div className="setShowElModal">
      {
        Object.keys(props.elements).map((elKeyName) => {
          return(
            <div key={elKeyName}>
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
            <ListElement key={data._id} data={data} showEl={props.showEl} elements={props.elements} checkedData={props.checkedData} setCheckedData={props.setCheckedData} setManageModal={props.setManageModal} />
          )
        })
        :
        <tr className="noData"><td>데이터가 없습니다.</td></tr>
      }
    </tbody>
  )
}

function ListElement(props) {
  
  const checkBoxChagne = (e) => {
    if (e.target.checked) props.setCheckedData([...props.checkedData, props.data._id]);
    else props.setCheckedData(props.checkedData.filter((id) => id !== props.data._id));    
  }

  return(
    <tr>
    <td>
      <input className="listCheckbox" type={"checkbox"} checked={props.checkedData.includes(props.data._id)} onChange={(e) => checkBoxChagne(e)} />
    </td>
      {
        props.showEl.map((elKeyName) => {
        return(
          <td key={elKeyName} className="el" onClick={() => {props.setManageModal(props.data._id)}} >
            {
              Array.isArray(props.elements[elKeyName])
                ?
                props.data[elKeyName].map((dataEl, idx) => {
                  return(
                    <div key={idx}>
                      {dataEl[props.elements[elKeyName][1]]}
                    </div>
                  )
                })
                :
                Array.isArray(props.data[elKeyName])?
                props.data[elKeyName].map((dataEl, idx) => {
                  return (
                    <div key={idx}>
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