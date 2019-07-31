import setPublicPath from './set-public-path'

import Vue from 'vue'
import singleSpaVue from 'single-spa-vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 根容器id
const NAME = 'appHome'

Vue.config.productionTip = false

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#appHome',
    render: h => h(App),
    router,
    store
  }
})

export const bootstrap = [
  () => {
    return setPublicPath()
  },
  (props) => {
    console.log(props)
    return vueLifecycles.bootstrap(props)
  },
]

export function mount(props) {
  createDomElement()
  console.log(props)
  return vueLifecycles.mount(props)
}

export const unmount = [
  vueLifecycles.unmount,
]

function createDomElement() {
  // Make sure there is a div for us to render into
  let el = document.getElementById(NAME)

  if (!el) {
    el = document.createElement('div')
    el.id = NAME
    document.body.appendChild(el)
  }

  console.log(el, 11111, el.id)
  return el
}