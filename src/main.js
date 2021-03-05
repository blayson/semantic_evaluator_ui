import Vue from 'vue'
import App from './App.vue'
import {axiosInstance} from "@/code/http-common";
import {TokenManager} from "./code/token-manager";
import vuetify from "@/plugins/vuetify";
import router from "@/router/router";


Vue.prototype.$http = axiosInstance

export const tokenManager = new TokenManager()
tokenManager.renew()

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
