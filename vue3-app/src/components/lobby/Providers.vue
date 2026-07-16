<template>
  <section class="lobby-section" :class="{ 'is-collapsed': collapsed }" data-screen-label="Providers">
    <div class="section-head">
      <div class="section-title-group">
        <h2 class="section-title">Providers<span class="count">{{ PROVIDERS.length }}</span></h2>
        <button
          class="section-collapse"
          :class="{ active: collapsed }"
          :aria-label="collapsed ? 'Expand providers' : 'Collapse providers'"
          :aria-expanded="!collapsed"
          @click="collapsed = !collapsed"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </button>
      </div>
    </div>
    <div v-show="!collapsed" class="providers-marquee">
      <div class="providers-track">
        <div
          v-for="copy in 2"
          :key="copy"
          class="providers-group"
          :aria-hidden="copy === 2"
        >
          <a
            v-for="p in PROVIDERS"
            :key="p"
            href="#"
            class="provider provider-logo"
            :tabindex="copy === 2 ? -1 : 0"
            @click.prevent
          >
            <!-- Replace this fallback with an img when provider logos are ready. -->
            <span class="provider-logo-fallback">{{ p }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { PROVIDERS } from '@/data/index.js';

const collapsed = ref(false);
</script>
