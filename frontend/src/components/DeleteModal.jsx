import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { deletePost } from '../services/postsService';

const DeleteModal = ({ isOpen, onClose, post, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!post) return;
    
    console.log(`Deleting post with ID: ${post.id}`);
    
    setIsDeleting(true);
    try {
      await deletePost(post.id);
      onSuccess(post.id);
      onClose();
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Post"
      size="sm"
    >
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete the post "{post?.title}"? This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            loading={isDeleting}
          >
            Delete Post
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;