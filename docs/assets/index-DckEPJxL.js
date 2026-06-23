var Yy = Object.defineProperty;
var Xy = (l, c, s) =>
  c in l ? Yy(l, c, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (l[c] = s);
var ra = (l, c, s) => Xy(l, typeof c != 'symbol' ? c + '' : c, s);
(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const f of document.querySelectorAll('link[rel="modulepreload"]')) r(f);
  new MutationObserver((f) => {
    for (const d of f)
      if (d.type === 'childList')
        for (const m of d.addedNodes) m.tagName === 'LINK' && m.rel === 'modulepreload' && r(m);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(f) {
    const d = {};
    return (
      f.integrity && (d.integrity = f.integrity),
      f.referrerPolicy && (d.referrerPolicy = f.referrerPolicy),
      f.crossOrigin === 'use-credentials'
        ? (d.credentials = 'include')
        : f.crossOrigin === 'anonymous'
          ? (d.credentials = 'omit')
          : (d.credentials = 'same-origin'),
      d
    );
  }
  function r(f) {
    if (f.ep) return;
    f.ep = !0;
    const d = s(f);
    fetch(f.href, d);
  }
})();
function Ky(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, 'default') ? l.default : l;
}
var fu = { exports: {} },
  ic = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var J0;
function Qy() {
  if (J0) return ic;
  J0 = 1;
  var l = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.fragment');
  function s(r, f, d) {
    var m = null;
    if ((d !== void 0 && (m = '' + d), f.key !== void 0 && (m = '' + f.key), 'key' in f)) {
      d = {};
      for (var p in f) p !== 'key' && (d[p] = f[p]);
    } else d = f;
    return ((f = d.ref), { $$typeof: l, type: r, key: m, ref: f !== void 0 ? f : null, props: d });
  }
  return ((ic.Fragment = c), (ic.jsx = s), (ic.jsxs = s), ic);
}
var F0;
function Wy() {
  return (F0 || ((F0 = 1), (fu.exports = Qy())), fu.exports);
}
var u = Wy(),
  du = { exports: {} },
  cc = {},
  mu = { exports: {} },
  hu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var I0;
function Jy() {
  return (
    I0 ||
      ((I0 = 1),
      (function (l) {
        function c(O, Y) {
          var at = O.length;
          O.push(Y);
          t: for (; 0 < at; ) {
            var bt = (at - 1) >>> 1,
              At = O[bt];
            if (0 < f(At, Y)) ((O[bt] = Y), (O[at] = At), (at = bt));
            else break t;
          }
        }
        function s(O) {
          return O.length === 0 ? null : O[0];
        }
        function r(O) {
          if (O.length === 0) return null;
          var Y = O[0],
            at = O.pop();
          if (at !== Y) {
            O[0] = at;
            t: for (var bt = 0, At = O.length, j = At >>> 1; bt < j; ) {
              var H = 2 * (bt + 1) - 1,
                k = O[H],
                X = H + 1,
                nt = O[X];
              if (0 > f(k, at))
                X < At && 0 > f(nt, k)
                  ? ((O[bt] = nt), (O[X] = at), (bt = X))
                  : ((O[bt] = k), (O[H] = at), (bt = H));
              else if (X < At && 0 > f(nt, at)) ((O[bt] = nt), (O[X] = at), (bt = X));
              else break t;
            }
          }
          return Y;
        }
        function f(O, Y) {
          var at = O.sortIndex - Y.sortIndex;
          return at !== 0 ? at : O.id - Y.id;
        }
        if (
          ((l.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var d = performance;
          l.unstable_now = function () {
            return d.now();
          };
        } else {
          var m = Date,
            p = m.now();
          l.unstable_now = function () {
            return m.now() - p;
          };
        }
        var g = [],
          y = [],
          _ = 1,
          b = null,
          A = 3,
          N = !1,
          E = !1,
          q = !1,
          $ = !1,
          J = typeof setTimeout == 'function' ? setTimeout : null,
          C = typeof clearTimeout == 'function' ? clearTimeout : null,
          rt = typeof setImmediate < 'u' ? setImmediate : null;
        function Mt(O) {
          for (var Y = s(y); Y !== null; ) {
            if (Y.callback === null) r(y);
            else if (Y.startTime <= O) (r(y), (Y.sortIndex = Y.expirationTime), c(g, Y));
            else break;
            Y = s(y);
          }
        }
        function Ct(O) {
          if (((q = !1), Mt(O), !E))
            if (s(g) !== null) ((E = !0), Tt || ((Tt = !0), Qt()));
            else {
              var Y = s(y);
              Y !== null && It(Ct, Y.startTime - O);
            }
        }
        var Tt = !1,
          it = -1,
          Lt = 5,
          Ft = -1;
        function Yt() {
          return $ ? !0 : !(l.unstable_now() - Ft < Lt);
        }
        function Kt() {
          if ((($ = !1), Tt)) {
            var O = l.unstable_now();
            Ft = O;
            var Y = !0;
            try {
              t: {
                ((E = !1), q && ((q = !1), C(it), (it = -1)), (N = !0));
                var at = A;
                try {
                  e: {
                    for (Mt(O), b = s(g); b !== null && !(b.expirationTime > O && Yt()); ) {
                      var bt = b.callback;
                      if (typeof bt == 'function') {
                        ((b.callback = null), (A = b.priorityLevel));
                        var At = bt(b.expirationTime <= O);
                        if (((O = l.unstable_now()), typeof At == 'function')) {
                          ((b.callback = At), Mt(O), (Y = !0));
                          break e;
                        }
                        (b === s(g) && r(g), Mt(O));
                      } else r(g);
                      b = s(g);
                    }
                    if (b !== null) Y = !0;
                    else {
                      var j = s(y);
                      (j !== null && It(Ct, j.startTime - O), (Y = !1));
                    }
                  }
                  break t;
                } finally {
                  ((b = null), (A = at), (N = !1));
                }
                Y = void 0;
              }
            } finally {
              Y ? Qt() : (Tt = !1);
            }
          }
        }
        var Qt;
        if (typeof rt == 'function')
          Qt = function () {
            rt(Kt);
          };
        else if (typeof MessageChannel < 'u') {
          var Me = new MessageChannel(),
            ee = Me.port2;
          ((Me.port1.onmessage = Kt),
            (Qt = function () {
              ee.postMessage(null);
            }));
        } else
          Qt = function () {
            J(Kt, 0);
          };
        function It(O, Y) {
          it = J(function () {
            O(l.unstable_now());
          }, Y);
        }
        ((l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (O) {
            O.callback = null;
          }),
          (l.unstable_forceFrameRate = function (O) {
            0 > O || 125 < O
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (Lt = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return A;
          }),
          (l.unstable_next = function (O) {
            switch (A) {
              case 1:
              case 2:
              case 3:
                var Y = 3;
                break;
              default:
                Y = A;
            }
            var at = A;
            A = Y;
            try {
              return O();
            } finally {
              A = at;
            }
          }),
          (l.unstable_requestPaint = function () {
            $ = !0;
          }),
          (l.unstable_runWithPriority = function (O, Y) {
            switch (O) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                O = 3;
            }
            var at = A;
            A = O;
            try {
              return Y();
            } finally {
              A = at;
            }
          }),
          (l.unstable_scheduleCallback = function (O, Y, at) {
            var bt = l.unstable_now();
            switch (
              (typeof at == 'object' && at !== null
                ? ((at = at.delay), (at = typeof at == 'number' && 0 < at ? bt + at : bt))
                : (at = bt),
              O)
            ) {
              case 1:
                var At = -1;
                break;
              case 2:
                At = 250;
                break;
              case 5:
                At = 1073741823;
                break;
              case 4:
                At = 1e4;
                break;
              default:
                At = 5e3;
            }
            return (
              (At = at + At),
              (O = {
                id: _++,
                callback: Y,
                priorityLevel: O,
                startTime: at,
                expirationTime: At,
                sortIndex: -1,
              }),
              at > bt
                ? ((O.sortIndex = at),
                  c(y, O),
                  s(g) === null &&
                    O === s(y) &&
                    (q ? (C(it), (it = -1)) : (q = !0), It(Ct, at - bt)))
                : ((O.sortIndex = At), c(g, O), E || N || ((E = !0), Tt || ((Tt = !0), Qt()))),
              O
            );
          }),
          (l.unstable_shouldYield = Yt),
          (l.unstable_wrapCallback = function (O) {
            var Y = A;
            return function () {
              var at = A;
              A = Y;
              try {
                return O.apply(this, arguments);
              } finally {
                A = at;
              }
            };
          }));
      })(hu)),
    hu
  );
}
var P0;
function Fy() {
  return (P0 || ((P0 = 1), (mu.exports = Jy())), mu.exports);
}
var pu = { exports: {} },
  ct = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var th;
function Iy() {
  if (th) return ct;
  th = 1;
  var l = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.portal'),
    s = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    f = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    m = Symbol.for('react.context'),
    p = Symbol.for('react.forward_ref'),
    g = Symbol.for('react.suspense'),
    y = Symbol.for('react.memo'),
    _ = Symbol.for('react.lazy'),
    b = Symbol.for('react.activity'),
    A = Symbol.iterator;
  function N(j) {
    return j === null || typeof j != 'object'
      ? null
      : ((j = (A && j[A]) || j['@@iterator']), typeof j == 'function' ? j : null);
  }
  var E = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    q = Object.assign,
    $ = {};
  function J(j, H, k) {
    ((this.props = j), (this.context = H), (this.refs = $), (this.updater = k || E));
  }
  ((J.prototype.isReactComponent = {}),
    (J.prototype.setState = function (j, H) {
      if (typeof j != 'object' && typeof j != 'function' && j != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, j, H, 'setState');
    }),
    (J.prototype.forceUpdate = function (j) {
      this.updater.enqueueForceUpdate(this, j, 'forceUpdate');
    }));
  function C() {}
  C.prototype = J.prototype;
  function rt(j, H, k) {
    ((this.props = j), (this.context = H), (this.refs = $), (this.updater = k || E));
  }
  var Mt = (rt.prototype = new C());
  ((Mt.constructor = rt), q(Mt, J.prototype), (Mt.isPureReactComponent = !0));
  var Ct = Array.isArray;
  function Tt() {}
  var it = { H: null, A: null, T: null, S: null },
    Lt = Object.prototype.hasOwnProperty;
  function Ft(j, H, k) {
    var X = k.ref;
    return { $$typeof: l, type: j, key: H, ref: X !== void 0 ? X : null, props: k };
  }
  function Yt(j, H) {
    return Ft(j.type, H, j.props);
  }
  function Kt(j) {
    return typeof j == 'object' && j !== null && j.$$typeof === l;
  }
  function Qt(j) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      j.replace(/[=:]/g, function (k) {
        return H[k];
      })
    );
  }
  var Me = /\/+/g;
  function ee(j, H) {
    return typeof j == 'object' && j !== null && j.key != null ? Qt('' + j.key) : H.toString(36);
  }
  function It(j) {
    switch (j.status) {
      case 'fulfilled':
        return j.value;
      case 'rejected':
        throw j.reason;
      default:
        switch (
          (typeof j.status == 'string'
            ? j.then(Tt, Tt)
            : ((j.status = 'pending'),
              j.then(
                function (H) {
                  j.status === 'pending' && ((j.status = 'fulfilled'), (j.value = H));
                },
                function (H) {
                  j.status === 'pending' && ((j.status = 'rejected'), (j.reason = H));
                }
              )),
          j.status)
        ) {
          case 'fulfilled':
            return j.value;
          case 'rejected':
            throw j.reason;
        }
    }
    throw j;
  }
  function O(j, H, k, X, nt) {
    var K = typeof j;
    (K === 'undefined' || K === 'boolean') && (j = null);
    var vt = !1;
    if (j === null) vt = !0;
    else
      switch (K) {
        case 'bigint':
        case 'string':
        case 'number':
          vt = !0;
          break;
        case 'object':
          switch (j.$$typeof) {
            case l:
            case c:
              vt = !0;
              break;
            case _:
              return ((vt = j._init), O(vt(j._payload), H, k, X, nt));
          }
      }
    if (vt)
      return (
        (nt = nt(j)),
        (vt = X === '' ? '.' + ee(j, 0) : X),
        Ct(nt)
          ? ((k = ''),
            vt != null && (k = vt.replace(Me, '$&/') + '/'),
            O(nt, H, k, '', function (Le) {
              return Le;
            }))
          : nt != null &&
            (Kt(nt) &&
              (nt = Yt(
                nt,
                k +
                  (nt.key == null || (j && j.key === nt.key)
                    ? ''
                    : ('' + nt.key).replace(Me, '$&/') + '/') +
                  vt
              )),
            H.push(nt)),
        1
      );
    vt = 0;
    var Ut = X === '' ? '.' : X + ':';
    if (Ct(j))
      for (var _t = 0; _t < j.length; _t++)
        ((X = j[_t]), (K = Ut + ee(X, _t)), (vt += O(X, H, k, K, nt)));
    else if (((_t = N(j)), typeof _t == 'function'))
      for (j = _t.call(j), _t = 0; !(X = j.next()).done; )
        ((X = X.value), (K = Ut + ee(X, _t++)), (vt += O(X, H, k, K, nt)));
    else if (K === 'object') {
      if (typeof j.then == 'function') return O(It(j), H, k, X, nt);
      throw (
        (H = String(j)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(j).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return vt;
  }
  function Y(j, H, k) {
    if (j == null) return j;
    var X = [],
      nt = 0;
    return (
      O(j, X, '', '', function (K) {
        return H.call(k, K, nt++);
      }),
      X
    );
  }
  function at(j) {
    if (j._status === -1) {
      var H = j._result;
      ((H = H()),
        H.then(
          function (k) {
            (j._status === 0 || j._status === -1) && ((j._status = 1), (j._result = k));
          },
          function (k) {
            (j._status === 0 || j._status === -1) && ((j._status = 2), (j._result = k));
          }
        ),
        j._status === -1 && ((j._status = 0), (j._result = H)));
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var bt =
      typeof reportError == 'function'
        ? reportError
        : function (j) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var H = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof j == 'object' && j !== null && typeof j.message == 'string'
                    ? String(j.message)
                    : String(j),
                error: j,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', j);
              return;
            }
            console.error(j);
          },
    At = {
      map: Y,
      forEach: function (j, H, k) {
        Y(
          j,
          function () {
            H.apply(this, arguments);
          },
          k
        );
      },
      count: function (j) {
        var H = 0;
        return (
          Y(j, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (j) {
        return (
          Y(j, function (H) {
            return H;
          }) || []
        );
      },
      only: function (j) {
        if (!Kt(j))
          throw Error('React.Children.only expected to receive a single React element child.');
        return j;
      },
    };
  return (
    (ct.Activity = b),
    (ct.Children = At),
    (ct.Component = J),
    (ct.Fragment = s),
    (ct.Profiler = f),
    (ct.PureComponent = rt),
    (ct.StrictMode = r),
    (ct.Suspense = g),
    (ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = it),
    (ct.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (j) {
        return it.H.useMemoCache(j);
      },
    }),
    (ct.cache = function (j) {
      return function () {
        return j.apply(null, arguments);
      };
    }),
    (ct.cacheSignal = function () {
      return null;
    }),
    (ct.cloneElement = function (j, H, k) {
      if (j == null) throw Error('The argument must be a React element, but you passed ' + j + '.');
      var X = q({}, j.props),
        nt = j.key;
      if (H != null)
        for (K in (H.key !== void 0 && (nt = '' + H.key), H))
          !Lt.call(H, K) ||
            K === 'key' ||
            K === '__self' ||
            K === '__source' ||
            (K === 'ref' && H.ref === void 0) ||
            (X[K] = H[K]);
      var K = arguments.length - 2;
      if (K === 1) X.children = k;
      else if (1 < K) {
        for (var vt = Array(K), Ut = 0; Ut < K; Ut++) vt[Ut] = arguments[Ut + 2];
        X.children = vt;
      }
      return Ft(j.type, nt, X);
    }),
    (ct.createContext = function (j) {
      return (
        (j = {
          $$typeof: m,
          _currentValue: j,
          _currentValue2: j,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (j.Provider = j),
        (j.Consumer = { $$typeof: d, _context: j }),
        j
      );
    }),
    (ct.createElement = function (j, H, k) {
      var X,
        nt = {},
        K = null;
      if (H != null)
        for (X in (H.key !== void 0 && (K = '' + H.key), H))
          Lt.call(H, X) && X !== 'key' && X !== '__self' && X !== '__source' && (nt[X] = H[X]);
      var vt = arguments.length - 2;
      if (vt === 1) nt.children = k;
      else if (1 < vt) {
        for (var Ut = Array(vt), _t = 0; _t < vt; _t++) Ut[_t] = arguments[_t + 2];
        nt.children = Ut;
      }
      if (j && j.defaultProps)
        for (X in ((vt = j.defaultProps), vt)) nt[X] === void 0 && (nt[X] = vt[X]);
      return Ft(j, K, nt);
    }),
    (ct.createRef = function () {
      return { current: null };
    }),
    (ct.forwardRef = function (j) {
      return { $$typeof: p, render: j };
    }),
    (ct.isValidElement = Kt),
    (ct.lazy = function (j) {
      return { $$typeof: _, _payload: { _status: -1, _result: j }, _init: at };
    }),
    (ct.memo = function (j, H) {
      return { $$typeof: y, type: j, compare: H === void 0 ? null : H };
    }),
    (ct.startTransition = function (j) {
      var H = it.T,
        k = {};
      it.T = k;
      try {
        var X = j(),
          nt = it.S;
        (nt !== null && nt(k, X),
          typeof X == 'object' && X !== null && typeof X.then == 'function' && X.then(Tt, bt));
      } catch (K) {
        bt(K);
      } finally {
        (H !== null && k.types !== null && (H.types = k.types), (it.T = H));
      }
    }),
    (ct.unstable_useCacheRefresh = function () {
      return it.H.useCacheRefresh();
    }),
    (ct.use = function (j) {
      return it.H.use(j);
    }),
    (ct.useActionState = function (j, H, k) {
      return it.H.useActionState(j, H, k);
    }),
    (ct.useCallback = function (j, H) {
      return it.H.useCallback(j, H);
    }),
    (ct.useContext = function (j) {
      return it.H.useContext(j);
    }),
    (ct.useDebugValue = function () {}),
    (ct.useDeferredValue = function (j, H) {
      return it.H.useDeferredValue(j, H);
    }),
    (ct.useEffect = function (j, H) {
      return it.H.useEffect(j, H);
    }),
    (ct.useEffectEvent = function (j) {
      return it.H.useEffectEvent(j);
    }),
    (ct.useId = function () {
      return it.H.useId();
    }),
    (ct.useImperativeHandle = function (j, H, k) {
      return it.H.useImperativeHandle(j, H, k);
    }),
    (ct.useInsertionEffect = function (j, H) {
      return it.H.useInsertionEffect(j, H);
    }),
    (ct.useLayoutEffect = function (j, H) {
      return it.H.useLayoutEffect(j, H);
    }),
    (ct.useMemo = function (j, H) {
      return it.H.useMemo(j, H);
    }),
    (ct.useOptimistic = function (j, H) {
      return it.H.useOptimistic(j, H);
    }),
    (ct.useReducer = function (j, H, k) {
      return it.H.useReducer(j, H, k);
    }),
    (ct.useRef = function (j) {
      return it.H.useRef(j);
    }),
    (ct.useState = function (j) {
      return it.H.useState(j);
    }),
    (ct.useSyncExternalStore = function (j, H, k) {
      return it.H.useSyncExternalStore(j, H, k);
    }),
    (ct.useTransition = function () {
      return it.H.useTransition();
    }),
    (ct.version = '19.2.5'),
    ct
  );
}
var eh;
function ku() {
  return (eh || ((eh = 1), (pu.exports = Iy())), pu.exports);
}
var yu = { exports: {} },
  xe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ah;
function Py() {
  if (ah) return xe;
  ah = 1;
  var l = ku();
  function c(g) {
    var y = 'https://react.dev/errors/' + g;
    if (1 < arguments.length) {
      y += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var _ = 2; _ < arguments.length; _++) y += '&args[]=' + encodeURIComponent(arguments[_]);
    }
    return (
      'Minified React error #' +
      g +
      '; visit ' +
      y +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function s() {}
  var r = {
      d: {
        f: s,
        r: function () {
          throw Error(c(522));
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    f = Symbol.for('react.portal');
  function d(g, y, _) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: b == null ? null : '' + b,
      children: g,
      containerInfo: y,
      implementation: _,
    };
  }
  var m = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, y) {
    if (g === 'font') return '';
    if (typeof y == 'string') return y === 'use-credentials' ? y : '';
  }
  return (
    (xe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (xe.createPortal = function (g, y) {
      var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(c(299));
      return d(g, y, null, _);
    }),
    (xe.flushSync = function (g) {
      var y = m.T,
        _ = r.p;
      try {
        if (((m.T = null), (r.p = 2), g)) return g();
      } finally {
        ((m.T = y), (r.p = _), r.d.f());
      }
    }),
    (xe.preconnect = function (g, y) {
      typeof g == 'string' &&
        (y
          ? ((y = y.crossOrigin),
            (y = typeof y == 'string' ? (y === 'use-credentials' ? y : '') : void 0))
          : (y = null),
        r.d.C(g, y));
    }),
    (xe.prefetchDNS = function (g) {
      typeof g == 'string' && r.d.D(g);
    }),
    (xe.preinit = function (g, y) {
      if (typeof g == 'string' && y && typeof y.as == 'string') {
        var _ = y.as,
          b = p(_, y.crossOrigin),
          A = typeof y.integrity == 'string' ? y.integrity : void 0,
          N = typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0;
        _ === 'style'
          ? r.d.S(g, typeof y.precedence == 'string' ? y.precedence : void 0, {
              crossOrigin: b,
              integrity: A,
              fetchPriority: N,
            })
          : _ === 'script' &&
            r.d.X(g, {
              crossOrigin: b,
              integrity: A,
              fetchPriority: N,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
      }
    }),
    (xe.preinitModule = function (g, y) {
      if (typeof g == 'string')
        if (typeof y == 'object' && y !== null) {
          if (y.as == null || y.as === 'script') {
            var _ = p(y.as, y.crossOrigin);
            r.d.M(g, {
              crossOrigin: _,
              integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
          }
        } else y == null && r.d.M(g);
    }),
    (xe.preload = function (g, y) {
      if (typeof g == 'string' && typeof y == 'object' && y !== null && typeof y.as == 'string') {
        var _ = y.as,
          b = p(_, y.crossOrigin);
        r.d.L(g, _, {
          crossOrigin: b,
          integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
          nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
          type: typeof y.type == 'string' ? y.type : void 0,
          fetchPriority: typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0,
          referrerPolicy: typeof y.referrerPolicy == 'string' ? y.referrerPolicy : void 0,
          imageSrcSet: typeof y.imageSrcSet == 'string' ? y.imageSrcSet : void 0,
          imageSizes: typeof y.imageSizes == 'string' ? y.imageSizes : void 0,
          media: typeof y.media == 'string' ? y.media : void 0,
        });
      }
    }),
    (xe.preloadModule = function (g, y) {
      if (typeof g == 'string')
        if (y) {
          var _ = p(y.as, y.crossOrigin);
          r.d.m(g, {
            as: typeof y.as == 'string' && y.as !== 'script' ? y.as : void 0,
            crossOrigin: _,
            integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
          });
        } else r.d.m(g);
    }),
    (xe.requestFormReset = function (g) {
      r.d.r(g);
    }),
    (xe.unstable_batchedUpdates = function (g, y) {
      return g(y);
    }),
    (xe.useFormState = function (g, y, _) {
      return m.H.useFormState(g, y, _);
    }),
    (xe.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (xe.version = '19.2.5'),
    xe
  );
}
var nh;
function tg() {
  if (nh) return yu.exports;
  nh = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (c) {
        console.error(c);
      }
  }
  return (l(), (yu.exports = Py()), yu.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var lh;
function eg() {
  if (lh) return cc;
  lh = 1;
  var l = Fy(),
    c = ku(),
    s = tg();
  function r(t) {
    var e = 'https://react.dev/errors/' + t;
    if (1 < arguments.length) {
      e += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++) e += '&args[]=' + encodeURIComponent(arguments[a]);
    }
    return (
      'Minified React error #' +
      t +
      '; visit ' +
      e +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function f(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function d(t) {
    var e = t,
      a = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do ((e = t), (e.flags & 4098) !== 0 && (a = e.return), (t = e.return));
      while (t);
    }
    return e.tag === 3 ? a : null;
  }
  function m(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (d(t) !== t) throw Error(r(188));
  }
  function y(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = d(t)), e === null)) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var a = t, n = e; ; ) {
      var i = a.return;
      if (i === null) break;
      var o = i.alternate;
      if (o === null) {
        if (((n = i.return), n !== null)) {
          a = n;
          continue;
        }
        break;
      }
      if (i.child === o.child) {
        for (o = i.child; o; ) {
          if (o === a) return (g(i), t);
          if (o === n) return (g(i), e);
          o = o.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== n.return) ((a = i), (n = o));
      else {
        for (var h = !1, v = i.child; v; ) {
          if (v === a) {
            ((h = !0), (a = i), (n = o));
            break;
          }
          if (v === n) {
            ((h = !0), (n = i), (a = o));
            break;
          }
          v = v.sibling;
        }
        if (!h) {
          for (v = o.child; v; ) {
            if (v === a) {
              ((h = !0), (a = o), (n = i));
              break;
            }
            if (v === n) {
              ((h = !0), (n = o), (a = i));
              break;
            }
            v = v.sibling;
          }
          if (!h) throw Error(r(189));
        }
      }
      if (a.alternate !== n) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? t : e;
  }
  function _(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = _(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var b = Object.assign,
    A = Symbol.for('react.element'),
    N = Symbol.for('react.transitional.element'),
    E = Symbol.for('react.portal'),
    q = Symbol.for('react.fragment'),
    $ = Symbol.for('react.strict_mode'),
    J = Symbol.for('react.profiler'),
    C = Symbol.for('react.consumer'),
    rt = Symbol.for('react.context'),
    Mt = Symbol.for('react.forward_ref'),
    Ct = Symbol.for('react.suspense'),
    Tt = Symbol.for('react.suspense_list'),
    it = Symbol.for('react.memo'),
    Lt = Symbol.for('react.lazy'),
    Ft = Symbol.for('react.activity'),
    Yt = Symbol.for('react.memo_cache_sentinel'),
    Kt = Symbol.iterator;
  function Qt(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (Kt && t[Kt]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var Me = Symbol.for('react.client.reference');
  function ee(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === Me ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case q:
        return 'Fragment';
      case J:
        return 'Profiler';
      case $:
        return 'StrictMode';
      case Ct:
        return 'Suspense';
      case Tt:
        return 'SuspenseList';
      case Ft:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case E:
          return 'Portal';
        case rt:
          return t.displayName || 'Context';
        case C:
          return (t._context.displayName || 'Context') + '.Consumer';
        case Mt:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case it:
          return ((e = t.displayName || null), e !== null ? e : ee(t.type) || 'Memo');
        case Lt:
          ((e = t._payload), (t = t._init));
          try {
            return ee(t(e));
          } catch {}
      }
    return null;
  }
  var It = Array.isArray,
    O = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Y = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    at = { pending: !1, data: null, method: null, action: null },
    bt = [],
    At = -1;
  function j(t) {
    return { current: t };
  }
  function H(t) {
    0 > At || ((t.current = bt[At]), (bt[At] = null), At--);
  }
  function k(t, e) {
    (At++, (bt[At] = t.current), (t.current = e));
  }
  var X = j(null),
    nt = j(null),
    K = j(null),
    vt = j(null);
  function Ut(t, e) {
    switch ((k(K, e), k(nt, t), k(X, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? _0(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = _0(e)), (t = b0(e, t)));
        else
          switch (t) {
            case 'svg':
              t = 1;
              break;
            case 'math':
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (H(X), k(X, t));
  }
  function _t() {
    (H(X), H(nt), H(K));
  }
  function Le(t) {
    t.memoizedState !== null && k(vt, t);
    var e = X.current,
      a = b0(e, t.type);
    e !== a && (k(nt, t), k(X, a));
  }
  function ya(t) {
    (nt.current === t && (H(X), H(nt)), vt.current === t && (H(vt), (ec._currentValue = at)));
  }
  var Aa, Ea;
  function Ye(t) {
    if (Aa === void 0)
      try {
        throw Error();
      } catch (a) {
        var e = a.stack.trim().match(/\n( *(at )?)/);
        ((Aa = (e && e[1]) || ''),
          (Ea =
            -1 <
            a.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < a.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''));
      }
    return (
      `
` +
      Aa +
      t +
      Ea
    );
  }
  var Bn = !1;
  function Dn(t, e) {
    if (!t || Bn) return '';
    Bn = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var U = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(U.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(U, []);
                } catch (R) {
                  var z = R;
                }
                Reflect.construct(t, [], U);
              } else {
                try {
                  U.call();
                } catch (R) {
                  z = R;
                }
                t.call(U.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                z = R;
              }
              (U = t()) && typeof U.catch == 'function' && U.catch(function () {});
            }
          } catch (R) {
            if (R && z && typeof R.stack == 'string') return [R.stack, z.stack];
          }
          return [null, null];
        },
      };
      n.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var i = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, 'name');
      i &&
        i.configurable &&
        Object.defineProperty(n.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var o = n.DetermineComponentFrameRoot(),
        h = o[0],
        v = o[1];
      if (h && v) {
        var S = h.split(`
`),
          w = v.split(`
`);
        for (i = n = 0; n < S.length && !S[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; i < w.length && !w[i].includes('DetermineComponentFrameRoot'); ) i++;
        if (n === S.length || i === w.length)
          for (n = S.length - 1, i = w.length - 1; 1 <= n && 0 <= i && S[n] !== w[i]; ) i--;
        for (; 1 <= n && 0 <= i; n--, i--)
          if (S[n] !== w[i]) {
            if (n !== 1 || i !== 1)
              do
                if ((n--, i--, 0 > i || S[n] !== w[i])) {
                  var B =
                    `
` + S[n].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      B.includes('<anonymous>') &&
                      (B = B.replace('<anonymous>', t.displayName)),
                    B
                  );
                }
              while (1 <= n && 0 <= i);
            break;
          }
      }
    } finally {
      ((Bn = !1), (Error.prepareStackTrace = a));
    }
    return (a = t ? t.displayName || t.name : '') ? Ye(a) : '';
  }
  function di(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ye(t.type);
      case 16:
        return Ye('Lazy');
      case 13:
        return t.child !== e && e !== null ? Ye('Suspense Fallback') : Ye('Suspense');
      case 19:
        return Ye('SuspenseList');
      case 0:
      case 15:
        return Dn(t.type, !1);
      case 11:
        return Dn(t.type.render, !1);
      case 1:
        return Dn(t.type, !0);
      case 31:
        return Ye('Activity');
      default:
        return '';
    }
  }
  function hl(t) {
    try {
      var e = '',
        a = null;
      do ((e += di(t, a)), (a = t), (t = t.return));
      while (t);
      return e;
    } catch (n) {
      return (
        `
Error generating stack: ` +
        n.message +
        `
` +
        n.stack
      );
    }
  }
  var Ln = Object.prototype.hasOwnProperty,
    Fa = l.unstable_scheduleCallback,
    Ma = l.unstable_cancelCallback,
    pl = l.unstable_shouldYield,
    mi = l.unstable_requestPaint,
    de = l.unstable_now,
    ga = l.unstable_getCurrentPriorityLevel,
    $n = l.unstable_ImmediatePriority,
    yl = l.unstable_UserBlockingPriority,
    ia = l.unstable_NormalPriority,
    va = l.unstable_LowPriority,
    Hn = l.unstable_IdlePriority,
    wa = l.log,
    I = l.unstable_setDisableYieldValue,
    we = null,
    ae = null;
  function _a(t) {
    if ((typeof wa == 'function' && I(t), ae && typeof ae.setStrictMode == 'function'))
      try {
        ae.setStrictMode(we, t);
      } catch {}
  }
  var ue = Math.clz32 ? Math.clz32 : ut,
    hi = Math.log,
    tt = Math.LN2;
  function ut(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((hi(t) / tt) | 0)) | 0);
  }
  var St = 256,
    qt = 262144,
    Vt = 4194304;
  function ne(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function wt(t, e, a) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var i = 0,
      o = t.suspendedLanes,
      h = t.pingedLanes;
    t = t.warmLanes;
    var v = n & 134217727;
    return (
      v !== 0
        ? ((n = v & ~o),
          n !== 0
            ? (i = ne(n))
            : ((h &= v), h !== 0 ? (i = ne(h)) : a || ((a = v & ~t), a !== 0 && (i = ne(a)))))
        : ((v = n & ~o),
          v !== 0
            ? (i = ne(v))
            : h !== 0
              ? (i = ne(h))
              : a || ((a = n & ~t), a !== 0 && (i = ne(a)))),
      i === 0
        ? 0
        : e !== 0 &&
            e !== i &&
            (e & o) === 0 &&
            ((o = i & -i), (a = e & -e), o >= a || (o === 32 && (a & 4194048) !== 0))
          ? e
          : i
    );
  }
  function ft(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Rt(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function le() {
    var t = Vt;
    return ((Vt <<= 1), (Vt & 62914560) === 0 && (Vt = 4194304), t);
  }
  function Na(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function Ia(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function pi(t, e, a, n, i, o) {
    var h = t.pendingLanes;
    ((t.pendingLanes = a),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= a),
      (t.entangledLanes &= a),
      (t.errorRecoveryDisabledLanes &= a),
      (t.shellSuspendCounter = 0));
    var v = t.entanglements,
      S = t.expirationTimes,
      w = t.hiddenUpdates;
    for (a = h & ~a; 0 < a; ) {
      var B = 31 - ue(a),
        U = 1 << B;
      ((v[B] = 0), (S[B] = -1));
      var z = w[B];
      if (z !== null)
        for (w[B] = null, B = 0; B < z.length; B++) {
          var R = z[B];
          R !== null && (R.lane &= -536870913);
        }
      a &= ~U;
    }
    (n !== 0 && tf(t, n, 0),
      o !== 0 && i === 0 && t.tag !== 0 && (t.suspendedLanes |= o & ~(h & ~e)));
  }
  function tf(t, e, a) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var n = 31 - ue(e);
    ((t.entangledLanes |= e),
      (t.entanglements[n] = t.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function ef(t, e) {
    var a = (t.entangledLanes |= e);
    for (t = t.entanglements; a; ) {
      var n = 31 - ue(a),
        i = 1 << n;
      ((i & e) | (t[n] & e) && (t[n] |= e), (a &= ~i));
    }
  }
  function af(t, e) {
    var a = e & -e;
    return ((a = (a & 42) !== 0 ? 1 : Ps(a)), (a & (t.suspendedLanes | e)) !== 0 ? 0 : a);
  }
  function Ps(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function to(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function nf() {
    var t = Y.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : G0(t.type));
  }
  function lf(t, e) {
    var a = Y.p;
    try {
      return ((Y.p = t), e());
    } finally {
      Y.p = a;
    }
  }
  var Pa = Math.random().toString(36).slice(2),
    ye = '__reactFiber$' + Pa,
    Ne = '__reactProps$' + Pa,
    gl = '__reactContainer$' + Pa,
    eo = '__reactEvents$' + Pa,
    B1 = '__reactListeners$' + Pa,
    D1 = '__reactHandles$' + Pa,
    cf = '__reactResources$' + Pa,
    yi = '__reactMarker$' + Pa;
  function ao(t) {
    (delete t[ye], delete t[Ne], delete t[eo], delete t[B1], delete t[D1]);
  }
  function vl(t) {
    var e = t[ye];
    if (e) return e;
    for (var a = t.parentNode; a; ) {
      if ((e = a[gl] || a[ye])) {
        if (((a = e.alternate), e.child !== null || (a !== null && a.child !== null)))
          for (t = M0(t); t !== null; ) {
            if ((a = t[ye])) return a;
            t = M0(t);
          }
        return e;
      }
      ((t = a), (a = t.parentNode));
    }
    return null;
  }
  function _l(t) {
    if ((t = t[ye] || t[gl])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function gi(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function bl(t) {
    var e = t[cf];
    return (e || (e = t[cf] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function me(t) {
    t[yi] = !0;
  }
  var sf = new Set(),
    of = {};
  function Un(t, e) {
    (Sl(t, e), Sl(t + 'Capture', e));
  }
  function Sl(t, e) {
    for (of[t] = e, t = 0; t < e.length; t++) sf.add(e[t]);
  }
  var L1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    rf = {},
    uf = {};
  function $1(t) {
    return Ln.call(uf, t)
      ? !0
      : Ln.call(rf, t)
        ? !1
        : L1.test(t)
          ? (uf[t] = !0)
          : ((rf[t] = !0), !1);
  }
  function Ec(t, e, a) {
    if ($1(e))
      if (a === null) t.removeAttribute(e);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
            t.removeAttribute(e);
            return;
          case 'boolean':
            var n = e.toLowerCase().slice(0, 5);
            if (n !== 'data-' && n !== 'aria-') {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, '' + a);
      }
  }
  function Mc(t, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, '' + a);
    }
  }
  function za(t, e, a, n) {
    if (n === null) t.removeAttribute(a);
    else {
      switch (typeof n) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(e, a, '' + n);
    }
  }
  function Xe(t) {
    switch (typeof t) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return t;
      case 'object':
        return t;
      default:
        return '';
    }
  }
  function ff(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function H1(t, e, a) {
    var n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var i = n.get,
        o = n.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return i.call(this);
          },
          set: function (h) {
            ((a = '' + h), o.call(this, h));
          },
        }),
        Object.defineProperty(t, e, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (h) {
            a = '' + h;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function no(t) {
    if (!t._valueTracker) {
      var e = ff(t) ? 'checked' : 'value';
      t._valueTracker = H1(t, e, '' + t[e]);
    }
  }
  function df(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(),
      n = '';
    return (
      t && (n = ff(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = n),
      t !== a ? (e.setValue(t), !0) : !1
    );
  }
  function wc(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var U1 = /[\n"\\]/g;
  function Ke(t) {
    return t.replace(U1, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function lo(t, e, a, n, i, o, h, v) {
    ((t.name = ''),
      h != null && typeof h != 'function' && typeof h != 'symbol' && typeof h != 'boolean'
        ? (t.type = h)
        : t.removeAttribute('type'),
      e != null
        ? h === 'number'
          ? ((e === 0 && t.value === '') || t.value != e) && (t.value = '' + Xe(e))
          : t.value !== '' + Xe(e) && (t.value = '' + Xe(e))
        : (h !== 'submit' && h !== 'reset') || t.removeAttribute('value'),
      e != null
        ? io(t, h, Xe(e))
        : a != null
          ? io(t, h, Xe(a))
          : n != null && t.removeAttribute('value'),
      i == null && o != null && (t.defaultChecked = !!o),
      i != null && (t.checked = i && typeof i != 'function' && typeof i != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (t.name = '' + Xe(v))
        : t.removeAttribute('name'));
  }
  function mf(t, e, a, n, i, o, h, v) {
    if (
      (o != null &&
        typeof o != 'function' &&
        typeof o != 'symbol' &&
        typeof o != 'boolean' &&
        (t.type = o),
      e != null || a != null)
    ) {
      if (!((o !== 'submit' && o !== 'reset') || e != null)) {
        no(t);
        return;
      }
      ((a = a != null ? '' + Xe(a) : ''),
        (e = e != null ? '' + Xe(e) : a),
        v || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((n = n ?? i),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (t.checked = v ? t.checked : !!n),
      (t.defaultChecked = !!n),
      h != null &&
        typeof h != 'function' &&
        typeof h != 'symbol' &&
        typeof h != 'boolean' &&
        (t.name = h),
      no(t));
  }
  function io(t, e, a) {
    (e === 'number' && wc(t.ownerDocument) === t) ||
      t.defaultValue === '' + a ||
      (t.defaultValue = '' + a);
  }
  function xl(t, e, a, n) {
    if (((t = t.options), e)) {
      e = {};
      for (var i = 0; i < a.length; i++) e['$' + a[i]] = !0;
      for (a = 0; a < t.length; a++)
        ((i = e.hasOwnProperty('$' + t[a].value)),
          t[a].selected !== i && (t[a].selected = i),
          i && n && (t[a].defaultSelected = !0));
    } else {
      for (a = '' + Xe(a), e = null, i = 0; i < t.length; i++) {
        if (t[i].value === a) {
          ((t[i].selected = !0), n && (t[i].defaultSelected = !0));
          return;
        }
        e !== null || t[i].disabled || (e = t[i]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function hf(t, e, a) {
    if (e != null && ((e = '' + Xe(e)), e !== t.value && (t.value = e), a == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? '' + Xe(a) : '';
  }
  function pf(t, e, a, n) {
    if (e == null) {
      if (n != null) {
        if (a != null) throw Error(r(92));
        if (It(n)) {
          if (1 < n.length) throw Error(r(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (e = a));
    }
    ((a = Xe(e)),
      (t.defaultValue = a),
      (n = t.textContent),
      n === a && n !== '' && n !== null && (t.value = n),
      no(t));
  }
  function jl(t, e) {
    if (e) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var q1 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function yf(t, e, a) {
    var n = e.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : n
        ? t.setProperty(e, a)
        : typeof a != 'number' || a === 0 || q1.has(e)
          ? e === 'float'
            ? (t.cssFloat = a)
            : (t[e] = ('' + a).trim())
          : (t[e] = a + 'px');
  }
  function gf(t, e, a) {
    if (e != null && typeof e != 'object') throw Error(r(62));
    if (((t = t.style), a != null)) {
      for (var n in a)
        !a.hasOwnProperty(n) ||
          (e != null && e.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? t.setProperty(n, '')
            : n === 'float'
              ? (t.cssFloat = '')
              : (t[n] = ''));
      for (var i in e) ((n = e[i]), e.hasOwnProperty(i) && a[i] !== n && yf(t, i, n));
    } else for (var o in e) e.hasOwnProperty(o) && yf(t, o, e[o]);
  }
  function co(t) {
    if (t.indexOf('-') === -1) return !1;
    switch (t) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var k1 = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    V1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Nc(t) {
    return V1.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Ca() {}
  var so = null;
  function oo(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Tl = null,
    Al = null;
  function vf(t) {
    var e = _l(t);
    if (e && (t = e.stateNode)) {
      var a = t[Ne] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (lo(
              t,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (e = a.name),
            a.type === 'radio' && e != null)
          ) {
            for (a = t; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll('input[name="' + Ke('' + e) + '"][type="radio"]'), e = 0;
              e < a.length;
              e++
            ) {
              var n = a[e];
              if (n !== t && n.form === t.form) {
                var i = n[Ne] || null;
                if (!i) throw Error(r(90));
                lo(
                  n,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (e = 0; e < a.length; e++) ((n = a[e]), n.form === t.form && df(n));
          }
          break t;
        case 'textarea':
          hf(t, a.value, a.defaultValue);
          break t;
        case 'select':
          ((e = a.value), e != null && xl(t, !!a.multiple, e, !1));
      }
    }
  }
  var ro = !1;
  function _f(t, e, a) {
    if (ro) return t(e, a);
    ro = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (
        ((ro = !1),
        (Tl !== null || Al !== null) &&
          (ys(), Tl && ((e = Tl), (t = Al), (Al = Tl = null), vf(e), t)))
      )
        for (e = 0; e < t.length; e++) vf(t[e]);
    }
  }
  function vi(t, e) {
    var a = t.stateNode;
    if (a === null) return null;
    var n = a[Ne] || null;
    if (n === null) return null;
    a = n[e];
    t: switch (e) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ((n = !n.disabled) ||
          ((t = t.type),
          (n = !(t === 'button' || t === 'input' || t === 'select' || t === 'textarea'))),
          (t = !n));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != 'function') throw Error(r(231, e, typeof a));
    return a;
  }
  var Ra = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    uo = !1;
  if (Ra)
    try {
      var _i = {};
      (Object.defineProperty(_i, 'passive', {
        get: function () {
          uo = !0;
        },
      }),
        window.addEventListener('test', _i, _i),
        window.removeEventListener('test', _i, _i));
    } catch {
      uo = !1;
    }
  var tn = null,
    fo = null,
    zc = null;
  function bf() {
    if (zc) return zc;
    var t,
      e = fo,
      a = e.length,
      n,
      i = 'value' in tn ? tn.value : tn.textContent,
      o = i.length;
    for (t = 0; t < a && e[t] === i[t]; t++);
    var h = a - t;
    for (n = 1; n <= h && e[a - n] === i[o - n]; n++);
    return (zc = i.slice(t, 1 < n ? 1 - n : void 0));
  }
  function Cc(t) {
    var e = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Rc() {
    return !0;
  }
  function Sf() {
    return !1;
  }
  function ze(t) {
    function e(a, n, i, o, h) {
      ((this._reactName = a),
        (this._targetInst = i),
        (this.type = n),
        (this.nativeEvent = o),
        (this.target = h),
        (this.currentTarget = null));
      for (var v in t) t.hasOwnProperty(v) && ((a = t[v]), (this[v] = a ? a(o) : o[v]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? Rc
          : Sf),
        (this.isPropagationStopped = Sf),
        this
      );
    }
    return (
      b(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = Rc));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Rc));
        },
        persist: function () {},
        isPersistent: Rc,
      }),
      e
    );
  }
  var qn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Oc = ze(qn),
    bi = b({}, qn, { view: 0, detail: 0 }),
    G1 = ze(bi),
    mo,
    ho,
    Si,
    Bc = b({}, bi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: yo,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return 'movementX' in t
          ? t.movementX
          : (t !== Si &&
              (Si && t.type === 'mousemove'
                ? ((mo = t.screenX - Si.screenX), (ho = t.screenY - Si.screenY))
                : (ho = mo = 0),
              (Si = t)),
            mo);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : ho;
      },
    }),
    xf = ze(Bc),
    Z1 = b({}, Bc, { dataTransfer: 0 }),
    Y1 = ze(Z1),
    X1 = b({}, bi, { relatedTarget: 0 }),
    po = ze(X1),
    K1 = b({}, qn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Q1 = ze(K1),
    W1 = b({}, qn, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    J1 = ze(W1),
    F1 = b({}, qn, { data: 0 }),
    jf = ze(F1),
    I1 = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    P1 = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    tp = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function ep(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = tp[t]) ? !!e[t] : !1;
  }
  function yo() {
    return ep;
  }
  var ap = b({}, bi, {
      key: function (t) {
        if (t.key) {
          var e = I1[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = Cc(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? P1[t.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: yo,
      charCode: function (t) {
        return t.type === 'keypress' ? Cc(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? Cc(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    np = ze(ap),
    lp = b({}, Bc, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Tf = ze(lp),
    ip = b({}, bi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: yo,
    }),
    cp = ze(ip),
    sp = b({}, qn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    op = ze(sp),
    rp = b({}, Bc, {
      deltaX: function (t) {
        return 'deltaX' in t ? t.deltaX : 'wheelDeltaX' in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function (t) {
        return 'deltaY' in t
          ? t.deltaY
          : 'wheelDeltaY' in t
            ? -t.wheelDeltaY
            : 'wheelDelta' in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    up = ze(rp),
    fp = b({}, qn, { newState: 0, oldState: 0 }),
    dp = ze(fp),
    mp = [9, 13, 27, 32],
    go = Ra && 'CompositionEvent' in window,
    xi = null;
  Ra && 'documentMode' in document && (xi = document.documentMode);
  var hp = Ra && 'TextEvent' in window && !xi,
    Af = Ra && (!go || (xi && 8 < xi && 11 >= xi)),
    Ef = ' ',
    Mf = !1;
  function wf(t, e) {
    switch (t) {
      case 'keyup':
        return mp.indexOf(e.keyCode) !== -1;
      case 'keydown':
        return e.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function Nf(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var El = !1;
  function pp(t, e) {
    switch (t) {
      case 'compositionend':
        return Nf(e);
      case 'keypress':
        return e.which !== 32 ? null : ((Mf = !0), Ef);
      case 'textInput':
        return ((t = e.data), t === Ef && Mf ? null : t);
      default:
        return null;
    }
  }
  function yp(t, e) {
    if (El)
      return t === 'compositionend' || (!go && wf(t, e))
        ? ((t = bf()), (zc = fo = tn = null), (El = !1), t)
        : null;
    switch (t) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case 'compositionend':
        return Af && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var gp = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function zf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === 'input' ? !!gp[t.type] : e === 'textarea';
  }
  function Cf(t, e, a, n) {
    (Tl ? (Al ? Al.push(n) : (Al = [n])) : (Tl = n),
      (e = js(e, 'onChange')),
      0 < e.length &&
        ((a = new Oc('onChange', 'change', null, a, n)), t.push({ event: a, listeners: e })));
  }
  var ji = null,
    Ti = null;
  function vp(t) {
    m0(t, 0);
  }
  function Dc(t) {
    var e = gi(t);
    if (df(e)) return t;
  }
  function Rf(t, e) {
    if (t === 'change') return e;
  }
  var Of = !1;
  if (Ra) {
    var vo;
    if (Ra) {
      var _o = 'oninput' in document;
      if (!_o) {
        var Bf = document.createElement('div');
        (Bf.setAttribute('oninput', 'return;'), (_o = typeof Bf.oninput == 'function'));
      }
      vo = _o;
    } else vo = !1;
    Of = vo && (!document.documentMode || 9 < document.documentMode);
  }
  function Df() {
    ji && (ji.detachEvent('onpropertychange', Lf), (Ti = ji = null));
  }
  function Lf(t) {
    if (t.propertyName === 'value' && Dc(Ti)) {
      var e = [];
      (Cf(e, Ti, t, oo(t)), _f(vp, e));
    }
  }
  function _p(t, e, a) {
    t === 'focusin'
      ? (Df(), (ji = e), (Ti = a), ji.attachEvent('onpropertychange', Lf))
      : t === 'focusout' && Df();
  }
  function bp(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return Dc(Ti);
  }
  function Sp(t, e) {
    if (t === 'click') return Dc(e);
  }
  function xp(t, e) {
    if (t === 'input' || t === 'change') return Dc(e);
  }
  function jp(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var $e = typeof Object.is == 'function' ? Object.is : jp;
  function Ai(t, e) {
    if ($e(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var a = Object.keys(t),
      n = Object.keys(e);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var i = a[n];
      if (!Ln.call(e, i) || !$e(t[i], e[i])) return !1;
    }
    return !0;
  }
  function $f(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Hf(t, e) {
    var a = $f(t);
    t = 0;
    for (var n; a; ) {
      if (a.nodeType === 3) {
        if (((n = t + a.textContent.length), t <= e && n >= e)) return { node: a, offset: e - t };
        t = n;
      }
      t: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break t;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = $f(a);
    }
  }
  function Uf(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? Uf(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function qf(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = wc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow;
      else break;
      e = wc(t.document);
    }
    return e;
  }
  function bo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === 'input' &&
        (t.type === 'text' ||
          t.type === 'search' ||
          t.type === 'tel' ||
          t.type === 'url' ||
          t.type === 'password')) ||
        e === 'textarea' ||
        t.contentEditable === 'true')
    );
  }
  var Tp = Ra && 'documentMode' in document && 11 >= document.documentMode,
    Ml = null,
    So = null,
    Ei = null,
    xo = !1;
  function kf(t, e, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    xo ||
      Ml == null ||
      Ml !== wc(n) ||
      ((n = Ml),
      'selectionStart' in n && bo(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Ei && Ai(Ei, n)) ||
        ((Ei = n),
        (n = js(So, 'onSelect')),
        0 < n.length &&
          ((e = new Oc('onSelect', 'select', null, e, a)),
          t.push({ event: e, listeners: n }),
          (e.target = Ml))));
  }
  function kn(t, e) {
    var a = {};
    return (
      (a[t.toLowerCase()] = e.toLowerCase()),
      (a['Webkit' + t] = 'webkit' + e),
      (a['Moz' + t] = 'moz' + e),
      a
    );
  }
  var wl = {
      animationend: kn('Animation', 'AnimationEnd'),
      animationiteration: kn('Animation', 'AnimationIteration'),
      animationstart: kn('Animation', 'AnimationStart'),
      transitionrun: kn('Transition', 'TransitionRun'),
      transitionstart: kn('Transition', 'TransitionStart'),
      transitioncancel: kn('Transition', 'TransitionCancel'),
      transitionend: kn('Transition', 'TransitionEnd'),
    },
    jo = {},
    Vf = {};
  Ra &&
    ((Vf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete wl.animationend.animation,
      delete wl.animationiteration.animation,
      delete wl.animationstart.animation),
    'TransitionEvent' in window || delete wl.transitionend.transition);
  function Vn(t) {
    if (jo[t]) return jo[t];
    if (!wl[t]) return t;
    var e = wl[t],
      a;
    for (a in e) if (e.hasOwnProperty(a) && a in Vf) return (jo[t] = e[a]);
    return t;
  }
  var Gf = Vn('animationend'),
    Zf = Vn('animationiteration'),
    Yf = Vn('animationstart'),
    Ap = Vn('transitionrun'),
    Ep = Vn('transitionstart'),
    Mp = Vn('transitioncancel'),
    Xf = Vn('transitionend'),
    Kf = new Map(),
    To =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  To.push('scrollEnd');
  function ca(t, e) {
    (Kf.set(t, e), Un(e, [t]));
  }
  var Lc =
      typeof reportError == 'function'
        ? reportError
        : function (t) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var e = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == 'object' && t !== null && typeof t.message == 'string'
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', t);
              return;
            }
            console.error(t);
          },
    Qe = [],
    Nl = 0,
    Ao = 0;
  function $c() {
    for (var t = Nl, e = (Ao = Nl = 0); e < t; ) {
      var a = Qe[e];
      Qe[e++] = null;
      var n = Qe[e];
      Qe[e++] = null;
      var i = Qe[e];
      Qe[e++] = null;
      var o = Qe[e];
      if (((Qe[e++] = null), n !== null && i !== null)) {
        var h = n.pending;
        (h === null ? (i.next = i) : ((i.next = h.next), (h.next = i)), (n.pending = i));
      }
      o !== 0 && Qf(a, i, o);
    }
  }
  function Hc(t, e, a, n) {
    ((Qe[Nl++] = t),
      (Qe[Nl++] = e),
      (Qe[Nl++] = a),
      (Qe[Nl++] = n),
      (Ao |= n),
      (t.lanes |= n),
      (t = t.alternate),
      t !== null && (t.lanes |= n));
  }
  function Eo(t, e, a, n) {
    return (Hc(t, e, a, n), Uc(t));
  }
  function Gn(t, e) {
    return (Hc(t, null, null, e), Uc(t));
  }
  function Qf(t, e, a) {
    t.lanes |= a;
    var n = t.alternate;
    n !== null && (n.lanes |= a);
    for (var i = !1, o = t.return; o !== null; )
      ((o.childLanes |= a),
        (n = o.alternate),
        n !== null && (n.childLanes |= a),
        o.tag === 22 && ((t = o.stateNode), t === null || t._visibility & 1 || (i = !0)),
        (t = o),
        (o = o.return));
    return t.tag === 3
      ? ((o = t.stateNode),
        i &&
          e !== null &&
          ((i = 31 - ue(a)),
          (t = o.hiddenUpdates),
          (n = t[i]),
          n === null ? (t[i] = [e]) : n.push(e),
          (e.lane = a | 536870912)),
        o)
      : null;
  }
  function Uc(t) {
    if (50 < Qi) throw ((Qi = 0), (Dr = null), Error(r(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var zl = {};
  function wp(t, e, a, n) {
    ((this.tag = t),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = n),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function He(t, e, a, n) {
    return new wp(t, e, a, n);
  }
  function Mo(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Oa(t, e) {
    var a = t.alternate;
    return (
      a === null
        ? ((a = He(t.tag, e, t.key, t.mode)),
          (a.elementType = t.elementType),
          (a.type = t.type),
          (a.stateNode = t.stateNode),
          (a.alternate = t),
          (t.alternate = a))
        : ((a.pendingProps = e),
          (a.type = t.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = t.flags & 65011712),
      (a.childLanes = t.childLanes),
      (a.lanes = t.lanes),
      (a.child = t.child),
      (a.memoizedProps = t.memoizedProps),
      (a.memoizedState = t.memoizedState),
      (a.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (a.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (a.sibling = t.sibling),
      (a.index = t.index),
      (a.ref = t.ref),
      (a.refCleanup = t.refCleanup),
      a
    );
  }
  function Wf(t, e) {
    t.flags &= 65011714;
    var a = t.alternate;
    return (
      a === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = a.childLanes),
          (t.lanes = a.lanes),
          (t.child = a.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = a.memoizedProps),
          (t.memoizedState = a.memoizedState),
          (t.updateQueue = a.updateQueue),
          (t.type = a.type),
          (e = a.dependencies),
          (t.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function qc(t, e, a, n, i, o) {
    var h = 0;
    if (((n = t), typeof t == 'function')) Mo(t) && (h = 1);
    else if (typeof t == 'string')
      h = Oy(t, a, X.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case Ft:
          return ((t = He(31, a, e, i)), (t.elementType = Ft), (t.lanes = o), t);
        case q:
          return Zn(a.children, i, o, e);
        case $:
          ((h = 8), (i |= 24));
          break;
        case J:
          return ((t = He(12, a, e, i | 2)), (t.elementType = J), (t.lanes = o), t);
        case Ct:
          return ((t = He(13, a, e, i)), (t.elementType = Ct), (t.lanes = o), t);
        case Tt:
          return ((t = He(19, a, e, i)), (t.elementType = Tt), (t.lanes = o), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case rt:
                h = 10;
                break t;
              case C:
                h = 9;
                break t;
              case Mt:
                h = 11;
                break t;
              case it:
                h = 14;
                break t;
              case Lt:
                ((h = 16), (n = null));
                break t;
            }
          ((h = 29), (a = Error(r(130, t === null ? 'null' : typeof t, ''))), (n = null));
      }
    return ((e = He(h, a, e, i)), (e.elementType = t), (e.type = n), (e.lanes = o), e);
  }
  function Zn(t, e, a, n) {
    return ((t = He(7, t, n, e)), (t.lanes = a), t);
  }
  function wo(t, e, a) {
    return ((t = He(6, t, null, e)), (t.lanes = a), t);
  }
  function Jf(t) {
    var e = He(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function No(t, e, a) {
    return (
      (e = He(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = a),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var Ff = new WeakMap();
  function We(t, e) {
    if (typeof t == 'object' && t !== null) {
      var a = Ff.get(t);
      return a !== void 0 ? a : ((e = { value: t, source: e, stack: hl(e) }), Ff.set(t, e), e);
    }
    return { value: t, source: e, stack: hl(e) };
  }
  var Cl = [],
    Rl = 0,
    kc = null,
    Mi = 0,
    Je = [],
    Fe = 0,
    en = null,
    ba = 1,
    Sa = '';
  function Ba(t, e) {
    ((Cl[Rl++] = Mi), (Cl[Rl++] = kc), (kc = t), (Mi = e));
  }
  function If(t, e, a) {
    ((Je[Fe++] = ba), (Je[Fe++] = Sa), (Je[Fe++] = en), (en = t));
    var n = ba;
    t = Sa;
    var i = 32 - ue(n) - 1;
    ((n &= ~(1 << i)), (a += 1));
    var o = 32 - ue(e) + i;
    if (30 < o) {
      var h = i - (i % 5);
      ((o = (n & ((1 << h) - 1)).toString(32)),
        (n >>= h),
        (i -= h),
        (ba = (1 << (32 - ue(e) + i)) | (a << i) | n),
        (Sa = o + t));
    } else ((ba = (1 << o) | (a << i) | n), (Sa = t));
  }
  function zo(t) {
    t.return !== null && (Ba(t, 1), If(t, 1, 0));
  }
  function Co(t) {
    for (; t === kc; ) ((kc = Cl[--Rl]), (Cl[Rl] = null), (Mi = Cl[--Rl]), (Cl[Rl] = null));
    for (; t === en; )
      ((en = Je[--Fe]),
        (Je[Fe] = null),
        (Sa = Je[--Fe]),
        (Je[Fe] = null),
        (ba = Je[--Fe]),
        (Je[Fe] = null));
  }
  function Pf(t, e) {
    ((Je[Fe++] = ba), (Je[Fe++] = Sa), (Je[Fe++] = en), (ba = e.id), (Sa = e.overflow), (en = t));
  }
  var ge = null,
    Gt = null,
    gt = !1,
    an = null,
    Ie = !1,
    Ro = Error(r(519));
  function nn(t) {
    var e = Error(
      r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (wi(We(e, t)), Ro);
  }
  function td(t) {
    var e = t.stateNode,
      a = t.type,
      n = t.memoizedProps;
    switch (((e[ye] = t), (e[Ne] = n), a)) {
      case 'dialog':
        (mt('cancel', e), mt('close', e));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        mt('load', e);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Ji.length; a++) mt(Ji[a], e);
        break;
      case 'source':
        mt('error', e);
        break;
      case 'img':
      case 'image':
      case 'link':
        (mt('error', e), mt('load', e));
        break;
      case 'details':
        mt('toggle', e);
        break;
      case 'input':
        (mt('invalid', e),
          mf(e, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        mt('invalid', e);
        break;
      case 'textarea':
        (mt('invalid', e), pf(e, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      e.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      g0(e.textContent, a)
        ? (n.popover != null && (mt('beforetoggle', e), mt('toggle', e)),
          n.onScroll != null && mt('scroll', e),
          n.onScrollEnd != null && mt('scrollend', e),
          n.onClick != null && (e.onclick = Ca),
          (e = !0))
        : (e = !1),
      e || nn(t, !0));
  }
  function ed(t) {
    for (ge = t.return; ge; )
      switch (ge.tag) {
        case 5:
        case 31:
        case 13:
          Ie = !1;
          return;
        case 27:
        case 3:
          Ie = !0;
          return;
        default:
          ge = ge.return;
      }
  }
  function Ol(t) {
    if (t !== ge) return !1;
    if (!gt) return (ed(t), (gt = !0), !1);
    var e = t.tag,
      a;
    if (
      ((a = e !== 3 && e !== 27) &&
        ((a = e === 5) &&
          ((a = t.type), (a = !(a !== 'form' && a !== 'button') || Jr(t.type, t.memoizedProps))),
        (a = !a)),
      a && Gt && nn(t),
      ed(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(r(317));
      Gt = E0(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(r(317));
      Gt = E0(t);
    } else
      e === 27
        ? ((e = Gt), vn(t.type) ? ((t = eu), (eu = null), (Gt = t)) : (Gt = e))
        : (Gt = ge ? ta(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Yn() {
    ((Gt = ge = null), (gt = !1));
  }
  function Oo() {
    var t = an;
    return (t !== null && (Be === null ? (Be = t) : Be.push.apply(Be, t), (an = null)), t);
  }
  function wi(t) {
    an === null ? (an = [t]) : an.push(t);
  }
  var Bo = j(null),
    Xn = null,
    Da = null;
  function ln(t, e, a) {
    (k(Bo, e._currentValue), (e._currentValue = a));
  }
  function La(t) {
    ((t._currentValue = Bo.current), H(Bo));
  }
  function Do(t, e, a) {
    for (; t !== null; ) {
      var n = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), n !== null && (n.childLanes |= e))
          : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e),
        t === a)
      )
        break;
      t = t.return;
    }
  }
  function Lo(t, e, a, n) {
    var i = t.child;
    for (i !== null && (i.return = t); i !== null; ) {
      var o = i.dependencies;
      if (o !== null) {
        var h = i.child;
        o = o.firstContext;
        t: for (; o !== null; ) {
          var v = o;
          o = i;
          for (var S = 0; S < e.length; S++)
            if (v.context === e[S]) {
              ((o.lanes |= a),
                (v = o.alternate),
                v !== null && (v.lanes |= a),
                Do(o.return, a, t),
                n || (h = null));
              break t;
            }
          o = v.next;
        }
      } else if (i.tag === 18) {
        if (((h = i.return), h === null)) throw Error(r(341));
        ((h.lanes |= a), (o = h.alternate), o !== null && (o.lanes |= a), Do(h, a, t), (h = null));
      } else h = i.child;
      if (h !== null) h.return = i;
      else
        for (h = i; h !== null; ) {
          if (h === t) {
            h = null;
            break;
          }
          if (((i = h.sibling), i !== null)) {
            ((i.return = h.return), (h = i));
            break;
          }
          h = h.return;
        }
      i = h;
    }
  }
  function Bl(t, e, a, n) {
    t = null;
    for (var i = e, o = !1; i !== null; ) {
      if (!o) {
        if ((i.flags & 524288) !== 0) o = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var h = i.alternate;
        if (h === null) throw Error(r(387));
        if (((h = h.memoizedProps), h !== null)) {
          var v = i.type;
          $e(i.pendingProps.value, h.value) || (t !== null ? t.push(v) : (t = [v]));
        }
      } else if (i === vt.current) {
        if (((h = i.alternate), h === null)) throw Error(r(387));
        h.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
          (t !== null ? t.push(ec) : (t = [ec]));
      }
      i = i.return;
    }
    (t !== null && Lo(e, t, a, n), (e.flags |= 262144));
  }
  function Vc(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!$e(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Kn(t) {
    ((Xn = t), (Da = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function ve(t) {
    return ad(Xn, t);
  }
  function Gc(t, e) {
    return (Xn === null && Kn(t), ad(t, e));
  }
  function ad(t, e) {
    var a = e._currentValue;
    if (((e = { context: e, memoizedValue: a, next: null }), Da === null)) {
      if (t === null) throw Error(r(308));
      ((Da = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else Da = Da.next = e;
    return a;
  }
  var Np =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (a, n) {
                  t.push(n);
                },
              });
            this.abort = function () {
              ((e.aborted = !0),
                t.forEach(function (a) {
                  return a();
                }));
            };
          },
    zp = l.unstable_scheduleCallback,
    Cp = l.unstable_NormalPriority,
    ie = {
      $$typeof: rt,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function $o() {
    return { controller: new Np(), data: new Map(), refCount: 0 };
  }
  function Ni(t) {
    (t.refCount--,
      t.refCount === 0 &&
        zp(Cp, function () {
          t.controller.abort();
        }));
  }
  var zi = null,
    Ho = 0,
    Dl = 0,
    Ll = null;
  function Rp(t, e) {
    if (zi === null) {
      var a = (zi = []);
      ((Ho = 0),
        (Dl = kr()),
        (Ll = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (Ho++, e.then(nd, nd), e);
  }
  function nd() {
    if (--Ho === 0 && zi !== null) {
      Ll !== null && (Ll.status = 'fulfilled');
      var t = zi;
      ((zi = null), (Dl = 0), (Ll = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Op(t, e) {
    var a = [],
      n = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (i) {
          a.push(i);
        },
      };
    return (
      t.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = e));
          for (var i = 0; i < a.length; i++) (0, a[i])(e);
        },
        function (i) {
          for (n.status = 'rejected', n.reason = i, i = 0; i < a.length; i++) (0, a[i])(void 0);
        }
      ),
      n
    );
  }
  var ld = O.S;
  O.S = function (t, e) {
    ((km = de()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && Rp(t, e),
      ld !== null && ld(t, e));
  };
  var Qn = j(null);
  function Uo() {
    var t = Qn.current;
    return t !== null ? t : $t.pooledCache;
  }
  function Zc(t, e) {
    e === null ? k(Qn, Qn.current) : k(Qn, e.pool);
  }
  function id() {
    var t = Uo();
    return t === null ? null : { parent: ie._currentValue, pool: t };
  }
  var $l = Error(r(460)),
    qo = Error(r(474)),
    Yc = Error(r(542)),
    Xc = { then: function () {} };
  function cd(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function sd(t, e, a) {
    switch (
      ((a = t[a]), a === void 0 ? t.push(e) : a !== e && (e.then(Ca, Ca), (e = a)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), rd(t), t);
      default:
        if (typeof e.status == 'string') e.then(Ca, Ca);
        else {
          if (((t = $t), t !== null && 100 < t.shellSuspendCounter)) throw Error(r(482));
          ((t = e),
            (t.status = 'pending'),
            t.then(
              function (n) {
                if (e.status === 'pending') {
                  var i = e;
                  ((i.status = 'fulfilled'), (i.value = n));
                }
              },
              function (n) {
                if (e.status === 'pending') {
                  var i = e;
                  ((i.status = 'rejected'), (i.reason = n));
                }
              }
            ));
        }
        switch (e.status) {
          case 'fulfilled':
            return e.value;
          case 'rejected':
            throw ((t = e.reason), rd(t), t);
        }
        throw ((Jn = e), $l);
    }
  }
  function Wn(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((Jn = a), $l) : a;
    }
  }
  var Jn = null;
  function od() {
    if (Jn === null) throw Error(r(459));
    var t = Jn;
    return ((Jn = null), t);
  }
  function rd(t) {
    if (t === $l || t === Yc) throw Error(r(483));
  }
  var Hl = null,
    Ci = 0;
  function Kc(t) {
    var e = Ci;
    return ((Ci += 1), Hl === null && (Hl = []), sd(Hl, t, e));
  }
  function Ri(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function Qc(t, e) {
    throw e.$$typeof === A
      ? Error(r(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          r(
            31,
            t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t
          )
        ));
  }
  function ud(t) {
    function e(T, x) {
      if (t) {
        var M = T.deletions;
        M === null ? ((T.deletions = [x]), (T.flags |= 16)) : M.push(x);
      }
    }
    function a(T, x) {
      if (!t) return null;
      for (; x !== null; ) (e(T, x), (x = x.sibling));
      return null;
    }
    function n(T) {
      for (var x = new Map(); T !== null; )
        (T.key !== null ? x.set(T.key, T) : x.set(T.index, T), (T = T.sibling));
      return x;
    }
    function i(T, x) {
      return ((T = Oa(T, x)), (T.index = 0), (T.sibling = null), T);
    }
    function o(T, x, M) {
      return (
        (T.index = M),
        t
          ? ((M = T.alternate),
            M !== null
              ? ((M = M.index), M < x ? ((T.flags |= 67108866), x) : M)
              : ((T.flags |= 67108866), x))
          : ((T.flags |= 1048576), x)
      );
    }
    function h(T) {
      return (t && T.alternate === null && (T.flags |= 67108866), T);
    }
    function v(T, x, M, L) {
      return x === null || x.tag !== 6
        ? ((x = wo(M, T.mode, L)), (x.return = T), x)
        : ((x = i(x, M)), (x.return = T), x);
    }
    function S(T, x, M, L) {
      var et = M.type;
      return et === q
        ? B(T, x, M.props.children, L, M.key)
        : x !== null &&
            (x.elementType === et ||
              (typeof et == 'object' && et !== null && et.$$typeof === Lt && Wn(et) === x.type))
          ? ((x = i(x, M.props)), Ri(x, M), (x.return = T), x)
          : ((x = qc(M.type, M.key, M.props, null, T.mode, L)), Ri(x, M), (x.return = T), x);
    }
    function w(T, x, M, L) {
      return x === null ||
        x.tag !== 4 ||
        x.stateNode.containerInfo !== M.containerInfo ||
        x.stateNode.implementation !== M.implementation
        ? ((x = No(M, T.mode, L)), (x.return = T), x)
        : ((x = i(x, M.children || [])), (x.return = T), x);
    }
    function B(T, x, M, L, et) {
      return x === null || x.tag !== 7
        ? ((x = Zn(M, T.mode, L, et)), (x.return = T), x)
        : ((x = i(x, M)), (x.return = T), x);
    }
    function U(T, x, M) {
      if ((typeof x == 'string' && x !== '') || typeof x == 'number' || typeof x == 'bigint')
        return ((x = wo('' + x, T.mode, M)), (x.return = T), x);
      if (typeof x == 'object' && x !== null) {
        switch (x.$$typeof) {
          case N:
            return ((M = qc(x.type, x.key, x.props, null, T.mode, M)), Ri(M, x), (M.return = T), M);
          case E:
            return ((x = No(x, T.mode, M)), (x.return = T), x);
          case Lt:
            return ((x = Wn(x)), U(T, x, M));
        }
        if (It(x) || Qt(x)) return ((x = Zn(x, T.mode, M, null)), (x.return = T), x);
        if (typeof x.then == 'function') return U(T, Kc(x), M);
        if (x.$$typeof === rt) return U(T, Gc(T, x), M);
        Qc(T, x);
      }
      return null;
    }
    function z(T, x, M, L) {
      var et = x !== null ? x.key : null;
      if ((typeof M == 'string' && M !== '') || typeof M == 'number' || typeof M == 'bigint')
        return et !== null ? null : v(T, x, '' + M, L);
      if (typeof M == 'object' && M !== null) {
        switch (M.$$typeof) {
          case N:
            return M.key === et ? S(T, x, M, L) : null;
          case E:
            return M.key === et ? w(T, x, M, L) : null;
          case Lt:
            return ((M = Wn(M)), z(T, x, M, L));
        }
        if (It(M) || Qt(M)) return et !== null ? null : B(T, x, M, L, null);
        if (typeof M.then == 'function') return z(T, x, Kc(M), L);
        if (M.$$typeof === rt) return z(T, x, Gc(T, M), L);
        Qc(T, M);
      }
      return null;
    }
    function R(T, x, M, L, et) {
      if ((typeof L == 'string' && L !== '') || typeof L == 'number' || typeof L == 'bigint')
        return ((T = T.get(M) || null), v(x, T, '' + L, et));
      if (typeof L == 'object' && L !== null) {
        switch (L.$$typeof) {
          case N:
            return ((T = T.get(L.key === null ? M : L.key) || null), S(x, T, L, et));
          case E:
            return ((T = T.get(L.key === null ? M : L.key) || null), w(x, T, L, et));
          case Lt:
            return ((L = Wn(L)), R(T, x, M, L, et));
        }
        if (It(L) || Qt(L)) return ((T = T.get(M) || null), B(x, T, L, et, null));
        if (typeof L.then == 'function') return R(T, x, M, Kc(L), et);
        if (L.$$typeof === rt) return R(T, x, M, Gc(x, L), et);
        Qc(x, L);
      }
      return null;
    }
    function W(T, x, M, L) {
      for (
        var et = null, xt = null, P = x, ot = (x = 0), pt = null;
        P !== null && ot < M.length;
        ot++
      ) {
        P.index > ot ? ((pt = P), (P = null)) : (pt = P.sibling);
        var jt = z(T, P, M[ot], L);
        if (jt === null) {
          P === null && (P = pt);
          break;
        }
        (t && P && jt.alternate === null && e(T, P),
          (x = o(jt, x, ot)),
          xt === null ? (et = jt) : (xt.sibling = jt),
          (xt = jt),
          (P = pt));
      }
      if (ot === M.length) return (a(T, P), gt && Ba(T, ot), et);
      if (P === null) {
        for (; ot < M.length; ot++)
          ((P = U(T, M[ot], L)),
            P !== null && ((x = o(P, x, ot)), xt === null ? (et = P) : (xt.sibling = P), (xt = P)));
        return (gt && Ba(T, ot), et);
      }
      for (P = n(P); ot < M.length; ot++)
        ((pt = R(P, T, ot, M[ot], L)),
          pt !== null &&
            (t && pt.alternate !== null && P.delete(pt.key === null ? ot : pt.key),
            (x = o(pt, x, ot)),
            xt === null ? (et = pt) : (xt.sibling = pt),
            (xt = pt)));
      return (
        t &&
          P.forEach(function (jn) {
            return e(T, jn);
          }),
        gt && Ba(T, ot),
        et
      );
    }
    function lt(T, x, M, L) {
      if (M == null) throw Error(r(151));
      for (
        var et = null, xt = null, P = x, ot = (x = 0), pt = null, jt = M.next();
        P !== null && !jt.done;
        ot++, jt = M.next()
      ) {
        P.index > ot ? ((pt = P), (P = null)) : (pt = P.sibling);
        var jn = z(T, P, jt.value, L);
        if (jn === null) {
          P === null && (P = pt);
          break;
        }
        (t && P && jn.alternate === null && e(T, P),
          (x = o(jn, x, ot)),
          xt === null ? (et = jn) : (xt.sibling = jn),
          (xt = jn),
          (P = pt));
      }
      if (jt.done) return (a(T, P), gt && Ba(T, ot), et);
      if (P === null) {
        for (; !jt.done; ot++, jt = M.next())
          ((jt = U(T, jt.value, L)),
            jt !== null &&
              ((x = o(jt, x, ot)), xt === null ? (et = jt) : (xt.sibling = jt), (xt = jt)));
        return (gt && Ba(T, ot), et);
      }
      for (P = n(P); !jt.done; ot++, jt = M.next())
        ((jt = R(P, T, ot, jt.value, L)),
          jt !== null &&
            (t && jt.alternate !== null && P.delete(jt.key === null ? ot : jt.key),
            (x = o(jt, x, ot)),
            xt === null ? (et = jt) : (xt.sibling = jt),
            (xt = jt)));
      return (
        t &&
          P.forEach(function (Zy) {
            return e(T, Zy);
          }),
        gt && Ba(T, ot),
        et
      );
    }
    function Dt(T, x, M, L) {
      if (
        (typeof M == 'object' &&
          M !== null &&
          M.type === q &&
          M.key === null &&
          (M = M.props.children),
        typeof M == 'object' && M !== null)
      ) {
        switch (M.$$typeof) {
          case N:
            t: {
              for (var et = M.key; x !== null; ) {
                if (x.key === et) {
                  if (((et = M.type), et === q)) {
                    if (x.tag === 7) {
                      (a(T, x.sibling), (L = i(x, M.props.children)), (L.return = T), (T = L));
                      break t;
                    }
                  } else if (
                    x.elementType === et ||
                    (typeof et == 'object' &&
                      et !== null &&
                      et.$$typeof === Lt &&
                      Wn(et) === x.type)
                  ) {
                    (a(T, x.sibling), (L = i(x, M.props)), Ri(L, M), (L.return = T), (T = L));
                    break t;
                  }
                  a(T, x);
                  break;
                } else e(T, x);
                x = x.sibling;
              }
              M.type === q
                ? ((L = Zn(M.props.children, T.mode, L, M.key)), (L.return = T), (T = L))
                : ((L = qc(M.type, M.key, M.props, null, T.mode, L)),
                  Ri(L, M),
                  (L.return = T),
                  (T = L));
            }
            return h(T);
          case E:
            t: {
              for (et = M.key; x !== null; ) {
                if (x.key === et)
                  if (
                    x.tag === 4 &&
                    x.stateNode.containerInfo === M.containerInfo &&
                    x.stateNode.implementation === M.implementation
                  ) {
                    (a(T, x.sibling), (L = i(x, M.children || [])), (L.return = T), (T = L));
                    break t;
                  } else {
                    a(T, x);
                    break;
                  }
                else e(T, x);
                x = x.sibling;
              }
              ((L = No(M, T.mode, L)), (L.return = T), (T = L));
            }
            return h(T);
          case Lt:
            return ((M = Wn(M)), Dt(T, x, M, L));
        }
        if (It(M)) return W(T, x, M, L);
        if (Qt(M)) {
          if (((et = Qt(M)), typeof et != 'function')) throw Error(r(150));
          return ((M = et.call(M)), lt(T, x, M, L));
        }
        if (typeof M.then == 'function') return Dt(T, x, Kc(M), L);
        if (M.$$typeof === rt) return Dt(T, x, Gc(T, M), L);
        Qc(T, M);
      }
      return (typeof M == 'string' && M !== '') || typeof M == 'number' || typeof M == 'bigint'
        ? ((M = '' + M),
          x !== null && x.tag === 6
            ? (a(T, x.sibling), (L = i(x, M)), (L.return = T), (T = L))
            : (a(T, x), (L = wo(M, T.mode, L)), (L.return = T), (T = L)),
          h(T))
        : a(T, x);
    }
    return function (T, x, M, L) {
      try {
        Ci = 0;
        var et = Dt(T, x, M, L);
        return ((Hl = null), et);
      } catch (P) {
        if (P === $l || P === Yc) throw P;
        var xt = He(29, P, null, T.mode);
        return ((xt.lanes = L), (xt.return = T), xt);
      } finally {
      }
    };
  }
  var Fn = ud(!0),
    fd = ud(!1),
    cn = !1;
  function ko(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Vo(t, e) {
    ((t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function sn(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function on(t, e, a) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Et & 2) !== 0)) {
      var i = n.pending;
      return (
        i === null ? (e.next = e) : ((e.next = i.next), (i.next = e)),
        (n.pending = e),
        (e = Uc(t)),
        Qf(t, null, a),
        e
      );
    }
    return (Hc(t, n, e, a), Uc(t));
  }
  function Oi(t, e, a) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (a & 4194048) !== 0))) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (a |= n), (e.lanes = a), ef(t, a));
    }
  }
  function Go(t, e) {
    var a = t.updateQueue,
      n = t.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var i = null,
        o = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var h = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (o === null ? (i = o = h) : (o = o.next = h), (a = a.next));
        } while (a !== null);
        o === null ? (i = o = e) : (o = o.next = e);
      } else i = o = e;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: o,
        shared: n.shared,
        callbacks: n.callbacks,
      }),
        (t.updateQueue = a));
      return;
    }
    ((t = a.lastBaseUpdate),
      t === null ? (a.firstBaseUpdate = e) : (t.next = e),
      (a.lastBaseUpdate = e));
  }
  var Zo = !1;
  function Bi() {
    if (Zo) {
      var t = Ll;
      if (t !== null) throw t;
    }
  }
  function Di(t, e, a, n) {
    Zo = !1;
    var i = t.updateQueue;
    cn = !1;
    var o = i.firstBaseUpdate,
      h = i.lastBaseUpdate,
      v = i.shared.pending;
    if (v !== null) {
      i.shared.pending = null;
      var S = v,
        w = S.next;
      ((S.next = null), h === null ? (o = w) : (h.next = w), (h = S));
      var B = t.alternate;
      B !== null &&
        ((B = B.updateQueue),
        (v = B.lastBaseUpdate),
        v !== h && (v === null ? (B.firstBaseUpdate = w) : (v.next = w), (B.lastBaseUpdate = S)));
    }
    if (o !== null) {
      var U = i.baseState;
      ((h = 0), (B = w = S = null), (v = o));
      do {
        var z = v.lane & -536870913,
          R = z !== v.lane;
        if (R ? (ht & z) === z : (n & z) === z) {
          (z !== 0 && z === Dl && (Zo = !0),
            B !== null &&
              (B = B.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          t: {
            var W = t,
              lt = v;
            z = e;
            var Dt = a;
            switch (lt.tag) {
              case 1:
                if (((W = lt.payload), typeof W == 'function')) {
                  U = W.call(Dt, U, z);
                  break t;
                }
                U = W;
                break t;
              case 3:
                W.flags = (W.flags & -65537) | 128;
              case 0:
                if (
                  ((W = lt.payload), (z = typeof W == 'function' ? W.call(Dt, U, z) : W), z == null)
                )
                  break t;
                U = b({}, U, z);
                break t;
              case 2:
                cn = !0;
            }
          }
          ((z = v.callback),
            z !== null &&
              ((t.flags |= 64),
              R && (t.flags |= 8192),
              (R = i.callbacks),
              R === null ? (i.callbacks = [z]) : R.push(z)));
        } else
          ((R = { lane: z, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            B === null ? ((w = B = R), (S = U)) : (B = B.next = R),
            (h |= z));
        if (((v = v.next), v === null)) {
          if (((v = i.shared.pending), v === null)) break;
          ((R = v),
            (v = R.next),
            (R.next = null),
            (i.lastBaseUpdate = R),
            (i.shared.pending = null));
        }
      } while (!0);
      (B === null && (S = U),
        (i.baseState = S),
        (i.firstBaseUpdate = w),
        (i.lastBaseUpdate = B),
        o === null && (i.shared.lanes = 0),
        (mn |= h),
        (t.lanes = h),
        (t.memoizedState = U));
    }
  }
  function dd(t, e) {
    if (typeof t != 'function') throw Error(r(191, t));
    t.call(e);
  }
  function md(t, e) {
    var a = t.callbacks;
    if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) dd(a[t], e);
  }
  var Ul = j(null),
    Wc = j(0);
  function hd(t, e) {
    ((t = Ya), k(Wc, t), k(Ul, e), (Ya = t | e.baseLanes));
  }
  function Yo() {
    (k(Wc, Ya), k(Ul, Ul.current));
  }
  function Xo() {
    ((Ya = Wc.current), H(Ul), H(Wc));
  }
  var Ue = j(null),
    Pe = null;
  function rn(t) {
    var e = t.alternate;
    (k(Pt, Pt.current & 1),
      k(Ue, t),
      Pe === null && (e === null || Ul.current !== null || e.memoizedState !== null) && (Pe = t));
  }
  function Ko(t) {
    (k(Pt, Pt.current), k(Ue, t), Pe === null && (Pe = t));
  }
  function pd(t) {
    t.tag === 22 ? (k(Pt, Pt.current), k(Ue, t), Pe === null && (Pe = t)) : un();
  }
  function un() {
    (k(Pt, Pt.current), k(Ue, Ue.current));
  }
  function qe(t) {
    (H(Ue), Pe === t && (Pe = null), H(Pt));
  }
  var Pt = j(0);
  function Jc(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Pr(a) || tu(a))) return e;
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === 'forwards' ||
          e.memoizedProps.revealOrder === 'backwards' ||
          e.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          e.memoizedProps.revealOrder === 'together')
      ) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        ((e.child.return = e), (e = e.child));
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
    return null;
  }
  var $a = 0,
    st = null,
    Ot = null,
    ce = null,
    Fc = !1,
    ql = !1,
    In = !1,
    Ic = 0,
    Li = 0,
    kl = null,
    Bp = 0;
  function Wt() {
    throw Error(r(321));
  }
  function Qo(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++) if (!$e(t[a], e[a])) return !1;
    return !0;
  }
  function Wo(t, e, a, n, i, o) {
    return (
      ($a = o),
      (st = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (O.H = t === null || t.memoizedState === null ? Id : ur),
      (In = !1),
      (o = a(n, i)),
      (In = !1),
      ql && (o = gd(e, a, n, i)),
      yd(t),
      o
    );
  }
  function yd(t) {
    O.H = Ui;
    var e = Ot !== null && Ot.next !== null;
    if ((($a = 0), (ce = Ot = st = null), (Fc = !1), (Li = 0), (kl = null), e)) throw Error(r(300));
    t === null || se || ((t = t.dependencies), t !== null && Vc(t) && (se = !0));
  }
  function gd(t, e, a, n) {
    st = t;
    var i = 0;
    do {
      if ((ql && (kl = null), (Li = 0), (ql = !1), 25 <= i)) throw Error(r(301));
      if (((i += 1), (ce = Ot = null), t.updateQueue != null)) {
        var o = t.updateQueue;
        ((o.lastEffect = null),
          (o.events = null),
          (o.stores = null),
          o.memoCache != null && (o.memoCache.index = 0));
      }
      ((O.H = Pd), (o = e(a, n)));
    } while (ql);
    return o;
  }
  function Dp() {
    var t = O.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? $i(e) : e),
      (t = t.useState()[0]),
      (Ot !== null ? Ot.memoizedState : null) !== t && (st.flags |= 1024),
      e
    );
  }
  function Jo() {
    var t = Ic !== 0;
    return ((Ic = 0), t);
  }
  function Fo(t, e, a) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~a));
  }
  function Io(t) {
    if (Fc) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      Fc = !1;
    }
    (($a = 0), (ce = Ot = st = null), (ql = !1), (Li = Ic = 0), (kl = null));
  }
  function Ae() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (ce === null ? (st.memoizedState = ce = t) : (ce = ce.next = t), ce);
  }
  function te() {
    if (Ot === null) {
      var t = st.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ot.next;
    var e = ce === null ? st.memoizedState : ce.next;
    if (e !== null) ((ce = e), (Ot = t));
    else {
      if (t === null) throw st.alternate === null ? Error(r(467)) : Error(r(310));
      ((Ot = t),
        (t = {
          memoizedState: Ot.memoizedState,
          baseState: Ot.baseState,
          baseQueue: Ot.baseQueue,
          queue: Ot.queue,
          next: null,
        }),
        ce === null ? (st.memoizedState = ce = t) : (ce = ce.next = t));
    }
    return ce;
  }
  function Pc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function $i(t) {
    var e = Li;
    return (
      (Li += 1),
      kl === null && (kl = []),
      (t = sd(kl, t, e)),
      (e = st),
      (ce === null ? e.memoizedState : ce.next) === null &&
        ((e = e.alternate), (O.H = e === null || e.memoizedState === null ? Id : ur)),
      t
    );
  }
  function ts(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return $i(t);
      if (t.$$typeof === rt) return ve(t);
    }
    throw Error(r(438, String(t)));
  }
  function Po(t) {
    var e = null,
      a = st.updateQueue;
    if ((a !== null && (e = a.memoCache), e == null)) {
      var n = st.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (e = {
              data: n.data.map(function (i) {
                return i.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      a === null && ((a = Pc()), (st.updateQueue = a)),
      (a.memoCache = e),
      (a = e.data[e.index]),
      a === void 0)
    )
      for (a = e.data[e.index] = Array(t), n = 0; n < t; n++) a[n] = Yt;
    return (e.index++, a);
  }
  function Ha(t, e) {
    return typeof e == 'function' ? e(t) : e;
  }
  function es(t) {
    var e = te();
    return tr(e, Ot, t);
  }
  function tr(t, e, a) {
    var n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = a;
    var i = t.baseQueue,
      o = n.pending;
    if (o !== null) {
      if (i !== null) {
        var h = i.next;
        ((i.next = o.next), (o.next = h));
      }
      ((e.baseQueue = i = o), (n.pending = null));
    }
    if (((o = t.baseState), i === null)) t.memoizedState = o;
    else {
      e = i.next;
      var v = (h = null),
        S = null,
        w = e,
        B = !1;
      do {
        var U = w.lane & -536870913;
        if (U !== w.lane ? (ht & U) === U : ($a & U) === U) {
          var z = w.revertLane;
          if (z === 0)
            (S !== null &&
              (S = S.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: w.action,
                  hasEagerState: w.hasEagerState,
                  eagerState: w.eagerState,
                  next: null,
                }),
              U === Dl && (B = !0));
          else if (($a & z) === z) {
            ((w = w.next), z === Dl && (B = !0));
            continue;
          } else
            ((U = {
              lane: 0,
              revertLane: w.revertLane,
              gesture: null,
              action: w.action,
              hasEagerState: w.hasEagerState,
              eagerState: w.eagerState,
              next: null,
            }),
              S === null ? ((v = S = U), (h = o)) : (S = S.next = U),
              (st.lanes |= z),
              (mn |= z));
          ((U = w.action), In && a(o, U), (o = w.hasEagerState ? w.eagerState : a(o, U)));
        } else
          ((z = {
            lane: U,
            revertLane: w.revertLane,
            gesture: w.gesture,
            action: w.action,
            hasEagerState: w.hasEagerState,
            eagerState: w.eagerState,
            next: null,
          }),
            S === null ? ((v = S = z), (h = o)) : (S = S.next = z),
            (st.lanes |= U),
            (mn |= U));
        w = w.next;
      } while (w !== null && w !== e);
      if (
        (S === null ? (h = o) : (S.next = v),
        !$e(o, t.memoizedState) && ((se = !0), B && ((a = Ll), a !== null)))
      )
        throw a;
      ((t.memoizedState = o), (t.baseState = h), (t.baseQueue = S), (n.lastRenderedState = o));
    }
    return (i === null && (n.lanes = 0), [t.memoizedState, n.dispatch]);
  }
  function er(t) {
    var e = te(),
      a = e.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = t;
    var n = a.dispatch,
      i = a.pending,
      o = e.memoizedState;
    if (i !== null) {
      a.pending = null;
      var h = (i = i.next);
      do ((o = t(o, h.action)), (h = h.next));
      while (h !== i);
      ($e(o, e.memoizedState) || (se = !0),
        (e.memoizedState = o),
        e.baseQueue === null && (e.baseState = o),
        (a.lastRenderedState = o));
    }
    return [o, n];
  }
  function vd(t, e, a) {
    var n = st,
      i = te(),
      o = gt;
    if (o) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = e();
    var h = !$e((Ot || i).memoizedState, a);
    if (
      (h && ((i.memoizedState = a), (se = !0)),
      (i = i.queue),
      lr(Sd.bind(null, n, i, t), [t]),
      i.getSnapshot !== e || h || (ce !== null && ce.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Vl(9, { destroy: void 0 }, bd.bind(null, n, i, a, e), null),
        $t === null)
      )
        throw Error(r(349));
      o || ($a & 127) !== 0 || _d(n, e, a);
    }
    return a;
  }
  function _d(t, e, a) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: a }),
      (e = st.updateQueue),
      e === null
        ? ((e = Pc()), (st.updateQueue = e), (e.stores = [t]))
        : ((a = e.stores), a === null ? (e.stores = [t]) : a.push(t)));
  }
  function bd(t, e, a, n) {
    ((e.value = a), (e.getSnapshot = n), xd(e) && jd(t));
  }
  function Sd(t, e, a) {
    return a(function () {
      xd(e) && jd(t);
    });
  }
  function xd(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !$e(t, a);
    } catch {
      return !0;
    }
  }
  function jd(t) {
    var e = Gn(t, 2);
    e !== null && De(e, t, 2);
  }
  function ar(t) {
    var e = Ae();
    if (typeof t == 'function') {
      var a = t;
      if (((t = a()), In)) {
        _a(!0);
        try {
          a();
        } finally {
          _a(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ha,
        lastRenderedState: t,
      }),
      e
    );
  }
  function Td(t, e, a, n) {
    return ((t.baseState = a), tr(t, Ot, typeof n == 'function' ? n : Ha));
  }
  function Lp(t, e, a, n, i) {
    if (ls(t)) throw Error(r(485));
    if (((t = e.action), t !== null)) {
      var o = {
        payload: i,
        action: t,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (h) {
          o.listeners.push(h);
        },
      };
      (O.T !== null ? a(!0) : (o.isTransition = !1),
        n(o),
        (a = e.pending),
        a === null
          ? ((o.next = e.pending = o), Ad(e, o))
          : ((o.next = a.next), (e.pending = a.next = o)));
    }
  }
  function Ad(t, e) {
    var a = e.action,
      n = e.payload,
      i = t.state;
    if (e.isTransition) {
      var o = O.T,
        h = {};
      O.T = h;
      try {
        var v = a(i, n),
          S = O.S;
        (S !== null && S(h, v), Ed(t, e, v));
      } catch (w) {
        nr(t, e, w);
      } finally {
        (o !== null && h.types !== null && (o.types = h.types), (O.T = o));
      }
    } else
      try {
        ((o = a(i, n)), Ed(t, e, o));
      } catch (w) {
        nr(t, e, w);
      }
  }
  function Ed(t, e, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            Md(t, e, n);
          },
          function (n) {
            return nr(t, e, n);
          }
        )
      : Md(t, e, a);
  }
  function Md(t, e, a) {
    ((e.status = 'fulfilled'),
      (e.value = a),
      wd(e),
      (t.state = a),
      (e = t.pending),
      e !== null &&
        ((a = e.next), a === e ? (t.pending = null) : ((a = a.next), (e.next = a), Ad(t, a))));
  }
  function nr(t, e, a) {
    var n = t.pending;
    if (((t.pending = null), n !== null)) {
      n = n.next;
      do ((e.status = 'rejected'), (e.reason = a), wd(e), (e = e.next));
      while (e !== n);
    }
    t.action = null;
  }
  function wd(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Nd(t, e) {
    return e;
  }
  function zd(t, e) {
    if (gt) {
      var a = $t.formState;
      if (a !== null) {
        t: {
          var n = st;
          if (gt) {
            if (Gt) {
              e: {
                for (var i = Gt, o = Ie; i.nodeType !== 8; ) {
                  if (!o) {
                    i = null;
                    break e;
                  }
                  if (((i = ta(i.nextSibling)), i === null)) {
                    i = null;
                    break e;
                  }
                }
                ((o = i.data), (i = o === 'F!' || o === 'F' ? i : null));
              }
              if (i) {
                ((Gt = ta(i.nextSibling)), (n = i.data === 'F!'));
                break t;
              }
            }
            nn(n);
          }
          n = !1;
        }
        n && (e = a[0]);
      }
    }
    return (
      (a = Ae()),
      (a.memoizedState = a.baseState = e),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Nd,
        lastRenderedState: e,
      }),
      (a.queue = n),
      (a = Wd.bind(null, st, n)),
      (n.dispatch = a),
      (n = ar(!1)),
      (o = rr.bind(null, st, !1, n.queue)),
      (n = Ae()),
      (i = { state: e, dispatch: null, action: t, pending: null }),
      (n.queue = i),
      (a = Lp.bind(null, st, i, o, a)),
      (i.dispatch = a),
      (n.memoizedState = t),
      [e, a, !1]
    );
  }
  function Cd(t) {
    var e = te();
    return Rd(e, Ot, t);
  }
  function Rd(t, e, a) {
    if (
      ((e = tr(t, e, Nd)[0]),
      (t = es(Ha)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var n = $i(e);
      } catch (h) {
        throw h === $l ? Yc : h;
      }
    else n = e;
    e = te();
    var i = e.queue,
      o = i.dispatch;
    return (
      a !== e.memoizedState &&
        ((st.flags |= 2048), Vl(9, { destroy: void 0 }, $p.bind(null, i, a), null)),
      [n, o, t]
    );
  }
  function $p(t, e) {
    t.action = e;
  }
  function Od(t) {
    var e = te(),
      a = Ot;
    if (a !== null) return Rd(e, a, t);
    (te(), (e = e.memoizedState), (a = te()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = t), [e, n, !1]);
  }
  function Vl(t, e, a, n) {
    return (
      (t = { tag: t, create: a, deps: n, inst: e, next: null }),
      (e = st.updateQueue),
      e === null && ((e = Pc()), (st.updateQueue = e)),
      (a = e.lastEffect),
      a === null
        ? (e.lastEffect = t.next = t)
        : ((n = a.next), (a.next = t), (t.next = n), (e.lastEffect = t)),
      t
    );
  }
  function Bd() {
    return te().memoizedState;
  }
  function as(t, e, a, n) {
    var i = Ae();
    ((st.flags |= t),
      (i.memoizedState = Vl(1 | e, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function ns(t, e, a, n) {
    var i = te();
    n = n === void 0 ? null : n;
    var o = i.memoizedState.inst;
    Ot !== null && n !== null && Qo(n, Ot.memoizedState.deps)
      ? (i.memoizedState = Vl(e, o, a, n))
      : ((st.flags |= t), (i.memoizedState = Vl(1 | e, o, a, n)));
  }
  function Dd(t, e) {
    as(8390656, 8, t, e);
  }
  function lr(t, e) {
    ns(2048, 8, t, e);
  }
  function Hp(t) {
    st.flags |= 4;
    var e = st.updateQueue;
    if (e === null) ((e = Pc()), (st.updateQueue = e), (e.events = [t]));
    else {
      var a = e.events;
      a === null ? (e.events = [t]) : a.push(t);
    }
  }
  function Ld(t) {
    var e = te().memoizedState;
    return (
      Hp({ ref: e, nextImpl: t }),
      function () {
        if ((Et & 2) !== 0) throw Error(r(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function $d(t, e) {
    return ns(4, 2, t, e);
  }
  function Hd(t, e) {
    return ns(4, 4, t, e);
  }
  function Ud(t, e) {
    if (typeof e == 'function') {
      t = t();
      var a = e(t);
      return function () {
        typeof a == 'function' ? a() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function qd(t, e, a) {
    ((a = a != null ? a.concat([t]) : null), ns(4, 4, Ud.bind(null, e, t), a));
  }
  function ir() {}
  function kd(t, e) {
    var a = te();
    e = e === void 0 ? null : e;
    var n = a.memoizedState;
    return e !== null && Qo(e, n[1]) ? n[0] : ((a.memoizedState = [t, e]), t);
  }
  function Vd(t, e) {
    var a = te();
    e = e === void 0 ? null : e;
    var n = a.memoizedState;
    if (e !== null && Qo(e, n[1])) return n[0];
    if (((n = t()), In)) {
      _a(!0);
      try {
        t();
      } finally {
        _a(!1);
      }
    }
    return ((a.memoizedState = [n, e]), n);
  }
  function cr(t, e, a) {
    return a === void 0 || (($a & 1073741824) !== 0 && (ht & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = a), (t = Gm()), (st.lanes |= t), (mn |= t), a);
  }
  function Gd(t, e, a, n) {
    return $e(a, e)
      ? a
      : Ul.current !== null
        ? ((t = cr(t, a, n)), $e(t, e) || (se = !0), t)
        : ($a & 42) === 0 || (($a & 1073741824) !== 0 && (ht & 261930) === 0)
          ? ((se = !0), (t.memoizedState = a))
          : ((t = Gm()), (st.lanes |= t), (mn |= t), e);
  }
  function Zd(t, e, a, n, i) {
    var o = Y.p;
    Y.p = o !== 0 && 8 > o ? o : 8;
    var h = O.T,
      v = {};
    ((O.T = v), rr(t, !1, e, a));
    try {
      var S = i(),
        w = O.S;
      if (
        (w !== null && w(v, S), S !== null && typeof S == 'object' && typeof S.then == 'function')
      ) {
        var B = Op(S, n);
        Hi(t, e, B, Ge(t));
      } else Hi(t, e, n, Ge(t));
    } catch (U) {
      Hi(t, e, { then: function () {}, status: 'rejected', reason: U }, Ge());
    } finally {
      ((Y.p = o), h !== null && v.types !== null && (h.types = v.types), (O.T = h));
    }
  }
  function Up() {}
  function sr(t, e, a, n) {
    if (t.tag !== 5) throw Error(r(476));
    var i = Yd(t).queue;
    Zd(
      t,
      i,
      e,
      at,
      a === null
        ? Up
        : function () {
            return (Xd(t), a(n));
          }
    );
  }
  function Yd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: at,
      baseState: at,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ha,
        lastRenderedState: at,
      },
      next: null,
    };
    var a = {};
    return (
      (e.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ha,
          lastRenderedState: a,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function Xd(t) {
    var e = Yd(t);
    (e.next === null && (e = t.alternate.memoizedState), Hi(t, e.next.queue, {}, Ge()));
  }
  function or() {
    return ve(ec);
  }
  function Kd() {
    return te().memoizedState;
  }
  function Qd() {
    return te().memoizedState;
  }
  function qp(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var a = Ge();
          t = sn(a);
          var n = on(e, t, a);
          (n !== null && (De(n, e, a), Oi(n, e, a)), (e = { cache: $o() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function kp(t, e, a) {
    var n = Ge();
    ((a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ls(t) ? Jd(e, a) : ((a = Eo(t, e, a, n)), a !== null && (De(a, t, n), Fd(a, e, n))));
  }
  function Wd(t, e, a) {
    var n = Ge();
    Hi(t, e, a, n);
  }
  function Hi(t, e, a, n) {
    var i = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ls(t)) Jd(e, i);
    else {
      var o = t.alternate;
      if (
        t.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = e.lastRenderedReducer), o !== null)
      )
        try {
          var h = e.lastRenderedState,
            v = o(h, a);
          if (((i.hasEagerState = !0), (i.eagerState = v), $e(v, h)))
            return (Hc(t, e, i, 0), $t === null && $c(), !1);
        } catch {
        } finally {
        }
      if (((a = Eo(t, e, i, n)), a !== null)) return (De(a, t, n), Fd(a, e, n), !0);
    }
    return !1;
  }
  function rr(t, e, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: kr(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ls(t))
    ) {
      if (e) throw Error(r(479));
    } else ((e = Eo(t, a, n, 2)), e !== null && De(e, t, 2));
  }
  function ls(t) {
    var e = t.alternate;
    return t === st || (e !== null && e === st);
  }
  function Jd(t, e) {
    ql = Fc = !0;
    var a = t.pending;
    (a === null ? (e.next = e) : ((e.next = a.next), (a.next = e)), (t.pending = e));
  }
  function Fd(t, e, a) {
    if ((a & 4194048) !== 0) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (a |= n), (e.lanes = a), ef(t, a));
    }
  }
  var Ui = {
    readContext: ve,
    use: ts,
    useCallback: Wt,
    useContext: Wt,
    useEffect: Wt,
    useImperativeHandle: Wt,
    useLayoutEffect: Wt,
    useInsertionEffect: Wt,
    useMemo: Wt,
    useReducer: Wt,
    useRef: Wt,
    useState: Wt,
    useDebugValue: Wt,
    useDeferredValue: Wt,
    useTransition: Wt,
    useSyncExternalStore: Wt,
    useId: Wt,
    useHostTransitionStatus: Wt,
    useFormState: Wt,
    useActionState: Wt,
    useOptimistic: Wt,
    useMemoCache: Wt,
    useCacheRefresh: Wt,
  };
  Ui.useEffectEvent = Wt;
  var Id = {
      readContext: ve,
      use: ts,
      useCallback: function (t, e) {
        return ((Ae().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: ve,
      useEffect: Dd,
      useImperativeHandle: function (t, e, a) {
        ((a = a != null ? a.concat([t]) : null), as(4194308, 4, Ud.bind(null, e, t), a));
      },
      useLayoutEffect: function (t, e) {
        return as(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        as(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var a = Ae();
        e = e === void 0 ? null : e;
        var n = t();
        if (In) {
          _a(!0);
          try {
            t();
          } finally {
            _a(!1);
          }
        }
        return ((a.memoizedState = [n, e]), n);
      },
      useReducer: function (t, e, a) {
        var n = Ae();
        if (a !== void 0) {
          var i = a(e);
          if (In) {
            _a(!0);
            try {
              a(e);
            } finally {
              _a(!1);
            }
          }
        } else i = e;
        return (
          (n.memoizedState = n.baseState = i),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: i,
          }),
          (n.queue = t),
          (t = t.dispatch = kp.bind(null, st, t)),
          [n.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = Ae();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = ar(t);
        var e = t.queue,
          a = Wd.bind(null, st, e);
        return ((e.dispatch = a), [t.memoizedState, a]);
      },
      useDebugValue: ir,
      useDeferredValue: function (t, e) {
        var a = Ae();
        return cr(a, t, e);
      },
      useTransition: function () {
        var t = ar(!1);
        return ((t = Zd.bind(null, st, t.queue, !0, !1)), (Ae().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, a) {
        var n = st,
          i = Ae();
        if (gt) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (((a = e()), $t === null)) throw Error(r(349));
          (ht & 127) !== 0 || _d(n, e, a);
        }
        i.memoizedState = a;
        var o = { value: a, getSnapshot: e };
        return (
          (i.queue = o),
          Dd(Sd.bind(null, n, o, t), [t]),
          (n.flags |= 2048),
          Vl(9, { destroy: void 0 }, bd.bind(null, n, o, a, e), null),
          a
        );
      },
      useId: function () {
        var t = Ae(),
          e = $t.identifierPrefix;
        if (gt) {
          var a = Sa,
            n = ba;
          ((a = (n & ~(1 << (32 - ue(n) - 1))).toString(32) + a),
            (e = '_' + e + 'R_' + a),
            (a = Ic++),
            0 < a && (e += 'H' + a.toString(32)),
            (e += '_'));
        } else ((a = Bp++), (e = '_' + e + 'r_' + a.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: or,
      useFormState: zd,
      useActionState: zd,
      useOptimistic: function (t) {
        var e = Ae();
        e.memoizedState = e.baseState = t;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = a), (e = rr.bind(null, st, !0, a)), (a.dispatch = e), [t, e]);
      },
      useMemoCache: Po,
      useCacheRefresh: function () {
        return (Ae().memoizedState = qp.bind(null, st));
      },
      useEffectEvent: function (t) {
        var e = Ae(),
          a = { impl: t };
        return (
          (e.memoizedState = a),
          function () {
            if ((Et & 2) !== 0) throw Error(r(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ur = {
      readContext: ve,
      use: ts,
      useCallback: kd,
      useContext: ve,
      useEffect: lr,
      useImperativeHandle: qd,
      useInsertionEffect: $d,
      useLayoutEffect: Hd,
      useMemo: Vd,
      useReducer: es,
      useRef: Bd,
      useState: function () {
        return es(Ha);
      },
      useDebugValue: ir,
      useDeferredValue: function (t, e) {
        var a = te();
        return Gd(a, Ot.memoizedState, t, e);
      },
      useTransition: function () {
        var t = es(Ha)[0],
          e = te().memoizedState;
        return [typeof t == 'boolean' ? t : $i(t), e];
      },
      useSyncExternalStore: vd,
      useId: Kd,
      useHostTransitionStatus: or,
      useFormState: Cd,
      useActionState: Cd,
      useOptimistic: function (t, e) {
        var a = te();
        return Td(a, Ot, t, e);
      },
      useMemoCache: Po,
      useCacheRefresh: Qd,
    };
  ur.useEffectEvent = Ld;
  var Pd = {
    readContext: ve,
    use: ts,
    useCallback: kd,
    useContext: ve,
    useEffect: lr,
    useImperativeHandle: qd,
    useInsertionEffect: $d,
    useLayoutEffect: Hd,
    useMemo: Vd,
    useReducer: er,
    useRef: Bd,
    useState: function () {
      return er(Ha);
    },
    useDebugValue: ir,
    useDeferredValue: function (t, e) {
      var a = te();
      return Ot === null ? cr(a, t, e) : Gd(a, Ot.memoizedState, t, e);
    },
    useTransition: function () {
      var t = er(Ha)[0],
        e = te().memoizedState;
      return [typeof t == 'boolean' ? t : $i(t), e];
    },
    useSyncExternalStore: vd,
    useId: Kd,
    useHostTransitionStatus: or,
    useFormState: Od,
    useActionState: Od,
    useOptimistic: function (t, e) {
      var a = te();
      return Ot !== null ? Td(a, Ot, t, e) : ((a.baseState = t), [t, a.queue.dispatch]);
    },
    useMemoCache: Po,
    useCacheRefresh: Qd,
  };
  Pd.useEffectEvent = Ld;
  function fr(t, e, a, n) {
    ((e = t.memoizedState),
      (a = a(n, e)),
      (a = a == null ? e : b({}, e, a)),
      (t.memoizedState = a),
      t.lanes === 0 && (t.updateQueue.baseState = a));
  }
  var dr = {
    enqueueSetState: function (t, e, a) {
      t = t._reactInternals;
      var n = Ge(),
        i = sn(n);
      ((i.payload = e),
        a != null && (i.callback = a),
        (e = on(t, i, n)),
        e !== null && (De(e, t, n), Oi(e, t, n)));
    },
    enqueueReplaceState: function (t, e, a) {
      t = t._reactInternals;
      var n = Ge(),
        i = sn(n);
      ((i.tag = 1),
        (i.payload = e),
        a != null && (i.callback = a),
        (e = on(t, i, n)),
        e !== null && (De(e, t, n), Oi(e, t, n)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var a = Ge(),
        n = sn(a);
      ((n.tag = 2),
        e != null && (n.callback = e),
        (e = on(t, n, a)),
        e !== null && (De(e, t, a), Oi(e, t, a)));
    },
  };
  function tm(t, e, a, n, i, o, h) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(n, o, h)
        : e.prototype && e.prototype.isPureReactComponent
          ? !Ai(a, n) || !Ai(i, o)
          : !0
    );
  }
  function em(t, e, a, n) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(a, n),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(a, n),
      e.state !== t && dr.enqueueReplaceState(e, e.state, null));
  }
  function Pn(t, e) {
    var a = e;
    if ('ref' in e) {
      a = {};
      for (var n in e) n !== 'ref' && (a[n] = e[n]);
    }
    if ((t = t.defaultProps)) {
      a === e && (a = b({}, a));
      for (var i in t) a[i] === void 0 && (a[i] = t[i]);
    }
    return a;
  }
  function am(t) {
    Lc(t);
  }
  function nm(t) {
    console.error(t);
  }
  function lm(t) {
    Lc(t);
  }
  function is(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function im(t, e, a) {
    try {
      var n = t.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function mr(t, e, a) {
    return (
      (a = sn(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        is(t, e);
      }),
      a
    );
  }
  function cm(t) {
    return ((t = sn(t)), (t.tag = 3), t);
  }
  function sm(t, e, a, n) {
    var i = a.type.getDerivedStateFromError;
    if (typeof i == 'function') {
      var o = n.value;
      ((t.payload = function () {
        return i(o);
      }),
        (t.callback = function () {
          im(e, a, n);
        }));
    }
    var h = a.stateNode;
    h !== null &&
      typeof h.componentDidCatch == 'function' &&
      (t.callback = function () {
        (im(e, a, n),
          typeof i != 'function' && (hn === null ? (hn = new Set([this])) : hn.add(this)));
        var v = n.stack;
        this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' });
      });
  }
  function Vp(t, e, a, n, i) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((e = a.alternate), e !== null && Bl(e, a, i, !0), (a = Ue.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Pe === null ? gs() : a.alternate === null && Jt === 0 && (Jt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = i),
              n === Xc
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null ? (a.updateQueue = new Set([n])) : e.add(n),
                  Hr(t, n, i)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === Xc
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = e))
                    : ((a = e.retryQueue), a === null ? (e.retryQueue = new Set([n])) : a.add(n)),
                  Hr(t, n, i)),
              !1
            );
        }
        throw Error(r(435, a.tag));
      }
      return (Hr(t, n, i), gs(), !1);
    }
    if (gt)
      return (
        (e = Ue.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = i),
            n !== Ro && ((t = Error(r(422), { cause: n })), wi(We(t, a))))
          : (n !== Ro && ((e = Error(r(423), { cause: n })), wi(We(e, a))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (i &= -i),
            (t.lanes |= i),
            (n = We(n, a)),
            (i = mr(t.stateNode, n, i)),
            Go(t, i),
            Jt !== 4 && (Jt = 2)),
        !1
      );
    var o = Error(r(520), { cause: n });
    if (((o = We(o, a)), Ki === null ? (Ki = [o]) : Ki.push(o), Jt !== 4 && (Jt = 2), e === null))
      return !0;
    ((n = We(n, a)), (a = e));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (t = i & -i),
            (a.lanes |= t),
            (t = mr(a.stateNode, n, t)),
            Go(a, t),
            !1
          );
        case 1:
          if (
            ((e = a.type),
            (o = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == 'function' ||
                (o !== null &&
                  typeof o.componentDidCatch == 'function' &&
                  (hn === null || !hn.has(o)))))
          )
            return (
              (a.flags |= 65536),
              (i &= -i),
              (a.lanes |= i),
              (i = cm(i)),
              sm(i, t, a, n),
              Go(a, i),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var hr = Error(r(461)),
    se = !1;
  function _e(t, e, a, n) {
    e.child = t === null ? fd(e, null, a, n) : Fn(e, t.child, a, n);
  }
  function om(t, e, a, n, i) {
    a = a.render;
    var o = e.ref;
    if ('ref' in n) {
      var h = {};
      for (var v in n) v !== 'ref' && (h[v] = n[v]);
    } else h = n;
    return (
      Kn(e),
      (n = Wo(t, e, a, h, o, i)),
      (v = Jo()),
      t !== null && !se
        ? (Fo(t, e, i), Ua(t, e, i))
        : (gt && v && zo(e), (e.flags |= 1), _e(t, e, n, i), e.child)
    );
  }
  function rm(t, e, a, n, i) {
    if (t === null) {
      var o = a.type;
      return typeof o == 'function' && !Mo(o) && o.defaultProps === void 0 && a.compare === null
        ? ((e.tag = 15), (e.type = o), um(t, e, o, n, i))
        : ((t = qc(a.type, null, n, e, e.mode, i)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((o = t.child), !xr(t, i))) {
      var h = o.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Ai), a(h, n) && t.ref === e.ref))
        return Ua(t, e, i);
    }
    return ((e.flags |= 1), (t = Oa(o, n)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function um(t, e, a, n, i) {
    if (t !== null) {
      var o = t.memoizedProps;
      if (Ai(o, n) && t.ref === e.ref)
        if (((se = !1), (e.pendingProps = n = o), xr(t, i))) (t.flags & 131072) !== 0 && (se = !0);
        else return ((e.lanes = t.lanes), Ua(t, e, i));
    }
    return pr(t, e, a, n, i);
  }
  function fm(t, e, a, n) {
    var i = n.children,
      o = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      n.mode === 'hidden')
    ) {
      if ((e.flags & 128) !== 0) {
        if (((o = o !== null ? o.baseLanes | a : a), t !== null)) {
          for (n = e.child = t.child, i = 0; n !== null; )
            ((i = i | n.lanes | n.childLanes), (n = n.sibling));
          n = i & ~o;
        } else ((n = 0), (e.child = null));
        return dm(t, e, o, a, n);
      }
      if ((a & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Zc(e, o !== null ? o.cachePool : null),
          o !== null ? hd(e, o) : Yo(),
          pd(e));
      else return ((n = e.lanes = 536870912), dm(t, e, o !== null ? o.baseLanes | a : a, a, n));
    } else
      o !== null
        ? (Zc(e, o.cachePool), hd(e, o), un(), (e.memoizedState = null))
        : (t !== null && Zc(e, null), Yo(), un());
    return (_e(t, e, i, a), e.child);
  }
  function qi(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.sibling
    );
  }
  function dm(t, e, a, n, i) {
    var o = Uo();
    return (
      (o = o === null ? null : { parent: ie._currentValue, pool: o }),
      (e.memoizedState = { baseLanes: a, cachePool: o }),
      t !== null && Zc(e, null),
      Yo(),
      pd(e),
      t !== null && Bl(t, e, n, !0),
      (e.childLanes = i),
      null
    );
  }
  function cs(t, e) {
    return (
      (e = os({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function mm(t, e, a) {
    return (
      Fn(e, t.child, null, a),
      (t = cs(e, e.pendingProps)),
      (t.flags |= 2),
      qe(e),
      (e.memoizedState = null),
      t
    );
  }
  function Gp(t, e, a) {
    var n = e.pendingProps,
      i = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (gt) {
        if (n.mode === 'hidden') return ((t = cs(e, n)), (e.lanes = 536870912), qi(null, t));
        if (
          (Ko(e),
          (t = Gt)
            ? ((t = A0(t, Ie)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: en !== null ? { id: ba, overflow: Sa } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Jf(t)),
                (a.return = e),
                (e.child = a),
                (ge = e),
                (Gt = null)))
            : (t = null),
          t === null)
        )
          throw nn(e);
        return ((e.lanes = 536870912), null);
      }
      return cs(e, n);
    }
    var o = t.memoizedState;
    if (o !== null) {
      var h = o.dehydrated;
      if ((Ko(e), i))
        if (e.flags & 256) ((e.flags &= -257), (e = mm(t, e, a)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(r(558));
      else if ((se || Bl(t, e, a, !1), (i = (a & t.childLanes) !== 0), se || i)) {
        if (((n = $t), n !== null && ((h = af(n, a)), h !== 0 && h !== o.retryLane)))
          throw ((o.retryLane = h), Gn(t, h), De(n, t, h), hr);
        (gs(), (e = mm(t, e, a)));
      } else
        ((t = o.treeContext),
          (Gt = ta(h.nextSibling)),
          (ge = e),
          (gt = !0),
          (an = null),
          (Ie = !1),
          t !== null && Pf(e, t),
          (e = cs(e, n)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = Oa(t.child, { mode: n.mode, children: n.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function ss(t, e) {
    var a = e.ref;
    if (a === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(r(284));
      (t === null || t.ref !== a) && (e.flags |= 4194816);
    }
  }
  function pr(t, e, a, n, i) {
    return (
      Kn(e),
      (a = Wo(t, e, a, n, void 0, i)),
      (n = Jo()),
      t !== null && !se
        ? (Fo(t, e, i), Ua(t, e, i))
        : (gt && n && zo(e), (e.flags |= 1), _e(t, e, a, i), e.child)
    );
  }
  function hm(t, e, a, n, i, o) {
    return (
      Kn(e),
      (e.updateQueue = null),
      (a = gd(e, n, a, i)),
      yd(t),
      (n = Jo()),
      t !== null && !se
        ? (Fo(t, e, o), Ua(t, e, o))
        : (gt && n && zo(e), (e.flags |= 1), _e(t, e, a, o), e.child)
    );
  }
  function pm(t, e, a, n, i) {
    if ((Kn(e), e.stateNode === null)) {
      var o = zl,
        h = a.contextType;
      (typeof h == 'object' && h !== null && (o = ve(h)),
        (o = new a(n, o)),
        (e.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null),
        (o.updater = dr),
        (e.stateNode = o),
        (o._reactInternals = e),
        (o = e.stateNode),
        (o.props = n),
        (o.state = e.memoizedState),
        (o.refs = {}),
        ko(e),
        (h = a.contextType),
        (o.context = typeof h == 'object' && h !== null ? ve(h) : zl),
        (o.state = e.memoizedState),
        (h = a.getDerivedStateFromProps),
        typeof h == 'function' && (fr(e, a, h, n), (o.state = e.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof o.getSnapshotBeforeUpdate == 'function' ||
          (typeof o.UNSAFE_componentWillMount != 'function' &&
            typeof o.componentWillMount != 'function') ||
          ((h = o.state),
          typeof o.componentWillMount == 'function' && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == 'function' && o.UNSAFE_componentWillMount(),
          h !== o.state && dr.enqueueReplaceState(o, o.state, null),
          Di(e, n, o, i),
          Bi(),
          (o.state = e.memoizedState)),
        typeof o.componentDidMount == 'function' && (e.flags |= 4194308),
        (n = !0));
    } else if (t === null) {
      o = e.stateNode;
      var v = e.memoizedProps,
        S = Pn(a, v);
      o.props = S;
      var w = o.context,
        B = a.contextType;
      ((h = zl), typeof B == 'object' && B !== null && (h = ve(B)));
      var U = a.getDerivedStateFromProps;
      ((B = typeof U == 'function' || typeof o.getSnapshotBeforeUpdate == 'function'),
        (v = e.pendingProps !== v),
        B ||
          (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof o.componentWillReceiveProps != 'function') ||
          ((v || w !== h) && em(e, o, n, h)),
        (cn = !1));
      var z = e.memoizedState;
      ((o.state = z),
        Di(e, n, o, i),
        Bi(),
        (w = e.memoizedState),
        v || z !== w || cn
          ? (typeof U == 'function' && (fr(e, a, U, n), (w = e.memoizedState)),
            (S = cn || tm(e, a, S, n, z, w, h))
              ? (B ||
                  (typeof o.UNSAFE_componentWillMount != 'function' &&
                    typeof o.componentWillMount != 'function') ||
                  (typeof o.componentWillMount == 'function' && o.componentWillMount(),
                  typeof o.UNSAFE_componentWillMount == 'function' &&
                    o.UNSAFE_componentWillMount()),
                typeof o.componentDidMount == 'function' && (e.flags |= 4194308))
              : (typeof o.componentDidMount == 'function' && (e.flags |= 4194308),
                (e.memoizedProps = n),
                (e.memoizedState = w)),
            (o.props = n),
            (o.state = w),
            (o.context = h),
            (n = S))
          : (typeof o.componentDidMount == 'function' && (e.flags |= 4194308), (n = !1)));
    } else {
      ((o = e.stateNode),
        Vo(t, e),
        (h = e.memoizedProps),
        (B = Pn(a, h)),
        (o.props = B),
        (U = e.pendingProps),
        (z = o.context),
        (w = a.contextType),
        (S = zl),
        typeof w == 'object' && w !== null && (S = ve(w)),
        (v = a.getDerivedStateFromProps),
        (w = typeof v == 'function' || typeof o.getSnapshotBeforeUpdate == 'function') ||
          (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof o.componentWillReceiveProps != 'function') ||
          ((h !== U || z !== S) && em(e, o, n, S)),
        (cn = !1),
        (z = e.memoizedState),
        (o.state = z),
        Di(e, n, o, i),
        Bi());
      var R = e.memoizedState;
      h !== U || z !== R || cn || (t !== null && t.dependencies !== null && Vc(t.dependencies))
        ? (typeof v == 'function' && (fr(e, a, v, n), (R = e.memoizedState)),
          (B =
            cn ||
            tm(e, a, B, n, z, R, S) ||
            (t !== null && t.dependencies !== null && Vc(t.dependencies)))
            ? (w ||
                (typeof o.UNSAFE_componentWillUpdate != 'function' &&
                  typeof o.componentWillUpdate != 'function') ||
                (typeof o.componentWillUpdate == 'function' && o.componentWillUpdate(n, R, S),
                typeof o.UNSAFE_componentWillUpdate == 'function' &&
                  o.UNSAFE_componentWillUpdate(n, R, S)),
              typeof o.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof o.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
            : (typeof o.componentDidUpdate != 'function' ||
                (h === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != 'function' ||
                (h === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = n),
              (e.memoizedState = R)),
          (o.props = n),
          (o.state = R),
          (o.context = S),
          (n = B))
        : (typeof o.componentDidUpdate != 'function' ||
            (h === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 4),
          typeof o.getSnapshotBeforeUpdate != 'function' ||
            (h === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 1024),
          (n = !1));
    }
    return (
      (o = n),
      ss(t, e),
      (n = (e.flags & 128) !== 0),
      o || n
        ? ((o = e.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : o.render()),
          (e.flags |= 1),
          t !== null && n
            ? ((e.child = Fn(e, t.child, null, i)), (e.child = Fn(e, null, a, i)))
            : _e(t, e, a, i),
          (e.memoizedState = o.state),
          (t = e.child))
        : (t = Ua(t, e, i)),
      t
    );
  }
  function ym(t, e, a, n) {
    return (Yn(), (e.flags |= 256), _e(t, e, a, n), e.child);
  }
  var yr = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function gr(t) {
    return { baseLanes: t, cachePool: id() };
  }
  function vr(t, e, a) {
    return ((t = t !== null ? t.childLanes & ~a : 0), e && (t |= Ve), t);
  }
  function gm(t, e, a) {
    var n = e.pendingProps,
      i = !1,
      o = (e.flags & 128) !== 0,
      h;
    if (
      ((h = o) || (h = t !== null && t.memoizedState === null ? !1 : (Pt.current & 2) !== 0),
      h && ((i = !0), (e.flags &= -129)),
      (h = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (gt) {
        if (
          (i ? rn(e) : un(),
          (t = Gt)
            ? ((t = A0(t, Ie)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: en !== null ? { id: ba, overflow: Sa } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Jf(t)),
                (a.return = e),
                (e.child = a),
                (ge = e),
                (Gt = null)))
            : (t = null),
          t === null)
        )
          throw nn(e);
        return (tu(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var v = n.children;
      return (
        (n = n.fallback),
        i
          ? (un(),
            (i = e.mode),
            (v = os({ mode: 'hidden', children: v }, i)),
            (n = Zn(n, i, a, null)),
            (v.return = e),
            (n.return = e),
            (v.sibling = n),
            (e.child = v),
            (n = e.child),
            (n.memoizedState = gr(a)),
            (n.childLanes = vr(t, h, a)),
            (e.memoizedState = yr),
            qi(null, n))
          : (rn(e), _r(e, v))
      );
    }
    var S = t.memoizedState;
    if (S !== null && ((v = S.dehydrated), v !== null)) {
      if (o)
        e.flags & 256
          ? (rn(e), (e.flags &= -257), (e = br(t, e, a)))
          : e.memoizedState !== null
            ? (un(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (un(),
              (v = n.fallback),
              (i = e.mode),
              (n = os({ mode: 'visible', children: n.children }, i)),
              (v = Zn(v, i, a, null)),
              (v.flags |= 2),
              (n.return = e),
              (v.return = e),
              (n.sibling = v),
              (e.child = n),
              Fn(e, t.child, null, a),
              (n = e.child),
              (n.memoizedState = gr(a)),
              (n.childLanes = vr(t, h, a)),
              (e.memoizedState = yr),
              (e = qi(null, n)));
      else if ((rn(e), tu(v))) {
        if (((h = v.nextSibling && v.nextSibling.dataset), h)) var w = h.dgst;
        ((h = w),
          (n = Error(r(419))),
          (n.stack = ''),
          (n.digest = h),
          wi({ value: n, source: null, stack: null }),
          (e = br(t, e, a)));
      } else if ((se || Bl(t, e, a, !1), (h = (a & t.childLanes) !== 0), se || h)) {
        if (((h = $t), h !== null && ((n = af(h, a)), n !== 0 && n !== S.retryLane)))
          throw ((S.retryLane = n), Gn(t, n), De(h, t, n), hr);
        (Pr(v) || gs(), (e = br(t, e, a)));
      } else
        Pr(v)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = S.treeContext),
            (Gt = ta(v.nextSibling)),
            (ge = e),
            (gt = !0),
            (an = null),
            (Ie = !1),
            t !== null && Pf(e, t),
            (e = _r(e, n.children)),
            (e.flags |= 4096));
      return e;
    }
    return i
      ? (un(),
        (v = n.fallback),
        (i = e.mode),
        (S = t.child),
        (w = S.sibling),
        (n = Oa(S, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = S.subtreeFlags & 65011712),
        w !== null ? (v = Oa(w, v)) : ((v = Zn(v, i, a, null)), (v.flags |= 2)),
        (v.return = e),
        (n.return = e),
        (n.sibling = v),
        (e.child = n),
        qi(null, n),
        (n = e.child),
        (v = t.child.memoizedState),
        v === null
          ? (v = gr(a))
          : ((i = v.cachePool),
            i !== null
              ? ((S = ie._currentValue), (i = i.parent !== S ? { parent: S, pool: S } : i))
              : (i = id()),
            (v = { baseLanes: v.baseLanes | a, cachePool: i })),
        (n.memoizedState = v),
        (n.childLanes = vr(t, h, a)),
        (e.memoizedState = yr),
        qi(t.child, n))
      : (rn(e),
        (a = t.child),
        (t = a.sibling),
        (a = Oa(a, { mode: 'visible', children: n.children })),
        (a.return = e),
        (a.sibling = null),
        t !== null &&
          ((h = e.deletions), h === null ? ((e.deletions = [t]), (e.flags |= 16)) : h.push(t)),
        (e.child = a),
        (e.memoizedState = null),
        a);
  }
  function _r(t, e) {
    return ((e = os({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function os(t, e) {
    return ((t = He(22, t, null, e)), (t.lanes = 0), t);
  }
  function br(t, e, a) {
    return (
      Fn(e, t.child, null, a),
      (t = _r(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function vm(t, e, a) {
    t.lanes |= e;
    var n = t.alternate;
    (n !== null && (n.lanes |= e), Do(t.return, e, a));
  }
  function Sr(t, e, a, n, i, o) {
    var h = t.memoizedState;
    h === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: i,
          treeForkCount: o,
        })
      : ((h.isBackwards = e),
        (h.rendering = null),
        (h.renderingStartTime = 0),
        (h.last = n),
        (h.tail = a),
        (h.tailMode = i),
        (h.treeForkCount = o));
  }
  function _m(t, e, a) {
    var n = e.pendingProps,
      i = n.revealOrder,
      o = n.tail;
    n = n.children;
    var h = Pt.current,
      v = (h & 2) !== 0;
    if (
      (v ? ((h = (h & 1) | 2), (e.flags |= 128)) : (h &= 1),
      k(Pt, h),
      _e(t, e, n, a),
      (n = gt ? Mi : 0),
      !v && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && vm(t, a, e);
        else if (t.tag === 19) vm(t, a, e);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (i) {
      case 'forwards':
        for (a = e.child, i = null; a !== null; )
          ((t = a.alternate), t !== null && Jc(t) === null && (i = a), (a = a.sibling));
        ((a = i),
          a === null ? ((i = e.child), (e.child = null)) : ((i = a.sibling), (a.sibling = null)),
          Sr(e, !1, i, a, o, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, i = e.child, e.child = null; i !== null; ) {
          if (((t = i.alternate), t !== null && Jc(t) === null)) {
            e.child = i;
            break;
          }
          ((t = i.sibling), (i.sibling = a), (a = i), (i = t));
        }
        Sr(e, !0, a, null, o, n);
        break;
      case 'together':
        Sr(e, !1, null, null, void 0, n);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Ua(t, e, a) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (mn |= e.lanes), (a & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Bl(t, e, a, !1), (a & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, a = Oa(t, t.pendingProps), e.child = a, a.return = e; t.sibling !== null; )
        ((t = t.sibling), (a = a.sibling = Oa(t, t.pendingProps)), (a.return = e));
      a.sibling = null;
    }
    return e.child;
  }
  function xr(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Vc(t)));
  }
  function Zp(t, e, a) {
    switch (e.tag) {
      case 3:
        (Ut(e, e.stateNode.containerInfo), ln(e, ie, t.memoizedState.cache), Yn());
        break;
      case 27:
      case 5:
        Le(e);
        break;
      case 4:
        Ut(e, e.stateNode.containerInfo);
        break;
      case 10:
        ln(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), Ko(e), null);
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (rn(e), (e.flags |= 128), null)
            : (a & e.child.childLanes) !== 0
              ? gm(t, e, a)
              : (rn(e), (t = Ua(t, e, a)), t !== null ? t.sibling : null);
        rn(e);
        break;
      case 19:
        var i = (t.flags & 128) !== 0;
        if (
          ((n = (a & e.childLanes) !== 0),
          n || (Bl(t, e, a, !1), (n = (a & e.childLanes) !== 0)),
          i)
        ) {
          if (n) return _m(t, e, a);
          e.flags |= 128;
        }
        if (
          ((i = e.memoizedState),
          i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          k(Pt, Pt.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), fm(t, e, a, e.pendingProps));
      case 24:
        ln(e, ie, t.memoizedState.cache);
    }
    return Ua(t, e, a);
  }
  function bm(t, e, a) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) se = !0;
      else {
        if (!xr(t, a) && (e.flags & 128) === 0) return ((se = !1), Zp(t, e, a));
        se = (t.flags & 131072) !== 0;
      }
    else ((se = !1), gt && (e.flags & 1048576) !== 0 && If(e, Mi, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (((t = Wn(e.elementType)), (e.type = t), typeof t == 'function'))
            Mo(t)
              ? ((n = Pn(t, n)), (e.tag = 1), (e = pm(null, e, t, n, a)))
              : ((e.tag = 0), (e = pr(null, e, t, n, a)));
          else {
            if (t != null) {
              var i = t.$$typeof;
              if (i === Mt) {
                ((e.tag = 11), (e = om(null, e, t, n, a)));
                break t;
              } else if (i === it) {
                ((e.tag = 14), (e = rm(null, e, t, n, a)));
                break t;
              }
            }
            throw ((e = ee(t) || t), Error(r(306, e, '')));
          }
        }
        return e;
      case 0:
        return pr(t, e, e.type, e.pendingProps, a);
      case 1:
        return ((n = e.type), (i = Pn(n, e.pendingProps)), pm(t, e, n, i, a));
      case 3:
        t: {
          if ((Ut(e, e.stateNode.containerInfo), t === null)) throw Error(r(387));
          n = e.pendingProps;
          var o = e.memoizedState;
          ((i = o.element), Vo(t, e), Di(e, n, null, a));
          var h = e.memoizedState;
          if (
            ((n = h.cache),
            ln(e, ie, n),
            n !== o.cache && Lo(e, [ie], a, !0),
            Bi(),
            (n = h.element),
            o.isDehydrated)
          )
            if (
              ((o = { element: n, isDehydrated: !1, cache: h.cache }),
              (e.updateQueue.baseState = o),
              (e.memoizedState = o),
              e.flags & 256)
            ) {
              e = ym(t, e, n, a);
              break t;
            } else if (n !== i) {
              ((i = We(Error(r(424)), e)), wi(i), (e = ym(t, e, n, a)));
              break t;
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === 'HTML' ? t.ownerDocument.body : t;
              }
              for (
                Gt = ta(t.firstChild),
                  ge = e,
                  gt = !0,
                  an = null,
                  Ie = !0,
                  a = fd(e, null, n, a),
                  e.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((Yn(), n === i)) {
              e = Ua(t, e, a);
              break t;
            }
            _e(t, e, n, a);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          ss(t, e),
          t === null
            ? (a = C0(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = a)
              : gt ||
                ((a = e.type),
                (t = e.pendingProps),
                (n = Ts(K.current).createElement(a)),
                (n[ye] = e),
                (n[Ne] = t),
                be(n, a, t),
                me(n),
                (e.stateNode = n))
            : (e.memoizedState = C0(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          Le(e),
          t === null &&
            gt &&
            ((n = e.stateNode = w0(e.type, e.pendingProps, K.current)),
            (ge = e),
            (Ie = !0),
            (i = Gt),
            vn(e.type) ? ((eu = i), (Gt = ta(n.firstChild))) : (Gt = i)),
          _e(t, e, e.pendingProps.children, a),
          ss(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            gt &&
            ((i = n = Gt) &&
              ((n = by(n, e.type, e.pendingProps, Ie)),
              n !== null
                ? ((e.stateNode = n), (ge = e), (Gt = ta(n.firstChild)), (Ie = !1), (i = !0))
                : (i = !1)),
            i || nn(e)),
          Le(e),
          (i = e.type),
          (o = e.pendingProps),
          (h = t !== null ? t.memoizedProps : null),
          (n = o.children),
          Jr(i, o) ? (n = null) : h !== null && Jr(i, h) && (e.flags |= 32),
          e.memoizedState !== null && ((i = Wo(t, e, Dp, null, null, a)), (ec._currentValue = i)),
          ss(t, e),
          _e(t, e, n, a),
          e.child
        );
      case 6:
        return (
          t === null &&
            gt &&
            ((t = a = Gt) &&
              ((a = Sy(a, e.pendingProps, Ie)),
              a !== null ? ((e.stateNode = a), (ge = e), (Gt = null), (t = !0)) : (t = !1)),
            t || nn(e)),
          null
        );
      case 13:
        return gm(t, e, a);
      case 4:
        return (
          Ut(e, e.stateNode.containerInfo),
          (n = e.pendingProps),
          t === null ? (e.child = Fn(e, null, n, a)) : _e(t, e, n, a),
          e.child
        );
      case 11:
        return om(t, e, e.type, e.pendingProps, a);
      case 7:
        return (_e(t, e, e.pendingProps, a), e.child);
      case 8:
        return (_e(t, e, e.pendingProps.children, a), e.child);
      case 12:
        return (_e(t, e, e.pendingProps.children, a), e.child);
      case 10:
        return ((n = e.pendingProps), ln(e, e.type, n.value), _e(t, e, n.children, a), e.child);
      case 9:
        return (
          (i = e.type._context),
          (n = e.pendingProps.children),
          Kn(e),
          (i = ve(i)),
          (n = n(i)),
          (e.flags |= 1),
          _e(t, e, n, a),
          e.child
        );
      case 14:
        return rm(t, e, e.type, e.pendingProps, a);
      case 15:
        return um(t, e, e.type, e.pendingProps, a);
      case 19:
        return _m(t, e, a);
      case 31:
        return Gp(t, e, a);
      case 22:
        return fm(t, e, a, e.pendingProps);
      case 24:
        return (
          Kn(e),
          (n = ve(ie)),
          t === null
            ? ((i = Uo()),
              i === null &&
                ((i = $t),
                (o = $o()),
                (i.pooledCache = o),
                o.refCount++,
                o !== null && (i.pooledCacheLanes |= a),
                (i = o)),
              (e.memoizedState = { parent: n, cache: i }),
              ko(e),
              ln(e, ie, i))
            : ((t.lanes & a) !== 0 && (Vo(t, e), Di(e, null, null, a), Bi()),
              (i = t.memoizedState),
              (o = e.memoizedState),
              i.parent !== n
                ? ((i = { parent: n, cache: n }),
                  (e.memoizedState = i),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = i),
                  ln(e, ie, n))
                : ((n = o.cache), ln(e, ie, n), n !== i.cache && Lo(e, [ie], a, !0))),
          _e(t, e, e.pendingProps.children, a),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function qa(t) {
    t.flags |= 4;
  }
  function jr(t, e, a, n, i) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (i & 335544128) === i))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Km()) t.flags |= 8192;
        else throw ((Jn = Xc), qo);
    } else t.flags &= -16777217;
  }
  function Sm(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !L0(e)))
      if (Km()) t.flags |= 8192;
      else throw ((Jn = Xc), qo);
  }
  function rs(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? le() : 536870912), (t.lanes |= e), (Xl |= e)));
  }
  function ki(t, e) {
    if (!gt)
      switch (t.tailMode) {
        case 'hidden':
          e = t.tail;
          for (var a = null; e !== null; ) (e.alternate !== null && (a = e), (e = e.sibling));
          a === null ? (t.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = t.tail;
          for (var n = null; a !== null; ) (a.alternate !== null && (n = a), (a = a.sibling));
          n === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (n.sibling = null);
      }
  }
  function Zt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      a = 0,
      n = 0;
    if (e)
      for (var i = t.child; i !== null; )
        ((a |= i.lanes | i.childLanes),
          (n |= i.subtreeFlags & 65011712),
          (n |= i.flags & 65011712),
          (i.return = t),
          (i = i.sibling));
    else
      for (i = t.child; i !== null; )
        ((a |= i.lanes | i.childLanes),
          (n |= i.subtreeFlags),
          (n |= i.flags),
          (i.return = t),
          (i = i.sibling));
    return ((t.subtreeFlags |= n), (t.childLanes = a), e);
  }
  function Yp(t, e, a) {
    var n = e.pendingProps;
    switch ((Co(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Zt(e), null);
      case 1:
        return (Zt(e), null);
      case 3:
        return (
          (a = e.stateNode),
          (n = null),
          t !== null && (n = t.memoizedState.cache),
          e.memoizedState.cache !== n && (e.flags |= 2048),
          La(ie),
          _t(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (Ol(e)
              ? qa(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Oo())),
          Zt(e),
          null
        );
      case 26:
        var i = e.type,
          o = e.memoizedState;
        return (
          t === null
            ? (qa(e), o !== null ? (Zt(e), Sm(e, o)) : (Zt(e), jr(e, i, null, n, a)))
            : o
              ? o !== t.memoizedState
                ? (qa(e), Zt(e), Sm(e, o))
                : (Zt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== n && qa(e), Zt(e), jr(e, i, t, n, a)),
          null
        );
      case 27:
        if ((ya(e), (a = K.current), (i = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && qa(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(r(166));
            return (Zt(e), null);
          }
          ((t = X.current), Ol(e) ? td(e) : ((t = w0(i, n, a)), (e.stateNode = t), qa(e)));
        }
        return (Zt(e), null);
      case 5:
        if ((ya(e), (i = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && qa(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(r(166));
            return (Zt(e), null);
          }
          if (((o = X.current), Ol(e))) td(e);
          else {
            var h = Ts(K.current);
            switch (o) {
              case 1:
                o = h.createElementNS('http://www.w3.org/2000/svg', i);
                break;
              case 2:
                o = h.createElementNS('http://www.w3.org/1998/Math/MathML', i);
                break;
              default:
                switch (i) {
                  case 'svg':
                    o = h.createElementNS('http://www.w3.org/2000/svg', i);
                    break;
                  case 'math':
                    o = h.createElementNS('http://www.w3.org/1998/Math/MathML', i);
                    break;
                  case 'script':
                    ((o = h.createElement('div')),
                      (o.innerHTML = '<script><\/script>'),
                      (o = o.removeChild(o.firstChild)));
                    break;
                  case 'select':
                    ((o =
                      typeof n.is == 'string'
                        ? h.createElement('select', { is: n.is })
                        : h.createElement('select')),
                      n.multiple ? (o.multiple = !0) : n.size && (o.size = n.size));
                    break;
                  default:
                    o =
                      typeof n.is == 'string'
                        ? h.createElement(i, { is: n.is })
                        : h.createElement(i);
                }
            }
            ((o[ye] = e), (o[Ne] = n));
            t: for (h = e.child; h !== null; ) {
              if (h.tag === 5 || h.tag === 6) o.appendChild(h.stateNode);
              else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                ((h.child.return = h), (h = h.child));
                continue;
              }
              if (h === e) break t;
              for (; h.sibling === null; ) {
                if (h.return === null || h.return === e) break t;
                h = h.return;
              }
              ((h.sibling.return = h.return), (h = h.sibling));
            }
            e.stateNode = o;
            t: switch ((be(o, i, n), i)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                n = !!n.autoFocus;
                break t;
              case 'img':
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && qa(e);
          }
        }
        return (Zt(e), jr(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, a), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== n && qa(e);
        else {
          if (typeof n != 'string' && e.stateNode === null) throw Error(r(166));
          if (((t = K.current), Ol(e))) {
            if (((t = e.stateNode), (a = e.memoizedProps), (n = null), (i = ge), i !== null))
              switch (i.tag) {
                case 27:
                case 5:
                  n = i.memoizedProps;
              }
            ((t[ye] = e),
              (t = !!(
                t.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                g0(t.nodeValue, a)
              )),
              t || nn(e, !0));
          } else ((t = Ts(t).createTextNode(n)), (t[ye] = e), (e.stateNode = t));
        }
        return (Zt(e), null);
      case 31:
        if (((a = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((n = Ol(e)), a !== null)) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(r(557));
              t[ye] = e;
            } else (Yn(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (Zt(e), (t = !1));
          } else
            ((a = Oo()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a),
              (t = !0));
          if (!t) return e.flags & 256 ? (qe(e), e) : (qe(e), null);
          if ((e.flags & 128) !== 0) throw Error(r(558));
        }
        return (Zt(e), null);
      case 13:
        if (
          ((n = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((i = Ol(e)), n !== null && n.dehydrated !== null)) {
            if (t === null) {
              if (!i) throw Error(r(318));
              if (((i = e.memoizedState), (i = i !== null ? i.dehydrated : null), !i))
                throw Error(r(317));
              i[ye] = e;
            } else (Yn(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (Zt(e), (i = !1));
          } else
            ((i = Oo()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i),
              (i = !0));
          if (!i) return e.flags & 256 ? (qe(e), e) : (qe(e), null);
        }
        return (
          qe(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = a), e)
            : ((a = n !== null),
              (t = t !== null && t.memoizedState !== null),
              a &&
                ((n = e.child),
                (i = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (i = n.alternate.memoizedState.cachePool.pool),
                (o = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (o = n.memoizedState.cachePool.pool),
                o !== i && (n.flags |= 2048)),
              a !== t && a && (e.child.flags |= 8192),
              rs(e, e.updateQueue),
              Zt(e),
              null)
        );
      case 4:
        return (_t(), t === null && Yr(e.stateNode.containerInfo), Zt(e), null);
      case 10:
        return (La(e.type), Zt(e), null);
      case 19:
        if ((H(Pt), (n = e.memoizedState), n === null)) return (Zt(e), null);
        if (((i = (e.flags & 128) !== 0), (o = n.rendering), o === null))
          if (i) ki(n, !1);
          else {
            if (Jt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((o = Jc(t)), o !== null)) {
                  for (
                    e.flags |= 128,
                      ki(n, !1),
                      t = o.updateQueue,
                      e.updateQueue = t,
                      rs(e, t),
                      e.subtreeFlags = 0,
                      t = a,
                      a = e.child;
                    a !== null;
                  )
                    (Wf(a, t), (a = a.sibling));
                  return (k(Pt, (Pt.current & 1) | 2), gt && Ba(e, n.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            n.tail !== null &&
              de() > hs &&
              ((e.flags |= 128), (i = !0), ki(n, !1), (e.lanes = 4194304));
          }
        else {
          if (!i)
            if (((t = Jc(o)), t !== null)) {
              if (
                ((e.flags |= 128),
                (i = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                rs(e, t),
                ki(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !o.alternate && !gt)
              )
                return (Zt(e), null);
            } else
              2 * de() - n.renderingStartTime > hs &&
                a !== 536870912 &&
                ((e.flags |= 128), (i = !0), ki(n, !1), (e.lanes = 4194304));
          n.isBackwards
            ? ((o.sibling = e.child), (e.child = o))
            : ((t = n.last), t !== null ? (t.sibling = o) : (e.child = o), (n.last = o));
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = de()),
            (t.sibling = null),
            (a = Pt.current),
            k(Pt, i ? (a & 1) | 2 : a & 1),
            gt && Ba(e, n.treeForkCount),
            t)
          : (Zt(e), null);
      case 22:
      case 23:
        return (
          qe(e),
          Xo(),
          (n = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== n && (e.flags |= 8192)
            : n && (e.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Zt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Zt(e),
          (a = e.updateQueue),
          a !== null && rs(e, a.retryQueue),
          (a = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          (n = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          n !== a && (e.flags |= 2048),
          t !== null && H(Qn),
          null
        );
      case 24:
        return (
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          La(ie),
          Zt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, e.tag));
  }
  function Xp(t, e) {
    switch ((Co(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          La(ie),
          _t(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (ya(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((qe(e), e.alternate === null)) throw Error(r(340));
          Yn();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((qe(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(r(340));
          Yn();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (H(Pt), null);
      case 4:
        return (_t(), null);
      case 10:
        return (La(e.type), null);
      case 22:
      case 23:
        return (
          qe(e),
          Xo(),
          t !== null && H(Qn),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (La(ie), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function xm(t, e) {
    switch ((Co(e), e.tag)) {
      case 3:
        (La(ie), _t());
        break;
      case 26:
      case 27:
      case 5:
        ya(e);
        break;
      case 4:
        _t();
        break;
      case 31:
        e.memoizedState !== null && qe(e);
        break;
      case 13:
        qe(e);
        break;
      case 19:
        H(Pt);
        break;
      case 10:
        La(e.type);
        break;
      case 22:
      case 23:
        (qe(e), Xo(), t !== null && H(Qn));
        break;
      case 24:
        La(ie);
    }
  }
  function Vi(t, e) {
    try {
      var a = e.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        a = i;
        do {
          if ((a.tag & t) === t) {
            n = void 0;
            var o = a.create,
              h = a.inst;
            ((n = o()), (h.destroy = n));
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (v) {
      zt(e, e.return, v);
    }
  }
  function fn(t, e, a) {
    try {
      var n = e.updateQueue,
        i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var o = i.next;
        n = o;
        do {
          if ((n.tag & t) === t) {
            var h = n.inst,
              v = h.destroy;
            if (v !== void 0) {
              ((h.destroy = void 0), (i = e));
              var S = a,
                w = v;
              try {
                w();
              } catch (B) {
                zt(i, S, B);
              }
            }
          }
          n = n.next;
        } while (n !== o);
      }
    } catch (B) {
      zt(e, e.return, B);
    }
  }
  function jm(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        md(e, a);
      } catch (n) {
        zt(t, t.return, n);
      }
    }
  }
  function Tm(t, e, a) {
    ((a.props = Pn(t.type, t.memoizedProps)), (a.state = t.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      zt(t, e, n);
    }
  }
  function Gi(t, e) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof a == 'function' ? (t.refCleanup = a(n)) : (a.current = n);
      }
    } catch (i) {
      zt(t, e, i);
    }
  }
  function xa(t, e) {
    var a = t.ref,
      n = t.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (i) {
          zt(t, e, i);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (i) {
          zt(t, e, i);
        }
      else a.current = null;
  }
  function Am(t) {
    var e = t.type,
      a = t.memoizedProps,
      n = t.stateNode;
    try {
      t: switch (e) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && n.focus();
          break t;
        case 'img':
          a.src ? (n.src = a.src) : a.srcSet && (n.srcset = a.srcSet);
      }
    } catch (i) {
      zt(t, t.return, i);
    }
  }
  function Tr(t, e, a) {
    try {
      var n = t.stateNode;
      (hy(n, t.type, a, e), (n[Ne] = e));
    } catch (i) {
      zt(t, t.return, i);
    }
  }
  function Em(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && vn(t.type)) || t.tag === 4
    );
  }
  function Ar(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Em(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && vn(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Er(t, e, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      ((t = t.stateNode),
        e
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === 'HTML'
                ? a.ownerDocument.body
                : a
            ).insertBefore(t, e)
          : ((e = a.nodeType === 9 ? a.body : a.nodeName === 'HTML' ? a.ownerDocument.body : a),
            e.appendChild(t),
            (a = a._reactRootContainer),
            a != null || e.onclick !== null || (e.onclick = Ca)));
    else if (
      n !== 4 &&
      (n === 27 && vn(t.type) && ((a = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (Er(t, e, a), t = t.sibling; t !== null; ) (Er(t, e, a), (t = t.sibling));
  }
  function us(t, e, a) {
    var n = t.tag;
    if (n === 5 || n === 6) ((t = t.stateNode), e ? a.insertBefore(t, e) : a.appendChild(t));
    else if (n !== 4 && (n === 27 && vn(t.type) && (a = t.stateNode), (t = t.child), t !== null))
      for (us(t, e, a), t = t.sibling; t !== null; ) (us(t, e, a), (t = t.sibling));
  }
  function Mm(t) {
    var e = t.stateNode,
      a = t.memoizedProps;
    try {
      for (var n = t.type, i = e.attributes; i.length; ) e.removeAttributeNode(i[0]);
      (be(e, n, a), (e[ye] = t), (e[Ne] = a));
    } catch (o) {
      zt(t, t.return, o);
    }
  }
  var ka = !1,
    oe = !1,
    Mr = !1,
    wm = typeof WeakSet == 'function' ? WeakSet : Set,
    he = null;
  function Kp(t, e) {
    if (((t = t.containerInfo), (Qr = Cs), (t = qf(t)), bo(t))) {
      if ('selectionStart' in t) var a = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          a = ((a = t.ownerDocument) && a.defaultView) || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var i = n.anchorOffset,
              o = n.focusNode;
            n = n.focusOffset;
            try {
              (a.nodeType, o.nodeType);
            } catch {
              a = null;
              break t;
            }
            var h = 0,
              v = -1,
              S = -1,
              w = 0,
              B = 0,
              U = t,
              z = null;
            e: for (;;) {
              for (
                var R;
                U !== a || (i !== 0 && U.nodeType !== 3) || (v = h + i),
                  U !== o || (n !== 0 && U.nodeType !== 3) || (S = h + n),
                  U.nodeType === 3 && (h += U.nodeValue.length),
                  (R = U.firstChild) !== null;
              )
                ((z = U), (U = R));
              for (;;) {
                if (U === t) break e;
                if (
                  (z === a && ++w === i && (v = h),
                  z === o && ++B === n && (S = h),
                  (R = U.nextSibling) !== null)
                )
                  break;
                ((U = z), (z = U.parentNode));
              }
              U = R;
            }
            a = v === -1 || S === -1 ? null : { start: v, end: S };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Wr = { focusedElem: t, selectionRange: a }, Cs = !1, he = e; he !== null; )
      if (((e = he), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = e), (he = t));
      else
        for (; he !== null; ) {
          switch (((e = he), (o = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (a = 0; a < t.length; a++) ((i = t[a]), (i.ref.impl = i.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && o !== null) {
                ((t = void 0),
                  (a = e),
                  (i = o.memoizedProps),
                  (o = o.memoizedState),
                  (n = a.stateNode));
                try {
                  var W = Pn(a.type, i);
                  ((t = n.getSnapshotBeforeUpdate(W, o)),
                    (n.__reactInternalSnapshotBeforeUpdate = t));
                } catch (lt) {
                  zt(a, a.return, lt);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (a = t.nodeType), a === 9)) Ir(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Ir(t);
                      break;
                    default:
                      t.textContent = '';
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (((t = e.sibling), t !== null)) {
            ((t.return = e.return), (he = t));
            break;
          }
          he = e.return;
        }
  }
  function Nm(t, e, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Ga(t, a), n & 4 && Vi(5, a));
        break;
      case 1:
        if ((Ga(t, a), n & 4))
          if (((t = a.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (h) {
              zt(a, a.return, h);
            }
          else {
            var i = Pn(a.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(i, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (h) {
              zt(a, a.return, h);
            }
          }
        (n & 64 && jm(a), n & 512 && Gi(a, a.return));
        break;
      case 3:
        if ((Ga(t, a), n & 64 && ((t = a.updateQueue), t !== null))) {
          if (((e = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                e = a.child.stateNode;
                break;
              case 1:
                e = a.child.stateNode;
            }
          try {
            md(t, e);
          } catch (h) {
            zt(a, a.return, h);
          }
        }
        break;
      case 27:
        e === null && n & 4 && Mm(a);
      case 26:
      case 5:
        (Ga(t, a), e === null && n & 4 && Am(a), n & 512 && Gi(a, a.return));
        break;
      case 12:
        Ga(t, a);
        break;
      case 31:
        (Ga(t, a), n & 4 && Rm(t, a));
        break;
      case 13:
        (Ga(t, a),
          n & 4 && Om(t, a),
          n & 64 &&
            ((t = a.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((a = ay.bind(null, a)), xy(t, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || ka), !n)) {
          ((e = (e !== null && e.memoizedState !== null) || oe), (i = ka));
          var o = oe;
          ((ka = n),
            (oe = e) && !o ? Za(t, a, (a.subtreeFlags & 8772) !== 0) : Ga(t, a),
            (ka = i),
            (oe = o));
        }
        break;
      case 30:
        break;
      default:
        Ga(t, a);
    }
  }
  function zm(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), zm(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && ao(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var Xt = null,
    Ce = !1;
  function Va(t, e, a) {
    for (a = a.child; a !== null; ) (Cm(t, e, a), (a = a.sibling));
  }
  function Cm(t, e, a) {
    if (ae && typeof ae.onCommitFiberUnmount == 'function')
      try {
        ae.onCommitFiberUnmount(we, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (oe || xa(a, e),
          Va(t, e, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        oe || xa(a, e);
        var n = Xt,
          i = Ce;
        (vn(a.type) && ((Xt = a.stateNode), (Ce = !1)),
          Va(t, e, a),
          Ii(a.stateNode),
          (Xt = n),
          (Ce = i));
        break;
      case 5:
        oe || xa(a, e);
      case 6:
        if (((n = Xt), (i = Ce), (Xt = null), Va(t, e, a), (Xt = n), (Ce = i), Xt !== null))
          if (Ce)
            try {
              (Xt.nodeType === 9
                ? Xt.body
                : Xt.nodeName === 'HTML'
                  ? Xt.ownerDocument.body
                  : Xt
              ).removeChild(a.stateNode);
            } catch (o) {
              zt(a, e, o);
            }
          else
            try {
              Xt.removeChild(a.stateNode);
            } catch (o) {
              zt(a, e, o);
            }
        break;
      case 18:
        Xt !== null &&
          (Ce
            ? ((t = Xt),
              j0(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                a.stateNode
              ),
              ti(t))
            : j0(Xt, a.stateNode));
        break;
      case 4:
        ((n = Xt),
          (i = Ce),
          (Xt = a.stateNode.containerInfo),
          (Ce = !0),
          Va(t, e, a),
          (Xt = n),
          (Ce = i));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (fn(2, a, e), oe || fn(4, a, e), Va(t, e, a));
        break;
      case 1:
        (oe ||
          (xa(a, e), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && Tm(a, e, n)),
          Va(t, e, a));
        break;
      case 21:
        Va(t, e, a);
        break;
      case 22:
        ((oe = (n = oe) || a.memoizedState !== null), Va(t, e, a), (oe = n));
        break;
      default:
        Va(t, e, a);
    }
  }
  function Rm(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        ti(t);
      } catch (a) {
        zt(e, e.return, a);
      }
    }
  }
  function Om(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        ti(t);
      } catch (a) {
        zt(e, e.return, a);
      }
  }
  function Qp(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new wm()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new wm()),
          e
        );
      default:
        throw Error(r(435, t.tag));
    }
  }
  function fs(t, e) {
    var a = Qp(t);
    e.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var i = ny.bind(null, t, n);
        n.then(i, i);
      }
    });
  }
  function Re(t, e) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var i = a[n],
          o = t,
          h = e,
          v = h;
        t: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (vn(v.type)) {
                ((Xt = v.stateNode), (Ce = !1));
                break t;
              }
              break;
            case 5:
              ((Xt = v.stateNode), (Ce = !1));
              break t;
            case 3:
            case 4:
              ((Xt = v.stateNode.containerInfo), (Ce = !0));
              break t;
          }
          v = v.return;
        }
        if (Xt === null) throw Error(r(160));
        (Cm(o, h, i),
          (Xt = null),
          (Ce = !1),
          (o = i.alternate),
          o !== null && (o.return = null),
          (i.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (Bm(e, t), (e = e.sibling));
  }
  var sa = null;
  function Bm(t, e) {
    var a = t.alternate,
      n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Re(e, t), Oe(t), n & 4 && (fn(3, t, t.return), Vi(3, t), fn(5, t, t.return)));
        break;
      case 1:
        (Re(e, t),
          Oe(t),
          n & 512 && (oe || a === null || xa(a, a.return)),
          n & 64 &&
            ka &&
            ((t = t.updateQueue),
            t !== null &&
              ((n = t.callbacks),
              n !== null &&
                ((a = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var i = sa;
        if ((Re(e, t), Oe(t), n & 512 && (oe || a === null || xa(a, a.return)), n & 4)) {
          var o = a !== null ? a.memoizedState : null;
          if (((n = t.memoizedState), a === null))
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  ((n = t.type), (a = t.memoizedProps), (i = i.ownerDocument || i));
                  e: switch (n) {
                    case 'title':
                      ((o = i.getElementsByTagName('title')[0]),
                        (!o ||
                          o[yi] ||
                          o[ye] ||
                          o.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          o.hasAttribute('itemprop')) &&
                          ((o = i.createElement(n)),
                          i.head.insertBefore(o, i.querySelector('head > title'))),
                        be(o, n, a),
                        (o[ye] = t),
                        me(o),
                        (n = o));
                      break t;
                    case 'link':
                      var h = B0('link', 'href', i).get(n + (a.href || ''));
                      if (h) {
                        for (var v = 0; v < h.length; v++)
                          if (
                            ((o = h[v]),
                            o.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              o.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              o.getAttribute('title') === (a.title == null ? null : a.title) &&
                              o.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            h.splice(v, 1);
                            break e;
                          }
                      }
                      ((o = i.createElement(n)), be(o, n, a), i.head.appendChild(o));
                      break;
                    case 'meta':
                      if ((h = B0('meta', 'content', i).get(n + (a.content || '')))) {
                        for (v = 0; v < h.length; v++)
                          if (
                            ((o = h[v]),
                            o.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              o.getAttribute('name') === (a.name == null ? null : a.name) &&
                              o.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              o.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              o.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            h.splice(v, 1);
                            break e;
                          }
                      }
                      ((o = i.createElement(n)), be(o, n, a), i.head.appendChild(o));
                      break;
                    default:
                      throw Error(r(468, n));
                  }
                  ((o[ye] = t), me(o), (n = o));
                }
                t.stateNode = n;
              } else D0(i, t.type, t.stateNode);
            else t.stateNode = O0(i, n, t.memoizedProps);
          else
            o !== n
              ? (o === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : o.count--,
                n === null ? D0(i, t.type, t.stateNode) : O0(i, n, t.memoizedProps))
              : n === null && t.stateNode !== null && Tr(t, t.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Re(e, t),
          Oe(t),
          n & 512 && (oe || a === null || xa(a, a.return)),
          a !== null && n & 4 && Tr(t, t.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Re(e, t), Oe(t), n & 512 && (oe || a === null || xa(a, a.return)), t.flags & 32)) {
          i = t.stateNode;
          try {
            jl(i, '');
          } catch (W) {
            zt(t, t.return, W);
          }
        }
        (n & 4 &&
          t.stateNode != null &&
          ((i = t.memoizedProps), Tr(t, i, a !== null ? a.memoizedProps : i)),
          n & 1024 && (Mr = !0));
        break;
      case 6:
        if ((Re(e, t), Oe(t), n & 4)) {
          if (t.stateNode === null) throw Error(r(162));
          ((n = t.memoizedProps), (a = t.stateNode));
          try {
            a.nodeValue = n;
          } catch (W) {
            zt(t, t.return, W);
          }
        }
        break;
      case 3:
        if (
          ((Ms = null),
          (i = sa),
          (sa = As(e.containerInfo)),
          Re(e, t),
          (sa = i),
          Oe(t),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            ti(e.containerInfo);
          } catch (W) {
            zt(t, t.return, W);
          }
        Mr && ((Mr = !1), Dm(t));
        break;
      case 4:
        ((n = sa), (sa = As(t.stateNode.containerInfo)), Re(e, t), Oe(t), (sa = n));
        break;
      case 12:
        (Re(e, t), Oe(t));
        break;
      case 31:
        (Re(e, t),
          Oe(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), fs(t, n))));
        break;
      case 13:
        (Re(e, t),
          Oe(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (ms = de()),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), fs(t, n))));
        break;
      case 22:
        i = t.memoizedState !== null;
        var S = a !== null && a.memoizedState !== null,
          w = ka,
          B = oe;
        if (((ka = w || i), (oe = B || S), Re(e, t), (oe = B), (ka = w), Oe(t), n & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = i ? e._visibility & -2 : e._visibility | 1,
              i && (a === null || S || ka || oe || tl(t)),
              a = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (a === null) {
                S = a = e;
                try {
                  if (((o = S.stateNode), i))
                    ((h = o.style),
                      typeof h.setProperty == 'function'
                        ? h.setProperty('display', 'none', 'important')
                        : (h.display = 'none'));
                  else {
                    v = S.stateNode;
                    var U = S.memoizedProps.style,
                      z = U != null && U.hasOwnProperty('display') ? U.display : null;
                    v.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (W) {
                  zt(S, S.return, W);
                }
              }
            } else if (e.tag === 6) {
              if (a === null) {
                S = e;
                try {
                  S.stateNode.nodeValue = i ? '' : S.memoizedProps;
                } catch (W) {
                  zt(S, S.return, W);
                }
              }
            } else if (e.tag === 18) {
              if (a === null) {
                S = e;
                try {
                  var R = S.stateNode;
                  i ? T0(R, !0) : T0(S.stateNode, !1);
                } catch (W) {
                  zt(S, S.return, W);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) || e.memoizedState === null || e === t) &&
              e.child !== null
            ) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              (a === e && (a = null), (e = e.return));
            }
            (a === e && (a = null), (e.sibling.return = e.return), (e = e.sibling));
          }
        n & 4 &&
          ((n = t.updateQueue),
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), fs(t, a))));
        break;
      case 19:
        (Re(e, t),
          Oe(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), fs(t, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Re(e, t), Oe(t));
    }
  }
  function Oe(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var a, n = t.return; n !== null; ) {
          if (Em(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var i = a.stateNode,
              o = Ar(t);
            us(t, o, i);
            break;
          case 5:
            var h = a.stateNode;
            a.flags & 32 && (jl(h, ''), (a.flags &= -33));
            var v = Ar(t);
            us(t, v, h);
            break;
          case 3:
          case 4:
            var S = a.stateNode.containerInfo,
              w = Ar(t);
            Er(t, w, S);
            break;
          default:
            throw Error(r(161));
        }
      } catch (B) {
        zt(t, t.return, B);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Dm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (Dm(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function Ga(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (Nm(t, e.alternate, e), (e = e.sibling));
  }
  function tl(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (fn(4, e, e.return), tl(e));
          break;
        case 1:
          xa(e, e.return);
          var a = e.stateNode;
          (typeof a.componentWillUnmount == 'function' && Tm(e, e.return, a), tl(e));
          break;
        case 27:
          Ii(e.stateNode);
        case 26:
        case 5:
          (xa(e, e.return), tl(e));
          break;
        case 22:
          e.memoizedState === null && tl(e);
          break;
        case 30:
          tl(e);
          break;
        default:
          tl(e);
      }
      t = t.sibling;
    }
  }
  function Za(t, e, a) {
    for (a = a && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate,
        i = t,
        o = e,
        h = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          (Za(i, o, a), Vi(4, o));
          break;
        case 1:
          if ((Za(i, o, a), (n = o), (i = n.stateNode), typeof i.componentDidMount == 'function'))
            try {
              i.componentDidMount();
            } catch (w) {
              zt(n, n.return, w);
            }
          if (((n = o), (i = n.updateQueue), i !== null)) {
            var v = n.stateNode;
            try {
              var S = i.shared.hiddenCallbacks;
              if (S !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < S.length; i++) dd(S[i], v);
            } catch (w) {
              zt(n, n.return, w);
            }
          }
          (a && h & 64 && jm(o), Gi(o, o.return));
          break;
        case 27:
          Mm(o);
        case 26:
        case 5:
          (Za(i, o, a), a && n === null && h & 4 && Am(o), Gi(o, o.return));
          break;
        case 12:
          Za(i, o, a);
          break;
        case 31:
          (Za(i, o, a), a && h & 4 && Rm(i, o));
          break;
        case 13:
          (Za(i, o, a), a && h & 4 && Om(i, o));
          break;
        case 22:
          (o.memoizedState === null && Za(i, o, a), Gi(o, o.return));
          break;
        case 30:
          break;
        default:
          Za(i, o, a);
      }
      e = e.sibling;
    }
  }
  function wr(t, e) {
    var a = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (a = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== a && (t != null && t.refCount++, a != null && Ni(a)));
  }
  function Nr(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Ni(t)));
  }
  function oa(t, e, a, n) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Lm(t, e, a, n), (e = e.sibling));
  }
  function Lm(t, e, a, n) {
    var i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (oa(t, e, a, n), i & 2048 && Vi(9, e));
        break;
      case 1:
        oa(t, e, a, n);
        break;
      case 3:
        (oa(t, e, a, n),
          i & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Ni(t))));
        break;
      case 12:
        if (i & 2048) {
          (oa(t, e, a, n), (t = e.stateNode));
          try {
            var o = e.memoizedProps,
              h = o.id,
              v = o.onPostCommit;
            typeof v == 'function' &&
              v(h, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (S) {
            zt(e, e.return, S);
          }
        } else oa(t, e, a, n);
        break;
      case 31:
        oa(t, e, a, n);
        break;
      case 13:
        oa(t, e, a, n);
        break;
      case 23:
        break;
      case 22:
        ((o = e.stateNode),
          (h = e.alternate),
          e.memoizedState !== null
            ? o._visibility & 2
              ? oa(t, e, a, n)
              : Zi(t, e)
            : o._visibility & 2
              ? oa(t, e, a, n)
              : ((o._visibility |= 2), Gl(t, e, a, n, (e.subtreeFlags & 10256) !== 0 || !1)),
          i & 2048 && wr(h, e));
        break;
      case 24:
        (oa(t, e, a, n), i & 2048 && Nr(e.alternate, e));
        break;
      default:
        oa(t, e, a, n);
    }
  }
  function Gl(t, e, a, n, i) {
    for (i = i && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var o = t,
        h = e,
        v = a,
        S = n,
        w = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          (Gl(o, h, v, S, i), Vi(8, h));
          break;
        case 23:
          break;
        case 22:
          var B = h.stateNode;
          (h.memoizedState !== null
            ? B._visibility & 2
              ? Gl(o, h, v, S, i)
              : Zi(o, h)
            : ((B._visibility |= 2), Gl(o, h, v, S, i)),
            i && w & 2048 && wr(h.alternate, h));
          break;
        case 24:
          (Gl(o, h, v, S, i), i && w & 2048 && Nr(h.alternate, h));
          break;
        default:
          Gl(o, h, v, S, i);
      }
      e = e.sibling;
    }
  }
  function Zi(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var a = t,
          n = e,
          i = n.flags;
        switch (n.tag) {
          case 22:
            (Zi(a, n), i & 2048 && wr(n.alternate, n));
            break;
          case 24:
            (Zi(a, n), i & 2048 && Nr(n.alternate, n));
            break;
          default:
            Zi(a, n);
        }
        e = e.sibling;
      }
  }
  var Yi = 8192;
  function Zl(t, e, a) {
    if (t.subtreeFlags & Yi) for (t = t.child; t !== null; ) ($m(t, e, a), (t = t.sibling));
  }
  function $m(t, e, a) {
    switch (t.tag) {
      case 26:
        (Zl(t, e, a),
          t.flags & Yi && t.memoizedState !== null && By(a, sa, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Zl(t, e, a);
        break;
      case 3:
      case 4:
        var n = sa;
        ((sa = As(t.stateNode.containerInfo)), Zl(t, e, a), (sa = n));
        break;
      case 22:
        t.memoizedState === null &&
          ((n = t.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Yi), (Yi = 16777216), Zl(t, e, a), (Yi = n))
            : Zl(t, e, a));
        break;
      default:
        Zl(t, e, a);
    }
  }
  function Hm(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function Xi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var n = e[a];
          ((he = n), qm(n, t));
        }
      Hm(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Um(t), (t = t.sibling));
  }
  function Um(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Xi(t), t.flags & 2048 && fn(9, t, t.return));
        break;
      case 3:
        Xi(t);
        break;
      case 12:
        Xi(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), ds(t))
          : Xi(t);
        break;
      default:
        Xi(t);
    }
  }
  function ds(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var n = e[a];
          ((he = n), qm(n, t));
        }
      Hm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (fn(8, e, e.return), ds(e));
          break;
        case 22:
          ((a = e.stateNode), a._visibility & 2 && ((a._visibility &= -3), ds(e)));
          break;
        default:
          ds(e);
      }
      t = t.sibling;
    }
  }
  function qm(t, e) {
    for (; he !== null; ) {
      var a = he;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          fn(8, a, e);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Ni(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (he = n));
      else
        t: for (a = t; he !== null; ) {
          n = he;
          var i = n.sibling,
            o = n.return;
          if ((zm(n), n === a)) {
            he = null;
            break t;
          }
          if (i !== null) {
            ((i.return = o), (he = i));
            break t;
          }
          he = o;
        }
    }
  }
  var Wp = {
      getCacheForType: function (t) {
        var e = ve(ie),
          a = e.data.get(t);
        return (a === void 0 && ((a = t()), e.data.set(t, a)), a);
      },
      cacheSignal: function () {
        return ve(ie).controller.signal;
      },
    },
    Jp = typeof WeakMap == 'function' ? WeakMap : Map,
    Et = 0,
    $t = null,
    dt = null,
    ht = 0,
    Nt = 0,
    ke = null,
    dn = !1,
    Yl = !1,
    zr = !1,
    Ya = 0,
    Jt = 0,
    mn = 0,
    el = 0,
    Cr = 0,
    Ve = 0,
    Xl = 0,
    Ki = null,
    Be = null,
    Rr = !1,
    ms = 0,
    km = 0,
    hs = 1 / 0,
    ps = null,
    hn = null,
    fe = 0,
    pn = null,
    Kl = null,
    Xa = 0,
    Or = 0,
    Br = null,
    Vm = null,
    Qi = 0,
    Dr = null;
  function Ge() {
    return (Et & 2) !== 0 && ht !== 0 ? ht & -ht : O.T !== null ? kr() : nf();
  }
  function Gm() {
    if (Ve === 0)
      if ((ht & 536870912) === 0 || gt) {
        var t = qt;
        ((qt <<= 1), (qt & 3932160) === 0 && (qt = 262144), (Ve = t));
      } else Ve = 536870912;
    return ((t = Ue.current), t !== null && (t.flags |= 32), Ve);
  }
  function De(t, e, a) {
    (((t === $t && (Nt === 2 || Nt === 9)) || t.cancelPendingCommit !== null) &&
      (Ql(t, 0), yn(t, ht, Ve, !1)),
      Ia(t, a),
      ((Et & 2) === 0 || t !== $t) &&
        (t === $t && ((Et & 2) === 0 && (el |= a), Jt === 4 && yn(t, ht, Ve, !1)), ja(t)));
  }
  function Zm(t, e, a) {
    if ((Et & 6) !== 0) throw Error(r(327));
    var n = (!a && (e & 127) === 0 && (e & t.expiredLanes) === 0) || ft(t, e),
      i = n ? Pp(t, e) : $r(t, e, !0),
      o = n;
    do {
      if (i === 0) {
        Yl && !n && yn(t, e, 0, !1);
        break;
      } else {
        if (((a = t.current.alternate), o && !Fp(a))) {
          ((i = $r(t, e, !1)), (o = !1));
          continue;
        }
        if (i === 2) {
          if (((o = e), t.errorRecoveryDisabledLanes & o)) var h = 0;
          else
            ((h = t.pendingLanes & -536870913), (h = h !== 0 ? h : h & 536870912 ? 536870912 : 0));
          if (h !== 0) {
            e = h;
            t: {
              var v = t;
              i = Ki;
              var S = v.current.memoizedState.isDehydrated;
              if ((S && (Ql(v, h).flags |= 256), (h = $r(v, h, !1)), h !== 2)) {
                if (zr && !S) {
                  ((v.errorRecoveryDisabledLanes |= o), (el |= o), (i = 4));
                  break t;
                }
                ((o = Be), (Be = i), o !== null && (Be === null ? (Be = o) : Be.push.apply(Be, o)));
              }
              i = h;
            }
            if (((o = !1), i !== 2)) continue;
          }
        }
        if (i === 1) {
          (Ql(t, 0), yn(t, e, 0, !0));
          break;
        }
        t: {
          switch (((n = t), (o = i), o)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              yn(n, e, Ve, !dn);
              break t;
            case 2:
              Be = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && ((i = ms + 300 - de()), 10 < i)) {
            if ((yn(n, e, Ve, !dn), wt(n, 0, !0) !== 0)) break t;
            ((Xa = e),
              (n.timeoutHandle = S0(
                Ym.bind(null, n, a, Be, ps, Rr, e, Ve, el, Xl, dn, o, 'Throttled', -0, 0),
                i
              )));
            break t;
          }
          Ym(n, a, Be, ps, Rr, e, Ve, el, Xl, dn, o, null, -0, 0);
        }
      }
      break;
    } while (!0);
    ja(t);
  }
  function Ym(t, e, a, n, i, o, h, v, S, w, B, U, z, R) {
    if (((t.timeoutHandle = -1), (U = e.subtreeFlags), U & 8192 || (U & 16785408) === 16785408)) {
      ((U = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ca,
      }),
        $m(e, o, U));
      var W = (o & 62914560) === o ? ms - de() : (o & 4194048) === o ? km - de() : 0;
      if (((W = Dy(U, W)), W !== null)) {
        ((Xa = o),
          (t.cancelPendingCommit = W(Pm.bind(null, t, e, o, a, n, i, h, v, S, B, U, null, z, R))),
          yn(t, o, h, !w));
        return;
      }
    }
    Pm(t, e, o, a, n, i, h, v, S);
  }
  function Fp(t) {
    for (var e = t; ; ) {
      var a = e.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        e.flags & 16384 &&
        ((a = e.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var i = a[n],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!$e(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = e.child), e.subtreeFlags & 16384 && a !== null)) ((a.return = e), (e = a));
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    }
    return !0;
  }
  function yn(t, e, a, n) {
    ((e &= ~Cr),
      (e &= ~el),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      n && (t.warmLanes |= e),
      (n = t.expirationTimes));
    for (var i = e; 0 < i; ) {
      var o = 31 - ue(i),
        h = 1 << o;
      ((n[o] = -1), (i &= ~h));
    }
    a !== 0 && tf(t, a, e);
  }
  function ys() {
    return (Et & 6) === 0 ? (Wi(0), !1) : !0;
  }
  function Lr() {
    if (dt !== null) {
      if (Nt === 0) var t = dt.return;
      else ((t = dt), (Da = Xn = null), Io(t), (Hl = null), (Ci = 0), (t = dt));
      for (; t !== null; ) (xm(t.alternate, t), (t = t.return));
      dt = null;
    }
  }
  function Ql(t, e) {
    var a = t.timeoutHandle;
    (a !== -1 && ((t.timeoutHandle = -1), gy(a)),
      (a = t.cancelPendingCommit),
      a !== null && ((t.cancelPendingCommit = null), a()),
      (Xa = 0),
      Lr(),
      ($t = t),
      (dt = a = Oa(t.current, null)),
      (ht = e),
      (Nt = 0),
      (ke = null),
      (dn = !1),
      (Yl = ft(t, e)),
      (zr = !1),
      (Xl = Ve = Cr = el = mn = Jt = 0),
      (Be = Ki = null),
      (Rr = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var i = 31 - ue(n),
          o = 1 << i;
        ((e |= t[i]), (n &= ~o));
      }
    return ((Ya = e), $c(), a);
  }
  function Xm(t, e) {
    ((st = null),
      (O.H = Ui),
      e === $l || e === Yc
        ? ((e = od()), (Nt = 3))
        : e === qo
          ? ((e = od()), (Nt = 4))
          : (Nt =
              e === hr
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (ke = e),
      dt === null && ((Jt = 1), is(t, We(e, t.current))));
  }
  function Km() {
    var t = Ue.current;
    return t === null
      ? !0
      : (ht & 4194048) === ht
        ? Pe === null
        : (ht & 62914560) === ht || (ht & 536870912) !== 0
          ? t === Pe
          : !1;
  }
  function Qm() {
    var t = O.H;
    return ((O.H = Ui), t === null ? Ui : t);
  }
  function Wm() {
    var t = O.A;
    return ((O.A = Wp), t);
  }
  function gs() {
    ((Jt = 4),
      dn || ((ht & 4194048) !== ht && Ue.current !== null) || (Yl = !0),
      ((mn & 134217727) === 0 && (el & 134217727) === 0) || $t === null || yn($t, ht, Ve, !1));
  }
  function $r(t, e, a) {
    var n = Et;
    Et |= 2;
    var i = Qm(),
      o = Wm();
    (($t !== t || ht !== e) && ((ps = null), Ql(t, e)), (e = !1));
    var h = Jt;
    t: do
      try {
        if (Nt !== 0 && dt !== null) {
          var v = dt,
            S = ke;
          switch (Nt) {
            case 8:
              (Lr(), (h = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ue.current === null && (e = !0);
              var w = Nt;
              if (((Nt = 0), (ke = null), Wl(t, v, S, w), a && Yl)) {
                h = 0;
                break t;
              }
              break;
            default:
              ((w = Nt), (Nt = 0), (ke = null), Wl(t, v, S, w));
          }
        }
        (Ip(), (h = Jt));
        break;
      } catch (B) {
        Xm(t, B);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (Da = Xn = null),
      (Et = n),
      (O.H = i),
      (O.A = o),
      dt === null && (($t = null), (ht = 0), $c()),
      h
    );
  }
  function Ip() {
    for (; dt !== null; ) Jm(dt);
  }
  function Pp(t, e) {
    var a = Et;
    Et |= 2;
    var n = Qm(),
      i = Wm();
    $t !== t || ht !== e ? ((ps = null), (hs = de() + 500), Ql(t, e)) : (Yl = ft(t, e));
    t: do
      try {
        if (Nt !== 0 && dt !== null) {
          e = dt;
          var o = ke;
          e: switch (Nt) {
            case 1:
              ((Nt = 0), (ke = null), Wl(t, e, o, 1));
              break;
            case 2:
            case 9:
              if (cd(o)) {
                ((Nt = 0), (ke = null), Fm(e));
                break;
              }
              ((e = function () {
                ((Nt !== 2 && Nt !== 9) || $t !== t || (Nt = 7), ja(t));
              }),
                o.then(e, e));
              break t;
            case 3:
              Nt = 7;
              break t;
            case 4:
              Nt = 5;
              break t;
            case 7:
              cd(o) ? ((Nt = 0), (ke = null), Fm(e)) : ((Nt = 0), (ke = null), Wl(t, e, o, 7));
              break;
            case 5:
              var h = null;
              switch (dt.tag) {
                case 26:
                  h = dt.memoizedState;
                case 5:
                case 27:
                  var v = dt;
                  if (h ? L0(h) : v.stateNode.complete) {
                    ((Nt = 0), (ke = null));
                    var S = v.sibling;
                    if (S !== null) dt = S;
                    else {
                      var w = v.return;
                      w !== null ? ((dt = w), vs(w)) : (dt = null);
                    }
                    break e;
                  }
              }
              ((Nt = 0), (ke = null), Wl(t, e, o, 5));
              break;
            case 6:
              ((Nt = 0), (ke = null), Wl(t, e, o, 6));
              break;
            case 8:
              (Lr(), (Jt = 6));
              break t;
            default:
              throw Error(r(462));
          }
        }
        ty();
        break;
      } catch (B) {
        Xm(t, B);
      }
    while (!0);
    return (
      (Da = Xn = null),
      (O.H = n),
      (O.A = i),
      (Et = a),
      dt !== null ? 0 : (($t = null), (ht = 0), $c(), Jt)
    );
  }
  function ty() {
    for (; dt !== null && !pl(); ) Jm(dt);
  }
  function Jm(t) {
    var e = bm(t.alternate, t, Ya);
    ((t.memoizedProps = t.pendingProps), e === null ? vs(t) : (dt = e));
  }
  function Fm(t) {
    var e = t,
      a = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = hm(a, e, e.pendingProps, e.type, void 0, ht);
        break;
      case 11:
        e = hm(a, e, e.pendingProps, e.type.render, e.ref, ht);
        break;
      case 5:
        Io(e);
      default:
        (xm(a, e), (e = dt = Wf(e, Ya)), (e = bm(a, e, Ya)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? vs(t) : (dt = e));
  }
  function Wl(t, e, a, n) {
    ((Da = Xn = null), Io(e), (Hl = null), (Ci = 0));
    var i = e.return;
    try {
      if (Vp(t, i, e, a, ht)) {
        ((Jt = 1), is(t, We(a, t.current)), (dt = null));
        return;
      }
    } catch (o) {
      if (i !== null) throw ((dt = i), o);
      ((Jt = 1), is(t, We(a, t.current)), (dt = null));
      return;
    }
    e.flags & 32768
      ? (gt || n === 1
          ? (t = !0)
          : Yl || (ht & 536870912) !== 0
            ? (t = !1)
            : ((dn = t = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Ue.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Im(e, t))
      : vs(e);
  }
  function vs(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Im(e, dn);
        return;
      }
      t = e.return;
      var a = Yp(e.alternate, e, Ya);
      if (a !== null) {
        dt = a;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        dt = e;
        return;
      }
      dt = e = t;
    } while (e !== null);
    Jt === 0 && (Jt = 5);
  }
  function Im(t, e) {
    do {
      var a = Xp(t.alternate, t);
      if (a !== null) {
        ((a.flags &= 32767), (dt = a));
        return;
      }
      if (
        ((a = t.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        dt = t;
        return;
      }
      dt = t = a;
    } while (t !== null);
    ((Jt = 6), (dt = null));
  }
  function Pm(t, e, a, n, i, o, h, v, S) {
    t.cancelPendingCommit = null;
    do _s();
    while (fe !== 0);
    if ((Et & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      if (
        ((o = e.lanes | e.childLanes),
        (o |= Ao),
        pi(t, a, o, h, v, S),
        t === $t && ((dt = $t = null), (ht = 0)),
        (Kl = e),
        (pn = t),
        (Xa = a),
        (Or = o),
        (Br = i),
        (Vm = n),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            ly(ia, function () {
              return (l0(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (n = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = O.T), (O.T = null), (i = Y.p), (Y.p = 2), (h = Et), (Et |= 4));
        try {
          Kp(t, e, a);
        } finally {
          ((Et = h), (Y.p = i), (O.T = n));
        }
      }
      ((fe = 1), t0(), e0(), a0());
    }
  }
  function t0() {
    if (fe === 1) {
      fe = 0;
      var t = pn,
        e = Kl,
        a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = Y.p;
        Y.p = 2;
        var i = Et;
        Et |= 4;
        try {
          Bm(e, t);
          var o = Wr,
            h = qf(t.containerInfo),
            v = o.focusedElem,
            S = o.selectionRange;
          if (h !== v && v && v.ownerDocument && Uf(v.ownerDocument.documentElement, v)) {
            if (S !== null && bo(v)) {
              var w = S.start,
                B = S.end;
              if ((B === void 0 && (B = w), 'selectionStart' in v))
                ((v.selectionStart = w), (v.selectionEnd = Math.min(B, v.value.length)));
              else {
                var U = v.ownerDocument || document,
                  z = (U && U.defaultView) || window;
                if (z.getSelection) {
                  var R = z.getSelection(),
                    W = v.textContent.length,
                    lt = Math.min(S.start, W),
                    Dt = S.end === void 0 ? lt : Math.min(S.end, W);
                  !R.extend && lt > Dt && ((h = Dt), (Dt = lt), (lt = h));
                  var T = Hf(v, lt),
                    x = Hf(v, Dt);
                  if (
                    T &&
                    x &&
                    (R.rangeCount !== 1 ||
                      R.anchorNode !== T.node ||
                      R.anchorOffset !== T.offset ||
                      R.focusNode !== x.node ||
                      R.focusOffset !== x.offset)
                  ) {
                    var M = U.createRange();
                    (M.setStart(T.node, T.offset),
                      R.removeAllRanges(),
                      lt > Dt
                        ? (R.addRange(M), R.extend(x.node, x.offset))
                        : (M.setEnd(x.node, x.offset), R.addRange(M)));
                  }
                }
              }
            }
            for (U = [], R = v; (R = R.parentNode); )
              R.nodeType === 1 && U.push({ element: R, left: R.scrollLeft, top: R.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < U.length; v++) {
              var L = U[v];
              ((L.element.scrollLeft = L.left), (L.element.scrollTop = L.top));
            }
          }
          ((Cs = !!Qr), (Wr = Qr = null));
        } finally {
          ((Et = i), (Y.p = n), (O.T = a));
        }
      }
      ((t.current = e), (fe = 2));
    }
  }
  function e0() {
    if (fe === 2) {
      fe = 0;
      var t = pn,
        e = Kl,
        a = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = Y.p;
        Y.p = 2;
        var i = Et;
        Et |= 4;
        try {
          Nm(t, e.alternate, e);
        } finally {
          ((Et = i), (Y.p = n), (O.T = a));
        }
      }
      fe = 3;
    }
  }
  function a0() {
    if (fe === 4 || fe === 3) {
      ((fe = 0), mi());
      var t = pn,
        e = Kl,
        a = Xa,
        n = Vm;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (fe = 5)
        : ((fe = 0), (Kl = pn = null), n0(t, t.pendingLanes));
      var i = t.pendingLanes;
      if (
        (i === 0 && (hn = null),
        to(a),
        (e = e.stateNode),
        ae && typeof ae.onCommitFiberRoot == 'function')
      )
        try {
          ae.onCommitFiberRoot(we, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((e = O.T), (i = Y.p), (Y.p = 2), (O.T = null));
        try {
          for (var o = t.onRecoverableError, h = 0; h < n.length; h++) {
            var v = n[h];
            o(v.value, { componentStack: v.stack });
          }
        } finally {
          ((O.T = e), (Y.p = i));
        }
      }
      ((Xa & 3) !== 0 && _s(),
        ja(t),
        (i = t.pendingLanes),
        (a & 261930) !== 0 && (i & 42) !== 0 ? (t === Dr ? Qi++ : ((Qi = 0), (Dr = t))) : (Qi = 0),
        Wi(0));
    }
  }
  function n0(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Ni(e)));
  }
  function _s() {
    return (t0(), e0(), a0(), l0());
  }
  function l0() {
    if (fe !== 5) return !1;
    var t = pn,
      e = Or;
    Or = 0;
    var a = to(Xa),
      n = O.T,
      i = Y.p;
    try {
      ((Y.p = 32 > a ? 32 : a), (O.T = null), (a = Br), (Br = null));
      var o = pn,
        h = Xa;
      if (((fe = 0), (Kl = pn = null), (Xa = 0), (Et & 6) !== 0)) throw Error(r(331));
      var v = Et;
      if (
        ((Et |= 4),
        Um(o.current),
        Lm(o, o.current, h, a),
        (Et = v),
        Wi(0, !1),
        ae && typeof ae.onPostCommitFiberRoot == 'function')
      )
        try {
          ae.onPostCommitFiberRoot(we, o);
        } catch {}
      return !0;
    } finally {
      ((Y.p = i), (O.T = n), n0(t, e));
    }
  }
  function i0(t, e, a) {
    ((e = We(a, e)),
      (e = mr(t.stateNode, e, 2)),
      (t = on(t, e, 2)),
      t !== null && (Ia(t, 2), ja(t)));
  }
  function zt(t, e, a) {
    if (t.tag === 3) i0(t, t, a);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          i0(e, t, a);
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (hn === null || !hn.has(n)))
          ) {
            ((t = We(a, t)),
              (a = cm(2)),
              (n = on(e, a, 2)),
              n !== null && (sm(a, n, e, t), Ia(n, 2), ja(n)));
            break;
          }
        }
        e = e.return;
      }
  }
  function Hr(t, e, a) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new Jp();
      var i = new Set();
      n.set(e, i);
    } else ((i = n.get(e)), i === void 0 && ((i = new Set()), n.set(e, i)));
    i.has(a) || ((zr = !0), i.add(a), (t = ey.bind(null, t, e, a)), e.then(t, t));
  }
  function ey(t, e, a) {
    var n = t.pingCache;
    (n !== null && n.delete(e),
      (t.pingedLanes |= t.suspendedLanes & a),
      (t.warmLanes &= ~a),
      $t === t &&
        (ht & a) === a &&
        (Jt === 4 || (Jt === 3 && (ht & 62914560) === ht && 300 > de() - ms)
          ? (Et & 2) === 0 && Ql(t, 0)
          : (Cr |= a),
        Xl === ht && (Xl = 0)),
      ja(t));
  }
  function c0(t, e) {
    (e === 0 && (e = le()), (t = Gn(t, e)), t !== null && (Ia(t, e), ja(t)));
  }
  function ay(t) {
    var e = t.memoizedState,
      a = 0;
    (e !== null && (a = e.retryLane), c0(t, a));
  }
  function ny(t, e) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode,
          i = t.memoizedState;
        i !== null && (a = i.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (n !== null && n.delete(e), c0(t, a));
  }
  function ly(t, e) {
    return Fa(t, e);
  }
  var bs = null,
    Jl = null,
    Ur = !1,
    Ss = !1,
    qr = !1,
    gn = 0;
  function ja(t) {
    (t !== Jl && t.next === null && (Jl === null ? (bs = Jl = t) : (Jl = Jl.next = t)),
      (Ss = !0),
      Ur || ((Ur = !0), cy()));
  }
  function Wi(t, e) {
    if (!qr && Ss) {
      qr = !0;
      do
        for (var a = !1, n = bs; n !== null; ) {
          if (t !== 0) {
            var i = n.pendingLanes;
            if (i === 0) var o = 0;
            else {
              var h = n.suspendedLanes,
                v = n.pingedLanes;
              ((o = (1 << (31 - ue(42 | t) + 1)) - 1),
                (o &= i & ~(h & ~v)),
                (o = o & 201326741 ? (o & 201326741) | 1 : o ? o | 2 : 0));
            }
            o !== 0 && ((a = !0), u0(n, o));
          } else
            ((o = ht),
              (o = wt(
                n,
                n === $t ? o : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (o & 3) === 0 || ft(n, o) || ((a = !0), u0(n, o)));
          n = n.next;
        }
      while (a);
      qr = !1;
    }
  }
  function iy() {
    s0();
  }
  function s0() {
    Ss = Ur = !1;
    var t = 0;
    gn !== 0 && yy() && (t = gn);
    for (var e = de(), a = null, n = bs; n !== null; ) {
      var i = n.next,
        o = o0(n, e);
      (o === 0
        ? ((n.next = null), a === null ? (bs = i) : (a.next = i), i === null && (Jl = a))
        : ((a = n), (t !== 0 || (o & 3) !== 0) && (Ss = !0)),
        (n = i));
    }
    ((fe !== 0 && fe !== 5) || Wi(t), gn !== 0 && (gn = 0));
  }
  function o0(t, e) {
    for (
      var a = t.suspendedLanes,
        n = t.pingedLanes,
        i = t.expirationTimes,
        o = t.pendingLanes & -62914561;
      0 < o;
    ) {
      var h = 31 - ue(o),
        v = 1 << h,
        S = i[h];
      (S === -1
        ? ((v & a) === 0 || (v & n) !== 0) && (i[h] = Rt(v, e))
        : S <= e && (t.expiredLanes |= v),
        (o &= ~v));
    }
    if (
      ((e = $t),
      (a = ht),
      (a = wt(t, t === e ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (n = t.callbackNode),
      a === 0 || (t === e && (Nt === 2 || Nt === 9)) || t.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Ma(n), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((a & 3) === 0 || ft(t, a)) {
      if (((e = a & -a), e === t.callbackPriority)) return e;
      switch ((n !== null && Ma(n), to(a))) {
        case 2:
        case 8:
          a = yl;
          break;
        case 32:
          a = ia;
          break;
        case 268435456:
          a = Hn;
          break;
        default:
          a = ia;
      }
      return (
        (n = r0.bind(null, t)),
        (a = Fa(a, n)),
        (t.callbackPriority = e),
        (t.callbackNode = a),
        e
      );
    }
    return (
      n !== null && n !== null && Ma(n),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function r0(t, e) {
    if (fe !== 0 && fe !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var a = t.callbackNode;
    if (_s() && t.callbackNode !== a) return null;
    var n = ht;
    return (
      (n = wt(t, t === $t ? n : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Zm(t, n, e),
          o0(t, de()),
          t.callbackNode != null && t.callbackNode === a ? r0.bind(null, t) : null)
    );
  }
  function u0(t, e) {
    if (_s()) return null;
    Zm(t, e, !0);
  }
  function cy() {
    vy(function () {
      (Et & 6) !== 0 ? Fa($n, iy) : s0();
    });
  }
  function kr() {
    if (gn === 0) {
      var t = Dl;
      (t === 0 && ((t = St), (St <<= 1), (St & 261888) === 0 && (St = 256)), (gn = t));
    }
    return gn;
  }
  function f0(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : Nc('' + t);
  }
  function d0(t, e) {
    var a = e.ownerDocument.createElement('input');
    return (
      (a.name = e.name),
      (a.value = e.value),
      t.id && a.setAttribute('form', t.id),
      e.parentNode.insertBefore(a, e),
      (t = new FormData(t)),
      a.parentNode.removeChild(a),
      t
    );
  }
  function sy(t, e, a, n, i) {
    if (e === 'submit' && a && a.stateNode === i) {
      var o = f0((i[Ne] || null).action),
        h = n.submitter;
      h &&
        ((e = (e = h[Ne] || null) ? f0(e.formAction) : h.getAttribute('formAction')),
        e !== null && ((o = e), (h = null)));
      var v = new Oc('action', 'action', null, n, i);
      t.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (gn !== 0) {
                  var S = h ? d0(i, h) : new FormData(i);
                  sr(a, { pending: !0, data: S, method: i.method, action: o }, null, S);
                }
              } else
                typeof o == 'function' &&
                  (v.preventDefault(),
                  (S = h ? d0(i, h) : new FormData(i)),
                  sr(a, { pending: !0, data: S, method: i.method, action: o }, o, S));
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var Vr = 0; Vr < To.length; Vr++) {
    var Gr = To[Vr],
      oy = Gr.toLowerCase(),
      ry = Gr[0].toUpperCase() + Gr.slice(1);
    ca(oy, 'on' + ry);
  }
  (ca(Gf, 'onAnimationEnd'),
    ca(Zf, 'onAnimationIteration'),
    ca(Yf, 'onAnimationStart'),
    ca('dblclick', 'onDoubleClick'),
    ca('focusin', 'onFocus'),
    ca('focusout', 'onBlur'),
    ca(Ap, 'onTransitionRun'),
    ca(Ep, 'onTransitionStart'),
    ca(Mp, 'onTransitionCancel'),
    ca(Xf, 'onTransitionEnd'),
    Sl('onMouseEnter', ['mouseout', 'mouseover']),
    Sl('onMouseLeave', ['mouseout', 'mouseover']),
    Sl('onPointerEnter', ['pointerout', 'pointerover']),
    Sl('onPointerLeave', ['pointerout', 'pointerover']),
    Un('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Un(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Un('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Un('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Un(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Un(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Ji =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    uy = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Ji)
    );
  function m0(t, e) {
    e = (e & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var n = t[a],
        i = n.event;
      n = n.listeners;
      t: {
        var o = void 0;
        if (e)
          for (var h = n.length - 1; 0 <= h; h--) {
            var v = n[h],
              S = v.instance,
              w = v.currentTarget;
            if (((v = v.listener), S !== o && i.isPropagationStopped())) break t;
            ((o = v), (i.currentTarget = w));
            try {
              o(i);
            } catch (B) {
              Lc(B);
            }
            ((i.currentTarget = null), (o = S));
          }
        else
          for (h = 0; h < n.length; h++) {
            if (
              ((v = n[h]),
              (S = v.instance),
              (w = v.currentTarget),
              (v = v.listener),
              S !== o && i.isPropagationStopped())
            )
              break t;
            ((o = v), (i.currentTarget = w));
            try {
              o(i);
            } catch (B) {
              Lc(B);
            }
            ((i.currentTarget = null), (o = S));
          }
      }
    }
  }
  function mt(t, e) {
    var a = e[eo];
    a === void 0 && (a = e[eo] = new Set());
    var n = t + '__bubble';
    a.has(n) || (h0(e, t, 2, !1), a.add(n));
  }
  function Zr(t, e, a) {
    var n = 0;
    (e && (n |= 4), h0(a, t, n, e));
  }
  var xs = '_reactListening' + Math.random().toString(36).slice(2);
  function Yr(t) {
    if (!t[xs]) {
      ((t[xs] = !0),
        sf.forEach(function (a) {
          a !== 'selectionchange' && (uy.has(a) || Zr(a, !1, t), Zr(a, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[xs] || ((e[xs] = !0), Zr('selectionchange', !1, e));
    }
  }
  function h0(t, e, a, n) {
    switch (G0(e)) {
      case 2:
        var i = Hy;
        break;
      case 8:
        i = Uy;
        break;
      default:
        i = cu;
    }
    ((a = i.bind(null, e, a, t)),
      (i = void 0),
      !uo || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (i = !0),
      n
        ? i !== void 0
          ? t.addEventListener(e, a, { capture: !0, passive: i })
          : t.addEventListener(e, a, !0)
        : i !== void 0
          ? t.addEventListener(e, a, { passive: i })
          : t.addEventListener(e, a, !1));
  }
  function Xr(t, e, a, n, i) {
    var o = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (;;) {
        if (n === null) return;
        var h = n.tag;
        if (h === 3 || h === 4) {
          var v = n.stateNode.containerInfo;
          if (v === i) break;
          if (h === 4)
            for (h = n.return; h !== null; ) {
              var S = h.tag;
              if ((S === 3 || S === 4) && h.stateNode.containerInfo === i) return;
              h = h.return;
            }
          for (; v !== null; ) {
            if (((h = vl(v)), h === null)) return;
            if (((S = h.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              n = o = h;
              continue t;
            }
            v = v.parentNode;
          }
        }
        n = n.return;
      }
    _f(function () {
      var w = o,
        B = oo(a),
        U = [];
      t: {
        var z = Kf.get(t);
        if (z !== void 0) {
          var R = Oc,
            W = t;
          switch (t) {
            case 'keypress':
              if (Cc(a) === 0) break t;
            case 'keydown':
            case 'keyup':
              R = np;
              break;
            case 'focusin':
              ((W = 'focus'), (R = po));
              break;
            case 'focusout':
              ((W = 'blur'), (R = po));
              break;
            case 'beforeblur':
            case 'afterblur':
              R = po;
              break;
            case 'click':
              if (a.button === 2) break t;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              R = xf;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              R = Y1;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              R = cp;
              break;
            case Gf:
            case Zf:
            case Yf:
              R = Q1;
              break;
            case Xf:
              R = op;
              break;
            case 'scroll':
            case 'scrollend':
              R = G1;
              break;
            case 'wheel':
              R = up;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              R = J1;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              R = Tf;
              break;
            case 'toggle':
            case 'beforetoggle':
              R = dp;
          }
          var lt = (e & 4) !== 0,
            Dt = !lt && (t === 'scroll' || t === 'scrollend'),
            T = lt ? (z !== null ? z + 'Capture' : null) : z;
          lt = [];
          for (var x = w, M; x !== null; ) {
            var L = x;
            if (
              ((M = L.stateNode),
              (L = L.tag),
              (L !== 5 && L !== 26 && L !== 27) ||
                M === null ||
                T === null ||
                ((L = vi(x, T)), L != null && lt.push(Fi(x, L, M))),
              Dt)
            )
              break;
            x = x.return;
          }
          0 < lt.length && ((z = new R(z, W, null, a, B)), U.push({ event: z, listeners: lt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((z = t === 'mouseover' || t === 'pointerover'),
            (R = t === 'mouseout' || t === 'pointerout'),
            z && a !== so && (W = a.relatedTarget || a.fromElement) && (vl(W) || W[gl]))
          )
            break t;
          if (
            (R || z) &&
            ((z =
              B.window === B
                ? B
                : (z = B.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            R
              ? ((W = a.relatedTarget || a.toElement),
                (R = w),
                (W = W ? vl(W) : null),
                W !== null &&
                  ((Dt = d(W)), (lt = W.tag), W !== Dt || (lt !== 5 && lt !== 27 && lt !== 6)) &&
                  (W = null))
              : ((R = null), (W = w)),
            R !== W)
          ) {
            if (
              ((lt = xf),
              (L = 'onMouseLeave'),
              (T = 'onMouseEnter'),
              (x = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((lt = Tf), (L = 'onPointerLeave'), (T = 'onPointerEnter'), (x = 'pointer')),
              (Dt = R == null ? z : gi(R)),
              (M = W == null ? z : gi(W)),
              (z = new lt(L, x + 'leave', R, a, B)),
              (z.target = Dt),
              (z.relatedTarget = M),
              (L = null),
              vl(B) === w &&
                ((lt = new lt(T, x + 'enter', W, a, B)),
                (lt.target = M),
                (lt.relatedTarget = Dt),
                (L = lt)),
              (Dt = L),
              R && W)
            )
              e: {
                for (lt = fy, T = R, x = W, M = 0, L = T; L; L = lt(L)) M++;
                L = 0;
                for (var et = x; et; et = lt(et)) L++;
                for (; 0 < M - L; ) ((T = lt(T)), M--);
                for (; 0 < L - M; ) ((x = lt(x)), L--);
                for (; M--; ) {
                  if (T === x || (x !== null && T === x.alternate)) {
                    lt = T;
                    break e;
                  }
                  ((T = lt(T)), (x = lt(x)));
                }
                lt = null;
              }
            else lt = null;
            (R !== null && p0(U, z, R, lt, !1), W !== null && Dt !== null && p0(U, Dt, W, lt, !0));
          }
        }
        t: {
          if (
            ((z = w ? gi(w) : window),
            (R = z.nodeName && z.nodeName.toLowerCase()),
            R === 'select' || (R === 'input' && z.type === 'file'))
          )
            var xt = Rf;
          else if (zf(z))
            if (Of) xt = xp;
            else {
              xt = bp;
              var P = _p;
            }
          else
            ((R = z.nodeName),
              !R || R.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? w && co(w.elementType) && (xt = Rf)
                : (xt = Sp));
          if (xt && (xt = xt(t, w))) {
            Cf(U, xt, a, B);
            break t;
          }
          (P && P(t, z, w),
            t === 'focusout' &&
              w &&
              z.type === 'number' &&
              w.memoizedProps.value != null &&
              io(z, 'number', z.value));
        }
        switch (((P = w ? gi(w) : window), t)) {
          case 'focusin':
            (zf(P) || P.contentEditable === 'true') && ((Ml = P), (So = w), (Ei = null));
            break;
          case 'focusout':
            Ei = So = Ml = null;
            break;
          case 'mousedown':
            xo = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((xo = !1), kf(U, a, B));
            break;
          case 'selectionchange':
            if (Tp) break;
          case 'keydown':
          case 'keyup':
            kf(U, a, B);
        }
        var ot;
        if (go)
          t: {
            switch (t) {
              case 'compositionstart':
                var pt = 'onCompositionStart';
                break t;
              case 'compositionend':
                pt = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                pt = 'onCompositionUpdate';
                break t;
            }
            pt = void 0;
          }
        else
          El
            ? wf(t, a) && (pt = 'onCompositionEnd')
            : t === 'keydown' && a.keyCode === 229 && (pt = 'onCompositionStart');
        (pt &&
          (Af &&
            a.locale !== 'ko' &&
            (El || pt !== 'onCompositionStart'
              ? pt === 'onCompositionEnd' && El && (ot = bf())
              : ((tn = B), (fo = 'value' in tn ? tn.value : tn.textContent), (El = !0))),
          (P = js(w, pt)),
          0 < P.length &&
            ((pt = new jf(pt, t, null, a, B)),
            U.push({ event: pt, listeners: P }),
            ot ? (pt.data = ot) : ((ot = Nf(a)), ot !== null && (pt.data = ot)))),
          (ot = hp ? pp(t, a) : yp(t, a)) &&
            ((pt = js(w, 'onBeforeInput')),
            0 < pt.length &&
              ((P = new jf('onBeforeInput', 'beforeinput', null, a, B)),
              U.push({ event: P, listeners: pt }),
              (P.data = ot))),
          sy(U, t, w, a, B));
      }
      m0(U, e);
    });
  }
  function Fi(t, e, a) {
    return { instance: t, listener: e, currentTarget: a };
  }
  function js(t, e) {
    for (var a = e + 'Capture', n = []; t !== null; ) {
      var i = t,
        o = i.stateNode;
      if (
        ((i = i.tag),
        (i !== 5 && i !== 26 && i !== 27) ||
          o === null ||
          ((i = vi(t, a)),
          i != null && n.unshift(Fi(t, i, o)),
          (i = vi(t, e)),
          i != null && n.push(Fi(t, i, o))),
        t.tag === 3)
      )
        return n;
      t = t.return;
    }
    return [];
  }
  function fy(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function p0(t, e, a, n, i) {
    for (var o = e._reactName, h = []; a !== null && a !== n; ) {
      var v = a,
        S = v.alternate,
        w = v.stateNode;
      if (((v = v.tag), S !== null && S === n)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        w === null ||
        ((S = w),
        i
          ? ((w = vi(a, o)), w != null && h.unshift(Fi(a, w, S)))
          : i || ((w = vi(a, o)), w != null && h.push(Fi(a, w, S)))),
        (a = a.return));
    }
    h.length !== 0 && t.push({ event: e, listeners: h });
  }
  var dy = /\r\n?/g,
    my = /\u0000|\uFFFD/g;
  function y0(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        dy,
        `
`
      )
      .replace(my, '');
  }
  function g0(t, e) {
    return ((e = y0(e)), y0(t) === e);
  }
  function Bt(t, e, a, n, i, o) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? e === 'body' || (e === 'textarea' && n === '') || jl(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && e !== 'body' && jl(t, '' + n);
        break;
      case 'className':
        Mc(t, 'class', n);
        break;
      case 'tabIndex':
        Mc(t, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Mc(t, a, n);
        break;
      case 'style':
        gf(t, n, o);
        break;
      case 'data':
        if (e !== 'object') {
          Mc(t, 'data', n);
          break;
        }
      case 'src':
      case 'href':
        if (n === '' && (e !== 'a' || a !== 'href')) {
          t.removeAttribute(a);
          break;
        }
        if (n == null || typeof n == 'function' || typeof n == 'symbol' || typeof n == 'boolean') {
          t.removeAttribute(a);
          break;
        }
        ((n = Nc('' + n)), t.setAttribute(a, n));
        break;
      case 'action':
      case 'formAction':
        if (typeof n == 'function') {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == 'function' &&
            (a === 'formAction'
              ? (e !== 'input' && Bt(t, e, 'name', i.name, i, null),
                Bt(t, e, 'formEncType', i.formEncType, i, null),
                Bt(t, e, 'formMethod', i.formMethod, i, null),
                Bt(t, e, 'formTarget', i.formTarget, i, null))
              : (Bt(t, e, 'encType', i.encType, i, null),
                Bt(t, e, 'method', i.method, i, null),
                Bt(t, e, 'target', i.target, i, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          t.removeAttribute(a);
          break;
        }
        ((n = Nc('' + n)), t.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (t.onclick = Ca);
        break;
      case 'onScroll':
        n != null && mt('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && mt('scrollend', t);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(r(61));
          if (((a = n.__html), a != null)) {
            if (i.children != null) throw Error(r(60));
            t.innerHTML = a;
          }
        }
        break;
      case 'multiple':
        t.multiple = n && typeof n != 'function' && typeof n != 'symbol';
        break;
      case 'muted':
        t.muted = n && typeof n != 'function' && typeof n != 'symbol';
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break;
      case 'autoFocus':
        break;
      case 'xlinkHref':
        if (n == null || typeof n == 'function' || typeof n == 'boolean' || typeof n == 'symbol') {
          t.removeAttribute('xlink:href');
          break;
        }
        ((a = Nc('' + n)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        n != null && typeof n != 'function' && typeof n != 'symbol'
          ? t.setAttribute(a, '' + n)
          : t.removeAttribute(a);
        break;
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        n && typeof n != 'function' && typeof n != 'symbol'
          ? t.setAttribute(a, '')
          : t.removeAttribute(a);
        break;
      case 'capture':
      case 'download':
        n === !0
          ? t.setAttribute(a, '')
          : n !== !1 && n != null && typeof n != 'function' && typeof n != 'symbol'
            ? t.setAttribute(a, n)
            : t.removeAttribute(a);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        n != null && typeof n != 'function' && typeof n != 'symbol' && !isNaN(n) && 1 <= n
          ? t.setAttribute(a, n)
          : t.removeAttribute(a);
        break;
      case 'rowSpan':
      case 'start':
        n == null || typeof n == 'function' || typeof n == 'symbol' || isNaN(n)
          ? t.removeAttribute(a)
          : t.setAttribute(a, n);
        break;
      case 'popover':
        (mt('beforetoggle', t), mt('toggle', t), Ec(t, 'popover', n));
        break;
      case 'xlinkActuate':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        za(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        za(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        za(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Ec(t, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = k1.get(a) || a), Ec(t, a, n));
    }
  }
  function Kr(t, e, a, n, i, o) {
    switch (a) {
      case 'style':
        gf(t, n, o);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(r(61));
          if (((a = n.__html), a != null)) {
            if (i.children != null) throw Error(r(60));
            t.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? jl(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && jl(t, '' + n);
        break;
      case 'onScroll':
        n != null && mt('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && mt('scrollend', t);
        break;
      case 'onClick':
        n != null && (t.onclick = Ca);
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        if (!of.hasOwnProperty(a))
          t: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((i = a.endsWith('Capture')),
              (e = a.slice(2, i ? a.length - 7 : void 0)),
              (o = t[Ne] || null),
              (o = o != null ? o[a] : null),
              typeof o == 'function' && t.removeEventListener(e, o, i),
              typeof n == 'function')
            ) {
              (typeof o != 'function' &&
                o !== null &&
                (a in t ? (t[a] = null) : t.hasAttribute(a) && t.removeAttribute(a)),
                t.addEventListener(e, n, i));
              break t;
            }
            a in t ? (t[a] = n) : n === !0 ? t.setAttribute(a, '') : Ec(t, a, n);
          }
    }
  }
  function be(t, e, a) {
    switch (e) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'img':
        (mt('error', t), mt('load', t));
        var n = !1,
          i = !1,
          o;
        for (o in a)
          if (a.hasOwnProperty(o)) {
            var h = a[o];
            if (h != null)
              switch (o) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  i = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(r(137, e));
                default:
                  Bt(t, e, o, h, a, null);
              }
          }
        (i && Bt(t, e, 'srcSet', a.srcSet, a, null), n && Bt(t, e, 'src', a.src, a, null));
        return;
      case 'input':
        mt('invalid', t);
        var v = (o = h = i = null),
          S = null,
          w = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var B = a[n];
            if (B != null)
              switch (n) {
                case 'name':
                  i = B;
                  break;
                case 'type':
                  h = B;
                  break;
                case 'checked':
                  S = B;
                  break;
                case 'defaultChecked':
                  w = B;
                  break;
                case 'value':
                  o = B;
                  break;
                case 'defaultValue':
                  v = B;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (B != null) throw Error(r(137, e));
                  break;
                default:
                  Bt(t, e, n, B, a, null);
              }
          }
        mf(t, o, v, S, w, h, i, !1);
        return;
      case 'select':
        (mt('invalid', t), (n = h = o = null));
        for (i in a)
          if (a.hasOwnProperty(i) && ((v = a[i]), v != null))
            switch (i) {
              case 'value':
                o = v;
                break;
              case 'defaultValue':
                h = v;
                break;
              case 'multiple':
                n = v;
              default:
                Bt(t, e, i, v, a, null);
            }
        ((e = o),
          (a = h),
          (t.multiple = !!n),
          e != null ? xl(t, !!n, e, !1) : a != null && xl(t, !!n, a, !0));
        return;
      case 'textarea':
        (mt('invalid', t), (o = i = n = null));
        for (h in a)
          if (a.hasOwnProperty(h) && ((v = a[h]), v != null))
            switch (h) {
              case 'value':
                n = v;
                break;
              case 'defaultValue':
                i = v;
                break;
              case 'children':
                o = v;
                break;
              case 'dangerouslySetInnerHTML':
                if (v != null) throw Error(r(91));
                break;
              default:
                Bt(t, e, h, v, a, null);
            }
        pf(t, n, i, o);
        return;
      case 'option':
        for (S in a)
          if (a.hasOwnProperty(S) && ((n = a[S]), n != null))
            switch (S) {
              case 'selected':
                t.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                Bt(t, e, S, n, a, null);
            }
        return;
      case 'dialog':
        (mt('beforetoggle', t), mt('toggle', t), mt('cancel', t), mt('close', t));
        break;
      case 'iframe':
      case 'object':
        mt('load', t);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < Ji.length; n++) mt(Ji[n], t);
        break;
      case 'image':
        (mt('error', t), mt('load', t));
        break;
      case 'details':
        mt('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (mt('error', t), mt('load', t));
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (w in a)
          if (a.hasOwnProperty(w) && ((n = a[w]), n != null))
            switch (w) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(r(137, e));
              default:
                Bt(t, e, w, n, a, null);
            }
        return;
      default:
        if (co(e)) {
          for (B in a)
            a.hasOwnProperty(B) && ((n = a[B]), n !== void 0 && Kr(t, e, B, n, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((n = a[v]), n != null && Bt(t, e, v, n, a, null));
  }
  function hy(t, e, a, n) {
    switch (e) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'input':
        var i = null,
          o = null,
          h = null,
          v = null,
          S = null,
          w = null,
          B = null;
        for (R in a) {
          var U = a[R];
          if (a.hasOwnProperty(R) && U != null)
            switch (R) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                S = U;
              default:
                n.hasOwnProperty(R) || Bt(t, e, R, null, n, U);
            }
        }
        for (var z in n) {
          var R = n[z];
          if (((U = a[z]), n.hasOwnProperty(z) && (R != null || U != null)))
            switch (z) {
              case 'type':
                o = R;
                break;
              case 'name':
                i = R;
                break;
              case 'checked':
                w = R;
                break;
              case 'defaultChecked':
                B = R;
                break;
              case 'value':
                h = R;
                break;
              case 'defaultValue':
                v = R;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (R != null) throw Error(r(137, e));
                break;
              default:
                R !== U && Bt(t, e, z, R, n, U);
            }
        }
        lo(t, h, v, S, w, B, o, i);
        return;
      case 'select':
        R = h = v = z = null;
        for (o in a)
          if (((S = a[o]), a.hasOwnProperty(o) && S != null))
            switch (o) {
              case 'value':
                break;
              case 'multiple':
                R = S;
              default:
                n.hasOwnProperty(o) || Bt(t, e, o, null, n, S);
            }
        for (i in n)
          if (((o = n[i]), (S = a[i]), n.hasOwnProperty(i) && (o != null || S != null)))
            switch (i) {
              case 'value':
                z = o;
                break;
              case 'defaultValue':
                v = o;
                break;
              case 'multiple':
                h = o;
              default:
                o !== S && Bt(t, e, i, o, n, S);
            }
        ((e = v),
          (a = h),
          (n = R),
          z != null
            ? xl(t, !!a, z, !1)
            : !!n != !!a && (e != null ? xl(t, !!a, e, !0) : xl(t, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        R = z = null;
        for (v in a)
          if (((i = a[v]), a.hasOwnProperty(v) && i != null && !n.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Bt(t, e, v, null, n, i);
            }
        for (h in n)
          if (((i = n[h]), (o = a[h]), n.hasOwnProperty(h) && (i != null || o != null)))
            switch (h) {
              case 'value':
                z = i;
                break;
              case 'defaultValue':
                R = i;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (i != null) throw Error(r(91));
                break;
              default:
                i !== o && Bt(t, e, h, i, n, o);
            }
        hf(t, z, R);
        return;
      case 'option':
        for (var W in a)
          if (((z = a[W]), a.hasOwnProperty(W) && z != null && !n.hasOwnProperty(W)))
            switch (W) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                Bt(t, e, W, null, n, z);
            }
        for (S in n)
          if (((z = n[S]), (R = a[S]), n.hasOwnProperty(S) && z !== R && (z != null || R != null)))
            switch (S) {
              case 'selected':
                t.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                Bt(t, e, S, z, n, R);
            }
        return;
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var lt in a)
          ((z = a[lt]),
            a.hasOwnProperty(lt) && z != null && !n.hasOwnProperty(lt) && Bt(t, e, lt, null, n, z));
        for (w in n)
          if (((z = n[w]), (R = a[w]), n.hasOwnProperty(w) && z !== R && (z != null || R != null)))
            switch (w) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(r(137, e));
                break;
              default:
                Bt(t, e, w, z, n, R);
            }
        return;
      default:
        if (co(e)) {
          for (var Dt in a)
            ((z = a[Dt]),
              a.hasOwnProperty(Dt) &&
                z !== void 0 &&
                !n.hasOwnProperty(Dt) &&
                Kr(t, e, Dt, void 0, n, z));
          for (B in n)
            ((z = n[B]),
              (R = a[B]),
              !n.hasOwnProperty(B) ||
                z === R ||
                (z === void 0 && R === void 0) ||
                Kr(t, e, B, z, n, R));
          return;
        }
    }
    for (var T in a)
      ((z = a[T]),
        a.hasOwnProperty(T) && z != null && !n.hasOwnProperty(T) && Bt(t, e, T, null, n, z));
    for (U in n)
      ((z = n[U]),
        (R = a[U]),
        !n.hasOwnProperty(U) || z === R || (z == null && R == null) || Bt(t, e, U, z, n, R));
  }
  function v0(t) {
    switch (t) {
      case 'css':
      case 'script':
      case 'font':
      case 'img':
      case 'image':
      case 'input':
      case 'link':
        return !0;
      default:
        return !1;
    }
  }
  function py() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var i = a[n],
          o = i.transferSize,
          h = i.initiatorType,
          v = i.duration;
        if (o && v && v0(h)) {
          for (h = 0, v = i.responseEnd, n += 1; n < a.length; n++) {
            var S = a[n],
              w = S.startTime;
            if (w > v) break;
            var B = S.transferSize,
              U = S.initiatorType;
            B && v0(U) && ((S = S.responseEnd), (h += B * (S < v ? 1 : (v - w) / (S - w))));
          }
          if ((--n, (e += (8 * (o + h)) / (i.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var Qr = null,
    Wr = null;
  function Ts(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function _0(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function b0(t, e) {
    if (t === 0)
      switch (e) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === 'foreignObject' ? 0 : t;
  }
  function Jr(t, e) {
    return (
      t === 'textarea' ||
      t === 'noscript' ||
      typeof e.children == 'string' ||
      typeof e.children == 'number' ||
      typeof e.children == 'bigint' ||
      (typeof e.dangerouslySetInnerHTML == 'object' &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Fr = null;
  function yy() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === Fr ? !1 : ((Fr = t), !0)) : ((Fr = null), !1);
  }
  var S0 = typeof setTimeout == 'function' ? setTimeout : void 0,
    gy = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    x0 = typeof Promise == 'function' ? Promise : void 0,
    vy =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof x0 < 'u'
          ? function (t) {
              return x0.resolve(null).then(t).catch(_y);
            }
          : S0;
  function _y(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function vn(t) {
    return t === 'head';
  }
  function j0(t, e) {
    var a = e,
      n = 0;
    do {
      var i = a.nextSibling;
      if ((t.removeChild(a), i && i.nodeType === 8))
        if (((a = i.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (t.removeChild(i), ti(e));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') Ii(t.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = t.ownerDocument.head), Ii(a));
          for (var o = a.firstChild; o; ) {
            var h = o.nextSibling,
              v = o.nodeName;
            (o[yi] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && o.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(o),
              (o = h));
          }
        } else a === 'body' && Ii(t.ownerDocument.body);
      a = i;
    } while (a);
    ti(e);
  }
  function T0(t, e) {
    var a = t;
    t = 0;
    do {
      var n = a.nextSibling;
      if (
        (a.nodeType === 1
          ? e
            ? ((a._stashedDisplay = a.style.display), (a.style.display = 'none'))
            : ((a.style.display = a._stashedDisplay || ''),
              a.getAttribute('style') === '' && a.removeAttribute('style'))
          : a.nodeType === 3 &&
            (e
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ''))
              : (a.nodeValue = a._stashedText || '')),
        n && n.nodeType === 8)
      )
        if (((a = n.data), a === '/$')) {
          if (t === 0) break;
          t--;
        } else (a !== '$' && a !== '$?' && a !== '$~' && a !== '$!') || t++;
      a = n;
    } while (a);
  }
  function Ir(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var a = e;
      switch (((e = e.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Ir(a), ao(a));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (a.rel.toLowerCase() === 'stylesheet') continue;
      }
      t.removeChild(a);
    }
  }
  function by(t, e, a, n) {
    for (; t.nodeType === 1; ) {
      var i = a;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (n) {
        if (!t[yi])
          switch (e) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break;
              return t;
            case 'link':
              if (
                ((o = t.getAttribute('rel')),
                o === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break;
              if (
                o !== i.rel ||
                t.getAttribute('href') !== (i.href == null || i.href === '' ? null : i.href) ||
                t.getAttribute('crossorigin') !== (i.crossOrigin == null ? null : i.crossOrigin) ||
                t.getAttribute('title') !== (i.title == null ? null : i.title)
              )
                break;
              return t;
            case 'style':
              if (t.hasAttribute('data-precedence')) break;
              return t;
            case 'script':
              if (
                ((o = t.getAttribute('src')),
                (o !== (i.src == null ? null : i.src) ||
                  t.getAttribute('type') !== (i.type == null ? null : i.type) ||
                  t.getAttribute('crossorigin') !==
                    (i.crossOrigin == null ? null : i.crossOrigin)) &&
                  o &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === 'input' && t.type === 'hidden') {
        var o = i.name == null ? null : '' + i.name;
        if (i.type === 'hidden' && t.getAttribute('name') === o) return t;
      } else return t;
      if (((t = ta(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function Sy(t, e, a) {
    if (e === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !a) ||
        ((t = ta(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function A0(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = ta(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Pr(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function tu(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function xy(t, e) {
    var a = t.ownerDocument;
    if (t.data === '$~') t._reactRetry = e;
    else if (t.data !== '$?' || a.readyState !== 'loading') e();
    else {
      var n = function () {
        (e(), a.removeEventListener('DOMContentLoaded', n));
      };
      (a.addEventListener('DOMContentLoaded', n), (t._reactRetry = n));
    }
  }
  function ta(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === '$' ||
            e === '$!' ||
            e === '$?' ||
            e === '$~' ||
            e === '&' ||
            e === 'F!' ||
            e === 'F')
        )
          break;
        if (e === '/$' || e === '/&') return null;
      }
    }
    return t;
  }
  var eu = null;
  function E0(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === '/$' || a === '/&') {
          if (e === 0) return ta(t.nextSibling);
          e--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function M0(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === '$' || a === '$!' || a === '$?' || a === '$~' || a === '&') {
          if (e === 0) return t;
          e--;
        } else (a !== '/$' && a !== '/&') || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function w0(t, e, a) {
    switch (((e = Ts(a)), t)) {
      case 'html':
        if (((t = e.documentElement), !t)) throw Error(r(452));
        return t;
      case 'head':
        if (((t = e.head), !t)) throw Error(r(453));
        return t;
      case 'body':
        if (((t = e.body), !t)) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function Ii(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    ao(t);
  }
  var ea = new Map(),
    N0 = new Set();
  function As(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var Ka = Y.d;
  Y.d = { f: jy, r: Ty, D: Ay, C: Ey, L: My, m: wy, X: zy, S: Ny, M: Cy };
  function jy() {
    var t = Ka.f(),
      e = ys();
    return t || e;
  }
  function Ty(t) {
    var e = _l(t);
    e !== null && e.tag === 5 && e.type === 'form' ? Xd(e) : Ka.r(t);
  }
  var Fl = typeof document > 'u' ? null : document;
  function z0(t, e, a) {
    var n = Fl;
    if (n && typeof e == 'string' && e) {
      var i = Ke(e);
      ((i = 'link[rel="' + t + '"][href="' + i + '"]'),
        typeof a == 'string' && (i += '[crossorigin="' + a + '"]'),
        N0.has(i) ||
          (N0.add(i),
          (t = { rel: t, crossOrigin: a, href: e }),
          n.querySelector(i) === null &&
            ((e = n.createElement('link')), be(e, 'link', t), me(e), n.head.appendChild(e))));
    }
  }
  function Ay(t) {
    (Ka.D(t), z0('dns-prefetch', t, null));
  }
  function Ey(t, e) {
    (Ka.C(t, e), z0('preconnect', t, e));
  }
  function My(t, e, a) {
    Ka.L(t, e, a);
    var n = Fl;
    if (n && t && e) {
      var i = 'link[rel="preload"][as="' + Ke(e) + '"]';
      e === 'image' && a && a.imageSrcSet
        ? ((i += '[imagesrcset="' + Ke(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (i += '[imagesizes="' + Ke(a.imageSizes) + '"]'))
        : (i += '[href="' + Ke(t) + '"]');
      var o = i;
      switch (e) {
        case 'style':
          o = Il(t);
          break;
        case 'script':
          o = Pl(t);
      }
      ea.has(o) ||
        ((t = b(
          { rel: 'preload', href: e === 'image' && a && a.imageSrcSet ? void 0 : t, as: e },
          a
        )),
        ea.set(o, t),
        n.querySelector(i) !== null ||
          (e === 'style' && n.querySelector(Pi(o))) ||
          (e === 'script' && n.querySelector(tc(o))) ||
          ((e = n.createElement('link')), be(e, 'link', t), me(e), n.head.appendChild(e)));
    }
  }
  function wy(t, e) {
    Ka.m(t, e);
    var a = Fl;
    if (a && t) {
      var n = e && typeof e.as == 'string' ? e.as : 'script',
        i = 'link[rel="modulepreload"][as="' + Ke(n) + '"][href="' + Ke(t) + '"]',
        o = i;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          o = Pl(t);
      }
      if (
        !ea.has(o) &&
        ((t = b({ rel: 'modulepreload', href: t }, e)), ea.set(o, t), a.querySelector(i) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(tc(o))) return;
        }
        ((n = a.createElement('link')), be(n, 'link', t), me(n), a.head.appendChild(n));
      }
    }
  }
  function Ny(t, e, a) {
    Ka.S(t, e, a);
    var n = Fl;
    if (n && t) {
      var i = bl(n).hoistableStyles,
        o = Il(t);
      e = e || 'default';
      var h = i.get(o);
      if (!h) {
        var v = { loading: 0, preload: null };
        if ((h = n.querySelector(Pi(o)))) v.loading = 5;
        else {
          ((t = b({ rel: 'stylesheet', href: t, 'data-precedence': e }, a)),
            (a = ea.get(o)) && au(t, a));
          var S = (h = n.createElement('link'));
          (me(S),
            be(S, 'link', t),
            (S._p = new Promise(function (w, B) {
              ((S.onload = w), (S.onerror = B));
            })),
            S.addEventListener('load', function () {
              v.loading |= 1;
            }),
            S.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            Es(h, e, n));
        }
        ((h = { type: 'stylesheet', instance: h, count: 1, state: v }), i.set(o, h));
      }
    }
  }
  function zy(t, e) {
    Ka.X(t, e);
    var a = Fl;
    if (a && t) {
      var n = bl(a).hoistableScripts,
        i = Pl(t),
        o = n.get(i);
      o ||
        ((o = a.querySelector(tc(i))),
        o ||
          ((t = b({ src: t, async: !0 }, e)),
          (e = ea.get(i)) && nu(t, e),
          (o = a.createElement('script')),
          me(o),
          be(o, 'link', t),
          a.head.appendChild(o)),
        (o = { type: 'script', instance: o, count: 1, state: null }),
        n.set(i, o));
    }
  }
  function Cy(t, e) {
    Ka.M(t, e);
    var a = Fl;
    if (a && t) {
      var n = bl(a).hoistableScripts,
        i = Pl(t),
        o = n.get(i);
      o ||
        ((o = a.querySelector(tc(i))),
        o ||
          ((t = b({ src: t, async: !0, type: 'module' }, e)),
          (e = ea.get(i)) && nu(t, e),
          (o = a.createElement('script')),
          me(o),
          be(o, 'link', t),
          a.head.appendChild(o)),
        (o = { type: 'script', instance: o, count: 1, state: null }),
        n.set(i, o));
    }
  }
  function C0(t, e, a, n) {
    var i = (i = K.current) ? As(i) : null;
    if (!i) throw Error(r(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((e = Il(a.href)),
            (a = bl(i).hoistableStyles),
            (n = a.get(e)),
            n || ((n = { type: 'style', instance: null, count: 0, state: null }), a.set(e, n)),
            n)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          a.rel === 'stylesheet' &&
          typeof a.href == 'string' &&
          typeof a.precedence == 'string'
        ) {
          t = Il(a.href);
          var o = bl(i).hoistableStyles,
            h = o.get(t);
          if (
            (h ||
              ((i = i.ownerDocument || i),
              (h = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              o.set(t, h),
              (o = i.querySelector(Pi(t))) && !o._p && ((h.instance = o), (h.state.loading = 5)),
              ea.has(t) ||
                ((a = {
                  rel: 'preload',
                  as: 'style',
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                ea.set(t, a),
                o || Ry(i, t, a, h.state))),
            e && n === null)
          )
            throw Error(r(528, ''));
          return h;
        }
        if (e && n !== null) throw Error(r(529, ''));
        return null;
      case 'script':
        return (
          (e = a.async),
          (a = a.src),
          typeof a == 'string' && e && typeof e != 'function' && typeof e != 'symbol'
            ? ((e = Pl(a)),
              (a = bl(i).hoistableScripts),
              (n = a.get(e)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(e, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, t));
    }
  }
  function Il(t) {
    return 'href="' + Ke(t) + '"';
  }
  function Pi(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function R0(t) {
    return b({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function Ry(t, e, a, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + ']')
      ? (n.loading = 1)
      : ((e = t.createElement('link')),
        (n.preload = e),
        e.addEventListener('load', function () {
          return (n.loading |= 1);
        }),
        e.addEventListener('error', function () {
          return (n.loading |= 2);
        }),
        be(e, 'link', a),
        me(e),
        t.head.appendChild(e));
  }
  function Pl(t) {
    return '[src="' + Ke(t) + '"]';
  }
  function tc(t) {
    return 'script[async]' + t;
  }
  function O0(t, e, a) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var n = t.querySelector('style[data-href~="' + Ke(a.href) + '"]');
          if (n) return ((e.instance = n), me(n), n);
          var i = b({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (t.ownerDocument || t).createElement('style')),
            me(n),
            be(n, 'style', i),
            Es(n, a.precedence, t),
            (e.instance = n)
          );
        case 'stylesheet':
          i = Il(a.href);
          var o = t.querySelector(Pi(i));
          if (o) return ((e.state.loading |= 4), (e.instance = o), me(o), o);
          ((n = R0(a)),
            (i = ea.get(i)) && au(n, i),
            (o = (t.ownerDocument || t).createElement('link')),
            me(o));
          var h = o;
          return (
            (h._p = new Promise(function (v, S) {
              ((h.onload = v), (h.onerror = S));
            })),
            be(o, 'link', n),
            (e.state.loading |= 4),
            Es(o, a.precedence, t),
            (e.instance = o)
          );
        case 'script':
          return (
            (o = Pl(a.src)),
            (i = t.querySelector(tc(o)))
              ? ((e.instance = i), me(i), i)
              : ((n = a),
                (i = ea.get(o)) && ((n = b({}, a)), nu(n, i)),
                (t = t.ownerDocument || t),
                (i = t.createElement('script')),
                me(i),
                be(i, 'link', n),
                t.head.appendChild(i),
                (e.instance = i))
          );
        case 'void':
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === 'stylesheet' &&
        (e.state.loading & 4) === 0 &&
        ((n = e.instance), (e.state.loading |= 4), Es(n, a.precedence, t));
    return e.instance;
  }
  function Es(t, e, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        i = n.length ? n[n.length - 1] : null,
        o = i,
        h = 0;
      h < n.length;
      h++
    ) {
      var v = n[h];
      if (v.dataset.precedence === e) o = v;
      else if (o !== i) break;
    }
    o
      ? o.parentNode.insertBefore(t, o.nextSibling)
      : ((e = a.nodeType === 9 ? a.head : a), e.insertBefore(t, e.firstChild));
  }
  function au(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function nu(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Ms = null;
  function B0(t, e, a) {
    if (Ms === null) {
      var n = new Map(),
        i = (Ms = new Map());
      i.set(a, n);
    } else ((i = Ms), (n = i.get(a)), n || ((n = new Map()), i.set(a, n)));
    if (n.has(t)) return n;
    for (n.set(t, null), a = a.getElementsByTagName(t), i = 0; i < a.length; i++) {
      var o = a[i];
      if (
        !(o[yi] || o[ye] || (t === 'link' && o.getAttribute('rel') === 'stylesheet')) &&
        o.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var h = o.getAttribute(e) || '';
        h = t + h;
        var v = n.get(h);
        v ? v.push(o) : n.set(h, [o]);
      }
    }
    return n;
  }
  function D0(t, e, a) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(a, e === 'title' ? t.querySelector('head > title') : null));
  }
  function Oy(t, e, a) {
    if (a === 1 || e.itemProp != null) return !1;
    switch (t) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (typeof e.precedence != 'string' || typeof e.href != 'string' || e.href === '') break;
        return !0;
      case 'link':
        if (
          typeof e.rel != 'string' ||
          typeof e.href != 'string' ||
          e.href === '' ||
          e.onLoad ||
          e.onError
        )
          break;
        switch (e.rel) {
          case 'stylesheet':
            return ((t = e.disabled), typeof e.precedence == 'string' && t == null);
          default:
            return !0;
        }
      case 'script':
        if (
          e.async &&
          typeof e.async != 'function' &&
          typeof e.async != 'symbol' &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function L0(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function By(t, e, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var i = Il(n.href),
          o = e.querySelector(Pi(i));
        if (o) {
          ((e = o._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = ws.bind(t)), e.then(t, t)),
            (a.state.loading |= 4),
            (a.instance = o),
            me(o));
          return;
        }
        ((o = e.ownerDocument || e),
          (n = R0(n)),
          (i = ea.get(i)) && au(n, i),
          (o = o.createElement('link')),
          me(o));
        var h = o;
        ((h._p = new Promise(function (v, S) {
          ((h.onload = v), (h.onerror = S));
        })),
          be(o, 'link', n),
          (a.instance = o));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(a, e),
        (e = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (t.count++,
          (a = ws.bind(t)),
          e.addEventListener('load', a),
          e.addEventListener('error', a)));
    }
  }
  var lu = 0;
  function Dy(t, e) {
    return (
      t.stylesheets && t.count === 0 && zs(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((t.stylesheets && zs(t, t.stylesheets), t.unsuspend)) {
                var o = t.unsuspend;
                ((t.unsuspend = null), o());
              }
            }, 6e4 + e);
            0 < t.imgBytes && lu === 0 && (lu = 62500 * py());
            var i = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && zs(t, t.stylesheets), t.unsuspend))
                ) {
                  var o = t.unsuspend;
                  ((t.unsuspend = null), o());
                }
              },
              (t.imgBytes > lu ? 50 : 800) + e
            );
            return (
              (t.unsuspend = a),
              function () {
                ((t.unsuspend = null), clearTimeout(n), clearTimeout(i));
              }
            );
          }
        : null
    );
  }
  function ws() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) zs(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Ns = null;
  function zs(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Ns = new Map()), e.forEach(Ly, t), (Ns = null), ws.call(t)));
  }
  function Ly(t, e) {
    if (!(e.state.loading & 4)) {
      var a = Ns.get(t);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), Ns.set(t, a));
        for (
          var i = t.querySelectorAll('link[data-precedence],style[data-precedence]'), o = 0;
          o < i.length;
          o++
        ) {
          var h = i[o];
          (h.nodeName === 'LINK' || h.getAttribute('media') !== 'not all') &&
            (a.set(h.dataset.precedence, h), (n = h));
        }
        n && a.set(null, n);
      }
      ((i = e.instance),
        (h = i.getAttribute('data-precedence')),
        (o = a.get(h) || n),
        o === n && a.set(null, i),
        a.set(h, i),
        this.count++,
        (n = ws.bind(this)),
        i.addEventListener('load', n),
        i.addEventListener('error', n),
        o
          ? o.parentNode.insertBefore(i, o.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(i, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var ec = {
    $$typeof: rt,
    Provider: null,
    Consumer: null,
    _currentValue: at,
    _currentValue2: at,
    _threadCount: 0,
  };
  function $y(t, e, a, n, i, o, h, v, S) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Na(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Na(0)),
      (this.hiddenUpdates = Na(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = i),
      (this.onCaughtError = o),
      (this.onRecoverableError = h),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = S),
      (this.incompleteTransitions = new Map()));
  }
  function $0(t, e, a, n, i, o, h, v, S, w, B, U) {
    return (
      (t = new $y(t, e, a, h, S, w, B, U, v)),
      (e = 1),
      o === !0 && (e |= 24),
      (o = He(3, null, null, e)),
      (t.current = o),
      (o.stateNode = t),
      (e = $o()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (o.memoizedState = { element: n, isDehydrated: a, cache: e }),
      ko(o),
      t
    );
  }
  function H0(t) {
    return t ? ((t = zl), t) : zl;
  }
  function U0(t, e, a, n, i, o) {
    ((i = H0(i)),
      n.context === null ? (n.context = i) : (n.pendingContext = i),
      (n = sn(e)),
      (n.payload = { element: a }),
      (o = o === void 0 ? null : o),
      o !== null && (n.callback = o),
      (a = on(t, n, e)),
      a !== null && (De(a, t, e), Oi(a, t, e)));
  }
  function q0(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function iu(t, e) {
    (q0(t, e), (t = t.alternate) && q0(t, e));
  }
  function k0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Gn(t, 67108864);
      (e !== null && De(e, t, 67108864), iu(t, 67108864));
    }
  }
  function V0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ge();
      e = Ps(e);
      var a = Gn(t, e);
      (a !== null && De(a, t, e), iu(t, e));
    }
  }
  var Cs = !0;
  function Hy(t, e, a, n) {
    var i = O.T;
    O.T = null;
    var o = Y.p;
    try {
      ((Y.p = 2), cu(t, e, a, n));
    } finally {
      ((Y.p = o), (O.T = i));
    }
  }
  function Uy(t, e, a, n) {
    var i = O.T;
    O.T = null;
    var o = Y.p;
    try {
      ((Y.p = 8), cu(t, e, a, n));
    } finally {
      ((Y.p = o), (O.T = i));
    }
  }
  function cu(t, e, a, n) {
    if (Cs) {
      var i = su(n);
      if (i === null) (Xr(t, e, n, Rs, a), Z0(t, n));
      else if (ky(i, t, e, a, n)) n.stopPropagation();
      else if ((Z0(t, n), e & 4 && -1 < qy.indexOf(t))) {
        for (; i !== null; ) {
          var o = _l(i);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (((o = o.stateNode), o.current.memoizedState.isDehydrated)) {
                  var h = ne(o.pendingLanes);
                  if (h !== 0) {
                    var v = o;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; h; ) {
                      var S = 1 << (31 - ue(h));
                      ((v.entanglements[1] |= S), (h &= ~S));
                    }
                    (ja(o), (Et & 6) === 0 && ((hs = de() + 500), Wi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = Gn(o, 2)), v !== null && De(v, o, 2), ys(), iu(o, 2));
            }
          if (((o = su(n)), o === null && Xr(t, e, n, Rs, a), o === i)) break;
          i = o;
        }
        i !== null && n.stopPropagation();
      } else Xr(t, e, n, null, a);
    }
  }
  function su(t) {
    return ((t = oo(t)), ou(t));
  }
  var Rs = null;
  function ou(t) {
    if (((Rs = null), (t = vl(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var a = e.tag;
        if (a === 13) {
          if (((t = m(e)), t !== null)) return t;
          t = null;
        } else if (a === 31) {
          if (((t = p(e)), t !== null)) return t;
          t = null;
        } else if (a === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((Rs = t), null);
  }
  function G0(t) {
    switch (t) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8;
      case 'message':
        switch (ga()) {
          case $n:
            return 2;
          case yl:
            return 8;
          case ia:
          case va:
            return 32;
          case Hn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ru = !1,
    _n = null,
    bn = null,
    Sn = null,
    ac = new Map(),
    nc = new Map(),
    xn = [],
    qy =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Z0(t, e) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        _n = null;
        break;
      case 'dragenter':
      case 'dragleave':
        bn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Sn = null;
        break;
      case 'pointerover':
      case 'pointerout':
        ac.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        nc.delete(e.pointerId);
    }
  }
  function lc(t, e, a, n, i, o) {
    return t === null || t.nativeEvent !== o
      ? ((t = {
          blockedOn: e,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: o,
          targetContainers: [i],
        }),
        e !== null && ((e = _l(e)), e !== null && k0(e)),
        t)
      : ((t.eventSystemFlags |= n),
        (e = t.targetContainers),
        i !== null && e.indexOf(i) === -1 && e.push(i),
        t);
  }
  function ky(t, e, a, n, i) {
    switch (e) {
      case 'focusin':
        return ((_n = lc(_n, t, e, a, n, i)), !0);
      case 'dragenter':
        return ((bn = lc(bn, t, e, a, n, i)), !0);
      case 'mouseover':
        return ((Sn = lc(Sn, t, e, a, n, i)), !0);
      case 'pointerover':
        var o = i.pointerId;
        return (ac.set(o, lc(ac.get(o) || null, t, e, a, n, i)), !0);
      case 'gotpointercapture':
        return ((o = i.pointerId), nc.set(o, lc(nc.get(o) || null, t, e, a, n, i)), !0);
    }
    return !1;
  }
  function Y0(t) {
    var e = vl(t.target);
    if (e !== null) {
      var a = d(e);
      if (a !== null) {
        if (((e = a.tag), e === 13)) {
          if (((e = m(a)), e !== null)) {
            ((t.blockedOn = e),
              lf(t.priority, function () {
                V0(a);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = p(a)), e !== null)) {
            ((t.blockedOn = e),
              lf(t.priority, function () {
                V0(a);
              }));
            return;
          }
        } else if (e === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Os(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = su(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((so = n), a.target.dispatchEvent(n), (so = null));
      } else return ((e = _l(a)), e !== null && k0(e), (t.blockedOn = a), !1);
      e.shift();
    }
    return !0;
  }
  function X0(t, e, a) {
    Os(t) && a.delete(e);
  }
  function Vy() {
    ((ru = !1),
      _n !== null && Os(_n) && (_n = null),
      bn !== null && Os(bn) && (bn = null),
      Sn !== null && Os(Sn) && (Sn = null),
      ac.forEach(X0),
      nc.forEach(X0));
  }
  function Bs(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      ru || ((ru = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, Vy)));
  }
  var Ds = null;
  function K0(t) {
    Ds !== t &&
      ((Ds = t),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        Ds === t && (Ds = null);
        for (var e = 0; e < t.length; e += 3) {
          var a = t[e],
            n = t[e + 1],
            i = t[e + 2];
          if (typeof n != 'function') {
            if (ou(n || a) === null) continue;
            break;
          }
          var o = _l(a);
          o !== null &&
            (t.splice(e, 3),
            (e -= 3),
            sr(o, { pending: !0, data: i, method: a.method, action: n }, n, i));
        }
      }));
  }
  function ti(t) {
    function e(S) {
      return Bs(S, t);
    }
    (_n !== null && Bs(_n, t),
      bn !== null && Bs(bn, t),
      Sn !== null && Bs(Sn, t),
      ac.forEach(e),
      nc.forEach(e));
    for (var a = 0; a < xn.length; a++) {
      var n = xn[a];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < xn.length && ((a = xn[0]), a.blockedOn === null); )
      (Y0(a), a.blockedOn === null && xn.shift());
    if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var i = a[n],
          o = a[n + 1],
          h = i[Ne] || null;
        if (typeof o == 'function') h || K0(a);
        else if (h) {
          var v = null;
          if (o && o.hasAttribute('formAction')) {
            if (((i = o), (h = o[Ne] || null))) v = h.formAction;
            else if (ou(i) !== null) continue;
          } else v = h.action;
          (typeof v == 'function' ? (a[n + 1] = v) : (a.splice(n, 3), (n -= 3)), K0(a));
        }
      }
  }
  function Q0() {
    function t(o) {
      o.canIntercept &&
        o.info === 'react-transition' &&
        o.intercept({
          handler: function () {
            return new Promise(function (h) {
              return (i = h);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function e() {
      (i !== null && (i(), (i = null)), n || setTimeout(a, 20));
    }
    function a() {
      if (!n && !navigation.transition) {
        var o = navigation.currentEntry;
        o &&
          o.url != null &&
          navigation.navigate(o.url, {
            state: o.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var n = !1,
        i = null;
      return (
        navigation.addEventListener('navigate', t),
        navigation.addEventListener('navigatesuccess', e),
        navigation.addEventListener('navigateerror', e),
        setTimeout(a, 100),
        function () {
          ((n = !0),
            navigation.removeEventListener('navigate', t),
            navigation.removeEventListener('navigatesuccess', e),
            navigation.removeEventListener('navigateerror', e),
            i !== null && (i(), (i = null)));
        }
      );
    }
  }
  function uu(t) {
    this._internalRoot = t;
  }
  ((Ls.prototype.render = uu.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(r(409));
      var a = e.current,
        n = Ge();
      U0(a, n, t, e, null, null);
    }),
    (Ls.prototype.unmount = uu.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (U0(t.current, 2, null, t, null, null), ys(), (e[gl] = null));
        }
      }));
  function Ls(t) {
    this._internalRoot = t;
  }
  Ls.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = nf();
      t = { blockedOn: null, target: t, priority: e };
      for (var a = 0; a < xn.length && e !== 0 && e < xn[a].priority; a++);
      (xn.splice(a, 0, t), a === 0 && Y0(t));
    }
  };
  var W0 = c.version;
  if (W0 !== '19.2.5') throw Error(r(527, W0, '19.2.5'));
  Y.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(r(188))
        : ((t = Object.keys(t).join(',')), Error(r(268, t)));
    return ((t = y(e)), (t = t !== null ? _(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Gy = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: O,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var $s = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$s.isDisabled && $s.supportsFiber)
      try {
        ((we = $s.inject(Gy)), (ae = $s));
      } catch {}
  }
  return (
    (cc.createRoot = function (t, e) {
      if (!f(t)) throw Error(r(299));
      var a = !1,
        n = '',
        i = am,
        o = nm,
        h = lm;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (n = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (i = e.onUncaughtError),
          e.onCaughtError !== void 0 && (o = e.onCaughtError),
          e.onRecoverableError !== void 0 && (h = e.onRecoverableError)),
        (e = $0(t, 1, !1, null, null, a, n, null, i, o, h, Q0)),
        (t[gl] = e.current),
        Yr(t),
        new uu(e)
      );
    }),
    (cc.hydrateRoot = function (t, e, a) {
      if (!f(t)) throw Error(r(299));
      var n = !1,
        i = '',
        o = am,
        h = nm,
        v = lm,
        S = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (i = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (o = a.onUncaughtError),
          a.onCaughtError !== void 0 && (h = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (S = a.formState)),
        (e = $0(t, 1, !0, e, a ?? null, n, i, S, o, h, v, Q0)),
        (e.context = H0(null)),
        (a = e.current),
        (n = Ge()),
        (n = Ps(n)),
        (i = sn(n)),
        (i.callback = null),
        on(a, i, n),
        (a = n),
        (e.current.lanes = a),
        Ia(e, a),
        ja(e),
        (t[gl] = e.current),
        Yr(t),
        new Ls(e)
      );
    }),
    (cc.version = '19.2.5'),
    cc
  );
}
var ih;
function ag() {
  if (ih) return du.exports;
  ih = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (c) {
        console.error(c);
      }
  }
  return (l(), (du.exports = eg()), du.exports);
}
var ng = ag(),
  V = ku();
const Hs = Ky(V);
function lg(l) {
  return 440 * Math.pow(2, (l - 69) / 12);
}
const ig = {
  C: 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  F: 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
};
function D(l) {
  const c = l.match(/^([A-G]#?b?)(\d)$/);
  if (!c) throw new Error(`Invalid note: ${l}`);
  const s = ig[c[1]];
  if (s === void 0) throw new Error(`Invalid note name: ${c[1]}`);
  const f = 12 + parseInt(c[2], 10) * 12 + s;
  return lg(f);
}
(D('A2'),
  D('B2'),
  D('C3'),
  D('D3'),
  D('E3'),
  D('F3'),
  D('G3'),
  D('A3'),
  D('B3'),
  D('C4'),
  D('D4'),
  D('E4'),
  D('F4'),
  D('G4'),
  D('A4'));
(D('E2'),
  D('F#2'),
  D('G2'),
  D('A2'),
  D('B2'),
  D('C3'),
  D('D3'),
  D('E3'),
  D('F#3'),
  D('G3'),
  D('A3'),
  D('B3'),
  D('C4'),
  D('D4'),
  D('E4'));
const cg = [D('A2'), D('C3'), D('E3')],
  sg = [D('E2'), D('G2'), D('B2')];
(D('D3'), D('F3'), D('A3'));
const og = [D('G2'), D('B2'), D('D3')],
  rg = [D('C3'), D('E3'), D('G3')],
  ug = [D('B2'), D('D3'), D('F3')];
function la(l, c, s, r, f, d, m, p, g) {
  const y = l.createOscillator(),
    _ = l.createGain();
  ((y.type = s), y.frequency.setValueAtTime(r, f));
  const b = 0.01,
    A = Math.min(0.08, d * 0.4);
  if (
    (_.gain.setValueAtTime(1e-4, f),
    _.gain.linearRampToValueAtTime(m, f + b),
    _.gain.setValueAtTime(m, f + d - A),
    _.gain.exponentialRampToValueAtTime(1e-4, f + d),
    p !== void 0)
  ) {
    const N = l.createBiquadFilter();
    ((N.type = 'lowpass'),
      (N.frequency.value = p),
      (N.Q.value = 0.8),
      y.connect(N).connect(_).connect(c));
  } else y.connect(_).connect(c);
  (y.start(f), y.stop(f + d + 0.02), g == null || g.push(y));
}
function xc(l, c) {
  const s = Math.max(1, Math.floor(l.sampleRate * c)),
    r = l.createBuffer(1, s, l.sampleRate),
    f = r.getChannelData(0);
  let d = 74565;
  for (let m = 0; m < s; m++)
    ((d = (d * 1664525 + 1013904223) & 4294967295), (f[m] = d / 2147483648 - 1));
  return r;
}
function bc(l, c, s, r, f) {
  const d = l.createOscillator(),
    m = l.createGain();
  ((d.type = 'sine'),
    d.frequency.setValueAtTime(80, s),
    d.frequency.exponentialRampToValueAtTime(30, s + 0.12),
    m.gain.setValueAtTime(r, s),
    m.gain.exponentialRampToValueAtTime(1e-4, s + 0.18),
    d.connect(m).connect(c),
    d.start(s),
    d.stop(s + 0.22),
    f == null || f.push(d));
  const p = l.createBufferSource();
  p.buffer = xc(l, 0.04);
  const g = l.createGain(),
    y = l.createBiquadFilter();
  ((y.type = 'highpass'),
    (y.frequency.value = 400),
    g.gain.setValueAtTime(r * 0.3, s),
    g.gain.exponentialRampToValueAtTime(1e-4, s + 0.04),
    p.connect(y).connect(g).connect(c),
    p.start(s),
    f == null || f.push(p));
}
function fg(l, c, s, r, f, d) {
  const m = l.createBufferSource();
  m.buffer = xc(l, f + 0.01);
  const p = l.createGain(),
    g = l.createBiquadFilter();
  ((g.type = 'highpass'),
    (g.frequency.value = 6e3),
    p.gain.setValueAtTime(r, s),
    p.gain.exponentialRampToValueAtTime(1e-4, s + f),
    m.connect(g).connect(p).connect(c),
    m.start(s),
    d == null || d.push(m));
}
const dg = 100,
  sl = 60 / dg,
  vc = sl * 4,
  Kh = 8,
  mg = vc * Kh,
  hg = 2,
  pg = 100,
  yg = [D('A2'), D('A2'), D('G2'), D('G2'), D('C3'), D('C3'), D('E2'), D('E2')],
  ch = [D('A3'), D('C4'), D('E4'), D('A4'), D('G4'), D('E4'), D('C4'), D('A3')],
  sh = [
    [D('A3'), D('C4'), D('E4')],
    [D('G3'), D('B3'), D('D4')],
    [D('C3'), D('E3'), D('G3')],
    [D('E3'), D('G3'), D('B3')],
  ];
function gg(l, c, s, r) {
  for (let f = 0; f < Kh; f++) {
    const d = s + f * vc,
      m = yg[f];
    (la(l, c, 'sawtooth', m, d, sl * 1.8, 0.22, 300, r),
      la(l, c, 'sawtooth', m, d + sl * 2, sl * 1.8, 0.22, 300, r),
      bc(l, c, d, 0.35, r),
      bc(l, c, d + sl * 2, 0.28, r));
    for (let p = 0; p < 8; p++) {
      const g = (f * 8 + p) % ch.length,
        y = d + p * sl * 0.5;
      la(l, c, 'square', ch[g], y, sl * 0.4, 0.07, 2400, r);
    }
  }
  for (let f = 0; f < sh.length; f++) {
    const d = sh[f],
      m = s + f * vc * 2,
      p = vc * 2;
    for (const g of d) {
      const y = l.createOscillator(),
        _ = l.createGain();
      ((y.type = 'triangle'), y.frequency.setValueAtTime(g, m));
      const b = 0.08;
      (_.gain.setValueAtTime(1e-4, m),
        _.gain.linearRampToValueAtTime(b, m + 0.15),
        _.gain.setValueAtTime(b, m + p - 0.2),
        _.gain.exponentialRampToValueAtTime(1e-4, m + p),
        y.connect(_).connect(c),
        y.start(m),
        y.stop(m + p + 0.05),
        r.push(y));
    }
  }
}
function vg(l, c) {
  let s = 0,
    r = null;
  const f = [];
  function d() {
    const p = l.currentTime + hg * vc;
    for (; s < p; ) (gg(l, c, s, f), (s += mg));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (r = setInterval(() => {
          d();
        }, pg)));
    },
    stop() {
      r !== null && (clearInterval(r), (r = null));
      const m = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(m);
        } catch {}
      f.length = 0;
    },
  };
}
const _g = 100,
  Wa = 60 / _g,
  Vu = Wa * 4,
  Qh = 8,
  Nn = Vu * Qh,
  bg = 2,
  Sg = 100,
  oh = [D('E5'), D('D5'), D('B4'), D('G4'), D('F#4'), D('E4'), D('D4'), D('B3')];
function rh(l, c, s, r, f) {
  const d = l.createBufferSource();
  d.buffer = xc(l, 0.2);
  const m = l.createGain(),
    p = l.createBiquadFilter();
  ((p.type = 'bandpass'),
    (p.frequency.value = 900),
    (p.Q.value = 0.6),
    m.gain.setValueAtTime(r, s),
    m.gain.exponentialRampToValueAtTime(1e-4, s + 0.18),
    d.connect(p).connect(m).connect(c),
    d.start(s),
    f.push(d),
    la(l, c, 'sine', 120, s, 0.12, r * 0.5, 300, f));
}
function xg(l, c, s, r) {
  {
    const d = l.createOscillator(),
      m = l.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(D('E1'), s));
    const p = 0.35;
    (m.gain.setValueAtTime(1e-4, s),
      m.gain.linearRampToValueAtTime(p, s + 0.3),
      m.gain.setValueAtTime(p, s + Nn - 0.3),
      m.gain.linearRampToValueAtTime(1e-4, s + Nn));
    const g = l.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 120),
      d.connect(g).connect(m).connect(c),
      d.start(s),
      d.stop(s + Nn + 0.05),
      r.push(d));
  }
  for (let d = 0; d < Qh; d++) {
    const m = s + d * Vu;
    for (let p = 0; p < 4; p++) {
      const g = m + p * Wa;
      (la(l, c, 'sawtooth', D('E2'), g, Wa * 0.9, 0.22, 400, r),
        la(l, c, 'sawtooth', D('B2'), g, Wa * 0.8, 0.1, 600, r));
    }
    (bc(l, c, m, 0.5, r),
      bc(l, c, m + Wa * 2, 0.45, r),
      rh(l, c, m + Wa, 0.4, r),
      rh(l, c, m + Wa * 3, 0.38, r));
  }
  const f = [...ug, D('C4')];
  for (const d of f) {
    const m = l.createOscillator(),
      p = l.createGain();
    ((m.type = 'sawtooth'), m.frequency.setValueAtTime(d, s));
    const g = 0.07;
    (p.gain.setValueAtTime(1e-4, s),
      p.gain.linearRampToValueAtTime(g, s + 0.8),
      p.gain.setValueAtTime(g, s + Nn - 0.8),
      p.gain.exponentialRampToValueAtTime(1e-4, s + Nn));
    const y = l.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 900),
      m.connect(y).connect(p).connect(c),
      m.start(s),
      m.stop(s + Nn + 0.05),
      r.push(m));
  }
  for (let d = 0; d < oh.length; d++) {
    const m = s + d * Wa * 2;
    la(l, c, 'sawtooth', oh[d], m, Wa * 1.6, 0.08, 2e3, r);
  }
  {
    const d = l.createBufferSource();
    d.buffer = xc(l, Nn + 0.1);
    const m = l.createGain(),
      p = l.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 200),
      m.gain.setValueAtTime(0.04, s),
      d.connect(p).connect(m).connect(c),
      d.start(s),
      r.push(d));
  }
}
function jg(l, c) {
  let s = 0,
    r = null;
  const f = [];
  function d() {
    const p = l.currentTime + bg * Vu;
    for (; s < p; ) (xg(l, c, s, f), (s += Nn));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (r = setInterval(() => {
          d();
        }, Sg)));
    },
    stop() {
      r !== null && (clearInterval(r), (r = null));
      const m = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(m);
        } catch {}
      f.length = 0;
    },
  };
}
const Tg = 120,
  Ja = 60 / Tg,
  Gu = Ja * 4,
  Wh = 8,
  Vs = Gu * Wh,
  Ag = 2,
  Eg = 100,
  Mg = [D('E2'), D('E2'), D('D2'), D('D2'), D('E2'), D('E2'), D('B1'), D('B1')],
  uh = [
    D('E4'),
    D('G4'),
    D('B4'),
    D('D5'),
    D('E5'),
    D('D5'),
    D('B4'),
    D('G4'),
    D('E4'),
    D('F#4'),
    D('G4'),
    D('A4'),
    D('B4'),
    D('A4'),
    D('G4'),
    D('F#4'),
  ];
function fh(l, c, s, r, f) {
  const d = l.createBufferSource();
  d.buffer = xc(l, 0.15);
  const m = l.createGain(),
    p = l.createBiquadFilter();
  ((p.type = 'bandpass'),
    (p.frequency.value = 1800),
    (p.Q.value = 0.8),
    m.gain.setValueAtTime(r, s),
    m.gain.exponentialRampToValueAtTime(1e-4, s + 0.13),
    d.connect(p).connect(m).connect(c),
    d.start(s),
    f.push(d),
    la(l, c, 'triangle', 200, s, 0.08, r * 0.4, void 0, f));
}
function wg(l, c, s, r) {
  for (let d = 0; d < Wh; d++) {
    const m = s + d * Gu,
      p = Mg[d];
    for (let g = 0; g < 4; g++) la(l, c, 'sawtooth', p, m + g * Ja, Ja * 0.85, 0.26, 280, r);
    for (let g = 0; g < 4; g++) bc(l, c, m + g * Ja, 0.42, r);
    (fh(l, c, m + Ja, 0.3, r), fh(l, c, m + Ja * 3, 0.3, r));
    for (let g = 0; g < 8; g++) fg(l, c, m + g * Ja * 0.5, 0.12, 0.08, r);
    for (let g = 0; g < 16; g++) {
      const y = (d * 16 + g) % uh.length,
        _ = m + g * Ja * 0.25;
      la(l, c, 'sawtooth', uh[y], _, Ja * 0.22, 0.06, 3200, r);
    }
  }
  const f = [D('E3'), D('G3'), D('B3')];
  for (const d of f) {
    const m = l.createOscillator(),
      p = l.createGain();
    ((m.type = 'triangle'),
      m.frequency.setValueAtTime(d, s),
      p.gain.setValueAtTime(1e-4, s),
      p.gain.linearRampToValueAtTime(0.06, s + 0.2),
      p.gain.setValueAtTime(0.06, s + Vs - 0.3),
      p.gain.exponentialRampToValueAtTime(1e-4, s + Vs));
    const g = l.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 1200),
      m.connect(g).connect(p).connect(c),
      m.start(s),
      m.stop(s + Vs + 0.05),
      r.push(m));
  }
}
function Ng(l, c) {
  let s = 0,
    r = null;
  const f = [];
  function d() {
    const p = l.currentTime + Ag * Gu;
    for (; s < p; ) (wg(l, c, s, f), (s += Vs));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (r = setInterval(() => {
          d();
        }, Eg)));
    },
    stop() {
      r !== null && (clearInterval(r), (r = null));
      const m = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(m);
        } catch {}
      f.length = 0;
    },
  };
}
const zg = 80,
  Gs = 60 / zg,
  Ys = Gs * 4,
  Cg = 8,
  Zs = Ys * Cg,
  Rg = 2,
  Og = 100,
  dh = [cg, rg, og, sg],
  gu = [D('A3'), D('C4'), D('E4'), D('G4'), D('A4'), D('E4')];
function Bg(l, c, s, r) {
  {
    const f = l.createOscillator(),
      d = l.createGain();
    ((f.type = 'sine'), f.frequency.setValueAtTime(D('A2'), s));
    const m = 0.28;
    (d.gain.setValueAtTime(1e-4, s),
      d.gain.linearRampToValueAtTime(m, s + 0.5),
      d.gain.setValueAtTime(m, s + Zs - 0.5),
      d.gain.linearRampToValueAtTime(1e-4, s + Zs));
    const p = l.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 180),
      f.connect(p).connect(d).connect(c),
      f.start(s),
      f.stop(s + Zs + 0.05),
      r.push(f));
  }
  for (let f = 0; f < dh.length; f++) {
    const d = dh[f],
      m = s + f * Ys * 2,
      p = Ys * 2;
    for (const g of d) {
      const y = l.createOscillator(),
        _ = l.createGain();
      ((y.type = 'triangle'), y.frequency.setValueAtTime(g, m));
      const b = 0.1,
        A = 0.4,
        N = 0.6;
      (_.gain.setValueAtTime(1e-4, m),
        _.gain.linearRampToValueAtTime(b, m + A),
        _.gain.setValueAtTime(b, m + p - N),
        _.gain.exponentialRampToValueAtTime(1e-4, m + p));
      const E = l.createDelay(0.5);
      E.delayTime.value = 0.25;
      const q = l.createGain();
      q.gain.value = 0.2;
      const $ = l.createBiquadFilter();
      (($.type = 'lowpass'),
        ($.frequency.value = 2e3),
        y.connect(_).connect(c),
        y.connect(E).connect($).connect(q).connect(c),
        y.start(m),
        y.stop(m + p + 0.5),
        r.push(y));
    }
  }
  for (let f = 0; f < gu.length; f++) {
    const d = s + f * Gs * 2;
    (la(l, c, 'sawtooth', gu[f], d, Gs * 1.5, 0.09, 1800, r),
      la(l, c, 'sine', gu[f] * 0.5, d + 0.12, Gs * 1.2, 0.05, 600, r));
  }
}
function Dg(l, c) {
  let s = 0,
    r = null;
  const f = [];
  function d() {
    const p = l.currentTime + Rg * Ys;
    for (; s < p; ) (Bg(l, c, s, f), (s += Zs));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (r = setInterval(() => {
          d();
        }, Og)));
    },
    stop() {
      r !== null && (clearInterval(r), (r = null));
      const m = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(m);
        } catch {}
      f.length = 0;
    },
  };
}
function Lg(l, c, s) {
  switch (l) {
    case 'title':
      return Dg(c, s);
    case 'base':
      return vg(c, s);
    case 'battleNormal':
      return Ng(c, s);
    case 'battleBoss':
      return jg(c, s);
  }
}
function $g(l, c) {
  const s = Math.max(1, Math.floor(l.sampleRate * c)),
    r = l.createBuffer(1, s, l.sampleRate),
    f = r.getChannelData(0);
  for (let d = 0; d < s; d++) f[d] = Math.random() * 2 - 1;
  return r;
}
function ha(l, c, s, r, f) {
  const d = l.gain;
  (d.setValueAtTime(1e-4, c),
    d.linearRampToValueAtTime(s, c + r),
    d.exponentialRampToValueAtTime(1e-4, c + r + f));
}
function yt(l, c, s, r, f, d, m, p, g) {
  const y = l.createOscillator(),
    _ = l.createGain();
  ((y.type = s),
    y.frequency.setValueAtTime(r, f),
    g !== void 0 && y.frequency.exponentialRampToValueAtTime(Math.max(1e-4, g), f + m + p),
    ha(_, f, d, m, p),
    y.connect(_).connect(c),
    y.start(f),
    y.stop(f + m + p + 0.02));
}
function pa(l, c, s, r, f, d) {
  const m = l.createBufferSource();
  m.buffer = $g(l, s);
  const p = l.createGain();
  if ((ha(p, r, f, 0.002, s), d)) {
    const g = l.createBiquadFilter();
    ((g.type = d.type),
      (g.frequency.value = d.frequency),
      d.q !== void 0 && (g.Q.value = d.q),
      m.connect(g).connect(p).connect(c));
  } else m.connect(p).connect(c);
  m.start(r);
}
const Hg = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createOscillator(),
      d = l.createGain();
    ((r.type = 'sawtooth'),
      (f.type = 'sawtooth'),
      r.frequency.setValueAtTime(900, s),
      r.frequency.exponentialRampToValueAtTime(1500, s + 0.5),
      f.frequency.setValueAtTime(905, s),
      f.frequency.exponentialRampToValueAtTime(1510, s + 0.5),
      ha(d, s, 0.28, 0.02, 0.5),
      r.connect(d),
      f.connect(d),
      d.connect(c),
      r.start(s),
      f.start(s),
      r.stop(s + 0.55),
      f.stop(s + 0.55));
  },
  Ug = (l, c, s) => {
    for (let r = 0; r < 4; r++) {
      const f = s + r * 0.12;
      (yt(l, c, 'sine', 110, f, 0.4, 0.005, 0.18, 35),
        pa(l, c, 0.08, f, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  qg = (l, c, s) => {
    (pa(l, c, 0.4, s, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      yt(l, c, 'triangle', 3e3, s, 0.25, 0.005, 0.15, 1500),
      yt(l, c, 'sawtooth', 200, s + 0.05, 0.18, 0.005, 0.3, 80));
  },
  kg = (l, c, s) => {
    for (let r = 0; r < 5; r++) {
      const f = s + r * 0.07,
        d = l.createOscillator(),
        m = l.createGain(),
        p = l.createBiquadFilter();
      ((d.type = 'square'),
        d.frequency.setValueAtTime(1100 + r * 60, f),
        d.frequency.exponentialRampToValueAtTime(1700 + r * 60, f + 0.04),
        (p.type = 'bandpass'),
        (p.frequency.value = 1600),
        (p.Q.value = 4),
        ha(m, f, 0.2, 0.002, 0.06),
        d.connect(p).connect(m).connect(c),
        d.start(f),
        d.stop(f + 0.08));
    }
  },
  Vg = (l, c, s) => {
    (pa(l, c, 0.1, s, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      yt(l, c, 'triangle', 500, s, 0.18, 0.003, 0.08, 200));
  },
  Gg = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain();
    ((r.type = 'sawtooth'),
      r.frequency.setValueAtTime(80, s),
      r.frequency.linearRampToValueAtTime(160, s + 0.8),
      ha(f, s, 0.3, 0.1, 0.7),
      r.connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.85),
      yt(l, c, 'square', 320, s + 0.2, 0.15, 0.02, 0.4));
  },
  Zg = (l, c, s) => {
    (pa(l, c, 0.5, s, 0.45, { type: 'lowpass', frequency: 1200 }),
      yt(l, c, 'sine', 90, s, 0.5, 0.005, 0.6, 30),
      yt(l, c, 'triangle', 1200, s + 0.1, 0.2, 0.02, 0.4, 2400),
      yt(l, c, 'triangle', 1600, s + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  Yg = (l, c, s) => {
    (yt(l, c, 'sine', 180, s, 0.3, 0.005, 0.12, 60),
      pa(l, c, 0.08, s, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  Xg = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain();
    ((r.type = 'sawtooth'),
      r.frequency.setValueAtTime(220, s),
      r.frequency.exponentialRampToValueAtTime(40, s + 1.2),
      ha(f, s, 0.45, 0.02, 1.2),
      r.connect(f).connect(c),
      r.start(s),
      r.stop(s + 1.3),
      pa(l, c, 0.8, s, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  Kg = (l, c, s) => {
    (yt(l, c, 'triangle', 700, s, 0.22, 0.01, 0.18),
      yt(l, c, 'triangle', 1050, s + 0.12, 0.22, 0.01, 0.22));
  },
  Qg = (l, c, s) => {
    (yt(l, c, 'triangle', 600, s, 0.25, 0.01, 0.2),
      yt(l, c, 'triangle', 900, s + 0.12, 0.25, 0.01, 0.2),
      yt(l, c, 'triangle', 1350, s + 0.24, 0.3, 0.01, 0.45),
      yt(l, c, 'sine', 2400, s + 0.3, 0.15, 0.02, 0.5));
  },
  Wg = (l, c, s) => {
    (yt(l, c, 'triangle', 600, s, 0.28, 0.01, 0.18),
      yt(l, c, 'triangle', 750, s + 0.12, 0.28, 0.01, 0.18),
      yt(l, c, 'triangle', 900, s + 0.24, 0.28, 0.01, 0.22),
      yt(l, c, 'triangle', 1200, s + 0.36, 0.32, 0.01, 0.5),
      yt(l, c, 'sine', 2400, s + 0.42, 0.18, 0.02, 0.6));
  },
  Jg = (l, c, s) => {
    (yt(l, c, 'sawtooth', 300, s, 0.3, 0.02, 0.4, 220),
      yt(l, c, 'sawtooth', 220, s + 0.35, 0.3, 0.02, 0.5, 160),
      yt(l, c, 'sawtooth', 160, s + 0.8, 0.3, 0.02, 0.7, 80),
      pa(l, c, 1, s, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  Fg = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain();
    ((r.type = 'triangle'),
      r.frequency.setValueAtTime(700, s),
      r.frequency.exponentialRampToValueAtTime(400, s + 0.4),
      ha(f, s, 0.22, 0.02, 0.4),
      r.connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.45),
      pa(l, c, 0.5, s, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  Ig = (l, c, s) => {
    yt(l, c, 'triangle', 1e3, s, 0.18, 0.003, 0.05);
  },
  Pg = (l, c, s) => {
    (yt(l, c, 'triangle', 880, s, 0.2, 0.005, 0.08),
      yt(l, c, 'triangle', 1320, s + 0.06, 0.2, 0.005, 0.12));
  },
  tv = (l, c, s) => {
    (yt(l, c, 'square', 260, s, 0.18, 0.005, 0.07),
      yt(l, c, 'square', 200, s + 0.06, 0.18, 0.005, 0.1));
  },
  ev = (l, c, s) => {
    yt(l, c, 'triangle', 1400, s, 0.12, 0.003, 0.04);
  },
  av = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain();
    ((r.type = 'triangle'),
      r.frequency.setValueAtTime(500, s),
      r.frequency.exponentialRampToValueAtTime(1e3, s + 0.12),
      ha(f, s, 0.18, 0.01, 0.12),
      r.connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.15));
  },
  nv = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain();
    ((r.type = 'triangle'),
      r.frequency.setValueAtTime(1e3, s),
      r.frequency.exponentialRampToValueAtTime(500, s + 0.1),
      ha(f, s, 0.16, 0.005, 0.1),
      r.connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.13));
  },
  lv = (l, c, s) => {
    (yt(l, c, 'sawtooth', 200, s, 0.3, 0.01, 0.35, 80),
      yt(l, c, 'triangle', 600, s + 0.05, 0.22, 0.01, 0.3, 1200),
      yt(l, c, 'triangle', 1200, s + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  iv = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((r.type = 'sawtooth'),
      r.frequency.setValueAtTime(1600, s),
      r.frequency.exponentialRampToValueAtTime(700, s + 0.08),
      (d.type = 'highpass'),
      (d.frequency.value = 800),
      ha(f, s, 0.22, 0.003, 0.09),
      r.connect(d).connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.12));
  },
  cv = (l, c, s) => {
    (yt(l, c, 'sine', 130, s, 0.5, 0.01, 0.28, 40),
      pa(l, c, 0.12, s, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  sv = (l, c, s) => {
    (pa(l, c, 0.18, s, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      yt(l, c, 'triangle', 2200, s, 0.15, 0.002, 0.06, 1800));
  },
  ov = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((r.type = 'square'),
      r.frequency.setValueAtTime(900, s),
      r.frequency.exponentialRampToValueAtTime(1400, s + 0.05),
      (d.type = 'bandpass'),
      (d.frequency.value = 1500),
      (d.Q.value = 3),
      ha(f, s, 0.18, 0.002, 0.07),
      r.connect(d).connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.1),
      pa(l, c, 0.05, s, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  rv = (l, c, s) => {
    (yt(l, c, 'triangle', 700, s, 0.18, 0.005, 0.05),
      yt(l, c, 'triangle', 1050, s + 0.04, 0.18, 0.005, 0.06));
  },
  uv = {
    laserShoot: iv,
    cannonShoot: cv,
    thunderShoot: sv,
    cutterShoot: ov,
    weaponSwitch: rv,
    activeLaser: Hg,
    activeCannon: Ug,
    activeThunder: qg,
    activeCutter: kg,
    enemyKill: Vg,
    bossWarn: Gg,
    bossKill: Zg,
    machineHit: Yg,
    machineDown: Xg,
    waveClear: Kg,
    tierClear: Qg,
    tap: Ig,
    purchaseOk: Pg,
    reject: tv,
    tabSwitch: ev,
    dialogOpen: av,
    dialogClose: nv,
    launch: lv,
    resultClear: Wg,
    resultGameOver: Jg,
    resultRetreat: Fg,
  },
  fv = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function mh(l) {
  return Math.max(0, Math.min(1, l));
}
class dv {
  constructor() {
    ra(this, 'ctx', null);
    ra(this, 'seGain', null);
    ra(this, 'bgmGain', null);
    ra(this, 'masterGain', null);
    ra(this, 'lastPlayAt', new Map());
    ra(this, 'seVolume', 0.7);
    ra(this, 'bgmVolume', 0.5);
    ra(this, 'currentBgm', null);
  }
  init() {
    if (this.ctx) return;
    const c = window.AudioContext ?? window.webkitAudioContext;
    if (!c) return;
    const s = new c();
    ((this.ctx = s),
      (this.masterGain = s.createGain()),
      (this.seGain = s.createGain()),
      (this.bgmGain = s.createGain()),
      this.seGain.connect(this.masterGain),
      this.bgmGain.connect(this.masterGain),
      this.masterGain.connect(s.destination),
      (this.masterGain.gain.value = 1),
      (this.seGain.gain.value = this.seVolume),
      (this.bgmGain.gain.value = this.bgmVolume));
  }
  play(c) {
    if (!this.ctx || !this.seGain) return;
    this.ctx.state === 'suspended' && this.ctx.resume();
    const s = performance.now(),
      r = fv[c];
    if (r !== void 0) {
      const d = this.lastPlayAt.get(c) ?? 0;
      if (s - d < r) return;
      this.lastPlayAt.set(c, s);
    }
    const f = uv[c];
    f(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(c) {
    ((this.seVolume = mh(c)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(c) {
    ((this.bgmVolume = mh(c)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
  }
  getSeVolume() {
    return this.seVolume;
  }
  getBgmVolume() {
    return this.bgmVolume;
  }
  playBgm(c) {
    var r;
    if (
      !this.ctx ||
      !this.bgmGain ||
      (this.ctx.state === 'suspended' && this.ctx.resume(),
      ((r = this.currentBgm) == null ? void 0 : r.id) === c)
    )
      return;
    this.currentBgm != null && (this.currentBgm.track.stop(), (this.currentBgm = null));
    const s = Lg(c, this.ctx, this.bgmGain);
    (s.start(), (this.currentBgm = { id: c, track: s }));
  }
  stopBgm() {
    var c;
    ((c = this.currentBgm) == null || c.track.stop(), (this.currentBgm = null));
  }
  getCurrentBgm() {
    var c;
    return ((c = this.currentBgm) == null ? void 0 : c.id) ?? null;
  }
  isInitialized() {
    return this.ctx !== null;
  }
  destroy() {
    (this.stopBgm(),
      this.ctx && (this.ctx.close(), (this.ctx = null)),
      (this.masterGain = null),
      (this.seGain = null),
      (this.bgmGain = null),
      this.lastPlayAt.clear());
  }
}
const Ht = new dv(),
  mv = '_content_11wqi_1',
  hv = { content: mv },
  pv = '_tabBar_rhd8d_2',
  yv = '_fullWidth_rhd8d_9',
  gv = '_tab_rhd8d_2',
  vv = '_tabActive_rhd8d_54',
  _v = '_tabDisabled_rhd8d_101',
  bv = '_tabIcon_rhd8d_107',
  Sv = '_tabLabel_rhd8d_114',
  xv = '_badge_rhd8d_119',
  jv = '_badgeActive_rhd8d_137',
  Tv = '_indicator_rhd8d_158',
  Ze = {
    tabBar: pv,
    fullWidth: yv,
    tab: gv,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: vv,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: _v,
    tabIcon: bv,
    tabLabel: Sv,
    badge: xv,
    badgeActive: jv,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Tv,
  },
  Av = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Ev = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Mv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  wv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Nv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  zv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Cv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Rv = { screw: zv, bolt: Ev, alloy: Av, laser: Nv, cannon: Mv, thunder: Cv, cutter: wv };
function Ov(l, c) {
  return l.replace(/\swidth="\d+"/, ` width="${c}"`).replace(/\sheight="\d+"/, ` height="${c}"`);
}
function kt({ name: l, size: c = 16, color: s = 'currentColor', className: r }) {
  const f = Rv[l];
  if (f)
    return u.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: r,
      style: { display: 'inline-flex', color: s, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: Ov(f, c) },
    });
  const d = {
    width: c,
    height: c,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: s,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    xmlns: 'http://www.w3.org/2000/svg',
    className: r,
    'aria-hidden': !0,
  };
  switch (l) {
    case 'close':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('line', { x1: '4', y1: '4', x2: '20', y2: '20' }),
          u.jsx('line', { x1: '20', y1: '4', x2: '4', y2: '20' }),
        ],
      });
    case 'menu':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('line', { x1: '3', y1: '7', x2: '21', y2: '7' }),
          u.jsx('line', { x1: '3', y1: '12', x2: '21', y2: '12' }),
          u.jsx('line', { x1: '3', y1: '17', x2: '21', y2: '17' }),
        ],
      });
    case 'settings':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('polygon', {
            points: '12,3 16,5 19,8 21,12 19,16 16,19 12,21 8,19 5,16 3,12 5,8 8,5',
            fill: s,
            fillOpacity: '0.15',
            stroke: s,
          }),
          u.jsx('circle', { cx: '12', cy: '12', r: '3.2' }),
        ],
      });
    case 'tower':
      return u.jsx('svg', {
        ...d,
        children: u.jsx('polygon', {
          points: '12,4 20,20 4,20',
          fill: s,
          stroke: s,
          strokeLinejoin: 'round',
        }),
      });
    case 'shield':
      return u.jsx('svg', {
        ...d,
        children: u.jsx('path', {
          d: 'M12 3 L20 6.5 V12 C20 16.5 16.5 19.5 12 21 C7.5 19.5 4 16.5 4 12 V6.5 Z',
        }),
      });
    case 'heart':
      return u.jsx('svg', {
        ...d,
        children: u.jsx('path', {
          d: 'M12 21 C12 21 4 14.5 4 9 C4 6.2 6.2 4 9 4 C10.4 4 11.7 4.6 12 5.5 C12.3 4.6 13.6 4 15 4 C17.8 4 20 6.2 20 9 C20 14.5 12 21 12 21Z',
        }),
      });
    case 'flame':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('path', {
            d: 'M12 2C12 2 7 8 7 13C7 15.8 9.2 18 12 18C14.8 18 17 15.8 17 13C17 8 12 2 12 2Z',
          }),
          u.jsx('path', {
            d: 'M12 12C12 12 10 14 10 15.5C10 16.3 10.9 17 12 17C13.1 17 14 16.3 14 15.5C14 14 12 12 12 12Z',
            fill: s,
            stroke: 'none',
          }),
        ],
      });
    case 'ice':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('line', { x1: '12', y1: '3', x2: '12', y2: '21' }),
          u.jsx('line', { x1: '3', y1: '7.5', x2: '21', y2: '16.5' }),
          u.jsx('line', { x1: '3', y1: '16.5', x2: '21', y2: '7.5' }),
          u.jsx('line', { x1: '9', y1: '3.5', x2: '12', y2: '8' }),
          u.jsx('line', { x1: '15', y1: '3.5', x2: '12', y2: '8' }),
          u.jsx('line', { x1: '9', y1: '20.5', x2: '12', y2: '16' }),
          u.jsx('line', { x1: '15', y1: '20.5', x2: '12', y2: '16' }),
        ],
      });
    case 'lightning':
      return u.jsx('svg', {
        ...d,
        children: u.jsx('polygon', {
          points: '13,3 6,13 11,13 11,21 18,11 13,11',
          fill: s,
          stroke: 'none',
        }),
      });
    case 'skull':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('circle', { cx: '12', cy: '10', r: '7' }),
          u.jsx('circle', { cx: '9.5', cy: '9.5', r: '1.5', fill: s, stroke: 'none' }),
          u.jsx('circle', { cx: '14.5', cy: '9.5', r: '1.5', fill: s, stroke: 'none' }),
          u.jsx('path', { d: 'M8 16 V21 M12 16 V21 M16 16 V21', strokeWidth: '2.5' }),
          u.jsx('rect', { x: '7', y: '16', width: '10', height: '1.5', fill: s, stroke: 'none' }),
        ],
      });
    case 'spark':
      return u.jsx('svg', {
        ...d,
        children: u.jsx('polygon', {
          points: '12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10',
          fill: s,
          stroke: 'none',
        }),
      });
    case 'target':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('circle', { cx: '12', cy: '12', r: '9' }),
          u.jsx('circle', { cx: '12', cy: '12', r: '5' }),
          u.jsx('circle', { cx: '12', cy: '12', r: '1.5', fill: s, stroke: 'none' }),
          u.jsx('line', { x1: '12', y1: '3', x2: '12', y2: '6' }),
          u.jsx('line', { x1: '12', y1: '18', x2: '12', y2: '21' }),
          u.jsx('line', { x1: '3', y1: '12', x2: '6', y2: '12' }),
          u.jsx('line', { x1: '18', y1: '12', x2: '21', y2: '12' }),
        ],
      });
    case 'play':
      return u.jsx('svg', {
        ...d,
        children: u.jsx('polygon', { points: '6,4 20,12 6,20', fill: s, stroke: 'none' }),
      });
    case 'pause':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('rect', { x: '5', y: '4', width: '5', height: '16', fill: s, stroke: 'none' }),
          u.jsx('rect', { x: '14', y: '4', width: '5', height: '16', fill: s, stroke: 'none' }),
        ],
      });
    case 'chevron-left':
      return u.jsx('svg', { ...d, children: u.jsx('polyline', { points: '15,5 9,12 15,19' }) });
    case 'chevron-right':
      return u.jsx('svg', { ...d, children: u.jsx('polyline', { points: '9,5 15,12 9,19' }) });
    case 'chevron-up':
      return u.jsx('svg', { ...d, children: u.jsx('polyline', { points: '5,15 12,9 19,15' }) });
    case 'chevron-down':
      return u.jsx('svg', { ...d, children: u.jsx('polyline', { points: '5,9 12,15 19,9' }) });
    case 'check':
      return u.jsx('svg', {
        ...d,
        children: u.jsx('polyline', { points: '4,12 9,17 20,6', strokeWidth: '2.5' }),
      });
    case 'plus':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('line', { x1: '12', y1: '4', x2: '12', y2: '20', strokeWidth: '2.5' }),
          u.jsx('line', { x1: '4', y1: '12', x2: '20', y2: '12', strokeWidth: '2.5' }),
        ],
      });
    case 'minus':
      return u.jsx('svg', {
        ...d,
        children: u.jsx('line', { x1: '4', y1: '12', x2: '20', y2: '12', strokeWidth: '2.5' }),
      });
    case 'info':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('circle', { cx: '12', cy: '12', r: '9' }),
          u.jsx('line', {
            x1: '12',
            y1: '8',
            x2: '12',
            y2: '8',
            strokeWidth: '2.5',
            strokeLinecap: 'round',
          }),
          u.jsx('line', { x1: '12', y1: '11', x2: '12', y2: '17', strokeWidth: '2' }),
        ],
      });
    case 'arrow-up':
      return u.jsxs('svg', {
        ...d,
        children: [
          u.jsx('line', { x1: '12', y1: '19', x2: '12', y2: '5', strokeWidth: '2' }),
          u.jsx('polyline', { points: '6,11 12,5 18,11', strokeWidth: '2' }),
        ],
      });
    default:
      return null;
  }
}
function Ks({
  tabs: l,
  value: c,
  onChange: s,
  variant: r = 'underline',
  size: f = 'md',
  fullWidth: d = !1,
  align: m = 'start',
}) {
  const p = V.useRef(null),
    [g, y] = V.useState({ left: 0, width: 0 });
  return (
    V.useEffect(() => {
      const _ = p.current;
      if (!_) return;
      const b = l.findIndex(($) => $.key === c);
      if (b < 0) return;
      const N = _.querySelectorAll('[role="tab"]')[b];
      if (!N) return;
      const E = _.getBoundingClientRect(),
        q = N.getBoundingClientRect();
      y({ left: q.left - E.left, width: q.width });
    }, [c, l]),
    u.jsxs('div', {
      ref: p,
      role: 'tablist',
      className: [
        Ze.tabBar,
        Ze[`variant-${r}`],
        Ze[`size-${f}`],
        Ze[`align-${m}`],
        d ? Ze.fullWidth : '',
      ]
        .filter(Boolean)
        .join(' '),
      children: [
        l.map((_) => {
          const b = _.key === c;
          return u.jsxs(
            'button',
            {
              type: 'button',
              role: 'tab',
              'aria-selected': b,
              disabled: _.disabled === !0,
              className: [Ze.tab, b ? Ze.tabActive : '', _.disabled === !0 ? Ze.tabDisabled : '']
                .filter(Boolean)
                .join(' '),
              onClick: () => {
                _.disabled !== !0 && s(_.key);
              },
              children: [
                _.iconName != null &&
                  u.jsx('span', {
                    className: Ze.tabIcon,
                    'aria-hidden': 'true',
                    children: u.jsx(kt, { name: _.iconName, size: f === 'sm' ? 12 : 14 }),
                  }),
                u.jsx('span', { className: Ze.tabLabel, children: _.label }),
                _.badge != null &&
                  u.jsx('span', {
                    className: [Ze.badge, b ? Ze.badgeActive : ''].filter(Boolean).join(' '),
                    children: _.badge,
                  }),
              ],
            },
            _.key
          );
        }),
        r === 'underline' &&
          u.jsx('span', {
            className: Ze.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${g.left}px)`, width: g.width },
          }),
      ],
    })
  );
}
const Bv = '_shell_ka520_6',
  Dv = '_header_ka520_19',
  Lv = '_main_ka520_32',
  $v = '_noScroll_ka520_43',
  Hv = '_footer_ka520_48',
  Uv = '_battle_ka520_61',
  ei = { shell: Bv, header: Dv, main: Lv, noScroll: $v, footer: Hv, battle: Uv };
function dl({ header: l, footer: c, children: s, noScroll: r = !1, variant: f = 'default' }) {
  return u.jsxs('div', {
    className: [ei.shell, f === 'battle' ? ei.battle : ''].filter(Boolean).join(' '),
    children: [
      l != null && u.jsx('header', { className: ei.header, children: l }),
      u.jsx('main', {
        className: [ei.main, r ? ei.noScroll : ''].filter(Boolean).join(' '),
        children: s,
      }),
      c != null && u.jsx('footer', { className: ei.footer, children: c }),
    ],
  });
}
const qv = '_nav_4erx0_2',
  kv = '_tab_4erx0_10',
  Vv = '_active_4erx0_33',
  Gv = '_iconWrap_4erx0_38',
  Zv = '_badge_4erx0_51',
  sc = { nav: qv, tab: kv, active: Vv, iconWrap: Gv, badge: Zv },
  Yv = '_text_1wy1n_1',
  Xv = '_variant_heading_1_1wy1n_6',
  Kv = '_variant_heading_2_1wy1n_15',
  Qv = '_variant_heading_3_1wy1n_24',
  Wv = '_variant_body_1wy1n_33',
  Jv = '_variant_caption_1wy1n_41',
  Fv = '_variant_label_1wy1n_49',
  Iv = '_variant_numeric_l_1wy1n_58',
  Pv = '_variant_numeric_m_1wy1n_67',
  t_ = '_variant_numeric_s_1wy1n_76',
  e_ = '_color_default_1wy1n_85',
  a_ = '_color_mid_1wy1n_89',
  n_ = '_color_dim_1wy1n_93',
  l_ = '_color_disabled_1wy1n_97',
  i_ = '_color_primary_1wy1n_101',
  c_ = '_color_secondary_1wy1n_105',
  s_ = '_color_danger_1wy1n_109',
  o_ = '_color_success_1wy1n_113',
  r_ = '_color_warning_1wy1n_117',
  u_ = '_truncate_1wy1n_121',
  f_ = '_align_left_1wy1n_128',
  d_ = '_align_center_1wy1n_132',
  m_ = '_align_right_1wy1n_136',
  oc = {
    text: Yv,
    variant_heading_1: Xv,
    variant_heading_2: Kv,
    variant_heading_3: Qv,
    variant_body: Wv,
    variant_caption: Jv,
    variant_label: Fv,
    variant_numeric_l: Iv,
    variant_numeric_m: Pv,
    variant_numeric_s: t_,
    color_default: e_,
    color_mid: a_,
    color_dim: n_,
    color_disabled: l_,
    color_primary: i_,
    color_secondary: c_,
    color_danger: s_,
    color_success: o_,
    color_warning: r_,
    truncate: u_,
    align_left: f_,
    align_center: d_,
    align_right: m_,
  };
function h_(l) {
  switch (l) {
    case 'heading-1':
      return 'h1';
    case 'heading-2':
      return 'h2';
    case 'heading-3':
      return 'h3';
    case 'body':
    case 'caption':
    case 'numeric-l':
    case 'numeric-m':
    case 'numeric-s':
      return 'span';
    case 'label':
      return 'span';
    default:
      return 'span';
  }
}
function Z({
  variant: l = 'body',
  children: c,
  as: s,
  color: r = 'default',
  className: f,
  truncate: d,
  align: m,
  style: p,
}) {
  const g = s ?? h_(l),
    y = l.replace(/-/g, '_'),
    _ = r === 'text' ? 'default' : r;
  return u.jsx(g, {
    className: [
      oc.text,
      oc[`variant_${y}`],
      oc[`color_${_}`],
      d ? oc.truncate : '',
      m ? oc[`align_${m}`] : '',
      f,
    ]
      .filter(Boolean)
      .join(' '),
    style: p,
    children: c,
  });
}
const p_ = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function jc({ active: l, onChange: c, badges: s }) {
  return u.jsx('nav', {
    className: sc.nav,
    'aria-label': 'メインナビゲーション',
    children: p_.map(({ key: r, label: f, iconName: d }) => {
      const m = r === l,
        p = s == null ? void 0 : s[r];
      return u.jsxs(
        'button',
        {
          type: 'button',
          className: [sc.tab, m ? sc.active : ''].filter(Boolean).join(' '),
          onClick: () => c(r),
          'aria-current': m ? 'page' : void 0,
          'aria-label': f,
          children: [
            u.jsxs('span', {
              className: sc.iconWrap,
              children: [
                u.jsx(kt, {
                  name: d,
                  size: 22,
                  color: m ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                p != null &&
                  u.jsx('span', { className: sc.badge, 'aria-hidden': 'true', children: p }),
              ],
            }),
            u.jsx(Z, { variant: 'caption', color: m ? 'primary' : 'dim', children: f }),
          ],
        },
        r
      );
    }),
  });
}
const y_ = '_root_kv5uk_2',
  g_ = '_titleRow_kv5uk_8',
  v_ = '_left_kv5uk_17',
  __ = '_center_kv5uk_24',
  b_ = '_right_kv5uk_33',
  S_ = '_currencies_kv5uk_42',
  x_ = '_actions_kv5uk_49',
  j_ = '_tabBarSlot_kv5uk_56',
  Tn = {
    root: y_,
    titleRow: g_,
    left: v_,
    center: __,
    right: b_,
    currencies: S_,
    actions: x_,
    tabBarSlot: j_,
  },
  T_ = '_root_i843c_2',
  A_ = '_icon_i843c_10',
  E_ = '_delta_i843c_30',
  M_ = '_deltaSm_i843c_37',
  w_ = '_deltaMd_i843c_41',
  N_ = '_deltaLg_i843c_45',
  z_ = '_subtle_i843c_50',
  C_ = '_currencyLabel_i843c_55',
  R_ = '_rankStamp_i843c_64',
  Ta = {
    root: T_,
    icon: A_,
    delta: E_,
    deltaSm: M_,
    deltaMd: w_,
    deltaLg: N_,
    subtle: z_,
    currencyLabel: C_,
    rankStamp: R_,
  },
  O_ = '_root_1wxcz_1',
  B_ = '_sizeSm_1wxcz_13',
  D_ = '_sizeMd_1wxcz_17',
  L_ = '_sizeLg_1wxcz_21',
  $_ = '_sizeXl_1wxcz_25',
  H_ = '_affix_1wxcz_29',
  al = { root: O_, sizeSm: B_, sizeMd: D_, sizeLg: L_, sizeXl: $_, affix: H_ };
function wu(l) {
  let c = l.length;
  for (; c > 0 && l[c - 1] === 0; ) c--;
  return l.slice(0, c);
}
function rc(l) {
  let c = 0;
  for (let s = 0; s < l.length; s++) {
    const r = Math.floor(l[s] + c);
    ((l[s] = r % 1e3), (c = Math.floor(r / 1e3)));
  }
  for (; c > 0; ) (l.push(c % 1e3), (c = Math.floor(c / 1e3)));
  return wu(l);
}
function U_(l, c) {
  for (; c !== 0; ) {
    const s = c;
    ((c = l % c), (l = s));
  }
  return l;
}
function q_(l) {
  const c = l.toString(),
    s = c.indexOf('.');
  if (s === -1) return { num: Math.round(l), den: 1 };
  const r = c.length - s - 1,
    f = Math.pow(10, r),
    d = Math.round(l * f),
    m = U_(Math.abs(d), f);
  return { num: d / m, den: f / m };
}
function k_(l) {
  let c = '',
    s = l;
  for (; s > 0; )
    ((s -= 1), (c = String.fromCharCode(65 + (s % 26)) + c), (s = Math.floor(s / 26)));
  return c;
}
const Te = class Te {
  constructor(c) {
    ra(this, 'digits');
    this.digits = c;
  }
  static fromNumber(c) {
    if (c <= 0) return Te.ZERO;
    const s = [];
    let r = Math.floor(c);
    for (; r > 0; ) (s.push(r % 1e3), (r = Math.floor(r / 1e3)));
    return new Te(wu(s));
  }
  static fromString(c) {
    const s = c.trim();
    if (s === '' || s === '0') return Te.ZERO;
    const r = [];
    let f = s.length;
    for (; f > 0; ) {
      const d = Math.max(0, f - 3);
      (r.push(parseInt(s.slice(d, f), 10)), (f = d));
    }
    return new Te(wu(r));
  }
  static fromJSON(c) {
    return new Te(rc([...c]));
  }
  add(c) {
    const s = this.digits,
      r = c.digits,
      f = Math.max(s.length, r.length),
      d = new Array(f).fill(0);
    let m = 0;
    for (let p = 0; p < f; p++) {
      const g = (s[p] ?? 0) + (r[p] ?? 0) + m;
      ((d[p] = g % 1e3), (m = Math.floor(g / 1e3)));
    }
    return (m > 0 && d.push(m), new Te(rc(d)));
  }
  sub(c) {
    if (this.compare(c) <= 0) return Te.ZERO;
    const s = this.digits,
      r = c.digits,
      f = new Array(s.length).fill(0);
    let d = 0;
    for (let m = 0; m < s.length; m++) {
      let p = (s[m] ?? 0) - (r[m] ?? 0) - d;
      (p < 0 ? ((p += 1e3), (d = 1)) : (d = 0), (f[m] = p));
    }
    return new Te(rc(f));
  }
  mulInt(c) {
    if (c <= 0 || this.isZero()) return Te.ZERO;
    const s = this.digits,
      r = new Array(s.length).fill(0);
    let f = 0;
    for (let d = 0; d < s.length; d++) {
      const m = s[d] * c + f;
      ((r[d] = m % 1e3), (f = Math.floor(m / 1e3)));
    }
    for (; f > 0; ) (r.push(f % 1e3), (f = Math.floor(f / 1e3)));
    return new Te(rc(r));
  }
  divInt(c) {
    if (c <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return Te.ZERO;
    const s = this.digits,
      r = new Array(s.length).fill(0);
    let f = 0;
    for (let d = s.length - 1; d >= 0; d--) {
      const m = f * 1e3 + (s[d] ?? 0);
      ((r[d] = Math.floor(m / c)), (f = m % c));
    }
    return (f > 0 && (r[0] += 1), new Te(rc(r)));
  }
  mulRational(c, s) {
    return this.mulInt(c).divInt(s);
  }
  mulNumber(c) {
    const { num: s, den: r } = q_(c);
    return this.mulRational(s, r);
  }
  compare(c) {
    const s = this.digits,
      r = c.digits;
    if (s.length !== r.length) return s.length < r.length ? -1 : 1;
    for (let f = s.length - 1; f >= 0; f--) {
      const d = s[f] ?? 0,
        m = r[f] ?? 0;
      if (d < m) return -1;
      if (d > m) return 1;
    }
    return 0;
  }
  eq(c) {
    return this.compare(c) === 0;
  }
  lt(c) {
    return this.compare(c) === -1;
  }
  gt(c) {
    return this.compare(c) === 1;
  }
  lte(c) {
    return this.compare(c) <= 0;
  }
  gte(c) {
    return this.compare(c) >= 0;
  }
  isZero() {
    return this.digits.length === 0;
  }
  toJSON() {
    return [...this.digits];
  }
  toString() {
    if (this.digits.length === 0) return '0';
    const c = this.digits.length;
    let s = String(this.digits[c - 1]);
    for (let r = c - 2; r >= 0; r--) s += String(this.digits[r]).padStart(3, '0');
    return s;
  }
  toDisplay() {
    if (this.digits.length === 0) return '0';
    const c = this.digits.length,
      s = this.digits[c - 1];
    if (c === 1) return String(s);
    const r = c - 1,
      f = k_(r),
      d = this.digits[c - 2] ?? 0,
      m = Math.floor(d / 10);
    return `${s}.${String(m).padStart(2, '0')}${f}`;
  }
};
ra(Te, 'ZERO', new Te([]));
let Q = Te;
function V_(l) {
  if (l === '') return 0;
  let c = 0;
  for (let s = 0; s < l.length; s++) c = c * 26 + (l.charCodeAt(s) - 65 + 1);
  return c;
}
function G_(l) {
  if (l <= 0) return { color: 'var(--c-text)', glow: '0 0 6px rgba(232,239,255,0.35)' };
  const c = Math.min(1, (l - 1) / 19),
    s = 195 + c * 100,
    r = 0.86 - c * 0.14,
    f = 0.13 + c * 0.07,
    d = `oklch(${r.toFixed(3)} ${f.toFixed(3)} ${s.toFixed(1)})`,
    m = Math.min(0.95, r + 0.05),
    p = f + 0.05,
    g = `oklch(${m.toFixed(3)} ${p.toFixed(3)} ${s.toFixed(1)} / 0.55)`;
  return { color: d, glow: `0 0 8px ${g}` };
}
function Z_(l) {
  switch (l) {
    case 'text':
      return 'var(--c-text)';
    case 'primary':
      return 'var(--c-primary)';
    case 'secondary':
      return 'var(--c-secondary)';
    case 'danger':
      return 'var(--c-danger)';
    case 'success':
      return 'var(--c-success)';
    case 'warning':
      return 'var(--c-warning)';
    case 'dim':
      return 'var(--c-text-dim)';
  }
}
function Y_(l) {
  switch (l) {
    case 'text':
      return '0 0 6px rgba(232,239,255,0.35)';
    case 'primary':
      return 'var(--glow-cyan-md)';
    case 'secondary':
      return 'var(--glow-purple-md)';
    case 'danger':
      return 'var(--glow-danger-md)';
    case 'success':
      return 'var(--glow-success-md)';
    case 'warning':
      return '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)';
    case 'dim':
      return;
  }
}
function Cn({
  value: l,
  size: c = 'md',
  accentColor: s = 'scale',
  glow: r = !1,
  prefix: f,
  suffix: d,
  decimals: m,
  style: p,
}) {
  const g = typeof l == 'number' ? Q.fromNumber(l) : l;
  let y;
  m != null && typeof l == 'number' ? (y = l.toFixed(m)) : (y = g.toDisplay());
  const _ = y.match(/^[\d.]+([A-Z]*)$/),
    b = _ ? _[1] : '',
    A = V_(b);
  let N, E;
  if (s === 'scale') {
    const J = G_(A);
    ((N = J.color), (E = r ? J.glow : void 0));
  } else ((N = Z_(s)), (E = r ? Y_(s) : void 0));
  const q = { sm: al.sizeSm, md: al.sizeMd, lg: al.sizeLg, xl: al.sizeXl }[c],
    $ = { color: N, ...(E != null ? { textShadow: E } : {}), ...p };
  return u.jsxs('span', {
    className: `${al.root} ${q}`,
    style: $,
    children: [
      f != null && u.jsx('span', { className: al.affix, children: f }),
      y,
      d != null && u.jsx('span', { className: al.affix, children: d }),
    ],
  });
}
const X_ = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  K_ = { sm: 12, md: 16, lg: 22, xl: 28 };
function Q_({ delta: l, sizeClass: c }) {
  const s = l === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return u.jsx('span', {
    className: `${Ta.delta} ${c}`,
    style: { color: s },
    'aria-hidden': 'true',
    children: l,
  });
}
function ui({
  currency: l,
  value: c,
  size: s = 'md',
  delta: r,
  showLabel: f,
  subtle: d,
  align: m = 'start',
  ranked: p,
}) {
  const g = typeof c == 'number' ? Q.fromNumber(c) : c,
    y = X_[l],
    _ = d ? 'var(--c-text-disabled)' : `var(${y.cssVar})`,
    b = r && !d ? { color: r === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: _ },
    A = { sm: Ta.deltaSm, md: Ta.deltaMd, lg: Ta.deltaLg, xl: Ta.deltaLg }[s],
    N = u.jsx(kt, { name: l, size: K_[s], color: _, className: Ta.icon }),
    E = u.jsxs(u.Fragment, {
      children: [
        r !== void 0 && !d && u.jsx(Q_, { delta: r, sizeClass: A }),
        u.jsx(Cn, { value: g, size: s, accentColor: 'primary', style: b }),
      ],
    });
  return u.jsxs('span', {
    className: [Ta.root, d ? Ta.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${y.label} ${g.toDisplay()}`,
    children: [
      m === 'end'
        ? u.jsxs(u.Fragment, { children: [E, N] })
        : u.jsxs(u.Fragment, { children: [N, E] }),
      f && u.jsx('span', { className: Ta.currencyLabel, 'aria-hidden': 'true', children: y.label }),
      p !== void 0 &&
        p !== '' &&
        u.jsx('span', {
          className: Ta.rankStamp,
          'data-rank': p,
          'aria-label': `rank ${p}`,
          children: p,
        }),
    ],
  });
}
const W_ = '_iconButton_1fyi8_1',
  J_ = '_round_1fyi8_23',
  F_ = '_active_1fyi8_85',
  I_ = '_iconWrap_1fyi8_113',
  ai = {
    iconButton: W_,
    round: J_,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: F_,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: I_,
  },
  P_ = { sm: 14, md: 18, lg: 22 };
function _c({
  icon: l,
  label: c,
  size: s = 'md',
  variant: r = 'ghost',
  shape: f = 'square',
  active: d = !1,
  disabled: m = !1,
  onClick: p,
}) {
  const g = r === 'default' ? 'ghost' : r,
    y = typeof l == 'string' ? u.jsx(kt, { name: l, size: P_[s] }) : l;
  return u.jsx('button', {
    type: 'button',
    className: [
      ai.iconButton,
      ai[`variant-${g}`],
      ai[`size-${s}`],
      f === 'round' ? ai.round : '',
      d ? ai.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: m,
    onClick: p,
    'aria-label': c,
    'aria-pressed': d,
    'aria-disabled': m,
    children: u.jsx('span', { className: ai.iconWrap, 'aria-hidden': 'true', children: y }),
  });
}
const hh = (l) => {
    let c;
    const s = new Set(),
      r = (y, _) => {
        const b = typeof y == 'function' ? y(c) : y;
        if (!Object.is(b, c)) {
          const A = c;
          ((c = (_ ?? (typeof b != 'object' || b === null)) ? b : Object.assign({}, c, b)),
            s.forEach((N) => N(c, A)));
        }
      },
      f = () => c,
      p = {
        setState: r,
        getState: f,
        getInitialState: () => g,
        subscribe: (y) => (s.add(y), () => s.delete(y)),
      },
      g = (c = l(r, f, p));
    return p;
  },
  tb = (l) => (l ? hh(l) : hh),
  eb = (l) => l;
function ab(l, c = eb) {
  const s = Hs.useSyncExternalStore(
    l.subscribe,
    Hs.useCallback(() => c(l.getState()), [l, c]),
    Hs.useCallback(() => c(l.getInitialState()), [l, c])
  );
  return (Hs.useDebugValue(s), s);
}
const nb = (l) => {
    const c = tb(l),
      s = (r) => ab(c, r);
    return (Object.assign(s, c), s);
  },
  lb = (l) => nb,
  Jh = [
    { key: 'attackMul', title: '攻撃力倍率', iconName: 'laser', baseCost: 10, costGrowth: 1.3 },
    {
      key: 'attackSpeedMul',
      title: '攻撃速度倍率',
      iconName: 'lightning',
      baseCost: 10,
      costGrowth: 1.3,
    },
    { key: 'hpMul', title: 'HP 倍率', iconName: 'heart', baseCost: 10, costGrowth: 1.3 },
    {
      key: 'screwGainMul',
      title: 'ネジ獲得倍率',
      iconName: 'screw',
      baseCost: 50,
      costGrowth: 1.4,
    },
  ];
function Zu(l, c) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, c));
}
function rl(l) {
  return 1 + 0.1 * l;
}
function Fh(l, c, s) {
  let r = 0;
  for (let f = 0; f < s; f++) r += Zu(l, c + f);
  return r;
}
function Ih(l, c, s) {
  let r = Q.ZERO,
    f = 0;
  for (;;) {
    const d = Q.fromNumber(Zu(l, c + f)),
      m = r.add(d);
    if (m.gt(s) || ((r = m), f++, f >= 1e4)) break;
  }
  return { lvDelta: f, totalCost: r };
}
const ph = {
  isRunActive: !1,
  screw: Q.ZERO,
  machineHp: Q.ZERO,
  machineMaxHp: Q.ZERO,
  baseMachineMaxHp: Q.ZERO,
  currentTier: 1,
  currentWave: 1,
  currentWeapon: 'laser',
  weaponSwitchCdSec: 0,
  activeCdSec: 0,
  isAutoActive: !1,
  isPaused: !1,
  runStartBolt: Q.ZERO,
  runStartAlloy: Q.ZERO,
};
function ib(l, c, s) {
  return l.lt(c) ? c : l.gt(s) ? s : l;
}
const cb = (l, c) => ({
    ...ph,
    startRun: ({ initialWeapon: s, baseMachineMaxHp: r }) => {
      const f = c().runWorkshopLevels.hpMul,
        d = rl(f),
        m = r.mulNumber(d),
        p = c();
      (l({
        isRunActive: !0,
        screw: Q.ZERO,
        machineHp: m,
        machineMaxHp: m,
        baseMachineMaxHp: r,
        currentTier: 1,
        currentWave: 1,
        currentWeapon: s,
        weaponSwitchCdSec: 0,
        activeCdSec: 0,
        isAutoActive: !1,
        isPaused: !1,
        runStartBolt: p.bolt,
        runStartAlloy: p.alloy,
      }),
        c().resetRunWorkshop());
    },
    endRun: () => {
      (l(ph), c().resetRunWorkshop());
    },
    addScrew: (s) => l((r) => ({ screw: r.screw.add(s) })),
    spendScrew: (s) => {
      const r = c().screw;
      return r.lt(s) ? !1 : (l({ screw: r.sub(s) }), !0);
    },
    setMachineHp: (s) => l((r) => ({ machineHp: ib(s, Q.ZERO, r.machineMaxHp) })),
    damageHp: (s) =>
      l((r) => {
        const f = r.machineHp.sub(s);
        return { machineHp: f.lt(Q.ZERO) ? Q.ZERO : f };
      }),
    recalcMachineMaxHpFromHpMul: (s) => {
      const r = c(),
        f = r.machineMaxHp,
        d = r.machineHp,
        m = f.sub(d),
        p = m.lt(Q.ZERO) ? Q.ZERO : m,
        g = r.baseMachineMaxHp.mulNumber(rl(s)),
        y = g.sub(p),
        _ = y.lt(Q.ZERO) ? Q.ZERO : y;
      l({ machineMaxHp: g, machineHp: _ });
    },
    advanceWave: () => l((s) => ({ currentWave: s.currentWave + 1 })),
    advanceTier: () => l((s) => ({ currentTier: s.currentTier + 1, currentWave: 1 })),
    switchWeapon: (s) => l({ currentWeapon: s }),
    setWeaponSwitchCd: (s) => l({ weaponSwitchCdSec: Math.max(0, s) }),
    setActiveCd: (s) => l({ activeCdSec: Math.max(0, s) }),
    setAutoActive: (s) => l({ isAutoActive: s }),
    setPaused: (s) => l({ isPaused: s }),
    triggerActive: (s) => (c().activeCdSec > 0 ? !1 : (l({ activeCdSec: Math.max(0, s) }), !0)),
    tickCooldowns: (s) =>
      l((r) => ({
        weaponSwitchCdSec: Math.max(0, r.weaponSwitchCdSec - s),
        activeCdSec: Math.max(0, r.activeCdSec - s),
      })),
  }),
  sb = { bolt: Q.ZERO, alloy: Q.ZERO },
  ob = (l, c) => ({
    ...sb,
    addBolt: (s) => l((r) => ({ bolt: r.bolt.add(s) })),
    spendBolt: (s) => {
      const r = c().bolt;
      return r.lt(s) ? !1 : (l({ bolt: r.sub(s) }), !0);
    },
    addAlloy: (s) => l((r) => ({ alloy: r.alloy.add(s) })),
    spendAlloy: (s) => {
      const r = c().alloy;
      return r.lt(s) ? !1 : (l({ alloy: r.sub(s) }), !0);
    },
    resetCurrencies: () => l({ bolt: Q.ZERO, alloy: Q.ZERO }),
  }),
  ri = 6,
  rb = { equippedPatches: new Map() },
  ub = (l, c) => ({
    ...rb,
    equipPatch: (s, r, f) => {
      const d = c().equippedPatches;
      for (const [m, p] of d) if (p.name === r && m !== s) return !1;
      return (
        l((m) => {
          const p = new Map(m.equippedPatches);
          return (p.set(s, { name: r, tier: f }), { equippedPatches: p });
        }),
        !0
      );
    },
    unequipPatch: (s) => {
      l((r) => {
        const f = new Map(r.equippedPatches);
        return (f.delete(s), { equippedPatches: f });
      });
    },
    clearEquippedPatches: () => l({ equippedPatches: new Map() }),
  }),
  Ph = 'tower-like-game',
  Xs = 1,
  F = {
    profile: 'profile',
    currencies: 'currencies',
    machine: 'machine',
    weapons: 'weapons',
    patches: 'patches',
    equippedPatches: 'equippedPatches',
    settings: 'settings',
  },
  Qs = [
    'maxHp',
    'hpRegen',
    'damageReduction',
    'defense',
    'baseAttack',
    'attackSpeed',
    'range',
    'critRate',
    'critMultiplier',
    'activePower',
    'activeCdReduction',
    'screwGain',
    'boltGain',
    'alloyGain',
    'patchDropRate',
    'patchSlots',
  ],
  t1 = {
    id: 'singleton',
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    schemaVersion: Xs,
  },
  e1 = { id: 'singleton', bolt: [], alloy: [] },
  a1 = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  n1 = { id: 'singleton', bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 };
function l1() {
  return Object.fromEntries(Qs.map((l) => [l, 0]));
}
const fb = { machineLevels: l1() },
  db = (l) => ({
    ...fb,
    incrementMachineLv: (c) =>
      l((s) => ({ machineLevels: { ...s.machineLevels, [c]: s.machineLevels[c] + 1 } })),
    setMachineLv: (c, s) => l((r) => ({ machineLevels: { ...r.machineLevels, [c]: s } })),
    resetMachine: () => l({ machineLevels: l1() }),
  });
function Nu(l, c) {
  return `${l}#${c}`;
}
const mb = { patches: new Map() },
  hb = (l, c) => ({
    ...mb,
    addPatch: (s, r, f = 1) => {
      const d = Nu(s, r);
      l((m) => {
        const p = new Map(m.patches),
          g = p.get(d);
        return (
          g ? p.set(d, { ...g, count: g.count + f }) : p.set(d, { name: s, tier: r, count: f }),
          { patches: p }
        );
      });
    },
    consumePatch: (s, r, f = 1) => {
      const d = Nu(s, r),
        m = c().patches.get(d);
      return !m || m.count < f
        ? !1
        : (l((p) => {
            const g = new Map(p.patches),
              y = g.get(d);
            if (!y) return {};
            const _ = y.count - f;
            return (_ <= 0 ? g.delete(d) : g.set(d, { ...y, count: _ }), { patches: g });
          }),
          !0);
    },
    pruneEmptyPatches: () => {
      l((s) => {
        const r = new Map(s.patches);
        for (const [f, d] of r) d.count <= 0 && r.delete(f);
        return { patches: r };
      });
    },
    resetPatches: () => l({ patches: new Map() }),
  }),
  yh = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  pb = (l) => ({
    ...yh,
    updateHighest: (c, s) =>
      l((r) =>
        c > r.highestTier
          ? { highestTier: c, highestWave: s }
          : c === r.highestTier
            ? { highestWave: Math.max(r.highestWave, s) }
            : {}
      ),
    addPlayTimeSec: (c) => l((s) => ({ totalPlayTimeSec: s.totalPlayTimeSec + c })),
    incrementRuns: () => l((c) => ({ totalRuns: c.totalRuns + 1 })),
    addEnemiesKilled: (c) => l((s) => ({ totalEnemiesKilled: s.totalEnemiesKilled + c })),
    setLastPlayedAt: (c) => l({ lastPlayedAt: c }),
    resetProfile: (c) => l({ ...yh, createdAt: c, lastPlayedAt: c }),
  }),
  i1 = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
  yb = { runWorkshopLevels: i1 },
  gb = (l, c) => ({
    ...yb,
    upgradeRunWorkshop: (s, r) => {
      const f = Jh.find((_) => _.key === s);
      if (f == null) return !1;
      const d = c().runWorkshopLevels[s];
      let m, p;
      if (r === 'max') {
        const _ = Ih(f, d, c().screw);
        if (_.lvDelta === 0) return !1;
        ((m = _.lvDelta), (p = _.totalCost));
      } else ((m = r), (p = Q.fromNumber(Fh(f, d, r))));
      if (!c().spendScrew(p)) return !1;
      const y = d + m;
      return (
        l((_) => ({ runWorkshopLevels: { ..._.runWorkshopLevels, [s]: y } })),
        s === 'hpMul' && c().recalcMachineMaxHpFromHpMul(y),
        !0
      );
    },
    resetRunWorkshop: () => l({ runWorkshopLevels: i1 }),
  }),
  gh = { bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  vb = (l) => ({
    ...gh,
    setBgmVolume: (c) => l({ bgmVolume: Math.max(0, Math.min(1, c)) }),
    setSeVolume: (c) => l({ seVolume: Math.max(0, Math.min(1, c)) }),
    setVibrationEnabled: (c) => l({ vibrationEnabled: c }),
    resetSettings: () => l(gh),
  }),
  vh = { weaponLv: 0, initialWeapon: 'laser' },
  _b = (l) => ({
    ...vh,
    incrementWeaponLv: () => l((c) => ({ weaponLv: c.weaponLv + 1 })),
    setWeaponLv: (c) => l({ weaponLv: c }),
    setInitialWeapon: (c) => l({ initialWeapon: c }),
    resetWeapons: () => l(vh),
  }),
  G = lb()((...l) => ({
    ...pb(...l),
    ...ob(...l),
    ...db(...l),
    ..._b(...l),
    ...hb(...l),
    ...ub(...l),
    ...vb(...l),
    ...cb(...l),
    ...gb(...l),
  }));
function Tc({ title: l, subtitle: c, onBack: s, currencies: r, tabBar: f, actions: d }) {
  const m = G((A) => A.bolt),
    p = G((A) => A.alloy),
    g = G((A) => A.screw),
    y = G((A) => A.isRunActive),
    _ = (r ?? []).filter((A) => (A === 'screw' ? y : !0));
  function b(A) {
    switch (A) {
      case 'bolt':
        return m;
      case 'alloy':
        return p;
      case 'screw':
        return g;
    }
  }
  return u.jsxs('div', {
    className: Tn.root,
    children: [
      u.jsxs('div', {
        className: Tn.titleRow,
        children: [
          u.jsx('div', {
            className: Tn.left,
            children:
              s != null &&
              u.jsx(_c, {
                icon: 'chevron-left',
                label: '戻る',
                variant: 'ghost',
                size: 'md',
                onClick: s,
              }),
          }),
          u.jsxs('div', {
            className: Tn.center,
            children: [
              u.jsx(Z, { variant: 'heading-3', truncate: !0, align: 'center', children: l }),
              c != null &&
                u.jsx(Z, { variant: 'caption', color: 'dim', align: 'center', children: c }),
            ],
          }),
          u.jsxs('div', {
            className: Tn.right,
            children: [
              _.length > 0 &&
                u.jsx('div', {
                  className: Tn.currencies,
                  children: _.map((A) => u.jsx(ui, { currency: A, value: b(A), size: 'sm' }, A)),
                }),
              d != null && u.jsx('div', { className: Tn.actions, children: d }),
            ],
          }),
        ],
      }),
      f != null && u.jsx('div', { className: Tn.tabBarSlot, children: f }),
    ],
  });
}
const bb = '_tab_1nc83_3',
  Sb = { tab: bb },
  xb = '_wrapper_1opqp_3',
  jb = '_active_1opqp_12',
  Tb = '_card_1opqp_12',
  Ab = '_locked_1opqp_18',
  Eb = '_tall_1opqp_34',
  Mb = '_iconTile_1opqp_37',
  wb = '_headerText_1opqp_42',
  Nb = '_description_1opqp_45',
  zb = '_name_1opqp_48',
  Cb = '_wide_1opqp_53',
  Rb = '_body_1opqp_61',
  Ob = '_header_1opqp_42',
  Bb = '_statGrid_1opqp_121',
  Db = '_statChip_1opqp_129',
  Lb = '_statLabel_1opqp_140',
  $b = '_statValue_1opqp_147',
  Hb = '_lockedBadge_1opqp_158',
  Se = {
    wrapper: xb,
    active: jb,
    card: Tb,
    locked: Ab,
    tall: Eb,
    iconTile: Mb,
    headerText: wb,
    description: Nb,
    name: zb,
    wide: Cb,
    body: Rb,
    header: Ob,
    statGrid: Bb,
    statChip: Db,
    statLabel: Lb,
    statValue: $b,
    lockedBadge: Hb,
  },
  Ub = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function c1({
  weapon: l,
  name: c,
  description: s,
  stats: r,
  layout: f = 'tall',
  active: d = !1,
  locked: m = !1,
  onClick: p,
}) {
  const g = f === 'wide',
    y = p != null && !m;
  return u.jsx('div', {
    className: [Se.wrapper, d ? Se.active : '', m ? Se.locked : '', g ? Se.wide : Se.tall]
      .filter(Boolean)
      .join(' '),
    onClick: y ? p : void 0,
    role: y ? 'button' : void 0,
    tabIndex: y ? 0 : void 0,
    onKeyDown: y
      ? (_) => {
          (_.key === 'Enter' || _.key === ' ') && (_.preventDefault(), p());
        }
      : void 0,
    'aria-pressed': p != null ? d : void 0,
    children: u.jsxs('div', {
      className: Se.card,
      style: y ? { cursor: 'pointer' } : void 0,
      children: [
        u.jsx('div', {
          className: Se.iconTile,
          'aria-hidden': !0,
          children: u.jsx(kt, { name: l, size: g ? 40 : 52 }),
        }),
        u.jsxs('div', {
          className: Se.body,
          children: [
            u.jsx('div', {
              className: Se.header,
              children: u.jsxs('div', {
                className: Se.headerText,
                children: [
                  u.jsx('span', { className: Se.name, children: c }),
                  s != null &&
                    s.length > 0 &&
                    u.jsx('span', { className: Se.description, children: s }),
                ],
              }),
            }),
            !m &&
              r.length > 0 &&
              u.jsx('div', {
                className: Se.statGrid,
                children: r.map((_) => {
                  const b =
                    _.suffix != null
                      ? `${typeof _.value == 'number' ? _.value.toLocaleString() : _.value}${_.suffix}`
                      : typeof _.value == 'number'
                        ? _.value.toLocaleString()
                        : _.value;
                  return u.jsxs(
                    'div',
                    {
                      className: Se.statChip,
                      children: [
                        u.jsx('span', { className: Se.statLabel, children: _.label }),
                        u.jsx('span', {
                          className: Se.statValue,
                          style: _.accent != null ? { color: Ub[_.accent] } : void 0,
                          children: b,
                        }),
                      ],
                    },
                    _.label
                  );
                }),
              }),
            m &&
              u.jsxs('div', {
                className: Se.lockedBadge,
                children: [
                  u.jsx(kt, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
                  u.jsx(Z, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
const Ws = [
  {
    key: 'maxHp',
    title: '最大 HP',
    category: 'defense',
    baseValue: 100,
    growthFactor: 1.02,
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    iconName: 'heart',
  },
  {
    key: 'hpRegen',
    title: 'HP リジェネ/秒',
    category: 'defense',
    baseValue: 1,
    growthFactor: 1.02,
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '/s',
    iconName: 'spark',
  },
  {
    key: 'damageReduction',
    title: '被ダメ軽減',
    category: 'defense',
    baseValue: 0,
    growthFactor: 0.01,
    growthType: 'asymptotic',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '%',
    iconName: 'shield',
  },
  {
    key: 'defense',
    title: '防御力',
    category: 'defense',
    baseValue: 1,
    growthFactor: 1.02,
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    iconName: 'shield',
  },
  {
    key: 'baseAttack',
    title: '基礎攻撃力',
    category: 'offense',
    baseValue: 1,
    growthFactor: 1.02,
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    iconName: 'laser',
  },
  {
    key: 'attackSpeed',
    title: '攻撃速度',
    category: 'offense',
    baseValue: 1,
    growthFactor: 1.02,
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '/s',
    iconName: 'lightning',
  },
  {
    key: 'range',
    title: '索敵距離',
    category: 'offense',
    baseValue: 150,
    growthFactor: 0.01,
    growthType: 'range_asymptotic',
    baseCost: 100,
    costGrowth: 1.1,
    unit: 'px',
    iconName: 'target',
  },
  {
    key: 'critRate',
    title: 'クリ率',
    category: 'offense',
    baseValue: 0,
    growthFactor: 0.01,
    growthType: 'asymptotic',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '%',
    iconName: 'target',
  },
  {
    key: 'critMultiplier',
    title: 'クリ倍率',
    category: 'offense',
    baseValue: 1.5,
    growthFactor: 0.05,
    growthType: 'linear',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '×',
    iconName: 'laser',
  },
  {
    key: 'activePower',
    title: 'アクティブ威力',
    category: 'active',
    baseValue: 1,
    growthFactor: 0.03,
    growthType: 'linear',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '×',
    iconName: 'flame',
  },
  {
    key: 'activeCdReduction',
    title: 'アクティブ CD 減少',
    category: 'active',
    baseValue: 0,
    growthFactor: 0.01,
    growthType: 'asymptotic_half',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '%',
    iconName: 'spark',
  },
  {
    key: 'screwGain',
    title: 'ネジ獲得倍率',
    category: 'economy',
    baseValue: 1,
    growthFactor: 0.03,
    growthType: 'linear',
    baseCost: 200,
    costGrowth: 1.15,
    unit: '×',
    iconName: 'screw',
  },
  {
    key: 'boltGain',
    title: 'ボルト獲得倍率',
    category: 'economy',
    baseValue: 1,
    growthFactor: 0.03,
    growthType: 'linear',
    baseCost: 200,
    costGrowth: 1.15,
    unit: '×',
    iconName: 'bolt',
  },
  {
    key: 'alloyGain',
    title: '超合金獲得倍率',
    category: 'economy',
    baseValue: 1,
    growthFactor: 0.03,
    growthType: 'linear',
    baseCost: 200,
    costGrowth: 1.15,
    unit: '×',
    iconName: 'spark',
  },
  {
    key: 'patchDropRate',
    title: 'パッチドロップ率',
    category: 'economy',
    baseValue: 1,
    growthFactor: 0.03,
    growthType: 'linear',
    baseCost: 200,
    costGrowth: 1.15,
    unit: '×',
    iconName: 'spark',
  },
  {
    key: 'patchSlots',
    title: 'パッチスロット数',
    category: 'slot',
    baseValue: 1,
    growthFactor: 1,
    growthType: 'fixed_step',
    baseCost: 2e3,
    costGrowth: 10,
    maxLv: 5,
    iconName: 'shield',
  },
];
function Sc(l, c) {
  switch (l.growthType) {
    case 'multiply':
      return Math.ceil(l.baseValue * Math.pow(l.growthFactor, c));
    case 'linear':
    case 'fixed_step':
      return l.baseValue + l.growthFactor * c;
    case 'asymptotic':
      return 1 - 1 / (1 + l.growthFactor * c);
    case 'asymptotic_half':
      return 0.5 * (1 - 1 / (1 + l.growthFactor * c));
    case 'range_asymptotic': {
      const f = l.growthFactor * c;
      return Math.ceil(150 + 250 * (1 - 1 / (1 + f)));
    }
    default:
      return l.baseValue;
  }
}
function Yu(l, c) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, c));
}
function vu(l, c, s) {
  let r = 0;
  for (let f = 0; f < s && !(l.maxLv != null && c + f >= l.maxLv); f++) r += Yu(l, c + f);
  return r;
}
function qb(l, c, s) {
  let r = 0,
    f = s,
    d = c;
  for (let m = 0; m < 1e4 && !(l.maxLv != null && d >= l.maxLv); m++) {
    const p = Q.fromNumber(Yu(l, d));
    if (f.lt(p)) break;
    ((f = f.sub(p)), (d += 1), (r += 1));
  }
  return r;
}
function s1(l, c) {
  if (l.isZero()) return Q.ZERO;
  if (c <= 0) return l;
  if (c >= 1) return Q.ZERO;
  const s = 1 - c;
  return l.mulNumber(s);
}
function Js(l, c) {
  return l <= 0 ? !1 : l >= 1 ? !0 : c() < l;
}
function Fs(l, c, s) {
  const { machine: r, weapon: f, isCrit: d } = l;
  let m = r.baseAttack.mulNumber(f.damageMultiplier);
  d && (m = m.mulNumber(r.critMultiplier));
  const p = m.sub(c),
    g = s1(p, s);
  return { rawDmg: m, finalDmg: g, isCrit: d };
}
function kb(l, c) {
  const s = l.sub(c.defense);
  return s1(s, c.damageReduction);
}
const Vb = 0.5,
  Gb = 2,
  Zb = 30,
  Yb = 25,
  Xb = 5,
  Kb = 20;
function Xu(l) {
  const c = Math.max(0, Math.floor(l)),
    s = Gb * Math.pow(1.02, c),
    r = Math.min(10, Vb * (1 + 0.03 * c)),
    f = Zb + 0.5 * c,
    d = Kb * (1 + 0.05 * c);
  return {
    attackPerSec: r,
    splashRadius: f,
    damageMul: s,
    volleyCdSec: Yb,
    volleyDamageMul: d,
    volleyShots: Xb,
  };
}
function _u(l, c, s, r) {
  const f = l - s,
    d = c - r;
  return Math.sqrt(f * f + d * d);
}
function Qb(l, c, s, r) {
  if (s.length === 0) return { hits: [], blastX: 50, blastY: 50 };
  const f = 50,
    d = 50;
  let m = s[0],
    p = _u(f, d, m.position.x, m.position.y);
  for (let A = 1; A < s.length; A++) {
    const N = s[A],
      E = _u(f, d, N.position.x, N.position.y);
    E < p && ((p = E), (m = N));
  }
  const g = m.position.x,
    y = m.position.y,
    _ = Js(l.critRate, r),
    b = [];
  for (const A of s)
    if (_u(g, y, A.position.x, A.position.y) <= c.splashRadius) {
      const E = Fs({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: _ }, Q.ZERO, 0);
      b.push({ enemyId: A.id, damage: E.finalDmg, crit: _ });
    }
  return { hits: b, blastX: g, blastY: y };
}
const Wb = 5,
  Jb = 80,
  Fb = 1,
  Ib = 0.6;
function Ku(l) {
  const c = Wb * (1 + 0.03 * l),
    s = Jb + 0.5 * l,
    r = Math.floor(Fb + 0.05 * l),
    f = Ib * Math.pow(1.02, l);
  return {
    attackPerSec: c,
    orbitRadius: s,
    simultaneousHits: r,
    damageMul: f,
    overdriveCdSec: Pb,
    overdriveDurationSec: t2,
    overdriveAttackSpeedMul: e2,
    overdriveDamageMul: 1,
  };
}
const Pb = 35,
  t2 = 8,
  e2 = 3;
function a2(l, c, s, r, f) {
  const m = s.slice(0, c.simultaneousHits).map((g) => {
      const y = Js(l.critRate, f),
        _ = Fs({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: y }, Q.ZERO, 0);
      return { enemyId: g.id, damage: _.finalDmg, crit: y };
    }),
    p = (r + 360 / c.attackPerSec) % 360;
  return { hits: m, angle: p };
}
const n2 = 2.5,
  l2 = 0.4;
function Qu(l) {
  const c = Math.max(0, l),
    s = n2 * (1 + 0.03 * c),
    r = Math.floor(1 + 0.1 * c),
    f = l2 * Math.pow(1.02, c),
    d = 10 * (1 + 0.05 * c);
  return { attackPerSec: s, pierce: r, damageMul: f, megaCdSec: i2, megaDamageMul: d };
}
const i2 = 20;
function c2(l, c, s, r) {
  if (s.length === 0) return { hits: [], beamX: 0, beamY: 0 };
  const f = s.slice(0, c.pierce),
    d = f.map((y) => {
      const _ = Js(l.critRate, r),
        b = Fs({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: _ }, Q.ZERO, 0);
      return { enemyId: y.id, damage: b.finalDmg, crit: _ };
    }),
    m = f[f.length - 1],
    p = m.position.x,
    g = m.position.y;
  return { hits: d, beamX: p, beamY: g };
}
const s2 = 3,
  o2 = 0.9,
  r2 = 30,
  u2 = 0.18,
  f2 = 2.5;
function Wu(l) {
  const c = Math.max(0, l),
    s = u2 * Math.pow(1.02, c),
    r = Math.min(10, f2 * (1 + 0.03 * c)),
    f = 15 * (1 + 0.05 * c);
  return {
    attackPerSec: r,
    chainCount: s2,
    chainFalloff: o2,
    damageMul: s,
    plasmaCdSec: r2,
    plasmaDamageMul: f,
  };
}
function d2(l, c, s, r) {
  if (s.length === 0) return { hits: [], path: [] };
  const f = s.slice(0, c.chainCount),
    d = [],
    m = [];
  for (const p of f) {
    const g = Js(l.critRate, r),
      y = Fs({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: g }, Q.ZERO, 0);
    (d.push({ enemyId: p.id, damage: y.finalDmg, crit: g }),
      m.push({ x: p.position.x, y: p.position.y }));
  }
  return { hits: d, path: m };
}
function fi(l) {
  return Math.round(l * 10) / 10;
}
function o1(l) {
  const c = Ws.find((s) => s.key === 'baseAttack');
  return c != null ? Sc(c, l) : 1;
}
function r1(l) {
  const c = Ws.find((s) => s.key === 'range');
  return c != null ? Sc(c, l) : 150;
}
function u1(l, c, s) {
  const r = Qu(l);
  return [
    { label: 'DMG', value: Math.round(c * r.damageMul), accent: 'primary' },
    { label: '貫通', value: r.pierce },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: fi(r.attackPerSec), suffix: '/s' },
  ];
}
function f1(l, c, s) {
  const r = Xu(l);
  return [
    { label: 'DMG', value: Math.round(c * r.damageMul), accent: 'primary' },
    { label: '爆発半径', value: fi(r.splashRadius), suffix: 'm' },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: fi(r.attackPerSec), suffix: '/s' },
  ];
}
function d1(l, c, s) {
  const r = Wu(l);
  return [
    { label: 'DMG', value: Math.round(c * r.damageMul), accent: 'primary' },
    { label: 'ターゲット数', value: r.chainCount },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: fi(r.attackPerSec), suffix: '/s' },
  ];
}
function m1(l, c) {
  const s = Ku(l);
  return [
    { label: 'DMG', value: Math.round(c * s.damageMul), accent: 'primary' },
    { label: '回転半径', value: fi(s.orbitRadius), suffix: 'm' },
    { label: '刃の数', value: s.simultaneousHits },
    { label: '回転速度', value: fi(s.attackPerSec), suffix: '/s' },
  ];
}
const m2 = [
  { kind: 'laser', name: 'LASER', description: '弾速が速く貫通する', buildStats: u1 },
  { kind: 'cannon', name: 'CANNON', description: '爆発時に範囲内にもダメージ', buildStats: f1 },
  { kind: 'thunder', name: 'THUNDER', description: '複数の敵を同時に攻撃', buildStats: d1 },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシンの周辺を回転する刃で攻撃',
    buildStats: (l, c) => m1(l, c),
  },
];
function h2() {
  const l = G((f) => f.weaponLv),
    c = G((f) => f.machineLevels),
    s = o1(c.baseAttack),
    r = r1(c.range);
  return u.jsx('div', {
    className: Sb.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: m2.map((f) =>
      u.jsx(
        c1,
        {
          weapon: f.kind,
          name: f.name,
          description: f.description,
          stats: f.buildStats(l, s, r),
          layout: 'wide',
        },
        f.kind
      )
    ),
  });
}
const p2 = '_tab_1oky8_3',
  y2 = '_topRow_1oky8_9',
  g2 = '_description_1oky8_15',
  v2 = '_previewCard_1oky8_21',
  _2 = '_previewLabel_1oky8_25',
  b2 = '_impactGrid_1oky8_32',
  S2 = '_impactRow_1oky8_37',
  x2 = '_impactRowBordered_1oky8_45',
  j2 = '_impactLabel_1oky8_49',
  T2 = '_impactValues_1oky8_55',
  A2 = '_arrow_1oky8_62',
  ua = {
    tab: p2,
    topRow: y2,
    description: g2,
    previewCard: v2,
    previewLabel: _2,
    impactGrid: b2,
    impactRow: S2,
    impactRowBordered: x2,
    impactLabel: j2,
    impactValues: T2,
    arrow: A2,
  },
  E2 = '_card_1403j_1',
  M2 = '_interactive_1403j_97',
  uc = {
    card: E2,
    'variant-default': '_variant-default_1403j_8',
    'variant-elevated': '_variant-elevated_1403j_14',
    'variant-sunken': '_variant-sunken_1403j_20',
    'variant-ghost': '_variant-ghost_1403j_26',
    'variant-accent': '_variant-accent_1403j_32',
    'variant-secondary': '_variant-secondary_1403j_38',
    'variant-danger': '_variant-danger_1403j_44',
    'variant-flat': '_variant-flat_1403j_50',
    'variant-outline': '_variant-outline_1403j_56',
    'padding-none': '_padding-none_1403j_63',
    'padding-sm': '_padding-sm_1403j_67',
    'padding-md': '_padding-md_1403j_71',
    'padding-lg': '_padding-lg_1403j_75',
    'padding-xl': '_padding-xl_1403j_79',
    'radius-sm': '_radius-sm_1403j_84',
    'radius-md': '_radius-md_1403j_88',
    'radius-l': '_radius-l_1403j_92',
    interactive: M2,
  };
function ml({
  children: l,
  variant: c = 'default',
  interactive: s = !1,
  padding: r = 'md',
  radius: f,
  className: d,
}) {
  const m = [
    uc.card,
    uc[`variant-${c}`],
    uc[`padding-${r}`],
    f != null ? uc[`radius-${f}`] : '',
    s ? uc.interactive : '',
    d ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return u.jsx('div', { className: m, children: l });
}
const w2 = '_root_168oy_2',
  N2 = '_header_168oy_15',
  z2 = '_iconWrap_168oy_22',
  C2 = '_title_168oy_34',
  R2 = '_lvBadge_168oy_47',
  O2 = '_description_168oy_60',
  B2 = '_valueRow_168oy_66',
  D2 = '_valueBefore_168oy_74',
  L2 = '_valueAfter_168oy_83',
  $2 = '_arrow_168oy_93',
  H2 = '_buttons_168oy_100',
  U2 = '_btnCol_168oy_105',
  q2 = '_btn_168oy_105',
  k2 = '_btnPrimary_168oy_132',
  V2 = '_btnSecondary_168oy_139',
  G2 = '_btnWarning_168oy_146',
  Z2 = '_costRow_168oy_172',
  Y2 = '_costNum_168oy_181',
  X2 = '_costDisabled_168oy_190',
  re = {
    root: w2,
    header: N2,
    iconWrap: z2,
    title: C2,
    lvBadge: R2,
    description: O2,
    valueRow: B2,
    valueBefore: D2,
    valueAfter: L2,
    arrow: $2,
    buttons: H2,
    btnCol: U2,
    btn: q2,
    btnPrimary: k2,
    btnSecondary: V2,
    btnWarning: G2,
    costRow: Z2,
    costNum: Y2,
    costDisabled: X2,
  },
  K2 = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  Q2 = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  W2 = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  J2 = { primary: re.btnPrimary, secondary: re.btnSecondary, warning: re.btnWarning },
  F2 = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function bu(l) {
  return l instanceof Q ? l.toDisplay() : l.toLocaleString();
}
function Ju({
  title: l,
  description: c,
  iconName: s,
  iconColor: r,
  currentLabel: f,
  before: d,
  after: m,
  beforeSuffix: p = '',
  currency: g = 'bolt',
  accent: y,
  options: _ = [],
  maxed: b = !1,
  onUpgrade: A,
}) {
  const N = y ?? W2[g],
    E = K2[N],
    q = r ?? E,
    $ = J2[N],
    J = F2[N];
  return u.jsxs('div', {
    className: re.root,
    role: 'group',
    'aria-label': l,
    'data-maxed': b,
    children: [
      u.jsxs('div', {
        className: re.header,
        children: [
          s != null &&
            u.jsx('span', {
              className: re.iconWrap,
              children: u.jsx(kt, { name: s, size: 14, color: q }),
            }),
          u.jsx('span', { className: re.title, children: l }),
          f != null &&
            !b &&
            u.jsx('span', {
              className: re.lvBadge,
              style: { color: E, boxShadow: Q2[N] },
              children: f,
            }),
          b &&
            u.jsx('span', {
              className: re.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      c != null &&
        c.length > 0 &&
        u.jsx(Z, { variant: 'caption', color: 'dim', className: re.description, children: c }),
      d != null &&
        u.jsxs('div', {
          className: re.valueRow,
          children: [
            u.jsxs('span', { className: re.valueBefore, children: [bu(d), p] }),
            m != null &&
              !b &&
              u.jsxs(u.Fragment, {
                children: [
                  u.jsx('span', { className: re.arrow, children: '→' }),
                  u.jsxs('span', {
                    className: re.valueAfter,
                    style: { color: E, textShadow: `0 0 5px ${J}` },
                    children: [bu(m), p],
                  }),
                ],
              }),
          ],
        }),
      !b &&
        _.length > 0 &&
        u.jsx('div', {
          className: re.buttons,
          style: { gridTemplateColumns: `repeat(${_.length}, 1fr)` },
          children: _.map((C) => {
            const rt = C.disabled === !0;
            return u.jsxs(
              'div',
              {
                className: re.btnCol,
                children: [
                  u.jsx('button', {
                    type: 'button',
                    className: `${re.btn} ${$}`,
                    disabled: rt,
                    onClick: rt ? void 0 : () => (A == null ? void 0 : A(C.amount)),
                    children: C.amount,
                  }),
                  u.jsx('div', {
                    className: re.costRow,
                    children: u.jsx('span', {
                      className: `${re.costNum} ${rt ? re.costDisabled : ''}`,
                      children: bu(C.cost),
                    }),
                  }),
                ],
              },
              C.amount
            );
          }),
        }),
    ],
  });
}
function Fu(l) {
  const c = Math.ceil(200 * Math.pow(1.12, l));
  return Q.fromNumber(c);
}
function _h(l, c) {
  let s = Q.ZERO;
  for (let r = 0; r < c; r++) s = s.add(Fu(l + r));
  return s;
}
function I2(l, c) {
  let s = c,
    r = 0;
  for (;;) {
    const f = Fu(l + r);
    if (s.lt(f) || ((s = s.sub(f)), r++, r > 1e4)) break;
  }
  return r;
}
function bh(l) {
  return Math.pow(1.02, l);
}
const Sh = { laser: 120 };
function P2(l) {
  const c = l + 1,
    s = bh(l),
    r = bh(c);
  return [
    { label: 'LASER DMG', before: Math.round(Sh.laser * s), after: Math.round(Sh.laser * r) },
    {
      label: 'CANNON 半径',
      before: Math.round((30 + 0.5 * l) * 10) / 10,
      after: Math.round((30 + 0.5 * c) * 10) / 10,
      suffix: 'm',
    },
    { label: 'THUNDER 連鎖', before: Math.floor(7 + 0.1 * l), after: Math.floor(7 + 0.1 * c) },
    { label: 'CUTTER 同時', before: Math.floor(1 + 0.05 * l), after: Math.floor(1 + 0.05 * c) },
  ];
}
function tS() {
  const l = G((E) => E.weaponLv),
    c = G((E) => E.alloy),
    s = G((E) => E.incrementWeaponLv),
    r = G((E) => E.setWeaponLv),
    f = G((E) => E.spendAlloy),
    d = Fu(l),
    m = _h(l, 5),
    p = I2(l, c),
    g = _h(l, p),
    y = !c.lt(d),
    _ = p >= 5,
    b = p >= 1,
    A = P2(l);
  function N(E) {
    E === '+1'
      ? f(d) && s()
      : E === '+5'
        ? f(m) && r(l + 5)
        : E === 'MAX' && p > 0 && f(g) && r(l + p);
  }
  return u.jsxs('div', {
    className: ua.tab,
    role: 'tabpanel',
    'aria-label': '武器強化',
    children: [
      u.jsxs('div', {
        className: ua.topRow,
        children: [
          u.jsx(Z, {
            variant: 'caption',
            color: 'mid',
            className: ua.description,
            children: '全 4 武器に共通で効く強化です。',
          }),
          u.jsx(ui, { currency: 'alloy', value: c, size: 'sm' }),
        ],
      }),
      u.jsx(Ju, {
        title: '武器強化 Lv',
        iconName: 'spark',
        iconColor: 'var(--c-secondary)',
        currentLabel: `Lv ${l}`,
        before: l,
        after: l + 1,
        currency: 'alloy',
        accent: 'secondary',
        options: [
          { amount: '+1', cost: d, disabled: !y },
          { amount: '+5', cost: m, disabled: !_ },
          { amount: 'MAX', cost: g, disabled: !b },
        ],
        onUpgrade: N,
      }),
      u.jsxs(ml, {
        variant: 'sunken',
        padding: 'md',
        className: ua.previewCard,
        children: [
          u.jsx(Z, {
            variant: 'label',
            color: 'dim',
            className: ua.previewLabel,
            children: '次 Lv での効果プレビュー',
          }),
          u.jsx('div', {
            className: ua.impactGrid,
            children: A.map((E, q) =>
              u.jsxs(
                'div',
                {
                  className: [ua.impactRow, q > 0 ? ua.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    u.jsx(Z, {
                      variant: 'caption',
                      color: 'mid',
                      className: ua.impactLabel,
                      children: E.label,
                    }),
                    u.jsxs('span', {
                      className: ua.impactValues,
                      children: [
                        u.jsx(Cn, {
                          value: E.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: E.suffix,
                          decimals: E.suffix === 'm' ? 1 : 0,
                        }),
                        u.jsx('span', { className: ua.arrow, children: '→' }),
                        u.jsx(Cn, {
                          value: E.after,
                          size: 'sm',
                          accentColor: 'secondary',
                          suffix: E.suffix,
                          decimals: E.suffix === 'm' ? 1 : 0,
                        }),
                      ],
                    }),
                  ],
                },
                E.label
              )
            ),
          }),
        ],
      }),
    ],
  });
}
const h1 = V.createContext(null);
function eS({ children: l, initialScreen: c }) {
  const [s, r] = V.useState(c ?? 'title'),
    f = V.useCallback((d) => {
      r(d);
    }, []);
  return u.jsx(h1.Provider, { value: { screen: s, navigate: f }, children: l });
}
function Rn() {
  const l = V.useContext(h1);
  if (!l) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return l;
}
const aS = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function nS(l = {}) {
  const { initialTab: c = 'details' } = l,
    [s, r] = V.useState(c),
    { screen: f, navigate: d } = Rn();
  return u.jsx(dl, {
    header: u.jsx(Tc, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => d('preparation'),
      tabBar: u.jsx(Ks, { tabs: aS, value: s, onChange: r, variant: 'underline', fullWidth: !0 }),
    }),
    footer: u.jsx(jc, { active: f, onChange: (m) => d(m) }),
    children: u.jsxs('div', {
      className: hv.content,
      children: [s === 'details' && u.jsx(h2, {}), s === 'upgrade' && u.jsx(tS, {})],
    }),
  });
}
const lS = '_root_1ozz7_1',
  iS = '_battleFooter_1ozz7_10',
  cS = '_overlayLayer_1ozz7_14',
  Su = { root: lS, battleFooter: iS, overlayLayer: cS },
  sS = {
    elite: { color: 'var(--c-warning)', label: 'ELITE', glow: '0 0 16px rgba(246,185,74,0.6)' },
    boss: { color: 'var(--c-danger)', label: 'BOSS', glow: '0 0 24px rgba(255,77,109,0.7)' },
    'battle-start': {
      color: 'var(--c-primary)',
      label: 'BATTLE START',
      glow: '0 0 20px rgba(80,220,255,0.7)',
    },
  };
function oS({ kind: l = 'elite', name: c, duration: s = 1600, onDone: r }) {
  const d = `app-${V.useId().replace(/:/g, '')}`,
    m = sS[l],
    p = `
    @keyframes ${d}-flash {
      0%   { opacity: 0; }
      10%  { opacity: 0.55; }
      40%  { opacity: 0; }
      100% { opacity: 0; }
    }
    @keyframes ${d}-band {
      0%   { transform: translateY(-100%); opacity: 0; }
      12%  { transform: translateY(0);     opacity: 1; }
      80%  { transform: translateY(0);     opacity: 1; }
      100% { transform: translateY(-100%); opacity: 0; }
    }
    .${d}-w {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: var(--z-fx-field);
    }
    .${d}-fl {
      position: absolute;
      inset: 0;
      background: ${m.color};
      mix-blend-mode: screen;
      animation: ${d}-flash ${s}ms var(--ease-out) both;
    }
    .${d}-bd {
      position: absolute;
      left: 0;
      right: 0;
      top: 30%;
      padding: 14px 0;
      background:
        linear-gradient(90deg, transparent, color-mix(in srgb, ${m.color} 20%, transparent) 50%, transparent),
        linear-gradient(0deg, rgba(10,15,28,0.85), rgba(10,15,28,0.85));
      border-top: 1px solid ${m.color};
      border-bottom: 1px solid ${m.color};
      box-shadow: ${m.glow};
      text-align: center;
      animation: ${d}-band ${s}ms var(--ease-out) both;
    }
    .${d}-label {
      display: block;
      margin-bottom: 4px;
    }
    .${d}-name {
      display: block;
    }
    @media (prefers-reduced-motion: reduce) {
      .${d}-fl, .${d}-bd { animation: none; opacity: 1; transform: none; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      u.jsxs('div', {
        className: `${d}-w`,
        onAnimationEnd: r,
        children: [
          u.jsx('div', { className: `${d}-fl` }),
          u.jsxs('div', {
            className: `${d}-bd`,
            children: [
              u.jsx(Z, {
                variant: 'label',
                className: `${d}-label`,
                style: { color: m.color, fontSize: 12, letterSpacing: '0.32em' },
                children: m.label,
              }),
              c != null &&
                c !== '' &&
                u.jsx(Z, {
                  variant: 'heading-1',
                  className: `${d}-name`,
                  style: {
                    color: 'var(--c-text)',
                    fontSize: 22,
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 700,
                    textShadow: m.glow,
                  },
                  children: c,
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
function rS({ waveNumber: l, duration: c = 1100, onDone: s }) {
  const f = `wv-${V.useId().replace(/:/g, '')}`,
    d = `
    @keyframes ${f}-in {
      0%   { transform: translate(-50%, -50%) translateX(-40px); opacity: 0; }
      18%  { transform: translate(-50%, -50%) translateX(0);     opacity: 1; }
      75%  { transform: translate(-50%, -50%) translateX(0);     opacity: 1; }
      100% { transform: translate(-50%, -50%) translateX(40px);  opacity: 0; }
    }
    .${f}-w {
      position: absolute;
      left: 50%;
      top: 26%;
      pointer-events: none;
      z-index: var(--z-fx-field);
      animation: ${f}-in ${c}ms var(--ease-default) both;
    }
    .${f}-b {
      padding: 8px 16px;
      background: rgba(10,15,28,0.85);
      border: 1px solid var(--c-primary);
      border-radius: var(--r-pill);
      box-shadow: var(--glow-cyan-md);
      display: inline-flex;
      align-items: baseline;
      gap: 8px;
      backdrop-filter: blur(6px);
    }
    @media (prefers-reduced-motion: reduce) {
      .${f}-w { animation: none; opacity: 1; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: d } }),
      u.jsx('div', {
        className: `${f}-w`,
        onAnimationEnd: s,
        children: u.jsxs('div', {
          className: `${f}-b`,
          children: [
            u.jsx(Z, {
              variant: 'label',
              color: 'primary',
              style: { fontSize: 11 },
              children: 'WAVE',
            }),
            u.jsx(Z, {
              variant: 'numeric-l',
              color: 'primary',
              style: { fontSize: 24, fontWeight: 700 },
              children: String(l),
            }),
          ],
        }),
      }),
    ],
  });
}
const uS = '_root_paca6_3',
  fS = '_field_paca6_21',
  dS = '_rangeCircle_paca6_35',
  mS = '_machine_paca6_46',
  hS = '_machineRingOuter_paca6_59',
  pS = '_pin_paca6_69',
  yS = '_enemy_paca6_79',
  nl = {
    root: uS,
    field: fS,
    rangeCircle: dS,
    machine: mS,
    machineRingOuter: hS,
    pin: pS,
    enemy: yS,
  },
  gS = '_wrap_14rhu_1',
  vS = { wrap: gS };
function _S({
  x: l,
  y: c,
  radius: s = 12,
  color: r = 'var(--c-warning)',
  duration: f = 520,
  delayMs: d = 0,
  onDone: m,
}) {
  const p = V.useId().replace(/:/g, 'bl'),
    g = Math.round(f * 0.5),
    y = `
    @keyframes ${p}-ring {
      0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 0; border-width: 3px; }
      30%  { transform: translate(-50%, -50%) scale(1);   opacity: 1; border-width: 3px; }
      100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; border-width: 1px; }
    }
    @keyframes ${p}-flash {
      0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
    }
    .${p}-wrap  { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${p}-ring  {
      position: absolute; left: 0; top: 0;
      width: ${s * 2}vmin; height: ${s * 2}vmin; border-radius: 50%;
      border: 3px solid ${r};
      box-shadow: 0 0 24px ${r}aa, inset 0 0 24px ${r}66;
      animation: ${p}-ring ${f}ms ${d}ms var(--ease-out) both;
    }
    .${p}-flash {
      position: absolute; left: 0; top: 0;
      width: ${s * 2}vmin; height: ${s * 2}vmin; border-radius: 50%;
      background: radial-gradient(circle, ${r} 0%, transparent 60%);
      animation: ${p}-flash ${g}ms ${d}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${p}-ring, .${p}-flash { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: y } }),
      u.jsxs('div', {
        className: `${p}-wrap ${vS.wrap}`,
        style: { left: `${l}%`, top: `${c}%` },
        onAnimationEnd: m,
        children: [
          u.jsx('div', { className: `${p}-flash` }),
          u.jsx('div', { className: `${p}-ring` }),
        ],
      }),
    ],
  });
}
const bS = '_shell_g836j_1',
  SS = '_inner_g836j_8',
  xS = '_ball_g836j_14',
  jS = '_highlight_g836j_23',
  Us = { shell: bS, inner: SS, ball: xS, highlight: jS };
function TS({
  x1: l = 50,
  y1: c = 50,
  x2: s = 80,
  y2: r = 20,
  duration: f = 480,
  size: d = 3.4,
  onDone: m,
}) {
  const [p, g] = V.useState(!1);
  V.useEffect(() => {
    const A = setTimeout(() => {
        g(!0);
      }, 20),
      N = setTimeout(() => {
        m == null || m();
      }, f + 20);
    return () => {
      (clearTimeout(A), clearTimeout(N));
    };
  }, []);
  const y = p ? s : l,
    _ = p ? r : c,
    b = (Math.atan2(r - c, s - l) * 180) / Math.PI;
  return u.jsx('div', {
    className: Us.shell,
    style: {
      left: `${y}%`,
      top: `${_}%`,
      width: `${d}vmin`,
      height: `${d}vmin`,
      transition: `left ${f}ms cubic-bezier(.4,0,.6,1), top ${f}ms cubic-bezier(.4,0,.6,1)`,
    },
    children: u.jsxs('div', {
      className: Us.inner,
      style: { transform: `rotate(${b}deg)` },
      children: [
        u.jsx('div', { className: Us.ball }),
        u.jsx('div', {
          className: Us.highlight,
          style: { width: `${d * 0.32}vmin`, height: `${d * 0.32}vmin` },
        }),
      ],
    }),
  });
}
const AS = '_svg_gil20_1',
  ES = { svg: AS };
function MS({
  points: l,
  color: c = 'var(--c-primary)',
  segmentMs: s = 90,
  jaggedness: r = 2.2,
  subdivisions: f = 4,
  delayMs: d = 0,
  onDone: m,
}) {
  const g = `chn-${V.useId().replace(/:/g, '')}`,
    y = l.length >= 2,
    _ = V.useMemo(() => {
      if (!y) return '';
      const N = [];
      for (let E = 0; E < l.length - 1; E++) {
        const q = l[E],
          $ = l[E + 1],
          J = $.x - q.x,
          C = $.y - q.y,
          rt = Math.hypot(J, C) || 1,
          Mt = -C / rt,
          Ct = J / rt;
        E === 0 && N.push(q);
        for (let Tt = 1; Tt < f; Tt++) {
          const it = Tt / f,
            Lt = q.x + J * it,
            Ft = q.y + C * it,
            Yt = (Math.random() - 0.5) * 2 * r;
          N.push({ x: Lt + Mt * Yt, y: Ft + Ct * Yt });
        }
        N.push($);
      }
      return N.map((E, q) => `${q === 0 ? 'M' : 'L'}${E.x.toFixed(2)} ${E.y.toFixed(2)}`).join(' ');
    }, []);
  if (!y) return null;
  const b = (l.length - 1) * s + 200,
    A = `
    @keyframes ${g}-draw {
      0%   { stroke-dashoffset: 300; opacity: 1; }
      80%  { stroke-dashoffset: 0;   opacity: 1; }
      100% { stroke-dashoffset: 0;   opacity: 0; }
    }
    .${g} { animation: ${g}-draw ${b}ms ${d}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${g} { animation-duration: 1ms; opacity: 0; } }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: A } }),
      u.jsxs('svg', {
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none',
        className: ES.svg,
        onAnimationEnd: m,
        children: [
          u.jsx('path', {
            className: g,
            d: _,
            fill: 'none',
            stroke: c,
            strokeWidth: 1.8,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeDasharray: 300,
            style: { filter: `drop-shadow(0 0 3px ${c})`, opacity: 0.5 },
          }),
          u.jsx('path', {
            className: g,
            d: _,
            fill: 'none',
            stroke: '#fff',
            strokeWidth: 0.55,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeDasharray: 300,
            style: { filter: `drop-shadow(0 0 1.5px ${c}) drop-shadow(0 0 3px ${c})` },
          }),
        ],
      }),
    ],
  });
}
function wS({
  cx: l = 50,
  cy: c = 50,
  length: s = 14,
  thickness: r = 2.2,
  blades: f = 2,
  rotateMs: d = 1300,
  direction: m = 'cw',
  color: p = 'var(--c-primary)',
  duration: g,
  onDone: y,
}) {
  const b = `ct-${V.useId().replace(/:/g, '')}`,
    A = m === 'ccw' ? -1 : 1;
  V.useEffect(() => {
    if (g != null && y != null) {
      const C = setTimeout(y, g);
      return () => {
        clearTimeout(C);
      };
    }
  }, [g, y]);
  const N = (r / (s * 2)) * 100,
    E = (r / (s * 4)) * 100,
    q = `
    @keyframes ${b}-spin { to { transform: translate(-50%, -50%) rotate(${360 * A}deg); } }
    @keyframes ${b}-trail-pulse {
      0%, 100% { opacity: 0.18; }
      50%      { opacity: 0.36; }
    }
    .${b}-hub {
      position: absolute;
      left: ${l}%; top: ${c}%;
      width: ${s * 2}%; height: ${s * 2}%;
      transform: translate(-50%, -50%);
      animation: ${b}-spin ${d}ms linear infinite;
      pointer-events: none;
      z-index: var(--z-fx-field);
    }
    .${b}-orbit {
      position: absolute; inset: 0; border-radius: 50%;
      border: 1px dashed ${p};
      opacity: 0.22;
      animation: ${b}-trail-pulse ${Math.round(d * 0.7)}ms ease-in-out infinite;
    }
    .${b}-blade {
      position: absolute;
      left: 50%; top: 50%;
      width: 50%;
      height: ${N}%;
      margin-top: -${E}%;
      transform-origin: 0 50%;
      filter: drop-shadow(0 0 4px ${p}) drop-shadow(0 0 10px ${p}66);
      color: ${p};
    }
    .${b}-sweep {
      position: absolute;
      left: 50%; top: 50%;
      width: 50%; height: 50%;
      transform-origin: 0 0;
      pointer-events: none;
      opacity: 0.35;
    }
    @media (prefers-reduced-motion: reduce) {
      .${b}-hub, .${b}-orbit { animation-duration: 30s; }
    }
  `,
    $ = (C) =>
      `M 10 ${C * 3.5} ` +
      Array.from({ length: 9 }, (rt, Mt) => {
        const Ct = 10 + Mt * 10;
        return `L ${Ct + 4} ${C * 8} L ${Ct + 8} ${C * 3.5} `;
      }).join(''),
    J = [];
  for (let C = 0; C < f; C++) {
    const rt = (360 / f) * C,
      Mt = 30 * A,
      Ct = (Mt * Math.PI) / 180,
      Tt = s * Math.cos(Ct),
      it = s * Math.sin(Ct),
      Lt = `M 0 0 L ${s} 0 A ${s} ${s} 0 0 ${Mt > 0 ? 1 : 0} ${Tt.toFixed(2)} ${it.toFixed(2)} Z`;
    (J.push(
      u.jsx(
        'svg',
        {
          className: `${b}-sweep`,
          viewBox: `0 0 ${s} ${s}`,
          style: { transform: `rotate(${rt - Mt}deg)`, transformOrigin: '0 0' },
          preserveAspectRatio: 'none',
          children: u.jsx('path', { d: Lt, fill: p, opacity: 0.18 }),
        },
        `sweep-${C}`
      )
    ),
      J.push(
        u.jsxs(
          'svg',
          {
            className: `${b}-blade`,
            viewBox: '0 -10 100 20',
            style: { transform: `rotate(${rt}deg)` },
            preserveAspectRatio: 'none',
            children: [
              u.jsx('rect', {
                x: 4,
                y: -3.5,
                width: 92,
                height: 7,
                fill: 'rgba(0,0,0,0.4)',
                stroke: p,
                strokeWidth: 1.2,
              }),
              u.jsx('rect', { x: 6, y: -1.5, width: 88, height: 3, fill: p, opacity: 0.55 }),
              u.jsx('path', {
                d: $(-1),
                fill: p,
                opacity: 0.85,
                stroke: p,
                strokeWidth: 0.6,
                strokeLinejoin: 'round',
              }),
              u.jsx('path', {
                d: $(1),
                fill: p,
                opacity: 0.85,
                stroke: p,
                strokeWidth: 0.6,
                strokeLinejoin: 'round',
              }),
              u.jsx('circle', { cx: 2, cy: 0, r: 3, fill: p }),
              u.jsx('circle', { cx: 2, cy: 0, r: 1.5, fill: '#fff' }),
              u.jsx('polygon', { points: '94,0 100,-3 98,0 100,3', fill: '#fff', opacity: 0.85 }),
            ],
          },
          `blade-${C}`
        )
      ));
  }
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: q } }),
      u.jsxs('div', {
        className: `${b}-hub`,
        children: [u.jsx('div', { className: `${b}-orbit` }), J],
      }),
    ],
  });
}
const NS = '_root_14p1r_1',
  zS = { root: NS };
function CS({ value: l, x: c, y: s, crit: r = !1, duration: f = 800, onDone: d }) {
  const m = V.useId().replace(/:/g, 'dp'),
    p = `
    @keyframes ${m}-pop {
      0%   { transform: translate(-50%, 0) scale(${r ? 0.6 : 0.8}); opacity: 0; }
      15%  { transform: translate(-50%, -4px) scale(${r ? 1.15 : 1}); opacity: 1; }
      100% { transform: translate(-50%, -28px) scale(${r ? 1 : 0.95}); opacity: 0; }
    }
    .${m} {
      position: absolute;
      left: ${c}%;
      top: ${s}%;
      animation: ${m}-pop ${f}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
      filter: drop-shadow(0 0 4px ${r ? 'rgba(246,185,74,0.7)' : 'rgba(255,255,255,0.45)'});
    }
    @media (prefers-reduced-motion: reduce) {
      .${m} { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      u.jsx('div', {
        className: `${m} ${zS.root}`,
        onAnimationEnd: d,
        children: u.jsx(Cn, {
          value: l,
          size: r ? 'lg' : 'md',
          accentColor: r ? 'warning' : 'scale',
          glow: !0,
          style: r ? { fontSize: 22, fontWeight: 700 } : { fontSize: 16, fontWeight: 600 },
        }),
      }),
    ],
  });
}
const RS = '_wrap_14rhu_1',
  OS = { wrap: RS },
  xh = 8;
function BS({ x: l, y: c, color: s = 'var(--c-text-mid)', duration: r = 480, onDone: f }) {
  const d = V.useId().replace(/:/g, 'ed'),
    p = `
    @keyframes ${d}-flash {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0; }
      30%  { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
    }
    @keyframes ${d}-shard {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)     scale(1);   opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) translateY(-22px) scale(0.3); opacity: 0; }
    }
    .${d}-wrap  { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${d}-flash {
      position: absolute; left: 0; top: 0;
      width: 18px; height: 18px; border-radius: 50%;
      background: radial-gradient(circle, ${s === 'var(--c-text-mid)' ? 'rgba(167,184,216,0.9)' : s}, transparent 65%);
      animation: ${d}-flash ${r}ms var(--ease-out) both;
    }
    .${d}-shard {
      position: absolute; left: 0; top: 0;
      width: 4px; height: 4px;
      background: ${s};
      box-shadow: 0 0 4px ${s};
      animation: ${d}-shard ${r}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${d}-flash, .${d}-shard { animation-duration: 1ms; opacity: 0; }
    }
  `,
    g = Array.from({ length: xh }, (y, _) =>
      u.jsx('div', { className: `${d}-shard`, style: { '--a': `${(_ * 360) / xh}deg` } }, _)
    );
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      u.jsxs('div', {
        className: `${d}-wrap ${OS.wrap}`,
        style: { left: `${l}%`, top: `${c}%` },
        onAnimationEnd: f,
        children: [u.jsx('div', { className: `${d}-flash` }), g],
      }),
    ],
  });
}
const DS = '_wrap_14rhu_1',
  LS = { wrap: DS };
function $S({ x: l, y: c, color: s = 'var(--c-primary-hi)', duration: r = 220, onDone: f }) {
  const d = V.useId().replace(/:/g, 'eh'),
    m = `
    @keyframes ${d}-f {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
    }
    .${d}-w { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${d}-d {
      position: absolute;
      left: 0; top: 0;
      width: 12px; height: 12px;
      border-radius: 50%;
      background: radial-gradient(circle, ${s}, transparent 60%);
      animation: ${d}-f ${r}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${d}-d { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: m } }),
      u.jsx('div', {
        className: `${d}-w ${LS.wrap}`,
        style: { left: `${l}%`, top: `${c}%` },
        onAnimationEnd: f,
        children: u.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const HS = '_beam_14ieu_1',
  US = { beam: HS };
function qS({
  x1: l,
  y1: c,
  x2: s,
  y2: r,
  color: f = 'var(--c-primary)',
  duration: d = 220,
  onDone: m,
}) {
  const p = V.useId().replace(/:/g, 'lb'),
    g = s - l,
    y = r - c,
    _ = Math.hypot(g, y),
    b = (Math.atan2(y, g) * 180) / Math.PI,
    A = `
    @keyframes ${p}-beam {
      0%   { transform: rotate(${b}deg) scaleX(0); opacity: 1; }
      30%  { transform: rotate(${b}deg) scaleX(1); opacity: 1; }
      100% { transform: rotate(${b}deg) scaleX(1); opacity: 0; }
    }
    .${p} {
      position: absolute;
      left: ${l}%; top: ${c}%;
      width: ${_}%;
      height: 2px;
      background: ${f};
      transform-origin: 0 50%;
      box-shadow: 0 0 6px ${f}, 0 0 14px ${f};
      animation: ${p}-beam ${d}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
    }
    @media (prefers-reduced-motion: reduce) {
      .${p} { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: A } }),
      u.jsx('div', { className: `${p} ${US.beam}`, onAnimationEnd: m }),
    ],
  });
}
const kS = { screw: 'var(--c-screw)', bolt: 'var(--c-bolt)', alloy: 'var(--c-alloy)' };
function VS({ x: l, y: c, targetX: s, targetY: r, iconName: f, duration: d = 400, onDone: m }) {
  const g = `pk-${V.useId().replace(/:/g, '')}`,
    y = kS[f],
    _ = (l + s) / 2,
    b = Math.min(l, s, c, r) - 8,
    A = `
    @keyframes ${g}-arc {
      0%   { left: ${l}%;       top: ${c}%;       transform: translate(-50%, -50%) scale(1);   opacity: 1; }
      40%  { left: ${_}%;    top: ${b}%;    transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
      100% { left: ${s}%; top: ${r}%; transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
    }
    .${g} {
      position: absolute;
      color: ${y};
      filter: drop-shadow(0 0 4px ${y});
      animation: ${g}-arc ${d}ms var(--ease-default) both;
      pointer-events: none;
      display: inline-flex;
    }
    @media (prefers-reduced-motion: reduce) {
      .${g} { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: A } }),
      u.jsx('div', { className: g, onAnimationEnd: m, children: u.jsx(kt, { name: f, size: 18 }) }),
    ],
  });
}
function GS({
  x: l = 50,
  y: c = 60,
  fromY: s = 0,
  duration: r = 320,
  color: f = 'var(--c-primary)',
  segments: d = 7,
  jaggedness: m = 3.5,
  onDone: p,
}) {
  const y = `thn-${V.useId().replace(/:/g, '')}`,
    _ = V.useMemo(() => {
      const E = [{ x: l, y: s }],
        $ = (c - s) / d;
      for (let J = 1; J < d; J++) {
        const C = s + $ * J,
          rt = l + (Math.random() - 0.5) * 2 * m;
        E.push({ x: rt, y: C });
      }
      return (
        E.push({ x: l, y: c }),
        E.map((J, C) => `${C === 0 ? 'M' : 'L'}${J.x.toFixed(2)} ${J.y.toFixed(2)}`).join(' ')
      );
    }, []),
    b = Math.round(r * 0.35),
    A = Math.round(r * 0.65),
    N = `
    @keyframes ${y}-strike {
      0%   { stroke-dashoffset: 300; opacity: 0; }
      15%  { opacity: 1; }
      40%  { stroke-dashoffset: 0;   opacity: 1; }
      100% { stroke-dashoffset: 0;   opacity: 0; }
    }
    @keyframes ${y}-strike-glow {
      0%   { opacity: 0; }
      20%  { opacity: 0.6; }
      100% { opacity: 0; }
    }
    @keyframes ${y}-flash {
      0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
      30%  { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
    }
    .${y}-bolt { animation: ${y}-strike ${b}ms var(--ease-out) both; }
    .${y}-bolt-glow { animation: ${y}-strike-glow ${b}ms var(--ease-out) both; }
    .${y}-flash {
      position: absolute; left: ${l}%; top: ${c}%;
      width: 8vmin; height: 8vmin; border-radius: 50%;
      background: radial-gradient(circle, #fff 0%, ${f} 30%, transparent 70%);
      box-shadow: 0 0 20px ${f}, 0 0 40px ${f}88;
      animation: ${y}-flash ${A}ms ${b}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
    }
    .${y}-svg {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none;
      z-index: var(--z-fx-field);
    }
    @media (prefers-reduced-motion: reduce) {
      .${y}-bolt, .${y}-bolt-glow, .${y}-flash { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: N } }),
      u.jsxs('svg', {
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none',
        className: `${y}-svg`,
        children: [
          u.jsx('path', {
            className: `${y}-bolt-glow`,
            d: _,
            fill: 'none',
            stroke: f,
            strokeWidth: 2.4,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeDasharray: 300,
            style: { filter: `drop-shadow(0 0 3px ${f})`, opacity: 0.5 },
          }),
          u.jsx('path', {
            className: `${y}-bolt`,
            d: _,
            fill: 'none',
            stroke: '#fff',
            strokeWidth: 0.7,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeDasharray: 300,
            style: { filter: `drop-shadow(0 0 2px ${f}) drop-shadow(0 0 4px ${f})` },
          }),
        ],
      }),
      u.jsx('div', { className: `${y}-flash`, onAnimationEnd: p }),
    ],
  });
}
const ZS = '_root_5xktu_1',
  YS = '_shape_5xktu_11',
  XS = '_hpBar_5xktu_22',
  KS = '_hpFill_5xktu_32',
  qs = { root: ZS, shape: YS, hpBar: XS, hpFill: KS },
  QS = {
    standard: {
      size: 14,
      color: 'rgb(167,184,216)',
      glow: 'rgba(167,184,216,0.45)',
      defaultHp: !1,
    },
    swift: { size: 13, color: 'rgb(138,243,255)', glow: 'rgba(138,243,255,0.5)', defaultHp: !1 },
    tough: { size: 18, color: 'rgb(120,140,180)', glow: 'rgba(120,140,180,0.55)', defaultHp: !1 },
    elite: { size: 26, color: 'var(--c-warning)', glow: 'rgba(246,185,74,0.6)', defaultHp: !0 },
    miniboss: { size: 36, color: '#ffa726', glow: 'rgba(255,167,38,0.65)', defaultHp: !0 },
    boss: { size: 56, color: 'var(--c-danger)', glow: 'rgba(255,77,109,0.7)', defaultHp: !0 },
  },
  WS = { standard: !1, swift: !0, tough: !1, elite: !1, miniboss: !0, boss: !0 };
function JS(l) {
  switch (l) {
    case 'frozen':
      return 'hue-rotate(180deg) saturate(1.6) brightness(1.05)';
    case 'burning':
      return 'hue-rotate(-25deg) saturate(1.4) brightness(1.1)';
    default:
      return 'none';
  }
}
function FS({ color: l }) {
  return u.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      u.jsx('polygon', {
        points: '0,-46 40,-23 40,23 0,46 -40,23 -40,-23',
        fill: 'rgba(0,0,0,0.35)',
        stroke: l,
        strokeWidth: 6,
        strokeLinejoin: 'round',
      }),
      u.jsx('polygon', {
        points: '0,-22 19,-11 19,11 0,22 -19,11 -19,-11',
        fill: l,
        opacity: 0.55,
      }),
    ],
  });
}
function IS({ color: l }) {
  return u.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      u.jsx('polygon', {
        points: '46,0 -28,-34 -10,0 -28,34',
        fill: 'rgba(0,0,0,0.35)',
        stroke: l,
        strokeWidth: 6,
        strokeLinejoin: 'round',
      }),
      u.jsx('line', {
        x1: 22,
        y1: 0,
        x2: -6,
        y2: 0,
        stroke: l,
        strokeWidth: 5,
        opacity: 0.7,
        strokeLinecap: 'round',
      }),
    ],
  });
}
function PS({ color: l }) {
  return u.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      u.jsx('rect', {
        x: -42,
        y: -42,
        width: 84,
        height: 84,
        rx: 16,
        fill: 'rgba(0,0,0,0.4)',
        stroke: l,
        strokeWidth: 8,
      }),
      u.jsx('rect', {
        x: -28,
        y: -28,
        width: 56,
        height: 56,
        rx: 8,
        fill: 'none',
        stroke: l,
        strokeWidth: 4,
        opacity: 0.7,
      }),
      u.jsx('rect', { x: -10, y: -10, width: 20, height: 20, fill: l, opacity: 0.7 }),
    ],
  });
}
function tx({ color: l }) {
  return u.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      u.jsx('polygon', {
        points: '0,-46 46,0 0,46 -46,0',
        fill: 'rgba(0,0,0,0.4)',
        stroke: l,
        strokeWidth: 6,
        strokeLinejoin: 'round',
      }),
      u.jsx('polygon', {
        points: '0,-28 28,0 0,28 -28,0',
        fill: 'none',
        stroke: l,
        strokeWidth: 3,
        opacity: 0.7,
      }),
      u.jsx('polygon', { points: '0,-12 12,0 0,12 -12,0', fill: l, opacity: 0.85 }),
    ],
  });
}
function ex({ color: l }) {
  return u.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      [0, 90, 180, 270].map((c) =>
        u.jsx(
          'polygon',
          { points: '46,-6 46,6 56,0', transform: `rotate(${c})`, fill: l, opacity: 0.6 },
          c
        )
      ),
      u.jsx('polygon', {
        points: '-28,-46 28,-46 46,-28 46,28 28,46 -28,46 -46,28 -46,-28',
        fill: 'rgba(0,0,0,0.45)',
        stroke: l,
        strokeWidth: 6,
        strokeLinejoin: 'round',
      }),
      u.jsx('rect', { x: -22, y: -4, width: 44, height: 8, fill: l, opacity: 0.65 }),
      u.jsx('rect', { x: -4, y: -22, width: 8, height: 44, fill: l, opacity: 0.65 }),
      u.jsx('circle', { cx: 0, cy: 0, r: 8, fill: l }),
    ],
  });
}
function ax({ color: l }) {
  return u.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      [0, 60, 120, 180, 240, 300].map((c) =>
        u.jsx(
          'polygon',
          { points: '0,-48 6,-30 -6,-30', transform: `rotate(${c})`, fill: l, opacity: 0.7 },
          c
        )
      ),
      u.jsx('polygon', {
        points: '0,-34 30,-17 30,17 0,34 -30,17 -30,-17',
        fill: 'rgba(0,0,0,0.5)',
        stroke: l,
        strokeWidth: 5,
        strokeLinejoin: 'round',
      }),
      u.jsx('circle', {
        cx: 0,
        cy: 0,
        r: 18,
        fill: 'none',
        stroke: l,
        strokeWidth: 3,
        opacity: 0.7,
      }),
      u.jsx('circle', { cx: 0, cy: 0, r: 10, fill: l }),
      u.jsx('circle', { cx: 0, cy: 0, r: 4, fill: 'rgba(255,255,255,0.85)' }),
    ],
  });
}
const nx = { standard: FS, swift: IS, tough: PS, elite: tx, miniboss: ex, boss: ax };
function lx(l, c) {
  return l === 'elite'
    ? 'elite'
    : l === 'miniboss'
      ? 'miniboss'
      : l === 'boss'
        ? 'boss'
        : c === 'swift'
          ? 'swift'
          : c === 'tough'
            ? 'tough'
            : 'standard';
}
function ix({ type: l, size: c, hp: s, showHp: r, facing: f = 0, status: d = 'normal' }) {
  const m = QS[l],
    p = c ?? m.size,
    g = nx[l],
    y = r ?? m.defaultHp,
    _ = WS[l] ? `${(f * 180) / Math.PI}deg` : '0deg',
    b = l === 'boss' ? 8 : l === 'miniboss' ? 6 : 4,
    A = { width: p, height: p },
    N = {
      width: p,
      height: p,
      color: m.color,
      filter: `drop-shadow(0 0 ${b}px ${m.glow}) ${JS(d)}`,
      transform: `rotate(${_})`,
    },
    E = { width: p + 4, height: l === 'boss' ? 4 : 3 },
    q = {
      width: `${Math.max(0, Math.min(1, s ?? 0)) * 100}%`,
      background:
        l === 'boss'
          ? 'var(--c-danger)'
          : l === 'miniboss'
            ? '#ffa726'
            : l === 'elite'
              ? 'var(--c-warning)'
              : 'var(--c-hp)',
    };
  return u.jsxs('div', {
    role: 'img',
    'aria-label': `${l} enemy`,
    'data-enemy-type': l,
    'data-status': d,
    className: qs.root,
    style: A,
    children: [
      u.jsx('div', { className: qs.shape, style: N, children: u.jsx(g, { color: m.color }) }),
      y &&
        s != null &&
        u.jsx('div', {
          className: qs.hpBar,
          style: E,
          children: u.jsx('div', { className: qs.hpFill, style: q }),
        }),
    ],
  });
}
function jh(l) {
  switch (l) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}
function cx({
  enemies: l,
  machinePosition: c = { x: 50, y: 50 },
  damageEvents: s,
  hitEvents: r,
  deathEvents: f,
  onDamageDone: d,
  onHitDone: m,
  onDeathDone: p,
  projectileEvents: g = [],
  onProjectileDone: y,
  pickupEvents: _ = [],
  onPickupDone: b,
  showCutterOrbit: A = !1,
  range: N,
  dummyPins: E = [],
}) {
  const q = c.x,
    $ = c.y,
    J = N * 2;
  return u.jsx('div', {
    className: nl.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: u.jsxs('div', {
      className: nl.field,
      children: [
        u.jsx('div', {
          className: nl.rangeCircle,
          style: { left: `${q}%`, top: `${$}%`, width: `${J}%`, height: `${J}%` },
          'aria-hidden': !0,
        }),
        E.map((C) =>
          u.jsx(
            'div',
            {
              className: nl.pin,
              style: { left: `${C.x}%`, top: `${C.y}%`, color: jh(C.kind) },
              'aria-hidden': !0,
              children: u.jsx(kt, {
                name: 'target',
                size: C.kind === 'boss' ? 18 : C.kind === 'elite' ? 16 : 14,
                color: jh(C.kind),
              }),
            },
            C.id
          )
        ),
        l.map((C) => {
          const rt = lx(C.kind, C.subtype),
            Mt = C.frozenUntilMs != null,
            Ct = C.burnUntilMs != null,
            Tt = Mt ? 'frozen' : Ct ? 'burning' : 'normal',
            it = parseFloat(C.hp.toString()),
            Lt = Math.max(1e-4, parseFloat(C.maxHp.toString())),
            Ft = Math.max(0, Math.min(1, it / Lt)),
            Yt = Math.atan2($ - C.position.y, q - C.position.x);
          return u.jsx(
            'div',
            {
              className: nl.enemy,
              style: {
                left: `${C.position.x}%`,
                top: `${C.position.y}%`,
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
              },
              children: u.jsx(ix, { type: rt, hp: Ft, status: Tt, facing: Yt }),
            },
            C.id
          );
        }),
        u.jsxs('div', {
          className: nl.machine,
          style: { left: `${q}%`, top: `${$}%` },
          'aria-label': 'マシン',
          children: [
            u.jsx('span', { className: nl.machineRingOuter, 'aria-hidden': !0 }),
            u.jsx(kt, { name: 'tower', size: 22, color: 'var(--c-primary)' }),
          ],
        }),
        A && u.jsx(wS, { cx: q, cy: $ }),
        s.map((C) =>
          u.jsx(
            CS,
            {
              value: Number(C.value.toString()),
              x: C.x,
              y: C.y,
              crit: C.crit,
              onDone: () => (d == null ? void 0 : d(C.id)),
            },
            C.id
          )
        ),
        r.map((C) =>
          u.jsx($S, { x: C.x, y: C.y, onDone: () => (m == null ? void 0 : m(C.id)) }, C.id)
        ),
        f.map((C) =>
          u.jsx(BS, { x: C.x, y: C.y, onDone: () => (p == null ? void 0 : p(C.id)) }, C.id)
        ),
        _.map((C) =>
          u.jsx(
            VS,
            {
              x: C.x,
              y: C.y,
              targetX: 50,
              targetY: 4,
              iconName: C.iconName,
              onDone: () => (b == null ? void 0 : b(C.id)),
            },
            C.id
          )
        ),
        g.map((C) => {
          switch (C.kind) {
            case 'laser':
              return u.jsx(
                qS,
                {
                  x1: C.x1,
                  y1: C.y1,
                  x2: C.x2,
                  y2: C.y2,
                  onDone: () => (y == null ? void 0 : y(C.id)),
                },
                C.id
              );
            case 'cannonShell':
              return u.jsx(
                TS,
                {
                  x1: C.x1,
                  y1: C.y1,
                  x2: C.x2,
                  y2: C.y2,
                  duration: C.durationMs,
                  onDone: () => (y == null ? void 0 : y(C.id)),
                },
                C.id
              );
            case 'blast':
              return u.jsx(
                _S,
                {
                  x: C.x,
                  y: C.y,
                  delayMs: C.delayMs,
                  onDone: () => (y == null ? void 0 : y(C.id)),
                },
                C.id
              );
            case 'thunderStrike':
              return u.jsx(
                GS,
                {
                  x: C.x,
                  y: C.y,
                  duration: C.durationMs,
                  onDone: () => (y == null ? void 0 : y(C.id)),
                },
                C.id
              );
            case 'chain':
              return u.jsx(
                MS,
                {
                  points: C.points,
                  delayMs: C.delayMs,
                  onDone: () => (y == null ? void 0 : y(C.id)),
                },
                C.id
              );
          }
        }),
      ],
    }),
  });
}
const sx = '_root_1oybt_2',
  ox = '_topRow_1oybt_13',
  rx = '_weaponSlots_1oybt_21',
  ux = '_activeArea_1oybt_29',
  fx = '_activeButton_1oybt_37',
  dx = '_activeDisabled_1oybt_57',
  mx = '_modeToggle_1oybt_66',
  hx = '_modeToggleOn_1oybt_89',
  px = '_sheetToggleButton_1oybt_96',
  yx = '_bottomRow_1oybt_108',
  gx = '_currencyArea_1oybt_114',
  vx = '_sysButtons_1oybt_126',
  aa = {
    root: sx,
    topRow: ox,
    weaponSlots: rx,
    activeArea: ux,
    activeButton: fx,
    activeDisabled: dx,
    modeToggle: mx,
    modeToggleOn: hx,
    sheetToggleButton: px,
    bottomRow: yx,
    currencyArea: gx,
    sysButtons: vx,
  },
  _x = '_badge_4fy54_1',
  bx = '_glow_4fy54_90',
  Sx = '_iconLeft_4fy54_118',
  fc = {
    badge: _x,
    'size-sm': '_size-sm_4fy54_15',
    'size-md': '_size-md_4fy54_22',
    'size-lg': '_size-lg_4fy54_29',
    'variant-neutral': '_variant-neutral_4fy54_36',
    'variant-tier': '_variant-tier_4fy54_42',
    'variant-elite': '_variant-elite_4fy54_48',
    'variant-boss': '_variant-boss_4fy54_54',
    'variant-patch-tier': '_variant-patch-tier_4fy54_60',
    'variant-info': '_variant-info_4fy54_66',
    'variant-success': '_variant-success_4fy54_72',
    'variant-warning': '_variant-warning_4fy54_78',
    'variant-danger': '_variant-danger_4fy54_84',
    glow: bx,
    iconLeft: Sx,
  };
function Ac({
  text: l,
  variant: c = 'neutral',
  tier: s,
  size: r = 'md',
  glow: f = !1,
  iconLeft: d,
}) {
  let m;
  const p = c === 'default' ? 'neutral' : c;
  if (p === 'tier' && s != null) {
    const y = Math.min(Math.max(1, Math.floor(s)), 12);
    m = { '--badge-color': `var(--c-tier-${Math.min(y, 10)})` };
  } else
    p === 'patch-tier' &&
      s != null &&
      (m = { '--badge-color': `var(--c-patch-t${Math.min(Math.max(1, Math.floor(s)), 5)})` });
  let g = l;
  return (
    g == null &&
      (p === 'tier' && s != null
        ? (g = `T${s}`)
        : p === 'patch-tier' && s != null
          ? (g = `T${s}`)
          : (g = '')),
    u.jsxs('span', {
      className: [fc.badge, fc[`variant-${p}`], fc[`size-${r}`], f ? fc.glow : '']
        .filter(Boolean)
        .join(' '),
      style: m,
      children: [
        d != null && u.jsx('span', { className: fc.iconLeft, 'aria-hidden': 'true', children: d }),
        g,
      ],
    })
  );
}
const xx = '_root_x9cjr_1',
  jx = '_svg_x9cjr_9',
  Tx = '_track_x9cjr_15',
  Ax = '_arc_x9cjr_19',
  Ex = '_center_x9cjr_28',
  Mx = '_labelText_x9cjr_37',
  ni = { root: xx, svg: jx, track: Tx, arc: Ax, center: Ex, labelText: Mx },
  wx = { xs: 20, sm: 32, md: 48, lg: 64 },
  Nx = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  zx = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function p1({
  value: l,
  max: c,
  size: s = 24,
  color: r = 'primary',
  thickness: f = 3,
  glow: d = !1,
  showLabel: m = !1,
  withLabel: p = !1,
  label: g,
  children: y,
}) {
  const _ = typeof s == 'number' ? s : wx[s],
    b =
      c != null
        ? Math.min(Math.max(0, l), Math.max(1, c)) / Math.max(1, c)
        : Math.min(Math.max(0, l), 100) / 100,
    A = c != null ? Math.min(Math.max(0, l), Math.max(1, c)) : l,
    N = c != null ? Math.max(1, c) : 100,
    E = Nx[r],
    q = d ? zx[r] : void 0,
    $ = _ / 2,
    J = $ - f / 2,
    C = 2 * Math.PI * J,
    rt = C * (1 - b),
    Ct = m || p || y != null,
    Tt = g ?? `${Math.round(b * 100)}%`;
  return u.jsxs('span', {
    className: ni.root,
    style: { width: _, height: _ },
    children: [
      u.jsxs('svg', {
        className: ni.svg,
        width: _,
        height: _,
        viewBox: `0 0 ${_} ${_}`,
        xmlns: 'http://www.w3.org/2000/svg',
        role: 'progressbar',
        'aria-valuenow': A,
        'aria-valuemin': 0,
        'aria-valuemax': N,
        'aria-label': g ?? `${A} / ${N}`,
        children: [
          u.jsx('circle', {
            className: ni.track,
            cx: $,
            cy: $,
            r: J,
            fill: 'none',
            strokeWidth: f,
          }),
          u.jsx('circle', {
            className: ni.arc,
            cx: $,
            cy: $,
            r: J,
            fill: 'none',
            stroke: E,
            strokeWidth: f,
            strokeLinecap: 'round',
            strokeDasharray: C,
            strokeDashoffset: rt,
            style: q != null ? { filter: `drop-shadow(0 0 4px ${E})` } : void 0,
            transform: `rotate(-90 ${$} ${$})`,
          }),
        ],
      }),
      Ct &&
        u.jsx('span', {
          className: ni.center,
          children:
            y ?? u.jsx('span', { className: ni.labelText, style: { color: E }, children: Tt }),
        }),
    ],
  });
}
const Cx = '_root_afe45_2',
  Rx = '_swapDisabled_afe45_14',
  Ox = '_active_afe45_20',
  Bx = '_onCd_afe45_27',
  Dx = '_iconWrap_afe45_27',
  Lx = '_cdOverlay_afe45_47',
  $x = '_cdProgress_afe45_57',
  Hx = '_swapOverlay_afe45_68',
  An = {
    root: Cx,
    swapDisabled: Rx,
    active: Ox,
    onCd: Bx,
    iconWrap: Dx,
    cdOverlay: Lx,
    cdProgress: $x,
    swapOverlay: Hx,
  },
  Ux = { sm: 40, md: 52, lg: 64 },
  qx = { sm: 18, md: 24, lg: 30 };
function kx({
  weapon: l,
  active: c = !1,
  ready: s = !1,
  cdProgress: r = 100,
  swapDisabled: f = !1,
  size: d = 'md',
  onClick: m,
}) {
  const p = Ux[d],
    g = qx[d],
    y = r < 100,
    _ = [An.root, c ? An.active : '', y ? An.onCd : '', f ? An.swapDisabled : '']
      .filter(Boolean)
      .join(' ');
  return u.jsxs('button', {
    type: 'button',
    className: _,
    style: { width: p, height: p, minWidth: p, minHeight: p },
    onClick: f ? void 0 : m,
    disabled: f && m == null,
    'aria-label': `${l} weapon slot${c ? ' (active)' : ''}${y ? ` (cooldown ${r}%)` : s ? ' (ready)' : ''}`,
    'aria-pressed': c,
    children: [
      u.jsx('span', {
        className: An.iconWrap,
        children: u.jsx(kt, {
          name: l,
          size: g,
          color: c ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      y &&
        u.jsxs(u.Fragment, {
          children: [
            u.jsx('span', { className: An.cdOverlay, 'aria-hidden': 'true' }),
            u.jsx('span', {
              className: An.cdProgress,
              'aria-hidden': 'true',
              children: u.jsx(p1, {
                value: r,
                max: 100,
                size: p - 4,
                color: 'cd',
                thickness: d === 'sm' ? 2 : 3,
              }),
            }),
          ],
        }),
      f && u.jsx('span', { className: An.swapOverlay, 'aria-hidden': 'true' }),
    ],
  });
}
const Th = ['laser', 'cannon', 'thunder', 'cutter'];
function Vx({
  screw: l,
  equippedWeapon: c,
  weaponCds: s,
  activeCd: r,
  activeMax: f,
  isAutoActive: d,
  onSwitchWeapon: m,
  onActivate: p,
  onToggleAuto: g,
  isPaused: y,
  onTogglePause: _,
  onOpenMenu: b,
  onOpenScreenSaver: A,
  isWorkshopOpen: N = !1,
  onToggleWorkshop: E,
}) {
  const q = r > 0,
    $ = d || q,
    J = Th.some((C) => C !== c && (s[C] ?? 100) < 100);
  return u.jsxs('div', {
    className: aa.root,
    children: [
      E != null &&
        u.jsx('button', {
          type: 'button',
          className: aa.sheetToggleButton,
          onClick: E,
          'aria-expanded': N,
          'aria-label': N ? 'アップグレードを閉じる' : 'アップグレードを開く',
          children: u.jsx(Ac, { text: 'アップグレード', variant: 'info', size: 'md', glow: !0 }),
        }),
      u.jsxs('div', {
        className: aa.topRow,
        children: [
          u.jsx('div', {
            className: aa.weaponSlots,
            children: Th.map((C) =>
              u.jsx(
                kx,
                {
                  weapon: C,
                  active: C === c,
                  cdProgress: s[C] ?? 100,
                  swapDisabled: J && C !== c,
                  size: 'md',
                  onClick: () => {
                    m(C);
                  },
                },
                C
              )
            ),
          }),
          u.jsxs('div', {
            className: aa.activeArea,
            children: [
              u.jsx('button', {
                type: 'button',
                className: [aa.activeButton, $ ? aa.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: $ ? void 0 : p,
                disabled: $,
                'aria-label': `アクティブスキル発動${q ? ' (クールダウン中)' : d ? ' (自動モード)' : ''}`,
                children: u.jsx(p1, {
                  value: q ? r : f,
                  max: f > 0 ? f : 1,
                  size: 64,
                  color: q ? 'cd' : 'primary',
                  glow: !q && !d,
                  thickness: 4,
                  children: u.jsx(kt, {
                    name: 'lightning',
                    size: 26,
                    color: $ ? 'var(--c-text-disabled)' : 'var(--c-secondary)',
                  }),
                }),
              }),
              u.jsx('button', {
                type: 'button',
                className: [aa.modeToggle, d ? aa.modeToggleOn : ''].filter(Boolean).join(' '),
                onClick: () => g(!d),
                'aria-pressed': d,
                'aria-label': d
                  ? 'アクティブスキルを手動モードに切り替え'
                  : 'アクティブスキルを自動モードに切り替え',
                children: d ? 'AUTO' : 'MANUAL',
              }),
            ],
          }),
        ],
      }),
      u.jsxs('div', {
        className: aa.bottomRow,
        children: [
          u.jsx('div', {
            className: aa.currencyArea,
            children: u.jsx(ui, { currency: 'screw', value: l, size: 'lg' }),
          }),
          u.jsxs('div', {
            className: aa.sysButtons,
            children: [
              u.jsx(_c, {
                icon: y ? 'play' : 'pause',
                label: y ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: y,
                onClick: _,
              }),
              u.jsx(_c, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: b,
              }),
              u.jsx(_c, {
                icon: 'ice',
                label: 'スクリーンセーバーを起動',
                size: 'md',
                variant: 'ghost',
                onClick: A,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const Gx = '_root_1y4n6_3',
  Zx = '_headerRow_1y4n6_13',
  Yx = '_hpValue_1y4n6_21',
  Xx = '_hpDivider_1y4n6_31',
  Kx = '_shieldBlock_1y4n6_36',
  Qx = '_srOnly_1y4n6_44',
  li = { root: Gx, headerRow: Zx, hpValue: Yx, hpDivider: Xx, shieldBlock: Kx, srOnly: Qx },
  Wx = '_root_1pi3d_2',
  Jx = '_sizeSm_1pi3d_11',
  Fx = '_sizeMd_1pi3d_15',
  Ix = '_sizeLg_1pi3d_19',
  Px = '_fill_1pi3d_23',
  t5 = '_label_1pi3d_29',
  e5 = '_withTrailing_1pi3d_46',
  a5 = '_trailingLabel_1pi3d_56',
  En = {
    root: Wx,
    sizeSm: Jx,
    sizeMd: Fx,
    sizeLg: Ix,
    fill: Px,
    label: t5,
    withTrailing: e5,
    trailingLabel: a5,
  },
  n5 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  l5 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function Ah({
  value: l,
  max: c,
  color: s = 'primary',
  size: r = 'md',
  variant: f = 'solid',
  showLabel: d = !1,
  label: m,
  trailingLabel: p,
  glow: g = !1,
  reverse: y = !1,
}) {
  const _ = Math.max(1, c),
    b = Math.min(Math.max(0, l), _),
    A = (b / _) * 100,
    N = n5[s],
    E = g || f === 'neon' ? l5[s] : void 0,
    q = { sm: En.sizeSm, md: En.sizeMd, lg: En.sizeLg }[r],
    $ = {
      width: `${A}%`,
      backgroundColor: N,
      ...(E != null ? { boxShadow: E } : {}),
      ...(y ? { marginLeft: 'auto' } : {}),
    },
    J = m ?? `${b} / ${_}`,
    C = u.jsxs('div', {
      className: `${En.root} ${q}`,
      role: 'progressbar',
      'aria-valuenow': b,
      'aria-valuemin': 0,
      'aria-valuemax': _,
      'aria-label': m ?? `${b} / ${_}`,
      children: [
        u.jsx('div', { className: En.fill, style: $ }),
        d && u.jsx('span', { className: En.label, children: J }),
      ],
    });
  return p == null
    ? C
    : u.jsxs('div', {
        className: En.withTrailing,
        children: [C, u.jsx('span', { className: En.trailingLabel, children: p })],
      });
}
const i5 = '_root_lwzi1_2',
  c5 = '_boss_lwzi1_10',
  s5 = '_header_lwzi1_16',
  o5 = '_milestone_lwzi1_23',
  r5 = '_milestoneText_lwzi1_30',
  u5 = '_seconds_lwzi1_40',
  f5 = '_timerTrack_lwzi1_46',
  d5 = '_timerFill_lwzi1_56',
  m5 = '_drainBar_lwzi1_1',
  h5 = '_timerFillBoss_lwzi1_69',
  p5 = '_timerFillPaused_lwzi1_74',
  y5 = '_waveLabel_lwzi1_95',
  ma = {
    root: i5,
    boss: c5,
    header: s5,
    milestone: o5,
    milestoneText: r5,
    seconds: u5,
    timerTrack: f5,
    timerFill: d5,
    drainBar: m5,
    timerFillBoss: h5,
    timerFillPaused: p5,
    'size-sm': '_size-sm_lwzi1_91',
    waveLabel: y5,
    'size-md': '_size-md_lwzi1_99',
    'size-lg': '_size-lg_lwzi1_103',
  },
  g5 = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  };
function v5({
  waveNumber: l,
  secondsLeft: c,
  secondsMax: s,
  nextMilestone: r,
  showSeconds: f = !0,
  size: d = 'md',
  paused: m = !1,
}) {
  const p = (r == null ? void 0 : r.kind) === 'boss',
    g = r != null ? g5[r.kind] : null,
    y = Math.max(1, s);
  return u.jsxs('div', {
    className: [ma.root, ma[`size-${d}`], p ? ma.boss : ''].filter(Boolean).join(' '),
    children: [
      u.jsxs('div', {
        className: ma.header,
        children: [
          u.jsx(Ac, { text: `WAVE ${l}`, variant: 'tier' }),
          g != null &&
            r != null &&
            u.jsxs('span', {
              className: ma.milestone,
              style: { color: g.color },
              children: [
                u.jsx(kt, { name: g.iconName, size: 12, color: g.color }),
                u.jsxs('span', { className: ma.milestoneText, children: [g.label, ' @', r.wave] }),
              ],
            }),
          f &&
            u.jsx('span', {
              className: ma.seconds,
              children: u.jsxs(Z, {
                variant: 'numeric-s',
                color: 'mid',
                children: [Math.ceil(c), 's'],
              }),
            }),
        ],
      }),
      u.jsx('div', {
        className: ma.timerTrack,
        role: 'progressbar',
        'aria-label': `Wave ${l} timer`,
        'aria-valuemin': 0,
        'aria-valuemax': y,
        'aria-valuenow': Math.max(0, c),
        children: u.jsx(_5, { secondsRemaining: c, secondsMax: y, isBoss: p, paused: m }, l),
      }),
    ],
  });
}
function _5({ secondsRemaining: l, secondsMax: c, isBoss: s, paused: r }) {
  const [f] = V.useState(() => {
      const m = Math.max(0, Math.min(100, (l / c) * 100)),
        p = Math.max(0.01, l);
      return { initialWidthPct: m, durationSec: p };
    }),
    d = [ma.timerFill, s ? ma.timerFillBoss : '', r ? ma.timerFillPaused : '']
      .filter(Boolean)
      .join(' ');
  return u.jsx('div', {
    className: d,
    style: { width: `${f.initialWidthPct}%`, animationDuration: `${f.durationSec}s` },
  });
}
function b5({
  hpCurrent: l,
  hpMax: c,
  shieldCurrent: s,
  shieldMax: r,
  tier: f,
  wave: d,
  totalWaves: m,
  secondsRemaining: p,
  secondsTotal: g,
  isBossWave: y = !1,
  nextMilestone: _,
  damaging: b = !1,
  paused: A = !1,
}) {
  const N = _ ?? (y ? { wave: d, kind: 'boss' } : void 0),
    E = s != null && r != null,
    q = Eh(l, c),
    $ = E ? Eh(s, r) : 0;
  return u.jsxs('div', {
    className: li.root,
    role: 'group',
    'aria-label': 'バトル状態',
    children: [
      u.jsxs('div', {
        className: li.headerRow,
        children: [
          u.jsx(Ac, { variant: 'tier', tier: f, size: 'md', glow: !0 }),
          u.jsx(Z, { variant: 'label', color: 'dim', style: { fontSize: 10 }, children: 'HP' }),
          u.jsxs('span', {
            className: li.hpValue,
            'aria-label': `HP ${l.toDisplay()} / ${c.toDisplay()}`,
            children: [
              u.jsx(Cn, {
                value: l,
                size: 'sm',
                accentColor: b ? 'danger' : 'text',
                glow: b,
                style: { fontSize: 14 },
              }),
              u.jsx('span', { className: li.hpDivider, children: '/' }),
              u.jsx(Cn, { value: c, size: 'sm', accentColor: 'dim', style: { fontSize: 11 } }),
            ],
          }),
          E &&
            u.jsxs('span', {
              className: li.shieldBlock,
              children: [
                u.jsx(Z, {
                  variant: 'label',
                  color: 'primary',
                  style: { fontSize: 9.5 },
                  children: 'SHLD',
                }),
                u.jsx(Cn, {
                  value: s,
                  size: 'sm',
                  accentColor: 'primary',
                  style: { fontSize: 11 },
                }),
              ],
            }),
        ],
      }),
      u.jsx(Ah, { value: q, max: 100, color: q <= 30 ? 'hp-low' : 'hp', size: 'md' }),
      E && u.jsx(Ah, { value: $, max: 100, color: 'shield', size: 'sm' }),
      u.jsx(v5, {
        waveNumber: d,
        secondsLeft: p,
        secondsMax: g,
        nextMilestone: N,
        showSeconds: !1,
        size: 'sm',
        paused: A,
      }),
      u.jsxs('span', { className: li.srOnly, 'aria-hidden': 'false', children: [d, '/', m] }),
    ],
  });
}
function Eh(l, c) {
  const s = parseFloat(l.toString()),
    r = parseFloat(c.toString());
  return r === 0 ? 0 : Math.max(0, Math.min(100, (s / r) * 100));
}
const S5 = '_card_1o3jz_1',
  x5 = '_header_1o3jz_8',
  j5 = '_soundSection_1o3jz_13',
  T5 = '_sliderRow_1o3jz_19',
  A5 = '_sliderLabel_1o3jz_26',
  E5 = '_sliderValue_1o3jz_31',
  M5 = '_divider_1o3jz_38',
  w5 = '_actions_1o3jz_44',
  fa = {
    card: S5,
    header: x5,
    soundSection: j5,
    sliderRow: T5,
    sliderLabel: A5,
    sliderValue: E5,
    divider: M5,
    actions: w5,
  },
  N5 = '_button_1oo6e_1',
  z5 = '_fullWidth_1oo6e_109',
  C5 = '_iconLeft_1oo6e_113',
  R5 = '_iconRight_1oo6e_114',
  O5 = '_iconSpacer_1oo6e_120',
  B5 = '_label_1oo6e_124',
  Qa = {
    button: N5,
    'variant-primary': '_variant-primary_1oo6e_28',
    'variant-secondary': '_variant-secondary_1oo6e_42',
    'variant-danger': '_variant-danger_1oo6e_56',
    'variant-ghost': '_variant-ghost_1oo6e_70',
    'size-sm': '_size-sm_1oo6e_85',
    'size-md': '_size-md_1oo6e_93',
    'size-lg': '_size-lg_1oo6e_101',
    fullWidth: z5,
    iconLeft: C5,
    iconRight: R5,
    iconSpacer: O5,
    label: B5,
  };
function Ee({
  label: l,
  variant: c = 'primary',
  size: s = 'md',
  fullWidth: r = !1,
  iconLeft: f,
  iconRight: d,
  disabled: m = !1,
  onClick: p,
  type: g = 'button',
}) {
  return u.jsxs('button', {
    type: g,
    className: [Qa.button, Qa[`variant-${c}`], Qa[`size-${s}`], r ? Qa.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: m,
    onClick: p,
    'aria-disabled': m,
    children: [
      f != null && u.jsx('span', { className: Qa.iconLeft, 'aria-hidden': 'true', children: f }),
      u.jsx('span', { className: Qa.label, children: l }),
      d != null
        ? u.jsx('span', { className: Qa.iconRight, 'aria-hidden': 'true', children: d })
        : f != null
          ? u.jsx('span', {
              className: `${Qa.iconRight} ${Qa.iconSpacer}`,
              'aria-hidden': 'true',
              children: f,
            })
          : null,
    ],
  });
}
const D5 = '_overlay_1i1z1_12',
  L5 = '_fullscreen_1i1z1_21',
  $5 = '_absolute_1i1z1_27',
  H5 = '_alignCenter_1i1z1_33',
  U5 = '_alignTop_1i1z1_38',
  q5 = '_alignBottom_1i1z1_44',
  k5 = '_content_1i1z1_50',
  ol = {
    overlay: D5,
    fullscreen: L5,
    absolute: $5,
    alignCenter: H5,
    alignTop: U5,
    alignBottom: q5,
    content: k5,
  },
  V5 = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Mh = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  G5 = { center: ol.alignCenter, top: ol.alignTop, bottom: ol.alignBottom };
function Iu({
  fullscreen: l = !0,
  children: c,
  onClose: s,
  dismissible: r = !0,
  dimLevel: f = 'normal',
  blur: d = 0,
  align: m = 'center',
  zIndex: p = 'overlay',
  style: g,
  open: y,
}) {
  const _ = () => {
      r && s && s();
    },
    b = (q) => {
      q.stopPropagation();
    },
    A = V5[f],
    N = typeof p == 'number' ? p : (Mh[p] ?? Mh.overlay),
    E = {
      background: `rgba(2, 4, 10, ${A})`,
      zIndex: N,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...g,
    };
  return u.jsx('div', {
    className: [ol.overlay, l ? ol.fullscreen : ol.absolute, G5[m]].join(' '),
    style: E,
    onClick: _,
    role: 'presentation',
    'aria-modal': 'true',
    children: u.jsx('div', { className: ol.content, onClick: b, children: c }),
  });
}
const Z5 = '_wrapper_131tr_1',
  Y5 = '_disabled_131tr_5',
  X5 = '_input_131tr_18',
  ks = {
    wrapper: Z5,
    disabled: Y5,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: X5,
  },
  zu = ({
    value: l,
    min: c = 0,
    max: s = 1,
    step: r = 0.01,
    onChange: f,
    color: d = 'primary',
    disabled: m = !1,
  }) => {
    const p = s === c ? 0 : ((l - c) / (s - c)) * 100,
      g = (_) => {
        m || f(parseFloat(_.target.value));
      },
      y = { '--slider-fill-pct': `${p}%` };
    return u.jsx('div', {
      className: [ks.wrapper, ks[`color-${d}`], m ? ks.disabled : ''].join(' '),
      style: y,
      children: u.jsx('input', {
        type: 'range',
        className: ks.input,
        min: c,
        max: s,
        step: r,
        value: l,
        onChange: g,
        disabled: m,
        'aria-valuenow': l,
        'aria-valuemin': c,
        'aria-valuemax': s,
      }),
    });
  },
  K5 = '_dialog_49iek_13',
  Q5 = '_card_49iek_20',
  W5 = '_titleRow_49iek_27',
  J5 = '_titleIcon_49iek_33',
  F5 = '_title_49iek_27',
  I5 = '_message_49iek_46',
  P5 = '_actions_49iek_50',
  t3 = '_variantDanger_49iek_57',
  Mn = {
    dialog: K5,
    card: Q5,
    titleRow: W5,
    titleIcon: J5,
    title: F5,
    message: I5,
    actions: P5,
    variantDanger: t3,
  };
function y1({
  open: l,
  title: c,
  message: s,
  iconName: r,
  confirmLabel: f = '確定',
  cancelLabel: d = 'キャンセル',
  onConfirm: m,
  onCancel: p,
  variant: g = 'default',
}) {
  return l
    ? u.jsx(Iu, {
        open: l,
        onClose: p,
        dismissible: !0,
        children: u.jsx('div', {
          className: [Mn.dialog, g === 'danger' ? Mn.variantDanger : ''].filter(Boolean).join(' '),
          children: u.jsxs(ml, {
            variant: 'elevated',
            padding: 'lg',
            className: Mn.card,
            children: [
              u.jsxs('div', {
                className: Mn.titleRow,
                children: [
                  r != null &&
                    u.jsx('span', {
                      className: Mn.titleIcon,
                      'aria-hidden': 'true',
                      children: u.jsx(kt, {
                        name: r,
                        size: 20,
                        color: g === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  u.jsx(Z, { variant: 'heading-3', as: 'h2', className: Mn.title, children: c }),
                ],
              }),
              s != null &&
                s.length > 0 &&
                u.jsx(Z, { variant: 'body', color: 'mid', className: Mn.message, children: s }),
              u.jsxs('div', {
                className: Mn.actions,
                children: [
                  u.jsx(Ee, { label: d, variant: 'ghost', fullWidth: !0, onClick: p }),
                  u.jsx(Ee, {
                    label: f,
                    variant: g === 'danger' ? 'danger' : 'primary',
                    fullWidth: !0,
                    onClick: m,
                  }),
                ],
              }),
            ],
          }),
        }),
      })
    : null;
}
function e3({
  open: l,
  bgmVolume: c,
  seVolume: s,
  onBgmChange: r,
  onSeChange: f,
  onRetreat: d,
  onClose: m,
}) {
  const [p, g] = V.useState(!1);
  if (!l) return null;
  const y = () => {
      g(!0);
    },
    _ = () => {
      (g(!1), d());
    },
    b = () => {
      g(!1);
    };
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx(Iu, {
        open: l,
        onClose: m,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !p,
        children: u.jsxs(ml, {
          variant: 'elevated',
          padding: 'lg',
          className: fa.card,
          children: [
            u.jsx('div', {
              className: fa.header,
              children: u.jsx(Z, {
                variant: 'heading-2',
                as: 'h2',
                align: 'center',
                children: 'メニュー',
              }),
            }),
            u.jsxs('div', {
              className: fa.soundSection,
              children: [
                u.jsxs('div', {
                  className: fa.sliderRow,
                  children: [
                    u.jsx(Z, {
                      variant: 'label',
                      color: 'mid',
                      className: fa.sliderLabel,
                      children: 'BGM',
                    }),
                    u.jsx(Z, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: fa.sliderValue,
                      children: Math.round(c * 100).toString(),
                    }),
                  ],
                }),
                u.jsx(zu, { value: c, min: 0, max: 1, step: 0.01, onChange: r, color: 'primary' }),
                u.jsxs('div', {
                  className: fa.sliderRow,
                  children: [
                    u.jsx(Z, {
                      variant: 'label',
                      color: 'mid',
                      className: fa.sliderLabel,
                      children: 'SE',
                    }),
                    u.jsx(Z, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: fa.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                u.jsx(zu, { value: s, min: 0, max: 1, step: 0.01, onChange: f, color: 'primary' }),
              ],
            }),
            u.jsx('div', { className: fa.divider, role: 'separator' }),
            u.jsxs('div', {
              className: fa.actions,
              children: [
                u.jsx(Ee, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: y }),
                u.jsx(Ee, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: m }),
              ],
            }),
          ],
        }),
      }),
      u.jsx(y1, {
        open: p,
        title: '撤退しますか？',
        message: 'バトルを終了して撤退します。獲得リソースはリザルト画面で確認できます。',
        confirmLabel: '撤退する',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: _,
        onCancel: b,
      }),
    ],
  });
}
const a3 = '_card_1fzt0_2',
  n3 = '_header_1fzt0_14',
  l3 = '_statusText_1fzt0_19',
  i3 = '_section_1fzt0_23',
  c3 = '_sectionTitle_1fzt0_29',
  s3 = '_statsGrid_1fzt0_35',
  o3 = '_statItem_1fzt0_41',
  r3 = '_rewardList_1fzt0_52',
  u3 = '_rewardCurrency_1fzt0_58',
  f3 = '_patchList_1fzt0_66',
  d3 = '_patchItem_1fzt0_72',
  m3 = '_actions_1fzt0_87',
  pe = {
    card: a3,
    header: n3,
    statusText: l3,
    section: i3,
    sectionTitle: c3,
    statsGrid: s3,
    statItem: o3,
    rewardList: r3,
    rewardCurrency: u3,
    patchList: f3,
    patchItem: d3,
    actions: m3,
  },
  h3 = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  p3 = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function y3(l) {
  const c = Math.floor(l / 60),
    s = Math.floor(l % 60);
  return `${c.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function g3({
  open: l,
  status: c,
  reachedTier: s,
  reachedWave: r,
  killed: f,
  elapsedSec: d,
  reward: m,
  onClose: p,
}) {
  if (!l) return null;
  const g = h3[c],
    y = p3[c];
  return u.jsx(Iu, {
    open: l,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: u.jsxs(ml, {
      variant: 'elevated',
      padding: 'lg',
      className: pe.card,
      children: [
        u.jsx('div', {
          className: pe.header,
          children: u.jsx(Z, {
            variant: 'heading-1',
            as: 'h2',
            color: y,
            align: 'center',
            className: pe.statusText,
            children: g,
          }),
        }),
        u.jsxs('div', {
          className: pe.section,
          children: [
            u.jsx(Z, {
              variant: 'label',
              color: 'mid',
              className: pe.sectionTitle,
              children: 'バトル記録',
            }),
            u.jsxs('div', {
              className: pe.statsGrid,
              children: [
                u.jsxs('div', {
                  className: pe.statItem,
                  children: [
                    u.jsx(Z, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    u.jsx(Z, { variant: 'numeric-m', color: 'primary', children: s.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: pe.statItem,
                  children: [
                    u.jsx(Z, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    u.jsx(Z, { variant: 'numeric-m', color: 'primary', children: r.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: pe.statItem,
                  children: [
                    u.jsx(Z, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    u.jsx(Z, { variant: 'numeric-m', color: 'primary', children: f.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: pe.statItem,
                  children: [
                    u.jsx(Z, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    u.jsx(Z, { variant: 'numeric-m', color: 'primary', children: y3(d) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        u.jsxs('div', {
          className: pe.section,
          children: [
            u.jsx(Z, {
              variant: 'label',
              color: 'mid',
              className: pe.sectionTitle,
              children: '獲得',
            }),
            u.jsxs('div', {
              className: pe.rewardList,
              children: [
                u.jsx('div', {
                  className: pe.rewardCurrency,
                  children: u.jsx(ui, { currency: 'bolt', value: m.bolt, size: 'lg' }),
                }),
                u.jsx('div', {
                  className: pe.rewardCurrency,
                  children: u.jsx(ui, { currency: 'alloy', value: m.alloy, size: 'lg' }),
                }),
                m.patches.length > 0 &&
                  u.jsx('div', {
                    className: pe.patchList,
                    children: m.patches.map((_, b) =>
                      u.jsxs(
                        'div',
                        {
                          className: pe.patchItem,
                          children: [
                            u.jsx(Z, { variant: 'body', truncate: !0, children: _.name }),
                            u.jsxs(Z, {
                              variant: 'caption',
                              color: 'mid',
                              children: ['Tier ', _.tier.toString()],
                            }),
                            u.jsxs(Z, {
                              variant: 'numeric-s',
                              color: 'secondary',
                              children: ['x', _.count.toString()],
                            }),
                          ],
                        },
                        b
                      )
                    ),
                  }),
                m.patches.length === 0 &&
                  u.jsx(Z, { variant: 'caption', color: 'dim', children: 'パッチドロップなし' }),
              ],
            }),
          ],
        }),
        u.jsx('div', {
          className: pe.actions,
          children: u.jsx(Ee, {
            label: '出撃準備へ',
            variant: 'primary',
            fullWidth: !0,
            onClick: p,
          }),
        }),
      ],
    }),
  });
}
const v3 = '_root_1tank_3',
  _3 = '_inner_1tank_20',
  b3 = '_header_1tank_28',
  S3 = '_headerText_1tank_35',
  x3 = '_grid_1tank_44',
  dc = { root: v3, inner: _3, header: b3, headerText: S3, grid: x3 };
function j3({ open: l, screw: c, levels: s, onUpgrade: r, onClose: f }) {
  return l
    ? u.jsx('section', {
        className: dc.root,
        role: 'dialog',
        'aria-modal': 'false',
        'aria-label': 'ラン中ワークショップ',
        children: u.jsxs('div', {
          className: dc.inner,
          children: [
            u.jsxs('div', {
              className: dc.header,
              children: [
                u.jsxs('div', {
                  className: dc.headerText,
                  children: [
                    u.jsx(Z, {
                      variant: 'heading-3',
                      style: { fontSize: 14, lineHeight: 1.2 },
                      children: 'ラン中ワークショップ',
                    }),
                    u.jsx(Z, {
                      variant: 'caption',
                      color: 'dim',
                      style: { fontSize: 10.5 },
                      children: 'ラン終了で全リセット',
                    }),
                  ],
                }),
                u.jsx(ui, { currency: 'screw', value: c, size: 'md' }),
                f != null &&
                  u.jsx(_c, {
                    icon: 'chevron-down',
                    label: '閉じる',
                    variant: 'ghost',
                    size: 'sm',
                    onClick: f,
                  }),
              ],
            }),
            u.jsx('div', {
              className: dc.grid,
              children: Jh.map((d) => {
                const m = s[d.key],
                  p = rl(m),
                  g = rl(m + 1),
                  y = Zu(d, m),
                  _ = Fh(d, m, 5),
                  { totalCost: b, lvDelta: A } = Ih(d, m, c),
                  N = Q.fromNumber(y),
                  E = Q.fromNumber(_),
                  q = c.gte(N),
                  $ = c.gte(E),
                  J = A > 0;
                return u.jsx(
                  Ju,
                  {
                    title: d.title,
                    iconName: d.iconName,
                    currentLabel: `Lv ${m}`,
                    before: Math.round(p * 10) / 10,
                    after: Math.round(g * 10) / 10,
                    beforeSuffix: '×',
                    currency: 'screw',
                    accent: 'warning',
                    options: [
                      { amount: '+1', cost: N, disabled: !q },
                      { amount: '+5', cost: E, disabled: !$ },
                      { amount: 'MAX', cost: b, disabled: !J },
                    ],
                    onUpgrade: (C) => {
                      C === '+1'
                        ? r(d.key, 1)
                        : C === '+5'
                          ? r(d.key, 5)
                          : C === 'MAX' && r(d.key, 'max');
                    },
                  },
                  d.key
                );
              }),
            }),
          ],
        }),
      })
    : null;
}
const T3 = '_root_9fvdn_2',
  A3 = { root: T3 },
  xu = [
    [
      [20, 28],
      [78, 38],
      [42, 72],
      [85, 82],
    ],
    [
      [62, 18],
      [16, 48],
      [82, 62],
      [32, 86],
    ],
    [
      [80, 24],
      [44, 55],
      [14, 76],
      [70, 90],
    ],
    [
      [34, 30],
      [90, 52],
      [26, 68],
      [58, 86],
    ],
    [
      [50, 14],
      [22, 42],
      [76, 70],
      [46, 94],
    ],
  ];
function E3({ items: l = [], showTower: c = !1, towerContent: s = null, cycleSeconds: r = 24 }) {
  const d = `ssfx-${V.useId().replace(/:/g, '')}`,
    m = xu.map((b, A) => {
      const N = 100 / b.length,
        E = b
          .map(([q, $], J) => {
            const C = J * N;
            return `
          ${C}%               { left: ${q}%; top: ${$}%; opacity: 0; }
          ${(C + 3).toFixed(2)}%   { left: ${q}%; top: ${$}%; opacity: 1; }
          ${(C + N - 7).toFixed(2)}%  { left: ${q}%; top: ${$}%; opacity: 1; }
          ${(C + N - 3).toFixed(2)}%  { left: ${q}%; top: ${$}%; opacity: 0; }
        `;
          })
          .join('');
      return `@keyframes ${d}-drift-${A + 1} { ${E} 100% { opacity: 0; } }`;
    }).join(`
`),
    p = xu.map(
      (b, A) => `.${d}-p${A + 1} { animation: ${d}-drift-${A + 1} ${r}s linear infinite; }`
    ).join(`
`),
    g = `
    .${d}-slot {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
      will-change: left, top, opacity;
    }
    ${p}
    ${m}

    /* tower composite (rings + glow pulse + slow rotation) */
    @keyframes ${d}-rot   { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
    @keyframes ${d}-rot-r { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    @keyframes ${d}-pulse {
      0%, 100% { transform: scale(1);    opacity: 1; }
      50%      { transform: scale(1.08); opacity: 0.85; }
    }
    @keyframes ${d}-glow {
      0%, 100% { filter: drop-shadow(0 0 8px rgba(78,228,246,0.55)) drop-shadow(0 0 16px rgba(78,228,246,0.25)); }
      50%      { filter: drop-shadow(0 0 14px rgba(78,228,246,0.85)) drop-shadow(0 0 32px rgba(78,228,246,0.5)); }
    }
    .${d}-tower {
      position: relative;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .${d}-tower-r1 {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 1px solid var(--c-primary);
      box-shadow: var(--glow-cyan-md), inset 0 0 32px rgba(78,228,246,0.18);
      animation: ${d}-rot 18s linear infinite;
    }
    .${d}-tower-r2 {
      position: absolute;
      inset: 14px;
      border-radius: 50%;
      border: 1px dashed rgba(169,107,255,0.6);
      animation: ${d}-rot-r 24s linear infinite;
    }
    .${d}-tower-core {
      color: var(--c-primary-hi);
      animation: ${d}-pulse 3.6s var(--ease-default) infinite, ${d}-glow 3.6s var(--ease-default) infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .${d}-slot { animation: none !important; opacity: 0.55 !important; }
      .${d}-slot:not(.${d}-rm-show) { display: none; }
      .${d}-rm-show { position: relative; transform: none; left: auto; top: auto; }
      .${d}-tower-r1, .${d}-tower-r2, .${d}-tower-core { animation: none !important; }
    }
  `,
    y = u.jsxs('div', {
      className: `${d}-tower`,
      children: [
        u.jsx('div', { className: `${d}-tower-r1` }),
        u.jsx('div', { className: `${d}-tower-r2` }),
        u.jsx('div', { className: `${d}-tower-core`, children: s }),
      ],
    }),
    _ = c ? [y, ...l] : [...l];
  return u.jsxs('div', {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    'data-screen-saver-fx': d,
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: g } }),
      _.map((b, A) => {
        const N = (A % xu.length) + 1,
          E = -(A * (r / Math.max(_.length, 1)));
        return u.jsx(
          'div',
          {
            className: `${d}-slot ${d}-p${N}${A === 0 ? ` ${d}-rm-show` : ''}`,
            style: { animationDelay: `${E}s` },
            children: b,
          },
          A
        );
      }),
    ],
  });
}
function M3({ open: l, onClose: c }) {
  return l
    ? u.jsx('div', {
        className: A3.root,
        onClick: c,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (s) => {
          (s.key === 'Enter' || s.key === ' ') && c();
        },
        children: u.jsx(E3, {
          showTower: !0,
          towerContent: u.jsx(kt, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
const fl = { HP: 10, ATK: 2, SPD: 10, SPAWN_INTERVAL: 2, HP_GROWTH: 1.8, ATK_GROWTH: 1.4 };
function w3(l) {
  return l <= 10
    ? 1 + 0.074 * (l - 1)
    : l <= 20
      ? 1 + 0.074 * 9 + 0.133 * (l - 10)
      : 1 + 0.074 * 9 + 0.133 * 10 + 0.2 * (l - 20);
}
function N3(l) {
  return l <= 10
    ? 1 + 0.037 * (l - 1)
    : l <= 20
      ? 1 + 0.037 * 9 + 0.067 * (l - 10)
      : 1 + 0.037 * 9 + 0.067 * 10 + 0.1 * (l - 20);
}
function z3(l) {
  return l <= 10
    ? 1 + 0.019 * (l - 1)
    : l <= 20
      ? 1 + 0.019 * 9 + 0.033 * (l - 10)
      : 1 + 0.019 * 9 + 0.033 * 10 + 0.05 * (l - 20);
}
function C3(l) {
  let c = Q.fromNumber(fl.HP);
  for (let s = 1; s < l; s++) c = c.mulNumber(fl.HP_GROWTH);
  return c;
}
function R3(l) {
  let c = Q.fromNumber(fl.ATK);
  for (let s = 1; s < l; s++) c = c.mulNumber(fl.ATK_GROWTH);
  return c;
}
const O3 = { standard: 1, swift: 0.6, tough: 5 },
  B3 = { standard: 1, swift: 0.5, tough: 1 },
  D3 = { standard: 1, swift: 2, tough: 0.5 },
  L3 = { elite: 10, miniboss: 50, boss: 250 },
  $3 = { elite: 2.5, miniboss: 5, boss: 8 },
  H3 = {
    elite: { screw: 10, bolt: 10, alloyChance: 0.3, alloyAmount: 1 },
    miniboss: { screw: 50, bolt: 50, alloyChance: 1, alloyAmount: 1 },
    boss: { screw: 250, bolt: 250, alloyChance: 1, alloyAmount: 5 },
  },
  U3 = { standard: 1, swift: 2, tough: 5 },
  q3 = { standard: 1, swift: 2, tough: 5 };
function wh(l, c, s, r) {
  const f = C3(l),
    d = R3(l),
    m = w3(c),
    p = N3(c);
  if (s === 'normal') {
    const N = r ?? 'standard',
      E = f.mulNumber(O3[N]).mulNumber(m),
      q = d.mulNumber(B3[N]).mulNumber(p),
      $ = fl.SPD * D3[N];
    return {
      kind: 'normal',
      subtype: N,
      hp: E,
      atk: q,
      speed: $,
      reward: { screw: U3[N], bolt: q3[N], alloyChance: 0, alloyAmount: 0 },
    };
  }
  const g = s,
    y = f.mulNumber(L3[g]).mulNumber(m),
    _ = d.mulNumber($3[g]).mulNumber(p),
    b = fl.SPD,
    A = H3[g];
  return { kind: s, hp: y, atk: _, speed: b, reward: { ...A } };
}
function Nh(l, c, s, r) {
  const f = r() < 0.5 ? 0 : 100,
    d = r() * 100;
  return { ...l, id: c, spawnedAtMs: s, position: { x: f, y: d }, maxHp: l.hp };
}
const k3 = 30,
  Cu = 26;
function V3(l) {
  return l <= 4
    ? [{ subtype: 'standard', weight: 1 }]
    : l <= 9
      ? [
          { subtype: 'standard', weight: 0.7 },
          { subtype: 'swift', weight: 0.3 },
        ]
      : [
          { subtype: 'standard', weight: 0.5 },
          { subtype: 'swift', weight: 0.3 },
          { subtype: 'tough', weight: 0.2 },
        ];
}
function G3(l) {
  const c = [];
  for (let s = 1; s <= k3; s++) {
    const r = z3(s),
      f = fl.SPAWN_INTERVAL / r,
      d = V3(s);
    let m;
    (s === 5 || s === 15 || s === 25
      ? (m = 'elite')
      : s === 10 || s === 20
        ? (m = 'miniboss')
        : s === 30 && (m = 'boss'),
      c.push({
        waveIndex: s,
        tier: l,
        durationSec: Cu,
        spawnIntervalSec: f,
        normalSpawnTable: d,
        eliteKind: m,
      }));
  }
  return c;
}
function Z3(l, c, s, r, f) {
  const d = [],
    m = c / 1e3,
    p = s / 1e3,
    g = Math.floor(m / l.spawnIntervalSec),
    y = Math.floor(p / l.spawnIntervalSec),
    _ = g - y;
  for (let N = 0; N < _; N++) {
    const E = Y3(l.normalSpawnTable, r),
      q = wh(l.tier, l.waveIndex, 'normal', E);
    d.push(Nh(q, f(), c, r));
  }
  const A = l.durationSec - 1;
  if (l.eliteKind !== void 0 && p < A && m >= A) {
    const N = wh(l.tier, l.waveIndex, l.eliteKind);
    d.push(Nh(N, f(), c, r));
  }
  return d;
}
function Y3(l, c) {
  const s = c();
  let r = 0;
  for (const f of l) if (((r += f.weight), s < r)) return f.subtype;
  return l[l.length - 1].subtype;
}
const zh = 50,
  Ch = 50;
function X3(l, c, s) {
  if (l.frozenUntilMs != null && s != null && l.frozenUntilMs > s) return l;
  const r = zh - l.position.x,
    f = Ch - l.position.y,
    d = Math.sqrt(r * r + f * f);
  if (d <= 0) return l;
  const m = l.speed * c;
  if (m <= 0) return l;
  if (m >= d) return { ...l, position: { x: zh, y: Ch } };
  const p = m / d;
  return { ...l, position: { x: l.position.x + r * p, y: l.position.y + f * p } };
}
const K3 = 10,
  Q3 = 0.05,
  W3 = 1.5;
function Rh({ machineMaxHp: l }) {
  return {
    baseAttack: Q.fromNumber(K3),
    defense: Q.ZERO,
    damageReduction: 0,
    critRate: Q3,
    critMultiplier: W3,
    maxHp: l.isZero() ? Q.fromNumber(1) : l,
    hpRegen: Q.ZERO,
  };
}
function J3(l, c) {
  switch (l) {
    case 'laser':
      return Qu(c).attackPerSec;
    case 'cannon':
      return Xu(c).attackPerSec;
    case 'thunder':
      return Wu(c).attackPerSec;
    case 'cutter':
      return Ku(c).attackPerSec;
  }
}
function F3({
  weapon: l,
  weaponLv: c,
  machine: s,
  enemiesInRange: r,
  rng: f,
  cutterAngleDeg: d = 0,
  attackMul: m,
}) {
  switch (l) {
    case 'laser': {
      const p = Qu(c),
        g = { ...p, damageMul: p.damageMul * m };
      return {
        hits: c2(s, g, r, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cannon': {
      const p = Xu(c),
        g = { ...p, damageMul: p.damageMul * m };
      return {
        hits: Qb(s, g, r, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'thunder': {
      const p = Wu(c),
        g = { ...p, damageMul: p.damageMul * m };
      return {
        hits: d2(s, g, r, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cutter': {
      const p = Ku(c),
        g = { ...p, damageMul: p.damageMul * m };
      return {
        hits: a2(s, g, r, d, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
  }
}
function I3(l, c, s) {
  if (c.type !== 'onWaveClear') return null;
  const r = l.tier;
  return { boltGain: Q.fromNumber(5 * r) };
}
function P3(l, c, s) {
  if (c.type !== 'onDropRoll') return null;
  const r = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * r) / (r + 20);
  return s() >= m ? null : { dropMultiplier: 2 };
}
function t4(l, c, s) {
  return c.type !== 'onAttack' || c.enemyKind === 'normal'
    ? null
    : { damageMultiplier: 1 + 0.05 * l.tier };
}
function e4(l, c, s) {
  if (c.type !== 'onAttack') return null;
  const r = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * r) / (r + 20);
  return s() >= m ? null : { burnSec: 1 + 0.2 * r };
}
function a4(l, c, s) {
  if (c.type !== 'onHit') return null;
  const r = l.tier,
    f = 0.03,
    m = f + ((0.3 - f) * r) / (r + 20);
  return s() >= m ? null : { overrideReceivedDamage: Q.ZERO };
}
function n4(l, c, s) {
  if (c.type !== 'onAttack') return null;
  const r = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * r) / (r + 20);
  return s() >= m ? null : { extraShot: !0 };
}
function l4(l, c, s) {
  if (c.type !== 'onAttack') return null;
  const r = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * r) / (r + 20);
  return s() >= m ? null : { freeze: !0, freezeSec: 1 + 0.2 * r };
}
function i4(l, c, s) {
  if (c.type !== 'onAttack' || c.enemyKind !== 'normal') return null;
  const r = l.tier,
    f = 0.02,
    m = f + ((0.2 - f) * r) / (r + 20);
  return s() >= m ? null : { instantKill: !0 };
}
function c4(l, c, s) {
  if (c.type !== 'onKill') return null;
  const r = l.tier,
    f = Math.ceil(0.5 * r);
  return { heal: Q.fromNumber(f) };
}
function s4(l, c, s) {
  if (c.type !== 'onWaveClear') return null;
  const r = l.tier;
  return { heal: Q.fromNumber(5 * r) };
}
const o4 = {
  instantKill: i4,
  bossKiller: t4,
  doubleShot: n4,
  damageImmune: a4,
  killHeal: c4,
  shieldRegen: s4,
  bonusDrop: P3,
  boltCast: I3,
  freezeHit: l4,
  burnHit: e4,
};
function r4(l, c) {
  const s = { ...l };
  if (
    (c.damageMultiplier !== void 0 &&
      (s.damageMultiplier = (s.damageMultiplier ?? 1) + (c.damageMultiplier - 1)),
    c.instantKill && (s.instantKill = !0),
    c.overrideReceivedDamage !== void 0)
  )
    if (s.overrideReceivedDamage === void 0) s.overrideReceivedDamage = c.overrideReceivedDamage;
    else {
      const r = s.overrideReceivedDamage,
        f = c.overrideReceivedDamage;
      s.overrideReceivedDamage = r.lte(f) ? r : f;
    }
  return (
    c.heal !== void 0 && (s.heal = (s.heal ?? Q.ZERO).add(c.heal)),
    c.shieldRecover !== void 0 && (s.shieldRecover = (s.shieldRecover ?? 0) + c.shieldRecover),
    c.dropMultiplier !== void 0 &&
      (s.dropMultiplier = (s.dropMultiplier ?? 1) + (c.dropMultiplier - 1)),
    c.boltGain !== void 0 && (s.boltGain = (s.boltGain ?? Q.ZERO).add(c.boltGain)),
    c.extraShot && (s.extraShot = !0),
    c.freeze && ((s.freeze = !0), (s.freezeSec = Math.max(s.freezeSec ?? 0, c.freezeSec ?? 0))),
    c.burnSec !== void 0 && (s.burnSec = Math.max(s.burnSec ?? 0, c.burnSec)),
    s
  );
}
function mc(l, c, s) {
  let r = {};
  for (const f of l) {
    const d = o4[f.name];
    if (d === void 0) continue;
    const m = d(f, c, s);
    m !== null && (r = r4(r, m));
  }
  return r;
}
const u4 = 1;
function f4(l, c) {
  if (c) return 0;
  const s = l / 1e3;
  return Math.min(u4, Math.max(0, s));
}
function d4(l, c, s, r) {
  return l < c * 1e3 ? 'continue' : s >= r ? 'advanceTier' : 'advanceWave';
}
function m4(l, c, s, r) {
  const f = l !== c;
  return { resetElapsed: f || s !== r, resetEnemies: f };
}
const Ru = 50,
  Ou = 50;
function Oh(l) {
  const c = l.x - Ru,
    s = l.y - Ou;
  return Math.sqrt(c * c + s * s);
}
const h4 = 10,
  p4 = 5,
  y4 = 30,
  g4 = 14,
  v4 = {
    laser: 'laserShoot',
    cannon: 'cannonShoot',
    thunder: 'thunderShoot',
    cutter: 'cutterShoot',
  },
  _4 = {
    laser: 'activeLaser',
    cannon: 'activeCannon',
    thunder: 'activeThunder',
    cutter: 'activeCutter',
  },
  b4 = 0.5;
function S4({ range: l, paused: c = !1 }) {
  const s = V.useRef(c);
  s.current = c;
  const r = V.useRef(null),
    f = V.useRef(0),
    d = V.useRef(0),
    m = V.useRef(0),
    p = V.useRef([]),
    g = V.useRef(0),
    y = V.useRef(0),
    _ = V.useRef(0),
    b = V.useRef(0),
    A = V.useRef(0),
    N = V.useRef(0),
    E = V.useRef(0),
    q = V.useRef(0),
    $ = V.useRef([]),
    [J, C] = V.useState([]),
    [rt, Mt] = V.useState([]),
    [Ct, Tt] = V.useState([]),
    [it, Lt] = V.useState([]),
    [Ft, Yt] = V.useState([]),
    [Kt, Qt] = V.useState(0),
    Me = G((k) => k.isRunActive),
    ee = G((k) => k.currentTier),
    It = G((k) => k.currentWave),
    O = V.useMemo(() => G3(ee), [ee]),
    Y = V.useRef(ee),
    at = V.useRef(It);
  V.useEffect(() => {
    const k = m4(Y.current, ee, at.current, It);
    ((Y.current = ee),
      (at.current = It),
      k.resetElapsed && ((d.current = 0), (m.current = 0), Qt(0)),
      k.resetEnemies && ((p.current = []), C([]), ($.current = [])));
  }, [ee, It]);
  const bt = V.useCallback((k) => {
      Mt((X) => X.filter((nt) => nt.id !== k));
    }, []),
    At = V.useCallback((k) => {
      Tt((X) => X.filter((nt) => nt.id !== k));
    }, []),
    j = V.useCallback((k) => {
      Lt((X) => X.filter((nt) => nt.id !== k));
    }, []),
    H = V.useCallback((k) => {
      Yt((X) => X.filter((nt) => nt.id !== k));
    }, []);
  return (
    V.useEffect(() => {
      if (!Me) return;
      const k = (X) => {
        const nt = X - f.current;
        f.current = X;
        const K = G.getState(),
          vt = K.machineHp.isZero(),
          Ut = f4(nt, K.isPaused || vt || s.current);
        if (Ut > 0) {
          q.current += Ut * 1e3;
          const _t = q.current,
            Le = Array.from(K.equippedPatches.values());
          (K.tickCooldowns(Ut),
            K.isAutoActive &&
              K.activeCdSec <= 0 &&
              K.triggerActive(y4) &&
              Ht.play(_4[K.currentWeapon]),
            (m.current = d.current),
            (d.current += Ut * 1e3));
          const ya = O[K.currentWave - 1];
          if (ya != null) {
            const Aa = Z3(
              ya,
              d.current,
              m.current,
              Math.random,
              () => ((g.current += 1), `e-${K.currentTier}-${K.currentWave}-${g.current}`)
            );
            (Aa.length > 0 && (p.current = [...p.current, ...Aa]),
              (p.current = p.current.map((tt) => X3(tt, Ut, _t))),
              (p.current = p.current.map((tt) => {
                let ut = tt;
                if (ut.burnUntilMs != null && ut.burnPerSec != null && ut.burnUntilMs > _t) {
                  const qt = ut.burnPerSec.mulNumber(Ut);
                  ut = { ...ut, hp: ut.hp.sub(qt) };
                }
                const St = {};
                return (
                  ut.frozenUntilMs != null && ut.frozenUntilMs <= _t && (St.frozenUntilMs = void 0),
                  ut.burnUntilMs != null &&
                    ut.burnUntilMs <= _t &&
                    ((St.burnUntilMs = void 0), (St.burnPerSec = void 0)),
                  Object.keys(St).length > 0 && (ut = { ...ut, ...St }),
                  ut
                );
              })));
            const Ea = [];
            $.current = $.current.filter((tt) => (tt.applyAtMs <= _t ? (Ea.push(tt), !1) : !0));
            const Ye = [];
            if (Ea.length > 0) {
              const tt = new Map(Ea.map((ut) => [ut.enemyId, ut]));
              p.current = p.current.map((ut) => {
                const St = tt.get(ut.id);
                if (St == null) return ut;
                let qt = { ...ut, hp: ut.hp.sub(St.damage) };
                if (St.freeze && St.freezeSec != null && St.freezeSec > 0) {
                  const Vt = _t + St.freezeSec * 1e3;
                  qt = { ...qt, frozenUntilMs: Math.max(qt.frozenUntilMs ?? 0, Vt) };
                }
                if (St.burnSec != null && St.burnSec > 0) {
                  const Vt = _t + St.burnSec * 1e3,
                    ne = St.damage.mulNumber(0.3),
                    wt = qt.burnPerSec;
                  qt = {
                    ...qt,
                    burnUntilMs: Math.max(qt.burnUntilMs ?? 0, Vt),
                    burnPerSec: wt != null && wt.gt(ne) ? wt : ne,
                  };
                }
                return qt;
              });
              for (const ut of Ea) {
                const St = p.current.find((qt) => qt.id === ut.enemyId);
                ((b.current += 1),
                  Ye.push({
                    id: `de-${b.current}`,
                    x: (St == null ? void 0 : St.position.x) ?? 50,
                    y: (St == null ? void 0 : St.position.y) ?? 50,
                    value: ut.damage,
                    crit: ut.crit,
                  }));
              }
            }
            const Bn = K.runWorkshopLevels.attackMul,
              Dn = K.runWorkshopLevels.attackSpeedMul,
              di = rl(Bn),
              hl = rl(Dn),
              Ln = J3(K.currentWeapon, K.weaponLv),
              Fa = Math.min(h4, Ln * hl),
              Ma = Fa > 0 ? 1e3 / Fa : 1 / 0;
            y.current += Ut * 1e3;
            let pl = 0;
            const mi = 10,
              de = [],
              ga = [];
            for (; y.current >= Ma && pl < mi; ) {
              const tt = K.currentWeapon === 'cutter' ? g4 : l,
                ut = p.current
                  .map((Vt) => ({ enemy: Vt, dist: Oh(Vt.position) }))
                  .filter(({ dist: Vt }) => Vt <= tt)
                  .sort((Vt, ne) => Vt.dist - ne.dist)
                  .map(({ enemy: Vt }) => Vt);
              if (ut.length === 0) {
                y.current = Math.min(y.current, Ma);
                break;
              }
              ((y.current -= Ma), (pl += 1), Ht.play(v4[K.currentWeapon]));
              const St = Rh({ machineMaxHp: K.machineMaxHp }),
                qt = F3({
                  weapon: K.currentWeapon,
                  weaponLv: K.weaponLv,
                  machine: St,
                  enemiesInRange: ut,
                  rng: Math.random,
                  cutterAngleDeg: _.current,
                  attackMul: di,
                });
              if (qt.hits.length > 0) {
                const Vt = qt.hits.map((wt) => {
                  const ft = p.current.find((Na) => Na.id === wt.enemyId);
                  if (ft == null) return { ...wt, freeze: !1, freezeSec: void 0, burnSec: void 0 };
                  const Rt = mc(Le, { type: 'onAttack', enemyKind: ft.kind }, Math.random);
                  let le = wt.damage;
                  return (
                    Rt.damageMultiplier != null &&
                      Rt.damageMultiplier !== 1 &&
                      (le = le.mulNumber(Rt.damageMultiplier)),
                    Rt.extraShot && (le = le.add(wt.damage)),
                    Rt.instantKill && (le = ft.hp),
                    {
                      ...wt,
                      damage: le,
                      freeze: Rt.freeze === !0,
                      freezeSec: Rt.freezeSec,
                      burnSec: Rt.burnSec,
                    }
                  );
                });
                if (K.currentWeapon === 'cannon')
                  for (const ft of Vt)
                    $.current.push({
                      enemyId: ft.enemyId,
                      damage: ft.damage,
                      crit: ft.crit ?? !1,
                      freeze: ft.freeze,
                      freezeSec: ft.freezeSec,
                      burnSec: ft.burnSec,
                      applyAtMs: _t + 480,
                    });
                else {
                  const wt = new Map(Vt.map((ft) => [ft.enemyId, ft]));
                  p.current = p.current.map((ft) => {
                    const Rt = wt.get(ft.id);
                    if (Rt == null) return ft;
                    let le = { ...ft, hp: ft.hp.sub(Rt.damage) };
                    if (Rt.freeze && Rt.freezeSec != null && Rt.freezeSec > 0) {
                      const Na = _t + Rt.freezeSec * 1e3;
                      le = { ...le, frozenUntilMs: Math.max(le.frozenUntilMs ?? 0, Na) };
                    }
                    if (Rt.burnSec != null && Rt.burnSec > 0) {
                      const Na = _t + Rt.burnSec * 1e3,
                        Ia = Rt.damage.mulNumber(0.3),
                        pi = le.burnPerSec;
                      le = {
                        ...le,
                        burnUntilMs: Math.max(le.burnUntilMs ?? 0, Na),
                        burnPerSec: pi != null && pi.gt(Ia) ? pi : Ia,
                      };
                    }
                    return le;
                  });
                  for (const ft of Vt) {
                    const Rt = p.current.find((le) => le.id === ft.enemyId);
                    ((b.current += 1),
                      de.push({
                        id: `de-${b.current}`,
                        x: (Rt == null ? void 0 : Rt.position.x) ?? 50,
                        y: (Rt == null ? void 0 : Rt.position.y) ?? 50,
                        value: ft.damage,
                        crit: ft.crit,
                      }));
                  }
                }
                const ne = Vt.map((wt) => p.current.find((ft) => ft.id === wt.enemyId))
                  .filter((wt) => wt != null)
                  .map((wt) => ({ x: wt.position.x, y: wt.position.y }));
                if (K.currentWeapon === 'laser')
                  for (const wt of ne)
                    ((N.current += 1),
                      ga.push({
                        id: `pj-${N.current}`,
                        kind: 'laser',
                        x1: Ru,
                        y1: Ou,
                        x2: wt.x,
                        y2: wt.y,
                      }));
                else if (K.currentWeapon === 'cannon')
                  for (const ft of ne)
                    ((N.current += 1),
                      ga.push({
                        id: `pj-${N.current}`,
                        kind: 'cannonShell',
                        x1: Ru,
                        y1: Ou,
                        x2: ft.x,
                        y2: ft.y,
                        durationMs: 480,
                      }),
                      (N.current += 1),
                      ga.push({
                        id: `pj-${N.current}`,
                        kind: 'blast',
                        x: ft.x,
                        y: ft.y,
                        delayMs: 480,
                      }));
                else if (K.currentWeapon === 'thunder' && ne.length > 0)
                  for (const ft of ne)
                    ((N.current += 1),
                      ga.push({
                        id: `pj-${N.current}`,
                        kind: 'thunderStrike',
                        x: ft.x,
                        y: ft.y,
                        durationMs: 320,
                      }));
              }
            }
            const $n = [...de, ...Ye];
            ($n.length > 0 && Mt((tt) => [...tt, ...$n]),
              ga.length > 0 && Lt((tt) => [...tt, ...ga]));
            const yl = rl(K.runWorkshopLevels.screwGainMul),
              ia = [],
              va = [],
              Hn = [];
            let wa = Q.ZERO,
              I = Q.ZERO,
              we = Q.ZERO,
              ae = Q.ZERO;
            for (const tt of p.current)
              if (tt.hp.lte(Q.ZERO)) {
                ((A.current += 1),
                  ia.push({ id: `dh-${A.current}`, x: tt.position.x, y: tt.position.y }));
                const ut = mc(Le, { type: 'onKill', enemyKind: tt.kind }, Math.random);
                ut.heal != null && (ae = ae.add(ut.heal));
                const qt =
                    mc(
                      Le,
                      {
                        type: 'onDropRoll',
                        baseDrops: {
                          screw: tt.reward.screw,
                          bolt: tt.reward.bolt,
                          alloy: tt.reward.alloyAmount,
                        },
                      },
                      Math.random
                    ).dropMultiplier ?? 1,
                  Vt = tt.reward.screw;
                Vt > 0 &&
                  ((wa = wa.add(Q.fromNumber(Vt * yl * qt))),
                  (E.current += 1),
                  va.push({
                    id: `pk-${E.current}`,
                    x: tt.position.x,
                    y: tt.position.y,
                    iconName: 'screw',
                  }));
                const ne = tt.reward.bolt;
                (ne > 0 &&
                  (tt.kind !== 'normal' || Math.random() < b4) &&
                  ((I = I.add(Q.fromNumber(ne * qt))),
                  (E.current += 1),
                  va.push({
                    id: `pk-${E.current}`,
                    x: tt.position.x,
                    y: tt.position.y,
                    iconName: 'bolt',
                  })),
                  tt.reward.alloyChance > 0 &&
                    tt.reward.alloyAmount > 0 &&
                    Math.random() < tt.reward.alloyChance &&
                    ((we = we.add(Q.fromNumber(tt.reward.alloyAmount * qt))),
                    (E.current += 1),
                    va.push({
                      id: `pk-${E.current}`,
                      x: tt.position.x,
                      y: tt.position.y,
                      iconName: 'alloy',
                    })),
                  Ht.play(tt.kind === 'boss' || tt.kind === 'miniboss' ? 'bossKill' : 'enemyKill'));
              } else Hn.push(tt);
            (ae.isZero() || K.setMachineHp(K.machineHp.add(ae)),
              ia.length > 0 && ((p.current = Hn), Tt((tt) => [...tt, ...ia])),
              va.length > 0 && Yt((tt) => [...tt, ...va]),
              wa.isZero() || K.addScrew(wa),
              I.isZero() || K.addBolt(I),
              we.isZero() || K.addAlloy(we));
            const _a = Rh({ machineMaxHp: K.machineMaxHp });
            let ue = Q.ZERO;
            for (const tt of p.current)
              if (Oh(tt.position) <= p4) {
                const ut = kb(tt.atk, _a);
                ue = ue.add(ut.mulNumber(Ut));
              }
            if (!ue.isZero()) {
              const ut =
                mc(Le, { type: 'onHit', receivedDamage: ue }, Math.random).overrideReceivedDamage ??
                ue;
              if (!ut.isZero()) {
                const St = K.machineHp;
                K.damageHp(ut);
                const qt = G.getState().machineHp;
                Ht.play(qt.isZero() && !St.isZero() ? 'machineDown' : 'machineHit');
              }
            }
            const hi = d4(d.current, ya.durationSec, K.currentWave, O.length);
            if (hi === 'advanceWave' || hi === 'advanceTier') {
              const tt = mc(Le, { type: 'onWaveClear' }, Math.random);
              (tt.heal != null && !tt.heal.isZero() && K.setMachineHp(K.machineHp.add(tt.heal)),
                tt.boltGain != null && !tt.boltGain.isZero() && K.addBolt(tt.boltGain),
                hi === 'advanceWave'
                  ? (K.advanceWave(), Ht.play('waveClear'))
                  : (K.advanceTier(), Ht.play('tierClear')));
            }
          }
        }
        (C(p.current), Qt(d.current / 1e3), (r.current = requestAnimationFrame(k)));
      };
      return (
        (f.current = performance.now()),
        (r.current = requestAnimationFrame(k)),
        () => {
          r.current != null && (cancelAnimationFrame(r.current), (r.current = null));
        }
      );
    }, [Me, O, l]),
    {
      enemies: J,
      damageEvents: rt,
      deathEvents: Ct,
      projectileEvents: it,
      pickupEvents: Ft,
      waveElapsedSec: Kt,
      onDamageDone: bt,
      onDeathDone: At,
      onProjectileDone: j,
      onPickupDone: H,
    }
  );
}
const Bh = 30,
  Dh = 30;
function x4(l, c) {
  return l && c.lte(Q.ZERO) ? 'gameover' : null;
}
function j4() {
  const { navigate: l } = Rn(),
    c = G((I) => I.isRunActive),
    s = G((I) => I.screw),
    r = G((I) => I.bolt),
    f = G((I) => I.alloy),
    d = G((I) => I.runStartBolt),
    m = G((I) => I.runStartAlloy),
    p = G((I) => I.machineHp),
    g = G((I) => I.machineMaxHp),
    y = G((I) => I.currentTier),
    _ = G((I) => I.currentWave),
    b = G((I) => I.currentWeapon),
    A = G((I) => I.activeCdSec),
    N = G((I) => I.isAutoActive),
    E = G((I) => I.isPaused),
    q = G((I) => I.runWorkshopLevels),
    $ = G((I) => I.bgmVolume),
    J = G((I) => I.seVolume),
    C = G((I) => I.setBgmVolume),
    rt = G((I) => I.setSeVolume),
    Mt = G((I) => I.setAutoActive),
    Ct = G((I) => I.switchWeapon),
    Tt = G((I) => I.setPaused),
    it = G((I) => I.upgradeRunWorkshop),
    Lt = G((I) => I.triggerActive),
    [Ft, Yt] = V.useState(!1),
    [Kt, Qt] = V.useState(!1),
    [Me, ee] = V.useState(!1),
    [It, O] = V.useState(!1);
  (V.useEffect(() => {
    c && O(!0);
  }, [c]),
    V.useEffect(() => {
      _ === 30 ? Ht.playBgm('battleBoss') : Ht.playBgm('battleNormal');
    }, [_]));
  const Y = V.useRef(_),
    [at, bt] = V.useState(null);
  V.useEffect(() => {
    (Y.current !== _ && bt((I) => (I ?? 0) + 1), (Y.current = _));
  }, [_]);
  const At = x4(c, p),
    [j, H] = V.useState(null),
    k = j ?? At,
    X = k !== null,
    {
      enemies: nt,
      damageEvents: K,
      deathEvents: vt,
      projectileEvents: Ut,
      pickupEvents: _t,
      waveElapsedSec: Le,
      onDamageDone: ya,
      onDeathDone: Aa,
      onProjectileDone: Ea,
      onPickupDone: Ye,
    } = S4({ range: Dh, paused: X }),
    Bn = Math.max(0, Cu - Le),
    Dn = [],
    di = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    hl = p,
    Ln = g.isZero() ? Q.fromNumber(1) : g,
    Fa = () => {
      (Tt(!E), Ht.play('tap'));
    },
    Ma = () => {
      (Qt(!0), Ht.play('dialogOpen'));
    },
    pl = () => {
      (ee(!0), Ht.play('dialogOpen'));
    },
    mi = () => {
      (Qt(!1), H('retreat'), Ht.play('resultRetreat'));
    },
    de = () => {
      l('preparation');
    },
    ga = (I, we) => {
      const ae = it(I, we);
      Ht.play(ae ? 'purchaseOk' : 'reject');
    },
    $n = (I) => {
      (Ct(I), Ht.play('weaponSwitch'));
    },
    yl = () => {
      if (!Lt(Bh)) {
        Ht.play('reject');
        return;
      }
      const we =
        b === 'laser'
          ? 'activeLaser'
          : b === 'cannon'
            ? 'activeCannon'
            : b === 'thunder'
              ? 'activeThunder'
              : 'activeCutter';
      Ht.play(we);
    },
    ia = r.sub(d),
    va = f.sub(m),
    Hn = { bolt: ia.lt(Q.ZERO) ? Q.ZERO : ia, alloy: va.lt(Q.ZERO) ? Q.ZERO : va, patches: [] },
    wa = 30;
  return u.jsxs('div', {
    className: Su.root,
    children: [
      u.jsx(dl, {
        noScroll: !0,
        variant: 'battle',
        header: u.jsx(b5, {
          hpCurrent: hl,
          hpMax: Ln,
          tier: y,
          wave: _,
          totalWaves: wa,
          secondsRemaining: Bn,
          secondsTotal: Cu,
          isBossWave: _ === wa,
          paused: E || X,
        }),
        footer: u.jsxs('div', {
          className: Su.battleFooter,
          children: [
            u.jsx(j3, {
              open: Ft,
              screw: s,
              levels: q,
              onUpgrade: ga,
              onClose: () => {
                Yt(!1);
              },
            }),
            u.jsx(Vx, {
              screw: s,
              equippedWeapon: b,
              weaponCds: di,
              activeCd: A,
              activeMax: Bh,
              isAutoActive: N,
              onSwitchWeapon: $n,
              onActivate: yl,
              onToggleAuto: Mt,
              isPaused: E,
              onTogglePause: Fa,
              onOpenMenu: Ma,
              onOpenScreenSaver: pl,
              isWorkshopOpen: Ft,
              onToggleWorkshop: () => {
                Yt((I) => !I);
              },
            }),
          ],
        }),
        children: u.jsx(cx, {
          enemies: nt,
          damageEvents: K,
          hitEvents: Dn,
          deathEvents: vt,
          projectileEvents: Ut,
          pickupEvents: _t,
          onDamageDone: ya,
          onDeathDone: Aa,
          onProjectileDone: Ea,
          onPickupDone: Ye,
          showCutterOrbit: b === 'cutter' && c && !E && !X,
          range: Dh,
        }),
      }),
      u.jsxs('div', {
        className: Su.overlayLayer,
        'aria-live': 'polite',
        children: [
          u.jsx(e3, {
            open: Kt,
            bgmVolume: $,
            seVolume: J,
            onBgmChange: C,
            onSeChange: rt,
            onRetreat: mi,
            onClose: () => {
              Qt(!1);
            },
          }),
          X &&
            u.jsx(g3, {
              open: X,
              status: k,
              reachedTier: y,
              reachedWave: _,
              killed: 0,
              elapsedSec: 0,
              reward: Hn,
              onClose: de,
            }),
          u.jsx(M3, {
            open: Me,
            onClose: () => {
              ee(!1);
            },
          }),
          It &&
            u.jsx(oS, {
              kind: 'battle-start',
              onDone: () => {
                O(!1);
              },
            }),
          at != null &&
            u.jsx(
              rS,
              {
                waveNumber: _,
                onDone: () => {
                  bt(null);
                },
              },
              at
            ),
        ],
      }),
    ],
  });
}
const T4 = '_root_1420p_3',
  A4 = { root: T4 };
function E4() {
  const l = G((f) => f.machineLevels),
    c = G((f) => f.bolt),
    s = G((f) => f.incrementMachineLv),
    r = G((f) => f.spendBolt);
  return u.jsx('div', {
    className: A4.root,
    children: Ws.map((f) => {
      const d = l[f.key],
        m = f.maxLv != null && d >= f.maxLv,
        p = Sc(f, d),
        g = Sc(f, d + 1),
        y = (Yt) => (f.unit === '%' ? Math.round(Yt * 1e3) / 10 : Yt),
        _ = y(p),
        b = y(g),
        A = Yu(f, d),
        N = vu(f, d, 5),
        E = Q.fromNumber(A),
        q = Q.fromNumber(N),
        $ = qb(f, d, c),
        J = f.maxLv != null ? f.maxLv - d : Number.POSITIVE_INFINITY,
        C = Math.min($, J),
        rt = C > 0 ? vu(f, d, C) : A,
        Mt = Q.fromNumber(rt),
        Ct = c.lt(E),
        Tt = c.lt(q) || (f.maxLv != null && d + 5 > f.maxLv),
        it = C < 1,
        Lt = m
          ? []
          : [
              { amount: '+1', cost: E, disabled: Ct },
              { amount: '+5', cost: q, disabled: Tt },
              { amount: 'MAX', cost: Mt, disabled: it },
            ],
        Ft = (Yt) => {
          if (m) return;
          let Kt = 0;
          if ((Yt === '+1' ? (Kt = 1) : Yt === '+5' ? (Kt = 5) : Yt === 'MAX' && (Kt = C), Kt < 1))
            return;
          f.maxLv != null && (Kt = Math.min(Kt, f.maxLv - d));
          const Qt = vu(f, d, Kt),
            Me = Q.fromNumber(Qt);
          if (r(Me)) for (let It = 0; It < Kt; It++) s(f.key);
        };
      return u.jsx(
        Ju,
        {
          title: f.title,
          iconName: f.iconName,
          currentLabel: `Lv ${d}`,
          before: _,
          after: m ? void 0 : b,
          beforeSuffix: f.unit ?? '',
          currency: 'bolt',
          accent: 'primary',
          maxed: m,
          options: Lt,
          onUpgrade: Ft,
        },
        f.key
      );
    }),
  });
}
function M4() {
  const { navigate: l } = Rn(),
    c = (s) => {
      l(s);
    };
  return u.jsx(dl, {
    header: u.jsx(Tc, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: u.jsx(jc, { active: 'machine', onChange: c }),
    children: u.jsx(E4, {}),
  });
}
const w4 = () => u.jsx('div', { children: u.jsx('h1', { children: 'Not Found' }) }),
  N4 = '_content_9srrg_1',
  z4 = { content: N4 },
  C4 = '_root_1l9jp_1',
  R4 = '_header_1l9jp_8',
  O4 = '_headerTitleRow_1l9jp_15',
  B4 = '_headerCount_1l9jp_21',
  D4 = '_slotGrid_1l9jp_35',
  L4 = '_emptyHint_1l9jp_41',
  ii = { root: C4, header: R4, headerTitleRow: O4, headerCount: B4, slotGrid: D4, emptyHint: L4 },
  $4 = '_wrapper_16mrg_3',
  H4 = '_filled_16mrg_16',
  U4 = '_empty_16mrg_25',
  q4 = '_locked_16mrg_26',
  k4 = '_slotInner_16mrg_59',
  V4 = '_emptyIcon_16mrg_67',
  G4 = '_emptyLabel_16mrg_74',
  wn = {
    wrapper: $4,
    filled: H4,
    empty: U4,
    locked: q4,
    slotInner: k4,
    emptyIcon: V4,
    emptyLabel: G4,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  },
  Z4 = '_root_12m2l_3',
  Y4 = '_selected_12m2l_15',
  X4 = '_merging_12m2l_19',
  K4 = '_locked_12m2l_23',
  Q4 = '_disabled_12m2l_28',
  W4 = '_card_12m2l_34',
  J4 = '_tierBadge_12m2l_46',
  F4 = '_count_12m2l_54',
  I4 = '_countZero_12m2l_74',
  P4 = '_iconWrap_12m2l_79',
  tj = '_name_12m2l_90',
  ej = '_detail_12m2l_102',
  aj = '_trigger_12m2l_110',
  nj = '_effect_12m2l_121',
  lj = '_mergingBadge_12m2l_133',
  je = {
    root: Z4,
    selected: Y4,
    merging: X4,
    locked: K4,
    disabled: Q4,
    card: W4,
    tierBadge: J4,
    count: F4,
    countZero: I4,
    iconWrap: P4,
    name: tj,
    detail: ej,
    trigger: aj,
    effect: nj,
    mergingBadge: lj,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  ij = { sm: 22, md: 26, lg: 32 },
  Lh = { sm: 38, md: 44, lg: 52 };
function Pu({
  name: l,
  iconName: c,
  tier: s,
  count: r,
  trigger: f,
  effect: d,
  selected: m = !1,
  merging: p = !1,
  locked: g = !1,
  disabled: y = !1,
  size: _ = 'md',
  onClick: b,
}) {
  const A = Math.min(Math.max(1, Math.floor(s)), 5),
    N = `var(--c-patch-t${A})`,
    E = b != null && !y && !g,
    q = m ? { boxShadow: 'var(--glow-cyan-md)' } : p ? { boxShadow: 'var(--glow-purple-md)' } : {},
    $ = {
      width: Lh[_],
      height: Lh[_],
      opacity: g ? 0.35 : 1,
      background: g ? 'var(--c-surface)' : `linear-gradient(135deg, ${N}22, ${N}08)`,
      border: g ? '1px solid var(--c-border-faint)' : `1px solid ${N}55`,
      filter: g ? 'none' : `drop-shadow(0 0 4px ${N}55)`,
    },
    J = {
      background: r >= 2 ? `${N}22` : void 0,
      borderColor: r >= 2 ? N : void 0,
      color: r >= 2 ? N : void 0,
    };
  return u.jsx('div', {
    className: [
      je.root,
      m ? je.selected : '',
      p ? je.merging : '',
      g ? je.locked : '',
      y ? je.disabled : '',
      je[`size-${_}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: q,
    onClick: E ? b : void 0,
    role: E ? 'button' : void 0,
    tabIndex: E ? 0 : void 0,
    onKeyDown: E
      ? (C) => {
          (C.key === 'Enter' || C.key === ' ') && (C.preventDefault(), b == null || b());
        }
      : void 0,
    'aria-pressed': E ? m : void 0,
    'aria-disabled': y || g ? !0 : void 0,
    children: u.jsxs(ml, {
      variant: 'elevated',
      padding: 'sm',
      interactive: E,
      className: je.card,
      children: [
        !g &&
          u.jsx('span', {
            className: je.tierBadge,
            children: u.jsx(Ac, { text: `T${A}`, variant: 'patch-tier', tier: s }),
          }),
        u.jsxs('span', {
          className: [je.count, r === 0 ? je.countZero : ''].filter(Boolean).join(' '),
          style: J,
          children: ['×', g ? '?' : r],
        }),
        u.jsx('div', {
          className: je.iconWrap,
          style: $,
          children: u.jsx(kt, {
            name: g ? 'close' : c,
            size: ij[_],
            color: g ? 'var(--c-text-disabled)' : N,
          }),
        }),
        u.jsx(Z, {
          variant: 'caption',
          color: g ? 'dim' : 'text',
          className: je.name,
          children: g ? '???' : l,
        }),
        !g &&
          u.jsxs('div', {
            className: je.detail,
            children: [
              u.jsx('span', { className: je.trigger, children: f }),
              u.jsx('span', { className: je.effect, children: d }),
            ],
          }),
        p && u.jsx('span', { className: je.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
function g1({ patch: l = null, slotIndex: c, locked: s = !1, size: r = 'md', onClick: f }) {
  const d = l != null,
    m = f != null && !s,
    p = c != null ? `Slot ${c}` : '',
    g = d
      ? `Slot ${c ?? ''}: ${l.name} (Tier ${l.tier})`
      : s
        ? `Slot ${c ?? ''} (locked)`.trim()
        : `Slot ${c ?? ''} (empty)`.trim(),
    y = d ? wn.filled : s ? wn.locked : wn.empty;
  return u.jsx('div', {
    className: [wn.wrapper, y, wn[`size-${r}`]].filter(Boolean).join(' '),
    role: m ? 'button' : void 0,
    tabIndex: m ? 0 : void 0,
    'aria-label': g,
    'aria-disabled': s ? !0 : void 0,
    onClick: m ? f : void 0,
    onKeyDown: m
      ? (_) => {
          (_.key === 'Enter' || _.key === ' ') && (_.preventDefault(), f == null || f());
        }
      : void 0,
    children:
      d && l != null
        ? u.jsx(Pu, {
            patchId: l.patchId,
            name: l.name,
            iconName: l.iconName,
            tier: l.tier,
            count: l.count,
            trigger: l.trigger,
            effect: l.effect,
            size: r,
          })
        : u.jsxs('div', {
            className: wn.slotInner,
            children: [
              u.jsx('span', {
                className: wn.emptyIcon,
                children: u.jsx(kt, {
                  name: s ? 'close' : 'plus',
                  size: 28,
                  color: s ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              u.jsx('span', { className: wn.emptyLabel, children: s ? 'LOCKED' : p }),
            ],
          }),
  });
}
function cj(l) {
  return Math.min(1 + l, ri);
}
const sj = {
    instantKill: 'skull',
    bossKiller: 'skull',
    doubleShot: 'lightning',
    damageImmune: 'shield',
    killHeal: 'heart',
    shieldRegen: 'shield',
    bonusDrop: 'star',
    boltCast: 'lightning',
    freezeHit: 'ice',
    burnHit: 'flame',
  },
  oj = {
    instantKill: 'HP25%↓',
    bossKiller: 'ボス時',
    doubleShot: '射撃時',
    damageImmune: '常時',
    killHeal: '撃破時',
    shieldRegen: '常時',
    bonusDrop: '撃破時',
    boltCast: '射撃時',
    freezeHit: 'クリ時',
    burnHit: '貫通時',
  },
  rj = {
    instantKill: '即死',
    bossKiller: '攻撃+50%',
    doubleShot: '2連射',
    damageImmune: '被ダメ-5%',
    killHeal: 'HP+1',
    shieldRegen: 'シールド再生',
    bonusDrop: 'ドロップ+',
    boltCast: 'ボルト獲得',
    freezeHit: '2秒凍結',
    burnHit: '周囲焼夷',
  };
function uj({ overridePatches: l, overrideEquipped: c, overridePatchSlotsLv: s }) {
  const r = G((E) => E.patches),
    f = G((E) => E.equippedPatches),
    d = G((E) => E.machineLevels.patchSlots),
    m = G((E) => E.unequipPatch),
    p = l ?? r,
    g = c ?? f,
    _ = cj(s ?? d),
    b = (E) => {
      const q = g.get(E);
      if (!q) return null;
      const $ = `${q.name}#${q.tier}`,
        J = p.get($);
      return {
        patchId: $,
        name: q.name,
        iconName: sj[q.name] ?? 'spark',
        tier: q.tier,
        trigger: oj[q.name] ?? '常時',
        effect: rj[q.name] ?? '-',
        count: (J == null ? void 0 : J.count) ?? 0,
      };
    },
    A = (E) => {
      g.get(E) && m(E);
    },
    N = ri - _;
  return u.jsxs('div', {
    className: ii.root,
    children: [
      u.jsxs('div', {
        className: ii.header,
        children: [
          u.jsxs('div', {
            className: ii.headerTitleRow,
            children: [
              u.jsx(Z, { variant: 'heading-3', children: '装着スロット' }),
              u.jsxs(Z, {
                variant: 'caption',
                color: 'mid',
                className: ii.headerCount,
                children: [g.size, '/', _],
              }),
            ],
          }),
          u.jsxs(Z, {
            variant: 'caption',
            color: 'dim',
            children: ['(', ri, ' スロット中 ', N, ' ロック・', g.size, ' / ', _, ' ', '装着中)'],
          }),
        ],
      }),
      u.jsx('div', {
        className: ii.slotGrid,
        children: Array.from({ length: ri }, (E, q) => {
          const $ = q >= _,
            J = $ ? null : b(q);
          return u.jsx(
            g1,
            { slotIndex: q + 1, patch: J, locked: $, size: 'md', onClick: $ ? void 0 : () => A(q) },
            q
          );
        }),
      }),
      g.size === 0 &&
        _ > 0 &&
        u.jsx(Z, {
          variant: 'caption',
          color: 'dim',
          className: ii.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const fj = '_root_16zq4_1',
  dj = '_header_16zq4_8',
  mj = '_grid_16zq4_14',
  hj = '_empty_16zq4_20',
  hc = { root: fj, header: dj, grid: mj, empty: hj },
  pj = {
    instantKill: 'skull',
    bossKiller: 'skull',
    doubleShot: 'lightning',
    damageImmune: 'shield',
    killHeal: 'heart',
    shieldRegen: 'shield',
    bonusDrop: 'star',
    boltCast: 'lightning',
    freezeHit: 'ice',
    burnHit: 'flame',
  },
  yj = {
    instantKill: 'HP25%↓',
    bossKiller: 'ボス時',
    doubleShot: '射撃時',
    damageImmune: '常時',
    killHeal: '撃破時',
    shieldRegen: '常時',
    bonusDrop: '撃破時',
    boltCast: '射撃時',
    freezeHit: 'クリ時',
    burnHit: '貫通時',
  },
  gj = {
    instantKill: '即死',
    bossKiller: '攻撃+50%',
    doubleShot: '2連射',
    damageImmune: '被ダメ-5%',
    killHeal: 'HP+1',
    shieldRegen: 'シールド再生',
    bonusDrop: 'ドロップ+',
    boltCast: 'ボルト獲得',
    freezeHit: '2秒凍結',
    burnHit: '周囲焼夷',
  };
function vj({ overridePatches: l, overrideEquipped: c, selectedId: s, onSelect: r }) {
  const f = G((_) => _.patches),
    d = G((_) => _.equippedPatches),
    m = l ?? f,
    p = c ?? d,
    g = new Set(Array.from(p.values()).map((_) => _.name)),
    y = Array.from(m.values());
  return y.length === 0
    ? u.jsx('div', {
        className: hc.root,
        children: u.jsx('div', {
          className: hc.empty,
          children: u.jsx(Z, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : u.jsxs('div', {
        className: hc.root,
        children: [
          u.jsxs('div', {
            className: hc.header,
            children: [
              u.jsx(Z, { variant: 'heading-3', children: 'パッチ在庫' }),
              u.jsxs(Z, { variant: 'caption', color: 'dim', children: [y.length, ' 種類'] }),
            ],
          }),
          u.jsx('div', {
            className: hc.grid,
            children: y.map((_) => {
              const b = `${_.name}#${_.tier}`,
                A = g.has(_.name);
              return u.jsx(
                Pu,
                {
                  patchId: b,
                  name: _.name,
                  iconName: pj[_.name] ?? 'spark',
                  tier: _.tier,
                  count: _.count,
                  trigger: yj[_.name] ?? '常時',
                  effect: gj[_.name] ?? '-',
                  selected: s === b,
                  locked: A,
                  onClick: r ? () => r(s === b ? null : b) : void 0,
                },
                b
              );
            }),
          }),
        ],
      });
}
const _j = '_root_1svx2_1',
  bj = '_header_1svx2_8',
  Sj = '_tierControl_1svx2_14',
  xj = '_tierStepperRow_1svx2_24',
  jj = '_mergeList_1svx2_30',
  Tj = '_empty_1svx2_36',
  ci = { root: _j, header: bj, tierControl: Sj, tierStepperRow: xj, mergeList: jj, empty: Tj },
  Aj = '_stepper_1ouvh_1',
  Ej = '_disabled_1ouvh_6',
  Mj = '_btn_1ouvh_11',
  wj = '_value_1ouvh_38',
  si = {
    stepper: Aj,
    disabled: Ej,
    btn: Mj,
    value: wj,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  Nj = ({
    value: l,
    min: c,
    max: s,
    step: r = 1,
    onChange: f,
    size: d = 'md',
    disabled: m = !1,
  }) => {
    const p = l - r >= c,
      g = l + r <= s,
      y = () => {
        m || !p || f(Math.max(c, l - r));
      },
      _ = () => {
        m || !g || f(Math.min(s, l + r));
      };
    return u.jsxs('div', {
      className: [si.stepper, si[`size-${d}`], m ? si.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        u.jsx('button', {
          type: 'button',
          className: si.btn,
          onClick: y,
          disabled: m || !p,
          'aria-label': '減少',
          children: '−',
        }),
        u.jsx('span', {
          className: si.value,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          children: l,
        }),
        u.jsx('button', {
          type: 'button',
          className: si.btn,
          onClick: _,
          disabled: m || !g,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  Bu = 5,
  zj = {
    instantKill: 'skull',
    bossKiller: 'skull',
    doubleShot: 'lightning',
    damageImmune: 'shield',
    killHeal: 'heart',
    shieldRegen: 'shield',
    bonusDrop: 'star',
    boltCast: 'lightning',
    freezeHit: 'ice',
    burnHit: 'flame',
  };
function v1(l, c) {
  const s = [];
  for (const r of l.values())
    r.tier < c &&
      r.count >= 2 &&
      s.push({ name: r.name, tier: r.tier, count: r.count, iconName: zj[r.name] ?? 'spark' });
  return s.sort((r, f) => r.tier - f.tier || r.name.localeCompare(f.name));
}
function Cj(l, c) {
  let s = new Map(l),
    r = !0;
  for (; r; ) {
    r = !1;
    for (const f of Array.from(s.values())) {
      if (f.tier >= c || f.count < 2 || f.tier >= Bu) continue;
      const d = `${f.name}#${f.tier}`,
        m = Math.floor(f.count / 2),
        p = f.count % 2,
        g = f.tier + 1,
        y = `${f.name}#${g}`,
        _ = s.get(y),
        b = ((_ == null ? void 0 : _.count) ?? 0) + m;
      ((s = new Map(s)),
        p === 0 ? s.delete(d) : s.set(d, { ...f, count: p }),
        s.set(y, { name: f.name, tier: g, count: b }),
        (r = !0));
    }
  }
  return s;
}
function Rj({ overridePatches: l }) {
  const c = G((A) => A.patches),
    s = G((A) => A.addPatch),
    r = G((A) => A.consumePatch),
    f = G((A) => A.pruneEmptyPatches),
    d = l ?? c,
    m = Math.max(1, ...Array.from(d.values()).map((A) => A.tier)),
    [p, g] = V.useState(Math.min(m, Bu - 1)),
    y = v1(d, p + 1),
    _ = y.length > 0,
    b = () => {
      if (l) return;
      const A = Cj(d, p + 1);
      for (const [N, E] of d) {
        const q = A.get(N),
          $ = (q == null ? void 0 : q.count) ?? 0;
        $ < E.count && r(E.name, E.tier, E.count - $);
      }
      for (const [N, E] of A) {
        const q = d.get(N),
          $ = (q == null ? void 0 : q.count) ?? 0;
        E.count > $ && s(E.name, E.tier, E.count - $);
      }
      f();
    };
  return u.jsxs('div', {
    className: ci.root,
    children: [
      u.jsx('div', {
        className: ci.header,
        children: u.jsx(Z, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      u.jsxs('div', {
        className: ci.tierControl,
        children: [
          u.jsx(Z, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          u.jsxs('div', {
            className: ci.tierStepperRow,
            children: [
              u.jsx(Nj, { value: p, min: 1, max: Bu - 1, onChange: g }),
              u.jsxs(Z, {
                variant: 'caption',
                color: 'dim',
                children: ['T', p, ' 以下を T', p + 1, ' に合成'],
              }),
            ],
          }),
        ],
      }),
      _
        ? u.jsxs(u.Fragment, {
            children: [
              u.jsx('div', {
                className: ci.mergeList,
                children: y.map((A) =>
                  u.jsx(
                    Pu,
                    {
                      patchId: `${A.name}#${A.tier}`,
                      name: A.name,
                      iconName: A.iconName,
                      tier: A.tier,
                      count: A.count,
                      trigger: '-',
                      effect: '-',
                      merging: !0,
                      size: 'md',
                    },
                    `${A.name}#${A.tier}`
                  )
                ),
              }),
              u.jsx(Ee, {
                label: `一括合成 (${y.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: b,
              }),
            ],
          })
        : u.jsxs('div', {
            className: ci.empty,
            children: [
              u.jsx(Z, { variant: 'body', color: 'dim', children: '合成可能なパッチがありません' }),
              u.jsx(Z, {
                variant: 'caption',
                color: 'dim',
                children: '同じ Tier のパッチが 2 個以上あると合成できます',
              }),
            ],
          }),
    ],
  });
}
function Oj(l) {
  return Math.min(1 + l, ri);
}
function Bj() {
  const { navigate: l } = Rn(),
    [c, s] = V.useState('equip'),
    r = G((N) => N.equippedPatches),
    f = G((N) => N.patches),
    d = G((N) => N.machineLevels.patchSlots),
    m = Oj(d),
    p = r.size,
    g = f.size,
    y = v1(f, 5).length,
    _ = (N) => {
      l(N);
    },
    b = () => {
      l('preparation');
    },
    A = [
      { key: 'equip', label: '装着', badge: `${p}/${m}` },
      { key: 'inventory', label: '所持', badge: g > 0 ? g : void 0 },
      { key: 'merge', label: '合成', badge: y > 0 ? y : void 0 },
    ];
  return u.jsx(dl, {
    header: u.jsx(Tc, {
      title: 'パッチ庫',
      subtitle: `装着 ${p}/${m} ・ 在庫 ${g} 種`,
      onBack: b,
      currencies: [],
      tabBar: u.jsx(Ks, { tabs: A, value: c, onChange: s, variant: 'underline', fullWidth: !0 }),
    }),
    footer: u.jsx(jc, { active: 'patches', onChange: _ }),
    children: u.jsxs('div', {
      className: z4.content,
      children: [
        c === 'equip' && u.jsx(uj, {}),
        c === 'inventory' && u.jsx(vj, {}),
        c === 'merge' && u.jsx(Rj, {}),
      ],
    }),
  });
}
const Dj = '_footer_qoo97_1',
  Lj = '_tabPanel_qoo97_7',
  $h = { footer: Dj, tabPanel: Lj },
  $j = '_wrapper_1lf9s_1',
  Hj = '_header_1lf9s_7',
  Uj = '_headerLabel_1lf9s_13',
  qj = '_empty_1lf9s_18',
  kj = '_emptyIcon_1lf9s_29',
  Vj = '_grid_1lf9s_33',
  Gj = '_note_1lf9s_39',
  ll = { wrapper: $j, header: Hj, headerLabel: Uj, empty: qj, emptyIcon: kj, grid: Vj, note: Gj },
  Zj = {
    instantKill: { name: '瞬殺装甲', iconName: 'skull', trigger: 'HP25%↓', effect: '敵を即死' },
    bossKiller: { name: 'ボスキラー', iconName: 'target', trigger: 'ボス出現', effect: 'DMG +80%' },
    doubleShot: { name: 'ダブルショット', iconName: 'spark', trigger: '常時', effect: '2 回攻撃' },
    damageImmune: {
      name: 'ダメージ無敵',
      iconName: 'shield',
      trigger: 'HP50%↓',
      effect: '3 秒無敵',
    },
    killHeal: { name: 'キルヒール', iconName: 'heart', trigger: '敵撃破', effect: 'HP +2%' },
    shieldRegen: { name: 'シールド再生', iconName: 'shield', trigger: '毎秒', effect: 'HP +0.5%' },
    bonusDrop: {
      name: 'ボーナスドロップ',
      iconName: 'spark',
      trigger: '撃破時',
      effect: 'ドロップ +30%',
    },
    boltCast: {
      name: 'ボルトキャスト',
      iconName: 'lightning',
      trigger: '攻撃時',
      effect: 'ボルト獲得',
    },
    freezeHit: { name: '氷結トリガー', iconName: 'ice', trigger: 'クリ時', effect: '2 秒凍結' },
    burnHit: { name: '連鎖燃焼', iconName: 'flame', trigger: '貫通時', effect: '周囲焼夷' },
  };
function Yj({ onOpenPatchScreen: l }) {
  const c = G((m) => m.equippedPatches),
    s = G((m) => m.machineLevels.patchSlots),
    r = Math.min(1 + s, ri),
    f = [];
  for (let m = 0; m < r; m++) {
    const p = c.get(m);
    if (p != null) {
      const g = Zj[p.name],
        y = {
          patchId: `${p.name}#${p.tier}`,
          name: g.name,
          iconName: g.iconName,
          tier: p.tier,
          trigger: g.trigger,
          effect: g.effect,
          count: 1,
        };
      f.push({ kind: 'filled', patch: y, idx: m + 1 });
    } else f.push({ kind: 'empty', patch: null, idx: m + 1 });
  }
  const d = [...c.values()].length;
  return u.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '装着パッチ',
    className: ll.wrapper,
    children: [
      u.jsxs('div', {
        className: ll.header,
        children: [
          u.jsxs(Z, {
            variant: 'caption',
            color: 'mid',
            className: ll.headerLabel,
            children: ['装着 ', d, ' / ', r],
          }),
          l != null &&
            u.jsx(Ee, {
              label: '装備変更',
              variant: 'ghost',
              size: 'sm',
              iconRight: u.jsx(kt, { name: 'chevron-right', size: 14 }),
              onClick: l,
            }),
        ],
      }),
      d === 0
        ? u.jsxs('div', {
            className: ll.empty,
            children: [
              u.jsx('span', {
                className: ll.emptyIcon,
                children: u.jsx(kt, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              u.jsx(Z, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              l != null &&
                u.jsx(Ee, {
                  label: 'パッチ庫を開く',
                  variant: 'secondary',
                  size: 'sm',
                  onClick: l,
                }),
            ],
          })
        : u.jsx('div', {
            className: ll.grid,
            children: f.map((m, p) =>
              u.jsx(g1, { patch: m.patch, slotIndex: m.idx, onClick: l }, p)
            ),
          }),
      u.jsx(Z, {
        variant: 'caption',
        color: 'dim',
        align: 'center',
        as: 'p',
        className: ll.note,
        children: '変更はパッチ庫で行えます',
      }),
    ],
  });
}
const Xj = '_wrapper_iebuz_1',
  Kj = '_header_iebuz_7',
  Qj = '_grid_iebuz_12',
  ju = { wrapper: Xj, header: Kj, grid: Qj },
  Wj = [
    { kind: 'laser', name: 'LASER', description: '高速直進ビーム。貫通で削る。', buildStats: u1 },
    { kind: 'cannon', name: 'CANNON', description: '範囲爆発で群れを薙ぐ。', buildStats: f1 },
    { kind: 'thunder', name: 'THUNDER', description: '同時 3 体を撃つ電撃。', buildStats: d1 },
    {
      kind: 'cutter',
      name: 'CUTTER',
      description: 'マシン周囲を旋回する斬撃。',
      buildStats: (l, c) => m1(l, c),
    },
  ];
function Jj({ selectedWeapon: l, onSelect: c }) {
  const s = G((y) => y.initialWeapon),
    r = G((y) => y.setInitialWeapon),
    f = G((y) => y.machineLevels),
    d = o1(f.baseAttack),
    m = r1(f.range),
    p = l ?? s,
    g = (y) => {
      (r(y), c == null || c(y));
    };
  return u.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: ju.wrapper,
    children: [
      u.jsx('div', {
        className: ju.header,
        children: u.jsx(Z, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      u.jsx('div', {
        className: ju.grid,
        children: Wj.map((y) =>
          u.jsx(
            c1,
            {
              weapon: y.kind,
              name: y.name,
              description: y.description,
              stats: y.buildStats(0, d, m),
              layout: 'tall',
              active: y.kind === p,
              onClick: () => g(y.kind),
            },
            y.kind
          )
        ),
      }),
    ],
  });
}
const Fj = '_wrapper_1rg1e_1',
  Ij = '_sticky_1rg1e_15',
  Pj = '_summary_1rg1e_19',
  tT = '_weaponInfo_1rg1e_29',
  eT = '_patchInfo_1rg1e_37',
  pc = { wrapper: Fj, sticky: Ij, summary: Pj, weaponInfo: tT, patchInfo: eT };
function aT({
  tier: l,
  weaponKind: c,
  patchCount: s = 0,
  disabled: r = !1,
  onLaunch: f,
  sticky: d = !0,
}) {
  return u.jsxs('div', {
    role: 'group',
    'aria-label': '出撃',
    className: [pc.wrapper, d ? pc.sticky : ''].filter(Boolean).join(' '),
    children: [
      u.jsxs('div', {
        className: pc.summary,
        children: [
          l != null && u.jsx(Ac, { variant: 'tier', tier: l, size: 'sm' }),
          c != null &&
            u.jsxs('span', {
              className: pc.weaponInfo,
              children: [
                u.jsx(kt, { name: c, size: 14 }),
                u.jsx(Z, { variant: 'label', color: 'primary', children: c.toUpperCase() }),
              ],
            }),
          u.jsxs('span', {
            className: pc.patchInfo,
            children: [
              u.jsx(kt, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              u.jsxs(Z, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', s] }),
            ],
          }),
        ],
      }),
      u.jsx(Ee, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: r,
        iconLeft: u.jsx(kt, { name: 'tower', size: 18 }),
        onClick: f,
      }),
    ],
  });
}
const nT = '_wrapper_1ul9l_1',
  lT = '_header_1ul9l_7',
  iT = '_grid_1ul9l_14',
  cT = '_tierBtn_1ul9l_20',
  sT = '_active_1ul9l_35',
  oT = '_tierLabel_1ul9l_50',
  rT = '_frontierLabel_1ul9l_61',
  il = {
    wrapper: nT,
    header: lT,
    grid: iT,
    tierBtn: cT,
    active: sT,
    tierLabel: oT,
    frontierLabel: rT,
  };
function uT({ selectedTier: l, onSelect: c }) {
  const s = G((m) => m.highestTier),
    r = Math.max(1, s),
    f = [];
  for (let m = 1; m <= r; m++) f.push(m);
  const d = (m) => `var(--c-tier-${Math.max(1, Math.min(10, m))})`;
  return u.jsxs('div', {
    role: 'tabpanel',
    'aria-label': 'Tier 選択',
    className: il.wrapper,
    children: [
      u.jsxs('div', {
        className: il.header,
        children: [
          u.jsx(Z, {
            variant: 'caption',
            color: 'mid',
            children: '到達済み Tier を選んで出撃します。',
          }),
          u.jsxs(Z, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', r] }),
        ],
      }),
      u.jsx('div', {
        className: il.grid,
        children: f.map((m) => {
          const p = m === l,
            g = m === r,
            y = d(m);
          return u.jsxs(
            'button',
            {
              type: 'button',
              'aria-pressed': p,
              'data-active': p,
              'data-frontier': g,
              className: [il.tierBtn, p ? il.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': y },
              onClick: () => (c == null ? void 0 : c(m)),
              children: [
                u.jsxs('span', { className: il.tierLabel, children: ['T', m] }),
                g && !p && u.jsx('span', { className: il.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            m
          );
        }),
      }),
    ],
  });
}
const fT = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function dT(l) {
  const { initialSelectedTier: c } = l,
    { navigate: s } = Rn(),
    [r, f] = V.useState('tier'),
    d = G(($) => $.highestTier),
    [m, p] = V.useState(c ?? Math.max(1, d)),
    g = G(($) => $.initialWeapon),
    _ = [...G(($) => $.equippedPatches).values()].length,
    b = G(($) => $.machineLevels),
    A = G(($) => $.startRun);
  function N() {
    const $ = Ws.find((C) => C.key === 'maxHp'),
      J = $ != null ? Sc($, b.maxHp) : 100;
    (A({ initialWeapon: g, baseMachineMaxHp: Q.fromNumber(J) }), s('battle'));
  }
  const E = u.jsx(Tc, {
      title: '出撃準備',
      currencies: ['bolt', 'alloy'],
      tabBar: u.jsx(Ks, { tabs: fT, value: r, onChange: f, variant: 'underline', fullWidth: !0 }),
    }),
    q = u.jsxs('div', {
      className: $h.footer,
      children: [
        u.jsx(aT, { tier: m, weaponKind: g, patchCount: _, sticky: !1, onLaunch: N }),
        u.jsx(jc, { active: 'preparation', onChange: ($) => s($) }),
      ],
    });
  return u.jsx(dl, {
    header: E,
    footer: q,
    children: u.jsxs('div', {
      className: $h.tabPanel,
      children: [
        r === 'tier' && u.jsx(uT, { selectedTier: m, onSelect: p }),
        r === 'weapon' && u.jsx(Jj, {}),
        r === 'patches' && u.jsx(Yj, { onOpenPatchScreen: () => s('patches') }),
      ],
    }),
  });
}
const mT = '_content_8gsha_1',
  hT = { content: mT },
  pT = '_root_1b7n9_1',
  yT = '_header_1b7n9_8',
  gT = '_storageCard_1b7n9_13',
  vT = '_storageRow_1b7n9_23',
  _T = '_divider_1b7n9_29',
  bT = '_section_1b7n9_34',
  ST = '_dangerSection_1b7n9_40',
  xT = '_sectionHeader_1b7n9_50',
  na = {
    root: pT,
    header: yT,
    storageCard: gT,
    storageRow: vT,
    divider: _T,
    section: bT,
    dangerSection: ST,
    sectionHeader: xT,
  },
  jT = '_wrapper_11b89_1',
  TT = '_disabled_11b89_6',
  AT = '_hiddenInput_11b89_11',
  ET = '_btn_11b89_15',
  MT = '_fileName_11b89_41',
  yc = { wrapper: jT, disabled: TT, hiddenInput: AT, btn: ET, fileName: MT },
  wT = ({
    accept: l = 'application/json',
    onChange: c,
    label: s = 'ファイルを選択',
    disabled: r = !1,
  }) => {
    const f = V.useRef(null),
      [d, m] = V.useState(null),
      p = () => {
        var y;
        r || (y = f.current) == null || y.click();
      },
      g = (y) => {
        var b;
        const _ = ((b = y.target.files) == null ? void 0 : b[0]) ?? null;
        (m((_ == null ? void 0 : _.name) ?? null), c(_), f.current && (f.current.value = ''));
      };
    return u.jsxs('div', {
      className: [yc.wrapper, r ? yc.disabled : ''].join(' '),
      children: [
        u.jsx('input', {
          ref: f,
          type: 'file',
          accept: l,
          className: yc.hiddenInput,
          onChange: g,
          disabled: r,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        u.jsx('button', {
          type: 'button',
          className: yc.btn,
          onClick: p,
          disabled: r,
          children: s,
        }),
        d && u.jsx('span', { className: yc.fileName, title: d, children: d }),
      ],
    });
  };
function NT({ storageInfo: l, onExport: c, onImport: s, onReset: r }) {
  const [f, d] = V.useState(!1),
    [m, p] = V.useState(!1),
    [g, y] = V.useState(!1),
    _ = async () => {
      if (c) {
        y(!0);
        try {
          await c();
        } finally {
          y(!1);
        }
      }
    },
    b = async (N) => {
      if (!(!N || !s)) {
        p(!0);
        try {
          await s(N);
        } finally {
          p(!1);
        }
      }
    },
    A = async () => {
      (d(!1), r && (await r()));
    };
  return u.jsxs('div', {
    className: na.root,
    children: [
      u.jsx('div', {
        className: na.header,
        children: u.jsx(Z, { variant: 'heading-3', children: 'データ管理' }),
      }),
      l &&
        u.jsxs('div', {
          className: na.storageCard,
          children: [
            u.jsx(Z, { variant: 'label', color: 'mid', children: 'ストレージ使用量' }),
            u.jsxs('div', {
              className: na.storageRow,
              children: [
                u.jsx(Z, { variant: 'numeric-l', children: l.usedKb }),
                u.jsx(Z, { variant: 'caption', color: 'dim', children: 'KB' }),
              ],
            }),
            u.jsxs(Z, {
              variant: 'caption',
              color: 'dim',
              children: ['セーブスロット: ', l.slots, ' / 最終保存: ', l.lastSavedAt],
            }),
          ],
        }),
      u.jsx('div', { className: na.divider }),
      u.jsxs('div', {
        className: na.section,
        children: [
          u.jsxs('div', {
            className: na.sectionHeader,
            children: [
              u.jsx(Z, { variant: 'label', color: 'mid', children: 'エクスポート' }),
              u.jsx(Z, {
                variant: 'caption',
                color: 'dim',
                children: 'セーブデータを JSON ファイルとしてダウンロード',
              }),
            ],
          }),
          u.jsx(Ee, {
            label: g ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: _,
            disabled: g || !c,
          }),
        ],
      }),
      u.jsxs('div', {
        className: na.section,
        children: [
          u.jsxs('div', {
            className: na.sectionHeader,
            children: [
              u.jsx(Z, { variant: 'label', color: 'mid', children: 'インポート' }),
              u.jsx(Z, {
                variant: 'caption',
                color: 'dim',
                children: 'JSON ファイルからセーブデータを復元（上書き）',
              }),
            ],
          }),
          u.jsx(wT, {
            accept: 'application/json',
            onChange: b,
            label: m ? 'インポート中...' : 'ファイルを選択してインポート',
            disabled: m || !s,
          }),
        ],
      }),
      u.jsx('div', { className: na.divider }),
      u.jsxs('div', {
        className: na.dangerSection,
        children: [
          u.jsxs('div', {
            className: na.sectionHeader,
            children: [
              u.jsx(Z, { variant: 'label', color: 'mid', children: 'データリセット' }),
              u.jsx(Z, {
                variant: 'caption',
                color: 'dim',
                children: 'すべてのデータを削除します。この操作は取り消せません。',
              }),
            ],
          }),
          u.jsx(Ee, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => d(!0),
            disabled: !r,
          }),
        ],
      }),
      u.jsx(y1, {
        open: f,
        title: 'データをリセットしますか？',
        message: 'すべてのセーブデータが削除されます。この操作は取り消せません。',
        iconName: 'skull',
        confirmLabel: 'リセットする',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: A,
        onCancel: () => d(!1),
      }),
    ],
  });
}
const zT = '_root_1rbig_1',
  CT = '_header_1rbig_8',
  RT = '_section_1rbig_13',
  Tu = { root: zT, header: CT, section: RT },
  OT = '_wrapper_16nmz_9',
  BT = '_disabled_16nmz_15',
  DT = '_off_16nmz_31',
  LT = '_on_16nmz_35',
  $T = '_accent_primary_16nmz_35',
  HT = '_accent_secondary_16nmz_39',
  UT = '_accent_success_16nmz_43',
  qT = '_accent_disabled_16nmz_47',
  kT = '_size_md_16nmz_56',
  VT = '_knob_16nmz_60',
  GT = '_size_sm_16nmz_70',
  ZT = '_labelGroup_16nmz_93',
  YT = '_label_16nmz_93',
  XT = '_description_16nmz_106',
  da = {
    wrapper: OT,
    disabled: BT,
    switch: '_switch_16nmz_22',
    off: DT,
    on: LT,
    accent_primary: $T,
    accent_secondary: HT,
    accent_success: UT,
    accent_disabled: qT,
    size_md: kT,
    knob: VT,
    size_sm: GT,
    labelGroup: ZT,
    label: YT,
    description: XT,
  },
  _1 = ({
    checked: l,
    onChange: c,
    disabled: s = !1,
    label: r,
    description: f,
    accent: d = 'primary',
    size: m = 'md',
  }) => {
    const p = s || d === 'disabled',
      g = () => {
        p || c(!l);
      };
    return u.jsxs('label', {
      className: [da.wrapper, p ? da.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': p,
      children: [
        u.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': l,
          'aria-disabled': p,
          className: [da.switch, l ? da.on : da.off, da[`size_${m}`], da[`accent_${d}`]]
            .filter(Boolean)
            .join(' '),
          onClick: g,
          disabled: p,
          children: u.jsx('span', { className: da.knob }),
        }),
        (r || f) &&
          u.jsxs('span', {
            className: da.labelGroup,
            children: [
              r && u.jsx('span', { className: da.label, children: r }),
              f && u.jsx('span', { className: da.description, children: f }),
            ],
          }),
      ],
    });
  };
function KT({ overrideVibration: l, onVibrationChange: c }) {
  const s = G((m) => m.vibrationEnabled),
    r = G((m) => m.setVibrationEnabled),
    f = l ?? s,
    d = (m) => {
      c ? c(m) : r(m);
    };
  return u.jsxs('div', {
    className: Tu.root,
    children: [
      u.jsx('div', {
        className: Tu.header,
        children: u.jsx(Z, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      u.jsx('div', {
        className: Tu.section,
        children: u.jsx(_1, {
          checked: f,
          onChange: d,
          label: 'バイブレーション',
          description: '操作時に端末を振動させます',
        }),
      }),
    ],
  });
}
const QT = '_root_nuc5y_2',
  WT = '_muteRow_nuc5y_9',
  JT = '_muteLabelGroup_nuc5y_16',
  FT = '_sliderRow_nuc5y_24',
  IT = '_muted_nuc5y_29',
  PT = '_sliderIcon_nuc5y_29',
  tA = '_sliderArea_nuc5y_41',
  eA = '_sliderValue_nuc5y_46',
  zn = {
    root: QT,
    muteRow: WT,
    muteLabelGroup: JT,
    sliderRow: FT,
    muted: IT,
    sliderIcon: PT,
    sliderArea: tA,
    sliderValue: eA,
  };
function Hh({ label: l, iconName: c, value: s, muted: r, onChange: f }) {
  return u.jsx(ml, {
    variant: 'sunken',
    padding: 'md',
    children: u.jsxs('div', {
      className: [zn.sliderRow, r ? zn.muted : ''].filter(Boolean).join(' '),
      children: [
        u.jsx('span', { className: zn.sliderIcon, children: u.jsx(kt, { name: c, size: 16 }) }),
        u.jsx(Z, { variant: 'label', color: r ? 'dim' : 'mid', children: l }),
        u.jsx('div', {
          className: zn.sliderArea,
          children: u.jsx(zu, { value: s, min: 0, max: 1, step: 0.01, onChange: f, disabled: r }),
        }),
        u.jsx('span', {
          className: zn.sliderValue,
          children: u.jsx(Cn, {
            value: Math.round(s * 100),
            size: 'sm',
            accentColor: r ? 'dim' : 'text',
          }),
        }),
      ],
    }),
  });
}
function aA({
  overrideBgmVolume: l,
  overrideSeVolume: c,
  overrideMute: s,
  onBgmChange: r,
  onSeChange: f,
  onMuteChange: d,
}) {
  const m = G(($) => $.bgmVolume),
    p = G(($) => $.seVolume),
    g = G(($) => $.setBgmVolume),
    y = G(($) => $.setSeVolume),
    _ = l ?? m,
    b = c ?? p,
    A = s ?? !1,
    N = ($) => {
      r ? r($) : (g($), Ht.setBgmVolume(A ? 0 : $));
    },
    E = ($) => {
      f ? f($) : (y($), Ht.setSeVolume(A ? 0 : $));
    },
    q = ($) => {
      d ? d($) : (Ht.setBgmVolume($ ? 0 : _), Ht.setSeVolume($ ? 0 : b));
    };
  return u.jsxs('div', {
    className: zn.root,
    role: 'tabpanel',
    'aria-label': 'サウンド設定',
    children: [
      u.jsx(ml, {
        variant: 'sunken',
        padding: 'md',
        children: u.jsxs('div', {
          className: zn.muteRow,
          children: [
            u.jsxs('span', {
              className: zn.muteLabelGroup,
              children: [
                u.jsx(Z, { variant: 'label', color: 'mid', children: 'ミュート' }),
                u.jsx(Z, { variant: 'caption', color: 'dim', children: '全サウンドを一時停止' }),
              ],
            }),
            u.jsx(_1, { checked: A, onChange: q, accent: 'primary' }),
          ],
        }),
      }),
      u.jsx(Hh, { label: 'BGM', iconName: 'play', value: _, muted: A, onChange: N }),
      u.jsx(Hh, { label: 'SE', iconName: 'spark', value: b, muted: A, onChange: E }),
    ],
  });
}
const Du = (l, c) => c.some((s) => l instanceof s);
let Uh, qh;
function nA() {
  return Uh || (Uh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function lA() {
  return (
    qh ||
    (qh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Lu = new WeakMap(),
  Au = new WeakMap(),
  Is = new WeakMap();
function iA(l) {
  const c = new Promise((s, r) => {
    const f = () => {
        (l.removeEventListener('success', d), l.removeEventListener('error', m));
      },
      d = () => {
        (s(ul(l.result)), f());
      },
      m = () => {
        (r(l.error), f());
      };
    (l.addEventListener('success', d), l.addEventListener('error', m));
  });
  return (Is.set(c, l), c);
}
function cA(l) {
  if (Lu.has(l)) return;
  const c = new Promise((s, r) => {
    const f = () => {
        (l.removeEventListener('complete', d),
          l.removeEventListener('error', m),
          l.removeEventListener('abort', m));
      },
      d = () => {
        (s(), f());
      },
      m = () => {
        (r(l.error || new DOMException('AbortError', 'AbortError')), f());
      };
    (l.addEventListener('complete', d),
      l.addEventListener('error', m),
      l.addEventListener('abort', m));
  });
  Lu.set(l, c);
}
let $u = {
  get(l, c, s) {
    if (l instanceof IDBTransaction) {
      if (c === 'done') return Lu.get(l);
      if (c === 'store')
        return s.objectStoreNames[1] ? void 0 : s.objectStore(s.objectStoreNames[0]);
    }
    return ul(l[c]);
  },
  set(l, c, s) {
    return ((l[c] = s), !0);
  },
  has(l, c) {
    return l instanceof IDBTransaction && (c === 'done' || c === 'store') ? !0 : c in l;
  },
};
function b1(l) {
  $u = l($u);
}
function sA(l) {
  return lA().includes(l)
    ? function (...c) {
        return (l.apply(Hu(this), c), ul(this.request));
      }
    : function (...c) {
        return ul(l.apply(Hu(this), c));
      };
}
function oA(l) {
  return typeof l == 'function'
    ? sA(l)
    : (l instanceof IDBTransaction && cA(l), Du(l, nA()) ? new Proxy(l, $u) : l);
}
function ul(l) {
  if (l instanceof IDBRequest) return iA(l);
  if (Au.has(l)) return Au.get(l);
  const c = oA(l);
  return (c !== l && (Au.set(l, c), Is.set(c, l)), c);
}
const Hu = (l) => Is.get(l);
function rA(l, c, { blocked: s, upgrade: r, blocking: f, terminated: d } = {}) {
  const m = indexedDB.open(l, c),
    p = ul(m);
  return (
    r &&
      m.addEventListener('upgradeneeded', (g) => {
        r(ul(m.result), g.oldVersion, g.newVersion, ul(m.transaction), g);
      }),
    s && m.addEventListener('blocked', (g) => s(g.oldVersion, g.newVersion, g)),
    p
      .then((g) => {
        (d && g.addEventListener('close', () => d()),
          f && g.addEventListener('versionchange', (y) => f(y.oldVersion, y.newVersion, y)));
      })
      .catch(() => {}),
    p
  );
}
const uA = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  fA = ['put', 'add', 'delete', 'clear'],
  Eu = new Map();
function kh(l, c) {
  if (!(l instanceof IDBDatabase && !(c in l) && typeof c == 'string')) return;
  if (Eu.get(c)) return Eu.get(c);
  const s = c.replace(/FromIndex$/, ''),
    r = c !== s,
    f = fA.includes(s);
  if (!(s in (r ? IDBIndex : IDBObjectStore).prototype) || !(f || uA.includes(s))) return;
  const d = async function (m, ...p) {
    const g = this.transaction(m, f ? 'readwrite' : 'readonly');
    let y = g.store;
    return (r && (y = y.index(p.shift())), (await Promise.all([y[s](...p), f && g.done]))[0]);
  };
  return (Eu.set(c, d), d);
}
b1((l) => ({
  ...l,
  get: (c, s, r) => kh(c, s) || l.get(c, s, r),
  has: (c, s) => !!kh(c, s) || l.has(c, s),
}));
const dA = ['continue', 'continuePrimaryKey', 'advance'],
  Vh = {},
  Uu = new WeakMap(),
  S1 = new WeakMap(),
  mA = {
    get(l, c) {
      if (!dA.includes(c)) return l[c];
      let s = Vh[c];
      return (
        s ||
          (s = Vh[c] =
            function (...r) {
              Uu.set(this, S1.get(this)[c](...r));
            }),
        s
      );
    },
  };
async function* hA(...l) {
  let c = this;
  if ((c instanceof IDBCursor || (c = await c.openCursor(...l)), !c)) return;
  c = c;
  const s = new Proxy(c, mA);
  for (S1.set(s, c), Is.set(s, Hu(c)); c; )
    (yield s, (c = await (Uu.get(s) || c.continue())), Uu.delete(s));
}
function Gh(l, c) {
  return (
    (c === Symbol.asyncIterator && Du(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (c === 'iterate' && Du(l, [IDBIndex, IDBObjectStore]))
  );
}
b1((l) => ({
  ...l,
  get(c, s, r) {
    return Gh(c, s) ? hA : l.get(c, s, r);
  },
  has(c, s) {
    return Gh(c, s) || l.has(c, s);
  },
}));
const pA = {
  1: (l) => {
    (l.createObjectStore(F.profile, { keyPath: 'id' }),
      l.createObjectStore(F.currencies, { keyPath: 'id' }),
      l.createObjectStore(F.machine, { keyPath: 'key' }),
      l.createObjectStore(F.weapons, { keyPath: 'id' }),
      l
        .createObjectStore(F.patches, { keyPath: ['name', 'tier'] })
        .createIndex('byName', 'name', { unique: !1 }),
      l.createObjectStore(F.equippedPatches, { keyPath: 'slotIndex' }),
      l.createObjectStore(F.settings, { keyPath: 'id' }));
  },
};
function yA(l, c, s, r) {
  for (let f = s + 1; f <= r; f++) {
    const d = pA[f];
    if (!d) throw new Error(`No migration registered for version ${f}`);
    d(l, c);
  }
}
let gc = null;
async function qu() {
  return (
    gc ||
    ((gc = await rA(Ph, Xs, {
      upgrade(l, c, s, r) {
        try {
          yA(l, r, c, s ?? Xs);
        } catch (f) {
          throw (console.error('[DB] Migration failed:', f), f);
        }
      },
    })),
    await gA(gc),
    gc)
  );
}
async function gA(l) {
  const c = l.transaction([F.profile, F.currencies, F.machine, F.weapons, F.settings], 'readwrite'),
    [s, r, f, d] = await Promise.all([
      c.objectStore(F.profile).get('singleton'),
      c.objectStore(F.currencies).get('singleton'),
      c.objectStore(F.weapons).get('singleton'),
      c.objectStore(F.settings).get('singleton'),
    ]),
    m = Date.now(),
    p = [];
  (s || p.push(c.objectStore(F.profile).put({ ...t1, createdAt: m, lastPlayedAt: m })),
    r || p.push(c.objectStore(F.currencies).put(e1)),
    f || p.push(c.objectStore(F.weapons).put(a1)),
    d || p.push(c.objectStore(F.settings).put(n1)));
  const g = c.objectStore(F.machine),
    y = await g.getAllKeys(),
    _ = new Set(y);
  for (const b of Qs) _.has(b) || p.push(g.put({ key: b, lv: 0 }));
  (await Promise.all(p), await c.done);
}
async function vA(l, c) {
  await l.put(F.profile, c);
}
async function _A(l, c) {
  await l.put(F.currencies, c);
}
async function bA(l, c) {
  await l.put(F.machine, c);
}
async function SA(l, c) {
  await l.put(F.weapons, c);
}
async function xA(l, c) {
  await l.put(F.patches, c);
}
async function jA(l) {
  return l.getAll(F.equippedPatches);
}
async function TA(l, c) {
  const r = (await jA(l)).find((f) => f.name === c.name && f.slotIndex !== c.slotIndex);
  if (r) throw new Error(`Patch "${c.name}" is already equipped in slot ${r.slotIndex}`);
  await l.put(F.equippedPatches, c);
}
async function AA(l, c) {
  await l.put(F.settings, c);
}
async function x1(l) {
  const c = l.transaction(
      [F.profile, F.currencies, F.machine, F.weapons, F.patches, F.equippedPatches, F.settings],
      'readonly'
    ),
    [s, r, f, d, m, p, g] = await Promise.all([
      c.objectStore(F.profile).get('singleton'),
      c.objectStore(F.currencies).get('singleton'),
      c.objectStore(F.machine).getAll(),
      c.objectStore(F.weapons).get('singleton'),
      c.objectStore(F.patches).getAll(),
      c.objectStore(F.equippedPatches).getAll(),
      c.objectStore(F.settings).get('singleton'),
    ]);
  if ((await c.done, !s || !r || !d || !g))
    throw new Error(
      '[DB] loadSaveState: Required singleton record is missing. Run openDatabase() first.'
    );
  return {
    profile: s,
    currencies: r,
    machine: f,
    weapons: d,
    patches: m,
    equippedPatches: p,
    settings: g,
  };
}
const j1 = 'tower-like-game:import-backups',
  EA = 3;
function MA() {
  try {
    const l = localStorage.getItem(j1);
    return l ? JSON.parse(l) : [];
  } catch {
    return [];
  }
}
function wA(l) {
  try {
    localStorage.setItem(j1, JSON.stringify(l));
  } catch (c) {
    console.warn('[DB] Failed to save backup to localStorage:', c);
  }
}
function NA(l) {
  const c = MA();
  c.unshift({ savedAt: Date.now(), data: l });
  const s = c.slice(0, EA);
  wA(s);
}
async function T1(l) {
  const c = await x1(l);
  return { formatVersion: 1, dbVersion: Xs, exportedAt: Date.now(), data: c };
}
async function zA(l, c) {
  if (c.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${c.formatVersion}`);
  try {
    const d = await T1(l);
    NA(d);
  } catch (d) {
    console.warn('[DB] Pre-import backup failed (proceeding anyway):', d);
  }
  const { data: s } = c,
    r = l.transaction(
      [F.profile, F.currencies, F.machine, F.weapons, F.patches, F.equippedPatches, F.settings],
      'readwrite'
    );
  await Promise.all([
    r.objectStore(F.profile).clear(),
    r.objectStore(F.currencies).clear(),
    r.objectStore(F.machine).clear(),
    r.objectStore(F.weapons).clear(),
    r.objectStore(F.patches).clear(),
    r.objectStore(F.equippedPatches).clear(),
    r.objectStore(F.settings).clear(),
  ]);
  const f = [
    r.objectStore(F.profile).put(s.profile),
    r.objectStore(F.currencies).put(s.currencies),
    r.objectStore(F.weapons).put(s.weapons),
    r.objectStore(F.settings).put(s.settings),
    ...s.machine.map((d) => r.objectStore(F.machine).put(d)),
    ...s.patches.map((d) => r.objectStore(F.patches).put(d)),
    ...s.equippedPatches.map((d) => r.objectStore(F.equippedPatches).put(d)),
  ];
  (await Promise.all(f), await r.done);
}
const CA = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function RA() {
  const { navigate: l } = Rn(),
    [c, s] = V.useState('sound'),
    r = async () => {
      const m = await qu(),
        p = await T1(m),
        g = JSON.stringify(p, null, 2),
        y = new Blob([g], { type: 'application/json' }),
        _ = URL.createObjectURL(y),
        b = document.createElement('a');
      ((b.href = _),
        (b.download = `neon-spire-save-${new Date().toISOString().slice(0, 10)}.json`),
        b.click(),
        URL.revokeObjectURL(_));
    },
    f = async (m) => {
      const p = await m.text(),
        g = JSON.parse(p),
        y = await qu();
      (await zA(y, g), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(Ph), window.location.reload());
    };
  return u.jsx(dl, {
    header: u.jsx(Tc, {
      title: '設定',
      onBack: () => l('title'),
      currencies: [],
      tabBar: u.jsx(Ks, { tabs: CA, value: c, onChange: s, fullWidth: !0 }),
    }),
    footer: u.jsx(jc, { active: 'settings', onChange: l }),
    children: u.jsxs('div', {
      className: hT.content,
      children: [
        c === 'sound' && u.jsx(aA, {}),
        c === 'game' && u.jsx(KT, {}),
        c === 'data' && u.jsx(NT, { onExport: r, onImport: f, onReset: d }),
      ],
    }),
  });
}
const OA = '_layout_198wk_1',
  BA = '_heroWrap_198wk_12',
  Zh = { layout: OA, heroWrap: BA },
  DA = '_banner_sva4m_3',
  LA = '_bannerInfo_sva4m_24',
  Mu = { banner: DA, bannerInfo: LA };
function $A({ banner: l, onApply: c }) {
  return l === null
    ? null
    : l.kind === 'has-update'
      ? u.jsxs('div', {
          className: Mu.banner,
          role: 'status',
          'aria-live': 'polite',
          children: [
            u.jsx(Z, { variant: 'body', color: 'default', children: '新しいバージョンがあります' }),
            u.jsx(Ee, { label: '更新', size: 'sm', variant: 'primary', onClick: c }),
          ],
        })
      : u.jsx('div', {
          className: `${Mu.banner} ${Mu.bannerInfo}`,
          role: 'status',
          'aria-live': 'polite',
          children: u.jsx(Z, {
            variant: 'body',
            color: 'dim',
            children: '現在のバージョンは最新です',
          }),
        });
}
const HA = '_root_5udm7_1',
  UA = { root: HA };
function qA({
  onResume: l,
  onNewGame: c,
  lastSavedAt: s,
  onCheckUpdate: r,
  isCheckingUpdate: f = !1,
}) {
  const m = G((p) => p.createdAt) > 0;
  return u.jsxs('div', {
    className: UA.root,
    children: [
      u.jsx(Ee, {
        label: m ? '続きから' : '続きから (セーブなし)',
        variant: m ? 'primary' : 'ghost',
        size: 'lg',
        fullWidth: !0,
        disabled: !m,
        iconLeft: u.jsx(kt, { name: 'play', size: 18 }),
        onClick: l,
      }),
      m &&
        s != null &&
        u.jsx(Z, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
          children: '最終セーブ: ' + s,
        }),
      u.jsx(Ee, {
        label: '新規開始',
        variant: m ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: u.jsx(kt, { name: 'plus', size: 18 }),
        onClick: c,
      }),
      r != null &&
        u.jsx(Ee, {
          label: f ? '確認中…' : '更新を確認',
          variant: 'ghost',
          size: 'md',
          fullWidth: !0,
          disabled: f,
          onClick: r,
        }),
    ],
  });
}
const kA = '_root_qkflo_2',
  VA = '_title_qkflo_12',
  Yh = { root: kA, title: VA };
function GA({ title: l = 'NEON SPIRE', subtitle: c, version: s, tagline: r }) {
  return u.jsxs('header', {
    className: Yh.root,
    role: 'banner',
    children: [
      u.jsx('h1', { className: Yh.title, children: l }),
      c != null &&
        u.jsx(Z, {
          variant: 'label',
          color: 'mid',
          align: 'center',
          style: { fontSize: 11, letterSpacing: '0.24em' },
          children: c,
        }),
      r != null &&
        u.jsx(Z, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { marginTop: 4, fontSize: 11 },
          children: r,
        }),
      s != null &&
        u.jsx(Z, {
          variant: 'numeric-s',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10, marginTop: 6, opacity: 0.7 },
          children: s,
        }),
    ],
  });
}
const ZA = '_root_1szye_1',
  YA = '_ringOuter_1szye_9',
  XA = '_ringMiddle_1szye_17',
  KA = '_glowDisc_1szye_24',
  QA = '_cornerAccent_1szye_31',
  WA = '_icon_1szye_40',
  oi = { root: ZA, ringOuter: YA, ringMiddle: XA, glowDisc: KA, cornerAccent: QA, icon: WA };
function JA({ size: l = 180, iconName: c = 'tower' }) {
  return u.jsxs('div', {
    className: oi.root,
    style: { width: l, height: l },
    role: 'presentation',
    'aria-hidden': 'true',
    children: [
      u.jsx('div', { className: oi.ringOuter }),
      u.jsx('div', { className: oi.ringMiddle }),
      u.jsx('div', { className: oi.glowDisc }),
      [0, 90, 180, 270].map((s) =>
        u.jsx(
          'div',
          {
            className: oi.cornerAccent,
            style: { transform: `rotate(${s}deg) translate(${l / 2 - 5}px) rotate(45deg)` },
          },
          s
        )
      ),
      u.jsx('span', {
        className: oi.icon,
        children: u.jsx(kt, { name: c, size: Math.round(l * 0.49) }),
      }),
    ],
  });
}
const FA = 'modulepreload',
  IA = function (l) {
    return '/tower-like-game/' + l;
  },
  Xh = {},
  PA = function (c, s, r) {
    let f = Promise.resolve();
    if (s && s.length > 0) {
      let m = function (y) {
        return Promise.all(
          y.map((_) =>
            Promise.resolve(_).then(
              (b) => ({ status: 'fulfilled', value: b }),
              (b) => ({ status: 'rejected', reason: b })
            )
          )
        );
      };
      document.getElementsByTagName('link');
      const p = document.querySelector('meta[property=csp-nonce]'),
        g = (p == null ? void 0 : p.nonce) || (p == null ? void 0 : p.getAttribute('nonce'));
      f = m(
        s.map((y) => {
          if (((y = IA(y)), y in Xh)) return;
          Xh[y] = !0;
          const _ = y.endsWith('.css'),
            b = _ ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${y}"]${b}`)) return;
          const A = document.createElement('link');
          if (
            ((A.rel = _ ? 'stylesheet' : FA),
            _ || (A.as = 'script'),
            (A.crossOrigin = ''),
            (A.href = y),
            g && A.setAttribute('nonce', g),
            document.head.appendChild(A),
            _)
          )
            return new Promise((N, E) => {
              (A.addEventListener('load', N),
                A.addEventListener('error', () => E(new Error(`Unable to preload CSS for ${y}`))));
            });
        })
      );
    }
    function d(m) {
      const p = new Event('vite:preloadError', { cancelable: !0 });
      if (((p.payload = m), window.dispatchEvent(p), !p.defaultPrevented)) throw m;
    }
    return f.then((m) => {
      for (const p of m || []) p.status === 'rejected' && d(p.reason);
      return c().catch(d);
    });
  };
function tE(l = {}) {
  const {
    immediate: c = !1,
    onNeedRefresh: s,
    onOfflineReady: r,
    onRegistered: f,
    onRegisteredSW: d,
    onRegisterError: m,
  } = l;
  let p, g;
  const y = async (b = !0) => {
    await g;
  };
  async function _() {
    if ('serviceWorker' in navigator) {
      if (
        ((p = await PA(async () => {
          const { Workbox: b } = await import('./workbox-window.prod.es5-BIl4cyR9.js');
          return { Workbox: b };
        }, [])
          .then(
            ({ Workbox: b }) =>
              new b('/tower-like-game/sw.js', { scope: '/tower-like-game/', type: 'classic' })
          )
          .catch((b) => {
            m == null || m(b);
          })),
        !p)
      )
        return;
      (p.addEventListener('activated', (b) => {
        (b.isUpdate || b.isExternal) && window.location.reload();
      }),
        p.addEventListener('installed', (b) => {
          b.isUpdate || r == null || r();
        }),
        p
          .register({ immediate: c })
          .then((b) => {
            d ? d('/tower-like-game/sw.js', b) : f == null || f(b);
          })
          .catch((b) => {
            m == null || m(b);
          }));
    }
  }
  return ((g = _()), y);
}
function eE(l = {}) {
  const {
      immediate: c = !0,
      onNeedRefresh: s,
      onOfflineReady: r,
      onRegistered: f,
      onRegisteredSW: d,
      onRegisterError: m,
    } = l,
    [p, g] = V.useState(!1),
    [y, _] = V.useState(!1),
    [b] = V.useState(() =>
      tE({
        immediate: c,
        onOfflineReady() {
          (_(!0), r == null || r());
        },
        onNeedRefresh() {
          (g(!0), s == null || s());
        },
        onRegistered: f,
        onRegisteredSW: d,
        onRegisterError: m,
      })
    );
  return { needRefresh: [p, g], offlineReady: [y, _], updateServiceWorker: b };
}
const aE = 2500,
  nE = 1500;
function lE() {
  const l = V.useRef(null),
    {
      needRefresh: [c],
      updateServiceWorker: s,
    } = eE({
      onRegisteredSW: (A, N) => {
        l.current = N ?? null;
      },
    }),
    [r, f] = V.useState(!1),
    [d, m] = V.useState(!1),
    p = V.useRef(null),
    g = V.useRef(c);
  V.useEffect(() => {
    g.current = c;
  }, [c]);
  const y = V.useCallback(async () => {
      if (!r && !g.current) {
        (f(!0), m(!1));
        try {
          const A = l.current;
          (A && (await A.update()),
            await new Promise((N) => {
              window.setTimeout(N, nE);
            }));
        } catch {}
        (f(!1),
          g.current ||
            (m(!0),
            p.current !== null && window.clearTimeout(p.current),
            (p.current = window.setTimeout(() => {
              (m(!1), (p.current = null));
            }, aE))));
      }
    }, [r]),
    _ = V.useCallback(() => {
      s(!0);
    }, [s]);
  return {
    banner: c ? { kind: 'has-update' } : d ? { kind: 'up-to-date' } : null,
    checkForUpdate: y,
    isChecking: r,
    applyUpdate: _,
  };
}
function iE(l) {
  if (l < 0) return '今';
  const c = Math.floor(l / 1e3);
  if (c < 60) return '今';
  const s = Math.floor(c / 60);
  if (s < 60) return `${s} 分前`;
  const r = Math.floor(s / 60);
  return r < 24 ? `${r} 時間前` : `${Math.floor(r / 24)} 日前`;
}
function cE() {
  const { navigate: l } = Rn(),
    c = G((p) => p.createdAt),
    { banner: s, checkForUpdate: r, isChecking: f, applyUpdate: d } = lE(),
    m = V.useMemo(() => (c > 0 ? iE(Date.now() - c) : void 0), [c]);
  return u.jsx(dl, {
    children: u.jsxs('div', {
      className: Zh.layout,
      children: [
        u.jsx(GA, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.1.0',
        }),
        u.jsx('div', { className: Zh.heroWrap, children: u.jsx(JA, {}) }),
        u.jsx(qA, {
          lastSavedAt: m,
          onResume: () => l('preparation'),
          onNewGame: () => l('preparation'),
          onCheckUpdate: () => void r(),
          isCheckingUpdate: f,
        }),
        u.jsx($A, { banner: s, onApply: d }),
      ],
    }),
  });
}
const sE = {
  title: 'title',
  preparation: 'base',
  machine: 'base',
  armory: 'base',
  patches: 'base',
  settings: 'base',
  battle: 'battleNormal',
};
function oE(l, c) {
  (V.useEffect(() => {
    const s = () => {
      Ht.isInitialized() || (Ht.init(), Ht.setBgmVolume(l), Ht.setSeVolume(c));
    };
    return (
      window.addEventListener('pointerdown', s, { once: !0 }),
      window.addEventListener('keydown', s, { once: !0 }),
      () => {
        (window.removeEventListener('pointerdown', s), window.removeEventListener('keydown', s));
      }
    );
  }, []),
    V.useEffect(() => {
      Ht.setBgmVolume(l);
    }, [l]),
    V.useEffect(() => {
      Ht.setSeVolume(c);
    }, [c]));
}
function rE() {
  const { screen: l } = Rn(),
    c = G((r) => r.bgmVolume),
    s = G((r) => r.seVolume);
  switch (
    (oE(c, s),
    V.useEffect(() => {
      Ht.playBgm(sE[l]);
    }, [l]),
    l)
  ) {
    case 'title':
      return u.jsx(cE, {});
    case 'preparation':
      return u.jsx(dT, {});
    case 'machine':
      return u.jsx(M4, {});
    case 'armory':
      return u.jsx(nS, {});
    case 'patches':
      return u.jsx(Bj, {});
    case 'settings':
      return u.jsx(RA, {});
    case 'battle':
      return u.jsx(j4, {});
    default:
      return u.jsx(w4, {});
  }
}
async function On() {
  return qu();
}
async function uE() {
  const l = await On(),
    c = await x1(l),
    s = G.getState(),
    r = c.profile ?? t1;
  G.setState({
    highestTier: r.highestTier,
    highestWave: r.highestWave,
    totalPlayTimeSec: r.totalPlayTimeSec,
    totalRuns: r.totalRuns,
    totalEnemiesKilled: r.totalEnemiesKilled,
    createdAt: r.createdAt,
    lastPlayedAt: r.lastPlayedAt,
  });
  const f = c.currencies ?? e1;
  G.setState({ bolt: Q.fromJSON(f.bolt), alloy: Q.fromJSON(f.alloy) });
  const d = c.machine,
    m = { ...s.machineLevels };
  for (const N of Qs) {
    const E = d.find((q) => q.key === N);
    m[N] = E ? E.lv : 0;
  }
  G.setState({ machineLevels: m });
  const p = c.weapons ?? a1;
  G.setState({ weaponLv: p.weaponLv, initialWeapon: p.initialWeapon });
  const g = c.patches,
    y = new Map();
  for (const N of g)
    N.count > 0 && y.set(Nu(N.name, N.tier), { name: N.name, tier: N.tier, count: N.count });
  G.setState({ patches: y });
  const _ = c.equippedPatches,
    b = new Map();
  for (const N of _) b.set(N.slotIndex, { name: N.name, tier: N.tier });
  G.setState({ equippedPatches: b });
  const A = c.settings ?? n1;
  G.setState({
    bgmVolume: A.bgmVolume,
    seVolume: A.seVolume,
    vibrationEnabled: A.vibrationEnabled,
  });
}
async function A1() {
  const l = await On(),
    { bolt: c, alloy: s } = G.getState();
  await _A(l, { id: 'singleton', bolt: c.toJSON(), alloy: s.toJSON() });
}
async function E1() {
  const l = await On(),
    { machineLevels: c } = G.getState();
  await Promise.all(Qs.map((s) => bA(l, { key: s, lv: c[s] })));
}
async function M1() {
  const l = await On(),
    { weaponLv: c, initialWeapon: s } = G.getState();
  await SA(l, { id: 'singleton', weaponLv: c, initialWeapon: s });
}
async function w1() {
  const l = await On(),
    { bgmVolume: c, seVolume: s, vibrationEnabled: r } = G.getState();
  await AA(l, { id: 'singleton', bgmVolume: c, seVolume: s, vibrationEnabled: r });
}
async function N1() {
  const l = await On(),
    {
      highestTier: c,
      highestWave: s,
      totalPlayTimeSec: r,
      totalRuns: f,
      totalEnemiesKilled: d,
      createdAt: m,
      lastPlayedAt: p,
    } = G.getState();
  await vA(l, {
    id: 'singleton',
    highestTier: c,
    highestWave: s,
    totalPlayTimeSec: r,
    totalRuns: f,
    totalEnemiesKilled: d,
    createdAt: m,
    lastPlayedAt: p,
    schemaVersion: 1,
  });
}
async function z1() {
  const l = await On(),
    { patches: c } = G.getState(),
    s = [];
  for (const r of c.values())
    r.count > 0 && s.push(xA(l, { name: r.name, tier: r.tier, count: r.count }));
  await Promise.all(s);
}
async function C1() {
  const l = await On(),
    { equippedPatches: c } = G.getState(),
    s = [];
  for (const [r, f] of c) s.push(TA(l, { slotIndex: r, name: f.name, tier: f.tier }));
  await Promise.all(s);
}
async function R1() {
  await Promise.all([N1(), A1(), E1(), M1(), z1(), C1(), w1()]);
}
function fE() {
  const l = () => {
    document.visibilityState === 'hidden' && R1();
  };
  return (
    document.addEventListener('visibilitychange', l),
    () => document.removeEventListener('visibilitychange', l)
  );
}
const dE = 500;
function cl(l, c) {
  let s = null;
  return () => {
    (s != null && clearTimeout(s),
      (s = setTimeout(() => {
        c().catch((r) => {
          console.error(`[autosave:${l}] failed`, r);
        });
      }, dE)));
  };
}
function mE() {
  (fE(),
    window.addEventListener('beforeunload', () => {
      R1();
    }));
  const l = cl('currencies', A1),
    c = cl('machine', E1),
    s = cl('weapons', M1),
    r = cl('settings', w1),
    f = cl('profile', N1),
    d = cl('patches', z1),
    m = cl('equippedPatches', C1);
  G.subscribe((p, g) => {
    ((p.bolt !== g.bolt || p.alloy !== g.alloy) && l(),
      p.machineLevels !== g.machineLevels && c(),
      (p.weaponLv !== g.weaponLv || p.initialWeapon !== g.initialWeapon) && s(),
      (p.bgmVolume !== g.bgmVolume ||
        p.seVolume !== g.seVolume ||
        p.vibrationEnabled !== g.vibrationEnabled) &&
        r(),
      (p.highestTier !== g.highestTier ||
        p.highestWave !== g.highestWave ||
        p.totalPlayTimeSec !== g.totalPlayTimeSec ||
        p.totalRuns !== g.totalRuns ||
        p.totalEnemiesKilled !== g.totalEnemiesKilled ||
        p.lastPlayedAt !== g.lastPlayedAt) &&
        f(),
      p.patches !== g.patches && d(),
      p.equippedPatches !== g.equippedPatches && m());
  });
}
const O1 = document.getElementById('root');
if (!O1) throw new Error('Failed to find #root element');
const hE = ng.createRoot(O1);
uE()
  .catch((l) => {
    console.error('[hydrateStore] failed', l);
  })
  .finally(() => {
    (mE(), hE.render(u.jsx(eS, { children: u.jsx(rE, {}) })));
  });
