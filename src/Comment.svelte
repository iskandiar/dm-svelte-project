<script>
  export let author, createdAgo, text, isAuthor, id;

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleRemove() {
    if (window.confirm("Do you really want to remove this comment?")) {
      dispatch('removeComment', {
        id
      })
    }
  }
</script>

<div class="rounded overflow-hidden bg-white border border-gray-200 mb-3 text-xs">
  <div class="px-2 py-1">
    <div class="leading-8 text-left">
      <span class="font-semibold">{author}</span> - <span class="font-thin">{createdAgo} ago</span>
      {#if isAuthor}
        <span class="text-red-600 font-semibold cursor-pointer" on:click={handleRemove}>
          - Destroy
        </span>
      {/if}
    </div>
    <div class="text-left">
      {text}
    </div>
  </div>
</div>
