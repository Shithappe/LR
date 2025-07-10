import PostsList from '../components/PostsList';

const MyPosts = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Posts</h1>
      <PostsList isMyPosts={true} />
    </div>
  );
};

export default MyPosts;
