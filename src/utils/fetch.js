import axios from 'axios';
import getProxy from './proxy.js';

export default (url) => axios.get(getProxy(url));
