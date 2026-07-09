<template>
  <section class="lobby-section ap-page" data-screen-label="Change Login Password">
    <button class="ap-back" @click="emit('navigate', 'Security Center')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      Back
    </button>
    <h1 class="ap-h1">Change Login Password</h1>

    <div class="ap-form-card">
      <div class="ap-input-wrap">
        <input class="ap-input" :type="show1 ? 'text' : 'password'" placeholder="Please enter a new password" v-model="pw1" />
        <button class="ap-eye" aria-label="Toggle password" @click="show1 = !show1">
          <svg v-if="show1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 4.6A9.7 9.7 0 0 1 12 4.4c6 0 10 7.6 10 7.6a17 17 0 0 1-3.2 4M6.6 6.6A16.8 16.8 0 0 0 2 12s4 7.6 10 7.6a9.6 9.6 0 0 0 3.8-.8" /></svg>
        </button>
      </div>

      <div class="ap-input-wrap">
        <input class="ap-input" :type="show2 ? 'text' : 'password'" placeholder="Comfirm your password" v-model="pw2" />
        <button class="ap-eye" aria-label="Toggle password" @click="show2 = !show2">
          <svg v-if="show2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 4.6A9.7 9.7 0 0 1 12 4.4c6 0 10 7.6 10 7.6a17 17 0 0 1-3.2 4M6.6 6.6A16.8 16.8 0 0 0 2 12s4 7.6 10 7.6a9.6 9.6 0 0 0 3.8-.8" /></svg>
        </button>
      </div>

      <p class="ap-cp-hint">★Length must be 5-16 characters.</p>

      <button class="ap-btn-wide ap-grad" :disabled="!lengthOk" @click="submit">Submit</button>
      <button class="ap-btn-wide outline" @click="emit('navigate', 'Security Center')">Back</button>
    </div>

    <!-- Success dialog -->
    <div v-if="dialog === 'success'" class="modal-bg" @click="dialog = null">
      <div class="pi-success" @click.stop>
        <div class="pi-success-check">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
        </div>
        <div class="pi-success-title">Success!</div>
        <div class="pi-success-sub">Profile updated successfully.</div>
        <button class="ap-btn-wide ap-grad" @click="dialog = null">Got It</button>
      </div>
    </div>

    <!-- Warning dialog -->
    <div v-if="dialog === 'warn'" class="modal-bg" @click="dialog = null">
      <div class="pi-success" @click.stop>
        <div class="pi-success-check warn">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 2.5 20h19L12 4Z" /><path d="M12 10v4.5M12 17.5h.01" /></svg>
        </div>
        <div class="pi-success-title">Warning</div>
        <div class="pi-success-sub">invalid</div>
        <button class="ap-btn-wide ap-grad" @click="dialog = null">Got It</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['navigate']);

const pw1    = ref('');
const pw2    = ref('');
const show1  = ref(false);
const show2  = ref(false);
const dialog = ref(null);

const lengthOk = computed(() =>
  pw1.value.length >= 5 && pw1.value.length <= 16 &&
  pw2.value.length >= 5 && pw2.value.length <= 16
);

function submit() {
  if (!lengthOk.value || pw1.value !== pw2.value) { dialog.value = 'warn'; return; }
  dialog.value = 'success';
  pw1.value = '';
  pw2.value = '';
}
</script>
