/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendWithComponent(conf) {
  // make sure boot file is registered
  conf.boot.push("~quasar-app-extension-qemail/src/boot/index.js")

  // make sure boot file transpiles
  conf.build.transpileDependencies.push(/quasar-app-extension-qemail[\\/]src/)
  conf.framework.plugins.push('Notify')
  console.log(
    `App Extension (qemail) Info: 'Adding qemail boot reference to your quasar.conf.js'`
  )
}

module.exports = function(api) {
  api.compatibleWith("@quasar/app", "^1.0.0")

  // register JSON api
  api.registerDescribeApi("QEmail", "./components/QEmail.json")

  // extend quasar.conf
  api.extendQuasarConf(extendWithComponent)
}
