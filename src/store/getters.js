import { countObjectProperties } from '@/utils'

export default {
  authUser: state => {
    return state.users[state.authId]
  },
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
