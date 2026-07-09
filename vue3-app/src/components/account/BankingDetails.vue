<template>
  <section class="lobby-section ap-page" data-screen-label="Banking Details">
    <button class="ap-back" @click="emit('navigate', 'Account Overview')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      Back
    </button>
    <h1 class="ap-h1">Banking Details</h1>

    <!-- Add / edit form -->
    <div v-if="view === 'form'" class="ap-form-card">
      <div class="ap-pill">Bank Information</div>

      <div class="ap-bd-select" :class="{ open: bankOpen }">
        <button class="ap-input ap-bd-trigger" @click="bankOpen = !bankOpen">
          <span :class="{ placeholder: !bank }">{{ bank || 'Choose a Bank' }}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </button>
        <div v-if="bankOpen" class="ap-bd-menu">
          <div class="ap-bd-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
            <input v-model="bankQuery" placeholder="search a bank" />
          </div>
          <button v-for="b in filteredBanks" :key="b" class="ap-bd-option" @click="pickBank(b)">{{ b }}</button>
          <div v-if="!filteredBanks.length" class="ap-bd-empty">No matching bank</div>
        </div>
      </div>

      <input class="ap-input ap-bd-locked" disabled />

      <div class="ap-input-wrap">
        <input class="ap-input" :type="showCard ? 'text' : 'password'" placeholder="Enter your card number" v-model="card" />
        <button class="ap-eye" aria-label="Toggle card number" @click="showCard = !showCard">
          <svg v-if="showCard" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 4.6A9.7 9.7 0 0 1 12 4.4c6 0 10 7.6 10 7.6a17 17 0 0 1-3.2 4M6.6 6.6A16.8 16.8 0 0 0 2 12s4 7.6 10 7.6a9.6 9.6 0 0 0 3.8-.8" /></svg>
        </button>
      </div>

      <div class="ap-pill">Transaction Password</div>
      <div class="ap-input-wrap">
        <input class="ap-input" :type="showTxPw ? 'text' : 'password'" placeholder="Please  fill in the transaction password" v-model="txPw" />
        <button class="ap-eye" aria-label="Toggle transaction password" @click="showTxPw = !showTxPw">
          <svg v-if="showTxPw" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 4.6A9.7 9.7 0 0 1 12 4.4c6 0 10 7.6 10 7.6a17 17 0 0 1-3.2 4M6.6 6.6A16.8 16.8 0 0 0 2 12s4 7.6 10 7.6a9.6 9.6 0 0 0 3.8-.8" /></svg>
        </button>
      </div>

      <button class="ap-btn-wide ap-grad ap-bd-submit" @click="submit">Submit</button>
      <button class="ap-btn-wide outline" @click="cancelForm">Back</button>
    </div>

    <!-- Empty state -->
    <template v-else-if="!accounts.length">
      <div class="ap-bd-empty-card">
        <div class="ap-bd-empty-icon">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round">
            <rect x="2.5" y="6.5" width="15" height="10" rx="2" stroke-dasharray="3 2.5" />
            <path d="M2.5 10h15" stroke-dasharray="3 2.5" />
            <circle cx="18.5" cy="15.5" r="4.2" fill="var(--bg-card)" />
            <path d="M18.5 13.6v3.8M16.6 15.5h3.8" stroke-linecap="round" />
          </svg>
        </div>
        <div class="ap-bd-empty-title">Empty Bank Account</div>
        <button class="ap-yellow-btn" @click="startAdd">Add Account</button>
      </div>
    </template>

    <!-- Account list -->
    <template v-else>
      <div class="ap-bd-list">
        <div v-for="(a, i) in accounts" :key="i" class="ap-bd-account">
          <div class="ap-bd-account-top">
            <svg class="ap-bd-check" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#1eb865" /><path d="m7.5 12.4 3 3 6-6.4" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" /></svg>
            <span class="ap-bd-account-title">Active Bank Account</span>
          </div>
          <div class="ap-bd-account-bank">{{ a.bank }} <span class="muted">Bank</span></div>
          <div class="ap-bd-account-num">{{ a.num }}</div>
        </div>
      </div>
    </template>

    <!-- Floating add button -->
    <button v-if="view !== 'form'" class="ap-fab" aria-label="Add bank account" @click="startAdd">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
    </button>

    <!-- Confirmation dialog -->
    <div v-if="dialog === 'confirm'" class="modal-bg" @click="dialog = null">
      <div class="pi-success" @click.stop>
        <div class="pi-success-check ask">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .8-1 1.7M12 17h.01" /></svg>
        </div>
        <div class="pi-success-title">Confirmation</div>
        <div class="pi-success-sub">{{ card }}?</div>
        <button class="ap-btn-wide ap-grad" @click="confirmSubmit">Yes</button>
        <button class="ap-btn-wide ghost" @click="dialog = null">No</button>
      </div>
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

const BANKS = [
  '산림조합중앙회', 'Bank of America', 'KB Bank', 'Shinhan Bank',
  'Woori Bank', 'Hana Bank', 'NH Bank', '111', '222', '333',
];

const accounts = ref([
  { bank: '산림조합중앙회', num: '*******7987' },
  { bank: '산림조합중앙회', num: '*******7987' },
  { bank: '산림조합중앙회', num: '*******7987' },
]);

const view      = ref('list');
const bankOpen  = ref(false);
const bankQuery = ref('');
const bank      = ref('');
const card      = ref('');
const txPw      = ref('');
const showCard  = ref(false);
const showTxPw  = ref(false);
const dialog    = ref(null);

const filteredBanks = computed(() =>
  BANKS.filter(b => b.toLowerCase().includes(bankQuery.value.toLowerCase()))
);

function startAdd() {
  view.value = 'form';
  bank.value = '';
  card.value = '';
  txPw.value = '';
  bankQuery.value = '';
  bankOpen.value = false;
}

function cancelForm() {
  view.value = 'list';
  bankOpen.value = false;
}

function pickBank(b) {
  bank.value = b;
  bankOpen.value = false;
  bankQuery.value = '';
}

function submit() {
  if (!bank.value || !card.value || !txPw.value) { dialog.value = 'warn'; return; }
  dialog.value = 'confirm';
}

function confirmSubmit() {
  const last4 = card.value.replace(/\D/g, '').slice(-4) || card.value.slice(-4);
  accounts.value.push({ bank: bank.value, num: '*******' + last4 });
  dialog.value = 'success';
  view.value = 'list';
}
</script>
