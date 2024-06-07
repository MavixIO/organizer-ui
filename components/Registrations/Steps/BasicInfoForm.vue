<script>
import { useRegContainersStore } from '~/stores/reg_containers'

export default defineNuxtComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['input'],
  async asyncData({ $pinia }) {
    const store = useRegContainersStore($pinia)
    const purposes = await store.getRegPurposes()
    return {
      purposes,
    }
  },
  data: () => ({
    selectedPurpose: '',
    selectedLabel: '',
  }),
  computed: {
    form () {
      return { ...this.modelValue || {} }
    },
  },
  methods: {
    update (key, value) {
      const data = key === 'name' ? value.target?.value : value
      this.$emit('input', { ...this.form, [key]: data })
    },
    selectPurpose (purpose) {
      this.selectedPurpose = purpose
      this.update('purposeId', purpose.id)
    },
  },
})
</script>

<template>
  <v-form>
    <v-list-item width="600">
      <template #title>
        <span class="heading-h4-semi-bold">Basic Information</span>
      </template>
      <template #subtitle>
        <span class="paragraph-medium-regular mt-2">
          Enter the essential details for your event, including the registration name and purpose, to identify and categorise your event easily.
        </span>
      </template>
    </v-list-item>

    <v-list-item width="550" class="pt-10">
      <template #title>
        <span class="heading-h6-semi-bold">Event Registration Name</span>
      </template>
      <template #subtitle>
        <span class="paragraph-medium-regular mt-2">
          Enter a unique name for your event registration. This will help you identify the event easily.
        </span>
      </template>
    </v-list-item>
    <v-text-field
      v-model="form.name"
      class="pl-4 mt-3"
      max-width="500"
      variant="outlined"
      hide-details
      placeholder="Registration Name"
      @input="update('name', $event)"
    />

    <v-list-item width="550" class="pt-10">
      <template #title>
        <span class="heading-h6-semi-bold">Purpose of Registration</span>
      </template>
      <template #subtitle>
        <span class="paragraph-medium-regular mt-2">
          Select the primary purpose of this registration. This helps categorise the event and tailor the registration process accordingly.
        </span>
      </template>
    </v-list-item>
    <div class="d-flex flex-wrap">
      <v-card
        v-for="purpose in purposes"
        :key="purpose.id"
        width="210"
        height="134"
        class="pa-4 ma-2"
        :class="{ selected: purpose.id === selectedPurpose.id }"
        variant="outlined"
        @click="selectPurpose(purpose)"
      >
        <v-img :src="purpose.icon" width="32" height="32" />
        <p class="text-neutral-700 mt-2 name">{{ purpose.name }}</p>
        <p class="text-neutral-500 text-body-2">{{ purpose.description }}</p>
      </v-card>
    </div>

    <section v-if="selectedPurpose">
      <v-list-item width="550" class="pt-10">
        <template #title>
          <span class="heading-h6-semi-bold">Organisation Method</span>
        </template>
        <template #subtitle>
          <span class="paragraph-medium-regular mt-2">
            Select the method for participant registration in this event. This choice will define how participants are grouped and categorised.
          </span>
        </template>
      </v-list-item>
      <v-radio-group v-model="selectedLabel" @update:model-value="update('labelId', $event)">
        <v-radio v-for="label in selectedPurpose.subRegistrationLabels" :key="label.id" :value="label.id">
          <template #label>
            <v-list-item width="600">
              <template #title>
                <span class="paragraph-medium text-black">{{ label.name }}</span>
              </template>
              <template #subtitle>
                <span class="paragraph-small-regular">
                  {{ label.description }}
                </span>
              </template>
            </v-list-item>
          </template>
        </v-radio>
        <v-radio value="none">
          <template #label>
            <v-list-item width="600">
              <template #title>
                <span class="paragraph-medium text-black">None</span>
              </template>
              <template #subtitle>
                <span class="paragraph-small-regular">
                  Choose this if you do not want to subdivide participants into groups or categories.
                </span>
              </template>
            </v-list-item>
          </template>
        </v-radio>
      </v-radio-group>
    </section>
  </v-form>
</template>

<style scoped>
.selected {
  border: 1px solid rgb(var(--v-theme-primary));
}
</style>
