<template>
  <v-navigation-drawer
    width="90"
    permanent
  >
    <div class="logo-container d-flex justify-center align-center">
      <v-img
        class=""
        src="~/assets/logos/favicon.png"
        max-width="50"
        height="50"
      />
    </div>
    <v-list
      variant="outlined"
      class="d-flex flex-column align-center"
      density="compact"
      nav
      active-class="active"
    >
      <v-list-item
        :to="{ name: 'dashboard' }"
        width="56"
        height="56"
        class="d-flex justify-center align-center"
      >
        <SvgoDashboardSquare02
          class="d-flex"
          width="32"
          height="32"
        />
      </v-list-item>

      <v-list-item
        to="/events"
        width="56"
        height="56"
        class="d-flex justify-center align-center"
      >
        <template #default="{ isActive }">
          <SvgoSolidClipboard
            v-if="isActive"
            class="d-flex"
            width="32"
            height="32"
          />
          <SvgoClipboard
            v-else
            class="d-flex"
            width="32"
            height="32"
          />
        </template>
      </v-list-item>

      <v-list-item
        to="/contacts"
        width="56"
        height="56"
        class="d-flex justify-center align-center"
      >
        <template #default="{ isActive }">
          <SvgoSolidContact01
            v-if="isActive"
            class="d-flex"
            width="32"
            height="32"
          />
          <SvgoContact01
            v-else
            class="d-flex"
            width="32"
            height="32"
          />
        </template>
      </v-list-item>

      <v-list-item
        to="/finance"
        width="56"
        height="56"
        class="d-flex justify-center align-center"
      >
        <template #default="{ isActive }">
          <SvgoSolidPoundCircle
            v-if="isActive"
            class="d-flex"
            width="32"
            height="32"
          />
          <SvgoPoundCircle
            v-else
            class="d-flex pound"
            width="32"
            height="32"
          />
        </template>
      </v-list-item>

      <v-list-item
        to="/settings"
        width="56"
        height="56"
        class="d-flex justify-center align-center settings"
      >
        <template #default="{ isActive }">
          <SvgoSolidSetting05
            v-if="isActive"
            class="d-flex"
            width="32"
            height="32"
          />
          <SvgoSetting05
            v-else
            class="d-flex pound"
            width="32"
            height="32"
          />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.logo-container {
  height: 91px;
  width: 90px;
  border-bottom: 1px solid rgb(var(--v-theme-neutral-200));
}
.v-list-item--variant-outlined {
  border-color: rgb(var(--v-theme-neutral-200))
}
.active {
  background-color: rgb(var(--v-theme-primary));
  svg :deep(path) {
    stroke: none;
    fill: white;
  }
}
:deep(.v-list-item--active > .v-list-item__overlay) {
  opacity: 0;
}
.settings {
  margin-top: 333px;
}
</style>
