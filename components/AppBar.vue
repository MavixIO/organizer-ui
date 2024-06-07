<script setup>
const contextStore = useContextStore()
await contextStore.fetchContext()
const me = contextStore.me

const name = computed(() => me.displayName || '')
const email = computed(() => me.email || '')
</script>

<template>
  <v-app-bar
    height="90"
    flat
  >
    <div class="search-bar ml-10">
      <client-only>
        <v-text-field
          variant="outlined"
          density="compact"
          hide-details
          placeholder="Search"
          rounded="xl"
        >
          <template #prepend-inner>
            <SvgoSearch
              width="20"
              height="20"
            />
          </template>
        </v-text-field>
      </client-only>
    </div>
    <template #append>
      <v-btn
        class="mr-2"
        icon
        variant="outlined"
        size="small"
        color="neutral-200"
      >
        <SvgoHelpCircle
          width="20"
          height="20"
        />
      </v-btn>
      <v-btn
        class="mr-8"
        icon
        variant="outlined"
        size="small"
        color="neutral-200"
      >
        <SvgoNotification02
          width="20"
          height="20"
        />
      </v-btn>

      <v-avatar class="mr-3">
        <v-img
          alt="Profile"
          src="/img/profile.png"
        />
      </v-avatar>
      <div class="mr-15">
        <p class="name">
          {{ name }}
        </p>
        <p class="email">
          {{ email }}
        </p>
      </div>
    </template>
  </v-app-bar>
</template>

<style scoped>
.v-app-bar {
  border: 1px solid rgb(var(--v-theme-neutral-200));
  border-left: none;
  border-top: none;
}
.search-bar {
  width: 320px;
}
.name {
  font-size: 14px;
  font-weight: 600;
}
.email {
  font-size: 12px;
}
</style>
