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

      <notifications group="notif" animation-type="velocity" />

      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        {
          name: 'Classic',
          disabled: false,
          tooltip: 'Symmetric key cryptography classic'
        },
        {
          name: 'AES',
          disabled: false,
          tooltip: 'Symmetric key cryptography Advanced Encryption Standard'
        },
        // { name: 'RSA', disabled: true, tooltip: 'RSA Unavailable' },
        {
          name: 'MD-5',
          disabled: false,
          tooltip:
            'Hash function cryptography Message Digest Algorithm 5 (MD-5)'
        },
        {
          name: 'SHA-256',
          disabled: false,
          tooltip:
            'Hash function cryptography Secure Hash Algorithm 2 (SHA-256)'
        }
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

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
