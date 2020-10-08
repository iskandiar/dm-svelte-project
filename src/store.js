import { writable, derived} from 'svelte/store'

import { fetchTweets, create, like, dislike, remove, createComment, removeComment} from './api' 

export const isLoading = writable(false)
export const activeFilter = writable('ALL')

const loadingWrapper = async apiCall => {
  isLoading.set(true)

  const response = await apiCall()

  isLoading.set(false)

  return response
}

function createTweetsStore() {
  const { subscribe, set, update } = writable([])

	return {
    subscribe,
    init: async() => {
      const data = await loadingWrapper(fetchTweets)

      set(data)
    },
		create: async (text) => {
      const response = await loadingWrapper(() => create(text))
  
      update(data => [response, ...data])
    },
    like: async (id) => {
      await loadingWrapper(() => like(id))

      update(data => data.map(d => {
        if (d.id === id) d.likedByMe = true

        return d
      }))
    },
    dislike: async (id) => {
      await loadingWrapper(() => dislike(id))

      update(data => data.map(d => {
        if (d.id === id) d.likedByMe = false

        return d
      }))
    },
    remove: async (id) => {
      await loadingWrapper(() => remove(id))

      update(data => data.filter(d => d.id !== id))
    },
    createComment: async (tweetId, text) => {
      const response = await loadingWrapper(() => createComment(tweetId, text))

      update(data => data.map(d => {
        if(d.id === tweetId) {
          d.comments.push(response)
        }

        return d
      }))
    },
    removeComment: async (tweetId, id) => {
      await loadingWrapper(() => removeComment(tweetId, id))

      update(data => data.map(d => {
        if (d.id === tweetId) {
          d.comments = d.comments.filter(c => c.id !== id)
        }

        return d
      }))
    },
	};
}

export const tweets = createTweetsStore()

export const filteredTweets = derived([activeFilter, tweets], ([$activeFilter, $tweets]) => {
  if ($activeFilter === 'ALL') return $tweets
  else if ($activeFilter === 'MINE') return $tweets.filter(t => t.isAuthor)
  else if ($activeFilter === 'LIKED') return $tweets.filter(t => t.likedByMe)
});
