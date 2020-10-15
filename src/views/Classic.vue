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

          <b-form-group
            class="mb-3"
            label="Private Key"
            label-for="encodeKey"
            description="The default key value is 3"
          >
            <b-form-input
              id="encodeKey"
              type="number"
              v-model="encodeKey"
              placeholder="Enter key"
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

          <b-form-group
            class="mb-3"
            label="Private Key"
            label-for="decodeKey"
            description="The default key value is 3"
          >
            <b-form-input
              id="decodeKey"
              type="number"
              v-model="decodeKey"
              placeholder="Enter key"
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
      The rotation is ASCII printable characters, if the private key is greater
      than 94 it will use default private key (3)
    </b-alert>
  </div>
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
      secretMessage: '',
      letterRotation: [],
      codeRotation: []
    }
  },
  methods: {
    getCodeRotation(type) {
      const baseRotation = this.letterRotation.slice(0)

      let key = 3
      if (type === 'encode') {
        key = this.encodeKey < 94 ? this.encodeKey : 3
      } else if (type === 'decode') {
        key = this.decodeKey < 94 ? this.decodeKey : 3
      }

      const spliced = baseRotation.splice(0, key)
      this.codeRotation = baseRotation.concat(spliced)
    },
    encode() {
      this.getCodeRotation('encode')
      const encodedLetter = []
      const plainIndex = []

      for (const el of this.encodeInput)
        plainIndex.push(this.letterRotation.indexOf(el))

      for (const el of plainIndex) encodedLetter.push(this.codeRotation[el])

      this.originalText = this.encodeInput
      this.secretCode = encodedLetter.join('')
      this.encodeInput = ''

      this.$notify({
        group: 'notif',
        type: 'success',
        title: 'Text Successfully Encrypted',
        text: 'You can copy the encrypted text from secret code input field.'
      })
    },
    decode() {
      this.getCodeRotation('decode')
      const decodedLetter = []
      const cipherIndex = []

      for (const el of this.decodeInput)
        cipherIndex.push(this.codeRotation.indexOf(el))

      for (const el of cipherIndex) decodedLetter.push(this.letterRotation[el])

      this.originalCode = this.decodeInput
      this.secretMessage = decodedLetter.join('')
      this.decodeInput = ''

      this.$notify({
        group: 'notif',
        type: 'success',
        title: 'Text Successfully Decrypted',
        text:
          'The encrypted text was successfully decrypted, you can see the result in the secret message input field.'
      })
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
  },
  watch: {
    encodeKey() {
      if (this.encodeKey < 0) {
        this.encodeKey = 3
      }
    },
    decodeKey() {
      if (this.decodeKey < 0) {
        this.decodeKey = 3
      }
    }
  },
  created() {
    for (let i = 32; i <= 126; i++) {
      this.letterRotation.push(String.fromCharCode(i))
    }
  }
}
</script>
