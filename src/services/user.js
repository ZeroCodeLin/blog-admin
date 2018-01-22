import request from '../utils/request';

export async function queryInfo() {
  return request('/api/users/list');
}

export async function update(params) {
  return request('/api/users/update',{
    method: 'POST',
    body: params,
  });
}

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/users/list');
}
