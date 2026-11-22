"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// node_modules/.pnpm/@actions+core@1.2.3/node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/.pnpm/@actions+core@1.2.3/node_modules/@actions/core/lib/command.js"(exports2) {
    "use strict";
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var os = __importStar(require("os"));
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports2.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports2.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return (s || "").replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return (s || "").replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/.pnpm/@actions+core@1.2.3/node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/.pnpm/@actions+core@1.2.3/node_modules/@actions/core/lib/core.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var command_1 = require_command();
    var os = __importStar(require("os"));
    var path = __importStar(require("path"));
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports2.ExitCode || (exports2.ExitCode = {}));
    function exportVariable(name, val) {
      process.env[name] = val;
      command_1.issueCommand("set-env", { name }, val);
    }
    exports2.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports2.setSecret = setSecret;
    function addPath(inputPath) {
      command_1.issueCommand("add-path", {}, inputPath);
      process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
    }
    exports2.addPath = addPath;
    function getInput(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      return val.trim();
    }
    exports2.getInput = getInput;
    function setOutput(name, value) {
      command_1.issueCommand("set-output", { name }, value);
    }
    exports2.setOutput = setOutput;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports2.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports2.isDebug = isDebug;
    function debug(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports2.debug = debug;
    function error(message) {
      command_1.issue("error", message);
    }
    exports2.error = error;
    function warning(message) {
      command_1.issue("warning", message);
    }
    exports2.warning = warning;
    function info(message) {
      process.stdout.write(message + os.EOL);
    }
    exports2.info = info;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports2.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports2.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports2.group = group;
    function saveState(name, value) {
      command_1.issueCommand("save-state", { name }, value);
    }
    exports2.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports2.getState = getState;
  }
});

// node_modules/.pnpm/is-plain-object@3.0.0/node_modules/is-plain-object/index.cjs.js
var require_index_cjs = __commonJS({
  "node_modules/.pnpm/is-plain-object@3.0.0/node_modules/is-plain-object/index.cjs.js"(exports2, module2) {
    "use strict";
    function isObject(val) {
      return val != null && typeof val === "object" && Array.isArray(val) === false;
    }
    function isObjectObject(o) {
      return isObject(o) === true && Object.prototype.toString.call(o) === "[object Object]";
    }
    function isPlainObject(o) {
      var ctor, prot;
      if (isObjectObject(o) === false) return false;
      ctor = o.constructor;
      if (typeof ctor !== "function") return false;
      prot = ctor.prototype;
      if (isObjectObject(prot) === false) return false;
      if (prot.hasOwnProperty("isPrototypeOf") === false) {
        return false;
      }
      return true;
    }
    module2.exports = isPlainObject;
  }
});

// node_modules/.pnpm/macos-release@2.3.0/node_modules/macos-release/index.js
var require_macos_release = __commonJS({
  "node_modules/.pnpm/macos-release@2.3.0/node_modules/macos-release/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var nameMap = /* @__PURE__ */ new Map([
      [19, "Catalina"],
      [18, "Mojave"],
      [17, "High Sierra"],
      [16, "Sierra"],
      [15, "El Capitan"],
      [14, "Yosemite"],
      [13, "Mavericks"],
      [12, "Mountain Lion"],
      [11, "Lion"],
      [10, "Snow Leopard"],
      [9, "Leopard"],
      [8, "Tiger"],
      [7, "Panther"],
      [6, "Jaguar"],
      [5, "Puma"]
    ]);
    var macosRelease = (release) => {
      release = Number((release || os.release()).split(".")[0]);
      return {
        name: nameMap.get(release),
        version: "10." + (release - 4)
      };
    };
    module2.exports = macosRelease;
    module2.exports.default = macosRelease;
  }
});

// node_modules/.pnpm/nice-try@1.0.5/node_modules/nice-try/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/nice-try@1.0.5/node_modules/nice-try/src/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(fn) {
      try {
        return fn();
      } catch (e) {
      }
    };
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js"(exports2, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs = require("fs");
    function checkPathExt(path, options) {
      var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
      if (!pathext) {
        return true;
      }
      pathext = pathext.split(";");
      if (pathext.indexOf("") !== -1) {
        return true;
      }
      for (var i = 0; i < pathext.length; i++) {
        var p = pathext[i].toLowerCase();
        if (p && path.substr(-p.length).toLowerCase() === p) {
          return true;
        }
      }
      return false;
    }
    function checkStat(stat, path, options) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
      }
      return checkPathExt(path, options);
    }
    function isexe(path, options, cb) {
      fs.stat(path, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path, options));
      });
    }
    function sync(path, options) {
      return checkStat(fs.statSync(path), path, options);
    }
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js"(exports2, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs = require("fs");
    function isexe(path, options, cb) {
      fs.stat(path, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
      });
    }
    function sync(path, options) {
      return checkStat(fs.statSync(path), options);
    }
    function checkStat(stat, options) {
      return stat.isFile() && checkMode(stat, options);
    }
    function checkMode(stat, options) {
      var mod = stat.mode;
      var uid = stat.uid;
      var gid = stat.gid;
      var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
      var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
      var u = parseInt("100", 8);
      var g = parseInt("010", 8);
      var o = parseInt("001", 8);
      var ug = u | g;
      var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js"(exports2, module2) {
    var fs = require("fs");
    var core3;
    if (process.platform === "win32" || global.TESTING_WINDOWS) {
      core3 = require_windows();
    } else {
      core3 = require_mode();
    }
    module2.exports = isexe;
    isexe.sync = sync;
    function isexe(path, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      if (!cb) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(resolve, reject) {
          isexe(path, options || {}, function(er, is) {
            if (er) {
              reject(er);
            } else {
              resolve(is);
            }
          });
        });
      }
      core3(path, options || {}, function(er, is) {
        if (er) {
          if (er.code === "EACCES" || options && options.ignoreErrors) {
            er = null;
            is = false;
          }
        }
        cb(er, is);
      });
    }
    function sync(path, options) {
      try {
        return core3.sync(path, options || {});
      } catch (er) {
        if (options && options.ignoreErrors || er.code === "EACCES") {
          return false;
        } else {
          throw er;
        }
      }
    }
  }
});

// node_modules/.pnpm/which@1.3.1/node_modules/which/which.js
var require_which = __commonJS({
  "node_modules/.pnpm/which@1.3.1/node_modules/which/which.js"(exports2, module2) {
    module2.exports = which;
    which.sync = whichSync;
    var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
    var path = require("path");
    var COLON = isWindows ? ";" : ":";
    var isexe = require_isexe();
    function getNotFoundError(cmd) {
      var er = new Error("not found: " + cmd);
      er.code = "ENOENT";
      return er;
    }
    function getPathInfo(cmd, opt) {
      var colon = opt.colon || COLON;
      var pathEnv = opt.path || process.env.PATH || "";
      var pathExt = [""];
      pathEnv = pathEnv.split(colon);
      var pathExtExe = "";
      if (isWindows) {
        pathEnv.unshift(process.cwd());
        pathExtExe = opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM";
        pathExt = pathExtExe.split(colon);
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
          pathExt.unshift("");
      }
      if (cmd.match(/\//) || isWindows && cmd.match(/\\/))
        pathEnv = [""];
      return {
        env: pathEnv,
        ext: pathExt,
        extExe: pathExtExe
      };
    }
    function which(cmd, opt, cb) {
      if (typeof opt === "function") {
        cb = opt;
        opt = {};
      }
      var info = getPathInfo(cmd, opt);
      var pathEnv = info.env;
      var pathExt = info.ext;
      var pathExtExe = info.extExe;
      var found = [];
      (function F(i, l) {
        if (i === l) {
          if (opt.all && found.length)
            return cb(null, found);
          else
            return cb(getNotFoundError(cmd));
        }
        var pathPart = pathEnv[i];
        if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
          pathPart = pathPart.slice(1, -1);
        var p = path.join(pathPart, cmd);
        if (!pathPart && /^\.[\\\/]/.test(cmd)) {
          p = cmd.slice(0, 2) + p;
        }
        ;
        (function E(ii, ll) {
          if (ii === ll) return F(i + 1, l);
          var ext = pathExt[ii];
          isexe(p + ext, { pathExt: pathExtExe }, function(er, is) {
            if (!er && is) {
              if (opt.all)
                found.push(p + ext);
              else
                return cb(null, p + ext);
            }
            return E(ii + 1, ll);
          });
        })(0, pathExt.length);
      })(0, pathEnv.length);
    }
    function whichSync(cmd, opt) {
      opt = opt || {};
      var info = getPathInfo(cmd, opt);
      var pathEnv = info.env;
      var pathExt = info.ext;
      var pathExtExe = info.extExe;
      var found = [];
      for (var i = 0, l = pathEnv.length; i < l; i++) {
        var pathPart = pathEnv[i];
        if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
          pathPart = pathPart.slice(1, -1);
        var p = path.join(pathPart, cmd);
        if (!pathPart && /^\.[\\\/]/.test(cmd)) {
          p = cmd.slice(0, 2) + p;
        }
        for (var j = 0, ll = pathExt.length; j < ll; j++) {
          var cur = p + pathExt[j];
          var is;
          try {
            is = isexe.sync(cur, { pathExt: pathExtExe });
            if (is) {
              if (opt.all)
                found.push(cur);
              else
                return cur;
            }
          } catch (ex) {
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    }
  }
});

// node_modules/.pnpm/path-key@2.0.1/node_modules/path-key/index.js
var require_path_key = __commonJS({
  "node_modules/.pnpm/path-key@2.0.1/node_modules/path-key/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (opts) => {
      opts = opts || {};
      const env = opts.env || process.env;
      const platform = opts.platform || process.platform;
      if (platform !== "win32") {
        return "PATH";
      }
      return Object.keys(env).find((x) => x.toUpperCase() === "PATH") || "Path";
    };
  }
});

// node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS({
  "node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/util/resolveCommand.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var which = require_which();
    var pathKey = require_path_key()();
    function resolveCommandAttempt(parsed, withoutPathExt) {
      const cwd = process.cwd();
      const hasCustomCwd = parsed.options.cwd != null;
      if (hasCustomCwd) {
        try {
          process.chdir(parsed.options.cwd);
        } catch (err) {
        }
      }
      let resolved;
      try {
        resolved = which.sync(parsed.command, {
          path: (parsed.options.env || process.env)[pathKey],
          pathExt: withoutPathExt ? path.delimiter : void 0
        });
      } catch (e) {
      } finally {
        process.chdir(cwd);
      }
      if (resolved) {
        resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
      }
      return resolved;
    }
    function resolveCommand(parsed) {
      return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    module2.exports = resolveCommand;
  }
});

// node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS({
  "node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/util/escape.js"(exports2, module2) {
    "use strict";
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
      arg = arg.replace(metaCharsRegExp, "^$1");
      return arg;
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
      arg = `${arg}`;
      arg = arg.replace(/(\\*)"/g, '$1$1\\"');
      arg = arg.replace(/(\\*)$/, "$1$1");
      arg = `"${arg}"`;
      arg = arg.replace(metaCharsRegExp, "^$1");
      if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, "^$1");
      }
      return arg;
    }
    module2.exports.command = escapeCommand;
    module2.exports.argument = escapeArgument;
  }
});

// node_modules/.pnpm/shebang-regex@1.0.0/node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS({
  "node_modules/.pnpm/shebang-regex@1.0.0/node_modules/shebang-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = /^#!.*/;
  }
});

// node_modules/.pnpm/shebang-command@1.2.0/node_modules/shebang-command/index.js
var require_shebang_command = __commonJS({
  "node_modules/.pnpm/shebang-command@1.2.0/node_modules/shebang-command/index.js"(exports2, module2) {
    "use strict";
    var shebangRegex = require_shebang_regex();
    module2.exports = function(str) {
      var match = str.match(shebangRegex);
      if (!match) {
        return null;
      }
      var arr = match[0].replace(/#! ?/, "").split(" ");
      var bin = arr[0].split("/").pop();
      var arg = arr[1];
      return bin === "env" ? arg : bin + (arg ? " " + arg : "");
    };
  }
});

// node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS({
  "node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/util/readShebang.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var shebangCommand = require_shebang_command();
    function readShebang(command) {
      const size = 150;
      let buffer;
      if (Buffer.alloc) {
        buffer = Buffer.alloc(size);
      } else {
        buffer = new Buffer(size);
        buffer.fill(0);
      }
      let fd;
      try {
        fd = fs.openSync(command, "r");
        fs.readSync(fd, buffer, 0, size, 0);
        fs.closeSync(fd);
      } catch (e) {
      }
      return shebangCommand(buffer.toString());
    }
    module2.exports = readShebang;
  }
});

// node_modules/.pnpm/semver@5.7.1/node_modules/semver/semver.js
var require_semver = __commonJS({
  "node_modules/.pnpm/semver@5.7.1/node_modules/semver/semver.js"(exports2, module2) {
    exports2 = module2.exports = SemVer;
    var debug;
    if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports2.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var re = exports2.re = [];
    var src = exports2.src = [];
    var R = 0;
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
    var MAINVERSION = R++;
    src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASE = R++;
    src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
    var BUILD = R++;
    src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
    var FULL = R++;
    var FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
    src[FULL] = "^" + FULLPLAIN + "$";
    var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?";
    var LOOSE = R++;
    src[LOOSE] = "^" + LOOSEPLAIN + "$";
    var GTLT = R++;
    src[GTLT] = "((?:<|>)?=?)";
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGE = R++;
    src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
    var COERCE = R++;
    src[COERCE] = "(?:^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
    var LONETILDE = R++;
    src[LONETILDE] = "(?:~>?)";
    var TILDETRIM = R++;
    src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
    re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
    var tildeTrimReplace = "$1~";
    var TILDE = R++;
    src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
    var TILDELOOSE = R++;
    src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
    var LONECARET = R++;
    src[LONECARET] = "(?:\\^)";
    var CARETTRIM = R++;
    src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
    re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
    var caretTrimReplace = "$1^";
    var CARET = R++;
    src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
    var CARETLOOSE = R++;
    src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
    var COMPARATOR = R++;
    src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")";
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
    var comparatorTrimReplace = "$1$2$3";
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
    var STAR = R++;
    src[STAR] = "(<|>)?=?\\s*\\*";
    for (i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
      }
    }
    var i;
    exports2.parse = parse;
    function parse(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      var r = options.loose ? re[LOOSE] : re[FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    }
    exports2.valid = valid;
    function valid(version, options) {
      var v = parse(version, options);
      return v ? v.version : null;
    }
    exports2.clean = clean;
    function clean(version, options) {
      var s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    }
    exports2.SemVer = SemVer;
    function SemVer(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options.loose) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError("Invalid Version: " + version);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
      }
      if (!(this instanceof SemVer)) {
        return new SemVer(version, options);
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);
      if (!m) {
        throw new TypeError("Invalid Version: " + version);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function() {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length) {
        this.version += "-" + this.prerelease.join(".");
      }
      return this.version;
    };
    SemVer.prototype.toString = function() {
      return this.version;
    };
    SemVer.prototype.compare = function(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.inc = function(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports2.inc = inc;
    function inc(version, release, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports2.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    }
    exports2.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }
    exports2.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports2.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports2.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports2.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports2.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports2.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    exports2.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    exports2.sort = sort;
    function sort(list, loose) {
      return list.sort(function(a, b) {
        return exports2.compare(a, b, loose);
      });
    }
    exports2.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function(a, b) {
        return exports2.rcompare(a, b, loose);
      });
    }
    exports2.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    exports2.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    exports2.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    exports2.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    exports2.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    exports2.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    exports2.cmp = cmp;
    function cmp(a, op, b, loose) {
      switch (op) {
        case "===":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError("Invalid operator: " + op);
      }
    }
    exports2.Comparator = Comparator;
    function Comparator(comp, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options);
      }
      debug("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var m = comp.match(r);
      if (!m) {
        throw new TypeError("Invalid comparator: " + comp);
      }
      this.operator = m[1];
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };
    Comparator.prototype.toString = function() {
      return this.value;
    };
    Comparator.prototype.test = function(version) {
      debug("Comparator.test", version, this.options.loose);
      if (this.semver === ANY) {
        return true;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      return cmp(version, this.operator, this.semver, this.options);
    };
    Comparator.prototype.intersects = function(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      var rangeTmp;
      if (this.operator === "") {
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options);
      } else if (comp.operator === "") {
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options);
      }
      var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
      var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };
    exports2.Range = Range;
    function Range(range, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, options);
      }
      if (!(this instanceof Range)) {
        return new Range(range, options);
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
        return this.parseRange(range2.trim());
      }, this).filter(function(c) {
        return c.length;
      });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + range);
      }
      this.format();
    }
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    };
    Range.prototype.toString = function() {
      return this.range;
    };
    Range.prototype.parseRange = function(range) {
      var loose = this.options.loose;
      range = range.trim();
      var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug("hyphen replace", range);
      range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
      debug("comparator trim", range, re[COMPARATORTRIM]);
      range = range.replace(re[TILDETRIM], tildeTrimReplace);
      range = range.replace(re[CARETTRIM], caretTrimReplace);
      range = range.split(/\s+/).join(" ");
      var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, this.options);
      }, this).join(" ").split(/\s+/);
      if (this.options.loose) {
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };
    Range.prototype.intersects = function(range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function(thisComparators) {
        return thisComparators.every(function(thisComparator) {
          return range.set.some(function(rangeComparators) {
            return rangeComparators.every(function(rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    };
    exports2.toComparators = toComparators;
    function toComparators(range, options) {
      return new Range(range, options).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(" ").trim().split(" ");
      });
    }
    function parseComparator(comp, options) {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceTilde(comp2, options);
      }).join(" ");
    }
    function replaceTilde(comp, options) {
      var r = options.loose ? re[TILDELOOSE] : re[TILDE];
      return comp.replace(r, function(_2, M, m, p, pr) {
        debug("tilde", comp, _2, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
        debug("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceCaret(comp2, options);
      }).join(" ");
    }
    function replaceCaret(comp, options) {
      debug("caret", comp, options);
      var r = options.loose ? re[CARETLOOSE] : re[CARET];
      return comp.replace(r, function(_2, M, m, p, pr) {
        debug("caret", comp, _2, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          if (M === "0") {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
          }
        }
        debug("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, options) {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map(function(comp2) {
        return replaceXRange(comp2, options);
      }).join(" ");
    }
    function replaceXRange(comp, options) {
      comp = comp.trim();
      var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          ret = gtlt + M + "." + m + "." + p;
        } else if (xm) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        }
        debug("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, options) {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[STAR], "");
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = ">=" + fM + ".0.0";
      } else if (isX(fp)) {
        from = ">=" + fM + "." + fm + ".0";
      } else {
        from = ">=" + from;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = "<" + (+tM + 1) + ".0.0";
      } else if (isX(tp)) {
        to = "<" + tM + "." + (+tm + 1) + ".0";
      } else if (tpr) {
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      } else {
        to = "<=" + to;
      }
      return (from + " " + to).trim();
    }
    Range.prototype.test = function(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version, this.options)) {
          return true;
        }
      }
      return false;
    };
    function testSet(set, version, options) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (i2 = 0; i2 < set.length; i2++) {
          debug(set[i2].semver);
          if (set[i2].semver === ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    exports2.satisfies = satisfies;
    function satisfies(version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    exports2.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, options) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }
    exports2.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, options) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }
    exports2.minVersion = minVersion;
    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        comparators.forEach(function(comparator) {
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error("Unexpected operation: " + comparator.operator);
          }
        });
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }
    exports2.validRange = validRange;
    function validRange(range, options) {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports2.ltr = ltr;
    function ltr(version, range, options) {
      return outside(version, range, "<", options);
    }
    exports2.gtr = gtr;
    function gtr(version, range, options) {
      return outside(version, range, ">", options);
    }
    exports2.outside = outside;
    function outside(version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports2.prerelease = prerelease;
    function prerelease(version, options) {
      var parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }
    exports2.intersects = intersects;
    function intersects(r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    }
    exports2.coerce = coerce;
    function coerce(version) {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      var match = version.match(re[COERCE]);
      if (match == null) {
        return null;
      }
      return parse(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
    }
  }
});

// node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/parse.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var niceTry = require_src();
    var resolveCommand = require_resolveCommand();
    var escape = require_escape();
    var readShebang = require_readShebang();
    var semver = require_semver();
    var isWin = process.platform === "win32";
    var isExecutableRegExp = /\.(?:com|exe)$/i;
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    var supportsShellOption = niceTry(() => semver.satisfies(process.version, "^4.8.0 || ^5.7.0 || >= 6.0.0", true)) || false;
    function detectShebang(parsed) {
      parsed.file = resolveCommand(parsed);
      const shebang = parsed.file && readShebang(parsed.file);
      if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return resolveCommand(parsed);
      }
      return parsed.file;
    }
    function parseNonShell(parsed) {
      if (!isWin) {
        return parsed;
      }
      const commandFile = detectShebang(parsed);
      const needsShell = !isExecutableRegExp.test(commandFile);
      if (parsed.options.forceShell || needsShell) {
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
        parsed.command = path.normalize(parsed.command);
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
        const shellCommand = [parsed.command].concat(parsed.args).join(" ");
        parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
        parsed.command = process.env.comspec || "cmd.exe";
        parsed.options.windowsVerbatimArguments = true;
      }
      return parsed;
    }
    function parseShell(parsed) {
      if (supportsShellOption) {
        return parsed;
      }
      const shellCommand = [parsed.command].concat(parsed.args).join(" ");
      if (isWin) {
        parsed.command = typeof parsed.options.shell === "string" ? parsed.options.shell : process.env.comspec || "cmd.exe";
        parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
        parsed.options.windowsVerbatimArguments = true;
      } else {
        if (typeof parsed.options.shell === "string") {
          parsed.command = parsed.options.shell;
        } else if (process.platform === "android") {
          parsed.command = "/system/bin/sh";
        } else {
          parsed.command = "/bin/sh";
        }
        parsed.args = ["-c", shellCommand];
      }
      return parsed;
    }
    function parse(command, args, options) {
      if (args && !Array.isArray(args)) {
        options = args;
        args = null;
      }
      args = args ? args.slice(0) : [];
      options = Object.assign({}, options);
      const parsed = {
        command,
        args,
        options,
        file: void 0,
        original: {
          command,
          args
        }
      };
      return options.shell ? parseShell(parsed) : parseNonShell(parsed);
    }
    module2.exports = parse;
  }
});

// node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS({
  "node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/enoent.js"(exports2, module2) {
    "use strict";
    var isWin = process.platform === "win32";
    function notFoundError(original, syscall) {
      return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
      });
    }
    function hookChildProcess(cp, parsed) {
      if (!isWin) {
        return;
      }
      const originalEmit = cp.emit;
      cp.emit = function(name, arg1) {
        if (name === "exit") {
          const err = verifyENOENT(arg1, parsed, "spawn");
          if (err) {
            return originalEmit.call(cp, "error", err);
          }
        }
        return originalEmit.apply(cp, arguments);
      };
    }
    function verifyENOENT(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawn");
      }
      return null;
    }
    function verifyENOENTSync(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawnSync");
      }
      return null;
    }
    module2.exports = {
      hookChildProcess,
      verifyENOENT,
      verifyENOENTSync,
      notFoundError
    };
  }
});

// node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS({
  "node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/index.js"(exports2, module2) {
    "use strict";
    var cp = require("child_process");
    var parse = require_parse();
    var enoent = require_enoent();
    function spawn(command, args, options) {
      const parsed = parse(command, args, options);
      const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
      enoent.hookChildProcess(spawned, parsed);
      return spawned;
    }
    function spawnSync(command, args, options) {
      const parsed = parse(command, args, options);
      const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
      result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
      return result;
    }
    module2.exports = spawn;
    module2.exports.spawn = spawn;
    module2.exports.sync = spawnSync;
    module2.exports._parse = parse;
    module2.exports._enoent = enoent;
  }
});

// node_modules/.pnpm/strip-eof@1.0.0/node_modules/strip-eof/index.js
var require_strip_eof = __commonJS({
  "node_modules/.pnpm/strip-eof@1.0.0/node_modules/strip-eof/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(x) {
      var lf = typeof x === "string" ? "\n" : "\n".charCodeAt();
      var cr = typeof x === "string" ? "\r" : "\r".charCodeAt();
      if (x[x.length - 1] === lf) {
        x = x.slice(0, x.length - 1);
      }
      if (x[x.length - 1] === cr) {
        x = x.slice(0, x.length - 1);
      }
      return x;
    };
  }
});

// node_modules/.pnpm/npm-run-path@2.0.2/node_modules/npm-run-path/index.js
var require_npm_run_path = __commonJS({
  "node_modules/.pnpm/npm-run-path@2.0.2/node_modules/npm-run-path/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var pathKey = require_path_key();
    module2.exports = (opts) => {
      opts = Object.assign({
        cwd: process.cwd(),
        path: process.env[pathKey()]
      }, opts);
      let prev;
      let pth = path.resolve(opts.cwd);
      const ret = [];
      while (prev !== pth) {
        ret.push(path.join(pth, "node_modules/.bin"));
        prev = pth;
        pth = path.resolve(pth, "..");
      }
      ret.push(path.dirname(process.execPath));
      return ret.concat(opts.path).join(path.delimiter);
    };
    module2.exports.env = (opts) => {
      opts = Object.assign({
        env: process.env
      }, opts);
      const env = Object.assign({}, opts.env);
      const path2 = pathKey({ env });
      opts.path = env[path2];
      env[path2] = module2.exports(opts);
      return env;
    };
  }
});

// node_modules/.pnpm/is-stream@1.1.0/node_modules/is-stream/index.js
var require_is_stream = __commonJS({
  "node_modules/.pnpm/is-stream@1.1.0/node_modules/is-stream/index.js"(exports2, module2) {
    "use strict";
    var isStream = module2.exports = function(stream) {
      return stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
    };
    isStream.writable = function(stream) {
      return isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
    };
    isStream.readable = function(stream) {
      return isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
    };
    isStream.duplex = function(stream) {
      return isStream.writable(stream) && isStream.readable(stream);
    };
    isStream.transform = function(stream) {
      return isStream.duplex(stream) && typeof stream._transform === "function" && typeof stream._transformState === "object";
    };
  }
});

// node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js"(exports2, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb) return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/.pnpm/once@1.4.0/node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/.pnpm/once@1.4.0/node_modules/once/once.js"(exports2, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called) return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// node_modules/.pnpm/end-of-stream@1.4.4/node_modules/end-of-stream/index.js
var require_end_of_stream = __commonJS({
  "node_modules/.pnpm/end-of-stream@1.4.4/node_modules/end-of-stream/index.js"(exports2, module2) {
    var once = require_once();
    var noop = function() {
    };
    var isRequest = function(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    };
    var isChildProcess = function(stream) {
      return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
    };
    var eos = function(stream, opts, callback) {
      if (typeof opts === "function") return eos(stream, null, opts);
      if (!opts) opts = {};
      callback = once(callback || noop);
      var ws = stream._writableState;
      var rs = stream._readableState;
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var cancelled = false;
      var onlegacyfinish = function() {
        if (!stream.writable) onfinish();
      };
      var onfinish = function() {
        writable = false;
        if (!readable) callback.call(stream);
      };
      var onend = function() {
        readable = false;
        if (!writable) callback.call(stream);
      };
      var onexit = function(exitCode) {
        callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
      };
      var onerror = function(err) {
        callback.call(stream, err);
      };
      var onclose = function() {
        process.nextTick(onclosenexttick);
      };
      var onclosenexttick = function() {
        if (cancelled) return;
        if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error("premature close"));
        if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error("premature close"));
      };
      var onrequest = function() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
      } else if (writable && !ws) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      if (isChildProcess(stream)) stream.on("exit", onexit);
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false) stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        cancelled = true;
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("exit", onexit);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    };
    module2.exports = eos;
  }
});

// node_modules/.pnpm/pump@3.0.0/node_modules/pump/index.js
var require_pump = __commonJS({
  "node_modules/.pnpm/pump@3.0.0/node_modules/pump/index.js"(exports2, module2) {
    var once = require_once();
    var eos = require_end_of_stream();
    var fs = require("fs");
    var noop = function() {
    };
    var ancient = /^v?\.0/.test(process.version);
    var isFn = function(fn) {
      return typeof fn === "function";
    };
    var isFS = function(stream) {
      if (!ancient) return false;
      if (!fs) return false;
      return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close);
    };
    var isRequest = function(stream) {
      return stream.setHeader && isFn(stream.abort);
    };
    var destroyer = function(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      eos(stream, { readable: reading, writable: writing }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        if (isFS(stream)) return stream.close(noop);
        if (isRequest(stream)) return stream.abort();
        if (isFn(stream.destroy)) return stream.destroy();
        callback(err || new Error("stream was destroyed"));
      };
    };
    var call = function(fn) {
      fn();
    };
    var pipe = function(from, to) {
      return from.pipe(to);
    };
    var pump = function() {
      var streams = Array.prototype.slice.call(arguments);
      var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;
      if (Array.isArray(streams[0])) streams = streams[0];
      if (streams.length < 2) throw new Error("pump requires two streams per minimum");
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error) error = err;
          if (err) destroys.forEach(call);
          if (reading) return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    };
    module2.exports = pump;
  }
});

// node_modules/.pnpm/get-stream@4.1.0/node_modules/get-stream/buffer-stream.js
var require_buffer_stream = __commonJS({
  "node_modules/.pnpm/get-stream@4.1.0/node_modules/get-stream/buffer-stream.js"(exports2, module2) {
    "use strict";
    var { PassThrough } = require("stream");
    module2.exports = (options) => {
      options = Object.assign({}, options);
      const { array } = options;
      let { encoding } = options;
      const buffer = encoding === "buffer";
      let objectMode = false;
      if (array) {
        objectMode = !(encoding || buffer);
      } else {
        encoding = encoding || "utf8";
      }
      if (buffer) {
        encoding = null;
      }
      let len = 0;
      const ret = [];
      const stream = new PassThrough({ objectMode });
      if (encoding) {
        stream.setEncoding(encoding);
      }
      stream.on("data", (chunk) => {
        ret.push(chunk);
        if (objectMode) {
          len = ret.length;
        } else {
          len += chunk.length;
        }
      });
      stream.getBufferedValue = () => {
        if (array) {
          return ret;
        }
        return buffer ? Buffer.concat(ret, len) : ret.join("");
      };
      stream.getBufferedLength = () => len;
      return stream;
    };
  }
});

// node_modules/.pnpm/get-stream@4.1.0/node_modules/get-stream/index.js
var require_get_stream = __commonJS({
  "node_modules/.pnpm/get-stream@4.1.0/node_modules/get-stream/index.js"(exports2, module2) {
    "use strict";
    var pump = require_pump();
    var bufferStream = require_buffer_stream();
    var MaxBufferError = class extends Error {
      constructor() {
        super("maxBuffer exceeded");
        this.name = "MaxBufferError";
      }
    };
    function getStream(inputStream, options) {
      if (!inputStream) {
        return Promise.reject(new Error("Expected a stream"));
      }
      options = Object.assign({ maxBuffer: Infinity }, options);
      const { maxBuffer } = options;
      let stream;
      return new Promise((resolve, reject) => {
        const rejectPromise = (error) => {
          if (error) {
            error.bufferedData = stream.getBufferedValue();
          }
          reject(error);
        };
        stream = pump(inputStream, bufferStream(options), (error) => {
          if (error) {
            rejectPromise(error);
            return;
          }
          resolve();
        });
        stream.on("data", () => {
          if (stream.getBufferedLength() > maxBuffer) {
            rejectPromise(new MaxBufferError());
          }
        });
      }).then(() => stream.getBufferedValue());
    }
    module2.exports = getStream;
    module2.exports.buffer = (stream, options) => getStream(stream, Object.assign({}, options, { encoding: "buffer" }));
    module2.exports.array = (stream, options) => getStream(stream, Object.assign({}, options, { array: true }));
    module2.exports.MaxBufferError = MaxBufferError;
  }
});

// node_modules/.pnpm/p-finally@1.0.0/node_modules/p-finally/index.js
var require_p_finally = __commonJS({
  "node_modules/.pnpm/p-finally@1.0.0/node_modules/p-finally/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (promise, onFinally) => {
      onFinally = onFinally || (() => {
      });
      return promise.then(
        (val) => new Promise((resolve) => {
          resolve(onFinally());
        }).then(() => val),
        (err) => new Promise((resolve) => {
          resolve(onFinally());
        }).then(() => {
          throw err;
        })
      );
    };
  }
});

// node_modules/.pnpm/signal-exit@3.0.3/node_modules/signal-exit/signals.js
var require_signals = __commonJS({
  "node_modules/.pnpm/signal-exit@3.0.3/node_modules/signal-exit/signals.js"(exports2, module2) {
    module2.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ];
    if (process.platform !== "win32") {
      module2.exports.push(
        "SIGVTALRM",
        "SIGXCPU",
        "SIGXFSZ",
        "SIGUSR2",
        "SIGTRAP",
        "SIGSYS",
        "SIGQUIT",
        "SIGIOT"
        // should detect profiler and enable/disable accordingly.
        // see #21
        // 'SIGPROF'
      );
    }
    if (process.platform === "linux") {
      module2.exports.push(
        "SIGIO",
        "SIGPOLL",
        "SIGPWR",
        "SIGSTKFLT",
        "SIGUNUSED"
      );
    }
  }
});

// node_modules/.pnpm/signal-exit@3.0.3/node_modules/signal-exit/index.js
var require_signal_exit = __commonJS({
  "node_modules/.pnpm/signal-exit@3.0.3/node_modules/signal-exit/index.js"(exports2, module2) {
    var assert = require("assert");
    var signals = require_signals();
    var isWin = /^win/i.test(process.platform);
    var EE = require("events");
    if (typeof EE !== "function") {
      EE = EE.EventEmitter;
    }
    var emitter;
    if (process.__signal_exit_emitter__) {
      emitter = process.__signal_exit_emitter__;
    } else {
      emitter = process.__signal_exit_emitter__ = new EE();
      emitter.count = 0;
      emitter.emitted = {};
    }
    if (!emitter.infinite) {
      emitter.setMaxListeners(Infinity);
      emitter.infinite = true;
    }
    module2.exports = function(cb, opts) {
      assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
      if (loaded === false) {
        load();
      }
      var ev = "exit";
      if (opts && opts.alwaysLast) {
        ev = "afterexit";
      }
      var remove = function() {
        emitter.removeListener(ev, cb);
        if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
          unload();
        }
      };
      emitter.on(ev, cb);
      return remove;
    };
    module2.exports.unload = unload;
    function unload() {
      if (!loaded) {
        return;
      }
      loaded = false;
      signals.forEach(function(sig) {
        try {
          process.removeListener(sig, sigListeners[sig]);
        } catch (er) {
        }
      });
      process.emit = originalProcessEmit;
      process.reallyExit = originalProcessReallyExit;
      emitter.count -= 1;
    }
    function emit(event, code, signal) {
      if (emitter.emitted[event]) {
        return;
      }
      emitter.emitted[event] = true;
      emitter.emit(event, code, signal);
    }
    var sigListeners = {};
    signals.forEach(function(sig) {
      sigListeners[sig] = function listener() {
        var listeners = process.listeners(sig);
        if (listeners.length === emitter.count) {
          unload();
          emit("exit", null, sig);
          emit("afterexit", null, sig);
          if (isWin && sig === "SIGHUP") {
            sig = "SIGINT";
          }
          process.kill(process.pid, sig);
        }
      };
    });
    module2.exports.signals = function() {
      return signals;
    };
    module2.exports.load = load;
    var loaded = false;
    function load() {
      if (loaded) {
        return;
      }
      loaded = true;
      emitter.count += 1;
      signals = signals.filter(function(sig) {
        try {
          process.on(sig, sigListeners[sig]);
          return true;
        } catch (er) {
          return false;
        }
      });
      process.emit = processEmit;
      process.reallyExit = processReallyExit;
    }
    var originalProcessReallyExit = process.reallyExit;
    function processReallyExit(code) {
      process.exitCode = code || 0;
      emit("exit", process.exitCode, null);
      emit("afterexit", process.exitCode, null);
      originalProcessReallyExit.call(process, process.exitCode);
    }
    var originalProcessEmit = process.emit;
    function processEmit(ev, arg) {
      if (ev === "exit") {
        if (arg !== void 0) {
          process.exitCode = arg;
        }
        var ret = originalProcessEmit.apply(this, arguments);
        emit("exit", process.exitCode, null);
        emit("afterexit", process.exitCode, null);
        return ret;
      } else {
        return originalProcessEmit.apply(this, arguments);
      }
    }
  }
});

// node_modules/.pnpm/execa@1.0.0/node_modules/execa/lib/errname.js
var require_errname = __commonJS({
  "node_modules/.pnpm/execa@1.0.0/node_modules/execa/lib/errname.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var uv;
    if (typeof util.getSystemErrorName === "function") {
      module2.exports = util.getSystemErrorName;
    } else {
      try {
        uv = process.binding("uv");
        if (typeof uv.errname !== "function") {
          throw new TypeError("uv.errname is not a function");
        }
      } catch (err) {
        console.error("execa/lib/errname: unable to establish process.binding('uv')", err);
        uv = null;
      }
      module2.exports = (code) => errname(uv, code);
    }
    module2.exports.__test__ = errname;
    function errname(uv2, code) {
      if (uv2) {
        return uv2.errname(code);
      }
      if (!(code < 0)) {
        throw new Error("err >= 0");
      }
      return `Unknown system error ${code}`;
    }
  }
});

// node_modules/.pnpm/execa@1.0.0/node_modules/execa/lib/stdio.js
var require_stdio = __commonJS({
  "node_modules/.pnpm/execa@1.0.0/node_modules/execa/lib/stdio.js"(exports2, module2) {
    "use strict";
    var alias = ["stdin", "stdout", "stderr"];
    var hasAlias = (opts) => alias.some((x) => Boolean(opts[x]));
    module2.exports = (opts) => {
      if (!opts) {
        return null;
      }
      if (opts.stdio && hasAlias(opts)) {
        throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${alias.map((x) => `\`${x}\``).join(", ")}`);
      }
      if (typeof opts.stdio === "string") {
        return opts.stdio;
      }
      const stdio = opts.stdio || [];
      if (!Array.isArray(stdio)) {
        throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
      }
      const result = [];
      const len = Math.max(stdio.length, alias.length);
      for (let i = 0; i < len; i++) {
        let value = null;
        if (stdio[i] !== void 0) {
          value = stdio[i];
        } else if (opts[alias[i]] !== void 0) {
          value = opts[alias[i]];
        }
        result[i] = value;
      }
      return result;
    };
  }
});

// node_modules/.pnpm/execa@1.0.0/node_modules/execa/index.js
var require_execa = __commonJS({
  "node_modules/.pnpm/execa@1.0.0/node_modules/execa/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var childProcess = require("child_process");
    var crossSpawn = require_cross_spawn();
    var stripEof = require_strip_eof();
    var npmRunPath = require_npm_run_path();
    var isStream = require_is_stream();
    var _getStream = require_get_stream();
    var pFinally = require_p_finally();
    var onExit = require_signal_exit();
    var errname = require_errname();
    var stdio = require_stdio();
    var TEN_MEGABYTES = 1e3 * 1e3 * 10;
    function handleArgs(cmd, args, opts) {
      let parsed;
      opts = Object.assign({
        extendEnv: true,
        env: {}
      }, opts);
      if (opts.extendEnv) {
        opts.env = Object.assign({}, process.env, opts.env);
      }
      if (opts.__winShell === true) {
        delete opts.__winShell;
        parsed = {
          command: cmd,
          args,
          options: opts,
          file: cmd,
          original: {
            cmd,
            args
          }
        };
      } else {
        parsed = crossSpawn._parse(cmd, args, opts);
      }
      opts = Object.assign({
        maxBuffer: TEN_MEGABYTES,
        buffer: true,
        stripEof: true,
        preferLocal: true,
        localDir: parsed.options.cwd || process.cwd(),
        encoding: "utf8",
        reject: true,
        cleanup: true
      }, parsed.options);
      opts.stdio = stdio(opts);
      if (opts.preferLocal) {
        opts.env = npmRunPath.env(Object.assign({}, opts, { cwd: opts.localDir }));
      }
      if (opts.detached) {
        opts.cleanup = false;
      }
      if (process.platform === "win32" && path.basename(parsed.command) === "cmd.exe") {
        parsed.args.unshift("/q");
      }
      return {
        cmd: parsed.command,
        args: parsed.args,
        opts,
        parsed
      };
    }
    function handleInput(spawned, input) {
      if (input === null || input === void 0) {
        return;
      }
      if (isStream(input)) {
        input.pipe(spawned.stdin);
      } else {
        spawned.stdin.end(input);
      }
    }
    function handleOutput(opts, val) {
      if (val && opts.stripEof) {
        val = stripEof(val);
      }
      return val;
    }
    function handleShell(fn, cmd, opts) {
      let file = "/bin/sh";
      let args = ["-c", cmd];
      opts = Object.assign({}, opts);
      if (process.platform === "win32") {
        opts.__winShell = true;
        file = process.env.comspec || "cmd.exe";
        args = ["/s", "/c", `"${cmd}"`];
        opts.windowsVerbatimArguments = true;
      }
      if (opts.shell) {
        file = opts.shell;
        delete opts.shell;
      }
      return fn(file, args, opts);
    }
    function getStream(process2, stream, { encoding, buffer, maxBuffer }) {
      if (!process2[stream]) {
        return null;
      }
      let ret;
      if (!buffer) {
        ret = new Promise((resolve, reject) => {
          process2[stream].once("end", resolve).once("error", reject);
        });
      } else if (encoding) {
        ret = _getStream(process2[stream], {
          encoding,
          maxBuffer
        });
      } else {
        ret = _getStream.buffer(process2[stream], { maxBuffer });
      }
      return ret.catch((err) => {
        err.stream = stream;
        err.message = `${stream} ${err.message}`;
        throw err;
      });
    }
    function makeError(result, options) {
      const { stdout, stderr } = result;
      let err = result.error;
      const { code, signal } = result;
      const { parsed, joinedCmd } = options;
      const timedOut = options.timedOut || false;
      if (!err) {
        let output = "";
        if (Array.isArray(parsed.opts.stdio)) {
          if (parsed.opts.stdio[2] !== "inherit") {
            output += output.length > 0 ? stderr : `
${stderr}`;
          }
          if (parsed.opts.stdio[1] !== "inherit") {
            output += `
${stdout}`;
          }
        } else if (parsed.opts.stdio !== "inherit") {
          output = `
${stderr}${stdout}`;
        }
        err = new Error(`Command failed: ${joinedCmd}${output}`);
        err.code = code < 0 ? errname(code) : code;
      }
      err.stdout = stdout;
      err.stderr = stderr;
      err.failed = true;
      err.signal = signal || null;
      err.cmd = joinedCmd;
      err.timedOut = timedOut;
      return err;
    }
    function joinCmd(cmd, args) {
      let joinedCmd = cmd;
      if (Array.isArray(args) && args.length > 0) {
        joinedCmd += " " + args.join(" ");
      }
      return joinedCmd;
    }
    module2.exports = (cmd, args, opts) => {
      const parsed = handleArgs(cmd, args, opts);
      const { encoding, buffer, maxBuffer } = parsed.opts;
      const joinedCmd = joinCmd(cmd, args);
      let spawned;
      try {
        spawned = childProcess.spawn(parsed.cmd, parsed.args, parsed.opts);
      } catch (err) {
        return Promise.reject(err);
      }
      let removeExitHandler;
      if (parsed.opts.cleanup) {
        removeExitHandler = onExit(() => {
          spawned.kill();
        });
      }
      let timeoutId = null;
      let timedOut = false;
      const cleanup = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        if (removeExitHandler) {
          removeExitHandler();
        }
      };
      if (parsed.opts.timeout > 0) {
        timeoutId = setTimeout(() => {
          timeoutId = null;
          timedOut = true;
          spawned.kill(parsed.opts.killSignal);
        }, parsed.opts.timeout);
      }
      const processDone = new Promise((resolve) => {
        spawned.on("exit", (code, signal) => {
          cleanup();
          resolve({ code, signal });
        });
        spawned.on("error", (err) => {
          cleanup();
          resolve({ error: err });
        });
        if (spawned.stdin) {
          spawned.stdin.on("error", (err) => {
            cleanup();
            resolve({ error: err });
          });
        }
      });
      function destroy() {
        if (spawned.stdout) {
          spawned.stdout.destroy();
        }
        if (spawned.stderr) {
          spawned.stderr.destroy();
        }
      }
      const handlePromise = () => pFinally(Promise.all([
        processDone,
        getStream(spawned, "stdout", { encoding, buffer, maxBuffer }),
        getStream(spawned, "stderr", { encoding, buffer, maxBuffer })
      ]).then((arr) => {
        const result = arr[0];
        result.stdout = arr[1];
        result.stderr = arr[2];
        if (result.error || result.code !== 0 || result.signal !== null) {
          const err = makeError(result, {
            joinedCmd,
            parsed,
            timedOut
          });
          err.killed = err.killed || spawned.killed;
          if (!parsed.opts.reject) {
            return err;
          }
          throw err;
        }
        return {
          stdout: handleOutput(parsed.opts, result.stdout),
          stderr: handleOutput(parsed.opts, result.stderr),
          code: 0,
          failed: false,
          killed: false,
          signal: null,
          cmd: joinedCmd,
          timedOut: false
        };
      }), destroy);
      crossSpawn._enoent.hookChildProcess(spawned, parsed.parsed);
      handleInput(spawned, parsed.opts.input);
      spawned.then = (onfulfilled, onrejected) => handlePromise().then(onfulfilled, onrejected);
      spawned.catch = (onrejected) => handlePromise().catch(onrejected);
      return spawned;
    };
    module2.exports.stdout = (...args) => module2.exports(...args).then((x) => x.stdout);
    module2.exports.stderr = (...args) => module2.exports(...args).then((x) => x.stderr);
    module2.exports.shell = (cmd, opts) => handleShell(module2.exports, cmd, opts);
    module2.exports.sync = (cmd, args, opts) => {
      const parsed = handleArgs(cmd, args, opts);
      const joinedCmd = joinCmd(cmd, args);
      if (isStream(parsed.opts.input)) {
        throw new TypeError("The `input` option cannot be a stream in sync mode");
      }
      const result = childProcess.spawnSync(parsed.cmd, parsed.args, parsed.opts);
      result.code = result.status;
      if (result.error || result.status !== 0 || result.signal !== null) {
        const err = makeError(result, {
          joinedCmd,
          parsed
        });
        if (!parsed.opts.reject) {
          return err;
        }
        throw err;
      }
      return {
        stdout: handleOutput(parsed.opts, result.stdout),
        stderr: handleOutput(parsed.opts, result.stderr),
        code: 0,
        failed: false,
        signal: null,
        cmd: joinedCmd,
        timedOut: false
      };
    };
    module2.exports.shellSync = (cmd, opts) => handleShell(module2.exports.sync, cmd, opts);
  }
});

// node_modules/.pnpm/windows-release@3.3.0/node_modules/windows-release/index.js
var require_windows_release = __commonJS({
  "node_modules/.pnpm/windows-release@3.3.0/node_modules/windows-release/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var execa = require_execa();
    var names = /* @__PURE__ */ new Map([
      ["10.0", "10"],
      ["6.3", "8.1"],
      ["6.2", "8"],
      ["6.1", "7"],
      ["6.0", "Vista"],
      ["5.2", "Server 2003"],
      ["5.1", "XP"],
      ["5.0", "2000"],
      ["4.9", "ME"],
      ["4.1", "98"],
      ["4.0", "95"]
    ]);
    var windowsRelease = (release) => {
      const version = /\d+\.\d/.exec(release || os.release());
      if (release && !version) {
        throw new Error("`release` argument doesn't match `n.n`");
      }
      const ver = (version || [])[0];
      if ((!release || release === os.release()) && ["6.1", "6.2", "6.3", "10.0"].includes(ver)) {
        let stdout;
        try {
          stdout = execa.sync("powershell", ["(Get-CimInstance -ClassName Win32_OperatingSystem).caption"]).stdout || "";
        } catch (_2) {
          stdout = execa.sync("wmic", ["os", "get", "Caption"]).stdout || "";
        }
        const year = (stdout.match(/2008|2012|2016|2019/) || [])[0];
        if (year) {
          return `Server ${year}`;
        }
      }
      return names.get(ver);
    };
    module2.exports = windowsRelease;
  }
});

// node_modules/.pnpm/os-name@3.1.0/node_modules/os-name/index.js
var require_os_name = __commonJS({
  "node_modules/.pnpm/os-name@3.1.0/node_modules/os-name/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var macosRelease = require_macos_release();
    var winRelease = require_windows_release();
    var osName = (platform, release) => {
      if (!platform && release) {
        throw new Error("You can't specify a `release` without specifying `platform`");
      }
      platform = platform || os.platform();
      let id;
      if (platform === "darwin") {
        if (!release && os.platform() === "darwin") {
          release = os.release();
        }
        const prefix = release ? Number(release.split(".")[0]) > 15 ? "macOS" : "OS X" : "macOS";
        id = release ? macosRelease(release).name : "";
        return prefix + (id ? " " + id : "");
      }
      if (platform === "linux") {
        if (!release && os.platform() === "linux") {
          release = os.release();
        }
        id = release ? release.replace(/^(\d+\.\d+).*/, "$1") : "";
        return "Linux" + (id ? " " + id : "");
      }
      if (platform === "win32") {
        if (!release && os.platform() === "win32") {
          release = os.release();
        }
        id = release ? winRelease(release) : "";
        return "Windows" + (id ? " " + id : "");
      }
      return platform;
    };
    module2.exports = osName;
  }
});

// node_modules/.pnpm/universal-user-agent@5.0.0/node_modules/universal-user-agent/dist-node/index.js
var require_dist_node = __commonJS({
  "node_modules/.pnpm/universal-user-agent@5.0.0/node_modules/universal-user-agent/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var osName = _interopDefault(require_os_name());
    function getUserAgent() {
      try {
        return `Node.js/${process.version.substr(1)} (${osName()}; ${process.arch})`;
      } catch (error) {
        if (/wmic os get Caption/.test(error.message)) {
          return "Windows <version undetectable>";
        }
        return "<environment undetectable>";
      }
    }
    exports2.getUserAgent = getUserAgent;
  }
});

// node_modules/.pnpm/@octokit+endpoint@6.0.0/node_modules/@octokit/endpoint/dist-node/index.js
var require_dist_node2 = __commonJS({
  "node_modules/.pnpm/@octokit+endpoint@6.0.0/node_modules/@octokit/endpoint/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var isPlainObject = _interopDefault(require_index_cjs());
    var universalUserAgent = require_dist_node();
    function lowercaseKeys(object) {
      if (!object) {
        return {};
      }
      return Object.keys(object).reduce((newObj, key) => {
        newObj[key.toLowerCase()] = object[key];
        return newObj;
      }, {});
    }
    function mergeDeep(defaults, options) {
      const result = Object.assign({}, defaults);
      Object.keys(options).forEach((key) => {
        if (isPlainObject(options[key])) {
          if (!(key in defaults)) Object.assign(result, {
            [key]: options[key]
          });
          else result[key] = mergeDeep(defaults[key], options[key]);
        } else {
          Object.assign(result, {
            [key]: options[key]
          });
        }
      });
      return result;
    }
    function merge(defaults, route, options) {
      if (typeof route === "string") {
        let [method, url] = route.split(" ");
        options = Object.assign(url ? {
          method,
          url
        } : {
          url: method
        }, options);
      } else {
        options = Object.assign({}, route);
      }
      options.headers = lowercaseKeys(options.headers);
      const mergedOptions = mergeDeep(defaults || {}, options);
      if (defaults && defaults.mediaType.previews.length) {
        mergedOptions.mediaType.previews = defaults.mediaType.previews.filter((preview) => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
      }
      mergedOptions.mediaType.previews = mergedOptions.mediaType.previews.map((preview) => preview.replace(/-preview/, ""));
      return mergedOptions;
    }
    function addQueryParameters(url, parameters) {
      const separator = /\?/.test(url) ? "&" : "?";
      const names = Object.keys(parameters);
      if (names.length === 0) {
        return url;
      }
      return url + separator + names.map((name) => {
        if (name === "q") {
          return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
        }
        return `${name}=${encodeURIComponent(parameters[name])}`;
      }).join("&");
    }
    var urlVariableRegex = /\{[^}]+\}/g;
    function removeNonChars(variableName) {
      return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
    }
    function extractUrlVariableNames(url) {
      const matches = url.match(urlVariableRegex);
      if (!matches) {
        return [];
      }
      return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
    }
    function omit(object, keysToOmit) {
      return Object.keys(object).filter((option) => !keysToOmit.includes(option)).reduce((obj, key) => {
        obj[key] = object[key];
        return obj;
      }, {});
    }
    function encodeReserved(str) {
      return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
          part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
        }
        return part;
      }).join("");
    }
    function encodeUnreserved(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
      });
    }
    function encodeValue(operator, value, key) {
      value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);
      if (key) {
        return encodeUnreserved(key) + "=" + value;
      } else {
        return value;
      }
    }
    function isDefined(value) {
      return value !== void 0 && value !== null;
    }
    function isKeyOperator(operator) {
      return operator === ";" || operator === "&" || operator === "?";
    }
    function getValues(context, operator, key, modifier) {
      var value = context[key], result = [];
      if (isDefined(value) && value !== "") {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
          value = value.toString();
          if (modifier && modifier !== "*") {
            value = value.substring(0, parseInt(modifier, 10));
          }
          result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
        } else {
          if (modifier === "*") {
            if (Array.isArray(value)) {
              value.filter(isDefined).forEach(function(value2) {
                result.push(encodeValue(operator, value2, isKeyOperator(operator) ? key : ""));
              });
            } else {
              Object.keys(value).forEach(function(k) {
                if (isDefined(value[k])) {
                  result.push(encodeValue(operator, value[k], k));
                }
              });
            }
          } else {
            const tmp = [];
            if (Array.isArray(value)) {
              value.filter(isDefined).forEach(function(value2) {
                tmp.push(encodeValue(operator, value2));
              });
            } else {
              Object.keys(value).forEach(function(k) {
                if (isDefined(value[k])) {
                  tmp.push(encodeUnreserved(k));
                  tmp.push(encodeValue(operator, value[k].toString()));
                }
              });
            }
            if (isKeyOperator(operator)) {
              result.push(encodeUnreserved(key) + "=" + tmp.join(","));
            } else if (tmp.length !== 0) {
              result.push(tmp.join(","));
            }
          }
        }
      } else {
        if (operator === ";") {
          if (isDefined(value)) {
            result.push(encodeUnreserved(key));
          }
        } else if (value === "" && (operator === "&" || operator === "?")) {
          result.push(encodeUnreserved(key) + "=");
        } else if (value === "") {
          result.push("");
        }
      }
      return result;
    }
    function parseUrl(template) {
      return {
        expand: expand.bind(null, template)
      };
    }
    function expand(template, context) {
      var operators = ["+", "#", ".", "/", ";", "?", "&"];
      return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function(_2, expression, literal) {
        if (expression) {
          let operator = "";
          const values = [];
          if (operators.indexOf(expression.charAt(0)) !== -1) {
            operator = expression.charAt(0);
            expression = expression.substr(1);
          }
          expression.split(/,/g).forEach(function(variable) {
            var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
            values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
          });
          if (operator && operator !== "+") {
            var separator = ",";
            if (operator === "?") {
              separator = "&";
            } else if (operator !== "#") {
              separator = operator;
            }
            return (values.length !== 0 ? operator : "") + values.join(separator);
          } else {
            return values.join(",");
          }
        } else {
          return encodeReserved(literal);
        }
      });
    }
    function parse(options) {
      let method = options.method.toUpperCase();
      let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{+$1}");
      let headers = Object.assign({}, options.headers);
      let body;
      let parameters = omit(options, ["method", "baseUrl", "url", "headers", "request", "mediaType"]);
      const urlVariableNames = extractUrlVariableNames(url);
      url = parseUrl(url).expand(parameters);
      if (!/^http/.test(url)) {
        url = options.baseUrl + url;
      }
      const omittedParameters = Object.keys(options).filter((option) => urlVariableNames.includes(option)).concat("baseUrl");
      const remainingParameters = omit(parameters, omittedParameters);
      const isBinaryRequset = /application\/octet-stream/i.test(headers.accept);
      if (!isBinaryRequset) {
        if (options.mediaType.format) {
          headers.accept = headers.accept.split(/,/).map((preview) => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
        }
        if (options.mediaType.previews.length) {
          const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
          headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map((preview) => {
            const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
            return `application/vnd.github.${preview}-preview${format}`;
          }).join(",");
        }
      }
      if (["GET", "HEAD"].includes(method)) {
        url = addQueryParameters(url, remainingParameters);
      } else {
        if ("data" in remainingParameters) {
          body = remainingParameters.data;
        } else {
          if (Object.keys(remainingParameters).length) {
            body = remainingParameters;
          } else {
            headers["content-length"] = 0;
          }
        }
      }
      if (!headers["content-type"] && typeof body !== "undefined") {
        headers["content-type"] = "application/json; charset=utf-8";
      }
      if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
        body = "";
      }
      return Object.assign({
        method,
        url,
        headers
      }, typeof body !== "undefined" ? {
        body
      } : null, options.request ? {
        request: options.request
      } : null);
    }
    function endpointWithDefaults(defaults, route, options) {
      return parse(merge(defaults, route, options));
    }
    function withDefaults(oldDefaults, newDefaults) {
      const DEFAULTS2 = merge(oldDefaults, newDefaults);
      const endpoint2 = endpointWithDefaults.bind(null, DEFAULTS2);
      return Object.assign(endpoint2, {
        DEFAULTS: DEFAULTS2,
        defaults: withDefaults.bind(null, DEFAULTS2),
        merge: merge.bind(null, DEFAULTS2),
        parse
      });
    }
    var VERSION = "6.0.0";
    var userAgent = `octokit-endpoint.js/${VERSION} ${universalUserAgent.getUserAgent()}`;
    var DEFAULTS = {
      method: "GET",
      baseUrl: "https://api.github.com",
      headers: {
        accept: "application/vnd.github.v3+json",
        "user-agent": userAgent
      },
      mediaType: {
        format: "",
        previews: []
      }
    };
    var endpoint = withDefaults(null, DEFAULTS);
    exports2.endpoint = endpoint;
  }
});

// node_modules/.pnpm/node-fetch@2.6.0/node_modules/node-fetch/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/node-fetch@2.6.0/node_modules/node-fetch/lib/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var Stream = _interopDefault(require("stream"));
    var http = _interopDefault(require("http"));
    var Url = _interopDefault(require("url"));
    var https = _interopDefault(require("https"));
    var zlib = _interopDefault(require("zlib"));
    var Readable = Stream.Readable;
    var BUFFER = /* @__PURE__ */ Symbol("buffer");
    var TYPE = /* @__PURE__ */ Symbol("type");
    var Blob = class _Blob {
      constructor() {
        this[TYPE] = "";
        const blobParts = arguments[0];
        const options = arguments[1];
        const buffers = [];
        let size = 0;
        if (blobParts) {
          const a = blobParts;
          const length = Number(a.length);
          for (let i = 0; i < length; i++) {
            const element = a[i];
            let buffer;
            if (element instanceof Buffer) {
              buffer = element;
            } else if (ArrayBuffer.isView(element)) {
              buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
            } else if (element instanceof ArrayBuffer) {
              buffer = Buffer.from(element);
            } else if (element instanceof _Blob) {
              buffer = element[BUFFER];
            } else {
              buffer = Buffer.from(typeof element === "string" ? element : String(element));
            }
            size += buffer.length;
            buffers.push(buffer);
          }
        }
        this[BUFFER] = Buffer.concat(buffers);
        let type = options && options.type !== void 0 && String(options.type).toLowerCase();
        if (type && !/[^\u0020-\u007E]/.test(type)) {
          this[TYPE] = type;
        }
      }
      get size() {
        return this[BUFFER].length;
      }
      get type() {
        return this[TYPE];
      }
      text() {
        return Promise.resolve(this[BUFFER].toString());
      }
      arrayBuffer() {
        const buf = this[BUFFER];
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        return Promise.resolve(ab);
      }
      stream() {
        const readable = new Readable();
        readable._read = function() {
        };
        readable.push(this[BUFFER]);
        readable.push(null);
        return readable;
      }
      toString() {
        return "[object Blob]";
      }
      slice() {
        const size = this.size;
        const start = arguments[0];
        const end = arguments[1];
        let relativeStart, relativeEnd;
        if (start === void 0) {
          relativeStart = 0;
        } else if (start < 0) {
          relativeStart = Math.max(size + start, 0);
        } else {
          relativeStart = Math.min(start, size);
        }
        if (end === void 0) {
          relativeEnd = size;
        } else if (end < 0) {
          relativeEnd = Math.max(size + end, 0);
        } else {
          relativeEnd = Math.min(end, size);
        }
        const span = Math.max(relativeEnd - relativeStart, 0);
        const buffer = this[BUFFER];
        const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
        const blob = new _Blob([], { type: arguments[2] });
        blob[BUFFER] = slicedBuffer;
        return blob;
      }
    };
    Object.defineProperties(Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
      value: "Blob",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function FetchError(message, type, systemError) {
      Error.call(this, message);
      this.message = message;
      this.type = type;
      if (systemError) {
        this.code = this.errno = systemError.code;
      }
      Error.captureStackTrace(this, this.constructor);
    }
    FetchError.prototype = Object.create(Error.prototype);
    FetchError.prototype.constructor = FetchError;
    FetchError.prototype.name = "FetchError";
    var convert;
    try {
      convert = require("encoding").convert;
    } catch (e) {
    }
    var INTERNALS = /* @__PURE__ */ Symbol("Body internals");
    var PassThrough = Stream.PassThrough;
    function Body(body) {
      var _this = this;
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
      let size = _ref$size === void 0 ? 0 : _ref$size;
      var _ref$timeout = _ref.timeout;
      let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
      if (body == null) {
        body = null;
      } else if (isURLSearchParams(body)) {
        body = Buffer.from(body.toString());
      } else if (isBlob(body)) ;
      else if (Buffer.isBuffer(body)) ;
      else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
        body = Buffer.from(body);
      } else if (ArrayBuffer.isView(body)) {
        body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
      } else if (body instanceof Stream) ;
      else {
        body = Buffer.from(String(body));
      }
      this[INTERNALS] = {
        body,
        disturbed: false,
        error: null
      };
      this.size = size;
      this.timeout = timeout;
      if (body instanceof Stream) {
        body.on("error", function(err) {
          const error = err.name === "AbortError" ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
          _this[INTERNALS].error = error;
        });
      }
    }
    Body.prototype = {
      get body() {
        return this[INTERNALS].body;
      },
      get bodyUsed() {
        return this[INTERNALS].disturbed;
      },
      /**
       * Decode response as ArrayBuffer
       *
       * @return  Promise
       */
      arrayBuffer() {
        return consumeBody.call(this).then(function(buf) {
          return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        });
      },
      /**
       * Return raw response as Blob
       *
       * @return Promise
       */
      blob() {
        let ct = this.headers && this.headers.get("content-type") || "";
        return consumeBody.call(this).then(function(buf) {
          return Object.assign(
            // Prevent copying
            new Blob([], {
              type: ct.toLowerCase()
            }),
            {
              [BUFFER]: buf
            }
          );
        });
      },
      /**
       * Decode response as json
       *
       * @return  Promise
       */
      json() {
        var _this2 = this;
        return consumeBody.call(this).then(function(buffer) {
          try {
            return JSON.parse(buffer.toString());
          } catch (err) {
            return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
          }
        });
      },
      /**
       * Decode response as text
       *
       * @return  Promise
       */
      text() {
        return consumeBody.call(this).then(function(buffer) {
          return buffer.toString();
        });
      },
      /**
       * Decode response as buffer (non-spec api)
       *
       * @return  Promise
       */
      buffer() {
        return consumeBody.call(this);
      },
      /**
       * Decode response as text, while automatically detecting the encoding and
       * trying to decode to UTF-8 (non-spec api)
       *
       * @return  Promise
       */
      textConverted() {
        var _this3 = this;
        return consumeBody.call(this).then(function(buffer) {
          return convertBody(buffer, _this3.headers);
        });
      }
    };
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    Body.mixIn = function(proto) {
      for (const name of Object.getOwnPropertyNames(Body.prototype)) {
        if (!(name in proto)) {
          const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
          Object.defineProperty(proto, name, desc);
        }
      }
    };
    function consumeBody() {
      var _this4 = this;
      if (this[INTERNALS].disturbed) {
        return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
      }
      this[INTERNALS].disturbed = true;
      if (this[INTERNALS].error) {
        return Body.Promise.reject(this[INTERNALS].error);
      }
      let body = this.body;
      if (body === null) {
        return Body.Promise.resolve(Buffer.alloc(0));
      }
      if (isBlob(body)) {
        body = body.stream();
      }
      if (Buffer.isBuffer(body)) {
        return Body.Promise.resolve(body);
      }
      if (!(body instanceof Stream)) {
        return Body.Promise.resolve(Buffer.alloc(0));
      }
      let accum = [];
      let accumBytes = 0;
      let abort = false;
      return new Body.Promise(function(resolve, reject) {
        let resTimeout;
        if (_this4.timeout) {
          resTimeout = setTimeout(function() {
            abort = true;
            reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
          }, _this4.timeout);
        }
        body.on("error", function(err) {
          if (err.name === "AbortError") {
            abort = true;
            reject(err);
          } else {
            reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
          }
        });
        body.on("data", function(chunk) {
          if (abort || chunk === null) {
            return;
          }
          if (_this4.size && accumBytes + chunk.length > _this4.size) {
            abort = true;
            reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
            return;
          }
          accumBytes += chunk.length;
          accum.push(chunk);
        });
        body.on("end", function() {
          if (abort) {
            return;
          }
          clearTimeout(resTimeout);
          try {
            resolve(Buffer.concat(accum, accumBytes));
          } catch (err) {
            reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
          }
        });
      });
    }
    function convertBody(buffer, headers) {
      if (typeof convert !== "function") {
        throw new Error("The package `encoding` must be installed to use the textConverted() function");
      }
      const ct = headers.get("content-type");
      let charset = "utf-8";
      let res, str;
      if (ct) {
        res = /charset=([^;]*)/i.exec(ct);
      }
      str = buffer.slice(0, 1024).toString();
      if (!res && str) {
        res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
      }
      if (!res && str) {
        res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
        if (res) {
          res = /charset=(.*)/i.exec(res.pop());
        }
      }
      if (!res && str) {
        res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
      }
      if (res) {
        charset = res.pop();
        if (charset === "gb2312" || charset === "gbk") {
          charset = "gb18030";
        }
      }
      return convert(buffer, "UTF-8", charset).toString();
    }
    function isURLSearchParams(obj) {
      if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
        return false;
      }
      return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
    }
    function isBlob(obj) {
      return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
    }
    function clone(instance) {
      let p1, p2;
      let body = instance.body;
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof Stream && typeof body.getBoundary !== "function") {
        p1 = new PassThrough();
        p2 = new PassThrough();
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS].body = p1;
        body = p2;
      }
      return body;
    }
    function extractContentType(body) {
      if (body === null) {
        return null;
      } else if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      } else if (isURLSearchParams(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      } else if (isBlob(body)) {
        return body.type || null;
      } else if (Buffer.isBuffer(body)) {
        return null;
      } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
        return null;
      } else if (ArrayBuffer.isView(body)) {
        return null;
      } else if (typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${body.getBoundary()}`;
      } else if (body instanceof Stream) {
        return null;
      } else {
        return "text/plain;charset=UTF-8";
      }
    }
    function getTotalBytes(instance) {
      const body = instance.body;
      if (body === null) {
        return 0;
      } else if (isBlob(body)) {
        return body.size;
      } else if (Buffer.isBuffer(body)) {
        return body.length;
      } else if (body && typeof body.getLengthSync === "function") {
        if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
        body.hasKnownLength && body.hasKnownLength()) {
          return body.getLengthSync();
        }
        return null;
      } else {
        return null;
      }
    }
    function writeToStream(dest, instance) {
      const body = instance.body;
      if (body === null) {
        dest.end();
      } else if (isBlob(body)) {
        body.stream().pipe(dest);
      } else if (Buffer.isBuffer(body)) {
        dest.write(body);
        dest.end();
      } else {
        body.pipe(dest);
      }
    }
    Body.Promise = global.Promise;
    var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
    var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
    function validateName(name) {
      name = `${name}`;
      if (invalidTokenRegex.test(name) || name === "") {
        throw new TypeError(`${name} is not a legal HTTP header name`);
      }
    }
    function validateValue(value) {
      value = `${value}`;
      if (invalidHeaderCharRegex.test(value)) {
        throw new TypeError(`${value} is not a legal HTTP header value`);
      }
    }
    function find(map, name) {
      name = name.toLowerCase();
      for (const key in map) {
        if (key.toLowerCase() === name) {
          return key;
        }
      }
      return void 0;
    }
    var MAP = /* @__PURE__ */ Symbol("map");
    var Headers = class _Headers {
      /**
       * Headers class
       *
       * @param   Object  headers  Response headers
       * @return  Void
       */
      constructor() {
        let init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        this[MAP] = /* @__PURE__ */ Object.create(null);
        if (init instanceof _Headers) {
          const rawHeaders = init.raw();
          const headerNames = Object.keys(rawHeaders);
          for (const headerName of headerNames) {
            for (const value of rawHeaders[headerName]) {
              this.append(headerName, value);
            }
          }
          return;
        }
        if (init == null) ;
        else if (typeof init === "object") {
          const method = init[Symbol.iterator];
          if (method != null) {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            const pairs = [];
            for (const pair of init) {
              if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
                throw new TypeError("Each header pair must be iterable");
              }
              pairs.push(Array.from(pair));
            }
            for (const pair of pairs) {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              this.append(pair[0], pair[1]);
            }
          } else {
            for (const key of Object.keys(init)) {
              const value = init[key];
              this.append(key, value);
            }
          }
        } else {
          throw new TypeError("Provided initializer must be an object");
        }
      }
      /**
       * Return combined header value given name
       *
       * @param   String  name  Header name
       * @return  Mixed
       */
      get(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key === void 0) {
          return null;
        }
        return this[MAP][key].join(", ");
      }
      /**
       * Iterate over all headers
       *
       * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
       * @param   Boolean   thisArg   `this` context for callback function
       * @return  Void
       */
      forEach(callback) {
        let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
        let pairs = getHeaders(this);
        let i = 0;
        while (i < pairs.length) {
          var _pairs$i = pairs[i];
          const name = _pairs$i[0], value = _pairs$i[1];
          callback.call(thisArg, value, name, this);
          pairs = getHeaders(this);
          i++;
        }
      }
      /**
       * Overwrite header values given name
       *
       * @param   String  name   Header name
       * @param   String  value  Header value
       * @return  Void
       */
      set(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        this[MAP][key !== void 0 ? key : name] = [value];
      }
      /**
       * Append a value onto existing header
       *
       * @param   String  name   Header name
       * @param   String  value  Header value
       * @return  Void
       */
      append(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        if (key !== void 0) {
          this[MAP][key].push(value);
        } else {
          this[MAP][name] = [value];
        }
      }
      /**
       * Check for header name existence
       *
       * @param   String   name  Header name
       * @return  Boolean
       */
      has(name) {
        name = `${name}`;
        validateName(name);
        return find(this[MAP], name) !== void 0;
      }
      /**
       * Delete all header values given name
       *
       * @param   String  name  Header name
       * @return  Void
       */
      delete(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key !== void 0) {
          delete this[MAP][key];
        }
      }
      /**
       * Return raw headers (non-spec api)
       *
       * @return  Object
       */
      raw() {
        return this[MAP];
      }
      /**
       * Get an iterator on keys.
       *
       * @return  Iterator
       */
      keys() {
        return createHeadersIterator(this, "key");
      }
      /**
       * Get an iterator on values.
       *
       * @return  Iterator
       */
      values() {
        return createHeadersIterator(this, "value");
      }
      /**
       * Get an iterator on entries.
       *
       * This is the default iterator of the Headers object.
       *
       * @return  Iterator
       */
      [Symbol.iterator]() {
        return createHeadersIterator(this, "key+value");
      }
    };
    Headers.prototype.entries = Headers.prototype[Symbol.iterator];
    Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
      value: "Headers",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Headers.prototype, {
      get: { enumerable: true },
      forEach: { enumerable: true },
      set: { enumerable: true },
      append: { enumerable: true },
      has: { enumerable: true },
      delete: { enumerable: true },
      keys: { enumerable: true },
      values: { enumerable: true },
      entries: { enumerable: true }
    });
    function getHeaders(headers) {
      let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
      const keys = Object.keys(headers[MAP]).sort();
      return keys.map(kind === "key" ? function(k) {
        return k.toLowerCase();
      } : kind === "value" ? function(k) {
        return headers[MAP][k].join(", ");
      } : function(k) {
        return [k.toLowerCase(), headers[MAP][k].join(", ")];
      });
    }
    var INTERNAL = /* @__PURE__ */ Symbol("internal");
    function createHeadersIterator(target, kind) {
      const iterator = Object.create(HeadersIteratorPrototype);
      iterator[INTERNAL] = {
        target,
        kind,
        index: 0
      };
      return iterator;
    }
    var HeadersIteratorPrototype = Object.setPrototypeOf({
      next() {
        if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
          throw new TypeError("Value of `this` is not a HeadersIterator");
        }
        var _INTERNAL = this[INTERNAL];
        const target = _INTERNAL.target, kind = _INTERNAL.kind, index = _INTERNAL.index;
        const values = getHeaders(target, kind);
        const len = values.length;
        if (index >= len) {
          return {
            value: void 0,
            done: true
          };
        }
        this[INTERNAL].index = index + 1;
        return {
          value: values[index],
          done: false
        };
      }
    }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
    Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
      value: "HeadersIterator",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function exportNodeCompatibleHeaders(headers) {
      const obj = Object.assign({ __proto__: null }, headers[MAP]);
      const hostHeaderKey = find(headers[MAP], "Host");
      if (hostHeaderKey !== void 0) {
        obj[hostHeaderKey] = obj[hostHeaderKey][0];
      }
      return obj;
    }
    function createHeadersLenient(obj) {
      const headers = new Headers();
      for (const name of Object.keys(obj)) {
        if (invalidTokenRegex.test(name)) {
          continue;
        }
        if (Array.isArray(obj[name])) {
          for (const val of obj[name]) {
            if (invalidHeaderCharRegex.test(val)) {
              continue;
            }
            if (headers[MAP][name] === void 0) {
              headers[MAP][name] = [val];
            } else {
              headers[MAP][name].push(val);
            }
          }
        } else if (!invalidHeaderCharRegex.test(obj[name])) {
          headers[MAP][name] = [obj[name]];
        }
      }
      return headers;
    }
    var INTERNALS$1 = /* @__PURE__ */ Symbol("Response internals");
    var STATUS_CODES = http.STATUS_CODES;
    var Response = class _Response {
      constructor() {
        let body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        Body.call(this, body, opts);
        const status = opts.status || 200;
        const headers = new Headers(opts.headers);
        if (body != null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          url: opts.url,
          status,
          statusText: opts.statusText || STATUS_CODES[status],
          headers,
          counter: opts.counter
        };
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      /**
       * Convenience property representing if the request ended normally
       */
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      /**
       * Clone this response
       *
       * @return  Response
       */
      clone() {
        return new _Response(clone(this), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected
        });
      }
    };
    Body.mixIn(Response.prototype);
    Object.defineProperties(Response.prototype, {
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    Object.defineProperty(Response.prototype, Symbol.toStringTag, {
      value: "Response",
      writable: false,
      enumerable: false,
      configurable: true
    });
    var INTERNALS$2 = /* @__PURE__ */ Symbol("Request internals");
    var parse_url = Url.parse;
    var format_url = Url.format;
    var streamDestructionSupported = "destroy" in Stream.Readable.prototype;
    function isRequest(input) {
      return typeof input === "object" && typeof input[INTERNALS$2] === "object";
    }
    function isAbortSignal(signal) {
      const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
      return !!(proto && proto.constructor.name === "AbortSignal");
    }
    var Request = class _Request {
      constructor(input) {
        let init = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        let parsedURL;
        if (!isRequest(input)) {
          if (input && input.href) {
            parsedURL = parse_url(input.href);
          } else {
            parsedURL = parse_url(`${input}`);
          }
          input = {};
        } else {
          parsedURL = parse_url(input.url);
        }
        let method = init.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        Body.call(this, inputBody, {
          timeout: init.timeout || input.timeout || 0,
          size: init.size || input.size || 0
        });
        const headers = new Headers(init.headers || input.headers || {});
        if (inputBody != null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init) signal = init.signal;
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal");
        }
        this[INTERNALS$2] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal
        };
        this.follow = init.follow !== void 0 ? init.follow : input.follow !== void 0 ? input.follow : 20;
        this.compress = init.compress !== void 0 ? init.compress : input.compress !== void 0 ? input.compress : true;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
      }
      get method() {
        return this[INTERNALS$2].method;
      }
      get url() {
        return format_url(this[INTERNALS$2].parsedURL);
      }
      get headers() {
        return this[INTERNALS$2].headers;
      }
      get redirect() {
        return this[INTERNALS$2].redirect;
      }
      get signal() {
        return this[INTERNALS$2].signal;
      }
      /**
       * Clone this request
       *
       * @return  Request
       */
      clone() {
        return new _Request(this);
      }
    };
    Body.mixIn(Request.prototype);
    Object.defineProperty(Request.prototype, Symbol.toStringTag, {
      value: "Request",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true }
    });
    function getNodeRequestOptions(request) {
      const parsedURL = request[INTERNALS$2].parsedURL;
      const headers = new Headers(request[INTERNALS$2].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      if (!parsedURL.protocol || !parsedURL.hostname) {
        throw new TypeError("Only absolute URLs are supported");
      }
      if (!/^https?:$/.test(parsedURL.protocol)) {
        throw new TypeError("Only HTTP(S) protocols are supported");
      }
      if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
        throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
      }
      let contentLengthValue = null;
      if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body != null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number") {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate");
      }
      let agent = request.agent;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      return Object.assign({}, parsedURL, {
        method: request.method,
        headers: exportNodeCompatibleHeaders(headers),
        agent
      });
    }
    function AbortError(message) {
      Error.call(this, message);
      this.type = "aborted";
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
    AbortError.prototype = Object.create(Error.prototype);
    AbortError.prototype.constructor = AbortError;
    AbortError.prototype.name = "AbortError";
    var PassThrough$1 = Stream.PassThrough;
    var resolve_url = Url.resolve;
    function fetch2(url, opts) {
      if (!fetch2.Promise) {
        throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
      }
      Body.Promise = fetch2.Promise;
      return new fetch2.Promise(function(resolve, reject) {
        const request = new Request(url, opts);
        const options = getNodeRequestOptions(request);
        const send = (options.protocol === "https:" ? https : http).request;
        const signal = request.signal;
        let response = null;
        const abort = function abort2() {
          let error = new AbortError("The user aborted a request.");
          reject(error);
          if (request.body && request.body instanceof Stream.Readable) {
            request.body.destroy(error);
          }
          if (!response || !response.body) return;
          response.body.emit("error", error);
        };
        if (signal && signal.aborted) {
          abort();
          return;
        }
        const abortAndFinalize = function abortAndFinalize2() {
          abort();
          finalize();
        };
        const req = send(options);
        let reqTimeout;
        if (signal) {
          signal.addEventListener("abort", abortAndFinalize);
        }
        function finalize() {
          req.abort();
          if (signal) signal.removeEventListener("abort", abortAndFinalize);
          clearTimeout(reqTimeout);
        }
        if (request.timeout) {
          req.once("socket", function(socket) {
            reqTimeout = setTimeout(function() {
              reject(new FetchError(`network timeout at: ${request.url}`, "request-timeout"));
              finalize();
            }, request.timeout);
          });
        }
        req.on("error", function(err) {
          reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
          finalize();
        });
        req.on("response", function(res) {
          clearTimeout(reqTimeout);
          const headers = createHeadersLenient(res.headers);
          if (fetch2.isRedirect(res.statusCode)) {
            const location = headers.get("Location");
            const locationURL = location === null ? null : resolve_url(request.url, location);
            switch (request.redirect) {
              case "error":
                reject(new FetchError(`redirect mode is set to error: ${request.url}`, "no-redirect"));
                finalize();
                return;
              case "manual":
                if (locationURL !== null) {
                  try {
                    headers.set("Location", locationURL);
                  } catch (err) {
                    reject(err);
                  }
                }
                break;
              case "follow":
                if (locationURL === null) {
                  break;
                }
                if (request.counter >= request.follow) {
                  reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
                  finalize();
                  return;
                }
                const requestOpts = {
                  headers: new Headers(request.headers),
                  follow: request.follow,
                  counter: request.counter + 1,
                  agent: request.agent,
                  compress: request.compress,
                  method: request.method,
                  body: request.body,
                  signal: request.signal,
                  timeout: request.timeout
                };
                if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
                  reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
                  finalize();
                  return;
                }
                if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
                  requestOpts.method = "GET";
                  requestOpts.body = void 0;
                  requestOpts.headers.delete("content-length");
                }
                resolve(fetch2(new Request(locationURL, requestOpts)));
                finalize();
                return;
            }
          }
          res.once("end", function() {
            if (signal) signal.removeEventListener("abort", abortAndFinalize);
          });
          let body = res.pipe(new PassThrough$1());
          const response_options = {
            url: request.url,
            status: res.statusCode,
            statusText: res.statusMessage,
            headers,
            size: request.size,
            timeout: request.timeout,
            counter: request.counter
          };
          const codings = headers.get("Content-Encoding");
          if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
            response = new Response(body, response_options);
            resolve(response);
            return;
          }
          const zlibOptions = {
            flush: zlib.Z_SYNC_FLUSH,
            finishFlush: zlib.Z_SYNC_FLUSH
          };
          if (codings == "gzip" || codings == "x-gzip") {
            body = body.pipe(zlib.createGunzip(zlibOptions));
            response = new Response(body, response_options);
            resolve(response);
            return;
          }
          if (codings == "deflate" || codings == "x-deflate") {
            const raw = res.pipe(new PassThrough$1());
            raw.once("data", function(chunk) {
              if ((chunk[0] & 15) === 8) {
                body = body.pipe(zlib.createInflate());
              } else {
                body = body.pipe(zlib.createInflateRaw());
              }
              response = new Response(body, response_options);
              resolve(response);
            });
            return;
          }
          if (codings == "br" && typeof zlib.createBrotliDecompress === "function") {
            body = body.pipe(zlib.createBrotliDecompress());
            response = new Response(body, response_options);
            resolve(response);
            return;
          }
          response = new Response(body, response_options);
          resolve(response);
        });
        writeToStream(req, request);
      });
    }
    fetch2.isRedirect = function(code) {
      return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
    };
    fetch2.Promise = global.Promise;
    module2.exports = exports2 = fetch2;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = exports2;
    exports2.Headers = Headers;
    exports2.Request = Request;
    exports2.Response = Response;
    exports2.FetchError = FetchError;
  }
});

// node_modules/.pnpm/deprecation@2.3.1/node_modules/deprecation/dist-node/index.js
var require_dist_node3 = __commonJS({
  "node_modules/.pnpm/deprecation@2.3.1/node_modules/deprecation/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Deprecation = class extends Error {
      constructor(message) {
        super(message);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "Deprecation";
      }
    };
    exports2.Deprecation = Deprecation;
  }
});

// node_modules/.pnpm/@octokit+request-error@2.0.0/node_modules/@octokit/request-error/dist-node/index.js
var require_dist_node4 = __commonJS({
  "node_modules/.pnpm/@octokit+request-error@2.0.0/node_modules/@octokit/request-error/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var deprecation = require_dist_node3();
    var once = _interopDefault(require_once());
    var logOnce = once((deprecation2) => console.warn(deprecation2));
    var RequestError = class extends Error {
      constructor(message, statusCode, options) {
        super(message);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "HttpError";
        this.status = statusCode;
        Object.defineProperty(this, "code", {
          get() {
            logOnce(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
            return statusCode;
          }
        });
        this.headers = options.headers || {};
        const requestCopy = Object.assign({}, options.request);
        if (options.request.headers.authorization) {
          requestCopy.headers = Object.assign({}, options.request.headers, {
            authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
          });
        }
        requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
        this.request = requestCopy;
      }
    };
    exports2.RequestError = RequestError;
  }
});

// node_modules/.pnpm/@octokit+request@5.3.4/node_modules/@octokit/request/dist-node/index.js
var require_dist_node5 = __commonJS({
  "node_modules/.pnpm/@octokit+request@5.3.4/node_modules/@octokit/request/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var endpoint = require_dist_node2();
    var universalUserAgent = require_dist_node();
    var isPlainObject = _interopDefault(require_index_cjs());
    var nodeFetch = _interopDefault(require_lib());
    var requestError = require_dist_node4();
    var VERSION = "5.3.4";
    function getBufferResponse(response) {
      return response.arrayBuffer();
    }
    function fetchWrapper(requestOptions) {
      if (isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
        requestOptions.body = JSON.stringify(requestOptions.body);
      }
      let headers = {};
      let status;
      let url;
      const fetch2 = requestOptions.request && requestOptions.request.fetch || nodeFetch;
      return fetch2(requestOptions.url, Object.assign({
        method: requestOptions.method,
        body: requestOptions.body,
        headers: requestOptions.headers,
        redirect: requestOptions.redirect
      }, requestOptions.request)).then((response) => {
        url = response.url;
        status = response.status;
        for (const keyAndValue of response.headers) {
          headers[keyAndValue[0]] = keyAndValue[1];
        }
        if (status === 204 || status === 205) {
          return;
        }
        if (requestOptions.method === "HEAD") {
          if (status < 400) {
            return;
          }
          throw new requestError.RequestError(response.statusText, status, {
            headers,
            request: requestOptions
          });
        }
        if (status === 304) {
          throw new requestError.RequestError("Not modified", status, {
            headers,
            request: requestOptions
          });
        }
        if (status >= 400) {
          return response.text().then((message) => {
            const error = new requestError.RequestError(message, status, {
              headers,
              request: requestOptions
            });
            try {
              let responseBody = JSON.parse(error.message);
              Object.assign(error, responseBody);
              let errors = responseBody.errors;
              error.message = error.message + ": " + errors.map(JSON.stringify).join(", ");
            } catch (e) {
            }
            throw error;
          });
        }
        const contentType = response.headers.get("content-type");
        if (/application\/json/.test(contentType)) {
          return response.json();
        }
        if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
          return response.text();
        }
        return getBufferResponse(response);
      }).then((data) => {
        return {
          status,
          url,
          headers,
          data
        };
      }).catch((error) => {
        if (error instanceof requestError.RequestError) {
          throw error;
        }
        throw new requestError.RequestError(error.message, 500, {
          headers,
          request: requestOptions
        });
      });
    }
    function withDefaults(oldEndpoint, newDefaults) {
      const endpoint2 = oldEndpoint.defaults(newDefaults);
      const newApi = function(route, parameters) {
        const endpointOptions = endpoint2.merge(route, parameters);
        if (!endpointOptions.request || !endpointOptions.request.hook) {
          return fetchWrapper(endpoint2.parse(endpointOptions));
        }
        const request2 = (route2, parameters2) => {
          return fetchWrapper(endpoint2.parse(endpoint2.merge(route2, parameters2)));
        };
        Object.assign(request2, {
          endpoint: endpoint2,
          defaults: withDefaults.bind(null, endpoint2)
        });
        return endpointOptions.request.hook(request2, endpointOptions);
      };
      return Object.assign(newApi, {
        endpoint: endpoint2,
        defaults: withDefaults.bind(null, endpoint2)
      });
    }
    var request = withDefaults(endpoint.endpoint, {
      headers: {
        "user-agent": `octokit-request.js/${VERSION} ${universalUserAgent.getUserAgent()}`
      }
    });
    exports2.request = request;
  }
});

// node_modules/.pnpm/universal-user-agent@4.0.1/node_modules/universal-user-agent/dist-node/index.js
var require_dist_node6 = __commonJS({
  "node_modules/.pnpm/universal-user-agent@4.0.1/node_modules/universal-user-agent/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var osName = _interopDefault(require_os_name());
    function getUserAgent() {
      try {
        return `Node.js/${process.version.substr(1)} (${osName()}; ${process.arch})`;
      } catch (error) {
        if (/wmic os get Caption/.test(error.message)) {
          return "Windows <version undetectable>";
        }
        throw error;
      }
    }
    exports2.getUserAgent = getUserAgent;
  }
});

// node_modules/.pnpm/@octokit+graphql@4.3.1/node_modules/@octokit/graphql/dist-node/index.js
var require_dist_node7 = __commonJS({
  "node_modules/.pnpm/@octokit+graphql@4.3.1/node_modules/@octokit/graphql/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var request = require_dist_node5();
    var universalUserAgent = require_dist_node6();
    var VERSION = "4.3.1";
    var GraphqlError = class extends Error {
      constructor(request2, response) {
        const message = response.data.errors[0].message;
        super(message);
        Object.assign(this, response.data);
        this.name = "GraphqlError";
        this.request = request2;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      }
    };
    var NON_VARIABLE_OPTIONS = ["method", "baseUrl", "url", "headers", "request", "query"];
    function graphql(request2, query, options) {
      options = typeof query === "string" ? options = Object.assign({
        query
      }, options) : options = query;
      const requestOptions = Object.keys(options).reduce((result, key) => {
        if (NON_VARIABLE_OPTIONS.includes(key)) {
          result[key] = options[key];
          return result;
        }
        if (!result.variables) {
          result.variables = {};
        }
        result.variables[key] = options[key];
        return result;
      }, {});
      return request2(requestOptions).then((response) => {
        if (response.data.errors) {
          throw new GraphqlError(requestOptions, {
            data: response.data
          });
        }
        return response.data.data;
      });
    }
    function withDefaults(request$1, newDefaults) {
      const newRequest = request$1.defaults(newDefaults);
      const newApi = (query, options) => {
        return graphql(newRequest, query, options);
      };
      return Object.assign(newApi, {
        defaults: withDefaults.bind(null, newRequest),
        endpoint: request.request.endpoint
      });
    }
    var graphql$1 = withDefaults(request.request, {
      headers: {
        "user-agent": `octokit-graphql.js/${VERSION} ${universalUserAgent.getUserAgent()}`
      },
      method: "POST",
      url: "/graphql"
    });
    function withCustomRequest(customRequest) {
      return withDefaults(customRequest, {
        method: "POST",
        url: "/graphql"
      });
    }
    exports2.graphql = graphql$1;
    exports2.withCustomRequest = withCustomRequest;
  }
});

// node_modules/.pnpm/@octokit+plugin-request-log@1.0.0/node_modules/@octokit/plugin-request-log/dist-node/index.js
var require_dist_node8 = __commonJS({
  "node_modules/.pnpm/@octokit+plugin-request-log@1.0.0/node_modules/@octokit/plugin-request-log/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var VERSION = "1.0.0";
    function requestLog(octokit) {
      octokit.hook.wrap("request", (request, options) => {
        octokit.log.debug("request", options);
        const start = Date.now();
        const requestOptions = octokit.request.endpoint.parse(options);
        const path = requestOptions.url.replace(options.baseUrl, "");
        return request(options).then((response) => {
          octokit.log.info(`${requestOptions.method} ${path} - ${response.status} in ${Date.now() - start}ms`);
          return response;
        }).catch((error) => {
          octokit.log.info(`${requestOptions.method} ${path} - ${error.status} in ${Date.now() - start}ms`);
          throw error;
        });
      });
    }
    requestLog.VERSION = VERSION;
    exports2.requestLog = requestLog;
  }
});

// node_modules/.pnpm/@octokit+plugin-rest-endpoint-methods@2.4.0/node_modules/@octokit/plugin-rest-endpoint-methods/dist-node/index.js
var require_dist_node9 = __commonJS({
  "node_modules/.pnpm/@octokit+plugin-rest-endpoint-methods@2.4.0/node_modules/@octokit/plugin-rest-endpoint-methods/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var deprecation = require_dist_node3();
    var endpointsByScope = {
      actions: {
        cancelWorkflowRun: {
          method: "POST",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            run_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/actions/runs/:run_id/cancel"
        },
        createOrUpdateSecretForRepo: {
          method: "PUT",
          params: {
            encrypted_value: {
              type: "string"
            },
            key_id: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/secrets/:name"
        },
        createRegistrationToken: {
          method: "POST",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/runners/registration-token"
        },
        createRemoveToken: {
          method: "POST",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/runners/remove-token"
        },
        deleteArtifact: {
          method: "DELETE",
          params: {
            artifact_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/artifacts/:artifact_id"
        },
        deleteSecretFromRepo: {
          method: "DELETE",
          params: {
            name: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/secrets/:name"
        },
        downloadArtifact: {
          method: "GET",
          params: {
            archive_format: {
              required: true,
              type: "string"
            },
            artifact_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/artifacts/:artifact_id/:archive_format"
        },
        getArtifact: {
          method: "GET",
          params: {
            artifact_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/artifacts/:artifact_id"
        },
        getPublicKey: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/secrets/public-key"
        },
        getSecret: {
          method: "GET",
          params: {
            name: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/secrets/:name"
        },
        getSelfHostedRunner: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            runner_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/actions/runners/:runner_id"
        },
        getWorkflow: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            workflow_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/actions/workflows/:workflow_id"
        },
        getWorkflowJob: {
          method: "GET",
          params: {
            job_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/jobs/:job_id"
        },
        getWorkflowRun: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            run_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/actions/runs/:run_id"
        },
        listDownloadsForSelfHostedRunnerApplication: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/runners/downloads"
        },
        listJobsForWorkflowRun: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            run_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/actions/runs/:run_id/jobs"
        },
        listRepoWorkflowRuns: {
          method: "GET",
          params: {
            actor: {
              type: "string"
            },
            branch: {
              type: "string"
            },
            event: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            status: {
              enum: ["completed", "status", "conclusion"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/runs"
        },
        listRepoWorkflows: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/workflows"
        },
        listSecretsForRepo: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/secrets"
        },
        listSelfHostedRunnersForRepo: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/runners"
        },
        listWorkflowJobLogs: {
          method: "GET",
          params: {
            job_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/actions/jobs/:job_id/logs"
        },
        listWorkflowRunArtifacts: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            run_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/actions/runs/:run_id/artifacts"
        },
        listWorkflowRunLogs: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            run_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/actions/runs/:run_id/logs"
        },
        listWorkflowRuns: {
          method: "GET",
          params: {
            actor: {
              type: "string"
            },
            branch: {
              type: "string"
            },
            event: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            status: {
              enum: ["completed", "status", "conclusion"],
              type: "string"
            },
            workflow_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/actions/workflows/:workflow_id/runs"
        },
        reRunWorkflow: {
          method: "POST",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            run_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/actions/runs/:run_id/rerun"
        },
        removeSelfHostedRunner: {
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            runner_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/actions/runners/:runner_id"
        }
      },
      activity: {
        checkStarringRepo: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/user/starred/:owner/:repo"
        },
        deleteRepoSubscription: {
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/subscription"
        },
        deleteThreadSubscription: {
          method: "DELETE",
          params: {
            thread_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/notifications/threads/:thread_id/subscription"
        },
        getRepoSubscription: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/subscription"
        },
        getThread: {
          method: "GET",
          params: {
            thread_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/notifications/threads/:thread_id"
        },
        getThreadSubscription: {
          method: "GET",
          params: {
            thread_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/notifications/threads/:thread_id/subscription"
        },
        listEventsForOrg: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/events/orgs/:org"
        },
        listEventsForUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/events"
        },
        listFeeds: {
          method: "GET",
          params: {},
          url: "/feeds"
        },
        listNotifications: {
          method: "GET",
          params: {
            all: {
              type: "boolean"
            },
            before: {
              type: "string"
            },
            page: {
              type: "integer"
            },
            participating: {
              type: "boolean"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "string"
            }
          },
          url: "/notifications"
        },
        listNotificationsForRepo: {
          method: "GET",
          params: {
            all: {
              type: "boolean"
            },
            before: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            participating: {
              type: "boolean"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            since: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/notifications"
        },
        listPublicEvents: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/events"
        },
        listPublicEventsForOrg: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/orgs/:org/events"
        },
        listPublicEventsForRepoNetwork: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/networks/:owner/:repo/events"
        },
        listPublicEventsForUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/events/public"
        },
        listReceivedEventsForUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/received_events"
        },
        listReceivedPublicEventsForUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/received_events/public"
        },
        listRepoEvents: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/events"
        },
        listReposStarredByAuthenticatedUser: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            sort: {
              enum: ["created", "updated"],
              type: "string"
            }
          },
          url: "/user/starred"
        },
        listReposStarredByUser: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            sort: {
              enum: ["created", "updated"],
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/starred"
        },
        listReposWatchedByUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/subscriptions"
        },
        listStargazersForRepo: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/stargazers"
        },
        listWatchedReposForAuthenticatedUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/subscriptions"
        },
        listWatchersForRepo: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/subscribers"
        },
        markAsRead: {
          method: "PUT",
          params: {
            last_read_at: {
              type: "string"
            }
          },
          url: "/notifications"
        },
        markNotificationsAsReadForRepo: {
          method: "PUT",
          params: {
            last_read_at: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/notifications"
        },
        markThreadAsRead: {
          method: "PATCH",
          params: {
            thread_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/notifications/threads/:thread_id"
        },
        setRepoSubscription: {
          method: "PUT",
          params: {
            ignored: {
              type: "boolean"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            subscribed: {
              type: "boolean"
            }
          },
          url: "/repos/:owner/:repo/subscription"
        },
        setThreadSubscription: {
          method: "PUT",
          params: {
            ignored: {
              type: "boolean"
            },
            thread_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/notifications/threads/:thread_id/subscription"
        },
        starRepo: {
          method: "PUT",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/user/starred/:owner/:repo"
        },
        unstarRepo: {
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/user/starred/:owner/:repo"
        }
      },
      apps: {
        addRepoToInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "PUT",
          params: {
            installation_id: {
              required: true,
              type: "integer"
            },
            repository_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/installations/:installation_id/repositories/:repository_id"
        },
        checkAccountIsAssociatedWithAny: {
          method: "GET",
          params: {
            account_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/marketplace_listing/accounts/:account_id"
        },
        checkAccountIsAssociatedWithAnyStubbed: {
          method: "GET",
          params: {
            account_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/marketplace_listing/stubbed/accounts/:account_id"
        },
        checkAuthorization: {
          deprecated: "octokit.apps.checkAuthorization() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#check-an-authorization",
          method: "GET",
          params: {
            access_token: {
              required: true,
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        checkToken: {
          headers: {
            accept: "application/vnd.github.doctor-strange-preview+json"
          },
          method: "POST",
          params: {
            access_token: {
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/token"
        },
        createContentAttachment: {
          headers: {
            accept: "application/vnd.github.corsair-preview+json"
          },
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            content_reference_id: {
              required: true,
              type: "integer"
            },
            title: {
              required: true,
              type: "string"
            }
          },
          url: "/content_references/:content_reference_id/attachments"
        },
        createFromManifest: {
          headers: {
            accept: "application/vnd.github.fury-preview+json"
          },
          method: "POST",
          params: {
            code: {
              required: true,
              type: "string"
            }
          },
          url: "/app-manifests/:code/conversions"
        },
        createInstallationToken: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "POST",
          params: {
            installation_id: {
              required: true,
              type: "integer"
            },
            permissions: {
              type: "object"
            },
            repository_ids: {
              type: "integer[]"
            }
          },
          url: "/app/installations/:installation_id/access_tokens"
        },
        deleteAuthorization: {
          headers: {
            accept: "application/vnd.github.doctor-strange-preview+json"
          },
          method: "DELETE",
          params: {
            access_token: {
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/grant"
        },
        deleteInstallation: {
          headers: {
            accept: "application/vnd.github.gambit-preview+json,application/vnd.github.machine-man-preview+json"
          },
          method: "DELETE",
          params: {
            installation_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/app/installations/:installation_id"
        },
        deleteToken: {
          headers: {
            accept: "application/vnd.github.doctor-strange-preview+json"
          },
          method: "DELETE",
          params: {
            access_token: {
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/token"
        },
        findOrgInstallation: {
          deprecated: "octokit.apps.findOrgInstallation() has been renamed to octokit.apps.getOrgInstallation() (2019-04-10)",
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/installation"
        },
        findRepoInstallation: {
          deprecated: "octokit.apps.findRepoInstallation() has been renamed to octokit.apps.getRepoInstallation() (2019-04-10)",
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/installation"
        },
        findUserInstallation: {
          deprecated: "octokit.apps.findUserInstallation() has been renamed to octokit.apps.getUserInstallation() (2019-04-10)",
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/installation"
        },
        getAuthenticated: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {},
          url: "/app"
        },
        getBySlug: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            app_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/apps/:app_slug"
        },
        getInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            installation_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/app/installations/:installation_id"
        },
        getOrgInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/installation"
        },
        getRepoInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/installation"
        },
        getUserInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/installation"
        },
        listAccountsUserOrOrgOnPlan: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            plan_id: {
              required: true,
              type: "integer"
            },
            sort: {
              enum: ["created", "updated"],
              type: "string"
            }
          },
          url: "/marketplace_listing/plans/:plan_id/accounts"
        },
        listAccountsUserOrOrgOnPlanStubbed: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            plan_id: {
              required: true,
              type: "integer"
            },
            sort: {
              enum: ["created", "updated"],
              type: "string"
            }
          },
          url: "/marketplace_listing/stubbed/plans/:plan_id/accounts"
        },
        listInstallationReposForAuthenticatedUser: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            installation_id: {
              required: true,
              type: "integer"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/installations/:installation_id/repositories"
        },
        listInstallations: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/app/installations"
        },
        listInstallationsForAuthenticatedUser: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/installations"
        },
        listMarketplacePurchasesForAuthenticatedUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/marketplace_purchases"
        },
        listMarketplacePurchasesForAuthenticatedUserStubbed: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/marketplace_purchases/stubbed"
        },
        listPlans: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/marketplace_listing/plans"
        },
        listPlansStubbed: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/marketplace_listing/stubbed/plans"
        },
        listRepos: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/installation/repositories"
        },
        removeRepoFromInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "DELETE",
          params: {
            installation_id: {
              required: true,
              type: "integer"
            },
            repository_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/installations/:installation_id/repositories/:repository_id"
        },
        resetAuthorization: {
          deprecated: "octokit.apps.resetAuthorization() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#reset-an-authorization",
          method: "POST",
          params: {
            access_token: {
              required: true,
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        resetToken: {
          headers: {
            accept: "application/vnd.github.doctor-strange-preview+json"
          },
          method: "PATCH",
          params: {
            access_token: {
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/token"
        },
        revokeAuthorizationForApplication: {
          deprecated: "octokit.apps.revokeAuthorizationForApplication() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#revoke-an-authorization-for-an-application",
          method: "DELETE",
          params: {
            access_token: {
              required: true,
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        revokeGrantForApplication: {
          deprecated: "octokit.apps.revokeGrantForApplication() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#revoke-a-grant-for-an-application",
          method: "DELETE",
          params: {
            access_token: {
              required: true,
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/grants/:access_token"
        },
        revokeInstallationToken: {
          headers: {
            accept: "application/vnd.github.gambit-preview+json"
          },
          method: "DELETE",
          params: {},
          url: "/installation/token"
        }
      },
      checks: {
        create: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "POST",
          params: {
            actions: {
              type: "object[]"
            },
            "actions[].description": {
              required: true,
              type: "string"
            },
            "actions[].identifier": {
              required: true,
              type: "string"
            },
            "actions[].label": {
              required: true,
              type: "string"
            },
            completed_at: {
              type: "string"
            },
            conclusion: {
              enum: ["success", "failure", "neutral", "cancelled", "timed_out", "action_required"],
              type: "string"
            },
            details_url: {
              type: "string"
            },
            external_id: {
              type: "string"
            },
            head_sha: {
              required: true,
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            output: {
              type: "object"
            },
            "output.annotations": {
              type: "object[]"
            },
            "output.annotations[].annotation_level": {
              enum: ["notice", "warning", "failure"],
              required: true,
              type: "string"
            },
            "output.annotations[].end_column": {
              type: "integer"
            },
            "output.annotations[].end_line": {
              required: true,
              type: "integer"
            },
            "output.annotations[].message": {
              required: true,
              type: "string"
            },
            "output.annotations[].path": {
              required: true,
              type: "string"
            },
            "output.annotations[].raw_details": {
              type: "string"
            },
            "output.annotations[].start_column": {
              type: "integer"
            },
            "output.annotations[].start_line": {
              required: true,
              type: "integer"
            },
            "output.annotations[].title": {
              type: "string"
            },
            "output.images": {
              type: "object[]"
            },
            "output.images[].alt": {
              required: true,
              type: "string"
            },
            "output.images[].caption": {
              type: "string"
            },
            "output.images[].image_url": {
              required: true,
              type: "string"
            },
            "output.summary": {
              required: true,
              type: "string"
            },
            "output.text": {
              type: "string"
            },
            "output.title": {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            started_at: {
              type: "string"
            },
            status: {
              enum: ["queued", "in_progress", "completed"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-runs"
        },
        createSuite: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "POST",
          params: {
            head_sha: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-suites"
        },
        get: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "GET",
          params: {
            check_run_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-runs/:check_run_id"
        },
        getSuite: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "GET",
          params: {
            check_suite_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-suites/:check_suite_id"
        },
        listAnnotations: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "GET",
          params: {
            check_run_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-runs/:check_run_id/annotations"
        },
        listForRef: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "GET",
          params: {
            check_name: {
              type: "string"
            },
            filter: {
              enum: ["latest", "all"],
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            status: {
              enum: ["queued", "in_progress", "completed"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:ref/check-runs"
        },
        listForSuite: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "GET",
          params: {
            check_name: {
              type: "string"
            },
            check_suite_id: {
              required: true,
              type: "integer"
            },
            filter: {
              enum: ["latest", "all"],
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            status: {
              enum: ["queued", "in_progress", "completed"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-suites/:check_suite_id/check-runs"
        },
        listSuitesForRef: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "GET",
          params: {
            app_id: {
              type: "integer"
            },
            check_name: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:ref/check-suites"
        },
        rerequestSuite: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "POST",
          params: {
            check_suite_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-suites/:check_suite_id/rerequest"
        },
        setSuitesPreferences: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "PATCH",
          params: {
            auto_trigger_checks: {
              type: "object[]"
            },
            "auto_trigger_checks[].app_id": {
              required: true,
              type: "integer"
            },
            "auto_trigger_checks[].setting": {
              required: true,
              type: "boolean"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-suites/preferences"
        },
        update: {
          headers: {
            accept: "application/vnd.github.antiope-preview+json"
          },
          method: "PATCH",
          params: {
            actions: {
              type: "object[]"
            },
            "actions[].description": {
              required: true,
              type: "string"
            },
            "actions[].identifier": {
              required: true,
              type: "string"
            },
            "actions[].label": {
              required: true,
              type: "string"
            },
            check_run_id: {
              required: true,
              type: "integer"
            },
            completed_at: {
              type: "string"
            },
            conclusion: {
              enum: ["success", "failure", "neutral", "cancelled", "timed_out", "action_required"],
              type: "string"
            },
            details_url: {
              type: "string"
            },
            external_id: {
              type: "string"
            },
            name: {
              type: "string"
            },
            output: {
              type: "object"
            },
            "output.annotations": {
              type: "object[]"
            },
            "output.annotations[].annotation_level": {
              enum: ["notice", "warning", "failure"],
              required: true,
              type: "string"
            },
            "output.annotations[].end_column": {
              type: "integer"
            },
            "output.annotations[].end_line": {
              required: true,
              type: "integer"
            },
            "output.annotations[].message": {
              required: true,
              type: "string"
            },
            "output.annotations[].path": {
              required: true,
              type: "string"
            },
            "output.annotations[].raw_details": {
              type: "string"
            },
            "output.annotations[].start_column": {
              type: "integer"
            },
            "output.annotations[].start_line": {
              required: true,
              type: "integer"
            },
            "output.annotations[].title": {
              type: "string"
            },
            "output.images": {
              type: "object[]"
            },
            "output.images[].alt": {
              required: true,
              type: "string"
            },
            "output.images[].caption": {
              type: "string"
            },
            "output.images[].image_url": {
              required: true,
              type: "string"
            },
            "output.summary": {
              required: true,
              type: "string"
            },
            "output.text": {
              type: "string"
            },
            "output.title": {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            started_at: {
              type: "string"
            },
            status: {
              enum: ["queued", "in_progress", "completed"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-runs/:check_run_id"
        }
      },
      codesOfConduct: {
        getConductCode: {
          headers: {
            accept: "application/vnd.github.scarlet-witch-preview+json"
          },
          method: "GET",
          params: {
            key: {
              required: true,
              type: "string"
            }
          },
          url: "/codes_of_conduct/:key"
        },
        getForRepo: {
          headers: {
            accept: "application/vnd.github.scarlet-witch-preview+json"
          },
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/community/code_of_conduct"
        },
        listConductCodes: {
          headers: {
            accept: "application/vnd.github.scarlet-witch-preview+json"
          },
          method: "GET",
          params: {},
          url: "/codes_of_conduct"
        }
      },
      emojis: {
        get: {
          method: "GET",
          params: {},
          url: "/emojis"
        }
      },
      gists: {
        checkIsStarred: {
          method: "GET",
          params: {
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id/star"
        },
        create: {
          method: "POST",
          params: {
            description: {
              type: "string"
            },
            files: {
              required: true,
              type: "object"
            },
            "files.content": {
              type: "string"
            },
            public: {
              type: "boolean"
            }
          },
          url: "/gists"
        },
        createComment: {
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id/comments"
        },
        delete: {
          method: "DELETE",
          params: {
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id"
        },
        deleteComment: {
          method: "DELETE",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id/comments/:comment_id"
        },
        fork: {
          method: "POST",
          params: {
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id/forks"
        },
        get: {
          method: "GET",
          params: {
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id"
        },
        getComment: {
          method: "GET",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id/comments/:comment_id"
        },
        getRevision: {
          method: "GET",
          params: {
            gist_id: {
              required: true,
              type: "string"
            },
            sha: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id/:sha"
        },
        list: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "string"
            }
          },
          url: "/gists"
        },
        listComments: {
          method: "GET",
          params: {
            gist_id: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/gists/:gist_id/comments"
        },
        listCommits: {
          method: "GET",
          params: {
            gist_id: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/gists/:gist_id/commits"
        },
        listForks: {
          method: "GET",
          params: {
            gist_id: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/gists/:gist_id/forks"
        },
        listPublic: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "string"
            }
          },
          url: "/gists/public"
        },
        listPublicForUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/gists"
        },
        listStarred: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "string"
            }
          },
          url: "/gists/starred"
        },
        star: {
          method: "PUT",
          params: {
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id/star"
        },
        unstar: {
          method: "DELETE",
          params: {
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id/star"
        },
        update: {
          method: "PATCH",
          params: {
            description: {
              type: "string"
            },
            files: {
              type: "object"
            },
            "files.content": {
              type: "string"
            },
            "files.filename": {
              type: "string"
            },
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id"
        },
        updateComment: {
          method: "PATCH",
          params: {
            body: {
              required: true,
              type: "string"
            },
            comment_id: {
              required: true,
              type: "integer"
            },
            gist_id: {
              required: true,
              type: "string"
            }
          },
          url: "/gists/:gist_id/comments/:comment_id"
        }
      },
      git: {
        createBlob: {
          method: "POST",
          params: {
            content: {
              required: true,
              type: "string"
            },
            encoding: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/blobs"
        },
        createCommit: {
          method: "POST",
          params: {
            author: {
              type: "object"
            },
            "author.date": {
              type: "string"
            },
            "author.email": {
              type: "string"
            },
            "author.name": {
              type: "string"
            },
            committer: {
              type: "object"
            },
            "committer.date": {
              type: "string"
            },
            "committer.email": {
              type: "string"
            },
            "committer.name": {
              type: "string"
            },
            message: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            parents: {
              required: true,
              type: "string[]"
            },
            repo: {
              required: true,
              type: "string"
            },
            signature: {
              type: "string"
            },
            tree: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/commits"
        },
        createRef: {
          method: "POST",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/refs"
        },
        createTag: {
          method: "POST",
          params: {
            message: {
              required: true,
              type: "string"
            },
            object: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            tag: {
              required: true,
              type: "string"
            },
            tagger: {
              type: "object"
            },
            "tagger.date": {
              type: "string"
            },
            "tagger.email": {
              type: "string"
            },
            "tagger.name": {
              type: "string"
            },
            type: {
              enum: ["commit", "tree", "blob"],
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/tags"
        },
        createTree: {
          method: "POST",
          params: {
            base_tree: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            tree: {
              required: true,
              type: "object[]"
            },
            "tree[].content": {
              type: "string"
            },
            "tree[].mode": {
              enum: ["100644", "100755", "040000", "160000", "120000"],
              type: "string"
            },
            "tree[].path": {
              type: "string"
            },
            "tree[].sha": {
              allowNull: true,
              type: "string"
            },
            "tree[].type": {
              enum: ["blob", "tree", "commit"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/trees"
        },
        deleteRef: {
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/refs/:ref"
        },
        getBlob: {
          method: "GET",
          params: {
            file_sha: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/blobs/:file_sha"
        },
        getCommit: {
          method: "GET",
          params: {
            commit_sha: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/commits/:commit_sha"
        },
        getRef: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/ref/:ref"
        },
        getTag: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            tag_sha: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/tags/:tag_sha"
        },
        getTree: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            recursive: {
              enum: ["1"],
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            tree_sha: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/trees/:tree_sha"
        },
        listMatchingRefs: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/matching-refs/:ref"
        },
        listRefs: {
          method: "GET",
          params: {
            namespace: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/refs/:namespace"
        },
        updateRef: {
          method: "PATCH",
          params: {
            force: {
              type: "boolean"
            },
            owner: {
              required: true,
              type: "string"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/refs/:ref"
        }
      },
      gitignore: {
        getTemplate: {
          method: "GET",
          params: {
            name: {
              required: true,
              type: "string"
            }
          },
          url: "/gitignore/templates/:name"
        },
        listTemplates: {
          method: "GET",
          params: {},
          url: "/gitignore/templates"
        }
      },
      interactions: {
        addOrUpdateRestrictionsForOrg: {
          headers: {
            accept: "application/vnd.github.sombra-preview+json"
          },
          method: "PUT",
          params: {
            limit: {
              enum: ["existing_users", "contributors_only", "collaborators_only"],
              required: true,
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/interaction-limits"
        },
        addOrUpdateRestrictionsForRepo: {
          headers: {
            accept: "application/vnd.github.sombra-preview+json"
          },
          method: "PUT",
          params: {
            limit: {
              enum: ["existing_users", "contributors_only", "collaborators_only"],
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/interaction-limits"
        },
        getRestrictionsForOrg: {
          headers: {
            accept: "application/vnd.github.sombra-preview+json"
          },
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/interaction-limits"
        },
        getRestrictionsForRepo: {
          headers: {
            accept: "application/vnd.github.sombra-preview+json"
          },
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/interaction-limits"
        },
        removeRestrictionsForOrg: {
          headers: {
            accept: "application/vnd.github.sombra-preview+json"
          },
          method: "DELETE",
          params: {
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/interaction-limits"
        },
        removeRestrictionsForRepo: {
          headers: {
            accept: "application/vnd.github.sombra-preview+json"
          },
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/interaction-limits"
        }
      },
      issues: {
        addAssignees: {
          method: "POST",
          params: {
            assignees: {
              type: "string[]"
            },
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/assignees"
        },
        addLabels: {
          method: "POST",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            labels: {
              required: true,
              type: "string[]"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/labels"
        },
        checkAssignee: {
          method: "GET",
          params: {
            assignee: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/assignees/:assignee"
        },
        create: {
          method: "POST",
          params: {
            assignee: {
              type: "string"
            },
            assignees: {
              type: "string[]"
            },
            body: {
              type: "string"
            },
            labels: {
              type: "string[]"
            },
            milestone: {
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            title: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues"
        },
        createComment: {
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/comments"
        },
        createLabel: {
          method: "POST",
          params: {
            color: {
              required: true,
              type: "string"
            },
            description: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/labels"
        },
        createMilestone: {
          method: "POST",
          params: {
            description: {
              type: "string"
            },
            due_on: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            state: {
              enum: ["open", "closed"],
              type: "string"
            },
            title: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/milestones"
        },
        deleteComment: {
          method: "DELETE",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/comments/:comment_id"
        },
        deleteLabel: {
          method: "DELETE",
          params: {
            name: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/labels/:name"
        },
        deleteMilestone: {
          method: "DELETE",
          params: {
            milestone_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "milestone_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/milestones/:milestone_number"
        },
        get: {
          method: "GET",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number"
        },
        getComment: {
          method: "GET",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/comments/:comment_id"
        },
        getEvent: {
          method: "GET",
          params: {
            event_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/events/:event_id"
        },
        getLabel: {
          method: "GET",
          params: {
            name: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/labels/:name"
        },
        getMilestone: {
          method: "GET",
          params: {
            milestone_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "milestone_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/milestones/:milestone_number"
        },
        list: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            filter: {
              enum: ["assigned", "created", "mentioned", "subscribed", "all"],
              type: "string"
            },
            labels: {
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "string"
            },
            sort: {
              enum: ["created", "updated", "comments"],
              type: "string"
            },
            state: {
              enum: ["open", "closed", "all"],
              type: "string"
            }
          },
          url: "/issues"
        },
        listAssignees: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/assignees"
        },
        listComments: {
          method: "GET",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            since: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/comments"
        },
        listCommentsForRepo: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            since: {
              type: "string"
            },
            sort: {
              enum: ["created", "updated"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/comments"
        },
        listEvents: {
          method: "GET",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/events"
        },
        listEventsForRepo: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/events"
        },
        listEventsForTimeline: {
          headers: {
            accept: "application/vnd.github.mockingbird-preview+json"
          },
          method: "GET",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/timeline"
        },
        listForAuthenticatedUser: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            filter: {
              enum: ["assigned", "created", "mentioned", "subscribed", "all"],
              type: "string"
            },
            labels: {
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "string"
            },
            sort: {
              enum: ["created", "updated", "comments"],
              type: "string"
            },
            state: {
              enum: ["open", "closed", "all"],
              type: "string"
            }
          },
          url: "/user/issues"
        },
        listForOrg: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            filter: {
              enum: ["assigned", "created", "mentioned", "subscribed", "all"],
              type: "string"
            },
            labels: {
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "string"
            },
            sort: {
              enum: ["created", "updated", "comments"],
              type: "string"
            },
            state: {
              enum: ["open", "closed", "all"],
              type: "string"
            }
          },
          url: "/orgs/:org/issues"
        },
        listForRepo: {
          method: "GET",
          params: {
            assignee: {
              type: "string"
            },
            creator: {
              type: "string"
            },
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            labels: {
              type: "string"
            },
            mentioned: {
              type: "string"
            },
            milestone: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            since: {
              type: "string"
            },
            sort: {
              enum: ["created", "updated", "comments"],
              type: "string"
            },
            state: {
              enum: ["open", "closed", "all"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues"
        },
        listLabelsForMilestone: {
          method: "GET",
          params: {
            milestone_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "milestone_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/milestones/:milestone_number/labels"
        },
        listLabelsForRepo: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/labels"
        },
        listLabelsOnIssue: {
          method: "GET",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/labels"
        },
        listMilestonesForRepo: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            sort: {
              enum: ["due_on", "completeness"],
              type: "string"
            },
            state: {
              enum: ["open", "closed", "all"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/milestones"
        },
        lock: {
          method: "PUT",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            lock_reason: {
              enum: ["off-topic", "too heated", "resolved", "spam"],
              type: "string"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/lock"
        },
        removeAssignees: {
          method: "DELETE",
          params: {
            assignees: {
              type: "string[]"
            },
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/assignees"
        },
        removeLabel: {
          method: "DELETE",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            name: {
              required: true,
              type: "string"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/labels/:name"
        },
        removeLabels: {
          method: "DELETE",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/labels"
        },
        replaceLabels: {
          method: "PUT",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            labels: {
              type: "string[]"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/labels"
        },
        unlock: {
          method: "DELETE",
          params: {
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/lock"
        },
        update: {
          method: "PATCH",
          params: {
            assignee: {
              type: "string"
            },
            assignees: {
              type: "string[]"
            },
            body: {
              type: "string"
            },
            issue_number: {
              required: true,
              type: "integer"
            },
            labels: {
              type: "string[]"
            },
            milestone: {
              allowNull: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            state: {
              enum: ["open", "closed"],
              type: "string"
            },
            title: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number"
        },
        updateComment: {
          method: "PATCH",
          params: {
            body: {
              required: true,
              type: "string"
            },
            comment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/comments/:comment_id"
        },
        updateLabel: {
          method: "PATCH",
          params: {
            color: {
              type: "string"
            },
            current_name: {
              required: true,
              type: "string"
            },
            description: {
              type: "string"
            },
            name: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/labels/:current_name"
        },
        updateMilestone: {
          method: "PATCH",
          params: {
            description: {
              type: "string"
            },
            due_on: {
              type: "string"
            },
            milestone_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "milestone_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            state: {
              enum: ["open", "closed"],
              type: "string"
            },
            title: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/milestones/:milestone_number"
        }
      },
      licenses: {
        get: {
          method: "GET",
          params: {
            license: {
              required: true,
              type: "string"
            }
          },
          url: "/licenses/:license"
        },
        getForRepo: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/license"
        },
        list: {
          deprecated: "octokit.licenses.list() has been renamed to octokit.licenses.listCommonlyUsed() (2019-03-05)",
          method: "GET",
          params: {},
          url: "/licenses"
        },
        listCommonlyUsed: {
          method: "GET",
          params: {},
          url: "/licenses"
        }
      },
      markdown: {
        render: {
          method: "POST",
          params: {
            context: {
              type: "string"
            },
            mode: {
              enum: ["markdown", "gfm"],
              type: "string"
            },
            text: {
              required: true,
              type: "string"
            }
          },
          url: "/markdown"
        },
        renderRaw: {
          headers: {
            "content-type": "text/plain; charset=utf-8"
          },
          method: "POST",
          params: {
            data: {
              mapTo: "data",
              required: true,
              type: "string"
            }
          },
          url: "/markdown/raw"
        }
      },
      meta: {
        get: {
          method: "GET",
          params: {},
          url: "/meta"
        }
      },
      migrations: {
        cancelImport: {
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/import"
        },
        deleteArchiveForAuthenticatedUser: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "DELETE",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/migrations/:migration_id/archive"
        },
        deleteArchiveForOrg: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "DELETE",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/migrations/:migration_id/archive"
        },
        downloadArchiveForOrg: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "GET",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/migrations/:migration_id/archive"
        },
        getArchiveForAuthenticatedUser: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "GET",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/migrations/:migration_id/archive"
        },
        getArchiveForOrg: {
          deprecated: "octokit.migrations.getArchiveForOrg() has been renamed to octokit.migrations.downloadArchiveForOrg() (2020-01-27)",
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "GET",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/migrations/:migration_id/archive"
        },
        getCommitAuthors: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            since: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/import/authors"
        },
        getImportProgress: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/import"
        },
        getLargeFiles: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/import/large_files"
        },
        getStatusForAuthenticatedUser: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "GET",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/migrations/:migration_id"
        },
        getStatusForOrg: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "GET",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/migrations/:migration_id"
        },
        listForAuthenticatedUser: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/migrations"
        },
        listForOrg: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/orgs/:org/migrations"
        },
        listReposForOrg: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "GET",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/orgs/:org/migrations/:migration_id/repositories"
        },
        listReposForUser: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "GET",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/:migration_id/repositories"
        },
        mapCommitAuthor: {
          method: "PATCH",
          params: {
            author_id: {
              required: true,
              type: "integer"
            },
            email: {
              type: "string"
            },
            name: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/import/authors/:author_id"
        },
        setLfsPreference: {
          method: "PATCH",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            use_lfs: {
              enum: ["opt_in", "opt_out"],
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/import/lfs"
        },
        startForAuthenticatedUser: {
          method: "POST",
          params: {
            exclude_attachments: {
              type: "boolean"
            },
            lock_repositories: {
              type: "boolean"
            },
            repositories: {
              required: true,
              type: "string[]"
            }
          },
          url: "/user/migrations"
        },
        startForOrg: {
          method: "POST",
          params: {
            exclude_attachments: {
              type: "boolean"
            },
            lock_repositories: {
              type: "boolean"
            },
            org: {
              required: true,
              type: "string"
            },
            repositories: {
              required: true,
              type: "string[]"
            }
          },
          url: "/orgs/:org/migrations"
        },
        startImport: {
          method: "PUT",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            tfvc_project: {
              type: "string"
            },
            vcs: {
              enum: ["subversion", "git", "mercurial", "tfvc"],
              type: "string"
            },
            vcs_password: {
              type: "string"
            },
            vcs_url: {
              required: true,
              type: "string"
            },
            vcs_username: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/import"
        },
        unlockRepoForAuthenticatedUser: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "DELETE",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            },
            repo_name: {
              required: true,
              type: "string"
            }
          },
          url: "/user/migrations/:migration_id/repos/:repo_name/lock"
        },
        unlockRepoForOrg: {
          headers: {
            accept: "application/vnd.github.wyandotte-preview+json"
          },
          method: "DELETE",
          params: {
            migration_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            repo_name: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/migrations/:migration_id/repos/:repo_name/lock"
        },
        updateImport: {
          method: "PATCH",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            vcs_password: {
              type: "string"
            },
            vcs_username: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/import"
        }
      },
      oauthAuthorizations: {
        checkAuthorization: {
          deprecated: "octokit.oauthAuthorizations.checkAuthorization() has been renamed to octokit.apps.checkAuthorization() (2019-11-05)",
          method: "GET",
          params: {
            access_token: {
              required: true,
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        createAuthorization: {
          deprecated: "octokit.oauthAuthorizations.createAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization",
          method: "POST",
          params: {
            client_id: {
              type: "string"
            },
            client_secret: {
              type: "string"
            },
            fingerprint: {
              type: "string"
            },
            note: {
              required: true,
              type: "string"
            },
            note_url: {
              type: "string"
            },
            scopes: {
              type: "string[]"
            }
          },
          url: "/authorizations"
        },
        deleteAuthorization: {
          deprecated: "octokit.oauthAuthorizations.deleteAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#delete-an-authorization",
          method: "DELETE",
          params: {
            authorization_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/authorizations/:authorization_id"
        },
        deleteGrant: {
          deprecated: "octokit.oauthAuthorizations.deleteGrant() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#delete-a-grant",
          method: "DELETE",
          params: {
            grant_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/applications/grants/:grant_id"
        },
        getAuthorization: {
          deprecated: "octokit.oauthAuthorizations.getAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-a-single-authorization",
          method: "GET",
          params: {
            authorization_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/authorizations/:authorization_id"
        },
        getGrant: {
          deprecated: "octokit.oauthAuthorizations.getGrant() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-a-single-grant",
          method: "GET",
          params: {
            grant_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/applications/grants/:grant_id"
        },
        getOrCreateAuthorizationForApp: {
          deprecated: "octokit.oauthAuthorizations.getOrCreateAuthorizationForApp() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-or-create-an-authorization-for-a-specific-app",
          method: "PUT",
          params: {
            client_id: {
              required: true,
              type: "string"
            },
            client_secret: {
              required: true,
              type: "string"
            },
            fingerprint: {
              type: "string"
            },
            note: {
              type: "string"
            },
            note_url: {
              type: "string"
            },
            scopes: {
              type: "string[]"
            }
          },
          url: "/authorizations/clients/:client_id"
        },
        getOrCreateAuthorizationForAppAndFingerprint: {
          deprecated: "octokit.oauthAuthorizations.getOrCreateAuthorizationForAppAndFingerprint() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-or-create-an-authorization-for-a-specific-app-and-fingerprint",
          method: "PUT",
          params: {
            client_id: {
              required: true,
              type: "string"
            },
            client_secret: {
              required: true,
              type: "string"
            },
            fingerprint: {
              required: true,
              type: "string"
            },
            note: {
              type: "string"
            },
            note_url: {
              type: "string"
            },
            scopes: {
              type: "string[]"
            }
          },
          url: "/authorizations/clients/:client_id/:fingerprint"
        },
        getOrCreateAuthorizationForAppFingerprint: {
          deprecated: "octokit.oauthAuthorizations.getOrCreateAuthorizationForAppFingerprint() has been renamed to octokit.oauthAuthorizations.getOrCreateAuthorizationForAppAndFingerprint() (2018-12-27)",
          method: "PUT",
          params: {
            client_id: {
              required: true,
              type: "string"
            },
            client_secret: {
              required: true,
              type: "string"
            },
            fingerprint: {
              required: true,
              type: "string"
            },
            note: {
              type: "string"
            },
            note_url: {
              type: "string"
            },
            scopes: {
              type: "string[]"
            }
          },
          url: "/authorizations/clients/:client_id/:fingerprint"
        },
        listAuthorizations: {
          deprecated: "octokit.oauthAuthorizations.listAuthorizations() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#list-your-authorizations",
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/authorizations"
        },
        listGrants: {
          deprecated: "octokit.oauthAuthorizations.listGrants() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#list-your-grants",
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/applications/grants"
        },
        resetAuthorization: {
          deprecated: "octokit.oauthAuthorizations.resetAuthorization() has been renamed to octokit.apps.resetAuthorization() (2019-11-05)",
          method: "POST",
          params: {
            access_token: {
              required: true,
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        revokeAuthorizationForApplication: {
          deprecated: "octokit.oauthAuthorizations.revokeAuthorizationForApplication() has been renamed to octokit.apps.revokeAuthorizationForApplication() (2019-11-05)",
          method: "DELETE",
          params: {
            access_token: {
              required: true,
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        revokeGrantForApplication: {
          deprecated: "octokit.oauthAuthorizations.revokeGrantForApplication() has been renamed to octokit.apps.revokeGrantForApplication() (2019-11-05)",
          method: "DELETE",
          params: {
            access_token: {
              required: true,
              type: "string"
            },
            client_id: {
              required: true,
              type: "string"
            }
          },
          url: "/applications/:client_id/grants/:access_token"
        },
        updateAuthorization: {
          deprecated: "octokit.oauthAuthorizations.updateAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#update-an-existing-authorization",
          method: "PATCH",
          params: {
            add_scopes: {
              type: "string[]"
            },
            authorization_id: {
              required: true,
              type: "integer"
            },
            fingerprint: {
              type: "string"
            },
            note: {
              type: "string"
            },
            note_url: {
              type: "string"
            },
            remove_scopes: {
              type: "string[]"
            },
            scopes: {
              type: "string[]"
            }
          },
          url: "/authorizations/:authorization_id"
        }
      },
      orgs: {
        addOrUpdateMembership: {
          method: "PUT",
          params: {
            org: {
              required: true,
              type: "string"
            },
            role: {
              enum: ["admin", "member"],
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/memberships/:username"
        },
        blockUser: {
          method: "PUT",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/blocks/:username"
        },
        checkBlockedUser: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/blocks/:username"
        },
        checkMembership: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/members/:username"
        },
        checkPublicMembership: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/public_members/:username"
        },
        concealMembership: {
          method: "DELETE",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/public_members/:username"
        },
        convertMemberToOutsideCollaborator: {
          method: "PUT",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/outside_collaborators/:username"
        },
        createHook: {
          method: "POST",
          params: {
            active: {
              type: "boolean"
            },
            config: {
              required: true,
              type: "object"
            },
            "config.content_type": {
              type: "string"
            },
            "config.insecure_ssl": {
              type: "string"
            },
            "config.secret": {
              type: "string"
            },
            "config.url": {
              required: true,
              type: "string"
            },
            events: {
              type: "string[]"
            },
            name: {
              required: true,
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/hooks"
        },
        createInvitation: {
          method: "POST",
          params: {
            email: {
              type: "string"
            },
            invitee_id: {
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            role: {
              enum: ["admin", "direct_member", "billing_manager"],
              type: "string"
            },
            team_ids: {
              type: "integer[]"
            }
          },
          url: "/orgs/:org/invitations"
        },
        deleteHook: {
          method: "DELETE",
          params: {
            hook_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/hooks/:hook_id"
        },
        get: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org"
        },
        getHook: {
          method: "GET",
          params: {
            hook_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/hooks/:hook_id"
        },
        getMembership: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/memberships/:username"
        },
        getMembershipForAuthenticatedUser: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/user/memberships/orgs/:org"
        },
        list: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "integer"
            }
          },
          url: "/organizations"
        },
        listBlockedUsers: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/blocks"
        },
        listForAuthenticatedUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/orgs"
        },
        listForUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/orgs"
        },
        listHooks: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/orgs/:org/hooks"
        },
        listInstallations: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/orgs/:org/installations"
        },
        listInvitationTeams: {
          method: "GET",
          params: {
            invitation_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/orgs/:org/invitations/:invitation_id/teams"
        },
        listMembers: {
          method: "GET",
          params: {
            filter: {
              enum: ["2fa_disabled", "all"],
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            role: {
              enum: ["all", "admin", "member"],
              type: "string"
            }
          },
          url: "/orgs/:org/members"
        },
        listMemberships: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            state: {
              enum: ["active", "pending"],
              type: "string"
            }
          },
          url: "/user/memberships/orgs"
        },
        listOutsideCollaborators: {
          method: "GET",
          params: {
            filter: {
              enum: ["2fa_disabled", "all"],
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/orgs/:org/outside_collaborators"
        },
        listPendingInvitations: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/orgs/:org/invitations"
        },
        listPublicMembers: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/orgs/:org/public_members"
        },
        pingHook: {
          method: "POST",
          params: {
            hook_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/hooks/:hook_id/pings"
        },
        publicizeMembership: {
          method: "PUT",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/public_members/:username"
        },
        removeMember: {
          method: "DELETE",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/members/:username"
        },
        removeMembership: {
          method: "DELETE",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/memberships/:username"
        },
        removeOutsideCollaborator: {
          method: "DELETE",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/outside_collaborators/:username"
        },
        unblockUser: {
          method: "DELETE",
          params: {
            org: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/blocks/:username"
        },
        update: {
          method: "PATCH",
          params: {
            billing_email: {
              type: "string"
            },
            company: {
              type: "string"
            },
            default_repository_permission: {
              enum: ["read", "write", "admin", "none"],
              type: "string"
            },
            description: {
              type: "string"
            },
            email: {
              type: "string"
            },
            has_organization_projects: {
              type: "boolean"
            },
            has_repository_projects: {
              type: "boolean"
            },
            location: {
              type: "string"
            },
            members_allowed_repository_creation_type: {
              enum: ["all", "private", "none"],
              type: "string"
            },
            members_can_create_internal_repositories: {
              type: "boolean"
            },
            members_can_create_private_repositories: {
              type: "boolean"
            },
            members_can_create_public_repositories: {
              type: "boolean"
            },
            members_can_create_repositories: {
              type: "boolean"
            },
            name: {
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org"
        },
        updateHook: {
          method: "PATCH",
          params: {
            active: {
              type: "boolean"
            },
            config: {
              type: "object"
            },
            "config.content_type": {
              type: "string"
            },
            "config.insecure_ssl": {
              type: "string"
            },
            "config.secret": {
              type: "string"
            },
            "config.url": {
              required: true,
              type: "string"
            },
            events: {
              type: "string[]"
            },
            hook_id: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/hooks/:hook_id"
        },
        updateMembership: {
          method: "PATCH",
          params: {
            org: {
              required: true,
              type: "string"
            },
            state: {
              enum: ["active"],
              required: true,
              type: "string"
            }
          },
          url: "/user/memberships/orgs/:org"
        }
      },
      projects: {
        addCollaborator: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "PUT",
          params: {
            permission: {
              enum: ["read", "write", "admin"],
              type: "string"
            },
            project_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/projects/:project_id/collaborators/:username"
        },
        createCard: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "POST",
          params: {
            column_id: {
              required: true,
              type: "integer"
            },
            content_id: {
              type: "integer"
            },
            content_type: {
              type: "string"
            },
            note: {
              type: "string"
            }
          },
          url: "/projects/columns/:column_id/cards"
        },
        createColumn: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "POST",
          params: {
            name: {
              required: true,
              type: "string"
            },
            project_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/projects/:project_id/columns"
        },
        createForAuthenticatedUser: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "POST",
          params: {
            body: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            }
          },
          url: "/user/projects"
        },
        createForOrg: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "POST",
          params: {
            body: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/projects"
        },
        createForRepo: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "POST",
          params: {
            body: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/projects"
        },
        delete: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "DELETE",
          params: {
            project_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/projects/:project_id"
        },
        deleteCard: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "DELETE",
          params: {
            card_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/projects/columns/cards/:card_id"
        },
        deleteColumn: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "DELETE",
          params: {
            column_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/projects/columns/:column_id"
        },
        get: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            project_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/projects/:project_id"
        },
        getCard: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            card_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/projects/columns/cards/:card_id"
        },
        getColumn: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            column_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/projects/columns/:column_id"
        },
        listCards: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            archived_state: {
              enum: ["all", "archived", "not_archived"],
              type: "string"
            },
            column_id: {
              required: true,
              type: "integer"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/projects/columns/:column_id/cards"
        },
        listCollaborators: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            affiliation: {
              enum: ["outside", "direct", "all"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            project_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/projects/:project_id/collaborators"
        },
        listColumns: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            project_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/projects/:project_id/columns"
        },
        listForOrg: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            state: {
              enum: ["open", "closed", "all"],
              type: "string"
            }
          },
          url: "/orgs/:org/projects"
        },
        listForRepo: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            state: {
              enum: ["open", "closed", "all"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/projects"
        },
        listForUser: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            state: {
              enum: ["open", "closed", "all"],
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/projects"
        },
        moveCard: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "POST",
          params: {
            card_id: {
              required: true,
              type: "integer"
            },
            column_id: {
              type: "integer"
            },
            position: {
              required: true,
              type: "string",
              validation: "^(top|bottom|after:\\d+)$"
            }
          },
          url: "/projects/columns/cards/:card_id/moves"
        },
        moveColumn: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "POST",
          params: {
            column_id: {
              required: true,
              type: "integer"
            },
            position: {
              required: true,
              type: "string",
              validation: "^(first|last|after:\\d+)$"
            }
          },
          url: "/projects/columns/:column_id/moves"
        },
        removeCollaborator: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "DELETE",
          params: {
            project_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/projects/:project_id/collaborators/:username"
        },
        reviewUserPermissionLevel: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            project_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/projects/:project_id/collaborators/:username/permission"
        },
        update: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "PATCH",
          params: {
            body: {
              type: "string"
            },
            name: {
              type: "string"
            },
            organization_permission: {
              type: "string"
            },
            private: {
              type: "boolean"
            },
            project_id: {
              required: true,
              type: "integer"
            },
            state: {
              enum: ["open", "closed"],
              type: "string"
            }
          },
          url: "/projects/:project_id"
        },
        updateCard: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "PATCH",
          params: {
            archived: {
              type: "boolean"
            },
            card_id: {
              required: true,
              type: "integer"
            },
            note: {
              type: "string"
            }
          },
          url: "/projects/columns/cards/:card_id"
        },
        updateColumn: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "PATCH",
          params: {
            column_id: {
              required: true,
              type: "integer"
            },
            name: {
              required: true,
              type: "string"
            }
          },
          url: "/projects/columns/:column_id"
        }
      },
      pulls: {
        checkIfMerged: {
          method: "GET",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/merge"
        },
        create: {
          method: "POST",
          params: {
            base: {
              required: true,
              type: "string"
            },
            body: {
              type: "string"
            },
            draft: {
              type: "boolean"
            },
            head: {
              required: true,
              type: "string"
            },
            maintainer_can_modify: {
              type: "boolean"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            title: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls"
        },
        createComment: {
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            commit_id: {
              required: true,
              type: "string"
            },
            in_reply_to: {
              deprecated: true,
              description: "The comment ID to reply to. **Note**: This must be the ID of a top-level comment, not a reply to that comment. Replies to replies are not supported.",
              type: "integer"
            },
            line: {
              type: "integer"
            },
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            path: {
              required: true,
              type: "string"
            },
            position: {
              type: "integer"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            side: {
              enum: ["LEFT", "RIGHT"],
              type: "string"
            },
            start_line: {
              type: "integer"
            },
            start_side: {
              enum: ["LEFT", "RIGHT", "side"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/comments"
        },
        createCommentReply: {
          deprecated: "octokit.pulls.createCommentReply() has been renamed to octokit.pulls.createComment() (2019-09-09)",
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            commit_id: {
              required: true,
              type: "string"
            },
            in_reply_to: {
              deprecated: true,
              description: "The comment ID to reply to. **Note**: This must be the ID of a top-level comment, not a reply to that comment. Replies to replies are not supported.",
              type: "integer"
            },
            line: {
              type: "integer"
            },
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            path: {
              required: true,
              type: "string"
            },
            position: {
              type: "integer"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            side: {
              enum: ["LEFT", "RIGHT"],
              type: "string"
            },
            start_line: {
              type: "integer"
            },
            start_side: {
              enum: ["LEFT", "RIGHT", "side"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/comments"
        },
        createFromIssue: {
          deprecated: "octokit.pulls.createFromIssue() is deprecated, see https://developer.github.com/v3/pulls/#create-a-pull-request",
          method: "POST",
          params: {
            base: {
              required: true,
              type: "string"
            },
            draft: {
              type: "boolean"
            },
            head: {
              required: true,
              type: "string"
            },
            issue: {
              required: true,
              type: "integer"
            },
            maintainer_can_modify: {
              type: "boolean"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls"
        },
        createReview: {
          method: "POST",
          params: {
            body: {
              type: "string"
            },
            comments: {
              type: "object[]"
            },
            "comments[].body": {
              required: true,
              type: "string"
            },
            "comments[].path": {
              required: true,
              type: "string"
            },
            "comments[].position": {
              required: true,
              type: "integer"
            },
            commit_id: {
              type: "string"
            },
            event: {
              enum: ["APPROVE", "REQUEST_CHANGES", "COMMENT"],
              type: "string"
            },
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews"
        },
        createReviewCommentReply: {
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            comment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/comments/:comment_id/replies"
        },
        createReviewRequest: {
          method: "POST",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            reviewers: {
              type: "string[]"
            },
            team_reviewers: {
              type: "string[]"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers"
        },
        deleteComment: {
          method: "DELETE",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/comments/:comment_id"
        },
        deletePendingReview: {
          method: "DELETE",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            review_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id"
        },
        deleteReviewRequest: {
          method: "DELETE",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            reviewers: {
              type: "string[]"
            },
            team_reviewers: {
              type: "string[]"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers"
        },
        dismissReview: {
          method: "PUT",
          params: {
            message: {
              required: true,
              type: "string"
            },
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            review_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/dismissals"
        },
        get: {
          method: "GET",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number"
        },
        getComment: {
          method: "GET",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/comments/:comment_id"
        },
        getCommentsForReview: {
          method: "GET",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            review_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/comments"
        },
        getReview: {
          method: "GET",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            review_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id"
        },
        list: {
          method: "GET",
          params: {
            base: {
              type: "string"
            },
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            head: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            sort: {
              enum: ["created", "updated", "popularity", "long-running"],
              type: "string"
            },
            state: {
              enum: ["open", "closed", "all"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls"
        },
        listComments: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            since: {
              type: "string"
            },
            sort: {
              enum: ["created", "updated"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/comments"
        },
        listCommentsForRepo: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            since: {
              type: "string"
            },
            sort: {
              enum: ["created", "updated"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/comments"
        },
        listCommits: {
          method: "GET",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/commits"
        },
        listFiles: {
          method: "GET",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/files"
        },
        listReviewRequests: {
          method: "GET",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers"
        },
        listReviews: {
          method: "GET",
          params: {
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews"
        },
        merge: {
          method: "PUT",
          params: {
            commit_message: {
              type: "string"
            },
            commit_title: {
              type: "string"
            },
            merge_method: {
              enum: ["merge", "squash", "rebase"],
              type: "string"
            },
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/merge"
        },
        submitReview: {
          method: "POST",
          params: {
            body: {
              type: "string"
            },
            event: {
              enum: ["APPROVE", "REQUEST_CHANGES", "COMMENT"],
              required: true,
              type: "string"
            },
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            review_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/events"
        },
        update: {
          method: "PATCH",
          params: {
            base: {
              type: "string"
            },
            body: {
              type: "string"
            },
            maintainer_can_modify: {
              type: "boolean"
            },
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            state: {
              enum: ["open", "closed"],
              type: "string"
            },
            title: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number"
        },
        updateBranch: {
          headers: {
            accept: "application/vnd.github.lydian-preview+json"
          },
          method: "PUT",
          params: {
            expected_head_sha: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/update-branch"
        },
        updateComment: {
          method: "PATCH",
          params: {
            body: {
              required: true,
              type: "string"
            },
            comment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/comments/:comment_id"
        },
        updateReview: {
          method: "PUT",
          params: {
            body: {
              required: true,
              type: "string"
            },
            number: {
              alias: "pull_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            pull_number: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            review_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id"
        }
      },
      rateLimit: {
        get: {
          method: "GET",
          params: {},
          url: "/rate_limit"
        }
      },
      reactions: {
        createForCommitComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/comments/:comment_id/reactions"
        },
        createForIssue: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              required: true,
              type: "string"
            },
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/reactions"
        },
        createForIssueComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/comments/:comment_id/reactions"
        },
        createForPullRequestReviewComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/comments/:comment_id/reactions"
        },
        createForTeamDiscussion: {
          deprecated: "octokit.reactions.createForTeamDiscussion() has been renamed to octokit.reactions.createForTeamDiscussionLegacy() (2020-01-16)",
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              required: true,
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/reactions"
        },
        createForTeamDiscussionComment: {
          deprecated: "octokit.reactions.createForTeamDiscussionComment() has been renamed to octokit.reactions.createForTeamDiscussionCommentLegacy() (2020-01-16)",
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              required: true,
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions"
        },
        createForTeamDiscussionCommentInOrg: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              required: true,
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number/reactions"
        },
        createForTeamDiscussionCommentLegacy: {
          deprecated: "octokit.reactions.createForTeamDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/reactions/#create-reaction-for-a-team-discussion-comment-legacy",
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              required: true,
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions"
        },
        createForTeamDiscussionInOrg: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              required: true,
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/reactions"
        },
        createForTeamDiscussionLegacy: {
          deprecated: "octokit.reactions.createForTeamDiscussionLegacy() is deprecated, see https://developer.github.com/v3/reactions/#create-reaction-for-a-team-discussion-legacy",
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              required: true,
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/reactions"
        },
        delete: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "DELETE",
          params: {
            reaction_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/reactions/:reaction_id"
        },
        listForCommitComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/comments/:comment_id/reactions"
        },
        listForIssue: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              type: "string"
            },
            issue_number: {
              required: true,
              type: "integer"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/reactions"
        },
        listForIssueComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/issues/comments/:comment_id/reactions"
        },
        listForPullRequestReviewComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pulls/comments/:comment_id/reactions"
        },
        listForTeamDiscussion: {
          deprecated: "octokit.reactions.listForTeamDiscussion() has been renamed to octokit.reactions.listForTeamDiscussionLegacy() (2020-01-16)",
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/reactions"
        },
        listForTeamDiscussionComment: {
          deprecated: "octokit.reactions.listForTeamDiscussionComment() has been renamed to octokit.reactions.listForTeamDiscussionCommentLegacy() (2020-01-16)",
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions"
        },
        listForTeamDiscussionCommentInOrg: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number/reactions"
        },
        listForTeamDiscussionCommentLegacy: {
          deprecated: "octokit.reactions.listForTeamDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/reactions/#list-reactions-for-a-team-discussion-comment-legacy",
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions"
        },
        listForTeamDiscussionInOrg: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/reactions"
        },
        listForTeamDiscussionLegacy: {
          deprecated: "octokit.reactions.listForTeamDiscussionLegacy() is deprecated, see https://developer.github.com/v3/reactions/#list-reactions-for-a-team-discussion-legacy",
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            content: {
              enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/reactions"
        }
      },
      repos: {
        acceptInvitation: {
          method: "PATCH",
          params: {
            invitation_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/repository_invitations/:invitation_id"
        },
        addCollaborator: {
          method: "PUT",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            permission: {
              enum: ["pull", "push", "admin"],
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/collaborators/:username"
        },
        addDeployKey: {
          method: "POST",
          params: {
            key: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            read_only: {
              type: "boolean"
            },
            repo: {
              required: true,
              type: "string"
            },
            title: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/keys"
        },
        addProtectedBranchAdminEnforcement: {
          method: "POST",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/enforce_admins"
        },
        addProtectedBranchAppRestrictions: {
          method: "POST",
          params: {
            apps: {
              mapTo: "data",
              required: true,
              type: "string[]"
            },
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
        },
        addProtectedBranchRequiredSignatures: {
          headers: {
            accept: "application/vnd.github.zzzax-preview+json"
          },
          method: "POST",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_signatures"
        },
        addProtectedBranchRequiredStatusChecksContexts: {
          method: "POST",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            contexts: {
              mapTo: "data",
              required: true,
              type: "string[]"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
        },
        addProtectedBranchTeamRestrictions: {
          method: "POST",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            teams: {
              mapTo: "data",
              required: true,
              type: "string[]"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        addProtectedBranchUserRestrictions: {
          method: "POST",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            users: {
              mapTo: "data",
              required: true,
              type: "string[]"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        checkCollaborator: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/collaborators/:username"
        },
        checkVulnerabilityAlerts: {
          headers: {
            accept: "application/vnd.github.dorian-preview+json"
          },
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/vulnerability-alerts"
        },
        compareCommits: {
          method: "GET",
          params: {
            base: {
              required: true,
              type: "string"
            },
            head: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/compare/:base...:head"
        },
        createCommitComment: {
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            commit_sha: {
              required: true,
              type: "string"
            },
            line: {
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            path: {
              type: "string"
            },
            position: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              alias: "commit_sha",
              deprecated: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:commit_sha/comments"
        },
        createDeployment: {
          method: "POST",
          params: {
            auto_merge: {
              type: "boolean"
            },
            description: {
              type: "string"
            },
            environment: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            payload: {
              type: "string"
            },
            production_environment: {
              type: "boolean"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            required_contexts: {
              type: "string[]"
            },
            task: {
              type: "string"
            },
            transient_environment: {
              type: "boolean"
            }
          },
          url: "/repos/:owner/:repo/deployments"
        },
        createDeploymentStatus: {
          method: "POST",
          params: {
            auto_inactive: {
              type: "boolean"
            },
            deployment_id: {
              required: true,
              type: "integer"
            },
            description: {
              type: "string"
            },
            environment: {
              enum: ["production", "staging", "qa"],
              type: "string"
            },
            environment_url: {
              type: "string"
            },
            log_url: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            state: {
              enum: ["error", "failure", "inactive", "in_progress", "queued", "pending", "success"],
              required: true,
              type: "string"
            },
            target_url: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/deployments/:deployment_id/statuses"
        },
        createDispatchEvent: {
          method: "POST",
          params: {
            client_payload: {
              type: "object"
            },
            event_type: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/dispatches"
        },
        createFile: {
          deprecated: "octokit.repos.createFile() has been renamed to octokit.repos.createOrUpdateFile() (2019-06-07)",
          method: "PUT",
          params: {
            author: {
              type: "object"
            },
            "author.email": {
              required: true,
              type: "string"
            },
            "author.name": {
              required: true,
              type: "string"
            },
            branch: {
              type: "string"
            },
            committer: {
              type: "object"
            },
            "committer.email": {
              required: true,
              type: "string"
            },
            "committer.name": {
              required: true,
              type: "string"
            },
            content: {
              required: true,
              type: "string"
            },
            message: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            path: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/contents/:path"
        },
        createForAuthenticatedUser: {
          method: "POST",
          params: {
            allow_merge_commit: {
              type: "boolean"
            },
            allow_rebase_merge: {
              type: "boolean"
            },
            allow_squash_merge: {
              type: "boolean"
            },
            auto_init: {
              type: "boolean"
            },
            delete_branch_on_merge: {
              type: "boolean"
            },
            description: {
              type: "string"
            },
            gitignore_template: {
              type: "string"
            },
            has_issues: {
              type: "boolean"
            },
            has_projects: {
              type: "boolean"
            },
            has_wiki: {
              type: "boolean"
            },
            homepage: {
              type: "string"
            },
            is_template: {
              type: "boolean"
            },
            license_template: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            private: {
              type: "boolean"
            },
            team_id: {
              type: "integer"
            },
            visibility: {
              enum: ["public", "private", "visibility", "internal"],
              type: "string"
            }
          },
          url: "/user/repos"
        },
        createFork: {
          method: "POST",
          params: {
            organization: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/forks"
        },
        createHook: {
          method: "POST",
          params: {
            active: {
              type: "boolean"
            },
            config: {
              required: true,
              type: "object"
            },
            "config.content_type": {
              type: "string"
            },
            "config.insecure_ssl": {
              type: "string"
            },
            "config.secret": {
              type: "string"
            },
            "config.url": {
              required: true,
              type: "string"
            },
            events: {
              type: "string[]"
            },
            name: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/hooks"
        },
        createInOrg: {
          method: "POST",
          params: {
            allow_merge_commit: {
              type: "boolean"
            },
            allow_rebase_merge: {
              type: "boolean"
            },
            allow_squash_merge: {
              type: "boolean"
            },
            auto_init: {
              type: "boolean"
            },
            delete_branch_on_merge: {
              type: "boolean"
            },
            description: {
              type: "string"
            },
            gitignore_template: {
              type: "string"
            },
            has_issues: {
              type: "boolean"
            },
            has_projects: {
              type: "boolean"
            },
            has_wiki: {
              type: "boolean"
            },
            homepage: {
              type: "string"
            },
            is_template: {
              type: "boolean"
            },
            license_template: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            },
            private: {
              type: "boolean"
            },
            team_id: {
              type: "integer"
            },
            visibility: {
              enum: ["public", "private", "visibility", "internal"],
              type: "string"
            }
          },
          url: "/orgs/:org/repos"
        },
        createOrUpdateFile: {
          method: "PUT",
          params: {
            author: {
              type: "object"
            },
            "author.email": {
              required: true,
              type: "string"
            },
            "author.name": {
              required: true,
              type: "string"
            },
            branch: {
              type: "string"
            },
            committer: {
              type: "object"
            },
            "committer.email": {
              required: true,
              type: "string"
            },
            "committer.name": {
              required: true,
              type: "string"
            },
            content: {
              required: true,
              type: "string"
            },
            message: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            path: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/contents/:path"
        },
        createRelease: {
          method: "POST",
          params: {
            body: {
              type: "string"
            },
            draft: {
              type: "boolean"
            },
            name: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            prerelease: {
              type: "boolean"
            },
            repo: {
              required: true,
              type: "string"
            },
            tag_name: {
              required: true,
              type: "string"
            },
            target_commitish: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases"
        },
        createStatus: {
          method: "POST",
          params: {
            context: {
              type: "string"
            },
            description: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              required: true,
              type: "string"
            },
            state: {
              enum: ["error", "failure", "pending", "success"],
              required: true,
              type: "string"
            },
            target_url: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/statuses/:sha"
        },
        createUsingTemplate: {
          headers: {
            accept: "application/vnd.github.baptiste-preview+json"
          },
          method: "POST",
          params: {
            description: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            owner: {
              type: "string"
            },
            private: {
              type: "boolean"
            },
            template_owner: {
              required: true,
              type: "string"
            },
            template_repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:template_owner/:template_repo/generate"
        },
        declineInvitation: {
          method: "DELETE",
          params: {
            invitation_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/repository_invitations/:invitation_id"
        },
        delete: {
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo"
        },
        deleteCommitComment: {
          method: "DELETE",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/comments/:comment_id"
        },
        deleteDownload: {
          method: "DELETE",
          params: {
            download_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/downloads/:download_id"
        },
        deleteFile: {
          method: "DELETE",
          params: {
            author: {
              type: "object"
            },
            "author.email": {
              type: "string"
            },
            "author.name": {
              type: "string"
            },
            branch: {
              type: "string"
            },
            committer: {
              type: "object"
            },
            "committer.email": {
              type: "string"
            },
            "committer.name": {
              type: "string"
            },
            message: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            path: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/contents/:path"
        },
        deleteHook: {
          method: "DELETE",
          params: {
            hook_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/hooks/:hook_id"
        },
        deleteInvitation: {
          method: "DELETE",
          params: {
            invitation_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/invitations/:invitation_id"
        },
        deleteRelease: {
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            release_id: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases/:release_id"
        },
        deleteReleaseAsset: {
          method: "DELETE",
          params: {
            asset_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases/assets/:asset_id"
        },
        disableAutomatedSecurityFixes: {
          headers: {
            accept: "application/vnd.github.london-preview+json"
          },
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/automated-security-fixes"
        },
        disablePagesSite: {
          headers: {
            accept: "application/vnd.github.switcheroo-preview+json"
          },
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pages"
        },
        disableVulnerabilityAlerts: {
          headers: {
            accept: "application/vnd.github.dorian-preview+json"
          },
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/vulnerability-alerts"
        },
        enableAutomatedSecurityFixes: {
          headers: {
            accept: "application/vnd.github.london-preview+json"
          },
          method: "PUT",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/automated-security-fixes"
        },
        enablePagesSite: {
          headers: {
            accept: "application/vnd.github.switcheroo-preview+json"
          },
          method: "POST",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            source: {
              type: "object"
            },
            "source.branch": {
              enum: ["master", "gh-pages"],
              type: "string"
            },
            "source.path": {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pages"
        },
        enableVulnerabilityAlerts: {
          headers: {
            accept: "application/vnd.github.dorian-preview+json"
          },
          method: "PUT",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/vulnerability-alerts"
        },
        get: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo"
        },
        getAppsWithAccessToProtectedBranch: {
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
        },
        getArchiveLink: {
          method: "GET",
          params: {
            archive_format: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/:archive_format/:ref"
        },
        getBranch: {
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch"
        },
        getBranchProtection: {
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection"
        },
        getClones: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            per: {
              enum: ["day", "week"],
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/traffic/clones"
        },
        getCodeFrequencyStats: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/stats/code_frequency"
        },
        getCollaboratorPermissionLevel: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/collaborators/:username/permission"
        },
        getCombinedStatusForRef: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:ref/status"
        },
        getCommit: {
          method: "GET",
          params: {
            commit_sha: {
              alias: "ref",
              deprecated: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              alias: "ref",
              deprecated: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:ref"
        },
        getCommitActivityStats: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/stats/commit_activity"
        },
        getCommitComment: {
          method: "GET",
          params: {
            comment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/comments/:comment_id"
        },
        getCommitRefSha: {
          deprecated: "octokit.repos.getCommitRefSha() is deprecated, see https://developer.github.com/v3/repos/commits/#get-a-single-commit",
          headers: {
            accept: "application/vnd.github.v3.sha"
          },
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:ref"
        },
        getContents: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            path: {
              required: true,
              type: "string"
            },
            ref: {
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/contents/:path"
        },
        getContributorsStats: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/stats/contributors"
        },
        getDeployKey: {
          method: "GET",
          params: {
            key_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/keys/:key_id"
        },
        getDeployment: {
          method: "GET",
          params: {
            deployment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/deployments/:deployment_id"
        },
        getDeploymentStatus: {
          method: "GET",
          params: {
            deployment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            status_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/deployments/:deployment_id/statuses/:status_id"
        },
        getDownload: {
          method: "GET",
          params: {
            download_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/downloads/:download_id"
        },
        getHook: {
          method: "GET",
          params: {
            hook_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/hooks/:hook_id"
        },
        getLatestPagesBuild: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pages/builds/latest"
        },
        getLatestRelease: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases/latest"
        },
        getPages: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pages"
        },
        getPagesBuild: {
          method: "GET",
          params: {
            build_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pages/builds/:build_id"
        },
        getParticipationStats: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/stats/participation"
        },
        getProtectedBranchAdminEnforcement: {
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/enforce_admins"
        },
        getProtectedBranchPullRequestReviewEnforcement: {
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews"
        },
        getProtectedBranchRequiredSignatures: {
          headers: {
            accept: "application/vnd.github.zzzax-preview+json"
          },
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_signatures"
        },
        getProtectedBranchRequiredStatusChecks: {
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks"
        },
        getProtectedBranchRestrictions: {
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions"
        },
        getPunchCardStats: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/stats/punch_card"
        },
        getReadme: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            ref: {
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/readme"
        },
        getRelease: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            release_id: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases/:release_id"
        },
        getReleaseAsset: {
          method: "GET",
          params: {
            asset_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases/assets/:asset_id"
        },
        getReleaseByTag: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            tag: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases/tags/:tag"
        },
        getTeamsWithAccessToProtectedBranch: {
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        getTopPaths: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/traffic/popular/paths"
        },
        getTopReferrers: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/traffic/popular/referrers"
        },
        getUsersWithAccessToProtectedBranch: {
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        getViews: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            per: {
              enum: ["day", "week"],
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/traffic/views"
        },
        list: {
          method: "GET",
          params: {
            affiliation: {
              type: "string"
            },
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            sort: {
              enum: ["created", "updated", "pushed", "full_name"],
              type: "string"
            },
            type: {
              enum: ["all", "owner", "public", "private", "member"],
              type: "string"
            },
            visibility: {
              enum: ["all", "public", "private"],
              type: "string"
            }
          },
          url: "/user/repos"
        },
        listAppsWithAccessToProtectedBranch: {
          deprecated: "octokit.repos.listAppsWithAccessToProtectedBranch() has been renamed to octokit.repos.getAppsWithAccessToProtectedBranch() (2019-09-13)",
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
        },
        listAssetsForRelease: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            release_id: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases/:release_id/assets"
        },
        listBranches: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            protected: {
              type: "boolean"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches"
        },
        listBranchesForHeadCommit: {
          headers: {
            accept: "application/vnd.github.groot-preview+json"
          },
          method: "GET",
          params: {
            commit_sha: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:commit_sha/branches-where-head"
        },
        listCollaborators: {
          method: "GET",
          params: {
            affiliation: {
              enum: ["outside", "direct", "all"],
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/collaborators"
        },
        listCommentsForCommit: {
          method: "GET",
          params: {
            commit_sha: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            ref: {
              alias: "commit_sha",
              deprecated: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:commit_sha/comments"
        },
        listCommitComments: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/comments"
        },
        listCommits: {
          method: "GET",
          params: {
            author: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            path: {
              type: "string"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              type: "string"
            },
            since: {
              type: "string"
            },
            until: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits"
        },
        listContributors: {
          method: "GET",
          params: {
            anon: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/contributors"
        },
        listDeployKeys: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/keys"
        },
        listDeploymentStatuses: {
          method: "GET",
          params: {
            deployment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/deployments/:deployment_id/statuses"
        },
        listDeployments: {
          method: "GET",
          params: {
            environment: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            ref: {
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              type: "string"
            },
            task: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/deployments"
        },
        listDownloads: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/downloads"
        },
        listForOrg: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            sort: {
              enum: ["created", "updated", "pushed", "full_name"],
              type: "string"
            },
            type: {
              enum: ["all", "public", "private", "forks", "sources", "member", "internal"],
              type: "string"
            }
          },
          url: "/orgs/:org/repos"
        },
        listForUser: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            sort: {
              enum: ["created", "updated", "pushed", "full_name"],
              type: "string"
            },
            type: {
              enum: ["all", "owner", "member"],
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/repos"
        },
        listForks: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            sort: {
              enum: ["newest", "oldest", "stargazers"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/forks"
        },
        listHooks: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/hooks"
        },
        listInvitations: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/invitations"
        },
        listInvitationsForAuthenticatedUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/repository_invitations"
        },
        listLanguages: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/languages"
        },
        listPagesBuilds: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pages/builds"
        },
        listProtectedBranchRequiredStatusChecksContexts: {
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
        },
        listProtectedBranchTeamRestrictions: {
          deprecated: "octokit.repos.listProtectedBranchTeamRestrictions() has been renamed to octokit.repos.getTeamsWithAccessToProtectedBranch() (2019-09-09)",
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        listProtectedBranchUserRestrictions: {
          deprecated: "octokit.repos.listProtectedBranchUserRestrictions() has been renamed to octokit.repos.getUsersWithAccessToProtectedBranch() (2019-09-09)",
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        listPublic: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "integer"
            }
          },
          url: "/repositories"
        },
        listPullRequestsAssociatedWithCommit: {
          headers: {
            accept: "application/vnd.github.groot-preview+json"
          },
          method: "GET",
          params: {
            commit_sha: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:commit_sha/pulls"
        },
        listReleases: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases"
        },
        listStatusesForRef: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            ref: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:ref/statuses"
        },
        listTags: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/tags"
        },
        listTeams: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/teams"
        },
        listTeamsWithAccessToProtectedBranch: {
          deprecated: "octokit.repos.listTeamsWithAccessToProtectedBranch() has been renamed to octokit.repos.getTeamsWithAccessToProtectedBranch() (2019-09-13)",
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        listTopics: {
          headers: {
            accept: "application/vnd.github.mercy-preview+json"
          },
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/topics"
        },
        listUsersWithAccessToProtectedBranch: {
          deprecated: "octokit.repos.listUsersWithAccessToProtectedBranch() has been renamed to octokit.repos.getUsersWithAccessToProtectedBranch() (2019-09-13)",
          method: "GET",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        merge: {
          method: "POST",
          params: {
            base: {
              required: true,
              type: "string"
            },
            commit_message: {
              type: "string"
            },
            head: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/merges"
        },
        pingHook: {
          method: "POST",
          params: {
            hook_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/hooks/:hook_id/pings"
        },
        removeBranchProtection: {
          method: "DELETE",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection"
        },
        removeCollaborator: {
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/collaborators/:username"
        },
        removeDeployKey: {
          method: "DELETE",
          params: {
            key_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/keys/:key_id"
        },
        removeProtectedBranchAdminEnforcement: {
          method: "DELETE",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/enforce_admins"
        },
        removeProtectedBranchAppRestrictions: {
          method: "DELETE",
          params: {
            apps: {
              mapTo: "data",
              required: true,
              type: "string[]"
            },
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
        },
        removeProtectedBranchPullRequestReviewEnforcement: {
          method: "DELETE",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews"
        },
        removeProtectedBranchRequiredSignatures: {
          headers: {
            accept: "application/vnd.github.zzzax-preview+json"
          },
          method: "DELETE",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_signatures"
        },
        removeProtectedBranchRequiredStatusChecks: {
          method: "DELETE",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks"
        },
        removeProtectedBranchRequiredStatusChecksContexts: {
          method: "DELETE",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            contexts: {
              mapTo: "data",
              required: true,
              type: "string[]"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
        },
        removeProtectedBranchRestrictions: {
          method: "DELETE",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions"
        },
        removeProtectedBranchTeamRestrictions: {
          method: "DELETE",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            teams: {
              mapTo: "data",
              required: true,
              type: "string[]"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        removeProtectedBranchUserRestrictions: {
          method: "DELETE",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            users: {
              mapTo: "data",
              required: true,
              type: "string[]"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        replaceProtectedBranchAppRestrictions: {
          method: "PUT",
          params: {
            apps: {
              mapTo: "data",
              required: true,
              type: "string[]"
            },
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
        },
        replaceProtectedBranchRequiredStatusChecksContexts: {
          method: "PUT",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            contexts: {
              mapTo: "data",
              required: true,
              type: "string[]"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
        },
        replaceProtectedBranchTeamRestrictions: {
          method: "PUT",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            teams: {
              mapTo: "data",
              required: true,
              type: "string[]"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        replaceProtectedBranchUserRestrictions: {
          method: "PUT",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            users: {
              mapTo: "data",
              required: true,
              type: "string[]"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        replaceTopics: {
          headers: {
            accept: "application/vnd.github.mercy-preview+json"
          },
          method: "PUT",
          params: {
            names: {
              required: true,
              type: "string[]"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/topics"
        },
        requestPageBuild: {
          method: "POST",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pages/builds"
        },
        retrieveCommunityProfileMetrics: {
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/community/profile"
        },
        testPushHook: {
          method: "POST",
          params: {
            hook_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/hooks/:hook_id/tests"
        },
        transfer: {
          method: "POST",
          params: {
            new_owner: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            team_ids: {
              type: "integer[]"
            }
          },
          url: "/repos/:owner/:repo/transfer"
        },
        update: {
          method: "PATCH",
          params: {
            allow_merge_commit: {
              type: "boolean"
            },
            allow_rebase_merge: {
              type: "boolean"
            },
            allow_squash_merge: {
              type: "boolean"
            },
            archived: {
              type: "boolean"
            },
            default_branch: {
              type: "string"
            },
            delete_branch_on_merge: {
              type: "boolean"
            },
            description: {
              type: "string"
            },
            has_issues: {
              type: "boolean"
            },
            has_projects: {
              type: "boolean"
            },
            has_wiki: {
              type: "boolean"
            },
            homepage: {
              type: "string"
            },
            is_template: {
              type: "boolean"
            },
            name: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            private: {
              type: "boolean"
            },
            repo: {
              required: true,
              type: "string"
            },
            visibility: {
              enum: ["public", "private", "visibility", "internal"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo"
        },
        updateBranchProtection: {
          method: "PUT",
          params: {
            allow_deletions: {
              type: "boolean"
            },
            allow_force_pushes: {
              allowNull: true,
              type: "boolean"
            },
            branch: {
              required: true,
              type: "string"
            },
            enforce_admins: {
              allowNull: true,
              required: true,
              type: "boolean"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            required_linear_history: {
              type: "boolean"
            },
            required_pull_request_reviews: {
              allowNull: true,
              required: true,
              type: "object"
            },
            "required_pull_request_reviews.dismiss_stale_reviews": {
              type: "boolean"
            },
            "required_pull_request_reviews.dismissal_restrictions": {
              type: "object"
            },
            "required_pull_request_reviews.dismissal_restrictions.teams": {
              type: "string[]"
            },
            "required_pull_request_reviews.dismissal_restrictions.users": {
              type: "string[]"
            },
            "required_pull_request_reviews.require_code_owner_reviews": {
              type: "boolean"
            },
            "required_pull_request_reviews.required_approving_review_count": {
              type: "integer"
            },
            required_status_checks: {
              allowNull: true,
              required: true,
              type: "object"
            },
            "required_status_checks.contexts": {
              required: true,
              type: "string[]"
            },
            "required_status_checks.strict": {
              required: true,
              type: "boolean"
            },
            restrictions: {
              allowNull: true,
              required: true,
              type: "object"
            },
            "restrictions.apps": {
              type: "string[]"
            },
            "restrictions.teams": {
              required: true,
              type: "string[]"
            },
            "restrictions.users": {
              required: true,
              type: "string[]"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection"
        },
        updateCommitComment: {
          method: "PATCH",
          params: {
            body: {
              required: true,
              type: "string"
            },
            comment_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/comments/:comment_id"
        },
        updateFile: {
          deprecated: "octokit.repos.updateFile() has been renamed to octokit.repos.createOrUpdateFile() (2019-06-07)",
          method: "PUT",
          params: {
            author: {
              type: "object"
            },
            "author.email": {
              required: true,
              type: "string"
            },
            "author.name": {
              required: true,
              type: "string"
            },
            branch: {
              type: "string"
            },
            committer: {
              type: "object"
            },
            "committer.email": {
              required: true,
              type: "string"
            },
            "committer.name": {
              required: true,
              type: "string"
            },
            content: {
              required: true,
              type: "string"
            },
            message: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            path: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            sha: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/contents/:path"
        },
        updateHook: {
          method: "PATCH",
          params: {
            active: {
              type: "boolean"
            },
            add_events: {
              type: "string[]"
            },
            config: {
              type: "object"
            },
            "config.content_type": {
              type: "string"
            },
            "config.insecure_ssl": {
              type: "string"
            },
            "config.secret": {
              type: "string"
            },
            "config.url": {
              required: true,
              type: "string"
            },
            events: {
              type: "string[]"
            },
            hook_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            remove_events: {
              type: "string[]"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/hooks/:hook_id"
        },
        updateInformationAboutPagesSite: {
          method: "PUT",
          params: {
            cname: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            source: {
              enum: ['"gh-pages"', '"master"', '"master /docs"'],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pages"
        },
        updateInvitation: {
          method: "PATCH",
          params: {
            invitation_id: {
              required: true,
              type: "integer"
            },
            owner: {
              required: true,
              type: "string"
            },
            permissions: {
              enum: ["read", "write", "admin"],
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/invitations/:invitation_id"
        },
        updateProtectedBranchPullRequestReviewEnforcement: {
          method: "PATCH",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            dismiss_stale_reviews: {
              type: "boolean"
            },
            dismissal_restrictions: {
              type: "object"
            },
            "dismissal_restrictions.teams": {
              type: "string[]"
            },
            "dismissal_restrictions.users": {
              type: "string[]"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            require_code_owner_reviews: {
              type: "boolean"
            },
            required_approving_review_count: {
              type: "integer"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews"
        },
        updateProtectedBranchRequiredStatusChecks: {
          method: "PATCH",
          params: {
            branch: {
              required: true,
              type: "string"
            },
            contexts: {
              type: "string[]"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            strict: {
              type: "boolean"
            }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks"
        },
        updateRelease: {
          method: "PATCH",
          params: {
            body: {
              type: "string"
            },
            draft: {
              type: "boolean"
            },
            name: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            prerelease: {
              type: "boolean"
            },
            release_id: {
              required: true,
              type: "integer"
            },
            repo: {
              required: true,
              type: "string"
            },
            tag_name: {
              type: "string"
            },
            target_commitish: {
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases/:release_id"
        },
        updateReleaseAsset: {
          method: "PATCH",
          params: {
            asset_id: {
              required: true,
              type: "integer"
            },
            label: {
              type: "string"
            },
            name: {
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/releases/assets/:asset_id"
        },
        uploadReleaseAsset: {
          method: "POST",
          params: {
            data: {
              mapTo: "data",
              required: true,
              type: "string | object"
            },
            file: {
              alias: "data",
              deprecated: true,
              type: "string | object"
            },
            headers: {
              required: true,
              type: "object"
            },
            "headers.content-length": {
              required: true,
              type: "integer"
            },
            "headers.content-type": {
              required: true,
              type: "string"
            },
            label: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            url: {
              required: true,
              type: "string"
            }
          },
          url: ":url"
        }
      },
      search: {
        code: {
          method: "GET",
          params: {
            order: {
              enum: ["desc", "asc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            q: {
              required: true,
              type: "string"
            },
            sort: {
              enum: ["indexed"],
              type: "string"
            }
          },
          url: "/search/code"
        },
        commits: {
          headers: {
            accept: "application/vnd.github.cloak-preview+json"
          },
          method: "GET",
          params: {
            order: {
              enum: ["desc", "asc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            q: {
              required: true,
              type: "string"
            },
            sort: {
              enum: ["author-date", "committer-date"],
              type: "string"
            }
          },
          url: "/search/commits"
        },
        issues: {
          deprecated: "octokit.search.issues() has been renamed to octokit.search.issuesAndPullRequests() (2018-12-27)",
          method: "GET",
          params: {
            order: {
              enum: ["desc", "asc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            q: {
              required: true,
              type: "string"
            },
            sort: {
              enum: ["comments", "reactions", "reactions-+1", "reactions--1", "reactions-smile", "reactions-thinking_face", "reactions-heart", "reactions-tada", "interactions", "created", "updated"],
              type: "string"
            }
          },
          url: "/search/issues"
        },
        issuesAndPullRequests: {
          method: "GET",
          params: {
            order: {
              enum: ["desc", "asc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            q: {
              required: true,
              type: "string"
            },
            sort: {
              enum: ["comments", "reactions", "reactions-+1", "reactions--1", "reactions-smile", "reactions-thinking_face", "reactions-heart", "reactions-tada", "interactions", "created", "updated"],
              type: "string"
            }
          },
          url: "/search/issues"
        },
        labels: {
          method: "GET",
          params: {
            order: {
              enum: ["desc", "asc"],
              type: "string"
            },
            q: {
              required: true,
              type: "string"
            },
            repository_id: {
              required: true,
              type: "integer"
            },
            sort: {
              enum: ["created", "updated"],
              type: "string"
            }
          },
          url: "/search/labels"
        },
        repos: {
          method: "GET",
          params: {
            order: {
              enum: ["desc", "asc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            q: {
              required: true,
              type: "string"
            },
            sort: {
              enum: ["stars", "forks", "help-wanted-issues", "updated"],
              type: "string"
            }
          },
          url: "/search/repositories"
        },
        topics: {
          method: "GET",
          params: {
            q: {
              required: true,
              type: "string"
            }
          },
          url: "/search/topics"
        },
        users: {
          method: "GET",
          params: {
            order: {
              enum: ["desc", "asc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            q: {
              required: true,
              type: "string"
            },
            sort: {
              enum: ["followers", "repositories", "joined"],
              type: "string"
            }
          },
          url: "/search/users"
        }
      },
      teams: {
        addMember: {
          deprecated: "octokit.teams.addMember() has been renamed to octokit.teams.addMemberLegacy() (2020-01-16)",
          method: "PUT",
          params: {
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/members/:username"
        },
        addMemberLegacy: {
          deprecated: "octokit.teams.addMemberLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#add-team-member-legacy",
          method: "PUT",
          params: {
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/members/:username"
        },
        addOrUpdateMembership: {
          deprecated: "octokit.teams.addOrUpdateMembership() has been renamed to octokit.teams.addOrUpdateMembershipLegacy() (2020-01-16)",
          method: "PUT",
          params: {
            role: {
              enum: ["member", "maintainer"],
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/memberships/:username"
        },
        addOrUpdateMembershipInOrg: {
          method: "PUT",
          params: {
            org: {
              required: true,
              type: "string"
            },
            role: {
              enum: ["member", "maintainer"],
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/memberships/:username"
        },
        addOrUpdateMembershipLegacy: {
          deprecated: "octokit.teams.addOrUpdateMembershipLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#add-or-update-team-membership-legacy",
          method: "PUT",
          params: {
            role: {
              enum: ["member", "maintainer"],
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/memberships/:username"
        },
        addOrUpdateProject: {
          deprecated: "octokit.teams.addOrUpdateProject() has been renamed to octokit.teams.addOrUpdateProjectLegacy() (2020-01-16)",
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "PUT",
          params: {
            permission: {
              enum: ["read", "write", "admin"],
              type: "string"
            },
            project_id: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/projects/:project_id"
        },
        addOrUpdateProjectInOrg: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "PUT",
          params: {
            org: {
              required: true,
              type: "string"
            },
            permission: {
              enum: ["read", "write", "admin"],
              type: "string"
            },
            project_id: {
              required: true,
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/projects/:project_id"
        },
        addOrUpdateProjectLegacy: {
          deprecated: "octokit.teams.addOrUpdateProjectLegacy() is deprecated, see https://developer.github.com/v3/teams/#add-or-update-team-project-legacy",
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "PUT",
          params: {
            permission: {
              enum: ["read", "write", "admin"],
              type: "string"
            },
            project_id: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/projects/:project_id"
        },
        addOrUpdateRepo: {
          deprecated: "octokit.teams.addOrUpdateRepo() has been renamed to octokit.teams.addOrUpdateRepoLegacy() (2020-01-16)",
          method: "PUT",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            permission: {
              enum: ["pull", "push", "admin"],
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/repos/:owner/:repo"
        },
        addOrUpdateRepoInOrg: {
          method: "PUT",
          params: {
            org: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            permission: {
              enum: ["pull", "push", "admin"],
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/repos/:owner/:repo"
        },
        addOrUpdateRepoLegacy: {
          deprecated: "octokit.teams.addOrUpdateRepoLegacy() is deprecated, see https://developer.github.com/v3/teams/#add-or-update-team-repository-legacy",
          method: "PUT",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            permission: {
              enum: ["pull", "push", "admin"],
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/repos/:owner/:repo"
        },
        checkManagesRepo: {
          deprecated: "octokit.teams.checkManagesRepo() has been renamed to octokit.teams.checkManagesRepoLegacy() (2020-01-16)",
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/repos/:owner/:repo"
        },
        checkManagesRepoInOrg: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/repos/:owner/:repo"
        },
        checkManagesRepoLegacy: {
          deprecated: "octokit.teams.checkManagesRepoLegacy() is deprecated, see https://developer.github.com/v3/teams/#check-if-a-team-manages-a-repository-legacy",
          method: "GET",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/repos/:owner/:repo"
        },
        create: {
          method: "POST",
          params: {
            description: {
              type: "string"
            },
            maintainers: {
              type: "string[]"
            },
            name: {
              required: true,
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            },
            parent_team_id: {
              type: "integer"
            },
            permission: {
              enum: ["pull", "push", "admin"],
              type: "string"
            },
            privacy: {
              enum: ["secret", "closed"],
              type: "string"
            },
            repo_names: {
              type: "string[]"
            }
          },
          url: "/orgs/:org/teams"
        },
        createDiscussion: {
          deprecated: "octokit.teams.createDiscussion() has been renamed to octokit.teams.createDiscussionLegacy() (2020-01-16)",
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            private: {
              type: "boolean"
            },
            team_id: {
              required: true,
              type: "integer"
            },
            title: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/discussions"
        },
        createDiscussionComment: {
          deprecated: "octokit.teams.createDiscussionComment() has been renamed to octokit.teams.createDiscussionCommentLegacy() (2020-01-16)",
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments"
        },
        createDiscussionCommentInOrg: {
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments"
        },
        createDiscussionCommentLegacy: {
          deprecated: "octokit.teams.createDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#create-a-comment-legacy",
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments"
        },
        createDiscussionInOrg: {
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            },
            private: {
              type: "boolean"
            },
            team_slug: {
              required: true,
              type: "string"
            },
            title: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions"
        },
        createDiscussionLegacy: {
          deprecated: "octokit.teams.createDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#create-a-discussion-legacy",
          method: "POST",
          params: {
            body: {
              required: true,
              type: "string"
            },
            private: {
              type: "boolean"
            },
            team_id: {
              required: true,
              type: "integer"
            },
            title: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/discussions"
        },
        delete: {
          deprecated: "octokit.teams.delete() has been renamed to octokit.teams.deleteLegacy() (2020-01-16)",
          method: "DELETE",
          params: {
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id"
        },
        deleteDiscussion: {
          deprecated: "octokit.teams.deleteDiscussion() has been renamed to octokit.teams.deleteDiscussionLegacy() (2020-01-16)",
          method: "DELETE",
          params: {
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number"
        },
        deleteDiscussionComment: {
          deprecated: "octokit.teams.deleteDiscussionComment() has been renamed to octokit.teams.deleteDiscussionCommentLegacy() (2020-01-16)",
          method: "DELETE",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
        },
        deleteDiscussionCommentInOrg: {
          method: "DELETE",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number"
        },
        deleteDiscussionCommentLegacy: {
          deprecated: "octokit.teams.deleteDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#delete-a-comment-legacy",
          method: "DELETE",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
        },
        deleteDiscussionInOrg: {
          method: "DELETE",
          params: {
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number"
        },
        deleteDiscussionLegacy: {
          deprecated: "octokit.teams.deleteDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#delete-a-discussion-legacy",
          method: "DELETE",
          params: {
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number"
        },
        deleteInOrg: {
          method: "DELETE",
          params: {
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug"
        },
        deleteLegacy: {
          deprecated: "octokit.teams.deleteLegacy() is deprecated, see https://developer.github.com/v3/teams/#delete-team-legacy",
          method: "DELETE",
          params: {
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id"
        },
        get: {
          deprecated: "octokit.teams.get() has been renamed to octokit.teams.getLegacy() (2020-01-16)",
          method: "GET",
          params: {
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id"
        },
        getByName: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug"
        },
        getDiscussion: {
          deprecated: "octokit.teams.getDiscussion() has been renamed to octokit.teams.getDiscussionLegacy() (2020-01-16)",
          method: "GET",
          params: {
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number"
        },
        getDiscussionComment: {
          deprecated: "octokit.teams.getDiscussionComment() has been renamed to octokit.teams.getDiscussionCommentLegacy() (2020-01-16)",
          method: "GET",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
        },
        getDiscussionCommentInOrg: {
          method: "GET",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number"
        },
        getDiscussionCommentLegacy: {
          deprecated: "octokit.teams.getDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#get-a-single-comment-legacy",
          method: "GET",
          params: {
            comment_number: {
              required: true,
              type: "integer"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
        },
        getDiscussionInOrg: {
          method: "GET",
          params: {
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number"
        },
        getDiscussionLegacy: {
          deprecated: "octokit.teams.getDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#get-a-single-discussion-legacy",
          method: "GET",
          params: {
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number"
        },
        getLegacy: {
          deprecated: "octokit.teams.getLegacy() is deprecated, see https://developer.github.com/v3/teams/#get-team-legacy",
          method: "GET",
          params: {
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id"
        },
        getMember: {
          deprecated: "octokit.teams.getMember() has been renamed to octokit.teams.getMemberLegacy() (2020-01-16)",
          method: "GET",
          params: {
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/members/:username"
        },
        getMemberLegacy: {
          deprecated: "octokit.teams.getMemberLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#get-team-member-legacy",
          method: "GET",
          params: {
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/members/:username"
        },
        getMembership: {
          deprecated: "octokit.teams.getMembership() has been renamed to octokit.teams.getMembershipLegacy() (2020-01-16)",
          method: "GET",
          params: {
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/memberships/:username"
        },
        getMembershipInOrg: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/memberships/:username"
        },
        getMembershipLegacy: {
          deprecated: "octokit.teams.getMembershipLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#get-team-membership-legacy",
          method: "GET",
          params: {
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/memberships/:username"
        },
        list: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/orgs/:org/teams"
        },
        listChild: {
          deprecated: "octokit.teams.listChild() has been renamed to octokit.teams.listChildLegacy() (2020-01-16)",
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/teams"
        },
        listChildInOrg: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/teams"
        },
        listChildLegacy: {
          deprecated: "octokit.teams.listChildLegacy() is deprecated, see https://developer.github.com/v3/teams/#list-child-teams-legacy",
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/teams"
        },
        listDiscussionComments: {
          deprecated: "octokit.teams.listDiscussionComments() has been renamed to octokit.teams.listDiscussionCommentsLegacy() (2020-01-16)",
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments"
        },
        listDiscussionCommentsInOrg: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments"
        },
        listDiscussionCommentsLegacy: {
          deprecated: "octokit.teams.listDiscussionCommentsLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#list-comments-legacy",
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments"
        },
        listDiscussions: {
          deprecated: "octokit.teams.listDiscussions() has been renamed to octokit.teams.listDiscussionsLegacy() (2020-01-16)",
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions"
        },
        listDiscussionsInOrg: {
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions"
        },
        listDiscussionsLegacy: {
          deprecated: "octokit.teams.listDiscussionsLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#list-discussions-legacy",
          method: "GET",
          params: {
            direction: {
              enum: ["asc", "desc"],
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions"
        },
        listForAuthenticatedUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/teams"
        },
        listMembers: {
          deprecated: "octokit.teams.listMembers() has been renamed to octokit.teams.listMembersLegacy() (2020-01-16)",
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            role: {
              enum: ["member", "maintainer", "all"],
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/members"
        },
        listMembersInOrg: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            role: {
              enum: ["member", "maintainer", "all"],
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/members"
        },
        listMembersLegacy: {
          deprecated: "octokit.teams.listMembersLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#list-team-members-legacy",
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            role: {
              enum: ["member", "maintainer", "all"],
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/members"
        },
        listPendingInvitations: {
          deprecated: "octokit.teams.listPendingInvitations() has been renamed to octokit.teams.listPendingInvitationsLegacy() (2020-01-16)",
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/invitations"
        },
        listPendingInvitationsInOrg: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/invitations"
        },
        listPendingInvitationsLegacy: {
          deprecated: "octokit.teams.listPendingInvitationsLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#list-pending-team-invitations-legacy",
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/invitations"
        },
        listProjects: {
          deprecated: "octokit.teams.listProjects() has been renamed to octokit.teams.listProjectsLegacy() (2020-01-16)",
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/projects"
        },
        listProjectsInOrg: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/projects"
        },
        listProjectsLegacy: {
          deprecated: "octokit.teams.listProjectsLegacy() is deprecated, see https://developer.github.com/v3/teams/#list-team-projects-legacy",
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/projects"
        },
        listRepos: {
          deprecated: "octokit.teams.listRepos() has been renamed to octokit.teams.listReposLegacy() (2020-01-16)",
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/repos"
        },
        listReposInOrg: {
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/repos"
        },
        listReposLegacy: {
          deprecated: "octokit.teams.listReposLegacy() is deprecated, see https://developer.github.com/v3/teams/#list-team-repos-legacy",
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/repos"
        },
        removeMember: {
          deprecated: "octokit.teams.removeMember() has been renamed to octokit.teams.removeMemberLegacy() (2020-01-16)",
          method: "DELETE",
          params: {
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/members/:username"
        },
        removeMemberLegacy: {
          deprecated: "octokit.teams.removeMemberLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#remove-team-member-legacy",
          method: "DELETE",
          params: {
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/members/:username"
        },
        removeMembership: {
          deprecated: "octokit.teams.removeMembership() has been renamed to octokit.teams.removeMembershipLegacy() (2020-01-16)",
          method: "DELETE",
          params: {
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/memberships/:username"
        },
        removeMembershipInOrg: {
          method: "DELETE",
          params: {
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/memberships/:username"
        },
        removeMembershipLegacy: {
          deprecated: "octokit.teams.removeMembershipLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#remove-team-membership-legacy",
          method: "DELETE",
          params: {
            team_id: {
              required: true,
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/teams/:team_id/memberships/:username"
        },
        removeProject: {
          deprecated: "octokit.teams.removeProject() has been renamed to octokit.teams.removeProjectLegacy() (2020-01-16)",
          method: "DELETE",
          params: {
            project_id: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/projects/:project_id"
        },
        removeProjectInOrg: {
          method: "DELETE",
          params: {
            org: {
              required: true,
              type: "string"
            },
            project_id: {
              required: true,
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/projects/:project_id"
        },
        removeProjectLegacy: {
          deprecated: "octokit.teams.removeProjectLegacy() is deprecated, see https://developer.github.com/v3/teams/#remove-team-project-legacy",
          method: "DELETE",
          params: {
            project_id: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/projects/:project_id"
        },
        removeRepo: {
          deprecated: "octokit.teams.removeRepo() has been renamed to octokit.teams.removeRepoLegacy() (2020-01-16)",
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/repos/:owner/:repo"
        },
        removeRepoInOrg: {
          method: "DELETE",
          params: {
            org: {
              required: true,
              type: "string"
            },
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/repos/:owner/:repo"
        },
        removeRepoLegacy: {
          deprecated: "octokit.teams.removeRepoLegacy() is deprecated, see https://developer.github.com/v3/teams/#remove-team-repository-legacy",
          method: "DELETE",
          params: {
            owner: {
              required: true,
              type: "string"
            },
            repo: {
              required: true,
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/repos/:owner/:repo"
        },
        reviewProject: {
          deprecated: "octokit.teams.reviewProject() has been renamed to octokit.teams.reviewProjectLegacy() (2020-01-16)",
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            project_id: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/projects/:project_id"
        },
        reviewProjectInOrg: {
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            org: {
              required: true,
              type: "string"
            },
            project_id: {
              required: true,
              type: "integer"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/projects/:project_id"
        },
        reviewProjectLegacy: {
          deprecated: "octokit.teams.reviewProjectLegacy() is deprecated, see https://developer.github.com/v3/teams/#review-a-team-project-legacy",
          headers: {
            accept: "application/vnd.github.inertia-preview+json"
          },
          method: "GET",
          params: {
            project_id: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/projects/:project_id"
        },
        update: {
          deprecated: "octokit.teams.update() has been renamed to octokit.teams.updateLegacy() (2020-01-16)",
          method: "PATCH",
          params: {
            description: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            parent_team_id: {
              type: "integer"
            },
            permission: {
              enum: ["pull", "push", "admin"],
              type: "string"
            },
            privacy: {
              enum: ["secret", "closed"],
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id"
        },
        updateDiscussion: {
          deprecated: "octokit.teams.updateDiscussion() has been renamed to octokit.teams.updateDiscussionLegacy() (2020-01-16)",
          method: "PATCH",
          params: {
            body: {
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            },
            title: {
              type: "string"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number"
        },
        updateDiscussionComment: {
          deprecated: "octokit.teams.updateDiscussionComment() has been renamed to octokit.teams.updateDiscussionCommentLegacy() (2020-01-16)",
          method: "PATCH",
          params: {
            body: {
              required: true,
              type: "string"
            },
            comment_number: {
              required: true,
              type: "integer"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
        },
        updateDiscussionCommentInOrg: {
          method: "PATCH",
          params: {
            body: {
              required: true,
              type: "string"
            },
            comment_number: {
              required: true,
              type: "integer"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number"
        },
        updateDiscussionCommentLegacy: {
          deprecated: "octokit.teams.updateDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#edit-a-comment-legacy",
          method: "PATCH",
          params: {
            body: {
              required: true,
              type: "string"
            },
            comment_number: {
              required: true,
              type: "integer"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
        },
        updateDiscussionInOrg: {
          method: "PATCH",
          params: {
            body: {
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            org: {
              required: true,
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            },
            title: {
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number"
        },
        updateDiscussionLegacy: {
          deprecated: "octokit.teams.updateDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#edit-a-discussion-legacy",
          method: "PATCH",
          params: {
            body: {
              type: "string"
            },
            discussion_number: {
              required: true,
              type: "integer"
            },
            team_id: {
              required: true,
              type: "integer"
            },
            title: {
              type: "string"
            }
          },
          url: "/teams/:team_id/discussions/:discussion_number"
        },
        updateInOrg: {
          method: "PATCH",
          params: {
            description: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            org: {
              required: true,
              type: "string"
            },
            parent_team_id: {
              type: "integer"
            },
            permission: {
              enum: ["pull", "push", "admin"],
              type: "string"
            },
            privacy: {
              enum: ["secret", "closed"],
              type: "string"
            },
            team_slug: {
              required: true,
              type: "string"
            }
          },
          url: "/orgs/:org/teams/:team_slug"
        },
        updateLegacy: {
          deprecated: "octokit.teams.updateLegacy() is deprecated, see https://developer.github.com/v3/teams/#edit-team-legacy",
          method: "PATCH",
          params: {
            description: {
              type: "string"
            },
            name: {
              required: true,
              type: "string"
            },
            parent_team_id: {
              type: "integer"
            },
            permission: {
              enum: ["pull", "push", "admin"],
              type: "string"
            },
            privacy: {
              enum: ["secret", "closed"],
              type: "string"
            },
            team_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/teams/:team_id"
        }
      },
      users: {
        addEmails: {
          method: "POST",
          params: {
            emails: {
              required: true,
              type: "string[]"
            }
          },
          url: "/user/emails"
        },
        block: {
          method: "PUT",
          params: {
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/user/blocks/:username"
        },
        checkBlocked: {
          method: "GET",
          params: {
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/user/blocks/:username"
        },
        checkFollowing: {
          method: "GET",
          params: {
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/user/following/:username"
        },
        checkFollowingForUser: {
          method: "GET",
          params: {
            target_user: {
              required: true,
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/following/:target_user"
        },
        createGpgKey: {
          method: "POST",
          params: {
            armored_public_key: {
              type: "string"
            }
          },
          url: "/user/gpg_keys"
        },
        createPublicKey: {
          method: "POST",
          params: {
            key: {
              type: "string"
            },
            title: {
              type: "string"
            }
          },
          url: "/user/keys"
        },
        deleteEmails: {
          method: "DELETE",
          params: {
            emails: {
              required: true,
              type: "string[]"
            }
          },
          url: "/user/emails"
        },
        deleteGpgKey: {
          method: "DELETE",
          params: {
            gpg_key_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/gpg_keys/:gpg_key_id"
        },
        deletePublicKey: {
          method: "DELETE",
          params: {
            key_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/keys/:key_id"
        },
        follow: {
          method: "PUT",
          params: {
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/user/following/:username"
        },
        getAuthenticated: {
          method: "GET",
          params: {},
          url: "/user"
        },
        getByUsername: {
          method: "GET",
          params: {
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username"
        },
        getContextForUser: {
          method: "GET",
          params: {
            subject_id: {
              type: "string"
            },
            subject_type: {
              enum: ["organization", "repository", "issue", "pull_request"],
              type: "string"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/hovercard"
        },
        getGpgKey: {
          method: "GET",
          params: {
            gpg_key_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/gpg_keys/:gpg_key_id"
        },
        getPublicKey: {
          method: "GET",
          params: {
            key_id: {
              required: true,
              type: "integer"
            }
          },
          url: "/user/keys/:key_id"
        },
        list: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            since: {
              type: "string"
            }
          },
          url: "/users"
        },
        listBlocked: {
          method: "GET",
          params: {},
          url: "/user/blocks"
        },
        listEmails: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/emails"
        },
        listFollowersForAuthenticatedUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/followers"
        },
        listFollowersForUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/followers"
        },
        listFollowingForAuthenticatedUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/following"
        },
        listFollowingForUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/following"
        },
        listGpgKeys: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/gpg_keys"
        },
        listGpgKeysForUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/gpg_keys"
        },
        listPublicEmails: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/public_emails"
        },
        listPublicKeys: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            }
          },
          url: "/user/keys"
        },
        listPublicKeysForUser: {
          method: "GET",
          params: {
            page: {
              type: "integer"
            },
            per_page: {
              type: "integer"
            },
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/users/:username/keys"
        },
        togglePrimaryEmailVisibility: {
          method: "PATCH",
          params: {
            email: {
              required: true,
              type: "string"
            },
            visibility: {
              required: true,
              type: "string"
            }
          },
          url: "/user/email/visibility"
        },
        unblock: {
          method: "DELETE",
          params: {
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/user/blocks/:username"
        },
        unfollow: {
          method: "DELETE",
          params: {
            username: {
              required: true,
              type: "string"
            }
          },
          url: "/user/following/:username"
        },
        updateAuthenticated: {
          method: "PATCH",
          params: {
            bio: {
              type: "string"
            },
            blog: {
              type: "string"
            },
            company: {
              type: "string"
            },
            email: {
              type: "string"
            },
            hireable: {
              type: "boolean"
            },
            location: {
              type: "string"
            },
            name: {
              type: "string"
            }
          },
          url: "/user"
        }
      }
    };
    var VERSION = "2.4.0";
    function registerEndpoints(octokit, routes) {
      Object.keys(routes).forEach((namespaceName) => {
        if (!octokit[namespaceName]) {
          octokit[namespaceName] = {};
        }
        Object.keys(routes[namespaceName]).forEach((apiName) => {
          const apiOptions = routes[namespaceName][apiName];
          const endpointDefaults = ["method", "url", "headers"].reduce((map, key) => {
            if (typeof apiOptions[key] !== "undefined") {
              map[key] = apiOptions[key];
            }
            return map;
          }, {});
          endpointDefaults.request = {
            validate: apiOptions.params
          };
          let request = octokit.request.defaults(endpointDefaults);
          const hasDeprecatedParam = Object.keys(apiOptions.params || {}).find((key) => apiOptions.params[key].deprecated);
          if (hasDeprecatedParam) {
            const patch = patchForDeprecation.bind(null, octokit, apiOptions);
            request = patch(octokit.request.defaults(endpointDefaults), `.${namespaceName}.${apiName}()`);
            request.endpoint = patch(request.endpoint, `.${namespaceName}.${apiName}.endpoint()`);
            request.endpoint.merge = patch(request.endpoint.merge, `.${namespaceName}.${apiName}.endpoint.merge()`);
          }
          if (apiOptions.deprecated) {
            octokit[namespaceName][apiName] = Object.assign(function deprecatedEndpointMethod() {
              octokit.log.warn(new deprecation.Deprecation(`[@octokit/rest] ${apiOptions.deprecated}`));
              octokit[namespaceName][apiName] = request;
              return request.apply(null, arguments);
            }, request);
            return;
          }
          octokit[namespaceName][apiName] = request;
        });
      });
    }
    function patchForDeprecation(octokit, apiOptions, method, methodName) {
      const patchedMethod = (options) => {
        options = Object.assign({}, options);
        Object.keys(options).forEach((key) => {
          if (apiOptions.params[key] && apiOptions.params[key].deprecated) {
            const aliasKey = apiOptions.params[key].alias;
            octokit.log.warn(new deprecation.Deprecation(`[@octokit/rest] "${key}" parameter is deprecated for "${methodName}". Use "${aliasKey}" instead`));
            if (!(aliasKey in options)) {
              options[aliasKey] = options[key];
            }
            delete options[key];
          }
        });
        return method(options);
      };
      Object.keys(method).forEach((key) => {
        patchedMethod[key] = method[key];
      });
      return patchedMethod;
    }
    function restEndpointMethods(octokit) {
      octokit.registerEndpoints = registerEndpoints.bind(null, octokit);
      registerEndpoints(octokit, endpointsByScope);
      [["gitdata", "git"], ["authorization", "oauthAuthorizations"], ["pullRequests", "pulls"]].forEach(([deprecatedScope, scope]) => {
        Object.defineProperty(octokit, deprecatedScope, {
          get() {
            octokit.log.warn(
              // @ts-ignore
              new deprecation.Deprecation(`[@octokit/plugin-rest-endpoint-methods] "octokit.${deprecatedScope}.*" methods are deprecated, use "octokit.${scope}.*" instead`)
            );
            return octokit[scope];
          }
        });
      });
      return {};
    }
    restEndpointMethods.VERSION = VERSION;
    exports2.restEndpointMethods = restEndpointMethods;
  }
});

// node_modules/.pnpm/before-after-hook@2.1.0/node_modules/before-after-hook/lib/register.js
var require_register = __commonJS({
  "node_modules/.pnpm/before-after-hook@2.1.0/node_modules/before-after-hook/lib/register.js"(exports2, module2) {
    module2.exports = register;
    function register(state, name, method, options) {
      if (typeof method !== "function") {
        throw new Error("method for before hook must be a function");
      }
      if (!options) {
        options = {};
      }
      if (Array.isArray(name)) {
        return name.reverse().reduce(function(callback, name2) {
          return register.bind(null, state, name2, callback, options);
        }, method)();
      }
      return Promise.resolve().then(function() {
        if (!state.registry[name]) {
          return method(options);
        }
        return state.registry[name].reduce(function(method2, registered) {
          return registered.hook.bind(null, method2, options);
        }, method)();
      });
    }
  }
});

// node_modules/.pnpm/before-after-hook@2.1.0/node_modules/before-after-hook/lib/add.js
var require_add = __commonJS({
  "node_modules/.pnpm/before-after-hook@2.1.0/node_modules/before-after-hook/lib/add.js"(exports2, module2) {
    module2.exports = addHook;
    function addHook(state, kind, name, hook) {
      var orig = hook;
      if (!state.registry[name]) {
        state.registry[name] = [];
      }
      if (kind === "before") {
        hook = function(method, options) {
          return Promise.resolve().then(orig.bind(null, options)).then(method.bind(null, options));
        };
      }
      if (kind === "after") {
        hook = function(method, options) {
          var result;
          return Promise.resolve().then(method.bind(null, options)).then(function(result_) {
            result = result_;
            return orig(result, options);
          }).then(function() {
            return result;
          });
        };
      }
      if (kind === "error") {
        hook = function(method, options) {
          return Promise.resolve().then(method.bind(null, options)).catch(function(error) {
            return orig(error, options);
          });
        };
      }
      state.registry[name].push({
        hook,
        orig
      });
    }
  }
});

// node_modules/.pnpm/before-after-hook@2.1.0/node_modules/before-after-hook/lib/remove.js
var require_remove = __commonJS({
  "node_modules/.pnpm/before-after-hook@2.1.0/node_modules/before-after-hook/lib/remove.js"(exports2, module2) {
    module2.exports = removeHook;
    function removeHook(state, name, method) {
      if (!state.registry[name]) {
        return;
      }
      var index = state.registry[name].map(function(registered) {
        return registered.orig;
      }).indexOf(method);
      if (index === -1) {
        return;
      }
      state.registry[name].splice(index, 1);
    }
  }
});

// node_modules/.pnpm/before-after-hook@2.1.0/node_modules/before-after-hook/index.js
var require_before_after_hook = __commonJS({
  "node_modules/.pnpm/before-after-hook@2.1.0/node_modules/before-after-hook/index.js"(exports2, module2) {
    var register = require_register();
    var addHook = require_add();
    var removeHook = require_remove();
    var bind = Function.bind;
    var bindable = bind.bind(bind);
    function bindApi(hook, state, name) {
      var removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state]);
      hook.api = { remove: removeHookRef };
      hook.remove = removeHookRef;
      ["before", "error", "after", "wrap"].forEach(function(kind) {
        var args = name ? [state, kind, name] : [state, kind];
        hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args);
      });
    }
    function HookSingular() {
      var singularHookName = "h";
      var singularHookState = {
        registry: {}
      };
      var singularHook = register.bind(null, singularHookState, singularHookName);
      bindApi(singularHook, singularHookState, singularHookName);
      return singularHook;
    }
    function HookCollection() {
      var state = {
        registry: {}
      };
      var hook = register.bind(null, state);
      bindApi(hook, state);
      return hook;
    }
    var collectionHookDeprecationMessageDisplayed = false;
    function Hook() {
      if (!collectionHookDeprecationMessageDisplayed) {
        console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4');
        collectionHookDeprecationMessageDisplayed = true;
      }
      return HookCollection();
    }
    Hook.Singular = HookSingular.bind();
    Hook.Collection = HookCollection.bind();
    module2.exports = Hook;
    module2.exports.Hook = Hook;
    module2.exports.Singular = Hook.Singular;
    module2.exports.Collection = Hook.Collection;
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/package.json"(exports2, module2) {
    module2.exports = {
      name: "@octokit/rest",
      version: "16.43.1",
      publishConfig: {
        access: "public"
      },
      description: "GitHub REST API client for Node.js",
      keywords: [
        "octokit",
        "github",
        "rest",
        "api-client"
      ],
      author: "Gregor Martynus (https://github.com/gr2m)",
      contributors: [
        {
          name: "Mike de Boer",
          email: "info@mikedeboer.nl"
        },
        {
          name: "Fabian Jakobs",
          email: "fabian@c9.io"
        },
        {
          name: "Joe Gallo",
          email: "joe@brassafrax.com"
        },
        {
          name: "Gregor Martynus",
          url: "https://github.com/gr2m"
        }
      ],
      repository: "https://github.com/octokit/rest.js",
      dependencies: {
        "@octokit/auth-token": "^2.4.0",
        "@octokit/plugin-paginate-rest": "^1.1.1",
        "@octokit/plugin-request-log": "^1.0.0",
        "@octokit/plugin-rest-endpoint-methods": "2.4.0",
        "@octokit/request": "^5.2.0",
        "@octokit/request-error": "^1.0.2",
        "atob-lite": "^2.0.0",
        "before-after-hook": "^2.0.0",
        "btoa-lite": "^1.0.0",
        deprecation: "^2.0.0",
        "lodash.get": "^4.4.2",
        "lodash.set": "^4.3.2",
        "lodash.uniq": "^4.5.0",
        "octokit-pagination-methods": "^1.1.0",
        once: "^1.4.0",
        "universal-user-agent": "^4.0.0"
      },
      devDependencies: {
        "@gimenete/type-writer": "^0.1.3",
        "@octokit/auth": "^1.1.1",
        "@octokit/fixtures-server": "^5.0.6",
        "@octokit/graphql": "^4.2.0",
        "@types/node": "^13.1.0",
        bundlesize: "^0.18.0",
        chai: "^4.1.2",
        "compression-webpack-plugin": "^3.1.0",
        cypress: "^3.0.0",
        glob: "^7.1.2",
        "http-proxy-agent": "^4.0.0",
        "lodash.camelcase": "^4.3.0",
        "lodash.merge": "^4.6.1",
        "lodash.upperfirst": "^4.3.1",
        lolex: "^5.1.2",
        mkdirp: "^1.0.0",
        mocha: "^7.0.1",
        mustache: "^4.0.0",
        nock: "^11.3.3",
        "npm-run-all": "^4.1.2",
        nyc: "^15.0.0",
        prettier: "^1.14.2",
        proxy: "^1.0.0",
        "semantic-release": "^17.0.0",
        sinon: "^8.0.0",
        "sinon-chai": "^3.0.0",
        "sort-keys": "^4.0.0",
        "string-to-arraybuffer": "^1.0.0",
        "string-to-jsdoc-comment": "^1.0.0",
        typescript: "^3.3.1",
        webpack: "^4.0.0",
        "webpack-bundle-analyzer": "^3.0.0",
        "webpack-cli": "^3.0.0"
      },
      types: "index.d.ts",
      scripts: {
        coverage: "nyc report --reporter=html && open coverage/index.html",
        lint: "prettier --check '{lib,plugins,scripts,test}/**/*.{js,json,ts}' 'docs/*.{js,json}' 'docs/src/**/*' index.js README.md package.json",
        "lint:fix": "prettier --write '{lib,plugins,scripts,test}/**/*.{js,json,ts}' 'docs/*.{js,json}' 'docs/src/**/*' index.js README.md package.json",
        pretest: "npm run -s lint",
        test: 'nyc mocha test/mocha-node-setup.js "test/*/**/*-test.js"',
        "test:browser": "cypress run --browser chrome",
        build: "npm-run-all build:*",
        "build:ts": "npm run -s update-endpoints:typescript",
        "prebuild:browser": "mkdirp dist/",
        "build:browser": "npm-run-all build:browser:*",
        "build:browser:development": "webpack --mode development --entry . --output-library=Octokit --output=./dist/octokit-rest.js --profile --json > dist/bundle-stats.json",
        "build:browser:production": "webpack --mode production --entry . --plugin=compression-webpack-plugin --output-library=Octokit --output-path=./dist --output-filename=octokit-rest.min.js --devtool source-map",
        "generate-bundle-report": "webpack-bundle-analyzer dist/bundle-stats.json --mode=static --no-open --report dist/bundle-report.html",
        "update-endpoints": "npm-run-all update-endpoints:*",
        "update-endpoints:fetch-json": "node scripts/update-endpoints/fetch-json",
        "update-endpoints:typescript": "node scripts/update-endpoints/typescript",
        "prevalidate:ts": "npm run -s build:ts",
        "validate:ts": "tsc --target es6 --noImplicitAny index.d.ts",
        "postvalidate:ts": "tsc --noEmit --target es6 test/typescript-validate.ts",
        "start-fixtures-server": "octokit-fixtures-server"
      },
      license: "MIT",
      files: [
        "index.js",
        "index.d.ts",
        "lib",
        "plugins"
      ],
      nyc: {
        ignore: [
          "test"
        ]
      },
      release: {
        publish: [
          "@semantic-release/npm",
          {
            path: "@semantic-release/github",
            assets: [
              "dist/*",
              "!dist/*.map.gz"
            ]
          }
        ]
      },
      bundlesize: [
        {
          path: "./dist/octokit-rest.min.js.gz",
          maxSize: "33 kB"
        }
      ]
    };
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/lib/parse-client-options.js
var require_parse_client_options = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/lib/parse-client-options.js"(exports2, module2) {
    module2.exports = parseOptions;
    var { Deprecation } = require_dist_node3();
    var { getUserAgent } = require_dist_node6();
    var once = require_once();
    var pkg = require_package();
    var deprecateOptionsTimeout = once(
      (log, deprecation) => log.warn(deprecation)
    );
    var deprecateOptionsAgent = once((log, deprecation) => log.warn(deprecation));
    var deprecateOptionsHeaders = once(
      (log, deprecation) => log.warn(deprecation)
    );
    function parseOptions(options, log, hook) {
      if (options.headers) {
        options.headers = Object.keys(options.headers).reduce((newObj, key) => {
          newObj[key.toLowerCase()] = options.headers[key];
          return newObj;
        }, {});
      }
      const clientDefaults = {
        headers: options.headers || {},
        request: options.request || {},
        mediaType: {
          previews: [],
          format: ""
        }
      };
      if (options.baseUrl) {
        clientDefaults.baseUrl = options.baseUrl;
      }
      if (options.userAgent) {
        clientDefaults.headers["user-agent"] = options.userAgent;
      }
      if (options.previews) {
        clientDefaults.mediaType.previews = options.previews;
      }
      if (options.timeZone) {
        clientDefaults.headers["time-zone"] = options.timeZone;
      }
      if (options.timeout) {
        deprecateOptionsTimeout(
          log,
          new Deprecation(
            "[@octokit/rest] new Octokit({timeout}) is deprecated. Use {request: {timeout}} instead. See https://github.com/octokit/request.js#request"
          )
        );
        clientDefaults.request.timeout = options.timeout;
      }
      if (options.agent) {
        deprecateOptionsAgent(
          log,
          new Deprecation(
            "[@octokit/rest] new Octokit({agent}) is deprecated. Use {request: {agent}} instead. See https://github.com/octokit/request.js#request"
          )
        );
        clientDefaults.request.agent = options.agent;
      }
      if (options.headers) {
        deprecateOptionsHeaders(
          log,
          new Deprecation(
            "[@octokit/rest] new Octokit({headers}) is deprecated. Use {userAgent, previews} instead. See https://github.com/octokit/request.js#request"
          )
        );
      }
      const userAgentOption = clientDefaults.headers["user-agent"];
      const defaultUserAgent = `octokit.js/${pkg.version} ${getUserAgent()}`;
      clientDefaults.headers["user-agent"] = [userAgentOption, defaultUserAgent].filter(Boolean).join(" ");
      clientDefaults.request.hook = hook.bind(null, "request");
      return clientDefaults;
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/lib/constructor.js
var require_constructor = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/lib/constructor.js"(exports2, module2) {
    module2.exports = Octokit;
    var { request } = require_dist_node5();
    var Hook = require_before_after_hook();
    var parseClientOptions = require_parse_client_options();
    function Octokit(plugins, options) {
      options = options || {};
      const hook = new Hook.Collection();
      const log = Object.assign(
        {
          debug: () => {
          },
          info: () => {
          },
          warn: console.warn,
          error: console.error
        },
        options && options.log
      );
      const api = {
        hook,
        log,
        request: request.defaults(parseClientOptions(options, log, hook))
      };
      plugins.forEach((pluginFunction) => pluginFunction(api, options));
      return api;
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/lib/register-plugin.js
var require_register_plugin = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/lib/register-plugin.js"(exports2, module2) {
    module2.exports = registerPlugin;
    var factory = require_factory();
    function registerPlugin(plugins, pluginFunction) {
      return factory(
        plugins.includes(pluginFunction) ? plugins : plugins.concat(pluginFunction)
      );
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/lib/factory.js
var require_factory = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/lib/factory.js"(exports2, module2) {
    module2.exports = factory;
    var Octokit = require_constructor();
    var registerPlugin = require_register_plugin();
    function factory(plugins) {
      const Api = Octokit.bind(null, plugins || []);
      Api.plugin = registerPlugin.bind(null, plugins || []);
      return Api;
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/lib/core.js
var require_core2 = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/lib/core.js"(exports2, module2) {
    var factory = require_factory();
    module2.exports = factory();
  }
});

// node_modules/.pnpm/@octokit+auth-token@2.4.0/node_modules/@octokit/auth-token/dist-node/index.js
var require_dist_node10 = __commonJS({
  "node_modules/.pnpm/@octokit+auth-token@2.4.0/node_modules/@octokit/auth-token/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    async function auth(token) {
      const tokenType = token.split(/\./).length === 3 ? "app" : /^v\d+\./.test(token) ? "installation" : "oauth";
      return {
        type: "token",
        token,
        tokenType
      };
    }
    function withAuthorizationPrefix(token) {
      if (token.split(/\./).length === 3) {
        return `bearer ${token}`;
      }
      return `token ${token}`;
    }
    async function hook(token, request, route, parameters) {
      const endpoint = request.endpoint.merge(route, parameters);
      endpoint.headers.authorization = withAuthorizationPrefix(token);
      return request(endpoint);
    }
    var createTokenAuth = function createTokenAuth2(token) {
      if (!token) {
        throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
      }
      if (typeof token !== "string") {
        throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
      }
      token = token.replace(/^(token|bearer) +/i, "");
      return Object.assign(auth.bind(null, token), {
        hook: hook.bind(null, token)
      });
    };
    exports2.createTokenAuth = createTokenAuth;
  }
});

// node_modules/.pnpm/btoa-lite@1.0.0/node_modules/btoa-lite/btoa-node.js
var require_btoa_node = __commonJS({
  "node_modules/.pnpm/btoa-lite@1.0.0/node_modules/btoa-lite/btoa-node.js"(exports2, module2) {
    module2.exports = function btoa(str) {
      return new Buffer(str).toString("base64");
    };
  }
});

// node_modules/.pnpm/atob-lite@2.0.0/node_modules/atob-lite/atob-node.js
var require_atob_node = __commonJS({
  "node_modules/.pnpm/atob-lite@2.0.0/node_modules/atob-lite/atob-node.js"(exports2, module2) {
    module2.exports = function atob(str) {
      return Buffer.from(str, "base64").toString("binary");
    };
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication/with-authorization-prefix.js
var require_with_authorization_prefix = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication/with-authorization-prefix.js"(exports2, module2) {
    module2.exports = withAuthorizationPrefix;
    var atob = require_atob_node();
    var REGEX_IS_BASIC_AUTH = /^[\w-]+:/;
    function withAuthorizationPrefix(authorization) {
      if (/^(basic|bearer|token) /i.test(authorization)) {
        return authorization;
      }
      try {
        if (REGEX_IS_BASIC_AUTH.test(atob(authorization))) {
          return `basic ${authorization}`;
        }
      } catch (error) {
      }
      if (authorization.split(/\./).length === 3) {
        return `bearer ${authorization}`;
      }
      return `token ${authorization}`;
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication/before-request.js
var require_before_request = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication/before-request.js"(exports2, module2) {
    module2.exports = authenticationBeforeRequest;
    var btoa = require_btoa_node();
    var withAuthorizationPrefix = require_with_authorization_prefix();
    function authenticationBeforeRequest(state, options) {
      if (typeof state.auth === "string") {
        options.headers.authorization = withAuthorizationPrefix(state.auth);
        return;
      }
      if (state.auth.username) {
        const hash = btoa(`${state.auth.username}:${state.auth.password}`);
        options.headers.authorization = `Basic ${hash}`;
        if (state.otp) {
          options.headers["x-github-otp"] = state.otp;
        }
        return;
      }
      if (state.auth.clientId) {
        if (/\/applications\/:?[\w_]+\/tokens\/:?[\w_]+($|\?)/.test(options.url)) {
          const hash = btoa(`${state.auth.clientId}:${state.auth.clientSecret}`);
          options.headers.authorization = `Basic ${hash}`;
          return;
        }
        options.url += options.url.indexOf("?") === -1 ? "?" : "&";
        options.url += `client_id=${state.auth.clientId}&client_secret=${state.auth.clientSecret}`;
        return;
      }
      return Promise.resolve().then(() => {
        return state.auth();
      }).then((authorization) => {
        options.headers.authorization = withAuthorizationPrefix(authorization);
      });
    }
  }
});

// node_modules/.pnpm/@octokit+request-error@1.2.1/node_modules/@octokit/request-error/dist-node/index.js
var require_dist_node11 = __commonJS({
  "node_modules/.pnpm/@octokit+request-error@1.2.1/node_modules/@octokit/request-error/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var deprecation = require_dist_node3();
    var once = _interopDefault(require_once());
    var logOnce = once((deprecation2) => console.warn(deprecation2));
    var RequestError = class extends Error {
      constructor(message, statusCode, options) {
        super(message);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "HttpError";
        this.status = statusCode;
        Object.defineProperty(this, "code", {
          get() {
            logOnce(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
            return statusCode;
          }
        });
        this.headers = options.headers || {};
        const requestCopy = Object.assign({}, options.request);
        if (options.request.headers.authorization) {
          requestCopy.headers = Object.assign({}, options.request.headers, {
            authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
          });
        }
        requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
        this.request = requestCopy;
      }
    };
    exports2.RequestError = RequestError;
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication/request-error.js
var require_request_error = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication/request-error.js"(exports2, module2) {
    module2.exports = authenticationRequestError;
    var { RequestError } = require_dist_node11();
    function authenticationRequestError(state, error, options) {
      if (!error.headers) throw error;
      const otpRequired = /required/.test(error.headers["x-github-otp"] || "");
      if (error.status !== 401 || !otpRequired) {
        throw error;
      }
      if (error.status === 401 && otpRequired && error.request && error.request.headers["x-github-otp"]) {
        if (state.otp) {
          delete state.otp;
        } else {
          throw new RequestError(
            "Invalid one-time password for two-factor authentication",
            401,
            {
              headers: error.headers,
              request: options
            }
          );
        }
      }
      if (typeof state.auth.on2fa !== "function") {
        throw new RequestError(
          "2FA required, but options.on2fa is not a function. See https://github.com/octokit/rest.js#authentication",
          401,
          {
            headers: error.headers,
            request: options
          }
        );
      }
      return Promise.resolve().then(() => {
        return state.auth.on2fa();
      }).then((oneTimePassword) => {
        const newOptions = Object.assign(options, {
          headers: Object.assign(options.headers, {
            "x-github-otp": oneTimePassword
          })
        });
        return state.octokit.request(newOptions).then((response) => {
          state.otp = oneTimePassword;
          return response;
        });
      });
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication/validate.js
var require_validate = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication/validate.js"(exports2, module2) {
    module2.exports = validateAuth;
    function validateAuth(auth) {
      if (typeof auth === "string") {
        return;
      }
      if (typeof auth === "function") {
        return;
      }
      if (auth.username && auth.password) {
        return;
      }
      if (auth.clientId && auth.clientSecret) {
        return;
      }
      throw new Error(`Invalid "auth" option: ${JSON.stringify(auth)}`);
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication/index.js
var require_authentication = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication/index.js"(exports2, module2) {
    module2.exports = authenticationPlugin;
    var { createTokenAuth } = require_dist_node10();
    var { Deprecation } = require_dist_node3();
    var once = require_once();
    var beforeRequest = require_before_request();
    var requestError = require_request_error();
    var validate = require_validate();
    var withAuthorizationPrefix = require_with_authorization_prefix();
    var deprecateAuthBasic = once((log, deprecation) => log.warn(deprecation));
    var deprecateAuthObject = once((log, deprecation) => log.warn(deprecation));
    function authenticationPlugin(octokit, options) {
      if (options.authStrategy) {
        const auth = options.authStrategy(options.auth);
        octokit.hook.wrap("request", auth.hook);
        octokit.auth = auth;
        return;
      }
      if (!options.auth) {
        octokit.auth = () => Promise.resolve({
          type: "unauthenticated"
        });
        return;
      }
      const isBasicAuthString = typeof options.auth === "string" && /^basic/.test(withAuthorizationPrefix(options.auth));
      if (typeof options.auth === "string" && !isBasicAuthString) {
        const auth = createTokenAuth(options.auth);
        octokit.hook.wrap("request", auth.hook);
        octokit.auth = auth;
        return;
      }
      const [deprecationMethod, deprecationMessapge] = isBasicAuthString ? [
        deprecateAuthBasic,
        'Setting the "new Octokit({ auth })" option to a Basic Auth string is deprecated. Use https://github.com/octokit/auth-basic.js instead. See (https://octokit.github.io/rest.js/#authentication)'
      ] : [
        deprecateAuthObject,
        'Setting the "new Octokit({ auth })" option to an object without also setting the "authStrategy" option is deprecated and will be removed in v17. See (https://octokit.github.io/rest.js/#authentication)'
      ];
      deprecationMethod(
        octokit.log,
        new Deprecation("[@octokit/rest] " + deprecationMessapge)
      );
      octokit.auth = () => Promise.resolve({
        type: "deprecated",
        message: deprecationMessapge
      });
      validate(options.auth);
      const state = {
        octokit,
        auth: options.auth
      };
      octokit.hook.before("request", beforeRequest.bind(null, state));
      octokit.hook.error("request", requestError.bind(null, state));
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication-deprecated/authenticate.js
var require_authenticate = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication-deprecated/authenticate.js"(exports2, module2) {
    module2.exports = authenticate;
    var { Deprecation } = require_dist_node3();
    var once = require_once();
    var deprecateAuthenticate = once((log, deprecation) => log.warn(deprecation));
    function authenticate(state, options) {
      deprecateAuthenticate(
        state.octokit.log,
        new Deprecation(
          '[@octokit/rest] octokit.authenticate() is deprecated. Use "auth" constructor option instead.'
        )
      );
      if (!options) {
        state.auth = false;
        return;
      }
      switch (options.type) {
        case "basic":
          if (!options.username || !options.password) {
            throw new Error(
              "Basic authentication requires both a username and password to be set"
            );
          }
          break;
        case "oauth":
          if (!options.token && !(options.key && options.secret)) {
            throw new Error(
              "OAuth2 authentication requires a token or key & secret to be set"
            );
          }
          break;
        case "token":
        case "app":
          if (!options.token) {
            throw new Error("Token authentication requires a token to be set");
          }
          break;
        default:
          throw new Error(
            "Invalid authentication type, must be 'basic', 'oauth', 'token' or 'app'"
          );
      }
      state.auth = options;
    }
  }
});

// node_modules/.pnpm/lodash.uniq@4.5.0/node_modules/lodash.uniq/index.js
var require_lodash = __commonJS({
  "node_modules/.pnpm/lodash.uniq@4.5.0/node_modules/lodash.uniq/index.js"(exports2, module2) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var INFINITY = 1 / 0;
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    function arrayIncludes(array, value) {
      var length = array ? array.length : 0;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
      var index = -1, length = array ? array.length : 0;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var splice = arrayProto.splice;
    var Map2 = getNative(root, "Map");
    var Set = getNative(root, "Set");
    var nativeCreate = getNative(Object, "create");
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index = -1, length = values ? values.length : 0;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseUniq(array, iteratee, comparator) {
      var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      } else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache();
      } else {
        seen = iteratee ? [] : result;
      }
      outer:
        while (++index < length) {
          var value = array[index], computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var seenIndex = seen.length;
            while (seenIndex--) {
              if (seen[seenIndex] === computed) {
                continue outer;
              }
            }
            if (iteratee) {
              seen.push(computed);
            }
            result.push(value);
          } else if (!includes(seen, computed, comparator)) {
            if (seen !== result) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
      return result;
    }
    var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values) {
      return new Set(values);
    };
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function uniq(array) {
      return array && array.length ? baseUniq(array) : [];
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function noop() {
    }
    module2.exports = uniq;
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication-deprecated/before-request.js
var require_before_request2 = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication-deprecated/before-request.js"(exports2, module2) {
    module2.exports = authenticationBeforeRequest;
    var btoa = require_btoa_node();
    var uniq = require_lodash();
    function authenticationBeforeRequest(state, options) {
      if (!state.auth.type) {
        return;
      }
      if (state.auth.type === "basic") {
        const hash = btoa(`${state.auth.username}:${state.auth.password}`);
        options.headers.authorization = `Basic ${hash}`;
        return;
      }
      if (state.auth.type === "token") {
        options.headers.authorization = `token ${state.auth.token}`;
        return;
      }
      if (state.auth.type === "app") {
        options.headers.authorization = `Bearer ${state.auth.token}`;
        const acceptHeaders = options.headers.accept.split(",").concat("application/vnd.github.machine-man-preview+json");
        options.headers.accept = uniq(acceptHeaders).filter(Boolean).join(",");
        return;
      }
      options.url += options.url.indexOf("?") === -1 ? "?" : "&";
      if (state.auth.token) {
        options.url += `access_token=${encodeURIComponent(state.auth.token)}`;
        return;
      }
      const key = encodeURIComponent(state.auth.key);
      const secret = encodeURIComponent(state.auth.secret);
      options.url += `client_id=${key}&client_secret=${secret}`;
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication-deprecated/request-error.js
var require_request_error2 = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication-deprecated/request-error.js"(exports2, module2) {
    module2.exports = authenticationRequestError;
    var { RequestError } = require_dist_node11();
    function authenticationRequestError(state, error, options) {
      if (!error.headers) throw error;
      const otpRequired = /required/.test(error.headers["x-github-otp"] || "");
      if (error.status !== 401 || !otpRequired) {
        throw error;
      }
      if (error.status === 401 && otpRequired && error.request && error.request.headers["x-github-otp"]) {
        throw new RequestError(
          "Invalid one-time password for two-factor authentication",
          401,
          {
            headers: error.headers,
            request: options
          }
        );
      }
      if (typeof state.auth.on2fa !== "function") {
        throw new RequestError(
          "2FA required, but options.on2fa is not a function. See https://github.com/octokit/rest.js#authentication",
          401,
          {
            headers: error.headers,
            request: options
          }
        );
      }
      return Promise.resolve().then(() => {
        return state.auth.on2fa();
      }).then((oneTimePassword) => {
        const newOptions = Object.assign(options, {
          headers: Object.assign(
            { "x-github-otp": oneTimePassword },
            options.headers
          )
        });
        return state.octokit.request(newOptions);
      });
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication-deprecated/index.js
var require_authentication_deprecated = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/authentication-deprecated/index.js"(exports2, module2) {
    module2.exports = authenticationPlugin;
    var { Deprecation } = require_dist_node3();
    var once = require_once();
    var deprecateAuthenticate = once((log, deprecation) => log.warn(deprecation));
    var authenticate = require_authenticate();
    var beforeRequest = require_before_request2();
    var requestError = require_request_error2();
    function authenticationPlugin(octokit, options) {
      if (options.auth) {
        octokit.authenticate = () => {
          deprecateAuthenticate(
            octokit.log,
            new Deprecation(
              '[@octokit/rest] octokit.authenticate() is deprecated and has no effect when "auth" option is set on Octokit constructor'
            )
          );
        };
        return;
      }
      const state = {
        octokit,
        auth: false
      };
      octokit.authenticate = authenticate.bind(null, state);
      octokit.hook.before("request", beforeRequest.bind(null, state));
      octokit.hook.error("request", requestError.bind(null, state));
    }
  }
});

// node_modules/.pnpm/@octokit+plugin-paginate-rest@1.1.2/node_modules/@octokit/plugin-paginate-rest/dist-node/index.js
var require_dist_node12 = __commonJS({
  "node_modules/.pnpm/@octokit+plugin-paginate-rest@1.1.2/node_modules/@octokit/plugin-paginate-rest/dist-node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var VERSION = "1.1.2";
    var REGEX = [/^\/search\//, /^\/repos\/[^/]+\/[^/]+\/commits\/[^/]+\/(check-runs|check-suites)([^/]|$)/, /^\/installation\/repositories([^/]|$)/, /^\/user\/installations([^/]|$)/, /^\/repos\/[^/]+\/[^/]+\/actions\/secrets([^/]|$)/, /^\/repos\/[^/]+\/[^/]+\/actions\/workflows(\/[^/]+\/runs)?([^/]|$)/, /^\/repos\/[^/]+\/[^/]+\/actions\/runs(\/[^/]+\/(artifacts|jobs))?([^/]|$)/];
    function normalizePaginatedListResponse(octokit, url, response) {
      const path = url.replace(octokit.request.endpoint.DEFAULTS.baseUrl, "");
      const responseNeedsNormalization = REGEX.find((regex) => regex.test(path));
      if (!responseNeedsNormalization) return;
      const incompleteResults = response.data.incomplete_results;
      const repositorySelection = response.data.repository_selection;
      const totalCount = response.data.total_count;
      delete response.data.incomplete_results;
      delete response.data.repository_selection;
      delete response.data.total_count;
      const namespaceKey = Object.keys(response.data)[0];
      const data = response.data[namespaceKey];
      response.data = data;
      if (typeof incompleteResults !== "undefined") {
        response.data.incomplete_results = incompleteResults;
      }
      if (typeof repositorySelection !== "undefined") {
        response.data.repository_selection = repositorySelection;
      }
      response.data.total_count = totalCount;
      Object.defineProperty(response.data, namespaceKey, {
        get() {
          octokit.log.warn(`[@octokit/paginate-rest] "response.data.${namespaceKey}" is deprecated for "GET ${path}". Get the results directly from "response.data"`);
          return Array.from(data);
        }
      });
    }
    function iterator(octokit, route, parameters) {
      const options = octokit.request.endpoint(route, parameters);
      const method = options.method;
      const headers = options.headers;
      let url = options.url;
      return {
        [Symbol.asyncIterator]: () => ({
          next() {
            if (!url) {
              return Promise.resolve({
                done: true
              });
            }
            return octokit.request({
              method,
              url,
              headers
            }).then((response) => {
              normalizePaginatedListResponse(octokit, url, response);
              url = ((response.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) || [])[1];
              return {
                value: response
              };
            });
          }
        })
      };
    }
    function paginate(octokit, route, parameters, mapFn) {
      if (typeof parameters === "function") {
        mapFn = parameters;
        parameters = void 0;
      }
      return gather(octokit, [], iterator(octokit, route, parameters)[Symbol.asyncIterator](), mapFn);
    }
    function gather(octokit, results, iterator2, mapFn) {
      return iterator2.next().then((result) => {
        if (result.done) {
          return results;
        }
        let earlyExit = false;
        function done() {
          earlyExit = true;
        }
        results = results.concat(mapFn ? mapFn(result.value, done) : result.value.data);
        if (earlyExit) {
          return results;
        }
        return gather(octokit, results, iterator2, mapFn);
      });
    }
    function paginateRest(octokit) {
      return {
        paginate: Object.assign(paginate.bind(null, octokit), {
          iterator: iterator.bind(null, octokit)
        })
      };
    }
    paginateRest.VERSION = VERSION;
    exports2.paginateRest = paginateRest;
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/pagination/index.js
var require_pagination = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/pagination/index.js"(exports2, module2) {
    module2.exports = paginatePlugin;
    var { paginateRest } = require_dist_node12();
    function paginatePlugin(octokit) {
      Object.assign(octokit, paginateRest(octokit));
    }
  }
});

// node_modules/.pnpm/lodash.get@4.4.2/node_modules/lodash.get/index.js
var require_lodash2 = __commonJS({
  "node_modules/.pnpm/lodash.get@4.4.2/node_modules/lodash.get/index.js"(exports2, module2) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var INFINITY = 1 / 0;
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var symbolTag = "[object Symbol]";
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    var reLeadingDot = /^\./;
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reEscapeChar = /\\(\\)?/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Symbol2 = root.Symbol;
    var splice = arrayProto.splice;
    var Map2 = getNative(root, "Map");
    var nativeCreate = getNative(Object, "create");
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    var stringToPath = memoize(function(string) {
      string = toString(string);
      var result = [];
      if (reLeadingDot.test(string)) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, string2) {
        result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArray = Array.isArray;
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    function get(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module2.exports = get;
  }
});

// node_modules/.pnpm/lodash.set@4.3.2/node_modules/lodash.set/index.js
var require_lodash3 = __commonJS({
  "node_modules/.pnpm/lodash.set@4.3.2/node_modules/lodash.set/index.js"(exports2, module2) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var symbolTag = "[object Symbol]";
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    var reLeadingDot = /^\./;
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reEscapeChar = /\\(\\)?/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Symbol2 = root.Symbol;
    var splice = arrayProto.splice;
    var Map2 = getNative(root, "Map");
    var nativeCreate = getNative(Object, "create");
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        object[key] = value;
      }
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = isKey(path, object) ? [path] : castPath(path);
      var index = -1, length = path.length, lastIndex = length - 1, nested = object;
      while (nested != null && ++index < length) {
        var key = toKey(path[index]), newValue = value;
        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : void 0;
          if (newValue === void 0) {
            newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    var stringToPath = memoize(function(string) {
      string = toString(string);
      var result = [];
      if (reLeadingDot.test(string)) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, string2) {
        result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArray = Array.isArray;
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }
    module2.exports = set;
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/validate/validate.js
var require_validate2 = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/validate/validate.js"(exports2, module2) {
    "use strict";
    module2.exports = validate;
    var { RequestError } = require_dist_node11();
    var get = require_lodash2();
    var set = require_lodash3();
    function validate(octokit, options) {
      if (!options.request.validate) {
        return;
      }
      const { validate: params } = options.request;
      Object.keys(params).forEach((parameterName) => {
        const parameter = get(params, parameterName);
        const expectedType = parameter.type;
        let parentParameterName;
        let parentValue;
        let parentParamIsPresent = true;
        let parentParameterIsArray = false;
        if (/\./.test(parameterName)) {
          parentParameterName = parameterName.replace(/\.[^.]+$/, "");
          parentParameterIsArray = parentParameterName.slice(-2) === "[]";
          if (parentParameterIsArray) {
            parentParameterName = parentParameterName.slice(0, -2);
          }
          parentValue = get(options, parentParameterName);
          parentParamIsPresent = parentParameterName === "headers" || typeof parentValue === "object" && parentValue !== null;
        }
        const values = parentParameterIsArray ? (get(options, parentParameterName) || []).map(
          (value) => value[parameterName.split(/\./).pop()]
        ) : [get(options, parameterName)];
        values.forEach((value, i) => {
          const valueIsPresent = typeof value !== "undefined";
          const valueIsNull = value === null;
          const currentParameterName = parentParameterIsArray ? parameterName.replace(/\[\]/, `[${i}]`) : parameterName;
          if (!parameter.required && !valueIsPresent) {
            return;
          }
          if (!parentParamIsPresent) {
            return;
          }
          if (parameter.allowNull && valueIsNull) {
            return;
          }
          if (!parameter.allowNull && valueIsNull) {
            throw new RequestError(
              `'${currentParameterName}' cannot be null`,
              400,
              {
                request: options
              }
            );
          }
          if (parameter.required && !valueIsPresent) {
            throw new RequestError(
              `Empty value for parameter '${currentParameterName}': ${JSON.stringify(
                value
              )}`,
              400,
              {
                request: options
              }
            );
          }
          if (expectedType === "integer") {
            const unparsedValue = value;
            value = parseInt(value, 10);
            if (isNaN(value)) {
              throw new RequestError(
                `Invalid value for parameter '${currentParameterName}': ${JSON.stringify(
                  unparsedValue
                )} is NaN`,
                400,
                {
                  request: options
                }
              );
            }
          }
          if (parameter.enum && parameter.enum.indexOf(String(value)) === -1) {
            throw new RequestError(
              `Invalid value for parameter '${currentParameterName}': ${JSON.stringify(
                value
              )}`,
              400,
              {
                request: options
              }
            );
          }
          if (parameter.validation) {
            const regex = new RegExp(parameter.validation);
            if (!regex.test(value)) {
              throw new RequestError(
                `Invalid value for parameter '${currentParameterName}': ${JSON.stringify(
                  value
                )}`,
                400,
                {
                  request: options
                }
              );
            }
          }
          if (expectedType === "object" && typeof value === "string") {
            try {
              value = JSON.parse(value);
            } catch (exception) {
              throw new RequestError(
                `JSON parse error of value for parameter '${currentParameterName}': ${JSON.stringify(
                  value
                )}`,
                400,
                {
                  request: options
                }
              );
            }
          }
          set(options, parameter.mapTo || currentParameterName, value);
        });
      });
      return options;
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/validate/index.js
var require_validate3 = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/plugins/validate/index.js"(exports2, module2) {
    module2.exports = octokitValidate;
    var validate = require_validate2();
    function octokitValidate(octokit) {
      octokit.hook.before("request", validate.bind(null, octokit));
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/deprecate.js
var require_deprecate = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/deprecate.js"(exports2, module2) {
    module2.exports = deprecate;
    var loggedMessages = {};
    function deprecate(message) {
      if (loggedMessages[message]) {
        return;
      }
      console.warn(`DEPRECATED (@octokit/rest): ${message}`);
      loggedMessages[message] = 1;
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-page-links.js
var require_get_page_links = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-page-links.js"(exports2, module2) {
    module2.exports = getPageLinks;
    function getPageLinks(link) {
      link = link.link || link.headers.link || "";
      const links = {};
      link.replace(/<([^>]*)>;\s*rel="([\w]*)"/g, (m, uri, type) => {
        links[type] = uri;
      });
      return links;
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/http-error.js
var require_http_error = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/http-error.js"(exports2, module2) {
    module2.exports = class HttpError extends Error {
      constructor(message, code, headers) {
        super(message);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "HttpError";
        this.code = code;
        this.headers = headers;
      }
    };
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-page.js
var require_get_page = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-page.js"(exports2, module2) {
    module2.exports = getPage;
    var deprecate = require_deprecate();
    var getPageLinks = require_get_page_links();
    var HttpError = require_http_error();
    function getPage(octokit, link, which, headers) {
      deprecate(`octokit.get${which.charAt(0).toUpperCase() + which.slice(1)}Page() \u2013 You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`);
      const url = getPageLinks(link)[which];
      if (!url) {
        const urlError = new HttpError(`No ${which} page found`, 404);
        return Promise.reject(urlError);
      }
      const requestOptions = {
        url,
        headers: applyAcceptHeader(link, headers)
      };
      const promise = octokit.request(requestOptions);
      return promise;
    }
    function applyAcceptHeader(res, headers) {
      const previous = res.headers && res.headers["x-github-media-type"];
      if (!previous || headers && headers.accept) {
        return headers;
      }
      headers = headers || {};
      headers.accept = "application/vnd." + previous.replace("; param=", ".").replace("; format=", "+");
      return headers;
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-first-page.js
var require_get_first_page = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-first-page.js"(exports2, module2) {
    module2.exports = getFirstPage;
    var getPage = require_get_page();
    function getFirstPage(octokit, link, headers) {
      return getPage(octokit, link, "first", headers);
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-last-page.js
var require_get_last_page = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-last-page.js"(exports2, module2) {
    module2.exports = getLastPage;
    var getPage = require_get_page();
    function getLastPage(octokit, link, headers) {
      return getPage(octokit, link, "last", headers);
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-next-page.js
var require_get_next_page = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-next-page.js"(exports2, module2) {
    module2.exports = getNextPage;
    var getPage = require_get_page();
    function getNextPage(octokit, link, headers) {
      return getPage(octokit, link, "next", headers);
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-previous-page.js
var require_get_previous_page = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/get-previous-page.js"(exports2, module2) {
    module2.exports = getPreviousPage;
    var getPage = require_get_page();
    function getPreviousPage(octokit, link, headers) {
      return getPage(octokit, link, "prev", headers);
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/has-first-page.js
var require_has_first_page = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/has-first-page.js"(exports2, module2) {
    module2.exports = hasFirstPage;
    var deprecate = require_deprecate();
    var getPageLinks = require_get_page_links();
    function hasFirstPage(link) {
      deprecate(`octokit.hasFirstPage() \u2013 You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`);
      return getPageLinks(link).first;
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/has-last-page.js
var require_has_last_page = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/has-last-page.js"(exports2, module2) {
    module2.exports = hasLastPage;
    var deprecate = require_deprecate();
    var getPageLinks = require_get_page_links();
    function hasLastPage(link) {
      deprecate(`octokit.hasLastPage() \u2013 You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`);
      return getPageLinks(link).last;
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/has-next-page.js
var require_has_next_page = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/has-next-page.js"(exports2, module2) {
    module2.exports = hasNextPage;
    var deprecate = require_deprecate();
    var getPageLinks = require_get_page_links();
    function hasNextPage(link) {
      deprecate(`octokit.hasNextPage() \u2013 You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`);
      return getPageLinks(link).next;
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/has-previous-page.js
var require_has_previous_page = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/lib/has-previous-page.js"(exports2, module2) {
    module2.exports = hasPreviousPage;
    var deprecate = require_deprecate();
    var getPageLinks = require_get_page_links();
    function hasPreviousPage(link) {
      deprecate(`octokit.hasPreviousPage() \u2013 You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`);
      return getPageLinks(link).prev;
    }
  }
});

// node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/index.js
var require_octokit_pagination_methods = __commonJS({
  "node_modules/.pnpm/octokit-pagination-methods@1.1.0/node_modules/octokit-pagination-methods/index.js"(exports2, module2) {
    module2.exports = paginationMethodsPlugin;
    function paginationMethodsPlugin(octokit) {
      octokit.getFirstPage = require_get_first_page().bind(null, octokit);
      octokit.getLastPage = require_get_last_page().bind(null, octokit);
      octokit.getNextPage = require_get_next_page().bind(null, octokit);
      octokit.getPreviousPage = require_get_previous_page().bind(null, octokit);
      octokit.hasFirstPage = require_has_first_page();
      octokit.hasLastPage = require_has_last_page();
      octokit.hasNextPage = require_has_next_page();
      octokit.hasPreviousPage = require_has_previous_page();
    }
  }
});

// node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/index.js
var require_rest = __commonJS({
  "node_modules/.pnpm/@octokit+rest@16.43.1/node_modules/@octokit/rest/index.js"(exports2, module2) {
    var { requestLog } = require_dist_node8();
    var {
      restEndpointMethods
    } = require_dist_node9();
    var Core = require_core2();
    var CORE_PLUGINS = [
      require_authentication(),
      require_authentication_deprecated(),
      // deprecated: remove in v17
      requestLog,
      require_pagination(),
      restEndpointMethods,
      require_validate3(),
      require_octokit_pagination_methods()
      // deprecated: remove in v17
    ];
    var OctokitRest = Core.plugin(CORE_PLUGINS);
    function DeprecatedOctokit(options) {
      const warn = options && options.log && options.log.warn ? options.log.warn : console.warn;
      warn(
        '[@octokit/rest] `const Octokit = require("@octokit/rest")` is deprecated. Use `const { Octokit } = require("@octokit/rest")` instead'
      );
      return new OctokitRest(options);
    }
    var Octokit = Object.assign(DeprecatedOctokit, {
      Octokit: OctokitRest
    });
    Object.keys(OctokitRest).forEach((key) => {
      if (OctokitRest.hasOwnProperty(key)) {
        Octokit[key] = OctokitRest[key];
      }
    });
    module2.exports = Octokit;
  }
});

// node_modules/.pnpm/@actions+github@2.1.1/node_modules/@actions/github/lib/context.js
var require_context = __commonJS({
  "node_modules/.pnpm/@actions+github@2.1.1/node_modules/@actions/github/lib/context.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs_1 = require("fs");
    var os_1 = require("os");
    var Context = class {
      /**
       * Hydrate the context from the environment
       */
      constructor() {
        this.payload = {};
        if (process.env.GITHUB_EVENT_PATH) {
          if (fs_1.existsSync(process.env.GITHUB_EVENT_PATH)) {
            this.payload = JSON.parse(fs_1.readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: "utf8" }));
          } else {
            const path = process.env.GITHUB_EVENT_PATH;
            process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
          }
        }
        this.eventName = process.env.GITHUB_EVENT_NAME;
        this.sha = process.env.GITHUB_SHA;
        this.ref = process.env.GITHUB_REF;
        this.workflow = process.env.GITHUB_WORKFLOW;
        this.action = process.env.GITHUB_ACTION;
        this.actor = process.env.GITHUB_ACTOR;
      }
      get issue() {
        const payload = this.payload;
        return Object.assign(Object.assign({}, this.repo), { number: (payload.issue || payload.pull_request || payload).number });
      }
      get repo() {
        if (process.env.GITHUB_REPOSITORY) {
          const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
          return { owner, repo };
        }
        if (this.payload.repository) {
          return {
            owner: this.payload.repository.owner.login,
            repo: this.payload.repository.name
          };
        }
        throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
      }
    };
    exports2.Context = Context;
  }
});

// node_modules/.pnpm/@actions+http-client@1.0.8/node_modules/@actions/http-client/proxy.js
var require_proxy = __commonJS({
  "node_modules/.pnpm/@actions+http-client@1.0.8/node_modules/@actions/http-client/proxy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var url = require("url");
    function getProxyUrl(reqUrl) {
      let usingSsl = reqUrl.protocol === "https:";
      let proxyUrl;
      if (checkBypass(reqUrl)) {
        return proxyUrl;
      }
      let proxyVar;
      if (usingSsl) {
        proxyVar = process.env["https_proxy"] || process.env["HTTPS_PROXY"];
      } else {
        proxyVar = process.env["http_proxy"] || process.env["HTTP_PROXY"];
      }
      if (proxyVar) {
        proxyUrl = url.parse(proxyVar);
      }
      return proxyUrl;
    }
    exports2.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      let noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      let upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (let upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports2.checkBypass = checkBypass;
  }
});

// node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/lib/tunnel.js"(exports2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports2.httpOverHttp = httpOverHttp;
    exports2.httpsOverHttp = httpsOverHttp;
    exports2.httpOverHttps = httpOverHttps;
    exports2.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self2 = this;
      self2.options = options || {};
      self2.proxyOptions = self2.options.proxy || {};
      self2.maxSockets = self2.options.maxSockets || http.Agent.defaultMaxSockets;
      self2.requests = [];
      self2.sockets = [];
      self2.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self2.requests.length; i < len; ++i) {
          var pending = self2.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self2.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self2.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self2 = this;
      var options = mergeOptions({ request: req }, self2.options, toOptions(host, port, localAddress));
      if (self2.sockets.length >= this.maxSockets) {
        self2.requests.push(options);
        return;
      }
      self2.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self2.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self2.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self2 = this;
      var placeholder = {};
      self2.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self2.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug("making CONNECT request");
      var connectReq = self2.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug(
            "tunneling socket could not be established, statusCode=%d",
            res.statusCode
          );
          socket.destroy();
          var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self2.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self2.removeSocket(placeholder);
          return;
        }
        debug("tunneling connection has established");
        self2.sockets[self2.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug(
          "tunneling socket could not be established, cause=%s\n",
          cause.message,
          cause.stack
        );
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self2.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self2 = this;
      TunnelingAgent.prototype.createSocket.call(self2, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self2.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self2.sockets[self2.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports2.debug = debug;
  }
});

// node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/index.js"(exports2, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/.pnpm/@actions+http-client@1.0.8/node_modules/@actions/http-client/index.js
var require_http_client = __commonJS({
  "node_modules/.pnpm/@actions+http-client@1.0.8/node_modules/@actions/http-client/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var url = require("url");
    var http = require("http");
    var https = require("https");
    var pm = require_proxy();
    var tunnel;
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports2.Headers || (exports2.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports2.MediaTypes || (exports2.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      let proxyUrl = pm.getProxyUrl(url.parse(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports2.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return new Promise(async (resolve, reject) => {
          let output = Buffer.alloc(0);
          this.message.on("data", (chunk) => {
            output = Buffer.concat([output, chunk]);
          });
          this.message.on("end", () => {
            resolve(output.toString());
          });
        });
      }
    };
    exports2.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      let parsedUrl = url.parse(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports2.isHttps = isHttps;
    var HttpClient = class _HttpClient {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
      }
      get(requestUrl, additionalHeaders) {
        return this.request("GET", requestUrl, null, additionalHeaders || {});
      }
      del(requestUrl, additionalHeaders) {
        return this.request("DELETE", requestUrl, null, additionalHeaders || {});
      }
      post(requestUrl, data, additionalHeaders) {
        return this.request("POST", requestUrl, data, additionalHeaders || {});
      }
      patch(requestUrl, data, additionalHeaders) {
        return this.request("PATCH", requestUrl, data, additionalHeaders || {});
      }
      put(requestUrl, data, additionalHeaders) {
        return this.request("PUT", requestUrl, data, additionalHeaders || {});
      }
      head(requestUrl, additionalHeaders) {
        return this.request("HEAD", requestUrl, null, additionalHeaders || {});
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
      }
      /**
       * Gets a typed object from an endpoint
       * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
       */
      async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      /**
       * Makes a raw http request.
       * All other methods such as get, post, patch, and request ultimately call this.
       * Prefer get, del, post and patch
       */
      async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
          throw new Error("Client has already been disposed.");
        }
        let parsedUrl = url.parse(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
          response = await this.requestRaw(info, data);
          if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
            let authenticationHandler;
            for (let i = 0; i < this.handlers.length; i++) {
              if (this.handlers[i].canHandleAuthentication(response)) {
                authenticationHandler = this.handlers[i];
                break;
              }
            }
            if (authenticationHandler) {
              return authenticationHandler.handleAuthentication(this, info, data);
            } else {
              return response;
            }
          }
          let redirectsRemaining = this._maxRedirects;
          while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
            const redirectUrl = response.message.headers["location"];
            if (!redirectUrl) {
              break;
            }
            let parsedRedirectUrl = url.parse(redirectUrl);
            if (parsedUrl.protocol == "https:" && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
              throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
            }
            await response.readBody();
            if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
              for (let header in headers) {
                if (header.toLowerCase() === "authorization") {
                  delete headers[header];
                }
              }
            }
            info = this._prepareRequest(verb, parsedRedirectUrl, headers);
            response = await this.requestRaw(info, data);
            redirectsRemaining--;
          }
          if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
            return response;
          }
          numTries += 1;
          if (numTries < maxTries) {
            await response.readBody();
            await this._performExponentialBackoff(numTries);
          }
        }
        return response;
      }
      /**
       * Needs to be called if keepAlive is set to true in request options.
       */
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      /**
       * Raw request.
       * @param info
       * @param data
       */
      requestRaw(info, data) {
        return new Promise((resolve, reject) => {
          let callbackForResult = function(err, res) {
            if (err) {
              reject(err);
            }
            resolve(res);
          };
          this.requestRawWithCallback(info, data, callbackForResult);
        });
      }
      /**
       * Raw request with callback.
       * @param info
       * @param data
       * @param onResult
       */
      requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === "string") {
          info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        };
        let req = info.httpModule.request(info.options, (msg) => {
          let res = new HttpClientResponse(msg);
          handleResult(null, res);
        });
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error("Request timeout: " + info.options.path), null);
        });
        req.on("error", function(err) {
          handleResult(err, null);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      /**
       * Gets an http agent. This function is useful when you need an http agent that handles
       * routing through a proxy server - depending upon the url and proxy environment variables.
       * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
       */
      getAgent(serverUrl) {
        let parsedUrl = url.parse(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          this.handlers.forEach((handler) => {
            handler.prepareRequest(info.options);
          });
        }
        return info;
      }
      _mergeHeaders(headers) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (!!agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (!!this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
          if (!tunnel) {
            tunnel = require_tunnel2();
          }
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: {
              proxyAuth: proxyUrl.auth,
              host: proxyUrl.hostname,
              port: proxyUrl.port
            }
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
      }
      static dateTimeDeserializer(key, value) {
        if (typeof value === "string") {
          let a = new Date(value);
          if (!isNaN(a.valueOf())) {
            return a;
          }
        }
        return value;
      }
      async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
          const statusCode = res.message.statusCode;
          const response = {
            statusCode,
            result: null,
            headers: {}
          };
          if (statusCode == HttpCodes.NotFound) {
            resolve(response);
          }
          let obj;
          let contents;
          try {
            contents = await res.readBody();
            if (contents && contents.length > 0) {
              if (options && options.deserializeDates) {
                obj = JSON.parse(contents, _HttpClient.dateTimeDeserializer);
              } else {
                obj = JSON.parse(contents);
              }
              response.result = obj;
            }
            response.headers = res.message.headers;
          } catch (err) {
          }
          if (statusCode > 299) {
            let msg;
            if (obj && obj.message) {
              msg = obj.message;
            } else if (contents && contents.length > 0) {
              msg = contents;
            } else {
              msg = "Failed request: (" + statusCode + ")";
            }
            let err = new Error(msg);
            err["statusCode"] = statusCode;
            if (response.result) {
              err["result"] = response.result;
            }
            reject(err);
          } else {
            resolve(response);
          }
        });
      }
    };
    exports2.HttpClient = HttpClient;
  }
});

// node_modules/.pnpm/@actions+github@2.1.1/node_modules/@actions/github/lib/github.js
var require_github = __commonJS({
  "node_modules/.pnpm/@actions+github@2.1.1/node_modules/@actions/github/lib/github.js"(exports2) {
    "use strict";
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var graphql_1 = require_dist_node7();
    var rest_1 = require_rest();
    var Context = __importStar(require_context());
    var httpClient = __importStar(require_http_client());
    rest_1.Octokit.prototype = new rest_1.Octokit();
    exports2.context = new Context.Context();
    var GitHub = class _GitHub extends rest_1.Octokit {
      constructor(token, opts) {
        super(_GitHub.getOctokitOptions(_GitHub.disambiguate(token, opts)));
        this.graphql = _GitHub.getGraphQL(_GitHub.disambiguate(token, opts));
      }
      /**
       * Disambiguates the constructor overload parameters
       */
      static disambiguate(token, opts) {
        return [
          typeof token === "string" ? token : "",
          typeof token === "object" ? token : opts || {}
        ];
      }
      static getOctokitOptions(args) {
        const token = args[0];
        const options = Object.assign({}, args[1]);
        const auth = _GitHub.getAuthString(token, options);
        if (auth) {
          options.auth = auth;
        }
        const agent = _GitHub.getProxyAgent(options);
        if (agent) {
          options.request = options.request ? Object.assign({}, options.request) : {};
          options.request.agent = agent;
        }
        return options;
      }
      static getGraphQL(args) {
        const defaults = {};
        const token = args[0];
        const options = args[1];
        const auth = this.getAuthString(token, options);
        if (auth) {
          defaults.headers = {
            authorization: auth
          };
        }
        const agent = _GitHub.getProxyAgent(options);
        if (agent) {
          defaults.request = { agent };
        }
        return graphql_1.graphql.defaults(defaults);
      }
      static getAuthString(token, options) {
        if (!token && !options.auth) {
          throw new Error("Parameter token or opts.auth is required");
        } else if (token && options.auth) {
          throw new Error("Parameters token and opts.auth may not both be specified");
        }
        return typeof options.auth === "string" ? options.auth : `token ${token}`;
      }
      static getProxyAgent(options) {
        var _a;
        if (!((_a = options.request) === null || _a === void 0 ? void 0 : _a.agent)) {
          const serverUrl = "https://api.github.com";
          if (httpClient.getProxyUrl(serverUrl)) {
            const hc = new httpClient.HttpClient();
            return hc.getAgent(serverUrl);
          }
        }
        return void 0;
      }
    };
    exports2.GitHub = GitHub;
  }
});

// node_modules/.pnpm/lodash@4.17.19/node_modules/lodash/lodash.js
var require_lodash4 = __commonJS({
  "node_modules/.pnpm/lodash@4.17.19/node_modules/lodash/lodash.js"(exports2, module2) {
    (function() {
      var undefined2;
      var VERSION = "4.17.19";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER2 = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrim = /^\s+|\s+$/g, reTrimStart = /^\s+/, reTrimEnd = /\s+$/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        // Latin Extended-A block.
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
      var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = (function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      })();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined2 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined2 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined2) {
            result = result === undefined2 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap(props, function(key) {
          return [key, object[key]];
        });
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? undefined2 : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER2) {
            array[index] = PLACEHOLDER2;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = (function runInContext2(context) {
        context = context == null ? root : _2.defaults(root.Object(), context, _2.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = (function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        })();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
        var defineProperty = (function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        })();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap && new WeakMap();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = /* @__PURE__ */ (function() {
          function object() {
          }
          return function(proto) {
            if (!isObject(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined2;
            return result2;
          };
        })();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined2;
        }
        lodash.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash
          }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined2 : result2;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined2;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          return index < 0 ? undefined2 : data[index][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined2;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index < length) {
            result2[index] = skip ? undefined2 : get(object, paths[index]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined2) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined2) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined2) {
            return result2;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined2 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined2 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined2, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined2 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction(object[key]);
          });
        }
        function baseGet(object, path) {
          path = castPath(path, object);
          var index = 0, length = path.length;
          while (object != null && index < length) {
            object = object[toKey(path[index++])];
          }
          return index && index == length ? object : undefined2;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined2 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path, args) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last(path))];
          return func == null ? undefined2 : apply(func, object, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined2 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get(object, path);
            return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
              if (newValue === undefined2) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
          var isCommon = newValue === undefined2;
          if (isCommon) {
            var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined2;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path) {
            return hasIn(object, path);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path = paths[index], value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path, value, customizer) {
          if (!isObject(object)) {
            return object;
          }
          path = castPath(path, object);
          var index = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key = toKey(path[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined2;
              if (newValue === undefined2) {
                newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
          var index = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path) {
          path = castPath(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey(last(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined2;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        function castPath(value, object) {
          if (isArray(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined2 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout2 = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
            if (newValue === undefined2) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined2 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined2,
                args,
                holders,
                undefined2,
                undefined2,
                arity - length
              );
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined2 && other === undefined2) {
              return defaultValue;
            }
            if (value !== undefined2) {
              result2 = value;
            }
            if (other !== undefined2) {
              if (result2 === undefined2) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined2 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined2;
            }
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined2, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values2) {
          return new Set(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined2;
          }
          ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined2 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined2;
          }
          var data = isBindKey ? undefined2 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined2, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject(objValue) && isObject(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined2 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined2) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined2, flatten), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map2, key) {
          var data = map2.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined2;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined2;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index = -1, length = path.length, result2 = false;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER2) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER2) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
          }
          return array;
        }
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined2, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined2 ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined2;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined2;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined2;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined2 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return array && array.length ? baseUniq(array, undefined2, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined2, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined2
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined2);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined2) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined2;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined2
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path, args) {
          var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined2 : orders;
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined2 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined2;
            }
            return result2;
          };
        }
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined2;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined2;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined2;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined2) {
              clearTimeout2(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined2;
          }
          function flush() {
            return timerId === undefined2 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined2) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout2(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined2) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined2 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          var result2 = customizer ? customizer(value, other) : undefined2;
          return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        function isFinite(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString(value) {
          return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined2;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = value.replace(reTrim, "");
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined2, customDefaultsMerge);
          return apply(mergeWith, undefined2, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get(object, path, defaultValue) {
          var result2 = object == null ? undefined2 : baseGet(object, path);
          return result2 === undefined2 ? defaultValue : result2;
        }
        function has(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined2;
          }
          while (++index < length) {
            var value = object == null ? undefined2 : object[toKey(path[index])];
            if (value === undefined2) {
              index = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined2) {
            upper = lower;
            lower = undefined2;
          }
          if (upper !== undefined2) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined2) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined2;
          }
          if (floating === undefined2) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined2;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined2;
            }
          }
          if (lower === undefined2 && upper === undefined2) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined2) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString(string).toLowerCase());
        }
        function deburr(string) {
          string = toString(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString(string), n);
        }
        function replace() {
          var args = arguments, string = toString(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined2;
          }
          limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined2;
          }
          string = toString(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString(value).toLowerCase();
        }
        function toUpper(value) {
          return toString(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrim, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrimEnd, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate2(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined2) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        function unescape(string) {
          string = toString(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString(string);
          pattern = guard ? undefined2 : pattern;
          if (pattern === undefined2) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined2, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path, args) {
          return function(object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined2 : baseGet(object, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n) {
            iteratee2(index);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
        }
        function mean(array) {
          return baseMean(array, identity);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN2;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt2;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext2;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate2;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin(lodash, (function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!hasOwnProperty.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        })(), { "chain": false });
        lodash.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined2) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined2
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      });
      var _2 = runInContext();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _2;
        define(function() {
          return _2;
        });
      } else if (freeModule) {
        (freeModule.exports = _2)._ = _2;
        freeExports._ = _2;
      } else {
        root._ = _2;
      }
    }).call(exports2);
  }
});

// node_modules/.pnpm/stjs@0.0.5/node_modules/stjs/st.js
var require_st = __commonJS({
  "node_modules/.pnpm/stjs@0.0.5/node_modules/stjs/st.js"(exports2, module2) {
    (function() {
      var $context = this;
      var root;
      var Helper = {
        is_template: function(str) {
          var re = /\{\{(.+)\}\}/g;
          return re.test(str);
        },
        is_array: function(item) {
          return Array.isArray(item) || !!item && typeof item === "object" && typeof item.length === "number" && (item.length === 0 || item.length > 0 && item.length - 1 in item);
        },
        resolve: function(o, path, new_val) {
          if (path && path.length > 0) {
            var func = Function("new_val", "with(this) {this" + path + "=new_val; return this;}").bind(o);
            return func(new_val);
          } else {
            o = new_val;
            return o;
          }
        }
      };
      var Conditional = {
        run: function(template, data) {
          for (var i = 0; i < template.length; i++) {
            var item = template[i];
            var keys = Object.keys(item);
            var key = keys[0];
            var func = TRANSFORM.tokenize(key);
            if (func.name === "#if" || func.name === "#elseif") {
              var expression = func.expression;
              var res = TRANSFORM.fillout(data, "{{" + expression + "}}");
              if (res === "{{" + expression + "}}") {
                return template;
              } else {
                if (res) {
                  return TRANSFORM.run(item[key], data);
                } else {
                }
              }
            } else {
              return TRANSFORM.run(item[key], data);
            }
          }
          return null;
        },
        is: function(template) {
          if (!Helper.is_array(template)) {
            return false;
          }
          if (template.length === 0) {
            return false;
          }
          var containsValidObjects = true;
          for (var i = 0; i < template.length; i++) {
            var item = template[0];
            if (typeof item !== "object") {
              containsValidObjects = false;
              break;
            }
            if (Object.keys(item).length !== 1) {
              containsValidObjects = false;
              break;
            }
          }
          if (!containsValidObjects) {
            return false;
          }
          var first = template[0];
          var func;
          for (var key in first) {
            func = TRANSFORM.tokenize(key);
            if (!func) {
              return false;
            }
            if (!func.name) {
              return false;
            }
            if (!func.expression || func.expression.length === 0) {
              return false;
            }
            if (func.name.toLowerCase() !== "#if") {
              return false;
            }
          }
          if (template.length === 1) {
            return true;
          }
          var they_are_all_elseifs = true;
          for (var template_index = 1; template_index < template.length - 1; template_index++) {
            var template_item = template[template_index];
            for (var template_key in template_item) {
              func = TRANSFORM.tokenize(template_key);
              if (func.name.toLowerCase() !== "#elseif") {
                they_are_all_elseifs = false;
                break;
              }
            }
          }
          if (!they_are_all_elseifs) {
            return false;
          }
          var last = template[template.length - 1];
          for (var last_key in last) {
            func = TRANSFORM.tokenize(last_key);
            if (["#else", "#elseif"].indexOf(func.name.toLowerCase()) === -1) {
              return false;
            }
          }
          return true;
        }
      };
      var TRANSFORM = {
        transform: function(template, data, injection, serialized) {
          var selector = null;
          if (/#include/.test(JSON.stringify(template))) {
            selector = function(key, value) {
              return /#include/.test(key) || /#include/.test(value);
            };
          }
          var res;
          if (injection) {
            var resolved_template = SELECT.select(template, selector, serialized).transform(data, serialized).root();
            res = SELECT.select(data, null, serialized).inject(injection, serialized).transformWith(resolved_template, serialized).root();
          } else {
            res = SELECT.select(template, selector, serialized).transform(data, serialized).root();
          }
          if (serialized) {
            return JSON.stringify(res);
          } else {
            return res;
          }
        },
        tokenize: function(str) {
          var re = /\{\{(.+)\}\}/g;
          str = str.replace(re, "$1");
          var tokens = str.trim().split(" ");
          var func;
          if (tokens.length > 0) {
            if (tokens[0][0] === "#") {
              func = tokens.shift();
              var expression = tokens.join(" ");
              return { name: func, expression };
            }
          }
          return null;
        },
        run: function(template, data) {
          var result;
          var fun;
          if (typeof template === "string") {
            if (Helper.is_template(template)) {
              var include_string_re = /\{\{([ ]*#include)[ ]*([^ ]*)\}\}/g;
              if (include_string_re.test(template)) {
                fun = TRANSFORM.tokenize(template);
                if (fun.expression) {
                  result = TRANSFORM.fillout(data, "{{" + fun.expression + "}}", true);
                } else {
                  result = template;
                }
              } else {
                result = TRANSFORM.fillout(data, template);
              }
            } else {
              result = template;
            }
          } else if (Helper.is_array(template)) {
            if (Conditional.is(template)) {
              result = Conditional.run(template, data);
            } else {
              result = [];
              for (var i = 0; i < template.length; i++) {
                var item = TRANSFORM.run(template[i], data);
                if (item) {
                  result.push(item);
                }
              }
            }
          } else if (Object.prototype.toString.call(template) === "[object Object]") {
            result = {};
            var include_object_re = /\{\{([ ]*#include)[ ]*(.*)\}\}/;
            var include_keys = Object.keys(template).filter(function(key2) {
              return include_object_re.test(key2);
            });
            if (include_keys.length > 0) {
              fun = TRANSFORM.tokenize(include_keys[0]);
              if (fun.expression) {
                result = TRANSFORM.fillout(template[include_keys[0]], "{{" + fun.expression + "}}", true);
              } else {
                result = template[include_keys[0]];
              }
            }
            for (var key in template) {
              if (Helper.is_template(key)) {
                fun = TRANSFORM.tokenize(key);
                if (fun) {
                  if (fun.name === "#include") {
                  } else if (fun.name === "#concat") {
                    if (Helper.is_array(template[key])) {
                      result = [];
                      template[key].forEach(function(concat_item) {
                        var res = TRANSFORM.run(concat_item, data);
                        result = result.concat(res);
                      });
                      if (/\{\{(.*?)\}\}/.test(JSON.stringify(result))) {
                        result = template;
                      }
                    }
                  } else if (fun.name === "#merge") {
                    if (Helper.is_array(template[key])) {
                      result = {};
                      template[key].forEach(function(merge_item) {
                        var res = TRANSFORM.run(merge_item, data);
                        for (var key2 in res) {
                          result[key2] = res[key2];
                        }
                      });
                      if (typeof data === "object") {
                        delete result["$index"];
                      } else {
                        delete String.prototype.$index;
                        delete Number.prototype.$index;
                        delete Function.prototype.$index;
                        delete Array.prototype.$index;
                        delete Boolean.prototype.$index;
                      }
                    }
                  } else if (fun.name === "#each") {
                    var newData = TRANSFORM.fillout(data, "{{" + fun.expression + "}}", true);
                    if (newData && Helper.is_array(newData)) {
                      result = [];
                      for (var index = 0; index < newData.length; index++) {
                        if (typeof newData[index] === "object") {
                          newData[index]["$index"] = index;
                        } else {
                          String.prototype.$index = index;
                          Number.prototype.$index = index;
                          Function.prototype.$index = index;
                          Array.prototype.$index = index;
                          Boolean.prototype.$index = index;
                        }
                        var loop_item = TRANSFORM.run(template[key], newData[index]);
                        if (typeof newData[index] === "object") {
                          delete newData[index]["$index"];
                        } else {
                          delete String.prototype.$index;
                          delete Number.prototype.$index;
                          delete Function.prototype.$index;
                          delete Array.prototype.$index;
                          delete Boolean.prototype.$index;
                        }
                        if (loop_item) {
                          result.push(loop_item);
                        }
                      }
                    } else {
                      result = template;
                    }
                  }
                } else {
                  var k = TRANSFORM.fillout(data, key);
                  var v = TRANSFORM.fillout(data, template[key]);
                  if (k !== void 0 && v !== void 0) {
                    result[k] = v;
                  }
                }
              } else {
                if (typeof template[key] === "string") {
                  fun = TRANSFORM.tokenize(template[key]);
                  if (fun && fun.name === "#?") {
                    var filled = TRANSFORM.fillout(data, "{{" + fun.expression + "}}");
                    if (filled === "{{" + fun.expression + "}}" || !filled) {
                    } else {
                      result[key] = filled;
                    }
                  } else {
                    var item = TRANSFORM.run(template[key], data);
                    if (item !== void 0) {
                      result[key] = item;
                    }
                  }
                } else {
                  var item = TRANSFORM.run(template[key], data);
                  if (item !== void 0) {
                    result[key] = item;
                  }
                }
              }
            }
          } else {
            return template;
          }
          return result;
        },
        fillout: function(data, template, raw) {
          var replaced = template;
          if (Helper.is_template(template)) {
            var re = /\{\{(.*?)\}\}/g;
            var variables = template.match(re);
            if (variables) {
              if (raw) {
                replaced = TRANSFORM._fillout({
                  variable: variables[0],
                  data,
                  template: null
                });
              } else {
                for (var i = 0; i < variables.length; i++) {
                  var variable = variables[i];
                  replaced = TRANSFORM._fillout({
                    variable,
                    data,
                    template: replaced
                  });
                }
              }
            } else {
              return replaced;
            }
          }
          return replaced;
        },
        _fillout: function(options) {
          var re = /\{\{(.*?)\}\}/g;
          var full_re = /^\{\{((?!\}\}).)*\}\}$/;
          var variable = options.variable;
          var data = options.data;
          var template = options.template;
          try {
            var slot = variable.replace(re, "$1");
            if (data) {
              var func;
              var data_type = typeof data;
              if (["number", "string", "array", "boolean", "function"].indexOf(data_type === -1)) {
                data.$root = root;
              }
              var match = /function\([ ]*\)[ ]*\{(.*)\}[ ]*$/g.exec(slot);
              if (match) {
                func = Function("with(this) {" + match[1] + "}").bind(data);
              } else if (/\breturn [^;]+;?[ ]*$/.test(slot) && /return[^}]*$/.test(slot)) {
                func = Function("with(this) {" + slot + "}").bind(data);
              } else {
                func = Function("with(this) {return (" + slot + ")}").bind(data);
              }
              var evaluated = func();
              delete data.$root;
              if (evaluated) {
                evaluated = evaluated.valueOf();
              }
              if (typeof evaluated === "undefined") {
                return template;
              } else {
                if (evaluated) {
                  if (template) {
                    if (full_re.test(template)) {
                      return evaluated;
                    } else {
                      return template.replace(variable, evaluated);
                    }
                  } else {
                    return evaluated;
                  }
                } else {
                  if (template) {
                    if (full_re.test(template)) {
                      return evaluated;
                    } else {
                      return template.replace(variable, "");
                    }
                  } else {
                    return "";
                  }
                }
              }
            }
            return template;
          } catch (err) {
            return template;
          }
        }
      };
      var SELECT = {
        // current: currently accessed object
        // path: the path leading to this item
        // filter: The filter function to decide whether to select or not
        $val: null,
        $selected: [],
        $injected: [],
        $progress: null,
        exec: function(current, path, filter) {
          if (typeof current === "string") {
          } else if (Helper.is_array(current)) {
            for (var i = 0; i < current.length; i++) {
              SELECT.exec(current[i], path + "[" + i + "]", filter);
            }
          } else {
            for (var key in current) {
              if (key !== "$root") {
                if (filter(key, current[key])) {
                  var index = SELECT.$selected.length;
                  SELECT.$selected.push({
                    index,
                    key,
                    path,
                    object: current,
                    value: current[key]
                  });
                }
                SELECT.exec(current[key], path + '["' + key + '"]', filter);
              }
            }
          }
        },
        inject: function(obj, serialized) {
          SELECT.$injected = obj;
          try {
            if (serialized) SELECT.$injected = JSON.parse(obj);
          } catch (error) {
          }
          if (Object.keys(SELECT.$injected).length > 0) {
            SELECT.select(SELECT.$injected);
          }
          return SELECT;
        },
        // returns the object itself
        select: function(obj, filter, serialized) {
          var json = obj;
          try {
            if (serialized) json = JSON.parse(obj);
          } catch (error) {
          }
          if (filter) {
            SELECT.$selected = [];
            SELECT.exec(json, "", filter);
          } else {
            SELECT.$selected = null;
          }
          if (json && (Helper.is_array(json) || typeof json === "object")) {
            if (!SELECT.$progress) {
              if (Helper.is_array(json)) {
                SELECT.$val = [];
                SELECT.$selected_root = [];
              } else {
                SELECT.$val = {};
                SELECT.$selected_root = {};
              }
            }
            Object.keys(json).forEach(function(key) {
              SELECT.$val[key] = json[key];
              SELECT.$selected_root[key] = json[key];
            });
          } else {
            SELECT.$val = json;
            SELECT.$selected_root = json;
          }
          SELECT.$progress = true;
          return SELECT;
        },
        transformWith: function(obj, serialized) {
          SELECT.$parsed = [];
          SELECT.$progress = null;
          var template = obj;
          try {
            if (serialized) template = JSON.parse(obj);
          } catch (error) {
          }
          SELECT.$template_root = template;
          String.prototype.$root = SELECT.$selected_root;
          Number.prototype.$root = SELECT.$selected_root;
          Function.prototype.$root = SELECT.$selected_root;
          Array.prototype.$root = SELECT.$selected_root;
          Boolean.prototype.$root = SELECT.$selected_root;
          root = SELECT.$selected_root;
          if (SELECT.$selected && SELECT.$selected.length > 0) {
            SELECT.$selected.sort(function(a, b) {
              return b.path.length - a.path.length;
            }).forEach(function(selection) {
              var parsed_object2 = TRANSFORM.run(template, selection.object);
              SELECT.$selected_root = Helper.resolve(SELECT.$selected_root, selection.path, parsed_object2);
              selection.object = parsed_object2;
            });
            SELECT.$selected.sort(function(a, b) {
              return a.index - b.index;
            });
          } else {
            var parsed_object = TRANSFORM.run(template, SELECT.$selected_root);
            SELECT.$selected_root = Helper.resolve(SELECT.$selected_root, "", parsed_object);
          }
          delete String.prototype.$root;
          delete Number.prototype.$root;
          delete Function.prototype.$root;
          delete Array.prototype.$root;
          delete Boolean.prototype.$root;
          return SELECT;
        },
        transform: function(obj, serialized) {
          SELECT.$parsed = [];
          SELECT.$progress = null;
          var data = obj;
          try {
            if (serialized) data = JSON.parse(obj);
          } catch (error) {
          }
          SELECT.$template_root = SELECT.$selected_root;
          String.prototype.$root = data;
          Number.prototype.$root = data;
          Function.prototype.$root = data;
          Array.prototype.$root = data;
          Boolean.prototype.$root = data;
          root = data;
          if (SELECT.$selected && SELECT.$selected.length > 0) {
            SELECT.$selected.sort(function(a, b) {
              return b.path.length - a.path.length;
            }).forEach(function(selection) {
              var parsed_object2 = TRANSFORM.run(selection.object, data);
              SELECT.$template_root = Helper.resolve(SELECT.$template_root, selection.path, parsed_object2);
              SELECT.$selected_root = SELECT.$template_root;
              selection.object = parsed_object2;
            });
            SELECT.$selected.sort(function(a, b) {
              return a.index - b.index;
            });
          } else {
            var parsed_object = TRANSFORM.run(SELECT.$selected_root, data);
            SELECT.$template_root = Helper.resolve(SELECT.$template_root, "", parsed_object);
            SELECT.$selected_root = SELECT.$template_root;
          }
          delete String.prototype.$root;
          delete Number.prototype.$root;
          delete Function.prototype.$root;
          delete Array.prototype.$root;
          delete Boolean.prototype.$root;
          return SELECT;
        },
        // Terminal methods
        objects: function() {
          SELECT.$progress = null;
          if (SELECT.$selected) {
            return SELECT.$selected.map(function(item) {
              return item.object;
            });
          } else {
            return [SELECT.$selected_root];
          }
        },
        keys: function() {
          SELECT.$progress = null;
          if (SELECT.$selected) {
            return SELECT.$selected.map(function(item) {
              return item.key;
            });
          } else {
            if (Array.isArray(SELECT.$selected_root)) {
              return Object.keys(SELECT.$selected_root).map(function(key) {
                return parseInt(key);
              });
            } else {
              return Object.keys(SELECT.$selected_root);
            }
          }
        },
        paths: function() {
          SELECT.$progress = null;
          if (SELECT.$selected) {
            return SELECT.$selected.map(function(item) {
              return item.path;
            });
          } else {
            if (Array.isArray(SELECT.$selected_root)) {
              return Object.keys(SELECT.$selected_root).map(function(item) {
                return "[" + item + "]";
              });
            } else {
              return Object.keys(SELECT.$selected_root).map(function(item) {
                return '["' + item + '"]';
              });
            }
          }
        },
        values: function() {
          SELECT.$progress = null;
          if (SELECT.$selected) {
            return SELECT.$selected.map(function(item) {
              return item.value;
            });
          } else {
            return Object.values(SELECT.$selected_root);
          }
        },
        root: function() {
          SELECT.$progress = null;
          return SELECT.$selected_root;
        }
      };
      var _stringify = JSON.stringify;
      JSON.stringify = function(val, replacer, spaces) {
        var t = typeof val;
        if (["number", "string", "boolean"].indexOf(t) !== -1) {
          return _stringify(val, replacer, spaces);
        }
        if (!replacer) {
          return _stringify(val, function(key, val2) {
            if (SELECT.$injected && SELECT.$injected.length > 0 && SELECT.$injected.indexOf(key) !== -1) {
              return void 0;
            }
            if (key === "$root" || key === "$index") {
              return void 0;
            }
            if (typeof val2 === "function") {
              return "(" + val2.toString() + ")";
            } else {
              return val2;
            }
          }, spaces);
        } else {
          return _stringify(val, replacer, spaces);
        }
      };
      if (typeof exports2 !== "undefined") {
        var x = {
          TRANSFORM,
          transform: TRANSFORM,
          SELECT,
          Conditional,
          Helper,
          inject: SELECT.inject,
          select: SELECT.select,
          transform: TRANSFORM.transform
        };
        if (typeof module2 !== "undefined" && module2.exports) {
          exports2 = module2.exports = x;
        }
        exports2 = x;
      } else {
        $context.ST = {
          select: SELECT.select,
          inject: SELECT.inject,
          transform: TRANSFORM.transform
        };
      }
    })();
  }
});

// src/discord.ts
var core = require_core();
var LIMITS = {
  title: 256,
  description: 4096,
  fields: 25,
  fieldName: 256,
  fieldValue: 1024,
  footerText: 2048,
  authorName: 256,
  embedsPerMessage: 10,
  charsPerMessage: 6e3
};
var MAX_ATTEMPTS = 5;
var MAX_RETRY_WAIT_MS = 6e4;
var MAX_ERROR_BODY_LENGTH = 500;
var PLACEHOLDER = /\{\{[\s\S]+?\}\}/g;
var WebhookError = class extends Error {
  constructor(message, stopSending) {
    super(message);
    this.stopSending = stopSending;
  }
  stopSending;
};
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function truncate(text, max) {
  const trimmed = text.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }
  if (max <= 0) {
    return "";
  }
  let end = max - 1;
  const lastCode = trimmed.charCodeAt(end - 1);
  if (lastCode >= 55296 && lastCode <= 56319) {
    end--;
  }
  return `${trimmed.slice(0, end).trimEnd()}\u2026`;
}
function validUrl(value, allowAttachment = false) {
  if (typeof value !== "string") {
    return void 0;
  }
  const url = value.trim();
  if (!URL.canParse(url)) {
    return void 0;
  }
  const parsed = new URL(url);
  const { protocol } = parsed;
  const allowed = protocol === "http:" || protocol === "https:" || allowAttachment && protocol === "attachment:";
  return allowed ? parsed.href : void 0;
}
function validColor(value) {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 16777215 ? value : void 0;
}
function validTimestamp(value) {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
    return void 0;
  }
  return new Date(value).toISOString();
}
function validMedia(value) {
  if (!isRecord(value)) {
    return void 0;
  }
  const url = validUrl(value.url, true);
  return url ? { ...value, url } : void 0;
}
function removeUnresolved(rendered, template) {
  if (typeof rendered === "string" && typeof template === "string") {
    const placeholders = template.match(PLACEHOLDER) ?? [];
    if (placeholders.length === 1 && placeholders[0] === template.trim() && rendered !== template) {
      return rendered;
    }
    const cleaned = placeholders.reduce((text, placeholder) => text.split(placeholder).join(""), rendered);
    return cleaned === rendered ? rendered : cleaned.replace(/\(\s*\)/g, "").trim();
  }
  if (Array.isArray(rendered) && Array.isArray(template)) {
    return rendered.map((value, index) => removeUnresolved(value, template[index]));
  }
  if (isRecord(rendered) && isRecord(template)) {
    return Object.fromEntries(
      Object.entries(rendered).map(([key, value]) => [key, removeUnresolved(value, template[key])])
    );
  }
  return rendered;
}
function sanitizeEmbed(input) {
  if (!isRecord(input)) {
    return void 0;
  }
  let remaining = LIMITS.charsPerMessage;
  const take = (value, max) => {
    const raw = typeof value === "number" ? String(value) : value;
    if (typeof raw !== "string") {
      return void 0;
    }
    const text = truncate(raw, Math.min(max, remaining));
    remaining -= text.length;
    return text || void 0;
  };
  const embed = { ...input };
  embed.title = take(input.title, LIMITS.title);
  embed.author = void 0;
  if (isRecord(input.author)) {
    const name = take(input.author.name, LIMITS.authorName);
    if (name) {
      embed.author = {
        ...input.author,
        name,
        url: validUrl(input.author.url),
        icon_url: validUrl(input.author.icon_url, true)
      };
    }
  }
  embed.description = take(input.description, LIMITS.description);
  embed.footer = void 0;
  if (isRecord(input.footer)) {
    const text = take(input.footer.text, LIMITS.footerText);
    if (text) {
      embed.footer = { ...input.footer, text, icon_url: validUrl(input.footer.icon_url, true) };
    }
  }
  const fields = (Array.isArray(input.fields) ? input.fields : []).slice(0, LIMITS.fields).flatMap((field) => {
    if (!isRecord(field)) {
      return [];
    }
    const before = remaining;
    const name = take(field.name, LIMITS.fieldName);
    const value = take(field.value, LIMITS.fieldValue);
    if (!name || !value) {
      remaining = before;
      return [];
    }
    return [{ ...field, name, value }];
  });
  embed.fields = fields.length > 0 ? fields : void 0;
  embed.url = validUrl(input.url);
  embed.color = validColor(input.color);
  embed.timestamp = validTimestamp(input.timestamp);
  embed.image = validMedia(input.image);
  embed.thumbnail = validMedia(input.thumbnail);
  const visible = embed.title || embed.description || embed.author || embed.footer || embed.fields || embed.image || embed.thumbnail;
  return visible ? embed : void 0;
}
function embedLength(embed) {
  const length = (value) => typeof value === "string" ? value.length : 0;
  const author = isRecord(embed.author) ? embed.author : {};
  const footer = isRecord(embed.footer) ? embed.footer : {};
  const fields = Array.isArray(embed.fields) ? embed.fields : [];
  return length(embed.title) + length(embed.description) + length(author.name) + length(footer.text) + fields.reduce((total, field) => total + length(field.name) + length(field.value), 0);
}
function batchEmbeds(embeds) {
  const batches = [];
  let current = [];
  let chars = 0;
  for (const embed of embeds) {
    const length = embedLength(embed);
    if (current.length === LIMITS.embedsPerMessage || chars + length > LIMITS.charsPerMessage) {
      batches.push(current);
      current = [];
      chars = 0;
    }
    current.push(embed);
    chars += length;
  }
  if (current.length > 0) {
    batches.push(current);
  }
  return batches;
}
function rateLimitSeconds(response, body) {
  try {
    const retryAfter = JSON.parse(body).retry_after;
    if (typeof retryAfter === "number" && retryAfter >= 0) {
      return retryAfter;
    }
  } catch {
  }
  const header = Number(response.headers.get("retry-after") ?? Number.NaN);
  return Number.isFinite(header) && header >= 0 ? header : void 0;
}
function retryDelayMs(response, body, attempt) {
  const seconds = response.status === 429 ? rateLimitSeconds(response, body) : void 0;
  return seconds !== void 0 ? Math.ceil(seconds * 1e3) : 1e3 * 2 ** (attempt - 1);
}
async function postBatch(endpoint, embeds, eventName) {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Event": eventName
      },
      body: JSON.stringify({ embeds })
    });
    const body = await response.text();
    if (response.ok) {
      return;
    }
    const { status } = response;
    if ((status === 429 || status === 502) && attempt < MAX_ATTEMPTS) {
      const delay = retryDelayMs(response, body, attempt);
      if (delay <= MAX_RETRY_WAIT_MS) {
        console.log(`Discord returned ${status}, retrying in ${delay}ms (attempt ${attempt}/${MAX_ATTEMPTS}).`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
    }
    const detail = truncate(body, MAX_ERROR_BODY_LENGTH) || response.statusText;
    throw new WebhookError(`Discord returned ${status}: ${detail}`, [401, 403, 404, 429].includes(status));
  }
}
function failureDetail(err) {
  return err.cause instanceof Error ? `${err.message}: ${err.cause.message}` : err.message;
}
async function sendEmbeds(webhookUrl, embeds, eventName) {
  if (!URL.canParse(webhookUrl)) {
    core.setFailed("The webhook input is not a valid URL.");
    return false;
  }
  const endpoint = new URL(webhookUrl);
  endpoint.searchParams.set("wait", "true");
  let delivered = true;
  for (const batch of batchEmbeds(embeds)) {
    try {
      await postBatch(endpoint.toString(), batch, eventName);
    } catch (e) {
      const err = e;
      delivered = false;
      console.log(JSON.stringify({ embeds: batch }));
      console.error("Error :", err);
      core.setFailed(`Message : ${failureDetail(err)}`);
      if (err instanceof WebhookError && err.stopSending) {
        break;
      }
    }
  }
  return delivered;
}

// src/index.ts
var core2 = require_core();
var github = require_github();
var _ = require_lodash4();
var ST = require_st();
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
async function run() {
  try {
    const message = core2.getInput("message");
    const webhook = core2.getInput("webhook");
    const webhook_all = core2.getInput("webhook_all");
    const url = core2.getInput("url");
    const iconUrl = core2.getInput("icon_url") ?? "https://i.imgur.com/eJ08X1Z.png";
    const author = core2.getInput("author") ?? "Tedeapolis";
    const embed = core2.getInput("embed") || '{ "title": "{{ commit.title }}", "description": "{{ commit.description }}", "url": "{{ commit.url }}", "author": { "name": "{{ commit.author.name }} ({{ commit.author.username }})", "icon_url": "https://avatars.io/gravatar/{{ commit.author.email }}"} }';
    const eventName = github.context.eventName || "push";
    const data = {
      env: { ...process.env },
      github: { ...github }
    };
    const commits = github.context.payload.commits ?? [];
    const toEmbeds = (list) => list.flatMap((commit) => {
      const $data = {
        ...data,
        commit: {
          title: commit.message.split("\n\n").slice(0, 1).join("\n\n"),
          description: commit.message.split("\n\n").slice(1).join("\n\n"),
          ...commit
        }
      };
      const parsed = ST.select($data).transformWith(JSON.parse(embed)).root();
      const sanitized = sanitizeEmbed(removeUnresolved(parsed, JSON.parse(embed)));
      return sanitized ? [sanitized] : [];
    });
    const embeds = toEmbeds(
      commits.filter((commit) => {
        const message2 = commit.message.toLowerCase();
        if (message2.includes("redacted")) {
          return false;
        }
        if (message2.includes("merge")) {
          return false;
        }
        return true;
      })
    );
    data.length = embeds.length;
    if (webhook_all) {
      const embeds_all = toEmbeds(
        commits.filter((commit) => {
          const message2 = commit.message.toLowerCase();
          if (message2.includes("merge")) {
            return false;
          }
          return true;
        })
      );
      await sendEmbeds(webhook_all, embeds_all, eventName);
    }
    if (embeds.length == 0) {
      console.log("All messages filtered, cancelling run.");
      return;
    }
    const header = sanitizeEmbed({
      "description": _.template(message)(data),
      "color": 2752256,
      "author": {
        "name": _.template(author)(data),
        "url": _.template(url)(data),
        "icon_url": _.template(iconUrl)(data)
      }
    });
    const delivered = await sendEmbeds(webhook, header ? [header, ...embeds] : embeds, eventName);
    if (delivered) {
      console.log("Message sent ! Shutting down ...");
    }
  } catch (error) {
    core2.setFailed(error.message);
  }
}
run();
/*! Bundled license information:

is-plain-object/index.cjs.js:
  (*!
   * isobject <https://github.com/jonschlinkert/isobject>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
