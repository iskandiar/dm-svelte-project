<script>
  export let likedByMe, isAuthor, comments = [];

  import { createEventDispatcher } from 'svelte';

  import Comment from './Comment.svelte'
  import NewComment from './NewComment.svelte'

  const dispatch = createEventDispatcher();

  let collapsed = true

  function handleDislike() {
    dispatch('dislike')
  }

  function handleLike() {
    dispatch('like')
  }

  function handleRemove() {
    if (window.confirm("Do you really want to remove this tweet?")) {
      dispatch('remove')
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
      <span class="text-red-400 cursor-pointer" on:click={handleDislike}>
        Dislike!
      </span>
    {:else}
      <span class="text-green-600 cursor-pointer" on:click={handleLike}>
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
      id={comment.id}
      on:removeComment/>
  {/each}
  <NewComment on:submitComment/>
{/if}
