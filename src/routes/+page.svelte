<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import LoginForm from './login-form.svelte';
  import { isLoggedIn } from '../stores/auth';
  const { body, success } = $page.data;
  isLoggedIn.set(success);

  onMount(() => {
    console.log('page: ', $page);
    console.log('data: ', body);
  });

</script>

<main id="main" class="home">
  {#if !$isLoggedIn} 
    <LoginForm />
  {:else if body.posts}
    <h1 class="home__heading">Blog</h1>
    <ul class="home__posts">
      {#each body.posts as post}
        <li class="home__post">
          <a class="home__post-link" href="/{post.slug}">
            {#if post.img !== ''}
              <img src="{post.img}" alt="" />
            {/if}
            <div class="home__post-description">
              <h2 class="home__post-heading">{post.title}</h2>
              <p class="home__post-excerpt">{post.excerpt}</p>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style lang="scss">

  :global(body) {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
  }

  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(main) {
    padding-top: 4rem;
  }

  .home {
    height: calc(100vh);

    > * {
      display: block;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      padding: 0 5vw;

      @media (min-width: 1024px) {
        padding: 0 4rem;
      }
    }

    &__posts {
      list-style: none;
    }

    &__post {
      display: flex;
      align-items: center;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
      padding: 1rem clamp(.25rem, 4vw, 1rem);
      transition: all linear .3s;
      cursor: pointer;

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, .3);
      }
    }

    &__post-link {
      text-decoration: none;
      color: black;
    }
  }

</style>