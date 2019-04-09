const pkg = require('./package');
import axios from 'axios';
axios.defaults.baseURL = 'https://ajaxwebapp.azurewebsites.net/wp-json';

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'AjaxTI',
    htmlAttrs: {
      lang: 'pt_BR',
      amp: undefined // "amp" has no value
    },

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Empresa de desenvolvimento de software, integradora de sistemas ERP.' },

      // The list of types is available here: http://ogp.me/#types
      {property: 'og:type', content: 'website'},
      // Should the the same as your canonical link, see below.
      {property: 'og:url', content: 'https://ajaxtiwp.netlify.com'},
      {property: 'og:image', content: 'http://ajaxwebapp.azurewebsites.net/wp-content/uploads/2019/04/logo.svg'},
      // Often the same as your meta description, but not always.
      {property: 'og:description', content: 'Empresa de desenvolvimento de software, integradora de sistemas ERP.'},

      // Twitter card
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: 'https://ajaxtiwp.netlify.com'},
      {name: 'twitter:url', content: 'https://ajaxtiwp.netlify.com'},
      {name: 'twitter:title', content: 'AjaxTI'},
      {name: 'twitter:description', content: 'Empresa de desenvolvimento de software, integradora de sistemas ERP.'},
      // Your twitter handle, if you have one.
      {name: 'twitter:creator', content: '@davipmdev'},
      {name: 'twitter:image:src', content: 'http://ajaxwebapp.azurewebsites.net/wp-content/uploads/2019/04/logo.svg'},

      // Google / Schema.org markup:
      {itemprop: 'name', content: 'Ajax Tecnologia & Inovação'},
      {itemprop: 'description', content: 'Empresa de desenvolvimento de software, integradora de sistemas ERP.'},
      {itemprop: 'image', content: 'http://ajaxwebapp.azurewebsites.net/wp-content/uploads/2019/04/logo.svg'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: '//unpkg.com/bootstrap/dist/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500' },
    ],
    script: [
      //{ src: 'https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.8/SmoothScroll.min.js' },
      { src: 'https://smoothscroll.surge.sh/davidScrool.min.js' },
      { src: '//unpkg.com/@babel/polyfill@latest/dist/polyfill.min.js' },
      { src: '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#EB6B1E' },

  /*
  ** Forcing the scroll position to the top for every route
  */
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/_loading.scss',
    '@/assets/css/_main.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/ga.js', ssr: false },
    { src: '~plugins/owl.js', ssr: false },
    '~/plugins/axios.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/axios', {
      baseURL: 'https://ajaxwebapp.azurewebsites.net/wp-json',
    }],
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  // generate blog routes
  generate: {
    routes: function (callback) {
      let staticPages = [
        '/search',
      ];
      axios.all([
        axios.get('https://ajaxwebapp.azurewebsites.net/wp-json/wp/v2/posts'),
        axios.get('https://ajaxwebapp.azurewebsites.net/wp-json/wp/v2/categories'),
        axios.get('https://ajaxwebapp.azurewebsites.net/wp-json/wp/v2/pages'),
      ])
        .then(axios.spread(function (posts, categories, pages) {
          let routes1 = posts.data.map((post) => {
            return `/blog/${post.slug}`;
          });

          let routes2 = categories.data.map((category) => {
            return `/blog/categories/${category.slug}`;
          });

          let routes3 = pages.data.map((pages) => {
            return `/${pages.slug}`;
          });

          callback(null, routes1.concat(routes2).concat(routes3).concat(staticPages));
        }), function(err) {
          return next(err);
        });
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
};
