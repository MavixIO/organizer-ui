<script>
import SelectRole from './Steps/SelectRole.vue'
import EmailForm from './Steps/EmailForm.vue'
import JoinSchool from './Steps/JoinSchool.vue'
import ActivateSchool from './Steps/ActivateSchool.vue'
import CreateSchool from './Steps/CreateSchool.vue'
import PersonalDetails from './Steps/PersonalDetails.vue'

export default {
  components: { SelectRole, EmailForm, JoinSchool, ActivateSchool, CreateSchool, PersonalDetails },
  emits: ['sendRequest', 'sendMagicLink'],
  data: () => ({
    form: { role: 'coordinator', school: {}, user: {} },
    step: 0,
    hasSchool: false,
    hasUser: false,
  }),
  methods: {
    prevStep() {
      this.step = this.step > 0 ? this.step - 1 : 0
    },
    async nextStep() {
      if (this.step === 1) {
        const { valid } = await this.$refs.emailForm.validate()
        if (!valid) return
      }
      else if (this.step === 2 && this.hasSchool && this.hasUser) {
        this.$emit('sendRequest')
        return
      }
      else if (this.step === 2 && !this.hasSchool) {
        const { valid } = await this.$refs.schoolForm.validate()
        if (!valid) return
      }
      else if (this.step === 3) {
        const { valid } = await this.$refs.userForm.validate()
        if (!valid) return
        this.$emit('sendMagicLink', this.form.email)
        return
      }
      this.step += 1
    },
  },
}
</script>

<template>
  <div>
    <SelectRole
      v-if="step === 0"
      v-model="form.role"
    />
    <EmailForm
      v-if="step === 1"
      ref="emailForm"
      v-model="form.email"
      @submit="nextStep"
    />
    <section v-if="step === 2">
      <section v-if="hasSchool">
        <JoinSchool v-if="hasUser" />
        <ActivateSchool v-else />
      </section>
      <CreateSchool
        v-else
        ref="schoolForm"
        v-model="form.school"
      />
    </section>
    <PersonalDetails
      v-if="step === 3"
      ref="userForm"
      v-model="form.user"
      :show-first-last-name="hasSchool"
    />

    <hr class="my-10">
    <div class="d-flex justify-space-between">
      <v-btn
        variant="text"
        class="px-0"
        @click="prevStep"
      >
        <SvgoArrowLeft
          width="20"
          height="20"
        />
        <span class="ml-1 text-gray">Back</span>
      </v-btn>
      <div
        v-if="step === 2 && hasSchool"
        class="d-flex"
      >
        <v-btn
          variant="text"
          class="mr-2"
        >
          <span class="text-gray">That Is Not My School</span>
        </v-btn>
        <v-btn
          v-if="hasUser"
          color="primary"
          rounded="xl"
          @click="nextStep"
        >
          <span class="mr-1">Request To Join</span>
          <SvgoEmailForward
            width="20"
            height="20"
          />
        </v-btn>
        <v-btn
          v-else
          color="primary"
          rounded="xl"
          @click="nextStep"
        >
          <SvgoCheck
            width="20"
            height="20"
          />
          <span class="ml-1">Activate School Account</span>
        </v-btn>
      </div>
      <v-btn
        v-else
        color="primary"
        rounded="xl"
        @click="nextStep"
      >
        <span class="mr-1">Next</span>
        <SvgoArrowRight
          width="20"
          height="20"
        />
      </v-btn>
    </div>
  </div>
</template>
