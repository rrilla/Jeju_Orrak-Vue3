<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component </AppAlert>

    <!-- Alert -->
    <UAlert
      title="Heads up!"
      description="You can change the primary color in your app config."
      color="neutral"
      variant="outline"
      :actions="[
        {
          label: 'Action 1',
        },
        {
          label: 'Action 2',
          color: 'neutral',
          variant: 'subtle',
        },
      ]"
    />
  </div>
</template>
