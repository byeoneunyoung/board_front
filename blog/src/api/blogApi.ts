import axios from 'axios';
import type { PostDto } from '../types/post';

const API_URL = 'http://localhost:3000/blog';

export const blogApi = {
  // 모든 게시글 가져오기
  getAllPosts: async (): Promise<PostDto[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // 게시글 하나 가져오기
  getPost: async (id: string): Promise<PostDto> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // 게시글 작성
  createPost: async (postDto: Omit<PostDto, 'id' | 'createdDt'>): Promise<string> => {
    const response = await axios.post(API_URL, postDto);
    return response.data;
  },

  // 게시글 수정
  updatePost: async (id: string, postDto: Partial<PostDto>): Promise<PostDto> => {
    const response = await axios.put(`${API_URL}/${id}`, postDto);
    return response.data;
  },

  // 게시글 삭제
  deletePost: async (id: string): Promise<string> => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};