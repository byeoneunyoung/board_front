import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogApi } from '../api/blogApi';

export default function PostEdit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      const post = await blogApi.getPost(postId);
      setTitle(post.title);
      setContent(post.content);
      setName(post.name);
    } catch (error) {
      console.error('게시글 로딩 실패:', error);
      alert('게시글을 불러오는데 실패했습니다.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !title.trim() || !content.trim() || !name.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setSaving(true);
    try {
      await blogApi.updatePost(id, { title, content, name });
      alert('게시글이 수정되었습니다.');
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('수정 실패:', error);
      alert('게시글 수정에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(`/post/${id}`)}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← 뒤로가기
        </button>

        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-GowunBatang text-gray-800 mb-6">게시글 수정</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-GowunBatang text-gray-700 mb-2">
                작성자
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="이름을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-GowunBatang text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="제목을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-GowunBatang text-gray-700 mb-2">
                내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="내용을 입력하세요"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {saving ? '수정 중...' : '수정하기'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/post/${id}`)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}