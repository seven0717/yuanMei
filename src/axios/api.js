import axios from 'axios';

export default {
  // 获取首页默认地址 guess
  cityGuess: (data) => {
    return axios.get('/v1/cities?type=' + data);
  },
}
