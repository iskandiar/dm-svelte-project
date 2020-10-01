<script>
  import Tweet from './Tweet.svelte'
  import NewTweet from './NewTweet.svelte'

  let promise = fetch('/tweets').then(resp => resp.json())

  async function handleNewTweet(event) {
    await fetch("/tweets", {
      method: "POST",
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: event.detail.text  })
    })

    promise = fetch('/tweets').then(resp => resp.json())
  }

  function handleLike(id) {
    return async function(event) {
      await fetch(`/tweets/${id}/like`, {
        method: "PUT"
      })

      promise = fetch('/tweets').then(resp => resp.json())
    }
  }

  function handleDislike(id) {
    return async function (event) {
      await fetch(`/tweets/${id}/dislike`, {
        method: "PUT"
      })

      promise = fetch('/tweets').then(resp => resp.json())
    }
  }

  function handleRemove(id) {
    return async function (event) {
      await fetch(`/tweets/${id}`, {
        method: "DELETE"
      })

      promise = fetch('/tweets').then(resp => resp.json())
    }
  }

  function handleSubmitComment(id) {
    return async function (event) {
      await fetch(`/tweets/${id}/comments`, {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: event.detail.text })
      })

      promise = fetch('/tweets').then(resp => resp.json())
    }
  }

  function handleRemoveComment(tweetId) {
    return async function (event) {
      await fetch(`/tweets/${tweetId}/comments/${event.detail.id}`, {
        method: "DELETE",
      })

      promise = fetch('/tweets').then(resp => resp.json())
    }
  }
</script>

<NewTweet on:submit={handleNewTweet}/>
{#await promise}
  <div class="text-center">
    <img src='loader.svg' alt="loader" />
  </div>
{:then tweets}
  {#each tweets as tweet (tweet.id)}
    <Tweet  
      author={tweet.author}
      text={tweet.text}
      createdAgo={tweet.createdAgo}
      comments={tweet.comments}
      likedByMe={tweet.likedByMe}
      isAuthor={tweet.isAuthor}
      on:like={handleLike(tweet.id)}
      on:dislike={handleDislike(tweet.id)}
      on:remove={handleRemove(tweet.id)}
      on:submitComment={handleSubmitComment(tweet.id)}
      on:removeComment={handleRemoveComment(tweet.id)}
    />
  {/each}
{/await}


