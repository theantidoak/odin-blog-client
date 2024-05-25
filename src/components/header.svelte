<script lang="ts">
  import { page } from "$app/stores";
 
</script>

<header id="header">
  <nav class="nav">
    <a class="nav__item {$page.url.pathname === '/' ? 'white' : ''}" href="/">Posts</a>
  </nav>
</header>

<style lang="scss">
  header {
    width: 100%;
    height: 4.5rem;
    display: flex;
    align-items: center;

    .nav {
      width: fit-content;
      display: flex;
      gap: 2rem;
      margin: auto;

      &__item {
        background-color: transparent;
        border: none;
        font-size: 15px;
        text-decoration: none;
        font-family: inherit;
        color: var(--sienna);
        font-weight: bold;
        cursor: pointer;

        &.white {
          color: white;
        }

        &::after {
          display: block;
          content: "";
          border-bottom: 2px solid rgba(0,0,0,0);
          transition: all .3s linear;
          transform-origin: 0% 50%;
          transform: scaleX(0);
          padding: .25rem 0 0;
        }

        &:hover {

          &::after {
            border-bottom-color: var(--primary-color-1);
            transform: scaleX(1);
          }
        }
      }
    }

  }
  
</style>