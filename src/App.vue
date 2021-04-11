<template>
  <div id="nav">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>


<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
h1 {
  font-size: 4rem;
}
</style>
