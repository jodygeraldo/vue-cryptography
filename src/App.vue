<template>
  <div id="app">
    <b-container>
      <TheHeading />

      <TheNavigation />

      <notifications
        group="notif"
        animation-type="velocity"
        :duration="notifDuration"
      />

      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>

      <TheFooter />
    </b-container>
  </div>
</template>

<script>
import TheHeading from '@/components/layout/TheHeading.vue'
import TheNavigation from '@/components/layout/TheNavigation.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

export default {
  components: {
    TheHeading,
    TheNavigation,
    TheFooter
  },
  data() {
    return {
      notifDuration: 5000
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
