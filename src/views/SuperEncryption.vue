<template>
  <div>
    <b-card-group deck class="mb-3">
      <b-card header="Encryption" header-tag="header">
        <b-card-text>
          <b-form @submit.prevent="encode">
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
              label="Password"
              label-for="encodeKey"
              :invalid-feedback="encodeKeyFeedback"
              :state="encodeKeyInvalidState"
            >
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

            <b-form-group
              class="mb-3"
              label="Secret Code"
              label-for="secretCode"
            >
              <b-form-input
                id="secretCode"
                type="text"
                v-model="secretCode"
                disabled
              ></b-form-input>
            </b-form-group>

            <b-button
              type="submit"
              variant="primary"
              :disabled="encodeInputCheck"
            >
              Encode
            </b-button>
          </b-form>
        </b-card-text>
      </b-card>

      <b-card header="Decryption" header-tag="header">
        <b-card-text>
          <b-form @submit.prevent="decode">
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

            <b-button
              type="submit"
              variant="primary"
              :disabled="decodeInputCheck"
            >
              Decode
            </b-button>
          </b-form>
        </b-card-text>
      </b-card>
    </b-card-group>

    <b-alert show variant="info" class="text-center">
      The rotation is ASCII printable characters
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'SuperEncryption',
  data() {
    return {
      encodeInput: '',
      decodeInput: '',
      encodeKey: '',
      decodeKey: '',
      originalText: '',
      secretCode: '',
      originalCode: '',
      secretMessage: '',
      letterRotation: [],
      substitutionArray: []
    }
  },
  methods: {
    substitutionEncode() {
      const plainIndex = []
      const substitutionCipher = []

      for (const el of this.encodeInput)
        plainIndex.push(this.letterRotation.indexOf(el))

      for (const el of plainIndex)
        substitutionCipher.push(this.substitutionArray[el])

      return substitutionCipher
    },
    substitutionDecode(decryptedTranspose) {
      const cipherIndex = []
      const substitutionPlain = []

      for (const el of decryptedTranspose)
        cipherIndex.push(this.substitutionArray.indexOf(el))

      for (const el of cipherIndex)
        substitutionPlain.push(this.letterRotation[el])

      const decryptedText = substitutionPlain.join('')

      return decryptedText
    },
    transpose(a) {
      return Object.keys(a[0]).map(c => {
        return a.map(r => {
          return r[c]
        })
      })
    },
    convertToMultipleArray(array, passwordLength) {
      const size = 3
      let arrayOfArrays = []
      if (array.length % 3 === 0) {
        array.push(`~`)
        array.push(`~`)
        array.push(`~${passwordLength}~`)

        for (let i = 0; i < array.length; i += size)
          arrayOfArrays.push(array.slice(i, i + size))
      } else if (array.length % 3 === 1) {
        array.push('~')
        array.push(`~${passwordLength}~`)

        for (let i = 0; i < array.length; i += size)
          arrayOfArrays.push(array.slice(i, i + size))
      } else if (array.length % 3 === 2) {
        array.push(`~${passwordLength}~`)

        for (let i = 0; i < array.length; i += size)
          arrayOfArrays.push(array.slice(i, i + size))
      }

      return arrayOfArrays
    },
    transpositionEncode() {
      const substitutionTextArray = this.substitutionEncode()
      const passwordArray = this.encodeKey.split('')

      const combination = passwordArray.concat(substitutionTextArray)

      const arrayOfArrays = this.convertToMultipleArray(
        combination,
        passwordArray.length
      )

      const transposeArrays = this.transpose(arrayOfArrays)

      let encryptedTextArray = []
      for (let i = 0; i < transposeArrays.length; i++) {
        encryptedTextArray = encryptedTextArray.concat(transposeArrays[i])
      }

      return encryptedTextArray.join('')
    },
    transpositionDecode() {
      const decodeInputArray = this.decodeInput.split('')
      let passwordLength = null

      if (
        decodeInputArray[decodeInputArray.length - 1] === '~' &&
        decodeInputArray[decodeInputArray.length - 3] === '~'
      ) {
        passwordLength = +decodeInputArray[decodeInputArray.length - 2]
        decodeInputArray.splice(decodeInputArray.length - 2, 2)
      } else if (
        decodeInputArray[decodeInputArray.length - 1] === '~' &&
        decodeInputArray[decodeInputArray.length - 3] !== '~' &&
        decodeInputArray[decodeInputArray.length - 4] === '~'
      ) {
        const firstDigit = decodeInputArray[decodeInputArray.length - 3]
        const secondDigit = decodeInputArray[decodeInputArray.length - 2]
        const combine = firstDigit + secondDigit
        passwordLength = +combine
        decodeInputArray.splice(decodeInputArray.length - 3, 3)
      } else if (
        decodeInputArray[decodeInputArray.length - 1] === '~' &&
        decodeInputArray[decodeInputArray.length - 3] !== '~' &&
        decodeInputArray[decodeInputArray.length - 4] !== '~' &&
        decodeInputArray[decodeInputArray.length - 5] === '~'
      ) {
        const firstDigit = decodeInputArray[decodeInputArray.length - 4]
        const secondDigit = decodeInputArray[decodeInputArray.length - 3]
        const thirdDigit = decodeInputArray[decodeInputArray.length - 2]
        const combine = firstDigit + secondDigit + thirdDigit
        passwordLength = +combine
        decodeInputArray.splice(decodeInputArray.length - 4, 4)
      } else if (
        decodeInputArray[decodeInputArray.length - 1] === '~' &&
        decodeInputArray[decodeInputArray.length - 3] !== '~' &&
        decodeInputArray[decodeInputArray.length - 4] !== '~' &&
        decodeInputArray[decodeInputArray.length - 5] !== '~' &&
        decodeInputArray[decodeInputArray.length - 6] === '~'
      ) {
        const firstDigit = decodeInputArray[decodeInputArray.length - 5]
        const secondDigit = decodeInputArray[decodeInputArray.length - 4]
        const thirdDigit = decodeInputArray[decodeInputArray.length - 3]
        const fourthDigit = decodeInputArray[decodeInputArray.length - 2]
        const combine = firstDigit + secondDigit + thirdDigit + fourthDigit
        passwordLength = +combine
        decodeInputArray.splice(decodeInputArray.length - 5, 5)
      }

      const decodeInput = decodeInputArray.join('')

      const passwordArray = this.decodeKey.split('')

      const size = decodeInput.length / 3
      let arrayOfArrays = []
      for (let i = 0; i < decodeInput.length; i += size)
        arrayOfArrays.push(decodeInput.slice(i, i + size))

      const transposeArrays = this.transpose(arrayOfArrays)

      let decryptedTextArray = []
      for (let i = 0; i < transposeArrays.length; i++) {
        decryptedTextArray = decryptedTextArray.concat(transposeArrays[i])
      }

      const decryptedTransposeText = decryptedTextArray.filter(el => el !== '~')

      const decryptedPassword = decryptedTransposeText.splice(0, passwordLength)
      if (JSON.stringify(decryptedPassword) === JSON.stringify(passwordArray))
        return this.substitutionDecode(decryptedTransposeText)

      return null
    },
    encode() {
      this.originalText = this.encodeInput

      this.secretCode = this.transpositionEncode()

      this.encodeInput = ''
      this.encodeKey = ''

      this.$notify({
        group: 'notif',
        type: 'success',
        title: 'Text Successfully Encrypted',
        text: 'You can copy the encrypted text from secret code input field.'
      })
    },
    decode() {
      this.originalCode = this.decodeInput

      this.secretMessage = this.transpositionDecode()

      this.decodeInput = ''
      this.decodeKey = ''

      if (this.secretMessage) {
        this.$notify({
          group: 'notif',
          type: 'success',
          title: 'Text Successfully Decrypted',
          text:
            'The encrypted text was successfully decrypted, you can see the result in the secret message input field.'
        })
      } else {
        this.secretMessage =
          'There is no secret message from the combination of given encrypted text and the password.'

        this.$notify({
          group: 'notif',
          type: 'warn',
          title: 'Decryption Process Failed',
          text:
            'There is no secret message from the combination of given encrypted text and the password.'
        })
      }
    }
  },
  computed: {
    encodeInputCheck() {
      if (
        this.encodeInput === '' ||
        this.encodeKey === '' ||
        this.encodeKey.length > 16
      )
        return true
      return false
    },
    decodeInputCheck() {
      if (this.decodeInput === '' || this.decodeKey === '') return true
      return false
    },
    encodeKeyFeedback() {
      if (this.encodeKey.length > 16) {
        return 'The maximum password length is 16'
      }
      return null
    },
    encodeKeyInvalidState() {
      return this.encodeKey.length > 0 && this.encodeKey.length <= 16
    }
  },
  created() {
    for (let i = 32; i <= 126; i++) {
      this.letterRotation.push(String.fromCharCode(i))
    }

    this.substitutionArray = this.letterRotation.slice(0)

    const spliced = this.substitutionArray.splice(0, 3)

    this.substitutionArray = this.substitutionArray.concat(spliced)
  }
}
</script>