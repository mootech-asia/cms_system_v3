<template>
  <section class="lobby-section" :data-screen-label="title">
    <div class="section-head">
      <h2 class="section-title">
        <Icon v-if="icon" :name="icon" :size="18" />
        {{ title }}
        <span class="count">{{ filtered.length }}</span>
      </h2>
    </div>

    <div
      v-if="showFilterTabs"
      class="cv-tabs"
    >
      <button
        v-for="tb in tabs" :key="tb"
        class="cv-tab"
        :class="{ active: filter === tb }"
        @click="setFilter(tb)"
      >
        <svg v-if="tb === 'Favorites'" class="cv-heart" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 6l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.3 1-1a5.5 5.5 0 0 0 0-7.8Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ tb }}
        <span v-if="tb === 'Favorites' && favs.size > 0" class="cv-tab-count">{{ favs.size }}</span>
      </button>
    </div>

    <div v-if="shown.length === 0" class="cv-empty">
      {{ emptyText }}
    </div>
    <div v-else class="grid">
      <GameCard
        v-for="g in shown" :key="g.id"
        :game="g"
        :is-fav="favs.has(g.id)"
        :show-fav="showFavorites"
        @open="emit('open', $event)"
        @fav="toggle"
      />
    </div>

    <div v-if="enableLoadMore && canLoadMore" class="cv-foot">
      <button class="cv-view-all" @click="loadMore">
        Load More
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useFavorites } from '@/composables/useFavorites.js';
import { PROVIDERS } from '@/data/index.js';
import Icon     from '@/components/ui/Icon.vue';
import GameCard from '@/components/game/GameCard.vue';

const props = defineProps({
  title:            { type: String, required: true },
  icon:             { type: String, default: null },
  games:            { type: Array,  default: () => [] },
  enableLoadMore:   { type: Boolean, default: false },
  pageSize:         { type: Number,  default: 10 },
  showFilterTabs:   { type: Boolean, default: true },
  showProviderTabs: { type: Boolean, default: true },
  showFavorites:    { type: Boolean, default: true },
});
const emit = defineEmits(['open']);

const { favs, toggle } = useFavorites();

const filter       = ref('All');
const visibleCount = ref(props.pageSize);
const tabs = computed(() => {
  const favorites = props.showFavorites ? ['Favorites'] : [];
  return props.showProviderTabs ? ['All', ...favorites, ...PROVIDERS] : ['All', ...favorites];
});

const filtered = computed(() => {
  if (filter.value === 'Favorites') return props.games.filter(g => favs.value.has(g.id));
  if (props.showProviderTabs && filter.value !== 'All') return props.games.filter(g => g.provider === filter.value);
  return props.games;
});

const shown = computed(() =>
  props.enableLoadMore ? filtered.value.slice(0, visibleCount.value) : filtered.value
);

const canLoadMore = computed(() => shown.value.length < filtered.value.length);

const emptyText = computed(() => {
  if (filter.value === 'Favorites') return 'No favorites yet - tap the heart on any game to save it here.';
  if (props.showProviderTabs && filter.value !== 'All') return `No games from ${filter.value} yet.`;
  return 'No games to show.';
});

function setFilter(tab) {
  filter.value = tab;
  visibleCount.value = props.pageSize;
}

function loadMore() {
  visibleCount.value += props.pageSize;
}

watch(
  () => [props.title, props.games, props.showFilterTabs, props.showProviderTabs],
  () => {
    filter.value = 'All';
    visibleCount.value = props.pageSize;
  }
);
</script>
