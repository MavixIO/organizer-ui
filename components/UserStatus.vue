<script setup>
import { UserStatus } from '~/enums'

const userStatus = {
  A: 'Active',
  I: 'Inactive',
  P: 'Pending',
}
const props = defineProps({
  value: {
    type: String,
    default: 'INACTIVE',
  },
})

const status = computed(() => userStatus[props.value])
const isActive = computed(() => props.value === UserStatus.ACTIVE)
const isInactive = computed(() => props.value === UserStatus.INACTIVE)
</script>

<template>
  <div class="status" :class="{ active: isActive, inactive: isInactive }">
    {{ status }}
  </div>
</template>

<style scoped>
.status {
  border-radius: 15px;
}
.active {
  color: #16A34A;
  border: 1px #BBF7D0 solid;
  background-color: #F0FDF4;
}
.inactive {
  color: #D97706;
  border: 1px #FDE68A solid;
  background-color: #FFFBEB;
}
</style>