<script setup lang="ts">
let {loading } = useDataPartial(); 
console.log(loading);
</script>

<template>
 
  <div class="fixed h-screen w-full flex items-center justify-center z-10 bg-elevated/35" v-if="loading" >
      <UIcon name="i-eos-icons-bubble-loading" class="w-20 h-20 text-pool-400"></UIcon> 
  </div> 
  <PartialsHeader></PartialsHeader>
  <div> 
    <slot />
  </div>
</template>

<style scoped></style>
