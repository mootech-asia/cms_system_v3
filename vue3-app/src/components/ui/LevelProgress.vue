<template>
  <div class="level-progress">
    <div v-if="label" class="level-progress-label">{{ label }}</div>
    <div
      class="level-progress-track"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="`Level progress: ${value}%`"
    >
      <div class="level-progress-fill" :style="{ width: `${value}%` }"></div>
    </div>
    <div class="level-progress-meta">
      <span>
        Current: <strong>{{ current }}</strong>
        <i class="level-tier-dot current" aria-hidden="true"></i>
      </span>
      <span class="level-progress-value">{{ value }}%</span>
      <span class="level-progress-next">
        Next: <strong>{{ next }}</strong>
        <i class="level-tier-dot next" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  percent: { type: Number, default: 62 },
  label:   { type: String, default: '' },
  current: { type: String, default: 'Unranked' },
  next:    { type: String, default: 'Bronze' },
});

const value = computed(() => Math.min(100, Math.max(0, Math.round(props.percent))));
</script>
