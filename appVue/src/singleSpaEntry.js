import Vue from 'vue'
import singleSpaVue from 'single-spa-vue';
import App from './App.vue'
import router from './router'
import store from './store'

// import setPublicPath from './set-public-path'


Vue.config.productionTip = false;

// process.env.BASE_URL = '/vue'

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue',
    render: h => h(App),
    router,
    store
  }
});

export const bootstrap = [
  // () => {
  //   console.log(__webpack_public_path__)
  //   return setPublicPath()
  // },
  vueLifecycles.bootstrap,
];

export function mount(props) {
  createDomElement();
  return vueLifecycles.mount(props);
}

export const unmount = [
  vueLifecycles.unmount,
];

function createDomElement() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('vue');

  if (!el) {
    el = document.createElement('div');
    el.id = 'vue';
    document.body.appendChild(el);
  }
  return el;
}