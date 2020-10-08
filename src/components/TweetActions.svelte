<script>
  export let id, likedByMe, isAuthor, comments = [];

  import { tweets } from './../store.js'

  import Comment from './Comment.svelte'
  import NewComment from './NewComment.svelte'

  let collapsed = true

  function handleRemove() {
    if (window.confirm("Do you really want to remove this tweet?")) {
      tweets.remove(id)
    }
  }
</script>

<div class="text-xs leading-8 text-left">
  <span class="cursor-pointer" on:click={() => collapsed = !collapsed}>
    Show all comments ({comments.length})
  </span>
  -
  <span>
    {#if likedByMe}
      <span class="text-red-400 cursor-pointer" on:click={tweets.dislike(id)}>
        Dislike!
      </span>
    {:else}
      <span class="text-green-600 cursor-pointer" on:click={tweets.like(id)}>
        Like!
      </span>
    {/if}
  </span>
  {#if isAuthor}
  <span class="text-red-600 font-semibold cursor-pointer" on:click={handleRemove}>
    - Destroy
  </span>
  {/if}
</div>
{#if !collapsed}
  {#each comments as comment (comment.id)}
    <Comment
      author={comment.author}
      text={comment.text}
      createdAgo={comment.createdAgo}
      comments={comment.comments}
      isAuthor={comment.isAuthor}
      tweetId={id}
      id={comment.id}/>
  {/each}
  <NewComment tweetId={id}/>
{/if}
