import Task from '../../api/task'
import * as types from '../mutation-types'
import Vue from 'vue'

const task = new Task()

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allTasks: state => state.all
}

// actions
const actions = {
  async getAllTasks ({ commit }) {
    commit(types.GET_TASKS_LIST, await task.getList())
  },

  async createTask ({ commit }, newTask) {
    const data = {name: newTask.name, done: false, id: Math.floor(Math.random())}
    await commit(types.CREATE_TASK, await task.create(data))
  },

  async removeTask ({ commit }, taskId) {
    await commit(types.REMOVE_TASK, await task.remove(taskId))
  },

  async updateTask ({ commit }, updTask) {
    await commit(types.UPDATE_TASK, await task.update(updTask))
  },

  async removeCompleted ({ commit }) {
    const completedTasks = state.all.filter(task => task.done === true)
    const response = await task.removeCompleted(completedTasks)

    const test = 1

    console.log(test)
    commit(types.REMOVE_COMPLETED_TASKS, response)
  },
  getCompletedOnly ({ commit }) {
    const tasks = state.all.filter(task => task.done === true)
    commit(types.ONLY_COMPLETED_TASKS, tasks)
  },
  getIncompleteOnly ({ commit }) {
    const tasks = state.all.filter(task => task.done !== true)
    commit(types.ONLY_INCOMPLETE_TASKS, tasks)
  }
}

// mutations
const mutations = {
  [types.ONLY_INCOMPLETE_TASKS] (state, tasks) {
    Vue.set(state, 'all', tasks)
  },
  [types.ONLY_COMPLETED_TASKS] (state, tasks) {
    Vue.set(state, 'all', tasks)
  },

  [types.REMOVE_COMPLETED_TASKS] (state, { data }) {
    Vue.set(state, 'all', data)
  },

  [types.GET_TASKS_LIST] (state, { data }) {
    Vue.set(state, 'all', data)
  },

  [types.CREATE_TASK] (state, { data }) {
    const newState = state.all
    newState.push(data)
    Vue.set(state, 'all', newState)
  },

  [types.REMOVE_TASK] (state, { data }) {
    const filteredList = state.all.filter(task => task.id !== data.id)
    Vue.set(state, 'all', filteredList)
  },

  [types.UPDATE_TASK] (state, { data }) {
    const newState = state.all.map(upTask => {
      if (upTask.id === data.id) {
        return data
      }
      return upTask
    })
    Vue.set(state, 'all', newState)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
