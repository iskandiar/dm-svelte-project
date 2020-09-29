<script>
  export let author, createdAgo, text;
</script>

<div class="rounded overflow-hidden bg-white border border-gray-200 mb-3 text-xs">
  <div class="px-2 py-1">
    <div class="leading-8 text-left">
      <span class="font-semibold">{author}</span> - <span class="font-thin">{createdAgo} ago</span>
    </div>
    <div class="text-left">
      {text}
    </div>
  </div>
</div>
