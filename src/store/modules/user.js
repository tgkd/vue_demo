import User from '../../api/user'
import * as types from '../mutation-types'

const user = new User()

// initial state
const state = {
  user: {}
}

// getters
const getters = {
  getUser: (state) => state.user
}

// actions
const actions = {
  async login ({ commit }, userInfo) {
    let response
    try {
      response = await user.login(userInfo)
    } catch (e) {
      response = null
    }
    console.log(response)
    commit(types.LOGIN_USER, response)
  }
}

// mutations
const mutations = {
  [types.LOGIN_USER] (state, { data }) {
    state.user = {...data}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
