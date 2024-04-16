<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  onMount(() => {
    console.log('page: ', $page);
  })
</script>

<main>
  <h1>Error</h1>
  <p>Sorry, an unexpected error has occurred.</p>
  <details>
    <summary>More info</summary>
    <pre></pre>
  </details>
</main>

<style>
  main {
    padding: 1rem;
    font-family: Arial, sans-serif;
  }
</style>