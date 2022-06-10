import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import screen from '@/screen'
import nprogress from '@/nprogress'

createApp(App).use(screen).use(router).use(nprogress).mount('body')
