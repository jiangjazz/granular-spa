<template>
  <div class="home">
    <h1>这是appHome项目</h1>
    {{ reduxState }}
    <button @click="clicks">点击</button>
    

    <!-- 可变内容 -->
    <div class="m-test">
      <div class="title">标题</div>
      <div class="content">内容</div>
    </div>
    <!-- 可变内容 end-->
  </div>
</template>

<script>

export default {
  name: 'home',
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
