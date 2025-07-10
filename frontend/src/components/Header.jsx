import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import AuthModal from './AuthModal';
import PostModal from './PostModal';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsPostModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePostSuccess = (post, isEditing) => {
    window.location.reload();
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                Laravel + React
              </Link>
              
              <nav className="hidden md:flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Newest
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/my-posts"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    My Posts
                  </Link>
                )}
              </nav>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreatePost}
                className="flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Create Post</span>
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User size={16} />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign In
                </Button>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 p-2"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-4">
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Newest
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/my-posts"
                    className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Posts
                  </Link>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      handleCreatePost();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full mb-3"
                  >
                    <Plus size={16} className="mr-2" />
                    Create Post
                  </Button>

                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-700 px-3">
                        <User size={16} />
                        <span className="text-sm">{user.name}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSuccess={handlePostSuccess}
      />
    </>
  );
};

export default Header;