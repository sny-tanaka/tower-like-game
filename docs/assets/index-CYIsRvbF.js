var Fv = Object.defineProperty;
var Iv = (c, s, u) =>
  s in c ? Fv(c, s, { enumerable: !0, configurable: !0, writable: !0, value: u }) : (c[s] = u);
var Ke = (c, s, u) => Iv(c, typeof s != 'symbol' ? s + '' : s, u);
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const m of document.querySelectorAll('link[rel="modulepreload"]')) o(m);
  new MutationObserver((m) => {
    for (const d of m)
      if (d.type === 'childList')
        for (const h of d.addedNodes) h.tagName === 'LINK' && h.rel === 'modulepreload' && o(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(m) {
    const d = {};
    return (
      m.integrity && (d.integrity = m.integrity),
      m.referrerPolicy && (d.referrerPolicy = m.referrerPolicy),
      m.crossOrigin === 'use-credentials'
        ? (d.credentials = 'include')
        : m.crossOrigin === 'anonymous'
          ? (d.credentials = 'omit')
          : (d.credentials = 'same-origin'),
      d
    );
  }
  function o(m) {
    if (m.ep) return;
    m.ep = !0;
    const d = u(m);
    fetch(m.href, d);
  }
})();
function Pv(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var Zo = { exports: {} },
  Ti = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xh;
function tg() {
  if (xh) return Ti;
  xh = 1;
  var c = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.fragment');
  function u(o, m, d) {
    var h = null;
    if ((d !== void 0 && (h = '' + d), m.key !== void 0 && (h = '' + m.key), 'key' in m)) {
      d = {};
      for (var g in m) g !== 'key' && (d[g] = m[g]);
    } else d = m;
    return ((m = d.ref), { $$typeof: c, type: o, key: h, ref: m !== void 0 ? m : null, props: d });
  }
  return ((Ti.Fragment = s), (Ti.jsx = u), (Ti.jsxs = u), Ti);
}
var jh;
function eg() {
  return (jh || ((jh = 1), (Zo.exports = tg())), Zo.exports);
}
var r = eg(),
  Xo = { exports: {} },
  Ai = {},
  ko = { exports: {} },
  Qo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Th;
function ag() {
  return (
    Th ||
      ((Th = 1),
      (function (c) {
        function s(w, G) {
          var W = w.length;
          w.push(G);
          t: for (; 0 < W; ) {
            var pt = (W - 1) >>> 1,
              yt = w[pt];
            if (0 < m(yt, G)) ((w[pt] = G), (w[W] = yt), (W = pt));
            else break t;
          }
        }
        function u(w) {
          return w.length === 0 ? null : w[0];
        }
        function o(w) {
          if (w.length === 0) return null;
          var G = w[0],
            W = w.pop();
          if (W !== G) {
            w[0] = W;
            t: for (var pt = 0, yt = w.length, x = yt >>> 1; pt < x; ) {
              var B = 2 * (pt + 1) - 1,
                V = w[B],
                Z = B + 1,
                I = w[Z];
              if (0 > m(V, W))
                Z < yt && 0 > m(I, V)
                  ? ((w[pt] = I), (w[Z] = W), (pt = Z))
                  : ((w[pt] = V), (w[B] = W), (pt = B));
              else if (Z < yt && 0 > m(I, W)) ((w[pt] = I), (w[Z] = W), (pt = Z));
              else break t;
            }
          }
          return G;
        }
        function m(w, G) {
          var W = w.sortIndex - G.sortIndex;
          return W !== 0 ? W : w.id - G.id;
        }
        if (
          ((c.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var d = performance;
          c.unstable_now = function () {
            return d.now();
          };
        } else {
          var h = Date,
            g = h.now();
          c.unstable_now = function () {
            return h.now() - g;
          };
        }
        var p = [],
          _ = [],
          b = 1,
          E = null,
          j = 3,
          H = !1,
          L = !1,
          $ = !1,
          U = !1,
          vt = typeof setTimeout == 'function' ? setTimeout : null,
          F = typeof clearTimeout == 'function' ? clearTimeout : null,
          _t = typeof setImmediate < 'u' ? setImmediate : null;
        function Yt(w) {
          for (var G = u(_); G !== null; ) {
            if (G.callback === null) o(_);
            else if (G.startTime <= w) (o(_), (G.sortIndex = G.expirationTime), s(p, G));
            else break;
            G = u(_);
          }
        }
        function ae(w) {
          if ((($ = !1), Yt(w), !L))
            if (u(p) !== null) ((L = !0), Dt || ((Dt = !0), kt()));
            else {
              var G = u(_);
              G !== null && le(ae, G.startTime - w);
            }
        }
        var Dt = !1,
          lt = -1,
          Xt = 5,
          re = -1;
        function se() {
          return U ? !0 : !(c.unstable_now() - re < Xt);
        }
        function Bt() {
          if (((U = !1), Dt)) {
            var w = c.unstable_now();
            re = w;
            var G = !0;
            try {
              t: {
                ((L = !1), $ && (($ = !1), F(lt), (lt = -1)), (H = !0));
                var W = j;
                try {
                  e: {
                    for (Yt(w), E = u(p); E !== null && !(E.expirationTime > w && se()); ) {
                      var pt = E.callback;
                      if (typeof pt == 'function') {
                        ((E.callback = null), (j = E.priorityLevel));
                        var yt = pt(E.expirationTime <= w);
                        if (((w = c.unstable_now()), typeof yt == 'function')) {
                          ((E.callback = yt), Yt(w), (G = !0));
                          break e;
                        }
                        (E === u(p) && o(p), Yt(w));
                      } else o(p);
                      E = u(p);
                    }
                    if (E !== null) G = !0;
                    else {
                      var x = u(_);
                      (x !== null && le(ae, x.startTime - w), (G = !1));
                    }
                  }
                  break t;
                } finally {
                  ((E = null), (j = W), (H = !1));
                }
                G = void 0;
              }
            } finally {
              G ? kt() : (Dt = !1);
            }
          }
        }
        var kt;
        if (typeof _t == 'function')
          kt = function () {
            _t(Bt);
          };
        else if (typeof MessageChannel < 'u') {
          var Ze = new MessageChannel(),
            we = Ze.port2;
          ((Ze.port1.onmessage = Bt),
            (kt = function () {
              we.postMessage(null);
            }));
        } else
          kt = function () {
            vt(Bt, 0);
          };
        function le(w, G) {
          lt = vt(function () {
            w(c.unstable_now());
          }, G);
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
              : (Xt = 0 < w ? Math.floor(1e3 / w) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return j;
          }),
          (c.unstable_next = function (w) {
            switch (j) {
              case 1:
              case 2:
              case 3:
                var G = 3;
                break;
              default:
                G = j;
            }
            var W = j;
            j = G;
            try {
              return w();
            } finally {
              j = W;
            }
          }),
          (c.unstable_requestPaint = function () {
            U = !0;
          }),
          (c.unstable_runWithPriority = function (w, G) {
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
            var W = j;
            j = w;
            try {
              return G();
            } finally {
              j = W;
            }
          }),
          (c.unstable_scheduleCallback = function (w, G, W) {
            var pt = c.unstable_now();
            switch (
              (typeof W == 'object' && W !== null
                ? ((W = W.delay), (W = typeof W == 'number' && 0 < W ? pt + W : pt))
                : (W = pt),
              w)
            ) {
              case 1:
                var yt = -1;
                break;
              case 2:
                yt = 250;
                break;
              case 5:
                yt = 1073741823;
                break;
              case 4:
                yt = 1e4;
                break;
              default:
                yt = 5e3;
            }
            return (
              (yt = W + yt),
              (w = {
                id: b++,
                callback: G,
                priorityLevel: w,
                startTime: W,
                expirationTime: yt,
                sortIndex: -1,
              }),
              W > pt
                ? ((w.sortIndex = W),
                  s(_, w),
                  u(p) === null &&
                    w === u(_) &&
                    ($ ? (F(lt), (lt = -1)) : ($ = !0), le(ae, W - pt)))
                : ((w.sortIndex = yt), s(p, w), L || H || ((L = !0), Dt || ((Dt = !0), kt()))),
              w
            );
          }),
          (c.unstable_shouldYield = se),
          (c.unstable_wrapCallback = function (w) {
            var G = j;
            return function () {
              var W = j;
              j = G;
              try {
                return w.apply(this, arguments);
              } finally {
                j = W;
              }
            };
          }));
      })(Qo)),
    Qo
  );
}
var Ah;
function lg() {
  return (Ah || ((Ah = 1), (ko.exports = ag())), ko.exports);
}
var Ko = { exports: {} },
  P = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nh;
function ng() {
  if (Nh) return P;
  Nh = 1;
  var c = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.portal'),
    u = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    m = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    g = Symbol.for('react.forward_ref'),
    p = Symbol.for('react.suspense'),
    _ = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    E = Symbol.for('react.activity'),
    j = Symbol.iterator;
  function H(x) {
    return x === null || typeof x != 'object'
      ? null
      : ((x = (j && x[j]) || x['@@iterator']), typeof x == 'function' ? x : null);
  }
  var L = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    $ = Object.assign,
    U = {};
  function vt(x, B, V) {
    ((this.props = x), (this.context = B), (this.refs = U), (this.updater = V || L));
  }
  ((vt.prototype.isReactComponent = {}),
    (vt.prototype.setState = function (x, B) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, B, 'setState');
    }),
    (vt.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function F() {}
  F.prototype = vt.prototype;
  function _t(x, B, V) {
    ((this.props = x), (this.context = B), (this.refs = U), (this.updater = V || L));
  }
  var Yt = (_t.prototype = new F());
  ((Yt.constructor = _t), $(Yt, vt.prototype), (Yt.isPureReactComponent = !0));
  var ae = Array.isArray;
  function Dt() {}
  var lt = { H: null, A: null, T: null, S: null },
    Xt = Object.prototype.hasOwnProperty;
  function re(x, B, V) {
    var Z = V.ref;
    return { $$typeof: c, type: x, key: B, ref: Z !== void 0 ? Z : null, props: V };
  }
  function se(x, B) {
    return re(x.type, B, x.props);
  }
  function Bt(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === c;
  }
  function kt(x) {
    var B = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function (V) {
        return B[V];
      })
    );
  }
  var Ze = /\/+/g;
  function we(x, B) {
    return typeof x == 'object' && x !== null && x.key != null ? kt('' + x.key) : B.toString(36);
  }
  function le(x) {
    switch (x.status) {
      case 'fulfilled':
        return x.value;
      case 'rejected':
        throw x.reason;
      default:
        switch (
          (typeof x.status == 'string'
            ? x.then(Dt, Dt)
            : ((x.status = 'pending'),
              x.then(
                function (B) {
                  x.status === 'pending' && ((x.status = 'fulfilled'), (x.value = B));
                },
                function (B) {
                  x.status === 'pending' && ((x.status = 'rejected'), (x.reason = B));
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
  function w(x, B, V, Z, I) {
    var nt = typeof x;
    (nt === 'undefined' || nt === 'boolean') && (x = null);
    var dt = !1;
    if (x === null) dt = !0;
    else
      switch (nt) {
        case 'bigint':
        case 'string':
        case 'number':
          dt = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case c:
            case s:
              dt = !0;
              break;
            case b:
              return ((dt = x._init), w(dt(x._payload), B, V, Z, I));
          }
      }
    if (dt)
      return (
        (I = I(x)),
        (dt = Z === '' ? '.' + we(x, 0) : Z),
        ae(I)
          ? ((V = ''),
            dt != null && (V = dt.replace(Ze, '$&/') + '/'),
            w(I, B, V, '', function (ul) {
              return ul;
            }))
          : I != null &&
            (Bt(I) &&
              (I = se(
                I,
                V +
                  (I.key == null || (x && x.key === I.key)
                    ? ''
                    : ('' + I.key).replace(Ze, '$&/') + '/') +
                  dt
              )),
            B.push(I)),
        1
      );
    dt = 0;
    var Wt = Z === '' ? '.' : Z + ':';
    if (ae(x))
      for (var wt = 0; wt < x.length; wt++)
        ((Z = x[wt]), (nt = Wt + we(Z, wt)), (dt += w(Z, B, V, nt, I)));
    else if (((wt = H(x)), typeof wt == 'function'))
      for (x = wt.call(x), wt = 0; !(Z = x.next()).done; )
        ((Z = Z.value), (nt = Wt + we(Z, wt++)), (dt += w(Z, B, V, nt, I)));
    else if (nt === 'object') {
      if (typeof x.then == 'function') return w(le(x), B, V, Z, I);
      throw (
        (B = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (B === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : B) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return dt;
  }
  function G(x, B, V) {
    if (x == null) return x;
    var Z = [],
      I = 0;
    return (
      w(x, Z, '', '', function (nt) {
        return B.call(V, nt, I++);
      }),
      Z
    );
  }
  function W(x) {
    if (x._status === -1) {
      var B = x._result;
      ((B = B()),
        B.then(
          function (V) {
            (x._status === 0 || x._status === -1) && ((x._status = 1), (x._result = V));
          },
          function (V) {
            (x._status === 0 || x._status === -1) && ((x._status = 2), (x._result = V));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = B)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var pt =
      typeof reportError == 'function'
        ? reportError
        : function (x) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var B = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof x == 'object' && x !== null && typeof x.message == 'string'
                    ? String(x.message)
                    : String(x),
                error: x,
              });
              if (!window.dispatchEvent(B)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', x);
              return;
            }
            console.error(x);
          },
    yt = {
      map: G,
      forEach: function (x, B, V) {
        G(
          x,
          function () {
            B.apply(this, arguments);
          },
          V
        );
      },
      count: function (x) {
        var B = 0;
        return (
          G(x, function () {
            B++;
          }),
          B
        );
      },
      toArray: function (x) {
        return (
          G(x, function (B) {
            return B;
          }) || []
        );
      },
      only: function (x) {
        if (!Bt(x))
          throw Error('React.Children.only expected to receive a single React element child.');
        return x;
      },
    };
  return (
    (P.Activity = E),
    (P.Children = yt),
    (P.Component = vt),
    (P.Fragment = u),
    (P.Profiler = m),
    (P.PureComponent = _t),
    (P.StrictMode = o),
    (P.Suspense = p),
    (P.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = lt),
    (P.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return lt.H.useMemoCache(x);
      },
    }),
    (P.cache = function (x) {
      return function () {
        return x.apply(null, arguments);
      };
    }),
    (P.cacheSignal = function () {
      return null;
    }),
    (P.cloneElement = function (x, B, V) {
      if (x == null) throw Error('The argument must be a React element, but you passed ' + x + '.');
      var Z = $({}, x.props),
        I = x.key;
      if (B != null)
        for (nt in (B.key !== void 0 && (I = '' + B.key), B))
          !Xt.call(B, nt) ||
            nt === 'key' ||
            nt === '__self' ||
            nt === '__source' ||
            (nt === 'ref' && B.ref === void 0) ||
            (Z[nt] = B[nt]);
      var nt = arguments.length - 2;
      if (nt === 1) Z.children = V;
      else if (1 < nt) {
        for (var dt = Array(nt), Wt = 0; Wt < nt; Wt++) dt[Wt] = arguments[Wt + 2];
        Z.children = dt;
      }
      return re(x.type, I, Z);
    }),
    (P.createContext = function (x) {
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
        (x.Consumer = { $$typeof: d, _context: x }),
        x
      );
    }),
    (P.createElement = function (x, B, V) {
      var Z,
        I = {},
        nt = null;
      if (B != null)
        for (Z in (B.key !== void 0 && (nt = '' + B.key), B))
          Xt.call(B, Z) && Z !== 'key' && Z !== '__self' && Z !== '__source' && (I[Z] = B[Z]);
      var dt = arguments.length - 2;
      if (dt === 1) I.children = V;
      else if (1 < dt) {
        for (var Wt = Array(dt), wt = 0; wt < dt; wt++) Wt[wt] = arguments[wt + 2];
        I.children = Wt;
      }
      if (x && x.defaultProps)
        for (Z in ((dt = x.defaultProps), dt)) I[Z] === void 0 && (I[Z] = dt[Z]);
      return re(x, nt, I);
    }),
    (P.createRef = function () {
      return { current: null };
    }),
    (P.forwardRef = function (x) {
      return { $$typeof: g, render: x };
    }),
    (P.isValidElement = Bt),
    (P.lazy = function (x) {
      return { $$typeof: b, _payload: { _status: -1, _result: x }, _init: W };
    }),
    (P.memo = function (x, B) {
      return { $$typeof: _, type: x, compare: B === void 0 ? null : B };
    }),
    (P.startTransition = function (x) {
      var B = lt.T,
        V = {};
      lt.T = V;
      try {
        var Z = x(),
          I = lt.S;
        (I !== null && I(V, Z),
          typeof Z == 'object' && Z !== null && typeof Z.then == 'function' && Z.then(Dt, pt));
      } catch (nt) {
        pt(nt);
      } finally {
        (B !== null && V.types !== null && (B.types = V.types), (lt.T = B));
      }
    }),
    (P.unstable_useCacheRefresh = function () {
      return lt.H.useCacheRefresh();
    }),
    (P.use = function (x) {
      return lt.H.use(x);
    }),
    (P.useActionState = function (x, B, V) {
      return lt.H.useActionState(x, B, V);
    }),
    (P.useCallback = function (x, B) {
      return lt.H.useCallback(x, B);
    }),
    (P.useContext = function (x) {
      return lt.H.useContext(x);
    }),
    (P.useDebugValue = function () {}),
    (P.useDeferredValue = function (x, B) {
      return lt.H.useDeferredValue(x, B);
    }),
    (P.useEffect = function (x, B) {
      return lt.H.useEffect(x, B);
    }),
    (P.useEffectEvent = function (x) {
      return lt.H.useEffectEvent(x);
    }),
    (P.useId = function () {
      return lt.H.useId();
    }),
    (P.useImperativeHandle = function (x, B, V) {
      return lt.H.useImperativeHandle(x, B, V);
    }),
    (P.useInsertionEffect = function (x, B) {
      return lt.H.useInsertionEffect(x, B);
    }),
    (P.useLayoutEffect = function (x, B) {
      return lt.H.useLayoutEffect(x, B);
    }),
    (P.useMemo = function (x, B) {
      return lt.H.useMemo(x, B);
    }),
    (P.useOptimistic = function (x, B) {
      return lt.H.useOptimistic(x, B);
    }),
    (P.useReducer = function (x, B, V) {
      return lt.H.useReducer(x, B, V);
    }),
    (P.useRef = function (x) {
      return lt.H.useRef(x);
    }),
    (P.useState = function (x) {
      return lt.H.useState(x);
    }),
    (P.useSyncExternalStore = function (x, B, V) {
      return lt.H.useSyncExternalStore(x, B, V);
    }),
    (P.useTransition = function () {
      return lt.H.useTransition();
    }),
    (P.version = '19.2.5'),
    P
  );
}
var Eh;
function fr() {
  return (Eh || ((Eh = 1), (Ko.exports = ng())), Ko.exports);
}
var Jo = { exports: {} },
  ne = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zh;
function ig() {
  if (zh) return ne;
  zh = 1;
  var c = fr();
  function s(p) {
    var _ = 'https://react.dev/errors/' + p;
    if (1 < arguments.length) {
      _ += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++) _ += '&args[]=' + encodeURIComponent(arguments[b]);
    }
    return (
      'Minified React error #' +
      p +
      '; visit ' +
      _ +
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
    m = Symbol.for('react.portal');
  function d(p, _, b) {
    var E = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: E == null ? null : '' + E,
      children: p,
      containerInfo: _,
      implementation: b,
    };
  }
  var h = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(p, _) {
    if (p === 'font') return '';
    if (typeof _ == 'string') return _ === 'use-credentials' ? _ : '';
  }
  return (
    (ne.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (ne.createPortal = function (p, _) {
      var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!_ || (_.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)) throw Error(s(299));
      return d(p, _, null, b);
    }),
    (ne.flushSync = function (p) {
      var _ = h.T,
        b = o.p;
      try {
        if (((h.T = null), (o.p = 2), p)) return p();
      } finally {
        ((h.T = _), (o.p = b), o.d.f());
      }
    }),
    (ne.preconnect = function (p, _) {
      typeof p == 'string' &&
        (_
          ? ((_ = _.crossOrigin),
            (_ = typeof _ == 'string' ? (_ === 'use-credentials' ? _ : '') : void 0))
          : (_ = null),
        o.d.C(p, _));
    }),
    (ne.prefetchDNS = function (p) {
      typeof p == 'string' && o.d.D(p);
    }),
    (ne.preinit = function (p, _) {
      if (typeof p == 'string' && _ && typeof _.as == 'string') {
        var b = _.as,
          E = g(b, _.crossOrigin),
          j = typeof _.integrity == 'string' ? _.integrity : void 0,
          H = typeof _.fetchPriority == 'string' ? _.fetchPriority : void 0;
        b === 'style'
          ? o.d.S(p, typeof _.precedence == 'string' ? _.precedence : void 0, {
              crossOrigin: E,
              integrity: j,
              fetchPriority: H,
            })
          : b === 'script' &&
            o.d.X(p, {
              crossOrigin: E,
              integrity: j,
              fetchPriority: H,
              nonce: typeof _.nonce == 'string' ? _.nonce : void 0,
            });
      }
    }),
    (ne.preinitModule = function (p, _) {
      if (typeof p == 'string')
        if (typeof _ == 'object' && _ !== null) {
          if (_.as == null || _.as === 'script') {
            var b = g(_.as, _.crossOrigin);
            o.d.M(p, {
              crossOrigin: b,
              integrity: typeof _.integrity == 'string' ? _.integrity : void 0,
              nonce: typeof _.nonce == 'string' ? _.nonce : void 0,
            });
          }
        } else _ == null && o.d.M(p);
    }),
    (ne.preload = function (p, _) {
      if (typeof p == 'string' && typeof _ == 'object' && _ !== null && typeof _.as == 'string') {
        var b = _.as,
          E = g(b, _.crossOrigin);
        o.d.L(p, b, {
          crossOrigin: E,
          integrity: typeof _.integrity == 'string' ? _.integrity : void 0,
          nonce: typeof _.nonce == 'string' ? _.nonce : void 0,
          type: typeof _.type == 'string' ? _.type : void 0,
          fetchPriority: typeof _.fetchPriority == 'string' ? _.fetchPriority : void 0,
          referrerPolicy: typeof _.referrerPolicy == 'string' ? _.referrerPolicy : void 0,
          imageSrcSet: typeof _.imageSrcSet == 'string' ? _.imageSrcSet : void 0,
          imageSizes: typeof _.imageSizes == 'string' ? _.imageSizes : void 0,
          media: typeof _.media == 'string' ? _.media : void 0,
        });
      }
    }),
    (ne.preloadModule = function (p, _) {
      if (typeof p == 'string')
        if (_) {
          var b = g(_.as, _.crossOrigin);
          o.d.m(p, {
            as: typeof _.as == 'string' && _.as !== 'script' ? _.as : void 0,
            crossOrigin: b,
            integrity: typeof _.integrity == 'string' ? _.integrity : void 0,
          });
        } else o.d.m(p);
    }),
    (ne.requestFormReset = function (p) {
      o.d.r(p);
    }),
    (ne.unstable_batchedUpdates = function (p, _) {
      return p(_);
    }),
    (ne.useFormState = function (p, _, b) {
      return h.H.useFormState(p, _, b);
    }),
    (ne.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (ne.version = '19.2.5'),
    ne
  );
}
var Mh;
function cg() {
  if (Mh) return Jo.exports;
  Mh = 1;
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
  return (c(), (Jo.exports = ig()), Jo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ch;
function sg() {
  if (Ch) return Ai;
  Ch = 1;
  var c = lg(),
    s = fr(),
    u = cg();
  function o(t) {
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
  function m(t) {
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
  function h(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (d(t) !== t) throw Error(o(188));
  }
  function _(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = d(t)), e === null)) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var a = t, l = e; ; ) {
      var n = a.return;
      if (n === null) break;
      var i = n.alternate;
      if (i === null) {
        if (((l = n.return), l !== null)) {
          a = l;
          continue;
        }
        break;
      }
      if (n.child === i.child) {
        for (i = n.child; i; ) {
          if (i === a) return (p(n), t);
          if (i === l) return (p(n), e);
          i = i.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== l.return) ((a = n), (l = i));
      else {
        for (var f = !1, v = n.child; v; ) {
          if (v === a) {
            ((f = !0), (a = n), (l = i));
            break;
          }
          if (v === l) {
            ((f = !0), (l = n), (a = i));
            break;
          }
          v = v.sibling;
        }
        if (!f) {
          for (v = i.child; v; ) {
            if (v === a) {
              ((f = !0), (a = i), (l = n));
              break;
            }
            if (v === l) {
              ((f = !0), (l = i), (a = n));
              break;
            }
            v = v.sibling;
          }
          if (!f) throw Error(o(189));
        }
      }
      if (a.alternate !== l) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? t : e;
  }
  function b(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = b(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var E = Object.assign,
    j = Symbol.for('react.element'),
    H = Symbol.for('react.transitional.element'),
    L = Symbol.for('react.portal'),
    $ = Symbol.for('react.fragment'),
    U = Symbol.for('react.strict_mode'),
    vt = Symbol.for('react.profiler'),
    F = Symbol.for('react.consumer'),
    _t = Symbol.for('react.context'),
    Yt = Symbol.for('react.forward_ref'),
    ae = Symbol.for('react.suspense'),
    Dt = Symbol.for('react.suspense_list'),
    lt = Symbol.for('react.memo'),
    Xt = Symbol.for('react.lazy'),
    re = Symbol.for('react.activity'),
    se = Symbol.for('react.memo_cache_sentinel'),
    Bt = Symbol.iterator;
  function kt(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (Bt && t[Bt]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var Ze = Symbol.for('react.client.reference');
  function we(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === Ze ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case $:
        return 'Fragment';
      case vt:
        return 'Profiler';
      case U:
        return 'StrictMode';
      case ae:
        return 'Suspense';
      case Dt:
        return 'SuspenseList';
      case re:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case L:
          return 'Portal';
        case _t:
          return t.displayName || 'Context';
        case F:
          return (t._context.displayName || 'Context') + '.Consumer';
        case Yt:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case lt:
          return ((e = t.displayName || null), e !== null ? e : we(t.type) || 'Memo');
        case Xt:
          ((e = t._payload), (t = t._init));
          try {
            return we(t(e));
          } catch {}
      }
    return null;
  }
  var le = Array.isArray,
    w = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    G = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    W = { pending: !1, data: null, method: null, action: null },
    pt = [],
    yt = -1;
  function x(t) {
    return { current: t };
  }
  function B(t) {
    0 > yt || ((t.current = pt[yt]), (pt[yt] = null), yt--);
  }
  function V(t, e) {
    (yt++, (pt[yt] = t.current), (t.current = e));
  }
  var Z = x(null),
    I = x(null),
    nt = x(null),
    dt = x(null);
  function Wt(t, e) {
    switch ((V(nt, e), V(I, t), V(Z, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Xm(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = Xm(e)), (t = km(e, t)));
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
    (B(Z), V(Z, t));
  }
  function wt() {
    (B(Z), B(I), B(nt));
  }
  function ul(t) {
    t.memoizedState !== null && V(dt, t);
    var e = Z.current,
      a = km(e, t.type);
    e !== a && (V(I, t), V(Z, a));
  }
  function Bl(t) {
    (I.current === t && (B(Z), B(I)), dt.current === t && (B(dt), (bi._currentValue = W)));
  }
  var Ll, Es;
  function Ca(t) {
    if (Ll === void 0)
      try {
        throw Error();
      } catch (a) {
        var e = a.stack.trim().match(/\n( *(at )?)/);
        ((Ll = (e && e[1]) || ''),
          (Es =
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
      Ll +
      t +
      Es
    );
  }
  var tt = !1;
  function Hl(t, e) {
    if (!t || tt) return '';
    tt = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var D = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(D.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(D, []);
                } catch (M) {
                  var z = M;
                }
                Reflect.construct(t, [], D);
              } else {
                try {
                  D.call();
                } catch (M) {
                  z = M;
                }
                t.call(D.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (M) {
                z = M;
              }
              (D = t()) && typeof D.catch == 'function' && D.catch(function () {});
            }
          } catch (M) {
            if (M && z && typeof M.stack == 'string') return [M.stack, z.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var n = Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot, 'name');
      n &&
        n.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var i = l.DetermineComponentFrameRoot(),
        f = i[0],
        v = i[1];
      if (f && v) {
        var y = f.split(`
`),
          N = v.split(`
`);
        for (n = l = 0; l < y.length && !y[l].includes('DetermineComponentFrameRoot'); ) l++;
        for (; n < N.length && !N[n].includes('DetermineComponentFrameRoot'); ) n++;
        if (l === y.length || n === N.length)
          for (l = y.length - 1, n = N.length - 1; 1 <= l && 0 <= n && y[l] !== N[n]; ) n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (y[l] !== N[n]) {
            if (l !== 1 || n !== 1)
              do
                if ((l--, n--, 0 > n || y[l] !== N[n])) {
                  var C =
                    `
` + y[l].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      C.includes('<anonymous>') &&
                      (C = C.replace('<anonymous>', t.displayName)),
                    C
                  );
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      ((tt = !1), (Error.prepareStackTrace = a));
    }
    return (a = t ? t.displayName || t.name : '') ? Ca(a) : '';
  }
  function Yi(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ca(t.type);
      case 16:
        return Ca('Lazy');
      case 13:
        return t.child !== e && e !== null ? Ca('Suspense Fallback') : Ca('Suspense');
      case 19:
        return Ca('SuspenseList');
      case 0:
      case 15:
        return Hl(t.type, !1);
      case 11:
        return Hl(t.type.render, !1);
      case 1:
        return Hl(t.type, !0);
      case 31:
        return Ca('Activity');
      default:
        return '';
    }
  }
  function Sr(t) {
    try {
      var e = '',
        a = null;
      do ((e += Yi(t, a)), (a = t), (t = t.return));
      while (t);
      return e;
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      );
    }
  }
  var zs = Object.prototype.hasOwnProperty,
    Ms = c.unstable_scheduleCallback,
    Cs = c.unstable_cancelCallback,
    M0 = c.unstable_shouldYield,
    C0 = c.unstable_requestPaint,
    be = c.unstable_now,
    w0 = c.unstable_getCurrentPriorityLevel,
    xr = c.unstable_ImmediatePriority,
    jr = c.unstable_UserBlockingPriority,
    Zi = c.unstable_NormalPriority,
    O0 = c.unstable_LowPriority,
    Tr = c.unstable_IdlePriority,
    R0 = c.log,
    D0 = c.unstable_setDisableYieldValue,
    On = null,
    Se = null;
  function wa(t) {
    if ((typeof R0 == 'function' && D0(t), Se && typeof Se.setStrictMode == 'function'))
      try {
        Se.setStrictMode(On, t);
      } catch {}
  }
  var xe = Math.clz32 ? Math.clz32 : H0,
    B0 = Math.log,
    L0 = Math.LN2;
  function H0(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((B0(t) / L0) | 0)) | 0);
  }
  var Xi = 256,
    ki = 262144,
    Qi = 4194304;
  function ol(t) {
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
  function Ki(t, e, a) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var n = 0,
      i = t.suspendedLanes,
      f = t.pingedLanes;
    t = t.warmLanes;
    var v = l & 134217727;
    return (
      v !== 0
        ? ((l = v & ~i),
          l !== 0
            ? (n = ol(l))
            : ((f &= v), f !== 0 ? (n = ol(f)) : a || ((a = v & ~t), a !== 0 && (n = ol(a)))))
        : ((v = l & ~i),
          v !== 0
            ? (n = ol(v))
            : f !== 0
              ? (n = ol(f))
              : a || ((a = l & ~t), a !== 0 && (n = ol(a)))),
      n === 0
        ? 0
        : e !== 0 &&
            e !== n &&
            (e & i) === 0 &&
            ((i = n & -n), (a = e & -e), i >= a || (i === 32 && (a & 4194048) !== 0))
          ? e
          : n
    );
  }
  function Rn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function q0(t, e) {
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
  function Ar() {
    var t = Qi;
    return ((Qi <<= 1), (Qi & 62914560) === 0 && (Qi = 4194304), t);
  }
  function ws(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function Dn(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function U0(t, e, a, l, n, i) {
    var f = t.pendingLanes;
    ((t.pendingLanes = a),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= a),
      (t.entangledLanes &= a),
      (t.errorRecoveryDisabledLanes &= a),
      (t.shellSuspendCounter = 0));
    var v = t.entanglements,
      y = t.expirationTimes,
      N = t.hiddenUpdates;
    for (a = f & ~a; 0 < a; ) {
      var C = 31 - xe(a),
        D = 1 << C;
      ((v[C] = 0), (y[C] = -1));
      var z = N[C];
      if (z !== null)
        for (N[C] = null, C = 0; C < z.length; C++) {
          var M = z[C];
          M !== null && (M.lane &= -536870913);
        }
      a &= ~D;
    }
    (l !== 0 && Nr(t, l, 0),
      i !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(f & ~e)));
  }
  function Nr(t, e, a) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var l = 31 - xe(e);
    ((t.entangledLanes |= e),
      (t.entanglements[l] = t.entanglements[l] | 1073741824 | (a & 261930)));
  }
  function Er(t, e) {
    var a = (t.entangledLanes |= e);
    for (t = t.entanglements; a; ) {
      var l = 31 - xe(a),
        n = 1 << l;
      ((n & e) | (t[l] & e) && (t[l] |= e), (a &= ~n));
    }
  }
  function zr(t, e) {
    var a = e & -e;
    return ((a = (a & 42) !== 0 ? 1 : Os(a)), (a & (t.suspendedLanes | e)) !== 0 ? 0 : a);
  }
  function Os(t) {
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
  function Rs(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Mr() {
    var t = G.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : vh(t.type));
  }
  function Cr(t, e) {
    var a = G.p;
    try {
      return ((G.p = t), e());
    } finally {
      G.p = a;
    }
  }
  var Oa = Math.random().toString(36).slice(2),
    Ft = '__reactFiber$' + Oa,
    fe = '__reactProps$' + Oa,
    ql = '__reactContainer$' + Oa,
    Ds = '__reactEvents$' + Oa,
    G0 = '__reactListeners$' + Oa,
    V0 = '__reactHandles$' + Oa,
    wr = '__reactResources$' + Oa,
    Bn = '__reactMarker$' + Oa;
  function Bs(t) {
    (delete t[Ft], delete t[fe], delete t[Ds], delete t[G0], delete t[V0]);
  }
  function Ul(t) {
    var e = t[Ft];
    if (e) return e;
    for (var a = t.parentNode; a; ) {
      if ((e = a[ql] || a[Ft])) {
        if (((a = e.alternate), e.child !== null || (a !== null && a.child !== null)))
          for (t = Pm(t); t !== null; ) {
            if ((a = t[Ft])) return a;
            t = Pm(t);
          }
        return e;
      }
      ((t = a), (a = t.parentNode));
    }
    return null;
  }
  function Gl(t) {
    if ((t = t[Ft] || t[ql])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function Ln(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Vl(t) {
    var e = t[wr];
    return (e || (e = t[wr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function Qt(t) {
    t[Bn] = !0;
  }
  var Or = new Set(),
    Rr = {};
  function rl(t, e) {
    ($l(t, e), $l(t + 'Capture', e));
  }
  function $l(t, e) {
    for (Rr[t] = e, t = 0; t < e.length; t++) Or.add(e[t]);
  }
  var $0 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Dr = {},
    Br = {};
  function Y0(t) {
    return zs.call(Br, t)
      ? !0
      : zs.call(Dr, t)
        ? !1
        : $0.test(t)
          ? (Br[t] = !0)
          : ((Dr[t] = !0), !1);
  }
  function Ji(t, e, a) {
    if (Y0(e))
      if (a === null) t.removeAttribute(e);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
            t.removeAttribute(e);
            return;
          case 'boolean':
            var l = e.toLowerCase().slice(0, 5);
            if (l !== 'data-' && l !== 'aria-') {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, '' + a);
      }
  }
  function Wi(t, e, a) {
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
  function ca(t, e, a, l) {
    if (l === null) t.removeAttribute(a);
    else {
      switch (typeof l) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(e, a, '' + l);
    }
  }
  function Oe(t) {
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
  function Lr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function Z0(t, e, a) {
    var l = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof l < 'u' &&
      typeof l.get == 'function' &&
      typeof l.set == 'function'
    ) {
      var n = l.get,
        i = l.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (f) {
            ((a = '' + f), i.call(this, f));
          },
        }),
        Object.defineProperty(t, e, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (f) {
            a = '' + f;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function Ls(t) {
    if (!t._valueTracker) {
      var e = Lr(t) ? 'checked' : 'value';
      t._valueTracker = Z0(t, e, '' + t[e]);
    }
  }
  function Hr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(),
      l = '';
    return (
      t && (l = Lr(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = l),
      t !== a ? (e.setValue(t), !0) : !1
    );
  }
  function Fi(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var X0 = /[\n"\\]/g;
  function Re(t) {
    return t.replace(X0, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Hs(t, e, a, l, n, i, f, v) {
    ((t.name = ''),
      f != null && typeof f != 'function' && typeof f != 'symbol' && typeof f != 'boolean'
        ? (t.type = f)
        : t.removeAttribute('type'),
      e != null
        ? f === 'number'
          ? ((e === 0 && t.value === '') || t.value != e) && (t.value = '' + Oe(e))
          : t.value !== '' + Oe(e) && (t.value = '' + Oe(e))
        : (f !== 'submit' && f !== 'reset') || t.removeAttribute('value'),
      e != null
        ? qs(t, f, Oe(e))
        : a != null
          ? qs(t, f, Oe(a))
          : l != null && t.removeAttribute('value'),
      n == null && i != null && (t.defaultChecked = !!i),
      n != null && (t.checked = n && typeof n != 'function' && typeof n != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (t.name = '' + Oe(v))
        : t.removeAttribute('name'));
  }
  function qr(t, e, a, l, n, i, f, v) {
    if (
      (i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (t.type = i),
      e != null || a != null)
    ) {
      if (!((i !== 'submit' && i !== 'reset') || e != null)) {
        Ls(t);
        return;
      }
      ((a = a != null ? '' + Oe(a) : ''),
        (e = e != null ? '' + Oe(e) : a),
        v || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((l = l ?? n),
      (l = typeof l != 'function' && typeof l != 'symbol' && !!l),
      (t.checked = v ? t.checked : !!l),
      (t.defaultChecked = !!l),
      f != null &&
        typeof f != 'function' &&
        typeof f != 'symbol' &&
        typeof f != 'boolean' &&
        (t.name = f),
      Ls(t));
  }
  function qs(t, e, a) {
    (e === 'number' && Fi(t.ownerDocument) === t) ||
      t.defaultValue === '' + a ||
      (t.defaultValue = '' + a);
  }
  function Yl(t, e, a, l) {
    if (((t = t.options), e)) {
      e = {};
      for (var n = 0; n < a.length; n++) e['$' + a[n]] = !0;
      for (a = 0; a < t.length; a++)
        ((n = e.hasOwnProperty('$' + t[a].value)),
          t[a].selected !== n && (t[a].selected = n),
          n && l && (t[a].defaultSelected = !0));
    } else {
      for (a = '' + Oe(a), e = null, n = 0; n < t.length; n++) {
        if (t[n].value === a) {
          ((t[n].selected = !0), l && (t[n].defaultSelected = !0));
          return;
        }
        e !== null || t[n].disabled || (e = t[n]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Ur(t, e, a) {
    if (e != null && ((e = '' + Oe(e)), e !== t.value && (t.value = e), a == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? '' + Oe(a) : '';
  }
  function Gr(t, e, a, l) {
    if (e == null) {
      if (l != null) {
        if (a != null) throw Error(o(92));
        if (le(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        a = l;
      }
      (a == null && (a = ''), (e = a));
    }
    ((a = Oe(e)),
      (t.defaultValue = a),
      (l = t.textContent),
      l === a && l !== '' && l !== null && (t.value = l),
      Ls(t));
  }
  function Zl(t, e) {
    if (e) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var k0 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Vr(t, e, a) {
    var l = e.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? l
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : l
        ? t.setProperty(e, a)
        : typeof a != 'number' || a === 0 || k0.has(e)
          ? e === 'float'
            ? (t.cssFloat = a)
            : (t[e] = ('' + a).trim())
          : (t[e] = a + 'px');
  }
  function $r(t, e, a) {
    if (e != null && typeof e != 'object') throw Error(o(62));
    if (((t = t.style), a != null)) {
      for (var l in a)
        !a.hasOwnProperty(l) ||
          (e != null && e.hasOwnProperty(l)) ||
          (l.indexOf('--') === 0
            ? t.setProperty(l, '')
            : l === 'float'
              ? (t.cssFloat = '')
              : (t[l] = ''));
      for (var n in e) ((l = e[n]), e.hasOwnProperty(n) && a[n] !== l && Vr(t, n, l));
    } else for (var i in e) e.hasOwnProperty(i) && Vr(t, i, e[i]);
  }
  function Us(t) {
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
  var Q0 = new Map([
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
    K0 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ii(t) {
    return K0.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function sa() {}
  var Gs = null;
  function Vs(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Xl = null,
    kl = null;
  function Yr(t) {
    var e = Gl(t);
    if (e && (t = e.stateNode)) {
      var a = t[fe] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (Hs(
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
              a = a.querySelectorAll('input[name="' + Re('' + e) + '"][type="radio"]'), e = 0;
              e < a.length;
              e++
            ) {
              var l = a[e];
              if (l !== t && l.form === t.form) {
                var n = l[fe] || null;
                if (!n) throw Error(o(90));
                Hs(
                  l,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (e = 0; e < a.length; e++) ((l = a[e]), l.form === t.form && Hr(l));
          }
          break t;
        case 'textarea':
          Ur(t, a.value, a.defaultValue);
          break t;
        case 'select':
          ((e = a.value), e != null && Yl(t, !!a.multiple, e, !1));
      }
    }
  }
  var $s = !1;
  function Zr(t, e, a) {
    if ($s) return t(e, a);
    $s = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (
        (($s = !1),
        (Xl !== null || kl !== null) &&
          (Uc(), Xl && ((e = Xl), (t = kl), (kl = Xl = null), Yr(e), t)))
      )
        for (e = 0; e < t.length; e++) Yr(t[e]);
    }
  }
  function Hn(t, e) {
    var a = t.stateNode;
    if (a === null) return null;
    var l = a[fe] || null;
    if (l === null) return null;
    a = l[e];
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
        ((l = !l.disabled) ||
          ((t = t.type),
          (l = !(t === 'button' || t === 'input' || t === 'select' || t === 'textarea'))),
          (t = !l));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != 'function') throw Error(o(231, e, typeof a));
    return a;
  }
  var ua = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Ys = !1;
  if (ua)
    try {
      var qn = {};
      (Object.defineProperty(qn, 'passive', {
        get: function () {
          Ys = !0;
        },
      }),
        window.addEventListener('test', qn, qn),
        window.removeEventListener('test', qn, qn));
    } catch {
      Ys = !1;
    }
  var Ra = null,
    Zs = null,
    Pi = null;
  function Xr() {
    if (Pi) return Pi;
    var t,
      e = Zs,
      a = e.length,
      l,
      n = 'value' in Ra ? Ra.value : Ra.textContent,
      i = n.length;
    for (t = 0; t < a && e[t] === n[t]; t++);
    var f = a - t;
    for (l = 1; l <= f && e[a - l] === n[i - l]; l++);
    return (Pi = n.slice(t, 1 < l ? 1 - l : void 0));
  }
  function tc(t) {
    var e = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function ec() {
    return !0;
  }
  function kr() {
    return !1;
  }
  function de(t) {
    function e(a, l, n, i, f) {
      ((this._reactName = a),
        (this._targetInst = n),
        (this.type = l),
        (this.nativeEvent = i),
        (this.target = f),
        (this.currentTarget = null));
      for (var v in t) t.hasOwnProperty(v) && ((a = t[v]), (this[v] = a ? a(i) : i[v]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? ec
          : kr),
        (this.isPropagationStopped = kr),
        this
      );
    }
    return (
      E(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = ec));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = ec));
        },
        persist: function () {},
        isPersistent: ec,
      }),
      e
    );
  }
  var fl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ac = de(fl),
    Un = E({}, fl, { view: 0, detail: 0 }),
    J0 = de(Un),
    Xs,
    ks,
    Gn,
    lc = E({}, Un, {
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
      getModifierState: Ks,
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
          : (t !== Gn &&
              (Gn && t.type === 'mousemove'
                ? ((Xs = t.screenX - Gn.screenX), (ks = t.screenY - Gn.screenY))
                : (ks = Xs = 0),
              (Gn = t)),
            Xs);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : ks;
      },
    }),
    Qr = de(lc),
    W0 = E({}, lc, { dataTransfer: 0 }),
    F0 = de(W0),
    I0 = E({}, Un, { relatedTarget: 0 }),
    Qs = de(I0),
    P0 = E({}, fl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    t1 = de(P0),
    e1 = E({}, fl, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    a1 = de(e1),
    l1 = E({}, fl, { data: 0 }),
    Kr = de(l1),
    n1 = {
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
    i1 = {
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
    c1 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function s1(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = c1[t]) ? !!e[t] : !1;
  }
  function Ks() {
    return s1;
  }
  var u1 = E({}, Un, {
      key: function (t) {
        if (t.key) {
          var e = n1[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = tc(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? i1[t.keyCode] || 'Unidentified'
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
      getModifierState: Ks,
      charCode: function (t) {
        return t.type === 'keypress' ? tc(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? tc(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    o1 = de(u1),
    r1 = E({}, lc, {
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
    Jr = de(r1),
    f1 = E({}, Un, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ks,
    }),
    d1 = de(f1),
    m1 = E({}, fl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    h1 = de(m1),
    v1 = E({}, lc, {
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
    g1 = de(v1),
    _1 = E({}, fl, { newState: 0, oldState: 0 }),
    p1 = de(_1),
    y1 = [9, 13, 27, 32],
    Js = ua && 'CompositionEvent' in window,
    Vn = null;
  ua && 'documentMode' in document && (Vn = document.documentMode);
  var b1 = ua && 'TextEvent' in window && !Vn,
    Wr = ua && (!Js || (Vn && 8 < Vn && 11 >= Vn)),
    Fr = ' ',
    Ir = !1;
  function Pr(t, e) {
    switch (t) {
      case 'keyup':
        return y1.indexOf(e.keyCode) !== -1;
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
  function tf(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var Ql = !1;
  function S1(t, e) {
    switch (t) {
      case 'compositionend':
        return tf(e);
      case 'keypress':
        return e.which !== 32 ? null : ((Ir = !0), Fr);
      case 'textInput':
        return ((t = e.data), t === Fr && Ir ? null : t);
      default:
        return null;
    }
  }
  function x1(t, e) {
    if (Ql)
      return t === 'compositionend' || (!Js && Pr(t, e))
        ? ((t = Xr()), (Pi = Zs = Ra = null), (Ql = !1), t)
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
        return Wr && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var j1 = {
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
  function ef(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === 'input' ? !!j1[t.type] : e === 'textarea';
  }
  function af(t, e, a, l) {
    (Xl ? (kl ? kl.push(l) : (kl = [l])) : (Xl = l),
      (e = kc(e, 'onChange')),
      0 < e.length &&
        ((a = new ac('onChange', 'change', null, a, l)), t.push({ event: a, listeners: e })));
  }
  var $n = null,
    Yn = null;
  function T1(t) {
    Um(t, 0);
  }
  function nc(t) {
    var e = Ln(t);
    if (Hr(e)) return t;
  }
  function lf(t, e) {
    if (t === 'change') return e;
  }
  var nf = !1;
  if (ua) {
    var Ws;
    if (ua) {
      var Fs = 'oninput' in document;
      if (!Fs) {
        var cf = document.createElement('div');
        (cf.setAttribute('oninput', 'return;'), (Fs = typeof cf.oninput == 'function'));
      }
      Ws = Fs;
    } else Ws = !1;
    nf = Ws && (!document.documentMode || 9 < document.documentMode);
  }
  function sf() {
    $n && ($n.detachEvent('onpropertychange', uf), (Yn = $n = null));
  }
  function uf(t) {
    if (t.propertyName === 'value' && nc(Yn)) {
      var e = [];
      (af(e, Yn, t, Vs(t)), Zr(T1, e));
    }
  }
  function A1(t, e, a) {
    t === 'focusin'
      ? (sf(), ($n = e), (Yn = a), $n.attachEvent('onpropertychange', uf))
      : t === 'focusout' && sf();
  }
  function N1(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return nc(Yn);
  }
  function E1(t, e) {
    if (t === 'click') return nc(e);
  }
  function z1(t, e) {
    if (t === 'input' || t === 'change') return nc(e);
  }
  function M1(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var je = typeof Object.is == 'function' ? Object.is : M1;
  function Zn(t, e) {
    if (je(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var a = Object.keys(t),
      l = Object.keys(e);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!zs.call(e, n) || !je(t[n], e[n])) return !1;
    }
    return !0;
  }
  function of(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function rf(t, e) {
    var a = of(t);
    t = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (((l = t + a.textContent.length), t <= e && l >= e)) return { node: a, offset: e - t };
        t = l;
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
      a = of(a);
    }
  }
  function ff(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? ff(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function df(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Fi(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow;
      else break;
      e = Fi(t.document);
    }
    return e;
  }
  function Is(t) {
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
  var C1 = ua && 'documentMode' in document && 11 >= document.documentMode,
    Kl = null,
    Ps = null,
    Xn = null,
    tu = !1;
  function mf(t, e, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    tu ||
      Kl == null ||
      Kl !== Fi(l) ||
      ((l = Kl),
      'selectionStart' in l && Is(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (Xn && Zn(Xn, l)) ||
        ((Xn = l),
        (l = kc(Ps, 'onSelect')),
        0 < l.length &&
          ((e = new ac('onSelect', 'select', null, e, a)),
          t.push({ event: e, listeners: l }),
          (e.target = Kl))));
  }
  function dl(t, e) {
    var a = {};
    return (
      (a[t.toLowerCase()] = e.toLowerCase()),
      (a['Webkit' + t] = 'webkit' + e),
      (a['Moz' + t] = 'moz' + e),
      a
    );
  }
  var Jl = {
      animationend: dl('Animation', 'AnimationEnd'),
      animationiteration: dl('Animation', 'AnimationIteration'),
      animationstart: dl('Animation', 'AnimationStart'),
      transitionrun: dl('Transition', 'TransitionRun'),
      transitionstart: dl('Transition', 'TransitionStart'),
      transitioncancel: dl('Transition', 'TransitionCancel'),
      transitionend: dl('Transition', 'TransitionEnd'),
    },
    eu = {},
    hf = {};
  ua &&
    ((hf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Jl.animationend.animation,
      delete Jl.animationiteration.animation,
      delete Jl.animationstart.animation),
    'TransitionEvent' in window || delete Jl.transitionend.transition);
  function ml(t) {
    if (eu[t]) return eu[t];
    if (!Jl[t]) return t;
    var e = Jl[t],
      a;
    for (a in e) if (e.hasOwnProperty(a) && a in hf) return (eu[t] = e[a]);
    return t;
  }
  var vf = ml('animationend'),
    gf = ml('animationiteration'),
    _f = ml('animationstart'),
    w1 = ml('transitionrun'),
    O1 = ml('transitionstart'),
    R1 = ml('transitioncancel'),
    pf = ml('transitionend'),
    yf = new Map(),
    au =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  au.push('scrollEnd');
  function Xe(t, e) {
    (yf.set(t, e), rl(e, [t]));
  }
  var ic =
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
    De = [],
    Wl = 0,
    lu = 0;
  function cc() {
    for (var t = Wl, e = (lu = Wl = 0); e < t; ) {
      var a = De[e];
      De[e++] = null;
      var l = De[e];
      De[e++] = null;
      var n = De[e];
      De[e++] = null;
      var i = De[e];
      if (((De[e++] = null), l !== null && n !== null)) {
        var f = l.pending;
        (f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)), (l.pending = n));
      }
      i !== 0 && bf(a, n, i);
    }
  }
  function sc(t, e, a, l) {
    ((De[Wl++] = t),
      (De[Wl++] = e),
      (De[Wl++] = a),
      (De[Wl++] = l),
      (lu |= l),
      (t.lanes |= l),
      (t = t.alternate),
      t !== null && (t.lanes |= l));
  }
  function nu(t, e, a, l) {
    return (sc(t, e, a, l), uc(t));
  }
  function hl(t, e) {
    return (sc(t, null, null, e), uc(t));
  }
  function bf(t, e, a) {
    t.lanes |= a;
    var l = t.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, i = t.return; i !== null; )
      ((i.childLanes |= a),
        (l = i.alternate),
        l !== null && (l.childLanes |= a),
        i.tag === 22 && ((t = i.stateNode), t === null || t._visibility & 1 || (n = !0)),
        (t = i),
        (i = i.return));
    return t.tag === 3
      ? ((i = t.stateNode),
        n &&
          e !== null &&
          ((n = 31 - xe(a)),
          (t = i.hiddenUpdates),
          (l = t[n]),
          l === null ? (t[n] = [e]) : l.push(e),
          (e.lane = a | 536870912)),
        i)
      : null;
  }
  function uc(t) {
    if (50 < mi) throw ((mi = 0), (ho = null), Error(o(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var Fl = {};
  function D1(t, e, a, l) {
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
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Te(t, e, a, l) {
    return new D1(t, e, a, l);
  }
  function iu(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function oa(t, e) {
    var a = t.alternate;
    return (
      a === null
        ? ((a = Te(t.tag, e, t.key, t.mode)),
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
  function Sf(t, e) {
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
  function oc(t, e, a, l, n, i) {
    var f = 0;
    if (((l = t), typeof t == 'function')) iu(t) && (f = 1);
    else if (typeof t == 'string')
      f = Uv(t, a, Z.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case re:
          return ((t = Te(31, a, e, n)), (t.elementType = re), (t.lanes = i), t);
        case $:
          return vl(a.children, n, i, e);
        case U:
          ((f = 8), (n |= 24));
          break;
        case vt:
          return ((t = Te(12, a, e, n | 2)), (t.elementType = vt), (t.lanes = i), t);
        case ae:
          return ((t = Te(13, a, e, n)), (t.elementType = ae), (t.lanes = i), t);
        case Dt:
          return ((t = Te(19, a, e, n)), (t.elementType = Dt), (t.lanes = i), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case _t:
                f = 10;
                break t;
              case F:
                f = 9;
                break t;
              case Yt:
                f = 11;
                break t;
              case lt:
                f = 14;
                break t;
              case Xt:
                ((f = 16), (l = null));
                break t;
            }
          ((f = 29), (a = Error(o(130, t === null ? 'null' : typeof t, ''))), (l = null));
      }
    return ((e = Te(f, a, e, n)), (e.elementType = t), (e.type = l), (e.lanes = i), e);
  }
  function vl(t, e, a, l) {
    return ((t = Te(7, t, l, e)), (t.lanes = a), t);
  }
  function cu(t, e, a) {
    return ((t = Te(6, t, null, e)), (t.lanes = a), t);
  }
  function xf(t) {
    var e = Te(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function su(t, e, a) {
    return (
      (e = Te(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = a),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var jf = new WeakMap();
  function Be(t, e) {
    if (typeof t == 'object' && t !== null) {
      var a = jf.get(t);
      return a !== void 0 ? a : ((e = { value: t, source: e, stack: Sr(e) }), jf.set(t, e), e);
    }
    return { value: t, source: e, stack: Sr(e) };
  }
  var Il = [],
    Pl = 0,
    rc = null,
    kn = 0,
    Le = [],
    He = 0,
    Da = null,
    ta = 1,
    ea = '';
  function ra(t, e) {
    ((Il[Pl++] = kn), (Il[Pl++] = rc), (rc = t), (kn = e));
  }
  function Tf(t, e, a) {
    ((Le[He++] = ta), (Le[He++] = ea), (Le[He++] = Da), (Da = t));
    var l = ta;
    t = ea;
    var n = 32 - xe(l) - 1;
    ((l &= ~(1 << n)), (a += 1));
    var i = 32 - xe(e) + n;
    if (30 < i) {
      var f = n - (n % 5);
      ((i = (l & ((1 << f) - 1)).toString(32)),
        (l >>= f),
        (n -= f),
        (ta = (1 << (32 - xe(e) + n)) | (a << n) | l),
        (ea = i + t));
    } else ((ta = (1 << i) | (a << n) | l), (ea = t));
  }
  function uu(t) {
    t.return !== null && (ra(t, 1), Tf(t, 1, 0));
  }
  function ou(t) {
    for (; t === rc; ) ((rc = Il[--Pl]), (Il[Pl] = null), (kn = Il[--Pl]), (Il[Pl] = null));
    for (; t === Da; )
      ((Da = Le[--He]),
        (Le[He] = null),
        (ea = Le[--He]),
        (Le[He] = null),
        (ta = Le[--He]),
        (Le[He] = null));
  }
  function Af(t, e) {
    ((Le[He++] = ta), (Le[He++] = ea), (Le[He++] = Da), (ta = e.id), (ea = e.overflow), (Da = t));
  }
  var It = null,
    Et = null,
    rt = !1,
    Ba = null,
    qe = !1,
    ru = Error(o(519));
  function La(t) {
    var e = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Qn(Be(e, t)), ru);
  }
  function Nf(t) {
    var e = t.stateNode,
      a = t.type,
      l = t.memoizedProps;
    switch (((e[Ft] = t), (e[fe] = l), a)) {
      case 'dialog':
        (ct('cancel', e), ct('close', e));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ct('load', e);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < vi.length; a++) ct(vi[a], e);
        break;
      case 'source':
        ct('error', e);
        break;
      case 'img':
      case 'image':
      case 'link':
        (ct('error', e), ct('load', e));
        break;
      case 'details':
        ct('toggle', e);
        break;
      case 'input':
        (ct('invalid', e),
          qr(e, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
        break;
      case 'select':
        ct('invalid', e);
        break;
      case 'textarea':
        (ct('invalid', e), Gr(e, l.value, l.defaultValue, l.children));
    }
    ((a = l.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      e.textContent === '' + a ||
      l.suppressHydrationWarning === !0 ||
      Ym(e.textContent, a)
        ? (l.popover != null && (ct('beforetoggle', e), ct('toggle', e)),
          l.onScroll != null && ct('scroll', e),
          l.onScrollEnd != null && ct('scrollend', e),
          l.onClick != null && (e.onclick = sa),
          (e = !0))
        : (e = !1),
      e || La(t, !0));
  }
  function Ef(t) {
    for (It = t.return; It; )
      switch (It.tag) {
        case 5:
        case 31:
        case 13:
          qe = !1;
          return;
        case 27:
        case 3:
          qe = !0;
          return;
        default:
          It = It.return;
      }
  }
  function tn(t) {
    if (t !== It) return !1;
    if (!rt) return (Ef(t), (rt = !0), !1);
    var e = t.tag,
      a;
    if (
      ((a = e !== 3 && e !== 27) &&
        ((a = e === 5) &&
          ((a = t.type), (a = !(a !== 'form' && a !== 'button') || Mo(t.type, t.memoizedProps))),
        (a = !a)),
      a && Et && La(t),
      Ef(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(o(317));
      Et = Im(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(o(317));
      Et = Im(t);
    } else
      e === 27
        ? ((e = Et), Wa(t.type) ? ((t = Do), (Do = null), (Et = t)) : (Et = e))
        : (Et = It ? Ge(t.stateNode.nextSibling) : null);
    return !0;
  }
  function gl() {
    ((Et = It = null), (rt = !1));
  }
  function fu() {
    var t = Ba;
    return (t !== null && (ge === null ? (ge = t) : ge.push.apply(ge, t), (Ba = null)), t);
  }
  function Qn(t) {
    Ba === null ? (Ba = [t]) : Ba.push(t);
  }
  var du = x(null),
    _l = null,
    fa = null;
  function Ha(t, e, a) {
    (V(du, e._currentValue), (e._currentValue = a));
  }
  function da(t) {
    ((t._currentValue = du.current), B(du));
  }
  function mu(t, e, a) {
    for (; t !== null; ) {
      var l = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), l !== null && (l.childLanes |= e))
          : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e),
        t === a)
      )
        break;
      t = t.return;
    }
  }
  function hu(t, e, a, l) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var i = n.dependencies;
      if (i !== null) {
        var f = n.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var v = i;
          i = n;
          for (var y = 0; y < e.length; y++)
            if (v.context === e[y]) {
              ((i.lanes |= a),
                (v = i.alternate),
                v !== null && (v.lanes |= a),
                mu(i.return, a, t),
                l || (f = null));
              break t;
            }
          i = v.next;
        }
      } else if (n.tag === 18) {
        if (((f = n.return), f === null)) throw Error(o(341));
        ((f.lanes |= a), (i = f.alternate), i !== null && (i.lanes |= a), mu(f, a, t), (f = null));
      } else f = n.child;
      if (f !== null) f.return = n;
      else
        for (f = n; f !== null; ) {
          if (f === t) {
            f = null;
            break;
          }
          if (((n = f.sibling), n !== null)) {
            ((n.return = f.return), (f = n));
            break;
          }
          f = f.return;
        }
      n = f;
    }
  }
  function en(t, e, a, l) {
    t = null;
    for (var n = e, i = !1; n !== null; ) {
      if (!i) {
        if ((n.flags & 524288) !== 0) i = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var f = n.alternate;
        if (f === null) throw Error(o(387));
        if (((f = f.memoizedProps), f !== null)) {
          var v = n.type;
          je(n.pendingProps.value, f.value) || (t !== null ? t.push(v) : (t = [v]));
        }
      } else if (n === dt.current) {
        if (((f = n.alternate), f === null)) throw Error(o(387));
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (t !== null ? t.push(bi) : (t = [bi]));
      }
      n = n.return;
    }
    (t !== null && hu(e, t, a, l), (e.flags |= 262144));
  }
  function fc(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!je(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function pl(t) {
    ((_l = t), (fa = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function Pt(t) {
    return zf(_l, t);
  }
  function dc(t, e) {
    return (_l === null && pl(t), zf(t, e));
  }
  function zf(t, e) {
    var a = e._currentValue;
    if (((e = { context: e, memoizedValue: a, next: null }), fa === null)) {
      if (t === null) throw Error(o(308));
      ((fa = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else fa = fa.next = e;
    return a;
  }
  var B1 =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (a, l) {
                  t.push(l);
                },
              });
            this.abort = function () {
              ((e.aborted = !0),
                t.forEach(function (a) {
                  return a();
                }));
            };
          },
    L1 = c.unstable_scheduleCallback,
    H1 = c.unstable_NormalPriority,
    qt = {
      $$typeof: _t,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function vu() {
    return { controller: new B1(), data: new Map(), refCount: 0 };
  }
  function Kn(t) {
    (t.refCount--,
      t.refCount === 0 &&
        L1(H1, function () {
          t.controller.abort();
        }));
  }
  var Jn = null,
    gu = 0,
    an = 0,
    ln = null;
  function q1(t, e) {
    if (Jn === null) {
      var a = (Jn = []);
      ((gu = 0),
        (an = bo()),
        (ln = {
          status: 'pending',
          value: void 0,
          then: function (l) {
            a.push(l);
          },
        }));
    }
    return (gu++, e.then(Mf, Mf), e);
  }
  function Mf() {
    if (--gu === 0 && Jn !== null) {
      ln !== null && (ln.status = 'fulfilled');
      var t = Jn;
      ((Jn = null), (an = 0), (ln = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function U1(t, e) {
    var a = [],
      l = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (n) {
          a.push(n);
        },
      };
    return (
      t.then(
        function () {
          ((l.status = 'fulfilled'), (l.value = e));
          for (var n = 0; n < a.length; n++) (0, a[n])(e);
        },
        function (n) {
          for (l.status = 'rejected', l.reason = n, n = 0; n < a.length; n++) (0, a[n])(void 0);
        }
      ),
      l
    );
  }
  var Cf = w.S;
  w.S = function (t, e) {
    ((mm = be()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && q1(t, e),
      Cf !== null && Cf(t, e));
  };
  var yl = x(null);
  function _u() {
    var t = yl.current;
    return t !== null ? t : Nt.pooledCache;
  }
  function mc(t, e) {
    e === null ? V(yl, yl.current) : V(yl, e.pool);
  }
  function wf() {
    var t = _u();
    return t === null ? null : { parent: qt._currentValue, pool: t };
  }
  var nn = Error(o(460)),
    pu = Error(o(474)),
    hc = Error(o(542)),
    vc = { then: function () {} };
  function Of(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function Rf(t, e, a) {
    switch (
      ((a = t[a]), a === void 0 ? t.push(e) : a !== e && (e.then(sa, sa), (e = a)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), Bf(t), t);
      default:
        if (typeof e.status == 'string') e.then(sa, sa);
        else {
          if (((t = Nt), t !== null && 100 < t.shellSuspendCounter)) throw Error(o(482));
          ((t = e),
            (t.status = 'pending'),
            t.then(
              function (l) {
                if (e.status === 'pending') {
                  var n = e;
                  ((n.status = 'fulfilled'), (n.value = l));
                }
              },
              function (l) {
                if (e.status === 'pending') {
                  var n = e;
                  ((n.status = 'rejected'), (n.reason = l));
                }
              }
            ));
        }
        switch (e.status) {
          case 'fulfilled':
            return e.value;
          case 'rejected':
            throw ((t = e.reason), Bf(t), t);
        }
        throw ((Sl = e), nn);
    }
  }
  function bl(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((Sl = a), nn) : a;
    }
  }
  var Sl = null;
  function Df() {
    if (Sl === null) throw Error(o(459));
    var t = Sl;
    return ((Sl = null), t);
  }
  function Bf(t) {
    if (t === nn || t === hc) throw Error(o(483));
  }
  var cn = null,
    Wn = 0;
  function gc(t) {
    var e = Wn;
    return ((Wn += 1), cn === null && (cn = []), Rf(cn, t, e));
  }
  function Fn(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function _c(t, e) {
    throw e.$$typeof === j
      ? Error(o(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          o(
            31,
            t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t
          )
        ));
  }
  function Lf(t) {
    function e(T, S) {
      if (t) {
        var A = T.deletions;
        A === null ? ((T.deletions = [S]), (T.flags |= 16)) : A.push(S);
      }
    }
    function a(T, S) {
      if (!t) return null;
      for (; S !== null; ) (e(T, S), (S = S.sibling));
      return null;
    }
    function l(T) {
      for (var S = new Map(); T !== null; )
        (T.key !== null ? S.set(T.key, T) : S.set(T.index, T), (T = T.sibling));
      return S;
    }
    function n(T, S) {
      return ((T = oa(T, S)), (T.index = 0), (T.sibling = null), T);
    }
    function i(T, S, A) {
      return (
        (T.index = A),
        t
          ? ((A = T.alternate),
            A !== null
              ? ((A = A.index), A < S ? ((T.flags |= 67108866), S) : A)
              : ((T.flags |= 67108866), S))
          : ((T.flags |= 1048576), S)
      );
    }
    function f(T) {
      return (t && T.alternate === null && (T.flags |= 67108866), T);
    }
    function v(T, S, A, R) {
      return S === null || S.tag !== 6
        ? ((S = cu(A, T.mode, R)), (S.return = T), S)
        : ((S = n(S, A)), (S.return = T), S);
    }
    function y(T, S, A, R) {
      var K = A.type;
      return K === $
        ? C(T, S, A.props.children, R, A.key)
        : S !== null &&
            (S.elementType === K ||
              (typeof K == 'object' && K !== null && K.$$typeof === Xt && bl(K) === S.type))
          ? ((S = n(S, A.props)), Fn(S, A), (S.return = T), S)
          : ((S = oc(A.type, A.key, A.props, null, T.mode, R)), Fn(S, A), (S.return = T), S);
    }
    function N(T, S, A, R) {
      return S === null ||
        S.tag !== 4 ||
        S.stateNode.containerInfo !== A.containerInfo ||
        S.stateNode.implementation !== A.implementation
        ? ((S = su(A, T.mode, R)), (S.return = T), S)
        : ((S = n(S, A.children || [])), (S.return = T), S);
    }
    function C(T, S, A, R, K) {
      return S === null || S.tag !== 7
        ? ((S = vl(A, T.mode, R, K)), (S.return = T), S)
        : ((S = n(S, A)), (S.return = T), S);
    }
    function D(T, S, A) {
      if ((typeof S == 'string' && S !== '') || typeof S == 'number' || typeof S == 'bigint')
        return ((S = cu('' + S, T.mode, A)), (S.return = T), S);
      if (typeof S == 'object' && S !== null) {
        switch (S.$$typeof) {
          case H:
            return ((A = oc(S.type, S.key, S.props, null, T.mode, A)), Fn(A, S), (A.return = T), A);
          case L:
            return ((S = su(S, T.mode, A)), (S.return = T), S);
          case Xt:
            return ((S = bl(S)), D(T, S, A));
        }
        if (le(S) || kt(S)) return ((S = vl(S, T.mode, A, null)), (S.return = T), S);
        if (typeof S.then == 'function') return D(T, gc(S), A);
        if (S.$$typeof === _t) return D(T, dc(T, S), A);
        _c(T, S);
      }
      return null;
    }
    function z(T, S, A, R) {
      var K = S !== null ? S.key : null;
      if ((typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint')
        return K !== null ? null : v(T, S, '' + A, R);
      if (typeof A == 'object' && A !== null) {
        switch (A.$$typeof) {
          case H:
            return A.key === K ? y(T, S, A, R) : null;
          case L:
            return A.key === K ? N(T, S, A, R) : null;
          case Xt:
            return ((A = bl(A)), z(T, S, A, R));
        }
        if (le(A) || kt(A)) return K !== null ? null : C(T, S, A, R, null);
        if (typeof A.then == 'function') return z(T, S, gc(A), R);
        if (A.$$typeof === _t) return z(T, S, dc(T, A), R);
        _c(T, A);
      }
      return null;
    }
    function M(T, S, A, R, K) {
      if ((typeof R == 'string' && R !== '') || typeof R == 'number' || typeof R == 'bigint')
        return ((T = T.get(A) || null), v(S, T, '' + R, K));
      if (typeof R == 'object' && R !== null) {
        switch (R.$$typeof) {
          case H:
            return ((T = T.get(R.key === null ? A : R.key) || null), y(S, T, R, K));
          case L:
            return ((T = T.get(R.key === null ? A : R.key) || null), N(S, T, R, K));
          case Xt:
            return ((R = bl(R)), M(T, S, A, R, K));
        }
        if (le(R) || kt(R)) return ((T = T.get(A) || null), C(S, T, R, K, null));
        if (typeof R.then == 'function') return M(T, S, A, gc(R), K);
        if (R.$$typeof === _t) return M(T, S, A, dc(S, R), K);
        _c(S, R);
      }
      return null;
    }
    function Y(T, S, A, R) {
      for (
        var K = null, mt = null, X = S, at = (S = 0), ut = null;
        X !== null && at < A.length;
        at++
      ) {
        X.index > at ? ((ut = X), (X = null)) : (ut = X.sibling);
        var ht = z(T, X, A[at], R);
        if (ht === null) {
          X === null && (X = ut);
          break;
        }
        (t && X && ht.alternate === null && e(T, X),
          (S = i(ht, S, at)),
          mt === null ? (K = ht) : (mt.sibling = ht),
          (mt = ht),
          (X = ut));
      }
      if (at === A.length) return (a(T, X), rt && ra(T, at), K);
      if (X === null) {
        for (; at < A.length; at++)
          ((X = D(T, A[at], R)),
            X !== null && ((S = i(X, S, at)), mt === null ? (K = X) : (mt.sibling = X), (mt = X)));
        return (rt && ra(T, at), K);
      }
      for (X = l(X); at < A.length; at++)
        ((ut = M(X, T, at, A[at], R)),
          ut !== null &&
            (t && ut.alternate !== null && X.delete(ut.key === null ? at : ut.key),
            (S = i(ut, S, at)),
            mt === null ? (K = ut) : (mt.sibling = ut),
            (mt = ut)));
      return (
        t &&
          X.forEach(function (el) {
            return e(T, el);
          }),
        rt && ra(T, at),
        K
      );
    }
    function J(T, S, A, R) {
      if (A == null) throw Error(o(151));
      for (
        var K = null, mt = null, X = S, at = (S = 0), ut = null, ht = A.next();
        X !== null && !ht.done;
        at++, ht = A.next()
      ) {
        X.index > at ? ((ut = X), (X = null)) : (ut = X.sibling);
        var el = z(T, X, ht.value, R);
        if (el === null) {
          X === null && (X = ut);
          break;
        }
        (t && X && el.alternate === null && e(T, X),
          (S = i(el, S, at)),
          mt === null ? (K = el) : (mt.sibling = el),
          (mt = el),
          (X = ut));
      }
      if (ht.done) return (a(T, X), rt && ra(T, at), K);
      if (X === null) {
        for (; !ht.done; at++, ht = A.next())
          ((ht = D(T, ht.value, R)),
            ht !== null &&
              ((S = i(ht, S, at)), mt === null ? (K = ht) : (mt.sibling = ht), (mt = ht)));
        return (rt && ra(T, at), K);
      }
      for (X = l(X); !ht.done; at++, ht = A.next())
        ((ht = M(X, T, at, ht.value, R)),
          ht !== null &&
            (t && ht.alternate !== null && X.delete(ht.key === null ? at : ht.key),
            (S = i(ht, S, at)),
            mt === null ? (K = ht) : (mt.sibling = ht),
            (mt = ht)));
      return (
        t &&
          X.forEach(function (Wv) {
            return e(T, Wv);
          }),
        rt && ra(T, at),
        K
      );
    }
    function Tt(T, S, A, R) {
      if (
        (typeof A == 'object' &&
          A !== null &&
          A.type === $ &&
          A.key === null &&
          (A = A.props.children),
        typeof A == 'object' && A !== null)
      ) {
        switch (A.$$typeof) {
          case H:
            t: {
              for (var K = A.key; S !== null; ) {
                if (S.key === K) {
                  if (((K = A.type), K === $)) {
                    if (S.tag === 7) {
                      (a(T, S.sibling), (R = n(S, A.props.children)), (R.return = T), (T = R));
                      break t;
                    }
                  } else if (
                    S.elementType === K ||
                    (typeof K == 'object' && K !== null && K.$$typeof === Xt && bl(K) === S.type)
                  ) {
                    (a(T, S.sibling), (R = n(S, A.props)), Fn(R, A), (R.return = T), (T = R));
                    break t;
                  }
                  a(T, S);
                  break;
                } else e(T, S);
                S = S.sibling;
              }
              A.type === $
                ? ((R = vl(A.props.children, T.mode, R, A.key)), (R.return = T), (T = R))
                : ((R = oc(A.type, A.key, A.props, null, T.mode, R)),
                  Fn(R, A),
                  (R.return = T),
                  (T = R));
            }
            return f(T);
          case L:
            t: {
              for (K = A.key; S !== null; ) {
                if (S.key === K)
                  if (
                    S.tag === 4 &&
                    S.stateNode.containerInfo === A.containerInfo &&
                    S.stateNode.implementation === A.implementation
                  ) {
                    (a(T, S.sibling), (R = n(S, A.children || [])), (R.return = T), (T = R));
                    break t;
                  } else {
                    a(T, S);
                    break;
                  }
                else e(T, S);
                S = S.sibling;
              }
              ((R = su(A, T.mode, R)), (R.return = T), (T = R));
            }
            return f(T);
          case Xt:
            return ((A = bl(A)), Tt(T, S, A, R));
        }
        if (le(A)) return Y(T, S, A, R);
        if (kt(A)) {
          if (((K = kt(A)), typeof K != 'function')) throw Error(o(150));
          return ((A = K.call(A)), J(T, S, A, R));
        }
        if (typeof A.then == 'function') return Tt(T, S, gc(A), R);
        if (A.$$typeof === _t) return Tt(T, S, dc(T, A), R);
        _c(T, A);
      }
      return (typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint'
        ? ((A = '' + A),
          S !== null && S.tag === 6
            ? (a(T, S.sibling), (R = n(S, A)), (R.return = T), (T = R))
            : (a(T, S), (R = cu(A, T.mode, R)), (R.return = T), (T = R)),
          f(T))
        : a(T, S);
    }
    return function (T, S, A, R) {
      try {
        Wn = 0;
        var K = Tt(T, S, A, R);
        return ((cn = null), K);
      } catch (X) {
        if (X === nn || X === hc) throw X;
        var mt = Te(29, X, null, T.mode);
        return ((mt.lanes = R), (mt.return = T), mt);
      } finally {
      }
    };
  }
  var xl = Lf(!0),
    Hf = Lf(!1),
    qa = !1;
  function yu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function bu(t, e) {
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
  function Ua(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ga(t, e, a) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (gt & 2) !== 0)) {
      var n = l.pending;
      return (
        n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
        (l.pending = e),
        (e = uc(t)),
        bf(t, null, a),
        e
      );
    }
    return (sc(t, l, e, a), uc(t));
  }
  function In(t, e, a) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (a & 4194048) !== 0))) {
      var l = e.lanes;
      ((l &= t.pendingLanes), (a |= l), (e.lanes = a), Er(t, a));
    }
  }
  function Su(t, e) {
    var a = t.updateQueue,
      l = t.alternate;
    if (l !== null && ((l = l.updateQueue), a === l)) {
      var n = null,
        i = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var f = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (i === null ? (n = i = f) : (i = i.next = f), (a = a.next));
        } while (a !== null);
        i === null ? (n = i = e) : (i = i.next = e);
      } else n = i = e;
      ((a = {
        baseState: l.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: i,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (t.updateQueue = a));
      return;
    }
    ((t = a.lastBaseUpdate),
      t === null ? (a.firstBaseUpdate = e) : (t.next = e),
      (a.lastBaseUpdate = e));
  }
  var xu = !1;
  function Pn() {
    if (xu) {
      var t = ln;
      if (t !== null) throw t;
    }
  }
  function ti(t, e, a, l) {
    xu = !1;
    var n = t.updateQueue;
    qa = !1;
    var i = n.firstBaseUpdate,
      f = n.lastBaseUpdate,
      v = n.shared.pending;
    if (v !== null) {
      n.shared.pending = null;
      var y = v,
        N = y.next;
      ((y.next = null), f === null ? (i = N) : (f.next = N), (f = y));
      var C = t.alternate;
      C !== null &&
        ((C = C.updateQueue),
        (v = C.lastBaseUpdate),
        v !== f && (v === null ? (C.firstBaseUpdate = N) : (v.next = N), (C.lastBaseUpdate = y)));
    }
    if (i !== null) {
      var D = n.baseState;
      ((f = 0), (C = N = y = null), (v = i));
      do {
        var z = v.lane & -536870913,
          M = z !== v.lane;
        if (M ? (st & z) === z : (l & z) === z) {
          (z !== 0 && z === an && (xu = !0),
            C !== null &&
              (C = C.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          t: {
            var Y = t,
              J = v;
            z = e;
            var Tt = a;
            switch (J.tag) {
              case 1:
                if (((Y = J.payload), typeof Y == 'function')) {
                  D = Y.call(Tt, D, z);
                  break t;
                }
                D = Y;
                break t;
              case 3:
                Y.flags = (Y.flags & -65537) | 128;
              case 0:
                if (
                  ((Y = J.payload), (z = typeof Y == 'function' ? Y.call(Tt, D, z) : Y), z == null)
                )
                  break t;
                D = E({}, D, z);
                break t;
              case 2:
                qa = !0;
            }
          }
          ((z = v.callback),
            z !== null &&
              ((t.flags |= 64),
              M && (t.flags |= 8192),
              (M = n.callbacks),
              M === null ? (n.callbacks = [z]) : M.push(z)));
        } else
          ((M = { lane: z, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            C === null ? ((N = C = M), (y = D)) : (C = C.next = M),
            (f |= z));
        if (((v = v.next), v === null)) {
          if (((v = n.shared.pending), v === null)) break;
          ((M = v),
            (v = M.next),
            (M.next = null),
            (n.lastBaseUpdate = M),
            (n.shared.pending = null));
        }
      } while (!0);
      (C === null && (y = D),
        (n.baseState = y),
        (n.firstBaseUpdate = N),
        (n.lastBaseUpdate = C),
        i === null && (n.shared.lanes = 0),
        (Xa |= f),
        (t.lanes = f),
        (t.memoizedState = D));
    }
  }
  function qf(t, e) {
    if (typeof t != 'function') throw Error(o(191, t));
    t.call(e);
  }
  function Uf(t, e) {
    var a = t.callbacks;
    if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) qf(a[t], e);
  }
  var sn = x(null),
    pc = x(0);
  function Gf(t, e) {
    ((t = Sa), V(pc, t), V(sn, e), (Sa = t | e.baseLanes));
  }
  function ju() {
    (V(pc, Sa), V(sn, sn.current));
  }
  function Tu() {
    ((Sa = pc.current), B(sn), B(pc));
  }
  var Ae = x(null),
    Ue = null;
  function Va(t) {
    var e = t.alternate;
    (V(Lt, Lt.current & 1),
      V(Ae, t),
      Ue === null && (e === null || sn.current !== null || e.memoizedState !== null) && (Ue = t));
  }
  function Au(t) {
    (V(Lt, Lt.current), V(Ae, t), Ue === null && (Ue = t));
  }
  function Vf(t) {
    t.tag === 22 ? (V(Lt, Lt.current), V(Ae, t), Ue === null && (Ue = t)) : $a();
  }
  function $a() {
    (V(Lt, Lt.current), V(Ae, Ae.current));
  }
  function Ne(t) {
    (B(Ae), Ue === t && (Ue = null), B(Lt));
  }
  var Lt = x(0);
  function yc(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Oo(a) || Ro(a))) return e;
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
  var ma = 0,
    et = null,
    xt = null,
    Ut = null,
    bc = !1,
    un = !1,
    jl = !1,
    Sc = 0,
    ei = 0,
    on = null,
    G1 = 0;
  function Ot() {
    throw Error(o(321));
  }
  function Nu(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++) if (!je(t[a], e[a])) return !1;
    return !0;
  }
  function Eu(t, e, a, l, n, i) {
    return (
      (ma = i),
      (et = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (w.H = t === null || t.memoizedState === null ? Td : $u),
      (jl = !1),
      (i = a(l, n)),
      (jl = !1),
      un && (i = Yf(e, a, l, n)),
      $f(t),
      i
    );
  }
  function $f(t) {
    w.H = ni;
    var e = xt !== null && xt.next !== null;
    if (((ma = 0), (Ut = xt = et = null), (bc = !1), (ei = 0), (on = null), e)) throw Error(o(300));
    t === null || Gt || ((t = t.dependencies), t !== null && fc(t) && (Gt = !0));
  }
  function Yf(t, e, a, l) {
    et = t;
    var n = 0;
    do {
      if ((un && (on = null), (ei = 0), (un = !1), 25 <= n)) throw Error(o(301));
      if (((n += 1), (Ut = xt = null), t.updateQueue != null)) {
        var i = t.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((w.H = Ad), (i = e(a, l)));
    } while (un);
    return i;
  }
  function V1() {
    var t = w.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? ai(e) : e),
      (t = t.useState()[0]),
      (xt !== null ? xt.memoizedState : null) !== t && (et.flags |= 1024),
      e
    );
  }
  function zu() {
    var t = Sc !== 0;
    return ((Sc = 0), t);
  }
  function Mu(t, e, a) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~a));
  }
  function Cu(t) {
    if (bc) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      bc = !1;
    }
    ((ma = 0), (Ut = xt = et = null), (un = !1), (ei = Sc = 0), (on = null));
  }
  function ue() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Ut === null ? (et.memoizedState = Ut = t) : (Ut = Ut.next = t), Ut);
  }
  function Ht() {
    if (xt === null) {
      var t = et.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = xt.next;
    var e = Ut === null ? et.memoizedState : Ut.next;
    if (e !== null) ((Ut = e), (xt = t));
    else {
      if (t === null) throw et.alternate === null ? Error(o(467)) : Error(o(310));
      ((xt = t),
        (t = {
          memoizedState: xt.memoizedState,
          baseState: xt.baseState,
          baseQueue: xt.baseQueue,
          queue: xt.queue,
          next: null,
        }),
        Ut === null ? (et.memoizedState = Ut = t) : (Ut = Ut.next = t));
    }
    return Ut;
  }
  function xc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ai(t) {
    var e = ei;
    return (
      (ei += 1),
      on === null && (on = []),
      (t = Rf(on, t, e)),
      (e = et),
      (Ut === null ? e.memoizedState : Ut.next) === null &&
        ((e = e.alternate), (w.H = e === null || e.memoizedState === null ? Td : $u)),
      t
    );
  }
  function jc(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return ai(t);
      if (t.$$typeof === _t) return Pt(t);
    }
    throw Error(o(438, String(t)));
  }
  function wu(t) {
    var e = null,
      a = et.updateQueue;
    if ((a !== null && (e = a.memoCache), e == null)) {
      var l = et.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (e = {
              data: l.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      a === null && ((a = xc()), (et.updateQueue = a)),
      (a.memoCache = e),
      (a = e.data[e.index]),
      a === void 0)
    )
      for (a = e.data[e.index] = Array(t), l = 0; l < t; l++) a[l] = se;
    return (e.index++, a);
  }
  function ha(t, e) {
    return typeof e == 'function' ? e(t) : e;
  }
  function Tc(t) {
    var e = Ht();
    return Ou(e, xt, t);
  }
  function Ou(t, e, a) {
    var l = t.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = a;
    var n = t.baseQueue,
      i = l.pending;
    if (i !== null) {
      if (n !== null) {
        var f = n.next;
        ((n.next = i.next), (i.next = f));
      }
      ((e.baseQueue = n = i), (l.pending = null));
    }
    if (((i = t.baseState), n === null)) t.memoizedState = i;
    else {
      e = n.next;
      var v = (f = null),
        y = null,
        N = e,
        C = !1;
      do {
        var D = N.lane & -536870913;
        if (D !== N.lane ? (st & D) === D : (ma & D) === D) {
          var z = N.revertLane;
          if (z === 0)
            (y !== null &&
              (y = y.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: N.action,
                  hasEagerState: N.hasEagerState,
                  eagerState: N.eagerState,
                  next: null,
                }),
              D === an && (C = !0));
          else if ((ma & z) === z) {
            ((N = N.next), z === an && (C = !0));
            continue;
          } else
            ((D = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null,
            }),
              y === null ? ((v = y = D), (f = i)) : (y = y.next = D),
              (et.lanes |= z),
              (Xa |= z));
          ((D = N.action), jl && a(i, D), (i = N.hasEagerState ? N.eagerState : a(i, D)));
        } else
          ((z = {
            lane: D,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null,
          }),
            y === null ? ((v = y = z), (f = i)) : (y = y.next = z),
            (et.lanes |= D),
            (Xa |= D));
        N = N.next;
      } while (N !== null && N !== e);
      if (
        (y === null ? (f = i) : (y.next = v),
        !je(i, t.memoizedState) && ((Gt = !0), C && ((a = ln), a !== null)))
      )
        throw a;
      ((t.memoizedState = i), (t.baseState = f), (t.baseQueue = y), (l.lastRenderedState = i));
    }
    return (n === null && (l.lanes = 0), [t.memoizedState, l.dispatch]);
  }
  function Ru(t) {
    var e = Ht(),
      a = e.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = t;
    var l = a.dispatch,
      n = a.pending,
      i = e.memoizedState;
    if (n !== null) {
      a.pending = null;
      var f = (n = n.next);
      do ((i = t(i, f.action)), (f = f.next));
      while (f !== n);
      (je(i, e.memoizedState) || (Gt = !0),
        (e.memoizedState = i),
        e.baseQueue === null && (e.baseState = i),
        (a.lastRenderedState = i));
    }
    return [i, l];
  }
  function Zf(t, e, a) {
    var l = et,
      n = Ht(),
      i = rt;
    if (i) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = e();
    var f = !je((xt || n).memoizedState, a);
    if (
      (f && ((n.memoizedState = a), (Gt = !0)),
      (n = n.queue),
      Lu(Qf.bind(null, l, n, t), [t]),
      n.getSnapshot !== e || f || (Ut !== null && Ut.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        rn(9, { destroy: void 0 }, kf.bind(null, l, n, a, e), null),
        Nt === null)
      )
        throw Error(o(349));
      i || (ma & 127) !== 0 || Xf(l, e, a);
    }
    return a;
  }
  function Xf(t, e, a) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: a }),
      (e = et.updateQueue),
      e === null
        ? ((e = xc()), (et.updateQueue = e), (e.stores = [t]))
        : ((a = e.stores), a === null ? (e.stores = [t]) : a.push(t)));
  }
  function kf(t, e, a, l) {
    ((e.value = a), (e.getSnapshot = l), Kf(e) && Jf(t));
  }
  function Qf(t, e, a) {
    return a(function () {
      Kf(e) && Jf(t);
    });
  }
  function Kf(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !je(t, a);
    } catch {
      return !0;
    }
  }
  function Jf(t) {
    var e = hl(t, 2);
    e !== null && _e(e, t, 2);
  }
  function Du(t) {
    var e = ue();
    if (typeof t == 'function') {
      var a = t;
      if (((t = a()), jl)) {
        wa(!0);
        try {
          a();
        } finally {
          wa(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ha,
        lastRenderedState: t,
      }),
      e
    );
  }
  function Wf(t, e, a, l) {
    return ((t.baseState = a), Ou(t, xt, typeof l == 'function' ? l : ha));
  }
  function $1(t, e, a, l, n) {
    if (Ec(t)) throw Error(o(485));
    if (((t = e.action), t !== null)) {
      var i = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          i.listeners.push(f);
        },
      };
      (w.T !== null ? a(!0) : (i.isTransition = !1),
        l(i),
        (a = e.pending),
        a === null
          ? ((i.next = e.pending = i), Ff(e, i))
          : ((i.next = a.next), (e.pending = a.next = i)));
    }
  }
  function Ff(t, e) {
    var a = e.action,
      l = e.payload,
      n = t.state;
    if (e.isTransition) {
      var i = w.T,
        f = {};
      w.T = f;
      try {
        var v = a(n, l),
          y = w.S;
        (y !== null && y(f, v), If(t, e, v));
      } catch (N) {
        Bu(t, e, N);
      } finally {
        (i !== null && f.types !== null && (i.types = f.types), (w.T = i));
      }
    } else
      try {
        ((i = a(n, l)), If(t, e, i));
      } catch (N) {
        Bu(t, e, N);
      }
  }
  function If(t, e, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (l) {
            Pf(t, e, l);
          },
          function (l) {
            return Bu(t, e, l);
          }
        )
      : Pf(t, e, a);
  }
  function Pf(t, e, a) {
    ((e.status = 'fulfilled'),
      (e.value = a),
      td(e),
      (t.state = a),
      (e = t.pending),
      e !== null &&
        ((a = e.next), a === e ? (t.pending = null) : ((a = a.next), (e.next = a), Ff(t, a))));
  }
  function Bu(t, e, a) {
    var l = t.pending;
    if (((t.pending = null), l !== null)) {
      l = l.next;
      do ((e.status = 'rejected'), (e.reason = a), td(e), (e = e.next));
      while (e !== l);
    }
    t.action = null;
  }
  function td(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function ed(t, e) {
    return e;
  }
  function ad(t, e) {
    if (rt) {
      var a = Nt.formState;
      if (a !== null) {
        t: {
          var l = et;
          if (rt) {
            if (Et) {
              e: {
                for (var n = Et, i = qe; n.nodeType !== 8; ) {
                  if (!i) {
                    n = null;
                    break e;
                  }
                  if (((n = Ge(n.nextSibling)), n === null)) {
                    n = null;
                    break e;
                  }
                }
                ((i = n.data), (n = i === 'F!' || i === 'F' ? n : null));
              }
              if (n) {
                ((Et = Ge(n.nextSibling)), (l = n.data === 'F!'));
                break t;
              }
            }
            La(l);
          }
          l = !1;
        }
        l && (e = a[0]);
      }
    }
    return (
      (a = ue()),
      (a.memoizedState = a.baseState = e),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ed,
        lastRenderedState: e,
      }),
      (a.queue = l),
      (a = Sd.bind(null, et, l)),
      (l.dispatch = a),
      (l = Du(!1)),
      (i = Vu.bind(null, et, !1, l.queue)),
      (l = ue()),
      (n = { state: e, dispatch: null, action: t, pending: null }),
      (l.queue = n),
      (a = $1.bind(null, et, n, i, a)),
      (n.dispatch = a),
      (l.memoizedState = t),
      [e, a, !1]
    );
  }
  function ld(t) {
    var e = Ht();
    return nd(e, xt, t);
  }
  function nd(t, e, a) {
    if (
      ((e = Ou(t, e, ed)[0]),
      (t = Tc(ha)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var l = ai(e);
      } catch (f) {
        throw f === nn ? hc : f;
      }
    else l = e;
    e = Ht();
    var n = e.queue,
      i = n.dispatch;
    return (
      a !== e.memoizedState &&
        ((et.flags |= 2048), rn(9, { destroy: void 0 }, Y1.bind(null, n, a), null)),
      [l, i, t]
    );
  }
  function Y1(t, e) {
    t.action = e;
  }
  function id(t) {
    var e = Ht(),
      a = xt;
    if (a !== null) return nd(e, a, t);
    (Ht(), (e = e.memoizedState), (a = Ht()));
    var l = a.queue.dispatch;
    return ((a.memoizedState = t), [e, l, !1]);
  }
  function rn(t, e, a, l) {
    return (
      (t = { tag: t, create: a, deps: l, inst: e, next: null }),
      (e = et.updateQueue),
      e === null && ((e = xc()), (et.updateQueue = e)),
      (a = e.lastEffect),
      a === null
        ? (e.lastEffect = t.next = t)
        : ((l = a.next), (a.next = t), (t.next = l), (e.lastEffect = t)),
      t
    );
  }
  function cd() {
    return Ht().memoizedState;
  }
  function Ac(t, e, a, l) {
    var n = ue();
    ((et.flags |= t),
      (n.memoizedState = rn(1 | e, { destroy: void 0 }, a, l === void 0 ? null : l)));
  }
  function Nc(t, e, a, l) {
    var n = Ht();
    l = l === void 0 ? null : l;
    var i = n.memoizedState.inst;
    xt !== null && l !== null && Nu(l, xt.memoizedState.deps)
      ? (n.memoizedState = rn(e, i, a, l))
      : ((et.flags |= t), (n.memoizedState = rn(1 | e, i, a, l)));
  }
  function sd(t, e) {
    Ac(8390656, 8, t, e);
  }
  function Lu(t, e) {
    Nc(2048, 8, t, e);
  }
  function Z1(t) {
    et.flags |= 4;
    var e = et.updateQueue;
    if (e === null) ((e = xc()), (et.updateQueue = e), (e.events = [t]));
    else {
      var a = e.events;
      a === null ? (e.events = [t]) : a.push(t);
    }
  }
  function ud(t) {
    var e = Ht().memoizedState;
    return (
      Z1({ ref: e, nextImpl: t }),
      function () {
        if ((gt & 2) !== 0) throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function od(t, e) {
    return Nc(4, 2, t, e);
  }
  function rd(t, e) {
    return Nc(4, 4, t, e);
  }
  function fd(t, e) {
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
  function dd(t, e, a) {
    ((a = a != null ? a.concat([t]) : null), Nc(4, 4, fd.bind(null, e, t), a));
  }
  function Hu() {}
  function md(t, e) {
    var a = Ht();
    e = e === void 0 ? null : e;
    var l = a.memoizedState;
    return e !== null && Nu(e, l[1]) ? l[0] : ((a.memoizedState = [t, e]), t);
  }
  function hd(t, e) {
    var a = Ht();
    e = e === void 0 ? null : e;
    var l = a.memoizedState;
    if (e !== null && Nu(e, l[1])) return l[0];
    if (((l = t()), jl)) {
      wa(!0);
      try {
        t();
      } finally {
        wa(!1);
      }
    }
    return ((a.memoizedState = [l, e]), l);
  }
  function qu(t, e, a) {
    return a === void 0 || ((ma & 1073741824) !== 0 && (st & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = a), (t = vm()), (et.lanes |= t), (Xa |= t), a);
  }
  function vd(t, e, a, l) {
    return je(a, e)
      ? a
      : sn.current !== null
        ? ((t = qu(t, a, l)), je(t, e) || (Gt = !0), t)
        : (ma & 42) === 0 || ((ma & 1073741824) !== 0 && (st & 261930) === 0)
          ? ((Gt = !0), (t.memoizedState = a))
          : ((t = vm()), (et.lanes |= t), (Xa |= t), e);
  }
  function gd(t, e, a, l, n) {
    var i = G.p;
    G.p = i !== 0 && 8 > i ? i : 8;
    var f = w.T,
      v = {};
    ((w.T = v), Vu(t, !1, e, a));
    try {
      var y = n(),
        N = w.S;
      if (
        (N !== null && N(v, y), y !== null && typeof y == 'object' && typeof y.then == 'function')
      ) {
        var C = U1(y, l);
        li(t, e, C, Me(t));
      } else li(t, e, l, Me(t));
    } catch (D) {
      li(t, e, { then: function () {}, status: 'rejected', reason: D }, Me());
    } finally {
      ((G.p = i), f !== null && v.types !== null && (f.types = v.types), (w.T = f));
    }
  }
  function X1() {}
  function Uu(t, e, a, l) {
    if (t.tag !== 5) throw Error(o(476));
    var n = _d(t).queue;
    gd(
      t,
      n,
      e,
      W,
      a === null
        ? X1
        : function () {
            return (pd(t), a(l));
          }
    );
  }
  function _d(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: W,
      baseState: W,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ha,
        lastRenderedState: W,
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
          lastRenderedReducer: ha,
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
  function pd(t) {
    var e = _d(t);
    (e.next === null && (e = t.alternate.memoizedState), li(t, e.next.queue, {}, Me()));
  }
  function Gu() {
    return Pt(bi);
  }
  function yd() {
    return Ht().memoizedState;
  }
  function bd() {
    return Ht().memoizedState;
  }
  function k1(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var a = Me();
          t = Ua(a);
          var l = Ga(e, t, a);
          (l !== null && (_e(l, e, a), In(l, e, a)), (e = { cache: vu() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function Q1(t, e, a) {
    var l = Me();
    ((a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ec(t) ? xd(e, a) : ((a = nu(t, e, a, l)), a !== null && (_e(a, t, l), jd(a, e, l))));
  }
  function Sd(t, e, a) {
    var l = Me();
    li(t, e, a, l);
  }
  function li(t, e, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ec(t)) xd(e, n);
    else {
      var i = t.alternate;
      if (
        t.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = e.lastRenderedReducer), i !== null)
      )
        try {
          var f = e.lastRenderedState,
            v = i(f, a);
          if (((n.hasEagerState = !0), (n.eagerState = v), je(v, f)))
            return (sc(t, e, n, 0), Nt === null && cc(), !1);
        } catch {
        } finally {
        }
      if (((a = nu(t, e, n, l)), a !== null)) return (_e(a, t, l), jd(a, e, l), !0);
    }
    return !1;
  }
  function Vu(t, e, a, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: bo(),
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ec(t))
    ) {
      if (e) throw Error(o(479));
    } else ((e = nu(t, a, l, 2)), e !== null && _e(e, t, 2));
  }
  function Ec(t) {
    var e = t.alternate;
    return t === et || (e !== null && e === et);
  }
  function xd(t, e) {
    un = bc = !0;
    var a = t.pending;
    (a === null ? (e.next = e) : ((e.next = a.next), (a.next = e)), (t.pending = e));
  }
  function jd(t, e, a) {
    if ((a & 4194048) !== 0) {
      var l = e.lanes;
      ((l &= t.pendingLanes), (a |= l), (e.lanes = a), Er(t, a));
    }
  }
  var ni = {
    readContext: Pt,
    use: jc,
    useCallback: Ot,
    useContext: Ot,
    useEffect: Ot,
    useImperativeHandle: Ot,
    useLayoutEffect: Ot,
    useInsertionEffect: Ot,
    useMemo: Ot,
    useReducer: Ot,
    useRef: Ot,
    useState: Ot,
    useDebugValue: Ot,
    useDeferredValue: Ot,
    useTransition: Ot,
    useSyncExternalStore: Ot,
    useId: Ot,
    useHostTransitionStatus: Ot,
    useFormState: Ot,
    useActionState: Ot,
    useOptimistic: Ot,
    useMemoCache: Ot,
    useCacheRefresh: Ot,
  };
  ni.useEffectEvent = Ot;
  var Td = {
      readContext: Pt,
      use: jc,
      useCallback: function (t, e) {
        return ((ue().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: Pt,
      useEffect: sd,
      useImperativeHandle: function (t, e, a) {
        ((a = a != null ? a.concat([t]) : null), Ac(4194308, 4, fd.bind(null, e, t), a));
      },
      useLayoutEffect: function (t, e) {
        return Ac(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        Ac(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var a = ue();
        e = e === void 0 ? null : e;
        var l = t();
        if (jl) {
          wa(!0);
          try {
            t();
          } finally {
            wa(!1);
          }
        }
        return ((a.memoizedState = [l, e]), l);
      },
      useReducer: function (t, e, a) {
        var l = ue();
        if (a !== void 0) {
          var n = a(e);
          if (jl) {
            wa(!0);
            try {
              a(e);
            } finally {
              wa(!1);
            }
          }
        } else n = e;
        return (
          (l.memoizedState = l.baseState = n),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: n,
          }),
          (l.queue = t),
          (t = t.dispatch = Q1.bind(null, et, t)),
          [l.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = ue();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = Du(t);
        var e = t.queue,
          a = Sd.bind(null, et, e);
        return ((e.dispatch = a), [t.memoizedState, a]);
      },
      useDebugValue: Hu,
      useDeferredValue: function (t, e) {
        var a = ue();
        return qu(a, t, e);
      },
      useTransition: function () {
        var t = Du(!1);
        return ((t = gd.bind(null, et, t.queue, !0, !1)), (ue().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, a) {
        var l = et,
          n = ue();
        if (rt) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = e()), Nt === null)) throw Error(o(349));
          (st & 127) !== 0 || Xf(l, e, a);
        }
        n.memoizedState = a;
        var i = { value: a, getSnapshot: e };
        return (
          (n.queue = i),
          sd(Qf.bind(null, l, i, t), [t]),
          (l.flags |= 2048),
          rn(9, { destroy: void 0 }, kf.bind(null, l, i, a, e), null),
          a
        );
      },
      useId: function () {
        var t = ue(),
          e = Nt.identifierPrefix;
        if (rt) {
          var a = ea,
            l = ta;
          ((a = (l & ~(1 << (32 - xe(l) - 1))).toString(32) + a),
            (e = '_' + e + 'R_' + a),
            (a = Sc++),
            0 < a && (e += 'H' + a.toString(32)),
            (e += '_'));
        } else ((a = G1++), (e = '_' + e + 'r_' + a.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: Gu,
      useFormState: ad,
      useActionState: ad,
      useOptimistic: function (t) {
        var e = ue();
        e.memoizedState = e.baseState = t;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = a), (e = Vu.bind(null, et, !0, a)), (a.dispatch = e), [t, e]);
      },
      useMemoCache: wu,
      useCacheRefresh: function () {
        return (ue().memoizedState = k1.bind(null, et));
      },
      useEffectEvent: function (t) {
        var e = ue(),
          a = { impl: t };
        return (
          (e.memoizedState = a),
          function () {
            if ((gt & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    $u = {
      readContext: Pt,
      use: jc,
      useCallback: md,
      useContext: Pt,
      useEffect: Lu,
      useImperativeHandle: dd,
      useInsertionEffect: od,
      useLayoutEffect: rd,
      useMemo: hd,
      useReducer: Tc,
      useRef: cd,
      useState: function () {
        return Tc(ha);
      },
      useDebugValue: Hu,
      useDeferredValue: function (t, e) {
        var a = Ht();
        return vd(a, xt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = Tc(ha)[0],
          e = Ht().memoizedState;
        return [typeof t == 'boolean' ? t : ai(t), e];
      },
      useSyncExternalStore: Zf,
      useId: yd,
      useHostTransitionStatus: Gu,
      useFormState: ld,
      useActionState: ld,
      useOptimistic: function (t, e) {
        var a = Ht();
        return Wf(a, xt, t, e);
      },
      useMemoCache: wu,
      useCacheRefresh: bd,
    };
  $u.useEffectEvent = ud;
  var Ad = {
    readContext: Pt,
    use: jc,
    useCallback: md,
    useContext: Pt,
    useEffect: Lu,
    useImperativeHandle: dd,
    useInsertionEffect: od,
    useLayoutEffect: rd,
    useMemo: hd,
    useReducer: Ru,
    useRef: cd,
    useState: function () {
      return Ru(ha);
    },
    useDebugValue: Hu,
    useDeferredValue: function (t, e) {
      var a = Ht();
      return xt === null ? qu(a, t, e) : vd(a, xt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = Ru(ha)[0],
        e = Ht().memoizedState;
      return [typeof t == 'boolean' ? t : ai(t), e];
    },
    useSyncExternalStore: Zf,
    useId: yd,
    useHostTransitionStatus: Gu,
    useFormState: id,
    useActionState: id,
    useOptimistic: function (t, e) {
      var a = Ht();
      return xt !== null ? Wf(a, xt, t, e) : ((a.baseState = t), [t, a.queue.dispatch]);
    },
    useMemoCache: wu,
    useCacheRefresh: bd,
  };
  Ad.useEffectEvent = ud;
  function Yu(t, e, a, l) {
    ((e = t.memoizedState),
      (a = a(l, e)),
      (a = a == null ? e : E({}, e, a)),
      (t.memoizedState = a),
      t.lanes === 0 && (t.updateQueue.baseState = a));
  }
  var Zu = {
    enqueueSetState: function (t, e, a) {
      t = t._reactInternals;
      var l = Me(),
        n = Ua(l);
      ((n.payload = e),
        a != null && (n.callback = a),
        (e = Ga(t, n, l)),
        e !== null && (_e(e, t, l), In(e, t, l)));
    },
    enqueueReplaceState: function (t, e, a) {
      t = t._reactInternals;
      var l = Me(),
        n = Ua(l);
      ((n.tag = 1),
        (n.payload = e),
        a != null && (n.callback = a),
        (e = Ga(t, n, l)),
        e !== null && (_e(e, t, l), In(e, t, l)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var a = Me(),
        l = Ua(a);
      ((l.tag = 2),
        e != null && (l.callback = e),
        (e = Ga(t, l, a)),
        e !== null && (_e(e, t, a), In(e, t, a)));
    },
  };
  function Nd(t, e, a, l, n, i, f) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(l, i, f)
        : e.prototype && e.prototype.isPureReactComponent
          ? !Zn(a, l) || !Zn(n, i)
          : !0
    );
  }
  function Ed(t, e, a, l) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(a, l),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(a, l),
      e.state !== t && Zu.enqueueReplaceState(e, e.state, null));
  }
  function Tl(t, e) {
    var a = e;
    if ('ref' in e) {
      a = {};
      for (var l in e) l !== 'ref' && (a[l] = e[l]);
    }
    if ((t = t.defaultProps)) {
      a === e && (a = E({}, a));
      for (var n in t) a[n] === void 0 && (a[n] = t[n]);
    }
    return a;
  }
  function zd(t) {
    ic(t);
  }
  function Md(t) {
    console.error(t);
  }
  function Cd(t) {
    ic(t);
  }
  function zc(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function wd(t, e, a) {
    try {
      var l = t.onCaughtError;
      l(a.value, { componentStack: a.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Xu(t, e, a) {
    return (
      (a = Ua(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        zc(t, e);
      }),
      a
    );
  }
  function Od(t) {
    return ((t = Ua(t)), (t.tag = 3), t);
  }
  function Rd(t, e, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == 'function') {
      var i = l.value;
      ((t.payload = function () {
        return n(i);
      }),
        (t.callback = function () {
          wd(e, a, l);
        }));
    }
    var f = a.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (t.callback = function () {
        (wd(e, a, l),
          typeof n != 'function' && (ka === null ? (ka = new Set([this])) : ka.add(this)));
        var v = l.stack;
        this.componentDidCatch(l.value, { componentStack: v !== null ? v : '' });
      });
  }
  function K1(t, e, a, l, n) {
    if (((a.flags |= 32768), l !== null && typeof l == 'object' && typeof l.then == 'function')) {
      if (((e = a.alternate), e !== null && en(e, a, n, !0), (a = Ae.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Ue === null ? Gc() : a.alternate === null && Rt === 0 && (Rt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = n),
              l === vc
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null ? (a.updateQueue = new Set([l])) : e.add(l),
                  _o(t, l, n)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              l === vc
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
                      (a.updateQueue = e))
                    : ((a = e.retryQueue), a === null ? (e.retryQueue = new Set([l])) : a.add(l)),
                  _o(t, l, n)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (_o(t, l, n), Gc(), !1);
    }
    if (rt)
      return (
        (e = Ae.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = n),
            l !== ru && ((t = Error(o(422), { cause: l })), Qn(Be(t, a))))
          : (l !== ru && ((e = Error(o(423), { cause: l })), Qn(Be(e, a))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (n &= -n),
            (t.lanes |= n),
            (l = Be(l, a)),
            (n = Xu(t.stateNode, l, n)),
            Su(t, n),
            Rt !== 4 && (Rt = 2)),
        !1
      );
    var i = Error(o(520), { cause: l });
    if (((i = Be(i, a)), di === null ? (di = [i]) : di.push(i), Rt !== 4 && (Rt = 2), e === null))
      return !0;
    ((l = Be(l, a)), (a = e));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (t = n & -n),
            (a.lanes |= t),
            (t = Xu(a.stateNode, l, t)),
            Su(a, t),
            !1
          );
        case 1:
          if (
            ((e = a.type),
            (i = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == 'function' ||
                (i !== null &&
                  typeof i.componentDidCatch == 'function' &&
                  (ka === null || !ka.has(i)))))
          )
            return (
              (a.flags |= 65536),
              (n &= -n),
              (a.lanes |= n),
              (n = Od(n)),
              Rd(n, t, a, l),
              Su(a, n),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var ku = Error(o(461)),
    Gt = !1;
  function te(t, e, a, l) {
    e.child = t === null ? Hf(e, null, a, l) : xl(e, t.child, a, l);
  }
  function Dd(t, e, a, l, n) {
    a = a.render;
    var i = e.ref;
    if ('ref' in l) {
      var f = {};
      for (var v in l) v !== 'ref' && (f[v] = l[v]);
    } else f = l;
    return (
      pl(e),
      (l = Eu(t, e, a, f, i, n)),
      (v = zu()),
      t !== null && !Gt
        ? (Mu(t, e, n), va(t, e, n))
        : (rt && v && uu(e), (e.flags |= 1), te(t, e, l, n), e.child)
    );
  }
  function Bd(t, e, a, l, n) {
    if (t === null) {
      var i = a.type;
      return typeof i == 'function' && !iu(i) && i.defaultProps === void 0 && a.compare === null
        ? ((e.tag = 15), (e.type = i), Ld(t, e, i, l, n))
        : ((t = oc(a.type, null, l, e, e.mode, n)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((i = t.child), !to(t, n))) {
      var f = i.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Zn), a(f, l) && t.ref === e.ref))
        return va(t, e, n);
    }
    return ((e.flags |= 1), (t = oa(i, l)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function Ld(t, e, a, l, n) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (Zn(i, l) && t.ref === e.ref)
        if (((Gt = !1), (e.pendingProps = l = i), to(t, n))) (t.flags & 131072) !== 0 && (Gt = !0);
        else return ((e.lanes = t.lanes), va(t, e, n));
    }
    return Qu(t, e, a, l, n);
  }
  function Hd(t, e, a, l) {
    var n = l.children,
      i = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      l.mode === 'hidden')
    ) {
      if ((e.flags & 128) !== 0) {
        if (((i = i !== null ? i.baseLanes | a : a), t !== null)) {
          for (l = e.child = t.child, n = 0; l !== null; )
            ((n = n | l.lanes | l.childLanes), (l = l.sibling));
          l = n & ~i;
        } else ((l = 0), (e.child = null));
        return qd(t, e, i, a, l);
      }
      if ((a & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && mc(e, i !== null ? i.cachePool : null),
          i !== null ? Gf(e, i) : ju(),
          Vf(e));
      else return ((l = e.lanes = 536870912), qd(t, e, i !== null ? i.baseLanes | a : a, a, l));
    } else
      i !== null
        ? (mc(e, i.cachePool), Gf(e, i), $a(), (e.memoizedState = null))
        : (t !== null && mc(e, null), ju(), $a());
    return (te(t, e, n, a), e.child);
  }
  function ii(t, e) {
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
  function qd(t, e, a, l, n) {
    var i = _u();
    return (
      (i = i === null ? null : { parent: qt._currentValue, pool: i }),
      (e.memoizedState = { baseLanes: a, cachePool: i }),
      t !== null && mc(e, null),
      ju(),
      Vf(e),
      t !== null && en(t, e, l, !0),
      (e.childLanes = n),
      null
    );
  }
  function Mc(t, e) {
    return (
      (e = wc({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Ud(t, e, a) {
    return (
      xl(e, t.child, null, a),
      (t = Mc(e, e.pendingProps)),
      (t.flags |= 2),
      Ne(e),
      (e.memoizedState = null),
      t
    );
  }
  function J1(t, e, a) {
    var l = e.pendingProps,
      n = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (rt) {
        if (l.mode === 'hidden') return ((t = Mc(e, l)), (e.lanes = 536870912), ii(null, t));
        if (
          (Au(e),
          (t = Et)
            ? ((t = Fm(t, qe)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Da !== null ? { id: ta, overflow: ea } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = xf(t)),
                (a.return = e),
                (e.child = a),
                (It = e),
                (Et = null)))
            : (t = null),
          t === null)
        )
          throw La(e);
        return ((e.lanes = 536870912), null);
      }
      return Mc(e, l);
    }
    var i = t.memoizedState;
    if (i !== null) {
      var f = i.dehydrated;
      if ((Au(e), n))
        if (e.flags & 256) ((e.flags &= -257), (e = Ud(t, e, a)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(o(558));
      else if ((Gt || en(t, e, a, !1), (n = (a & t.childLanes) !== 0), Gt || n)) {
        if (((l = Nt), l !== null && ((f = zr(l, a)), f !== 0 && f !== i.retryLane)))
          throw ((i.retryLane = f), hl(t, f), _e(l, t, f), ku);
        (Gc(), (e = Ud(t, e, a)));
      } else
        ((t = i.treeContext),
          (Et = Ge(f.nextSibling)),
          (It = e),
          (rt = !0),
          (Ba = null),
          (qe = !1),
          t !== null && Af(e, t),
          (e = Mc(e, l)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = oa(t.child, { mode: l.mode, children: l.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Cc(t, e) {
    var a = e.ref;
    if (a === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (t === null || t.ref !== a) && (e.flags |= 4194816);
    }
  }
  function Qu(t, e, a, l, n) {
    return (
      pl(e),
      (a = Eu(t, e, a, l, void 0, n)),
      (l = zu()),
      t !== null && !Gt
        ? (Mu(t, e, n), va(t, e, n))
        : (rt && l && uu(e), (e.flags |= 1), te(t, e, a, n), e.child)
    );
  }
  function Gd(t, e, a, l, n, i) {
    return (
      pl(e),
      (e.updateQueue = null),
      (a = Yf(e, l, a, n)),
      $f(t),
      (l = zu()),
      t !== null && !Gt
        ? (Mu(t, e, i), va(t, e, i))
        : (rt && l && uu(e), (e.flags |= 1), te(t, e, a, i), e.child)
    );
  }
  function Vd(t, e, a, l, n) {
    if ((pl(e), e.stateNode === null)) {
      var i = Fl,
        f = a.contextType;
      (typeof f == 'object' && f !== null && (i = Pt(f)),
        (i = new a(l, i)),
        (e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = Zu),
        (e.stateNode = i),
        (i._reactInternals = e),
        (i = e.stateNode),
        (i.props = l),
        (i.state = e.memoizedState),
        (i.refs = {}),
        yu(e),
        (f = a.contextType),
        (i.context = typeof f == 'object' && f !== null ? Pt(f) : Fl),
        (i.state = e.memoizedState),
        (f = a.getDerivedStateFromProps),
        typeof f == 'function' && (Yu(e, a, f, l), (i.state = e.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof i.getSnapshotBeforeUpdate == 'function' ||
          (typeof i.UNSAFE_componentWillMount != 'function' &&
            typeof i.componentWillMount != 'function') ||
          ((f = i.state),
          typeof i.componentWillMount == 'function' && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
          f !== i.state && Zu.enqueueReplaceState(i, i.state, null),
          ti(e, l, i, n),
          Pn(),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == 'function' && (e.flags |= 4194308),
        (l = !0));
    } else if (t === null) {
      i = e.stateNode;
      var v = e.memoizedProps,
        y = Tl(a, v);
      i.props = y;
      var N = i.context,
        C = a.contextType;
      ((f = Fl), typeof C == 'object' && C !== null && (f = Pt(C)));
      var D = a.getDerivedStateFromProps;
      ((C = typeof D == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (v = e.pendingProps !== v),
        C ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((v || N !== f) && Ed(e, i, l, f)),
        (qa = !1));
      var z = e.memoizedState;
      ((i.state = z),
        ti(e, l, i, n),
        Pn(),
        (N = e.memoizedState),
        v || z !== N || qa
          ? (typeof D == 'function' && (Yu(e, a, D, l), (N = e.memoizedState)),
            (y = qa || Nd(e, a, y, l, z, N, f))
              ? (C ||
                  (typeof i.UNSAFE_componentWillMount != 'function' &&
                    typeof i.componentWillMount != 'function') ||
                  (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == 'function' &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == 'function' && (e.flags |= 4194308))
              : (typeof i.componentDidMount == 'function' && (e.flags |= 4194308),
                (e.memoizedProps = l),
                (e.memoizedState = N)),
            (i.props = l),
            (i.state = N),
            (i.context = f),
            (l = y))
          : (typeof i.componentDidMount == 'function' && (e.flags |= 4194308), (l = !1)));
    } else {
      ((i = e.stateNode),
        bu(t, e),
        (f = e.memoizedProps),
        (C = Tl(a, f)),
        (i.props = C),
        (D = e.pendingProps),
        (z = i.context),
        (N = a.contextType),
        (y = Fl),
        typeof N == 'object' && N !== null && (y = Pt(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((f !== D || z !== y) && Ed(e, i, l, y)),
        (qa = !1),
        (z = e.memoizedState),
        (i.state = z),
        ti(e, l, i, n),
        Pn());
      var M = e.memoizedState;
      f !== D || z !== M || qa || (t !== null && t.dependencies !== null && fc(t.dependencies))
        ? (typeof v == 'function' && (Yu(e, a, v, l), (M = e.memoizedState)),
          (C =
            qa ||
            Nd(e, a, C, l, z, M, y) ||
            (t !== null && t.dependencies !== null && fc(t.dependencies)))
            ? (N ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(l, M, y),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(l, M, y)),
              typeof i.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (f === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (f === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = l),
              (e.memoizedState = M)),
          (i.props = l),
          (i.state = M),
          (i.context = y),
          (l = C))
        : (typeof i.componentDidUpdate != 'function' ||
            (f === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (f === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 1024),
          (l = !1));
    }
    return (
      (i = l),
      Cc(t, e),
      (l = (e.flags & 128) !== 0),
      i || l
        ? ((i = e.stateNode),
          (a = l && typeof a.getDerivedStateFromError != 'function' ? null : i.render()),
          (e.flags |= 1),
          t !== null && l
            ? ((e.child = xl(e, t.child, null, n)), (e.child = xl(e, null, a, n)))
            : te(t, e, a, n),
          (e.memoizedState = i.state),
          (t = e.child))
        : (t = va(t, e, n)),
      t
    );
  }
  function $d(t, e, a, l) {
    return (gl(), (e.flags |= 256), te(t, e, a, l), e.child);
  }
  var Ku = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Ju(t) {
    return { baseLanes: t, cachePool: wf() };
  }
  function Wu(t, e, a) {
    return ((t = t !== null ? t.childLanes & ~a : 0), e && (t |= ze), t);
  }
  function Yd(t, e, a) {
    var l = e.pendingProps,
      n = !1,
      i = (e.flags & 128) !== 0,
      f;
    if (
      ((f = i) || (f = t !== null && t.memoizedState === null ? !1 : (Lt.current & 2) !== 0),
      f && ((n = !0), (e.flags &= -129)),
      (f = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (rt) {
        if (
          (n ? Va(e) : $a(),
          (t = Et)
            ? ((t = Fm(t, qe)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Da !== null ? { id: ta, overflow: ea } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = xf(t)),
                (a.return = e),
                (e.child = a),
                (It = e),
                (Et = null)))
            : (t = null),
          t === null)
        )
          throw La(e);
        return (Ro(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var v = l.children;
      return (
        (l = l.fallback),
        n
          ? ($a(),
            (n = e.mode),
            (v = wc({ mode: 'hidden', children: v }, n)),
            (l = vl(l, n, a, null)),
            (v.return = e),
            (l.return = e),
            (v.sibling = l),
            (e.child = v),
            (l = e.child),
            (l.memoizedState = Ju(a)),
            (l.childLanes = Wu(t, f, a)),
            (e.memoizedState = Ku),
            ii(null, l))
          : (Va(e), Fu(e, v))
      );
    }
    var y = t.memoizedState;
    if (y !== null && ((v = y.dehydrated), v !== null)) {
      if (i)
        e.flags & 256
          ? (Va(e), (e.flags &= -257), (e = Iu(t, e, a)))
          : e.memoizedState !== null
            ? ($a(), (e.child = t.child), (e.flags |= 128), (e = null))
            : ($a(),
              (v = l.fallback),
              (n = e.mode),
              (l = wc({ mode: 'visible', children: l.children }, n)),
              (v = vl(v, n, a, null)),
              (v.flags |= 2),
              (l.return = e),
              (v.return = e),
              (l.sibling = v),
              (e.child = l),
              xl(e, t.child, null, a),
              (l = e.child),
              (l.memoizedState = Ju(a)),
              (l.childLanes = Wu(t, f, a)),
              (e.memoizedState = Ku),
              (e = ii(null, l)));
      else if ((Va(e), Ro(v))) {
        if (((f = v.nextSibling && v.nextSibling.dataset), f)) var N = f.dgst;
        ((f = N),
          (l = Error(o(419))),
          (l.stack = ''),
          (l.digest = f),
          Qn({ value: l, source: null, stack: null }),
          (e = Iu(t, e, a)));
      } else if ((Gt || en(t, e, a, !1), (f = (a & t.childLanes) !== 0), Gt || f)) {
        if (((f = Nt), f !== null && ((l = zr(f, a)), l !== 0 && l !== y.retryLane)))
          throw ((y.retryLane = l), hl(t, l), _e(f, t, l), ku);
        (Oo(v) || Gc(), (e = Iu(t, e, a)));
      } else
        Oo(v)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = y.treeContext),
            (Et = Ge(v.nextSibling)),
            (It = e),
            (rt = !0),
            (Ba = null),
            (qe = !1),
            t !== null && Af(e, t),
            (e = Fu(e, l.children)),
            (e.flags |= 4096));
      return e;
    }
    return n
      ? ($a(),
        (v = l.fallback),
        (n = e.mode),
        (y = t.child),
        (N = y.sibling),
        (l = oa(y, { mode: 'hidden', children: l.children })),
        (l.subtreeFlags = y.subtreeFlags & 65011712),
        N !== null ? (v = oa(N, v)) : ((v = vl(v, n, a, null)), (v.flags |= 2)),
        (v.return = e),
        (l.return = e),
        (l.sibling = v),
        (e.child = l),
        ii(null, l),
        (l = e.child),
        (v = t.child.memoizedState),
        v === null
          ? (v = Ju(a))
          : ((n = v.cachePool),
            n !== null
              ? ((y = qt._currentValue), (n = n.parent !== y ? { parent: y, pool: y } : n))
              : (n = wf()),
            (v = { baseLanes: v.baseLanes | a, cachePool: n })),
        (l.memoizedState = v),
        (l.childLanes = Wu(t, f, a)),
        (e.memoizedState = Ku),
        ii(t.child, l))
      : (Va(e),
        (a = t.child),
        (t = a.sibling),
        (a = oa(a, { mode: 'visible', children: l.children })),
        (a.return = e),
        (a.sibling = null),
        t !== null &&
          ((f = e.deletions), f === null ? ((e.deletions = [t]), (e.flags |= 16)) : f.push(t)),
        (e.child = a),
        (e.memoizedState = null),
        a);
  }
  function Fu(t, e) {
    return ((e = wc({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function wc(t, e) {
    return ((t = Te(22, t, null, e)), (t.lanes = 0), t);
  }
  function Iu(t, e, a) {
    return (
      xl(e, t.child, null, a),
      (t = Fu(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function Zd(t, e, a) {
    t.lanes |= e;
    var l = t.alternate;
    (l !== null && (l.lanes |= e), mu(t.return, e, a));
  }
  function Pu(t, e, a, l, n, i) {
    var f = t.memoizedState;
    f === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: a,
          tailMode: n,
          treeForkCount: i,
        })
      : ((f.isBackwards = e),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = l),
        (f.tail = a),
        (f.tailMode = n),
        (f.treeForkCount = i));
  }
  function Xd(t, e, a) {
    var l = e.pendingProps,
      n = l.revealOrder,
      i = l.tail;
    l = l.children;
    var f = Lt.current,
      v = (f & 2) !== 0;
    if (
      (v ? ((f = (f & 1) | 2), (e.flags |= 128)) : (f &= 1),
      V(Lt, f),
      te(t, e, l, a),
      (l = rt ? kn : 0),
      !v && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Zd(t, a, e);
        else if (t.tag === 19) Zd(t, a, e);
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
    switch (n) {
      case 'forwards':
        for (a = e.child, n = null; a !== null; )
          ((t = a.alternate), t !== null && yc(t) === null && (n = a), (a = a.sibling));
        ((a = n),
          a === null ? ((n = e.child), (e.child = null)) : ((n = a.sibling), (a.sibling = null)),
          Pu(e, !1, n, a, i, l));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, n = e.child, e.child = null; n !== null; ) {
          if (((t = n.alternate), t !== null && yc(t) === null)) {
            e.child = n;
            break;
          }
          ((t = n.sibling), (n.sibling = a), (a = n), (n = t));
        }
        Pu(e, !0, a, null, i, l);
        break;
      case 'together':
        Pu(e, !1, null, null, void 0, l);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function va(t, e, a) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (Xa |= e.lanes), (a & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((en(t, e, a, !1), (a & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(o(153));
    if (e.child !== null) {
      for (t = e.child, a = oa(t, t.pendingProps), e.child = a, a.return = e; t.sibling !== null; )
        ((t = t.sibling), (a = a.sibling = oa(t, t.pendingProps)), (a.return = e));
      a.sibling = null;
    }
    return e.child;
  }
  function to(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && fc(t)));
  }
  function W1(t, e, a) {
    switch (e.tag) {
      case 3:
        (Wt(e, e.stateNode.containerInfo), Ha(e, qt, t.memoizedState.cache), gl());
        break;
      case 27:
      case 5:
        ul(e);
        break;
      case 4:
        Wt(e, e.stateNode.containerInfo);
        break;
      case 10:
        Ha(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), Au(e), null);
        break;
      case 13:
        var l = e.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (Va(e), (e.flags |= 128), null)
            : (a & e.child.childLanes) !== 0
              ? Yd(t, e, a)
              : (Va(e), (t = va(t, e, a)), t !== null ? t.sibling : null);
        Va(e);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (
          ((l = (a & e.childLanes) !== 0),
          l || (en(t, e, a, !1), (l = (a & e.childLanes) !== 0)),
          n)
        ) {
          if (l) return Xd(t, e, a);
          e.flags |= 128;
        }
        if (
          ((n = e.memoizedState),
          n !== null && ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          V(Lt, Lt.current),
          l)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), Hd(t, e, a, e.pendingProps));
      case 24:
        Ha(e, qt, t.memoizedState.cache);
    }
    return va(t, e, a);
  }
  function kd(t, e, a) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Gt = !0;
      else {
        if (!to(t, a) && (e.flags & 128) === 0) return ((Gt = !1), W1(t, e, a));
        Gt = (t.flags & 131072) !== 0;
      }
    else ((Gt = !1), rt && (e.flags & 1048576) !== 0 && Tf(e, kn, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var l = e.pendingProps;
          if (((t = bl(e.elementType)), (e.type = t), typeof t == 'function'))
            iu(t)
              ? ((l = Tl(t, l)), (e.tag = 1), (e = Vd(null, e, t, l, a)))
              : ((e.tag = 0), (e = Qu(null, e, t, l, a)));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === Yt) {
                ((e.tag = 11), (e = Dd(null, e, t, l, a)));
                break t;
              } else if (n === lt) {
                ((e.tag = 14), (e = Bd(null, e, t, l, a)));
                break t;
              }
            }
            throw ((e = we(t) || t), Error(o(306, e, '')));
          }
        }
        return e;
      case 0:
        return Qu(t, e, e.type, e.pendingProps, a);
      case 1:
        return ((l = e.type), (n = Tl(l, e.pendingProps)), Vd(t, e, l, n, a));
      case 3:
        t: {
          if ((Wt(e, e.stateNode.containerInfo), t === null)) throw Error(o(387));
          l = e.pendingProps;
          var i = e.memoizedState;
          ((n = i.element), bu(t, e), ti(e, l, null, a));
          var f = e.memoizedState;
          if (
            ((l = f.cache),
            Ha(e, qt, l),
            l !== i.cache && hu(e, [qt], a, !0),
            Pn(),
            (l = f.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: l, isDehydrated: !1, cache: f.cache }),
              (e.updateQueue.baseState = i),
              (e.memoizedState = i),
              e.flags & 256)
            ) {
              e = $d(t, e, l, a);
              break t;
            } else if (l !== n) {
              ((n = Be(Error(o(424)), e)), Qn(n), (e = $d(t, e, l, a)));
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
                Et = Ge(t.firstChild),
                  It = e,
                  rt = !0,
                  Ba = null,
                  qe = !0,
                  a = Hf(e, null, l, a),
                  e.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((gl(), l === n)) {
              e = va(t, e, a);
              break t;
            }
            te(t, e, l, a);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          Cc(t, e),
          t === null
            ? (a = lh(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = a)
              : rt ||
                ((a = e.type),
                (t = e.pendingProps),
                (l = Qc(nt.current).createElement(a)),
                (l[Ft] = e),
                (l[fe] = t),
                ee(l, a, t),
                Qt(l),
                (e.stateNode = l))
            : (e.memoizedState = lh(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          ul(e),
          t === null &&
            rt &&
            ((l = e.stateNode = th(e.type, e.pendingProps, nt.current)),
            (It = e),
            (qe = !0),
            (n = Et),
            Wa(e.type) ? ((Do = n), (Et = Ge(l.firstChild))) : (Et = n)),
          te(t, e, e.pendingProps.children, a),
          Cc(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            rt &&
            ((n = l = Et) &&
              ((l = Nv(l, e.type, e.pendingProps, qe)),
              l !== null
                ? ((e.stateNode = l), (It = e), (Et = Ge(l.firstChild)), (qe = !1), (n = !0))
                : (n = !1)),
            n || La(e)),
          ul(e),
          (n = e.type),
          (i = e.pendingProps),
          (f = t !== null ? t.memoizedProps : null),
          (l = i.children),
          Mo(n, i) ? (l = null) : f !== null && Mo(n, f) && (e.flags |= 32),
          e.memoizedState !== null && ((n = Eu(t, e, V1, null, null, a)), (bi._currentValue = n)),
          Cc(t, e),
          te(t, e, l, a),
          e.child
        );
      case 6:
        return (
          t === null &&
            rt &&
            ((t = a = Et) &&
              ((a = Ev(a, e.pendingProps, qe)),
              a !== null ? ((e.stateNode = a), (It = e), (Et = null), (t = !0)) : (t = !1)),
            t || La(e)),
          null
        );
      case 13:
        return Yd(t, e, a);
      case 4:
        return (
          Wt(e, e.stateNode.containerInfo),
          (l = e.pendingProps),
          t === null ? (e.child = xl(e, null, l, a)) : te(t, e, l, a),
          e.child
        );
      case 11:
        return Dd(t, e, e.type, e.pendingProps, a);
      case 7:
        return (te(t, e, e.pendingProps, a), e.child);
      case 8:
        return (te(t, e, e.pendingProps.children, a), e.child);
      case 12:
        return (te(t, e, e.pendingProps.children, a), e.child);
      case 10:
        return ((l = e.pendingProps), Ha(e, e.type, l.value), te(t, e, l.children, a), e.child);
      case 9:
        return (
          (n = e.type._context),
          (l = e.pendingProps.children),
          pl(e),
          (n = Pt(n)),
          (l = l(n)),
          (e.flags |= 1),
          te(t, e, l, a),
          e.child
        );
      case 14:
        return Bd(t, e, e.type, e.pendingProps, a);
      case 15:
        return Ld(t, e, e.type, e.pendingProps, a);
      case 19:
        return Xd(t, e, a);
      case 31:
        return J1(t, e, a);
      case 22:
        return Hd(t, e, a, e.pendingProps);
      case 24:
        return (
          pl(e),
          (l = Pt(qt)),
          t === null
            ? ((n = _u()),
              n === null &&
                ((n = Nt),
                (i = vu()),
                (n.pooledCache = i),
                i.refCount++,
                i !== null && (n.pooledCacheLanes |= a),
                (n = i)),
              (e.memoizedState = { parent: l, cache: n }),
              yu(e),
              Ha(e, qt, n))
            : ((t.lanes & a) !== 0 && (bu(t, e), ti(e, null, null, a), Pn()),
              (n = t.memoizedState),
              (i = e.memoizedState),
              n.parent !== l
                ? ((n = { parent: l, cache: l }),
                  (e.memoizedState = n),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n),
                  Ha(e, qt, l))
                : ((l = i.cache), Ha(e, qt, l), l !== n.cache && hu(e, [qt], a, !0))),
          te(t, e, e.pendingProps.children, a),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function ga(t) {
    t.flags |= 4;
  }
  function eo(t, e, a, l, n) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (n & 335544128) === n))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (ym()) t.flags |= 8192;
        else throw ((Sl = vc), pu);
    } else t.flags &= -16777217;
  }
  function Qd(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !uh(e)))
      if (ym()) t.flags |= 8192;
      else throw ((Sl = vc), pu);
  }
  function Oc(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? Ar() : 536870912), (t.lanes |= e), (hn |= e)));
  }
  function ci(t, e) {
    if (!rt)
      switch (t.tailMode) {
        case 'hidden':
          e = t.tail;
          for (var a = null; e !== null; ) (e.alternate !== null && (a = e), (e = e.sibling));
          a === null ? (t.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = t.tail;
          for (var l = null; a !== null; ) (a.alternate !== null && (l = a), (a = a.sibling));
          l === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function zt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      a = 0,
      l = 0;
    if (e)
      for (var n = t.child; n !== null; )
        ((a |= n.lanes | n.childLanes),
          (l |= n.subtreeFlags & 65011712),
          (l |= n.flags & 65011712),
          (n.return = t),
          (n = n.sibling));
    else
      for (n = t.child; n !== null; )
        ((a |= n.lanes | n.childLanes),
          (l |= n.subtreeFlags),
          (l |= n.flags),
          (n.return = t),
          (n = n.sibling));
    return ((t.subtreeFlags |= l), (t.childLanes = a), e);
  }
  function F1(t, e, a) {
    var l = e.pendingProps;
    switch ((ou(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (zt(e), null);
      case 1:
        return (zt(e), null);
      case 3:
        return (
          (a = e.stateNode),
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          da(qt),
          wt(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (tn(e)
              ? ga(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), fu())),
          zt(e),
          null
        );
      case 26:
        var n = e.type,
          i = e.memoizedState;
        return (
          t === null
            ? (ga(e), i !== null ? (zt(e), Qd(e, i)) : (zt(e), eo(e, n, null, l, a)))
            : i
              ? i !== t.memoizedState
                ? (ga(e), zt(e), Qd(e, i))
                : (zt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== l && ga(e), zt(e), eo(e, n, t, l, a)),
          null
        );
      case 27:
        if ((Bl(e), (a = nt.current), (n = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== l && ga(e);
        else {
          if (!l) {
            if (e.stateNode === null) throw Error(o(166));
            return (zt(e), null);
          }
          ((t = Z.current), tn(e) ? Nf(e) : ((t = th(n, l, a)), (e.stateNode = t), ga(e)));
        }
        return (zt(e), null);
      case 5:
        if ((Bl(e), (n = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== l && ga(e);
        else {
          if (!l) {
            if (e.stateNode === null) throw Error(o(166));
            return (zt(e), null);
          }
          if (((i = Z.current), tn(e))) Nf(e);
          else {
            var f = Qc(nt.current);
            switch (i) {
              case 1:
                i = f.createElementNS('http://www.w3.org/2000/svg', n);
                break;
              case 2:
                i = f.createElementNS('http://www.w3.org/1998/Math/MathML', n);
                break;
              default:
                switch (n) {
                  case 'svg':
                    i = f.createElementNS('http://www.w3.org/2000/svg', n);
                    break;
                  case 'math':
                    i = f.createElementNS('http://www.w3.org/1998/Math/MathML', n);
                    break;
                  case 'script':
                    ((i = f.createElement('div')),
                      (i.innerHTML = '<script><\/script>'),
                      (i = i.removeChild(i.firstChild)));
                    break;
                  case 'select':
                    ((i =
                      typeof l.is == 'string'
                        ? f.createElement('select', { is: l.is })
                        : f.createElement('select')),
                      l.multiple ? (i.multiple = !0) : l.size && (i.size = l.size));
                    break;
                  default:
                    i =
                      typeof l.is == 'string'
                        ? f.createElement(n, { is: l.is })
                        : f.createElement(n);
                }
            }
            ((i[Ft] = e), (i[fe] = l));
            t: for (f = e.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) i.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                ((f.child.return = f), (f = f.child));
                continue;
              }
              if (f === e) break t;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === e) break t;
                f = f.return;
              }
              ((f.sibling.return = f.return), (f = f.sibling));
            }
            e.stateNode = i;
            t: switch ((ee(i, n, l), n)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                l = !!l.autoFocus;
                break t;
              case 'img':
                l = !0;
                break t;
              default:
                l = !1;
            }
            l && ga(e);
          }
        }
        return (zt(e), eo(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, a), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== l && ga(e);
        else {
          if (typeof l != 'string' && e.stateNode === null) throw Error(o(166));
          if (((t = nt.current), tn(e))) {
            if (((t = e.stateNode), (a = e.memoizedProps), (l = null), (n = It), n !== null))
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            ((t[Ft] = e),
              (t = !!(
                t.nodeValue === a ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                Ym(t.nodeValue, a)
              )),
              t || La(e, !0));
          } else ((t = Qc(t).createTextNode(l)), (t[Ft] = e), (e.stateNode = t));
        }
        return (zt(e), null);
      case 31:
        if (((a = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((l = tn(e)), a !== null)) {
            if (t === null) {
              if (!l) throw Error(o(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(o(557));
              t[Ft] = e;
            } else (gl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (zt(e), (t = !1));
          } else
            ((a = fu()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a),
              (t = !0));
          if (!t) return e.flags & 256 ? (Ne(e), e) : (Ne(e), null);
          if ((e.flags & 128) !== 0) throw Error(o(558));
        }
        return (zt(e), null);
      case 13:
        if (
          ((l = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((n = tn(e)), l !== null && l.dehydrated !== null)) {
            if (t === null) {
              if (!n) throw Error(o(318));
              if (((n = e.memoizedState), (n = n !== null ? n.dehydrated : null), !n))
                throw Error(o(317));
              n[Ft] = e;
            } else (gl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (zt(e), (n = !1));
          } else
            ((n = fu()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n),
              (n = !0));
          if (!n) return e.flags & 256 ? (Ne(e), e) : (Ne(e), null);
        }
        return (
          Ne(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = a), e)
            : ((a = l !== null),
              (t = t !== null && t.memoizedState !== null),
              a &&
                ((l = e.child),
                (n = null),
                l.alternate !== null &&
                  l.alternate.memoizedState !== null &&
                  l.alternate.memoizedState.cachePool !== null &&
                  (n = l.alternate.memoizedState.cachePool.pool),
                (i = null),
                l.memoizedState !== null &&
                  l.memoizedState.cachePool !== null &&
                  (i = l.memoizedState.cachePool.pool),
                i !== n && (l.flags |= 2048)),
              a !== t && a && (e.child.flags |= 8192),
              Oc(e, e.updateQueue),
              zt(e),
              null)
        );
      case 4:
        return (wt(), t === null && To(e.stateNode.containerInfo), zt(e), null);
      case 10:
        return (da(e.type), zt(e), null);
      case 19:
        if ((B(Lt), (l = e.memoizedState), l === null)) return (zt(e), null);
        if (((n = (e.flags & 128) !== 0), (i = l.rendering), i === null))
          if (n) ci(l, !1);
          else {
            if (Rt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((i = yc(t)), i !== null)) {
                  for (
                    e.flags |= 128,
                      ci(l, !1),
                      t = i.updateQueue,
                      e.updateQueue = t,
                      Oc(e, t),
                      e.subtreeFlags = 0,
                      t = a,
                      a = e.child;
                    a !== null;
                  )
                    (Sf(a, t), (a = a.sibling));
                  return (V(Lt, (Lt.current & 1) | 2), rt && ra(e, l.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            l.tail !== null &&
              be() > Hc &&
              ((e.flags |= 128), (n = !0), ci(l, !1), (e.lanes = 4194304));
          }
        else {
          if (!n)
            if (((t = yc(i)), t !== null)) {
              if (
                ((e.flags |= 128),
                (n = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                Oc(e, t),
                ci(l, !0),
                l.tail === null && l.tailMode === 'hidden' && !i.alternate && !rt)
              )
                return (zt(e), null);
            } else
              2 * be() - l.renderingStartTime > Hc &&
                a !== 536870912 &&
                ((e.flags |= 128), (n = !0), ci(l, !1), (e.lanes = 4194304));
          l.isBackwards
            ? ((i.sibling = e.child), (e.child = i))
            : ((t = l.last), t !== null ? (t.sibling = i) : (e.child = i), (l.last = i));
        }
        return l.tail !== null
          ? ((t = l.tail),
            (l.rendering = t),
            (l.tail = t.sibling),
            (l.renderingStartTime = be()),
            (t.sibling = null),
            (a = Lt.current),
            V(Lt, n ? (a & 1) | 2 : a & 1),
            rt && ra(e, l.treeForkCount),
            t)
          : (zt(e), null);
      case 22:
      case 23:
        return (
          Ne(e),
          Tu(),
          (l = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== l && (e.flags |= 8192)
            : l && (e.flags |= 8192),
          l
            ? (a & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (zt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : zt(e),
          (a = e.updateQueue),
          a !== null && Oc(e, a.retryQueue),
          (a = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          (l = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          l !== a && (e.flags |= 2048),
          t !== null && B(yl),
          null
        );
      case 24:
        return (
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          da(qt),
          zt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function I1(t, e) {
    switch ((ou(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          da(qt),
          wt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (Bl(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((Ne(e), e.alternate === null)) throw Error(o(340));
          gl();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((Ne(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(o(340));
          gl();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (B(Lt), null);
      case 4:
        return (wt(), null);
      case 10:
        return (da(e.type), null);
      case 22:
      case 23:
        return (
          Ne(e),
          Tu(),
          t !== null && B(yl),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (da(qt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kd(t, e) {
    switch ((ou(e), e.tag)) {
      case 3:
        (da(qt), wt());
        break;
      case 26:
      case 27:
      case 5:
        Bl(e);
        break;
      case 4:
        wt();
        break;
      case 31:
        e.memoizedState !== null && Ne(e);
        break;
      case 13:
        Ne(e);
        break;
      case 19:
        B(Lt);
        break;
      case 10:
        da(e.type);
        break;
      case 22:
      case 23:
        (Ne(e), Tu(), t !== null && B(yl));
        break;
      case 24:
        da(qt);
    }
  }
  function si(t, e) {
    try {
      var a = e.updateQueue,
        l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var n = l.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            l = void 0;
            var i = a.create,
              f = a.inst;
            ((l = i()), (f.destroy = l));
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (v) {
      St(e, e.return, v);
    }
  }
  function Ya(t, e, a) {
    try {
      var l = e.updateQueue,
        n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        l = i;
        do {
          if ((l.tag & t) === t) {
            var f = l.inst,
              v = f.destroy;
            if (v !== void 0) {
              ((f.destroy = void 0), (n = e));
              var y = a,
                N = v;
              try {
                N();
              } catch (C) {
                St(n, y, C);
              }
            }
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (C) {
      St(e, e.return, C);
    }
  }
  function Jd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        Uf(e, a);
      } catch (l) {
        St(t, t.return, l);
      }
    }
  }
  function Wd(t, e, a) {
    ((a.props = Tl(t.type, t.memoizedProps)), (a.state = t.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (l) {
      St(t, e, l);
    }
  }
  function ui(t, e) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof a == 'function' ? (t.refCleanup = a(l)) : (a.current = l);
      }
    } catch (n) {
      St(t, e, n);
    }
  }
  function aa(t, e) {
    var a = t.ref,
      l = t.refCleanup;
    if (a !== null)
      if (typeof l == 'function')
        try {
          l();
        } catch (n) {
          St(t, e, n);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (n) {
          St(t, e, n);
        }
      else a.current = null;
  }
  function Fd(t) {
    var e = t.type,
      a = t.memoizedProps,
      l = t.stateNode;
    try {
      t: switch (e) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && l.focus();
          break t;
        case 'img':
          a.src ? (l.src = a.src) : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (n) {
      St(t, t.return, n);
    }
  }
  function ao(t, e, a) {
    try {
      var l = t.stateNode;
      (bv(l, t.type, a, e), (l[fe] = e));
    } catch (n) {
      St(t, t.return, n);
    }
  }
  function Id(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Wa(t.type)) || t.tag === 4
    );
  }
  function lo(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Id(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && Wa(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function no(t, e, a) {
    var l = t.tag;
    if (l === 5 || l === 6)
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
            a != null || e.onclick !== null || (e.onclick = sa)));
    else if (
      l !== 4 &&
      (l === 27 && Wa(t.type) && ((a = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (no(t, e, a), t = t.sibling; t !== null; ) (no(t, e, a), (t = t.sibling));
  }
  function Rc(t, e, a) {
    var l = t.tag;
    if (l === 5 || l === 6) ((t = t.stateNode), e ? a.insertBefore(t, e) : a.appendChild(t));
    else if (l !== 4 && (l === 27 && Wa(t.type) && (a = t.stateNode), (t = t.child), t !== null))
      for (Rc(t, e, a), t = t.sibling; t !== null; ) (Rc(t, e, a), (t = t.sibling));
  }
  function Pd(t) {
    var e = t.stateNode,
      a = t.memoizedProps;
    try {
      for (var l = t.type, n = e.attributes; n.length; ) e.removeAttributeNode(n[0]);
      (ee(e, l, a), (e[Ft] = t), (e[fe] = a));
    } catch (i) {
      St(t, t.return, i);
    }
  }
  var _a = !1,
    Vt = !1,
    io = !1,
    tm = typeof WeakSet == 'function' ? WeakSet : Set,
    Kt = null;
  function P1(t, e) {
    if (((t = t.containerInfo), (Eo = ts), (t = df(t)), Is(t))) {
      if ('selectionStart' in t) var a = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          a = ((a = t.ownerDocument) && a.defaultView) || window;
          var l = a.getSelection && a.getSelection();
          if (l && l.rangeCount !== 0) {
            a = l.anchorNode;
            var n = l.anchorOffset,
              i = l.focusNode;
            l = l.focusOffset;
            try {
              (a.nodeType, i.nodeType);
            } catch {
              a = null;
              break t;
            }
            var f = 0,
              v = -1,
              y = -1,
              N = 0,
              C = 0,
              D = t,
              z = null;
            e: for (;;) {
              for (
                var M;
                D !== a || (n !== 0 && D.nodeType !== 3) || (v = f + n),
                  D !== i || (l !== 0 && D.nodeType !== 3) || (y = f + l),
                  D.nodeType === 3 && (f += D.nodeValue.length),
                  (M = D.firstChild) !== null;
              )
                ((z = D), (D = M));
              for (;;) {
                if (D === t) break e;
                if (
                  (z === a && ++N === n && (v = f),
                  z === i && ++C === l && (y = f),
                  (M = D.nextSibling) !== null)
                )
                  break;
                ((D = z), (z = D.parentNode));
              }
              D = M;
            }
            a = v === -1 || y === -1 ? null : { start: v, end: y };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (zo = { focusedElem: t, selectionRange: a }, ts = !1, Kt = e; Kt !== null; )
      if (((e = Kt), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = e), (Kt = t));
      else
        for (; Kt !== null; ) {
          switch (((e = Kt), (i = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (a = 0; a < t.length; a++) ((n = t[a]), (n.ref.impl = n.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && i !== null) {
                ((t = void 0),
                  (a = e),
                  (n = i.memoizedProps),
                  (i = i.memoizedState),
                  (l = a.stateNode));
                try {
                  var Y = Tl(a.type, n);
                  ((t = l.getSnapshotBeforeUpdate(Y, i)),
                    (l.__reactInternalSnapshotBeforeUpdate = t));
                } catch (J) {
                  St(a, a.return, J);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (a = t.nodeType), a === 9)) wo(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      wo(t);
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
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (((t = e.sibling), t !== null)) {
            ((t.return = e.return), (Kt = t));
            break;
          }
          Kt = e.return;
        }
  }
  function em(t, e, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (ya(t, a), l & 4 && si(5, a));
        break;
      case 1:
        if ((ya(t, a), l & 4))
          if (((t = a.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (f) {
              St(a, a.return, f);
            }
          else {
            var n = Tl(a.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(n, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              St(a, a.return, f);
            }
          }
        (l & 64 && Jd(a), l & 512 && ui(a, a.return));
        break;
      case 3:
        if ((ya(t, a), l & 64 && ((t = a.updateQueue), t !== null))) {
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
            Uf(t, e);
          } catch (f) {
            St(a, a.return, f);
          }
        }
        break;
      case 27:
        e === null && l & 4 && Pd(a);
      case 26:
      case 5:
        (ya(t, a), e === null && l & 4 && Fd(a), l & 512 && ui(a, a.return));
        break;
      case 12:
        ya(t, a);
        break;
      case 31:
        (ya(t, a), l & 4 && nm(t, a));
        break;
      case 13:
        (ya(t, a),
          l & 4 && im(t, a),
          l & 64 &&
            ((t = a.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((a = uv.bind(null, a)), zv(t, a)))));
        break;
      case 22:
        if (((l = a.memoizedState !== null || _a), !l)) {
          ((e = (e !== null && e.memoizedState !== null) || Vt), (n = _a));
          var i = Vt;
          ((_a = l),
            (Vt = e) && !i ? ba(t, a, (a.subtreeFlags & 8772) !== 0) : ya(t, a),
            (_a = n),
            (Vt = i));
        }
        break;
      case 30:
        break;
      default:
        ya(t, a);
    }
  }
  function am(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), am(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && Bs(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var Mt = null,
    me = !1;
  function pa(t, e, a) {
    for (a = a.child; a !== null; ) (lm(t, e, a), (a = a.sibling));
  }
  function lm(t, e, a) {
    if (Se && typeof Se.onCommitFiberUnmount == 'function')
      try {
        Se.onCommitFiberUnmount(On, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (Vt || aa(a, e),
          pa(t, e, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        Vt || aa(a, e);
        var l = Mt,
          n = me;
        (Wa(a.type) && ((Mt = a.stateNode), (me = !1)),
          pa(t, e, a),
          _i(a.stateNode),
          (Mt = l),
          (me = n));
        break;
      case 5:
        Vt || aa(a, e);
      case 6:
        if (((l = Mt), (n = me), (Mt = null), pa(t, e, a), (Mt = l), (me = n), Mt !== null))
          if (me)
            try {
              (Mt.nodeType === 9
                ? Mt.body
                : Mt.nodeName === 'HTML'
                  ? Mt.ownerDocument.body
                  : Mt
              ).removeChild(a.stateNode);
            } catch (i) {
              St(a, e, i);
            }
          else
            try {
              Mt.removeChild(a.stateNode);
            } catch (i) {
              St(a, e, i);
            }
        break;
      case 18:
        Mt !== null &&
          (me
            ? ((t = Mt),
              Jm(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                a.stateNode
              ),
              xn(t))
            : Jm(Mt, a.stateNode));
        break;
      case 4:
        ((l = Mt),
          (n = me),
          (Mt = a.stateNode.containerInfo),
          (me = !0),
          pa(t, e, a),
          (Mt = l),
          (me = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Ya(2, a, e), Vt || Ya(4, a, e), pa(t, e, a));
        break;
      case 1:
        (Vt ||
          (aa(a, e), (l = a.stateNode), typeof l.componentWillUnmount == 'function' && Wd(a, e, l)),
          pa(t, e, a));
        break;
      case 21:
        pa(t, e, a);
        break;
      case 22:
        ((Vt = (l = Vt) || a.memoizedState !== null), pa(t, e, a), (Vt = l));
        break;
      default:
        pa(t, e, a);
    }
  }
  function nm(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        xn(t);
      } catch (a) {
        St(e, e.return, a);
      }
    }
  }
  function im(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        xn(t);
      } catch (a) {
        St(e, e.return, a);
      }
  }
  function tv(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new tm()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new tm()),
          e
        );
      default:
        throw Error(o(435, t.tag));
    }
  }
  function Dc(t, e) {
    var a = tv(t);
    e.forEach(function (l) {
      if (!a.has(l)) {
        a.add(l);
        var n = ov.bind(null, t, l);
        l.then(n, n);
      }
    });
  }
  function he(t, e) {
    var a = e.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l],
          i = t,
          f = e,
          v = f;
        t: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (Wa(v.type)) {
                ((Mt = v.stateNode), (me = !1));
                break t;
              }
              break;
            case 5:
              ((Mt = v.stateNode), (me = !1));
              break t;
            case 3:
            case 4:
              ((Mt = v.stateNode.containerInfo), (me = !0));
              break t;
          }
          v = v.return;
        }
        if (Mt === null) throw Error(o(160));
        (lm(i, f, n),
          (Mt = null),
          (me = !1),
          (i = n.alternate),
          i !== null && (i.return = null),
          (n.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (cm(e, t), (e = e.sibling));
  }
  var ke = null;
  function cm(t, e) {
    var a = t.alternate,
      l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (he(e, t), ve(t), l & 4 && (Ya(3, t, t.return), si(3, t), Ya(5, t, t.return)));
        break;
      case 1:
        (he(e, t),
          ve(t),
          l & 512 && (Vt || a === null || aa(a, a.return)),
          l & 64 &&
            _a &&
            ((t = t.updateQueue),
            t !== null &&
              ((l = t.callbacks),
              l !== null &&
                ((a = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = a === null ? l : a.concat(l))))));
        break;
      case 26:
        var n = ke;
        if ((he(e, t), ve(t), l & 512 && (Vt || a === null || aa(a, a.return)), l & 4)) {
          var i = a !== null ? a.memoizedState : null;
          if (((l = t.memoizedState), a === null))
            if (l === null)
              if (t.stateNode === null) {
                t: {
                  ((l = t.type), (a = t.memoizedProps), (n = n.ownerDocument || n));
                  e: switch (l) {
                    case 'title':
                      ((i = n.getElementsByTagName('title')[0]),
                        (!i ||
                          i[Bn] ||
                          i[Ft] ||
                          i.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          i.hasAttribute('itemprop')) &&
                          ((i = n.createElement(l)),
                          n.head.insertBefore(i, n.querySelector('head > title'))),
                        ee(i, l, a),
                        (i[Ft] = t),
                        Qt(i),
                        (l = i));
                      break t;
                    case 'link':
                      var f = ch('link', 'href', n).get(l + (a.href || ''));
                      if (f) {
                        for (var v = 0; v < f.length; v++)
                          if (
                            ((i = f[v]),
                            i.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              i.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              i.getAttribute('title') === (a.title == null ? null : a.title) &&
                              i.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            f.splice(v, 1);
                            break e;
                          }
                      }
                      ((i = n.createElement(l)), ee(i, l, a), n.head.appendChild(i));
                      break;
                    case 'meta':
                      if ((f = ch('meta', 'content', n).get(l + (a.content || '')))) {
                        for (v = 0; v < f.length; v++)
                          if (
                            ((i = f[v]),
                            i.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              i.getAttribute('name') === (a.name == null ? null : a.name) &&
                              i.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              i.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              i.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            f.splice(v, 1);
                            break e;
                          }
                      }
                      ((i = n.createElement(l)), ee(i, l, a), n.head.appendChild(i));
                      break;
                    default:
                      throw Error(o(468, l));
                  }
                  ((i[Ft] = t), Qt(i), (l = i));
                }
                t.stateNode = l;
              } else sh(n, t.type, t.stateNode);
            else t.stateNode = ih(n, l, t.memoizedProps);
          else
            i !== l
              ? (i === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : i.count--,
                l === null ? sh(n, t.type, t.stateNode) : ih(n, l, t.memoizedProps))
              : l === null && t.stateNode !== null && ao(t, t.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (he(e, t),
          ve(t),
          l & 512 && (Vt || a === null || aa(a, a.return)),
          a !== null && l & 4 && ao(t, t.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((he(e, t), ve(t), l & 512 && (Vt || a === null || aa(a, a.return)), t.flags & 32)) {
          n = t.stateNode;
          try {
            Zl(n, '');
          } catch (Y) {
            St(t, t.return, Y);
          }
        }
        (l & 4 &&
          t.stateNode != null &&
          ((n = t.memoizedProps), ao(t, n, a !== null ? a.memoizedProps : n)),
          l & 1024 && (io = !0));
        break;
      case 6:
        if ((he(e, t), ve(t), l & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          ((l = t.memoizedProps), (a = t.stateNode));
          try {
            a.nodeValue = l;
          } catch (Y) {
            St(t, t.return, Y);
          }
        }
        break;
      case 3:
        if (
          ((Wc = null),
          (n = ke),
          (ke = Kc(e.containerInfo)),
          he(e, t),
          (ke = n),
          ve(t),
          l & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            xn(e.containerInfo);
          } catch (Y) {
            St(t, t.return, Y);
          }
        io && ((io = !1), sm(t));
        break;
      case 4:
        ((l = ke), (ke = Kc(t.stateNode.containerInfo)), he(e, t), ve(t), (ke = l));
        break;
      case 12:
        (he(e, t), ve(t));
        break;
      case 31:
        (he(e, t),
          ve(t),
          l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Dc(t, l))));
        break;
      case 13:
        (he(e, t),
          ve(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Lc = be()),
          l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Dc(t, l))));
        break;
      case 22:
        n = t.memoizedState !== null;
        var y = a !== null && a.memoizedState !== null,
          N = _a,
          C = Vt;
        if (((_a = N || n), (Vt = C || y), he(e, t), (Vt = C), (_a = N), ve(t), l & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = n ? e._visibility & -2 : e._visibility | 1,
              n && (a === null || y || _a || Vt || Al(t)),
              a = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (a === null) {
                y = a = e;
                try {
                  if (((i = y.stateNode), n))
                    ((f = i.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    v = y.stateNode;
                    var D = y.memoizedProps.style,
                      z = D != null && D.hasOwnProperty('display') ? D.display : null;
                    v.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (Y) {
                  St(y, y.return, Y);
                }
              }
            } else if (e.tag === 6) {
              if (a === null) {
                y = e;
                try {
                  y.stateNode.nodeValue = n ? '' : y.memoizedProps;
                } catch (Y) {
                  St(y, y.return, Y);
                }
              }
            } else if (e.tag === 18) {
              if (a === null) {
                y = e;
                try {
                  var M = y.stateNode;
                  n ? Wm(M, !0) : Wm(y.stateNode, !1);
                } catch (Y) {
                  St(y, y.return, Y);
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
        l & 4 &&
          ((l = t.updateQueue),
          l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), Dc(t, a))));
        break;
      case 19:
        (he(e, t),
          ve(t),
          l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Dc(t, l))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (he(e, t), ve(t));
    }
  }
  function ve(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var a, l = t.return; l !== null; ) {
          if (Id(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var n = a.stateNode,
              i = lo(t);
            Rc(t, i, n);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && (Zl(f, ''), (a.flags &= -33));
            var v = lo(t);
            Rc(t, v, f);
            break;
          case 3:
          case 4:
            var y = a.stateNode.containerInfo,
              N = lo(t);
            no(t, N, y);
            break;
          default:
            throw Error(o(161));
        }
      } catch (C) {
        St(t, t.return, C);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function sm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (sm(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function ya(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (em(t, e.alternate, e), (e = e.sibling));
  }
  function Al(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Ya(4, e, e.return), Al(e));
          break;
        case 1:
          aa(e, e.return);
          var a = e.stateNode;
          (typeof a.componentWillUnmount == 'function' && Wd(e, e.return, a), Al(e));
          break;
        case 27:
          _i(e.stateNode);
        case 26:
        case 5:
          (aa(e, e.return), Al(e));
          break;
        case 22:
          e.memoizedState === null && Al(e);
          break;
        case 30:
          Al(e);
          break;
        default:
          Al(e);
      }
      t = t.sibling;
    }
  }
  function ba(t, e, a) {
    for (a = a && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var l = e.alternate,
        n = t,
        i = e,
        f = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (ba(n, i, a), si(4, i));
          break;
        case 1:
          if ((ba(n, i, a), (l = i), (n = l.stateNode), typeof n.componentDidMount == 'function'))
            try {
              n.componentDidMount();
            } catch (N) {
              St(l, l.return, N);
            }
          if (((l = i), (n = l.updateQueue), n !== null)) {
            var v = l.stateNode;
            try {
              var y = n.shared.hiddenCallbacks;
              if (y !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < y.length; n++) qf(y[n], v);
            } catch (N) {
              St(l, l.return, N);
            }
          }
          (a && f & 64 && Jd(i), ui(i, i.return));
          break;
        case 27:
          Pd(i);
        case 26:
        case 5:
          (ba(n, i, a), a && l === null && f & 4 && Fd(i), ui(i, i.return));
          break;
        case 12:
          ba(n, i, a);
          break;
        case 31:
          (ba(n, i, a), a && f & 4 && nm(n, i));
          break;
        case 13:
          (ba(n, i, a), a && f & 4 && im(n, i));
          break;
        case 22:
          (i.memoizedState === null && ba(n, i, a), ui(i, i.return));
          break;
        case 30:
          break;
        default:
          ba(n, i, a);
      }
      e = e.sibling;
    }
  }
  function co(t, e) {
    var a = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (a = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== a && (t != null && t.refCount++, a != null && Kn(a)));
  }
  function so(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Kn(t)));
  }
  function Qe(t, e, a, l) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (um(t, e, a, l), (e = e.sibling));
  }
  function um(t, e, a, l) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Qe(t, e, a, l), n & 2048 && si(9, e));
        break;
      case 1:
        Qe(t, e, a, l);
        break;
      case 3:
        (Qe(t, e, a, l),
          n & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Kn(t))));
        break;
      case 12:
        if (n & 2048) {
          (Qe(t, e, a, l), (t = e.stateNode));
          try {
            var i = e.memoizedProps,
              f = i.id,
              v = i.onPostCommit;
            typeof v == 'function' &&
              v(f, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (y) {
            St(e, e.return, y);
          }
        } else Qe(t, e, a, l);
        break;
      case 31:
        Qe(t, e, a, l);
        break;
      case 13:
        Qe(t, e, a, l);
        break;
      case 23:
        break;
      case 22:
        ((i = e.stateNode),
          (f = e.alternate),
          e.memoizedState !== null
            ? i._visibility & 2
              ? Qe(t, e, a, l)
              : oi(t, e)
            : i._visibility & 2
              ? Qe(t, e, a, l)
              : ((i._visibility |= 2), fn(t, e, a, l, (e.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && co(f, e));
        break;
      case 24:
        (Qe(t, e, a, l), n & 2048 && so(e.alternate, e));
        break;
      default:
        Qe(t, e, a, l);
    }
  }
  function fn(t, e, a, l, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var i = t,
        f = e,
        v = a,
        y = l,
        N = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (fn(i, f, v, y, n), si(8, f));
          break;
        case 23:
          break;
        case 22:
          var C = f.stateNode;
          (f.memoizedState !== null
            ? C._visibility & 2
              ? fn(i, f, v, y, n)
              : oi(i, f)
            : ((C._visibility |= 2), fn(i, f, v, y, n)),
            n && N & 2048 && co(f.alternate, f));
          break;
        case 24:
          (fn(i, f, v, y, n), n && N & 2048 && so(f.alternate, f));
          break;
        default:
          fn(i, f, v, y, n);
      }
      e = e.sibling;
    }
  }
  function oi(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var a = t,
          l = e,
          n = l.flags;
        switch (l.tag) {
          case 22:
            (oi(a, l), n & 2048 && co(l.alternate, l));
            break;
          case 24:
            (oi(a, l), n & 2048 && so(l.alternate, l));
            break;
          default:
            oi(a, l);
        }
        e = e.sibling;
      }
  }
  var ri = 8192;
  function dn(t, e, a) {
    if (t.subtreeFlags & ri) for (t = t.child; t !== null; ) (om(t, e, a), (t = t.sibling));
  }
  function om(t, e, a) {
    switch (t.tag) {
      case 26:
        (dn(t, e, a),
          t.flags & ri && t.memoizedState !== null && Gv(a, ke, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        dn(t, e, a);
        break;
      case 3:
      case 4:
        var l = ke;
        ((ke = Kc(t.stateNode.containerInfo)), dn(t, e, a), (ke = l));
        break;
      case 22:
        t.memoizedState === null &&
          ((l = t.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = ri), (ri = 16777216), dn(t, e, a), (ri = l))
            : dn(t, e, a));
        break;
      default:
        dn(t, e, a);
    }
  }
  function rm(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function fi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var l = e[a];
          ((Kt = l), dm(l, t));
        }
      rm(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (fm(t), (t = t.sibling));
  }
  function fm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (fi(t), t.flags & 2048 && Ya(9, t, t.return));
        break;
      case 3:
        fi(t);
        break;
      case 12:
        fi(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), Bc(t))
          : fi(t);
        break;
      default:
        fi(t);
    }
  }
  function Bc(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var l = e[a];
          ((Kt = l), dm(l, t));
        }
      rm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (Ya(8, e, e.return), Bc(e));
          break;
        case 22:
          ((a = e.stateNode), a._visibility & 2 && ((a._visibility &= -3), Bc(e)));
          break;
        default:
          Bc(e);
      }
      t = t.sibling;
    }
  }
  function dm(t, e) {
    for (; Kt !== null; ) {
      var a = Kt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ya(8, a, e);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Kn(a.memoizedState.cache);
      }
      if (((l = a.child), l !== null)) ((l.return = a), (Kt = l));
      else
        t: for (a = t; Kt !== null; ) {
          l = Kt;
          var n = l.sibling,
            i = l.return;
          if ((am(l), l === a)) {
            Kt = null;
            break t;
          }
          if (n !== null) {
            ((n.return = i), (Kt = n));
            break t;
          }
          Kt = i;
        }
    }
  }
  var ev = {
      getCacheForType: function (t) {
        var e = Pt(qt),
          a = e.data.get(t);
        return (a === void 0 && ((a = t()), e.data.set(t, a)), a);
      },
      cacheSignal: function () {
        return Pt(qt).controller.signal;
      },
    },
    av = typeof WeakMap == 'function' ? WeakMap : Map,
    gt = 0,
    Nt = null,
    it = null,
    st = 0,
    bt = 0,
    Ee = null,
    Za = !1,
    mn = !1,
    uo = !1,
    Sa = 0,
    Rt = 0,
    Xa = 0,
    Nl = 0,
    oo = 0,
    ze = 0,
    hn = 0,
    di = null,
    ge = null,
    ro = !1,
    Lc = 0,
    mm = 0,
    Hc = 1 / 0,
    qc = null,
    ka = null,
    Zt = 0,
    Qa = null,
    vn = null,
    xa = 0,
    fo = 0,
    mo = null,
    hm = null,
    mi = 0,
    ho = null;
  function Me() {
    return (gt & 2) !== 0 && st !== 0 ? st & -st : w.T !== null ? bo() : Mr();
  }
  function vm() {
    if (ze === 0)
      if ((st & 536870912) === 0 || rt) {
        var t = ki;
        ((ki <<= 1), (ki & 3932160) === 0 && (ki = 262144), (ze = t));
      } else ze = 536870912;
    return ((t = Ae.current), t !== null && (t.flags |= 32), ze);
  }
  function _e(t, e, a) {
    (((t === Nt && (bt === 2 || bt === 9)) || t.cancelPendingCommit !== null) &&
      (gn(t, 0), Ka(t, st, ze, !1)),
      Dn(t, a),
      ((gt & 2) === 0 || t !== Nt) &&
        (t === Nt && ((gt & 2) === 0 && (Nl |= a), Rt === 4 && Ka(t, st, ze, !1)), la(t)));
  }
  function gm(t, e, a) {
    if ((gt & 6) !== 0) throw Error(o(327));
    var l = (!a && (e & 127) === 0 && (e & t.expiredLanes) === 0) || Rn(t, e),
      n = l ? iv(t, e) : go(t, e, !0),
      i = l;
    do {
      if (n === 0) {
        mn && !l && Ka(t, e, 0, !1);
        break;
      } else {
        if (((a = t.current.alternate), i && !lv(a))) {
          ((n = go(t, e, !1)), (i = !1));
          continue;
        }
        if (n === 2) {
          if (((i = e), t.errorRecoveryDisabledLanes & i)) var f = 0;
          else
            ((f = t.pendingLanes & -536870913), (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            e = f;
            t: {
              var v = t;
              n = di;
              var y = v.current.memoizedState.isDehydrated;
              if ((y && (gn(v, f).flags |= 256), (f = go(v, f, !1)), f !== 2)) {
                if (uo && !y) {
                  ((v.errorRecoveryDisabledLanes |= i), (Nl |= i), (n = 4));
                  break t;
                }
                ((i = ge), (ge = n), i !== null && (ge === null ? (ge = i) : ge.push.apply(ge, i)));
              }
              n = f;
            }
            if (((i = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          (gn(t, 0), Ka(t, e, 0, !0));
          break;
        }
        t: {
          switch (((l = t), (i = n), i)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Ka(l, e, ze, !Za);
              break t;
            case 2:
              ge = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && ((n = Lc + 300 - be()), 10 < n)) {
            if ((Ka(l, e, ze, !Za), Ki(l, 0, !0) !== 0)) break t;
            ((xa = e),
              (l.timeoutHandle = Qm(
                _m.bind(null, l, a, ge, qc, ro, e, ze, Nl, hn, Za, i, 'Throttled', -0, 0),
                n
              )));
            break t;
          }
          _m(l, a, ge, qc, ro, e, ze, Nl, hn, Za, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    la(t);
  }
  function _m(t, e, a, l, n, i, f, v, y, N, C, D, z, M) {
    if (((t.timeoutHandle = -1), (D = e.subtreeFlags), D & 8192 || (D & 16785408) === 16785408)) {
      ((D = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: sa,
      }),
        om(e, i, D));
      var Y = (i & 62914560) === i ? Lc - be() : (i & 4194048) === i ? mm - be() : 0;
      if (((Y = Vv(D, Y)), Y !== null)) {
        ((xa = i),
          (t.cancelPendingCommit = Y(Am.bind(null, t, e, i, a, l, n, f, v, y, C, D, null, z, M))),
          Ka(t, i, f, !N));
        return;
      }
    }
    Am(t, e, i, a, l, n, f, v, y);
  }
  function lv(t) {
    for (var e = t; ; ) {
      var a = e.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        e.flags & 16384 &&
        ((a = e.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var l = 0; l < a.length; l++) {
          var n = a[l],
            i = n.getSnapshot;
          n = n.value;
          try {
            if (!je(i(), n)) return !1;
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
  function Ka(t, e, a, l) {
    ((e &= ~oo),
      (e &= ~Nl),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      l && (t.warmLanes |= e),
      (l = t.expirationTimes));
    for (var n = e; 0 < n; ) {
      var i = 31 - xe(n),
        f = 1 << i;
      ((l[i] = -1), (n &= ~f));
    }
    a !== 0 && Nr(t, a, e);
  }
  function Uc() {
    return (gt & 6) === 0 ? (hi(0), !1) : !0;
  }
  function vo() {
    if (it !== null) {
      if (bt === 0) var t = it.return;
      else ((t = it), (fa = _l = null), Cu(t), (cn = null), (Wn = 0), (t = it));
      for (; t !== null; ) (Kd(t.alternate, t), (t = t.return));
      it = null;
    }
  }
  function gn(t, e) {
    var a = t.timeoutHandle;
    (a !== -1 && ((t.timeoutHandle = -1), jv(a)),
      (a = t.cancelPendingCommit),
      a !== null && ((t.cancelPendingCommit = null), a()),
      (xa = 0),
      vo(),
      (Nt = t),
      (it = a = oa(t.current, null)),
      (st = e),
      (bt = 0),
      (Ee = null),
      (Za = !1),
      (mn = Rn(t, e)),
      (uo = !1),
      (hn = ze = oo = Nl = Xa = Rt = 0),
      (ge = di = null),
      (ro = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var n = 31 - xe(l),
          i = 1 << n;
        ((e |= t[n]), (l &= ~i));
      }
    return ((Sa = e), cc(), a);
  }
  function pm(t, e) {
    ((et = null),
      (w.H = ni),
      e === nn || e === hc
        ? ((e = Df()), (bt = 3))
        : e === pu
          ? ((e = Df()), (bt = 4))
          : (bt =
              e === ku
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (Ee = e),
      it === null && ((Rt = 1), zc(t, Be(e, t.current))));
  }
  function ym() {
    var t = Ae.current;
    return t === null
      ? !0
      : (st & 4194048) === st
        ? Ue === null
        : (st & 62914560) === st || (st & 536870912) !== 0
          ? t === Ue
          : !1;
  }
  function bm() {
    var t = w.H;
    return ((w.H = ni), t === null ? ni : t);
  }
  function Sm() {
    var t = w.A;
    return ((w.A = ev), t);
  }
  function Gc() {
    ((Rt = 4),
      Za || ((st & 4194048) !== st && Ae.current !== null) || (mn = !0),
      ((Xa & 134217727) === 0 && (Nl & 134217727) === 0) || Nt === null || Ka(Nt, st, ze, !1));
  }
  function go(t, e, a) {
    var l = gt;
    gt |= 2;
    var n = bm(),
      i = Sm();
    ((Nt !== t || st !== e) && ((qc = null), gn(t, e)), (e = !1));
    var f = Rt;
    t: do
      try {
        if (bt !== 0 && it !== null) {
          var v = it,
            y = Ee;
          switch (bt) {
            case 8:
              (vo(), (f = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ae.current === null && (e = !0);
              var N = bt;
              if (((bt = 0), (Ee = null), _n(t, v, y, N), a && mn)) {
                f = 0;
                break t;
              }
              break;
            default:
              ((N = bt), (bt = 0), (Ee = null), _n(t, v, y, N));
          }
        }
        (nv(), (f = Rt));
        break;
      } catch (C) {
        pm(t, C);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (fa = _l = null),
      (gt = l),
      (w.H = n),
      (w.A = i),
      it === null && ((Nt = null), (st = 0), cc()),
      f
    );
  }
  function nv() {
    for (; it !== null; ) xm(it);
  }
  function iv(t, e) {
    var a = gt;
    gt |= 2;
    var l = bm(),
      n = Sm();
    Nt !== t || st !== e ? ((qc = null), (Hc = be() + 500), gn(t, e)) : (mn = Rn(t, e));
    t: do
      try {
        if (bt !== 0 && it !== null) {
          e = it;
          var i = Ee;
          e: switch (bt) {
            case 1:
              ((bt = 0), (Ee = null), _n(t, e, i, 1));
              break;
            case 2:
            case 9:
              if (Of(i)) {
                ((bt = 0), (Ee = null), jm(e));
                break;
              }
              ((e = function () {
                ((bt !== 2 && bt !== 9) || Nt !== t || (bt = 7), la(t));
              }),
                i.then(e, e));
              break t;
            case 3:
              bt = 7;
              break t;
            case 4:
              bt = 5;
              break t;
            case 7:
              Of(i) ? ((bt = 0), (Ee = null), jm(e)) : ((bt = 0), (Ee = null), _n(t, e, i, 7));
              break;
            case 5:
              var f = null;
              switch (it.tag) {
                case 26:
                  f = it.memoizedState;
                case 5:
                case 27:
                  var v = it;
                  if (f ? uh(f) : v.stateNode.complete) {
                    ((bt = 0), (Ee = null));
                    var y = v.sibling;
                    if (y !== null) it = y;
                    else {
                      var N = v.return;
                      N !== null ? ((it = N), Vc(N)) : (it = null);
                    }
                    break e;
                  }
              }
              ((bt = 0), (Ee = null), _n(t, e, i, 5));
              break;
            case 6:
              ((bt = 0), (Ee = null), _n(t, e, i, 6));
              break;
            case 8:
              (vo(), (Rt = 6));
              break t;
            default:
              throw Error(o(462));
          }
        }
        cv();
        break;
      } catch (C) {
        pm(t, C);
      }
    while (!0);
    return (
      (fa = _l = null),
      (w.H = l),
      (w.A = n),
      (gt = a),
      it !== null ? 0 : ((Nt = null), (st = 0), cc(), Rt)
    );
  }
  function cv() {
    for (; it !== null && !M0(); ) xm(it);
  }
  function xm(t) {
    var e = kd(t.alternate, t, Sa);
    ((t.memoizedProps = t.pendingProps), e === null ? Vc(t) : (it = e));
  }
  function jm(t) {
    var e = t,
      a = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Gd(a, e, e.pendingProps, e.type, void 0, st);
        break;
      case 11:
        e = Gd(a, e, e.pendingProps, e.type.render, e.ref, st);
        break;
      case 5:
        Cu(e);
      default:
        (Kd(a, e), (e = it = Sf(e, Sa)), (e = kd(a, e, Sa)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? Vc(t) : (it = e));
  }
  function _n(t, e, a, l) {
    ((fa = _l = null), Cu(e), (cn = null), (Wn = 0));
    var n = e.return;
    try {
      if (K1(t, n, e, a, st)) {
        ((Rt = 1), zc(t, Be(a, t.current)), (it = null));
        return;
      }
    } catch (i) {
      if (n !== null) throw ((it = n), i);
      ((Rt = 1), zc(t, Be(a, t.current)), (it = null));
      return;
    }
    e.flags & 32768
      ? (rt || l === 1
          ? (t = !0)
          : mn || (st & 536870912) !== 0
            ? (t = !1)
            : ((Za = t = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = Ae.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
        Tm(e, t))
      : Vc(e);
  }
  function Vc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Tm(e, Za);
        return;
      }
      t = e.return;
      var a = F1(e.alternate, e, Sa);
      if (a !== null) {
        it = a;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        it = e;
        return;
      }
      it = e = t;
    } while (e !== null);
    Rt === 0 && (Rt = 5);
  }
  function Tm(t, e) {
    do {
      var a = I1(t.alternate, t);
      if (a !== null) {
        ((a.flags &= 32767), (it = a));
        return;
      }
      if (
        ((a = t.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        it = t;
        return;
      }
      it = t = a;
    } while (t !== null);
    ((Rt = 6), (it = null));
  }
  function Am(t, e, a, l, n, i, f, v, y) {
    t.cancelPendingCommit = null;
    do $c();
    while (Zt !== 0);
    if ((gt & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (
        ((i = e.lanes | e.childLanes),
        (i |= lu),
        U0(t, a, i, f, v, y),
        t === Nt && ((it = Nt = null), (st = 0)),
        (vn = e),
        (Qa = t),
        (xa = a),
        (fo = i),
        (mo = n),
        (hm = l),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            rv(Zi, function () {
              return (Cm(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (l = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = w.T), (w.T = null), (n = G.p), (G.p = 2), (f = gt), (gt |= 4));
        try {
          P1(t, e, a);
        } finally {
          ((gt = f), (G.p = n), (w.T = l));
        }
      }
      ((Zt = 1), Nm(), Em(), zm());
    }
  }
  function Nm() {
    if (Zt === 1) {
      Zt = 0;
      var t = Qa,
        e = vn,
        a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        ((a = w.T), (w.T = null));
        var l = G.p;
        G.p = 2;
        var n = gt;
        gt |= 4;
        try {
          cm(e, t);
          var i = zo,
            f = df(t.containerInfo),
            v = i.focusedElem,
            y = i.selectionRange;
          if (f !== v && v && v.ownerDocument && ff(v.ownerDocument.documentElement, v)) {
            if (y !== null && Is(v)) {
              var N = y.start,
                C = y.end;
              if ((C === void 0 && (C = N), 'selectionStart' in v))
                ((v.selectionStart = N), (v.selectionEnd = Math.min(C, v.value.length)));
              else {
                var D = v.ownerDocument || document,
                  z = (D && D.defaultView) || window;
                if (z.getSelection) {
                  var M = z.getSelection(),
                    Y = v.textContent.length,
                    J = Math.min(y.start, Y),
                    Tt = y.end === void 0 ? J : Math.min(y.end, Y);
                  !M.extend && J > Tt && ((f = Tt), (Tt = J), (J = f));
                  var T = rf(v, J),
                    S = rf(v, Tt);
                  if (
                    T &&
                    S &&
                    (M.rangeCount !== 1 ||
                      M.anchorNode !== T.node ||
                      M.anchorOffset !== T.offset ||
                      M.focusNode !== S.node ||
                      M.focusOffset !== S.offset)
                  ) {
                    var A = D.createRange();
                    (A.setStart(T.node, T.offset),
                      M.removeAllRanges(),
                      J > Tt
                        ? (M.addRange(A), M.extend(S.node, S.offset))
                        : (A.setEnd(S.node, S.offset), M.addRange(A)));
                  }
                }
              }
            }
            for (D = [], M = v; (M = M.parentNode); )
              M.nodeType === 1 && D.push({ element: M, left: M.scrollLeft, top: M.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < D.length; v++) {
              var R = D[v];
              ((R.element.scrollLeft = R.left), (R.element.scrollTop = R.top));
            }
          }
          ((ts = !!Eo), (zo = Eo = null));
        } finally {
          ((gt = n), (G.p = l), (w.T = a));
        }
      }
      ((t.current = e), (Zt = 2));
    }
  }
  function Em() {
    if (Zt === 2) {
      Zt = 0;
      var t = Qa,
        e = vn,
        a = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || a) {
        ((a = w.T), (w.T = null));
        var l = G.p;
        G.p = 2;
        var n = gt;
        gt |= 4;
        try {
          em(t, e.alternate, e);
        } finally {
          ((gt = n), (G.p = l), (w.T = a));
        }
      }
      Zt = 3;
    }
  }
  function zm() {
    if (Zt === 4 || Zt === 3) {
      ((Zt = 0), C0());
      var t = Qa,
        e = vn,
        a = xa,
        l = hm;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (Zt = 5)
        : ((Zt = 0), (vn = Qa = null), Mm(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (
        (n === 0 && (ka = null),
        Rs(a),
        (e = e.stateNode),
        Se && typeof Se.onCommitFiberRoot == 'function')
      )
        try {
          Se.onCommitFiberRoot(On, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        ((e = w.T), (n = G.p), (G.p = 2), (w.T = null));
        try {
          for (var i = t.onRecoverableError, f = 0; f < l.length; f++) {
            var v = l[f];
            i(v.value, { componentStack: v.stack });
          }
        } finally {
          ((w.T = e), (G.p = n));
        }
      }
      ((xa & 3) !== 0 && $c(),
        la(t),
        (n = t.pendingLanes),
        (a & 261930) !== 0 && (n & 42) !== 0 ? (t === ho ? mi++ : ((mi = 0), (ho = t))) : (mi = 0),
        hi(0));
    }
  }
  function Mm(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Kn(e)));
  }
  function $c() {
    return (Nm(), Em(), zm(), Cm());
  }
  function Cm() {
    if (Zt !== 5) return !1;
    var t = Qa,
      e = fo;
    fo = 0;
    var a = Rs(xa),
      l = w.T,
      n = G.p;
    try {
      ((G.p = 32 > a ? 32 : a), (w.T = null), (a = mo), (mo = null));
      var i = Qa,
        f = xa;
      if (((Zt = 0), (vn = Qa = null), (xa = 0), (gt & 6) !== 0)) throw Error(o(331));
      var v = gt;
      if (
        ((gt |= 4),
        fm(i.current),
        um(i, i.current, f, a),
        (gt = v),
        hi(0, !1),
        Se && typeof Se.onPostCommitFiberRoot == 'function')
      )
        try {
          Se.onPostCommitFiberRoot(On, i);
        } catch {}
      return !0;
    } finally {
      ((G.p = n), (w.T = l), Mm(t, e));
    }
  }
  function wm(t, e, a) {
    ((e = Be(a, e)),
      (e = Xu(t.stateNode, e, 2)),
      (t = Ga(t, e, 2)),
      t !== null && (Dn(t, 2), la(t)));
  }
  function St(t, e, a) {
    if (t.tag === 3) wm(t, t, a);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          wm(e, t, a);
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof l.componentDidCatch == 'function' && (ka === null || !ka.has(l)))
          ) {
            ((t = Be(a, t)),
              (a = Od(2)),
              (l = Ga(e, a, 2)),
              l !== null && (Rd(a, l, e, t), Dn(l, 2), la(l)));
            break;
          }
        }
        e = e.return;
      }
  }
  function _o(t, e, a) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new av();
      var n = new Set();
      l.set(e, n);
    } else ((n = l.get(e)), n === void 0 && ((n = new Set()), l.set(e, n)));
    n.has(a) || ((uo = !0), n.add(a), (t = sv.bind(null, t, e, a)), e.then(t, t));
  }
  function sv(t, e, a) {
    var l = t.pingCache;
    (l !== null && l.delete(e),
      (t.pingedLanes |= t.suspendedLanes & a),
      (t.warmLanes &= ~a),
      Nt === t &&
        (st & a) === a &&
        (Rt === 4 || (Rt === 3 && (st & 62914560) === st && 300 > be() - Lc)
          ? (gt & 2) === 0 && gn(t, 0)
          : (oo |= a),
        hn === st && (hn = 0)),
      la(t));
  }
  function Om(t, e) {
    (e === 0 && (e = Ar()), (t = hl(t, e)), t !== null && (Dn(t, e), la(t)));
  }
  function uv(t) {
    var e = t.memoizedState,
      a = 0;
    (e !== null && (a = e.retryLane), Om(t, a));
  }
  function ov(t, e) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var l = t.stateNode,
          n = t.memoizedState;
        n !== null && (a = n.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (l !== null && l.delete(e), Om(t, a));
  }
  function rv(t, e) {
    return Ms(t, e);
  }
  var Yc = null,
    pn = null,
    po = !1,
    Zc = !1,
    yo = !1,
    Ja = 0;
  function la(t) {
    (t !== pn && t.next === null && (pn === null ? (Yc = pn = t) : (pn = pn.next = t)),
      (Zc = !0),
      po || ((po = !0), dv()));
  }
  function hi(t, e) {
    if (!yo && Zc) {
      yo = !0;
      do
        for (var a = !1, l = Yc; l !== null; ) {
          if (t !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var i = 0;
            else {
              var f = l.suspendedLanes,
                v = l.pingedLanes;
              ((i = (1 << (31 - xe(42 | t) + 1)) - 1),
                (i &= n & ~(f & ~v)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((a = !0), Lm(l, i));
          } else
            ((i = st),
              (i = Ki(
                l,
                l === Nt ? i : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1
              )),
              (i & 3) === 0 || Rn(l, i) || ((a = !0), Lm(l, i)));
          l = l.next;
        }
      while (a);
      yo = !1;
    }
  }
  function fv() {
    Rm();
  }
  function Rm() {
    Zc = po = !1;
    var t = 0;
    Ja !== 0 && xv() && (t = Ja);
    for (var e = be(), a = null, l = Yc; l !== null; ) {
      var n = l.next,
        i = Dm(l, e);
      (i === 0
        ? ((l.next = null), a === null ? (Yc = n) : (a.next = n), n === null && (pn = a))
        : ((a = l), (t !== 0 || (i & 3) !== 0) && (Zc = !0)),
        (l = n));
    }
    ((Zt !== 0 && Zt !== 5) || hi(t), Ja !== 0 && (Ja = 0));
  }
  function Dm(t, e) {
    for (
      var a = t.suspendedLanes,
        l = t.pingedLanes,
        n = t.expirationTimes,
        i = t.pendingLanes & -62914561;
      0 < i;
    ) {
      var f = 31 - xe(i),
        v = 1 << f,
        y = n[f];
      (y === -1
        ? ((v & a) === 0 || (v & l) !== 0) && (n[f] = q0(v, e))
        : y <= e && (t.expiredLanes |= v),
        (i &= ~v));
    }
    if (
      ((e = Nt),
      (a = st),
      (a = Ki(t, t === e ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (l = t.callbackNode),
      a === 0 || (t === e && (bt === 2 || bt === 9)) || t.cancelPendingCommit !== null)
    )
      return (l !== null && l !== null && Cs(l), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((a & 3) === 0 || Rn(t, a)) {
      if (((e = a & -a), e === t.callbackPriority)) return e;
      switch ((l !== null && Cs(l), Rs(a))) {
        case 2:
        case 8:
          a = jr;
          break;
        case 32:
          a = Zi;
          break;
        case 268435456:
          a = Tr;
          break;
        default:
          a = Zi;
      }
      return (
        (l = Bm.bind(null, t)),
        (a = Ms(a, l)),
        (t.callbackPriority = e),
        (t.callbackNode = a),
        e
      );
    }
    return (
      l !== null && l !== null && Cs(l),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Bm(t, e) {
    if (Zt !== 0 && Zt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var a = t.callbackNode;
    if ($c() && t.callbackNode !== a) return null;
    var l = st;
    return (
      (l = Ki(t, t === Nt ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      l === 0
        ? null
        : (gm(t, l, e),
          Dm(t, be()),
          t.callbackNode != null && t.callbackNode === a ? Bm.bind(null, t) : null)
    );
  }
  function Lm(t, e) {
    if ($c()) return null;
    gm(t, e, !0);
  }
  function dv() {
    Tv(function () {
      (gt & 6) !== 0 ? Ms(xr, fv) : Rm();
    });
  }
  function bo() {
    if (Ja === 0) {
      var t = an;
      (t === 0 && ((t = Xi), (Xi <<= 1), (Xi & 261888) === 0 && (Xi = 256)), (Ja = t));
    }
    return Ja;
  }
  function Hm(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : Ii('' + t);
  }
  function qm(t, e) {
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
  function mv(t, e, a, l, n) {
    if (e === 'submit' && a && a.stateNode === n) {
      var i = Hm((n[fe] || null).action),
        f = l.submitter;
      f &&
        ((e = (e = f[fe] || null) ? Hm(e.formAction) : f.getAttribute('formAction')),
        e !== null && ((i = e), (f = null)));
      var v = new ac('action', 'action', null, l, n);
      t.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Ja !== 0) {
                  var y = f ? qm(n, f) : new FormData(n);
                  Uu(a, { pending: !0, data: y, method: n.method, action: i }, null, y);
                }
              } else
                typeof i == 'function' &&
                  (v.preventDefault(),
                  (y = f ? qm(n, f) : new FormData(n)),
                  Uu(a, { pending: !0, data: y, method: n.method, action: i }, i, y));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var So = 0; So < au.length; So++) {
    var xo = au[So],
      hv = xo.toLowerCase(),
      vv = xo[0].toUpperCase() + xo.slice(1);
    Xe(hv, 'on' + vv);
  }
  (Xe(vf, 'onAnimationEnd'),
    Xe(gf, 'onAnimationIteration'),
    Xe(_f, 'onAnimationStart'),
    Xe('dblclick', 'onDoubleClick'),
    Xe('focusin', 'onFocus'),
    Xe('focusout', 'onBlur'),
    Xe(w1, 'onTransitionRun'),
    Xe(O1, 'onTransitionStart'),
    Xe(R1, 'onTransitionCancel'),
    Xe(pf, 'onTransitionEnd'),
    $l('onMouseEnter', ['mouseout', 'mouseover']),
    $l('onMouseLeave', ['mouseout', 'mouseover']),
    $l('onPointerEnter', ['pointerout', 'pointerover']),
    $l('onPointerLeave', ['pointerout', 'pointerover']),
    rl('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    rl(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    rl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    rl('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    rl(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    rl(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var vi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    gv = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(vi)
    );
  function Um(t, e) {
    e = (e & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var l = t[a],
        n = l.event;
      l = l.listeners;
      t: {
        var i = void 0;
        if (e)
          for (var f = l.length - 1; 0 <= f; f--) {
            var v = l[f],
              y = v.instance,
              N = v.currentTarget;
            if (((v = v.listener), y !== i && n.isPropagationStopped())) break t;
            ((i = v), (n.currentTarget = N));
            try {
              i(n);
            } catch (C) {
              ic(C);
            }
            ((n.currentTarget = null), (i = y));
          }
        else
          for (f = 0; f < l.length; f++) {
            if (
              ((v = l[f]),
              (y = v.instance),
              (N = v.currentTarget),
              (v = v.listener),
              y !== i && n.isPropagationStopped())
            )
              break t;
            ((i = v), (n.currentTarget = N));
            try {
              i(n);
            } catch (C) {
              ic(C);
            }
            ((n.currentTarget = null), (i = y));
          }
      }
    }
  }
  function ct(t, e) {
    var a = e[Ds];
    a === void 0 && (a = e[Ds] = new Set());
    var l = t + '__bubble';
    a.has(l) || (Gm(e, t, 2, !1), a.add(l));
  }
  function jo(t, e, a) {
    var l = 0;
    (e && (l |= 4), Gm(a, t, l, e));
  }
  var Xc = '_reactListening' + Math.random().toString(36).slice(2);
  function To(t) {
    if (!t[Xc]) {
      ((t[Xc] = !0),
        Or.forEach(function (a) {
          a !== 'selectionchange' && (gv.has(a) || jo(a, !1, t), jo(a, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Xc] || ((e[Xc] = !0), jo('selectionchange', !1, e));
    }
  }
  function Gm(t, e, a, l) {
    switch (vh(e)) {
      case 2:
        var n = Zv;
        break;
      case 8:
        n = Xv;
        break;
      default:
        n = Uo;
    }
    ((a = n.bind(null, e, a, t)),
      (n = void 0),
      !Ys || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (n = !0),
      l
        ? n !== void 0
          ? t.addEventListener(e, a, { capture: !0, passive: n })
          : t.addEventListener(e, a, !0)
        : n !== void 0
          ? t.addEventListener(e, a, { passive: n })
          : t.addEventListener(e, a, !1));
  }
  function Ao(t, e, a, l, n) {
    var i = l;
    if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
      t: for (;;) {
        if (l === null) return;
        var f = l.tag;
        if (f === 3 || f === 4) {
          var v = l.stateNode.containerInfo;
          if (v === n) break;
          if (f === 4)
            for (f = l.return; f !== null; ) {
              var y = f.tag;
              if ((y === 3 || y === 4) && f.stateNode.containerInfo === n) return;
              f = f.return;
            }
          for (; v !== null; ) {
            if (((f = Ul(v)), f === null)) return;
            if (((y = f.tag), y === 5 || y === 6 || y === 26 || y === 27)) {
              l = i = f;
              continue t;
            }
            v = v.parentNode;
          }
        }
        l = l.return;
      }
    Zr(function () {
      var N = i,
        C = Vs(a),
        D = [];
      t: {
        var z = yf.get(t);
        if (z !== void 0) {
          var M = ac,
            Y = t;
          switch (t) {
            case 'keypress':
              if (tc(a) === 0) break t;
            case 'keydown':
            case 'keyup':
              M = o1;
              break;
            case 'focusin':
              ((Y = 'focus'), (M = Qs));
              break;
            case 'focusout':
              ((Y = 'blur'), (M = Qs));
              break;
            case 'beforeblur':
            case 'afterblur':
              M = Qs;
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
              M = Qr;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              M = F0;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              M = d1;
              break;
            case vf:
            case gf:
            case _f:
              M = t1;
              break;
            case pf:
              M = h1;
              break;
            case 'scroll':
            case 'scrollend':
              M = J0;
              break;
            case 'wheel':
              M = g1;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              M = a1;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              M = Jr;
              break;
            case 'toggle':
            case 'beforetoggle':
              M = p1;
          }
          var J = (e & 4) !== 0,
            Tt = !J && (t === 'scroll' || t === 'scrollend'),
            T = J ? (z !== null ? z + 'Capture' : null) : z;
          J = [];
          for (var S = N, A; S !== null; ) {
            var R = S;
            if (
              ((A = R.stateNode),
              (R = R.tag),
              (R !== 5 && R !== 26 && R !== 27) ||
                A === null ||
                T === null ||
                ((R = Hn(S, T)), R != null && J.push(gi(S, R, A))),
              Tt)
            )
              break;
            S = S.return;
          }
          0 < J.length && ((z = new M(z, Y, null, a, C)), D.push({ event: z, listeners: J }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((z = t === 'mouseover' || t === 'pointerover'),
            (M = t === 'mouseout' || t === 'pointerout'),
            z && a !== Gs && (Y = a.relatedTarget || a.fromElement) && (Ul(Y) || Y[ql]))
          )
            break t;
          if (
            (M || z) &&
            ((z =
              C.window === C
                ? C
                : (z = C.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            M
              ? ((Y = a.relatedTarget || a.toElement),
                (M = N),
                (Y = Y ? Ul(Y) : null),
                Y !== null &&
                  ((Tt = d(Y)), (J = Y.tag), Y !== Tt || (J !== 5 && J !== 27 && J !== 6)) &&
                  (Y = null))
              : ((M = null), (Y = N)),
            M !== Y)
          ) {
            if (
              ((J = Qr),
              (R = 'onMouseLeave'),
              (T = 'onMouseEnter'),
              (S = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((J = Jr), (R = 'onPointerLeave'), (T = 'onPointerEnter'), (S = 'pointer')),
              (Tt = M == null ? z : Ln(M)),
              (A = Y == null ? z : Ln(Y)),
              (z = new J(R, S + 'leave', M, a, C)),
              (z.target = Tt),
              (z.relatedTarget = A),
              (R = null),
              Ul(C) === N &&
                ((J = new J(T, S + 'enter', Y, a, C)),
                (J.target = A),
                (J.relatedTarget = Tt),
                (R = J)),
              (Tt = R),
              M && Y)
            )
              e: {
                for (J = _v, T = M, S = Y, A = 0, R = T; R; R = J(R)) A++;
                R = 0;
                for (var K = S; K; K = J(K)) R++;
                for (; 0 < A - R; ) ((T = J(T)), A--);
                for (; 0 < R - A; ) ((S = J(S)), R--);
                for (; A--; ) {
                  if (T === S || (S !== null && T === S.alternate)) {
                    J = T;
                    break e;
                  }
                  ((T = J(T)), (S = J(S)));
                }
                J = null;
              }
            else J = null;
            (M !== null && Vm(D, z, M, J, !1), Y !== null && Tt !== null && Vm(D, Tt, Y, J, !0));
          }
        }
        t: {
          if (
            ((z = N ? Ln(N) : window),
            (M = z.nodeName && z.nodeName.toLowerCase()),
            M === 'select' || (M === 'input' && z.type === 'file'))
          )
            var mt = lf;
          else if (ef(z))
            if (nf) mt = z1;
            else {
              mt = N1;
              var X = A1;
            }
          else
            ((M = z.nodeName),
              !M || M.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? N && Us(N.elementType) && (mt = lf)
                : (mt = E1));
          if (mt && (mt = mt(t, N))) {
            af(D, mt, a, C);
            break t;
          }
          (X && X(t, z, N),
            t === 'focusout' &&
              N &&
              z.type === 'number' &&
              N.memoizedProps.value != null &&
              qs(z, 'number', z.value));
        }
        switch (((X = N ? Ln(N) : window), t)) {
          case 'focusin':
            (ef(X) || X.contentEditable === 'true') && ((Kl = X), (Ps = N), (Xn = null));
            break;
          case 'focusout':
            Xn = Ps = Kl = null;
            break;
          case 'mousedown':
            tu = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((tu = !1), mf(D, a, C));
            break;
          case 'selectionchange':
            if (C1) break;
          case 'keydown':
          case 'keyup':
            mf(D, a, C);
        }
        var at;
        if (Js)
          t: {
            switch (t) {
              case 'compositionstart':
                var ut = 'onCompositionStart';
                break t;
              case 'compositionend':
                ut = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                ut = 'onCompositionUpdate';
                break t;
            }
            ut = void 0;
          }
        else
          Ql
            ? Pr(t, a) && (ut = 'onCompositionEnd')
            : t === 'keydown' && a.keyCode === 229 && (ut = 'onCompositionStart');
        (ut &&
          (Wr &&
            a.locale !== 'ko' &&
            (Ql || ut !== 'onCompositionStart'
              ? ut === 'onCompositionEnd' && Ql && (at = Xr())
              : ((Ra = C), (Zs = 'value' in Ra ? Ra.value : Ra.textContent), (Ql = !0))),
          (X = kc(N, ut)),
          0 < X.length &&
            ((ut = new Kr(ut, t, null, a, C)),
            D.push({ event: ut, listeners: X }),
            at ? (ut.data = at) : ((at = tf(a)), at !== null && (ut.data = at)))),
          (at = b1 ? S1(t, a) : x1(t, a)) &&
            ((ut = kc(N, 'onBeforeInput')),
            0 < ut.length &&
              ((X = new Kr('onBeforeInput', 'beforeinput', null, a, C)),
              D.push({ event: X, listeners: ut }),
              (X.data = at))),
          mv(D, t, N, a, C));
      }
      Um(D, e);
    });
  }
  function gi(t, e, a) {
    return { instance: t, listener: e, currentTarget: a };
  }
  function kc(t, e) {
    for (var a = e + 'Capture', l = []; t !== null; ) {
      var n = t,
        i = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          i === null ||
          ((n = Hn(t, a)),
          n != null && l.unshift(gi(t, n, i)),
          (n = Hn(t, e)),
          n != null && l.push(gi(t, n, i))),
        t.tag === 3)
      )
        return l;
      t = t.return;
    }
    return [];
  }
  function _v(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Vm(t, e, a, l, n) {
    for (var i = e._reactName, f = []; a !== null && a !== l; ) {
      var v = a,
        y = v.alternate,
        N = v.stateNode;
      if (((v = v.tag), y !== null && y === l)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        N === null ||
        ((y = N),
        n
          ? ((N = Hn(a, i)), N != null && f.unshift(gi(a, N, y)))
          : n || ((N = Hn(a, i)), N != null && f.push(gi(a, N, y)))),
        (a = a.return));
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var pv = /\r\n?/g,
    yv = /\u0000|\uFFFD/g;
  function $m(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        pv,
        `
`
      )
      .replace(yv, '');
  }
  function Ym(t, e) {
    return ((e = $m(e)), $m(t) === e);
  }
  function jt(t, e, a, l, n, i) {
    switch (a) {
      case 'children':
        typeof l == 'string'
          ? e === 'body' || (e === 'textarea' && l === '') || Zl(t, l)
          : (typeof l == 'number' || typeof l == 'bigint') && e !== 'body' && Zl(t, '' + l);
        break;
      case 'className':
        Wi(t, 'class', l);
        break;
      case 'tabIndex':
        Wi(t, 'tabindex', l);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Wi(t, a, l);
        break;
      case 'style':
        $r(t, l, i);
        break;
      case 'data':
        if (e !== 'object') {
          Wi(t, 'data', l);
          break;
        }
      case 'src':
      case 'href':
        if (l === '' && (e !== 'a' || a !== 'href')) {
          t.removeAttribute(a);
          break;
        }
        if (l == null || typeof l == 'function' || typeof l == 'symbol' || typeof l == 'boolean') {
          t.removeAttribute(a);
          break;
        }
        ((l = Ii('' + l)), t.setAttribute(a, l));
        break;
      case 'action':
      case 'formAction':
        if (typeof l == 'function') {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == 'function' &&
            (a === 'formAction'
              ? (e !== 'input' && jt(t, e, 'name', n.name, n, null),
                jt(t, e, 'formEncType', n.formEncType, n, null),
                jt(t, e, 'formMethod', n.formMethod, n, null),
                jt(t, e, 'formTarget', n.formTarget, n, null))
              : (jt(t, e, 'encType', n.encType, n, null),
                jt(t, e, 'method', n.method, n, null),
                jt(t, e, 'target', n.target, n, null)));
        if (l == null || typeof l == 'symbol' || typeof l == 'boolean') {
          t.removeAttribute(a);
          break;
        }
        ((l = Ii('' + l)), t.setAttribute(a, l));
        break;
      case 'onClick':
        l != null && (t.onclick = sa);
        break;
      case 'onScroll':
        l != null && ct('scroll', t);
        break;
      case 'onScrollEnd':
        l != null && ct('scrollend', t);
        break;
      case 'dangerouslySetInnerHTML':
        if (l != null) {
          if (typeof l != 'object' || !('__html' in l)) throw Error(o(61));
          if (((a = l.__html), a != null)) {
            if (n.children != null) throw Error(o(60));
            t.innerHTML = a;
          }
        }
        break;
      case 'multiple':
        t.multiple = l && typeof l != 'function' && typeof l != 'symbol';
        break;
      case 'muted':
        t.muted = l && typeof l != 'function' && typeof l != 'symbol';
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
        if (l == null || typeof l == 'function' || typeof l == 'boolean' || typeof l == 'symbol') {
          t.removeAttribute('xlink:href');
          break;
        }
        ((a = Ii('' + l)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        l != null && typeof l != 'function' && typeof l != 'symbol'
          ? t.setAttribute(a, '' + l)
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
        l && typeof l != 'function' && typeof l != 'symbol'
          ? t.setAttribute(a, '')
          : t.removeAttribute(a);
        break;
      case 'capture':
      case 'download':
        l === !0
          ? t.setAttribute(a, '')
          : l !== !1 && l != null && typeof l != 'function' && typeof l != 'symbol'
            ? t.setAttribute(a, l)
            : t.removeAttribute(a);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        l != null && typeof l != 'function' && typeof l != 'symbol' && !isNaN(l) && 1 <= l
          ? t.setAttribute(a, l)
          : t.removeAttribute(a);
        break;
      case 'rowSpan':
      case 'start':
        l == null || typeof l == 'function' || typeof l == 'symbol' || isNaN(l)
          ? t.removeAttribute(a)
          : t.setAttribute(a, l);
        break;
      case 'popover':
        (ct('beforetoggle', t), ct('toggle', t), Ji(t, 'popover', l));
        break;
      case 'xlinkActuate':
        ca(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', l);
        break;
      case 'xlinkArcrole':
        ca(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', l);
        break;
      case 'xlinkRole':
        ca(t, 'http://www.w3.org/1999/xlink', 'xlink:role', l);
        break;
      case 'xlinkShow':
        ca(t, 'http://www.w3.org/1999/xlink', 'xlink:show', l);
        break;
      case 'xlinkTitle':
        ca(t, 'http://www.w3.org/1999/xlink', 'xlink:title', l);
        break;
      case 'xlinkType':
        ca(t, 'http://www.w3.org/1999/xlink', 'xlink:type', l);
        break;
      case 'xmlBase':
        ca(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', l);
        break;
      case 'xmlLang':
        ca(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', l);
        break;
      case 'xmlSpace':
        ca(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', l);
        break;
      case 'is':
        Ji(t, 'is', l);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = Q0.get(a) || a), Ji(t, a, l));
    }
  }
  function No(t, e, a, l, n, i) {
    switch (a) {
      case 'style':
        $r(t, l, i);
        break;
      case 'dangerouslySetInnerHTML':
        if (l != null) {
          if (typeof l != 'object' || !('__html' in l)) throw Error(o(61));
          if (((a = l.__html), a != null)) {
            if (n.children != null) throw Error(o(60));
            t.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof l == 'string'
          ? Zl(t, l)
          : (typeof l == 'number' || typeof l == 'bigint') && Zl(t, '' + l);
        break;
      case 'onScroll':
        l != null && ct('scroll', t);
        break;
      case 'onScrollEnd':
        l != null && ct('scrollend', t);
        break;
      case 'onClick':
        l != null && (t.onclick = sa);
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
        if (!Rr.hasOwnProperty(a))
          t: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((n = a.endsWith('Capture')),
              (e = a.slice(2, n ? a.length - 7 : void 0)),
              (i = t[fe] || null),
              (i = i != null ? i[a] : null),
              typeof i == 'function' && t.removeEventListener(e, i, n),
              typeof l == 'function')
            ) {
              (typeof i != 'function' &&
                i !== null &&
                (a in t ? (t[a] = null) : t.hasAttribute(a) && t.removeAttribute(a)),
                t.addEventListener(e, l, n));
              break t;
            }
            a in t ? (t[a] = l) : l === !0 ? t.setAttribute(a, '') : Ji(t, a, l);
          }
    }
  }
  function ee(t, e, a) {
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
        (ct('error', t), ct('load', t));
        var l = !1,
          n = !1,
          i;
        for (i in a)
          if (a.hasOwnProperty(i)) {
            var f = a[i];
            if (f != null)
              switch (i) {
                case 'src':
                  l = !0;
                  break;
                case 'srcSet':
                  n = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(o(137, e));
                default:
                  jt(t, e, i, f, a, null);
              }
          }
        (n && jt(t, e, 'srcSet', a.srcSet, a, null), l && jt(t, e, 'src', a.src, a, null));
        return;
      case 'input':
        ct('invalid', t);
        var v = (i = f = n = null),
          y = null,
          N = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var C = a[l];
            if (C != null)
              switch (l) {
                case 'name':
                  n = C;
                  break;
                case 'type':
                  f = C;
                  break;
                case 'checked':
                  y = C;
                  break;
                case 'defaultChecked':
                  N = C;
                  break;
                case 'value':
                  i = C;
                  break;
                case 'defaultValue':
                  v = C;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (C != null) throw Error(o(137, e));
                  break;
                default:
                  jt(t, e, l, C, a, null);
              }
          }
        qr(t, i, v, y, N, f, n, !1);
        return;
      case 'select':
        (ct('invalid', t), (l = f = i = null));
        for (n in a)
          if (a.hasOwnProperty(n) && ((v = a[n]), v != null))
            switch (n) {
              case 'value':
                i = v;
                break;
              case 'defaultValue':
                f = v;
                break;
              case 'multiple':
                l = v;
              default:
                jt(t, e, n, v, a, null);
            }
        ((e = i),
          (a = f),
          (t.multiple = !!l),
          e != null ? Yl(t, !!l, e, !1) : a != null && Yl(t, !!l, a, !0));
        return;
      case 'textarea':
        (ct('invalid', t), (i = n = l = null));
        for (f in a)
          if (a.hasOwnProperty(f) && ((v = a[f]), v != null))
            switch (f) {
              case 'value':
                l = v;
                break;
              case 'defaultValue':
                n = v;
                break;
              case 'children':
                i = v;
                break;
              case 'dangerouslySetInnerHTML':
                if (v != null) throw Error(o(91));
                break;
              default:
                jt(t, e, f, v, a, null);
            }
        Gr(t, l, n, i);
        return;
      case 'option':
        for (y in a)
          if (a.hasOwnProperty(y) && ((l = a[y]), l != null))
            switch (y) {
              case 'selected':
                t.selected = l && typeof l != 'function' && typeof l != 'symbol';
                break;
              default:
                jt(t, e, y, l, a, null);
            }
        return;
      case 'dialog':
        (ct('beforetoggle', t), ct('toggle', t), ct('cancel', t), ct('close', t));
        break;
      case 'iframe':
      case 'object':
        ct('load', t);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < vi.length; l++) ct(vi[l], t);
        break;
      case 'image':
        (ct('error', t), ct('load', t));
        break;
      case 'details':
        ct('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (ct('error', t), ct('load', t));
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
          if (a.hasOwnProperty(N) && ((l = a[N]), l != null))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(o(137, e));
              default:
                jt(t, e, N, l, a, null);
            }
        return;
      default:
        if (Us(e)) {
          for (C in a)
            a.hasOwnProperty(C) && ((l = a[C]), l !== void 0 && No(t, e, C, l, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((l = a[v]), l != null && jt(t, e, v, l, a, null));
  }
  function bv(t, e, a, l) {
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
        var n = null,
          i = null,
          f = null,
          v = null,
          y = null,
          N = null,
          C = null;
        for (M in a) {
          var D = a[M];
          if (a.hasOwnProperty(M) && D != null)
            switch (M) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                y = D;
              default:
                l.hasOwnProperty(M) || jt(t, e, M, null, l, D);
            }
        }
        for (var z in l) {
          var M = l[z];
          if (((D = a[z]), l.hasOwnProperty(z) && (M != null || D != null)))
            switch (z) {
              case 'type':
                i = M;
                break;
              case 'name':
                n = M;
                break;
              case 'checked':
                N = M;
                break;
              case 'defaultChecked':
                C = M;
                break;
              case 'value':
                f = M;
                break;
              case 'defaultValue':
                v = M;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (M != null) throw Error(o(137, e));
                break;
              default:
                M !== D && jt(t, e, z, M, l, D);
            }
        }
        Hs(t, f, v, y, N, C, i, n);
        return;
      case 'select':
        M = f = v = z = null;
        for (i in a)
          if (((y = a[i]), a.hasOwnProperty(i) && y != null))
            switch (i) {
              case 'value':
                break;
              case 'multiple':
                M = y;
              default:
                l.hasOwnProperty(i) || jt(t, e, i, null, l, y);
            }
        for (n in l)
          if (((i = l[n]), (y = a[n]), l.hasOwnProperty(n) && (i != null || y != null)))
            switch (n) {
              case 'value':
                z = i;
                break;
              case 'defaultValue':
                v = i;
                break;
              case 'multiple':
                f = i;
              default:
                i !== y && jt(t, e, n, i, l, y);
            }
        ((e = v),
          (a = f),
          (l = M),
          z != null
            ? Yl(t, !!a, z, !1)
            : !!l != !!a && (e != null ? Yl(t, !!a, e, !0) : Yl(t, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        M = z = null;
        for (v in a)
          if (((n = a[v]), a.hasOwnProperty(v) && n != null && !l.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                jt(t, e, v, null, l, n);
            }
        for (f in l)
          if (((n = l[f]), (i = a[f]), l.hasOwnProperty(f) && (n != null || i != null)))
            switch (f) {
              case 'value':
                z = n;
                break;
              case 'defaultValue':
                M = n;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== i && jt(t, e, f, n, l, i);
            }
        Ur(t, z, M);
        return;
      case 'option':
        for (var Y in a)
          if (((z = a[Y]), a.hasOwnProperty(Y) && z != null && !l.hasOwnProperty(Y)))
            switch (Y) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                jt(t, e, Y, null, l, z);
            }
        for (y in l)
          if (((z = l[y]), (M = a[y]), l.hasOwnProperty(y) && z !== M && (z != null || M != null)))
            switch (y) {
              case 'selected':
                t.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                jt(t, e, y, z, l, M);
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
        for (var J in a)
          ((z = a[J]),
            a.hasOwnProperty(J) && z != null && !l.hasOwnProperty(J) && jt(t, e, J, null, l, z));
        for (N in l)
          if (((z = l[N]), (M = a[N]), l.hasOwnProperty(N) && z !== M && (z != null || M != null)))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(o(137, e));
                break;
              default:
                jt(t, e, N, z, l, M);
            }
        return;
      default:
        if (Us(e)) {
          for (var Tt in a)
            ((z = a[Tt]),
              a.hasOwnProperty(Tt) &&
                z !== void 0 &&
                !l.hasOwnProperty(Tt) &&
                No(t, e, Tt, void 0, l, z));
          for (C in l)
            ((z = l[C]),
              (M = a[C]),
              !l.hasOwnProperty(C) ||
                z === M ||
                (z === void 0 && M === void 0) ||
                No(t, e, C, z, l, M));
          return;
        }
    }
    for (var T in a)
      ((z = a[T]),
        a.hasOwnProperty(T) && z != null && !l.hasOwnProperty(T) && jt(t, e, T, null, l, z));
    for (D in l)
      ((z = l[D]),
        (M = a[D]),
        !l.hasOwnProperty(D) || z === M || (z == null && M == null) || jt(t, e, D, z, l, M));
  }
  function Zm(t) {
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
  function Sv() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, a = performance.getEntriesByType('resource'), l = 0;
        l < a.length;
        l++
      ) {
        var n = a[l],
          i = n.transferSize,
          f = n.initiatorType,
          v = n.duration;
        if (i && v && Zm(f)) {
          for (f = 0, v = n.responseEnd, l += 1; l < a.length; l++) {
            var y = a[l],
              N = y.startTime;
            if (N > v) break;
            var C = y.transferSize,
              D = y.initiatorType;
            C && Zm(D) && ((y = y.responseEnd), (f += C * (y < v ? 1 : (v - N) / (y - N))));
          }
          if ((--l, (e += (8 * (i + f)) / (n.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var Eo = null,
    zo = null;
  function Qc(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Xm(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function km(t, e) {
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
  function Mo(t, e) {
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
  var Co = null;
  function xv() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === Co ? !1 : ((Co = t), !0)) : ((Co = null), !1);
  }
  var Qm = typeof setTimeout == 'function' ? setTimeout : void 0,
    jv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Km = typeof Promise == 'function' ? Promise : void 0,
    Tv =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Km < 'u'
          ? function (t) {
              return Km.resolve(null).then(t).catch(Av);
            }
          : Qm;
  function Av(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Wa(t) {
    return t === 'head';
  }
  function Jm(t, e) {
    var a = e,
      l = 0;
    do {
      var n = a.nextSibling;
      if ((t.removeChild(a), n && n.nodeType === 8))
        if (((a = n.data), a === '/$' || a === '/&')) {
          if (l === 0) {
            (t.removeChild(n), xn(e));
            return;
          }
          l--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') l++;
        else if (a === 'html') _i(t.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = t.ownerDocument.head), _i(a));
          for (var i = a.firstChild; i; ) {
            var f = i.nextSibling,
              v = i.nodeName;
            (i[Bn] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(i),
              (i = f));
          }
        } else a === 'body' && _i(t.ownerDocument.body);
      a = n;
    } while (a);
    xn(e);
  }
  function Wm(t, e) {
    var a = t;
    t = 0;
    do {
      var l = a.nextSibling;
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
        l && l.nodeType === 8)
      )
        if (((a = l.data), a === '/$')) {
          if (t === 0) break;
          t--;
        } else (a !== '$' && a !== '$?' && a !== '$~' && a !== '$!') || t++;
      a = l;
    } while (a);
  }
  function wo(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var a = e;
      switch (((e = e.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (wo(a), Bs(a));
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
  function Nv(t, e, a, l) {
    for (; t.nodeType === 1; ) {
      var n = a;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!l && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (l) {
        if (!t[Bn])
          switch (e) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break;
              return t;
            case 'link':
              if (
                ((i = t.getAttribute('rel')),
                i === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break;
              if (
                i !== n.rel ||
                t.getAttribute('href') !== (n.href == null || n.href === '' ? null : n.href) ||
                t.getAttribute('crossorigin') !== (n.crossOrigin == null ? null : n.crossOrigin) ||
                t.getAttribute('title') !== (n.title == null ? null : n.title)
              )
                break;
              return t;
            case 'style':
              if (t.hasAttribute('data-precedence')) break;
              return t;
            case 'script':
              if (
                ((i = t.getAttribute('src')),
                (i !== (n.src == null ? null : n.src) ||
                  t.getAttribute('type') !== (n.type == null ? null : n.type) ||
                  t.getAttribute('crossorigin') !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  i &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === 'input' && t.type === 'hidden') {
        var i = n.name == null ? null : '' + n.name;
        if (n.type === 'hidden' && t.getAttribute('name') === i) return t;
      } else return t;
      if (((t = Ge(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function Ev(t, e, a) {
    if (e === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !a) ||
        ((t = Ge(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Fm(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = Ge(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Oo(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function Ro(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function zv(t, e) {
    var a = t.ownerDocument;
    if (t.data === '$~') t._reactRetry = e;
    else if (t.data !== '$?' || a.readyState !== 'loading') e();
    else {
      var l = function () {
        (e(), a.removeEventListener('DOMContentLoaded', l));
      };
      (a.addEventListener('DOMContentLoaded', l), (t._reactRetry = l));
    }
  }
  function Ge(t) {
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
  var Do = null;
  function Im(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === '/$' || a === '/&') {
          if (e === 0) return Ge(t.nextSibling);
          e--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Pm(t) {
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
  function th(t, e, a) {
    switch (((e = Qc(a)), t)) {
      case 'html':
        if (((t = e.documentElement), !t)) throw Error(o(452));
        return t;
      case 'head':
        if (((t = e.head), !t)) throw Error(o(453));
        return t;
      case 'body':
        if (((t = e.body), !t)) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function _i(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    Bs(t);
  }
  var Ve = new Map(),
    eh = new Set();
  function Kc(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var ja = G.d;
  G.d = { f: Mv, r: Cv, D: wv, C: Ov, L: Rv, m: Dv, X: Lv, S: Bv, M: Hv };
  function Mv() {
    var t = ja.f(),
      e = Uc();
    return t || e;
  }
  function Cv(t) {
    var e = Gl(t);
    e !== null && e.tag === 5 && e.type === 'form' ? pd(e) : ja.r(t);
  }
  var yn = typeof document > 'u' ? null : document;
  function ah(t, e, a) {
    var l = yn;
    if (l && typeof e == 'string' && e) {
      var n = Re(e);
      ((n = 'link[rel="' + t + '"][href="' + n + '"]'),
        typeof a == 'string' && (n += '[crossorigin="' + a + '"]'),
        eh.has(n) ||
          (eh.add(n),
          (t = { rel: t, crossOrigin: a, href: e }),
          l.querySelector(n) === null &&
            ((e = l.createElement('link')), ee(e, 'link', t), Qt(e), l.head.appendChild(e))));
    }
  }
  function wv(t) {
    (ja.D(t), ah('dns-prefetch', t, null));
  }
  function Ov(t, e) {
    (ja.C(t, e), ah('preconnect', t, e));
  }
  function Rv(t, e, a) {
    ja.L(t, e, a);
    var l = yn;
    if (l && t && e) {
      var n = 'link[rel="preload"][as="' + Re(e) + '"]';
      e === 'image' && a && a.imageSrcSet
        ? ((n += '[imagesrcset="' + Re(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (n += '[imagesizes="' + Re(a.imageSizes) + '"]'))
        : (n += '[href="' + Re(t) + '"]');
      var i = n;
      switch (e) {
        case 'style':
          i = bn(t);
          break;
        case 'script':
          i = Sn(t);
      }
      Ve.has(i) ||
        ((t = E(
          { rel: 'preload', href: e === 'image' && a && a.imageSrcSet ? void 0 : t, as: e },
          a
        )),
        Ve.set(i, t),
        l.querySelector(n) !== null ||
          (e === 'style' && l.querySelector(pi(i))) ||
          (e === 'script' && l.querySelector(yi(i))) ||
          ((e = l.createElement('link')), ee(e, 'link', t), Qt(e), l.head.appendChild(e)));
    }
  }
  function Dv(t, e) {
    ja.m(t, e);
    var a = yn;
    if (a && t) {
      var l = e && typeof e.as == 'string' ? e.as : 'script',
        n = 'link[rel="modulepreload"][as="' + Re(l) + '"][href="' + Re(t) + '"]',
        i = n;
      switch (l) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          i = Sn(t);
      }
      if (
        !Ve.has(i) &&
        ((t = E({ rel: 'modulepreload', href: t }, e)), Ve.set(i, t), a.querySelector(n) === null)
      ) {
        switch (l) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(yi(i))) return;
        }
        ((l = a.createElement('link')), ee(l, 'link', t), Qt(l), a.head.appendChild(l));
      }
    }
  }
  function Bv(t, e, a) {
    ja.S(t, e, a);
    var l = yn;
    if (l && t) {
      var n = Vl(l).hoistableStyles,
        i = bn(t);
      e = e || 'default';
      var f = n.get(i);
      if (!f) {
        var v = { loading: 0, preload: null };
        if ((f = l.querySelector(pi(i)))) v.loading = 5;
        else {
          ((t = E({ rel: 'stylesheet', href: t, 'data-precedence': e }, a)),
            (a = Ve.get(i)) && Bo(t, a));
          var y = (f = l.createElement('link'));
          (Qt(y),
            ee(y, 'link', t),
            (y._p = new Promise(function (N, C) {
              ((y.onload = N), (y.onerror = C));
            })),
            y.addEventListener('load', function () {
              v.loading |= 1;
            }),
            y.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            Jc(f, e, l));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: v }), n.set(i, f));
      }
    }
  }
  function Lv(t, e) {
    ja.X(t, e);
    var a = yn;
    if (a && t) {
      var l = Vl(a).hoistableScripts,
        n = Sn(t),
        i = l.get(n);
      i ||
        ((i = a.querySelector(yi(n))),
        i ||
          ((t = E({ src: t, async: !0 }, e)),
          (e = Ve.get(n)) && Lo(t, e),
          (i = a.createElement('script')),
          Qt(i),
          ee(i, 'link', t),
          a.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        l.set(n, i));
    }
  }
  function Hv(t, e) {
    ja.M(t, e);
    var a = yn;
    if (a && t) {
      var l = Vl(a).hoistableScripts,
        n = Sn(t),
        i = l.get(n);
      i ||
        ((i = a.querySelector(yi(n))),
        i ||
          ((t = E({ src: t, async: !0, type: 'module' }, e)),
          (e = Ve.get(n)) && Lo(t, e),
          (i = a.createElement('script')),
          Qt(i),
          ee(i, 'link', t),
          a.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        l.set(n, i));
    }
  }
  function lh(t, e, a, l) {
    var n = (n = nt.current) ? Kc(n) : null;
    if (!n) throw Error(o(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((e = bn(a.href)),
            (a = Vl(n).hoistableStyles),
            (l = a.get(e)),
            l || ((l = { type: 'style', instance: null, count: 0, state: null }), a.set(e, l)),
            l)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          a.rel === 'stylesheet' &&
          typeof a.href == 'string' &&
          typeof a.precedence == 'string'
        ) {
          t = bn(a.href);
          var i = Vl(n).hoistableStyles,
            f = i.get(t);
          if (
            (f ||
              ((n = n.ownerDocument || n),
              (f = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              i.set(t, f),
              (i = n.querySelector(pi(t))) && !i._p && ((f.instance = i), (f.state.loading = 5)),
              Ve.has(t) ||
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
                Ve.set(t, a),
                i || qv(n, t, a, f.state))),
            e && l === null)
          )
            throw Error(o(528, ''));
          return f;
        }
        if (e && l !== null) throw Error(o(529, ''));
        return null;
      case 'script':
        return (
          (e = a.async),
          (a = a.src),
          typeof a == 'string' && e && typeof e != 'function' && typeof e != 'symbol'
            ? ((e = Sn(a)),
              (a = Vl(n).hoistableScripts),
              (l = a.get(e)),
              l || ((l = { type: 'script', instance: null, count: 0, state: null }), a.set(e, l)),
              l)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, t));
    }
  }
  function bn(t) {
    return 'href="' + Re(t) + '"';
  }
  function pi(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function nh(t) {
    return E({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function qv(t, e, a, l) {
    t.querySelector('link[rel="preload"][as="style"][' + e + ']')
      ? (l.loading = 1)
      : ((e = t.createElement('link')),
        (l.preload = e),
        e.addEventListener('load', function () {
          return (l.loading |= 1);
        }),
        e.addEventListener('error', function () {
          return (l.loading |= 2);
        }),
        ee(e, 'link', a),
        Qt(e),
        t.head.appendChild(e));
  }
  function Sn(t) {
    return '[src="' + Re(t) + '"]';
  }
  function yi(t) {
    return 'script[async]' + t;
  }
  function ih(t, e, a) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var l = t.querySelector('style[data-href~="' + Re(a.href) + '"]');
          if (l) return ((e.instance = l), Qt(l), l);
          var n = E({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (t.ownerDocument || t).createElement('style')),
            Qt(l),
            ee(l, 'style', n),
            Jc(l, a.precedence, t),
            (e.instance = l)
          );
        case 'stylesheet':
          n = bn(a.href);
          var i = t.querySelector(pi(n));
          if (i) return ((e.state.loading |= 4), (e.instance = i), Qt(i), i);
          ((l = nh(a)),
            (n = Ve.get(n)) && Bo(l, n),
            (i = (t.ownerDocument || t).createElement('link')),
            Qt(i));
          var f = i;
          return (
            (f._p = new Promise(function (v, y) {
              ((f.onload = v), (f.onerror = y));
            })),
            ee(i, 'link', l),
            (e.state.loading |= 4),
            Jc(i, a.precedence, t),
            (e.instance = i)
          );
        case 'script':
          return (
            (i = Sn(a.src)),
            (n = t.querySelector(yi(i)))
              ? ((e.instance = n), Qt(n), n)
              : ((l = a),
                (n = Ve.get(i)) && ((l = E({}, a)), Lo(l, n)),
                (t = t.ownerDocument || t),
                (n = t.createElement('script')),
                Qt(n),
                ee(n, 'link', l),
                t.head.appendChild(n),
                (e.instance = n))
          );
        case 'void':
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === 'stylesheet' &&
        (e.state.loading & 4) === 0 &&
        ((l = e.instance), (e.state.loading |= 4), Jc(l, a.precedence, t));
    return e.instance;
  }
  function Jc(t, e, a) {
    for (
      var l = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        n = l.length ? l[l.length - 1] : null,
        i = n,
        f = 0;
      f < l.length;
      f++
    ) {
      var v = l[f];
      if (v.dataset.precedence === e) i = v;
      else if (i !== n) break;
    }
    i
      ? i.parentNode.insertBefore(t, i.nextSibling)
      : ((e = a.nodeType === 9 ? a.head : a), e.insertBefore(t, e.firstChild));
  }
  function Bo(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function Lo(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Wc = null;
  function ch(t, e, a) {
    if (Wc === null) {
      var l = new Map(),
        n = (Wc = new Map());
      n.set(a, l);
    } else ((n = Wc), (l = n.get(a)), l || ((l = new Map()), n.set(a, l)));
    if (l.has(t)) return l;
    for (l.set(t, null), a = a.getElementsByTagName(t), n = 0; n < a.length; n++) {
      var i = a[n];
      if (
        !(i[Bn] || i[Ft] || (t === 'link' && i.getAttribute('rel') === 'stylesheet')) &&
        i.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var f = i.getAttribute(e) || '';
        f = t + f;
        var v = l.get(f);
        v ? v.push(i) : l.set(f, [i]);
      }
    }
    return l;
  }
  function sh(t, e, a) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(a, e === 'title' ? t.querySelector('head > title') : null));
  }
  function Uv(t, e, a) {
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
  function uh(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function Gv(t, e, a, l) {
    if (
      a.type === 'stylesheet' &&
      (typeof l.media != 'string' || matchMedia(l.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var n = bn(l.href),
          i = e.querySelector(pi(n));
        if (i) {
          ((e = i._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = Fc.bind(t)), e.then(t, t)),
            (a.state.loading |= 4),
            (a.instance = i),
            Qt(i));
          return;
        }
        ((i = e.ownerDocument || e),
          (l = nh(l)),
          (n = Ve.get(n)) && Bo(l, n),
          (i = i.createElement('link')),
          Qt(i));
        var f = i;
        ((f._p = new Promise(function (v, y) {
          ((f.onload = v), (f.onerror = y));
        })),
          ee(i, 'link', l),
          (a.instance = i));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(a, e),
        (e = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (t.count++,
          (a = Fc.bind(t)),
          e.addEventListener('load', a),
          e.addEventListener('error', a)));
    }
  }
  var Ho = 0;
  function Vv(t, e) {
    return (
      t.stylesheets && t.count === 0 && Pc(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (a) {
            var l = setTimeout(function () {
              if ((t.stylesheets && Pc(t, t.stylesheets), t.unsuspend)) {
                var i = t.unsuspend;
                ((t.unsuspend = null), i());
              }
            }, 6e4 + e);
            0 < t.imgBytes && Ho === 0 && (Ho = 62500 * Sv());
            var n = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && Pc(t, t.stylesheets), t.unsuspend))
                ) {
                  var i = t.unsuspend;
                  ((t.unsuspend = null), i());
                }
              },
              (t.imgBytes > Ho ? 50 : 800) + e
            );
            return (
              (t.unsuspend = a),
              function () {
                ((t.unsuspend = null), clearTimeout(l), clearTimeout(n));
              }
            );
          }
        : null
    );
  }
  function Fc() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Pc(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Ic = null;
  function Pc(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Ic = new Map()), e.forEach($v, t), (Ic = null), Fc.call(t)));
  }
  function $v(t, e) {
    if (!(e.state.loading & 4)) {
      var a = Ic.get(t);
      if (a) var l = a.get(null);
      else {
        ((a = new Map()), Ic.set(t, a));
        for (
          var n = t.querySelectorAll('link[data-precedence],style[data-precedence]'), i = 0;
          i < n.length;
          i++
        ) {
          var f = n[i];
          (f.nodeName === 'LINK' || f.getAttribute('media') !== 'not all') &&
            (a.set(f.dataset.precedence, f), (l = f));
        }
        l && a.set(null, l);
      }
      ((n = e.instance),
        (f = n.getAttribute('data-precedence')),
        (i = a.get(f) || l),
        i === l && a.set(null, n),
        a.set(f, n),
        this.count++,
        (l = Fc.bind(this)),
        n.addEventListener('load', l),
        n.addEventListener('error', l),
        i
          ? i.parentNode.insertBefore(n, i.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(n, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var bi = {
    $$typeof: _t,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0,
  };
  function Yv(t, e, a, l, n, i, f, v, y) {
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
      (this.expirationTimes = ws(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ws(0)),
      (this.hiddenUpdates = ws(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = n),
      (this.onCaughtError = i),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = y),
      (this.incompleteTransitions = new Map()));
  }
  function oh(t, e, a, l, n, i, f, v, y, N, C, D) {
    return (
      (t = new Yv(t, e, a, f, y, N, C, D, v)),
      (e = 1),
      i === !0 && (e |= 24),
      (i = Te(3, null, null, e)),
      (t.current = i),
      (i.stateNode = t),
      (e = vu()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (i.memoizedState = { element: l, isDehydrated: a, cache: e }),
      yu(i),
      t
    );
  }
  function rh(t) {
    return t ? ((t = Fl), t) : Fl;
  }
  function fh(t, e, a, l, n, i) {
    ((n = rh(n)),
      l.context === null ? (l.context = n) : (l.pendingContext = n),
      (l = Ua(e)),
      (l.payload = { element: a }),
      (i = i === void 0 ? null : i),
      i !== null && (l.callback = i),
      (a = Ga(t, l, e)),
      a !== null && (_e(a, t, e), In(a, t, e)));
  }
  function dh(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function qo(t, e) {
    (dh(t, e), (t = t.alternate) && dh(t, e));
  }
  function mh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = hl(t, 67108864);
      (e !== null && _e(e, t, 67108864), qo(t, 67108864));
    }
  }
  function hh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Me();
      e = Os(e);
      var a = hl(t, e);
      (a !== null && _e(a, t, e), qo(t, e));
    }
  }
  var ts = !0;
  function Zv(t, e, a, l) {
    var n = w.T;
    w.T = null;
    var i = G.p;
    try {
      ((G.p = 2), Uo(t, e, a, l));
    } finally {
      ((G.p = i), (w.T = n));
    }
  }
  function Xv(t, e, a, l) {
    var n = w.T;
    w.T = null;
    var i = G.p;
    try {
      ((G.p = 8), Uo(t, e, a, l));
    } finally {
      ((G.p = i), (w.T = n));
    }
  }
  function Uo(t, e, a, l) {
    if (ts) {
      var n = Go(l);
      if (n === null) (Ao(t, e, l, es, a), gh(t, l));
      else if (Qv(n, t, e, a, l)) l.stopPropagation();
      else if ((gh(t, l), e & 4 && -1 < kv.indexOf(t))) {
        for (; n !== null; ) {
          var i = Gl(n);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var f = ol(i.pendingLanes);
                  if (f !== 0) {
                    var v = i;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; f; ) {
                      var y = 1 << (31 - xe(f));
                      ((v.entanglements[1] |= y), (f &= ~y));
                    }
                    (la(i), (gt & 6) === 0 && ((Hc = be() + 500), hi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = hl(i, 2)), v !== null && _e(v, i, 2), Uc(), qo(i, 2));
            }
          if (((i = Go(l)), i === null && Ao(t, e, l, es, a), i === n)) break;
          n = i;
        }
        n !== null && l.stopPropagation();
      } else Ao(t, e, l, null, a);
    }
  }
  function Go(t) {
    return ((t = Vs(t)), Vo(t));
  }
  var es = null;
  function Vo(t) {
    if (((es = null), (t = Ul(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var a = e.tag;
        if (a === 13) {
          if (((t = h(e)), t !== null)) return t;
          t = null;
        } else if (a === 31) {
          if (((t = g(e)), t !== null)) return t;
          t = null;
        } else if (a === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((es = t), null);
  }
  function vh(t) {
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
        switch (w0()) {
          case xr:
            return 2;
          case jr:
            return 8;
          case Zi:
          case O0:
            return 32;
          case Tr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var $o = !1,
    Fa = null,
    Ia = null,
    Pa = null,
    Si = new Map(),
    xi = new Map(),
    tl = [],
    kv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function gh(t, e) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        Fa = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Ia = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Pa = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Si.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        xi.delete(e.pointerId);
    }
  }
  function ji(t, e, a, l, n, i) {
    return t === null || t.nativeEvent !== i
      ? ((t = {
          blockedOn: e,
          domEventName: a,
          eventSystemFlags: l,
          nativeEvent: i,
          targetContainers: [n],
        }),
        e !== null && ((e = Gl(e)), e !== null && mh(e)),
        t)
      : ((t.eventSystemFlags |= l),
        (e = t.targetContainers),
        n !== null && e.indexOf(n) === -1 && e.push(n),
        t);
  }
  function Qv(t, e, a, l, n) {
    switch (e) {
      case 'focusin':
        return ((Fa = ji(Fa, t, e, a, l, n)), !0);
      case 'dragenter':
        return ((Ia = ji(Ia, t, e, a, l, n)), !0);
      case 'mouseover':
        return ((Pa = ji(Pa, t, e, a, l, n)), !0);
      case 'pointerover':
        var i = n.pointerId;
        return (Si.set(i, ji(Si.get(i) || null, t, e, a, l, n)), !0);
      case 'gotpointercapture':
        return ((i = n.pointerId), xi.set(i, ji(xi.get(i) || null, t, e, a, l, n)), !0);
    }
    return !1;
  }
  function _h(t) {
    var e = Ul(t.target);
    if (e !== null) {
      var a = d(e);
      if (a !== null) {
        if (((e = a.tag), e === 13)) {
          if (((e = h(a)), e !== null)) {
            ((t.blockedOn = e),
              Cr(t.priority, function () {
                hh(a);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = g(a)), e !== null)) {
            ((t.blockedOn = e),
              Cr(t.priority, function () {
                hh(a);
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
  function as(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = Go(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var l = new a.constructor(a.type, a);
        ((Gs = l), a.target.dispatchEvent(l), (Gs = null));
      } else return ((e = Gl(a)), e !== null && mh(e), (t.blockedOn = a), !1);
      e.shift();
    }
    return !0;
  }
  function ph(t, e, a) {
    as(t) && a.delete(e);
  }
  function Kv() {
    (($o = !1),
      Fa !== null && as(Fa) && (Fa = null),
      Ia !== null && as(Ia) && (Ia = null),
      Pa !== null && as(Pa) && (Pa = null),
      Si.forEach(ph),
      xi.forEach(ph));
  }
  function ls(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      $o || (($o = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, Kv)));
  }
  var ns = null;
  function yh(t) {
    ns !== t &&
      ((ns = t),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        ns === t && (ns = null);
        for (var e = 0; e < t.length; e += 3) {
          var a = t[e],
            l = t[e + 1],
            n = t[e + 2];
          if (typeof l != 'function') {
            if (Vo(l || a) === null) continue;
            break;
          }
          var i = Gl(a);
          i !== null &&
            (t.splice(e, 3),
            (e -= 3),
            Uu(i, { pending: !0, data: n, method: a.method, action: l }, l, n));
        }
      }));
  }
  function xn(t) {
    function e(y) {
      return ls(y, t);
    }
    (Fa !== null && ls(Fa, t),
      Ia !== null && ls(Ia, t),
      Pa !== null && ls(Pa, t),
      Si.forEach(e),
      xi.forEach(e));
    for (var a = 0; a < tl.length; a++) {
      var l = tl[a];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < tl.length && ((a = tl[0]), a.blockedOn === null); )
      (_h(a), a.blockedOn === null && tl.shift());
    if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
      for (l = 0; l < a.length; l += 3) {
        var n = a[l],
          i = a[l + 1],
          f = n[fe] || null;
        if (typeof i == 'function') f || yh(a);
        else if (f) {
          var v = null;
          if (i && i.hasAttribute('formAction')) {
            if (((n = i), (f = i[fe] || null))) v = f.formAction;
            else if (Vo(n) !== null) continue;
          } else v = f.action;
          (typeof v == 'function' ? (a[l + 1] = v) : (a.splice(l, 3), (l -= 3)), yh(a));
        }
      }
  }
  function bh() {
    function t(i) {
      i.canIntercept &&
        i.info === 'react-transition' &&
        i.intercept({
          handler: function () {
            return new Promise(function (f) {
              return (n = f);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function e() {
      (n !== null && (n(), (n = null)), l || setTimeout(a, 20));
    }
    function a() {
      if (!l && !navigation.transition) {
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
      var l = !1,
        n = null;
      return (
        navigation.addEventListener('navigate', t),
        navigation.addEventListener('navigatesuccess', e),
        navigation.addEventListener('navigateerror', e),
        setTimeout(a, 100),
        function () {
          ((l = !0),
            navigation.removeEventListener('navigate', t),
            navigation.removeEventListener('navigatesuccess', e),
            navigation.removeEventListener('navigateerror', e),
            n !== null && (n(), (n = null)));
        }
      );
    }
  }
  function Yo(t) {
    this._internalRoot = t;
  }
  ((is.prototype.render = Yo.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(o(409));
      var a = e.current,
        l = Me();
      fh(a, l, t, e, null, null);
    }),
    (is.prototype.unmount = Yo.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (fh(t.current, 2, null, t, null, null), Uc(), (e[ql] = null));
        }
      }));
  function is(t) {
    this._internalRoot = t;
  }
  is.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = Mr();
      t = { blockedOn: null, target: t, priority: e };
      for (var a = 0; a < tl.length && e !== 0 && e < tl[a].priority; a++);
      (tl.splice(a, 0, t), a === 0 && _h(t));
    }
  };
  var Sh = s.version;
  if (Sh !== '19.2.5') throw Error(o(527, Sh, '19.2.5'));
  G.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(o(188))
        : ((t = Object.keys(t).join(',')), Error(o(268, t)));
    return ((t = _(e)), (t = t !== null ? b(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Jv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: w,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var cs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!cs.isDisabled && cs.supportsFiber)
      try {
        ((On = cs.inject(Jv)), (Se = cs));
      } catch {}
  }
  return (
    (Ai.createRoot = function (t, e) {
      if (!m(t)) throw Error(o(299));
      var a = !1,
        l = '',
        n = zd,
        i = Md,
        f = Cd;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (l = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
          e.onCaughtError !== void 0 && (i = e.onCaughtError),
          e.onRecoverableError !== void 0 && (f = e.onRecoverableError)),
        (e = oh(t, 1, !1, null, null, a, l, null, n, i, f, bh)),
        (t[ql] = e.current),
        To(t),
        new Yo(e)
      );
    }),
    (Ai.hydrateRoot = function (t, e, a) {
      if (!m(t)) throw Error(o(299));
      var l = !1,
        n = '',
        i = zd,
        f = Md,
        v = Cd,
        y = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (l = !0),
          a.identifierPrefix !== void 0 && (n = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (i = a.onUncaughtError),
          a.onCaughtError !== void 0 && (f = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (y = a.formState)),
        (e = oh(t, 1, !0, e, a ?? null, l, n, y, i, f, v, bh)),
        (e.context = rh(null)),
        (a = e.current),
        (l = Me()),
        (l = Os(l)),
        (n = Ua(l)),
        (n.callback = null),
        Ga(a, n, l),
        (a = l),
        (e.current.lanes = a),
        Dn(e, a),
        la(e),
        (t[ql] = e.current),
        To(t),
        new is(e)
      );
    }),
    (Ai.version = '19.2.5'),
    Ai
  );
}
var wh;
function ug() {
  if (wh) return Xo.exports;
  wh = 1;
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
  return (c(), (Xo.exports = sg()), Xo.exports);
}
var og = ug(),
  ft = fr();
const ss = Pv(ft),
  rg = '_content_11wqi_1',
  fg = { content: rg },
  dg = '_tabBar_rhd8d_2',
  mg = '_fullWidth_rhd8d_9',
  hg = '_tab_rhd8d_2',
  vg = '_tabActive_rhd8d_54',
  gg = '_tabDisabled_rhd8d_101',
  _g = '_tabIcon_rhd8d_107',
  pg = '_tabLabel_rhd8d_114',
  yg = '_badge_rhd8d_119',
  bg = '_badgeActive_rhd8d_137',
  Sg = '_indicator_rhd8d_158',
  Ce = {
    tabBar: dg,
    fullWidth: mg,
    tab: hg,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: vg,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: gg,
    tabIcon: _g,
    tabLabel: pg,
    badge: yg,
    badgeActive: bg,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Sg,
  },
  xg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  jg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Tg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Ag = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Ng = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Eg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  zg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Mg = { screw: Eg, bolt: jg, alloy: xg, laser: Ng, cannon: Tg, thunder: zg, cutter: Ag };
function Cg(c, s) {
  return c.replace(/\swidth="\d+"/, ` width="${s}"`).replace(/\sheight="\d+"/, ` height="${s}"`);
}
function Ct({ name: c, size: s = 16, color: u = 'currentColor', className: o }) {
  const m = Mg[c];
  if (m)
    return r.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: u, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: Cg(m, s) },
    });
  const d = {
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
        ...d,
        children: [
          r.jsx('line', { x1: '4', y1: '4', x2: '20', y2: '20' }),
          r.jsx('line', { x1: '20', y1: '4', x2: '4', y2: '20' }),
        ],
      });
    case 'menu':
      return r.jsxs('svg', {
        ...d,
        children: [
          r.jsx('line', { x1: '3', y1: '7', x2: '21', y2: '7' }),
          r.jsx('line', { x1: '3', y1: '12', x2: '21', y2: '12' }),
          r.jsx('line', { x1: '3', y1: '17', x2: '21', y2: '17' }),
        ],
      });
    case 'settings':
      return r.jsxs('svg', {
        ...d,
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
    case 'triangle':
      return r.jsx('svg', {
        ...d,
        children: r.jsx('polygon', {
          points: '12,4 20,20 4,20',
          fill: u,
          stroke: u,
          strokeLinejoin: 'round',
        }),
      });
    case 'tower':
      return r.jsxs('svg', {
        ...d,
        children: [
          r.jsx('polygon', { points: '12,3 18,10 6,10', fill: u, stroke: 'none' }),
          r.jsx('rect', { x: '8', y: '10', width: '8', height: '9' }),
          r.jsx('rect', { x: '5', y: '19', width: '14', height: '2' }),
        ],
      });
    case 'shield':
      return r.jsx('svg', {
        ...d,
        children: r.jsx('path', {
          d: 'M12 3 L20 6.5 V12 C20 16.5 16.5 19.5 12 21 C7.5 19.5 4 16.5 4 12 V6.5 Z',
        }),
      });
    case 'heart':
      return r.jsx('svg', {
        ...d,
        children: r.jsx('path', {
          d: 'M12 21 C12 21 4 14.5 4 9 C4 6.2 6.2 4 9 4 C10.4 4 11.7 4.6 12 5.5 C12.3 4.6 13.6 4 15 4 C17.8 4 20 6.2 20 9 C20 14.5 12 21 12 21Z',
        }),
      });
    case 'flame':
      return r.jsxs('svg', {
        ...d,
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
        ...d,
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
        ...d,
        children: r.jsx('polygon', {
          points: '13,3 6,13 11,13 11,21 18,11 13,11',
          fill: u,
          stroke: 'none',
        }),
      });
    case 'skull':
      return r.jsxs('svg', {
        ...d,
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
        ...d,
        children: r.jsx('polygon', {
          points: '12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10',
          fill: u,
          stroke: 'none',
        }),
      });
    case 'target':
      return r.jsxs('svg', {
        ...d,
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
        ...d,
        children: r.jsx('polygon', { points: '6,4 20,12 6,20', fill: u, stroke: 'none' }),
      });
    case 'pause':
      return r.jsxs('svg', {
        ...d,
        children: [
          r.jsx('rect', { x: '5', y: '4', width: '5', height: '16', fill: u, stroke: 'none' }),
          r.jsx('rect', { x: '14', y: '4', width: '5', height: '16', fill: u, stroke: 'none' }),
        ],
      });
    case 'chevron-left':
      return r.jsx('svg', { ...d, children: r.jsx('polyline', { points: '15,5 9,12 15,19' }) });
    case 'chevron-right':
      return r.jsx('svg', { ...d, children: r.jsx('polyline', { points: '9,5 15,12 9,19' }) });
    case 'chevron-up':
      return r.jsx('svg', { ...d, children: r.jsx('polyline', { points: '5,15 12,9 19,15' }) });
    case 'chevron-down':
      return r.jsx('svg', { ...d, children: r.jsx('polyline', { points: '5,9 12,15 19,9' }) });
    case 'check':
      return r.jsx('svg', {
        ...d,
        children: r.jsx('polyline', { points: '4,12 9,17 20,6', strokeWidth: '2.5' }),
      });
    case 'plus':
      return r.jsxs('svg', {
        ...d,
        children: [
          r.jsx('line', { x1: '12', y1: '4', x2: '12', y2: '20', strokeWidth: '2.5' }),
          r.jsx('line', { x1: '4', y1: '12', x2: '20', y2: '12', strokeWidth: '2.5' }),
        ],
      });
    case 'minus':
      return r.jsx('svg', {
        ...d,
        children: r.jsx('line', { x1: '4', y1: '12', x2: '20', y2: '12', strokeWidth: '2.5' }),
      });
    case 'info':
      return r.jsxs('svg', {
        ...d,
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
        ...d,
        children: [
          r.jsx('line', { x1: '12', y1: '19', x2: '12', y2: '5', strokeWidth: '2' }),
          r.jsx('polyline', { points: '6,11 12,5 18,11', strokeWidth: '2' }),
        ],
      });
    default:
      return null;
  }
}
function bs({
  tabs: c,
  value: s,
  onChange: u,
  variant: o = 'underline',
  size: m = 'md',
  fullWidth: d = !1,
  align: h = 'start',
}) {
  const g = ft.useRef(null),
    [p, _] = ft.useState({ left: 0, width: 0 });
  return (
    ft.useEffect(() => {
      const b = g.current;
      if (!b) return;
      const E = c.findIndex((U) => U.key === s);
      if (E < 0) return;
      const H = b.querySelectorAll('[role="tab"]')[E];
      if (!H) return;
      const L = b.getBoundingClientRect(),
        $ = H.getBoundingClientRect();
      _({ left: $.left - L.left, width: $.width });
    }, [s, c]),
    r.jsxs('div', {
      ref: g,
      role: 'tablist',
      className: [
        Ce.tabBar,
        Ce[`variant-${o}`],
        Ce[`size-${m}`],
        Ce[`align-${h}`],
        d ? Ce.fullWidth : '',
      ]
        .filter(Boolean)
        .join(' '),
      children: [
        c.map((b) => {
          const E = b.key === s;
          return r.jsxs(
            'button',
            {
              type: 'button',
              role: 'tab',
              'aria-selected': E,
              disabled: b.disabled === !0,
              className: [Ce.tab, E ? Ce.tabActive : '', b.disabled === !0 ? Ce.tabDisabled : '']
                .filter(Boolean)
                .join(' '),
              onClick: () => {
                b.disabled !== !0 && u(b.key);
              },
              children: [
                b.iconName != null &&
                  r.jsx('span', {
                    className: Ce.tabIcon,
                    'aria-hidden': 'true',
                    children: r.jsx(Ct, { name: b.iconName, size: m === 'sm' ? 12 : 14 }),
                  }),
                r.jsx('span', { className: Ce.tabLabel, children: b.label }),
                b.badge != null &&
                  r.jsx('span', {
                    className: [Ce.badge, E ? Ce.badgeActive : ''].filter(Boolean).join(' '),
                    children: b.badge,
                  }),
              ],
            },
            b.key
          );
        }),
        o === 'underline' &&
          r.jsx('span', {
            className: Ce.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${p.left}px)`, width: p.width },
          }),
      ],
    })
  );
}
const wg = '_shell_gbfld_2',
  Og = '_header_gbfld_15',
  Rg = '_main_gbfld_28',
  Dg = '_noScroll_gbfld_37',
  Bg = '_footer_gbfld_42',
  Lg = '_battle_gbfld_55',
  jn = { shell: wg, header: Og, main: Rg, noScroll: Dg, footer: Bg, battle: Lg };
function Dl({ header: c, footer: s, children: u, noScroll: o = !1, variant: m = 'default' }) {
  return r.jsxs('div', {
    className: [jn.shell, m === 'battle' ? jn.battle : ''].filter(Boolean).join(' '),
    children: [
      c != null && r.jsx('header', { className: jn.header, children: c }),
      r.jsx('main', {
        className: [jn.main, o ? jn.noScroll : ''].filter(Boolean).join(' '),
        children: u,
      }),
      s != null && r.jsx('footer', { className: jn.footer, children: s }),
    ],
  });
}
const Hg = '_nav_4erx0_2',
  qg = '_tab_4erx0_10',
  Ug = '_active_4erx0_33',
  Gg = '_iconWrap_4erx0_38',
  Vg = '_badge_4erx0_51',
  Ni = { nav: Hg, tab: qg, active: Ug, iconWrap: Gg, badge: Vg },
  $g = '_text_1dl4l_1',
  Yg = '_variant_heading_1_1dl4l_6',
  Zg = '_variant_heading_2_1dl4l_15',
  Xg = '_variant_heading_3_1dl4l_24',
  kg = '_variant_body_1dl4l_33',
  Qg = '_variant_caption_1dl4l_41',
  Kg = '_variant_label_1dl4l_49',
  Jg = '_variant_numeric_l_1dl4l_58',
  Wg = '_variant_numeric_m_1dl4l_67',
  Fg = '_variant_numeric_s_1dl4l_76',
  Ig = '_color_default_1dl4l_85',
  Pg = '_color_mid_1dl4l_89',
  t_ = '_color_dim_1dl4l_93',
  e_ = '_color_disabled_1dl4l_97',
  a_ = '_color_primary_1dl4l_101',
  l_ = '_color_secondary_1dl4l_105',
  n_ = '_color_danger_1dl4l_109',
  i_ = '_color_success_1dl4l_113',
  c_ = '_color_warning_1dl4l_117',
  s_ = '_truncate_1dl4l_121',
  u_ = '_align_left_1dl4l_128',
  o_ = '_align_center_1dl4l_132',
  r_ = '_align_right_1dl4l_136',
  Ei = {
    text: $g,
    variant_heading_1: Yg,
    variant_heading_2: Zg,
    variant_heading_3: Xg,
    variant_body: kg,
    variant_caption: Qg,
    variant_label: Kg,
    variant_numeric_l: Jg,
    variant_numeric_m: Wg,
    variant_numeric_s: Fg,
    color_default: Ig,
    color_mid: Pg,
    color_dim: t_,
    color_disabled: e_,
    color_primary: a_,
    color_secondary: l_,
    color_danger: n_,
    color_success: i_,
    color_warning: c_,
    truncate: s_,
    align_left: u_,
    align_center: o_,
    align_right: r_,
  };
function f_(c) {
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
function q({
  variant: c = 'body',
  children: s,
  as: u,
  color: o = 'default',
  className: m,
  truncate: d,
  align: h,
  style: g,
}) {
  const p = u ?? f_(c),
    _ = c.replace(/-/g, '_'),
    b = o === 'text' ? 'default' : o;
  return r.jsx(p, {
    className: [
      Ei.text,
      Ei[`variant_${_}`],
      Ei[`color_${b}`],
      d ? Ei.truncate : '',
      h ? Ei[`align_${h}`] : '',
      m,
    ]
      .filter(Boolean)
      .join(' '),
    style: g,
    children: s,
  });
}
const d_ = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function Ui({ active: c, onChange: s, badges: u }) {
  return r.jsx('nav', {
    className: Ni.nav,
    'aria-label': 'メインナビゲーション',
    children: d_.map(({ key: o, label: m, iconName: d }) => {
      const h = o === c,
        g = u == null ? void 0 : u[o];
      return r.jsxs(
        'button',
        {
          type: 'button',
          className: [Ni.tab, h ? Ni.active : ''].filter(Boolean).join(' '),
          onClick: () => s(o),
          'aria-current': h ? 'page' : void 0,
          'aria-label': m,
          children: [
            r.jsxs('span', {
              className: Ni.iconWrap,
              children: [
                r.jsx(Ct, {
                  name: d,
                  size: 22,
                  color: h ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                g != null &&
                  r.jsx('span', { className: Ni.badge, 'aria-hidden': 'true', children: g }),
              ],
            }),
            r.jsx(q, { variant: 'caption', color: h ? 'primary' : 'dim', children: m }),
          ],
        },
        o
      );
    }),
  });
}
const m_ = '_root_kv5uk_2',
  h_ = '_titleRow_kv5uk_8',
  v_ = '_left_kv5uk_17',
  g_ = '_center_kv5uk_24',
  __ = '_right_kv5uk_33',
  p_ = '_currencies_kv5uk_42',
  y_ = '_actions_kv5uk_49',
  b_ = '_tabBarSlot_kv5uk_56',
  al = {
    root: m_,
    titleRow: h_,
    left: v_,
    center: g_,
    right: __,
    currencies: p_,
    actions: y_,
    tabBarSlot: b_,
  },
  S_ = '_root_i843c_2',
  x_ = '_icon_i843c_10',
  j_ = '_delta_i843c_30',
  T_ = '_deltaSm_i843c_37',
  A_ = '_deltaMd_i843c_41',
  N_ = '_deltaLg_i843c_45',
  E_ = '_subtle_i843c_50',
  z_ = '_currencyLabel_i843c_55',
  M_ = '_rankStamp_i843c_64',
  na = {
    root: S_,
    icon: x_,
    delta: j_,
    deltaSm: T_,
    deltaMd: A_,
    deltaLg: N_,
    subtle: E_,
    currencyLabel: z_,
    rankStamp: M_,
  },
  C_ = '_root_1h9ax_1',
  w_ = '_sizeSm_1h9ax_12',
  O_ = '_sizeMd_1h9ax_16',
  R_ = '_sizeLg_1h9ax_20',
  D_ = '_sizeXl_1h9ax_24',
  B_ = '_affix_1h9ax_28',
  El = { root: C_, sizeSm: w_, sizeMd: O_, sizeLg: R_, sizeXl: D_, affix: B_ };
function nr(c) {
  let s = c.length;
  for (; s > 0 && c[s - 1] === 0; ) s--;
  return c.slice(0, s);
}
function zi(c) {
  let s = 0;
  for (let u = 0; u < c.length; u++) {
    const o = Math.floor(c[u] + s);
    ((c[u] = o % 1e3), (s = Math.floor(o / 1e3)));
  }
  for (; s > 0; ) (c.push(s % 1e3), (s = Math.floor(s / 1e3)));
  return nr(c);
}
function L_(c, s) {
  for (; s !== 0; ) {
    const u = s;
    ((s = c % s), (c = u));
  }
  return c;
}
function H_(c) {
  const s = c.toString(),
    u = s.indexOf('.');
  if (u === -1) return { num: Math.round(c), den: 1 };
  const o = s.length - u - 1,
    m = Math.pow(10, o),
    d = Math.round(c * m),
    h = L_(Math.abs(d), m);
  return { num: d / h, den: m / h };
}
function q_(c) {
  let s = '',
    u = c;
  for (; u > 0; )
    ((u -= 1), (s = String.fromCharCode(65 + (u % 26)) + s), (u = Math.floor(u / 26)));
  return s;
}
const ce = class ce {
  constructor(s) {
    Ke(this, 'digits');
    this.digits = s;
  }
  static fromNumber(s) {
    if (s <= 0) return ce.ZERO;
    const u = [];
    let o = Math.floor(s);
    for (; o > 0; ) (u.push(o % 1e3), (o = Math.floor(o / 1e3)));
    return new ce(nr(u));
  }
  static fromString(s) {
    const u = s.trim();
    if (u === '' || u === '0') return ce.ZERO;
    const o = [];
    let m = u.length;
    for (; m > 0; ) {
      const d = Math.max(0, m - 3);
      (o.push(parseInt(u.slice(d, m), 10)), (m = d));
    }
    return new ce(nr(o));
  }
  static fromJSON(s) {
    return new ce(zi([...s]));
  }
  add(s) {
    const u = this.digits,
      o = s.digits,
      m = Math.max(u.length, o.length),
      d = new Array(m).fill(0);
    let h = 0;
    for (let g = 0; g < m; g++) {
      const p = (u[g] ?? 0) + (o[g] ?? 0) + h;
      ((d[g] = p % 1e3), (h = Math.floor(p / 1e3)));
    }
    return (h > 0 && d.push(h), new ce(zi(d)));
  }
  sub(s) {
    if (this.compare(s) <= 0) return ce.ZERO;
    const u = this.digits,
      o = s.digits,
      m = new Array(u.length).fill(0);
    let d = 0;
    for (let h = 0; h < u.length; h++) {
      let g = (u[h] ?? 0) - (o[h] ?? 0) - d;
      (g < 0 ? ((g += 1e3), (d = 1)) : (d = 0), (m[h] = g));
    }
    return new ce(zi(m));
  }
  mulInt(s) {
    if (s <= 0 || this.isZero()) return ce.ZERO;
    const u = this.digits,
      o = new Array(u.length).fill(0);
    let m = 0;
    for (let d = 0; d < u.length; d++) {
      const h = u[d] * s + m;
      ((o[d] = h % 1e3), (m = Math.floor(h / 1e3)));
    }
    for (; m > 0; ) (o.push(m % 1e3), (m = Math.floor(m / 1e3)));
    return new ce(zi(o));
  }
  divInt(s) {
    if (s <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return ce.ZERO;
    const u = this.digits,
      o = new Array(u.length).fill(0);
    let m = 0;
    for (let d = u.length - 1; d >= 0; d--) {
      const h = m * 1e3 + (u[d] ?? 0);
      ((o[d] = Math.floor(h / s)), (m = h % s));
    }
    return (m > 0 && (o[0] += 1), new ce(zi(o)));
  }
  mulRational(s, u) {
    return this.mulInt(s).divInt(u);
  }
  mulNumber(s) {
    const { num: u, den: o } = H_(s);
    return this.mulRational(u, o);
  }
  compare(s) {
    const u = this.digits,
      o = s.digits;
    if (u.length !== o.length) return u.length < o.length ? -1 : 1;
    for (let m = u.length - 1; m >= 0; m--) {
      const d = u[m] ?? 0,
        h = o[m] ?? 0;
      if (d < h) return -1;
      if (d > h) return 1;
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
      m = q_(o),
      d = this.digits[s - 2] ?? 0,
      h = Math.floor(d / 10);
    return `${u}.${String(h).padStart(2, '0')}${m}`;
  }
};
Ke(ce, 'ZERO', new ce([]));
let At = ce;
function U_(c) {
  if (c === '') return 0;
  let s = 0;
  for (let u = 0; u < c.length; u++) s = s * 26 + (c.charCodeAt(u) - 65 + 1);
  return s;
}
function G_(c) {
  return c === 0
    ? 'var(--c-primary)'
    : `oklch(0.78 0.18 ${(195 + ((c - 1) % 26) * (100 / 25)).toFixed(1)})`;
}
function V_(c, s) {
  switch (c) {
    case 'scale':
      return G_(s);
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
function $_(c) {
  switch (c) {
    case 'scale':
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
function gs({
  value: c,
  size: s = 'md',
  accentColor: u = 'scale',
  glow: o = !1,
  prefix: m,
  suffix: d,
  decimals: h,
  style: g,
}) {
  const p = typeof c == 'number' ? At.fromNumber(c) : c;
  let _;
  h != null && typeof c == 'number' ? (_ = c.toFixed(h)) : (_ = p.toDisplay());
  const b = _.match(/^[\d.]+([A-Z]*)$/),
    E = b ? b[1] : '',
    j = U_(E),
    H = V_(u, j),
    L = o ? $_(u) : void 0,
    $ = { sm: El.sizeSm, md: El.sizeMd, lg: El.sizeLg, xl: El.sizeXl }[s],
    U = { color: H, ...(L != null ? { textShadow: L } : {}), ...g };
  return r.jsxs('span', {
    className: `${El.root} ${$}`,
    style: U,
    children: [
      m != null && r.jsx('span', { className: El.affix, children: m }),
      _,
      d != null && r.jsx('span', { className: El.affix, children: d }),
    ],
  });
}
const Y_ = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  Z_ = { sm: 12, md: 16, lg: 22, xl: 28 };
function X_({ delta: c, sizeClass: s }) {
  const u = c === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return r.jsx('span', {
    className: `${na.delta} ${s}`,
    style: { color: u },
    'aria-hidden': 'true',
    children: c,
  });
}
function Hi({
  currency: c,
  value: s,
  size: u = 'md',
  delta: o,
  showLabel: m,
  subtle: d,
  align: h = 'start',
  ranked: g,
}) {
  const p = typeof s == 'number' ? At.fromNumber(s) : s,
    _ = Y_[c],
    b = d ? 'var(--c-text-disabled)' : `var(${_.cssVar})`,
    E = o && !d ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: b },
    j = { sm: na.deltaSm, md: na.deltaMd, lg: na.deltaLg, xl: na.deltaLg }[u],
    H = r.jsx(Ct, { name: c, size: Z_[u], color: b, className: na.icon }),
    L = r.jsxs(r.Fragment, {
      children: [
        o !== void 0 && !d && r.jsx(X_, { delta: o, sizeClass: j }),
        r.jsx(gs, { value: p, size: u, accentColor: 'primary', style: E }),
      ],
    });
  return r.jsxs('span', {
    className: [na.root, d ? na.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${_.label} ${p.toDisplay()}`,
    children: [
      h === 'end'
        ? r.jsxs(r.Fragment, { children: [L, H] })
        : r.jsxs(r.Fragment, { children: [H, L] }),
      m && r.jsx('span', { className: na.currencyLabel, 'aria-hidden': 'true', children: _.label }),
      g !== void 0 &&
        g !== '' &&
        r.jsx('span', {
          className: na.rankStamp,
          'data-rank': g,
          'aria-label': `rank ${g}`,
          children: g,
        }),
    ],
  });
}
const k_ = '_iconButton_1o4oh_1',
  Q_ = '_round_1o4oh_21',
  K_ = '_active_1o4oh_87',
  J_ = '_iconWrap_1o4oh_114',
  Tn = {
    iconButton: k_,
    round: Q_,
    'variant-primary': '_variant-primary_1o4oh_25',
    'variant-secondary': '_variant-secondary_1o4oh_41',
    'variant-ghost': '_variant-ghost_1o4oh_57',
    'variant-danger': '_variant-danger_1o4oh_71',
    active: K_,
    'size-sm': '_size-sm_1o4oh_99',
    'size-md': '_size-md_1o4oh_104',
    'size-lg': '_size-lg_1o4oh_109',
    iconWrap: J_,
  },
  W_ = { sm: 14, md: 18, lg: 22 };
function ds({
  icon: c,
  label: s,
  size: u = 'md',
  variant: o = 'ghost',
  shape: m = 'square',
  active: d = !1,
  disabled: h = !1,
  onClick: g,
}) {
  const p = o === 'default' ? 'ghost' : o,
    _ = typeof c == 'string' ? r.jsx(Ct, { name: c, size: W_[u] }) : c;
  return r.jsx('button', {
    type: 'button',
    className: [
      Tn.iconButton,
      Tn[`variant-${p}`],
      Tn[`size-${u}`],
      m === 'round' ? Tn.round : '',
      d ? Tn.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: g,
    'aria-label': s,
    'aria-pressed': d,
    'aria-disabled': h,
    children: r.jsx('span', { className: Tn.iconWrap, 'aria-hidden': 'true', children: _ }),
  });
}
const Oh = (c) => {
    let s;
    const u = new Set(),
      o = (_, b) => {
        const E = typeof _ == 'function' ? _(s) : _;
        if (!Object.is(E, s)) {
          const j = s;
          ((s = (b ?? (typeof E != 'object' || E === null)) ? E : Object.assign({}, s, E)),
            u.forEach((H) => H(s, j)));
        }
      },
      m = () => s,
      g = {
        setState: o,
        getState: m,
        getInitialState: () => p,
        subscribe: (_) => (u.add(_), () => u.delete(_)),
      },
      p = (s = c(o, m, g));
    return g;
  },
  F_ = (c) => (c ? Oh(c) : Oh),
  I_ = (c) => c;
function P_(c, s = I_) {
  const u = ss.useSyncExternalStore(
    c.subscribe,
    ss.useCallback(() => s(c.getState()), [c, s]),
    ss.useCallback(() => s(c.getInitialState()), [c, s])
  );
  return (ss.useDebugValue(u), u);
}
const tp = (c) => {
    const s = F_(c),
      u = (o) => P_(s, o);
    return (Object.assign(u, s), u);
  },
  ep = (c) => tp,
  Rh = {
    isRunActive: !1,
    screw: At.ZERO,
    machineHp: 0,
    machineMaxHp: 0,
    currentTier: 1,
    currentWave: 1,
    currentWeapon: 'laser',
    weaponSwitchCdSec: 0,
    activeCdSec: 0,
    isAutoActive: !1,
    gameSpeed: 1,
  },
  ap = (c, s) => ({
    ...Rh,
    startRun: ({ initialWeapon: u, machineMaxHp: o, gameSpeed: m }) =>
      c({
        isRunActive: !0,
        screw: At.ZERO,
        machineHp: o,
        machineMaxHp: o,
        currentTier: 1,
        currentWave: 1,
        currentWeapon: u,
        weaponSwitchCdSec: 0,
        activeCdSec: 0,
        isAutoActive: !1,
        gameSpeed: m,
      }),
    endRun: () => c(Rh),
    addScrew: (u) => c((o) => ({ screw: o.screw.add(u) })),
    spendScrew: (u) => {
      const o = s().screw;
      return o.lt(u) ? !1 : (c({ screw: o.sub(u) }), !0);
    },
    setMachineHp: (u) => c((o) => ({ machineHp: Math.max(0, Math.min(u, o.machineMaxHp)) })),
    damageHp: (u) => c((o) => ({ machineHp: Math.max(0, o.machineHp - u) })),
    advanceWave: () => c((u) => ({ currentWave: u.currentWave + 1 })),
    advanceTier: () => c((u) => ({ currentTier: u.currentTier + 1, currentWave: 1 })),
    switchWeapon: (u) => c({ currentWeapon: u }),
    setWeaponSwitchCd: (u) => c({ weaponSwitchCdSec: Math.max(0, u) }),
    setActiveCd: (u) => c({ activeCdSec: Math.max(0, u) }),
    setAutoActive: (u) => c({ isAutoActive: u }),
    tickCooldowns: (u) =>
      c((o) => ({
        weaponSwitchCdSec: Math.max(0, o.weaponSwitchCdSec - u),
        activeCdSec: Math.max(0, o.activeCdSec - u),
      })),
  }),
  lp = { bolt: At.ZERO, alloy: At.ZERO },
  np = (c, s) => ({
    ...lp,
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
    resetCurrencies: () => c({ bolt: At.ZERO, alloy: At.ZERO }),
  }),
  dr = 6,
  ip = { equippedPatches: new Map() },
  cp = (c, s) => ({
    ...ip,
    equipPatch: (u, o, m) => {
      const d = s().equippedPatches;
      for (const [h, g] of d) if (g.name === o && h !== u) return !1;
      return (
        c((h) => {
          const g = new Map(h.equippedPatches);
          return (g.set(u, { name: o, tier: m }), { equippedPatches: g });
        }),
        !0
      );
    },
    unequipPatch: (u) => {
      c((o) => {
        const m = new Map(o.equippedPatches);
        return (m.delete(u), { equippedPatches: m });
      });
    },
    clearEquippedPatches: () => c({ equippedPatches: new Map() }),
  }),
  r0 = 'tower-like-game',
  _s = 1,
  Q = {
    profile: 'profile',
    currencies: 'currencies',
    machine: 'machine',
    weapons: 'weapons',
    patches: 'patches',
    equippedPatches: 'equippedPatches',
    settings: 'settings',
  },
  f0 = [
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
  sp = {
    id: 'singleton',
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    schemaVersion: _s,
  },
  up = { id: 'singleton', bolt: [], alloy: [] },
  op = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  rp = {
    id: 'singleton',
    defaultGameSpeed: 1,
    bgmVolume: 0.8,
    seVolume: 0.8,
    vibrationEnabled: !0,
  };
function d0() {
  return Object.fromEntries(f0.map((c) => [c, 0]));
}
const fp = { machineLevels: d0() },
  dp = (c) => ({
    ...fp,
    incrementMachineLv: (s) =>
      c((u) => ({ machineLevels: { ...u.machineLevels, [s]: u.machineLevels[s] + 1 } })),
    setMachineLv: (s, u) => c((o) => ({ machineLevels: { ...o.machineLevels, [s]: u } })),
    resetMachine: () => c({ machineLevels: d0() }),
  });
function Dh(c, s) {
  return `${c}#${s}`;
}
const mp = { patches: new Map() },
  hp = (c, s) => ({
    ...mp,
    addPatch: (u, o, m = 1) => {
      const d = Dh(u, o);
      c((h) => {
        const g = new Map(h.patches),
          p = g.get(d);
        return (
          p ? g.set(d, { ...p, count: p.count + m }) : g.set(d, { name: u, tier: o, count: m }),
          { patches: g }
        );
      });
    },
    consumePatch: (u, o, m = 1) => {
      const d = Dh(u, o),
        h = s().patches.get(d);
      return !h || h.count < m
        ? !1
        : (c((g) => {
            const p = new Map(g.patches),
              _ = p.get(d);
            if (!_) return {};
            const b = _.count - m;
            return (b <= 0 ? p.delete(d) : p.set(d, { ..._, count: b }), { patches: p });
          }),
          !0);
    },
    pruneEmptyPatches: () => {
      c((u) => {
        const o = new Map(u.patches);
        for (const [m, d] of o) d.count <= 0 && o.delete(m);
        return { patches: o };
      });
    },
    resetPatches: () => c({ patches: new Map() }),
  }),
  Bh = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  vp = (c) => ({
    ...Bh,
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
    resetProfile: (s) => c({ ...Bh, createdAt: s, lastPlayedAt: s }),
  }),
  Lh = { defaultGameSpeed: 1, bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  gp = (c) => ({
    ...Lh,
    setDefaultGameSpeed: (s) => c({ defaultGameSpeed: s }),
    setBgmVolume: (s) => c({ bgmVolume: Math.max(0, Math.min(1, s)) }),
    setSeVolume: (s) => c({ seVolume: Math.max(0, Math.min(1, s)) }),
    setVibrationEnabled: (s) => c({ vibrationEnabled: s }),
    resetSettings: () => c(Lh),
  }),
  Hh = { weaponLv: 0, initialWeapon: 'laser' },
  _p = (c) => ({
    ...Hh,
    incrementWeaponLv: () => c((s) => ({ weaponLv: s.weaponLv + 1 })),
    setWeaponLv: (s) => c({ weaponLv: s }),
    setInitialWeapon: (s) => c({ initialWeapon: s }),
    resetWeapons: () => c(Hh),
  }),
  k = ep()((...c) => ({
    ...vp(...c),
    ...np(...c),
    ...dp(...c),
    ..._p(...c),
    ...hp(...c),
    ...cp(...c),
    ...gp(...c),
    ...ap(...c),
  }));
function Gi({ title: c, subtitle: s, onBack: u, currencies: o, tabBar: m, actions: d }) {
  const h = k((j) => j.bolt),
    g = k((j) => j.alloy),
    p = k((j) => j.screw),
    _ = k((j) => j.isRunActive),
    b = (o ?? []).filter((j) => (j === 'screw' ? _ : !0));
  function E(j) {
    switch (j) {
      case 'bolt':
        return h;
      case 'alloy':
        return g;
      case 'screw':
        return p;
    }
  }
  return r.jsxs('div', {
    className: al.root,
    children: [
      r.jsxs('div', {
        className: al.titleRow,
        children: [
          r.jsx('div', {
            className: al.left,
            children:
              u != null &&
              r.jsx(ds, {
                icon: 'chevron-left',
                label: '戻る',
                variant: 'ghost',
                size: 'md',
                onClick: u,
              }),
          }),
          r.jsxs('div', {
            className: al.center,
            children: [
              r.jsx(q, { variant: 'heading-3', truncate: !0, align: 'center', children: c }),
              s != null &&
                r.jsx(q, { variant: 'caption', color: 'dim', align: 'center', children: s }),
            ],
          }),
          r.jsxs('div', {
            className: al.right,
            children: [
              b.length > 0 &&
                r.jsx('div', {
                  className: al.currencies,
                  children: b.map((j) => r.jsx(Hi, { currency: j, value: E(j), size: 'sm' }, j)),
                }),
              d != null && r.jsx('div', { className: al.actions, children: d }),
            ],
          }),
        ],
      }),
      m != null && r.jsx('div', { className: al.tabBarSlot, children: m }),
    ],
  });
}
const pp = '_tab_nufoh_3',
  yp = '_weaponBlock_nufoh_9',
  bp = '_activeCard_nufoh_15',
  Sp = '_activeRow_nufoh_19',
  xp = '_activeName_nufoh_24',
  Mi = { tab: pp, weaponBlock: yp, activeCard: bp, activeRow: Sp, activeName: xp },
  jp = '_card_aojnu_1',
  Tp = '_interactive_aojnu_92',
  Ci = {
    card: jp,
    'variant-default': '_variant-default_aojnu_7',
    'variant-elevated': '_variant-elevated_aojnu_12',
    'variant-sunken': '_variant-sunken_aojnu_18',
    'variant-ghost': '_variant-ghost_aojnu_23',
    'variant-accent': '_variant-accent_aojnu_28',
    'variant-secondary': '_variant-secondary_aojnu_34',
    'variant-danger': '_variant-danger_aojnu_40',
    'variant-flat': '_variant-flat_aojnu_45',
    'variant-outline': '_variant-outline_aojnu_51',
    'padding-none': '_padding-none_aojnu_58',
    'padding-sm': '_padding-sm_aojnu_62',
    'padding-md': '_padding-md_aojnu_66',
    'padding-lg': '_padding-lg_aojnu_70',
    'padding-xl': '_padding-xl_aojnu_74',
    'radius-sm': '_radius-sm_aojnu_79',
    'radius-md': '_radius-md_aojnu_83',
    'radius-l': '_radius-l_aojnu_87',
    interactive: Tp,
  };
function sl({
  children: c,
  variant: s = 'default',
  interactive: u = !1,
  padding: o = 'md',
  radius: m,
  className: d,
}) {
  const h = [
    Ci.card,
    Ci[`variant-${s}`],
    Ci[`padding-${o}`],
    m != null ? Ci[`radius-${m}`] : '',
    u ? Ci.interactive : '',
    d ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return r.jsx('div', { className: h, children: c });
}
const Ap = '_wrapper_1gig0_2',
  Np = '_active_1gig0_8',
  Ep = '_card_1gig0_8',
  zp = '_locked_1gig0_14',
  Mp = '_tall_1gig0_27',
  Cp = '_header_1gig0_27',
  wp = '_iconWrap_1gig0_33',
  Op = '_statList_1gig0_37',
  Rp = '_wide_1gig0_42',
  Dp = '_headerText_1gig0_66',
  Bp = '_description_1gig0_73',
  Lp = '_statRow_1gig0_93',
  Hp = '_statValue_1gig0_100',
  qp = '_lockedBadge_1gig0_110',
  pe = {
    wrapper: Ap,
    active: Np,
    card: Ep,
    locked: zp,
    tall: Mp,
    header: Cp,
    iconWrap: wp,
    statList: Op,
    wide: Rp,
    headerText: Dp,
    description: Bp,
    statRow: Lp,
    statValue: Hp,
    lockedBadge: qp,
  },
  Up = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function m0({
  weapon: c,
  name: s,
  description: u,
  stats: o,
  layout: m = 'tall',
  active: d = !1,
  locked: h = !1,
  onClick: g,
}) {
  const p = m === 'wide';
  return r.jsx('div', {
    className: [pe.wrapper, d ? pe.active : '', h ? pe.locked : '', p ? pe.wide : pe.tall]
      .filter(Boolean)
      .join(' '),
    onClick: h ? void 0 : g,
    role: g != null && !h ? 'button' : void 0,
    tabIndex: g != null && !h ? 0 : void 0,
    onKeyDown:
      g != null && !h
        ? (_) => {
            (_.key === 'Enter' || _.key === ' ') && (_.preventDefault(), g());
          }
        : void 0,
    'aria-pressed': g != null ? d : void 0,
    children: r.jsxs(sl, {
      variant: 'elevated',
      padding: 'md',
      interactive: g != null && !h,
      className: pe.card,
      children: [
        r.jsxs('div', {
          className: pe.header,
          children: [
            r.jsx('span', {
              className: pe.iconWrap,
              children: r.jsx(Ct, {
                name: c,
                size: p ? 24 : 28,
                color: d ? 'var(--c-primary)' : h ? 'var(--c-text-disabled)' : 'var(--c-text-mid)',
              }),
            }),
            r.jsxs('div', {
              className: pe.headerText,
              children: [
                r.jsx(q, {
                  variant: p ? 'label' : 'heading-3',
                  color: d ? 'primary' : h ? 'disabled' : 'default',
                  children: s,
                }),
                u != null &&
                  u.length > 0 &&
                  r.jsx(q, {
                    variant: 'caption',
                    color: 'dim',
                    className: pe.description,
                    children: u,
                  }),
              ],
            }),
          ],
        }),
        !h &&
          o.length > 0 &&
          r.jsx('ul', {
            className: pe.statList,
            children: o.map((_) => {
              const b =
                _.suffix != null
                  ? `${typeof _.value == 'number' ? _.value.toLocaleString() : _.value}${_.suffix}`
                  : typeof _.value == 'number'
                    ? _.value.toLocaleString()
                    : _.value;
              return r.jsxs(
                'li',
                {
                  className: pe.statRow,
                  children: [
                    r.jsx(q, { variant: 'caption', color: 'dim', children: _.label }),
                    r.jsx('span', {
                      className: pe.statValue,
                      style: _.accent != null ? { color: Up[_.accent] } : void 0,
                      children: b,
                    }),
                  ],
                },
                _.label
              );
            }),
          }),
        h &&
          r.jsxs('div', {
            className: pe.lockedBadge,
            children: [
              r.jsx(Ct, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
              r.jsx(q, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
            ],
          }),
      ],
    }),
  });
}
function Ss(c) {
  return Math.pow(1.02, c);
}
function xs(c, s) {
  return Math.min(10, c * (1 + 0.03 * s));
}
const js = { laser: 120, cannon: 480, thunder: 84, cutter: 62 },
  Ts = { laser: 1, cannon: 0.5, thunder: 0.7, cutter: 2 };
function Gp(c) {
  const s = Math.round(js.laser * Ss(c)),
    u = Math.floor(1 + 0.1 * c),
    o = Math.round(xs(Ts.laser, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '貫通', value: u },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Vp(c) {
  const s = Math.round(js.cannon * Ss(c)),
    u = Math.round((30 + 0.5 * c) * 10) / 10,
    o = Math.round(xs(Ts.cannon, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '爆発半径', value: u, suffix: 'px' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function $p(c) {
  const s = Math.round(js.thunder * Ss(c)),
    u = Math.floor(7 + 0.1 * c),
    o = Math.round(xs(Ts.thunder, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '連鎖', value: u },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Yp(c) {
  const s = Math.round(js.cutter * Ss(c)),
    u = Math.round((80 + 0.5 * c) * 10) / 10,
    o = Math.floor(1 + 0.05 * c),
    m = Math.round(xs(Ts.cutter, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '旋回半径', value: u, suffix: 'px' },
    { label: '同時', value: o },
    { label: '連射', value: m, suffix: '/s' },
  ];
}
const Zp = [
  {
    kind: 'laser',
    name: 'LASER',
    description: '高速直進ビーム。貫通でき、連発で削り続ける。',
    activeSkill: 'Mega Beam',
    activeDesc: '画面端まで届く太いビームで全ヒット。CD: 20s',
    buildStats: Gp,
  },
  {
    kind: 'cannon',
    name: 'CANNON',
    description: '範囲爆発で群れを薙ぐ重火力。',
    activeSkill: 'Volley',
    activeDesc: '72°ずつ放射状に5発の砲弾を撃つ。CD: 25s',
    buildStats: Vp,
  },
  {
    kind: 'thunder',
    name: 'THUNDER',
    description: '隣接敵に連鎖する電撃。シールドに有効。',
    activeSkill: 'Plasma Discharge',
    activeDesc: 'ターゲットから連鎖数まで敵に跳ねる。CD: 30s',
    buildStats: $p,
  },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシン周囲を旋回する斬撃。',
    activeSkill: 'Overdrive',
    activeDesc: '8秒間、攻撃速度倍率×3。CD: 35s',
    buildStats: Yp,
  },
];
function Xp() {
  const c = k((s) => s.weaponLv);
  return r.jsx('div', {
    className: Mi.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: Zp.map((s) =>
      r.jsxs(
        'div',
        {
          className: Mi.weaponBlock,
          children: [
            r.jsx(m0, {
              weapon: s.kind,
              name: s.name,
              description: s.description,
              stats: s.buildStats(c),
              layout: 'wide',
            }),
            r.jsx(sl, {
              variant: 'sunken',
              padding: 'sm',
              className: Mi.activeCard,
              children: r.jsxs('div', {
                className: Mi.activeRow,
                children: [
                  r.jsx(q, {
                    variant: 'caption',
                    color: 'secondary',
                    className: Mi.activeName,
                    children: s.activeSkill,
                  }),
                  r.jsx(q, { variant: 'caption', color: 'dim', children: s.activeDesc }),
                ],
              }),
            }),
          ],
        },
        s.kind
      )
    ),
  });
}
const kp = '_tab_lutms_3',
  Qp = '_topRow_lutms_9',
  Kp = '_description_lutms_15',
  Jp = '_previewCard_lutms_21',
  Wp = '_previewLabel_lutms_25',
  Fp = '_impactGrid_lutms_32',
  Ip = '_impactRow_lutms_37',
  Pp = '_impactRowBordered_lutms_45',
  ty = '_impactLabel_lutms_49',
  ey = '_impactValues_lutms_55',
  ay = '_arrow_lutms_62',
  Je = {
    tab: kp,
    topRow: Qp,
    description: Kp,
    previewCard: Jp,
    previewLabel: Wp,
    impactGrid: Fp,
    impactRow: Ip,
    impactRowBordered: Pp,
    impactLabel: ty,
    impactValues: ey,
    arrow: ay,
  },
  ly = '_root_fjicv_2',
  ny = '_header_fjicv_15',
  iy = '_iconWrap_fjicv_22',
  cy = '_title_fjicv_34',
  sy = '_lvBadge_fjicv_47',
  uy = '_description_fjicv_60',
  oy = '_valueRow_fjicv_66',
  ry = '_valueBefore_fjicv_74',
  fy = '_valueAfter_fjicv_83',
  dy = '_arrow_fjicv_93',
  my = '_buttons_fjicv_100',
  hy = '_btnCol_fjicv_105',
  vy = '_btn_fjicv_105',
  gy = '_btnPrimary_fjicv_132',
  _y = '_btnSecondary_fjicv_139',
  py = '_btnWarning_fjicv_146',
  yy = '_costRow_fjicv_172',
  by = '_costNum_fjicv_181',
  Sy = '_costDisabled_fjicv_190',
  $t = {
    root: ly,
    header: ny,
    iconWrap: iy,
    title: cy,
    lvBadge: sy,
    description: uy,
    valueRow: oy,
    valueBefore: ry,
    valueAfter: fy,
    arrow: dy,
    buttons: my,
    btnCol: hy,
    btn: vy,
    btnPrimary: gy,
    btnSecondary: _y,
    btnWarning: py,
    costRow: yy,
    costNum: by,
    costDisabled: Sy,
  },
  xy = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  jy = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  Ty = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  Ay = { primary: $t.btnPrimary, secondary: $t.btnSecondary, warning: $t.btnWarning },
  Ny = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function Wo(c) {
  return c instanceof At ? c.toDisplay() : c.toLocaleString();
}
function mr({
  title: c,
  description: s,
  iconName: u,
  iconColor: o,
  currentLabel: m,
  before: d,
  after: h,
  beforeSuffix: g = '',
  currency: p = 'bolt',
  accent: _,
  options: b = [],
  maxed: E = !1,
  onUpgrade: j,
}) {
  const H = _ ?? Ty[p],
    L = xy[H],
    $ = o ?? L,
    U = Ay[H],
    vt = Ny[H];
  return r.jsxs('div', {
    className: $t.root,
    role: 'group',
    'aria-label': c,
    'data-maxed': E,
    children: [
      r.jsxs('div', {
        className: $t.header,
        children: [
          u != null &&
            r.jsx('span', {
              className: $t.iconWrap,
              children: r.jsx(Ct, { name: u, size: 14, color: $ }),
            }),
          r.jsx('span', { className: $t.title, children: c }),
          m != null &&
            !E &&
            r.jsx('span', {
              className: $t.lvBadge,
              style: { color: L, boxShadow: jy[H] },
              children: m,
            }),
          E &&
            r.jsx('span', {
              className: $t.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      s != null &&
        s.length > 0 &&
        r.jsx(q, { variant: 'caption', color: 'dim', className: $t.description, children: s }),
      d != null &&
        r.jsxs('div', {
          className: $t.valueRow,
          children: [
            r.jsxs('span', { className: $t.valueBefore, children: [Wo(d), g] }),
            h != null &&
              !E &&
              r.jsxs(r.Fragment, {
                children: [
                  r.jsx('span', { className: $t.arrow, children: '→' }),
                  r.jsxs('span', {
                    className: $t.valueAfter,
                    style: { color: L, textShadow: `0 0 5px ${vt}` },
                    children: [Wo(h), g],
                  }),
                ],
              }),
          ],
        }),
      !E &&
        b.length > 0 &&
        r.jsx('div', {
          className: $t.buttons,
          style: { gridTemplateColumns: `repeat(${b.length}, 1fr)` },
          children: b.map((F) => {
            const _t = F.disabled === !0;
            return r.jsxs(
              'div',
              {
                className: $t.btnCol,
                children: [
                  r.jsx('button', {
                    type: 'button',
                    className: `${$t.btn} ${U}`,
                    disabled: _t,
                    onClick: _t ? void 0 : () => (j == null ? void 0 : j(F.amount)),
                    children: F.amount,
                  }),
                  r.jsx('div', {
                    className: $t.costRow,
                    children: r.jsx('span', {
                      className: `${$t.costNum} ${_t ? $t.costDisabled : ''}`,
                      children: Wo(F.cost),
                    }),
                  }),
                ],
              },
              F.amount
            );
          }),
        }),
    ],
  });
}
function hr(c) {
  const s = Math.ceil(200 * Math.pow(1.12, c));
  return At.fromNumber(s);
}
function qh(c, s) {
  let u = At.ZERO;
  for (let o = 0; o < s; o++) u = u.add(hr(c + o));
  return u;
}
function Ey(c, s) {
  let u = s,
    o = 0;
  for (;;) {
    const m = hr(c + o);
    if (u.lt(m) || ((u = u.sub(m)), o++, o > 1e4)) break;
  }
  return o;
}
function Uh(c) {
  return Math.pow(1.02, c);
}
const Gh = { laser: 120 };
function zy(c) {
  const s = c + 1,
    u = Uh(c),
    o = Uh(s);
  return [
    { label: 'LASER DMG', before: Math.round(Gh.laser * u), after: Math.round(Gh.laser * o) },
    {
      label: 'CANNON 爆発半径',
      before: Math.round((30 + 0.5 * c) * 10) / 10,
      after: Math.round((30 + 0.5 * s) * 10) / 10,
      suffix: 'px',
    },
    { label: 'THUNDER 連鎖', before: Math.floor(7 + 0.1 * c), after: Math.floor(7 + 0.1 * s) },
    { label: 'CUTTER 同時', before: Math.floor(1 + 0.05 * c), after: Math.floor(1 + 0.05 * s) },
  ];
}
function My() {
  const c = k((L) => L.weaponLv),
    s = k((L) => L.alloy),
    u = k((L) => L.incrementWeaponLv),
    o = k((L) => L.setWeaponLv),
    m = k((L) => L.spendAlloy),
    d = hr(c),
    h = qh(c, 5),
    g = Ey(c, s),
    p = qh(c, g),
    _ = !s.lt(d),
    b = g >= 5,
    E = g >= 1,
    j = zy(c);
  function H(L) {
    L === '+1'
      ? m(d) && u()
      : L === '+5'
        ? m(h) && o(c + 5)
        : L === 'MAX' && g > 0 && m(p) && o(c + g);
  }
  return r.jsxs('div', {
    className: Je.tab,
    role: 'tabpanel',
    'aria-label': '武器強化',
    children: [
      r.jsxs('div', {
        className: Je.topRow,
        children: [
          r.jsx(q, {
            variant: 'caption',
            color: 'mid',
            className: Je.description,
            children: '全 4 武器に共通で効く強化です。',
          }),
          r.jsx(Hi, { currency: 'alloy', value: s, size: 'sm' }),
        ],
      }),
      r.jsx(mr, {
        title: '武器強化 Lv',
        iconName: 'spark',
        iconColor: 'var(--c-secondary)',
        currentLabel: `Lv ${c}`,
        before: c,
        after: c + 1,
        currency: 'alloy',
        accent: 'secondary',
        options: [
          { amount: '+1', cost: d, disabled: !_ },
          { amount: '+5', cost: h, disabled: !b },
          { amount: 'MAX', cost: p, disabled: !E },
        ],
        onUpgrade: H,
      }),
      r.jsxs(sl, {
        variant: 'sunken',
        padding: 'md',
        className: Je.previewCard,
        children: [
          r.jsx(q, {
            variant: 'label',
            color: 'dim',
            className: Je.previewLabel,
            children: '次 Lv での効果プレビュー',
          }),
          r.jsx('div', {
            className: Je.impactGrid,
            children: j.map((L, $) =>
              r.jsxs(
                'div',
                {
                  className: [Je.impactRow, $ > 0 ? Je.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    r.jsx(q, {
                      variant: 'caption',
                      color: 'mid',
                      className: Je.impactLabel,
                      children: L.label,
                    }),
                    r.jsxs('span', {
                      className: Je.impactValues,
                      children: [
                        r.jsx(gs, {
                          value: L.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: L.suffix,
                          decimals: L.suffix === 'px' ? 1 : 0,
                        }),
                        r.jsx('span', { className: Je.arrow, children: '→' }),
                        r.jsx(gs, {
                          value: L.after,
                          size: 'sm',
                          accentColor: 'secondary',
                          suffix: L.suffix,
                          decimals: L.suffix === 'px' ? 1 : 0,
                        }),
                      ],
                    }),
                  ],
                },
                L.label
              )
            ),
          }),
        ],
      }),
    ],
  });
}
const h0 = ft.createContext(null);
function Cy({ children: c, initialScreen: s }) {
  const [u, o] = ft.useState(s ?? 'title'),
    m = ft.useCallback((d) => {
      o(d);
    }, []);
  return r.jsx(h0.Provider, { value: { screen: u, navigate: m }, children: c });
}
function Ma() {
  const c = ft.useContext(h0);
  if (!c) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return c;
}
const wy = [
  { key: 'details', label: '武器詳細' },
  { key: 'upgrade', label: '共通強化' },
];
function Oy() {
  const [c, s] = ft.useState('details'),
    { screen: u, navigate: o } = Ma();
  return r.jsx(Dl, {
    header: r.jsx(Gi, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      tabBar: r.jsx(bs, { tabs: wy, value: c, onChange: s, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(Ui, { active: u, onChange: (m) => o(m) }),
    children: r.jsxs('div', {
      className: fg.content,
      children: [c === 'details' && r.jsx(Xp, {}), c === 'upgrade' && r.jsx(My, {})],
    }),
  });
}
const Ry = '_root_15ig1_1',
  Dy = '_overlayLayer_15ig1_10',
  Vh = { root: Ry, overlayLayer: Dy },
  By = '_root_1sbx5_3',
  Ly = '_rangeCircle_1sbx5_15',
  Hy = '_machine_1sbx5_28',
  qy = '_enemy_1sbx5_37',
  Uy = '_enemyUpper_1sbx5_48',
  Gy = '_enemyHpBar_1sbx5_51',
  An = { root: By, rangeCircle: Ly, machine: Hy, enemy: qy, enemyUpper: Uy, enemyHpBar: Gy },
  Vy = '_root_14p1r_1',
  $y = { root: Vy };
function Yy({ value: c, x: s, y: u, crit: o = !1, duration: m = 800, onDone: d }) {
  const h = ft.useId().replace(/:/g, 'dp'),
    g = `
    @keyframes ${h}-pop {
      0%   { transform: translate(-50%, 0) scale(${o ? 0.6 : 0.8}); opacity: 0; }
      15%  { transform: translate(-50%, -4px) scale(${o ? 1.15 : 1}); opacity: 1; }
      100% { transform: translate(-50%, -28px) scale(${o ? 1 : 0.95}); opacity: 0; }
    }
    .${h} {
      position: absolute;
      left: ${s}%;
      top: ${u}%;
      animation: ${h}-pop ${m}ms var(--ease-out) both;
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
      r.jsx('style', { dangerouslySetInnerHTML: { __html: g } }),
      r.jsx('div', {
        className: `${h} ${$y.root}`,
        onAnimationEnd: d,
        children: r.jsx(gs, {
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
const Zy = '_wrap_14rhu_1',
  Xy = { wrap: Zy },
  $h = 8;
function ky({ x: c, y: s, color: u = 'var(--c-text-mid)', duration: o = 480, onDone: m }) {
  const d = ft.useId().replace(/:/g, 'ed'),
    g = `
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
      background: radial-gradient(circle, ${u === 'var(--c-text-mid)' ? 'rgba(167,184,216,0.9)' : u}, transparent 65%);
      animation: ${d}-flash ${o}ms var(--ease-out) both;
    }
    .${d}-shard {
      position: absolute; left: 0; top: 0;
      width: 4px; height: 4px;
      background: ${u};
      box-shadow: 0 0 4px ${u};
      animation: ${d}-shard ${o}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${d}-flash, .${d}-shard { animation-duration: 1ms; opacity: 0; }
    }
  `,
    p = Array.from({ length: $h }, (_, b) =>
      r.jsx('div', { className: `${d}-shard`, style: { '--a': `${(b * 360) / $h}deg` } }, b)
    );
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: g } }),
      r.jsxs('div', {
        className: `${d}-wrap ${Xy.wrap}`,
        style: { left: `${c}%`, top: `${s}%` },
        onAnimationEnd: m,
        children: [r.jsx('div', { className: `${d}-flash` }), p],
      }),
    ],
  });
}
const Qy = '_wrap_14rhu_1',
  Ky = { wrap: Qy };
function Jy({ x: c, y: s, color: u = 'var(--c-primary-hi)', duration: o = 220, onDone: m }) {
  const d = ft.useId().replace(/:/g, 'eh'),
    h = `
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
      background: radial-gradient(circle, ${u}, transparent 60%);
      animation: ${d}-f ${o}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${d}-d { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: h } }),
      r.jsx('div', {
        className: `${d}-w ${Ky.wrap}`,
        style: { left: `${c}%`, top: `${s}%` },
        onAnimationEnd: m,
        children: r.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const Wy = '_root_2lc0r_2',
  Fy = '_boss_2lc0r_12',
  Iy = '_elite_2lc0r_16',
  Py = '_sizeSm_2lc0r_21',
  t2 = '_sizeMd_2lc0r_25',
  e2 = '_sizeLg_2lc0r_29',
  a2 = '_header_2lc0r_35',
  l2 = '_headerRight_2lc0r_42',
  n2 = '_hpText_2lc0r_50',
  za = {
    root: Wy,
    boss: Fy,
    elite: Iy,
    sizeSm: Py,
    sizeMd: t2,
    sizeLg: e2,
    header: a2,
    headerRight: l2,
    hpText: n2,
  },
  i2 = '_badge_12g3w_1',
  c2 = '_glow_12g3w_84',
  s2 = '_iconLeft_12g3w_112',
  wi = {
    badge: i2,
    'size-sm': '_size-sm_12g3w_15',
    'size-md': '_size-md_12g3w_20',
    'size-lg': '_size-lg_12g3w_25',
    'variant-neutral': '_variant-neutral_12g3w_30',
    'variant-tier': '_variant-tier_12g3w_36',
    'variant-elite': '_variant-elite_12g3w_42',
    'variant-boss': '_variant-boss_12g3w_48',
    'variant-patch-tier': '_variant-patch-tier_12g3w_54',
    'variant-info': '_variant-info_12g3w_60',
    'variant-success': '_variant-success_12g3w_66',
    'variant-warning': '_variant-warning_12g3w_72',
    'variant-danger': '_variant-danger_12g3w_78',
    glow: c2,
    iconLeft: s2,
  };
function Vi({
  text: c,
  variant: s = 'neutral',
  tier: u,
  size: o = 'md',
  glow: m = !1,
  iconLeft: d,
}) {
  let h;
  const g = s === 'default' ? 'neutral' : s;
  if (g === 'tier' && u != null) {
    const _ = Math.min(Math.max(1, Math.floor(u)), 12);
    h = { '--badge-color': `var(--c-tier-${Math.min(_, 10)})` };
  } else
    g === 'patch-tier' &&
      u != null &&
      (h = { '--badge-color': `var(--c-patch-t${Math.min(Math.max(1, Math.floor(u)), 5)})` });
  let p = c;
  return (
    p == null &&
      (g === 'tier' && u != null
        ? (p = `T${u}`)
        : g === 'patch-tier' && u != null
          ? (p = `T${u}`)
          : (p = '')),
    r.jsxs('span', {
      className: [wi.badge, wi[`variant-${g}`], wi[`size-${o}`], m ? wi.glow : '']
        .filter(Boolean)
        .join(' '),
      style: h,
      children: [
        d != null && r.jsx('span', { className: wi.iconLeft, 'aria-hidden': 'true', children: d }),
        p,
      ],
    })
  );
}
const u2 = '_root_gapod_2',
  o2 = '_sizeSm_gapod_10',
  r2 = '_sizeMd_gapod_14',
  f2 = '_sizeLg_gapod_18',
  d2 = '_fill_gapod_22',
  m2 = '_label_gapod_28',
  Nn = { root: u2, sizeSm: o2, sizeMd: r2, sizeLg: f2, fill: d2, label: m2 },
  h2 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-success)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  v2 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: 'var(--glow-success-md)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function vr({
  value: c,
  max: s,
  color: u = 'primary',
  size: o = 'md',
  variant: m = 'solid',
  showLabel: d = !1,
  label: h,
  glow: g = !1,
  reverse: p = !1,
}) {
  const _ = Math.max(1, s),
    b = Math.min(Math.max(0, c), _),
    E = (b / _) * 100,
    j = h2[u],
    H = g || m === 'neon' ? v2[u] : void 0,
    L = { sm: Nn.sizeSm, md: Nn.sizeMd, lg: Nn.sizeLg }[o],
    $ = {
      width: `${E}%`,
      backgroundColor: j,
      ...(H != null ? { boxShadow: H } : {}),
      ...(p ? { marginLeft: 'auto' } : {}),
    },
    U = h ?? `${b} / ${_}`;
  return r.jsxs('div', {
    className: `${Nn.root} ${L}`,
    role: 'progressbar',
    'aria-valuenow': b,
    'aria-valuemin': 0,
    'aria-valuemax': _,
    'aria-label': h ?? `${b} / ${_}`,
    children: [
      r.jsx('div', { className: Nn.fill, style: $ }),
      d && r.jsx('span', { className: Nn.label, children: U }),
    ],
  });
}
function g2(c, s) {
  if (s.isZero()) return 0;
  const u = parseFloat(c.toString()),
    o = parseFloat(s.toString());
  return o === 0 || isNaN(o) ? 0 : Math.min(1e3, Math.max(0, Math.round((u / o) * 1e3)));
}
const _2 = { sm: za.sizeSm, md: za.sizeMd, lg: za.sizeLg };
function p2({
  name: c,
  variant: s,
  current: u,
  max: o,
  tier: m,
  size: d = 'md',
  showValue: h = !0,
  type: g,
  currentHp: p,
  maxHp: _,
}) {
  const b = s ?? g ?? 'normal',
    E = u ?? p ?? 0,
    j = o ?? _ ?? 0,
    H = typeof E == 'number' ? At.fromNumber(E) : E,
    L = typeof j == 'number' ? At.fromNumber(j) : j,
    $ = g2(H, L),
    U = $ <= 250,
    vt = U ? 'hp-low' : 'hp',
    F = d === 'lg' ? 'lg' : d === 'sm' ? 'sm' : 'md';
  let _t;
  return (
    b === 'boss'
      ? (_t = { boxShadow: 'var(--glow-danger-md)' })
      : b === 'elite' && (_t = { boxShadow: 'var(--glow-purple-md)' }),
    r.jsxs('div', {
      className: [za.root, b === 'boss' ? za.boss : '', b === 'elite' ? za.elite : '', _2[d]]
        .filter(Boolean)
        .join(' '),
      style: _t,
      children: [
        r.jsxs('div', {
          className: za.header,
          children: [
            r.jsx(q, { variant: 'label', color: 'mid', children: c }),
            r.jsxs('div', {
              className: za.headerRight,
              children: [
                b === 'normal' &&
                  m !== void 0 &&
                  r.jsxs(q, { variant: 'numeric-s', color: 'dim', children: ['T', m] }),
                (b === 'elite' || b === 'boss') &&
                  r.jsx(Vi, { text: b.toUpperCase(), variant: b, glow: b === 'boss' }),
              ],
            }),
          ],
        }),
        r.jsx(vr, { value: $, max: 1e3, color: vt, size: F, glow: U }),
        h &&
          r.jsx('div', {
            className: za.hpText,
            children: r.jsxs(q, {
              variant: 'numeric-s',
              color: U ? 'danger' : 'mid',
              children: [H.toDisplay(), ' / ', L.toDisplay()],
            }),
          }),
      ],
    })
  );
}
function y2(c) {
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
function b2(c) {
  return c !== 'normal';
}
function S2(c) {
  return c === 'boss' ? 'boss' : c === 'elite' || c === 'miniboss' ? 'elite' : 'normal';
}
function x2(c) {
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
function j2({
  enemies: c,
  machinePosition: s = { x: 50, y: 50 },
  damageEvents: u,
  hitEvents: o,
  deathEvents: m,
  onDamageDone: d,
  onHitDone: h,
  onDeathDone: g,
  range: p,
}) {
  const _ = s.x,
    b = s.y,
    E = p * 2;
  return r.jsxs('div', {
    className: An.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: [
      r.jsx('div', {
        className: An.rangeCircle,
        style: { left: `${_}%`, top: `${b}%`, width: `${E}%` },
        'aria-hidden': !0,
      }),
      c.map((j) => {
        const H = b2(j.kind),
          L = x2(j.kind),
          $ = j.kind === 'boss' ? 32 : j.kind === 'miniboss' ? 28 : 22;
        return r.jsxs(
          'div',
          {
            className: [An.enemy, H ? An.enemyUpper : ''].filter(Boolean).join(' '),
            style: { left: `${j.position.x}%`, top: `${j.position.y}%` },
            'aria-label': `${j.kind}`,
            children: [
              r.jsx(Ct, { name: y2(j.kind), size: $, color: L }),
              H &&
                r.jsx('div', {
                  className: An.enemyHpBar,
                  children: r.jsx(p2, {
                    name: j.kind,
                    variant: S2(j.kind),
                    current: j.hp,
                    max: j.hp,
                    size: j.kind === 'boss' ? 'lg' : 'sm',
                    showValue: !1,
                  }),
                }),
            ],
          },
          j.id
        );
      }),
      r.jsx('div', {
        className: An.machine,
        style: { left: `${_}%`, top: `${b}%` },
        'aria-label': 'マシン',
        children: r.jsx(Ct, { name: 'tower', size: 40, color: 'var(--c-primary)' }),
      }),
      u.map((j) =>
        r.jsx(
          Yy,
          {
            value: Number(j.value.toString()),
            x: j.x,
            y: j.y,
            crit: j.crit,
            onDone: () => (d == null ? void 0 : d(j.id)),
          },
          j.id
        )
      ),
      o.map((j) =>
        r.jsx(Jy, { x: j.x, y: j.y, onDone: () => (h == null ? void 0 : h(j.id)) }, j.id)
      ),
      m.map((j) =>
        r.jsx(ky, { x: j.x, y: j.y, onDone: () => (g == null ? void 0 : g(j.id)) }, j.id)
      ),
    ],
  });
}
const T2 = '_root_65dgz_2',
  A2 = '_topRow_65dgz_13',
  N2 = '_screwArea_65dgz_20',
  E2 = '_weaponSlots_65dgz_26',
  z2 = '_activeArea_65dgz_34',
  M2 = '_activeButton_65dgz_42',
  C2 = '_activeDisabled_65dgz_55',
  w2 = '_bottomRow_65dgz_61',
  O2 = '_sysButtons_65dgz_69',
  Ta = {
    root: T2,
    topRow: A2,
    screwArea: N2,
    weaponSlots: E2,
    activeArea: z2,
    activeButton: M2,
    activeDisabled: C2,
    bottomRow: w2,
    sysButtons: O2,
  },
  R2 = '_root_x9cjr_1',
  D2 = '_svg_x9cjr_9',
  B2 = '_track_x9cjr_15',
  L2 = '_arc_x9cjr_19',
  H2 = '_center_x9cjr_28',
  q2 = '_labelText_x9cjr_37',
  En = { root: R2, svg: D2, track: B2, arc: L2, center: H2, labelText: q2 },
  U2 = { xs: 20, sm: 32, md: 48, lg: 64 },
  G2 = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  V2 = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function v0({
  value: c,
  max: s,
  size: u = 24,
  color: o = 'primary',
  thickness: m = 3,
  glow: d = !1,
  showLabel: h = !1,
  withLabel: g = !1,
  label: p,
  children: _,
}) {
  const b = typeof u == 'number' ? u : U2[u],
    E =
      s != null
        ? Math.min(Math.max(0, c), Math.max(1, s)) / Math.max(1, s)
        : Math.min(Math.max(0, c), 100) / 100,
    j = s != null ? Math.min(Math.max(0, c), Math.max(1, s)) : c,
    H = s != null ? Math.max(1, s) : 100,
    L = G2[o],
    $ = d ? V2[o] : void 0,
    U = b / 2,
    vt = U - m / 2,
    F = 2 * Math.PI * vt,
    _t = F * (1 - E),
    ae = h || g || _ != null,
    Dt = p ?? `${Math.round(E * 100)}%`;
  return r.jsxs('span', {
    className: En.root,
    style: { width: b, height: b },
    children: [
      r.jsxs('svg', {
        className: En.svg,
        width: b,
        height: b,
        viewBox: `0 0 ${b} ${b}`,
        xmlns: 'http://www.w3.org/2000/svg',
        role: 'progressbar',
        'aria-valuenow': j,
        'aria-valuemin': 0,
        'aria-valuemax': H,
        'aria-label': p ?? `${j} / ${H}`,
        children: [
          r.jsx('circle', {
            className: En.track,
            cx: U,
            cy: U,
            r: vt,
            fill: 'none',
            strokeWidth: m,
          }),
          r.jsx('circle', {
            className: En.arc,
            cx: U,
            cy: U,
            r: vt,
            fill: 'none',
            stroke: L,
            strokeWidth: m,
            strokeLinecap: 'round',
            strokeDasharray: F,
            strokeDashoffset: _t,
            style: $ != null ? { filter: `drop-shadow(0 0 4px ${L})` } : void 0,
            transform: `rotate(-90 ${U} ${U})`,
          }),
        ],
      }),
      ae &&
        r.jsx('span', {
          className: En.center,
          children:
            _ ?? r.jsx('span', { className: En.labelText, style: { color: L }, children: Dt }),
        }),
    ],
  });
}
const $2 = '_root_8pbri_1',
  Y2 = '_disabled_8pbri_8',
  Z2 = '_segment_8pbri_13',
  X2 = '_selected_8pbri_27',
  k2 = '_unselected_8pbri_33',
  zn = {
    root: $2,
    disabled: Y2,
    segment: Z2,
    selected: X2,
    unselected: k2,
    'size-sm': '_size-sm_8pbri_42',
    'size-md': '_size-md_8pbri_47',
  },
  g0 = ({ options: c, value: s, onChange: u, size: o = 'md', disabled: m = !1 }) =>
    r.jsx('div', {
      className: [zn.root, zn[`size-${o}`], m ? zn.disabled : ''].join(' '),
      role: 'group',
      children: c.map((d) => {
        const h = d.value === s;
        return r.jsx(
          'button',
          {
            type: 'button',
            role: 'radio',
            'aria-checked': h,
            className: [zn.segment, h ? zn.selected : zn.unselected].join(' '),
            onClick: () => {
              m || u(d.value);
            },
            disabled: m,
            children: d.label,
          },
          String(d.value)
        );
      }),
    }),
  Q2 = '_wrapper_zxa3i_9',
  K2 = '_disabled_zxa3i_15',
  J2 = '_off_zxa3i_31',
  W2 = '_on_zxa3i_35',
  F2 = '_accent_primary_zxa3i_35',
  I2 = '_accent_secondary_zxa3i_39',
  P2 = '_accent_success_zxa3i_43',
  tb = '_size_md_zxa3i_52',
  eb = '_knob_zxa3i_56',
  ab = '_size_sm_zxa3i_66',
  lb = '_labelGroup_zxa3i_89',
  nb = '_label_zxa3i_89',
  ib = '_description_zxa3i_102',
  We = {
    wrapper: Q2,
    disabled: K2,
    switch: '_switch_zxa3i_22',
    off: J2,
    on: W2,
    accent_primary: F2,
    accent_secondary: I2,
    accent_success: P2,
    size_md: tb,
    knob: eb,
    size_sm: ab,
    labelGroup: lb,
    label: nb,
    description: ib,
  },
  gr = ({
    checked: c,
    onChange: s,
    disabled: u = !1,
    label: o,
    description: m,
    accent: d = 'primary',
    size: h = 'md',
  }) => {
    const g = () => {
      u || s(!c);
    };
    return r.jsxs('label', {
      className: [We.wrapper, u ? We.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': u,
      children: [
        r.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': c,
          'aria-disabled': u,
          className: [We.switch, c ? We.on : We.off, We[`size_${h}`], We[`accent_${d}`]]
            .filter(Boolean)
            .join(' '),
          onClick: g,
          disabled: u,
          children: r.jsx('span', { className: We.knob }),
        }),
        (o || m) &&
          r.jsxs('span', {
            className: We.labelGroup,
            children: [
              o && r.jsx('span', { className: We.label, children: o }),
              m && r.jsx('span', { className: We.description, children: m }),
            ],
          }),
      ],
    });
  },
  cb = '_root_afe45_2',
  sb = '_swapDisabled_afe45_14',
  ub = '_active_afe45_20',
  ob = '_onCd_afe45_27',
  rb = '_iconWrap_afe45_27',
  fb = '_cdOverlay_afe45_47',
  db = '_cdProgress_afe45_57',
  mb = '_swapOverlay_afe45_68',
  ll = {
    root: cb,
    swapDisabled: sb,
    active: ub,
    onCd: ob,
    iconWrap: rb,
    cdOverlay: fb,
    cdProgress: db,
    swapOverlay: mb,
  },
  hb = { sm: 40, md: 52, lg: 64 },
  vb = { sm: 18, md: 24, lg: 30 };
function gb({
  weapon: c,
  active: s = !1,
  ready: u = !1,
  cdProgress: o = 100,
  swapDisabled: m = !1,
  size: d = 'md',
  onClick: h,
}) {
  const g = hb[d],
    p = vb[d],
    _ = o < 100,
    b = [ll.root, s ? ll.active : '', _ ? ll.onCd : '', m ? ll.swapDisabled : '']
      .filter(Boolean)
      .join(' ');
  return r.jsxs('button', {
    type: 'button',
    className: b,
    style: { width: g, height: g, minWidth: g, minHeight: g },
    onClick: m ? void 0 : h,
    disabled: m && h == null,
    'aria-label': `${c} weapon slot${s ? ' (active)' : ''}${_ ? ` (cooldown ${o}%)` : u ? ' (ready)' : ''}`,
    'aria-pressed': s,
    children: [
      r.jsx('span', {
        className: ll.iconWrap,
        children: r.jsx(Ct, {
          name: c,
          size: p,
          color: s ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      _ &&
        r.jsxs(r.Fragment, {
          children: [
            r.jsx('span', { className: ll.cdOverlay, 'aria-hidden': 'true' }),
            r.jsx('span', {
              className: ll.cdProgress,
              'aria-hidden': 'true',
              children: r.jsx(v0, {
                value: o,
                max: 100,
                size: g - 4,
                color: 'cd',
                thickness: d === 'sm' ? 2 : 3,
              }),
            }),
          ],
        }),
      m && r.jsx('span', { className: ll.swapOverlay, 'aria-hidden': 'true' }),
    ],
  });
}
const Yh = ['laser', 'cannon', 'thunder', 'cutter'],
  _b = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
  ];
function pb({
  screw: c,
  equippedWeapon: s,
  weaponCds: u,
  activeCd: o,
  activeMax: m,
  isAutoActive: d,
  onSwitchWeapon: h,
  onActivate: g,
  onToggleAuto: p,
  gameSpeed: _,
  onSpeedChange: b,
  isPaused: E,
  onTogglePause: j,
  onOpenMenu: H,
  onOpenScreenSaver: L,
}) {
  const $ = o > 0,
    U = d || $,
    vt = Yh.some((F) => F !== s && (u[F] ?? 100) < 100);
  return r.jsxs('div', {
    className: Ta.root,
    children: [
      r.jsxs('div', {
        className: Ta.topRow,
        children: [
          r.jsx('div', {
            className: Ta.screwArea,
            children: r.jsx(Hi, { currency: 'screw', value: c, size: 'md' }),
          }),
          r.jsx('div', {
            className: Ta.weaponSlots,
            children: Yh.map((F) =>
              r.jsx(
                gb,
                {
                  weapon: F,
                  active: F === s,
                  cdProgress: u[F] ?? 100,
                  swapDisabled: vt && F !== s,
                  size: 'md',
                  onClick: () => {
                    h(F);
                  },
                },
                F
              )
            ),
          }),
          r.jsxs('div', {
            className: Ta.activeArea,
            children: [
              r.jsx('button', {
                type: 'button',
                className: [Ta.activeButton, U ? Ta.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: U ? void 0 : g,
                disabled: U,
                'aria-label': `アクティブスキル発動${$ ? ' (クールダウン中)' : d ? ' (自動モード)' : ''}`,
                children: r.jsx(v0, {
                  value: $ ? o : m,
                  max: m > 0 ? m : 1,
                  size: 56,
                  color: $ ? 'cd' : 'primary',
                  glow: !$ && !d,
                  thickness: 4,
                  children: r.jsx(Ct, {
                    name: 'lightning',
                    size: 24,
                    color: U ? 'var(--c-text-disabled)' : 'var(--c-primary)',
                  }),
                }),
              }),
              r.jsx(gr, {
                checked: d,
                onChange: p,
                label: '自動',
                size: 'sm',
                accent: 'secondary',
              }),
            ],
          }),
        ],
      }),
      r.jsxs('div', {
        className: Ta.bottomRow,
        children: [
          r.jsx(g0, { options: _b, value: _, onChange: b, size: 'sm' }),
          r.jsxs('div', {
            className: Ta.sysButtons,
            children: [
              r.jsx(ds, {
                icon: E ? 'play' : 'pause',
                label: E ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: E,
                onClick: j,
              }),
              r.jsx(ds, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: H,
              }),
              r.jsx(ds, {
                icon: 'ice',
                label: 'スクリーンセーバーを起動',
                size: 'md',
                variant: 'ghost',
                onClick: L,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const yb = '_root_tql5d_2',
  bb = '_hpRow_tql5d_12',
  Sb = '_hpBar_tql5d_18',
  xb = '_waveCount_tql5d_23',
  us = { root: yb, hpRow: bb, hpBar: Sb, waveCount: xb },
  jb = '_root_nxl33_2',
  Tb = '_boss_nxl33_14',
  Ab = '_header_nxl33_20',
  Nb = '_waveLabel_nxl33_26',
  Eb = '_waveNum_nxl33_35',
  zb = '_milestone_nxl33_41',
  Mb = '_milestoneText_nxl33_48',
  Cb = '_seconds_nxl33_58',
  Aa = {
    root: jb,
    boss: Tb,
    header: Ab,
    waveLabel: Nb,
    waveNum: Eb,
    milestone: zb,
    milestoneText: Mb,
    seconds: Cb,
    'size-sm': '_size-sm_nxl33_64',
    'size-md': '_size-md_nxl33_72',
    'size-lg': '_size-lg_nxl33_76',
  },
  wb = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  },
  Ob = { sm: 'var(--fs-label)', md: 'var(--fs-caption)', lg: 'var(--fs-body)' };
function Rb({
  waveNumber: c,
  secondsLeft: s,
  secondsMax: u,
  nextMilestone: o,
  showSeconds: m = !0,
  size: d = 'md',
}) {
  const h = (o == null ? void 0 : o.kind) === 'boss',
    g = o != null ? wb[o.kind] : null;
  return r.jsxs('div', {
    className: [Aa.root, Aa[`size-${d}`], h ? Aa.boss : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Aa.header,
        children: [
          r.jsxs('span', {
            className: Aa.waveLabel,
            style: { fontSize: Ob[d] },
            children: ['WAVE ', r.jsx('span', { className: Aa.waveNum, children: c })],
          }),
          g != null &&
            o != null &&
            r.jsxs('span', {
              className: Aa.milestone,
              style: { color: g.color },
              children: [
                r.jsx(Ct, { name: g.iconName, size: 12, color: g.color }),
                r.jsxs('span', { className: Aa.milestoneText, children: [g.label, ' @', o.wave] }),
              ],
            }),
          m &&
            r.jsx('span', {
              className: Aa.seconds,
              children: r.jsxs(q, { variant: 'numeric-s', color: 'mid', children: [s, 's'] }),
            }),
        ],
      }),
      r.jsx(vr, {
        value: s,
        max: Math.max(1, u),
        color: h ? 'secondary' : 'wave',
        size: d === 'lg' ? 'md' : 'sm',
        glow: h,
      }),
    ],
  });
}
function Db(c, s) {
  if (s.isZero()) return 0;
  const u = parseFloat(c.toString()),
    o = parseFloat(s.toString());
  return o === 0 || isNaN(o) ? 0 : Math.min(1e3, Math.max(0, Math.round((u / o) * 1e3)));
}
function Bb({
  hpCurrent: c,
  hpMax: s,
  tier: u,
  wave: o,
  totalWaves: m,
  secondsRemaining: d,
  secondsTotal: h,
  isBossWave: g = !1,
  nextMilestone: p,
}) {
  const _ = Db(c, s),
    b = _ < 300;
  return r.jsxs('div', {
    className: us.root,
    children: [
      r.jsxs('div', {
        className: us.hpRow,
        children: [
          r.jsx(Vi, { variant: 'tier', tier: u, size: 'sm', glow: g }),
          r.jsx('div', {
            className: us.hpBar,
            children: r.jsx(vr, {
              value: _,
              max: 1e3,
              color: b ? 'hp-low' : 'hp',
              size: 'md',
              variant: 'neon',
              glow: b,
              showLabel: !0,
              label: `${c.toDisplay()} / ${s.toDisplay()}`,
            }),
          }),
          r.jsxs(q, {
            variant: 'label',
            color: g ? 'secondary' : 'mid',
            className: us.waveCount,
            children: [o, '/', m],
          }),
        ],
      }),
      r.jsx(Rb, {
        waveNumber: o,
        secondsLeft: d,
        secondsMax: h,
        nextMilestone: p,
        showSeconds: !0,
        size: 'sm',
      }),
    ],
  });
}
const Lb = '_card_1o3jz_1',
  Hb = '_header_1o3jz_8',
  qb = '_soundSection_1o3jz_13',
  Ub = '_sliderRow_1o3jz_19',
  Gb = '_sliderLabel_1o3jz_26',
  Vb = '_sliderValue_1o3jz_31',
  $b = '_divider_1o3jz_38',
  Yb = '_actions_1o3jz_44',
  Fe = {
    card: Lb,
    header: Hb,
    soundSection: qb,
    sliderRow: Ub,
    sliderLabel: Gb,
    sliderValue: Vb,
    divider: $b,
    actions: Yb,
  },
  Zb = '_button_jiqmh_1',
  Xb = '_fullWidth_jiqmh_109',
  kb = '_iconLeft_jiqmh_113',
  Qb = '_iconRight_jiqmh_114',
  Kb = '_label_jiqmh_120',
  zl = {
    button: Zb,
    'variant-primary': '_variant-primary_jiqmh_25',
    'variant-secondary': '_variant-secondary_jiqmh_42',
    'variant-danger': '_variant-danger_jiqmh_59',
    'variant-ghost': '_variant-ghost_jiqmh_75',
    'size-sm': '_size-sm_jiqmh_88',
    'size-md': '_size-md_jiqmh_95',
    'size-lg': '_size-lg_jiqmh_102',
    fullWidth: Xb,
    iconLeft: kb,
    iconRight: Qb,
    label: Kb,
  };
function ye({
  label: c,
  variant: s = 'primary',
  size: u = 'md',
  fullWidth: o = !1,
  iconLeft: m,
  iconRight: d,
  disabled: h = !1,
  onClick: g,
  type: p = 'button',
}) {
  return r.jsxs('button', {
    type: p,
    className: [zl.button, zl[`variant-${s}`], zl[`size-${u}`], o ? zl.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: g,
    'aria-disabled': h,
    children: [
      m != null && r.jsx('span', { className: zl.iconLeft, 'aria-hidden': 'true', children: m }),
      r.jsx('span', { className: zl.label, children: c }),
      d != null && r.jsx('span', { className: zl.iconRight, 'aria-hidden': 'true', children: d }),
    ],
  });
}
const Jb = '_overlay_756cc_12',
  Wb = '_fullscreen_756cc_19',
  Fb = '_absolute_756cc_25',
  Ib = '_alignCenter_756cc_31',
  Pb = '_alignTop_756cc_36',
  tS = '_alignBottom_756cc_41',
  eS = '_content_756cc_46',
  Ol = {
    overlay: Jb,
    fullscreen: Wb,
    absolute: Fb,
    alignCenter: Ib,
    alignTop: Pb,
    alignBottom: tS,
    content: eS,
  },
  aS = { soft: 0.45, normal: 0.7, heavy: 0.8 },
  lS = { center: Ol.alignCenter, top: Ol.alignTop, bottom: Ol.alignBottom };
function As({
  fullscreen: c = !0,
  children: s,
  onClose: u,
  dismissible: o = !0,
  dimLevel: m = 'normal',
  blur: d = 0,
  align: h = 'center',
  style: g,
  open: p,
}) {
  const _ = () => {
      o && u && u();
    },
    b = (H) => {
      H.stopPropagation();
    },
    j = {
      background: `rgba(4, 6, 13, ${aS[m]})`,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...g,
    };
  return r.jsx('div', {
    className: [Ol.overlay, c ? Ol.fullscreen : Ol.absolute, lS[h]].join(' '),
    style: j,
    onClick: _,
    role: 'presentation',
    'aria-modal': 'true',
    children: r.jsx('div', { className: Ol.content, onClick: b, children: s }),
  });
}
const nS = '_wrapper_131tr_1',
  iS = '_disabled_131tr_5',
  cS = '_input_131tr_18',
  os = {
    wrapper: nS,
    disabled: iS,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: cS,
  },
  ps = ({
    value: c,
    min: s = 0,
    max: u = 1,
    step: o = 0.01,
    onChange: m,
    color: d = 'primary',
    disabled: h = !1,
  }) => {
    const g = u === s ? 0 : ((c - s) / (u - s)) * 100,
      p = (b) => {
        h || m(parseFloat(b.target.value));
      },
      _ = { '--slider-fill-pct': `${g}%` };
    return r.jsx('div', {
      className: [os.wrapper, os[`color-${d}`], h ? os.disabled : ''].join(' '),
      style: _,
      children: r.jsx('input', {
        type: 'range',
        className: os.input,
        min: s,
        max: u,
        step: o,
        value: c,
        onChange: p,
        disabled: h,
        'aria-valuenow': c,
        'aria-valuemin': s,
        'aria-valuemax': u,
      }),
    });
  },
  sS = '_dialog_49iek_13',
  uS = '_card_49iek_20',
  oS = '_titleRow_49iek_27',
  rS = '_titleIcon_49iek_33',
  fS = '_title_49iek_27',
  dS = '_message_49iek_46',
  mS = '_actions_49iek_50',
  hS = '_variantDanger_49iek_57',
  nl = {
    dialog: sS,
    card: uS,
    titleRow: oS,
    titleIcon: rS,
    title: fS,
    message: dS,
    actions: mS,
    variantDanger: hS,
  };
function _0({
  open: c,
  title: s,
  message: u,
  iconName: o,
  confirmLabel: m = '確定',
  cancelLabel: d = 'キャンセル',
  onConfirm: h,
  onCancel: g,
  variant: p = 'default',
}) {
  return c
    ? r.jsx(As, {
        open: c,
        onClose: g,
        dismissible: !0,
        children: r.jsx('div', {
          className: [nl.dialog, p === 'danger' ? nl.variantDanger : ''].filter(Boolean).join(' '),
          children: r.jsxs(sl, {
            variant: 'elevated',
            padding: 'lg',
            className: nl.card,
            children: [
              r.jsxs('div', {
                className: nl.titleRow,
                children: [
                  o != null &&
                    r.jsx('span', {
                      className: nl.titleIcon,
                      'aria-hidden': 'true',
                      children: r.jsx(Ct, {
                        name: o,
                        size: 20,
                        color: p === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  r.jsx(q, { variant: 'heading-3', as: 'h2', className: nl.title, children: s }),
                ],
              }),
              u != null &&
                u.length > 0 &&
                r.jsx(q, { variant: 'body', color: 'mid', className: nl.message, children: u }),
              r.jsxs('div', {
                className: nl.actions,
                children: [
                  r.jsx(ye, { label: d, variant: 'ghost', fullWidth: !0, onClick: g }),
                  r.jsx(ye, {
                    label: m,
                    variant: p === 'danger' ? 'danger' : 'primary',
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
function vS({
  open: c,
  bgmVolume: s,
  seVolume: u,
  onBgmChange: o,
  onSeChange: m,
  onRetreat: d,
  onClose: h,
}) {
  const [g, p] = ft.useState(!1);
  if (!c) return null;
  const _ = () => {
      p(!0);
    },
    b = () => {
      (p(!1), d());
    },
    E = () => {
      p(!1);
    };
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx(As, {
        open: c,
        onClose: h,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !g,
        children: r.jsxs(sl, {
          variant: 'elevated',
          padding: 'lg',
          className: Fe.card,
          children: [
            r.jsx('div', {
              className: Fe.header,
              children: r.jsx(q, {
                variant: 'heading-2',
                as: 'h2',
                align: 'center',
                children: 'メニュー',
              }),
            }),
            r.jsxs('div', {
              className: Fe.soundSection,
              children: [
                r.jsxs('div', {
                  className: Fe.sliderRow,
                  children: [
                    r.jsx(q, {
                      variant: 'label',
                      color: 'mid',
                      className: Fe.sliderLabel,
                      children: 'BGM',
                    }),
                    r.jsx(q, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: Fe.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(ps, { value: s, min: 0, max: 1, step: 0.01, onChange: o, color: 'primary' }),
                r.jsxs('div', {
                  className: Fe.sliderRow,
                  children: [
                    r.jsx(q, {
                      variant: 'label',
                      color: 'mid',
                      className: Fe.sliderLabel,
                      children: 'SE',
                    }),
                    r.jsx(q, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: Fe.sliderValue,
                      children: Math.round(u * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(ps, { value: u, min: 0, max: 1, step: 0.01, onChange: m, color: 'primary' }),
              ],
            }),
            r.jsx('div', { className: Fe.divider, role: 'separator' }),
            r.jsxs('div', {
              className: Fe.actions,
              children: [
                r.jsx(ye, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: _ }),
                r.jsx(ye, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: h }),
              ],
            }),
          ],
        }),
      }),
      r.jsx(_0, {
        open: g,
        title: '撤退しますか？',
        message: 'バトルを終了して撤退します。獲得リソースはリザルト画面で確認できます。',
        confirmLabel: '撤退する',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: b,
        onCancel: E,
      }),
    ],
  });
}
const gS = '_card_1fzt0_2',
  _S = '_header_1fzt0_14',
  pS = '_statusText_1fzt0_19',
  yS = '_section_1fzt0_23',
  bS = '_sectionTitle_1fzt0_29',
  SS = '_statsGrid_1fzt0_35',
  xS = '_statItem_1fzt0_41',
  jS = '_rewardList_1fzt0_52',
  TS = '_rewardCurrency_1fzt0_58',
  AS = '_patchList_1fzt0_66',
  NS = '_patchItem_1fzt0_72',
  ES = '_actions_1fzt0_87',
  Jt = {
    card: gS,
    header: _S,
    statusText: pS,
    section: yS,
    sectionTitle: bS,
    statsGrid: SS,
    statItem: xS,
    rewardList: jS,
    rewardCurrency: TS,
    patchList: AS,
    patchItem: NS,
    actions: ES,
  },
  zS = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  MS = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function CS(c) {
  const s = Math.floor(c / 60),
    u = Math.floor(c % 60);
  return `${s.toString().padStart(2, '0')}:${u.toString().padStart(2, '0')}`;
}
function wS({
  open: c,
  status: s,
  reachedTier: u,
  reachedWave: o,
  killed: m,
  elapsedSec: d,
  reward: h,
  onClose: g,
}) {
  if (!c) return null;
  const p = zS[s],
    _ = MS[s];
  return r.jsx(As, {
    open: c,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: r.jsxs(sl, {
      variant: 'elevated',
      padding: 'lg',
      className: Jt.card,
      children: [
        r.jsx('div', {
          className: Jt.header,
          children: r.jsx(q, {
            variant: 'heading-1',
            as: 'h2',
            color: _,
            align: 'center',
            className: Jt.statusText,
            children: p,
          }),
        }),
        r.jsxs('div', {
          className: Jt.section,
          children: [
            r.jsx(q, {
              variant: 'label',
              color: 'mid',
              className: Jt.sectionTitle,
              children: 'バトル記録',
            }),
            r.jsxs('div', {
              className: Jt.statsGrid,
              children: [
                r.jsxs('div', {
                  className: Jt.statItem,
                  children: [
                    r.jsx(q, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    r.jsx(q, { variant: 'numeric-m', color: 'primary', children: u.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Jt.statItem,
                  children: [
                    r.jsx(q, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    r.jsx(q, { variant: 'numeric-m', color: 'primary', children: o.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Jt.statItem,
                  children: [
                    r.jsx(q, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    r.jsx(q, { variant: 'numeric-m', color: 'primary', children: m.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Jt.statItem,
                  children: [
                    r.jsx(q, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    r.jsx(q, { variant: 'numeric-m', color: 'primary', children: CS(d) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        r.jsxs('div', {
          className: Jt.section,
          children: [
            r.jsx(q, {
              variant: 'label',
              color: 'mid',
              className: Jt.sectionTitle,
              children: '獲得',
            }),
            r.jsxs('div', {
              className: Jt.rewardList,
              children: [
                r.jsx('div', {
                  className: Jt.rewardCurrency,
                  children: r.jsx(Hi, { currency: 'bolt', value: h.bolt, size: 'lg' }),
                }),
                r.jsx('div', {
                  className: Jt.rewardCurrency,
                  children: r.jsx(Hi, { currency: 'alloy', value: h.alloy, size: 'lg' }),
                }),
                h.patches.length > 0 &&
                  r.jsx('div', {
                    className: Jt.patchList,
                    children: h.patches.map((b, E) =>
                      r.jsxs(
                        'div',
                        {
                          className: Jt.patchItem,
                          children: [
                            r.jsx(q, { variant: 'body', truncate: !0, children: b.name }),
                            r.jsxs(q, {
                              variant: 'caption',
                              color: 'mid',
                              children: ['Tier ', b.tier.toString()],
                            }),
                            r.jsxs(q, {
                              variant: 'numeric-s',
                              color: 'secondary',
                              children: ['x', b.count.toString()],
                            }),
                          ],
                        },
                        E
                      )
                    ),
                  }),
                h.patches.length === 0 &&
                  r.jsx(q, { variant: 'caption', color: 'dim', children: 'パッチドロップなし' }),
              ],
            }),
          ],
        }),
        r.jsx('div', {
          className: Jt.actions,
          children: r.jsx(ye, {
            label: '出撃準備へ',
            variant: 'primary',
            fullWidth: !0,
            onClick: g,
          }),
        }),
      ],
    }),
  });
}
const OS = [
  { key: 'attackMul', title: '攻撃力倍率', iconName: 'laser', baseCost: 10, costGrowth: 1.3 },
  {
    key: 'attackSpeedMul',
    title: '攻撃速度倍率',
    iconName: 'lightning',
    baseCost: 10,
    costGrowth: 1.3,
  },
  { key: 'hpMul', title: 'HP 倍率', iconName: 'heart', baseCost: 10, costGrowth: 1.3 },
  { key: 'screwGainMul', title: 'ネジ獲得倍率', iconName: 'screw', baseCost: 50, costGrowth: 1.4 },
];
function _r(c, s) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, s));
}
function Zh(c) {
  return 1 + 0.1 * c;
}
function RS(c, s, u) {
  let o = 0;
  for (let m = 0; m < u; m++) o += _r(c, s + m);
  return o;
}
function DS(c, s, u) {
  let o = At.ZERO,
    m = 0;
  for (;;) {
    const d = At.fromNumber(_r(c, s + m)),
      h = o.add(d);
    if (h.gt(u) || ((o = h), m++, m >= 1e4)) break;
  }
  return { lvDelta: m, totalCost: o };
}
const BS = '_inner_1ld24_2',
  LS = '_grid_1ld24_7',
  Xh = { inner: BS, grid: LS },
  HS = '_sheet_k47pw_38',
  qS = '_edgeBottom_k47pw_43',
  US = '_content_k47pw_49',
  GS = '_edgeTop_k47pw_55',
  VS = '_edgeSide_k47pw_66',
  $S = '_edgeAll_k47pw_80',
  YS = '_paddingSm_k47pw_95',
  ZS = '_paddingMd_k47pw_99',
  XS = '_paddingLg_k47pw_103',
  kS = '_backdrop_k47pw_108',
  ia = {
    sheet: HS,
    edgeBottom: qS,
    content: US,
    edgeTop: GS,
    edgeSide: VS,
    edgeAll: $S,
    paddingSm: YS,
    paddingMd: ZS,
    paddingLg: XS,
    backdrop: kS,
  },
  QS = '_container_9k8su_1',
  KS = '_handle_9k8su_13',
  JS = '_dragging_9k8su_21',
  Fo = { container: QS, handle: KS, dragging: JS };
function p0({ className: c, dragging: s, width: u, onPointerDown: o }) {
  return r.jsx('div', {
    className: [Fo.container, c].filter(Boolean).join(' '),
    'aria-hidden': 'true',
    onPointerDown: o,
    children: r.jsx('span', {
      className: [Fo.handle, s ? Fo.dragging : ''].filter(Boolean).join(' '),
      style: u !== void 0 ? { width: `${u}px` } : void 0,
    }),
  });
}
const WS = { none: '', sm: ia.paddingSm, md: ia.paddingMd, lg: ia.paddingLg };
function FS({
  open: c,
  children: s,
  onClose: u,
  edge: o,
  position: m,
  withHandle: d,
  padding: h = 'none',
  style: g,
}) {
  const p = o ?? 'bottom',
    _ = { bottom: ia.edgeBottom, top: ia.edgeTop, side: ia.edgeSide, all: ia.edgeAll }[p],
    b = WS[h];
  return r.jsxs('div', {
    className: [ia.sheet, _].filter(Boolean).join(' '),
    role: 'dialog',
    'aria-modal': 'true',
    style: g,
    children: [
      u && r.jsx('div', { className: ia.backdrop, onClick: u, 'aria-hidden': 'true' }),
      r.jsxs('div', {
        className: [ia.content, b].filter(Boolean).join(' '),
        children: [d && p === 'bottom' && r.jsx(p0, {}), s],
      }),
    ],
  });
}
function IS({ open: c, screw: s, levels: u, onUpgrade: o, onClose: m }) {
  return c
    ? r.jsxs(FS, {
        open: c,
        onClose: m,
        edge: 'bottom',
        children: [
          r.jsx(p0, {}),
          r.jsx('div', {
            className: Xh.inner,
            children: r.jsx('div', {
              className: Xh.grid,
              children: OS.map((d) => {
                const h = u[d.key],
                  g = Zh(h),
                  p = Zh(h + 1),
                  _ = _r(d, h),
                  b = RS(d, h, 5),
                  { totalCost: E, lvDelta: j } = DS(d, h, s),
                  H = At.fromNumber(_),
                  L = At.fromNumber(b),
                  $ = s.gte(H),
                  U = s.gte(L),
                  vt = j > 0;
                return r.jsx(
                  mr,
                  {
                    title: d.title,
                    iconName: d.iconName,
                    currentLabel: `Lv ${h}`,
                    before: Math.round(g * 10) / 10,
                    after: Math.round(p * 10) / 10,
                    beforeSuffix: '×',
                    currency: 'screw',
                    accent: 'warning',
                    options: [
                      { amount: '+1', cost: H, disabled: !$ },
                      { amount: '+5', cost: L, disabled: !U },
                      { amount: 'MAX', cost: E, disabled: !vt },
                    ],
                    onUpgrade: (F) => {
                      F === '+1'
                        ? o(d.key, 1)
                        : F === '+5'
                          ? o(d.key, 5)
                          : F === 'MAX' && o(d.key, 'max');
                    },
                  },
                  d.key
                );
              }),
            }),
          }),
        ],
      })
    : null;
}
const PS = '_fxContainer_rlbsy_2',
  tx = { fxContainer: PS },
  Io = [
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
function ex({ items: c = [], showTower: s = !1, towerContent: u = null, cycleSeconds: o = 24 }) {
  const d = `ssfx-${ft.useId().replace(/:/g, '')}`,
    h = Io.map((E, j) => {
      const H = 100 / E.length,
        L = E.map(([$, U], vt) => {
          const F = vt * H;
          return `
          ${F}%               { left: ${$}%; top: ${U}%; opacity: 0; }
          ${(F + 3).toFixed(2)}%   { left: ${$}%; top: ${U}%; opacity: 1; }
          ${(F + H - 7).toFixed(2)}%  { left: ${$}%; top: ${U}%; opacity: 1; }
          ${(F + H - 3).toFixed(2)}%  { left: ${$}%; top: ${U}%; opacity: 0; }
        `;
        }).join('');
      return `@keyframes ${d}-drift-${j + 1} { ${L} 100% { opacity: 0; } }`;
    }).join(`
`),
    g = Io.map(
      (E, j) => `.${d}-p${j + 1} { animation: ${d}-drift-${j + 1} ${o}s linear infinite; }`
    ).join(`
`),
    p = `
    .${d}-slot {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
      will-change: left, top, opacity;
    }
    ${g}
    ${h}

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
    _ = r.jsxs('div', {
      className: `${d}-tower`,
      children: [
        r.jsx('div', { className: `${d}-tower-r1` }),
        r.jsx('div', { className: `${d}-tower-r2` }),
        r.jsx('div', { className: `${d}-tower-core`, children: u }),
      ],
    }),
    b = s ? [_, ...c] : [...c];
  return r.jsxs('div', {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    'data-screen-saver-fx': d,
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      b.map((E, j) => {
        const H = (j % Io.length) + 1,
          L = -(j * (o / Math.max(b.length, 1)));
        return r.jsx(
          'div',
          {
            className: `${d}-slot ${d}-p${H}${j === 0 ? ` ${d}-rm-show` : ''}`,
            style: { animationDelay: `${L}s` },
            children: E,
          },
          j
        );
      }),
    ],
  });
}
function ax({ open: c, onClose: s }) {
  return c
    ? r.jsx(As, {
        open: c,
        onClose: s,
        dimLevel: 'heavy',
        dismissible: !0,
        align: 'center',
        children: r.jsx('div', {
          className: tx.fxContainer,
          onClick: (u) => {
            (u.stopPropagation(), s());
          },
          role: 'button',
          'aria-label': 'スクリーンセーバーを終了',
          tabIndex: 0,
          onKeyDown: (u) => {
            (u.key === 'Enter' || u.key === ' ') && s();
          },
          children: r.jsx(ex, { showTower: !0 }),
        }),
      })
    : null;
}
const lx = 30,
  nx = 30,
  ix = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 };
function cx(c, s) {
  return c && s <= 0 ? 'gameover' : null;
}
function sx() {
  const { navigate: c } = Ma(),
    s = k((tt) => tt.isRunActive),
    u = k((tt) => tt.screw),
    o = k((tt) => tt.machineHp),
    m = k((tt) => tt.machineMaxHp),
    d = k((tt) => tt.currentTier),
    h = k((tt) => tt.currentWave),
    g = k((tt) => tt.currentWeapon),
    p = k((tt) => tt.activeCdSec),
    _ = k((tt) => tt.isAutoActive),
    b = k((tt) => tt.gameSpeed),
    E = k((tt) => tt.bgmVolume),
    j = k((tt) => tt.seVolume),
    H = k((tt) => tt.setBgmVolume),
    L = k((tt) => tt.setSeVolume),
    $ = k((tt) => tt.setAutoActive),
    U = k((tt) => tt.switchWeapon),
    [vt, F] = ft.useState(!1),
    [_t, Yt] = ft.useState(!1),
    [ae, Dt] = ft.useState(!1),
    [lt, Xt] = ft.useState(!1),
    [re, se] = ft.useState(b),
    [Bt, kt] = ft.useState(ix),
    [Ze] = ft.useState([]),
    [we] = ft.useState([]),
    [le] = ft.useState([]),
    w = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    G = cx(s, o),
    [W, pt] = ft.useState(null),
    yt = W ?? G,
    x = yt !== null,
    B = At.fromNumber(o),
    V = At.fromNumber(m > 0 ? m : 1),
    Z = (tt) => {
      se(tt);
    },
    I = () => {
      Xt((tt) => !tt);
    },
    nt = () => {
      Yt(!0);
    },
    dt = () => {
      Dt(!0);
    },
    Wt = () => {
      (Yt(!1), pt('retreat'));
    },
    wt = () => {
      c('preparation');
    },
    ul = (tt, Hl) => {
      kt((Yi) => ({ ...Yi, [tt]: Yi[tt] + (Hl === 'max' ? 1 : Hl) }));
    },
    Bl = { bolt: At.ZERO, alloy: At.ZERO, patches: [] },
    Ll = 30;
  return r.jsxs('div', {
    className: Vh.root,
    children: [
      r.jsx(Dl, {
        noScroll: !0,
        variant: 'battle',
        header: r.jsx(Bb, {
          hpCurrent: B,
          hpMax: V,
          tier: d,
          wave: h,
          totalWaves: Ll,
          secondsRemaining: 30,
          secondsTotal: 30,
          isBossWave: h === Ll,
        }),
        footer: r.jsx(pb, {
          screw: u,
          equippedWeapon: g,
          weaponCds: w,
          activeCd: p,
          activeMax: lx,
          isAutoActive: _,
          onSwitchWeapon: U,
          onActivate: () => {},
          onToggleAuto: $,
          gameSpeed: re,
          onSpeedChange: Z,
          isPaused: lt,
          onTogglePause: I,
          onOpenMenu: nt,
          onOpenScreenSaver: dt,
        }),
        children: r.jsx(j2, {
          enemies: [],
          damageEvents: Ze,
          hitEvents: we,
          deathEvents: le,
          range: nx,
        }),
      }),
      r.jsxs('div', {
        className: Vh.overlayLayer,
        'aria-live': 'polite',
        children: [
          r.jsx(IS, {
            open: vt,
            screw: u,
            levels: Bt,
            onUpgrade: ul,
            onClose: () => {
              F(!1);
            },
          }),
          r.jsx(vS, {
            open: _t,
            bgmVolume: E,
            seVolume: j,
            onBgmChange: H,
            onSeChange: L,
            onRetreat: Wt,
            onClose: () => {
              Yt(!1);
            },
          }),
          x &&
            r.jsx(wS, {
              open: x,
              status: yt,
              reachedTier: d,
              reachedWave: h,
              killed: 0,
              elapsedSec: 0,
              reward: Bl,
              onClose: wt,
            }),
          r.jsx(ax, {
            open: ae,
            onClose: () => {
              Dt(!1);
            },
          }),
        ],
      }),
    ],
  });
}
const ux = [
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
function kh(c, s) {
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
      const m = c.growthFactor * s;
      return Math.ceil(150 + 250 * (1 - 1 / (1 + m)));
    }
    default:
      return c.baseValue;
  }
}
function pr(c, s) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, s));
}
function Po(c, s, u) {
  let o = 0;
  for (let m = 0; m < u && !(c.maxLv != null && s + m >= c.maxLv); m++) o += pr(c, s + m);
  return o;
}
function ox(c, s, u) {
  let o = 0,
    m = u,
    d = s;
  for (let h = 0; h < 1e4 && !(c.maxLv != null && d >= c.maxLv); h++) {
    const g = At.fromNumber(pr(c, d));
    if (m.lt(g)) break;
    ((m = m.sub(g)), (d += 1), (o += 1));
  }
  return o;
}
const rx = '_root_11wsk_3',
  fx = { root: rx };
function dx() {
  const c = k((m) => m.machineLevels),
    s = k((m) => m.bolt),
    u = k((m) => m.incrementMachineLv),
    o = k((m) => m.spendBolt);
  return r.jsx('div', {
    className: fx.root,
    children: ux.map((m) => {
      const d = c[m.key],
        h = m.maxLv != null && d >= m.maxLv,
        g = kh(m, d),
        p = kh(m, d + 1),
        _ = (se) => (m.unit === '%' ? Math.round(se * 1e3) / 10 : se),
        b = _(g),
        E = _(p),
        j = pr(m, d),
        H = Po(m, d, 5),
        L = At.fromNumber(j),
        $ = At.fromNumber(H),
        U = ox(m, d, s),
        vt = m.maxLv != null ? m.maxLv - d : Number.POSITIVE_INFINITY,
        F = Math.min(U, vt),
        _t = F > 0 ? Po(m, d, F) : j,
        Yt = At.fromNumber(_t),
        ae = s.lt(L),
        Dt = s.lt($) || (m.maxLv != null && d + 5 > m.maxLv),
        lt = F < 1,
        Xt = h
          ? []
          : [
              { amount: '+1', cost: L, disabled: ae },
              { amount: '+5', cost: $, disabled: Dt },
              { amount: 'MAX', cost: Yt, disabled: lt },
            ],
        re = (se) => {
          if (h) return;
          let Bt = 0;
          if ((se === '+1' ? (Bt = 1) : se === '+5' ? (Bt = 5) : se === 'MAX' && (Bt = F), Bt < 1))
            return;
          m.maxLv != null && (Bt = Math.min(Bt, m.maxLv - d));
          const kt = Po(m, d, Bt),
            Ze = At.fromNumber(kt);
          if (o(Ze)) for (let le = 0; le < Bt; le++) u(m.key);
        };
      return r.jsx(
        mr,
        {
          title: m.title,
          iconName: m.iconName,
          currentLabel: `Lv ${d}`,
          before: b,
          after: h ? void 0 : E,
          beforeSuffix: m.unit ?? '',
          currency: 'bolt',
          accent: 'primary',
          maxed: h,
          options: Xt,
          onUpgrade: re,
        },
        m.key
      );
    }),
  });
}
function mx() {
  const { navigate: c } = Ma(),
    s = (u) => {
      c(u);
    };
  return r.jsx(Dl, {
    header: r.jsx(Gi, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: r.jsx(Ui, { active: 'machine', onChange: s }),
    children: r.jsx(dx, {}),
  });
}
const hx = () => r.jsx('div', { children: r.jsx('h1', { children: 'Not Found' }) }),
  vx = '_content_13mwe_1',
  gx = { content: vx },
  _x = '_root_1vhwd_1',
  px = '_header_1vhwd_8',
  yx = '_slotGrid_1vhwd_14',
  bx = '_emptyHint_1vhwd_20',
  rs = { root: _x, header: px, slotGrid: yx, emptyHint: bx },
  Sx = '_wrapper_mat55_2',
  xx = '_card_mat55_6',
  jx = '_empty_mat55_14',
  Tx = '_emptyContent_mat55_20',
  Ax = '_locked_mat55_28',
  Nx = '_lockedContent_mat55_34',
  Ex = '_filled_mat55_43',
  zx = '_filledContent_mat55_47',
  Mx = '_patchIcon_mat55_53',
  Cx = '_patchInfo_mat55_64',
  wx = '_patchTop_mat55_72',
  Ox = '_patchName_mat55_78',
  Rx = '_patchDetail_mat55_86',
  Dx = '_trigger_mat55_93',
  Bx = '_effect_mat55_99',
  ie = {
    wrapper: Sx,
    card: xx,
    empty: jx,
    emptyContent: Tx,
    locked: Ax,
    lockedContent: Nx,
    filled: Ex,
    filledContent: zx,
    patchIcon: Mx,
    patchInfo: Cx,
    patchTop: wx,
    patchName: Ox,
    patchDetail: Rx,
    trigger: Dx,
    effect: Bx,
    'size-sm': '_size-sm_mat55_110',
    'size-md': '_size-md_mat55_118',
    'size-lg': '_size-lg_mat55_122',
  };
function y0({ patch: c = null, slotIndex: s, locked: u = !1, size: o = 'md', onClick: m }) {
  const d = c != null,
    h = m != null && !u,
    g = s ?? '';
  return r.jsx('div', {
    className: [ie.wrapper, d ? ie.filled : u ? ie.locked : ie.empty, ie[`size-${o}`]]
      .filter(Boolean)
      .join(' '),
    onClick: h ? m : void 0,
    role: h ? 'button' : void 0,
    tabIndex: h ? 0 : void 0,
    onKeyDown: h
      ? (p) => {
          (p.key === 'Enter' || p.key === ' ') && (p.preventDefault(), m == null || m());
        }
      : void 0,
    'aria-label': d
      ? `Slot ${g}: ${c.name} (Tier ${c.tier})`
      : u
        ? `Slot ${g} (locked)`
        : `Slot ${g} (empty)`,
    children: r.jsxs(sl, {
      variant: 'outline',
      padding: 'sm',
      interactive: h,
      className: ie.card,
      children: [
        u &&
          r.jsxs('div', {
            className: ie.lockedContent,
            children: [
              r.jsx(Ct, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
              r.jsx(q, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
            ],
          }),
        !u &&
          !d &&
          r.jsx('div', {
            className: ie.emptyContent,
            children: r.jsx(q, {
              variant: 'caption',
              color: 'dim',
              children: g !== '' ? `Slot ${g}` : '+',
            }),
          }),
        !u &&
          d &&
          c != null &&
          r.jsxs('div', {
            className: ie.filledContent,
            children: [
              r.jsx('span', {
                className: ie.patchIcon,
                style: { color: `var(--c-patch-t${Math.min(Math.max(1, Math.floor(c.tier)), 5)})` },
                children: r.jsx(Ct, {
                  name: c.iconName,
                  size: o === 'sm' ? 14 : 18,
                  color: `var(--c-patch-t${Math.min(Math.max(1, Math.floor(c.tier)), 5)})`,
                }),
              }),
              r.jsxs('div', {
                className: ie.patchInfo,
                children: [
                  r.jsxs('div', {
                    className: ie.patchTop,
                    children: [
                      r.jsx(q, {
                        variant: 'label',
                        color: 'default',
                        className: ie.patchName,
                        children: c.name,
                      }),
                      r.jsx(Vi, {
                        text: `T${Math.min(Math.max(1, Math.floor(c.tier)), 5)}`,
                        variant: 'patch-tier',
                        tier: c.tier,
                      }),
                    ],
                  }),
                  o !== 'sm' &&
                    r.jsxs('div', {
                      className: ie.patchDetail,
                      children: [
                        r.jsx('span', { className: ie.trigger, children: c.trigger }),
                        r.jsx('span', { className: ie.effect, children: c.effect }),
                      ],
                    }),
                ],
              }),
            ],
          }),
      ],
    }),
  });
}
function Lx(c) {
  return Math.min(1 + c, dr);
}
const Hx = {
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
  qx = {
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
  Ux = {
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
function Gx({ overridePatches: c, overrideEquipped: s, overridePatchSlotsLv: u }) {
  const o = k((H) => H.patches),
    m = k((H) => H.equippedPatches),
    d = k((H) => H.machineLevels.patchSlots),
    h = k((H) => H.unequipPatch),
    g = c ?? o,
    p = s ?? m,
    b = Lx(u ?? d),
    E = (H) => {
      const L = p.get(H);
      if (!L) return null;
      const $ = `${L.name}#${L.tier}`,
        U = g.get($);
      return {
        patchId: $,
        name: L.name,
        iconName: Hx[L.name] ?? 'spark',
        tier: L.tier,
        trigger: qx[L.name] ?? '常時',
        effect: Ux[L.name] ?? '-',
        count: (U == null ? void 0 : U.count) ?? 0,
      };
    },
    j = (H) => {
      p.get(H) && h(H);
    };
  return r.jsxs('div', {
    className: rs.root,
    children: [
      r.jsxs('div', {
        className: rs.header,
        children: [
          r.jsx(q, { variant: 'heading-3', children: '装着スロット' }),
          r.jsxs(q, { variant: 'caption', color: 'dim', children: [p.size, ' / ', b, ' 装着中'] }),
        ],
      }),
      r.jsx('div', {
        className: rs.slotGrid,
        children: Array.from({ length: dr }, (H, L) => {
          const $ = L >= b,
            U = $ ? null : E(L);
          return r.jsx(
            y0,
            { slotIndex: L + 1, patch: U, locked: $, size: 'md', onClick: $ ? void 0 : () => j(L) },
            L
          );
        }),
      }),
      p.size === 0 &&
        b > 0 &&
        r.jsx(q, {
          variant: 'caption',
          color: 'dim',
          className: rs.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const Vx = '_root_me2q1_1',
  $x = '_header_me2q1_8',
  Yx = '_grid_me2q1_14',
  Zx = '_empty_me2q1_20',
  Oi = { root: Vx, header: $x, grid: Yx, empty: Zx },
  Xx = '_root_12vm9_2',
  kx = '_selected_12vm9_13',
  Qx = '_merging_12vm9_17',
  Kx = '_locked_12vm9_21',
  Jx = '_disabled_12vm9_26',
  Wx = '_card_12vm9_32',
  Fx = '_iconWrap_12vm9_42',
  Ix = '_name_12vm9_52',
  Px = '_detail_12vm9_61',
  t3 = '_trigger_12vm9_69',
  e3 = '_effect_12vm9_80',
  a3 = '_count_12vm9_93',
  l3 = '_countZero_12vm9_100',
  n3 = '_mergingBadge_12vm9_105',
  oe = {
    root: Xx,
    selected: kx,
    merging: Qx,
    locked: Kx,
    disabled: Jx,
    card: Wx,
    iconWrap: Fx,
    name: Ix,
    detail: Px,
    trigger: t3,
    effect: e3,
    count: a3,
    countZero: l3,
    mergingBadge: n3,
    'size-sm': '_size-sm_12vm9_124',
    'size-md': '_size-md_12vm9_133',
    'size-lg': '_size-lg_12vm9_140',
  },
  i3 = { sm: 18, md: 24, lg: 30 },
  Qh = { sm: 32, md: 40, lg: 48 };
function b0({
  name: c,
  iconName: s,
  tier: u,
  count: o,
  trigger: m,
  effect: d,
  selected: h = !1,
  merging: g = !1,
  locked: p = !1,
  disabled: _ = !1,
  size: b = 'md',
  onClick: E,
}) {
  const j = Math.min(Math.max(1, Math.floor(u)), 5),
    H = `var(--c-patch-t${j})`,
    L = E != null && !_ && !p,
    $ = h ? { boxShadow: 'var(--glow-cyan-md)' } : g ? { boxShadow: 'var(--glow-purple-md)' } : {};
  return r.jsx('div', {
    className: [
      oe.root,
      h ? oe.selected : '',
      g ? oe.merging : '',
      p ? oe.locked : '',
      _ ? oe.disabled : '',
      oe[`size-${b}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: $,
    onClick: L ? E : void 0,
    role: L ? 'button' : void 0,
    tabIndex: L ? 0 : void 0,
    onKeyDown: L
      ? (U) => {
          (U.key === 'Enter' || U.key === ' ') && (U.preventDefault(), E == null || E());
        }
      : void 0,
    'aria-pressed': L ? h : void 0,
    'aria-disabled': _ || p ? !0 : void 0,
    children: r.jsxs(sl, {
      variant: 'elevated',
      padding: 'sm',
      interactive: L,
      className: oe.card,
      children: [
        r.jsx('div', {
          className: oe.iconWrap,
          style: { width: Qh[b], height: Qh[b], opacity: p ? 0.35 : 1 },
          children: r.jsx(Ct, {
            name: p ? 'close' : s,
            size: i3[b],
            color: p ? 'var(--c-text-disabled)' : H,
          }),
        }),
        r.jsx(q, {
          variant: 'caption',
          color: p ? 'dim' : 'mid',
          className: oe.name,
          children: p ? '???' : c,
        }),
        !p && r.jsx(Vi, { text: `T${j}`, variant: 'patch-tier', tier: u }),
        b !== 'sm' &&
          !p &&
          r.jsxs('div', {
            className: oe.detail,
            children: [
              r.jsx('span', { className: oe.trigger, children: m }),
              r.jsx('span', { className: oe.effect, children: d }),
            ],
          }),
        r.jsxs('span', {
          className: [oe.count, o === 0 ? oe.countZero : ''].filter(Boolean).join(' '),
          style: { color: o === 0 ? 'var(--c-text-disabled)' : H },
          children: ['×', p ? '?' : o],
        }),
        g && r.jsx('span', { className: oe.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
const c3 = {
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
  s3 = {
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
  u3 = {
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
function o3({ overridePatches: c, overrideEquipped: s, selectedId: u, onSelect: o }) {
  const m = k((b) => b.patches),
    d = k((b) => b.equippedPatches),
    h = c ?? m,
    g = s ?? d,
    p = new Set(Array.from(g.values()).map((b) => b.name)),
    _ = Array.from(h.values());
  return _.length === 0
    ? r.jsx('div', {
        className: Oi.root,
        children: r.jsx('div', {
          className: Oi.empty,
          children: r.jsx(q, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : r.jsxs('div', {
        className: Oi.root,
        children: [
          r.jsxs('div', {
            className: Oi.header,
            children: [
              r.jsx(q, { variant: 'heading-3', children: 'パッチ在庫' }),
              r.jsxs(q, { variant: 'caption', color: 'dim', children: [_.length, ' 種類'] }),
            ],
          }),
          r.jsx('div', {
            className: Oi.grid,
            children: _.map((b) => {
              const E = `${b.name}#${b.tier}`,
                j = p.has(b.name);
              return r.jsx(
                b0,
                {
                  patchId: E,
                  name: b.name,
                  iconName: c3[b.name] ?? 'spark',
                  tier: b.tier,
                  count: b.count,
                  trigger: s3[b.name] ?? '常時',
                  effect: u3[b.name] ?? '-',
                  selected: u === E,
                  locked: j,
                  onClick: o ? () => o(u === E ? null : E) : void 0,
                },
                E
              );
            }),
          }),
        ],
      });
}
const r3 = '_root_rs7q5_1',
  f3 = '_header_rs7q5_8',
  d3 = '_tierControl_rs7q5_14',
  m3 = '_tierStepperRow_rs7q5_24',
  h3 = '_mergeList_rs7q5_30',
  v3 = '_empty_rs7q5_36',
  Mn = { root: r3, header: f3, tierControl: d3, tierStepperRow: m3, mergeList: h3, empty: v3 },
  g3 = '_stepper_1ouvh_1',
  _3 = '_disabled_1ouvh_6',
  p3 = '_btn_1ouvh_11',
  y3 = '_value_1ouvh_38',
  Cn = {
    stepper: g3,
    disabled: _3,
    btn: p3,
    value: y3,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  b3 = ({
    value: c,
    min: s,
    max: u,
    step: o = 1,
    onChange: m,
    size: d = 'md',
    disabled: h = !1,
  }) => {
    const g = c - o >= s,
      p = c + o <= u,
      _ = () => {
        h || !g || m(Math.max(s, c - o));
      },
      b = () => {
        h || !p || m(Math.min(u, c + o));
      };
    return r.jsxs('div', {
      className: [Cn.stepper, Cn[`size-${d}`], h ? Cn.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        r.jsx('button', {
          type: 'button',
          className: Cn.btn,
          onClick: _,
          disabled: h || !g,
          'aria-label': '減少',
          children: '−',
        }),
        r.jsx('span', {
          className: Cn.value,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          children: c,
        }),
        r.jsx('button', {
          type: 'button',
          className: Cn.btn,
          onClick: b,
          disabled: h || !p,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  ir = 5,
  S3 = {
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
function x3(c, s) {
  const u = [];
  for (const o of c.values())
    o.tier < s &&
      o.count >= 2 &&
      u.push({ name: o.name, tier: o.tier, count: o.count, iconName: S3[o.name] ?? 'spark' });
  return u.sort((o, m) => o.tier - m.tier || o.name.localeCompare(m.name));
}
function j3(c, s) {
  let u = new Map(c),
    o = !0;
  for (; o; ) {
    o = !1;
    for (const m of Array.from(u.values())) {
      if (m.tier >= s || m.count < 2 || m.tier >= ir) continue;
      const d = `${m.name}#${m.tier}`,
        h = Math.floor(m.count / 2),
        g = m.count % 2,
        p = m.tier + 1,
        _ = `${m.name}#${p}`,
        b = u.get(_),
        E = ((b == null ? void 0 : b.count) ?? 0) + h;
      ((u = new Map(u)),
        g === 0 ? u.delete(d) : u.set(d, { ...m, count: g }),
        u.set(_, { name: m.name, tier: p, count: E }),
        (o = !0));
    }
  }
  return u;
}
function T3({ overridePatches: c }) {
  const s = k((j) => j.patches),
    u = k((j) => j.addPatch),
    o = k((j) => j.consumePatch),
    m = k((j) => j.pruneEmptyPatches),
    d = c ?? s,
    h = Math.max(1, ...Array.from(d.values()).map((j) => j.tier)),
    [g, p] = ft.useState(Math.min(h, ir - 1)),
    _ = x3(d, g + 1),
    b = _.length > 0,
    E = () => {
      if (c) return;
      const j = j3(d, g + 1);
      for (const [H, L] of d) {
        const $ = j.get(H),
          U = ($ == null ? void 0 : $.count) ?? 0;
        U < L.count && o(L.name, L.tier, L.count - U);
      }
      for (const [H, L] of j) {
        const $ = d.get(H),
          U = ($ == null ? void 0 : $.count) ?? 0;
        L.count > U && u(L.name, L.tier, L.count - U);
      }
      m();
    };
  return r.jsxs('div', {
    className: Mn.root,
    children: [
      r.jsx('div', {
        className: Mn.header,
        children: r.jsx(q, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      r.jsxs('div', {
        className: Mn.tierControl,
        children: [
          r.jsx(q, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          r.jsxs('div', {
            className: Mn.tierStepperRow,
            children: [
              r.jsx(b3, { value: g, min: 1, max: ir - 1, onChange: p }),
              r.jsxs(q, {
                variant: 'caption',
                color: 'dim',
                children: ['T', g, ' 以下を T', g + 1, ' に合成'],
              }),
            ],
          }),
        ],
      }),
      b
        ? r.jsxs(r.Fragment, {
            children: [
              r.jsx('div', {
                className: Mn.mergeList,
                children: _.map((j) =>
                  r.jsx(
                    b0,
                    {
                      patchId: `${j.name}#${j.tier}`,
                      name: j.name,
                      iconName: j.iconName,
                      tier: j.tier,
                      count: j.count,
                      trigger: '-',
                      effect: '-',
                      merging: !0,
                      size: 'sm',
                    },
                    `${j.name}#${j.tier}`
                  )
                ),
              }),
              r.jsx(ye, {
                label: `一括合成 (${_.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: E,
              }),
            ],
          })
        : r.jsxs('div', {
            className: Mn.empty,
            children: [
              r.jsx(q, { variant: 'body', color: 'dim', children: '合成可能なパッチがありません' }),
              r.jsx(q, {
                variant: 'caption',
                color: 'dim',
                children: '同じ Tier のパッチが 2 個以上あると合成できます',
              }),
            ],
          }),
    ],
  });
}
const A3 = [
  { key: 'equip', label: '装着' },
  { key: 'inventory', label: '所持' },
  { key: 'merge', label: '合成' },
];
function N3() {
  const { navigate: c } = Ma(),
    [s, u] = ft.useState('equip'),
    o = (m) => {
      c(m);
    };
  return r.jsx(Dl, {
    header: r.jsx(Gi, {
      title: 'パッチ庫',
      currencies: [],
      tabBar: r.jsx(bs, { tabs: A3, value: s, onChange: u, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(Ui, { active: 'patches', onChange: o }),
    children: r.jsxs('div', {
      className: gx.content,
      children: [
        s === 'equip' && r.jsx(Gx, {}),
        s === 'inventory' && r.jsx(o3, {}),
        s === 'merge' && r.jsx(T3, {}),
      ],
    }),
  });
}
const E3 = '_footer_1ocpp_1',
  z3 = '_tabPanel_1ocpp_6',
  Kh = { footer: E3, tabPanel: z3 },
  M3 = '_wrapper_120xy_1',
  C3 = '_header_120xy_7',
  w3 = '_headerLabel_120xy_13',
  O3 = '_empty_120xy_18',
  R3 = '_emptyIcon_120xy_29',
  D3 = '_grid_120xy_33',
  B3 = '_note_120xy_39',
  Ml = { wrapper: M3, header: C3, headerLabel: w3, empty: O3, emptyIcon: R3, grid: D3, note: B3 },
  L3 = {
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
function H3({ onOpenPatchScreen: c }) {
  const s = k((h) => h.equippedPatches),
    u = k((h) => h.machineLevels.patchSlots),
    o = Math.min(1 + u, dr),
    m = [];
  for (let h = 0; h < o; h++) {
    const g = s.get(h);
    if (g != null) {
      const p = L3[g.name],
        _ = {
          patchId: `${g.name}#${g.tier}`,
          name: p.name,
          iconName: p.iconName,
          tier: g.tier,
          trigger: p.trigger,
          effect: p.effect,
          count: 1,
        };
      m.push({ kind: 'filled', patch: _, idx: h + 1 });
    } else m.push({ kind: 'empty', patch: null, idx: h + 1 });
  }
  const d = [...s.values()].length;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '装着パッチ',
    className: Ml.wrapper,
    children: [
      r.jsxs('div', {
        className: Ml.header,
        children: [
          r.jsxs(q, {
            variant: 'caption',
            color: 'mid',
            className: Ml.headerLabel,
            children: ['装着 ', d, ' / ', o],
          }),
          c != null &&
            r.jsx(ye, {
              label: '装備変更',
              variant: 'ghost',
              size: 'sm',
              iconRight: r.jsx(Ct, { name: 'chevron-right', size: 14 }),
              onClick: c,
            }),
        ],
      }),
      d === 0
        ? r.jsxs('div', {
            className: Ml.empty,
            children: [
              r.jsx('span', {
                className: Ml.emptyIcon,
                children: r.jsx(Ct, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              r.jsx(q, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              c != null &&
                r.jsx(ye, {
                  label: 'パッチ庫を開く',
                  variant: 'secondary',
                  size: 'sm',
                  onClick: c,
                }),
            ],
          })
        : r.jsx('div', {
            className: Ml.grid,
            children: m.map((h, g) =>
              r.jsx(y0, { patch: h.patch, slotIndex: h.idx, onClick: c }, g)
            ),
          }),
      r.jsx(q, {
        variant: 'caption',
        color: 'dim',
        align: 'center',
        as: 'p',
        className: Ml.note,
        children: '変更はパッチ庫で行えます',
      }),
    ],
  });
}
const q3 = '_wrapper_1c3z0_1',
  U3 = '_header_1c3z0_7',
  G3 = '_grid_1c3z0_12',
  tr = { wrapper: q3, header: U3, grid: G3 },
  V3 = [
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
function $3({ selectedWeapon: c, onSelect: s }) {
  const u = k((h) => h.initialWeapon),
    o = k((h) => h.setInitialWeapon),
    m = c ?? u,
    d = (h) => {
      (o(h), s == null || s(h));
    };
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: tr.wrapper,
    children: [
      r.jsx('div', {
        className: tr.header,
        children: r.jsx(q, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      r.jsx('div', {
        className: tr.grid,
        children: V3.map((h) =>
          r.jsx(
            m0,
            {
              weapon: h.kind,
              name: h.name,
              description: h.description,
              stats: h.stats,
              layout: 'tall',
              active: h.kind === m,
              onClick: () => d(h.kind),
            },
            h.kind
          )
        ),
      }),
    ],
  });
}
const Y3 = '_wrapper_5dnkb_1',
  Z3 = '_sticky_5dnkb_15',
  X3 = '_summary_5dnkb_19',
  k3 = '_weaponInfo_5dnkb_29',
  Q3 = '_patchInfo_5dnkb_37',
  Ri = { wrapper: Y3, sticky: Z3, summary: X3, weaponInfo: k3, patchInfo: Q3 };
function K3({
  tier: c,
  weaponKind: s,
  patchCount: u = 0,
  disabled: o = !1,
  onLaunch: m,
  sticky: d = !0,
}) {
  return r.jsxs('div', {
    role: 'group',
    'aria-label': '出撃',
    className: [Ri.wrapper, d ? Ri.sticky : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Ri.summary,
        children: [
          c != null && r.jsx(Vi, { variant: 'tier', tier: c, size: 'sm' }),
          s != null &&
            r.jsxs('span', {
              className: Ri.weaponInfo,
              children: [
                r.jsx(Ct, { name: s, size: 14 }),
                r.jsx(q, { variant: 'label', color: 'primary', children: s.toUpperCase() }),
              ],
            }),
          r.jsxs('span', {
            className: Ri.patchInfo,
            children: [
              r.jsx(Ct, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              r.jsxs(q, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', u] }),
            ],
          }),
        ],
      }),
      r.jsx(ye, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: o,
        iconLeft: r.jsx(Ct, { name: 'tower', size: 18 }),
        onClick: m,
      }),
    ],
  });
}
const J3 = '_wrapper_1onm1_1',
  W3 = '_header_1onm1_7',
  F3 = '_grid_1onm1_14',
  I3 = '_tierBtn_1onm1_20',
  P3 = '_active_1onm1_35',
  t5 = '_tierLabel_1onm1_50',
  e5 = '_frontierLabel_1onm1_61',
  Cl = {
    wrapper: J3,
    header: W3,
    grid: F3,
    tierBtn: I3,
    active: P3,
    tierLabel: t5,
    frontierLabel: e5,
  };
function a5({ selectedTier: c, onSelect: s }) {
  const u = k((h) => h.highestTier),
    o = Math.max(1, u),
    m = [];
  for (let h = 1; h <= o; h++) m.push(h);
  const d = (h) => `var(--c-tier-${Math.max(1, Math.min(10, h))})`;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': 'Tier 選択',
    className: Cl.wrapper,
    children: [
      r.jsxs('div', {
        className: Cl.header,
        children: [
          r.jsx(q, {
            variant: 'caption',
            color: 'mid',
            children: '到達済み Tier を選んで出撃します。',
          }),
          r.jsxs(q, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', o] }),
        ],
      }),
      r.jsx('div', {
        className: Cl.grid,
        children: m.map((h) => {
          const g = h === c,
            p = h === o,
            _ = d(h);
          return r.jsxs(
            'button',
            {
              type: 'button',
              'aria-pressed': g,
              'data-active': g,
              'data-frontier': p,
              className: [Cl.tierBtn, g ? Cl.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': _ },
              onClick: () => (s == null ? void 0 : s(h)),
              children: [
                r.jsxs('span', { className: Cl.tierLabel, children: ['T', h] }),
                p && !g && r.jsx('span', { className: Cl.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            h
          );
        }),
      }),
    ],
  });
}
const l5 = [
  { key: 'tier', label: 'Tier 選択' },
  { key: 'weapon', label: '初期装備武器' },
  { key: 'patches', label: 'パッチ確認' },
];
function n5() {
  const { navigate: c } = Ma(),
    [s, u] = ft.useState('tier'),
    o = k((j) => j.highestTier),
    [m, d] = ft.useState(Math.max(1, o)),
    h = k((j) => j.initialWeapon),
    p = [...k((j) => j.equippedPatches).values()].length;
  function _() {
    c('battle');
  }
  const b = r.jsx(Gi, {
      title: '出撃準備',
      onBack: () => c('title'),
      currencies: ['bolt', 'alloy'],
      tabBar: r.jsx(bs, { tabs: l5, value: s, onChange: u, variant: 'underline', fullWidth: !0 }),
    }),
    E = r.jsxs('div', {
      className: Kh.footer,
      children: [
        r.jsx(K3, { tier: m, weaponKind: h, patchCount: p, sticky: !1, onLaunch: _ }),
        r.jsx(Ui, { active: 'preparation', onChange: (j) => c(j) }),
      ],
    });
  return r.jsx(Dl, {
    header: b,
    footer: E,
    children: r.jsxs('div', {
      className: Kh.tabPanel,
      children: [
        s === 'tier' && r.jsx(a5, { selectedTier: m, onSelect: d }),
        s === 'weapon' && r.jsx($3, {}),
        s === 'patches' && r.jsx(H3, { onOpenPatchScreen: () => c('patches') }),
      ],
    }),
  });
}
const i5 = '_content_iggfi_1',
  c5 = { content: i5 },
  s5 = '_root_1ouw6_1',
  u5 = '_header_1ouw6_8',
  o5 = '_storageCard_1ouw6_13',
  r5 = '_storageRow_1ouw6_23',
  f5 = '_divider_1ouw6_29',
  d5 = '_section_1ouw6_34',
  m5 = '_dangerSection_1ouw6_40',
  h5 = '_sectionHeader_1ouw6_50',
  $e = {
    root: s5,
    header: u5,
    storageCard: o5,
    storageRow: r5,
    divider: f5,
    section: d5,
    dangerSection: m5,
    sectionHeader: h5,
  },
  v5 = '_wrapper_11b89_1',
  g5 = '_disabled_11b89_6',
  _5 = '_hiddenInput_11b89_11',
  p5 = '_btn_11b89_15',
  y5 = '_fileName_11b89_41',
  Di = { wrapper: v5, disabled: g5, hiddenInput: _5, btn: p5, fileName: y5 },
  b5 = ({
    accept: c = 'application/json',
    onChange: s,
    label: u = 'ファイルを選択',
    disabled: o = !1,
  }) => {
    const m = ft.useRef(null),
      [d, h] = ft.useState(null),
      g = () => {
        var _;
        o || (_ = m.current) == null || _.click();
      },
      p = (_) => {
        var E;
        const b = ((E = _.target.files) == null ? void 0 : E[0]) ?? null;
        (h((b == null ? void 0 : b.name) ?? null), s(b), m.current && (m.current.value = ''));
      };
    return r.jsxs('div', {
      className: [Di.wrapper, o ? Di.disabled : ''].join(' '),
      children: [
        r.jsx('input', {
          ref: m,
          type: 'file',
          accept: c,
          className: Di.hiddenInput,
          onChange: p,
          disabled: o,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        r.jsx('button', {
          type: 'button',
          className: Di.btn,
          onClick: g,
          disabled: o,
          children: u,
        }),
        d && r.jsx('span', { className: Di.fileName, title: d, children: d }),
      ],
    });
  };
function S5({ storageInfo: c, onExport: s, onImport: u, onReset: o }) {
  const [m, d] = ft.useState(!1),
    [h, g] = ft.useState(!1),
    [p, _] = ft.useState(!1),
    b = async () => {
      if (s) {
        _(!0);
        try {
          await s();
        } finally {
          _(!1);
        }
      }
    },
    E = async (H) => {
      if (!(!H || !u)) {
        g(!0);
        try {
          await u(H);
        } finally {
          g(!1);
        }
      }
    },
    j = async () => {
      (d(!1), o && (await o()));
    };
  return r.jsxs('div', {
    className: $e.root,
    children: [
      r.jsx('div', {
        className: $e.header,
        children: r.jsx(q, { variant: 'heading-3', children: 'データ管理' }),
      }),
      c &&
        r.jsxs('div', {
          className: $e.storageCard,
          children: [
            r.jsx(q, { variant: 'label', color: 'mid', children: 'ストレージ使用量' }),
            r.jsxs('div', {
              className: $e.storageRow,
              children: [
                r.jsx(q, { variant: 'numeric-l', children: c.usedKb }),
                r.jsx(q, { variant: 'caption', color: 'dim', children: 'KB' }),
              ],
            }),
            r.jsxs(q, {
              variant: 'caption',
              color: 'dim',
              children: ['セーブスロット: ', c.slots, ' / 最終保存: ', c.lastSavedAt],
            }),
          ],
        }),
      r.jsx('div', { className: $e.divider }),
      r.jsxs('div', {
        className: $e.section,
        children: [
          r.jsxs('div', {
            className: $e.sectionHeader,
            children: [
              r.jsx(q, { variant: 'label', color: 'mid', children: 'エクスポート' }),
              r.jsx(q, {
                variant: 'caption',
                color: 'dim',
                children: 'セーブデータを JSON ファイルとしてダウンロード',
              }),
            ],
          }),
          r.jsx(ye, {
            label: p ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: b,
            disabled: p || !s,
          }),
        ],
      }),
      r.jsxs('div', {
        className: $e.section,
        children: [
          r.jsxs('div', {
            className: $e.sectionHeader,
            children: [
              r.jsx(q, { variant: 'label', color: 'mid', children: 'インポート' }),
              r.jsx(q, {
                variant: 'caption',
                color: 'dim',
                children: 'JSON ファイルからセーブデータを復元（上書き）',
              }),
            ],
          }),
          r.jsx(b5, {
            accept: 'application/json',
            onChange: E,
            label: h ? 'インポート中...' : 'ファイルを選択してインポート',
            disabled: h || !u,
          }),
        ],
      }),
      r.jsx('div', { className: $e.divider }),
      r.jsxs('div', {
        className: $e.dangerSection,
        children: [
          r.jsxs('div', {
            className: $e.sectionHeader,
            children: [
              r.jsx(q, { variant: 'label', color: 'mid', children: 'データリセット' }),
              r.jsx(q, {
                variant: 'caption',
                color: 'dim',
                children: 'すべてのデータを削除します。この操作は取り消せません。',
              }),
            ],
          }),
          r.jsx(ye, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => d(!0),
            disabled: !o,
          }),
        ],
      }),
      r.jsx(_0, {
        open: m,
        title: 'データをリセットしますか？',
        message: 'すべてのセーブデータが削除されます。この操作は取り消せません。',
        iconName: 'skull',
        confirmLabel: 'リセットする',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: j,
        onCancel: () => d(!1),
      }),
    ],
  });
}
const x5 = '_root_sysyb_1',
  j5 = '_header_sysyb_8',
  T5 = '_section_sysyb_13',
  A5 = '_sectionHeader_sysyb_20',
  N5 = '_divider_sysyb_26',
  wn = { root: x5, header: j5, section: T5, sectionHeader: A5, divider: N5 },
  E5 = [
    { label: '×1', value: 1 },
    { label: '×2', value: 2 },
    { label: '×3', value: 3 },
  ];
function z5({ overrideVibration: c, overrideSpeed: s, onVibrationChange: u, onSpeedChange: o }) {
  const m = k((j) => j.vibrationEnabled),
    d = k((j) => j.defaultGameSpeed),
    h = k((j) => j.setVibrationEnabled),
    g = k((j) => j.setDefaultGameSpeed),
    p = c ?? m,
    _ = s ?? d,
    b = (j) => {
      u ? u(j) : h(j);
    },
    E = (j) => {
      o ? o(j) : g(j);
    };
  return r.jsxs('div', {
    className: wn.root,
    children: [
      r.jsx('div', {
        className: wn.header,
        children: r.jsx(q, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      r.jsx('div', {
        className: wn.section,
        children: r.jsx(gr, {
          checked: p,
          onChange: b,
          label: 'バイブレーション',
          description: '操作時に端末を振動させます',
        }),
      }),
      r.jsx('div', { className: wn.divider }),
      r.jsxs('div', {
        className: wn.section,
        children: [
          r.jsxs('div', {
            className: wn.sectionHeader,
            children: [
              r.jsx(q, { variant: 'label', color: 'mid', children: '初期速度倍率' }),
              r.jsx(q, { variant: 'caption', color: 'dim', children: 'ゲーム開始時の速度' }),
            ],
          }),
          r.jsx(g0, { options: E5, value: _, onChange: E }),
        ],
      }),
    ],
  });
}
const M5 = '_root_phr9m_1',
  C5 = '_header_phr9m_8',
  w5 = '_row_phr9m_14',
  O5 = '_divider_phr9m_18',
  R5 = '_sliderSection_phr9m_23',
  D5 = '_sliderHeader_phr9m_29',
  il = { root: M5, header: C5, row: w5, divider: O5, sliderSection: R5, sliderHeader: D5 };
function B5(c) {
  return 440 * Math.pow(2, (c - 69) / 12);
}
const L5 = {
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
function O(c) {
  const s = c.match(/^([A-G]#?b?)(\d)$/);
  if (!s) throw new Error(`Invalid note: ${c}`);
  const u = L5[s[1]];
  if (u === void 0) throw new Error(`Invalid note name: ${s[1]}`);
  const m = 12 + parseInt(s[2], 10) * 12 + u;
  return B5(m);
}
(O('A2'),
  O('B2'),
  O('C3'),
  O('D3'),
  O('E3'),
  O('F3'),
  O('G3'),
  O('A3'),
  O('B3'),
  O('C4'),
  O('D4'),
  O('E4'),
  O('F4'),
  O('G4'),
  O('A4'));
(O('E2'),
  O('F#2'),
  O('G2'),
  O('A2'),
  O('B2'),
  O('C3'),
  O('D3'),
  O('E3'),
  O('F#3'),
  O('G3'),
  O('A3'),
  O('B3'),
  O('C4'),
  O('D4'),
  O('E4'));
const H5 = [O('A2'), O('C3'), O('E3')],
  q5 = [O('E2'), O('G2'), O('B2')];
(O('D3'), O('F3'), O('A3'));
const U5 = [O('G2'), O('B2'), O('D3')],
  G5 = [O('C3'), O('E3'), O('G3')],
  V5 = [O('B2'), O('D3'), O('F3')];
function Ye(c, s, u, o, m, d, h, g) {
  const p = c.createOscillator(),
    _ = c.createGain();
  ((p.type = u), p.frequency.setValueAtTime(o, m));
  const b = 0.01,
    E = Math.min(0.08, d * 0.4);
  if (
    (_.gain.setValueAtTime(1e-4, m),
    _.gain.linearRampToValueAtTime(h, m + b),
    _.gain.setValueAtTime(h, m + d - E),
    _.gain.exponentialRampToValueAtTime(1e-4, m + d),
    g !== void 0)
  ) {
    const j = c.createBiquadFilter();
    ((j.type = 'lowpass'),
      (j.frequency.value = g),
      (j.Q.value = 0.8),
      p.connect(j).connect(_).connect(s));
  } else p.connect(_).connect(s);
  (p.start(m), p.stop(m + d + 0.02));
}
function $i(c, s) {
  const u = Math.max(1, Math.floor(c.sampleRate * s)),
    o = c.createBuffer(1, u, c.sampleRate),
    m = o.getChannelData(0);
  let d = 74565;
  for (let h = 0; h < u; h++)
    ((d = (d * 1664525 + 1013904223) & 4294967295), (m[h] = d / 2147483648 - 1));
  return o;
}
function qi(c, s, u, o) {
  const m = c.createOscillator(),
    d = c.createGain();
  ((m.type = 'sine'),
    m.frequency.setValueAtTime(80, u),
    m.frequency.exponentialRampToValueAtTime(30, u + 0.12),
    d.gain.setValueAtTime(o, u),
    d.gain.exponentialRampToValueAtTime(1e-4, u + 0.18),
    m.connect(d).connect(s),
    m.start(u),
    m.stop(u + 0.22));
  const h = c.createBufferSource();
  h.buffer = $i(c, 0.04);
  const g = c.createGain(),
    p = c.createBiquadFilter();
  ((p.type = 'highpass'),
    (p.frequency.value = 400),
    g.gain.setValueAtTime(o * 0.3, u),
    g.gain.exponentialRampToValueAtTime(1e-4, u + 0.04),
    h.connect(p).connect(g).connect(s),
    h.start(u));
}
function $5(c, s, u, o, m) {
  const d = c.createBufferSource();
  d.buffer = $i(c, m + 0.01);
  const h = c.createGain(),
    g = c.createBiquadFilter();
  ((g.type = 'highpass'),
    (g.frequency.value = 6e3),
    h.gain.setValueAtTime(o, u),
    h.gain.exponentialRampToValueAtTime(1e-4, u + m),
    d.connect(g).connect(h).connect(s),
    d.start(u));
}
const Y5 = 100,
  wl = 60 / Y5,
  Li = wl * 4,
  S0 = 8,
  Z5 = Li * S0,
  X5 = 2,
  k5 = 100,
  Q5 = [O('A2'), O('A2'), O('G2'), O('G2'), O('C3'), O('C3'), O('E2'), O('E2')],
  Jh = [O('A3'), O('C4'), O('E4'), O('A4'), O('G4'), O('E4'), O('C4'), O('A3')],
  Wh = [
    [O('A3'), O('C4'), O('E4')],
    [O('G3'), O('B3'), O('D4')],
    [O('C3'), O('E3'), O('G3')],
    [O('E3'), O('G3'), O('B3')],
  ];
function K5(c, s, u, o) {
  for (let m = 0; m < S0; m++) {
    const d = u + m * Li,
      h = Q5[m];
    (Ye(c, s, 'sawtooth', h, d, wl * 1.8, 0.22, 300),
      Ye(c, s, 'sawtooth', h, d + wl * 2, wl * 1.8, 0.22, 300),
      qi(c, s, d, 0.35),
      qi(c, s, d + wl * 2, 0.28));
    for (let g = 0; g < 8; g++) {
      const p = (m * 8 + g) % Jh.length,
        _ = d + g * wl * 0.5;
      Ye(c, s, 'square', Jh[p], _, wl * 0.4, 0.07, 2400);
    }
  }
  for (let m = 0; m < Wh.length; m++) {
    const d = Wh[m],
      h = u + m * Li * 2,
      g = Li * 2;
    for (const p of d) {
      const _ = c.createOscillator(),
        b = c.createGain();
      ((_.type = 'triangle'), _.frequency.setValueAtTime(p, h));
      const E = 0.08;
      (b.gain.setValueAtTime(1e-4, h),
        b.gain.linearRampToValueAtTime(E, h + 0.15),
        b.gain.setValueAtTime(E, h + g - 0.2),
        b.gain.exponentialRampToValueAtTime(1e-4, h + g),
        _.connect(b).connect(s),
        _.start(h),
        _.stop(h + g + 0.05),
        o.push(_));
    }
  }
}
function J5(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + X5 * Li;
    for (; u < g; ) (K5(c, s, u, m), (u += Z5));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, k5)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const g of m)
        try {
          g.stop(h);
        } catch {}
      m.length = 0;
    },
  };
}
const W5 = 100,
  Na = 60 / W5,
  yr = Na * 4,
  x0 = 8,
  cl = yr * x0,
  F5 = 2,
  I5 = 100,
  Fh = [O('E5'), O('D5'), O('B4'), O('G4'), O('F#4'), O('E4'), O('D4'), O('B3')];
function Ih(c, s, u, o) {
  const m = c.createBufferSource();
  m.buffer = $i(c, 0.2);
  const d = c.createGain(),
    h = c.createBiquadFilter();
  ((h.type = 'bandpass'),
    (h.frequency.value = 900),
    (h.Q.value = 0.6),
    d.gain.setValueAtTime(o, u),
    d.gain.exponentialRampToValueAtTime(1e-4, u + 0.18),
    m.connect(h).connect(d).connect(s),
    m.start(u),
    Ye(c, s, 'sine', 120, u, 0.12, o * 0.5, 300));
}
function P5(c, s, u, o) {
  {
    const d = c.createOscillator(),
      h = c.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(O('E1'), u));
    const g = 0.35;
    (h.gain.setValueAtTime(1e-4, u),
      h.gain.linearRampToValueAtTime(g, u + 0.3),
      h.gain.setValueAtTime(g, u + cl - 0.3),
      h.gain.linearRampToValueAtTime(1e-4, u + cl));
    const p = c.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 120),
      d.connect(p).connect(h).connect(s),
      d.start(u),
      d.stop(u + cl + 0.05),
      o.push(d));
  }
  for (let d = 0; d < x0; d++) {
    const h = u + d * yr;
    for (let g = 0; g < 4; g++) {
      const p = h + g * Na;
      (Ye(c, s, 'sawtooth', O('E2'), p, Na * 0.9, 0.22, 400),
        Ye(c, s, 'sawtooth', O('B2'), p, Na * 0.8, 0.1, 600));
    }
    (qi(c, s, h, 0.5),
      qi(c, s, h + Na * 2, 0.45),
      Ih(c, s, h + Na, 0.4),
      Ih(c, s, h + Na * 3, 0.38));
  }
  const m = [...V5, O('C4')];
  for (const d of m) {
    const h = c.createOscillator(),
      g = c.createGain();
    ((h.type = 'sawtooth'), h.frequency.setValueAtTime(d, u));
    const p = 0.07;
    (g.gain.setValueAtTime(1e-4, u),
      g.gain.linearRampToValueAtTime(p, u + 0.8),
      g.gain.setValueAtTime(p, u + cl - 0.8),
      g.gain.exponentialRampToValueAtTime(1e-4, u + cl));
    const _ = c.createBiquadFilter();
    ((_.type = 'lowpass'),
      (_.frequency.value = 900),
      h.connect(_).connect(g).connect(s),
      h.start(u),
      h.stop(u + cl + 0.05),
      o.push(h));
  }
  for (let d = 0; d < Fh.length; d++) {
    const h = u + d * Na * 2;
    Ye(c, s, 'sawtooth', Fh[d], h, Na * 1.6, 0.08, 2e3);
  }
  {
    const d = c.createBufferSource();
    d.buffer = $i(c, cl + 0.1);
    const h = c.createGain(),
      g = c.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 200),
      h.gain.setValueAtTime(0.04, u),
      d.connect(g).connect(h).connect(s),
      d.start(u),
      o.push(d));
  }
}
function t4(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + F5 * yr;
    for (; u < g; ) (P5(c, s, u, m), (u += cl));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, I5)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const g of m)
        try {
          g.stop(h);
        } catch {}
      m.length = 0;
    },
  };
}
const e4 = 120,
  Ea = 60 / e4,
  br = Ea * 4,
  j0 = 8,
  ms = br * j0,
  a4 = 2,
  l4 = 100,
  n4 = [O('E2'), O('E2'), O('D2'), O('D2'), O('E2'), O('E2'), O('B1'), O('B1')],
  Ph = [
    O('E4'),
    O('G4'),
    O('B4'),
    O('D5'),
    O('E5'),
    O('D5'),
    O('B4'),
    O('G4'),
    O('E4'),
    O('F#4'),
    O('G4'),
    O('A4'),
    O('B4'),
    O('A4'),
    O('G4'),
    O('F#4'),
  ];
function t0(c, s, u, o) {
  const m = c.createBufferSource();
  m.buffer = $i(c, 0.15);
  const d = c.createGain(),
    h = c.createBiquadFilter();
  ((h.type = 'bandpass'),
    (h.frequency.value = 1800),
    (h.Q.value = 0.8),
    d.gain.setValueAtTime(o, u),
    d.gain.exponentialRampToValueAtTime(1e-4, u + 0.13),
    m.connect(h).connect(d).connect(s),
    m.start(u),
    Ye(c, s, 'triangle', 200, u, 0.08, o * 0.4));
}
function i4(c, s, u, o) {
  for (let d = 0; d < j0; d++) {
    const h = u + d * br,
      g = n4[d];
    for (let p = 0; p < 4; p++) Ye(c, s, 'sawtooth', g, h + p * Ea, Ea * 0.85, 0.26, 280);
    for (let p = 0; p < 4; p++) qi(c, s, h + p * Ea, 0.42);
    (t0(c, s, h + Ea, 0.3), t0(c, s, h + Ea * 3, 0.3));
    for (let p = 0; p < 8; p++) $5(c, s, h + p * Ea * 0.5, 0.12, 0.08);
    for (let p = 0; p < 16; p++) {
      const _ = (d * 16 + p) % Ph.length,
        b = h + p * Ea * 0.25;
      Ye(c, s, 'sawtooth', Ph[_], b, Ea * 0.22, 0.06, 3200);
    }
  }
  const m = [O('E3'), O('G3'), O('B3')];
  for (const d of m) {
    const h = c.createOscillator(),
      g = c.createGain();
    ((h.type = 'triangle'),
      h.frequency.setValueAtTime(d, u),
      g.gain.setValueAtTime(1e-4, u),
      g.gain.linearRampToValueAtTime(0.06, u + 0.2),
      g.gain.setValueAtTime(0.06, u + ms - 0.3),
      g.gain.exponentialRampToValueAtTime(1e-4, u + ms));
    const p = c.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 1200),
      h.connect(p).connect(g).connect(s),
      h.start(u),
      h.stop(u + ms + 0.05),
      o.push(h));
  }
}
function c4(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + a4 * br;
    for (; u < g; ) (i4(c, s, u, m), (u += ms));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, l4)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const g of m)
        try {
          g.stop(h);
        } catch {}
      m.length = 0;
    },
  };
}
const s4 = 80,
  hs = 60 / s4,
  ys = hs * 4,
  u4 = 8,
  vs = ys * u4,
  o4 = 2,
  r4 = 100,
  e0 = [H5, G5, U5, q5],
  er = [O('A3'), O('C4'), O('E4'), O('G4'), O('A4'), O('E4')];
function f4(c, s, u, o) {
  {
    const m = c.createOscillator(),
      d = c.createGain();
    ((m.type = 'sine'), m.frequency.setValueAtTime(O('A2'), u));
    const h = 0.28;
    (d.gain.setValueAtTime(1e-4, u),
      d.gain.linearRampToValueAtTime(h, u + 0.5),
      d.gain.setValueAtTime(h, u + vs - 0.5),
      d.gain.linearRampToValueAtTime(1e-4, u + vs));
    const g = c.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 180),
      m.connect(g).connect(d).connect(s),
      m.start(u),
      m.stop(u + vs + 0.05),
      o.push(m));
  }
  for (let m = 0; m < e0.length; m++) {
    const d = e0[m],
      h = u + m * ys * 2,
      g = ys * 2;
    for (const p of d) {
      const _ = c.createOscillator(),
        b = c.createGain();
      ((_.type = 'triangle'), _.frequency.setValueAtTime(p, h));
      const E = 0.1,
        j = 0.4,
        H = 0.6;
      (b.gain.setValueAtTime(1e-4, h),
        b.gain.linearRampToValueAtTime(E, h + j),
        b.gain.setValueAtTime(E, h + g - H),
        b.gain.exponentialRampToValueAtTime(1e-4, h + g));
      const L = c.createDelay(0.5);
      L.delayTime.value = 0.25;
      const $ = c.createGain();
      $.gain.value = 0.2;
      const U = c.createBiquadFilter();
      ((U.type = 'lowpass'),
        (U.frequency.value = 2e3),
        _.connect(b).connect(s),
        _.connect(L).connect(U).connect($).connect(s),
        _.start(h),
        _.stop(h + g + 0.5),
        o.push(_));
    }
  }
  for (let m = 0; m < er.length; m++) {
    const d = u + m * hs * 2;
    (Ye(c, s, 'sawtooth', er[m], d, hs * 1.5, 0.09, 1800),
      Ye(c, s, 'sine', er[m] * 0.5, d + 0.12, hs * 1.2, 0.05, 600));
  }
}
function d4(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + o4 * ys;
    for (; u < g; ) (f4(c, s, u, m), (u += vs));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, r4)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const g of m)
        try {
          g.stop(h);
        } catch {}
      m.length = 0;
    },
  };
}
function m4(c, s, u) {
  switch (c) {
    case 'title':
      return d4(s, u);
    case 'base':
      return J5(s, u);
    case 'battleNormal':
      return c4(s, u);
    case 'battleBoss':
      return t4(s, u);
  }
}
function h4(c, s) {
  const u = Math.max(1, Math.floor(c.sampleRate * s)),
    o = c.createBuffer(1, u, c.sampleRate),
    m = o.getChannelData(0);
  for (let d = 0; d < u; d++) m[d] = Math.random() * 2 - 1;
  return o;
}
function Ie(c, s, u, o, m) {
  const d = c.gain;
  (d.setValueAtTime(1e-4, s),
    d.linearRampToValueAtTime(u, s + o),
    d.exponentialRampToValueAtTime(1e-4, s + o + m));
}
function ot(c, s, u, o, m, d, h, g, p) {
  const _ = c.createOscillator(),
    b = c.createGain();
  ((_.type = u),
    _.frequency.setValueAtTime(o, m),
    p !== void 0 && _.frequency.exponentialRampToValueAtTime(Math.max(1e-4, p), m + h + g),
    Ie(b, m, d, h, g),
    _.connect(b).connect(s),
    _.start(m),
    _.stop(m + h + g + 0.02));
}
function Pe(c, s, u, o, m, d) {
  const h = c.createBufferSource();
  h.buffer = h4(c, u);
  const g = c.createGain();
  if ((Ie(g, o, m, 0.002, u), d)) {
    const p = c.createBiquadFilter();
    ((p.type = d.type),
      (p.frequency.value = d.frequency),
      d.q !== void 0 && (p.Q.value = d.q),
      h.connect(p).connect(g).connect(s));
  } else h.connect(g).connect(s);
  h.start(o);
}
const v4 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createOscillator(),
      d = c.createGain();
    ((o.type = 'sawtooth'),
      (m.type = 'sawtooth'),
      o.frequency.setValueAtTime(900, u),
      o.frequency.exponentialRampToValueAtTime(1500, u + 0.5),
      m.frequency.setValueAtTime(905, u),
      m.frequency.exponentialRampToValueAtTime(1510, u + 0.5),
      Ie(d, u, 0.28, 0.02, 0.5),
      o.connect(d),
      m.connect(d),
      d.connect(s),
      o.start(u),
      m.start(u),
      o.stop(u + 0.55),
      m.stop(u + 0.55));
  },
  g4 = (c, s, u) => {
    for (let o = 0; o < 4; o++) {
      const m = u + o * 0.12;
      (ot(c, s, 'sine', 110, m, 0.4, 0.005, 0.18, 35),
        Pe(c, s, 0.08, m, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  _4 = (c, s, u) => {
    (Pe(c, s, 0.4, u, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      ot(c, s, 'triangle', 3e3, u, 0.25, 0.005, 0.15, 1500),
      ot(c, s, 'sawtooth', 200, u + 0.05, 0.18, 0.005, 0.3, 80));
  },
  p4 = (c, s, u) => {
    for (let o = 0; o < 5; o++) {
      const m = u + o * 0.07,
        d = c.createOscillator(),
        h = c.createGain(),
        g = c.createBiquadFilter();
      ((d.type = 'square'),
        d.frequency.setValueAtTime(1100 + o * 60, m),
        d.frequency.exponentialRampToValueAtTime(1700 + o * 60, m + 0.04),
        (g.type = 'bandpass'),
        (g.frequency.value = 1600),
        (g.Q.value = 4),
        Ie(h, m, 0.2, 0.002, 0.06),
        d.connect(g).connect(h).connect(s),
        d.start(m),
        d.stop(m + 0.08));
    }
  },
  y4 = (c, s, u) => {
    (Pe(c, s, 0.1, u, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      ot(c, s, 'triangle', 500, u, 0.18, 0.003, 0.08, 200));
  },
  b4 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(80, u),
      o.frequency.linearRampToValueAtTime(160, u + 0.8),
      Ie(m, u, 0.3, 0.1, 0.7),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.85),
      ot(c, s, 'square', 320, u + 0.2, 0.15, 0.02, 0.4));
  },
  S4 = (c, s, u) => {
    (Pe(c, s, 0.5, u, 0.45, { type: 'lowpass', frequency: 1200 }),
      ot(c, s, 'sine', 90, u, 0.5, 0.005, 0.6, 30),
      ot(c, s, 'triangle', 1200, u + 0.1, 0.2, 0.02, 0.4, 2400),
      ot(c, s, 'triangle', 1600, u + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  x4 = (c, s, u) => {
    (ot(c, s, 'sine', 180, u, 0.3, 0.005, 0.12, 60),
      Pe(c, s, 0.08, u, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  j4 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(220, u),
      o.frequency.exponentialRampToValueAtTime(40, u + 1.2),
      Ie(m, u, 0.45, 0.02, 1.2),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 1.3),
      Pe(c, s, 0.8, u, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  T4 = (c, s, u) => {
    (ot(c, s, 'triangle', 700, u, 0.22, 0.01, 0.18),
      ot(c, s, 'triangle', 1050, u + 0.12, 0.22, 0.01, 0.22));
  },
  A4 = (c, s, u) => {
    (ot(c, s, 'triangle', 600, u, 0.25, 0.01, 0.2),
      ot(c, s, 'triangle', 900, u + 0.12, 0.25, 0.01, 0.2),
      ot(c, s, 'triangle', 1350, u + 0.24, 0.3, 0.01, 0.45),
      ot(c, s, 'sine', 2400, u + 0.3, 0.15, 0.02, 0.5));
  },
  N4 = (c, s, u) => {
    (ot(c, s, 'triangle', 600, u, 0.28, 0.01, 0.18),
      ot(c, s, 'triangle', 750, u + 0.12, 0.28, 0.01, 0.18),
      ot(c, s, 'triangle', 900, u + 0.24, 0.28, 0.01, 0.22),
      ot(c, s, 'triangle', 1200, u + 0.36, 0.32, 0.01, 0.5),
      ot(c, s, 'sine', 2400, u + 0.42, 0.18, 0.02, 0.6));
  },
  E4 = (c, s, u) => {
    (ot(c, s, 'sawtooth', 300, u, 0.3, 0.02, 0.4, 220),
      ot(c, s, 'sawtooth', 220, u + 0.35, 0.3, 0.02, 0.5, 160),
      ot(c, s, 'sawtooth', 160, u + 0.8, 0.3, 0.02, 0.7, 80),
      Pe(c, s, 1, u, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  z4 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(700, u),
      o.frequency.exponentialRampToValueAtTime(400, u + 0.4),
      Ie(m, u, 0.22, 0.02, 0.4),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.45),
      Pe(c, s, 0.5, u, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  M4 = (c, s, u) => {
    ot(c, s, 'triangle', 1e3, u, 0.18, 0.003, 0.05);
  },
  C4 = (c, s, u) => {
    (ot(c, s, 'triangle', 880, u, 0.2, 0.005, 0.08),
      ot(c, s, 'triangle', 1320, u + 0.06, 0.2, 0.005, 0.12));
  },
  w4 = (c, s, u) => {
    (ot(c, s, 'square', 260, u, 0.18, 0.005, 0.07),
      ot(c, s, 'square', 200, u + 0.06, 0.18, 0.005, 0.1));
  },
  O4 = (c, s, u) => {
    ot(c, s, 'triangle', 1400, u, 0.12, 0.003, 0.04);
  },
  R4 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(500, u),
      o.frequency.exponentialRampToValueAtTime(1e3, u + 0.12),
      Ie(m, u, 0.18, 0.01, 0.12),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.15));
  },
  D4 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(1e3, u),
      o.frequency.exponentialRampToValueAtTime(500, u + 0.1),
      Ie(m, u, 0.16, 0.005, 0.1),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.13));
  },
  B4 = (c, s, u) => {
    (ot(c, s, 'sawtooth', 200, u, 0.3, 0.01, 0.35, 80),
      ot(c, s, 'triangle', 600, u + 0.05, 0.22, 0.01, 0.3, 1200),
      ot(c, s, 'triangle', 1200, u + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  L4 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain(),
      d = c.createBiquadFilter();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(1600, u),
      o.frequency.exponentialRampToValueAtTime(700, u + 0.08),
      (d.type = 'highpass'),
      (d.frequency.value = 800),
      Ie(m, u, 0.22, 0.003, 0.09),
      o.connect(d).connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.12));
  },
  H4 = (c, s, u) => {
    (ot(c, s, 'sine', 130, u, 0.5, 0.01, 0.28, 40),
      Pe(c, s, 0.12, u, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  q4 = (c, s, u) => {
    (Pe(c, s, 0.18, u, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      ot(c, s, 'triangle', 2200, u, 0.15, 0.002, 0.06, 1800));
  },
  U4 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain(),
      d = c.createBiquadFilter();
    ((o.type = 'square'),
      o.frequency.setValueAtTime(900, u),
      o.frequency.exponentialRampToValueAtTime(1400, u + 0.05),
      (d.type = 'bandpass'),
      (d.frequency.value = 1500),
      (d.Q.value = 3),
      Ie(m, u, 0.18, 0.002, 0.07),
      o.connect(d).connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.1),
      Pe(c, s, 0.05, u, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  G4 = (c, s, u) => {
    (ot(c, s, 'triangle', 700, u, 0.18, 0.005, 0.05),
      ot(c, s, 'triangle', 1050, u + 0.04, 0.18, 0.005, 0.06));
  },
  V4 = {
    laserShoot: L4,
    cannonShoot: H4,
    thunderShoot: q4,
    cutterShoot: U4,
    weaponSwitch: G4,
    activeLaser: v4,
    activeCannon: g4,
    activeThunder: _4,
    activeCutter: p4,
    enemyKill: y4,
    bossWarn: b4,
    bossKill: S4,
    machineHit: x4,
    machineDown: j4,
    waveClear: T4,
    tierClear: A4,
    tap: M4,
    purchaseOk: C4,
    reject: w4,
    tabSwitch: O4,
    dialogOpen: R4,
    dialogClose: D4,
    launch: B4,
    resultClear: N4,
    resultGameOver: E4,
    resultRetreat: z4,
  },
  $4 = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function a0(c) {
  return Math.max(0, Math.min(1, c));
}
class Y4 {
  constructor() {
    Ke(this, 'ctx', null);
    Ke(this, 'seGain', null);
    Ke(this, 'bgmGain', null);
    Ke(this, 'masterGain', null);
    Ke(this, 'lastPlayAt', new Map());
    Ke(this, 'seVolume', 0.7);
    Ke(this, 'bgmVolume', 0.5);
    Ke(this, 'currentBgm', null);
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
      o = $4[s];
    if (o !== void 0) {
      const d = this.lastPlayAt.get(s) ?? 0;
      if (u - d < o) return;
      this.lastPlayAt.set(s, u);
    }
    const m = V4[s];
    m(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(s) {
    ((this.seVolume = a0(s)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(s) {
    ((this.bgmVolume = a0(s)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
  }
  getSeVolume() {
    return this.seVolume;
  }
  getBgmVolume() {
    return this.bgmVolume;
  }
  playBgm(s) {
    var o, m;
    if (
      !this.ctx ||
      !this.bgmGain ||
      (this.ctx.state === 'suspended' && this.ctx.resume(),
      ((o = this.currentBgm) == null ? void 0 : o.id) === s)
    )
      return;
    (m = this.currentBgm) == null || m.track.stop();
    const u = m4(s, this.ctx, this.bgmGain);
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
const fs = new Y4();
function Z4({
  overrideBgmVolume: c,
  overrideSeVolume: s,
  overrideMute: u,
  onBgmChange: o,
  onSeChange: m,
  onMuteChange: d,
}) {
  const h = k((U) => U.bgmVolume),
    g = k((U) => U.seVolume),
    p = k((U) => U.setBgmVolume),
    _ = k((U) => U.setSeVolume),
    b = c ?? h,
    E = s ?? g,
    j = u ?? !1,
    H = (U) => {
      o ? o(U) : (p(U), fs.setBgmVolume(j ? 0 : U));
    },
    L = (U) => {
      m ? m(U) : (_(U), fs.setSeVolume(j ? 0 : U));
    },
    $ = (U) => {
      d ? d(U) : (fs.setBgmVolume(U ? 0 : b), fs.setSeVolume(U ? 0 : E));
    };
  return r.jsxs('div', {
    className: il.root,
    children: [
      r.jsx('div', {
        className: il.header,
        children: r.jsx(q, { variant: 'heading-3', children: 'サウンド設定' }),
      }),
      r.jsx('div', {
        className: il.row,
        children: r.jsx(gr, {
          checked: j,
          onChange: $,
          label: '全体ミュート',
          description: 'すべての音を無効にします',
        }),
      }),
      r.jsx('div', { className: il.divider }),
      r.jsxs('div', {
        className: il.sliderSection,
        children: [
          r.jsxs('div', {
            className: il.sliderHeader,
            children: [
              r.jsx(q, { variant: 'label', color: j ? 'dim' : 'mid', children: 'BGM' }),
              r.jsx(q, {
                variant: 'numeric-l',
                color: j ? 'dim' : 'default',
                children: Math.round(b * 100),
              }),
            ],
          }),
          r.jsx(ps, { value: b, min: 0, max: 1, step: 0.01, onChange: H, disabled: j }),
        ],
      }),
      r.jsxs('div', {
        className: il.sliderSection,
        children: [
          r.jsxs('div', {
            className: il.sliderHeader,
            children: [
              r.jsx(q, { variant: 'label', color: j ? 'dim' : 'mid', children: 'SE' }),
              r.jsx(q, {
                variant: 'numeric-l',
                color: j ? 'dim' : 'default',
                children: Math.round(E * 100),
              }),
            ],
          }),
          r.jsx(ps, { value: E, min: 0, max: 1, step: 0.01, onChange: L, disabled: j }),
        ],
      }),
    ],
  });
}
const cr = (c, s) => s.some((u) => c instanceof u);
let l0, n0;
function X4() {
  return l0 || (l0 = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function k4() {
  return (
    n0 ||
    (n0 = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const sr = new WeakMap(),
  ar = new WeakMap(),
  Ns = new WeakMap();
function Q4(c) {
  const s = new Promise((u, o) => {
    const m = () => {
        (c.removeEventListener('success', d), c.removeEventListener('error', h));
      },
      d = () => {
        (u(Rl(c.result)), m());
      },
      h = () => {
        (o(c.error), m());
      };
    (c.addEventListener('success', d), c.addEventListener('error', h));
  });
  return (Ns.set(s, c), s);
}
function K4(c) {
  if (sr.has(c)) return;
  const s = new Promise((u, o) => {
    const m = () => {
        (c.removeEventListener('complete', d),
          c.removeEventListener('error', h),
          c.removeEventListener('abort', h));
      },
      d = () => {
        (u(), m());
      },
      h = () => {
        (o(c.error || new DOMException('AbortError', 'AbortError')), m());
      };
    (c.addEventListener('complete', d),
      c.addEventListener('error', h),
      c.addEventListener('abort', h));
  });
  sr.set(c, s);
}
let ur = {
  get(c, s, u) {
    if (c instanceof IDBTransaction) {
      if (s === 'done') return sr.get(c);
      if (s === 'store')
        return u.objectStoreNames[1] ? void 0 : u.objectStore(u.objectStoreNames[0]);
    }
    return Rl(c[s]);
  },
  set(c, s, u) {
    return ((c[s] = u), !0);
  },
  has(c, s) {
    return c instanceof IDBTransaction && (s === 'done' || s === 'store') ? !0 : s in c;
  },
};
function T0(c) {
  ur = c(ur);
}
function J4(c) {
  return k4().includes(c)
    ? function (...s) {
        return (c.apply(or(this), s), Rl(this.request));
      }
    : function (...s) {
        return Rl(c.apply(or(this), s));
      };
}
function W4(c) {
  return typeof c == 'function'
    ? J4(c)
    : (c instanceof IDBTransaction && K4(c), cr(c, X4()) ? new Proxy(c, ur) : c);
}
function Rl(c) {
  if (c instanceof IDBRequest) return Q4(c);
  if (ar.has(c)) return ar.get(c);
  const s = W4(c);
  return (s !== c && (ar.set(c, s), Ns.set(s, c)), s);
}
const or = (c) => Ns.get(c);
function F4(c, s, { blocked: u, upgrade: o, blocking: m, terminated: d } = {}) {
  const h = indexedDB.open(c, s),
    g = Rl(h);
  return (
    o &&
      h.addEventListener('upgradeneeded', (p) => {
        o(Rl(h.result), p.oldVersion, p.newVersion, Rl(h.transaction), p);
      }),
    u && h.addEventListener('blocked', (p) => u(p.oldVersion, p.newVersion, p)),
    g
      .then((p) => {
        (d && p.addEventListener('close', () => d()),
          m && p.addEventListener('versionchange', (_) => m(_.oldVersion, _.newVersion, _)));
      })
      .catch(() => {}),
    g
  );
}
const I4 = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  P4 = ['put', 'add', 'delete', 'clear'],
  lr = new Map();
function i0(c, s) {
  if (!(c instanceof IDBDatabase && !(s in c) && typeof s == 'string')) return;
  if (lr.get(s)) return lr.get(s);
  const u = s.replace(/FromIndex$/, ''),
    o = s !== u,
    m = P4.includes(u);
  if (!(u in (o ? IDBIndex : IDBObjectStore).prototype) || !(m || I4.includes(u))) return;
  const d = async function (h, ...g) {
    const p = this.transaction(h, m ? 'readwrite' : 'readonly');
    let _ = p.store;
    return (o && (_ = _.index(g.shift())), (await Promise.all([_[u](...g), m && p.done]))[0]);
  };
  return (lr.set(s, d), d);
}
T0((c) => ({
  ...c,
  get: (s, u, o) => i0(s, u) || c.get(s, u, o),
  has: (s, u) => !!i0(s, u) || c.has(s, u),
}));
const tj = ['continue', 'continuePrimaryKey', 'advance'],
  c0 = {},
  rr = new WeakMap(),
  A0 = new WeakMap(),
  ej = {
    get(c, s) {
      if (!tj.includes(s)) return c[s];
      let u = c0[s];
      return (
        u ||
          (u = c0[s] =
            function (...o) {
              rr.set(this, A0.get(this)[s](...o));
            }),
        u
      );
    },
  };
async function* aj(...c) {
  let s = this;
  if ((s instanceof IDBCursor || (s = await s.openCursor(...c)), !s)) return;
  s = s;
  const u = new Proxy(s, ej);
  for (A0.set(u, s), Ns.set(u, or(s)); s; )
    (yield u, (s = await (rr.get(u) || s.continue())), rr.delete(u));
}
function s0(c, s) {
  return (
    (s === Symbol.asyncIterator && cr(c, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (s === 'iterate' && cr(c, [IDBIndex, IDBObjectStore]))
  );
}
T0((c) => ({
  ...c,
  get(s, u, o) {
    return s0(s, u) ? aj : c.get(s, u, o);
  },
  has(s, u) {
    return s0(s, u) || c.has(s, u);
  },
}));
const lj = {
  1: (c) => {
    (c.createObjectStore(Q.profile, { keyPath: 'id' }),
      c.createObjectStore(Q.currencies, { keyPath: 'id' }),
      c.createObjectStore(Q.machine, { keyPath: 'key' }),
      c.createObjectStore(Q.weapons, { keyPath: 'id' }),
      c
        .createObjectStore(Q.patches, { keyPath: ['name', 'tier'] })
        .createIndex('byName', 'name', { unique: !1 }),
      c.createObjectStore(Q.equippedPatches, { keyPath: 'slotIndex' }),
      c.createObjectStore(Q.settings, { keyPath: 'id' }));
  },
};
function nj(c, s, u, o) {
  for (let m = u + 1; m <= o; m++) {
    const d = lj[m];
    if (!d) throw new Error(`No migration registered for version ${m}`);
    d(c, s);
  }
}
let Bi = null;
async function u0() {
  return (
    Bi ||
    ((Bi = await F4(r0, _s, {
      upgrade(c, s, u, o) {
        try {
          nj(c, o, s, u ?? _s);
        } catch (m) {
          throw (console.error('[DB] Migration failed:', m), m);
        }
      },
    })),
    await ij(Bi),
    Bi)
  );
}
async function ij(c) {
  const s = c.transaction([Q.profile, Q.currencies, Q.machine, Q.weapons, Q.settings], 'readwrite'),
    [u, o, m, d] = await Promise.all([
      s.objectStore(Q.profile).get('singleton'),
      s.objectStore(Q.currencies).get('singleton'),
      s.objectStore(Q.weapons).get('singleton'),
      s.objectStore(Q.settings).get('singleton'),
    ]),
    h = Date.now(),
    g = [];
  (u || g.push(s.objectStore(Q.profile).put({ ...sp, createdAt: h, lastPlayedAt: h })),
    o || g.push(s.objectStore(Q.currencies).put(up)),
    m || g.push(s.objectStore(Q.weapons).put(op)),
    d || g.push(s.objectStore(Q.settings).put(rp)));
  const p = s.objectStore(Q.machine),
    _ = await p.getAllKeys(),
    b = new Set(_);
  for (const E of f0) b.has(E) || g.push(p.put({ key: E, lv: 0 }));
  (await Promise.all(g), await s.done);
}
async function cj(c) {
  const s = c.transaction(
      [Q.profile, Q.currencies, Q.machine, Q.weapons, Q.patches, Q.equippedPatches, Q.settings],
      'readonly'
    ),
    [u, o, m, d, h, g, p] = await Promise.all([
      s.objectStore(Q.profile).get('singleton'),
      s.objectStore(Q.currencies).get('singleton'),
      s.objectStore(Q.machine).getAll(),
      s.objectStore(Q.weapons).get('singleton'),
      s.objectStore(Q.patches).getAll(),
      s.objectStore(Q.equippedPatches).getAll(),
      s.objectStore(Q.settings).get('singleton'),
    ]);
  if ((await s.done, !u || !o || !d || !p))
    throw new Error(
      '[DB] loadSaveState: Required singleton record is missing. Run openDatabase() first.'
    );
  return {
    profile: u,
    currencies: o,
    machine: m,
    weapons: d,
    patches: h,
    equippedPatches: g,
    settings: p,
  };
}
const N0 = 'tower-like-game:import-backups',
  sj = 3;
function uj() {
  try {
    const c = localStorage.getItem(N0);
    return c ? JSON.parse(c) : [];
  } catch {
    return [];
  }
}
function oj(c) {
  try {
    localStorage.setItem(N0, JSON.stringify(c));
  } catch (s) {
    console.warn('[DB] Failed to save backup to localStorage:', s);
  }
}
function rj(c) {
  const s = uj();
  s.unshift({ savedAt: Date.now(), data: c });
  const u = s.slice(0, sj);
  oj(u);
}
async function E0(c) {
  const s = await cj(c);
  return { formatVersion: 1, dbVersion: _s, exportedAt: Date.now(), data: s };
}
async function fj(c, s) {
  if (s.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${s.formatVersion}`);
  try {
    const d = await E0(c);
    rj(d);
  } catch (d) {
    console.warn('[DB] Pre-import backup failed (proceeding anyway):', d);
  }
  const { data: u } = s,
    o = c.transaction(
      [Q.profile, Q.currencies, Q.machine, Q.weapons, Q.patches, Q.equippedPatches, Q.settings],
      'readwrite'
    );
  await Promise.all([
    o.objectStore(Q.profile).clear(),
    o.objectStore(Q.currencies).clear(),
    o.objectStore(Q.machine).clear(),
    o.objectStore(Q.weapons).clear(),
    o.objectStore(Q.patches).clear(),
    o.objectStore(Q.equippedPatches).clear(),
    o.objectStore(Q.settings).clear(),
  ]);
  const m = [
    o.objectStore(Q.profile).put(u.profile),
    o.objectStore(Q.currencies).put(u.currencies),
    o.objectStore(Q.weapons).put(u.weapons),
    o.objectStore(Q.settings).put(u.settings),
    ...u.machine.map((d) => o.objectStore(Q.machine).put(d)),
    ...u.patches.map((d) => o.objectStore(Q.patches).put(d)),
    ...u.equippedPatches.map((d) => o.objectStore(Q.equippedPatches).put(d)),
  ];
  (await Promise.all(m), await o.done);
}
const dj = [
  { key: 'sound', label: '音' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function mj() {
  const { navigate: c } = Ma(),
    [s, u] = ft.useState('sound'),
    o = async () => {
      const h = await u0(),
        g = await E0(h),
        p = JSON.stringify(g, null, 2),
        _ = new Blob([p], { type: 'application/json' }),
        b = URL.createObjectURL(_),
        E = document.createElement('a');
      ((E.href = b),
        (E.download = `neon-spire-save-${new Date().toISOString().slice(0, 10)}.json`),
        E.click(),
        URL.revokeObjectURL(b));
    },
    m = async (h) => {
      const g = await h.text(),
        p = JSON.parse(g),
        _ = await u0();
      (await fj(_, p), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(r0), window.location.reload());
    };
  return r.jsx(Dl, {
    header: r.jsx(Gi, {
      title: '設定',
      currencies: [],
      tabBar: r.jsx(bs, { tabs: dj, value: s, onChange: u, fullWidth: !0 }),
    }),
    footer: r.jsx(Ui, { active: 'settings', onChange: c }),
    children: r.jsxs('div', {
      className: c5.content,
      children: [
        s === 'sound' && r.jsx(Z4, {}),
        s === 'game' && r.jsx(z5, {}),
        s === 'data' && r.jsx(S5, { onExport: o, onImport: m, onReset: d }),
      ],
    }),
  });
}
const hj = '_center_5h2s4_1',
  vj = { center: hj },
  gj = '_root_5udm7_1',
  _j = { root: gj };
function pj({ onResume: c, onNewGame: s, onSettings: u, lastSavedAt: o }) {
  const m = k((p) => p.createdAt),
    { navigate: d } = Ma(),
    h = m > 0;
  function g() {
    u ? u() : d('settings');
  }
  return r.jsxs('div', {
    className: _j.root,
    children: [
      r.jsx(ye, {
        label: h ? '続きから' : '続きから (セーブなし)',
        variant: h ? 'primary' : 'ghost',
        size: 'lg',
        fullWidth: !0,
        disabled: !h,
        iconLeft: r.jsx(Ct, { name: 'play', size: 18 }),
        onClick: c,
      }),
      h &&
        o != null &&
        r.jsx(q, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
          children: '最終セーブ: ' + o,
        }),
      r.jsx(ye, {
        label: '新規開始',
        variant: h ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: r.jsx(Ct, { name: 'plus', size: 18 }),
        onClick: s,
      }),
      r.jsx(ye, {
        label: '設定',
        variant: 'ghost',
        size: 'md',
        fullWidth: !0,
        iconLeft: r.jsx(Ct, { name: 'settings', size: 16 }),
        onClick: g,
      }),
    ],
  });
}
const yj = '_root_qkflo_2',
  bj = '_title_qkflo_12',
  o0 = { root: yj, title: bj };
function Sj({ title: c = 'NEON SPIRE', subtitle: s, version: u, tagline: o }) {
  return r.jsxs('header', {
    className: o0.root,
    role: 'banner',
    children: [
      r.jsx('h1', { className: o0.title, children: c }),
      s != null &&
        r.jsx(q, {
          variant: 'label',
          color: 'mid',
          align: 'center',
          style: { fontSize: 11, letterSpacing: '0.24em' },
          children: s,
        }),
      o != null &&
        r.jsx(q, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { marginTop: 4, fontSize: 11 },
          children: o,
        }),
      u != null &&
        r.jsx(q, {
          variant: 'numeric-s',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10, marginTop: 6, opacity: 0.7 },
          children: u,
        }),
    ],
  });
}
function xj() {
  const { navigate: c } = Ma();
  return r.jsx(Dl, {
    children: r.jsxs('div', {
      className: vj.center,
      children: [
        r.jsx(Sj, { subtitle: 'CYBER TOWER DEFENSE × INFINITE TIER', version: 'v0.1.0' }),
        r.jsx(pj, {
          onResume: () => c('preparation'),
          onNewGame: () => c('preparation'),
          onSettings: () => c('settings'),
        }),
      ],
    }),
  });
}
function jj() {
  const { screen: c } = Ma();
  switch (c) {
    case 'title':
      return r.jsx(xj, {});
    case 'preparation':
      return r.jsx(n5, {});
    case 'machine':
      return r.jsx(mx, {});
    case 'armory':
      return r.jsx(Oy, {});
    case 'patches':
      return r.jsx(N3, {});
    case 'settings':
      return r.jsx(mj, {});
    case 'battle':
      return r.jsx(sx, {});
    default:
      return r.jsx(hx, {});
  }
}
const z0 = document.getElementById('root');
if (!z0) throw new Error('Failed to find #root element');
og.createRoot(z0).render(r.jsx(Cy, { children: r.jsx(jj, {}) }));
