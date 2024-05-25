<script lang="ts">
  import { page, navigating } from '$app/stores';
  import { posts } from '../stores/auth';
  import hero from '../lib/images/home-hero.webp'
  const { body, success } = $page.data;
  posts.set(body.posts ? body.posts : $posts);

</script>

<div class="home">
  <h1 class="home__heading">Ricehat</h1>
  <div class="home__hero-img-container" style="background-image: url({hero})"></div>
  <div class="home__hero-img-margin"></div>
  {#if $posts}
    <ul class="home__posts">
      {#each $posts as post}
        <li class="home__post">
          <a class="home__post-link" href="/{post.slug}">
            {#if post.image !== ''}
              <img src="{post.image}" alt="" />
            {/if}
            <div class="home__post-description">
              <h2 class="home__post-heading">{post.title}</h2>
              <p class="home__post-excerpt">{post.excerpt}...</p>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">

  .home {
    max-width: 1200px;

    &__hero-img-container {
      height: calc(100vh + 72px);
      width: 100vw;
      position: absolute;
      background-repeat: no-repeat;
      background-size: cover;
      z-index: -1;
      top: -72px;
      left: 0;
    }

    // &__hero-img-margin {
    //   height: calc(100vh - 142px);
    // }

    &__heading {
      color: white;
      text-align: center;
      font-size: clamp(36px, 5.5vw, 48px);
    }

    &__posts {
      list-style: none;
      margin: 2rem 0 0;
      display: flex;
      flex-direction: column;
      gap: 2rem
    }

    &__post {
      display: flex;
      align-items: center;
      border-radius: 5px;
      border: 1px solid var(--light-silver);
      padding: 1rem clamp(.25rem, 4vw, 1rem);
      transition: all linear .3s;
      cursor: pointer;
      background-color: rgba(300, 300, 300, .85);

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, .3);
      }
    }

    &__post-link {
      text-decoration: none;
      color: black;
      display: flex;
      gap: 1.5rem;
      align-items: center;
      flex-direction: column;
      width: 100%;

      @media (min-width: 768px) {
        flex-direction: row;
      }

      img {
        height: 5rem;
        width: auto;
      }
    }
  }

</style>