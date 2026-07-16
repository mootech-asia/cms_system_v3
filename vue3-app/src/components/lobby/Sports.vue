<template>
  <section class="lobby-section" data-screen-label="Sports">
    <div class="section-head">
      <h2 class="section-title">Sportsbook<span class="count">{{ matches.length }}</span></h2>
    </div>

    <div
      class="cv-tabs"
      style="display:flex;flex-wrap:nowrap;overflow-x:auto;white-space:nowrap;scrollbar-width:none"
    >
      <button
        v-for="tb in tabs" :key="tb"
        class="cv-tab"
        style="flex:0 0 auto"
        :class="{ active: filter === tb }"
        @click="setFilter(tb)"
      >{{ tb }}</button>
    </div>

    <div class="sports-grid">
      <article
        v-for="m in visibleMatches" :key="m.id"
        class="sport-card"
        :class="{ live: m.live }"
      >
        <div class="sport-head">
          <span class="sport-league">{{ m.league }}</span>
          <span v-if="m.live" class="sport-live"><span class="dot"></span>LIVE {{ m.min }}</span>
          <span v-else class="sport-time">{{ m.start }}</span>
        </div>

        <div class="sport-teams">
          <div class="sport-team">
            <div class="sport-team-logo" style="--logo-hue:200">{{ m.home.slice(0, 2).toUpperCase() }}</div>
            <span>{{ m.home }}</span>
          </div>
          <div v-if="m.live" class="sport-score">{{ m.score }}</div>
          <div class="sport-team">
            <span>{{ m.away }}</span>
            <div class="sport-team-logo" style="--logo-hue:340">{{ m.away.slice(0, 2).toUpperCase() }}</div>
          </div>
        </div>

        <div class="sport-odds">
          <button class="sport-odd"><span>1</span><strong>{{ m.odds[0] }}</strong></button>
          <button class="sport-odd" :disabled="m.odds[1] === '—'"><span>X</span><strong>{{ m.odds[1] }}</strong></button>
          <button class="sport-odd"><span>2</span><strong>{{ m.odds[2] }}</strong></button>
        </div>
      </article>
    </div>

    <div v-if="canLoadMore" class="cv-foot">
      <button class="cv-view-all" @click="loadMore">Load More</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PROVIDERS } from '@/data/index.js';

const baseMatches = [
  { league: 'Champions League', home: 'Real Madrid', away: 'Bayern',   start: 'Today · 20:00',    odds: ['1.85','3.40','4.20'], score: '1 - 0' },
  { league: 'Premier League',   home: 'Arsenal',     away: 'Man City', start: 'Today · 22:30',    odds: ['2.95','3.20','2.40'] },
  { league: 'NBA',              home: 'Lakers',      away: 'Celtics',  start: 'Tomorrow · 03:30', odds: ['1.65','—',  '2.25'] },
  { league: 'La Liga',          home: 'Barcelona',   away: 'Atletico', start: 'Sat · 21:00',      odds: ['1.55','4.10','5.60'] },
  { league: 'Serie A',          home: 'Inter',       away: 'Juventus', start: 'Sun · 19:45',      odds: ['2.10','3.30','3.60'] },
  { league: 'NFL',              home: 'Chiefs',      away: 'Eagles',   start: 'Sun · 23:00',      odds: ['1.90','—',  '1.95'] },
];

const allMatches = PROVIDERS.flatMap((provider, providerIndex) => {
  return [0, 1].map((variant) => {
    const template = baseMatches[(providerIndex + variant * 3) % baseMatches.length];
    const live = variant === 0 && providerIndex % 5 === 0;
    return {
      ...template,
      id: `${provider}-${variant}`,
      provider,
      live,
      min: `${34 + providerIndex}'`,
      score: template.score || `${providerIndex % 3} - ${(providerIndex + 1) % 3}`,
      odds: template.odds.map((odd, oddIndex) => {
        if (odd === '—') return odd;
        return (+odd + providerIndex * 0.03 + variant * 0.08 + oddIndex * 0.02).toFixed(2);
      }),
    };
  });
});

const tabs         = ['All', ...PROVIDERS];
const filter       = ref('All');
const visibleCount = ref(4);

const matches = computed(() =>
  filter.value === 'All' ? allMatches : allMatches.filter(m => m.provider === filter.value)
);

const visibleMatches = computed(() => matches.value.slice(0, visibleCount.value));
const canLoadMore    = computed(() => visibleMatches.value.length < matches.value.length);

function setFilter(tab) {
  filter.value = tab;
  visibleCount.value = 4;
}

function loadMore() {
  visibleCount.value += 4;
}
</script>
