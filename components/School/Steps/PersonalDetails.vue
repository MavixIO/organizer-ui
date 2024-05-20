<script>
export default {
  props: {
    modelValue: Object,
    showFirstLastName: Boolean,
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
      Your Personal Details
    </h1>
    <p class="text-gray mb-8">
      Now, let’s get to know you better. Please provide your personal information to set up your account
    </p>
    <v-card
      class="pa-5"
      rounded="lg"
    >
      <div
        v-if="showFirstLastName"
        class="d-flex"
      >
        <div>
          <p class="mb-1">
            First Name
          </p>
          <v-text-field
            :model-value="form.firstname"
            :rules="[required]"
            variant="outlined"
            placeholder="Enter Your First Name"
          />
        </div>
        <div>
          <p class="mb-1">
            Last Name
          </p>
          <v-text-field
            :model-value="form.lastname"
            :rules="[required]"
            variant="outlined"
            placeholder="Enter Your Last Name"
          />
        </div>
      </div>
      <div v-else>
        <p class="mb-1">
          Name
        </p>
        <v-text-field
          :model-value="form.name"
          :rules="[required]"
          variant="outlined"
          placeholder="Enter Your Full Name"
        />
      </div>
      <p class="mb-1">
        Role In School
      </p>
      <v-text-field
        :model-value="form.role"
        :rules="[required]"
        variant="outlined"
        placeholder="e.g. Principal, Administrator, Teacher"
      />
      <p class="mb-1">
        Display Name
      </p>
      <v-text-field
        :model-value="form.displayName"
        :rules="[required]"
        variant="outlined"
        placeholder="e.g. Ms T Smith"
      />
      <p class="mb-1">
        Phone Number
      </p>
      <v-text-field
        :model-value="form.phone"
        :rules="[required]"
        variant="outlined"
        placeholder="+1 234 567 8900"
      />
    </v-card>
  </v-form>
</template>

<style scoped>
</style>
