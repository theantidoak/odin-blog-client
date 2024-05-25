<script lang="ts">
  import { page } from '$app/stores';
  import CommentForm from '../../components/comment-form.svelte';
  import { comments, showCommentForm } from '../../stores/auth';

  const { body } = $page.data;
  comments.set(body.comments);

  function handleLikeCounter(button: HTMLButtonElement, like: string) {
    const listItem = (button.parentElement as HTMLDivElement).parentElement as HTMLDivElement;
    const likesCounter = (listItem.querySelector('.comment-section__likes-counter') as HTMLElement);
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

</script>

<div class="post">
  <h1 class="post__title">{ body.post.title }</h1>
  {#if body.post.image !== '' }
    <img src="{ body.post.image }" alt="" />
  {/if}
  <div>{@html body.post.content }</div>
  <div class="comment-section">
    <h2 class="comment-section__heading">Comments</h2>
    <button class="comment-section__make-comment-btn" on:click={() => showCommentForm.update(form => !form)}>{$showCommentForm ? "Nevermind" : "Make a Comment"}</button>
    {#if $showCommentForm}
      <CommentForm postId={body.post._id} comments={comments} />
    {/if}
    {#if $comments}
      <ul class="comment-section__comments">
        {#each $comments as comment}
          <li class="comment-section__comment">
            <div class="comment-section__text-container">
              <p class="comment-section__comment-text">{comment.content}</p>
              <p class="comment-section__comment-author">By {comment.author}</p>
            </div>
            <div class="comment-section__likes-container">
              <p class="comment-section__likes-counter">{comment.likes}</p>
              <div class="comment-section__like-button-container">
                <button class="comment-section__dislike-btn" type="button" on:click={addLike} data-id="{comment._id}" data-like="false" title="Dislike comment" aria-label="Dislike comment">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>empty bowl</title>
                    <path d="M22,11H2C2,15.1 4.5,18.6 8,20.2V22H16V20.2C19.5,18.6 22,15.1 22,11" />
                  </svg>
                </button>
                <button class="comment-section__like-btn" type="button" on:click={addLike} data-id="{comment._id}" data-like="true" title="Like comment" aria-label="Like comment">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>bowl of rice</title>
                    <path d="M22,11H19.7C19.4,9.9 18.9,8.8 18.2,8L21.6,2.6L19.9,1.5L16.7,6.6C16.3,6.3 16,6.1 15.5,5.9L16.4,2.3L14.5,1.8L13.7,5.2C13.1,5.1 12.6,5 12,5C8.3,5 5.2,7.6 4.3,11H2C2,15.1 4.5,18.6 8,20.2V22H16V20.2C19.5,18.6 22,15.1 22,11M12,7C14.6,7 16.8,8.7 17.6,11H6.4C7.2,8.7 9.4,7 12,7Z" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style lang="scss">

  .post {
     
    &__title {
      text-align: center;
      margin: 0 0 1rem;
    }

    .comment-section {
      margin: 5rem 0 0;

      &__heading {
        text-align: left;
        color: var(--light-blue);
      }

      &__make-comment-btn {
        background-color: transparent;
        border: 1px solid #cfc8d8;
        padding: .5rem .75rem;
        color: var(--dark-blue);
        cursor: pointer;
        margin: 1rem 0 0;
        transition: all .3s ease;

        &:hover {
          background-color: var(--light-silver);
        }
      }

      &__comments {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        list-style: none;
        margin: 1rem 0 0;
        padding: 0;
      }

      &__comment {
        border: 1px solid #cfc8d8;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
      }

      &__text-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      &__comment-text {
        font-size: 16px;
      }

      &__comment-author {
        font-size: 14px;
        font-weight: bold;
      }

      &__likes-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .25rem;
      }

      &__likes-counter {
        font-size: 18px;
        color: var(--dark-blue);
      }

      &__like-button-container {
        display: flex;
        align-items: center;
        gap: .5rem;

        button {
          background-color: transparent;
          border: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, .5);
          border-radius: 5px;
          padding: .1rem;
          cursor: pointer;
          transition: all .3s ease;

          &.comment-section__like-btn {
            svg {
              fill: var(--dark-blue);
            }
          }

          &.comment-section__dislike-btn {
            svg {
              fill: var(--pumpkin);
            }
          }

          &:hover {
            box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
          }
          
          svg {
            height: 1.5rem;
            width: auto;
            min-width: 1.5rem;
          }
        }
      }
    }
  }

</style>