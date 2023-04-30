
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://candidato03.globalthings.net/api/',
  headers: {
    'Accept': 'application/json',
    'accessKey': 'eea24833c42a4bb5a43003ebc25ec8e3'
  }
});

export default API;
