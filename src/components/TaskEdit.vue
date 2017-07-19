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
  import getCalendar from './../libs/dateCreator'
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
        selectedDate: null,
        calendar: null,
        dayNames: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
        month: moment().month(),
        year: moment().year()
      }
    },
    computed: {
      weekRows: function () {
        const calendar = this.calendar
        if (calendar) {
          return calendar.map((week) => {
            let dayList = []

            for (let day of week.by('days')) {
              dayList.push(day)
            }

            return dayList.map((day) => {
              return day.format('D')
            })
          })
        }
      },
      monthName: function () {
        return moment().month(this.month).format('MMMM')
      }
    },
    methods: {
      hideEditor (e) {
        const className = e.target.className
        const isCalendarNav = className.indexOf('navigation') + 1
        const isCalendarBody = className.indexOf('calendar') + 1
        const isDate = className.indexOf('new-task-date') + 1
        if (isDate || isCalendarNav || isCalendarBody) {
          e.preventDefault()
        } else {
          this.$emit('closeCalendar')
        }
      },
      setDate (date) {
        const momentDate = moment().date(date).month(this.month).year(this.year)
        this.$emit('setDate', momentDate)
      },
      getCalendar (year, month) {
        this.calendar = getCalendar(year, month)
        this.year = year
        this.month = month
      },
      nextMonth () {
        const {month, year} = this
        let newMonth
        let newYear
        if (month === 11) {
          newMonth = 0
          newYear = year + 1
        } else {
          newMonth = month + 1
          newYear = year
        }
        this.getCalendar(newYear, newMonth)
      },
      previousMonth () {
        let month
        let year
        if (this.month === 0) {
          month = 11
          year = this.year - 1
        } else {
          month = this.month - 1
          year = this.year
        }
        this.getCalendar(year, month)
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
