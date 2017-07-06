<template lang="jade">
  .login
    h1.login__header
    input.input(type='text' v-model='user.username' placeholder='username')
    br
    input.input(type='password' v-model='user.password' placeholder='password')
    br
    p {{ error }}
    br
    button(@click='login(user)') login
    router-link(to='/') back
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as Cookies from 'js-cookie'

  export default {
    name: 'login',
    computed: {
      ...mapGetters({
        stateUser: 'getUser'
      })
    },
    data () {
      return {
        user: {
          username: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      async login (user) {
        try {
          await this.$store.dispatch('login', user)
          if (this.stateUser) {
            Cookies.set('user', JSON.stringify(this.stateUser))
            this.$router.push({name: 'Tasks'})
          }
        } catch (e) {
          this.error = 'Unauthorized'
        }
      }
    }
  }
</script>

<style scoped>
  .input {
    margin: 10px 0;
    height: 20px;
  }
</style>
