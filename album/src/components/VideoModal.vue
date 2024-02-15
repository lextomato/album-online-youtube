<script setup lang="ts">
import { useNotifyStore } from '@/stores/notify';
import { YoutubeIframe } from '@vue-youtube/component';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  data: any
}>()
const notify = useNotifyStore()

const videoModalRef = ref<any | null>(null);
const showVideo = ref(false);
const youtubeVideo = ref();
const originDomain = ref(import.meta.env.VITE_ORIGIN_DOMAIN);

/**
 * Espera a que este listo el video de youtube para autoreproducirlo.
 */
const onReady = ((event: any) => {
  youtubeVideo.value?.togglePlay()
})

/**
 * Evento en el que intenta renderizar un video de la db y ya no se encuentra
 * disponible en Youtube.
 */
const onError = ((event: any) => {
  notify.show('warning', 'El Video ya no existe')
})

onMounted( async () => {
  const videoModalElement = videoModalRef.value;
  if (videoModalElement) {
    videoModalElement.addEventListener('hide.bs.modal', function () {
      showVideo.value = false;
    });
  }
});
</script>

<template>
  <!-- Modal -->
  <div class="modal fade" id="videoModal" ref="videoModalRef" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 rounded-3">
        <div class="modal-header border-0">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-0 px-4">
          <div class="row align-items-center">
            <div :class="showVideo? 'col-12':'col-6'">
              <div v-if="data?.videoId && showVideo">
                <youtube-iframe ref="youtubeVideo" class="w-100" height="300" :video-id="data?.videoId" :player-vars="{origin: originDomain}" @ready="onReady" @error="onError" :cookie="false" />
              </div>
              <div v-show="!showVideo" role="button" @click="showVideo = true" class="card rounded-0 text-bg-dark">
                <img :src="data?.img" class="card-img" alt="...">
                <div class="card-img-overlay card-play text-end d-flex flex-column">
                  <span class="button-middle bg-red w-fit rounded-circle text-light mx-auto mt-auto">
                    <span class="material-icons icon-play">play_arrow</span>
                  </span>
                  <span class="bg-black-op w-fit rounded text-light ms-auto mt-auto px-1">{{ data?.duration }}</span>
                </div>
              </div>
            </div>
            <div :class="showVideo? 'col-12':'col-6'">
              <h6>{{ data?.title }}</h6>
              <p class="scrollable-description w-100" v-html="data?.description"></p>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollable-description {
  max-height: 15rem;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  font-size: .875rem;
}
.card-play {
  background-color: rgba(32, 32, 32, 0.5);
  transition: background-color 0.3s ease;
}
.card-play:hover {
  background-color: rgba(32, 32, 32, 0.75);
}
.card-play:hover .button-middle {
  transform: translateY(-5px);
  box-shadow: 0 6px 8px rgba(99, 99, 99, 0.5);
}
.icon-play {
  font-size: 3.2rem;
}
</style>
