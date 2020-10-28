<template>
  <div>
    <b-form-group
      class="mb-3"
      :label="label"
      :label-for="id"
      :description="description"
    >
      <b-form-input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'BaseInputGroup',
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: function(value) {
        return ['text', 'number'].indexOf(value) !== -1
      }
    },
    placeholder: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    modelValue: {
      required: true
    }
  },
  computed: {
    name() {
      return this.data
    }
  },
  methods: {
    inputHandler() {
      this.$emit('update:modelValue')
    }
  }
}
</script>
