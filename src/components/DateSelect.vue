<template lang='jade'>
  .calendar(v-show='calendarVisible')
    .navigation
      .prev-month(@click='previousMonth()') <
      .current-month {{ monthName + ' ' + year }}
      .next-month(@click='nextMonth()') >
    .day-names-row
      .day-name(v-for='day in dayNames')
        span {{ day }}
    .dates
      .week(v-for='week in weekRows')
        .day(v-for='day in week')
          span.day-name(@click='setDate(day)') {{ day }}
</template>

<script>
  import getCalendar from './../libs/dateCreator'
  import moment from 'moment'

  export default {
    name: 'date-select',
    props: ['calendarVisible'],
    mounted: function () {
      const year = moment().year()
      const month = moment().month()
      this.year = year
      this.month = month
      this.getCalendar(year, month)
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
  .calendar {
    display: flex;
    flex-direction: column;
    max-width: 250px;
    position: absolute;
    top: 30px;
    border: solid 1px #ccc;
    padding: 15px;
    box-shadow: 4px 4px 5px 0 rgba(128, 128, 128, 0.5);
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .day-names-row {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #ccc;
  }

  .dates {
    display: flex;
    flex-direction: column;
  }
  .week {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: solid 1px #ccc;
  }

  .day {
    margin: 5px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .day-name {
    display: flex;
  }
</style>
