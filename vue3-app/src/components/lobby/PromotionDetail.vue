<template>
  <section class="lobby-section ap-page promotion-detail" data-screen-label="Promotion Details">
    <button class="ap-back" type="button" @click="emit('back')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m14 6-6 6 6 6" />
      </svg>
      Back
    </button>

    <header class="pd-header">
      <span class="promo-card-tag">{{ promotion.tag }}</span>
      <h1 class="ap-h1">{{ promotion.title }}</h1>
      <p>{{ promotion.sub }}</p>
    </header>

    <div class="pd-artwork">
      <img :src="promotion.image" :alt="`${promotion.title} campaign artwork`" />
    </div>

    <dl class="pd-facts">
      <div>
        <dt>Reward</dt>
        <dd>{{ promotion.reward }}</dd>
      </div>
      <div>
        <dt>Eligibility</dt>
        <dd>{{ promotion.eligibility }}</dd>
      </div>
      <div>
        <dt>Availability</dt>
        <dd>{{ promotion.validity }}</dd>
      </div>
    </dl>

    <div class="pd-layout">
      <main class="pd-content">
        <section>
          <h2 class="ap-section-h"><span class="ap-mark"></span>Offer details</h2>
          <p>{{ promotion.description }}</p>
          <ul class="pd-list">
            <li v-for="item in promotion.highlights" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section>
          <h2 class="ap-section-h"><span class="ap-mark"></span>How to claim</h2>
          <ol class="pd-steps">
            <li v-for="(step, index) in promotion.steps" :key="step">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <p>{{ step }}</p>
            </li>
          </ol>
        </section>

        <section>
          <h2 class="ap-section-h"><span class="ap-mark"></span>Terms &amp; conditions</h2>
          <ul class="pd-list muted">
            <li v-for="term in promotion.terms" :key="term">{{ term }}</li>
          </ul>
        </section>
      </main>

      <aside class="pd-action" aria-label="Promotion action">
        <span>{{ promotion.tag }}</span>
        <strong>{{ promotion.reward }}</strong>
        <p>Continue to your account to review eligibility and complete the next step.</p>
        <button class="ui-button ui-button--primary" type="button" @click="emit('navigate', promotion.actionTarget)">
          {{ promotion.actionLabel }}
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </aside>
    </div>
  </section>
</template>

<script setup>
defineProps({
  promotion: { type: Object, required: true },
});

const emit = defineEmits(['back', 'navigate']);
</script>
