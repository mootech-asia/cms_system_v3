<template>
  <DesignStudio @navigate="openSite" />
</template>

<script setup>
import DesignStudio from '@/components/design/DesignStudio.vue';

function openSite() {
  window.location.assign(import.meta.env.BASE_URL);
}
</script>
