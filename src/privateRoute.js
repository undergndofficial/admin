import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';

export default function PrivateRoute(props) {
  const token = localStorage.getItem('x_access_token');
  const isLogin = !isEmpty(token);

  if (props.userAuthentication) {
    // 사용자 인증이 반드시 필요한 페이지
    // 인증을 안했을 경우 메인 페이지로, 했을 경우 해당 페이지로
    if (!isLogin) {
      toast.error('로그인이 필요한 페이지 입니다.');
      return <Navigate to="/login" />;
    }
    // 인증을 안했을 경우 메인 페이지로, 했을 경우 해당 페이지로
    return <Outlet />;
  } else {
    // 인증이 반드시 필요 없는 페이지
    // 인증을 안했을 경우 해당 페이지로, 인증을 한 상태일 경우 메인 페이지로
    return !isLogin ? <Outlet /> : <Navigate to="/" />;
  }
}

