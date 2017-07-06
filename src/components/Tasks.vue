<template lang="jade">
  .tasks
    h1.tasks__header Tasks
    actions-panel(:current-action='currentAction' v-on:setAction='setCurrentAction')
    p(v-if='tasks.length === 0') sry, u don't have {{ currentAction === 'all' ? '' : currentAction }} tasks
    .table
      .table__body
        .task(v-for='task in tasks', v-if='tasks.length > 0')
          span.task__id {{ task.id }}
          span.task__name(:class="{'task__name--completed': task.done}") {{ task.name }}
          span.task__expires {{ parseDate(task.expires) }}
          input.task__checkbox(type='checkbox', :checked='task.done', v-on:change='update(task)')
          span.task__btn-rm(@click='remove(task.id)') ✖
        .new-task(v-show='currentAction === "all"')
          input.input--add(type='text',
                            placeholder='add new task...',
                            v-model='newTask.name',
                            @keyup.enter='create(newTask)')
          span.btn--add(@click='create(newTask)') ✚
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as Cookies from 'js-cookie'
  import ActionsPanel from './ActionsPanel.vue'
  import moment from 'moment'
  export default {
    name: 'tasks',
    components: {
      ActionsPanel
    },
    mounted: function () {
      this.getTasks()
      const user = JSON.parse(Cookies.get('user'))
      if (!user) {
        this.$router.push({name: 'Hello'})
      }
    },
    computed: {
      ...mapGetters({
        tasks: 'allTasks'
      })
    },
    data () {
      return {
        currentAction: 'all',
        newTask: {
          name: ''
        }
      }
    },
    methods: {
      parseDate (date) {
        return moment(date).format('DD-MM-YYYY HH:MM')
      },
      setCurrentAction (actionName) {
        this.currentAction = actionName
      },
      async create (newTask) {
        try {
          await this.$store.dispatch('createTask', newTask)
          this.newTask.name = ''
        } catch (e) {
          console.log(e)
        }
      },
      async getTasks () {
        try {
          await this.$store.dispatch('getAllTasks')
        } catch (e) {
          console.log(e)
        }
      },
      async update (task) {
        const updTask = {...task, done: !task.done}
        try {
          await this.$store.dispatch('updateTask', updTask)
          if (this.currentAction === 'incomplete') {
            this.$store.dispatch('getIncompleteOnly')
          } else if (this.currentAction === 'completed') {
            this.$store.dispatch('getCompletedOnly')
          }
        } catch (e) {
          console.log(e)
        }
      },
      async remove (id) {
        try {
          await this.$store.dispatch('removeTask', id)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>
  .table {
    margin: 0 auto;
    text-align: left;
  }

  .table__body {
    text-align: left;
  }

  .task__id {
    display: inline-block;
    min-width: 30px;
  }

  .task__name {
    min-width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

  .task__name--completed {
    color: #41b883;
  }

  .checkbox-cell {
    padding: 2px 15px 0;
  }

  .task__btn-rm {
    min-width: 40px;
    cursor: pointer;
  }

  .input--add {
    width: 90%;
    outline: none;
    border: none;
    border-bottom: solid 1px #ccc;
    color: #2c3e50;
  }

  .btn--add {
    min-width: 40px;
    cursor: pointer;
  }

  .name-cell {
    max-width: 200px;
    min-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>
