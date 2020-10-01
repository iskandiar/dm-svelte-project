export const fetchTweets = async () => {
  const resp = await fetch('/tweets')

  return await resp.json()
}

export const like = async (id) => {
  return await fetch(`/tweets/${id}/like`, {
    method: "PUT"
  })
}

export const dislike = async (id) => {
  return await fetch(`/tweets/${id}/dislike`, {
    method: "PUT"
  })
}

export const remove = async (id) => {
  return await fetch(`/tweets/${id}`, {
    method: "DELETE"
  })
}

export const create = async (text) => {
  const resp = await fetch("/tweets", {
    method: "POST",
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ tweet: { text } })
  })

  return await resp.json()
}

export const createComment = async (id, text) => {
  const resp = await fetch(`/tweets/${id}/comments`, {
    method: "POST",
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment: { text } })
  })

  return await resp.json()
}

export const removeComment = async (tweetId, id) => {
  return await fetch(`/tweets/${tweetId}/comments/${id}`, {
    method: "DELETE",
  })
}
