<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let text = '';

  function handleClick() {
    submit()
  }

  function submit() {
    dispatch('submit', {
      text
    });

    text = '';
  }

  function handleKeydown(event) {
    if(event.key === 'Enter' && isValid) {
      submit()
    }
  }

  $: isValid = text.length <= 140;
  $: btnDisabled = text.length > 140 || text.length === 0;
</script>

<div class="px-4 py-2 rounded overflow-hidden bg-gray-300 shadow border-gray-600 mb-4">
  <div class="flex items-center justify-between">
    <input class:border-red-500={!isValid}
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
      placeholder="What is going on?" bind:value={text} on:keydown={handleKeydown}/>
    <p class="text-xs italic mr-2 ml-2" class:text-red-500="{!isValid}">{text.length}</p>
    <button on:click={handleClick} disabled={btnDisabled} class:cursor-not-allowed="{btnDisabled}" class="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-3 rounded text-sm">
      Tweet
    </button>
  </div>
</div>
