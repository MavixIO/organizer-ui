<script>
export default {
  props: {
    modelValue: Object,
    isStaff: Boolean,
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
    roleText() {
      return this.isStaff ? 'Role In School' : 'Role In Organization'
    },
    rolePlaceholder() {
      return this.isStaff ? 'e.g. Principal, Administrator, Teacher' : 'e.g. Owner, Head Coach, Secretary'
    },
  },
  methods: {
    async validate() {
      return this.$refs.form.validate()
    },
    update(key, value) {
      const data = value.target.value
      this.$emit('update:modelValue', { ...this.form, [key]: data })
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
      <div class="d-flex">
        <div class="w-50">
          <p class="mb-1">
            First Name
          </p>
          <v-text-field
            :model-value="form.firstname"
            :rules="[required]"
            variant="outlined"
            placeholder="Enter Your First Name"
            @input="update('firstname', $event)"
          />
        </div>
        <div class="ml-2 w-50">
          <p class="mb-1">
            Last Name
          </p>
          <v-text-field
            :model-value="form.lastname"
            :rules="[required]"
            variant="outlined"
            placeholder="Enter Your Last Name"
            @input="update('lastname', $event)"
          />
        </div>
      </div>
      <p class="mb-1">
        {{ roleText }}
      </p>
      <v-text-field
        :model-value="form.role"
        :rules="[required]"
        variant="outlined"
        :placeholder="rolePlaceholder"
        @input="update('role', $event)"
      />
      <p class="mb-1">
        Display Name
      </p>
      <v-text-field
        :model-value="form.displayName"
        :rules="[required]"
        variant="outlined"
        placeholder="e.g. Ms T Smith"
        @input="update('displayName', $event)"
      />
      <p class="mb-1">
        Phone Number
      </p>
      <v-text-field
        :model-value="form.phone"
        :rules="[required]"
        variant="outlined"
        placeholder="+1 234 567 8900"
        @input="update('phone', $event)"
      />
    </v-card>
  </v-form>
</template>

<style scoped>
</style>
