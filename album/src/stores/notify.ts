/**
 * Store para uso del servicio notificaciones a través de Modal
 * según el resultado de las acciones por el usuario.
 * 
 */
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { Modal } from 'bootstrap';

export const useNotifyStore = defineStore('notify', () => {
  const notificationsModal = ref<any | null>(null);

  const type = ref<string | null>(null)
  const message = ref<string | null>(null)
  const subMessage = ref<string | null>(null)
  const materialIcon = ref<string | null>(null)
  const borderColor = ref<string | null>(null)
  const textColor = ref<string | null>(null)

  /**
  * Selecciona icono a mostrar según el tipo de notificación.
  */
  const setIcon = (() => {
    switch (type.value?.toLowerCase()) {
      case 'success':
        materialIcon.value = 'check_circle_outline';
        break;
      case 'warning':
        materialIcon.value = 'warning';
        break;
      case 'danger':
        materialIcon.value = 'dangerous';
        break;
      case 'info':
        materialIcon.value = 'info';
        break;
      default:
        materialIcon.value = '';
    }
  })

  /**
  * Selecciona el color de borde del modal según el tipo de notificación.
  */
  const setBorderColor = (() => {
    switch (type.value?.toLowerCase()) {
      case 'success':
        borderColor.value = 'border-success';
        break;
      case 'warning':
        borderColor.value = 'border-warning';
        break;
      case 'danger':
        borderColor.value = 'border-danger';
        break;
      case 'info':
        borderColor.value = 'border-primary';
        break;
      default:
        borderColor.value = '';
    }
  })

  /**
  * Selecciona el color del icono a mostrar según el tipo de notificación.
  */
  const setTextColor = (() => {
    switch (type.value?.toLowerCase()) {
      case 'success':
        textColor.value = 'text-success';
        break;
      case 'warning':
        textColor.value = 'text-warning';
        break;
      case 'danger':
        textColor.value = 'text-danger';
        break;
      case 'info':
        textColor.value = 'text-primary';
        break;
      default:
        textColor.value = 'text-muted';
    }
  })

  /**
  * Emite el evento @show del Modal de notificaciones despues de setear las props
  * para dicho modal.
  * @prop materialIcon
  * @prop borderColor
  * @prop textColor
  * @prop message
  * @prop subMessage
  */
  const show = ((typeNotify:string, messageNotify:string, subMessageNotify:string|null = null) => {
    notificationsModal.value = new Modal('#notificationsModal');
    type.value = typeNotify
    message.value = messageNotify
    subMessage.value = subMessageNotify
    setIcon()
    setBorderColor()
    setTextColor()
    if (notificationsModal) notificationsModal.value.show();
  })

  return { show, type, message, subMessage, materialIcon, borderColor, textColor }
})
