<script setup>
import BasicInfoForm from '@/components/Registrations/Steps/BasicInfoForm'
useHead({ title: 'Add Registrations' })
definePageMeta({
  middleware: ['auth'],
})
const title = ref('Create Registration')
const subtitle = ref('Let\'s get everything ready for your registration. Follow the steps to provide key details, set preferences, and customise your setup for a smooth process.')
const step = ref(1)
const form = ref({
  name: '',
})
function update (value) {
  form.value = { ...value }
}
function nextStep() {
  step.value += 1
}
</script>

<template>
  <div class="mx-10 my-10">
    <v-list-item width="700">
      <template #title>
        <span class="heading-h2-semi-bold">{{ title }}</span>
      </template>
      <template #subtitle>
        <span class="paragraph-large-regular mt-2">{{ subtitle }}</span>
      </template>
    </v-list-item>
    <v-row class="border-top mt-8">
      <v-col cols="5" class="border-right pt-8">
        <div class="d-flex justify-end">
          <RegistrationsTimelineStepper :step="step" />
        </div>
      </v-col>
      <v-col cols="7" class="pt-8 pl-14">
        <BasicInfoForm :model-value="form" @input="update" />

        <div class="d-flex justify-space-between mt-5">
          <v-btn variant="text" color="primary">
            <span class="paragraph-medium-semi-bold">Save and Continue Later</span>
          </v-btn>
          <v-btn color="primary" @click="nextStep">
            Next Step
            <template #append>
              <v-icon>mdi-arrow-right</v-icon>
            </template>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.border-top {
  border-top: 1px solid rgb(var(--v-theme-neutral-200));
}
.border-right {
  border-right: 1px solid rgb(var(--v-theme-neutral-200));
}
</style>
