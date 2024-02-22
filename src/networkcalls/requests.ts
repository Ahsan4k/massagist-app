import React from 'react';
import axios from 'axios';
import {baseUrl} from '../consts/baseUrl';

export const post = async (end: string, data: {}) => {
  const res = await axios.post(`${baseUrl}${end}`, data);
  return res;
};

export const patch = async (end: string, data: {}) => {
  const res = await axios.patch(`${baseUrl}${end}`, data);
  return res;
};

export const get = async (end: string) => {
  const {data} = await axios.get(`${baseUrl}${end}`);
  return data;
};

export const del = async (end: string, data: {}) => {
  const res = await axios.delete(`${baseUrl}${end}`, data);
  return res;
};
