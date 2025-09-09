<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

function enableScrollListener() {
  window.addEventListener("scroll", handleScroll)
  handleScroll() 
}

function disableScrollListener() {
  window.removeEventListener("scroll", handleScroll)
  isScrolled.value = true  
}

 
onMounted(() => {
  if (route.fullPath === "/") {
    enableScrollListener()
  } else {
    disableScrollListener()
  }
})
 
onUnmounted(() => {
  disableScrollListener()
})

 
watch(
  () => route.fullPath,
  (val) => {
    if (val === "/") {
      enableScrollListener()
    } else {
      disableScrollListener()
    }
  }
)
</script>


<template>
    <header :class="[  'fixed top-0 p-4 w-full transition-colors duration-300 z-50 ',  isScrolled ? 'bg-white text-black shadow-md' : 'bg-transparent text-white']"  >
      <div class="w-full   flex justify-between max-md:justify-end px-8">
        <div class="max-md:hidden">
            <NuxtLink to="/">
                 <NuxtImg src="/file/img/bhisa-logo.png" class="w-32" v-if="!isScrolled"></NuxtImg>
                 <NuxtImg src="/file/img/bhisa-logo2.png" class="w-32" v-if="isScrolled"></NuxtImg>
            </NuxtLink>
        </div>
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