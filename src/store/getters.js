import { countObjectProperties } from '@/utils'
// Getters will receive the state as their 1st argument
export default {
  authUser: state => state.users[state.authId],
  // we can't pass arguments to getters by default
  // dynamic getter
  userThreadsCount: state => {
    return id => {
      return countObjectProperties(state.users[id].threads)
    }
  },

  userPostsCount: state => id => countObjectProperties(state.users[id].posts),

  threadRepliesCount: state => id => {
    const count = countObjectProperties(state.threads[id].posts)
    return count ? count - 1 : count
  }
}
