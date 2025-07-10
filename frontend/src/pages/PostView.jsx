import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPostBySlug } from '../services/postsService';
import LoadingSpinner from '../components/LoadingSpinner';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function PostView() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPostBySlug(slug)
      .then(setPost)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!post) return <p className="text-center text-gray-500">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600">by {post.user?.name}</p>
      
      <MarkdownRenderer content={post.content} />
    </div>
  );
}
