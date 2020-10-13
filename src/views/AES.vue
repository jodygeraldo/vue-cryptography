<template>
  <div>
    <b-card-group deck class="mb-3">
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

          <b-form-group class="mb-3" label="Password" label-for="encodeKey">
            <b-form-input
              id="encodeKey"
              type="password"
              v-model="encodeKey"
              placeholder="Enter password"
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
        <b-button
          variant="primary"
          :disabled="encodeInputCheck"
          @click.prevent="encode"
          >Encode</b-button
        >
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
              placeholder="Enter encrypted text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group class="mb-3" label="Password" label-for="decodeKey">
            <b-form-input
              id="decodeKey"
              type="password"
              v-model="decodeKey"
              placeholder="Enter password"
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
        <b-button
          variant="primary"
          :disabled="decodeInputCheck"
          @click.prevent="decode"
          >Decode</b-button
        >
      </b-card>
    </b-card-group>

    <b-alert show variant="info" class="text-center">
      AES encryption and decryption using cryptoJS
    </b-alert>
  </div>
</template>

<script>
import AES from 'crypto-js/aes'
import encUTF8 from 'crypto-js/enc-utf8'

export default {
  name: 'AES',
  data() {
    return {
      encodeInput: '',
      decodeInput: '',
      encodeKey: '',
      decodeKey: '',
      originalText: '',
      secretCode: '',
      originalCode: '',
      secretMessage: ''
    }
  },
  methods: {
    encode() {
      this.originalText = this.encodeInput
      this.secretCode = AES.encrypt(this.encodeInput, this.encodeKey).toString()
      this.encodeInput = ''
      this.encodeKey = ''
    },
    decode() {
      const bytes = AES.decrypt(this.decodeInput, this.decodeKey)
      this.originalCode = this.decodeInput
      this.secretMessage = bytes.toString(encUTF8)
      this.decodeInput = ''
      this.decodeKey = ''
    }
  },
  computed: {
    encodeInputCheck() {
      if (this.encodeInput === '' || this.encodeKey === '') return true
      return false
    },
    decodeInputCheck() {
      if (this.decodeInput === '' || this.decodeKey === '') return true
      return false
    }
  }
}
</script>
