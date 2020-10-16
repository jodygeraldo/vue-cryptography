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
              v-model.trim="encodeKey"
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
              v-model.trim="decodeKey"
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
      encodeInput: '', // variabel terhubung dengan input Text to Encode encryption
      decodeInput: '', // variabel terhubung dengan input Text to Decode decryption
      encodeKey: '', // variabel terhubung dengan input Password encryption
      decodeKey: '', // variabel terhubung dengan input Password decryption
      originalText: '', // variabel terhubung dengan input Original Text encrytion
      secretCode: '', // variabel terhubung dengan input Secret Code encrytion
      originalCode: '', // variabel terhubung dengan input Original Code decryption
      secretMessage: '', // variabel terhubung dengan input Secret Message decryption
      letterRotation: [], // array ASCII code 32-126
      substitutionArray: [] // array yang sudah di substitusi dengan key pergeseran 3
    }
  },
  methods: {
    substitution(type, decryptedTranspose) {
      if (type === 'encode') {
        // jika type = encode
        const plainIndex = [] // deklarasi array plainIndex
        const substitutionCipher = [] // deklarasi array substitutionCipher

        for (const el of this.encodeInput)
          plainIndex.push(this.letterRotation.indexOf(el)) // mengisi array plainIndex dengan index masing-masing karakter dalam input Text to Encode pada array letterRotation

        for (const el of plainIndex)
          substitutionCipher.push(this.substitutionArray[el]) // mengisi array substitutionCipher dengan karakter yang memiliki index yang sama pada array substitutionArray

        return substitutionCipher // mengembalikan array substitutionCipher
      } else if (type === 'decode') {
        // jika type = decode
        const cipherIndex = [] // deklarasi array cipherIndex
        const substitutionPlain = [] // deklarasi array substitutionPlain

        for (const el of decryptedTranspose)
          cipherIndex.push(this.substitutionArray.indexOf(el)) // mengisi array cipherIndex dengan index masing-masing karakter dalam input Text to Decode pada array substitutionArray

        for (const el of cipherIndex)
          substitutionPlain.push(this.letterRotation[el]) // mengisi array substitutionPlain dengan karakter yang memiliki index yang sama pada array letterRotation

        const decryptedText = substitutionPlain.join('')

        return decryptedText // mengembalikan string decryptedText
      }
    },
    transpose(a) {
      // metode transpose array dengan recursive function
      return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) {
          return r[c]
        })
      })
    },
    transposition(type) {
      if (type === 'encode') {
        // jika type = encode
        const substitutionTextArray = this.substitution('encode') // memanggil fungsi substitusi
        const passwordArray = this.encodeKey.split('') // mengubah password menjadi array karakter

        const combination = passwordArray.concat(substitutionTextArray) // menggabungkan substitusi text array dari fungsi substitusi dengan passwordArray

        // membagi array combination menjadi 3 karakter per array
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

        // transpose array
        const transposetedArrays = this.transpose(arrayOfArrays)

        // menggabungkan array yang sudah di transpose menjadi satu array
        let encryptedTextArray = []
        for (let i = 0; i < transposetedArrays.length; i++) {
          encryptedTextArray = encryptedTextArray.concat(transposetedArrays[i])
        }

        // merubah array menjadi string
        const encryptedText = encryptedTextArray.join('')

        // mengembalikan text yang sudah ter enkripsi
        return encryptedText
      } else if (type === 'decode') {
        // jika type = decode

        // mendapatkan panjang password
        const decodeInputArray = this.decodeInput.split('')
        let passwordLength, firstDigit, secondDigit
        if (
          decodeInputArray[decodeInputArray.length - 1] === '~' &&
          decodeInputArray[decodeInputArray.length - 3] === '~'
        ) {
          passwordLength = +decodeInputArray[decodeInputArray.length - 2]
          decodeInputArray.splice(decodeInputArray.length - 2, 2)
        } else if (
          decodeInputArray[decodeInputArray.length - 1] === '~' &&
          decodeInputArray[decodeInputArray.length - 4] === '~'
        ) {
          firstDigit = decodeInputArray[decodeInputArray.length - 3]
          secondDigit = decodeInputArray[decodeInputArray.length - 2]
          const combine = firstDigit + secondDigit
          passwordLength = +combine
          decodeInputArray.splice(decodeInputArray.length - 3, 3)
        }

        // merubah kembali array menjadi string
        const decodeInput = decodeInputArray.join('')

        const passwordArray = this.decodeKey.split('') // mengubah password menjadi array karakter

        // membagi string menjadi 3 karakter per array
        const size = decodeInput.length / 3
        let arrayOfArrays = []
        for (let i = 0; i < decodeInput.length; i += size)
          arrayOfArrays.push(decodeInput.slice(i, i + size))

        // melakukan transpose
        const transposetedArrays = this.transpose(arrayOfArrays)

        // menggabungkan array yang sudah di transpose menjadi satu array
        let decryptedTextArray = []
        for (let i = 0; i < transposetedArrays.length; i++) {
          decryptedTextArray = decryptedTextArray.concat(transposetedArrays[i])
        }

        // menghapus '~' dalam array yang dijadikan sebagai tambahan
        const decryptedTransposeText = decryptedTextArray.filter(
          el => el !== '~'
        )

        // mengecek apakah password yang digunakan identik
        const decryptedPassword = decryptedTransposeText.splice(
          0,
          passwordLength
        )
        if (
          JSON.stringify(decryptedPassword) === JSON.stringify(passwordArray)
        ) {
          // jika password identik lakukan fungsi substitusi
          const decryptedText = this.substitution(
            'decode',
            decryptedTransposeText
          ) // memanggil fungsi substitusi

          // mengembalikan text yang sudah di dekripsi
          return decryptedText
        }

        // jika password tidak identik maka akan mengembalikan text kosong
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
      if (this.encodeInput === '' || this.encodeKey === '') return true // disable tombol Encode jika input Text to Encode atau input Password kosong
      return false
    },
    decodeInputCheck() {
      if (this.decodeInput === '' || this.decodeKey === '') return true // disable tombol Decode jika input Text to Decode atau input Password kosong
      return false
    }
  },
  created() {
    for (let i = 32; i <= 126; i++) {
      this.letterRotation.push(String.fromCharCode(i)) // mengisi array letterRotation dengan karakter ASCII dengan code desimal 32 sampai 126
    }

    let subsArray123 = [],
      subsArray3 = [] // deklarasi array
    for (let i = 35; i <= 126; i++) {
      subsArray123.push(String.fromCharCode(i)) // mengisi array subsArray123 dengan karakter ASCII dengan code desimal 35 sampai 126
    }
    for (let i = 32; i <= 34; i++) {
      subsArray3.push(String.fromCharCode(i)) // mengisi array subsArray3 dengan karakter ASCII dengan code desimal 32 sampai 34
    }
    this.substitutionArray = subsArray123.concat(subsArray3) // mengabungkan array subsArray123 dengan array subsArray3 ke substitutionArray
  }
}
</script>
