<script setup lang="ts">

import * as btn from "~/components/partials/button";
import { ref } from 'vue'
import InputFloating from "~/components/partials/input-floating.vue";
import type { Wilayah } from "~/interface";
 

const today = new Date().toISOString().split("T")[0]
 

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
const value = ref('')

let dataLokasi2 =ref<Wilayah[]>([])
const selectedPoint2 = ref('')
const selectedParent2 = ref('')
const selectedPlaceholder2 = ref('Pilih Tujuan')

const datalokasi =  ref<Wilayah[]>([])


const selectedPoint = ref('')
const selectedParent = ref('')
const selectedPlaceholder = ref('Pilih Keberangkatan')
function getChange(){  
  const data = datalokasi.value.map((parent) => {
 
    if (!selectedPoint.value) {
      if (parent.id !== Number(selectedParent.value)) {
        return parent
      }
      return null
    }

 
    const filteredChildren = parent.points.filter(
      (child) => child.id !== Number(selectedPoint.value)
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
  selectedPoint2.value = ""
  selectedParent2.value = ""
  selectedPlaceholder2.value = 'Pilih Tujuan' 
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

</script>
<template>
    <div class="grid grid-cols-5  lg:grid-cols-3 max-lg:grid-cols-1 gap-4 w-full">
        <div class="space-y-2 flex flex-col">
        <span >Berangkat Dari</span>
        <PartialsSearchPoint
            v-model:value="selectedPoint"
            v-model:parent_value="selectedParent"
            v-model:placeholder="selectedPlaceholder"
            :data="datalokasi" name="titik_awal" placeholder="Pilih keberangkatan"
            @change="getChange()"
            ></PartialsSearchPoint> 
        </div>
        <div class="space-y-2 flex flex-col">
        <span>Tujuan Ke</span>
        <PartialsSearchPoint 
            v-model:value="selectedPoint2"
            v-model:parent_value="selectedParent2"
            v-model:placeholder="selectedPlaceholder2"
        :data="dataLokasi2" name="titik_akhir" placeholder="Pilih Tujuan"></PartialsSearchPoint> 
        </div>
        <div class="space-y-2 flex flex-col">
        <span>Tanggal Pergi</span>
        <InputFloating type="date" :min="today" id="be" placeholder="Pilih tujuan" :statFloat=false></InputFloating>
        </div>
        <div class="space-y-2 flex flex-col">
        <span>Tanggal Pulang</span>
        <InputFloating type="date" :min="today" id="be" placeholder="Pilih tujuan" :statFloat=false></InputFloating>
        </div>
        
        <div class="space-y-2 flex flex-col">
        <span>Jumlah Penumpang</span>
        <USelect v-model="value" :items="items" class="w-full p-2" placeholder="Pilih Penumpang" />
        </div>
        <div class="col-span-5 justify-end flex max-lg:col-span-1"> 
        <btn.primary>
            <div class="py-1 px-5">
            Cari tiket
            </div>
        </btn.primary>
        </div>
    </div>
</template>