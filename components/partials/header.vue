<script setup lang="ts">

import * as btn from "~/components/partials/button";
import { ref, onMounted, onUnmounted } from 'vue'
 

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50 // ganti angka sesuai kebutuhan
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
}) 
</script>

<template>
    <header :class="[  'fixed top-0 p-6 w-full transition-colors duration-300 z-50 ',  isScrolled ? 'bg-white text-black shadow-md' : 'bg-transparent text-white']"  >
      <div class="w-full   flex justify-end px-8">
        <ul class="flex space-x-6 items-center">
          <li>Home</li>
          <li>Outlet</li>
          <li>Kontak</li>
          <li>Cek Tiket</li>
          <li> 
            <btn.primary>Masuk</btn.primary>
          </li>
        </ul>
      </div>
    </header>
</template>