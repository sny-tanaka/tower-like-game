var jv = Object.defineProperty;
var Av = (c, s, u) =>
  s in c ? jv(c, s, { enumerable: !0, configurable: !0, writable: !0, value: u }) : (c[s] = u);
var ta = (c, s, u) => Av(c, typeof s != 'symbol' ? s + '' : s, u);
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) o(d);
  new MutationObserver((d) => {
    for (const f of d)
      if (f.type === 'childList')
        for (const h of f.addedNodes) h.tagName === 'LINK' && h.rel === 'modulepreload' && o(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(d) {
    const f = {};
    return (
      d.integrity && (f.integrity = d.integrity),
      d.referrerPolicy && (f.referrerPolicy = d.referrerPolicy),
      d.crossOrigin === 'use-credentials'
        ? (f.credentials = 'include')
        : d.crossOrigin === 'anonymous'
          ? (f.credentials = 'omit')
          : (f.credentials = 'same-origin'),
      f
    );
  }
  function o(d) {
    if (d.ep) return;
    d.ep = !0;
    const f = u(d);
    fetch(d.href, f);
  }
})();
function Tv(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var Wo = { exports: {} },
  qc = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ch;
function Ev() {
  if (Ch) return qc;
  Ch = 1;
  var c = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.fragment');
  function u(o, d, f) {
    var h = null;
    if ((f !== void 0 && (h = '' + f), d.key !== void 0 && (h = '' + d.key), 'key' in d)) {
      f = {};
      for (var p in d) p !== 'key' && (f[p] = d[p]);
    } else f = d;
    return ((d = f.ref), { $$typeof: c, type: o, key: h, ref: d !== void 0 ? d : null, props: f });
  }
  return ((qc.Fragment = s), (qc.jsx = u), (qc.jsxs = u), qc);
}
var Rh;
function Nv() {
  return (Rh || ((Rh = 1), (Wo.exports = Ev())), Wo.exports);
}
var r = Nv(),
  Fo = { exports: {} },
  Gc = {},
  Io = { exports: {} },
  Po = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wh;
function Mv() {
  return (
    wh ||
      ((wh = 1),
      (function (c) {
        function s(w, $) {
          var P = w.length;
          w.push($);
          e: for (; 0 < P; ) {
            var ye = (P - 1) >>> 1,
              Se = w[ye];
            if (0 < d(Se, $)) ((w[ye] = $), (w[P] = Se), (P = ye));
            else break e;
          }
        }
        function u(w) {
          return w.length === 0 ? null : w[0];
        }
        function o(w) {
          if (w.length === 0) return null;
          var $ = w[0],
            P = w.pop();
          if (P !== $) {
            w[0] = P;
            e: for (var ye = 0, Se = w.length, x = Se >>> 1; ye < x; ) {
              var L = 2 * (ye + 1) - 1,
                V = w[L],
                Z = L + 1,
                ae = w[Z];
              if (0 > d(V, P))
                Z < Se && 0 > d(ae, V)
                  ? ((w[ye] = ae), (w[Z] = P), (ye = Z))
                  : ((w[ye] = V), (w[L] = P), (ye = L));
              else if (Z < Se && 0 > d(ae, P)) ((w[ye] = ae), (w[Z] = P), (ye = Z));
              else break e;
            }
          }
          return $;
        }
        function d(w, $) {
          var P = w.sortIndex - $.sortIndex;
          return P !== 0 ? P : w.id - $.id;
        }
        if (
          ((c.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var f = performance;
          c.unstable_now = function () {
            return f.now();
          };
        } else {
          var h = Date,
            p = h.now();
          c.unstable_now = function () {
            return h.now() - p;
          };
        }
        var y = [],
          g = [],
          _ = 1,
          j = null,
          T = 3,
          M = !1,
          R = !1,
          U = !1,
          q = !1,
          Y = typeof setTimeout == 'function' ? setTimeout : null,
          K = typeof clearTimeout == 'function' ? clearTimeout : null,
          oe = typeof setImmediate < 'u' ? setImmediate : null;
        function be(w) {
          for (var $ = u(g); $ !== null; ) {
            if ($.callback === null) o(g);
            else if ($.startTime <= w) (o(g), ($.sortIndex = $.expirationTime), s(y, $));
            else break;
            $ = u(g);
          }
        }
        function Fe(w) {
          if (((U = !1), be(w), !R))
            if (u(y) !== null) ((R = !0), Ue || ((Ue = !0), ne()));
            else {
              var $ = u(g);
              $ !== null && Ye(Fe, $.startTime - w);
            }
        }
        var Ue = !1,
          ce = -1,
          Ve = 5,
          je = -1;
        function Le() {
          return q ? !0 : !(c.unstable_now() - je < Ve);
        }
        function Ce() {
          if (((q = !1), Ue)) {
            var w = c.unstable_now();
            je = w;
            var $ = !0;
            try {
              e: {
                ((R = !1), U && ((U = !1), K(ce), (ce = -1)), (M = !0));
                var P = T;
                try {
                  t: {
                    for (be(w), j = u(y); j !== null && !(j.expirationTime > w && Le()); ) {
                      var ye = j.callback;
                      if (typeof ye == 'function') {
                        ((j.callback = null), (T = j.priorityLevel));
                        var Se = ye(j.expirationTime <= w);
                        if (((w = c.unstable_now()), typeof Se == 'function')) {
                          ((j.callback = Se), be(w), ($ = !0));
                          break t;
                        }
                        (j === u(y) && o(y), be(w));
                      } else o(y);
                      j = u(y);
                    }
                    if (j !== null) $ = !0;
                    else {
                      var x = u(g);
                      (x !== null && Ye(Fe, x.startTime - w), ($ = !1));
                    }
                  }
                  break e;
                } finally {
                  ((j = null), (T = P), (M = !1));
                }
                $ = void 0;
              }
            } finally {
              $ ? ne() : (Ue = !1);
            }
          }
        }
        var ne;
        if (typeof oe == 'function')
          ne = function () {
            oe(Ce);
          };
        else if (typeof MessageChannel < 'u') {
          var et = new MessageChannel(),
            dt = et.port2;
          ((et.port1.onmessage = Ce),
            (ne = function () {
              dt.postMessage(null);
            }));
        } else
          ne = function () {
            Y(Ce, 0);
          };
        function Ye(w, $) {
          ce = Y(function () {
            w(c.unstable_now());
          }, $);
        }
        ((c.unstable_IdlePriority = 5),
          (c.unstable_ImmediatePriority = 1),
          (c.unstable_LowPriority = 4),
          (c.unstable_NormalPriority = 3),
          (c.unstable_Profiling = null),
          (c.unstable_UserBlockingPriority = 2),
          (c.unstable_cancelCallback = function (w) {
            w.callback = null;
          }),
          (c.unstable_forceFrameRate = function (w) {
            0 > w || 125 < w
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (Ve = 0 < w ? Math.floor(1e3 / w) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return T;
          }),
          (c.unstable_next = function (w) {
            switch (T) {
              case 1:
              case 2:
              case 3:
                var $ = 3;
                break;
              default:
                $ = T;
            }
            var P = T;
            T = $;
            try {
              return w();
            } finally {
              T = P;
            }
          }),
          (c.unstable_requestPaint = function () {
            q = !0;
          }),
          (c.unstable_runWithPriority = function (w, $) {
            switch (w) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                w = 3;
            }
            var P = T;
            T = w;
            try {
              return $();
            } finally {
              T = P;
            }
          }),
          (c.unstable_scheduleCallback = function (w, $, P) {
            var ye = c.unstable_now();
            switch (
              (typeof P == 'object' && P !== null
                ? ((P = P.delay), (P = typeof P == 'number' && 0 < P ? ye + P : ye))
                : (P = ye),
              w)
            ) {
              case 1:
                var Se = -1;
                break;
              case 2:
                Se = 250;
                break;
              case 5:
                Se = 1073741823;
                break;
              case 4:
                Se = 1e4;
                break;
              default:
                Se = 5e3;
            }
            return (
              (Se = P + Se),
              (w = {
                id: _++,
                callback: $,
                priorityLevel: w,
                startTime: P,
                expirationTime: Se,
                sortIndex: -1,
              }),
              P > ye
                ? ((w.sortIndex = P),
                  s(g, w),
                  u(y) === null &&
                    w === u(g) &&
                    (U ? (K(ce), (ce = -1)) : (U = !0), Ye(Fe, P - ye)))
                : ((w.sortIndex = Se), s(y, w), R || M || ((R = !0), Ue || ((Ue = !0), ne()))),
              w
            );
          }),
          (c.unstable_shouldYield = Le),
          (c.unstable_wrapCallback = function (w) {
            var $ = T;
            return function () {
              var P = T;
              T = $;
              try {
                return w.apply(this, arguments);
              } finally {
                T = P;
              }
            };
          }));
      })(Po)),
    Po
  );
}
var Oh;
function zv() {
  return (Oh || ((Oh = 1), (Io.exports = Mv())), Io.exports);
}
var er = { exports: {} },
  le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dh;
function Cv() {
  if (Dh) return le;
  Dh = 1;
  var c = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.portal'),
    u = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    d = Symbol.for('react.profiler'),
    f = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    p = Symbol.for('react.forward_ref'),
    y = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    _ = Symbol.for('react.lazy'),
    j = Symbol.for('react.activity'),
    T = Symbol.iterator;
  function M(x) {
    return x === null || typeof x != 'object'
      ? null
      : ((x = (T && x[T]) || x['@@iterator']), typeof x == 'function' ? x : null);
  }
  var R = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    U = Object.assign,
    q = {};
  function Y(x, L, V) {
    ((this.props = x), (this.context = L), (this.refs = q), (this.updater = V || R));
  }
  ((Y.prototype.isReactComponent = {}),
    (Y.prototype.setState = function (x, L) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, L, 'setState');
    }),
    (Y.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function K() {}
  K.prototype = Y.prototype;
  function oe(x, L, V) {
    ((this.props = x), (this.context = L), (this.refs = q), (this.updater = V || R));
  }
  var be = (oe.prototype = new K());
  ((be.constructor = oe), U(be, Y.prototype), (be.isPureReactComponent = !0));
  var Fe = Array.isArray;
  function Ue() {}
  var ce = { H: null, A: null, T: null, S: null },
    Ve = Object.prototype.hasOwnProperty;
  function je(x, L, V) {
    var Z = V.ref;
    return { $$typeof: c, type: x, key: L, ref: Z !== void 0 ? Z : null, props: V };
  }
  function Le(x, L) {
    return je(x.type, L, x.props);
  }
  function Ce(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === c;
  }
  function ne(x) {
    var L = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function (V) {
        return L[V];
      })
    );
  }
  var et = /\/+/g;
  function dt(x, L) {
    return typeof x == 'object' && x !== null && x.key != null ? ne('' + x.key) : L.toString(36);
  }
  function Ye(x) {
    switch (x.status) {
      case 'fulfilled':
        return x.value;
      case 'rejected':
        throw x.reason;
      default:
        switch (
          (typeof x.status == 'string'
            ? x.then(Ue, Ue)
            : ((x.status = 'pending'),
              x.then(
                function (L) {
                  x.status === 'pending' && ((x.status = 'fulfilled'), (x.value = L));
                },
                function (L) {
                  x.status === 'pending' && ((x.status = 'rejected'), (x.reason = L));
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
  function w(x, L, V, Z, ae) {
    var se = typeof x;
    (se === 'undefined' || se === 'boolean') && (x = null);
    var de = !1;
    if (x === null) de = !0;
    else
      switch (se) {
        case 'bigint':
        case 'string':
        case 'number':
          de = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case c:
            case s:
              de = !0;
              break;
            case _:
              return ((de = x._init), w(de(x._payload), L, V, Z, ae));
          }
      }
    if (de)
      return (
        (ae = ae(x)),
        (de = Z === '' ? '.' + dt(x, 0) : Z),
        Fe(ae)
          ? ((V = ''),
            de != null && (V = de.replace(et, '$&/') + '/'),
            w(ae, L, V, '', function (da) {
              return da;
            }))
          : ae != null &&
            (Ce(ae) &&
              (ae = Le(
                ae,
                V +
                  (ae.key == null || (x && x.key === ae.key)
                    ? ''
                    : ('' + ae.key).replace(et, '$&/') + '/') +
                  de
              )),
            L.push(ae)),
        1
      );
    de = 0;
    var Ze = Z === '' ? '.' : Z + ':';
    if (Fe(x))
      for (var Ee = 0; Ee < x.length; Ee++)
        ((Z = x[Ee]), (se = Ze + dt(Z, Ee)), (de += w(Z, L, V, se, ae)));
    else if (((Ee = M(x)), typeof Ee == 'function'))
      for (x = Ee.call(x), Ee = 0; !(Z = x.next()).done; )
        ((Z = Z.value), (se = Ze + dt(Z, Ee++)), (de += w(Z, L, V, se, ae)));
    else if (se === 'object') {
      if (typeof x.then == 'function') return w(Ye(x), L, V, Z, ae);
      throw (
        (L = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (L === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : L) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return de;
  }
  function $(x, L, V) {
    if (x == null) return x;
    var Z = [],
      ae = 0;
    return (
      w(x, Z, '', '', function (se) {
        return L.call(V, se, ae++);
      }),
      Z
    );
  }
  function P(x) {
    if (x._status === -1) {
      var L = x._result;
      ((L = L()),
        L.then(
          function (V) {
            (x._status === 0 || x._status === -1) && ((x._status = 1), (x._result = V));
          },
          function (V) {
            (x._status === 0 || x._status === -1) && ((x._status = 2), (x._result = V));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = L)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var ye =
      typeof reportError == 'function'
        ? reportError
        : function (x) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var L = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof x == 'object' && x !== null && typeof x.message == 'string'
                    ? String(x.message)
                    : String(x),
                error: x,
              });
              if (!window.dispatchEvent(L)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', x);
              return;
            }
            console.error(x);
          },
    Se = {
      map: $,
      forEach: function (x, L, V) {
        $(
          x,
          function () {
            L.apply(this, arguments);
          },
          V
        );
      },
      count: function (x) {
        var L = 0;
        return (
          $(x, function () {
            L++;
          }),
          L
        );
      },
      toArray: function (x) {
        return (
          $(x, function (L) {
            return L;
          }) || []
        );
      },
      only: function (x) {
        if (!Ce(x))
          throw Error('React.Children.only expected to receive a single React element child.');
        return x;
      },
    };
  return (
    (le.Activity = j),
    (le.Children = Se),
    (le.Component = Y),
    (le.Fragment = u),
    (le.Profiler = d),
    (le.PureComponent = oe),
    (le.StrictMode = o),
    (le.Suspense = y),
    (le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ce),
    (le.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return ce.H.useMemoCache(x);
      },
    }),
    (le.cache = function (x) {
      return function () {
        return x.apply(null, arguments);
      };
    }),
    (le.cacheSignal = function () {
      return null;
    }),
    (le.cloneElement = function (x, L, V) {
      if (x == null) throw Error('The argument must be a React element, but you passed ' + x + '.');
      var Z = U({}, x.props),
        ae = x.key;
      if (L != null)
        for (se in (L.key !== void 0 && (ae = '' + L.key), L))
          !Ve.call(L, se) ||
            se === 'key' ||
            se === '__self' ||
            se === '__source' ||
            (se === 'ref' && L.ref === void 0) ||
            (Z[se] = L[se]);
      var se = arguments.length - 2;
      if (se === 1) Z.children = V;
      else if (1 < se) {
        for (var de = Array(se), Ze = 0; Ze < se; Ze++) de[Ze] = arguments[Ze + 2];
        Z.children = de;
      }
      return je(x.type, ae, Z);
    }),
    (le.createContext = function (x) {
      return (
        (x = {
          $$typeof: h,
          _currentValue: x,
          _currentValue2: x,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (x.Provider = x),
        (x.Consumer = { $$typeof: f, _context: x }),
        x
      );
    }),
    (le.createElement = function (x, L, V) {
      var Z,
        ae = {},
        se = null;
      if (L != null)
        for (Z in (L.key !== void 0 && (se = '' + L.key), L))
          Ve.call(L, Z) && Z !== 'key' && Z !== '__self' && Z !== '__source' && (ae[Z] = L[Z]);
      var de = arguments.length - 2;
      if (de === 1) ae.children = V;
      else if (1 < de) {
        for (var Ze = Array(de), Ee = 0; Ee < de; Ee++) Ze[Ee] = arguments[Ee + 2];
        ae.children = Ze;
      }
      if (x && x.defaultProps)
        for (Z in ((de = x.defaultProps), de)) ae[Z] === void 0 && (ae[Z] = de[Z]);
      return je(x, se, ae);
    }),
    (le.createRef = function () {
      return { current: null };
    }),
    (le.forwardRef = function (x) {
      return { $$typeof: p, render: x };
    }),
    (le.isValidElement = Ce),
    (le.lazy = function (x) {
      return { $$typeof: _, _payload: { _status: -1, _result: x }, _init: P };
    }),
    (le.memo = function (x, L) {
      return { $$typeof: g, type: x, compare: L === void 0 ? null : L };
    }),
    (le.startTransition = function (x) {
      var L = ce.T,
        V = {};
      ce.T = V;
      try {
        var Z = x(),
          ae = ce.S;
        (ae !== null && ae(V, Z),
          typeof Z == 'object' && Z !== null && typeof Z.then == 'function' && Z.then(Ue, ye));
      } catch (se) {
        ye(se);
      } finally {
        (L !== null && V.types !== null && (L.types = V.types), (ce.T = L));
      }
    }),
    (le.unstable_useCacheRefresh = function () {
      return ce.H.useCacheRefresh();
    }),
    (le.use = function (x) {
      return ce.H.use(x);
    }),
    (le.useActionState = function (x, L, V) {
      return ce.H.useActionState(x, L, V);
    }),
    (le.useCallback = function (x, L) {
      return ce.H.useCallback(x, L);
    }),
    (le.useContext = function (x) {
      return ce.H.useContext(x);
    }),
    (le.useDebugValue = function () {}),
    (le.useDeferredValue = function (x, L) {
      return ce.H.useDeferredValue(x, L);
    }),
    (le.useEffect = function (x, L) {
      return ce.H.useEffect(x, L);
    }),
    (le.useEffectEvent = function (x) {
      return ce.H.useEffectEvent(x);
    }),
    (le.useId = function () {
      return ce.H.useId();
    }),
    (le.useImperativeHandle = function (x, L, V) {
      return ce.H.useImperativeHandle(x, L, V);
    }),
    (le.useInsertionEffect = function (x, L) {
      return ce.H.useInsertionEffect(x, L);
    }),
    (le.useLayoutEffect = function (x, L) {
      return ce.H.useLayoutEffect(x, L);
    }),
    (le.useMemo = function (x, L) {
      return ce.H.useMemo(x, L);
    }),
    (le.useOptimistic = function (x, L) {
      return ce.H.useOptimistic(x, L);
    }),
    (le.useReducer = function (x, L, V) {
      return ce.H.useReducer(x, L, V);
    }),
    (le.useRef = function (x) {
      return ce.H.useRef(x);
    }),
    (le.useState = function (x) {
      return ce.H.useState(x);
    }),
    (le.useSyncExternalStore = function (x, L, V) {
      return ce.H.useSyncExternalStore(x, L, V);
    }),
    (le.useTransition = function () {
      return ce.H.useTransition();
    }),
    (le.version = '19.2.5'),
    le
  );
}
var Bh;
function br() {
  return (Bh || ((Bh = 1), (er.exports = Cv())), er.exports);
}
var tr = { exports: {} },
  ht = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Lh;
function Rv() {
  if (Lh) return ht;
  Lh = 1;
  var c = br();
  function s(y) {
    var g = 'https://react.dev/errors/' + y;
    if (1 < arguments.length) {
      g += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var _ = 2; _ < arguments.length; _++) g += '&args[]=' + encodeURIComponent(arguments[_]);
    }
    return (
      'Minified React error #' +
      y +
      '; visit ' +
      g +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function u() {}
  var o = {
      d: {
        f: u,
        r: function () {
          throw Error(s(522));
        },
        D: u,
        C: u,
        L: u,
        m: u,
        X: u,
        S: u,
        M: u,
      },
      p: 0,
      findDOMNode: null,
    },
    d = Symbol.for('react.portal');
  function f(y, g, _) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: j == null ? null : '' + j,
      children: y,
      containerInfo: g,
      implementation: _,
    };
  }
  var h = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(y, g) {
    if (y === 'font') return '';
    if (typeof g == 'string') return g === 'use-credentials' ? g : '';
  }
  return (
    (ht.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (ht.createPortal = function (y, g) {
      var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(s(299));
      return f(y, g, null, _);
    }),
    (ht.flushSync = function (y) {
      var g = h.T,
        _ = o.p;
      try {
        if (((h.T = null), (o.p = 2), y)) return y();
      } finally {
        ((h.T = g), (o.p = _), o.d.f());
      }
    }),
    (ht.preconnect = function (y, g) {
      typeof y == 'string' &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
          : (g = null),
        o.d.C(y, g));
    }),
    (ht.prefetchDNS = function (y) {
      typeof y == 'string' && o.d.D(y);
    }),
    (ht.preinit = function (y, g) {
      if (typeof y == 'string' && g && typeof g.as == 'string') {
        var _ = g.as,
          j = p(_, g.crossOrigin),
          T = typeof g.integrity == 'string' ? g.integrity : void 0,
          M = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
        _ === 'style'
          ? o.d.S(y, typeof g.precedence == 'string' ? g.precedence : void 0, {
              crossOrigin: j,
              integrity: T,
              fetchPriority: M,
            })
          : _ === 'script' &&
            o.d.X(y, {
              crossOrigin: j,
              integrity: T,
              fetchPriority: M,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
      }
    }),
    (ht.preinitModule = function (y, g) {
      if (typeof y == 'string')
        if (typeof g == 'object' && g !== null) {
          if (g.as == null || g.as === 'script') {
            var _ = p(g.as, g.crossOrigin);
            o.d.M(y, {
              crossOrigin: _,
              integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
          }
        } else g == null && o.d.M(y);
    }),
    (ht.preload = function (y, g) {
      if (typeof y == 'string' && typeof g == 'object' && g !== null && typeof g.as == 'string') {
        var _ = g.as,
          j = p(_, g.crossOrigin);
        o.d.L(y, _, {
          crossOrigin: j,
          integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
          type: typeof g.type == 'string' ? g.type : void 0,
          fetchPriority: typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0,
          referrerPolicy: typeof g.referrerPolicy == 'string' ? g.referrerPolicy : void 0,
          imageSrcSet: typeof g.imageSrcSet == 'string' ? g.imageSrcSet : void 0,
          imageSizes: typeof g.imageSizes == 'string' ? g.imageSizes : void 0,
          media: typeof g.media == 'string' ? g.media : void 0,
        });
      }
    }),
    (ht.preloadModule = function (y, g) {
      if (typeof y == 'string')
        if (g) {
          var _ = p(g.as, g.crossOrigin);
          o.d.m(y, {
            as: typeof g.as == 'string' && g.as !== 'script' ? g.as : void 0,
            crossOrigin: _,
            integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          });
        } else o.d.m(y);
    }),
    (ht.requestFormReset = function (y) {
      o.d.r(y);
    }),
    (ht.unstable_batchedUpdates = function (y, g) {
      return y(g);
    }),
    (ht.useFormState = function (y, g, _) {
      return h.H.useFormState(y, g, _);
    }),
    (ht.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (ht.version = '19.2.5'),
    ht
  );
}
var Hh;
function wv() {
  if (Hh) return tr.exports;
  Hh = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (s) {
        console.error(s);
      }
  }
  return (c(), (tr.exports = Rv()), tr.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Uh;
function Ov() {
  if (Uh) return Gc;
  Uh = 1;
  var c = zv(),
    s = br(),
    u = wv();
  function o(e) {
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
  function d(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function f(e) {
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
  function h(e) {
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
  function y(e) {
    if (f(e) !== e) throw Error(o(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = f(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var a = e, n = t; ; ) {
      var l = a.return;
      if (l === null) break;
      var i = l.alternate;
      if (i === null) {
        if (((n = l.return), n !== null)) {
          a = n;
          continue;
        }
        break;
      }
      if (l.child === i.child) {
        for (i = l.child; i; ) {
          if (i === a) return (y(l), e);
          if (i === n) return (y(l), t);
          i = i.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== n.return) ((a = l), (n = i));
      else {
        for (var m = !1, v = l.child; v; ) {
          if (v === a) {
            ((m = !0), (a = l), (n = i));
            break;
          }
          if (v === n) {
            ((m = !0), (n = l), (a = i));
            break;
          }
          v = v.sibling;
        }
        if (!m) {
          for (v = i.child; v; ) {
            if (v === a) {
              ((m = !0), (a = i), (n = l));
              break;
            }
            if (v === n) {
              ((m = !0), (n = i), (a = l));
              break;
            }
            v = v.sibling;
          }
          if (!m) throw Error(o(189));
        }
      }
      if (a.alternate !== n) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
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
  var j = Object.assign,
    T = Symbol.for('react.element'),
    M = Symbol.for('react.transitional.element'),
    R = Symbol.for('react.portal'),
    U = Symbol.for('react.fragment'),
    q = Symbol.for('react.strict_mode'),
    Y = Symbol.for('react.profiler'),
    K = Symbol.for('react.consumer'),
    oe = Symbol.for('react.context'),
    be = Symbol.for('react.forward_ref'),
    Fe = Symbol.for('react.suspense'),
    Ue = Symbol.for('react.suspense_list'),
    ce = Symbol.for('react.memo'),
    Ve = Symbol.for('react.lazy'),
    je = Symbol.for('react.activity'),
    Le = Symbol.for('react.memo_cache_sentinel'),
    Ce = Symbol.iterator;
  function ne(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Ce && e[Ce]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var et = Symbol.for('react.client.reference');
  function dt(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === et ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case U:
        return 'Fragment';
      case Y:
        return 'Profiler';
      case q:
        return 'StrictMode';
      case Fe:
        return 'Suspense';
      case Ue:
        return 'SuspenseList';
      case je:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case R:
          return 'Portal';
        case oe:
          return e.displayName || 'Context';
        case K:
          return (e._context.displayName || 'Context') + '.Consumer';
        case be:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case ce:
          return ((t = e.displayName || null), t !== null ? t : dt(e.type) || 'Memo');
        case Ve:
          ((t = e._payload), (e = e._init));
          try {
            return dt(e(t));
          } catch {}
      }
    return null;
  }
  var Ye = Array.isArray,
    w = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    P = { pending: !1, data: null, method: null, action: null },
    ye = [],
    Se = -1;
  function x(e) {
    return { current: e };
  }
  function L(e) {
    0 > Se || ((e.current = ye[Se]), (ye[Se] = null), Se--);
  }
  function V(e, t) {
    (Se++, (ye[Se] = e.current), (e.current = t));
  }
  var Z = x(null),
    ae = x(null),
    se = x(null),
    de = x(null);
  function Ze(e, t) {
    switch ((V(se, t), V(ae, e), V(Z, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Pm(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Pm(t)), (e = eh(t, e)));
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
    (L(Z), V(Z, e));
  }
  function Ee() {
    (L(Z), L(ae), L(se));
  }
  function da(e) {
    e.memoizedState !== null && V(de, e);
    var t = Z.current,
      a = eh(t, e.type);
    t !== a && (V(ae, e), V(Z, a));
  }
  function Ft(e) {
    (ae.current === e && (L(Z), L(ae)), de.current === e && (L(de), (Bc._currentValue = P)));
  }
  var Ba, we;
  function tt(e) {
    if (Ba === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((Ba = (t && t[1]) || ''),
          (we =
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
      Ba +
      e +
      we
    );
  }
  var ma = !1;
  function mt(e, t) {
    if (!e || ma) return '';
    ma = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var H = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(H.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(H, []);
                } catch (C) {
                  var z = C;
                }
                Reflect.construct(e, [], H);
              } else {
                try {
                  H.call();
                } catch (C) {
                  z = C;
                }
                e.call(H.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (C) {
                z = C;
              }
              (H = e()) && typeof H.catch == 'function' && H.catch(function () {});
            }
          } catch (C) {
            if (C && z && typeof C.stack == 'string') return [C.stack, z.stack];
          }
          return [null, null];
        },
      };
      n.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var l = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, 'name');
      l &&
        l.configurable &&
        Object.defineProperty(n.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var i = n.DetermineComponentFrameRoot(),
        m = i[0],
        v = i[1];
      if (m && v) {
        var b = m.split(`
`),
          N = v.split(`
`);
        for (l = n = 0; n < b.length && !b[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; l < N.length && !N[l].includes('DetermineComponentFrameRoot'); ) l++;
        if (n === b.length || l === N.length)
          for (n = b.length - 1, l = N.length - 1; 1 <= n && 0 <= l && b[n] !== N[l]; ) l--;
        for (; 1 <= n && 0 <= l; n--, l--)
          if (b[n] !== N[l]) {
            if (n !== 1 || l !== 1)
              do
                if ((n--, l--, 0 > l || b[n] !== N[l])) {
                  var O =
                    `
` + b[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      O.includes('<anonymous>') &&
                      (O = O.replace('<anonymous>', e.displayName)),
                    O
                  );
                }
              while (1 <= n && 0 <= l);
            break;
          }
      }
    } finally {
      ((ma = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? tt(a) : '';
  }
  function at(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return tt(e.type);
      case 16:
        return tt('Lazy');
      case 13:
        return e.child !== t && t !== null ? tt('Suspense Fallback') : tt('Suspense');
      case 19:
        return tt('SuspenseList');
      case 0:
      case 15:
        return mt(e.type, !1);
      case 11:
        return mt(e.type.render, !1);
      case 1:
        return mt(e.type, !0);
      case 31:
        return tt('Activity');
      default:
        return '';
    }
  }
  function Tt(e) {
    try {
      var t = '',
        a = null;
      do ((t += at(e, a)), (a = e), (e = e.return));
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
  var Jn = Object.prototype.hasOwnProperty,
    J = c.unstable_scheduleCallback,
    gn = c.unstable_cancelCallback,
    Ls = c.unstable_shouldYield,
    a1 = c.unstable_requestPaint,
    Et = c.unstable_now,
    n1 = c.unstable_getCurrentPriorityLevel,
    Cr = c.unstable_ImmediatePriority,
    Rr = c.unstable_UserBlockingPriority,
    ni = c.unstable_NormalPriority,
    l1 = c.unstable_LowPriority,
    wr = c.unstable_IdlePriority,
    c1 = c.log,
    i1 = c.unstable_setDisableYieldValue,
    Ql = null,
    Nt = null;
  function La(e) {
    if ((typeof c1 == 'function' && i1(e), Nt && typeof Nt.setStrictMode == 'function'))
      try {
        Nt.setStrictMode(Ql, e);
      } catch {}
  }
  var Mt = Math.clz32 ? Math.clz32 : o1,
    s1 = Math.log,
    u1 = Math.LN2;
  function o1(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((s1(e) / u1) | 0)) | 0);
  }
  var li = 256,
    ci = 262144,
    ii = 4194304;
  function _n(e) {
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
  function si(e, t, a) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var l = 0,
      i = e.suspendedLanes,
      m = e.pingedLanes;
    e = e.warmLanes;
    var v = n & 134217727;
    return (
      v !== 0
        ? ((n = v & ~i),
          n !== 0
            ? (l = _n(n))
            : ((m &= v), m !== 0 ? (l = _n(m)) : a || ((a = v & ~e), a !== 0 && (l = _n(a)))))
        : ((v = n & ~i),
          v !== 0
            ? (l = _n(v))
            : m !== 0
              ? (l = _n(m))
              : a || ((a = n & ~e), a !== 0 && (l = _n(a)))),
      l === 0
        ? 0
        : t !== 0 &&
            t !== l &&
            (t & i) === 0 &&
            ((i = l & -l), (a = t & -t), i >= a || (i === 32 && (a & 4194048) !== 0))
          ? t
          : l
    );
  }
  function Kl(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function r1(e, t) {
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
  function Or() {
    var e = ii;
    return ((ii <<= 1), (ii & 62914560) === 0 && (ii = 4194304), e);
  }
  function Hs(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Jl(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function f1(e, t, a, n, l, i) {
    var m = e.pendingLanes;
    ((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0));
    var v = e.entanglements,
      b = e.expirationTimes,
      N = e.hiddenUpdates;
    for (a = m & ~a; 0 < a; ) {
      var O = 31 - Mt(a),
        H = 1 << O;
      ((v[O] = 0), (b[O] = -1));
      var z = N[O];
      if (z !== null)
        for (N[O] = null, O = 0; O < z.length; O++) {
          var C = z[O];
          C !== null && (C.lane &= -536870913);
        }
      a &= ~H;
    }
    (n !== 0 && Dr(e, n, 0),
      i !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(m & ~t)));
  }
  function Dr(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - Mt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function Br(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var n = 31 - Mt(a),
        l = 1 << n;
      ((l & t) | (e[n] & t) && (e[n] |= t), (a &= ~l));
    }
  }
  function Lr(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : Us(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function Us(e) {
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
  function qs(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Hr() {
    var e = $.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : jh(e.type));
  }
  function Ur(e, t) {
    var a = $.p;
    try {
      return (($.p = e), t());
    } finally {
      $.p = a;
    }
  }
  var Ha = Math.random().toString(36).slice(2),
    it = '__reactFiber$' + Ha,
    gt = '__reactProps$' + Ha,
    Wn = '__reactContainer$' + Ha,
    Gs = '__reactEvents$' + Ha,
    d1 = '__reactListeners$' + Ha,
    m1 = '__reactHandles$' + Ha,
    qr = '__reactResources$' + Ha,
    Wl = '__reactMarker$' + Ha;
  function Vs(e) {
    (delete e[it], delete e[gt], delete e[Gs], delete e[d1], delete e[m1]);
  }
  function Fn(e) {
    var t = e[it];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Wn] || a[it])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = sh(e); e !== null; ) {
            if ((a = e[it])) return a;
            e = sh(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function In(e) {
    if ((e = e[it] || e[Wn])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Fl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Pn(e) {
    var t = e[qr];
    return (t || (t = e[qr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function nt(e) {
    e[Wl] = !0;
  }
  var Gr = new Set(),
    Vr = {};
  function bn(e, t) {
    (el(e, t), el(e + 'Capture', t));
  }
  function el(e, t) {
    for (Vr[e] = t, e = 0; e < t.length; e++) Gr.add(t[e]);
  }
  var h1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    $r = {},
    kr = {};
  function p1(e) {
    return Jn.call(kr, e)
      ? !0
      : Jn.call($r, e)
        ? !1
        : h1.test(e)
          ? (kr[e] = !0)
          : (($r[e] = !0), !1);
  }
  function ui(e, t, a) {
    if (p1(t))
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
  function oi(e, t, a) {
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
  function ha(e, t, a, n) {
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
  function qt(e) {
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
  function Yr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function v1(e, t, a) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var l = n.get,
        i = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (m) {
            ((a = '' + m), i.call(this, m));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (m) {
            a = '' + m;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function $s(e) {
    if (!e._valueTracker) {
      var t = Yr(e) ? 'checked' : 'value';
      e._valueTracker = v1(e, t, '' + e[t]);
    }
  }
  function Zr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      n = '';
    return (
      e && (n = Yr(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function ri(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var y1 = /[\n"\\]/g;
  function Gt(e) {
    return e.replace(y1, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function ks(e, t, a, n, l, i, m, v) {
    ((e.name = ''),
      m != null && typeof m != 'function' && typeof m != 'symbol' && typeof m != 'boolean'
        ? (e.type = m)
        : e.removeAttribute('type'),
      t != null
        ? m === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + qt(t))
          : e.value !== '' + qt(t) && (e.value = '' + qt(t))
        : (m !== 'submit' && m !== 'reset') || e.removeAttribute('value'),
      t != null
        ? Ys(e, m, qt(t))
        : a != null
          ? Ys(e, m, qt(a))
          : n != null && e.removeAttribute('value'),
      l == null && i != null && (e.defaultChecked = !!i),
      l != null && (e.checked = l && typeof l != 'function' && typeof l != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (e.name = '' + qt(v))
        : e.removeAttribute('name'));
  }
  function Xr(e, t, a, n, l, i, m, v) {
    if (
      (i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (e.type = i),
      t != null || a != null)
    ) {
      if (!((i !== 'submit' && i !== 'reset') || t != null)) {
        $s(e);
        return;
      }
      ((a = a != null ? '' + qt(a) : ''),
        (t = t != null ? '' + qt(t) : a),
        v || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? l),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = v ? e.checked : !!n),
      (e.defaultChecked = !!n),
      m != null &&
        typeof m != 'function' &&
        typeof m != 'symbol' &&
        typeof m != 'boolean' &&
        (e.name = m),
      $s(e));
  }
  function Ys(e, t, a) {
    (t === 'number' && ri(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function tl(e, t, a, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < a.length; l++) t['$' + a[l]] = !0;
      for (a = 0; a < e.length; a++)
        ((l = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== l && (e[a].selected = l),
          l && n && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + qt(a), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === a) {
          ((e[l].selected = !0), n && (e[l].defaultSelected = !0));
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Qr(e, t, a) {
    if (t != null && ((t = '' + qt(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + qt(a) : '';
  }
  function Kr(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(o(92));
        if (Ye(n)) {
          if (1 < n.length) throw Error(o(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = qt(t)),
      (e.defaultValue = a),
      (n = e.textContent),
      n === a && n !== '' && n !== null && (e.value = n),
      $s(e));
  }
  function al(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var g1 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Jr(e, t, a) {
    var n = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || g1.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function Wr(e, t, a) {
    if (t != null && typeof t != 'object') throw Error(o(62));
    if (((e = e.style), a != null)) {
      for (var n in a)
        !a.hasOwnProperty(n) ||
          (t != null && t.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? e.setProperty(n, '')
            : n === 'float'
              ? (e.cssFloat = '')
              : (e[n] = ''));
      for (var l in t) ((n = t[l]), t.hasOwnProperty(l) && a[l] !== n && Jr(e, l, n));
    } else for (var i in t) t.hasOwnProperty(i) && Jr(e, i, t[i]);
  }
  function Zs(e) {
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
  var _1 = new Map([
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
    b1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function fi(e) {
    return b1.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function pa() {}
  var Xs = null;
  function Qs(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var nl = null,
    ll = null;
  function Fr(e) {
    var t = In(e);
    if (t && (e = t.stateNode)) {
      var a = e[gt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (ks(
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
              a = a.querySelectorAll('input[name="' + Gt('' + t) + '"][type="radio"]'), t = 0;
              t < a.length;
              t++
            ) {
              var n = a[t];
              if (n !== e && n.form === e.form) {
                var l = n[gt] || null;
                if (!l) throw Error(o(90));
                ks(
                  n,
                  l.value,
                  l.defaultValue,
                  l.defaultValue,
                  l.checked,
                  l.defaultChecked,
                  l.type,
                  l.name
                );
              }
            }
            for (t = 0; t < a.length; t++) ((n = a[t]), n.form === e.form && Zr(n));
          }
          break e;
        case 'textarea':
          Qr(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && tl(e, !!a.multiple, t, !1));
      }
    }
  }
  var Ks = !1;
  function Ir(e, t, a) {
    if (Ks) return e(t, a);
    Ks = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Ks = !1),
        (nl !== null || ll !== null) &&
          (Ii(), nl && ((t = nl), (e = ll), (ll = nl = null), Fr(t), e)))
      )
        for (t = 0; t < e.length; t++) Fr(e[t]);
    }
  }
  function Il(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var n = a[gt] || null;
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
    if (a && typeof a != 'function') throw Error(o(231, t, typeof a));
    return a;
  }
  var va = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Js = !1;
  if (va)
    try {
      var Pl = {};
      (Object.defineProperty(Pl, 'passive', {
        get: function () {
          Js = !0;
        },
      }),
        window.addEventListener('test', Pl, Pl),
        window.removeEventListener('test', Pl, Pl));
    } catch {
      Js = !1;
    }
  var Ua = null,
    Ws = null,
    di = null;
  function Pr() {
    if (di) return di;
    var e,
      t = Ws,
      a = t.length,
      n,
      l = 'value' in Ua ? Ua.value : Ua.textContent,
      i = l.length;
    for (e = 0; e < a && t[e] === l[e]; e++);
    var m = a - e;
    for (n = 1; n <= m && t[a - n] === l[i - n]; n++);
    return (di = l.slice(e, 1 < n ? 1 - n : void 0));
  }
  function mi(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function hi() {
    return !0;
  }
  function ef() {
    return !1;
  }
  function _t(e) {
    function t(a, n, l, i, m) {
      ((this._reactName = a),
        (this._targetInst = l),
        (this.type = n),
        (this.nativeEvent = i),
        (this.target = m),
        (this.currentTarget = null));
      for (var v in e) e.hasOwnProperty(v) && ((a = e[v]), (this[v] = a ? a(i) : i[v]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? hi
          : ef),
        (this.isPropagationStopped = ef),
        this
      );
    }
    return (
      j(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = hi));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = hi));
        },
        persist: function () {},
        isPersistent: hi,
      }),
      t
    );
  }
  var Sn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    pi = _t(Sn),
    ec = j({}, Sn, { view: 0, detail: 0 }),
    S1 = _t(ec),
    Fs,
    Is,
    tc,
    vi = j({}, ec, {
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
      getModifierState: eu,
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
          : (e !== tc &&
              (tc && e.type === 'mousemove'
                ? ((Fs = e.screenX - tc.screenX), (Is = e.screenY - tc.screenY))
                : (Is = Fs = 0),
              (tc = e)),
            Fs);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Is;
      },
    }),
    tf = _t(vi),
    x1 = j({}, vi, { dataTransfer: 0 }),
    j1 = _t(x1),
    A1 = j({}, ec, { relatedTarget: 0 }),
    Ps = _t(A1),
    T1 = j({}, Sn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    E1 = _t(T1),
    N1 = j({}, Sn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    M1 = _t(N1),
    z1 = j({}, Sn, { data: 0 }),
    af = _t(z1),
    C1 = {
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
    R1 = {
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
    w1 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function O1(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = w1[e]) ? !!t[e] : !1;
  }
  function eu() {
    return O1;
  }
  var D1 = j({}, ec, {
      key: function (e) {
        if (e.key) {
          var t = C1[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = mi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? R1[e.keyCode] || 'Unidentified'
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
      getModifierState: eu,
      charCode: function (e) {
        return e.type === 'keypress' ? mi(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? mi(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    B1 = _t(D1),
    L1 = j({}, vi, {
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
    nf = _t(L1),
    H1 = j({}, ec, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: eu,
    }),
    U1 = _t(H1),
    q1 = j({}, Sn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    G1 = _t(q1),
    V1 = j({}, vi, {
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
    $1 = _t(V1),
    k1 = j({}, Sn, { newState: 0, oldState: 0 }),
    Y1 = _t(k1),
    Z1 = [9, 13, 27, 32],
    tu = va && 'CompositionEvent' in window,
    ac = null;
  va && 'documentMode' in document && (ac = document.documentMode);
  var X1 = va && 'TextEvent' in window && !ac,
    lf = va && (!tu || (ac && 8 < ac && 11 >= ac)),
    cf = ' ',
    sf = !1;
  function uf(e, t) {
    switch (e) {
      case 'keyup':
        return Z1.indexOf(t.keyCode) !== -1;
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
  function of(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var cl = !1;
  function Q1(e, t) {
    switch (e) {
      case 'compositionend':
        return of(t);
      case 'keypress':
        return t.which !== 32 ? null : ((sf = !0), cf);
      case 'textInput':
        return ((e = t.data), e === cf && sf ? null : e);
      default:
        return null;
    }
  }
  function K1(e, t) {
    if (cl)
      return e === 'compositionend' || (!tu && uf(e, t))
        ? ((e = Pr()), (di = Ws = Ua = null), (cl = !1), e)
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
        return lf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var J1 = {
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
  function rf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!J1[e.type] : t === 'textarea';
  }
  function ff(e, t, a, n) {
    (nl ? (ll ? ll.push(n) : (ll = [n])) : (nl = n),
      (t = cs(t, 'onChange')),
      0 < t.length &&
        ((a = new pi('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var nc = null,
    lc = null;
  function W1(e) {
    Qm(e, 0);
  }
  function yi(e) {
    var t = Fl(e);
    if (Zr(t)) return e;
  }
  function df(e, t) {
    if (e === 'change') return t;
  }
  var mf = !1;
  if (va) {
    var au;
    if (va) {
      var nu = 'oninput' in document;
      if (!nu) {
        var hf = document.createElement('div');
        (hf.setAttribute('oninput', 'return;'), (nu = typeof hf.oninput == 'function'));
      }
      au = nu;
    } else au = !1;
    mf = au && (!document.documentMode || 9 < document.documentMode);
  }
  function pf() {
    nc && (nc.detachEvent('onpropertychange', vf), (lc = nc = null));
  }
  function vf(e) {
    if (e.propertyName === 'value' && yi(lc)) {
      var t = [];
      (ff(t, lc, e, Qs(e)), Ir(W1, t));
    }
  }
  function F1(e, t, a) {
    e === 'focusin'
      ? (pf(), (nc = t), (lc = a), nc.attachEvent('onpropertychange', vf))
      : e === 'focusout' && pf();
  }
  function I1(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return yi(lc);
  }
  function P1(e, t) {
    if (e === 'click') return yi(t);
  }
  function ep(e, t) {
    if (e === 'input' || e === 'change') return yi(t);
  }
  function tp(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var zt = typeof Object.is == 'function' ? Object.is : tp;
  function cc(e, t) {
    if (zt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      n = Object.keys(t);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var l = a[n];
      if (!Jn.call(t, l) || !zt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function yf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function gf(e, t) {
    var a = yf(e);
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
      a = yf(a);
    }
  }
  function _f(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? _f(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function bf(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = ri(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = ri(e.document);
    }
    return t;
  }
  function lu(e) {
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
  var ap = va && 'documentMode' in document && 11 >= document.documentMode,
    il = null,
    cu = null,
    ic = null,
    iu = !1;
  function Sf(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    iu ||
      il == null ||
      il !== ri(n) ||
      ((n = il),
      'selectionStart' in n && lu(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (ic && cc(ic, n)) ||
        ((ic = n),
        (n = cs(cu, 'onSelect')),
        0 < n.length &&
          ((t = new pi('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: n }),
          (t.target = il))));
  }
  function xn(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var sl = {
      animationend: xn('Animation', 'AnimationEnd'),
      animationiteration: xn('Animation', 'AnimationIteration'),
      animationstart: xn('Animation', 'AnimationStart'),
      transitionrun: xn('Transition', 'TransitionRun'),
      transitionstart: xn('Transition', 'TransitionStart'),
      transitioncancel: xn('Transition', 'TransitionCancel'),
      transitionend: xn('Transition', 'TransitionEnd'),
    },
    su = {},
    xf = {};
  va &&
    ((xf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete sl.animationend.animation,
      delete sl.animationiteration.animation,
      delete sl.animationstart.animation),
    'TransitionEvent' in window || delete sl.transitionend.transition);
  function jn(e) {
    if (su[e]) return su[e];
    if (!sl[e]) return e;
    var t = sl[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in xf) return (su[e] = t[a]);
    return e;
  }
  var jf = jn('animationend'),
    Af = jn('animationiteration'),
    Tf = jn('animationstart'),
    np = jn('transitionrun'),
    lp = jn('transitionstart'),
    cp = jn('transitioncancel'),
    Ef = jn('transitionend'),
    Nf = new Map(),
    uu =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  uu.push('scrollEnd');
  function It(e, t) {
    (Nf.set(e, t), bn(t, [e]));
  }
  var gi =
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
    Vt = [],
    ul = 0,
    ou = 0;
  function _i() {
    for (var e = ul, t = (ou = ul = 0); t < e; ) {
      var a = Vt[t];
      Vt[t++] = null;
      var n = Vt[t];
      Vt[t++] = null;
      var l = Vt[t];
      Vt[t++] = null;
      var i = Vt[t];
      if (((Vt[t++] = null), n !== null && l !== null)) {
        var m = n.pending;
        (m === null ? (l.next = l) : ((l.next = m.next), (m.next = l)), (n.pending = l));
      }
      i !== 0 && Mf(a, l, i);
    }
  }
  function bi(e, t, a, n) {
    ((Vt[ul++] = e),
      (Vt[ul++] = t),
      (Vt[ul++] = a),
      (Vt[ul++] = n),
      (ou |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function ru(e, t, a, n) {
    return (bi(e, t, a, n), Si(e));
  }
  function An(e, t) {
    return (bi(e, null, null, t), Si(e));
  }
  function Mf(e, t, a) {
    e.lanes |= a;
    var n = e.alternate;
    n !== null && (n.lanes |= a);
    for (var l = !1, i = e.return; i !== null; )
      ((i.childLanes |= a),
        (n = i.alternate),
        n !== null && (n.childLanes |= a),
        i.tag === 22 && ((e = i.stateNode), e === null || e._visibility & 1 || (l = !0)),
        (e = i),
        (i = i.return));
    return e.tag === 3
      ? ((i = e.stateNode),
        l &&
          t !== null &&
          ((l = 31 - Mt(a)),
          (e = i.hiddenUpdates),
          (n = e[l]),
          n === null ? (e[l] = [t]) : n.push(t),
          (t.lane = a | 536870912)),
        i)
      : null;
  }
  function Si(e) {
    if (50 < Mc) throw ((Mc = 0), (bo = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var ol = {};
  function ip(e, t, a, n) {
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
  function Ct(e, t, a, n) {
    return new ip(e, t, a, n);
  }
  function fu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function ya(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = Ct(e.tag, t, e.key, e.mode)),
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
  function zf(e, t) {
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
  function xi(e, t, a, n, l, i) {
    var m = 0;
    if (((n = e), typeof e == 'function')) fu(e) && (m = 1);
    else if (typeof e == 'string')
      m = fv(e, a, Z.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case je:
          return ((e = Ct(31, a, t, l)), (e.elementType = je), (e.lanes = i), e);
        case U:
          return Tn(a.children, l, i, t);
        case q:
          ((m = 8), (l |= 24));
          break;
        case Y:
          return ((e = Ct(12, a, t, l | 2)), (e.elementType = Y), (e.lanes = i), e);
        case Fe:
          return ((e = Ct(13, a, t, l)), (e.elementType = Fe), (e.lanes = i), e);
        case Ue:
          return ((e = Ct(19, a, t, l)), (e.elementType = Ue), (e.lanes = i), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case oe:
                m = 10;
                break e;
              case K:
                m = 9;
                break e;
              case be:
                m = 11;
                break e;
              case ce:
                m = 14;
                break e;
              case Ve:
                ((m = 16), (n = null));
                break e;
            }
          ((m = 29), (a = Error(o(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Ct(m, a, t, l)), (t.elementType = e), (t.type = n), (t.lanes = i), t);
  }
  function Tn(e, t, a, n) {
    return ((e = Ct(7, e, n, t)), (e.lanes = a), e);
  }
  function du(e, t, a) {
    return ((e = Ct(6, e, null, t)), (e.lanes = a), e);
  }
  function Cf(e) {
    var t = Ct(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function mu(e, t, a) {
    return (
      (t = Ct(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Rf = new WeakMap();
  function $t(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = Rf.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: Tt(t) }), Rf.set(e, t), t);
    }
    return { value: e, source: t, stack: Tt(t) };
  }
  var rl = [],
    fl = 0,
    ji = null,
    sc = 0,
    kt = [],
    Yt = 0,
    qa = null,
    sa = 1,
    ua = '';
  function ga(e, t) {
    ((rl[fl++] = sc), (rl[fl++] = ji), (ji = e), (sc = t));
  }
  function wf(e, t, a) {
    ((kt[Yt++] = sa), (kt[Yt++] = ua), (kt[Yt++] = qa), (qa = e));
    var n = sa;
    e = ua;
    var l = 32 - Mt(n) - 1;
    ((n &= ~(1 << l)), (a += 1));
    var i = 32 - Mt(t) + l;
    if (30 < i) {
      var m = l - (l % 5);
      ((i = (n & ((1 << m) - 1)).toString(32)),
        (n >>= m),
        (l -= m),
        (sa = (1 << (32 - Mt(t) + l)) | (a << l) | n),
        (ua = i + e));
    } else ((sa = (1 << i) | (a << l) | n), (ua = e));
  }
  function hu(e) {
    e.return !== null && (ga(e, 1), wf(e, 1, 0));
  }
  function pu(e) {
    for (; e === ji; ) ((ji = rl[--fl]), (rl[fl] = null), (sc = rl[--fl]), (rl[fl] = null));
    for (; e === qa; )
      ((qa = kt[--Yt]),
        (kt[Yt] = null),
        (ua = kt[--Yt]),
        (kt[Yt] = null),
        (sa = kt[--Yt]),
        (kt[Yt] = null));
  }
  function Of(e, t) {
    ((kt[Yt++] = sa), (kt[Yt++] = ua), (kt[Yt++] = qa), (sa = t.id), (ua = t.overflow), (qa = e));
  }
  var st = null,
    De = null,
    ve = !1,
    Ga = null,
    Zt = !1,
    vu = Error(o(519));
  function Va(e) {
    var t = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (uc($t(t, e)), vu);
  }
  function Df(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[it] = e), (t[gt] = n), a)) {
      case 'dialog':
        (fe('cancel', t), fe('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        fe('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Cc.length; a++) fe(Cc[a], t);
        break;
      case 'source':
        fe('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (fe('error', t), fe('load', t));
        break;
      case 'details':
        fe('toggle', t);
        break;
      case 'input':
        (fe('invalid', t),
          Xr(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        fe('invalid', t);
        break;
      case 'textarea':
        (fe('invalid', t), Kr(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      Fm(t.textContent, a)
        ? (n.popover != null && (fe('beforetoggle', t), fe('toggle', t)),
          n.onScroll != null && fe('scroll', t),
          n.onScrollEnd != null && fe('scrollend', t),
          n.onClick != null && (t.onclick = pa),
          (t = !0))
        : (t = !1),
      t || Va(e, !0));
  }
  function Bf(e) {
    for (st = e.return; st; )
      switch (st.tag) {
        case 5:
        case 31:
        case 13:
          Zt = !1;
          return;
        case 27:
        case 3:
          Zt = !0;
          return;
        default:
          st = st.return;
      }
  }
  function dl(e) {
    if (e !== st) return !1;
    if (!ve) return (Bf(e), (ve = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || Bo(e.type, e.memoizedProps))),
        (a = !a)),
      a && De && Va(e),
      Bf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      De = ih(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      De = ih(e);
    } else
      t === 27
        ? ((t = De), tn(e.type) ? ((e = Go), (Go = null), (De = e)) : (De = t))
        : (De = st ? Qt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function En() {
    ((De = st = null), (ve = !1));
  }
  function yu() {
    var e = Ga;
    return (e !== null && (jt === null ? (jt = e) : jt.push.apply(jt, e), (Ga = null)), e);
  }
  function uc(e) {
    Ga === null ? (Ga = [e]) : Ga.push(e);
  }
  var gu = x(null),
    Nn = null,
    _a = null;
  function $a(e, t, a) {
    (V(gu, t._currentValue), (t._currentValue = a));
  }
  function ba(e) {
    ((e._currentValue = gu.current), L(gu));
  }
  function _u(e, t, a) {
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
  function bu(e, t, a, n) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null; ) {
      var i = l.dependencies;
      if (i !== null) {
        var m = l.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var v = i;
          i = l;
          for (var b = 0; b < t.length; b++)
            if (v.context === t[b]) {
              ((i.lanes |= a),
                (v = i.alternate),
                v !== null && (v.lanes |= a),
                _u(i.return, a, e),
                n || (m = null));
              break e;
            }
          i = v.next;
        }
      } else if (l.tag === 18) {
        if (((m = l.return), m === null)) throw Error(o(341));
        ((m.lanes |= a), (i = m.alternate), i !== null && (i.lanes |= a), _u(m, a, e), (m = null));
      } else m = l.child;
      if (m !== null) m.return = l;
      else
        for (m = l; m !== null; ) {
          if (m === e) {
            m = null;
            break;
          }
          if (((l = m.sibling), l !== null)) {
            ((l.return = m.return), (m = l));
            break;
          }
          m = m.return;
        }
      l = m;
    }
  }
  function ml(e, t, a, n) {
    e = null;
    for (var l = t, i = !1; l !== null; ) {
      if (!i) {
        if ((l.flags & 524288) !== 0) i = !0;
        else if ((l.flags & 262144) !== 0) break;
      }
      if (l.tag === 10) {
        var m = l.alternate;
        if (m === null) throw Error(o(387));
        if (((m = m.memoizedProps), m !== null)) {
          var v = l.type;
          zt(l.pendingProps.value, m.value) || (e !== null ? e.push(v) : (e = [v]));
        }
      } else if (l === de.current) {
        if (((m = l.alternate), m === null)) throw Error(o(387));
        m.memoizedState.memoizedState !== l.memoizedState.memoizedState &&
          (e !== null ? e.push(Bc) : (e = [Bc]));
      }
      l = l.return;
    }
    (e !== null && bu(t, e, a, n), (t.flags |= 262144));
  }
  function Ai(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!zt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Mn(e) {
    ((Nn = e), (_a = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function ut(e) {
    return Lf(Nn, e);
  }
  function Ti(e, t) {
    return (Nn === null && Mn(e), Lf(e, t));
  }
  function Lf(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), _a === null)) {
      if (e === null) throw Error(o(308));
      ((_a = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else _a = _a.next = t;
    return a;
  }
  var sp =
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
    up = c.unstable_scheduleCallback,
    op = c.unstable_NormalPriority,
    Xe = {
      $$typeof: oe,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Su() {
    return { controller: new sp(), data: new Map(), refCount: 0 };
  }
  function oc(e) {
    (e.refCount--,
      e.refCount === 0 &&
        up(op, function () {
          e.controller.abort();
        }));
  }
  var rc = null,
    xu = 0,
    hl = 0,
    pl = null;
  function rp(e, t) {
    if (rc === null) {
      var a = (rc = []);
      ((xu = 0),
        (hl = Eo()),
        (pl = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (xu++, t.then(Hf, Hf), t);
  }
  function Hf() {
    if (--xu === 0 && rc !== null) {
      pl !== null && (pl.status = 'fulfilled');
      var e = rc;
      ((rc = null), (hl = 0), (pl = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function fp(e, t) {
    var a = [],
      n = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (l) {
          a.push(l);
        },
      };
    return (
      e.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = t));
          for (var l = 0; l < a.length; l++) (0, a[l])(t);
        },
        function (l) {
          for (n.status = 'rejected', n.reason = l, l = 0; l < a.length; l++) (0, a[l])(void 0);
        }
      ),
      n
    );
  }
  var Uf = w.S;
  w.S = function (e, t) {
    ((Sm = Et()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && rp(e, t),
      Uf !== null && Uf(e, t));
  };
  var zn = x(null);
  function ju() {
    var e = zn.current;
    return e !== null ? e : Re.pooledCache;
  }
  function Ei(e, t) {
    t === null ? V(zn, zn.current) : V(zn, t.pool);
  }
  function qf() {
    var e = ju();
    return e === null ? null : { parent: Xe._currentValue, pool: e };
  }
  var vl = Error(o(460)),
    Au = Error(o(474)),
    Ni = Error(o(542)),
    Mi = { then: function () {} };
  function Gf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Vf(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(pa, pa), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), kf(e), e);
      default:
        if (typeof t.status == 'string') t.then(pa, pa);
        else {
          if (((e = Re), e !== null && 100 < e.shellSuspendCounter)) throw Error(o(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (n) {
                if (t.status === 'pending') {
                  var l = t;
                  ((l.status = 'fulfilled'), (l.value = n));
                }
              },
              function (n) {
                if (t.status === 'pending') {
                  var l = t;
                  ((l.status = 'rejected'), (l.reason = n));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), kf(e), e);
        }
        throw ((Rn = t), vl);
    }
  }
  function Cn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((Rn = a), vl) : a;
    }
  }
  var Rn = null;
  function $f() {
    if (Rn === null) throw Error(o(459));
    var e = Rn;
    return ((Rn = null), e);
  }
  function kf(e) {
    if (e === vl || e === Ni) throw Error(o(483));
  }
  var yl = null,
    fc = 0;
  function zi(e) {
    var t = fc;
    return ((fc += 1), yl === null && (yl = []), Vf(yl, e, t));
  }
  function dc(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Ci(e, t) {
    throw t.$$typeof === T
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function Yf(e) {
    function t(A, S) {
      if (e) {
        var E = A.deletions;
        E === null ? ((A.deletions = [S]), (A.flags |= 16)) : E.push(S);
      }
    }
    function a(A, S) {
      if (!e) return null;
      for (; S !== null; ) (t(A, S), (S = S.sibling));
      return null;
    }
    function n(A) {
      for (var S = new Map(); A !== null; )
        (A.key !== null ? S.set(A.key, A) : S.set(A.index, A), (A = A.sibling));
      return S;
    }
    function l(A, S) {
      return ((A = ya(A, S)), (A.index = 0), (A.sibling = null), A);
    }
    function i(A, S, E) {
      return (
        (A.index = E),
        e
          ? ((E = A.alternate),
            E !== null
              ? ((E = E.index), E < S ? ((A.flags |= 67108866), S) : E)
              : ((A.flags |= 67108866), S))
          : ((A.flags |= 1048576), S)
      );
    }
    function m(A) {
      return (e && A.alternate === null && (A.flags |= 67108866), A);
    }
    function v(A, S, E, B) {
      return S === null || S.tag !== 6
        ? ((S = du(E, A.mode, B)), (S.return = A), S)
        : ((S = l(S, E)), (S.return = A), S);
    }
    function b(A, S, E, B) {
      var I = E.type;
      return I === U
        ? O(A, S, E.props.children, B, E.key)
        : S !== null &&
            (S.elementType === I ||
              (typeof I == 'object' && I !== null && I.$$typeof === Ve && Cn(I) === S.type))
          ? ((S = l(S, E.props)), dc(S, E), (S.return = A), S)
          : ((S = xi(E.type, E.key, E.props, null, A.mode, B)), dc(S, E), (S.return = A), S);
    }
    function N(A, S, E, B) {
      return S === null ||
        S.tag !== 4 ||
        S.stateNode.containerInfo !== E.containerInfo ||
        S.stateNode.implementation !== E.implementation
        ? ((S = mu(E, A.mode, B)), (S.return = A), S)
        : ((S = l(S, E.children || [])), (S.return = A), S);
    }
    function O(A, S, E, B, I) {
      return S === null || S.tag !== 7
        ? ((S = Tn(E, A.mode, B, I)), (S.return = A), S)
        : ((S = l(S, E)), (S.return = A), S);
    }
    function H(A, S, E) {
      if ((typeof S == 'string' && S !== '') || typeof S == 'number' || typeof S == 'bigint')
        return ((S = du('' + S, A.mode, E)), (S.return = A), S);
      if (typeof S == 'object' && S !== null) {
        switch (S.$$typeof) {
          case M:
            return ((E = xi(S.type, S.key, S.props, null, A.mode, E)), dc(E, S), (E.return = A), E);
          case R:
            return ((S = mu(S, A.mode, E)), (S.return = A), S);
          case Ve:
            return ((S = Cn(S)), H(A, S, E));
        }
        if (Ye(S) || ne(S)) return ((S = Tn(S, A.mode, E, null)), (S.return = A), S);
        if (typeof S.then == 'function') return H(A, zi(S), E);
        if (S.$$typeof === oe) return H(A, Ti(A, S), E);
        Ci(A, S);
      }
      return null;
    }
    function z(A, S, E, B) {
      var I = S !== null ? S.key : null;
      if ((typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint')
        return I !== null ? null : v(A, S, '' + E, B);
      if (typeof E == 'object' && E !== null) {
        switch (E.$$typeof) {
          case M:
            return E.key === I ? b(A, S, E, B) : null;
          case R:
            return E.key === I ? N(A, S, E, B) : null;
          case Ve:
            return ((E = Cn(E)), z(A, S, E, B));
        }
        if (Ye(E) || ne(E)) return I !== null ? null : O(A, S, E, B, null);
        if (typeof E.then == 'function') return z(A, S, zi(E), B);
        if (E.$$typeof === oe) return z(A, S, Ti(A, E), B);
        Ci(A, E);
      }
      return null;
    }
    function C(A, S, E, B, I) {
      if ((typeof B == 'string' && B !== '') || typeof B == 'number' || typeof B == 'bigint')
        return ((A = A.get(E) || null), v(S, A, '' + B, I));
      if (typeof B == 'object' && B !== null) {
        switch (B.$$typeof) {
          case M:
            return ((A = A.get(B.key === null ? E : B.key) || null), b(S, A, B, I));
          case R:
            return ((A = A.get(B.key === null ? E : B.key) || null), N(S, A, B, I));
          case Ve:
            return ((B = Cn(B)), C(A, S, E, B, I));
        }
        if (Ye(B) || ne(B)) return ((A = A.get(E) || null), O(S, A, B, I, null));
        if (typeof B.then == 'function') return C(A, S, E, zi(B), I);
        if (B.$$typeof === oe) return C(A, S, E, Ti(S, B), I);
        Ci(S, B);
      }
      return null;
    }
    function X(A, S, E, B) {
      for (
        var I = null, ge = null, Q = S, ue = (S = 0), he = null;
        Q !== null && ue < E.length;
        ue++
      ) {
        Q.index > ue ? ((he = Q), (Q = null)) : (he = Q.sibling);
        var _e = z(A, Q, E[ue], B);
        if (_e === null) {
          Q === null && (Q = he);
          break;
        }
        (e && Q && _e.alternate === null && t(A, Q),
          (S = i(_e, S, ue)),
          ge === null ? (I = _e) : (ge.sibling = _e),
          (ge = _e),
          (Q = he));
      }
      if (ue === E.length) return (a(A, Q), ve && ga(A, ue), I);
      if (Q === null) {
        for (; ue < E.length; ue++)
          ((Q = H(A, E[ue], B)),
            Q !== null && ((S = i(Q, S, ue)), ge === null ? (I = Q) : (ge.sibling = Q), (ge = Q)));
        return (ve && ga(A, ue), I);
      }
      for (Q = n(Q); ue < E.length; ue++)
        ((he = C(Q, A, ue, E[ue], B)),
          he !== null &&
            (e && he.alternate !== null && Q.delete(he.key === null ? ue : he.key),
            (S = i(he, S, ue)),
            ge === null ? (I = he) : (ge.sibling = he),
            (ge = he)));
      return (
        e &&
          Q.forEach(function (sn) {
            return t(A, sn);
          }),
        ve && ga(A, ue),
        I
      );
    }
    function ee(A, S, E, B) {
      if (E == null) throw Error(o(151));
      for (
        var I = null, ge = null, Q = S, ue = (S = 0), he = null, _e = E.next();
        Q !== null && !_e.done;
        ue++, _e = E.next()
      ) {
        Q.index > ue ? ((he = Q), (Q = null)) : (he = Q.sibling);
        var sn = z(A, Q, _e.value, B);
        if (sn === null) {
          Q === null && (Q = he);
          break;
        }
        (e && Q && sn.alternate === null && t(A, Q),
          (S = i(sn, S, ue)),
          ge === null ? (I = sn) : (ge.sibling = sn),
          (ge = sn),
          (Q = he));
      }
      if (_e.done) return (a(A, Q), ve && ga(A, ue), I);
      if (Q === null) {
        for (; !_e.done; ue++, _e = E.next())
          ((_e = H(A, _e.value, B)),
            _e !== null &&
              ((S = i(_e, S, ue)), ge === null ? (I = _e) : (ge.sibling = _e), (ge = _e)));
        return (ve && ga(A, ue), I);
      }
      for (Q = n(Q); !_e.done; ue++, _e = E.next())
        ((_e = C(Q, A, ue, _e.value, B)),
          _e !== null &&
            (e && _e.alternate !== null && Q.delete(_e.key === null ? ue : _e.key),
            (S = i(_e, S, ue)),
            ge === null ? (I = _e) : (ge.sibling = _e),
            (ge = _e)));
      return (
        e &&
          Q.forEach(function (xv) {
            return t(A, xv);
          }),
        ve && ga(A, ue),
        I
      );
    }
    function ze(A, S, E, B) {
      if (
        (typeof E == 'object' &&
          E !== null &&
          E.type === U &&
          E.key === null &&
          (E = E.props.children),
        typeof E == 'object' && E !== null)
      ) {
        switch (E.$$typeof) {
          case M:
            e: {
              for (var I = E.key; S !== null; ) {
                if (S.key === I) {
                  if (((I = E.type), I === U)) {
                    if (S.tag === 7) {
                      (a(A, S.sibling), (B = l(S, E.props.children)), (B.return = A), (A = B));
                      break e;
                    }
                  } else if (
                    S.elementType === I ||
                    (typeof I == 'object' && I !== null && I.$$typeof === Ve && Cn(I) === S.type)
                  ) {
                    (a(A, S.sibling), (B = l(S, E.props)), dc(B, E), (B.return = A), (A = B));
                    break e;
                  }
                  a(A, S);
                  break;
                } else t(A, S);
                S = S.sibling;
              }
              E.type === U
                ? ((B = Tn(E.props.children, A.mode, B, E.key)), (B.return = A), (A = B))
                : ((B = xi(E.type, E.key, E.props, null, A.mode, B)),
                  dc(B, E),
                  (B.return = A),
                  (A = B));
            }
            return m(A);
          case R:
            e: {
              for (I = E.key; S !== null; ) {
                if (S.key === I)
                  if (
                    S.tag === 4 &&
                    S.stateNode.containerInfo === E.containerInfo &&
                    S.stateNode.implementation === E.implementation
                  ) {
                    (a(A, S.sibling), (B = l(S, E.children || [])), (B.return = A), (A = B));
                    break e;
                  } else {
                    a(A, S);
                    break;
                  }
                else t(A, S);
                S = S.sibling;
              }
              ((B = mu(E, A.mode, B)), (B.return = A), (A = B));
            }
            return m(A);
          case Ve:
            return ((E = Cn(E)), ze(A, S, E, B));
        }
        if (Ye(E)) return X(A, S, E, B);
        if (ne(E)) {
          if (((I = ne(E)), typeof I != 'function')) throw Error(o(150));
          return ((E = I.call(E)), ee(A, S, E, B));
        }
        if (typeof E.then == 'function') return ze(A, S, zi(E), B);
        if (E.$$typeof === oe) return ze(A, S, Ti(A, E), B);
        Ci(A, E);
      }
      return (typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint'
        ? ((E = '' + E),
          S !== null && S.tag === 6
            ? (a(A, S.sibling), (B = l(S, E)), (B.return = A), (A = B))
            : (a(A, S), (B = du(E, A.mode, B)), (B.return = A), (A = B)),
          m(A))
        : a(A, S);
    }
    return function (A, S, E, B) {
      try {
        fc = 0;
        var I = ze(A, S, E, B);
        return ((yl = null), I);
      } catch (Q) {
        if (Q === vl || Q === Ni) throw Q;
        var ge = Ct(29, Q, null, A.mode);
        return ((ge.lanes = B), (ge.return = A), ge);
      } finally {
      }
    };
  }
  var wn = Yf(!0),
    Zf = Yf(!1),
    ka = !1;
  function Tu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Eu(e, t) {
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
  function Ya(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Za(e, t, a) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (xe & 2) !== 0)) {
      var l = n.pending;
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (n.pending = t),
        (t = Si(e)),
        Mf(e, null, a),
        t
      );
    }
    return (bi(e, n, t, a), Si(e));
  }
  function mc(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), Br(e, a));
    }
  }
  function Nu(e, t) {
    var a = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var l = null,
        i = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var m = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (i === null ? (l = i = m) : (i = i.next = m), (a = a.next));
        } while (a !== null);
        i === null ? (l = i = t) : (i = i.next = t);
      } else l = i = t;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: i,
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
  var Mu = !1;
  function hc() {
    if (Mu) {
      var e = pl;
      if (e !== null) throw e;
    }
  }
  function pc(e, t, a, n) {
    Mu = !1;
    var l = e.updateQueue;
    ka = !1;
    var i = l.firstBaseUpdate,
      m = l.lastBaseUpdate,
      v = l.shared.pending;
    if (v !== null) {
      l.shared.pending = null;
      var b = v,
        N = b.next;
      ((b.next = null), m === null ? (i = N) : (m.next = N), (m = b));
      var O = e.alternate;
      O !== null &&
        ((O = O.updateQueue),
        (v = O.lastBaseUpdate),
        v !== m && (v === null ? (O.firstBaseUpdate = N) : (v.next = N), (O.lastBaseUpdate = b)));
    }
    if (i !== null) {
      var H = l.baseState;
      ((m = 0), (O = N = b = null), (v = i));
      do {
        var z = v.lane & -536870913,
          C = z !== v.lane;
        if (C ? (me & z) === z : (n & z) === z) {
          (z !== 0 && z === hl && (Mu = !0),
            O !== null &&
              (O = O.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          e: {
            var X = e,
              ee = v;
            z = t;
            var ze = a;
            switch (ee.tag) {
              case 1:
                if (((X = ee.payload), typeof X == 'function')) {
                  H = X.call(ze, H, z);
                  break e;
                }
                H = X;
                break e;
              case 3:
                X.flags = (X.flags & -65537) | 128;
              case 0:
                if (
                  ((X = ee.payload), (z = typeof X == 'function' ? X.call(ze, H, z) : X), z == null)
                )
                  break e;
                H = j({}, H, z);
                break e;
              case 2:
                ka = !0;
            }
          }
          ((z = v.callback),
            z !== null &&
              ((e.flags |= 64),
              C && (e.flags |= 8192),
              (C = l.callbacks),
              C === null ? (l.callbacks = [z]) : C.push(z)));
        } else
          ((C = { lane: z, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            O === null ? ((N = O = C), (b = H)) : (O = O.next = C),
            (m |= z));
        if (((v = v.next), v === null)) {
          if (((v = l.shared.pending), v === null)) break;
          ((C = v),
            (v = C.next),
            (C.next = null),
            (l.lastBaseUpdate = C),
            (l.shared.pending = null));
        }
      } while (!0);
      (O === null && (b = H),
        (l.baseState = b),
        (l.firstBaseUpdate = N),
        (l.lastBaseUpdate = O),
        i === null && (l.shared.lanes = 0),
        (Wa |= m),
        (e.lanes = m),
        (e.memoizedState = H));
    }
  }
  function Xf(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function Qf(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) Xf(a[e], t);
  }
  var gl = x(null),
    Ri = x(0);
  function Kf(e, t) {
    ((e = za), V(Ri, e), V(gl, t), (za = e | t.baseLanes));
  }
  function zu() {
    (V(Ri, za), V(gl, gl.current));
  }
  function Cu() {
    ((za = Ri.current), L(gl), L(Ri));
  }
  var Rt = x(null),
    Xt = null;
  function Xa(e) {
    var t = e.alternate;
    (V($e, $e.current & 1),
      V(Rt, e),
      Xt === null && (t === null || gl.current !== null || t.memoizedState !== null) && (Xt = e));
  }
  function Ru(e) {
    (V($e, $e.current), V(Rt, e), Xt === null && (Xt = e));
  }
  function Jf(e) {
    e.tag === 22 ? (V($e, $e.current), V(Rt, e), Xt === null && (Xt = e)) : Qa();
  }
  function Qa() {
    (V($e, $e.current), V(Rt, Rt.current));
  }
  function wt(e) {
    (L(Rt), Xt === e && (Xt = null), L($e));
  }
  var $e = x(0);
  function wi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Uo(a) || qo(a))) return t;
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
  var Sa = 0,
    ie = null,
    Ne = null,
    Qe = null,
    Oi = !1,
    _l = !1,
    On = !1,
    Di = 0,
    vc = 0,
    bl = null,
    dp = 0;
  function qe() {
    throw Error(o(321));
  }
  function wu(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!zt(e[a], t[a])) return !1;
    return !0;
  }
  function Ou(e, t, a, n, l, i) {
    return (
      (Sa = i),
      (ie = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (w.H = e === null || e.memoizedState === null ? wd : Ku),
      (On = !1),
      (i = a(n, l)),
      (On = !1),
      _l && (i = Ff(t, a, n, l)),
      Wf(e),
      i
    );
  }
  function Wf(e) {
    w.H = _c;
    var t = Ne !== null && Ne.next !== null;
    if (((Sa = 0), (Qe = Ne = ie = null), (Oi = !1), (vc = 0), (bl = null), t)) throw Error(o(300));
    e === null || Ke || ((e = e.dependencies), e !== null && Ai(e) && (Ke = !0));
  }
  function Ff(e, t, a, n) {
    ie = e;
    var l = 0;
    do {
      if ((_l && (bl = null), (vc = 0), (_l = !1), 25 <= l)) throw Error(o(301));
      if (((l += 1), (Qe = Ne = null), e.updateQueue != null)) {
        var i = e.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((w.H = Od), (i = t(a, n)));
    } while (_l);
    return i;
  }
  function mp() {
    var e = w.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? yc(t) : t),
      (e = e.useState()[0]),
      (Ne !== null ? Ne.memoizedState : null) !== e && (ie.flags |= 1024),
      t
    );
  }
  function Du() {
    var e = Di !== 0;
    return ((Di = 0), e);
  }
  function Bu(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Lu(e) {
    if (Oi) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Oi = !1;
    }
    ((Sa = 0), (Qe = Ne = ie = null), (_l = !1), (vc = Di = 0), (bl = null));
  }
  function yt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Qe === null ? (ie.memoizedState = Qe = e) : (Qe = Qe.next = e), Qe);
  }
  function ke() {
    if (Ne === null) {
      var e = ie.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ne.next;
    var t = Qe === null ? ie.memoizedState : Qe.next;
    if (t !== null) ((Qe = t), (Ne = e));
    else {
      if (e === null) throw ie.alternate === null ? Error(o(467)) : Error(o(310));
      ((Ne = e),
        (e = {
          memoizedState: Ne.memoizedState,
          baseState: Ne.baseState,
          baseQueue: Ne.baseQueue,
          queue: Ne.queue,
          next: null,
        }),
        Qe === null ? (ie.memoizedState = Qe = e) : (Qe = Qe.next = e));
    }
    return Qe;
  }
  function Bi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function yc(e) {
    var t = vc;
    return (
      (vc += 1),
      bl === null && (bl = []),
      (e = Vf(bl, e, t)),
      (t = ie),
      (Qe === null ? t.memoizedState : Qe.next) === null &&
        ((t = t.alternate), (w.H = t === null || t.memoizedState === null ? wd : Ku)),
      e
    );
  }
  function Li(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return yc(e);
      if (e.$$typeof === oe) return ut(e);
    }
    throw Error(o(438, String(e)));
  }
  function Hu(e) {
    var t = null,
      a = ie.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var n = ie.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (t = {
              data: n.data.map(function (l) {
                return l.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = Bi()), (ie.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = Le;
    return (t.index++, a);
  }
  function xa(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Hi(e) {
    var t = ke();
    return Uu(t, Ne, e);
  }
  function Uu(e, t, a) {
    var n = e.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = a;
    var l = e.baseQueue,
      i = n.pending;
    if (i !== null) {
      if (l !== null) {
        var m = l.next;
        ((l.next = i.next), (i.next = m));
      }
      ((t.baseQueue = l = i), (n.pending = null));
    }
    if (((i = e.baseState), l === null)) e.memoizedState = i;
    else {
      t = l.next;
      var v = (m = null),
        b = null,
        N = t,
        O = !1;
      do {
        var H = N.lane & -536870913;
        if (H !== N.lane ? (me & H) === H : (Sa & H) === H) {
          var z = N.revertLane;
          if (z === 0)
            (b !== null &&
              (b = b.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: N.action,
                  hasEagerState: N.hasEagerState,
                  eagerState: N.eagerState,
                  next: null,
                }),
              H === hl && (O = !0));
          else if ((Sa & z) === z) {
            ((N = N.next), z === hl && (O = !0));
            continue;
          } else
            ((H = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null,
            }),
              b === null ? ((v = b = H), (m = i)) : (b = b.next = H),
              (ie.lanes |= z),
              (Wa |= z));
          ((H = N.action), On && a(i, H), (i = N.hasEagerState ? N.eagerState : a(i, H)));
        } else
          ((z = {
            lane: H,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null,
          }),
            b === null ? ((v = b = z), (m = i)) : (b = b.next = z),
            (ie.lanes |= H),
            (Wa |= H));
        N = N.next;
      } while (N !== null && N !== t);
      if (
        (b === null ? (m = i) : (b.next = v),
        !zt(i, e.memoizedState) && ((Ke = !0), O && ((a = pl), a !== null)))
      )
        throw a;
      ((e.memoizedState = i), (e.baseState = m), (e.baseQueue = b), (n.lastRenderedState = i));
    }
    return (l === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function qu(e) {
    var t = ke(),
      a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var n = a.dispatch,
      l = a.pending,
      i = t.memoizedState;
    if (l !== null) {
      a.pending = null;
      var m = (l = l.next);
      do ((i = e(i, m.action)), (m = m.next));
      while (m !== l);
      (zt(i, t.memoizedState) || (Ke = !0),
        (t.memoizedState = i),
        t.baseQueue === null && (t.baseState = i),
        (a.lastRenderedState = i));
    }
    return [i, n];
  }
  function If(e, t, a) {
    var n = ie,
      l = ke(),
      i = ve;
    if (i) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var m = !zt((Ne || l).memoizedState, a);
    if (
      (m && ((l.memoizedState = a), (Ke = !0)),
      (l = l.queue),
      $u(td.bind(null, n, l, e), [e]),
      l.getSnapshot !== t || m || (Qe !== null && Qe.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Sl(9, { destroy: void 0 }, ed.bind(null, n, l, a, t), null),
        Re === null)
      )
        throw Error(o(349));
      i || (Sa & 127) !== 0 || Pf(n, t, a);
    }
    return a;
  }
  function Pf(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = ie.updateQueue),
      t === null
        ? ((t = Bi()), (ie.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function ed(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), ad(t) && nd(e));
  }
  function td(e, t, a) {
    return a(function () {
      ad(t) && nd(e);
    });
  }
  function ad(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !zt(e, a);
    } catch {
      return !0;
    }
  }
  function nd(e) {
    var t = An(e, 2);
    t !== null && At(t, e, 2);
  }
  function Gu(e) {
    var t = yt();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), On)) {
        La(!0);
        try {
          a();
        } finally {
          La(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: xa,
        lastRenderedState: e,
      }),
      t
    );
  }
  function ld(e, t, a, n) {
    return ((e.baseState = a), Uu(e, Ne, typeof n == 'function' ? n : xa));
  }
  function hp(e, t, a, n, l) {
    if (Gi(e)) throw Error(o(485));
    if (((e = t.action), e !== null)) {
      var i = {
        payload: l,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (m) {
          i.listeners.push(m);
        },
      };
      (w.T !== null ? a(!0) : (i.isTransition = !1),
        n(i),
        (a = t.pending),
        a === null
          ? ((i.next = t.pending = i), cd(t, i))
          : ((i.next = a.next), (t.pending = a.next = i)));
    }
  }
  function cd(e, t) {
    var a = t.action,
      n = t.payload,
      l = e.state;
    if (t.isTransition) {
      var i = w.T,
        m = {};
      w.T = m;
      try {
        var v = a(l, n),
          b = w.S;
        (b !== null && b(m, v), id(e, t, v));
      } catch (N) {
        Vu(e, t, N);
      } finally {
        (i !== null && m.types !== null && (i.types = m.types), (w.T = i));
      }
    } else
      try {
        ((i = a(l, n)), id(e, t, i));
      } catch (N) {
        Vu(e, t, N);
      }
  }
  function id(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            sd(e, t, n);
          },
          function (n) {
            return Vu(e, t, n);
          }
        )
      : sd(e, t, a);
  }
  function sd(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      ud(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), cd(e, a))));
  }
  function Vu(e, t, a) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = a), ud(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function ud(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function od(e, t) {
    return t;
  }
  function rd(e, t) {
    if (ve) {
      var a = Re.formState;
      if (a !== null) {
        e: {
          var n = ie;
          if (ve) {
            if (De) {
              t: {
                for (var l = De, i = Zt; l.nodeType !== 8; ) {
                  if (!i) {
                    l = null;
                    break t;
                  }
                  if (((l = Qt(l.nextSibling)), l === null)) {
                    l = null;
                    break t;
                  }
                }
                ((i = l.data), (l = i === 'F!' || i === 'F' ? l : null));
              }
              if (l) {
                ((De = Qt(l.nextSibling)), (n = l.data === 'F!'));
                break e;
              }
            }
            Va(n);
          }
          n = !1;
        }
        n && (t = a[0]);
      }
    }
    return (
      (a = yt()),
      (a.memoizedState = a.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: od,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = zd.bind(null, ie, n)),
      (n.dispatch = a),
      (n = Gu(!1)),
      (i = Qu.bind(null, ie, !1, n.queue)),
      (n = yt()),
      (l = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = l),
      (a = hp.bind(null, ie, l, i, a)),
      (l.dispatch = a),
      (n.memoizedState = e),
      [t, a, !1]
    );
  }
  function fd(e) {
    var t = ke();
    return dd(t, Ne, e);
  }
  function dd(e, t, a) {
    if (
      ((t = Uu(e, t, od)[0]),
      (e = Hi(xa)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = yc(t);
      } catch (m) {
        throw m === vl ? Ni : m;
      }
    else n = t;
    t = ke();
    var l = t.queue,
      i = l.dispatch;
    return (
      a !== t.memoizedState &&
        ((ie.flags |= 2048), Sl(9, { destroy: void 0 }, pp.bind(null, l, a), null)),
      [n, i, e]
    );
  }
  function pp(e, t) {
    e.action = t;
  }
  function md(e) {
    var t = ke(),
      a = Ne;
    if (a !== null) return dd(t, a, e);
    (ke(), (t = t.memoizedState), (a = ke()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = e), [t, n, !1]);
  }
  function Sl(e, t, a, n) {
    return (
      (e = { tag: e, create: a, deps: n, inst: t, next: null }),
      (t = ie.updateQueue),
      t === null && ((t = Bi()), (ie.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((n = a.next), (a.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function hd() {
    return ke().memoizedState;
  }
  function Ui(e, t, a, n) {
    var l = yt();
    ((ie.flags |= e),
      (l.memoizedState = Sl(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function qi(e, t, a, n) {
    var l = ke();
    n = n === void 0 ? null : n;
    var i = l.memoizedState.inst;
    Ne !== null && n !== null && wu(n, Ne.memoizedState.deps)
      ? (l.memoizedState = Sl(t, i, a, n))
      : ((ie.flags |= e), (l.memoizedState = Sl(1 | t, i, a, n)));
  }
  function pd(e, t) {
    Ui(8390656, 8, e, t);
  }
  function $u(e, t) {
    qi(2048, 8, e, t);
  }
  function vp(e) {
    ie.flags |= 4;
    var t = ie.updateQueue;
    if (t === null) ((t = Bi()), (ie.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function vd(e) {
    var t = ke().memoizedState;
    return (
      vp({ ref: t, nextImpl: e }),
      function () {
        if ((xe & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function yd(e, t) {
    return qi(4, 2, e, t);
  }
  function gd(e, t) {
    return qi(4, 4, e, t);
  }
  function _d(e, t) {
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
  function bd(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), qi(4, 4, _d.bind(null, t, e), a));
  }
  function ku() {}
  function Sd(e, t) {
    var a = ke();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    return t !== null && wu(t, n[1]) ? n[0] : ((a.memoizedState = [e, t]), e);
  }
  function xd(e, t) {
    var a = ke();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    if (t !== null && wu(t, n[1])) return n[0];
    if (((n = e()), On)) {
      La(!0);
      try {
        e();
      } finally {
        La(!1);
      }
    }
    return ((a.memoizedState = [n, t]), n);
  }
  function Yu(e, t, a) {
    return a === void 0 || ((Sa & 1073741824) !== 0 && (me & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = jm()), (ie.lanes |= e), (Wa |= e), a);
  }
  function jd(e, t, a, n) {
    return zt(a, t)
      ? a
      : gl.current !== null
        ? ((e = Yu(e, a, n)), zt(e, t) || (Ke = !0), e)
        : (Sa & 42) === 0 || ((Sa & 1073741824) !== 0 && (me & 261930) === 0)
          ? ((Ke = !0), (e.memoizedState = a))
          : ((e = jm()), (ie.lanes |= e), (Wa |= e), t);
  }
  function Ad(e, t, a, n, l) {
    var i = $.p;
    $.p = i !== 0 && 8 > i ? i : 8;
    var m = w.T,
      v = {};
    ((w.T = v), Qu(e, !1, t, a));
    try {
      var b = l(),
        N = w.S;
      if (
        (N !== null && N(v, b), b !== null && typeof b == 'object' && typeof b.then == 'function')
      ) {
        var O = fp(b, n);
        gc(e, t, O, Bt(e));
      } else gc(e, t, n, Bt(e));
    } catch (H) {
      gc(e, t, { then: function () {}, status: 'rejected', reason: H }, Bt());
    } finally {
      (($.p = i), m !== null && v.types !== null && (m.types = v.types), (w.T = m));
    }
  }
  function yp() {}
  function Zu(e, t, a, n) {
    if (e.tag !== 5) throw Error(o(476));
    var l = Td(e).queue;
    Ad(
      e,
      l,
      t,
      P,
      a === null
        ? yp
        : function () {
            return (Ed(e), a(n));
          }
    );
  }
  function Td(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: P,
      baseState: P,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: xa,
        lastRenderedState: P,
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
          lastRenderedReducer: xa,
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
  function Ed(e) {
    var t = Td(e);
    (t.next === null && (t = e.alternate.memoizedState), gc(e, t.next.queue, {}, Bt()));
  }
  function Xu() {
    return ut(Bc);
  }
  function Nd() {
    return ke().memoizedState;
  }
  function Md() {
    return ke().memoizedState;
  }
  function gp(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Bt();
          e = Ya(a);
          var n = Za(t, e, a);
          (n !== null && (At(n, t, a), mc(n, t, a)), (t = { cache: Su() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function _p(e, t, a) {
    var n = Bt();
    ((a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Gi(e) ? Cd(t, a) : ((a = ru(e, t, a, n)), a !== null && (At(a, e, n), Rd(a, t, n))));
  }
  function zd(e, t, a) {
    var n = Bt();
    gc(e, t, a, n);
  }
  function gc(e, t, a, n) {
    var l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Gi(e)) Cd(t, l);
    else {
      var i = e.alternate;
      if (
        e.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = t.lastRenderedReducer), i !== null)
      )
        try {
          var m = t.lastRenderedState,
            v = i(m, a);
          if (((l.hasEagerState = !0), (l.eagerState = v), zt(v, m)))
            return (bi(e, t, l, 0), Re === null && _i(), !1);
        } catch {
        } finally {
        }
      if (((a = ru(e, t, l, n)), a !== null)) return (At(a, e, n), Rd(a, t, n), !0);
    }
    return !1;
  }
  function Qu(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: Eo(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Gi(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = ru(e, a, n, 2)), t !== null && At(t, e, 2));
  }
  function Gi(e) {
    var t = e.alternate;
    return e === ie || (t !== null && t === ie);
  }
  function Cd(e, t) {
    _l = Oi = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function Rd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), Br(e, a));
    }
  }
  var _c = {
    readContext: ut,
    use: Li,
    useCallback: qe,
    useContext: qe,
    useEffect: qe,
    useImperativeHandle: qe,
    useLayoutEffect: qe,
    useInsertionEffect: qe,
    useMemo: qe,
    useReducer: qe,
    useRef: qe,
    useState: qe,
    useDebugValue: qe,
    useDeferredValue: qe,
    useTransition: qe,
    useSyncExternalStore: qe,
    useId: qe,
    useHostTransitionStatus: qe,
    useFormState: qe,
    useActionState: qe,
    useOptimistic: qe,
    useMemoCache: qe,
    useCacheRefresh: qe,
  };
  _c.useEffectEvent = qe;
  var wd = {
      readContext: ut,
      use: Li,
      useCallback: function (e, t) {
        return ((yt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: ut,
      useEffect: pd,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), Ui(4194308, 4, _d.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return Ui(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Ui(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = yt();
        t = t === void 0 ? null : t;
        var n = e();
        if (On) {
          La(!0);
          try {
            e();
          } finally {
            La(!1);
          }
        }
        return ((a.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, a) {
        var n = yt();
        if (a !== void 0) {
          var l = a(t);
          if (On) {
            La(!0);
            try {
              a(t);
            } finally {
              La(!1);
            }
          }
        } else l = t;
        return (
          (n.memoizedState = n.baseState = l),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: l,
          }),
          (n.queue = e),
          (e = e.dispatch = _p.bind(null, ie, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = yt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Gu(e);
        var t = e.queue,
          a = zd.bind(null, ie, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: ku,
      useDeferredValue: function (e, t) {
        var a = yt();
        return Yu(a, e, t);
      },
      useTransition: function () {
        var e = Gu(!1);
        return ((e = Ad.bind(null, ie, e.queue, !0, !1)), (yt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = ie,
          l = yt();
        if (ve) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = t()), Re === null)) throw Error(o(349));
          (me & 127) !== 0 || Pf(n, t, a);
        }
        l.memoizedState = a;
        var i = { value: a, getSnapshot: t };
        return (
          (l.queue = i),
          pd(td.bind(null, n, i, e), [e]),
          (n.flags |= 2048),
          Sl(9, { destroy: void 0 }, ed.bind(null, n, i, a, t), null),
          a
        );
      },
      useId: function () {
        var e = yt(),
          t = Re.identifierPrefix;
        if (ve) {
          var a = ua,
            n = sa;
          ((a = (n & ~(1 << (32 - Mt(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = Di++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = dp++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Xu,
      useFormState: rd,
      useActionState: rd,
      useOptimistic: function (e) {
        var t = yt();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = a), (t = Qu.bind(null, ie, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: Hu,
      useCacheRefresh: function () {
        return (yt().memoizedState = gp.bind(null, ie));
      },
      useEffectEvent: function (e) {
        var t = yt(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((xe & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Ku = {
      readContext: ut,
      use: Li,
      useCallback: Sd,
      useContext: ut,
      useEffect: $u,
      useImperativeHandle: bd,
      useInsertionEffect: yd,
      useLayoutEffect: gd,
      useMemo: xd,
      useReducer: Hi,
      useRef: hd,
      useState: function () {
        return Hi(xa);
      },
      useDebugValue: ku,
      useDeferredValue: function (e, t) {
        var a = ke();
        return jd(a, Ne.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Hi(xa)[0],
          t = ke().memoizedState;
        return [typeof e == 'boolean' ? e : yc(e), t];
      },
      useSyncExternalStore: If,
      useId: Nd,
      useHostTransitionStatus: Xu,
      useFormState: fd,
      useActionState: fd,
      useOptimistic: function (e, t) {
        var a = ke();
        return ld(a, Ne, e, t);
      },
      useMemoCache: Hu,
      useCacheRefresh: Md,
    };
  Ku.useEffectEvent = vd;
  var Od = {
    readContext: ut,
    use: Li,
    useCallback: Sd,
    useContext: ut,
    useEffect: $u,
    useImperativeHandle: bd,
    useInsertionEffect: yd,
    useLayoutEffect: gd,
    useMemo: xd,
    useReducer: qu,
    useRef: hd,
    useState: function () {
      return qu(xa);
    },
    useDebugValue: ku,
    useDeferredValue: function (e, t) {
      var a = ke();
      return Ne === null ? Yu(a, e, t) : jd(a, Ne.memoizedState, e, t);
    },
    useTransition: function () {
      var e = qu(xa)[0],
        t = ke().memoizedState;
      return [typeof e == 'boolean' ? e : yc(e), t];
    },
    useSyncExternalStore: If,
    useId: Nd,
    useHostTransitionStatus: Xu,
    useFormState: md,
    useActionState: md,
    useOptimistic: function (e, t) {
      var a = ke();
      return Ne !== null ? ld(a, Ne, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: Hu,
    useCacheRefresh: Md,
  };
  Od.useEffectEvent = vd;
  function Ju(e, t, a, n) {
    ((t = e.memoizedState),
      (a = a(n, t)),
      (a = a == null ? t : j({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var Wu = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var n = Bt(),
        l = Ya(n);
      ((l.payload = t),
        a != null && (l.callback = a),
        (t = Za(e, l, n)),
        t !== null && (At(t, e, n), mc(t, e, n)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var n = Bt(),
        l = Ya(n);
      ((l.tag = 1),
        (l.payload = t),
        a != null && (l.callback = a),
        (t = Za(e, l, n)),
        t !== null && (At(t, e, n), mc(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Bt(),
        n = Ya(a);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Za(e, n, a)),
        t !== null && (At(t, e, a), mc(t, e, a)));
    },
  };
  function Dd(e, t, a, n, l, i, m) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, i, m)
        : t.prototype && t.prototype.isPureReactComponent
          ? !cc(a, n) || !cc(l, i)
          : !0
    );
  }
  function Bd(e, t, a, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, n),
      t.state !== e && Wu.enqueueReplaceState(t, t.state, null));
  }
  function Dn(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var n in t) n !== 'ref' && (a[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = j({}, a));
      for (var l in e) a[l] === void 0 && (a[l] = e[l]);
    }
    return a;
  }
  function Ld(e) {
    gi(e);
  }
  function Hd(e) {
    console.error(e);
  }
  function Ud(e) {
    gi(e);
  }
  function Vi(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function qd(e, t, a) {
    try {
      var n = e.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Fu(e, t, a) {
    return (
      (a = Ya(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Vi(e, t);
      }),
      a
    );
  }
  function Gd(e) {
    return ((e = Ya(e)), (e.tag = 3), e);
  }
  function Vd(e, t, a, n) {
    var l = a.type.getDerivedStateFromError;
    if (typeof l == 'function') {
      var i = n.value;
      ((e.payload = function () {
        return l(i);
      }),
        (e.callback = function () {
          qd(t, a, n);
        }));
    }
    var m = a.stateNode;
    m !== null &&
      typeof m.componentDidCatch == 'function' &&
      (e.callback = function () {
        (qd(t, a, n),
          typeof l != 'function' && (Fa === null ? (Fa = new Set([this])) : Fa.add(this)));
        var v = n.stack;
        this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' });
      });
  }
  function bp(e, t, a, n, l) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && ml(t, a, l, !0), (a = Rt.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Xt === null ? Pi() : a.alternate === null && Ge === 0 && (Ge = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = l),
              n === Mi
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  jo(e, n, l)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === Mi
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  jo(e, n, l)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (jo(e, n, l), Pi(), !1);
    }
    if (ve)
      return (
        (t = Rt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = l),
            n !== vu && ((e = Error(o(422), { cause: n })), uc($t(e, a))))
          : (n !== vu && ((t = Error(o(423), { cause: n })), uc($t(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (l &= -l),
            (e.lanes |= l),
            (n = $t(n, a)),
            (l = Fu(e.stateNode, n, l)),
            Nu(e, l),
            Ge !== 4 && (Ge = 2)),
        !1
      );
    var i = Error(o(520), { cause: n });
    if (((i = $t(i, a)), Nc === null ? (Nc = [i]) : Nc.push(i), Ge !== 4 && (Ge = 2), t === null))
      return !0;
    ((n = $t(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = l & -l),
            (a.lanes |= e),
            (e = Fu(a.stateNode, n, e)),
            Nu(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (i = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (i !== null &&
                  typeof i.componentDidCatch == 'function' &&
                  (Fa === null || !Fa.has(i)))))
          )
            return (
              (a.flags |= 65536),
              (l &= -l),
              (a.lanes |= l),
              (l = Gd(l)),
              Vd(l, e, a, n),
              Nu(a, l),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Iu = Error(o(461)),
    Ke = !1;
  function ot(e, t, a, n) {
    t.child = e === null ? Zf(t, null, a, n) : wn(t, e.child, a, n);
  }
  function $d(e, t, a, n, l) {
    a = a.render;
    var i = t.ref;
    if ('ref' in n) {
      var m = {};
      for (var v in n) v !== 'ref' && (m[v] = n[v]);
    } else m = n;
    return (
      Mn(t),
      (n = Ou(e, t, a, m, i, l)),
      (v = Du()),
      e !== null && !Ke
        ? (Bu(e, t, l), ja(e, t, l))
        : (ve && v && hu(t), (t.flags |= 1), ot(e, t, n, l), t.child)
    );
  }
  function kd(e, t, a, n, l) {
    if (e === null) {
      var i = a.type;
      return typeof i == 'function' && !fu(i) && i.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = i), Yd(e, t, i, n, l))
        : ((e = xi(a.type, null, n, t, t.mode, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((i = e.child), !io(e, l))) {
      var m = i.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : cc), a(m, n) && e.ref === t.ref))
        return ja(e, t, l);
    }
    return ((t.flags |= 1), (e = ya(i, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function Yd(e, t, a, n, l) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (cc(i, n) && e.ref === t.ref)
        if (((Ke = !1), (t.pendingProps = n = i), io(e, l))) (e.flags & 131072) !== 0 && (Ke = !0);
        else return ((t.lanes = e.lanes), ja(e, t, l));
    }
    return Pu(e, t, a, n, l);
  }
  function Zd(e, t, a, n) {
    var l = n.children,
      i = e !== null ? e.memoizedState : null;
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
        if (((i = i !== null ? i.baseLanes | a : a), e !== null)) {
          for (n = t.child = e.child, l = 0; n !== null; )
            ((l = l | n.lanes | n.childLanes), (n = n.sibling));
          n = l & ~i;
        } else ((n = 0), (t.child = null));
        return Xd(e, t, i, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Ei(t, i !== null ? i.cachePool : null),
          i !== null ? Kf(t, i) : zu(),
          Jf(t));
      else return ((n = t.lanes = 536870912), Xd(e, t, i !== null ? i.baseLanes | a : a, a, n));
    } else
      i !== null
        ? (Ei(t, i.cachePool), Kf(t, i), Qa(), (t.memoizedState = null))
        : (e !== null && Ei(t, null), zu(), Qa());
    return (ot(e, t, l, a), t.child);
  }
  function bc(e, t) {
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
  function Xd(e, t, a, n, l) {
    var i = ju();
    return (
      (i = i === null ? null : { parent: Xe._currentValue, pool: i }),
      (t.memoizedState = { baseLanes: a, cachePool: i }),
      e !== null && Ei(t, null),
      zu(),
      Jf(t),
      e !== null && ml(e, t, n, !0),
      (t.childLanes = l),
      null
    );
  }
  function $i(e, t) {
    return (
      (t = Yi({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Qd(e, t, a) {
    return (
      wn(t, e.child, null, a),
      (e = $i(t, t.pendingProps)),
      (e.flags |= 2),
      wt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Sp(e, t, a) {
    var n = t.pendingProps,
      l = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (ve) {
        if (n.mode === 'hidden') return ((e = $i(t, n)), (t.lanes = 536870912), bc(null, e));
        if (
          (Ru(t),
          (e = De)
            ? ((e = ch(e, Zt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: qa !== null ? { id: sa, overflow: ua } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Cf(e)),
                (a.return = t),
                (t.child = a),
                (st = t),
                (De = null)))
            : (e = null),
          e === null)
        )
          throw Va(t);
        return ((t.lanes = 536870912), null);
      }
      return $i(t, n);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var m = i.dehydrated;
      if ((Ru(t), l))
        if (t.flags & 256) ((t.flags &= -257), (t = Qd(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if ((Ke || ml(e, t, a, !1), (l = (a & e.childLanes) !== 0), Ke || l)) {
        if (((n = Re), n !== null && ((m = Lr(n, a)), m !== 0 && m !== i.retryLane)))
          throw ((i.retryLane = m), An(e, m), At(n, e, m), Iu);
        (Pi(), (t = Qd(e, t, a)));
      } else
        ((e = i.treeContext),
          (De = Qt(m.nextSibling)),
          (st = t),
          (ve = !0),
          (Ga = null),
          (Zt = !1),
          e !== null && Of(t, e),
          (t = $i(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = ya(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function ki(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Pu(e, t, a, n, l) {
    return (
      Mn(t),
      (a = Ou(e, t, a, n, void 0, l)),
      (n = Du()),
      e !== null && !Ke
        ? (Bu(e, t, l), ja(e, t, l))
        : (ve && n && hu(t), (t.flags |= 1), ot(e, t, a, l), t.child)
    );
  }
  function Kd(e, t, a, n, l, i) {
    return (
      Mn(t),
      (t.updateQueue = null),
      (a = Ff(t, n, a, l)),
      Wf(e),
      (n = Du()),
      e !== null && !Ke
        ? (Bu(e, t, i), ja(e, t, i))
        : (ve && n && hu(t), (t.flags |= 1), ot(e, t, a, i), t.child)
    );
  }
  function Jd(e, t, a, n, l) {
    if ((Mn(t), t.stateNode === null)) {
      var i = ol,
        m = a.contextType;
      (typeof m == 'object' && m !== null && (i = ut(m)),
        (i = new a(n, i)),
        (t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = Wu),
        (t.stateNode = i),
        (i._reactInternals = t),
        (i = t.stateNode),
        (i.props = n),
        (i.state = t.memoizedState),
        (i.refs = {}),
        Tu(t),
        (m = a.contextType),
        (i.context = typeof m == 'object' && m !== null ? ut(m) : ol),
        (i.state = t.memoizedState),
        (m = a.getDerivedStateFromProps),
        typeof m == 'function' && (Ju(t, a, m, n), (i.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof i.getSnapshotBeforeUpdate == 'function' ||
          (typeof i.UNSAFE_componentWillMount != 'function' &&
            typeof i.componentWillMount != 'function') ||
          ((m = i.state),
          typeof i.componentWillMount == 'function' && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
          m !== i.state && Wu.enqueueReplaceState(i, i.state, null),
          pc(t, n, i, l),
          hc(),
          (i.state = t.memoizedState)),
        typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      i = t.stateNode;
      var v = t.memoizedProps,
        b = Dn(a, v);
      i.props = b;
      var N = i.context,
        O = a.contextType;
      ((m = ol), typeof O == 'object' && O !== null && (m = ut(O)));
      var H = a.getDerivedStateFromProps;
      ((O = typeof H == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        O ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((v || N !== m) && Bd(t, i, n, m)),
        (ka = !1));
      var z = t.memoizedState;
      ((i.state = z),
        pc(t, n, i, l),
        hc(),
        (N = t.memoizedState),
        v || z !== N || ka
          ? (typeof H == 'function' && (Ju(t, a, H, n), (N = t.memoizedState)),
            (b = ka || Dd(t, a, b, n, z, N, m))
              ? (O ||
                  (typeof i.UNSAFE_componentWillMount != 'function' &&
                    typeof i.componentWillMount != 'function') ||
                  (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == 'function' &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = N)),
            (i.props = n),
            (i.state = N),
            (i.context = m),
            (n = b))
          : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((i = t.stateNode),
        Eu(e, t),
        (m = t.memoizedProps),
        (O = Dn(a, m)),
        (i.props = O),
        (H = t.pendingProps),
        (z = i.context),
        (N = a.contextType),
        (b = ol),
        typeof N == 'object' && N !== null && (b = ut(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((m !== H || z !== b) && Bd(t, i, n, b)),
        (ka = !1),
        (z = t.memoizedState),
        (i.state = z),
        pc(t, n, i, l),
        hc());
      var C = t.memoizedState;
      m !== H || z !== C || ka || (e !== null && e.dependencies !== null && Ai(e.dependencies))
        ? (typeof v == 'function' && (Ju(t, a, v, n), (C = t.memoizedState)),
          (O =
            ka ||
            Dd(t, a, O, n, z, C, b) ||
            (e !== null && e.dependencies !== null && Ai(e.dependencies)))
            ? (N ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(n, C, b),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(n, C, b)),
              typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (m === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (m === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = C)),
          (i.props = n),
          (i.state = C),
          (i.context = b),
          (n = O))
        : (typeof i.componentDidUpdate != 'function' ||
            (m === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (m === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (i = n),
      ki(e, t),
      (n = (t.flags & 128) !== 0),
      i || n
        ? ((i = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : i.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = wn(t, e.child, null, l)), (t.child = wn(t, null, a, l)))
            : ot(e, t, a, l),
          (t.memoizedState = i.state),
          (e = t.child))
        : (e = ja(e, t, l)),
      e
    );
  }
  function Wd(e, t, a, n) {
    return (En(), (t.flags |= 256), ot(e, t, a, n), t.child);
  }
  var eo = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function to(e) {
    return { baseLanes: e, cachePool: qf() };
  }
  function ao(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Dt), e);
  }
  function Fd(e, t, a) {
    var n = t.pendingProps,
      l = !1,
      i = (t.flags & 128) !== 0,
      m;
    if (
      ((m = i) || (m = e !== null && e.memoizedState === null ? !1 : ($e.current & 2) !== 0),
      m && ((l = !0), (t.flags &= -129)),
      (m = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (ve) {
        if (
          (l ? Xa(t) : Qa(),
          (e = De)
            ? ((e = ch(e, Zt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: qa !== null ? { id: sa, overflow: ua } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Cf(e)),
                (a.return = t),
                (t.child = a),
                (st = t),
                (De = null)))
            : (e = null),
          e === null)
        )
          throw Va(t);
        return (qo(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = n.children;
      return (
        (n = n.fallback),
        l
          ? (Qa(),
            (l = t.mode),
            (v = Yi({ mode: 'hidden', children: v }, l)),
            (n = Tn(n, l, a, null)),
            (v.return = t),
            (n.return = t),
            (v.sibling = n),
            (t.child = v),
            (n = t.child),
            (n.memoizedState = to(a)),
            (n.childLanes = ao(e, m, a)),
            (t.memoizedState = eo),
            bc(null, n))
          : (Xa(t), no(t, v))
      );
    }
    var b = e.memoizedState;
    if (b !== null && ((v = b.dehydrated), v !== null)) {
      if (i)
        t.flags & 256
          ? (Xa(t), (t.flags &= -257), (t = lo(e, t, a)))
          : t.memoizedState !== null
            ? (Qa(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Qa(),
              (v = n.fallback),
              (l = t.mode),
              (n = Yi({ mode: 'visible', children: n.children }, l)),
              (v = Tn(v, l, a, null)),
              (v.flags |= 2),
              (n.return = t),
              (v.return = t),
              (n.sibling = v),
              (t.child = n),
              wn(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = to(a)),
              (n.childLanes = ao(e, m, a)),
              (t.memoizedState = eo),
              (t = bc(null, n)));
      else if ((Xa(t), qo(v))) {
        if (((m = v.nextSibling && v.nextSibling.dataset), m)) var N = m.dgst;
        ((m = N),
          (n = Error(o(419))),
          (n.stack = ''),
          (n.digest = m),
          uc({ value: n, source: null, stack: null }),
          (t = lo(e, t, a)));
      } else if ((Ke || ml(e, t, a, !1), (m = (a & e.childLanes) !== 0), Ke || m)) {
        if (((m = Re), m !== null && ((n = Lr(m, a)), n !== 0 && n !== b.retryLane)))
          throw ((b.retryLane = n), An(e, n), At(m, e, n), Iu);
        (Uo(v) || Pi(), (t = lo(e, t, a)));
      } else
        Uo(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = b.treeContext),
            (De = Qt(v.nextSibling)),
            (st = t),
            (ve = !0),
            (Ga = null),
            (Zt = !1),
            e !== null && Of(t, e),
            (t = no(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return l
      ? (Qa(),
        (v = n.fallback),
        (l = t.mode),
        (b = e.child),
        (N = b.sibling),
        (n = ya(b, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = b.subtreeFlags & 65011712),
        N !== null ? (v = ya(N, v)) : ((v = Tn(v, l, a, null)), (v.flags |= 2)),
        (v.return = t),
        (n.return = t),
        (n.sibling = v),
        (t.child = n),
        bc(null, n),
        (n = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = to(a))
          : ((l = v.cachePool),
            l !== null
              ? ((b = Xe._currentValue), (l = l.parent !== b ? { parent: b, pool: b } : l))
              : (l = qf()),
            (v = { baseLanes: v.baseLanes | a, cachePool: l })),
        (n.memoizedState = v),
        (n.childLanes = ao(e, m, a)),
        (t.memoizedState = eo),
        bc(e.child, n))
      : (Xa(t),
        (a = e.child),
        (e = a.sibling),
        (a = ya(a, { mode: 'visible', children: n.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((m = t.deletions), m === null ? ((t.deletions = [e]), (t.flags |= 16)) : m.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function no(e, t) {
    return ((t = Yi({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Yi(e, t) {
    return ((e = Ct(22, e, null, t)), (e.lanes = 0), e);
  }
  function lo(e, t, a) {
    return (
      wn(t, e.child, null, a),
      (e = no(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Id(e, t, a) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), _u(e.return, t, a));
  }
  function co(e, t, a, n, l, i) {
    var m = e.memoizedState;
    m === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: l,
          treeForkCount: i,
        })
      : ((m.isBackwards = t),
        (m.rendering = null),
        (m.renderingStartTime = 0),
        (m.last = n),
        (m.tail = a),
        (m.tailMode = l),
        (m.treeForkCount = i));
  }
  function Pd(e, t, a) {
    var n = t.pendingProps,
      l = n.revealOrder,
      i = n.tail;
    n = n.children;
    var m = $e.current,
      v = (m & 2) !== 0;
    if (
      (v ? ((m = (m & 1) | 2), (t.flags |= 128)) : (m &= 1),
      V($e, m),
      ot(e, t, n, a),
      (n = ve ? sc : 0),
      !v && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Id(e, a, t);
        else if (e.tag === 19) Id(e, a, t);
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
    switch (l) {
      case 'forwards':
        for (a = t.child, l = null; a !== null; )
          ((e = a.alternate), e !== null && wi(e) === null && (l = a), (a = a.sibling));
        ((a = l),
          a === null ? ((l = t.child), (t.child = null)) : ((l = a.sibling), (a.sibling = null)),
          co(t, !1, l, a, i, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && wi(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = a), (a = l), (l = e));
        }
        co(t, !0, a, null, i, n);
        break;
      case 'together':
        co(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ja(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Wa |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((ml(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = ya(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = ya(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function io(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && Ai(e)));
  }
  function xp(e, t, a) {
    switch (t.tag) {
      case 3:
        (Ze(t, t.stateNode.containerInfo), $a(t, Xe, e.memoizedState.cache), En());
        break;
      case 27:
      case 5:
        da(t);
        break;
      case 4:
        Ze(t, t.stateNode.containerInfo);
        break;
      case 10:
        $a(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Ru(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Xa(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? Fd(e, t, a)
              : (Xa(t), (e = ja(e, t, a)), e !== null ? e.sibling : null);
        Xa(t);
        break;
      case 19:
        var l = (e.flags & 128) !== 0;
        if (
          ((n = (a & t.childLanes) !== 0),
          n || (ml(e, t, a, !1), (n = (a & t.childLanes) !== 0)),
          l)
        ) {
          if (n) return Pd(e, t, a);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null && ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          V($e, $e.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Zd(e, t, a, t.pendingProps));
      case 24:
        $a(t, Xe, e.memoizedState.cache);
    }
    return ja(e, t, a);
  }
  function em(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Ke = !0;
      else {
        if (!io(e, a) && (t.flags & 128) === 0) return ((Ke = !1), xp(e, t, a));
        Ke = (e.flags & 131072) !== 0;
      }
    else ((Ke = !1), ve && (t.flags & 1048576) !== 0 && wf(t, sc, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = Cn(t.elementType)), (t.type = e), typeof e == 'function'))
            fu(e)
              ? ((n = Dn(e, n)), (t.tag = 1), (t = Jd(null, t, e, n, a)))
              : ((t.tag = 0), (t = Pu(null, t, e, n, a)));
          else {
            if (e != null) {
              var l = e.$$typeof;
              if (l === be) {
                ((t.tag = 11), (t = $d(null, t, e, n, a)));
                break e;
              } else if (l === ce) {
                ((t.tag = 14), (t = kd(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = dt(e) || e), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return Pu(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (l = Dn(n, t.pendingProps)), Jd(e, t, n, l, a));
      case 3:
        e: {
          if ((Ze(t, t.stateNode.containerInfo), e === null)) throw Error(o(387));
          n = t.pendingProps;
          var i = t.memoizedState;
          ((l = i.element), Eu(e, t), pc(t, n, null, a));
          var m = t.memoizedState;
          if (
            ((n = m.cache),
            $a(t, Xe, n),
            n !== i.cache && bu(t, [Xe], a, !0),
            hc(),
            (n = m.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: n, isDehydrated: !1, cache: m.cache }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              t = Wd(e, t, n, a);
              break e;
            } else if (n !== l) {
              ((l = $t(Error(o(424)), t)), uc(l), (t = Wd(e, t, n, a)));
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
                De = Qt(e.firstChild),
                  st = t,
                  ve = !0,
                  Ga = null,
                  Zt = !0,
                  a = Zf(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((En(), n === l)) {
              t = ja(e, t, a);
              break e;
            }
            ot(e, t, n, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          ki(e, t),
          e === null
            ? (a = fh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : ve ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = is(se.current).createElement(a)),
                (n[it] = t),
                (n[gt] = e),
                rt(n, a, e),
                nt(n),
                (t.stateNode = n))
            : (t.memoizedState = fh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          da(t),
          e === null &&
            ve &&
            ((n = t.stateNode = uh(t.type, t.pendingProps, se.current)),
            (st = t),
            (Zt = !0),
            (l = De),
            tn(t.type) ? ((Go = l), (De = Qt(n.firstChild))) : (De = l)),
          ot(e, t, t.pendingProps.children, a),
          ki(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            ve &&
            ((l = n = De) &&
              ((n = Ip(n, t.type, t.pendingProps, Zt)),
              n !== null
                ? ((t.stateNode = n), (st = t), (De = Qt(n.firstChild)), (Zt = !1), (l = !0))
                : (l = !1)),
            l || Va(t)),
          da(t),
          (l = t.type),
          (i = t.pendingProps),
          (m = e !== null ? e.memoizedProps : null),
          (n = i.children),
          Bo(l, i) ? (n = null) : m !== null && Bo(l, m) && (t.flags |= 32),
          t.memoizedState !== null && ((l = Ou(e, t, mp, null, null, a)), (Bc._currentValue = l)),
          ki(e, t),
          ot(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            ve &&
            ((e = a = De) &&
              ((a = Pp(a, t.pendingProps, Zt)),
              a !== null ? ((t.stateNode = a), (st = t), (De = null), (e = !0)) : (e = !1)),
            e || Va(t)),
          null
        );
      case 13:
        return Fd(e, t, a);
      case 4:
        return (
          Ze(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = wn(t, null, n, a)) : ot(e, t, n, a),
          t.child
        );
      case 11:
        return $d(e, t, t.type, t.pendingProps, a);
      case 7:
        return (ot(e, t, t.pendingProps, a), t.child);
      case 8:
        return (ot(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (ot(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((n = t.pendingProps), $a(t, t.type, n.value), ot(e, t, n.children, a), t.child);
      case 9:
        return (
          (l = t.type._context),
          (n = t.pendingProps.children),
          Mn(t),
          (l = ut(l)),
          (n = n(l)),
          (t.flags |= 1),
          ot(e, t, n, a),
          t.child
        );
      case 14:
        return kd(e, t, t.type, t.pendingProps, a);
      case 15:
        return Yd(e, t, t.type, t.pendingProps, a);
      case 19:
        return Pd(e, t, a);
      case 31:
        return Sp(e, t, a);
      case 22:
        return Zd(e, t, a, t.pendingProps);
      case 24:
        return (
          Mn(t),
          (n = ut(Xe)),
          e === null
            ? ((l = ju()),
              l === null &&
                ((l = Re),
                (i = Su()),
                (l.pooledCache = i),
                i.refCount++,
                i !== null && (l.pooledCacheLanes |= a),
                (l = i)),
              (t.memoizedState = { parent: n, cache: l }),
              Tu(t),
              $a(t, Xe, l))
            : ((e.lanes & a) !== 0 && (Eu(e, t), pc(t, null, null, a), hc()),
              (l = e.memoizedState),
              (i = t.memoizedState),
              l.parent !== n
                ? ((l = { parent: n, cache: n }),
                  (t.memoizedState = l),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = l),
                  $a(t, Xe, n))
                : ((n = i.cache), $a(t, Xe, n), n !== l.cache && bu(t, [Xe], a, !0))),
          ot(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Aa(e) {
    e.flags |= 4;
  }
  function so(e, t, a, n, l) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (l & 335544128) === l))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Nm()) e.flags |= 8192;
        else throw ((Rn = Mi), Au);
    } else e.flags &= -16777217;
  }
  function tm(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !vh(t)))
      if (Nm()) e.flags |= 8192;
      else throw ((Rn = Mi), Au);
  }
  function Zi(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Or() : 536870912), (e.lanes |= t), (Tl |= t)));
  }
  function Sc(e, t) {
    if (!ve)
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
  function Be(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      n = 0;
    if (t)
      for (var l = e.child; l !== null; )
        ((a |= l.lanes | l.childLanes),
          (n |= l.subtreeFlags & 65011712),
          (n |= l.flags & 65011712),
          (l.return = e),
          (l = l.sibling));
    else
      for (l = e.child; l !== null; )
        ((a |= l.lanes | l.childLanes),
          (n |= l.subtreeFlags),
          (n |= l.flags),
          (l.return = e),
          (l = l.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = a), t);
  }
  function jp(e, t, a) {
    var n = t.pendingProps;
    switch ((pu(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Be(t), null);
      case 1:
        return (Be(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          ba(Xe),
          Ee(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (dl(t)
              ? Aa(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), yu())),
          Be(t),
          null
        );
      case 26:
        var l = t.type,
          i = t.memoizedState;
        return (
          e === null
            ? (Aa(t), i !== null ? (Be(t), tm(t, i)) : (Be(t), so(t, l, null, n, a)))
            : i
              ? i !== e.memoizedState
                ? (Aa(t), Be(t), tm(t, i))
                : (Be(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Aa(t), Be(t), so(t, l, e, n, a)),
          null
        );
      case 27:
        if ((Ft(t), (a = se.current), (l = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Aa(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(o(166));
            return (Be(t), null);
          }
          ((e = Z.current), dl(t) ? Df(t) : ((e = uh(l, n, a)), (t.stateNode = e), Aa(t)));
        }
        return (Be(t), null);
      case 5:
        if ((Ft(t), (l = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Aa(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(o(166));
            return (Be(t), null);
          }
          if (((i = Z.current), dl(t))) Df(t);
          else {
            var m = is(se.current);
            switch (i) {
              case 1:
                i = m.createElementNS('http://www.w3.org/2000/svg', l);
                break;
              case 2:
                i = m.createElementNS('http://www.w3.org/1998/Math/MathML', l);
                break;
              default:
                switch (l) {
                  case 'svg':
                    i = m.createElementNS('http://www.w3.org/2000/svg', l);
                    break;
                  case 'math':
                    i = m.createElementNS('http://www.w3.org/1998/Math/MathML', l);
                    break;
                  case 'script':
                    ((i = m.createElement('div')),
                      (i.innerHTML = '<script><\/script>'),
                      (i = i.removeChild(i.firstChild)));
                    break;
                  case 'select':
                    ((i =
                      typeof n.is == 'string'
                        ? m.createElement('select', { is: n.is })
                        : m.createElement('select')),
                      n.multiple ? (i.multiple = !0) : n.size && (i.size = n.size));
                    break;
                  default:
                    i =
                      typeof n.is == 'string'
                        ? m.createElement(l, { is: n.is })
                        : m.createElement(l);
                }
            }
            ((i[it] = t), (i[gt] = n));
            e: for (m = t.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6) i.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                ((m.child.return = m), (m = m.child));
                continue;
              }
              if (m === t) break e;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === t) break e;
                m = m.return;
              }
              ((m.sibling.return = m.return), (m = m.sibling));
            }
            t.stateNode = i;
            e: switch ((rt(i, l, n), l)) {
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
            n && Aa(t);
          }
        }
        return (Be(t), so(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Aa(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = se.current), dl(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (n = null), (l = st), l !== null))
              switch (l.tag) {
                case 27:
                case 5:
                  n = l.memoizedProps;
              }
            ((e[it] = t),
              (e = !!(
                e.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                Fm(e.nodeValue, a)
              )),
              e || Va(t, !0));
          } else ((e = is(e).createTextNode(n)), (e[it] = t), (t.stateNode = e));
        }
        return (Be(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = dl(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(o(557));
              e[it] = t;
            } else (En(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Be(t), (e = !1));
          } else
            ((a = yu()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (wt(t), t) : (wt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return (Be(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((l = dl(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (((l = t.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
                throw Error(o(317));
              l[it] = t;
            } else (En(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Be(t), (l = !1));
          } else
            ((l = yu()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
              (l = !0));
          if (!l) return t.flags & 256 ? (wt(t), t) : (wt(t), null);
        }
        return (
          wt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = n !== null),
              (e = e !== null && e.memoizedState !== null),
              a &&
                ((n = t.child),
                (l = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (l = n.alternate.memoizedState.cachePool.pool),
                (i = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (i = n.memoizedState.cachePool.pool),
                i !== l && (n.flags |= 2048)),
              a !== e && a && (t.child.flags |= 8192),
              Zi(t, t.updateQueue),
              Be(t),
              null)
        );
      case 4:
        return (Ee(), e === null && Co(t.stateNode.containerInfo), Be(t), null);
      case 10:
        return (ba(t.type), Be(t), null);
      case 19:
        if ((L($e), (n = t.memoizedState), n === null)) return (Be(t), null);
        if (((l = (t.flags & 128) !== 0), (i = n.rendering), i === null))
          if (l) Sc(n, !1);
          else {
            if (Ge !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((i = wi(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      Sc(n, !1),
                      e = i.updateQueue,
                      t.updateQueue = e,
                      Zi(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (zf(a, e), (a = a.sibling));
                  return (V($e, ($e.current & 1) | 2), ve && ga(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              Et() > Wi &&
              ((t.flags |= 128), (l = !0), Sc(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!l)
            if (((e = wi(i)), e !== null)) {
              if (
                ((t.flags |= 128),
                (l = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Zi(t, e),
                Sc(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !i.alternate && !ve)
              )
                return (Be(t), null);
            } else
              2 * Et() - n.renderingStartTime > Wi &&
                a !== 536870912 &&
                ((t.flags |= 128), (l = !0), Sc(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : ((e = n.last), e !== null ? (e.sibling = i) : (t.child = i), (n.last = i));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = Et()),
            (e.sibling = null),
            (a = $e.current),
            V($e, l ? (a & 1) | 2 : a & 1),
            ve && ga(t, n.treeForkCount),
            e)
          : (Be(t), null);
      case 22:
      case 23:
        return (
          wt(t),
          Cu(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Be(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Be(t),
          (a = t.updateQueue),
          a !== null && Zi(t, a.retryQueue),
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
          e !== null && L(zn),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          ba(Xe),
          Be(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function Ap(e, t) {
    switch ((pu(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          ba(Xe),
          Ee(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Ft(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((wt(t), t.alternate === null)) throw Error(o(340));
          En();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((wt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(o(340));
          En();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (L($e), null);
      case 4:
        return (Ee(), null);
      case 10:
        return (ba(t.type), null);
      case 22:
      case 23:
        return (
          wt(t),
          Cu(),
          e !== null && L(zn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (ba(Xe), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function am(e, t) {
    switch ((pu(t), t.tag)) {
      case 3:
        (ba(Xe), Ee());
        break;
      case 26:
      case 27:
      case 5:
        Ft(t);
        break;
      case 4:
        Ee();
        break;
      case 31:
        t.memoizedState !== null && wt(t);
        break;
      case 13:
        wt(t);
        break;
      case 19:
        L($e);
        break;
      case 10:
        ba(t.type);
        break;
      case 22:
      case 23:
        (wt(t), Cu(), e !== null && L(zn));
        break;
      case 24:
        ba(Xe);
    }
  }
  function xc(e, t) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var l = n.next;
        a = l;
        do {
          if ((a.tag & e) === e) {
            n = void 0;
            var i = a.create,
              m = a.inst;
            ((n = i()), (m.destroy = n));
          }
          a = a.next;
        } while (a !== l);
      }
    } catch (v) {
      Te(t, t.return, v);
    }
  }
  function Ka(e, t, a) {
    try {
      var n = t.updateQueue,
        l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var i = l.next;
        n = i;
        do {
          if ((n.tag & e) === e) {
            var m = n.inst,
              v = m.destroy;
            if (v !== void 0) {
              ((m.destroy = void 0), (l = t));
              var b = a,
                N = v;
              try {
                N();
              } catch (O) {
                Te(l, b, O);
              }
            }
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (O) {
      Te(t, t.return, O);
    }
  }
  function nm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Qf(t, a);
      } catch (n) {
        Te(e, e.return, n);
      }
    }
  }
  function lm(e, t, a) {
    ((a.props = Dn(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      Te(e, t, n);
    }
  }
  function jc(e, t) {
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
    } catch (l) {
      Te(e, t, l);
    }
  }
  function oa(e, t) {
    var a = e.ref,
      n = e.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (l) {
          Te(e, t, l);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (l) {
          Te(e, t, l);
        }
      else a.current = null;
  }
  function cm(e) {
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
    } catch (l) {
      Te(e, e.return, l);
    }
  }
  function uo(e, t, a) {
    try {
      var n = e.stateNode;
      (Xp(n, e.type, a, t), (n[gt] = t));
    } catch (l) {
      Te(e, e.return, l);
    }
  }
  function im(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && tn(e.type)) || e.tag === 4
    );
  }
  function oo(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || im(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && tn(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ro(e, t, a) {
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
            a != null || t.onclick !== null || (t.onclick = pa)));
    else if (
      n !== 4 &&
      (n === 27 && tn(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (ro(e, t, a), e = e.sibling; e !== null; ) (ro(e, t, a), (e = e.sibling));
  }
  function Xi(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && tn(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (Xi(e, t, a), e = e.sibling; e !== null; ) (Xi(e, t, a), (e = e.sibling));
  }
  function sm(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, l = t.attributes; l.length; ) t.removeAttributeNode(l[0]);
      (rt(t, n, a), (t[it] = e), (t[gt] = a));
    } catch (i) {
      Te(e, e.return, i);
    }
  }
  var Ta = !1,
    Je = !1,
    fo = !1,
    um = typeof WeakSet == 'function' ? WeakSet : Set,
    lt = null;
  function Tp(e, t) {
    if (((e = e.containerInfo), (Oo = ms), (e = bf(e)), lu(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var l = n.anchorOffset,
              i = n.focusNode;
            n = n.focusOffset;
            try {
              (a.nodeType, i.nodeType);
            } catch {
              a = null;
              break e;
            }
            var m = 0,
              v = -1,
              b = -1,
              N = 0,
              O = 0,
              H = e,
              z = null;
            t: for (;;) {
              for (
                var C;
                H !== a || (l !== 0 && H.nodeType !== 3) || (v = m + l),
                  H !== i || (n !== 0 && H.nodeType !== 3) || (b = m + n),
                  H.nodeType === 3 && (m += H.nodeValue.length),
                  (C = H.firstChild) !== null;
              )
                ((z = H), (H = C));
              for (;;) {
                if (H === e) break t;
                if (
                  (z === a && ++N === l && (v = m),
                  z === i && ++O === n && (b = m),
                  (C = H.nextSibling) !== null)
                )
                  break;
                ((H = z), (z = H.parentNode));
              }
              H = C;
            }
            a = v === -1 || b === -1 ? null : { start: v, end: b };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Do = { focusedElem: e, selectionRange: a }, ms = !1, lt = t; lt !== null; )
      if (((t = lt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (lt = e));
      else
        for (; lt !== null; ) {
          switch (((t = lt), (i = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (a = 0; a < e.length; a++) ((l = e[a]), (l.ref.impl = l.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && i !== null) {
                ((e = void 0),
                  (a = t),
                  (l = i.memoizedProps),
                  (i = i.memoizedState),
                  (n = a.stateNode));
                try {
                  var X = Dn(a.type, l);
                  ((e = n.getSnapshotBeforeUpdate(X, i)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ee) {
                  Te(a, a.return, ee);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) Ho(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Ho(e);
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
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (lt = e));
            break;
          }
          lt = t.return;
        }
  }
  function om(e, t, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Na(e, a), n & 4 && xc(5, a));
        break;
      case 1:
        if ((Na(e, a), n & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (m) {
              Te(a, a.return, m);
            }
          else {
            var l = Dn(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(l, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (m) {
              Te(a, a.return, m);
            }
          }
        (n & 64 && nm(a), n & 512 && jc(a, a.return));
        break;
      case 3:
        if ((Na(e, a), n & 64 && ((e = a.updateQueue), e !== null))) {
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
            Qf(e, t);
          } catch (m) {
            Te(a, a.return, m);
          }
        }
        break;
      case 27:
        t === null && n & 4 && sm(a);
      case 26:
      case 5:
        (Na(e, a), t === null && n & 4 && cm(a), n & 512 && jc(a, a.return));
        break;
      case 12:
        Na(e, a);
        break;
      case 31:
        (Na(e, a), n & 4 && dm(e, a));
        break;
      case 13:
        (Na(e, a),
          n & 4 && mm(e, a),
          n & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = Dp.bind(null, a)), ev(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || Ta), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || Je), (l = Ta));
          var i = Je;
          ((Ta = n),
            (Je = t) && !i ? Ma(e, a, (a.subtreeFlags & 8772) !== 0) : Na(e, a),
            (Ta = l),
            (Je = i));
        }
        break;
      case 30:
        break;
      default:
        Na(e, a);
    }
  }
  function rm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), rm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Vs(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var He = null,
    bt = !1;
  function Ea(e, t, a) {
    for (a = a.child; a !== null; ) (fm(e, t, a), (a = a.sibling));
  }
  function fm(e, t, a) {
    if (Nt && typeof Nt.onCommitFiberUnmount == 'function')
      try {
        Nt.onCommitFiberUnmount(Ql, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (Je || oa(a, t),
          Ea(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        Je || oa(a, t);
        var n = He,
          l = bt;
        (tn(a.type) && ((He = a.stateNode), (bt = !1)),
          Ea(e, t, a),
          wc(a.stateNode),
          (He = n),
          (bt = l));
        break;
      case 5:
        Je || oa(a, t);
      case 6:
        if (((n = He), (l = bt), (He = null), Ea(e, t, a), (He = n), (bt = l), He !== null))
          if (bt)
            try {
              (He.nodeType === 9
                ? He.body
                : He.nodeName === 'HTML'
                  ? He.ownerDocument.body
                  : He
              ).removeChild(a.stateNode);
            } catch (i) {
              Te(a, t, i);
            }
          else
            try {
              He.removeChild(a.stateNode);
            } catch (i) {
              Te(a, t, i);
            }
        break;
      case 18:
        He !== null &&
          (bt
            ? ((e = He),
              nh(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              Ol(e))
            : nh(He, a.stateNode));
        break;
      case 4:
        ((n = He),
          (l = bt),
          (He = a.stateNode.containerInfo),
          (bt = !0),
          Ea(e, t, a),
          (He = n),
          (bt = l));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Ka(2, a, t), Je || Ka(4, a, t), Ea(e, t, a));
        break;
      case 1:
        (Je ||
          (oa(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && lm(a, t, n)),
          Ea(e, t, a));
        break;
      case 21:
        Ea(e, t, a);
        break;
      case 22:
        ((Je = (n = Je) || a.memoizedState !== null), Ea(e, t, a), (Je = n));
        break;
      default:
        Ea(e, t, a);
    }
  }
  function dm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Ol(e);
      } catch (a) {
        Te(t, t.return, a);
      }
    }
  }
  function mm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Ol(e);
      } catch (a) {
        Te(t, t.return, a);
      }
  }
  function Ep(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new um()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new um()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Qi(e, t) {
    var a = Ep(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var l = Bp.bind(null, e, n);
        n.then(l, l);
      }
    });
  }
  function St(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var l = a[n],
          i = e,
          m = t,
          v = m;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (tn(v.type)) {
                ((He = v.stateNode), (bt = !1));
                break e;
              }
              break;
            case 5:
              ((He = v.stateNode), (bt = !1));
              break e;
            case 3:
            case 4:
              ((He = v.stateNode.containerInfo), (bt = !0));
              break e;
          }
          v = v.return;
        }
        if (He === null) throw Error(o(160));
        (fm(i, m, l),
          (He = null),
          (bt = !1),
          (i = l.alternate),
          i !== null && (i.return = null),
          (l.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (hm(t, e), (t = t.sibling));
  }
  var Pt = null;
  function hm(e, t) {
    var a = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (St(t, e), xt(e), n & 4 && (Ka(3, e, e.return), xc(3, e), Ka(5, e, e.return)));
        break;
      case 1:
        (St(t, e),
          xt(e),
          n & 512 && (Je || a === null || oa(a, a.return)),
          n & 64 &&
            Ta &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var l = Pt;
        if ((St(t, e), xt(e), n & 512 && (Je || a === null || oa(a, a.return)), n & 4)) {
          var i = a !== null ? a.memoizedState : null;
          if (((n = e.memoizedState), a === null))
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  ((n = e.type), (a = e.memoizedProps), (l = l.ownerDocument || l));
                  t: switch (n) {
                    case 'title':
                      ((i = l.getElementsByTagName('title')[0]),
                        (!i ||
                          i[Wl] ||
                          i[it] ||
                          i.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          i.hasAttribute('itemprop')) &&
                          ((i = l.createElement(n)),
                          l.head.insertBefore(i, l.querySelector('head > title'))),
                        rt(i, n, a),
                        (i[it] = e),
                        nt(i),
                        (n = i));
                      break e;
                    case 'link':
                      var m = hh('link', 'href', l).get(n + (a.href || ''));
                      if (m) {
                        for (var v = 0; v < m.length; v++)
                          if (
                            ((i = m[v]),
                            i.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              i.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              i.getAttribute('title') === (a.title == null ? null : a.title) &&
                              i.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            m.splice(v, 1);
                            break t;
                          }
                      }
                      ((i = l.createElement(n)), rt(i, n, a), l.head.appendChild(i));
                      break;
                    case 'meta':
                      if ((m = hh('meta', 'content', l).get(n + (a.content || '')))) {
                        for (v = 0; v < m.length; v++)
                          if (
                            ((i = m[v]),
                            i.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              i.getAttribute('name') === (a.name == null ? null : a.name) &&
                              i.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              i.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              i.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            m.splice(v, 1);
                            break t;
                          }
                      }
                      ((i = l.createElement(n)), rt(i, n, a), l.head.appendChild(i));
                      break;
                    default:
                      throw Error(o(468, n));
                  }
                  ((i[it] = e), nt(i), (n = i));
                }
                e.stateNode = n;
              } else ph(l, e.type, e.stateNode);
            else e.stateNode = mh(l, n, e.memoizedProps);
          else
            i !== n
              ? (i === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : i.count--,
                n === null ? ph(l, e.type, e.stateNode) : mh(l, n, e.memoizedProps))
              : n === null && e.stateNode !== null && uo(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (St(t, e),
          xt(e),
          n & 512 && (Je || a === null || oa(a, a.return)),
          a !== null && n & 4 && uo(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((St(t, e), xt(e), n & 512 && (Je || a === null || oa(a, a.return)), e.flags & 32)) {
          l = e.stateNode;
          try {
            al(l, '');
          } catch (X) {
            Te(e, e.return, X);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((l = e.memoizedProps), uo(e, l, a !== null ? a.memoizedProps : l)),
          n & 1024 && (fo = !0));
        break;
      case 6:
        if ((St(t, e), xt(e), n & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((n = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = n;
          } catch (X) {
            Te(e, e.return, X);
          }
        }
        break;
      case 3:
        if (
          ((os = null),
          (l = Pt),
          (Pt = ss(t.containerInfo)),
          St(t, e),
          (Pt = l),
          xt(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Ol(t.containerInfo);
          } catch (X) {
            Te(e, e.return, X);
          }
        fo && ((fo = !1), pm(e));
        break;
      case 4:
        ((n = Pt), (Pt = ss(e.stateNode.containerInfo)), St(t, e), xt(e), (Pt = n));
        break;
      case 12:
        (St(t, e), xt(e));
        break;
      case 31:
        (St(t, e),
          xt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Qi(e, n))));
        break;
      case 13:
        (St(t, e),
          xt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Ji = Et()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Qi(e, n))));
        break;
      case 22:
        l = e.memoizedState !== null;
        var b = a !== null && a.memoizedState !== null,
          N = Ta,
          O = Je;
        if (((Ta = N || l), (Je = O || b), St(t, e), (Je = O), (Ta = N), xt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = l ? t._visibility & -2 : t._visibility | 1,
              l && (a === null || b || Ta || Je || Bn(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                b = a = t;
                try {
                  if (((i = b.stateNode), l))
                    ((m = i.style),
                      typeof m.setProperty == 'function'
                        ? m.setProperty('display', 'none', 'important')
                        : (m.display = 'none'));
                  else {
                    v = b.stateNode;
                    var H = b.memoizedProps.style,
                      z = H != null && H.hasOwnProperty('display') ? H.display : null;
                    v.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (X) {
                  Te(b, b.return, X);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                b = t;
                try {
                  b.stateNode.nodeValue = l ? '' : b.memoizedProps;
                } catch (X) {
                  Te(b, b.return, X);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                b = t;
                try {
                  var C = b.stateNode;
                  l ? lh(C, !0) : lh(b.stateNode, !1);
                } catch (X) {
                  Te(b, b.return, X);
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
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), Qi(e, a))));
        break;
      case 19:
        (St(t, e),
          xt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Qi(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (St(t, e), xt(e));
    }
  }
  function xt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, n = e.return; n !== null; ) {
          if (im(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var l = a.stateNode,
              i = oo(e);
            Xi(e, i, l);
            break;
          case 5:
            var m = a.stateNode;
            a.flags & 32 && (al(m, ''), (a.flags &= -33));
            var v = oo(e);
            Xi(e, v, m);
            break;
          case 3:
          case 4:
            var b = a.stateNode.containerInfo,
              N = oo(e);
            ro(e, N, b);
            break;
          default:
            throw Error(o(161));
        }
      } catch (O) {
        Te(e, e.return, O);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function pm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (pm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Na(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (om(e, t.alternate, t), (t = t.sibling));
  }
  function Bn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Ka(4, t, t.return), Bn(t));
          break;
        case 1:
          oa(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && lm(t, t.return, a), Bn(t));
          break;
        case 27:
          wc(t.stateNode);
        case 26:
        case 5:
          (oa(t, t.return), Bn(t));
          break;
        case 22:
          t.memoizedState === null && Bn(t);
          break;
        case 30:
          Bn(t);
          break;
        default:
          Bn(t);
      }
      e = e.sibling;
    }
  }
  function Ma(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        l = e,
        i = t,
        m = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (Ma(l, i, a), xc(4, i));
          break;
        case 1:
          if ((Ma(l, i, a), (n = i), (l = n.stateNode), typeof l.componentDidMount == 'function'))
            try {
              l.componentDidMount();
            } catch (N) {
              Te(n, n.return, N);
            }
          if (((n = i), (l = n.updateQueue), l !== null)) {
            var v = n.stateNode;
            try {
              var b = l.shared.hiddenCallbacks;
              if (b !== null)
                for (l.shared.hiddenCallbacks = null, l = 0; l < b.length; l++) Xf(b[l], v);
            } catch (N) {
              Te(n, n.return, N);
            }
          }
          (a && m & 64 && nm(i), jc(i, i.return));
          break;
        case 27:
          sm(i);
        case 26:
        case 5:
          (Ma(l, i, a), a && n === null && m & 4 && cm(i), jc(i, i.return));
          break;
        case 12:
          Ma(l, i, a);
          break;
        case 31:
          (Ma(l, i, a), a && m & 4 && dm(l, i));
          break;
        case 13:
          (Ma(l, i, a), a && m & 4 && mm(l, i));
          break;
        case 22:
          (i.memoizedState === null && Ma(l, i, a), jc(i, i.return));
          break;
        case 30:
          break;
        default:
          Ma(l, i, a);
      }
      t = t.sibling;
    }
  }
  function mo(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && oc(a)));
  }
  function ho(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && oc(e)));
  }
  function ea(e, t, a, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (vm(e, t, a, n), (t = t.sibling));
  }
  function vm(e, t, a, n) {
    var l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (ea(e, t, a, n), l & 2048 && xc(9, t));
        break;
      case 1:
        ea(e, t, a, n);
        break;
      case 3:
        (ea(e, t, a, n),
          l & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && oc(e))));
        break;
      case 12:
        if (l & 2048) {
          (ea(e, t, a, n), (e = t.stateNode));
          try {
            var i = t.memoizedProps,
              m = i.id,
              v = i.onPostCommit;
            typeof v == 'function' &&
              v(m, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (b) {
            Te(t, t.return, b);
          }
        } else ea(e, t, a, n);
        break;
      case 31:
        ea(e, t, a, n);
        break;
      case 13:
        ea(e, t, a, n);
        break;
      case 23:
        break;
      case 22:
        ((i = t.stateNode),
          (m = t.alternate),
          t.memoizedState !== null
            ? i._visibility & 2
              ? ea(e, t, a, n)
              : Ac(e, t)
            : i._visibility & 2
              ? ea(e, t, a, n)
              : ((i._visibility |= 2), xl(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          l & 2048 && mo(m, t));
        break;
      case 24:
        (ea(e, t, a, n), l & 2048 && ho(t.alternate, t));
        break;
      default:
        ea(e, t, a, n);
    }
  }
  function xl(e, t, a, n, l) {
    for (l = l && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var i = e,
        m = t,
        v = a,
        b = n,
        N = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          (xl(i, m, v, b, l), xc(8, m));
          break;
        case 23:
          break;
        case 22:
          var O = m.stateNode;
          (m.memoizedState !== null
            ? O._visibility & 2
              ? xl(i, m, v, b, l)
              : Ac(i, m)
            : ((O._visibility |= 2), xl(i, m, v, b, l)),
            l && N & 2048 && mo(m.alternate, m));
          break;
        case 24:
          (xl(i, m, v, b, l), l && N & 2048 && ho(m.alternate, m));
          break;
        default:
          xl(i, m, v, b, l);
      }
      t = t.sibling;
    }
  }
  function Ac(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          n = t,
          l = n.flags;
        switch (n.tag) {
          case 22:
            (Ac(a, n), l & 2048 && mo(n.alternate, n));
            break;
          case 24:
            (Ac(a, n), l & 2048 && ho(n.alternate, n));
            break;
          default:
            Ac(a, n);
        }
        t = t.sibling;
      }
  }
  var Tc = 8192;
  function jl(e, t, a) {
    if (e.subtreeFlags & Tc) for (e = e.child; e !== null; ) (ym(e, t, a), (e = e.sibling));
  }
  function ym(e, t, a) {
    switch (e.tag) {
      case 26:
        (jl(e, t, a),
          e.flags & Tc && e.memoizedState !== null && dv(a, Pt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        jl(e, t, a);
        break;
      case 3:
      case 4:
        var n = Pt;
        ((Pt = ss(e.stateNode.containerInfo)), jl(e, t, a), (Pt = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Tc), (Tc = 16777216), jl(e, t, a), (Tc = n))
            : jl(e, t, a));
        break;
      default:
        jl(e, t, a);
    }
  }
  function gm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Ec(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((lt = n), bm(n, e));
        }
      gm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (_m(e), (e = e.sibling));
  }
  function _m(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Ec(e), e.flags & 2048 && Ka(9, e, e.return));
        break;
      case 3:
        Ec(e);
        break;
      case 12:
        Ec(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Ki(e))
          : Ec(e);
        break;
      default:
        Ec(e);
    }
  }
  function Ki(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((lt = n), bm(n, e));
        }
      gm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Ka(8, t, t.return), Ki(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Ki(t)));
          break;
        default:
          Ki(t);
      }
      e = e.sibling;
    }
  }
  function bm(e, t) {
    for (; lt !== null; ) {
      var a = lt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ka(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          oc(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (lt = n));
      else
        e: for (a = e; lt !== null; ) {
          n = lt;
          var l = n.sibling,
            i = n.return;
          if ((rm(n), n === a)) {
            lt = null;
            break e;
          }
          if (l !== null) {
            ((l.return = i), (lt = l));
            break e;
          }
          lt = i;
        }
    }
  }
  var Np = {
      getCacheForType: function (e) {
        var t = ut(Xe),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return ut(Xe).controller.signal;
      },
    },
    Mp = typeof WeakMap == 'function' ? WeakMap : Map,
    xe = 0,
    Re = null,
    re = null,
    me = 0,
    Ae = 0,
    Ot = null,
    Ja = !1,
    Al = !1,
    po = !1,
    za = 0,
    Ge = 0,
    Wa = 0,
    Ln = 0,
    vo = 0,
    Dt = 0,
    Tl = 0,
    Nc = null,
    jt = null,
    yo = !1,
    Ji = 0,
    Sm = 0,
    Wi = 1 / 0,
    Fi = null,
    Fa = null,
    Ie = 0,
    Ia = null,
    El = null,
    Ca = 0,
    go = 0,
    _o = null,
    xm = null,
    Mc = 0,
    bo = null;
  function Bt() {
    return (xe & 2) !== 0 && me !== 0 ? me & -me : w.T !== null ? Eo() : Hr();
  }
  function jm() {
    if (Dt === 0)
      if ((me & 536870912) === 0 || ve) {
        var e = ci;
        ((ci <<= 1), (ci & 3932160) === 0 && (ci = 262144), (Dt = e));
      } else Dt = 536870912;
    return ((e = Rt.current), e !== null && (e.flags |= 32), Dt);
  }
  function At(e, t, a) {
    (((e === Re && (Ae === 2 || Ae === 9)) || e.cancelPendingCommit !== null) &&
      (Nl(e, 0), Pa(e, me, Dt, !1)),
      Jl(e, a),
      ((xe & 2) === 0 || e !== Re) &&
        (e === Re && ((xe & 2) === 0 && (Ln |= a), Ge === 4 && Pa(e, me, Dt, !1)), ra(e)));
  }
  function Am(e, t, a) {
    if ((xe & 6) !== 0) throw Error(o(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Kl(e, t),
      l = n ? Rp(e, t) : xo(e, t, !0),
      i = n;
    do {
      if (l === 0) {
        Al && !n && Pa(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), i && !zp(a))) {
          ((l = xo(e, t, !1)), (i = !1));
          continue;
        }
        if (l === 2) {
          if (((i = t), e.errorRecoveryDisabledLanes & i)) var m = 0;
          else
            ((m = e.pendingLanes & -536870913), (m = m !== 0 ? m : m & 536870912 ? 536870912 : 0));
          if (m !== 0) {
            t = m;
            e: {
              var v = e;
              l = Nc;
              var b = v.current.memoizedState.isDehydrated;
              if ((b && (Nl(v, m).flags |= 256), (m = xo(v, m, !1)), m !== 2)) {
                if (po && !b) {
                  ((v.errorRecoveryDisabledLanes |= i), (Ln |= i), (l = 4));
                  break e;
                }
                ((i = jt), (jt = l), i !== null && (jt === null ? (jt = i) : jt.push.apply(jt, i)));
              }
              l = m;
            }
            if (((i = !1), l !== 2)) continue;
          }
        }
        if (l === 1) {
          (Nl(e, 0), Pa(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (i = l), i)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Pa(n, t, Dt, !Ja);
              break e;
            case 2:
              jt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((l = Ji + 300 - Et()), 10 < l)) {
            if ((Pa(n, t, Dt, !Ja), si(n, 0, !0) !== 0)) break e;
            ((Ca = t),
              (n.timeoutHandle = th(
                Tm.bind(null, n, a, jt, Fi, yo, t, Dt, Ln, Tl, Ja, i, 'Throttled', -0, 0),
                l
              )));
            break e;
          }
          Tm(n, a, jt, Fi, yo, t, Dt, Ln, Tl, Ja, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    ra(e);
  }
  function Tm(e, t, a, n, l, i, m, v, b, N, O, H, z, C) {
    if (((e.timeoutHandle = -1), (H = t.subtreeFlags), H & 8192 || (H & 16785408) === 16785408)) {
      ((H = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: pa,
      }),
        ym(t, i, H));
      var X = (i & 62914560) === i ? Ji - Et() : (i & 4194048) === i ? Sm - Et() : 0;
      if (((X = mv(H, X)), X !== null)) {
        ((Ca = i),
          (e.cancelPendingCommit = X(Om.bind(null, e, t, i, a, n, l, m, v, b, O, H, null, z, C))),
          Pa(e, i, m, !N));
        return;
      }
    }
    Om(e, t, i, a, n, l, m, v, b);
  }
  function zp(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var l = a[n],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!zt(i(), l)) return !1;
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
  function Pa(e, t, a, n) {
    ((t &= ~vo),
      (t &= ~Ln),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var l = t; 0 < l; ) {
      var i = 31 - Mt(l),
        m = 1 << i;
      ((n[i] = -1), (l &= ~m));
    }
    a !== 0 && Dr(e, a, t);
  }
  function Ii() {
    return (xe & 6) === 0 ? (zc(0), !1) : !0;
  }
  function So() {
    if (re !== null) {
      if (Ae === 0) var e = re.return;
      else ((e = re), (_a = Nn = null), Lu(e), (yl = null), (fc = 0), (e = re));
      for (; e !== null; ) (am(e.alternate, e), (e = e.return));
      re = null;
    }
  }
  function Nl(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), Jp(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (Ca = 0),
      So(),
      (Re = e),
      (re = a = ya(e.current, null)),
      (me = t),
      (Ae = 0),
      (Ot = null),
      (Ja = !1),
      (Al = Kl(e, t)),
      (po = !1),
      (Tl = Dt = vo = Ln = Wa = Ge = 0),
      (jt = Nc = null),
      (yo = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var l = 31 - Mt(n),
          i = 1 << l;
        ((t |= e[l]), (n &= ~i));
      }
    return ((za = t), _i(), a);
  }
  function Em(e, t) {
    ((ie = null),
      (w.H = _c),
      t === vl || t === Ni
        ? ((t = $f()), (Ae = 3))
        : t === Au
          ? ((t = $f()), (Ae = 4))
          : (Ae =
              t === Iu
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Ot = t),
      re === null && ((Ge = 1), Vi(e, $t(t, e.current))));
  }
  function Nm() {
    var e = Rt.current;
    return e === null
      ? !0
      : (me & 4194048) === me
        ? Xt === null
        : (me & 62914560) === me || (me & 536870912) !== 0
          ? e === Xt
          : !1;
  }
  function Mm() {
    var e = w.H;
    return ((w.H = _c), e === null ? _c : e);
  }
  function zm() {
    var e = w.A;
    return ((w.A = Np), e);
  }
  function Pi() {
    ((Ge = 4),
      Ja || ((me & 4194048) !== me && Rt.current !== null) || (Al = !0),
      ((Wa & 134217727) === 0 && (Ln & 134217727) === 0) || Re === null || Pa(Re, me, Dt, !1));
  }
  function xo(e, t, a) {
    var n = xe;
    xe |= 2;
    var l = Mm(),
      i = zm();
    ((Re !== e || me !== t) && ((Fi = null), Nl(e, t)), (t = !1));
    var m = Ge;
    e: do
      try {
        if (Ae !== 0 && re !== null) {
          var v = re,
            b = Ot;
          switch (Ae) {
            case 8:
              (So(), (m = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Rt.current === null && (t = !0);
              var N = Ae;
              if (((Ae = 0), (Ot = null), Ml(e, v, b, N), a && Al)) {
                m = 0;
                break e;
              }
              break;
            default:
              ((N = Ae), (Ae = 0), (Ot = null), Ml(e, v, b, N));
          }
        }
        (Cp(), (m = Ge));
        break;
      } catch (O) {
        Em(e, O);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (_a = Nn = null),
      (xe = n),
      (w.H = l),
      (w.A = i),
      re === null && ((Re = null), (me = 0), _i()),
      m
    );
  }
  function Cp() {
    for (; re !== null; ) Cm(re);
  }
  function Rp(e, t) {
    var a = xe;
    xe |= 2;
    var n = Mm(),
      l = zm();
    Re !== e || me !== t ? ((Fi = null), (Wi = Et() + 500), Nl(e, t)) : (Al = Kl(e, t));
    e: do
      try {
        if (Ae !== 0 && re !== null) {
          t = re;
          var i = Ot;
          t: switch (Ae) {
            case 1:
              ((Ae = 0), (Ot = null), Ml(e, t, i, 1));
              break;
            case 2:
            case 9:
              if (Gf(i)) {
                ((Ae = 0), (Ot = null), Rm(t));
                break;
              }
              ((t = function () {
                ((Ae !== 2 && Ae !== 9) || Re !== e || (Ae = 7), ra(e));
              }),
                i.then(t, t));
              break e;
            case 3:
              Ae = 7;
              break e;
            case 4:
              Ae = 5;
              break e;
            case 7:
              Gf(i) ? ((Ae = 0), (Ot = null), Rm(t)) : ((Ae = 0), (Ot = null), Ml(e, t, i, 7));
              break;
            case 5:
              var m = null;
              switch (re.tag) {
                case 26:
                  m = re.memoizedState;
                case 5:
                case 27:
                  var v = re;
                  if (m ? vh(m) : v.stateNode.complete) {
                    ((Ae = 0), (Ot = null));
                    var b = v.sibling;
                    if (b !== null) re = b;
                    else {
                      var N = v.return;
                      N !== null ? ((re = N), es(N)) : (re = null);
                    }
                    break t;
                  }
              }
              ((Ae = 0), (Ot = null), Ml(e, t, i, 5));
              break;
            case 6:
              ((Ae = 0), (Ot = null), Ml(e, t, i, 6));
              break;
            case 8:
              (So(), (Ge = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        wp();
        break;
      } catch (O) {
        Em(e, O);
      }
    while (!0);
    return (
      (_a = Nn = null),
      (w.H = n),
      (w.A = l),
      (xe = a),
      re !== null ? 0 : ((Re = null), (me = 0), _i(), Ge)
    );
  }
  function wp() {
    for (; re !== null && !Ls(); ) Cm(re);
  }
  function Cm(e) {
    var t = em(e.alternate, e, za);
    ((e.memoizedProps = e.pendingProps), t === null ? es(e) : (re = t));
  }
  function Rm(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Kd(a, t, t.pendingProps, t.type, void 0, me);
        break;
      case 11:
        t = Kd(a, t, t.pendingProps, t.type.render, t.ref, me);
        break;
      case 5:
        Lu(t);
      default:
        (am(a, t), (t = re = zf(t, za)), (t = em(a, t, za)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? es(e) : (re = t));
  }
  function Ml(e, t, a, n) {
    ((_a = Nn = null), Lu(t), (yl = null), (fc = 0));
    var l = t.return;
    try {
      if (bp(e, l, t, a, me)) {
        ((Ge = 1), Vi(e, $t(a, e.current)), (re = null));
        return;
      }
    } catch (i) {
      if (l !== null) throw ((re = l), i);
      ((Ge = 1), Vi(e, $t(a, e.current)), (re = null));
      return;
    }
    t.flags & 32768
      ? (ve || n === 1
          ? (e = !0)
          : Al || (me & 536870912) !== 0
            ? (e = !1)
            : ((Ja = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Rt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        wm(t, e))
      : es(t);
  }
  function es(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        wm(t, Ja);
        return;
      }
      e = t.return;
      var a = jp(t.alternate, t, za);
      if (a !== null) {
        re = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        re = t;
        return;
      }
      re = t = e;
    } while (t !== null);
    Ge === 0 && (Ge = 5);
  }
  function wm(e, t) {
    do {
      var a = Ap(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (re = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        re = e;
        return;
      }
      re = e = a;
    } while (e !== null);
    ((Ge = 6), (re = null));
  }
  function Om(e, t, a, n, l, i, m, v, b) {
    e.cancelPendingCommit = null;
    do ts();
    while (Ie !== 0);
    if ((xe & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((i = t.lanes | t.childLanes),
        (i |= ou),
        f1(e, a, i, m, v, b),
        e === Re && ((re = Re = null), (me = 0)),
        (El = t),
        (Ia = e),
        (Ca = a),
        (go = i),
        (_o = l),
        (xm = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Lp(ni, function () {
              return (Um(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = w.T), (w.T = null), (l = $.p), ($.p = 2), (m = xe), (xe |= 4));
        try {
          Tp(e, t, a);
        } finally {
          ((xe = m), ($.p = l), (w.T = n));
        }
      }
      ((Ie = 1), Dm(), Bm(), Lm());
    }
  }
  function Dm() {
    if (Ie === 1) {
      Ie = 0;
      var e = Ia,
        t = El,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = w.T), (w.T = null));
        var n = $.p;
        $.p = 2;
        var l = xe;
        xe |= 4;
        try {
          hm(t, e);
          var i = Do,
            m = bf(e.containerInfo),
            v = i.focusedElem,
            b = i.selectionRange;
          if (m !== v && v && v.ownerDocument && _f(v.ownerDocument.documentElement, v)) {
            if (b !== null && lu(v)) {
              var N = b.start,
                O = b.end;
              if ((O === void 0 && (O = N), 'selectionStart' in v))
                ((v.selectionStart = N), (v.selectionEnd = Math.min(O, v.value.length)));
              else {
                var H = v.ownerDocument || document,
                  z = (H && H.defaultView) || window;
                if (z.getSelection) {
                  var C = z.getSelection(),
                    X = v.textContent.length,
                    ee = Math.min(b.start, X),
                    ze = b.end === void 0 ? ee : Math.min(b.end, X);
                  !C.extend && ee > ze && ((m = ze), (ze = ee), (ee = m));
                  var A = gf(v, ee),
                    S = gf(v, ze);
                  if (
                    A &&
                    S &&
                    (C.rangeCount !== 1 ||
                      C.anchorNode !== A.node ||
                      C.anchorOffset !== A.offset ||
                      C.focusNode !== S.node ||
                      C.focusOffset !== S.offset)
                  ) {
                    var E = H.createRange();
                    (E.setStart(A.node, A.offset),
                      C.removeAllRanges(),
                      ee > ze
                        ? (C.addRange(E), C.extend(S.node, S.offset))
                        : (E.setEnd(S.node, S.offset), C.addRange(E)));
                  }
                }
              }
            }
            for (H = [], C = v; (C = C.parentNode); )
              C.nodeType === 1 && H.push({ element: C, left: C.scrollLeft, top: C.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < H.length; v++) {
              var B = H[v];
              ((B.element.scrollLeft = B.left), (B.element.scrollTop = B.top));
            }
          }
          ((ms = !!Oo), (Do = Oo = null));
        } finally {
          ((xe = l), ($.p = n), (w.T = a));
        }
      }
      ((e.current = t), (Ie = 2));
    }
  }
  function Bm() {
    if (Ie === 2) {
      Ie = 0;
      var e = Ia,
        t = El,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = w.T), (w.T = null));
        var n = $.p;
        $.p = 2;
        var l = xe;
        xe |= 4;
        try {
          om(e, t.alternate, t);
        } finally {
          ((xe = l), ($.p = n), (w.T = a));
        }
      }
      Ie = 3;
    }
  }
  function Lm() {
    if (Ie === 4 || Ie === 3) {
      ((Ie = 0), a1());
      var e = Ia,
        t = El,
        a = Ca,
        n = xm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ie = 5)
        : ((Ie = 0), (El = Ia = null), Hm(e, e.pendingLanes));
      var l = e.pendingLanes;
      if (
        (l === 0 && (Fa = null),
        qs(a),
        (t = t.stateNode),
        Nt && typeof Nt.onCommitFiberRoot == 'function')
      )
        try {
          Nt.onCommitFiberRoot(Ql, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = w.T), (l = $.p), ($.p = 2), (w.T = null));
        try {
          for (var i = e.onRecoverableError, m = 0; m < n.length; m++) {
            var v = n[m];
            i(v.value, { componentStack: v.stack });
          }
        } finally {
          ((w.T = t), ($.p = l));
        }
      }
      ((Ca & 3) !== 0 && ts(),
        ra(e),
        (l = e.pendingLanes),
        (a & 261930) !== 0 && (l & 42) !== 0 ? (e === bo ? Mc++ : ((Mc = 0), (bo = e))) : (Mc = 0),
        zc(0));
    }
  }
  function Hm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), oc(t)));
  }
  function ts() {
    return (Dm(), Bm(), Lm(), Um());
  }
  function Um() {
    if (Ie !== 5) return !1;
    var e = Ia,
      t = go;
    go = 0;
    var a = qs(Ca),
      n = w.T,
      l = $.p;
    try {
      (($.p = 32 > a ? 32 : a), (w.T = null), (a = _o), (_o = null));
      var i = Ia,
        m = Ca;
      if (((Ie = 0), (El = Ia = null), (Ca = 0), (xe & 6) !== 0)) throw Error(o(331));
      var v = xe;
      if (
        ((xe |= 4),
        _m(i.current),
        vm(i, i.current, m, a),
        (xe = v),
        zc(0, !1),
        Nt && typeof Nt.onPostCommitFiberRoot == 'function')
      )
        try {
          Nt.onPostCommitFiberRoot(Ql, i);
        } catch {}
      return !0;
    } finally {
      (($.p = l), (w.T = n), Hm(e, t));
    }
  }
  function qm(e, t, a) {
    ((t = $t(a, t)),
      (t = Fu(e.stateNode, t, 2)),
      (e = Za(e, t, 2)),
      e !== null && (Jl(e, 2), ra(e)));
  }
  function Te(e, t, a) {
    if (e.tag === 3) qm(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          qm(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Fa === null || !Fa.has(n)))
          ) {
            ((e = $t(a, e)),
              (a = Gd(2)),
              (n = Za(t, a, 2)),
              n !== null && (Vd(a, n, t, e), Jl(n, 2), ra(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function jo(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new Mp();
      var l = new Set();
      n.set(t, l);
    } else ((l = n.get(t)), l === void 0 && ((l = new Set()), n.set(t, l)));
    l.has(a) || ((po = !0), l.add(a), (e = Op.bind(null, e, t, a)), t.then(e, e));
  }
  function Op(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Re === e &&
        (me & a) === a &&
        (Ge === 4 || (Ge === 3 && (me & 62914560) === me && 300 > Et() - Ji)
          ? (xe & 2) === 0 && Nl(e, 0)
          : (vo |= a),
        Tl === me && (Tl = 0)),
      ra(e));
  }
  function Gm(e, t) {
    (t === 0 && (t = Or()), (e = An(e, t)), e !== null && (Jl(e, t), ra(e)));
  }
  function Dp(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), Gm(e, a));
  }
  function Bp(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode,
          l = e.memoizedState;
        l !== null && (a = l.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      case 22:
        n = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (n !== null && n.delete(t), Gm(e, a));
  }
  function Lp(e, t) {
    return J(e, t);
  }
  var as = null,
    zl = null,
    Ao = !1,
    ns = !1,
    To = !1,
    en = 0;
  function ra(e) {
    (e !== zl && e.next === null && (zl === null ? (as = zl = e) : (zl = zl.next = e)),
      (ns = !0),
      Ao || ((Ao = !0), Up()));
  }
  function zc(e, t) {
    if (!To && ns) {
      To = !0;
      do
        for (var a = !1, n = as; n !== null; ) {
          if (e !== 0) {
            var l = n.pendingLanes;
            if (l === 0) var i = 0;
            else {
              var m = n.suspendedLanes,
                v = n.pingedLanes;
              ((i = (1 << (31 - Mt(42 | e) + 1)) - 1),
                (i &= l & ~(m & ~v)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((a = !0), Ym(n, i));
          } else
            ((i = me),
              (i = si(
                n,
                n === Re ? i : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (i & 3) === 0 || Kl(n, i) || ((a = !0), Ym(n, i)));
          n = n.next;
        }
      while (a);
      To = !1;
    }
  }
  function Hp() {
    Vm();
  }
  function Vm() {
    ns = Ao = !1;
    var e = 0;
    en !== 0 && Kp() && (e = en);
    for (var t = Et(), a = null, n = as; n !== null; ) {
      var l = n.next,
        i = $m(n, t);
      (i === 0
        ? ((n.next = null), a === null ? (as = l) : (a.next = l), l === null && (zl = a))
        : ((a = n), (e !== 0 || (i & 3) !== 0) && (ns = !0)),
        (n = l));
    }
    ((Ie !== 0 && Ie !== 5) || zc(e), en !== 0 && (en = 0));
  }
  function $m(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        l = e.expirationTimes,
        i = e.pendingLanes & -62914561;
      0 < i;
    ) {
      var m = 31 - Mt(i),
        v = 1 << m,
        b = l[m];
      (b === -1
        ? ((v & a) === 0 || (v & n) !== 0) && (l[m] = r1(v, t))
        : b <= t && (e.expiredLanes |= v),
        (i &= ~v));
    }
    if (
      ((t = Re),
      (a = me),
      (a = si(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (Ae === 2 || Ae === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && gn(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Kl(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && gn(n), qs(a))) {
        case 2:
        case 8:
          a = Rr;
          break;
        case 32:
          a = ni;
          break;
        case 268435456:
          a = wr;
          break;
        default:
          a = ni;
      }
      return (
        (n = km.bind(null, e)),
        (a = J(a, n)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      n !== null && n !== null && gn(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function km(e, t) {
    if (Ie !== 0 && Ie !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (ts() && e.callbackNode !== a) return null;
    var n = me;
    return (
      (n = si(e, e === Re ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Am(e, n, t),
          $m(e, Et()),
          e.callbackNode != null && e.callbackNode === a ? km.bind(null, e) : null)
    );
  }
  function Ym(e, t) {
    if (ts()) return null;
    Am(e, t, !0);
  }
  function Up() {
    Wp(function () {
      (xe & 6) !== 0 ? J(Cr, Hp) : Vm();
    });
  }
  function Eo() {
    if (en === 0) {
      var e = hl;
      (e === 0 && ((e = li), (li <<= 1), (li & 261888) === 0 && (li = 256)), (en = e));
    }
    return en;
  }
  function Zm(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : fi('' + e);
  }
  function Xm(e, t) {
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
  function qp(e, t, a, n, l) {
    if (t === 'submit' && a && a.stateNode === l) {
      var i = Zm((l[gt] || null).action),
        m = n.submitter;
      m &&
        ((t = (t = m[gt] || null) ? Zm(t.formAction) : m.getAttribute('formAction')),
        t !== null && ((i = t), (m = null)));
      var v = new pi('action', 'action', null, n, l);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (en !== 0) {
                  var b = m ? Xm(l, m) : new FormData(l);
                  Zu(a, { pending: !0, data: b, method: l.method, action: i }, null, b);
                }
              } else
                typeof i == 'function' &&
                  (v.preventDefault(),
                  (b = m ? Xm(l, m) : new FormData(l)),
                  Zu(a, { pending: !0, data: b, method: l.method, action: i }, i, b));
            },
            currentTarget: l,
          },
        ],
      });
    }
  }
  for (var No = 0; No < uu.length; No++) {
    var Mo = uu[No],
      Gp = Mo.toLowerCase(),
      Vp = Mo[0].toUpperCase() + Mo.slice(1);
    It(Gp, 'on' + Vp);
  }
  (It(jf, 'onAnimationEnd'),
    It(Af, 'onAnimationIteration'),
    It(Tf, 'onAnimationStart'),
    It('dblclick', 'onDoubleClick'),
    It('focusin', 'onFocus'),
    It('focusout', 'onBlur'),
    It(np, 'onTransitionRun'),
    It(lp, 'onTransitionStart'),
    It(cp, 'onTransitionCancel'),
    It(Ef, 'onTransitionEnd'),
    el('onMouseEnter', ['mouseout', 'mouseover']),
    el('onMouseLeave', ['mouseout', 'mouseover']),
    el('onPointerEnter', ['pointerout', 'pointerover']),
    el('onPointerLeave', ['pointerout', 'pointerover']),
    bn('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    bn(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    bn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    bn('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    bn(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    bn(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Cc =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    $p = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Cc)
    );
  function Qm(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var n = e[a],
        l = n.event;
      n = n.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var m = n.length - 1; 0 <= m; m--) {
            var v = n[m],
              b = v.instance,
              N = v.currentTarget;
            if (((v = v.listener), b !== i && l.isPropagationStopped())) break e;
            ((i = v), (l.currentTarget = N));
            try {
              i(l);
            } catch (O) {
              gi(O);
            }
            ((l.currentTarget = null), (i = b));
          }
        else
          for (m = 0; m < n.length; m++) {
            if (
              ((v = n[m]),
              (b = v.instance),
              (N = v.currentTarget),
              (v = v.listener),
              b !== i && l.isPropagationStopped())
            )
              break e;
            ((i = v), (l.currentTarget = N));
            try {
              i(l);
            } catch (O) {
              gi(O);
            }
            ((l.currentTarget = null), (i = b));
          }
      }
    }
  }
  function fe(e, t) {
    var a = t[Gs];
    a === void 0 && (a = t[Gs] = new Set());
    var n = e + '__bubble';
    a.has(n) || (Km(t, e, 2, !1), a.add(n));
  }
  function zo(e, t, a) {
    var n = 0;
    (t && (n |= 4), Km(a, e, n, t));
  }
  var ls = '_reactListening' + Math.random().toString(36).slice(2);
  function Co(e) {
    if (!e[ls]) {
      ((e[ls] = !0),
        Gr.forEach(function (a) {
          a !== 'selectionchange' && ($p.has(a) || zo(a, !1, e), zo(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ls] || ((t[ls] = !0), zo('selectionchange', !1, t));
    }
  }
  function Km(e, t, a, n) {
    switch (jh(t)) {
      case 2:
        var l = vv;
        break;
      case 8:
        l = yv;
        break;
      default:
        l = Zo;
    }
    ((a = l.bind(null, t, a, e)),
      (l = void 0),
      !Js || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (l = !0),
      n
        ? l !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: l })
          : e.addEventListener(t, a, !0)
        : l !== void 0
          ? e.addEventListener(t, a, { passive: l })
          : e.addEventListener(t, a, !1));
  }
  function Ro(e, t, a, n, l) {
    var i = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var m = n.tag;
        if (m === 3 || m === 4) {
          var v = n.stateNode.containerInfo;
          if (v === l) break;
          if (m === 4)
            for (m = n.return; m !== null; ) {
              var b = m.tag;
              if ((b === 3 || b === 4) && m.stateNode.containerInfo === l) return;
              m = m.return;
            }
          for (; v !== null; ) {
            if (((m = Fn(v)), m === null)) return;
            if (((b = m.tag), b === 5 || b === 6 || b === 26 || b === 27)) {
              n = i = m;
              continue e;
            }
            v = v.parentNode;
          }
        }
        n = n.return;
      }
    Ir(function () {
      var N = i,
        O = Qs(a),
        H = [];
      e: {
        var z = Nf.get(e);
        if (z !== void 0) {
          var C = pi,
            X = e;
          switch (e) {
            case 'keypress':
              if (mi(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              C = B1;
              break;
            case 'focusin':
              ((X = 'focus'), (C = Ps));
              break;
            case 'focusout':
              ((X = 'blur'), (C = Ps));
              break;
            case 'beforeblur':
            case 'afterblur':
              C = Ps;
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
              C = tf;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              C = j1;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              C = U1;
              break;
            case jf:
            case Af:
            case Tf:
              C = E1;
              break;
            case Ef:
              C = G1;
              break;
            case 'scroll':
            case 'scrollend':
              C = S1;
              break;
            case 'wheel':
              C = $1;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              C = M1;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              C = nf;
              break;
            case 'toggle':
            case 'beforetoggle':
              C = Y1;
          }
          var ee = (t & 4) !== 0,
            ze = !ee && (e === 'scroll' || e === 'scrollend'),
            A = ee ? (z !== null ? z + 'Capture' : null) : z;
          ee = [];
          for (var S = N, E; S !== null; ) {
            var B = S;
            if (
              ((E = B.stateNode),
              (B = B.tag),
              (B !== 5 && B !== 26 && B !== 27) ||
                E === null ||
                A === null ||
                ((B = Il(S, A)), B != null && ee.push(Rc(S, B, E))),
              ze)
            )
              break;
            S = S.return;
          }
          0 < ee.length && ((z = new C(z, X, null, a, O)), H.push({ event: z, listeners: ee }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((z = e === 'mouseover' || e === 'pointerover'),
            (C = e === 'mouseout' || e === 'pointerout'),
            z && a !== Xs && (X = a.relatedTarget || a.fromElement) && (Fn(X) || X[Wn]))
          )
            break e;
          if (
            (C || z) &&
            ((z =
              O.window === O
                ? O
                : (z = O.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            C
              ? ((X = a.relatedTarget || a.toElement),
                (C = N),
                (X = X ? Fn(X) : null),
                X !== null &&
                  ((ze = f(X)), (ee = X.tag), X !== ze || (ee !== 5 && ee !== 27 && ee !== 6)) &&
                  (X = null))
              : ((C = null), (X = N)),
            C !== X)
          ) {
            if (
              ((ee = tf),
              (B = 'onMouseLeave'),
              (A = 'onMouseEnter'),
              (S = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((ee = nf), (B = 'onPointerLeave'), (A = 'onPointerEnter'), (S = 'pointer')),
              (ze = C == null ? z : Fl(C)),
              (E = X == null ? z : Fl(X)),
              (z = new ee(B, S + 'leave', C, a, O)),
              (z.target = ze),
              (z.relatedTarget = E),
              (B = null),
              Fn(O) === N &&
                ((ee = new ee(A, S + 'enter', X, a, O)),
                (ee.target = E),
                (ee.relatedTarget = ze),
                (B = ee)),
              (ze = B),
              C && X)
            )
              t: {
                for (ee = kp, A = C, S = X, E = 0, B = A; B; B = ee(B)) E++;
                B = 0;
                for (var I = S; I; I = ee(I)) B++;
                for (; 0 < E - B; ) ((A = ee(A)), E--);
                for (; 0 < B - E; ) ((S = ee(S)), B--);
                for (; E--; ) {
                  if (A === S || (S !== null && A === S.alternate)) {
                    ee = A;
                    break t;
                  }
                  ((A = ee(A)), (S = ee(S)));
                }
                ee = null;
              }
            else ee = null;
            (C !== null && Jm(H, z, C, ee, !1), X !== null && ze !== null && Jm(H, ze, X, ee, !0));
          }
        }
        e: {
          if (
            ((z = N ? Fl(N) : window),
            (C = z.nodeName && z.nodeName.toLowerCase()),
            C === 'select' || (C === 'input' && z.type === 'file'))
          )
            var ge = df;
          else if (rf(z))
            if (mf) ge = ep;
            else {
              ge = I1;
              var Q = F1;
            }
          else
            ((C = z.nodeName),
              !C || C.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? N && Zs(N.elementType) && (ge = df)
                : (ge = P1));
          if (ge && (ge = ge(e, N))) {
            ff(H, ge, a, O);
            break e;
          }
          (Q && Q(e, z, N),
            e === 'focusout' &&
              N &&
              z.type === 'number' &&
              N.memoizedProps.value != null &&
              Ys(z, 'number', z.value));
        }
        switch (((Q = N ? Fl(N) : window), e)) {
          case 'focusin':
            (rf(Q) || Q.contentEditable === 'true') && ((il = Q), (cu = N), (ic = null));
            break;
          case 'focusout':
            ic = cu = il = null;
            break;
          case 'mousedown':
            iu = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((iu = !1), Sf(H, a, O));
            break;
          case 'selectionchange':
            if (ap) break;
          case 'keydown':
          case 'keyup':
            Sf(H, a, O);
        }
        var ue;
        if (tu)
          e: {
            switch (e) {
              case 'compositionstart':
                var he = 'onCompositionStart';
                break e;
              case 'compositionend':
                he = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                he = 'onCompositionUpdate';
                break e;
            }
            he = void 0;
          }
        else
          cl
            ? uf(e, a) && (he = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (he = 'onCompositionStart');
        (he &&
          (lf &&
            a.locale !== 'ko' &&
            (cl || he !== 'onCompositionStart'
              ? he === 'onCompositionEnd' && cl && (ue = Pr())
              : ((Ua = O), (Ws = 'value' in Ua ? Ua.value : Ua.textContent), (cl = !0))),
          (Q = cs(N, he)),
          0 < Q.length &&
            ((he = new af(he, e, null, a, O)),
            H.push({ event: he, listeners: Q }),
            ue ? (he.data = ue) : ((ue = of(a)), ue !== null && (he.data = ue)))),
          (ue = X1 ? Q1(e, a) : K1(e, a)) &&
            ((he = cs(N, 'onBeforeInput')),
            0 < he.length &&
              ((Q = new af('onBeforeInput', 'beforeinput', null, a, O)),
              H.push({ event: Q, listeners: he }),
              (Q.data = ue))),
          qp(H, e, N, a, O));
      }
      Qm(H, t);
    });
  }
  function Rc(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function cs(e, t) {
    for (var a = t + 'Capture', n = []; e !== null; ) {
      var l = e,
        i = l.stateNode;
      if (
        ((l = l.tag),
        (l !== 5 && l !== 26 && l !== 27) ||
          i === null ||
          ((l = Il(e, a)),
          l != null && n.unshift(Rc(e, l, i)),
          (l = Il(e, t)),
          l != null && n.push(Rc(e, l, i))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function kp(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Jm(e, t, a, n, l) {
    for (var i = t._reactName, m = []; a !== null && a !== n; ) {
      var v = a,
        b = v.alternate,
        N = v.stateNode;
      if (((v = v.tag), b !== null && b === n)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        N === null ||
        ((b = N),
        l
          ? ((N = Il(a, i)), N != null && m.unshift(Rc(a, N, b)))
          : l || ((N = Il(a, i)), N != null && m.push(Rc(a, N, b)))),
        (a = a.return));
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var Yp = /\r\n?/g,
    Zp = /\u0000|\uFFFD/g;
  function Wm(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Yp,
        `
`
      )
      .replace(Zp, '');
  }
  function Fm(e, t) {
    return ((t = Wm(t)), Wm(e) === t);
  }
  function Me(e, t, a, n, l, i) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || al(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && al(e, '' + n);
        break;
      case 'className':
        oi(e, 'class', n);
        break;
      case 'tabIndex':
        oi(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        oi(e, a, n);
        break;
      case 'style':
        Wr(e, n, i);
        break;
      case 'data':
        if (t !== 'object') {
          oi(e, 'data', n);
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
        ((n = fi('' + n)), e.setAttribute(a, n));
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
          typeof i == 'function' &&
            (a === 'formAction'
              ? (t !== 'input' && Me(e, t, 'name', l.name, l, null),
                Me(e, t, 'formEncType', l.formEncType, l, null),
                Me(e, t, 'formMethod', l.formMethod, l, null),
                Me(e, t, 'formTarget', l.formTarget, l, null))
              : (Me(e, t, 'encType', l.encType, l, null),
                Me(e, t, 'method', l.method, l, null),
                Me(e, t, 'target', l.target, l, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = fi('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = pa);
        break;
      case 'onScroll':
        n != null && fe('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && fe('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(o(61));
          if (((a = n.__html), a != null)) {
            if (l.children != null) throw Error(o(60));
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
        ((a = fi('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (fe('beforetoggle', e), fe('toggle', e), ui(e, 'popover', n));
        break;
      case 'xlinkActuate':
        ha(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        ha(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        ha(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        ha(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        ha(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        ha(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        ha(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        ha(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        ha(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        ui(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = _1.get(a) || a), ui(e, a, n));
    }
  }
  function wo(e, t, a, n, l, i) {
    switch (a) {
      case 'style':
        Wr(e, n, i);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(o(61));
          if (((a = n.__html), a != null)) {
            if (l.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? al(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && al(e, '' + n);
        break;
      case 'onScroll':
        n != null && fe('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && fe('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = pa);
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
        if (!Vr.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((l = a.endsWith('Capture')),
              (t = a.slice(2, l ? a.length - 7 : void 0)),
              (i = e[gt] || null),
              (i = i != null ? i[a] : null),
              typeof i == 'function' && e.removeEventListener(t, i, l),
              typeof n == 'function')
            ) {
              (typeof i != 'function' &&
                i !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, n, l));
              break e;
            }
            a in e ? (e[a] = n) : n === !0 ? e.setAttribute(a, '') : ui(e, a, n);
          }
    }
  }
  function rt(e, t, a) {
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
        (fe('error', e), fe('load', e));
        var n = !1,
          l = !1,
          i;
        for (i in a)
          if (a.hasOwnProperty(i)) {
            var m = a[i];
            if (m != null)
              switch (i) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  l = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(o(137, t));
                default:
                  Me(e, t, i, m, a, null);
              }
          }
        (l && Me(e, t, 'srcSet', a.srcSet, a, null), n && Me(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        fe('invalid', e);
        var v = (i = m = l = null),
          b = null,
          N = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var O = a[n];
            if (O != null)
              switch (n) {
                case 'name':
                  l = O;
                  break;
                case 'type':
                  m = O;
                  break;
                case 'checked':
                  b = O;
                  break;
                case 'defaultChecked':
                  N = O;
                  break;
                case 'value':
                  i = O;
                  break;
                case 'defaultValue':
                  v = O;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (O != null) throw Error(o(137, t));
                  break;
                default:
                  Me(e, t, n, O, a, null);
              }
          }
        Xr(e, i, v, b, N, m, l, !1);
        return;
      case 'select':
        (fe('invalid', e), (n = m = i = null));
        for (l in a)
          if (a.hasOwnProperty(l) && ((v = a[l]), v != null))
            switch (l) {
              case 'value':
                i = v;
                break;
              case 'defaultValue':
                m = v;
                break;
              case 'multiple':
                n = v;
              default:
                Me(e, t, l, v, a, null);
            }
        ((t = i),
          (a = m),
          (e.multiple = !!n),
          t != null ? tl(e, !!n, t, !1) : a != null && tl(e, !!n, a, !0));
        return;
      case 'textarea':
        (fe('invalid', e), (i = l = n = null));
        for (m in a)
          if (a.hasOwnProperty(m) && ((v = a[m]), v != null))
            switch (m) {
              case 'value':
                n = v;
                break;
              case 'defaultValue':
                l = v;
                break;
              case 'children':
                i = v;
                break;
              case 'dangerouslySetInnerHTML':
                if (v != null) throw Error(o(91));
                break;
              default:
                Me(e, t, m, v, a, null);
            }
        Kr(e, n, l, i);
        return;
      case 'option':
        for (b in a)
          if (a.hasOwnProperty(b) && ((n = a[b]), n != null))
            switch (b) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                Me(e, t, b, n, a, null);
            }
        return;
      case 'dialog':
        (fe('beforetoggle', e), fe('toggle', e), fe('cancel', e), fe('close', e));
        break;
      case 'iframe':
      case 'object':
        fe('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < Cc.length; n++) fe(Cc[n], e);
        break;
      case 'image':
        (fe('error', e), fe('load', e));
        break;
      case 'details':
        fe('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (fe('error', e), fe('load', e));
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
                throw Error(o(137, t));
              default:
                Me(e, t, N, n, a, null);
            }
        return;
      default:
        if (Zs(t)) {
          for (O in a)
            a.hasOwnProperty(O) && ((n = a[O]), n !== void 0 && wo(e, t, O, n, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((n = a[v]), n != null && Me(e, t, v, n, a, null));
  }
  function Xp(e, t, a, n) {
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
        var l = null,
          i = null,
          m = null,
          v = null,
          b = null,
          N = null,
          O = null;
        for (C in a) {
          var H = a[C];
          if (a.hasOwnProperty(C) && H != null)
            switch (C) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                b = H;
              default:
                n.hasOwnProperty(C) || Me(e, t, C, null, n, H);
            }
        }
        for (var z in n) {
          var C = n[z];
          if (((H = a[z]), n.hasOwnProperty(z) && (C != null || H != null)))
            switch (z) {
              case 'type':
                i = C;
                break;
              case 'name':
                l = C;
                break;
              case 'checked':
                N = C;
                break;
              case 'defaultChecked':
                O = C;
                break;
              case 'value':
                m = C;
                break;
              case 'defaultValue':
                v = C;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (C != null) throw Error(o(137, t));
                break;
              default:
                C !== H && Me(e, t, z, C, n, H);
            }
        }
        ks(e, m, v, b, N, O, i, l);
        return;
      case 'select':
        C = m = v = z = null;
        for (i in a)
          if (((b = a[i]), a.hasOwnProperty(i) && b != null))
            switch (i) {
              case 'value':
                break;
              case 'multiple':
                C = b;
              default:
                n.hasOwnProperty(i) || Me(e, t, i, null, n, b);
            }
        for (l in n)
          if (((i = n[l]), (b = a[l]), n.hasOwnProperty(l) && (i != null || b != null)))
            switch (l) {
              case 'value':
                z = i;
                break;
              case 'defaultValue':
                v = i;
                break;
              case 'multiple':
                m = i;
              default:
                i !== b && Me(e, t, l, i, n, b);
            }
        ((t = v),
          (a = m),
          (n = C),
          z != null
            ? tl(e, !!a, z, !1)
            : !!n != !!a && (t != null ? tl(e, !!a, t, !0) : tl(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        C = z = null;
        for (v in a)
          if (((l = a[v]), a.hasOwnProperty(v) && l != null && !n.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Me(e, t, v, null, n, l);
            }
        for (m in n)
          if (((l = n[m]), (i = a[m]), n.hasOwnProperty(m) && (l != null || i != null)))
            switch (m) {
              case 'value':
                z = l;
                break;
              case 'defaultValue':
                C = l;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (l != null) throw Error(o(91));
                break;
              default:
                l !== i && Me(e, t, m, l, n, i);
            }
        Qr(e, z, C);
        return;
      case 'option':
        for (var X in a)
          if (((z = a[X]), a.hasOwnProperty(X) && z != null && !n.hasOwnProperty(X)))
            switch (X) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                Me(e, t, X, null, n, z);
            }
        for (b in n)
          if (((z = n[b]), (C = a[b]), n.hasOwnProperty(b) && z !== C && (z != null || C != null)))
            switch (b) {
              case 'selected':
                e.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                Me(e, t, b, z, n, C);
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
        for (var ee in a)
          ((z = a[ee]),
            a.hasOwnProperty(ee) && z != null && !n.hasOwnProperty(ee) && Me(e, t, ee, null, n, z));
        for (N in n)
          if (((z = n[N]), (C = a[N]), n.hasOwnProperty(N) && z !== C && (z != null || C != null)))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(o(137, t));
                break;
              default:
                Me(e, t, N, z, n, C);
            }
        return;
      default:
        if (Zs(t)) {
          for (var ze in a)
            ((z = a[ze]),
              a.hasOwnProperty(ze) &&
                z !== void 0 &&
                !n.hasOwnProperty(ze) &&
                wo(e, t, ze, void 0, n, z));
          for (O in n)
            ((z = n[O]),
              (C = a[O]),
              !n.hasOwnProperty(O) ||
                z === C ||
                (z === void 0 && C === void 0) ||
                wo(e, t, O, z, n, C));
          return;
        }
    }
    for (var A in a)
      ((z = a[A]),
        a.hasOwnProperty(A) && z != null && !n.hasOwnProperty(A) && Me(e, t, A, null, n, z));
    for (H in n)
      ((z = n[H]),
        (C = a[H]),
        !n.hasOwnProperty(H) || z === C || (z == null && C == null) || Me(e, t, H, z, n, C));
  }
  function Im(e) {
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
  function Qp() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var l = a[n],
          i = l.transferSize,
          m = l.initiatorType,
          v = l.duration;
        if (i && v && Im(m)) {
          for (m = 0, v = l.responseEnd, n += 1; n < a.length; n++) {
            var b = a[n],
              N = b.startTime;
            if (N > v) break;
            var O = b.transferSize,
              H = b.initiatorType;
            O && Im(H) && ((b = b.responseEnd), (m += O * (b < v ? 1 : (v - N) / (b - N))));
          }
          if ((--n, (t += (8 * (i + m)) / (l.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var Oo = null,
    Do = null;
  function is(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Pm(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function eh(e, t) {
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
  function Bo(e, t) {
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
  var Lo = null;
  function Kp() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Lo ? !1 : ((Lo = e), !0)) : ((Lo = null), !1);
  }
  var th = typeof setTimeout == 'function' ? setTimeout : void 0,
    Jp = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    ah = typeof Promise == 'function' ? Promise : void 0,
    Wp =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof ah < 'u'
          ? function (e) {
              return ah.resolve(null).then(e).catch(Fp);
            }
          : th;
  function Fp(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function tn(e) {
    return e === 'head';
  }
  function nh(e, t) {
    var a = t,
      n = 0;
    do {
      var l = a.nextSibling;
      if ((e.removeChild(a), l && l.nodeType === 8))
        if (((a = l.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (e.removeChild(l), Ol(t));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') wc(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), wc(a));
          for (var i = a.firstChild; i; ) {
            var m = i.nextSibling,
              v = i.nodeName;
            (i[Wl] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(i),
              (i = m));
          }
        } else a === 'body' && wc(e.ownerDocument.body);
      a = l;
    } while (a);
    Ol(t);
  }
  function lh(e, t) {
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
  function Ho(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Ho(a), Vs(a));
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
  function Ip(e, t, a, n) {
    for (; e.nodeType === 1; ) {
      var l = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Wl])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((i = e.getAttribute('rel')),
                i === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                i !== l.rel ||
                e.getAttribute('href') !== (l.href == null || l.href === '' ? null : l.href) ||
                e.getAttribute('crossorigin') !== (l.crossOrigin == null ? null : l.crossOrigin) ||
                e.getAttribute('title') !== (l.title == null ? null : l.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((i = e.getAttribute('src')),
                (i !== (l.src == null ? null : l.src) ||
                  e.getAttribute('type') !== (l.type == null ? null : l.type) ||
                  e.getAttribute('crossorigin') !==
                    (l.crossOrigin == null ? null : l.crossOrigin)) &&
                  i &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var i = l.name == null ? null : '' + l.name;
        if (l.type === 'hidden' && e.getAttribute('name') === i) return e;
      } else return e;
      if (((e = Qt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Pp(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = Qt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function ch(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Qt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Uo(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function qo(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function ev(e, t) {
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
  function Qt(e) {
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
  var Go = null;
  function ih(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '/$' || a === '/&') {
          if (t === 0) return Qt(e.nextSibling);
          t--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function sh(e) {
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
  function uh(e, t, a) {
    switch (((t = is(a)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(o(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(o(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function wc(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Vs(e);
  }
  var Kt = new Map(),
    oh = new Set();
  function ss(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Ra = $.d;
  $.d = { f: tv, r: av, D: nv, C: lv, L: cv, m: iv, X: uv, S: sv, M: ov };
  function tv() {
    var e = Ra.f(),
      t = Ii();
    return e || t;
  }
  function av(e) {
    var t = In(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Ed(t) : Ra.r(e);
  }
  var Cl = typeof document > 'u' ? null : document;
  function rh(e, t, a) {
    var n = Cl;
    if (n && typeof t == 'string' && t) {
      var l = Gt(t);
      ((l = 'link[rel="' + e + '"][href="' + l + '"]'),
        typeof a == 'string' && (l += '[crossorigin="' + a + '"]'),
        oh.has(l) ||
          (oh.add(l),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(l) === null &&
            ((t = n.createElement('link')), rt(t, 'link', e), nt(t), n.head.appendChild(t))));
    }
  }
  function nv(e) {
    (Ra.D(e), rh('dns-prefetch', e, null));
  }
  function lv(e, t) {
    (Ra.C(e, t), rh('preconnect', e, t));
  }
  function cv(e, t, a) {
    Ra.L(e, t, a);
    var n = Cl;
    if (n && e && t) {
      var l = 'link[rel="preload"][as="' + Gt(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((l += '[imagesrcset="' + Gt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (l += '[imagesizes="' + Gt(a.imageSizes) + '"]'))
        : (l += '[href="' + Gt(e) + '"]');
      var i = l;
      switch (t) {
        case 'style':
          i = Rl(e);
          break;
        case 'script':
          i = wl(e);
      }
      Kt.has(i) ||
        ((e = j(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        Kt.set(i, e),
        n.querySelector(l) !== null ||
          (t === 'style' && n.querySelector(Oc(i))) ||
          (t === 'script' && n.querySelector(Dc(i))) ||
          ((t = n.createElement('link')), rt(t, 'link', e), nt(t), n.head.appendChild(t)));
    }
  }
  function iv(e, t) {
    Ra.m(e, t);
    var a = Cl;
    if (a && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        l = 'link[rel="modulepreload"][as="' + Gt(n) + '"][href="' + Gt(e) + '"]',
        i = l;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          i = wl(e);
      }
      if (
        !Kt.has(i) &&
        ((e = j({ rel: 'modulepreload', href: e }, t)), Kt.set(i, e), a.querySelector(l) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(Dc(i))) return;
        }
        ((n = a.createElement('link')), rt(n, 'link', e), nt(n), a.head.appendChild(n));
      }
    }
  }
  function sv(e, t, a) {
    Ra.S(e, t, a);
    var n = Cl;
    if (n && e) {
      var l = Pn(n).hoistableStyles,
        i = Rl(e);
      t = t || 'default';
      var m = l.get(i);
      if (!m) {
        var v = { loading: 0, preload: null };
        if ((m = n.querySelector(Oc(i)))) v.loading = 5;
        else {
          ((e = j({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Kt.get(i)) && Vo(e, a));
          var b = (m = n.createElement('link'));
          (nt(b),
            rt(b, 'link', e),
            (b._p = new Promise(function (N, O) {
              ((b.onload = N), (b.onerror = O));
            })),
            b.addEventListener('load', function () {
              v.loading |= 1;
            }),
            b.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            us(m, t, n));
        }
        ((m = { type: 'stylesheet', instance: m, count: 1, state: v }), l.set(i, m));
      }
    }
  }
  function uv(e, t) {
    Ra.X(e, t);
    var a = Cl;
    if (a && e) {
      var n = Pn(a).hoistableScripts,
        l = wl(e),
        i = n.get(l);
      i ||
        ((i = a.querySelector(Dc(l))),
        i ||
          ((e = j({ src: e, async: !0 }, t)),
          (t = Kt.get(l)) && $o(e, t),
          (i = a.createElement('script')),
          nt(i),
          rt(i, 'link', e),
          a.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        n.set(l, i));
    }
  }
  function ov(e, t) {
    Ra.M(e, t);
    var a = Cl;
    if (a && e) {
      var n = Pn(a).hoistableScripts,
        l = wl(e),
        i = n.get(l);
      i ||
        ((i = a.querySelector(Dc(l))),
        i ||
          ((e = j({ src: e, async: !0, type: 'module' }, t)),
          (t = Kt.get(l)) && $o(e, t),
          (i = a.createElement('script')),
          nt(i),
          rt(i, 'link', e),
          a.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        n.set(l, i));
    }
  }
  function fh(e, t, a, n) {
    var l = (l = se.current) ? ss(l) : null;
    if (!l) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = Rl(a.href)),
            (a = Pn(l).hoistableStyles),
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
          e = Rl(a.href);
          var i = Pn(l).hoistableStyles,
            m = i.get(e);
          if (
            (m ||
              ((l = l.ownerDocument || l),
              (m = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              i.set(e, m),
              (i = l.querySelector(Oc(e))) && !i._p && ((m.instance = i), (m.state.loading = 5)),
              Kt.has(e) ||
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
                Kt.set(e, a),
                i || rv(l, e, a, m.state))),
            t && n === null)
          )
            throw Error(o(528, ''));
          return m;
        }
        if (t && n !== null) throw Error(o(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = wl(a)),
              (a = Pn(l).hoistableScripts),
              (n = a.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Rl(e) {
    return 'href="' + Gt(e) + '"';
  }
  function Oc(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function dh(e) {
    return j({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function rv(e, t, a, n) {
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
        rt(t, 'link', a),
        nt(t),
        e.head.appendChild(t));
  }
  function wl(e) {
    return '[src="' + Gt(e) + '"]';
  }
  function Dc(e) {
    return 'script[async]' + e;
  }
  function mh(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + Gt(a.href) + '"]');
          if (n) return ((t.instance = n), nt(n), n);
          var l = j({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            nt(n),
            rt(n, 'style', l),
            us(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          l = Rl(a.href);
          var i = e.querySelector(Oc(l));
          if (i) return ((t.state.loading |= 4), (t.instance = i), nt(i), i);
          ((n = dh(a)),
            (l = Kt.get(l)) && Vo(n, l),
            (i = (e.ownerDocument || e).createElement('link')),
            nt(i));
          var m = i;
          return (
            (m._p = new Promise(function (v, b) {
              ((m.onload = v), (m.onerror = b));
            })),
            rt(i, 'link', n),
            (t.state.loading |= 4),
            us(i, a.precedence, e),
            (t.instance = i)
          );
        case 'script':
          return (
            (i = wl(a.src)),
            (l = e.querySelector(Dc(i)))
              ? ((t.instance = l), nt(l), l)
              : ((n = a),
                (l = Kt.get(i)) && ((n = j({}, a)), $o(n, l)),
                (e = e.ownerDocument || e),
                (l = e.createElement('script')),
                nt(l),
                rt(l, 'link', n),
                e.head.appendChild(l),
                (t.instance = l))
          );
        case 'void':
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((n = t.instance), (t.state.loading |= 4), us(n, a.precedence, e));
    return t.instance;
  }
  function us(e, t, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        l = n.length ? n[n.length - 1] : null,
        i = l,
        m = 0;
      m < n.length;
      m++
    ) {
      var v = n[m];
      if (v.dataset.precedence === t) i = v;
      else if (i !== l) break;
    }
    i
      ? i.parentNode.insertBefore(e, i.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function Vo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function $o(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var os = null;
  function hh(e, t, a) {
    if (os === null) {
      var n = new Map(),
        l = (os = new Map());
      l.set(a, n);
    } else ((l = os), (n = l.get(a)), n || ((n = new Map()), l.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), l = 0; l < a.length; l++) {
      var i = a[l];
      if (
        !(i[Wl] || i[it] || (e === 'link' && i.getAttribute('rel') === 'stylesheet')) &&
        i.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var m = i.getAttribute(t) || '';
        m = e + m;
        var v = n.get(m);
        v ? v.push(i) : n.set(m, [i]);
      }
    }
    return n;
  }
  function ph(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function fv(e, t, a) {
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
  function vh(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function dv(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var l = Rl(n.href),
          i = t.querySelector(Oc(l));
        if (i) {
          ((t = i._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = rs.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = i),
            nt(i));
          return;
        }
        ((i = t.ownerDocument || t),
          (n = dh(n)),
          (l = Kt.get(l)) && Vo(n, l),
          (i = i.createElement('link')),
          nt(i));
        var m = i;
        ((m._p = new Promise(function (v, b) {
          ((m.onload = v), (m.onerror = b));
        })),
          rt(i, 'link', n),
          (a.instance = i));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = rs.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var ko = 0;
  function mv(e, t) {
    return (
      e.stylesheets && e.count === 0 && ds(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && ds(e, e.stylesheets), e.unsuspend)) {
                var i = e.unsuspend;
                ((e.unsuspend = null), i());
              }
            }, 6e4 + t);
            0 < e.imgBytes && ko === 0 && (ko = 62500 * Qp());
            var l = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && ds(e, e.stylesheets), e.unsuspend))
                ) {
                  var i = e.unsuspend;
                  ((e.unsuspend = null), i());
                }
              },
              (e.imgBytes > ko ? 50 : 800) + t
            );
            return (
              (e.unsuspend = a),
              function () {
                ((e.unsuspend = null), clearTimeout(n), clearTimeout(l));
              }
            );
          }
        : null
    );
  }
  function rs() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) ds(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var fs = null;
  function ds(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (fs = new Map()), t.forEach(hv, e), (fs = null), rs.call(e)));
  }
  function hv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = fs.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), fs.set(e, a));
        for (
          var l = e.querySelectorAll('link[data-precedence],style[data-precedence]'), i = 0;
          i < l.length;
          i++
        ) {
          var m = l[i];
          (m.nodeName === 'LINK' || m.getAttribute('media') !== 'not all') &&
            (a.set(m.dataset.precedence, m), (n = m));
        }
        n && a.set(null, n);
      }
      ((l = t.instance),
        (m = l.getAttribute('data-precedence')),
        (i = a.get(m) || n),
        i === n && a.set(null, l),
        a.set(m, l),
        this.count++,
        (n = rs.bind(this)),
        l.addEventListener('load', n),
        l.addEventListener('error', n),
        i
          ? i.parentNode.insertBefore(l, i.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(l, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Bc = {
    $$typeof: oe,
    Provider: null,
    Consumer: null,
    _currentValue: P,
    _currentValue2: P,
    _threadCount: 0,
  };
  function pv(e, t, a, n, l, i, m, v, b) {
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
      (this.expirationTimes = Hs(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Hs(0)),
      (this.hiddenUpdates = Hs(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = l),
      (this.onCaughtError = i),
      (this.onRecoverableError = m),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = b),
      (this.incompleteTransitions = new Map()));
  }
  function yh(e, t, a, n, l, i, m, v, b, N, O, H) {
    return (
      (e = new pv(e, t, a, m, b, N, O, H, v)),
      (t = 1),
      i === !0 && (t |= 24),
      (i = Ct(3, null, null, t)),
      (e.current = i),
      (i.stateNode = e),
      (t = Su()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (i.memoizedState = { element: n, isDehydrated: a, cache: t }),
      Tu(i),
      e
    );
  }
  function gh(e) {
    return e ? ((e = ol), e) : ol;
  }
  function _h(e, t, a, n, l, i) {
    ((l = gh(l)),
      n.context === null ? (n.context = l) : (n.pendingContext = l),
      (n = Ya(t)),
      (n.payload = { element: a }),
      (i = i === void 0 ? null : i),
      i !== null && (n.callback = i),
      (a = Za(e, n, t)),
      a !== null && (At(a, e, t), mc(a, e, t)));
  }
  function bh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Yo(e, t) {
    (bh(e, t), (e = e.alternate) && bh(e, t));
  }
  function Sh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = An(e, 67108864);
      (t !== null && At(t, e, 67108864), Yo(e, 67108864));
    }
  }
  function xh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Bt();
      t = Us(t);
      var a = An(e, t);
      (a !== null && At(a, e, t), Yo(e, t));
    }
  }
  var ms = !0;
  function vv(e, t, a, n) {
    var l = w.T;
    w.T = null;
    var i = $.p;
    try {
      (($.p = 2), Zo(e, t, a, n));
    } finally {
      (($.p = i), (w.T = l));
    }
  }
  function yv(e, t, a, n) {
    var l = w.T;
    w.T = null;
    var i = $.p;
    try {
      (($.p = 8), Zo(e, t, a, n));
    } finally {
      (($.p = i), (w.T = l));
    }
  }
  function Zo(e, t, a, n) {
    if (ms) {
      var l = Xo(n);
      if (l === null) (Ro(e, t, n, hs, a), Ah(e, n));
      else if (_v(l, e, t, a, n)) n.stopPropagation();
      else if ((Ah(e, n), t & 4 && -1 < gv.indexOf(e))) {
        for (; l !== null; ) {
          var i = In(l);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var m = _n(i.pendingLanes);
                  if (m !== 0) {
                    var v = i;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; m; ) {
                      var b = 1 << (31 - Mt(m));
                      ((v.entanglements[1] |= b), (m &= ~b));
                    }
                    (ra(i), (xe & 6) === 0 && ((Wi = Et() + 500), zc(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = An(i, 2)), v !== null && At(v, i, 2), Ii(), Yo(i, 2));
            }
          if (((i = Xo(n)), i === null && Ro(e, t, n, hs, a), i === l)) break;
          l = i;
        }
        l !== null && n.stopPropagation();
      } else Ro(e, t, n, null, a);
    }
  }
  function Xo(e) {
    return ((e = Qs(e)), Qo(e));
  }
  var hs = null;
  function Qo(e) {
    if (((hs = null), (e = Fn(e)), e !== null)) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = h(t)), e !== null)) return e;
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
    return ((hs = e), null);
  }
  function jh(e) {
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
        switch (n1()) {
          case Cr:
            return 2;
          case Rr:
            return 8;
          case ni:
          case l1:
            return 32;
          case wr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ko = !1,
    an = null,
    nn = null,
    ln = null,
    Lc = new Map(),
    Hc = new Map(),
    cn = [],
    gv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Ah(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        an = null;
        break;
      case 'dragenter':
      case 'dragleave':
        nn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        ln = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Lc.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Hc.delete(t.pointerId);
    }
  }
  function Uc(e, t, a, n, l, i) {
    return e === null || e.nativeEvent !== i
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: i,
          targetContainers: [l],
        }),
        t !== null && ((t = In(t)), t !== null && Sh(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e);
  }
  function _v(e, t, a, n, l) {
    switch (t) {
      case 'focusin':
        return ((an = Uc(an, e, t, a, n, l)), !0);
      case 'dragenter':
        return ((nn = Uc(nn, e, t, a, n, l)), !0);
      case 'mouseover':
        return ((ln = Uc(ln, e, t, a, n, l)), !0);
      case 'pointerover':
        var i = l.pointerId;
        return (Lc.set(i, Uc(Lc.get(i) || null, e, t, a, n, l)), !0);
      case 'gotpointercapture':
        return ((i = l.pointerId), Hc.set(i, Uc(Hc.get(i) || null, e, t, a, n, l)), !0);
    }
    return !1;
  }
  function Th(e) {
    var t = Fn(e.target);
    if (t !== null) {
      var a = f(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = h(a)), t !== null)) {
            ((e.blockedOn = t),
              Ur(e.priority, function () {
                xh(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = p(a)), t !== null)) {
            ((e.blockedOn = t),
              Ur(e.priority, function () {
                xh(a);
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
  function ps(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Xo(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((Xs = n), a.target.dispatchEvent(n), (Xs = null));
      } else return ((t = In(a)), t !== null && Sh(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function Eh(e, t, a) {
    ps(e) && a.delete(t);
  }
  function bv() {
    ((Ko = !1),
      an !== null && ps(an) && (an = null),
      nn !== null && ps(nn) && (nn = null),
      ln !== null && ps(ln) && (ln = null),
      Lc.forEach(Eh),
      Hc.forEach(Eh));
  }
  function vs(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ko || ((Ko = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, bv)));
  }
  var ys = null;
  function Nh(e) {
    ys !== e &&
      ((ys = e),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        ys === e && (ys = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            l = e[t + 2];
          if (typeof n != 'function') {
            if (Qo(n || a) === null) continue;
            break;
          }
          var i = In(a);
          i !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Zu(i, { pending: !0, data: l, method: a.method, action: n }, n, l));
        }
      }));
  }
  function Ol(e) {
    function t(b) {
      return vs(b, e);
    }
    (an !== null && vs(an, e),
      nn !== null && vs(nn, e),
      ln !== null && vs(ln, e),
      Lc.forEach(t),
      Hc.forEach(t));
    for (var a = 0; a < cn.length; a++) {
      var n = cn[a];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < cn.length && ((a = cn[0]), a.blockedOn === null); )
      (Th(a), a.blockedOn === null && cn.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var l = a[n],
          i = a[n + 1],
          m = l[gt] || null;
        if (typeof i == 'function') m || Nh(a);
        else if (m) {
          var v = null;
          if (i && i.hasAttribute('formAction')) {
            if (((l = i), (m = i[gt] || null))) v = m.formAction;
            else if (Qo(l) !== null) continue;
          } else v = m.action;
          (typeof v == 'function' ? (a[n + 1] = v) : (a.splice(n, 3), (n -= 3)), Nh(a));
        }
      }
  }
  function Mh() {
    function e(i) {
      i.canIntercept &&
        i.info === 'react-transition' &&
        i.intercept({
          handler: function () {
            return new Promise(function (m) {
              return (l = m);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (l !== null && (l(), (l = null)), n || setTimeout(a, 20));
    }
    function a() {
      if (!n && !navigation.transition) {
        var i = navigation.currentEntry;
        i &&
          i.url != null &&
          navigation.navigate(i.url, {
            state: i.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var n = !1,
        l = null;
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
            l !== null && (l(), (l = null)));
        }
      );
    }
  }
  function Jo(e) {
    this._internalRoot = e;
  }
  ((gs.prototype.render = Jo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var a = t.current,
        n = Bt();
      _h(a, n, e, t, null, null);
    }),
    (gs.prototype.unmount = Jo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (_h(e.current, 2, null, e, null, null), Ii(), (t[Wn] = null));
        }
      }));
  function gs(e) {
    this._internalRoot = e;
  }
  gs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Hr();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < cn.length && t !== 0 && t < cn[a].priority; a++);
      (cn.splice(a, 0, e), a === 0 && Th(e));
    }
  };
  var zh = s.version;
  if (zh !== '19.2.5') throw Error(o(527, zh, '19.2.5'));
  $.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return ((e = g(t)), (e = e !== null ? _(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var Sv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: w,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var _s = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!_s.isDisabled && _s.supportsFiber)
      try {
        ((Ql = _s.inject(Sv)), (Nt = _s));
      } catch {}
  }
  return (
    (Gc.createRoot = function (e, t) {
      if (!d(e)) throw Error(o(299));
      var a = !1,
        n = '',
        l = Ld,
        i = Hd,
        m = Ud;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (l = t.onUncaughtError),
          t.onCaughtError !== void 0 && (i = t.onCaughtError),
          t.onRecoverableError !== void 0 && (m = t.onRecoverableError)),
        (t = yh(e, 1, !1, null, null, a, n, null, l, i, m, Mh)),
        (e[Wn] = t.current),
        Co(e),
        new Jo(t)
      );
    }),
    (Gc.hydrateRoot = function (e, t, a) {
      if (!d(e)) throw Error(o(299));
      var n = !1,
        l = '',
        i = Ld,
        m = Hd,
        v = Ud,
        b = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (l = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (i = a.onUncaughtError),
          a.onCaughtError !== void 0 && (m = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (b = a.formState)),
        (t = yh(e, 1, !0, t, a ?? null, n, l, b, i, m, v, Mh)),
        (t.context = gh(null)),
        (a = t.current),
        (n = Bt()),
        (n = Us(n)),
        (l = Ya(n)),
        (l.callback = null),
        Za(a, l, n),
        (a = n),
        (t.current.lanes = a),
        Jl(t, a),
        ra(t),
        (e[Wn] = t.current),
        Co(e),
        new gs(t)
      );
    }),
    (Gc.version = '19.2.5'),
    Gc
  );
}
var qh;
function Dv() {
  if (qh) return Fo.exports;
  qh = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (s) {
        console.error(s);
      }
  }
  return (c(), (Fo.exports = Ov()), Fo.exports);
}
var Bv = Dv(),
  te = br();
const bs = Tv(te),
  Lv = '_content_11wqi_1',
  Hv = { content: Lv },
  Uv = '_tabBar_rhd8d_2',
  qv = '_fullWidth_rhd8d_9',
  Gv = '_tab_rhd8d_2',
  Vv = '_tabActive_rhd8d_54',
  $v = '_tabDisabled_rhd8d_101',
  kv = '_tabIcon_rhd8d_107',
  Yv = '_tabLabel_rhd8d_114',
  Zv = '_badge_rhd8d_119',
  Xv = '_badgeActive_rhd8d_137',
  Qv = '_indicator_rhd8d_158',
  Lt = {
    tabBar: Uv,
    fullWidth: qv,
    tab: Gv,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: Vv,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: $v,
    tabIcon: kv,
    tabLabel: Yv,
    badge: Zv,
    badgeActive: Xv,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Qv,
  },
  Kv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Jv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Wv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Fv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Iv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Pv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  ey = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  ty = { screw: Pv, bolt: Jv, alloy: Kv, laser: Iv, cannon: Wv, thunder: ey, cutter: Fv };
function ay(c, s) {
  return c.replace(/\swidth="\d+"/, ` width="${s}"`).replace(/\sheight="\d+"/, ` height="${s}"`);
}
function Oe({ name: c, size: s = 16, color: u = 'currentColor', className: o }) {
  const d = ty[c];
  if (d)
    return r.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: u, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: ay(d, s) },
    });
  const f = {
    width: s,
    height: s,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: u,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    xmlns: 'http://www.w3.org/2000/svg',
    className: o,
    'aria-hidden': !0,
  };
  switch (c) {
    case 'close':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('line', { x1: '4', y1: '4', x2: '20', y2: '20' }),
          r.jsx('line', { x1: '20', y1: '4', x2: '4', y2: '20' }),
        ],
      });
    case 'menu':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('line', { x1: '3', y1: '7', x2: '21', y2: '7' }),
          r.jsx('line', { x1: '3', y1: '12', x2: '21', y2: '12' }),
          r.jsx('line', { x1: '3', y1: '17', x2: '21', y2: '17' }),
        ],
      });
    case 'settings':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('polygon', {
            points: '12,3 16,5 19,8 21,12 19,16 16,19 12,21 8,19 5,16 3,12 5,8 8,5',
            fill: u,
            fillOpacity: '0.15',
            stroke: u,
          }),
          r.jsx('circle', { cx: '12', cy: '12', r: '3.2' }),
        ],
      });
    case 'tower':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('polygon', {
          points: '12,4 20,20 4,20',
          fill: u,
          stroke: u,
          strokeLinejoin: 'round',
        }),
      });
    case 'shield':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('path', {
          d: 'M12 3 L20 6.5 V12 C20 16.5 16.5 19.5 12 21 C7.5 19.5 4 16.5 4 12 V6.5 Z',
        }),
      });
    case 'heart':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('path', {
          d: 'M12 21 C12 21 4 14.5 4 9 C4 6.2 6.2 4 9 4 C10.4 4 11.7 4.6 12 5.5 C12.3 4.6 13.6 4 15 4 C17.8 4 20 6.2 20 9 C20 14.5 12 21 12 21Z',
        }),
      });
    case 'flame':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('path', {
            d: 'M12 2C12 2 7 8 7 13C7 15.8 9.2 18 12 18C14.8 18 17 15.8 17 13C17 8 12 2 12 2Z',
          }),
          r.jsx('path', {
            d: 'M12 12C12 12 10 14 10 15.5C10 16.3 10.9 17 12 17C13.1 17 14 16.3 14 15.5C14 14 12 12 12 12Z',
            fill: u,
            stroke: 'none',
          }),
        ],
      });
    case 'ice':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('line', { x1: '12', y1: '3', x2: '12', y2: '21' }),
          r.jsx('line', { x1: '3', y1: '7.5', x2: '21', y2: '16.5' }),
          r.jsx('line', { x1: '3', y1: '16.5', x2: '21', y2: '7.5' }),
          r.jsx('line', { x1: '9', y1: '3.5', x2: '12', y2: '8' }),
          r.jsx('line', { x1: '15', y1: '3.5', x2: '12', y2: '8' }),
          r.jsx('line', { x1: '9', y1: '20.5', x2: '12', y2: '16' }),
          r.jsx('line', { x1: '15', y1: '20.5', x2: '12', y2: '16' }),
        ],
      });
    case 'lightning':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('polygon', {
          points: '13,3 6,13 11,13 11,21 18,11 13,11',
          fill: u,
          stroke: 'none',
        }),
      });
    case 'skull':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('circle', { cx: '12', cy: '10', r: '7' }),
          r.jsx('circle', { cx: '9.5', cy: '9.5', r: '1.5', fill: u, stroke: 'none' }),
          r.jsx('circle', { cx: '14.5', cy: '9.5', r: '1.5', fill: u, stroke: 'none' }),
          r.jsx('path', { d: 'M8 16 V21 M12 16 V21 M16 16 V21', strokeWidth: '2.5' }),
          r.jsx('rect', { x: '7', y: '16', width: '10', height: '1.5', fill: u, stroke: 'none' }),
        ],
      });
    case 'spark':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('polygon', {
          points: '12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10',
          fill: u,
          stroke: 'none',
        }),
      });
    case 'target':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('circle', { cx: '12', cy: '12', r: '9' }),
          r.jsx('circle', { cx: '12', cy: '12', r: '5' }),
          r.jsx('circle', { cx: '12', cy: '12', r: '1.5', fill: u, stroke: 'none' }),
          r.jsx('line', { x1: '12', y1: '3', x2: '12', y2: '6' }),
          r.jsx('line', { x1: '12', y1: '18', x2: '12', y2: '21' }),
          r.jsx('line', { x1: '3', y1: '12', x2: '6', y2: '12' }),
          r.jsx('line', { x1: '18', y1: '12', x2: '21', y2: '12' }),
        ],
      });
    case 'play':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('polygon', { points: '6,4 20,12 6,20', fill: u, stroke: 'none' }),
      });
    case 'pause':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('rect', { x: '5', y: '4', width: '5', height: '16', fill: u, stroke: 'none' }),
          r.jsx('rect', { x: '14', y: '4', width: '5', height: '16', fill: u, stroke: 'none' }),
        ],
      });
    case 'chevron-left':
      return r.jsx('svg', { ...f, children: r.jsx('polyline', { points: '15,5 9,12 15,19' }) });
    case 'chevron-right':
      return r.jsx('svg', { ...f, children: r.jsx('polyline', { points: '9,5 15,12 9,19' }) });
    case 'chevron-up':
      return r.jsx('svg', { ...f, children: r.jsx('polyline', { points: '5,15 12,9 19,15' }) });
    case 'chevron-down':
      return r.jsx('svg', { ...f, children: r.jsx('polyline', { points: '5,9 12,15 19,9' }) });
    case 'check':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('polyline', { points: '4,12 9,17 20,6', strokeWidth: '2.5' }),
      });
    case 'plus':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('line', { x1: '12', y1: '4', x2: '12', y2: '20', strokeWidth: '2.5' }),
          r.jsx('line', { x1: '4', y1: '12', x2: '20', y2: '12', strokeWidth: '2.5' }),
        ],
      });
    case 'minus':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('line', { x1: '4', y1: '12', x2: '20', y2: '12', strokeWidth: '2.5' }),
      });
    case 'info':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('circle', { cx: '12', cy: '12', r: '9' }),
          r.jsx('line', {
            x1: '12',
            y1: '8',
            x2: '12',
            y2: '8',
            strokeWidth: '2.5',
            strokeLinecap: 'round',
          }),
          r.jsx('line', { x1: '12', y1: '11', x2: '12', y2: '17', strokeWidth: '2' }),
        ],
      });
    case 'arrow-up':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('line', { x1: '12', y1: '19', x2: '12', y2: '5', strokeWidth: '2' }),
          r.jsx('polyline', { points: '6,11 12,5 18,11', strokeWidth: '2' }),
        ],
      });
    default:
      return null;
  }
}
function Ms({
  tabs: c,
  value: s,
  onChange: u,
  variant: o = 'underline',
  size: d = 'md',
  fullWidth: f = !1,
  align: h = 'start',
}) {
  const p = te.useRef(null),
    [y, g] = te.useState({ left: 0, width: 0 });
  return (
    te.useEffect(() => {
      const _ = p.current;
      if (!_) return;
      const j = c.findIndex((q) => q.key === s);
      if (j < 0) return;
      const M = _.querySelectorAll('[role="tab"]')[j];
      if (!M) return;
      const R = _.getBoundingClientRect(),
        U = M.getBoundingClientRect();
      g({ left: U.left - R.left, width: U.width });
    }, [s, c]),
    r.jsxs('div', {
      ref: p,
      role: 'tablist',
      className: [
        Lt.tabBar,
        Lt[`variant-${o}`],
        Lt[`size-${d}`],
        Lt[`align-${h}`],
        f ? Lt.fullWidth : '',
      ]
        .filter(Boolean)
        .join(' '),
      children: [
        c.map((_) => {
          const j = _.key === s;
          return r.jsxs(
            'button',
            {
              type: 'button',
              role: 'tab',
              'aria-selected': j,
              disabled: _.disabled === !0,
              className: [Lt.tab, j ? Lt.tabActive : '', _.disabled === !0 ? Lt.tabDisabled : '']
                .filter(Boolean)
                .join(' '),
              onClick: () => {
                _.disabled !== !0 && u(_.key);
              },
              children: [
                _.iconName != null &&
                  r.jsx('span', {
                    className: Lt.tabIcon,
                    'aria-hidden': 'true',
                    children: r.jsx(Oe, { name: _.iconName, size: d === 'sm' ? 12 : 14 }),
                  }),
                r.jsx('span', { className: Lt.tabLabel, children: _.label }),
                _.badge != null &&
                  r.jsx('span', {
                    className: [Lt.badge, j ? Lt.badgeActive : ''].filter(Boolean).join(' '),
                    children: _.badge,
                  }),
              ],
            },
            _.key
          );
        }),
        o === 'underline' &&
          r.jsx('span', {
            className: Lt.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${y.left}px)`, width: y.width },
          }),
      ],
    })
  );
}
const ny = '_shell_ka520_6',
  ly = '_header_ka520_19',
  cy = '_main_ka520_32',
  iy = '_noScroll_ka520_43',
  sy = '_footer_ka520_48',
  uy = '_battle_ka520_61',
  Dl = { shell: ny, header: ly, main: cy, noScroll: iy, footer: sy, battle: uy };
function Qn({ header: c, footer: s, children: u, noScroll: o = !1, variant: d = 'default' }) {
  return r.jsxs('div', {
    className: [Dl.shell, d === 'battle' ? Dl.battle : ''].filter(Boolean).join(' '),
    children: [
      c != null && r.jsx('header', { className: Dl.header, children: c }),
      r.jsx('main', {
        className: [Dl.main, o ? Dl.noScroll : ''].filter(Boolean).join(' '),
        children: u,
      }),
      s != null && r.jsx('footer', { className: Dl.footer, children: s }),
    ],
  });
}
const oy = '_nav_4erx0_2',
  ry = '_tab_4erx0_10',
  fy = '_active_4erx0_33',
  dy = '_iconWrap_4erx0_38',
  my = '_badge_4erx0_51',
  Vc = { nav: oy, tab: ry, active: fy, iconWrap: dy, badge: my },
  hy = '_text_1wy1n_1',
  py = '_variant_heading_1_1wy1n_6',
  vy = '_variant_heading_2_1wy1n_15',
  yy = '_variant_heading_3_1wy1n_24',
  gy = '_variant_body_1wy1n_33',
  _y = '_variant_caption_1wy1n_41',
  by = '_variant_label_1wy1n_49',
  Sy = '_variant_numeric_l_1wy1n_58',
  xy = '_variant_numeric_m_1wy1n_67',
  jy = '_variant_numeric_s_1wy1n_76',
  Ay = '_color_default_1wy1n_85',
  Ty = '_color_mid_1wy1n_89',
  Ey = '_color_dim_1wy1n_93',
  Ny = '_color_disabled_1wy1n_97',
  My = '_color_primary_1wy1n_101',
  zy = '_color_secondary_1wy1n_105',
  Cy = '_color_danger_1wy1n_109',
  Ry = '_color_success_1wy1n_113',
  wy = '_color_warning_1wy1n_117',
  Oy = '_truncate_1wy1n_121',
  Dy = '_align_left_1wy1n_128',
  By = '_align_center_1wy1n_132',
  Ly = '_align_right_1wy1n_136',
  $c = {
    text: hy,
    variant_heading_1: py,
    variant_heading_2: vy,
    variant_heading_3: yy,
    variant_body: gy,
    variant_caption: _y,
    variant_label: by,
    variant_numeric_l: Sy,
    variant_numeric_m: xy,
    variant_numeric_s: jy,
    color_default: Ay,
    color_mid: Ty,
    color_dim: Ey,
    color_disabled: Ny,
    color_primary: My,
    color_secondary: zy,
    color_danger: Cy,
    color_success: Ry,
    color_warning: wy,
    truncate: Oy,
    align_left: Dy,
    align_center: By,
    align_right: Ly,
  };
function Hy(c) {
  switch (c) {
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
function G({
  variant: c = 'body',
  children: s,
  as: u,
  color: o = 'default',
  className: d,
  truncate: f,
  align: h,
  style: p,
}) {
  const y = u ?? Hy(c),
    g = c.replace(/-/g, '_'),
    _ = o === 'text' ? 'default' : o;
  return r.jsx(y, {
    className: [
      $c.text,
      $c[`variant_${g}`],
      $c[`color_${_}`],
      f ? $c.truncate : '',
      h ? $c[`align_${h}`] : '',
      d,
    ]
      .filter(Boolean)
      .join(' '),
    style: p,
    children: s,
  });
}
const Uy = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function ei({ active: c, onChange: s, badges: u }) {
  return r.jsx('nav', {
    className: Vc.nav,
    'aria-label': 'メインナビゲーション',
    children: Uy.map(({ key: o, label: d, iconName: f }) => {
      const h = o === c,
        p = u == null ? void 0 : u[o];
      return r.jsxs(
        'button',
        {
          type: 'button',
          className: [Vc.tab, h ? Vc.active : ''].filter(Boolean).join(' '),
          onClick: () => s(o),
          'aria-current': h ? 'page' : void 0,
          'aria-label': d,
          children: [
            r.jsxs('span', {
              className: Vc.iconWrap,
              children: [
                r.jsx(Oe, {
                  name: f,
                  size: 22,
                  color: h ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                p != null &&
                  r.jsx('span', { className: Vc.badge, 'aria-hidden': 'true', children: p }),
              ],
            }),
            r.jsx(G, { variant: 'caption', color: h ? 'primary' : 'dim', children: d }),
          ],
        },
        o
      );
    }),
  });
}
const qy = '_root_kv5uk_2',
  Gy = '_titleRow_kv5uk_8',
  Vy = '_left_kv5uk_17',
  $y = '_center_kv5uk_24',
  ky = '_right_kv5uk_33',
  Yy = '_currencies_kv5uk_42',
  Zy = '_actions_kv5uk_49',
  Xy = '_tabBarSlot_kv5uk_56',
  un = {
    root: qy,
    titleRow: Gy,
    left: Vy,
    center: $y,
    right: ky,
    currencies: Yy,
    actions: Zy,
    tabBarSlot: Xy,
  },
  Qy = '_root_i843c_2',
  Ky = '_icon_i843c_10',
  Jy = '_delta_i843c_30',
  Wy = '_deltaSm_i843c_37',
  Fy = '_deltaMd_i843c_41',
  Iy = '_deltaLg_i843c_45',
  Py = '_subtle_i843c_50',
  eg = '_currencyLabel_i843c_55',
  tg = '_rankStamp_i843c_64',
  fa = {
    root: Qy,
    icon: Ky,
    delta: Jy,
    deltaSm: Wy,
    deltaMd: Fy,
    deltaLg: Iy,
    subtle: Py,
    currencyLabel: eg,
    rankStamp: tg,
  },
  ag = '_root_1wxcz_1',
  ng = '_sizeSm_1wxcz_13',
  lg = '_sizeMd_1wxcz_17',
  cg = '_sizeLg_1wxcz_21',
  ig = '_sizeXl_1wxcz_25',
  sg = '_affix_1wxcz_29',
  Hn = { root: ag, sizeSm: ng, sizeMd: lg, sizeLg: cg, sizeXl: ig, affix: sg };
function fr(c) {
  let s = c.length;
  for (; s > 0 && c[s - 1] === 0; ) s--;
  return c.slice(0, s);
}
function kc(c) {
  let s = 0;
  for (let u = 0; u < c.length; u++) {
    const o = Math.floor(c[u] + s);
    ((c[u] = o % 1e3), (s = Math.floor(o / 1e3)));
  }
  for (; s > 0; ) (c.push(s % 1e3), (s = Math.floor(s / 1e3)));
  return fr(c);
}
function ug(c, s) {
  for (; s !== 0; ) {
    const u = s;
    ((s = c % s), (c = u));
  }
  return c;
}
function og(c) {
  const s = c.toString(),
    u = s.indexOf('.');
  if (u === -1) return { num: Math.round(c), den: 1 };
  const o = s.length - u - 1,
    d = Math.pow(10, o),
    f = Math.round(c * d),
    h = ug(Math.abs(f), d);
  return { num: f / h, den: d / h };
}
function rg(c) {
  let s = '',
    u = c;
  for (; u > 0; )
    ((u -= 1), (s = String.fromCharCode(65 + (u % 26)) + s), (u = Math.floor(u / 26)));
  return s;
}
const vt = class vt {
  constructor(s) {
    ta(this, 'digits');
    this.digits = s;
  }
  static fromNumber(s) {
    if (s <= 0) return vt.ZERO;
    const u = [];
    let o = Math.floor(s);
    for (; o > 0; ) (u.push(o % 1e3), (o = Math.floor(o / 1e3)));
    return new vt(fr(u));
  }
  static fromString(s) {
    const u = s.trim();
    if (u === '' || u === '0') return vt.ZERO;
    const o = [];
    let d = u.length;
    for (; d > 0; ) {
      const f = Math.max(0, d - 3);
      (o.push(parseInt(u.slice(f, d), 10)), (d = f));
    }
    return new vt(fr(o));
  }
  static fromJSON(s) {
    return new vt(kc([...s]));
  }
  add(s) {
    const u = this.digits,
      o = s.digits,
      d = Math.max(u.length, o.length),
      f = new Array(d).fill(0);
    let h = 0;
    for (let p = 0; p < d; p++) {
      const y = (u[p] ?? 0) + (o[p] ?? 0) + h;
      ((f[p] = y % 1e3), (h = Math.floor(y / 1e3)));
    }
    return (h > 0 && f.push(h), new vt(kc(f)));
  }
  sub(s) {
    if (this.compare(s) <= 0) return vt.ZERO;
    const u = this.digits,
      o = s.digits,
      d = new Array(u.length).fill(0);
    let f = 0;
    for (let h = 0; h < u.length; h++) {
      let p = (u[h] ?? 0) - (o[h] ?? 0) - f;
      (p < 0 ? ((p += 1e3), (f = 1)) : (f = 0), (d[h] = p));
    }
    return new vt(kc(d));
  }
  mulInt(s) {
    if (s <= 0 || this.isZero()) return vt.ZERO;
    const u = this.digits,
      o = new Array(u.length).fill(0);
    let d = 0;
    for (let f = 0; f < u.length; f++) {
      const h = u[f] * s + d;
      ((o[f] = h % 1e3), (d = Math.floor(h / 1e3)));
    }
    for (; d > 0; ) (o.push(d % 1e3), (d = Math.floor(d / 1e3)));
    return new vt(kc(o));
  }
  divInt(s) {
    if (s <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return vt.ZERO;
    const u = this.digits,
      o = new Array(u.length).fill(0);
    let d = 0;
    for (let f = u.length - 1; f >= 0; f--) {
      const h = d * 1e3 + (u[f] ?? 0);
      ((o[f] = Math.floor(h / s)), (d = h % s));
    }
    return (d > 0 && (o[0] += 1), new vt(kc(o)));
  }
  mulRational(s, u) {
    return this.mulInt(s).divInt(u);
  }
  mulNumber(s) {
    const { num: u, den: o } = og(s);
    return this.mulRational(u, o);
  }
  compare(s) {
    const u = this.digits,
      o = s.digits;
    if (u.length !== o.length) return u.length < o.length ? -1 : 1;
    for (let d = u.length - 1; d >= 0; d--) {
      const f = u[d] ?? 0,
        h = o[d] ?? 0;
      if (f < h) return -1;
      if (f > h) return 1;
    }
    return 0;
  }
  eq(s) {
    return this.compare(s) === 0;
  }
  lt(s) {
    return this.compare(s) === -1;
  }
  gt(s) {
    return this.compare(s) === 1;
  }
  lte(s) {
    return this.compare(s) <= 0;
  }
  gte(s) {
    return this.compare(s) >= 0;
  }
  isZero() {
    return this.digits.length === 0;
  }
  toJSON() {
    return [...this.digits];
  }
  toString() {
    if (this.digits.length === 0) return '0';
    const s = this.digits.length;
    let u = String(this.digits[s - 1]);
    for (let o = s - 2; o >= 0; o--) u += String(this.digits[o]).padStart(3, '0');
    return u;
  }
  toDisplay() {
    if (this.digits.length === 0) return '0';
    const s = this.digits.length,
      u = this.digits[s - 1];
    if (s === 1) return String(u);
    const o = s - 1,
      d = rg(o),
      f = this.digits[s - 2] ?? 0,
      h = Math.floor(f / 10);
    return `${u}.${String(h).padStart(2, '0')}${d}`;
  }
};
ta(vt, 'ZERO', new vt([]));
let F = vt;
function fg(c) {
  if (c === '') return 0;
  let s = 0;
  for (let u = 0; u < c.length; u++) s = s * 26 + (c.charCodeAt(u) - 65 + 1);
  return s;
}
function dg(c) {
  if (c <= 0) return { color: 'var(--c-text)', glow: '0 0 6px rgba(232,239,255,0.35)' };
  const s = Math.min(1, (c - 1) / 19),
    u = 195 + s * 100,
    o = 0.86 - s * 0.14,
    d = 0.13 + s * 0.07,
    f = `oklch(${o.toFixed(3)} ${d.toFixed(3)} ${u.toFixed(1)})`,
    h = Math.min(0.95, o + 0.05),
    p = d + 0.05,
    y = `oklch(${h.toFixed(3)} ${p.toFixed(3)} ${u.toFixed(1)} / 0.55)`;
  return { color: f, glow: `0 0 8px ${y}` };
}
function mg(c) {
  switch (c) {
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
function hg(c) {
  switch (c) {
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
function vn({
  value: c,
  size: s = 'md',
  accentColor: u = 'scale',
  glow: o = !1,
  prefix: d,
  suffix: f,
  decimals: h,
  style: p,
}) {
  const y = typeof c == 'number' ? F.fromNumber(c) : c;
  let g;
  h != null && typeof c == 'number' ? (g = c.toFixed(h)) : (g = y.toDisplay());
  const _ = g.match(/^[\d.]+([A-Z]*)$/),
    j = _ ? _[1] : '',
    T = fg(j);
  let M, R;
  if (u === 'scale') {
    const Y = dg(T);
    ((M = Y.color), (R = o ? Y.glow : void 0));
  } else ((M = mg(u)), (R = o ? hg(u) : void 0));
  const U = { sm: Hn.sizeSm, md: Hn.sizeMd, lg: Hn.sizeLg, xl: Hn.sizeXl }[s],
    q = { color: M, ...(R != null ? { textShadow: R } : {}), ...p };
  return r.jsxs('span', {
    className: `${Hn.root} ${U}`,
    style: q,
    children: [
      d != null && r.jsx('span', { className: Hn.affix, children: d }),
      g,
      f != null && r.jsx('span', { className: Hn.affix, children: f }),
    ],
  });
}
const pg = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  vg = { sm: 12, md: 16, lg: 22, xl: 28 };
function yg({ delta: c, sizeClass: s }) {
  const u = c === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return r.jsx('span', {
    className: `${fa.delta} ${s}`,
    style: { color: u },
    'aria-hidden': 'true',
    children: c,
  });
}
function Zl({
  currency: c,
  value: s,
  size: u = 'md',
  delta: o,
  showLabel: d,
  subtle: f,
  align: h = 'start',
  ranked: p,
}) {
  const y = typeof s == 'number' ? F.fromNumber(s) : s,
    g = pg[c],
    _ = f ? 'var(--c-text-disabled)' : `var(${g.cssVar})`,
    j = o && !f ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: _ },
    T = { sm: fa.deltaSm, md: fa.deltaMd, lg: fa.deltaLg, xl: fa.deltaLg }[u],
    M = r.jsx(Oe, { name: c, size: vg[u], color: _, className: fa.icon }),
    R = r.jsxs(r.Fragment, {
      children: [
        o !== void 0 && !f && r.jsx(yg, { delta: o, sizeClass: T }),
        r.jsx(vn, { value: y, size: u, accentColor: 'primary', style: j }),
      ],
    });
  return r.jsxs('span', {
    className: [fa.root, f ? fa.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${g.label} ${y.toDisplay()}`,
    children: [
      h === 'end'
        ? r.jsxs(r.Fragment, { children: [R, M] })
        : r.jsxs(r.Fragment, { children: [M, R] }),
      d && r.jsx('span', { className: fa.currencyLabel, 'aria-hidden': 'true', children: g.label }),
      p !== void 0 &&
        p !== '' &&
        r.jsx('span', {
          className: fa.rankStamp,
          'data-rank': p,
          'aria-label': `rank ${p}`,
          children: p,
        }),
    ],
  });
}
const gg = '_iconButton_1fyi8_1',
  _g = '_round_1fyi8_23',
  bg = '_active_1fyi8_85',
  Sg = '_iconWrap_1fyi8_113',
  Bl = {
    iconButton: gg,
    round: _g,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: bg,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: Sg,
  },
  xg = { sm: 14, md: 18, lg: 22 };
function Fc({
  icon: c,
  label: s,
  size: u = 'md',
  variant: o = 'ghost',
  shape: d = 'square',
  active: f = !1,
  disabled: h = !1,
  onClick: p,
}) {
  const y = o === 'default' ? 'ghost' : o,
    g = typeof c == 'string' ? r.jsx(Oe, { name: c, size: xg[u] }) : c;
  return r.jsx('button', {
    type: 'button',
    className: [
      Bl.iconButton,
      Bl[`variant-${y}`],
      Bl[`size-${u}`],
      d === 'round' ? Bl.round : '',
      f ? Bl.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: p,
    'aria-label': s,
    'aria-pressed': f,
    'aria-disabled': h,
    children: r.jsx('span', { className: Bl.iconWrap, 'aria-hidden': 'true', children: g }),
  });
}
const Gh = (c) => {
    let s;
    const u = new Set(),
      o = (g, _) => {
        const j = typeof g == 'function' ? g(s) : g;
        if (!Object.is(j, s)) {
          const T = s;
          ((s = (_ ?? (typeof j != 'object' || j === null)) ? j : Object.assign({}, s, j)),
            u.forEach((M) => M(s, T)));
        }
      },
      d = () => s,
      p = {
        setState: o,
        getState: d,
        getInitialState: () => y,
        subscribe: (g) => (u.add(g), () => u.delete(g)),
      },
      y = (s = c(o, d, p));
    return p;
  },
  jg = (c) => (c ? Gh(c) : Gh),
  Ag = (c) => c;
function Tg(c, s = Ag) {
  const u = bs.useSyncExternalStore(
    c.subscribe,
    bs.useCallback(() => s(c.getState()), [c, s]),
    bs.useCallback(() => s(c.getInitialState()), [c, s])
  );
  return (bs.useDebugValue(u), u);
}
const Eg = (c) => {
    const s = jg(c),
      u = (o) => Tg(s, o);
    return (Object.assign(u, s), u);
  },
  Ng = (c) => Eg,
  N0 = [
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
function Sr(c, s) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, s));
}
function Yn(c) {
  return 1 + 0.1 * c;
}
function M0(c, s, u) {
  let o = 0;
  for (let d = 0; d < u; d++) o += Sr(c, s + d);
  return o;
}
function z0(c, s, u) {
  let o = F.ZERO,
    d = 0;
  for (;;) {
    const f = F.fromNumber(Sr(c, s + d)),
      h = o.add(f);
    if (h.gt(u) || ((o = h), d++, d >= 1e4)) break;
  }
  return { lvDelta: d, totalCost: o };
}
const Vh = {
  isRunActive: !1,
  screw: F.ZERO,
  machineHp: F.ZERO,
  machineMaxHp: F.ZERO,
  baseMachineMaxHp: F.ZERO,
  currentTier: 1,
  currentWave: 1,
  currentWeapon: 'laser',
  weaponSwitchCdSec: 0,
  activeCdSec: 0,
  isAutoActive: !1,
  gameSpeed: 1,
  isPaused: !1,
};
function Mg(c, s, u) {
  return c.lt(s) ? s : c.gt(u) ? u : c;
}
const zg = (c, s) => ({
    ...Vh,
    startRun: ({ initialWeapon: u, baseMachineMaxHp: o, gameSpeed: d }) => {
      const f = s().runWorkshopLevels.hpMul,
        h = Yn(f),
        p = o.mulNumber(h);
      (c({
        isRunActive: !0,
        screw: F.ZERO,
        machineHp: p,
        machineMaxHp: p,
        baseMachineMaxHp: o,
        currentTier: 1,
        currentWave: 1,
        currentWeapon: u,
        weaponSwitchCdSec: 0,
        activeCdSec: 0,
        isAutoActive: !1,
        gameSpeed: d,
        isPaused: !1,
      }),
        s().resetRunWorkshop());
    },
    endRun: () => {
      (c(Vh), s().resetRunWorkshop());
    },
    addScrew: (u) => c((o) => ({ screw: o.screw.add(u) })),
    spendScrew: (u) => {
      const o = s().screw;
      return o.lt(u) ? !1 : (c({ screw: o.sub(u) }), !0);
    },
    setMachineHp: (u) => c((o) => ({ machineHp: Mg(u, F.ZERO, o.machineMaxHp) })),
    damageHp: (u) =>
      c((o) => {
        const d = o.machineHp.sub(u);
        return { machineHp: d.lt(F.ZERO) ? F.ZERO : d };
      }),
    recalcMachineMaxHpFromHpMul: (u) => {
      const o = s(),
        d = o.machineMaxHp,
        f = o.machineHp,
        h = d.sub(f),
        p = h.lt(F.ZERO) ? F.ZERO : h,
        y = o.baseMachineMaxHp.mulNumber(Yn(u)),
        g = y.sub(p),
        _ = g.lt(F.ZERO) ? F.ZERO : g;
      c({ machineMaxHp: y, machineHp: _ });
    },
    advanceWave: () => c((u) => ({ currentWave: u.currentWave + 1 })),
    advanceTier: () => c((u) => ({ currentTier: u.currentTier + 1, currentWave: 1 })),
    switchWeapon: (u) => c({ currentWeapon: u }),
    setWeaponSwitchCd: (u) => c({ weaponSwitchCdSec: Math.max(0, u) }),
    setActiveCd: (u) => c({ activeCdSec: Math.max(0, u) }),
    setAutoActive: (u) => c({ isAutoActive: u }),
    setPaused: (u) => c({ isPaused: u }),
    setGameSpeed: (u) => c({ gameSpeed: u }),
    triggerActive: (u) => (s().activeCdSec > 0 ? !1 : (c({ activeCdSec: Math.max(0, u) }), !0)),
    tickCooldowns: (u) =>
      c((o) => ({
        weaponSwitchCdSec: Math.max(0, o.weaponSwitchCdSec - u),
        activeCdSec: Math.max(0, o.activeCdSec - u),
      })),
  }),
  Cg = { bolt: F.ZERO, alloy: F.ZERO },
  Rg = (c, s) => ({
    ...Cg,
    addBolt: (u) => c((o) => ({ bolt: o.bolt.add(u) })),
    spendBolt: (u) => {
      const o = s().bolt;
      return o.lt(u) ? !1 : (c({ bolt: o.sub(u) }), !0);
    },
    addAlloy: (u) => c((o) => ({ alloy: o.alloy.add(u) })),
    spendAlloy: (u) => {
      const o = s().alloy;
      return o.lt(u) ? !1 : (c({ alloy: o.sub(u) }), !0);
    },
    resetCurrencies: () => c({ bolt: F.ZERO, alloy: F.ZERO }),
  }),
  Yl = 6,
  wg = { equippedPatches: new Map() },
  Og = (c, s) => ({
    ...wg,
    equipPatch: (u, o, d) => {
      const f = s().equippedPatches;
      for (const [h, p] of f) if (p.name === o && h !== u) return !1;
      return (
        c((h) => {
          const p = new Map(h.equippedPatches);
          return (p.set(u, { name: o, tier: d }), { equippedPatches: p });
        }),
        !0
      );
    },
    unequipPatch: (u) => {
      c((o) => {
        const d = new Map(o.equippedPatches);
        return (d.delete(u), { equippedPatches: d });
      });
    },
    clearEquippedPatches: () => c({ equippedPatches: new Map() }),
  }),
  C0 = 'tower-like-game',
  Ts = 1,
  W = {
    profile: 'profile',
    currencies: 'currencies',
    machine: 'machine',
    weapons: 'weapons',
    patches: 'patches',
    equippedPatches: 'equippedPatches',
    settings: 'settings',
  },
  R0 = [
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
  Dg = {
    id: 'singleton',
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    schemaVersion: Ts,
  },
  Bg = { id: 'singleton', bolt: [], alloy: [] },
  Lg = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  Hg = {
    id: 'singleton',
    defaultGameSpeed: 1,
    bgmVolume: 0.8,
    seVolume: 0.8,
    vibrationEnabled: !0,
  };
function w0() {
  return Object.fromEntries(R0.map((c) => [c, 0]));
}
const Ug = { machineLevels: w0() },
  qg = (c) => ({
    ...Ug,
    incrementMachineLv: (s) =>
      c((u) => ({ machineLevels: { ...u.machineLevels, [s]: u.machineLevels[s] + 1 } })),
    setMachineLv: (s, u) => c((o) => ({ machineLevels: { ...o.machineLevels, [s]: u } })),
    resetMachine: () => c({ machineLevels: w0() }),
  });
function $h(c, s) {
  return `${c}#${s}`;
}
const Gg = { patches: new Map() },
  Vg = (c, s) => ({
    ...Gg,
    addPatch: (u, o, d = 1) => {
      const f = $h(u, o);
      c((h) => {
        const p = new Map(h.patches),
          y = p.get(f);
        return (
          y ? p.set(f, { ...y, count: y.count + d }) : p.set(f, { name: u, tier: o, count: d }),
          { patches: p }
        );
      });
    },
    consumePatch: (u, o, d = 1) => {
      const f = $h(u, o),
        h = s().patches.get(f);
      return !h || h.count < d
        ? !1
        : (c((p) => {
            const y = new Map(p.patches),
              g = y.get(f);
            if (!g) return {};
            const _ = g.count - d;
            return (_ <= 0 ? y.delete(f) : y.set(f, { ...g, count: _ }), { patches: y });
          }),
          !0);
    },
    pruneEmptyPatches: () => {
      c((u) => {
        const o = new Map(u.patches);
        for (const [d, f] of o) f.count <= 0 && o.delete(d);
        return { patches: o };
      });
    },
    resetPatches: () => c({ patches: new Map() }),
  }),
  kh = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  $g = (c) => ({
    ...kh,
    updateHighest: (s, u) =>
      c((o) =>
        s > o.highestTier
          ? { highestTier: s, highestWave: u }
          : s === o.highestTier
            ? { highestWave: Math.max(o.highestWave, u) }
            : {}
      ),
    addPlayTimeSec: (s) => c((u) => ({ totalPlayTimeSec: u.totalPlayTimeSec + s })),
    incrementRuns: () => c((s) => ({ totalRuns: s.totalRuns + 1 })),
    addEnemiesKilled: (s) => c((u) => ({ totalEnemiesKilled: u.totalEnemiesKilled + s })),
    setLastPlayedAt: (s) => c({ lastPlayedAt: s }),
    resetProfile: (s) => c({ ...kh, createdAt: s, lastPlayedAt: s }),
  }),
  O0 = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
  kg = { runWorkshopLevels: O0 },
  Yg = (c, s) => ({
    ...kg,
    upgradeRunWorkshop: (u, o) => {
      const d = N0.find((_) => _.key === u);
      if (d == null) return !1;
      const f = s().runWorkshopLevels[u];
      let h, p;
      if (o === 'max') {
        const _ = z0(d, f, s().screw);
        if (_.lvDelta === 0) return !1;
        ((h = _.lvDelta), (p = _.totalCost));
      } else ((h = o), (p = F.fromNumber(M0(d, f, o))));
      if (!s().spendScrew(p)) return !1;
      const g = f + h;
      return (
        c((_) => ({ runWorkshopLevels: { ..._.runWorkshopLevels, [u]: g } })),
        u === 'hpMul' && s().recalcMachineMaxHpFromHpMul(g),
        !0
      );
    },
    resetRunWorkshop: () => c({ runWorkshopLevels: O0 }),
  }),
  Yh = { defaultGameSpeed: 1, bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  Zg = (c) => ({
    ...Yh,
    setDefaultGameSpeed: (s) => c({ defaultGameSpeed: s }),
    setBgmVolume: (s) => c({ bgmVolume: Math.max(0, Math.min(1, s)) }),
    setSeVolume: (s) => c({ seVolume: Math.max(0, Math.min(1, s)) }),
    setVibrationEnabled: (s) => c({ vibrationEnabled: s }),
    resetSettings: () => c(Yh),
  }),
  Zh = { weaponLv: 0, initialWeapon: 'laser' },
  Xg = (c) => ({
    ...Zh,
    incrementWeaponLv: () => c((s) => ({ weaponLv: s.weaponLv + 1 })),
    setWeaponLv: (s) => c({ weaponLv: s }),
    setInitialWeapon: (s) => c({ initialWeapon: s }),
    resetWeapons: () => c(Zh),
  }),
  k = Ng()((...c) => ({
    ...$g(...c),
    ...Rg(...c),
    ...qg(...c),
    ...Xg(...c),
    ...Vg(...c),
    ...Og(...c),
    ...Zg(...c),
    ...zg(...c),
    ...Yg(...c),
  }));
function ti({ title: c, subtitle: s, onBack: u, currencies: o, tabBar: d, actions: f }) {
  const h = k((T) => T.bolt),
    p = k((T) => T.alloy),
    y = k((T) => T.screw),
    g = k((T) => T.isRunActive),
    _ = (o ?? []).filter((T) => (T === 'screw' ? g : !0));
  function j(T) {
    switch (T) {
      case 'bolt':
        return h;
      case 'alloy':
        return p;
      case 'screw':
        return y;
    }
  }
  return r.jsxs('div', {
    className: un.root,
    children: [
      r.jsxs('div', {
        className: un.titleRow,
        children: [
          r.jsx('div', {
            className: un.left,
            children:
              u != null &&
              r.jsx(Fc, {
                icon: 'chevron-left',
                label: '戻る',
                variant: 'ghost',
                size: 'md',
                onClick: u,
              }),
          }),
          r.jsxs('div', {
            className: un.center,
            children: [
              r.jsx(G, { variant: 'heading-3', truncate: !0, align: 'center', children: c }),
              s != null &&
                r.jsx(G, { variant: 'caption', color: 'dim', align: 'center', children: s }),
            ],
          }),
          r.jsxs('div', {
            className: un.right,
            children: [
              _.length > 0 &&
                r.jsx('div', {
                  className: un.currencies,
                  children: _.map((T) => r.jsx(Zl, { currency: T, value: j(T), size: 'sm' }, T)),
                }),
              f != null && r.jsx('div', { className: un.actions, children: f }),
            ],
          }),
        ],
      }),
      d != null && r.jsx('div', { className: un.tabBarSlot, children: d }),
    ],
  });
}
const Qg = '_tab_1nc83_3',
  Kg = { tab: Qg },
  Jg = '_wrapper_1opqp_3',
  Wg = '_active_1opqp_12',
  Fg = '_card_1opqp_12',
  Ig = '_locked_1opqp_18',
  Pg = '_tall_1opqp_34',
  e_ = '_iconTile_1opqp_37',
  t_ = '_headerText_1opqp_42',
  a_ = '_description_1opqp_45',
  n_ = '_name_1opqp_48',
  l_ = '_wide_1opqp_53',
  c_ = '_body_1opqp_61',
  i_ = '_header_1opqp_42',
  s_ = '_statGrid_1opqp_121',
  u_ = '_statChip_1opqp_129',
  o_ = '_statLabel_1opqp_140',
  r_ = '_statValue_1opqp_147',
  f_ = '_lockedBadge_1opqp_158',
  ft = {
    wrapper: Jg,
    active: Wg,
    card: Fg,
    locked: Ig,
    tall: Pg,
    iconTile: e_,
    headerText: t_,
    description: a_,
    name: n_,
    wide: l_,
    body: c_,
    header: i_,
    statGrid: s_,
    statChip: u_,
    statLabel: o_,
    statValue: r_,
    lockedBadge: f_,
  },
  d_ = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function D0({
  weapon: c,
  name: s,
  description: u,
  stats: o,
  layout: d = 'tall',
  active: f = !1,
  locked: h = !1,
  onClick: p,
}) {
  const y = d === 'wide',
    g = p != null && !h;
  return r.jsx('div', {
    className: [ft.wrapper, f ? ft.active : '', h ? ft.locked : '', y ? ft.wide : ft.tall]
      .filter(Boolean)
      .join(' '),
    onClick: g ? p : void 0,
    role: g ? 'button' : void 0,
    tabIndex: g ? 0 : void 0,
    onKeyDown: g
      ? (_) => {
          (_.key === 'Enter' || _.key === ' ') && (_.preventDefault(), p());
        }
      : void 0,
    'aria-pressed': p != null ? f : void 0,
    children: r.jsxs('div', {
      className: ft.card,
      style: g ? { cursor: 'pointer' } : void 0,
      children: [
        r.jsx('div', {
          className: ft.iconTile,
          'aria-hidden': !0,
          children: r.jsx(Oe, { name: c, size: y ? 40 : 52 }),
        }),
        r.jsxs('div', {
          className: ft.body,
          children: [
            r.jsx('div', {
              className: ft.header,
              children: r.jsxs('div', {
                className: ft.headerText,
                children: [
                  r.jsx('span', { className: ft.name, children: s }),
                  u != null &&
                    u.length > 0 &&
                    r.jsx('span', { className: ft.description, children: u }),
                ],
              }),
            }),
            !h &&
              o.length > 0 &&
              r.jsx('div', {
                className: ft.statGrid,
                children: o.map((_) => {
                  const j =
                    _.suffix != null
                      ? `${typeof _.value == 'number' ? _.value.toLocaleString() : _.value}${_.suffix}`
                      : typeof _.value == 'number'
                        ? _.value.toLocaleString()
                        : _.value;
                  return r.jsxs(
                    'div',
                    {
                      className: ft.statChip,
                      children: [
                        r.jsx('span', { className: ft.statLabel, children: _.label }),
                        r.jsx('span', {
                          className: ft.statValue,
                          style: _.accent != null ? { color: d_[_.accent] } : void 0,
                          children: j,
                        }),
                      ],
                    },
                    _.label
                  );
                }),
              }),
            h &&
              r.jsxs('div', {
                className: ft.lockedBadge,
                children: [
                  r.jsx(Oe, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
                  r.jsx(G, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
function zs(c) {
  return Math.pow(1.02, c);
}
function Cs(c, s) {
  return Math.min(10, c * (1 + 0.03 * s));
}
const Rs = { laser: 120, cannon: 480, thunder: 84, cutter: 62 },
  ws = { laser: 1, cannon: 0.5, thunder: 0.7, cutter: 2 },
  xr = { laser: 580, thunder: 420, cannon: 520 };
function m_(c) {
  const s = Math.round(Rs.laser * zs(c)),
    u = Math.floor(1 + 0.1 * c),
    o = Math.round(Cs(ws.laser, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '貫通', value: u },
    { label: '射程', value: xr.laser, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function h_(c) {
  const s = Math.round(Rs.cannon * zs(c)),
    u = Math.round((30 + 0.5 * c) * 10) / 10,
    o = Math.round(Cs(ws.cannon, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '半径', value: u, suffix: 'm' },
    { label: '射程', value: xr.cannon, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function p_(c) {
  const s = Math.round(Rs.thunder * zs(c)),
    u = Math.floor(7 + 0.1 * c),
    o = Math.round(Cs(ws.thunder, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '連鎖', value: u },
    { label: '射程', value: xr.thunder, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function v_(c) {
  const s = Math.round(Rs.cutter * zs(c)),
    u = Math.round((80 + 0.5 * c) * 10) / 10,
    o = Math.floor(1 + 0.05 * c),
    d = Math.round(Cs(ws.cutter, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '旋回', value: u, suffix: 'm' },
    { label: '同時', value: o },
    { label: '連射', value: d, suffix: '/s' },
  ];
}
const y_ = [
  { kind: 'laser', name: 'LASER', description: '高速直進ビーム。', buildStats: m_ },
  { kind: 'cannon', name: 'CANNON', description: '範囲爆発。', buildStats: h_ },
  { kind: 'thunder', name: 'THUNDER', description: '連鎖電撃。', buildStats: p_ },
  { kind: 'cutter', name: 'CUTTER', description: '旋回斬撃。', buildStats: v_ },
];
function g_() {
  const c = k((s) => s.weaponLv);
  return r.jsx('div', {
    className: Kg.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: y_.map((s) =>
      r.jsx(
        D0,
        {
          weapon: s.kind,
          name: s.name,
          description: s.description,
          stats: s.buildStats(c),
          layout: 'wide',
        },
        s.kind
      )
    ),
  });
}
const __ = '_tab_1oky8_3',
  b_ = '_topRow_1oky8_9',
  S_ = '_description_1oky8_15',
  x_ = '_previewCard_1oky8_21',
  j_ = '_previewLabel_1oky8_25',
  A_ = '_impactGrid_1oky8_32',
  T_ = '_impactRow_1oky8_37',
  E_ = '_impactRowBordered_1oky8_45',
  N_ = '_impactLabel_1oky8_49',
  M_ = '_impactValues_1oky8_55',
  z_ = '_arrow_1oky8_62',
  aa = {
    tab: __,
    topRow: b_,
    description: S_,
    previewCard: x_,
    previewLabel: j_,
    impactGrid: A_,
    impactRow: T_,
    impactRowBordered: E_,
    impactLabel: N_,
    impactValues: M_,
    arrow: z_,
  },
  C_ = '_card_1403j_1',
  R_ = '_interactive_1403j_97',
  Yc = {
    card: C_,
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
    interactive: R_,
  };
function Kn({
  children: c,
  variant: s = 'default',
  interactive: u = !1,
  padding: o = 'md',
  radius: d,
  className: f,
}) {
  const h = [
    Yc.card,
    Yc[`variant-${s}`],
    Yc[`padding-${o}`],
    d != null ? Yc[`radius-${d}`] : '',
    u ? Yc.interactive : '',
    f ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return r.jsx('div', { className: h, children: c });
}
const w_ = '_root_168oy_2',
  O_ = '_header_168oy_15',
  D_ = '_iconWrap_168oy_22',
  B_ = '_title_168oy_34',
  L_ = '_lvBadge_168oy_47',
  H_ = '_description_168oy_60',
  U_ = '_valueRow_168oy_66',
  q_ = '_valueBefore_168oy_74',
  G_ = '_valueAfter_168oy_83',
  V_ = '_arrow_168oy_93',
  $_ = '_buttons_168oy_100',
  k_ = '_btnCol_168oy_105',
  Y_ = '_btn_168oy_105',
  Z_ = '_btnPrimary_168oy_132',
  X_ = '_btnSecondary_168oy_139',
  Q_ = '_btnWarning_168oy_146',
  K_ = '_costRow_168oy_172',
  J_ = '_costNum_168oy_181',
  W_ = '_costDisabled_168oy_190',
  We = {
    root: w_,
    header: O_,
    iconWrap: D_,
    title: B_,
    lvBadge: L_,
    description: H_,
    valueRow: U_,
    valueBefore: q_,
    valueAfter: G_,
    arrow: V_,
    buttons: $_,
    btnCol: k_,
    btn: Y_,
    btnPrimary: Z_,
    btnSecondary: X_,
    btnWarning: Q_,
    costRow: K_,
    costNum: J_,
    costDisabled: W_,
  },
  F_ = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  I_ = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  P_ = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  e2 = { primary: We.btnPrimary, secondary: We.btnSecondary, warning: We.btnWarning },
  t2 = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function ar(c) {
  return c instanceof F ? c.toDisplay() : c.toLocaleString();
}
function jr({
  title: c,
  description: s,
  iconName: u,
  iconColor: o,
  currentLabel: d,
  before: f,
  after: h,
  beforeSuffix: p = '',
  currency: y = 'bolt',
  accent: g,
  options: _ = [],
  maxed: j = !1,
  onUpgrade: T,
}) {
  const M = g ?? P_[y],
    R = F_[M],
    U = o ?? R,
    q = e2[M],
    Y = t2[M];
  return r.jsxs('div', {
    className: We.root,
    role: 'group',
    'aria-label': c,
    'data-maxed': j,
    children: [
      r.jsxs('div', {
        className: We.header,
        children: [
          u != null &&
            r.jsx('span', {
              className: We.iconWrap,
              children: r.jsx(Oe, { name: u, size: 14, color: U }),
            }),
          r.jsx('span', { className: We.title, children: c }),
          d != null &&
            !j &&
            r.jsx('span', {
              className: We.lvBadge,
              style: { color: R, boxShadow: I_[M] },
              children: d,
            }),
          j &&
            r.jsx('span', {
              className: We.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      s != null &&
        s.length > 0 &&
        r.jsx(G, { variant: 'caption', color: 'dim', className: We.description, children: s }),
      f != null &&
        r.jsxs('div', {
          className: We.valueRow,
          children: [
            r.jsxs('span', { className: We.valueBefore, children: [ar(f), p] }),
            h != null &&
              !j &&
              r.jsxs(r.Fragment, {
                children: [
                  r.jsx('span', { className: We.arrow, children: '→' }),
                  r.jsxs('span', {
                    className: We.valueAfter,
                    style: { color: R, textShadow: `0 0 5px ${Y}` },
                    children: [ar(h), p],
                  }),
                ],
              }),
          ],
        }),
      !j &&
        _.length > 0 &&
        r.jsx('div', {
          className: We.buttons,
          style: { gridTemplateColumns: `repeat(${_.length}, 1fr)` },
          children: _.map((K) => {
            const oe = K.disabled === !0;
            return r.jsxs(
              'div',
              {
                className: We.btnCol,
                children: [
                  r.jsx('button', {
                    type: 'button',
                    className: `${We.btn} ${q}`,
                    disabled: oe,
                    onClick: oe ? void 0 : () => (T == null ? void 0 : T(K.amount)),
                    children: K.amount,
                  }),
                  r.jsx('div', {
                    className: We.costRow,
                    children: r.jsx('span', {
                      className: `${We.costNum} ${oe ? We.costDisabled : ''}`,
                      children: ar(K.cost),
                    }),
                  }),
                ],
              },
              K.amount
            );
          }),
        }),
    ],
  });
}
function Ar(c) {
  const s = Math.ceil(200 * Math.pow(1.12, c));
  return F.fromNumber(s);
}
function Xh(c, s) {
  let u = F.ZERO;
  for (let o = 0; o < s; o++) u = u.add(Ar(c + o));
  return u;
}
function a2(c, s) {
  let u = s,
    o = 0;
  for (;;) {
    const d = Ar(c + o);
    if (u.lt(d) || ((u = u.sub(d)), o++, o > 1e4)) break;
  }
  return o;
}
function Qh(c) {
  return Math.pow(1.02, c);
}
const Kh = { laser: 120 };
function n2(c) {
  const s = c + 1,
    u = Qh(c),
    o = Qh(s);
  return [
    { label: 'LASER DMG', before: Math.round(Kh.laser * u), after: Math.round(Kh.laser * o) },
    {
      label: 'CANNON 半径',
      before: Math.round((30 + 0.5 * c) * 10) / 10,
      after: Math.round((30 + 0.5 * s) * 10) / 10,
      suffix: 'm',
    },
    { label: 'THUNDER 連鎖', before: Math.floor(7 + 0.1 * c), after: Math.floor(7 + 0.1 * s) },
    { label: 'CUTTER 同時', before: Math.floor(1 + 0.05 * c), after: Math.floor(1 + 0.05 * s) },
  ];
}
function l2() {
  const c = k((R) => R.weaponLv),
    s = k((R) => R.alloy),
    u = k((R) => R.incrementWeaponLv),
    o = k((R) => R.setWeaponLv),
    d = k((R) => R.spendAlloy),
    f = Ar(c),
    h = Xh(c, 5),
    p = a2(c, s),
    y = Xh(c, p),
    g = !s.lt(f),
    _ = p >= 5,
    j = p >= 1,
    T = n2(c);
  function M(R) {
    R === '+1'
      ? d(f) && u()
      : R === '+5'
        ? d(h) && o(c + 5)
        : R === 'MAX' && p > 0 && d(y) && o(c + p);
  }
  return r.jsxs('div', {
    className: aa.tab,
    role: 'tabpanel',
    'aria-label': '武器強化',
    children: [
      r.jsxs('div', {
        className: aa.topRow,
        children: [
          r.jsx(G, {
            variant: 'caption',
            color: 'mid',
            className: aa.description,
            children: '全 4 武器に共通で効く強化です。',
          }),
          r.jsx(Zl, { currency: 'alloy', value: s, size: 'sm' }),
        ],
      }),
      r.jsx(jr, {
        title: '武器強化 Lv',
        iconName: 'spark',
        iconColor: 'var(--c-secondary)',
        currentLabel: `Lv ${c}`,
        before: c,
        after: c + 1,
        currency: 'alloy',
        accent: 'secondary',
        options: [
          { amount: '+1', cost: f, disabled: !g },
          { amount: '+5', cost: h, disabled: !_ },
          { amount: 'MAX', cost: y, disabled: !j },
        ],
        onUpgrade: M,
      }),
      r.jsxs(Kn, {
        variant: 'sunken',
        padding: 'md',
        className: aa.previewCard,
        children: [
          r.jsx(G, {
            variant: 'label',
            color: 'dim',
            className: aa.previewLabel,
            children: '次 Lv での効果プレビュー',
          }),
          r.jsx('div', {
            className: aa.impactGrid,
            children: T.map((R, U) =>
              r.jsxs(
                'div',
                {
                  className: [aa.impactRow, U > 0 ? aa.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    r.jsx(G, {
                      variant: 'caption',
                      color: 'mid',
                      className: aa.impactLabel,
                      children: R.label,
                    }),
                    r.jsxs('span', {
                      className: aa.impactValues,
                      children: [
                        r.jsx(vn, {
                          value: R.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: R.suffix,
                          decimals: R.suffix === 'm' ? 1 : 0,
                        }),
                        r.jsx('span', { className: aa.arrow, children: '→' }),
                        r.jsx(vn, {
                          value: R.after,
                          size: 'sm',
                          accentColor: 'secondary',
                          suffix: R.suffix,
                          decimals: R.suffix === 'm' ? 1 : 0,
                        }),
                      ],
                    }),
                  ],
                },
                R.label
              )
            ),
          }),
        ],
      }),
    ],
  });
}
const B0 = te.createContext(null);
function c2({ children: c, initialScreen: s }) {
  const [u, o] = te.useState(s ?? 'title'),
    d = te.useCallback((f) => {
      o(f);
    }, []);
  return r.jsx(B0.Provider, { value: { screen: u, navigate: d }, children: c });
}
function yn() {
  const c = te.useContext(B0);
  if (!c) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return c;
}
const i2 = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function s2(c = {}) {
  const { initialTab: s = 'details' } = c,
    [u, o] = te.useState(s),
    { screen: d, navigate: f } = yn();
  return r.jsx(Qn, {
    header: r.jsx(ti, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => f('preparation'),
      tabBar: r.jsx(Ms, { tabs: i2, value: u, onChange: o, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(ei, { active: d, onChange: (h) => f(h) }),
    children: r.jsxs('div', {
      className: Hv.content,
      children: [u === 'details' && r.jsx(g_, {}), u === 'upgrade' && r.jsx(l2, {})],
    }),
  });
}
const u2 = '_root_1ozz7_1',
  o2 = '_battleFooter_1ozz7_10',
  r2 = '_overlayLayer_1ozz7_14',
  nr = { root: u2, battleFooter: o2, overlayLayer: r2 },
  f2 = '_root_1375f_3',
  d2 = '_rangeCircle_1375f_15',
  m2 = '_machine_1375f_27',
  h2 = '_machineRingOuter_1375f_40',
  p2 = '_pin_1375f_50',
  v2 = '_enemy_1375f_60',
  y2 = '_enemyUpper_1375f_71',
  g2 = '_enemyHpBar_1375f_74',
  on = {
    root: f2,
    rangeCircle: d2,
    machine: m2,
    machineRingOuter: h2,
    pin: p2,
    enemy: v2,
    enemyUpper: y2,
    enemyHpBar: g2,
  },
  _2 = '_root_14p1r_1',
  b2 = { root: _2 };
function S2({ value: c, x: s, y: u, crit: o = !1, duration: d = 800, onDone: f }) {
  const h = te.useId().replace(/:/g, 'dp'),
    p = `
    @keyframes ${h}-pop {
      0%   { transform: translate(-50%, 0) scale(${o ? 0.6 : 0.8}); opacity: 0; }
      15%  { transform: translate(-50%, -4px) scale(${o ? 1.15 : 1}); opacity: 1; }
      100% { transform: translate(-50%, -28px) scale(${o ? 1 : 0.95}); opacity: 0; }
    }
    .${h} {
      position: absolute;
      left: ${s}%;
      top: ${u}%;
      animation: ${h}-pop ${d}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
      filter: drop-shadow(0 0 4px ${o ? 'rgba(246,185,74,0.7)' : 'rgba(255,255,255,0.45)'});
    }
    @media (prefers-reduced-motion: reduce) {
      .${h} { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      r.jsx('div', {
        className: `${h} ${b2.root}`,
        onAnimationEnd: f,
        children: r.jsx(vn, {
          value: c,
          size: o ? 'lg' : 'md',
          accentColor: o ? 'warning' : 'scale',
          glow: !0,
          style: o ? { fontSize: 22, fontWeight: 700 } : { fontSize: 16, fontWeight: 600 },
        }),
      }),
    ],
  });
}
const x2 = '_wrap_14rhu_1',
  j2 = { wrap: x2 },
  Jh = 8;
function A2({ x: c, y: s, color: u = 'var(--c-text-mid)', duration: o = 480, onDone: d }) {
  const f = te.useId().replace(/:/g, 'ed'),
    p = `
    @keyframes ${f}-flash {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0; }
      30%  { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
    }
    @keyframes ${f}-shard {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)     scale(1);   opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) translateY(-22px) scale(0.3); opacity: 0; }
    }
    .${f}-wrap  { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${f}-flash {
      position: absolute; left: 0; top: 0;
      width: 18px; height: 18px; border-radius: 50%;
      background: radial-gradient(circle, ${u === 'var(--c-text-mid)' ? 'rgba(167,184,216,0.9)' : u}, transparent 65%);
      animation: ${f}-flash ${o}ms var(--ease-out) both;
    }
    .${f}-shard {
      position: absolute; left: 0; top: 0;
      width: 4px; height: 4px;
      background: ${u};
      box-shadow: 0 0 4px ${u};
      animation: ${f}-shard ${o}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${f}-flash, .${f}-shard { animation-duration: 1ms; opacity: 0; }
    }
  `,
    y = Array.from({ length: Jh }, (g, _) =>
      r.jsx('div', { className: `${f}-shard`, style: { '--a': `${(_ * 360) / Jh}deg` } }, _)
    );
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      r.jsxs('div', {
        className: `${f}-wrap ${j2.wrap}`,
        style: { left: `${c}%`, top: `${s}%` },
        onAnimationEnd: d,
        children: [r.jsx('div', { className: `${f}-flash` }), y],
      }),
    ],
  });
}
const T2 = '_wrap_14rhu_1',
  E2 = { wrap: T2 };
function N2({ x: c, y: s, color: u = 'var(--c-primary-hi)', duration: o = 220, onDone: d }) {
  const f = te.useId().replace(/:/g, 'eh'),
    h = `
    @keyframes ${f}-f {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
    }
    .${f}-w { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${f}-d {
      position: absolute;
      left: 0; top: 0;
      width: 12px; height: 12px;
      border-radius: 50%;
      background: radial-gradient(circle, ${u}, transparent 60%);
      animation: ${f}-f ${o}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${f}-d { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: h } }),
      r.jsx('div', {
        className: `${f}-w ${E2.wrap}`,
        style: { left: `${c}%`, top: `${s}%` },
        onAnimationEnd: d,
        children: r.jsx('div', { className: `${f}-d` }),
      }),
    ],
  });
}
const M2 = '_root_2lc0r_2',
  z2 = '_boss_2lc0r_12',
  C2 = '_elite_2lc0r_16',
  R2 = '_sizeSm_2lc0r_21',
  w2 = '_sizeMd_2lc0r_25',
  O2 = '_sizeLg_2lc0r_29',
  D2 = '_header_2lc0r_35',
  B2 = '_headerRight_2lc0r_42',
  L2 = '_hpText_2lc0r_50',
  Da = {
    root: M2,
    boss: z2,
    elite: C2,
    sizeSm: R2,
    sizeMd: w2,
    sizeLg: O2,
    header: D2,
    headerRight: B2,
    hpText: L2,
  },
  H2 = '_badge_4fy54_1',
  U2 = '_glow_4fy54_90',
  q2 = '_iconLeft_4fy54_118',
  Zc = {
    badge: H2,
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
    glow: U2,
    iconLeft: q2,
  };
function Xl({
  text: c,
  variant: s = 'neutral',
  tier: u,
  size: o = 'md',
  glow: d = !1,
  iconLeft: f,
}) {
  let h;
  const p = s === 'default' ? 'neutral' : s;
  if (p === 'tier' && u != null) {
    const g = Math.min(Math.max(1, Math.floor(u)), 12);
    h = { '--badge-color': `var(--c-tier-${Math.min(g, 10)})` };
  } else
    p === 'patch-tier' &&
      u != null &&
      (h = { '--badge-color': `var(--c-patch-t${Math.min(Math.max(1, Math.floor(u)), 5)})` });
  let y = c;
  return (
    y == null &&
      (p === 'tier' && u != null
        ? (y = `T${u}`)
        : p === 'patch-tier' && u != null
          ? (y = `T${u}`)
          : (y = '')),
    r.jsxs('span', {
      className: [Zc.badge, Zc[`variant-${p}`], Zc[`size-${o}`], d ? Zc.glow : '']
        .filter(Boolean)
        .join(' '),
      style: h,
      children: [
        f != null && r.jsx('span', { className: Zc.iconLeft, 'aria-hidden': 'true', children: f }),
        y,
      ],
    })
  );
}
const G2 = '_root_1pi3d_2',
  V2 = '_sizeSm_1pi3d_11',
  $2 = '_sizeMd_1pi3d_15',
  k2 = '_sizeLg_1pi3d_19',
  Y2 = '_fill_1pi3d_23',
  Z2 = '_label_1pi3d_29',
  X2 = '_withTrailing_1pi3d_46',
  Q2 = '_trailingLabel_1pi3d_56',
  rn = {
    root: G2,
    sizeSm: V2,
    sizeMd: $2,
    sizeLg: k2,
    fill: Y2,
    label: Z2,
    withTrailing: X2,
    trailingLabel: Q2,
  },
  K2 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  J2 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function Es({
  value: c,
  max: s,
  color: u = 'primary',
  size: o = 'md',
  variant: d = 'solid',
  showLabel: f = !1,
  label: h,
  trailingLabel: p,
  glow: y = !1,
  reverse: g = !1,
}) {
  const _ = Math.max(1, s),
    j = Math.min(Math.max(0, c), _),
    T = (j / _) * 100,
    M = K2[u],
    R = y || d === 'neon' ? J2[u] : void 0,
    U = { sm: rn.sizeSm, md: rn.sizeMd, lg: rn.sizeLg }[o],
    q = {
      width: `${T}%`,
      backgroundColor: M,
      ...(R != null ? { boxShadow: R } : {}),
      ...(g ? { marginLeft: 'auto' } : {}),
    },
    Y = h ?? `${j} / ${_}`,
    K = r.jsxs('div', {
      className: `${rn.root} ${U}`,
      role: 'progressbar',
      'aria-valuenow': j,
      'aria-valuemin': 0,
      'aria-valuemax': _,
      'aria-label': h ?? `${j} / ${_}`,
      children: [
        r.jsx('div', { className: rn.fill, style: q }),
        f && r.jsx('span', { className: rn.label, children: Y }),
      ],
    });
  return p == null
    ? K
    : r.jsxs('div', {
        className: rn.withTrailing,
        children: [K, r.jsx('span', { className: rn.trailingLabel, children: p })],
      });
}
function W2(c, s) {
  if (s.isZero()) return 0;
  const u = parseFloat(c.toString()),
    o = parseFloat(s.toString());
  return o === 0 || isNaN(o) ? 0 : Math.min(1e3, Math.max(0, Math.round((u / o) * 1e3)));
}
const F2 = { sm: Da.sizeSm, md: Da.sizeMd, lg: Da.sizeLg };
function I2({
  name: c,
  variant: s,
  current: u,
  max: o,
  tier: d,
  size: f = 'md',
  showValue: h = !0,
  type: p,
  currentHp: y,
  maxHp: g,
}) {
  const _ = s ?? p ?? 'normal',
    j = u ?? y ?? 0,
    T = o ?? g ?? 0,
    M = typeof j == 'number' ? F.fromNumber(j) : j,
    R = typeof T == 'number' ? F.fromNumber(T) : T,
    U = W2(M, R),
    q = U <= 250,
    Y = q ? 'hp-low' : 'hp',
    K = f === 'lg' ? 'lg' : f === 'sm' ? 'sm' : 'md';
  let oe;
  return (
    _ === 'boss'
      ? (oe = { boxShadow: 'var(--glow-danger-md)' })
      : _ === 'elite' && (oe = { boxShadow: 'var(--glow-purple-md)' }),
    r.jsxs('div', {
      className: [Da.root, _ === 'boss' ? Da.boss : '', _ === 'elite' ? Da.elite : '', F2[f]]
        .filter(Boolean)
        .join(' '),
      style: oe,
      children: [
        r.jsxs('div', {
          className: Da.header,
          children: [
            r.jsx(G, { variant: 'label', color: 'mid', children: c }),
            r.jsxs('div', {
              className: Da.headerRight,
              children: [
                _ === 'normal' &&
                  d !== void 0 &&
                  r.jsxs(G, { variant: 'numeric-s', color: 'dim', children: ['T', d] }),
                (_ === 'elite' || _ === 'boss') &&
                  r.jsx(Xl, { text: _.toUpperCase(), variant: _, glow: _ === 'boss' }),
              ],
            }),
          ],
        }),
        r.jsx(Es, { value: U, max: 1e3, color: Y, size: K, glow: q }),
        h &&
          r.jsx('div', {
            className: Da.hpText,
            children: r.jsxs(G, {
              variant: 'numeric-s',
              color: q ? 'danger' : 'mid',
              children: [M.toDisplay(), ' / ', R.toDisplay()],
            }),
          }),
      ],
    })
  );
}
function P2(c) {
  switch (c) {
    case 'boss':
      return 'skull';
    case 'miniboss':
      return 'lightning';
    case 'elite':
      return 'shield';
    default:
      return 'flame';
  }
}
function eb(c) {
  return c !== 'normal';
}
function tb(c) {
  return c === 'boss' ? 'boss' : c === 'elite' || c === 'miniboss' ? 'elite' : 'normal';
}
function ab(c) {
  switch (c) {
    case 'boss':
      return 'var(--c-danger)';
    case 'miniboss':
      return 'var(--c-warning)';
    case 'elite':
      return 'var(--c-secondary)';
    default:
      return 'var(--c-text-mid)';
  }
}
function Wh(c) {
  switch (c) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}
function nb({
  enemies: c,
  machinePosition: s = { x: 50, y: 50 },
  damageEvents: u,
  hitEvents: o,
  deathEvents: d,
  onDamageDone: f,
  onHitDone: h,
  onDeathDone: p,
  range: y,
  dummyPins: g = [],
}) {
  const _ = s.x,
    j = s.y,
    T = y * 2;
  return r.jsxs('div', {
    className: on.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: [
      r.jsx('div', {
        className: on.rangeCircle,
        style: { left: `${_}%`, top: `${j}%`, width: `${T}%` },
        'aria-hidden': !0,
      }),
      g.map((M) =>
        r.jsx(
          'div',
          {
            className: on.pin,
            style: { left: `${M.x}%`, top: `${M.y}%`, color: Wh(M.kind) },
            'aria-hidden': !0,
            children: r.jsx(Oe, {
              name: 'target',
              size: M.kind === 'boss' ? 18 : M.kind === 'elite' ? 16 : 14,
              color: Wh(M.kind),
            }),
          },
          M.id
        )
      ),
      c.map((M) => {
        const R = eb(M.kind),
          U = ab(M.kind),
          q = M.kind === 'boss' ? 32 : M.kind === 'miniboss' ? 28 : 22;
        return r.jsxs(
          'div',
          {
            className: [on.enemy, R ? on.enemyUpper : ''].filter(Boolean).join(' '),
            style: { left: `${M.position.x}%`, top: `${M.position.y}%` },
            'aria-label': `${M.kind}`,
            children: [
              r.jsx(Oe, { name: P2(M.kind), size: q, color: U }),
              R &&
                r.jsx('div', {
                  className: on.enemyHpBar,
                  children: r.jsx(I2, {
                    name: M.kind,
                    variant: tb(M.kind),
                    current: M.hp,
                    max: M.hp,
                    size: M.kind === 'boss' ? 'lg' : 'sm',
                    showValue: !1,
                  }),
                }),
            ],
          },
          M.id
        );
      }),
      r.jsxs('div', {
        className: on.machine,
        style: { left: `${_}%`, top: `${j}%` },
        'aria-label': 'マシン',
        children: [
          r.jsx('span', { className: on.machineRingOuter, 'aria-hidden': !0 }),
          r.jsx(Oe, { name: 'tower', size: 22, color: 'var(--c-primary)' }),
        ],
      }),
      u.map((M) =>
        r.jsx(
          S2,
          {
            value: Number(M.value.toString()),
            x: M.x,
            y: M.y,
            crit: M.crit,
            onDone: () => (f == null ? void 0 : f(M.id)),
          },
          M.id
        )
      ),
      o.map((M) =>
        r.jsx(N2, { x: M.x, y: M.y, onDone: () => (h == null ? void 0 : h(M.id)) }, M.id)
      ),
      d.map((M) =>
        r.jsx(A2, { x: M.x, y: M.y, onDone: () => (p == null ? void 0 : p(M.id)) }, M.id)
      ),
    ],
  });
}
const lb = '_root_1oybt_2',
  cb = '_topRow_1oybt_13',
  ib = '_weaponSlots_1oybt_21',
  sb = '_activeArea_1oybt_29',
  ub = '_activeButton_1oybt_37',
  ob = '_activeDisabled_1oybt_57',
  rb = '_modeToggle_1oybt_66',
  fb = '_modeToggleOn_1oybt_89',
  db = '_sheetToggleButton_1oybt_96',
  mb = '_bottomRow_1oybt_108',
  hb = '_currencyArea_1oybt_114',
  pb = '_speedArea_1oybt_119',
  vb = '_sysButtons_1oybt_126',
  Ht = {
    root: lb,
    topRow: cb,
    weaponSlots: ib,
    activeArea: sb,
    activeButton: ub,
    activeDisabled: ob,
    modeToggle: rb,
    modeToggleOn: fb,
    sheetToggleButton: db,
    bottomRow: mb,
    currencyArea: hb,
    speedArea: pb,
    sysButtons: vb,
  },
  yb = '_root_x9cjr_1',
  gb = '_svg_x9cjr_9',
  _b = '_track_x9cjr_15',
  bb = '_arc_x9cjr_19',
  Sb = '_center_x9cjr_28',
  xb = '_labelText_x9cjr_37',
  Ll = { root: yb, svg: gb, track: _b, arc: bb, center: Sb, labelText: xb },
  jb = { xs: 20, sm: 32, md: 48, lg: 64 },
  Ab = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  Tb = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function L0({
  value: c,
  max: s,
  size: u = 24,
  color: o = 'primary',
  thickness: d = 3,
  glow: f = !1,
  showLabel: h = !1,
  withLabel: p = !1,
  label: y,
  children: g,
}) {
  const _ = typeof u == 'number' ? u : jb[u],
    j =
      s != null
        ? Math.min(Math.max(0, c), Math.max(1, s)) / Math.max(1, s)
        : Math.min(Math.max(0, c), 100) / 100,
    T = s != null ? Math.min(Math.max(0, c), Math.max(1, s)) : c,
    M = s != null ? Math.max(1, s) : 100,
    R = Ab[o],
    U = f ? Tb[o] : void 0,
    q = _ / 2,
    Y = q - d / 2,
    K = 2 * Math.PI * Y,
    oe = K * (1 - j),
    Fe = h || p || g != null,
    Ue = y ?? `${Math.round(j * 100)}%`;
  return r.jsxs('span', {
    className: Ll.root,
    style: { width: _, height: _ },
    children: [
      r.jsxs('svg', {
        className: Ll.svg,
        width: _,
        height: _,
        viewBox: `0 0 ${_} ${_}`,
        xmlns: 'http://www.w3.org/2000/svg',
        role: 'progressbar',
        'aria-valuenow': T,
        'aria-valuemin': 0,
        'aria-valuemax': M,
        'aria-label': y ?? `${T} / ${M}`,
        children: [
          r.jsx('circle', {
            className: Ll.track,
            cx: q,
            cy: q,
            r: Y,
            fill: 'none',
            strokeWidth: d,
          }),
          r.jsx('circle', {
            className: Ll.arc,
            cx: q,
            cy: q,
            r: Y,
            fill: 'none',
            stroke: R,
            strokeWidth: d,
            strokeLinecap: 'round',
            strokeDasharray: K,
            strokeDashoffset: oe,
            style: U != null ? { filter: `drop-shadow(0 0 4px ${R})` } : void 0,
            transform: `rotate(-90 ${q} ${q})`,
          }),
        ],
      }),
      Fe &&
        r.jsx('span', {
          className: Ll.center,
          children:
            g ?? r.jsx('span', { className: Ll.labelText, style: { color: R }, children: Ue }),
        }),
    ],
  });
}
const Eb = '_root_8pbri_1',
  Nb = '_disabled_8pbri_8',
  Mb = '_segment_8pbri_13',
  zb = '_selected_8pbri_27',
  Cb = '_unselected_8pbri_33',
  Hl = {
    root: Eb,
    disabled: Nb,
    segment: Mb,
    selected: zb,
    unselected: Cb,
    'size-sm': '_size-sm_8pbri_42',
    'size-md': '_size-md_8pbri_47',
  },
  H0 = ({ options: c, value: s, onChange: u, size: o = 'md', disabled: d = !1 }) =>
    r.jsx('div', {
      className: [Hl.root, Hl[`size-${o}`], d ? Hl.disabled : ''].join(' '),
      role: 'group',
      children: c.map((f) => {
        const h = f.value === s;
        return r.jsx(
          'button',
          {
            type: 'button',
            role: 'radio',
            'aria-checked': h,
            className: [Hl.segment, h ? Hl.selected : Hl.unselected].join(' '),
            onClick: () => {
              d || u(f.value);
            },
            disabled: d,
            children: f.label,
          },
          String(f.value)
        );
      }),
    }),
  Rb = '_root_afe45_2',
  wb = '_swapDisabled_afe45_14',
  Ob = '_active_afe45_20',
  Db = '_onCd_afe45_27',
  Bb = '_iconWrap_afe45_27',
  Lb = '_cdOverlay_afe45_47',
  Hb = '_cdProgress_afe45_57',
  Ub = '_swapOverlay_afe45_68',
  fn = {
    root: Rb,
    swapDisabled: wb,
    active: Ob,
    onCd: Db,
    iconWrap: Bb,
    cdOverlay: Lb,
    cdProgress: Hb,
    swapOverlay: Ub,
  },
  qb = { sm: 40, md: 52, lg: 64 },
  Gb = { sm: 18, md: 24, lg: 30 };
function Vb({
  weapon: c,
  active: s = !1,
  ready: u = !1,
  cdProgress: o = 100,
  swapDisabled: d = !1,
  size: f = 'md',
  onClick: h,
}) {
  const p = qb[f],
    y = Gb[f],
    g = o < 100,
    _ = [fn.root, s ? fn.active : '', g ? fn.onCd : '', d ? fn.swapDisabled : '']
      .filter(Boolean)
      .join(' ');
  return r.jsxs('button', {
    type: 'button',
    className: _,
    style: { width: p, height: p, minWidth: p, minHeight: p },
    onClick: d ? void 0 : h,
    disabled: d && h == null,
    'aria-label': `${c} weapon slot${s ? ' (active)' : ''}${g ? ` (cooldown ${o}%)` : u ? ' (ready)' : ''}`,
    'aria-pressed': s,
    children: [
      r.jsx('span', {
        className: fn.iconWrap,
        children: r.jsx(Oe, {
          name: c,
          size: y,
          color: s ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      g &&
        r.jsxs(r.Fragment, {
          children: [
            r.jsx('span', { className: fn.cdOverlay, 'aria-hidden': 'true' }),
            r.jsx('span', {
              className: fn.cdProgress,
              'aria-hidden': 'true',
              children: r.jsx(L0, {
                value: o,
                max: 100,
                size: p - 4,
                color: 'cd',
                thickness: f === 'sm' ? 2 : 3,
              }),
            }),
          ],
        }),
      d && r.jsx('span', { className: fn.swapOverlay, 'aria-hidden': 'true' }),
    ],
  });
}
const Fh = ['laser', 'cannon', 'thunder', 'cutter'],
  $b = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
  ];
function kb({
  screw: c,
  equippedWeapon: s,
  weaponCds: u,
  activeCd: o,
  activeMax: d,
  isAutoActive: f,
  onSwitchWeapon: h,
  onActivate: p,
  onToggleAuto: y,
  gameSpeed: g,
  onSpeedChange: _,
  isPaused: j,
  onTogglePause: T,
  onOpenMenu: M,
  onOpenScreenSaver: R,
  isWorkshopOpen: U = !1,
  onToggleWorkshop: q,
}) {
  const Y = o > 0,
    K = f || Y,
    oe = Fh.some((be) => be !== s && (u[be] ?? 100) < 100);
  return r.jsxs('div', {
    className: Ht.root,
    children: [
      q != null &&
        r.jsx('button', {
          type: 'button',
          className: Ht.sheetToggleButton,
          onClick: q,
          'aria-expanded': U,
          'aria-label': U ? 'アップグレードを閉じる' : 'アップグレードを開く',
          children: r.jsx(Xl, { text: 'アップグレード', variant: 'info', size: 'md', glow: !0 }),
        }),
      r.jsxs('div', {
        className: Ht.topRow,
        children: [
          r.jsx('div', {
            className: Ht.weaponSlots,
            children: Fh.map((be) =>
              r.jsx(
                Vb,
                {
                  weapon: be,
                  active: be === s,
                  cdProgress: u[be] ?? 100,
                  swapDisabled: oe && be !== s,
                  size: 'md',
                  onClick: () => {
                    h(be);
                  },
                },
                be
              )
            ),
          }),
          r.jsxs('div', {
            className: Ht.activeArea,
            children: [
              r.jsx('button', {
                type: 'button',
                className: [Ht.activeButton, K ? Ht.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: K ? void 0 : p,
                disabled: K,
                'aria-label': `アクティブスキル発動${Y ? ' (クールダウン中)' : f ? ' (自動モード)' : ''}`,
                children: r.jsx(L0, {
                  value: Y ? o : d,
                  max: d > 0 ? d : 1,
                  size: 64,
                  color: Y ? 'cd' : 'primary',
                  glow: !Y && !f,
                  thickness: 4,
                  children: r.jsx(Oe, {
                    name: 'lightning',
                    size: 26,
                    color: K ? 'var(--c-text-disabled)' : 'var(--c-secondary)',
                  }),
                }),
              }),
              r.jsx('button', {
                type: 'button',
                className: [Ht.modeToggle, f ? Ht.modeToggleOn : ''].filter(Boolean).join(' '),
                onClick: () => y(!f),
                'aria-pressed': f,
                'aria-label': f
                  ? 'アクティブスキルを手動モードに切り替え'
                  : 'アクティブスキルを自動モードに切り替え',
                children: f ? 'AUTO' : 'MANUAL',
              }),
            ],
          }),
        ],
      }),
      r.jsxs('div', {
        className: Ht.bottomRow,
        children: [
          r.jsx('div', {
            className: Ht.currencyArea,
            children: r.jsx(Zl, { currency: 'screw', value: c, size: 'lg' }),
          }),
          r.jsx('div', {
            className: Ht.speedArea,
            children: r.jsx(H0, { options: $b, value: g, onChange: _, size: 'sm' }),
          }),
          r.jsxs('div', {
            className: Ht.sysButtons,
            children: [
              r.jsx(Fc, {
                icon: j ? 'play' : 'pause',
                label: j ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: j,
                onClick: T,
              }),
              r.jsx(Fc, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: M,
              }),
              r.jsx(Fc, {
                icon: 'ice',
                label: 'スクリーンセーバーを起動',
                size: 'md',
                variant: 'ghost',
                onClick: R,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const Yb = '_root_1y4n6_3',
  Zb = '_headerRow_1y4n6_13',
  Xb = '_hpValue_1y4n6_21',
  Qb = '_hpDivider_1y4n6_31',
  Kb = '_shieldBlock_1y4n6_36',
  Jb = '_srOnly_1y4n6_44',
  Ul = { root: Yb, headerRow: Zb, hpValue: Xb, hpDivider: Qb, shieldBlock: Kb, srOnly: Jb },
  Wb = '_root_1r2fw_2',
  Fb = '_boss_1r2fw_10',
  Ib = '_header_1r2fw_16',
  Pb = '_milestone_1r2fw_23',
  eS = '_milestoneText_1r2fw_30',
  tS = '_seconds_1r2fw_40',
  aS = '_waveLabel_1r2fw_50',
  Un = {
    root: Wb,
    boss: Fb,
    header: Ib,
    milestone: Pb,
    milestoneText: eS,
    seconds: tS,
    'size-sm': '_size-sm_1r2fw_46',
    waveLabel: aS,
    'size-md': '_size-md_1r2fw_54',
    'size-lg': '_size-lg_1r2fw_58',
  },
  nS = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  };
function lS({
  waveNumber: c,
  secondsLeft: s,
  secondsMax: u,
  nextMilestone: o,
  showSeconds: d = !0,
  size: f = 'md',
}) {
  const h = (o == null ? void 0 : o.kind) === 'boss',
    p = o != null ? nS[o.kind] : null;
  return r.jsxs('div', {
    className: [Un.root, Un[`size-${f}`], h ? Un.boss : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Un.header,
        children: [
          r.jsx(Xl, { text: `WAVE ${c}`, variant: 'tier' }),
          p != null &&
            o != null &&
            r.jsxs('span', {
              className: Un.milestone,
              style: { color: p.color },
              children: [
                r.jsx(Oe, { name: p.iconName, size: 12, color: p.color }),
                r.jsxs('span', { className: Un.milestoneText, children: [p.label, ' @', o.wave] }),
              ],
            }),
          d &&
            r.jsx('span', {
              className: Un.seconds,
              children: r.jsxs(G, { variant: 'numeric-s', color: 'mid', children: [s, 's'] }),
            }),
        ],
      }),
      r.jsx(Es, {
        value: s,
        max: Math.max(1, u),
        color: h ? 'secondary' : 'wave',
        size: f === 'lg' ? 'md' : 'sm',
        glow: h,
      }),
    ],
  });
}
function cS({
  hpCurrent: c,
  hpMax: s,
  shieldCurrent: u,
  shieldMax: o,
  tier: d,
  wave: f,
  totalWaves: h,
  secondsRemaining: p,
  secondsTotal: y,
  isBossWave: g = !1,
  nextMilestone: _,
  damaging: j = !1,
}) {
  const T = _ ?? (g ? { wave: f, kind: 'boss' } : void 0),
    M = u != null && o != null,
    R = Ih(c, s),
    U = M ? Ih(u, o) : 0;
  return r.jsxs('div', {
    className: Ul.root,
    role: 'group',
    'aria-label': 'バトル状態',
    children: [
      r.jsxs('div', {
        className: Ul.headerRow,
        children: [
          r.jsx(Xl, { variant: 'tier', tier: d, size: 'md', glow: !0 }),
          r.jsx(G, { variant: 'label', color: 'dim', style: { fontSize: 10 }, children: 'HP' }),
          r.jsxs('span', {
            className: Ul.hpValue,
            'aria-label': `HP ${c.toDisplay()} / ${s.toDisplay()}`,
            children: [
              r.jsx(vn, {
                value: c,
                size: 'sm',
                accentColor: j ? 'danger' : 'text',
                glow: j,
                style: { fontSize: 14 },
              }),
              r.jsx('span', { className: Ul.hpDivider, children: '/' }),
              r.jsx(vn, { value: s, size: 'sm', accentColor: 'dim', style: { fontSize: 11 } }),
            ],
          }),
          M &&
            r.jsxs('span', {
              className: Ul.shieldBlock,
              children: [
                r.jsx(G, {
                  variant: 'label',
                  color: 'primary',
                  style: { fontSize: 9.5 },
                  children: 'SHLD',
                }),
                r.jsx(vn, {
                  value: u,
                  size: 'sm',
                  accentColor: 'primary',
                  style: { fontSize: 11 },
                }),
              ],
            }),
        ],
      }),
      r.jsx(Es, { value: R, max: 100, color: R <= 30 ? 'hp-low' : 'hp', size: 'md' }),
      M && r.jsx(Es, { value: U, max: 100, color: 'shield', size: 'sm' }),
      r.jsx(lS, {
        waveNumber: f,
        secondsLeft: p,
        secondsMax: y,
        nextMilestone: T,
        showSeconds: !1,
        size: 'sm',
      }),
      r.jsxs('span', { className: Ul.srOnly, 'aria-hidden': 'false', children: [f, '/', h] }),
    ],
  });
}
function Ih(c, s) {
  const u = parseFloat(c.toString()),
    o = parseFloat(s.toString());
  return o === 0 ? 0 : Math.max(0, Math.min(100, (u / o) * 100));
}
const iS = '_card_1o3jz_1',
  sS = '_header_1o3jz_8',
  uS = '_soundSection_1o3jz_13',
  oS = '_sliderRow_1o3jz_19',
  rS = '_sliderLabel_1o3jz_26',
  fS = '_sliderValue_1o3jz_31',
  dS = '_divider_1o3jz_38',
  mS = '_actions_1o3jz_44',
  na = {
    card: iS,
    header: sS,
    soundSection: uS,
    sliderRow: oS,
    sliderLabel: rS,
    sliderValue: fS,
    divider: dS,
    actions: mS,
  },
  hS = '_button_10kfo_1',
  pS = '_fullWidth_10kfo_109',
  vS = '_iconLeft_10kfo_113',
  yS = '_iconRight_10kfo_114',
  gS = '_label_10kfo_120',
  qn = {
    button: hS,
    'variant-primary': '_variant-primary_10kfo_28',
    'variant-secondary': '_variant-secondary_10kfo_42',
    'variant-danger': '_variant-danger_10kfo_56',
    'variant-ghost': '_variant-ghost_10kfo_70',
    'size-sm': '_size-sm_10kfo_85',
    'size-md': '_size-md_10kfo_93',
    'size-lg': '_size-lg_10kfo_101',
    fullWidth: pS,
    iconLeft: vS,
    iconRight: yS,
    label: gS,
  };
function Ut({
  label: c,
  variant: s = 'primary',
  size: u = 'md',
  fullWidth: o = !1,
  iconLeft: d,
  iconRight: f,
  disabled: h = !1,
  onClick: p,
  type: y = 'button',
}) {
  return r.jsxs('button', {
    type: y,
    className: [qn.button, qn[`variant-${s}`], qn[`size-${u}`], o ? qn.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: p,
    'aria-disabled': h,
    children: [
      d != null && r.jsx('span', { className: qn.iconLeft, 'aria-hidden': 'true', children: d }),
      r.jsx('span', { className: qn.label, children: c }),
      f != null && r.jsx('span', { className: qn.iconRight, 'aria-hidden': 'true', children: f }),
    ],
  });
}
const _S = '_overlay_1i1z1_12',
  bS = '_fullscreen_1i1z1_21',
  SS = '_absolute_1i1z1_27',
  xS = '_alignCenter_1i1z1_33',
  jS = '_alignTop_1i1z1_38',
  AS = '_alignBottom_1i1z1_44',
  TS = '_content_1i1z1_50',
  kn = {
    overlay: _S,
    fullscreen: bS,
    absolute: SS,
    alignCenter: xS,
    alignTop: jS,
    alignBottom: AS,
    content: TS,
  },
  ES = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Ph = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  NS = { center: kn.alignCenter, top: kn.alignTop, bottom: kn.alignBottom };
function Tr({
  fullscreen: c = !0,
  children: s,
  onClose: u,
  dismissible: o = !0,
  dimLevel: d = 'normal',
  blur: f = 0,
  align: h = 'center',
  zIndex: p = 'overlay',
  style: y,
  open: g,
}) {
  const _ = () => {
      o && u && u();
    },
    j = (U) => {
      U.stopPropagation();
    },
    T = ES[d],
    M = typeof p == 'number' ? p : (Ph[p] ?? Ph.overlay),
    R = {
      background: `rgba(2, 4, 10, ${T})`,
      zIndex: M,
      ...(f > 0 ? { backdropFilter: `blur(${f}px)` } : {}),
      ...y,
    };
  return r.jsx('div', {
    className: [kn.overlay, c ? kn.fullscreen : kn.absolute, NS[h]].join(' '),
    style: R,
    onClick: _,
    role: 'presentation',
    'aria-modal': 'true',
    children: r.jsx('div', { className: kn.content, onClick: j, children: s }),
  });
}
const MS = '_wrapper_131tr_1',
  zS = '_disabled_131tr_5',
  CS = '_input_131tr_18',
  Ss = {
    wrapper: MS,
    disabled: zS,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: CS,
  },
  dr = ({
    value: c,
    min: s = 0,
    max: u = 1,
    step: o = 0.01,
    onChange: d,
    color: f = 'primary',
    disabled: h = !1,
  }) => {
    const p = u === s ? 0 : ((c - s) / (u - s)) * 100,
      y = (_) => {
        h || d(parseFloat(_.target.value));
      },
      g = { '--slider-fill-pct': `${p}%` };
    return r.jsx('div', {
      className: [Ss.wrapper, Ss[`color-${f}`], h ? Ss.disabled : ''].join(' '),
      style: g,
      children: r.jsx('input', {
        type: 'range',
        className: Ss.input,
        min: s,
        max: u,
        step: o,
        value: c,
        onChange: y,
        disabled: h,
        'aria-valuenow': c,
        'aria-valuemin': s,
        'aria-valuemax': u,
      }),
    });
  },
  RS = '_dialog_49iek_13',
  wS = '_card_49iek_20',
  OS = '_titleRow_49iek_27',
  DS = '_titleIcon_49iek_33',
  BS = '_title_49iek_27',
  LS = '_message_49iek_46',
  HS = '_actions_49iek_50',
  US = '_variantDanger_49iek_57',
  dn = {
    dialog: RS,
    card: wS,
    titleRow: OS,
    titleIcon: DS,
    title: BS,
    message: LS,
    actions: HS,
    variantDanger: US,
  };
function U0({
  open: c,
  title: s,
  message: u,
  iconName: o,
  confirmLabel: d = '確定',
  cancelLabel: f = 'キャンセル',
  onConfirm: h,
  onCancel: p,
  variant: y = 'default',
}) {
  return c
    ? r.jsx(Tr, {
        open: c,
        onClose: p,
        dismissible: !0,
        children: r.jsx('div', {
          className: [dn.dialog, y === 'danger' ? dn.variantDanger : ''].filter(Boolean).join(' '),
          children: r.jsxs(Kn, {
            variant: 'elevated',
            padding: 'lg',
            className: dn.card,
            children: [
              r.jsxs('div', {
                className: dn.titleRow,
                children: [
                  o != null &&
                    r.jsx('span', {
                      className: dn.titleIcon,
                      'aria-hidden': 'true',
                      children: r.jsx(Oe, {
                        name: o,
                        size: 20,
                        color: y === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  r.jsx(G, { variant: 'heading-3', as: 'h2', className: dn.title, children: s }),
                ],
              }),
              u != null &&
                u.length > 0 &&
                r.jsx(G, { variant: 'body', color: 'mid', className: dn.message, children: u }),
              r.jsxs('div', {
                className: dn.actions,
                children: [
                  r.jsx(Ut, { label: f, variant: 'ghost', fullWidth: !0, onClick: p }),
                  r.jsx(Ut, {
                    label: d,
                    variant: y === 'danger' ? 'danger' : 'primary',
                    fullWidth: !0,
                    onClick: h,
                  }),
                ],
              }),
            ],
          }),
        }),
      })
    : null;
}
function qS({
  open: c,
  bgmVolume: s,
  seVolume: u,
  onBgmChange: o,
  onSeChange: d,
  onRetreat: f,
  onClose: h,
}) {
  const [p, y] = te.useState(!1);
  if (!c) return null;
  const g = () => {
      y(!0);
    },
    _ = () => {
      (y(!1), f());
    },
    j = () => {
      y(!1);
    };
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx(Tr, {
        open: c,
        onClose: h,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !p,
        children: r.jsxs(Kn, {
          variant: 'elevated',
          padding: 'lg',
          className: na.card,
          children: [
            r.jsx('div', {
              className: na.header,
              children: r.jsx(G, {
                variant: 'heading-2',
                as: 'h2',
                align: 'center',
                children: 'メニュー',
              }),
            }),
            r.jsxs('div', {
              className: na.soundSection,
              children: [
                r.jsxs('div', {
                  className: na.sliderRow,
                  children: [
                    r.jsx(G, {
                      variant: 'label',
                      color: 'mid',
                      className: na.sliderLabel,
                      children: 'BGM',
                    }),
                    r.jsx(G, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: na.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(dr, { value: s, min: 0, max: 1, step: 0.01, onChange: o, color: 'primary' }),
                r.jsxs('div', {
                  className: na.sliderRow,
                  children: [
                    r.jsx(G, {
                      variant: 'label',
                      color: 'mid',
                      className: na.sliderLabel,
                      children: 'SE',
                    }),
                    r.jsx(G, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: na.sliderValue,
                      children: Math.round(u * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(dr, { value: u, min: 0, max: 1, step: 0.01, onChange: d, color: 'primary' }),
              ],
            }),
            r.jsx('div', { className: na.divider, role: 'separator' }),
            r.jsxs('div', {
              className: na.actions,
              children: [
                r.jsx(Ut, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: g }),
                r.jsx(Ut, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: h }),
              ],
            }),
          ],
        }),
      }),
      r.jsx(U0, {
        open: p,
        title: '撤退しますか？',
        message: 'バトルを終了して撤退します。獲得リソースはリザルト画面で確認できます。',
        confirmLabel: '撤退する',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: _,
        onCancel: j,
      }),
    ],
  });
}
const GS = '_card_1fzt0_2',
  VS = '_header_1fzt0_14',
  $S = '_statusText_1fzt0_19',
  kS = '_section_1fzt0_23',
  YS = '_sectionTitle_1fzt0_29',
  ZS = '_statsGrid_1fzt0_35',
  XS = '_statItem_1fzt0_41',
  QS = '_rewardList_1fzt0_52',
  KS = '_rewardCurrency_1fzt0_58',
  JS = '_patchList_1fzt0_66',
  WS = '_patchItem_1fzt0_72',
  FS = '_actions_1fzt0_87',
  ct = {
    card: GS,
    header: VS,
    statusText: $S,
    section: kS,
    sectionTitle: YS,
    statsGrid: ZS,
    statItem: XS,
    rewardList: QS,
    rewardCurrency: KS,
    patchList: JS,
    patchItem: WS,
    actions: FS,
  },
  IS = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  PS = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function ex(c) {
  const s = Math.floor(c / 60),
    u = Math.floor(c % 60);
  return `${s.toString().padStart(2, '0')}:${u.toString().padStart(2, '0')}`;
}
function tx({
  open: c,
  status: s,
  reachedTier: u,
  reachedWave: o,
  killed: d,
  elapsedSec: f,
  reward: h,
  onClose: p,
}) {
  if (!c) return null;
  const y = IS[s],
    g = PS[s];
  return r.jsx(Tr, {
    open: c,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: r.jsxs(Kn, {
      variant: 'elevated',
      padding: 'lg',
      className: ct.card,
      children: [
        r.jsx('div', {
          className: ct.header,
          children: r.jsx(G, {
            variant: 'heading-1',
            as: 'h2',
            color: g,
            align: 'center',
            className: ct.statusText,
            children: y,
          }),
        }),
        r.jsxs('div', {
          className: ct.section,
          children: [
            r.jsx(G, {
              variant: 'label',
              color: 'mid',
              className: ct.sectionTitle,
              children: 'バトル記録',
            }),
            r.jsxs('div', {
              className: ct.statsGrid,
              children: [
                r.jsxs('div', {
                  className: ct.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: u.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: ct.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: o.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: ct.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: d.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: ct.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: ex(f) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        r.jsxs('div', {
          className: ct.section,
          children: [
            r.jsx(G, {
              variant: 'label',
              color: 'mid',
              className: ct.sectionTitle,
              children: '獲得',
            }),
            r.jsxs('div', {
              className: ct.rewardList,
              children: [
                r.jsx('div', {
                  className: ct.rewardCurrency,
                  children: r.jsx(Zl, { currency: 'bolt', value: h.bolt, size: 'lg' }),
                }),
                r.jsx('div', {
                  className: ct.rewardCurrency,
                  children: r.jsx(Zl, { currency: 'alloy', value: h.alloy, size: 'lg' }),
                }),
                h.patches.length > 0 &&
                  r.jsx('div', {
                    className: ct.patchList,
                    children: h.patches.map((_, j) =>
                      r.jsxs(
                        'div',
                        {
                          className: ct.patchItem,
                          children: [
                            r.jsx(G, { variant: 'body', truncate: !0, children: _.name }),
                            r.jsxs(G, {
                              variant: 'caption',
                              color: 'mid',
                              children: ['Tier ', _.tier.toString()],
                            }),
                            r.jsxs(G, {
                              variant: 'numeric-s',
                              color: 'secondary',
                              children: ['x', _.count.toString()],
                            }),
                          ],
                        },
                        j
                      )
                    ),
                  }),
                h.patches.length === 0 &&
                  r.jsx(G, { variant: 'caption', color: 'dim', children: 'パッチドロップなし' }),
              ],
            }),
          ],
        }),
        r.jsx('div', {
          className: ct.actions,
          children: r.jsx(Ut, {
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
const ax = '_root_1tank_3',
  nx = '_inner_1tank_20',
  lx = '_header_1tank_28',
  cx = '_headerText_1tank_35',
  ix = '_grid_1tank_44',
  Xc = { root: ax, inner: nx, header: lx, headerText: cx, grid: ix };
function sx({ open: c, screw: s, levels: u, onUpgrade: o, onClose: d }) {
  return c
    ? r.jsx('section', {
        className: Xc.root,
        role: 'dialog',
        'aria-modal': 'false',
        'aria-label': 'ラン中ワークショップ',
        children: r.jsxs('div', {
          className: Xc.inner,
          children: [
            r.jsxs('div', {
              className: Xc.header,
              children: [
                r.jsxs('div', {
                  className: Xc.headerText,
                  children: [
                    r.jsx(G, {
                      variant: 'heading-3',
                      style: { fontSize: 14, lineHeight: 1.2 },
                      children: 'ラン中ワークショップ',
                    }),
                    r.jsx(G, {
                      variant: 'caption',
                      color: 'dim',
                      style: { fontSize: 10.5 },
                      children: 'ラン終了で全リセット',
                    }),
                  ],
                }),
                r.jsx(Zl, { currency: 'screw', value: s, size: 'md' }),
                d != null &&
                  r.jsx(Fc, {
                    icon: 'chevron-down',
                    label: '閉じる',
                    variant: 'ghost',
                    size: 'sm',
                    onClick: d,
                  }),
              ],
            }),
            r.jsx('div', {
              className: Xc.grid,
              children: N0.map((f) => {
                const h = u[f.key],
                  p = Yn(h),
                  y = Yn(h + 1),
                  g = Sr(f, h),
                  _ = M0(f, h, 5),
                  { totalCost: j, lvDelta: T } = z0(f, h, s),
                  M = F.fromNumber(g),
                  R = F.fromNumber(_),
                  U = s.gte(M),
                  q = s.gte(R),
                  Y = T > 0;
                return r.jsx(
                  jr,
                  {
                    title: f.title,
                    iconName: f.iconName,
                    currentLabel: `Lv ${h}`,
                    before: Math.round(p * 10) / 10,
                    after: Math.round(y * 10) / 10,
                    beforeSuffix: '×',
                    currency: 'screw',
                    accent: 'warning',
                    options: [
                      { amount: '+1', cost: M, disabled: !U },
                      { amount: '+5', cost: R, disabled: !q },
                      { amount: 'MAX', cost: j, disabled: !Y },
                    ],
                    onUpgrade: (K) => {
                      K === '+1'
                        ? o(f.key, 1)
                        : K === '+5'
                          ? o(f.key, 5)
                          : K === 'MAX' && o(f.key, 'max');
                    },
                  },
                  f.key
                );
              }),
            }),
          ],
        }),
      })
    : null;
}
const ux = '_root_9fvdn_2',
  ox = { root: ux },
  lr = [
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
function rx({ items: c = [], showTower: s = !1, towerContent: u = null, cycleSeconds: o = 24 }) {
  const f = `ssfx-${te.useId().replace(/:/g, '')}`,
    h = lr.map((j, T) => {
      const M = 100 / j.length,
        R = j
          .map(([U, q], Y) => {
            const K = Y * M;
            return `
          ${K}%               { left: ${U}%; top: ${q}%; opacity: 0; }
          ${(K + 3).toFixed(2)}%   { left: ${U}%; top: ${q}%; opacity: 1; }
          ${(K + M - 7).toFixed(2)}%  { left: ${U}%; top: ${q}%; opacity: 1; }
          ${(K + M - 3).toFixed(2)}%  { left: ${U}%; top: ${q}%; opacity: 0; }
        `;
          })
          .join('');
      return `@keyframes ${f}-drift-${T + 1} { ${R} 100% { opacity: 0; } }`;
    }).join(`
`),
    p = lr.map(
      (j, T) => `.${f}-p${T + 1} { animation: ${f}-drift-${T + 1} ${o}s linear infinite; }`
    ).join(`
`),
    y = `
    .${f}-slot {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
      will-change: left, top, opacity;
    }
    ${p}
    ${h}

    /* tower composite (rings + glow pulse + slow rotation) */
    @keyframes ${f}-rot   { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
    @keyframes ${f}-rot-r { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    @keyframes ${f}-pulse {
      0%, 100% { transform: scale(1);    opacity: 1; }
      50%      { transform: scale(1.08); opacity: 0.85; }
    }
    @keyframes ${f}-glow {
      0%, 100% { filter: drop-shadow(0 0 8px rgba(78,228,246,0.55)) drop-shadow(0 0 16px rgba(78,228,246,0.25)); }
      50%      { filter: drop-shadow(0 0 14px rgba(78,228,246,0.85)) drop-shadow(0 0 32px rgba(78,228,246,0.5)); }
    }
    .${f}-tower {
      position: relative;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .${f}-tower-r1 {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 1px solid var(--c-primary);
      box-shadow: var(--glow-cyan-md), inset 0 0 32px rgba(78,228,246,0.18);
      animation: ${f}-rot 18s linear infinite;
    }
    .${f}-tower-r2 {
      position: absolute;
      inset: 14px;
      border-radius: 50%;
      border: 1px dashed rgba(169,107,255,0.6);
      animation: ${f}-rot-r 24s linear infinite;
    }
    .${f}-tower-core {
      color: var(--c-primary-hi);
      animation: ${f}-pulse 3.6s var(--ease-default) infinite, ${f}-glow 3.6s var(--ease-default) infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .${f}-slot { animation: none !important; opacity: 0.55 !important; }
      .${f}-slot:not(.${f}-rm-show) { display: none; }
      .${f}-rm-show { position: relative; transform: none; left: auto; top: auto; }
      .${f}-tower-r1, .${f}-tower-r2, .${f}-tower-core { animation: none !important; }
    }
  `,
    g = r.jsxs('div', {
      className: `${f}-tower`,
      children: [
        r.jsx('div', { className: `${f}-tower-r1` }),
        r.jsx('div', { className: `${f}-tower-r2` }),
        r.jsx('div', { className: `${f}-tower-core`, children: u }),
      ],
    }),
    _ = s ? [g, ...c] : [...c];
  return r.jsxs('div', {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    'data-screen-saver-fx': f,
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: y } }),
      _.map((j, T) => {
        const M = (T % lr.length) + 1,
          R = -(T * (o / Math.max(_.length, 1)));
        return r.jsx(
          'div',
          {
            className: `${f}-slot ${f}-p${M}${T === 0 ? ` ${f}-rm-show` : ''}`,
            style: { animationDelay: `${R}s` },
            children: j,
          },
          T
        );
      }),
    ],
  });
}
function fx({ open: c, onClose: s }) {
  return c
    ? r.jsx('div', {
        className: ox.root,
        onClick: s,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (u) => {
          (u.key === 'Enter' || u.key === ' ') && s();
        },
        children: r.jsx(rx, {
          showTower: !0,
          towerContent: r.jsx(Oe, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
function q0(c, s) {
  if (c.isZero()) return F.ZERO;
  if (s <= 0) return c;
  if (s >= 1) return F.ZERO;
  const u = 1 - s;
  return c.mulNumber(u);
}
function Os(c, s) {
  return c <= 0 ? !1 : c >= 1 ? !0 : s() < c;
}
function Ds(c, s, u) {
  const { machine: o, weapon: d, isCrit: f } = c;
  let h = o.baseAttack.mulNumber(d.damageMultiplier);
  f && (h = h.mulNumber(o.critMultiplier));
  const p = h.sub(s),
    y = q0(p, u);
  return { rawDmg: h, finalDmg: y, isCrit: f };
}
function dx(c, s) {
  const u = c.sub(s.defense);
  return q0(u, s.damageReduction);
}
const e0 = 50,
  t0 = 50;
function mx(c, s) {
  const u = e0 - c.position.x,
    o = t0 - c.position.y,
    d = Math.sqrt(u * u + o * o);
  if (d <= 0) return c;
  const f = c.speed * s;
  if (f <= 0) return c;
  if (f >= d) return { ...c, position: { x: e0, y: t0 } };
  const h = f / d;
  return { ...c, position: { x: c.position.x + u * h, y: c.position.y + o * h } };
}
const hx = 10,
  px = 0.05,
  vx = 1.5;
function a0({ machineMaxHp: c }) {
  return {
    baseAttack: F.fromNumber(hx),
    defense: F.ZERO,
    damageReduction: 0,
    critRate: px,
    critMultiplier: vx,
    maxHp: c.isZero() ? F.fromNumber(1) : c,
    hpRegen: F.ZERO,
  };
}
const yx = 0.5,
  gx = 30,
  _x = 25,
  bx = 5,
  Sx = 20;
function G0(c) {
  const s = Math.max(0, Math.floor(c)),
    u = Math.pow(1.02, s),
    o = Math.min(10, yx * (1 + 0.03 * s)),
    d = gx + 0.5 * s,
    f = Sx * (1 + 0.05 * s);
  return {
    attackPerSec: o,
    splashRadius: d,
    damageMul: u,
    volleyCdSec: _x,
    volleyDamageMul: f,
    volleyShots: bx,
  };
}
function cr(c, s, u, o) {
  const d = c - u,
    f = s - o;
  return Math.sqrt(d * d + f * f);
}
function xx(c, s, u, o) {
  if (u.length === 0) return { hits: [], blastX: 0, blastY: 50 };
  const d = 0,
    f = 50;
  let h = u[0],
    p = cr(d, f, h.position.x, h.position.y);
  for (let T = 1; T < u.length; T++) {
    const M = u[T],
      R = cr(d, f, M.position.x, M.position.y);
    R > p && ((p = R), (h = M));
  }
  const y = h.position.x,
    g = h.position.y,
    _ = Os(c.critRate, o),
    j = [];
  for (const T of u)
    if (cr(y, g, T.position.x, T.position.y) <= s.splashRadius) {
      const R = Ds({ machine: c, weapon: { damageMultiplier: s.damageMul }, isCrit: _ }, F.ZERO, 0);
      j.push({ enemyId: T.id, damage: R.finalDmg, crit: _ });
    }
  return { hits: j, blastX: y, blastY: g };
}
function V0(c) {
  const d = 2 * (1 + 0.03 * c),
    f = 80 + 0.5 * c,
    h = Math.floor(1 + 0.05 * c),
    p = Math.pow(1.02, c);
  return {
    attackPerSec: d,
    orbitRadius: f,
    simultaneousHits: h,
    damageMul: p,
    overdriveCdSec: jx,
    overdriveDurationSec: Ax,
    overdriveAttackSpeedMul: Tx,
    overdriveDamageMul: 1,
  };
}
const jx = 35,
  Ax = 8,
  Tx = 3;
function Ex(c, s, u, o, d) {
  const h = u.slice(0, s.simultaneousHits).map((y) => {
      const g = Os(c.critRate, d),
        _ = Ds({ machine: c, weapon: { damageMultiplier: s.damageMul }, isCrit: g }, F.ZERO, 0);
      return { enemyId: y.id, damage: _.finalDmg, crit: g };
    }),
    p = (o + 360 / s.attackPerSec) % 360;
  return { hits: h, angle: p };
}
function $0(c) {
  const s = Math.max(0, c),
    u = 1 * (1 + 0.03 * s),
    o = Math.floor(1 + 0.1 * s),
    d = Math.pow(1.02, s),
    f = 10 * (1 + 0.05 * s);
  return { attackPerSec: u, pierce: o, damageMul: d, megaCdSec: Nx, megaDamageMul: f };
}
const Nx = 20;
function Mx(c, s, u, o) {
  if (u.length === 0) return { hits: [], beamX: 0, beamY: 0 };
  const d = u.slice(0, s.pierce),
    f = d.map((g) => {
      const _ = Os(c.critRate, o),
        j = Ds({ machine: c, weapon: { damageMultiplier: s.damageMul }, isCrit: _ }, F.ZERO, 0);
      return { enemyId: g.id, damage: j.finalDmg, crit: _ };
    }),
    h = d[d.length - 1],
    p = h.position.x,
    y = h.position.y;
  return { hits: f, beamX: p, beamY: y };
}
const zx = 3,
  Cx = 0.9,
  Rx = 30;
function k0(c) {
  const s = Math.max(0, c),
    u = Math.pow(1.02, s),
    o = Math.min(10, 0.7 * (1 + 0.03 * s)),
    d = 15 * (1 + 0.05 * s);
  return {
    attackPerSec: o,
    chainCount: zx,
    chainFalloff: Cx,
    damageMul: u,
    plasmaCdSec: Rx,
    plasmaDamageMul: d,
  };
}
function wx(c, s, u, o) {
  if (u.length === 0) return { hits: [], path: [] };
  const d = u.slice(0, s.chainCount),
    f = [],
    h = [];
  for (let p = 0; p < d.length; p++) {
    const y = d[p],
      g = Math.pow(s.chainFalloff, p),
      _ = s.damageMul * g,
      j = Os(c.critRate, o),
      T = Ds({ machine: c, weapon: { damageMultiplier: _ }, isCrit: j }, F.ZERO, 0);
    (f.push({ enemyId: y.id, damage: T.finalDmg, crit: j }),
      h.push({ x: y.position.x, y: y.position.y }));
  }
  return { hits: f, path: h };
}
function Ox(c, s) {
  switch (c) {
    case 'laser':
      return $0(s).attackPerSec;
    case 'cannon':
      return G0(s).attackPerSec;
    case 'thunder':
      return k0(s).attackPerSec;
    case 'cutter':
      return V0(s).attackPerSec;
  }
}
function Dx({
  weapon: c,
  weaponLv: s,
  machine: u,
  enemiesInRange: o,
  rng: d,
  cutterAngleDeg: f = 0,
  attackMul: h,
}) {
  switch (c) {
    case 'laser': {
      const p = $0(s),
        y = { ...p, damageMul: p.damageMul * h };
      return {
        hits: Mx(u, y, o, d).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cannon': {
      const p = G0(s),
        y = { ...p, damageMul: p.damageMul * h };
      return {
        hits: xx(u, y, o, d).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'thunder': {
      const p = k0(s),
        y = { ...p, damageMul: p.damageMul * h };
      return {
        hits: wx(u, y, o, d).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cutter': {
      const p = V0(s),
        y = { ...p, damageMul: p.damageMul * h };
      return {
        hits: Ex(u, y, o, f, d).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
  }
}
const Xn = { HP: 10, ATK: 2, SPD: 10, SPAWN_INTERVAL: 2, HP_GROWTH: 1.8, ATK_GROWTH: 1.4 };
function Bx(c) {
  return c <= 10
    ? 1 + 0.074 * (c - 1)
    : c <= 20
      ? 1 + 0.074 * 9 + 0.133 * (c - 10)
      : 1 + 0.074 * 9 + 0.133 * 10 + 0.2 * (c - 20);
}
function Lx(c) {
  return c <= 10
    ? 1 + 0.037 * (c - 1)
    : c <= 20
      ? 1 + 0.037 * 9 + 0.067 * (c - 10)
      : 1 + 0.037 * 9 + 0.067 * 10 + 0.1 * (c - 20);
}
function Hx(c) {
  return c <= 10
    ? 1 + 0.019 * (c - 1)
    : c <= 20
      ? 1 + 0.019 * 9 + 0.033 * (c - 10)
      : 1 + 0.019 * 9 + 0.033 * 10 + 0.05 * (c - 20);
}
function Ux(c) {
  let s = F.fromNumber(Xn.HP);
  for (let u = 1; u < c; u++) s = s.mulNumber(Xn.HP_GROWTH);
  return s;
}
function qx(c) {
  let s = F.fromNumber(Xn.ATK);
  for (let u = 1; u < c; u++) s = s.mulNumber(Xn.ATK_GROWTH);
  return s;
}
const Gx = { standard: 1, swift: 0.6, tough: 5 },
  Vx = { standard: 1, swift: 0.5, tough: 1 },
  $x = { standard: 1, swift: 2, tough: 0.5 },
  kx = { elite: 10, miniboss: 50, boss: 250 },
  Yx = { elite: 2.5, miniboss: 5, boss: 8 },
  Zx = {
    elite: { screw: 10, bolt: 10, alloyChance: 0.3, alloyAmount: 1 },
    miniboss: { screw: 50, bolt: 50, alloyChance: 1, alloyAmount: 1 },
    boss: { screw: 250, bolt: 250, alloyChance: 1, alloyAmount: 5 },
  },
  Xx = { standard: 1, swift: 2, tough: 5 },
  Qx = { standard: 1, swift: 2, tough: 5 };
function n0(c, s, u, o) {
  const d = Ux(c),
    f = qx(c),
    h = Bx(s),
    p = Lx(s);
  if (u === 'normal') {
    const M = o ?? 'standard',
      R = d.mulNumber(Gx[M]).mulNumber(h),
      U = f.mulNumber(Vx[M]).mulNumber(p),
      q = Xn.SPD * $x[M];
    return {
      kind: 'normal',
      subtype: M,
      hp: R,
      atk: U,
      speed: q,
      reward: { screw: Xx[M], bolt: Qx[M], alloyChance: 0, alloyAmount: 0 },
    };
  }
  const y = u,
    g = d.mulNumber(kx[y]).mulNumber(h),
    _ = f.mulNumber(Yx[y]).mulNumber(p),
    j = Xn.SPD,
    T = Zx[y];
  return { kind: u, hp: g, atk: _, speed: j, reward: { ...T } };
}
function l0(c, s, u, o) {
  const d = o() < 0.5 ? 0 : 100,
    f = o() * 100;
  return { ...c, id: s, spawnedAtMs: u, position: { x: d, y: f } };
}
const Kx = 30,
  Jx = 26;
function Wx(c) {
  return c <= 4
    ? [{ subtype: 'standard', weight: 1 }]
    : c <= 9
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
function Fx(c) {
  const s = [];
  for (let u = 1; u <= Kx; u++) {
    const o = Hx(u),
      d = Xn.SPAWN_INTERVAL / o,
      f = Wx(u);
    let h;
    (u === 5 || u === 15 || u === 25
      ? (h = 'elite')
      : u === 10 || u === 20
        ? (h = 'miniboss')
        : u === 30 && (h = 'boss'),
      s.push({
        waveIndex: u,
        tier: c,
        durationSec: Jx,
        spawnIntervalSec: d,
        normalSpawnTable: f,
        eliteKind: h,
      }));
  }
  return s;
}
function Ix(c, s, u, o, d) {
  const f = [],
    h = s / 1e3,
    p = u / 1e3,
    y = Math.floor(h / c.spawnIntervalSec),
    g = Math.floor(p / c.spawnIntervalSec),
    _ = y - g;
  for (let M = 0; M < _; M++) {
    const R = Px(c.normalSpawnTable, o),
      U = n0(c.tier, c.waveIndex, 'normal', R);
    f.push(l0(U, d(), s, o));
  }
  const T = c.durationSec - 1;
  if (c.eliteKind !== void 0 && p < T && h >= T) {
    const M = n0(c.tier, c.waveIndex, c.eliteKind);
    f.push(l0(M, d(), s, o));
  }
  return f;
}
function Px(c, s) {
  const u = s();
  let o = 0;
  for (const d of c) if (((o += d.weight), u < o)) return d.subtype;
  return c[c.length - 1].subtype;
}
function e3(c) {
  return 440 * Math.pow(2, (c - 69) / 12);
}
const t3 = {
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
function D(c) {
  const s = c.match(/^([A-G]#?b?)(\d)$/);
  if (!s) throw new Error(`Invalid note: ${c}`);
  const u = t3[s[1]];
  if (u === void 0) throw new Error(`Invalid note name: ${s[1]}`);
  const d = 12 + parseInt(s[2], 10) * 12 + u;
  return e3(d);
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
const a3 = [D('A2'), D('C3'), D('E3')],
  n3 = [D('E2'), D('G2'), D('B2')];
(D('D3'), D('F3'), D('A3'));
const l3 = [D('G2'), D('B2'), D('D3')],
  c3 = [D('C3'), D('E3'), D('G3')],
  i3 = [D('B2'), D('D3'), D('F3')];
function Wt(c, s, u, o, d, f, h, p) {
  const y = c.createOscillator(),
    g = c.createGain();
  ((y.type = u), y.frequency.setValueAtTime(o, d));
  const _ = 0.01,
    j = Math.min(0.08, f * 0.4);
  if (
    (g.gain.setValueAtTime(1e-4, d),
    g.gain.linearRampToValueAtTime(h, d + _),
    g.gain.setValueAtTime(h, d + f - j),
    g.gain.exponentialRampToValueAtTime(1e-4, d + f),
    p !== void 0)
  ) {
    const T = c.createBiquadFilter();
    ((T.type = 'lowpass'),
      (T.frequency.value = p),
      (T.Q.value = 0.8),
      y.connect(T).connect(g).connect(s));
  } else y.connect(g).connect(s);
  (y.start(d), y.stop(d + f + 0.02));
}
function ai(c, s) {
  const u = Math.max(1, Math.floor(c.sampleRate * s)),
    o = c.createBuffer(1, u, c.sampleRate),
    d = o.getChannelData(0);
  let f = 74565;
  for (let h = 0; h < u; h++)
    ((f = (f * 1664525 + 1013904223) & 4294967295), (d[h] = f / 2147483648 - 1));
  return o;
}
function Pc(c, s, u, o) {
  const d = c.createOscillator(),
    f = c.createGain();
  ((d.type = 'sine'),
    d.frequency.setValueAtTime(80, u),
    d.frequency.exponentialRampToValueAtTime(30, u + 0.12),
    f.gain.setValueAtTime(o, u),
    f.gain.exponentialRampToValueAtTime(1e-4, u + 0.18),
    d.connect(f).connect(s),
    d.start(u),
    d.stop(u + 0.22));
  const h = c.createBufferSource();
  h.buffer = ai(c, 0.04);
  const p = c.createGain(),
    y = c.createBiquadFilter();
  ((y.type = 'highpass'),
    (y.frequency.value = 400),
    p.gain.setValueAtTime(o * 0.3, u),
    p.gain.exponentialRampToValueAtTime(1e-4, u + 0.04),
    h.connect(y).connect(p).connect(s),
    h.start(u));
}
function s3(c, s, u, o, d) {
  const f = c.createBufferSource();
  f.buffer = ai(c, d + 0.01);
  const h = c.createGain(),
    p = c.createBiquadFilter();
  ((p.type = 'highpass'),
    (p.frequency.value = 6e3),
    h.gain.setValueAtTime(o, u),
    h.gain.exponentialRampToValueAtTime(1e-4, u + d),
    f.connect(p).connect(h).connect(s),
    f.start(u));
}
const u3 = 100,
  $n = 60 / u3,
  Ic = $n * 4,
  Y0 = 8,
  o3 = Ic * Y0,
  r3 = 2,
  f3 = 100,
  d3 = [D('A2'), D('A2'), D('G2'), D('G2'), D('C3'), D('C3'), D('E2'), D('E2')],
  c0 = [D('A3'), D('C4'), D('E4'), D('A4'), D('G4'), D('E4'), D('C4'), D('A3')],
  i0 = [
    [D('A3'), D('C4'), D('E4')],
    [D('G3'), D('B3'), D('D4')],
    [D('C3'), D('E3'), D('G3')],
    [D('E3'), D('G3'), D('B3')],
  ];
function m3(c, s, u, o) {
  for (let d = 0; d < Y0; d++) {
    const f = u + d * Ic,
      h = d3[d];
    (Wt(c, s, 'sawtooth', h, f, $n * 1.8, 0.22, 300),
      Wt(c, s, 'sawtooth', h, f + $n * 2, $n * 1.8, 0.22, 300),
      Pc(c, s, f, 0.35),
      Pc(c, s, f + $n * 2, 0.28));
    for (let p = 0; p < 8; p++) {
      const y = (d * 8 + p) % c0.length,
        g = f + p * $n * 0.5;
      Wt(c, s, 'square', c0[y], g, $n * 0.4, 0.07, 2400);
    }
  }
  for (let d = 0; d < i0.length; d++) {
    const f = i0[d],
      h = u + d * Ic * 2,
      p = Ic * 2;
    for (const y of f) {
      const g = c.createOscillator(),
        _ = c.createGain();
      ((g.type = 'triangle'), g.frequency.setValueAtTime(y, h));
      const j = 0.08;
      (_.gain.setValueAtTime(1e-4, h),
        _.gain.linearRampToValueAtTime(j, h + 0.15),
        _.gain.setValueAtTime(j, h + p - 0.2),
        _.gain.exponentialRampToValueAtTime(1e-4, h + p),
        g.connect(_).connect(s),
        g.start(h),
        g.stop(h + p + 0.05),
        o.push(g));
    }
  }
}
function h3(c, s) {
  let u = 0,
    o = null;
  const d = [];
  function f() {
    const p = c.currentTime + r3 * Ic;
    for (; u < p; ) (m3(c, s, u, d), (u += o3));
  }
  return {
    start() {
      ((u = c.currentTime),
        f(),
        (o = setInterval(() => {
          f();
        }, f3)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const p of d)
        try {
          p.stop(h);
        } catch {}
      d.length = 0;
    },
  };
}
const p3 = 100,
  wa = 60 / p3,
  Er = wa * 4,
  Z0 = 8,
  hn = Er * Z0,
  v3 = 2,
  y3 = 100,
  s0 = [D('E5'), D('D5'), D('B4'), D('G4'), D('F#4'), D('E4'), D('D4'), D('B3')];
function u0(c, s, u, o) {
  const d = c.createBufferSource();
  d.buffer = ai(c, 0.2);
  const f = c.createGain(),
    h = c.createBiquadFilter();
  ((h.type = 'bandpass'),
    (h.frequency.value = 900),
    (h.Q.value = 0.6),
    f.gain.setValueAtTime(o, u),
    f.gain.exponentialRampToValueAtTime(1e-4, u + 0.18),
    d.connect(h).connect(f).connect(s),
    d.start(u),
    Wt(c, s, 'sine', 120, u, 0.12, o * 0.5, 300));
}
function g3(c, s, u, o) {
  {
    const f = c.createOscillator(),
      h = c.createGain();
    ((f.type = 'sine'), f.frequency.setValueAtTime(D('E1'), u));
    const p = 0.35;
    (h.gain.setValueAtTime(1e-4, u),
      h.gain.linearRampToValueAtTime(p, u + 0.3),
      h.gain.setValueAtTime(p, u + hn - 0.3),
      h.gain.linearRampToValueAtTime(1e-4, u + hn));
    const y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 120),
      f.connect(y).connect(h).connect(s),
      f.start(u),
      f.stop(u + hn + 0.05),
      o.push(f));
  }
  for (let f = 0; f < Z0; f++) {
    const h = u + f * Er;
    for (let p = 0; p < 4; p++) {
      const y = h + p * wa;
      (Wt(c, s, 'sawtooth', D('E2'), y, wa * 0.9, 0.22, 400),
        Wt(c, s, 'sawtooth', D('B2'), y, wa * 0.8, 0.1, 600));
    }
    (Pc(c, s, h, 0.5),
      Pc(c, s, h + wa * 2, 0.45),
      u0(c, s, h + wa, 0.4),
      u0(c, s, h + wa * 3, 0.38));
  }
  const d = [...i3, D('C4')];
  for (const f of d) {
    const h = c.createOscillator(),
      p = c.createGain();
    ((h.type = 'sawtooth'), h.frequency.setValueAtTime(f, u));
    const y = 0.07;
    (p.gain.setValueAtTime(1e-4, u),
      p.gain.linearRampToValueAtTime(y, u + 0.8),
      p.gain.setValueAtTime(y, u + hn - 0.8),
      p.gain.exponentialRampToValueAtTime(1e-4, u + hn));
    const g = c.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 900),
      h.connect(g).connect(p).connect(s),
      h.start(u),
      h.stop(u + hn + 0.05),
      o.push(h));
  }
  for (let f = 0; f < s0.length; f++) {
    const h = u + f * wa * 2;
    Wt(c, s, 'sawtooth', s0[f], h, wa * 1.6, 0.08, 2e3);
  }
  {
    const f = c.createBufferSource();
    f.buffer = ai(c, hn + 0.1);
    const h = c.createGain(),
      p = c.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 200),
      h.gain.setValueAtTime(0.04, u),
      f.connect(p).connect(h).connect(s),
      f.start(u),
      o.push(f));
  }
}
function _3(c, s) {
  let u = 0,
    o = null;
  const d = [];
  function f() {
    const p = c.currentTime + v3 * Er;
    for (; u < p; ) (g3(c, s, u, d), (u += hn));
  }
  return {
    start() {
      ((u = c.currentTime),
        f(),
        (o = setInterval(() => {
          f();
        }, y3)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const p of d)
        try {
          p.stop(h);
        } catch {}
      d.length = 0;
    },
  };
}
const b3 = 120,
  Oa = 60 / b3,
  Nr = Oa * 4,
  X0 = 8,
  xs = Nr * X0,
  S3 = 2,
  x3 = 100,
  j3 = [D('E2'), D('E2'), D('D2'), D('D2'), D('E2'), D('E2'), D('B1'), D('B1')],
  o0 = [
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
function r0(c, s, u, o) {
  const d = c.createBufferSource();
  d.buffer = ai(c, 0.15);
  const f = c.createGain(),
    h = c.createBiquadFilter();
  ((h.type = 'bandpass'),
    (h.frequency.value = 1800),
    (h.Q.value = 0.8),
    f.gain.setValueAtTime(o, u),
    f.gain.exponentialRampToValueAtTime(1e-4, u + 0.13),
    d.connect(h).connect(f).connect(s),
    d.start(u),
    Wt(c, s, 'triangle', 200, u, 0.08, o * 0.4));
}
function A3(c, s, u, o) {
  for (let f = 0; f < X0; f++) {
    const h = u + f * Nr,
      p = j3[f];
    for (let y = 0; y < 4; y++) Wt(c, s, 'sawtooth', p, h + y * Oa, Oa * 0.85, 0.26, 280);
    for (let y = 0; y < 4; y++) Pc(c, s, h + y * Oa, 0.42);
    (r0(c, s, h + Oa, 0.3), r0(c, s, h + Oa * 3, 0.3));
    for (let y = 0; y < 8; y++) s3(c, s, h + y * Oa * 0.5, 0.12, 0.08);
    for (let y = 0; y < 16; y++) {
      const g = (f * 16 + y) % o0.length,
        _ = h + y * Oa * 0.25;
      Wt(c, s, 'sawtooth', o0[g], _, Oa * 0.22, 0.06, 3200);
    }
  }
  const d = [D('E3'), D('G3'), D('B3')];
  for (const f of d) {
    const h = c.createOscillator(),
      p = c.createGain();
    ((h.type = 'triangle'),
      h.frequency.setValueAtTime(f, u),
      p.gain.setValueAtTime(1e-4, u),
      p.gain.linearRampToValueAtTime(0.06, u + 0.2),
      p.gain.setValueAtTime(0.06, u + xs - 0.3),
      p.gain.exponentialRampToValueAtTime(1e-4, u + xs));
    const y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 1200),
      h.connect(y).connect(p).connect(s),
      h.start(u),
      h.stop(u + xs + 0.05),
      o.push(h));
  }
}
function T3(c, s) {
  let u = 0,
    o = null;
  const d = [];
  function f() {
    const p = c.currentTime + S3 * Nr;
    for (; u < p; ) (A3(c, s, u, d), (u += xs));
  }
  return {
    start() {
      ((u = c.currentTime),
        f(),
        (o = setInterval(() => {
          f();
        }, x3)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const p of d)
        try {
          p.stop(h);
        } catch {}
      d.length = 0;
    },
  };
}
const E3 = 80,
  js = 60 / E3,
  Ns = js * 4,
  N3 = 8,
  As = Ns * N3,
  M3 = 2,
  z3 = 100,
  f0 = [a3, c3, l3, n3],
  ir = [D('A3'), D('C4'), D('E4'), D('G4'), D('A4'), D('E4')];
function C3(c, s, u, o) {
  {
    const d = c.createOscillator(),
      f = c.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(D('A2'), u));
    const h = 0.28;
    (f.gain.setValueAtTime(1e-4, u),
      f.gain.linearRampToValueAtTime(h, u + 0.5),
      f.gain.setValueAtTime(h, u + As - 0.5),
      f.gain.linearRampToValueAtTime(1e-4, u + As));
    const p = c.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 180),
      d.connect(p).connect(f).connect(s),
      d.start(u),
      d.stop(u + As + 0.05),
      o.push(d));
  }
  for (let d = 0; d < f0.length; d++) {
    const f = f0[d],
      h = u + d * Ns * 2,
      p = Ns * 2;
    for (const y of f) {
      const g = c.createOscillator(),
        _ = c.createGain();
      ((g.type = 'triangle'), g.frequency.setValueAtTime(y, h));
      const j = 0.1,
        T = 0.4,
        M = 0.6;
      (_.gain.setValueAtTime(1e-4, h),
        _.gain.linearRampToValueAtTime(j, h + T),
        _.gain.setValueAtTime(j, h + p - M),
        _.gain.exponentialRampToValueAtTime(1e-4, h + p));
      const R = c.createDelay(0.5);
      R.delayTime.value = 0.25;
      const U = c.createGain();
      U.gain.value = 0.2;
      const q = c.createBiquadFilter();
      ((q.type = 'lowpass'),
        (q.frequency.value = 2e3),
        g.connect(_).connect(s),
        g.connect(R).connect(q).connect(U).connect(s),
        g.start(h),
        g.stop(h + p + 0.5),
        o.push(g));
    }
  }
  for (let d = 0; d < ir.length; d++) {
    const f = u + d * js * 2;
    (Wt(c, s, 'sawtooth', ir[d], f, js * 1.5, 0.09, 1800),
      Wt(c, s, 'sine', ir[d] * 0.5, f + 0.12, js * 1.2, 0.05, 600));
  }
}
function R3(c, s) {
  let u = 0,
    o = null;
  const d = [];
  function f() {
    const p = c.currentTime + M3 * Ns;
    for (; u < p; ) (C3(c, s, u, d), (u += As));
  }
  return {
    start() {
      ((u = c.currentTime),
        f(),
        (o = setInterval(() => {
          f();
        }, z3)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const p of d)
        try {
          p.stop(h);
        } catch {}
      d.length = 0;
    },
  };
}
function w3(c, s, u) {
  switch (c) {
    case 'title':
      return R3(s, u);
    case 'base':
      return h3(s, u);
    case 'battleNormal':
      return T3(s, u);
    case 'battleBoss':
      return _3(s, u);
  }
}
function O3(c, s) {
  const u = Math.max(1, Math.floor(c.sampleRate * s)),
    o = c.createBuffer(1, u, c.sampleRate),
    d = o.getChannelData(0);
  for (let f = 0; f < u; f++) d[f] = Math.random() * 2 - 1;
  return o;
}
function ca(c, s, u, o, d) {
  const f = c.gain;
  (f.setValueAtTime(1e-4, s),
    f.linearRampToValueAtTime(u, s + o),
    f.exponentialRampToValueAtTime(1e-4, s + o + d));
}
function pe(c, s, u, o, d, f, h, p, y) {
  const g = c.createOscillator(),
    _ = c.createGain();
  ((g.type = u),
    g.frequency.setValueAtTime(o, d),
    y !== void 0 && g.frequency.exponentialRampToValueAtTime(Math.max(1e-4, y), d + h + p),
    ca(_, d, f, h, p),
    g.connect(_).connect(s),
    g.start(d),
    g.stop(d + h + p + 0.02));
}
function ia(c, s, u, o, d, f) {
  const h = c.createBufferSource();
  h.buffer = O3(c, u);
  const p = c.createGain();
  if ((ca(p, o, d, 0.002, u), f)) {
    const y = c.createBiquadFilter();
    ((y.type = f.type),
      (y.frequency.value = f.frequency),
      f.q !== void 0 && (y.Q.value = f.q),
      h.connect(y).connect(p).connect(s));
  } else h.connect(p).connect(s);
  h.start(o);
}
const D3 = (c, s, u) => {
    const o = c.createOscillator(),
      d = c.createOscillator(),
      f = c.createGain();
    ((o.type = 'sawtooth'),
      (d.type = 'sawtooth'),
      o.frequency.setValueAtTime(900, u),
      o.frequency.exponentialRampToValueAtTime(1500, u + 0.5),
      d.frequency.setValueAtTime(905, u),
      d.frequency.exponentialRampToValueAtTime(1510, u + 0.5),
      ca(f, u, 0.28, 0.02, 0.5),
      o.connect(f),
      d.connect(f),
      f.connect(s),
      o.start(u),
      d.start(u),
      o.stop(u + 0.55),
      d.stop(u + 0.55));
  },
  B3 = (c, s, u) => {
    for (let o = 0; o < 4; o++) {
      const d = u + o * 0.12;
      (pe(c, s, 'sine', 110, d, 0.4, 0.005, 0.18, 35),
        ia(c, s, 0.08, d, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  L3 = (c, s, u) => {
    (ia(c, s, 0.4, u, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      pe(c, s, 'triangle', 3e3, u, 0.25, 0.005, 0.15, 1500),
      pe(c, s, 'sawtooth', 200, u + 0.05, 0.18, 0.005, 0.3, 80));
  },
  H3 = (c, s, u) => {
    for (let o = 0; o < 5; o++) {
      const d = u + o * 0.07,
        f = c.createOscillator(),
        h = c.createGain(),
        p = c.createBiquadFilter();
      ((f.type = 'square'),
        f.frequency.setValueAtTime(1100 + o * 60, d),
        f.frequency.exponentialRampToValueAtTime(1700 + o * 60, d + 0.04),
        (p.type = 'bandpass'),
        (p.frequency.value = 1600),
        (p.Q.value = 4),
        ca(h, d, 0.2, 0.002, 0.06),
        f.connect(p).connect(h).connect(s),
        f.start(d),
        f.stop(d + 0.08));
    }
  },
  U3 = (c, s, u) => {
    (ia(c, s, 0.1, u, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      pe(c, s, 'triangle', 500, u, 0.18, 0.003, 0.08, 200));
  },
  q3 = (c, s, u) => {
    const o = c.createOscillator(),
      d = c.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(80, u),
      o.frequency.linearRampToValueAtTime(160, u + 0.8),
      ca(d, u, 0.3, 0.1, 0.7),
      o.connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.85),
      pe(c, s, 'square', 320, u + 0.2, 0.15, 0.02, 0.4));
  },
  G3 = (c, s, u) => {
    (ia(c, s, 0.5, u, 0.45, { type: 'lowpass', frequency: 1200 }),
      pe(c, s, 'sine', 90, u, 0.5, 0.005, 0.6, 30),
      pe(c, s, 'triangle', 1200, u + 0.1, 0.2, 0.02, 0.4, 2400),
      pe(c, s, 'triangle', 1600, u + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  V3 = (c, s, u) => {
    (pe(c, s, 'sine', 180, u, 0.3, 0.005, 0.12, 60),
      ia(c, s, 0.08, u, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  $3 = (c, s, u) => {
    const o = c.createOscillator(),
      d = c.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(220, u),
      o.frequency.exponentialRampToValueAtTime(40, u + 1.2),
      ca(d, u, 0.45, 0.02, 1.2),
      o.connect(d).connect(s),
      o.start(u),
      o.stop(u + 1.3),
      ia(c, s, 0.8, u, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  k3 = (c, s, u) => {
    (pe(c, s, 'triangle', 700, u, 0.22, 0.01, 0.18),
      pe(c, s, 'triangle', 1050, u + 0.12, 0.22, 0.01, 0.22));
  },
  Y3 = (c, s, u) => {
    (pe(c, s, 'triangle', 600, u, 0.25, 0.01, 0.2),
      pe(c, s, 'triangle', 900, u + 0.12, 0.25, 0.01, 0.2),
      pe(c, s, 'triangle', 1350, u + 0.24, 0.3, 0.01, 0.45),
      pe(c, s, 'sine', 2400, u + 0.3, 0.15, 0.02, 0.5));
  },
  Z3 = (c, s, u) => {
    (pe(c, s, 'triangle', 600, u, 0.28, 0.01, 0.18),
      pe(c, s, 'triangle', 750, u + 0.12, 0.28, 0.01, 0.18),
      pe(c, s, 'triangle', 900, u + 0.24, 0.28, 0.01, 0.22),
      pe(c, s, 'triangle', 1200, u + 0.36, 0.32, 0.01, 0.5),
      pe(c, s, 'sine', 2400, u + 0.42, 0.18, 0.02, 0.6));
  },
  X3 = (c, s, u) => {
    (pe(c, s, 'sawtooth', 300, u, 0.3, 0.02, 0.4, 220),
      pe(c, s, 'sawtooth', 220, u + 0.35, 0.3, 0.02, 0.5, 160),
      pe(c, s, 'sawtooth', 160, u + 0.8, 0.3, 0.02, 0.7, 80),
      ia(c, s, 1, u, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  Q3 = (c, s, u) => {
    const o = c.createOscillator(),
      d = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(700, u),
      o.frequency.exponentialRampToValueAtTime(400, u + 0.4),
      ca(d, u, 0.22, 0.02, 0.4),
      o.connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.45),
      ia(c, s, 0.5, u, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  K3 = (c, s, u) => {
    pe(c, s, 'triangle', 1e3, u, 0.18, 0.003, 0.05);
  },
  J3 = (c, s, u) => {
    (pe(c, s, 'triangle', 880, u, 0.2, 0.005, 0.08),
      pe(c, s, 'triangle', 1320, u + 0.06, 0.2, 0.005, 0.12));
  },
  W3 = (c, s, u) => {
    (pe(c, s, 'square', 260, u, 0.18, 0.005, 0.07),
      pe(c, s, 'square', 200, u + 0.06, 0.18, 0.005, 0.1));
  },
  F3 = (c, s, u) => {
    pe(c, s, 'triangle', 1400, u, 0.12, 0.003, 0.04);
  },
  I3 = (c, s, u) => {
    const o = c.createOscillator(),
      d = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(500, u),
      o.frequency.exponentialRampToValueAtTime(1e3, u + 0.12),
      ca(d, u, 0.18, 0.01, 0.12),
      o.connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.15));
  },
  P3 = (c, s, u) => {
    const o = c.createOscillator(),
      d = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(1e3, u),
      o.frequency.exponentialRampToValueAtTime(500, u + 0.1),
      ca(d, u, 0.16, 0.005, 0.1),
      o.connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.13));
  },
  e5 = (c, s, u) => {
    (pe(c, s, 'sawtooth', 200, u, 0.3, 0.01, 0.35, 80),
      pe(c, s, 'triangle', 600, u + 0.05, 0.22, 0.01, 0.3, 1200),
      pe(c, s, 'triangle', 1200, u + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  t5 = (c, s, u) => {
    const o = c.createOscillator(),
      d = c.createGain(),
      f = c.createBiquadFilter();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(1600, u),
      o.frequency.exponentialRampToValueAtTime(700, u + 0.08),
      (f.type = 'highpass'),
      (f.frequency.value = 800),
      ca(d, u, 0.22, 0.003, 0.09),
      o.connect(f).connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.12));
  },
  a5 = (c, s, u) => {
    (pe(c, s, 'sine', 130, u, 0.5, 0.01, 0.28, 40),
      ia(c, s, 0.12, u, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  n5 = (c, s, u) => {
    (ia(c, s, 0.18, u, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      pe(c, s, 'triangle', 2200, u, 0.15, 0.002, 0.06, 1800));
  },
  l5 = (c, s, u) => {
    const o = c.createOscillator(),
      d = c.createGain(),
      f = c.createBiquadFilter();
    ((o.type = 'square'),
      o.frequency.setValueAtTime(900, u),
      o.frequency.exponentialRampToValueAtTime(1400, u + 0.05),
      (f.type = 'bandpass'),
      (f.frequency.value = 1500),
      (f.Q.value = 3),
      ca(d, u, 0.18, 0.002, 0.07),
      o.connect(f).connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.1),
      ia(c, s, 0.05, u, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  c5 = (c, s, u) => {
    (pe(c, s, 'triangle', 700, u, 0.18, 0.005, 0.05),
      pe(c, s, 'triangle', 1050, u + 0.04, 0.18, 0.005, 0.06));
  },
  i5 = {
    laserShoot: t5,
    cannonShoot: a5,
    thunderShoot: n5,
    cutterShoot: l5,
    weaponSwitch: c5,
    activeLaser: D3,
    activeCannon: B3,
    activeThunder: L3,
    activeCutter: H3,
    enemyKill: U3,
    bossWarn: q3,
    bossKill: G3,
    machineHit: V3,
    machineDown: $3,
    waveClear: k3,
    tierClear: Y3,
    tap: K3,
    purchaseOk: J3,
    reject: W3,
    tabSwitch: F3,
    dialogOpen: I3,
    dialogClose: P3,
    launch: e5,
    resultClear: Z3,
    resultGameOver: X3,
    resultRetreat: Q3,
  },
  s5 = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function d0(c) {
  return Math.max(0, Math.min(1, c));
}
class u5 {
  constructor() {
    ta(this, 'ctx', null);
    ta(this, 'seGain', null);
    ta(this, 'bgmGain', null);
    ta(this, 'masterGain', null);
    ta(this, 'lastPlayAt', new Map());
    ta(this, 'seVolume', 0.7);
    ta(this, 'bgmVolume', 0.5);
    ta(this, 'currentBgm', null);
  }
  init() {
    if (this.ctx) return;
    const s = window.AudioContext ?? window.webkitAudioContext;
    if (!s) return;
    const u = new s();
    ((this.ctx = u),
      (this.masterGain = u.createGain()),
      (this.seGain = u.createGain()),
      (this.bgmGain = u.createGain()),
      this.seGain.connect(this.masterGain),
      this.bgmGain.connect(this.masterGain),
      this.masterGain.connect(u.destination),
      (this.masterGain.gain.value = 1),
      (this.seGain.gain.value = this.seVolume),
      (this.bgmGain.gain.value = this.bgmVolume));
  }
  play(s) {
    if (!this.ctx || !this.seGain) return;
    this.ctx.state === 'suspended' && this.ctx.resume();
    const u = performance.now(),
      o = s5[s];
    if (o !== void 0) {
      const f = this.lastPlayAt.get(s) ?? 0;
      if (u - f < o) return;
      this.lastPlayAt.set(s, u);
    }
    const d = i5[s];
    d(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(s) {
    ((this.seVolume = d0(s)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(s) {
    ((this.bgmVolume = d0(s)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
  }
  getSeVolume() {
    return this.seVolume;
  }
  getBgmVolume() {
    return this.bgmVolume;
  }
  playBgm(s) {
    var o, d;
    if (
      !this.ctx ||
      !this.bgmGain ||
      (this.ctx.state === 'suspended' && this.ctx.resume(),
      ((o = this.currentBgm) == null ? void 0 : o.id) === s)
    )
      return;
    (d = this.currentBgm) == null || d.track.stop();
    const u = w3(s, this.ctx, this.bgmGain);
    (u.start(), (this.currentBgm = { id: s, track: u }));
  }
  stopBgm() {
    var s;
    ((s = this.currentBgm) == null || s.track.stop(), (this.currentBgm = null));
  }
  getCurrentBgm() {
    var s;
    return ((s = this.currentBgm) == null ? void 0 : s.id) ?? null;
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
const Pe = new u5(),
  o5 = 1;
function r5(c, s, u) {
  if (u) return 0;
  const o = (c * s) / 1e3;
  return Math.min(o5, Math.max(0, o));
}
function f5(c, s, u, o) {
  return c < s * 1e3 ? 'continue' : u >= o ? 'advanceTier' : 'advanceWave';
}
function d5(c, s, u, o) {
  const d = c !== s;
  return { resetElapsed: d || u !== o, resetEnemies: d };
}
const m5 = 50,
  h5 = 50;
function m0(c) {
  const s = c.x - m5,
    u = c.y - h5;
  return Math.sqrt(s * s + u * u);
}
const p5 = 10,
  v5 = 5,
  y5 = 30,
  g5 = {
    laser: 'laserShoot',
    cannon: 'cannonShoot',
    thunder: 'thunderShoot',
    cutter: 'cutterShoot',
  },
  _5 = {
    laser: 'activeLaser',
    cannon: 'activeCannon',
    thunder: 'activeThunder',
    cutter: 'activeCutter',
  };
function b5({ range: c }) {
  const s = te.useRef(null),
    u = te.useRef(0),
    o = te.useRef(0),
    d = te.useRef(0),
    f = te.useRef([]),
    h = te.useRef(0),
    p = te.useRef(0),
    y = te.useRef(0),
    g = te.useRef(0),
    _ = te.useRef(0),
    [j, T] = te.useState([]),
    [M, R] = te.useState([]),
    [U, q] = te.useState([]),
    Y = k((je) => je.isRunActive),
    K = k((je) => je.currentTier),
    oe = k((je) => je.currentWave),
    be = te.useMemo(() => Fx(K), [K]),
    Fe = te.useRef(K),
    Ue = te.useRef(oe);
  te.useEffect(() => {
    const je = d5(Fe.current, K, Ue.current, oe);
    ((Fe.current = K),
      (Ue.current = oe),
      je.resetElapsed && ((o.current = 0), (d.current = 0)),
      je.resetEnemies && ((f.current = []), T([])));
  }, [K, oe]);
  const ce = te.useCallback((je) => {
      R((Le) => Le.filter((Ce) => Ce.id !== je));
    }, []),
    Ve = te.useCallback((je) => {
      q((Le) => Le.filter((Ce) => Ce.id !== je));
    }, []);
  return (
    te.useEffect(() => {
      if (!Y) return;
      const je = (Le) => {
        const Ce = Le - u.current;
        u.current = Le;
        const ne = k.getState(),
          et = r5(Ce, ne.gameSpeed, ne.isPaused);
        if (et > 0) {
          (ne.tickCooldowns(et),
            ne.isAutoActive &&
              ne.activeCdSec <= 0 &&
              ne.triggerActive(y5) &&
              Pe.play(_5[ne.currentWeapon]),
            (d.current = o.current),
            (o.current += et * 1e3));
          const dt = be[ne.currentWave - 1];
          if (dt != null) {
            const Ye = Ix(
              dt,
              o.current,
              d.current,
              Math.random,
              () => ((h.current += 1), `e-${ne.currentTier}-${ne.currentWave}-${h.current}`)
            );
            (Ye.length > 0 && (f.current = [...f.current, ...Ye]),
              (f.current = f.current.map((we) => mx(we, et))));
            const w = ne.runWorkshopLevels.attackMul,
              $ = ne.runWorkshopLevels.attackSpeedMul,
              P = Yn(w),
              ye = Yn($),
              Se = Ox(ne.currentWeapon, ne.weaponLv),
              x = Math.min(p5, Se * ye),
              L = x > 0 ? 1e3 / x : 1 / 0;
            p.current += et * 1e3;
            let V = 0;
            const Z = 10,
              ae = [];
            for (; p.current >= L && V < Z; ) {
              const we = f.current
                .map((mt) => ({ enemy: mt, dist: m0(mt.position) }))
                .filter(({ dist: mt }) => mt <= c)
                .sort((mt, at) => mt.dist - at.dist)
                .map(({ enemy: mt }) => mt);
              if (we.length === 0) {
                p.current = Math.min(p.current, L);
                break;
              }
              ((p.current -= L), (V += 1), Pe.play(g5[ne.currentWeapon]));
              const tt = a0({ machineMaxHp: ne.machineMaxHp }),
                ma = Dx({
                  weapon: ne.currentWeapon,
                  weaponLv: ne.weaponLv,
                  machine: tt,
                  enemiesInRange: we,
                  rng: Math.random,
                  cutterAngleDeg: y.current,
                  attackMul: P,
                });
              if (ma.hits.length > 0) {
                const mt = new Map(ma.hits.map((at) => [at.enemyId, at]));
                f.current = f.current.map((at) => {
                  const Tt = mt.get(at.id);
                  return Tt == null ? at : { ...at, hp: at.hp.sub(Tt.damage) };
                });
                for (const at of ma.hits) {
                  const Tt = f.current.find((Jn) => Jn.id === at.enemyId);
                  ((g.current += 1),
                    ae.push({
                      id: `de-${g.current}`,
                      x: (Tt == null ? void 0 : Tt.position.x) ?? 50,
                      y: (Tt == null ? void 0 : Tt.position.y) ?? 50,
                      value: at.damage,
                      crit: at.crit,
                    }));
                }
              }
            }
            ae.length > 0 && R((we) => [...we, ...ae]);
            const se = Yn(ne.runWorkshopLevels.screwGainMul),
              de = [],
              Ze = [];
            let Ee = F.ZERO;
            for (const we of f.current)
              if (we.hp.lte(F.ZERO)) {
                ((_.current += 1),
                  de.push({ id: `dh-${_.current}`, x: we.position.x, y: we.position.y }));
                const tt = we.reward.screw;
                (tt > 0 && (Ee = Ee.add(F.fromNumber(tt * se))),
                  Pe.play(we.kind === 'boss' || we.kind === 'miniboss' ? 'bossKill' : 'enemyKill'));
              } else Ze.push(we);
            (de.length > 0 && ((f.current = Ze), q((we) => [...we, ...de])),
              Ee.isZero() || ne.addScrew(Ee));
            const da = a0({ machineMaxHp: ne.machineMaxHp });
            let Ft = F.ZERO;
            for (const we of f.current)
              if (m0(we.position) <= v5) {
                const tt = dx(we.atk, da);
                Ft = Ft.add(tt.mulNumber(et));
              }
            if (!Ft.isZero()) {
              const we = ne.machineHp;
              ne.damageHp(Ft);
              const tt = k.getState().machineHp;
              Pe.play(tt.isZero() && !we.isZero() ? 'machineDown' : 'machineHit');
            }
            const Ba = f5(o.current, dt.durationSec, ne.currentWave, be.length);
            Ba === 'advanceWave'
              ? (ne.advanceWave(), Pe.play('waveClear'))
              : Ba === 'advanceTier' && (ne.advanceTier(), Pe.play('tierClear'));
          }
        }
        (T(f.current), (s.current = requestAnimationFrame(je)));
      };
      return (
        (u.current = performance.now()),
        (s.current = requestAnimationFrame(je)),
        () => {
          s.current != null && (cancelAnimationFrame(s.current), (s.current = null));
        }
      );
    }, [Y, be, c]),
    { enemies: j, damageEvents: M, deathEvents: U, onDamageDone: ce, onDeathDone: Ve }
  );
}
const h0 = 30,
  p0 = 30;
function S5(c, s) {
  return c && s.lte(F.ZERO) ? 'gameover' : null;
}
function x5() {
  const { navigate: c } = yn(),
    s = k((J) => J.isRunActive),
    u = k((J) => J.screw),
    o = k((J) => J.machineHp),
    d = k((J) => J.machineMaxHp),
    f = k((J) => J.currentTier),
    h = k((J) => J.currentWave),
    p = k((J) => J.currentWeapon),
    y = k((J) => J.activeCdSec),
    g = k((J) => J.isAutoActive),
    _ = k((J) => J.gameSpeed),
    j = k((J) => J.isPaused),
    T = k((J) => J.runWorkshopLevels),
    M = k((J) => J.bgmVolume),
    R = k((J) => J.seVolume),
    U = k((J) => J.setBgmVolume),
    q = k((J) => J.setSeVolume),
    Y = k((J) => J.setAutoActive),
    K = k((J) => J.switchWeapon),
    oe = k((J) => J.setPaused),
    be = k((J) => J.setGameSpeed),
    Fe = k((J) => J.upgradeRunWorkshop),
    Ue = k((J) => J.triggerActive),
    [ce, Ve] = te.useState(!1),
    [je, Le] = te.useState(!1),
    [Ce, ne] = te.useState(!1),
    {
      enemies: et,
      damageEvents: dt,
      deathEvents: Ye,
      onDamageDone: w,
      onDeathDone: $,
    } = b5({ range: p0 }),
    P = [],
    ye = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    Se = S5(s, o),
    [x, L] = te.useState(null),
    V = x ?? Se,
    Z = V !== null,
    ae = o,
    se = d.isZero() ? F.fromNumber(1) : d,
    de = (J) => {
      (be(J), Pe.play('tap'));
    },
    Ze = () => {
      (oe(!j), Pe.play('tap'));
    },
    Ee = () => {
      (Le(!0), Pe.play('dialogOpen'));
    },
    da = () => {
      (ne(!0), Pe.play('dialogOpen'));
    },
    Ft = () => {
      (Le(!1), L('retreat'), Pe.play('resultRetreat'));
    },
    Ba = () => {
      c('preparation');
    },
    we = (J, gn) => {
      const Ls = Fe(J, gn);
      Pe.play(Ls ? 'purchaseOk' : 'reject');
    },
    tt = (J) => {
      (K(J), Pe.play('weaponSwitch'));
    },
    ma = () => {
      if (!Ue(h0)) {
        Pe.play('reject');
        return;
      }
      const gn =
        p === 'laser'
          ? 'activeLaser'
          : p === 'cannon'
            ? 'activeCannon'
            : p === 'thunder'
              ? 'activeThunder'
              : 'activeCutter';
      Pe.play(gn);
    },
    mt = { bolt: F.ZERO, alloy: F.ZERO, patches: [] },
    at = 30;
  return r.jsxs('div', {
    className: nr.root,
    children: [
      r.jsx(Qn, {
        noScroll: !0,
        variant: 'battle',
        header: r.jsx(cS, {
          hpCurrent: ae,
          hpMax: se,
          tier: f,
          wave: h,
          totalWaves: at,
          secondsRemaining: 20,
          secondsTotal: 30,
          isBossWave: h === at,
        }),
        footer: r.jsxs('div', {
          className: nr.battleFooter,
          children: [
            r.jsx(sx, {
              open: ce,
              screw: u,
              levels: T,
              onUpgrade: we,
              onClose: () => {
                Ve(!1);
              },
            }),
            r.jsx(kb, {
              screw: u,
              equippedWeapon: p,
              weaponCds: ye,
              activeCd: y,
              activeMax: h0,
              isAutoActive: g,
              onSwitchWeapon: tt,
              onActivate: ma,
              onToggleAuto: Y,
              gameSpeed: _,
              onSpeedChange: de,
              isPaused: j,
              onTogglePause: Ze,
              onOpenMenu: Ee,
              onOpenScreenSaver: da,
              isWorkshopOpen: ce,
              onToggleWorkshop: () => {
                Ve((J) => !J);
              },
            }),
          ],
        }),
        children: r.jsx(nb, {
          enemies: et,
          damageEvents: dt,
          hitEvents: P,
          deathEvents: Ye,
          onDamageDone: w,
          onDeathDone: $,
          range: p0,
        }),
      }),
      r.jsxs('div', {
        className: nr.overlayLayer,
        'aria-live': 'polite',
        children: [
          r.jsx(qS, {
            open: je,
            bgmVolume: M,
            seVolume: R,
            onBgmChange: U,
            onSeChange: q,
            onRetreat: Ft,
            onClose: () => {
              Le(!1);
            },
          }),
          Z &&
            r.jsx(tx, {
              open: Z,
              status: V,
              reachedTier: f,
              reachedWave: h,
              killed: 0,
              elapsedSec: 0,
              reward: mt,
              onClose: Ba,
            }),
          r.jsx(fx, {
            open: Ce,
            onClose: () => {
              ne(!1);
            },
          }),
        ],
      }),
    ],
  });
}
const Q0 = [
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
function mr(c, s) {
  switch (c.growthType) {
    case 'multiply':
      return Math.ceil(c.baseValue * Math.pow(c.growthFactor, s));
    case 'linear':
    case 'fixed_step':
      return c.baseValue + c.growthFactor * s;
    case 'asymptotic':
      return 1 - 1 / (1 + c.growthFactor * s);
    case 'asymptotic_half':
      return 0.5 * (1 - 1 / (1 + c.growthFactor * s));
    case 'range_asymptotic': {
      const d = c.growthFactor * s;
      return Math.ceil(150 + 250 * (1 - 1 / (1 + d)));
    }
    default:
      return c.baseValue;
  }
}
function Mr(c, s) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, s));
}
function sr(c, s, u) {
  let o = 0;
  for (let d = 0; d < u && !(c.maxLv != null && s + d >= c.maxLv); d++) o += Mr(c, s + d);
  return o;
}
function j5(c, s, u) {
  let o = 0,
    d = u,
    f = s;
  for (let h = 0; h < 1e4 && !(c.maxLv != null && f >= c.maxLv); h++) {
    const p = F.fromNumber(Mr(c, f));
    if (d.lt(p)) break;
    ((d = d.sub(p)), (f += 1), (o += 1));
  }
  return o;
}
const A5 = '_root_1420p_3',
  T5 = { root: A5 };
function E5() {
  const c = k((d) => d.machineLevels),
    s = k((d) => d.bolt),
    u = k((d) => d.incrementMachineLv),
    o = k((d) => d.spendBolt);
  return r.jsx('div', {
    className: T5.root,
    children: Q0.map((d) => {
      const f = c[d.key],
        h = d.maxLv != null && f >= d.maxLv,
        p = mr(d, f),
        y = mr(d, f + 1),
        g = (Le) => (d.unit === '%' ? Math.round(Le * 1e3) / 10 : Le),
        _ = g(p),
        j = g(y),
        T = Mr(d, f),
        M = sr(d, f, 5),
        R = F.fromNumber(T),
        U = F.fromNumber(M),
        q = j5(d, f, s),
        Y = d.maxLv != null ? d.maxLv - f : Number.POSITIVE_INFINITY,
        K = Math.min(q, Y),
        oe = K > 0 ? sr(d, f, K) : T,
        be = F.fromNumber(oe),
        Fe = s.lt(R),
        Ue = s.lt(U) || (d.maxLv != null && f + 5 > d.maxLv),
        ce = K < 1,
        Ve = h
          ? []
          : [
              { amount: '+1', cost: R, disabled: Fe },
              { amount: '+5', cost: U, disabled: Ue },
              { amount: 'MAX', cost: be, disabled: ce },
            ],
        je = (Le) => {
          if (h) return;
          let Ce = 0;
          if ((Le === '+1' ? (Ce = 1) : Le === '+5' ? (Ce = 5) : Le === 'MAX' && (Ce = K), Ce < 1))
            return;
          d.maxLv != null && (Ce = Math.min(Ce, d.maxLv - f));
          const ne = sr(d, f, Ce),
            et = F.fromNumber(ne);
          if (o(et)) for (let Ye = 0; Ye < Ce; Ye++) u(d.key);
        };
      return r.jsx(
        jr,
        {
          title: d.title,
          iconName: d.iconName,
          currentLabel: `Lv ${f}`,
          before: _,
          after: h ? void 0 : j,
          beforeSuffix: d.unit ?? '',
          currency: 'bolt',
          accent: 'primary',
          maxed: h,
          options: Ve,
          onUpgrade: je,
        },
        d.key
      );
    }),
  });
}
function N5() {
  const { navigate: c } = yn(),
    s = (u) => {
      c(u);
    };
  return r.jsx(Qn, {
    header: r.jsx(ti, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: r.jsx(ei, { active: 'machine', onChange: s }),
    children: r.jsx(E5, {}),
  });
}
const M5 = () => r.jsx('div', { children: r.jsx('h1', { children: 'Not Found' }) }),
  z5 = '_content_9srrg_1',
  C5 = { content: z5 },
  R5 = '_root_1l9jp_1',
  w5 = '_header_1l9jp_8',
  O5 = '_headerTitleRow_1l9jp_15',
  D5 = '_headerCount_1l9jp_21',
  B5 = '_slotGrid_1l9jp_35',
  L5 = '_emptyHint_1l9jp_41',
  ql = { root: R5, header: w5, headerTitleRow: O5, headerCount: D5, slotGrid: B5, emptyHint: L5 },
  H5 = '_wrapper_16mrg_3',
  U5 = '_filled_16mrg_16',
  q5 = '_empty_16mrg_25',
  G5 = '_locked_16mrg_26',
  V5 = '_slotInner_16mrg_59',
  $5 = '_emptyIcon_16mrg_67',
  k5 = '_emptyLabel_16mrg_74',
  mn = {
    wrapper: H5,
    filled: U5,
    empty: q5,
    locked: G5,
    slotInner: V5,
    emptyIcon: $5,
    emptyLabel: k5,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  },
  Y5 = '_root_12m2l_3',
  Z5 = '_selected_12m2l_15',
  X5 = '_merging_12m2l_19',
  Q5 = '_locked_12m2l_23',
  K5 = '_disabled_12m2l_28',
  J5 = '_card_12m2l_34',
  W5 = '_tierBadge_12m2l_46',
  F5 = '_count_12m2l_54',
  I5 = '_countZero_12m2l_74',
  P5 = '_iconWrap_12m2l_79',
  e4 = '_name_12m2l_90',
  t4 = '_detail_12m2l_102',
  a4 = '_trigger_12m2l_110',
  n4 = '_effect_12m2l_121',
  l4 = '_mergingBadge_12m2l_133',
  pt = {
    root: Y5,
    selected: Z5,
    merging: X5,
    locked: Q5,
    disabled: K5,
    card: J5,
    tierBadge: W5,
    count: F5,
    countZero: I5,
    iconWrap: P5,
    name: e4,
    detail: t4,
    trigger: a4,
    effect: n4,
    mergingBadge: l4,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  c4 = { sm: 22, md: 26, lg: 32 },
  v0 = { sm: 38, md: 44, lg: 52 };
function zr({
  name: c,
  iconName: s,
  tier: u,
  count: o,
  trigger: d,
  effect: f,
  selected: h = !1,
  merging: p = !1,
  locked: y = !1,
  disabled: g = !1,
  size: _ = 'md',
  onClick: j,
}) {
  const T = Math.min(Math.max(1, Math.floor(u)), 5),
    M = `var(--c-patch-t${T})`,
    R = j != null && !g && !y,
    U = h ? { boxShadow: 'var(--glow-cyan-md)' } : p ? { boxShadow: 'var(--glow-purple-md)' } : {},
    q = {
      width: v0[_],
      height: v0[_],
      opacity: y ? 0.35 : 1,
      background: y ? 'var(--c-surface)' : `linear-gradient(135deg, ${M}22, ${M}08)`,
      border: y ? '1px solid var(--c-border-faint)' : `1px solid ${M}55`,
      filter: y ? 'none' : `drop-shadow(0 0 4px ${M}55)`,
    },
    Y = {
      background: o >= 2 ? `${M}22` : void 0,
      borderColor: o >= 2 ? M : void 0,
      color: o >= 2 ? M : void 0,
    };
  return r.jsx('div', {
    className: [
      pt.root,
      h ? pt.selected : '',
      p ? pt.merging : '',
      y ? pt.locked : '',
      g ? pt.disabled : '',
      pt[`size-${_}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: U,
    onClick: R ? j : void 0,
    role: R ? 'button' : void 0,
    tabIndex: R ? 0 : void 0,
    onKeyDown: R
      ? (K) => {
          (K.key === 'Enter' || K.key === ' ') && (K.preventDefault(), j == null || j());
        }
      : void 0,
    'aria-pressed': R ? h : void 0,
    'aria-disabled': g || y ? !0 : void 0,
    children: r.jsxs(Kn, {
      variant: 'elevated',
      padding: 'sm',
      interactive: R,
      className: pt.card,
      children: [
        !y &&
          r.jsx('span', {
            className: pt.tierBadge,
            children: r.jsx(Xl, { text: `T${T}`, variant: 'patch-tier', tier: u }),
          }),
        r.jsxs('span', {
          className: [pt.count, o === 0 ? pt.countZero : ''].filter(Boolean).join(' '),
          style: Y,
          children: ['×', y ? '?' : o],
        }),
        r.jsx('div', {
          className: pt.iconWrap,
          style: q,
          children: r.jsx(Oe, {
            name: y ? 'close' : s,
            size: c4[_],
            color: y ? 'var(--c-text-disabled)' : M,
          }),
        }),
        r.jsx(G, {
          variant: 'caption',
          color: y ? 'dim' : 'text',
          className: pt.name,
          children: y ? '???' : c,
        }),
        !y &&
          r.jsxs('div', {
            className: pt.detail,
            children: [
              r.jsx('span', { className: pt.trigger, children: d }),
              r.jsx('span', { className: pt.effect, children: f }),
            ],
          }),
        p && r.jsx('span', { className: pt.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
function K0({ patch: c = null, slotIndex: s, locked: u = !1, size: o = 'md', onClick: d }) {
  const f = c != null,
    h = d != null && !u,
    p = s != null ? `Slot ${s}` : '',
    y = f
      ? `Slot ${s ?? ''}: ${c.name} (Tier ${c.tier})`
      : u
        ? `Slot ${s ?? ''} (locked)`.trim()
        : `Slot ${s ?? ''} (empty)`.trim(),
    g = f ? mn.filled : u ? mn.locked : mn.empty;
  return r.jsx('div', {
    className: [mn.wrapper, g, mn[`size-${o}`]].filter(Boolean).join(' '),
    role: h ? 'button' : void 0,
    tabIndex: h ? 0 : void 0,
    'aria-label': y,
    'aria-disabled': u ? !0 : void 0,
    onClick: h ? d : void 0,
    onKeyDown: h
      ? (_) => {
          (_.key === 'Enter' || _.key === ' ') && (_.preventDefault(), d == null || d());
        }
      : void 0,
    children:
      f && c != null
        ? r.jsx(zr, {
            patchId: c.patchId,
            name: c.name,
            iconName: c.iconName,
            tier: c.tier,
            count: c.count,
            trigger: c.trigger,
            effect: c.effect,
            size: o,
          })
        : r.jsxs('div', {
            className: mn.slotInner,
            children: [
              r.jsx('span', {
                className: mn.emptyIcon,
                children: r.jsx(Oe, {
                  name: u ? 'close' : 'plus',
                  size: 28,
                  color: u ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              r.jsx('span', { className: mn.emptyLabel, children: u ? 'LOCKED' : p }),
            ],
          }),
  });
}
function i4(c) {
  return Math.min(1 + c, Yl);
}
const s4 = {
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
  u4 = {
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
  o4 = {
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
function r4({ overridePatches: c, overrideEquipped: s, overridePatchSlotsLv: u }) {
  const o = k((R) => R.patches),
    d = k((R) => R.equippedPatches),
    f = k((R) => R.machineLevels.patchSlots),
    h = k((R) => R.unequipPatch),
    p = c ?? o,
    y = s ?? d,
    _ = i4(u ?? f),
    j = (R) => {
      const U = y.get(R);
      if (!U) return null;
      const q = `${U.name}#${U.tier}`,
        Y = p.get(q);
      return {
        patchId: q,
        name: U.name,
        iconName: s4[U.name] ?? 'spark',
        tier: U.tier,
        trigger: u4[U.name] ?? '常時',
        effect: o4[U.name] ?? '-',
        count: (Y == null ? void 0 : Y.count) ?? 0,
      };
    },
    T = (R) => {
      y.get(R) && h(R);
    },
    M = Yl - _;
  return r.jsxs('div', {
    className: ql.root,
    children: [
      r.jsxs('div', {
        className: ql.header,
        children: [
          r.jsxs('div', {
            className: ql.headerTitleRow,
            children: [
              r.jsx(G, { variant: 'heading-3', children: '装着スロット' }),
              r.jsxs(G, {
                variant: 'caption',
                color: 'mid',
                className: ql.headerCount,
                children: [y.size, '/', _],
              }),
            ],
          }),
          r.jsxs(G, {
            variant: 'caption',
            color: 'dim',
            children: ['(', Yl, ' スロット中 ', M, ' ロック・', y.size, ' / ', _, ' ', '装着中)'],
          }),
        ],
      }),
      r.jsx('div', {
        className: ql.slotGrid,
        children: Array.from({ length: Yl }, (R, U) => {
          const q = U >= _,
            Y = q ? null : j(U);
          return r.jsx(
            K0,
            { slotIndex: U + 1, patch: Y, locked: q, size: 'md', onClick: q ? void 0 : () => T(U) },
            U
          );
        }),
      }),
      y.size === 0 &&
        _ > 0 &&
        r.jsx(G, {
          variant: 'caption',
          color: 'dim',
          className: ql.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const f4 = '_root_16zq4_1',
  d4 = '_header_16zq4_8',
  m4 = '_grid_16zq4_14',
  h4 = '_empty_16zq4_20',
  Qc = { root: f4, header: d4, grid: m4, empty: h4 },
  p4 = {
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
  v4 = {
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
  y4 = {
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
function g4({ overridePatches: c, overrideEquipped: s, selectedId: u, onSelect: o }) {
  const d = k((_) => _.patches),
    f = k((_) => _.equippedPatches),
    h = c ?? d,
    p = s ?? f,
    y = new Set(Array.from(p.values()).map((_) => _.name)),
    g = Array.from(h.values());
  return g.length === 0
    ? r.jsx('div', {
        className: Qc.root,
        children: r.jsx('div', {
          className: Qc.empty,
          children: r.jsx(G, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : r.jsxs('div', {
        className: Qc.root,
        children: [
          r.jsxs('div', {
            className: Qc.header,
            children: [
              r.jsx(G, { variant: 'heading-3', children: 'パッチ在庫' }),
              r.jsxs(G, { variant: 'caption', color: 'dim', children: [g.length, ' 種類'] }),
            ],
          }),
          r.jsx('div', {
            className: Qc.grid,
            children: g.map((_) => {
              const j = `${_.name}#${_.tier}`,
                T = y.has(_.name);
              return r.jsx(
                zr,
                {
                  patchId: j,
                  name: _.name,
                  iconName: p4[_.name] ?? 'spark',
                  tier: _.tier,
                  count: _.count,
                  trigger: v4[_.name] ?? '常時',
                  effect: y4[_.name] ?? '-',
                  selected: u === j,
                  locked: T,
                  onClick: o ? () => o(u === j ? null : j) : void 0,
                },
                j
              );
            }),
          }),
        ],
      });
}
const _4 = '_root_1svx2_1',
  b4 = '_header_1svx2_8',
  S4 = '_tierControl_1svx2_14',
  x4 = '_tierStepperRow_1svx2_24',
  j4 = '_mergeList_1svx2_30',
  A4 = '_empty_1svx2_36',
  Gl = { root: _4, header: b4, tierControl: S4, tierStepperRow: x4, mergeList: j4, empty: A4 },
  T4 = '_stepper_1ouvh_1',
  E4 = '_disabled_1ouvh_6',
  N4 = '_btn_1ouvh_11',
  M4 = '_value_1ouvh_38',
  Vl = {
    stepper: T4,
    disabled: E4,
    btn: N4,
    value: M4,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  z4 = ({
    value: c,
    min: s,
    max: u,
    step: o = 1,
    onChange: d,
    size: f = 'md',
    disabled: h = !1,
  }) => {
    const p = c - o >= s,
      y = c + o <= u,
      g = () => {
        h || !p || d(Math.max(s, c - o));
      },
      _ = () => {
        h || !y || d(Math.min(u, c + o));
      };
    return r.jsxs('div', {
      className: [Vl.stepper, Vl[`size-${f}`], h ? Vl.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        r.jsx('button', {
          type: 'button',
          className: Vl.btn,
          onClick: g,
          disabled: h || !p,
          'aria-label': '減少',
          children: '−',
        }),
        r.jsx('span', {
          className: Vl.value,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          children: c,
        }),
        r.jsx('button', {
          type: 'button',
          className: Vl.btn,
          onClick: _,
          disabled: h || !y,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  hr = 5,
  C4 = {
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
function J0(c, s) {
  const u = [];
  for (const o of c.values())
    o.tier < s &&
      o.count >= 2 &&
      u.push({ name: o.name, tier: o.tier, count: o.count, iconName: C4[o.name] ?? 'spark' });
  return u.sort((o, d) => o.tier - d.tier || o.name.localeCompare(d.name));
}
function R4(c, s) {
  let u = new Map(c),
    o = !0;
  for (; o; ) {
    o = !1;
    for (const d of Array.from(u.values())) {
      if (d.tier >= s || d.count < 2 || d.tier >= hr) continue;
      const f = `${d.name}#${d.tier}`,
        h = Math.floor(d.count / 2),
        p = d.count % 2,
        y = d.tier + 1,
        g = `${d.name}#${y}`,
        _ = u.get(g),
        j = ((_ == null ? void 0 : _.count) ?? 0) + h;
      ((u = new Map(u)),
        p === 0 ? u.delete(f) : u.set(f, { ...d, count: p }),
        u.set(g, { name: d.name, tier: y, count: j }),
        (o = !0));
    }
  }
  return u;
}
function w4({ overridePatches: c }) {
  const s = k((T) => T.patches),
    u = k((T) => T.addPatch),
    o = k((T) => T.consumePatch),
    d = k((T) => T.pruneEmptyPatches),
    f = c ?? s,
    h = Math.max(1, ...Array.from(f.values()).map((T) => T.tier)),
    [p, y] = te.useState(Math.min(h, hr - 1)),
    g = J0(f, p + 1),
    _ = g.length > 0,
    j = () => {
      if (c) return;
      const T = R4(f, p + 1);
      for (const [M, R] of f) {
        const U = T.get(M),
          q = (U == null ? void 0 : U.count) ?? 0;
        q < R.count && o(R.name, R.tier, R.count - q);
      }
      for (const [M, R] of T) {
        const U = f.get(M),
          q = (U == null ? void 0 : U.count) ?? 0;
        R.count > q && u(R.name, R.tier, R.count - q);
      }
      d();
    };
  return r.jsxs('div', {
    className: Gl.root,
    children: [
      r.jsx('div', {
        className: Gl.header,
        children: r.jsx(G, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      r.jsxs('div', {
        className: Gl.tierControl,
        children: [
          r.jsx(G, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          r.jsxs('div', {
            className: Gl.tierStepperRow,
            children: [
              r.jsx(z4, { value: p, min: 1, max: hr - 1, onChange: y }),
              r.jsxs(G, {
                variant: 'caption',
                color: 'dim',
                children: ['T', p, ' 以下を T', p + 1, ' に合成'],
              }),
            ],
          }),
        ],
      }),
      _
        ? r.jsxs(r.Fragment, {
            children: [
              r.jsx('div', {
                className: Gl.mergeList,
                children: g.map((T) =>
                  r.jsx(
                    zr,
                    {
                      patchId: `${T.name}#${T.tier}`,
                      name: T.name,
                      iconName: T.iconName,
                      tier: T.tier,
                      count: T.count,
                      trigger: '-',
                      effect: '-',
                      merging: !0,
                      size: 'md',
                    },
                    `${T.name}#${T.tier}`
                  )
                ),
              }),
              r.jsx(Ut, {
                label: `一括合成 (${g.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: j,
              }),
            ],
          })
        : r.jsxs('div', {
            className: Gl.empty,
            children: [
              r.jsx(G, { variant: 'body', color: 'dim', children: '合成可能なパッチがありません' }),
              r.jsx(G, {
                variant: 'caption',
                color: 'dim',
                children: '同じ Tier のパッチが 2 個以上あると合成できます',
              }),
            ],
          }),
    ],
  });
}
function O4(c) {
  return Math.min(1 + c, Yl);
}
function D4() {
  const { navigate: c } = yn(),
    [s, u] = te.useState('equip'),
    o = k((M) => M.equippedPatches),
    d = k((M) => M.patches),
    f = k((M) => M.machineLevels.patchSlots),
    h = O4(f),
    p = o.size,
    y = d.size,
    g = J0(d, 5).length,
    _ = (M) => {
      c(M);
    },
    j = () => {
      c('preparation');
    },
    T = [
      { key: 'equip', label: '装着', badge: `${p}/${h}` },
      { key: 'inventory', label: '所持', badge: y > 0 ? y : void 0 },
      { key: 'merge', label: '合成', badge: g > 0 ? g : void 0 },
    ];
  return r.jsx(Qn, {
    header: r.jsx(ti, {
      title: 'パッチ庫',
      subtitle: `装着 ${p}/${h} ・ 在庫 ${y} 種`,
      onBack: j,
      currencies: [],
      tabBar: r.jsx(Ms, { tabs: T, value: s, onChange: u, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(ei, { active: 'patches', onChange: _ }),
    children: r.jsxs('div', {
      className: C5.content,
      children: [
        s === 'equip' && r.jsx(r4, {}),
        s === 'inventory' && r.jsx(g4, {}),
        s === 'merge' && r.jsx(w4, {}),
      ],
    }),
  });
}
const B4 = '_footer_qoo97_1',
  L4 = '_tabPanel_qoo97_7',
  y0 = { footer: B4, tabPanel: L4 },
  H4 = '_wrapper_1lf9s_1',
  U4 = '_header_1lf9s_7',
  q4 = '_headerLabel_1lf9s_13',
  G4 = '_empty_1lf9s_18',
  V4 = '_emptyIcon_1lf9s_29',
  $4 = '_grid_1lf9s_33',
  k4 = '_note_1lf9s_39',
  Gn = { wrapper: H4, header: U4, headerLabel: q4, empty: G4, emptyIcon: V4, grid: $4, note: k4 },
  Y4 = {
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
function Z4({ onOpenPatchScreen: c }) {
  const s = k((h) => h.equippedPatches),
    u = k((h) => h.machineLevels.patchSlots),
    o = Math.min(1 + u, Yl),
    d = [];
  for (let h = 0; h < o; h++) {
    const p = s.get(h);
    if (p != null) {
      const y = Y4[p.name],
        g = {
          patchId: `${p.name}#${p.tier}`,
          name: y.name,
          iconName: y.iconName,
          tier: p.tier,
          trigger: y.trigger,
          effect: y.effect,
          count: 1,
        };
      d.push({ kind: 'filled', patch: g, idx: h + 1 });
    } else d.push({ kind: 'empty', patch: null, idx: h + 1 });
  }
  const f = [...s.values()].length;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '装着パッチ',
    className: Gn.wrapper,
    children: [
      r.jsxs('div', {
        className: Gn.header,
        children: [
          r.jsxs(G, {
            variant: 'caption',
            color: 'mid',
            className: Gn.headerLabel,
            children: ['装着 ', f, ' / ', o],
          }),
          c != null &&
            r.jsx(Ut, {
              label: '装備変更',
              variant: 'ghost',
              size: 'sm',
              iconRight: r.jsx(Oe, { name: 'chevron-right', size: 14 }),
              onClick: c,
            }),
        ],
      }),
      f === 0
        ? r.jsxs('div', {
            className: Gn.empty,
            children: [
              r.jsx('span', {
                className: Gn.emptyIcon,
                children: r.jsx(Oe, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              r.jsx(G, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              c != null &&
                r.jsx(Ut, {
                  label: 'パッチ庫を開く',
                  variant: 'secondary',
                  size: 'sm',
                  onClick: c,
                }),
            ],
          })
        : r.jsx('div', {
            className: Gn.grid,
            children: d.map((h, p) =>
              r.jsx(K0, { patch: h.patch, slotIndex: h.idx, onClick: c }, p)
            ),
          }),
      r.jsx(G, {
        variant: 'caption',
        color: 'dim',
        align: 'center',
        as: 'p',
        className: Gn.note,
        children: '変更はパッチ庫で行えます',
      }),
    ],
  });
}
const X4 = '_wrapper_iebuz_1',
  Q4 = '_header_iebuz_7',
  K4 = '_grid_iebuz_12',
  ur = { wrapper: X4, header: Q4, grid: K4 },
  J4 = [
    {
      kind: 'laser',
      name: 'LASER',
      description: '高速直進ビーム。貫通で削る。',
      stats: [
        { label: 'DMG', value: 120, accent: 'primary' },
        { label: '貫通', value: 3 },
        { label: '射程', value: 580, suffix: 'm' },
        { label: '連射', value: 6.2, suffix: '/s' },
      ],
    },
    {
      kind: 'cannon',
      name: 'CANNON',
      description: '範囲爆発で群れを薙ぐ。',
      stats: [
        { label: 'DMG', value: 480, accent: 'primary' },
        { label: '半径', value: 120, suffix: 'm' },
        { label: '射程', value: 520, suffix: 'm' },
        { label: '連射', value: 0.9, suffix: '/s' },
      ],
    },
    {
      kind: 'thunder',
      name: 'THUNDER',
      description: '隣接敵に連鎖する電撃。',
      stats: [
        { label: 'DMG', value: 84, accent: 'primary' },
        { label: '連鎖', value: 5 },
        { label: '射程', value: 420, suffix: 'm' },
        { label: '連射', value: 3.4, suffix: '/s' },
      ],
    },
    {
      kind: 'cutter',
      name: 'CUTTER',
      description: 'マシン周囲を旋回する斬撃。',
      stats: [
        { label: 'DMG', value: 62, accent: 'primary' },
        { label: '旋回', value: 180, suffix: 'm' },
        { label: '同時', value: 4 },
        { label: '連射', value: 8, suffix: '/s' },
      ],
    },
  ];
function W4({ selectedWeapon: c, onSelect: s }) {
  const u = k((h) => h.initialWeapon),
    o = k((h) => h.setInitialWeapon),
    d = c ?? u,
    f = (h) => {
      (o(h), s == null || s(h));
    };
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: ur.wrapper,
    children: [
      r.jsx('div', {
        className: ur.header,
        children: r.jsx(G, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      r.jsx('div', {
        className: ur.grid,
        children: J4.map((h) =>
          r.jsx(
            D0,
            {
              weapon: h.kind,
              name: h.name,
              description: h.description,
              stats: h.stats,
              layout: 'tall',
              active: h.kind === d,
              onClick: () => f(h.kind),
            },
            h.kind
          )
        ),
      }),
    ],
  });
}
const F4 = '_wrapper_1rg1e_1',
  I4 = '_sticky_1rg1e_15',
  P4 = '_summary_1rg1e_19',
  ej = '_weaponInfo_1rg1e_29',
  tj = '_patchInfo_1rg1e_37',
  Kc = { wrapper: F4, sticky: I4, summary: P4, weaponInfo: ej, patchInfo: tj };
function aj({
  tier: c,
  weaponKind: s,
  patchCount: u = 0,
  disabled: o = !1,
  onLaunch: d,
  sticky: f = !0,
}) {
  return r.jsxs('div', {
    role: 'group',
    'aria-label': '出撃',
    className: [Kc.wrapper, f ? Kc.sticky : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Kc.summary,
        children: [
          c != null && r.jsx(Xl, { variant: 'tier', tier: c, size: 'sm' }),
          s != null &&
            r.jsxs('span', {
              className: Kc.weaponInfo,
              children: [
                r.jsx(Oe, { name: s, size: 14 }),
                r.jsx(G, { variant: 'label', color: 'primary', children: s.toUpperCase() }),
              ],
            }),
          r.jsxs('span', {
            className: Kc.patchInfo,
            children: [
              r.jsx(Oe, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              r.jsxs(G, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', u] }),
            ],
          }),
        ],
      }),
      r.jsx(Ut, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: o,
        iconLeft: r.jsx(Oe, { name: 'tower', size: 18 }),
        onClick: d,
      }),
    ],
  });
}
const nj = '_wrapper_1ul9l_1',
  lj = '_header_1ul9l_7',
  cj = '_grid_1ul9l_14',
  ij = '_tierBtn_1ul9l_20',
  sj = '_active_1ul9l_35',
  uj = '_tierLabel_1ul9l_50',
  oj = '_frontierLabel_1ul9l_61',
  Vn = {
    wrapper: nj,
    header: lj,
    grid: cj,
    tierBtn: ij,
    active: sj,
    tierLabel: uj,
    frontierLabel: oj,
  };
function rj({ selectedTier: c, onSelect: s }) {
  const u = k((h) => h.highestTier),
    o = Math.max(1, u),
    d = [];
  for (let h = 1; h <= o; h++) d.push(h);
  const f = (h) => `var(--c-tier-${Math.max(1, Math.min(10, h))})`;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': 'Tier 選択',
    className: Vn.wrapper,
    children: [
      r.jsxs('div', {
        className: Vn.header,
        children: [
          r.jsx(G, {
            variant: 'caption',
            color: 'mid',
            children: '到達済み Tier を選んで出撃します。',
          }),
          r.jsxs(G, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', o] }),
        ],
      }),
      r.jsx('div', {
        className: Vn.grid,
        children: d.map((h) => {
          const p = h === c,
            y = h === o,
            g = f(h);
          return r.jsxs(
            'button',
            {
              type: 'button',
              'aria-pressed': p,
              'data-active': p,
              'data-frontier': y,
              className: [Vn.tierBtn, p ? Vn.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': g },
              onClick: () => (s == null ? void 0 : s(h)),
              children: [
                r.jsxs('span', { className: Vn.tierLabel, children: ['T', h] }),
                y && !p && r.jsx('span', { className: Vn.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            h
          );
        }),
      }),
    ],
  });
}
const fj = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function dj(c) {
  const { initialSelectedTier: s } = c,
    { navigate: u } = yn(),
    [o, d] = te.useState('tier'),
    f = k((Y) => Y.highestTier),
    [h, p] = te.useState(s ?? Math.max(1, f)),
    y = k((Y) => Y.initialWeapon),
    _ = [...k((Y) => Y.equippedPatches).values()].length,
    j = k((Y) => Y.machineLevels),
    T = k((Y) => Y.gameSpeed),
    M = k((Y) => Y.startRun);
  function R() {
    const Y = Q0.find((oe) => oe.key === 'maxHp'),
      K = Y != null ? mr(Y, j.maxHp) : 100;
    (M({ initialWeapon: y, baseMachineMaxHp: F.fromNumber(K), gameSpeed: T }), u('battle'));
  }
  const U = r.jsx(ti, {
      title: '出撃準備',
      currencies: ['screw', 'bolt', 'alloy'],
      tabBar: r.jsx(Ms, { tabs: fj, value: o, onChange: d, variant: 'underline', fullWidth: !0 }),
    }),
    q = r.jsxs('div', {
      className: y0.footer,
      children: [
        r.jsx(aj, { tier: h, weaponKind: y, patchCount: _, sticky: !1, onLaunch: R }),
        r.jsx(ei, { active: 'preparation', onChange: (Y) => u(Y) }),
      ],
    });
  return r.jsx(Qn, {
    header: U,
    footer: q,
    children: r.jsxs('div', {
      className: y0.tabPanel,
      children: [
        o === 'tier' && r.jsx(rj, { selectedTier: h, onSelect: p }),
        o === 'weapon' && r.jsx(W4, {}),
        o === 'patches' && r.jsx(Z4, { onOpenPatchScreen: () => u('patches') }),
      ],
    }),
  });
}
const mj = '_content_8gsha_1',
  hj = { content: mj },
  pj = '_root_1b7n9_1',
  vj = '_header_1b7n9_8',
  yj = '_storageCard_1b7n9_13',
  gj = '_storageRow_1b7n9_23',
  _j = '_divider_1b7n9_29',
  bj = '_section_1b7n9_34',
  Sj = '_dangerSection_1b7n9_40',
  xj = '_sectionHeader_1b7n9_50',
  Jt = {
    root: pj,
    header: vj,
    storageCard: yj,
    storageRow: gj,
    divider: _j,
    section: bj,
    dangerSection: Sj,
    sectionHeader: xj,
  },
  jj = '_wrapper_11b89_1',
  Aj = '_disabled_11b89_6',
  Tj = '_hiddenInput_11b89_11',
  Ej = '_btn_11b89_15',
  Nj = '_fileName_11b89_41',
  Jc = { wrapper: jj, disabled: Aj, hiddenInput: Tj, btn: Ej, fileName: Nj },
  Mj = ({
    accept: c = 'application/json',
    onChange: s,
    label: u = 'ファイルを選択',
    disabled: o = !1,
  }) => {
    const d = te.useRef(null),
      [f, h] = te.useState(null),
      p = () => {
        var g;
        o || (g = d.current) == null || g.click();
      },
      y = (g) => {
        var j;
        const _ = ((j = g.target.files) == null ? void 0 : j[0]) ?? null;
        (h((_ == null ? void 0 : _.name) ?? null), s(_), d.current && (d.current.value = ''));
      };
    return r.jsxs('div', {
      className: [Jc.wrapper, o ? Jc.disabled : ''].join(' '),
      children: [
        r.jsx('input', {
          ref: d,
          type: 'file',
          accept: c,
          className: Jc.hiddenInput,
          onChange: y,
          disabled: o,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        r.jsx('button', {
          type: 'button',
          className: Jc.btn,
          onClick: p,
          disabled: o,
          children: u,
        }),
        f && r.jsx('span', { className: Jc.fileName, title: f, children: f }),
      ],
    });
  };
function zj({ storageInfo: c, onExport: s, onImport: u, onReset: o }) {
  const [d, f] = te.useState(!1),
    [h, p] = te.useState(!1),
    [y, g] = te.useState(!1),
    _ = async () => {
      if (s) {
        g(!0);
        try {
          await s();
        } finally {
          g(!1);
        }
      }
    },
    j = async (M) => {
      if (!(!M || !u)) {
        p(!0);
        try {
          await u(M);
        } finally {
          p(!1);
        }
      }
    },
    T = async () => {
      (f(!1), o && (await o()));
    };
  return r.jsxs('div', {
    className: Jt.root,
    children: [
      r.jsx('div', {
        className: Jt.header,
        children: r.jsx(G, { variant: 'heading-3', children: 'データ管理' }),
      }),
      c &&
        r.jsxs('div', {
          className: Jt.storageCard,
          children: [
            r.jsx(G, { variant: 'label', color: 'mid', children: 'ストレージ使用量' }),
            r.jsxs('div', {
              className: Jt.storageRow,
              children: [
                r.jsx(G, { variant: 'numeric-l', children: c.usedKb }),
                r.jsx(G, { variant: 'caption', color: 'dim', children: 'KB' }),
              ],
            }),
            r.jsxs(G, {
              variant: 'caption',
              color: 'dim',
              children: ['セーブスロット: ', c.slots, ' / 最終保存: ', c.lastSavedAt],
            }),
          ],
        }),
      r.jsx('div', { className: Jt.divider }),
      r.jsxs('div', {
        className: Jt.section,
        children: [
          r.jsxs('div', {
            className: Jt.sectionHeader,
            children: [
              r.jsx(G, { variant: 'label', color: 'mid', children: 'エクスポート' }),
              r.jsx(G, {
                variant: 'caption',
                color: 'dim',
                children: 'セーブデータを JSON ファイルとしてダウンロード',
              }),
            ],
          }),
          r.jsx(Ut, {
            label: y ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: _,
            disabled: y || !s,
          }),
        ],
      }),
      r.jsxs('div', {
        className: Jt.section,
        children: [
          r.jsxs('div', {
            className: Jt.sectionHeader,
            children: [
              r.jsx(G, { variant: 'label', color: 'mid', children: 'インポート' }),
              r.jsx(G, {
                variant: 'caption',
                color: 'dim',
                children: 'JSON ファイルからセーブデータを復元（上書き）',
              }),
            ],
          }),
          r.jsx(Mj, {
            accept: 'application/json',
            onChange: j,
            label: h ? 'インポート中...' : 'ファイルを選択してインポート',
            disabled: h || !u,
          }),
        ],
      }),
      r.jsx('div', { className: Jt.divider }),
      r.jsxs('div', {
        className: Jt.dangerSection,
        children: [
          r.jsxs('div', {
            className: Jt.sectionHeader,
            children: [
              r.jsx(G, { variant: 'label', color: 'mid', children: 'データリセット' }),
              r.jsx(G, {
                variant: 'caption',
                color: 'dim',
                children: 'すべてのデータを削除します。この操作は取り消せません。',
              }),
            ],
          }),
          r.jsx(Ut, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => f(!0),
            disabled: !o,
          }),
        ],
      }),
      r.jsx(U0, {
        open: d,
        title: 'データをリセットしますか？',
        message: 'すべてのセーブデータが削除されます。この操作は取り消せません。',
        iconName: 'skull',
        confirmLabel: 'リセットする',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: T,
        onCancel: () => f(!1),
      }),
    ],
  });
}
const Cj = '_root_1rbig_1',
  Rj = '_header_1rbig_8',
  wj = '_section_1rbig_13',
  Oj = '_sectionHeader_1rbig_20',
  Dj = '_divider_1rbig_26',
  $l = { root: Cj, header: Rj, section: wj, sectionHeader: Oj, divider: Dj },
  Bj = '_wrapper_16nmz_9',
  Lj = '_disabled_16nmz_15',
  Hj = '_off_16nmz_31',
  Uj = '_on_16nmz_35',
  qj = '_accent_primary_16nmz_35',
  Gj = '_accent_secondary_16nmz_39',
  Vj = '_accent_success_16nmz_43',
  $j = '_accent_disabled_16nmz_47',
  kj = '_size_md_16nmz_56',
  Yj = '_knob_16nmz_60',
  Zj = '_size_sm_16nmz_70',
  Xj = '_labelGroup_16nmz_93',
  Qj = '_label_16nmz_93',
  Kj = '_description_16nmz_106',
  la = {
    wrapper: Bj,
    disabled: Lj,
    switch: '_switch_16nmz_22',
    off: Hj,
    on: Uj,
    accent_primary: qj,
    accent_secondary: Gj,
    accent_success: Vj,
    accent_disabled: $j,
    size_md: kj,
    knob: Yj,
    size_sm: Zj,
    labelGroup: Xj,
    label: Qj,
    description: Kj,
  },
  W0 = ({
    checked: c,
    onChange: s,
    disabled: u = !1,
    label: o,
    description: d,
    accent: f = 'primary',
    size: h = 'md',
  }) => {
    const p = u || f === 'disabled',
      y = () => {
        p || s(!c);
      };
    return r.jsxs('label', {
      className: [la.wrapper, p ? la.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': p,
      children: [
        r.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': c,
          'aria-disabled': p,
          className: [la.switch, c ? la.on : la.off, la[`size_${h}`], la[`accent_${f}`]]
            .filter(Boolean)
            .join(' '),
          onClick: y,
          disabled: p,
          children: r.jsx('span', { className: la.knob }),
        }),
        (o || d) &&
          r.jsxs('span', {
            className: la.labelGroup,
            children: [
              o && r.jsx('span', { className: la.label, children: o }),
              d && r.jsx('span', { className: la.description, children: d }),
            ],
          }),
      ],
    });
  },
  Jj = [
    { label: '×1', value: 1 },
    { label: '×2', value: 2 },
    { label: '×3', value: 3 },
  ];
function Wj({ overrideVibration: c, overrideSpeed: s, onVibrationChange: u, onSpeedChange: o }) {
  const d = k((T) => T.vibrationEnabled),
    f = k((T) => T.defaultGameSpeed),
    h = k((T) => T.setVibrationEnabled),
    p = k((T) => T.setDefaultGameSpeed),
    y = c ?? d,
    g = s ?? f,
    _ = (T) => {
      u ? u(T) : h(T);
    },
    j = (T) => {
      o ? o(T) : p(T);
    };
  return r.jsxs('div', {
    className: $l.root,
    children: [
      r.jsx('div', {
        className: $l.header,
        children: r.jsx(G, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      r.jsx('div', {
        className: $l.section,
        children: r.jsx(W0, {
          checked: y,
          onChange: _,
          label: 'バイブレーション',
          description: '操作時に端末を振動させます',
        }),
      }),
      r.jsx('div', { className: $l.divider }),
      r.jsxs('div', {
        className: $l.section,
        children: [
          r.jsxs('div', {
            className: $l.sectionHeader,
            children: [
              r.jsx(G, { variant: 'label', color: 'mid', children: '初期速度倍率' }),
              r.jsx(G, { variant: 'caption', color: 'dim', children: 'ゲーム開始時の速度' }),
            ],
          }),
          r.jsx(H0, { options: Jj, value: g, onChange: j }),
        ],
      }),
    ],
  });
}
const Fj = '_root_nuc5y_2',
  Ij = '_muteRow_nuc5y_9',
  Pj = '_muteLabelGroup_nuc5y_16',
  eA = '_sliderRow_nuc5y_24',
  tA = '_muted_nuc5y_29',
  aA = '_sliderIcon_nuc5y_29',
  nA = '_sliderArea_nuc5y_41',
  lA = '_sliderValue_nuc5y_46',
  pn = {
    root: Fj,
    muteRow: Ij,
    muteLabelGroup: Pj,
    sliderRow: eA,
    muted: tA,
    sliderIcon: aA,
    sliderArea: nA,
    sliderValue: lA,
  };
function g0({ label: c, iconName: s, value: u, muted: o, onChange: d }) {
  return r.jsx(Kn, {
    variant: 'sunken',
    padding: 'md',
    children: r.jsxs('div', {
      className: [pn.sliderRow, o ? pn.muted : ''].filter(Boolean).join(' '),
      children: [
        r.jsx('span', { className: pn.sliderIcon, children: r.jsx(Oe, { name: s, size: 16 }) }),
        r.jsx(G, { variant: 'label', color: o ? 'dim' : 'mid', children: c }),
        r.jsx('div', {
          className: pn.sliderArea,
          children: r.jsx(dr, { value: u, min: 0, max: 1, step: 0.01, onChange: d, disabled: o }),
        }),
        r.jsx('span', {
          className: pn.sliderValue,
          children: r.jsx(vn, {
            value: Math.round(u * 100),
            size: 'sm',
            accentColor: o ? 'dim' : 'text',
          }),
        }),
      ],
    }),
  });
}
function cA({
  overrideBgmVolume: c,
  overrideSeVolume: s,
  overrideMute: u,
  onBgmChange: o,
  onSeChange: d,
  onMuteChange: f,
}) {
  const h = k((q) => q.bgmVolume),
    p = k((q) => q.seVolume),
    y = k((q) => q.setBgmVolume),
    g = k((q) => q.setSeVolume),
    _ = c ?? h,
    j = s ?? p,
    T = u ?? !1,
    M = (q) => {
      o ? o(q) : (y(q), Pe.setBgmVolume(T ? 0 : q));
    },
    R = (q) => {
      d ? d(q) : (g(q), Pe.setSeVolume(T ? 0 : q));
    },
    U = (q) => {
      f ? f(q) : (Pe.setBgmVolume(q ? 0 : _), Pe.setSeVolume(q ? 0 : j));
    };
  return r.jsxs('div', {
    className: pn.root,
    role: 'tabpanel',
    'aria-label': 'サウンド設定',
    children: [
      r.jsx(Kn, {
        variant: 'sunken',
        padding: 'md',
        children: r.jsxs('div', {
          className: pn.muteRow,
          children: [
            r.jsxs('span', {
              className: pn.muteLabelGroup,
              children: [
                r.jsx(G, { variant: 'label', color: 'mid', children: 'ミュート' }),
                r.jsx(G, { variant: 'caption', color: 'dim', children: '全サウンドを一時停止' }),
              ],
            }),
            r.jsx(W0, { checked: T, onChange: U, accent: 'primary' }),
          ],
        }),
      }),
      r.jsx(g0, { label: 'BGM', iconName: 'play', value: _, muted: T, onChange: M }),
      r.jsx(g0, { label: 'SE', iconName: 'spark', value: j, muted: T, onChange: R }),
    ],
  });
}
const pr = (c, s) => s.some((u) => c instanceof u);
let _0, b0;
function iA() {
  return _0 || (_0 = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function sA() {
  return (
    b0 ||
    (b0 = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const vr = new WeakMap(),
  or = new WeakMap(),
  Bs = new WeakMap();
function uA(c) {
  const s = new Promise((u, o) => {
    const d = () => {
        (c.removeEventListener('success', f), c.removeEventListener('error', h));
      },
      f = () => {
        (u(Zn(c.result)), d());
      },
      h = () => {
        (o(c.error), d());
      };
    (c.addEventListener('success', f), c.addEventListener('error', h));
  });
  return (Bs.set(s, c), s);
}
function oA(c) {
  if (vr.has(c)) return;
  const s = new Promise((u, o) => {
    const d = () => {
        (c.removeEventListener('complete', f),
          c.removeEventListener('error', h),
          c.removeEventListener('abort', h));
      },
      f = () => {
        (u(), d());
      },
      h = () => {
        (o(c.error || new DOMException('AbortError', 'AbortError')), d());
      };
    (c.addEventListener('complete', f),
      c.addEventListener('error', h),
      c.addEventListener('abort', h));
  });
  vr.set(c, s);
}
let yr = {
  get(c, s, u) {
    if (c instanceof IDBTransaction) {
      if (s === 'done') return vr.get(c);
      if (s === 'store')
        return u.objectStoreNames[1] ? void 0 : u.objectStore(u.objectStoreNames[0]);
    }
    return Zn(c[s]);
  },
  set(c, s, u) {
    return ((c[s] = u), !0);
  },
  has(c, s) {
    return c instanceof IDBTransaction && (s === 'done' || s === 'store') ? !0 : s in c;
  },
};
function F0(c) {
  yr = c(yr);
}
function rA(c) {
  return sA().includes(c)
    ? function (...s) {
        return (c.apply(gr(this), s), Zn(this.request));
      }
    : function (...s) {
        return Zn(c.apply(gr(this), s));
      };
}
function fA(c) {
  return typeof c == 'function'
    ? rA(c)
    : (c instanceof IDBTransaction && oA(c), pr(c, iA()) ? new Proxy(c, yr) : c);
}
function Zn(c) {
  if (c instanceof IDBRequest) return uA(c);
  if (or.has(c)) return or.get(c);
  const s = fA(c);
  return (s !== c && (or.set(c, s), Bs.set(s, c)), s);
}
const gr = (c) => Bs.get(c);
function dA(c, s, { blocked: u, upgrade: o, blocking: d, terminated: f } = {}) {
  const h = indexedDB.open(c, s),
    p = Zn(h);
  return (
    o &&
      h.addEventListener('upgradeneeded', (y) => {
        o(Zn(h.result), y.oldVersion, y.newVersion, Zn(h.transaction), y);
      }),
    u && h.addEventListener('blocked', (y) => u(y.oldVersion, y.newVersion, y)),
    p
      .then((y) => {
        (f && y.addEventListener('close', () => f()),
          d && y.addEventListener('versionchange', (g) => d(g.oldVersion, g.newVersion, g)));
      })
      .catch(() => {}),
    p
  );
}
const mA = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  hA = ['put', 'add', 'delete', 'clear'],
  rr = new Map();
function S0(c, s) {
  if (!(c instanceof IDBDatabase && !(s in c) && typeof s == 'string')) return;
  if (rr.get(s)) return rr.get(s);
  const u = s.replace(/FromIndex$/, ''),
    o = s !== u,
    d = hA.includes(u);
  if (!(u in (o ? IDBIndex : IDBObjectStore).prototype) || !(d || mA.includes(u))) return;
  const f = async function (h, ...p) {
    const y = this.transaction(h, d ? 'readwrite' : 'readonly');
    let g = y.store;
    return (o && (g = g.index(p.shift())), (await Promise.all([g[u](...p), d && y.done]))[0]);
  };
  return (rr.set(s, f), f);
}
F0((c) => ({
  ...c,
  get: (s, u, o) => S0(s, u) || c.get(s, u, o),
  has: (s, u) => !!S0(s, u) || c.has(s, u),
}));
const pA = ['continue', 'continuePrimaryKey', 'advance'],
  x0 = {},
  _r = new WeakMap(),
  I0 = new WeakMap(),
  vA = {
    get(c, s) {
      if (!pA.includes(s)) return c[s];
      let u = x0[s];
      return (
        u ||
          (u = x0[s] =
            function (...o) {
              _r.set(this, I0.get(this)[s](...o));
            }),
        u
      );
    },
  };
async function* yA(...c) {
  let s = this;
  if ((s instanceof IDBCursor || (s = await s.openCursor(...c)), !s)) return;
  s = s;
  const u = new Proxy(s, vA);
  for (I0.set(u, s), Bs.set(u, gr(s)); s; )
    (yield u, (s = await (_r.get(u) || s.continue())), _r.delete(u));
}
function j0(c, s) {
  return (
    (s === Symbol.asyncIterator && pr(c, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (s === 'iterate' && pr(c, [IDBIndex, IDBObjectStore]))
  );
}
F0((c) => ({
  ...c,
  get(s, u, o) {
    return j0(s, u) ? yA : c.get(s, u, o);
  },
  has(s, u) {
    return j0(s, u) || c.has(s, u);
  },
}));
const gA = {
  1: (c) => {
    (c.createObjectStore(W.profile, { keyPath: 'id' }),
      c.createObjectStore(W.currencies, { keyPath: 'id' }),
      c.createObjectStore(W.machine, { keyPath: 'key' }),
      c.createObjectStore(W.weapons, { keyPath: 'id' }),
      c
        .createObjectStore(W.patches, { keyPath: ['name', 'tier'] })
        .createIndex('byName', 'name', { unique: !1 }),
      c.createObjectStore(W.equippedPatches, { keyPath: 'slotIndex' }),
      c.createObjectStore(W.settings, { keyPath: 'id' }));
  },
};
function _A(c, s, u, o) {
  for (let d = u + 1; d <= o; d++) {
    const f = gA[d];
    if (!f) throw new Error(`No migration registered for version ${d}`);
    f(c, s);
  }
}
let Wc = null;
async function A0() {
  return (
    Wc ||
    ((Wc = await dA(C0, Ts, {
      upgrade(c, s, u, o) {
        try {
          _A(c, o, s, u ?? Ts);
        } catch (d) {
          throw (console.error('[DB] Migration failed:', d), d);
        }
      },
    })),
    await bA(Wc),
    Wc)
  );
}
async function bA(c) {
  const s = c.transaction([W.profile, W.currencies, W.machine, W.weapons, W.settings], 'readwrite'),
    [u, o, d, f] = await Promise.all([
      s.objectStore(W.profile).get('singleton'),
      s.objectStore(W.currencies).get('singleton'),
      s.objectStore(W.weapons).get('singleton'),
      s.objectStore(W.settings).get('singleton'),
    ]),
    h = Date.now(),
    p = [];
  (u || p.push(s.objectStore(W.profile).put({ ...Dg, createdAt: h, lastPlayedAt: h })),
    o || p.push(s.objectStore(W.currencies).put(Bg)),
    d || p.push(s.objectStore(W.weapons).put(Lg)),
    f || p.push(s.objectStore(W.settings).put(Hg)));
  const y = s.objectStore(W.machine),
    g = await y.getAllKeys(),
    _ = new Set(g);
  for (const j of R0) _.has(j) || p.push(y.put({ key: j, lv: 0 }));
  (await Promise.all(p), await s.done);
}
async function SA(c) {
  const s = c.transaction(
      [W.profile, W.currencies, W.machine, W.weapons, W.patches, W.equippedPatches, W.settings],
      'readonly'
    ),
    [u, o, d, f, h, p, y] = await Promise.all([
      s.objectStore(W.profile).get('singleton'),
      s.objectStore(W.currencies).get('singleton'),
      s.objectStore(W.machine).getAll(),
      s.objectStore(W.weapons).get('singleton'),
      s.objectStore(W.patches).getAll(),
      s.objectStore(W.equippedPatches).getAll(),
      s.objectStore(W.settings).get('singleton'),
    ]);
  if ((await s.done, !u || !o || !f || !y))
    throw new Error(
      '[DB] loadSaveState: Required singleton record is missing. Run openDatabase() first.'
    );
  return {
    profile: u,
    currencies: o,
    machine: d,
    weapons: f,
    patches: h,
    equippedPatches: p,
    settings: y,
  };
}
const P0 = 'tower-like-game:import-backups',
  xA = 3;
function jA() {
  try {
    const c = localStorage.getItem(P0);
    return c ? JSON.parse(c) : [];
  } catch {
    return [];
  }
}
function AA(c) {
  try {
    localStorage.setItem(P0, JSON.stringify(c));
  } catch (s) {
    console.warn('[DB] Failed to save backup to localStorage:', s);
  }
}
function TA(c) {
  const s = jA();
  s.unshift({ savedAt: Date.now(), data: c });
  const u = s.slice(0, xA);
  AA(u);
}
async function e1(c) {
  const s = await SA(c);
  return { formatVersion: 1, dbVersion: Ts, exportedAt: Date.now(), data: s };
}
async function EA(c, s) {
  if (s.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${s.formatVersion}`);
  try {
    const f = await e1(c);
    TA(f);
  } catch (f) {
    console.warn('[DB] Pre-import backup failed (proceeding anyway):', f);
  }
  const { data: u } = s,
    o = c.transaction(
      [W.profile, W.currencies, W.machine, W.weapons, W.patches, W.equippedPatches, W.settings],
      'readwrite'
    );
  await Promise.all([
    o.objectStore(W.profile).clear(),
    o.objectStore(W.currencies).clear(),
    o.objectStore(W.machine).clear(),
    o.objectStore(W.weapons).clear(),
    o.objectStore(W.patches).clear(),
    o.objectStore(W.equippedPatches).clear(),
    o.objectStore(W.settings).clear(),
  ]);
  const d = [
    o.objectStore(W.profile).put(u.profile),
    o.objectStore(W.currencies).put(u.currencies),
    o.objectStore(W.weapons).put(u.weapons),
    o.objectStore(W.settings).put(u.settings),
    ...u.machine.map((f) => o.objectStore(W.machine).put(f)),
    ...u.patches.map((f) => o.objectStore(W.patches).put(f)),
    ...u.equippedPatches.map((f) => o.objectStore(W.equippedPatches).put(f)),
  ];
  (await Promise.all(d), await o.done);
}
const NA = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function MA() {
  const { navigate: c } = yn(),
    [s, u] = te.useState('sound'),
    o = async () => {
      const h = await A0(),
        p = await e1(h),
        y = JSON.stringify(p, null, 2),
        g = new Blob([y], { type: 'application/json' }),
        _ = URL.createObjectURL(g),
        j = document.createElement('a');
      ((j.href = _),
        (j.download = `neon-spire-save-${new Date().toISOString().slice(0, 10)}.json`),
        j.click(),
        URL.revokeObjectURL(_));
    },
    d = async (h) => {
      const p = await h.text(),
        y = JSON.parse(p),
        g = await A0();
      (await EA(g, y), window.location.reload());
    },
    f = async () => {
      (indexedDB.deleteDatabase(C0), window.location.reload());
    };
  return r.jsx(Qn, {
    header: r.jsx(ti, {
      title: '設定',
      onBack: () => c('title'),
      currencies: [],
      tabBar: r.jsx(Ms, { tabs: NA, value: s, onChange: u, fullWidth: !0 }),
    }),
    footer: r.jsx(ei, { active: 'settings', onChange: c }),
    children: r.jsxs('div', {
      className: hj.content,
      children: [
        s === 'sound' && r.jsx(cA, {}),
        s === 'game' && r.jsx(Wj, {}),
        s === 'data' && r.jsx(zj, { onExport: o, onImport: d, onReset: f }),
      ],
    }),
  });
}
const zA = '_layout_198wk_1',
  CA = '_heroWrap_198wk_12',
  T0 = { layout: zA, heroWrap: CA },
  RA = '_root_5udm7_1',
  wA = { root: RA };
function OA({ onResume: c, onNewGame: s, lastSavedAt: u }) {
  const d = k((f) => f.createdAt) > 0;
  return r.jsxs('div', {
    className: wA.root,
    children: [
      r.jsx(Ut, {
        label: d ? '続きから' : '続きから (セーブなし)',
        variant: d ? 'primary' : 'ghost',
        size: 'lg',
        fullWidth: !0,
        disabled: !d,
        iconLeft: r.jsx(Oe, { name: 'play', size: 18 }),
        onClick: c,
      }),
      d &&
        u != null &&
        r.jsx(G, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
          children: '最終セーブ: ' + u,
        }),
      r.jsx(Ut, {
        label: '新規開始',
        variant: d ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: r.jsx(Oe, { name: 'plus', size: 18 }),
        onClick: s,
      }),
    ],
  });
}
const DA = '_root_qkflo_2',
  BA = '_title_qkflo_12',
  E0 = { root: DA, title: BA };
function LA({ title: c = 'NEON SPIRE', subtitle: s, version: u, tagline: o }) {
  return r.jsxs('header', {
    className: E0.root,
    role: 'banner',
    children: [
      r.jsx('h1', { className: E0.title, children: c }),
      s != null &&
        r.jsx(G, {
          variant: 'label',
          color: 'mid',
          align: 'center',
          style: { fontSize: 11, letterSpacing: '0.24em' },
          children: s,
        }),
      o != null &&
        r.jsx(G, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { marginTop: 4, fontSize: 11 },
          children: o,
        }),
      u != null &&
        r.jsx(G, {
          variant: 'numeric-s',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10, marginTop: 6, opacity: 0.7 },
          children: u,
        }),
    ],
  });
}
const HA = '_root_1szye_1',
  UA = '_ringOuter_1szye_9',
  qA = '_ringMiddle_1szye_17',
  GA = '_glowDisc_1szye_24',
  VA = '_cornerAccent_1szye_31',
  $A = '_icon_1szye_40',
  kl = { root: HA, ringOuter: UA, ringMiddle: qA, glowDisc: GA, cornerAccent: VA, icon: $A };
function kA({ size: c = 180, iconName: s = 'tower' }) {
  return r.jsxs('div', {
    className: kl.root,
    style: { width: c, height: c },
    role: 'presentation',
    'aria-hidden': 'true',
    children: [
      r.jsx('div', { className: kl.ringOuter }),
      r.jsx('div', { className: kl.ringMiddle }),
      r.jsx('div', { className: kl.glowDisc }),
      [0, 90, 180, 270].map((u) =>
        r.jsx(
          'div',
          {
            className: kl.cornerAccent,
            style: { transform: `rotate(${u}deg) translate(${c / 2 - 5}px) rotate(45deg)` },
          },
          u
        )
      ),
      r.jsx('span', {
        className: kl.icon,
        children: r.jsx(Oe, { name: s, size: Math.round(c * 0.49) }),
      }),
    ],
  });
}
function YA(c) {
  if (c < 0) return '今';
  const s = Math.floor(c / 1e3);
  if (s < 60) return '今';
  const u = Math.floor(s / 60);
  if (u < 60) return `${u} 分前`;
  const o = Math.floor(u / 60);
  return o < 24 ? `${o} 時間前` : `${Math.floor(o / 24)} 日前`;
}
function ZA() {
  const { navigate: c } = yn(),
    s = k((o) => o.createdAt),
    u = te.useMemo(() => (s > 0 ? YA(Date.now() - s) : void 0), [s]);
  return r.jsx(Qn, {
    children: r.jsxs('div', {
      className: T0.layout,
      children: [
        r.jsx(LA, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.1.0',
        }),
        r.jsx('div', { className: T0.heroWrap, children: r.jsx(kA, {}) }),
        r.jsx(OA, {
          lastSavedAt: u,
          onResume: () => c('preparation'),
          onNewGame: () => c('preparation'),
        }),
      ],
    }),
  });
}
function XA() {
  const { screen: c } = yn();
  switch (c) {
    case 'title':
      return r.jsx(ZA, {});
    case 'preparation':
      return r.jsx(dj, {});
    case 'machine':
      return r.jsx(N5, {});
    case 'armory':
      return r.jsx(s2, {});
    case 'patches':
      return r.jsx(D4, {});
    case 'settings':
      return r.jsx(MA, {});
    case 'battle':
      return r.jsx(x5, {});
    default:
      return r.jsx(M5, {});
  }
}
const t1 = document.getElementById('root');
if (!t1) throw new Error('Failed to find #root element');
Bv.createRoot(t1).render(r.jsx(c2, { children: r.jsx(XA, {}) }));
