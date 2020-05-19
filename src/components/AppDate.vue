<template>
  <span :title="timestamp | humanFriendlyDates">{{
    timestamp | diffForHumans
  }}</span>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    timestamp: {
      type: Number,
      required: true
    }
  },

  filters: {
    humanFriendlyDates(date) {
      return moment.unix(date).format('MMMM Do YYYY, h:mm:ss a')
    },

    diffForHumans(date) {
      return moment.unix(date).fromNow()
    }
  }
}
</script>
