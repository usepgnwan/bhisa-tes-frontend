
<script setup>
 const emit = defineEmits(['click'])
</script>
<template>
     <button @click="$emit('click', $event)"  class="bg-pool-300 text-white px-4 py-1.5 rounded-lg hover:bg-pool-300/85 flex items-center space-x-1.5">
        <slot></slot>
     </button>
</template>
