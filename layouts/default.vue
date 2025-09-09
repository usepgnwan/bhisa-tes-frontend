<script setup lang="ts">
let {loading } = useDataPartial(); 
console.log(loading);
</script>

<template>
 
  <div class="fixed h-screen w-full flex items-center justify-center z-10 bg-elevated/35" v-if="loading" >
      <UIcon name="i-eos-icons-bubble-loading" class="w-20 h-20 text-pool-400"></UIcon> 
  </div> 
  <PartialsHeader></PartialsHeader>
  <main> 
    <slot />
  </main>
  <footer class="p-5 text-center border-t border-t-gray-200 mt-20">
    Usep Gunawan <UIcon name="i-icon-park-outline-dot" class="text-lg"/> Tes Bhisa
  </footer>
</template>

<style scoped></style>
