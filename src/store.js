import { writable, derived} from 'svelte/store'

import { fetchTweets, create, like, dislike, remove, createComment, removeComment} from './api' 

export const isLoading = writable(false)
export const activeFilter = writable('ALL')

function createTweetsStore() {
  const { subscribe, set, update } = writable([])

	return {
    subscribe,
    init: async() => {
      isLoading.set(true)
      const data = await fetchTweets()

      isLoading.set(false)
      set(data)
    },
		create: async (text) => {
      const response = await create(text)
  
      update(data => [response, ...data])
    },
    like: async (id) => {
      await like(id)

      update(data => data.map(d => {
        if (d.id === id) d.likedByMe = true

        return d
      }))
    },
    dislike: async (id) => {
      await dislike(id)

      update(data => data.map(d => {
        if (d.id === id) d.likedByMe = false

        return d
      }))
    },
    remove: async (id) => {
      await remove(id)

      update(data => data.filter(d => d.id !== id))
    },
    createComment: async (tweetId, text) => {
      const response = await createComment(tweetId, text)

      update(data => data.map(d => {
        if(d.id === tweetId) {
          d.comments.push(response)
        }

        return d
      }))
    },
    removeComment: async (tweetId, id) => {
      await removeComment(tweetId, id)


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
