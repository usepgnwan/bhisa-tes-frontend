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
                     Pilih Metode Pembayaran
                </div>
                 
                <div class="space-y-5 w-full flex flex-col">
                    <div class="bg-[#fafafa] shadow-sm border border-[#f0ecece2] rounded-2xl py-4 p-8 space-y-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam architecto soluta similique cupiditate non vel neque, quae eius laboriosam earum velit commodi accusamus! Tempore at facilis dolore officiis earum doloremque? Veniam quaerat vitae totam consectetur nobis, voluptas possimus impedit ipsa. Ab illum quod quaerat ea assumenda aliquam numquam, praesentium accusantium, quas nesciunt, consectetur fugit corporis autem saepe fuga porro voluptates magni delectus facilis laborum obcaecati? Exercitationem minus cum similique? Sequi maxime minus, ab cupiditate fuga consectetur accusamus molestiae debitis ipsum magni nobis necessitatibus ullam vitae perferendis id velit quam officiis facere quae deserunt doloremque? Omnis veritatis eveniet vero aliquam blanditiis quaerat, animi sunt eos tempora mollitia similique quasi. At blanditiis voluptatibus laborum beatae? Corporis repellendus excepturi beatae accusantium consequuntur iusto fuga possimus hic dolorum, explicabo ea, neque illo atque a incidunt aliquam pariatur veritatis, voluptates dolore sequi amet necessitatibus. Aut alias perspiciatis odit illum quasi accusantium quas at ab molestias exercitationem, praesentium cumque repellendus, ducimus tempora, tempore sit maxime nesciunt quibusdam architecto labore possimus. Fugiat nobis quo et quis corrupti cupiditate est aut eligendi minus dolorem omnis inventore delectus labore maxime ex tenetur eveniet facere aspernatur recusandae voluptas, esse unde sit fugit ab. Mollitia laudantium delectus molestias, ad repellendus ullam odit, quasi dignissimos voluptatum quae inventore excepturi quo accusantium asperiores vero! Cumque sunt eos corporis repellat delectus rem vero optio perspiciatis! Dolore hic vel, expedita et nobis aut, laudantium mollitia, perspiciatis magni cumque quae deleniti doloremque porro eum! Repellendus ipsa fugit inventore velit tempore exercitationem aperiam rerum itaque ut excepturi ipsam, ex vel laudantium officiis quas, ratione labore sit nisi vitae, illum maiores libero ducimus. Praesentium doloribus eos accusamus quae ab mollitia nostrum esse, cupiditate quod ullam quisquam sint alias natus, hic quam corrupti sequi iure culpa voluptatum nesciunt! Nisi suscipit, obcaecati architecto ratione molestiae voluptate! Nostrum, aliquam doloremque ratione repellendus itaque illum veniam perspiciatis quis fuga quo officiis fugit aliquid illo. Ducimus voluptatem quos cumque voluptas minus illum cupiditate nihil provident, dolorem libero corrupti, placeat alias voluptatum tempora eveniet nulla? Perspiciatis modi, velit totam unde quisquam nisi autem hic optio sit officiis at facere natus fuga recusandae. Neque, recusandae molestiae corrupti maiores harum vel, earum, porro quae aspernatur perferendis qui nihil rem quisquam. Corporis, maiores dolore natus repudiandae debitis explicabo dolores doloribus veniam voluptas alias obcaecati tenetur magni, quia hic delectus sequi nemo quidem officiis quasi? Cum aspernatur odio quaerat magni odit necessitatibus enim, ullam, repellendus veritatis corporis omnis soluta, explicabo sint autem. Ipsam sed officiis perspiciatis sapiente veritatis tempore doloribus necessitatibus, nam quibusdam provident eum. Accusamus mollitia debitis distinctio veniam ut facere quas obcaecati, quod possimus exercitationem incidunt dicta, quibusdam fugit eius facilis odio eum earum officia non ullam soluta odit inventore natus placeat! Eius aut modi quas repellendus? Quia architecto illo aspernatur eaque voluptates id accusantium repudiandae quibusdam voluptate obcaecati. Ipsa blanditiis maiores, esse autem sint consequatur cumque, similique, officiis nam fuga porro. Eaque eligendi inventore, veniam sapiente a distinctio doloribus dignissimos animi officiis dolores voluptatibus molestiae placeat saepe praesentium labore, nihil provident, delectus quidem. Architecto provident eum quod impedit beatae. Sint, vitae voluptates reiciendis numquam dolorem ex? Nobis aperiam, eveniet cum saepe numquam quae atque quibusdam pariatur officia laboriosam ex itaque autem unde alias adipisci quos voluptatem incidunt. Illum quod at obcaecati ratione rerum quae dolor explicabo repellat, quaerat aliquid, sunt hic amet molestiae nam iste maxime modi ipsa recusandae deserunt repudiandae quia quas alias voluptas? Qui a reprehenderit sed earum quasi aspernatur quidem pariatur temporibus, est amet optio perspiciatis architecto et rem sequi culpa nostrum, inventore consectetur, distinctio doloremque sapiente eligendi eos! Quam autem facilis ipsam, sequi reiciendis, harum praesentium tempore, neque illo est labore quae quaerat. Quod, suscipit! Sint optio explicabo, eveniet fugit temporibus consectetur dolorem amet quibusdam, animi dolore aliquid! Iusto nostrum repellendus voluptatem enim ex ullam sunt doloremque fuga placeat accusantium vel cupiditate, molestias dolores totam fugit omnis itaque. Quod voluptate corrupti unde beatae nam rerum vel doloremque maxime explicabo optio! Placeat doloribus accusantium obcaecati, alias expedita laborum asperiores sunt iste dolore nobis fuga modi in sed voluptatem quia vero quos ullam laboriosam consectetur reprehenderit cupiditate similique, necessitatibus molestiae voluptas! Veritatis alias recusandae id. Alias, non optio laudantium impedit repellat tempore quidem sequi rem praesentium magni, nisi deserunt! Quos nulla saepe quaerat in autem similique ratione sapiente vitae, placeat facere deserunt dicta nisi veniam suscipit ipsum ipsam doloremque asperiores est tempora. Distinctio officiis eveniet qui perspiciatis incidunt rerum neque suscipit. Consectetur aspernatur esse illo nam accusamus atque mollitia porro quae. Nisi distinctio eveniet veniam sunt iste ratione reprehenderit, illum vitae omnis facilis tempore eius ad accusantium! Dolorum tempora a modi numquam, deleniti quisquam praesentium perspiciatis vel id sint provident neque culpa delectus architecto nisi, corporis ad obcaecati quam consectetur labore? Ab molestias mollitia, nesciunt labore doloribus suscipit vitae ducimus laboriosam! Optio quidem eius porro! Magni accusamus, dolore laudantium at, consequuntur esse quo adipisci similique repellat, laboriosam nihil ipsa? Consequuntur quam, eveniet eos neque quisquam vitae labore odio suscipit aliquam laboriosam, quas qui commodi voluptates hic soluta? Incidunt perferendis, enim earum dolorum distinctio, possimus quibusdam eum a, fuga doloremque consectetur. Officiis quos aliquam ullam possimus molestias, laudantium excepturi culpa quasi voluptates, hic fugit, illum molestiae nemo natus. Voluptate officia natus ipsam incidunt minus quos cumque ut iusto dolor saepe sapiente animi nam, voluptatum nesciunt qui dolores magni totam ullam obcaecati, repellat commodi enim asperiores impedit atque. Quidem distinctio ut dolores error aperiam! Qui, dignissimos voluptatem fuga unde autem modi aut earum velit. Facilis odit voluptatem reprehenderit unde quas quisquam, amet laborum itaque debitis quaerat, officia autem molestiae assumenda eos ipsam, voluptates delectus? Voluptatem, ut maiores. Enim similique fugiat soluta porro autem eius ducimus repellat, ab maiores excepturi incidunt reiciendis, labore neque architecto. Ut placeat fugit amet voluptatum iste, repellendus facere nostrum ex voluptate laborum consectetur neque labore in. Asperiores repellendus omnis placeat! Maiores, repellat aspernatur! Nihil veniam distinctio fugiat voluptas inventore dicta ullam eum, modi explicabo officia in consequuntur! Quae dolor inventore saepe laudantium? Deserunt quia ea exercitationem amet quibusdam? Modi dolorem rerum fugit ipsa, doloremque eius iure praesentium illum porro, cumque at!
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
                            <UIcon name="i-icon-park-outline-dot" class="text-lg absolute -top-1.5 -left-2.5 text-blue-900"/>
                            <div class="absolute -top-1.5 px-2">
                            <p  >{{ data.titik_awal_placeholder ?? '-'}} </p>
                            <p class="text-xs">10:00 </p>
                            <p class="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit.  </p>
                            </div>
                        </div>
                        <div class="relative border-l border-dashed min-h-20">
                            <UIcon name="i-icon-park-outline-dot" class="text-lg absolute  bottom-11 -left-2.5 text-blue-900"/>
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
                                <span>Bayar Sekarang</span>
                            </div>
                        </btn.primary>
                         
                    </div>
                </div>
           </div>
        </div>
    </section>
</template>