<template>
  <section class="lobby-section ap-page" data-screen-label="Withdrawal">
    <button class="ap-back" @click="emit('navigate', 'Account Overview')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      Back
    </button>
    <h1 class="ap-h1">Withdrawal</h1>

    <div class="ap-form-card">
      <!-- Bound: credit-card style account with carousel -->
      <template v-if="bound">
        <div class="ap-wd-acchead">
          <button class="ap-wd-arrow" aria-label="Previous card" @click="bankIdx = (bankIdx - 1 + banks.length) % banks.length">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
          </button>
          <span>My Bank Accounts <b>{{ bankIdx + 1 }} / {{ banks.length }}</b></span>
          <button class="ap-wd-arrow" aria-label="Next card" @click="bankIdx = (bankIdx + 1) % banks.length">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 6 6 6-6 6" /></svg>
          </button>
        </div>
        <div class="ap-wd-card">
          <div class="ap-wd-card-name">Bank Name</div>
          <div class="ap-wd-card-acc">
            <span class="ap-wd-card-acc-label">Account number</span>
            <span class="ap-wd-card-acc-num">✳✳✳✳{{ cur.last4 }}</span>
          </div>
          <div class="ap-wd-card-holder">{{ cur.holder }}</div>
          <div class="ap-wd-card-bind">
            <span class="muted">Bind Date</span>
            <span>{{ cur.bind }}</span>
          </div>
        </div>
      </template>

      <!-- Unbound: empty state -->
      <template v-else>
        <h3 class="ap-wd-title">My Bank Accounts</h3>
        <div class="ap-empty-bank">
          <div class="ap-empty-art" aria-hidden="true"></div>
          <div class="ap-empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round">
              <rect x="2.5" y="6.5" width="15" height="10" rx="2" stroke-dasharray="3 2.5" /><path d="M2.5 10h15" stroke-dasharray="3 2.5" />
              <circle cx="18.5" cy="15.5" r="4.2" fill="var(--bg-card)" /><path d="M18.5 13.6v3.8M16.6 15.5h3.8" stroke-linecap="round" />
            </svg>
          </div>
          <div class="ap-empty-text">Empty Bank Account</div>
          <button class="ap-yellow-btn" @click="emit('navigate', 'Banking Details')">Add Account</button>
        </div>
      </template>

      <button class="ap-refresh-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 11a8 8 0 1 1-2.34-5.66L20 8" /><path d="M20 3v5h-5" />
        </svg>
        Refresh
      </button>

      <div class="ap-wallet">
        <div class="ap-wallet-label">Main Wallet</div>
        <div class="ap-wallet-amt">₩ 0.00</div>
        <div v-if="bound" class="ap-rollover">
          <span><span class="muted">*Rollover Achieved</span> amount: ₩0.00</span>
          <span><span class="muted">Target amount:</span> ₩0.00</span>
        </div>
        <div v-else class="ap-wallet-rem">
          *Remaining Turnover Amount: <strong>₩16,517.41</strong>
        </div>
      </div>

      <div class="ap-pill">Withdrawal Amount &amp; Password</div>
      <input class="ap-input" placeholder="₩ 10,000 ~ ₩ 9,000,000" v-model="amount" />
      <div class="ap-input-wrap">
        <input class="ap-input" :type="showPw ? 'text' : 'password'" v-model="pw" />
        <button class="ap-eye" aria-label="Toggle password" @click="showPw = !showPw">
          <svg v-if="showPw" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 4.6A9.7 9.7 0 0 1 12 4.4c6 0 10 7.6 10 7.6a17 17 0 0 1-3.2 4M6.6 6.6A16.8 16.8 0 0 0 2 12s4 7.6 10 7.6a9.6 9.6 0 0 0 3.8-.8" /></svg>
        </button>
      </div>

      <div class="ap-rollover">
        <span><span class="muted">*Rollover Achieved</span> amount: ₩0.00</span>
        <span><span class="muted">Target amount:</span> ₩0.00</span>
      </div>

      <button class="ap-btn-wide ap-grad" :disabled="!bound" @click="submit">Submit</button>
      <button class="ap-btn-wide outline" @click="emit('navigate', 'Account Overview')">Back</button>
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

const props = defineProps({
  user: { type: Object, default: null },
});
const emit = defineEmits(['navigate']);

const banks = [
  { last4: '5567', holder: 'M*******', bind: '2025-09-05' },
  { last4: '1234', holder: 'M*******', bind: '2025-08-11' },
  { last4: '9012', holder: 'M*******', bind: '2025-07-02' },
  { last4: '3456', holder: 'M*******', bind: '2025-06-18' },
  { last4: '7890', holder: 'M*******', bind: '2025-05-24' },
];

const bound   = computed(() => !!props.user);
const bankIdx = ref(0);
const amount  = ref('');
const pw      = ref('');
const showPw  = ref(false);
const dialog  = ref(null);

const cur = computed(() => banks[bankIdx.value]);

function submit() {
  const n = Number(String(amount.value).replace(/[^\d]/g, ''));
  if (!n || n < 10000 || n > 9000000 || !pw.value) { dialog.value = 'warn'; return; }
  dialog.value = 'success';
}
</script>
