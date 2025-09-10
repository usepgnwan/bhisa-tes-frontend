<script setup lang="ts">
import * as btn from "~/components/partials/button";
import { z } from 'zod'

const route = useRoute()
let token = route.query._token;
 
let status = true;
let data = ref({});

function getQuery(t:any | null){ 
    try{
        let decrypt = usePayloadData((t == null ? token : t), false).payload; 
        data.value = decrypt;
        status = true
    }catch(e){
        console.log(e)
        status = false;
        data.value = {};
    }
}
 
let openMe = ref(false)
const toggleOpenMe = () => {
  openMe.value = !openMe.value
}
 
watch(
  () => route.query._token,
  (newToken) => {
    if (newToken) {
      getQuery(newToken)
    }
  },
  { immediate: true }
)

interface Penumpang {
  nama: string
  kursi: number
}

interface DataForm {
  nama_pemesan: string
  email: string
  no_hp: string
  penumpang: Penumpang[]
}

let dataForm = ref<DataForm>({
  nama_pemesan: '',
  email: '',
  no_hp: '',
  penumpang: []
})


function buildSchema( ) {
 
  return z.object({
    nama_pemesan: z.string().min(1, "Nama pemesan wajib diisi"), 
    email: z.string().min(1, "Email wajib diisi"), 
    no_hp: z.string().min(1, "No hp wajib diisi"),
    penumpang: z.array(
                z.object({
                nama: z.string().min(1, "Nama penumpang wajib diisi"),
                // kursi: z.number().min(1, "Nomor kursi tidak valid")
                })
            )
  })
}

const {showToast} = useGlobal(); 
const router = useRouter()
const errors = ref<Record<string,string[]>>({})
async function submitData(){ 
    console.log(dataForm.value)
    let zschema = buildSchema();

    const result = zschema.safeParse(dataForm.value)
     
    if (!result.success) { 
        const formatted: Record<string,string[]> = {}
            
        result.error.issues.forEach((issue) => { 
            if (issue.path.length > 1) { 
            const [field, idx] = issue.path;
                if (!formatted[field]) formatted[field] = [];
                formatted[field][idx] = issue.message;
            } else { 
                formatted[issue.path[0]] = issue.message;
            }
        }); 
        errors.value = formatted
        showToast("Perikas kembali form", "warning")           
        return false
    }

    
      router.push({ path: '/payment'  , query: { _token: token }  })
}




onMounted(() => { 
  dataForm.value.penumpang = Array.from(
    { length: parseInt(data.value.jumlah_penumpang) },
    (_, i) => ({
      nama: '',    
      kursi: '', 
    })
  )
});
</script>

<template>
    <section class="min-h-[600px] flex justify-center items-center flex-col space-y-3" v-if="!status">
        <UIcon name="i-mdi-note-search-outline" class="w-32 h-32 text-gray-500"></UIcon>
        <p class="text-gray-500">
           Booking Tidak Ditemukan
        </p>
    </section>
    <section class="mt-[100px] max-w-11/12 mx-auto  p-4"  v-if="status">
   
        <div class="flex space-x-8 max-lg:grid max-lg:grid-cols-1 max-lg:space-x-0 max-lg:gap-4">
            <div class="w-3/5 space-y-5 max-lg:w-full   min-h-screen"> 
                 <div class="px-2 font-semibold">
                     Data Pemesan
                </div>
                <div class="space-y-5 w-full flex flex-col">
                    <form id="myForm" @submit.prevent="submitData">
                    <div class="bg-[#fafafa] shadow-sm border border-[#f0ecece2] rounded-2xl py-4 p-8 space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-3">
                                <p>Nama Pemesan</p>
                                <div>
                                    <PartialsInputFloating v-model:value="dataForm.nama_pemesan" :statFloat="false" id="name" name="name" placeholder="Nama Pemesan"></PartialsInputFloating>
                                    <PartialsErrorForm :status="errors.nama_pemesan !== ''" :title="errors.nama_pemesan" v-if=" errors.nama_pemesan !== undefined" />  
                                </div>
     
                            </div>
                            <div class="space-y-3">
                                <p>Nomor Hp Pemesan</p>
                                <div>
                                    <PartialsInputFloating v-model:value="dataForm.no_hp" :statFloat="false" id="no_hp" name="no_hp" placeholder="Email Pemesan"></PartialsInputFloating>
                                    <PartialsErrorForm :status="errors.no_hp !== ''" :title="errors.no_hp" v-if=" errors.no_hp !== undefined" /> 
                                </div>
                            </div>
                            <div class="space-y-3">
                                <p>Email Pemesan</p>
                                <div>
                                    <PartialsInputFloating v-model:value="dataForm.email" :statFloat="false" id="email" name="email" placeholder="Email Pemesan"></PartialsInputFloating>
                                <PartialsErrorForm :status="errors.email !== ''" :title="errors.email" v-if=" errors.email !== undefined" />
                                </div> 
                            </div>
                        </div>
                        <hr class="border border-dashed border-gray-300">
                        <div>
                            <p>Data Penumpang</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-3" v-for="(penumpang, i) in dataForm.penumpang" :key="i">
                                <p>Nama Penumpang {{ i + 1 }}</p>
                                <div>
                                    <PartialsInputFloating
                                    :statFloat="false"
                                    :id="`name_${i+1}`"
                                    :name="`name_${i+1}`" 
                                    v-model:value="penumpang.nama"
                                    :placeholder="`Nama Penumpang ${i+1}`"
                                    />

                                    <PartialsErrorForm
                                    v-if="errors.penumpang?.[i]"
                                    :status="Boolean(errors.penumpang?.[i])"
                                    :title="errors.penumpang[i]"
                                    />
                                </div>
                                </div>

                        </div>
                    </div>
                    </form>
                </div> 
                <div class="px-2 font-semibold">
                    Piih Kursi
                </div>
                <div class="space-y-5 w-full flex flex-col">
                    <div class="bg-[#fafafa] shadow-sm border border-[#f0ecece2] rounded-2xl py-4 p-8 space-y-4">
                        <div class="flex space-x-6">
                            <div class="w-4/5">
                               <div class="grid grid-cols-4 gap-4 bg-white p-6 w-5/6 rounded-2xl mx-auto text-center">
                                        <!-- baris 1 -->
                                        <div class="bg-gray-200 w-10 h-10 flex items-center justify-center">1</div>
                                        <div></div>
                                        <div></div>
                                        <div class="bg-red-500 text-white w-10 h-10 flex items-center justify-center">
                                            <UIcon name="i-ri-steering-fill"></UIcon>
                                        </div>

                                        <!-- baris 2 -->
                                        <div></div>
                                        <div class="bg-gray-200 w-10 h-10 flex items-center justify-center">2</div>
                                        <div class="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center">3</div>
                                        <div class="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center">4</div>

                                        <!-- baris 3 -->
                                        <div class="bg-gray-200 w-10 h-10 flex items-center justify-center">5</div>
                                        <div ></div>
                                        <div class="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center">6</div>
                                        <div class="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center">7</div>
                                        <!-- baris 4 -->
                                        <div class="bg-gray-200 w-10 h-10 flex items-center justify-center">8</div>
                                        <div ></div>
                                        <div class="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center">9</div>
                                        <div class="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center">10</div>
                                        <!-- baris 5 -->
                                        <div class="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center">11</div> 
                                        <div class="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center">12</div> 
                                        <div class="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center">13</div>
                                        <div class="bg-blue-800/70 text-white w-10 h-10 flex items-center justify-center">14</div> 
                                        
                                        </div>

                            </div>
                            <div class="w-1/5 space-y-2.5">
                                <div class="flex space-x-2">
                                    <span class="bg-gray-200 p-2"></span>
                                    <small>Sudah diboking</small>
                                </div>
                                <div class="flex space-x-2">
                                    <span class="bg-blue-800/70 border p-2"></span>
                                    <small>Pilihan Anda</small>
                                </div>
                                <div class="flex space-x-2">
                                    <span class="bg-white border p-2"></span>
                                    <small>Masih Kosong</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div class=" w-2/5 max-lg:w-full   ">
                <div class="shadow-sm p-4 rounded-2xl sticky top-28 space-y-5 bg-gradient-to-b from-[#e63320] to-[#e63320]/55 text-white">
                    <div class="font-semibold">
                        Detail keberangkatan
                        <!-- Travel dari {{ data.titik_awal_placeholder ?? '-'}} Ke {{ data.titik_akhir_placeholder ?? '-'}} -->
                    </div>
                    <div class="px-4 rounded-2xl border-gray-300 py-1.5 flex items-center space-x-2">
                        <div class=" text-lg  p-4 rounded-xl text-center bg-white text-black"> 
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
                    <div class="flex flex-col mb-3 px-6 py-2">
                        <div class="relative border-l border-dashed min-h-10">
                            <UIcon name="i-icon-park-outline-dot" class="text-lg absolute -top-1.5 -left-2.5 text-white"/>
                            <div class="absolute -top-1.5 px-2">
                            <p  >{{ data.titik_awal_placeholder ?? '-'}} </p>
                            <p class="text-xs">10:00 </p>
                            <p class="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit.  </p>
                            </div>
                        </div>
                        <div class="relative border-l border-dashed min-h-20">
                            <UIcon name="i-icon-park-outline-dot" class="text-lg absolute  bottom-11 -left-2.5 text-white"/>
                            <div class="absolute -bottom-1.5 px-2">
                                <p  >{{ data.titik_akhir_placeholder ?? '-'}}</p>
                                <p class="text-xs">03:00 </p>
                                <p class="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit.  </p>
                            </div>
                        </div>
                    </div>
                    
                    <hr class="border border-gray-300 my-6">
                    <div class="px-5 text-white text-2xl">
                        Rp. 200.000
                    </div>
                    <div >
 
                        <btn.primary class="w-full" @click="toggleOpenMe"  form="myForm">
                            <div class="px-4 w-full flex items-center justify-center space-x-3  text-lg">
                                <UIcon name="i-solar-wallet-broken"></UIcon> 
                                <span>Pembayaran</span>
                            </div>
                        </btn.primary>
                         
                    </div>
                </div>
           </div>
        </div>
    </section>
</template>