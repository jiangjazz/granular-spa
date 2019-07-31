const defaultOpts = {
  // required opts
  Vue: null,
  appOptions: null,
  template: null,
}

export default function singleSpaVue(userOpts) {
  if (typeof userOpts !== 'object') {
    throw new Error(`single-spa-vue requires a configuration object`);
  }

  const opts = {
    ...defaultOpts,
    ...userOpts,
  };

  if (!opts.Vue) {
    throw new Error('single-spa-vuejs must be passed opts.Vue');
  }

  if (!opts.appOptions) {
    throw new Error('single-spa-vuejs must be passed opts.appOptions');
  }

  console.log(opts.appOptions)

  // Just a shared object to store the mounted object state
  let mountedInstances = {};

  return {
    bootstrap: bootstrap.bind(null, opts, mountedInstances),
    mount: mount.bind(null, opts, mountedInstances),
    unmount: unmount.bind(null, opts, mountedInstances),
    update: update.bind(null, opts, mountedInstances),
  };
}

function bootstrap(opts) {
  if (opts.loadRootComponent) {
    return opts.loadRootComponent().then(root => opts.rootComponent = root)
  } else {
    return Promise.resolve();
  }
}

function mount(opts, mountedInstances, props) {
  return Promise
    .resolve()
    .then(() => {
      const appOptions = {...opts.appOptions}
      console.log(1, props)
      if (props.domElement && !appOptions.el) {
        appOptions.el = props.domElement;
        console.log(2)
      }

      if (!appOptions.el) {
        console.log(3)
        const htmlId = `single-spa-application:${props.name}`
        appOptions.el = `#${htmlId.replace(':', '\\:')} .single-spa-container`
        let domEl = document.getElementById(htmlId)
        console.log(4)
        if (!domEl) {
          console.log(5)
          domEl = document.createElement('div')
          domEl.id = htmlId
          document.body.appendChild(domEl)
        }

        // single-spa-vue@>=2 always REPLACES the `el` instead of appending to it.
        // We want domEl to stick around and not be replaced. So we tell Vue to mount
        // into a container div inside of the main domEl
        if (!domEl.querySelector('.single-spa-container')) {
          console.log(6)
          const singleSpaContainer = document.createElement('div')
          singleSpaContainer.className = 'single-spa-container'
          domEl.appendChild(singleSpaContainer)
        }

        mountedInstances.domEl = domEl
      }

      if (!appOptions.render && !appOptions.template && opts.rootComponent) {
        appOptions.render = (h) => h(opts.rootComponent)
      }

      if (!appOptions.data) {
        appOptions.data = {}
      }

      appOptions.data = {...appOptions.data, ...props}
      
      console.log(appOptions, 66666666666)
      mountedInstances.instance = new opts.Vue(appOptions);
      console.log(mountedInstances)
      if (mountedInstances.instance.bind) {
        mountedInstances.instance = mountedInstances.instance.bind(mountedInstances.instance);
      }
    })
}

function update(opts, mountedInstances, props) {
  return Promise.resolve().then(() => {
    const data = {
      ...(opts.appOptions.data || {}),
      ...props,
    };
    for (let prop in data) {
      mountedInstances.instance[prop] = data[prop];
    }
  })
}

function unmount(opts, mountedInstances) {
  return Promise
    .resolve()
    .then(() => {
      mountedInstances.instance.$destroy();
      mountedInstances.instance.$el.innerHTML = '';
      delete mountedInstances.instance;

      if (mountedInstances.domEl) {
        mountedInstances.domEl.innerHTML = ''
        delete mountedInstances.domEl
      }
    })
}
