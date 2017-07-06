const apiConf = {
  methods: {
    user: {
      login: {
        url: '/api/user/login',
        method: 'post'
      }
    },
    task: {
      list: {
        url: '/api/task/get_list',
        method: 'get'
      },
      create: {
        url: '/api/task/create',
        method: 'post'
      },
      update: {
        url: '/api/task/update',
        method: 'post'
      },
      remove: {
        url: '/api/task/remove',
        method: 'get'
      },
      removeCompleted: {
        url: '/api/task/remove_completed',
        method: 'post'
      }
    }
  },
  backendUrl: 'http://localhost:3030'
}

export default apiConf
