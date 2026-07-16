<template>
  <article class="gcard" style="cursor: default">
    <div class="gcard-art" :style="{ '--gcard-bg': game.bg }">
      <span v-if="game.tag"
        class="gcard-tag"
        :class="{ hot: game.tag === 'Hot', new: game.tag === 'New' }"
      >{{ game.tag }}</span>

      <button v-if="showFav"
        class="gcard-fav"
        :class="{ on: isFav }"
        :aria-label="isFav ? 'Remove favorite' : 'Add favorite'"
        @click.stop="emit('fav', game.id)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24"
          :fill="isFav ? 'currentColor' : 'none'"
          stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
          <path d="M12 20s-7-4.6-9.3-9C1.2 8 2.6 4.5 6 4.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.4 0 4.8 3.5 3.3 6.5C19 15.4 12 20 12 20Z"/>
        </svg>
      </button>

      <span class="ph-label">{{ game.title.toUpperCase() }} ART</span>

      <div v-if="game.category === 'live'" class="gcard-players">
        <span class="live-dot"></span>{{ game.players?.toLocaleString() }} playing
      </div>
    </div>

    <div class="gcard-meta">
      <div class="gcard-title">{{ game.title }}</div>
      <div class="gcard-provider">{{ game.provider }}</div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  game:    { type: Object,  required: true },
  isFav:   { type: Boolean, default: false },
  showFav: { type: Boolean, default: false },
});
const emit = defineEmits(['fav']);
</script>
