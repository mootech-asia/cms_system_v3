<template>
  <footer class="footer footer-min">
    <div class="container">
      <button
        class="footer-min-logo"
        type="button"
        aria-label="Back to top"
        title="Back to top"
        @click="emit('back-to-top')"
      >
        <img src="/assets/logo.png" alt="100%" />
      </button>
      <p class="footer-min-notice">
        Gambling can be addictive, please play responsibly. For information on support measures, please visit our Responsible Gambling Help page.<br />
        By accessing, continuing to use or navigating throughout this site you accept that we will use certain browser cookies to improve your customer experience with us.
      </p>
      <p class="footer-min-copy">win100% © All rights reserved and protected by law</p>
    </div>
  </footer>
</template>

<script setup>
const emit = defineEmits(['back-to-top']);
</script>
