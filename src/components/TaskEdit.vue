<template lang='jade'>
  .editor
    .editor__inputs
      input(v-model="taskNewName")
      input(v-model="taskNewDate")
    .editor__buttons
      span(@click="saveTask") Save
      span(@click="closeEditor") Close
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'task-editor',
    props: ['taskName', 'taskDate'],
    mounted: function () {
      const year = moment().year()
      const month = moment().month()
      this.year = year
      this.month = month
      this.getCalendar(year, month)
      this.taskNewName = this.props.taskName
      this.taskNewDate = this.props.taskDate
      document.addEventListener('click', this.hideEditor)
    },
    beforeDestroy: function () {
      document.removeEventListener('click', this.hideEditor)
    },
    data () {
      return {
        taskNewName: '',
        taskNewDate: ''
      }
    },
    computed: {
    },
    methods: {
      checkDate (date) {
      },
      saveTask () {
        const taskInfo = {
          name: this.taskNewName,
          expires: this.taskNewDate,
          done: false
        }
        this.$emit('updateTask', taskInfo)
      }
    }
  }
</script>

<style scoped>
  .editor {
    display: flex;
    flex-direction: column;
    max-width: 250px;
    position: absolute;
    top: 30px;
    padding: 15px;
    background: #fff;
    border: solid 1px #ccc;
  }

</style>
