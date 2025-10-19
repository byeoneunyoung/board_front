import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogApi } from '../api/blogApi';
import type { PostDto } from '../types/post';

export default function PostDetail() {
  const [post, setPost] = useState<PostDto | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      const data = await blogApi.getPost(postId);
      setPost(data);
    } catch (error) {
      console.error('게시글 로딩 실패:', error);
      alert('게시글을 불러오는데 실패했습니다.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await blogApi.deletePost(id);
      alert('게시글이 삭제되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← 목록으로
        </button>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="border-b pb-6 mb-6">
            <h1 className="text-3xl font-GowunBatang text-gray-800 mb-4">{post.title}</h1>
            <div className="flex justify-between text-sm text-gray-500">
              <span>작성자: {post.name}</span>
              <span>{new Date(post.createdDt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button
              onClick={() => navigate(`/edit/${post.id}`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}