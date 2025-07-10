const BASE_URL = 'http://localhost:8000/api'; 

const processResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const getPosts = (page = 1, perPage = 10, search = '') => {
  const url = new URL(`${BASE_URL}/posts`);
  
  url.searchParams.append('page', page);
  url.searchParams.append('per_page', perPage);
  if (search) {
    url.searchParams.append('search', search);
  }

  return fetch(url).then(processResponse);
};

export const getPostBySlug = (slug) => {
  return fetch(`${BASE_URL}/posts/slug/${slug}`).then(processResponse);
};

export const getMyPosts = () => {
  return fetch(`${BASE_URL}/my-posts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    }},
  ).then(processResponse);
};

export const createPost = (postData) => {
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify(postData),
  }).then(processResponse);
};

export const updatePost = (postId, postData) => {
  return fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify(postData),
  }).then(processResponse);
};

export const deletePost = (postId) => {
  return fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    },
  }).then(processResponse);
};