<template>
  <header class="header">
    <div class="container-fluid">
      <div class="row container-menu">
        <div class="col-md-1 col-lg-2"></div>
        <div class="col-md-12 col-lg-8">
          <div class="links">
            <ul class="social">
              <li class="social-item">
                <a
                  href="https://twitter.com/ajax_ti"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  target="_blank"
                  class="social-link"
                >
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li class="social-item">
                <a
                  href="https://www.facebook.com/ajaxti"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  target="_blank"
                  class="social-link"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li class="social-item">
                <a
                  href="https://www.instagram.com/ajax_ti/"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  target="_blank"
                  class="social-link"
                >
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
              <li class="social-item">
                <a
                  href="https://www.linkedin.com/company/ajaxti/about/"
                  rel="noopener noreferrer"
                  aria-label="Linkedin"
                  target="_blank"
                  class="social-link"
                >
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
            <ul class="contact">
              <li class="contact-item">
                <span class="contact-icon">
                  <i class="fas fa-phone"></i>
                  <i class="fab fa-whatsapp"></i>
                </span>
                 55 852180.2773
              </li>
              <li class="contact-item">
                <span class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </span>
                <a href="mailto:contato@ajaxti.com.br" aria-label="email" class="mailto">
                  contato@ajaxti.com.br
                </a>
              </li>
              <!--
              <li class="contact-item">
                <span class="contact-icon">
                  <i class="fas fa-comments"></i>
                </span>
                 chat
              </li>
              <li class="contact-item">
                <span class="contact-icon">
                  <i class="fas fa-question"></i>
                </span>
                 suporte
              </li>
              -->
            </ul>
          </div>
        </div>
        <div class="col-md-1 col-lg-2"></div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <nuxt-link class="navbar-brand" to="/">
          <img
            src="../../assets/img/logo.svg"
            alt="logo"
            title="AjaxTI"
            class="img-fluid"
          >
        </nuxt-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- menu loading -->
          <ul v-if="loading" class="navbar-nav">
            <li class="nav-item mr-3">
              <div class="shine line"></div>
            </li>
            <li class="nav-item mr-3">
              <div class="shine line"></div>
            </li>
            <li class="nav-item mr-3">
              <div class="shine line"></div>
            </li>
            <li class="nav-item mr-3">
              <div class="shine line"></div>
            </li>
            <li class="nav-item mr-3">
              <div class="shine line"></div>
            </li>
            <li class="nav-item mr-3">
              <div class="shine line"></div>
            </li>
          </ul>
          <!-- menu -->
          <ul v-else class="navbar-nav">
            <li v-for="(item, index) in menus"
                :key="index"
                class="nav-item"
            >
              <nuxt-link class="nav-link" aria-label="nav-link" :to="`${item.url}`">
                {{ item.title }}
              </nuxt-link>
              <!-- sub menu -->
              <ul
                class="subnav"
                v-if="item.title === 'SOLUÇÕES'"
              >
                <li
                  class="subnav-item"
                  v-for="(item, index) in subMenu"
                  :key="index"
                >
                  <nuxt-link :to="`${item.url}`" aria-label="subnav-link" class="subnav-link">
                    {{ item.title }}
                  </nuxt-link>
                </li>
              </ul>
              <!-- /sub menu -->
            </li>
          </ul>
          <!-- /menu -->
        </div>
        <div class="search-content">
          <button
            class="btn btn-search"
            role="button"
            aria-label="Search"
            @click="showSearch"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
    <!-- menu mobile -->
    <NavMobile/>
    <!-- search form -->
    <div
      class="search-box shadow"
      :class="{ 'show-search': isVisible }"
    >
      <form class="form">
        <input
          v-model="search"
          type="text"
          class="form-control"
          placeholder="Pesquisar"
          ref="search"
          autofocus
        >
        <button
          @click="getSearch"
          role="button"
          aria-label="Search"
          class="button-search"
        >
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
    <!-- /search form -->
  </header>
</template>

<script>
  import NavMobile from '~/components/NavMobile.vue';
  import axios from 'axios';

  export default {
    name: 'Header',
    components: { NavMobile },
    data() {
      return {
        menus: [],
        subMenu: [],
        loading: true,
        error: false,
        isVisible: false,
        search: '',
      }
    },

    created() {
      this.getMenus();
    },

    methods: {
      getMenu() {
        return axios.get('http://cms.ajaxti.com.br/wp-json/menus/v1/menus/header_menu');
      },

      getSubMenu() {
        return axios.get('http://cms.ajaxti.com.br/wp-json/menus/v1/menus/sub_menu');
      },

      async getMenus() {
        this.loading = true;

        try {
          await axios.all([this.getMenu(), this.getSubMenu()])
            .then(axios.spread((menu, subMenu) => {
              this.menus = menu.data.items;
              this.subMenu = subMenu.data.items;
            }));
        } catch (e) {
          this.error = true;
        }

        this.loading = false;
      },

      showSearch() {
        this.$refs.search.focus();
        this.isVisible = !this.isVisible;
      },

      getSearch(e) {
        e.preventDefault();
        this.$router.push('/');
        this.$router.push(`/search/${this.search.toLowerCase()}`);
        this.isVisible = !this.isVisible;
        this.search = '';
      }
    }
  }
</script>

<style scoped lang="scss">
  .header::before {
    content: '';
    display: block;
    position: relative;
    height: 10px;
    background-color: #212934;
  }

  .navbar {
    padding-top: 30px;
    padding-bottom: 30px;

    &-nav { margin-left: auto; }
  }

  .links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 30px 10px 35px;;
    background: url('../../assets/img/bg-top.svg') 51% -14px/160% no-repeat;
  }

  .social {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    &-link {
      display: inline-block;
      width: 27px;
      height: 27px;
      margin-right: 5px;
      padding-top: 5px;
      text-align: center;
      font-size: .8rem;
      border-radius: 50%;
      color: #FFF;
      background-color: #4E5661;
    }
  }

  .contact {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    color: #FFF;

    &-icon {
      font-size: 1rem;
      margin-right: 5px;
      color: #4E5661;
    }

    &-item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      font-size: .8rem;
    }

    .mailto {
      text-decoration: none;
      color: #FFF;

      &:hover { text-decoration: underline; }
    }

    @media (max-width: 768px) { display: none; }
  }

  .nav-link {
    display: inline-block;
    text-transform: uppercase;
    font-weight: 500;
    font-size: .9rem;
    color: #212934;
    cursor: pointer;
    -webkit-transition: all .15s ease-in-out;
    -moz-transition: all .15s ease-in-out;
    -ms-transition: all .15s ease-in-out;
    -o-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;

    &:hover {
      color: #FFF;
      background-color: #212934;
    }
  }

  .nuxt-link-exact-active,
  .nuxt-link-active {
    color: #FFF;
    background-color: #212934;
  }

  .nav-item:first-child .nuxt-link-active {
    color: inherit;
    background-color: inherit;
  }

  .nav-item:first-child .nuxt-link-exact-active {
    color: #FFF;
    background-color: #212934;
  }

  // default padding between
  .navbar-expand-lg .navbar-nav .nav-link {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    @media (max-width: 1366px) {
      padding-right: 1rem;
      padding-left: 1rem;
    }
  }

  .subnav {
    display: none;
    position: absolute;
    margin: 0;
    padding: 0;
    min-width: 200px;
    list-style: none;
    z-index: 3;

    &-link {
      display: block;
      position: relative;
      margin: 0;
      padding: .5rem 2rem;
      text-transform: uppercase;
      text-decoration: none;
      font-size: .9rem;
      color: #FFF;
      background-color: #FF6B3A;
      -webkit-transition: all .15s ease-in-out;
      -moz-transition: all .15s ease-in-out;
      -ms-transition: all .15s ease-in-out;
      -o-transition: all .15s ease-in-out;
      transition: all .15s ease-in-out;

      &:hover {
        color: #FFF;
        background-color: #994023;
      }
    }
  }

  .nav-item:hover .nav-link {
    color: #FFF;
    background-color: #212934;
  }

  .nav-item:hover > .subnav { display: block; }

  .navbar-brand {
    width: 260px;
    height: auto;
    background-color: inherit;
  }

  .search-box {
    display: none;
    position: absolute;
    width: 100%;
    z-index: 2;
    border-top: 1px solid #eee;

    .form {
      padding: 0;

      &-control {
        display: block;
        position: relative;
        padding-left: 20px;
        font-size: 2rem;
        font-weight: 600;
        color: #676767;
        height: 60px;
        border: none;
        border-radius: 0;

        &:focus { box-shadow: none; }
      }
    }

    .button-search {
      position: absolute;
      right: 15px;
      bottom: 16px;
      font-size: 1.3rem;
      border: none;
      background-color: inherit;
    }
  }

  .show-search {
    display: block;
    -webkit-animation: fadeInFromNone .15s ease-out;
    -moz-animation: fadeInFromNone .15s ease-out;
    -o-animation: fadeInFromNone .15s ease-out;
    animation: fadeInFromNone .15s ease-out;
  }

  .nav-link-loading {
    padding: 0;

    &:hover {
      color: inherit;
      background: inherit;
    }
  }

  .line {
    padding: 16px 55px;
    border-radius: 5px;
  }

  @-webkit-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @-moz-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @-o-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @media (max-width: 1366px) {
    .links {
      padding-top: 0;
      background-position: 51% -12px;
    }
  }

  @media (max-width: 768px) {
    .links {
      padding-top: 0;
      background-position: 51% -10px;
      background-size: 160%;
    }

    .container-menu {
      background-color: #212934;
    }
  }
</style>
