__webpack_public_path__ = '/'

// import 'zone.js'
import {
  start
} from 'single-spa'

import { loadApp } from './loadapp'

async function init() {

  // 异步加载数据
  const promiseLoad = []

  promiseLoad.push(loadApp('home', '/home', '/_appHome/singleSpaEntry.js', null, null))
  promiseLoad.push(loadApp('vue', '/vue', '/_appVue/singleSpaEntry.js', null, null))

  await Promise.all(promiseLoad)
  
  start()
}

init()