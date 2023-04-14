import { useState } from "react";
import ManageMain from "../../components/recyclingComponents/manageMain";

function UserManage () {

  const listName = '회원';

  const elements = {userName: '이름', email: '이메일', joinDate: '가입일', lastAccessDate: '최근 접속일', payMethod: '결제수단', sms: 'sms수신'};

  const defaultShow = ['userName', 'email', 'joinDate'];
  const api = 'user';

  const [searchInputs, setSearchInputs] = useState({
    userName: {name: '이름', isPlural: true, isInput: true, type: 'default', addDataName: 'userName', inputValue: ''},
    email: {name: '이메일', isPlural: true, isInput: true, type: 'default', addDataName: 'email', inputValue: ''},
    joinDate: {name: '가입일', isPlural: false, isInput: false, type: 'date', addDataName: ['startJoinDate', 'endJoinDate'], inputValue: ''},
    lastAccessDate: {name: '최근 접속일', isPlural: false, isInput: false, type:'date', addDataName: ['startLastAccessDate', 'endLastAccessDate'], inputValue: ''},
    payMethod: {name: '결제수단 등록 여부', isPlural: false, isInput: true, type: 'checkbox', addDataName: 'payMethod', inputValue: '', checkList: ['등록', '미등록']},
    sms: {name: 'sms 수신 동의 여부', isPlural: false, isInput: true, type: 'checkbox', addDataName: 'sms', inputValue: '', checkList: ['동의', '미동의']}
  });
  const [addedSearchDatas, setAddedSearchDatas] = useState({
    userName: [],
    email: [],
    payMethod: '',
    sms: '',
    startJoinDate: '',
    endJoinDate: '',
    startLastAccessDate: '',
    endLastAccessDate: ''
  });

  return (
    <div className="manage">
      <h2>회원 관리 페이지</h2>
      {/* <SearchFilter inputs={searchInputs} setInputs={setSearchInputs} addedDatas={addedSearchDatas} setAddedDatas={setAddedSearchDatas} queryData={queryData} setQueryData={setQueryData} setDataLength={setDataLength} getLengthApi={'user/getLength'} />
      <List dataLength={dataLength} queryData={queryData} elements={elements} defaultShow={['userName', 'email', 'joinDate']} listName='회원' getListApi={'user/getUserList'} /> */}
      <ManageMain searchInputs={searchInputs} setSearchInputs={setSearchInputs} addedSearchDatas={addedSearchDatas} setAddedSearchDatas={setAddedSearchDatas} api={api} elements={elements} defaultShow={defaultShow} listName={listName} />
    </div>
  )
}

export default UserManage;