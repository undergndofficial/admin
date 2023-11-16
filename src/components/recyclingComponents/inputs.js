import { useEffect, useState } from "react";


function Inputs(props) {

  const [inputValues, setInputValues] = useState();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const createInputValues = Object.keys(props.inputs).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setInputValues(createInputValues);  
    setIsDone(true);
  }, [])
  
  const addData = (dataName, data, inputKeyName) => {
    // console.log(dataName)
    if (typeof(data)==='number' || data.split(' ').join('')) props.setAddedDatas({...props.addedDatas, [dataName]:[...props.addedDatas[dataName], data]});
    // props.setInputs({...props.inputs, [inputKeyName]:{...props.inputs[inputKeyName], inputValue:''}})
    setInputValues({...inputValues, [inputKeyName]: ''})
  }
  
  const enterKey = (e, dataName, data, inputKeyName) => {
    if(e.key === 'Enter' && props.inputs[inputKeyName].isPlural){
      addData(dataName, data, inputKeyName);
    };
  }

  const inputChange = (data, keyName) => {
    setInputValues({...inputValues, [keyName]: data})
    // props.setInputs({...props.inputs, [keyName]:{...props.inputs[keyName], inputValue: e.target.value}})
    if (! props.inputs[keyName].isPlural) props.setAddedDatas({...props.addedDatas, [props.inputs[keyName].addDataName]: data})
  }

  const isTureChange = (isTrue, keyName) => {
    if(isTrue === props.addedDatas[props.inputs[keyName].addDataName]) inputChange(null, keyName);
    else inputChange(isTrue, keyName);
  }
  
  const dateChange = (e, keyName, idxNum) => {
    var date = props.addedDatas[keyName];
    date.splice(idxNum, 1, new Date(e.target.value));
    props.setAddedDatas({...props.addedDatas, [keyName]: date});
  }
  
  const inputFile = (e, keyName) => {
    setInputValues({...inputValues, [keyName]: e.target.files[0]})
    // props.setInputs({...props.inputs, [keyName]:{...props.inputs[keyName], inputValue: e.target.files[0]}})
    if (! props.inputs[keyName].isPlural) props.setAddedDatas({...props.addedDatas, [props.inputs[keyName].addDataName]: e.target.files[0]})
  }


  return(
    <div className="inputs">
    {isDone ?
      
        Object.entries(props.inputs).map(([keyName, value]) => {
          return(
            <div key={keyName} className="inputBox">
              <span className="inputName">{value.name}</span>
              {
                value.type === 'default' || value.type === 'password'
                ?
                <input type={value.type} value={inputValues[keyName]} onChange={(e) => {inputChange(e.target.value, keyName)}} onKeyUp={(e) => {enterKey(e, value.addDataName, inputValues[keyName], keyName)}} />
                :
                null
              }

              {
                value.type === 'file'
                ?
                <input type={value.type} onChange={(e) => {inputFile(e, keyName)}} onKeyUp={(e) => {enterKey(e, value.addDataName, inputValues[keyName], keyName)}} />
                :
                null
              }
              
              {
                value.type === 'select' 
                ?
                  value.isForeign 
                  ?
                    <select value={inputValues[keyName]} onChange={(e) => {inputChange(e.target.value, keyName)}} onKeyUp={(e) => {enterKey(e, value.addDataName, inputValues[keyName], keyName)}} >
                      <option value={null} style={{color: 'gray'}}>{value.name} 선택하세요</option>
                      {value.selectMenus.map((selectMenu) => {return(<option key={selectMenu[value.seq]} value={selectMenu[value.seq]}>{selectMenu[value.valueKey]}</option>)})}
                    </select>
                  :
                    <select value={inputValues[keyName]} onChange={(e) => {inputChange(e.target.value, keyName)}} onKeyUp={(e) => {enterKey(e, value.addDataName, inputValues[keyName], keyName)}} >
                      <option value={null} style={{color: 'gray'}}>{value.name} 선택하세요</option>
                      {value.selectMenus.map((selectMenu) => {return(<option key={selectMenu} value={selectMenu}>{selectMenu}</option>)})}
                    </select>
                :
                  null 
              }

              {
                value.type === 'textarea'
                ?
                <textarea value={inputValues[keyName]} onChange={(e) => {inputChange(e.target.value, keyName)}} onKeyUp={(e) => {enterKey(e, value.addDataName, inputValues[keyName], keyName)}}/>
                :
                null
              }

              {
                value.type === 'checkbox'
                ?
                value.checkList.map((checkbox, idx) => {
                  return(
                    <div key={idx} className="checkbox">
                      <input id={"checkbox"+keyName+idx} type={"checkbox"} value={checkbox} checked={checkbox === inputValues[keyName]} onClick={(e) => {
                        let checkValue = e.target.checked? e.target.value: '' ;
                        setInputValues({...inputValues, [keyName]: checkValue}); 
                        // props.setInputs({...props.inputs, [keyName]:{...value, inputValue: checkValue}}); 
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
                value.type === 'isTrue'
                ?
                <div className="isTrue">
                  <div className="isTrueCheckbox">
                    <input type={"checkbox"} checked={props.addedDatas[value.addDataName]===true} value={true} onChange={(e) => {isTureChange(true, keyName)}}/><span onClick={() => isTureChange(true, keyName)} >{value.menus[0]}</span>
                  </div>
                  <div className="isTrueCheckbox">
                    <input type={"checkbox"} checked={props.addedDatas[value.addDataName]===false} value={false} onChange={(e) => {isTureChange(false, keyName)}}/><span onClick={() => isTureChange(false, keyName)} >{value.menus[1]}</span>
                  </div>
                </div>
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
                <button className="addBtns" onClick={() => {addData(value.addDataName, inputValues[keyName], keyName)}}>추가</button>
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
                        <span className="addedData">{
                          value.isForeign
                          ?
                          value.selectMenus.find((data) => data[value.seq] == addedData)[value.valueKey]
                          :
                          addedData
                        }</span>
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
      
      :
      <div>Loading...</div>
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