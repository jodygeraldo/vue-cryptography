<template>
  <div class="mb-3">
    <b-nav tabs align="center">
      <b-nav-item
        v-for="page in pages"
        :key="page.name"
        :to="{ name: `${page.name}` }"
        exact
        exact-active-class="active"
        tabindex="0"
        v-b-tooltip.hover
        :title="page.tooltip"
        class="unactiveLinkColor"
      >
        {{ page.label }}
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'TheNavigation',
  data() {
    return {
      pages: [
        {
          name: 'Classic',
          label: 'Classic',
          tooltip: 'Symmetric key cryptography classic'
        },
        {
          name: 'SuperEncryption',
          label: 'Super Encryption',
          tooltip:
            'Symmetric key cryptography Super Encryption using substitution and transposition'
        },
        {
          name: 'AES',
          label: 'AES',
          tooltip: 'Symmetric key cryptography Advanced Encryption Standard'
        },
        {
          name: 'MD-5',
          label: 'MD-5',
          tooltip:
            'Hash function cryptography Message Digest Algorithm 5 (MD-5)'
        },
        {
          name: 'SHA-256',
          label: 'SHA-256',
          tooltip:
            'Hash function cryptography Secure Hash Algorithm 2 (SHA-256)'
        },
        {
          name: 'SHA-3',
          label: 'SHA-3',
          tooltip:
            'Hash function cryptography Secure Hash Algorithm 3 (SHA-3) with 512 bits output hash length'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.unactiveLinkColor {
  a {
    color: var(--teal);
  }
}
</style>
