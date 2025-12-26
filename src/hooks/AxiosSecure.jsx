import axios from 'axios';
import React from 'react';
const axiosUse = axios.create({
    baseURL: 'http://localhost:5000'
})
const AxiosSecure = () => {
    
    return axiosUse;
    
};

export default AxiosSecure;
