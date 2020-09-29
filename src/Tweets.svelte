<script>
  import Tweet from './Tweet.svelte'

  let promise = fetch('/tweets').then(resp => resp.json())
</script>

{#await promise}
  <div class="text-center">
    <img src='loader.svg' alt="loader" />
  </div>
{:then tweets}
  {#each tweets as tweet (tweet.id)}
    <Tweet author={tweet.author} text={tweet.text} createdAgo={tweet.createdAgo} comments={tweet.comments}/>
  {/each}
{/await}


