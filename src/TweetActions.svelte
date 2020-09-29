<script>
  export let comments = [];

  import Comment from './Comment.svelte'

  let collapsed = true
</script>

<div class="text-xs leading-8 text-left">
  <span class="cursor-pointer" on:click={() => collapsed = !collapsed}>
    Show all comments ({comments.length})
  </span>
</div>
{#if !collapsed}
  {#each comments as comment (comment.id)}
    <Comment author={comment.author} text={comment.text} createdAgo={comment.createdAgo} comments={comment.comments}/>
  {/each}
{/if}
