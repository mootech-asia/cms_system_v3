<template>
  <section class="lobby-section ap-page" data-screen-label="Edit Nickname">
    <button class="ap-back" @click="emit('navigate', 'Account Overview')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      Back
    </button>
    <h1 class="ap-h1">Edit Nickname</h1>

    <form class="ap-form-card nickname-card" @submit.prevent="submit">
      <div class="nickname-current">
        <span>Current nickname</span>
        <strong>{{ nickname }}</strong>
      </div>

      <label class="nickname-label" for="nickname-input">New nickname</label>
      <div class="pi-field" :class="{ invalid: touched && error }">
        <span class="pi-ico" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></svg>
        </span>
        <input
          id="nickname-input"
          v-model="draft"
          maxlength="20"
          autocomplete="nickname"
          placeholder="Enter a new nickname"
          @blur="touched = true"
        />
      </div>
      <div class="nickname-meta">
        <span>Use 2-20 characters.</span>
        <span>{{ draft.length }}/20</span>
      </div>
      <p v-if="touched && error" class="ap-error">{{ error }}</p>

      <button class="ap-btn-wide ap-grad" type="submit" :disabled="!canSubmit">Save Nickname</button>
      <button class="ap-btn-wide outline" type="button" @click="emit('navigate', 'Account Overview')">Back</button>
    </form>

    <div v-if="saved" class="modal-bg" @click="finish">
      <div class="pi-success" @click.stop>
        <div class="pi-success-check">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
        </div>
        <div class="pi-success-title">Nickname Updated</div>
        <div class="pi-success-sub">Your nickname is now {{ cleanNickname }}.</div>
        <button class="ap-btn-wide ap-grad" @click="finish">Done</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  nickname: { type: String, default: 'Meow' },
});
const emit = defineEmits(['navigate', 'save']);

const draft = ref(props.nickname);
const touched = ref(false);
const saved = ref(false);

const cleanNickname = computed(() => draft.value.trim());
const error = computed(() => {
  if (cleanNickname.value.length < 2) return 'Nickname must contain at least 2 characters.';
  if (cleanNickname.value.length > 20) return 'Nickname cannot exceed 20 characters.';
  return '';
});
const canSubmit = computed(() => !error.value && cleanNickname.value !== props.nickname);

watch(() => props.nickname, (value) => {
  if (!saved.value) draft.value = value;
});

function submit() {
  touched.value = true;
  if (!canSubmit.value) return;
  emit('save', cleanNickname.value);
  saved.value = true;
}

function finish() {
  saved.value = false;
  emit('navigate', 'Account Overview');
}
</script>
