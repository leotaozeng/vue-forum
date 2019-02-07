<template>
  <div class="forum-wrapper col-full">
    <div class="forum-header push-top">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>

        <p class="text-lead">{{ forum.description }}</p>
      </div>

      <router-link :to="{name: 'ThreadCreate', params: {forum: this.forum}}"
                   class="btn-green btn-small">Start a thread</router-link>
    </div>

    <div class="category-item">
      <div class="forum-list">
        <h2 class="list-title">Recipes</h2>

        <div class="forum-listing">
          <div class="forum-details">
            <a href="#"
               class="forum-name">Recipes</a>

            <p class="forum-description ">Recipes, Guides and Tips &amp; Tricks</p>
          </div>

          <div class="threads-count">
            <p class="count text-lead">1</p> threads
          </div>

          <div class="last-thread">
            <img class="avatar"
                 src="http://cleaneatsfastfeets.com/wp-content/uploads/2013/05/Mr-Burns.gif"
                 alt="">
            <div class="last-thread-details">
              <a href="#">How I grill my fish</a>
              <p class="text-xsmall">By <a href="profile.html">Charles Montgomery Burns</a>, 2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="thread-wrapper">
      <h2 class="list-title">Threads</h2>

      <ThreadList :threads="threads" />
    </div>
  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    forum () {
      const { sourceData } = this.$store.state

      return sourceData.forums[this.id]
    },

    threads () {
      // need to return an array of threads
      const { threads } = this.$store.state.sourceData

      return Object.values(threads).filter((thread) => thread.forumId === this.id)
    }
  },

  components: {
    ThreadList
  }
}
</script>
