import {
  registerApplication
} from 'single-spa'

console.log(SystemJS)

function pathPrefix(prefix) {

  return function (location) {
    let status = false
    if(prefix === '/home') {
      status = location.pathname === "" ||
      location.pathname === "/" ||
      location.pathname.startsWith('/home')
    } else {
      status = location.pathname.startsWith(prefix)
    }
    console.log(prefix, status)

    return status
  }
}

export async function loadApp(name, hash, appURL, storeURL, globalEventDistributor) {
  // await load store

  registerApplication(name, () => SystemJS.import(appURL), pathPrefix(hash))
}