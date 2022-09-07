
import Vue from 'vue'
import App from './App'

// 框架导入
import DynamicPage from './components/dynamic-page/index.vue'
import DynamicForm from './components/dynamic-form/index.vue'
import DynamicList from './components/dynamic-list/index.vue'
import {globalConfig} from '@/config.js'
import {api} from './common/api.js'
import {timeCache,cache, cacheMap, reload, login, getUserProfile, orderStatus, upload} from '@/utils/tools.js'

Vue.config.productionTip = false
Vue.prototype.$cache = cache //可设置过期时间
Vue.prototype.$config = globalConfig
Vue.prototype.$api = api

// 全局组件
Vue.component("dynamic-page",DynamicPage)
Vue.component("dynamic-form",DynamicForm)
Vue.component("dynamic-list",DynamicList)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()




