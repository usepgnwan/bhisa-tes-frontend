<script setup>
   const emit = defineEmits(['click'])
</script>
<template>
     <button  @click="$emit('click', $event)" class="bg-blue-800 text-white px-4 py-1.5 rounded-lg hover:bg-blue-800/85  flex items-center space-x-1.5">
        <slot></slot>
     </button>
</template>