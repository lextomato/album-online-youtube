<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from './stores/store';
import { Modal } from 'bootstrap';
import VideoModal from '@/components/VideoModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import NotificationsModal from '@/components/NotificationsModal.vue';

const store = useStore()

const videoSelected = ref<any | null>(null);
const videoModal = ref<any | null>(null);
const deleteModal = ref<any | null>(null);

onMounted( async () => {
  videoModal.value = new Modal('#videoModal');
  deleteModal.value = new Modal('#deleteModal');
  store.getAllVideos()
});

/**
* Al seleccionar el video pasa su información al modal de vista previa
* y acciona el modal de video.
*/
const setVideo = ((video: any) => {
  videoSelected.value = video;
  if (videoModal) videoModal.value.show();
})

/**
* Acciona el modal para confirmación de eliminación de video.
*/
const openDeleteModal = ((video: any) => {
  videoSelected.value = video;
  if (deleteModal) deleteModal.value.show();
})
</script>

<template>
  <NotificationsModal />
  <VideoModal :data="videoSelected" />
  <DeleteModal :videoId="videoSelected?.videoId" />

  <div class="container-fluid p-5">
    <!-- Search Bar -->
    <div class="row mb-5">
      <div class="col-12 col-md-8 offset-md-2">
        <label for="basic-url" class="form-label fs-4 fw-semibold">Añadir nuevo video</label>
        <div class="input-group">
          <input v-model="store.videoUrl" id="basic-url" type="text" class="form-control" placeholder="Añadir" aria-label="Añadir">
          <button @click="store.addVideo()" :class="store.videoUrl? '':'disabled'" class="btn btn-primary px-5" type="button"><small>Añadir</small></button>
        </div>
      </div>
    </div>

    <!-- Videos Section -->
    <div class="row row-cols-1 row-cols-md-3 g-4 w-75 px-5 mx-auto mt-5">
      <div v-for="video in store.videos" class="col px-4 mb-4">
        <div role="button" @click.prevent="setVideo(video)" class="card rounded-0 text-bg-dark">
          <img :src="video.img" class="card-img" alt="...">
          <div class="card-img-overlay text-end d-flex flex-column">
            <span @click.stop="openDeleteModal(video)" type="button" class="button-middle button-middle-sm text-light ms-auto">
              <span class="material-icons fs-5 fw-semibold">clear</span>
            </span>
            <span class="bg-black-op w-fit rounded text-light ms-auto mt-auto px-1">{{ video.duration }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.w-fit {
  width: fit-content;
}
.button-middle {
  color: rgb(163, 163, 163) !important;
  background-color: black;
}
.button-middle:hover {
  transform: translateY(-3px);
  box-shadow: 0 2px 4px 2px rgba(255, 255, 255, 0.6);
  color: white !important;
}
</style>
