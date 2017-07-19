<template lang="jade">
  .actions-panel
    ul.actions
      li.action-item(v-for='action in actions',
                      v-on:click='setAction(action.name);action.method()',
                      :class="{'active-item': action.name === currentAction}") {{action.name}}
      li.action-item.action--remove(@click='removeCompleted()') remove completed

</template>

<script>
  export default {
    name: 'actions',
    props: ['currentAction'],
    data () {
      return {
        actions: [
          {
            name: 'all',
            method: this.getTasks
          },
          {
            name: 'completed',
            method: this.getCompletedOnly
          },
          {
            name: 'incomplete',
            method: this.getIncompleteOnly
          }
        ]
      }
    },
    methods: {
      setAction (actionName) {
        this.$emit('setAction', actionName)
      },
      async removeCompleted () {
        try {
          await this.$store.dispatch('removeCompleted')
          this.getTasks()
        } catch (e) {
          console.log(e)
        }
      },
      getCompletedOnly () {
        this
          .getTasks()
          .then(() => {
            this.$store.dispatch('getCompletedOnly')
          })
      },
      getIncompleteOnly () {
        this
          .getTasks()
          .then(() => {
            this.$store.dispatch('getIncompleteOnly')
          })
      },
      async getTasks () {
        try {
          await this.$store.dispatch('getAllTasks')
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>
  .actions-panel {
    color: #4b4b4b;
  }
  .actions {
    display: flex;
    justify-content: center;
    padding: 0;
    margin-bottom: 35px;
  }
  .action-item {
    list-style: none;
    margin-left: 15px;
    font-size: 10px;
    cursor: pointer;
  }

  .action-item:first-child {
    margin-left: 0;
  }

  .action--remove {
    color: #cc514c;
  }

  .active-item {
    color: #41b883;
    border-bottom: solid 1px #41b883;
  }
</style>
