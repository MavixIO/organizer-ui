<script>
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
    async validate() {
      return this.$refs.form.validate()
    },
    update(key, value) {
      this.$emit('update:modelValue', { ...this.form, [key]: value })
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
      Create School Account
    </h1>
    <p class="text-gray mb-8">
      It looks like your school isn’t on our platform yet. Let’s get started by creating your school’s profile.
    </p>
    <v-card
      class="pa-5"
      rounded="lg"
    >
      <p class="mb-1">
        School Name
      </p>
      <v-text-field
        :model-value="form.name"
        :rules="[required]"
        variant="outlined"
        placeholder="Enter Your School Name"
      />
      <p class="mb-1">
        School Abbreviation
      </p>
      <v-text-field
        :model-value="form.abbreviation"
        :rules="[required]"
        variant="outlined"
        placeholder="E.g. ISPH"
      />
      <p class="mb-1">
        School Address
      </p>
      <v-text-field
        :model-value="form.address"
        :rules="[required]"
        variant="outlined"
        placeholder="Enter the address where your school is located"
      />
      <p class="mb-1">
        School Logo
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
