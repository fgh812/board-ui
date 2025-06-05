import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/v1',
});


export const getBoardList = () => api.get('/board/free/list');
export const getBoardDetail = (id: number) => api.get(`/board/free/detail/${id}`, {});
export const createBoard = (data: any) => api.post('/board/free/create', data);
export const updateBoard = (data: any) => api.put('/board/free/update', data);
export const deleteBoard = (id: number) => api.delete('/board/free/delete', { data: { id } });
export const recommendBoard = (id: number) => api.put('/board/free/update/recmmCnt', { id });
