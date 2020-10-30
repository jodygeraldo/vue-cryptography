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
      The rotation is ASCII printable characters
    </b-alert>
  </div>
</template>

<script>
import SHA3 from 'crypto-js/sha3'

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
    substitution(type, decryptedTranspose) {
      if (type === 'encode') {
        const plainIndex = []
        const substitutionCipher = []

        for (const el of this.encodeInput)
          plainIndex.push(this.letterRotation.indexOf(el))

        for (const el of plainIndex)
          substitutionCipher.push(this.substitutionArray[el])

        return substitutionCipher
      } else if (type === 'decode') {
        const cipherIndex = []
        const substitutionPlain = []

        for (const el of decryptedTranspose)
          cipherIndex.push(this.substitutionArray.indexOf(el))
        for (const el of cipherIndex)
          substitutionPlain.push(this.letterRotation[el])

        const decryptedText = substitutionPlain.join('')

        return decryptedText
      }
    },
    transpose(a) {
      return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) {
          return r[c]
        })
      })
    },
    transposition(type) {
      if (type === 'encode') {
        const substitutionTextArray = this.substitution('encode')
        const passwordArray = this.encodeKey.split('')

        const combination = passwordArray.concat(substitutionTextArray)

        const size = 3
        let arrayOfArrays = []
        if (combination.length % 3 === 0) {
          combination.push(`~`)
          combination.push(`~`)
          combination.push(`~${passwordArray.length}~`)

          for (let i = 0; i < combination.length; i += size)
            arrayOfArrays.push(combination.slice(i, i + size))
        } else if (combination.length % 3 === 1) {
          for (let i = 0; i < combination.length; i += size)
            arrayOfArrays.push(combination.slice(i, i + size))

          arrayOfArrays[arrayOfArrays.length - 1].push('~')
          arrayOfArrays[arrayOfArrays.length - 1].push(
            `~${passwordArray.length}~`
          )
        } else if (combination.length % 3 === 2) {
          for (let i = 0; i < combination.length; i += size)
            arrayOfArrays.push(combination.slice(i, i + size))
          arrayOfArrays[arrayOfArrays.length - 1].push(
            `~${passwordArray.length}~`
          )
        }

        const transposetedArrays = this.transpose(arrayOfArrays)

        let encryptedTextArray = []
        for (let i = 0; i < transposetedArrays.length; i++) {
          encryptedTextArray = encryptedTextArray.concat(transposetedArrays[i])
        }

        const encryptedText = encryptedTextArray.join('')

        return encryptedText
      } else if (type === 'decode') {
        const decodeInputArray = this.decodeInput.split('')
        let passwordLength
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

        const transposetedArrays = this.transpose(arrayOfArrays)

        let decryptedTextArray = []
        for (let i = 0; i < transposetedArrays.length; i++) {
          decryptedTextArray = decryptedTextArray.concat(transposetedArrays[i])
        }

        const decryptedTransposeText = decryptedTextArray.filter(
          el => el !== '~'
        )

        const decryptedPassword = decryptedTransposeText.splice(
          0,
          passwordLength
        )
        if (
          JSON.stringify(decryptedPassword) === JSON.stringify(passwordArray)
        ) {
          const decryptedText = this.substitution(
            'decode',
            decryptedTransposeText
          )

          return decryptedText
        }

        const decryptedText = ''
        return decryptedText
      }
    },
    encode() {
      this.originalText = this.encodeInput

      this.substitution('encode')
      this.secretCode = this.transposition('encode')

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

      const decryptedText = this.transposition('decode')
      this.secretMessage = decryptedText

      this.decodeInput = ''
      this.decodeKey = ''

      if (this.secretMessage !== '') {
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
      if (this.encodeInput === '' || this.encodeKey === '') return true
      return false
    },
    decodeInputCheck() {
      if (this.decodeInput === '' || this.decodeKey === '') return true
      return false
    }
  },
  created() {
    for (let i = 32; i <= 126; i++) {
      this.letterRotation.push(String.fromCharCode(i))
    }

    let subsArray123 = [],
      subsArray3 = []
    for (let i = 35; i <= 126; i++) {
      subsArray123.push(String.fromCharCode(i))
    }
    for (let i = 32; i <= 34; i++) {
      subsArray3.push(String.fromCharCode(i))
    }
    this.substitutionArray = subsArray123.concat(subsArray3)
  }
}
</script>
