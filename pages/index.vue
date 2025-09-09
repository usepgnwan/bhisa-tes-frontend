
<script lang="ts" setup>
import * as btn from "~/components/partials/button";
</script>
<template>
  <div class="space-y-14">  
    <section class="relative w-full lg:h-[600px] -mt-[80px] flex max-lg:flex-col justify-center items-start ">
      <div class="lg:absolute h-[480px] inset-0 w-full object-cover  rounded-b-[100px]  bg-gradient-to-b from-[#e63320] to-[#e63320]/55">
        <div class="w-full h-full relative rounded-b-[100px] overflow-hidden"> 
          <NuxtImg src="/file/img/pattern.png" class="absolute -top-24 rotate-45 -right-14 opacity-35 w-96  "></NuxtImg>
          <NuxtImg src="/file/img/pattern.png" class="absolute -bottom-10 -left-10 opacity-35  w-96 "></NuxtImg>

          <div class="absolute z-30 -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2  text-center pt-20 max-lg:pt-0 space-y-5">
            <h2 class="text-5xl text-white max-lg:text-2xl">  
              Temukan tujuanmu bersama  <span class="text-black ">Bhisa</span>
            </h2>
            <h4 class="text-gray-200 text-xl  max-lg:text-lg max-md:text-sm">
              Berkomitmen memberikan layanan yang terbaik. Daftar untuk mendapat poin membership! 
            </h4>
          </div>
        </div>
      </div>
      <div class="lg:absolute z-30 lg:bottom-10 max-lg:mx-auto max-lg:-mt-36 rounded-3xl bg-white w-[80%] max-w-7xl shadow flex justify-between items-center p-6 min-h-28">
        <FilterTiket></FilterTiket>
      </div>
    </section>
 
    <section class="   max-w-11/12 mx-auto  p-4 space-y-3"> 
      <h4 class="text-2xl font-semibold">Promo Hari ini</h4>
      <div class="grid grid-cols-6 gap-4 max-lg:grid-cols-2">
        <div class="shadow-sm border border-gray-200 rounded-2xl p-4 space-y-4" v-for="value in Array(6)">
            <div>
              <p class="text-gray-400 line-through">Rp.300000 </p>
              <p>Rp.200000 </p>
            </div>
            <div class="flex flex-col mb-3">
              <div class="relative border-l border-dashed min-h-20">
                <UIcon name="i-icon-park-outline-dot" class="text-lg absolute -top-1.5 -left-2.5 text-blue-900"/>
                <div class="absolute -top-1.5 px-2">
                  <p  >Bandung</p>
                  <p class="text-xs">10:00 </p>
                  <p class="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit.  </p>
                </div>
              </div>
              <div class="relative border-l border-dashed min-h-20">
                <UIcon name="i-icon-park-outline-dot" class="text-lg absolute  bottom-11 -left-2.5 text-blue-900"/>
                  <div class="absolute -bottom-1.5 px-2">
                    <p  >Jakarta</p>
                    <p class="text-xs">03:00 </p>
                    <p class="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit.  </p>
                  </div>
              </div>
            </div>
            <div class="py-1">
              <btn.primary class="w-full mt-4 !justify-center">
                Pilih
              </btn.primary>
            </div>
        </div>
      </div>
    </section> 
  </div>
</template>

<style scoped></style>
