__webpack_public_path__ = '/'

// import 'zone.js'
import {
  start
} from 'single-spa'
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './loadapp'

async function init() {
  const globalEventDistributor = new GlobalEventDistributor()

  // 全局Store
  let publicStore = await SystemJS.import('/store.js')
  globalEventDistributor.registerStore(publicStore.storeInstance)

  // 异步加载数据
  const promiseLoad = []

  promiseLoad.push(loadApp('home', '/home', '/_appHome/singleSpaEntry.js', null, globalEventDistributor))
  promiseLoad.push(loadApp('vue', '/vue', '/_appVue/singleSpaEntry.js', null, globalEventDistributor))

  await Promise.all(promiseLoad)
  
  start()
}

init()