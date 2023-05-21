

function Inputs(props) {
  
  const addData = (dataName, data, inputKeyName) => {
    if (data.split(' ').join('')) props.setAddedDatas({...props.addedDatas, [dataName]:[...props.addedDatas[dataName], data]});
    props.setInputs({...props.inputs, [inputKeyName]:{...props.inputs[inputKeyName], inputValue:''}})
  }

  const enterKey = (e, dataName, data, inputKeyName) => {
    if(e.key === 'Enter' && props.inputs[inputKeyName].isPlural){
      addData(dataName, data, inputKeyName);
    };
  }

  const inputChange = (e, keyName) => {
    props.setInputs({...props.inputs, [keyName]:{...props.inputs[keyName], inputValue: e.target.value}})
    if (! props.inputs[keyName].isPlural) props.setAddedDatas({...props.addedDatas, [props.inputs[keyName].addDataName]: e.target.value})
  }

  const dateChange = (e, keyName, idxNum) => {
    var date = props.addedDatas[keyName];
    date.splice(idxNum, 1, new Date(e.target.value));
    props.setAddedDatas({...props.addedDatas, [keyName]: date});
  }

  const inputFile = (e, keyName) => {
    props.setInputs({...props.inputs, [keyName]:{...props.inputs[keyName], inputValue: e.target.files[0]}})
    if (! props.inputs[keyName].isPlural) props.setAddedDatas({...props.addedDatas, [props.inputs[keyName].addDataName]: e.target.files[0]})
  }


  return(
    <div className="inputs">
      {
        Object.entries(props.inputs).map(([keyName, value]) => {
          return(
            <div key={keyName} className="inputBox">
              <span className="inputName">{value.name}</span>
              {
                value.type === 'default' || value.type === 'password'
                ?
                <input type={value.type} value={value.inputValue} onChange={(e) => {inputChange(e, keyName)}} onKeyUp={(e) => {enterKey(e, value.addDataName, value.inputValue, keyName)}} />
                :
                null
              }

              {
                value.type === 'file'
                ?
                <input type={value.type} onChange={(e) => {inputFile(e, keyName)}} onKeyUp={(e) => {enterKey(e, value.addDataName, value.inputValue, keyName)}} />
                :
                null
              }
              
              {
                value.type === 'select' 
                ?
                <select value={value.inputValue} onChange={(e) => {inputChange(e, keyName)}} onKeyUp={(e) => {enterKey(e, value.addDataName, value.inputValue, keyName)}} >
                  <option value={null} style={{color: 'gray'}}>{value.name} 선택하세요</option>
                  {value.selectMenus.map((selectMenu) => {return(<option key={selectMenu} value={selectMenu}>{selectMenu}</option>)})}
                </select>
                :
                null 
              }

              {
                value.type === 'textarea'
                ?
                <textarea value={value.inputValue} onChange={(e) => {inputChange(e, keyName)}} onKeyUp={(e) => {enterKey(e, value.addDataName, value.inputValue, keyName)}}/>
                :
                null
              }

              {
                value.type === 'checkbox'
                ?
                value.checkList.map((checkbox, idx) => {
                  return(
                    <div key={idx} className="checkbox">
                      <input id={"checkbox"+keyName+idx} type={"checkbox"} value={checkbox} checked={checkbox === value.inputValue} onClick={(e) => {
                        let checkValue = e.target.checked? e.target.value: '' ; 
                        props.setInputs({...props.inputs, [keyName]:{...value, inputValue: checkValue}}); 
                        props.setAddedDatas({...props.addedDatas, [value.addDataName]: checkValue});
                      }} />
                      <span onClick={() => {document.getElementById("checkbox"+keyName+idx).click()}}>{checkbox}</span>
                    </div>
                  )
                })
                :
                null
              }

              {
                value.type === 'date'
                ?
                <div className="dateInput">
                <input type={'date'} onChange={(e) => {dateChange(e, value.addDataName, 0)}} />
                <span>~</span>
                <input type={'date'} onChange={(e) => {dateChange(e, value.addDataName, 1)}} />
                </div>
                :
                null
              }

              {
                value.isPlural
                ?  
                <button className="addBtns" onClick={() => {addData(value.addDataName, value.inputValue, keyName)}}>추가</button>
                :
                null
              }
              
              {
                value.isPlural
                ?
                <div className="addedDatas">
                {
                  props.addedDatas[value.addDataName][0] ?
                  props.addedDatas[value.addDataName].map((addedData,idx) => {
                    return (
                      <span key={idx} className="addedDataBox">
                        <span className="addedData">{addedData}</span>
                        <button className="delBtn" onClick={() => {props.setAddedDatas({...props.addedDatas, [value.addDataName]:props.addedDatas[value.addDataName].filter((del) => del !== addedData)})}}>x</button>
                      </span>
                    )
                  }):
                  null
                }
                </div>
                :
                null
              } 
          </div>
          )
        })
      }
      {/* <div className="inputBox">
        <span className="inputName">등록일</span>
        <input type={"date"}/> ~ <input type={"date"} />
      </div>
      <button className="searchBtn" onClick={() => {search()}}>검색</button> */}
    </div>
  )
}
export default Inputs;