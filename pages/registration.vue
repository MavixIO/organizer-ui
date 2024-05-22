<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})
const isRequestSent = ref(false)
const email = ref('')
const type = ref(1)
function sendRequest() {
  isRequestSent.value = true
  type.value = 1
}
function sendMagicLink(value: string) {
  isRequestSent.value = true
  type.value = 2
  email.value = value
}
</script>

<template>
  <div class="d-flex h-100">
    <div class="image-container d-none d-md-flex">
      <v-img
        cover
        src="/img/bg-tennis.jpeg"
      />
    </div>
    <div class="form-container d-flex justify-center align-center">
      <RegistrationStepper
        v-if="!isRequestSent"
        @send-request="sendRequest"
        @send-magic-link="sendMagicLink"
      />
      <RegistrationRequestSent
        v-else
        :email="email"
        :type="type"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-container {
  height: 100%;
  width: 53vw;
}
.form-container {
  width: 47vw;
  > div {
    width: 80%;
  }
}
.v-img {
  height: 100%;
}
@media (max-width: 960px) {
  .form-container {
    width: 100vw;
  }
}
</style>
