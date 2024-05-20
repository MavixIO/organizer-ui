<script>
import SelectRole from './Steps/SelectRole.vue'
import EmailForm from './Steps/EmailForm.vue'
import JoinOrg from './Steps/JoinOrg.vue'
import CreateOrg from './Steps/CreateOrg.vue'
import PersonalDetails from './Steps/PersonalDetails.vue'

export default {
  components: { SelectRole, EmailForm, JoinOrg, CreateOrg, PersonalDetails },
  emits: ['sendRequest', 'sendMagicLink'],
  data: () => ({
    form: { role: 'coordinator', org: {}, user: {} },
    step: 0,
    hasOrg: true,
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
      else if (this.step === 2 && this.hasOrg) {
        this.$emit('sendRequest')
        return
      }
      else if (this.step === 2 && !this.hasOrg) {
        const { valid } = await this.$refs.orgForm.validate()
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
      <JoinOrg v-if="hasOrg" />
      <CreateOrg
        v-else
        ref="orgForm"
        v-model="form.org"
      />
    </section>
    <PersonalDetails
      v-if="step === 3"
      ref="userForm"
      v-model="form.user"
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
        v-if="step === 2 && hasOrg"
        class="d-flex"
      >
        <v-btn
          variant="text"
          class="mr-2"
          @click="hasOrg=false"
        >
          <span class="text-gray">That Is Not My Org</span>
        </v-btn>
        <v-btn
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
