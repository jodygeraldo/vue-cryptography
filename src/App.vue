<template>
  <div id="app">
    <b-container>
      <h1 class="title mb-3 text-center">Cryptography</h1>

      <!-- <router-link :to="{ name: 'Classic' }">Classic</router-link> -->
      <!-- <router-link :to="{ name: 'AES' }">About</router-link> -->
      <div class="mb-3">
        <b-nav tabs align="center">
          <b-nav-item
            v-for="page in pages"
            :key="page"
            :to="{ name: `${page}` }"
            exact
            exact-active-class="active"
          >
            {{ page }}
          </b-nav-item>
        </b-nav>
      </div>

      <router-view />
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: ['Classic', 'AES', 'RSA', 'MD', 'SHA']
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Segoe UI, Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.title {
  font-size: calc(1.625rem + 2.5vw);
  font-weight: 300;
  line-height: 1.2;
}
</style>
