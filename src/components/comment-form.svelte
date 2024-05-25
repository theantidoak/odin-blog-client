<script lang="ts">
  import type { Writable } from "svelte/store";
  import { showCommentForm } from "../stores/auth";

  export let postId: string;
  export let comments: Writable<any[]>;

  async function submitComment(e: Event) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const formDataSerialized = Object.fromEntries(formData);
    const jsonData = JSON.stringify(formDataSerialized);
    
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    });

    const responseData = await response.json();
    const { success, comment } = responseData;

    if (success) {
      showCommentForm.set(false);
      comments.update(items => ([ comment, ...items]));
    }
  }

</script>

<div class="form-container">
  <form id="comment-form-id" action="" class="form" on:submit={submitComment}>
    <div class="form__field">
      <label for="author">Author: </label>
      <input type="author" name="author" id="author" required />
    </div>
    <div class="form__field">
      <label for="content">Comment: </label>
      <textarea name="content" id="content" rows="5" required ></textarea>
    </div>
    <input type="hidden" name="post" value="{postId}" />
    <div class="form__field buttons">
      <button class="form__submit-btn">Submit</button>
    </div>
  </form>
</div>

<style lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    gap: .75rem;
    width: fit-content;
    margin: 1rem 0 0;
    border: 1px solid #cfc8d8;
    padding: 1rem;
    width: clamp(286px, 85%, 500px);

    &__field {
      display: flex;
      flex-direction: column;
      gap: .25rem;

      &.buttons {
        width: fit-content;
        margin: 1rem 0 .5rem;
      }

      label {
        font-size: clamp(14px, 4.5vw, 16px);
      }

      input, textarea {
        padding: .25rem 0;
      }
    }

    &__submit-btn {
      padding: .5rem 1rem;
      cursor: pointer;
      font-size: 16px;
      color: white;
      background-color: var(--light-blue);
      border-radius: 10px;
      border: none;
      box-shadow: 0 1px 2px rgba(0, 0, 0, .3);

      &:hover, &:active {
        box-shadow: 0 3px 6px rgba(0, 0, 0, .3);
      }
    }
  }
</style>