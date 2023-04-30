import { CreateCategory } from '@/types/category';
import API from '../api/api';

 const getAllCategory = async () => {
    try {
        const response = await API.get('Category');
        return response.data;
    } catch (error) {
        console.error('Error fetching Category:', error);
        return null;
    }
};

async function getCategory(id: number) {
  const { data } = await API.get(`Category/${id}`);
  return data;
}

async function createCategory(Category: CreateCategory) {
    const { data } = await API.post("Category", Category);
    return data;
  }

  async function editCategory(id: number, Category: CreateCategory) {
    const { data } = await API.put(`Category/${id}`, Category);
    return data;
  }

  async function deleteCategory(id: number) {
    const { data } = await API.delete(`Category/${id}`);
    return data;
  }


  export {
    getAllCategory,
    getCategory,
    createCategory,
    editCategory,
    deleteCategory
  }