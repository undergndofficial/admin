import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://adminapi.undergnd.com/',
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 헤더에 엑세스 토큰 담기
    const x_access_token = localStorage.getItem('x_access_token');
    const x_refresh_token = localStorage.getItem('x_refresh_token');
    if (x_access_token && x_refresh_token) {
      config.headers.Authorization = `Token ${x_access_token}`;
      config.headers.refresh = `${x_refresh_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    //  401에러가 아닌 경우 그냥 에러 발생
    if (response.status !== 401 || config.sent) {
      return Promise.reject(error);
    }
    // 로그인 정보가 유효하지 않을 경우 (err_auth_002)
    // 사용자의 상태가 변경(탈퇴, 사용중지)되었을 경우 (err_mem_090)
    // 홈 화면으로 리다이렉트 후 에러 발생
    if (
      response.data.err.code === 'err_auth_002' ||
      response.data.err.code === 'err_mem_090'
    ) {
      // 토큰 삭제
      localStorage.removeItem('x_access_token');
      localStorage.removeItem('x_refresh_token');
      window.location.href = '/';
      alert('로그인 상태가 만료되었습니다. 다시 로그인해주세요.');
      return Promise.reject(error);
    }
    // 아닌 경우 토큰 갱신
    config.sent = true; // 무한 재요청 방지
    const { x_access_token, x_refresh_token } = response.data;
    localStorage.setItem('x_access_token', x_access_token);
    localStorage.setItem('x_refresh_token', x_refresh_token);
    if (x_access_token && x_refresh_token) {
      config.headers.Authorization = `Token ${x_access_token}`;
      config.headers.refresh = `${x_refresh_token}`;
    }
    return axios(config);
  },
);

export default instance;
