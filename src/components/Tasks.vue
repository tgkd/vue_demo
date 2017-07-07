<template lang="jade">
  .tasks
    h1.tasks__header Tasks
    actions-panel(:current-action='currentAction' v-on:setAction='setCurrentAction')
    p(v-if='tasks.length === 0') sry, u don't have {{ currentAction === 'all' ? '' : currentAction }} tasks
    .table
      .table__body
        .task(v-for='task in tasks', v-if='tasks.length > 0')
          .task-id
            span.id {{ task.id }}
          .task-name
            span.name(:class="{'task-name--completed': task.done}") {{ task.name }}
          .task-expires
            .expires {{ parseDate(task.expires) }}
          .task-checkbox
            input.checkbox(type='checkbox', :checked='task.done', v-on:change='update(task)')
          .task-rm
            span.btn-rm(@click='remove(task.id)') ✖
        .new-task(v-show='currentAction === "all"')
          input.input-add(type='text',
                            placeholder='add new task...',
                            v-model='newTask.name',
                            @keyup.enter='create(newTask)')
          .new-date
            span.new-task-date(@click='calendarVisible = !calendarVisible') {{newTaskDate}}
            .calendar-container
              date-select(v-on:setDate='setDate', :calendar-visible='calendarVisible')
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as Cookies from 'js-cookie'
  import ActionsPanel from './ActionsPanel.vue'
  import DateSelect from './DateSelect.vue'
  import moment from 'moment'
  export default {
    name: 'tasks',
    components: {
      ActionsPanel,
      DateSelect
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
      }),
      newTaskDate: function () {
        return moment(this.newTask.date).format('DD MMMM')
      }
    },
    data () {
      return {
        currentAction: 'all',
        newTask: {
          name: '',
          date: moment()
        },
        calendarVisible: false
      }
    },
    methods: {
      closeCalendar () {
        this.calendarVisible = false
      },
      parseDate (date) {
        return moment(date).format('DD/MM/YYYY HH:MM')
      },
      setDate (date) {
        this.newTask.date = date
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
    display: flex;
    justify-content: center;
  }
  .task {
    display: flex;
    justify-content: space-between;
    min-width: 400px;
  }

  .task-id {
    min-width: 20px;
  }

  .task-name {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 200px;
  }

  .task-name--completed {
    color: #41b883;
  }

  .new-task {
    position: relative;
    margin-top: 10px;
  }

  .input-add {
    width: 80%;
    border: none;
    border-bottom:solid 1px #ccc;
  }

  .btn-add {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
  }

  .btn-calendar {
    position: relative;
  }

  .new-date {
    min-width: 50px;
    cursor: pointer;
  }

  .new-task {
    display: flex;
  }

  .new-task-date {
    position: relative;
  }

  .calendar-container {
    position: relative;
  }

</style>
