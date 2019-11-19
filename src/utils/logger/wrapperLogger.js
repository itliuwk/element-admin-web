const log4b = require('./logger').default
const Log4b = new log4b();

export default (debug) => {
  var _obj = {
    log (str) {
      if (debug) {
        Log4b.log(str);
      }
    },
    getLog () {
      if (debug) {
        return Log4b.getLog();
      }
    },
    downloadLog () {
      if (debug) {
        return Log4b.downloadLog();
      }
    },
    search (str) {
      if (debug) {
        return Log4b.search(str);
      }
    },
    pretty (str) {
      if (debug) {
        return Log4b.pretty(str);
      }
    },
  }
  // Log4b.log('wangduanduan');
  // Log4b.log('wangduanduan');
  // Log4b.log(JSON.stringify({name:'wangduan',age:18}));
  // Log4b.log('wangduanduan');
  // Log4b.log(JSON.stringify({name:'wangduan',age:18}));
  // Log4b.getLog();
  return _obj
}