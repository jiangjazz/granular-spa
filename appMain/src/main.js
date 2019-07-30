import 'zone.js'
import {
  start
} from 'single-spa'

import { loadApp } from './loadapp'

// import setPublicPath from './set-public-path'
// setPublicPath()

async function init() {

  // 异步加载数据
  const promiseLoad = []

  promiseLoad.push(loadApp('vue', '/vue', '/_appVue/singleSpaEntry.js', null, null))

  await Promise.all(promiseLoad)

  start()
}

init()