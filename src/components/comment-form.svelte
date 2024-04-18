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
      <input type="author" name="author" required />
    </div>
    <div class="form__field">
      <label for="content">Comment: </label>
      <input type="content" name="content" required />
    </div>
    <input type="hidden" name="post" value="{postId}" />
    <div class="form__field">
      <button class="form__submit-btn">Submit</button>
    </div>
  </form>
</div>