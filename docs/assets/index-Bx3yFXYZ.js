var tg = Object.defineProperty;
var eg = (c, s, u) =>
  s in c ? tg(c, s, { enumerable: !0, configurable: !0, writable: !0, value: u }) : (c[s] = u);
var Ke = (c, s, u) => eg(c, typeof s != 'symbol' ? s + '' : s, u);
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
function ag(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var Zo = { exports: {} },
  Ai = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jh;
function lg() {
  if (jh) return Ai;
  jh = 1;
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
  return ((Ai.Fragment = s), (Ai.jsx = u), (Ai.jsxs = u), Ai);
}
var Th;
function ng() {
  return (Th || ((Th = 1), (Zo.exports = lg())), Zo.exports);
}
var r = ng(),
  Xo = { exports: {} },
  Ni = {},
  Qo = { exports: {} },
  Ko = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ah;
function ig() {
  return (
    Ah ||
      ((Ah = 1),
      (function (c) {
        function s(w, G) {
          var W = w.length;
          w.push(G);
          t: for (; 0 < W; ) {
            var _t = (W - 1) >>> 1,
              pt = w[_t];
            if (0 < m(pt, G)) ((w[_t] = G), (w[W] = pt), (W = _t));
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
            t: for (var _t = 0, pt = w.length, x = pt >>> 1; _t < x; ) {
              var L = 2 * (_t + 1) - 1,
                $ = w[L],
                k = L + 1,
                I = w[k];
              if (0 > m($, W))
                k < pt && 0 > m(I, $)
                  ? ((w[_t] = I), (w[k] = W), (_t = k))
                  : ((w[_t] = $), (w[L] = W), (_t = L));
              else if (k < pt && 0 > m(I, W)) ((w[_t] = I), (w[k] = W), (_t = k));
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
        var y = [],
          _ = [],
          b = 1,
          E = null,
          j = 3,
          H = !1,
          R = !1,
          V = !1,
          U = !1,
          st = typeof setTimeout == 'function' ? setTimeout : null,
          F = typeof clearTimeout == 'function' ? clearTimeout : null,
          yt = typeof setImmediate < 'u' ? setImmediate : null;
        function Yt(w) {
          for (var G = u(_); G !== null; ) {
            if (G.callback === null) o(_);
            else if (G.startTime <= w) (o(_), (G.sortIndex = G.expirationTime), s(y, G));
            else break;
            G = u(_);
          }
        }
        function ae(w) {
          if (((V = !1), Yt(w), !R))
            if (u(y) !== null) ((R = !0), Rt || ((Rt = !0), Xt()));
            else {
              var G = u(_);
              G !== null && le(ae, G.startTime - w);
            }
        }
        var Rt = !1,
          lt = -1,
          Zt = 5,
          re = -1;
        function se() {
          return U ? !0 : !(c.unstable_now() - re < Zt);
        }
        function Bt() {
          if (((U = !1), Rt)) {
            var w = c.unstable_now();
            re = w;
            var G = !0;
            try {
              t: {
                ((R = !1), V && ((V = !1), F(lt), (lt = -1)), (H = !0));
                var W = j;
                try {
                  e: {
                    for (Yt(w), E = u(y); E !== null && !(E.expirationTime > w && se()); ) {
                      var _t = E.callback;
                      if (typeof _t == 'function') {
                        ((E.callback = null), (j = E.priorityLevel));
                        var pt = _t(E.expirationTime <= w);
                        if (((w = c.unstable_now()), typeof pt == 'function')) {
                          ((E.callback = pt), Yt(w), (G = !0));
                          break e;
                        }
                        (E === u(y) && o(y), Yt(w));
                      } else o(y);
                      E = u(y);
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
              G ? Xt() : (Rt = !1);
            }
          }
        }
        var Xt;
        if (typeof yt == 'function')
          Xt = function () {
            yt(Bt);
          };
        else if (typeof MessageChannel < 'u') {
          var ke = new MessageChannel(),
            we = ke.port2;
          ((ke.port1.onmessage = Bt),
            (Xt = function () {
              we.postMessage(null);
            }));
        } else
          Xt = function () {
            st(Bt, 0);
          };
        function le(w, G) {
          lt = st(function () {
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
              : (Zt = 0 < w ? Math.floor(1e3 / w) : 5);
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
            var _t = c.unstable_now();
            switch (
              (typeof W == 'object' && W !== null
                ? ((W = W.delay), (W = typeof W == 'number' && 0 < W ? _t + W : _t))
                : (W = _t),
              w)
            ) {
              case 1:
                var pt = -1;
                break;
              case 2:
                pt = 250;
                break;
              case 5:
                pt = 1073741823;
                break;
              case 4:
                pt = 1e4;
                break;
              default:
                pt = 5e3;
            }
            return (
              (pt = W + pt),
              (w = {
                id: b++,
                callback: G,
                priorityLevel: w,
                startTime: W,
                expirationTime: pt,
                sortIndex: -1,
              }),
              W > _t
                ? ((w.sortIndex = W),
                  s(_, w),
                  u(y) === null &&
                    w === u(_) &&
                    (V ? (F(lt), (lt = -1)) : (V = !0), le(ae, W - _t)))
                : ((w.sortIndex = pt), s(y, w), R || H || ((R = !0), Rt || ((Rt = !0), Xt()))),
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
      })(Ko)),
    Ko
  );
}
var Nh;
function cg() {
  return (Nh || ((Nh = 1), (Qo.exports = ig())), Qo.exports);
}
var Jo = { exports: {} },
  P = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eh;
function sg() {
  if (Eh) return P;
  Eh = 1;
  var c = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.portal'),
    u = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    m = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    g = Symbol.for('react.forward_ref'),
    y = Symbol.for('react.suspense'),
    _ = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    E = Symbol.for('react.activity'),
    j = Symbol.iterator;
  function H(x) {
    return x === null || typeof x != 'object'
      ? null
      : ((x = (j && x[j]) || x['@@iterator']), typeof x == 'function' ? x : null);
  }
  var R = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    V = Object.assign,
    U = {};
  function st(x, L, $) {
    ((this.props = x), (this.context = L), (this.refs = U), (this.updater = $ || R));
  }
  ((st.prototype.isReactComponent = {}),
    (st.prototype.setState = function (x, L) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, L, 'setState');
    }),
    (st.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function F() {}
  F.prototype = st.prototype;
  function yt(x, L, $) {
    ((this.props = x), (this.context = L), (this.refs = U), (this.updater = $ || R));
  }
  var Yt = (yt.prototype = new F());
  ((Yt.constructor = yt), V(Yt, st.prototype), (Yt.isPureReactComponent = !0));
  var ae = Array.isArray;
  function Rt() {}
  var lt = { H: null, A: null, T: null, S: null },
    Zt = Object.prototype.hasOwnProperty;
  function re(x, L, $) {
    var k = $.ref;
    return { $$typeof: c, type: x, key: L, ref: k !== void 0 ? k : null, props: $ };
  }
  function se(x, L) {
    return re(x.type, L, x.props);
  }
  function Bt(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === c;
  }
  function Xt(x) {
    var L = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function ($) {
        return L[$];
      })
    );
  }
  var ke = /\/+/g;
  function we(x, L) {
    return typeof x == 'object' && x !== null && x.key != null ? Xt('' + x.key) : L.toString(36);
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
            ? x.then(Rt, Rt)
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
  function w(x, L, $, k, I) {
    var nt = typeof x;
    (nt === 'undefined' || nt === 'boolean') && (x = null);
    var mt = !1;
    if (x === null) mt = !0;
    else
      switch (nt) {
        case 'bigint':
        case 'string':
        case 'number':
          mt = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case c:
            case s:
              mt = !0;
              break;
            case b:
              return ((mt = x._init), w(mt(x._payload), L, $, k, I));
          }
      }
    if (mt)
      return (
        (I = I(x)),
        (mt = k === '' ? '.' + we(x, 0) : k),
        ae(I)
          ? (($ = ''),
            mt != null && ($ = mt.replace(ke, '$&/') + '/'),
            w(I, L, $, '', function (ol) {
              return ol;
            }))
          : I != null &&
            (Bt(I) &&
              (I = se(
                I,
                $ +
                  (I.key == null || (x && x.key === I.key)
                    ? ''
                    : ('' + I.key).replace(ke, '$&/') + '/') +
                  mt
              )),
            L.push(I)),
        1
      );
    mt = 0;
    var Wt = k === '' ? '.' : k + ':';
    if (ae(x))
      for (var wt = 0; wt < x.length; wt++)
        ((k = x[wt]), (nt = Wt + we(k, wt)), (mt += w(k, L, $, nt, I)));
    else if (((wt = H(x)), typeof wt == 'function'))
      for (x = wt.call(x), wt = 0; !(k = x.next()).done; )
        ((k = k.value), (nt = Wt + we(k, wt++)), (mt += w(k, L, $, nt, I)));
    else if (nt === 'object') {
      if (typeof x.then == 'function') return w(le(x), L, $, k, I);
      throw (
        (L = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (L === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : L) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return mt;
  }
  function G(x, L, $) {
    if (x == null) return x;
    var k = [],
      I = 0;
    return (
      w(x, k, '', '', function (nt) {
        return L.call($, nt, I++);
      }),
      k
    );
  }
  function W(x) {
    if (x._status === -1) {
      var L = x._result;
      ((L = L()),
        L.then(
          function ($) {
            (x._status === 0 || x._status === -1) && ((x._status = 1), (x._result = $));
          },
          function ($) {
            (x._status === 0 || x._status === -1) && ((x._status = 2), (x._result = $));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = L)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var _t =
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
    pt = {
      map: G,
      forEach: function (x, L, $) {
        G(
          x,
          function () {
            L.apply(this, arguments);
          },
          $
        );
      },
      count: function (x) {
        var L = 0;
        return (
          G(x, function () {
            L++;
          }),
          L
        );
      },
      toArray: function (x) {
        return (
          G(x, function (L) {
            return L;
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
    (P.Children = pt),
    (P.Component = st),
    (P.Fragment = u),
    (P.Profiler = m),
    (P.PureComponent = yt),
    (P.StrictMode = o),
    (P.Suspense = y),
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
    (P.cloneElement = function (x, L, $) {
      if (x == null) throw Error('The argument must be a React element, but you passed ' + x + '.');
      var k = V({}, x.props),
        I = x.key;
      if (L != null)
        for (nt in (L.key !== void 0 && (I = '' + L.key), L))
          !Zt.call(L, nt) ||
            nt === 'key' ||
            nt === '__self' ||
            nt === '__source' ||
            (nt === 'ref' && L.ref === void 0) ||
            (k[nt] = L[nt]);
      var nt = arguments.length - 2;
      if (nt === 1) k.children = $;
      else if (1 < nt) {
        for (var mt = Array(nt), Wt = 0; Wt < nt; Wt++) mt[Wt] = arguments[Wt + 2];
        k.children = mt;
      }
      return re(x.type, I, k);
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
    (P.createElement = function (x, L, $) {
      var k,
        I = {},
        nt = null;
      if (L != null)
        for (k in (L.key !== void 0 && (nt = '' + L.key), L))
          Zt.call(L, k) && k !== 'key' && k !== '__self' && k !== '__source' && (I[k] = L[k]);
      var mt = arguments.length - 2;
      if (mt === 1) I.children = $;
      else if (1 < mt) {
        for (var Wt = Array(mt), wt = 0; wt < mt; wt++) Wt[wt] = arguments[wt + 2];
        I.children = Wt;
      }
      if (x && x.defaultProps)
        for (k in ((mt = x.defaultProps), mt)) I[k] === void 0 && (I[k] = mt[k]);
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
    (P.memo = function (x, L) {
      return { $$typeof: _, type: x, compare: L === void 0 ? null : L };
    }),
    (P.startTransition = function (x) {
      var L = lt.T,
        $ = {};
      lt.T = $;
      try {
        var k = x(),
          I = lt.S;
        (I !== null && I($, k),
          typeof k == 'object' && k !== null && typeof k.then == 'function' && k.then(Rt, _t));
      } catch (nt) {
        _t(nt);
      } finally {
        (L !== null && $.types !== null && (L.types = $.types), (lt.T = L));
      }
    }),
    (P.unstable_useCacheRefresh = function () {
      return lt.H.useCacheRefresh();
    }),
    (P.use = function (x) {
      return lt.H.use(x);
    }),
    (P.useActionState = function (x, L, $) {
      return lt.H.useActionState(x, L, $);
    }),
    (P.useCallback = function (x, L) {
      return lt.H.useCallback(x, L);
    }),
    (P.useContext = function (x) {
      return lt.H.useContext(x);
    }),
    (P.useDebugValue = function () {}),
    (P.useDeferredValue = function (x, L) {
      return lt.H.useDeferredValue(x, L);
    }),
    (P.useEffect = function (x, L) {
      return lt.H.useEffect(x, L);
    }),
    (P.useEffectEvent = function (x) {
      return lt.H.useEffectEvent(x);
    }),
    (P.useId = function () {
      return lt.H.useId();
    }),
    (P.useImperativeHandle = function (x, L, $) {
      return lt.H.useImperativeHandle(x, L, $);
    }),
    (P.useInsertionEffect = function (x, L) {
      return lt.H.useInsertionEffect(x, L);
    }),
    (P.useLayoutEffect = function (x, L) {
      return lt.H.useLayoutEffect(x, L);
    }),
    (P.useMemo = function (x, L) {
      return lt.H.useMemo(x, L);
    }),
    (P.useOptimistic = function (x, L) {
      return lt.H.useOptimistic(x, L);
    }),
    (P.useReducer = function (x, L, $) {
      return lt.H.useReducer(x, L, $);
    }),
    (P.useRef = function (x) {
      return lt.H.useRef(x);
    }),
    (P.useState = function (x) {
      return lt.H.useState(x);
    }),
    (P.useSyncExternalStore = function (x, L, $) {
      return lt.H.useSyncExternalStore(x, L, $);
    }),
    (P.useTransition = function () {
      return lt.H.useTransition();
    }),
    (P.version = '19.2.5'),
    P
  );
}
var zh;
function dr() {
  return (zh || ((zh = 1), (Jo.exports = sg())), Jo.exports);
}
var Wo = { exports: {} },
  ne = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mh;
function ug() {
  if (Mh) return ne;
  Mh = 1;
  var c = dr();
  function s(y) {
    var _ = 'https://react.dev/errors/' + y;
    if (1 < arguments.length) {
      _ += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++) _ += '&args[]=' + encodeURIComponent(arguments[b]);
    }
    return (
      'Minified React error #' +
      y +
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
  function d(y, _, b) {
    var E = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: E == null ? null : '' + E,
      children: y,
      containerInfo: _,
      implementation: b,
    };
  }
  var h = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(y, _) {
    if (y === 'font') return '';
    if (typeof _ == 'string') return _ === 'use-credentials' ? _ : '';
  }
  return (
    (ne.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (ne.createPortal = function (y, _) {
      var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!_ || (_.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)) throw Error(s(299));
      return d(y, _, null, b);
    }),
    (ne.flushSync = function (y) {
      var _ = h.T,
        b = o.p;
      try {
        if (((h.T = null), (o.p = 2), y)) return y();
      } finally {
        ((h.T = _), (o.p = b), o.d.f());
      }
    }),
    (ne.preconnect = function (y, _) {
      typeof y == 'string' &&
        (_
          ? ((_ = _.crossOrigin),
            (_ = typeof _ == 'string' ? (_ === 'use-credentials' ? _ : '') : void 0))
          : (_ = null),
        o.d.C(y, _));
    }),
    (ne.prefetchDNS = function (y) {
      typeof y == 'string' && o.d.D(y);
    }),
    (ne.preinit = function (y, _) {
      if (typeof y == 'string' && _ && typeof _.as == 'string') {
        var b = _.as,
          E = g(b, _.crossOrigin),
          j = typeof _.integrity == 'string' ? _.integrity : void 0,
          H = typeof _.fetchPriority == 'string' ? _.fetchPriority : void 0;
        b === 'style'
          ? o.d.S(y, typeof _.precedence == 'string' ? _.precedence : void 0, {
              crossOrigin: E,
              integrity: j,
              fetchPriority: H,
            })
          : b === 'script' &&
            o.d.X(y, {
              crossOrigin: E,
              integrity: j,
              fetchPriority: H,
              nonce: typeof _.nonce == 'string' ? _.nonce : void 0,
            });
      }
    }),
    (ne.preinitModule = function (y, _) {
      if (typeof y == 'string')
        if (typeof _ == 'object' && _ !== null) {
          if (_.as == null || _.as === 'script') {
            var b = g(_.as, _.crossOrigin);
            o.d.M(y, {
              crossOrigin: b,
              integrity: typeof _.integrity == 'string' ? _.integrity : void 0,
              nonce: typeof _.nonce == 'string' ? _.nonce : void 0,
            });
          }
        } else _ == null && o.d.M(y);
    }),
    (ne.preload = function (y, _) {
      if (typeof y == 'string' && typeof _ == 'object' && _ !== null && typeof _.as == 'string') {
        var b = _.as,
          E = g(b, _.crossOrigin);
        o.d.L(y, b, {
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
    (ne.preloadModule = function (y, _) {
      if (typeof y == 'string')
        if (_) {
          var b = g(_.as, _.crossOrigin);
          o.d.m(y, {
            as: typeof _.as == 'string' && _.as !== 'script' ? _.as : void 0,
            crossOrigin: b,
            integrity: typeof _.integrity == 'string' ? _.integrity : void 0,
          });
        } else o.d.m(y);
    }),
    (ne.requestFormReset = function (y) {
      o.d.r(y);
    }),
    (ne.unstable_batchedUpdates = function (y, _) {
      return y(_);
    }),
    (ne.useFormState = function (y, _, b) {
      return h.H.useFormState(y, _, b);
    }),
    (ne.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (ne.version = '19.2.5'),
    ne
  );
}
var Ch;
function og() {
  if (Ch) return Wo.exports;
  Ch = 1;
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
  return (c(), (Wo.exports = ug()), Wo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wh;
function rg() {
  if (wh) return Ni;
  wh = 1;
  var c = cg(),
    s = dr(),
    u = og();
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
  function y(t) {
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
          if (i === a) return (y(n), t);
          if (i === l) return (y(n), e);
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
    R = Symbol.for('react.portal'),
    V = Symbol.for('react.fragment'),
    U = Symbol.for('react.strict_mode'),
    st = Symbol.for('react.profiler'),
    F = Symbol.for('react.consumer'),
    yt = Symbol.for('react.context'),
    Yt = Symbol.for('react.forward_ref'),
    ae = Symbol.for('react.suspense'),
    Rt = Symbol.for('react.suspense_list'),
    lt = Symbol.for('react.memo'),
    Zt = Symbol.for('react.lazy'),
    re = Symbol.for('react.activity'),
    se = Symbol.for('react.memo_cache_sentinel'),
    Bt = Symbol.iterator;
  function Xt(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (Bt && t[Bt]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var ke = Symbol.for('react.client.reference');
  function we(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === ke ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case V:
        return 'Fragment';
      case st:
        return 'Profiler';
      case U:
        return 'StrictMode';
      case ae:
        return 'Suspense';
      case Rt:
        return 'SuspenseList';
      case re:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case R:
          return 'Portal';
        case yt:
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
        case Zt:
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
    _t = [],
    pt = -1;
  function x(t) {
    return { current: t };
  }
  function L(t) {
    0 > pt || ((t.current = _t[pt]), (_t[pt] = null), pt--);
  }
  function $(t, e) {
    (pt++, (_t[pt] = t.current), (t.current = e));
  }
  var k = x(null),
    I = x(null),
    nt = x(null),
    mt = x(null);
  function Wt(t, e) {
    switch (($(nt, e), $(I, t), $(k, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Xm(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = Xm(e)), (t = Qm(e, t)));
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
    (L(k), $(k, t));
  }
  function wt() {
    (L(k), L(I), L(nt));
  }
  function ol(t) {
    t.memoizedState !== null && $(mt, t);
    var e = k.current,
      a = Qm(e, t.type);
    e !== a && ($(I, t), $(k, a));
  }
  function Ll(t) {
    (I.current === t && (L(k), L(I)), mt.current === t && (L(mt), (Si._currentValue = W)));
  }
  var Hl, zs;
  function Ca(t) {
    if (Hl === void 0)
      try {
        throw Error();
      } catch (a) {
        var e = a.stack.trim().match(/\n( *(at )?)/);
        ((Hl = (e && e[1]) || ''),
          (zs =
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
      Hl +
      t +
      zs
    );
  }
  var tt = !1;
  function ql(t, e) {
    if (!t || tt) return '';
    tt = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var B = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(B.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(B, []);
                } catch (M) {
                  var z = M;
                }
                Reflect.construct(t, [], B);
              } else {
                try {
                  B.call();
                } catch (M) {
                  z = M;
                }
                t.call(B.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (M) {
                z = M;
              }
              (B = t()) && typeof B.catch == 'function' && B.catch(function () {});
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
        var p = f.split(`
`),
          N = v.split(`
`);
        for (n = l = 0; l < p.length && !p[l].includes('DetermineComponentFrameRoot'); ) l++;
        for (; n < N.length && !N[n].includes('DetermineComponentFrameRoot'); ) n++;
        if (l === p.length || n === N.length)
          for (l = p.length - 1, n = N.length - 1; 1 <= l && 0 <= n && p[l] !== N[n]; ) n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (p[l] !== N[n]) {
            if (l !== 1 || n !== 1)
              do
                if ((l--, n--, 0 > n || p[l] !== N[n])) {
                  var C =
                    `
` + p[l].replace(' at new ', ' at ');
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
  function ki(t, e) {
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
        return ql(t.type, !1);
      case 11:
        return ql(t.type.render, !1);
      case 1:
        return ql(t.type, !0);
      case 31:
        return Ca('Activity');
      default:
        return '';
    }
  }
  function xr(t) {
    try {
      var e = '',
        a = null;
      do ((e += ki(t, a)), (a = t), (t = t.return));
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
  var Ms = Object.prototype.hasOwnProperty,
    Cs = c.unstable_scheduleCallback,
    ws = c.unstable_cancelCallback,
    O0 = c.unstable_shouldYield,
    D0 = c.unstable_requestPaint,
    be = c.unstable_now,
    R0 = c.unstable_getCurrentPriorityLevel,
    jr = c.unstable_ImmediatePriority,
    Tr = c.unstable_UserBlockingPriority,
    Zi = c.unstable_NormalPriority,
    B0 = c.unstable_LowPriority,
    Ar = c.unstable_IdlePriority,
    L0 = c.log,
    H0 = c.unstable_setDisableYieldValue,
    Dn = null,
    Se = null;
  function wa(t) {
    if ((typeof L0 == 'function' && H0(t), Se && typeof Se.setStrictMode == 'function'))
      try {
        Se.setStrictMode(Dn, t);
      } catch {}
  }
  var xe = Math.clz32 ? Math.clz32 : G0,
    q0 = Math.log,
    U0 = Math.LN2;
  function G0(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((q0(t) / U0) | 0)) | 0);
  }
  var Xi = 256,
    Qi = 262144,
    Ki = 4194304;
  function rl(t) {
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
  function Ji(t, e, a) {
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
            ? (n = rl(l))
            : ((f &= v), f !== 0 ? (n = rl(f)) : a || ((a = v & ~t), a !== 0 && (n = rl(a)))))
        : ((v = l & ~i),
          v !== 0
            ? (n = rl(v))
            : f !== 0
              ? (n = rl(f))
              : a || ((a = l & ~t), a !== 0 && (n = rl(a)))),
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
  function V0(t, e) {
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
  function Nr() {
    var t = Ki;
    return ((Ki <<= 1), (Ki & 62914560) === 0 && (Ki = 4194304), t);
  }
  function Os(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function Bn(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function $0(t, e, a, l, n, i) {
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
      p = t.expirationTimes,
      N = t.hiddenUpdates;
    for (a = f & ~a; 0 < a; ) {
      var C = 31 - xe(a),
        B = 1 << C;
      ((v[C] = 0), (p[C] = -1));
      var z = N[C];
      if (z !== null)
        for (N[C] = null, C = 0; C < z.length; C++) {
          var M = z[C];
          M !== null && (M.lane &= -536870913);
        }
      a &= ~B;
    }
    (l !== 0 && Er(t, l, 0),
      i !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(f & ~e)));
  }
  function Er(t, e, a) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var l = 31 - xe(e);
    ((t.entangledLanes |= e),
      (t.entanglements[l] = t.entanglements[l] | 1073741824 | (a & 261930)));
  }
  function zr(t, e) {
    var a = (t.entangledLanes |= e);
    for (t = t.entanglements; a; ) {
      var l = 31 - xe(a),
        n = 1 << l;
      ((n & e) | (t[l] & e) && (t[l] |= e), (a &= ~n));
    }
  }
  function Mr(t, e) {
    var a = e & -e;
    return ((a = (a & 42) !== 0 ? 1 : Ds(a)), (a & (t.suspendedLanes | e)) !== 0 ? 0 : a);
  }
  function Ds(t) {
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
  function Cr() {
    var t = G.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : gh(t.type));
  }
  function wr(t, e) {
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
    Ul = '__reactContainer$' + Oa,
    Bs = '__reactEvents$' + Oa,
    Y0 = '__reactListeners$' + Oa,
    k0 = '__reactHandles$' + Oa,
    Or = '__reactResources$' + Oa,
    Ln = '__reactMarker$' + Oa;
  function Ls(t) {
    (delete t[Ft], delete t[fe], delete t[Bs], delete t[Y0], delete t[k0]);
  }
  function Gl(t) {
    var e = t[Ft];
    if (e) return e;
    for (var a = t.parentNode; a; ) {
      if ((e = a[Ul] || a[Ft])) {
        if (((a = e.alternate), e.child !== null || (a !== null && a.child !== null)))
          for (t = th(t); t !== null; ) {
            if ((a = t[Ft])) return a;
            t = th(t);
          }
        return e;
      }
      ((t = a), (a = t.parentNode));
    }
    return null;
  }
  function Vl(t) {
    if ((t = t[Ft] || t[Ul])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function Hn(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function $l(t) {
    var e = t[Or];
    return (e || (e = t[Or] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function Qt(t) {
    t[Ln] = !0;
  }
  var Dr = new Set(),
    Rr = {};
  function fl(t, e) {
    (Yl(t, e), Yl(t + 'Capture', e));
  }
  function Yl(t, e) {
    for (Rr[t] = e, t = 0; t < e.length; t++) Dr.add(e[t]);
  }
  var Z0 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Br = {},
    Lr = {};
  function X0(t) {
    return Ms.call(Lr, t)
      ? !0
      : Ms.call(Br, t)
        ? !1
        : Z0.test(t)
          ? (Lr[t] = !0)
          : ((Br[t] = !0), !1);
  }
  function Wi(t, e, a) {
    if (X0(e))
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
  function Fi(t, e, a) {
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
  function Hr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function Q0(t, e, a) {
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
  function Hs(t) {
    if (!t._valueTracker) {
      var e = Hr(t) ? 'checked' : 'value';
      t._valueTracker = Q0(t, e, '' + t[e]);
    }
  }
  function qr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(),
      l = '';
    return (
      t && (l = Hr(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = l),
      t !== a ? (e.setValue(t), !0) : !1
    );
  }
  function Ii(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var K0 = /[\n"\\]/g;
  function De(t) {
    return t.replace(K0, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function qs(t, e, a, l, n, i, f, v) {
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
        ? Us(t, f, Oe(e))
        : a != null
          ? Us(t, f, Oe(a))
          : l != null && t.removeAttribute('value'),
      n == null && i != null && (t.defaultChecked = !!i),
      n != null && (t.checked = n && typeof n != 'function' && typeof n != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (t.name = '' + Oe(v))
        : t.removeAttribute('name'));
  }
  function Ur(t, e, a, l, n, i, f, v) {
    if (
      (i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (t.type = i),
      e != null || a != null)
    ) {
      if (!((i !== 'submit' && i !== 'reset') || e != null)) {
        Hs(t);
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
      Hs(t));
  }
  function Us(t, e, a) {
    (e === 'number' && Ii(t.ownerDocument) === t) ||
      t.defaultValue === '' + a ||
      (t.defaultValue = '' + a);
  }
  function kl(t, e, a, l) {
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
  function Gr(t, e, a) {
    if (e != null && ((e = '' + Oe(e)), e !== t.value && (t.value = e), a == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? '' + Oe(a) : '';
  }
  function Vr(t, e, a, l) {
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
      Hs(t));
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
  var J0 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function $r(t, e, a) {
    var l = e.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? l
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : l
        ? t.setProperty(e, a)
        : typeof a != 'number' || a === 0 || J0.has(e)
          ? e === 'float'
            ? (t.cssFloat = a)
            : (t[e] = ('' + a).trim())
          : (t[e] = a + 'px');
  }
  function Yr(t, e, a) {
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
      for (var n in e) ((l = e[n]), e.hasOwnProperty(n) && a[n] !== l && $r(t, n, l));
    } else for (var i in e) e.hasOwnProperty(i) && $r(t, i, e[i]);
  }
  function Gs(t) {
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
  var W0 = new Map([
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
    F0 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Pi(t) {
    return F0.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function sa() {}
  var Vs = null;
  function $s(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Xl = null,
    Ql = null;
  function kr(t) {
    var e = Vl(t);
    if (e && (t = e.stateNode)) {
      var a = t[fe] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (qs(
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
              a = a.querySelectorAll('input[name="' + De('' + e) + '"][type="radio"]'), e = 0;
              e < a.length;
              e++
            ) {
              var l = a[e];
              if (l !== t && l.form === t.form) {
                var n = l[fe] || null;
                if (!n) throw Error(o(90));
                qs(
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
            for (e = 0; e < a.length; e++) ((l = a[e]), l.form === t.form && qr(l));
          }
          break t;
        case 'textarea':
          Gr(t, a.value, a.defaultValue);
          break t;
        case 'select':
          ((e = a.value), e != null && kl(t, !!a.multiple, e, !1));
      }
    }
  }
  var Ys = !1;
  function Zr(t, e, a) {
    if (Ys) return t(e, a);
    Ys = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (
        ((Ys = !1),
        (Xl !== null || Ql !== null) &&
          (Gc(), Xl && ((e = Xl), (t = Ql), (Ql = Xl = null), kr(e), t)))
      )
        for (e = 0; e < t.length; e++) kr(t[e]);
    }
  }
  function qn(t, e) {
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
    ks = !1;
  if (ua)
    try {
      var Un = {};
      (Object.defineProperty(Un, 'passive', {
        get: function () {
          ks = !0;
        },
      }),
        window.addEventListener('test', Un, Un),
        window.removeEventListener('test', Un, Un));
    } catch {
      ks = !1;
    }
  var Da = null,
    Zs = null,
    tc = null;
  function Xr() {
    if (tc) return tc;
    var t,
      e = Zs,
      a = e.length,
      l,
      n = 'value' in Da ? Da.value : Da.textContent,
      i = n.length;
    for (t = 0; t < a && e[t] === n[t]; t++);
    var f = a - t;
    for (l = 1; l <= f && e[a - l] === n[i - l]; l++);
    return (tc = n.slice(t, 1 < l ? 1 - l : void 0));
  }
  function ec(t) {
    var e = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function ac() {
    return !0;
  }
  function Qr() {
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
          ? ac
          : Qr),
        (this.isPropagationStopped = Qr),
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
            (this.isDefaultPrevented = ac));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = ac));
        },
        persist: function () {},
        isPersistent: ac,
      }),
      e
    );
  }
  var dl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    lc = de(dl),
    Gn = E({}, dl, { view: 0, detail: 0 }),
    I0 = de(Gn),
    Xs,
    Qs,
    Vn,
    nc = E({}, Gn, {
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
      getModifierState: Js,
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
          : (t !== Vn &&
              (Vn && t.type === 'mousemove'
                ? ((Xs = t.screenX - Vn.screenX), (Qs = t.screenY - Vn.screenY))
                : (Qs = Xs = 0),
              (Vn = t)),
            Xs);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : Qs;
      },
    }),
    Kr = de(nc),
    P0 = E({}, nc, { dataTransfer: 0 }),
    t1 = de(P0),
    e1 = E({}, Gn, { relatedTarget: 0 }),
    Ks = de(e1),
    a1 = E({}, dl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    l1 = de(a1),
    n1 = E({}, dl, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    i1 = de(n1),
    c1 = E({}, dl, { data: 0 }),
    Jr = de(c1),
    s1 = {
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
    u1 = {
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
    o1 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function r1(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = o1[t]) ? !!e[t] : !1;
  }
  function Js() {
    return r1;
  }
  var f1 = E({}, Gn, {
      key: function (t) {
        if (t.key) {
          var e = s1[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = ec(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? u1[t.keyCode] || 'Unidentified'
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
      getModifierState: Js,
      charCode: function (t) {
        return t.type === 'keypress' ? ec(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? ec(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    d1 = de(f1),
    m1 = E({}, nc, {
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
    Wr = de(m1),
    h1 = E({}, Gn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Js,
    }),
    v1 = de(h1),
    g1 = E({}, dl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    y1 = de(g1),
    _1 = E({}, nc, {
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
    p1 = de(_1),
    b1 = E({}, dl, { newState: 0, oldState: 0 }),
    S1 = de(b1),
    x1 = [9, 13, 27, 32],
    Ws = ua && 'CompositionEvent' in window,
    $n = null;
  ua && 'documentMode' in document && ($n = document.documentMode);
  var j1 = ua && 'TextEvent' in window && !$n,
    Fr = ua && (!Ws || ($n && 8 < $n && 11 >= $n)),
    Ir = ' ',
    Pr = !1;
  function tf(t, e) {
    switch (t) {
      case 'keyup':
        return x1.indexOf(e.keyCode) !== -1;
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
  function ef(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var Kl = !1;
  function T1(t, e) {
    switch (t) {
      case 'compositionend':
        return ef(e);
      case 'keypress':
        return e.which !== 32 ? null : ((Pr = !0), Ir);
      case 'textInput':
        return ((t = e.data), t === Ir && Pr ? null : t);
      default:
        return null;
    }
  }
  function A1(t, e) {
    if (Kl)
      return t === 'compositionend' || (!Ws && tf(t, e))
        ? ((t = Xr()), (tc = Zs = Da = null), (Kl = !1), t)
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
        return Fr && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var N1 = {
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
  function af(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === 'input' ? !!N1[t.type] : e === 'textarea';
  }
  function lf(t, e, a, l) {
    (Xl ? (Ql ? Ql.push(l) : (Ql = [l])) : (Xl = l),
      (e = Qc(e, 'onChange')),
      0 < e.length &&
        ((a = new lc('onChange', 'change', null, a, l)), t.push({ event: a, listeners: e })));
  }
  var Yn = null,
    kn = null;
  function E1(t) {
    Gm(t, 0);
  }
  function ic(t) {
    var e = Hn(t);
    if (qr(e)) return t;
  }
  function nf(t, e) {
    if (t === 'change') return e;
  }
  var cf = !1;
  if (ua) {
    var Fs;
    if (ua) {
      var Is = 'oninput' in document;
      if (!Is) {
        var sf = document.createElement('div');
        (sf.setAttribute('oninput', 'return;'), (Is = typeof sf.oninput == 'function'));
      }
      Fs = Is;
    } else Fs = !1;
    cf = Fs && (!document.documentMode || 9 < document.documentMode);
  }
  function uf() {
    Yn && (Yn.detachEvent('onpropertychange', of), (kn = Yn = null));
  }
  function of(t) {
    if (t.propertyName === 'value' && ic(kn)) {
      var e = [];
      (lf(e, kn, t, $s(t)), Zr(E1, e));
    }
  }
  function z1(t, e, a) {
    t === 'focusin'
      ? (uf(), (Yn = e), (kn = a), Yn.attachEvent('onpropertychange', of))
      : t === 'focusout' && uf();
  }
  function M1(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return ic(kn);
  }
  function C1(t, e) {
    if (t === 'click') return ic(e);
  }
  function w1(t, e) {
    if (t === 'input' || t === 'change') return ic(e);
  }
  function O1(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var je = typeof Object.is == 'function' ? Object.is : O1;
  function Zn(t, e) {
    if (je(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var a = Object.keys(t),
      l = Object.keys(e);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!Ms.call(e, n) || !je(t[n], e[n])) return !1;
    }
    return !0;
  }
  function rf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function ff(t, e) {
    var a = rf(t);
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
      a = rf(a);
    }
  }
  function df(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? df(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function mf(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Ii(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow;
      else break;
      e = Ii(t.document);
    }
    return e;
  }
  function Ps(t) {
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
  var D1 = ua && 'documentMode' in document && 11 >= document.documentMode,
    Jl = null,
    tu = null,
    Xn = null,
    eu = !1;
  function hf(t, e, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    eu ||
      Jl == null ||
      Jl !== Ii(l) ||
      ((l = Jl),
      'selectionStart' in l && Ps(l)
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
        (l = Qc(tu, 'onSelect')),
        0 < l.length &&
          ((e = new lc('onSelect', 'select', null, e, a)),
          t.push({ event: e, listeners: l }),
          (e.target = Jl))));
  }
  function ml(t, e) {
    var a = {};
    return (
      (a[t.toLowerCase()] = e.toLowerCase()),
      (a['Webkit' + t] = 'webkit' + e),
      (a['Moz' + t] = 'moz' + e),
      a
    );
  }
  var Wl = {
      animationend: ml('Animation', 'AnimationEnd'),
      animationiteration: ml('Animation', 'AnimationIteration'),
      animationstart: ml('Animation', 'AnimationStart'),
      transitionrun: ml('Transition', 'TransitionRun'),
      transitionstart: ml('Transition', 'TransitionStart'),
      transitioncancel: ml('Transition', 'TransitionCancel'),
      transitionend: ml('Transition', 'TransitionEnd'),
    },
    au = {},
    vf = {};
  ua &&
    ((vf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Wl.animationend.animation,
      delete Wl.animationiteration.animation,
      delete Wl.animationstart.animation),
    'TransitionEvent' in window || delete Wl.transitionend.transition);
  function hl(t) {
    if (au[t]) return au[t];
    if (!Wl[t]) return t;
    var e = Wl[t],
      a;
    for (a in e) if (e.hasOwnProperty(a) && a in vf) return (au[t] = e[a]);
    return t;
  }
  var gf = hl('animationend'),
    yf = hl('animationiteration'),
    _f = hl('animationstart'),
    R1 = hl('transitionrun'),
    B1 = hl('transitionstart'),
    L1 = hl('transitioncancel'),
    pf = hl('transitionend'),
    bf = new Map(),
    lu =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  lu.push('scrollEnd');
  function Ze(t, e) {
    (bf.set(t, e), fl(e, [t]));
  }
  var cc =
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
    Re = [],
    Fl = 0,
    nu = 0;
  function sc() {
    for (var t = Fl, e = (nu = Fl = 0); e < t; ) {
      var a = Re[e];
      Re[e++] = null;
      var l = Re[e];
      Re[e++] = null;
      var n = Re[e];
      Re[e++] = null;
      var i = Re[e];
      if (((Re[e++] = null), l !== null && n !== null)) {
        var f = l.pending;
        (f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)), (l.pending = n));
      }
      i !== 0 && Sf(a, n, i);
    }
  }
  function uc(t, e, a, l) {
    ((Re[Fl++] = t),
      (Re[Fl++] = e),
      (Re[Fl++] = a),
      (Re[Fl++] = l),
      (nu |= l),
      (t.lanes |= l),
      (t = t.alternate),
      t !== null && (t.lanes |= l));
  }
  function iu(t, e, a, l) {
    return (uc(t, e, a, l), oc(t));
  }
  function vl(t, e) {
    return (uc(t, null, null, e), oc(t));
  }
  function Sf(t, e, a) {
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
  function oc(t) {
    if (50 < hi) throw ((hi = 0), (vo = null), Error(o(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var Il = {};
  function H1(t, e, a, l) {
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
    return new H1(t, e, a, l);
  }
  function cu(t) {
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
  function xf(t, e) {
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
  function rc(t, e, a, l, n, i) {
    var f = 0;
    if (((l = t), typeof t == 'function')) cu(t) && (f = 1);
    else if (typeof t == 'string')
      f = $v(t, a, k.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case re:
          return ((t = Te(31, a, e, n)), (t.elementType = re), (t.lanes = i), t);
        case V:
          return gl(a.children, n, i, e);
        case U:
          ((f = 8), (n |= 24));
          break;
        case st:
          return ((t = Te(12, a, e, n | 2)), (t.elementType = st), (t.lanes = i), t);
        case ae:
          return ((t = Te(13, a, e, n)), (t.elementType = ae), (t.lanes = i), t);
        case Rt:
          return ((t = Te(19, a, e, n)), (t.elementType = Rt), (t.lanes = i), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case yt:
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
              case Zt:
                ((f = 16), (l = null));
                break t;
            }
          ((f = 29), (a = Error(o(130, t === null ? 'null' : typeof t, ''))), (l = null));
      }
    return ((e = Te(f, a, e, n)), (e.elementType = t), (e.type = l), (e.lanes = i), e);
  }
  function gl(t, e, a, l) {
    return ((t = Te(7, t, l, e)), (t.lanes = a), t);
  }
  function su(t, e, a) {
    return ((t = Te(6, t, null, e)), (t.lanes = a), t);
  }
  function jf(t) {
    var e = Te(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function uu(t, e, a) {
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
  var Tf = new WeakMap();
  function Be(t, e) {
    if (typeof t == 'object' && t !== null) {
      var a = Tf.get(t);
      return a !== void 0 ? a : ((e = { value: t, source: e, stack: xr(e) }), Tf.set(t, e), e);
    }
    return { value: t, source: e, stack: xr(e) };
  }
  var Pl = [],
    tn = 0,
    fc = null,
    Qn = 0,
    Le = [],
    He = 0,
    Ra = null,
    ta = 1,
    ea = '';
  function ra(t, e) {
    ((Pl[tn++] = Qn), (Pl[tn++] = fc), (fc = t), (Qn = e));
  }
  function Af(t, e, a) {
    ((Le[He++] = ta), (Le[He++] = ea), (Le[He++] = Ra), (Ra = t));
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
  function ou(t) {
    t.return !== null && (ra(t, 1), Af(t, 1, 0));
  }
  function ru(t) {
    for (; t === fc; ) ((fc = Pl[--tn]), (Pl[tn] = null), (Qn = Pl[--tn]), (Pl[tn] = null));
    for (; t === Ra; )
      ((Ra = Le[--He]),
        (Le[He] = null),
        (ea = Le[--He]),
        (Le[He] = null),
        (ta = Le[--He]),
        (Le[He] = null));
  }
  function Nf(t, e) {
    ((Le[He++] = ta), (Le[He++] = ea), (Le[He++] = Ra), (ta = e.id), (ea = e.overflow), (Ra = t));
  }
  var It = null,
    Et = null,
    ft = !1,
    Ba = null,
    qe = !1,
    fu = Error(o(519));
  function La(t) {
    var e = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Kn(Be(e, t)), fu);
  }
  function Ef(t) {
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
        for (a = 0; a < gi.length; a++) ct(gi[a], e);
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
          Ur(e, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
        break;
      case 'select':
        ct('invalid', e);
        break;
      case 'textarea':
        (ct('invalid', e), Vr(e, l.value, l.defaultValue, l.children));
    }
    ((a = l.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      e.textContent === '' + a ||
      l.suppressHydrationWarning === !0 ||
      km(e.textContent, a)
        ? (l.popover != null && (ct('beforetoggle', e), ct('toggle', e)),
          l.onScroll != null && ct('scroll', e),
          l.onScrollEnd != null && ct('scrollend', e),
          l.onClick != null && (e.onclick = sa),
          (e = !0))
        : (e = !1),
      e || La(t, !0));
  }
  function zf(t) {
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
  function en(t) {
    if (t !== It) return !1;
    if (!ft) return (zf(t), (ft = !0), !1);
    var e = t.tag,
      a;
    if (
      ((a = e !== 3 && e !== 27) &&
        ((a = e === 5) &&
          ((a = t.type), (a = !(a !== 'form' && a !== 'button') || Co(t.type, t.memoizedProps))),
        (a = !a)),
      a && Et && La(t),
      zf(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(o(317));
      Et = Pm(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(o(317));
      Et = Pm(t);
    } else
      e === 27
        ? ((e = Et), Wa(t.type) ? ((t = Bo), (Bo = null), (Et = t)) : (Et = e))
        : (Et = It ? Ge(t.stateNode.nextSibling) : null);
    return !0;
  }
  function yl() {
    ((Et = It = null), (ft = !1));
  }
  function du() {
    var t = Ba;
    return (t !== null && (ge === null ? (ge = t) : ge.push.apply(ge, t), (Ba = null)), t);
  }
  function Kn(t) {
    Ba === null ? (Ba = [t]) : Ba.push(t);
  }
  var mu = x(null),
    _l = null,
    fa = null;
  function Ha(t, e, a) {
    ($(mu, e._currentValue), (e._currentValue = a));
  }
  function da(t) {
    ((t._currentValue = mu.current), L(mu));
  }
  function hu(t, e, a) {
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
  function vu(t, e, a, l) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var i = n.dependencies;
      if (i !== null) {
        var f = n.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var v = i;
          i = n;
          for (var p = 0; p < e.length; p++)
            if (v.context === e[p]) {
              ((i.lanes |= a),
                (v = i.alternate),
                v !== null && (v.lanes |= a),
                hu(i.return, a, t),
                l || (f = null));
              break t;
            }
          i = v.next;
        }
      } else if (n.tag === 18) {
        if (((f = n.return), f === null)) throw Error(o(341));
        ((f.lanes |= a), (i = f.alternate), i !== null && (i.lanes |= a), hu(f, a, t), (f = null));
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
  function an(t, e, a, l) {
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
      } else if (n === mt.current) {
        if (((f = n.alternate), f === null)) throw Error(o(387));
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (t !== null ? t.push(Si) : (t = [Si]));
      }
      n = n.return;
    }
    (t !== null && vu(e, t, a, l), (e.flags |= 262144));
  }
  function dc(t) {
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
    return Mf(_l, t);
  }
  function mc(t, e) {
    return (_l === null && pl(t), Mf(t, e));
  }
  function Mf(t, e) {
    var a = e._currentValue;
    if (((e = { context: e, memoizedValue: a, next: null }), fa === null)) {
      if (t === null) throw Error(o(308));
      ((fa = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else fa = fa.next = e;
    return a;
  }
  var q1 =
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
    U1 = c.unstable_scheduleCallback,
    G1 = c.unstable_NormalPriority,
    qt = {
      $$typeof: yt,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function gu() {
    return { controller: new q1(), data: new Map(), refCount: 0 };
  }
  function Jn(t) {
    (t.refCount--,
      t.refCount === 0 &&
        U1(G1, function () {
          t.controller.abort();
        }));
  }
  var Wn = null,
    yu = 0,
    ln = 0,
    nn = null;
  function V1(t, e) {
    if (Wn === null) {
      var a = (Wn = []);
      ((yu = 0),
        (ln = So()),
        (nn = {
          status: 'pending',
          value: void 0,
          then: function (l) {
            a.push(l);
          },
        }));
    }
    return (yu++, e.then(Cf, Cf), e);
  }
  function Cf() {
    if (--yu === 0 && Wn !== null) {
      nn !== null && (nn.status = 'fulfilled');
      var t = Wn;
      ((Wn = null), (ln = 0), (nn = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function $1(t, e) {
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
  var wf = w.S;
  w.S = function (t, e) {
    ((hm = be()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && V1(t, e),
      wf !== null && wf(t, e));
  };
  var bl = x(null);
  function _u() {
    var t = bl.current;
    return t !== null ? t : Nt.pooledCache;
  }
  function hc(t, e) {
    e === null ? $(bl, bl.current) : $(bl, e.pool);
  }
  function Of() {
    var t = _u();
    return t === null ? null : { parent: qt._currentValue, pool: t };
  }
  var cn = Error(o(460)),
    pu = Error(o(474)),
    vc = Error(o(542)),
    gc = { then: function () {} };
  function Df(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function Rf(t, e, a) {
    switch (
      ((a = t[a]), a === void 0 ? t.push(e) : a !== e && (e.then(sa, sa), (e = a)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), Lf(t), t);
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
            throw ((t = e.reason), Lf(t), t);
        }
        throw ((xl = e), cn);
    }
  }
  function Sl(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((xl = a), cn) : a;
    }
  }
  var xl = null;
  function Bf() {
    if (xl === null) throw Error(o(459));
    var t = xl;
    return ((xl = null), t);
  }
  function Lf(t) {
    if (t === cn || t === vc) throw Error(o(483));
  }
  var sn = null,
    Fn = 0;
  function yc(t) {
    var e = Fn;
    return ((Fn += 1), sn === null && (sn = []), Rf(sn, t, e));
  }
  function In(t, e) {
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
  function Hf(t) {
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
    function v(T, S, A, D) {
      return S === null || S.tag !== 6
        ? ((S = su(A, T.mode, D)), (S.return = T), S)
        : ((S = n(S, A)), (S.return = T), S);
    }
    function p(T, S, A, D) {
      var K = A.type;
      return K === V
        ? C(T, S, A.props.children, D, A.key)
        : S !== null &&
            (S.elementType === K ||
              (typeof K == 'object' && K !== null && K.$$typeof === Zt && Sl(K) === S.type))
          ? ((S = n(S, A.props)), In(S, A), (S.return = T), S)
          : ((S = rc(A.type, A.key, A.props, null, T.mode, D)), In(S, A), (S.return = T), S);
    }
    function N(T, S, A, D) {
      return S === null ||
        S.tag !== 4 ||
        S.stateNode.containerInfo !== A.containerInfo ||
        S.stateNode.implementation !== A.implementation
        ? ((S = uu(A, T.mode, D)), (S.return = T), S)
        : ((S = n(S, A.children || [])), (S.return = T), S);
    }
    function C(T, S, A, D, K) {
      return S === null || S.tag !== 7
        ? ((S = gl(A, T.mode, D, K)), (S.return = T), S)
        : ((S = n(S, A)), (S.return = T), S);
    }
    function B(T, S, A) {
      if ((typeof S == 'string' && S !== '') || typeof S == 'number' || typeof S == 'bigint')
        return ((S = su('' + S, T.mode, A)), (S.return = T), S);
      if (typeof S == 'object' && S !== null) {
        switch (S.$$typeof) {
          case H:
            return ((A = rc(S.type, S.key, S.props, null, T.mode, A)), In(A, S), (A.return = T), A);
          case R:
            return ((S = uu(S, T.mode, A)), (S.return = T), S);
          case Zt:
            return ((S = Sl(S)), B(T, S, A));
        }
        if (le(S) || Xt(S)) return ((S = gl(S, T.mode, A, null)), (S.return = T), S);
        if (typeof S.then == 'function') return B(T, yc(S), A);
        if (S.$$typeof === yt) return B(T, mc(T, S), A);
        _c(T, S);
      }
      return null;
    }
    function z(T, S, A, D) {
      var K = S !== null ? S.key : null;
      if ((typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint')
        return K !== null ? null : v(T, S, '' + A, D);
      if (typeof A == 'object' && A !== null) {
        switch (A.$$typeof) {
          case H:
            return A.key === K ? p(T, S, A, D) : null;
          case R:
            return A.key === K ? N(T, S, A, D) : null;
          case Zt:
            return ((A = Sl(A)), z(T, S, A, D));
        }
        if (le(A) || Xt(A)) return K !== null ? null : C(T, S, A, D, null);
        if (typeof A.then == 'function') return z(T, S, yc(A), D);
        if (A.$$typeof === yt) return z(T, S, mc(T, A), D);
        _c(T, A);
      }
      return null;
    }
    function M(T, S, A, D, K) {
      if ((typeof D == 'string' && D !== '') || typeof D == 'number' || typeof D == 'bigint')
        return ((T = T.get(A) || null), v(S, T, '' + D, K));
      if (typeof D == 'object' && D !== null) {
        switch (D.$$typeof) {
          case H:
            return ((T = T.get(D.key === null ? A : D.key) || null), p(S, T, D, K));
          case R:
            return ((T = T.get(D.key === null ? A : D.key) || null), N(S, T, D, K));
          case Zt:
            return ((D = Sl(D)), M(T, S, A, D, K));
        }
        if (le(D) || Xt(D)) return ((T = T.get(A) || null), C(S, T, D, K, null));
        if (typeof D.then == 'function') return M(T, S, A, yc(D), K);
        if (D.$$typeof === yt) return M(T, S, A, mc(S, D), K);
        _c(S, D);
      }
      return null;
    }
    function Y(T, S, A, D) {
      for (
        var K = null, ht = null, Z = S, at = (S = 0), ot = null;
        Z !== null && at < A.length;
        at++
      ) {
        Z.index > at ? ((ot = Z), (Z = null)) : (ot = Z.sibling);
        var vt = z(T, Z, A[at], D);
        if (vt === null) {
          Z === null && (Z = ot);
          break;
        }
        (t && Z && vt.alternate === null && e(T, Z),
          (S = i(vt, S, at)),
          ht === null ? (K = vt) : (ht.sibling = vt),
          (ht = vt),
          (Z = ot));
      }
      if (at === A.length) return (a(T, Z), ft && ra(T, at), K);
      if (Z === null) {
        for (; at < A.length; at++)
          ((Z = B(T, A[at], D)),
            Z !== null && ((S = i(Z, S, at)), ht === null ? (K = Z) : (ht.sibling = Z), (ht = Z)));
        return (ft && ra(T, at), K);
      }
      for (Z = l(Z); at < A.length; at++)
        ((ot = M(Z, T, at, A[at], D)),
          ot !== null &&
            (t && ot.alternate !== null && Z.delete(ot.key === null ? at : ot.key),
            (S = i(ot, S, at)),
            ht === null ? (K = ot) : (ht.sibling = ot),
            (ht = ot)));
      return (
        t &&
          Z.forEach(function (el) {
            return e(T, el);
          }),
        ft && ra(T, at),
        K
      );
    }
    function J(T, S, A, D) {
      if (A == null) throw Error(o(151));
      for (
        var K = null, ht = null, Z = S, at = (S = 0), ot = null, vt = A.next();
        Z !== null && !vt.done;
        at++, vt = A.next()
      ) {
        Z.index > at ? ((ot = Z), (Z = null)) : (ot = Z.sibling);
        var el = z(T, Z, vt.value, D);
        if (el === null) {
          Z === null && (Z = ot);
          break;
        }
        (t && Z && el.alternate === null && e(T, Z),
          (S = i(el, S, at)),
          ht === null ? (K = el) : (ht.sibling = el),
          (ht = el),
          (Z = ot));
      }
      if (vt.done) return (a(T, Z), ft && ra(T, at), K);
      if (Z === null) {
        for (; !vt.done; at++, vt = A.next())
          ((vt = B(T, vt.value, D)),
            vt !== null &&
              ((S = i(vt, S, at)), ht === null ? (K = vt) : (ht.sibling = vt), (ht = vt)));
        return (ft && ra(T, at), K);
      }
      for (Z = l(Z); !vt.done; at++, vt = A.next())
        ((vt = M(Z, T, at, vt.value, D)),
          vt !== null &&
            (t && vt.alternate !== null && Z.delete(vt.key === null ? at : vt.key),
            (S = i(vt, S, at)),
            ht === null ? (K = vt) : (ht.sibling = vt),
            (ht = vt)));
      return (
        t &&
          Z.forEach(function (Pv) {
            return e(T, Pv);
          }),
        ft && ra(T, at),
        K
      );
    }
    function Tt(T, S, A, D) {
      if (
        (typeof A == 'object' &&
          A !== null &&
          A.type === V &&
          A.key === null &&
          (A = A.props.children),
        typeof A == 'object' && A !== null)
      ) {
        switch (A.$$typeof) {
          case H:
            t: {
              for (var K = A.key; S !== null; ) {
                if (S.key === K) {
                  if (((K = A.type), K === V)) {
                    if (S.tag === 7) {
                      (a(T, S.sibling), (D = n(S, A.props.children)), (D.return = T), (T = D));
                      break t;
                    }
                  } else if (
                    S.elementType === K ||
                    (typeof K == 'object' && K !== null && K.$$typeof === Zt && Sl(K) === S.type)
                  ) {
                    (a(T, S.sibling), (D = n(S, A.props)), In(D, A), (D.return = T), (T = D));
                    break t;
                  }
                  a(T, S);
                  break;
                } else e(T, S);
                S = S.sibling;
              }
              A.type === V
                ? ((D = gl(A.props.children, T.mode, D, A.key)), (D.return = T), (T = D))
                : ((D = rc(A.type, A.key, A.props, null, T.mode, D)),
                  In(D, A),
                  (D.return = T),
                  (T = D));
            }
            return f(T);
          case R:
            t: {
              for (K = A.key; S !== null; ) {
                if (S.key === K)
                  if (
                    S.tag === 4 &&
                    S.stateNode.containerInfo === A.containerInfo &&
                    S.stateNode.implementation === A.implementation
                  ) {
                    (a(T, S.sibling), (D = n(S, A.children || [])), (D.return = T), (T = D));
                    break t;
                  } else {
                    a(T, S);
                    break;
                  }
                else e(T, S);
                S = S.sibling;
              }
              ((D = uu(A, T.mode, D)), (D.return = T), (T = D));
            }
            return f(T);
          case Zt:
            return ((A = Sl(A)), Tt(T, S, A, D));
        }
        if (le(A)) return Y(T, S, A, D);
        if (Xt(A)) {
          if (((K = Xt(A)), typeof K != 'function')) throw Error(o(150));
          return ((A = K.call(A)), J(T, S, A, D));
        }
        if (typeof A.then == 'function') return Tt(T, S, yc(A), D);
        if (A.$$typeof === yt) return Tt(T, S, mc(T, A), D);
        _c(T, A);
      }
      return (typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint'
        ? ((A = '' + A),
          S !== null && S.tag === 6
            ? (a(T, S.sibling), (D = n(S, A)), (D.return = T), (T = D))
            : (a(T, S), (D = su(A, T.mode, D)), (D.return = T), (T = D)),
          f(T))
        : a(T, S);
    }
    return function (T, S, A, D) {
      try {
        Fn = 0;
        var K = Tt(T, S, A, D);
        return ((sn = null), K);
      } catch (Z) {
        if (Z === cn || Z === vc) throw Z;
        var ht = Te(29, Z, null, T.mode);
        return ((ht.lanes = D), (ht.return = T), ht);
      } finally {
      }
    };
  }
  var jl = Hf(!0),
    qf = Hf(!1),
    qa = !1;
  function bu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Su(t, e) {
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
        (e = oc(t)),
        Sf(t, null, a),
        e
      );
    }
    return (uc(t, l, e, a), oc(t));
  }
  function Pn(t, e, a) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (a & 4194048) !== 0))) {
      var l = e.lanes;
      ((l &= t.pendingLanes), (a |= l), (e.lanes = a), zr(t, a));
    }
  }
  function xu(t, e) {
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
  var ju = !1;
  function ti() {
    if (ju) {
      var t = nn;
      if (t !== null) throw t;
    }
  }
  function ei(t, e, a, l) {
    ju = !1;
    var n = t.updateQueue;
    qa = !1;
    var i = n.firstBaseUpdate,
      f = n.lastBaseUpdate,
      v = n.shared.pending;
    if (v !== null) {
      n.shared.pending = null;
      var p = v,
        N = p.next;
      ((p.next = null), f === null ? (i = N) : (f.next = N), (f = p));
      var C = t.alternate;
      C !== null &&
        ((C = C.updateQueue),
        (v = C.lastBaseUpdate),
        v !== f && (v === null ? (C.firstBaseUpdate = N) : (v.next = N), (C.lastBaseUpdate = p)));
    }
    if (i !== null) {
      var B = n.baseState;
      ((f = 0), (C = N = p = null), (v = i));
      do {
        var z = v.lane & -536870913,
          M = z !== v.lane;
        if (M ? (ut & z) === z : (l & z) === z) {
          (z !== 0 && z === ln && (ju = !0),
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
                  B = Y.call(Tt, B, z);
                  break t;
                }
                B = Y;
                break t;
              case 3:
                Y.flags = (Y.flags & -65537) | 128;
              case 0:
                if (
                  ((Y = J.payload), (z = typeof Y == 'function' ? Y.call(Tt, B, z) : Y), z == null)
                )
                  break t;
                B = E({}, B, z);
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
            C === null ? ((N = C = M), (p = B)) : (C = C.next = M),
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
      (C === null && (p = B),
        (n.baseState = p),
        (n.firstBaseUpdate = N),
        (n.lastBaseUpdate = C),
        i === null && (n.shared.lanes = 0),
        (Za |= f),
        (t.lanes = f),
        (t.memoizedState = B));
    }
  }
  function Uf(t, e) {
    if (typeof t != 'function') throw Error(o(191, t));
    t.call(e);
  }
  function Gf(t, e) {
    var a = t.callbacks;
    if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) Uf(a[t], e);
  }
  var un = x(null),
    pc = x(0);
  function Vf(t, e) {
    ((t = Sa), $(pc, t), $(un, e), (Sa = t | e.baseLanes));
  }
  function Tu() {
    ($(pc, Sa), $(un, un.current));
  }
  function Au() {
    ((Sa = pc.current), L(un), L(pc));
  }
  var Ae = x(null),
    Ue = null;
  function Va(t) {
    var e = t.alternate;
    ($(Lt, Lt.current & 1),
      $(Ae, t),
      Ue === null && (e === null || un.current !== null || e.memoizedState !== null) && (Ue = t));
  }
  function Nu(t) {
    ($(Lt, Lt.current), $(Ae, t), Ue === null && (Ue = t));
  }
  function $f(t) {
    t.tag === 22 ? ($(Lt, Lt.current), $(Ae, t), Ue === null && (Ue = t)) : $a();
  }
  function $a() {
    ($(Lt, Lt.current), $(Ae, Ae.current));
  }
  function Ne(t) {
    (L(Ae), Ue === t && (Ue = null), L(Lt));
  }
  var Lt = x(0);
  function bc(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Do(a) || Ro(a))) return e;
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
    Sc = !1,
    on = !1,
    Tl = !1,
    xc = 0,
    ai = 0,
    rn = null,
    Y1 = 0;
  function Ot() {
    throw Error(o(321));
  }
  function Eu(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++) if (!je(t[a], e[a])) return !1;
    return !0;
  }
  function zu(t, e, a, l, n, i) {
    return (
      (ma = i),
      (et = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (w.H = t === null || t.memoizedState === null ? Ad : Yu),
      (Tl = !1),
      (i = a(l, n)),
      (Tl = !1),
      on && (i = kf(e, a, l, n)),
      Yf(t),
      i
    );
  }
  function Yf(t) {
    w.H = ii;
    var e = xt !== null && xt.next !== null;
    if (((ma = 0), (Ut = xt = et = null), (Sc = !1), (ai = 0), (rn = null), e)) throw Error(o(300));
    t === null || Gt || ((t = t.dependencies), t !== null && dc(t) && (Gt = !0));
  }
  function kf(t, e, a, l) {
    et = t;
    var n = 0;
    do {
      if ((on && (rn = null), (ai = 0), (on = !1), 25 <= n)) throw Error(o(301));
      if (((n += 1), (Ut = xt = null), t.updateQueue != null)) {
        var i = t.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((w.H = Nd), (i = e(a, l)));
    } while (on);
    return i;
  }
  function k1() {
    var t = w.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? li(e) : e),
      (t = t.useState()[0]),
      (xt !== null ? xt.memoizedState : null) !== t && (et.flags |= 1024),
      e
    );
  }
  function Mu() {
    var t = xc !== 0;
    return ((xc = 0), t);
  }
  function Cu(t, e, a) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~a));
  }
  function wu(t) {
    if (Sc) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      Sc = !1;
    }
    ((ma = 0), (Ut = xt = et = null), (on = !1), (ai = xc = 0), (rn = null));
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
  function jc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function li(t) {
    var e = ai;
    return (
      (ai += 1),
      rn === null && (rn = []),
      (t = Rf(rn, t, e)),
      (e = et),
      (Ut === null ? e.memoizedState : Ut.next) === null &&
        ((e = e.alternate), (w.H = e === null || e.memoizedState === null ? Ad : Yu)),
      t
    );
  }
  function Tc(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return li(t);
      if (t.$$typeof === yt) return Pt(t);
    }
    throw Error(o(438, String(t)));
  }
  function Ou(t) {
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
      a === null && ((a = jc()), (et.updateQueue = a)),
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
  function Ac(t) {
    var e = Ht();
    return Du(e, xt, t);
  }
  function Du(t, e, a) {
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
        p = null,
        N = e,
        C = !1;
      do {
        var B = N.lane & -536870913;
        if (B !== N.lane ? (ut & B) === B : (ma & B) === B) {
          var z = N.revertLane;
          if (z === 0)
            (p !== null &&
              (p = p.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: N.action,
                  hasEagerState: N.hasEagerState,
                  eagerState: N.eagerState,
                  next: null,
                }),
              B === ln && (C = !0));
          else if ((ma & z) === z) {
            ((N = N.next), z === ln && (C = !0));
            continue;
          } else
            ((B = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null,
            }),
              p === null ? ((v = p = B), (f = i)) : (p = p.next = B),
              (et.lanes |= z),
              (Za |= z));
          ((B = N.action), Tl && a(i, B), (i = N.hasEagerState ? N.eagerState : a(i, B)));
        } else
          ((z = {
            lane: B,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null,
          }),
            p === null ? ((v = p = z), (f = i)) : (p = p.next = z),
            (et.lanes |= B),
            (Za |= B));
        N = N.next;
      } while (N !== null && N !== e);
      if (
        (p === null ? (f = i) : (p.next = v),
        !je(i, t.memoizedState) && ((Gt = !0), C && ((a = nn), a !== null)))
      )
        throw a;
      ((t.memoizedState = i), (t.baseState = f), (t.baseQueue = p), (l.lastRenderedState = i));
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
      i = ft;
    if (i) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = e();
    var f = !je((xt || n).memoizedState, a);
    if (
      (f && ((n.memoizedState = a), (Gt = !0)),
      (n = n.queue),
      Hu(Kf.bind(null, l, n, t), [t]),
      n.getSnapshot !== e || f || (Ut !== null && Ut.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        fn(9, { destroy: void 0 }, Qf.bind(null, l, n, a, e), null),
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
        ? ((e = jc()), (et.updateQueue = e), (e.stores = [t]))
        : ((a = e.stores), a === null ? (e.stores = [t]) : a.push(t)));
  }
  function Qf(t, e, a, l) {
    ((e.value = a), (e.getSnapshot = l), Jf(e) && Wf(t));
  }
  function Kf(t, e, a) {
    return a(function () {
      Jf(e) && Wf(t);
    });
  }
  function Jf(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !je(t, a);
    } catch {
      return !0;
    }
  }
  function Wf(t) {
    var e = vl(t, 2);
    e !== null && ye(e, t, 2);
  }
  function Bu(t) {
    var e = ue();
    if (typeof t == 'function') {
      var a = t;
      if (((t = a()), Tl)) {
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
  function Ff(t, e, a, l) {
    return ((t.baseState = a), Du(t, xt, typeof l == 'function' ? l : ha));
  }
  function Z1(t, e, a, l, n) {
    if (zc(t)) throw Error(o(485));
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
          ? ((i.next = e.pending = i), If(e, i))
          : ((i.next = a.next), (e.pending = a.next = i)));
    }
  }
  function If(t, e) {
    var a = e.action,
      l = e.payload,
      n = t.state;
    if (e.isTransition) {
      var i = w.T,
        f = {};
      w.T = f;
      try {
        var v = a(n, l),
          p = w.S;
        (p !== null && p(f, v), Pf(t, e, v));
      } catch (N) {
        Lu(t, e, N);
      } finally {
        (i !== null && f.types !== null && (i.types = f.types), (w.T = i));
      }
    } else
      try {
        ((i = a(n, l)), Pf(t, e, i));
      } catch (N) {
        Lu(t, e, N);
      }
  }
  function Pf(t, e, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (l) {
            td(t, e, l);
          },
          function (l) {
            return Lu(t, e, l);
          }
        )
      : td(t, e, a);
  }
  function td(t, e, a) {
    ((e.status = 'fulfilled'),
      (e.value = a),
      ed(e),
      (t.state = a),
      (e = t.pending),
      e !== null &&
        ((a = e.next), a === e ? (t.pending = null) : ((a = a.next), (e.next = a), If(t, a))));
  }
  function Lu(t, e, a) {
    var l = t.pending;
    if (((t.pending = null), l !== null)) {
      l = l.next;
      do ((e.status = 'rejected'), (e.reason = a), ed(e), (e = e.next));
      while (e !== l);
    }
    t.action = null;
  }
  function ed(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function ad(t, e) {
    return e;
  }
  function ld(t, e) {
    if (ft) {
      var a = Nt.formState;
      if (a !== null) {
        t: {
          var l = et;
          if (ft) {
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
        lastRenderedReducer: ad,
        lastRenderedState: e,
      }),
      (a.queue = l),
      (a = xd.bind(null, et, l)),
      (l.dispatch = a),
      (l = Bu(!1)),
      (i = $u.bind(null, et, !1, l.queue)),
      (l = ue()),
      (n = { state: e, dispatch: null, action: t, pending: null }),
      (l.queue = n),
      (a = Z1.bind(null, et, n, i, a)),
      (n.dispatch = a),
      (l.memoizedState = t),
      [e, a, !1]
    );
  }
  function nd(t) {
    var e = Ht();
    return id(e, xt, t);
  }
  function id(t, e, a) {
    if (
      ((e = Du(t, e, ad)[0]),
      (t = Ac(ha)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var l = li(e);
      } catch (f) {
        throw f === cn ? vc : f;
      }
    else l = e;
    e = Ht();
    var n = e.queue,
      i = n.dispatch;
    return (
      a !== e.memoizedState &&
        ((et.flags |= 2048), fn(9, { destroy: void 0 }, X1.bind(null, n, a), null)),
      [l, i, t]
    );
  }
  function X1(t, e) {
    t.action = e;
  }
  function cd(t) {
    var e = Ht(),
      a = xt;
    if (a !== null) return id(e, a, t);
    (Ht(), (e = e.memoizedState), (a = Ht()));
    var l = a.queue.dispatch;
    return ((a.memoizedState = t), [e, l, !1]);
  }
  function fn(t, e, a, l) {
    return (
      (t = { tag: t, create: a, deps: l, inst: e, next: null }),
      (e = et.updateQueue),
      e === null && ((e = jc()), (et.updateQueue = e)),
      (a = e.lastEffect),
      a === null
        ? (e.lastEffect = t.next = t)
        : ((l = a.next), (a.next = t), (t.next = l), (e.lastEffect = t)),
      t
    );
  }
  function sd() {
    return Ht().memoizedState;
  }
  function Nc(t, e, a, l) {
    var n = ue();
    ((et.flags |= t),
      (n.memoizedState = fn(1 | e, { destroy: void 0 }, a, l === void 0 ? null : l)));
  }
  function Ec(t, e, a, l) {
    var n = Ht();
    l = l === void 0 ? null : l;
    var i = n.memoizedState.inst;
    xt !== null && l !== null && Eu(l, xt.memoizedState.deps)
      ? (n.memoizedState = fn(e, i, a, l))
      : ((et.flags |= t), (n.memoizedState = fn(1 | e, i, a, l)));
  }
  function ud(t, e) {
    Nc(8390656, 8, t, e);
  }
  function Hu(t, e) {
    Ec(2048, 8, t, e);
  }
  function Q1(t) {
    et.flags |= 4;
    var e = et.updateQueue;
    if (e === null) ((e = jc()), (et.updateQueue = e), (e.events = [t]));
    else {
      var a = e.events;
      a === null ? (e.events = [t]) : a.push(t);
    }
  }
  function od(t) {
    var e = Ht().memoizedState;
    return (
      Q1({ ref: e, nextImpl: t }),
      function () {
        if ((gt & 2) !== 0) throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function rd(t, e) {
    return Ec(4, 2, t, e);
  }
  function fd(t, e) {
    return Ec(4, 4, t, e);
  }
  function dd(t, e) {
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
  function md(t, e, a) {
    ((a = a != null ? a.concat([t]) : null), Ec(4, 4, dd.bind(null, e, t), a));
  }
  function qu() {}
  function hd(t, e) {
    var a = Ht();
    e = e === void 0 ? null : e;
    var l = a.memoizedState;
    return e !== null && Eu(e, l[1]) ? l[0] : ((a.memoizedState = [t, e]), t);
  }
  function vd(t, e) {
    var a = Ht();
    e = e === void 0 ? null : e;
    var l = a.memoizedState;
    if (e !== null && Eu(e, l[1])) return l[0];
    if (((l = t()), Tl)) {
      wa(!0);
      try {
        t();
      } finally {
        wa(!1);
      }
    }
    return ((a.memoizedState = [l, e]), l);
  }
  function Uu(t, e, a) {
    return a === void 0 || ((ma & 1073741824) !== 0 && (ut & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = a), (t = gm()), (et.lanes |= t), (Za |= t), a);
  }
  function gd(t, e, a, l) {
    return je(a, e)
      ? a
      : un.current !== null
        ? ((t = Uu(t, a, l)), je(t, e) || (Gt = !0), t)
        : (ma & 42) === 0 || ((ma & 1073741824) !== 0 && (ut & 261930) === 0)
          ? ((Gt = !0), (t.memoizedState = a))
          : ((t = gm()), (et.lanes |= t), (Za |= t), e);
  }
  function yd(t, e, a, l, n) {
    var i = G.p;
    G.p = i !== 0 && 8 > i ? i : 8;
    var f = w.T,
      v = {};
    ((w.T = v), $u(t, !1, e, a));
    try {
      var p = n(),
        N = w.S;
      if (
        (N !== null && N(v, p), p !== null && typeof p == 'object' && typeof p.then == 'function')
      ) {
        var C = $1(p, l);
        ni(t, e, C, Me(t));
      } else ni(t, e, l, Me(t));
    } catch (B) {
      ni(t, e, { then: function () {}, status: 'rejected', reason: B }, Me());
    } finally {
      ((G.p = i), f !== null && v.types !== null && (f.types = v.types), (w.T = f));
    }
  }
  function K1() {}
  function Gu(t, e, a, l) {
    if (t.tag !== 5) throw Error(o(476));
    var n = _d(t).queue;
    yd(
      t,
      n,
      e,
      W,
      a === null
        ? K1
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
    (e.next === null && (e = t.alternate.memoizedState), ni(t, e.next.queue, {}, Me()));
  }
  function Vu() {
    return Pt(Si);
  }
  function bd() {
    return Ht().memoizedState;
  }
  function Sd() {
    return Ht().memoizedState;
  }
  function J1(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var a = Me();
          t = Ua(a);
          var l = Ga(e, t, a);
          (l !== null && (ye(l, e, a), Pn(l, e, a)), (e = { cache: gu() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function W1(t, e, a) {
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
      zc(t) ? jd(e, a) : ((a = iu(t, e, a, l)), a !== null && (ye(a, t, l), Td(a, e, l))));
  }
  function xd(t, e, a) {
    var l = Me();
    ni(t, e, a, l);
  }
  function ni(t, e, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (zc(t)) jd(e, n);
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
            return (uc(t, e, n, 0), Nt === null && sc(), !1);
        } catch {
        } finally {
        }
      if (((a = iu(t, e, n, l)), a !== null)) return (ye(a, t, l), Td(a, e, l), !0);
    }
    return !1;
  }
  function $u(t, e, a, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: So(),
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      zc(t))
    ) {
      if (e) throw Error(o(479));
    } else ((e = iu(t, a, l, 2)), e !== null && ye(e, t, 2));
  }
  function zc(t) {
    var e = t.alternate;
    return t === et || (e !== null && e === et);
  }
  function jd(t, e) {
    on = Sc = !0;
    var a = t.pending;
    (a === null ? (e.next = e) : ((e.next = a.next), (a.next = e)), (t.pending = e));
  }
  function Td(t, e, a) {
    if ((a & 4194048) !== 0) {
      var l = e.lanes;
      ((l &= t.pendingLanes), (a |= l), (e.lanes = a), zr(t, a));
    }
  }
  var ii = {
    readContext: Pt,
    use: Tc,
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
  ii.useEffectEvent = Ot;
  var Ad = {
      readContext: Pt,
      use: Tc,
      useCallback: function (t, e) {
        return ((ue().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: Pt,
      useEffect: ud,
      useImperativeHandle: function (t, e, a) {
        ((a = a != null ? a.concat([t]) : null), Nc(4194308, 4, dd.bind(null, e, t), a));
      },
      useLayoutEffect: function (t, e) {
        return Nc(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        Nc(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var a = ue();
        e = e === void 0 ? null : e;
        var l = t();
        if (Tl) {
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
          if (Tl) {
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
          (t = t.dispatch = W1.bind(null, et, t)),
          [l.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = ue();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = Bu(t);
        var e = t.queue,
          a = xd.bind(null, et, e);
        return ((e.dispatch = a), [t.memoizedState, a]);
      },
      useDebugValue: qu,
      useDeferredValue: function (t, e) {
        var a = ue();
        return Uu(a, t, e);
      },
      useTransition: function () {
        var t = Bu(!1);
        return ((t = yd.bind(null, et, t.queue, !0, !1)), (ue().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, a) {
        var l = et,
          n = ue();
        if (ft) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = e()), Nt === null)) throw Error(o(349));
          (ut & 127) !== 0 || Xf(l, e, a);
        }
        n.memoizedState = a;
        var i = { value: a, getSnapshot: e };
        return (
          (n.queue = i),
          ud(Kf.bind(null, l, i, t), [t]),
          (l.flags |= 2048),
          fn(9, { destroy: void 0 }, Qf.bind(null, l, i, a, e), null),
          a
        );
      },
      useId: function () {
        var t = ue(),
          e = Nt.identifierPrefix;
        if (ft) {
          var a = ea,
            l = ta;
          ((a = (l & ~(1 << (32 - xe(l) - 1))).toString(32) + a),
            (e = '_' + e + 'R_' + a),
            (a = xc++),
            0 < a && (e += 'H' + a.toString(32)),
            (e += '_'));
        } else ((a = Y1++), (e = '_' + e + 'r_' + a.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: Vu,
      useFormState: ld,
      useActionState: ld,
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
        return ((e.queue = a), (e = $u.bind(null, et, !0, a)), (a.dispatch = e), [t, e]);
      },
      useMemoCache: Ou,
      useCacheRefresh: function () {
        return (ue().memoizedState = J1.bind(null, et));
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
    Yu = {
      readContext: Pt,
      use: Tc,
      useCallback: hd,
      useContext: Pt,
      useEffect: Hu,
      useImperativeHandle: md,
      useInsertionEffect: rd,
      useLayoutEffect: fd,
      useMemo: vd,
      useReducer: Ac,
      useRef: sd,
      useState: function () {
        return Ac(ha);
      },
      useDebugValue: qu,
      useDeferredValue: function (t, e) {
        var a = Ht();
        return gd(a, xt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = Ac(ha)[0],
          e = Ht().memoizedState;
        return [typeof t == 'boolean' ? t : li(t), e];
      },
      useSyncExternalStore: Zf,
      useId: bd,
      useHostTransitionStatus: Vu,
      useFormState: nd,
      useActionState: nd,
      useOptimistic: function (t, e) {
        var a = Ht();
        return Ff(a, xt, t, e);
      },
      useMemoCache: Ou,
      useCacheRefresh: Sd,
    };
  Yu.useEffectEvent = od;
  var Nd = {
    readContext: Pt,
    use: Tc,
    useCallback: hd,
    useContext: Pt,
    useEffect: Hu,
    useImperativeHandle: md,
    useInsertionEffect: rd,
    useLayoutEffect: fd,
    useMemo: vd,
    useReducer: Ru,
    useRef: sd,
    useState: function () {
      return Ru(ha);
    },
    useDebugValue: qu,
    useDeferredValue: function (t, e) {
      var a = Ht();
      return xt === null ? Uu(a, t, e) : gd(a, xt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = Ru(ha)[0],
        e = Ht().memoizedState;
      return [typeof t == 'boolean' ? t : li(t), e];
    },
    useSyncExternalStore: Zf,
    useId: bd,
    useHostTransitionStatus: Vu,
    useFormState: cd,
    useActionState: cd,
    useOptimistic: function (t, e) {
      var a = Ht();
      return xt !== null ? Ff(a, xt, t, e) : ((a.baseState = t), [t, a.queue.dispatch]);
    },
    useMemoCache: Ou,
    useCacheRefresh: Sd,
  };
  Nd.useEffectEvent = od;
  function ku(t, e, a, l) {
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
        e !== null && (ye(e, t, l), Pn(e, t, l)));
    },
    enqueueReplaceState: function (t, e, a) {
      t = t._reactInternals;
      var l = Me(),
        n = Ua(l);
      ((n.tag = 1),
        (n.payload = e),
        a != null && (n.callback = a),
        (e = Ga(t, n, l)),
        e !== null && (ye(e, t, l), Pn(e, t, l)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var a = Me(),
        l = Ua(a);
      ((l.tag = 2),
        e != null && (l.callback = e),
        (e = Ga(t, l, a)),
        e !== null && (ye(e, t, a), Pn(e, t, a)));
    },
  };
  function Ed(t, e, a, l, n, i, f) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(l, i, f)
        : e.prototype && e.prototype.isPureReactComponent
          ? !Zn(a, l) || !Zn(n, i)
          : !0
    );
  }
  function zd(t, e, a, l) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(a, l),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(a, l),
      e.state !== t && Zu.enqueueReplaceState(e, e.state, null));
  }
  function Al(t, e) {
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
  function Md(t) {
    cc(t);
  }
  function Cd(t) {
    console.error(t);
  }
  function wd(t) {
    cc(t);
  }
  function Mc(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Od(t, e, a) {
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
        Mc(t, e);
      }),
      a
    );
  }
  function Dd(t) {
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
          Od(e, a, l);
        }));
    }
    var f = a.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (t.callback = function () {
        (Od(e, a, l),
          typeof n != 'function' && (Xa === null ? (Xa = new Set([this])) : Xa.add(this)));
        var v = l.stack;
        this.componentDidCatch(l.value, { componentStack: v !== null ? v : '' });
      });
  }
  function F1(t, e, a, l, n) {
    if (((a.flags |= 32768), l !== null && typeof l == 'object' && typeof l.then == 'function')) {
      if (((e = a.alternate), e !== null && an(e, a, n, !0), (a = Ae.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Ue === null ? Vc() : a.alternate === null && Dt === 0 && (Dt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = n),
              l === gc
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null ? (a.updateQueue = new Set([l])) : e.add(l),
                  _o(t, l, n)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              l === gc
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
      return (_o(t, l, n), Vc(), !1);
    }
    if (ft)
      return (
        (e = Ae.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = n),
            l !== fu && ((t = Error(o(422), { cause: l })), Kn(Be(t, a))))
          : (l !== fu && ((e = Error(o(423), { cause: l })), Kn(Be(e, a))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (n &= -n),
            (t.lanes |= n),
            (l = Be(l, a)),
            (n = Xu(t.stateNode, l, n)),
            xu(t, n),
            Dt !== 4 && (Dt = 2)),
        !1
      );
    var i = Error(o(520), { cause: l });
    if (((i = Be(i, a)), mi === null ? (mi = [i]) : mi.push(i), Dt !== 4 && (Dt = 2), e === null))
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
            xu(a, t),
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
                  (Xa === null || !Xa.has(i)))))
          )
            return (
              (a.flags |= 65536),
              (n &= -n),
              (a.lanes |= n),
              (n = Dd(n)),
              Rd(n, t, a, l),
              xu(a, n),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Qu = Error(o(461)),
    Gt = !1;
  function te(t, e, a, l) {
    e.child = t === null ? qf(e, null, a, l) : jl(e, t.child, a, l);
  }
  function Bd(t, e, a, l, n) {
    a = a.render;
    var i = e.ref;
    if ('ref' in l) {
      var f = {};
      for (var v in l) v !== 'ref' && (f[v] = l[v]);
    } else f = l;
    return (
      pl(e),
      (l = zu(t, e, a, f, i, n)),
      (v = Mu()),
      t !== null && !Gt
        ? (Cu(t, e, n), va(t, e, n))
        : (ft && v && ou(e), (e.flags |= 1), te(t, e, l, n), e.child)
    );
  }
  function Ld(t, e, a, l, n) {
    if (t === null) {
      var i = a.type;
      return typeof i == 'function' && !cu(i) && i.defaultProps === void 0 && a.compare === null
        ? ((e.tag = 15), (e.type = i), Hd(t, e, i, l, n))
        : ((t = rc(a.type, null, l, e, e.mode, n)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((i = t.child), !eo(t, n))) {
      var f = i.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Zn), a(f, l) && t.ref === e.ref))
        return va(t, e, n);
    }
    return ((e.flags |= 1), (t = oa(i, l)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function Hd(t, e, a, l, n) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (Zn(i, l) && t.ref === e.ref)
        if (((Gt = !1), (e.pendingProps = l = i), eo(t, n))) (t.flags & 131072) !== 0 && (Gt = !0);
        else return ((e.lanes = t.lanes), va(t, e, n));
    }
    return Ku(t, e, a, l, n);
  }
  function qd(t, e, a, l) {
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
        return Ud(t, e, i, a, l);
      }
      if ((a & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && hc(e, i !== null ? i.cachePool : null),
          i !== null ? Vf(e, i) : Tu(),
          $f(e));
      else return ((l = e.lanes = 536870912), Ud(t, e, i !== null ? i.baseLanes | a : a, a, l));
    } else
      i !== null
        ? (hc(e, i.cachePool), Vf(e, i), $a(), (e.memoizedState = null))
        : (t !== null && hc(e, null), Tu(), $a());
    return (te(t, e, n, a), e.child);
  }
  function ci(t, e) {
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
  function Ud(t, e, a, l, n) {
    var i = _u();
    return (
      (i = i === null ? null : { parent: qt._currentValue, pool: i }),
      (e.memoizedState = { baseLanes: a, cachePool: i }),
      t !== null && hc(e, null),
      Tu(),
      $f(e),
      t !== null && an(t, e, l, !0),
      (e.childLanes = n),
      null
    );
  }
  function Cc(t, e) {
    return (
      (e = Oc({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Gd(t, e, a) {
    return (
      jl(e, t.child, null, a),
      (t = Cc(e, e.pendingProps)),
      (t.flags |= 2),
      Ne(e),
      (e.memoizedState = null),
      t
    );
  }
  function I1(t, e, a) {
    var l = e.pendingProps,
      n = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (ft) {
        if (l.mode === 'hidden') return ((t = Cc(e, l)), (e.lanes = 536870912), ci(null, t));
        if (
          (Nu(e),
          (t = Et)
            ? ((t = Im(t, qe)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Ra !== null ? { id: ta, overflow: ea } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = jf(t)),
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
      return Cc(e, l);
    }
    var i = t.memoizedState;
    if (i !== null) {
      var f = i.dehydrated;
      if ((Nu(e), n))
        if (e.flags & 256) ((e.flags &= -257), (e = Gd(t, e, a)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(o(558));
      else if ((Gt || an(t, e, a, !1), (n = (a & t.childLanes) !== 0), Gt || n)) {
        if (((l = Nt), l !== null && ((f = Mr(l, a)), f !== 0 && f !== i.retryLane)))
          throw ((i.retryLane = f), vl(t, f), ye(l, t, f), Qu);
        (Vc(), (e = Gd(t, e, a)));
      } else
        ((t = i.treeContext),
          (Et = Ge(f.nextSibling)),
          (It = e),
          (ft = !0),
          (Ba = null),
          (qe = !1),
          t !== null && Nf(e, t),
          (e = Cc(e, l)),
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
  function wc(t, e) {
    var a = e.ref;
    if (a === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (t === null || t.ref !== a) && (e.flags |= 4194816);
    }
  }
  function Ku(t, e, a, l, n) {
    return (
      pl(e),
      (a = zu(t, e, a, l, void 0, n)),
      (l = Mu()),
      t !== null && !Gt
        ? (Cu(t, e, n), va(t, e, n))
        : (ft && l && ou(e), (e.flags |= 1), te(t, e, a, n), e.child)
    );
  }
  function Vd(t, e, a, l, n, i) {
    return (
      pl(e),
      (e.updateQueue = null),
      (a = kf(e, l, a, n)),
      Yf(t),
      (l = Mu()),
      t !== null && !Gt
        ? (Cu(t, e, i), va(t, e, i))
        : (ft && l && ou(e), (e.flags |= 1), te(t, e, a, i), e.child)
    );
  }
  function $d(t, e, a, l, n) {
    if ((pl(e), e.stateNode === null)) {
      var i = Il,
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
        bu(e),
        (f = a.contextType),
        (i.context = typeof f == 'object' && f !== null ? Pt(f) : Il),
        (i.state = e.memoizedState),
        (f = a.getDerivedStateFromProps),
        typeof f == 'function' && (ku(e, a, f, l), (i.state = e.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof i.getSnapshotBeforeUpdate == 'function' ||
          (typeof i.UNSAFE_componentWillMount != 'function' &&
            typeof i.componentWillMount != 'function') ||
          ((f = i.state),
          typeof i.componentWillMount == 'function' && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
          f !== i.state && Zu.enqueueReplaceState(i, i.state, null),
          ei(e, l, i, n),
          ti(),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == 'function' && (e.flags |= 4194308),
        (l = !0));
    } else if (t === null) {
      i = e.stateNode;
      var v = e.memoizedProps,
        p = Al(a, v);
      i.props = p;
      var N = i.context,
        C = a.contextType;
      ((f = Il), typeof C == 'object' && C !== null && (f = Pt(C)));
      var B = a.getDerivedStateFromProps;
      ((C = typeof B == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (v = e.pendingProps !== v),
        C ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((v || N !== f) && zd(e, i, l, f)),
        (qa = !1));
      var z = e.memoizedState;
      ((i.state = z),
        ei(e, l, i, n),
        ti(),
        (N = e.memoizedState),
        v || z !== N || qa
          ? (typeof B == 'function' && (ku(e, a, B, l), (N = e.memoizedState)),
            (p = qa || Ed(e, a, p, l, z, N, f))
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
            (l = p))
          : (typeof i.componentDidMount == 'function' && (e.flags |= 4194308), (l = !1)));
    } else {
      ((i = e.stateNode),
        Su(t, e),
        (f = e.memoizedProps),
        (C = Al(a, f)),
        (i.props = C),
        (B = e.pendingProps),
        (z = i.context),
        (N = a.contextType),
        (p = Il),
        typeof N == 'object' && N !== null && (p = Pt(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((f !== B || z !== p) && zd(e, i, l, p)),
        (qa = !1),
        (z = e.memoizedState),
        (i.state = z),
        ei(e, l, i, n),
        ti());
      var M = e.memoizedState;
      f !== B || z !== M || qa || (t !== null && t.dependencies !== null && dc(t.dependencies))
        ? (typeof v == 'function' && (ku(e, a, v, l), (M = e.memoizedState)),
          (C =
            qa ||
            Ed(e, a, C, l, z, M, p) ||
            (t !== null && t.dependencies !== null && dc(t.dependencies)))
            ? (N ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(l, M, p),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(l, M, p)),
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
          (i.context = p),
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
      wc(t, e),
      (l = (e.flags & 128) !== 0),
      i || l
        ? ((i = e.stateNode),
          (a = l && typeof a.getDerivedStateFromError != 'function' ? null : i.render()),
          (e.flags |= 1),
          t !== null && l
            ? ((e.child = jl(e, t.child, null, n)), (e.child = jl(e, null, a, n)))
            : te(t, e, a, n),
          (e.memoizedState = i.state),
          (t = e.child))
        : (t = va(t, e, n)),
      t
    );
  }
  function Yd(t, e, a, l) {
    return (yl(), (e.flags |= 256), te(t, e, a, l), e.child);
  }
  var Ju = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Wu(t) {
    return { baseLanes: t, cachePool: Of() };
  }
  function Fu(t, e, a) {
    return ((t = t !== null ? t.childLanes & ~a : 0), e && (t |= ze), t);
  }
  function kd(t, e, a) {
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
      if (ft) {
        if (
          (n ? Va(e) : $a(),
          (t = Et)
            ? ((t = Im(t, qe)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Ra !== null ? { id: ta, overflow: ea } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = jf(t)),
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
            (v = Oc({ mode: 'hidden', children: v }, n)),
            (l = gl(l, n, a, null)),
            (v.return = e),
            (l.return = e),
            (v.sibling = l),
            (e.child = v),
            (l = e.child),
            (l.memoizedState = Wu(a)),
            (l.childLanes = Fu(t, f, a)),
            (e.memoizedState = Ju),
            ci(null, l))
          : (Va(e), Iu(e, v))
      );
    }
    var p = t.memoizedState;
    if (p !== null && ((v = p.dehydrated), v !== null)) {
      if (i)
        e.flags & 256
          ? (Va(e), (e.flags &= -257), (e = Pu(t, e, a)))
          : e.memoizedState !== null
            ? ($a(), (e.child = t.child), (e.flags |= 128), (e = null))
            : ($a(),
              (v = l.fallback),
              (n = e.mode),
              (l = Oc({ mode: 'visible', children: l.children }, n)),
              (v = gl(v, n, a, null)),
              (v.flags |= 2),
              (l.return = e),
              (v.return = e),
              (l.sibling = v),
              (e.child = l),
              jl(e, t.child, null, a),
              (l = e.child),
              (l.memoizedState = Wu(a)),
              (l.childLanes = Fu(t, f, a)),
              (e.memoizedState = Ju),
              (e = ci(null, l)));
      else if ((Va(e), Ro(v))) {
        if (((f = v.nextSibling && v.nextSibling.dataset), f)) var N = f.dgst;
        ((f = N),
          (l = Error(o(419))),
          (l.stack = ''),
          (l.digest = f),
          Kn({ value: l, source: null, stack: null }),
          (e = Pu(t, e, a)));
      } else if ((Gt || an(t, e, a, !1), (f = (a & t.childLanes) !== 0), Gt || f)) {
        if (((f = Nt), f !== null && ((l = Mr(f, a)), l !== 0 && l !== p.retryLane)))
          throw ((p.retryLane = l), vl(t, l), ye(f, t, l), Qu);
        (Do(v) || Vc(), (e = Pu(t, e, a)));
      } else
        Do(v)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = p.treeContext),
            (Et = Ge(v.nextSibling)),
            (It = e),
            (ft = !0),
            (Ba = null),
            (qe = !1),
            t !== null && Nf(e, t),
            (e = Iu(e, l.children)),
            (e.flags |= 4096));
      return e;
    }
    return n
      ? ($a(),
        (v = l.fallback),
        (n = e.mode),
        (p = t.child),
        (N = p.sibling),
        (l = oa(p, { mode: 'hidden', children: l.children })),
        (l.subtreeFlags = p.subtreeFlags & 65011712),
        N !== null ? (v = oa(N, v)) : ((v = gl(v, n, a, null)), (v.flags |= 2)),
        (v.return = e),
        (l.return = e),
        (l.sibling = v),
        (e.child = l),
        ci(null, l),
        (l = e.child),
        (v = t.child.memoizedState),
        v === null
          ? (v = Wu(a))
          : ((n = v.cachePool),
            n !== null
              ? ((p = qt._currentValue), (n = n.parent !== p ? { parent: p, pool: p } : n))
              : (n = Of()),
            (v = { baseLanes: v.baseLanes | a, cachePool: n })),
        (l.memoizedState = v),
        (l.childLanes = Fu(t, f, a)),
        (e.memoizedState = Ju),
        ci(t.child, l))
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
  function Iu(t, e) {
    return ((e = Oc({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function Oc(t, e) {
    return ((t = Te(22, t, null, e)), (t.lanes = 0), t);
  }
  function Pu(t, e, a) {
    return (
      jl(e, t.child, null, a),
      (t = Iu(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function Zd(t, e, a) {
    t.lanes |= e;
    var l = t.alternate;
    (l !== null && (l.lanes |= e), hu(t.return, e, a));
  }
  function to(t, e, a, l, n, i) {
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
      $(Lt, f),
      te(t, e, l, a),
      (l = ft ? Qn : 0),
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
          ((t = a.alternate), t !== null && bc(t) === null && (n = a), (a = a.sibling));
        ((a = n),
          a === null ? ((n = e.child), (e.child = null)) : ((n = a.sibling), (a.sibling = null)),
          to(e, !1, n, a, i, l));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, n = e.child, e.child = null; n !== null; ) {
          if (((t = n.alternate), t !== null && bc(t) === null)) {
            e.child = n;
            break;
          }
          ((t = n.sibling), (n.sibling = a), (a = n), (n = t));
        }
        to(e, !0, a, null, i, l);
        break;
      case 'together':
        to(e, !1, null, null, void 0, l);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function va(t, e, a) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (Za |= e.lanes), (a & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((an(t, e, a, !1), (a & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(o(153));
    if (e.child !== null) {
      for (t = e.child, a = oa(t, t.pendingProps), e.child = a, a.return = e; t.sibling !== null; )
        ((t = t.sibling), (a = a.sibling = oa(t, t.pendingProps)), (a.return = e));
      a.sibling = null;
    }
    return e.child;
  }
  function eo(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && dc(t)));
  }
  function P1(t, e, a) {
    switch (e.tag) {
      case 3:
        (Wt(e, e.stateNode.containerInfo), Ha(e, qt, t.memoizedState.cache), yl());
        break;
      case 27:
      case 5:
        ol(e);
        break;
      case 4:
        Wt(e, e.stateNode.containerInfo);
        break;
      case 10:
        Ha(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), Nu(e), null);
        break;
      case 13:
        var l = e.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (Va(e), (e.flags |= 128), null)
            : (a & e.child.childLanes) !== 0
              ? kd(t, e, a)
              : (Va(e), (t = va(t, e, a)), t !== null ? t.sibling : null);
        Va(e);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (
          ((l = (a & e.childLanes) !== 0),
          l || (an(t, e, a, !1), (l = (a & e.childLanes) !== 0)),
          n)
        ) {
          if (l) return Xd(t, e, a);
          e.flags |= 128;
        }
        if (
          ((n = e.memoizedState),
          n !== null && ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          $(Lt, Lt.current),
          l)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), qd(t, e, a, e.pendingProps));
      case 24:
        Ha(e, qt, t.memoizedState.cache);
    }
    return va(t, e, a);
  }
  function Qd(t, e, a) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Gt = !0;
      else {
        if (!eo(t, a) && (e.flags & 128) === 0) return ((Gt = !1), P1(t, e, a));
        Gt = (t.flags & 131072) !== 0;
      }
    else ((Gt = !1), ft && (e.flags & 1048576) !== 0 && Af(e, Qn, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var l = e.pendingProps;
          if (((t = Sl(e.elementType)), (e.type = t), typeof t == 'function'))
            cu(t)
              ? ((l = Al(t, l)), (e.tag = 1), (e = $d(null, e, t, l, a)))
              : ((e.tag = 0), (e = Ku(null, e, t, l, a)));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === Yt) {
                ((e.tag = 11), (e = Bd(null, e, t, l, a)));
                break t;
              } else if (n === lt) {
                ((e.tag = 14), (e = Ld(null, e, t, l, a)));
                break t;
              }
            }
            throw ((e = we(t) || t), Error(o(306, e, '')));
          }
        }
        return e;
      case 0:
        return Ku(t, e, e.type, e.pendingProps, a);
      case 1:
        return ((l = e.type), (n = Al(l, e.pendingProps)), $d(t, e, l, n, a));
      case 3:
        t: {
          if ((Wt(e, e.stateNode.containerInfo), t === null)) throw Error(o(387));
          l = e.pendingProps;
          var i = e.memoizedState;
          ((n = i.element), Su(t, e), ei(e, l, null, a));
          var f = e.memoizedState;
          if (
            ((l = f.cache),
            Ha(e, qt, l),
            l !== i.cache && vu(e, [qt], a, !0),
            ti(),
            (l = f.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: l, isDehydrated: !1, cache: f.cache }),
              (e.updateQueue.baseState = i),
              (e.memoizedState = i),
              e.flags & 256)
            ) {
              e = Yd(t, e, l, a);
              break t;
            } else if (l !== n) {
              ((n = Be(Error(o(424)), e)), Kn(n), (e = Yd(t, e, l, a)));
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
                  ft = !0,
                  Ba = null,
                  qe = !0,
                  a = qf(e, null, l, a),
                  e.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((yl(), l === n)) {
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
          wc(t, e),
          t === null
            ? (a = nh(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = a)
              : ft ||
                ((a = e.type),
                (t = e.pendingProps),
                (l = Kc(nt.current).createElement(a)),
                (l[Ft] = e),
                (l[fe] = t),
                ee(l, a, t),
                Qt(l),
                (e.stateNode = l))
            : (e.memoizedState = nh(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          ol(e),
          t === null &&
            ft &&
            ((l = e.stateNode = eh(e.type, e.pendingProps, nt.current)),
            (It = e),
            (qe = !0),
            (n = Et),
            Wa(e.type) ? ((Bo = n), (Et = Ge(l.firstChild))) : (Et = n)),
          te(t, e, e.pendingProps.children, a),
          wc(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            ft &&
            ((n = l = Et) &&
              ((l = Mv(l, e.type, e.pendingProps, qe)),
              l !== null
                ? ((e.stateNode = l), (It = e), (Et = Ge(l.firstChild)), (qe = !1), (n = !0))
                : (n = !1)),
            n || La(e)),
          ol(e),
          (n = e.type),
          (i = e.pendingProps),
          (f = t !== null ? t.memoizedProps : null),
          (l = i.children),
          Co(n, i) ? (l = null) : f !== null && Co(n, f) && (e.flags |= 32),
          e.memoizedState !== null && ((n = zu(t, e, k1, null, null, a)), (Si._currentValue = n)),
          wc(t, e),
          te(t, e, l, a),
          e.child
        );
      case 6:
        return (
          t === null &&
            ft &&
            ((t = a = Et) &&
              ((a = Cv(a, e.pendingProps, qe)),
              a !== null ? ((e.stateNode = a), (It = e), (Et = null), (t = !0)) : (t = !1)),
            t || La(e)),
          null
        );
      case 13:
        return kd(t, e, a);
      case 4:
        return (
          Wt(e, e.stateNode.containerInfo),
          (l = e.pendingProps),
          t === null ? (e.child = jl(e, null, l, a)) : te(t, e, l, a),
          e.child
        );
      case 11:
        return Bd(t, e, e.type, e.pendingProps, a);
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
        return Ld(t, e, e.type, e.pendingProps, a);
      case 15:
        return Hd(t, e, e.type, e.pendingProps, a);
      case 19:
        return Xd(t, e, a);
      case 31:
        return I1(t, e, a);
      case 22:
        return qd(t, e, a, e.pendingProps);
      case 24:
        return (
          pl(e),
          (l = Pt(qt)),
          t === null
            ? ((n = _u()),
              n === null &&
                ((n = Nt),
                (i = gu()),
                (n.pooledCache = i),
                i.refCount++,
                i !== null && (n.pooledCacheLanes |= a),
                (n = i)),
              (e.memoizedState = { parent: l, cache: n }),
              bu(e),
              Ha(e, qt, n))
            : ((t.lanes & a) !== 0 && (Su(t, e), ei(e, null, null, a), ti()),
              (n = t.memoizedState),
              (i = e.memoizedState),
              n.parent !== l
                ? ((n = { parent: l, cache: l }),
                  (e.memoizedState = n),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n),
                  Ha(e, qt, l))
                : ((l = i.cache), Ha(e, qt, l), l !== n.cache && vu(e, [qt], a, !0))),
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
  function ao(t, e, a, l, n) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (n & 335544128) === n))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (bm()) t.flags |= 8192;
        else throw ((xl = gc), pu);
    } else t.flags &= -16777217;
  }
  function Kd(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !oh(e)))
      if (bm()) t.flags |= 8192;
      else throw ((xl = gc), pu);
  }
  function Dc(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? Nr() : 536870912), (t.lanes |= e), (vn |= e)));
  }
  function si(t, e) {
    if (!ft)
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
  function tv(t, e, a) {
    var l = e.pendingProps;
    switch ((ru(e), e.tag)) {
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
            (en(e)
              ? ga(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), du())),
          zt(e),
          null
        );
      case 26:
        var n = e.type,
          i = e.memoizedState;
        return (
          t === null
            ? (ga(e), i !== null ? (zt(e), Kd(e, i)) : (zt(e), ao(e, n, null, l, a)))
            : i
              ? i !== t.memoizedState
                ? (ga(e), zt(e), Kd(e, i))
                : (zt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== l && ga(e), zt(e), ao(e, n, t, l, a)),
          null
        );
      case 27:
        if ((Ll(e), (a = nt.current), (n = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== l && ga(e);
        else {
          if (!l) {
            if (e.stateNode === null) throw Error(o(166));
            return (zt(e), null);
          }
          ((t = k.current), en(e) ? Ef(e) : ((t = eh(n, l, a)), (e.stateNode = t), ga(e)));
        }
        return (zt(e), null);
      case 5:
        if ((Ll(e), (n = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== l && ga(e);
        else {
          if (!l) {
            if (e.stateNode === null) throw Error(o(166));
            return (zt(e), null);
          }
          if (((i = k.current), en(e))) Ef(e);
          else {
            var f = Kc(nt.current);
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
        return (zt(e), ao(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, a), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== l && ga(e);
        else {
          if (typeof l != 'string' && e.stateNode === null) throw Error(o(166));
          if (((t = nt.current), en(e))) {
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
                km(t.nodeValue, a)
              )),
              t || La(e, !0));
          } else ((t = Kc(t).createTextNode(l)), (t[Ft] = e), (e.stateNode = t));
        }
        return (zt(e), null);
      case 31:
        if (((a = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((l = en(e)), a !== null)) {
            if (t === null) {
              if (!l) throw Error(o(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(o(557));
              t[Ft] = e;
            } else (yl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (zt(e), (t = !1));
          } else
            ((a = du()),
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
          if (((n = en(e)), l !== null && l.dehydrated !== null)) {
            if (t === null) {
              if (!n) throw Error(o(318));
              if (((n = e.memoizedState), (n = n !== null ? n.dehydrated : null), !n))
                throw Error(o(317));
              n[Ft] = e;
            } else (yl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (zt(e), (n = !1));
          } else
            ((n = du()),
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
              Dc(e, e.updateQueue),
              zt(e),
              null)
        );
      case 4:
        return (wt(), t === null && Ao(e.stateNode.containerInfo), zt(e), null);
      case 10:
        return (da(e.type), zt(e), null);
      case 19:
        if ((L(Lt), (l = e.memoizedState), l === null)) return (zt(e), null);
        if (((n = (e.flags & 128) !== 0), (i = l.rendering), i === null))
          if (n) si(l, !1);
          else {
            if (Dt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((i = bc(t)), i !== null)) {
                  for (
                    e.flags |= 128,
                      si(l, !1),
                      t = i.updateQueue,
                      e.updateQueue = t,
                      Dc(e, t),
                      e.subtreeFlags = 0,
                      t = a,
                      a = e.child;
                    a !== null;
                  )
                    (xf(a, t), (a = a.sibling));
                  return ($(Lt, (Lt.current & 1) | 2), ft && ra(e, l.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            l.tail !== null &&
              be() > qc &&
              ((e.flags |= 128), (n = !0), si(l, !1), (e.lanes = 4194304));
          }
        else {
          if (!n)
            if (((t = bc(i)), t !== null)) {
              if (
                ((e.flags |= 128),
                (n = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                Dc(e, t),
                si(l, !0),
                l.tail === null && l.tailMode === 'hidden' && !i.alternate && !ft)
              )
                return (zt(e), null);
            } else
              2 * be() - l.renderingStartTime > qc &&
                a !== 536870912 &&
                ((e.flags |= 128), (n = !0), si(l, !1), (e.lanes = 4194304));
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
            $(Lt, n ? (a & 1) | 2 : a & 1),
            ft && ra(e, l.treeForkCount),
            t)
          : (zt(e), null);
      case 22:
      case 23:
        return (
          Ne(e),
          Au(),
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
          a !== null && Dc(e, a.retryQueue),
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
          t !== null && L(bl),
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
  function ev(t, e) {
    switch ((ru(e), e.tag)) {
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
        return (Ll(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((Ne(e), e.alternate === null)) throw Error(o(340));
          yl();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((Ne(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(o(340));
          yl();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (L(Lt), null);
      case 4:
        return (wt(), null);
      case 10:
        return (da(e.type), null);
      case 22:
      case 23:
        return (
          Ne(e),
          Au(),
          t !== null && L(bl),
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
  function Jd(t, e) {
    switch ((ru(e), e.tag)) {
      case 3:
        (da(qt), wt());
        break;
      case 26:
      case 27:
      case 5:
        Ll(e);
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
        L(Lt);
        break;
      case 10:
        da(e.type);
        break;
      case 22:
      case 23:
        (Ne(e), Au(), t !== null && L(bl));
        break;
      case 24:
        da(qt);
    }
  }
  function ui(t, e) {
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
              var p = a,
                N = v;
              try {
                N();
              } catch (C) {
                St(n, p, C);
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
  function Wd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        Gf(e, a);
      } catch (l) {
        St(t, t.return, l);
      }
    }
  }
  function Fd(t, e, a) {
    ((a.props = Al(t.type, t.memoizedProps)), (a.state = t.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (l) {
      St(t, e, l);
    }
  }
  function oi(t, e) {
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
  function Id(t) {
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
  function lo(t, e, a) {
    try {
      var l = t.stateNode;
      (jv(l, t.type, a, e), (l[fe] = e));
    } catch (n) {
      St(t, t.return, n);
    }
  }
  function Pd(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Wa(t.type)) || t.tag === 4
    );
  }
  function no(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Pd(t.return)) return null;
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
  function io(t, e, a) {
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
      for (io(t, e, a), t = t.sibling; t !== null; ) (io(t, e, a), (t = t.sibling));
  }
  function Rc(t, e, a) {
    var l = t.tag;
    if (l === 5 || l === 6) ((t = t.stateNode), e ? a.insertBefore(t, e) : a.appendChild(t));
    else if (l !== 4 && (l === 27 && Wa(t.type) && (a = t.stateNode), (t = t.child), t !== null))
      for (Rc(t, e, a), t = t.sibling; t !== null; ) (Rc(t, e, a), (t = t.sibling));
  }
  function tm(t) {
    var e = t.stateNode,
      a = t.memoizedProps;
    try {
      for (var l = t.type, n = e.attributes; n.length; ) e.removeAttributeNode(n[0]);
      (ee(e, l, a), (e[Ft] = t), (e[fe] = a));
    } catch (i) {
      St(t, t.return, i);
    }
  }
  var ya = !1,
    Vt = !1,
    co = !1,
    em = typeof WeakSet == 'function' ? WeakSet : Set,
    Kt = null;
  function av(t, e) {
    if (((t = t.containerInfo), (zo = es), (t = mf(t)), Ps(t))) {
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
              p = -1,
              N = 0,
              C = 0,
              B = t,
              z = null;
            e: for (;;) {
              for (
                var M;
                B !== a || (n !== 0 && B.nodeType !== 3) || (v = f + n),
                  B !== i || (l !== 0 && B.nodeType !== 3) || (p = f + l),
                  B.nodeType === 3 && (f += B.nodeValue.length),
                  (M = B.firstChild) !== null;
              )
                ((z = B), (B = M));
              for (;;) {
                if (B === t) break e;
                if (
                  (z === a && ++N === n && (v = f),
                  z === i && ++C === l && (p = f),
                  (M = B.nextSibling) !== null)
                )
                  break;
                ((B = z), (z = B.parentNode));
              }
              B = M;
            }
            a = v === -1 || p === -1 ? null : { start: v, end: p };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Mo = { focusedElem: t, selectionRange: a }, es = !1, Kt = e; Kt !== null; )
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
                  var Y = Al(a.type, n);
                  ((t = l.getSnapshotBeforeUpdate(Y, i)),
                    (l.__reactInternalSnapshotBeforeUpdate = t));
                } catch (J) {
                  St(a, a.return, J);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (a = t.nodeType), a === 9)) Oo(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Oo(t);
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
  function am(t, e, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (pa(t, a), l & 4 && ui(5, a));
        break;
      case 1:
        if ((pa(t, a), l & 4))
          if (((t = a.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (f) {
              St(a, a.return, f);
            }
          else {
            var n = Al(a.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(n, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              St(a, a.return, f);
            }
          }
        (l & 64 && Wd(a), l & 512 && oi(a, a.return));
        break;
      case 3:
        if ((pa(t, a), l & 64 && ((t = a.updateQueue), t !== null))) {
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
            Gf(t, e);
          } catch (f) {
            St(a, a.return, f);
          }
        }
        break;
      case 27:
        e === null && l & 4 && tm(a);
      case 26:
      case 5:
        (pa(t, a), e === null && l & 4 && Id(a), l & 512 && oi(a, a.return));
        break;
      case 12:
        pa(t, a);
        break;
      case 31:
        (pa(t, a), l & 4 && im(t, a));
        break;
      case 13:
        (pa(t, a),
          l & 4 && cm(t, a),
          l & 64 &&
            ((t = a.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((a = fv.bind(null, a)), wv(t, a)))));
        break;
      case 22:
        if (((l = a.memoizedState !== null || ya), !l)) {
          ((e = (e !== null && e.memoizedState !== null) || Vt), (n = ya));
          var i = Vt;
          ((ya = l),
            (Vt = e) && !i ? ba(t, a, (a.subtreeFlags & 8772) !== 0) : pa(t, a),
            (ya = n),
            (Vt = i));
        }
        break;
      case 30:
        break;
      default:
        pa(t, a);
    }
  }
  function lm(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), lm(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && Ls(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var Ct = null,
    me = !1;
  function _a(t, e, a) {
    for (a = a.child; a !== null; ) (nm(t, e, a), (a = a.sibling));
  }
  function nm(t, e, a) {
    if (Se && typeof Se.onCommitFiberUnmount == 'function')
      try {
        Se.onCommitFiberUnmount(Dn, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (Vt || aa(a, e),
          _a(t, e, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        Vt || aa(a, e);
        var l = Ct,
          n = me;
        (Wa(a.type) && ((Ct = a.stateNode), (me = !1)),
          _a(t, e, a),
          _i(a.stateNode),
          (Ct = l),
          (me = n));
        break;
      case 5:
        Vt || aa(a, e);
      case 6:
        if (((l = Ct), (n = me), (Ct = null), _a(t, e, a), (Ct = l), (me = n), Ct !== null))
          if (me)
            try {
              (Ct.nodeType === 9
                ? Ct.body
                : Ct.nodeName === 'HTML'
                  ? Ct.ownerDocument.body
                  : Ct
              ).removeChild(a.stateNode);
            } catch (i) {
              St(a, e, i);
            }
          else
            try {
              Ct.removeChild(a.stateNode);
            } catch (i) {
              St(a, e, i);
            }
        break;
      case 18:
        Ct !== null &&
          (me
            ? ((t = Ct),
              Wm(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                a.stateNode
              ),
              jn(t))
            : Wm(Ct, a.stateNode));
        break;
      case 4:
        ((l = Ct),
          (n = me),
          (Ct = a.stateNode.containerInfo),
          (me = !0),
          _a(t, e, a),
          (Ct = l),
          (me = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Ya(2, a, e), Vt || Ya(4, a, e), _a(t, e, a));
        break;
      case 1:
        (Vt ||
          (aa(a, e), (l = a.stateNode), typeof l.componentWillUnmount == 'function' && Fd(a, e, l)),
          _a(t, e, a));
        break;
      case 21:
        _a(t, e, a);
        break;
      case 22:
        ((Vt = (l = Vt) || a.memoizedState !== null), _a(t, e, a), (Vt = l));
        break;
      default:
        _a(t, e, a);
    }
  }
  function im(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        jn(t);
      } catch (a) {
        St(e, e.return, a);
      }
    }
  }
  function cm(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        jn(t);
      } catch (a) {
        St(e, e.return, a);
      }
  }
  function lv(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new em()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new em()),
          e
        );
      default:
        throw Error(o(435, t.tag));
    }
  }
  function Bc(t, e) {
    var a = lv(t);
    e.forEach(function (l) {
      if (!a.has(l)) {
        a.add(l);
        var n = dv.bind(null, t, l);
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
                ((Ct = v.stateNode), (me = !1));
                break t;
              }
              break;
            case 5:
              ((Ct = v.stateNode), (me = !1));
              break t;
            case 3:
            case 4:
              ((Ct = v.stateNode.containerInfo), (me = !0));
              break t;
          }
          v = v.return;
        }
        if (Ct === null) throw Error(o(160));
        (nm(i, f, n),
          (Ct = null),
          (me = !1),
          (i = n.alternate),
          i !== null && (i.return = null),
          (n.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (sm(e, t), (e = e.sibling));
  }
  var Xe = null;
  function sm(t, e) {
    var a = t.alternate,
      l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (he(e, t), ve(t), l & 4 && (Ya(3, t, t.return), ui(3, t), Ya(5, t, t.return)));
        break;
      case 1:
        (he(e, t),
          ve(t),
          l & 512 && (Vt || a === null || aa(a, a.return)),
          l & 64 &&
            ya &&
            ((t = t.updateQueue),
            t !== null &&
              ((l = t.callbacks),
              l !== null &&
                ((a = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = a === null ? l : a.concat(l))))));
        break;
      case 26:
        var n = Xe;
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
                          i[Ln] ||
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
                      var f = sh('link', 'href', n).get(l + (a.href || ''));
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
                      if ((f = sh('meta', 'content', n).get(l + (a.content || '')))) {
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
              } else uh(n, t.type, t.stateNode);
            else t.stateNode = ch(n, l, t.memoizedProps);
          else
            i !== l
              ? (i === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : i.count--,
                l === null ? uh(n, t.type, t.stateNode) : ch(n, l, t.memoizedProps))
              : l === null && t.stateNode !== null && lo(t, t.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (he(e, t),
          ve(t),
          l & 512 && (Vt || a === null || aa(a, a.return)),
          a !== null && l & 4 && lo(t, t.memoizedProps, a.memoizedProps));
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
          ((n = t.memoizedProps), lo(t, n, a !== null ? a.memoizedProps : n)),
          l & 1024 && (co = !0));
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
          ((Fc = null),
          (n = Xe),
          (Xe = Jc(e.containerInfo)),
          he(e, t),
          (Xe = n),
          ve(t),
          l & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            jn(e.containerInfo);
          } catch (Y) {
            St(t, t.return, Y);
          }
        co && ((co = !1), um(t));
        break;
      case 4:
        ((l = Xe), (Xe = Jc(t.stateNode.containerInfo)), he(e, t), ve(t), (Xe = l));
        break;
      case 12:
        (he(e, t), ve(t));
        break;
      case 31:
        (he(e, t),
          ve(t),
          l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Bc(t, l))));
        break;
      case 13:
        (he(e, t),
          ve(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Hc = be()),
          l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Bc(t, l))));
        break;
      case 22:
        n = t.memoizedState !== null;
        var p = a !== null && a.memoizedState !== null,
          N = ya,
          C = Vt;
        if (((ya = N || n), (Vt = C || p), he(e, t), (Vt = C), (ya = N), ve(t), l & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = n ? e._visibility & -2 : e._visibility | 1,
              n && (a === null || p || ya || Vt || Nl(t)),
              a = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (a === null) {
                p = a = e;
                try {
                  if (((i = p.stateNode), n))
                    ((f = i.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    v = p.stateNode;
                    var B = p.memoizedProps.style,
                      z = B != null && B.hasOwnProperty('display') ? B.display : null;
                    v.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (Y) {
                  St(p, p.return, Y);
                }
              }
            } else if (e.tag === 6) {
              if (a === null) {
                p = e;
                try {
                  p.stateNode.nodeValue = n ? '' : p.memoizedProps;
                } catch (Y) {
                  St(p, p.return, Y);
                }
              }
            } else if (e.tag === 18) {
              if (a === null) {
                p = e;
                try {
                  var M = p.stateNode;
                  n ? Fm(M, !0) : Fm(p.stateNode, !1);
                } catch (Y) {
                  St(p, p.return, Y);
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
          l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), Bc(t, a))));
        break;
      case 19:
        (he(e, t),
          ve(t),
          l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Bc(t, l))));
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
          if (Pd(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var n = a.stateNode,
              i = no(t);
            Rc(t, i, n);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && (Zl(f, ''), (a.flags &= -33));
            var v = no(t);
            Rc(t, v, f);
            break;
          case 3:
          case 4:
            var p = a.stateNode.containerInfo,
              N = no(t);
            io(t, N, p);
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
  function um(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (um(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function pa(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (am(t, e.alternate, e), (e = e.sibling));
  }
  function Nl(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Ya(4, e, e.return), Nl(e));
          break;
        case 1:
          aa(e, e.return);
          var a = e.stateNode;
          (typeof a.componentWillUnmount == 'function' && Fd(e, e.return, a), Nl(e));
          break;
        case 27:
          _i(e.stateNode);
        case 26:
        case 5:
          (aa(e, e.return), Nl(e));
          break;
        case 22:
          e.memoizedState === null && Nl(e);
          break;
        case 30:
          Nl(e);
          break;
        default:
          Nl(e);
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
          (ba(n, i, a), ui(4, i));
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
              var p = n.shared.hiddenCallbacks;
              if (p !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < p.length; n++) Uf(p[n], v);
            } catch (N) {
              St(l, l.return, N);
            }
          }
          (a && f & 64 && Wd(i), oi(i, i.return));
          break;
        case 27:
          tm(i);
        case 26:
        case 5:
          (ba(n, i, a), a && l === null && f & 4 && Id(i), oi(i, i.return));
          break;
        case 12:
          ba(n, i, a);
          break;
        case 31:
          (ba(n, i, a), a && f & 4 && im(n, i));
          break;
        case 13:
          (ba(n, i, a), a && f & 4 && cm(n, i));
          break;
        case 22:
          (i.memoizedState === null && ba(n, i, a), oi(i, i.return));
          break;
        case 30:
          break;
        default:
          ba(n, i, a);
      }
      e = e.sibling;
    }
  }
  function so(t, e) {
    var a = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (a = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== a && (t != null && t.refCount++, a != null && Jn(a)));
  }
  function uo(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Jn(t)));
  }
  function Qe(t, e, a, l) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (om(t, e, a, l), (e = e.sibling));
  }
  function om(t, e, a, l) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Qe(t, e, a, l), n & 2048 && ui(9, e));
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
            e !== t && (e.refCount++, t != null && Jn(t))));
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
          } catch (p) {
            St(e, e.return, p);
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
              : ri(t, e)
            : i._visibility & 2
              ? Qe(t, e, a, l)
              : ((i._visibility |= 2), dn(t, e, a, l, (e.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && so(f, e));
        break;
      case 24:
        (Qe(t, e, a, l), n & 2048 && uo(e.alternate, e));
        break;
      default:
        Qe(t, e, a, l);
    }
  }
  function dn(t, e, a, l, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var i = t,
        f = e,
        v = a,
        p = l,
        N = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (dn(i, f, v, p, n), ui(8, f));
          break;
        case 23:
          break;
        case 22:
          var C = f.stateNode;
          (f.memoizedState !== null
            ? C._visibility & 2
              ? dn(i, f, v, p, n)
              : ri(i, f)
            : ((C._visibility |= 2), dn(i, f, v, p, n)),
            n && N & 2048 && so(f.alternate, f));
          break;
        case 24:
          (dn(i, f, v, p, n), n && N & 2048 && uo(f.alternate, f));
          break;
        default:
          dn(i, f, v, p, n);
      }
      e = e.sibling;
    }
  }
  function ri(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var a = t,
          l = e,
          n = l.flags;
        switch (l.tag) {
          case 22:
            (ri(a, l), n & 2048 && so(l.alternate, l));
            break;
          case 24:
            (ri(a, l), n & 2048 && uo(l.alternate, l));
            break;
          default:
            ri(a, l);
        }
        e = e.sibling;
      }
  }
  var fi = 8192;
  function mn(t, e, a) {
    if (t.subtreeFlags & fi) for (t = t.child; t !== null; ) (rm(t, e, a), (t = t.sibling));
  }
  function rm(t, e, a) {
    switch (t.tag) {
      case 26:
        (mn(t, e, a),
          t.flags & fi && t.memoizedState !== null && Yv(a, Xe, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        mn(t, e, a);
        break;
      case 3:
      case 4:
        var l = Xe;
        ((Xe = Jc(t.stateNode.containerInfo)), mn(t, e, a), (Xe = l));
        break;
      case 22:
        t.memoizedState === null &&
          ((l = t.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = fi), (fi = 16777216), mn(t, e, a), (fi = l))
            : mn(t, e, a));
        break;
      default:
        mn(t, e, a);
    }
  }
  function fm(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function di(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var l = e[a];
          ((Kt = l), mm(l, t));
        }
      fm(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (dm(t), (t = t.sibling));
  }
  function dm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (di(t), t.flags & 2048 && Ya(9, t, t.return));
        break;
      case 3:
        di(t);
        break;
      case 12:
        di(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), Lc(t))
          : di(t);
        break;
      default:
        di(t);
    }
  }
  function Lc(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var l = e[a];
          ((Kt = l), mm(l, t));
        }
      fm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (Ya(8, e, e.return), Lc(e));
          break;
        case 22:
          ((a = e.stateNode), a._visibility & 2 && ((a._visibility &= -3), Lc(e)));
          break;
        default:
          Lc(e);
      }
      t = t.sibling;
    }
  }
  function mm(t, e) {
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
          Jn(a.memoizedState.cache);
      }
      if (((l = a.child), l !== null)) ((l.return = a), (Kt = l));
      else
        t: for (a = t; Kt !== null; ) {
          l = Kt;
          var n = l.sibling,
            i = l.return;
          if ((lm(l), l === a)) {
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
  var nv = {
      getCacheForType: function (t) {
        var e = Pt(qt),
          a = e.data.get(t);
        return (a === void 0 && ((a = t()), e.data.set(t, a)), a);
      },
      cacheSignal: function () {
        return Pt(qt).controller.signal;
      },
    },
    iv = typeof WeakMap == 'function' ? WeakMap : Map,
    gt = 0,
    Nt = null,
    it = null,
    ut = 0,
    bt = 0,
    Ee = null,
    ka = !1,
    hn = !1,
    oo = !1,
    Sa = 0,
    Dt = 0,
    Za = 0,
    El = 0,
    ro = 0,
    ze = 0,
    vn = 0,
    mi = null,
    ge = null,
    fo = !1,
    Hc = 0,
    hm = 0,
    qc = 1 / 0,
    Uc = null,
    Xa = null,
    kt = 0,
    Qa = null,
    gn = null,
    xa = 0,
    mo = 0,
    ho = null,
    vm = null,
    hi = 0,
    vo = null;
  function Me() {
    return (gt & 2) !== 0 && ut !== 0 ? ut & -ut : w.T !== null ? So() : Cr();
  }
  function gm() {
    if (ze === 0)
      if ((ut & 536870912) === 0 || ft) {
        var t = Qi;
        ((Qi <<= 1), (Qi & 3932160) === 0 && (Qi = 262144), (ze = t));
      } else ze = 536870912;
    return ((t = Ae.current), t !== null && (t.flags |= 32), ze);
  }
  function ye(t, e, a) {
    (((t === Nt && (bt === 2 || bt === 9)) || t.cancelPendingCommit !== null) &&
      (yn(t, 0), Ka(t, ut, ze, !1)),
      Bn(t, a),
      ((gt & 2) === 0 || t !== Nt) &&
        (t === Nt && ((gt & 2) === 0 && (El |= a), Dt === 4 && Ka(t, ut, ze, !1)), la(t)));
  }
  function ym(t, e, a) {
    if ((gt & 6) !== 0) throw Error(o(327));
    var l = (!a && (e & 127) === 0 && (e & t.expiredLanes) === 0) || Rn(t, e),
      n = l ? uv(t, e) : yo(t, e, !0),
      i = l;
    do {
      if (n === 0) {
        hn && !l && Ka(t, e, 0, !1);
        break;
      } else {
        if (((a = t.current.alternate), i && !cv(a))) {
          ((n = yo(t, e, !1)), (i = !1));
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
              n = mi;
              var p = v.current.memoizedState.isDehydrated;
              if ((p && (yn(v, f).flags |= 256), (f = yo(v, f, !1)), f !== 2)) {
                if (oo && !p) {
                  ((v.errorRecoveryDisabledLanes |= i), (El |= i), (n = 4));
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
          (yn(t, 0), Ka(t, e, 0, !0));
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
              Ka(l, e, ze, !ka);
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
          if ((e & 62914560) === e && ((n = Hc + 300 - be()), 10 < n)) {
            if ((Ka(l, e, ze, !ka), Ji(l, 0, !0) !== 0)) break t;
            ((xa = e),
              (l.timeoutHandle = Km(
                _m.bind(null, l, a, ge, Uc, fo, e, ze, El, vn, ka, i, 'Throttled', -0, 0),
                n
              )));
            break t;
          }
          _m(l, a, ge, Uc, fo, e, ze, El, vn, ka, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    la(t);
  }
  function _m(t, e, a, l, n, i, f, v, p, N, C, B, z, M) {
    if (((t.timeoutHandle = -1), (B = e.subtreeFlags), B & 8192 || (B & 16785408) === 16785408)) {
      ((B = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: sa,
      }),
        rm(e, i, B));
      var Y = (i & 62914560) === i ? Hc - be() : (i & 4194048) === i ? hm - be() : 0;
      if (((Y = kv(B, Y)), Y !== null)) {
        ((xa = i),
          (t.cancelPendingCommit = Y(Nm.bind(null, t, e, i, a, l, n, f, v, p, C, B, null, z, M))),
          Ka(t, i, f, !N));
        return;
      }
    }
    Nm(t, e, i, a, l, n, f, v, p);
  }
  function cv(t) {
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
    ((e &= ~ro),
      (e &= ~El),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      l && (t.warmLanes |= e),
      (l = t.expirationTimes));
    for (var n = e; 0 < n; ) {
      var i = 31 - xe(n),
        f = 1 << i;
      ((l[i] = -1), (n &= ~f));
    }
    a !== 0 && Er(t, a, e);
  }
  function Gc() {
    return (gt & 6) === 0 ? (vi(0), !1) : !0;
  }
  function go() {
    if (it !== null) {
      if (bt === 0) var t = it.return;
      else ((t = it), (fa = _l = null), wu(t), (sn = null), (Fn = 0), (t = it));
      for (; t !== null; ) (Jd(t.alternate, t), (t = t.return));
      it = null;
    }
  }
  function yn(t, e) {
    var a = t.timeoutHandle;
    (a !== -1 && ((t.timeoutHandle = -1), Nv(a)),
      (a = t.cancelPendingCommit),
      a !== null && ((t.cancelPendingCommit = null), a()),
      (xa = 0),
      go(),
      (Nt = t),
      (it = a = oa(t.current, null)),
      (ut = e),
      (bt = 0),
      (Ee = null),
      (ka = !1),
      (hn = Rn(t, e)),
      (oo = !1),
      (vn = ze = ro = El = Za = Dt = 0),
      (ge = mi = null),
      (fo = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var n = 31 - xe(l),
          i = 1 << n;
        ((e |= t[n]), (l &= ~i));
      }
    return ((Sa = e), sc(), a);
  }
  function pm(t, e) {
    ((et = null),
      (w.H = ii),
      e === cn || e === vc
        ? ((e = Bf()), (bt = 3))
        : e === pu
          ? ((e = Bf()), (bt = 4))
          : (bt =
              e === Qu
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (Ee = e),
      it === null && ((Dt = 1), Mc(t, Be(e, t.current))));
  }
  function bm() {
    var t = Ae.current;
    return t === null
      ? !0
      : (ut & 4194048) === ut
        ? Ue === null
        : (ut & 62914560) === ut || (ut & 536870912) !== 0
          ? t === Ue
          : !1;
  }
  function Sm() {
    var t = w.H;
    return ((w.H = ii), t === null ? ii : t);
  }
  function xm() {
    var t = w.A;
    return ((w.A = nv), t);
  }
  function Vc() {
    ((Dt = 4),
      ka || ((ut & 4194048) !== ut && Ae.current !== null) || (hn = !0),
      ((Za & 134217727) === 0 && (El & 134217727) === 0) || Nt === null || Ka(Nt, ut, ze, !1));
  }
  function yo(t, e, a) {
    var l = gt;
    gt |= 2;
    var n = Sm(),
      i = xm();
    ((Nt !== t || ut !== e) && ((Uc = null), yn(t, e)), (e = !1));
    var f = Dt;
    t: do
      try {
        if (bt !== 0 && it !== null) {
          var v = it,
            p = Ee;
          switch (bt) {
            case 8:
              (go(), (f = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ae.current === null && (e = !0);
              var N = bt;
              if (((bt = 0), (Ee = null), _n(t, v, p, N), a && hn)) {
                f = 0;
                break t;
              }
              break;
            default:
              ((N = bt), (bt = 0), (Ee = null), _n(t, v, p, N));
          }
        }
        (sv(), (f = Dt));
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
      it === null && ((Nt = null), (ut = 0), sc()),
      f
    );
  }
  function sv() {
    for (; it !== null; ) jm(it);
  }
  function uv(t, e) {
    var a = gt;
    gt |= 2;
    var l = Sm(),
      n = xm();
    Nt !== t || ut !== e ? ((Uc = null), (qc = be() + 500), yn(t, e)) : (hn = Rn(t, e));
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
              if (Df(i)) {
                ((bt = 0), (Ee = null), Tm(e));
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
              Df(i) ? ((bt = 0), (Ee = null), Tm(e)) : ((bt = 0), (Ee = null), _n(t, e, i, 7));
              break;
            case 5:
              var f = null;
              switch (it.tag) {
                case 26:
                  f = it.memoizedState;
                case 5:
                case 27:
                  var v = it;
                  if (f ? oh(f) : v.stateNode.complete) {
                    ((bt = 0), (Ee = null));
                    var p = v.sibling;
                    if (p !== null) it = p;
                    else {
                      var N = v.return;
                      N !== null ? ((it = N), $c(N)) : (it = null);
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
              (go(), (Dt = 6));
              break t;
            default:
              throw Error(o(462));
          }
        }
        ov();
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
      it !== null ? 0 : ((Nt = null), (ut = 0), sc(), Dt)
    );
  }
  function ov() {
    for (; it !== null && !O0(); ) jm(it);
  }
  function jm(t) {
    var e = Qd(t.alternate, t, Sa);
    ((t.memoizedProps = t.pendingProps), e === null ? $c(t) : (it = e));
  }
  function Tm(t) {
    var e = t,
      a = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Vd(a, e, e.pendingProps, e.type, void 0, ut);
        break;
      case 11:
        e = Vd(a, e, e.pendingProps, e.type.render, e.ref, ut);
        break;
      case 5:
        wu(e);
      default:
        (Jd(a, e), (e = it = xf(e, Sa)), (e = Qd(a, e, Sa)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? $c(t) : (it = e));
  }
  function _n(t, e, a, l) {
    ((fa = _l = null), wu(e), (sn = null), (Fn = 0));
    var n = e.return;
    try {
      if (F1(t, n, e, a, ut)) {
        ((Dt = 1), Mc(t, Be(a, t.current)), (it = null));
        return;
      }
    } catch (i) {
      if (n !== null) throw ((it = n), i);
      ((Dt = 1), Mc(t, Be(a, t.current)), (it = null));
      return;
    }
    e.flags & 32768
      ? (ft || l === 1
          ? (t = !0)
          : hn || (ut & 536870912) !== 0
            ? (t = !1)
            : ((ka = t = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = Ae.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
        Am(e, t))
      : $c(e);
  }
  function $c(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Am(e, ka);
        return;
      }
      t = e.return;
      var a = tv(e.alternate, e, Sa);
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
    Dt === 0 && (Dt = 5);
  }
  function Am(t, e) {
    do {
      var a = ev(t.alternate, t);
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
    ((Dt = 6), (it = null));
  }
  function Nm(t, e, a, l, n, i, f, v, p) {
    t.cancelPendingCommit = null;
    do Yc();
    while (kt !== 0);
    if ((gt & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (
        ((i = e.lanes | e.childLanes),
        (i |= nu),
        $0(t, a, i, f, v, p),
        t === Nt && ((it = Nt = null), (ut = 0)),
        (gn = e),
        (Qa = t),
        (xa = a),
        (mo = i),
        (ho = n),
        (vm = l),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            mv(Zi, function () {
              return (wm(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (l = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = w.T), (w.T = null), (n = G.p), (G.p = 2), (f = gt), (gt |= 4));
        try {
          av(t, e, a);
        } finally {
          ((gt = f), (G.p = n), (w.T = l));
        }
      }
      ((kt = 1), Em(), zm(), Mm());
    }
  }
  function Em() {
    if (kt === 1) {
      kt = 0;
      var t = Qa,
        e = gn,
        a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        ((a = w.T), (w.T = null));
        var l = G.p;
        G.p = 2;
        var n = gt;
        gt |= 4;
        try {
          sm(e, t);
          var i = Mo,
            f = mf(t.containerInfo),
            v = i.focusedElem,
            p = i.selectionRange;
          if (f !== v && v && v.ownerDocument && df(v.ownerDocument.documentElement, v)) {
            if (p !== null && Ps(v)) {
              var N = p.start,
                C = p.end;
              if ((C === void 0 && (C = N), 'selectionStart' in v))
                ((v.selectionStart = N), (v.selectionEnd = Math.min(C, v.value.length)));
              else {
                var B = v.ownerDocument || document,
                  z = (B && B.defaultView) || window;
                if (z.getSelection) {
                  var M = z.getSelection(),
                    Y = v.textContent.length,
                    J = Math.min(p.start, Y),
                    Tt = p.end === void 0 ? J : Math.min(p.end, Y);
                  !M.extend && J > Tt && ((f = Tt), (Tt = J), (J = f));
                  var T = ff(v, J),
                    S = ff(v, Tt);
                  if (
                    T &&
                    S &&
                    (M.rangeCount !== 1 ||
                      M.anchorNode !== T.node ||
                      M.anchorOffset !== T.offset ||
                      M.focusNode !== S.node ||
                      M.focusOffset !== S.offset)
                  ) {
                    var A = B.createRange();
                    (A.setStart(T.node, T.offset),
                      M.removeAllRanges(),
                      J > Tt
                        ? (M.addRange(A), M.extend(S.node, S.offset))
                        : (A.setEnd(S.node, S.offset), M.addRange(A)));
                  }
                }
              }
            }
            for (B = [], M = v; (M = M.parentNode); )
              M.nodeType === 1 && B.push({ element: M, left: M.scrollLeft, top: M.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < B.length; v++) {
              var D = B[v];
              ((D.element.scrollLeft = D.left), (D.element.scrollTop = D.top));
            }
          }
          ((es = !!zo), (Mo = zo = null));
        } finally {
          ((gt = n), (G.p = l), (w.T = a));
        }
      }
      ((t.current = e), (kt = 2));
    }
  }
  function zm() {
    if (kt === 2) {
      kt = 0;
      var t = Qa,
        e = gn,
        a = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || a) {
        ((a = w.T), (w.T = null));
        var l = G.p;
        G.p = 2;
        var n = gt;
        gt |= 4;
        try {
          am(t, e.alternate, e);
        } finally {
          ((gt = n), (G.p = l), (w.T = a));
        }
      }
      kt = 3;
    }
  }
  function Mm() {
    if (kt === 4 || kt === 3) {
      ((kt = 0), D0());
      var t = Qa,
        e = gn,
        a = xa,
        l = vm;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (kt = 5)
        : ((kt = 0), (gn = Qa = null), Cm(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (
        (n === 0 && (Xa = null),
        Rs(a),
        (e = e.stateNode),
        Se && typeof Se.onCommitFiberRoot == 'function')
      )
        try {
          Se.onCommitFiberRoot(Dn, e, void 0, (e.current.flags & 128) === 128);
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
      ((xa & 3) !== 0 && Yc(),
        la(t),
        (n = t.pendingLanes),
        (a & 261930) !== 0 && (n & 42) !== 0 ? (t === vo ? hi++ : ((hi = 0), (vo = t))) : (hi = 0),
        vi(0));
    }
  }
  function Cm(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Jn(e)));
  }
  function Yc() {
    return (Em(), zm(), Mm(), wm());
  }
  function wm() {
    if (kt !== 5) return !1;
    var t = Qa,
      e = mo;
    mo = 0;
    var a = Rs(xa),
      l = w.T,
      n = G.p;
    try {
      ((G.p = 32 > a ? 32 : a), (w.T = null), (a = ho), (ho = null));
      var i = Qa,
        f = xa;
      if (((kt = 0), (gn = Qa = null), (xa = 0), (gt & 6) !== 0)) throw Error(o(331));
      var v = gt;
      if (
        ((gt |= 4),
        dm(i.current),
        om(i, i.current, f, a),
        (gt = v),
        vi(0, !1),
        Se && typeof Se.onPostCommitFiberRoot == 'function')
      )
        try {
          Se.onPostCommitFiberRoot(Dn, i);
        } catch {}
      return !0;
    } finally {
      ((G.p = n), (w.T = l), Cm(t, e));
    }
  }
  function Om(t, e, a) {
    ((e = Be(a, e)),
      (e = Xu(t.stateNode, e, 2)),
      (t = Ga(t, e, 2)),
      t !== null && (Bn(t, 2), la(t)));
  }
  function St(t, e, a) {
    if (t.tag === 3) Om(t, t, a);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Om(e, t, a);
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof l.componentDidCatch == 'function' && (Xa === null || !Xa.has(l)))
          ) {
            ((t = Be(a, t)),
              (a = Dd(2)),
              (l = Ga(e, a, 2)),
              l !== null && (Rd(a, l, e, t), Bn(l, 2), la(l)));
            break;
          }
        }
        e = e.return;
      }
  }
  function _o(t, e, a) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new iv();
      var n = new Set();
      l.set(e, n);
    } else ((n = l.get(e)), n === void 0 && ((n = new Set()), l.set(e, n)));
    n.has(a) || ((oo = !0), n.add(a), (t = rv.bind(null, t, e, a)), e.then(t, t));
  }
  function rv(t, e, a) {
    var l = t.pingCache;
    (l !== null && l.delete(e),
      (t.pingedLanes |= t.suspendedLanes & a),
      (t.warmLanes &= ~a),
      Nt === t &&
        (ut & a) === a &&
        (Dt === 4 || (Dt === 3 && (ut & 62914560) === ut && 300 > be() - Hc)
          ? (gt & 2) === 0 && yn(t, 0)
          : (ro |= a),
        vn === ut && (vn = 0)),
      la(t));
  }
  function Dm(t, e) {
    (e === 0 && (e = Nr()), (t = vl(t, e)), t !== null && (Bn(t, e), la(t)));
  }
  function fv(t) {
    var e = t.memoizedState,
      a = 0;
    (e !== null && (a = e.retryLane), Dm(t, a));
  }
  function dv(t, e) {
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
    (l !== null && l.delete(e), Dm(t, a));
  }
  function mv(t, e) {
    return Cs(t, e);
  }
  var kc = null,
    pn = null,
    po = !1,
    Zc = !1,
    bo = !1,
    Ja = 0;
  function la(t) {
    (t !== pn && t.next === null && (pn === null ? (kc = pn = t) : (pn = pn.next = t)),
      (Zc = !0),
      po || ((po = !0), vv()));
  }
  function vi(t, e) {
    if (!bo && Zc) {
      bo = !0;
      do
        for (var a = !1, l = kc; l !== null; ) {
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
            i !== 0 && ((a = !0), Hm(l, i));
          } else
            ((i = ut),
              (i = Ji(
                l,
                l === Nt ? i : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1
              )),
              (i & 3) === 0 || Rn(l, i) || ((a = !0), Hm(l, i)));
          l = l.next;
        }
      while (a);
      bo = !1;
    }
  }
  function hv() {
    Rm();
  }
  function Rm() {
    Zc = po = !1;
    var t = 0;
    Ja !== 0 && Av() && (t = Ja);
    for (var e = be(), a = null, l = kc; l !== null; ) {
      var n = l.next,
        i = Bm(l, e);
      (i === 0
        ? ((l.next = null), a === null ? (kc = n) : (a.next = n), n === null && (pn = a))
        : ((a = l), (t !== 0 || (i & 3) !== 0) && (Zc = !0)),
        (l = n));
    }
    ((kt !== 0 && kt !== 5) || vi(t), Ja !== 0 && (Ja = 0));
  }
  function Bm(t, e) {
    for (
      var a = t.suspendedLanes,
        l = t.pingedLanes,
        n = t.expirationTimes,
        i = t.pendingLanes & -62914561;
      0 < i;
    ) {
      var f = 31 - xe(i),
        v = 1 << f,
        p = n[f];
      (p === -1
        ? ((v & a) === 0 || (v & l) !== 0) && (n[f] = V0(v, e))
        : p <= e && (t.expiredLanes |= v),
        (i &= ~v));
    }
    if (
      ((e = Nt),
      (a = ut),
      (a = Ji(t, t === e ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (l = t.callbackNode),
      a === 0 || (t === e && (bt === 2 || bt === 9)) || t.cancelPendingCommit !== null)
    )
      return (l !== null && l !== null && ws(l), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((a & 3) === 0 || Rn(t, a)) {
      if (((e = a & -a), e === t.callbackPriority)) return e;
      switch ((l !== null && ws(l), Rs(a))) {
        case 2:
        case 8:
          a = Tr;
          break;
        case 32:
          a = Zi;
          break;
        case 268435456:
          a = Ar;
          break;
        default:
          a = Zi;
      }
      return (
        (l = Lm.bind(null, t)),
        (a = Cs(a, l)),
        (t.callbackPriority = e),
        (t.callbackNode = a),
        e
      );
    }
    return (
      l !== null && l !== null && ws(l),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Lm(t, e) {
    if (kt !== 0 && kt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var a = t.callbackNode;
    if (Yc() && t.callbackNode !== a) return null;
    var l = ut;
    return (
      (l = Ji(t, t === Nt ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      l === 0
        ? null
        : (ym(t, l, e),
          Bm(t, be()),
          t.callbackNode != null && t.callbackNode === a ? Lm.bind(null, t) : null)
    );
  }
  function Hm(t, e) {
    if (Yc()) return null;
    ym(t, e, !0);
  }
  function vv() {
    Ev(function () {
      (gt & 6) !== 0 ? Cs(jr, hv) : Rm();
    });
  }
  function So() {
    if (Ja === 0) {
      var t = ln;
      (t === 0 && ((t = Xi), (Xi <<= 1), (Xi & 261888) === 0 && (Xi = 256)), (Ja = t));
    }
    return Ja;
  }
  function qm(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : Pi('' + t);
  }
  function Um(t, e) {
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
  function gv(t, e, a, l, n) {
    if (e === 'submit' && a && a.stateNode === n) {
      var i = qm((n[fe] || null).action),
        f = l.submitter;
      f &&
        ((e = (e = f[fe] || null) ? qm(e.formAction) : f.getAttribute('formAction')),
        e !== null && ((i = e), (f = null)));
      var v = new lc('action', 'action', null, l, n);
      t.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Ja !== 0) {
                  var p = f ? Um(n, f) : new FormData(n);
                  Gu(a, { pending: !0, data: p, method: n.method, action: i }, null, p);
                }
              } else
                typeof i == 'function' &&
                  (v.preventDefault(),
                  (p = f ? Um(n, f) : new FormData(n)),
                  Gu(a, { pending: !0, data: p, method: n.method, action: i }, i, p));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var xo = 0; xo < lu.length; xo++) {
    var jo = lu[xo],
      yv = jo.toLowerCase(),
      _v = jo[0].toUpperCase() + jo.slice(1);
    Ze(yv, 'on' + _v);
  }
  (Ze(gf, 'onAnimationEnd'),
    Ze(yf, 'onAnimationIteration'),
    Ze(_f, 'onAnimationStart'),
    Ze('dblclick', 'onDoubleClick'),
    Ze('focusin', 'onFocus'),
    Ze('focusout', 'onBlur'),
    Ze(R1, 'onTransitionRun'),
    Ze(B1, 'onTransitionStart'),
    Ze(L1, 'onTransitionCancel'),
    Ze(pf, 'onTransitionEnd'),
    Yl('onMouseEnter', ['mouseout', 'mouseover']),
    Yl('onMouseLeave', ['mouseout', 'mouseover']),
    Yl('onPointerEnter', ['pointerout', 'pointerover']),
    Yl('onPointerLeave', ['pointerout', 'pointerover']),
    fl('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    fl(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    fl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    fl('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    fl(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    fl(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var gi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    pv = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(gi)
    );
  function Gm(t, e) {
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
              p = v.instance,
              N = v.currentTarget;
            if (((v = v.listener), p !== i && n.isPropagationStopped())) break t;
            ((i = v), (n.currentTarget = N));
            try {
              i(n);
            } catch (C) {
              cc(C);
            }
            ((n.currentTarget = null), (i = p));
          }
        else
          for (f = 0; f < l.length; f++) {
            if (
              ((v = l[f]),
              (p = v.instance),
              (N = v.currentTarget),
              (v = v.listener),
              p !== i && n.isPropagationStopped())
            )
              break t;
            ((i = v), (n.currentTarget = N));
            try {
              i(n);
            } catch (C) {
              cc(C);
            }
            ((n.currentTarget = null), (i = p));
          }
      }
    }
  }
  function ct(t, e) {
    var a = e[Bs];
    a === void 0 && (a = e[Bs] = new Set());
    var l = t + '__bubble';
    a.has(l) || (Vm(e, t, 2, !1), a.add(l));
  }
  function To(t, e, a) {
    var l = 0;
    (e && (l |= 4), Vm(a, t, l, e));
  }
  var Xc = '_reactListening' + Math.random().toString(36).slice(2);
  function Ao(t) {
    if (!t[Xc]) {
      ((t[Xc] = !0),
        Dr.forEach(function (a) {
          a !== 'selectionchange' && (pv.has(a) || To(a, !1, t), To(a, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Xc] || ((e[Xc] = !0), To('selectionchange', !1, e));
    }
  }
  function Vm(t, e, a, l) {
    switch (gh(e)) {
      case 2:
        var n = Qv;
        break;
      case 8:
        n = Kv;
        break;
      default:
        n = Go;
    }
    ((a = n.bind(null, e, a, t)),
      (n = void 0),
      !ks || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (n = !0),
      l
        ? n !== void 0
          ? t.addEventListener(e, a, { capture: !0, passive: n })
          : t.addEventListener(e, a, !0)
        : n !== void 0
          ? t.addEventListener(e, a, { passive: n })
          : t.addEventListener(e, a, !1));
  }
  function No(t, e, a, l, n) {
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
              var p = f.tag;
              if ((p === 3 || p === 4) && f.stateNode.containerInfo === n) return;
              f = f.return;
            }
          for (; v !== null; ) {
            if (((f = Gl(v)), f === null)) return;
            if (((p = f.tag), p === 5 || p === 6 || p === 26 || p === 27)) {
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
        C = $s(a),
        B = [];
      t: {
        var z = bf.get(t);
        if (z !== void 0) {
          var M = lc,
            Y = t;
          switch (t) {
            case 'keypress':
              if (ec(a) === 0) break t;
            case 'keydown':
            case 'keyup':
              M = d1;
              break;
            case 'focusin':
              ((Y = 'focus'), (M = Ks));
              break;
            case 'focusout':
              ((Y = 'blur'), (M = Ks));
              break;
            case 'beforeblur':
            case 'afterblur':
              M = Ks;
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
              M = Kr;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              M = t1;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              M = v1;
              break;
            case gf:
            case yf:
            case _f:
              M = l1;
              break;
            case pf:
              M = y1;
              break;
            case 'scroll':
            case 'scrollend':
              M = I0;
              break;
            case 'wheel':
              M = p1;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              M = i1;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              M = Wr;
              break;
            case 'toggle':
            case 'beforetoggle':
              M = S1;
          }
          var J = (e & 4) !== 0,
            Tt = !J && (t === 'scroll' || t === 'scrollend'),
            T = J ? (z !== null ? z + 'Capture' : null) : z;
          J = [];
          for (var S = N, A; S !== null; ) {
            var D = S;
            if (
              ((A = D.stateNode),
              (D = D.tag),
              (D !== 5 && D !== 26 && D !== 27) ||
                A === null ||
                T === null ||
                ((D = qn(S, T)), D != null && J.push(yi(S, D, A))),
              Tt)
            )
              break;
            S = S.return;
          }
          0 < J.length && ((z = new M(z, Y, null, a, C)), B.push({ event: z, listeners: J }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((z = t === 'mouseover' || t === 'pointerover'),
            (M = t === 'mouseout' || t === 'pointerout'),
            z && a !== Vs && (Y = a.relatedTarget || a.fromElement) && (Gl(Y) || Y[Ul]))
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
                (Y = Y ? Gl(Y) : null),
                Y !== null &&
                  ((Tt = d(Y)), (J = Y.tag), Y !== Tt || (J !== 5 && J !== 27 && J !== 6)) &&
                  (Y = null))
              : ((M = null), (Y = N)),
            M !== Y)
          ) {
            if (
              ((J = Kr),
              (D = 'onMouseLeave'),
              (T = 'onMouseEnter'),
              (S = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((J = Wr), (D = 'onPointerLeave'), (T = 'onPointerEnter'), (S = 'pointer')),
              (Tt = M == null ? z : Hn(M)),
              (A = Y == null ? z : Hn(Y)),
              (z = new J(D, S + 'leave', M, a, C)),
              (z.target = Tt),
              (z.relatedTarget = A),
              (D = null),
              Gl(C) === N &&
                ((J = new J(T, S + 'enter', Y, a, C)),
                (J.target = A),
                (J.relatedTarget = Tt),
                (D = J)),
              (Tt = D),
              M && Y)
            )
              e: {
                for (J = bv, T = M, S = Y, A = 0, D = T; D; D = J(D)) A++;
                D = 0;
                for (var K = S; K; K = J(K)) D++;
                for (; 0 < A - D; ) ((T = J(T)), A--);
                for (; 0 < D - A; ) ((S = J(S)), D--);
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
            (M !== null && $m(B, z, M, J, !1), Y !== null && Tt !== null && $m(B, Tt, Y, J, !0));
          }
        }
        t: {
          if (
            ((z = N ? Hn(N) : window),
            (M = z.nodeName && z.nodeName.toLowerCase()),
            M === 'select' || (M === 'input' && z.type === 'file'))
          )
            var ht = nf;
          else if (af(z))
            if (cf) ht = w1;
            else {
              ht = M1;
              var Z = z1;
            }
          else
            ((M = z.nodeName),
              !M || M.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? N && Gs(N.elementType) && (ht = nf)
                : (ht = C1));
          if (ht && (ht = ht(t, N))) {
            lf(B, ht, a, C);
            break t;
          }
          (Z && Z(t, z, N),
            t === 'focusout' &&
              N &&
              z.type === 'number' &&
              N.memoizedProps.value != null &&
              Us(z, 'number', z.value));
        }
        switch (((Z = N ? Hn(N) : window), t)) {
          case 'focusin':
            (af(Z) || Z.contentEditable === 'true') && ((Jl = Z), (tu = N), (Xn = null));
            break;
          case 'focusout':
            Xn = tu = Jl = null;
            break;
          case 'mousedown':
            eu = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((eu = !1), hf(B, a, C));
            break;
          case 'selectionchange':
            if (D1) break;
          case 'keydown':
          case 'keyup':
            hf(B, a, C);
        }
        var at;
        if (Ws)
          t: {
            switch (t) {
              case 'compositionstart':
                var ot = 'onCompositionStart';
                break t;
              case 'compositionend':
                ot = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                ot = 'onCompositionUpdate';
                break t;
            }
            ot = void 0;
          }
        else
          Kl
            ? tf(t, a) && (ot = 'onCompositionEnd')
            : t === 'keydown' && a.keyCode === 229 && (ot = 'onCompositionStart');
        (ot &&
          (Fr &&
            a.locale !== 'ko' &&
            (Kl || ot !== 'onCompositionStart'
              ? ot === 'onCompositionEnd' && Kl && (at = Xr())
              : ((Da = C), (Zs = 'value' in Da ? Da.value : Da.textContent), (Kl = !0))),
          (Z = Qc(N, ot)),
          0 < Z.length &&
            ((ot = new Jr(ot, t, null, a, C)),
            B.push({ event: ot, listeners: Z }),
            at ? (ot.data = at) : ((at = ef(a)), at !== null && (ot.data = at)))),
          (at = j1 ? T1(t, a) : A1(t, a)) &&
            ((ot = Qc(N, 'onBeforeInput')),
            0 < ot.length &&
              ((Z = new Jr('onBeforeInput', 'beforeinput', null, a, C)),
              B.push({ event: Z, listeners: ot }),
              (Z.data = at))),
          gv(B, t, N, a, C));
      }
      Gm(B, e);
    });
  }
  function yi(t, e, a) {
    return { instance: t, listener: e, currentTarget: a };
  }
  function Qc(t, e) {
    for (var a = e + 'Capture', l = []; t !== null; ) {
      var n = t,
        i = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          i === null ||
          ((n = qn(t, a)),
          n != null && l.unshift(yi(t, n, i)),
          (n = qn(t, e)),
          n != null && l.push(yi(t, n, i))),
        t.tag === 3)
      )
        return l;
      t = t.return;
    }
    return [];
  }
  function bv(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function $m(t, e, a, l, n) {
    for (var i = e._reactName, f = []; a !== null && a !== l; ) {
      var v = a,
        p = v.alternate,
        N = v.stateNode;
      if (((v = v.tag), p !== null && p === l)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        N === null ||
        ((p = N),
        n
          ? ((N = qn(a, i)), N != null && f.unshift(yi(a, N, p)))
          : n || ((N = qn(a, i)), N != null && f.push(yi(a, N, p)))),
        (a = a.return));
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var Sv = /\r\n?/g,
    xv = /\u0000|\uFFFD/g;
  function Ym(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        Sv,
        `
`
      )
      .replace(xv, '');
  }
  function km(t, e) {
    return ((e = Ym(e)), Ym(t) === e);
  }
  function jt(t, e, a, l, n, i) {
    switch (a) {
      case 'children':
        typeof l == 'string'
          ? e === 'body' || (e === 'textarea' && l === '') || Zl(t, l)
          : (typeof l == 'number' || typeof l == 'bigint') && e !== 'body' && Zl(t, '' + l);
        break;
      case 'className':
        Fi(t, 'class', l);
        break;
      case 'tabIndex':
        Fi(t, 'tabindex', l);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Fi(t, a, l);
        break;
      case 'style':
        Yr(t, l, i);
        break;
      case 'data':
        if (e !== 'object') {
          Fi(t, 'data', l);
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
        ((l = Pi('' + l)), t.setAttribute(a, l));
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
        ((l = Pi('' + l)), t.setAttribute(a, l));
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
        ((a = Pi('' + l)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (ct('beforetoggle', t), ct('toggle', t), Wi(t, 'popover', l));
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
        Wi(t, 'is', l);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = W0.get(a) || a), Wi(t, a, l));
    }
  }
  function Eo(t, e, a, l, n, i) {
    switch (a) {
      case 'style':
        Yr(t, l, i);
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
            a in t ? (t[a] = l) : l === !0 ? t.setAttribute(a, '') : Wi(t, a, l);
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
          p = null,
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
                  p = C;
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
        Ur(t, i, v, p, N, f, n, !1);
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
          e != null ? kl(t, !!l, e, !1) : a != null && kl(t, !!l, a, !0));
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
        Vr(t, l, n, i);
        return;
      case 'option':
        for (p in a)
          if (a.hasOwnProperty(p) && ((l = a[p]), l != null))
            switch (p) {
              case 'selected':
                t.selected = l && typeof l != 'function' && typeof l != 'symbol';
                break;
              default:
                jt(t, e, p, l, a, null);
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
        for (l = 0; l < gi.length; l++) ct(gi[l], t);
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
        if (Gs(e)) {
          for (C in a)
            a.hasOwnProperty(C) && ((l = a[C]), l !== void 0 && Eo(t, e, C, l, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((l = a[v]), l != null && jt(t, e, v, l, a, null));
  }
  function jv(t, e, a, l) {
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
          p = null,
          N = null,
          C = null;
        for (M in a) {
          var B = a[M];
          if (a.hasOwnProperty(M) && B != null)
            switch (M) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                p = B;
              default:
                l.hasOwnProperty(M) || jt(t, e, M, null, l, B);
            }
        }
        for (var z in l) {
          var M = l[z];
          if (((B = a[z]), l.hasOwnProperty(z) && (M != null || B != null)))
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
                M !== B && jt(t, e, z, M, l, B);
            }
        }
        qs(t, f, v, p, N, C, i, n);
        return;
      case 'select':
        M = f = v = z = null;
        for (i in a)
          if (((p = a[i]), a.hasOwnProperty(i) && p != null))
            switch (i) {
              case 'value':
                break;
              case 'multiple':
                M = p;
              default:
                l.hasOwnProperty(i) || jt(t, e, i, null, l, p);
            }
        for (n in l)
          if (((i = l[n]), (p = a[n]), l.hasOwnProperty(n) && (i != null || p != null)))
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
                i !== p && jt(t, e, n, i, l, p);
            }
        ((e = v),
          (a = f),
          (l = M),
          z != null
            ? kl(t, !!a, z, !1)
            : !!l != !!a && (e != null ? kl(t, !!a, e, !0) : kl(t, !!a, a ? [] : '', !1)));
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
        Gr(t, z, M);
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
        for (p in l)
          if (((z = l[p]), (M = a[p]), l.hasOwnProperty(p) && z !== M && (z != null || M != null)))
            switch (p) {
              case 'selected':
                t.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                jt(t, e, p, z, l, M);
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
        if (Gs(e)) {
          for (var Tt in a)
            ((z = a[Tt]),
              a.hasOwnProperty(Tt) &&
                z !== void 0 &&
                !l.hasOwnProperty(Tt) &&
                Eo(t, e, Tt, void 0, l, z));
          for (C in l)
            ((z = l[C]),
              (M = a[C]),
              !l.hasOwnProperty(C) ||
                z === M ||
                (z === void 0 && M === void 0) ||
                Eo(t, e, C, z, l, M));
          return;
        }
    }
    for (var T in a)
      ((z = a[T]),
        a.hasOwnProperty(T) && z != null && !l.hasOwnProperty(T) && jt(t, e, T, null, l, z));
    for (B in l)
      ((z = l[B]),
        (M = a[B]),
        !l.hasOwnProperty(B) || z === M || (z == null && M == null) || jt(t, e, B, z, l, M));
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
  function Tv() {
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
            var p = a[l],
              N = p.startTime;
            if (N > v) break;
            var C = p.transferSize,
              B = p.initiatorType;
            C && Zm(B) && ((p = p.responseEnd), (f += C * (p < v ? 1 : (v - N) / (p - N))));
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
  var zo = null,
    Mo = null;
  function Kc(t) {
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
  function Qm(t, e) {
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
  function Co(t, e) {
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
  var wo = null;
  function Av() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === wo ? !1 : ((wo = t), !0)) : ((wo = null), !1);
  }
  var Km = typeof setTimeout == 'function' ? setTimeout : void 0,
    Nv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Jm = typeof Promise == 'function' ? Promise : void 0,
    Ev =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Jm < 'u'
          ? function (t) {
              return Jm.resolve(null).then(t).catch(zv);
            }
          : Km;
  function zv(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Wa(t) {
    return t === 'head';
  }
  function Wm(t, e) {
    var a = e,
      l = 0;
    do {
      var n = a.nextSibling;
      if ((t.removeChild(a), n && n.nodeType === 8))
        if (((a = n.data), a === '/$' || a === '/&')) {
          if (l === 0) {
            (t.removeChild(n), jn(e));
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
            (i[Ln] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(i),
              (i = f));
          }
        } else a === 'body' && _i(t.ownerDocument.body);
      a = n;
    } while (a);
    jn(e);
  }
  function Fm(t, e) {
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
  function Oo(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var a = e;
      switch (((e = e.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Oo(a), Ls(a));
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
  function Mv(t, e, a, l) {
    for (; t.nodeType === 1; ) {
      var n = a;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!l && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (l) {
        if (!t[Ln])
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
  function Cv(t, e, a) {
    if (e === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !a) ||
        ((t = Ge(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Im(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = Ge(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Do(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function Ro(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function wv(t, e) {
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
  var Bo = null;
  function Pm(t) {
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
  function th(t) {
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
  function eh(t, e, a) {
    switch (((e = Kc(a)), t)) {
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
    Ls(t);
  }
  var Ve = new Map(),
    ah = new Set();
  function Jc(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var ja = G.d;
  G.d = { f: Ov, r: Dv, D: Rv, C: Bv, L: Lv, m: Hv, X: Uv, S: qv, M: Gv };
  function Ov() {
    var t = ja.f(),
      e = Gc();
    return t || e;
  }
  function Dv(t) {
    var e = Vl(t);
    e !== null && e.tag === 5 && e.type === 'form' ? pd(e) : ja.r(t);
  }
  var bn = typeof document > 'u' ? null : document;
  function lh(t, e, a) {
    var l = bn;
    if (l && typeof e == 'string' && e) {
      var n = De(e);
      ((n = 'link[rel="' + t + '"][href="' + n + '"]'),
        typeof a == 'string' && (n += '[crossorigin="' + a + '"]'),
        ah.has(n) ||
          (ah.add(n),
          (t = { rel: t, crossOrigin: a, href: e }),
          l.querySelector(n) === null &&
            ((e = l.createElement('link')), ee(e, 'link', t), Qt(e), l.head.appendChild(e))));
    }
  }
  function Rv(t) {
    (ja.D(t), lh('dns-prefetch', t, null));
  }
  function Bv(t, e) {
    (ja.C(t, e), lh('preconnect', t, e));
  }
  function Lv(t, e, a) {
    ja.L(t, e, a);
    var l = bn;
    if (l && t && e) {
      var n = 'link[rel="preload"][as="' + De(e) + '"]';
      e === 'image' && a && a.imageSrcSet
        ? ((n += '[imagesrcset="' + De(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (n += '[imagesizes="' + De(a.imageSizes) + '"]'))
        : (n += '[href="' + De(t) + '"]');
      var i = n;
      switch (e) {
        case 'style':
          i = Sn(t);
          break;
        case 'script':
          i = xn(t);
      }
      Ve.has(i) ||
        ((t = E(
          { rel: 'preload', href: e === 'image' && a && a.imageSrcSet ? void 0 : t, as: e },
          a
        )),
        Ve.set(i, t),
        l.querySelector(n) !== null ||
          (e === 'style' && l.querySelector(pi(i))) ||
          (e === 'script' && l.querySelector(bi(i))) ||
          ((e = l.createElement('link')), ee(e, 'link', t), Qt(e), l.head.appendChild(e)));
    }
  }
  function Hv(t, e) {
    ja.m(t, e);
    var a = bn;
    if (a && t) {
      var l = e && typeof e.as == 'string' ? e.as : 'script',
        n = 'link[rel="modulepreload"][as="' + De(l) + '"][href="' + De(t) + '"]',
        i = n;
      switch (l) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          i = xn(t);
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
            if (a.querySelector(bi(i))) return;
        }
        ((l = a.createElement('link')), ee(l, 'link', t), Qt(l), a.head.appendChild(l));
      }
    }
  }
  function qv(t, e, a) {
    ja.S(t, e, a);
    var l = bn;
    if (l && t) {
      var n = $l(l).hoistableStyles,
        i = Sn(t);
      e = e || 'default';
      var f = n.get(i);
      if (!f) {
        var v = { loading: 0, preload: null };
        if ((f = l.querySelector(pi(i)))) v.loading = 5;
        else {
          ((t = E({ rel: 'stylesheet', href: t, 'data-precedence': e }, a)),
            (a = Ve.get(i)) && Lo(t, a));
          var p = (f = l.createElement('link'));
          (Qt(p),
            ee(p, 'link', t),
            (p._p = new Promise(function (N, C) {
              ((p.onload = N), (p.onerror = C));
            })),
            p.addEventListener('load', function () {
              v.loading |= 1;
            }),
            p.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            Wc(f, e, l));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: v }), n.set(i, f));
      }
    }
  }
  function Uv(t, e) {
    ja.X(t, e);
    var a = bn;
    if (a && t) {
      var l = $l(a).hoistableScripts,
        n = xn(t),
        i = l.get(n);
      i ||
        ((i = a.querySelector(bi(n))),
        i ||
          ((t = E({ src: t, async: !0 }, e)),
          (e = Ve.get(n)) && Ho(t, e),
          (i = a.createElement('script')),
          Qt(i),
          ee(i, 'link', t),
          a.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        l.set(n, i));
    }
  }
  function Gv(t, e) {
    ja.M(t, e);
    var a = bn;
    if (a && t) {
      var l = $l(a).hoistableScripts,
        n = xn(t),
        i = l.get(n);
      i ||
        ((i = a.querySelector(bi(n))),
        i ||
          ((t = E({ src: t, async: !0, type: 'module' }, e)),
          (e = Ve.get(n)) && Ho(t, e),
          (i = a.createElement('script')),
          Qt(i),
          ee(i, 'link', t),
          a.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        l.set(n, i));
    }
  }
  function nh(t, e, a, l) {
    var n = (n = nt.current) ? Jc(n) : null;
    if (!n) throw Error(o(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((e = Sn(a.href)),
            (a = $l(n).hoistableStyles),
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
          t = Sn(a.href);
          var i = $l(n).hoistableStyles,
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
                i || Vv(n, t, a, f.state))),
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
            ? ((e = xn(a)),
              (a = $l(n).hoistableScripts),
              (l = a.get(e)),
              l || ((l = { type: 'script', instance: null, count: 0, state: null }), a.set(e, l)),
              l)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, t));
    }
  }
  function Sn(t) {
    return 'href="' + De(t) + '"';
  }
  function pi(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function ih(t) {
    return E({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function Vv(t, e, a, l) {
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
  function xn(t) {
    return '[src="' + De(t) + '"]';
  }
  function bi(t) {
    return 'script[async]' + t;
  }
  function ch(t, e, a) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var l = t.querySelector('style[data-href~="' + De(a.href) + '"]');
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
            Wc(l, a.precedence, t),
            (e.instance = l)
          );
        case 'stylesheet':
          n = Sn(a.href);
          var i = t.querySelector(pi(n));
          if (i) return ((e.state.loading |= 4), (e.instance = i), Qt(i), i);
          ((l = ih(a)),
            (n = Ve.get(n)) && Lo(l, n),
            (i = (t.ownerDocument || t).createElement('link')),
            Qt(i));
          var f = i;
          return (
            (f._p = new Promise(function (v, p) {
              ((f.onload = v), (f.onerror = p));
            })),
            ee(i, 'link', l),
            (e.state.loading |= 4),
            Wc(i, a.precedence, t),
            (e.instance = i)
          );
        case 'script':
          return (
            (i = xn(a.src)),
            (n = t.querySelector(bi(i)))
              ? ((e.instance = n), Qt(n), n)
              : ((l = a),
                (n = Ve.get(i)) && ((l = E({}, a)), Ho(l, n)),
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
        ((l = e.instance), (e.state.loading |= 4), Wc(l, a.precedence, t));
    return e.instance;
  }
  function Wc(t, e, a) {
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
  function Lo(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function Ho(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Fc = null;
  function sh(t, e, a) {
    if (Fc === null) {
      var l = new Map(),
        n = (Fc = new Map());
      n.set(a, l);
    } else ((n = Fc), (l = n.get(a)), l || ((l = new Map()), n.set(a, l)));
    if (l.has(t)) return l;
    for (l.set(t, null), a = a.getElementsByTagName(t), n = 0; n < a.length; n++) {
      var i = a[n];
      if (
        !(i[Ln] || i[Ft] || (t === 'link' && i.getAttribute('rel') === 'stylesheet')) &&
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
  function uh(t, e, a) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(a, e === 'title' ? t.querySelector('head > title') : null));
  }
  function $v(t, e, a) {
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
  function oh(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function Yv(t, e, a, l) {
    if (
      a.type === 'stylesheet' &&
      (typeof l.media != 'string' || matchMedia(l.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var n = Sn(l.href),
          i = e.querySelector(pi(n));
        if (i) {
          ((e = i._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = Ic.bind(t)), e.then(t, t)),
            (a.state.loading |= 4),
            (a.instance = i),
            Qt(i));
          return;
        }
        ((i = e.ownerDocument || e),
          (l = ih(l)),
          (n = Ve.get(n)) && Lo(l, n),
          (i = i.createElement('link')),
          Qt(i));
        var f = i;
        ((f._p = new Promise(function (v, p) {
          ((f.onload = v), (f.onerror = p));
        })),
          ee(i, 'link', l),
          (a.instance = i));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(a, e),
        (e = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (t.count++,
          (a = Ic.bind(t)),
          e.addEventListener('load', a),
          e.addEventListener('error', a)));
    }
  }
  var qo = 0;
  function kv(t, e) {
    return (
      t.stylesheets && t.count === 0 && ts(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (a) {
            var l = setTimeout(function () {
              if ((t.stylesheets && ts(t, t.stylesheets), t.unsuspend)) {
                var i = t.unsuspend;
                ((t.unsuspend = null), i());
              }
            }, 6e4 + e);
            0 < t.imgBytes && qo === 0 && (qo = 62500 * Tv());
            var n = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && ts(t, t.stylesheets), t.unsuspend))
                ) {
                  var i = t.unsuspend;
                  ((t.unsuspend = null), i());
                }
              },
              (t.imgBytes > qo ? 50 : 800) + e
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
  function Ic() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) ts(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Pc = null;
  function ts(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Pc = new Map()), e.forEach(Zv, t), (Pc = null), Ic.call(t)));
  }
  function Zv(t, e) {
    if (!(e.state.loading & 4)) {
      var a = Pc.get(t);
      if (a) var l = a.get(null);
      else {
        ((a = new Map()), Pc.set(t, a));
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
        (l = Ic.bind(this)),
        n.addEventListener('load', l),
        n.addEventListener('error', l),
        i
          ? i.parentNode.insertBefore(n, i.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(n, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var Si = {
    $$typeof: yt,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0,
  };
  function Xv(t, e, a, l, n, i, f, v, p) {
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
      (this.expirationTimes = Os(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Os(0)),
      (this.hiddenUpdates = Os(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = n),
      (this.onCaughtError = i),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = p),
      (this.incompleteTransitions = new Map()));
  }
  function rh(t, e, a, l, n, i, f, v, p, N, C, B) {
    return (
      (t = new Xv(t, e, a, f, p, N, C, B, v)),
      (e = 1),
      i === !0 && (e |= 24),
      (i = Te(3, null, null, e)),
      (t.current = i),
      (i.stateNode = t),
      (e = gu()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (i.memoizedState = { element: l, isDehydrated: a, cache: e }),
      bu(i),
      t
    );
  }
  function fh(t) {
    return t ? ((t = Il), t) : Il;
  }
  function dh(t, e, a, l, n, i) {
    ((n = fh(n)),
      l.context === null ? (l.context = n) : (l.pendingContext = n),
      (l = Ua(e)),
      (l.payload = { element: a }),
      (i = i === void 0 ? null : i),
      i !== null && (l.callback = i),
      (a = Ga(t, l, e)),
      a !== null && (ye(a, t, e), Pn(a, t, e)));
  }
  function mh(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function Uo(t, e) {
    (mh(t, e), (t = t.alternate) && mh(t, e));
  }
  function hh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = vl(t, 67108864);
      (e !== null && ye(e, t, 67108864), Uo(t, 67108864));
    }
  }
  function vh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Me();
      e = Ds(e);
      var a = vl(t, e);
      (a !== null && ye(a, t, e), Uo(t, e));
    }
  }
  var es = !0;
  function Qv(t, e, a, l) {
    var n = w.T;
    w.T = null;
    var i = G.p;
    try {
      ((G.p = 2), Go(t, e, a, l));
    } finally {
      ((G.p = i), (w.T = n));
    }
  }
  function Kv(t, e, a, l) {
    var n = w.T;
    w.T = null;
    var i = G.p;
    try {
      ((G.p = 8), Go(t, e, a, l));
    } finally {
      ((G.p = i), (w.T = n));
    }
  }
  function Go(t, e, a, l) {
    if (es) {
      var n = Vo(l);
      if (n === null) (No(t, e, l, as, a), yh(t, l));
      else if (Wv(n, t, e, a, l)) l.stopPropagation();
      else if ((yh(t, l), e & 4 && -1 < Jv.indexOf(t))) {
        for (; n !== null; ) {
          var i = Vl(n);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var f = rl(i.pendingLanes);
                  if (f !== 0) {
                    var v = i;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; f; ) {
                      var p = 1 << (31 - xe(f));
                      ((v.entanglements[1] |= p), (f &= ~p));
                    }
                    (la(i), (gt & 6) === 0 && ((qc = be() + 500), vi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = vl(i, 2)), v !== null && ye(v, i, 2), Gc(), Uo(i, 2));
            }
          if (((i = Vo(l)), i === null && No(t, e, l, as, a), i === n)) break;
          n = i;
        }
        n !== null && l.stopPropagation();
      } else No(t, e, l, null, a);
    }
  }
  function Vo(t) {
    return ((t = $s(t)), $o(t));
  }
  var as = null;
  function $o(t) {
    if (((as = null), (t = Gl(t)), t !== null)) {
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
    return ((as = t), null);
  }
  function gh(t) {
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
        switch (R0()) {
          case jr:
            return 2;
          case Tr:
            return 8;
          case Zi:
          case B0:
            return 32;
          case Ar:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Yo = !1,
    Fa = null,
    Ia = null,
    Pa = null,
    xi = new Map(),
    ji = new Map(),
    tl = [],
    Jv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function yh(t, e) {
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
        xi.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        ji.delete(e.pointerId);
    }
  }
  function Ti(t, e, a, l, n, i) {
    return t === null || t.nativeEvent !== i
      ? ((t = {
          blockedOn: e,
          domEventName: a,
          eventSystemFlags: l,
          nativeEvent: i,
          targetContainers: [n],
        }),
        e !== null && ((e = Vl(e)), e !== null && hh(e)),
        t)
      : ((t.eventSystemFlags |= l),
        (e = t.targetContainers),
        n !== null && e.indexOf(n) === -1 && e.push(n),
        t);
  }
  function Wv(t, e, a, l, n) {
    switch (e) {
      case 'focusin':
        return ((Fa = Ti(Fa, t, e, a, l, n)), !0);
      case 'dragenter':
        return ((Ia = Ti(Ia, t, e, a, l, n)), !0);
      case 'mouseover':
        return ((Pa = Ti(Pa, t, e, a, l, n)), !0);
      case 'pointerover':
        var i = n.pointerId;
        return (xi.set(i, Ti(xi.get(i) || null, t, e, a, l, n)), !0);
      case 'gotpointercapture':
        return ((i = n.pointerId), ji.set(i, Ti(ji.get(i) || null, t, e, a, l, n)), !0);
    }
    return !1;
  }
  function _h(t) {
    var e = Gl(t.target);
    if (e !== null) {
      var a = d(e);
      if (a !== null) {
        if (((e = a.tag), e === 13)) {
          if (((e = h(a)), e !== null)) {
            ((t.blockedOn = e),
              wr(t.priority, function () {
                vh(a);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = g(a)), e !== null)) {
            ((t.blockedOn = e),
              wr(t.priority, function () {
                vh(a);
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
  function ls(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = Vo(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var l = new a.constructor(a.type, a);
        ((Vs = l), a.target.dispatchEvent(l), (Vs = null));
      } else return ((e = Vl(a)), e !== null && hh(e), (t.blockedOn = a), !1);
      e.shift();
    }
    return !0;
  }
  function ph(t, e, a) {
    ls(t) && a.delete(e);
  }
  function Fv() {
    ((Yo = !1),
      Fa !== null && ls(Fa) && (Fa = null),
      Ia !== null && ls(Ia) && (Ia = null),
      Pa !== null && ls(Pa) && (Pa = null),
      xi.forEach(ph),
      ji.forEach(ph));
  }
  function ns(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      Yo || ((Yo = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, Fv)));
  }
  var is = null;
  function bh(t) {
    is !== t &&
      ((is = t),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        is === t && (is = null);
        for (var e = 0; e < t.length; e += 3) {
          var a = t[e],
            l = t[e + 1],
            n = t[e + 2];
          if (typeof l != 'function') {
            if ($o(l || a) === null) continue;
            break;
          }
          var i = Vl(a);
          i !== null &&
            (t.splice(e, 3),
            (e -= 3),
            Gu(i, { pending: !0, data: n, method: a.method, action: l }, l, n));
        }
      }));
  }
  function jn(t) {
    function e(p) {
      return ns(p, t);
    }
    (Fa !== null && ns(Fa, t),
      Ia !== null && ns(Ia, t),
      Pa !== null && ns(Pa, t),
      xi.forEach(e),
      ji.forEach(e));
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
        if (typeof i == 'function') f || bh(a);
        else if (f) {
          var v = null;
          if (i && i.hasAttribute('formAction')) {
            if (((n = i), (f = i[fe] || null))) v = f.formAction;
            else if ($o(n) !== null) continue;
          } else v = f.action;
          (typeof v == 'function' ? (a[l + 1] = v) : (a.splice(l, 3), (l -= 3)), bh(a));
        }
      }
  }
  function Sh() {
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
  function ko(t) {
    this._internalRoot = t;
  }
  ((cs.prototype.render = ko.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(o(409));
      var a = e.current,
        l = Me();
      dh(a, l, t, e, null, null);
    }),
    (cs.prototype.unmount = ko.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (dh(t.current, 2, null, t, null, null), Gc(), (e[Ul] = null));
        }
      }));
  function cs(t) {
    this._internalRoot = t;
  }
  cs.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = Cr();
      t = { blockedOn: null, target: t, priority: e };
      for (var a = 0; a < tl.length && e !== 0 && e < tl[a].priority; a++);
      (tl.splice(a, 0, t), a === 0 && _h(t));
    }
  };
  var xh = s.version;
  if (xh !== '19.2.5') throw Error(o(527, xh, '19.2.5'));
  G.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(o(188))
        : ((t = Object.keys(t).join(',')), Error(o(268, t)));
    return ((t = _(e)), (t = t !== null ? b(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Iv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: w,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var ss = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ss.isDisabled && ss.supportsFiber)
      try {
        ((Dn = ss.inject(Iv)), (Se = ss));
      } catch {}
  }
  return (
    (Ni.createRoot = function (t, e) {
      if (!m(t)) throw Error(o(299));
      var a = !1,
        l = '',
        n = Md,
        i = Cd,
        f = wd;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (l = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
          e.onCaughtError !== void 0 && (i = e.onCaughtError),
          e.onRecoverableError !== void 0 && (f = e.onRecoverableError)),
        (e = rh(t, 1, !1, null, null, a, l, null, n, i, f, Sh)),
        (t[Ul] = e.current),
        Ao(t),
        new ko(e)
      );
    }),
    (Ni.hydrateRoot = function (t, e, a) {
      if (!m(t)) throw Error(o(299));
      var l = !1,
        n = '',
        i = Md,
        f = Cd,
        v = wd,
        p = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (l = !0),
          a.identifierPrefix !== void 0 && (n = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (i = a.onUncaughtError),
          a.onCaughtError !== void 0 && (f = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (p = a.formState)),
        (e = rh(t, 1, !0, e, a ?? null, l, n, p, i, f, v, Sh)),
        (e.context = fh(null)),
        (a = e.current),
        (l = Me()),
        (l = Ds(l)),
        (n = Ua(l)),
        (n.callback = null),
        Ga(a, n, l),
        (a = l),
        (e.current.lanes = a),
        Bn(e, a),
        la(e),
        (t[Ul] = e.current),
        Ao(t),
        new cs(e)
      );
    }),
    (Ni.version = '19.2.5'),
    Ni
  );
}
var Oh;
function fg() {
  if (Oh) return Xo.exports;
  Oh = 1;
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
  return (c(), (Xo.exports = rg()), Xo.exports);
}
var dg = fg(),
  dt = dr();
const us = ag(dt),
  mg = '_content_11wqi_1',
  hg = { content: mg },
  vg = '_tabBar_rhd8d_2',
  gg = '_fullWidth_rhd8d_9',
  yg = '_tab_rhd8d_2',
  _g = '_tabActive_rhd8d_54',
  pg = '_tabDisabled_rhd8d_101',
  bg = '_tabIcon_rhd8d_107',
  Sg = '_tabLabel_rhd8d_114',
  xg = '_badge_rhd8d_119',
  jg = '_badgeActive_rhd8d_137',
  Tg = '_indicator_rhd8d_158',
  Ce = {
    tabBar: vg,
    fullWidth: gg,
    tab: yg,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: _g,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: pg,
    tabIcon: bg,
    tabLabel: Sg,
    badge: xg,
    badgeActive: jg,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Tg,
  },
  Ag = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Ng = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Eg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  zg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Mg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Cg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  wg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Og = { screw: Cg, bolt: Ng, alloy: Ag, laser: Mg, cannon: Eg, thunder: wg, cutter: zg };
function Dg(c, s) {
  return c.replace(/\swidth="\d+"/, ` width="${s}"`).replace(/\sheight="\d+"/, ` height="${s}"`);
}
function Mt({ name: c, size: s = 16, color: u = 'currentColor', className: o }) {
  const m = Og[c];
  if (m)
    return r.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: u, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: Dg(m, s) },
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
function Ss({
  tabs: c,
  value: s,
  onChange: u,
  variant: o = 'underline',
  size: m = 'md',
  fullWidth: d = !1,
  align: h = 'start',
}) {
  const g = dt.useRef(null),
    [y, _] = dt.useState({ left: 0, width: 0 });
  return (
    dt.useEffect(() => {
      const b = g.current;
      if (!b) return;
      const E = c.findIndex((U) => U.key === s);
      if (E < 0) return;
      const H = b.querySelectorAll('[role="tab"]')[E];
      if (!H) return;
      const R = b.getBoundingClientRect(),
        V = H.getBoundingClientRect();
      _({ left: V.left - R.left, width: V.width });
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
                    children: r.jsx(Mt, { name: b.iconName, size: m === 'sm' ? 12 : 14 }),
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
            style: { transform: `translateX(${y.left}px)`, width: y.width },
          }),
      ],
    })
  );
}
const Rg = '_shell_gbfld_2',
  Bg = '_header_gbfld_15',
  Lg = '_main_gbfld_28',
  Hg = '_noScroll_gbfld_37',
  qg = '_footer_gbfld_42',
  Ug = '_battle_gbfld_55',
  Tn = { shell: Rg, header: Bg, main: Lg, noScroll: Hg, footer: qg, battle: Ug };
function Bl({ header: c, footer: s, children: u, noScroll: o = !1, variant: m = 'default' }) {
  return r.jsxs('div', {
    className: [Tn.shell, m === 'battle' ? Tn.battle : ''].filter(Boolean).join(' '),
    children: [
      c != null && r.jsx('header', { className: Tn.header, children: c }),
      r.jsx('main', {
        className: [Tn.main, o ? Tn.noScroll : ''].filter(Boolean).join(' '),
        children: u,
      }),
      s != null && r.jsx('footer', { className: Tn.footer, children: s }),
    ],
  });
}
const Gg = '_nav_4erx0_2',
  Vg = '_tab_4erx0_10',
  $g = '_active_4erx0_33',
  Yg = '_iconWrap_4erx0_38',
  kg = '_badge_4erx0_51',
  Ei = { nav: Gg, tab: Vg, active: $g, iconWrap: Yg, badge: kg },
  Zg = '_text_1wy1n_1',
  Xg = '_variant_heading_1_1wy1n_6',
  Qg = '_variant_heading_2_1wy1n_15',
  Kg = '_variant_heading_3_1wy1n_24',
  Jg = '_variant_body_1wy1n_33',
  Wg = '_variant_caption_1wy1n_41',
  Fg = '_variant_label_1wy1n_49',
  Ig = '_variant_numeric_l_1wy1n_58',
  Pg = '_variant_numeric_m_1wy1n_67',
  ty = '_variant_numeric_s_1wy1n_76',
  ey = '_color_default_1wy1n_85',
  ay = '_color_mid_1wy1n_89',
  ly = '_color_dim_1wy1n_93',
  ny = '_color_disabled_1wy1n_97',
  iy = '_color_primary_1wy1n_101',
  cy = '_color_secondary_1wy1n_105',
  sy = '_color_danger_1wy1n_109',
  uy = '_color_success_1wy1n_113',
  oy = '_color_warning_1wy1n_117',
  ry = '_truncate_1wy1n_121',
  fy = '_align_left_1wy1n_128',
  dy = '_align_center_1wy1n_132',
  my = '_align_right_1wy1n_136',
  zi = {
    text: Zg,
    variant_heading_1: Xg,
    variant_heading_2: Qg,
    variant_heading_3: Kg,
    variant_body: Jg,
    variant_caption: Wg,
    variant_label: Fg,
    variant_numeric_l: Ig,
    variant_numeric_m: Pg,
    variant_numeric_s: ty,
    color_default: ey,
    color_mid: ay,
    color_dim: ly,
    color_disabled: ny,
    color_primary: iy,
    color_secondary: cy,
    color_danger: sy,
    color_success: uy,
    color_warning: oy,
    truncate: ry,
    align_left: fy,
    align_center: dy,
    align_right: my,
  };
function hy(c) {
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
  const y = u ?? hy(c),
    _ = c.replace(/-/g, '_'),
    b = o === 'text' ? 'default' : o;
  return r.jsx(y, {
    className: [
      zi.text,
      zi[`variant_${_}`],
      zi[`color_${b}`],
      d ? zi.truncate : '',
      h ? zi[`align_${h}`] : '',
      m,
    ]
      .filter(Boolean)
      .join(' '),
    style: g,
    children: s,
  });
}
const vy = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function Gi({ active: c, onChange: s, badges: u }) {
  return r.jsx('nav', {
    className: Ei.nav,
    'aria-label': 'メインナビゲーション',
    children: vy.map(({ key: o, label: m, iconName: d }) => {
      const h = o === c,
        g = u == null ? void 0 : u[o];
      return r.jsxs(
        'button',
        {
          type: 'button',
          className: [Ei.tab, h ? Ei.active : ''].filter(Boolean).join(' '),
          onClick: () => s(o),
          'aria-current': h ? 'page' : void 0,
          'aria-label': m,
          children: [
            r.jsxs('span', {
              className: Ei.iconWrap,
              children: [
                r.jsx(Mt, {
                  name: d,
                  size: 22,
                  color: h ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                g != null &&
                  r.jsx('span', { className: Ei.badge, 'aria-hidden': 'true', children: g }),
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
const gy = '_root_kv5uk_2',
  yy = '_titleRow_kv5uk_8',
  _y = '_left_kv5uk_17',
  py = '_center_kv5uk_24',
  by = '_right_kv5uk_33',
  Sy = '_currencies_kv5uk_42',
  xy = '_actions_kv5uk_49',
  jy = '_tabBarSlot_kv5uk_56',
  al = {
    root: gy,
    titleRow: yy,
    left: _y,
    center: py,
    right: by,
    currencies: Sy,
    actions: xy,
    tabBarSlot: jy,
  },
  Ty = '_root_i843c_2',
  Ay = '_icon_i843c_10',
  Ny = '_delta_i843c_30',
  Ey = '_deltaSm_i843c_37',
  zy = '_deltaMd_i843c_41',
  My = '_deltaLg_i843c_45',
  Cy = '_subtle_i843c_50',
  wy = '_currencyLabel_i843c_55',
  Oy = '_rankStamp_i843c_64',
  na = {
    root: Ty,
    icon: Ay,
    delta: Ny,
    deltaSm: Ey,
    deltaMd: zy,
    deltaLg: My,
    subtle: Cy,
    currencyLabel: wy,
    rankStamp: Oy,
  },
  Dy = '_root_1wxcz_1',
  Ry = '_sizeSm_1wxcz_13',
  By = '_sizeMd_1wxcz_17',
  Ly = '_sizeLg_1wxcz_21',
  Hy = '_sizeXl_1wxcz_25',
  qy = '_affix_1wxcz_29',
  zl = { root: Dy, sizeSm: Ry, sizeMd: By, sizeLg: Ly, sizeXl: Hy, affix: qy };
function ir(c) {
  let s = c.length;
  for (; s > 0 && c[s - 1] === 0; ) s--;
  return c.slice(0, s);
}
function Mi(c) {
  let s = 0;
  for (let u = 0; u < c.length; u++) {
    const o = Math.floor(c[u] + s);
    ((c[u] = o % 1e3), (s = Math.floor(o / 1e3)));
  }
  for (; s > 0; ) (c.push(s % 1e3), (s = Math.floor(s / 1e3)));
  return ir(c);
}
function Uy(c, s) {
  for (; s !== 0; ) {
    const u = s;
    ((s = c % s), (c = u));
  }
  return c;
}
function Gy(c) {
  const s = c.toString(),
    u = s.indexOf('.');
  if (u === -1) return { num: Math.round(c), den: 1 };
  const o = s.length - u - 1,
    m = Math.pow(10, o),
    d = Math.round(c * m),
    h = Uy(Math.abs(d), m);
  return { num: d / h, den: m / h };
}
function Vy(c) {
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
    return new ce(ir(u));
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
    return new ce(ir(o));
  }
  static fromJSON(s) {
    return new ce(Mi([...s]));
  }
  add(s) {
    const u = this.digits,
      o = s.digits,
      m = Math.max(u.length, o.length),
      d = new Array(m).fill(0);
    let h = 0;
    for (let g = 0; g < m; g++) {
      const y = (u[g] ?? 0) + (o[g] ?? 0) + h;
      ((d[g] = y % 1e3), (h = Math.floor(y / 1e3)));
    }
    return (h > 0 && d.push(h), new ce(Mi(d)));
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
    return new ce(Mi(m));
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
    return new ce(Mi(o));
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
    return (m > 0 && (o[0] += 1), new ce(Mi(o)));
  }
  mulRational(s, u) {
    return this.mulInt(s).divInt(u);
  }
  mulNumber(s) {
    const { num: u, den: o } = Gy(s);
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
      m = Vy(o),
      d = this.digits[s - 2] ?? 0,
      h = Math.floor(d / 10);
    return `${u}.${String(h).padStart(2, '0')}${m}`;
  }
};
Ke(ce, 'ZERO', new ce([]));
let At = ce;
function $y(c) {
  if (c === '') return 0;
  let s = 0;
  for (let u = 0; u < c.length; u++) s = s * 26 + (c.charCodeAt(u) - 65 + 1);
  return s;
}
function Yy(c) {
  if (c <= 0) return { color: 'var(--c-text)', glow: '0 0 6px rgba(232,239,255,0.35)' };
  const s = Math.min(1, (c - 1) / 19),
    u = 195 + s * 100,
    o = 0.86 - s * 0.14,
    m = 0.13 + s * 0.07,
    d = `oklch(${o.toFixed(3)} ${m.toFixed(3)} ${u.toFixed(1)})`,
    h = Math.min(0.95, o + 0.05),
    g = m + 0.05,
    y = `oklch(${h.toFixed(3)} ${g.toFixed(3)} ${u.toFixed(1)} / 0.55)`;
  return { color: d, glow: `0 0 8px ${y}` };
}
function ky(c) {
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
function Zy(c) {
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
function ys({
  value: c,
  size: s = 'md',
  accentColor: u = 'scale',
  glow: o = !1,
  prefix: m,
  suffix: d,
  decimals: h,
  style: g,
}) {
  const y = typeof c == 'number' ? At.fromNumber(c) : c;
  let _;
  h != null && typeof c == 'number' ? (_ = c.toFixed(h)) : (_ = y.toDisplay());
  const b = _.match(/^[\d.]+([A-Z]*)$/),
    E = b ? b[1] : '',
    j = $y(E);
  let H, R;
  if (u === 'scale') {
    const st = Yy(j);
    ((H = st.color), (R = o ? st.glow : void 0));
  } else ((H = ky(u)), (R = o ? Zy(u) : void 0));
  const V = { sm: zl.sizeSm, md: zl.sizeMd, lg: zl.sizeLg, xl: zl.sizeXl }[s],
    U = { color: H, ...(R != null ? { textShadow: R } : {}), ...g };
  return r.jsxs('span', {
    className: `${zl.root} ${V}`,
    style: U,
    children: [
      m != null && r.jsx('span', { className: zl.affix, children: m }),
      _,
      d != null && r.jsx('span', { className: zl.affix, children: d }),
    ],
  });
}
const Xy = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  Qy = { sm: 12, md: 16, lg: 22, xl: 28 };
function Ky({ delta: c, sizeClass: s }) {
  const u = c === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return r.jsx('span', {
    className: `${na.delta} ${s}`,
    style: { color: u },
    'aria-hidden': 'true',
    children: c,
  });
}
function qi({
  currency: c,
  value: s,
  size: u = 'md',
  delta: o,
  showLabel: m,
  subtle: d,
  align: h = 'start',
  ranked: g,
}) {
  const y = typeof s == 'number' ? At.fromNumber(s) : s,
    _ = Xy[c],
    b = d ? 'var(--c-text-disabled)' : `var(${_.cssVar})`,
    E = o && !d ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: b },
    j = { sm: na.deltaSm, md: na.deltaMd, lg: na.deltaLg, xl: na.deltaLg }[u],
    H = r.jsx(Mt, { name: c, size: Qy[u], color: b, className: na.icon }),
    R = r.jsxs(r.Fragment, {
      children: [
        o !== void 0 && !d && r.jsx(Ky, { delta: o, sizeClass: j }),
        r.jsx(ys, { value: y, size: u, accentColor: 'primary', style: E }),
      ],
    });
  return r.jsxs('span', {
    className: [na.root, d ? na.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${_.label} ${y.toDisplay()}`,
    children: [
      h === 'end'
        ? r.jsxs(r.Fragment, { children: [R, H] })
        : r.jsxs(r.Fragment, { children: [H, R] }),
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
const Jy = '_iconButton_1fyi8_1',
  Wy = '_round_1fyi8_23',
  Fy = '_active_1fyi8_85',
  Iy = '_iconWrap_1fyi8_113',
  An = {
    iconButton: Jy,
    round: Wy,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: Fy,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: Iy,
  },
  Py = { sm: 14, md: 18, lg: 22 };
function ms({
  icon: c,
  label: s,
  size: u = 'md',
  variant: o = 'ghost',
  shape: m = 'square',
  active: d = !1,
  disabled: h = !1,
  onClick: g,
}) {
  const y = o === 'default' ? 'ghost' : o,
    _ = typeof c == 'string' ? r.jsx(Mt, { name: c, size: Py[u] }) : c;
  return r.jsx('button', {
    type: 'button',
    className: [
      An.iconButton,
      An[`variant-${y}`],
      An[`size-${u}`],
      m === 'round' ? An.round : '',
      d ? An.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: g,
    'aria-label': s,
    'aria-pressed': d,
    'aria-disabled': h,
    children: r.jsx('span', { className: An.iconWrap, 'aria-hidden': 'true', children: _ }),
  });
}
const Dh = (c) => {
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
        getInitialState: () => y,
        subscribe: (_) => (u.add(_), () => u.delete(_)),
      },
      y = (s = c(o, m, g));
    return g;
  },
  t_ = (c) => (c ? Dh(c) : Dh),
  e_ = (c) => c;
function a_(c, s = e_) {
  const u = us.useSyncExternalStore(
    c.subscribe,
    us.useCallback(() => s(c.getState()), [c, s]),
    us.useCallback(() => s(c.getInitialState()), [c, s])
  );
  return (us.useDebugValue(u), u);
}
const l_ = (c) => {
    const s = t_(c),
      u = (o) => a_(s, o);
    return (Object.assign(u, s), u);
  },
  n_ = (c) => l_,
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
  i_ = (c, s) => ({
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
  c_ = { bolt: At.ZERO, alloy: At.ZERO },
  s_ = (c, s) => ({
    ...c_,
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
  mr = 6,
  u_ = { equippedPatches: new Map() },
  o_ = (c, s) => ({
    ...u_,
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
  m0 = 'tower-like-game',
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
  h0 = [
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
  r_ = {
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
  f_ = { id: 'singleton', bolt: [], alloy: [] },
  d_ = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  m_ = {
    id: 'singleton',
    defaultGameSpeed: 1,
    bgmVolume: 0.8,
    seVolume: 0.8,
    vibrationEnabled: !0,
  };
function v0() {
  return Object.fromEntries(h0.map((c) => [c, 0]));
}
const h_ = { machineLevels: v0() },
  v_ = (c) => ({
    ...h_,
    incrementMachineLv: (s) =>
      c((u) => ({ machineLevels: { ...u.machineLevels, [s]: u.machineLevels[s] + 1 } })),
    setMachineLv: (s, u) => c((o) => ({ machineLevels: { ...o.machineLevels, [s]: u } })),
    resetMachine: () => c({ machineLevels: v0() }),
  });
function Bh(c, s) {
  return `${c}#${s}`;
}
const g_ = { patches: new Map() },
  y_ = (c, s) => ({
    ...g_,
    addPatch: (u, o, m = 1) => {
      const d = Bh(u, o);
      c((h) => {
        const g = new Map(h.patches),
          y = g.get(d);
        return (
          y ? g.set(d, { ...y, count: y.count + m }) : g.set(d, { name: u, tier: o, count: m }),
          { patches: g }
        );
      });
    },
    consumePatch: (u, o, m = 1) => {
      const d = Bh(u, o),
        h = s().patches.get(d);
      return !h || h.count < m
        ? !1
        : (c((g) => {
            const y = new Map(g.patches),
              _ = y.get(d);
            if (!_) return {};
            const b = _.count - m;
            return (b <= 0 ? y.delete(d) : y.set(d, { ..._, count: b }), { patches: y });
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
  Lh = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  __ = (c) => ({
    ...Lh,
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
    resetProfile: (s) => c({ ...Lh, createdAt: s, lastPlayedAt: s }),
  }),
  Hh = { defaultGameSpeed: 1, bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  p_ = (c) => ({
    ...Hh,
    setDefaultGameSpeed: (s) => c({ defaultGameSpeed: s }),
    setBgmVolume: (s) => c({ bgmVolume: Math.max(0, Math.min(1, s)) }),
    setSeVolume: (s) => c({ seVolume: Math.max(0, Math.min(1, s)) }),
    setVibrationEnabled: (s) => c({ vibrationEnabled: s }),
    resetSettings: () => c(Hh),
  }),
  qh = { weaponLv: 0, initialWeapon: 'laser' },
  b_ = (c) => ({
    ...qh,
    incrementWeaponLv: () => c((s) => ({ weaponLv: s.weaponLv + 1 })),
    setWeaponLv: (s) => c({ weaponLv: s }),
    setInitialWeapon: (s) => c({ initialWeapon: s }),
    resetWeapons: () => c(qh),
  }),
  X = n_()((...c) => ({
    ...__(...c),
    ...s_(...c),
    ...v_(...c),
    ...b_(...c),
    ...y_(...c),
    ...o_(...c),
    ...p_(...c),
    ...i_(...c),
  }));
function Vi({ title: c, subtitle: s, onBack: u, currencies: o, tabBar: m, actions: d }) {
  const h = X((j) => j.bolt),
    g = X((j) => j.alloy),
    y = X((j) => j.screw),
    _ = X((j) => j.isRunActive),
    b = (o ?? []).filter((j) => (j === 'screw' ? _ : !0));
  function E(j) {
    switch (j) {
      case 'bolt':
        return h;
      case 'alloy':
        return g;
      case 'screw':
        return y;
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
              r.jsx(ms, {
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
                  children: b.map((j) => r.jsx(qi, { currency: j, value: E(j), size: 'sm' }, j)),
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
const S_ = '_tab_nufoh_3',
  x_ = '_weaponBlock_nufoh_9',
  j_ = '_activeCard_nufoh_15',
  T_ = '_activeRow_nufoh_19',
  A_ = '_activeName_nufoh_24',
  Ci = { tab: S_, weaponBlock: x_, activeCard: j_, activeRow: T_, activeName: A_ },
  N_ = '_card_1403j_1',
  E_ = '_interactive_1403j_97',
  wi = {
    card: N_,
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
    interactive: E_,
  };
function ul({
  children: c,
  variant: s = 'default',
  interactive: u = !1,
  padding: o = 'md',
  radius: m,
  className: d,
}) {
  const h = [
    wi.card,
    wi[`variant-${s}`],
    wi[`padding-${o}`],
    m != null ? wi[`radius-${m}`] : '',
    u ? wi.interactive : '',
    d ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return r.jsx('div', { className: h, children: c });
}
const z_ = '_wrapper_1gig0_2',
  M_ = '_active_1gig0_8',
  C_ = '_card_1gig0_8',
  w_ = '_locked_1gig0_14',
  O_ = '_tall_1gig0_27',
  D_ = '_header_1gig0_27',
  R_ = '_iconWrap_1gig0_33',
  B_ = '_statList_1gig0_37',
  L_ = '_wide_1gig0_42',
  H_ = '_headerText_1gig0_66',
  q_ = '_description_1gig0_73',
  U_ = '_statRow_1gig0_93',
  G_ = '_statValue_1gig0_100',
  V_ = '_lockedBadge_1gig0_110',
  _e = {
    wrapper: z_,
    active: M_,
    card: C_,
    locked: w_,
    tall: O_,
    header: D_,
    iconWrap: R_,
    statList: B_,
    wide: L_,
    headerText: H_,
    description: q_,
    statRow: U_,
    statValue: G_,
    lockedBadge: V_,
  },
  $_ = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function g0({
  weapon: c,
  name: s,
  description: u,
  stats: o,
  layout: m = 'tall',
  active: d = !1,
  locked: h = !1,
  onClick: g,
}) {
  const y = m === 'wide';
  return r.jsx('div', {
    className: [_e.wrapper, d ? _e.active : '', h ? _e.locked : '', y ? _e.wide : _e.tall]
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
    children: r.jsxs(ul, {
      variant: 'elevated',
      padding: 'md',
      interactive: g != null && !h,
      className: _e.card,
      children: [
        r.jsxs('div', {
          className: _e.header,
          children: [
            r.jsx('span', {
              className: _e.iconWrap,
              children: r.jsx(Mt, {
                name: c,
                size: y ? 24 : 28,
                color: d ? 'var(--c-primary)' : h ? 'var(--c-text-disabled)' : 'var(--c-text-mid)',
              }),
            }),
            r.jsxs('div', {
              className: _e.headerText,
              children: [
                r.jsx(q, {
                  variant: y ? 'label' : 'heading-3',
                  color: d ? 'primary' : h ? 'disabled' : 'default',
                  children: s,
                }),
                u != null &&
                  u.length > 0 &&
                  r.jsx(q, {
                    variant: 'caption',
                    color: 'dim',
                    className: _e.description,
                    children: u,
                  }),
              ],
            }),
          ],
        }),
        !h &&
          o.length > 0 &&
          r.jsx('ul', {
            className: _e.statList,
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
                  className: _e.statRow,
                  children: [
                    r.jsx(q, { variant: 'caption', color: 'dim', children: _.label }),
                    r.jsx('span', {
                      className: _e.statValue,
                      style: _.accent != null ? { color: $_[_.accent] } : void 0,
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
            className: _e.lockedBadge,
            children: [
              r.jsx(Mt, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
              r.jsx(q, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
            ],
          }),
      ],
    }),
  });
}
function xs(c) {
  return Math.pow(1.02, c);
}
function js(c, s) {
  return Math.min(10, c * (1 + 0.03 * s));
}
const Ts = { laser: 120, cannon: 480, thunder: 84, cutter: 62 },
  As = { laser: 1, cannon: 0.5, thunder: 0.7, cutter: 2 };
function Y_(c) {
  const s = Math.round(Ts.laser * xs(c)),
    u = Math.floor(1 + 0.1 * c),
    o = Math.round(js(As.laser, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '貫通', value: u },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function k_(c) {
  const s = Math.round(Ts.cannon * xs(c)),
    u = Math.round((30 + 0.5 * c) * 10) / 10,
    o = Math.round(js(As.cannon, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '爆発半径', value: u, suffix: 'px' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Z_(c) {
  const s = Math.round(Ts.thunder * xs(c)),
    u = Math.floor(7 + 0.1 * c),
    o = Math.round(js(As.thunder, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '連鎖', value: u },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function X_(c) {
  const s = Math.round(Ts.cutter * xs(c)),
    u = Math.round((80 + 0.5 * c) * 10) / 10,
    o = Math.floor(1 + 0.05 * c),
    m = Math.round(js(As.cutter, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '旋回半径', value: u, suffix: 'px' },
    { label: '同時', value: o },
    { label: '連射', value: m, suffix: '/s' },
  ];
}
const Q_ = [
  {
    kind: 'laser',
    name: 'LASER',
    description: '高速直進ビーム。貫通でき、連発で削り続ける。',
    activeSkill: 'Mega Beam',
    activeDesc: '画面端まで届く太いビームで全ヒット。CD: 20s',
    buildStats: Y_,
  },
  {
    kind: 'cannon',
    name: 'CANNON',
    description: '範囲爆発で群れを薙ぐ重火力。',
    activeSkill: 'Volley',
    activeDesc: '72°ずつ放射状に5発の砲弾を撃つ。CD: 25s',
    buildStats: k_,
  },
  {
    kind: 'thunder',
    name: 'THUNDER',
    description: '隣接敵に連鎖する電撃。シールドに有効。',
    activeSkill: 'Plasma Discharge',
    activeDesc: 'ターゲットから連鎖数まで敵に跳ねる。CD: 30s',
    buildStats: Z_,
  },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシン周囲を旋回する斬撃。',
    activeSkill: 'Overdrive',
    activeDesc: '8秒間、攻撃速度倍率×3。CD: 35s',
    buildStats: X_,
  },
];
function K_() {
  const c = X((s) => s.weaponLv);
  return r.jsx('div', {
    className: Ci.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: Q_.map((s) =>
      r.jsxs(
        'div',
        {
          className: Ci.weaponBlock,
          children: [
            r.jsx(g0, {
              weapon: s.kind,
              name: s.name,
              description: s.description,
              stats: s.buildStats(c),
              layout: 'wide',
            }),
            r.jsx(ul, {
              variant: 'sunken',
              padding: 'sm',
              className: Ci.activeCard,
              children: r.jsxs('div', {
                className: Ci.activeRow,
                children: [
                  r.jsx(q, {
                    variant: 'caption',
                    color: 'secondary',
                    className: Ci.activeName,
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
const J_ = '_tab_lutms_3',
  W_ = '_topRow_lutms_9',
  F_ = '_description_lutms_15',
  I_ = '_previewCard_lutms_21',
  P_ = '_previewLabel_lutms_25',
  tp = '_impactGrid_lutms_32',
  ep = '_impactRow_lutms_37',
  ap = '_impactRowBordered_lutms_45',
  lp = '_impactLabel_lutms_49',
  np = '_impactValues_lutms_55',
  ip = '_arrow_lutms_62',
  Je = {
    tab: J_,
    topRow: W_,
    description: F_,
    previewCard: I_,
    previewLabel: P_,
    impactGrid: tp,
    impactRow: ep,
    impactRowBordered: ap,
    impactLabel: lp,
    impactValues: np,
    arrow: ip,
  },
  cp = '_root_fjicv_2',
  sp = '_header_fjicv_15',
  up = '_iconWrap_fjicv_22',
  op = '_title_fjicv_34',
  rp = '_lvBadge_fjicv_47',
  fp = '_description_fjicv_60',
  dp = '_valueRow_fjicv_66',
  mp = '_valueBefore_fjicv_74',
  hp = '_valueAfter_fjicv_83',
  vp = '_arrow_fjicv_93',
  gp = '_buttons_fjicv_100',
  yp = '_btnCol_fjicv_105',
  _p = '_btn_fjicv_105',
  pp = '_btnPrimary_fjicv_132',
  bp = '_btnSecondary_fjicv_139',
  Sp = '_btnWarning_fjicv_146',
  xp = '_costRow_fjicv_172',
  jp = '_costNum_fjicv_181',
  Tp = '_costDisabled_fjicv_190',
  $t = {
    root: cp,
    header: sp,
    iconWrap: up,
    title: op,
    lvBadge: rp,
    description: fp,
    valueRow: dp,
    valueBefore: mp,
    valueAfter: hp,
    arrow: vp,
    buttons: gp,
    btnCol: yp,
    btn: _p,
    btnPrimary: pp,
    btnSecondary: bp,
    btnWarning: Sp,
    costRow: xp,
    costNum: jp,
    costDisabled: Tp,
  },
  Ap = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  Np = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  Ep = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  zp = { primary: $t.btnPrimary, secondary: $t.btnSecondary, warning: $t.btnWarning },
  Mp = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function Fo(c) {
  return c instanceof At ? c.toDisplay() : c.toLocaleString();
}
function hr({
  title: c,
  description: s,
  iconName: u,
  iconColor: o,
  currentLabel: m,
  before: d,
  after: h,
  beforeSuffix: g = '',
  currency: y = 'bolt',
  accent: _,
  options: b = [],
  maxed: E = !1,
  onUpgrade: j,
}) {
  const H = _ ?? Ep[y],
    R = Ap[H],
    V = o ?? R,
    U = zp[H],
    st = Mp[H];
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
              children: r.jsx(Mt, { name: u, size: 14, color: V }),
            }),
          r.jsx('span', { className: $t.title, children: c }),
          m != null &&
            !E &&
            r.jsx('span', {
              className: $t.lvBadge,
              style: { color: R, boxShadow: Np[H] },
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
            r.jsxs('span', { className: $t.valueBefore, children: [Fo(d), g] }),
            h != null &&
              !E &&
              r.jsxs(r.Fragment, {
                children: [
                  r.jsx('span', { className: $t.arrow, children: '→' }),
                  r.jsxs('span', {
                    className: $t.valueAfter,
                    style: { color: R, textShadow: `0 0 5px ${st}` },
                    children: [Fo(h), g],
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
            const yt = F.disabled === !0;
            return r.jsxs(
              'div',
              {
                className: $t.btnCol,
                children: [
                  r.jsx('button', {
                    type: 'button',
                    className: `${$t.btn} ${U}`,
                    disabled: yt,
                    onClick: yt ? void 0 : () => (j == null ? void 0 : j(F.amount)),
                    children: F.amount,
                  }),
                  r.jsx('div', {
                    className: $t.costRow,
                    children: r.jsx('span', {
                      className: `${$t.costNum} ${yt ? $t.costDisabled : ''}`,
                      children: Fo(F.cost),
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
function vr(c) {
  const s = Math.ceil(200 * Math.pow(1.12, c));
  return At.fromNumber(s);
}
function Uh(c, s) {
  let u = At.ZERO;
  for (let o = 0; o < s; o++) u = u.add(vr(c + o));
  return u;
}
function Cp(c, s) {
  let u = s,
    o = 0;
  for (;;) {
    const m = vr(c + o);
    if (u.lt(m) || ((u = u.sub(m)), o++, o > 1e4)) break;
  }
  return o;
}
function Gh(c) {
  return Math.pow(1.02, c);
}
const Vh = { laser: 120 };
function wp(c) {
  const s = c + 1,
    u = Gh(c),
    o = Gh(s);
  return [
    { label: 'LASER DMG', before: Math.round(Vh.laser * u), after: Math.round(Vh.laser * o) },
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
function Op() {
  const c = X((R) => R.weaponLv),
    s = X((R) => R.alloy),
    u = X((R) => R.incrementWeaponLv),
    o = X((R) => R.setWeaponLv),
    m = X((R) => R.spendAlloy),
    d = vr(c),
    h = Uh(c, 5),
    g = Cp(c, s),
    y = Uh(c, g),
    _ = !s.lt(d),
    b = g >= 5,
    E = g >= 1,
    j = wp(c);
  function H(R) {
    R === '+1'
      ? m(d) && u()
      : R === '+5'
        ? m(h) && o(c + 5)
        : R === 'MAX' && g > 0 && m(y) && o(c + g);
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
          r.jsx(qi, { currency: 'alloy', value: s, size: 'sm' }),
        ],
      }),
      r.jsx(hr, {
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
          { amount: 'MAX', cost: y, disabled: !E },
        ],
        onUpgrade: H,
      }),
      r.jsxs(ul, {
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
            children: j.map((R, V) =>
              r.jsxs(
                'div',
                {
                  className: [Je.impactRow, V > 0 ? Je.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    r.jsx(q, {
                      variant: 'caption',
                      color: 'mid',
                      className: Je.impactLabel,
                      children: R.label,
                    }),
                    r.jsxs('span', {
                      className: Je.impactValues,
                      children: [
                        r.jsx(ys, {
                          value: R.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: R.suffix,
                          decimals: R.suffix === 'px' ? 1 : 0,
                        }),
                        r.jsx('span', { className: Je.arrow, children: '→' }),
                        r.jsx(ys, {
                          value: R.after,
                          size: 'sm',
                          accentColor: 'secondary',
                          suffix: R.suffix,
                          decimals: R.suffix === 'px' ? 1 : 0,
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
const y0 = dt.createContext(null);
function Dp({ children: c, initialScreen: s }) {
  const [u, o] = dt.useState(s ?? 'title'),
    m = dt.useCallback((d) => {
      o(d);
    }, []);
  return r.jsx(y0.Provider, { value: { screen: u, navigate: m }, children: c });
}
function Ma() {
  const c = dt.useContext(y0);
  if (!c) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return c;
}
const Rp = [
  { key: 'details', label: '武器詳細' },
  { key: 'upgrade', label: '共通強化' },
];
function Bp() {
  const [c, s] = dt.useState('details'),
    { screen: u, navigate: o } = Ma();
  return r.jsx(Bl, {
    header: r.jsx(Vi, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      tabBar: r.jsx(Ss, { tabs: Rp, value: c, onChange: s, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(Gi, { active: u, onChange: (m) => o(m) }),
    children: r.jsxs('div', {
      className: hg.content,
      children: [c === 'details' && r.jsx(K_, {}), c === 'upgrade' && r.jsx(Op, {})],
    }),
  });
}
const Lp = '_root_15ig1_1',
  Hp = '_overlayLayer_15ig1_10',
  $h = { root: Lp, overlayLayer: Hp },
  qp = '_root_1sbx5_3',
  Up = '_rangeCircle_1sbx5_15',
  Gp = '_machine_1sbx5_28',
  Vp = '_enemy_1sbx5_37',
  $p = '_enemyUpper_1sbx5_48',
  Yp = '_enemyHpBar_1sbx5_51',
  Nn = { root: qp, rangeCircle: Up, machine: Gp, enemy: Vp, enemyUpper: $p, enemyHpBar: Yp },
  kp = '_root_14p1r_1',
  Zp = { root: kp };
function Xp({ value: c, x: s, y: u, crit: o = !1, duration: m = 800, onDone: d }) {
  const h = dt.useId().replace(/:/g, 'dp'),
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
        className: `${h} ${Zp.root}`,
        onAnimationEnd: d,
        children: r.jsx(ys, {
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
const Qp = '_wrap_14rhu_1',
  Kp = { wrap: Qp },
  Yh = 8;
function Jp({ x: c, y: s, color: u = 'var(--c-text-mid)', duration: o = 480, onDone: m }) {
  const d = dt.useId().replace(/:/g, 'ed'),
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
    y = Array.from({ length: Yh }, (_, b) =>
      r.jsx('div', { className: `${d}-shard`, style: { '--a': `${(b * 360) / Yh}deg` } }, b)
    );
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: g } }),
      r.jsxs('div', {
        className: `${d}-wrap ${Kp.wrap}`,
        style: { left: `${c}%`, top: `${s}%` },
        onAnimationEnd: m,
        children: [r.jsx('div', { className: `${d}-flash` }), y],
      }),
    ],
  });
}
const Wp = '_wrap_14rhu_1',
  Fp = { wrap: Wp };
function Ip({ x: c, y: s, color: u = 'var(--c-primary-hi)', duration: o = 220, onDone: m }) {
  const d = dt.useId().replace(/:/g, 'eh'),
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
        className: `${d}-w ${Fp.wrap}`,
        style: { left: `${c}%`, top: `${s}%` },
        onAnimationEnd: m,
        children: r.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const Pp = '_root_2lc0r_2',
  t2 = '_boss_2lc0r_12',
  e2 = '_elite_2lc0r_16',
  a2 = '_sizeSm_2lc0r_21',
  l2 = '_sizeMd_2lc0r_25',
  n2 = '_sizeLg_2lc0r_29',
  i2 = '_header_2lc0r_35',
  c2 = '_headerRight_2lc0r_42',
  s2 = '_hpText_2lc0r_50',
  za = {
    root: Pp,
    boss: t2,
    elite: e2,
    sizeSm: a2,
    sizeMd: l2,
    sizeLg: n2,
    header: i2,
    headerRight: c2,
    hpText: s2,
  },
  u2 = '_badge_4fy54_1',
  o2 = '_glow_4fy54_90',
  r2 = '_iconLeft_4fy54_118',
  Oi = {
    badge: u2,
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
    glow: o2,
    iconLeft: r2,
  };
function $i({
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
  let y = c;
  return (
    y == null &&
      (g === 'tier' && u != null
        ? (y = `T${u}`)
        : g === 'patch-tier' && u != null
          ? (y = `T${u}`)
          : (y = '')),
    r.jsxs('span', {
      className: [Oi.badge, Oi[`variant-${g}`], Oi[`size-${o}`], m ? Oi.glow : '']
        .filter(Boolean)
        .join(' '),
      style: h,
      children: [
        d != null && r.jsx('span', { className: Oi.iconLeft, 'aria-hidden': 'true', children: d }),
        y,
      ],
    })
  );
}
const f2 = '_root_1pi3d_2',
  d2 = '_sizeSm_1pi3d_11',
  m2 = '_sizeMd_1pi3d_15',
  h2 = '_sizeLg_1pi3d_19',
  v2 = '_fill_1pi3d_23',
  g2 = '_label_1pi3d_29',
  y2 = '_withTrailing_1pi3d_46',
  _2 = '_trailingLabel_1pi3d_56',
  ll = {
    root: f2,
    sizeSm: d2,
    sizeMd: m2,
    sizeLg: h2,
    fill: v2,
    label: g2,
    withTrailing: y2,
    trailingLabel: _2,
  },
  p2 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  b2 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function gr({
  value: c,
  max: s,
  color: u = 'primary',
  size: o = 'md',
  variant: m = 'solid',
  showLabel: d = !1,
  label: h,
  trailingLabel: g,
  glow: y = !1,
  reverse: _ = !1,
}) {
  const b = Math.max(1, s),
    E = Math.min(Math.max(0, c), b),
    j = (E / b) * 100,
    H = p2[u],
    R = y || m === 'neon' ? b2[u] : void 0,
    V = { sm: ll.sizeSm, md: ll.sizeMd, lg: ll.sizeLg }[o],
    U = {
      width: `${j}%`,
      backgroundColor: H,
      ...(R != null ? { boxShadow: R } : {}),
      ...(_ ? { marginLeft: 'auto' } : {}),
    },
    st = h ?? `${E} / ${b}`,
    F = r.jsxs('div', {
      className: `${ll.root} ${V}`,
      role: 'progressbar',
      'aria-valuenow': E,
      'aria-valuemin': 0,
      'aria-valuemax': b,
      'aria-label': h ?? `${E} / ${b}`,
      children: [
        r.jsx('div', { className: ll.fill, style: U }),
        d && r.jsx('span', { className: ll.label, children: st }),
      ],
    });
  return g == null
    ? F
    : r.jsxs('div', {
        className: ll.withTrailing,
        children: [F, r.jsx('span', { className: ll.trailingLabel, children: g })],
      });
}
function S2(c, s) {
  if (s.isZero()) return 0;
  const u = parseFloat(c.toString()),
    o = parseFloat(s.toString());
  return o === 0 || isNaN(o) ? 0 : Math.min(1e3, Math.max(0, Math.round((u / o) * 1e3)));
}
const x2 = { sm: za.sizeSm, md: za.sizeMd, lg: za.sizeLg };
function j2({
  name: c,
  variant: s,
  current: u,
  max: o,
  tier: m,
  size: d = 'md',
  showValue: h = !0,
  type: g,
  currentHp: y,
  maxHp: _,
}) {
  const b = s ?? g ?? 'normal',
    E = u ?? y ?? 0,
    j = o ?? _ ?? 0,
    H = typeof E == 'number' ? At.fromNumber(E) : E,
    R = typeof j == 'number' ? At.fromNumber(j) : j,
    V = S2(H, R),
    U = V <= 250,
    st = U ? 'hp-low' : 'hp',
    F = d === 'lg' ? 'lg' : d === 'sm' ? 'sm' : 'md';
  let yt;
  return (
    b === 'boss'
      ? (yt = { boxShadow: 'var(--glow-danger-md)' })
      : b === 'elite' && (yt = { boxShadow: 'var(--glow-purple-md)' }),
    r.jsxs('div', {
      className: [za.root, b === 'boss' ? za.boss : '', b === 'elite' ? za.elite : '', x2[d]]
        .filter(Boolean)
        .join(' '),
      style: yt,
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
                  r.jsx($i, { text: b.toUpperCase(), variant: b, glow: b === 'boss' }),
              ],
            }),
          ],
        }),
        r.jsx(gr, { value: V, max: 1e3, color: st, size: F, glow: U }),
        h &&
          r.jsx('div', {
            className: za.hpText,
            children: r.jsxs(q, {
              variant: 'numeric-s',
              color: U ? 'danger' : 'mid',
              children: [H.toDisplay(), ' / ', R.toDisplay()],
            }),
          }),
      ],
    })
  );
}
function T2(c) {
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
function A2(c) {
  return c !== 'normal';
}
function N2(c) {
  return c === 'boss' ? 'boss' : c === 'elite' || c === 'miniboss' ? 'elite' : 'normal';
}
function E2(c) {
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
function z2({
  enemies: c,
  machinePosition: s = { x: 50, y: 50 },
  damageEvents: u,
  hitEvents: o,
  deathEvents: m,
  onDamageDone: d,
  onHitDone: h,
  onDeathDone: g,
  range: y,
}) {
  const _ = s.x,
    b = s.y,
    E = y * 2;
  return r.jsxs('div', {
    className: Nn.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: [
      r.jsx('div', {
        className: Nn.rangeCircle,
        style: { left: `${_}%`, top: `${b}%`, width: `${E}%` },
        'aria-hidden': !0,
      }),
      c.map((j) => {
        const H = A2(j.kind),
          R = E2(j.kind),
          V = j.kind === 'boss' ? 32 : j.kind === 'miniboss' ? 28 : 22;
        return r.jsxs(
          'div',
          {
            className: [Nn.enemy, H ? Nn.enemyUpper : ''].filter(Boolean).join(' '),
            style: { left: `${j.position.x}%`, top: `${j.position.y}%` },
            'aria-label': `${j.kind}`,
            children: [
              r.jsx(Mt, { name: T2(j.kind), size: V, color: R }),
              H &&
                r.jsx('div', {
                  className: Nn.enemyHpBar,
                  children: r.jsx(j2, {
                    name: j.kind,
                    variant: N2(j.kind),
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
        className: Nn.machine,
        style: { left: `${_}%`, top: `${b}%` },
        'aria-label': 'マシン',
        children: r.jsx(Mt, { name: 'tower', size: 40, color: 'var(--c-primary)' }),
      }),
      u.map((j) =>
        r.jsx(
          Xp,
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
        r.jsx(Ip, { x: j.x, y: j.y, onDone: () => (h == null ? void 0 : h(j.id)) }, j.id)
      ),
      m.map((j) =>
        r.jsx(Jp, { x: j.x, y: j.y, onDone: () => (g == null ? void 0 : g(j.id)) }, j.id)
      ),
    ],
  });
}
const M2 = '_root_65dgz_2',
  C2 = '_topRow_65dgz_13',
  w2 = '_screwArea_65dgz_20',
  O2 = '_weaponSlots_65dgz_26',
  D2 = '_activeArea_65dgz_34',
  R2 = '_activeButton_65dgz_42',
  B2 = '_activeDisabled_65dgz_55',
  L2 = '_bottomRow_65dgz_61',
  H2 = '_sysButtons_65dgz_69',
  Ta = {
    root: M2,
    topRow: C2,
    screwArea: w2,
    weaponSlots: O2,
    activeArea: D2,
    activeButton: R2,
    activeDisabled: B2,
    bottomRow: L2,
    sysButtons: H2,
  },
  q2 = '_root_x9cjr_1',
  U2 = '_svg_x9cjr_9',
  G2 = '_track_x9cjr_15',
  V2 = '_arc_x9cjr_19',
  $2 = '_center_x9cjr_28',
  Y2 = '_labelText_x9cjr_37',
  En = { root: q2, svg: U2, track: G2, arc: V2, center: $2, labelText: Y2 },
  k2 = { xs: 20, sm: 32, md: 48, lg: 64 },
  Z2 = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  X2 = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function _0({
  value: c,
  max: s,
  size: u = 24,
  color: o = 'primary',
  thickness: m = 3,
  glow: d = !1,
  showLabel: h = !1,
  withLabel: g = !1,
  label: y,
  children: _,
}) {
  const b = typeof u == 'number' ? u : k2[u],
    E =
      s != null
        ? Math.min(Math.max(0, c), Math.max(1, s)) / Math.max(1, s)
        : Math.min(Math.max(0, c), 100) / 100,
    j = s != null ? Math.min(Math.max(0, c), Math.max(1, s)) : c,
    H = s != null ? Math.max(1, s) : 100,
    R = Z2[o],
    V = d ? X2[o] : void 0,
    U = b / 2,
    st = U - m / 2,
    F = 2 * Math.PI * st,
    yt = F * (1 - E),
    ae = h || g || _ != null,
    Rt = y ?? `${Math.round(E * 100)}%`;
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
        'aria-label': y ?? `${j} / ${H}`,
        children: [
          r.jsx('circle', {
            className: En.track,
            cx: U,
            cy: U,
            r: st,
            fill: 'none',
            strokeWidth: m,
          }),
          r.jsx('circle', {
            className: En.arc,
            cx: U,
            cy: U,
            r: st,
            fill: 'none',
            stroke: R,
            strokeWidth: m,
            strokeLinecap: 'round',
            strokeDasharray: F,
            strokeDashoffset: yt,
            style: V != null ? { filter: `drop-shadow(0 0 4px ${R})` } : void 0,
            transform: `rotate(-90 ${U} ${U})`,
          }),
        ],
      }),
      ae &&
        r.jsx('span', {
          className: En.center,
          children:
            _ ?? r.jsx('span', { className: En.labelText, style: { color: R }, children: Rt }),
        }),
    ],
  });
}
const Q2 = '_root_8pbri_1',
  K2 = '_disabled_8pbri_8',
  J2 = '_segment_8pbri_13',
  W2 = '_selected_8pbri_27',
  F2 = '_unselected_8pbri_33',
  zn = {
    root: Q2,
    disabled: K2,
    segment: J2,
    selected: W2,
    unselected: F2,
    'size-sm': '_size-sm_8pbri_42',
    'size-md': '_size-md_8pbri_47',
  },
  p0 = ({ options: c, value: s, onChange: u, size: o = 'md', disabled: m = !1 }) =>
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
  I2 = '_wrapper_1e40p_9',
  P2 = '_disabled_1e40p_15',
  tb = '_off_1e40p_31',
  eb = '_on_1e40p_35',
  ab = '_accent_primary_1e40p_35',
  lb = '_accent_secondary_1e40p_39',
  nb = '_accent_success_1e40p_43',
  ib = '_accent_disabled_1e40p_47',
  cb = '_size_md_1e40p_56',
  sb = '_knob_1e40p_60',
  ub = '_size_sm_1e40p_70',
  ob = '_labelGroup_1e40p_93',
  rb = '_label_1e40p_93',
  fb = '_description_1e40p_106',
  We = {
    wrapper: I2,
    disabled: P2,
    switch: '_switch_1e40p_22',
    off: tb,
    on: eb,
    accent_primary: ab,
    accent_secondary: lb,
    accent_success: nb,
    accent_disabled: ib,
    size_md: cb,
    knob: sb,
    size_sm: ub,
    labelGroup: ob,
    label: rb,
    description: fb,
  },
  yr = ({
    checked: c,
    onChange: s,
    disabled: u = !1,
    label: o,
    description: m,
    accent: d = 'primary',
    size: h = 'md',
  }) => {
    const g = u || d === 'disabled',
      y = () => {
        g || s(!c);
      };
    return r.jsxs('label', {
      className: [We.wrapper, g ? We.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': g,
      children: [
        r.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': c,
          'aria-disabled': g,
          className: [We.switch, c ? We.on : We.off, We[`size_${h}`], We[`accent_${d}`]]
            .filter(Boolean)
            .join(' '),
          onClick: y,
          disabled: g,
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
  db = '_root_afe45_2',
  mb = '_swapDisabled_afe45_14',
  hb = '_active_afe45_20',
  vb = '_onCd_afe45_27',
  gb = '_iconWrap_afe45_27',
  yb = '_cdOverlay_afe45_47',
  _b = '_cdProgress_afe45_57',
  pb = '_swapOverlay_afe45_68',
  nl = {
    root: db,
    swapDisabled: mb,
    active: hb,
    onCd: vb,
    iconWrap: gb,
    cdOverlay: yb,
    cdProgress: _b,
    swapOverlay: pb,
  },
  bb = { sm: 40, md: 52, lg: 64 },
  Sb = { sm: 18, md: 24, lg: 30 };
function xb({
  weapon: c,
  active: s = !1,
  ready: u = !1,
  cdProgress: o = 100,
  swapDisabled: m = !1,
  size: d = 'md',
  onClick: h,
}) {
  const g = bb[d],
    y = Sb[d],
    _ = o < 100,
    b = [nl.root, s ? nl.active : '', _ ? nl.onCd : '', m ? nl.swapDisabled : '']
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
        className: nl.iconWrap,
        children: r.jsx(Mt, {
          name: c,
          size: y,
          color: s ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      _ &&
        r.jsxs(r.Fragment, {
          children: [
            r.jsx('span', { className: nl.cdOverlay, 'aria-hidden': 'true' }),
            r.jsx('span', {
              className: nl.cdProgress,
              'aria-hidden': 'true',
              children: r.jsx(_0, {
                value: o,
                max: 100,
                size: g - 4,
                color: 'cd',
                thickness: d === 'sm' ? 2 : 3,
              }),
            }),
          ],
        }),
      m && r.jsx('span', { className: nl.swapOverlay, 'aria-hidden': 'true' }),
    ],
  });
}
const kh = ['laser', 'cannon', 'thunder', 'cutter'],
  jb = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
  ];
function Tb({
  screw: c,
  equippedWeapon: s,
  weaponCds: u,
  activeCd: o,
  activeMax: m,
  isAutoActive: d,
  onSwitchWeapon: h,
  onActivate: g,
  onToggleAuto: y,
  gameSpeed: _,
  onSpeedChange: b,
  isPaused: E,
  onTogglePause: j,
  onOpenMenu: H,
  onOpenScreenSaver: R,
}) {
  const V = o > 0,
    U = d || V,
    st = kh.some((F) => F !== s && (u[F] ?? 100) < 100);
  return r.jsxs('div', {
    className: Ta.root,
    children: [
      r.jsxs('div', {
        className: Ta.topRow,
        children: [
          r.jsx('div', {
            className: Ta.screwArea,
            children: r.jsx(qi, { currency: 'screw', value: c, size: 'md' }),
          }),
          r.jsx('div', {
            className: Ta.weaponSlots,
            children: kh.map((F) =>
              r.jsx(
                xb,
                {
                  weapon: F,
                  active: F === s,
                  cdProgress: u[F] ?? 100,
                  swapDisabled: st && F !== s,
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
                'aria-label': `アクティブスキル発動${V ? ' (クールダウン中)' : d ? ' (自動モード)' : ''}`,
                children: r.jsx(_0, {
                  value: V ? o : m,
                  max: m > 0 ? m : 1,
                  size: 56,
                  color: V ? 'cd' : 'primary',
                  glow: !V && !d,
                  thickness: 4,
                  children: r.jsx(Mt, {
                    name: 'lightning',
                    size: 24,
                    color: U ? 'var(--c-text-disabled)' : 'var(--c-primary)',
                  }),
                }),
              }),
              r.jsx(yr, {
                checked: d,
                onChange: y,
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
          r.jsx(p0, { options: jb, value: _, onChange: b, size: 'sm' }),
          r.jsxs('div', {
            className: Ta.sysButtons,
            children: [
              r.jsx(ms, {
                icon: E ? 'play' : 'pause',
                label: E ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: E,
                onClick: j,
              }),
              r.jsx(ms, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: H,
              }),
              r.jsx(ms, {
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
const Ab = '_root_tql5d_2',
  Nb = '_hpRow_tql5d_12',
  Eb = '_hpBar_tql5d_18',
  zb = '_waveCount_tql5d_23',
  os = { root: Ab, hpRow: Nb, hpBar: Eb, waveCount: zb },
  Mb = '_root_nxl33_2',
  Cb = '_boss_nxl33_14',
  wb = '_header_nxl33_20',
  Ob = '_waveLabel_nxl33_26',
  Db = '_waveNum_nxl33_35',
  Rb = '_milestone_nxl33_41',
  Bb = '_milestoneText_nxl33_48',
  Lb = '_seconds_nxl33_58',
  Aa = {
    root: Mb,
    boss: Cb,
    header: wb,
    waveLabel: Ob,
    waveNum: Db,
    milestone: Rb,
    milestoneText: Bb,
    seconds: Lb,
    'size-sm': '_size-sm_nxl33_64',
    'size-md': '_size-md_nxl33_72',
    'size-lg': '_size-lg_nxl33_76',
  },
  Hb = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  },
  qb = { sm: 'var(--fs-label)', md: 'var(--fs-caption)', lg: 'var(--fs-body)' };
function Ub({
  waveNumber: c,
  secondsLeft: s,
  secondsMax: u,
  nextMilestone: o,
  showSeconds: m = !0,
  size: d = 'md',
}) {
  const h = (o == null ? void 0 : o.kind) === 'boss',
    g = o != null ? Hb[o.kind] : null;
  return r.jsxs('div', {
    className: [Aa.root, Aa[`size-${d}`], h ? Aa.boss : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Aa.header,
        children: [
          r.jsxs('span', {
            className: Aa.waveLabel,
            style: { fontSize: qb[d] },
            children: ['WAVE ', r.jsx('span', { className: Aa.waveNum, children: c })],
          }),
          g != null &&
            o != null &&
            r.jsxs('span', {
              className: Aa.milestone,
              style: { color: g.color },
              children: [
                r.jsx(Mt, { name: g.iconName, size: 12, color: g.color }),
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
      r.jsx(gr, {
        value: s,
        max: Math.max(1, u),
        color: h ? 'secondary' : 'wave',
        size: d === 'lg' ? 'md' : 'sm',
        glow: h,
      }),
    ],
  });
}
function Gb(c, s) {
  if (s.isZero()) return 0;
  const u = parseFloat(c.toString()),
    o = parseFloat(s.toString());
  return o === 0 || isNaN(o) ? 0 : Math.min(1e3, Math.max(0, Math.round((u / o) * 1e3)));
}
function Vb({
  hpCurrent: c,
  hpMax: s,
  tier: u,
  wave: o,
  totalWaves: m,
  secondsRemaining: d,
  secondsTotal: h,
  isBossWave: g = !1,
  nextMilestone: y,
}) {
  const _ = Gb(c, s),
    b = _ < 300;
  return r.jsxs('div', {
    className: os.root,
    children: [
      r.jsxs('div', {
        className: os.hpRow,
        children: [
          r.jsx($i, { variant: 'tier', tier: u, size: 'sm', glow: g }),
          r.jsx('div', {
            className: os.hpBar,
            children: r.jsx(gr, {
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
            className: os.waveCount,
            children: [o, '/', m],
          }),
        ],
      }),
      r.jsx(Ub, {
        waveNumber: o,
        secondsLeft: d,
        secondsMax: h,
        nextMilestone: y,
        showSeconds: !0,
        size: 'sm',
      }),
    ],
  });
}
const $b = '_card_1o3jz_1',
  Yb = '_header_1o3jz_8',
  kb = '_soundSection_1o3jz_13',
  Zb = '_sliderRow_1o3jz_19',
  Xb = '_sliderLabel_1o3jz_26',
  Qb = '_sliderValue_1o3jz_31',
  Kb = '_divider_1o3jz_38',
  Jb = '_actions_1o3jz_44',
  Fe = {
    card: $b,
    header: Yb,
    soundSection: kb,
    sliderRow: Zb,
    sliderLabel: Xb,
    sliderValue: Qb,
    divider: Kb,
    actions: Jb,
  },
  Wb = '_button_10kfo_1',
  Fb = '_fullWidth_10kfo_109',
  Ib = '_iconLeft_10kfo_113',
  Pb = '_iconRight_10kfo_114',
  tS = '_label_10kfo_120',
  Ml = {
    button: Wb,
    'variant-primary': '_variant-primary_10kfo_28',
    'variant-secondary': '_variant-secondary_10kfo_42',
    'variant-danger': '_variant-danger_10kfo_56',
    'variant-ghost': '_variant-ghost_10kfo_70',
    'size-sm': '_size-sm_10kfo_85',
    'size-md': '_size-md_10kfo_93',
    'size-lg': '_size-lg_10kfo_101',
    fullWidth: Fb,
    iconLeft: Ib,
    iconRight: Pb,
    label: tS,
  };
function pe({
  label: c,
  variant: s = 'primary',
  size: u = 'md',
  fullWidth: o = !1,
  iconLeft: m,
  iconRight: d,
  disabled: h = !1,
  onClick: g,
  type: y = 'button',
}) {
  return r.jsxs('button', {
    type: y,
    className: [Ml.button, Ml[`variant-${s}`], Ml[`size-${u}`], o ? Ml.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: g,
    'aria-disabled': h,
    children: [
      m != null && r.jsx('span', { className: Ml.iconLeft, 'aria-hidden': 'true', children: m }),
      r.jsx('span', { className: Ml.label, children: c }),
      d != null && r.jsx('span', { className: Ml.iconRight, 'aria-hidden': 'true', children: d }),
    ],
  });
}
const eS = '_overlay_1i1z1_12',
  aS = '_fullscreen_1i1z1_21',
  lS = '_absolute_1i1z1_27',
  nS = '_alignCenter_1i1z1_33',
  iS = '_alignTop_1i1z1_38',
  cS = '_alignBottom_1i1z1_44',
  sS = '_content_1i1z1_50',
  Dl = {
    overlay: eS,
    fullscreen: aS,
    absolute: lS,
    alignCenter: nS,
    alignTop: iS,
    alignBottom: cS,
    content: sS,
  },
  uS = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Zh = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  oS = { center: Dl.alignCenter, top: Dl.alignTop, bottom: Dl.alignBottom };
function Ns({
  fullscreen: c = !0,
  children: s,
  onClose: u,
  dismissible: o = !0,
  dimLevel: m = 'normal',
  blur: d = 0,
  align: h = 'center',
  zIndex: g = 'overlay',
  style: y,
  open: _,
}) {
  const b = () => {
      o && u && u();
    },
    E = (V) => {
      V.stopPropagation();
    },
    j = uS[m],
    H = typeof g == 'number' ? g : (Zh[g] ?? Zh.overlay),
    R = {
      background: `rgba(2, 4, 10, ${j})`,
      zIndex: H,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...y,
    };
  return r.jsx('div', {
    className: [Dl.overlay, c ? Dl.fullscreen : Dl.absolute, oS[h]].join(' '),
    style: R,
    onClick: b,
    role: 'presentation',
    'aria-modal': 'true',
    children: r.jsx('div', { className: Dl.content, onClick: E, children: s }),
  });
}
const rS = '_wrapper_131tr_1',
  fS = '_disabled_131tr_5',
  dS = '_input_131tr_18',
  rs = {
    wrapper: rS,
    disabled: fS,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: dS,
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
      y = (b) => {
        h || m(parseFloat(b.target.value));
      },
      _ = { '--slider-fill-pct': `${g}%` };
    return r.jsx('div', {
      className: [rs.wrapper, rs[`color-${d}`], h ? rs.disabled : ''].join(' '),
      style: _,
      children: r.jsx('input', {
        type: 'range',
        className: rs.input,
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
  mS = '_dialog_49iek_13',
  hS = '_card_49iek_20',
  vS = '_titleRow_49iek_27',
  gS = '_titleIcon_49iek_33',
  yS = '_title_49iek_27',
  _S = '_message_49iek_46',
  pS = '_actions_49iek_50',
  bS = '_variantDanger_49iek_57',
  il = {
    dialog: mS,
    card: hS,
    titleRow: vS,
    titleIcon: gS,
    title: yS,
    message: _S,
    actions: pS,
    variantDanger: bS,
  };
function b0({
  open: c,
  title: s,
  message: u,
  iconName: o,
  confirmLabel: m = '確定',
  cancelLabel: d = 'キャンセル',
  onConfirm: h,
  onCancel: g,
  variant: y = 'default',
}) {
  return c
    ? r.jsx(Ns, {
        open: c,
        onClose: g,
        dismissible: !0,
        children: r.jsx('div', {
          className: [il.dialog, y === 'danger' ? il.variantDanger : ''].filter(Boolean).join(' '),
          children: r.jsxs(ul, {
            variant: 'elevated',
            padding: 'lg',
            className: il.card,
            children: [
              r.jsxs('div', {
                className: il.titleRow,
                children: [
                  o != null &&
                    r.jsx('span', {
                      className: il.titleIcon,
                      'aria-hidden': 'true',
                      children: r.jsx(Mt, {
                        name: o,
                        size: 20,
                        color: y === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  r.jsx(q, { variant: 'heading-3', as: 'h2', className: il.title, children: s }),
                ],
              }),
              u != null &&
                u.length > 0 &&
                r.jsx(q, { variant: 'body', color: 'mid', className: il.message, children: u }),
              r.jsxs('div', {
                className: il.actions,
                children: [
                  r.jsx(pe, { label: d, variant: 'ghost', fullWidth: !0, onClick: g }),
                  r.jsx(pe, {
                    label: m,
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
function SS({
  open: c,
  bgmVolume: s,
  seVolume: u,
  onBgmChange: o,
  onSeChange: m,
  onRetreat: d,
  onClose: h,
}) {
  const [g, y] = dt.useState(!1);
  if (!c) return null;
  const _ = () => {
      y(!0);
    },
    b = () => {
      (y(!1), d());
    },
    E = () => {
      y(!1);
    };
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx(Ns, {
        open: c,
        onClose: h,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !g,
        children: r.jsxs(ul, {
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
                r.jsx(pe, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: _ }),
                r.jsx(pe, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: h }),
              ],
            }),
          ],
        }),
      }),
      r.jsx(b0, {
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
const xS = '_card_1fzt0_2',
  jS = '_header_1fzt0_14',
  TS = '_statusText_1fzt0_19',
  AS = '_section_1fzt0_23',
  NS = '_sectionTitle_1fzt0_29',
  ES = '_statsGrid_1fzt0_35',
  zS = '_statItem_1fzt0_41',
  MS = '_rewardList_1fzt0_52',
  CS = '_rewardCurrency_1fzt0_58',
  wS = '_patchList_1fzt0_66',
  OS = '_patchItem_1fzt0_72',
  DS = '_actions_1fzt0_87',
  Jt = {
    card: xS,
    header: jS,
    statusText: TS,
    section: AS,
    sectionTitle: NS,
    statsGrid: ES,
    statItem: zS,
    rewardList: MS,
    rewardCurrency: CS,
    patchList: wS,
    patchItem: OS,
    actions: DS,
  },
  RS = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  BS = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function LS(c) {
  const s = Math.floor(c / 60),
    u = Math.floor(c % 60);
  return `${s.toString().padStart(2, '0')}:${u.toString().padStart(2, '0')}`;
}
function HS({
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
  const y = RS[s],
    _ = BS[s];
  return r.jsx(Ns, {
    open: c,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: r.jsxs(ul, {
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
            children: y,
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
                    r.jsx(q, { variant: 'numeric-m', color: 'primary', children: LS(d) }),
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
                  children: r.jsx(qi, { currency: 'bolt', value: h.bolt, size: 'lg' }),
                }),
                r.jsx('div', {
                  className: Jt.rewardCurrency,
                  children: r.jsx(qi, { currency: 'alloy', value: h.alloy, size: 'lg' }),
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
          children: r.jsx(pe, {
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
const qS = [
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
function Xh(c) {
  return 1 + 0.1 * c;
}
function US(c, s, u) {
  let o = 0;
  for (let m = 0; m < u; m++) o += _r(c, s + m);
  return o;
}
function GS(c, s, u) {
  let o = At.ZERO,
    m = 0;
  for (;;) {
    const d = At.fromNumber(_r(c, s + m)),
      h = o.add(d);
    if (h.gt(u) || ((o = h), m++, m >= 1e4)) break;
  }
  return { lvDelta: m, totalCost: o };
}
const VS = '_inner_1ld24_2',
  $S = '_grid_1ld24_7',
  Qh = { inner: VS, grid: $S },
  YS = '_sheet_k47pw_38',
  kS = '_edgeBottom_k47pw_43',
  ZS = '_content_k47pw_49',
  XS = '_edgeTop_k47pw_55',
  QS = '_edgeSide_k47pw_66',
  KS = '_edgeAll_k47pw_80',
  JS = '_paddingSm_k47pw_95',
  WS = '_paddingMd_k47pw_99',
  FS = '_paddingLg_k47pw_103',
  IS = '_backdrop_k47pw_108',
  ia = {
    sheet: YS,
    edgeBottom: kS,
    content: ZS,
    edgeTop: XS,
    edgeSide: QS,
    edgeAll: KS,
    paddingSm: JS,
    paddingMd: WS,
    paddingLg: FS,
    backdrop: IS,
  },
  PS = '_container_9k8su_1',
  tx = '_handle_9k8su_13',
  ex = '_dragging_9k8su_21',
  Io = { container: PS, handle: tx, dragging: ex };
function S0({ className: c, dragging: s, width: u, onPointerDown: o }) {
  return r.jsx('div', {
    className: [Io.container, c].filter(Boolean).join(' '),
    'aria-hidden': 'true',
    onPointerDown: o,
    children: r.jsx('span', {
      className: [Io.handle, s ? Io.dragging : ''].filter(Boolean).join(' '),
      style: u !== void 0 ? { width: `${u}px` } : void 0,
    }),
  });
}
const ax = { none: '', sm: ia.paddingSm, md: ia.paddingMd, lg: ia.paddingLg };
function lx({
  open: c,
  children: s,
  onClose: u,
  edge: o,
  position: m,
  withHandle: d,
  padding: h = 'none',
  style: g,
}) {
  const y = o ?? 'bottom',
    _ = { bottom: ia.edgeBottom, top: ia.edgeTop, side: ia.edgeSide, all: ia.edgeAll }[y],
    b = ax[h];
  return r.jsxs('div', {
    className: [ia.sheet, _].filter(Boolean).join(' '),
    role: 'dialog',
    'aria-modal': 'true',
    style: g,
    children: [
      u && r.jsx('div', { className: ia.backdrop, onClick: u, 'aria-hidden': 'true' }),
      r.jsxs('div', {
        className: [ia.content, b].filter(Boolean).join(' '),
        children: [d && y === 'bottom' && r.jsx(S0, {}), s],
      }),
    ],
  });
}
function nx({ open: c, screw: s, levels: u, onUpgrade: o, onClose: m }) {
  return c
    ? r.jsxs(lx, {
        open: c,
        onClose: m,
        edge: 'bottom',
        children: [
          r.jsx(S0, {}),
          r.jsx('div', {
            className: Qh.inner,
            children: r.jsx('div', {
              className: Qh.grid,
              children: qS.map((d) => {
                const h = u[d.key],
                  g = Xh(h),
                  y = Xh(h + 1),
                  _ = _r(d, h),
                  b = US(d, h, 5),
                  { totalCost: E, lvDelta: j } = GS(d, h, s),
                  H = At.fromNumber(_),
                  R = At.fromNumber(b),
                  V = s.gte(H),
                  U = s.gte(R),
                  st = j > 0;
                return r.jsx(
                  hr,
                  {
                    title: d.title,
                    iconName: d.iconName,
                    currentLabel: `Lv ${h}`,
                    before: Math.round(g * 10) / 10,
                    after: Math.round(y * 10) / 10,
                    beforeSuffix: '×',
                    currency: 'screw',
                    accent: 'warning',
                    options: [
                      { amount: '+1', cost: H, disabled: !V },
                      { amount: '+5', cost: R, disabled: !U },
                      { amount: 'MAX', cost: E, disabled: !st },
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
const ix = '_fxContainer_rlbsy_2',
  cx = { fxContainer: ix },
  Po = [
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
function sx({ items: c = [], showTower: s = !1, towerContent: u = null, cycleSeconds: o = 24 }) {
  const d = `ssfx-${dt.useId().replace(/:/g, '')}`,
    h = Po.map((E, j) => {
      const H = 100 / E.length,
        R = E.map(([V, U], st) => {
          const F = st * H;
          return `
          ${F}%               { left: ${V}%; top: ${U}%; opacity: 0; }
          ${(F + 3).toFixed(2)}%   { left: ${V}%; top: ${U}%; opacity: 1; }
          ${(F + H - 7).toFixed(2)}%  { left: ${V}%; top: ${U}%; opacity: 1; }
          ${(F + H - 3).toFixed(2)}%  { left: ${V}%; top: ${U}%; opacity: 0; }
        `;
        }).join('');
      return `@keyframes ${d}-drift-${j + 1} { ${R} 100% { opacity: 0; } }`;
    }).join(`
`),
    g = Po.map(
      (E, j) => `.${d}-p${j + 1} { animation: ${d}-drift-${j + 1} ${o}s linear infinite; }`
    ).join(`
`),
    y = `
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
      r.jsx('style', { dangerouslySetInnerHTML: { __html: y } }),
      b.map((E, j) => {
        const H = (j % Po.length) + 1,
          R = -(j * (o / Math.max(b.length, 1)));
        return r.jsx(
          'div',
          {
            className: `${d}-slot ${d}-p${H}${j === 0 ? ` ${d}-rm-show` : ''}`,
            style: { animationDelay: `${R}s` },
            children: E,
          },
          j
        );
      }),
    ],
  });
}
function ux({ open: c, onClose: s }) {
  return c
    ? r.jsx(Ns, {
        open: c,
        onClose: s,
        dimLevel: 'heavy',
        dismissible: !0,
        align: 'center',
        children: r.jsx('div', {
          className: cx.fxContainer,
          onClick: (u) => {
            (u.stopPropagation(), s());
          },
          role: 'button',
          'aria-label': 'スクリーンセーバーを終了',
          tabIndex: 0,
          onKeyDown: (u) => {
            (u.key === 'Enter' || u.key === ' ') && s();
          },
          children: r.jsx(sx, { showTower: !0 }),
        }),
      })
    : null;
}
const ox = 30,
  rx = 30,
  fx = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 };
function dx(c, s) {
  return c && s <= 0 ? 'gameover' : null;
}
function mx() {
  const { navigate: c } = Ma(),
    s = X((tt) => tt.isRunActive),
    u = X((tt) => tt.screw),
    o = X((tt) => tt.machineHp),
    m = X((tt) => tt.machineMaxHp),
    d = X((tt) => tt.currentTier),
    h = X((tt) => tt.currentWave),
    g = X((tt) => tt.currentWeapon),
    y = X((tt) => tt.activeCdSec),
    _ = X((tt) => tt.isAutoActive),
    b = X((tt) => tt.gameSpeed),
    E = X((tt) => tt.bgmVolume),
    j = X((tt) => tt.seVolume),
    H = X((tt) => tt.setBgmVolume),
    R = X((tt) => tt.setSeVolume),
    V = X((tt) => tt.setAutoActive),
    U = X((tt) => tt.switchWeapon),
    [st, F] = dt.useState(!1),
    [yt, Yt] = dt.useState(!1),
    [ae, Rt] = dt.useState(!1),
    [lt, Zt] = dt.useState(!1),
    [re, se] = dt.useState(b),
    [Bt, Xt] = dt.useState(fx),
    [ke] = dt.useState([]),
    [we] = dt.useState([]),
    [le] = dt.useState([]),
    w = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    G = dx(s, o),
    [W, _t] = dt.useState(null),
    pt = W ?? G,
    x = pt !== null,
    L = At.fromNumber(o),
    $ = At.fromNumber(m > 0 ? m : 1),
    k = (tt) => {
      se(tt);
    },
    I = () => {
      Zt((tt) => !tt);
    },
    nt = () => {
      Yt(!0);
    },
    mt = () => {
      Rt(!0);
    },
    Wt = () => {
      (Yt(!1), _t('retreat'));
    },
    wt = () => {
      c('preparation');
    },
    ol = (tt, ql) => {
      Xt((ki) => ({ ...ki, [tt]: ki[tt] + (ql === 'max' ? 1 : ql) }));
    },
    Ll = { bolt: At.ZERO, alloy: At.ZERO, patches: [] },
    Hl = 30;
  return r.jsxs('div', {
    className: $h.root,
    children: [
      r.jsx(Bl, {
        noScroll: !0,
        variant: 'battle',
        header: r.jsx(Vb, {
          hpCurrent: L,
          hpMax: $,
          tier: d,
          wave: h,
          totalWaves: Hl,
          secondsRemaining: 30,
          secondsTotal: 30,
          isBossWave: h === Hl,
        }),
        footer: r.jsx(Tb, {
          screw: u,
          equippedWeapon: g,
          weaponCds: w,
          activeCd: y,
          activeMax: ox,
          isAutoActive: _,
          onSwitchWeapon: U,
          onActivate: () => {},
          onToggleAuto: V,
          gameSpeed: re,
          onSpeedChange: k,
          isPaused: lt,
          onTogglePause: I,
          onOpenMenu: nt,
          onOpenScreenSaver: mt,
        }),
        children: r.jsx(z2, {
          enemies: [],
          damageEvents: ke,
          hitEvents: we,
          deathEvents: le,
          range: rx,
        }),
      }),
      r.jsxs('div', {
        className: $h.overlayLayer,
        'aria-live': 'polite',
        children: [
          r.jsx(nx, {
            open: st,
            screw: u,
            levels: Bt,
            onUpgrade: ol,
            onClose: () => {
              F(!1);
            },
          }),
          r.jsx(SS, {
            open: yt,
            bgmVolume: E,
            seVolume: j,
            onBgmChange: H,
            onSeChange: R,
            onRetreat: Wt,
            onClose: () => {
              Yt(!1);
            },
          }),
          x &&
            r.jsx(HS, {
              open: x,
              status: pt,
              reachedTier: d,
              reachedWave: h,
              killed: 0,
              elapsedSec: 0,
              reward: Ll,
              onClose: wt,
            }),
          r.jsx(ux, {
            open: ae,
            onClose: () => {
              Rt(!1);
            },
          }),
        ],
      }),
    ],
  });
}
const hx = [
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
function Kh(c, s) {
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
function tr(c, s, u) {
  let o = 0;
  for (let m = 0; m < u && !(c.maxLv != null && s + m >= c.maxLv); m++) o += pr(c, s + m);
  return o;
}
function vx(c, s, u) {
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
const gx = '_root_11wsk_3',
  yx = { root: gx };
function _x() {
  const c = X((m) => m.machineLevels),
    s = X((m) => m.bolt),
    u = X((m) => m.incrementMachineLv),
    o = X((m) => m.spendBolt);
  return r.jsx('div', {
    className: yx.root,
    children: hx.map((m) => {
      const d = c[m.key],
        h = m.maxLv != null && d >= m.maxLv,
        g = Kh(m, d),
        y = Kh(m, d + 1),
        _ = (se) => (m.unit === '%' ? Math.round(se * 1e3) / 10 : se),
        b = _(g),
        E = _(y),
        j = pr(m, d),
        H = tr(m, d, 5),
        R = At.fromNumber(j),
        V = At.fromNumber(H),
        U = vx(m, d, s),
        st = m.maxLv != null ? m.maxLv - d : Number.POSITIVE_INFINITY,
        F = Math.min(U, st),
        yt = F > 0 ? tr(m, d, F) : j,
        Yt = At.fromNumber(yt),
        ae = s.lt(R),
        Rt = s.lt(V) || (m.maxLv != null && d + 5 > m.maxLv),
        lt = F < 1,
        Zt = h
          ? []
          : [
              { amount: '+1', cost: R, disabled: ae },
              { amount: '+5', cost: V, disabled: Rt },
              { amount: 'MAX', cost: Yt, disabled: lt },
            ],
        re = (se) => {
          if (h) return;
          let Bt = 0;
          if ((se === '+1' ? (Bt = 1) : se === '+5' ? (Bt = 5) : se === 'MAX' && (Bt = F), Bt < 1))
            return;
          m.maxLv != null && (Bt = Math.min(Bt, m.maxLv - d));
          const Xt = tr(m, d, Bt),
            ke = At.fromNumber(Xt);
          if (o(ke)) for (let le = 0; le < Bt; le++) u(m.key);
        };
      return r.jsx(
        hr,
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
          options: Zt,
          onUpgrade: re,
        },
        m.key
      );
    }),
  });
}
function px() {
  const { navigate: c } = Ma(),
    s = (u) => {
      c(u);
    };
  return r.jsx(Bl, {
    header: r.jsx(Vi, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: r.jsx(Gi, { active: 'machine', onChange: s }),
    children: r.jsx(_x, {}),
  });
}
const bx = () => r.jsx('div', { children: r.jsx('h1', { children: 'Not Found' }) }),
  Sx = '_content_13mwe_1',
  xx = { content: Sx },
  jx = '_root_1vhwd_1',
  Tx = '_header_1vhwd_8',
  Ax = '_slotGrid_1vhwd_14',
  Nx = '_emptyHint_1vhwd_20',
  fs = { root: jx, header: Tx, slotGrid: Ax, emptyHint: Nx },
  Ex = '_wrapper_mat55_2',
  zx = '_card_mat55_6',
  Mx = '_empty_mat55_14',
  Cx = '_emptyContent_mat55_20',
  wx = '_locked_mat55_28',
  Ox = '_lockedContent_mat55_34',
  Dx = '_filled_mat55_43',
  Rx = '_filledContent_mat55_47',
  Bx = '_patchIcon_mat55_53',
  Lx = '_patchInfo_mat55_64',
  Hx = '_patchTop_mat55_72',
  qx = '_patchName_mat55_78',
  Ux = '_patchDetail_mat55_86',
  Gx = '_trigger_mat55_93',
  Vx = '_effect_mat55_99',
  ie = {
    wrapper: Ex,
    card: zx,
    empty: Mx,
    emptyContent: Cx,
    locked: wx,
    lockedContent: Ox,
    filled: Dx,
    filledContent: Rx,
    patchIcon: Bx,
    patchInfo: Lx,
    patchTop: Hx,
    patchName: qx,
    patchDetail: Ux,
    trigger: Gx,
    effect: Vx,
    'size-sm': '_size-sm_mat55_110',
    'size-md': '_size-md_mat55_118',
    'size-lg': '_size-lg_mat55_122',
  };
function x0({ patch: c = null, slotIndex: s, locked: u = !1, size: o = 'md', onClick: m }) {
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
      ? (y) => {
          (y.key === 'Enter' || y.key === ' ') && (y.preventDefault(), m == null || m());
        }
      : void 0,
    'aria-label': d
      ? `Slot ${g}: ${c.name} (Tier ${c.tier})`
      : u
        ? `Slot ${g} (locked)`
        : `Slot ${g} (empty)`,
    children: r.jsxs(ul, {
      variant: 'outline',
      padding: 'sm',
      interactive: h,
      className: ie.card,
      children: [
        u &&
          r.jsxs('div', {
            className: ie.lockedContent,
            children: [
              r.jsx(Mt, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
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
                children: r.jsx(Mt, {
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
                      r.jsx($i, {
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
function $x(c) {
  return Math.min(1 + c, mr);
}
const Yx = {
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
  kx = {
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
  Zx = {
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
function Xx({ overridePatches: c, overrideEquipped: s, overridePatchSlotsLv: u }) {
  const o = X((H) => H.patches),
    m = X((H) => H.equippedPatches),
    d = X((H) => H.machineLevels.patchSlots),
    h = X((H) => H.unequipPatch),
    g = c ?? o,
    y = s ?? m,
    b = $x(u ?? d),
    E = (H) => {
      const R = y.get(H);
      if (!R) return null;
      const V = `${R.name}#${R.tier}`,
        U = g.get(V);
      return {
        patchId: V,
        name: R.name,
        iconName: Yx[R.name] ?? 'spark',
        tier: R.tier,
        trigger: kx[R.name] ?? '常時',
        effect: Zx[R.name] ?? '-',
        count: (U == null ? void 0 : U.count) ?? 0,
      };
    },
    j = (H) => {
      y.get(H) && h(H);
    };
  return r.jsxs('div', {
    className: fs.root,
    children: [
      r.jsxs('div', {
        className: fs.header,
        children: [
          r.jsx(q, { variant: 'heading-3', children: '装着スロット' }),
          r.jsxs(q, { variant: 'caption', color: 'dim', children: [y.size, ' / ', b, ' 装着中'] }),
        ],
      }),
      r.jsx('div', {
        className: fs.slotGrid,
        children: Array.from({ length: mr }, (H, R) => {
          const V = R >= b,
            U = V ? null : E(R);
          return r.jsx(
            x0,
            { slotIndex: R + 1, patch: U, locked: V, size: 'md', onClick: V ? void 0 : () => j(R) },
            R
          );
        }),
      }),
      y.size === 0 &&
        b > 0 &&
        r.jsx(q, {
          variant: 'caption',
          color: 'dim',
          className: fs.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const Qx = '_root_me2q1_1',
  Kx = '_header_me2q1_8',
  Jx = '_grid_me2q1_14',
  Wx = '_empty_me2q1_20',
  Di = { root: Qx, header: Kx, grid: Jx, empty: Wx },
  Fx = '_root_12vm9_2',
  Ix = '_selected_12vm9_13',
  Px = '_merging_12vm9_17',
  t3 = '_locked_12vm9_21',
  e3 = '_disabled_12vm9_26',
  a3 = '_card_12vm9_32',
  l3 = '_iconWrap_12vm9_42',
  n3 = '_name_12vm9_52',
  i3 = '_detail_12vm9_61',
  c3 = '_trigger_12vm9_69',
  s3 = '_effect_12vm9_80',
  u3 = '_count_12vm9_93',
  o3 = '_countZero_12vm9_100',
  r3 = '_mergingBadge_12vm9_105',
  oe = {
    root: Fx,
    selected: Ix,
    merging: Px,
    locked: t3,
    disabled: e3,
    card: a3,
    iconWrap: l3,
    name: n3,
    detail: i3,
    trigger: c3,
    effect: s3,
    count: u3,
    countZero: o3,
    mergingBadge: r3,
    'size-sm': '_size-sm_12vm9_124',
    'size-md': '_size-md_12vm9_133',
    'size-lg': '_size-lg_12vm9_140',
  },
  f3 = { sm: 18, md: 24, lg: 30 },
  Jh = { sm: 32, md: 40, lg: 48 };
function j0({
  name: c,
  iconName: s,
  tier: u,
  count: o,
  trigger: m,
  effect: d,
  selected: h = !1,
  merging: g = !1,
  locked: y = !1,
  disabled: _ = !1,
  size: b = 'md',
  onClick: E,
}) {
  const j = Math.min(Math.max(1, Math.floor(u)), 5),
    H = `var(--c-patch-t${j})`,
    R = E != null && !_ && !y,
    V = h ? { boxShadow: 'var(--glow-cyan-md)' } : g ? { boxShadow: 'var(--glow-purple-md)' } : {};
  return r.jsx('div', {
    className: [
      oe.root,
      h ? oe.selected : '',
      g ? oe.merging : '',
      y ? oe.locked : '',
      _ ? oe.disabled : '',
      oe[`size-${b}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: V,
    onClick: R ? E : void 0,
    role: R ? 'button' : void 0,
    tabIndex: R ? 0 : void 0,
    onKeyDown: R
      ? (U) => {
          (U.key === 'Enter' || U.key === ' ') && (U.preventDefault(), E == null || E());
        }
      : void 0,
    'aria-pressed': R ? h : void 0,
    'aria-disabled': _ || y ? !0 : void 0,
    children: r.jsxs(ul, {
      variant: 'elevated',
      padding: 'sm',
      interactive: R,
      className: oe.card,
      children: [
        r.jsx('div', {
          className: oe.iconWrap,
          style: { width: Jh[b], height: Jh[b], opacity: y ? 0.35 : 1 },
          children: r.jsx(Mt, {
            name: y ? 'close' : s,
            size: f3[b],
            color: y ? 'var(--c-text-disabled)' : H,
          }),
        }),
        r.jsx(q, {
          variant: 'caption',
          color: y ? 'dim' : 'mid',
          className: oe.name,
          children: y ? '???' : c,
        }),
        !y && r.jsx($i, { text: `T${j}`, variant: 'patch-tier', tier: u }),
        b !== 'sm' &&
          !y &&
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
          children: ['×', y ? '?' : o],
        }),
        g && r.jsx('span', { className: oe.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
const d3 = {
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
  m3 = {
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
  h3 = {
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
function v3({ overridePatches: c, overrideEquipped: s, selectedId: u, onSelect: o }) {
  const m = X((b) => b.patches),
    d = X((b) => b.equippedPatches),
    h = c ?? m,
    g = s ?? d,
    y = new Set(Array.from(g.values()).map((b) => b.name)),
    _ = Array.from(h.values());
  return _.length === 0
    ? r.jsx('div', {
        className: Di.root,
        children: r.jsx('div', {
          className: Di.empty,
          children: r.jsx(q, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : r.jsxs('div', {
        className: Di.root,
        children: [
          r.jsxs('div', {
            className: Di.header,
            children: [
              r.jsx(q, { variant: 'heading-3', children: 'パッチ在庫' }),
              r.jsxs(q, { variant: 'caption', color: 'dim', children: [_.length, ' 種類'] }),
            ],
          }),
          r.jsx('div', {
            className: Di.grid,
            children: _.map((b) => {
              const E = `${b.name}#${b.tier}`,
                j = y.has(b.name);
              return r.jsx(
                j0,
                {
                  patchId: E,
                  name: b.name,
                  iconName: d3[b.name] ?? 'spark',
                  tier: b.tier,
                  count: b.count,
                  trigger: m3[b.name] ?? '常時',
                  effect: h3[b.name] ?? '-',
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
const g3 = '_root_rs7q5_1',
  y3 = '_header_rs7q5_8',
  _3 = '_tierControl_rs7q5_14',
  p3 = '_tierStepperRow_rs7q5_24',
  b3 = '_mergeList_rs7q5_30',
  S3 = '_empty_rs7q5_36',
  Mn = { root: g3, header: y3, tierControl: _3, tierStepperRow: p3, mergeList: b3, empty: S3 },
  x3 = '_stepper_1ouvh_1',
  j3 = '_disabled_1ouvh_6',
  T3 = '_btn_1ouvh_11',
  A3 = '_value_1ouvh_38',
  Cn = {
    stepper: x3,
    disabled: j3,
    btn: T3,
    value: A3,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  N3 = ({
    value: c,
    min: s,
    max: u,
    step: o = 1,
    onChange: m,
    size: d = 'md',
    disabled: h = !1,
  }) => {
    const g = c - o >= s,
      y = c + o <= u,
      _ = () => {
        h || !g || m(Math.max(s, c - o));
      },
      b = () => {
        h || !y || m(Math.min(u, c + o));
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
          disabled: h || !y,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  cr = 5,
  E3 = {
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
function z3(c, s) {
  const u = [];
  for (const o of c.values())
    o.tier < s &&
      o.count >= 2 &&
      u.push({ name: o.name, tier: o.tier, count: o.count, iconName: E3[o.name] ?? 'spark' });
  return u.sort((o, m) => o.tier - m.tier || o.name.localeCompare(m.name));
}
function M3(c, s) {
  let u = new Map(c),
    o = !0;
  for (; o; ) {
    o = !1;
    for (const m of Array.from(u.values())) {
      if (m.tier >= s || m.count < 2 || m.tier >= cr) continue;
      const d = `${m.name}#${m.tier}`,
        h = Math.floor(m.count / 2),
        g = m.count % 2,
        y = m.tier + 1,
        _ = `${m.name}#${y}`,
        b = u.get(_),
        E = ((b == null ? void 0 : b.count) ?? 0) + h;
      ((u = new Map(u)),
        g === 0 ? u.delete(d) : u.set(d, { ...m, count: g }),
        u.set(_, { name: m.name, tier: y, count: E }),
        (o = !0));
    }
  }
  return u;
}
function C3({ overridePatches: c }) {
  const s = X((j) => j.patches),
    u = X((j) => j.addPatch),
    o = X((j) => j.consumePatch),
    m = X((j) => j.pruneEmptyPatches),
    d = c ?? s,
    h = Math.max(1, ...Array.from(d.values()).map((j) => j.tier)),
    [g, y] = dt.useState(Math.min(h, cr - 1)),
    _ = z3(d, g + 1),
    b = _.length > 0,
    E = () => {
      if (c) return;
      const j = M3(d, g + 1);
      for (const [H, R] of d) {
        const V = j.get(H),
          U = (V == null ? void 0 : V.count) ?? 0;
        U < R.count && o(R.name, R.tier, R.count - U);
      }
      for (const [H, R] of j) {
        const V = d.get(H),
          U = (V == null ? void 0 : V.count) ?? 0;
        R.count > U && u(R.name, R.tier, R.count - U);
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
              r.jsx(N3, { value: g, min: 1, max: cr - 1, onChange: y }),
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
                    j0,
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
              r.jsx(pe, {
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
const w3 = [
  { key: 'equip', label: '装着' },
  { key: 'inventory', label: '所持' },
  { key: 'merge', label: '合成' },
];
function O3() {
  const { navigate: c } = Ma(),
    [s, u] = dt.useState('equip'),
    o = (m) => {
      c(m);
    };
  return r.jsx(Bl, {
    header: r.jsx(Vi, {
      title: 'パッチ庫',
      currencies: [],
      tabBar: r.jsx(Ss, { tabs: w3, value: s, onChange: u, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(Gi, { active: 'patches', onChange: o }),
    children: r.jsxs('div', {
      className: xx.content,
      children: [
        s === 'equip' && r.jsx(Xx, {}),
        s === 'inventory' && r.jsx(v3, {}),
        s === 'merge' && r.jsx(C3, {}),
      ],
    }),
  });
}
const D3 = '_footer_1ocpp_1',
  R3 = '_tabPanel_1ocpp_6',
  Wh = { footer: D3, tabPanel: R3 },
  B3 = '_wrapper_120xy_1',
  L3 = '_header_120xy_7',
  H3 = '_headerLabel_120xy_13',
  q3 = '_empty_120xy_18',
  U3 = '_emptyIcon_120xy_29',
  G3 = '_grid_120xy_33',
  V3 = '_note_120xy_39',
  Cl = { wrapper: B3, header: L3, headerLabel: H3, empty: q3, emptyIcon: U3, grid: G3, note: V3 },
  $3 = {
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
function Y3({ onOpenPatchScreen: c }) {
  const s = X((h) => h.equippedPatches),
    u = X((h) => h.machineLevels.patchSlots),
    o = Math.min(1 + u, mr),
    m = [];
  for (let h = 0; h < o; h++) {
    const g = s.get(h);
    if (g != null) {
      const y = $3[g.name],
        _ = {
          patchId: `${g.name}#${g.tier}`,
          name: y.name,
          iconName: y.iconName,
          tier: g.tier,
          trigger: y.trigger,
          effect: y.effect,
          count: 1,
        };
      m.push({ kind: 'filled', patch: _, idx: h + 1 });
    } else m.push({ kind: 'empty', patch: null, idx: h + 1 });
  }
  const d = [...s.values()].length;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '装着パッチ',
    className: Cl.wrapper,
    children: [
      r.jsxs('div', {
        className: Cl.header,
        children: [
          r.jsxs(q, {
            variant: 'caption',
            color: 'mid',
            className: Cl.headerLabel,
            children: ['装着 ', d, ' / ', o],
          }),
          c != null &&
            r.jsx(pe, {
              label: '装備変更',
              variant: 'ghost',
              size: 'sm',
              iconRight: r.jsx(Mt, { name: 'chevron-right', size: 14 }),
              onClick: c,
            }),
        ],
      }),
      d === 0
        ? r.jsxs('div', {
            className: Cl.empty,
            children: [
              r.jsx('span', {
                className: Cl.emptyIcon,
                children: r.jsx(Mt, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              r.jsx(q, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              c != null &&
                r.jsx(pe, {
                  label: 'パッチ庫を開く',
                  variant: 'secondary',
                  size: 'sm',
                  onClick: c,
                }),
            ],
          })
        : r.jsx('div', {
            className: Cl.grid,
            children: m.map((h, g) =>
              r.jsx(x0, { patch: h.patch, slotIndex: h.idx, onClick: c }, g)
            ),
          }),
      r.jsx(q, {
        variant: 'caption',
        color: 'dim',
        align: 'center',
        as: 'p',
        className: Cl.note,
        children: '変更はパッチ庫で行えます',
      }),
    ],
  });
}
const k3 = '_wrapper_1c3z0_1',
  Z3 = '_header_1c3z0_7',
  X3 = '_grid_1c3z0_12',
  er = { wrapper: k3, header: Z3, grid: X3 },
  Q3 = [
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
function K3({ selectedWeapon: c, onSelect: s }) {
  const u = X((h) => h.initialWeapon),
    o = X((h) => h.setInitialWeapon),
    m = c ?? u,
    d = (h) => {
      (o(h), s == null || s(h));
    };
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: er.wrapper,
    children: [
      r.jsx('div', {
        className: er.header,
        children: r.jsx(q, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      r.jsx('div', {
        className: er.grid,
        children: Q3.map((h) =>
          r.jsx(
            g0,
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
const J3 = '_wrapper_5dnkb_1',
  W3 = '_sticky_5dnkb_15',
  F3 = '_summary_5dnkb_19',
  I3 = '_weaponInfo_5dnkb_29',
  P3 = '_patchInfo_5dnkb_37',
  Ri = { wrapper: J3, sticky: W3, summary: F3, weaponInfo: I3, patchInfo: P3 };
function t5({
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
          c != null && r.jsx($i, { variant: 'tier', tier: c, size: 'sm' }),
          s != null &&
            r.jsxs('span', {
              className: Ri.weaponInfo,
              children: [
                r.jsx(Mt, { name: s, size: 14 }),
                r.jsx(q, { variant: 'label', color: 'primary', children: s.toUpperCase() }),
              ],
            }),
          r.jsxs('span', {
            className: Ri.patchInfo,
            children: [
              r.jsx(Mt, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              r.jsxs(q, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', u] }),
            ],
          }),
        ],
      }),
      r.jsx(pe, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: o,
        iconLeft: r.jsx(Mt, { name: 'tower', size: 18 }),
        onClick: m,
      }),
    ],
  });
}
const e5 = '_wrapper_1onm1_1',
  a5 = '_header_1onm1_7',
  l5 = '_grid_1onm1_14',
  n5 = '_tierBtn_1onm1_20',
  i5 = '_active_1onm1_35',
  c5 = '_tierLabel_1onm1_50',
  s5 = '_frontierLabel_1onm1_61',
  wl = {
    wrapper: e5,
    header: a5,
    grid: l5,
    tierBtn: n5,
    active: i5,
    tierLabel: c5,
    frontierLabel: s5,
  };
function u5({ selectedTier: c, onSelect: s }) {
  const u = X((h) => h.highestTier),
    o = Math.max(1, u),
    m = [];
  for (let h = 1; h <= o; h++) m.push(h);
  const d = (h) => `var(--c-tier-${Math.max(1, Math.min(10, h))})`;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': 'Tier 選択',
    className: wl.wrapper,
    children: [
      r.jsxs('div', {
        className: wl.header,
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
        className: wl.grid,
        children: m.map((h) => {
          const g = h === c,
            y = h === o,
            _ = d(h);
          return r.jsxs(
            'button',
            {
              type: 'button',
              'aria-pressed': g,
              'data-active': g,
              'data-frontier': y,
              className: [wl.tierBtn, g ? wl.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': _ },
              onClick: () => (s == null ? void 0 : s(h)),
              children: [
                r.jsxs('span', { className: wl.tierLabel, children: ['T', h] }),
                y && !g && r.jsx('span', { className: wl.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            h
          );
        }),
      }),
    ],
  });
}
const o5 = [
  { key: 'tier', label: 'Tier 選択' },
  { key: 'weapon', label: '初期装備武器' },
  { key: 'patches', label: 'パッチ確認' },
];
function r5() {
  const { navigate: c } = Ma(),
    [s, u] = dt.useState('tier'),
    o = X((j) => j.highestTier),
    [m, d] = dt.useState(Math.max(1, o)),
    h = X((j) => j.initialWeapon),
    y = [...X((j) => j.equippedPatches).values()].length;
  function _() {
    c('battle');
  }
  const b = r.jsx(Vi, {
      title: '出撃準備',
      onBack: () => c('title'),
      currencies: ['bolt', 'alloy'],
      tabBar: r.jsx(Ss, { tabs: o5, value: s, onChange: u, variant: 'underline', fullWidth: !0 }),
    }),
    E = r.jsxs('div', {
      className: Wh.footer,
      children: [
        r.jsx(t5, { tier: m, weaponKind: h, patchCount: y, sticky: !1, onLaunch: _ }),
        r.jsx(Gi, { active: 'preparation', onChange: (j) => c(j) }),
      ],
    });
  return r.jsx(Bl, {
    header: b,
    footer: E,
    children: r.jsxs('div', {
      className: Wh.tabPanel,
      children: [
        s === 'tier' && r.jsx(u5, { selectedTier: m, onSelect: d }),
        s === 'weapon' && r.jsx(K3, {}),
        s === 'patches' && r.jsx(Y3, { onOpenPatchScreen: () => c('patches') }),
      ],
    }),
  });
}
const f5 = '_content_iggfi_1',
  d5 = { content: f5 },
  m5 = '_root_1ouw6_1',
  h5 = '_header_1ouw6_8',
  v5 = '_storageCard_1ouw6_13',
  g5 = '_storageRow_1ouw6_23',
  y5 = '_divider_1ouw6_29',
  _5 = '_section_1ouw6_34',
  p5 = '_dangerSection_1ouw6_40',
  b5 = '_sectionHeader_1ouw6_50',
  $e = {
    root: m5,
    header: h5,
    storageCard: v5,
    storageRow: g5,
    divider: y5,
    section: _5,
    dangerSection: p5,
    sectionHeader: b5,
  },
  S5 = '_wrapper_11b89_1',
  x5 = '_disabled_11b89_6',
  j5 = '_hiddenInput_11b89_11',
  T5 = '_btn_11b89_15',
  A5 = '_fileName_11b89_41',
  Bi = { wrapper: S5, disabled: x5, hiddenInput: j5, btn: T5, fileName: A5 },
  N5 = ({
    accept: c = 'application/json',
    onChange: s,
    label: u = 'ファイルを選択',
    disabled: o = !1,
  }) => {
    const m = dt.useRef(null),
      [d, h] = dt.useState(null),
      g = () => {
        var _;
        o || (_ = m.current) == null || _.click();
      },
      y = (_) => {
        var E;
        const b = ((E = _.target.files) == null ? void 0 : E[0]) ?? null;
        (h((b == null ? void 0 : b.name) ?? null), s(b), m.current && (m.current.value = ''));
      };
    return r.jsxs('div', {
      className: [Bi.wrapper, o ? Bi.disabled : ''].join(' '),
      children: [
        r.jsx('input', {
          ref: m,
          type: 'file',
          accept: c,
          className: Bi.hiddenInput,
          onChange: y,
          disabled: o,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        r.jsx('button', {
          type: 'button',
          className: Bi.btn,
          onClick: g,
          disabled: o,
          children: u,
        }),
        d && r.jsx('span', { className: Bi.fileName, title: d, children: d }),
      ],
    });
  };
function E5({ storageInfo: c, onExport: s, onImport: u, onReset: o }) {
  const [m, d] = dt.useState(!1),
    [h, g] = dt.useState(!1),
    [y, _] = dt.useState(!1),
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
          r.jsx(pe, {
            label: y ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: b,
            disabled: y || !s,
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
          r.jsx(N5, {
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
          r.jsx(pe, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => d(!0),
            disabled: !o,
          }),
        ],
      }),
      r.jsx(b0, {
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
const z5 = '_root_sysyb_1',
  M5 = '_header_sysyb_8',
  C5 = '_section_sysyb_13',
  w5 = '_sectionHeader_sysyb_20',
  O5 = '_divider_sysyb_26',
  wn = { root: z5, header: M5, section: C5, sectionHeader: w5, divider: O5 },
  D5 = [
    { label: '×1', value: 1 },
    { label: '×2', value: 2 },
    { label: '×3', value: 3 },
  ];
function R5({ overrideVibration: c, overrideSpeed: s, onVibrationChange: u, onSpeedChange: o }) {
  const m = X((j) => j.vibrationEnabled),
    d = X((j) => j.defaultGameSpeed),
    h = X((j) => j.setVibrationEnabled),
    g = X((j) => j.setDefaultGameSpeed),
    y = c ?? m,
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
        children: r.jsx(yr, {
          checked: y,
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
          r.jsx(p0, { options: D5, value: _, onChange: E }),
        ],
      }),
    ],
  });
}
const B5 = '_root_phr9m_1',
  L5 = '_header_phr9m_8',
  H5 = '_row_phr9m_14',
  q5 = '_divider_phr9m_18',
  U5 = '_sliderSection_phr9m_23',
  G5 = '_sliderHeader_phr9m_29',
  cl = { root: B5, header: L5, row: H5, divider: q5, sliderSection: U5, sliderHeader: G5 };
function V5(c) {
  return 440 * Math.pow(2, (c - 69) / 12);
}
const $5 = {
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
  const u = $5[s[1]];
  if (u === void 0) throw new Error(`Invalid note name: ${s[1]}`);
  const m = 12 + parseInt(s[2], 10) * 12 + u;
  return V5(m);
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
const Y5 = [O('A2'), O('C3'), O('E3')],
  k5 = [O('E2'), O('G2'), O('B2')];
(O('D3'), O('F3'), O('A3'));
const Z5 = [O('G2'), O('B2'), O('D3')],
  X5 = [O('C3'), O('E3'), O('G3')],
  Q5 = [O('B2'), O('D3'), O('F3')];
function Ye(c, s, u, o, m, d, h, g) {
  const y = c.createOscillator(),
    _ = c.createGain();
  ((y.type = u), y.frequency.setValueAtTime(o, m));
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
      y.connect(j).connect(_).connect(s));
  } else y.connect(_).connect(s);
  (y.start(m), y.stop(m + d + 0.02));
}
function Yi(c, s) {
  const u = Math.max(1, Math.floor(c.sampleRate * s)),
    o = c.createBuffer(1, u, c.sampleRate),
    m = o.getChannelData(0);
  let d = 74565;
  for (let h = 0; h < u; h++)
    ((d = (d * 1664525 + 1013904223) & 4294967295), (m[h] = d / 2147483648 - 1));
  return o;
}
function Ui(c, s, u, o) {
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
  h.buffer = Yi(c, 0.04);
  const g = c.createGain(),
    y = c.createBiquadFilter();
  ((y.type = 'highpass'),
    (y.frequency.value = 400),
    g.gain.setValueAtTime(o * 0.3, u),
    g.gain.exponentialRampToValueAtTime(1e-4, u + 0.04),
    h.connect(y).connect(g).connect(s),
    h.start(u));
}
function K5(c, s, u, o, m) {
  const d = c.createBufferSource();
  d.buffer = Yi(c, m + 0.01);
  const h = c.createGain(),
    g = c.createBiquadFilter();
  ((g.type = 'highpass'),
    (g.frequency.value = 6e3),
    h.gain.setValueAtTime(o, u),
    h.gain.exponentialRampToValueAtTime(1e-4, u + m),
    d.connect(g).connect(h).connect(s),
    d.start(u));
}
const J5 = 100,
  Ol = 60 / J5,
  Hi = Ol * 4,
  T0 = 8,
  W5 = Hi * T0,
  F5 = 2,
  I5 = 100,
  P5 = [O('A2'), O('A2'), O('G2'), O('G2'), O('C3'), O('C3'), O('E2'), O('E2')],
  Fh = [O('A3'), O('C4'), O('E4'), O('A4'), O('G4'), O('E4'), O('C4'), O('A3')],
  Ih = [
    [O('A3'), O('C4'), O('E4')],
    [O('G3'), O('B3'), O('D4')],
    [O('C3'), O('E3'), O('G3')],
    [O('E3'), O('G3'), O('B3')],
  ];
function t4(c, s, u, o) {
  for (let m = 0; m < T0; m++) {
    const d = u + m * Hi,
      h = P5[m];
    (Ye(c, s, 'sawtooth', h, d, Ol * 1.8, 0.22, 300),
      Ye(c, s, 'sawtooth', h, d + Ol * 2, Ol * 1.8, 0.22, 300),
      Ui(c, s, d, 0.35),
      Ui(c, s, d + Ol * 2, 0.28));
    for (let g = 0; g < 8; g++) {
      const y = (m * 8 + g) % Fh.length,
        _ = d + g * Ol * 0.5;
      Ye(c, s, 'square', Fh[y], _, Ol * 0.4, 0.07, 2400);
    }
  }
  for (let m = 0; m < Ih.length; m++) {
    const d = Ih[m],
      h = u + m * Hi * 2,
      g = Hi * 2;
    for (const y of d) {
      const _ = c.createOscillator(),
        b = c.createGain();
      ((_.type = 'triangle'), _.frequency.setValueAtTime(y, h));
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
function e4(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + F5 * Hi;
    for (; u < g; ) (t4(c, s, u, m), (u += W5));
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
const a4 = 100,
  Na = 60 / a4,
  br = Na * 4,
  A0 = 8,
  sl = br * A0,
  l4 = 2,
  n4 = 100,
  Ph = [O('E5'), O('D5'), O('B4'), O('G4'), O('F#4'), O('E4'), O('D4'), O('B3')];
function t0(c, s, u, o) {
  const m = c.createBufferSource();
  m.buffer = Yi(c, 0.2);
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
function i4(c, s, u, o) {
  {
    const d = c.createOscillator(),
      h = c.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(O('E1'), u));
    const g = 0.35;
    (h.gain.setValueAtTime(1e-4, u),
      h.gain.linearRampToValueAtTime(g, u + 0.3),
      h.gain.setValueAtTime(g, u + sl - 0.3),
      h.gain.linearRampToValueAtTime(1e-4, u + sl));
    const y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 120),
      d.connect(y).connect(h).connect(s),
      d.start(u),
      d.stop(u + sl + 0.05),
      o.push(d));
  }
  for (let d = 0; d < A0; d++) {
    const h = u + d * br;
    for (let g = 0; g < 4; g++) {
      const y = h + g * Na;
      (Ye(c, s, 'sawtooth', O('E2'), y, Na * 0.9, 0.22, 400),
        Ye(c, s, 'sawtooth', O('B2'), y, Na * 0.8, 0.1, 600));
    }
    (Ui(c, s, h, 0.5),
      Ui(c, s, h + Na * 2, 0.45),
      t0(c, s, h + Na, 0.4),
      t0(c, s, h + Na * 3, 0.38));
  }
  const m = [...Q5, O('C4')];
  for (const d of m) {
    const h = c.createOscillator(),
      g = c.createGain();
    ((h.type = 'sawtooth'), h.frequency.setValueAtTime(d, u));
    const y = 0.07;
    (g.gain.setValueAtTime(1e-4, u),
      g.gain.linearRampToValueAtTime(y, u + 0.8),
      g.gain.setValueAtTime(y, u + sl - 0.8),
      g.gain.exponentialRampToValueAtTime(1e-4, u + sl));
    const _ = c.createBiquadFilter();
    ((_.type = 'lowpass'),
      (_.frequency.value = 900),
      h.connect(_).connect(g).connect(s),
      h.start(u),
      h.stop(u + sl + 0.05),
      o.push(h));
  }
  for (let d = 0; d < Ph.length; d++) {
    const h = u + d * Na * 2;
    Ye(c, s, 'sawtooth', Ph[d], h, Na * 1.6, 0.08, 2e3);
  }
  {
    const d = c.createBufferSource();
    d.buffer = Yi(c, sl + 0.1);
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
function c4(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + l4 * br;
    for (; u < g; ) (i4(c, s, u, m), (u += sl));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, n4)));
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
const s4 = 120,
  Ea = 60 / s4,
  Sr = Ea * 4,
  N0 = 8,
  hs = Sr * N0,
  u4 = 2,
  o4 = 100,
  r4 = [O('E2'), O('E2'), O('D2'), O('D2'), O('E2'), O('E2'), O('B1'), O('B1')],
  e0 = [
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
function a0(c, s, u, o) {
  const m = c.createBufferSource();
  m.buffer = Yi(c, 0.15);
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
function f4(c, s, u, o) {
  for (let d = 0; d < N0; d++) {
    const h = u + d * Sr,
      g = r4[d];
    for (let y = 0; y < 4; y++) Ye(c, s, 'sawtooth', g, h + y * Ea, Ea * 0.85, 0.26, 280);
    for (let y = 0; y < 4; y++) Ui(c, s, h + y * Ea, 0.42);
    (a0(c, s, h + Ea, 0.3), a0(c, s, h + Ea * 3, 0.3));
    for (let y = 0; y < 8; y++) K5(c, s, h + y * Ea * 0.5, 0.12, 0.08);
    for (let y = 0; y < 16; y++) {
      const _ = (d * 16 + y) % e0.length,
        b = h + y * Ea * 0.25;
      Ye(c, s, 'sawtooth', e0[_], b, Ea * 0.22, 0.06, 3200);
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
      g.gain.setValueAtTime(0.06, u + hs - 0.3),
      g.gain.exponentialRampToValueAtTime(1e-4, u + hs));
    const y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 1200),
      h.connect(y).connect(g).connect(s),
      h.start(u),
      h.stop(u + hs + 0.05),
      o.push(h));
  }
}
function d4(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + u4 * Sr;
    for (; u < g; ) (f4(c, s, u, m), (u += hs));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, o4)));
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
const m4 = 80,
  vs = 60 / m4,
  bs = vs * 4,
  h4 = 8,
  gs = bs * h4,
  v4 = 2,
  g4 = 100,
  l0 = [Y5, X5, Z5, k5],
  ar = [O('A3'), O('C4'), O('E4'), O('G4'), O('A4'), O('E4')];
function y4(c, s, u, o) {
  {
    const m = c.createOscillator(),
      d = c.createGain();
    ((m.type = 'sine'), m.frequency.setValueAtTime(O('A2'), u));
    const h = 0.28;
    (d.gain.setValueAtTime(1e-4, u),
      d.gain.linearRampToValueAtTime(h, u + 0.5),
      d.gain.setValueAtTime(h, u + gs - 0.5),
      d.gain.linearRampToValueAtTime(1e-4, u + gs));
    const g = c.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 180),
      m.connect(g).connect(d).connect(s),
      m.start(u),
      m.stop(u + gs + 0.05),
      o.push(m));
  }
  for (let m = 0; m < l0.length; m++) {
    const d = l0[m],
      h = u + m * bs * 2,
      g = bs * 2;
    for (const y of d) {
      const _ = c.createOscillator(),
        b = c.createGain();
      ((_.type = 'triangle'), _.frequency.setValueAtTime(y, h));
      const E = 0.1,
        j = 0.4,
        H = 0.6;
      (b.gain.setValueAtTime(1e-4, h),
        b.gain.linearRampToValueAtTime(E, h + j),
        b.gain.setValueAtTime(E, h + g - H),
        b.gain.exponentialRampToValueAtTime(1e-4, h + g));
      const R = c.createDelay(0.5);
      R.delayTime.value = 0.25;
      const V = c.createGain();
      V.gain.value = 0.2;
      const U = c.createBiquadFilter();
      ((U.type = 'lowpass'),
        (U.frequency.value = 2e3),
        _.connect(b).connect(s),
        _.connect(R).connect(U).connect(V).connect(s),
        _.start(h),
        _.stop(h + g + 0.5),
        o.push(_));
    }
  }
  for (let m = 0; m < ar.length; m++) {
    const d = u + m * vs * 2;
    (Ye(c, s, 'sawtooth', ar[m], d, vs * 1.5, 0.09, 1800),
      Ye(c, s, 'sine', ar[m] * 0.5, d + 0.12, vs * 1.2, 0.05, 600));
  }
}
function _4(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + v4 * bs;
    for (; u < g; ) (y4(c, s, u, m), (u += gs));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, g4)));
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
function p4(c, s, u) {
  switch (c) {
    case 'title':
      return _4(s, u);
    case 'base':
      return e4(s, u);
    case 'battleNormal':
      return d4(s, u);
    case 'battleBoss':
      return c4(s, u);
  }
}
function b4(c, s) {
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
function rt(c, s, u, o, m, d, h, g, y) {
  const _ = c.createOscillator(),
    b = c.createGain();
  ((_.type = u),
    _.frequency.setValueAtTime(o, m),
    y !== void 0 && _.frequency.exponentialRampToValueAtTime(Math.max(1e-4, y), m + h + g),
    Ie(b, m, d, h, g),
    _.connect(b).connect(s),
    _.start(m),
    _.stop(m + h + g + 0.02));
}
function Pe(c, s, u, o, m, d) {
  const h = c.createBufferSource();
  h.buffer = b4(c, u);
  const g = c.createGain();
  if ((Ie(g, o, m, 0.002, u), d)) {
    const y = c.createBiquadFilter();
    ((y.type = d.type),
      (y.frequency.value = d.frequency),
      d.q !== void 0 && (y.Q.value = d.q),
      h.connect(y).connect(g).connect(s));
  } else h.connect(g).connect(s);
  h.start(o);
}
const S4 = (c, s, u) => {
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
  x4 = (c, s, u) => {
    for (let o = 0; o < 4; o++) {
      const m = u + o * 0.12;
      (rt(c, s, 'sine', 110, m, 0.4, 0.005, 0.18, 35),
        Pe(c, s, 0.08, m, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  j4 = (c, s, u) => {
    (Pe(c, s, 0.4, u, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      rt(c, s, 'triangle', 3e3, u, 0.25, 0.005, 0.15, 1500),
      rt(c, s, 'sawtooth', 200, u + 0.05, 0.18, 0.005, 0.3, 80));
  },
  T4 = (c, s, u) => {
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
  A4 = (c, s, u) => {
    (Pe(c, s, 0.1, u, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      rt(c, s, 'triangle', 500, u, 0.18, 0.003, 0.08, 200));
  },
  N4 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(80, u),
      o.frequency.linearRampToValueAtTime(160, u + 0.8),
      Ie(m, u, 0.3, 0.1, 0.7),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.85),
      rt(c, s, 'square', 320, u + 0.2, 0.15, 0.02, 0.4));
  },
  E4 = (c, s, u) => {
    (Pe(c, s, 0.5, u, 0.45, { type: 'lowpass', frequency: 1200 }),
      rt(c, s, 'sine', 90, u, 0.5, 0.005, 0.6, 30),
      rt(c, s, 'triangle', 1200, u + 0.1, 0.2, 0.02, 0.4, 2400),
      rt(c, s, 'triangle', 1600, u + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  z4 = (c, s, u) => {
    (rt(c, s, 'sine', 180, u, 0.3, 0.005, 0.12, 60),
      Pe(c, s, 0.08, u, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  M4 = (c, s, u) => {
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
  C4 = (c, s, u) => {
    (rt(c, s, 'triangle', 700, u, 0.22, 0.01, 0.18),
      rt(c, s, 'triangle', 1050, u + 0.12, 0.22, 0.01, 0.22));
  },
  w4 = (c, s, u) => {
    (rt(c, s, 'triangle', 600, u, 0.25, 0.01, 0.2),
      rt(c, s, 'triangle', 900, u + 0.12, 0.25, 0.01, 0.2),
      rt(c, s, 'triangle', 1350, u + 0.24, 0.3, 0.01, 0.45),
      rt(c, s, 'sine', 2400, u + 0.3, 0.15, 0.02, 0.5));
  },
  O4 = (c, s, u) => {
    (rt(c, s, 'triangle', 600, u, 0.28, 0.01, 0.18),
      rt(c, s, 'triangle', 750, u + 0.12, 0.28, 0.01, 0.18),
      rt(c, s, 'triangle', 900, u + 0.24, 0.28, 0.01, 0.22),
      rt(c, s, 'triangle', 1200, u + 0.36, 0.32, 0.01, 0.5),
      rt(c, s, 'sine', 2400, u + 0.42, 0.18, 0.02, 0.6));
  },
  D4 = (c, s, u) => {
    (rt(c, s, 'sawtooth', 300, u, 0.3, 0.02, 0.4, 220),
      rt(c, s, 'sawtooth', 220, u + 0.35, 0.3, 0.02, 0.5, 160),
      rt(c, s, 'sawtooth', 160, u + 0.8, 0.3, 0.02, 0.7, 80),
      Pe(c, s, 1, u, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  R4 = (c, s, u) => {
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
  B4 = (c, s, u) => {
    rt(c, s, 'triangle', 1e3, u, 0.18, 0.003, 0.05);
  },
  L4 = (c, s, u) => {
    (rt(c, s, 'triangle', 880, u, 0.2, 0.005, 0.08),
      rt(c, s, 'triangle', 1320, u + 0.06, 0.2, 0.005, 0.12));
  },
  H4 = (c, s, u) => {
    (rt(c, s, 'square', 260, u, 0.18, 0.005, 0.07),
      rt(c, s, 'square', 200, u + 0.06, 0.18, 0.005, 0.1));
  },
  q4 = (c, s, u) => {
    rt(c, s, 'triangle', 1400, u, 0.12, 0.003, 0.04);
  },
  U4 = (c, s, u) => {
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
  G4 = (c, s, u) => {
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
  V4 = (c, s, u) => {
    (rt(c, s, 'sawtooth', 200, u, 0.3, 0.01, 0.35, 80),
      rt(c, s, 'triangle', 600, u + 0.05, 0.22, 0.01, 0.3, 1200),
      rt(c, s, 'triangle', 1200, u + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  $4 = (c, s, u) => {
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
  Y4 = (c, s, u) => {
    (rt(c, s, 'sine', 130, u, 0.5, 0.01, 0.28, 40),
      Pe(c, s, 0.12, u, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  k4 = (c, s, u) => {
    (Pe(c, s, 0.18, u, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      rt(c, s, 'triangle', 2200, u, 0.15, 0.002, 0.06, 1800));
  },
  Z4 = (c, s, u) => {
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
  X4 = (c, s, u) => {
    (rt(c, s, 'triangle', 700, u, 0.18, 0.005, 0.05),
      rt(c, s, 'triangle', 1050, u + 0.04, 0.18, 0.005, 0.06));
  },
  Q4 = {
    laserShoot: $4,
    cannonShoot: Y4,
    thunderShoot: k4,
    cutterShoot: Z4,
    weaponSwitch: X4,
    activeLaser: S4,
    activeCannon: x4,
    activeThunder: j4,
    activeCutter: T4,
    enemyKill: A4,
    bossWarn: N4,
    bossKill: E4,
    machineHit: z4,
    machineDown: M4,
    waveClear: C4,
    tierClear: w4,
    tap: B4,
    purchaseOk: L4,
    reject: H4,
    tabSwitch: q4,
    dialogOpen: U4,
    dialogClose: G4,
    launch: V4,
    resultClear: O4,
    resultGameOver: D4,
    resultRetreat: R4,
  },
  K4 = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function n0(c) {
  return Math.max(0, Math.min(1, c));
}
class J4 {
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
      o = K4[s];
    if (o !== void 0) {
      const d = this.lastPlayAt.get(s) ?? 0;
      if (u - d < o) return;
      this.lastPlayAt.set(s, u);
    }
    const m = Q4[s];
    m(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(s) {
    ((this.seVolume = n0(s)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(s) {
    ((this.bgmVolume = n0(s)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
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
    const u = p4(s, this.ctx, this.bgmGain);
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
const ds = new J4();
function W4({
  overrideBgmVolume: c,
  overrideSeVolume: s,
  overrideMute: u,
  onBgmChange: o,
  onSeChange: m,
  onMuteChange: d,
}) {
  const h = X((U) => U.bgmVolume),
    g = X((U) => U.seVolume),
    y = X((U) => U.setBgmVolume),
    _ = X((U) => U.setSeVolume),
    b = c ?? h,
    E = s ?? g,
    j = u ?? !1,
    H = (U) => {
      o ? o(U) : (y(U), ds.setBgmVolume(j ? 0 : U));
    },
    R = (U) => {
      m ? m(U) : (_(U), ds.setSeVolume(j ? 0 : U));
    },
    V = (U) => {
      d ? d(U) : (ds.setBgmVolume(U ? 0 : b), ds.setSeVolume(U ? 0 : E));
    };
  return r.jsxs('div', {
    className: cl.root,
    children: [
      r.jsx('div', {
        className: cl.header,
        children: r.jsx(q, { variant: 'heading-3', children: 'サウンド設定' }),
      }),
      r.jsx('div', {
        className: cl.row,
        children: r.jsx(yr, {
          checked: j,
          onChange: V,
          label: '全体ミュート',
          description: 'すべての音を無効にします',
        }),
      }),
      r.jsx('div', { className: cl.divider }),
      r.jsxs('div', {
        className: cl.sliderSection,
        children: [
          r.jsxs('div', {
            className: cl.sliderHeader,
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
        className: cl.sliderSection,
        children: [
          r.jsxs('div', {
            className: cl.sliderHeader,
            children: [
              r.jsx(q, { variant: 'label', color: j ? 'dim' : 'mid', children: 'SE' }),
              r.jsx(q, {
                variant: 'numeric-l',
                color: j ? 'dim' : 'default',
                children: Math.round(E * 100),
              }),
            ],
          }),
          r.jsx(ps, { value: E, min: 0, max: 1, step: 0.01, onChange: R, disabled: j }),
        ],
      }),
    ],
  });
}
const sr = (c, s) => s.some((u) => c instanceof u);
let i0, c0;
function F4() {
  return i0 || (i0 = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function I4() {
  return (
    c0 ||
    (c0 = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const ur = new WeakMap(),
  lr = new WeakMap(),
  Es = new WeakMap();
function P4(c) {
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
  return (Es.set(s, c), s);
}
function tj(c) {
  if (ur.has(c)) return;
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
  ur.set(c, s);
}
let or = {
  get(c, s, u) {
    if (c instanceof IDBTransaction) {
      if (s === 'done') return ur.get(c);
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
function E0(c) {
  or = c(or);
}
function ej(c) {
  return I4().includes(c)
    ? function (...s) {
        return (c.apply(rr(this), s), Rl(this.request));
      }
    : function (...s) {
        return Rl(c.apply(rr(this), s));
      };
}
function aj(c) {
  return typeof c == 'function'
    ? ej(c)
    : (c instanceof IDBTransaction && tj(c), sr(c, F4()) ? new Proxy(c, or) : c);
}
function Rl(c) {
  if (c instanceof IDBRequest) return P4(c);
  if (lr.has(c)) return lr.get(c);
  const s = aj(c);
  return (s !== c && (lr.set(c, s), Es.set(s, c)), s);
}
const rr = (c) => Es.get(c);
function lj(c, s, { blocked: u, upgrade: o, blocking: m, terminated: d } = {}) {
  const h = indexedDB.open(c, s),
    g = Rl(h);
  return (
    o &&
      h.addEventListener('upgradeneeded', (y) => {
        o(Rl(h.result), y.oldVersion, y.newVersion, Rl(h.transaction), y);
      }),
    u && h.addEventListener('blocked', (y) => u(y.oldVersion, y.newVersion, y)),
    g
      .then((y) => {
        (d && y.addEventListener('close', () => d()),
          m && y.addEventListener('versionchange', (_) => m(_.oldVersion, _.newVersion, _)));
      })
      .catch(() => {}),
    g
  );
}
const nj = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  ij = ['put', 'add', 'delete', 'clear'],
  nr = new Map();
function s0(c, s) {
  if (!(c instanceof IDBDatabase && !(s in c) && typeof s == 'string')) return;
  if (nr.get(s)) return nr.get(s);
  const u = s.replace(/FromIndex$/, ''),
    o = s !== u,
    m = ij.includes(u);
  if (!(u in (o ? IDBIndex : IDBObjectStore).prototype) || !(m || nj.includes(u))) return;
  const d = async function (h, ...g) {
    const y = this.transaction(h, m ? 'readwrite' : 'readonly');
    let _ = y.store;
    return (o && (_ = _.index(g.shift())), (await Promise.all([_[u](...g), m && y.done]))[0]);
  };
  return (nr.set(s, d), d);
}
E0((c) => ({
  ...c,
  get: (s, u, o) => s0(s, u) || c.get(s, u, o),
  has: (s, u) => !!s0(s, u) || c.has(s, u),
}));
const cj = ['continue', 'continuePrimaryKey', 'advance'],
  u0 = {},
  fr = new WeakMap(),
  z0 = new WeakMap(),
  sj = {
    get(c, s) {
      if (!cj.includes(s)) return c[s];
      let u = u0[s];
      return (
        u ||
          (u = u0[s] =
            function (...o) {
              fr.set(this, z0.get(this)[s](...o));
            }),
        u
      );
    },
  };
async function* uj(...c) {
  let s = this;
  if ((s instanceof IDBCursor || (s = await s.openCursor(...c)), !s)) return;
  s = s;
  const u = new Proxy(s, sj);
  for (z0.set(u, s), Es.set(u, rr(s)); s; )
    (yield u, (s = await (fr.get(u) || s.continue())), fr.delete(u));
}
function o0(c, s) {
  return (
    (s === Symbol.asyncIterator && sr(c, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (s === 'iterate' && sr(c, [IDBIndex, IDBObjectStore]))
  );
}
E0((c) => ({
  ...c,
  get(s, u, o) {
    return o0(s, u) ? uj : c.get(s, u, o);
  },
  has(s, u) {
    return o0(s, u) || c.has(s, u);
  },
}));
const oj = {
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
function rj(c, s, u, o) {
  for (let m = u + 1; m <= o; m++) {
    const d = oj[m];
    if (!d) throw new Error(`No migration registered for version ${m}`);
    d(c, s);
  }
}
let Li = null;
async function r0() {
  return (
    Li ||
    ((Li = await lj(m0, _s, {
      upgrade(c, s, u, o) {
        try {
          rj(c, o, s, u ?? _s);
        } catch (m) {
          throw (console.error('[DB] Migration failed:', m), m);
        }
      },
    })),
    await fj(Li),
    Li)
  );
}
async function fj(c) {
  const s = c.transaction([Q.profile, Q.currencies, Q.machine, Q.weapons, Q.settings], 'readwrite'),
    [u, o, m, d] = await Promise.all([
      s.objectStore(Q.profile).get('singleton'),
      s.objectStore(Q.currencies).get('singleton'),
      s.objectStore(Q.weapons).get('singleton'),
      s.objectStore(Q.settings).get('singleton'),
    ]),
    h = Date.now(),
    g = [];
  (u || g.push(s.objectStore(Q.profile).put({ ...r_, createdAt: h, lastPlayedAt: h })),
    o || g.push(s.objectStore(Q.currencies).put(f_)),
    m || g.push(s.objectStore(Q.weapons).put(d_)),
    d || g.push(s.objectStore(Q.settings).put(m_)));
  const y = s.objectStore(Q.machine),
    _ = await y.getAllKeys(),
    b = new Set(_);
  for (const E of h0) b.has(E) || g.push(y.put({ key: E, lv: 0 }));
  (await Promise.all(g), await s.done);
}
async function dj(c) {
  const s = c.transaction(
      [Q.profile, Q.currencies, Q.machine, Q.weapons, Q.patches, Q.equippedPatches, Q.settings],
      'readonly'
    ),
    [u, o, m, d, h, g, y] = await Promise.all([
      s.objectStore(Q.profile).get('singleton'),
      s.objectStore(Q.currencies).get('singleton'),
      s.objectStore(Q.machine).getAll(),
      s.objectStore(Q.weapons).get('singleton'),
      s.objectStore(Q.patches).getAll(),
      s.objectStore(Q.equippedPatches).getAll(),
      s.objectStore(Q.settings).get('singleton'),
    ]);
  if ((await s.done, !u || !o || !d || !y))
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
    settings: y,
  };
}
const M0 = 'tower-like-game:import-backups',
  mj = 3;
function hj() {
  try {
    const c = localStorage.getItem(M0);
    return c ? JSON.parse(c) : [];
  } catch {
    return [];
  }
}
function vj(c) {
  try {
    localStorage.setItem(M0, JSON.stringify(c));
  } catch (s) {
    console.warn('[DB] Failed to save backup to localStorage:', s);
  }
}
function gj(c) {
  const s = hj();
  s.unshift({ savedAt: Date.now(), data: c });
  const u = s.slice(0, mj);
  vj(u);
}
async function C0(c) {
  const s = await dj(c);
  return { formatVersion: 1, dbVersion: _s, exportedAt: Date.now(), data: s };
}
async function yj(c, s) {
  if (s.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${s.formatVersion}`);
  try {
    const d = await C0(c);
    gj(d);
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
const _j = [
  { key: 'sound', label: '音' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function pj() {
  const { navigate: c } = Ma(),
    [s, u] = dt.useState('sound'),
    o = async () => {
      const h = await r0(),
        g = await C0(h),
        y = JSON.stringify(g, null, 2),
        _ = new Blob([y], { type: 'application/json' }),
        b = URL.createObjectURL(_),
        E = document.createElement('a');
      ((E.href = b),
        (E.download = `neon-spire-save-${new Date().toISOString().slice(0, 10)}.json`),
        E.click(),
        URL.revokeObjectURL(b));
    },
    m = async (h) => {
      const g = await h.text(),
        y = JSON.parse(g),
        _ = await r0();
      (await yj(_, y), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(m0), window.location.reload());
    };
  return r.jsx(Bl, {
    header: r.jsx(Vi, {
      title: '設定',
      currencies: [],
      tabBar: r.jsx(Ss, { tabs: _j, value: s, onChange: u, fullWidth: !0 }),
    }),
    footer: r.jsx(Gi, { active: 'settings', onChange: c }),
    children: r.jsxs('div', {
      className: d5.content,
      children: [
        s === 'sound' && r.jsx(W4, {}),
        s === 'game' && r.jsx(R5, {}),
        s === 'data' && r.jsx(E5, { onExport: o, onImport: m, onReset: d }),
      ],
    }),
  });
}
const bj = '_layout_1c9in_1',
  Sj = '_heroWrap_1c9in_12',
  f0 = { layout: bj, heroWrap: Sj },
  xj = '_root_5udm7_1',
  jj = { root: xj };
function Tj({ onResume: c, onNewGame: s, onSettings: u, lastSavedAt: o }) {
  const m = X((y) => y.createdAt),
    { navigate: d } = Ma(),
    h = m > 0;
  function g() {
    u ? u() : d('settings');
  }
  return r.jsxs('div', {
    className: jj.root,
    children: [
      r.jsx(pe, {
        label: h ? '続きから' : '続きから (セーブなし)',
        variant: h ? 'primary' : 'ghost',
        size: 'lg',
        fullWidth: !0,
        disabled: !h,
        iconLeft: r.jsx(Mt, { name: 'play', size: 18 }),
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
      r.jsx(pe, {
        label: '新規開始',
        variant: h ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: r.jsx(Mt, { name: 'plus', size: 18 }),
        onClick: s,
      }),
      r.jsx(pe, {
        label: '設定',
        variant: 'ghost',
        size: 'md',
        fullWidth: !0,
        iconLeft: r.jsx(Mt, { name: 'settings', size: 16 }),
        onClick: g,
      }),
    ],
  });
}
const Aj = '_root_qkflo_2',
  Nj = '_title_qkflo_12',
  d0 = { root: Aj, title: Nj };
function Ej({ title: c = 'NEON SPIRE', subtitle: s, version: u, tagline: o }) {
  return r.jsxs('header', {
    className: d0.root,
    role: 'banner',
    children: [
      r.jsx('h1', { className: d0.title, children: c }),
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
const zj = '_root_1szye_1',
  Mj = '_ringOuter_1szye_9',
  Cj = '_ringMiddle_1szye_17',
  wj = '_glowDisc_1szye_24',
  Oj = '_cornerAccent_1szye_31',
  Dj = '_icon_1szye_40',
  On = { root: zj, ringOuter: Mj, ringMiddle: Cj, glowDisc: wj, cornerAccent: Oj, icon: Dj };
function Rj({ size: c = 180, iconName: s = 'tower' }) {
  return r.jsxs('div', {
    className: On.root,
    style: { width: c, height: c },
    role: 'presentation',
    'aria-hidden': 'true',
    children: [
      r.jsx('div', { className: On.ringOuter }),
      r.jsx('div', { className: On.ringMiddle }),
      r.jsx('div', { className: On.glowDisc }),
      [0, 90, 180, 270].map((u) =>
        r.jsx(
          'div',
          {
            className: On.cornerAccent,
            style: { transform: `rotate(${u}deg) translate(${c / 2 - 5}px) rotate(45deg)` },
          },
          u
        )
      ),
      r.jsx('span', {
        className: On.icon,
        children: r.jsx(Mt, { name: s, size: Math.round(c * 0.49) }),
      }),
    ],
  });
}
function Bj(c) {
  if (c < 0) return '今';
  const s = Math.floor(c / 1e3);
  if (s < 60) return '今';
  const u = Math.floor(s / 60);
  if (u < 60) return `${u} 分前`;
  const o = Math.floor(u / 60);
  return o < 24 ? `${o} 時間前` : `${Math.floor(o / 24)} 日前`;
}
function Lj() {
  const { navigate: c } = Ma(),
    s = X((o) => o.createdAt),
    u = dt.useMemo(() => (s > 0 ? Bj(Date.now() - s) : void 0), [s]);
  return r.jsx(Bl, {
    children: r.jsxs('div', {
      className: f0.layout,
      children: [
        r.jsx(Ej, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.1.0',
        }),
        r.jsx('div', { className: f0.heroWrap, children: r.jsx(Rj, {}) }),
        r.jsx(Tj, {
          lastSavedAt: u,
          onResume: () => c('preparation'),
          onNewGame: () => c('preparation'),
          onSettings: () => c('settings'),
        }),
      ],
    }),
  });
}
function Hj() {
  const { screen: c } = Ma();
  switch (c) {
    case 'title':
      return r.jsx(Lj, {});
    case 'preparation':
      return r.jsx(r5, {});
    case 'machine':
      return r.jsx(px, {});
    case 'armory':
      return r.jsx(Bp, {});
    case 'patches':
      return r.jsx(O3, {});
    case 'settings':
      return r.jsx(pj, {});
    case 'battle':
      return r.jsx(mx, {});
    default:
      return r.jsx(bx, {});
  }
}
const w0 = document.getElementById('root');
if (!w0) throw new Error('Failed to find #root element');
dg.createRoot(w0).render(r.jsx(Dp, { children: r.jsx(Hj, {}) }));
