<script>
import { mapStores } from 'pinia'
import SelectRole from './Steps/SelectRole.vue'
import EmailForm from './Steps/EmailForm.vue'
import JoinSchool from './Steps/JoinSchool.vue'
import JoinOrg from './Steps/JoinOrg.vue'
import CreateOrg from './Steps/CreateOrg.vue'
import CreateSchool from './Steps/CreateSchool.vue'
import PersonalDetails from './Steps/PersonalDetails.vue'
import { Role } from '~/enums'
import { useSchoolsStore } from '~/stores/schools'
import { useOrganisationsStore } from '~/stores/organisations'

export default {
  components: { SelectRole, EmailForm, JoinSchool, JoinOrg, CreateOrg, CreateSchool, PersonalDetails },
  emits: ['sendRequest', 'sendMagicLink'],
  data: () => ({
    form: { role: Role.COORDINATOR, school: {}, user: {}, org: {} },
    step: 0,
    hasSchool: false,
    hasUser: false,
    hasOrg: false,
    schools: [],
    organisations: [],
    selectedSchool: null,
    selectedOrg: null,
  }),
  computed: {
    ...mapStores(useSchoolsStore, useOrganisationsStore),
    isCoordinator() {
      return this.form.role === Role.COORDINATOR
    },
    isStaff() {
      return this.form.role === Role.STAFF
    },
    showSchool() {
      return this.isStaff && this.hasSchool
    },
    showJoinSchool() {
      return this.isStaff && this.hasSchool && this.hasUser
    },
    showActivateSchool() {
      return this.isStaff && this.hasSchool && !this.hasUser
    },
    showCreateSchool() {
      return this.isStaff && !this.hasSchool
    },
    showJoinOrg() {
      return this.isCoordinator && this.hasOrg
    },
    showCreateOrg() {
      return this.isCoordinator && !this.hasOrg
    },
    showRequestButton() {
      return this.step === 2 && (this.hasSchool || this.hasOrg)
    },
  },
  methods: {
    prevStep() {
      this.step = this.step > 0 ? this.step - 1 : 0
    },

    async nextStep() {
      if (this.step === 1) {
        const { valid } = await this.$refs.emailForm.validate()
        if (!valid) return
        const domain = this.form.email.split('@')[1]

        if (this.isStaff) {
          this.schools = await this.schoolsStore.getSchoolsByDomain(domain)
          this.hasSchool = this.schools.length > 0
        }
        else {
          this.organisations = await this.organisationsStore.getOrganisationsByDomain(domain)
          this.hasOrg = this.organisations.length > 0
        }
      }
      else if (this.step === 2 && this.showCreateSchool) {
        const { valid } = await this.$refs.schoolForm.validate()
        if (!valid) return
      }
      else if (this.step === 2 && this.showCreateOrg) {
        const { valid } = await this.$refs.orgForm.validate()
        if (!valid) return
      }
      else if (this.step === 3) {
        const { valid } = await this.$refs.userForm.validate()
        if (!valid) return

        if (this.showCreateSchool) {
          this.createSchool()
          return
        }
        else if (this.showActivateSchool) {
          await this.activateSchool()
          return
        }
        else if (this.showJoinSchool) {
          await this.requestJoinSchool()
          return
        }
        else if (this.showJoinOrg) {
          await this.requestJoinOrg()
          return
        }
        else if (this.showCreateOrg) {
          await this.createOrg()
          return
        }
      }
      this.step += 1
    },

    selectSchool(school) {
      this.selectedSchool = school
      this.hasUser = school.hasUsers
    },

    selectOrg(organisation) {
      this.selectedOrg = organisation
      this.hasOrg = organisation.hasUsers
    },

    async requestJoinSchool() {
      const data = {
        schoolId: this.selectedSchool.id,
        user: { ...this.form.user, email: this.form.email },
      }
      await this.schoolsStore.requestToJoin(data)
      this.$emit('sendRequest')
    },

    async activateSchool() {
      const data = {
        schoolId: this.selectedSchool.id,
        user: { ...this.form.user, email: this.form.email },
      }
      await this.schoolsStore.requestToJoin(data)
      this.$emit('sendMagicLink', this.form.email)
    },

    async createSchool() {
      const data = {
        displayRole: this.form.user.role,
        user: { ...this.form.user, email: this.form.email },
        school: this.form.school,
      }
      await this.schoolsStore.signup(data)
      this.$emit('sendMagicLink', this.form.email)
    },

    async requestJoinOrg() {
      const data = {
        organizationId: this.selectedOrg.id,
        user: { ...this.form.user, email: this.form.email },
      }
      await this.organisationsStore.requestToJoin(data)
      this.$emit('sendRequest')
    },

    async createOrg() {
      const data = {
        displayRole: this.form.user.role,
        user: { ...this.form.user, email: this.form.email },
        organization: this.form.org,
      }
      await this.organisationsStore.signup(data)
      this.$emit('sendMagicLink', this.form.email)
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
      <JoinSchool
        v-if="showSchool"
        :schools="schools"
        @on-select-school="selectSchool"
      />
      <CreateSchool
        v-if="showCreateSchool"
        ref="schoolForm"
        v-model="form.school"
      />
      <JoinOrg
        v-if="showJoinOrg"
        :organisations="organisations"
        @on-select-school="selectOrg"
      />
      <CreateOrg
        v-if="showCreateOrg"
        ref="orgForm"
        v-model="form.org"
      />
    </section>
    <PersonalDetails
      v-if="step === 3"
      ref="userForm"
      v-model="form.user"
      :is-staff="isStaff"
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
        v-if="showRequestButton"
        class="d-flex"
      >
        <v-btn
          v-if="isStaff"
          variant="text"
          class="mr-2"
          @click="hasSchool=false"
        >
          <span class="text-gray">That Is Not My School</span>
        </v-btn>
        <v-btn
          v-if="isCoordinator"
          variant="text"
          class="mr-2"
          @click="hasOrg=false"
        >
          <span class="text-gray">That Is Not My Org</span>
        </v-btn>

        <v-btn
          v-if="showJoinSchool || showJoinOrg"
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
          v-if="showActivateSchool"
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
