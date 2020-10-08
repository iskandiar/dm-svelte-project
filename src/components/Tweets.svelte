<script>
  import Tweet from './Tweet.svelte'
  import NewTweet from './NewTweet.svelte'
  import TweetFilters from './TweetFilters.svelte'

  import { tweets, isLoading, filteredTweets } from './../store.js'

  tweets.init()
</script>

<NewTweet/>
<TweetFilters />
{#if $isLoading}
  <div class="text-center m-10 absolute top-0 right-0">
    <img class="mx-auto" src='loader.svg' alt="loader" />
  </div>
{/if}
{#each $filteredTweets as tweet (tweet.id)}
  <Tweet  
    author={tweet.author}
    text={tweet.text}
    createdAgo={tweet.createdAgo}
    comments={tweet.comments}
    likedByMe={tweet.likedByMe}
    isAuthor={tweet.isAuthor}
    id={tweet.id}
  />
{/each}


