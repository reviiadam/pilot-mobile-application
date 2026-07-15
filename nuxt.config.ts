// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-08-01",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vite-pwa/nuxt"],

  css: ["~/assets/scss/main.scss"],

  app: {
    head: {
      title: "Susi Air - Pilot Companion",
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
      meta: [
        { name: "theme-color", content: "#0e2138" },
        {
          name: "description",
          content:
            "A daily companion for Susi Air pilots logbooks and schedules.",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/icons/favicon.ico",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Susi Air - Pilot Companion",
      short_name: "Susi Air Crew",
      description: "Susi Air pilots logbooks and schedules",
      theme_color: "#0f172a",
      background_color: "#0f172a",
      display: "standalone",
      orientation: "portrait",
      start_url: "/",
      icons: [
        { src: "/icons/favicon.ico", sizes: "192x192", type: "image/png" },
        { src: "/icons/favicon.ico", sizes: "512x512", type: "image/png" },
        {
          src: "/icons/favicon.ico",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"],
    },
    devOptions: {
      enabled: false,
    },
  },

  typescript: { shim: false },
});
