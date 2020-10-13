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
            label="Encrypted text"
            label-for="decodeInput"
            description="The SHA-256 encrypted text is 64 characters long"
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
    <b-alert show variant="info" class="text-center"
      >The decryption of a 'hash' is impossible, but we can use reverse lookup
      using database</b-alert
    >
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SHA-256',
  data() {
    return {
      encodeInput: '',
      decodeInput: '',
      originalText: '',
      secretCode: '',
      originalCode: '',
      secretMessage: '',
      chrsz: 8,
      hexcase: 0
    }
  },
  methods: {
    safeAdd(x, y) {
      const lsw = (x & 0xffff) + (y & 0xffff)
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
      return (msw << 16) | (lsw & 0xffff)
    },
    s(X, n) {
      return (X >>> n) | (X << (32 - n))
    },
    r(X, n) {
      return X >>> n
    },
    ch(x, y, z) {
      return (x & y) ^ (~x & z)
    },
    maj(x, y, z) {
      return (x & y) ^ (x & z) ^ (y & z)
    },
    sigma0256(x) {
      return this.s(x, 2) ^ this.s(x, 13) ^ this.s(x, 22)
    },
    sigma1256(x) {
      return this.s(x, 6) ^ this.s(x, 11) ^ this.s(x, 25)
    },
    gamma0256(x) {
      return this.s(x, 7) ^ this.s(x, 18) ^ this.r(x, 3)
    },
    gamma1256(x) {
      return this.s(x, 17) ^ this.s(x, 19) ^ this.r(x, 10)
    },
    coreSHA256(m, l) {
      const K = new Array(
        0x428a2f98,
        0x71374491,
        0xb5c0fbcf,
        0xe9b5dba5,
        0x3956c25b,
        0x59f111f1,
        0x923f82a4,
        0xab1c5ed5,
        0xd807aa98,
        0x12835b01,
        0x243185be,
        0x550c7dc3,
        0x72be5d74,
        0x80deb1fe,
        0x9bdc06a7,
        0xc19bf174,
        0xe49b69c1,
        0xefbe4786,
        0xfc19dc6,
        0x240ca1cc,
        0x2de92c6f,
        0x4a7484aa,
        0x5cb0a9dc,
        0x76f988da,
        0x983e5152,
        0xa831c66d,
        0xb00327c8,
        0xbf597fc7,
        0xc6e00bf3,
        0xd5a79147,
        0x6ca6351,
        0x14292967,
        0x27b70a85,
        0x2e1b2138,
        0x4d2c6dfc,
        0x53380d13,
        0x650a7354,
        0x766a0abb,
        0x81c2c92e,
        0x92722c85,
        0xa2bfe8a1,
        0xa81a664b,
        0xc24b8b70,
        0xc76c51a3,
        0xd192e819,
        0xd6990624,
        0xf40e3585,
        0x106aa070,
        0x19a4c116,
        0x1e376c08,
        0x2748774c,
        0x34b0bcb5,
        0x391c0cb3,
        0x4ed8aa4a,
        0x5b9cca4f,
        0x682e6ff3,
        0x748f82ee,
        0x78a5636f,
        0x84c87814,
        0x8cc70208,
        0x90befffa,
        0xa4506ceb,
        0xbef9a3f7,
        0xc67178f2
      )
      let HASH = new Array(
        0x6a09e667,
        0xbb67ae85,
        0x3c6ef372,
        0xa54ff53a,
        0x510e527f,
        0x9b05688c,
        0x1f83d9ab,
        0x5be0cd19
      )
      let W = new Array(64)
      var a, b, c, d, e, f, g, h, i, j
      let T1, T2
      m[l >> 5] |= 0x80 << (24 - (l % 32))
      m[(((l + 64) >> 9) << 4) + 15] = l
      for (var i = 0; i < m.length; i += 16) {
        a = HASH[0]
        b = HASH[1]
        c = HASH[2]
        d = HASH[3]
        e = HASH[4]
        f = HASH[5]
        g = HASH[6]
        h = HASH[7]
        for (var j = 0; j < 64; j++) {
          if (j < 16) W[j] = m[j + i]
          else
            W[j] = this.safeAdd(
              this.safeAdd(
                this.safeAdd(this.gamma1256(W[j - 2]), W[j - 7]),
                this.gamma0256(W[j - 15])
              ),
              W[j - 16]
            )
          T1 = this.safeAdd(
            this.safeAdd(
              this.safeAdd(
                this.safeAdd(h, this.sigma1256(e)),
                this.ch(e, f, g)
              ),
              K[j]
            ),
            W[j]
          )
          T2 = this.safeAdd(this.sigma0256(a), this.maj(a, b, c))
          h = g
          g = f
          f = e
          e = this.safeAdd(d, T1)
          d = c
          c = b
          b = a
          a = this.safeAdd(T1, T2)
        }
        HASH[0] = this.safeAdd(a, HASH[0])
        HASH[1] = this.safeAdd(b, HASH[1])
        HASH[2] = this.safeAdd(c, HASH[2])
        HASH[3] = this.safeAdd(d, HASH[3])
        HASH[4] = this.safeAdd(e, HASH[4])
        HASH[5] = this.safeAdd(f, HASH[5])
        HASH[6] = this.safeAdd(g, HASH[6])
        HASH[7] = this.safeAdd(h, HASH[7])
      }
      return HASH
    },
    str2binb(str) {
      let bin = Array()
      const mask = (1 << this.chrsz) - 1
      for (var i = 0; i < str.length * this.chrsz; i += this.chrsz) {
        bin[i >> 5] |=
          (str.charCodeAt(i / this.chrsz) & mask) << (24 - (i % 32))
      }
      return bin
    },
    utf8Encode(string) {
      string = string.replace(/\r\n/g, '\n')
      let utftext = ''
      for (let n = 0; n < string.length; n++) {
        const c = string.charCodeAt(n)
        if (c < 128) {
          utftext += String.fromCharCode(c)
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192)
          utftext += String.fromCharCode((c & 63) | 128)
        } else {
          utftext += String.fromCharCode((c >> 12) | 224)
          utftext += String.fromCharCode(((c >> 6) & 63) | 128)
          utftext += String.fromCharCode((c & 63) | 128)
        }
      }
      return utftext
    },
    binb2hex(binarray) {
      const hex_tab = this.hexcase ? '0123456789ABCDEF' : '0123456789abcdef'
      let str = ''
      for (let i = 0; i < binarray.length * 4; i++) {
        str +=
          hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8 + 4)) & 0xf) +
          hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8)) & 0xf)
      }
      return str
    },
    encode() {
      this.encodeInput = this.utf8Encode(this.encodeInput)
      this.originalText = this.encodeInput
      this.secretCode = this.binb2hex(
        this.coreSHA256(
          this.str2binb(this.encodeInput),
          this.encodeInput.length * this.chrsz
        )
      )

      const data = {
        originalText: this.originalText,
        encryptedText: this.secretCode
      }

      this.encodeInput = ''

      this.$notify({
        group: 'notif',
        type: 'success',
        title: 'Text Successfully Encrypted',
        text: 'You can copy the encrypted text from secret code input field.'
      })

      axios
        .get(
          `https://vue-crypto-8ce2a.firebaseio.com/sha-256.json?orderBy="originalText"&equalTo="${data.originalText}"`
        )
        .then(response => {
          const dataString = JSON.stringify(response.data)
          const originalText = dataString.split('"')
          const duplicate = originalText[5]

          if (!duplicate) {
            axios.post(
              'https://vue-crypto-8ce2a.firebaseio.com/sha-256.json',
              data
            )
          }
        })
        .catch(error => {
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
          `https://vue-crypto-8ce2a.firebaseio.com/sha-256.json?orderBy="encryptedText"&equalTo="${this.decodeInput}"`
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
      if (this.decodeInput.length !== 64) return true
      return false
    }
  }
}
</script>

<style scoped></style>
