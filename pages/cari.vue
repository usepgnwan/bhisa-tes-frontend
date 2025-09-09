<script setup lang="ts">
import * as btn from "~/components/partials/button";
const route = useRoute()
// console.log()
let token = route.query._token;
 
let status = true;
let data = ref({});
try{
    let decrypt = usePayloadData(token, false).payload;
    // console.log(decrypt);
    data.value = decrypt;
    status = true
}catch(e){
    status = false;
    data.value = {};
}

const items = ref<StepperItem[]>([
  {
    title: 'Buah Batu',
    description: '09:00',
    // icon: 'i-lucide-house'
  },
  {
    title: 'Tol km 25',
    description: '12:00',
    // icon: 'i-lucide-truck'
  }, 
  {
    title: 'Sarinah',
    description: '2:00',
    // icon: 'i-lucide-truck'
  },
 
])
</script>

<template>
    <section class="min-h-[600px] flex justify-center items-center flex-col space-y-3" v-if="!status">
        <UIcon name="i-mdi-note-search-outline" class="w-32 h-32 text-gray-500"></UIcon>
        <p class="text-gray-500">
           Jadwal Tidak Ditemukan
        </p>
    </section>
    <section class="mt-[100px] max-w-11/12 mx-auto  p-4">
        <div class="flex space-x-8 ">
            <div class="w-3/4 space-y-5">
                <div class="flex space-x-3">
                    <div class="px-6 rounded-2xl border border-gray-300 py-1.5">
                        Harga Terendah
                    </div>
                    <div class="px-6 rounded-2xl border border-gray-300 py-1.5">
                        00:00 - 05:59
                    </div>
                    <div class="px-6 rounded-2xl border border-gray-300 py-1.5">
                        06:00 - 12:59
                    </div>
                    <div class="px-6 rounded-2xl border border-gray-300 py-1.5">
                        01:00 - 06:59
                    </div>
                    <div class="px-6 rounded-2xl border border-gray-300 py-1.5">
                        07:00 - 11:59
                    </div>
                </div>
                 
                <div class="px-2 font-semibold">
                    Menampilkan 15 Jadwal Tersedia Travel {{ data.titik_awal_placeholder ?? '-'}} ke {{ data.titik_akhir_placeholder ?? '-'}}
                </div>
                <div class="space-y-5 w-full flex flex-col">
                    <div class="bg-[#fafafa] shadow-sm border border-[#f0ecece2] rounded-2xl py-4 p-8 space-y-4">
                        <p>Keberangkatan jam <b>4:00</b> Estimasi 2 jam 30 menit</p>
                        <div class="flex space-x-4 items-center">
                            <div class="w-1/5 ">
                                <div class="flex space-x-2 items-center shadow rounded-2xl p-3 bg-red-700 text-white">

                                    <UIcon name="i-icon-park-outline-tour-bus" class="text-3xl"/> 
                                    <UIcon name="i-icon-park-outline-dot" class="text-lg"/> 
                                    <small>Bhisa Shuttle</small>
                                </div>
                            </div>
                            <div class="w-4/5">
                                <UStepper :items="items" class="w-full" />
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <div class="flex space-x-6 items-center">
                                <p class="text-xl">Rp.250.000</p> 
                                <btn.primary>Pesan Sekarang</btn.primary> 
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="space-y-5 w-full flex flex-col">
                    <div class="bg-[#fafafa] shadow-sm border border-[#f0ecece2] rounded-2xl py-4 p-8 space-y-4">
                        <p>Keberangkatan jam <b>4:00</b> Estimasi 2 jam 30 menit</p>
                        <div class="flex space-x-4 items-center">
                            <div class="w-1/5 ">
                                <div class="flex space-x-2 items-center shadow rounded-2xl p-3 bg-red-700 text-white">

                                    <UIcon name="i-icon-park-outline-tour-bus" class="text-3xl"/> 
                                    <UIcon name="i-icon-park-outline-dot" class="text-lg"/> 
                                    <small>Cititrans Shuttle</small>
                                </div>
                            </div>
                            <div class="w-4/5">
                                <UStepper :items="items" class="w-full" />
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <div class="flex space-x-6 items-center">
                                <p class="text-xl">Rp.250.000</p> 
                                <btn.primary>Pesan Sekarang</btn.primary> 
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="space-y-5 w-full flex flex-col">
                    <div class="bg-[#fafafa] shadow-sm border border-[#f0ecece2] rounded-2xl py-4 p-8 space-y-4">
                        <p>Keberangkatan jam <b>4:00</b> Estimasi 2 jam 30 menit</p>
                        <div class="flex space-x-4 items-center">
                            <div class="w-1/5 ">
                                <div class="flex space-x-2 items-center shadow rounded-2xl p-3 bg-red-700 text-white">

                                    <UIcon name="i-icon-park-outline-tour-bus" class="text-3xl"/> 
                                    <UIcon name="i-icon-park-outline-dot" class="text-lg"/> 
                                    <small>Baraya Shuttle</small>
                                </div>
                            </div>
                            <div class="w-4/5">
                                <UStepper :items="items" class="w-full" />
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <div class="flex space-x-6 items-center">
                                <p class="text-xl">Rp.250.000</p> 
                                <btn.primary>Pesan Sekarang</btn.primary> 
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div class=" w-1/4 ">
                <div class="shadow-sm p-4 rounded-2xl sticky top-28 space-y-5">
                    <div class="font-semibold">
                        Travel dari {{ data.titik_awal_placeholder ?? '-'}} Ke {{ data.titik_akhir_placeholder ?? '-'}}
                    </div>
                    <div class="px-4 rounded-2xl border-gray-300 py-1.5 flex items-center space-x-2">
                        <div class="bg-gradient-to-b from-[#e63320] to-[#e63320]/55 text-lg text-white p-4 rounded-xl text-center"> 
                            {{ data.jumlah_penumpang ?? '-' }}
                            <small>seat</small>
                        </div>
                        <div class=" flex flex-col space-y-3 w-4/5 pl-4">
                            <div>
                                <p>
                                    Pergi
                                </p> 
                                 <small>
                                    {{
                                        data.tanggal_berangkat
                                        ? new Date(data.tanggal_berangkat).toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            })
                                        : "-"
                                    }}
                                </small>
                            </div>
                            <hr class="w-full border-gray-300" v-if="data.tanggal_pulang !== undefined && data.tanggal_pulang !== ''">
                            <div v-if="data.tanggal_pulang !== undefined && data.tanggal_pulang !== ''">
                                <p>
                                    Pulang
                                </p>
                                <small>
                                    {{
                                        data.tanggal_pulang
                                        ? new Date(data.tanggal_pulang).toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            })
                                        : "-"
                                    }}
                                    </small>
                            </div>
                        </div>
                    </div>
                    <div >
                        <btn.primary class="w-full">
                            <div class="px-4 w-full flex items-center justify-center space-x-3  text-lg">
                                <UIcon name="i-material-symbols-search-rounded text-2xl"></UIcon>
                                <span>Ubah pencarian</span>
                            </div>
                        </btn.primary>
                    </div>
                </div>
           </div>
        </div>
    </section>
</template>