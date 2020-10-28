<template>
  <div>
    <h1>{{ encodeInput }}</h1>
    <BaseInputGroup
      v-for="input in inputField"
      :key="input.id"
      :label="input.label"
      :description="input.description"
      :placeholder="input.placeholder"
      :id="input.id"
      :type="input.type"
      :disabled="input.disabled"
      :required="input.required"
      :data-handler="input.dataHandler"
    />
  </div>
</template>

<script>
import BaseInputGroup from '@/components/base/BaseInputGroup.vue'

const NAMESPACE = '65f9af5d-f23f-4065-ac85-da725569fdcd'

export default {
  components: {
    BaseInputGroup
  },
  data() {
    return {
      encodeInput: 'test',
      inputField: [
        {
          id: this.$uuid.v5('encodeInput', NAMESPACE),
          label: 'Text to Encrypt',
          type: 'text',
          dataHandler: 'encodeInput',
          placeholder: 'Enter text',
          required: true
        },
        {
          id: this.$uuid.v5('encodeKey', NAMESPACE),
          label: 'Private Key',
          type: 'number',
          description: 'The default key value is 3',
          dataHandler: 'encodeKey',
          placeholder: 'Enter key',
          required: true
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
