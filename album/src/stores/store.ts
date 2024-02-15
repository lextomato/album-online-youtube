/**
 * Store para almacenar los videos accesible en toda la App de
 * Hacer las solicitudes de añadir y eliminar dichos videos a través de la API.
 * 
 */
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { useBackendApiStore } from './backendApi';
import { useYoutubeApiStore } from './youtubeApi';
import { useNotifyStore } from './notify';

export const useStore = defineStore('store', () => {
  const backendApi = useBackendApiStore()
  const youtubeApi = useYoutubeApiStore()
  const notify = useNotifyStore()

  const videos = ref<any[]>([]);
  const videoUrl = ref(null)

  /**
  * Actualiza los videos obtenidos de la API.
  */
  const getAllVideos = ( async () => {
    const res = await backendApi.getAllVideos();
    if (res.data) videos.value = res.data;
  })

  /**
  * Chequea la existencia del video a través de la API de Youtube y enviarlo al Backend.
  */
  const addVideo = ( async () => {
    if (videoUrl?.value) {
      const payloadVideo: any = await youtubeApi.fetchVideoInfo(videoUrl.value)
      if (payloadVideo?.error) {
        notify.show('danger', payloadVideo.error)
      } else if (payloadVideo) {
        const response = await backendApi.submitVideo(payloadVideo);
        if (response?.data?.status === 'error') notify.show('warning', response.data.message);
        else if (!response) notify.show('danger', 'Error inesperado: no se pudo guardar el video');
        else {
          notify.show('success', '¡Video guardado exitosamente!')
          getAllVideos()
        }
      } else notify.show('warning', 'Enlace incorrecto');
      videoUrl.value = null;
    }
  })

  /**
  * Solcita a la API la eliminación de un video según su videoId
  * y actualiza los videos en la App.
  */
  const deleteVideo = ( async(videoId: string) => {
    if (videoId) {
      const response = await backendApi.deleteVideo(videoId);
      if (response?.data?.status === 'error') notify.show('danger', response.data.message)
      if (!response) notify.show('danger', 'Error inesperado no se pudo eliminar el video')
      else {
        notify.show('success', response.result)
        getAllVideos()
      }
    const buttonCloseModal = document.getElementById('closeDeleteModal')
    if (buttonCloseModal) buttonCloseModal.click()
    } else notify.show('danger', 'Error por favor recargue la página')
  })

  return { videoUrl, videos, getAllVideos, addVideo, deleteVideo }
})
