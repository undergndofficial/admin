import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import { useEffect, useState } from "react";

function Main(){

  const [statsInfos, setStatsInfos] = useState([]);

  useEffect(() => {
    axios.get('/api/stats')
    .then((response) => {
      setStatsInfos(response.data);
    })
  },[])

  // const date = new date();

  // console.log(date)

  return(
    <div className="home">
      <div className="topMenus">
        <div className="menu">
          <h2 className="menuName">영화</h2>
          <div className="menuInfos">
            <div className="info">
              <span>총</span>
              <span>75 편</span>
            </div>
            <div className="info">
              <span>영화 등록 신청</span>
              <span>22 편</span>
            </div>
          </div>
        </div>
      {/* <button onClick={() => {console.log(data)}}>버튼</button> */}

        <div className="menu">
          <h2 className="menuName">회원</h2>
          <div className="menuInfos">
            <div className="info">
              <span>총</span>
              <span>2215 명</span>
            </div>
            <div className="info">
              <span>신규</span>
              <span>22 명</span>
            </div>
            <div className="info">
              <span>휴면</span>
              <span>127 명</span>
            </div>
            <div className="info">
              <span>탈퇴</span>
              <span>10 명</span>
            </div>
          </div>
        </div>
        
        <div className="menu">
          <h2 className="menuName">문의</h2>
          <div className="menuInfos">
            <div className="info">
              <span>1대1 문의</span>
              <span>24 건</span>
            </div>
            <div className="info">
              <span>오류 리포트</span>
              <span>3 건</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="siteStats">
        <h2 className="statsTitle">사이트 통계</h2>
        <div className="statsInfos">
          {
            statsInfos.map((statsInfo) => {
              return(
                <div className="info">
                    <h3>{statsInfo.id}</h3>
                    <div className="stats">
                      <Stats statsData={statsInfo}/> 
                    </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

function Stats(props){
  
  return(
    <ResponsiveLine
        data={[props.statsData]}
        margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        enableGridX={false}
        enableGridY={false}
        enablePointLabel={true}
        yFormat="d"
        axisTop={null}
        axisRight={null}
        axisBottom={true}
        axisLeft={null}
        pointSize={5}
        pointBorderWidth={2}
        colors={'#000'}
        pointBorderColor={'#000'}
        pointColor={'#000'}
        pointLabelYOffset={-12}
        // useMesh={true}
        // legends={[
        //     {
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 100,
        //         translateY: 0,
        //         itemsSpacing: 0,
        //         itemDirection: 'left-to-right',
        //         itemWidth: 80,
        //         itemHeight: 20,
        //         itemOpacity: 0.75,
        //         symbolSize: 12,
        //         symbolShape: 'circle',
        //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemBackground: 'rgba(0, 0, 0, .03)',
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />
  )
}


export default Main;