import Modal from './Modal';
import PostForm from './PostForm';
import { updatePost, createPost } from '../services/postsService';

const PostModal = ({ isOpen, onClose, post, onSuccess }) => {
  const isEditing = !!post;

  const handleSubmit = async (formValues) => {
    try {
      let savedPost;
      if (isEditing) {
        savedPost = await updatePost(post.id, formValues);
      } else {
        savedPost = await createPost(formValues);
      }
      
      onSuccess(savedPost, isEditing);
      onClose();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Post' : 'Create New Post'}
      size="lg"
    >
      <PostForm
        post={post}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default PostModal;