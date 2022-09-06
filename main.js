
import Vue from 'vue'
import App from './App'

import DynamicPage from './components/dynamic-page/index.vue'
import DynamicForm from './components/dynamic-form/index.vue'
import DynamicList from './components/dynamic-list/index.vue'
import {globalConfig} from '@/config.js'
import {api} from './common/api.js'


Vue.config.productionTip = false
Vue.prototype.$config = globalConfig
Vue.prototype.$api = api


Vue.component("dynamic-page",DynamicPage)
Vue.component("dynamic-form",DynamicForm)
Vue.component("dynamic-list",DynamicList)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()




