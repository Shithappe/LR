import { useForm } from '../hooks/useForm';
import { validatePost } from '../utils/validation';
import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';
import MarkdownRenderer from './MarkdownRenderer';

const PostForm = ({ post, onSubmit, onCancel }) => {
  const isEditing = !!post;
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    {
      title: post?.title || '',
      content: post?.content || ''
    },
    validatePost
  );

  const handleFormSubmit = async (formValues) => {
    try {
      await onSubmit(formValues);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleFormSubmit);
      }}>
        <Input
          label="Title"
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && errors.title}
          placeholder="Enter post title"
          required
        />

        <Textarea
          label="Content (Markdown supported)"
          name="content"
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.content && errors.content}
          placeholder="Write your post content here... You can use Markdown formatting."
          rows={10}
          required
        />

        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
          >
            {isEditing ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>

      {values.content && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Preview:</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <MarkdownRenderer content={values.content} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;