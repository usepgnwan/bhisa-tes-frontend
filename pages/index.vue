

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
 
    <section class="min-h-screen"> 
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti officia voluptatibus aliquam laudantium possimus harum ipsum dolorem nesciunt odit sunt nemo facilis enim beatae dolorum, et ab dolores necessitatibus itaque.
    </section>
    <footer>
      footes
    </footer>
  </div>
</template>

<style scoped></style>
