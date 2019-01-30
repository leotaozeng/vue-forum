<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link class="text-xlarge"
                   :to="{name: 'Forum', params: { id: forum['.key'] }}">{{ forum.name }}</router-link>

      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{ threadsCount }}</p>
      {{ showWord }}
    </div>

    <div class="last-thread">
      <img class="avatar"
           src="https://i.imgur.com/WPSrfGm.jpg"
           alt="">

      <div class="last-thread-details">
        <a href="thread.html">What is the best animal joke y...</a>

        <p class="text-xsmall">By <a href="profile.html">Blossom</a>, 16 hours ago</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forum: {
      type: Object,
      required: true
    }
  },

  computed: {
    threadsCount () {
      return this.forum.threads ? Object.values(this.forum.threads).length : 0
    },

    showWord () {
      return this.threadsCount <= 1 ? 'thread' : 'threads'
    }
  }
}
</script>

<style>
</style>
