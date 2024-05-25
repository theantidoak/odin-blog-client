<script lang="ts">
  import Header from "../components/header.svelte";
  import Footer from "../components/footer.svelte";

</script>

<Header></Header>
<main id="main">
  <slot />
</main>
<Footer></Footer>