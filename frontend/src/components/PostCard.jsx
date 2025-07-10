import { Link } from 'react-router-dom';
import { Edit2, Trash2, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const PostCard = ({ post, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user && post.user_id === user.id;

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <Link 
          to={`/post/${post.slug}`}
          className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {post.title}
        </Link>
        
        {isOwner && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(post)}
              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
              title="Edit post"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(post)}
              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
              title="Delete post"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <User size={14} />
          <span>{post.user?.name || 'Unknown Author'}</span>
        </div>
        
      </div>

      <div className="text-gray-700 mb-4">
        {truncateContent(post.content)}
      </div>

      <Link
        to={`/post/${post.slug}`}
        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        Read more →
      </Link>
    </div>
  );
};

export default PostCard;