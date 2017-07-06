import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tasks from './modules/tasks'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    tasks
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
