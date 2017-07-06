<template lang="jade">
  .hello
    h1.hello__header {{msg}}
    ul
      li
        router-link(to='login') login
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'VueJS App'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
