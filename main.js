import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$host = 'http://127.0.0.1:3030/';//'https://unidemo.dcloud.net.cn/';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
