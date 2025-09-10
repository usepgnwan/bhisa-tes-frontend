// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15', 
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxt/image'],
  css: ['~/assets/css/main.css','~/assets/css/nprogress.css'],
    runtimeConfig: {
    public: {
      secretForm: process.env.PUBLIC_SECRET_FORM,
      BASE_URL: process.env.BASE_URL,
      APP_ENV: process.env.APP_ENV,
    },
    BASE_MAIN_URL: process.env.BASE_MAIN_URL, 
    SECRET_MAIN_KEY: process.env.SECRET_MAIN_KEY, 
  },
  ui:{
    colorMode:false,
  }
})

 