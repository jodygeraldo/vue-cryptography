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
            <b-form-textarea
              id="textarea-auto-height encodeInput"
              rows="2"
              max-rows="8"
              no-resize
              v-model="encodeInput"
              placeholder="Enter text"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            class="mb-3"
            label="Original Text"
            label-for="originalText"
          >
            <b-form-textarea
              id="textarea-auto-height originalText"
              rows="2"
              max-rows="8"
              disabled
              no-resize
              v-model="originalText"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group class="mb-3" label="Secret Code" label-for="secretCode">
            <b-form-textarea
              id="textarea-auto-height secretCode"
              rows="2"
              max-rows="8"
              disabled
              no-resize
              v-model="secretCode"
            ></b-form-textarea>
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
            label="Encrypted text"
            label-for="decodeInput"
            description="The SHA-3 encrypted text is 128 characters long"
          >
            <b-form-textarea
              id="textarea-auto-height decodeInput"
              rows="2"
              max-rows="8"
              no-resize
              placeholder="Enter encrypted text"
              v-model="decodeInput"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            class="mb-3"
            label="Original Code"
            label-for="originalCode"
          >
            <b-form-textarea
              id="textarea-auto-height originalCode"
              rows="2"
              max-rows="8"
              disabled
              no-resize
              v-model="originalCode"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            class="mb-3"
            label="Secret Message"
            label-for="secretMessage"
          >
            <b-form-textarea
              id="textarea-auto-height secretMessage"
              rows="2"
              max-rows="8"
              disabled
              no-resize
              v-model="secretMessage"
            ></b-form-textarea>
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
      SHA3 encryption using cryptoJS, the decryption of a 'hash' is impossible,
      but we can use reverse lookup using database
    </b-alert>
  </div>
</template>

<script>
import SHA3 from 'crypto-js/sha3'
import axios from 'axios'

export default {
  name: 'SHA-3',
  data() {
    return {
      encodeInput: '',
      decodeInput: '',
      originalText: '',
      secretCode: '',
      originalCode: '',
      secretMessage: ''
    }
  },
  methods: {
    encode() {
      this.originalText = this.encodeInput
      this.secretCode = SHA3(this.originalText, {
        outputLength: 512
      }).toString()
      this.encodeInput = ''

      const data = {
        originalText: this.originalText,
        encryptedText: this.secretCode
      }

      this.$notify({
        group: 'notif',
        type: 'success',
        title: 'Text Successfully Encrypted',
        text: 'You can copy the encrypted text from secret code input field.'
      })

      axios
        .get(
          `https://vue-crypto-8ce2a.firebaseio.com/sha-3.json?orderBy="originalText"&equalTo="${data.originalText}"`
        )
        .then(response => {
          const dataString = JSON.stringify(response.data)
          const originalText = dataString.split('"')
          const duplicate = originalText[5]

          if (!duplicate) {
            axios.post(
              'https://vue-crypto-8ce2a.firebaseio.com/sha-3.json',
              data
            )
          }
        })
        .catch(error => {
          console.log(error.response)
          this.$notify({
            group: 'notif',
            type: 'error',
            title: 'Database Connection failed',
            text: 'Connection to database failed. Please try again later.'
          })
        })
    },
    decode() {
      axios
        .get(
          `https://vue-crypto-8ce2a.firebaseio.com/sha-3.json?orderBy="encryptedText"&equalTo="${this.decodeInput}"`
        )
        .then(response => {
          const dataString = JSON.stringify(response.data)
          const originalText = dataString.split('"')
          this.originalCode = this.decodeInput
          if (originalText[0] === '{') {
            this.secretMessage = originalText[9]

            this.$notify({
              group: 'notif',
              type: 'success',
              title: 'Text Successfully Decrypted',
              text:
                'The encrypted text was successfully decrypted, you can see the result in the secret message input field.'
            })
          } else {
            this.secretMessage = '[No result found in our database]'

            this.$notify({
              group: 'notif',
              type: 'warn',
              title: 'Decryption Process Failed',
              text:
                'There is no result found in our database for specific secret code you are given. Please try again.'
            })
          }
          this.decodeInput = ''
        })
        .catch(error => {
          this.$notify({
            group: 'notif',
            type: 'error',
            title: 'Database Connection failed',
            text: 'Connection to database failed. Please try again later.'
          })
        })
    }
  },
  computed: {
    encodeInputCheck() {
      if (this.encodeInput === '') return true
      return false
    },
    decodeInputCheck() {
      if (this.decodeInput.length !== 128) return true
      return false
    }
  }
}
</script>
