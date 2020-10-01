<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let text = '';

  function handleClick() {
    submit()
  }

  function submit() {
    dispatch('submitComment', {
      text
    });

    text = '';
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' && isValid) {
      submit()
    }
  }

  $: isValid = text.length <= 140;
  $: btnDisabled = text.length > 140 || text.length === 0;
</script>

<div class="px-4 py-4 rounded overflow-hidden bg-white shadow border-gray-200">
  <div class="flex items-center justify-between">
    <input class:border-red-500={!isValid}
      class="shadow appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full mr-2 text-xs"
      bind:value={text} on:keydown={handleKeydown} />
    <button on:click={handleClick} disabled={btnDisabled} class:cursor-not-allowed="{btnDisabled}"
      class="bg-blue-500 hover:bg-blue-400 text-white font-semibold p-1 rounded text-xs">
      Comment
    </button>
  </div>
</div>
