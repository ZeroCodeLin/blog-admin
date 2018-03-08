import request from '../utils/request';

export async function getBlogList(params) {
  return request('/api/blog/lists',{
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request('/api/users/update',{
    method: 'POST',
    body: params,
  });
}

export async function writeBlog(params) {
  return request('/api/blog/write',{
    method: 'POST',
    body:params
  })
}