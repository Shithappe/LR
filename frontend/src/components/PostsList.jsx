import { useState, useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from './PostCard';
import LoadingSpinner from './LoadingSpinner';
import PostModal from './PostModal';
import DeleteModal from './DeleteModal';
import Search from './Search';
import Button from './Button';

const PostsList = ({ isMyPosts = false }) => {
  const {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    searchPosts,
    addPost,
    updatePost,
    deletePost
  } = usePosts(isMyPosts);

  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsPostModalOpen(true);
  };

  const handleDeletePost = (post) => {
    setDeletingPost(post);
    setIsDeleteModalOpen(true);
  };

  const handlePostSuccess = (post, isEditing) => {
    if (isEditing) {
      updatePost(post);
    } else {
      addPost(post);
    }
    setIsPostModalOpen(false);
    setEditingPost(null);
  };

  const handleDeleteSuccess = (postId) => {
    deletePost(postId);
    setIsDeleteModalOpen(false);
    setDeletingPost(null);
  };

  const handleCloseModals = () => {
    setIsPostModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditingPost(null);
    setDeletingPost(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;
      
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 1000) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, loadMore]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading posts: {error}</p>
        <Button
          variant="primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mx-auto space-y-6">
      <div className="w-full flex justify-center mt-4">
        {!isMyPosts && (
          <div className="max-w-2xl w-full">
            <Search onSearch={searchPosts} />
          </div>
        )}
        
      </div>

      {posts.length === 0 && !loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {isMyPosts ? 'You haven\'t created any posts yet.' : 'No posts found.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              showActions={isMyPosts}
            />
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {!loading && hasMore && posts.length > 0 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      <PostModal
        isOpen={isPostModalOpen}
        onClose={handleCloseModals}
        post={editingPost}
        onSuccess={handlePostSuccess}
        isEditing={!!editingPost}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onSuccess={() => handleDeleteSuccess(deletingPost?.id)}
        post={deletingPost}
      />
    </div>
  );
};

export default PostsList;