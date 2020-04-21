import axiosInstance from "../../plugins/axios";

export default {
  login : (v) => axiosInstance({method:'POST',data:v,url:'/login'}),
  getUserInfo : (v) => axiosInstance(v)
}
