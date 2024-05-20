<script>
export default {
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue', 'submit'],
  expose: ['validate'],
  data: () => ({
    emailRules: [
      value => !!value || 'Email is required.',
      value => /.+@.+\..+/.test(value) || 'Email must be valid.',
    ],
  }),
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    async validate() {
      return this.$refs.form.validate()
    },
  },
}
</script>

<template>
  <v-form
    ref="form"
    @submit.prevent="$emit('submit')"
  >
    <h1 class="mb-1">
      Enter Your Email Address
    </h1>
    <p class="text-gray mb-8">
      Please use your school email so we can easily match you with your account.
    </p>
    <div class="margin-bottom">
      <p class="mb-1">
        Email
      </p>
      <v-text-field
        v-model="value"
        :rules="emailRules"
        variant="outlined"
        placeholder="Enter your email address"
      >
        <template #prepend-inner>
          <SvgoEmail
            width="20"
            height="20"
          />
        </template>
      </v-text-field>
    </div>
  </v-form>
</template>

<style scoped>
.margin-bottom {
  margin-bottom: 17em;
}
</style>
