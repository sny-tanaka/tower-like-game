var Fy = Object.defineProperty;
var Iy = (l, c, s) =>
  c in l ? Fy(l, c, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (l[c] = s);
var Sa = (l, c, s) => Iy(l, typeof c != 'symbol' ? c + '' : c, s);
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
function Py(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, 'default') ? l.default : l;
}
var Tu = { exports: {} },
  yc = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var P0;
function eg() {
  if (P0) return yc;
  P0 = 1;
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
  return ((yc.Fragment = c), (yc.jsx = s), (yc.jsxs = s), yc);
}
var eh;
function tg() {
  return (eh || ((eh = 1), (Tu.exports = eg())), Tu.exports);
}
var u = tg(),
  Eu = { exports: {} },
  gc = {},
  Mu = { exports: {} },
  wu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var th;
function ag() {
  return (
    th ||
      ((th = 1),
      (function (l) {
        function c(O, X) {
          var ne = O.length;
          O.push(X);
          e: for (; 0 < ne; ) {
            var xe = (ne - 1) >>> 1,
              Ee = O[xe];
            if (0 < f(Ee, X)) ((O[xe] = X), (O[ne] = Ee), (ne = xe));
            else break e;
          }
        }
        function s(O) {
          return O.length === 0 ? null : O[0];
        }
        function r(O) {
          if (O.length === 0) return null;
          var X = O[0],
            ne = O.pop();
          if (ne !== X) {
            O[0] = ne;
            e: for (var xe = 0, Ee = O.length, x = Ee >>> 1; xe < x; ) {
              var H = 2 * (xe + 1) - 1,
                K = O[H],
                W = H + 1,
                le = O[W];
              if (0 > f(K, ne))
                W < Ee && 0 > f(le, K)
                  ? ((O[xe] = le), (O[W] = ne), (xe = W))
                  : ((O[xe] = K), (O[H] = ne), (xe = H));
              else if (W < Ee && 0 > f(le, ne)) ((O[xe] = le), (O[W] = ne), (xe = W));
              else break e;
            }
          }
          return X;
        }
        function f(O, X) {
          var ne = O.sortIndex - X.sortIndex;
          return ne !== 0 ? ne : O.id - X.id;
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
          M = !1,
          T = !1,
          D = !1,
          R = !1,
          Z = typeof setTimeout == 'function' ? setTimeout : null,
          V = typeof clearTimeout == 'function' ? clearTimeout : null,
          se = typeof setImmediate < 'u' ? setImmediate : null;
        function U(O) {
          for (var X = s(y); X !== null; ) {
            if (X.callback === null) r(y);
            else if (X.startTime <= O) (r(y), (X.sortIndex = X.expirationTime), c(g, X));
            else break;
            X = s(y);
          }
        }
        function he(O) {
          if (((D = !1), U(O), !T))
            if (s(g) !== null) ((T = !0), Te || ((Te = !0), Ie()));
            else {
              var X = s(y);
              X !== null && ht(he, X.startTime - O);
            }
        }
        var Te = !1,
          ae = -1,
          Re = 5,
          nt = -1;
        function et() {
          return R ? !0 : !(l.unstable_now() - nt < Re);
        }
        function Ve() {
          if (((R = !1), Te)) {
            var O = l.unstable_now();
            nt = O;
            var X = !0;
            try {
              e: {
                ((T = !1), D && ((D = !1), V(ae), (ae = -1)), (M = !0));
                var ne = A;
                try {
                  t: {
                    for (U(O), b = s(g); b !== null && !(b.expirationTime > O && et()); ) {
                      var xe = b.callback;
                      if (typeof xe == 'function') {
                        ((b.callback = null), (A = b.priorityLevel));
                        var Ee = xe(b.expirationTime <= O);
                        if (((O = l.unstable_now()), typeof Ee == 'function')) {
                          ((b.callback = Ee), U(O), (X = !0));
                          break t;
                        }
                        (b === s(g) && r(g), U(O));
                      } else r(g);
                      b = s(g);
                    }
                    if (b !== null) X = !0;
                    else {
                      var x = s(y);
                      (x !== null && ht(he, x.startTime - O), (X = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (A = ne), (M = !1));
                }
                X = void 0;
              }
            } finally {
              X ? Ie() : (Te = !1);
            }
          }
        }
        var Ie;
        if (typeof se == 'function')
          Ie = function () {
            se(Ve);
          };
        else if (typeof MessageChannel < 'u') {
          var Ut = new MessageChannel(),
            Lt = Ut.port2;
          ((Ut.port1.onmessage = Ve),
            (Ie = function () {
              Lt.postMessage(null);
            }));
        } else
          Ie = function () {
            Z(Ve, 0);
          };
        function ht(O, X) {
          ae = Z(function () {
            O(l.unstable_now());
          }, X);
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
              : (Re = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return A;
          }),
          (l.unstable_next = function (O) {
            switch (A) {
              case 1:
              case 2:
              case 3:
                var X = 3;
                break;
              default:
                X = A;
            }
            var ne = A;
            A = X;
            try {
              return O();
            } finally {
              A = ne;
            }
          }),
          (l.unstable_requestPaint = function () {
            R = !0;
          }),
          (l.unstable_runWithPriority = function (O, X) {
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
            var ne = A;
            A = O;
            try {
              return X();
            } finally {
              A = ne;
            }
          }),
          (l.unstable_scheduleCallback = function (O, X, ne) {
            var xe = l.unstable_now();
            switch (
              (typeof ne == 'object' && ne !== null
                ? ((ne = ne.delay), (ne = typeof ne == 'number' && 0 < ne ? xe + ne : xe))
                : (ne = xe),
              O)
            ) {
              case 1:
                var Ee = -1;
                break;
              case 2:
                Ee = 250;
                break;
              case 5:
                Ee = 1073741823;
                break;
              case 4:
                Ee = 1e4;
                break;
              default:
                Ee = 5e3;
            }
            return (
              (Ee = ne + Ee),
              (O = {
                id: _++,
                callback: X,
                priorityLevel: O,
                startTime: ne,
                expirationTime: Ee,
                sortIndex: -1,
              }),
              ne > xe
                ? ((O.sortIndex = ne),
                  c(y, O),
                  s(g) === null &&
                    O === s(y) &&
                    (D ? (V(ae), (ae = -1)) : (D = !0), ht(he, ne - xe)))
                : ((O.sortIndex = Ee), c(g, O), T || M || ((T = !0), Te || ((Te = !0), Ie()))),
              O
            );
          }),
          (l.unstable_shouldYield = et),
          (l.unstable_wrapCallback = function (O) {
            var X = A;
            return function () {
              var ne = A;
              A = X;
              try {
                return O.apply(this, arguments);
              } finally {
                A = ne;
              }
            };
          }));
      })(wu)),
    wu
  );
}
var ah;
function ng() {
  return (ah || ((ah = 1), (Mu.exports = ag())), Mu.exports);
}
var Nu = { exports: {} },
  oe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var nh;
function lg() {
  if (nh) return oe;
  nh = 1;
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
  function M(x) {
    return x === null || typeof x != 'object'
      ? null
      : ((x = (A && x[A]) || x['@@iterator']), typeof x == 'function' ? x : null);
  }
  var T = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    D = Object.assign,
    R = {};
  function Z(x, H, K) {
    ((this.props = x), (this.context = H), (this.refs = R), (this.updater = K || T));
  }
  ((Z.prototype.isReactComponent = {}),
    (Z.prototype.setState = function (x, H) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, H, 'setState');
    }),
    (Z.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function V() {}
  V.prototype = Z.prototype;
  function se(x, H, K) {
    ((this.props = x), (this.context = H), (this.refs = R), (this.updater = K || T));
  }
  var U = (se.prototype = new V());
  ((U.constructor = se), D(U, Z.prototype), (U.isPureReactComponent = !0));
  var he = Array.isArray;
  function Te() {}
  var ae = { H: null, A: null, T: null, S: null },
    Re = Object.prototype.hasOwnProperty;
  function nt(x, H, K) {
    var W = K.ref;
    return { $$typeof: l, type: x, key: H, ref: W !== void 0 ? W : null, props: K };
  }
  function et(x, H) {
    return nt(x.type, H, x.props);
  }
  function Ve(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === l;
  }
  function Ie(x) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function (K) {
        return H[K];
      })
    );
  }
  var Ut = /\/+/g;
  function Lt(x, H) {
    return typeof x == 'object' && x !== null && x.key != null ? Ie('' + x.key) : H.toString(36);
  }
  function ht(x) {
    switch (x.status) {
      case 'fulfilled':
        return x.value;
      case 'rejected':
        throw x.reason;
      default:
        switch (
          (typeof x.status == 'string'
            ? x.then(Te, Te)
            : ((x.status = 'pending'),
              x.then(
                function (H) {
                  x.status === 'pending' && ((x.status = 'fulfilled'), (x.value = H));
                },
                function (H) {
                  x.status === 'pending' && ((x.status = 'rejected'), (x.reason = H));
                }
              )),
          x.status)
        ) {
          case 'fulfilled':
            return x.value;
          case 'rejected':
            throw x.reason;
        }
    }
    throw x;
  }
  function O(x, H, K, W, le) {
    var fe = typeof x;
    (fe === 'undefined' || fe === 'boolean') && (x = null);
    var je = !1;
    if (x === null) je = !0;
    else
      switch (fe) {
        case 'bigint':
        case 'string':
        case 'number':
          je = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case l:
            case c:
              je = !0;
              break;
            case _:
              return ((je = x._init), O(je(x._payload), H, K, W, le));
          }
      }
    if (je)
      return (
        (le = le(x)),
        (je = W === '' ? '.' + Lt(x, 0) : W),
        he(le)
          ? ((K = ''),
            je != null && (K = je.replace(Ut, '$&/') + '/'),
            O(le, H, K, '', function (Ba) {
              return Ba;
            }))
          : le != null &&
            (Ve(le) &&
              (le = et(
                le,
                K +
                  (le.key == null || (x && x.key === le.key)
                    ? ''
                    : ('' + le.key).replace(Ut, '$&/') + '/') +
                  je
              )),
            H.push(le)),
        1
      );
    je = 0;
    var pt = W === '' ? '.' : W + ':';
    if (he(x))
      for (var Ke = 0; Ke < x.length; Ke++)
        ((W = x[Ke]), (fe = pt + Lt(W, Ke)), (je += O(W, H, K, fe, le)));
    else if (((Ke = M(x)), typeof Ke == 'function'))
      for (x = Ke.call(x), Ke = 0; !(W = x.next()).done; )
        ((W = W.value), (fe = pt + Lt(W, Ke++)), (je += O(W, H, K, fe, le)));
    else if (fe === 'object') {
      if (typeof x.then == 'function') return O(ht(x), H, K, W, le);
      throw (
        (H = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return je;
  }
  function X(x, H, K) {
    if (x == null) return x;
    var W = [],
      le = 0;
    return (
      O(x, W, '', '', function (fe) {
        return H.call(K, fe, le++);
      }),
      W
    );
  }
  function ne(x) {
    if (x._status === -1) {
      var H = x._result;
      ((H = H()),
        H.then(
          function (K) {
            (x._status === 0 || x._status === -1) && ((x._status = 1), (x._result = K));
          },
          function (K) {
            (x._status === 0 || x._status === -1) && ((x._status = 2), (x._result = K));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = H)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var xe =
      typeof reportError == 'function'
        ? reportError
        : function (x) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var H = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof x == 'object' && x !== null && typeof x.message == 'string'
                    ? String(x.message)
                    : String(x),
                error: x,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', x);
              return;
            }
            console.error(x);
          },
    Ee = {
      map: X,
      forEach: function (x, H, K) {
        X(
          x,
          function () {
            H.apply(this, arguments);
          },
          K
        );
      },
      count: function (x) {
        var H = 0;
        return (
          X(x, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (x) {
        return (
          X(x, function (H) {
            return H;
          }) || []
        );
      },
      only: function (x) {
        if (!Ve(x))
          throw Error('React.Children.only expected to receive a single React element child.');
        return x;
      },
    };
  return (
    (oe.Activity = b),
    (oe.Children = Ee),
    (oe.Component = Z),
    (oe.Fragment = s),
    (oe.Profiler = f),
    (oe.PureComponent = se),
    (oe.StrictMode = r),
    (oe.Suspense = g),
    (oe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ae),
    (oe.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return ae.H.useMemoCache(x);
      },
    }),
    (oe.cache = function (x) {
      return function () {
        return x.apply(null, arguments);
      };
    }),
    (oe.cacheSignal = function () {
      return null;
    }),
    (oe.cloneElement = function (x, H, K) {
      if (x == null) throw Error('The argument must be a React element, but you passed ' + x + '.');
      var W = D({}, x.props),
        le = x.key;
      if (H != null)
        for (fe in (H.key !== void 0 && (le = '' + H.key), H))
          !Re.call(H, fe) ||
            fe === 'key' ||
            fe === '__self' ||
            fe === '__source' ||
            (fe === 'ref' && H.ref === void 0) ||
            (W[fe] = H[fe]);
      var fe = arguments.length - 2;
      if (fe === 1) W.children = K;
      else if (1 < fe) {
        for (var je = Array(fe), pt = 0; pt < fe; pt++) je[pt] = arguments[pt + 2];
        W.children = je;
      }
      return nt(x.type, le, W);
    }),
    (oe.createContext = function (x) {
      return (
        (x = {
          $$typeof: m,
          _currentValue: x,
          _currentValue2: x,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (x.Provider = x),
        (x.Consumer = { $$typeof: d, _context: x }),
        x
      );
    }),
    (oe.createElement = function (x, H, K) {
      var W,
        le = {},
        fe = null;
      if (H != null)
        for (W in (H.key !== void 0 && (fe = '' + H.key), H))
          Re.call(H, W) && W !== 'key' && W !== '__self' && W !== '__source' && (le[W] = H[W]);
      var je = arguments.length - 2;
      if (je === 1) le.children = K;
      else if (1 < je) {
        for (var pt = Array(je), Ke = 0; Ke < je; Ke++) pt[Ke] = arguments[Ke + 2];
        le.children = pt;
      }
      if (x && x.defaultProps)
        for (W in ((je = x.defaultProps), je)) le[W] === void 0 && (le[W] = je[W]);
      return nt(x, fe, le);
    }),
    (oe.createRef = function () {
      return { current: null };
    }),
    (oe.forwardRef = function (x) {
      return { $$typeof: p, render: x };
    }),
    (oe.isValidElement = Ve),
    (oe.lazy = function (x) {
      return { $$typeof: _, _payload: { _status: -1, _result: x }, _init: ne };
    }),
    (oe.memo = function (x, H) {
      return { $$typeof: y, type: x, compare: H === void 0 ? null : H };
    }),
    (oe.startTransition = function (x) {
      var H = ae.T,
        K = {};
      ae.T = K;
      try {
        var W = x(),
          le = ae.S;
        (le !== null && le(K, W),
          typeof W == 'object' && W !== null && typeof W.then == 'function' && W.then(Te, xe));
      } catch (fe) {
        xe(fe);
      } finally {
        (H !== null && K.types !== null && (H.types = K.types), (ae.T = H));
      }
    }),
    (oe.unstable_useCacheRefresh = function () {
      return ae.H.useCacheRefresh();
    }),
    (oe.use = function (x) {
      return ae.H.use(x);
    }),
    (oe.useActionState = function (x, H, K) {
      return ae.H.useActionState(x, H, K);
    }),
    (oe.useCallback = function (x, H) {
      return ae.H.useCallback(x, H);
    }),
    (oe.useContext = function (x) {
      return ae.H.useContext(x);
    }),
    (oe.useDebugValue = function () {}),
    (oe.useDeferredValue = function (x, H) {
      return ae.H.useDeferredValue(x, H);
    }),
    (oe.useEffect = function (x, H) {
      return ae.H.useEffect(x, H);
    }),
    (oe.useEffectEvent = function (x) {
      return ae.H.useEffectEvent(x);
    }),
    (oe.useId = function () {
      return ae.H.useId();
    }),
    (oe.useImperativeHandle = function (x, H, K) {
      return ae.H.useImperativeHandle(x, H, K);
    }),
    (oe.useInsertionEffect = function (x, H) {
      return ae.H.useInsertionEffect(x, H);
    }),
    (oe.useLayoutEffect = function (x, H) {
      return ae.H.useLayoutEffect(x, H);
    }),
    (oe.useMemo = function (x, H) {
      return ae.H.useMemo(x, H);
    }),
    (oe.useOptimistic = function (x, H) {
      return ae.H.useOptimistic(x, H);
    }),
    (oe.useReducer = function (x, H, K) {
      return ae.H.useReducer(x, H, K);
    }),
    (oe.useRef = function (x) {
      return ae.H.useRef(x);
    }),
    (oe.useState = function (x) {
      return ae.H.useState(x);
    }),
    (oe.useSyncExternalStore = function (x, H, K) {
      return ae.H.useSyncExternalStore(x, H, K);
    }),
    (oe.useTransition = function () {
      return ae.H.useTransition();
    }),
    (oe.version = '19.2.5'),
    oe
  );
}
var lh;
function Pu() {
  return (lh || ((lh = 1), (Nu.exports = lg())), Nu.exports);
}
var zu = { exports: {} },
  Ot = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ih;
function ig() {
  if (ih) return Ot;
  ih = 1;
  var l = Pu();
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
    (Ot.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (Ot.createPortal = function (g, y) {
      var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(c(299));
      return d(g, y, null, _);
    }),
    (Ot.flushSync = function (g) {
      var y = m.T,
        _ = r.p;
      try {
        if (((m.T = null), (r.p = 2), g)) return g();
      } finally {
        ((m.T = y), (r.p = _), r.d.f());
      }
    }),
    (Ot.preconnect = function (g, y) {
      typeof g == 'string' &&
        (y
          ? ((y = y.crossOrigin),
            (y = typeof y == 'string' ? (y === 'use-credentials' ? y : '') : void 0))
          : (y = null),
        r.d.C(g, y));
    }),
    (Ot.prefetchDNS = function (g) {
      typeof g == 'string' && r.d.D(g);
    }),
    (Ot.preinit = function (g, y) {
      if (typeof g == 'string' && y && typeof y.as == 'string') {
        var _ = y.as,
          b = p(_, y.crossOrigin),
          A = typeof y.integrity == 'string' ? y.integrity : void 0,
          M = typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0;
        _ === 'style'
          ? r.d.S(g, typeof y.precedence == 'string' ? y.precedence : void 0, {
              crossOrigin: b,
              integrity: A,
              fetchPriority: M,
            })
          : _ === 'script' &&
            r.d.X(g, {
              crossOrigin: b,
              integrity: A,
              fetchPriority: M,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
      }
    }),
    (Ot.preinitModule = function (g, y) {
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
    (Ot.preload = function (g, y) {
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
    (Ot.preloadModule = function (g, y) {
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
    (Ot.requestFormReset = function (g) {
      r.d.r(g);
    }),
    (Ot.unstable_batchedUpdates = function (g, y) {
      return g(y);
    }),
    (Ot.useFormState = function (g, y, _) {
      return m.H.useFormState(g, y, _);
    }),
    (Ot.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (Ot.version = '19.2.5'),
    Ot
  );
}
var ch;
function cg() {
  if (ch) return zu.exports;
  ch = 1;
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
  return (l(), (zu.exports = ig()), zu.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sh;
function sg() {
  if (sh) return gc;
  sh = 1;
  var l = ng(),
    c = Pu(),
    s = cg();
  function r(e) {
    var t = 'https://react.dev/errors/' + e;
    if (1 < arguments.length) {
      t += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++) t += '&args[]=' + encodeURIComponent(arguments[a]);
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function f(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function d(e) {
    var t = e,
      a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (a = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function m(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (d(e) !== e) throw Error(r(188));
  }
  function y(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var a = e, n = t; ; ) {
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
          if (o === a) return (g(i), e);
          if (o === n) return (g(i), t);
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
    return a.stateNode.current === a ? e : t;
  }
  function _(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = _(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign,
    A = Symbol.for('react.element'),
    M = Symbol.for('react.transitional.element'),
    T = Symbol.for('react.portal'),
    D = Symbol.for('react.fragment'),
    R = Symbol.for('react.strict_mode'),
    Z = Symbol.for('react.profiler'),
    V = Symbol.for('react.consumer'),
    se = Symbol.for('react.context'),
    U = Symbol.for('react.forward_ref'),
    he = Symbol.for('react.suspense'),
    Te = Symbol.for('react.suspense_list'),
    ae = Symbol.for('react.memo'),
    Re = Symbol.for('react.lazy'),
    nt = Symbol.for('react.activity'),
    et = Symbol.for('react.memo_cache_sentinel'),
    Ve = Symbol.iterator;
  function Ie(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Ve && e[Ve]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var Ut = Symbol.for('react.client.reference');
  function Lt(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === Ut ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case D:
        return 'Fragment';
      case Z:
        return 'Profiler';
      case R:
        return 'StrictMode';
      case he:
        return 'Suspense';
      case Te:
        return 'SuspenseList';
      case nt:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case T:
          return 'Portal';
        case se:
          return e.displayName || 'Context';
        case V:
          return (e._context.displayName || 'Context') + '.Consumer';
        case U:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case ae:
          return ((t = e.displayName || null), t !== null ? t : Lt(e.type) || 'Memo');
        case Re:
          ((t = e._payload), (e = e._init));
          try {
            return Lt(e(t));
          } catch {}
      }
    return null;
  }
  var ht = Array.isArray,
    O = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ne = { pending: !1, data: null, method: null, action: null },
    xe = [],
    Ee = -1;
  function x(e) {
    return { current: e };
  }
  function H(e) {
    0 > Ee || ((e.current = xe[Ee]), (xe[Ee] = null), Ee--);
  }
  function K(e, t) {
    (Ee++, (xe[Ee] = e.current), (e.current = t));
  }
  var W = x(null),
    le = x(null),
    fe = x(null),
    je = x(null);
  function pt(e, t) {
    switch ((K(fe, t), K(le, e), K(W, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? x0(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = x0(t)), (e = j0(t, e)));
        else
          switch (e) {
            case 'svg':
              e = 1;
              break;
            case 'math':
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (H(W), K(W, e));
  }
  function Ke() {
    (H(W), H(le), H(fe));
  }
  function Ba(e) {
    e.memoizedState !== null && K(je, e);
    var t = W.current,
      a = j0(t, e.type);
    t !== a && (K(le, e), K(W, a));
  }
  function Ma(e) {
    (le.current === e && (H(W), H(le)), je.current === e && (H(je), (dc._currentValue = ne)));
  }
  var me, _t;
  function Qe(e) {
    if (me === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((me = (t && t[1]) || ''),
          (_t =
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
      me +
      e +
      _t
    );
  }
  var ie = !1;
  function ga(e, t) {
    if (!e || ie) return '';
    ie = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var k = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(k.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(k, []);
                } catch (C) {
                  var z = C;
                }
                Reflect.construct(e, [], k);
              } else {
                try {
                  k.call();
                } catch (C) {
                  z = C;
                }
                e.call(k.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (C) {
                z = C;
              }
              (k = e()) && typeof k.catch == 'function' && k.catch(function () {});
            }
          } catch (C) {
            if (C && z && typeof C.stack == 'string') return [C.stack, z.stack];
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
          N = v.split(`
`);
        for (i = n = 0; n < S.length && !S[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; i < N.length && !N[i].includes('DetermineComponentFrameRoot'); ) i++;
        if (n === S.length || i === N.length)
          for (n = S.length - 1, i = N.length - 1; 1 <= n && 0 <= i && S[n] !== N[i]; ) i--;
        for (; 1 <= n && 0 <= i; n--, i--)
          if (S[n] !== N[i]) {
            if (n !== 1 || i !== 1)
              do
                if ((n--, i--, 0 > i || S[n] !== N[i])) {
                  var B =
                    `
` + S[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      B.includes('<anonymous>') &&
                      (B = B.replace('<anonymous>', e.displayName)),
                    B
                  );
                }
              while (1 <= n && 0 <= i);
            break;
          }
      }
    } finally {
      ((ie = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? Qe(a) : '';
  }
  function ot(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Qe(e.type);
      case 16:
        return Qe('Lazy');
      case 13:
        return e.child !== t && t !== null ? Qe('Suspense Fallback') : Qe('Suspense');
      case 19:
        return Qe('SuspenseList');
      case 0:
      case 15:
        return ga(e.type, !1);
      case 11:
        return ga(e.type.render, !1);
      case 1:
        return ga(e.type, !0);
      case 31:
        return Qe('Activity');
      default:
        return '';
    }
  }
  function bt(e) {
    try {
      var t = '',
        a = null;
      do ((t += ot(e, a)), (a = e), (e = e.return));
      while (e);
      return t;
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
  var Oe = Object.prototype.hasOwnProperty,
    At = l.unstable_scheduleCallback,
    He = l.unstable_cancelCallback,
    tt = l.unstable_shouldYield,
    Rt = l.unstable_requestPaint,
    De = l.unstable_now,
    aa = l.unstable_getCurrentPriorityLevel,
    La = l.unstable_ImmediatePriority,
    $a = l.unstable_UserBlockingPriority,
    mn = l.unstable_NormalPriority,
    Ti = l.unstable_LowPriority,
    Kn = l.unstable_IdlePriority,
    Qn = l.log,
    Nl = l.unstable_setDisableYieldValue,
    wa = null,
    yt = null;
  function Tt(e) {
    if ((typeof Qn == 'function' && Nl(e), yt && typeof yt.setStrictMode == 'function'))
      try {
        yt.setStrictMode(wa, e);
      } catch {}
  }
  var gt = Math.clz32 ? Math.clz32 : Ha,
    F = Math.log,
    Wn = Math.LN2;
  function Ha(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((F(e) / Wn) | 0)) | 0);
  }
  var Jn = 256,
    ka = 262144,
    Ua = 4194304;
  function na(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
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
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
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
        return e;
    }
  }
  function qa(e, t, a) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var i = 0,
      o = e.suspendedLanes,
      h = e.pingedLanes;
    e = e.warmLanes;
    var v = n & 134217727;
    return (
      v !== 0
        ? ((n = v & ~o),
          n !== 0
            ? (i = na(n))
            : ((h &= v), h !== 0 ? (i = na(h)) : a || ((a = v & ~e), a !== 0 && (i = na(a)))))
        : ((v = n & ~o),
          v !== 0
            ? (i = na(v))
            : h !== 0
              ? (i = na(h))
              : a || ((a = n & ~e), a !== 0 && (i = na(a)))),
      i === 0
        ? 0
        : t !== 0 &&
            t !== i &&
            (t & o) === 0 &&
            ((o = i & -i), (a = t & -t), o >= a || (o === 32 && (a & 4194048) !== 0))
          ? t
          : i
    );
  }
  function Fn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function In(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
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
        return t + 5e3;
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
  function Ei() {
    var e = Ua;
    return ((Ua <<= 1), (Ua & 62914560) === 0 && (Ua = 4194304), e);
  }
  function Pn(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function J(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function re(e, t, a, n, i, o) {
    var h = e.pendingLanes;
    ((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0));
    var v = e.entanglements,
      S = e.expirationTimes,
      N = e.hiddenUpdates;
    for (a = h & ~a; 0 < a; ) {
      var B = 31 - gt(a),
        k = 1 << B;
      ((v[B] = 0), (S[B] = -1));
      var z = N[B];
      if (z !== null)
        for (N[B] = null, B = 0; B < z.length; B++) {
          var C = z[B];
          C !== null && (C.lane &= -536870913);
        }
      a &= ~k;
    }
    (n !== 0 && pe(e, n, 0),
      o !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(h & ~t)));
  }
  function pe(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - gt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function we(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var n = 31 - gt(a),
        i = 1 << n;
      ((i & t) | (e[n] & t) && (e[n] |= t), (a &= ~i));
    }
  }
  function We(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : $t(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function $t(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Be(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Ae() {
    var e = X.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : X0(e.type));
  }
  function Me(e, t) {
    var a = X.p;
    try {
      return ((X.p = e), t());
    } finally {
      X.p = a;
    }
  }
  var Ze = Math.random().toString(36).slice(2),
    at = '__reactFiber$' + Ze,
    Et = '__reactProps$' + Ze,
    Na = '__reactContainer$' + Ze,
    yo = '__reactEvents$' + Ze,
    U1 = '__reactListeners$' + Ze,
    q1 = '__reactHandles$' + Ze,
    rf = '__reactResources$' + Ze,
    Mi = '__reactMarker$' + Ze;
  function go(e) {
    (delete e[at], delete e[Et], delete e[yo], delete e[U1], delete e[q1]);
  }
  function zl(e) {
    var t = e[at];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Na] || a[at])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = z0(e); e !== null; ) {
            if ((a = e[at])) return a;
            e = z0(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function Cl(e) {
    if ((e = e[at] || e[Na])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function wi(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function Rl(e) {
    var t = e[rf];
    return (t || (t = e[rf] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function St(e) {
    e[Mi] = !0;
  }
  var uf = new Set(),
    ff = {};
  function el(e, t) {
    (Ol(e, t), Ol(e + 'Capture', t));
  }
  function Ol(e, t) {
    for (ff[e] = t, e = 0; e < t.length; e++) uf.add(t[e]);
  }
  var V1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    df = {},
    mf = {};
  function G1(e) {
    return Oe.call(mf, e)
      ? !0
      : Oe.call(df, e)
        ? !1
        : V1.test(e)
          ? (mf[e] = !0)
          : ((df[e] = !0), !1);
  }
  function Hc(e, t, a) {
    if (G1(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(t);
            return;
          case 'boolean':
            var n = t.toLowerCase().slice(0, 5);
            if (n !== 'data-' && n !== 'aria-') {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, '' + a);
      }
  }
  function kc(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, '' + a);
    }
  }
  function Va(e, t, a, n) {
    if (n === null) e.removeAttribute(a);
    else {
      switch (typeof n) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, '' + n);
    }
  }
  function la(e) {
    switch (typeof e) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e;
      case 'object':
        return e;
      default:
        return '';
    }
  }
  function hf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function Y1(e, t, a) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var i = n.get,
        o = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return i.call(this);
          },
          set: function (h) {
            ((a = '' + h), o.call(this, h));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (h) {
            a = '' + h;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function vo(e) {
    if (!e._valueTracker) {
      var t = hf(e) ? 'checked' : 'value';
      e._valueTracker = Y1(e, t, '' + e[t]);
    }
  }
  function pf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      n = '';
    return (
      e && (n = hf(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function Uc(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Z1 = /[\n"\\]/g;
  function ia(e) {
    return e.replace(Z1, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function _o(e, t, a, n, i, o, h, v) {
    ((e.name = ''),
      h != null && typeof h != 'function' && typeof h != 'symbol' && typeof h != 'boolean'
        ? (e.type = h)
        : e.removeAttribute('type'),
      t != null
        ? h === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + la(t))
          : e.value !== '' + la(t) && (e.value = '' + la(t))
        : (h !== 'submit' && h !== 'reset') || e.removeAttribute('value'),
      t != null
        ? bo(e, h, la(t))
        : a != null
          ? bo(e, h, la(a))
          : n != null && e.removeAttribute('value'),
      i == null && o != null && (e.defaultChecked = !!o),
      i != null && (e.checked = i && typeof i != 'function' && typeof i != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (e.name = '' + la(v))
        : e.removeAttribute('name'));
  }
  function yf(e, t, a, n, i, o, h, v) {
    if (
      (o != null &&
        typeof o != 'function' &&
        typeof o != 'symbol' &&
        typeof o != 'boolean' &&
        (e.type = o),
      t != null || a != null)
    ) {
      if (!((o !== 'submit' && o !== 'reset') || t != null)) {
        vo(e);
        return;
      }
      ((a = a != null ? '' + la(a) : ''),
        (t = t != null ? '' + la(t) : a),
        v || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? i),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = v ? e.checked : !!n),
      (e.defaultChecked = !!n),
      h != null &&
        typeof h != 'function' &&
        typeof h != 'symbol' &&
        typeof h != 'boolean' &&
        (e.name = h),
      vo(e));
  }
  function bo(e, t, a) {
    (t === 'number' && Uc(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function Dl(e, t, a, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var i = 0; i < a.length; i++) t['$' + a[i]] = !0;
      for (a = 0; a < e.length; a++)
        ((i = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== i && (e[a].selected = i),
          i && n && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + la(a), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === a) {
          ((e[i].selected = !0), n && (e[i].defaultSelected = !0));
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function gf(e, t, a) {
    if (t != null && ((t = '' + la(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + la(a) : '';
  }
  function vf(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(r(92));
        if (ht(n)) {
          if (1 < n.length) throw Error(r(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = la(t)),
      (e.defaultValue = a),
      (n = e.textContent),
      n === a && n !== '' && n !== null && (e.value = n),
      vo(e));
  }
  function Bl(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var X1 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function _f(e, t, a) {
    var n = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || X1.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function bf(e, t, a) {
    if (t != null && typeof t != 'object') throw Error(r(62));
    if (((e = e.style), a != null)) {
      for (var n in a)
        !a.hasOwnProperty(n) ||
          (t != null && t.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? e.setProperty(n, '')
            : n === 'float'
              ? (e.cssFloat = '')
              : (e[n] = ''));
      for (var i in t) ((n = t[i]), t.hasOwnProperty(i) && a[i] !== n && _f(e, i, n));
    } else for (var o in t) t.hasOwnProperty(o) && _f(e, o, t[o]);
  }
  function So(e) {
    if (e.indexOf('-') === -1) return !1;
    switch (e) {
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
  var K1 = new Map([
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
    Q1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function qc(e) {
    return Q1.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Ga() {}
  var xo = null;
  function jo(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Ll = null,
    $l = null;
  function Sf(e) {
    var t = Cl(e);
    if (t && (e = t.stateNode)) {
      var a = e[Et] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (_o(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (t = a.name),
            a.type === 'radio' && t != null)
          ) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll('input[name="' + ia('' + t) + '"][type="radio"]'), t = 0;
              t < a.length;
              t++
            ) {
              var n = a[t];
              if (n !== e && n.form === e.form) {
                var i = n[Et] || null;
                if (!i) throw Error(r(90));
                _o(
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
            for (t = 0; t < a.length; t++) ((n = a[t]), n.form === e.form && pf(n));
          }
          break e;
        case 'textarea':
          gf(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && Dl(e, !!a.multiple, t, !1));
      }
    }
  }
  var Ao = !1;
  function xf(e, t, a) {
    if (Ao) return e(t, a);
    Ao = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Ao = !1),
        (Ll !== null || $l !== null) &&
          (ws(), Ll && ((t = Ll), (e = $l), ($l = Ll = null), Sf(t), e)))
      )
        for (t = 0; t < e.length; t++) Sf(e[t]);
    }
  }
  function Ni(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var n = a[Et] || null;
    if (n === null) return null;
    a = n[t];
    e: switch (t) {
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
          ((e = e.type),
          (n = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
          (e = !n));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != 'function') throw Error(r(231, t, typeof a));
    return a;
  }
  var Ya = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    To = !1;
  if (Ya)
    try {
      var zi = {};
      (Object.defineProperty(zi, 'passive', {
        get: function () {
          To = !0;
        },
      }),
        window.addEventListener('test', zi, zi),
        window.removeEventListener('test', zi, zi));
    } catch {
      To = !1;
    }
  var hn = null,
    Eo = null,
    Vc = null;
  function jf() {
    if (Vc) return Vc;
    var e,
      t = Eo,
      a = t.length,
      n,
      i = 'value' in hn ? hn.value : hn.textContent,
      o = i.length;
    for (e = 0; e < a && t[e] === i[e]; e++);
    var h = a - e;
    for (n = 1; n <= h && t[a - n] === i[o - n]; n++);
    return (Vc = i.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Gc(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Yc() {
    return !0;
  }
  function Af() {
    return !1;
  }
  function qt(e) {
    function t(a, n, i, o, h) {
      ((this._reactName = a),
        (this._targetInst = i),
        (this.type = n),
        (this.nativeEvent = o),
        (this.target = h),
        (this.currentTarget = null));
      for (var v in e) e.hasOwnProperty(v) && ((a = e[v]), (this[v] = a ? a(o) : o[v]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? Yc
          : Af),
        (this.isPropagationStopped = Af),
        this
      );
    }
    return (
      b(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = Yc));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Yc));
        },
        persist: function () {},
        isPersistent: Yc,
      }),
      t
    );
  }
  var tl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Zc = qt(tl),
    Ci = b({}, tl, { view: 0, detail: 0 }),
    W1 = qt(Ci),
    Mo,
    wo,
    Ri,
    Xc = b({}, Ci, {
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
      getModifierState: zo,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== Ri &&
              (Ri && e.type === 'mousemove'
                ? ((Mo = e.screenX - Ri.screenX), (wo = e.screenY - Ri.screenY))
                : (wo = Mo = 0),
              (Ri = e)),
            Mo);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : wo;
      },
    }),
    Tf = qt(Xc),
    J1 = b({}, Xc, { dataTransfer: 0 }),
    F1 = qt(J1),
    I1 = b({}, Ci, { relatedTarget: 0 }),
    No = qt(I1),
    P1 = b({}, tl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ep = qt(P1),
    tp = b({}, tl, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    ap = qt(tp),
    np = b({}, tl, { data: 0 }),
    Ef = qt(np),
    lp = {
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
    ip = {
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
    cp = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function sp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = cp[e]) ? !!t[e] : !1;
  }
  function zo() {
    return sp;
  }
  var op = b({}, Ci, {
      key: function (e) {
        if (e.key) {
          var t = lp[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Gc(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? ip[e.keyCode] || 'Unidentified'
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
      getModifierState: zo,
      charCode: function (e) {
        return e.type === 'keypress' ? Gc(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Gc(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    rp = qt(op),
    up = b({}, Xc, {
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
    Mf = qt(up),
    fp = b({}, Ci, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: zo,
    }),
    dp = qt(fp),
    mp = b({}, tl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    hp = qt(mp),
    pp = b({}, Xc, {
      deltaX: function (e) {
        return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    yp = qt(pp),
    gp = b({}, tl, { newState: 0, oldState: 0 }),
    vp = qt(gp),
    _p = [9, 13, 27, 32],
    Co = Ya && 'CompositionEvent' in window,
    Oi = null;
  Ya && 'documentMode' in document && (Oi = document.documentMode);
  var bp = Ya && 'TextEvent' in window && !Oi,
    wf = Ya && (!Co || (Oi && 8 < Oi && 11 >= Oi)),
    Nf = ' ',
    zf = !1;
  function Cf(e, t) {
    switch (e) {
      case 'keyup':
        return _p.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function Rf(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Hl = !1;
  function Sp(e, t) {
    switch (e) {
      case 'compositionend':
        return Rf(t);
      case 'keypress':
        return t.which !== 32 ? null : ((zf = !0), Nf);
      case 'textInput':
        return ((e = t.data), e === Nf && zf ? null : e);
      default:
        return null;
    }
  }
  function xp(e, t) {
    if (Hl)
      return e === 'compositionend' || (!Co && Cf(e, t))
        ? ((e = jf()), (Vc = Eo = hn = null), (Hl = !1), e)
        : null;
    switch (e) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case 'compositionend':
        return wf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var jp = {
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
  function Of(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!jp[e.type] : t === 'textarea';
  }
  function Df(e, t, a, n) {
    (Ll ? ($l ? $l.push(n) : ($l = [n])) : (Ll = n),
      (t = Bs(t, 'onChange')),
      0 < t.length &&
        ((a = new Zc('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var Di = null,
    Bi = null;
  function Ap(e) {
    y0(e, 0);
  }
  function Kc(e) {
    var t = wi(e);
    if (pf(t)) return e;
  }
  function Bf(e, t) {
    if (e === 'change') return t;
  }
  var Lf = !1;
  if (Ya) {
    var Ro;
    if (Ya) {
      var Oo = 'oninput' in document;
      if (!Oo) {
        var $f = document.createElement('div');
        ($f.setAttribute('oninput', 'return;'), (Oo = typeof $f.oninput == 'function'));
      }
      Ro = Oo;
    } else Ro = !1;
    Lf = Ro && (!document.documentMode || 9 < document.documentMode);
  }
  function Hf() {
    Di && (Di.detachEvent('onpropertychange', kf), (Bi = Di = null));
  }
  function kf(e) {
    if (e.propertyName === 'value' && Kc(Bi)) {
      var t = [];
      (Df(t, Bi, e, jo(e)), xf(Ap, t));
    }
  }
  function Tp(e, t, a) {
    e === 'focusin'
      ? (Hf(), (Di = t), (Bi = a), Di.attachEvent('onpropertychange', kf))
      : e === 'focusout' && Hf();
  }
  function Ep(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Kc(Bi);
  }
  function Mp(e, t) {
    if (e === 'click') return Kc(t);
  }
  function wp(e, t) {
    if (e === 'input' || e === 'change') return Kc(t);
  }
  function Np(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Kt = typeof Object.is == 'function' ? Object.is : Np;
  function Li(e, t) {
    if (Kt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      n = Object.keys(t);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var i = a[n];
      if (!Oe.call(t, i) || !Kt(e[i], t[i])) return !1;
    }
    return !0;
  }
  function Uf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function qf(e, t) {
    var a = Uf(e);
    e = 0;
    for (var n; a; ) {
      if (a.nodeType === 3) {
        if (((n = e + a.textContent.length), e <= t && n >= t)) return { node: a, offset: t - e };
        e = n;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Uf(a);
    }
  }
  function Vf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Vf(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Gf(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Uc(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Uc(e.document);
    }
    return t;
  }
  function Do(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    );
  }
  var zp = Ya && 'documentMode' in document && 11 >= document.documentMode,
    kl = null,
    Bo = null,
    $i = null,
    Lo = !1;
  function Yf(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Lo ||
      kl == null ||
      kl !== Uc(n) ||
      ((n = kl),
      'selectionStart' in n && Do(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      ($i && Li($i, n)) ||
        (($i = n),
        (n = Bs(Bo, 'onSelect')),
        0 < n.length &&
          ((t = new Zc('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: n }),
          (t.target = kl))));
  }
  function al(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var Ul = {
      animationend: al('Animation', 'AnimationEnd'),
      animationiteration: al('Animation', 'AnimationIteration'),
      animationstart: al('Animation', 'AnimationStart'),
      transitionrun: al('Transition', 'TransitionRun'),
      transitionstart: al('Transition', 'TransitionStart'),
      transitioncancel: al('Transition', 'TransitionCancel'),
      transitionend: al('Transition', 'TransitionEnd'),
    },
    $o = {},
    Zf = {};
  Ya &&
    ((Zf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Ul.animationend.animation,
      delete Ul.animationiteration.animation,
      delete Ul.animationstart.animation),
    'TransitionEvent' in window || delete Ul.transitionend.transition);
  function nl(e) {
    if ($o[e]) return $o[e];
    if (!Ul[e]) return e;
    var t = Ul[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in Zf) return ($o[e] = t[a]);
    return e;
  }
  var Xf = nl('animationend'),
    Kf = nl('animationiteration'),
    Qf = nl('animationstart'),
    Cp = nl('transitionrun'),
    Rp = nl('transitionstart'),
    Op = nl('transitioncancel'),
    Wf = nl('transitionend'),
    Jf = new Map(),
    Ho =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Ho.push('scrollEnd');
  function va(e, t) {
    (Jf.set(e, t), el(t, [e]));
  }
  var Qc =
      typeof reportError == 'function'
        ? reportError
        : function (e) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var t = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == 'object' && e !== null && typeof e.message == 'string'
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', e);
              return;
            }
            console.error(e);
          },
    ca = [],
    ql = 0,
    ko = 0;
  function Wc() {
    for (var e = ql, t = (ko = ql = 0); t < e; ) {
      var a = ca[t];
      ca[t++] = null;
      var n = ca[t];
      ca[t++] = null;
      var i = ca[t];
      ca[t++] = null;
      var o = ca[t];
      if (((ca[t++] = null), n !== null && i !== null)) {
        var h = n.pending;
        (h === null ? (i.next = i) : ((i.next = h.next), (h.next = i)), (n.pending = i));
      }
      o !== 0 && Ff(a, i, o);
    }
  }
  function Jc(e, t, a, n) {
    ((ca[ql++] = e),
      (ca[ql++] = t),
      (ca[ql++] = a),
      (ca[ql++] = n),
      (ko |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function Uo(e, t, a, n) {
    return (Jc(e, t, a, n), Fc(e));
  }
  function ll(e, t) {
    return (Jc(e, null, null, t), Fc(e));
  }
  function Ff(e, t, a) {
    e.lanes |= a;
    var n = e.alternate;
    n !== null && (n.lanes |= a);
    for (var i = !1, o = e.return; o !== null; )
      ((o.childLanes |= a),
        (n = o.alternate),
        n !== null && (n.childLanes |= a),
        o.tag === 22 && ((e = o.stateNode), e === null || e._visibility & 1 || (i = !0)),
        (e = o),
        (o = o.return));
    return e.tag === 3
      ? ((o = e.stateNode),
        i &&
          t !== null &&
          ((i = 31 - gt(a)),
          (e = o.hiddenUpdates),
          (n = e[i]),
          n === null ? (e[i] = [t]) : n.push(t),
          (t.lane = a | 536870912)),
        o)
      : null;
  }
  function Fc(e) {
    if (50 < ic) throw ((ic = 0), (Wr = null), Error(r(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Vl = {};
  function Dp(e, t, a, n) {
    ((this.tag = e),
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
      (this.pendingProps = t),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = n),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Qt(e, t, a, n) {
    return new Dp(e, t, a, n);
  }
  function qo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Za(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = Qt(e.tag, t, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = t),
          (a.type = e.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = e.flags & 65011712),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    );
  }
  function If(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (t = a.dependencies),
          (e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function Ic(e, t, a, n, i, o) {
    var h = 0;
    if (((n = e), typeof e == 'function')) qo(e) && (h = 1);
    else if (typeof e == 'string')
      h = ky(e, a, W.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case nt:
          return ((e = Qt(31, a, t, i)), (e.elementType = nt), (e.lanes = o), e);
        case D:
          return il(a.children, i, o, t);
        case R:
          ((h = 8), (i |= 24));
          break;
        case Z:
          return ((e = Qt(12, a, t, i | 2)), (e.elementType = Z), (e.lanes = o), e);
        case he:
          return ((e = Qt(13, a, t, i)), (e.elementType = he), (e.lanes = o), e);
        case Te:
          return ((e = Qt(19, a, t, i)), (e.elementType = Te), (e.lanes = o), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case se:
                h = 10;
                break e;
              case V:
                h = 9;
                break e;
              case U:
                h = 11;
                break e;
              case ae:
                h = 14;
                break e;
              case Re:
                ((h = 16), (n = null));
                break e;
            }
          ((h = 29), (a = Error(r(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Qt(h, a, t, i)), (t.elementType = e), (t.type = n), (t.lanes = o), t);
  }
  function il(e, t, a, n) {
    return ((e = Qt(7, e, n, t)), (e.lanes = a), e);
  }
  function Vo(e, t, a) {
    return ((e = Qt(6, e, null, t)), (e.lanes = a), e);
  }
  function Pf(e) {
    var t = Qt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Go(e, t, a) {
    return (
      (t = Qt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var ed = new WeakMap();
  function sa(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = ed.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: bt(t) }), ed.set(e, t), t);
    }
    return { value: e, source: t, stack: bt(t) };
  }
  var Gl = [],
    Yl = 0,
    Pc = null,
    Hi = 0,
    oa = [],
    ra = 0,
    pn = null,
    za = 1,
    Ca = '';
  function Xa(e, t) {
    ((Gl[Yl++] = Hi), (Gl[Yl++] = Pc), (Pc = e), (Hi = t));
  }
  function td(e, t, a) {
    ((oa[ra++] = za), (oa[ra++] = Ca), (oa[ra++] = pn), (pn = e));
    var n = za;
    e = Ca;
    var i = 32 - gt(n) - 1;
    ((n &= ~(1 << i)), (a += 1));
    var o = 32 - gt(t) + i;
    if (30 < o) {
      var h = i - (i % 5);
      ((o = (n & ((1 << h) - 1)).toString(32)),
        (n >>= h),
        (i -= h),
        (za = (1 << (32 - gt(t) + i)) | (a << i) | n),
        (Ca = o + e));
    } else ((za = (1 << o) | (a << i) | n), (Ca = e));
  }
  function Yo(e) {
    e.return !== null && (Xa(e, 1), td(e, 1, 0));
  }
  function Zo(e) {
    for (; e === Pc; ) ((Pc = Gl[--Yl]), (Gl[Yl] = null), (Hi = Gl[--Yl]), (Gl[Yl] = null));
    for (; e === pn; )
      ((pn = oa[--ra]),
        (oa[ra] = null),
        (Ca = oa[--ra]),
        (oa[ra] = null),
        (za = oa[--ra]),
        (oa[ra] = null));
  }
  function ad(e, t) {
    ((oa[ra++] = za), (oa[ra++] = Ca), (oa[ra++] = pn), (za = t.id), (Ca = t.overflow), (pn = e));
  }
  var Mt = null,
    Je = null,
    Se = !1,
    yn = null,
    ua = !1,
    Xo = Error(r(519));
  function gn(e) {
    var t = Error(
      r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (ki(sa(t, e)), Xo);
  }
  function nd(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[at] = e), (t[Et] = n), a)) {
      case 'dialog':
        (ge('cancel', t), ge('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ge('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < sc.length; a++) ge(sc[a], t);
        break;
      case 'source':
        ge('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (ge('error', t), ge('load', t));
        break;
      case 'details':
        ge('toggle', t);
        break;
      case 'input':
        (ge('invalid', t),
          yf(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        ge('invalid', t);
        break;
      case 'textarea':
        (ge('invalid', t), vf(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      b0(t.textContent, a)
        ? (n.popover != null && (ge('beforetoggle', t), ge('toggle', t)),
          n.onScroll != null && ge('scroll', t),
          n.onScrollEnd != null && ge('scrollend', t),
          n.onClick != null && (t.onclick = Ga),
          (t = !0))
        : (t = !1),
      t || gn(e, !0));
  }
  function ld(e) {
    for (Mt = e.return; Mt; )
      switch (Mt.tag) {
        case 5:
        case 31:
        case 13:
          ua = !1;
          return;
        case 27:
        case 3:
          ua = !0;
          return;
        default:
          Mt = Mt.return;
      }
  }
  function Zl(e) {
    if (e !== Mt) return !1;
    if (!Se) return (ld(e), (Se = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || uu(e.type, e.memoizedProps))),
        (a = !a)),
      a && Je && gn(e),
      ld(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(r(317));
      Je = N0(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(r(317));
      Je = N0(e);
    } else
      t === 27
        ? ((t = Je), Cn(e.type) ? ((e = pu), (pu = null), (Je = e)) : (Je = t))
        : (Je = Mt ? da(e.stateNode.nextSibling) : null);
    return !0;
  }
  function cl() {
    ((Je = Mt = null), (Se = !1));
  }
  function Ko() {
    var e = yn;
    return (e !== null && (Zt === null ? (Zt = e) : Zt.push.apply(Zt, e), (yn = null)), e);
  }
  function ki(e) {
    yn === null ? (yn = [e]) : yn.push(e);
  }
  var Qo = x(null),
    sl = null,
    Ka = null;
  function vn(e, t, a) {
    (K(Qo, t._currentValue), (t._currentValue = a));
  }
  function Qa(e) {
    ((e._currentValue = Qo.current), H(Qo));
  }
  function Wo(e, t, a) {
    for (; e !== null; ) {
      var n = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), n !== null && (n.childLanes |= t))
          : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function Jo(e, t, a, n) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var o = i.dependencies;
      if (o !== null) {
        var h = i.child;
        o = o.firstContext;
        e: for (; o !== null; ) {
          var v = o;
          o = i;
          for (var S = 0; S < t.length; S++)
            if (v.context === t[S]) {
              ((o.lanes |= a),
                (v = o.alternate),
                v !== null && (v.lanes |= a),
                Wo(o.return, a, e),
                n || (h = null));
              break e;
            }
          o = v.next;
        }
      } else if (i.tag === 18) {
        if (((h = i.return), h === null)) throw Error(r(341));
        ((h.lanes |= a), (o = h.alternate), o !== null && (o.lanes |= a), Wo(h, a, e), (h = null));
      } else h = i.child;
      if (h !== null) h.return = i;
      else
        for (h = i; h !== null; ) {
          if (h === e) {
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
  function Xl(e, t, a, n) {
    e = null;
    for (var i = t, o = !1; i !== null; ) {
      if (!o) {
        if ((i.flags & 524288) !== 0) o = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var h = i.alternate;
        if (h === null) throw Error(r(387));
        if (((h = h.memoizedProps), h !== null)) {
          var v = i.type;
          Kt(i.pendingProps.value, h.value) || (e !== null ? e.push(v) : (e = [v]));
        }
      } else if (i === je.current) {
        if (((h = i.alternate), h === null)) throw Error(r(387));
        h.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
          (e !== null ? e.push(dc) : (e = [dc]));
      }
      i = i.return;
    }
    (e !== null && Jo(t, e, a, n), (t.flags |= 262144));
  }
  function es(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Kt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function ol(e) {
    ((sl = e), (Ka = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function wt(e) {
    return id(sl, e);
  }
  function ts(e, t) {
    return (sl === null && ol(e), id(e, t));
  }
  function id(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Ka === null)) {
      if (e === null) throw Error(r(308));
      ((Ka = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Ka = Ka.next = t;
    return a;
  }
  var Bp =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, n) {
                  e.push(n);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                }));
            };
          },
    Lp = l.unstable_scheduleCallback,
    $p = l.unstable_NormalPriority,
    rt = {
      $$typeof: se,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Fo() {
    return { controller: new Bp(), data: new Map(), refCount: 0 };
  }
  function Ui(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Lp($p, function () {
          e.controller.abort();
        }));
  }
  var qi = null,
    Io = 0,
    Kl = 0,
    Ql = null;
  function Hp(e, t) {
    if (qi === null) {
      var a = (qi = []);
      ((Io = 0),
        (Kl = tu()),
        (Ql = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (Io++, t.then(cd, cd), t);
  }
  function cd() {
    if (--Io === 0 && qi !== null) {
      Ql !== null && (Ql.status = 'fulfilled');
      var e = qi;
      ((qi = null), (Kl = 0), (Ql = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function kp(e, t) {
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
      e.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = t));
          for (var i = 0; i < a.length; i++) (0, a[i])(t);
        },
        function (i) {
          for (n.status = 'rejected', n.reason = i, i = 0; i < a.length; i++) (0, a[i])(void 0);
        }
      ),
      n
    );
  }
  var sd = O.S;
  O.S = function (e, t) {
    ((Ym = De()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Hp(e, t),
      sd !== null && sd(e, t));
  };
  var rl = x(null);
  function Po() {
    var e = rl.current;
    return e !== null ? e : Ge.pooledCache;
  }
  function as(e, t) {
    t === null ? K(rl, rl.current) : K(rl, t.pool);
  }
  function od() {
    var e = Po();
    return e === null ? null : { parent: rt._currentValue, pool: e };
  }
  var Wl = Error(r(460)),
    er = Error(r(474)),
    ns = Error(r(542)),
    ls = { then: function () {} };
  function rd(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function ud(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(Ga, Ga), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), dd(e), e);
      default:
        if (typeof t.status == 'string') t.then(Ga, Ga);
        else {
          if (((e = Ge), e !== null && 100 < e.shellSuspendCounter)) throw Error(r(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (n) {
                if (t.status === 'pending') {
                  var i = t;
                  ((i.status = 'fulfilled'), (i.value = n));
                }
              },
              function (n) {
                if (t.status === 'pending') {
                  var i = t;
                  ((i.status = 'rejected'), (i.reason = n));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), dd(e), e);
        }
        throw ((fl = t), Wl);
    }
  }
  function ul(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((fl = a), Wl) : a;
    }
  }
  var fl = null;
  function fd() {
    if (fl === null) throw Error(r(459));
    var e = fl;
    return ((fl = null), e);
  }
  function dd(e) {
    if (e === Wl || e === ns) throw Error(r(483));
  }
  var Jl = null,
    Vi = 0;
  function is(e) {
    var t = Vi;
    return ((Vi += 1), Jl === null && (Jl = []), ud(Jl, e, t));
  }
  function Gi(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function cs(e, t) {
    throw t.$$typeof === A
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function md(e) {
    function t(E, j) {
      if (e) {
        var w = E.deletions;
        w === null ? ((E.deletions = [j]), (E.flags |= 16)) : w.push(j);
      }
    }
    function a(E, j) {
      if (!e) return null;
      for (; j !== null; ) (t(E, j), (j = j.sibling));
      return null;
    }
    function n(E) {
      for (var j = new Map(); E !== null; )
        (E.key !== null ? j.set(E.key, E) : j.set(E.index, E), (E = E.sibling));
      return j;
    }
    function i(E, j) {
      return ((E = Za(E, j)), (E.index = 0), (E.sibling = null), E);
    }
    function o(E, j, w) {
      return (
        (E.index = w),
        e
          ? ((w = E.alternate),
            w !== null
              ? ((w = w.index), w < j ? ((E.flags |= 67108866), j) : w)
              : ((E.flags |= 67108866), j))
          : ((E.flags |= 1048576), j)
      );
    }
    function h(E) {
      return (e && E.alternate === null && (E.flags |= 67108866), E);
    }
    function v(E, j, w, $) {
      return j === null || j.tag !== 6
        ? ((j = Vo(w, E.mode, $)), (j.return = E), j)
        : ((j = i(j, w)), (j.return = E), j);
    }
    function S(E, j, w, $) {
      var te = w.type;
      return te === D
        ? B(E, j, w.props.children, $, w.key)
        : j !== null &&
            (j.elementType === te ||
              (typeof te == 'object' && te !== null && te.$$typeof === Re && ul(te) === j.type))
          ? ((j = i(j, w.props)), Gi(j, w), (j.return = E), j)
          : ((j = Ic(w.type, w.key, w.props, null, E.mode, $)), Gi(j, w), (j.return = E), j);
    }
    function N(E, j, w, $) {
      return j === null ||
        j.tag !== 4 ||
        j.stateNode.containerInfo !== w.containerInfo ||
        j.stateNode.implementation !== w.implementation
        ? ((j = Go(w, E.mode, $)), (j.return = E), j)
        : ((j = i(j, w.children || [])), (j.return = E), j);
    }
    function B(E, j, w, $, te) {
      return j === null || j.tag !== 7
        ? ((j = il(w, E.mode, $, te)), (j.return = E), j)
        : ((j = i(j, w)), (j.return = E), j);
    }
    function k(E, j, w) {
      if ((typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint')
        return ((j = Vo('' + j, E.mode, w)), (j.return = E), j);
      if (typeof j == 'object' && j !== null) {
        switch (j.$$typeof) {
          case M:
            return ((w = Ic(j.type, j.key, j.props, null, E.mode, w)), Gi(w, j), (w.return = E), w);
          case T:
            return ((j = Go(j, E.mode, w)), (j.return = E), j);
          case Re:
            return ((j = ul(j)), k(E, j, w));
        }
        if (ht(j) || Ie(j)) return ((j = il(j, E.mode, w, null)), (j.return = E), j);
        if (typeof j.then == 'function') return k(E, is(j), w);
        if (j.$$typeof === se) return k(E, ts(E, j), w);
        cs(E, j);
      }
      return null;
    }
    function z(E, j, w, $) {
      var te = j !== null ? j.key : null;
      if ((typeof w == 'string' && w !== '') || typeof w == 'number' || typeof w == 'bigint')
        return te !== null ? null : v(E, j, '' + w, $);
      if (typeof w == 'object' && w !== null) {
        switch (w.$$typeof) {
          case M:
            return w.key === te ? S(E, j, w, $) : null;
          case T:
            return w.key === te ? N(E, j, w, $) : null;
          case Re:
            return ((w = ul(w)), z(E, j, w, $));
        }
        if (ht(w) || Ie(w)) return te !== null ? null : B(E, j, w, $, null);
        if (typeof w.then == 'function') return z(E, j, is(w), $);
        if (w.$$typeof === se) return z(E, j, ts(E, w), $);
        cs(E, w);
      }
      return null;
    }
    function C(E, j, w, $, te) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((E = E.get(w) || null), v(j, E, '' + $, te));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case M:
            return ((E = E.get($.key === null ? w : $.key) || null), S(j, E, $, te));
          case T:
            return ((E = E.get($.key === null ? w : $.key) || null), N(j, E, $, te));
          case Re:
            return (($ = ul($)), C(E, j, w, $, te));
        }
        if (ht($) || Ie($)) return ((E = E.get(w) || null), B(j, E, $, te, null));
        if (typeof $.then == 'function') return C(E, j, w, is($), te);
        if ($.$$typeof === se) return C(E, j, w, ts(j, $), te);
        cs(j, $);
      }
      return null;
    }
    function I(E, j, w, $) {
      for (
        var te = null, Ne = null, ee = j, de = (j = 0), _e = null;
        ee !== null && de < w.length;
        de++
      ) {
        ee.index > de ? ((_e = ee), (ee = null)) : (_e = ee.sibling);
        var ze = z(E, ee, w[de], $);
        if (ze === null) {
          ee === null && (ee = _e);
          break;
        }
        (e && ee && ze.alternate === null && t(E, ee),
          (j = o(ze, j, de)),
          Ne === null ? (te = ze) : (Ne.sibling = ze),
          (Ne = ze),
          (ee = _e));
      }
      if (de === w.length) return (a(E, ee), Se && Xa(E, de), te);
      if (ee === null) {
        for (; de < w.length; de++)
          ((ee = k(E, w[de], $)),
            ee !== null &&
              ((j = o(ee, j, de)), Ne === null ? (te = ee) : (Ne.sibling = ee), (Ne = ee)));
        return (Se && Xa(E, de), te);
      }
      for (ee = n(ee); de < w.length; de++)
        ((_e = C(ee, E, de, w[de], $)),
          _e !== null &&
            (e && _e.alternate !== null && ee.delete(_e.key === null ? de : _e.key),
            (j = o(_e, j, de)),
            Ne === null ? (te = _e) : (Ne.sibling = _e),
            (Ne = _e)));
      return (
        e &&
          ee.forEach(function (Ln) {
            return t(E, Ln);
          }),
        Se && Xa(E, de),
        te
      );
    }
    function ce(E, j, w, $) {
      if (w == null) throw Error(r(151));
      for (
        var te = null, Ne = null, ee = j, de = (j = 0), _e = null, ze = w.next();
        ee !== null && !ze.done;
        de++, ze = w.next()
      ) {
        ee.index > de ? ((_e = ee), (ee = null)) : (_e = ee.sibling);
        var Ln = z(E, ee, ze.value, $);
        if (Ln === null) {
          ee === null && (ee = _e);
          break;
        }
        (e && ee && Ln.alternate === null && t(E, ee),
          (j = o(Ln, j, de)),
          Ne === null ? (te = Ln) : (Ne.sibling = Ln),
          (Ne = Ln),
          (ee = _e));
      }
      if (ze.done) return (a(E, ee), Se && Xa(E, de), te);
      if (ee === null) {
        for (; !ze.done; de++, ze = w.next())
          ((ze = k(E, ze.value, $)),
            ze !== null &&
              ((j = o(ze, j, de)), Ne === null ? (te = ze) : (Ne.sibling = ze), (Ne = ze)));
        return (Se && Xa(E, de), te);
      }
      for (ee = n(ee); !ze.done; de++, ze = w.next())
        ((ze = C(ee, E, de, ze.value, $)),
          ze !== null &&
            (e && ze.alternate !== null && ee.delete(ze.key === null ? de : ze.key),
            (j = o(ze, j, de)),
            Ne === null ? (te = ze) : (Ne.sibling = ze),
            (Ne = ze)));
      return (
        e &&
          ee.forEach(function (Jy) {
            return t(E, Jy);
          }),
        Se && Xa(E, de),
        te
      );
    }
    function qe(E, j, w, $) {
      if (
        (typeof w == 'object' &&
          w !== null &&
          w.type === D &&
          w.key === null &&
          (w = w.props.children),
        typeof w == 'object' && w !== null)
      ) {
        switch (w.$$typeof) {
          case M:
            e: {
              for (var te = w.key; j !== null; ) {
                if (j.key === te) {
                  if (((te = w.type), te === D)) {
                    if (j.tag === 7) {
                      (a(E, j.sibling), ($ = i(j, w.props.children)), ($.return = E), (E = $));
                      break e;
                    }
                  } else if (
                    j.elementType === te ||
                    (typeof te == 'object' &&
                      te !== null &&
                      te.$$typeof === Re &&
                      ul(te) === j.type)
                  ) {
                    (a(E, j.sibling), ($ = i(j, w.props)), Gi($, w), ($.return = E), (E = $));
                    break e;
                  }
                  a(E, j);
                  break;
                } else t(E, j);
                j = j.sibling;
              }
              w.type === D
                ? (($ = il(w.props.children, E.mode, $, w.key)), ($.return = E), (E = $))
                : (($ = Ic(w.type, w.key, w.props, null, E.mode, $)),
                  Gi($, w),
                  ($.return = E),
                  (E = $));
            }
            return h(E);
          case T:
            e: {
              for (te = w.key; j !== null; ) {
                if (j.key === te)
                  if (
                    j.tag === 4 &&
                    j.stateNode.containerInfo === w.containerInfo &&
                    j.stateNode.implementation === w.implementation
                  ) {
                    (a(E, j.sibling), ($ = i(j, w.children || [])), ($.return = E), (E = $));
                    break e;
                  } else {
                    a(E, j);
                    break;
                  }
                else t(E, j);
                j = j.sibling;
              }
              (($ = Go(w, E.mode, $)), ($.return = E), (E = $));
            }
            return h(E);
          case Re:
            return ((w = ul(w)), qe(E, j, w, $));
        }
        if (ht(w)) return I(E, j, w, $);
        if (Ie(w)) {
          if (((te = Ie(w)), typeof te != 'function')) throw Error(r(150));
          return ((w = te.call(w)), ce(E, j, w, $));
        }
        if (typeof w.then == 'function') return qe(E, j, is(w), $);
        if (w.$$typeof === se) return qe(E, j, ts(E, w), $);
        cs(E, w);
      }
      return (typeof w == 'string' && w !== '') || typeof w == 'number' || typeof w == 'bigint'
        ? ((w = '' + w),
          j !== null && j.tag === 6
            ? (a(E, j.sibling), ($ = i(j, w)), ($.return = E), (E = $))
            : (a(E, j), ($ = Vo(w, E.mode, $)), ($.return = E), (E = $)),
          h(E))
        : a(E, j);
    }
    return function (E, j, w, $) {
      try {
        Vi = 0;
        var te = qe(E, j, w, $);
        return ((Jl = null), te);
      } catch (ee) {
        if (ee === Wl || ee === ns) throw ee;
        var Ne = Qt(29, ee, null, E.mode);
        return ((Ne.lanes = $), (Ne.return = E), Ne);
      } finally {
      }
    };
  }
  var dl = md(!0),
    hd = md(!1),
    _n = !1;
  function tr(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ar(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function bn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Sn(e, t, a) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Ce & 2) !== 0)) {
      var i = n.pending;
      return (
        i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
        (n.pending = t),
        (t = Fc(e)),
        Ff(e, null, a),
        t
      );
    }
    return (Jc(e, n, t, a), Fc(e));
  }
  function Yi(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), we(e, a));
    }
  }
  function nr(e, t) {
    var a = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var i = null,
        o = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var h = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (o === null ? (i = o = h) : (o = o.next = h), (a = a.next));
        } while (a !== null);
        o === null ? (i = o = t) : (o = o.next = t);
      } else i = o = t;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: o,
        shared: n.shared,
        callbacks: n.callbacks,
      }),
        (e.updateQueue = a));
      return;
    }
    ((e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t));
  }
  var lr = !1;
  function Zi() {
    if (lr) {
      var e = Ql;
      if (e !== null) throw e;
    }
  }
  function Xi(e, t, a, n) {
    lr = !1;
    var i = e.updateQueue;
    _n = !1;
    var o = i.firstBaseUpdate,
      h = i.lastBaseUpdate,
      v = i.shared.pending;
    if (v !== null) {
      i.shared.pending = null;
      var S = v,
        N = S.next;
      ((S.next = null), h === null ? (o = N) : (h.next = N), (h = S));
      var B = e.alternate;
      B !== null &&
        ((B = B.updateQueue),
        (v = B.lastBaseUpdate),
        v !== h && (v === null ? (B.firstBaseUpdate = N) : (v.next = N), (B.lastBaseUpdate = S)));
    }
    if (o !== null) {
      var k = i.baseState;
      ((h = 0), (B = N = S = null), (v = o));
      do {
        var z = v.lane & -536870913,
          C = z !== v.lane;
        if (C ? (ve & z) === z : (n & z) === z) {
          (z !== 0 && z === Kl && (lr = !0),
            B !== null &&
              (B = B.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          e: {
            var I = e,
              ce = v;
            z = t;
            var qe = a;
            switch (ce.tag) {
              case 1:
                if (((I = ce.payload), typeof I == 'function')) {
                  k = I.call(qe, k, z);
                  break e;
                }
                k = I;
                break e;
              case 3:
                I.flags = (I.flags & -65537) | 128;
              case 0:
                if (
                  ((I = ce.payload), (z = typeof I == 'function' ? I.call(qe, k, z) : I), z == null)
                )
                  break e;
                k = b({}, k, z);
                break e;
              case 2:
                _n = !0;
            }
          }
          ((z = v.callback),
            z !== null &&
              ((e.flags |= 64),
              C && (e.flags |= 8192),
              (C = i.callbacks),
              C === null ? (i.callbacks = [z]) : C.push(z)));
        } else
          ((C = { lane: z, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            B === null ? ((N = B = C), (S = k)) : (B = B.next = C),
            (h |= z));
        if (((v = v.next), v === null)) {
          if (((v = i.shared.pending), v === null)) break;
          ((C = v),
            (v = C.next),
            (C.next = null),
            (i.lastBaseUpdate = C),
            (i.shared.pending = null));
        }
      } while (!0);
      (B === null && (S = k),
        (i.baseState = S),
        (i.firstBaseUpdate = N),
        (i.lastBaseUpdate = B),
        o === null && (i.shared.lanes = 0),
        (En |= h),
        (e.lanes = h),
        (e.memoizedState = k));
    }
  }
  function pd(e, t) {
    if (typeof e != 'function') throw Error(r(191, e));
    e.call(t);
  }
  function yd(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) pd(a[e], t);
  }
  var Fl = x(null),
    ss = x(0);
  function gd(e, t) {
    ((e = nn), K(ss, e), K(Fl, t), (nn = e | t.baseLanes));
  }
  function ir() {
    (K(ss, nn), K(Fl, Fl.current));
  }
  function cr() {
    ((nn = ss.current), H(Fl), H(ss));
  }
  var Wt = x(null),
    fa = null;
  function xn(e) {
    var t = e.alternate;
    (K(ct, ct.current & 1),
      K(Wt, e),
      fa === null && (t === null || Fl.current !== null || t.memoizedState !== null) && (fa = e));
  }
  function sr(e) {
    (K(ct, ct.current), K(Wt, e), fa === null && (fa = e));
  }
  function vd(e) {
    e.tag === 22 ? (K(ct, ct.current), K(Wt, e), fa === null && (fa = e)) : jn();
  }
  function jn() {
    (K(ct, ct.current), K(Wt, Wt.current));
  }
  function Jt(e) {
    (H(Wt), fa === e && (fa = null), H(ct));
  }
  var ct = x(0);
  function os(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || mu(a) || hu(a))) return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === 'forwards' ||
          t.memoizedProps.revealOrder === 'backwards' ||
          t.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          t.memoizedProps.revealOrder === 'together')
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Wa = 0,
    ue = null,
    ke = null,
    ut = null,
    rs = !1,
    Il = !1,
    ml = !1,
    us = 0,
    Ki = 0,
    Pl = null,
    Up = 0;
  function lt() {
    throw Error(r(321));
  }
  function or(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!Kt(e[a], t[a])) return !1;
    return !0;
  }
  function rr(e, t, a, n, i, o) {
    return (
      (Wa = o),
      (ue = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (O.H = e === null || e.memoizedState === null ? tm : Ar),
      (ml = !1),
      (o = a(n, i)),
      (ml = !1),
      Il && (o = bd(t, a, n, i)),
      _d(e),
      o
    );
  }
  function _d(e) {
    O.H = Ji;
    var t = ke !== null && ke.next !== null;
    if (((Wa = 0), (ut = ke = ue = null), (rs = !1), (Ki = 0), (Pl = null), t)) throw Error(r(300));
    e === null || ft || ((e = e.dependencies), e !== null && es(e) && (ft = !0));
  }
  function bd(e, t, a, n) {
    ue = e;
    var i = 0;
    do {
      if ((Il && (Pl = null), (Ki = 0), (Il = !1), 25 <= i)) throw Error(r(301));
      if (((i += 1), (ut = ke = null), e.updateQueue != null)) {
        var o = e.updateQueue;
        ((o.lastEffect = null),
          (o.events = null),
          (o.stores = null),
          o.memoCache != null && (o.memoCache.index = 0));
      }
      ((O.H = am), (o = t(a, n)));
    } while (Il);
    return o;
  }
  function qp() {
    var e = O.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? Qi(t) : t),
      (e = e.useState()[0]),
      (ke !== null ? ke.memoizedState : null) !== e && (ue.flags |= 1024),
      t
    );
  }
  function ur() {
    var e = us !== 0;
    return ((us = 0), e);
  }
  function fr(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function dr(e) {
    if (rs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      rs = !1;
    }
    ((Wa = 0), (ut = ke = ue = null), (Il = !1), (Ki = us = 0), (Pl = null));
  }
  function Ht() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (ut === null ? (ue.memoizedState = ut = e) : (ut = ut.next = e), ut);
  }
  function st() {
    if (ke === null) {
      var e = ue.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ke.next;
    var t = ut === null ? ue.memoizedState : ut.next;
    if (t !== null) ((ut = t), (ke = e));
    else {
      if (e === null) throw ue.alternate === null ? Error(r(467)) : Error(r(310));
      ((ke = e),
        (e = {
          memoizedState: ke.memoizedState,
          baseState: ke.baseState,
          baseQueue: ke.baseQueue,
          queue: ke.queue,
          next: null,
        }),
        ut === null ? (ue.memoizedState = ut = e) : (ut = ut.next = e));
    }
    return ut;
  }
  function fs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Qi(e) {
    var t = Ki;
    return (
      (Ki += 1),
      Pl === null && (Pl = []),
      (e = ud(Pl, e, t)),
      (t = ue),
      (ut === null ? t.memoizedState : ut.next) === null &&
        ((t = t.alternate), (O.H = t === null || t.memoizedState === null ? tm : Ar)),
      e
    );
  }
  function ds(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return Qi(e);
      if (e.$$typeof === se) return wt(e);
    }
    throw Error(r(438, String(e)));
  }
  function mr(e) {
    var t = null,
      a = ue.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var n = ue.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (t = {
              data: n.data.map(function (i) {
                return i.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = fs()), (ue.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = et;
    return (t.index++, a);
  }
  function Ja(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function ms(e) {
    var t = st();
    return hr(t, ke, e);
  }
  function hr(e, t, a) {
    var n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = a;
    var i = e.baseQueue,
      o = n.pending;
    if (o !== null) {
      if (i !== null) {
        var h = i.next;
        ((i.next = o.next), (o.next = h));
      }
      ((t.baseQueue = i = o), (n.pending = null));
    }
    if (((o = e.baseState), i === null)) e.memoizedState = o;
    else {
      t = i.next;
      var v = (h = null),
        S = null,
        N = t,
        B = !1;
      do {
        var k = N.lane & -536870913;
        if (k !== N.lane ? (ve & k) === k : (Wa & k) === k) {
          var z = N.revertLane;
          if (z === 0)
            (S !== null &&
              (S = S.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: N.action,
                  hasEagerState: N.hasEagerState,
                  eagerState: N.eagerState,
                  next: null,
                }),
              k === Kl && (B = !0));
          else if ((Wa & z) === z) {
            ((N = N.next), z === Kl && (B = !0));
            continue;
          } else
            ((k = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null,
            }),
              S === null ? ((v = S = k), (h = o)) : (S = S.next = k),
              (ue.lanes |= z),
              (En |= z));
          ((k = N.action), ml && a(o, k), (o = N.hasEagerState ? N.eagerState : a(o, k)));
        } else
          ((z = {
            lane: k,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null,
          }),
            S === null ? ((v = S = z), (h = o)) : (S = S.next = z),
            (ue.lanes |= k),
            (En |= k));
        N = N.next;
      } while (N !== null && N !== t);
      if (
        (S === null ? (h = o) : (S.next = v),
        !Kt(o, e.memoizedState) && ((ft = !0), B && ((a = Ql), a !== null)))
      )
        throw a;
      ((e.memoizedState = o), (e.baseState = h), (e.baseQueue = S), (n.lastRenderedState = o));
    }
    return (i === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function pr(e) {
    var t = st(),
      a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var n = a.dispatch,
      i = a.pending,
      o = t.memoizedState;
    if (i !== null) {
      a.pending = null;
      var h = (i = i.next);
      do ((o = e(o, h.action)), (h = h.next));
      while (h !== i);
      (Kt(o, t.memoizedState) || (ft = !0),
        (t.memoizedState = o),
        t.baseQueue === null && (t.baseState = o),
        (a.lastRenderedState = o));
    }
    return [o, n];
  }
  function Sd(e, t, a) {
    var n = ue,
      i = st(),
      o = Se;
    if (o) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = t();
    var h = !Kt((ke || i).memoizedState, a);
    if (
      (h && ((i.memoizedState = a), (ft = !0)),
      (i = i.queue),
      vr(Ad.bind(null, n, i, e), [e]),
      i.getSnapshot !== t || h || (ut !== null && ut.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ei(9, { destroy: void 0 }, jd.bind(null, n, i, a, t), null),
        Ge === null)
      )
        throw Error(r(349));
      o || (Wa & 127) !== 0 || xd(n, t, a);
    }
    return a;
  }
  function xd(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = ue.updateQueue),
      t === null
        ? ((t = fs()), (ue.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function jd(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), Td(t) && Ed(e));
  }
  function Ad(e, t, a) {
    return a(function () {
      Td(t) && Ed(e);
    });
  }
  function Td(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Kt(e, a);
    } catch {
      return !0;
    }
  }
  function Ed(e) {
    var t = ll(e, 2);
    t !== null && Xt(t, e, 2);
  }
  function yr(e) {
    var t = Ht();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), ml)) {
        Tt(!0);
        try {
          a();
        } finally {
          Tt(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ja,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Md(e, t, a, n) {
    return ((e.baseState = a), hr(e, ke, typeof n == 'function' ? n : Ja));
  }
  function Vp(e, t, a, n, i) {
    if (ys(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var o = {
        payload: i,
        action: e,
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
        (a = t.pending),
        a === null
          ? ((o.next = t.pending = o), wd(t, o))
          : ((o.next = a.next), (t.pending = a.next = o)));
    }
  }
  function wd(e, t) {
    var a = t.action,
      n = t.payload,
      i = e.state;
    if (t.isTransition) {
      var o = O.T,
        h = {};
      O.T = h;
      try {
        var v = a(i, n),
          S = O.S;
        (S !== null && S(h, v), Nd(e, t, v));
      } catch (N) {
        gr(e, t, N);
      } finally {
        (o !== null && h.types !== null && (o.types = h.types), (O.T = o));
      }
    } else
      try {
        ((o = a(i, n)), Nd(e, t, o));
      } catch (N) {
        gr(e, t, N);
      }
  }
  function Nd(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            zd(e, t, n);
          },
          function (n) {
            return gr(e, t, n);
          }
        )
      : zd(e, t, a);
  }
  function zd(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      Cd(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), wd(e, a))));
  }
  function gr(e, t, a) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = a), Cd(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function Cd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Rd(e, t) {
    return t;
  }
  function Od(e, t) {
    if (Se) {
      var a = Ge.formState;
      if (a !== null) {
        e: {
          var n = ue;
          if (Se) {
            if (Je) {
              t: {
                for (var i = Je, o = ua; i.nodeType !== 8; ) {
                  if (!o) {
                    i = null;
                    break t;
                  }
                  if (((i = da(i.nextSibling)), i === null)) {
                    i = null;
                    break t;
                  }
                }
                ((o = i.data), (i = o === 'F!' || o === 'F' ? i : null));
              }
              if (i) {
                ((Je = da(i.nextSibling)), (n = i.data === 'F!'));
                break e;
              }
            }
            gn(n);
          }
          n = !1;
        }
        n && (t = a[0]);
      }
    }
    return (
      (a = Ht()),
      (a.memoizedState = a.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Rd,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = Id.bind(null, ue, n)),
      (n.dispatch = a),
      (n = yr(!1)),
      (o = jr.bind(null, ue, !1, n.queue)),
      (n = Ht()),
      (i = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = i),
      (a = Vp.bind(null, ue, i, o, a)),
      (i.dispatch = a),
      (n.memoizedState = e),
      [t, a, !1]
    );
  }
  function Dd(e) {
    var t = st();
    return Bd(t, ke, e);
  }
  function Bd(e, t, a) {
    if (
      ((t = hr(e, t, Rd)[0]),
      (e = ms(Ja)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = Qi(t);
      } catch (h) {
        throw h === Wl ? ns : h;
      }
    else n = t;
    t = st();
    var i = t.queue,
      o = i.dispatch;
    return (
      a !== t.memoizedState &&
        ((ue.flags |= 2048), ei(9, { destroy: void 0 }, Gp.bind(null, i, a), null)),
      [n, o, e]
    );
  }
  function Gp(e, t) {
    e.action = t;
  }
  function Ld(e) {
    var t = st(),
      a = ke;
    if (a !== null) return Bd(t, a, e);
    (st(), (t = t.memoizedState), (a = st()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = e), [t, n, !1]);
  }
  function ei(e, t, a, n) {
    return (
      (e = { tag: e, create: a, deps: n, inst: t, next: null }),
      (t = ue.updateQueue),
      t === null && ((t = fs()), (ue.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((n = a.next), (a.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function $d() {
    return st().memoizedState;
  }
  function hs(e, t, a, n) {
    var i = Ht();
    ((ue.flags |= e),
      (i.memoizedState = ei(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function ps(e, t, a, n) {
    var i = st();
    n = n === void 0 ? null : n;
    var o = i.memoizedState.inst;
    ke !== null && n !== null && or(n, ke.memoizedState.deps)
      ? (i.memoizedState = ei(t, o, a, n))
      : ((ue.flags |= e), (i.memoizedState = ei(1 | t, o, a, n)));
  }
  function Hd(e, t) {
    hs(8390656, 8, e, t);
  }
  function vr(e, t) {
    ps(2048, 8, e, t);
  }
  function Yp(e) {
    ue.flags |= 4;
    var t = ue.updateQueue;
    if (t === null) ((t = fs()), (ue.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function kd(e) {
    var t = st().memoizedState;
    return (
      Yp({ ref: t, nextImpl: e }),
      function () {
        if ((Ce & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Ud(e, t) {
    return ps(4, 2, e, t);
  }
  function qd(e, t) {
    return ps(4, 4, e, t);
  }
  function Vd(e, t) {
    if (typeof t == 'function') {
      e = e();
      var a = t(e);
      return function () {
        typeof a == 'function' ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Gd(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), ps(4, 4, Vd.bind(null, t, e), a));
  }
  function _r() {}
  function Yd(e, t) {
    var a = st();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    return t !== null && or(t, n[1]) ? n[0] : ((a.memoizedState = [e, t]), e);
  }
  function Zd(e, t) {
    var a = st();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    if (t !== null && or(t, n[1])) return n[0];
    if (((n = e()), ml)) {
      Tt(!0);
      try {
        e();
      } finally {
        Tt(!1);
      }
    }
    return ((a.memoizedState = [n, t]), n);
  }
  function br(e, t, a) {
    return a === void 0 || ((Wa & 1073741824) !== 0 && (ve & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = Xm()), (ue.lanes |= e), (En |= e), a);
  }
  function Xd(e, t, a, n) {
    return Kt(a, t)
      ? a
      : Fl.current !== null
        ? ((e = br(e, a, n)), Kt(e, t) || (ft = !0), e)
        : (Wa & 42) === 0 || ((Wa & 1073741824) !== 0 && (ve & 261930) === 0)
          ? ((ft = !0), (e.memoizedState = a))
          : ((e = Xm()), (ue.lanes |= e), (En |= e), t);
  }
  function Kd(e, t, a, n, i) {
    var o = X.p;
    X.p = o !== 0 && 8 > o ? o : 8;
    var h = O.T,
      v = {};
    ((O.T = v), jr(e, !1, t, a));
    try {
      var S = i(),
        N = O.S;
      if (
        (N !== null && N(v, S), S !== null && typeof S == 'object' && typeof S.then == 'function')
      ) {
        var B = kp(S, n);
        Wi(e, t, B, Pt(e));
      } else Wi(e, t, n, Pt(e));
    } catch (k) {
      Wi(e, t, { then: function () {}, status: 'rejected', reason: k }, Pt());
    } finally {
      ((X.p = o), h !== null && v.types !== null && (h.types = v.types), (O.T = h));
    }
  }
  function Zp() {}
  function Sr(e, t, a, n) {
    if (e.tag !== 5) throw Error(r(476));
    var i = Qd(e).queue;
    Kd(
      e,
      i,
      t,
      ne,
      a === null
        ? Zp
        : function () {
            return (Wd(e), a(n));
          }
    );
  }
  function Qd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ne,
      baseState: ne,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ja,
        lastRenderedState: ne,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ja,
          lastRenderedState: a,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Wd(e) {
    var t = Qd(e);
    (t.next === null && (t = e.alternate.memoizedState), Wi(e, t.next.queue, {}, Pt()));
  }
  function xr() {
    return wt(dc);
  }
  function Jd() {
    return st().memoizedState;
  }
  function Fd() {
    return st().memoizedState;
  }
  function Xp(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Pt();
          e = bn(a);
          var n = Sn(t, e, a);
          (n !== null && (Xt(n, t, a), Yi(n, t, a)), (t = { cache: Fo() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Kp(e, t, a) {
    var n = Pt();
    ((a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ys(e) ? Pd(t, a) : ((a = Uo(e, t, a, n)), a !== null && (Xt(a, e, n), em(a, t, n))));
  }
  function Id(e, t, a) {
    var n = Pt();
    Wi(e, t, a, n);
  }
  function Wi(e, t, a, n) {
    var i = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ys(e)) Pd(t, i);
    else {
      var o = e.alternate;
      if (
        e.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = t.lastRenderedReducer), o !== null)
      )
        try {
          var h = t.lastRenderedState,
            v = o(h, a);
          if (((i.hasEagerState = !0), (i.eagerState = v), Kt(v, h)))
            return (Jc(e, t, i, 0), Ge === null && Wc(), !1);
        } catch {
        } finally {
        }
      if (((a = Uo(e, t, i, n)), a !== null)) return (Xt(a, e, n), em(a, t, n), !0);
    }
    return !1;
  }
  function jr(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: tu(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ys(e))
    ) {
      if (t) throw Error(r(479));
    } else ((t = Uo(e, a, n, 2)), t !== null && Xt(t, e, 2));
  }
  function ys(e) {
    var t = e.alternate;
    return e === ue || (t !== null && t === ue);
  }
  function Pd(e, t) {
    Il = rs = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function em(e, t, a) {
    if ((a & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), we(e, a));
    }
  }
  var Ji = {
    readContext: wt,
    use: ds,
    useCallback: lt,
    useContext: lt,
    useEffect: lt,
    useImperativeHandle: lt,
    useLayoutEffect: lt,
    useInsertionEffect: lt,
    useMemo: lt,
    useReducer: lt,
    useRef: lt,
    useState: lt,
    useDebugValue: lt,
    useDeferredValue: lt,
    useTransition: lt,
    useSyncExternalStore: lt,
    useId: lt,
    useHostTransitionStatus: lt,
    useFormState: lt,
    useActionState: lt,
    useOptimistic: lt,
    useMemoCache: lt,
    useCacheRefresh: lt,
  };
  Ji.useEffectEvent = lt;
  var tm = {
      readContext: wt,
      use: ds,
      useCallback: function (e, t) {
        return ((Ht().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: wt,
      useEffect: Hd,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), hs(4194308, 4, Vd.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return hs(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        hs(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = Ht();
        t = t === void 0 ? null : t;
        var n = e();
        if (ml) {
          Tt(!0);
          try {
            e();
          } finally {
            Tt(!1);
          }
        }
        return ((a.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, a) {
        var n = Ht();
        if (a !== void 0) {
          var i = a(t);
          if (ml) {
            Tt(!0);
            try {
              a(t);
            } finally {
              Tt(!1);
            }
          }
        } else i = t;
        return (
          (n.memoizedState = n.baseState = i),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: i,
          }),
          (n.queue = e),
          (e = e.dispatch = Kp.bind(null, ue, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Ht();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = yr(e);
        var t = e.queue,
          a = Id.bind(null, ue, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: _r,
      useDeferredValue: function (e, t) {
        var a = Ht();
        return br(a, e, t);
      },
      useTransition: function () {
        var e = yr(!1);
        return ((e = Kd.bind(null, ue, e.queue, !0, !1)), (Ht().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = ue,
          i = Ht();
        if (Se) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (((a = t()), Ge === null)) throw Error(r(349));
          (ve & 127) !== 0 || xd(n, t, a);
        }
        i.memoizedState = a;
        var o = { value: a, getSnapshot: t };
        return (
          (i.queue = o),
          Hd(Ad.bind(null, n, o, e), [e]),
          (n.flags |= 2048),
          ei(9, { destroy: void 0 }, jd.bind(null, n, o, a, t), null),
          a
        );
      },
      useId: function () {
        var e = Ht(),
          t = Ge.identifierPrefix;
        if (Se) {
          var a = Ca,
            n = za;
          ((a = (n & ~(1 << (32 - gt(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = us++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = Up++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: xr,
      useFormState: Od,
      useActionState: Od,
      useOptimistic: function (e) {
        var t = Ht();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = a), (t = jr.bind(null, ue, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: mr,
      useCacheRefresh: function () {
        return (Ht().memoizedState = Xp.bind(null, ue));
      },
      useEffectEvent: function (e) {
        var t = Ht(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((Ce & 2) !== 0) throw Error(r(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Ar = {
      readContext: wt,
      use: ds,
      useCallback: Yd,
      useContext: wt,
      useEffect: vr,
      useImperativeHandle: Gd,
      useInsertionEffect: Ud,
      useLayoutEffect: qd,
      useMemo: Zd,
      useReducer: ms,
      useRef: $d,
      useState: function () {
        return ms(Ja);
      },
      useDebugValue: _r,
      useDeferredValue: function (e, t) {
        var a = st();
        return Xd(a, ke.memoizedState, e, t);
      },
      useTransition: function () {
        var e = ms(Ja)[0],
          t = st().memoizedState;
        return [typeof e == 'boolean' ? e : Qi(e), t];
      },
      useSyncExternalStore: Sd,
      useId: Jd,
      useHostTransitionStatus: xr,
      useFormState: Dd,
      useActionState: Dd,
      useOptimistic: function (e, t) {
        var a = st();
        return Md(a, ke, e, t);
      },
      useMemoCache: mr,
      useCacheRefresh: Fd,
    };
  Ar.useEffectEvent = kd;
  var am = {
    readContext: wt,
    use: ds,
    useCallback: Yd,
    useContext: wt,
    useEffect: vr,
    useImperativeHandle: Gd,
    useInsertionEffect: Ud,
    useLayoutEffect: qd,
    useMemo: Zd,
    useReducer: pr,
    useRef: $d,
    useState: function () {
      return pr(Ja);
    },
    useDebugValue: _r,
    useDeferredValue: function (e, t) {
      var a = st();
      return ke === null ? br(a, e, t) : Xd(a, ke.memoizedState, e, t);
    },
    useTransition: function () {
      var e = pr(Ja)[0],
        t = st().memoizedState;
      return [typeof e == 'boolean' ? e : Qi(e), t];
    },
    useSyncExternalStore: Sd,
    useId: Jd,
    useHostTransitionStatus: xr,
    useFormState: Ld,
    useActionState: Ld,
    useOptimistic: function (e, t) {
      var a = st();
      return ke !== null ? Md(a, ke, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: mr,
    useCacheRefresh: Fd,
  };
  am.useEffectEvent = kd;
  function Tr(e, t, a, n) {
    ((t = e.memoizedState),
      (a = a(n, t)),
      (a = a == null ? t : b({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var Er = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var n = Pt(),
        i = bn(n);
      ((i.payload = t),
        a != null && (i.callback = a),
        (t = Sn(e, i, n)),
        t !== null && (Xt(t, e, n), Yi(t, e, n)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var n = Pt(),
        i = bn(n);
      ((i.tag = 1),
        (i.payload = t),
        a != null && (i.callback = a),
        (t = Sn(e, i, n)),
        t !== null && (Xt(t, e, n), Yi(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Pt(),
        n = bn(a);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Sn(e, n, a)),
        t !== null && (Xt(t, e, a), Yi(t, e, a)));
    },
  };
  function nm(e, t, a, n, i, o, h) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, o, h)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Li(a, n) || !Li(i, o)
          : !0
    );
  }
  function lm(e, t, a, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, n),
      t.state !== e && Er.enqueueReplaceState(t, t.state, null));
  }
  function hl(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var n in t) n !== 'ref' && (a[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = b({}, a));
      for (var i in e) a[i] === void 0 && (a[i] = e[i]);
    }
    return a;
  }
  function im(e) {
    Qc(e);
  }
  function cm(e) {
    console.error(e);
  }
  function sm(e) {
    Qc(e);
  }
  function gs(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function om(e, t, a) {
    try {
      var n = e.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function Mr(e, t, a) {
    return (
      (a = bn(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        gs(e, t);
      }),
      a
    );
  }
  function rm(e) {
    return ((e = bn(e)), (e.tag = 3), e);
  }
  function um(e, t, a, n) {
    var i = a.type.getDerivedStateFromError;
    if (typeof i == 'function') {
      var o = n.value;
      ((e.payload = function () {
        return i(o);
      }),
        (e.callback = function () {
          om(t, a, n);
        }));
    }
    var h = a.stateNode;
    h !== null &&
      typeof h.componentDidCatch == 'function' &&
      (e.callback = function () {
        (om(t, a, n),
          typeof i != 'function' && (Mn === null ? (Mn = new Set([this])) : Mn.add(this)));
        var v = n.stack;
        this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' });
      });
  }
  function Qp(e, t, a, n, i) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && Xl(t, a, i, !0), (a = Wt.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              fa === null ? Ns() : a.alternate === null && it === 0 && (it = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = i),
              n === ls
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  Ir(e, n, i)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === ls
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  Ir(e, n, i)),
              !1
            );
        }
        throw Error(r(435, a.tag));
      }
      return (Ir(e, n, i), Ns(), !1);
    }
    if (Se)
      return (
        (t = Wt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = i),
            n !== Xo && ((e = Error(r(422), { cause: n })), ki(sa(e, a))))
          : (n !== Xo && ((t = Error(r(423), { cause: n })), ki(sa(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (i &= -i),
            (e.lanes |= i),
            (n = sa(n, a)),
            (i = Mr(e.stateNode, n, i)),
            nr(e, i),
            it !== 4 && (it = 2)),
        !1
      );
    var o = Error(r(520), { cause: n });
    if (((o = sa(o, a)), lc === null ? (lc = [o]) : lc.push(o), it !== 4 && (it = 2), t === null))
      return !0;
    ((n = sa(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = i & -i),
            (a.lanes |= e),
            (e = Mr(a.stateNode, n, e)),
            nr(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (o = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (o !== null &&
                  typeof o.componentDidCatch == 'function' &&
                  (Mn === null || !Mn.has(o)))))
          )
            return (
              (a.flags |= 65536),
              (i &= -i),
              (a.lanes |= i),
              (i = rm(i)),
              um(i, e, a, n),
              nr(a, i),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var wr = Error(r(461)),
    ft = !1;
  function Nt(e, t, a, n) {
    t.child = e === null ? hd(t, null, a, n) : dl(t, e.child, a, n);
  }
  function fm(e, t, a, n, i) {
    a = a.render;
    var o = t.ref;
    if ('ref' in n) {
      var h = {};
      for (var v in n) v !== 'ref' && (h[v] = n[v]);
    } else h = n;
    return (
      ol(t),
      (n = rr(e, t, a, h, o, i)),
      (v = ur()),
      e !== null && !ft
        ? (fr(e, t, i), Fa(e, t, i))
        : (Se && v && Yo(t), (t.flags |= 1), Nt(e, t, n, i), t.child)
    );
  }
  function dm(e, t, a, n, i) {
    if (e === null) {
      var o = a.type;
      return typeof o == 'function' && !qo(o) && o.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = o), mm(e, t, o, n, i))
        : ((e = Ic(a.type, null, n, t, t.mode, i)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((o = e.child), !Lr(e, i))) {
      var h = o.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Li), a(h, n) && e.ref === t.ref))
        return Fa(e, t, i);
    }
    return ((t.flags |= 1), (e = Za(o, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function mm(e, t, a, n, i) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (Li(o, n) && e.ref === t.ref)
        if (((ft = !1), (t.pendingProps = n = o), Lr(e, i))) (e.flags & 131072) !== 0 && (ft = !0);
        else return ((t.lanes = e.lanes), Fa(e, t, i));
    }
    return Nr(e, t, a, n, i);
  }
  function hm(e, t, a, n) {
    var i = n.children,
      o = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      n.mode === 'hidden')
    ) {
      if ((t.flags & 128) !== 0) {
        if (((o = o !== null ? o.baseLanes | a : a), e !== null)) {
          for (n = t.child = e.child, i = 0; n !== null; )
            ((i = i | n.lanes | n.childLanes), (n = n.sibling));
          n = i & ~o;
        } else ((n = 0), (t.child = null));
        return pm(e, t, o, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && as(t, o !== null ? o.cachePool : null),
          o !== null ? gd(t, o) : ir(),
          vd(t));
      else return ((n = t.lanes = 536870912), pm(e, t, o !== null ? o.baseLanes | a : a, a, n));
    } else
      o !== null
        ? (as(t, o.cachePool), gd(t, o), jn(), (t.memoizedState = null))
        : (e !== null && as(t, null), ir(), jn());
    return (Nt(e, t, i, a), t.child);
  }
  function Fi(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function pm(e, t, a, n, i) {
    var o = Po();
    return (
      (o = o === null ? null : { parent: rt._currentValue, pool: o }),
      (t.memoizedState = { baseLanes: a, cachePool: o }),
      e !== null && as(t, null),
      ir(),
      vd(t),
      e !== null && Xl(e, t, n, !0),
      (t.childLanes = i),
      null
    );
  }
  function vs(e, t) {
    return (
      (t = bs({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function ym(e, t, a) {
    return (
      dl(t, e.child, null, a),
      (e = vs(t, t.pendingProps)),
      (e.flags |= 2),
      Jt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Wp(e, t, a) {
    var n = t.pendingProps,
      i = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Se) {
        if (n.mode === 'hidden') return ((e = vs(t, n)), (t.lanes = 536870912), Fi(null, e));
        if (
          (sr(t),
          (e = Je)
            ? ((e = w0(e, ua)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: pn !== null ? { id: za, overflow: Ca } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Pf(e)),
                (a.return = t),
                (t.child = a),
                (Mt = t),
                (Je = null)))
            : (e = null),
          e === null)
        )
          throw gn(t);
        return ((t.lanes = 536870912), null);
      }
      return vs(t, n);
    }
    var o = e.memoizedState;
    if (o !== null) {
      var h = o.dehydrated;
      if ((sr(t), i))
        if (t.flags & 256) ((t.flags &= -257), (t = ym(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(r(558));
      else if ((ft || Xl(e, t, a, !1), (i = (a & e.childLanes) !== 0), ft || i)) {
        if (((n = Ge), n !== null && ((h = We(n, a)), h !== 0 && h !== o.retryLane)))
          throw ((o.retryLane = h), ll(e, h), Xt(n, e, h), wr);
        (Ns(), (t = ym(e, t, a)));
      } else
        ((e = o.treeContext),
          (Je = da(h.nextSibling)),
          (Mt = t),
          (Se = !0),
          (yn = null),
          (ua = !1),
          e !== null && ad(t, e),
          (t = vs(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = Za(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function _s(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(r(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Nr(e, t, a, n, i) {
    return (
      ol(t),
      (a = rr(e, t, a, n, void 0, i)),
      (n = ur()),
      e !== null && !ft
        ? (fr(e, t, i), Fa(e, t, i))
        : (Se && n && Yo(t), (t.flags |= 1), Nt(e, t, a, i), t.child)
    );
  }
  function gm(e, t, a, n, i, o) {
    return (
      ol(t),
      (t.updateQueue = null),
      (a = bd(t, n, a, i)),
      _d(e),
      (n = ur()),
      e !== null && !ft
        ? (fr(e, t, o), Fa(e, t, o))
        : (Se && n && Yo(t), (t.flags |= 1), Nt(e, t, a, o), t.child)
    );
  }
  function vm(e, t, a, n, i) {
    if ((ol(t), t.stateNode === null)) {
      var o = Vl,
        h = a.contextType;
      (typeof h == 'object' && h !== null && (o = wt(h)),
        (o = new a(n, o)),
        (t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null),
        (o.updater = Er),
        (t.stateNode = o),
        (o._reactInternals = t),
        (o = t.stateNode),
        (o.props = n),
        (o.state = t.memoizedState),
        (o.refs = {}),
        tr(t),
        (h = a.contextType),
        (o.context = typeof h == 'object' && h !== null ? wt(h) : Vl),
        (o.state = t.memoizedState),
        (h = a.getDerivedStateFromProps),
        typeof h == 'function' && (Tr(t, a, h, n), (o.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof o.getSnapshotBeforeUpdate == 'function' ||
          (typeof o.UNSAFE_componentWillMount != 'function' &&
            typeof o.componentWillMount != 'function') ||
          ((h = o.state),
          typeof o.componentWillMount == 'function' && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == 'function' && o.UNSAFE_componentWillMount(),
          h !== o.state && Er.enqueueReplaceState(o, o.state, null),
          Xi(t, n, o, i),
          Zi(),
          (o.state = t.memoizedState)),
        typeof o.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      o = t.stateNode;
      var v = t.memoizedProps,
        S = hl(a, v);
      o.props = S;
      var N = o.context,
        B = a.contextType;
      ((h = Vl), typeof B == 'object' && B !== null && (h = wt(B)));
      var k = a.getDerivedStateFromProps;
      ((B = typeof k == 'function' || typeof o.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        B ||
          (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof o.componentWillReceiveProps != 'function') ||
          ((v || N !== h) && lm(t, o, n, h)),
        (_n = !1));
      var z = t.memoizedState;
      ((o.state = z),
        Xi(t, n, o, i),
        Zi(),
        (N = t.memoizedState),
        v || z !== N || _n
          ? (typeof k == 'function' && (Tr(t, a, k, n), (N = t.memoizedState)),
            (S = _n || nm(t, a, S, n, z, N, h))
              ? (B ||
                  (typeof o.UNSAFE_componentWillMount != 'function' &&
                    typeof o.componentWillMount != 'function') ||
                  (typeof o.componentWillMount == 'function' && o.componentWillMount(),
                  typeof o.UNSAFE_componentWillMount == 'function' &&
                    o.UNSAFE_componentWillMount()),
                typeof o.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof o.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = N)),
            (o.props = n),
            (o.state = N),
            (o.context = h),
            (n = S))
          : (typeof o.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((o = t.stateNode),
        ar(e, t),
        (h = t.memoizedProps),
        (B = hl(a, h)),
        (o.props = B),
        (k = t.pendingProps),
        (z = o.context),
        (N = a.contextType),
        (S = Vl),
        typeof N == 'object' && N !== null && (S = wt(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof o.getSnapshotBeforeUpdate == 'function') ||
          (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof o.componentWillReceiveProps != 'function') ||
          ((h !== k || z !== S) && lm(t, o, n, S)),
        (_n = !1),
        (z = t.memoizedState),
        (o.state = z),
        Xi(t, n, o, i),
        Zi());
      var C = t.memoizedState;
      h !== k || z !== C || _n || (e !== null && e.dependencies !== null && es(e.dependencies))
        ? (typeof v == 'function' && (Tr(t, a, v, n), (C = t.memoizedState)),
          (B =
            _n ||
            nm(t, a, B, n, z, C, S) ||
            (e !== null && e.dependencies !== null && es(e.dependencies)))
            ? (N ||
                (typeof o.UNSAFE_componentWillUpdate != 'function' &&
                  typeof o.componentWillUpdate != 'function') ||
                (typeof o.componentWillUpdate == 'function' && o.componentWillUpdate(n, C, S),
                typeof o.UNSAFE_componentWillUpdate == 'function' &&
                  o.UNSAFE_componentWillUpdate(n, C, S)),
              typeof o.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof o.componentDidUpdate != 'function' ||
                (h === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != 'function' ||
                (h === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = C)),
          (o.props = n),
          (o.state = C),
          (o.context = S),
          (n = B))
        : (typeof o.componentDidUpdate != 'function' ||
            (h === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 4),
          typeof o.getSnapshotBeforeUpdate != 'function' ||
            (h === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (o = n),
      _s(e, t),
      (n = (t.flags & 128) !== 0),
      o || n
        ? ((o = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : o.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = dl(t, e.child, null, i)), (t.child = dl(t, null, a, i)))
            : Nt(e, t, a, i),
          (t.memoizedState = o.state),
          (e = t.child))
        : (e = Fa(e, t, i)),
      e
    );
  }
  function _m(e, t, a, n) {
    return (cl(), (t.flags |= 256), Nt(e, t, a, n), t.child);
  }
  var zr = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Cr(e) {
    return { baseLanes: e, cachePool: od() };
  }
  function Rr(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= It), e);
  }
  function bm(e, t, a) {
    var n = t.pendingProps,
      i = !1,
      o = (t.flags & 128) !== 0,
      h;
    if (
      ((h = o) || (h = e !== null && e.memoizedState === null ? !1 : (ct.current & 2) !== 0),
      h && ((i = !0), (t.flags &= -129)),
      (h = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Se) {
        if (
          (i ? xn(t) : jn(),
          (e = Je)
            ? ((e = w0(e, ua)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: pn !== null ? { id: za, overflow: Ca } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Pf(e)),
                (a.return = t),
                (t.child = a),
                (Mt = t),
                (Je = null)))
            : (e = null),
          e === null)
        )
          throw gn(t);
        return (hu(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = n.children;
      return (
        (n = n.fallback),
        i
          ? (jn(),
            (i = t.mode),
            (v = bs({ mode: 'hidden', children: v }, i)),
            (n = il(n, i, a, null)),
            (v.return = t),
            (n.return = t),
            (v.sibling = n),
            (t.child = v),
            (n = t.child),
            (n.memoizedState = Cr(a)),
            (n.childLanes = Rr(e, h, a)),
            (t.memoizedState = zr),
            Fi(null, n))
          : (xn(t), Or(t, v))
      );
    }
    var S = e.memoizedState;
    if (S !== null && ((v = S.dehydrated), v !== null)) {
      if (o)
        t.flags & 256
          ? (xn(t), (t.flags &= -257), (t = Dr(e, t, a)))
          : t.memoizedState !== null
            ? (jn(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (jn(),
              (v = n.fallback),
              (i = t.mode),
              (n = bs({ mode: 'visible', children: n.children }, i)),
              (v = il(v, i, a, null)),
              (v.flags |= 2),
              (n.return = t),
              (v.return = t),
              (n.sibling = v),
              (t.child = n),
              dl(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = Cr(a)),
              (n.childLanes = Rr(e, h, a)),
              (t.memoizedState = zr),
              (t = Fi(null, n)));
      else if ((xn(t), hu(v))) {
        if (((h = v.nextSibling && v.nextSibling.dataset), h)) var N = h.dgst;
        ((h = N),
          (n = Error(r(419))),
          (n.stack = ''),
          (n.digest = h),
          ki({ value: n, source: null, stack: null }),
          (t = Dr(e, t, a)));
      } else if ((ft || Xl(e, t, a, !1), (h = (a & e.childLanes) !== 0), ft || h)) {
        if (((h = Ge), h !== null && ((n = We(h, a)), n !== 0 && n !== S.retryLane)))
          throw ((S.retryLane = n), ll(e, n), Xt(h, e, n), wr);
        (mu(v) || Ns(), (t = Dr(e, t, a)));
      } else
        mu(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = S.treeContext),
            (Je = da(v.nextSibling)),
            (Mt = t),
            (Se = !0),
            (yn = null),
            (ua = !1),
            e !== null && ad(t, e),
            (t = Or(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return i
      ? (jn(),
        (v = n.fallback),
        (i = t.mode),
        (S = e.child),
        (N = S.sibling),
        (n = Za(S, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = S.subtreeFlags & 65011712),
        N !== null ? (v = Za(N, v)) : ((v = il(v, i, a, null)), (v.flags |= 2)),
        (v.return = t),
        (n.return = t),
        (n.sibling = v),
        (t.child = n),
        Fi(null, n),
        (n = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = Cr(a))
          : ((i = v.cachePool),
            i !== null
              ? ((S = rt._currentValue), (i = i.parent !== S ? { parent: S, pool: S } : i))
              : (i = od()),
            (v = { baseLanes: v.baseLanes | a, cachePool: i })),
        (n.memoizedState = v),
        (n.childLanes = Rr(e, h, a)),
        (t.memoizedState = zr),
        Fi(e.child, n))
      : (xn(t),
        (a = e.child),
        (e = a.sibling),
        (a = Za(a, { mode: 'visible', children: n.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((h = t.deletions), h === null ? ((t.deletions = [e]), (t.flags |= 16)) : h.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function Or(e, t) {
    return ((t = bs({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function bs(e, t) {
    return ((e = Qt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Dr(e, t, a) {
    return (
      dl(t, e.child, null, a),
      (e = Or(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Sm(e, t, a) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), Wo(e.return, t, a));
  }
  function Br(e, t, a, n, i, o) {
    var h = e.memoizedState;
    h === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: i,
          treeForkCount: o,
        })
      : ((h.isBackwards = t),
        (h.rendering = null),
        (h.renderingStartTime = 0),
        (h.last = n),
        (h.tail = a),
        (h.tailMode = i),
        (h.treeForkCount = o));
  }
  function xm(e, t, a) {
    var n = t.pendingProps,
      i = n.revealOrder,
      o = n.tail;
    n = n.children;
    var h = ct.current,
      v = (h & 2) !== 0;
    if (
      (v ? ((h = (h & 1) | 2), (t.flags |= 128)) : (h &= 1),
      K(ct, h),
      Nt(e, t, n, a),
      (n = Se ? Hi : 0),
      !v && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Sm(e, a, t);
        else if (e.tag === 19) Sm(e, a, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (i) {
      case 'forwards':
        for (a = t.child, i = null; a !== null; )
          ((e = a.alternate), e !== null && os(e) === null && (i = a), (a = a.sibling));
        ((a = i),
          a === null ? ((i = t.child), (t.child = null)) : ((i = a.sibling), (a.sibling = null)),
          Br(t, !1, i, a, o, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && os(e) === null)) {
            t.child = i;
            break;
          }
          ((e = i.sibling), (i.sibling = a), (a = i), (i = e));
        }
        Br(t, !0, a, null, o, n);
        break;
      case 'together':
        Br(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Fa(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (En |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Xl(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (e = t.child, a = Za(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = Za(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function Lr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && es(e)));
  }
  function Jp(e, t, a) {
    switch (t.tag) {
      case 3:
        (pt(t, t.stateNode.containerInfo), vn(t, rt, e.memoizedState.cache), cl());
        break;
      case 27:
      case 5:
        Ba(t);
        break;
      case 4:
        pt(t, t.stateNode.containerInfo);
        break;
      case 10:
        vn(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), sr(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (xn(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? bm(e, t, a)
              : (xn(t), (e = Fa(e, t, a)), e !== null ? e.sibling : null);
        xn(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (
          ((n = (a & t.childLanes) !== 0),
          n || (Xl(e, t, a, !1), (n = (a & t.childLanes) !== 0)),
          i)
        ) {
          if (n) return xm(e, t, a);
          t.flags |= 128;
        }
        if (
          ((i = t.memoizedState),
          i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          K(ct, ct.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), hm(e, t, a, t.pendingProps));
      case 24:
        vn(t, rt, e.memoizedState.cache);
    }
    return Fa(e, t, a);
  }
  function jm(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) ft = !0;
      else {
        if (!Lr(e, a) && (t.flags & 128) === 0) return ((ft = !1), Jp(e, t, a));
        ft = (e.flags & 131072) !== 0;
      }
    else ((ft = !1), Se && (t.flags & 1048576) !== 0 && td(t, Hi, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = ul(t.elementType)), (t.type = e), typeof e == 'function'))
            qo(e)
              ? ((n = hl(e, n)), (t.tag = 1), (t = vm(null, t, e, n, a)))
              : ((t.tag = 0), (t = Nr(null, t, e, n, a)));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === U) {
                ((t.tag = 11), (t = fm(null, t, e, n, a)));
                break e;
              } else if (i === ae) {
                ((t.tag = 14), (t = dm(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = Lt(e) || e), Error(r(306, t, '')));
          }
        }
        return t;
      case 0:
        return Nr(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (i = hl(n, t.pendingProps)), vm(e, t, n, i, a));
      case 3:
        e: {
          if ((pt(t, t.stateNode.containerInfo), e === null)) throw Error(r(387));
          n = t.pendingProps;
          var o = t.memoizedState;
          ((i = o.element), ar(e, t), Xi(t, n, null, a));
          var h = t.memoizedState;
          if (
            ((n = h.cache),
            vn(t, rt, n),
            n !== o.cache && Jo(t, [rt], a, !0),
            Zi(),
            (n = h.element),
            o.isDehydrated)
          )
            if (
              ((o = { element: n, isDehydrated: !1, cache: h.cache }),
              (t.updateQueue.baseState = o),
              (t.memoizedState = o),
              t.flags & 256)
            ) {
              t = _m(e, t, n, a);
              break e;
            } else if (n !== i) {
              ((i = sa(Error(r(424)), t)), ki(i), (t = _m(e, t, n, a)));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === 'HTML' ? e.ownerDocument.body : e;
              }
              for (
                Je = da(e.firstChild),
                  Mt = t,
                  Se = !0,
                  yn = null,
                  ua = !0,
                  a = hd(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((cl(), n === i)) {
              t = Fa(e, t, a);
              break e;
            }
            Nt(e, t, n, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          _s(e, t),
          e === null
            ? (a = D0(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : Se ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = Ls(fe.current).createElement(a)),
                (n[at] = t),
                (n[Et] = e),
                zt(n, a, e),
                St(n),
                (t.stateNode = n))
            : (t.memoizedState = D0(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          Ba(t),
          e === null &&
            Se &&
            ((n = t.stateNode = C0(t.type, t.pendingProps, fe.current)),
            (Mt = t),
            (ua = !0),
            (i = Je),
            Cn(t.type) ? ((pu = i), (Je = da(n.firstChild))) : (Je = i)),
          Nt(e, t, t.pendingProps.children, a),
          _s(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Se &&
            ((i = n = Je) &&
              ((n = Ey(n, t.type, t.pendingProps, ua)),
              n !== null
                ? ((t.stateNode = n), (Mt = t), (Je = da(n.firstChild)), (ua = !1), (i = !0))
                : (i = !1)),
            i || gn(t)),
          Ba(t),
          (i = t.type),
          (o = t.pendingProps),
          (h = e !== null ? e.memoizedProps : null),
          (n = o.children),
          uu(i, o) ? (n = null) : h !== null && uu(i, h) && (t.flags |= 32),
          t.memoizedState !== null && ((i = rr(e, t, qp, null, null, a)), (dc._currentValue = i)),
          _s(e, t),
          Nt(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Se &&
            ((e = a = Je) &&
              ((a = My(a, t.pendingProps, ua)),
              a !== null ? ((t.stateNode = a), (Mt = t), (Je = null), (e = !0)) : (e = !1)),
            e || gn(t)),
          null
        );
      case 13:
        return bm(e, t, a);
      case 4:
        return (
          pt(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = dl(t, null, n, a)) : Nt(e, t, n, a),
          t.child
        );
      case 11:
        return fm(e, t, t.type, t.pendingProps, a);
      case 7:
        return (Nt(e, t, t.pendingProps, a), t.child);
      case 8:
        return (Nt(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (Nt(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((n = t.pendingProps), vn(t, t.type, n.value), Nt(e, t, n.children, a), t.child);
      case 9:
        return (
          (i = t.type._context),
          (n = t.pendingProps.children),
          ol(t),
          (i = wt(i)),
          (n = n(i)),
          (t.flags |= 1),
          Nt(e, t, n, a),
          t.child
        );
      case 14:
        return dm(e, t, t.type, t.pendingProps, a);
      case 15:
        return mm(e, t, t.type, t.pendingProps, a);
      case 19:
        return xm(e, t, a);
      case 31:
        return Wp(e, t, a);
      case 22:
        return hm(e, t, a, t.pendingProps);
      case 24:
        return (
          ol(t),
          (n = wt(rt)),
          e === null
            ? ((i = Po()),
              i === null &&
                ((i = Ge),
                (o = Fo()),
                (i.pooledCache = o),
                o.refCount++,
                o !== null && (i.pooledCacheLanes |= a),
                (i = o)),
              (t.memoizedState = { parent: n, cache: i }),
              tr(t),
              vn(t, rt, i))
            : ((e.lanes & a) !== 0 && (ar(e, t), Xi(t, null, null, a), Zi()),
              (i = e.memoizedState),
              (o = t.memoizedState),
              i.parent !== n
                ? ((i = { parent: n, cache: n }),
                  (t.memoizedState = i),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i),
                  vn(t, rt, n))
                : ((n = o.cache), vn(t, rt, n), n !== i.cache && Jo(t, [rt], a, !0))),
          Nt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Ia(e) {
    e.flags |= 4;
  }
  function $r(e, t, a, n, i) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (i & 335544128) === i))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Jm()) e.flags |= 8192;
        else throw ((fl = ls), er);
    } else e.flags &= -16777217;
  }
  function Am(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !k0(t)))
      if (Jm()) e.flags |= 8192;
      else throw ((fl = ls), er);
  }
  function Ss(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Ei() : 536870912), (e.lanes |= t), (li |= t)));
  }
  function Ii(e, t) {
    if (!Se)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var a = null; t !== null; ) (t.alternate !== null && (a = t), (t = t.sibling));
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = e.tail;
          for (var n = null; a !== null; ) (a.alternate !== null && (n = a), (a = a.sibling));
          n === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (n.sibling = null);
      }
  }
  function Fe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      n = 0;
    if (t)
      for (var i = e.child; i !== null; )
        ((a |= i.lanes | i.childLanes),
          (n |= i.subtreeFlags & 65011712),
          (n |= i.flags & 65011712),
          (i.return = e),
          (i = i.sibling));
    else
      for (i = e.child; i !== null; )
        ((a |= i.lanes | i.childLanes),
          (n |= i.subtreeFlags),
          (n |= i.flags),
          (i.return = e),
          (i = i.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = a), t);
  }
  function Fp(e, t, a) {
    var n = t.pendingProps;
    switch ((Zo(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Fe(t), null);
      case 1:
        return (Fe(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Qa(rt),
          Ke(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (Zl(t)
              ? Ia(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Ko())),
          Fe(t),
          null
        );
      case 26:
        var i = t.type,
          o = t.memoizedState;
        return (
          e === null
            ? (Ia(t), o !== null ? (Fe(t), Am(t, o)) : (Fe(t), $r(t, i, null, n, a)))
            : o
              ? o !== e.memoizedState
                ? (Ia(t), Fe(t), Am(t, o))
                : (Fe(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Ia(t), Fe(t), $r(t, i, e, n, a)),
          null
        );
      case 27:
        if ((Ma(t), (a = fe.current), (i = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Ia(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(r(166));
            return (Fe(t), null);
          }
          ((e = W.current), Zl(t) ? nd(t) : ((e = C0(i, n, a)), (t.stateNode = e), Ia(t)));
        }
        return (Fe(t), null);
      case 5:
        if ((Ma(t), (i = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Ia(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(r(166));
            return (Fe(t), null);
          }
          if (((o = W.current), Zl(t))) nd(t);
          else {
            var h = Ls(fe.current);
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
            ((o[at] = t), (o[Et] = n));
            e: for (h = t.child; h !== null; ) {
              if (h.tag === 5 || h.tag === 6) o.appendChild(h.stateNode);
              else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                ((h.child.return = h), (h = h.child));
                continue;
              }
              if (h === t) break e;
              for (; h.sibling === null; ) {
                if (h.return === null || h.return === t) break e;
                h = h.return;
              }
              ((h.sibling.return = h.return), (h = h.sibling));
            }
            t.stateNode = o;
            e: switch ((zt(o, i, n), i)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                n = !!n.autoFocus;
                break e;
              case 'img':
                n = !0;
                break e;
              default:
                n = !1;
            }
            n && Ia(t);
          }
        }
        return (Fe(t), $r(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Ia(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(r(166));
          if (((e = fe.current), Zl(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (n = null), (i = Mt), i !== null))
              switch (i.tag) {
                case 27:
                case 5:
                  n = i.memoizedProps;
              }
            ((e[at] = t),
              (e = !!(
                e.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                b0(e.nodeValue, a)
              )),
              e || gn(t, !0));
          } else ((e = Ls(e).createTextNode(n)), (e[at] = t), (t.stateNode = e));
        }
        return (Fe(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = Zl(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(r(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(r(557));
              e[at] = t;
            } else (cl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Fe(t), (e = !1));
          } else
            ((a = Ko()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (Jt(t), t) : (Jt(t), null);
          if ((t.flags & 128) !== 0) throw Error(r(558));
        }
        return (Fe(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((i = Zl(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!i) throw Error(r(318));
              if (((i = t.memoizedState), (i = i !== null ? i.dehydrated : null), !i))
                throw Error(r(317));
              i[at] = t;
            } else (cl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Fe(t), (i = !1));
          } else
            ((i = Ko()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i),
              (i = !0));
          if (!i) return t.flags & 256 ? (Jt(t), t) : (Jt(t), null);
        }
        return (
          Jt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = n !== null),
              (e = e !== null && e.memoizedState !== null),
              a &&
                ((n = t.child),
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
              a !== e && a && (t.child.flags |= 8192),
              Ss(t, t.updateQueue),
              Fe(t),
              null)
        );
      case 4:
        return (Ke(), e === null && iu(t.stateNode.containerInfo), Fe(t), null);
      case 10:
        return (Qa(t.type), Fe(t), null);
      case 19:
        if ((H(ct), (n = t.memoizedState), n === null)) return (Fe(t), null);
        if (((i = (t.flags & 128) !== 0), (o = n.rendering), o === null))
          if (i) Ii(n, !1);
          else {
            if (it !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((o = os(e)), o !== null)) {
                  for (
                    t.flags |= 128,
                      Ii(n, !1),
                      e = o.updateQueue,
                      t.updateQueue = e,
                      Ss(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (If(a, e), (a = a.sibling));
                  return (K(ct, (ct.current & 1) | 2), Se && Xa(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              De() > Es &&
              ((t.flags |= 128), (i = !0), Ii(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!i)
            if (((e = os(o)), e !== null)) {
              if (
                ((t.flags |= 128),
                (i = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Ss(t, e),
                Ii(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !o.alternate && !Se)
              )
                return (Fe(t), null);
            } else
              2 * De() - n.renderingStartTime > Es &&
                a !== 536870912 &&
                ((t.flags |= 128), (i = !0), Ii(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((o.sibling = t.child), (t.child = o))
            : ((e = n.last), e !== null ? (e.sibling = o) : (t.child = o), (n.last = o));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = De()),
            (e.sibling = null),
            (a = ct.current),
            K(ct, i ? (a & 1) | 2 : a & 1),
            Se && Xa(t, n.treeForkCount),
            e)
          : (Fe(t), null);
      case 22:
      case 23:
        return (
          Jt(t),
          cr(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Fe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Fe(t),
          (a = t.updateQueue),
          a !== null && Ss(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (n = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (n = t.memoizedState.cachePool.pool),
          n !== a && (t.flags |= 2048),
          e !== null && H(rl),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Qa(rt),
          Fe(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function Ip(e, t) {
    switch ((Zo(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Qa(rt),
          Ke(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Ma(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Jt(t), t.alternate === null)) throw Error(r(340));
          cl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Jt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(r(340));
          cl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (H(ct), null);
      case 4:
        return (Ke(), null);
      case 10:
        return (Qa(t.type), null);
      case 22:
      case 23:
        return (
          Jt(t),
          cr(),
          e !== null && H(rl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Qa(rt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Tm(e, t) {
    switch ((Zo(t), t.tag)) {
      case 3:
        (Qa(rt), Ke());
        break;
      case 26:
      case 27:
      case 5:
        Ma(t);
        break;
      case 4:
        Ke();
        break;
      case 31:
        t.memoizedState !== null && Jt(t);
        break;
      case 13:
        Jt(t);
        break;
      case 19:
        H(ct);
        break;
      case 10:
        Qa(t.type);
        break;
      case 22:
      case 23:
        (Jt(t), cr(), e !== null && H(rl));
        break;
      case 24:
        Qa(rt);
    }
  }
  function Pi(e, t) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        a = i;
        do {
          if ((a.tag & e) === e) {
            n = void 0;
            var o = a.create,
              h = a.inst;
            ((n = o()), (h.destroy = n));
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (v) {
      $e(t, t.return, v);
    }
  }
  function An(e, t, a) {
    try {
      var n = t.updateQueue,
        i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var o = i.next;
        n = o;
        do {
          if ((n.tag & e) === e) {
            var h = n.inst,
              v = h.destroy;
            if (v !== void 0) {
              ((h.destroy = void 0), (i = t));
              var S = a,
                N = v;
              try {
                N();
              } catch (B) {
                $e(i, S, B);
              }
            }
          }
          n = n.next;
        } while (n !== o);
      }
    } catch (B) {
      $e(t, t.return, B);
    }
  }
  function Em(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        yd(t, a);
      } catch (n) {
        $e(e, e.return, n);
      }
    }
  }
  function Mm(e, t, a) {
    ((a.props = hl(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      $e(e, t, n);
    }
  }
  function ec(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var n = e.stateNode;
            break;
          case 30:
            n = e.stateNode;
            break;
          default:
            n = e.stateNode;
        }
        typeof a == 'function' ? (e.refCleanup = a(n)) : (a.current = n);
      }
    } catch (i) {
      $e(e, t, i);
    }
  }
  function Ra(e, t) {
    var a = e.ref,
      n = e.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (i) {
          $e(e, t, i);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (i) {
          $e(e, t, i);
        }
      else a.current = null;
  }
  function wm(e) {
    var t = e.type,
      a = e.memoizedProps,
      n = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && n.focus();
          break e;
        case 'img':
          a.src ? (n.src = a.src) : a.srcSet && (n.srcset = a.srcSet);
      }
    } catch (i) {
      $e(e, e.return, i);
    }
  }
  function Hr(e, t, a) {
    try {
      var n = e.stateNode;
      (by(n, e.type, a, t), (n[Et] = t));
    } catch (i) {
      $e(e, e.return, i);
    }
  }
  function Nm(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Cn(e.type)) || e.tag === 4
    );
  }
  function kr(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Nm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && Cn(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ur(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6)
      ((e = e.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === 'HTML'
                ? a.ownerDocument.body
                : a
            ).insertBefore(e, t)
          : ((t = a.nodeType === 9 ? a.body : a.nodeName === 'HTML' ? a.ownerDocument.body : a),
            t.appendChild(e),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = Ga)));
    else if (
      n !== 4 &&
      (n === 27 && Cn(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Ur(e, t, a), e = e.sibling; e !== null; ) (Ur(e, t, a), (e = e.sibling));
  }
  function xs(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && Cn(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (xs(e, t, a), e = e.sibling; e !== null; ) (xs(e, t, a), (e = e.sibling));
  }
  function zm(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
      (zt(t, n, a), (t[at] = e), (t[Et] = a));
    } catch (o) {
      $e(e, e.return, o);
    }
  }
  var Pa = !1,
    dt = !1,
    qr = !1,
    Cm = typeof WeakSet == 'function' ? WeakSet : Set,
    xt = null;
  function Pp(e, t) {
    if (((e = e.containerInfo), (ou = Gs), (e = Gf(e)), Do(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
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
              break e;
            }
            var h = 0,
              v = -1,
              S = -1,
              N = 0,
              B = 0,
              k = e,
              z = null;
            t: for (;;) {
              for (
                var C;
                k !== a || (i !== 0 && k.nodeType !== 3) || (v = h + i),
                  k !== o || (n !== 0 && k.nodeType !== 3) || (S = h + n),
                  k.nodeType === 3 && (h += k.nodeValue.length),
                  (C = k.firstChild) !== null;
              )
                ((z = k), (k = C));
              for (;;) {
                if (k === e) break t;
                if (
                  (z === a && ++N === i && (v = h),
                  z === o && ++B === n && (S = h),
                  (C = k.nextSibling) !== null)
                )
                  break;
                ((k = z), (z = k.parentNode));
              }
              k = C;
            }
            a = v === -1 || S === -1 ? null : { start: v, end: S };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (ru = { focusedElem: e, selectionRange: a }, Gs = !1, xt = t; xt !== null; )
      if (((t = xt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (xt = e));
      else
        for (; xt !== null; ) {
          switch (((t = xt), (o = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (a = 0; a < e.length; a++) ((i = e[a]), (i.ref.impl = i.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && o !== null) {
                ((e = void 0),
                  (a = t),
                  (i = o.memoizedProps),
                  (o = o.memoizedState),
                  (n = a.stateNode));
                try {
                  var I = hl(a.type, i);
                  ((e = n.getSnapshotBeforeUpdate(I, o)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ce) {
                  $e(a, a.return, ce);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) du(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      du(e);
                      break;
                    default:
                      e.textContent = '';
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
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (xt = e));
            break;
          }
          xt = t.return;
        }
  }
  function Rm(e, t, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (tn(e, a), n & 4 && Pi(5, a));
        break;
      case 1:
        if ((tn(e, a), n & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (h) {
              $e(a, a.return, h);
            }
          else {
            var i = hl(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (h) {
              $e(a, a.return, h);
            }
          }
        (n & 64 && Em(a), n & 512 && ec(a, a.return));
        break;
      case 3:
        if ((tn(e, a), n & 64 && ((e = a.updateQueue), e !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            yd(e, t);
          } catch (h) {
            $e(a, a.return, h);
          }
        }
        break;
      case 27:
        t === null && n & 4 && zm(a);
      case 26:
      case 5:
        (tn(e, a), t === null && n & 4 && wm(a), n & 512 && ec(a, a.return));
        break;
      case 12:
        tn(e, a);
        break;
      case 31:
        (tn(e, a), n & 4 && Bm(e, a));
        break;
      case 13:
        (tn(e, a),
          n & 4 && Lm(e, a),
          n & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = oy.bind(null, a)), wy(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || Pa), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || dt), (i = Pa));
          var o = dt;
          ((Pa = n),
            (dt = t) && !o ? an(e, a, (a.subtreeFlags & 8772) !== 0) : tn(e, a),
            (Pa = i),
            (dt = o));
        }
        break;
      case 30:
        break;
      default:
        tn(e, a);
    }
  }
  function Om(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Om(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && go(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Pe = null,
    Vt = !1;
  function en(e, t, a) {
    for (a = a.child; a !== null; ) (Dm(e, t, a), (a = a.sibling));
  }
  function Dm(e, t, a) {
    if (yt && typeof yt.onCommitFiberUnmount == 'function')
      try {
        yt.onCommitFiberUnmount(wa, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (dt || Ra(a, t),
          en(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        dt || Ra(a, t);
        var n = Pe,
          i = Vt;
        (Cn(a.type) && ((Pe = a.stateNode), (Vt = !1)),
          en(e, t, a),
          rc(a.stateNode),
          (Pe = n),
          (Vt = i));
        break;
      case 5:
        dt || Ra(a, t);
      case 6:
        if (((n = Pe), (i = Vt), (Pe = null), en(e, t, a), (Pe = n), (Vt = i), Pe !== null))
          if (Vt)
            try {
              (Pe.nodeType === 9
                ? Pe.body
                : Pe.nodeName === 'HTML'
                  ? Pe.ownerDocument.body
                  : Pe
              ).removeChild(a.stateNode);
            } catch (o) {
              $e(a, t, o);
            }
          else
            try {
              Pe.removeChild(a.stateNode);
            } catch (o) {
              $e(a, t, o);
            }
        break;
      case 18:
        Pe !== null &&
          (Vt
            ? ((e = Pe),
              E0(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              di(e))
            : E0(Pe, a.stateNode));
        break;
      case 4:
        ((n = Pe),
          (i = Vt),
          (Pe = a.stateNode.containerInfo),
          (Vt = !0),
          en(e, t, a),
          (Pe = n),
          (Vt = i));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (An(2, a, t), dt || An(4, a, t), en(e, t, a));
        break;
      case 1:
        (dt ||
          (Ra(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && Mm(a, t, n)),
          en(e, t, a));
        break;
      case 21:
        en(e, t, a);
        break;
      case 22:
        ((dt = (n = dt) || a.memoizedState !== null), en(e, t, a), (dt = n));
        break;
      default:
        en(e, t, a);
    }
  }
  function Bm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        di(e);
      } catch (a) {
        $e(t, t.return, a);
      }
    }
  }
  function Lm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        di(e);
      } catch (a) {
        $e(t, t.return, a);
      }
  }
  function ey(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Cm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Cm()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function js(e, t) {
    var a = ey(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var i = ry.bind(null, e, n);
        n.then(i, i);
      }
    });
  }
  function Gt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var i = a[n],
          o = e,
          h = t,
          v = h;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (Cn(v.type)) {
                ((Pe = v.stateNode), (Vt = !1));
                break e;
              }
              break;
            case 5:
              ((Pe = v.stateNode), (Vt = !1));
              break e;
            case 3:
            case 4:
              ((Pe = v.stateNode.containerInfo), (Vt = !0));
              break e;
          }
          v = v.return;
        }
        if (Pe === null) throw Error(r(160));
        (Dm(o, h, i),
          (Pe = null),
          (Vt = !1),
          (o = i.alternate),
          o !== null && (o.return = null),
          (i.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) ($m(t, e), (t = t.sibling));
  }
  var _a = null;
  function $m(e, t) {
    var a = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Gt(t, e), Yt(e), n & 4 && (An(3, e, e.return), Pi(3, e), An(5, e, e.return)));
        break;
      case 1:
        (Gt(t, e),
          Yt(e),
          n & 512 && (dt || a === null || Ra(a, a.return)),
          n & 64 &&
            Pa &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var i = _a;
        if ((Gt(t, e), Yt(e), n & 512 && (dt || a === null || Ra(a, a.return)), n & 4)) {
          var o = a !== null ? a.memoizedState : null;
          if (((n = e.memoizedState), a === null))
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  ((n = e.type), (a = e.memoizedProps), (i = i.ownerDocument || i));
                  t: switch (n) {
                    case 'title':
                      ((o = i.getElementsByTagName('title')[0]),
                        (!o ||
                          o[Mi] ||
                          o[at] ||
                          o.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          o.hasAttribute('itemprop')) &&
                          ((o = i.createElement(n)),
                          i.head.insertBefore(o, i.querySelector('head > title'))),
                        zt(o, n, a),
                        (o[at] = e),
                        St(o),
                        (n = o));
                      break e;
                    case 'link':
                      var h = $0('link', 'href', i).get(n + (a.href || ''));
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
                            break t;
                          }
                      }
                      ((o = i.createElement(n)), zt(o, n, a), i.head.appendChild(o));
                      break;
                    case 'meta':
                      if ((h = $0('meta', 'content', i).get(n + (a.content || '')))) {
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
                            break t;
                          }
                      }
                      ((o = i.createElement(n)), zt(o, n, a), i.head.appendChild(o));
                      break;
                    default:
                      throw Error(r(468, n));
                  }
                  ((o[at] = e), St(o), (n = o));
                }
                e.stateNode = n;
              } else H0(i, e.type, e.stateNode);
            else e.stateNode = L0(i, n, e.memoizedProps);
          else
            o !== n
              ? (o === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : o.count--,
                n === null ? H0(i, e.type, e.stateNode) : L0(i, n, e.memoizedProps))
              : n === null && e.stateNode !== null && Hr(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Gt(t, e),
          Yt(e),
          n & 512 && (dt || a === null || Ra(a, a.return)),
          a !== null && n & 4 && Hr(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Gt(t, e), Yt(e), n & 512 && (dt || a === null || Ra(a, a.return)), e.flags & 32)) {
          i = e.stateNode;
          try {
            Bl(i, '');
          } catch (I) {
            $e(e, e.return, I);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((i = e.memoizedProps), Hr(e, i, a !== null ? a.memoizedProps : i)),
          n & 1024 && (qr = !0));
        break;
      case 6:
        if ((Gt(t, e), Yt(e), n & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          ((n = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = n;
          } catch (I) {
            $e(e, e.return, I);
          }
        }
        break;
      case 3:
        if (
          ((ks = null),
          (i = _a),
          (_a = $s(t.containerInfo)),
          Gt(t, e),
          (_a = i),
          Yt(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            di(t.containerInfo);
          } catch (I) {
            $e(e, e.return, I);
          }
        qr && ((qr = !1), Hm(e));
        break;
      case 4:
        ((n = _a), (_a = $s(e.stateNode.containerInfo)), Gt(t, e), Yt(e), (_a = n));
        break;
      case 12:
        (Gt(t, e), Yt(e));
        break;
      case 31:
        (Gt(t, e),
          Yt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), js(e, n))));
        break;
      case 13:
        (Gt(t, e),
          Yt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Ts = De()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), js(e, n))));
        break;
      case 22:
        i = e.memoizedState !== null;
        var S = a !== null && a.memoizedState !== null,
          N = Pa,
          B = dt;
        if (((Pa = N || i), (dt = B || S), Gt(t, e), (dt = B), (Pa = N), Yt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = i ? t._visibility & -2 : t._visibility | 1,
              i && (a === null || S || Pa || dt || pl(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                S = a = t;
                try {
                  if (((o = S.stateNode), i))
                    ((h = o.style),
                      typeof h.setProperty == 'function'
                        ? h.setProperty('display', 'none', 'important')
                        : (h.display = 'none'));
                  else {
                    v = S.stateNode;
                    var k = S.memoizedProps.style,
                      z = k != null && k.hasOwnProperty('display') ? k.display : null;
                    v.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (I) {
                  $e(S, S.return, I);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                S = t;
                try {
                  S.stateNode.nodeValue = i ? '' : S.memoizedProps;
                } catch (I) {
                  $e(S, S.return, I);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                S = t;
                try {
                  var C = S.stateNode;
                  i ? M0(C, !0) : M0(S.stateNode, !1);
                } catch (I) {
                  $e(S, S.return, I);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) || t.memoizedState === null || t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (a === t && (a = null), (t = t.return));
            }
            (a === t && (a = null), (t.sibling.return = t.return), (t = t.sibling));
          }
        n & 4 &&
          ((n = e.updateQueue),
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), js(e, a))));
        break;
      case 19:
        (Gt(t, e),
          Yt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), js(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Gt(t, e), Yt(e));
    }
  }
  function Yt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, n = e.return; n !== null; ) {
          if (Nm(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var i = a.stateNode,
              o = kr(e);
            xs(e, o, i);
            break;
          case 5:
            var h = a.stateNode;
            a.flags & 32 && (Bl(h, ''), (a.flags &= -33));
            var v = kr(e);
            xs(e, v, h);
            break;
          case 3:
          case 4:
            var S = a.stateNode.containerInfo,
              N = kr(e);
            Ur(e, N, S);
            break;
          default:
            throw Error(r(161));
        }
      } catch (B) {
        $e(e, e.return, B);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Hm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Hm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function tn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Rm(e, t.alternate, t), (t = t.sibling));
  }
  function pl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (An(4, t, t.return), pl(t));
          break;
        case 1:
          Ra(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && Mm(t, t.return, a), pl(t));
          break;
        case 27:
          rc(t.stateNode);
        case 26:
        case 5:
          (Ra(t, t.return), pl(t));
          break;
        case 22:
          t.memoizedState === null && pl(t);
          break;
        case 30:
          pl(t);
          break;
        default:
          pl(t);
      }
      e = e.sibling;
    }
  }
  function an(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        i = e,
        o = t,
        h = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          (an(i, o, a), Pi(4, o));
          break;
        case 1:
          if ((an(i, o, a), (n = o), (i = n.stateNode), typeof i.componentDidMount == 'function'))
            try {
              i.componentDidMount();
            } catch (N) {
              $e(n, n.return, N);
            }
          if (((n = o), (i = n.updateQueue), i !== null)) {
            var v = n.stateNode;
            try {
              var S = i.shared.hiddenCallbacks;
              if (S !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < S.length; i++) pd(S[i], v);
            } catch (N) {
              $e(n, n.return, N);
            }
          }
          (a && h & 64 && Em(o), ec(o, o.return));
          break;
        case 27:
          zm(o);
        case 26:
        case 5:
          (an(i, o, a), a && n === null && h & 4 && wm(o), ec(o, o.return));
          break;
        case 12:
          an(i, o, a);
          break;
        case 31:
          (an(i, o, a), a && h & 4 && Bm(i, o));
          break;
        case 13:
          (an(i, o, a), a && h & 4 && Lm(i, o));
          break;
        case 22:
          (o.memoizedState === null && an(i, o, a), ec(o, o.return));
          break;
        case 30:
          break;
        default:
          an(i, o, a);
      }
      t = t.sibling;
    }
  }
  function Vr(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && Ui(a)));
  }
  function Gr(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Ui(e)));
  }
  function ba(e, t, a, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (km(e, t, a, n), (t = t.sibling));
  }
  function km(e, t, a, n) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (ba(e, t, a, n), i & 2048 && Pi(9, t));
        break;
      case 1:
        ba(e, t, a, n);
        break;
      case 3:
        (ba(e, t, a, n),
          i & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Ui(e))));
        break;
      case 12:
        if (i & 2048) {
          (ba(e, t, a, n), (e = t.stateNode));
          try {
            var o = t.memoizedProps,
              h = o.id,
              v = o.onPostCommit;
            typeof v == 'function' &&
              v(h, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (S) {
            $e(t, t.return, S);
          }
        } else ba(e, t, a, n);
        break;
      case 31:
        ba(e, t, a, n);
        break;
      case 13:
        ba(e, t, a, n);
        break;
      case 23:
        break;
      case 22:
        ((o = t.stateNode),
          (h = t.alternate),
          t.memoizedState !== null
            ? o._visibility & 2
              ? ba(e, t, a, n)
              : tc(e, t)
            : o._visibility & 2
              ? ba(e, t, a, n)
              : ((o._visibility |= 2), ti(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          i & 2048 && Vr(h, t));
        break;
      case 24:
        (ba(e, t, a, n), i & 2048 && Gr(t.alternate, t));
        break;
      default:
        ba(e, t, a, n);
    }
  }
  function ti(e, t, a, n, i) {
    for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var o = e,
        h = t,
        v = a,
        S = n,
        N = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          (ti(o, h, v, S, i), Pi(8, h));
          break;
        case 23:
          break;
        case 22:
          var B = h.stateNode;
          (h.memoizedState !== null
            ? B._visibility & 2
              ? ti(o, h, v, S, i)
              : tc(o, h)
            : ((B._visibility |= 2), ti(o, h, v, S, i)),
            i && N & 2048 && Vr(h.alternate, h));
          break;
        case 24:
          (ti(o, h, v, S, i), i && N & 2048 && Gr(h.alternate, h));
          break;
        default:
          ti(o, h, v, S, i);
      }
      t = t.sibling;
    }
  }
  function tc(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          n = t,
          i = n.flags;
        switch (n.tag) {
          case 22:
            (tc(a, n), i & 2048 && Vr(n.alternate, n));
            break;
          case 24:
            (tc(a, n), i & 2048 && Gr(n.alternate, n));
            break;
          default:
            tc(a, n);
        }
        t = t.sibling;
      }
  }
  var ac = 8192;
  function ai(e, t, a) {
    if (e.subtreeFlags & ac) for (e = e.child; e !== null; ) (Um(e, t, a), (e = e.sibling));
  }
  function Um(e, t, a) {
    switch (e.tag) {
      case 26:
        (ai(e, t, a),
          e.flags & ac && e.memoizedState !== null && Uy(a, _a, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        ai(e, t, a);
        break;
      case 3:
      case 4:
        var n = _a;
        ((_a = $s(e.stateNode.containerInfo)), ai(e, t, a), (_a = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = ac), (ac = 16777216), ai(e, t, a), (ac = n))
            : ai(e, t, a));
        break;
      default:
        ai(e, t, a);
    }
  }
  function qm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function nc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((xt = n), Gm(n, e));
        }
      qm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Vm(e), (e = e.sibling));
  }
  function Vm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (nc(e), e.flags & 2048 && An(9, e, e.return));
        break;
      case 3:
        nc(e);
        break;
      case 12:
        nc(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), As(e))
          : nc(e);
        break;
      default:
        nc(e);
    }
  }
  function As(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((xt = n), Gm(n, e));
        }
      qm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (An(8, t, t.return), As(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), As(t)));
          break;
        default:
          As(t);
      }
      e = e.sibling;
    }
  }
  function Gm(e, t) {
    for (; xt !== null; ) {
      var a = xt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          An(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Ui(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (xt = n));
      else
        e: for (a = e; xt !== null; ) {
          n = xt;
          var i = n.sibling,
            o = n.return;
          if ((Om(n), n === a)) {
            xt = null;
            break e;
          }
          if (i !== null) {
            ((i.return = o), (xt = i));
            break e;
          }
          xt = o;
        }
    }
  }
  var ty = {
      getCacheForType: function (e) {
        var t = wt(rt),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return wt(rt).controller.signal;
      },
    },
    ay = typeof WeakMap == 'function' ? WeakMap : Map,
    Ce = 0,
    Ge = null,
    ye = null,
    ve = 0,
    Le = 0,
    Ft = null,
    Tn = !1,
    ni = !1,
    Yr = !1,
    nn = 0,
    it = 0,
    En = 0,
    yl = 0,
    Zr = 0,
    It = 0,
    li = 0,
    lc = null,
    Zt = null,
    Xr = !1,
    Ts = 0,
    Ym = 0,
    Es = 1 / 0,
    Ms = null,
    Mn = null,
    vt = 0,
    wn = null,
    ii = null,
    ln = 0,
    Kr = 0,
    Qr = null,
    Zm = null,
    ic = 0,
    Wr = null;
  function Pt() {
    return (Ce & 2) !== 0 && ve !== 0 ? ve & -ve : O.T !== null ? tu() : Ae();
  }
  function Xm() {
    if (It === 0)
      if ((ve & 536870912) === 0 || Se) {
        var e = ka;
        ((ka <<= 1), (ka & 3932160) === 0 && (ka = 262144), (It = e));
      } else It = 536870912;
    return ((e = Wt.current), e !== null && (e.flags |= 32), It);
  }
  function Xt(e, t, a) {
    (((e === Ge && (Le === 2 || Le === 9)) || e.cancelPendingCommit !== null) &&
      (ci(e, 0), Nn(e, ve, It, !1)),
      J(e, a),
      ((Ce & 2) === 0 || e !== Ge) &&
        (e === Ge && ((Ce & 2) === 0 && (yl |= a), it === 4 && Nn(e, ve, It, !1)), Oa(e)));
  }
  function Km(e, t, a) {
    if ((Ce & 6) !== 0) throw Error(r(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Fn(e, t),
      i = n ? iy(e, t) : Fr(e, t, !0),
      o = n;
    do {
      if (i === 0) {
        ni && !n && Nn(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), o && !ny(a))) {
          ((i = Fr(e, t, !1)), (o = !1));
          continue;
        }
        if (i === 2) {
          if (((o = t), e.errorRecoveryDisabledLanes & o)) var h = 0;
          else
            ((h = e.pendingLanes & -536870913), (h = h !== 0 ? h : h & 536870912 ? 536870912 : 0));
          if (h !== 0) {
            t = h;
            e: {
              var v = e;
              i = lc;
              var S = v.current.memoizedState.isDehydrated;
              if ((S && (ci(v, h).flags |= 256), (h = Fr(v, h, !1)), h !== 2)) {
                if (Yr && !S) {
                  ((v.errorRecoveryDisabledLanes |= o), (yl |= o), (i = 4));
                  break e;
                }
                ((o = Zt), (Zt = i), o !== null && (Zt === null ? (Zt = o) : Zt.push.apply(Zt, o)));
              }
              i = h;
            }
            if (((o = !1), i !== 2)) continue;
          }
        }
        if (i === 1) {
          (ci(e, 0), Nn(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (o = i), o)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Nn(n, t, It, !Tn);
              break e;
            case 2:
              Zt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((i = Ts + 300 - De()), 10 < i)) {
            if ((Nn(n, t, It, !Tn), qa(n, 0, !0) !== 0)) break e;
            ((ln = t),
              (n.timeoutHandle = A0(
                Qm.bind(null, n, a, Zt, Ms, Xr, t, It, yl, li, Tn, o, 'Throttled', -0, 0),
                i
              )));
            break e;
          }
          Qm(n, a, Zt, Ms, Xr, t, It, yl, li, Tn, o, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Oa(e);
  }
  function Qm(e, t, a, n, i, o, h, v, S, N, B, k, z, C) {
    if (((e.timeoutHandle = -1), (k = t.subtreeFlags), k & 8192 || (k & 16785408) === 16785408)) {
      ((k = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ga,
      }),
        Um(t, o, k));
      var I = (o & 62914560) === o ? Ts - De() : (o & 4194048) === o ? Ym - De() : 0;
      if (((I = qy(k, I)), I !== null)) {
        ((ln = o),
          (e.cancelPendingCommit = I(a0.bind(null, e, t, o, a, n, i, h, v, S, B, k, null, z, C))),
          Nn(e, o, h, !N));
        return;
      }
    }
    a0(e, t, o, a, n, i, h, v, S);
  }
  function ny(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var i = a[n],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!Kt(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null)) ((a.return = t), (t = a));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Nn(e, t, a, n) {
    ((t &= ~Zr),
      (t &= ~yl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var i = t; 0 < i; ) {
      var o = 31 - gt(i),
        h = 1 << o;
      ((n[o] = -1), (i &= ~h));
    }
    a !== 0 && pe(e, a, t);
  }
  function ws() {
    return (Ce & 6) === 0 ? (cc(0), !1) : !0;
  }
  function Jr() {
    if (ye !== null) {
      if (Le === 0) var e = ye.return;
      else ((e = ye), (Ka = sl = null), dr(e), (Jl = null), (Vi = 0), (e = ye));
      for (; e !== null; ) (Tm(e.alternate, e), (e = e.return));
      ye = null;
    }
  }
  function ci(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), jy(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (ln = 0),
      Jr(),
      (Ge = e),
      (ye = a = Za(e.current, null)),
      (ve = t),
      (Le = 0),
      (Ft = null),
      (Tn = !1),
      (ni = Fn(e, t)),
      (Yr = !1),
      (li = It = Zr = yl = En = it = 0),
      (Zt = lc = null),
      (Xr = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var i = 31 - gt(n),
          o = 1 << i;
        ((t |= e[i]), (n &= ~o));
      }
    return ((nn = t), Wc(), a);
  }
  function Wm(e, t) {
    ((ue = null),
      (O.H = Ji),
      t === Wl || t === ns
        ? ((t = fd()), (Le = 3))
        : t === er
          ? ((t = fd()), (Le = 4))
          : (Le =
              t === wr
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Ft = t),
      ye === null && ((it = 1), gs(e, sa(t, e.current))));
  }
  function Jm() {
    var e = Wt.current;
    return e === null
      ? !0
      : (ve & 4194048) === ve
        ? fa === null
        : (ve & 62914560) === ve || (ve & 536870912) !== 0
          ? e === fa
          : !1;
  }
  function Fm() {
    var e = O.H;
    return ((O.H = Ji), e === null ? Ji : e);
  }
  function Im() {
    var e = O.A;
    return ((O.A = ty), e);
  }
  function Ns() {
    ((it = 4),
      Tn || ((ve & 4194048) !== ve && Wt.current !== null) || (ni = !0),
      ((En & 134217727) === 0 && (yl & 134217727) === 0) || Ge === null || Nn(Ge, ve, It, !1));
  }
  function Fr(e, t, a) {
    var n = Ce;
    Ce |= 2;
    var i = Fm(),
      o = Im();
    ((Ge !== e || ve !== t) && ((Ms = null), ci(e, t)), (t = !1));
    var h = it;
    e: do
      try {
        if (Le !== 0 && ye !== null) {
          var v = ye,
            S = Ft;
          switch (Le) {
            case 8:
              (Jr(), (h = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Wt.current === null && (t = !0);
              var N = Le;
              if (((Le = 0), (Ft = null), si(e, v, S, N), a && ni)) {
                h = 0;
                break e;
              }
              break;
            default:
              ((N = Le), (Le = 0), (Ft = null), si(e, v, S, N));
          }
        }
        (ly(), (h = it));
        break;
      } catch (B) {
        Wm(e, B);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Ka = sl = null),
      (Ce = n),
      (O.H = i),
      (O.A = o),
      ye === null && ((Ge = null), (ve = 0), Wc()),
      h
    );
  }
  function ly() {
    for (; ye !== null; ) Pm(ye);
  }
  function iy(e, t) {
    var a = Ce;
    Ce |= 2;
    var n = Fm(),
      i = Im();
    Ge !== e || ve !== t ? ((Ms = null), (Es = De() + 500), ci(e, t)) : (ni = Fn(e, t));
    e: do
      try {
        if (Le !== 0 && ye !== null) {
          t = ye;
          var o = Ft;
          t: switch (Le) {
            case 1:
              ((Le = 0), (Ft = null), si(e, t, o, 1));
              break;
            case 2:
            case 9:
              if (rd(o)) {
                ((Le = 0), (Ft = null), e0(t));
                break;
              }
              ((t = function () {
                ((Le !== 2 && Le !== 9) || Ge !== e || (Le = 7), Oa(e));
              }),
                o.then(t, t));
              break e;
            case 3:
              Le = 7;
              break e;
            case 4:
              Le = 5;
              break e;
            case 7:
              rd(o) ? ((Le = 0), (Ft = null), e0(t)) : ((Le = 0), (Ft = null), si(e, t, o, 7));
              break;
            case 5:
              var h = null;
              switch (ye.tag) {
                case 26:
                  h = ye.memoizedState;
                case 5:
                case 27:
                  var v = ye;
                  if (h ? k0(h) : v.stateNode.complete) {
                    ((Le = 0), (Ft = null));
                    var S = v.sibling;
                    if (S !== null) ye = S;
                    else {
                      var N = v.return;
                      N !== null ? ((ye = N), zs(N)) : (ye = null);
                    }
                    break t;
                  }
              }
              ((Le = 0), (Ft = null), si(e, t, o, 5));
              break;
            case 6:
              ((Le = 0), (Ft = null), si(e, t, o, 6));
              break;
            case 8:
              (Jr(), (it = 6));
              break e;
            default:
              throw Error(r(462));
          }
        }
        cy();
        break;
      } catch (B) {
        Wm(e, B);
      }
    while (!0);
    return (
      (Ka = sl = null),
      (O.H = n),
      (O.A = i),
      (Ce = a),
      ye !== null ? 0 : ((Ge = null), (ve = 0), Wc(), it)
    );
  }
  function cy() {
    for (; ye !== null && !tt(); ) Pm(ye);
  }
  function Pm(e) {
    var t = jm(e.alternate, e, nn);
    ((e.memoizedProps = e.pendingProps), t === null ? zs(e) : (ye = t));
  }
  function e0(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = gm(a, t, t.pendingProps, t.type, void 0, ve);
        break;
      case 11:
        t = gm(a, t, t.pendingProps, t.type.render, t.ref, ve);
        break;
      case 5:
        dr(t);
      default:
        (Tm(a, t), (t = ye = If(t, nn)), (t = jm(a, t, nn)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? zs(e) : (ye = t));
  }
  function si(e, t, a, n) {
    ((Ka = sl = null), dr(t), (Jl = null), (Vi = 0));
    var i = t.return;
    try {
      if (Qp(e, i, t, a, ve)) {
        ((it = 1), gs(e, sa(a, e.current)), (ye = null));
        return;
      }
    } catch (o) {
      if (i !== null) throw ((ye = i), o);
      ((it = 1), gs(e, sa(a, e.current)), (ye = null));
      return;
    }
    t.flags & 32768
      ? (Se || n === 1
          ? (e = !0)
          : ni || (ve & 536870912) !== 0
            ? (e = !1)
            : ((Tn = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Wt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        t0(t, e))
      : zs(t);
  }
  function zs(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        t0(t, Tn);
        return;
      }
      e = t.return;
      var a = Fp(t.alternate, t, nn);
      if (a !== null) {
        ye = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ye = t;
        return;
      }
      ye = t = e;
    } while (t !== null);
    it === 0 && (it = 5);
  }
  function t0(e, t) {
    do {
      var a = Ip(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (ye = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ye = e;
        return;
      }
      ye = e = a;
    } while (e !== null);
    ((it = 6), (ye = null));
  }
  function a0(e, t, a, n, i, o, h, v, S) {
    e.cancelPendingCommit = null;
    do Cs();
    while (vt !== 0);
    if ((Ce & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((o = t.lanes | t.childLanes),
        (o |= ko),
        re(e, a, o, h, v, S),
        e === Ge && ((ye = Ge = null), (ve = 0)),
        (ii = t),
        (wn = e),
        (ln = a),
        (Kr = o),
        (Qr = i),
        (Zm = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            uy(mn, function () {
              return (s0(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = O.T), (O.T = null), (i = X.p), (X.p = 2), (h = Ce), (Ce |= 4));
        try {
          Pp(e, t, a);
        } finally {
          ((Ce = h), (X.p = i), (O.T = n));
        }
      }
      ((vt = 1), n0(), l0(), i0());
    }
  }
  function n0() {
    if (vt === 1) {
      vt = 0;
      var e = wn,
        t = ii,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = X.p;
        X.p = 2;
        var i = Ce;
        Ce |= 4;
        try {
          $m(t, e);
          var o = ru,
            h = Gf(e.containerInfo),
            v = o.focusedElem,
            S = o.selectionRange;
          if (h !== v && v && v.ownerDocument && Vf(v.ownerDocument.documentElement, v)) {
            if (S !== null && Do(v)) {
              var N = S.start,
                B = S.end;
              if ((B === void 0 && (B = N), 'selectionStart' in v))
                ((v.selectionStart = N), (v.selectionEnd = Math.min(B, v.value.length)));
              else {
                var k = v.ownerDocument || document,
                  z = (k && k.defaultView) || window;
                if (z.getSelection) {
                  var C = z.getSelection(),
                    I = v.textContent.length,
                    ce = Math.min(S.start, I),
                    qe = S.end === void 0 ? ce : Math.min(S.end, I);
                  !C.extend && ce > qe && ((h = qe), (qe = ce), (ce = h));
                  var E = qf(v, ce),
                    j = qf(v, qe);
                  if (
                    E &&
                    j &&
                    (C.rangeCount !== 1 ||
                      C.anchorNode !== E.node ||
                      C.anchorOffset !== E.offset ||
                      C.focusNode !== j.node ||
                      C.focusOffset !== j.offset)
                  ) {
                    var w = k.createRange();
                    (w.setStart(E.node, E.offset),
                      C.removeAllRanges(),
                      ce > qe
                        ? (C.addRange(w), C.extend(j.node, j.offset))
                        : (w.setEnd(j.node, j.offset), C.addRange(w)));
                  }
                }
              }
            }
            for (k = [], C = v; (C = C.parentNode); )
              C.nodeType === 1 && k.push({ element: C, left: C.scrollLeft, top: C.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < k.length; v++) {
              var $ = k[v];
              (($.element.scrollLeft = $.left), ($.element.scrollTop = $.top));
            }
          }
          ((Gs = !!ou), (ru = ou = null));
        } finally {
          ((Ce = i), (X.p = n), (O.T = a));
        }
      }
      ((e.current = t), (vt = 2));
    }
  }
  function l0() {
    if (vt === 2) {
      vt = 0;
      var e = wn,
        t = ii,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = X.p;
        X.p = 2;
        var i = Ce;
        Ce |= 4;
        try {
          Rm(e, t.alternate, t);
        } finally {
          ((Ce = i), (X.p = n), (O.T = a));
        }
      }
      vt = 3;
    }
  }
  function i0() {
    if (vt === 4 || vt === 3) {
      ((vt = 0), Rt());
      var e = wn,
        t = ii,
        a = ln,
        n = Zm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (vt = 5)
        : ((vt = 0), (ii = wn = null), c0(e, e.pendingLanes));
      var i = e.pendingLanes;
      if (
        (i === 0 && (Mn = null),
        Be(a),
        (t = t.stateNode),
        yt && typeof yt.onCommitFiberRoot == 'function')
      )
        try {
          yt.onCommitFiberRoot(wa, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = O.T), (i = X.p), (X.p = 2), (O.T = null));
        try {
          for (var o = e.onRecoverableError, h = 0; h < n.length; h++) {
            var v = n[h];
            o(v.value, { componentStack: v.stack });
          }
        } finally {
          ((O.T = t), (X.p = i));
        }
      }
      ((ln & 3) !== 0 && Cs(),
        Oa(e),
        (i = e.pendingLanes),
        (a & 261930) !== 0 && (i & 42) !== 0 ? (e === Wr ? ic++ : ((ic = 0), (Wr = e))) : (ic = 0),
        cc(0));
    }
  }
  function c0(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Ui(t)));
  }
  function Cs() {
    return (n0(), l0(), i0(), s0());
  }
  function s0() {
    if (vt !== 5) return !1;
    var e = wn,
      t = Kr;
    Kr = 0;
    var a = Be(ln),
      n = O.T,
      i = X.p;
    try {
      ((X.p = 32 > a ? 32 : a), (O.T = null), (a = Qr), (Qr = null));
      var o = wn,
        h = ln;
      if (((vt = 0), (ii = wn = null), (ln = 0), (Ce & 6) !== 0)) throw Error(r(331));
      var v = Ce;
      if (
        ((Ce |= 4),
        Vm(o.current),
        km(o, o.current, h, a),
        (Ce = v),
        cc(0, !1),
        yt && typeof yt.onPostCommitFiberRoot == 'function')
      )
        try {
          yt.onPostCommitFiberRoot(wa, o);
        } catch {}
      return !0;
    } finally {
      ((X.p = i), (O.T = n), c0(e, t));
    }
  }
  function o0(e, t, a) {
    ((t = sa(a, t)),
      (t = Mr(e.stateNode, t, 2)),
      (e = Sn(e, t, 2)),
      e !== null && (J(e, 2), Oa(e)));
  }
  function $e(e, t, a) {
    if (e.tag === 3) o0(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          o0(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Mn === null || !Mn.has(n)))
          ) {
            ((e = sa(a, e)),
              (a = rm(2)),
              (n = Sn(t, a, 2)),
              n !== null && (um(a, n, t, e), J(n, 2), Oa(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ir(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new ay();
      var i = new Set();
      n.set(t, i);
    } else ((i = n.get(t)), i === void 0 && ((i = new Set()), n.set(t, i)));
    i.has(a) || ((Yr = !0), i.add(a), (e = sy.bind(null, e, t, a)), t.then(e, e));
  }
  function sy(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ge === e &&
        (ve & a) === a &&
        (it === 4 || (it === 3 && (ve & 62914560) === ve && 300 > De() - Ts)
          ? (Ce & 2) === 0 && ci(e, 0)
          : (Zr |= a),
        li === ve && (li = 0)),
      Oa(e));
  }
  function r0(e, t) {
    (t === 0 && (t = Ei()), (e = ll(e, t)), e !== null && (J(e, t), Oa(e)));
  }
  function oy(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), r0(e, a));
  }
  function ry(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode,
          i = e.memoizedState;
        i !== null && (a = i.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      case 22:
        n = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (n !== null && n.delete(t), r0(e, a));
  }
  function uy(e, t) {
    return At(e, t);
  }
  var Rs = null,
    oi = null,
    Pr = !1,
    Os = !1,
    eu = !1,
    zn = 0;
  function Oa(e) {
    (e !== oi && e.next === null && (oi === null ? (Rs = oi = e) : (oi = oi.next = e)),
      (Os = !0),
      Pr || ((Pr = !0), dy()));
  }
  function cc(e, t) {
    if (!eu && Os) {
      eu = !0;
      do
        for (var a = !1, n = Rs; n !== null; ) {
          if (e !== 0) {
            var i = n.pendingLanes;
            if (i === 0) var o = 0;
            else {
              var h = n.suspendedLanes,
                v = n.pingedLanes;
              ((o = (1 << (31 - gt(42 | e) + 1)) - 1),
                (o &= i & ~(h & ~v)),
                (o = o & 201326741 ? (o & 201326741) | 1 : o ? o | 2 : 0));
            }
            o !== 0 && ((a = !0), m0(n, o));
          } else
            ((o = ve),
              (o = qa(
                n,
                n === Ge ? o : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (o & 3) === 0 || Fn(n, o) || ((a = !0), m0(n, o)));
          n = n.next;
        }
      while (a);
      eu = !1;
    }
  }
  function fy() {
    u0();
  }
  function u0() {
    Os = Pr = !1;
    var e = 0;
    zn !== 0 && xy() && (e = zn);
    for (var t = De(), a = null, n = Rs; n !== null; ) {
      var i = n.next,
        o = f0(n, t);
      (o === 0
        ? ((n.next = null), a === null ? (Rs = i) : (a.next = i), i === null && (oi = a))
        : ((a = n), (e !== 0 || (o & 3) !== 0) && (Os = !0)),
        (n = i));
    }
    ((vt !== 0 && vt !== 5) || cc(e), zn !== 0 && (zn = 0));
  }
  function f0(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        i = e.expirationTimes,
        o = e.pendingLanes & -62914561;
      0 < o;
    ) {
      var h = 31 - gt(o),
        v = 1 << h,
        S = i[h];
      (S === -1
        ? ((v & a) === 0 || (v & n) !== 0) && (i[h] = In(v, t))
        : S <= t && (e.expiredLanes |= v),
        (o &= ~v));
    }
    if (
      ((t = Ge),
      (a = ve),
      (a = qa(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (Le === 2 || Le === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && He(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Fn(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && He(n), Be(a))) {
        case 2:
        case 8:
          a = $a;
          break;
        case 32:
          a = mn;
          break;
        case 268435456:
          a = Kn;
          break;
        default:
          a = mn;
      }
      return (
        (n = d0.bind(null, e)),
        (a = At(a, n)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      n !== null && n !== null && He(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function d0(e, t) {
    if (vt !== 0 && vt !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (Cs() && e.callbackNode !== a) return null;
    var n = ve;
    return (
      (n = qa(e, e === Ge ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Km(e, n, t),
          f0(e, De()),
          e.callbackNode != null && e.callbackNode === a ? d0.bind(null, e) : null)
    );
  }
  function m0(e, t) {
    if (Cs()) return null;
    Km(e, t, !0);
  }
  function dy() {
    Ay(function () {
      (Ce & 6) !== 0 ? At(La, fy) : u0();
    });
  }
  function tu() {
    if (zn === 0) {
      var e = Kl;
      (e === 0 && ((e = Jn), (Jn <<= 1), (Jn & 261888) === 0 && (Jn = 256)), (zn = e));
    }
    return zn;
  }
  function h0(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : qc('' + e);
  }
  function p0(e, t) {
    var a = t.ownerDocument.createElement('input');
    return (
      (a.name = t.name),
      (a.value = t.value),
      e.id && a.setAttribute('form', e.id),
      t.parentNode.insertBefore(a, t),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    );
  }
  function my(e, t, a, n, i) {
    if (t === 'submit' && a && a.stateNode === i) {
      var o = h0((i[Et] || null).action),
        h = n.submitter;
      h &&
        ((t = (t = h[Et] || null) ? h0(t.formAction) : h.getAttribute('formAction')),
        t !== null && ((o = t), (h = null)));
      var v = new Zc('action', 'action', null, n, i);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (zn !== 0) {
                  var S = h ? p0(i, h) : new FormData(i);
                  Sr(a, { pending: !0, data: S, method: i.method, action: o }, null, S);
                }
              } else
                typeof o == 'function' &&
                  (v.preventDefault(),
                  (S = h ? p0(i, h) : new FormData(i)),
                  Sr(a, { pending: !0, data: S, method: i.method, action: o }, o, S));
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var au = 0; au < Ho.length; au++) {
    var nu = Ho[au],
      hy = nu.toLowerCase(),
      py = nu[0].toUpperCase() + nu.slice(1);
    va(hy, 'on' + py);
  }
  (va(Xf, 'onAnimationEnd'),
    va(Kf, 'onAnimationIteration'),
    va(Qf, 'onAnimationStart'),
    va('dblclick', 'onDoubleClick'),
    va('focusin', 'onFocus'),
    va('focusout', 'onBlur'),
    va(Cp, 'onTransitionRun'),
    va(Rp, 'onTransitionStart'),
    va(Op, 'onTransitionCancel'),
    va(Wf, 'onTransitionEnd'),
    Ol('onMouseEnter', ['mouseout', 'mouseover']),
    Ol('onMouseLeave', ['mouseout', 'mouseover']),
    Ol('onPointerEnter', ['pointerout', 'pointerover']),
    Ol('onPointerLeave', ['pointerout', 'pointerover']),
    el('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    el(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    el('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    el('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    el(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    el(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var sc =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    yy = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(sc)
    );
  function y0(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var n = e[a],
        i = n.event;
      n = n.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var h = n.length - 1; 0 <= h; h--) {
            var v = n[h],
              S = v.instance,
              N = v.currentTarget;
            if (((v = v.listener), S !== o && i.isPropagationStopped())) break e;
            ((o = v), (i.currentTarget = N));
            try {
              o(i);
            } catch (B) {
              Qc(B);
            }
            ((i.currentTarget = null), (o = S));
          }
        else
          for (h = 0; h < n.length; h++) {
            if (
              ((v = n[h]),
              (S = v.instance),
              (N = v.currentTarget),
              (v = v.listener),
              S !== o && i.isPropagationStopped())
            )
              break e;
            ((o = v), (i.currentTarget = N));
            try {
              o(i);
            } catch (B) {
              Qc(B);
            }
            ((i.currentTarget = null), (o = S));
          }
      }
    }
  }
  function ge(e, t) {
    var a = t[yo];
    a === void 0 && (a = t[yo] = new Set());
    var n = e + '__bubble';
    a.has(n) || (g0(t, e, 2, !1), a.add(n));
  }
  function lu(e, t, a) {
    var n = 0;
    (t && (n |= 4), g0(a, e, n, t));
  }
  var Ds = '_reactListening' + Math.random().toString(36).slice(2);
  function iu(e) {
    if (!e[Ds]) {
      ((e[Ds] = !0),
        uf.forEach(function (a) {
          a !== 'selectionchange' && (yy.has(a) || lu(a, !1, e), lu(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ds] || ((t[Ds] = !0), lu('selectionchange', !1, t));
    }
  }
  function g0(e, t, a, n) {
    switch (X0(t)) {
      case 2:
        var i = Yy;
        break;
      case 8:
        i = Zy;
        break;
      default:
        i = bu;
    }
    ((a = i.bind(null, t, a, e)),
      (i = void 0),
      !To || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (i = !0),
      n
        ? i !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: i })
          : e.addEventListener(t, a, !0)
        : i !== void 0
          ? e.addEventListener(t, a, { passive: i })
          : e.addEventListener(t, a, !1));
  }
  function cu(e, t, a, n, i) {
    var o = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
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
            if (((h = zl(v)), h === null)) return;
            if (((S = h.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              n = o = h;
              continue e;
            }
            v = v.parentNode;
          }
        }
        n = n.return;
      }
    xf(function () {
      var N = o,
        B = jo(a),
        k = [];
      e: {
        var z = Jf.get(e);
        if (z !== void 0) {
          var C = Zc,
            I = e;
          switch (e) {
            case 'keypress':
              if (Gc(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              C = rp;
              break;
            case 'focusin':
              ((I = 'focus'), (C = No));
              break;
            case 'focusout':
              ((I = 'blur'), (C = No));
              break;
            case 'beforeblur':
            case 'afterblur':
              C = No;
              break;
            case 'click':
              if (a.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              C = Tf;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              C = F1;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              C = dp;
              break;
            case Xf:
            case Kf:
            case Qf:
              C = ep;
              break;
            case Wf:
              C = hp;
              break;
            case 'scroll':
            case 'scrollend':
              C = W1;
              break;
            case 'wheel':
              C = yp;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              C = ap;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              C = Mf;
              break;
            case 'toggle':
            case 'beforetoggle':
              C = vp;
          }
          var ce = (t & 4) !== 0,
            qe = !ce && (e === 'scroll' || e === 'scrollend'),
            E = ce ? (z !== null ? z + 'Capture' : null) : z;
          ce = [];
          for (var j = N, w; j !== null; ) {
            var $ = j;
            if (
              ((w = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                w === null ||
                E === null ||
                (($ = Ni(j, E)), $ != null && ce.push(oc(j, $, w))),
              qe)
            )
              break;
            j = j.return;
          }
          0 < ce.length && ((z = new C(z, I, null, a, B)), k.push({ event: z, listeners: ce }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((z = e === 'mouseover' || e === 'pointerover'),
            (C = e === 'mouseout' || e === 'pointerout'),
            z && a !== xo && (I = a.relatedTarget || a.fromElement) && (zl(I) || I[Na]))
          )
            break e;
          if (
            (C || z) &&
            ((z =
              B.window === B
                ? B
                : (z = B.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            C
              ? ((I = a.relatedTarget || a.toElement),
                (C = N),
                (I = I ? zl(I) : null),
                I !== null &&
                  ((qe = d(I)), (ce = I.tag), I !== qe || (ce !== 5 && ce !== 27 && ce !== 6)) &&
                  (I = null))
              : ((C = null), (I = N)),
            C !== I)
          ) {
            if (
              ((ce = Tf),
              ($ = 'onMouseLeave'),
              (E = 'onMouseEnter'),
              (j = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((ce = Mf), ($ = 'onPointerLeave'), (E = 'onPointerEnter'), (j = 'pointer')),
              (qe = C == null ? z : wi(C)),
              (w = I == null ? z : wi(I)),
              (z = new ce($, j + 'leave', C, a, B)),
              (z.target = qe),
              (z.relatedTarget = w),
              ($ = null),
              zl(B) === N &&
                ((ce = new ce(E, j + 'enter', I, a, B)),
                (ce.target = w),
                (ce.relatedTarget = qe),
                ($ = ce)),
              (qe = $),
              C && I)
            )
              t: {
                for (ce = gy, E = C, j = I, w = 0, $ = E; $; $ = ce($)) w++;
                $ = 0;
                for (var te = j; te; te = ce(te)) $++;
                for (; 0 < w - $; ) ((E = ce(E)), w--);
                for (; 0 < $ - w; ) ((j = ce(j)), $--);
                for (; w--; ) {
                  if (E === j || (j !== null && E === j.alternate)) {
                    ce = E;
                    break t;
                  }
                  ((E = ce(E)), (j = ce(j)));
                }
                ce = null;
              }
            else ce = null;
            (C !== null && v0(k, z, C, ce, !1), I !== null && qe !== null && v0(k, qe, I, ce, !0));
          }
        }
        e: {
          if (
            ((z = N ? wi(N) : window),
            (C = z.nodeName && z.nodeName.toLowerCase()),
            C === 'select' || (C === 'input' && z.type === 'file'))
          )
            var Ne = Bf;
          else if (Of(z))
            if (Lf) Ne = wp;
            else {
              Ne = Ep;
              var ee = Tp;
            }
          else
            ((C = z.nodeName),
              !C || C.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? N && So(N.elementType) && (Ne = Bf)
                : (Ne = Mp));
          if (Ne && (Ne = Ne(e, N))) {
            Df(k, Ne, a, B);
            break e;
          }
          (ee && ee(e, z, N),
            e === 'focusout' &&
              N &&
              z.type === 'number' &&
              N.memoizedProps.value != null &&
              bo(z, 'number', z.value));
        }
        switch (((ee = N ? wi(N) : window), e)) {
          case 'focusin':
            (Of(ee) || ee.contentEditable === 'true') && ((kl = ee), (Bo = N), ($i = null));
            break;
          case 'focusout':
            $i = Bo = kl = null;
            break;
          case 'mousedown':
            Lo = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Lo = !1), Yf(k, a, B));
            break;
          case 'selectionchange':
            if (zp) break;
          case 'keydown':
          case 'keyup':
            Yf(k, a, B);
        }
        var de;
        if (Co)
          e: {
            switch (e) {
              case 'compositionstart':
                var _e = 'onCompositionStart';
                break e;
              case 'compositionend':
                _e = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                _e = 'onCompositionUpdate';
                break e;
            }
            _e = void 0;
          }
        else
          Hl
            ? Cf(e, a) && (_e = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (_e = 'onCompositionStart');
        (_e &&
          (wf &&
            a.locale !== 'ko' &&
            (Hl || _e !== 'onCompositionStart'
              ? _e === 'onCompositionEnd' && Hl && (de = jf())
              : ((hn = B), (Eo = 'value' in hn ? hn.value : hn.textContent), (Hl = !0))),
          (ee = Bs(N, _e)),
          0 < ee.length &&
            ((_e = new Ef(_e, e, null, a, B)),
            k.push({ event: _e, listeners: ee }),
            de ? (_e.data = de) : ((de = Rf(a)), de !== null && (_e.data = de)))),
          (de = bp ? Sp(e, a) : xp(e, a)) &&
            ((_e = Bs(N, 'onBeforeInput')),
            0 < _e.length &&
              ((ee = new Ef('onBeforeInput', 'beforeinput', null, a, B)),
              k.push({ event: ee, listeners: _e }),
              (ee.data = de))),
          my(k, e, N, a, B));
      }
      y0(k, t);
    });
  }
  function oc(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function Bs(e, t) {
    for (var a = t + 'Capture', n = []; e !== null; ) {
      var i = e,
        o = i.stateNode;
      if (
        ((i = i.tag),
        (i !== 5 && i !== 26 && i !== 27) ||
          o === null ||
          ((i = Ni(e, a)),
          i != null && n.unshift(oc(e, i, o)),
          (i = Ni(e, t)),
          i != null && n.push(oc(e, i, o))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function gy(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function v0(e, t, a, n, i) {
    for (var o = t._reactName, h = []; a !== null && a !== n; ) {
      var v = a,
        S = v.alternate,
        N = v.stateNode;
      if (((v = v.tag), S !== null && S === n)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        N === null ||
        ((S = N),
        i
          ? ((N = Ni(a, o)), N != null && h.unshift(oc(a, N, S)))
          : i || ((N = Ni(a, o)), N != null && h.push(oc(a, N, S)))),
        (a = a.return));
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var vy = /\r\n?/g,
    _y = /\u0000|\uFFFD/g;
  function _0(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        vy,
        `
`
      )
      .replace(_y, '');
  }
  function b0(e, t) {
    return ((t = _0(t)), _0(e) === t);
  }
  function Ue(e, t, a, n, i, o) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || Bl(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && Bl(e, '' + n);
        break;
      case 'className':
        kc(e, 'class', n);
        break;
      case 'tabIndex':
        kc(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        kc(e, a, n);
        break;
      case 'style':
        bf(e, n, o);
        break;
      case 'data':
        if (t !== 'object') {
          kc(e, 'data', n);
          break;
        }
      case 'src':
      case 'href':
        if (n === '' && (t !== 'a' || a !== 'href')) {
          e.removeAttribute(a);
          break;
        }
        if (n == null || typeof n == 'function' || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = qc('' + n)), e.setAttribute(a, n));
        break;
      case 'action':
      case 'formAction':
        if (typeof n == 'function') {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == 'function' &&
            (a === 'formAction'
              ? (t !== 'input' && Ue(e, t, 'name', i.name, i, null),
                Ue(e, t, 'formEncType', i.formEncType, i, null),
                Ue(e, t, 'formMethod', i.formMethod, i, null),
                Ue(e, t, 'formTarget', i.formTarget, i, null))
              : (Ue(e, t, 'encType', i.encType, i, null),
                Ue(e, t, 'method', i.method, i, null),
                Ue(e, t, 'target', i.target, i, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = qc('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = Ga);
        break;
      case 'onScroll':
        n != null && ge('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && ge('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(r(61));
          if (((a = n.__html), a != null)) {
            if (i.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'multiple':
        e.multiple = n && typeof n != 'function' && typeof n != 'symbol';
        break;
      case 'muted':
        e.muted = n && typeof n != 'function' && typeof n != 'symbol';
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
          e.removeAttribute('xlink:href');
          break;
        }
        ((a = qc('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
          ? e.setAttribute(a, '' + n)
          : e.removeAttribute(a);
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
          ? e.setAttribute(a, '')
          : e.removeAttribute(a);
        break;
      case 'capture':
      case 'download':
        n === !0
          ? e.setAttribute(a, '')
          : n !== !1 && n != null && typeof n != 'function' && typeof n != 'symbol'
            ? e.setAttribute(a, n)
            : e.removeAttribute(a);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        n != null && typeof n != 'function' && typeof n != 'symbol' && !isNaN(n) && 1 <= n
          ? e.setAttribute(a, n)
          : e.removeAttribute(a);
        break;
      case 'rowSpan':
      case 'start':
        n == null || typeof n == 'function' || typeof n == 'symbol' || isNaN(n)
          ? e.removeAttribute(a)
          : e.setAttribute(a, n);
        break;
      case 'popover':
        (ge('beforetoggle', e), ge('toggle', e), Hc(e, 'popover', n));
        break;
      case 'xlinkActuate':
        Va(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        Va(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        Va(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        Va(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        Va(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        Va(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        Va(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        Va(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        Va(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Hc(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = K1.get(a) || a), Hc(e, a, n));
    }
  }
  function su(e, t, a, n, i, o) {
    switch (a) {
      case 'style':
        bf(e, n, o);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(r(61));
          if (((a = n.__html), a != null)) {
            if (i.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? Bl(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && Bl(e, '' + n);
        break;
      case 'onScroll':
        n != null && ge('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && ge('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = Ga);
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
        if (!ff.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((i = a.endsWith('Capture')),
              (t = a.slice(2, i ? a.length - 7 : void 0)),
              (o = e[Et] || null),
              (o = o != null ? o[a] : null),
              typeof o == 'function' && e.removeEventListener(t, o, i),
              typeof n == 'function')
            ) {
              (typeof o != 'function' &&
                o !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, n, i));
              break e;
            }
            a in e ? (e[a] = n) : n === !0 ? e.setAttribute(a, '') : Hc(e, a, n);
          }
    }
  }
  function zt(e, t, a) {
    switch (t) {
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
        (ge('error', e), ge('load', e));
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
                  throw Error(r(137, t));
                default:
                  Ue(e, t, o, h, a, null);
              }
          }
        (i && Ue(e, t, 'srcSet', a.srcSet, a, null), n && Ue(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        ge('invalid', e);
        var v = (o = h = i = null),
          S = null,
          N = null;
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
                  N = B;
                  break;
                case 'value':
                  o = B;
                  break;
                case 'defaultValue':
                  v = B;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (B != null) throw Error(r(137, t));
                  break;
                default:
                  Ue(e, t, n, B, a, null);
              }
          }
        yf(e, o, v, S, N, h, i, !1);
        return;
      case 'select':
        (ge('invalid', e), (n = h = o = null));
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
                Ue(e, t, i, v, a, null);
            }
        ((t = o),
          (a = h),
          (e.multiple = !!n),
          t != null ? Dl(e, !!n, t, !1) : a != null && Dl(e, !!n, a, !0));
        return;
      case 'textarea':
        (ge('invalid', e), (o = i = n = null));
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
                Ue(e, t, h, v, a, null);
            }
        vf(e, n, i, o);
        return;
      case 'option':
        for (S in a)
          if (a.hasOwnProperty(S) && ((n = a[S]), n != null))
            switch (S) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                Ue(e, t, S, n, a, null);
            }
        return;
      case 'dialog':
        (ge('beforetoggle', e), ge('toggle', e), ge('cancel', e), ge('close', e));
        break;
      case 'iframe':
      case 'object':
        ge('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < sc.length; n++) ge(sc[n], e);
        break;
      case 'image':
        (ge('error', e), ge('load', e));
        break;
      case 'details':
        ge('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (ge('error', e), ge('load', e));
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
        for (N in a)
          if (a.hasOwnProperty(N) && ((n = a[N]), n != null))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(r(137, t));
              default:
                Ue(e, t, N, n, a, null);
            }
        return;
      default:
        if (So(t)) {
          for (B in a)
            a.hasOwnProperty(B) && ((n = a[B]), n !== void 0 && su(e, t, B, n, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((n = a[v]), n != null && Ue(e, t, v, n, a, null));
  }
  function by(e, t, a, n) {
    switch (t) {
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
          N = null,
          B = null;
        for (C in a) {
          var k = a[C];
          if (a.hasOwnProperty(C) && k != null)
            switch (C) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                S = k;
              default:
                n.hasOwnProperty(C) || Ue(e, t, C, null, n, k);
            }
        }
        for (var z in n) {
          var C = n[z];
          if (((k = a[z]), n.hasOwnProperty(z) && (C != null || k != null)))
            switch (z) {
              case 'type':
                o = C;
                break;
              case 'name':
                i = C;
                break;
              case 'checked':
                N = C;
                break;
              case 'defaultChecked':
                B = C;
                break;
              case 'value':
                h = C;
                break;
              case 'defaultValue':
                v = C;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (C != null) throw Error(r(137, t));
                break;
              default:
                C !== k && Ue(e, t, z, C, n, k);
            }
        }
        _o(e, h, v, S, N, B, o, i);
        return;
      case 'select':
        C = h = v = z = null;
        for (o in a)
          if (((S = a[o]), a.hasOwnProperty(o) && S != null))
            switch (o) {
              case 'value':
                break;
              case 'multiple':
                C = S;
              default:
                n.hasOwnProperty(o) || Ue(e, t, o, null, n, S);
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
                o !== S && Ue(e, t, i, o, n, S);
            }
        ((t = v),
          (a = h),
          (n = C),
          z != null
            ? Dl(e, !!a, z, !1)
            : !!n != !!a && (t != null ? Dl(e, !!a, t, !0) : Dl(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        C = z = null;
        for (v in a)
          if (((i = a[v]), a.hasOwnProperty(v) && i != null && !n.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Ue(e, t, v, null, n, i);
            }
        for (h in n)
          if (((i = n[h]), (o = a[h]), n.hasOwnProperty(h) && (i != null || o != null)))
            switch (h) {
              case 'value':
                z = i;
                break;
              case 'defaultValue':
                C = i;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (i != null) throw Error(r(91));
                break;
              default:
                i !== o && Ue(e, t, h, i, n, o);
            }
        gf(e, z, C);
        return;
      case 'option':
        for (var I in a)
          if (((z = a[I]), a.hasOwnProperty(I) && z != null && !n.hasOwnProperty(I)))
            switch (I) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                Ue(e, t, I, null, n, z);
            }
        for (S in n)
          if (((z = n[S]), (C = a[S]), n.hasOwnProperty(S) && z !== C && (z != null || C != null)))
            switch (S) {
              case 'selected':
                e.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                Ue(e, t, S, z, n, C);
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
        for (var ce in a)
          ((z = a[ce]),
            a.hasOwnProperty(ce) && z != null && !n.hasOwnProperty(ce) && Ue(e, t, ce, null, n, z));
        for (N in n)
          if (((z = n[N]), (C = a[N]), n.hasOwnProperty(N) && z !== C && (z != null || C != null)))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(r(137, t));
                break;
              default:
                Ue(e, t, N, z, n, C);
            }
        return;
      default:
        if (So(t)) {
          for (var qe in a)
            ((z = a[qe]),
              a.hasOwnProperty(qe) &&
                z !== void 0 &&
                !n.hasOwnProperty(qe) &&
                su(e, t, qe, void 0, n, z));
          for (B in n)
            ((z = n[B]),
              (C = a[B]),
              !n.hasOwnProperty(B) ||
                z === C ||
                (z === void 0 && C === void 0) ||
                su(e, t, B, z, n, C));
          return;
        }
    }
    for (var E in a)
      ((z = a[E]),
        a.hasOwnProperty(E) && z != null && !n.hasOwnProperty(E) && Ue(e, t, E, null, n, z));
    for (k in n)
      ((z = n[k]),
        (C = a[k]),
        !n.hasOwnProperty(k) || z === C || (z == null && C == null) || Ue(e, t, k, z, n, C));
  }
  function S0(e) {
    switch (e) {
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
  function Sy() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var i = a[n],
          o = i.transferSize,
          h = i.initiatorType,
          v = i.duration;
        if (o && v && S0(h)) {
          for (h = 0, v = i.responseEnd, n += 1; n < a.length; n++) {
            var S = a[n],
              N = S.startTime;
            if (N > v) break;
            var B = S.transferSize,
              k = S.initiatorType;
            B && S0(k) && ((S = S.responseEnd), (h += B * (S < v ? 1 : (v - N) / (S - N))));
          }
          if ((--n, (t += (8 * (o + h)) / (i.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var ou = null,
    ru = null;
  function Ls(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function x0(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function j0(e, t) {
    if (e === 0)
      switch (t) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === 'foreignObject' ? 0 : e;
  }
  function uu(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      typeof t.children == 'bigint' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var fu = null;
  function xy() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === fu ? !1 : ((fu = e), !0)) : ((fu = null), !1);
  }
  var A0 = typeof setTimeout == 'function' ? setTimeout : void 0,
    jy = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    T0 = typeof Promise == 'function' ? Promise : void 0,
    Ay =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof T0 < 'u'
          ? function (e) {
              return T0.resolve(null).then(e).catch(Ty);
            }
          : A0;
  function Ty(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Cn(e) {
    return e === 'head';
  }
  function E0(e, t) {
    var a = t,
      n = 0;
    do {
      var i = a.nextSibling;
      if ((e.removeChild(a), i && i.nodeType === 8))
        if (((a = i.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (e.removeChild(i), di(t));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') rc(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), rc(a));
          for (var o = a.firstChild; o; ) {
            var h = o.nextSibling,
              v = o.nodeName;
            (o[Mi] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && o.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(o),
              (o = h));
          }
        } else a === 'body' && rc(e.ownerDocument.body);
      a = i;
    } while (a);
    di(t);
  }
  function M0(e, t) {
    var a = e;
    e = 0;
    do {
      var n = a.nextSibling;
      if (
        (a.nodeType === 1
          ? t
            ? ((a._stashedDisplay = a.style.display), (a.style.display = 'none'))
            : ((a.style.display = a._stashedDisplay || ''),
              a.getAttribute('style') === '' && a.removeAttribute('style'))
          : a.nodeType === 3 &&
            (t
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ''))
              : (a.nodeValue = a._stashedText || '')),
        n && n.nodeType === 8)
      )
        if (((a = n.data), a === '/$')) {
          if (e === 0) break;
          e--;
        } else (a !== '$' && a !== '$?' && a !== '$~' && a !== '$!') || e++;
      a = n;
    } while (a);
  }
  function du(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (du(a), go(a));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (a.rel.toLowerCase() === 'stylesheet') continue;
      }
      e.removeChild(a);
    }
  }
  function Ey(e, t, a, n) {
    for (; e.nodeType === 1; ) {
      var i = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Mi])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((o = e.getAttribute('rel')),
                o === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                o !== i.rel ||
                e.getAttribute('href') !== (i.href == null || i.href === '' ? null : i.href) ||
                e.getAttribute('crossorigin') !== (i.crossOrigin == null ? null : i.crossOrigin) ||
                e.getAttribute('title') !== (i.title == null ? null : i.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((o = e.getAttribute('src')),
                (o !== (i.src == null ? null : i.src) ||
                  e.getAttribute('type') !== (i.type == null ? null : i.type) ||
                  e.getAttribute('crossorigin') !==
                    (i.crossOrigin == null ? null : i.crossOrigin)) &&
                  o &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var o = i.name == null ? null : '' + i.name;
        if (i.type === 'hidden' && e.getAttribute('name') === o) return e;
      } else return e;
      if (((e = da(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function My(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = da(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function w0(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = da(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function mu(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function hu(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function wy(e, t) {
    var a = e.ownerDocument;
    if (e.data === '$~') e._reactRetry = t;
    else if (e.data !== '$?' || a.readyState !== 'loading') t();
    else {
      var n = function () {
        (t(), a.removeEventListener('DOMContentLoaded', n));
      };
      (a.addEventListener('DOMContentLoaded', n), (e._reactRetry = n));
    }
  }
  function da(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === '$' ||
            t === '$!' ||
            t === '$?' ||
            t === '$~' ||
            t === '&' ||
            t === 'F!' ||
            t === 'F')
        )
          break;
        if (t === '/$' || t === '/&') return null;
      }
    }
    return e;
  }
  var pu = null;
  function N0(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '/$' || a === '/&') {
          if (t === 0) return da(e.nextSibling);
          t--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function z0(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '$' || a === '$!' || a === '$?' || a === '$~' || a === '&') {
          if (t === 0) return e;
          t--;
        } else (a !== '/$' && a !== '/&') || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function C0(e, t, a) {
    switch (((t = Ls(a)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(r(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(r(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function rc(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    go(e);
  }
  var ma = new Map(),
    R0 = new Set();
  function $s(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var cn = X.d;
  X.d = { f: Ny, r: zy, D: Cy, C: Ry, L: Oy, m: Dy, X: Ly, S: By, M: $y };
  function Ny() {
    var e = cn.f(),
      t = ws();
    return e || t;
  }
  function zy(e) {
    var t = Cl(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Wd(t) : cn.r(e);
  }
  var ri = typeof document > 'u' ? null : document;
  function O0(e, t, a) {
    var n = ri;
    if (n && typeof t == 'string' && t) {
      var i = ia(t);
      ((i = 'link[rel="' + e + '"][href="' + i + '"]'),
        typeof a == 'string' && (i += '[crossorigin="' + a + '"]'),
        R0.has(i) ||
          (R0.add(i),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(i) === null &&
            ((t = n.createElement('link')), zt(t, 'link', e), St(t), n.head.appendChild(t))));
    }
  }
  function Cy(e) {
    (cn.D(e), O0('dns-prefetch', e, null));
  }
  function Ry(e, t) {
    (cn.C(e, t), O0('preconnect', e, t));
  }
  function Oy(e, t, a) {
    cn.L(e, t, a);
    var n = ri;
    if (n && e && t) {
      var i = 'link[rel="preload"][as="' + ia(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((i += '[imagesrcset="' + ia(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (i += '[imagesizes="' + ia(a.imageSizes) + '"]'))
        : (i += '[href="' + ia(e) + '"]');
      var o = i;
      switch (t) {
        case 'style':
          o = ui(e);
          break;
        case 'script':
          o = fi(e);
      }
      ma.has(o) ||
        ((e = b(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        ma.set(o, e),
        n.querySelector(i) !== null ||
          (t === 'style' && n.querySelector(uc(o))) ||
          (t === 'script' && n.querySelector(fc(o))) ||
          ((t = n.createElement('link')), zt(t, 'link', e), St(t), n.head.appendChild(t)));
    }
  }
  function Dy(e, t) {
    cn.m(e, t);
    var a = ri;
    if (a && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        i = 'link[rel="modulepreload"][as="' + ia(n) + '"][href="' + ia(e) + '"]',
        o = i;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          o = fi(e);
      }
      if (
        !ma.has(o) &&
        ((e = b({ rel: 'modulepreload', href: e }, t)), ma.set(o, e), a.querySelector(i) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(fc(o))) return;
        }
        ((n = a.createElement('link')), zt(n, 'link', e), St(n), a.head.appendChild(n));
      }
    }
  }
  function By(e, t, a) {
    cn.S(e, t, a);
    var n = ri;
    if (n && e) {
      var i = Rl(n).hoistableStyles,
        o = ui(e);
      t = t || 'default';
      var h = i.get(o);
      if (!h) {
        var v = { loading: 0, preload: null };
        if ((h = n.querySelector(uc(o)))) v.loading = 5;
        else {
          ((e = b({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = ma.get(o)) && yu(e, a));
          var S = (h = n.createElement('link'));
          (St(S),
            zt(S, 'link', e),
            (S._p = new Promise(function (N, B) {
              ((S.onload = N), (S.onerror = B));
            })),
            S.addEventListener('load', function () {
              v.loading |= 1;
            }),
            S.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            Hs(h, t, n));
        }
        ((h = { type: 'stylesheet', instance: h, count: 1, state: v }), i.set(o, h));
      }
    }
  }
  function Ly(e, t) {
    cn.X(e, t);
    var a = ri;
    if (a && e) {
      var n = Rl(a).hoistableScripts,
        i = fi(e),
        o = n.get(i);
      o ||
        ((o = a.querySelector(fc(i))),
        o ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = ma.get(i)) && gu(e, t),
          (o = a.createElement('script')),
          St(o),
          zt(o, 'link', e),
          a.head.appendChild(o)),
        (o = { type: 'script', instance: o, count: 1, state: null }),
        n.set(i, o));
    }
  }
  function $y(e, t) {
    cn.M(e, t);
    var a = ri;
    if (a && e) {
      var n = Rl(a).hoistableScripts,
        i = fi(e),
        o = n.get(i);
      o ||
        ((o = a.querySelector(fc(i))),
        o ||
          ((e = b({ src: e, async: !0, type: 'module' }, t)),
          (t = ma.get(i)) && gu(e, t),
          (o = a.createElement('script')),
          St(o),
          zt(o, 'link', e),
          a.head.appendChild(o)),
        (o = { type: 'script', instance: o, count: 1, state: null }),
        n.set(i, o));
    }
  }
  function D0(e, t, a, n) {
    var i = (i = fe.current) ? $s(i) : null;
    if (!i) throw Error(r(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = ui(a.href)),
            (a = Rl(i).hoistableStyles),
            (n = a.get(t)),
            n || ((n = { type: 'style', instance: null, count: 0, state: null }), a.set(t, n)),
            n)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          a.rel === 'stylesheet' &&
          typeof a.href == 'string' &&
          typeof a.precedence == 'string'
        ) {
          e = ui(a.href);
          var o = Rl(i).hoistableStyles,
            h = o.get(e);
          if (
            (h ||
              ((i = i.ownerDocument || i),
              (h = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              o.set(e, h),
              (o = i.querySelector(uc(e))) && !o._p && ((h.instance = o), (h.state.loading = 5)),
              ma.has(e) ||
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
                ma.set(e, a),
                o || Hy(i, e, a, h.state))),
            t && n === null)
          )
            throw Error(r(528, ''));
          return h;
        }
        if (t && n !== null) throw Error(r(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = fi(a)),
              (a = Rl(i).hoistableScripts),
              (n = a.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function ui(e) {
    return 'href="' + ia(e) + '"';
  }
  function uc(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function B0(e) {
    return b({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function Hy(e, t, a, n) {
    e.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (n.loading = 1)
      : ((t = e.createElement('link')),
        (n.preload = t),
        t.addEventListener('load', function () {
          return (n.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (n.loading |= 2);
        }),
        zt(t, 'link', a),
        St(t),
        e.head.appendChild(t));
  }
  function fi(e) {
    return '[src="' + ia(e) + '"]';
  }
  function fc(e) {
    return 'script[async]' + e;
  }
  function L0(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + ia(a.href) + '"]');
          if (n) return ((t.instance = n), St(n), n);
          var i = b({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            St(n),
            zt(n, 'style', i),
            Hs(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          i = ui(a.href);
          var o = e.querySelector(uc(i));
          if (o) return ((t.state.loading |= 4), (t.instance = o), St(o), o);
          ((n = B0(a)),
            (i = ma.get(i)) && yu(n, i),
            (o = (e.ownerDocument || e).createElement('link')),
            St(o));
          var h = o;
          return (
            (h._p = new Promise(function (v, S) {
              ((h.onload = v), (h.onerror = S));
            })),
            zt(o, 'link', n),
            (t.state.loading |= 4),
            Hs(o, a.precedence, e),
            (t.instance = o)
          );
        case 'script':
          return (
            (o = fi(a.src)),
            (i = e.querySelector(fc(o)))
              ? ((t.instance = i), St(i), i)
              : ((n = a),
                (i = ma.get(o)) && ((n = b({}, a)), gu(n, i)),
                (e = e.ownerDocument || e),
                (i = e.createElement('script')),
                St(i),
                zt(i, 'link', n),
                e.head.appendChild(i),
                (t.instance = i))
          );
        case 'void':
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((n = t.instance), (t.state.loading |= 4), Hs(n, a.precedence, e));
    return t.instance;
  }
  function Hs(e, t, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        i = n.length ? n[n.length - 1] : null,
        o = i,
        h = 0;
      h < n.length;
      h++
    ) {
      var v = n[h];
      if (v.dataset.precedence === t) o = v;
      else if (o !== i) break;
    }
    o
      ? o.parentNode.insertBefore(e, o.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function yu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function gu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var ks = null;
  function $0(e, t, a) {
    if (ks === null) {
      var n = new Map(),
        i = (ks = new Map());
      i.set(a, n);
    } else ((i = ks), (n = i.get(a)), n || ((n = new Map()), i.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), i = 0; i < a.length; i++) {
      var o = a[i];
      if (
        !(o[Mi] || o[at] || (e === 'link' && o.getAttribute('rel') === 'stylesheet')) &&
        o.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var h = o.getAttribute(t) || '';
        h = e + h;
        var v = n.get(h);
        v ? v.push(o) : n.set(h, [o]);
      }
    }
    return n;
  }
  function H0(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function ky(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (typeof t.precedence != 'string' || typeof t.href != 'string' || t.href === '') break;
        return !0;
      case 'link':
        if (
          typeof t.rel != 'string' ||
          typeof t.href != 'string' ||
          t.href === '' ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case 'stylesheet':
            return ((e = t.disabled), typeof t.precedence == 'string' && e == null);
          default:
            return !0;
        }
      case 'script':
        if (
          t.async &&
          typeof t.async != 'function' &&
          typeof t.async != 'symbol' &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function k0(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function Uy(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var i = ui(n.href),
          o = t.querySelector(uc(i));
        if (o) {
          ((t = o._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Us.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = o),
            St(o));
          return;
        }
        ((o = t.ownerDocument || t),
          (n = B0(n)),
          (i = ma.get(i)) && yu(n, i),
          (o = o.createElement('link')),
          St(o));
        var h = o;
        ((h._p = new Promise(function (v, S) {
          ((h.onload = v), (h.onerror = S));
        })),
          zt(o, 'link', n),
          (a.instance = o));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = Us.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var vu = 0;
  function qy(e, t) {
    return (
      e.stylesheets && e.count === 0 && Vs(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Vs(e, e.stylesheets), e.unsuspend)) {
                var o = e.unsuspend;
                ((e.unsuspend = null), o());
              }
            }, 6e4 + t);
            0 < e.imgBytes && vu === 0 && (vu = 62500 * Sy());
            var i = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Vs(e, e.stylesheets), e.unsuspend))
                ) {
                  var o = e.unsuspend;
                  ((e.unsuspend = null), o());
                }
              },
              (e.imgBytes > vu ? 50 : 800) + t
            );
            return (
              (e.unsuspend = a),
              function () {
                ((e.unsuspend = null), clearTimeout(n), clearTimeout(i));
              }
            );
          }
        : null
    );
  }
  function Us() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Vs(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var qs = null;
  function Vs(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (qs = new Map()), t.forEach(Vy, e), (qs = null), Us.call(e)));
  }
  function Vy(e, t) {
    if (!(t.state.loading & 4)) {
      var a = qs.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), qs.set(e, a));
        for (
          var i = e.querySelectorAll('link[data-precedence],style[data-precedence]'), o = 0;
          o < i.length;
          o++
        ) {
          var h = i[o];
          (h.nodeName === 'LINK' || h.getAttribute('media') !== 'not all') &&
            (a.set(h.dataset.precedence, h), (n = h));
        }
        n && a.set(null, n);
      }
      ((i = t.instance),
        (h = i.getAttribute('data-precedence')),
        (o = a.get(h) || n),
        o === n && a.set(null, i),
        a.set(h, i),
        this.count++,
        (n = Us.bind(this)),
        i.addEventListener('load', n),
        i.addEventListener('error', n),
        o
          ? o.parentNode.insertBefore(i, o.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(i, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var dc = {
    $$typeof: se,
    Provider: null,
    Consumer: null,
    _currentValue: ne,
    _currentValue2: ne,
    _threadCount: 0,
  };
  function Gy(e, t, a, n, i, o, h, v, S) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Pn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Pn(0)),
      (this.hiddenUpdates = Pn(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = i),
      (this.onCaughtError = o),
      (this.onRecoverableError = h),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = S),
      (this.incompleteTransitions = new Map()));
  }
  function U0(e, t, a, n, i, o, h, v, S, N, B, k) {
    return (
      (e = new Gy(e, t, a, h, S, N, B, k, v)),
      (t = 1),
      o === !0 && (t |= 24),
      (o = Qt(3, null, null, t)),
      (e.current = o),
      (o.stateNode = e),
      (t = Fo()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (o.memoizedState = { element: n, isDehydrated: a, cache: t }),
      tr(o),
      e
    );
  }
  function q0(e) {
    return e ? ((e = Vl), e) : Vl;
  }
  function V0(e, t, a, n, i, o) {
    ((i = q0(i)),
      n.context === null ? (n.context = i) : (n.pendingContext = i),
      (n = bn(t)),
      (n.payload = { element: a }),
      (o = o === void 0 ? null : o),
      o !== null && (n.callback = o),
      (a = Sn(e, n, t)),
      a !== null && (Xt(a, e, t), Yi(a, e, t)));
  }
  function G0(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function _u(e, t) {
    (G0(e, t), (e = e.alternate) && G0(e, t));
  }
  function Y0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ll(e, 67108864);
      (t !== null && Xt(t, e, 67108864), _u(e, 67108864));
    }
  }
  function Z0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Pt();
      t = $t(t);
      var a = ll(e, t);
      (a !== null && Xt(a, e, t), _u(e, t));
    }
  }
  var Gs = !0;
  function Yy(e, t, a, n) {
    var i = O.T;
    O.T = null;
    var o = X.p;
    try {
      ((X.p = 2), bu(e, t, a, n));
    } finally {
      ((X.p = o), (O.T = i));
    }
  }
  function Zy(e, t, a, n) {
    var i = O.T;
    O.T = null;
    var o = X.p;
    try {
      ((X.p = 8), bu(e, t, a, n));
    } finally {
      ((X.p = o), (O.T = i));
    }
  }
  function bu(e, t, a, n) {
    if (Gs) {
      var i = Su(n);
      if (i === null) (cu(e, t, n, Ys, a), K0(e, n));
      else if (Ky(i, e, t, a, n)) n.stopPropagation();
      else if ((K0(e, n), t & 4 && -1 < Xy.indexOf(e))) {
        for (; i !== null; ) {
          var o = Cl(i);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (((o = o.stateNode), o.current.memoizedState.isDehydrated)) {
                  var h = na(o.pendingLanes);
                  if (h !== 0) {
                    var v = o;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; h; ) {
                      var S = 1 << (31 - gt(h));
                      ((v.entanglements[1] |= S), (h &= ~S));
                    }
                    (Oa(o), (Ce & 6) === 0 && ((Es = De() + 500), cc(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = ll(o, 2)), v !== null && Xt(v, o, 2), ws(), _u(o, 2));
            }
          if (((o = Su(n)), o === null && cu(e, t, n, Ys, a), o === i)) break;
          i = o;
        }
        i !== null && n.stopPropagation();
      } else cu(e, t, n, null, a);
    }
  }
  function Su(e) {
    return ((e = jo(e)), xu(e));
  }
  var Ys = null;
  function xu(e) {
    if (((Ys = null), (e = zl(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = m(t)), e !== null)) return e;
          e = null;
        } else if (a === 31) {
          if (((e = p(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Ys = e), null);
  }
  function X0(e) {
    switch (e) {
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
        switch (aa()) {
          case La:
            return 2;
          case $a:
            return 8;
          case mn:
          case Ti:
            return 32;
          case Kn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ju = !1,
    Rn = null,
    On = null,
    Dn = null,
    mc = new Map(),
    hc = new Map(),
    Bn = [],
    Xy =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function K0(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Rn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        On = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Dn = null;
        break;
      case 'pointerover':
      case 'pointerout':
        mc.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        hc.delete(t.pointerId);
    }
  }
  function pc(e, t, a, n, i, o) {
    return e === null || e.nativeEvent !== o
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: o,
          targetContainers: [i],
        }),
        t !== null && ((t = Cl(t)), t !== null && Y0(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e);
  }
  function Ky(e, t, a, n, i) {
    switch (t) {
      case 'focusin':
        return ((Rn = pc(Rn, e, t, a, n, i)), !0);
      case 'dragenter':
        return ((On = pc(On, e, t, a, n, i)), !0);
      case 'mouseover':
        return ((Dn = pc(Dn, e, t, a, n, i)), !0);
      case 'pointerover':
        var o = i.pointerId;
        return (mc.set(o, pc(mc.get(o) || null, e, t, a, n, i)), !0);
      case 'gotpointercapture':
        return ((o = i.pointerId), hc.set(o, pc(hc.get(o) || null, e, t, a, n, i)), !0);
    }
    return !1;
  }
  function Q0(e) {
    var t = zl(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = m(a)), t !== null)) {
            ((e.blockedOn = t),
              Me(e.priority, function () {
                Z0(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = p(a)), t !== null)) {
            ((e.blockedOn = t),
              Me(e.priority, function () {
                Z0(a);
              }));
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Zs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Su(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((xo = n), a.target.dispatchEvent(n), (xo = null));
      } else return ((t = Cl(a)), t !== null && Y0(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function W0(e, t, a) {
    Zs(e) && a.delete(t);
  }
  function Qy() {
    ((ju = !1),
      Rn !== null && Zs(Rn) && (Rn = null),
      On !== null && Zs(On) && (On = null),
      Dn !== null && Zs(Dn) && (Dn = null),
      mc.forEach(W0),
      hc.forEach(W0));
  }
  function Xs(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      ju || ((ju = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, Qy)));
  }
  var Ks = null;
  function J0(e) {
    Ks !== e &&
      ((Ks = e),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        Ks === e && (Ks = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            i = e[t + 2];
          if (typeof n != 'function') {
            if (xu(n || a) === null) continue;
            break;
          }
          var o = Cl(a);
          o !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Sr(o, { pending: !0, data: i, method: a.method, action: n }, n, i));
        }
      }));
  }
  function di(e) {
    function t(S) {
      return Xs(S, e);
    }
    (Rn !== null && Xs(Rn, e),
      On !== null && Xs(On, e),
      Dn !== null && Xs(Dn, e),
      mc.forEach(t),
      hc.forEach(t));
    for (var a = 0; a < Bn.length; a++) {
      var n = Bn[a];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < Bn.length && ((a = Bn[0]), a.blockedOn === null); )
      (Q0(a), a.blockedOn === null && Bn.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var i = a[n],
          o = a[n + 1],
          h = i[Et] || null;
        if (typeof o == 'function') h || J0(a);
        else if (h) {
          var v = null;
          if (o && o.hasAttribute('formAction')) {
            if (((i = o), (h = o[Et] || null))) v = h.formAction;
            else if (xu(i) !== null) continue;
          } else v = h.action;
          (typeof v == 'function' ? (a[n + 1] = v) : (a.splice(n, 3), (n -= 3)), J0(a));
        }
      }
  }
  function F0() {
    function e(o) {
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
    function t() {
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
        navigation.addEventListener('navigate', e),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(a, 100),
        function () {
          ((n = !0),
            navigation.removeEventListener('navigate', e),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            i !== null && (i(), (i = null)));
        }
      );
    }
  }
  function Au(e) {
    this._internalRoot = e;
  }
  ((Qs.prototype.render = Au.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var a = t.current,
        n = Pt();
      V0(a, n, e, t, null, null);
    }),
    (Qs.prototype.unmount = Au.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (V0(e.current, 2, null, e, null, null), ws(), (t[Na] = null));
        }
      }));
  function Qs(e) {
    this._internalRoot = e;
  }
  Qs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Ae();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Bn.length && t !== 0 && t < Bn[a].priority; a++);
      (Bn.splice(a, 0, e), a === 0 && Q0(e));
    }
  };
  var I0 = c.version;
  if (I0 !== '19.2.5') throw Error(r(527, I0, '19.2.5'));
  X.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(r(188))
        : ((e = Object.keys(e).join(',')), Error(r(268, e)));
    return ((e = y(t)), (e = e !== null ? _(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var Wy = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: O,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Ws = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ws.isDisabled && Ws.supportsFiber)
      try {
        ((wa = Ws.inject(Wy)), (yt = Ws));
      } catch {}
  }
  return (
    (gc.createRoot = function (e, t) {
      if (!f(e)) throw Error(r(299));
      var a = !1,
        n = '',
        i = im,
        o = cm,
        h = sm;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
          t.onCaughtError !== void 0 && (o = t.onCaughtError),
          t.onRecoverableError !== void 0 && (h = t.onRecoverableError)),
        (t = U0(e, 1, !1, null, null, a, n, null, i, o, h, F0)),
        (e[Na] = t.current),
        iu(e),
        new Au(t)
      );
    }),
    (gc.hydrateRoot = function (e, t, a) {
      if (!f(e)) throw Error(r(299));
      var n = !1,
        i = '',
        o = im,
        h = cm,
        v = sm,
        S = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (i = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (o = a.onUncaughtError),
          a.onCaughtError !== void 0 && (h = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (S = a.formState)),
        (t = U0(e, 1, !0, t, a ?? null, n, i, S, o, h, v, F0)),
        (t.context = q0(null)),
        (a = t.current),
        (n = Pt()),
        (n = $t(n)),
        (i = bn(n)),
        (i.callback = null),
        Sn(a, i, n),
        (a = n),
        (t.current.lanes = a),
        J(t, a),
        Oa(t),
        (e[Na] = t.current),
        iu(e),
        new Qs(t)
      );
    }),
    (gc.version = '19.2.5'),
    gc
  );
}
var oh;
function og() {
  if (oh) return Eu.exports;
  oh = 1;
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
  return (l(), (Eu.exports = sg()), Eu.exports);
}
var rg = og(),
  q = Pu();
const Js = Py(q);
function ug(l) {
  return 440 * Math.pow(2, (l - 69) / 12);
}
const fg = {
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
function L(l) {
  const c = l.match(/^([A-G]#?b?)(\d)$/);
  if (!c) throw new Error(`Invalid note: ${l}`);
  const s = fg[c[1]];
  if (s === void 0) throw new Error(`Invalid note name: ${c[1]}`);
  const f = 12 + parseInt(c[2], 10) * 12 + s;
  return ug(f);
}
(L('A2'),
  L('B2'),
  L('C3'),
  L('D3'),
  L('E3'),
  L('F3'),
  L('G3'),
  L('A3'),
  L('B3'),
  L('C4'),
  L('D4'),
  L('E4'),
  L('F4'),
  L('G4'),
  L('A4'));
(L('E2'),
  L('F#2'),
  L('G2'),
  L('A2'),
  L('B2'),
  L('C3'),
  L('D3'),
  L('E3'),
  L('F#3'),
  L('G3'),
  L('A3'),
  L('B3'),
  L('C4'),
  L('D4'),
  L('E4'));
const dg = [L('A2'), L('C3'), L('E3')],
  mg = [L('E2'), L('G2'), L('B2')];
(L('D3'), L('F3'), L('A3'));
const hg = [L('G2'), L('B2'), L('D3')],
  pg = [L('C3'), L('E3'), L('G3')],
  yg = [L('B2'), L('D3'), L('F3')];
function ya(l, c, s, r, f, d, m, p, g) {
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
    const M = l.createBiquadFilter();
    ((M.type = 'lowpass'),
      (M.frequency.value = p),
      (M.Q.value = 0.8),
      y.connect(M).connect(_).connect(c));
  } else y.connect(_).connect(c);
  (y.start(f), y.stop(f + d + 0.02), g == null || g.push(y));
}
function Oc(l, c) {
  const s = Math.max(1, Math.floor(l.sampleRate * c)),
    r = l.createBuffer(1, s, l.sampleRate),
    f = r.getChannelData(0);
  let d = 74565;
  for (let m = 0; m < s; m++)
    ((d = (d * 1664525 + 1013904223) & 4294967295), (f[m] = d / 2147483648 - 1));
  return r;
}
function Cc(l, c, s, r, f) {
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
  p.buffer = Oc(l, 0.04);
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
function gg(l, c, s, r, f, d) {
  const m = l.createBufferSource();
  m.buffer = Oc(l, f + 0.01);
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
const vg = 100,
  xl = 60 / vg,
  Nc = xl * 4,
  Wh = 8,
  _g = Nc * Wh,
  bg = 2,
  Sg = 100,
  xg = [L('A2'), L('A2'), L('G2'), L('G2'), L('C3'), L('C3'), L('E2'), L('E2')],
  rh = [L('A3'), L('C4'), L('E4'), L('A4'), L('G4'), L('E4'), L('C4'), L('A3')],
  uh = [
    [L('A3'), L('C4'), L('E4')],
    [L('G3'), L('B3'), L('D4')],
    [L('C3'), L('E3'), L('G3')],
    [L('E3'), L('G3'), L('B3')],
  ];
function jg(l, c, s, r) {
  for (let f = 0; f < Wh; f++) {
    const d = s + f * Nc,
      m = xg[f];
    (ya(l, c, 'sawtooth', m, d, xl * 1.8, 0.22, 300, r),
      ya(l, c, 'sawtooth', m, d + xl * 2, xl * 1.8, 0.22, 300, r),
      Cc(l, c, d, 0.35, r),
      Cc(l, c, d + xl * 2, 0.28, r));
    for (let p = 0; p < 8; p++) {
      const g = (f * 8 + p) % rh.length,
        y = d + p * xl * 0.5;
      ya(l, c, 'square', rh[g], y, xl * 0.4, 0.07, 2400, r);
    }
  }
  for (let f = 0; f < uh.length; f++) {
    const d = uh[f],
      m = s + f * Nc * 2,
      p = Nc * 2;
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
function Ag(l, c) {
  let s = 0,
    r = null;
  const f = [];
  function d() {
    const p = l.currentTime + bg * Nc;
    for (; s < p; ) (jg(l, c, s, f), (s += _g));
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
const Tg = 100,
  on = 60 / Tg,
  ef = on * 4,
  Jh = 8,
  Vn = ef * Jh,
  Eg = 2,
  Mg = 100,
  fh = [L('E5'), L('D5'), L('B4'), L('G4'), L('F#4'), L('E4'), L('D4'), L('B3')];
function dh(l, c, s, r, f) {
  const d = l.createBufferSource();
  d.buffer = Oc(l, 0.2);
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
    ya(l, c, 'sine', 120, s, 0.12, r * 0.5, 300, f));
}
function wg(l, c, s, r) {
  {
    const d = l.createOscillator(),
      m = l.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(L('E1'), s));
    const p = 0.35;
    (m.gain.setValueAtTime(1e-4, s),
      m.gain.linearRampToValueAtTime(p, s + 0.3),
      m.gain.setValueAtTime(p, s + Vn - 0.3),
      m.gain.linearRampToValueAtTime(1e-4, s + Vn));
    const g = l.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 120),
      d.connect(g).connect(m).connect(c),
      d.start(s),
      d.stop(s + Vn + 0.05),
      r.push(d));
  }
  for (let d = 0; d < Jh; d++) {
    const m = s + d * ef;
    for (let p = 0; p < 4; p++) {
      const g = m + p * on;
      (ya(l, c, 'sawtooth', L('E2'), g, on * 0.9, 0.22, 400, r),
        ya(l, c, 'sawtooth', L('B2'), g, on * 0.8, 0.1, 600, r));
    }
    (Cc(l, c, m, 0.5, r),
      Cc(l, c, m + on * 2, 0.45, r),
      dh(l, c, m + on, 0.4, r),
      dh(l, c, m + on * 3, 0.38, r));
  }
  const f = [...yg, L('C4')];
  for (const d of f) {
    const m = l.createOscillator(),
      p = l.createGain();
    ((m.type = 'sawtooth'), m.frequency.setValueAtTime(d, s));
    const g = 0.07;
    (p.gain.setValueAtTime(1e-4, s),
      p.gain.linearRampToValueAtTime(g, s + 0.8),
      p.gain.setValueAtTime(g, s + Vn - 0.8),
      p.gain.exponentialRampToValueAtTime(1e-4, s + Vn));
    const y = l.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 900),
      m.connect(y).connect(p).connect(c),
      m.start(s),
      m.stop(s + Vn + 0.05),
      r.push(m));
  }
  for (let d = 0; d < fh.length; d++) {
    const m = s + d * on * 2;
    ya(l, c, 'sawtooth', fh[d], m, on * 1.6, 0.08, 2e3, r);
  }
  {
    const d = l.createBufferSource();
    d.buffer = Oc(l, Vn + 0.1);
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
function Ng(l, c) {
  let s = 0,
    r = null;
  const f = [];
  function d() {
    const p = l.currentTime + Eg * ef;
    for (; s < p; ) (wg(l, c, s, f), (s += Vn));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (r = setInterval(() => {
          d();
        }, Mg)));
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
const zg = 120,
  rn = 60 / zg,
  tf = rn * 4,
  Fh = 8,
  to = tf * Fh,
  Cg = 2,
  Rg = 100,
  Og = [L('E2'), L('E2'), L('D2'), L('D2'), L('E2'), L('E2'), L('B1'), L('B1')],
  mh = [
    L('E4'),
    L('G4'),
    L('B4'),
    L('D5'),
    L('E5'),
    L('D5'),
    L('B4'),
    L('G4'),
    L('E4'),
    L('F#4'),
    L('G4'),
    L('A4'),
    L('B4'),
    L('A4'),
    L('G4'),
    L('F#4'),
  ];
function hh(l, c, s, r, f) {
  const d = l.createBufferSource();
  d.buffer = Oc(l, 0.15);
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
    ya(l, c, 'triangle', 200, s, 0.08, r * 0.4, void 0, f));
}
function Dg(l, c, s, r) {
  for (let d = 0; d < Fh; d++) {
    const m = s + d * tf,
      p = Og[d];
    for (let g = 0; g < 4; g++) ya(l, c, 'sawtooth', p, m + g * rn, rn * 0.85, 0.26, 280, r);
    for (let g = 0; g < 4; g++) Cc(l, c, m + g * rn, 0.42, r);
    (hh(l, c, m + rn, 0.3, r), hh(l, c, m + rn * 3, 0.3, r));
    for (let g = 0; g < 8; g++) gg(l, c, m + g * rn * 0.5, 0.12, 0.08, r);
    for (let g = 0; g < 16; g++) {
      const y = (d * 16 + g) % mh.length,
        _ = m + g * rn * 0.25;
      ya(l, c, 'sawtooth', mh[y], _, rn * 0.22, 0.06, 3200, r);
    }
  }
  const f = [L('E3'), L('G3'), L('B3')];
  for (const d of f) {
    const m = l.createOscillator(),
      p = l.createGain();
    ((m.type = 'triangle'),
      m.frequency.setValueAtTime(d, s),
      p.gain.setValueAtTime(1e-4, s),
      p.gain.linearRampToValueAtTime(0.06, s + 0.2),
      p.gain.setValueAtTime(0.06, s + to - 0.3),
      p.gain.exponentialRampToValueAtTime(1e-4, s + to));
    const g = l.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 1200),
      m.connect(g).connect(p).connect(c),
      m.start(s),
      m.stop(s + to + 0.05),
      r.push(m));
  }
}
function Bg(l, c) {
  let s = 0,
    r = null;
  const f = [];
  function d() {
    const p = l.currentTime + Cg * tf;
    for (; s < p; ) (Dg(l, c, s, f), (s += to));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (r = setInterval(() => {
          d();
        }, Rg)));
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
const Lg = 80,
  ao = 60 / Lg,
  lo = ao * 4,
  $g = 8,
  no = lo * $g,
  Hg = 2,
  kg = 100,
  ph = [dg, pg, hg, mg],
  Cu = [L('A3'), L('C4'), L('E4'), L('G4'), L('A4'), L('E4')];
function Ug(l, c, s, r) {
  {
    const f = l.createOscillator(),
      d = l.createGain();
    ((f.type = 'sine'), f.frequency.setValueAtTime(L('A2'), s));
    const m = 0.28;
    (d.gain.setValueAtTime(1e-4, s),
      d.gain.linearRampToValueAtTime(m, s + 0.5),
      d.gain.setValueAtTime(m, s + no - 0.5),
      d.gain.linearRampToValueAtTime(1e-4, s + no));
    const p = l.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 180),
      f.connect(p).connect(d).connect(c),
      f.start(s),
      f.stop(s + no + 0.05),
      r.push(f));
  }
  for (let f = 0; f < ph.length; f++) {
    const d = ph[f],
      m = s + f * lo * 2,
      p = lo * 2;
    for (const g of d) {
      const y = l.createOscillator(),
        _ = l.createGain();
      ((y.type = 'triangle'), y.frequency.setValueAtTime(g, m));
      const b = 0.1,
        A = 0.4,
        M = 0.6;
      (_.gain.setValueAtTime(1e-4, m),
        _.gain.linearRampToValueAtTime(b, m + A),
        _.gain.setValueAtTime(b, m + p - M),
        _.gain.exponentialRampToValueAtTime(1e-4, m + p));
      const T = l.createDelay(0.5);
      T.delayTime.value = 0.25;
      const D = l.createGain();
      D.gain.value = 0.2;
      const R = l.createBiquadFilter();
      ((R.type = 'lowpass'),
        (R.frequency.value = 2e3),
        y.connect(_).connect(c),
        y.connect(T).connect(R).connect(D).connect(c),
        y.start(m),
        y.stop(m + p + 0.5),
        r.push(y));
    }
  }
  for (let f = 0; f < Cu.length; f++) {
    const d = s + f * ao * 2;
    (ya(l, c, 'sawtooth', Cu[f], d, ao * 1.5, 0.09, 1800, r),
      ya(l, c, 'sine', Cu[f] * 0.5, d + 0.12, ao * 1.2, 0.05, 600, r));
  }
}
function qg(l, c) {
  let s = 0,
    r = null;
  const f = [];
  function d() {
    const p = l.currentTime + Hg * lo;
    for (; s < p; ) (Ug(l, c, s, f), (s += no));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (r = setInterval(() => {
          d();
        }, kg)));
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
function Vg(l, c, s) {
  switch (l) {
    case 'title':
      return qg(c, s);
    case 'base':
      return Ag(c, s);
    case 'battleNormal':
      return Bg(c, s);
    case 'battleBoss':
      return Ng(c, s);
  }
}
function Gg(l, c) {
  const s = Math.max(1, Math.floor(l.sampleRate * c)),
    r = l.createBuffer(1, s, l.sampleRate),
    f = r.getChannelData(0);
  for (let d = 0; d < s; d++) f[d] = Math.random() * 2 - 1;
  return r;
}
function Ta(l, c, s, r, f) {
  const d = l.gain;
  (d.setValueAtTime(1e-4, c),
    d.linearRampToValueAtTime(s, c + r),
    d.exponentialRampToValueAtTime(1e-4, c + r + f));
}
function be(l, c, s, r, f, d, m, p, g) {
  const y = l.createOscillator(),
    _ = l.createGain();
  ((y.type = s),
    y.frequency.setValueAtTime(r, f),
    g !== void 0 && y.frequency.exponentialRampToValueAtTime(Math.max(1e-4, g), f + m + p),
    Ta(_, f, d, m, p),
    y.connect(_).connect(c),
    y.start(f),
    y.stop(f + m + p + 0.02));
}
function Ea(l, c, s, r, f, d) {
  const m = l.createBufferSource();
  m.buffer = Gg(l, s);
  const p = l.createGain();
  if ((Ta(p, r, f, 0.002, s), d)) {
    const g = l.createBiquadFilter();
    ((g.type = d.type),
      (g.frequency.value = d.frequency),
      d.q !== void 0 && (g.Q.value = d.q),
      m.connect(g).connect(p).connect(c));
  } else m.connect(p).connect(c);
  m.start(r);
}
const Yg = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createOscillator(),
      d = l.createGain();
    ((r.type = 'sawtooth'),
      (f.type = 'sawtooth'),
      r.frequency.setValueAtTime(900, s),
      r.frequency.exponentialRampToValueAtTime(1500, s + 0.5),
      f.frequency.setValueAtTime(905, s),
      f.frequency.exponentialRampToValueAtTime(1510, s + 0.5),
      Ta(d, s, 0.28, 0.02, 0.5),
      r.connect(d),
      f.connect(d),
      d.connect(c),
      r.start(s),
      f.start(s),
      r.stop(s + 0.55),
      f.stop(s + 0.55));
  },
  Zg = (l, c, s) => {
    for (let r = 0; r < 4; r++) {
      const f = s + r * 0.12;
      (be(l, c, 'sine', 110, f, 0.4, 0.005, 0.18, 35),
        Ea(l, c, 0.08, f, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  Xg = (l, c, s) => {
    (Ea(l, c, 0.4, s, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      be(l, c, 'triangle', 3e3, s, 0.25, 0.005, 0.15, 1500),
      be(l, c, 'sawtooth', 200, s + 0.05, 0.18, 0.005, 0.3, 80));
  },
  Kg = (l, c, s) => {
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
        Ta(m, f, 0.2, 0.002, 0.06),
        d.connect(p).connect(m).connect(c),
        d.start(f),
        d.stop(f + 0.08));
    }
  },
  Qg = (l, c, s) => {
    (Ea(l, c, 0.1, s, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      be(l, c, 'triangle', 500, s, 0.18, 0.003, 0.08, 200));
  },
  Wg = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain();
    ((r.type = 'sawtooth'),
      r.frequency.setValueAtTime(80, s),
      r.frequency.linearRampToValueAtTime(160, s + 0.8),
      Ta(f, s, 0.3, 0.1, 0.7),
      r.connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.85),
      be(l, c, 'square', 320, s + 0.2, 0.15, 0.02, 0.4));
  },
  Jg = (l, c, s) => {
    (Ea(l, c, 0.5, s, 0.45, { type: 'lowpass', frequency: 1200 }),
      be(l, c, 'sine', 90, s, 0.5, 0.005, 0.6, 30),
      be(l, c, 'triangle', 1200, s + 0.1, 0.2, 0.02, 0.4, 2400),
      be(l, c, 'triangle', 1600, s + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  Fg = (l, c, s) => {
    (be(l, c, 'sine', 180, s, 0.3, 0.005, 0.12, 60),
      Ea(l, c, 0.08, s, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  Ig = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain();
    ((r.type = 'sawtooth'),
      r.frequency.setValueAtTime(220, s),
      r.frequency.exponentialRampToValueAtTime(40, s + 1.2),
      Ta(f, s, 0.45, 0.02, 1.2),
      r.connect(f).connect(c),
      r.start(s),
      r.stop(s + 1.3),
      Ea(l, c, 0.8, s, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  Pg = (l, c, s) => {
    (be(l, c, 'triangle', 700, s, 0.22, 0.01, 0.18),
      be(l, c, 'triangle', 1050, s + 0.12, 0.22, 0.01, 0.22));
  },
  ev = (l, c, s) => {
    (be(l, c, 'triangle', 600, s, 0.25, 0.01, 0.2),
      be(l, c, 'triangle', 900, s + 0.12, 0.25, 0.01, 0.2),
      be(l, c, 'triangle', 1350, s + 0.24, 0.3, 0.01, 0.45),
      be(l, c, 'sine', 2400, s + 0.3, 0.15, 0.02, 0.5));
  },
  tv = (l, c, s) => {
    (be(l, c, 'triangle', 600, s, 0.28, 0.01, 0.18),
      be(l, c, 'triangle', 750, s + 0.12, 0.28, 0.01, 0.18),
      be(l, c, 'triangle', 900, s + 0.24, 0.28, 0.01, 0.22),
      be(l, c, 'triangle', 1200, s + 0.36, 0.32, 0.01, 0.5),
      be(l, c, 'sine', 2400, s + 0.42, 0.18, 0.02, 0.6));
  },
  av = (l, c, s) => {
    (be(l, c, 'sawtooth', 300, s, 0.3, 0.02, 0.4, 220),
      be(l, c, 'sawtooth', 220, s + 0.35, 0.3, 0.02, 0.5, 160),
      be(l, c, 'sawtooth', 160, s + 0.8, 0.3, 0.02, 0.7, 80),
      Ea(l, c, 1, s, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  nv = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain();
    ((r.type = 'triangle'),
      r.frequency.setValueAtTime(700, s),
      r.frequency.exponentialRampToValueAtTime(400, s + 0.4),
      Ta(f, s, 0.22, 0.02, 0.4),
      r.connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.45),
      Ea(l, c, 0.5, s, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  lv = (l, c, s) => {
    be(l, c, 'triangle', 1e3, s, 0.18, 0.003, 0.05);
  },
  iv = (l, c, s) => {
    (be(l, c, 'triangle', 880, s, 0.2, 0.005, 0.08),
      be(l, c, 'triangle', 1320, s + 0.06, 0.2, 0.005, 0.12));
  },
  cv = (l, c, s) => {
    (be(l, c, 'square', 260, s, 0.18, 0.005, 0.07),
      be(l, c, 'square', 200, s + 0.06, 0.18, 0.005, 0.1));
  },
  sv = (l, c, s) => {
    be(l, c, 'triangle', 1400, s, 0.12, 0.003, 0.04);
  },
  ov = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain();
    ((r.type = 'triangle'),
      r.frequency.setValueAtTime(500, s),
      r.frequency.exponentialRampToValueAtTime(1e3, s + 0.12),
      Ta(f, s, 0.18, 0.01, 0.12),
      r.connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.15));
  },
  rv = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain();
    ((r.type = 'triangle'),
      r.frequency.setValueAtTime(1e3, s),
      r.frequency.exponentialRampToValueAtTime(500, s + 0.1),
      Ta(f, s, 0.16, 0.005, 0.1),
      r.connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.13));
  },
  uv = (l, c, s) => {
    (be(l, c, 'sawtooth', 200, s, 0.3, 0.01, 0.35, 80),
      be(l, c, 'triangle', 600, s + 0.05, 0.22, 0.01, 0.3, 1200),
      be(l, c, 'triangle', 1200, s + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  fv = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((r.type = 'sawtooth'),
      r.frequency.setValueAtTime(1600, s),
      r.frequency.exponentialRampToValueAtTime(700, s + 0.08),
      (d.type = 'highpass'),
      (d.frequency.value = 800),
      Ta(f, s, 0.22, 0.003, 0.09),
      r.connect(d).connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.12));
  },
  dv = (l, c, s) => {
    (be(l, c, 'sine', 130, s, 0.5, 0.01, 0.28, 40),
      Ea(l, c, 0.12, s, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  mv = (l, c, s) => {
    (Ea(l, c, 0.18, s, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      be(l, c, 'triangle', 2200, s, 0.15, 0.002, 0.06, 1800));
  },
  hv = (l, c, s) => {
    const r = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((r.type = 'square'),
      r.frequency.setValueAtTime(900, s),
      r.frequency.exponentialRampToValueAtTime(1400, s + 0.05),
      (d.type = 'bandpass'),
      (d.frequency.value = 1500),
      (d.Q.value = 3),
      Ta(f, s, 0.18, 0.002, 0.07),
      r.connect(d).connect(f).connect(c),
      r.start(s),
      r.stop(s + 0.1),
      Ea(l, c, 0.05, s, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  pv = (l, c, s) => {
    (be(l, c, 'triangle', 700, s, 0.18, 0.005, 0.05),
      be(l, c, 'triangle', 1050, s + 0.04, 0.18, 0.005, 0.06));
  },
  yv = {
    laserShoot: fv,
    cannonShoot: dv,
    thunderShoot: mv,
    cutterShoot: hv,
    weaponSwitch: pv,
    activeLaser: Yg,
    activeCannon: Zg,
    activeThunder: Xg,
    activeCutter: Kg,
    enemyKill: Qg,
    bossWarn: Wg,
    bossKill: Jg,
    machineHit: Fg,
    machineDown: Ig,
    waveClear: Pg,
    tierClear: ev,
    tap: lv,
    purchaseOk: iv,
    reject: cv,
    tabSwitch: sv,
    dialogOpen: ov,
    dialogClose: rv,
    launch: uv,
    resultClear: tv,
    resultGameOver: av,
    resultRetreat: nv,
  },
  gv = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function yh(l) {
  return Math.max(0, Math.min(1, l));
}
class vv {
  constructor() {
    Sa(this, 'ctx', null);
    Sa(this, 'seGain', null);
    Sa(this, 'bgmGain', null);
    Sa(this, 'masterGain', null);
    Sa(this, 'lastPlayAt', new Map());
    Sa(this, 'seVolume', 0.7);
    Sa(this, 'bgmVolume', 0.5);
    Sa(this, 'currentBgm', null);
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
      r = gv[c];
    if (r !== void 0) {
      const d = this.lastPlayAt.get(c) ?? 0;
      if (s - d < r) return;
      this.lastPlayAt.set(c, s);
    }
    const f = yv[c];
    f(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(c) {
    ((this.seVolume = yh(c)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(c) {
    ((this.bgmVolume = yh(c)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
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
    const s = Vg(c, this.ctx, this.bgmGain);
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
const Xe = new vv(),
  _v = '_content_11wqi_1',
  bv = { content: _v },
  Sv = '_tabBar_rhd8d_2',
  xv = '_fullWidth_rhd8d_9',
  jv = '_tab_rhd8d_2',
  Av = '_tabActive_rhd8d_54',
  Tv = '_tabDisabled_rhd8d_101',
  Ev = '_tabIcon_rhd8d_107',
  Mv = '_tabLabel_rhd8d_114',
  wv = '_badge_rhd8d_119',
  Nv = '_badgeActive_rhd8d_137',
  zv = '_indicator_rhd8d_158',
  ea = {
    tabBar: Sv,
    fullWidth: xv,
    tab: jv,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: Av,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: Tv,
    tabIcon: Ev,
    tabLabel: Mv,
    badge: wv,
    badgeActive: Nv,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: zv,
  },
  Cv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Rv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Ov = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Dv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Bv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Lv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  $v = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Hv = { screw: Lv, bolt: Rv, alloy: Cv, laser: Bv, cannon: Ov, thunder: $v, cutter: Dv };
function kv(l, c) {
  return l.replace(/\swidth="\d+"/, ` width="${c}"`).replace(/\sheight="\d+"/, ` height="${c}"`);
}
function Ye({ name: l, size: c = 16, color: s = 'currentColor', className: r }) {
  const f = Hv[l];
  if (f)
    return u.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: r,
      style: { display: 'inline-flex', color: s, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: kv(f, c) },
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
function co({
  tabs: l,
  value: c,
  onChange: s,
  variant: r = 'underline',
  size: f = 'md',
  fullWidth: d = !1,
  align: m = 'start',
}) {
  const p = q.useRef(null),
    [g, y] = q.useState({ left: 0, width: 0 });
  return (
    q.useEffect(() => {
      const _ = p.current;
      if (!_) return;
      const b = l.findIndex((R) => R.key === c);
      if (b < 0) return;
      const M = _.querySelectorAll('[role="tab"]')[b];
      if (!M) return;
      const T = _.getBoundingClientRect(),
        D = M.getBoundingClientRect();
      y({ left: D.left - T.left, width: D.width });
    }, [c, l]),
    u.jsxs('div', {
      ref: p,
      role: 'tablist',
      className: [
        ea.tabBar,
        ea[`variant-${r}`],
        ea[`size-${f}`],
        ea[`align-${m}`],
        d ? ea.fullWidth : '',
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
              className: [ea.tab, b ? ea.tabActive : '', _.disabled === !0 ? ea.tabDisabled : '']
                .filter(Boolean)
                .join(' '),
              onClick: () => {
                _.disabled !== !0 && s(_.key);
              },
              children: [
                _.iconName != null &&
                  u.jsx('span', {
                    className: ea.tabIcon,
                    'aria-hidden': 'true',
                    children: u.jsx(Ye, { name: _.iconName, size: f === 'sm' ? 12 : 14 }),
                  }),
                u.jsx('span', { className: ea.tabLabel, children: _.label }),
                _.badge != null &&
                  u.jsx('span', {
                    className: [ea.badge, b ? ea.badgeActive : ''].filter(Boolean).join(' '),
                    children: _.badge,
                  }),
              ],
            },
            _.key
          );
        }),
        r === 'underline' &&
          u.jsx('span', {
            className: ea.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${g.left}px)`, width: g.width },
          }),
      ],
    })
  );
}
const Uv = '_shell_ka520_6',
  qv = '_header_ka520_19',
  Vv = '_main_ka520_32',
  Gv = '_noScroll_ka520_43',
  Yv = '_footer_ka520_48',
  Zv = '_battle_ka520_61',
  mi = { shell: Uv, header: qv, main: Vv, noScroll: Gv, footer: Yv, battle: Zv };
function El({ header: l, footer: c, children: s, noScroll: r = !1, variant: f = 'default' }) {
  return u.jsxs('div', {
    className: [mi.shell, f === 'battle' ? mi.battle : ''].filter(Boolean).join(' '),
    children: [
      l != null && u.jsx('header', { className: mi.header, children: l }),
      u.jsx('main', {
        className: [mi.main, r ? mi.noScroll : ''].filter(Boolean).join(' '),
        children: s,
      }),
      c != null && u.jsx('footer', { className: mi.footer, children: c }),
    ],
  });
}
const Xv = '_nav_4erx0_2',
  Kv = '_tab_4erx0_10',
  Qv = '_active_4erx0_33',
  Wv = '_iconWrap_4erx0_38',
  Jv = '_badge_4erx0_51',
  vc = { nav: Xv, tab: Kv, active: Qv, iconWrap: Wv, badge: Jv },
  Fv = '_text_1wy1n_1',
  Iv = '_variant_heading_1_1wy1n_6',
  Pv = '_variant_heading_2_1wy1n_15',
  e_ = '_variant_heading_3_1wy1n_24',
  t_ = '_variant_body_1wy1n_33',
  a_ = '_variant_caption_1wy1n_41',
  n_ = '_variant_label_1wy1n_49',
  l_ = '_variant_numeric_l_1wy1n_58',
  i_ = '_variant_numeric_m_1wy1n_67',
  c_ = '_variant_numeric_s_1wy1n_76',
  s_ = '_color_default_1wy1n_85',
  o_ = '_color_mid_1wy1n_89',
  r_ = '_color_dim_1wy1n_93',
  u_ = '_color_disabled_1wy1n_97',
  f_ = '_color_primary_1wy1n_101',
  d_ = '_color_secondary_1wy1n_105',
  m_ = '_color_danger_1wy1n_109',
  h_ = '_color_success_1wy1n_113',
  p_ = '_color_warning_1wy1n_117',
  y_ = '_truncate_1wy1n_121',
  g_ = '_align_left_1wy1n_128',
  v_ = '_align_center_1wy1n_132',
  __ = '_align_right_1wy1n_136',
  _c = {
    text: Fv,
    variant_heading_1: Iv,
    variant_heading_2: Pv,
    variant_heading_3: e_,
    variant_body: t_,
    variant_caption: a_,
    variant_label: n_,
    variant_numeric_l: l_,
    variant_numeric_m: i_,
    variant_numeric_s: c_,
    color_default: s_,
    color_mid: o_,
    color_dim: r_,
    color_disabled: u_,
    color_primary: f_,
    color_secondary: d_,
    color_danger: m_,
    color_success: h_,
    color_warning: p_,
    truncate: y_,
    align_left: g_,
    align_center: v_,
    align_right: __,
  };
function b_(l) {
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
function Y({
  variant: l = 'body',
  children: c,
  as: s,
  color: r = 'default',
  className: f,
  truncate: d,
  align: m,
  style: p,
}) {
  const g = s ?? b_(l),
    y = l.replace(/-/g, '_'),
    _ = r === 'text' ? 'default' : r;
  return u.jsx(g, {
    className: [
      _c.text,
      _c[`variant_${y}`],
      _c[`color_${_}`],
      d ? _c.truncate : '',
      m ? _c[`align_${m}`] : '',
      f,
    ]
      .filter(Boolean)
      .join(' '),
    style: p,
    children: c,
  });
}
const S_ = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function Dc({ active: l, onChange: c, badges: s }) {
  return u.jsx('nav', {
    className: vc.nav,
    'aria-label': 'メインナビゲーション',
    children: S_.map(({ key: r, label: f, iconName: d }) => {
      const m = r === l,
        p = s == null ? void 0 : s[r];
      return u.jsxs(
        'button',
        {
          type: 'button',
          className: [vc.tab, m ? vc.active : ''].filter(Boolean).join(' '),
          onClick: () => c(r),
          'aria-current': m ? 'page' : void 0,
          'aria-label': f,
          children: [
            u.jsxs('span', {
              className: vc.iconWrap,
              children: [
                u.jsx(Ye, {
                  name: d,
                  size: 22,
                  color: m ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                p != null &&
                  u.jsx('span', { className: vc.badge, 'aria-hidden': 'true', children: p }),
              ],
            }),
            u.jsx(Y, { variant: 'caption', color: m ? 'primary' : 'dim', children: f }),
          ],
        },
        r
      );
    }),
  });
}
const x_ = '_root_kv5uk_2',
  j_ = '_titleRow_kv5uk_8',
  A_ = '_left_kv5uk_17',
  T_ = '_center_kv5uk_24',
  E_ = '_right_kv5uk_33',
  M_ = '_currencies_kv5uk_42',
  w_ = '_actions_kv5uk_49',
  N_ = '_tabBarSlot_kv5uk_56',
  $n = {
    root: x_,
    titleRow: j_,
    left: A_,
    center: T_,
    right: E_,
    currencies: M_,
    actions: w_,
    tabBarSlot: N_,
  },
  z_ = '_root_i843c_2',
  C_ = '_icon_i843c_10',
  R_ = '_delta_i843c_30',
  O_ = '_deltaSm_i843c_37',
  D_ = '_deltaMd_i843c_41',
  B_ = '_deltaLg_i843c_45',
  L_ = '_subtle_i843c_50',
  $_ = '_currencyLabel_i843c_55',
  H_ = '_rankStamp_i843c_64',
  Da = {
    root: z_,
    icon: C_,
    delta: R_,
    deltaSm: O_,
    deltaMd: D_,
    deltaLg: B_,
    subtle: L_,
    currencyLabel: $_,
    rankStamp: H_,
  },
  k_ = '_root_1wxcz_1',
  U_ = '_sizeSm_1wxcz_13',
  q_ = '_sizeMd_1wxcz_17',
  V_ = '_sizeLg_1wxcz_21',
  G_ = '_sizeXl_1wxcz_25',
  Y_ = '_affix_1wxcz_29',
  gl = { root: k_, sizeSm: U_, sizeMd: q_, sizeLg: V_, sizeXl: G_, affix: Y_ };
function Vu(l) {
  let c = l.length;
  for (; c > 0 && l[c - 1] === 0; ) c--;
  return l.slice(0, c);
}
function bc(l) {
  let c = 0;
  for (let s = 0; s < l.length; s++) {
    const r = Math.floor(l[s] + c);
    ((l[s] = r % 1e3), (c = Math.floor(r / 1e3)));
  }
  for (; c > 0; ) (l.push(c % 1e3), (c = Math.floor(c / 1e3)));
  return Vu(l);
}
function Z_(l, c) {
  for (; c !== 0; ) {
    const s = c;
    ((c = l % c), (l = s));
  }
  return l;
}
function X_(l) {
  const c = l.toString(),
    s = c.indexOf('.');
  if (s === -1) return { num: Math.round(l), den: 1 };
  const r = c.length - s - 1,
    f = Math.pow(10, r),
    d = Math.round(l * f),
    m = Z_(Math.abs(d), f);
  return { num: d / m, den: f / m };
}
function K_(l) {
  let c = '',
    s = l;
  for (; s > 0; )
    ((s -= 1), (c = String.fromCharCode(65 + (s % 26)) + c), (s = Math.floor(s / 26)));
  return c;
}
const Bt = class Bt {
  constructor(c) {
    Sa(this, 'digits');
    this.digits = c;
  }
  static fromNumber(c) {
    if (c <= 0) return Bt.ZERO;
    const s = [];
    let r = Math.floor(c);
    for (; r > 0; ) (s.push(r % 1e3), (r = Math.floor(r / 1e3)));
    return new Bt(Vu(s));
  }
  static fromString(c) {
    const s = c.trim();
    if (s === '' || s === '0') return Bt.ZERO;
    const r = [];
    let f = s.length;
    for (; f > 0; ) {
      const d = Math.max(0, f - 3);
      (r.push(parseInt(s.slice(d, f), 10)), (f = d));
    }
    return new Bt(Vu(r));
  }
  static fromJSON(c) {
    return new Bt(bc([...c]));
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
    return (m > 0 && d.push(m), new Bt(bc(d)));
  }
  sub(c) {
    if (this.compare(c) <= 0) return Bt.ZERO;
    const s = this.digits,
      r = c.digits,
      f = new Array(s.length).fill(0);
    let d = 0;
    for (let m = 0; m < s.length; m++) {
      let p = (s[m] ?? 0) - (r[m] ?? 0) - d;
      (p < 0 ? ((p += 1e3), (d = 1)) : (d = 0), (f[m] = p));
    }
    return new Bt(bc(f));
  }
  mulInt(c) {
    if (c <= 0 || this.isZero()) return Bt.ZERO;
    const s = this.digits,
      r = new Array(s.length).fill(0);
    let f = 0;
    for (let d = 0; d < s.length; d++) {
      const m = s[d] * c + f;
      ((r[d] = m % 1e3), (f = Math.floor(m / 1e3)));
    }
    for (; f > 0; ) (r.push(f % 1e3), (f = Math.floor(f / 1e3)));
    return new Bt(bc(r));
  }
  divInt(c) {
    if (c <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return Bt.ZERO;
    const s = this.digits,
      r = new Array(s.length).fill(0);
    let f = 0;
    for (let d = s.length - 1; d >= 0; d--) {
      const m = f * 1e3 + (s[d] ?? 0);
      ((r[d] = Math.floor(m / c)), (f = m % c));
    }
    return (f > 0 && (r[0] += 1), new Bt(bc(r)));
  }
  mulRational(c, s) {
    return this.mulInt(c).divInt(s);
  }
  mulNumber(c) {
    const { num: s, den: r } = X_(c);
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
      f = K_(r),
      d = this.digits[c - 2] ?? 0,
      m = Math.floor(d / 10);
    return `${s}.${String(m).padStart(2, '0')}${f}`;
  }
};
Sa(Bt, 'ZERO', new Bt([]));
let Q = Bt;
function Q_(l) {
  if (l === '') return 0;
  let c = 0;
  for (let s = 0; s < l.length; s++) c = c * 26 + (l.charCodeAt(s) - 65 + 1);
  return c;
}
function W_(l) {
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
function J_(l) {
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
function F_(l) {
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
function Yn({
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
    A = Q_(b);
  let M, T;
  if (s === 'scale') {
    const Z = W_(A);
    ((M = Z.color), (T = r ? Z.glow : void 0));
  } else ((M = J_(s)), (T = r ? F_(s) : void 0));
  const D = { sm: gl.sizeSm, md: gl.sizeMd, lg: gl.sizeLg, xl: gl.sizeXl }[c],
    R = { color: M, ...(T != null ? { textShadow: T } : {}), ...p };
  return u.jsxs('span', {
    className: `${gl.root} ${D}`,
    style: R,
    children: [
      f != null && u.jsx('span', { className: gl.affix, children: f }),
      y,
      d != null && u.jsx('span', { className: gl.affix, children: d }),
    ],
  });
}
const I_ = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  P_ = { sm: 12, md: 16, lg: 22, xl: 28 };
function eb({ delta: l, sizeClass: c }) {
  const s = l === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return u.jsx('span', {
    className: `${Da.delta} ${c}`,
    style: { color: s },
    'aria-hidden': 'true',
    children: l,
  });
}
function ji({
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
    y = I_[l],
    _ = d ? 'var(--c-text-disabled)' : `var(${y.cssVar})`,
    b = r && !d ? { color: r === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: _ },
    A = { sm: Da.deltaSm, md: Da.deltaMd, lg: Da.deltaLg, xl: Da.deltaLg }[s],
    M = u.jsx(Ye, { name: l, size: P_[s], color: _, className: Da.icon }),
    T = u.jsxs(u.Fragment, {
      children: [
        r !== void 0 && !d && u.jsx(eb, { delta: r, sizeClass: A }),
        u.jsx(Yn, { value: g, size: s, accentColor: 'primary', style: b }),
      ],
    });
  return u.jsxs('span', {
    className: [Da.root, d ? Da.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${y.label} ${g.toDisplay()}`,
    children: [
      m === 'end'
        ? u.jsxs(u.Fragment, { children: [T, M] })
        : u.jsxs(u.Fragment, { children: [M, T] }),
      f && u.jsx('span', { className: Da.currencyLabel, 'aria-hidden': 'true', children: y.label }),
      p !== void 0 &&
        p !== '' &&
        u.jsx('span', {
          className: Da.rankStamp,
          'data-rank': p,
          'aria-label': `rank ${p}`,
          children: p,
        }),
    ],
  });
}
const tb = '_iconButton_1fyi8_1',
  ab = '_round_1fyi8_23',
  nb = '_active_1fyi8_85',
  lb = '_iconWrap_1fyi8_113',
  hi = {
    iconButton: tb,
    round: ab,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: nb,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: lb,
  },
  ib = { sm: 14, md: 18, lg: 22 };
function zc({
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
    y = typeof l == 'string' ? u.jsx(Ye, { name: l, size: ib[s] }) : l;
  return u.jsx('button', {
    type: 'button',
    className: [
      hi.iconButton,
      hi[`variant-${g}`],
      hi[`size-${s}`],
      f === 'round' ? hi.round : '',
      d ? hi.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: m,
    onClick: p,
    'aria-label': c,
    'aria-pressed': d,
    'aria-disabled': m,
    children: u.jsx('span', { className: hi.iconWrap, 'aria-hidden': 'true', children: y }),
  });
}
const gh = (l) => {
    let c;
    const s = new Set(),
      r = (y, _) => {
        const b = typeof y == 'function' ? y(c) : y;
        if (!Object.is(b, c)) {
          const A = c;
          ((c = (_ ?? (typeof b != 'object' || b === null)) ? b : Object.assign({}, c, b)),
            s.forEach((M) => M(c, A)));
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
  cb = (l) => (l ? gh(l) : gh),
  sb = (l) => l;
function ob(l, c = sb) {
  const s = Js.useSyncExternalStore(
    l.subscribe,
    Js.useCallback(() => c(l.getState()), [l, c]),
    Js.useCallback(() => c(l.getInitialState()), [l, c])
  );
  return (Js.useDebugValue(s), s);
}
const rb = (l) => {
    const c = cb(l),
      s = (r) => ob(c, r);
    return (Object.assign(s, c), s);
  },
  ub = (l) => rb,
  Ih = [
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
function af(l, c) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, c));
}
function dn(l) {
  return 1 + 0.1 * l;
}
function Ph(l, c, s) {
  let r = 0;
  for (let f = 0; f < s; f++) r += af(l, c + f);
  return r;
}
function e1(l, c, s) {
  let r = Q.ZERO,
    f = 0;
  for (;;) {
    const d = Q.fromNumber(af(l, c + f)),
      m = r.add(d);
    if (m.gt(s) || ((r = m), f++, f >= 1e4)) break;
  }
  return { lvDelta: f, totalCost: r };
}
const vh = {
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
function fb(l, c, s) {
  return l.lt(c) ? c : l.gt(s) ? s : l;
}
const db = (l, c) => ({
    ...vh,
    startRun: ({ initialWeapon: s, baseMachineMaxHp: r }) => {
      c().resetRunWorkshop();
      const f = c().runWorkshopLevels.hpMul,
        d = dn(f),
        m = r.mulNumber(d),
        p = c();
      l({
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
      });
    },
    endRun: () => {
      (l(vh), c().resetRunWorkshop());
    },
    addScrew: (s) => l((r) => ({ screw: r.screw.add(s) })),
    spendScrew: (s) => {
      const r = c().screw;
      return r.lt(s) ? !1 : (l({ screw: r.sub(s) }), !0);
    },
    setMachineHp: (s) => l((r) => ({ machineHp: fb(s, Q.ZERO, r.machineMaxHp) })),
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
        g = r.baseMachineMaxHp.mulNumber(dn(s)),
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
  mb = { bolt: Q.ZERO, alloy: Q.ZERO },
  hb = (l, c) => ({
    ...mb,
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
  Si = 6,
  pb = { equippedPatches: new Map() },
  yb = (l, c) => ({
    ...pb,
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
  t1 = 'tower-like-game',
  io = 1,
  P = {
    profile: 'profile',
    currencies: 'currencies',
    machine: 'machine',
    weapons: 'weapons',
    patches: 'patches',
    equippedPatches: 'equippedPatches',
    settings: 'settings',
  },
  so = [
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
  a1 = {
    id: 'singleton',
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    schemaVersion: io,
  },
  n1 = { id: 'singleton', bolt: [], alloy: [] },
  l1 = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  i1 = { id: 'singleton', bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 };
function c1() {
  return Object.fromEntries(so.map((l) => [l, 0]));
}
const gb = { machineLevels: c1() },
  vb = (l) => ({
    ...gb,
    incrementMachineLv: (c) =>
      l((s) => ({ machineLevels: { ...s.machineLevels, [c]: s.machineLevels[c] + 1 } })),
    setMachineLv: (c, s) => l((r) => ({ machineLevels: { ...r.machineLevels, [c]: s } })),
    resetMachine: () => l({ machineLevels: c1() }),
  });
function Gu(l, c) {
  return `${l}#${c}`;
}
const _b = { patches: new Map() },
  bb = (l, c) => ({
    ..._b,
    addPatch: (s, r, f = 1) => {
      const d = Gu(s, r);
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
      const d = Gu(s, r),
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
  _h = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  Sb = (l) => ({
    ..._h,
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
    resetProfile: (c) => l({ ..._h, createdAt: c, lastPlayedAt: c }),
  }),
  s1 = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
  xb = { runWorkshopLevels: s1 },
  jb = (l, c) => ({
    ...xb,
    upgradeRunWorkshop: (s, r) => {
      const f = Ih.find((_) => _.key === s);
      if (f == null) return !1;
      const d = c().runWorkshopLevels[s];
      let m, p;
      if (r === 'max') {
        const _ = e1(f, d, c().screw);
        if (_.lvDelta === 0) return !1;
        ((m = _.lvDelta), (p = _.totalCost));
      } else ((m = r), (p = Q.fromNumber(Ph(f, d, r))));
      if (!c().spendScrew(p)) return !1;
      const y = d + m;
      return (
        l((_) => ({ runWorkshopLevels: { ..._.runWorkshopLevels, [s]: y } })),
        s === 'hpMul' && c().recalcMachineMaxHpFromHpMul(y),
        !0
      );
    },
    resetRunWorkshop: () => l({ runWorkshopLevels: s1 }),
  }),
  bh = { bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  Ab = (l) => ({
    ...bh,
    setBgmVolume: (c) => l({ bgmVolume: Math.max(0, Math.min(1, c)) }),
    setSeVolume: (c) => l({ seVolume: Math.max(0, Math.min(1, c)) }),
    setVibrationEnabled: (c) => l({ vibrationEnabled: c }),
    resetSettings: () => l(bh),
  }),
  Sh = { weaponLv: 0, initialWeapon: 'laser' },
  Tb = (l) => ({
    ...Sh,
    incrementWeaponLv: () => l((c) => ({ weaponLv: c.weaponLv + 1 })),
    setWeaponLv: (c) => l({ weaponLv: c }),
    setInitialWeapon: (c) => l({ initialWeapon: c }),
    resetWeapons: () => l(Sh),
  }),
  G = ub()((...l) => ({
    ...Sb(...l),
    ...hb(...l),
    ...vb(...l),
    ...Tb(...l),
    ...bb(...l),
    ...yb(...l),
    ...Ab(...l),
    ...db(...l),
    ...jb(...l),
  }));
function Bc({ title: l, subtitle: c, onBack: s, currencies: r, tabBar: f, actions: d }) {
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
    className: $n.root,
    children: [
      u.jsxs('div', {
        className: $n.titleRow,
        children: [
          u.jsx('div', {
            className: $n.left,
            children:
              s != null &&
              u.jsx(zc, {
                icon: 'chevron-left',
                label: '戻る',
                variant: 'ghost',
                size: 'md',
                onClick: s,
              }),
          }),
          u.jsxs('div', {
            className: $n.center,
            children: [
              u.jsx(Y, { variant: 'heading-3', truncate: !0, align: 'center', children: l }),
              c != null &&
                u.jsx(Y, { variant: 'caption', color: 'dim', align: 'center', children: c }),
            ],
          }),
          u.jsxs('div', {
            className: $n.right,
            children: [
              _.length > 0 &&
                u.jsx('div', {
                  className: $n.currencies,
                  children: _.map((A) => u.jsx(ji, { currency: A, value: b(A), size: 'sm' }, A)),
                }),
              d != null && u.jsx('div', { className: $n.actions, children: d }),
            ],
          }),
        ],
      }),
      f != null && u.jsx('div', { className: $n.tabBarSlot, children: f }),
    ],
  });
}
const Eb = '_tab_1nc83_3',
  Mb = { tab: Eb },
  wb = '_wrapper_1opqp_3',
  Nb = '_active_1opqp_12',
  zb = '_card_1opqp_12',
  Cb = '_locked_1opqp_18',
  Rb = '_tall_1opqp_34',
  Ob = '_iconTile_1opqp_37',
  Db = '_headerText_1opqp_42',
  Bb = '_description_1opqp_45',
  Lb = '_name_1opqp_48',
  $b = '_wide_1opqp_53',
  Hb = '_body_1opqp_61',
  kb = '_header_1opqp_42',
  Ub = '_statGrid_1opqp_121',
  qb = '_statChip_1opqp_129',
  Vb = '_statLabel_1opqp_140',
  Gb = '_statValue_1opqp_147',
  Yb = '_lockedBadge_1opqp_158',
  Ct = {
    wrapper: wb,
    active: Nb,
    card: zb,
    locked: Cb,
    tall: Rb,
    iconTile: Ob,
    headerText: Db,
    description: Bb,
    name: Lb,
    wide: $b,
    body: Hb,
    header: kb,
    statGrid: Ub,
    statChip: qb,
    statLabel: Vb,
    statValue: Gb,
    lockedBadge: Yb,
  },
  Zb = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function o1({
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
    className: [Ct.wrapper, d ? Ct.active : '', m ? Ct.locked : '', g ? Ct.wide : Ct.tall]
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
      className: Ct.card,
      style: y ? { cursor: 'pointer' } : void 0,
      children: [
        u.jsx('div', {
          className: Ct.iconTile,
          'aria-hidden': !0,
          children: u.jsx(Ye, { name: l, size: g ? 40 : 52 }),
        }),
        u.jsxs('div', {
          className: Ct.body,
          children: [
            u.jsx('div', {
              className: Ct.header,
              children: u.jsxs('div', {
                className: Ct.headerText,
                children: [
                  u.jsx('span', { className: Ct.name, children: c }),
                  s != null &&
                    s.length > 0 &&
                    u.jsx('span', { className: Ct.description, children: s }),
                ],
              }),
            }),
            !m &&
              r.length > 0 &&
              u.jsx('div', {
                className: Ct.statGrid,
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
                      className: Ct.statChip,
                      children: [
                        u.jsx('span', { className: Ct.statLabel, children: _.label }),
                        u.jsx('span', {
                          className: Ct.statValue,
                          style: _.accent != null ? { color: Zb[_.accent] } : void 0,
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
                className: Ct.lockedBadge,
                children: [
                  u.jsx(Ye, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
                  u.jsx(Y, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
const oo = [
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
  ],
  xh = 1e-9;
function Xb(l, c, s) {
  const r = Math.ceil(l * Math.pow(c, s) - xh),
    f = Math.ceil(l * Math.pow(c, s - 1) - xh);
  return Math.max(1, r - f);
}
function Rc(l, c) {
  switch (l.growthType) {
    case 'multiply': {
      let s = Math.ceil(l.baseValue);
      for (let r = 1; r <= c; r++) s += Xb(l.baseValue, l.growthFactor, r);
      return s;
    }
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
function nf(l, c) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, c));
}
function Ru(l, c, s) {
  let r = 0;
  for (let f = 0; f < s && !(l.maxLv != null && c + f >= l.maxLv); f++) r += nf(l, c + f);
  return r;
}
function Kb(l, c, s) {
  let r = 0,
    f = s,
    d = c;
  for (let m = 0; m < 1e4 && !(l.maxLv != null && d >= l.maxLv); m++) {
    const p = Q.fromNumber(nf(l, d));
    if (f.lt(p)) break;
    ((f = f.sub(p)), (d += 1), (r += 1));
  }
  return r;
}
function r1(l, c) {
  if (l.isZero()) return Q.ZERO;
  if (c <= 0) return l;
  if (c >= 1) return Q.ZERO;
  const s = 1 - c;
  return l.mulNumber(s);
}
function ro(l, c) {
  return l <= 0 ? !1 : l >= 1 ? !0 : c() < l;
}
function Ml(l, c, s) {
  const { machine: r, weapon: f, isCrit: d } = l;
  let m = r.baseAttack.mulNumber(f.damageMultiplier);
  d && (m = m.mulNumber(r.critMultiplier));
  const p = m.sub(c),
    g = r1(p, s);
  return { rawDmg: m, finalDmg: g, isCrit: d };
}
function Qb(l, c) {
  const s = l.sub(c.defense);
  return r1(s, c.damageReduction);
}
const Wb = 0.5,
  Jb = 2,
  Fb = 30,
  Ib = 25,
  u1 = 5,
  Pb = 360 / u1,
  e2 = 3,
  t2 = 20;
function uo(l) {
  const c = Math.max(0, Math.floor(l)),
    s = Jb * Math.pow(1.02, c),
    r = Math.min(10, Wb * (1 + 0.03 * c)),
    f = Fb + 0.5 * c,
    d = t2 * (1 + 0.05 * c);
  return {
    attackPerSec: r,
    splashRadius: f,
    damageMul: s,
    volleyCdSec: Ib,
    volleyDamageMul: d,
    volleyShots: u1,
  };
}
function xi(l, c, s, r) {
  const f = l - s,
    d = c - r;
  return Math.sqrt(f * f + d * d);
}
function a2(l, c, s, r) {
  if (s.length === 0) return { hits: [], blastX: 50, blastY: 50 };
  const f = 50,
    d = 50;
  let m = s[0],
    p = xi(f, d, m.position.x, m.position.y);
  for (let A = 1; A < s.length; A++) {
    const M = s[A],
      T = xi(f, d, M.position.x, M.position.y);
    T < p && ((p = T), (m = M));
  }
  const g = m.position.x,
    y = m.position.y,
    _ = ro(l.critRate, r),
    b = [];
  for (const A of s)
    if (xi(g, y, A.position.x, A.position.y) <= c.splashRadius) {
      const T = Ml({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: _ }, Q.ZERO, 0);
      b.push({ enemyId: A.id, damage: T.finalDmg, crit: _ });
    }
  return { hits: b, blastX: g, blastY: y };
}
function n2(l, c, s, r) {
  let m = 0;
  if (s.length > 0) {
    let b = s[0],
      A = xi(50, 50, b.position.x, b.position.y);
    for (let D = 1; D < s.length; D++) {
      const R = s[D],
        Z = xi(50, 50, R.position.x, R.position.y);
      Z < A && ((A = Z), (b = R));
    }
    const M = b.position.x - 50,
      T = b.position.y - 50;
    m = (Math.atan2(T, M) * 180) / Math.PI;
  }
  const g = (Pb * c.volleyShots) / c.volleyShots,
    y = c.splashRadius * e2,
    _ = [];
  for (let b = 0; b < c.volleyShots; b++) {
    const M = ((m + g * b) * Math.PI) / 180,
      T = Math.cos(M),
      D = Math.sin(M);
    let R = null,
      Z = -1 / 0;
    for (const he of s) {
      const Te = he.position.x - 50,
        ae = he.position.y - 50,
        Re = Te * T + ae * D;
      Re > 0 && Re > Z && ((Z = Re), (R = he));
    }
    let V, se;
    R !== null
      ? ((V = R.position.x), (se = R.position.y))
      : ((V = 50 + T * 100), (se = 50 + D * 100));
    const U = [];
    for (const he of s)
      if (xi(V, se, he.position.x, he.position.y) <= y) {
        const ae = Ml(
          { machine: l, weapon: { damageMultiplier: c.damageMul * c.volleyDamageMul }, isCrit: !1 },
          Q.ZERO,
          0
        );
        U.push({ enemyId: he.id, damage: ae.finalDmg });
      }
    _.push({ targetEnemyId: (R == null ? void 0 : R.id) ?? null, blastX: V, blastY: se, hits: U });
  }
  return { shots: _ };
}
const l2 = 2.5,
  i2 = 80,
  c2 = 1,
  s2 = 1.2;
function Lc(l) {
  const c = l2 * (1 + 0.03 * l),
    s = i2 + 0.5 * l,
    r = Math.floor(c2 + 0.05 * l),
    f = s2 * Math.pow(1.02, l);
  return {
    attackPerSec: c,
    orbitRadius: s,
    simultaneousHits: r,
    damageMul: f,
    overdriveCdSec: o2,
    overdriveDurationSec: r2,
    overdriveAttackSpeedMul: f1,
    overdriveDamageMul: 1,
  };
}
const o2 = 35,
  r2 = 8,
  f1 = 3;
function u2(l, c) {
  return l <= 0 ? Number.POSITIVE_INFINITY : (c / l) * 1e3;
}
function f2(l, c, s) {
  const r = (p) => ((p % 360) + 360) % 360,
    f = r(l),
    d = r(c);
  return r(f - d) <= s;
}
function d2(l, c, s, r, f, d = 2, m = 50, p = 50) {
  const g = 360 / d,
    y = [];
  for (let T = 0; T < d; T++) y.push(r + T * g);
  const A = s
      .filter((T) => {
        const D = T.position.x - m,
          R = T.position.y - p,
          Z = (Math.atan2(R, D) * 180) / Math.PI;
        return y.some((V) => f2(Z, V, g));
      })
      .slice(0, c.simultaneousHits)
      .map((T) => {
        const D = ro(l.critRate, f),
          R = Ml({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: D }, Q.ZERO, 0);
        return { enemyId: T.id, damage: R.finalDmg, crit: D };
      }),
    M = (((r + g) % 360) + 360) % 360;
  return { hits: A, angle: M };
}
function m2(l) {
  return {
    active: !0,
    remainingSec: l.overdriveDurationSec,
    attackSpeedMul: l.overdriveAttackSpeedMul,
    damageMul: l.overdriveDamageMul,
  };
}
function h2(l, c) {
  if (!l.active) return l;
  const s = l.remainingSec - c;
  return s <= 0
    ? { active: !1, remainingSec: 0, attackSpeedMul: 1, damageMul: 1 }
    : { ...l, remainingSec: s };
}
const p2 = 2.5,
  y2 = 0.4;
function fo(l) {
  const c = Math.max(0, l),
    s = p2 * (1 + 0.03 * c),
    r = Math.floor(1 + 0.1 * c),
    f = y2 * Math.pow(1.02, c),
    d = 10 * (1 + 0.05 * c);
  return { attackPerSec: s, pierce: r, damageMul: f, megaCdSec: g2, megaDamageMul: d };
}
const g2 = 20;
function v2(l, c, s, r) {
  if (s.length === 0) return { hits: [], beamX: 0, beamY: 0 };
  const f = s.slice(0, c.pierce),
    d = f.map((y) => {
      const _ = ro(l.critRate, r),
        b = Ml({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: _ }, Q.ZERO, 0);
      return { enemyId: y.id, damage: b.finalDmg, crit: _ };
    }),
    m = f[f.length - 1],
    p = m.position.x,
    g = m.position.y;
  return { hits: d, beamX: p, beamY: g };
}
const _2 = 6;
function b2(l, c, s, r = 0, f = 50, d = 50, m = _2) {
  if (s.length === 0) return { hits: [] };
  const p = (r * Math.PI) / 180,
    g = Math.cos(p),
    y = Math.sin(p),
    _ = m / 2,
    b = c.damageMul * c.megaDamageMul,
    A = [];
  for (const M of s) {
    const T = M.position.x - f,
      D = M.position.y - d;
    if (T * g + D * y <= 0) continue;
    const Z = -T * y + D * g;
    if (Math.abs(Z) > _) continue;
    const V = Ml({ machine: l, weapon: { damageMultiplier: b }, isCrit: !1 }, Q.ZERO, 0);
    A.push({ enemyId: M.id, damage: V.finalDmg });
  }
  return { hits: A };
}
const S2 = 3,
  x2 = 0.9,
  j2 = 30,
  A2 = 0.18,
  T2 = 2.5;
function mo(l) {
  const c = Math.max(0, l),
    s = A2 * Math.pow(1.02, c),
    r = Math.min(10, T2 * (1 + 0.03 * c)),
    f = 15 * (1 + 0.05 * c);
  return {
    attackPerSec: r,
    chainCount: S2,
    chainFalloff: x2,
    damageMul: s,
    plasmaCdSec: j2,
    plasmaDamageMul: f,
  };
}
function E2(l, c, s, r) {
  if (s.length === 0) return { hits: [], path: [] };
  const f = s.slice(0, c.chainCount),
    d = [],
    m = [];
  for (const p of f) {
    const g = ro(l.critRate, r),
      y = Ml({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: g }, Q.ZERO, 0);
    (d.push({ enemyId: p.id, damage: y.finalDmg, crit: g }),
      m.push({ x: p.position.x, y: p.position.y }));
  }
  return { hits: d, path: m };
}
function M2(l, c, s) {
  if (s.length === 0) return { hits: [] };
  const r = [];
  for (let f = 0; f < s.length; f++) {
    const d = s[f],
      m = Math.pow(c.chainFalloff, f),
      p = c.damageMul * c.plasmaDamageMul * m,
      g = Ml({ machine: l, weapon: { damageMultiplier: p }, isCrit: !1 }, Q.ZERO, 0);
    r.push({ enemyId: d.id, damage: g.finalDmg });
  }
  return { hits: r };
}
function Ai(l) {
  return Math.round(l * 10) / 10;
}
function ho(l, c) {
  return Q.fromNumber(l).mulNumber(c).toString();
}
function d1(l) {
  const c = oo.find((s) => s.key === 'baseAttack');
  return c != null ? Rc(c, l) : 1;
}
function m1(l) {
  const c = oo.find((s) => s.key === 'range');
  return c != null ? Rc(c, l) : 150;
}
function h1(l, c, s) {
  const r = fo(l);
  return [
    { label: 'DMG', value: ho(c, r.damageMul), accent: 'primary' },
    { label: '貫通', value: r.pierce },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Ai(r.attackPerSec), suffix: '/s' },
  ];
}
function p1(l, c, s) {
  const r = uo(l);
  return [
    { label: 'DMG', value: ho(c, r.damageMul), accent: 'primary' },
    { label: '爆発半径', value: Ai(r.splashRadius), suffix: 'm' },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Ai(r.attackPerSec), suffix: '/s' },
  ];
}
function y1(l, c, s) {
  const r = mo(l);
  return [
    { label: 'DMG', value: ho(c, r.damageMul), accent: 'primary' },
    { label: 'ターゲット数', value: r.chainCount },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Ai(r.attackPerSec), suffix: '/s' },
  ];
}
function g1(l, c) {
  const s = Lc(l);
  return [
    { label: 'DMG', value: ho(c, s.damageMul), accent: 'primary' },
    { label: '回転半径', value: Ai(s.orbitRadius), suffix: 'm' },
    { label: '刃の数', value: s.simultaneousHits },
    { label: '回転速度', value: Ai(s.attackPerSec), suffix: '/s' },
  ];
}
const w2 = [
  { kind: 'laser', name: 'LASER', description: '弾速が速く貫通する', buildStats: h1 },
  { kind: 'cannon', name: 'CANNON', description: '爆発時に範囲内にもダメージ', buildStats: p1 },
  { kind: 'thunder', name: 'THUNDER', description: '複数の敵を同時に攻撃', buildStats: y1 },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシンの周辺を回転する刃で攻撃',
    buildStats: (l, c) => g1(l, c),
  },
];
function N2() {
  const l = G((f) => f.weaponLv),
    c = G((f) => f.machineLevels),
    s = d1(c.baseAttack),
    r = m1(c.range);
  return u.jsx('div', {
    className: Mb.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: w2.map((f) =>
      u.jsx(
        o1,
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
const z2 = '_tab_1oky8_3',
  C2 = '_topRow_1oky8_9',
  R2 = '_description_1oky8_15',
  O2 = '_previewCard_1oky8_21',
  D2 = '_previewLabel_1oky8_25',
  B2 = '_impactGrid_1oky8_32',
  L2 = '_impactRow_1oky8_37',
  $2 = '_impactRowBordered_1oky8_45',
  H2 = '_impactLabel_1oky8_49',
  k2 = '_impactValues_1oky8_55',
  U2 = '_arrow_1oky8_62',
  xa = {
    tab: z2,
    topRow: C2,
    description: R2,
    previewCard: O2,
    previewLabel: D2,
    impactGrid: B2,
    impactRow: L2,
    impactRowBordered: $2,
    impactLabel: H2,
    impactValues: k2,
    arrow: U2,
  },
  q2 = '_card_1403j_1',
  V2 = '_interactive_1403j_97',
  Sc = {
    card: q2,
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
    interactive: V2,
  };
function wl({
  children: l,
  variant: c = 'default',
  interactive: s = !1,
  padding: r = 'md',
  radius: f,
  className: d,
}) {
  const m = [
    Sc.card,
    Sc[`variant-${c}`],
    Sc[`padding-${r}`],
    f != null ? Sc[`radius-${f}`] : '',
    s ? Sc.interactive : '',
    d ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return u.jsx('div', { className: m, children: l });
}
const G2 = '_root_168oy_2',
  Y2 = '_header_168oy_15',
  Z2 = '_iconWrap_168oy_22',
  X2 = '_title_168oy_34',
  K2 = '_lvBadge_168oy_47',
  Q2 = '_description_168oy_60',
  W2 = '_valueRow_168oy_66',
  J2 = '_valueBefore_168oy_74',
  F2 = '_valueAfter_168oy_83',
  I2 = '_arrow_168oy_93',
  P2 = '_buttons_168oy_100',
  eS = '_btnCol_168oy_105',
  tS = '_btn_168oy_105',
  aS = '_btnPrimary_168oy_132',
  nS = '_btnSecondary_168oy_139',
  lS = '_btnWarning_168oy_146',
  iS = '_costRow_168oy_172',
  cS = '_costNum_168oy_181',
  sS = '_costDisabled_168oy_190',
  mt = {
    root: G2,
    header: Y2,
    iconWrap: Z2,
    title: X2,
    lvBadge: K2,
    description: Q2,
    valueRow: W2,
    valueBefore: J2,
    valueAfter: F2,
    arrow: I2,
    buttons: P2,
    btnCol: eS,
    btn: tS,
    btnPrimary: aS,
    btnSecondary: nS,
    btnWarning: lS,
    costRow: iS,
    costNum: cS,
    costDisabled: sS,
  },
  oS = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  rS = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  uS = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  fS = { primary: mt.btnPrimary, secondary: mt.btnSecondary, warning: mt.btnWarning },
  dS = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function Ou(l) {
  return l instanceof Q ? l.toDisplay() : l.toLocaleString();
}
function lf({
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
  const M = y ?? uS[g],
    T = oS[M],
    D = r ?? T,
    R = fS[M],
    Z = dS[M];
  return u.jsxs('div', {
    className: mt.root,
    role: 'group',
    'aria-label': l,
    'data-maxed': b,
    children: [
      u.jsxs('div', {
        className: mt.header,
        children: [
          s != null &&
            u.jsx('span', {
              className: mt.iconWrap,
              children: u.jsx(Ye, { name: s, size: 14, color: D }),
            }),
          u.jsx('span', { className: mt.title, children: l }),
          f != null &&
            !b &&
            u.jsx('span', {
              className: mt.lvBadge,
              style: { color: T, boxShadow: rS[M] },
              children: f,
            }),
          b &&
            u.jsx('span', {
              className: mt.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      c != null &&
        c.length > 0 &&
        u.jsx(Y, { variant: 'caption', color: 'dim', className: mt.description, children: c }),
      d != null &&
        u.jsxs('div', {
          className: mt.valueRow,
          children: [
            u.jsxs('span', { className: mt.valueBefore, children: [Ou(d), p] }),
            m != null &&
              !b &&
              u.jsxs(u.Fragment, {
                children: [
                  u.jsx('span', { className: mt.arrow, children: '→' }),
                  u.jsxs('span', {
                    className: mt.valueAfter,
                    style: { color: T, textShadow: `0 0 5px ${Z}` },
                    children: [Ou(m), p],
                  }),
                ],
              }),
          ],
        }),
      !b &&
        _.length > 0 &&
        u.jsx('div', {
          className: mt.buttons,
          style: { gridTemplateColumns: `repeat(${_.length}, 1fr)` },
          children: _.map((V) => {
            const se = V.disabled === !0;
            return u.jsxs(
              'div',
              {
                className: mt.btnCol,
                children: [
                  u.jsx('button', {
                    type: 'button',
                    className: `${mt.btn} ${R}`,
                    disabled: se,
                    onClick: se ? void 0 : () => (A == null ? void 0 : A(V.amount)),
                    children: V.amount,
                  }),
                  u.jsx('div', {
                    className: mt.costRow,
                    children: u.jsx('span', {
                      className: `${mt.costNum} ${se ? mt.costDisabled : ''}`,
                      children: Ou(V.cost),
                    }),
                  }),
                ],
              },
              V.amount
            );
          }),
        }),
    ],
  });
}
function cf(l) {
  const c = Math.ceil(200 * Math.pow(1.12, l));
  return Q.fromNumber(c);
}
function jh(l, c) {
  let s = Q.ZERO;
  for (let r = 0; r < c; r++) s = s.add(cf(l + r));
  return s;
}
function mS(l, c) {
  let s = c,
    r = 0;
  for (;;) {
    const f = cf(l + r);
    if (s.lt(f) || ((s = s.sub(f)), r++, r > 1e4)) break;
  }
  return r;
}
function Ah(l) {
  return Math.pow(1.02, l);
}
const Th = { laser: 120 };
function hS(l) {
  const c = l + 1,
    s = Ah(l),
    r = Ah(c);
  return [
    { label: 'LASER DMG', before: Math.round(Th.laser * s), after: Math.round(Th.laser * r) },
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
function pS() {
  const l = G((T) => T.weaponLv),
    c = G((T) => T.alloy),
    s = G((T) => T.incrementWeaponLv),
    r = G((T) => T.setWeaponLv),
    f = G((T) => T.spendAlloy),
    d = cf(l),
    m = jh(l, 5),
    p = mS(l, c),
    g = jh(l, p),
    y = !c.lt(d),
    _ = p >= 5,
    b = p >= 1,
    A = hS(l);
  function M(T) {
    T === '+1'
      ? f(d) && s()
      : T === '+5'
        ? f(m) && r(l + 5)
        : T === 'MAX' && p > 0 && f(g) && r(l + p);
  }
  return u.jsxs('div', {
    className: xa.tab,
    role: 'tabpanel',
    'aria-label': '武器強化',
    children: [
      u.jsxs('div', {
        className: xa.topRow,
        children: [
          u.jsx(Y, {
            variant: 'caption',
            color: 'mid',
            className: xa.description,
            children: '全 4 武器に共通で効く強化です。',
          }),
          u.jsx(ji, { currency: 'alloy', value: c, size: 'sm' }),
        ],
      }),
      u.jsx(lf, {
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
        onUpgrade: M,
      }),
      u.jsxs(wl, {
        variant: 'sunken',
        padding: 'md',
        className: xa.previewCard,
        children: [
          u.jsx(Y, {
            variant: 'label',
            color: 'dim',
            className: xa.previewLabel,
            children: '次 Lv での効果プレビュー',
          }),
          u.jsx('div', {
            className: xa.impactGrid,
            children: A.map((T, D) =>
              u.jsxs(
                'div',
                {
                  className: [xa.impactRow, D > 0 ? xa.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    u.jsx(Y, {
                      variant: 'caption',
                      color: 'mid',
                      className: xa.impactLabel,
                      children: T.label,
                    }),
                    u.jsxs('span', {
                      className: xa.impactValues,
                      children: [
                        u.jsx(Yn, {
                          value: T.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: T.suffix,
                          decimals: T.suffix === 'm' ? 1 : 0,
                        }),
                        u.jsx('span', { className: xa.arrow, children: '→' }),
                        u.jsx(Yn, {
                          value: T.after,
                          size: 'sm',
                          accentColor: 'secondary',
                          suffix: T.suffix,
                          decimals: T.suffix === 'm' ? 1 : 0,
                        }),
                      ],
                    }),
                  ],
                },
                T.label
              )
            ),
          }),
        ],
      }),
    ],
  });
}
const v1 = q.createContext(null);
function yS({ children: l, initialScreen: c }) {
  const [s, r] = q.useState(c ?? 'title'),
    f = q.useCallback((d) => {
      r(d);
    }, []);
  return u.jsx(v1.Provider, { value: { screen: s, navigate: f }, children: l });
}
function Zn() {
  const l = q.useContext(v1);
  if (!l) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return l;
}
const gS = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function vS(l = {}) {
  const { initialTab: c = 'details' } = l,
    [s, r] = q.useState(c),
    { screen: f, navigate: d } = Zn();
  return u.jsx(El, {
    header: u.jsx(Bc, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => d('preparation'),
      tabBar: u.jsx(co, { tabs: gS, value: s, onChange: r, variant: 'underline', fullWidth: !0 }),
    }),
    footer: u.jsx(Dc, { active: f, onChange: (m) => d(m) }),
    children: u.jsxs('div', {
      className: bv.content,
      children: [s === 'details' && u.jsx(N2, {}), s === 'upgrade' && u.jsx(pS, {})],
    }),
  });
}
const _S = '_root_1ozz7_1',
  bS = '_battleFooter_1ozz7_10',
  SS = '_overlayLayer_1ozz7_14',
  Du = { root: _S, battleFooter: bS, overlayLayer: SS },
  xS = {
    elite: { color: 'var(--c-warning)', label: 'ELITE', glow: '0 0 16px rgba(246,185,74,0.6)' },
    boss: { color: 'var(--c-danger)', label: 'BOSS', glow: '0 0 24px rgba(255,77,109,0.7)' },
    'battle-start': {
      color: 'var(--c-primary)',
      label: 'BATTLE START',
      glow: '0 0 20px rgba(80,220,255,0.7)',
    },
  };
function Eh({ kind: l = 'elite', name: c, duration: s = 1600, onDone: r }) {
  const d = `app-${q.useId().replace(/:/g, '')}`,
    m = xS[l],
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
              u.jsx(Y, {
                variant: 'label',
                className: `${d}-label`,
                style: { color: m.color, fontSize: 12, letterSpacing: '0.32em' },
                children: m.label,
              }),
              c != null &&
                c !== '' &&
                u.jsx(Y, {
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
function jS({ waveNumber: l, duration: c = 1100, onDone: s }) {
  const f = `wv-${q.useId().replace(/:/g, '')}`,
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
            u.jsx(Y, {
              variant: 'label',
              color: 'primary',
              style: { fontSize: 11 },
              children: 'WAVE',
            }),
            u.jsx(Y, {
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
const AS = '_root_paca6_3',
  TS = '_field_paca6_21',
  ES = '_rangeCircle_paca6_35',
  MS = '_machine_paca6_46',
  wS = '_machineRingOuter_paca6_59',
  NS = '_pin_paca6_69',
  zS = '_enemy_paca6_79',
  vl = {
    root: AS,
    field: TS,
    rangeCircle: ES,
    machine: MS,
    machineRingOuter: wS,
    pin: NS,
    enemy: zS,
  },
  CS = '_wrap_14rhu_1',
  RS = { wrap: CS };
function OS({
  x: l,
  y: c,
  radius: s = 12,
  color: r = 'var(--c-warning)',
  duration: f = 520,
  delayMs: d = 0,
  onDone: m,
}) {
  const p = q.useId().replace(/:/g, 'bl'),
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
        className: `${p}-wrap ${RS.wrap}`,
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
const DS = '_shell_g836j_1',
  BS = '_inner_g836j_8',
  LS = '_ball_g836j_14',
  $S = '_highlight_g836j_23',
  Fs = { shell: DS, inner: BS, ball: LS, highlight: $S };
function HS({
  x1: l = 50,
  y1: c = 50,
  x2: s = 80,
  y2: r = 20,
  duration: f = 480,
  size: d = 3.4,
  onDone: m,
}) {
  const [p, g] = q.useState(!1);
  q.useEffect(() => {
    const A = setTimeout(() => {
        g(!0);
      }, 20),
      M = setTimeout(() => {
        m == null || m();
      }, f + 20);
    return () => {
      (clearTimeout(A), clearTimeout(M));
    };
  }, []);
  const y = p ? s : l,
    _ = p ? r : c,
    b = (Math.atan2(r - c, s - l) * 180) / Math.PI;
  return u.jsx('div', {
    className: Fs.shell,
    style: {
      left: `${y}%`,
      top: `${_}%`,
      width: `${d}vmin`,
      height: `${d}vmin`,
      transition: `left ${f}ms cubic-bezier(.4,0,.6,1), top ${f}ms cubic-bezier(.4,0,.6,1)`,
    },
    children: u.jsxs('div', {
      className: Fs.inner,
      style: { transform: `rotate(${b}deg)` },
      children: [
        u.jsx('div', { className: Fs.ball }),
        u.jsx('div', {
          className: Fs.highlight,
          style: { width: `${d * 0.32}vmin`, height: `${d * 0.32}vmin` },
        }),
      ],
    }),
  });
}
const kS = '_svg_gil20_1',
  US = { svg: kS };
function qS({
  points: l,
  color: c = 'var(--c-primary)',
  segmentMs: s = 90,
  jaggedness: r = 2.2,
  subdivisions: f = 4,
  delayMs: d = 0,
  onDone: m,
}) {
  const g = `chn-${q.useId().replace(/:/g, '')}`,
    y = l.length >= 2,
    _ = q.useMemo(() => {
      if (!y) return '';
      const M = [];
      for (let T = 0; T < l.length - 1; T++) {
        const D = l[T],
          R = l[T + 1],
          Z = R.x - D.x,
          V = R.y - D.y,
          se = Math.hypot(Z, V) || 1,
          U = -V / se,
          he = Z / se;
        T === 0 && M.push(D);
        for (let Te = 1; Te < f; Te++) {
          const ae = Te / f,
            Re = D.x + Z * ae,
            nt = D.y + V * ae,
            et = (Math.random() - 0.5) * 2 * r;
          M.push({ x: Re + U * et, y: nt + he * et });
        }
        M.push(R);
      }
      return M.map((T, D) => `${D === 0 ? 'M' : 'L'}${T.x.toFixed(2)} ${T.y.toFixed(2)}`).join(' ');
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
        className: US.svg,
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
function VS({
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
  const b = `ct-${q.useId().replace(/:/g, '')}`,
    A = m === 'ccw' ? -1 : 1;
  q.useEffect(() => {
    if (g != null && y != null) {
      const V = setTimeout(y, g);
      return () => {
        clearTimeout(V);
      };
    }
  }, [g, y]);
  const M = (r / (s * 2)) * 100,
    T = (r / (s * 4)) * 100,
    D = `
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
      height: ${M}%;
      margin-top: -${T}%;
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
    R = (V) =>
      `M 10 ${V * 3.5} ` +
      Array.from({ length: 9 }, (se, U) => {
        const he = 10 + U * 10;
        return `L ${he + 4} ${V * 8} L ${he + 8} ${V * 3.5} `;
      }).join(''),
    Z = [];
  for (let V = 0; V < f; V++) {
    const se = (360 / f) * V,
      U = 30 * A,
      he = (U * Math.PI) / 180,
      Te = s * Math.cos(he),
      ae = s * Math.sin(he),
      Re = `M 0 0 L ${s} 0 A ${s} ${s} 0 0 ${U > 0 ? 1 : 0} ${Te.toFixed(2)} ${ae.toFixed(2)} Z`;
    (Z.push(
      u.jsx(
        'svg',
        {
          className: `${b}-sweep`,
          viewBox: `0 0 ${s} ${s}`,
          style: { transform: `rotate(${se - U}deg)`, transformOrigin: '0 0' },
          preserveAspectRatio: 'none',
          children: u.jsx('path', { d: Re, fill: p, opacity: 0.18 }),
        },
        `sweep-${V}`
      )
    ),
      Z.push(
        u.jsxs(
          'svg',
          {
            className: `${b}-blade`,
            viewBox: '0 -10 100 20',
            style: { transform: `rotate(${se}deg)` },
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
                d: R(-1),
                fill: p,
                opacity: 0.85,
                stroke: p,
                strokeWidth: 0.6,
                strokeLinejoin: 'round',
              }),
              u.jsx('path', {
                d: R(1),
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
          `blade-${V}`
        )
      ));
  }
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: D } }),
      u.jsxs('div', {
        className: `${b}-hub`,
        children: [u.jsx('div', { className: `${b}-orbit` }), Z],
      }),
    ],
  });
}
const GS = '_root_14p1r_1',
  YS = { root: GS };
function ZS({ value: l, x: c, y: s, crit: r = !1, duration: f = 800, onDone: d }) {
  const m = q.useId().replace(/:/g, 'dp'),
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
        className: `${m} ${YS.root}`,
        onAnimationEnd: d,
        children: u.jsx(Yn, {
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
const XS = '_wrap_14rhu_1',
  KS = { wrap: XS },
  Mh = 8;
function QS({ x: l, y: c, color: s = 'var(--c-text-mid)', duration: r = 480, onDone: f }) {
  const d = q.useId().replace(/:/g, 'ed'),
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
    g = Array.from({ length: Mh }, (y, _) =>
      u.jsx('div', { className: `${d}-shard`, style: { '--a': `${(_ * 360) / Mh}deg` } }, _)
    );
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      u.jsxs('div', {
        className: `${d}-wrap ${KS.wrap}`,
        style: { left: `${l}%`, top: `${c}%` },
        onAnimationEnd: f,
        children: [u.jsx('div', { className: `${d}-flash` }), g],
      }),
    ],
  });
}
const WS = '_wrap_14rhu_1',
  JS = { wrap: WS };
function FS({ x: l, y: c, color: s = 'var(--c-primary-hi)', duration: r = 220, onDone: f }) {
  const d = q.useId().replace(/:/g, 'eh'),
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
        className: `${d}-w ${JS.wrap}`,
        style: { left: `${l}%`, top: `${c}%` },
        onAnimationEnd: f,
        children: u.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const IS = '_beam_14ieu_1',
  PS = { beam: IS };
function ex({
  x1: l,
  y1: c,
  x2: s,
  y2: r,
  color: f = 'var(--c-primary)',
  duration: d = 220,
  onDone: m,
}) {
  const p = q.useId().replace(/:/g, 'lb'),
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
      u.jsx('div', { className: `${p} ${PS.beam}`, onAnimationEnd: m }),
    ],
  });
}
const tx = '_beam_14ieu_1',
  ax = { beam: tx };
function nx({
  x: l,
  y: c,
  angle: s = 0,
  duration: r = 600,
  color: f = 'var(--c-primary-hi)',
  onDone: d,
}) {
  const m = q.useId().replace(/:/g, 'mb'),
    p = `
    @keyframes ${m}-grow {
      0%   { transform: rotate(${s}deg) scaleX(0)   scaleY(0.3); opacity: 0.6; }
      18%  { transform: rotate(${s}deg) scaleX(1)   scaleY(1);   opacity: 1; }
      70%  { transform: rotate(${s}deg) scaleX(1)   scaleY(1);   opacity: 1; }
      100% { transform: rotate(${s}deg) scaleX(1)   scaleY(0.2); opacity: 0; }
    }
    .${m} {
      position: absolute;
      left: ${l}%; top: ${c}%;
      width: 150%; height: 12px;
      background: linear-gradient(90deg, ${f}, transparent 95%);
      box-shadow: 0 0 18px ${f}, 0 0 36px ${f}88;
      transform-origin: 0 50%;
      animation: ${m}-grow ${r}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
      border-radius: 6px;
    }
    @media (prefers-reduced-motion: reduce) {
      .${m} { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      u.jsx('div', { className: `${m} ${ax.beam}`, onAnimationEnd: d }),
    ],
  });
}
const lx = '_wrap_14rhu_1',
  ix = { wrap: lx };
function cx({ x: l, y: c, size: s = 80, color: r = 'var(--c-secondary)' }) {
  const f = q.useId().replace(/:/g, 'oa'),
    d = `
    @keyframes ${f}-rot   { from { transform: rotate(0deg);   } to { transform: rotate(360deg); } }
    @keyframes ${f}-rot-r { from { transform: rotate(360deg); } to { transform: rotate(0deg);   } }
    @keyframes ${f}-pulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
    .${f}-w {
      position: absolute;
      left: ${l}%; top: ${c}%;
      width: ${s}px; height: ${s}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: var(--z-fx-field);
      animation: ${f}-pulse 1.2s ease-in-out infinite;
    }
    .${f}-r1 {
      position: absolute; inset: 0; border-radius: 50%;
      border: 2px dashed ${r};
      box-shadow: 0 0 16px ${r}88;
      animation: ${f}-rot 2.4s linear infinite;
    }
    .${f}-r2 {
      position: absolute; inset: 12px; border-radius: 50%;
      border: 1px solid ${r};
      opacity: 0.6;
      animation: ${f}-rot-r 3.6s linear infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .${f}-w, .${f}-r1, .${f}-r2 { animation: none; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: d } }),
      u.jsxs('div', {
        className: `${f}-w ${ix.wrap}`,
        children: [u.jsx('div', { className: `${f}-r1` }), u.jsx('div', { className: `${f}-r2` })],
      }),
    ],
  });
}
const sx = { screw: 'var(--c-screw)', bolt: 'var(--c-bolt)', alloy: 'var(--c-alloy)' };
function ox({ x: l, y: c, targetX: s, targetY: r, iconName: f, duration: d = 400, onDone: m }) {
  const g = `pk-${q.useId().replace(/:/g, '')}`,
    y = sx[f],
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
      u.jsx('div', { className: g, onAnimationEnd: m, children: u.jsx(Ye, { name: f, size: 18 }) }),
    ],
  });
}
function rx({
  x: l = 50,
  y: c = 60,
  fromY: s = 0,
  duration: r = 320,
  color: f = 'var(--c-primary)',
  segments: d = 7,
  jaggedness: m = 3.5,
  onDone: p,
}) {
  const y = `thn-${q.useId().replace(/:/g, '')}`,
    _ = q.useMemo(() => {
      const T = [{ x: l, y: s }],
        R = (c - s) / d;
      for (let Z = 1; Z < d; Z++) {
        const V = s + R * Z,
          se = l + (Math.random() - 0.5) * 2 * m;
        T.push({ x: se, y: V });
      }
      return (
        T.push({ x: l, y: c }),
        T.map((Z, V) => `${V === 0 ? 'M' : 'L'}${Z.x.toFixed(2)} ${Z.y.toFixed(2)}`).join(' ')
      );
    }, []),
    b = Math.round(r * 0.35),
    A = Math.round(r * 0.65),
    M = `
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
      u.jsx('style', { dangerouslySetInnerHTML: { __html: M } }),
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
const ux = '_root_5xktu_1',
  fx = '_shape_5xktu_11',
  dx = '_hpBar_5xktu_22',
  mx = '_hpFill_5xktu_32',
  Is = { root: ux, shape: fx, hpBar: dx, hpFill: mx },
  hx = {
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
  px = { standard: !1, swift: !0, tough: !1, elite: !1, miniboss: !0, boss: !0 };
function yx(l) {
  switch (l) {
    case 'frozen':
      return 'hue-rotate(180deg) saturate(1.6) brightness(1.05)';
    case 'burning':
      return 'hue-rotate(-25deg) saturate(1.4) brightness(1.1)';
    default:
      return 'none';
  }
}
function gx({ color: l }) {
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
function vx({ color: l }) {
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
function _x({ color: l }) {
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
function bx({ color: l }) {
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
function Sx({ color: l }) {
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
function xx({ color: l }) {
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
const jx = { standard: gx, swift: vx, tough: _x, elite: bx, miniboss: Sx, boss: xx };
function Ax(l, c) {
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
function Tx({ type: l, size: c, hp: s, showHp: r, facing: f = 0, status: d = 'normal' }) {
  const m = hx[l],
    p = c ?? m.size,
    g = jx[l],
    y = r ?? m.defaultHp,
    _ = px[l] ? `${(f * 180) / Math.PI}deg` : '0deg',
    b = l === 'boss' ? 8 : l === 'miniboss' ? 6 : 4,
    A = { width: p, height: p },
    M = {
      width: p,
      height: p,
      color: m.color,
      filter: `drop-shadow(0 0 ${b}px ${m.glow}) ${yx(d)}`,
      transform: `rotate(${_})`,
    },
    T = { width: p + 4, height: l === 'boss' ? 4 : 3 },
    D = {
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
    className: Is.root,
    style: A,
    children: [
      u.jsx('div', { className: Is.shape, style: M, children: u.jsx(g, { color: m.color }) }),
      y &&
        s != null &&
        u.jsx('div', {
          className: Is.hpBar,
          style: T,
          children: u.jsx('div', { className: Is.hpFill, style: D }),
        }),
    ],
  });
}
function wh(l) {
  switch (l) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}
function Ex({
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
  showOverdriveAura: M = !1,
  cutterRotateMs: T,
  range: D,
  dummyPins: R = [],
}) {
  const Z = c.x,
    V = c.y,
    se = D * 2;
  return u.jsx('div', {
    className: vl.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: u.jsxs('div', {
      className: vl.field,
      children: [
        u.jsx('div', {
          className: vl.rangeCircle,
          style: { left: `${Z}%`, top: `${V}%`, width: `${se}%`, height: `${se}%` },
          'aria-hidden': !0,
        }),
        R.map((U) =>
          u.jsx(
            'div',
            {
              className: vl.pin,
              style: { left: `${U.x}%`, top: `${U.y}%`, color: wh(U.kind) },
              'aria-hidden': !0,
              children: u.jsx(Ye, {
                name: 'target',
                size: U.kind === 'boss' ? 18 : U.kind === 'elite' ? 16 : 14,
                color: wh(U.kind),
              }),
            },
            U.id
          )
        ),
        l.map((U) => {
          const he = Ax(U.kind, U.subtype),
            Te = U.frozenUntilMs != null,
            ae = U.burnUntilMs != null,
            Re = Te ? 'frozen' : ae ? 'burning' : 'normal',
            nt = parseFloat(U.hp.toString()),
            et = Math.max(1e-4, parseFloat(U.maxHp.toString())),
            Ve = Math.max(0, Math.min(1, nt / et)),
            Ie = Math.atan2(V - U.position.y, Z - U.position.x);
          return u.jsx(
            'div',
            {
              className: vl.enemy,
              style: {
                left: `${U.position.x}%`,
                top: `${U.position.y}%`,
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
              },
              children: u.jsx(Tx, { type: he, hp: Ve, status: Re, facing: Ie }),
            },
            U.id
          );
        }),
        u.jsxs('div', {
          className: vl.machine,
          style: { left: `${Z}%`, top: `${V}%` },
          'aria-label': 'マシン',
          children: [
            u.jsx('span', { className: vl.machineRingOuter, 'aria-hidden': !0 }),
            u.jsx(Ye, { name: 'tower', size: 22, color: 'var(--c-primary)' }),
          ],
        }),
        A && u.jsx(VS, { cx: Z, cy: V, rotateMs: T }),
        M && u.jsx(cx, { x: Z, y: V }),
        s.map((U) =>
          u.jsx(
            ZS,
            {
              value: Number(U.value.toString()),
              x: U.x,
              y: U.y,
              crit: U.crit,
              onDone: () => (d == null ? void 0 : d(U.id)),
            },
            U.id
          )
        ),
        r.map((U) =>
          u.jsx(FS, { x: U.x, y: U.y, onDone: () => (m == null ? void 0 : m(U.id)) }, U.id)
        ),
        f.map((U) =>
          u.jsx(QS, { x: U.x, y: U.y, onDone: () => (p == null ? void 0 : p(U.id)) }, U.id)
        ),
        _.map((U) =>
          u.jsx(
            ox,
            {
              x: U.x,
              y: U.y,
              targetX: 50,
              targetY: 4,
              iconName: U.iconName,
              onDone: () => (b == null ? void 0 : b(U.id)),
            },
            U.id
          )
        ),
        g.map((U) => {
          switch (U.kind) {
            case 'laser':
              return u.jsx(
                ex,
                {
                  x1: U.x1,
                  y1: U.y1,
                  x2: U.x2,
                  y2: U.y2,
                  onDone: () => (y == null ? void 0 : y(U.id)),
                },
                U.id
              );
            case 'cannonShell':
              return u.jsx(
                HS,
                {
                  x1: U.x1,
                  y1: U.y1,
                  x2: U.x2,
                  y2: U.y2,
                  duration: U.durationMs,
                  onDone: () => (y == null ? void 0 : y(U.id)),
                },
                U.id
              );
            case 'blast':
              return u.jsx(
                OS,
                {
                  x: U.x,
                  y: U.y,
                  delayMs: U.delayMs,
                  onDone: () => (y == null ? void 0 : y(U.id)),
                },
                U.id
              );
            case 'thunderStrike':
              return u.jsx(
                rx,
                {
                  x: U.x,
                  y: U.y,
                  duration: U.durationMs,
                  onDone: () => (y == null ? void 0 : y(U.id)),
                },
                U.id
              );
            case 'chain':
              return u.jsx(
                qS,
                {
                  points: U.points,
                  delayMs: U.delayMs,
                  onDone: () => (y == null ? void 0 : y(U.id)),
                },
                U.id
              );
            case 'megaBeam':
              return u.jsx(
                nx,
                { x: U.x, y: U.y, angle: U.angle, onDone: () => (y == null ? void 0 : y(U.id)) },
                U.id
              );
          }
        }),
      ],
    }),
  });
}
const Mx = '_root_wr80h_2',
  wx = '_topRow_wr80h_13',
  Nx = '_weaponSlots_wr80h_21',
  zx = '_activeArea_wr80h_29',
  Cx = '_activeButton_wr80h_37',
  Rx = '_activeDisabled_wr80h_57',
  Ox = '_modeToggle_wr80h_66',
  Dx = '_modeToggleOn_wr80h_89',
  Bx = '_sheetToggleButton_wr80h_96',
  Lx = '_bottomRow_wr80h_108',
  $x = '_currencyArea_wr80h_115',
  Hx = '_sysButtons_wr80h_127',
  ha = {
    root: Mx,
    topRow: wx,
    weaponSlots: Nx,
    activeArea: zx,
    activeButton: Cx,
    activeDisabled: Rx,
    modeToggle: Ox,
    modeToggleOn: Dx,
    sheetToggleButton: Bx,
    bottomRow: Lx,
    currencyArea: $x,
    sysButtons: Hx,
  },
  kx = '_badge_4fy54_1',
  Ux = '_glow_4fy54_90',
  qx = '_iconLeft_4fy54_118',
  xc = {
    badge: kx,
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
    glow: Ux,
    iconLeft: qx,
  };
function $c({
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
      className: [xc.badge, xc[`variant-${p}`], xc[`size-${r}`], f ? xc.glow : '']
        .filter(Boolean)
        .join(' '),
      style: m,
      children: [
        d != null && u.jsx('span', { className: xc.iconLeft, 'aria-hidden': 'true', children: d }),
        g,
      ],
    })
  );
}
const Vx = '_root_x9cjr_1',
  Gx = '_svg_x9cjr_9',
  Yx = '_track_x9cjr_15',
  Zx = '_arc_x9cjr_19',
  Xx = '_center_x9cjr_28',
  Kx = '_labelText_x9cjr_37',
  pi = { root: Vx, svg: Gx, track: Yx, arc: Zx, center: Xx, labelText: Kx },
  Qx = { xs: 20, sm: 32, md: 48, lg: 64 },
  Wx = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  Jx = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function _1({
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
  const _ = typeof s == 'number' ? s : Qx[s],
    b =
      c != null
        ? Math.min(Math.max(0, l), Math.max(1, c)) / Math.max(1, c)
        : Math.min(Math.max(0, l), 100) / 100,
    A = c != null ? Math.min(Math.max(0, l), Math.max(1, c)) : l,
    M = c != null ? Math.max(1, c) : 100,
    T = Wx[r],
    D = d ? Jx[r] : void 0,
    R = _ / 2,
    Z = R - f / 2,
    V = 2 * Math.PI * Z,
    se = V * (1 - b),
    he = m || p || y != null,
    Te = g ?? `${Math.round(b * 100)}%`;
  return u.jsxs('span', {
    className: pi.root,
    style: { width: _, height: _ },
    children: [
      u.jsxs('svg', {
        className: pi.svg,
        width: _,
        height: _,
        viewBox: `0 0 ${_} ${_}`,
        xmlns: 'http://www.w3.org/2000/svg',
        role: 'progressbar',
        'aria-valuenow': A,
        'aria-valuemin': 0,
        'aria-valuemax': M,
        'aria-label': g ?? `${A} / ${M}`,
        children: [
          u.jsx('circle', {
            className: pi.track,
            cx: R,
            cy: R,
            r: Z,
            fill: 'none',
            strokeWidth: f,
          }),
          u.jsx('circle', {
            className: pi.arc,
            cx: R,
            cy: R,
            r: Z,
            fill: 'none',
            stroke: T,
            strokeWidth: f,
            strokeLinecap: 'round',
            strokeDasharray: V,
            strokeDashoffset: se,
            style: D != null ? { filter: `drop-shadow(0 0 4px ${T})` } : void 0,
            transform: `rotate(-90 ${R} ${R})`,
          }),
        ],
      }),
      he &&
        u.jsx('span', {
          className: pi.center,
          children:
            y ?? u.jsx('span', { className: pi.labelText, style: { color: T }, children: Te }),
        }),
    ],
  });
}
const Fx = '_root_afe45_2',
  Ix = '_swapDisabled_afe45_14',
  Px = '_active_afe45_20',
  e5 = '_onCd_afe45_27',
  t5 = '_iconWrap_afe45_27',
  a5 = '_cdOverlay_afe45_47',
  n5 = '_cdProgress_afe45_57',
  l5 = '_swapOverlay_afe45_68',
  Hn = {
    root: Fx,
    swapDisabled: Ix,
    active: Px,
    onCd: e5,
    iconWrap: t5,
    cdOverlay: a5,
    cdProgress: n5,
    swapOverlay: l5,
  },
  i5 = { sm: 40, md: 52, lg: 64 },
  c5 = { sm: 18, md: 24, lg: 30 };
function s5({
  weapon: l,
  active: c = !1,
  ready: s = !1,
  cdProgress: r = 100,
  swapDisabled: f = !1,
  size: d = 'md',
  onClick: m,
}) {
  const p = i5[d],
    g = c5[d],
    y = r < 100,
    _ = [Hn.root, c ? Hn.active : '', y ? Hn.onCd : '', f ? Hn.swapDisabled : '']
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
        className: Hn.iconWrap,
        children: u.jsx(Ye, {
          name: l,
          size: g,
          color: c ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      y &&
        u.jsxs(u.Fragment, {
          children: [
            u.jsx('span', { className: Hn.cdOverlay, 'aria-hidden': 'true' }),
            u.jsx('span', {
              className: Hn.cdProgress,
              'aria-hidden': 'true',
              children: u.jsx(_1, {
                value: r,
                max: 100,
                size: p - 4,
                color: 'cd',
                thickness: d === 'sm' ? 2 : 3,
              }),
            }),
          ],
        }),
      f && u.jsx('span', { className: Hn.swapOverlay, 'aria-hidden': 'true' }),
    ],
  });
}
const Nh = ['laser', 'cannon', 'thunder', 'cutter'];
function o5({
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
  isWorkshopOpen: M = !1,
  onToggleWorkshop: T,
}) {
  const D = r > 0,
    R = d || D,
    Z = Nh.some((V) => V !== c && (s[V] ?? 100) < 100);
  return u.jsxs('div', {
    className: ha.root,
    children: [
      T != null &&
        u.jsx('button', {
          type: 'button',
          className: ha.sheetToggleButton,
          onClick: T,
          'aria-expanded': M,
          'aria-label': M ? 'アップグレードを閉じる' : 'アップグレードを開く',
          children: u.jsx($c, { text: 'アップグレード', variant: 'info', size: 'md', glow: !0 }),
        }),
      u.jsxs('div', {
        className: ha.topRow,
        children: [
          u.jsx('div', {
            className: ha.weaponSlots,
            children: Nh.map((V) =>
              u.jsx(
                s5,
                {
                  weapon: V,
                  active: V === c,
                  cdProgress: s[V] ?? 100,
                  swapDisabled: Z && V !== c,
                  size: 'md',
                  onClick: () => {
                    m(V);
                  },
                },
                V
              )
            ),
          }),
          u.jsxs('div', {
            className: ha.activeArea,
            children: [
              u.jsx('button', {
                type: 'button',
                className: [ha.activeButton, R ? ha.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: R ? void 0 : p,
                disabled: R,
                'aria-label': `アクティブスキル発動${D ? ' (クールダウン中)' : d ? ' (自動モード)' : ''}`,
                children: u.jsx(_1, {
                  value: D ? f - r : f,
                  max: f > 0 ? f : 1,
                  size: 64,
                  color: D ? 'cd' : 'primary',
                  glow: !D && !d,
                  thickness: 4,
                  children: u.jsx(Ye, {
                    name: 'lightning',
                    size: 26,
                    color: R ? 'var(--c-text-disabled)' : 'var(--c-secondary)',
                  }),
                }),
              }),
              u.jsx('button', {
                type: 'button',
                className: [ha.modeToggle, d ? ha.modeToggleOn : ''].filter(Boolean).join(' '),
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
        className: ha.bottomRow,
        children: [
          u.jsx('div', {
            className: ha.currencyArea,
            children: u.jsx(ji, { currency: 'screw', value: l, size: 'lg' }),
          }),
          u.jsxs('div', {
            className: ha.sysButtons,
            children: [
              u.jsx(zc, {
                icon: y ? 'play' : 'pause',
                label: y ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: y,
                onClick: _,
              }),
              u.jsx(zc, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: b,
              }),
              u.jsx(zc, {
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
const r5 = '_root_1y4n6_3',
  u5 = '_headerRow_1y4n6_13',
  f5 = '_hpValue_1y4n6_21',
  d5 = '_hpDivider_1y4n6_31',
  m5 = '_shieldBlock_1y4n6_36',
  h5 = '_srOnly_1y4n6_44',
  yi = { root: r5, headerRow: u5, hpValue: f5, hpDivider: d5, shieldBlock: m5, srOnly: h5 },
  p5 = '_root_1pi3d_2',
  y5 = '_sizeSm_1pi3d_11',
  g5 = '_sizeMd_1pi3d_15',
  v5 = '_sizeLg_1pi3d_19',
  _5 = '_fill_1pi3d_23',
  b5 = '_label_1pi3d_29',
  S5 = '_withTrailing_1pi3d_46',
  x5 = '_trailingLabel_1pi3d_56',
  kn = {
    root: p5,
    sizeSm: y5,
    sizeMd: g5,
    sizeLg: v5,
    fill: _5,
    label: b5,
    withTrailing: S5,
    trailingLabel: x5,
  },
  j5 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  A5 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function zh({
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
    M = j5[s],
    T = g || f === 'neon' ? A5[s] : void 0,
    D = { sm: kn.sizeSm, md: kn.sizeMd, lg: kn.sizeLg }[r],
    R = {
      width: `${A}%`,
      backgroundColor: M,
      ...(T != null ? { boxShadow: T } : {}),
      ...(y ? { marginLeft: 'auto' } : {}),
    },
    Z = m ?? `${b} / ${_}`,
    V = u.jsxs('div', {
      className: `${kn.root} ${D}`,
      role: 'progressbar',
      'aria-valuenow': b,
      'aria-valuemin': 0,
      'aria-valuemax': _,
      'aria-label': m ?? `${b} / ${_}`,
      children: [
        u.jsx('div', { className: kn.fill, style: R }),
        d && u.jsx('span', { className: kn.label, children: Z }),
      ],
    });
  return p == null
    ? V
    : u.jsxs('div', {
        className: kn.withTrailing,
        children: [V, u.jsx('span', { className: kn.trailingLabel, children: p })],
      });
}
const T5 = '_root_17jsg_2',
  E5 = '_boss_17jsg_10',
  M5 = '_header_17jsg_16',
  w5 = '_milestone_17jsg_23',
  N5 = '_milestoneText_17jsg_30',
  z5 = '_seconds_17jsg_40',
  C5 = '_timerTrack_17jsg_46',
  R5 = '_timerFill_17jsg_56',
  O5 = '_drainBar_17jsg_1',
  D5 = '_timerFillBoss_17jsg_74',
  B5 = '_timerFillPaused_17jsg_79',
  L5 = '_waveLabel_17jsg_102',
  ta = {
    root: T5,
    boss: E5,
    header: M5,
    milestone: w5,
    milestoneText: N5,
    seconds: z5,
    timerTrack: C5,
    timerFill: R5,
    drainBar: O5,
    timerFillBoss: D5,
    timerFillPaused: B5,
    'size-sm': '_size-sm_17jsg_98',
    waveLabel: L5,
    'size-md': '_size-md_17jsg_106',
    'size-lg': '_size-lg_17jsg_110',
  },
  $5 = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  };
function H5({
  waveNumber: l,
  secondsLeft: c,
  secondsMax: s,
  nextMilestone: r,
  showSeconds: f = !0,
  size: d = 'md',
  paused: m = !1,
  isBossWave: p = !1,
}) {
  const g = p || (r == null ? void 0 : r.kind) === 'boss',
    y = r != null ? $5[r.kind] : null,
    _ = Math.max(1, s);
  return u.jsxs('div', {
    className: [ta.root, ta[`size-${d}`], g ? ta.boss : ''].filter(Boolean).join(' '),
    children: [
      u.jsxs('div', {
        className: ta.header,
        children: [
          u.jsx($c, { text: `WAVE ${l}`, variant: 'tier' }),
          !p &&
            y != null &&
            r != null &&
            u.jsxs('span', {
              className: ta.milestone,
              style: { color: y.color },
              children: [
                u.jsx(Ye, { name: y.iconName, size: 12, color: y.color }),
                u.jsxs('span', { className: ta.milestoneText, children: [y.label, ' @', r.wave] }),
              ],
            }),
          p &&
            u.jsxs('span', {
              className: ta.milestone,
              style: { color: 'var(--c-secondary)' },
              children: [
                u.jsx(Ye, { name: 'skull', size: 12, color: 'var(--c-secondary)' }),
                u.jsx('span', { className: ta.milestoneText, children: 'BOSS WAVE' }),
              ],
            }),
          f &&
            !p &&
            u.jsx('span', {
              className: ta.seconds,
              children: u.jsxs(Y, {
                variant: 'numeric-s',
                color: 'mid',
                children: [Math.ceil(c), 's'],
              }),
            }),
        ],
      }),
      !p &&
        u.jsx('div', {
          className: ta.timerTrack,
          role: 'progressbar',
          'aria-label': `Wave ${l} timer`,
          'aria-valuemin': 0,
          'aria-valuemax': _,
          'aria-valuenow': Math.max(0, c),
          children: u.jsx(k5, { secondsRemaining: c, secondsMax: _, isBoss: g, paused: m }, l),
        }),
    ],
  });
}
function k5({ secondsRemaining: l, secondsMax: c, isBoss: s, paused: r }) {
  const [f] = q.useState(() => {
      const m = Math.max(0, Math.min(1, l / c)),
        p = Math.max(0.01, l);
      return { initialScale: m, durationSec: p };
    }),
    d = [ta.timerFill, s ? ta.timerFillBoss : '', r ? ta.timerFillPaused : '']
      .filter(Boolean)
      .join(' ');
  return u.jsx('div', {
    className: d,
    style: { '--start-scale': f.initialScale, animationDuration: `${f.durationSec}s` },
  });
}
function U5({
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
  const M = _ ?? (y ? { wave: d, kind: 'boss' } : void 0),
    T = s != null && r != null,
    D = Ch(l, c),
    R = T ? Ch(s, r) : 0;
  return u.jsxs('div', {
    className: yi.root,
    role: 'group',
    'aria-label': 'バトル状態',
    children: [
      u.jsxs('div', {
        className: yi.headerRow,
        children: [
          u.jsx($c, { variant: 'tier', tier: f, size: 'md', glow: !0 }),
          u.jsx(Y, { variant: 'label', color: 'dim', style: { fontSize: 10 }, children: 'HP' }),
          u.jsxs('span', {
            className: yi.hpValue,
            'aria-label': `HP ${l.toDisplay()} / ${c.toDisplay()}`,
            children: [
              u.jsx(Yn, {
                value: l,
                size: 'sm',
                accentColor: b ? 'danger' : 'text',
                glow: b,
                style: { fontSize: 14 },
              }),
              u.jsx('span', { className: yi.hpDivider, children: '/' }),
              u.jsx(Yn, { value: c, size: 'sm', accentColor: 'dim', style: { fontSize: 11 } }),
            ],
          }),
          T &&
            u.jsxs('span', {
              className: yi.shieldBlock,
              children: [
                u.jsx(Y, {
                  variant: 'label',
                  color: 'primary',
                  style: { fontSize: 9.5 },
                  children: 'SHLD',
                }),
                u.jsx(Yn, {
                  value: s,
                  size: 'sm',
                  accentColor: 'primary',
                  style: { fontSize: 11 },
                }),
              ],
            }),
        ],
      }),
      u.jsx(zh, { value: D, max: 100, color: D <= 30 ? 'hp-low' : 'hp', size: 'md' }),
      T && u.jsx(zh, { value: R, max: 100, color: 'shield', size: 'sm' }),
      u.jsx(H5, {
        waveNumber: d,
        secondsLeft: p,
        secondsMax: g,
        nextMilestone: M,
        showSeconds: !1,
        size: 'sm',
        paused: A,
        isBossWave: y,
      }),
      u.jsxs('span', { className: yi.srOnly, 'aria-hidden': 'false', children: [d, '/', m] }),
    ],
  });
}
function Ch(l, c) {
  const s = parseFloat(l.toString()),
    r = parseFloat(c.toString());
  return r === 0 ? 0 : Math.max(0, Math.min(100, (s / r) * 100));
}
const q5 = '_card_1o3jz_1',
  V5 = '_header_1o3jz_8',
  G5 = '_soundSection_1o3jz_13',
  Y5 = '_sliderRow_1o3jz_19',
  Z5 = '_sliderLabel_1o3jz_26',
  X5 = '_sliderValue_1o3jz_31',
  K5 = '_divider_1o3jz_38',
  Q5 = '_actions_1o3jz_44',
  ja = {
    card: q5,
    header: V5,
    soundSection: G5,
    sliderRow: Y5,
    sliderLabel: Z5,
    sliderValue: X5,
    divider: K5,
    actions: Q5,
  },
  W5 = '_button_1oo6e_1',
  J5 = '_fullWidth_1oo6e_109',
  F5 = '_iconLeft_1oo6e_113',
  I5 = '_iconRight_1oo6e_114',
  P5 = '_iconSpacer_1oo6e_120',
  e3 = '_label_1oo6e_124',
  sn = {
    button: W5,
    'variant-primary': '_variant-primary_1oo6e_28',
    'variant-secondary': '_variant-secondary_1oo6e_42',
    'variant-danger': '_variant-danger_1oo6e_56',
    'variant-ghost': '_variant-ghost_1oo6e_70',
    'size-sm': '_size-sm_1oo6e_85',
    'size-md': '_size-md_1oo6e_93',
    'size-lg': '_size-lg_1oo6e_101',
    fullWidth: J5,
    iconLeft: F5,
    iconRight: I5,
    iconSpacer: P5,
    label: e3,
  };
function kt({
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
    className: [sn.button, sn[`variant-${c}`], sn[`size-${s}`], r ? sn.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: m,
    onClick: p,
    'aria-disabled': m,
    children: [
      f != null && u.jsx('span', { className: sn.iconLeft, 'aria-hidden': 'true', children: f }),
      u.jsx('span', { className: sn.label, children: l }),
      d != null
        ? u.jsx('span', { className: sn.iconRight, 'aria-hidden': 'true', children: d })
        : f != null
          ? u.jsx('span', {
              className: `${sn.iconRight} ${sn.iconSpacer}`,
              'aria-hidden': 'true',
              children: f,
            })
          : null,
    ],
  });
}
const t3 = '_overlay_1i1z1_12',
  a3 = '_fullscreen_1i1z1_21',
  n3 = '_absolute_1i1z1_27',
  l3 = '_alignCenter_1i1z1_33',
  i3 = '_alignTop_1i1z1_38',
  c3 = '_alignBottom_1i1z1_44',
  s3 = '_content_1i1z1_50',
  jl = {
    overlay: t3,
    fullscreen: a3,
    absolute: n3,
    alignCenter: l3,
    alignTop: i3,
    alignBottom: c3,
    content: s3,
  },
  o3 = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Rh = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  r3 = { center: jl.alignCenter, top: jl.alignTop, bottom: jl.alignBottom };
function sf({
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
    b = (D) => {
      D.stopPropagation();
    },
    A = o3[f],
    M = typeof p == 'number' ? p : (Rh[p] ?? Rh.overlay),
    T = {
      background: `rgba(2, 4, 10, ${A})`,
      zIndex: M,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...g,
    };
  return u.jsx('div', {
    className: [jl.overlay, l ? jl.fullscreen : jl.absolute, r3[m]].join(' '),
    style: T,
    onClick: _,
    role: 'presentation',
    'aria-modal': 'true',
    children: u.jsx('div', { className: jl.content, onClick: b, children: c }),
  });
}
const u3 = '_wrapper_131tr_1',
  f3 = '_disabled_131tr_5',
  d3 = '_input_131tr_18',
  Ps = {
    wrapper: u3,
    disabled: f3,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: d3,
  },
  Yu = ({
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
      className: [Ps.wrapper, Ps[`color-${d}`], m ? Ps.disabled : ''].join(' '),
      style: y,
      children: u.jsx('input', {
        type: 'range',
        className: Ps.input,
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
  m3 = '_dialog_49iek_13',
  h3 = '_card_49iek_20',
  p3 = '_titleRow_49iek_27',
  y3 = '_titleIcon_49iek_33',
  g3 = '_title_49iek_27',
  v3 = '_message_49iek_46',
  _3 = '_actions_49iek_50',
  b3 = '_variantDanger_49iek_57',
  Un = {
    dialog: m3,
    card: h3,
    titleRow: p3,
    titleIcon: y3,
    title: g3,
    message: v3,
    actions: _3,
    variantDanger: b3,
  };
function b1({
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
    ? u.jsx(sf, {
        open: l,
        onClose: p,
        dismissible: !0,
        children: u.jsx('div', {
          className: [Un.dialog, g === 'danger' ? Un.variantDanger : ''].filter(Boolean).join(' '),
          children: u.jsxs(wl, {
            variant: 'elevated',
            padding: 'lg',
            className: Un.card,
            children: [
              u.jsxs('div', {
                className: Un.titleRow,
                children: [
                  r != null &&
                    u.jsx('span', {
                      className: Un.titleIcon,
                      'aria-hidden': 'true',
                      children: u.jsx(Ye, {
                        name: r,
                        size: 20,
                        color: g === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  u.jsx(Y, { variant: 'heading-3', as: 'h2', className: Un.title, children: c }),
                ],
              }),
              s != null &&
                s.length > 0 &&
                u.jsx(Y, { variant: 'body', color: 'mid', className: Un.message, children: s }),
              u.jsxs('div', {
                className: Un.actions,
                children: [
                  u.jsx(kt, { label: d, variant: 'ghost', fullWidth: !0, onClick: p }),
                  u.jsx(kt, {
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
function S3({
  open: l,
  bgmVolume: c,
  seVolume: s,
  onBgmChange: r,
  onSeChange: f,
  onRetreat: d,
  onClose: m,
}) {
  const [p, g] = q.useState(!1);
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
      u.jsx(sf, {
        open: l,
        onClose: m,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !p,
        children: u.jsxs(wl, {
          variant: 'elevated',
          padding: 'lg',
          className: ja.card,
          children: [
            u.jsx('div', {
              className: ja.header,
              children: u.jsx(Y, {
                variant: 'heading-2',
                as: 'h2',
                align: 'center',
                children: 'メニュー',
              }),
            }),
            u.jsxs('div', {
              className: ja.soundSection,
              children: [
                u.jsxs('div', {
                  className: ja.sliderRow,
                  children: [
                    u.jsx(Y, {
                      variant: 'label',
                      color: 'mid',
                      className: ja.sliderLabel,
                      children: 'BGM',
                    }),
                    u.jsx(Y, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: ja.sliderValue,
                      children: Math.round(c * 100).toString(),
                    }),
                  ],
                }),
                u.jsx(Yu, { value: c, min: 0, max: 1, step: 0.01, onChange: r, color: 'primary' }),
                u.jsxs('div', {
                  className: ja.sliderRow,
                  children: [
                    u.jsx(Y, {
                      variant: 'label',
                      color: 'mid',
                      className: ja.sliderLabel,
                      children: 'SE',
                    }),
                    u.jsx(Y, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: ja.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                u.jsx(Yu, { value: s, min: 0, max: 1, step: 0.01, onChange: f, color: 'primary' }),
              ],
            }),
            u.jsx('div', { className: ja.divider, role: 'separator' }),
            u.jsxs('div', {
              className: ja.actions,
              children: [
                u.jsx(kt, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: y }),
                u.jsx(kt, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: m }),
              ],
            }),
          ],
        }),
      }),
      u.jsx(b1, {
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
const x3 = '_card_1fzt0_2',
  j3 = '_header_1fzt0_14',
  A3 = '_statusText_1fzt0_19',
  T3 = '_section_1fzt0_23',
  E3 = '_sectionTitle_1fzt0_29',
  M3 = '_statsGrid_1fzt0_35',
  w3 = '_statItem_1fzt0_41',
  N3 = '_rewardList_1fzt0_52',
  z3 = '_rewardCurrency_1fzt0_58',
  C3 = '_patchList_1fzt0_66',
  R3 = '_patchItem_1fzt0_72',
  O3 = '_actions_1fzt0_87',
  jt = {
    card: x3,
    header: j3,
    statusText: A3,
    section: T3,
    sectionTitle: E3,
    statsGrid: M3,
    statItem: w3,
    rewardList: N3,
    rewardCurrency: z3,
    patchList: C3,
    patchItem: R3,
    actions: O3,
  },
  D3 = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  B3 = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function L3(l) {
  const c = Math.floor(l / 60),
    s = Math.floor(l % 60);
  return `${c.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function $3({
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
  const g = D3[c],
    y = B3[c];
  return u.jsx(sf, {
    open: l,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: u.jsxs(wl, {
      variant: 'elevated',
      padding: 'lg',
      className: jt.card,
      children: [
        u.jsx('div', {
          className: jt.header,
          children: u.jsx(Y, {
            variant: 'heading-1',
            as: 'h2',
            color: y,
            align: 'center',
            className: jt.statusText,
            children: g,
          }),
        }),
        u.jsxs('div', {
          className: jt.section,
          children: [
            u.jsx(Y, {
              variant: 'label',
              color: 'mid',
              className: jt.sectionTitle,
              children: 'バトル記録',
            }),
            u.jsxs('div', {
              className: jt.statsGrid,
              children: [
                u.jsxs('div', {
                  className: jt.statItem,
                  children: [
                    u.jsx(Y, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    u.jsx(Y, { variant: 'numeric-m', color: 'primary', children: s.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: jt.statItem,
                  children: [
                    u.jsx(Y, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    u.jsx(Y, { variant: 'numeric-m', color: 'primary', children: r.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: jt.statItem,
                  children: [
                    u.jsx(Y, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    u.jsx(Y, { variant: 'numeric-m', color: 'primary', children: f.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: jt.statItem,
                  children: [
                    u.jsx(Y, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    u.jsx(Y, { variant: 'numeric-m', color: 'primary', children: L3(d) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        u.jsxs('div', {
          className: jt.section,
          children: [
            u.jsx(Y, {
              variant: 'label',
              color: 'mid',
              className: jt.sectionTitle,
              children: '獲得',
            }),
            u.jsxs('div', {
              className: jt.rewardList,
              children: [
                u.jsx('div', {
                  className: jt.rewardCurrency,
                  children: u.jsx(ji, { currency: 'bolt', value: m.bolt, size: 'lg' }),
                }),
                u.jsx('div', {
                  className: jt.rewardCurrency,
                  children: u.jsx(ji, { currency: 'alloy', value: m.alloy, size: 'lg' }),
                }),
                m.patches.length > 0 &&
                  u.jsx('div', {
                    className: jt.patchList,
                    children: m.patches.map((_, b) =>
                      u.jsxs(
                        'div',
                        {
                          className: jt.patchItem,
                          children: [
                            u.jsx(Y, { variant: 'body', truncate: !0, children: _.name }),
                            u.jsxs(Y, {
                              variant: 'caption',
                              color: 'mid',
                              children: ['Tier ', _.tier.toString()],
                            }),
                            u.jsxs(Y, {
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
                  u.jsx(Y, { variant: 'caption', color: 'dim', children: 'パッチドロップなし' }),
              ],
            }),
          ],
        }),
        u.jsx('div', {
          className: jt.actions,
          children: u.jsx(kt, {
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
const H3 = '_root_1tank_3',
  k3 = '_inner_1tank_20',
  U3 = '_header_1tank_28',
  q3 = '_headerText_1tank_35',
  V3 = '_grid_1tank_44',
  jc = { root: H3, inner: k3, header: U3, headerText: q3, grid: V3 };
function G3({ open: l, screw: c, levels: s, onUpgrade: r, onClose: f }) {
  return l
    ? u.jsx('section', {
        className: jc.root,
        role: 'dialog',
        'aria-modal': 'false',
        'aria-label': 'ラン中ワークショップ',
        children: u.jsxs('div', {
          className: jc.inner,
          children: [
            u.jsxs('div', {
              className: jc.header,
              children: [
                u.jsxs('div', {
                  className: jc.headerText,
                  children: [
                    u.jsx(Y, {
                      variant: 'heading-3',
                      style: { fontSize: 14, lineHeight: 1.2 },
                      children: 'ラン中ワークショップ',
                    }),
                    u.jsx(Y, {
                      variant: 'caption',
                      color: 'dim',
                      style: { fontSize: 10.5 },
                      children: 'ラン終了で全リセット',
                    }),
                  ],
                }),
                u.jsx(ji, { currency: 'screw', value: c, size: 'md' }),
                f != null &&
                  u.jsx(zc, {
                    icon: 'chevron-down',
                    label: '閉じる',
                    variant: 'ghost',
                    size: 'sm',
                    onClick: f,
                  }),
              ],
            }),
            u.jsx('div', {
              className: jc.grid,
              children: Ih.map((d) => {
                const m = s[d.key],
                  p = dn(m),
                  g = dn(m + 1),
                  y = af(d, m),
                  _ = Ph(d, m, 5),
                  { totalCost: b, lvDelta: A } = e1(d, m, c),
                  M = Q.fromNumber(y),
                  T = Q.fromNumber(_),
                  D = c.gte(M),
                  R = c.gte(T),
                  Z = A > 0;
                return u.jsx(
                  lf,
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
                      { amount: '+1', cost: M, disabled: !D },
                      { amount: '+5', cost: T, disabled: !R },
                      { amount: 'MAX', cost: b, disabled: !Z },
                    ],
                    onUpgrade: (V) => {
                      V === '+1'
                        ? r(d.key, 1)
                        : V === '+5'
                          ? r(d.key, 5)
                          : V === 'MAX' && r(d.key, 'max');
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
const Y3 = '_root_9fvdn_2',
  Z3 = { root: Y3 },
  Bu = [
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
function X3({ items: l = [], showTower: c = !1, towerContent: s = null, cycleSeconds: r = 24 }) {
  const d = `ssfx-${q.useId().replace(/:/g, '')}`,
    m = Bu.map((b, A) => {
      const M = 100 / b.length,
        T = b
          .map(([D, R], Z) => {
            const V = Z * M;
            return `
          ${V}%               { left: ${D}%; top: ${R}%; opacity: 0; }
          ${(V + 3).toFixed(2)}%   { left: ${D}%; top: ${R}%; opacity: 1; }
          ${(V + M - 7).toFixed(2)}%  { left: ${D}%; top: ${R}%; opacity: 1; }
          ${(V + M - 3).toFixed(2)}%  { left: ${D}%; top: ${R}%; opacity: 0; }
        `;
          })
          .join('');
      return `@keyframes ${d}-drift-${A + 1} { ${T} 100% { opacity: 0; } }`;
    }).join(`
`),
    p = Bu.map(
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
        const M = (A % Bu.length) + 1,
          T = -(A * (r / Math.max(_.length, 1)));
        return u.jsx(
          'div',
          {
            className: `${d}-slot ${d}-p${M}${A === 0 ? ` ${d}-rm-show` : ''}`,
            style: { animationDelay: `${T}s` },
            children: b,
          },
          A
        );
      }),
    ],
  });
}
function K3({ open: l, onClose: c }) {
  return l
    ? u.jsx('div', {
        className: Z3.root,
        onClick: c,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (s) => {
          (s.key === 'Enter' || s.key === ' ') && c();
        },
        children: u.jsx(X3, {
          showTower: !0,
          towerContent: u.jsx(Ye, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
const Tl = { HP: 10, ATK: 2, SPD: 10, SPAWN_INTERVAL: 2, HP_GROWTH: 1.8, ATK_GROWTH: 1.4 };
function Q3(l) {
  return l <= 10
    ? 1 + 0.074 * (l - 1)
    : l <= 20
      ? 1 + 0.074 * 9 + 0.133 * (l - 10)
      : 1 + 0.074 * 9 + 0.133 * 10 + 0.2 * (l - 20);
}
function W3(l) {
  return l <= 10
    ? 1 + 0.037 * (l - 1)
    : l <= 20
      ? 1 + 0.037 * 9 + 0.067 * (l - 10)
      : 1 + 0.037 * 9 + 0.067 * 10 + 0.1 * (l - 20);
}
function J3(l) {
  return l <= 10
    ? 1 + 0.019 * (l - 1)
    : l <= 20
      ? 1 + 0.019 * 9 + 0.033 * (l - 10)
      : 1 + 0.019 * 9 + 0.033 * 10 + 0.05 * (l - 20);
}
function F3(l) {
  return 1 + 0.2 * Math.max(0, l - 1);
}
function I3(l) {
  return Math.pow(1.5, Math.max(0, l - 1));
}
function P3(l) {
  let c = Q.fromNumber(Tl.HP);
  for (let s = 1; s < l; s++) c = c.mulNumber(Tl.HP_GROWTH);
  return c;
}
function e4(l) {
  let c = Q.fromNumber(Tl.ATK);
  for (let s = 1; s < l; s++) c = c.mulNumber(Tl.ATK_GROWTH);
  return c;
}
const t4 = { standard: 1, swift: 0.6, tough: 5 },
  a4 = { standard: 1, swift: 0.5, tough: 1 },
  n4 = { standard: 1, swift: 2, tough: 0.5 },
  l4 = { elite: 10, miniboss: 50, boss: 250 },
  i4 = { elite: 2.5, miniboss: 5, boss: 8 },
  c4 = {
    elite: { screw: 10, bolt: 10, alloyChance: 0.3, alloyAmount: 1 },
    miniboss: { screw: 50, bolt: 50, alloyChance: 1, alloyAmount: 1 },
    boss: { screw: 250, bolt: 250, alloyChance: 1, alloyAmount: 5 },
  },
  s4 = { standard: 1, swift: 2, tough: 5 },
  o4 = { standard: 1, swift: 2, tough: 5 };
function Oh(l, c, s, r) {
  const f = P3(l),
    d = e4(l),
    m = Q3(c),
    p = W3(c),
    g = F3(c) * I3(l);
  if (s === 'normal') {
    const T = r ?? 'standard',
      D = f.mulNumber(t4[T]).mulNumber(m),
      R = d.mulNumber(a4[T]).mulNumber(p),
      Z = Tl.SPD * n4[T];
    return {
      kind: 'normal',
      subtype: T,
      hp: D,
      atk: R,
      speed: Z,
      reward: {
        screw: Math.max(1, Math.round(s4[T] * g)),
        bolt: o4[T],
        alloyChance: 0,
        alloyAmount: 0,
      },
    };
  }
  const y = s,
    _ = f.mulNumber(l4[y]).mulNumber(m),
    b = d.mulNumber(i4[y]).mulNumber(p),
    A = Tl.SPD,
    M = c4[y];
  return {
    kind: s,
    hp: _,
    atk: b,
    speed: A,
    reward: { ...M, screw: Math.max(1, Math.round(M.screw * g)) },
  };
}
function Dh(l, c, s, r) {
  const f = r() < 0.5 ? 0 : 100,
    d = r() * 100;
  return { ...l, id: c, spawnedAtMs: s, position: { x: f, y: d }, maxHp: l.hp };
}
const r4 = 30,
  Zu = 26;
function u4(l) {
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
function f4(l) {
  const c = [];
  for (let s = 1; s <= r4; s++) {
    const r = J3(s),
      f = Tl.SPAWN_INTERVAL / r,
      d = u4(s);
    let m;
    (s === 5 || s === 15 || s === 25
      ? (m = 'elite')
      : s === 10 || s === 20
        ? (m = 'miniboss')
        : s === 30 && (m = 'boss'),
      c.push({
        waveIndex: s,
        tier: l,
        durationSec: Zu,
        spawnIntervalSec: f,
        normalSpawnTable: d,
        eliteKind: m,
      }));
  }
  return c;
}
function d4(l, c, s, r, f) {
  const d = [],
    m = c / 1e3,
    p = s / 1e3,
    g = Math.floor(m / l.spawnIntervalSec),
    y = Math.floor(p / l.spawnIntervalSec),
    _ = g - y;
  for (let M = 0; M < _; M++) {
    const T = m4(l.normalSpawnTable, r),
      D = Oh(l.tier, l.waveIndex, 'normal', T);
    d.push(Dh(D, f(), c, r));
  }
  const A = l.durationSec - 1;
  if (l.eliteKind !== void 0 && p < A && m >= A) {
    const M = Oh(l.tier, l.waveIndex, l.eliteKind);
    d.push(Dh(M, f(), c, r));
  }
  return d;
}
function m4(l, c) {
  const s = c();
  let r = 0;
  for (const f of l) if (((r += f.weight), s < r)) return f.subtype;
  return l[l.length - 1].subtype;
}
const Bh = 50,
  Lh = 50;
function h4(l, c, s) {
  if (l.frozenUntilMs != null && s != null && l.frozenUntilMs > s) return l;
  const r = Bh - l.position.x,
    f = Lh - l.position.y,
    d = Math.sqrt(r * r + f * f);
  if (d <= 0) return l;
  const m = l.speed * c;
  if (m <= 0) return l;
  if (m >= d) return { ...l, position: { x: Bh, y: Lh } };
  const p = m / d;
  return { ...l, position: { x: l.position.x + r * p, y: l.position.y + f * p } };
}
const p4 = 10,
  y4 = 0.05,
  g4 = 1.5;
function Lu({ machineMaxHp: l }) {
  return {
    baseAttack: Q.fromNumber(p4),
    defense: Q.ZERO,
    damageReduction: 0,
    critRate: y4,
    critMultiplier: g4,
    maxHp: l.isZero() ? Q.fromNumber(1) : l,
    hpRegen: Q.ZERO,
  };
}
function v4(l, c) {
  switch (l) {
    case 'laser':
      return fo(c).attackPerSec;
    case 'cannon':
      return uo(c).attackPerSec;
    case 'thunder':
      return mo(c).attackPerSec;
    case 'cutter':
      return Lc(c).attackPerSec;
  }
}
function _4({
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
      const p = fo(c),
        g = { ...p, damageMul: p.damageMul * m };
      return {
        hits: v2(s, g, r, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cannon': {
      const p = uo(c),
        g = { ...p, damageMul: p.damageMul * m },
        y = a2(s, g, r, f);
      return {
        hits: y.hits.map((_) => ({ enemyId: _.enemyId, damage: _.damage, crit: _.crit })),
        impactX: y.blastX,
        impactY: y.blastY,
      };
    }
    case 'thunder': {
      const p = mo(c),
        g = { ...p, damageMul: p.damageMul * m };
      return {
        hits: E2(s, g, r, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cutter': {
      const p = Lc(c),
        g = { ...p, damageMul: p.damageMul * m },
        y = d2(s, g, r, d, f);
      return {
        hits: y.hits.map((_) => ({ enemyId: _.enemyId, damage: _.damage, crit: _.crit })),
        cutterAngle: y.angle,
      };
    }
  }
}
function b4(l, c, s) {
  if (c.type !== 'onWaveClear') return null;
  const r = l.tier;
  return { boltGain: Q.fromNumber(5 * r) };
}
function S4(l, c, s) {
  if (c.type !== 'onDropRoll') return null;
  const r = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * r) / (r + 20);
  return s() >= m ? null : { dropMultiplier: 2 };
}
function x4(l, c, s) {
  return c.type !== 'onAttack' || c.enemyKind === 'normal'
    ? null
    : { damageMultiplier: 1 + 0.05 * l.tier };
}
function j4(l, c, s) {
  if (c.type !== 'onAttack') return null;
  const r = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * r) / (r + 20);
  return s() >= m ? null : { burnSec: 1 + 0.2 * r };
}
function A4(l, c, s) {
  if (c.type !== 'onHit') return null;
  const r = l.tier,
    f = 0.03,
    m = f + ((0.3 - f) * r) / (r + 20);
  return s() >= m ? null : { overrideReceivedDamage: Q.ZERO };
}
function T4(l, c, s) {
  if (c.type !== 'onAttack') return null;
  const r = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * r) / (r + 20);
  return s() >= m ? null : { extraShot: !0 };
}
function E4(l, c, s) {
  if (c.type !== 'onAttack') return null;
  const r = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * r) / (r + 20);
  return s() >= m ? null : { freeze: !0, freezeSec: 1 + 0.2 * r };
}
function M4(l, c, s) {
  if (c.type !== 'onAttack' || c.enemyKind !== 'normal') return null;
  const r = l.tier,
    f = 0.02,
    m = f + ((0.2 - f) * r) / (r + 20);
  return s() >= m ? null : { instantKill: !0 };
}
function w4(l, c, s) {
  if (c.type !== 'onKill') return null;
  const r = l.tier,
    f = Math.ceil(0.5 * r);
  return { heal: Q.fromNumber(f) };
}
function N4(l, c, s) {
  if (c.type !== 'onWaveClear') return null;
  const r = l.tier;
  return { heal: Q.fromNumber(5 * r) };
}
const z4 = {
  instantKill: M4,
  bossKiller: x4,
  doubleShot: T4,
  damageImmune: A4,
  killHeal: w4,
  shieldRegen: N4,
  bonusDrop: S4,
  boltCast: b4,
  freezeHit: E4,
  burnHit: j4,
};
function C4(l, c) {
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
function Ac(l, c, s) {
  let r = {};
  for (const f of l) {
    const d = z4[f.name];
    if (d === void 0) continue;
    const m = d(f, c, s);
    m !== null && (r = C4(r, m));
  }
  return r;
}
const R4 = 1;
function O4(l, c) {
  if (c) return 0;
  const s = l / 1e3;
  return Math.min(R4, Math.max(0, s));
}
const D4 = 1;
function B4(l, c, s, r, f) {
  if (s >= r) {
    const d = Math.max(0, (c - D4) * 1e3);
    return l >= d && f === 0 ? 'advanceTier' : 'continue';
  }
  return l < c * 1e3 ? 'continue' : 'advanceWave';
}
function L4(l, c, s, r) {
  const f = l !== c;
  return { resetElapsed: f || s !== r, resetEnemies: f };
}
const un = 50,
  fn = 50;
function eo(l) {
  const c = l.x - un,
    s = l.y - fn;
  return Math.sqrt(c * c + s * s);
}
const S1 = 10,
  $4 = 5,
  H4 = 5;
function k4(l, c, s) {
  let r = l.x - c.x,
    f = l.y - c.y;
  const d = Math.sqrt(r * r + f * f);
  return (
    d === 0 ? ((r = 1), (f = 0)) : ((r /= d), (f /= d)),
    { x: Math.max(0, Math.min(100, l.x + r * s)), y: Math.max(0, Math.min(100, l.y + f * s)) }
  );
}
const x1 = 60,
  U4 = 14,
  q4 = {
    laser: 'laserShoot',
    cannon: 'cannonShoot',
    thunder: 'thunderShoot',
    cutter: 'cutterShoot',
  },
  V4 = {
    laser: 'activeLaser',
    cannon: 'activeCannon',
    thunder: 'activeThunder',
    cutter: 'activeCutter',
  },
  G4 = 0.5;
function Y4({ range: l, paused: c = !1 }) {
  const s = q.useRef(c);
  s.current = c;
  const r = q.useRef(null),
    f = q.useRef(0),
    d = q.useRef(0),
    m = q.useRef(0),
    p = q.useRef([]),
    g = q.useRef(0),
    y = q.useRef(0),
    _ = q.useRef(0),
    b = q.useRef(0),
    A = q.useRef(0),
    M = q.useRef(0),
    T = q.useRef(0),
    D = q.useRef(0),
    R = q.useRef(0),
    Z = q.useRef(new Set()),
    V = q.useRef({ active: !1, remainingSec: 0, attackSpeedMul: 1, damageMul: 1 }),
    se = q.useRef([]),
    [U, he] = q.useState([]),
    [Te, ae] = q.useState([]),
    [Re, nt] = q.useState([]),
    [et, Ve] = q.useState([]),
    [Ie, Ut] = q.useState([]),
    [Lt, ht] = q.useState([]),
    [O, X] = q.useState(0),
    [ne, xe] = q.useState(!1),
    Ee = G((me) => me.isRunActive),
    x = G((me) => me.currentTier),
    H = G((me) => me.currentWave),
    K = q.useMemo(() => f4(x), [x]),
    W = q.useRef(x),
    le = q.useRef(H);
  q.useEffect(() => {
    const me = L4(W.current, x, le.current, H);
    ((W.current = x),
      (le.current = H),
      me.resetElapsed && ((d.current = 0), (m.current = 0), X(0)),
      me.resetEnemies && ((p.current = []), he([]), (se.current = [])));
  }, [x, H]);
  const fe = q.useCallback((me) => {
      ae((_t) => _t.filter((Qe) => Qe.id !== me));
    }, []),
    je = q.useCallback((me) => {
      nt((_t) => _t.filter((Qe) => Qe.id !== me));
    }, []),
    pt = q.useCallback((me) => {
      Ve((_t) => _t.filter((Qe) => Qe.id !== me));
    }, []),
    Ke = q.useCallback((me) => {
      Ut((_t) => _t.filter((Qe) => Qe.id !== me));
    }, []),
    Ba = q.useCallback((me) => {
      ht((_t) => _t.filter((Qe) => Qe.id !== me));
    }, []),
    Ma = q.useCallback(() => {
      const me = G.getState();
      if (me.activeCdSec > 0 || me.machineHp.isZero() || !me.isRunActive || !me.triggerActive(x1))
        return !1;
      Xe.play(V4[me.currentWeapon]);
      const Qe = Lu({ machineMaxHp: me.machineMaxHp }),
        ie = dn(me.runWorkshopLevels.attackMul),
        ga = [],
        ot = [],
        bt = (Oe) => {
          const At = new Map(Oe.map((He) => [He.enemyId, He]));
          p.current = p.current.map((He) => {
            const tt = At.get(He.id);
            return tt == null
              ? He
              : ((b.current += 1),
                ga.push({
                  id: `de-${b.current}`,
                  x: He.position.x,
                  y: He.position.y,
                  value: tt.damage,
                  crit: tt.crit ?? !1,
                }),
                { ...He, hp: He.hp.sub(tt.damage) });
          });
        };
      switch (me.currentWeapon) {
        case 'laser': {
          const Oe = fo(me.weaponLv),
            At = { ...Oe, damageMul: Oe.damageMul * ie };
          let He = 0;
          if (p.current.length > 0) {
            const Rt = p.current.reduce((La, $a) => (eo($a.position) < eo(La.position) ? $a : La)),
              De = Rt.position.x - un,
              aa = Rt.position.y - fn;
            He = (Math.atan2(aa, De) * 180) / Math.PI;
          }
          const tt = b2(Qe, At, p.current, He, un, fn);
          (bt(tt.hits.map((Rt) => ({ enemyId: Rt.enemyId, damage: Rt.damage }))),
            (M.current += 1),
            ot.push({ id: `pe-${M.current}`, kind: 'megaBeam', x: un, y: fn, angle: He }));
          break;
        }
        case 'cannon': {
          const Oe = uo(me.weaponLv),
            At = { ...Oe, damageMul: Oe.damageMul * ie },
            He = n2(Qe, At, p.current),
            tt = 480,
            Rt = R.current;
          for (const De of He.shots) {
            ((M.current += 1),
              ot.push({
                id: `pe-${M.current}`,
                kind: 'cannonShell',
                x1: un,
                y1: fn,
                x2: De.blastX,
                y2: De.blastY,
                durationMs: tt,
              }),
              (M.current += 1),
              ot.push({
                id: `pe-${M.current}`,
                kind: 'blast',
                x: De.blastX,
                y: De.blastY,
                delayMs: tt,
              }));
            for (const aa of De.hits)
              se.current.push({
                enemyId: aa.enemyId,
                damage: aa.damage,
                crit: !1,
                freeze: !1,
                applyAtMs: Rt + tt,
              });
          }
          break;
        }
        case 'thunder': {
          const Oe = mo(me.weaponLv),
            At = { ...Oe, damageMul: Oe.damageMul * ie },
            He = M2(Qe, At, p.current),
            tt = [{ x: un, y: fn }];
          for (const Rt of He.hits) {
            const De = p.current.find((aa) => aa.id === Rt.enemyId);
            De != null && tt.push({ x: De.position.x, y: De.position.y });
          }
          (tt.length > 1 &&
            ((M.current += 1), ot.push({ id: `pe-${M.current}`, kind: 'chain', points: tt })),
            bt(He.hits));
          break;
        }
        case 'cutter': {
          const Oe = Lc(me.weaponLv);
          ((V.current = m2(Oe)), xe(!0));
          break;
        }
      }
      return (
        ga.length > 0 && ae((Oe) => [...Oe, ...ga]),
        ot.length > 0 && Ve((Oe) => [...Oe, ...ot]),
        !0
      );
    }, []);
  return (
    q.useEffect(() => {
      if (!Ee) return;
      const me = (_t) => {
        const Qe = _t - f.current;
        f.current = _t;
        const ie = G.getState(),
          ga = ie.machineHp.isZero(),
          ot = O4(Qe, ie.isPaused || ga || s.current);
        if (ot > 0) {
          R.current += ot * 1e3;
          const bt = R.current,
            Oe = Array.from(ie.equippedPatches.values());
          (ie.tickCooldowns(ot),
            ie.isAutoActive && ie.activeCdSec <= 0 && Ma(),
            V.current.active && ((V.current = h2(V.current, ot)), V.current.active || xe(!1)),
            (m.current = d.current),
            (d.current += ot * 1e3));
          const At = K[ie.currentWave - 1];
          if (At != null) {
            const He = d4(
              At,
              d.current,
              m.current,
              Math.random,
              () => ((g.current += 1), `e-${ie.currentTier}-${ie.currentWave}-${g.current}`)
            );
            if (He.length > 0) {
              p.current = [...p.current, ...He];
              const J = He.filter((re) => re.kind !== 'normal');
              if (J.length > 0) {
                const re = J.map((pe) => {
                  D.current += 1;
                  const we = pe.kind,
                    We =
                      we === 'boss'
                        ? `TIER ${ie.currentTier} BOSS`
                        : we === 'miniboss'
                          ? `MINI BOSS T${ie.currentTier}W${ie.currentWave}`
                          : `ELITE T${ie.currentTier}W${ie.currentWave}`;
                  return { id: `ap-${D.current}`, kind: we, name: We };
                });
                ht((pe) => [...pe, ...re]);
              }
            }
            ((p.current = p.current.map((J) => h4(J, ot, bt))),
              (p.current = p.current.map((J) => {
                let re = J;
                if (re.burnUntilMs != null && re.burnPerSec != null && re.burnUntilMs > bt) {
                  const we = re.burnPerSec.mulNumber(ot);
                  re = { ...re, hp: re.hp.sub(we) };
                }
                const pe = {};
                return (
                  re.frozenUntilMs != null && re.frozenUntilMs <= bt && (pe.frozenUntilMs = void 0),
                  re.burnUntilMs != null &&
                    re.burnUntilMs <= bt &&
                    ((pe.burnUntilMs = void 0), (pe.burnPerSec = void 0)),
                  Object.keys(pe).length > 0 && (re = { ...re, ...pe }),
                  re
                );
              })));
            const tt = [];
            se.current = se.current.filter((J) => (J.applyAtMs <= bt ? (tt.push(J), !1) : !0));
            const Rt = [];
            if (tt.length > 0) {
              const J = new Map(tt.map((re) => [re.enemyId, re]));
              p.current = p.current.map((re) => {
                const pe = J.get(re.id);
                if (pe == null) return re;
                let we = { ...re, hp: re.hp.sub(pe.damage) };
                if (pe.freeze && pe.freezeSec != null && pe.freezeSec > 0) {
                  const We = bt + pe.freezeSec * 1e3;
                  we = { ...we, frozenUntilMs: Math.max(we.frozenUntilMs ?? 0, We) };
                }
                if (pe.burnSec != null && pe.burnSec > 0) {
                  const We = bt + pe.burnSec * 1e3,
                    $t = pe.damage.mulNumber(0.3),
                    Be = we.burnPerSec;
                  we = {
                    ...we,
                    burnUntilMs: Math.max(we.burnUntilMs ?? 0, We),
                    burnPerSec: Be != null && Be.gt($t) ? Be : $t,
                  };
                }
                return we;
              });
              for (const re of tt) {
                const pe = p.current.find((we) => we.id === re.enemyId);
                ((b.current += 1),
                  Rt.push({
                    id: `de-${b.current}`,
                    x: (pe == null ? void 0 : pe.position.x) ?? 50,
                    y: (pe == null ? void 0 : pe.position.y) ?? 50,
                    value: re.damage,
                    crit: re.crit,
                  }));
              }
            }
            const De = ie.runWorkshopLevels.attackMul,
              aa = ie.runWorkshopLevels.attackSpeedMul,
              La = dn(De),
              $a = dn(aa),
              mn = v4(ie.currentWeapon, ie.weaponLv),
              Ti = V.current.active ? V.current.attackSpeedMul : 1,
              Kn = Math.min(S1, mn * $a * Ti),
              Qn = Kn > 0 ? 1e3 / Kn : 1 / 0;
            y.current += ot * 1e3;
            let Nl = 0;
            const wa = 10,
              yt = [],
              Tt = [];
            for (; y.current >= Qn && Nl < wa; ) {
              const J = ie.currentWeapon === 'cutter' ? U4 : l,
                re = p.current
                  .map((We) => ({ enemy: We, dist: eo(We.position) }))
                  .filter(({ dist: We }) => We <= J)
                  .sort((We, $t) => We.dist - $t.dist)
                  .map(({ enemy: We }) => We);
              if (re.length === 0) {
                y.current = Math.min(y.current, Qn);
                break;
              }
              ((y.current -= Qn), (Nl += 1), Xe.play(q4[ie.currentWeapon]));
              const pe = Lu({ machineMaxHp: ie.machineMaxHp }),
                we = _4({
                  weapon: ie.currentWeapon,
                  weaponLv: ie.weaponLv,
                  machine: pe,
                  enemiesInRange: re,
                  rng: Math.random,
                  cutterAngleDeg: _.current,
                  attackMul: La,
                });
              if ((we.cutterAngle != null && (_.current = we.cutterAngle), we.hits.length > 0)) {
                const We = we.hits.map((Be) => {
                  const Ae = p.current.find((at) => at.id === Be.enemyId);
                  if (Ae == null) return { ...Be, freeze: !1, freezeSec: void 0, burnSec: void 0 };
                  const Me = Ac(Oe, { type: 'onAttack', enemyKind: Ae.kind }, Math.random);
                  let Ze = Be.damage;
                  return (
                    Me.damageMultiplier != null &&
                      Me.damageMultiplier !== 1 &&
                      (Ze = Ze.mulNumber(Me.damageMultiplier)),
                    Me.extraShot && (Ze = Ze.add(Be.damage)),
                    Me.instantKill && (Ze = Ae.hp),
                    {
                      ...Be,
                      damage: Ze,
                      freeze: Me.freeze === !0,
                      freezeSec: Me.freezeSec,
                      burnSec: Me.burnSec,
                    }
                  );
                });
                if (ie.currentWeapon === 'cannon')
                  for (const Ae of We)
                    se.current.push({
                      enemyId: Ae.enemyId,
                      damage: Ae.damage,
                      crit: Ae.crit ?? !1,
                      freeze: Ae.freeze,
                      freezeSec: Ae.freezeSec,
                      burnSec: Ae.burnSec,
                      applyAtMs: bt + 480,
                    });
                else {
                  const Be = new Map(We.map((Ae) => [Ae.enemyId, Ae]));
                  p.current = p.current.map((Ae) => {
                    const Me = Be.get(Ae.id);
                    if (Me == null) return Ae;
                    let Ze = { ...Ae, hp: Ae.hp.sub(Me.damage) };
                    if (Me.freeze && Me.freezeSec != null && Me.freezeSec > 0) {
                      const at = bt + Me.freezeSec * 1e3;
                      Ze = { ...Ze, frozenUntilMs: Math.max(Ze.frozenUntilMs ?? 0, at) };
                    }
                    if (Me.burnSec != null && Me.burnSec > 0) {
                      const at = bt + Me.burnSec * 1e3,
                        Et = Me.damage.mulNumber(0.3),
                        Na = Ze.burnPerSec;
                      Ze = {
                        ...Ze,
                        burnUntilMs: Math.max(Ze.burnUntilMs ?? 0, at),
                        burnPerSec: Na != null && Na.gt(Et) ? Na : Et,
                      };
                    }
                    return Ze;
                  });
                  for (const Ae of We) {
                    const Me = p.current.find((Ze) => Ze.id === Ae.enemyId);
                    ((b.current += 1),
                      yt.push({
                        id: `de-${b.current}`,
                        x: (Me == null ? void 0 : Me.position.x) ?? 50,
                        y: (Me == null ? void 0 : Me.position.y) ?? 50,
                        value: Ae.damage,
                        crit: Ae.crit,
                      }));
                  }
                }
                const $t = We.map((Be) => p.current.find((Ae) => Ae.id === Be.enemyId))
                  .filter((Be) => Be != null)
                  .map((Be) => ({ x: Be.position.x, y: Be.position.y }));
                if (ie.currentWeapon === 'laser')
                  for (const Be of $t)
                    ((M.current += 1),
                      Tt.push({
                        id: `pj-${M.current}`,
                        kind: 'laser',
                        x1: un,
                        y1: fn,
                        x2: Be.x,
                        y2: Be.y,
                      }));
                else if (ie.currentWeapon === 'cannon') {
                  const Ae = we.impactX,
                    Me = we.impactY;
                  Ae != null &&
                    Me != null &&
                    ((M.current += 1),
                    Tt.push({
                      id: `pj-${M.current}`,
                      kind: 'cannonShell',
                      x1: un,
                      y1: fn,
                      x2: Ae,
                      y2: Me,
                      durationMs: 480,
                    }),
                    (M.current += 1),
                    Tt.push({ id: `pj-${M.current}`, kind: 'blast', x: Ae, y: Me, delayMs: 480 }));
                } else if (ie.currentWeapon === 'thunder' && $t.length > 0)
                  for (const Ae of $t)
                    ((M.current += 1),
                      Tt.push({
                        id: `pj-${M.current}`,
                        kind: 'thunderStrike',
                        x: Ae.x,
                        y: Ae.y,
                        durationMs: 320,
                      }));
              }
            }
            const gt = [...yt, ...Rt];
            (gt.length > 0 && ae((J) => [...J, ...gt]), Tt.length > 0 && Ve((J) => [...J, ...Tt]));
            const F = dn(ie.runWorkshopLevels.screwGainMul),
              Wn = [],
              Ha = [],
              Jn = [];
            let ka = Q.ZERO,
              Ua = Q.ZERO,
              na = Q.ZERO,
              qa = Q.ZERO;
            for (const J of p.current)
              if (J.hp.lte(Q.ZERO)) {
                ((A.current += 1),
                  Wn.push({ id: `dh-${A.current}`, x: J.position.x, y: J.position.y }));
                const re = Ac(Oe, { type: 'onKill', enemyKind: J.kind }, Math.random);
                re.heal != null && (qa = qa.add(re.heal));
                const we =
                    Ac(
                      Oe,
                      {
                        type: 'onDropRoll',
                        baseDrops: {
                          screw: J.reward.screw,
                          bolt: J.reward.bolt,
                          alloy: J.reward.alloyAmount,
                        },
                      },
                      Math.random
                    ).dropMultiplier ?? 1,
                  We = J.reward.screw;
                We > 0 &&
                  ((ka = ka.add(Q.fromNumber(We * F * we))),
                  (T.current += 1),
                  Ha.push({
                    id: `pk-${T.current}`,
                    x: J.position.x,
                    y: J.position.y,
                    iconName: 'screw',
                  }));
                const $t = J.reward.bolt;
                ($t > 0 &&
                  (J.kind !== 'normal' || Math.random() < G4) &&
                  ((Ua = Ua.add(Q.fromNumber($t * we))),
                  (T.current += 1),
                  Ha.push({
                    id: `pk-${T.current}`,
                    x: J.position.x,
                    y: J.position.y,
                    iconName: 'bolt',
                  })),
                  J.reward.alloyChance > 0 &&
                    J.reward.alloyAmount > 0 &&
                    Math.random() < J.reward.alloyChance &&
                    ((na = na.add(Q.fromNumber(J.reward.alloyAmount * we))),
                    (T.current += 1),
                    Ha.push({
                      id: `pk-${T.current}`,
                      x: J.position.x,
                      y: J.position.y,
                      iconName: 'alloy',
                    })),
                  Xe.play(J.kind === 'boss' || J.kind === 'miniboss' ? 'bossKill' : 'enemyKill'));
              } else Jn.push(J);
            (qa.isZero() || ie.setMachineHp(ie.machineHp.add(qa)),
              Wn.length > 0 && ((p.current = Jn), nt((J) => [...J, ...Wn])),
              Ha.length > 0 && Ut((J) => [...J, ...Ha]),
              ka.isZero() || ie.addScrew(ka),
              Ua.isZero() || ie.addBolt(Ua),
              na.isZero() || ie.addAlloy(na));
            const Fn = Lu({ machineMaxHp: ie.machineMaxHp });
            let In = Q.ZERO;
            const Ei = new Set();
            if (
              ((p.current = p.current.map((J) => {
                if (eo(J.position) > $4) return J;
                const pe = Qb(J.atk, Fn);
                return (
                  (In = In.add(pe.mulNumber(ot))),
                  Ei.add(J.id),
                  Z.current.has(J.id) ? J : { ...J, position: k4(J.position, { x: un, y: fn }, H4) }
                );
              })),
              (Z.current = Ei),
              !In.isZero())
            ) {
              const re =
                Ac(Oe, { type: 'onHit', receivedDamage: In }, Math.random).overrideReceivedDamage ??
                In;
              if (!re.isZero()) {
                const pe = ie.machineHp;
                ie.damageHp(re);
                const we = G.getState().machineHp;
                Xe.play(we.isZero() && !pe.isZero() ? 'machineDown' : 'machineHit');
              }
            }
            const Pn = B4(d.current, At.durationSec, ie.currentWave, K.length, p.current.length);
            if (Pn === 'advanceWave' || Pn === 'advanceTier') {
              const J = Ac(Oe, { type: 'onWaveClear' }, Math.random);
              (J.heal != null && !J.heal.isZero() && ie.setMachineHp(ie.machineHp.add(J.heal)),
                J.boltGain != null && !J.boltGain.isZero() && ie.addBolt(J.boltGain),
                Pn === 'advanceWave'
                  ? (ie.advanceWave(), Xe.play('waveClear'))
                  : (ie.advanceTier(), Xe.play('tierClear')),
                (d.current = 0),
                (m.current = 0));
            }
          }
        }
        (he(p.current), X(d.current / 1e3), (r.current = requestAnimationFrame(me)));
      };
      return (
        (f.current = performance.now()),
        (r.current = requestAnimationFrame(me)),
        () => {
          r.current != null && (cancelAnimationFrame(r.current), (r.current = null));
        }
      );
    }, [Ee, K, l, Ma]),
    {
      enemies: U,
      damageEvents: Te,
      deathEvents: Re,
      projectileEvents: et,
      pickupEvents: Ie,
      appearanceEvents: Lt,
      waveElapsedSec: O,
      onDamageDone: fe,
      onDeathDone: je,
      onProjectileDone: pt,
      onPickupDone: Ke,
      onAppearanceDone: Ba,
      fireActive: Ma,
      isOverdriveActive: ne,
    }
  );
}
const $h = 30,
  Z4 = 2;
function X4(l, c) {
  return l && c.lte(Q.ZERO) ? 'gameover' : null;
}
function K4() {
  const { navigate: l } = Zn(),
    c = G((F) => F.isRunActive),
    s = G((F) => F.screw),
    r = G((F) => F.bolt),
    f = G((F) => F.alloy),
    d = G((F) => F.runStartBolt),
    m = G((F) => F.runStartAlloy),
    p = G((F) => F.machineHp),
    g = G((F) => F.machineMaxHp),
    y = G((F) => F.currentTier),
    _ = G((F) => F.currentWave),
    b = G((F) => F.currentWeapon),
    A = G((F) => F.weaponLv),
    M = G((F) => F.activeCdSec),
    T = G((F) => F.isAutoActive),
    D = G((F) => F.isPaused),
    R = G((F) => F.runWorkshopLevels),
    Z = G((F) => F.bgmVolume),
    V = G((F) => F.seVolume),
    se = G((F) => F.setBgmVolume),
    U = G((F) => F.setSeVolume),
    he = G((F) => F.setAutoActive),
    Te = G((F) => F.switchWeapon),
    ae = G((F) => F.setPaused),
    Re = G((F) => F.upgradeRunWorkshop),
    [nt, et] = q.useState(!1),
    [Ve, Ie] = q.useState(!1),
    [Ut, Lt] = q.useState(!1),
    [ht, O] = q.useState(!1),
    X = q.useRef(c);
  (q.useEffect(() => {
    (c && !X.current && O(!0), (X.current = c));
  }, [c]),
    q.useEffect(() => {
      _ === 30 ? Xe.playBgm('battleBoss') : Xe.playBgm('battleNormal');
    }, [_]));
  const ne = q.useRef(_),
    [xe, Ee] = q.useState(null);
  q.useEffect(() => {
    (ne.current !== _ && Ee((F) => (F ?? 0) + 1), (ne.current = _));
  }, [_]);
  const x = X4(c, p),
    [H, K] = q.useState(null),
    W = H ?? x,
    le = W !== null,
    {
      enemies: fe,
      damageEvents: je,
      deathEvents: pt,
      projectileEvents: Ke,
      pickupEvents: Ba,
      waveElapsedSec: Ma,
      onDamageDone: me,
      onDeathDone: _t,
      onProjectileDone: Qe,
      onPickupDone: ie,
      appearanceEvents: ga,
      onAppearanceDone: ot,
      fireActive: bt,
      isOverdriveActive: Oe,
    } = Y4({ range: $h, paused: le }),
    At = Math.max(0, Zu - Ma),
    He = [],
    tt = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    Rt = p,
    De = g.isZero() ? Q.fromNumber(1) : g,
    aa = () => {
      (ae(!D), Xe.play('tap'));
    },
    La = () => {
      (Ie(!0), Xe.play('dialogOpen'));
    },
    $a = () => {
      (Lt(!0), Xe.play('dialogOpen'));
    },
    mn = () => {
      (Ie(!1), K('retreat'), Xe.play('resultRetreat'));
    },
    Ti = () => {
      l('preparation');
    },
    Kn = (F, Wn) => {
      const Ha = Re(F, Wn);
      Xe.play(Ha ? 'purchaseOk' : 'reject');
    },
    Qn = (F) => {
      (Te(F), Xe.play('weaponSwitch'));
    },
    Nl = () => {
      bt() || Xe.play('reject');
    },
    wa = r.sub(d),
    yt = f.sub(m),
    Tt = { bolt: wa.lt(Q.ZERO) ? Q.ZERO : wa, alloy: yt.lt(Q.ZERO) ? Q.ZERO : yt, patches: [] },
    gt = 30;
  return u.jsxs('div', {
    className: Du.root,
    children: [
      u.jsx(El, {
        noScroll: !0,
        variant: 'battle',
        header: u.jsx(U5, {
          hpCurrent: Rt,
          hpMax: De,
          tier: y,
          wave: _,
          totalWaves: gt,
          secondsRemaining: At,
          secondsTotal: Zu,
          isBossWave: _ === gt,
          paused: D || le,
        }),
        footer: u.jsxs('div', {
          className: Du.battleFooter,
          children: [
            u.jsx(G3, {
              open: nt,
              screw: s,
              levels: R,
              onUpgrade: Kn,
              onClose: () => {
                et(!1);
              },
            }),
            u.jsx(o5, {
              screw: s,
              equippedWeapon: b,
              weaponCds: tt,
              activeCd: M,
              activeMax: x1,
              isAutoActive: T,
              onSwitchWeapon: Qn,
              onActivate: Nl,
              onToggleAuto: he,
              isPaused: D,
              onTogglePause: aa,
              onOpenMenu: La,
              onOpenScreenSaver: $a,
              isWorkshopOpen: nt,
              onToggleWorkshop: () => {
                et((F) => !F);
              },
            }),
          ],
        }),
        children: u.jsx(Ex, {
          enemies: fe,
          damageEvents: je,
          hitEvents: He,
          deathEvents: pt,
          projectileEvents: Ke,
          pickupEvents: Ba,
          onDamageDone: me,
          onDeathDone: _t,
          onProjectileDone: Qe,
          onPickupDone: ie,
          showCutterOrbit: b === 'cutter' && c && !D && !le,
          showOverdriveAura: Oe && c && !le,
          cutterRotateMs: u2(
            Math.min(S1, Lc(A).attackPerSec * dn(R.attackSpeedMul) * (Oe ? f1 : 1)),
            Z4
          ),
          range: $h,
        }),
      }),
      u.jsxs('div', {
        className: Du.overlayLayer,
        'aria-live': 'polite',
        children: [
          u.jsx(S3, {
            open: Ve,
            bgmVolume: Z,
            seVolume: V,
            onBgmChange: se,
            onSeChange: U,
            onRetreat: mn,
            onClose: () => {
              Ie(!1);
            },
          }),
          le &&
            u.jsx($3, {
              open: le,
              status: W,
              reachedTier: y,
              reachedWave: _,
              killed: 0,
              elapsedSec: 0,
              reward: Tt,
              onClose: Ti,
            }),
          u.jsx(K3, {
            open: Ut,
            onClose: () => {
              Lt(!1);
            },
          }),
          ht &&
            u.jsx(Eh, {
              kind: 'battle-start',
              onDone: () => {
                O(!1);
              },
            }),
          ga.map((F) =>
            u.jsx(
              Eh,
              {
                kind: F.kind === 'miniboss' ? 'boss' : F.kind,
                name: F.name,
                onDone: () => ot(F.id),
              },
              F.id
            )
          ),
          xe != null &&
            u.jsx(
              jS,
              {
                waveNumber: _,
                onDone: () => {
                  Ee(null);
                },
              },
              xe
            ),
        ],
      }),
    ],
  });
}
const Q4 = '_root_1420p_3',
  W4 = { root: Q4 };
function J4() {
  const l = G((f) => f.machineLevels),
    c = G((f) => f.bolt),
    s = G((f) => f.incrementMachineLv),
    r = G((f) => f.spendBolt);
  return u.jsx('div', {
    className: W4.root,
    children: oo.map((f) => {
      const d = l[f.key],
        m = f.maxLv != null && d >= f.maxLv,
        p = Rc(f, d),
        g = Rc(f, d + 1),
        y = (et) => (f.unit === '%' ? Math.round(et * 1e3) / 10 : et),
        _ = y(p),
        b = y(g),
        A = nf(f, d),
        M = Ru(f, d, 5),
        T = Q.fromNumber(A),
        D = Q.fromNumber(M),
        R = Kb(f, d, c),
        Z = f.maxLv != null ? f.maxLv - d : Number.POSITIVE_INFINITY,
        V = Math.min(R, Z),
        se = V > 0 ? Ru(f, d, V) : A,
        U = Q.fromNumber(se),
        he = c.lt(T),
        Te = c.lt(D) || (f.maxLv != null && d + 5 > f.maxLv),
        ae = V < 1,
        Re = m
          ? []
          : [
              { amount: '+1', cost: T, disabled: he },
              { amount: '+5', cost: D, disabled: Te },
              { amount: 'MAX', cost: U, disabled: ae },
            ],
        nt = (et) => {
          if (m) return;
          let Ve = 0;
          if ((et === '+1' ? (Ve = 1) : et === '+5' ? (Ve = 5) : et === 'MAX' && (Ve = V), Ve < 1))
            return;
          f.maxLv != null && (Ve = Math.min(Ve, f.maxLv - d));
          const Ie = Ru(f, d, Ve),
            Ut = Q.fromNumber(Ie);
          if (r(Ut)) for (let ht = 0; ht < Ve; ht++) s(f.key);
        };
      return u.jsx(
        lf,
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
          options: Re,
          onUpgrade: nt,
        },
        f.key
      );
    }),
  });
}
function F4() {
  const { navigate: l } = Zn(),
    c = (s) => {
      l(s);
    };
  return u.jsx(El, {
    header: u.jsx(Bc, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: u.jsx(Dc, { active: 'machine', onChange: c }),
    children: u.jsx(J4, {}),
  });
}
const I4 = () => u.jsx('div', { children: u.jsx('h1', { children: 'Not Found' }) }),
  P4 = '_content_9srrg_1',
  ej = { content: P4 },
  tj = '_root_1l9jp_1',
  aj = '_header_1l9jp_8',
  nj = '_headerTitleRow_1l9jp_15',
  lj = '_headerCount_1l9jp_21',
  ij = '_slotGrid_1l9jp_35',
  cj = '_emptyHint_1l9jp_41',
  gi = { root: tj, header: aj, headerTitleRow: nj, headerCount: lj, slotGrid: ij, emptyHint: cj },
  sj = '_wrapper_16mrg_3',
  oj = '_filled_16mrg_16',
  rj = '_empty_16mrg_25',
  uj = '_locked_16mrg_26',
  fj = '_slotInner_16mrg_59',
  dj = '_emptyIcon_16mrg_67',
  mj = '_emptyLabel_16mrg_74',
  qn = {
    wrapper: sj,
    filled: oj,
    empty: rj,
    locked: uj,
    slotInner: fj,
    emptyIcon: dj,
    emptyLabel: mj,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  },
  hj = '_root_12m2l_3',
  pj = '_selected_12m2l_15',
  yj = '_merging_12m2l_19',
  gj = '_locked_12m2l_23',
  vj = '_disabled_12m2l_28',
  _j = '_card_12m2l_34',
  bj = '_tierBadge_12m2l_46',
  Sj = '_count_12m2l_54',
  xj = '_countZero_12m2l_74',
  jj = '_iconWrap_12m2l_79',
  Aj = '_name_12m2l_90',
  Tj = '_detail_12m2l_102',
  Ej = '_trigger_12m2l_110',
  Mj = '_effect_12m2l_121',
  wj = '_mergingBadge_12m2l_133',
  Dt = {
    root: hj,
    selected: pj,
    merging: yj,
    locked: gj,
    disabled: vj,
    card: _j,
    tierBadge: bj,
    count: Sj,
    countZero: xj,
    iconWrap: jj,
    name: Aj,
    detail: Tj,
    trigger: Ej,
    effect: Mj,
    mergingBadge: wj,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  Nj = { sm: 22, md: 26, lg: 32 },
  Hh = { sm: 38, md: 44, lg: 52 };
function of({
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
    M = `var(--c-patch-t${A})`,
    T = b != null && !y && !g,
    D = m ? { boxShadow: 'var(--glow-cyan-md)' } : p ? { boxShadow: 'var(--glow-purple-md)' } : {},
    R = {
      width: Hh[_],
      height: Hh[_],
      opacity: g ? 0.35 : 1,
      background: g ? 'var(--c-surface)' : `linear-gradient(135deg, ${M}22, ${M}08)`,
      border: g ? '1px solid var(--c-border-faint)' : `1px solid ${M}55`,
      filter: g ? 'none' : `drop-shadow(0 0 4px ${M}55)`,
    },
    Z = {
      background: r >= 2 ? `${M}22` : void 0,
      borderColor: r >= 2 ? M : void 0,
      color: r >= 2 ? M : void 0,
    };
  return u.jsx('div', {
    className: [
      Dt.root,
      m ? Dt.selected : '',
      p ? Dt.merging : '',
      g ? Dt.locked : '',
      y ? Dt.disabled : '',
      Dt[`size-${_}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: D,
    onClick: T ? b : void 0,
    role: T ? 'button' : void 0,
    tabIndex: T ? 0 : void 0,
    onKeyDown: T
      ? (V) => {
          (V.key === 'Enter' || V.key === ' ') && (V.preventDefault(), b == null || b());
        }
      : void 0,
    'aria-pressed': T ? m : void 0,
    'aria-disabled': y || g ? !0 : void 0,
    children: u.jsxs(wl, {
      variant: 'elevated',
      padding: 'sm',
      interactive: T,
      className: Dt.card,
      children: [
        !g &&
          u.jsx('span', {
            className: Dt.tierBadge,
            children: u.jsx($c, { text: `T${A}`, variant: 'patch-tier', tier: s }),
          }),
        u.jsxs('span', {
          className: [Dt.count, r === 0 ? Dt.countZero : ''].filter(Boolean).join(' '),
          style: Z,
          children: ['×', g ? '?' : r],
        }),
        u.jsx('div', {
          className: Dt.iconWrap,
          style: R,
          children: u.jsx(Ye, {
            name: g ? 'close' : c,
            size: Nj[_],
            color: g ? 'var(--c-text-disabled)' : M,
          }),
        }),
        u.jsx(Y, {
          variant: 'caption',
          color: g ? 'dim' : 'text',
          className: Dt.name,
          children: g ? '???' : l,
        }),
        !g &&
          u.jsxs('div', {
            className: Dt.detail,
            children: [
              u.jsx('span', { className: Dt.trigger, children: f }),
              u.jsx('span', { className: Dt.effect, children: d }),
            ],
          }),
        p && u.jsx('span', { className: Dt.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
function j1({ patch: l = null, slotIndex: c, locked: s = !1, size: r = 'md', onClick: f }) {
  const d = l != null,
    m = f != null && !s,
    p = c != null ? `Slot ${c}` : '',
    g = d
      ? `Slot ${c ?? ''}: ${l.name} (Tier ${l.tier})`
      : s
        ? `Slot ${c ?? ''} (locked)`.trim()
        : `Slot ${c ?? ''} (empty)`.trim(),
    y = d ? qn.filled : s ? qn.locked : qn.empty;
  return u.jsx('div', {
    className: [qn.wrapper, y, qn[`size-${r}`]].filter(Boolean).join(' '),
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
        ? u.jsx(of, {
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
            className: qn.slotInner,
            children: [
              u.jsx('span', {
                className: qn.emptyIcon,
                children: u.jsx(Ye, {
                  name: s ? 'close' : 'plus',
                  size: 28,
                  color: s ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              u.jsx('span', { className: qn.emptyLabel, children: s ? 'LOCKED' : p }),
            ],
          }),
  });
}
function zj(l) {
  return Math.min(1 + l, Si);
}
const Cj = {
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
  Rj = {
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
  Oj = {
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
function Dj({ overridePatches: l, overrideEquipped: c, overridePatchSlotsLv: s }) {
  const r = G((T) => T.patches),
    f = G((T) => T.equippedPatches),
    d = G((T) => T.machineLevels.patchSlots),
    m = G((T) => T.unequipPatch),
    p = l ?? r,
    g = c ?? f,
    _ = zj(s ?? d),
    b = (T) => {
      const D = g.get(T);
      if (!D) return null;
      const R = `${D.name}#${D.tier}`,
        Z = p.get(R);
      return {
        patchId: R,
        name: D.name,
        iconName: Cj[D.name] ?? 'spark',
        tier: D.tier,
        trigger: Rj[D.name] ?? '常時',
        effect: Oj[D.name] ?? '-',
        count: (Z == null ? void 0 : Z.count) ?? 0,
      };
    },
    A = (T) => {
      g.get(T) && m(T);
    },
    M = Si - _;
  return u.jsxs('div', {
    className: gi.root,
    children: [
      u.jsxs('div', {
        className: gi.header,
        children: [
          u.jsxs('div', {
            className: gi.headerTitleRow,
            children: [
              u.jsx(Y, { variant: 'heading-3', children: '装着スロット' }),
              u.jsxs(Y, {
                variant: 'caption',
                color: 'mid',
                className: gi.headerCount,
                children: [g.size, '/', _],
              }),
            ],
          }),
          u.jsxs(Y, {
            variant: 'caption',
            color: 'dim',
            children: ['(', Si, ' スロット中 ', M, ' ロック・', g.size, ' / ', _, ' ', '装着中)'],
          }),
        ],
      }),
      u.jsx('div', {
        className: gi.slotGrid,
        children: Array.from({ length: Si }, (T, D) => {
          const R = D >= _,
            Z = R ? null : b(D);
          return u.jsx(
            j1,
            { slotIndex: D + 1, patch: Z, locked: R, size: 'md', onClick: R ? void 0 : () => A(D) },
            D
          );
        }),
      }),
      g.size === 0 &&
        _ > 0 &&
        u.jsx(Y, {
          variant: 'caption',
          color: 'dim',
          className: gi.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const Bj = '_root_16zq4_1',
  Lj = '_header_16zq4_8',
  $j = '_grid_16zq4_14',
  Hj = '_empty_16zq4_20',
  Tc = { root: Bj, header: Lj, grid: $j, empty: Hj },
  kj = {
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
  Uj = {
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
  qj = {
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
function Vj({ overridePatches: l, overrideEquipped: c, selectedId: s, onSelect: r }) {
  const f = G((_) => _.patches),
    d = G((_) => _.equippedPatches),
    m = l ?? f,
    p = c ?? d,
    g = new Set(Array.from(p.values()).map((_) => _.name)),
    y = Array.from(m.values());
  return y.length === 0
    ? u.jsx('div', {
        className: Tc.root,
        children: u.jsx('div', {
          className: Tc.empty,
          children: u.jsx(Y, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : u.jsxs('div', {
        className: Tc.root,
        children: [
          u.jsxs('div', {
            className: Tc.header,
            children: [
              u.jsx(Y, { variant: 'heading-3', children: 'パッチ在庫' }),
              u.jsxs(Y, { variant: 'caption', color: 'dim', children: [y.length, ' 種類'] }),
            ],
          }),
          u.jsx('div', {
            className: Tc.grid,
            children: y.map((_) => {
              const b = `${_.name}#${_.tier}`,
                A = g.has(_.name);
              return u.jsx(
                of,
                {
                  patchId: b,
                  name: _.name,
                  iconName: kj[_.name] ?? 'spark',
                  tier: _.tier,
                  count: _.count,
                  trigger: Uj[_.name] ?? '常時',
                  effect: qj[_.name] ?? '-',
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
const Gj = '_root_1svx2_1',
  Yj = '_header_1svx2_8',
  Zj = '_tierControl_1svx2_14',
  Xj = '_tierStepperRow_1svx2_24',
  Kj = '_mergeList_1svx2_30',
  Qj = '_empty_1svx2_36',
  vi = { root: Gj, header: Yj, tierControl: Zj, tierStepperRow: Xj, mergeList: Kj, empty: Qj },
  Wj = '_stepper_1ouvh_1',
  Jj = '_disabled_1ouvh_6',
  Fj = '_btn_1ouvh_11',
  Ij = '_value_1ouvh_38',
  _i = {
    stepper: Wj,
    disabled: Jj,
    btn: Fj,
    value: Ij,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  Pj = ({
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
      className: [_i.stepper, _i[`size-${d}`], m ? _i.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        u.jsx('button', {
          type: 'button',
          className: _i.btn,
          onClick: y,
          disabled: m || !p,
          'aria-label': '減少',
          children: '−',
        }),
        u.jsx('span', {
          className: _i.value,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          children: l,
        }),
        u.jsx('button', {
          type: 'button',
          className: _i.btn,
          onClick: _,
          disabled: m || !g,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  Xu = 5,
  eA = {
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
function A1(l, c) {
  const s = [];
  for (const r of l.values())
    r.tier < c &&
      r.count >= 2 &&
      s.push({ name: r.name, tier: r.tier, count: r.count, iconName: eA[r.name] ?? 'spark' });
  return s.sort((r, f) => r.tier - f.tier || r.name.localeCompare(f.name));
}
function tA(l, c) {
  let s = new Map(l),
    r = !0;
  for (; r; ) {
    r = !1;
    for (const f of Array.from(s.values())) {
      if (f.tier >= c || f.count < 2 || f.tier >= Xu) continue;
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
function aA({ overridePatches: l }) {
  const c = G((A) => A.patches),
    s = G((A) => A.addPatch),
    r = G((A) => A.consumePatch),
    f = G((A) => A.pruneEmptyPatches),
    d = l ?? c,
    m = Math.max(1, ...Array.from(d.values()).map((A) => A.tier)),
    [p, g] = q.useState(Math.min(m, Xu - 1)),
    y = A1(d, p + 1),
    _ = y.length > 0,
    b = () => {
      if (l) return;
      const A = tA(d, p + 1);
      for (const [M, T] of d) {
        const D = A.get(M),
          R = (D == null ? void 0 : D.count) ?? 0;
        R < T.count && r(T.name, T.tier, T.count - R);
      }
      for (const [M, T] of A) {
        const D = d.get(M),
          R = (D == null ? void 0 : D.count) ?? 0;
        T.count > R && s(T.name, T.tier, T.count - R);
      }
      f();
    };
  return u.jsxs('div', {
    className: vi.root,
    children: [
      u.jsx('div', {
        className: vi.header,
        children: u.jsx(Y, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      u.jsxs('div', {
        className: vi.tierControl,
        children: [
          u.jsx(Y, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          u.jsxs('div', {
            className: vi.tierStepperRow,
            children: [
              u.jsx(Pj, { value: p, min: 1, max: Xu - 1, onChange: g }),
              u.jsxs(Y, {
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
                className: vi.mergeList,
                children: y.map((A) =>
                  u.jsx(
                    of,
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
              u.jsx(kt, {
                label: `一括合成 (${y.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: b,
              }),
            ],
          })
        : u.jsxs('div', {
            className: vi.empty,
            children: [
              u.jsx(Y, { variant: 'body', color: 'dim', children: '合成可能なパッチがありません' }),
              u.jsx(Y, {
                variant: 'caption',
                color: 'dim',
                children: '同じ Tier のパッチが 2 個以上あると合成できます',
              }),
            ],
          }),
    ],
  });
}
function nA(l) {
  return Math.min(1 + l, Si);
}
function lA() {
  const { navigate: l } = Zn(),
    [c, s] = q.useState('equip'),
    r = G((M) => M.equippedPatches),
    f = G((M) => M.patches),
    d = G((M) => M.machineLevels.patchSlots),
    m = nA(d),
    p = r.size,
    g = f.size,
    y = A1(f, 5).length,
    _ = (M) => {
      l(M);
    },
    b = () => {
      l('preparation');
    },
    A = [
      { key: 'equip', label: '装着', badge: `${p}/${m}` },
      { key: 'inventory', label: '所持', badge: g > 0 ? g : void 0 },
      { key: 'merge', label: '合成', badge: y > 0 ? y : void 0 },
    ];
  return u.jsx(El, {
    header: u.jsx(Bc, {
      title: 'パッチ庫',
      subtitle: `装着 ${p}/${m} ・ 在庫 ${g} 種`,
      onBack: b,
      currencies: [],
      tabBar: u.jsx(co, { tabs: A, value: c, onChange: s, variant: 'underline', fullWidth: !0 }),
    }),
    footer: u.jsx(Dc, { active: 'patches', onChange: _ }),
    children: u.jsxs('div', {
      className: ej.content,
      children: [
        c === 'equip' && u.jsx(Dj, {}),
        c === 'inventory' && u.jsx(Vj, {}),
        c === 'merge' && u.jsx(aA, {}),
      ],
    }),
  });
}
const iA = '_footer_qoo97_1',
  cA = '_tabPanel_qoo97_7',
  kh = { footer: iA, tabPanel: cA },
  sA = '_wrapper_1lf9s_1',
  oA = '_header_1lf9s_7',
  rA = '_headerLabel_1lf9s_13',
  uA = '_empty_1lf9s_18',
  fA = '_emptyIcon_1lf9s_29',
  dA = '_grid_1lf9s_33',
  mA = '_note_1lf9s_39',
  _l = { wrapper: sA, header: oA, headerLabel: rA, empty: uA, emptyIcon: fA, grid: dA, note: mA },
  hA = {
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
function pA({ onOpenPatchScreen: l }) {
  const c = G((m) => m.equippedPatches),
    s = G((m) => m.machineLevels.patchSlots),
    r = Math.min(1 + s, Si),
    f = [];
  for (let m = 0; m < r; m++) {
    const p = c.get(m);
    if (p != null) {
      const g = hA[p.name],
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
    className: _l.wrapper,
    children: [
      u.jsxs('div', {
        className: _l.header,
        children: [
          u.jsxs(Y, {
            variant: 'caption',
            color: 'mid',
            className: _l.headerLabel,
            children: ['装着 ', d, ' / ', r],
          }),
          l != null &&
            u.jsx(kt, {
              label: '装備変更',
              variant: 'ghost',
              size: 'sm',
              iconRight: u.jsx(Ye, { name: 'chevron-right', size: 14 }),
              onClick: l,
            }),
        ],
      }),
      d === 0
        ? u.jsxs('div', {
            className: _l.empty,
            children: [
              u.jsx('span', {
                className: _l.emptyIcon,
                children: u.jsx(Ye, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              u.jsx(Y, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              l != null &&
                u.jsx(kt, {
                  label: 'パッチ庫を開く',
                  variant: 'secondary',
                  size: 'sm',
                  onClick: l,
                }),
            ],
          })
        : u.jsx('div', {
            className: _l.grid,
            children: f.map((m, p) =>
              u.jsx(j1, { patch: m.patch, slotIndex: m.idx, onClick: l }, p)
            ),
          }),
      u.jsx(Y, {
        variant: 'caption',
        color: 'dim',
        align: 'center',
        as: 'p',
        className: _l.note,
        children: '変更はパッチ庫で行えます',
      }),
    ],
  });
}
const yA = '_wrapper_iebuz_1',
  gA = '_header_iebuz_7',
  vA = '_grid_iebuz_12',
  $u = { wrapper: yA, header: gA, grid: vA },
  _A = [
    { kind: 'laser', name: 'LASER', description: '高速直進ビーム。貫通で削る。', buildStats: h1 },
    { kind: 'cannon', name: 'CANNON', description: '範囲爆発で群れを薙ぐ。', buildStats: p1 },
    { kind: 'thunder', name: 'THUNDER', description: '同時 3 体を撃つ電撃。', buildStats: y1 },
    {
      kind: 'cutter',
      name: 'CUTTER',
      description: 'マシン周囲を旋回する斬撃。',
      buildStats: (l, c) => g1(l, c),
    },
  ];
function bA({ selectedWeapon: l, onSelect: c }) {
  const s = G((y) => y.initialWeapon),
    r = G((y) => y.setInitialWeapon),
    f = G((y) => y.machineLevels),
    d = d1(f.baseAttack),
    m = m1(f.range),
    p = l ?? s,
    g = (y) => {
      (r(y), c == null || c(y));
    };
  return u.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: $u.wrapper,
    children: [
      u.jsx('div', {
        className: $u.header,
        children: u.jsx(Y, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      u.jsx('div', {
        className: $u.grid,
        children: _A.map((y) =>
          u.jsx(
            o1,
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
const SA = '_wrapper_1rg1e_1',
  xA = '_sticky_1rg1e_15',
  jA = '_summary_1rg1e_19',
  AA = '_weaponInfo_1rg1e_29',
  TA = '_patchInfo_1rg1e_37',
  Ec = { wrapper: SA, sticky: xA, summary: jA, weaponInfo: AA, patchInfo: TA };
function EA({
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
    className: [Ec.wrapper, d ? Ec.sticky : ''].filter(Boolean).join(' '),
    children: [
      u.jsxs('div', {
        className: Ec.summary,
        children: [
          l != null && u.jsx($c, { variant: 'tier', tier: l, size: 'sm' }),
          c != null &&
            u.jsxs('span', {
              className: Ec.weaponInfo,
              children: [
                u.jsx(Ye, { name: c, size: 14 }),
                u.jsx(Y, { variant: 'label', color: 'primary', children: c.toUpperCase() }),
              ],
            }),
          u.jsxs('span', {
            className: Ec.patchInfo,
            children: [
              u.jsx(Ye, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              u.jsxs(Y, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', s] }),
            ],
          }),
        ],
      }),
      u.jsx(kt, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: r,
        iconLeft: u.jsx(Ye, { name: 'tower', size: 18 }),
        onClick: f,
      }),
    ],
  });
}
const MA = '_wrapper_1ul9l_1',
  wA = '_header_1ul9l_7',
  NA = '_grid_1ul9l_14',
  zA = '_tierBtn_1ul9l_20',
  CA = '_active_1ul9l_35',
  RA = '_tierLabel_1ul9l_50',
  OA = '_frontierLabel_1ul9l_61',
  bl = {
    wrapper: MA,
    header: wA,
    grid: NA,
    tierBtn: zA,
    active: CA,
    tierLabel: RA,
    frontierLabel: OA,
  };
function DA({ selectedTier: l, onSelect: c }) {
  const s = G((m) => m.highestTier),
    r = Math.max(1, s),
    f = [];
  for (let m = 1; m <= r; m++) f.push(m);
  const d = (m) => `var(--c-tier-${Math.max(1, Math.min(10, m))})`;
  return u.jsxs('div', {
    role: 'tabpanel',
    'aria-label': 'Tier 選択',
    className: bl.wrapper,
    children: [
      u.jsxs('div', {
        className: bl.header,
        children: [
          u.jsx(Y, {
            variant: 'caption',
            color: 'mid',
            children: '到達済み Tier を選んで出撃します。',
          }),
          u.jsxs(Y, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', r] }),
        ],
      }),
      u.jsx('div', {
        className: bl.grid,
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
              className: [bl.tierBtn, p ? bl.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': y },
              onClick: () => (c == null ? void 0 : c(m)),
              children: [
                u.jsxs('span', { className: bl.tierLabel, children: ['T', m] }),
                g && !p && u.jsx('span', { className: bl.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            m
          );
        }),
      }),
    ],
  });
}
const BA = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function LA(l) {
  const { initialSelectedTier: c } = l,
    { navigate: s } = Zn(),
    [r, f] = q.useState('tier'),
    d = G((R) => R.highestTier),
    [m, p] = q.useState(c ?? Math.max(1, d)),
    g = G((R) => R.initialWeapon),
    _ = [...G((R) => R.equippedPatches).values()].length,
    b = G((R) => R.machineLevels),
    A = G((R) => R.startRun);
  function M() {
    const R = oo.find((V) => V.key === 'maxHp'),
      Z = R != null ? Rc(R, b.maxHp) : 100;
    (A({ initialWeapon: g, baseMachineMaxHp: Q.fromNumber(Z) }), s('battle'));
  }
  const T = u.jsx(Bc, {
      title: '出撃準備',
      currencies: ['bolt', 'alloy'],
      tabBar: u.jsx(co, { tabs: BA, value: r, onChange: f, variant: 'underline', fullWidth: !0 }),
    }),
    D = u.jsxs('div', {
      className: kh.footer,
      children: [
        u.jsx(EA, { tier: m, weaponKind: g, patchCount: _, sticky: !1, onLaunch: M }),
        u.jsx(Dc, { active: 'preparation', onChange: (R) => s(R) }),
      ],
    });
  return u.jsx(El, {
    header: T,
    footer: D,
    children: u.jsxs('div', {
      className: kh.tabPanel,
      children: [
        r === 'tier' && u.jsx(DA, { selectedTier: m, onSelect: p }),
        r === 'weapon' && u.jsx(bA, {}),
        r === 'patches' && u.jsx(pA, { onOpenPatchScreen: () => s('patches') }),
      ],
    }),
  });
}
const $A = '_content_8gsha_1',
  HA = { content: $A },
  kA = '_root_1b7n9_1',
  UA = '_header_1b7n9_8',
  qA = '_storageCard_1b7n9_13',
  VA = '_storageRow_1b7n9_23',
  GA = '_divider_1b7n9_29',
  YA = '_section_1b7n9_34',
  ZA = '_dangerSection_1b7n9_40',
  XA = '_sectionHeader_1b7n9_50',
  pa = {
    root: kA,
    header: UA,
    storageCard: qA,
    storageRow: VA,
    divider: GA,
    section: YA,
    dangerSection: ZA,
    sectionHeader: XA,
  },
  KA = '_wrapper_11b89_1',
  QA = '_disabled_11b89_6',
  WA = '_hiddenInput_11b89_11',
  JA = '_btn_11b89_15',
  FA = '_fileName_11b89_41',
  Mc = { wrapper: KA, disabled: QA, hiddenInput: WA, btn: JA, fileName: FA },
  IA = ({
    accept: l = 'application/json',
    onChange: c,
    label: s = 'ファイルを選択',
    disabled: r = !1,
  }) => {
    const f = q.useRef(null),
      [d, m] = q.useState(null),
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
      className: [Mc.wrapper, r ? Mc.disabled : ''].join(' '),
      children: [
        u.jsx('input', {
          ref: f,
          type: 'file',
          accept: l,
          className: Mc.hiddenInput,
          onChange: g,
          disabled: r,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        u.jsx('button', {
          type: 'button',
          className: Mc.btn,
          onClick: p,
          disabled: r,
          children: s,
        }),
        d && u.jsx('span', { className: Mc.fileName, title: d, children: d }),
      ],
    });
  };
function PA({ storageInfo: l, onExport: c, onImport: s, onReset: r }) {
  const [f, d] = q.useState(!1),
    [m, p] = q.useState(!1),
    [g, y] = q.useState(!1),
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
    b = async (M) => {
      if (!(!M || !s)) {
        p(!0);
        try {
          await s(M);
        } finally {
          p(!1);
        }
      }
    },
    A = async () => {
      (d(!1), r && (await r()));
    };
  return u.jsxs('div', {
    className: pa.root,
    children: [
      u.jsx('div', {
        className: pa.header,
        children: u.jsx(Y, { variant: 'heading-3', children: 'データ管理' }),
      }),
      l &&
        u.jsxs('div', {
          className: pa.storageCard,
          children: [
            u.jsx(Y, { variant: 'label', color: 'mid', children: 'ストレージ使用量' }),
            u.jsxs('div', {
              className: pa.storageRow,
              children: [
                u.jsx(Y, { variant: 'numeric-l', children: l.usedKb }),
                u.jsx(Y, { variant: 'caption', color: 'dim', children: 'KB' }),
              ],
            }),
            u.jsxs(Y, {
              variant: 'caption',
              color: 'dim',
              children: ['セーブスロット: ', l.slots, ' / 最終保存: ', l.lastSavedAt],
            }),
          ],
        }),
      u.jsx('div', { className: pa.divider }),
      u.jsxs('div', {
        className: pa.section,
        children: [
          u.jsxs('div', {
            className: pa.sectionHeader,
            children: [
              u.jsx(Y, { variant: 'label', color: 'mid', children: 'エクスポート' }),
              u.jsx(Y, {
                variant: 'caption',
                color: 'dim',
                children: 'セーブデータを JSON ファイルとしてダウンロード',
              }),
            ],
          }),
          u.jsx(kt, {
            label: g ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: _,
            disabled: g || !c,
          }),
        ],
      }),
      u.jsxs('div', {
        className: pa.section,
        children: [
          u.jsxs('div', {
            className: pa.sectionHeader,
            children: [
              u.jsx(Y, { variant: 'label', color: 'mid', children: 'インポート' }),
              u.jsx(Y, {
                variant: 'caption',
                color: 'dim',
                children: 'JSON ファイルからセーブデータを復元（上書き）',
              }),
            ],
          }),
          u.jsx(IA, {
            accept: 'application/json',
            onChange: b,
            label: m ? 'インポート中...' : 'ファイルを選択してインポート',
            disabled: m || !s,
          }),
        ],
      }),
      u.jsx('div', { className: pa.divider }),
      u.jsxs('div', {
        className: pa.dangerSection,
        children: [
          u.jsxs('div', {
            className: pa.sectionHeader,
            children: [
              u.jsx(Y, { variant: 'label', color: 'mid', children: 'データリセット' }),
              u.jsx(Y, {
                variant: 'caption',
                color: 'dim',
                children: 'すべてのデータを削除します。この操作は取り消せません。',
              }),
            ],
          }),
          u.jsx(kt, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => d(!0),
            disabled: !r,
          }),
        ],
      }),
      u.jsx(b1, {
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
const eT = '_root_1rbig_1',
  tT = '_header_1rbig_8',
  aT = '_section_1rbig_13',
  Hu = { root: eT, header: tT, section: aT },
  nT = '_wrapper_16nmz_9',
  lT = '_disabled_16nmz_15',
  iT = '_off_16nmz_31',
  cT = '_on_16nmz_35',
  sT = '_accent_primary_16nmz_35',
  oT = '_accent_secondary_16nmz_39',
  rT = '_accent_success_16nmz_43',
  uT = '_accent_disabled_16nmz_47',
  fT = '_size_md_16nmz_56',
  dT = '_knob_16nmz_60',
  mT = '_size_sm_16nmz_70',
  hT = '_labelGroup_16nmz_93',
  pT = '_label_16nmz_93',
  yT = '_description_16nmz_106',
  Aa = {
    wrapper: nT,
    disabled: lT,
    switch: '_switch_16nmz_22',
    off: iT,
    on: cT,
    accent_primary: sT,
    accent_secondary: oT,
    accent_success: rT,
    accent_disabled: uT,
    size_md: fT,
    knob: dT,
    size_sm: mT,
    labelGroup: hT,
    label: pT,
    description: yT,
  },
  T1 = ({
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
      className: [Aa.wrapper, p ? Aa.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': p,
      children: [
        u.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': l,
          'aria-disabled': p,
          className: [Aa.switch, l ? Aa.on : Aa.off, Aa[`size_${m}`], Aa[`accent_${d}`]]
            .filter(Boolean)
            .join(' '),
          onClick: g,
          disabled: p,
          children: u.jsx('span', { className: Aa.knob }),
        }),
        (r || f) &&
          u.jsxs('span', {
            className: Aa.labelGroup,
            children: [
              r && u.jsx('span', { className: Aa.label, children: r }),
              f && u.jsx('span', { className: Aa.description, children: f }),
            ],
          }),
      ],
    });
  };
function gT({ overrideVibration: l, onVibrationChange: c }) {
  const s = G((m) => m.vibrationEnabled),
    r = G((m) => m.setVibrationEnabled),
    f = l ?? s,
    d = (m) => {
      c ? c(m) : r(m);
    };
  return u.jsxs('div', {
    className: Hu.root,
    children: [
      u.jsx('div', {
        className: Hu.header,
        children: u.jsx(Y, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      u.jsx('div', {
        className: Hu.section,
        children: u.jsx(T1, {
          checked: f,
          onChange: d,
          label: 'バイブレーション',
          description: '操作時に端末を振動させます',
        }),
      }),
    ],
  });
}
const vT = '_root_nuc5y_2',
  _T = '_muteRow_nuc5y_9',
  bT = '_muteLabelGroup_nuc5y_16',
  ST = '_sliderRow_nuc5y_24',
  xT = '_muted_nuc5y_29',
  jT = '_sliderIcon_nuc5y_29',
  AT = '_sliderArea_nuc5y_41',
  TT = '_sliderValue_nuc5y_46',
  Gn = {
    root: vT,
    muteRow: _T,
    muteLabelGroup: bT,
    sliderRow: ST,
    muted: xT,
    sliderIcon: jT,
    sliderArea: AT,
    sliderValue: TT,
  };
function Uh({ label: l, iconName: c, value: s, muted: r, onChange: f }) {
  return u.jsx(wl, {
    variant: 'sunken',
    padding: 'md',
    children: u.jsxs('div', {
      className: [Gn.sliderRow, r ? Gn.muted : ''].filter(Boolean).join(' '),
      children: [
        u.jsx('span', { className: Gn.sliderIcon, children: u.jsx(Ye, { name: c, size: 16 }) }),
        u.jsx(Y, { variant: 'label', color: r ? 'dim' : 'mid', children: l }),
        u.jsx('div', {
          className: Gn.sliderArea,
          children: u.jsx(Yu, { value: s, min: 0, max: 1, step: 0.01, onChange: f, disabled: r }),
        }),
        u.jsx('span', {
          className: Gn.sliderValue,
          children: u.jsx(Yn, {
            value: Math.round(s * 100),
            size: 'sm',
            accentColor: r ? 'dim' : 'text',
          }),
        }),
      ],
    }),
  });
}
function ET({
  overrideBgmVolume: l,
  overrideSeVolume: c,
  overrideMute: s,
  onBgmChange: r,
  onSeChange: f,
  onMuteChange: d,
}) {
  const m = G((R) => R.bgmVolume),
    p = G((R) => R.seVolume),
    g = G((R) => R.setBgmVolume),
    y = G((R) => R.setSeVolume),
    _ = l ?? m,
    b = c ?? p,
    A = s ?? !1,
    M = (R) => {
      r ? r(R) : (g(R), Xe.setBgmVolume(A ? 0 : R));
    },
    T = (R) => {
      f ? f(R) : (y(R), Xe.setSeVolume(A ? 0 : R));
    },
    D = (R) => {
      d ? d(R) : (Xe.setBgmVolume(R ? 0 : _), Xe.setSeVolume(R ? 0 : b));
    };
  return u.jsxs('div', {
    className: Gn.root,
    role: 'tabpanel',
    'aria-label': 'サウンド設定',
    children: [
      u.jsx(wl, {
        variant: 'sunken',
        padding: 'md',
        children: u.jsxs('div', {
          className: Gn.muteRow,
          children: [
            u.jsxs('span', {
              className: Gn.muteLabelGroup,
              children: [
                u.jsx(Y, { variant: 'label', color: 'mid', children: 'ミュート' }),
                u.jsx(Y, { variant: 'caption', color: 'dim', children: '全サウンドを一時停止' }),
              ],
            }),
            u.jsx(T1, { checked: A, onChange: D, accent: 'primary' }),
          ],
        }),
      }),
      u.jsx(Uh, { label: 'BGM', iconName: 'play', value: _, muted: A, onChange: M }),
      u.jsx(Uh, { label: 'SE', iconName: 'spark', value: b, muted: A, onChange: T }),
    ],
  });
}
const Ku = (l, c) => c.some((s) => l instanceof s);
let qh, Vh;
function MT() {
  return qh || (qh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function wT() {
  return (
    Vh ||
    (Vh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Qu = new WeakMap(),
  ku = new WeakMap(),
  po = new WeakMap();
function NT(l) {
  const c = new Promise((s, r) => {
    const f = () => {
        (l.removeEventListener('success', d), l.removeEventListener('error', m));
      },
      d = () => {
        (s(Al(l.result)), f());
      },
      m = () => {
        (r(l.error), f());
      };
    (l.addEventListener('success', d), l.addEventListener('error', m));
  });
  return (po.set(c, l), c);
}
function zT(l) {
  if (Qu.has(l)) return;
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
  Qu.set(l, c);
}
let Wu = {
  get(l, c, s) {
    if (l instanceof IDBTransaction) {
      if (c === 'done') return Qu.get(l);
      if (c === 'store')
        return s.objectStoreNames[1] ? void 0 : s.objectStore(s.objectStoreNames[0]);
    }
    return Al(l[c]);
  },
  set(l, c, s) {
    return ((l[c] = s), !0);
  },
  has(l, c) {
    return l instanceof IDBTransaction && (c === 'done' || c === 'store') ? !0 : c in l;
  },
};
function E1(l) {
  Wu = l(Wu);
}
function CT(l) {
  return wT().includes(l)
    ? function (...c) {
        return (l.apply(Ju(this), c), Al(this.request));
      }
    : function (...c) {
        return Al(l.apply(Ju(this), c));
      };
}
function RT(l) {
  return typeof l == 'function'
    ? CT(l)
    : (l instanceof IDBTransaction && zT(l), Ku(l, MT()) ? new Proxy(l, Wu) : l);
}
function Al(l) {
  if (l instanceof IDBRequest) return NT(l);
  if (ku.has(l)) return ku.get(l);
  const c = RT(l);
  return (c !== l && (ku.set(l, c), po.set(c, l)), c);
}
const Ju = (l) => po.get(l);
function OT(l, c, { blocked: s, upgrade: r, blocking: f, terminated: d } = {}) {
  const m = indexedDB.open(l, c),
    p = Al(m);
  return (
    r &&
      m.addEventListener('upgradeneeded', (g) => {
        r(Al(m.result), g.oldVersion, g.newVersion, Al(m.transaction), g);
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
const DT = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  BT = ['put', 'add', 'delete', 'clear'],
  Uu = new Map();
function Gh(l, c) {
  if (!(l instanceof IDBDatabase && !(c in l) && typeof c == 'string')) return;
  if (Uu.get(c)) return Uu.get(c);
  const s = c.replace(/FromIndex$/, ''),
    r = c !== s,
    f = BT.includes(s);
  if (!(s in (r ? IDBIndex : IDBObjectStore).prototype) || !(f || DT.includes(s))) return;
  const d = async function (m, ...p) {
    const g = this.transaction(m, f ? 'readwrite' : 'readonly');
    let y = g.store;
    return (r && (y = y.index(p.shift())), (await Promise.all([y[s](...p), f && g.done]))[0]);
  };
  return (Uu.set(c, d), d);
}
E1((l) => ({
  ...l,
  get: (c, s, r) => Gh(c, s) || l.get(c, s, r),
  has: (c, s) => !!Gh(c, s) || l.has(c, s),
}));
const LT = ['continue', 'continuePrimaryKey', 'advance'],
  Yh = {},
  Fu = new WeakMap(),
  M1 = new WeakMap(),
  $T = {
    get(l, c) {
      if (!LT.includes(c)) return l[c];
      let s = Yh[c];
      return (
        s ||
          (s = Yh[c] =
            function (...r) {
              Fu.set(this, M1.get(this)[c](...r));
            }),
        s
      );
    },
  };
async function* HT(...l) {
  let c = this;
  if ((c instanceof IDBCursor || (c = await c.openCursor(...l)), !c)) return;
  c = c;
  const s = new Proxy(c, $T);
  for (M1.set(s, c), po.set(s, Ju(c)); c; )
    (yield s, (c = await (Fu.get(s) || c.continue())), Fu.delete(s));
}
function Zh(l, c) {
  return (
    (c === Symbol.asyncIterator && Ku(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (c === 'iterate' && Ku(l, [IDBIndex, IDBObjectStore]))
  );
}
E1((l) => ({
  ...l,
  get(c, s, r) {
    return Zh(c, s) ? HT : l.get(c, s, r);
  },
  has(c, s) {
    return Zh(c, s) || l.has(c, s);
  },
}));
const kT = {
  1: (l) => {
    (l.createObjectStore(P.profile, { keyPath: 'id' }),
      l.createObjectStore(P.currencies, { keyPath: 'id' }),
      l.createObjectStore(P.machine, { keyPath: 'key' }),
      l.createObjectStore(P.weapons, { keyPath: 'id' }),
      l
        .createObjectStore(P.patches, { keyPath: ['name', 'tier'] })
        .createIndex('byName', 'name', { unique: !1 }),
      l.createObjectStore(P.equippedPatches, { keyPath: 'slotIndex' }),
      l.createObjectStore(P.settings, { keyPath: 'id' }));
  },
};
function UT(l, c, s, r) {
  for (let f = s + 1; f <= r; f++) {
    const d = kT[f];
    if (!d) throw new Error(`No migration registered for version ${f}`);
    d(l, c);
  }
}
let wc = null;
async function Iu() {
  return (
    wc ||
    ((wc = await OT(t1, io, {
      upgrade(l, c, s, r) {
        try {
          UT(l, r, c, s ?? io);
        } catch (f) {
          throw (console.error('[DB] Migration failed:', f), f);
        }
      },
    })),
    await qT(wc),
    wc)
  );
}
async function qT(l) {
  const c = l.transaction([P.profile, P.currencies, P.machine, P.weapons, P.settings], 'readwrite'),
    [s, r, f, d] = await Promise.all([
      c.objectStore(P.profile).get('singleton'),
      c.objectStore(P.currencies).get('singleton'),
      c.objectStore(P.weapons).get('singleton'),
      c.objectStore(P.settings).get('singleton'),
    ]),
    m = Date.now(),
    p = [];
  (s || p.push(c.objectStore(P.profile).put({ ...a1, createdAt: m, lastPlayedAt: m })),
    r || p.push(c.objectStore(P.currencies).put(n1)),
    f || p.push(c.objectStore(P.weapons).put(l1)),
    d || p.push(c.objectStore(P.settings).put(i1)));
  const g = c.objectStore(P.machine),
    y = await g.getAllKeys(),
    _ = new Set(y);
  for (const b of so) _.has(b) || p.push(g.put({ key: b, lv: 0 }));
  (await Promise.all(p), await c.done);
}
async function VT(l, c) {
  await l.put(P.profile, c);
}
async function GT(l, c) {
  await l.put(P.currencies, c);
}
async function YT(l, c) {
  await l.put(P.machine, c);
}
async function ZT(l, c) {
  await l.put(P.weapons, c);
}
async function XT(l, c) {
  await l.put(P.patches, c);
}
async function KT(l) {
  return l.getAll(P.equippedPatches);
}
async function QT(l, c) {
  const r = (await KT(l)).find((f) => f.name === c.name && f.slotIndex !== c.slotIndex);
  if (r) throw new Error(`Patch "${c.name}" is already equipped in slot ${r.slotIndex}`);
  await l.put(P.equippedPatches, c);
}
async function WT(l, c) {
  await l.put(P.settings, c);
}
async function w1(l) {
  const c = l.transaction(
      [P.profile, P.currencies, P.machine, P.weapons, P.patches, P.equippedPatches, P.settings],
      'readonly'
    ),
    [s, r, f, d, m, p, g] = await Promise.all([
      c.objectStore(P.profile).get('singleton'),
      c.objectStore(P.currencies).get('singleton'),
      c.objectStore(P.machine).getAll(),
      c.objectStore(P.weapons).get('singleton'),
      c.objectStore(P.patches).getAll(),
      c.objectStore(P.equippedPatches).getAll(),
      c.objectStore(P.settings).get('singleton'),
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
const N1 = 'tower-like-game:import-backups',
  JT = 3;
function FT() {
  try {
    const l = localStorage.getItem(N1);
    return l ? JSON.parse(l) : [];
  } catch {
    return [];
  }
}
function IT(l) {
  try {
    localStorage.setItem(N1, JSON.stringify(l));
  } catch (c) {
    console.warn('[DB] Failed to save backup to localStorage:', c);
  }
}
function PT(l) {
  const c = FT();
  c.unshift({ savedAt: Date.now(), data: l });
  const s = c.slice(0, JT);
  IT(s);
}
async function z1(l) {
  const c = await w1(l);
  return { formatVersion: 1, dbVersion: io, exportedAt: Date.now(), data: c };
}
async function eE(l, c) {
  if (c.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${c.formatVersion}`);
  try {
    const d = await z1(l);
    PT(d);
  } catch (d) {
    console.warn('[DB] Pre-import backup failed (proceeding anyway):', d);
  }
  const { data: s } = c,
    r = l.transaction(
      [P.profile, P.currencies, P.machine, P.weapons, P.patches, P.equippedPatches, P.settings],
      'readwrite'
    );
  await Promise.all([
    r.objectStore(P.profile).clear(),
    r.objectStore(P.currencies).clear(),
    r.objectStore(P.machine).clear(),
    r.objectStore(P.weapons).clear(),
    r.objectStore(P.patches).clear(),
    r.objectStore(P.equippedPatches).clear(),
    r.objectStore(P.settings).clear(),
  ]);
  const f = [
    r.objectStore(P.profile).put(s.profile),
    r.objectStore(P.currencies).put(s.currencies),
    r.objectStore(P.weapons).put(s.weapons),
    r.objectStore(P.settings).put(s.settings),
    ...s.machine.map((d) => r.objectStore(P.machine).put(d)),
    ...s.patches.map((d) => r.objectStore(P.patches).put(d)),
    ...s.equippedPatches.map((d) => r.objectStore(P.equippedPatches).put(d)),
  ];
  (await Promise.all(f), await r.done);
}
const tE = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function aE() {
  const { navigate: l } = Zn(),
    [c, s] = q.useState('sound'),
    r = async () => {
      const m = await Iu(),
        p = await z1(m),
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
        y = await Iu();
      (await eE(y, g), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(t1), window.location.reload());
    };
  return u.jsx(El, {
    header: u.jsx(Bc, {
      title: '設定',
      onBack: () => l('title'),
      currencies: [],
      tabBar: u.jsx(co, { tabs: tE, value: c, onChange: s, fullWidth: !0 }),
    }),
    footer: u.jsx(Dc, { active: 'settings', onChange: l }),
    children: u.jsxs('div', {
      className: HA.content,
      children: [
        c === 'sound' && u.jsx(ET, {}),
        c === 'game' && u.jsx(gT, {}),
        c === 'data' && u.jsx(PA, { onExport: r, onImport: f, onReset: d }),
      ],
    }),
  });
}
const nE = '_layout_198wk_1',
  lE = '_heroWrap_198wk_12',
  Xh = { layout: nE, heroWrap: lE },
  iE = '_banner_sva4m_3',
  cE = '_bannerInfo_sva4m_24',
  qu = { banner: iE, bannerInfo: cE };
function sE({ banner: l, onApply: c }) {
  return l === null
    ? null
    : l.kind === 'has-update'
      ? u.jsxs('div', {
          className: qu.banner,
          role: 'status',
          'aria-live': 'polite',
          children: [
            u.jsx(Y, { variant: 'body', color: 'default', children: '新しいバージョンがあります' }),
            u.jsx(kt, { label: '更新', size: 'sm', variant: 'primary', onClick: c }),
          ],
        })
      : u.jsx('div', {
          className: `${qu.banner} ${qu.bannerInfo}`,
          role: 'status',
          'aria-live': 'polite',
          children: u.jsx(Y, {
            variant: 'body',
            color: 'dim',
            children: '現在のバージョンは最新です',
          }),
        });
}
const oE = '_root_5udm7_1',
  rE = { root: oE };
function uE({
  onResume: l,
  onNewGame: c,
  lastSavedAt: s,
  onCheckUpdate: r,
  isCheckingUpdate: f = !1,
}) {
  const m = G((p) => p.createdAt) > 0;
  return u.jsxs('div', {
    className: rE.root,
    children: [
      u.jsx(kt, {
        label: m ? '続きから' : '続きから (セーブなし)',
        variant: m ? 'primary' : 'ghost',
        size: 'lg',
        fullWidth: !0,
        disabled: !m,
        iconLeft: u.jsx(Ye, { name: 'play', size: 18 }),
        onClick: l,
      }),
      m &&
        s != null &&
        u.jsx(Y, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
          children: '最終セーブ: ' + s,
        }),
      u.jsx(kt, {
        label: '新規開始',
        variant: m ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: u.jsx(Ye, { name: 'plus', size: 18 }),
        onClick: c,
      }),
      r != null &&
        u.jsx(kt, {
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
const fE = '_root_qkflo_2',
  dE = '_title_qkflo_12',
  Kh = { root: fE, title: dE };
function mE({ title: l = 'NEON SPIRE', subtitle: c, version: s, tagline: r }) {
  return u.jsxs('header', {
    className: Kh.root,
    role: 'banner',
    children: [
      u.jsx('h1', { className: Kh.title, children: l }),
      c != null &&
        u.jsx(Y, {
          variant: 'label',
          color: 'mid',
          align: 'center',
          style: { fontSize: 11, letterSpacing: '0.24em' },
          children: c,
        }),
      r != null &&
        u.jsx(Y, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { marginTop: 4, fontSize: 11 },
          children: r,
        }),
      s != null &&
        u.jsx(Y, {
          variant: 'numeric-s',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10, marginTop: 6, opacity: 0.7 },
          children: s,
        }),
    ],
  });
}
const hE = '_root_1szye_1',
  pE = '_ringOuter_1szye_9',
  yE = '_ringMiddle_1szye_17',
  gE = '_glowDisc_1szye_24',
  vE = '_cornerAccent_1szye_31',
  _E = '_icon_1szye_40',
  bi = { root: hE, ringOuter: pE, ringMiddle: yE, glowDisc: gE, cornerAccent: vE, icon: _E };
function bE({ size: l = 180, iconName: c = 'tower' }) {
  return u.jsxs('div', {
    className: bi.root,
    style: { width: l, height: l },
    role: 'presentation',
    'aria-hidden': 'true',
    children: [
      u.jsx('div', { className: bi.ringOuter }),
      u.jsx('div', { className: bi.ringMiddle }),
      u.jsx('div', { className: bi.glowDisc }),
      [0, 90, 180, 270].map((s) =>
        u.jsx(
          'div',
          {
            className: bi.cornerAccent,
            style: { transform: `rotate(${s}deg) translate(${l / 2 - 5}px) rotate(45deg)` },
          },
          s
        )
      ),
      u.jsx('span', {
        className: bi.icon,
        children: u.jsx(Ye, { name: c, size: Math.round(l * 0.49) }),
      }),
    ],
  });
}
const SE = 'modulepreload',
  xE = function (l) {
    return '/tower-like-game/' + l;
  },
  Qh = {},
  jE = function (c, s, r) {
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
          if (((y = xE(y)), y in Qh)) return;
          Qh[y] = !0;
          const _ = y.endsWith('.css'),
            b = _ ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${y}"]${b}`)) return;
          const A = document.createElement('link');
          if (
            ((A.rel = _ ? 'stylesheet' : SE),
            _ || (A.as = 'script'),
            (A.crossOrigin = ''),
            (A.href = y),
            g && A.setAttribute('nonce', g),
            document.head.appendChild(A),
            _)
          )
            return new Promise((M, T) => {
              (A.addEventListener('load', M),
                A.addEventListener('error', () => T(new Error(`Unable to preload CSS for ${y}`))));
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
function AE(l = {}) {
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
        ((p = await jE(async () => {
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
function TE(l = {}) {
  const {
      immediate: c = !0,
      onNeedRefresh: s,
      onOfflineReady: r,
      onRegistered: f,
      onRegisteredSW: d,
      onRegisterError: m,
    } = l,
    [p, g] = q.useState(!1),
    [y, _] = q.useState(!1),
    [b] = q.useState(() =>
      AE({
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
const EE = 2500,
  ME = 1500;
function wE() {
  const l = q.useRef(null),
    {
      needRefresh: [c],
      updateServiceWorker: s,
    } = TE({
      onRegisteredSW: (A, M) => {
        l.current = M ?? null;
      },
    }),
    [r, f] = q.useState(!1),
    [d, m] = q.useState(!1),
    p = q.useRef(null),
    g = q.useRef(c);
  q.useEffect(() => {
    g.current = c;
  }, [c]);
  const y = q.useCallback(async () => {
      if (!r && !g.current) {
        (f(!0), m(!1));
        try {
          const A = l.current;
          (A && (await A.update()),
            await new Promise((M) => {
              window.setTimeout(M, ME);
            }));
        } catch {}
        (f(!1),
          g.current ||
            (m(!0),
            p.current !== null && window.clearTimeout(p.current),
            (p.current = window.setTimeout(() => {
              (m(!1), (p.current = null));
            }, EE))));
      }
    }, [r]),
    _ = q.useCallback(() => {
      s(!0);
    }, [s]);
  return {
    banner: c ? { kind: 'has-update' } : d ? { kind: 'up-to-date' } : null,
    checkForUpdate: y,
    isChecking: r,
    applyUpdate: _,
  };
}
function NE(l) {
  if (l < 0) return '今';
  const c = Math.floor(l / 1e3);
  if (c < 60) return '今';
  const s = Math.floor(c / 60);
  if (s < 60) return `${s} 分前`;
  const r = Math.floor(s / 60);
  return r < 24 ? `${r} 時間前` : `${Math.floor(r / 24)} 日前`;
}
function zE() {
  const { navigate: l } = Zn(),
    c = G((p) => p.createdAt),
    { banner: s, checkForUpdate: r, isChecking: f, applyUpdate: d } = wE(),
    m = q.useMemo(() => (c > 0 ? NE(Date.now() - c) : void 0), [c]);
  return u.jsx(El, {
    children: u.jsxs('div', {
      className: Xh.layout,
      children: [
        u.jsx(mE, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.2.0',
        }),
        u.jsx('div', { className: Xh.heroWrap, children: u.jsx(bE, {}) }),
        u.jsx(uE, {
          lastSavedAt: m,
          onResume: () => l('preparation'),
          onNewGame: () => l('preparation'),
          onCheckUpdate: () => void r(),
          isCheckingUpdate: f,
        }),
        u.jsx(sE, { banner: s, onApply: d }),
      ],
    }),
  });
}
const CE = {
  title: 'title',
  preparation: 'base',
  machine: 'base',
  armory: 'base',
  patches: 'base',
  settings: 'base',
  battle: 'battleNormal',
};
function RE(l, c) {
  (q.useEffect(() => {
    const s = () => {
      Xe.isInitialized() || (Xe.init(), Xe.setBgmVolume(l), Xe.setSeVolume(c));
    };
    return (
      window.addEventListener('pointerdown', s, { once: !0 }),
      window.addEventListener('keydown', s, { once: !0 }),
      () => {
        (window.removeEventListener('pointerdown', s), window.removeEventListener('keydown', s));
      }
    );
  }, []),
    q.useEffect(() => {
      Xe.setBgmVolume(l);
    }, [l]),
    q.useEffect(() => {
      Xe.setSeVolume(c);
    }, [c]));
}
function OE() {
  const { screen: l } = Zn(),
    c = G((r) => r.bgmVolume),
    s = G((r) => r.seVolume);
  switch (
    (RE(c, s),
    q.useEffect(() => {
      Xe.playBgm(CE[l]);
    }, [l]),
    l)
  ) {
    case 'title':
      return u.jsx(zE, {});
    case 'preparation':
      return u.jsx(LA, {});
    case 'machine':
      return u.jsx(F4, {});
    case 'armory':
      return u.jsx(vS, {});
    case 'patches':
      return u.jsx(lA, {});
    case 'settings':
      return u.jsx(aE, {});
    case 'battle':
      return u.jsx(K4, {});
    default:
      return u.jsx(I4, {});
  }
}
async function Xn() {
  return Iu();
}
async function DE() {
  const l = await Xn(),
    c = await w1(l),
    s = G.getState(),
    r = c.profile ?? a1;
  G.setState({
    highestTier: r.highestTier,
    highestWave: r.highestWave,
    totalPlayTimeSec: r.totalPlayTimeSec,
    totalRuns: r.totalRuns,
    totalEnemiesKilled: r.totalEnemiesKilled,
    createdAt: r.createdAt,
    lastPlayedAt: r.lastPlayedAt,
  });
  const f = c.currencies ?? n1;
  G.setState({ bolt: Q.fromJSON(f.bolt), alloy: Q.fromJSON(f.alloy) });
  const d = c.machine,
    m = { ...s.machineLevels };
  for (const M of so) {
    const T = d.find((D) => D.key === M);
    m[M] = T ? T.lv : 0;
  }
  G.setState({ machineLevels: m });
  const p = c.weapons ?? l1;
  G.setState({ weaponLv: p.weaponLv, initialWeapon: p.initialWeapon });
  const g = c.patches,
    y = new Map();
  for (const M of g)
    M.count > 0 && y.set(Gu(M.name, M.tier), { name: M.name, tier: M.tier, count: M.count });
  G.setState({ patches: y });
  const _ = c.equippedPatches,
    b = new Map();
  for (const M of _) b.set(M.slotIndex, { name: M.name, tier: M.tier });
  G.setState({ equippedPatches: b });
  const A = c.settings ?? i1;
  G.setState({
    bgmVolume: A.bgmVolume,
    seVolume: A.seVolume,
    vibrationEnabled: A.vibrationEnabled,
  });
}
async function C1() {
  const l = await Xn(),
    { bolt: c, alloy: s } = G.getState();
  await GT(l, { id: 'singleton', bolt: c.toJSON(), alloy: s.toJSON() });
}
async function R1() {
  const l = await Xn(),
    { machineLevels: c } = G.getState();
  await Promise.all(so.map((s) => YT(l, { key: s, lv: c[s] })));
}
async function O1() {
  const l = await Xn(),
    { weaponLv: c, initialWeapon: s } = G.getState();
  await ZT(l, { id: 'singleton', weaponLv: c, initialWeapon: s });
}
async function D1() {
  const l = await Xn(),
    { bgmVolume: c, seVolume: s, vibrationEnabled: r } = G.getState();
  await WT(l, { id: 'singleton', bgmVolume: c, seVolume: s, vibrationEnabled: r });
}
async function B1() {
  const l = await Xn(),
    {
      highestTier: c,
      highestWave: s,
      totalPlayTimeSec: r,
      totalRuns: f,
      totalEnemiesKilled: d,
      createdAt: m,
      lastPlayedAt: p,
    } = G.getState();
  await VT(l, {
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
async function L1() {
  const l = await Xn(),
    { patches: c } = G.getState(),
    s = [];
  for (const r of c.values())
    r.count > 0 && s.push(XT(l, { name: r.name, tier: r.tier, count: r.count }));
  await Promise.all(s);
}
async function $1() {
  const l = await Xn(),
    { equippedPatches: c } = G.getState(),
    s = [];
  for (const [r, f] of c) s.push(QT(l, { slotIndex: r, name: f.name, tier: f.tier }));
  await Promise.all(s);
}
async function H1() {
  await Promise.all([B1(), C1(), R1(), O1(), L1(), $1(), D1()]);
}
function BE() {
  const l = () => {
    document.visibilityState === 'hidden' && H1();
  };
  return (
    document.addEventListener('visibilitychange', l),
    () => document.removeEventListener('visibilitychange', l)
  );
}
const LE = 500;
function Sl(l, c) {
  let s = null;
  return () => {
    (s != null && clearTimeout(s),
      (s = setTimeout(() => {
        c().catch((r) => {
          console.error(`[autosave:${l}] failed`, r);
        });
      }, LE)));
  };
}
function $E() {
  (BE(),
    window.addEventListener('beforeunload', () => {
      H1();
    }));
  const l = Sl('currencies', C1),
    c = Sl('machine', R1),
    s = Sl('weapons', O1),
    r = Sl('settings', D1),
    f = Sl('profile', B1),
    d = Sl('patches', L1),
    m = Sl('equippedPatches', $1);
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
const k1 = document.getElementById('root');
if (!k1) throw new Error('Failed to find #root element');
const HE = rg.createRoot(k1);
DE()
  .catch((l) => {
    console.error('[hydrateStore] failed', l);
  })
  .finally(() => {
    ($E(), HE.render(u.jsx(yS, { children: u.jsx(OE, {}) })));
  });
