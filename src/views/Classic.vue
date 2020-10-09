<template>
  <b-card-group deck>
    <b-card header="Encryption" header-tag="header">
      <b-card-text>
        <b-form-group
          class="mb-3"
          label="Text to Encode"
          label-for="encodeInput"
        >
          <b-form-input
            id="encodeInput"
            type="text"
            v-model="encodeInput"
            placeholder="Enter text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="mb-3"
          label="Key"
          label-for="encodeKey"
          description="The default key value is 3 (Julius Caesar)"
        >
          <b-form-input
            id="encodeKey"
            type="number"
            v-model="encodeKey"
            placeholder="Enter text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="mb-3"
          label="Original Text"
          label-for="originalText"
        >
          <b-form-input
            id="originalText"
            type="text"
            v-model="originalText"
            disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mb-3" label="Secret Code" label-for="secretCode">
          <b-form-input
            id="secretCode"
            type="text"
            v-model="secretCode"
            disabled
          ></b-form-input>
        </b-form-group>
      </b-card-text>
      <b-button variant="primary">Encode</b-button>
    </b-card>

    <b-card header="Decryption" header-tag="header">
      <b-card-text>
        <b-form-group
          class="mb-3"
          label="Text to Decode"
          label-for="decodeInput"
        >
          <b-form-input
            id="decodeInput"
            type="text"
            v-model="decodeInput"
            placeholder="Enter text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="mb-3"
          label="Key"
          label-for="decodeKey"
          description="The default key value is 3 (Julius Caesar)"
        >
          <b-form-input
            id="decodeKey"
            type="number"
            v-model="decodeKey"
            placeholder="Enter text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="mb-3"
          label="Original Code"
          label-for="originalCode"
        >
          <b-form-input
            id="originalCode"
            type="text"
            v-model="originalCode"
            disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="mb-3"
          label="Secret Message"
          label-for="secretMessage"
        >
          <b-form-input
            id="secretMessage"
            type="text"
            v-model="secretMessage"
            disabled
          ></b-form-input>
        </b-form-group>
      </b-card-text>
      <b-button variant="primary">Decode</b-button>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: 'Classic',
  data() {
    return {
      encodeInput: '',
      decodeInput: '',
      encodeKey: 3,
      decodeKey: 3,
      originalText: '',
      secretCode: '',
      originalCode: '',
      secretMessage: ''
    }
  },
  methods: {
    test() {
      console.log('button clicked')
    }
  }
}
</script>
