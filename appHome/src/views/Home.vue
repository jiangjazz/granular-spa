<template>
  <div class="home">
    <h1>这是appHome项目</h1>
    {{ reduxState }}
    <button @click="clicks">点击</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      // 
      reduxListen: () => {},
      //
      reduxState: {}
    }
  },
  methods: {
    clicks() {
      this.globalStore.dispatch({ type: 'INCREMENT' })
    },
    init() {
      this.reduxState = this.globalStore.getState()
      this.reduxListen = this.globalStore.subscribe(() => {
        this.reduxState = this.globalStore.getState()
      })
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.reduxListen()
  }
}
</script>
