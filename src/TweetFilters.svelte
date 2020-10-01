<script>
  import { activeFilter } from './store.js'

  function setFilter(name) {
    activeFilter.set(name)
  }

  const basicClasses = "hover:bg-gray-400 text-gray-800 py-2 px-4"
  const activeClasses = "bg-gray-300 font-bold"
  const nonActiveClasses = "bg-gray-200"

  function classHelper(activeType, type, extraClass = "") {
    const isActive = type === activeType 

    return ([
      basicClasses,
      isActive ? activeClasses : nonActiveClasses,
      extraClass
    ]).join(" ")
  }
</script>

<div class="mb-3 flex justify-end">
  <button
    class={classHelper($activeFilter, 'ALL', 'rounded-l')}
    on:click={() => setFilter('ALL')}>
    All
  </button>
  <button
    class={classHelper($activeFilter, 'MINE')}
    on:click={() => setFilter('MINE')}>
    Mine
  </button>
  <button
    class={classHelper($activeFilter, 'LIKED', 'rounded-r')}
    on:click={() => setFilter('LIKED')}>
    Liked
  </button>
</div>
