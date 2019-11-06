<template>
  <div>
    <q-select
      v-if="!hiddenFields.includes('from')"
      v-model="email.from"
      v-bind="qSelectProps"
      :disable="disabledFields.includes('from')"
      filled
      :options="senders"
      use-chips
      stack-label
      :label="lang.qEmail.from + ':'"
    />

    <q-select
      v-model="email.to"
      v-bind="qSelectProps"
      :disable="disabledFields.includes('to')"
      :label="lang.qEmail.to + ':'"
      use-input
      use-chips
      multiple
      hide-dropdown-icon
      input-debounce="0"
      new-value-mode="add"
      @new-value="validateEmail"
    />
    <q-select
      v-if="!hiddenFields.includes('cc')"
      v-model="email.cc"
      v-bind="qSelectProps"
      :disable="disabledFields.includes('cc')"
      label="Cc:"
      use-input
      use-chips
      multiple
      hide-dropdown-icon
      input-debounce="0"
      new-value-mode="add"
      @new-value="validateEmail"
    />
    <q-select
      v-if="!hiddenFields.includes('bcc')"
      v-model="email.bcc"
      :disable="disabledFields.includes('bcc')"
      label="Bcc:"
      use-input
      use-chips
      multiple
      hide-dropdown-icon
      input-debounce="0"
      new-value-mode="add"
      @new-value="validateEmail"
    />
    <q-input
      v-model="email.subject"
      class="q-mt-md"
      :label="lang.qEmail.subject + ':'"
    />
    <q-editor
      v-model="email.body"
      v-bind="qEditorProps"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    senders: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    disabledFields: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    hiddenFields: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      lang: {
        qEmail: {}
      },
      email: {
        from: this.senders[0],
        to: [],
        cc: [],
        bcc: [],
        subject: '',
        body: ''
      }
    }
  },
  computed: {
    qEditorProps () {
      const {
        definitions,
        readonly,
        disable,
        square,
        flat,
        dense,
        dark,
        minHeight,
        maxHeight,
        height,
        toolbarOutline,
        toolbarPush,
        toolbarRounded,
        contentStyle,
        contentClass,
        fonts,
        toolbar,
        toolbarColor,
        toolbarTextColor,
        toolbarToggleColor
      } = this.$attrs
      return {
        definitions,
        readonly,
        disable,
        square,
        flat,
        dense,
        dark,
        minHeight,
        maxHeight,
        height,
        toolbarOutline,
        toolbarPush,
        toolbarRounded,
        contentStyle,
        contentClass,
        fonts,
        toolbar,
        toolbarColor,
        toolbarTextColor,
        toolbarToggleColor
      }
    },
    qSelectProps () {
      const {
        color,
        bgColor,
        dark,
        filled,
        outlined,
        borderless,
        standout,
        hideBottomSpace,
        rounded,
        square,
        dense,
        popupContentClass,
        popupContentStyle,
        inputClass,
        inputStyle
      } = this.$attrs
      return {
        color,
        bgColor,
        dark,
        filled,
        outlined,
        borderless,
        standout,
        hideBottomSpace,
        rounded,
        square,
        dense,
        popupContentClass,
        popupContentStyle,
        inputClass,
        inputStyle
      }
    },
    qInputProps () {
      const {
        color,
        bgColor,
        dark,
        filled,
        outlined,
        borderless,
        standout,
        hideBottomSpace,
        rounded,
        square,
        dense,
        inputClass,
        inputStyle
      } = this.$attrs
      return {
        color,
        bgColor,
        dark,
        filled,
        outlined,
        borderless,
        standout,
        hideBottomSpace,
        rounded,
        square,
        dense,
        inputClass,
        inputStyle
      }
    }
  },
  watch: {
    '$q.lang.isoName' (val) {
      this.__setupLang()
    }
  },
  beforeMount () {
    this.__setupLang()
  },
  methods: {
    validateEmail (email, done) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(email).toLowerCase())) {
        done(email.toLowerCase())
      } else {
        this.$q.notify({
          message: this.lang.qEmail.invalidEmailAddress,
          color: 'red'
        })
        done()
      }
    },
    send (data) {
      this.$emit('send', { email: this.email, data: data })
    },
    compose (data) {
      for (let key in data) {
        if (key in this.email) {
          this.email[key] = data[key]
        }
      }
    },
    clear () {
      this.email = {
        from: [],
        to: [],
        cc: [],
        bcc: [],
        subject: '',
        body: ''
      }
    },
    __setupLang () {
      let isoName = this.$q.lang.isoName || 'en-us'
      let lang
      try {
        lang = require(`./lang/${isoName}`)
      } catch (e) {}
      if (lang !== void 0) {
        this.lang['qEmail'] = { ...lang.default.qEmail }
      }
    }
  }
}
</script>

<style>
</style>
