<script>
import { mapActions } from 'pinia'
import { useHelperStore } from '~/stores/helper'

export default {
  props: {
    modelValue: Object,
  },
  emits: ['update:modelValue'],
  setup() {
    const { required } = useValidator()
    return { required }
  },
  expose: ['validate'],
  computed: {
    form() {
      return this.modelValue
    },
  },
  methods: {
    ...mapActions(useHelperStore, ['blobToBase64']),
    async validate() {
      return this.$refs.form.validate()
    },
    async update(key, value) {
      const data = (key === 'file') ? { [key]: value } : { [key]: value.target.value }
      if (key === 'file') {
        data.logoFile = await this.blobToBase64(value)
      }
      this.$emit('update:modelValue', { ...this.form, ...data })
    },
  },
}
</script>

<template>
  <v-form
    ref="form"
    @submit.prevent
  >
    <h1 class="mb-1">
      Create Organisation Account
    </h1>
    <p class="text-gray mb-8">
      It looks like your organisation isn’t on our platform yet. Let’s get started by creating your organisations’s profile.
    </p>
    <v-card
      class="pa-5"
      rounded="lg"
    >
      <p class="mb-1">
        Organisation Name
      </p>
      <v-text-field
        :model-value="form.name"
        :rules="[required]"
        variant="outlined"
        placeholder="Enter Your Organisation Name"
        @input="update('name', $event)"
      />
      <p class="mb-1">
        Organisation Address
      </p>
      <v-text-field
        :model-value="form.address"
        :rules="[required]"
        variant="outlined"
        placeholder="Enter the address where your Organisation is located"
        @input="update('address', $event)"
      />
      <p class="mb-1">
        Organisation Logo
      </p>
      <ImageSelect
        :value="form.file"
        @input="update('file', $event)"
      />
    </v-card>
  </v-form>
</template>

<style scoped>
</style>
