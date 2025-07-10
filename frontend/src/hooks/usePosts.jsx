import { useState, useEffect, useCallback } from 'react';
import { getPosts, getMyPosts } from '../services/postsService';

export const usePosts = (isMyPosts = false) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchPosts = useCallback(async (pageNum = 1, searchTerm = null, reset = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = isMyPosts 
        ? await getMyPosts(pageNum, 10)
        : await getPosts(pageNum, 10, searchTerm);
      
      if (reset) {
        setPosts(response.posts);
      } else {
        setPosts(prev => [...prev, ...response.posts]);
      }
      
      setHasMore(response.hasMore);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isMyPosts]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchPosts(page + 1, search);
    }
  }, [page, search, loading, hasMore, fetchPosts]);

  const searchPosts = useCallback((searchTerm) => {
    setSearch(searchTerm);
    setPage(1);
    fetchPosts(1, searchTerm, true);
  }, [fetchPosts]);

  const refreshPosts = useCallback(() => {
    setPage(1);
    fetchPosts(1, search, true);
  }, [search, fetchPosts]);

  const addPost = useCallback((newPost) => {
    setPosts(prev => [newPost, ...prev]);
  }, []);

  const updatePost = useCallback((updatedPost) => {
    setPosts(prev => prev.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  }, []);

  const deletePost = useCallback((postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  }, []);

  useEffect(() => {
    fetchPosts(1, '', true);
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    searchPosts,
    refreshPosts,
    addPost,
    updatePost,
    deletePost
  };
};