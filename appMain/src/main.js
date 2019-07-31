__webpack_public_path__ = '/'

// import 'zone.js'
import {
  start
} from 'single-spa'

import { loadApp } from './loadapp'
// console.log(__webpack_public_path__)
// import setPublicPath from './set-public-path'
// setPublicPath()

async function init() {

  // 异步加载数据
  const promiseLoad = []

  promiseLoad.push(loadApp('vue', '/vue', '/_appVue/singleSpaEntry.js', null, null))

  await Promise.all(promiseLoad)
  console.log(__webpack_public_path__, 1123213)
  start()
}

init()