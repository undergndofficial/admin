import { useEffect, useState } from "react";
import Inputs from "./inputs";
import axios from "axios";


function Modal(props) {
  return(
    <>
      <div className="manageModal">
        <h3>{props.modalName}</h3>
        <ModalInfo api={props.getInfoApi} />
        <Inputs inputs={props.inputs} addedDatas={props.addedDatas} setAddedDatas={props.setAddedDatas} />
      </div>
      <div className="manageModalOut" />
    </>
  )
}

function ModalInfo(props){
  
  const [modalDatas, setModalDatas] = useState({mem: {name: '문의인', info:{seq: 1, data: '장재영'}}, date: {name: '문의 날짜', info: "2023-07-08T23:11:37Z"}, inquiry: {name: 'Q', info: '질문내용질문내요질문내용질문내용질문내용질문내요질문내용질문내용질문내용질문내요질문내용질문내용질문내용질문내요질문내용질문내용'}})

  // useEffect(() => {
    // axios.get(props.getInfoApi)
    // .then((res) => {
    //   setModalDatas(res.data)
    // })
  // }, []) 

  return(
    <div className="modalInfo">
    {Object.entries(modalDatas).map(([keyName, value]) => {
      return(
        <div key={keyName} className="infoBox">
          <span className="infoName">{value.name}</span>
          {
            typeof value.info === 'object' ?
            <span className="info">{value.info.data}</span>
            :
            <span className="info">{value.info}</span>
          }
        </div>    
      )
      }
    )
    }  
    </div>
  )    
}

export default Modal;