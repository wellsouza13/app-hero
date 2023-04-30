import { CreateHero } from '@/types/heroes';
import API from '../api/api';

 const getHeroes = async () => {
    try {
        const response = await API.get('Heroes');
        return response.data;
    } catch (error) {
        console.error('Error fetching heroes:', error);
        return null;
    }
};

async function getHeroe(id: number) {
  const { data } = await API.get(`Heroes/${id}`);
  return data;
}

async function createHeroe(heroe: CreateHero) {
    const { data } = await API.post("Heroes", heroe);
    return data;
  }

  async function editHeroe(id: number, heroe: CreateHero) {
    const { data } = await API.put(`Heroes/${id}`, heroe);
    return data;
  }

  async function deleteHeroe(id: number) {
    const { data } = await API.delete(`Heroes/${id}`);
    return data;
  }

  export {
    getHeroes,
    createHeroe,
    editHeroe,
    deleteHeroe,
    getHeroe
  }