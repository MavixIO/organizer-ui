<script lang="ts">
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    },
    email: {
      type: String,
      default: 'example@email.com',
    },
  },
}
</script>

<template>
  <div class="main">
    <v-img
      src="/img/email-sent.png"
      height="64"
      width="64"
    />
    <section v-if="type === 1">
      <h1>
        Request Sent
      </h1>
      <p class="text-gray mb-7">
        Your request to join has been successfully submitted. We will email you once your permission is granted. Thank you for your patience!
      </p>
      <p class="text-gray mb-6">
        If you encounter any issues or if there is a problem with your school's admin account, please contact us for assistance.
      </p>
      <NuxtLink class="text-primary font-weight-bold">
        Contact Support
      </NuxtLink>
    </section>
    <section v-else>
      <h1>
        You're Almost There
      </h1>
      <p class="text-gray mb-7">
        We've just sent a magic link to your email at <b>{{ email }}</b>. Click the link to log in securely.
      </p>
      <NuxtLink class="text-primary font-weight-bold mt-7">
        Didn't receive the email? Resend Link
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.main {
  padding-right: 7em;
}
</style>
