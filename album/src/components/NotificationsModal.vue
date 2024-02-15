<script setup lang="ts">
import { useNotifyStore } from '@/stores/notify';
const notify = useNotifyStore()
</script>

<template>
  <!-- Modal -->
  <div class="modal fade" id="notificationsModal" ref="notificationsModalRef" tabindex="-1" aria-labelledby="notificationsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div :class="notify.borderColor" class="modal-content border border-2 rounded-4">
        <div class="modal-header border-0 pb-0 pe-5 pt-4">
          <button type="button" ref="closeModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body px-4 ps-5 d-flex flex-column">
          <h1 class="mx-auto">
            <span :class="notify.textColor" class="material-icons fs-big text-success">{{ notify.materialIcon }}</span>
          </h1>
          <h4 class="mx-auto text-muted text-center">{{ notify.message }}</h4>
          <p v-if="notify.subMessage" class="mx-auto text-center">{{ notify.subMessage }}</p>
        </div>
        <div class="modal-footer border-0">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fs-big {
  font-size: 5rem;
}
</style>
