<template>
  <div>
    <v-card
      v-if="!eValue"
      class="d-flex flex-column justify-center align-center pb-2"
      variant="outlined"
      @drop.prevent="onDrop"
      @dragover.prevent
    >
      <SvgoUpload
        class="ma-3"
        width="32"
        height="32"
      />
      <p class="font-weight-bold">
        <span
          class="text-primary cursor-pointer"
          @click="select()"
        >Upload a file</span> or drag and drop
      </p>
      <p class="text-gray">
        PNG, JPG, GIF upto 5MB
      </p>
    </v-card>
    <div
      v-else
      class="preview"
    >
      <ImagePreview :value="eValue" />
      <v-btn
        icon
        size="small"
        color="grey-darken-2"
        @click="remove()"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useHelperStore } from '~/stores/helper'

export default {
  name: 'ImageSelect',
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  emits: ['input'],
  computed: {
    eValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    ...mapActions(useHelperStore, ['compressImage']),
    select() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/jpg, image/png, image/webp'
      input.multiple = true
      document.body.appendChild(input)
      input.onchange = async ({ target }) => {
        const compressedImage = await this.compressImage({ file: target.files[0] })
        this.eValue = compressedImage
        document.body.removeChild(input)
      }

      input.click()
    },

    async onDrop(e) {
      if (e.dataTransfer.files.length && 'image/jpg, image/jpeg, image/png, image/webp'.includes(e.dataTransfer.files[0].type)) {
        const compressedImage = await this.compressImage({ file: e.dataTransfer.files[0] })
        this.eValue = compressedImage
      }
    },

    remove() {
      this.eValue = null
    },
  },
}
</script>

<style lang="scss" scoped>
.preview {
  width: 150px;
  position: relative;
  .v-btn {
    position: absolute;
    right: -15px;
    top: -15px;
  }
}
</style>
