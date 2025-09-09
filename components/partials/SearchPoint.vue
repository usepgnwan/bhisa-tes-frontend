<script setup lang="ts">
import InputFloating from './input-floating.vue';
import type { Wilayah } from '~/interface';
const props = defineProps({
    placeholder: { type: String, default: "Point" },
    data : { type:  Object as PropType<Wilayah[]>  },
    value: { type: [String, Number, null] as PropType<string | number | null>, default: '' }, 
    parent_value: { type: [String, Number, null] as PropType<string | number | null>, default: '' }, 
    name: { type: String, default: '' },
}); 


const emit = defineEmits<{
  (e: 'update:value', value: string | null): void
  (e: 'update:parent_value', value: string): void
  (e: 'update:placeholder', value: string): void
  (e: 'change' ): void
}>()

const open = ref(false)

function clickMe(parent_value: any, value: any | null, placeholder: string) {
  emit('update:value', value)
  emit('update:parent_value', parent_value)
  emit('update:placeholder', placeholder)
  emit('change');
  open.value = false
}

</script>

<template>
    <UPopover v-model:open="open" :dismissible="true" :ui="{ content: 'px-2 py-4 pl-4' }"> 

    <InputFloating :readonly="true" v-model:value="props.placeholder" type="input" :id="props.name" :name="props.name" :placeholder="placeholder" :statFloat=false  ></InputFloating> 
    <template #content>
        <div class="mb-4 w-52">
        <InputFloating type="input" :id="props.name" :name="props.name" placeholder="Ketik kota, lokasi atau wilayah" :statFloat=false  ></InputFloating>  
        </div> 
        <div class="max-h-48 overflow-y-auto  w-52 text-wrap">
        <div v-if="props.data == undefined" class="p-0">
            Oops hasil tidak ditemukan
        </div>
        <div class="flex flex-col space-y-2"  v-if="props.data !== undefined">
            <div class="space-y-2" v-for="value in props.data">
                <div class="flex space-x-2  items-center cursor-pointer" @click="clickMe(value.id, null, value.title )" :class="props.placeholder == value.title ? 'bg-pool-400 text-white px-1 rounded-lg': ''">
                    <UIcon name="i-ri-building-line" class="w-6 h-6 " :class="props.placeholder == value.title ? '  text-white': 'text-pool-400'"></UIcon>
                    <div class="font-semibold space-y-0 flex flex-col">
                    <span>{{ value.title }}</span>
                    <small>Semua Titik Lokasi</small>
                    </div>
                </div>
                <div class="flex flex-col space-y-1.5 pl-3" v-for="v in value.points">
                    <div class="flex space-x-2 items-center cursor-pointer" @click="clickMe(value.id, v.id, v.title )" :class="props.placeholder == v.title ? 'bg-pool-400 text-white px-1 rounded-lg': ''">
                        <UIcon name="i-eva-pin-fill" class="w-5 h-5 "  :class="props.placeholder == v.title ? '  text-white': 'text-pool-400'"></UIcon>
                        <div class="  space-y-0 flex flex-col">
                            <span>{{ v.title }}</span>
                            <small class="line-clamp-1">{{ v.alamat }}</small>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        </div>
    </template>
</UPopover>
</template>