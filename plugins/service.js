import axios from 'axios';
import Vue from 'vue';

// DB insert APIs
const instanceDB = axios.create({
   baseURL: '/api/',
});

Vue.prototype.$service = {
   postDb: (endPoint, payload = {}) => instanceDB.post(endPoint, payload),
   deleteDb: (endPoint, payload = {}) => instanceDB.delete(endPoint),
};
