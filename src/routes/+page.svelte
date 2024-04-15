<script lang="ts">
  import { onMount } from 'svelte';
  export let data;
  const status = data.props.success;

  onMount(() => {
    console.log('changed', data);
  })

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<style lang="scss">

</style>