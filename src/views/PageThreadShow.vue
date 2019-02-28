<template>
<!-- apply a v-if in the root element -->
  <div v-if="thread && user" class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        :to="{name: 'ThreadEdit', params: {id}}"
        class="btn-green btn-small"
        tag="button"
      >Edit Thread</router-link>
    </h1>

    <p>
      By
      <a href="#" class="link-unstyled">{{ user.name }}</a>,
      <AppDate :timestamp="thread.publishedAt"/>.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{ repliesCount(id) }} replies by {{ contributorsCount }} contributors</span>
    </p>

    <PostList :posts="posts"/>

    <PostEditor :threadId="id"/>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import { mapGetters } from 'vuex'
import { database } from '../../firebase.config.js'
import { countObjectProperties } from '../utils'

export default {
  components: {
    PostList,
    PostEditor
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters(['repliesCount']),

    thread () {
      const { threads } = this.$store.state

      return threads[this.id]
    },

    posts () {
      const { posts } = this.$store.state

      return Object.values(posts).filter(post => post.threadId === this.id)
    },

    user () {
      const { users } = this.$store.state

      return users[this.thread.userId]
    },

    contributorsCount () {
      return countObjectProperties(this.thread.contributors)
      // find the replies
      // get the user ids
      // count the unique ids
      // const replies = this.posts.filter(
      //   post => post['.key'] !== this.thread.firstPostId
      // )

      // const userIds = replies.map(reply => reply.userId)

      // const uniqueIds = [...new Set(userIds)]

      // return uniqueIds.length
    }
  },

  // I can access this.id in the following hook
  created () {
    // fetch thread
    database
      .ref('threads')
      .child(this.id)
      .once('value')
      .then(snapshot => {
        const thread = snapshot.val()
        const postIds = Object.values(thread.posts)

        this.$store.commit('setThread', {
          threadId: snapshot.key,
          thread: { ...thread, '.key': snapshot.key }
        })

        postIds.forEach(postId => {
          // fetch post
          database
            .ref('posts')
            .child(postId)
            .once('value')
            .then(snapshot => {
              const post = snapshot.val()

              this.$store.commit('setPost', {
                postId: snapshot.key,
                post: { ...post, '.key': snapshot.key }
              })

              // fetch user
              database
                .ref('users')
                .child(post.userId)
                .once('value')
                .then(snapshot => {
                  const user = snapshot.val()

                  this.$store.commit('updateUser', {
                    userId: snapshot.key,
                    user: { ...user, '.key': snapshot.key }
                  })
                })
            })
        })

        // fetch user
        database
          .ref('users')
          .child(thread.userId)
          .once('value')
          .then(snapshot => {
            const user = snapshot.val()

            this.$store.commit('updateUser', {
              userId: snapshot.key,
              user: { ...user, '.key': snapshot.key }
            })
          })
      })
  }
}
</script>
