<template>
  <nav class="blue-grey darken-1">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Задачи</router-link>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/" active-class="active" exact>
          <div>Создать задачу</div>
        </router-link>
        <router-link tag="li" to="/list" active-class="active">
          <div>Список задач</div>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2rem;
}

ul {
  display: -webkit-inline-box;
}
</style>