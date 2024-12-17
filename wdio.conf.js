// filepath: wdio.conf.js
export const config = {
    runner: 'local',
    specs: ['./tests/accessibility/**/*.js'],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'bstack:options': {
        userName: 'jessyquinto_qKyajo',
        accessKey: 'XNGwtLMATLBtbzCxF4qJ',
        os: 'Windows',
        osVersion: '10',
        buildName: 'Accessibility Tests',
        sessionName: 'Accessibility Test Session'
      }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['browserstack'],
    user: 'jessyquinto_qKyajo',
    key: 'XNGwtLMATLBtbzCxF4qJ',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000
    }
  };