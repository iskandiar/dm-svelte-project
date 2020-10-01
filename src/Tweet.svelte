<script>
  export let author, createdAgo, text, comments, isAuthor, likedByMe, id;

  import TweetActions from './TweetActions.svelte'

  let collapsed = true;
</script>

<div class="rounded overflow-hidden shadow border-gray-200 bg-gray-100 mb-3" class:bg-gray-200="{author ===  '@alex'}">
  <div class="px-4 py-2">
    <div class="text-sm leading-8 text-left">
      <span class="font-semibold">{author}</span> - <span class="font-thin">{createdAgo} ago</span>
    </div>
    <div class="text-left py-2 ">
      {text}
    </div>
    <TweetActions {comments} {isAuthor} {likedByMe} {id}/>
  </div>
</div>
