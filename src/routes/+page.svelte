<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import LoginForm from './login-form.svelte';
  const { data } = $page;

  onMount(() => {
    console.log('page: ', $page);
    console.log('data: ', data);
  });

</script>

<main>
  <LoginForm />
</main>

<style lang="scss">

</style>