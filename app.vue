<script setup lang="ts">
  useHead({
    htmlAttrs: {
      lang: 'id',
    },
    charset: 'utf-8',
    title: 'Bhisa Tes',
    titleTemplate: title => (title !== 'Bhisa Tes' ? `${title} · usep` : title),
 
  })
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
