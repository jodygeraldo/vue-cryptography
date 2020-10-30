<template>
  <b-navbar>
    <b-navbar-brand>JodyCryptoVue</b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-text>Copyright &copy; {{ year }} Jody Geraldo</b-nav-text>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      year: null
    }
  },
  mounted() {
    this.year = new Date().getFullYear()
  }
}
</script>
