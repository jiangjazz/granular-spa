import {
  registerApplication
} from 'single-spa'

console.log(window.SystemJS)

function pathPrefix(prefix) {

  return function (location) {
    let status = false
    if (prefix === '/home') {
      status = location.pathname === "" ||
        location.pathname === "/" ||
        location.pathname.startsWith('/home')
    } else {
      status = location.pathname.startsWith(prefix)
    }

    return status
  }
}

// 暂且不支持子项目间互相暴露store
export async function loadApp(name, hash, appURL, storeURL, globalEventDistributor) {
  // await load store
  let customProps = {
    globalEventDistributor
  }
  

  registerApplication(name, () => window.SystemJS.import(appURL), pathPrefix(hash), customProps)
}