/**
 * Store para uso de la API DATA de Youtube.
 * 
 */
import { defineStore } from 'pinia'
import axios from 'axios';

export const useYoutubeApiStore = defineStore('youtubeApi', () => {

  /**
   * Obtiene información del video por su videoId.
   * @Get
   */
  const fetchVideoInfo = (async (videoUrl: string) => {
    const videoId = extractVideoID(videoUrl);
    if (videoId) {
      try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
          params: {
            part: 'snippet,contentDetails',
            id: videoId,
            key: import.meta.env.VITE_API_KEY
          }
        });
        if (response?.data?.items?.length > 0) {
          const snippet = response.data.items[0].snippet
          const duration = response.data.items[0].contentDetails.duration
          const info = {
            videoId: videoId,
            title: snippet.title,
            description: convertUrlsToLinks(snippet.description),
            img: snippet.thumbnails.default.url,
            duration: convertDuration(duration)
          }
          return info;
        } else return { error: 'Video no está disponible o ya no existe' }
      } catch (error) {
        console.error('Error obteniendo la información del video:', error);
      }
    } else return undefined;
  })

  /**
   * Util: da formato a la duración obtenida desde Youtube a formato HH:MM:SS.
   */
  const convertDuration = (duration: string): string => {
    const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    let hours = 0, minutes = 0, seconds = 0;

    if (matches) {
        hours = matches[1] ? parseInt(matches[1].replace('H', '')) : 0;
        minutes = matches[2] ? parseInt(matches[2].replace('M', '')) : 0;
        seconds = matches[3] ? parseInt(matches[3].replace('S', '')) : 0;
    }

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return (hours > 0 ? `${formattedHours}:` : '') + `${formattedMinutes}:${formattedSeconds}`;
  };

  /**
   * Util: regExp para extraer el videoId de las url de los video de Youtube.
   */
  const extractVideoID = ((url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  })

  /**
   * Util: regExp para convertir las url contenidas en un String a un elemento
   * <a href=""></a>.
   */
  const convertUrlsToLinks = ((text: string) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    return text.replace(urlRegex, function(url) {
      return `<a href="${url}" target="_blank">${url}</a>`;
    });
  })

  return { fetchVideoInfo }
})
