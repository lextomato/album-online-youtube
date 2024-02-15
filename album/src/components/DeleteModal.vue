<script setup lang="ts">
import { useStore } from '@/stores/store';

const store = useStore()

const props = defineProps<{
  videoId: string
}>()
</script>

<template>
  <!-- Modal -->
  <div class="modal fade" id="deleteModal" ref="deleteModalRef" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header border-0 pb-0 pe-5 pt-4">
          <button type="button" id="closeDeleteModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-0 px-4 ps-5">
          <h4 class="mb-0">¿Seguro que quieres eliminar este video?</h4>
        </div>
        <div class="modal-footer border-0 pb-4 px-5">
          <button class="btn btn-outline-primary rounded-3 px-5 py-2 me-3"><small class="fw-semibold px-4" data-bs-dismiss="modal" aria-label="Close">Cancelar</small></button>
          <button @click="store.deleteVideo(videoId)" class="btn btn-primary rounded-3 px-5 py-2"><small class="fw-semibold px-4">Eliminar</small></button>
        </div>
      </div>
    </div>
  </div>
</template>
