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
            :key="page.name"
            :to="{ name: `${page.name}` }"
            exact
            exact-active-class="active"
            :disabled="page.disabled"
            tabindex="0"
            v-b-tooltip.top
            :title="page.tooltip"
          >
            {{ page.name }}
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
      pages: [
        { name: 'Classic', disabled: false, tooltip: 'Classic Cryptography' },
        { name: 'AES', disabled: true, tooltip: 'AES Unavailable' },
        { name: 'RSA', disabled: true, tooltip: 'RSA Unavailable' },
        { name: 'MD', disabled: true, tooltip: 'MD Unavailable' },
        { name: 'SHA', disabled: true, tooltip: 'SHA Unavailable' }
      ]
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
