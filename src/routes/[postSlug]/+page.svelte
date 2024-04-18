<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import CommentForm from '../../components/comment-form.svelte';
  import { comments, showCommentForm } from '../../stores/auth';

  const { body, success } = $page.data;
  comments.set(body.comments);

  function handleLikeCounter(button: HTMLButtonElement, like: string) {
    const listItem = button.parentElement as HTMLLIElement;
    const likesCounter = (listItem.querySelector('.comment__likes') as HTMLElement);
    const numberOfLikes = +(likesCounter.textContent as string);
    const adjustment = like === 'true' ? 1 : like === 'false' ? -1 : 0;
    likesCounter.textContent = (numberOfLikes + adjustment).toString();
  }

  async function addLike(e: Event) {
    const button = e.currentTarget as HTMLButtonElement;
    const { id, like } = button.dataset;

    const jsonData = JSON.stringify({ like: like === 'true' ? true : like === 'false' ? false : null });
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    });

    const responseData = await response.json();
    const { success } = responseData;

    if (success) {
      handleLikeCounter(button, like as string);
    }
  }

  async function deleteComment(e: Event) {
    const button = e.currentTarget as HTMLButtonElement;
    const { id } = button.dataset;

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (success) {
      comments.set($comments.filter((comment) => comment._id !== id));
    }
  }

  onMount(() => {
    console.log('page: ', $page);
    console.log('data: ', body);
  });

</script>

<main id="main" class="post">
  <h1 class="post__title">{ body.post.title }</h1>
  {#if body.post.image !== '' }
    <img src="{ body.post.image }" alt="" />
  {/if}
  <div>{@html body.post.content }</div>
  <button on:click={() => showCommentForm.update(form => !form)}>{$showCommentForm ? "Nevermind" : "Make a Comment"}</button>
  {#if $showCommentForm}
    <CommentForm postId={body.post._id} comments={comments} />
  {/if}
  {#if $comments}
    <ul>
      {#each $comments as comment}
        <li>
          <p>{comment.content}</p>
          <p>{comment.author}</p>
          <p class="comment__likes">{comment.likes}</p>
          <button type="button" on:click={addLike} data-id="{comment._id}" data-like="true">Like</button>
          <button type="button" on:click={addLike} data-id="{comment._id}" data-like="false">Unlike</button>
          {#if body.isAuthorized}
            <button type="button" on:click={deleteComment} data-id="{comment._id}">Delete</button>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style lang="scss">

</style>