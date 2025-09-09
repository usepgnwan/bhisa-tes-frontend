<script setup lang="ts">

import * as btn from "~/components/partials/button";
import { ref } from 'vue'
import InputFloating from "~/components/partials/input-floating.vue";
import type { Wilayah } from "~/interface";
import { z } from 'zod'

const today = new Date().toISOString().split("T")[0]
 const router = useRouter()

const items = ref([
  {
    label: '1 Penumpang',
    value: '1'
  },
  {
    label: '2 Penumpang',
    value: '2'
  },
  {
    label: '3 Penumpang',
    value: '3'
  },
  {
    label: '4 Penumpang',
    value: '4'
  },
  {
    label: '5 Penumpang',
    value: '5'
  },
  {
    label: '6 Penumpang',
    value: '6'
  },
  {
    label: '7 Penumpang',
    value: '7'
  },
   
])
 

let dataLokasi2 =ref<Wilayah[]>([])
 
 

const datalokasi =  ref<Wilayah[]>([])
let dataForm = ref({
  titik_awal : '',
  titik_awal_parent : '',
  titik_awal_placeholder : '',
  titik_akhir : '',
  titik_akhir_parent : '',
  titik_akhir_placeholder : '',
  tanggal_berangkat : '',
  tanggal_pulang : '',
  jumlah_penumpang : '',
});


watch(dataForm, (v)=>{
  console.log(v);
},{
  deep:true
})
 
let desk_tujuan = ref('Pilih Tujuan')
 
function getChange(){  
  const data = datalokasi.value.map((parent) => {
 
    if (!dataForm.value.titik_awal) {
      if (parent.id !== Number(dataForm.value.titik_awal_parent)) {
        return parent
      }
      return null
    }

 
    const filteredChildren = parent.points.filter(
      (child) => child.id !== Number(dataForm.value.titik_awal)
    )

 
    if (filteredChildren.length === 0) {
      return null
    }

    return {
      ...parent,
      points: filteredChildren,
    }
  })
  .filter(Boolean)  
  dataLokasi2.value = data
  dataForm.value.titik_akhir = ""
  dataForm.value.titik_akhir_parent = ""
  dataForm.value.titik_akhir_placeholder = ""
  desk_tujuan.value = "Pilih Tujuan" 
}  



import { useGlobal } from '#imports';
 
const {showToast} = useGlobal();

async function getWilayah(){
    try{ 
            let data = {
                        table : 'wilayah',
                        type_table : 'main' 
                }

            let d = await useServerApi({action:"GET",url:'/api/dd/get/data/detail/', payload:data})
            if(d.status !== 200){
                return showToast("Terjadi kesalahan", "error")
            } 
            let dt = d.data.data; 
            return dt;
            
        }catch(e){
         showToast("Terjadi kesalahan", "error") 
             return []
        }
}




onMounted(async () => {
  let d= await getWilayah();
  datalokasi.value =d;
})


// buat pp 
const isReturn = ref(false); // state checkbox
watch(isReturn, (val)=>{
  if(!val){
    dataForm.value.tanggal_pulang = null
  }
});

function buildSchema(isReturn: boolean) {
  console.log(isReturn)
  return z.object({
    titik_awal_placeholder: z.string().min(1, "Titik keberangkatan wajib diisi"), 
    titik_akhir_placeholder: z.string().min(1, "Titik tujuan wajib diisi"), 
    tanggal_berangkat: z
      .string()
      .min(1, "Tanggal berangkat wajib diisi")
      .refine((v) => !Number.isNaN(Date.parse(v)), { message: "Tanggal berangkat tidak valid" }),
    jumlah_penumpang: z
      .string()
      .min(1, "Jumlah penumpang wajib diisi")
      .refine((v) => /^\d+$/.test(v) && parseInt(v, 10) > 0, { message: "Jumlah penumpang harus dipilih" }),
 
    ...(isReturn && {
      tanggal_pulang: z
        .string()
        .min(1, "Tanggal pulang wajib diisi")
        .refine((v) => !Number.isNaN(Date.parse(v)), { message: "Tanggal pulang tidak valid" }),
    }),
  })
}

import { usePayloadData } from "~/composables/usePayloadData";
const errors = ref<Record<string,string[]>>({})
const route = useRoute();
const emit = defineEmits(['submit'])
function sendForm(){
  let zschema = buildSchema(isReturn.value).superRefine((data, ctx) => {
                                // cek konsistensi tanggal: pulang >= berangkat
                                const b = Date.parse(data.tanggal_berangkat)
                                const p = Date.parse(data.tanggal_pulang)
                                if (!Number.isNaN(b) && !Number.isNaN(p) && p < b) {
                                  ctx.addIssue({
                                    code: z.ZodIssueCode.custom,
                                    message: "Tanggal pulang tidak boleh sebelum tanggal berangkat",
                                    path: ["tanggal_pulang"],
                                  })
                                }
                              })
 
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
     
      let token = usePayloadData(dataForm.value).payload;  
      emit('submit');
      router.push({ path: '/cari', query: { _token: token } })
}

 
</script>
<template>
    <div class="grid xl:grid-cols-5 lg:grid-cols-3 max-lg:grid-cols-1 gap-1   w-full">
        <div class="space-y-2 flex flex-col">
        <span >Berangkat Dari</span>
            <PartialsSearchPoint
            v-model:value="dataForm.titik_awal"
            v-model:parent_value="dataForm.titik_awal_parent"
            v-model:placeholder="dataForm.titik_awal_placeholder"
            :data="datalokasi" name="titik_awal" 
            deskripsi="Pilih keberangkatan"
            @change="getChange()"
            ></PartialsSearchPoint> 
            <PartialsErrorForm :status="errors.titik_awal_placeholder !== ''" :title="errors.titik_awal_placeholder" v-if=" errors.titik_awal_placeholder !== undefined" />  
        </div>
        <div class="space-y-2 flex flex-col">
        <span>Tujuan Ke</span>
        <PartialsSearchPoint 
            v-model:value="dataForm.titik_akhir"
            v-model:parent_value="dataForm.titik_akhir_parent"
            v-model:placeholder="dataForm.titik_akhir_placeholder"
            :data="dataLokasi2" name="titik_akhir" 
            :deskripsi="desk_tujuan"></PartialsSearchPoint> 
         <PartialsErrorForm :status="errors.titik_akhir_placeholder !== ''" :title="errors.titik_akhir_placeholder" v-if=" errors.titik_akhir_placeholder !== undefined" />  
        </div>
        <div class="space-y-2 flex flex-col">
        <span>Tanggal Pergi</span>
        <InputFloating type="date" :min="today" id="berangkat"  v-model:value="dataForm.tanggal_berangkat" placeholder="tanggal berangkat" :statFloat=false></InputFloating>
        <PartialsErrorForm :status="errors.tanggal_berangkat !== ''" :title="errors.tanggal_berangkat" v-if=" errors.tanggal_berangkat !== undefined" />  
      </div>
        <div class="space-y-2 flex flex-col">
        <span>
          <input type="checkbox"  v-model="isReturn"> Tanggal Pulang</span>
          <InputFloating type="date" :min="today" v-model:value="dataForm.tanggal_pulang" id="pulang" placeholder="Tanggal pulang" :statFloat=false  
            :readonly="!isReturn"
            :disabled="!isReturn"
            ></InputFloating>
            <PartialsErrorForm :status="errors.tanggal_pulang !== ''" :title="errors.tanggal_pulang" v-if=" errors.tanggal_pulang !== undefined" /> 
        </div>
        
        <div class="space-y-2 flex flex-col">
        <span>Jumlah Penumpang</span>
        <USelect v-model="dataForm.jumlah_penumpang" :items="items" class="w-full p-2" placeholder="Pilih Penumpang" />
        <PartialsErrorForm :status="errors.jumlah_penumpang !== ''" :title="errors.jumlah_penumpang" v-if=" errors.jumlah_penumpang !== undefined" /> 
        </div>
        <div class="col-span-5 justify-end flex max-lg:col-span-1"> 
        <btn.primary @click="sendForm">
            <div class="py-1 px-5">
            Cari tiket
            </div>
        </btn.primary>
        </div>
    </div>
</template>