/**
 * Store para uso del servicio Backend donde obtiene, guarda y/o
 * elimina los videos seleccionados por el usuario.
 * 
 */
import { defineStore } from 'pinia'
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BACKEND_URL;
const axiosApi = axios.create({
  baseURL: baseUrl,
  headers: {
    'X-Api-Key': import.meta.env.VITE_API_KEY_BACKEND
  }
});

export const useBackendApiStore = defineStore('backendApi', () => {

  /**
  * Obetención de los videos guardados en db.
  * @Get /videos
  */
  const getAllVideos = (async () => {
    try {
      const response = await axiosApi.get('/videos');
      return response.data;
    } catch (error: any) {
      console.error('Error al guardar el video:', error);
      return error.response;
    }
  })

  /**
  * Guarda video en db.
  * @Post /videos @body { video }
  */
  const submitVideo = (async (payload: any) => {
    try {
      const response = await axiosApi.post('/videos', payload);
      return response.data;
    } catch (error: any) {
      console.error('Error al guardar el video:', error);
      return error.response;
    }
  })

  /**
  * Elimina video de db según el videoId.
  * @Delete /videos/:videoId @Param videoId
  */
  const deleteVideo = (async (videoId: string) => {
    try {
      const response = await axiosApi.delete(`/videos/${videoId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error al guardar el video:', error);
      return error.response;
    }
  })

  return { submitVideo, getAllVideos, deleteVideo }
})
