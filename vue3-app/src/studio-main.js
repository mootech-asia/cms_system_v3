import { createApp } from 'vue';
import StudioApp from './StudioApp.vue';

import './assets/design-system/tokens.css';
import './assets/layout.css';
import './assets/main.css';
import './skins/index.js';
import './assets/design-system/components.css';
import './assets/load-more.css';
import './assets/design-system/variants.css';
import './assets/design-system/design-studio.css';

createApp(StudioApp).mount('#app');
