var lg = Object.defineProperty;
var ng = (c, s, u) =>
  s in c ? lg(c, s, { enumerable: !0, configurable: !0, writable: !0, value: u }) : (c[s] = u);
var Kt = (c, s, u) => ng(c, typeof s != 'symbol' ? s + '' : s, u);
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
function ig(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var ko = { exports: {} },
  Ei = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jh;
function cg() {
  if (jh) return Ei;
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
  return ((Ei.Fragment = s), (Ei.jsx = u), (Ei.jsxs = u), Ei);
}
var Th;
function sg() {
  return (Th || ((Th = 1), (ko.exports = cg())), ko.exports);
}
var r = sg(),
  Zo = { exports: {} },
  zi = {},
  Xo = { exports: {} },
  Qo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ah;
function ug() {
  return (
    Ah ||
      ((Ah = 1),
      (function (c) {
        function s(O, G) {
          var F = O.length;
          O.push(G);
          e: for (; 0 < F; ) {
            var _e = (F - 1) >>> 1,
              pe = O[_e];
            if (0 < m(pe, G)) ((O[_e] = G), (O[F] = pe), (F = _e));
            else break e;
          }
        }
        function u(O) {
          return O.length === 0 ? null : O[0];
        }
        function o(O) {
          if (O.length === 0) return null;
          var G = O[0],
            F = O.pop();
          if (F !== G) {
            O[0] = F;
            e: for (var _e = 0, pe = O.length, x = pe >>> 1; _e < x; ) {
              var L = 2 * (_e + 1) - 1,
                $ = O[L],
                k = L + 1,
                I = O[k];
              if (0 > m($, F))
                k < pe && 0 > m(I, $)
                  ? ((O[_e] = I), (O[k] = F), (_e = k))
                  : ((O[_e] = $), (O[L] = F), (_e = L));
              else if (k < pe && 0 > m(I, F)) ((O[_e] = I), (O[k] = F), (_e = k));
              else break e;
            }
          }
          return G;
        }
        function m(O, G) {
          var F = O.sortIndex - G.sortIndex;
          return F !== 0 ? F : O.id - G.id;
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
          T = null,
          z = 3,
          q = !1,
          E = !1,
          U = !1,
          H = !1,
          le = typeof setTimeout == 'function' ? setTimeout : null,
          J = typeof clearTimeout == 'function' ? clearTimeout : null,
          ye = typeof setImmediate < 'u' ? setImmediate : null;
        function Ye(O) {
          for (var G = u(_); G !== null; ) {
            if (G.callback === null) o(_);
            else if (G.startTime <= O) (o(_), (G.sortIndex = G.expirationTime), s(y, G));
            else break;
            G = u(_);
          }
        }
        function lt(O) {
          if (((U = !1), Ye(O), !E))
            if (u(y) !== null) ((E = !0), De || ((De = !0), Xe()));
            else {
              var G = u(_);
              G !== null && nt(lt, G.startTime - O);
            }
        }
        var De = !1,
          ne = -1,
          Ze = 5,
          rt = -1;
        function ut() {
          return H ? !0 : !(c.unstable_now() - rt < Ze);
        }
        function Be() {
          if (((H = !1), De)) {
            var O = c.unstable_now();
            rt = O;
            var G = !0;
            try {
              e: {
                ((E = !1), U && ((U = !1), J(ne), (ne = -1)), (q = !0));
                var F = z;
                try {
                  t: {
                    for (Ye(O), T = u(y); T !== null && !(T.expirationTime > O && ut()); ) {
                      var _e = T.callback;
                      if (typeof _e == 'function') {
                        ((T.callback = null), (z = T.priorityLevel));
                        var pe = _e(T.expirationTime <= O);
                        if (((O = c.unstable_now()), typeof pe == 'function')) {
                          ((T.callback = pe), Ye(O), (G = !0));
                          break t;
                        }
                        (T === u(y) && o(y), Ye(O));
                      } else o(y);
                      T = u(y);
                    }
                    if (T !== null) G = !0;
                    else {
                      var x = u(_);
                      (x !== null && nt(lt, x.startTime - O), (G = !1));
                    }
                  }
                  break e;
                } finally {
                  ((T = null), (z = F), (q = !1));
                }
                G = void 0;
              }
            } finally {
              G ? Xe() : (De = !1);
            }
          }
        }
        var Xe;
        if (typeof ye == 'function')
          Xe = function () {
            ye(Be);
          };
        else if (typeof MessageChannel < 'u') {
          var kt = new MessageChannel(),
            wt = kt.port2;
          ((kt.port1.onmessage = Be),
            (Xe = function () {
              wt.postMessage(null);
            }));
        } else
          Xe = function () {
            le(Be, 0);
          };
        function nt(O, G) {
          ne = le(function () {
            O(c.unstable_now());
          }, G);
        }
        ((c.unstable_IdlePriority = 5),
          (c.unstable_ImmediatePriority = 1),
          (c.unstable_LowPriority = 4),
          (c.unstable_NormalPriority = 3),
          (c.unstable_Profiling = null),
          (c.unstable_UserBlockingPriority = 2),
          (c.unstable_cancelCallback = function (O) {
            O.callback = null;
          }),
          (c.unstable_forceFrameRate = function (O) {
            0 > O || 125 < O
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (Ze = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return z;
          }),
          (c.unstable_next = function (O) {
            switch (z) {
              case 1:
              case 2:
              case 3:
                var G = 3;
                break;
              default:
                G = z;
            }
            var F = z;
            z = G;
            try {
              return O();
            } finally {
              z = F;
            }
          }),
          (c.unstable_requestPaint = function () {
            H = !0;
          }),
          (c.unstable_runWithPriority = function (O, G) {
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
            var F = z;
            z = O;
            try {
              return G();
            } finally {
              z = F;
            }
          }),
          (c.unstable_scheduleCallback = function (O, G, F) {
            var _e = c.unstable_now();
            switch (
              (typeof F == 'object' && F !== null
                ? ((F = F.delay), (F = typeof F == 'number' && 0 < F ? _e + F : _e))
                : (F = _e),
              O)
            ) {
              case 1:
                var pe = -1;
                break;
              case 2:
                pe = 250;
                break;
              case 5:
                pe = 1073741823;
                break;
              case 4:
                pe = 1e4;
                break;
              default:
                pe = 5e3;
            }
            return (
              (pe = F + pe),
              (O = {
                id: b++,
                callback: G,
                priorityLevel: O,
                startTime: F,
                expirationTime: pe,
                sortIndex: -1,
              }),
              F > _e
                ? ((O.sortIndex = F),
                  s(_, O),
                  u(y) === null &&
                    O === u(_) &&
                    (U ? (J(ne), (ne = -1)) : (U = !0), nt(lt, F - _e)))
                : ((O.sortIndex = pe), s(y, O), E || q || ((E = !0), De || ((De = !0), Xe()))),
              O
            );
          }),
          (c.unstable_shouldYield = ut),
          (c.unstable_wrapCallback = function (O) {
            var G = z;
            return function () {
              var F = z;
              z = G;
              try {
                return O.apply(this, arguments);
              } finally {
                z = F;
              }
            };
          }));
      })(Qo)),
    Qo
  );
}
var Nh;
function og() {
  return (Nh || ((Nh = 1), (Xo.exports = ug())), Xo.exports);
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
 */ var Eh;
function rg() {
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
    T = Symbol.for('react.activity'),
    z = Symbol.iterator;
  function q(x) {
    return x === null || typeof x != 'object'
      ? null
      : ((x = (z && x[z]) || x['@@iterator']), typeof x == 'function' ? x : null);
  }
  var E = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    U = Object.assign,
    H = {};
  function le(x, L, $) {
    ((this.props = x), (this.context = L), (this.refs = H), (this.updater = $ || E));
  }
  ((le.prototype.isReactComponent = {}),
    (le.prototype.setState = function (x, L) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, L, 'setState');
    }),
    (le.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function J() {}
  J.prototype = le.prototype;
  function ye(x, L, $) {
    ((this.props = x), (this.context = L), (this.refs = H), (this.updater = $ || E));
  }
  var Ye = (ye.prototype = new J());
  ((Ye.constructor = ye), U(Ye, le.prototype), (Ye.isPureReactComponent = !0));
  var lt = Array.isArray;
  function De() {}
  var ne = { H: null, A: null, T: null, S: null },
    Ze = Object.prototype.hasOwnProperty;
  function rt(x, L, $) {
    var k = $.ref;
    return { $$typeof: c, type: x, key: L, ref: k !== void 0 ? k : null, props: $ };
  }
  function ut(x, L) {
    return rt(x.type, L, x.props);
  }
  function Be(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === c;
  }
  function Xe(x) {
    var L = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function ($) {
        return L[$];
      })
    );
  }
  var kt = /\/+/g;
  function wt(x, L) {
    return typeof x == 'object' && x !== null && x.key != null ? Xe('' + x.key) : L.toString(36);
  }
  function nt(x) {
    switch (x.status) {
      case 'fulfilled':
        return x.value;
      case 'rejected':
        throw x.reason;
      default:
        switch (
          (typeof x.status == 'string'
            ? x.then(De, De)
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
  function O(x, L, $, k, I) {
    var ie = typeof x;
    (ie === 'undefined' || ie === 'boolean') && (x = null);
    var me = !1;
    if (x === null) me = !0;
    else
      switch (ie) {
        case 'bigint':
        case 'string':
        case 'number':
          me = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case c:
            case s:
              me = !0;
              break;
            case b:
              return ((me = x._init), O(me(x._payload), L, $, k, I));
          }
      }
    if (me)
      return (
        (I = I(x)),
        (me = k === '' ? '.' + wt(x, 0) : k),
        lt(I)
          ? (($ = ''),
            me != null && ($ = me.replace(kt, '$&/') + '/'),
            O(I, L, $, '', function (rl) {
              return rl;
            }))
          : I != null &&
            (Be(I) &&
              (I = ut(
                I,
                $ +
                  (I.key == null || (x && x.key === I.key)
                    ? ''
                    : ('' + I.key).replace(kt, '$&/') + '/') +
                  me
              )),
            L.push(I)),
        1
      );
    me = 0;
    var We = k === '' ? '.' : k + ':';
    if (lt(x))
      for (var we = 0; we < x.length; we++)
        ((k = x[we]), (ie = We + wt(k, we)), (me += O(k, L, $, ie, I)));
    else if (((we = q(x)), typeof we == 'function'))
      for (x = we.call(x), we = 0; !(k = x.next()).done; )
        ((k = k.value), (ie = We + wt(k, we++)), (me += O(k, L, $, ie, I)));
    else if (ie === 'object') {
      if (typeof x.then == 'function') return O(nt(x), L, $, k, I);
      throw (
        (L = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (L === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : L) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return me;
  }
  function G(x, L, $) {
    if (x == null) return x;
    var k = [],
      I = 0;
    return (
      O(x, k, '', '', function (ie) {
        return L.call($, ie, I++);
      }),
      k
    );
  }
  function F(x) {
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
  var _e =
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
    pe = {
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
        if (!Be(x))
          throw Error('React.Children.only expected to receive a single React element child.');
        return x;
      },
    };
  return (
    (P.Activity = T),
    (P.Children = pe),
    (P.Component = le),
    (P.Fragment = u),
    (P.Profiler = m),
    (P.PureComponent = ye),
    (P.StrictMode = o),
    (P.Suspense = y),
    (P.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne),
    (P.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return ne.H.useMemoCache(x);
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
      var k = U({}, x.props),
        I = x.key;
      if (L != null)
        for (ie in (L.key !== void 0 && (I = '' + L.key), L))
          !Ze.call(L, ie) ||
            ie === 'key' ||
            ie === '__self' ||
            ie === '__source' ||
            (ie === 'ref' && L.ref === void 0) ||
            (k[ie] = L[ie]);
      var ie = arguments.length - 2;
      if (ie === 1) k.children = $;
      else if (1 < ie) {
        for (var me = Array(ie), We = 0; We < ie; We++) me[We] = arguments[We + 2];
        k.children = me;
      }
      return rt(x.type, I, k);
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
        ie = null;
      if (L != null)
        for (k in (L.key !== void 0 && (ie = '' + L.key), L))
          Ze.call(L, k) && k !== 'key' && k !== '__self' && k !== '__source' && (I[k] = L[k]);
      var me = arguments.length - 2;
      if (me === 1) I.children = $;
      else if (1 < me) {
        for (var We = Array(me), we = 0; we < me; we++) We[we] = arguments[we + 2];
        I.children = We;
      }
      if (x && x.defaultProps)
        for (k in ((me = x.defaultProps), me)) I[k] === void 0 && (I[k] = me[k]);
      return rt(x, ie, I);
    }),
    (P.createRef = function () {
      return { current: null };
    }),
    (P.forwardRef = function (x) {
      return { $$typeof: g, render: x };
    }),
    (P.isValidElement = Be),
    (P.lazy = function (x) {
      return { $$typeof: b, _payload: { _status: -1, _result: x }, _init: F };
    }),
    (P.memo = function (x, L) {
      return { $$typeof: _, type: x, compare: L === void 0 ? null : L };
    }),
    (P.startTransition = function (x) {
      var L = ne.T,
        $ = {};
      ne.T = $;
      try {
        var k = x(),
          I = ne.S;
        (I !== null && I($, k),
          typeof k == 'object' && k !== null && typeof k.then == 'function' && k.then(De, _e));
      } catch (ie) {
        _e(ie);
      } finally {
        (L !== null && $.types !== null && (L.types = $.types), (ne.T = L));
      }
    }),
    (P.unstable_useCacheRefresh = function () {
      return ne.H.useCacheRefresh();
    }),
    (P.use = function (x) {
      return ne.H.use(x);
    }),
    (P.useActionState = function (x, L, $) {
      return ne.H.useActionState(x, L, $);
    }),
    (P.useCallback = function (x, L) {
      return ne.H.useCallback(x, L);
    }),
    (P.useContext = function (x) {
      return ne.H.useContext(x);
    }),
    (P.useDebugValue = function () {}),
    (P.useDeferredValue = function (x, L) {
      return ne.H.useDeferredValue(x, L);
    }),
    (P.useEffect = function (x, L) {
      return ne.H.useEffect(x, L);
    }),
    (P.useEffectEvent = function (x) {
      return ne.H.useEffectEvent(x);
    }),
    (P.useId = function () {
      return ne.H.useId();
    }),
    (P.useImperativeHandle = function (x, L, $) {
      return ne.H.useImperativeHandle(x, L, $);
    }),
    (P.useInsertionEffect = function (x, L) {
      return ne.H.useInsertionEffect(x, L);
    }),
    (P.useLayoutEffect = function (x, L) {
      return ne.H.useLayoutEffect(x, L);
    }),
    (P.useMemo = function (x, L) {
      return ne.H.useMemo(x, L);
    }),
    (P.useOptimistic = function (x, L) {
      return ne.H.useOptimistic(x, L);
    }),
    (P.useReducer = function (x, L, $) {
      return ne.H.useReducer(x, L, $);
    }),
    (P.useRef = function (x) {
      return ne.H.useRef(x);
    }),
    (P.useState = function (x) {
      return ne.H.useState(x);
    }),
    (P.useSyncExternalStore = function (x, L, $) {
      return ne.H.useSyncExternalStore(x, L, $);
    }),
    (P.useTransition = function () {
      return ne.H.useTransition();
    }),
    (P.version = '19.2.5'),
    P
  );
}
var zh;
function dr() {
  return (zh || ((zh = 1), (Ko.exports = rg())), Ko.exports);
}
var Jo = { exports: {} },
  it = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mh;
function fg() {
  if (Mh) return it;
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
    var T = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: T == null ? null : '' + T,
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
    (it.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (it.createPortal = function (y, _) {
      var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!_ || (_.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)) throw Error(s(299));
      return d(y, _, null, b);
    }),
    (it.flushSync = function (y) {
      var _ = h.T,
        b = o.p;
      try {
        if (((h.T = null), (o.p = 2), y)) return y();
      } finally {
        ((h.T = _), (o.p = b), o.d.f());
      }
    }),
    (it.preconnect = function (y, _) {
      typeof y == 'string' &&
        (_
          ? ((_ = _.crossOrigin),
            (_ = typeof _ == 'string' ? (_ === 'use-credentials' ? _ : '') : void 0))
          : (_ = null),
        o.d.C(y, _));
    }),
    (it.prefetchDNS = function (y) {
      typeof y == 'string' && o.d.D(y);
    }),
    (it.preinit = function (y, _) {
      if (typeof y == 'string' && _ && typeof _.as == 'string') {
        var b = _.as,
          T = g(b, _.crossOrigin),
          z = typeof _.integrity == 'string' ? _.integrity : void 0,
          q = typeof _.fetchPriority == 'string' ? _.fetchPriority : void 0;
        b === 'style'
          ? o.d.S(y, typeof _.precedence == 'string' ? _.precedence : void 0, {
              crossOrigin: T,
              integrity: z,
              fetchPriority: q,
            })
          : b === 'script' &&
            o.d.X(y, {
              crossOrigin: T,
              integrity: z,
              fetchPriority: q,
              nonce: typeof _.nonce == 'string' ? _.nonce : void 0,
            });
      }
    }),
    (it.preinitModule = function (y, _) {
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
    (it.preload = function (y, _) {
      if (typeof y == 'string' && typeof _ == 'object' && _ !== null && typeof _.as == 'string') {
        var b = _.as,
          T = g(b, _.crossOrigin);
        o.d.L(y, b, {
          crossOrigin: T,
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
    (it.preloadModule = function (y, _) {
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
    (it.requestFormReset = function (y) {
      o.d.r(y);
    }),
    (it.unstable_batchedUpdates = function (y, _) {
      return y(_);
    }),
    (it.useFormState = function (y, _, b) {
      return h.H.useFormState(y, _, b);
    }),
    (it.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (it.version = '19.2.5'),
    it
  );
}
var Ch;
function dg() {
  if (Ch) return Jo.exports;
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
  return (c(), (Jo.exports = fg()), Jo.exports);
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
function mg() {
  if (wh) return zi;
  wh = 1;
  var c = og(),
    s = dr(),
    u = dg();
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
  function m(e) {
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
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (d(e) !== e) throw Error(o(188));
  }
  function _(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var a = e, l = t; ; ) {
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
          if (i === a) return (y(n), e);
          if (i === l) return (y(n), t);
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
    return a.stateNode.current === a ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = b(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var T = Object.assign,
    z = Symbol.for('react.element'),
    q = Symbol.for('react.transitional.element'),
    E = Symbol.for('react.portal'),
    U = Symbol.for('react.fragment'),
    H = Symbol.for('react.strict_mode'),
    le = Symbol.for('react.profiler'),
    J = Symbol.for('react.consumer'),
    ye = Symbol.for('react.context'),
    Ye = Symbol.for('react.forward_ref'),
    lt = Symbol.for('react.suspense'),
    De = Symbol.for('react.suspense_list'),
    ne = Symbol.for('react.memo'),
    Ze = Symbol.for('react.lazy'),
    rt = Symbol.for('react.activity'),
    ut = Symbol.for('react.memo_cache_sentinel'),
    Be = Symbol.iterator;
  function Xe(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Be && e[Be]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var kt = Symbol.for('react.client.reference');
  function wt(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === kt ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case U:
        return 'Fragment';
      case le:
        return 'Profiler';
      case H:
        return 'StrictMode';
      case lt:
        return 'Suspense';
      case De:
        return 'SuspenseList';
      case rt:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case E:
          return 'Portal';
        case ye:
          return e.displayName || 'Context';
        case J:
          return (e._context.displayName || 'Context') + '.Consumer';
        case Ye:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case ne:
          return ((t = e.displayName || null), t !== null ? t : wt(e.type) || 'Memo');
        case Ze:
          ((t = e._payload), (e = e._init));
          try {
            return wt(e(t));
          } catch {}
      }
    return null;
  }
  var nt = Array.isArray,
    O = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    G = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    F = { pending: !1, data: null, method: null, action: null },
    _e = [],
    pe = -1;
  function x(e) {
    return { current: e };
  }
  function L(e) {
    0 > pe || ((e.current = _e[pe]), (_e[pe] = null), pe--);
  }
  function $(e, t) {
    (pe++, (_e[pe] = e.current), (e.current = t));
  }
  var k = x(null),
    I = x(null),
    ie = x(null),
    me = x(null);
  function We(e, t) {
    switch (($(ie, t), $(I, e), $(k, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Xm(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Xm(t)), (e = Qm(t, e)));
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
    (L(k), $(k, e));
  }
  function we() {
    (L(k), L(I), L(ie));
  }
  function rl(e) {
    e.memoizedState !== null && $(me, e);
    var t = k.current,
      a = Qm(t, e.type);
    t !== a && ($(I, e), $(k, a));
  }
  function Ul(e) {
    (I.current === e && (L(k), L(I)), me.current === e && (L(me), (ji._currentValue = F)));
  }
  var Gl, Es;
  function Ca(e) {
    if (Gl === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((Gl = (t && t[1]) || ''),
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
      Gl +
      e +
      Es
    );
  }
  var ee = !1;
  function Vl(e, t) {
    if (!e || ee) return '';
    ee = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
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
                } catch (C) {
                  var M = C;
                }
                Reflect.construct(e, [], B);
              } else {
                try {
                  B.call();
                } catch (C) {
                  M = C;
                }
                e.call(B.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (C) {
                M = C;
              }
              (B = e()) && typeof B.catch == 'function' && B.catch(function () {});
            }
          } catch (C) {
            if (C && M && typeof C.stack == 'string') return [C.stack, M.stack];
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
                  var w =
                    `
` + p[l].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      w.includes('<anonymous>') &&
                      (w = w.replace('<anonymous>', e.displayName)),
                    w
                  );
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      ((ee = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? Ca(a) : '';
  }
  function ki(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ca(e.type);
      case 16:
        return Ca('Lazy');
      case 13:
        return e.child !== t && t !== null ? Ca('Suspense Fallback') : Ca('Suspense');
      case 19:
        return Ca('SuspenseList');
      case 0:
      case 15:
        return Vl(e.type, !1);
      case 11:
        return Vl(e.type.render, !1);
      case 1:
        return Vl(e.type, !0);
      case 31:
        return Ca('Activity');
      default:
        return '';
    }
  }
  function xr(e) {
    try {
      var t = '',
        a = null;
      do ((t += ki(e, a)), (a = e), (e = e.return));
      while (e);
      return t;
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
    B0 = c.unstable_shouldYield,
    L0 = c.unstable_requestPaint,
    pt = c.unstable_now,
    q0 = c.unstable_getCurrentPriorityLevel,
    jr = c.unstable_ImmediatePriority,
    Tr = c.unstable_UserBlockingPriority,
    Zi = c.unstable_NormalPriority,
    H0 = c.unstable_LowPriority,
    Ar = c.unstable_IdlePriority,
    U0 = c.log,
    G0 = c.unstable_setDisableYieldValue,
    Bn = null,
    bt = null;
  function wa(e) {
    if ((typeof U0 == 'function' && G0(e), bt && typeof bt.setStrictMode == 'function'))
      try {
        bt.setStrictMode(Bn, e);
      } catch {}
  }
  var St = Math.clz32 ? Math.clz32 : Y0,
    V0 = Math.log,
    $0 = Math.LN2;
  function Y0(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((V0(e) / $0) | 0)) | 0);
  }
  var Xi = 256,
    Qi = 262144,
    Ki = 4194304;
  function fl(e) {
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
  function Ji(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var n = 0,
      i = e.suspendedLanes,
      f = e.pingedLanes;
    e = e.warmLanes;
    var v = l & 134217727;
    return (
      v !== 0
        ? ((l = v & ~i),
          l !== 0
            ? (n = fl(l))
            : ((f &= v), f !== 0 ? (n = fl(f)) : a || ((a = v & ~e), a !== 0 && (n = fl(a)))))
        : ((v = l & ~i),
          v !== 0
            ? (n = fl(v))
            : f !== 0
              ? (n = fl(f))
              : a || ((a = l & ~e), a !== 0 && (n = fl(a)))),
      n === 0
        ? 0
        : t !== 0 &&
            t !== n &&
            (t & i) === 0 &&
            ((i = n & -n), (a = t & -t), i >= a || (i === 32 && (a & 4194048) !== 0))
          ? t
          : n
    );
  }
  function Ln(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function k0(e, t) {
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
  function Nr() {
    var e = Ki;
    return ((Ki <<= 1), (Ki & 62914560) === 0 && (Ki = 4194304), e);
  }
  function ws(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function qn(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Z0(e, t, a, l, n, i) {
    var f = e.pendingLanes;
    ((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0));
    var v = e.entanglements,
      p = e.expirationTimes,
      N = e.hiddenUpdates;
    for (a = f & ~a; 0 < a; ) {
      var w = 31 - St(a),
        B = 1 << w;
      ((v[w] = 0), (p[w] = -1));
      var M = N[w];
      if (M !== null)
        for (N[w] = null, w = 0; w < M.length; w++) {
          var C = M[w];
          C !== null && (C.lane &= -536870913);
        }
      a &= ~B;
    }
    (l !== 0 && Er(e, l, 0),
      i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(f & ~t)));
  }
  function Er(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var l = 31 - St(t);
    ((e.entangledLanes |= t),
      (e.entanglements[l] = e.entanglements[l] | 1073741824 | (a & 261930)));
  }
  function zr(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var l = 31 - St(a),
        n = 1 << l;
      ((n & t) | (e[l] & t) && (e[l] |= t), (a &= ~n));
    }
  }
  function Mr(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : Os(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function Os(e) {
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
  function Rs(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Cr() {
    var e = G.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : gh(e.type));
  }
  function wr(e, t) {
    var a = G.p;
    try {
      return ((G.p = e), t());
    } finally {
      G.p = a;
    }
  }
  var Oa = Math.random().toString(36).slice(2),
    Fe = '__reactFiber$' + Oa,
    ft = '__reactProps$' + Oa,
    $l = '__reactContainer$' + Oa,
    Ds = '__reactEvents$' + Oa,
    X0 = '__reactListeners$' + Oa,
    Q0 = '__reactHandles$' + Oa,
    Or = '__reactResources$' + Oa,
    Hn = '__reactMarker$' + Oa;
  function Bs(e) {
    (delete e[Fe], delete e[ft], delete e[Ds], delete e[X0], delete e[Q0]);
  }
  function Yl(e) {
    var t = e[Fe];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[$l] || a[Fe])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = eh(e); e !== null; ) {
            if ((a = e[Fe])) return a;
            e = eh(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function kl(e) {
    if ((e = e[Fe] || e[$l])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Un(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Zl(e) {
    var t = e[Or];
    return (t || (t = e[Or] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function Qe(e) {
    e[Hn] = !0;
  }
  var Rr = new Set(),
    Dr = {};
  function dl(e, t) {
    (Xl(e, t), Xl(e + 'Capture', t));
  }
  function Xl(e, t) {
    for (Dr[e] = t, e = 0; e < t.length; e++) Rr.add(t[e]);
  }
  var K0 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Br = {},
    Lr = {};
  function J0(e) {
    return zs.call(Lr, e)
      ? !0
      : zs.call(Br, e)
        ? !1
        : K0.test(e)
          ? (Lr[e] = !0)
          : ((Br[e] = !0), !1);
  }
  function Wi(e, t, a) {
    if (J0(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(t);
            return;
          case 'boolean':
            var l = t.toLowerCase().slice(0, 5);
            if (l !== 'data-' && l !== 'aria-') {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, '' + a);
      }
  }
  function Fi(e, t, a) {
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
  function sa(e, t, a, l) {
    if (l === null) e.removeAttribute(a);
    else {
      switch (typeof l) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, '' + l);
    }
  }
  function Ot(e) {
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
  function qr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function W0(e, t, a) {
    var l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof l < 'u' &&
      typeof l.get == 'function' &&
      typeof l.set == 'function'
    ) {
      var n = l.get,
        i = l.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (f) {
            ((a = '' + f), i.call(this, f));
          },
        }),
        Object.defineProperty(e, t, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (f) {
            a = '' + f;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Ls(e) {
    if (!e._valueTracker) {
      var t = qr(e) ? 'checked' : 'value';
      e._valueTracker = W0(e, t, '' + e[t]);
    }
  }
  function Hr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      l = '';
    return (
      e && (l = qr(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = l),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function Ii(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var F0 = /[\n"\\]/g;
  function Rt(e) {
    return e.replace(F0, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function qs(e, t, a, l, n, i, f, v) {
    ((e.name = ''),
      f != null && typeof f != 'function' && typeof f != 'symbol' && typeof f != 'boolean'
        ? (e.type = f)
        : e.removeAttribute('type'),
      t != null
        ? f === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Ot(t))
          : e.value !== '' + Ot(t) && (e.value = '' + Ot(t))
        : (f !== 'submit' && f !== 'reset') || e.removeAttribute('value'),
      t != null
        ? Hs(e, f, Ot(t))
        : a != null
          ? Hs(e, f, Ot(a))
          : l != null && e.removeAttribute('value'),
      n == null && i != null && (e.defaultChecked = !!i),
      n != null && (e.checked = n && typeof n != 'function' && typeof n != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (e.name = '' + Ot(v))
        : e.removeAttribute('name'));
  }
  function Ur(e, t, a, l, n, i, f, v) {
    if (
      (i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (e.type = i),
      t != null || a != null)
    ) {
      if (!((i !== 'submit' && i !== 'reset') || t != null)) {
        Ls(e);
        return;
      }
      ((a = a != null ? '' + Ot(a) : ''),
        (t = t != null ? '' + Ot(t) : a),
        v || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((l = l ?? n),
      (l = typeof l != 'function' && typeof l != 'symbol' && !!l),
      (e.checked = v ? e.checked : !!l),
      (e.defaultChecked = !!l),
      f != null &&
        typeof f != 'function' &&
        typeof f != 'symbol' &&
        typeof f != 'boolean' &&
        (e.name = f),
      Ls(e));
  }
  function Hs(e, t, a) {
    (t === 'number' && Ii(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function Ql(e, t, a, l) {
    if (((e = e.options), t)) {
      t = {};
      for (var n = 0; n < a.length; n++) t['$' + a[n]] = !0;
      for (a = 0; a < e.length; a++)
        ((n = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== n && (e[a].selected = n),
          n && l && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + Ot(a), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === a) {
          ((e[n].selected = !0), l && (e[n].defaultSelected = !0));
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Gr(e, t, a) {
    if (t != null && ((t = '' + Ot(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + Ot(a) : '';
  }
  function Vr(e, t, a, l) {
    if (t == null) {
      if (l != null) {
        if (a != null) throw Error(o(92));
        if (nt(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        a = l;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = Ot(t)),
      (e.defaultValue = a),
      (l = e.textContent),
      l === a && l !== '' && l !== null && (e.value = l),
      Ls(e));
  }
  function Kl(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var I0 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function $r(e, t, a) {
    var l = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? l
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : l
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || I0.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function Yr(e, t, a) {
    if (t != null && typeof t != 'object') throw Error(o(62));
    if (((e = e.style), a != null)) {
      for (var l in a)
        !a.hasOwnProperty(l) ||
          (t != null && t.hasOwnProperty(l)) ||
          (l.indexOf('--') === 0
            ? e.setProperty(l, '')
            : l === 'float'
              ? (e.cssFloat = '')
              : (e[l] = ''));
      for (var n in t) ((l = t[n]), t.hasOwnProperty(n) && a[n] !== l && $r(e, n, l));
    } else for (var i in t) t.hasOwnProperty(i) && $r(e, i, t[i]);
  }
  function Us(e) {
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
  var P0 = new Map([
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
    e1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Pi(e) {
    return e1.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function ua() {}
  var Gs = null;
  function Vs(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Jl = null,
    Wl = null;
  function kr(e) {
    var t = kl(e);
    if (t && (e = t.stateNode)) {
      var a = e[ft] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (qs(
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
              a = a.querySelectorAll('input[name="' + Rt('' + t) + '"][type="radio"]'), t = 0;
              t < a.length;
              t++
            ) {
              var l = a[t];
              if (l !== e && l.form === e.form) {
                var n = l[ft] || null;
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
            for (t = 0; t < a.length; t++) ((l = a[t]), l.form === e.form && Hr(l));
          }
          break e;
        case 'textarea':
          Gr(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && Ql(e, !!a.multiple, t, !1));
      }
    }
  }
  var $s = !1;
  function Zr(e, t, a) {
    if ($s) return e(t, a);
    $s = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (
        (($s = !1),
        (Jl !== null || Wl !== null) &&
          (Gc(), Jl && ((t = Jl), (e = Wl), (Wl = Jl = null), kr(t), e)))
      )
        for (t = 0; t < e.length; t++) kr(e[t]);
    }
  }
  function Gn(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var l = a[ft] || null;
    if (l === null) return null;
    a = l[t];
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
        ((l = !l.disabled) ||
          ((e = e.type),
          (l = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
          (e = !l));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != 'function') throw Error(o(231, t, typeof a));
    return a;
  }
  var oa = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Ys = !1;
  if (oa)
    try {
      var Vn = {};
      (Object.defineProperty(Vn, 'passive', {
        get: function () {
          Ys = !0;
        },
      }),
        window.addEventListener('test', Vn, Vn),
        window.removeEventListener('test', Vn, Vn));
    } catch {
      Ys = !1;
    }
  var Ra = null,
    ks = null,
    ec = null;
  function Xr() {
    if (ec) return ec;
    var e,
      t = ks,
      a = t.length,
      l,
      n = 'value' in Ra ? Ra.value : Ra.textContent,
      i = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++);
    var f = a - e;
    for (l = 1; l <= f && t[a - l] === n[i - l]; l++);
    return (ec = n.slice(e, 1 < l ? 1 - l : void 0));
  }
  function tc(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ac() {
    return !0;
  }
  function Qr() {
    return !1;
  }
  function dt(e) {
    function t(a, l, n, i, f) {
      ((this._reactName = a),
        (this._targetInst = n),
        (this.type = l),
        (this.nativeEvent = i),
        (this.target = f),
        (this.currentTarget = null));
      for (var v in e) e.hasOwnProperty(v) && ((a = e[v]), (this[v] = a ? a(i) : i[v]));
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
      T(t.prototype, {
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
      t
    );
  }
  var ml = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    lc = dt(ml),
    $n = T({}, ml, { view: 0, detail: 0 }),
    t1 = dt($n),
    Zs,
    Xs,
    Yn,
    nc = T({}, $n, {
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
          : (e !== Yn &&
              (Yn && e.type === 'mousemove'
                ? ((Zs = e.screenX - Yn.screenX), (Xs = e.screenY - Yn.screenY))
                : (Xs = Zs = 0),
              (Yn = e)),
            Zs);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Xs;
      },
    }),
    Kr = dt(nc),
    a1 = T({}, nc, { dataTransfer: 0 }),
    l1 = dt(a1),
    n1 = T({}, $n, { relatedTarget: 0 }),
    Qs = dt(n1),
    i1 = T({}, ml, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    c1 = dt(i1),
    s1 = T({}, ml, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    u1 = dt(s1),
    o1 = T({}, ml, { data: 0 }),
    Jr = dt(o1),
    r1 = {
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
    f1 = {
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
    d1 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function m1(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = d1[e]) ? !!t[e] : !1;
  }
  function Ks() {
    return m1;
  }
  var h1 = T({}, $n, {
      key: function (e) {
        if (e.key) {
          var t = r1[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = tc(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? f1[e.keyCode] || 'Unidentified'
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
      charCode: function (e) {
        return e.type === 'keypress' ? tc(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? tc(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    v1 = dt(h1),
    g1 = T({}, nc, {
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
    Wr = dt(g1),
    y1 = T({}, $n, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ks,
    }),
    _1 = dt(y1),
    p1 = T({}, ml, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    b1 = dt(p1),
    S1 = T({}, nc, {
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
    x1 = dt(S1),
    j1 = T({}, ml, { newState: 0, oldState: 0 }),
    T1 = dt(j1),
    A1 = [9, 13, 27, 32],
    Js = oa && 'CompositionEvent' in window,
    kn = null;
  oa && 'documentMode' in document && (kn = document.documentMode);
  var N1 = oa && 'TextEvent' in window && !kn,
    Fr = oa && (!Js || (kn && 8 < kn && 11 >= kn)),
    Ir = ' ',
    Pr = !1;
  function ef(e, t) {
    switch (e) {
      case 'keyup':
        return A1.indexOf(t.keyCode) !== -1;
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
  function tf(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Fl = !1;
  function E1(e, t) {
    switch (e) {
      case 'compositionend':
        return tf(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Pr = !0), Ir);
      case 'textInput':
        return ((e = t.data), e === Ir && Pr ? null : e);
      default:
        return null;
    }
  }
  function z1(e, t) {
    if (Fl)
      return e === 'compositionend' || (!Js && ef(e, t))
        ? ((e = Xr()), (ec = ks = Ra = null), (Fl = !1), e)
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
        return Fr && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var M1 = {
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
  function af(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!M1[e.type] : t === 'textarea';
  }
  function lf(e, t, a, l) {
    (Jl ? (Wl ? Wl.push(l) : (Wl = [l])) : (Jl = l),
      (t = Qc(t, 'onChange')),
      0 < t.length &&
        ((a = new lc('onChange', 'change', null, a, l)), e.push({ event: a, listeners: t })));
  }
  var Zn = null,
    Xn = null;
  function C1(e) {
    Gm(e, 0);
  }
  function ic(e) {
    var t = Un(e);
    if (Hr(t)) return e;
  }
  function nf(e, t) {
    if (e === 'change') return t;
  }
  var cf = !1;
  if (oa) {
    var Ws;
    if (oa) {
      var Fs = 'oninput' in document;
      if (!Fs) {
        var sf = document.createElement('div');
        (sf.setAttribute('oninput', 'return;'), (Fs = typeof sf.oninput == 'function'));
      }
      Ws = Fs;
    } else Ws = !1;
    cf = Ws && (!document.documentMode || 9 < document.documentMode);
  }
  function uf() {
    Zn && (Zn.detachEvent('onpropertychange', of), (Xn = Zn = null));
  }
  function of(e) {
    if (e.propertyName === 'value' && ic(Xn)) {
      var t = [];
      (lf(t, Xn, e, Vs(e)), Zr(C1, t));
    }
  }
  function w1(e, t, a) {
    e === 'focusin'
      ? (uf(), (Zn = t), (Xn = a), Zn.attachEvent('onpropertychange', of))
      : e === 'focusout' && uf();
  }
  function O1(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return ic(Xn);
  }
  function R1(e, t) {
    if (e === 'click') return ic(t);
  }
  function D1(e, t) {
    if (e === 'input' || e === 'change') return ic(t);
  }
  function B1(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var xt = typeof Object.is == 'function' ? Object.is : B1;
  function Qn(e, t) {
    if (xt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!zs.call(t, n) || !xt(e[n], t[n])) return !1;
    }
    return !0;
  }
  function rf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function ff(e, t) {
    var a = rf(e);
    e = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (((l = e + a.textContent.length), e <= t && l >= t)) return { node: a, offset: t - e };
        e = l;
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
      a = rf(a);
    }
  }
  function df(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? df(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function mf(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Ii(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Ii(e.document);
    }
    return t;
  }
  function Is(e) {
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
  var L1 = oa && 'documentMode' in document && 11 >= document.documentMode,
    Il = null,
    Ps = null,
    Kn = null,
    eu = !1;
  function hf(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    eu ||
      Il == null ||
      Il !== Ii(l) ||
      ((l = Il),
      'selectionStart' in l && Is(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (Kn && Qn(Kn, l)) ||
        ((Kn = l),
        (l = Qc(Ps, 'onSelect')),
        0 < l.length &&
          ((t = new lc('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: l }),
          (t.target = Il))));
  }
  function hl(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var Pl = {
      animationend: hl('Animation', 'AnimationEnd'),
      animationiteration: hl('Animation', 'AnimationIteration'),
      animationstart: hl('Animation', 'AnimationStart'),
      transitionrun: hl('Transition', 'TransitionRun'),
      transitionstart: hl('Transition', 'TransitionStart'),
      transitioncancel: hl('Transition', 'TransitionCancel'),
      transitionend: hl('Transition', 'TransitionEnd'),
    },
    tu = {},
    vf = {};
  oa &&
    ((vf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Pl.animationend.animation,
      delete Pl.animationiteration.animation,
      delete Pl.animationstart.animation),
    'TransitionEvent' in window || delete Pl.transitionend.transition);
  function vl(e) {
    if (tu[e]) return tu[e];
    if (!Pl[e]) return e;
    var t = Pl[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in vf) return (tu[e] = t[a]);
    return e;
  }
  var gf = vl('animationend'),
    yf = vl('animationiteration'),
    _f = vl('animationstart'),
    q1 = vl('transitionrun'),
    H1 = vl('transitionstart'),
    U1 = vl('transitioncancel'),
    pf = vl('transitionend'),
    bf = new Map(),
    au =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  au.push('scrollEnd');
  function Zt(e, t) {
    (bf.set(e, t), dl(t, [e]));
  }
  var cc =
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
    Dt = [],
    en = 0,
    lu = 0;
  function sc() {
    for (var e = en, t = (lu = en = 0); t < e; ) {
      var a = Dt[t];
      Dt[t++] = null;
      var l = Dt[t];
      Dt[t++] = null;
      var n = Dt[t];
      Dt[t++] = null;
      var i = Dt[t];
      if (((Dt[t++] = null), l !== null && n !== null)) {
        var f = l.pending;
        (f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)), (l.pending = n));
      }
      i !== 0 && Sf(a, n, i);
    }
  }
  function uc(e, t, a, l) {
    ((Dt[en++] = e),
      (Dt[en++] = t),
      (Dt[en++] = a),
      (Dt[en++] = l),
      (lu |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l));
  }
  function nu(e, t, a, l) {
    return (uc(e, t, a, l), oc(e));
  }
  function gl(e, t) {
    return (uc(e, null, null, t), oc(e));
  }
  function Sf(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, i = e.return; i !== null; )
      ((i.childLanes |= a),
        (l = i.alternate),
        l !== null && (l.childLanes |= a),
        i.tag === 22 && ((e = i.stateNode), e === null || e._visibility & 1 || (n = !0)),
        (e = i),
        (i = i.return));
    return e.tag === 3
      ? ((i = e.stateNode),
        n &&
          t !== null &&
          ((n = 31 - St(a)),
          (e = i.hiddenUpdates),
          (l = e[n]),
          l === null ? (e[n] = [t]) : l.push(t),
          (t.lane = a | 536870912)),
        i)
      : null;
  }
  function oc(e) {
    if (50 < gi) throw ((gi = 0), (ho = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var tn = {};
  function G1(e, t, a, l) {
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
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function jt(e, t, a, l) {
    return new G1(e, t, a, l);
  }
  function iu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function ra(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = jt(e.tag, t, e.key, e.mode)),
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
  function xf(e, t) {
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
  function rc(e, t, a, l, n, i) {
    var f = 0;
    if (((l = e), typeof e == 'function')) iu(e) && (f = 1);
    else if (typeof e == 'string')
      f = Zv(e, a, k.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case rt:
          return ((e = jt(31, a, t, n)), (e.elementType = rt), (e.lanes = i), e);
        case U:
          return yl(a.children, n, i, t);
        case H:
          ((f = 8), (n |= 24));
          break;
        case le:
          return ((e = jt(12, a, t, n | 2)), (e.elementType = le), (e.lanes = i), e);
        case lt:
          return ((e = jt(13, a, t, n)), (e.elementType = lt), (e.lanes = i), e);
        case De:
          return ((e = jt(19, a, t, n)), (e.elementType = De), (e.lanes = i), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case ye:
                f = 10;
                break e;
              case J:
                f = 9;
                break e;
              case Ye:
                f = 11;
                break e;
              case ne:
                f = 14;
                break e;
              case Ze:
                ((f = 16), (l = null));
                break e;
            }
          ((f = 29), (a = Error(o(130, e === null ? 'null' : typeof e, ''))), (l = null));
      }
    return ((t = jt(f, a, t, n)), (t.elementType = e), (t.type = l), (t.lanes = i), t);
  }
  function yl(e, t, a, l) {
    return ((e = jt(7, e, l, t)), (e.lanes = a), e);
  }
  function cu(e, t, a) {
    return ((e = jt(6, e, null, t)), (e.lanes = a), e);
  }
  function jf(e) {
    var t = jt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function su(e, t, a) {
    return (
      (t = jt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Tf = new WeakMap();
  function Bt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = Tf.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: xr(t) }), Tf.set(e, t), t);
    }
    return { value: e, source: t, stack: xr(t) };
  }
  var an = [],
    ln = 0,
    fc = null,
    Jn = 0,
    Lt = [],
    qt = 0,
    Da = null,
    ea = 1,
    ta = '';
  function fa(e, t) {
    ((an[ln++] = Jn), (an[ln++] = fc), (fc = e), (Jn = t));
  }
  function Af(e, t, a) {
    ((Lt[qt++] = ea), (Lt[qt++] = ta), (Lt[qt++] = Da), (Da = e));
    var l = ea;
    e = ta;
    var n = 32 - St(l) - 1;
    ((l &= ~(1 << n)), (a += 1));
    var i = 32 - St(t) + n;
    if (30 < i) {
      var f = n - (n % 5);
      ((i = (l & ((1 << f) - 1)).toString(32)),
        (l >>= f),
        (n -= f),
        (ea = (1 << (32 - St(t) + n)) | (a << n) | l),
        (ta = i + e));
    } else ((ea = (1 << i) | (a << n) | l), (ta = e));
  }
  function uu(e) {
    e.return !== null && (fa(e, 1), Af(e, 1, 0));
  }
  function ou(e) {
    for (; e === fc; ) ((fc = an[--ln]), (an[ln] = null), (Jn = an[--ln]), (an[ln] = null));
    for (; e === Da; )
      ((Da = Lt[--qt]),
        (Lt[qt] = null),
        (ta = Lt[--qt]),
        (Lt[qt] = null),
        (ea = Lt[--qt]),
        (Lt[qt] = null));
  }
  function Nf(e, t) {
    ((Lt[qt++] = ea), (Lt[qt++] = ta), (Lt[qt++] = Da), (ea = t.id), (ta = t.overflow), (Da = e));
  }
  var Ie = null,
    ze = null,
    fe = !1,
    Ba = null,
    Ht = !1,
    ru = Error(o(519));
  function La(e) {
    var t = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Wn(Bt(t, e)), ru);
  }
  function Ef(e) {
    var t = e.stateNode,
      a = e.type,
      l = e.memoizedProps;
    switch (((t[Fe] = e), (t[ft] = l), a)) {
      case 'dialog':
        (se('cancel', t), se('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        se('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < _i.length; a++) se(_i[a], t);
        break;
      case 'source':
        se('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (se('error', t), se('load', t));
        break;
      case 'details':
        se('toggle', t);
        break;
      case 'input':
        (se('invalid', t),
          Ur(t, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
        break;
      case 'select':
        se('invalid', t);
        break;
      case 'textarea':
        (se('invalid', t), Vr(t, l.value, l.defaultValue, l.children));
    }
    ((a = l.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      l.suppressHydrationWarning === !0 ||
      km(t.textContent, a)
        ? (l.popover != null && (se('beforetoggle', t), se('toggle', t)),
          l.onScroll != null && se('scroll', t),
          l.onScrollEnd != null && se('scrollend', t),
          l.onClick != null && (t.onclick = ua),
          (t = !0))
        : (t = !1),
      t || La(e, !0));
  }
  function zf(e) {
    for (Ie = e.return; Ie; )
      switch (Ie.tag) {
        case 5:
        case 31:
        case 13:
          Ht = !1;
          return;
        case 27:
        case 3:
          Ht = !0;
          return;
        default:
          Ie = Ie.return;
      }
  }
  function nn(e) {
    if (e !== Ie) return !1;
    if (!fe) return (zf(e), (fe = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || Mo(e.type, e.memoizedProps))),
        (a = !a)),
      a && ze && La(e),
      zf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      ze = Pm(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      ze = Pm(e);
    } else
      t === 27
        ? ((t = ze), Wa(e.type) ? ((e = Do), (Do = null), (ze = e)) : (ze = t))
        : (ze = Ie ? Gt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function _l() {
    ((ze = Ie = null), (fe = !1));
  }
  function fu() {
    var e = Ba;
    return (e !== null && (gt === null ? (gt = e) : gt.push.apply(gt, e), (Ba = null)), e);
  }
  function Wn(e) {
    Ba === null ? (Ba = [e]) : Ba.push(e);
  }
  var du = x(null),
    pl = null,
    da = null;
  function qa(e, t, a) {
    ($(du, t._currentValue), (t._currentValue = a));
  }
  function ma(e) {
    ((e._currentValue = du.current), L(du));
  }
  function mu(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), l !== null && (l.childLanes |= t))
          : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function hu(e, t, a, l) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var i = n.dependencies;
      if (i !== null) {
        var f = n.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var v = i;
          i = n;
          for (var p = 0; p < t.length; p++)
            if (v.context === t[p]) {
              ((i.lanes |= a),
                (v = i.alternate),
                v !== null && (v.lanes |= a),
                mu(i.return, a, e),
                l || (f = null));
              break e;
            }
          i = v.next;
        }
      } else if (n.tag === 18) {
        if (((f = n.return), f === null)) throw Error(o(341));
        ((f.lanes |= a), (i = f.alternate), i !== null && (i.lanes |= a), mu(f, a, e), (f = null));
      } else f = n.child;
      if (f !== null) f.return = n;
      else
        for (f = n; f !== null; ) {
          if (f === e) {
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
  function cn(e, t, a, l) {
    e = null;
    for (var n = t, i = !1; n !== null; ) {
      if (!i) {
        if ((n.flags & 524288) !== 0) i = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var f = n.alternate;
        if (f === null) throw Error(o(387));
        if (((f = f.memoizedProps), f !== null)) {
          var v = n.type;
          xt(n.pendingProps.value, f.value) || (e !== null ? e.push(v) : (e = [v]));
        }
      } else if (n === me.current) {
        if (((f = n.alternate), f === null)) throw Error(o(387));
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(ji) : (e = [ji]));
      }
      n = n.return;
    }
    (e !== null && hu(t, e, a, l), (t.flags |= 262144));
  }
  function dc(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!xt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function bl(e) {
    ((pl = e), (da = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function Pe(e) {
    return Mf(pl, e);
  }
  function mc(e, t) {
    return (pl === null && bl(e), Mf(e, t));
  }
  function Mf(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), da === null)) {
      if (e === null) throw Error(o(308));
      ((da = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else da = da.next = t;
    return a;
  }
  var V1 =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, l) {
                  e.push(l);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                }));
            };
          },
    $1 = c.unstable_scheduleCallback,
    Y1 = c.unstable_NormalPriority,
    He = {
      $$typeof: ye,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function vu() {
    return { controller: new V1(), data: new Map(), refCount: 0 };
  }
  function Fn(e) {
    (e.refCount--,
      e.refCount === 0 &&
        $1(Y1, function () {
          e.controller.abort();
        }));
  }
  var In = null,
    gu = 0,
    sn = 0,
    un = null;
  function k1(e, t) {
    if (In === null) {
      var a = (In = []);
      ((gu = 0),
        (sn = bo()),
        (un = {
          status: 'pending',
          value: void 0,
          then: function (l) {
            a.push(l);
          },
        }));
    }
    return (gu++, t.then(Cf, Cf), t);
  }
  function Cf() {
    if (--gu === 0 && In !== null) {
      un !== null && (un.status = 'fulfilled');
      var e = In;
      ((In = null), (sn = 0), (un = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Z1(e, t) {
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
      e.then(
        function () {
          ((l.status = 'fulfilled'), (l.value = t));
          for (var n = 0; n < a.length; n++) (0, a[n])(t);
        },
        function (n) {
          for (l.status = 'rejected', l.reason = n, n = 0; n < a.length; n++) (0, a[n])(void 0);
        }
      ),
      l
    );
  }
  var wf = O.S;
  O.S = function (e, t) {
    ((hm = pt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && k1(e, t),
      wf !== null && wf(e, t));
  };
  var Sl = x(null);
  function yu() {
    var e = Sl.current;
    return e !== null ? e : Ne.pooledCache;
  }
  function hc(e, t) {
    t === null ? $(Sl, Sl.current) : $(Sl, t.pool);
  }
  function Of() {
    var e = yu();
    return e === null ? null : { parent: He._currentValue, pool: e };
  }
  var on = Error(o(460)),
    _u = Error(o(474)),
    vc = Error(o(542)),
    gc = { then: function () {} };
  function Rf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Df(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(ua, ua), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Lf(e), e);
      default:
        if (typeof t.status == 'string') t.then(ua, ua);
        else {
          if (((e = Ne), e !== null && 100 < e.shellSuspendCounter)) throw Error(o(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (l) {
                if (t.status === 'pending') {
                  var n = t;
                  ((n.status = 'fulfilled'), (n.value = l));
                }
              },
              function (l) {
                if (t.status === 'pending') {
                  var n = t;
                  ((n.status = 'rejected'), (n.reason = l));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), Lf(e), e);
        }
        throw ((jl = t), on);
    }
  }
  function xl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((jl = a), on) : a;
    }
  }
  var jl = null;
  function Bf() {
    if (jl === null) throw Error(o(459));
    var e = jl;
    return ((jl = null), e);
  }
  function Lf(e) {
    if (e === on || e === vc) throw Error(o(483));
  }
  var rn = null,
    Pn = 0;
  function yc(e) {
    var t = Pn;
    return ((Pn += 1), rn === null && (rn = []), Df(rn, e, t));
  }
  function ei(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function _c(e, t) {
    throw t.$$typeof === z
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function qf(e) {
    function t(j, S) {
      if (e) {
        var A = j.deletions;
        A === null ? ((j.deletions = [S]), (j.flags |= 16)) : A.push(S);
      }
    }
    function a(j, S) {
      if (!e) return null;
      for (; S !== null; ) (t(j, S), (S = S.sibling));
      return null;
    }
    function l(j) {
      for (var S = new Map(); j !== null; )
        (j.key !== null ? S.set(j.key, j) : S.set(j.index, j), (j = j.sibling));
      return S;
    }
    function n(j, S) {
      return ((j = ra(j, S)), (j.index = 0), (j.sibling = null), j);
    }
    function i(j, S, A) {
      return (
        (j.index = A),
        e
          ? ((A = j.alternate),
            A !== null
              ? ((A = A.index), A < S ? ((j.flags |= 67108866), S) : A)
              : ((j.flags |= 67108866), S))
          : ((j.flags |= 1048576), S)
      );
    }
    function f(j) {
      return (e && j.alternate === null && (j.flags |= 67108866), j);
    }
    function v(j, S, A, D) {
      return S === null || S.tag !== 6
        ? ((S = cu(A, j.mode, D)), (S.return = j), S)
        : ((S = n(S, A)), (S.return = j), S);
    }
    function p(j, S, A, D) {
      var K = A.type;
      return K === U
        ? w(j, S, A.props.children, D, A.key)
        : S !== null &&
            (S.elementType === K ||
              (typeof K == 'object' && K !== null && K.$$typeof === Ze && xl(K) === S.type))
          ? ((S = n(S, A.props)), ei(S, A), (S.return = j), S)
          : ((S = rc(A.type, A.key, A.props, null, j.mode, D)), ei(S, A), (S.return = j), S);
    }
    function N(j, S, A, D) {
      return S === null ||
        S.tag !== 4 ||
        S.stateNode.containerInfo !== A.containerInfo ||
        S.stateNode.implementation !== A.implementation
        ? ((S = su(A, j.mode, D)), (S.return = j), S)
        : ((S = n(S, A.children || [])), (S.return = j), S);
    }
    function w(j, S, A, D, K) {
      return S === null || S.tag !== 7
        ? ((S = yl(A, j.mode, D, K)), (S.return = j), S)
        : ((S = n(S, A)), (S.return = j), S);
    }
    function B(j, S, A) {
      if ((typeof S == 'string' && S !== '') || typeof S == 'number' || typeof S == 'bigint')
        return ((S = cu('' + S, j.mode, A)), (S.return = j), S);
      if (typeof S == 'object' && S !== null) {
        switch (S.$$typeof) {
          case q:
            return ((A = rc(S.type, S.key, S.props, null, j.mode, A)), ei(A, S), (A.return = j), A);
          case E:
            return ((S = su(S, j.mode, A)), (S.return = j), S);
          case Ze:
            return ((S = xl(S)), B(j, S, A));
        }
        if (nt(S) || Xe(S)) return ((S = yl(S, j.mode, A, null)), (S.return = j), S);
        if (typeof S.then == 'function') return B(j, yc(S), A);
        if (S.$$typeof === ye) return B(j, mc(j, S), A);
        _c(j, S);
      }
      return null;
    }
    function M(j, S, A, D) {
      var K = S !== null ? S.key : null;
      if ((typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint')
        return K !== null ? null : v(j, S, '' + A, D);
      if (typeof A == 'object' && A !== null) {
        switch (A.$$typeof) {
          case q:
            return A.key === K ? p(j, S, A, D) : null;
          case E:
            return A.key === K ? N(j, S, A, D) : null;
          case Ze:
            return ((A = xl(A)), M(j, S, A, D));
        }
        if (nt(A) || Xe(A)) return K !== null ? null : w(j, S, A, D, null);
        if (typeof A.then == 'function') return M(j, S, yc(A), D);
        if (A.$$typeof === ye) return M(j, S, mc(j, A), D);
        _c(j, A);
      }
      return null;
    }
    function C(j, S, A, D, K) {
      if ((typeof D == 'string' && D !== '') || typeof D == 'number' || typeof D == 'bigint')
        return ((j = j.get(A) || null), v(S, j, '' + D, K));
      if (typeof D == 'object' && D !== null) {
        switch (D.$$typeof) {
          case q:
            return ((j = j.get(D.key === null ? A : D.key) || null), p(S, j, D, K));
          case E:
            return ((j = j.get(D.key === null ? A : D.key) || null), N(S, j, D, K));
          case Ze:
            return ((D = xl(D)), C(j, S, A, D, K));
        }
        if (nt(D) || Xe(D)) return ((j = j.get(A) || null), w(S, j, D, K, null));
        if (typeof D.then == 'function') return C(j, S, A, yc(D), K);
        if (D.$$typeof === ye) return C(j, S, A, mc(S, D), K);
        _c(S, D);
      }
      return null;
    }
    function Y(j, S, A, D) {
      for (
        var K = null, he = null, Z = S, ae = (S = 0), oe = null;
        Z !== null && ae < A.length;
        ae++
      ) {
        Z.index > ae ? ((oe = Z), (Z = null)) : (oe = Z.sibling);
        var ve = M(j, Z, A[ae], D);
        if (ve === null) {
          Z === null && (Z = oe);
          break;
        }
        (e && Z && ve.alternate === null && t(j, Z),
          (S = i(ve, S, ae)),
          he === null ? (K = ve) : (he.sibling = ve),
          (he = ve),
          (Z = oe));
      }
      if (ae === A.length) return (a(j, Z), fe && fa(j, ae), K);
      if (Z === null) {
        for (; ae < A.length; ae++)
          ((Z = B(j, A[ae], D)),
            Z !== null && ((S = i(Z, S, ae)), he === null ? (K = Z) : (he.sibling = Z), (he = Z)));
        return (fe && fa(j, ae), K);
      }
      for (Z = l(Z); ae < A.length; ae++)
        ((oe = C(Z, j, ae, A[ae], D)),
          oe !== null &&
            (e && oe.alternate !== null && Z.delete(oe.key === null ? ae : oe.key),
            (S = i(oe, S, ae)),
            he === null ? (K = oe) : (he.sibling = oe),
            (he = oe)));
      return (
        e &&
          Z.forEach(function (tl) {
            return t(j, tl);
          }),
        fe && fa(j, ae),
        K
      );
    }
    function W(j, S, A, D) {
      if (A == null) throw Error(o(151));
      for (
        var K = null, he = null, Z = S, ae = (S = 0), oe = null, ve = A.next();
        Z !== null && !ve.done;
        ae++, ve = A.next()
      ) {
        Z.index > ae ? ((oe = Z), (Z = null)) : (oe = Z.sibling);
        var tl = M(j, Z, ve.value, D);
        if (tl === null) {
          Z === null && (Z = oe);
          break;
        }
        (e && Z && tl.alternate === null && t(j, Z),
          (S = i(tl, S, ae)),
          he === null ? (K = tl) : (he.sibling = tl),
          (he = tl),
          (Z = oe));
      }
      if (ve.done) return (a(j, Z), fe && fa(j, ae), K);
      if (Z === null) {
        for (; !ve.done; ae++, ve = A.next())
          ((ve = B(j, ve.value, D)),
            ve !== null &&
              ((S = i(ve, S, ae)), he === null ? (K = ve) : (he.sibling = ve), (he = ve)));
        return (fe && fa(j, ae), K);
      }
      for (Z = l(Z); !ve.done; ae++, ve = A.next())
        ((ve = C(Z, j, ae, ve.value, D)),
          ve !== null &&
            (e && ve.alternate !== null && Z.delete(ve.key === null ? ae : ve.key),
            (S = i(ve, S, ae)),
            he === null ? (K = ve) : (he.sibling = ve),
            (he = ve)));
      return (
        e &&
          Z.forEach(function (ag) {
            return t(j, ag);
          }),
        fe && fa(j, ae),
        K
      );
    }
    function Te(j, S, A, D) {
      if (
        (typeof A == 'object' &&
          A !== null &&
          A.type === U &&
          A.key === null &&
          (A = A.props.children),
        typeof A == 'object' && A !== null)
      ) {
        switch (A.$$typeof) {
          case q:
            e: {
              for (var K = A.key; S !== null; ) {
                if (S.key === K) {
                  if (((K = A.type), K === U)) {
                    if (S.tag === 7) {
                      (a(j, S.sibling), (D = n(S, A.props.children)), (D.return = j), (j = D));
                      break e;
                    }
                  } else if (
                    S.elementType === K ||
                    (typeof K == 'object' && K !== null && K.$$typeof === Ze && xl(K) === S.type)
                  ) {
                    (a(j, S.sibling), (D = n(S, A.props)), ei(D, A), (D.return = j), (j = D));
                    break e;
                  }
                  a(j, S);
                  break;
                } else t(j, S);
                S = S.sibling;
              }
              A.type === U
                ? ((D = yl(A.props.children, j.mode, D, A.key)), (D.return = j), (j = D))
                : ((D = rc(A.type, A.key, A.props, null, j.mode, D)),
                  ei(D, A),
                  (D.return = j),
                  (j = D));
            }
            return f(j);
          case E:
            e: {
              for (K = A.key; S !== null; ) {
                if (S.key === K)
                  if (
                    S.tag === 4 &&
                    S.stateNode.containerInfo === A.containerInfo &&
                    S.stateNode.implementation === A.implementation
                  ) {
                    (a(j, S.sibling), (D = n(S, A.children || [])), (D.return = j), (j = D));
                    break e;
                  } else {
                    a(j, S);
                    break;
                  }
                else t(j, S);
                S = S.sibling;
              }
              ((D = su(A, j.mode, D)), (D.return = j), (j = D));
            }
            return f(j);
          case Ze:
            return ((A = xl(A)), Te(j, S, A, D));
        }
        if (nt(A)) return Y(j, S, A, D);
        if (Xe(A)) {
          if (((K = Xe(A)), typeof K != 'function')) throw Error(o(150));
          return ((A = K.call(A)), W(j, S, A, D));
        }
        if (typeof A.then == 'function') return Te(j, S, yc(A), D);
        if (A.$$typeof === ye) return Te(j, S, mc(j, A), D);
        _c(j, A);
      }
      return (typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint'
        ? ((A = '' + A),
          S !== null && S.tag === 6
            ? (a(j, S.sibling), (D = n(S, A)), (D.return = j), (j = D))
            : (a(j, S), (D = cu(A, j.mode, D)), (D.return = j), (j = D)),
          f(j))
        : a(j, S);
    }
    return function (j, S, A, D) {
      try {
        Pn = 0;
        var K = Te(j, S, A, D);
        return ((rn = null), K);
      } catch (Z) {
        if (Z === on || Z === vc) throw Z;
        var he = jt(29, Z, null, j.mode);
        return ((he.lanes = D), (he.return = j), he);
      } finally {
      }
    };
  }
  var Tl = qf(!0),
    Hf = qf(!1),
    Ha = !1;
  function pu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function bu(e, t) {
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
  function Ua(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ga(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (ge & 2) !== 0)) {
      var n = l.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (l.pending = t),
        (t = oc(e)),
        Sf(e, null, a),
        t
      );
    }
    return (uc(e, l, t, a), oc(e));
  }
  function ti(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var l = t.lanes;
      ((l &= e.pendingLanes), (a |= l), (t.lanes = a), zr(e, a));
    }
  }
  function Su(e, t) {
    var a = e.updateQueue,
      l = e.alternate;
    if (l !== null && ((l = l.updateQueue), a === l)) {
      var n = null,
        i = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var f = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (i === null ? (n = i = f) : (i = i.next = f), (a = a.next));
        } while (a !== null);
        i === null ? (n = i = t) : (i = i.next = t);
      } else n = i = t;
      ((a = {
        baseState: l.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: i,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (e.updateQueue = a));
      return;
    }
    ((e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t));
  }
  var xu = !1;
  function ai() {
    if (xu) {
      var e = un;
      if (e !== null) throw e;
    }
  }
  function li(e, t, a, l) {
    xu = !1;
    var n = e.updateQueue;
    Ha = !1;
    var i = n.firstBaseUpdate,
      f = n.lastBaseUpdate,
      v = n.shared.pending;
    if (v !== null) {
      n.shared.pending = null;
      var p = v,
        N = p.next;
      ((p.next = null), f === null ? (i = N) : (f.next = N), (f = p));
      var w = e.alternate;
      w !== null &&
        ((w = w.updateQueue),
        (v = w.lastBaseUpdate),
        v !== f && (v === null ? (w.firstBaseUpdate = N) : (v.next = N), (w.lastBaseUpdate = p)));
    }
    if (i !== null) {
      var B = n.baseState;
      ((f = 0), (w = N = p = null), (v = i));
      do {
        var M = v.lane & -536870913,
          C = M !== v.lane;
        if (C ? (ue & M) === M : (l & M) === M) {
          (M !== 0 && M === sn && (xu = !0),
            w !== null &&
              (w = w.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          e: {
            var Y = e,
              W = v;
            M = t;
            var Te = a;
            switch (W.tag) {
              case 1:
                if (((Y = W.payload), typeof Y == 'function')) {
                  B = Y.call(Te, B, M);
                  break e;
                }
                B = Y;
                break e;
              case 3:
                Y.flags = (Y.flags & -65537) | 128;
              case 0:
                if (
                  ((Y = W.payload), (M = typeof Y == 'function' ? Y.call(Te, B, M) : Y), M == null)
                )
                  break e;
                B = T({}, B, M);
                break e;
              case 2:
                Ha = !0;
            }
          }
          ((M = v.callback),
            M !== null &&
              ((e.flags |= 64),
              C && (e.flags |= 8192),
              (C = n.callbacks),
              C === null ? (n.callbacks = [M]) : C.push(M)));
        } else
          ((C = { lane: M, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            w === null ? ((N = w = C), (p = B)) : (w = w.next = C),
            (f |= M));
        if (((v = v.next), v === null)) {
          if (((v = n.shared.pending), v === null)) break;
          ((C = v),
            (v = C.next),
            (C.next = null),
            (n.lastBaseUpdate = C),
            (n.shared.pending = null));
        }
      } while (!0);
      (w === null && (p = B),
        (n.baseState = p),
        (n.firstBaseUpdate = N),
        (n.lastBaseUpdate = w),
        i === null && (n.shared.lanes = 0),
        (Za |= f),
        (e.lanes = f),
        (e.memoizedState = B));
    }
  }
  function Uf(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function Gf(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) Uf(a[e], t);
  }
  var fn = x(null),
    pc = x(0);
  function Vf(e, t) {
    ((e = xa), $(pc, e), $(fn, t), (xa = e | t.baseLanes));
  }
  function ju() {
    ($(pc, xa), $(fn, fn.current));
  }
  function Tu() {
    ((xa = pc.current), L(fn), L(pc));
  }
  var Tt = x(null),
    Ut = null;
  function Va(e) {
    var t = e.alternate;
    ($(Le, Le.current & 1),
      $(Tt, e),
      Ut === null && (t === null || fn.current !== null || t.memoizedState !== null) && (Ut = e));
  }
  function Au(e) {
    ($(Le, Le.current), $(Tt, e), Ut === null && (Ut = e));
  }
  function $f(e) {
    e.tag === 22 ? ($(Le, Le.current), $(Tt, e), Ut === null && (Ut = e)) : $a();
  }
  function $a() {
    ($(Le, Le.current), $(Tt, Tt.current));
  }
  function At(e) {
    (L(Tt), Ut === e && (Ut = null), L(Le));
  }
  var Le = x(0);
  function bc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Oo(a) || Ro(a))) return t;
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
  var ha = 0,
    te = null,
    xe = null,
    Ue = null,
    Sc = !1,
    dn = !1,
    Al = !1,
    xc = 0,
    ni = 0,
    mn = null,
    X1 = 0;
  function Oe() {
    throw Error(o(321));
  }
  function Nu(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!xt(e[a], t[a])) return !1;
    return !0;
  }
  function Eu(e, t, a, l, n, i) {
    return (
      (ha = i),
      (te = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (O.H = e === null || e.memoizedState === null ? Ad : $u),
      (Al = !1),
      (i = a(l, n)),
      (Al = !1),
      dn && (i = kf(t, a, l, n)),
      Yf(e),
      i
    );
  }
  function Yf(e) {
    O.H = si;
    var t = xe !== null && xe.next !== null;
    if (((ha = 0), (Ue = xe = te = null), (Sc = !1), (ni = 0), (mn = null), t)) throw Error(o(300));
    e === null || Ge || ((e = e.dependencies), e !== null && dc(e) && (Ge = !0));
  }
  function kf(e, t, a, l) {
    te = e;
    var n = 0;
    do {
      if ((dn && (mn = null), (ni = 0), (dn = !1), 25 <= n)) throw Error(o(301));
      if (((n += 1), (Ue = xe = null), e.updateQueue != null)) {
        var i = e.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((O.H = Nd), (i = t(a, l)));
    } while (dn);
    return i;
  }
  function Q1() {
    var e = O.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? ii(t) : t),
      (e = e.useState()[0]),
      (xe !== null ? xe.memoizedState : null) !== e && (te.flags |= 1024),
      t
    );
  }
  function zu() {
    var e = xc !== 0;
    return ((xc = 0), e);
  }
  function Mu(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Cu(e) {
    if (Sc) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Sc = !1;
    }
    ((ha = 0), (Ue = xe = te = null), (dn = !1), (ni = xc = 0), (mn = null));
  }
  function ot() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Ue === null ? (te.memoizedState = Ue = e) : (Ue = Ue.next = e), Ue);
  }
  function qe() {
    if (xe === null) {
      var e = te.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = xe.next;
    var t = Ue === null ? te.memoizedState : Ue.next;
    if (t !== null) ((Ue = t), (xe = e));
    else {
      if (e === null) throw te.alternate === null ? Error(o(467)) : Error(o(310));
      ((xe = e),
        (e = {
          memoizedState: xe.memoizedState,
          baseState: xe.baseState,
          baseQueue: xe.baseQueue,
          queue: xe.queue,
          next: null,
        }),
        Ue === null ? (te.memoizedState = Ue = e) : (Ue = Ue.next = e));
    }
    return Ue;
  }
  function jc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ii(e) {
    var t = ni;
    return (
      (ni += 1),
      mn === null && (mn = []),
      (e = Df(mn, e, t)),
      (t = te),
      (Ue === null ? t.memoizedState : Ue.next) === null &&
        ((t = t.alternate), (O.H = t === null || t.memoizedState === null ? Ad : $u)),
      e
    );
  }
  function Tc(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return ii(e);
      if (e.$$typeof === ye) return Pe(e);
    }
    throw Error(o(438, String(e)));
  }
  function wu(e) {
    var t = null,
      a = te.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var l = te.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (t = {
              data: l.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = jc()), (te.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++) a[l] = ut;
    return (t.index++, a);
  }
  function va(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Ac(e) {
    var t = qe();
    return Ou(t, xe, e);
  }
  function Ou(e, t, a) {
    var l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = a;
    var n = e.baseQueue,
      i = l.pending;
    if (i !== null) {
      if (n !== null) {
        var f = n.next;
        ((n.next = i.next), (i.next = f));
      }
      ((t.baseQueue = n = i), (l.pending = null));
    }
    if (((i = e.baseState), n === null)) e.memoizedState = i;
    else {
      t = n.next;
      var v = (f = null),
        p = null,
        N = t,
        w = !1;
      do {
        var B = N.lane & -536870913;
        if (B !== N.lane ? (ue & B) === B : (ha & B) === B) {
          var M = N.revertLane;
          if (M === 0)
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
              B === sn && (w = !0));
          else if ((ha & M) === M) {
            ((N = N.next), M === sn && (w = !0));
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
              (te.lanes |= M),
              (Za |= M));
          ((B = N.action), Al && a(i, B), (i = N.hasEagerState ? N.eagerState : a(i, B)));
        } else
          ((M = {
            lane: B,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null,
          }),
            p === null ? ((v = p = M), (f = i)) : (p = p.next = M),
            (te.lanes |= B),
            (Za |= B));
        N = N.next;
      } while (N !== null && N !== t);
      if (
        (p === null ? (f = i) : (p.next = v),
        !xt(i, e.memoizedState) && ((Ge = !0), w && ((a = un), a !== null)))
      )
        throw a;
      ((e.memoizedState = i), (e.baseState = f), (e.baseQueue = p), (l.lastRenderedState = i));
    }
    return (n === null && (l.lanes = 0), [e.memoizedState, l.dispatch]);
  }
  function Ru(e) {
    var t = qe(),
      a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch,
      n = a.pending,
      i = t.memoizedState;
    if (n !== null) {
      a.pending = null;
      var f = (n = n.next);
      do ((i = e(i, f.action)), (f = f.next));
      while (f !== n);
      (xt(i, t.memoizedState) || (Ge = !0),
        (t.memoizedState = i),
        t.baseQueue === null && (t.baseState = i),
        (a.lastRenderedState = i));
    }
    return [i, l];
  }
  function Zf(e, t, a) {
    var l = te,
      n = qe(),
      i = fe;
    if (i) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var f = !xt((xe || n).memoizedState, a);
    if (
      (f && ((n.memoizedState = a), (Ge = !0)),
      (n = n.queue),
      Lu(Kf.bind(null, l, n, e), [e]),
      n.getSnapshot !== t || f || (Ue !== null && Ue.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        hn(9, { destroy: void 0 }, Qf.bind(null, l, n, a, t), null),
        Ne === null)
      )
        throw Error(o(349));
      i || (ha & 127) !== 0 || Xf(l, t, a);
    }
    return a;
  }
  function Xf(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = te.updateQueue),
      t === null
        ? ((t = jc()), (te.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function Qf(e, t, a, l) {
    ((t.value = a), (t.getSnapshot = l), Jf(t) && Wf(e));
  }
  function Kf(e, t, a) {
    return a(function () {
      Jf(t) && Wf(e);
    });
  }
  function Jf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !xt(e, a);
    } catch {
      return !0;
    }
  }
  function Wf(e) {
    var t = gl(e, 2);
    t !== null && yt(t, e, 2);
  }
  function Du(e) {
    var t = ot();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Al)) {
        wa(!0);
        try {
          a();
        } finally {
          wa(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: va,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Ff(e, t, a, l) {
    return ((e.baseState = a), Ou(e, xe, typeof l == 'function' ? l : va));
  }
  function K1(e, t, a, l, n) {
    if (zc(e)) throw Error(o(485));
    if (((e = t.action), e !== null)) {
      var i = {
        payload: n,
        action: e,
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
      (O.T !== null ? a(!0) : (i.isTransition = !1),
        l(i),
        (a = t.pending),
        a === null
          ? ((i.next = t.pending = i), If(t, i))
          : ((i.next = a.next), (t.pending = a.next = i)));
    }
  }
  function If(e, t) {
    var a = t.action,
      l = t.payload,
      n = e.state;
    if (t.isTransition) {
      var i = O.T,
        f = {};
      O.T = f;
      try {
        var v = a(n, l),
          p = O.S;
        (p !== null && p(f, v), Pf(e, t, v));
      } catch (N) {
        Bu(e, t, N);
      } finally {
        (i !== null && f.types !== null && (i.types = f.types), (O.T = i));
      }
    } else
      try {
        ((i = a(n, l)), Pf(e, t, i));
      } catch (N) {
        Bu(e, t, N);
      }
  }
  function Pf(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (l) {
            ed(e, t, l);
          },
          function (l) {
            return Bu(e, t, l);
          }
        )
      : ed(e, t, a);
  }
  function ed(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      td(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), If(e, a))));
  }
  function Bu(e, t, a) {
    var l = e.pending;
    if (((e.pending = null), l !== null)) {
      l = l.next;
      do ((t.status = 'rejected'), (t.reason = a), td(t), (t = t.next));
      while (t !== l);
    }
    e.action = null;
  }
  function td(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function ad(e, t) {
    return t;
  }
  function ld(e, t) {
    if (fe) {
      var a = Ne.formState;
      if (a !== null) {
        e: {
          var l = te;
          if (fe) {
            if (ze) {
              t: {
                for (var n = ze, i = Ht; n.nodeType !== 8; ) {
                  if (!i) {
                    n = null;
                    break t;
                  }
                  if (((n = Gt(n.nextSibling)), n === null)) {
                    n = null;
                    break t;
                  }
                }
                ((i = n.data), (n = i === 'F!' || i === 'F' ? n : null));
              }
              if (n) {
                ((ze = Gt(n.nextSibling)), (l = n.data === 'F!'));
                break e;
              }
            }
            La(l);
          }
          l = !1;
        }
        l && (t = a[0]);
      }
    }
    return (
      (a = ot()),
      (a.memoizedState = a.baseState = t),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ad,
        lastRenderedState: t,
      }),
      (a.queue = l),
      (a = xd.bind(null, te, l)),
      (l.dispatch = a),
      (l = Du(!1)),
      (i = Vu.bind(null, te, !1, l.queue)),
      (l = ot()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (l.queue = n),
      (a = K1.bind(null, te, n, i, a)),
      (n.dispatch = a),
      (l.memoizedState = e),
      [t, a, !1]
    );
  }
  function nd(e) {
    var t = qe();
    return id(t, xe, e);
  }
  function id(e, t, a) {
    if (
      ((t = Ou(e, t, ad)[0]),
      (e = Ac(va)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var l = ii(t);
      } catch (f) {
        throw f === on ? vc : f;
      }
    else l = t;
    t = qe();
    var n = t.queue,
      i = n.dispatch;
    return (
      a !== t.memoizedState &&
        ((te.flags |= 2048), hn(9, { destroy: void 0 }, J1.bind(null, n, a), null)),
      [l, i, e]
    );
  }
  function J1(e, t) {
    e.action = t;
  }
  function cd(e) {
    var t = qe(),
      a = xe;
    if (a !== null) return id(t, a, e);
    (qe(), (t = t.memoizedState), (a = qe()));
    var l = a.queue.dispatch;
    return ((a.memoizedState = e), [t, l, !1]);
  }
  function hn(e, t, a, l) {
    return (
      (e = { tag: e, create: a, deps: l, inst: t, next: null }),
      (t = te.updateQueue),
      t === null && ((t = jc()), (te.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((l = a.next), (a.next = e), (e.next = l), (t.lastEffect = e)),
      e
    );
  }
  function sd() {
    return qe().memoizedState;
  }
  function Nc(e, t, a, l) {
    var n = ot();
    ((te.flags |= e),
      (n.memoizedState = hn(1 | t, { destroy: void 0 }, a, l === void 0 ? null : l)));
  }
  function Ec(e, t, a, l) {
    var n = qe();
    l = l === void 0 ? null : l;
    var i = n.memoizedState.inst;
    xe !== null && l !== null && Nu(l, xe.memoizedState.deps)
      ? (n.memoizedState = hn(t, i, a, l))
      : ((te.flags |= e), (n.memoizedState = hn(1 | t, i, a, l)));
  }
  function ud(e, t) {
    Nc(8390656, 8, e, t);
  }
  function Lu(e, t) {
    Ec(2048, 8, e, t);
  }
  function W1(e) {
    te.flags |= 4;
    var t = te.updateQueue;
    if (t === null) ((t = jc()), (te.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function od(e) {
    var t = qe().memoizedState;
    return (
      W1({ ref: t, nextImpl: e }),
      function () {
        if ((ge & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function rd(e, t) {
    return Ec(4, 2, e, t);
  }
  function fd(e, t) {
    return Ec(4, 4, e, t);
  }
  function dd(e, t) {
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
  function md(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), Ec(4, 4, dd.bind(null, t, e), a));
  }
  function qu() {}
  function hd(e, t) {
    var a = qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Nu(t, l[1]) ? l[0] : ((a.memoizedState = [e, t]), e);
  }
  function vd(e, t) {
    var a = qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Nu(t, l[1])) return l[0];
    if (((l = e()), Al)) {
      wa(!0);
      try {
        e();
      } finally {
        wa(!1);
      }
    }
    return ((a.memoizedState = [l, t]), l);
  }
  function Hu(e, t, a) {
    return a === void 0 || ((ha & 1073741824) !== 0 && (ue & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = gm()), (te.lanes |= e), (Za |= e), a);
  }
  function gd(e, t, a, l) {
    return xt(a, t)
      ? a
      : fn.current !== null
        ? ((e = Hu(e, a, l)), xt(e, t) || (Ge = !0), e)
        : (ha & 42) === 0 || ((ha & 1073741824) !== 0 && (ue & 261930) === 0)
          ? ((Ge = !0), (e.memoizedState = a))
          : ((e = gm()), (te.lanes |= e), (Za |= e), t);
  }
  function yd(e, t, a, l, n) {
    var i = G.p;
    G.p = i !== 0 && 8 > i ? i : 8;
    var f = O.T,
      v = {};
    ((O.T = v), Vu(e, !1, t, a));
    try {
      var p = n(),
        N = O.S;
      if (
        (N !== null && N(v, p), p !== null && typeof p == 'object' && typeof p.then == 'function')
      ) {
        var w = Z1(p, l);
        ci(e, t, w, zt(e));
      } else ci(e, t, l, zt(e));
    } catch (B) {
      ci(e, t, { then: function () {}, status: 'rejected', reason: B }, zt());
    } finally {
      ((G.p = i), f !== null && v.types !== null && (f.types = v.types), (O.T = f));
    }
  }
  function F1() {}
  function Uu(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var n = _d(e).queue;
    yd(
      e,
      n,
      t,
      F,
      a === null
        ? F1
        : function () {
            return (pd(e), a(l));
          }
    );
  }
  function _d(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: F,
      baseState: F,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: va,
        lastRenderedState: F,
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
          lastRenderedReducer: va,
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
  function pd(e) {
    var t = _d(e);
    (t.next === null && (t = e.alternate.memoizedState), ci(e, t.next.queue, {}, zt()));
  }
  function Gu() {
    return Pe(ji);
  }
  function bd() {
    return qe().memoizedState;
  }
  function Sd() {
    return qe().memoizedState;
  }
  function I1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = zt();
          e = Ua(a);
          var l = Ga(t, e, a);
          (l !== null && (yt(l, t, a), ti(l, t, a)), (t = { cache: vu() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function P1(e, t, a) {
    var l = zt();
    ((a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      zc(e) ? jd(t, a) : ((a = nu(e, t, a, l)), a !== null && (yt(a, e, l), Td(a, t, l))));
  }
  function xd(e, t, a) {
    var l = zt();
    ci(e, t, a, l);
  }
  function ci(e, t, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (zc(e)) jd(t, n);
    else {
      var i = e.alternate;
      if (
        e.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = t.lastRenderedReducer), i !== null)
      )
        try {
          var f = t.lastRenderedState,
            v = i(f, a);
          if (((n.hasEagerState = !0), (n.eagerState = v), xt(v, f)))
            return (uc(e, t, n, 0), Ne === null && sc(), !1);
        } catch {
        } finally {
        }
      if (((a = nu(e, t, n, l)), a !== null)) return (yt(a, e, l), Td(a, t, l), !0);
    }
    return !1;
  }
  function Vu(e, t, a, l) {
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
      zc(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = nu(e, a, l, 2)), t !== null && yt(t, e, 2));
  }
  function zc(e) {
    var t = e.alternate;
    return e === te || (t !== null && t === te);
  }
  function jd(e, t) {
    dn = Sc = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function Td(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      ((l &= e.pendingLanes), (a |= l), (t.lanes = a), zr(e, a));
    }
  }
  var si = {
    readContext: Pe,
    use: Tc,
    useCallback: Oe,
    useContext: Oe,
    useEffect: Oe,
    useImperativeHandle: Oe,
    useLayoutEffect: Oe,
    useInsertionEffect: Oe,
    useMemo: Oe,
    useReducer: Oe,
    useRef: Oe,
    useState: Oe,
    useDebugValue: Oe,
    useDeferredValue: Oe,
    useTransition: Oe,
    useSyncExternalStore: Oe,
    useId: Oe,
    useHostTransitionStatus: Oe,
    useFormState: Oe,
    useActionState: Oe,
    useOptimistic: Oe,
    useMemoCache: Oe,
    useCacheRefresh: Oe,
  };
  si.useEffectEvent = Oe;
  var Ad = {
      readContext: Pe,
      use: Tc,
      useCallback: function (e, t) {
        return ((ot().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Pe,
      useEffect: ud,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), Nc(4194308, 4, dd.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return Nc(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Nc(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = ot();
        t = t === void 0 ? null : t;
        var l = e();
        if (Al) {
          wa(!0);
          try {
            e();
          } finally {
            wa(!1);
          }
        }
        return ((a.memoizedState = [l, t]), l);
      },
      useReducer: function (e, t, a) {
        var l = ot();
        if (a !== void 0) {
          var n = a(t);
          if (Al) {
            wa(!0);
            try {
              a(t);
            } finally {
              wa(!1);
            }
          }
        } else n = t;
        return (
          (l.memoizedState = l.baseState = n),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (l.queue = e),
          (e = e.dispatch = P1.bind(null, te, e)),
          [l.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = ot();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Du(e);
        var t = e.queue,
          a = xd.bind(null, te, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: qu,
      useDeferredValue: function (e, t) {
        var a = ot();
        return Hu(a, e, t);
      },
      useTransition: function () {
        var e = Du(!1);
        return ((e = yd.bind(null, te, e.queue, !0, !1)), (ot().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var l = te,
          n = ot();
        if (fe) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = t()), Ne === null)) throw Error(o(349));
          (ue & 127) !== 0 || Xf(l, t, a);
        }
        n.memoizedState = a;
        var i = { value: a, getSnapshot: t };
        return (
          (n.queue = i),
          ud(Kf.bind(null, l, i, e), [e]),
          (l.flags |= 2048),
          hn(9, { destroy: void 0 }, Qf.bind(null, l, i, a, t), null),
          a
        );
      },
      useId: function () {
        var e = ot(),
          t = Ne.identifierPrefix;
        if (fe) {
          var a = ta,
            l = ea;
          ((a = (l & ~(1 << (32 - St(l) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = xc++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = X1++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Gu,
      useFormState: ld,
      useActionState: ld,
      useOptimistic: function (e) {
        var t = ot();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = a), (t = Vu.bind(null, te, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: wu,
      useCacheRefresh: function () {
        return (ot().memoizedState = I1.bind(null, te));
      },
      useEffectEvent: function (e) {
        var t = ot(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((ge & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    $u = {
      readContext: Pe,
      use: Tc,
      useCallback: hd,
      useContext: Pe,
      useEffect: Lu,
      useImperativeHandle: md,
      useInsertionEffect: rd,
      useLayoutEffect: fd,
      useMemo: vd,
      useReducer: Ac,
      useRef: sd,
      useState: function () {
        return Ac(va);
      },
      useDebugValue: qu,
      useDeferredValue: function (e, t) {
        var a = qe();
        return gd(a, xe.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Ac(va)[0],
          t = qe().memoizedState;
        return [typeof e == 'boolean' ? e : ii(e), t];
      },
      useSyncExternalStore: Zf,
      useId: bd,
      useHostTransitionStatus: Gu,
      useFormState: nd,
      useActionState: nd,
      useOptimistic: function (e, t) {
        var a = qe();
        return Ff(a, xe, e, t);
      },
      useMemoCache: wu,
      useCacheRefresh: Sd,
    };
  $u.useEffectEvent = od;
  var Nd = {
    readContext: Pe,
    use: Tc,
    useCallback: hd,
    useContext: Pe,
    useEffect: Lu,
    useImperativeHandle: md,
    useInsertionEffect: rd,
    useLayoutEffect: fd,
    useMemo: vd,
    useReducer: Ru,
    useRef: sd,
    useState: function () {
      return Ru(va);
    },
    useDebugValue: qu,
    useDeferredValue: function (e, t) {
      var a = qe();
      return xe === null ? Hu(a, e, t) : gd(a, xe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Ru(va)[0],
        t = qe().memoizedState;
      return [typeof e == 'boolean' ? e : ii(e), t];
    },
    useSyncExternalStore: Zf,
    useId: bd,
    useHostTransitionStatus: Gu,
    useFormState: cd,
    useActionState: cd,
    useOptimistic: function (e, t) {
      var a = qe();
      return xe !== null ? Ff(a, xe, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: wu,
    useCacheRefresh: Sd,
  };
  Nd.useEffectEvent = od;
  function Yu(e, t, a, l) {
    ((t = e.memoizedState),
      (a = a(l, t)),
      (a = a == null ? t : T({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var ku = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var l = zt(),
        n = Ua(l);
      ((n.payload = t),
        a != null && (n.callback = a),
        (t = Ga(e, n, l)),
        t !== null && (yt(t, e, l), ti(t, e, l)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var l = zt(),
        n = Ua(l);
      ((n.tag = 1),
        (n.payload = t),
        a != null && (n.callback = a),
        (t = Ga(e, n, l)),
        t !== null && (yt(t, e, l), ti(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = zt(),
        l = Ua(a);
      ((l.tag = 2),
        t != null && (l.callback = t),
        (t = Ga(e, l, a)),
        t !== null && (yt(t, e, a), ti(t, e, a)));
    },
  };
  function Ed(e, t, a, l, n, i, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(l, i, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Qn(a, l) || !Qn(n, i)
          : !0
    );
  }
  function zd(e, t, a, l) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, l),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, l),
      t.state !== e && ku.enqueueReplaceState(t, t.state, null));
  }
  function Nl(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var l in t) l !== 'ref' && (a[l] = t[l]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = T({}, a));
      for (var n in e) a[n] === void 0 && (a[n] = e[n]);
    }
    return a;
  }
  function Md(e) {
    cc(e);
  }
  function Cd(e) {
    console.error(e);
  }
  function wd(e) {
    cc(e);
  }
  function Mc(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Od(e, t, a) {
    try {
      var l = e.onCaughtError;
      l(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Zu(e, t, a) {
    return (
      (a = Ua(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Mc(e, t);
      }),
      a
    );
  }
  function Rd(e) {
    return ((e = Ua(e)), (e.tag = 3), e);
  }
  function Dd(e, t, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == 'function') {
      var i = l.value;
      ((e.payload = function () {
        return n(i);
      }),
        (e.callback = function () {
          Od(t, a, l);
        }));
    }
    var f = a.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (e.callback = function () {
        (Od(t, a, l),
          typeof n != 'function' && (Xa === null ? (Xa = new Set([this])) : Xa.add(this)));
        var v = l.stack;
        this.componentDidCatch(l.value, { componentStack: v !== null ? v : '' });
      });
  }
  function ev(e, t, a, l, n) {
    if (((a.flags |= 32768), l !== null && typeof l == 'object' && typeof l.then == 'function')) {
      if (((t = a.alternate), t !== null && cn(t, a, n, !0), (a = Tt.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Ut === null ? Vc() : a.alternate === null && Re === 0 && (Re = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = n),
              l === gc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([l])) : t.add(l),
                  yo(e, l, n)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              l === gc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([l])) : a.add(l)),
                  yo(e, l, n)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (yo(e, l, n), Vc(), !1);
    }
    if (fe)
      return (
        (t = Tt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            l !== ru && ((e = Error(o(422), { cause: l })), Wn(Bt(e, a))))
          : (l !== ru && ((t = Error(o(423), { cause: l })), Wn(Bt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (n &= -n),
            (e.lanes |= n),
            (l = Bt(l, a)),
            (n = Zu(e.stateNode, l, n)),
            Su(e, n),
            Re !== 4 && (Re = 2)),
        !1
      );
    var i = Error(o(520), { cause: l });
    if (((i = Bt(i, a)), vi === null ? (vi = [i]) : vi.push(i), Re !== 4 && (Re = 2), t === null))
      return !0;
    ((l = Bt(l, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = n & -n),
            (a.lanes |= e),
            (e = Zu(a.stateNode, l, e)),
            Su(a, e),
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
                  (Xa === null || !Xa.has(i)))))
          )
            return (
              (a.flags |= 65536),
              (n &= -n),
              (a.lanes |= n),
              (n = Rd(n)),
              Dd(n, e, a, l),
              Su(a, n),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Xu = Error(o(461)),
    Ge = !1;
  function et(e, t, a, l) {
    t.child = e === null ? Hf(t, null, a, l) : Tl(t, e.child, a, l);
  }
  function Bd(e, t, a, l, n) {
    a = a.render;
    var i = t.ref;
    if ('ref' in l) {
      var f = {};
      for (var v in l) v !== 'ref' && (f[v] = l[v]);
    } else f = l;
    return (
      bl(t),
      (l = Eu(e, t, a, f, i, n)),
      (v = zu()),
      e !== null && !Ge
        ? (Mu(e, t, n), ga(e, t, n))
        : (fe && v && uu(t), (t.flags |= 1), et(e, t, l, n), t.child)
    );
  }
  function Ld(e, t, a, l, n) {
    if (e === null) {
      var i = a.type;
      return typeof i == 'function' && !iu(i) && i.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = i), qd(e, t, i, l, n))
        : ((e = rc(a.type, null, l, t, t.mode, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((i = e.child), !eo(e, n))) {
      var f = i.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Qn), a(f, l) && e.ref === t.ref))
        return ga(e, t, n);
    }
    return ((t.flags |= 1), (e = ra(i, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function qd(e, t, a, l, n) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Qn(i, l) && e.ref === t.ref)
        if (((Ge = !1), (t.pendingProps = l = i), eo(e, n))) (e.flags & 131072) !== 0 && (Ge = !0);
        else return ((t.lanes = e.lanes), ga(e, t, n));
    }
    return Qu(e, t, a, l, n);
  }
  function Hd(e, t, a, l) {
    var n = l.children,
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
      l.mode === 'hidden')
    ) {
      if ((t.flags & 128) !== 0) {
        if (((i = i !== null ? i.baseLanes | a : a), e !== null)) {
          for (l = t.child = e.child, n = 0; l !== null; )
            ((n = n | l.lanes | l.childLanes), (l = l.sibling));
          l = n & ~i;
        } else ((l = 0), (t.child = null));
        return Ud(e, t, i, a, l);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && hc(t, i !== null ? i.cachePool : null),
          i !== null ? Vf(t, i) : ju(),
          $f(t));
      else return ((l = t.lanes = 536870912), Ud(e, t, i !== null ? i.baseLanes | a : a, a, l));
    } else
      i !== null
        ? (hc(t, i.cachePool), Vf(t, i), $a(), (t.memoizedState = null))
        : (e !== null && hc(t, null), ju(), $a());
    return (et(e, t, n, a), t.child);
  }
  function ui(e, t) {
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
  function Ud(e, t, a, l, n) {
    var i = yu();
    return (
      (i = i === null ? null : { parent: He._currentValue, pool: i }),
      (t.memoizedState = { baseLanes: a, cachePool: i }),
      e !== null && hc(t, null),
      ju(),
      $f(t),
      e !== null && cn(e, t, l, !0),
      (t.childLanes = n),
      null
    );
  }
  function Cc(e, t) {
    return (
      (t = Oc({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Gd(e, t, a) {
    return (
      Tl(t, e.child, null, a),
      (e = Cc(t, t.pendingProps)),
      (e.flags |= 2),
      At(t),
      (t.memoizedState = null),
      e
    );
  }
  function tv(e, t, a) {
    var l = t.pendingProps,
      n = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (fe) {
        if (l.mode === 'hidden') return ((e = Cc(t, l)), (t.lanes = 536870912), ui(null, e));
        if (
          (Au(t),
          (e = ze)
            ? ((e = Im(e, Ht)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Da !== null ? { id: ea, overflow: ta } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = jf(e)),
                (a.return = t),
                (t.child = a),
                (Ie = t),
                (ze = null)))
            : (e = null),
          e === null)
        )
          throw La(t);
        return ((t.lanes = 536870912), null);
      }
      return Cc(t, l);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var f = i.dehydrated;
      if ((Au(t), n))
        if (t.flags & 256) ((t.flags &= -257), (t = Gd(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if ((Ge || cn(e, t, a, !1), (n = (a & e.childLanes) !== 0), Ge || n)) {
        if (((l = Ne), l !== null && ((f = Mr(l, a)), f !== 0 && f !== i.retryLane)))
          throw ((i.retryLane = f), gl(e, f), yt(l, e, f), Xu);
        (Vc(), (t = Gd(e, t, a)));
      } else
        ((e = i.treeContext),
          (ze = Gt(f.nextSibling)),
          (Ie = t),
          (fe = !0),
          (Ba = null),
          (Ht = !1),
          e !== null && Nf(t, e),
          (t = Cc(t, l)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = ra(e.child, { mode: l.mode, children: l.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function wc(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Qu(e, t, a, l, n) {
    return (
      bl(t),
      (a = Eu(e, t, a, l, void 0, n)),
      (l = zu()),
      e !== null && !Ge
        ? (Mu(e, t, n), ga(e, t, n))
        : (fe && l && uu(t), (t.flags |= 1), et(e, t, a, n), t.child)
    );
  }
  function Vd(e, t, a, l, n, i) {
    return (
      bl(t),
      (t.updateQueue = null),
      (a = kf(t, l, a, n)),
      Yf(e),
      (l = zu()),
      e !== null && !Ge
        ? (Mu(e, t, i), ga(e, t, i))
        : (fe && l && uu(t), (t.flags |= 1), et(e, t, a, i), t.child)
    );
  }
  function $d(e, t, a, l, n) {
    if ((bl(t), t.stateNode === null)) {
      var i = tn,
        f = a.contextType;
      (typeof f == 'object' && f !== null && (i = Pe(f)),
        (i = new a(l, i)),
        (t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = ku),
        (t.stateNode = i),
        (i._reactInternals = t),
        (i = t.stateNode),
        (i.props = l),
        (i.state = t.memoizedState),
        (i.refs = {}),
        pu(t),
        (f = a.contextType),
        (i.context = typeof f == 'object' && f !== null ? Pe(f) : tn),
        (i.state = t.memoizedState),
        (f = a.getDerivedStateFromProps),
        typeof f == 'function' && (Yu(t, a, f, l), (i.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof i.getSnapshotBeforeUpdate == 'function' ||
          (typeof i.UNSAFE_componentWillMount != 'function' &&
            typeof i.componentWillMount != 'function') ||
          ((f = i.state),
          typeof i.componentWillMount == 'function' && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
          f !== i.state && ku.enqueueReplaceState(i, i.state, null),
          li(t, l, i, n),
          ai(),
          (i.state = t.memoizedState)),
        typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
        (l = !0));
    } else if (e === null) {
      i = t.stateNode;
      var v = t.memoizedProps,
        p = Nl(a, v);
      i.props = p;
      var N = i.context,
        w = a.contextType;
      ((f = tn), typeof w == 'object' && w !== null && (f = Pe(w)));
      var B = a.getDerivedStateFromProps;
      ((w = typeof B == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        w ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((v || N !== f) && zd(t, i, l, f)),
        (Ha = !1));
      var M = t.memoizedState;
      ((i.state = M),
        li(t, l, i, n),
        ai(),
        (N = t.memoizedState),
        v || M !== N || Ha
          ? (typeof B == 'function' && (Yu(t, a, B, l), (N = t.memoizedState)),
            (p = Ha || Ed(t, a, p, l, M, N, f))
              ? (w ||
                  (typeof i.UNSAFE_componentWillMount != 'function' &&
                    typeof i.componentWillMount != 'function') ||
                  (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == 'function' &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = l),
                (t.memoizedState = N)),
            (i.props = l),
            (i.state = N),
            (i.context = f),
            (l = p))
          : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (l = !1)));
    } else {
      ((i = t.stateNode),
        bu(e, t),
        (f = t.memoizedProps),
        (w = Nl(a, f)),
        (i.props = w),
        (B = t.pendingProps),
        (M = i.context),
        (N = a.contextType),
        (p = tn),
        typeof N == 'object' && N !== null && (p = Pe(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((f !== B || M !== p) && zd(t, i, l, p)),
        (Ha = !1),
        (M = t.memoizedState),
        (i.state = M),
        li(t, l, i, n),
        ai());
      var C = t.memoizedState;
      f !== B || M !== C || Ha || (e !== null && e.dependencies !== null && dc(e.dependencies))
        ? (typeof v == 'function' && (Yu(t, a, v, l), (C = t.memoizedState)),
          (w =
            Ha ||
            Ed(t, a, w, l, M, C, p) ||
            (e !== null && e.dependencies !== null && dc(e.dependencies)))
            ? (N ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(l, C, p),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(l, C, p)),
              typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (f === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (f === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = l),
              (t.memoizedState = C)),
          (i.props = l),
          (i.state = C),
          (i.context = p),
          (l = w))
        : (typeof i.componentDidUpdate != 'function' ||
            (f === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (f === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 1024),
          (l = !1));
    }
    return (
      (i = l),
      wc(e, t),
      (l = (t.flags & 128) !== 0),
      i || l
        ? ((i = t.stateNode),
          (a = l && typeof a.getDerivedStateFromError != 'function' ? null : i.render()),
          (t.flags |= 1),
          e !== null && l
            ? ((t.child = Tl(t, e.child, null, n)), (t.child = Tl(t, null, a, n)))
            : et(e, t, a, n),
          (t.memoizedState = i.state),
          (e = t.child))
        : (e = ga(e, t, n)),
      e
    );
  }
  function Yd(e, t, a, l) {
    return (_l(), (t.flags |= 256), et(e, t, a, l), t.child);
  }
  var Ku = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Ju(e) {
    return { baseLanes: e, cachePool: Of() };
  }
  function Wu(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Et), e);
  }
  function kd(e, t, a) {
    var l = t.pendingProps,
      n = !1,
      i = (t.flags & 128) !== 0,
      f;
    if (
      ((f = i) || (f = e !== null && e.memoizedState === null ? !1 : (Le.current & 2) !== 0),
      f && ((n = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (fe) {
        if (
          (n ? Va(t) : $a(),
          (e = ze)
            ? ((e = Im(e, Ht)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Da !== null ? { id: ea, overflow: ta } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = jf(e)),
                (a.return = t),
                (t.child = a),
                (Ie = t),
                (ze = null)))
            : (e = null),
          e === null)
        )
          throw La(t);
        return (Ro(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = l.children;
      return (
        (l = l.fallback),
        n
          ? ($a(),
            (n = t.mode),
            (v = Oc({ mode: 'hidden', children: v }, n)),
            (l = yl(l, n, a, null)),
            (v.return = t),
            (l.return = t),
            (v.sibling = l),
            (t.child = v),
            (l = t.child),
            (l.memoizedState = Ju(a)),
            (l.childLanes = Wu(e, f, a)),
            (t.memoizedState = Ku),
            ui(null, l))
          : (Va(t), Fu(t, v))
      );
    }
    var p = e.memoizedState;
    if (p !== null && ((v = p.dehydrated), v !== null)) {
      if (i)
        t.flags & 256
          ? (Va(t), (t.flags &= -257), (t = Iu(e, t, a)))
          : t.memoizedState !== null
            ? ($a(), (t.child = e.child), (t.flags |= 128), (t = null))
            : ($a(),
              (v = l.fallback),
              (n = t.mode),
              (l = Oc({ mode: 'visible', children: l.children }, n)),
              (v = yl(v, n, a, null)),
              (v.flags |= 2),
              (l.return = t),
              (v.return = t),
              (l.sibling = v),
              (t.child = l),
              Tl(t, e.child, null, a),
              (l = t.child),
              (l.memoizedState = Ju(a)),
              (l.childLanes = Wu(e, f, a)),
              (t.memoizedState = Ku),
              (t = ui(null, l)));
      else if ((Va(t), Ro(v))) {
        if (((f = v.nextSibling && v.nextSibling.dataset), f)) var N = f.dgst;
        ((f = N),
          (l = Error(o(419))),
          (l.stack = ''),
          (l.digest = f),
          Wn({ value: l, source: null, stack: null }),
          (t = Iu(e, t, a)));
      } else if ((Ge || cn(e, t, a, !1), (f = (a & e.childLanes) !== 0), Ge || f)) {
        if (((f = Ne), f !== null && ((l = Mr(f, a)), l !== 0 && l !== p.retryLane)))
          throw ((p.retryLane = l), gl(e, l), yt(f, e, l), Xu);
        (Oo(v) || Vc(), (t = Iu(e, t, a)));
      } else
        Oo(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = p.treeContext),
            (ze = Gt(v.nextSibling)),
            (Ie = t),
            (fe = !0),
            (Ba = null),
            (Ht = !1),
            e !== null && Nf(t, e),
            (t = Fu(t, l.children)),
            (t.flags |= 4096));
      return t;
    }
    return n
      ? ($a(),
        (v = l.fallback),
        (n = t.mode),
        (p = e.child),
        (N = p.sibling),
        (l = ra(p, { mode: 'hidden', children: l.children })),
        (l.subtreeFlags = p.subtreeFlags & 65011712),
        N !== null ? (v = ra(N, v)) : ((v = yl(v, n, a, null)), (v.flags |= 2)),
        (v.return = t),
        (l.return = t),
        (l.sibling = v),
        (t.child = l),
        ui(null, l),
        (l = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = Ju(a))
          : ((n = v.cachePool),
            n !== null
              ? ((p = He._currentValue), (n = n.parent !== p ? { parent: p, pool: p } : n))
              : (n = Of()),
            (v = { baseLanes: v.baseLanes | a, cachePool: n })),
        (l.memoizedState = v),
        (l.childLanes = Wu(e, f, a)),
        (t.memoizedState = Ku),
        ui(e.child, l))
      : (Va(t),
        (a = e.child),
        (e = a.sibling),
        (a = ra(a, { mode: 'visible', children: l.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((f = t.deletions), f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function Fu(e, t) {
    return ((t = Oc({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Oc(e, t) {
    return ((e = jt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Iu(e, t, a) {
    return (
      Tl(t, e.child, null, a),
      (e = Fu(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Zd(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    (l !== null && (l.lanes |= t), mu(e.return, t, a));
  }
  function Pu(e, t, a, l, n, i) {
    var f = e.memoizedState;
    f === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: a,
          tailMode: n,
          treeForkCount: i,
        })
      : ((f.isBackwards = t),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = l),
        (f.tail = a),
        (f.tailMode = n),
        (f.treeForkCount = i));
  }
  function Xd(e, t, a) {
    var l = t.pendingProps,
      n = l.revealOrder,
      i = l.tail;
    l = l.children;
    var f = Le.current,
      v = (f & 2) !== 0;
    if (
      (v ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      $(Le, f),
      et(e, t, l, a),
      (l = fe ? Jn : 0),
      !v && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Zd(e, a, t);
        else if (e.tag === 19) Zd(e, a, t);
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
    switch (n) {
      case 'forwards':
        for (a = t.child, n = null; a !== null; )
          ((e = a.alternate), e !== null && bc(e) === null && (n = a), (a = a.sibling));
        ((a = n),
          a === null ? ((n = t.child), (t.child = null)) : ((n = a.sibling), (a.sibling = null)),
          Pu(t, !1, n, a, i, l));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, n = t.child, t.child = null; n !== null; ) {
          if (((e = n.alternate), e !== null && bc(e) === null)) {
            t.child = n;
            break;
          }
          ((e = n.sibling), (n.sibling = a), (a = n), (n = e));
        }
        Pu(t, !0, a, null, i, l);
        break;
      case 'together':
        Pu(t, !1, null, null, void 0, l);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ga(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Za |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((cn(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = ra(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = ra(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function eo(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && dc(e)));
  }
  function av(e, t, a) {
    switch (t.tag) {
      case 3:
        (We(t, t.stateNode.containerInfo), qa(t, He, e.memoizedState.cache), _l());
        break;
      case 27:
      case 5:
        rl(t);
        break;
      case 4:
        We(t, t.stateNode.containerInfo);
        break;
      case 10:
        qa(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Au(t), null);
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (Va(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? kd(e, t, a)
              : (Va(t), (e = ga(e, t, a)), e !== null ? e.sibling : null);
        Va(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (
          ((l = (a & t.childLanes) !== 0),
          l || (cn(e, t, a, !1), (l = (a & t.childLanes) !== 0)),
          n)
        ) {
          if (l) return Xd(e, t, a);
          t.flags |= 128;
        }
        if (
          ((n = t.memoizedState),
          n !== null && ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          $(Le, Le.current),
          l)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Hd(e, t, a, t.pendingProps));
      case 24:
        qa(t, He, e.memoizedState.cache);
    }
    return ga(e, t, a);
  }
  function Qd(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Ge = !0;
      else {
        if (!eo(e, a) && (t.flags & 128) === 0) return ((Ge = !1), av(e, t, a));
        Ge = (e.flags & 131072) !== 0;
      }
    else ((Ge = !1), fe && (t.flags & 1048576) !== 0 && Af(t, Jn, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (((e = xl(t.elementType)), (t.type = e), typeof e == 'function'))
            iu(e)
              ? ((l = Nl(e, l)), (t.tag = 1), (t = $d(null, t, e, l, a)))
              : ((t.tag = 0), (t = Qu(null, t, e, l, a)));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === Ye) {
                ((t.tag = 11), (t = Bd(null, t, e, l, a)));
                break e;
              } else if (n === ne) {
                ((t.tag = 14), (t = Ld(null, t, e, l, a)));
                break e;
              }
            }
            throw ((t = wt(e) || e), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return Qu(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((l = t.type), (n = Nl(l, t.pendingProps)), $d(e, t, l, n, a));
      case 3:
        e: {
          if ((We(t, t.stateNode.containerInfo), e === null)) throw Error(o(387));
          l = t.pendingProps;
          var i = t.memoizedState;
          ((n = i.element), bu(e, t), li(t, l, null, a));
          var f = t.memoizedState;
          if (
            ((l = f.cache),
            qa(t, He, l),
            l !== i.cache && hu(t, [He], a, !0),
            ai(),
            (l = f.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: l, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              t = Yd(e, t, l, a);
              break e;
            } else if (l !== n) {
              ((n = Bt(Error(o(424)), t)), Wn(n), (t = Yd(e, t, l, a)));
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
                ze = Gt(e.firstChild),
                  Ie = t,
                  fe = !0,
                  Ba = null,
                  Ht = !0,
                  a = Hf(t, null, l, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((_l(), l === n)) {
              t = ga(e, t, a);
              break e;
            }
            et(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          wc(e, t),
          e === null
            ? (a = nh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : fe ||
                ((a = t.type),
                (e = t.pendingProps),
                (l = Kc(ie.current).createElement(a)),
                (l[Fe] = t),
                (l[ft] = e),
                tt(l, a, e),
                Qe(l),
                (t.stateNode = l))
            : (t.memoizedState = nh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          rl(t),
          e === null &&
            fe &&
            ((l = t.stateNode = th(t.type, t.pendingProps, ie.current)),
            (Ie = t),
            (Ht = !0),
            (n = ze),
            Wa(t.type) ? ((Do = n), (ze = Gt(l.firstChild))) : (ze = n)),
          et(e, t, t.pendingProps.children, a),
          wc(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            fe &&
            ((n = l = ze) &&
              ((l = Ov(l, t.type, t.pendingProps, Ht)),
              l !== null
                ? ((t.stateNode = l), (Ie = t), (ze = Gt(l.firstChild)), (Ht = !1), (n = !0))
                : (n = !1)),
            n || La(t)),
          rl(t),
          (n = t.type),
          (i = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (l = i.children),
          Mo(n, i) ? (l = null) : f !== null && Mo(n, f) && (t.flags |= 32),
          t.memoizedState !== null && ((n = Eu(e, t, Q1, null, null, a)), (ji._currentValue = n)),
          wc(e, t),
          et(e, t, l, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            fe &&
            ((e = a = ze) &&
              ((a = Rv(a, t.pendingProps, Ht)),
              a !== null ? ((t.stateNode = a), (Ie = t), (ze = null), (e = !0)) : (e = !1)),
            e || La(t)),
          null
        );
      case 13:
        return kd(e, t, a);
      case 4:
        return (
          We(t, t.stateNode.containerInfo),
          (l = t.pendingProps),
          e === null ? (t.child = Tl(t, null, l, a)) : et(e, t, l, a),
          t.child
        );
      case 11:
        return Bd(e, t, t.type, t.pendingProps, a);
      case 7:
        return (et(e, t, t.pendingProps, a), t.child);
      case 8:
        return (et(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (et(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((l = t.pendingProps), qa(t, t.type, l.value), et(e, t, l.children, a), t.child);
      case 9:
        return (
          (n = t.type._context),
          (l = t.pendingProps.children),
          bl(t),
          (n = Pe(n)),
          (l = l(n)),
          (t.flags |= 1),
          et(e, t, l, a),
          t.child
        );
      case 14:
        return Ld(e, t, t.type, t.pendingProps, a);
      case 15:
        return qd(e, t, t.type, t.pendingProps, a);
      case 19:
        return Xd(e, t, a);
      case 31:
        return tv(e, t, a);
      case 22:
        return Hd(e, t, a, t.pendingProps);
      case 24:
        return (
          bl(t),
          (l = Pe(He)),
          e === null
            ? ((n = yu()),
              n === null &&
                ((n = Ne),
                (i = vu()),
                (n.pooledCache = i),
                i.refCount++,
                i !== null && (n.pooledCacheLanes |= a),
                (n = i)),
              (t.memoizedState = { parent: l, cache: n }),
              pu(t),
              qa(t, He, n))
            : ((e.lanes & a) !== 0 && (bu(e, t), li(t, null, null, a), ai()),
              (n = e.memoizedState),
              (i = t.memoizedState),
              n.parent !== l
                ? ((n = { parent: l, cache: l }),
                  (t.memoizedState = n),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n),
                  qa(t, He, l))
                : ((l = i.cache), qa(t, He, l), l !== n.cache && hu(t, [He], a, !0))),
          et(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function ya(e) {
    e.flags |= 4;
  }
  function to(e, t, a, l, n) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (n & 335544128) === n))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (bm()) e.flags |= 8192;
        else throw ((jl = gc), _u);
    } else e.flags &= -16777217;
  }
  function Kd(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !oh(t)))
      if (bm()) e.flags |= 8192;
      else throw ((jl = gc), _u);
  }
  function Rc(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Nr() : 536870912), (e.lanes |= t), (_n |= t)));
  }
  function oi(e, t) {
    if (!fe)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var a = null; t !== null; ) (t.alternate !== null && (a = t), (t = t.sibling));
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = e.tail;
          for (var l = null; a !== null; ) (a.alternate !== null && (l = a), (a = a.sibling));
          l === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function Me(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      l = 0;
    if (t)
      for (var n = e.child; n !== null; )
        ((a |= n.lanes | n.childLanes),
          (l |= n.subtreeFlags & 65011712),
          (l |= n.flags & 65011712),
          (n.return = e),
          (n = n.sibling));
    else
      for (n = e.child; n !== null; )
        ((a |= n.lanes | n.childLanes),
          (l |= n.subtreeFlags),
          (l |= n.flags),
          (n.return = e),
          (n = n.sibling));
    return ((e.subtreeFlags |= l), (e.childLanes = a), t);
  }
  function lv(e, t, a) {
    var l = t.pendingProps;
    switch ((ou(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Me(t), null);
      case 1:
        return (Me(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          ma(He),
          we(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (nn(t)
              ? ya(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), fu())),
          Me(t),
          null
        );
      case 26:
        var n = t.type,
          i = t.memoizedState;
        return (
          e === null
            ? (ya(t), i !== null ? (Me(t), Kd(t, i)) : (Me(t), to(t, n, null, l, a)))
            : i
              ? i !== e.memoizedState
                ? (ya(t), Me(t), Kd(t, i))
                : (Me(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== l && ya(t), Me(t), to(t, n, e, l, a)),
          null
        );
      case 27:
        if ((Ul(t), (a = ie.current), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && ya(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(o(166));
            return (Me(t), null);
          }
          ((e = k.current), nn(t) ? Ef(t) : ((e = th(n, l, a)), (t.stateNode = e), ya(t)));
        }
        return (Me(t), null);
      case 5:
        if ((Ul(t), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && ya(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(o(166));
            return (Me(t), null);
          }
          if (((i = k.current), nn(t))) Ef(t);
          else {
            var f = Kc(ie.current);
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
            ((i[Fe] = t), (i[ft] = l));
            e: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) i.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                ((f.child.return = f), (f = f.child));
                continue;
              }
              if (f === t) break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t) break e;
                f = f.return;
              }
              ((f.sibling.return = f.return), (f = f.sibling));
            }
            t.stateNode = i;
            e: switch ((tt(i, n, l), n)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                l = !!l.autoFocus;
                break e;
              case 'img':
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && ya(t);
          }
        }
        return (Me(t), to(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== l && ya(t);
        else {
          if (typeof l != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = ie.current), nn(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (l = null), (n = Ie), n !== null))
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            ((e[Fe] = t),
              (e = !!(
                e.nodeValue === a ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                km(e.nodeValue, a)
              )),
              e || La(t, !0));
          } else ((e = Kc(e).createTextNode(l)), (e[Fe] = t), (t.stateNode = e));
        }
        return (Me(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((l = nn(t)), a !== null)) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(o(557));
              e[Fe] = t;
            } else (_l(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Me(t), (e = !1));
          } else
            ((a = fu()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (At(t), t) : (At(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return (Me(t), null);
      case 13:
        if (
          ((l = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((n = nn(t)), l !== null && l.dehydrated !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (((n = t.memoizedState), (n = n !== null ? n.dehydrated : null), !n))
                throw Error(o(317));
              n[Fe] = t;
            } else (_l(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Me(t), (n = !1));
          } else
            ((n = fu()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
              (n = !0));
          if (!n) return t.flags & 256 ? (At(t), t) : (At(t), null);
        }
        return (
          At(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = l !== null),
              (e = e !== null && e.memoizedState !== null),
              a &&
                ((l = t.child),
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
              a !== e && a && (t.child.flags |= 8192),
              Rc(t, t.updateQueue),
              Me(t),
              null)
        );
      case 4:
        return (we(), e === null && To(t.stateNode.containerInfo), Me(t), null);
      case 10:
        return (ma(t.type), Me(t), null);
      case 19:
        if ((L(Le), (l = t.memoizedState), l === null)) return (Me(t), null);
        if (((n = (t.flags & 128) !== 0), (i = l.rendering), i === null))
          if (n) oi(l, !1);
          else {
            if (Re !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((i = bc(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      oi(l, !1),
                      e = i.updateQueue,
                      t.updateQueue = e,
                      Rc(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (xf(a, e), (a = a.sibling));
                  return ($(Le, (Le.current & 1) | 2), fe && fa(t, l.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            l.tail !== null &&
              pt() > Hc &&
              ((t.flags |= 128), (n = !0), oi(l, !1), (t.lanes = 4194304));
          }
        else {
          if (!n)
            if (((e = bc(i)), e !== null)) {
              if (
                ((t.flags |= 128),
                (n = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Rc(t, e),
                oi(l, !0),
                l.tail === null && l.tailMode === 'hidden' && !i.alternate && !fe)
              )
                return (Me(t), null);
            } else
              2 * pt() - l.renderingStartTime > Hc &&
                a !== 536870912 &&
                ((t.flags |= 128), (n = !0), oi(l, !1), (t.lanes = 4194304));
          l.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : ((e = l.last), e !== null ? (e.sibling = i) : (t.child = i), (l.last = i));
        }
        return l.tail !== null
          ? ((e = l.tail),
            (l.rendering = e),
            (l.tail = e.sibling),
            (l.renderingStartTime = pt()),
            (e.sibling = null),
            (a = Le.current),
            $(Le, n ? (a & 1) | 2 : a & 1),
            fe && fa(t, l.treeForkCount),
            e)
          : (Me(t), null);
      case 22:
      case 23:
        return (
          At(t),
          Tu(),
          (l = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== l && (t.flags |= 8192)
            : l && (t.flags |= 8192),
          l
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Me(t),
          (a = t.updateQueue),
          a !== null && Rc(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (l = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          l !== a && (t.flags |= 2048),
          e !== null && L(Sl),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          ma(He),
          Me(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function nv(e, t) {
    switch ((ou(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          ma(He),
          we(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Ul(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((At(t), t.alternate === null)) throw Error(o(340));
          _l();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((At(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(o(340));
          _l();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (L(Le), null);
      case 4:
        return (we(), null);
      case 10:
        return (ma(t.type), null);
      case 22:
      case 23:
        return (
          At(t),
          Tu(),
          e !== null && L(Sl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (ma(He), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Jd(e, t) {
    switch ((ou(t), t.tag)) {
      case 3:
        (ma(He), we());
        break;
      case 26:
      case 27:
      case 5:
        Ul(t);
        break;
      case 4:
        we();
        break;
      case 31:
        t.memoizedState !== null && At(t);
        break;
      case 13:
        At(t);
        break;
      case 19:
        L(Le);
        break;
      case 10:
        ma(t.type);
        break;
      case 22:
      case 23:
        (At(t), Tu(), e !== null && L(Sl));
        break;
      case 24:
        ma(He);
    }
  }
  function ri(e, t) {
    try {
      var a = t.updateQueue,
        l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var n = l.next;
        a = n;
        do {
          if ((a.tag & e) === e) {
            l = void 0;
            var i = a.create,
              f = a.inst;
            ((l = i()), (f.destroy = l));
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (v) {
      Se(t, t.return, v);
    }
  }
  function Ya(e, t, a) {
    try {
      var l = t.updateQueue,
        n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        l = i;
        do {
          if ((l.tag & e) === e) {
            var f = l.inst,
              v = f.destroy;
            if (v !== void 0) {
              ((f.destroy = void 0), (n = t));
              var p = a,
                N = v;
              try {
                N();
              } catch (w) {
                Se(n, p, w);
              }
            }
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (w) {
      Se(t, t.return, w);
    }
  }
  function Wd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Gf(t, a);
      } catch (l) {
        Se(e, e.return, l);
      }
    }
  }
  function Fd(e, t, a) {
    ((a.props = Nl(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (l) {
      Se(e, t, l);
    }
  }
  function fi(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof a == 'function' ? (e.refCleanup = a(l)) : (a.current = l);
      }
    } catch (n) {
      Se(e, t, n);
    }
  }
  function aa(e, t) {
    var a = e.ref,
      l = e.refCleanup;
    if (a !== null)
      if (typeof l == 'function')
        try {
          l();
        } catch (n) {
          Se(e, t, n);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (n) {
          Se(e, t, n);
        }
      else a.current = null;
  }
  function Id(e) {
    var t = e.type,
      a = e.memoizedProps,
      l = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && l.focus();
          break e;
        case 'img':
          a.src ? (l.src = a.src) : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (n) {
      Se(e, e.return, n);
    }
  }
  function ao(e, t, a) {
    try {
      var l = e.stateNode;
      (Nv(l, e.type, a, t), (l[ft] = t));
    } catch (n) {
      Se(e, e.return, n);
    }
  }
  function Pd(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Wa(e.type)) || e.tag === 4
    );
  }
  function lo(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Pd(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && Wa(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function no(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
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
            a != null || t.onclick !== null || (t.onclick = ua)));
    else if (
      l !== 4 &&
      (l === 27 && Wa(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (no(e, t, a), e = e.sibling; e !== null; ) (no(e, t, a), (e = e.sibling));
  }
  function Dc(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (l !== 4 && (l === 27 && Wa(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (Dc(e, t, a), e = e.sibling; e !== null; ) (Dc(e, t, a), (e = e.sibling));
  }
  function em(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
      (tt(t, l, a), (t[Fe] = e), (t[ft] = a));
    } catch (i) {
      Se(e, e.return, i);
    }
  }
  var _a = !1,
    Ve = !1,
    io = !1,
    tm = typeof WeakSet == 'function' ? WeakSet : Set,
    Ke = null;
  function iv(e, t) {
    if (((e = e.containerInfo), (Eo = ts), (e = mf(e)), Is(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
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
              break e;
            }
            var f = 0,
              v = -1,
              p = -1,
              N = 0,
              w = 0,
              B = e,
              M = null;
            t: for (;;) {
              for (
                var C;
                B !== a || (n !== 0 && B.nodeType !== 3) || (v = f + n),
                  B !== i || (l !== 0 && B.nodeType !== 3) || (p = f + l),
                  B.nodeType === 3 && (f += B.nodeValue.length),
                  (C = B.firstChild) !== null;
              )
                ((M = B), (B = C));
              for (;;) {
                if (B === e) break t;
                if (
                  (M === a && ++N === n && (v = f),
                  M === i && ++w === l && (p = f),
                  (C = B.nextSibling) !== null)
                )
                  break;
                ((B = M), (M = B.parentNode));
              }
              B = C;
            }
            a = v === -1 || p === -1 ? null : { start: v, end: p };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (zo = { focusedElem: e, selectionRange: a }, ts = !1, Ke = t; Ke !== null; )
      if (((t = Ke), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (Ke = e));
      else
        for (; Ke !== null; ) {
          switch (((t = Ke), (i = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (a = 0; a < e.length; a++) ((n = e[a]), (n.ref.impl = n.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && i !== null) {
                ((e = void 0),
                  (a = t),
                  (n = i.memoizedProps),
                  (i = i.memoizedState),
                  (l = a.stateNode));
                try {
                  var Y = Nl(a.type, n);
                  ((e = l.getSnapshotBeforeUpdate(Y, i)),
                    (l.__reactInternalSnapshotBeforeUpdate = e));
                } catch (W) {
                  Se(a, a.return, W);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) wo(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      wo(e);
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
            ((e.return = t.return), (Ke = e));
            break;
          }
          Ke = t.return;
        }
  }
  function am(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (ba(e, a), l & 4 && ri(5, a));
        break;
      case 1:
        if ((ba(e, a), l & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              Se(a, a.return, f);
            }
          else {
            var n = Nl(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Se(a, a.return, f);
            }
          }
        (l & 64 && Wd(a), l & 512 && fi(a, a.return));
        break;
      case 3:
        if ((ba(e, a), l & 64 && ((e = a.updateQueue), e !== null))) {
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
            Gf(e, t);
          } catch (f) {
            Se(a, a.return, f);
          }
        }
        break;
      case 27:
        t === null && l & 4 && em(a);
      case 26:
      case 5:
        (ba(e, a), t === null && l & 4 && Id(a), l & 512 && fi(a, a.return));
        break;
      case 12:
        ba(e, a);
        break;
      case 31:
        (ba(e, a), l & 4 && im(e, a));
        break;
      case 13:
        (ba(e, a),
          l & 4 && cm(e, a),
          l & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = hv.bind(null, a)), Dv(e, a)))));
        break;
      case 22:
        if (((l = a.memoizedState !== null || _a), !l)) {
          ((t = (t !== null && t.memoizedState !== null) || Ve), (n = _a));
          var i = Ve;
          ((_a = l),
            (Ve = t) && !i ? Sa(e, a, (a.subtreeFlags & 8772) !== 0) : ba(e, a),
            (_a = n),
            (Ve = i));
        }
        break;
      case 30:
        break;
      default:
        ba(e, a);
    }
  }
  function lm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), lm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Bs(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Ce = null,
    mt = !1;
  function pa(e, t, a) {
    for (a = a.child; a !== null; ) (nm(e, t, a), (a = a.sibling));
  }
  function nm(e, t, a) {
    if (bt && typeof bt.onCommitFiberUnmount == 'function')
      try {
        bt.onCommitFiberUnmount(Bn, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (Ve || aa(a, t),
          pa(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        Ve || aa(a, t);
        var l = Ce,
          n = mt;
        (Wa(a.type) && ((Ce = a.stateNode), (mt = !1)),
          pa(e, t, a),
          bi(a.stateNode),
          (Ce = l),
          (mt = n));
        break;
      case 5:
        Ve || aa(a, t);
      case 6:
        if (((l = Ce), (n = mt), (Ce = null), pa(e, t, a), (Ce = l), (mt = n), Ce !== null))
          if (mt)
            try {
              (Ce.nodeType === 9
                ? Ce.body
                : Ce.nodeName === 'HTML'
                  ? Ce.ownerDocument.body
                  : Ce
              ).removeChild(a.stateNode);
            } catch (i) {
              Se(a, t, i);
            }
          else
            try {
              Ce.removeChild(a.stateNode);
            } catch (i) {
              Se(a, t, i);
            }
        break;
      case 18:
        Ce !== null &&
          (mt
            ? ((e = Ce),
              Wm(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              Nn(e))
            : Wm(Ce, a.stateNode));
        break;
      case 4:
        ((l = Ce),
          (n = mt),
          (Ce = a.stateNode.containerInfo),
          (mt = !0),
          pa(e, t, a),
          (Ce = l),
          (mt = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Ya(2, a, t), Ve || Ya(4, a, t), pa(e, t, a));
        break;
      case 1:
        (Ve ||
          (aa(a, t), (l = a.stateNode), typeof l.componentWillUnmount == 'function' && Fd(a, t, l)),
          pa(e, t, a));
        break;
      case 21:
        pa(e, t, a);
        break;
      case 22:
        ((Ve = (l = Ve) || a.memoizedState !== null), pa(e, t, a), (Ve = l));
        break;
      default:
        pa(e, t, a);
    }
  }
  function im(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Nn(e);
      } catch (a) {
        Se(t, t.return, a);
      }
    }
  }
  function cm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Nn(e);
      } catch (a) {
        Se(t, t.return, a);
      }
  }
  function cv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new tm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new tm()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Bc(e, t) {
    var a = cv(e);
    t.forEach(function (l) {
      if (!a.has(l)) {
        a.add(l);
        var n = vv.bind(null, e, l);
        l.then(n, n);
      }
    });
  }
  function ht(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l],
          i = e,
          f = t,
          v = f;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (Wa(v.type)) {
                ((Ce = v.stateNode), (mt = !1));
                break e;
              }
              break;
            case 5:
              ((Ce = v.stateNode), (mt = !1));
              break e;
            case 3:
            case 4:
              ((Ce = v.stateNode.containerInfo), (mt = !0));
              break e;
          }
          v = v.return;
        }
        if (Ce === null) throw Error(o(160));
        (nm(i, f, n),
          (Ce = null),
          (mt = !1),
          (i = n.alternate),
          i !== null && (i.return = null),
          (n.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (sm(t, e), (t = t.sibling));
  }
  var Xt = null;
  function sm(e, t) {
    var a = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (ht(t, e), vt(e), l & 4 && (Ya(3, e, e.return), ri(3, e), Ya(5, e, e.return)));
        break;
      case 1:
        (ht(t, e),
          vt(e),
          l & 512 && (Ve || a === null || aa(a, a.return)),
          l & 64 &&
            _a &&
            ((e = e.updateQueue),
            e !== null &&
              ((l = e.callbacks),
              l !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? l : a.concat(l))))));
        break;
      case 26:
        var n = Xt;
        if ((ht(t, e), vt(e), l & 512 && (Ve || a === null || aa(a, a.return)), l & 4)) {
          var i = a !== null ? a.memoizedState : null;
          if (((l = e.memoizedState), a === null))
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  ((l = e.type), (a = e.memoizedProps), (n = n.ownerDocument || n));
                  t: switch (l) {
                    case 'title':
                      ((i = n.getElementsByTagName('title')[0]),
                        (!i ||
                          i[Hn] ||
                          i[Fe] ||
                          i.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          i.hasAttribute('itemprop')) &&
                          ((i = n.createElement(l)),
                          n.head.insertBefore(i, n.querySelector('head > title'))),
                        tt(i, l, a),
                        (i[Fe] = e),
                        Qe(i),
                        (l = i));
                      break e;
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
                            break t;
                          }
                      }
                      ((i = n.createElement(l)), tt(i, l, a), n.head.appendChild(i));
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
                            break t;
                          }
                      }
                      ((i = n.createElement(l)), tt(i, l, a), n.head.appendChild(i));
                      break;
                    default:
                      throw Error(o(468, l));
                  }
                  ((i[Fe] = e), Qe(i), (l = i));
                }
                e.stateNode = l;
              } else uh(n, e.type, e.stateNode);
            else e.stateNode = ch(n, l, e.memoizedProps);
          else
            i !== l
              ? (i === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : i.count--,
                l === null ? uh(n, e.type, e.stateNode) : ch(n, l, e.memoizedProps))
              : l === null && e.stateNode !== null && ao(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (ht(t, e),
          vt(e),
          l & 512 && (Ve || a === null || aa(a, a.return)),
          a !== null && l & 4 && ao(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((ht(t, e), vt(e), l & 512 && (Ve || a === null || aa(a, a.return)), e.flags & 32)) {
          n = e.stateNode;
          try {
            Kl(n, '');
          } catch (Y) {
            Se(e, e.return, Y);
          }
        }
        (l & 4 &&
          e.stateNode != null &&
          ((n = e.memoizedProps), ao(e, n, a !== null ? a.memoizedProps : n)),
          l & 1024 && (io = !0));
        break;
      case 6:
        if ((ht(t, e), vt(e), l & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((l = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = l;
          } catch (Y) {
            Se(e, e.return, Y);
          }
        }
        break;
      case 3:
        if (
          ((Fc = null),
          (n = Xt),
          (Xt = Jc(t.containerInfo)),
          ht(t, e),
          (Xt = n),
          vt(e),
          l & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Nn(t.containerInfo);
          } catch (Y) {
            Se(e, e.return, Y);
          }
        io && ((io = !1), um(e));
        break;
      case 4:
        ((l = Xt), (Xt = Jc(e.stateNode.containerInfo)), ht(t, e), vt(e), (Xt = l));
        break;
      case 12:
        (ht(t, e), vt(e));
        break;
      case 31:
        (ht(t, e),
          vt(e),
          l & 4 && ((l = e.updateQueue), l !== null && ((e.updateQueue = null), Bc(e, l))));
        break;
      case 13:
        (ht(t, e),
          vt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (qc = pt()),
          l & 4 && ((l = e.updateQueue), l !== null && ((e.updateQueue = null), Bc(e, l))));
        break;
      case 22:
        n = e.memoizedState !== null;
        var p = a !== null && a.memoizedState !== null,
          N = _a,
          w = Ve;
        if (((_a = N || n), (Ve = w || p), ht(t, e), (Ve = w), (_a = N), vt(e), l & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (a === null || p || _a || Ve || El(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                p = a = t;
                try {
                  if (((i = p.stateNode), n))
                    ((f = i.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    v = p.stateNode;
                    var B = p.memoizedProps.style,
                      M = B != null && B.hasOwnProperty('display') ? B.display : null;
                    v.style.display = M == null || typeof M == 'boolean' ? '' : ('' + M).trim();
                  }
                } catch (Y) {
                  Se(p, p.return, Y);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                p = t;
                try {
                  p.stateNode.nodeValue = n ? '' : p.memoizedProps;
                } catch (Y) {
                  Se(p, p.return, Y);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                p = t;
                try {
                  var C = p.stateNode;
                  n ? Fm(C, !0) : Fm(p.stateNode, !1);
                } catch (Y) {
                  Se(p, p.return, Y);
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
        l & 4 &&
          ((l = e.updateQueue),
          l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), Bc(e, a))));
        break;
      case 19:
        (ht(t, e),
          vt(e),
          l & 4 && ((l = e.updateQueue), l !== null && ((e.updateQueue = null), Bc(e, l))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (ht(t, e), vt(e));
    }
  }
  function vt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
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
              i = lo(e);
            Dc(e, i, n);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && (Kl(f, ''), (a.flags &= -33));
            var v = lo(e);
            Dc(e, v, f);
            break;
          case 3:
          case 4:
            var p = a.stateNode.containerInfo,
              N = lo(e);
            no(e, N, p);
            break;
          default:
            throw Error(o(161));
        }
      } catch (w) {
        Se(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function um(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (um(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function ba(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (am(e, t.alternate, t), (t = t.sibling));
  }
  function El(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Ya(4, t, t.return), El(t));
          break;
        case 1:
          aa(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && Fd(t, t.return, a), El(t));
          break;
        case 27:
          bi(t.stateNode);
        case 26:
        case 5:
          (aa(t, t.return), El(t));
          break;
        case 22:
          t.memoizedState === null && El(t);
          break;
        case 30:
          El(t);
          break;
        default:
          El(t);
      }
      e = e.sibling;
    }
  }
  function Sa(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate,
        n = e,
        i = t,
        f = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (Sa(n, i, a), ri(4, i));
          break;
        case 1:
          if ((Sa(n, i, a), (l = i), (n = l.stateNode), typeof n.componentDidMount == 'function'))
            try {
              n.componentDidMount();
            } catch (N) {
              Se(l, l.return, N);
            }
          if (((l = i), (n = l.updateQueue), n !== null)) {
            var v = l.stateNode;
            try {
              var p = n.shared.hiddenCallbacks;
              if (p !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < p.length; n++) Uf(p[n], v);
            } catch (N) {
              Se(l, l.return, N);
            }
          }
          (a && f & 64 && Wd(i), fi(i, i.return));
          break;
        case 27:
          em(i);
        case 26:
        case 5:
          (Sa(n, i, a), a && l === null && f & 4 && Id(i), fi(i, i.return));
          break;
        case 12:
          Sa(n, i, a);
          break;
        case 31:
          (Sa(n, i, a), a && f & 4 && im(n, i));
          break;
        case 13:
          (Sa(n, i, a), a && f & 4 && cm(n, i));
          break;
        case 22:
          (i.memoizedState === null && Sa(n, i, a), fi(i, i.return));
          break;
        case 30:
          break;
        default:
          Sa(n, i, a);
      }
      t = t.sibling;
    }
  }
  function co(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && Fn(a)));
  }
  function so(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Fn(e)));
  }
  function Qt(e, t, a, l) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (om(e, t, a, l), (t = t.sibling));
  }
  function om(e, t, a, l) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Qt(e, t, a, l), n & 2048 && ri(9, t));
        break;
      case 1:
        Qt(e, t, a, l);
        break;
      case 3:
        (Qt(e, t, a, l),
          n & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Fn(e))));
        break;
      case 12:
        if (n & 2048) {
          (Qt(e, t, a, l), (e = t.stateNode));
          try {
            var i = t.memoizedProps,
              f = i.id,
              v = i.onPostCommit;
            typeof v == 'function' &&
              v(f, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (p) {
            Se(t, t.return, p);
          }
        } else Qt(e, t, a, l);
        break;
      case 31:
        Qt(e, t, a, l);
        break;
      case 13:
        Qt(e, t, a, l);
        break;
      case 23:
        break;
      case 22:
        ((i = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? i._visibility & 2
              ? Qt(e, t, a, l)
              : di(e, t)
            : i._visibility & 2
              ? Qt(e, t, a, l)
              : ((i._visibility |= 2), vn(e, t, a, l, (t.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && co(f, t));
        break;
      case 24:
        (Qt(e, t, a, l), n & 2048 && so(t.alternate, t));
        break;
      default:
        Qt(e, t, a, l);
    }
  }
  function vn(e, t, a, l, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var i = e,
        f = t,
        v = a,
        p = l,
        N = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (vn(i, f, v, p, n), ri(8, f));
          break;
        case 23:
          break;
        case 22:
          var w = f.stateNode;
          (f.memoizedState !== null
            ? w._visibility & 2
              ? vn(i, f, v, p, n)
              : di(i, f)
            : ((w._visibility |= 2), vn(i, f, v, p, n)),
            n && N & 2048 && co(f.alternate, f));
          break;
        case 24:
          (vn(i, f, v, p, n), n && N & 2048 && so(f.alternate, f));
          break;
        default:
          vn(i, f, v, p, n);
      }
      t = t.sibling;
    }
  }
  function di(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          l = t,
          n = l.flags;
        switch (l.tag) {
          case 22:
            (di(a, l), n & 2048 && co(l.alternate, l));
            break;
          case 24:
            (di(a, l), n & 2048 && so(l.alternate, l));
            break;
          default:
            di(a, l);
        }
        t = t.sibling;
      }
  }
  var mi = 8192;
  function gn(e, t, a) {
    if (e.subtreeFlags & mi) for (e = e.child; e !== null; ) (rm(e, t, a), (e = e.sibling));
  }
  function rm(e, t, a) {
    switch (e.tag) {
      case 26:
        (gn(e, t, a),
          e.flags & mi && e.memoizedState !== null && Xv(a, Xt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        gn(e, t, a);
        break;
      case 3:
      case 4:
        var l = Xt;
        ((Xt = Jc(e.stateNode.containerInfo)), gn(e, t, a), (Xt = l));
        break;
      case 22:
        e.memoizedState === null &&
          ((l = e.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = mi), (mi = 16777216), gn(e, t, a), (mi = l))
            : gn(e, t, a));
        break;
      default:
        gn(e, t, a);
    }
  }
  function fm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function hi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          ((Ke = l), mm(l, e));
        }
      fm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (dm(e), (e = e.sibling));
  }
  function dm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (hi(e), e.flags & 2048 && Ya(9, e, e.return));
        break;
      case 3:
        hi(e);
        break;
      case 12:
        hi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Lc(e))
          : hi(e);
        break;
      default:
        hi(e);
    }
  }
  function Lc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          ((Ke = l), mm(l, e));
        }
      fm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Ya(8, t, t.return), Lc(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Lc(t)));
          break;
        default:
          Lc(t);
      }
      e = e.sibling;
    }
  }
  function mm(e, t) {
    for (; Ke !== null; ) {
      var a = Ke;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ya(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Fn(a.memoizedState.cache);
      }
      if (((l = a.child), l !== null)) ((l.return = a), (Ke = l));
      else
        e: for (a = e; Ke !== null; ) {
          l = Ke;
          var n = l.sibling,
            i = l.return;
          if ((lm(l), l === a)) {
            Ke = null;
            break e;
          }
          if (n !== null) {
            ((n.return = i), (Ke = n));
            break e;
          }
          Ke = i;
        }
    }
  }
  var sv = {
      getCacheForType: function (e) {
        var t = Pe(He),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return Pe(He).controller.signal;
      },
    },
    uv = typeof WeakMap == 'function' ? WeakMap : Map,
    ge = 0,
    Ne = null,
    ce = null,
    ue = 0,
    be = 0,
    Nt = null,
    ka = !1,
    yn = !1,
    uo = !1,
    xa = 0,
    Re = 0,
    Za = 0,
    zl = 0,
    oo = 0,
    Et = 0,
    _n = 0,
    vi = null,
    gt = null,
    ro = !1,
    qc = 0,
    hm = 0,
    Hc = 1 / 0,
    Uc = null,
    Xa = null,
    ke = 0,
    Qa = null,
    pn = null,
    ja = 0,
    fo = 0,
    mo = null,
    vm = null,
    gi = 0,
    ho = null;
  function zt() {
    return (ge & 2) !== 0 && ue !== 0 ? ue & -ue : O.T !== null ? bo() : Cr();
  }
  function gm() {
    if (Et === 0)
      if ((ue & 536870912) === 0 || fe) {
        var e = Qi;
        ((Qi <<= 1), (Qi & 3932160) === 0 && (Qi = 262144), (Et = e));
      } else Et = 536870912;
    return ((e = Tt.current), e !== null && (e.flags |= 32), Et);
  }
  function yt(e, t, a) {
    (((e === Ne && (be === 2 || be === 9)) || e.cancelPendingCommit !== null) &&
      (bn(e, 0), Ka(e, ue, Et, !1)),
      qn(e, a),
      ((ge & 2) === 0 || e !== Ne) &&
        (e === Ne && ((ge & 2) === 0 && (zl |= a), Re === 4 && Ka(e, ue, Et, !1)), la(e)));
  }
  function ym(e, t, a) {
    if ((ge & 6) !== 0) throw Error(o(327));
    var l = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Ln(e, t),
      n = l ? fv(e, t) : go(e, t, !0),
      i = l;
    do {
      if (n === 0) {
        yn && !l && Ka(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), i && !ov(a))) {
          ((n = go(e, t, !1)), (i = !1));
          continue;
        }
        if (n === 2) {
          if (((i = t), e.errorRecoveryDisabledLanes & i)) var f = 0;
          else
            ((f = e.pendingLanes & -536870913), (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            t = f;
            e: {
              var v = e;
              n = vi;
              var p = v.current.memoizedState.isDehydrated;
              if ((p && (bn(v, f).flags |= 256), (f = go(v, f, !1)), f !== 2)) {
                if (uo && !p) {
                  ((v.errorRecoveryDisabledLanes |= i), (zl |= i), (n = 4));
                  break e;
                }
                ((i = gt), (gt = n), i !== null && (gt === null ? (gt = i) : gt.push.apply(gt, i)));
              }
              n = f;
            }
            if (((i = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          (bn(e, 0), Ka(e, t, 0, !0));
          break;
        }
        e: {
          switch (((l = e), (i = n), i)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ka(l, t, Et, !ka);
              break e;
            case 2:
              gt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((n = qc + 300 - pt()), 10 < n)) {
            if ((Ka(l, t, Et, !ka), Ji(l, 0, !0) !== 0)) break e;
            ((ja = t),
              (l.timeoutHandle = Km(
                _m.bind(null, l, a, gt, Uc, ro, t, Et, zl, _n, ka, i, 'Throttled', -0, 0),
                n
              )));
            break e;
          }
          _m(l, a, gt, Uc, ro, t, Et, zl, _n, ka, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    la(e);
  }
  function _m(e, t, a, l, n, i, f, v, p, N, w, B, M, C) {
    if (((e.timeoutHandle = -1), (B = t.subtreeFlags), B & 8192 || (B & 16785408) === 16785408)) {
      ((B = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ua,
      }),
        rm(t, i, B));
      var Y = (i & 62914560) === i ? qc - pt() : (i & 4194048) === i ? hm - pt() : 0;
      if (((Y = Qv(B, Y)), Y !== null)) {
        ((ja = i),
          (e.cancelPendingCommit = Y(Nm.bind(null, e, t, i, a, l, n, f, v, p, w, B, null, M, C))),
          Ka(e, i, f, !N));
        return;
      }
    }
    Nm(e, t, i, a, l, n, f, v, p);
  }
  function ov(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var l = 0; l < a.length; l++) {
          var n = a[l],
            i = n.getSnapshot;
          n = n.value;
          try {
            if (!xt(i(), n)) return !1;
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
  function Ka(e, t, a, l) {
    ((t &= ~oo),
      (t &= ~zl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      l && (e.warmLanes |= t),
      (l = e.expirationTimes));
    for (var n = t; 0 < n; ) {
      var i = 31 - St(n),
        f = 1 << i;
      ((l[i] = -1), (n &= ~f));
    }
    a !== 0 && Er(e, a, t);
  }
  function Gc() {
    return (ge & 6) === 0 ? (yi(0), !1) : !0;
  }
  function vo() {
    if (ce !== null) {
      if (be === 0) var e = ce.return;
      else ((e = ce), (da = pl = null), Cu(e), (rn = null), (Pn = 0), (e = ce));
      for (; e !== null; ) (Jd(e.alternate, e), (e = e.return));
      ce = null;
    }
  }
  function bn(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), Mv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (ja = 0),
      vo(),
      (Ne = e),
      (ce = a = ra(e.current, null)),
      (ue = t),
      (be = 0),
      (Nt = null),
      (ka = !1),
      (yn = Ln(e, t)),
      (uo = !1),
      (_n = Et = oo = zl = Za = Re = 0),
      (gt = vi = null),
      (ro = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var n = 31 - St(l),
          i = 1 << n;
        ((t |= e[n]), (l &= ~i));
      }
    return ((xa = t), sc(), a);
  }
  function pm(e, t) {
    ((te = null),
      (O.H = si),
      t === on || t === vc
        ? ((t = Bf()), (be = 3))
        : t === _u
          ? ((t = Bf()), (be = 4))
          : (be =
              t === Xu
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Nt = t),
      ce === null && ((Re = 1), Mc(e, Bt(t, e.current))));
  }
  function bm() {
    var e = Tt.current;
    return e === null
      ? !0
      : (ue & 4194048) === ue
        ? Ut === null
        : (ue & 62914560) === ue || (ue & 536870912) !== 0
          ? e === Ut
          : !1;
  }
  function Sm() {
    var e = O.H;
    return ((O.H = si), e === null ? si : e);
  }
  function xm() {
    var e = O.A;
    return ((O.A = sv), e);
  }
  function Vc() {
    ((Re = 4),
      ka || ((ue & 4194048) !== ue && Tt.current !== null) || (yn = !0),
      ((Za & 134217727) === 0 && (zl & 134217727) === 0) || Ne === null || Ka(Ne, ue, Et, !1));
  }
  function go(e, t, a) {
    var l = ge;
    ge |= 2;
    var n = Sm(),
      i = xm();
    ((Ne !== e || ue !== t) && ((Uc = null), bn(e, t)), (t = !1));
    var f = Re;
    e: do
      try {
        if (be !== 0 && ce !== null) {
          var v = ce,
            p = Nt;
          switch (be) {
            case 8:
              (vo(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Tt.current === null && (t = !0);
              var N = be;
              if (((be = 0), (Nt = null), Sn(e, v, p, N), a && yn)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((N = be), (be = 0), (Nt = null), Sn(e, v, p, N));
          }
        }
        (rv(), (f = Re));
        break;
      } catch (w) {
        pm(e, w);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (da = pl = null),
      (ge = l),
      (O.H = n),
      (O.A = i),
      ce === null && ((Ne = null), (ue = 0), sc()),
      f
    );
  }
  function rv() {
    for (; ce !== null; ) jm(ce);
  }
  function fv(e, t) {
    var a = ge;
    ge |= 2;
    var l = Sm(),
      n = xm();
    Ne !== e || ue !== t ? ((Uc = null), (Hc = pt() + 500), bn(e, t)) : (yn = Ln(e, t));
    e: do
      try {
        if (be !== 0 && ce !== null) {
          t = ce;
          var i = Nt;
          t: switch (be) {
            case 1:
              ((be = 0), (Nt = null), Sn(e, t, i, 1));
              break;
            case 2:
            case 9:
              if (Rf(i)) {
                ((be = 0), (Nt = null), Tm(t));
                break;
              }
              ((t = function () {
                ((be !== 2 && be !== 9) || Ne !== e || (be = 7), la(e));
              }),
                i.then(t, t));
              break e;
            case 3:
              be = 7;
              break e;
            case 4:
              be = 5;
              break e;
            case 7:
              Rf(i) ? ((be = 0), (Nt = null), Tm(t)) : ((be = 0), (Nt = null), Sn(e, t, i, 7));
              break;
            case 5:
              var f = null;
              switch (ce.tag) {
                case 26:
                  f = ce.memoizedState;
                case 5:
                case 27:
                  var v = ce;
                  if (f ? oh(f) : v.stateNode.complete) {
                    ((be = 0), (Nt = null));
                    var p = v.sibling;
                    if (p !== null) ce = p;
                    else {
                      var N = v.return;
                      N !== null ? ((ce = N), $c(N)) : (ce = null);
                    }
                    break t;
                  }
              }
              ((be = 0), (Nt = null), Sn(e, t, i, 5));
              break;
            case 6:
              ((be = 0), (Nt = null), Sn(e, t, i, 6));
              break;
            case 8:
              (vo(), (Re = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        dv();
        break;
      } catch (w) {
        pm(e, w);
      }
    while (!0);
    return (
      (da = pl = null),
      (O.H = l),
      (O.A = n),
      (ge = a),
      ce !== null ? 0 : ((Ne = null), (ue = 0), sc(), Re)
    );
  }
  function dv() {
    for (; ce !== null && !B0(); ) jm(ce);
  }
  function jm(e) {
    var t = Qd(e.alternate, e, xa);
    ((e.memoizedProps = e.pendingProps), t === null ? $c(e) : (ce = t));
  }
  function Tm(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Vd(a, t, t.pendingProps, t.type, void 0, ue);
        break;
      case 11:
        t = Vd(a, t, t.pendingProps, t.type.render, t.ref, ue);
        break;
      case 5:
        Cu(t);
      default:
        (Jd(a, t), (t = ce = xf(t, xa)), (t = Qd(a, t, xa)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? $c(e) : (ce = t));
  }
  function Sn(e, t, a, l) {
    ((da = pl = null), Cu(t), (rn = null), (Pn = 0));
    var n = t.return;
    try {
      if (ev(e, n, t, a, ue)) {
        ((Re = 1), Mc(e, Bt(a, e.current)), (ce = null));
        return;
      }
    } catch (i) {
      if (n !== null) throw ((ce = n), i);
      ((Re = 1), Mc(e, Bt(a, e.current)), (ce = null));
      return;
    }
    t.flags & 32768
      ? (fe || l === 1
          ? (e = !0)
          : yn || (ue & 536870912) !== 0
            ? (e = !1)
            : ((ka = e = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = Tt.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
        Am(t, e))
      : $c(t);
  }
  function $c(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Am(t, ka);
        return;
      }
      e = t.return;
      var a = lv(t.alternate, t, xa);
      if (a !== null) {
        ce = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ce = t;
        return;
      }
      ce = t = e;
    } while (t !== null);
    Re === 0 && (Re = 5);
  }
  function Am(e, t) {
    do {
      var a = nv(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (ce = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ce = e;
        return;
      }
      ce = e = a;
    } while (e !== null);
    ((Re = 6), (ce = null));
  }
  function Nm(e, t, a, l, n, i, f, v, p) {
    e.cancelPendingCommit = null;
    do Yc();
    while (ke !== 0);
    if ((ge & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((i = t.lanes | t.childLanes),
        (i |= lu),
        Z0(e, a, i, f, v, p),
        e === Ne && ((ce = Ne = null), (ue = 0)),
        (pn = t),
        (Qa = e),
        (ja = a),
        (fo = i),
        (mo = n),
        (vm = l),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            gv(Zi, function () {
              return (wm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = O.T), (O.T = null), (n = G.p), (G.p = 2), (f = ge), (ge |= 4));
        try {
          iv(e, t, a);
        } finally {
          ((ge = f), (G.p = n), (O.T = l));
        }
      }
      ((ke = 1), Em(), zm(), Mm());
    }
  }
  function Em() {
    if (ke === 1) {
      ke = 0;
      var e = Qa,
        t = pn,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var l = G.p;
        G.p = 2;
        var n = ge;
        ge |= 4;
        try {
          sm(t, e);
          var i = zo,
            f = mf(e.containerInfo),
            v = i.focusedElem,
            p = i.selectionRange;
          if (f !== v && v && v.ownerDocument && df(v.ownerDocument.documentElement, v)) {
            if (p !== null && Is(v)) {
              var N = p.start,
                w = p.end;
              if ((w === void 0 && (w = N), 'selectionStart' in v))
                ((v.selectionStart = N), (v.selectionEnd = Math.min(w, v.value.length)));
              else {
                var B = v.ownerDocument || document,
                  M = (B && B.defaultView) || window;
                if (M.getSelection) {
                  var C = M.getSelection(),
                    Y = v.textContent.length,
                    W = Math.min(p.start, Y),
                    Te = p.end === void 0 ? W : Math.min(p.end, Y);
                  !C.extend && W > Te && ((f = Te), (Te = W), (W = f));
                  var j = ff(v, W),
                    S = ff(v, Te);
                  if (
                    j &&
                    S &&
                    (C.rangeCount !== 1 ||
                      C.anchorNode !== j.node ||
                      C.anchorOffset !== j.offset ||
                      C.focusNode !== S.node ||
                      C.focusOffset !== S.offset)
                  ) {
                    var A = B.createRange();
                    (A.setStart(j.node, j.offset),
                      C.removeAllRanges(),
                      W > Te
                        ? (C.addRange(A), C.extend(S.node, S.offset))
                        : (A.setEnd(S.node, S.offset), C.addRange(A)));
                  }
                }
              }
            }
            for (B = [], C = v; (C = C.parentNode); )
              C.nodeType === 1 && B.push({ element: C, left: C.scrollLeft, top: C.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < B.length; v++) {
              var D = B[v];
              ((D.element.scrollLeft = D.left), (D.element.scrollTop = D.top));
            }
          }
          ((ts = !!Eo), (zo = Eo = null));
        } finally {
          ((ge = n), (G.p = l), (O.T = a));
        }
      }
      ((e.current = t), (ke = 2));
    }
  }
  function zm() {
    if (ke === 2) {
      ke = 0;
      var e = Qa,
        t = pn,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var l = G.p;
        G.p = 2;
        var n = ge;
        ge |= 4;
        try {
          am(e, t.alternate, t);
        } finally {
          ((ge = n), (G.p = l), (O.T = a));
        }
      }
      ke = 3;
    }
  }
  function Mm() {
    if (ke === 4 || ke === 3) {
      ((ke = 0), L0());
      var e = Qa,
        t = pn,
        a = ja,
        l = vm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (ke = 5)
        : ((ke = 0), (pn = Qa = null), Cm(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (
        (n === 0 && (Xa = null),
        Rs(a),
        (t = t.stateNode),
        bt && typeof bt.onCommitFiberRoot == 'function')
      )
        try {
          bt.onCommitFiberRoot(Bn, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        ((t = O.T), (n = G.p), (G.p = 2), (O.T = null));
        try {
          for (var i = e.onRecoverableError, f = 0; f < l.length; f++) {
            var v = l[f];
            i(v.value, { componentStack: v.stack });
          }
        } finally {
          ((O.T = t), (G.p = n));
        }
      }
      ((ja & 3) !== 0 && Yc(),
        la(e),
        (n = e.pendingLanes),
        (a & 261930) !== 0 && (n & 42) !== 0 ? (e === ho ? gi++ : ((gi = 0), (ho = e))) : (gi = 0),
        yi(0));
    }
  }
  function Cm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Fn(t)));
  }
  function Yc() {
    return (Em(), zm(), Mm(), wm());
  }
  function wm() {
    if (ke !== 5) return !1;
    var e = Qa,
      t = fo;
    fo = 0;
    var a = Rs(ja),
      l = O.T,
      n = G.p;
    try {
      ((G.p = 32 > a ? 32 : a), (O.T = null), (a = mo), (mo = null));
      var i = Qa,
        f = ja;
      if (((ke = 0), (pn = Qa = null), (ja = 0), (ge & 6) !== 0)) throw Error(o(331));
      var v = ge;
      if (
        ((ge |= 4),
        dm(i.current),
        om(i, i.current, f, a),
        (ge = v),
        yi(0, !1),
        bt && typeof bt.onPostCommitFiberRoot == 'function')
      )
        try {
          bt.onPostCommitFiberRoot(Bn, i);
        } catch {}
      return !0;
    } finally {
      ((G.p = n), (O.T = l), Cm(e, t));
    }
  }
  function Om(e, t, a) {
    ((t = Bt(a, t)),
      (t = Zu(e.stateNode, t, 2)),
      (e = Ga(e, t, 2)),
      e !== null && (qn(e, 2), la(e)));
  }
  function Se(e, t, a) {
    if (e.tag === 3) Om(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Om(t, e, a);
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof l.componentDidCatch == 'function' && (Xa === null || !Xa.has(l)))
          ) {
            ((e = Bt(a, e)),
              (a = Rd(2)),
              (l = Ga(t, a, 2)),
              l !== null && (Dd(a, l, t, e), qn(l, 2), la(l)));
            break;
          }
        }
        t = t.return;
      }
  }
  function yo(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new uv();
      var n = new Set();
      l.set(t, n);
    } else ((n = l.get(t)), n === void 0 && ((n = new Set()), l.set(t, n)));
    n.has(a) || ((uo = !0), n.add(a), (e = mv.bind(null, e, t, a)), t.then(e, e));
  }
  function mv(e, t, a) {
    var l = e.pingCache;
    (l !== null && l.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ne === e &&
        (ue & a) === a &&
        (Re === 4 || (Re === 3 && (ue & 62914560) === ue && 300 > pt() - qc)
          ? (ge & 2) === 0 && bn(e, 0)
          : (oo |= a),
        _n === ue && (_n = 0)),
      la(e));
  }
  function Rm(e, t) {
    (t === 0 && (t = Nr()), (e = gl(e, t)), e !== null && (qn(e, t), la(e)));
  }
  function hv(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), Rm(e, a));
  }
  function vv(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode,
          n = e.memoizedState;
        n !== null && (a = n.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (l !== null && l.delete(t), Rm(e, a));
  }
  function gv(e, t) {
    return Ms(e, t);
  }
  var kc = null,
    xn = null,
    _o = !1,
    Zc = !1,
    po = !1,
    Ja = 0;
  function la(e) {
    (e !== xn && e.next === null && (xn === null ? (kc = xn = e) : (xn = xn.next = e)),
      (Zc = !0),
      _o || ((_o = !0), _v()));
  }
  function yi(e, t) {
    if (!po && Zc) {
      po = !0;
      do
        for (var a = !1, l = kc; l !== null; ) {
          if (e !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var i = 0;
            else {
              var f = l.suspendedLanes,
                v = l.pingedLanes;
              ((i = (1 << (31 - St(42 | e) + 1)) - 1),
                (i &= n & ~(f & ~v)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((a = !0), qm(l, i));
          } else
            ((i = ue),
              (i = Ji(
                l,
                l === Ne ? i : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1
              )),
              (i & 3) === 0 || Ln(l, i) || ((a = !0), qm(l, i)));
          l = l.next;
        }
      while (a);
      po = !1;
    }
  }
  function yv() {
    Dm();
  }
  function Dm() {
    Zc = _o = !1;
    var e = 0;
    Ja !== 0 && zv() && (e = Ja);
    for (var t = pt(), a = null, l = kc; l !== null; ) {
      var n = l.next,
        i = Bm(l, t);
      (i === 0
        ? ((l.next = null), a === null ? (kc = n) : (a.next = n), n === null && (xn = a))
        : ((a = l), (e !== 0 || (i & 3) !== 0) && (Zc = !0)),
        (l = n));
    }
    ((ke !== 0 && ke !== 5) || yi(e), Ja !== 0 && (Ja = 0));
  }
  function Bm(e, t) {
    for (
      var a = e.suspendedLanes,
        l = e.pingedLanes,
        n = e.expirationTimes,
        i = e.pendingLanes & -62914561;
      0 < i;
    ) {
      var f = 31 - St(i),
        v = 1 << f,
        p = n[f];
      (p === -1
        ? ((v & a) === 0 || (v & l) !== 0) && (n[f] = k0(v, t))
        : p <= t && (e.expiredLanes |= v),
        (i &= ~v));
    }
    if (
      ((t = Ne),
      (a = ue),
      (a = Ji(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (l = e.callbackNode),
      a === 0 || (e === t && (be === 2 || be === 9)) || e.cancelPendingCommit !== null)
    )
      return (l !== null && l !== null && Cs(l), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Ln(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((l !== null && Cs(l), Rs(a))) {
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
        (l = Lm.bind(null, e)),
        (a = Ms(a, l)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      l !== null && l !== null && Cs(l),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Lm(e, t) {
    if (ke !== 0 && ke !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (Yc() && e.callbackNode !== a) return null;
    var l = ue;
    return (
      (l = Ji(e, e === Ne ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      l === 0
        ? null
        : (ym(e, l, t),
          Bm(e, pt()),
          e.callbackNode != null && e.callbackNode === a ? Lm.bind(null, e) : null)
    );
  }
  function qm(e, t) {
    if (Yc()) return null;
    ym(e, t, !0);
  }
  function _v() {
    Cv(function () {
      (ge & 6) !== 0 ? Ms(jr, yv) : Dm();
    });
  }
  function bo() {
    if (Ja === 0) {
      var e = sn;
      (e === 0 && ((e = Xi), (Xi <<= 1), (Xi & 261888) === 0 && (Xi = 256)), (Ja = e));
    }
    return Ja;
  }
  function Hm(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Pi('' + e);
  }
  function Um(e, t) {
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
  function pv(e, t, a, l, n) {
    if (t === 'submit' && a && a.stateNode === n) {
      var i = Hm((n[ft] || null).action),
        f = l.submitter;
      f &&
        ((t = (t = f[ft] || null) ? Hm(t.formAction) : f.getAttribute('formAction')),
        t !== null && ((i = t), (f = null)));
      var v = new lc('action', 'action', null, l, n);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Ja !== 0) {
                  var p = f ? Um(n, f) : new FormData(n);
                  Uu(a, { pending: !0, data: p, method: n.method, action: i }, null, p);
                }
              } else
                typeof i == 'function' &&
                  (v.preventDefault(),
                  (p = f ? Um(n, f) : new FormData(n)),
                  Uu(a, { pending: !0, data: p, method: n.method, action: i }, i, p));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var So = 0; So < au.length; So++) {
    var xo = au[So],
      bv = xo.toLowerCase(),
      Sv = xo[0].toUpperCase() + xo.slice(1);
    Zt(bv, 'on' + Sv);
  }
  (Zt(gf, 'onAnimationEnd'),
    Zt(yf, 'onAnimationIteration'),
    Zt(_f, 'onAnimationStart'),
    Zt('dblclick', 'onDoubleClick'),
    Zt('focusin', 'onFocus'),
    Zt('focusout', 'onBlur'),
    Zt(q1, 'onTransitionRun'),
    Zt(H1, 'onTransitionStart'),
    Zt(U1, 'onTransitionCancel'),
    Zt(pf, 'onTransitionEnd'),
    Xl('onMouseEnter', ['mouseout', 'mouseover']),
    Xl('onMouseLeave', ['mouseout', 'mouseover']),
    Xl('onPointerEnter', ['pointerout', 'pointerover']),
    Xl('onPointerLeave', ['pointerout', 'pointerover']),
    dl('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    dl(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    dl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    dl('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    dl(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    dl(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var _i =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    xv = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(_i)
    );
  function Gm(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a],
        n = l.event;
      l = l.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var f = l.length - 1; 0 <= f; f--) {
            var v = l[f],
              p = v.instance,
              N = v.currentTarget;
            if (((v = v.listener), p !== i && n.isPropagationStopped())) break e;
            ((i = v), (n.currentTarget = N));
            try {
              i(n);
            } catch (w) {
              cc(w);
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
              break e;
            ((i = v), (n.currentTarget = N));
            try {
              i(n);
            } catch (w) {
              cc(w);
            }
            ((n.currentTarget = null), (i = p));
          }
      }
    }
  }
  function se(e, t) {
    var a = t[Ds];
    a === void 0 && (a = t[Ds] = new Set());
    var l = e + '__bubble';
    a.has(l) || (Vm(t, e, 2, !1), a.add(l));
  }
  function jo(e, t, a) {
    var l = 0;
    (t && (l |= 4), Vm(a, e, l, t));
  }
  var Xc = '_reactListening' + Math.random().toString(36).slice(2);
  function To(e) {
    if (!e[Xc]) {
      ((e[Xc] = !0),
        Rr.forEach(function (a) {
          a !== 'selectionchange' && (xv.has(a) || jo(a, !1, e), jo(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Xc] || ((t[Xc] = !0), jo('selectionchange', !1, t));
    }
  }
  function Vm(e, t, a, l) {
    switch (gh(t)) {
      case 2:
        var n = Wv;
        break;
      case 8:
        n = Fv;
        break;
      default:
        n = Uo;
    }
    ((a = n.bind(null, t, a, e)),
      (n = void 0),
      !Ys || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (n = !0),
      l
        ? n !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: n })
          : e.addEventListener(t, a, !0)
        : n !== void 0
          ? e.addEventListener(t, a, { passive: n })
          : e.addEventListener(t, a, !1));
  }
  function Ao(e, t, a, l, n) {
    var i = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (;;) {
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
            if (((f = Yl(v)), f === null)) return;
            if (((p = f.tag), p === 5 || p === 6 || p === 26 || p === 27)) {
              l = i = f;
              continue e;
            }
            v = v.parentNode;
          }
        }
        l = l.return;
      }
    Zr(function () {
      var N = i,
        w = Vs(a),
        B = [];
      e: {
        var M = bf.get(e);
        if (M !== void 0) {
          var C = lc,
            Y = e;
          switch (e) {
            case 'keypress':
              if (tc(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              C = v1;
              break;
            case 'focusin':
              ((Y = 'focus'), (C = Qs));
              break;
            case 'focusout':
              ((Y = 'blur'), (C = Qs));
              break;
            case 'beforeblur':
            case 'afterblur':
              C = Qs;
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
              C = Kr;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              C = l1;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              C = _1;
              break;
            case gf:
            case yf:
            case _f:
              C = c1;
              break;
            case pf:
              C = b1;
              break;
            case 'scroll':
            case 'scrollend':
              C = t1;
              break;
            case 'wheel':
              C = x1;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              C = u1;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              C = Wr;
              break;
            case 'toggle':
            case 'beforetoggle':
              C = T1;
          }
          var W = (t & 4) !== 0,
            Te = !W && (e === 'scroll' || e === 'scrollend'),
            j = W ? (M !== null ? M + 'Capture' : null) : M;
          W = [];
          for (var S = N, A; S !== null; ) {
            var D = S;
            if (
              ((A = D.stateNode),
              (D = D.tag),
              (D !== 5 && D !== 26 && D !== 27) ||
                A === null ||
                j === null ||
                ((D = Gn(S, j)), D != null && W.push(pi(S, D, A))),
              Te)
            )
              break;
            S = S.return;
          }
          0 < W.length && ((M = new C(M, Y, null, a, w)), B.push({ event: M, listeners: W }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((M = e === 'mouseover' || e === 'pointerover'),
            (C = e === 'mouseout' || e === 'pointerout'),
            M && a !== Gs && (Y = a.relatedTarget || a.fromElement) && (Yl(Y) || Y[$l]))
          )
            break e;
          if (
            (C || M) &&
            ((M =
              w.window === w
                ? w
                : (M = w.ownerDocument)
                  ? M.defaultView || M.parentWindow
                  : window),
            C
              ? ((Y = a.relatedTarget || a.toElement),
                (C = N),
                (Y = Y ? Yl(Y) : null),
                Y !== null &&
                  ((Te = d(Y)), (W = Y.tag), Y !== Te || (W !== 5 && W !== 27 && W !== 6)) &&
                  (Y = null))
              : ((C = null), (Y = N)),
            C !== Y)
          ) {
            if (
              ((W = Kr),
              (D = 'onMouseLeave'),
              (j = 'onMouseEnter'),
              (S = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((W = Wr), (D = 'onPointerLeave'), (j = 'onPointerEnter'), (S = 'pointer')),
              (Te = C == null ? M : Un(C)),
              (A = Y == null ? M : Un(Y)),
              (M = new W(D, S + 'leave', C, a, w)),
              (M.target = Te),
              (M.relatedTarget = A),
              (D = null),
              Yl(w) === N &&
                ((W = new W(j, S + 'enter', Y, a, w)),
                (W.target = A),
                (W.relatedTarget = Te),
                (D = W)),
              (Te = D),
              C && Y)
            )
              t: {
                for (W = jv, j = C, S = Y, A = 0, D = j; D; D = W(D)) A++;
                D = 0;
                for (var K = S; K; K = W(K)) D++;
                for (; 0 < A - D; ) ((j = W(j)), A--);
                for (; 0 < D - A; ) ((S = W(S)), D--);
                for (; A--; ) {
                  if (j === S || (S !== null && j === S.alternate)) {
                    W = j;
                    break t;
                  }
                  ((j = W(j)), (S = W(S)));
                }
                W = null;
              }
            else W = null;
            (C !== null && $m(B, M, C, W, !1), Y !== null && Te !== null && $m(B, Te, Y, W, !0));
          }
        }
        e: {
          if (
            ((M = N ? Un(N) : window),
            (C = M.nodeName && M.nodeName.toLowerCase()),
            C === 'select' || (C === 'input' && M.type === 'file'))
          )
            var he = nf;
          else if (af(M))
            if (cf) he = D1;
            else {
              he = O1;
              var Z = w1;
            }
          else
            ((C = M.nodeName),
              !C || C.toLowerCase() !== 'input' || (M.type !== 'checkbox' && M.type !== 'radio')
                ? N && Us(N.elementType) && (he = nf)
                : (he = R1));
          if (he && (he = he(e, N))) {
            lf(B, he, a, w);
            break e;
          }
          (Z && Z(e, M, N),
            e === 'focusout' &&
              N &&
              M.type === 'number' &&
              N.memoizedProps.value != null &&
              Hs(M, 'number', M.value));
        }
        switch (((Z = N ? Un(N) : window), e)) {
          case 'focusin':
            (af(Z) || Z.contentEditable === 'true') && ((Il = Z), (Ps = N), (Kn = null));
            break;
          case 'focusout':
            Kn = Ps = Il = null;
            break;
          case 'mousedown':
            eu = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((eu = !1), hf(B, a, w));
            break;
          case 'selectionchange':
            if (L1) break;
          case 'keydown':
          case 'keyup':
            hf(B, a, w);
        }
        var ae;
        if (Js)
          e: {
            switch (e) {
              case 'compositionstart':
                var oe = 'onCompositionStart';
                break e;
              case 'compositionend':
                oe = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                oe = 'onCompositionUpdate';
                break e;
            }
            oe = void 0;
          }
        else
          Fl
            ? ef(e, a) && (oe = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (oe = 'onCompositionStart');
        (oe &&
          (Fr &&
            a.locale !== 'ko' &&
            (Fl || oe !== 'onCompositionStart'
              ? oe === 'onCompositionEnd' && Fl && (ae = Xr())
              : ((Ra = w), (ks = 'value' in Ra ? Ra.value : Ra.textContent), (Fl = !0))),
          (Z = Qc(N, oe)),
          0 < Z.length &&
            ((oe = new Jr(oe, e, null, a, w)),
            B.push({ event: oe, listeners: Z }),
            ae ? (oe.data = ae) : ((ae = tf(a)), ae !== null && (oe.data = ae)))),
          (ae = N1 ? E1(e, a) : z1(e, a)) &&
            ((oe = Qc(N, 'onBeforeInput')),
            0 < oe.length &&
              ((Z = new Jr('onBeforeInput', 'beforeinput', null, a, w)),
              B.push({ event: Z, listeners: oe }),
              (Z.data = ae))),
          pv(B, e, N, a, w));
      }
      Gm(B, t);
    });
  }
  function pi(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function Qc(e, t) {
    for (var a = t + 'Capture', l = []; e !== null; ) {
      var n = e,
        i = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          i === null ||
          ((n = Gn(e, a)),
          n != null && l.unshift(pi(e, n, i)),
          (n = Gn(e, t)),
          n != null && l.push(pi(e, n, i))),
        e.tag === 3)
      )
        return l;
      e = e.return;
    }
    return [];
  }
  function jv(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function $m(e, t, a, l, n) {
    for (var i = t._reactName, f = []; a !== null && a !== l; ) {
      var v = a,
        p = v.alternate,
        N = v.stateNode;
      if (((v = v.tag), p !== null && p === l)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        N === null ||
        ((p = N),
        n
          ? ((N = Gn(a, i)), N != null && f.unshift(pi(a, N, p)))
          : n || ((N = Gn(a, i)), N != null && f.push(pi(a, N, p)))),
        (a = a.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var Tv = /\r\n?/g,
    Av = /\u0000|\uFFFD/g;
  function Ym(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Tv,
        `
`
      )
      .replace(Av, '');
  }
  function km(e, t) {
    return ((t = Ym(t)), Ym(e) === t);
  }
  function je(e, t, a, l, n, i) {
    switch (a) {
      case 'children':
        typeof l == 'string'
          ? t === 'body' || (t === 'textarea' && l === '') || Kl(e, l)
          : (typeof l == 'number' || typeof l == 'bigint') && t !== 'body' && Kl(e, '' + l);
        break;
      case 'className':
        Fi(e, 'class', l);
        break;
      case 'tabIndex':
        Fi(e, 'tabindex', l);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Fi(e, a, l);
        break;
      case 'style':
        Yr(e, l, i);
        break;
      case 'data':
        if (t !== 'object') {
          Fi(e, 'data', l);
          break;
        }
      case 'src':
      case 'href':
        if (l === '' && (t !== 'a' || a !== 'href')) {
          e.removeAttribute(a);
          break;
        }
        if (l == null || typeof l == 'function' || typeof l == 'symbol' || typeof l == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((l = Pi('' + l)), e.setAttribute(a, l));
        break;
      case 'action':
      case 'formAction':
        if (typeof l == 'function') {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == 'function' &&
            (a === 'formAction'
              ? (t !== 'input' && je(e, t, 'name', n.name, n, null),
                je(e, t, 'formEncType', n.formEncType, n, null),
                je(e, t, 'formMethod', n.formMethod, n, null),
                je(e, t, 'formTarget', n.formTarget, n, null))
              : (je(e, t, 'encType', n.encType, n, null),
                je(e, t, 'method', n.method, n, null),
                je(e, t, 'target', n.target, n, null)));
        if (l == null || typeof l == 'symbol' || typeof l == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((l = Pi('' + l)), e.setAttribute(a, l));
        break;
      case 'onClick':
        l != null && (e.onclick = ua);
        break;
      case 'onScroll':
        l != null && se('scroll', e);
        break;
      case 'onScrollEnd':
        l != null && se('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (l != null) {
          if (typeof l != 'object' || !('__html' in l)) throw Error(o(61));
          if (((a = l.__html), a != null)) {
            if (n.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'multiple':
        e.multiple = l && typeof l != 'function' && typeof l != 'symbol';
        break;
      case 'muted':
        e.muted = l && typeof l != 'function' && typeof l != 'symbol';
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
          e.removeAttribute('xlink:href');
          break;
        }
        ((a = Pi('' + l)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
          ? e.setAttribute(a, '' + l)
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
        l && typeof l != 'function' && typeof l != 'symbol'
          ? e.setAttribute(a, '')
          : e.removeAttribute(a);
        break;
      case 'capture':
      case 'download':
        l === !0
          ? e.setAttribute(a, '')
          : l !== !1 && l != null && typeof l != 'function' && typeof l != 'symbol'
            ? e.setAttribute(a, l)
            : e.removeAttribute(a);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        l != null && typeof l != 'function' && typeof l != 'symbol' && !isNaN(l) && 1 <= l
          ? e.setAttribute(a, l)
          : e.removeAttribute(a);
        break;
      case 'rowSpan':
      case 'start':
        l == null || typeof l == 'function' || typeof l == 'symbol' || isNaN(l)
          ? e.removeAttribute(a)
          : e.setAttribute(a, l);
        break;
      case 'popover':
        (se('beforetoggle', e), se('toggle', e), Wi(e, 'popover', l));
        break;
      case 'xlinkActuate':
        sa(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', l);
        break;
      case 'xlinkArcrole':
        sa(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', l);
        break;
      case 'xlinkRole':
        sa(e, 'http://www.w3.org/1999/xlink', 'xlink:role', l);
        break;
      case 'xlinkShow':
        sa(e, 'http://www.w3.org/1999/xlink', 'xlink:show', l);
        break;
      case 'xlinkTitle':
        sa(e, 'http://www.w3.org/1999/xlink', 'xlink:title', l);
        break;
      case 'xlinkType':
        sa(e, 'http://www.w3.org/1999/xlink', 'xlink:type', l);
        break;
      case 'xmlBase':
        sa(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', l);
        break;
      case 'xmlLang':
        sa(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', l);
        break;
      case 'xmlSpace':
        sa(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', l);
        break;
      case 'is':
        Wi(e, 'is', l);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = P0.get(a) || a), Wi(e, a, l));
    }
  }
  function No(e, t, a, l, n, i) {
    switch (a) {
      case 'style':
        Yr(e, l, i);
        break;
      case 'dangerouslySetInnerHTML':
        if (l != null) {
          if (typeof l != 'object' || !('__html' in l)) throw Error(o(61));
          if (((a = l.__html), a != null)) {
            if (n.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof l == 'string'
          ? Kl(e, l)
          : (typeof l == 'number' || typeof l == 'bigint') && Kl(e, '' + l);
        break;
      case 'onScroll':
        l != null && se('scroll', e);
        break;
      case 'onScrollEnd':
        l != null && se('scrollend', e);
        break;
      case 'onClick':
        l != null && (e.onclick = ua);
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
        if (!Dr.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((n = a.endsWith('Capture')),
              (t = a.slice(2, n ? a.length - 7 : void 0)),
              (i = e[ft] || null),
              (i = i != null ? i[a] : null),
              typeof i == 'function' && e.removeEventListener(t, i, n),
              typeof l == 'function')
            ) {
              (typeof i != 'function' &&
                i !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, l, n));
              break e;
            }
            a in e ? (e[a] = l) : l === !0 ? e.setAttribute(a, '') : Wi(e, a, l);
          }
    }
  }
  function tt(e, t, a) {
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
        (se('error', e), se('load', e));
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
                  throw Error(o(137, t));
                default:
                  je(e, t, i, f, a, null);
              }
          }
        (n && je(e, t, 'srcSet', a.srcSet, a, null), l && je(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        se('invalid', e);
        var v = (i = f = n = null),
          p = null,
          N = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var w = a[l];
            if (w != null)
              switch (l) {
                case 'name':
                  n = w;
                  break;
                case 'type':
                  f = w;
                  break;
                case 'checked':
                  p = w;
                  break;
                case 'defaultChecked':
                  N = w;
                  break;
                case 'value':
                  i = w;
                  break;
                case 'defaultValue':
                  v = w;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (w != null) throw Error(o(137, t));
                  break;
                default:
                  je(e, t, l, w, a, null);
              }
          }
        Ur(e, i, v, p, N, f, n, !1);
        return;
      case 'select':
        (se('invalid', e), (l = f = i = null));
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
                je(e, t, n, v, a, null);
            }
        ((t = i),
          (a = f),
          (e.multiple = !!l),
          t != null ? Ql(e, !!l, t, !1) : a != null && Ql(e, !!l, a, !0));
        return;
      case 'textarea':
        (se('invalid', e), (i = n = l = null));
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
                je(e, t, f, v, a, null);
            }
        Vr(e, l, n, i);
        return;
      case 'option':
        for (p in a)
          if (a.hasOwnProperty(p) && ((l = a[p]), l != null))
            switch (p) {
              case 'selected':
                e.selected = l && typeof l != 'function' && typeof l != 'symbol';
                break;
              default:
                je(e, t, p, l, a, null);
            }
        return;
      case 'dialog':
        (se('beforetoggle', e), se('toggle', e), se('cancel', e), se('close', e));
        break;
      case 'iframe':
      case 'object':
        se('load', e);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < _i.length; l++) se(_i[l], e);
        break;
      case 'image':
        (se('error', e), se('load', e));
        break;
      case 'details':
        se('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (se('error', e), se('load', e));
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
                throw Error(o(137, t));
              default:
                je(e, t, N, l, a, null);
            }
        return;
      default:
        if (Us(t)) {
          for (w in a)
            a.hasOwnProperty(w) && ((l = a[w]), l !== void 0 && No(e, t, w, l, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((l = a[v]), l != null && je(e, t, v, l, a, null));
  }
  function Nv(e, t, a, l) {
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
        var n = null,
          i = null,
          f = null,
          v = null,
          p = null,
          N = null,
          w = null;
        for (C in a) {
          var B = a[C];
          if (a.hasOwnProperty(C) && B != null)
            switch (C) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                p = B;
              default:
                l.hasOwnProperty(C) || je(e, t, C, null, l, B);
            }
        }
        for (var M in l) {
          var C = l[M];
          if (((B = a[M]), l.hasOwnProperty(M) && (C != null || B != null)))
            switch (M) {
              case 'type':
                i = C;
                break;
              case 'name':
                n = C;
                break;
              case 'checked':
                N = C;
                break;
              case 'defaultChecked':
                w = C;
                break;
              case 'value':
                f = C;
                break;
              case 'defaultValue':
                v = C;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (C != null) throw Error(o(137, t));
                break;
              default:
                C !== B && je(e, t, M, C, l, B);
            }
        }
        qs(e, f, v, p, N, w, i, n);
        return;
      case 'select':
        C = f = v = M = null;
        for (i in a)
          if (((p = a[i]), a.hasOwnProperty(i) && p != null))
            switch (i) {
              case 'value':
                break;
              case 'multiple':
                C = p;
              default:
                l.hasOwnProperty(i) || je(e, t, i, null, l, p);
            }
        for (n in l)
          if (((i = l[n]), (p = a[n]), l.hasOwnProperty(n) && (i != null || p != null)))
            switch (n) {
              case 'value':
                M = i;
                break;
              case 'defaultValue':
                v = i;
                break;
              case 'multiple':
                f = i;
              default:
                i !== p && je(e, t, n, i, l, p);
            }
        ((t = v),
          (a = f),
          (l = C),
          M != null
            ? Ql(e, !!a, M, !1)
            : !!l != !!a && (t != null ? Ql(e, !!a, t, !0) : Ql(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        C = M = null;
        for (v in a)
          if (((n = a[v]), a.hasOwnProperty(v) && n != null && !l.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                je(e, t, v, null, l, n);
            }
        for (f in l)
          if (((n = l[f]), (i = a[f]), l.hasOwnProperty(f) && (n != null || i != null)))
            switch (f) {
              case 'value':
                M = n;
                break;
              case 'defaultValue':
                C = n;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== i && je(e, t, f, n, l, i);
            }
        Gr(e, M, C);
        return;
      case 'option':
        for (var Y in a)
          if (((M = a[Y]), a.hasOwnProperty(Y) && M != null && !l.hasOwnProperty(Y)))
            switch (Y) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                je(e, t, Y, null, l, M);
            }
        for (p in l)
          if (((M = l[p]), (C = a[p]), l.hasOwnProperty(p) && M !== C && (M != null || C != null)))
            switch (p) {
              case 'selected':
                e.selected = M && typeof M != 'function' && typeof M != 'symbol';
                break;
              default:
                je(e, t, p, M, l, C);
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
        for (var W in a)
          ((M = a[W]),
            a.hasOwnProperty(W) && M != null && !l.hasOwnProperty(W) && je(e, t, W, null, l, M));
        for (N in l)
          if (((M = l[N]), (C = a[N]), l.hasOwnProperty(N) && M !== C && (M != null || C != null)))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (M != null) throw Error(o(137, t));
                break;
              default:
                je(e, t, N, M, l, C);
            }
        return;
      default:
        if (Us(t)) {
          for (var Te in a)
            ((M = a[Te]),
              a.hasOwnProperty(Te) &&
                M !== void 0 &&
                !l.hasOwnProperty(Te) &&
                No(e, t, Te, void 0, l, M));
          for (w in l)
            ((M = l[w]),
              (C = a[w]),
              !l.hasOwnProperty(w) ||
                M === C ||
                (M === void 0 && C === void 0) ||
                No(e, t, w, M, l, C));
          return;
        }
    }
    for (var j in a)
      ((M = a[j]),
        a.hasOwnProperty(j) && M != null && !l.hasOwnProperty(j) && je(e, t, j, null, l, M));
    for (B in l)
      ((M = l[B]),
        (C = a[B]),
        !l.hasOwnProperty(B) || M === C || (M == null && C == null) || je(e, t, B, M, l, C));
  }
  function Zm(e) {
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
  function Ev() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), l = 0;
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
            var w = p.transferSize,
              B = p.initiatorType;
            w && Zm(B) && ((p = p.responseEnd), (f += w * (p < v ? 1 : (v - N) / (p - N))));
          }
          if ((--l, (t += (8 * (i + f)) / (n.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var Eo = null,
    zo = null;
  function Kc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Xm(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Qm(e, t) {
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
  function Mo(e, t) {
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
  var Co = null;
  function zv() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Co ? !1 : ((Co = e), !0)) : ((Co = null), !1);
  }
  var Km = typeof setTimeout == 'function' ? setTimeout : void 0,
    Mv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Jm = typeof Promise == 'function' ? Promise : void 0,
    Cv =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Jm < 'u'
          ? function (e) {
              return Jm.resolve(null).then(e).catch(wv);
            }
          : Km;
  function wv(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Wa(e) {
    return e === 'head';
  }
  function Wm(e, t) {
    var a = t,
      l = 0;
    do {
      var n = a.nextSibling;
      if ((e.removeChild(a), n && n.nodeType === 8))
        if (((a = n.data), a === '/$' || a === '/&')) {
          if (l === 0) {
            (e.removeChild(n), Nn(t));
            return;
          }
          l--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') l++;
        else if (a === 'html') bi(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), bi(a));
          for (var i = a.firstChild; i; ) {
            var f = i.nextSibling,
              v = i.nodeName;
            (i[Hn] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(i),
              (i = f));
          }
        } else a === 'body' && bi(e.ownerDocument.body);
      a = n;
    } while (a);
    Nn(t);
  }
  function Fm(e, t) {
    var a = e;
    e = 0;
    do {
      var l = a.nextSibling;
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
        l && l.nodeType === 8)
      )
        if (((a = l.data), a === '/$')) {
          if (e === 0) break;
          e--;
        } else (a !== '$' && a !== '$?' && a !== '$~' && a !== '$!') || e++;
      a = l;
    } while (a);
  }
  function wo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
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
      e.removeChild(a);
    }
  }
  function Ov(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var n = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (l) {
        if (!e[Hn])
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
                i !== n.rel ||
                e.getAttribute('href') !== (n.href == null || n.href === '' ? null : n.href) ||
                e.getAttribute('crossorigin') !== (n.crossOrigin == null ? null : n.crossOrigin) ||
                e.getAttribute('title') !== (n.title == null ? null : n.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((i = e.getAttribute('src')),
                (i !== (n.src == null ? null : n.src) ||
                  e.getAttribute('type') !== (n.type == null ? null : n.type) ||
                  e.getAttribute('crossorigin') !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
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
        var i = n.name == null ? null : '' + n.name;
        if (n.type === 'hidden' && e.getAttribute('name') === i) return e;
      } else return e;
      if (((e = Gt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Rv(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = Gt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Im(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Gt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Oo(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function Ro(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function Dv(e, t) {
    var a = e.ownerDocument;
    if (e.data === '$~') e._reactRetry = t;
    else if (e.data !== '$?' || a.readyState !== 'loading') t();
    else {
      var l = function () {
        (t(), a.removeEventListener('DOMContentLoaded', l));
      };
      (a.addEventListener('DOMContentLoaded', l), (e._reactRetry = l));
    }
  }
  function Gt(e) {
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
  var Do = null;
  function Pm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '/$' || a === '/&') {
          if (t === 0) return Gt(e.nextSibling);
          t--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function eh(e) {
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
  function th(e, t, a) {
    switch (((t = Kc(a)), e)) {
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
  function bi(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Bs(e);
  }
  var Vt = new Map(),
    ah = new Set();
  function Jc(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Ta = G.d;
  G.d = { f: Bv, r: Lv, D: qv, C: Hv, L: Uv, m: Gv, X: $v, S: Vv, M: Yv };
  function Bv() {
    var e = Ta.f(),
      t = Gc();
    return e || t;
  }
  function Lv(e) {
    var t = kl(e);
    t !== null && t.tag === 5 && t.type === 'form' ? pd(t) : Ta.r(e);
  }
  var jn = typeof document > 'u' ? null : document;
  function lh(e, t, a) {
    var l = jn;
    if (l && typeof t == 'string' && t) {
      var n = Rt(t);
      ((n = 'link[rel="' + e + '"][href="' + n + '"]'),
        typeof a == 'string' && (n += '[crossorigin="' + a + '"]'),
        ah.has(n) ||
          (ah.add(n),
          (e = { rel: e, crossOrigin: a, href: t }),
          l.querySelector(n) === null &&
            ((t = l.createElement('link')), tt(t, 'link', e), Qe(t), l.head.appendChild(t))));
    }
  }
  function qv(e) {
    (Ta.D(e), lh('dns-prefetch', e, null));
  }
  function Hv(e, t) {
    (Ta.C(e, t), lh('preconnect', e, t));
  }
  function Uv(e, t, a) {
    Ta.L(e, t, a);
    var l = jn;
    if (l && e && t) {
      var n = 'link[rel="preload"][as="' + Rt(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((n += '[imagesrcset="' + Rt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (n += '[imagesizes="' + Rt(a.imageSizes) + '"]'))
        : (n += '[href="' + Rt(e) + '"]');
      var i = n;
      switch (t) {
        case 'style':
          i = Tn(e);
          break;
        case 'script':
          i = An(e);
      }
      Vt.has(i) ||
        ((e = T(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        Vt.set(i, e),
        l.querySelector(n) !== null ||
          (t === 'style' && l.querySelector(Si(i))) ||
          (t === 'script' && l.querySelector(xi(i))) ||
          ((t = l.createElement('link')), tt(t, 'link', e), Qe(t), l.head.appendChild(t)));
    }
  }
  function Gv(e, t) {
    Ta.m(e, t);
    var a = jn;
    if (a && e) {
      var l = t && typeof t.as == 'string' ? t.as : 'script',
        n = 'link[rel="modulepreload"][as="' + Rt(l) + '"][href="' + Rt(e) + '"]',
        i = n;
      switch (l) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          i = An(e);
      }
      if (
        !Vt.has(i) &&
        ((e = T({ rel: 'modulepreload', href: e }, t)), Vt.set(i, e), a.querySelector(n) === null)
      ) {
        switch (l) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(xi(i))) return;
        }
        ((l = a.createElement('link')), tt(l, 'link', e), Qe(l), a.head.appendChild(l));
      }
    }
  }
  function Vv(e, t, a) {
    Ta.S(e, t, a);
    var l = jn;
    if (l && e) {
      var n = Zl(l).hoistableStyles,
        i = Tn(e);
      t = t || 'default';
      var f = n.get(i);
      if (!f) {
        var v = { loading: 0, preload: null };
        if ((f = l.querySelector(Si(i)))) v.loading = 5;
        else {
          ((e = T({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Vt.get(i)) && Bo(e, a));
          var p = (f = l.createElement('link'));
          (Qe(p),
            tt(p, 'link', e),
            (p._p = new Promise(function (N, w) {
              ((p.onload = N), (p.onerror = w));
            })),
            p.addEventListener('load', function () {
              v.loading |= 1;
            }),
            p.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            Wc(f, t, l));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: v }), n.set(i, f));
      }
    }
  }
  function $v(e, t) {
    Ta.X(e, t);
    var a = jn;
    if (a && e) {
      var l = Zl(a).hoistableScripts,
        n = An(e),
        i = l.get(n);
      i ||
        ((i = a.querySelector(xi(n))),
        i ||
          ((e = T({ src: e, async: !0 }, t)),
          (t = Vt.get(n)) && Lo(e, t),
          (i = a.createElement('script')),
          Qe(i),
          tt(i, 'link', e),
          a.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        l.set(n, i));
    }
  }
  function Yv(e, t) {
    Ta.M(e, t);
    var a = jn;
    if (a && e) {
      var l = Zl(a).hoistableScripts,
        n = An(e),
        i = l.get(n);
      i ||
        ((i = a.querySelector(xi(n))),
        i ||
          ((e = T({ src: e, async: !0, type: 'module' }, t)),
          (t = Vt.get(n)) && Lo(e, t),
          (i = a.createElement('script')),
          Qe(i),
          tt(i, 'link', e),
          a.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        l.set(n, i));
    }
  }
  function nh(e, t, a, l) {
    var n = (n = ie.current) ? Jc(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = Tn(a.href)),
            (a = Zl(n).hoistableStyles),
            (l = a.get(t)),
            l || ((l = { type: 'style', instance: null, count: 0, state: null }), a.set(t, l)),
            l)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          a.rel === 'stylesheet' &&
          typeof a.href == 'string' &&
          typeof a.precedence == 'string'
        ) {
          e = Tn(a.href);
          var i = Zl(n).hoistableStyles,
            f = i.get(e);
          if (
            (f ||
              ((n = n.ownerDocument || n),
              (f = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              i.set(e, f),
              (i = n.querySelector(Si(e))) && !i._p && ((f.instance = i), (f.state.loading = 5)),
              Vt.has(e) ||
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
                Vt.set(e, a),
                i || kv(n, e, a, f.state))),
            t && l === null)
          )
            throw Error(o(528, ''));
          return f;
        }
        if (t && l !== null) throw Error(o(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = An(a)),
              (a = Zl(n).hoistableScripts),
              (l = a.get(t)),
              l || ((l = { type: 'script', instance: null, count: 0, state: null }), a.set(t, l)),
              l)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Tn(e) {
    return 'href="' + Rt(e) + '"';
  }
  function Si(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function ih(e) {
    return T({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function kv(e, t, a, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (l.loading = 1)
      : ((t = e.createElement('link')),
        (l.preload = t),
        t.addEventListener('load', function () {
          return (l.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (l.loading |= 2);
        }),
        tt(t, 'link', a),
        Qe(t),
        e.head.appendChild(t));
  }
  function An(e) {
    return '[src="' + Rt(e) + '"]';
  }
  function xi(e) {
    return 'script[async]' + e;
  }
  function ch(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var l = e.querySelector('style[data-href~="' + Rt(a.href) + '"]');
          if (l) return ((t.instance = l), Qe(l), l);
          var n = T({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (e.ownerDocument || e).createElement('style')),
            Qe(l),
            tt(l, 'style', n),
            Wc(l, a.precedence, e),
            (t.instance = l)
          );
        case 'stylesheet':
          n = Tn(a.href);
          var i = e.querySelector(Si(n));
          if (i) return ((t.state.loading |= 4), (t.instance = i), Qe(i), i);
          ((l = ih(a)),
            (n = Vt.get(n)) && Bo(l, n),
            (i = (e.ownerDocument || e).createElement('link')),
            Qe(i));
          var f = i;
          return (
            (f._p = new Promise(function (v, p) {
              ((f.onload = v), (f.onerror = p));
            })),
            tt(i, 'link', l),
            (t.state.loading |= 4),
            Wc(i, a.precedence, e),
            (t.instance = i)
          );
        case 'script':
          return (
            (i = An(a.src)),
            (n = e.querySelector(xi(i)))
              ? ((t.instance = n), Qe(n), n)
              : ((l = a),
                (n = Vt.get(i)) && ((l = T({}, a)), Lo(l, n)),
                (e = e.ownerDocument || e),
                (n = e.createElement('script')),
                Qe(n),
                tt(n, 'link', l),
                e.head.appendChild(n),
                (t.instance = n))
          );
        case 'void':
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((l = t.instance), (t.state.loading |= 4), Wc(l, a.precedence, e));
    return t.instance;
  }
  function Wc(e, t, a) {
    for (
      var l = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        n = l.length ? l[l.length - 1] : null,
        i = n,
        f = 0;
      f < l.length;
      f++
    ) {
      var v = l[f];
      if (v.dataset.precedence === t) i = v;
      else if (i !== n) break;
    }
    i
      ? i.parentNode.insertBefore(e, i.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function Bo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Lo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Fc = null;
  function sh(e, t, a) {
    if (Fc === null) {
      var l = new Map(),
        n = (Fc = new Map());
      n.set(a, l);
    } else ((n = Fc), (l = n.get(a)), l || ((l = new Map()), n.set(a, l)));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var i = a[n];
      if (
        !(i[Hn] || i[Fe] || (e === 'link' && i.getAttribute('rel') === 'stylesheet')) &&
        i.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var f = i.getAttribute(t) || '';
        f = e + f;
        var v = l.get(f);
        v ? v.push(i) : l.set(f, [i]);
      }
    }
    return l;
  }
  function uh(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function Zv(e, t, a) {
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
  function oh(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function Xv(e, t, a, l) {
    if (
      a.type === 'stylesheet' &&
      (typeof l.media != 'string' || matchMedia(l.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var n = Tn(l.href),
          i = t.querySelector(Si(n));
        if (i) {
          ((t = i._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Ic.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = i),
            Qe(i));
          return;
        }
        ((i = t.ownerDocument || t),
          (l = ih(l)),
          (n = Vt.get(n)) && Bo(l, n),
          (i = i.createElement('link')),
          Qe(i));
        var f = i;
        ((f._p = new Promise(function (v, p) {
          ((f.onload = v), (f.onerror = p));
        })),
          tt(i, 'link', l),
          (a.instance = i));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = Ic.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var qo = 0;
  function Qv(e, t) {
    return (
      e.stylesheets && e.count === 0 && es(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var l = setTimeout(function () {
              if ((e.stylesheets && es(e, e.stylesheets), e.unsuspend)) {
                var i = e.unsuspend;
                ((e.unsuspend = null), i());
              }
            }, 6e4 + t);
            0 < e.imgBytes && qo === 0 && (qo = 62500 * Ev());
            var n = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && es(e, e.stylesheets), e.unsuspend))
                ) {
                  var i = e.unsuspend;
                  ((e.unsuspend = null), i());
                }
              },
              (e.imgBytes > qo ? 50 : 800) + t
            );
            return (
              (e.unsuspend = a),
              function () {
                ((e.unsuspend = null), clearTimeout(l), clearTimeout(n));
              }
            );
          }
        : null
    );
  }
  function Ic() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) es(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Pc = null;
  function es(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Pc = new Map()), t.forEach(Kv, e), (Pc = null), Ic.call(e)));
  }
  function Kv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Pc.get(e);
      if (a) var l = a.get(null);
      else {
        ((a = new Map()), Pc.set(e, a));
        for (
          var n = e.querySelectorAll('link[data-precedence],style[data-precedence]'), i = 0;
          i < n.length;
          i++
        ) {
          var f = n[i];
          (f.nodeName === 'LINK' || f.getAttribute('media') !== 'not all') &&
            (a.set(f.dataset.precedence, f), (l = f));
        }
        l && a.set(null, l);
      }
      ((n = t.instance),
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
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(n, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var ji = {
    $$typeof: ye,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0,
  };
  function Jv(e, t, a, l, n, i, f, v, p) {
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
      (this.formState = p),
      (this.incompleteTransitions = new Map()));
  }
  function rh(e, t, a, l, n, i, f, v, p, N, w, B) {
    return (
      (e = new Jv(e, t, a, f, p, N, w, B, v)),
      (t = 1),
      i === !0 && (t |= 24),
      (i = jt(3, null, null, t)),
      (e.current = i),
      (i.stateNode = e),
      (t = vu()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (i.memoizedState = { element: l, isDehydrated: a, cache: t }),
      pu(i),
      e
    );
  }
  function fh(e) {
    return e ? ((e = tn), e) : tn;
  }
  function dh(e, t, a, l, n, i) {
    ((n = fh(n)),
      l.context === null ? (l.context = n) : (l.pendingContext = n),
      (l = Ua(t)),
      (l.payload = { element: a }),
      (i = i === void 0 ? null : i),
      i !== null && (l.callback = i),
      (a = Ga(e, l, t)),
      a !== null && (yt(a, e, t), ti(a, e, t)));
  }
  function mh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Ho(e, t) {
    (mh(e, t), (e = e.alternate) && mh(e, t));
  }
  function hh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = gl(e, 67108864);
      (t !== null && yt(t, e, 67108864), Ho(e, 67108864));
    }
  }
  function vh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = zt();
      t = Os(t);
      var a = gl(e, t);
      (a !== null && yt(a, e, t), Ho(e, t));
    }
  }
  var ts = !0;
  function Wv(e, t, a, l) {
    var n = O.T;
    O.T = null;
    var i = G.p;
    try {
      ((G.p = 2), Uo(e, t, a, l));
    } finally {
      ((G.p = i), (O.T = n));
    }
  }
  function Fv(e, t, a, l) {
    var n = O.T;
    O.T = null;
    var i = G.p;
    try {
      ((G.p = 8), Uo(e, t, a, l));
    } finally {
      ((G.p = i), (O.T = n));
    }
  }
  function Uo(e, t, a, l) {
    if (ts) {
      var n = Go(l);
      if (n === null) (Ao(e, t, l, as, a), yh(e, l));
      else if (Pv(n, e, t, a, l)) l.stopPropagation();
      else if ((yh(e, l), t & 4 && -1 < Iv.indexOf(e))) {
        for (; n !== null; ) {
          var i = kl(n);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var f = fl(i.pendingLanes);
                  if (f !== 0) {
                    var v = i;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; f; ) {
                      var p = 1 << (31 - St(f));
                      ((v.entanglements[1] |= p), (f &= ~p));
                    }
                    (la(i), (ge & 6) === 0 && ((Hc = pt() + 500), yi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = gl(i, 2)), v !== null && yt(v, i, 2), Gc(), Ho(i, 2));
            }
          if (((i = Go(l)), i === null && Ao(e, t, l, as, a), i === n)) break;
          n = i;
        }
        n !== null && l.stopPropagation();
      } else Ao(e, t, l, null, a);
    }
  }
  function Go(e) {
    return ((e = Vs(e)), Vo(e));
  }
  var as = null;
  function Vo(e) {
    if (((as = null), (e = Yl(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (a === 31) {
          if (((e = g(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((as = e), null);
  }
  function gh(e) {
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
        switch (q0()) {
          case jr:
            return 2;
          case Tr:
            return 8;
          case Zi:
          case H0:
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
  var $o = !1,
    Fa = null,
    Ia = null,
    Pa = null,
    Ti = new Map(),
    Ai = new Map(),
    el = [],
    Iv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function yh(e, t) {
    switch (e) {
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
        Ti.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Ai.delete(t.pointerId);
    }
  }
  function Ni(e, t, a, l, n, i) {
    return e === null || e.nativeEvent !== i
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: l,
          nativeEvent: i,
          targetContainers: [n],
        }),
        t !== null && ((t = kl(t)), t !== null && hh(t)),
        e)
      : ((e.eventSystemFlags |= l),
        (t = e.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e);
  }
  function Pv(e, t, a, l, n) {
    switch (t) {
      case 'focusin':
        return ((Fa = Ni(Fa, e, t, a, l, n)), !0);
      case 'dragenter':
        return ((Ia = Ni(Ia, e, t, a, l, n)), !0);
      case 'mouseover':
        return ((Pa = Ni(Pa, e, t, a, l, n)), !0);
      case 'pointerover':
        var i = n.pointerId;
        return (Ti.set(i, Ni(Ti.get(i) || null, e, t, a, l, n)), !0);
      case 'gotpointercapture':
        return ((i = n.pointerId), Ai.set(i, Ni(Ai.get(i) || null, e, t, a, l, n)), !0);
    }
    return !1;
  }
  function _h(e) {
    var t = Yl(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = h(a)), t !== null)) {
            ((e.blockedOn = t),
              wr(e.priority, function () {
                vh(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = g(a)), t !== null)) {
            ((e.blockedOn = t),
              wr(e.priority, function () {
                vh(a);
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
  function ls(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Go(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(a.type, a);
        ((Gs = l), a.target.dispatchEvent(l), (Gs = null));
      } else return ((t = kl(a)), t !== null && hh(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function ph(e, t, a) {
    ls(e) && a.delete(t);
  }
  function eg() {
    (($o = !1),
      Fa !== null && ls(Fa) && (Fa = null),
      Ia !== null && ls(Ia) && (Ia = null),
      Pa !== null && ls(Pa) && (Pa = null),
      Ti.forEach(ph),
      Ai.forEach(ph));
  }
  function ns(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      $o || (($o = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, eg)));
  }
  var is = null;
  function bh(e) {
    is !== e &&
      ((is = e),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        is === e && (is = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            l = e[t + 1],
            n = e[t + 2];
          if (typeof l != 'function') {
            if (Vo(l || a) === null) continue;
            break;
          }
          var i = kl(a);
          i !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Uu(i, { pending: !0, data: n, method: a.method, action: l }, l, n));
        }
      }));
  }
  function Nn(e) {
    function t(p) {
      return ns(p, e);
    }
    (Fa !== null && ns(Fa, e),
      Ia !== null && ns(Ia, e),
      Pa !== null && ns(Pa, e),
      Ti.forEach(t),
      Ai.forEach(t));
    for (var a = 0; a < el.length; a++) {
      var l = el[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < el.length && ((a = el[0]), a.blockedOn === null); )
      (_h(a), a.blockedOn === null && el.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (l = 0; l < a.length; l += 3) {
        var n = a[l],
          i = a[l + 1],
          f = n[ft] || null;
        if (typeof i == 'function') f || bh(a);
        else if (f) {
          var v = null;
          if (i && i.hasAttribute('formAction')) {
            if (((n = i), (f = i[ft] || null))) v = f.formAction;
            else if (Vo(n) !== null) continue;
          } else v = f.action;
          (typeof v == 'function' ? (a[l + 1] = v) : (a.splice(l, 3), (l -= 3)), bh(a));
        }
      }
  }
  function Sh() {
    function e(i) {
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
    function t() {
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
        navigation.addEventListener('navigate', e),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(a, 100),
        function () {
          ((l = !0),
            navigation.removeEventListener('navigate', e),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            n !== null && (n(), (n = null)));
        }
      );
    }
  }
  function Yo(e) {
    this._internalRoot = e;
  }
  ((cs.prototype.render = Yo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var a = t.current,
        l = zt();
      dh(a, l, e, t, null, null);
    }),
    (cs.prototype.unmount = Yo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (dh(e.current, 2, null, e, null, null), Gc(), (t[$l] = null));
        }
      }));
  function cs(e) {
    this._internalRoot = e;
  }
  cs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Cr();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < el.length && t !== 0 && t < el[a].priority; a++);
      (el.splice(a, 0, e), a === 0 && _h(e));
    }
  };
  var xh = s.version;
  if (xh !== '19.2.5') throw Error(o(527, xh, '19.2.5'));
  G.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return ((e = _(t)), (e = e !== null ? b(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var tg = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: O,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var ss = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ss.isDisabled && ss.supportsFiber)
      try {
        ((Bn = ss.inject(tg)), (bt = ss));
      } catch {}
  }
  return (
    (zi.createRoot = function (e, t) {
      if (!m(e)) throw Error(o(299));
      var a = !1,
        l = '',
        n = Md,
        i = Cd,
        f = wd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (i = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = rh(e, 1, !1, null, null, a, l, null, n, i, f, Sh)),
        (e[$l] = t.current),
        To(e),
        new Yo(t)
      );
    }),
    (zi.hydrateRoot = function (e, t, a) {
      if (!m(e)) throw Error(o(299));
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
        (t = rh(e, 1, !0, t, a ?? null, l, n, p, i, f, v, Sh)),
        (t.context = fh(null)),
        (a = t.current),
        (l = zt()),
        (l = Os(l)),
        (n = Ua(l)),
        (n.callback = null),
        Ga(a, n, l),
        (a = l),
        (t.current.lanes = a),
        qn(t, a),
        la(t),
        (e[$l] = t.current),
        To(e),
        new cs(t)
      );
    }),
    (zi.version = '19.2.5'),
    zi
  );
}
var Oh;
function hg() {
  if (Oh) return Zo.exports;
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
  return (c(), (Zo.exports = mg()), Zo.exports);
}
var vg = hg(),
  de = dr();
const us = ig(de),
  gg = '_content_11wqi_1',
  yg = { content: gg },
  _g = '_tabBar_rhd8d_2',
  pg = '_fullWidth_rhd8d_9',
  bg = '_tab_rhd8d_2',
  Sg = '_tabActive_rhd8d_54',
  xg = '_tabDisabled_rhd8d_101',
  jg = '_tabIcon_rhd8d_107',
  Tg = '_tabLabel_rhd8d_114',
  Ag = '_badge_rhd8d_119',
  Ng = '_badgeActive_rhd8d_137',
  Eg = '_indicator_rhd8d_158',
  Mt = {
    tabBar: _g,
    fullWidth: pg,
    tab: bg,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: Sg,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: xg,
    tabIcon: jg,
    tabLabel: Tg,
    badge: Ag,
    badgeActive: Ng,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Eg,
  },
  zg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Mg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Cg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  wg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Rg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Dg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Bg = { screw: Rg, bolt: Mg, alloy: zg, laser: Og, cannon: Cg, thunder: Dg, cutter: wg };
function Lg(c, s) {
  return c.replace(/\swidth="\d+"/, ` width="${s}"`).replace(/\sheight="\d+"/, ` height="${s}"`);
}
function Ee({ name: c, size: s = 16, color: u = 'currentColor', className: o }) {
  const m = Bg[c];
  if (m)
    return r.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: u, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: Lg(m, s) },
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
function _s({
  tabs: c,
  value: s,
  onChange: u,
  variant: o = 'underline',
  size: m = 'md',
  fullWidth: d = !1,
  align: h = 'start',
}) {
  const g = de.useRef(null),
    [y, _] = de.useState({ left: 0, width: 0 });
  return (
    de.useEffect(() => {
      const b = g.current;
      if (!b) return;
      const T = c.findIndex((H) => H.key === s);
      if (T < 0) return;
      const q = b.querySelectorAll('[role="tab"]')[T];
      if (!q) return;
      const E = b.getBoundingClientRect(),
        U = q.getBoundingClientRect();
      _({ left: U.left - E.left, width: U.width });
    }, [s, c]),
    r.jsxs('div', {
      ref: g,
      role: 'tablist',
      className: [
        Mt.tabBar,
        Mt[`variant-${o}`],
        Mt[`size-${m}`],
        Mt[`align-${h}`],
        d ? Mt.fullWidth : '',
      ]
        .filter(Boolean)
        .join(' '),
      children: [
        c.map((b) => {
          const T = b.key === s;
          return r.jsxs(
            'button',
            {
              type: 'button',
              role: 'tab',
              'aria-selected': T,
              disabled: b.disabled === !0,
              className: [Mt.tab, T ? Mt.tabActive : '', b.disabled === !0 ? Mt.tabDisabled : '']
                .filter(Boolean)
                .join(' '),
              onClick: () => {
                b.disabled !== !0 && u(b.key);
              },
              children: [
                b.iconName != null &&
                  r.jsx('span', {
                    className: Mt.tabIcon,
                    'aria-hidden': 'true',
                    children: r.jsx(Ee, { name: b.iconName, size: m === 'sm' ? 12 : 14 }),
                  }),
                r.jsx('span', { className: Mt.tabLabel, children: b.label }),
                b.badge != null &&
                  r.jsx('span', {
                    className: [Mt.badge, T ? Mt.badgeActive : ''].filter(Boolean).join(' '),
                    children: b.badge,
                  }),
              ],
            },
            b.key
          );
        }),
        o === 'underline' &&
          r.jsx('span', {
            className: Mt.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${y.left}px)`, width: y.width },
          }),
      ],
    })
  );
}
const qg = '_shell_gbfld_2',
  Hg = '_header_gbfld_15',
  Ug = '_main_gbfld_28',
  Gg = '_noScroll_gbfld_37',
  Vg = '_footer_gbfld_42',
  $g = '_battle_gbfld_55',
  En = { shell: qg, header: Hg, main: Ug, noScroll: Gg, footer: Vg, battle: $g };
function ql({ header: c, footer: s, children: u, noScroll: o = !1, variant: m = 'default' }) {
  return r.jsxs('div', {
    className: [En.shell, m === 'battle' ? En.battle : ''].filter(Boolean).join(' '),
    children: [
      c != null && r.jsx('header', { className: En.header, children: c }),
      r.jsx('main', {
        className: [En.main, o ? En.noScroll : ''].filter(Boolean).join(' '),
        children: u,
      }),
      s != null && r.jsx('footer', { className: En.footer, children: s }),
    ],
  });
}
const Yg = '_nav_4erx0_2',
  kg = '_tab_4erx0_10',
  Zg = '_active_4erx0_33',
  Xg = '_iconWrap_4erx0_38',
  Qg = '_badge_4erx0_51',
  Mi = { nav: Yg, tab: kg, active: Zg, iconWrap: Xg, badge: Qg },
  Kg = '_text_1wy1n_1',
  Jg = '_variant_heading_1_1wy1n_6',
  Wg = '_variant_heading_2_1wy1n_15',
  Fg = '_variant_heading_3_1wy1n_24',
  Ig = '_variant_body_1wy1n_33',
  Pg = '_variant_caption_1wy1n_41',
  ey = '_variant_label_1wy1n_49',
  ty = '_variant_numeric_l_1wy1n_58',
  ay = '_variant_numeric_m_1wy1n_67',
  ly = '_variant_numeric_s_1wy1n_76',
  ny = '_color_default_1wy1n_85',
  iy = '_color_mid_1wy1n_89',
  cy = '_color_dim_1wy1n_93',
  sy = '_color_disabled_1wy1n_97',
  uy = '_color_primary_1wy1n_101',
  oy = '_color_secondary_1wy1n_105',
  ry = '_color_danger_1wy1n_109',
  fy = '_color_success_1wy1n_113',
  dy = '_color_warning_1wy1n_117',
  my = '_truncate_1wy1n_121',
  hy = '_align_left_1wy1n_128',
  vy = '_align_center_1wy1n_132',
  gy = '_align_right_1wy1n_136',
  Ci = {
    text: Kg,
    variant_heading_1: Jg,
    variant_heading_2: Wg,
    variant_heading_3: Fg,
    variant_body: Ig,
    variant_caption: Pg,
    variant_label: ey,
    variant_numeric_l: ty,
    variant_numeric_m: ay,
    variant_numeric_s: ly,
    color_default: ny,
    color_mid: iy,
    color_dim: cy,
    color_disabled: sy,
    color_primary: uy,
    color_secondary: oy,
    color_danger: ry,
    color_success: fy,
    color_warning: dy,
    truncate: my,
    align_left: hy,
    align_center: vy,
    align_right: gy,
  };
function yy(c) {
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
function V({
  variant: c = 'body',
  children: s,
  as: u,
  color: o = 'default',
  className: m,
  truncate: d,
  align: h,
  style: g,
}) {
  const y = u ?? yy(c),
    _ = c.replace(/-/g, '_'),
    b = o === 'text' ? 'default' : o;
  return r.jsx(y, {
    className: [
      Ci.text,
      Ci[`variant_${_}`],
      Ci[`color_${b}`],
      d ? Ci.truncate : '',
      h ? Ci[`align_${h}`] : '',
      m,
    ]
      .filter(Boolean)
      .join(' '),
    style: g,
    children: s,
  });
}
const _y = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function Vi({ active: c, onChange: s, badges: u }) {
  return r.jsx('nav', {
    className: Mi.nav,
    'aria-label': 'メインナビゲーション',
    children: _y.map(({ key: o, label: m, iconName: d }) => {
      const h = o === c,
        g = u == null ? void 0 : u[o];
      return r.jsxs(
        'button',
        {
          type: 'button',
          className: [Mi.tab, h ? Mi.active : ''].filter(Boolean).join(' '),
          onClick: () => s(o),
          'aria-current': h ? 'page' : void 0,
          'aria-label': m,
          children: [
            r.jsxs('span', {
              className: Mi.iconWrap,
              children: [
                r.jsx(Ee, {
                  name: d,
                  size: 22,
                  color: h ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                g != null &&
                  r.jsx('span', { className: Mi.badge, 'aria-hidden': 'true', children: g }),
              ],
            }),
            r.jsx(V, { variant: 'caption', color: h ? 'primary' : 'dim', children: m }),
          ],
        },
        o
      );
    }),
  });
}
const py = '_root_kv5uk_2',
  by = '_titleRow_kv5uk_8',
  Sy = '_left_kv5uk_17',
  xy = '_center_kv5uk_24',
  jy = '_right_kv5uk_33',
  Ty = '_currencies_kv5uk_42',
  Ay = '_actions_kv5uk_49',
  Ny = '_tabBarSlot_kv5uk_56',
  al = {
    root: py,
    titleRow: by,
    left: Sy,
    center: xy,
    right: jy,
    currencies: Ty,
    actions: Ay,
    tabBarSlot: Ny,
  },
  Ey = '_root_i843c_2',
  zy = '_icon_i843c_10',
  My = '_delta_i843c_30',
  Cy = '_deltaSm_i843c_37',
  wy = '_deltaMd_i843c_41',
  Oy = '_deltaLg_i843c_45',
  Ry = '_subtle_i843c_50',
  Dy = '_currencyLabel_i843c_55',
  By = '_rankStamp_i843c_64',
  ia = {
    root: Ey,
    icon: zy,
    delta: My,
    deltaSm: Cy,
    deltaMd: wy,
    deltaLg: Oy,
    subtle: Ry,
    currencyLabel: Dy,
    rankStamp: By,
  },
  Ly = '_root_1wxcz_1',
  qy = '_sizeSm_1wxcz_13',
  Hy = '_sizeMd_1wxcz_17',
  Uy = '_sizeLg_1wxcz_21',
  Gy = '_sizeXl_1wxcz_25',
  Vy = '_affix_1wxcz_29',
  Ml = { root: Ly, sizeSm: qy, sizeMd: Hy, sizeLg: Uy, sizeXl: Gy, affix: Vy };
function nr(c) {
  let s = c.length;
  for (; s > 0 && c[s - 1] === 0; ) s--;
  return c.slice(0, s);
}
function wi(c) {
  let s = 0;
  for (let u = 0; u < c.length; u++) {
    const o = Math.floor(c[u] + s);
    ((c[u] = o % 1e3), (s = Math.floor(o / 1e3)));
  }
  for (; s > 0; ) (c.push(s % 1e3), (s = Math.floor(s / 1e3)));
  return nr(c);
}
function $y(c, s) {
  for (; s !== 0; ) {
    const u = s;
    ((s = c % s), (c = u));
  }
  return c;
}
function Yy(c) {
  const s = c.toString(),
    u = s.indexOf('.');
  if (u === -1) return { num: Math.round(c), den: 1 };
  const o = s.length - u - 1,
    m = Math.pow(10, o),
    d = Math.round(c * m),
    h = $y(Math.abs(d), m);
  return { num: d / h, den: m / h };
}
function ky(c) {
  let s = '',
    u = c;
  for (; u > 0; )
    ((u -= 1), (s = String.fromCharCode(65 + (u % 26)) + s), (u = Math.floor(u / 26)));
  return s;
}
const st = class st {
  constructor(s) {
    Kt(this, 'digits');
    this.digits = s;
  }
  static fromNumber(s) {
    if (s <= 0) return st.ZERO;
    const u = [];
    let o = Math.floor(s);
    for (; o > 0; ) (u.push(o % 1e3), (o = Math.floor(o / 1e3)));
    return new st(nr(u));
  }
  static fromString(s) {
    const u = s.trim();
    if (u === '' || u === '0') return st.ZERO;
    const o = [];
    let m = u.length;
    for (; m > 0; ) {
      const d = Math.max(0, m - 3);
      (o.push(parseInt(u.slice(d, m), 10)), (m = d));
    }
    return new st(nr(o));
  }
  static fromJSON(s) {
    return new st(wi([...s]));
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
    return (h > 0 && d.push(h), new st(wi(d)));
  }
  sub(s) {
    if (this.compare(s) <= 0) return st.ZERO;
    const u = this.digits,
      o = s.digits,
      m = new Array(u.length).fill(0);
    let d = 0;
    for (let h = 0; h < u.length; h++) {
      let g = (u[h] ?? 0) - (o[h] ?? 0) - d;
      (g < 0 ? ((g += 1e3), (d = 1)) : (d = 0), (m[h] = g));
    }
    return new st(wi(m));
  }
  mulInt(s) {
    if (s <= 0 || this.isZero()) return st.ZERO;
    const u = this.digits,
      o = new Array(u.length).fill(0);
    let m = 0;
    for (let d = 0; d < u.length; d++) {
      const h = u[d] * s + m;
      ((o[d] = h % 1e3), (m = Math.floor(h / 1e3)));
    }
    for (; m > 0; ) (o.push(m % 1e3), (m = Math.floor(m / 1e3)));
    return new st(wi(o));
  }
  divInt(s) {
    if (s <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return st.ZERO;
    const u = this.digits,
      o = new Array(u.length).fill(0);
    let m = 0;
    for (let d = u.length - 1; d >= 0; d--) {
      const h = m * 1e3 + (u[d] ?? 0);
      ((o[d] = Math.floor(h / s)), (m = h % s));
    }
    return (m > 0 && (o[0] += 1), new st(wi(o)));
  }
  mulRational(s, u) {
    return this.mulInt(s).divInt(u);
  }
  mulNumber(s) {
    const { num: u, den: o } = Yy(s);
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
      m = ky(o),
      d = this.digits[s - 2] ?? 0,
      h = Math.floor(d / 10);
    return `${u}.${String(h).padStart(2, '0')}${m}`;
  }
};
Kt(st, 'ZERO', new st([]));
let Ae = st;
function Zy(c) {
  if (c === '') return 0;
  let s = 0;
  for (let u = 0; u < c.length; u++) s = s * 26 + (c.charCodeAt(u) - 65 + 1);
  return s;
}
function Xy(c) {
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
function Qy(c) {
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
function Ky(c) {
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
function Ll({
  value: c,
  size: s = 'md',
  accentColor: u = 'scale',
  glow: o = !1,
  prefix: m,
  suffix: d,
  decimals: h,
  style: g,
}) {
  const y = typeof c == 'number' ? Ae.fromNumber(c) : c;
  let _;
  h != null && typeof c == 'number' ? (_ = c.toFixed(h)) : (_ = y.toDisplay());
  const b = _.match(/^[\d.]+([A-Z]*)$/),
    T = b ? b[1] : '',
    z = Zy(T);
  let q, E;
  if (u === 'scale') {
    const le = Xy(z);
    ((q = le.color), (E = o ? le.glow : void 0));
  } else ((q = Qy(u)), (E = o ? Ky(u) : void 0));
  const U = { sm: Ml.sizeSm, md: Ml.sizeMd, lg: Ml.sizeLg, xl: Ml.sizeXl }[s],
    H = { color: q, ...(E != null ? { textShadow: E } : {}), ...g };
  return r.jsxs('span', {
    className: `${Ml.root} ${U}`,
    style: H,
    children: [
      m != null && r.jsx('span', { className: Ml.affix, children: m }),
      _,
      d != null && r.jsx('span', { className: Ml.affix, children: d }),
    ],
  });
}
const Jy = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  Wy = { sm: 12, md: 16, lg: 22, xl: 28 };
function Fy({ delta: c, sizeClass: s }) {
  const u = c === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return r.jsx('span', {
    className: `${ia.delta} ${s}`,
    style: { color: u },
    'aria-hidden': 'true',
    children: c,
  });
}
function Ui({
  currency: c,
  value: s,
  size: u = 'md',
  delta: o,
  showLabel: m,
  subtle: d,
  align: h = 'start',
  ranked: g,
}) {
  const y = typeof s == 'number' ? Ae.fromNumber(s) : s,
    _ = Jy[c],
    b = d ? 'var(--c-text-disabled)' : `var(${_.cssVar})`,
    T = o && !d ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: b },
    z = { sm: ia.deltaSm, md: ia.deltaMd, lg: ia.deltaLg, xl: ia.deltaLg }[u],
    q = r.jsx(Ee, { name: c, size: Wy[u], color: b, className: ia.icon }),
    E = r.jsxs(r.Fragment, {
      children: [
        o !== void 0 && !d && r.jsx(Fy, { delta: o, sizeClass: z }),
        r.jsx(Ll, { value: y, size: u, accentColor: 'primary', style: T }),
      ],
    });
  return r.jsxs('span', {
    className: [ia.root, d ? ia.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${_.label} ${y.toDisplay()}`,
    children: [
      h === 'end'
        ? r.jsxs(r.Fragment, { children: [E, q] })
        : r.jsxs(r.Fragment, { children: [q, E] }),
      m && r.jsx('span', { className: ia.currencyLabel, 'aria-hidden': 'true', children: _.label }),
      g !== void 0 &&
        g !== '' &&
        r.jsx('span', {
          className: ia.rankStamp,
          'data-rank': g,
          'aria-label': `rank ${g}`,
          children: g,
        }),
    ],
  });
}
const Iy = '_iconButton_1fyi8_1',
  Py = '_round_1fyi8_23',
  e_ = '_active_1fyi8_85',
  t_ = '_iconWrap_1fyi8_113',
  zn = {
    iconButton: Iy,
    round: Py,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: e_,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: t_,
  },
  a_ = { sm: 14, md: 18, lg: 22 };
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
  const y = o === 'default' ? 'ghost' : o,
    _ = typeof c == 'string' ? r.jsx(Ee, { name: c, size: a_[u] }) : c;
  return r.jsx('button', {
    type: 'button',
    className: [
      zn.iconButton,
      zn[`variant-${y}`],
      zn[`size-${u}`],
      m === 'round' ? zn.round : '',
      d ? zn.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: g,
    'aria-label': s,
    'aria-pressed': d,
    'aria-disabled': h,
    children: r.jsx('span', { className: zn.iconWrap, 'aria-hidden': 'true', children: _ }),
  });
}
const Rh = (c) => {
    let s;
    const u = new Set(),
      o = (_, b) => {
        const T = typeof _ == 'function' ? _(s) : _;
        if (!Object.is(T, s)) {
          const z = s;
          ((s = (b ?? (typeof T != 'object' || T === null)) ? T : Object.assign({}, s, T)),
            u.forEach((q) => q(s, z)));
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
  l_ = (c) => (c ? Rh(c) : Rh),
  n_ = (c) => c;
function i_(c, s = n_) {
  const u = us.useSyncExternalStore(
    c.subscribe,
    us.useCallback(() => s(c.getState()), [c, s]),
    us.useCallback(() => s(c.getInitialState()), [c, s])
  );
  return (us.useDebugValue(u), u);
}
const c_ = (c) => {
    const s = l_(c),
      u = (o) => i_(s, o);
    return (Object.assign(u, s), u);
  },
  s_ = (c) => c_,
  Dh = {
    isRunActive: !1,
    screw: Ae.ZERO,
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
  u_ = (c, s) => ({
    ...Dh,
    startRun: ({ initialWeapon: u, machineMaxHp: o, gameSpeed: m }) =>
      c({
        isRunActive: !0,
        screw: Ae.ZERO,
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
    endRun: () => c(Dh),
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
  o_ = { bolt: Ae.ZERO, alloy: Ae.ZERO },
  r_ = (c, s) => ({
    ...o_,
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
    resetCurrencies: () => c({ bolt: Ae.ZERO, alloy: Ae.ZERO }),
  }),
  ps = 6,
  f_ = { equippedPatches: new Map() },
  d_ = (c, s) => ({
    ...f_,
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
  v0 = 'tower-like-game',
  gs = 1,
  Q = {
    profile: 'profile',
    currencies: 'currencies',
    machine: 'machine',
    weapons: 'weapons',
    patches: 'patches',
    equippedPatches: 'equippedPatches',
    settings: 'settings',
  },
  g0 = [
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
  m_ = {
    id: 'singleton',
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    schemaVersion: gs,
  },
  h_ = { id: 'singleton', bolt: [], alloy: [] },
  v_ = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  g_ = {
    id: 'singleton',
    defaultGameSpeed: 1,
    bgmVolume: 0.8,
    seVolume: 0.8,
    vibrationEnabled: !0,
  };
function y0() {
  return Object.fromEntries(g0.map((c) => [c, 0]));
}
const y_ = { machineLevels: y0() },
  __ = (c) => ({
    ...y_,
    incrementMachineLv: (s) =>
      c((u) => ({ machineLevels: { ...u.machineLevels, [s]: u.machineLevels[s] + 1 } })),
    setMachineLv: (s, u) => c((o) => ({ machineLevels: { ...o.machineLevels, [s]: u } })),
    resetMachine: () => c({ machineLevels: y0() }),
  });
function Bh(c, s) {
  return `${c}#${s}`;
}
const p_ = { patches: new Map() },
  b_ = (c, s) => ({
    ...p_,
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
  S_ = (c) => ({
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
  qh = { defaultGameSpeed: 1, bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  x_ = (c) => ({
    ...qh,
    setDefaultGameSpeed: (s) => c({ defaultGameSpeed: s }),
    setBgmVolume: (s) => c({ bgmVolume: Math.max(0, Math.min(1, s)) }),
    setSeVolume: (s) => c({ seVolume: Math.max(0, Math.min(1, s)) }),
    setVibrationEnabled: (s) => c({ vibrationEnabled: s }),
    resetSettings: () => c(qh),
  }),
  Hh = { weaponLv: 0, initialWeapon: 'laser' },
  j_ = (c) => ({
    ...Hh,
    incrementWeaponLv: () => c((s) => ({ weaponLv: s.weaponLv + 1 })),
    setWeaponLv: (s) => c({ weaponLv: s }),
    setInitialWeapon: (s) => c({ initialWeapon: s }),
    resetWeapons: () => c(Hh),
  }),
  X = s_()((...c) => ({
    ...S_(...c),
    ...r_(...c),
    ...__(...c),
    ...j_(...c),
    ...b_(...c),
    ...d_(...c),
    ...x_(...c),
    ...u_(...c),
  }));
function $i({ title: c, subtitle: s, onBack: u, currencies: o, tabBar: m, actions: d }) {
  const h = X((z) => z.bolt),
    g = X((z) => z.alloy),
    y = X((z) => z.screw),
    _ = X((z) => z.isRunActive),
    b = (o ?? []).filter((z) => (z === 'screw' ? _ : !0));
  function T(z) {
    switch (z) {
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
              r.jsx(V, { variant: 'heading-3', truncate: !0, align: 'center', children: c }),
              s != null &&
                r.jsx(V, { variant: 'caption', color: 'dim', align: 'center', children: s }),
            ],
          }),
          r.jsxs('div', {
            className: al.right,
            children: [
              b.length > 0 &&
                r.jsx('div', {
                  className: al.currencies,
                  children: b.map((z) => r.jsx(Ui, { currency: z, value: T(z), size: 'sm' }, z)),
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
const T_ = '_tab_1nc83_3',
  A_ = { tab: T_ },
  N_ = '_wrapper_t3bnr_3',
  E_ = '_active_t3bnr_12',
  z_ = '_card_t3bnr_12',
  M_ = '_locked_t3bnr_18',
  C_ = '_tall_t3bnr_34',
  w_ = '_iconTile_t3bnr_37',
  O_ = '_headerText_t3bnr_42',
  R_ = '_description_t3bnr_45',
  D_ = '_name_t3bnr_48',
  B_ = '_wide_t3bnr_53',
  L_ = '_body_t3bnr_61',
  q_ = '_header_t3bnr_42',
  H_ = '_statGrid_t3bnr_121',
  U_ = '_statChip_t3bnr_129',
  G_ = '_statLabel_t3bnr_140',
  V_ = '_statValue_t3bnr_147',
  $_ = '_lockedBadge_t3bnr_158',
  at = {
    wrapper: N_,
    active: E_,
    card: z_,
    locked: M_,
    tall: C_,
    iconTile: w_,
    headerText: O_,
    description: R_,
    name: D_,
    wide: B_,
    body: L_,
    header: q_,
    statGrid: H_,
    statChip: U_,
    statLabel: G_,
    statValue: V_,
    lockedBadge: $_,
  },
  Y_ = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function _0({
  weapon: c,
  name: s,
  description: u,
  stats: o,
  layout: m = 'tall',
  active: d = !1,
  locked: h = !1,
  onClick: g,
}) {
  const y = m === 'wide',
    _ = g != null && !h;
  return r.jsx('div', {
    className: [at.wrapper, d ? at.active : '', h ? at.locked : '', y ? at.wide : at.tall]
      .filter(Boolean)
      .join(' '),
    onClick: _ ? g : void 0,
    role: _ ? 'button' : void 0,
    tabIndex: _ ? 0 : void 0,
    onKeyDown: _
      ? (b) => {
          (b.key === 'Enter' || b.key === ' ') && (b.preventDefault(), g());
        }
      : void 0,
    'aria-pressed': g != null ? d : void 0,
    children: r.jsxs('div', {
      className: at.card,
      style: _ ? { cursor: 'pointer' } : void 0,
      children: [
        r.jsx('div', {
          className: at.iconTile,
          'aria-hidden': !0,
          children: r.jsx(Ee, { name: c, size: y ? 40 : 52 }),
        }),
        r.jsxs('div', {
          className: at.body,
          children: [
            r.jsx('div', {
              className: at.header,
              children: r.jsxs('div', {
                className: at.headerText,
                children: [
                  r.jsx('span', { className: at.name, children: s }),
                  u != null &&
                    u.length > 0 &&
                    r.jsx('span', { className: at.description, children: u }),
                ],
              }),
            }),
            !h &&
              o.length > 0 &&
              r.jsx('div', {
                className: at.statGrid,
                children: o.map((b) => {
                  const T =
                    b.suffix != null
                      ? `${typeof b.value == 'number' ? b.value.toLocaleString() : b.value}${b.suffix}`
                      : typeof b.value == 'number'
                        ? b.value.toLocaleString()
                        : b.value;
                  return r.jsxs(
                    'div',
                    {
                      className: at.statChip,
                      children: [
                        r.jsx('span', { className: at.statLabel, children: b.label }),
                        r.jsx('span', {
                          className: at.statValue,
                          style: b.accent != null ? { color: Y_[b.accent] } : void 0,
                          children: T,
                        }),
                      ],
                    },
                    b.label
                  );
                }),
              }),
            h &&
              r.jsxs('div', {
                className: at.lockedBadge,
                children: [
                  r.jsx(Ee, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
                  r.jsx(V, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
function bs(c) {
  return Math.pow(1.02, c);
}
function Ss(c, s) {
  return Math.min(10, c * (1 + 0.03 * s));
}
const xs = { laser: 120, cannon: 480, thunder: 84, cutter: 62 },
  js = { laser: 1, cannon: 0.5, thunder: 0.7, cutter: 2 },
  mr = { laser: 580, thunder: 420, cannon: 520 };
function k_(c) {
  const s = Math.round(xs.laser * bs(c)),
    u = Math.floor(1 + 0.1 * c),
    o = Math.round(Ss(js.laser, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '貫通', value: u },
    { label: '射程', value: mr.laser, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Z_(c) {
  const s = Math.round(xs.cannon * bs(c)),
    u = Math.round((30 + 0.5 * c) * 10) / 10,
    o = Math.round(Ss(js.cannon, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '半径', value: u, suffix: 'm' },
    { label: '射程', value: mr.cannon, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function X_(c) {
  const s = Math.round(xs.thunder * bs(c)),
    u = Math.floor(7 + 0.1 * c),
    o = Math.round(Ss(js.thunder, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '連鎖', value: u },
    { label: '射程', value: mr.thunder, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Q_(c) {
  const s = Math.round(xs.cutter * bs(c)),
    u = Math.round((80 + 0.5 * c) * 10) / 10,
    o = Math.floor(1 + 0.05 * c),
    m = Math.round(Ss(js.cutter, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '旋回', value: u, suffix: 'm' },
    { label: '同時', value: o },
    { label: '連射', value: m, suffix: '/s' },
  ];
}
const K_ = [
  { kind: 'laser', name: 'LASER', description: '高速直進ビーム。', buildStats: k_ },
  { kind: 'cannon', name: 'CANNON', description: '範囲爆発。', buildStats: Z_ },
  { kind: 'thunder', name: 'THUNDER', description: '連鎖電撃。', buildStats: X_ },
  { kind: 'cutter', name: 'CUTTER', description: '旋回斬撃。', buildStats: Q_ },
];
function J_() {
  const c = X((s) => s.weaponLv);
  return r.jsx('div', {
    className: A_.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: K_.map((s) =>
      r.jsx(
        _0,
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
const W_ = '_tab_lutms_3',
  F_ = '_topRow_lutms_9',
  I_ = '_description_lutms_15',
  P_ = '_previewCard_lutms_21',
  ep = '_previewLabel_lutms_25',
  tp = '_impactGrid_lutms_32',
  ap = '_impactRow_lutms_37',
  lp = '_impactRowBordered_lutms_45',
  np = '_impactLabel_lutms_49',
  ip = '_impactValues_lutms_55',
  cp = '_arrow_lutms_62',
  Jt = {
    tab: W_,
    topRow: F_,
    description: I_,
    previewCard: P_,
    previewLabel: ep,
    impactGrid: tp,
    impactRow: ap,
    impactRowBordered: lp,
    impactLabel: np,
    impactValues: ip,
    arrow: cp,
  },
  sp = '_card_1403j_1',
  up = '_interactive_1403j_97',
  Oi = {
    card: sp,
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
    interactive: up,
  };
function Hl({
  children: c,
  variant: s = 'default',
  interactive: u = !1,
  padding: o = 'md',
  radius: m,
  className: d,
}) {
  const h = [
    Oi.card,
    Oi[`variant-${s}`],
    Oi[`padding-${o}`],
    m != null ? Oi[`radius-${m}`] : '',
    u ? Oi.interactive : '',
    d ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return r.jsx('div', { className: h, children: c });
}
const op = '_root_fjicv_2',
  rp = '_header_fjicv_15',
  fp = '_iconWrap_fjicv_22',
  dp = '_title_fjicv_34',
  mp = '_lvBadge_fjicv_47',
  hp = '_description_fjicv_60',
  vp = '_valueRow_fjicv_66',
  gp = '_valueBefore_fjicv_74',
  yp = '_valueAfter_fjicv_83',
  _p = '_arrow_fjicv_93',
  pp = '_buttons_fjicv_100',
  bp = '_btnCol_fjicv_105',
  Sp = '_btn_fjicv_105',
  xp = '_btnPrimary_fjicv_132',
  jp = '_btnSecondary_fjicv_139',
  Tp = '_btnWarning_fjicv_146',
  Ap = '_costRow_fjicv_172',
  Np = '_costNum_fjicv_181',
  Ep = '_costDisabled_fjicv_190',
  $e = {
    root: op,
    header: rp,
    iconWrap: fp,
    title: dp,
    lvBadge: mp,
    description: hp,
    valueRow: vp,
    valueBefore: gp,
    valueAfter: yp,
    arrow: _p,
    buttons: pp,
    btnCol: bp,
    btn: Sp,
    btnPrimary: xp,
    btnSecondary: jp,
    btnWarning: Tp,
    costRow: Ap,
    costNum: Np,
    costDisabled: Ep,
  },
  zp = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  Mp = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  Cp = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  wp = { primary: $e.btnPrimary, secondary: $e.btnSecondary, warning: $e.btnWarning },
  Op = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function Wo(c) {
  return c instanceof Ae ? c.toDisplay() : c.toLocaleString();
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
  maxed: T = !1,
  onUpgrade: z,
}) {
  const q = _ ?? Cp[y],
    E = zp[q],
    U = o ?? E,
    H = wp[q],
    le = Op[q];
  return r.jsxs('div', {
    className: $e.root,
    role: 'group',
    'aria-label': c,
    'data-maxed': T,
    children: [
      r.jsxs('div', {
        className: $e.header,
        children: [
          u != null &&
            r.jsx('span', {
              className: $e.iconWrap,
              children: r.jsx(Ee, { name: u, size: 14, color: U }),
            }),
          r.jsx('span', { className: $e.title, children: c }),
          m != null &&
            !T &&
            r.jsx('span', {
              className: $e.lvBadge,
              style: { color: E, boxShadow: Mp[q] },
              children: m,
            }),
          T &&
            r.jsx('span', {
              className: $e.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      s != null &&
        s.length > 0 &&
        r.jsx(V, { variant: 'caption', color: 'dim', className: $e.description, children: s }),
      d != null &&
        r.jsxs('div', {
          className: $e.valueRow,
          children: [
            r.jsxs('span', { className: $e.valueBefore, children: [Wo(d), g] }),
            h != null &&
              !T &&
              r.jsxs(r.Fragment, {
                children: [
                  r.jsx('span', { className: $e.arrow, children: '→' }),
                  r.jsxs('span', {
                    className: $e.valueAfter,
                    style: { color: E, textShadow: `0 0 5px ${le}` },
                    children: [Wo(h), g],
                  }),
                ],
              }),
          ],
        }),
      !T &&
        b.length > 0 &&
        r.jsx('div', {
          className: $e.buttons,
          style: { gridTemplateColumns: `repeat(${b.length}, 1fr)` },
          children: b.map((J) => {
            const ye = J.disabled === !0;
            return r.jsxs(
              'div',
              {
                className: $e.btnCol,
                children: [
                  r.jsx('button', {
                    type: 'button',
                    className: `${$e.btn} ${H}`,
                    disabled: ye,
                    onClick: ye ? void 0 : () => (z == null ? void 0 : z(J.amount)),
                    children: J.amount,
                  }),
                  r.jsx('div', {
                    className: $e.costRow,
                    children: r.jsx('span', {
                      className: `${$e.costNum} ${ye ? $e.costDisabled : ''}`,
                      children: Wo(J.cost),
                    }),
                  }),
                ],
              },
              J.amount
            );
          }),
        }),
    ],
  });
}
function vr(c) {
  const s = Math.ceil(200 * Math.pow(1.12, c));
  return Ae.fromNumber(s);
}
function Uh(c, s) {
  let u = Ae.ZERO;
  for (let o = 0; o < s; o++) u = u.add(vr(c + o));
  return u;
}
function Rp(c, s) {
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
function Dp(c) {
  const s = c + 1,
    u = Gh(c),
    o = Gh(s);
  return [
    { label: 'LASER DMG', before: Math.round(Vh.laser * u), after: Math.round(Vh.laser * o) },
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
function Bp() {
  const c = X((E) => E.weaponLv),
    s = X((E) => E.alloy),
    u = X((E) => E.incrementWeaponLv),
    o = X((E) => E.setWeaponLv),
    m = X((E) => E.spendAlloy),
    d = vr(c),
    h = Uh(c, 5),
    g = Rp(c, s),
    y = Uh(c, g),
    _ = !s.lt(d),
    b = g >= 5,
    T = g >= 1,
    z = Dp(c);
  function q(E) {
    E === '+1'
      ? m(d) && u()
      : E === '+5'
        ? m(h) && o(c + 5)
        : E === 'MAX' && g > 0 && m(y) && o(c + g);
  }
  return r.jsxs('div', {
    className: Jt.tab,
    role: 'tabpanel',
    'aria-label': '武器強化',
    children: [
      r.jsxs('div', {
        className: Jt.topRow,
        children: [
          r.jsx(V, {
            variant: 'caption',
            color: 'mid',
            className: Jt.description,
            children: '全 4 武器に共通で効く強化です。',
          }),
          r.jsx(Ui, { currency: 'alloy', value: s, size: 'sm' }),
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
          { amount: 'MAX', cost: y, disabled: !T },
        ],
        onUpgrade: q,
      }),
      r.jsxs(Hl, {
        variant: 'sunken',
        padding: 'md',
        className: Jt.previewCard,
        children: [
          r.jsx(V, {
            variant: 'label',
            color: 'dim',
            className: Jt.previewLabel,
            children: '次 Lv での効果プレビュー',
          }),
          r.jsx('div', {
            className: Jt.impactGrid,
            children: z.map((E, U) =>
              r.jsxs(
                'div',
                {
                  className: [Jt.impactRow, U > 0 ? Jt.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    r.jsx(V, {
                      variant: 'caption',
                      color: 'mid',
                      className: Jt.impactLabel,
                      children: E.label,
                    }),
                    r.jsxs('span', {
                      className: Jt.impactValues,
                      children: [
                        r.jsx(Ll, {
                          value: E.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: E.suffix,
                          decimals: E.suffix === 'm' ? 1 : 0,
                        }),
                        r.jsx('span', { className: Jt.arrow, children: '→' }),
                        r.jsx(Ll, {
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
const p0 = de.createContext(null);
function Lp({ children: c, initialScreen: s }) {
  const [u, o] = de.useState(s ?? 'title'),
    m = de.useCallback((d) => {
      o(d);
    }, []);
  return r.jsx(p0.Provider, { value: { screen: u, navigate: m }, children: c });
}
function Ma() {
  const c = de.useContext(p0);
  if (!c) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return c;
}
const qp = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function Hp(c = {}) {
  const { initialTab: s = 'details' } = c,
    [u, o] = de.useState(s),
    { screen: m, navigate: d } = Ma();
  return r.jsx(ql, {
    header: r.jsx($i, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => d('preparation'),
      tabBar: r.jsx(_s, { tabs: qp, value: u, onChange: o, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(Vi, { active: m, onChange: (h) => d(h) }),
    children: r.jsxs('div', {
      className: yg.content,
      children: [u === 'details' && r.jsx(J_, {}), u === 'upgrade' && r.jsx(Bp, {})],
    }),
  });
}
const Up = '_root_15ig1_1',
  Gp = '_overlayLayer_15ig1_10',
  $h = { root: Up, overlayLayer: Gp },
  Vp = '_root_1eqza_3',
  $p = '_rangeCircle_1eqza_15',
  Yp = '_innerRing_1eqza_27',
  kp = '_machine_1eqza_38',
  Zp = '_machineRingOuter_1eqza_51',
  Xp = '_machineRingInner_1eqza_60',
  Qp = '_pin_1eqza_69',
  Kp = '_enemy_1eqza_79',
  Jp = '_enemyUpper_1eqza_90',
  Wp = '_enemyHpBar_1eqza_93',
  na = {
    root: Vp,
    rangeCircle: $p,
    innerRing: Yp,
    machine: kp,
    machineRingOuter: Zp,
    machineRingInner: Xp,
    pin: Qp,
    enemy: Kp,
    enemyUpper: Jp,
    enemyHpBar: Wp,
  },
  Fp = '_root_14p1r_1',
  Ip = { root: Fp };
function Pp({ value: c, x: s, y: u, crit: o = !1, duration: m = 800, onDone: d }) {
  const h = de.useId().replace(/:/g, 'dp'),
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
        className: `${h} ${Ip.root}`,
        onAnimationEnd: d,
        children: r.jsx(Ll, {
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
const e2 = '_wrap_14rhu_1',
  t2 = { wrap: e2 },
  Yh = 8;
function a2({ x: c, y: s, color: u = 'var(--c-text-mid)', duration: o = 480, onDone: m }) {
  const d = de.useId().replace(/:/g, 'ed'),
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
        className: `${d}-wrap ${t2.wrap}`,
        style: { left: `${c}%`, top: `${s}%` },
        onAnimationEnd: m,
        children: [r.jsx('div', { className: `${d}-flash` }), y],
      }),
    ],
  });
}
const l2 = '_wrap_14rhu_1',
  n2 = { wrap: l2 };
function i2({ x: c, y: s, color: u = 'var(--c-primary-hi)', duration: o = 220, onDone: m }) {
  const d = de.useId().replace(/:/g, 'eh'),
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
        className: `${d}-w ${n2.wrap}`,
        style: { left: `${c}%`, top: `${s}%` },
        onAnimationEnd: m,
        children: r.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const c2 = '_root_2lc0r_2',
  s2 = '_boss_2lc0r_12',
  u2 = '_elite_2lc0r_16',
  o2 = '_sizeSm_2lc0r_21',
  r2 = '_sizeMd_2lc0r_25',
  f2 = '_sizeLg_2lc0r_29',
  d2 = '_header_2lc0r_35',
  m2 = '_headerRight_2lc0r_42',
  h2 = '_hpText_2lc0r_50',
  za = {
    root: c2,
    boss: s2,
    elite: u2,
    sizeSm: o2,
    sizeMd: r2,
    sizeLg: f2,
    header: d2,
    headerRight: m2,
    hpText: h2,
  },
  v2 = '_badge_4fy54_1',
  g2 = '_glow_4fy54_90',
  y2 = '_iconLeft_4fy54_118',
  Ri = {
    badge: v2,
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
    glow: g2,
    iconLeft: y2,
  };
function Ts({
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
      className: [Ri.badge, Ri[`variant-${g}`], Ri[`size-${o}`], m ? Ri.glow : '']
        .filter(Boolean)
        .join(' '),
      style: h,
      children: [
        d != null && r.jsx('span', { className: Ri.iconLeft, 'aria-hidden': 'true', children: d }),
        y,
      ],
    })
  );
}
const _2 = '_root_1pi3d_2',
  p2 = '_sizeSm_1pi3d_11',
  b2 = '_sizeMd_1pi3d_15',
  S2 = '_sizeLg_1pi3d_19',
  x2 = '_fill_1pi3d_23',
  j2 = '_label_1pi3d_29',
  T2 = '_withTrailing_1pi3d_46',
  A2 = '_trailingLabel_1pi3d_56',
  ll = {
    root: _2,
    sizeSm: p2,
    sizeMd: b2,
    sizeLg: S2,
    fill: x2,
    label: j2,
    withTrailing: T2,
    trailingLabel: A2,
  },
  N2 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  E2 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function b0({
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
    T = Math.min(Math.max(0, c), b),
    z = (T / b) * 100,
    q = N2[u],
    E = y || m === 'neon' ? E2[u] : void 0,
    U = { sm: ll.sizeSm, md: ll.sizeMd, lg: ll.sizeLg }[o],
    H = {
      width: `${z}%`,
      backgroundColor: q,
      ...(E != null ? { boxShadow: E } : {}),
      ...(_ ? { marginLeft: 'auto' } : {}),
    },
    le = h ?? `${T} / ${b}`,
    J = r.jsxs('div', {
      className: `${ll.root} ${U}`,
      role: 'progressbar',
      'aria-valuenow': T,
      'aria-valuemin': 0,
      'aria-valuemax': b,
      'aria-label': h ?? `${T} / ${b}`,
      children: [
        r.jsx('div', { className: ll.fill, style: H }),
        d && r.jsx('span', { className: ll.label, children: le }),
      ],
    });
  return g == null
    ? J
    : r.jsxs('div', {
        className: ll.withTrailing,
        children: [J, r.jsx('span', { className: ll.trailingLabel, children: g })],
      });
}
function z2(c, s) {
  if (s.isZero()) return 0;
  const u = parseFloat(c.toString()),
    o = parseFloat(s.toString());
  return o === 0 || isNaN(o) ? 0 : Math.min(1e3, Math.max(0, Math.round((u / o) * 1e3)));
}
const M2 = { sm: za.sizeSm, md: za.sizeMd, lg: za.sizeLg };
function C2({
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
    T = u ?? y ?? 0,
    z = o ?? _ ?? 0,
    q = typeof T == 'number' ? Ae.fromNumber(T) : T,
    E = typeof z == 'number' ? Ae.fromNumber(z) : z,
    U = z2(q, E),
    H = U <= 250,
    le = H ? 'hp-low' : 'hp',
    J = d === 'lg' ? 'lg' : d === 'sm' ? 'sm' : 'md';
  let ye;
  return (
    b === 'boss'
      ? (ye = { boxShadow: 'var(--glow-danger-md)' })
      : b === 'elite' && (ye = { boxShadow: 'var(--glow-purple-md)' }),
    r.jsxs('div', {
      className: [za.root, b === 'boss' ? za.boss : '', b === 'elite' ? za.elite : '', M2[d]]
        .filter(Boolean)
        .join(' '),
      style: ye,
      children: [
        r.jsxs('div', {
          className: za.header,
          children: [
            r.jsx(V, { variant: 'label', color: 'mid', children: c }),
            r.jsxs('div', {
              className: za.headerRight,
              children: [
                b === 'normal' &&
                  m !== void 0 &&
                  r.jsxs(V, { variant: 'numeric-s', color: 'dim', children: ['T', m] }),
                (b === 'elite' || b === 'boss') &&
                  r.jsx(Ts, { text: b.toUpperCase(), variant: b, glow: b === 'boss' }),
              ],
            }),
          ],
        }),
        r.jsx(b0, { value: U, max: 1e3, color: le, size: J, glow: H }),
        h &&
          r.jsx('div', {
            className: za.hpText,
            children: r.jsxs(V, {
              variant: 'numeric-s',
              color: H ? 'danger' : 'mid',
              children: [q.toDisplay(), ' / ', E.toDisplay()],
            }),
          }),
      ],
    })
  );
}
const w2 = [
  { id: 'p1', x: 30, y: 22, kind: 'normal' },
  { id: 'p2', x: 65, y: 18, kind: 'normal' },
  { id: 'p3', x: 50, y: 30, kind: 'elite' },
  { id: 'p4', x: 78, y: 38, kind: 'normal' },
  { id: 'p5', x: 22, y: 50, kind: 'normal' },
  { id: 'p6', x: 60, y: 72, kind: 'boss' },
];
function O2(c) {
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
function R2(c) {
  return c !== 'normal';
}
function D2(c) {
  return c === 'boss' ? 'boss' : c === 'elite' || c === 'miniboss' ? 'elite' : 'normal';
}
function B2(c) {
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
function kh(c) {
  switch (c) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}
function L2({
  enemies: c,
  machinePosition: s = { x: 50, y: 50 },
  damageEvents: u,
  hitEvents: o,
  deathEvents: m,
  onDamageDone: d,
  onHitDone: h,
  onDeathDone: g,
  range: y,
  dummyPins: _ = w2,
}) {
  const b = s.x,
    T = s.y,
    z = y * 2,
    q = z * 0.45;
  return r.jsxs('div', {
    className: na.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: [
      r.jsx('div', {
        className: na.rangeCircle,
        style: { left: `${b}%`, top: `${T}%`, width: `${z}%` },
        'aria-hidden': !0,
      }),
      r.jsx('div', {
        className: na.innerRing,
        style: { left: `${b}%`, top: `${T}%`, width: `${q}%` },
        'aria-hidden': !0,
      }),
      _.map((E) =>
        r.jsx(
          'div',
          {
            className: na.pin,
            style: { left: `${E.x}%`, top: `${E.y}%`, color: kh(E.kind) },
            'aria-hidden': !0,
            children: r.jsx(Ee, {
              name: 'target',
              size: E.kind === 'boss' ? 18 : E.kind === 'elite' ? 16 : 14,
              color: kh(E.kind),
            }),
          },
          E.id
        )
      ),
      c.map((E) => {
        const U = R2(E.kind),
          H = B2(E.kind),
          le = E.kind === 'boss' ? 32 : E.kind === 'miniboss' ? 28 : 22;
        return r.jsxs(
          'div',
          {
            className: [na.enemy, U ? na.enemyUpper : ''].filter(Boolean).join(' '),
            style: { left: `${E.position.x}%`, top: `${E.position.y}%` },
            'aria-label': `${E.kind}`,
            children: [
              r.jsx(Ee, { name: O2(E.kind), size: le, color: H }),
              U &&
                r.jsx('div', {
                  className: na.enemyHpBar,
                  children: r.jsx(C2, {
                    name: E.kind,
                    variant: D2(E.kind),
                    current: E.hp,
                    max: E.hp,
                    size: E.kind === 'boss' ? 'lg' : 'sm',
                    showValue: !1,
                  }),
                }),
            ],
          },
          E.id
        );
      }),
      r.jsxs('div', {
        className: na.machine,
        style: { left: `${b}%`, top: `${T}%` },
        'aria-label': 'マシン',
        children: [
          r.jsx('span', { className: na.machineRingOuter, 'aria-hidden': !0 }),
          r.jsx('span', { className: na.machineRingInner, 'aria-hidden': !0 }),
          r.jsx(Ee, { name: 'triangle', size: 28, color: 'var(--c-primary)' }),
        ],
      }),
      u.map((E) =>
        r.jsx(
          Pp,
          {
            value: Number(E.value.toString()),
            x: E.x,
            y: E.y,
            crit: E.crit,
            onDone: () => (d == null ? void 0 : d(E.id)),
          },
          E.id
        )
      ),
      o.map((E) =>
        r.jsx(i2, { x: E.x, y: E.y, onDone: () => (h == null ? void 0 : h(E.id)) }, E.id)
      ),
      m.map((E) =>
        r.jsx(a2, { x: E.x, y: E.y, onDone: () => (g == null ? void 0 : g(E.id)) }, E.id)
      ),
    ],
  });
}
const q2 = '_root_1qch4_2',
  H2 = '_topRow_1qch4_13',
  U2 = '_weaponSlots_1qch4_21',
  G2 = '_activeArea_1qch4_29',
  V2 = '_activeButton_1qch4_37',
  $2 = '_activeDisabled_1qch4_57',
  Y2 = '_modeLabel_1qch4_65',
  k2 = '_modeLabelAuto_1qch4_76',
  Z2 = '_toggleHidden_1qch4_81',
  X2 = '_bottomRow_1qch4_95',
  Q2 = '_currencyArea_1qch4_101',
  K2 = '_speedArea_1qch4_106',
  J2 = '_sysButtons_1qch4_113',
  Ct = {
    root: q2,
    topRow: H2,
    weaponSlots: U2,
    activeArea: G2,
    activeButton: V2,
    activeDisabled: $2,
    modeLabel: Y2,
    modeLabelAuto: k2,
    toggleHidden: Z2,
    bottomRow: X2,
    currencyArea: Q2,
    speedArea: K2,
    sysButtons: J2,
  },
  W2 = '_root_x9cjr_1',
  F2 = '_svg_x9cjr_9',
  I2 = '_track_x9cjr_15',
  P2 = '_arc_x9cjr_19',
  eb = '_center_x9cjr_28',
  tb = '_labelText_x9cjr_37',
  Mn = { root: W2, svg: F2, track: I2, arc: P2, center: eb, labelText: tb },
  ab = { xs: 20, sm: 32, md: 48, lg: 64 },
  lb = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  nb = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function S0({
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
  const b = typeof u == 'number' ? u : ab[u],
    T =
      s != null
        ? Math.min(Math.max(0, c), Math.max(1, s)) / Math.max(1, s)
        : Math.min(Math.max(0, c), 100) / 100,
    z = s != null ? Math.min(Math.max(0, c), Math.max(1, s)) : c,
    q = s != null ? Math.max(1, s) : 100,
    E = lb[o],
    U = d ? nb[o] : void 0,
    H = b / 2,
    le = H - m / 2,
    J = 2 * Math.PI * le,
    ye = J * (1 - T),
    lt = h || g || _ != null,
    De = y ?? `${Math.round(T * 100)}%`;
  return r.jsxs('span', {
    className: Mn.root,
    style: { width: b, height: b },
    children: [
      r.jsxs('svg', {
        className: Mn.svg,
        width: b,
        height: b,
        viewBox: `0 0 ${b} ${b}`,
        xmlns: 'http://www.w3.org/2000/svg',
        role: 'progressbar',
        'aria-valuenow': z,
        'aria-valuemin': 0,
        'aria-valuemax': q,
        'aria-label': y ?? `${z} / ${q}`,
        children: [
          r.jsx('circle', {
            className: Mn.track,
            cx: H,
            cy: H,
            r: le,
            fill: 'none',
            strokeWidth: m,
          }),
          r.jsx('circle', {
            className: Mn.arc,
            cx: H,
            cy: H,
            r: le,
            fill: 'none',
            stroke: E,
            strokeWidth: m,
            strokeLinecap: 'round',
            strokeDasharray: J,
            strokeDashoffset: ye,
            style: U != null ? { filter: `drop-shadow(0 0 4px ${E})` } : void 0,
            transform: `rotate(-90 ${H} ${H})`,
          }),
        ],
      }),
      lt &&
        r.jsx('span', {
          className: Mn.center,
          children:
            _ ?? r.jsx('span', { className: Mn.labelText, style: { color: E }, children: De }),
        }),
    ],
  });
}
const ib = '_root_8pbri_1',
  cb = '_disabled_8pbri_8',
  sb = '_segment_8pbri_13',
  ub = '_selected_8pbri_27',
  ob = '_unselected_8pbri_33',
  Cn = {
    root: ib,
    disabled: cb,
    segment: sb,
    selected: ub,
    unselected: ob,
    'size-sm': '_size-sm_8pbri_42',
    'size-md': '_size-md_8pbri_47',
  },
  x0 = ({ options: c, value: s, onChange: u, size: o = 'md', disabled: m = !1 }) =>
    r.jsx('div', {
      className: [Cn.root, Cn[`size-${o}`], m ? Cn.disabled : ''].join(' '),
      role: 'group',
      children: c.map((d) => {
        const h = d.value === s;
        return r.jsx(
          'button',
          {
            type: 'button',
            role: 'radio',
            'aria-checked': h,
            className: [Cn.segment, h ? Cn.selected : Cn.unselected].join(' '),
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
  rb = '_wrapper_1e40p_9',
  fb = '_disabled_1e40p_15',
  db = '_off_1e40p_31',
  mb = '_on_1e40p_35',
  hb = '_accent_primary_1e40p_35',
  vb = '_accent_secondary_1e40p_39',
  gb = '_accent_success_1e40p_43',
  yb = '_accent_disabled_1e40p_47',
  _b = '_size_md_1e40p_56',
  pb = '_knob_1e40p_60',
  bb = '_size_sm_1e40p_70',
  Sb = '_labelGroup_1e40p_93',
  xb = '_label_1e40p_93',
  jb = '_description_1e40p_106',
  Wt = {
    wrapper: rb,
    disabled: fb,
    switch: '_switch_1e40p_22',
    off: db,
    on: mb,
    accent_primary: hb,
    accent_secondary: vb,
    accent_success: gb,
    accent_disabled: yb,
    size_md: _b,
    knob: pb,
    size_sm: bb,
    labelGroup: Sb,
    label: xb,
    description: jb,
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
    const g = u || d === 'disabled',
      y = () => {
        g || s(!c);
      };
    return r.jsxs('label', {
      className: [Wt.wrapper, g ? Wt.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': g,
      children: [
        r.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': c,
          'aria-disabled': g,
          className: [Wt.switch, c ? Wt.on : Wt.off, Wt[`size_${h}`], Wt[`accent_${d}`]]
            .filter(Boolean)
            .join(' '),
          onClick: y,
          disabled: g,
          children: r.jsx('span', { className: Wt.knob }),
        }),
        (o || m) &&
          r.jsxs('span', {
            className: Wt.labelGroup,
            children: [
              o && r.jsx('span', { className: Wt.label, children: o }),
              m && r.jsx('span', { className: Wt.description, children: m }),
            ],
          }),
      ],
    });
  },
  Tb = '_root_afe45_2',
  Ab = '_swapDisabled_afe45_14',
  Nb = '_active_afe45_20',
  Eb = '_onCd_afe45_27',
  zb = '_iconWrap_afe45_27',
  Mb = '_cdOverlay_afe45_47',
  Cb = '_cdProgress_afe45_57',
  wb = '_swapOverlay_afe45_68',
  nl = {
    root: Tb,
    swapDisabled: Ab,
    active: Nb,
    onCd: Eb,
    iconWrap: zb,
    cdOverlay: Mb,
    cdProgress: Cb,
    swapOverlay: wb,
  },
  Ob = { sm: 40, md: 52, lg: 64 },
  Rb = { sm: 18, md: 24, lg: 30 };
function Db({
  weapon: c,
  active: s = !1,
  ready: u = !1,
  cdProgress: o = 100,
  swapDisabled: m = !1,
  size: d = 'md',
  onClick: h,
}) {
  const g = Ob[d],
    y = Rb[d],
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
        children: r.jsx(Ee, {
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
              children: r.jsx(S0, {
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
const Zh = ['laser', 'cannon', 'thunder', 'cutter'],
  Bb = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
  ];
function Lb({
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
  isPaused: T,
  onTogglePause: z,
  onOpenMenu: q,
  onOpenScreenSaver: E,
}) {
  const U = o > 0,
    H = d || U,
    le = Zh.some((J) => J !== s && (u[J] ?? 100) < 100);
  return r.jsxs('div', {
    className: Ct.root,
    children: [
      r.jsxs('div', {
        className: Ct.topRow,
        children: [
          r.jsx('div', {
            className: Ct.weaponSlots,
            children: Zh.map((J) =>
              r.jsx(
                Db,
                {
                  weapon: J,
                  active: J === s,
                  cdProgress: u[J] ?? 100,
                  swapDisabled: le && J !== s,
                  size: 'md',
                  onClick: () => {
                    h(J);
                  },
                },
                J
              )
            ),
          }),
          r.jsxs('div', {
            className: Ct.activeArea,
            children: [
              r.jsx('button', {
                type: 'button',
                className: [Ct.activeButton, H ? Ct.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: H ? void 0 : g,
                disabled: H,
                'aria-label': `アクティブスキル発動${U ? ' (クールダウン中)' : d ? ' (自動モード)' : ''}`,
                children: r.jsx(S0, {
                  value: U ? o : m,
                  max: m > 0 ? m : 1,
                  size: 64,
                  color: U ? 'cd' : 'primary',
                  glow: !U && !d,
                  thickness: 4,
                  children: r.jsx(Ee, {
                    name: 'lightning',
                    size: 26,
                    color: H ? 'var(--c-text-disabled)' : 'var(--c-secondary)',
                  }),
                }),
              }),
              r.jsx('span', {
                className: [Ct.modeLabel, d ? Ct.modeLabelAuto : ''].filter(Boolean).join(' '),
                'aria-hidden': !0,
                children: d ? 'AUTO' : 'MANUAL',
              }),
              r.jsx('div', {
                className: Ct.toggleHidden,
                children: r.jsx(gr, {
                  checked: d,
                  onChange: y,
                  label: '自動',
                  size: 'sm',
                  accent: 'secondary',
                }),
              }),
            ],
          }),
        ],
      }),
      r.jsxs('div', {
        className: Ct.bottomRow,
        children: [
          r.jsx('div', {
            className: Ct.currencyArea,
            children: r.jsx(Ui, { currency: 'screw', value: c, size: 'lg' }),
          }),
          r.jsx('div', {
            className: Ct.speedArea,
            children: r.jsx(x0, { options: Bb, value: _, onChange: b, size: 'sm' }),
          }),
          r.jsxs('div', {
            className: Ct.sysButtons,
            children: [
              r.jsx(ds, {
                icon: T ? 'play' : 'pause',
                label: T ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: T,
                onClick: z,
              }),
              r.jsx(ds, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: q,
              }),
              r.jsx(ds, {
                icon: 'ice',
                label: 'スクリーンセーバーを起動',
                size: 'md',
                variant: 'ghost',
                onClick: E,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const qb = '_root_kd04f_3',
  Hb = '_leftCol_kd04f_14',
  Ub = '_hpText_kd04f_22',
  Gb = '_hpDivider_kd04f_30',
  Vb = '_centerCol_kd04f_36',
  $b = '_srOnly_kd04f_42',
  Yb = '_rightCol_kd04f_55',
  kb = '_enemiesNum_kd04f_62',
  il = {
    root: qb,
    leftCol: Hb,
    hpText: Ub,
    hpDivider: Gb,
    centerCol: Vb,
    srOnly: $b,
    rightCol: Yb,
    enemiesNum: kb,
  },
  Zb = '_root_nxl33_2',
  Xb = '_boss_nxl33_14',
  Qb = '_header_nxl33_20',
  Kb = '_waveLabel_nxl33_26',
  Jb = '_waveNum_nxl33_35',
  Wb = '_milestone_nxl33_41',
  Fb = '_milestoneText_nxl33_48',
  Ib = '_seconds_nxl33_58',
  Aa = {
    root: Zb,
    boss: Xb,
    header: Qb,
    waveLabel: Kb,
    waveNum: Jb,
    milestone: Wb,
    milestoneText: Fb,
    seconds: Ib,
    'size-sm': '_size-sm_nxl33_64',
    'size-md': '_size-md_nxl33_72',
    'size-lg': '_size-lg_nxl33_76',
  },
  Pb = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  },
  eS = { sm: 'var(--fs-label)', md: 'var(--fs-caption)', lg: 'var(--fs-body)' };
function tS({
  waveNumber: c,
  secondsLeft: s,
  secondsMax: u,
  nextMilestone: o,
  showSeconds: m = !0,
  size: d = 'md',
}) {
  const h = (o == null ? void 0 : o.kind) === 'boss',
    g = o != null ? Pb[o.kind] : null;
  return r.jsxs('div', {
    className: [Aa.root, Aa[`size-${d}`], h ? Aa.boss : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Aa.header,
        children: [
          r.jsxs('span', {
            className: Aa.waveLabel,
            style: { fontSize: eS[d] },
            children: ['WAVE ', r.jsx('span', { className: Aa.waveNum, children: c })],
          }),
          g != null &&
            o != null &&
            r.jsxs('span', {
              className: Aa.milestone,
              style: { color: g.color },
              children: [
                r.jsx(Ee, { name: g.iconName, size: 12, color: g.color }),
                r.jsxs('span', { className: Aa.milestoneText, children: [g.label, ' @', o.wave] }),
              ],
            }),
          m &&
            r.jsx('span', {
              className: Aa.seconds,
              children: r.jsxs(V, { variant: 'numeric-s', color: 'mid', children: [s, 's'] }),
            }),
        ],
      }),
      r.jsx(b0, {
        value: s,
        max: Math.max(1, u),
        color: h ? 'secondary' : 'wave',
        size: d === 'lg' ? 'md' : 'sm',
        glow: h,
      }),
    ],
  });
}
function aS({
  hpCurrent: c,
  hpMax: s,
  tier: u,
  wave: o,
  totalWaves: m,
  secondsRemaining: d,
  secondsTotal: h,
  isBossWave: g = !1,
  nextMilestone: y,
  enemiesRemaining: _,
}) {
  const b = y ?? (g ? { wave: o, kind: 'boss' } : void 0),
    T = _ ?? 0;
  return r.jsxs('div', {
    className: il.root,
    children: [
      r.jsxs('div', {
        className: il.leftCol,
        children: [
          r.jsx(Ts, { variant: 'tier', tier: u, size: 'sm', glow: g }),
          r.jsxs('span', {
            className: il.hpText,
            'aria-label': `HP ${c.toDisplay()} / ${s.toDisplay()}`,
            children: [
              r.jsx(Ll, {
                value: c,
                size: 'sm',
                accentColor: 'text',
                style: { fontWeight: 'var(--fw-semibold)' },
              }),
              r.jsx('span', { className: il.hpDivider, children: '/' }),
              r.jsx(Ll, { value: s, size: 'sm', accentColor: 'dim' }),
            ],
          }),
        ],
      }),
      r.jsxs('div', {
        className: il.centerCol,
        children: [
          r.jsx(tS, {
            waveNumber: o,
            secondsLeft: d,
            secondsMax: h,
            nextMilestone: b,
            showSeconds: !1,
            size: 'sm',
          }),
          r.jsxs('span', { className: il.srOnly, 'aria-hidden': 'false', children: [o, '/', m] }),
        ],
      }),
      r.jsxs('div', {
        className: il.rightCol,
        'aria-label': `残敵 ${T}`,
        children: [
          r.jsx(V, { variant: 'numeric-s', color: 'text', className: il.enemiesNum, children: T }),
          r.jsx(Ee, { name: 'target', size: 14, color: 'var(--c-text-mid)' }),
        ],
      }),
    ],
  });
}
const lS = '_card_1o3jz_1',
  nS = '_header_1o3jz_8',
  iS = '_soundSection_1o3jz_13',
  cS = '_sliderRow_1o3jz_19',
  sS = '_sliderLabel_1o3jz_26',
  uS = '_sliderValue_1o3jz_31',
  oS = '_divider_1o3jz_38',
  rS = '_actions_1o3jz_44',
  Ft = {
    card: lS,
    header: nS,
    soundSection: iS,
    sliderRow: cS,
    sliderLabel: sS,
    sliderValue: uS,
    divider: oS,
    actions: rS,
  },
  fS = '_button_10kfo_1',
  dS = '_fullWidth_10kfo_109',
  mS = '_iconLeft_10kfo_113',
  hS = '_iconRight_10kfo_114',
  vS = '_label_10kfo_120',
  Cl = {
    button: fS,
    'variant-primary': '_variant-primary_10kfo_28',
    'variant-secondary': '_variant-secondary_10kfo_42',
    'variant-danger': '_variant-danger_10kfo_56',
    'variant-ghost': '_variant-ghost_10kfo_70',
    'size-sm': '_size-sm_10kfo_85',
    'size-md': '_size-md_10kfo_93',
    'size-lg': '_size-lg_10kfo_101',
    fullWidth: dS,
    iconLeft: mS,
    iconRight: hS,
    label: vS,
  };
function _t({
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
    className: [Cl.button, Cl[`variant-${s}`], Cl[`size-${u}`], o ? Cl.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: g,
    'aria-disabled': h,
    children: [
      m != null && r.jsx('span', { className: Cl.iconLeft, 'aria-hidden': 'true', children: m }),
      r.jsx('span', { className: Cl.label, children: c }),
      d != null && r.jsx('span', { className: Cl.iconRight, 'aria-hidden': 'true', children: d }),
    ],
  });
}
const gS = '_overlay_1i1z1_12',
  yS = '_fullscreen_1i1z1_21',
  _S = '_absolute_1i1z1_27',
  pS = '_alignCenter_1i1z1_33',
  bS = '_alignTop_1i1z1_38',
  SS = '_alignBottom_1i1z1_44',
  xS = '_content_1i1z1_50',
  Dl = {
    overlay: gS,
    fullscreen: yS,
    absolute: _S,
    alignCenter: pS,
    alignTop: bS,
    alignBottom: SS,
    content: xS,
  },
  jS = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Xh = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  TS = { center: Dl.alignCenter, top: Dl.alignTop, bottom: Dl.alignBottom };
function As({
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
    T = (U) => {
      U.stopPropagation();
    },
    z = jS[m],
    q = typeof g == 'number' ? g : (Xh[g] ?? Xh.overlay),
    E = {
      background: `rgba(2, 4, 10, ${z})`,
      zIndex: q,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...y,
    };
  return r.jsx('div', {
    className: [Dl.overlay, c ? Dl.fullscreen : Dl.absolute, TS[h]].join(' '),
    style: E,
    onClick: b,
    role: 'presentation',
    'aria-modal': 'true',
    children: r.jsx('div', { className: Dl.content, onClick: T, children: s }),
  });
}
const AS = '_wrapper_131tr_1',
  NS = '_disabled_131tr_5',
  ES = '_input_131tr_18',
  os = {
    wrapper: AS,
    disabled: NS,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: ES,
  },
  ir = ({
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
      className: [os.wrapper, os[`color-${d}`], h ? os.disabled : ''].join(' '),
      style: _,
      children: r.jsx('input', {
        type: 'range',
        className: os.input,
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
  zS = '_dialog_49iek_13',
  MS = '_card_49iek_20',
  CS = '_titleRow_49iek_27',
  wS = '_titleIcon_49iek_33',
  OS = '_title_49iek_27',
  RS = '_message_49iek_46',
  DS = '_actions_49iek_50',
  BS = '_variantDanger_49iek_57',
  cl = {
    dialog: zS,
    card: MS,
    titleRow: CS,
    titleIcon: wS,
    title: OS,
    message: RS,
    actions: DS,
    variantDanger: BS,
  };
function j0({
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
    ? r.jsx(As, {
        open: c,
        onClose: g,
        dismissible: !0,
        children: r.jsx('div', {
          className: [cl.dialog, y === 'danger' ? cl.variantDanger : ''].filter(Boolean).join(' '),
          children: r.jsxs(Hl, {
            variant: 'elevated',
            padding: 'lg',
            className: cl.card,
            children: [
              r.jsxs('div', {
                className: cl.titleRow,
                children: [
                  o != null &&
                    r.jsx('span', {
                      className: cl.titleIcon,
                      'aria-hidden': 'true',
                      children: r.jsx(Ee, {
                        name: o,
                        size: 20,
                        color: y === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  r.jsx(V, { variant: 'heading-3', as: 'h2', className: cl.title, children: s }),
                ],
              }),
              u != null &&
                u.length > 0 &&
                r.jsx(V, { variant: 'body', color: 'mid', className: cl.message, children: u }),
              r.jsxs('div', {
                className: cl.actions,
                children: [
                  r.jsx(_t, { label: d, variant: 'ghost', fullWidth: !0, onClick: g }),
                  r.jsx(_t, {
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
function LS({
  open: c,
  bgmVolume: s,
  seVolume: u,
  onBgmChange: o,
  onSeChange: m,
  onRetreat: d,
  onClose: h,
}) {
  const [g, y] = de.useState(!1);
  if (!c) return null;
  const _ = () => {
      y(!0);
    },
    b = () => {
      (y(!1), d());
    },
    T = () => {
      y(!1);
    };
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx(As, {
        open: c,
        onClose: h,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !g,
        children: r.jsxs(Hl, {
          variant: 'elevated',
          padding: 'lg',
          className: Ft.card,
          children: [
            r.jsx('div', {
              className: Ft.header,
              children: r.jsx(V, {
                variant: 'heading-2',
                as: 'h2',
                align: 'center',
                children: 'メニュー',
              }),
            }),
            r.jsxs('div', {
              className: Ft.soundSection,
              children: [
                r.jsxs('div', {
                  className: Ft.sliderRow,
                  children: [
                    r.jsx(V, {
                      variant: 'label',
                      color: 'mid',
                      className: Ft.sliderLabel,
                      children: 'BGM',
                    }),
                    r.jsx(V, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: Ft.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(ir, { value: s, min: 0, max: 1, step: 0.01, onChange: o, color: 'primary' }),
                r.jsxs('div', {
                  className: Ft.sliderRow,
                  children: [
                    r.jsx(V, {
                      variant: 'label',
                      color: 'mid',
                      className: Ft.sliderLabel,
                      children: 'SE',
                    }),
                    r.jsx(V, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: Ft.sliderValue,
                      children: Math.round(u * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(ir, { value: u, min: 0, max: 1, step: 0.01, onChange: m, color: 'primary' }),
              ],
            }),
            r.jsx('div', { className: Ft.divider, role: 'separator' }),
            r.jsxs('div', {
              className: Ft.actions,
              children: [
                r.jsx(_t, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: _ }),
                r.jsx(_t, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: h }),
              ],
            }),
          ],
        }),
      }),
      r.jsx(j0, {
        open: g,
        title: '撤退しますか？',
        message: 'バトルを終了して撤退します。獲得リソースはリザルト画面で確認できます。',
        confirmLabel: '撤退する',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: b,
        onCancel: T,
      }),
    ],
  });
}
const qS = '_card_1fzt0_2',
  HS = '_header_1fzt0_14',
  US = '_statusText_1fzt0_19',
  GS = '_section_1fzt0_23',
  VS = '_sectionTitle_1fzt0_29',
  $S = '_statsGrid_1fzt0_35',
  YS = '_statItem_1fzt0_41',
  kS = '_rewardList_1fzt0_52',
  ZS = '_rewardCurrency_1fzt0_58',
  XS = '_patchList_1fzt0_66',
  QS = '_patchItem_1fzt0_72',
  KS = '_actions_1fzt0_87',
  Je = {
    card: qS,
    header: HS,
    statusText: US,
    section: GS,
    sectionTitle: VS,
    statsGrid: $S,
    statItem: YS,
    rewardList: kS,
    rewardCurrency: ZS,
    patchList: XS,
    patchItem: QS,
    actions: KS,
  },
  JS = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  WS = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function FS(c) {
  const s = Math.floor(c / 60),
    u = Math.floor(c % 60);
  return `${s.toString().padStart(2, '0')}:${u.toString().padStart(2, '0')}`;
}
function IS({
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
  const y = JS[s],
    _ = WS[s];
  return r.jsx(As, {
    open: c,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: r.jsxs(Hl, {
      variant: 'elevated',
      padding: 'lg',
      className: Je.card,
      children: [
        r.jsx('div', {
          className: Je.header,
          children: r.jsx(V, {
            variant: 'heading-1',
            as: 'h2',
            color: _,
            align: 'center',
            className: Je.statusText,
            children: y,
          }),
        }),
        r.jsxs('div', {
          className: Je.section,
          children: [
            r.jsx(V, {
              variant: 'label',
              color: 'mid',
              className: Je.sectionTitle,
              children: 'バトル記録',
            }),
            r.jsxs('div', {
              className: Je.statsGrid,
              children: [
                r.jsxs('div', {
                  className: Je.statItem,
                  children: [
                    r.jsx(V, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    r.jsx(V, { variant: 'numeric-m', color: 'primary', children: u.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Je.statItem,
                  children: [
                    r.jsx(V, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    r.jsx(V, { variant: 'numeric-m', color: 'primary', children: o.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Je.statItem,
                  children: [
                    r.jsx(V, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    r.jsx(V, { variant: 'numeric-m', color: 'primary', children: m.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Je.statItem,
                  children: [
                    r.jsx(V, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    r.jsx(V, { variant: 'numeric-m', color: 'primary', children: FS(d) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        r.jsxs('div', {
          className: Je.section,
          children: [
            r.jsx(V, {
              variant: 'label',
              color: 'mid',
              className: Je.sectionTitle,
              children: '獲得',
            }),
            r.jsxs('div', {
              className: Je.rewardList,
              children: [
                r.jsx('div', {
                  className: Je.rewardCurrency,
                  children: r.jsx(Ui, { currency: 'bolt', value: h.bolt, size: 'lg' }),
                }),
                r.jsx('div', {
                  className: Je.rewardCurrency,
                  children: r.jsx(Ui, { currency: 'alloy', value: h.alloy, size: 'lg' }),
                }),
                h.patches.length > 0 &&
                  r.jsx('div', {
                    className: Je.patchList,
                    children: h.patches.map((b, T) =>
                      r.jsxs(
                        'div',
                        {
                          className: Je.patchItem,
                          children: [
                            r.jsx(V, { variant: 'body', truncate: !0, children: b.name }),
                            r.jsxs(V, {
                              variant: 'caption',
                              color: 'mid',
                              children: ['Tier ', b.tier.toString()],
                            }),
                            r.jsxs(V, {
                              variant: 'numeric-s',
                              color: 'secondary',
                              children: ['x', b.count.toString()],
                            }),
                          ],
                        },
                        T
                      )
                    ),
                  }),
                h.patches.length === 0 &&
                  r.jsx(V, { variant: 'caption', color: 'dim', children: 'パッチドロップなし' }),
              ],
            }),
          ],
        }),
        r.jsx('div', {
          className: Je.actions,
          children: r.jsx(_t, {
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
const PS = [
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
function yr(c, s) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, s));
}
function Qh(c) {
  return 1 + 0.1 * c;
}
function ex(c, s, u) {
  let o = 0;
  for (let m = 0; m < u; m++) o += yr(c, s + m);
  return o;
}
function tx(c, s, u) {
  let o = Ae.ZERO,
    m = 0;
  for (;;) {
    const d = Ae.fromNumber(yr(c, s + m)),
      h = o.add(d);
    if (h.gt(u) || ((o = h), m++, m >= 1e4)) break;
  }
  return { lvDelta: m, totalCost: o };
}
const ax = '_inner_1ld24_2',
  lx = '_grid_1ld24_7',
  Kh = { inner: ax, grid: lx },
  nx = '_sheet_k47pw_38',
  ix = '_edgeBottom_k47pw_43',
  cx = '_content_k47pw_49',
  sx = '_edgeTop_k47pw_55',
  ux = '_edgeSide_k47pw_66',
  ox = '_edgeAll_k47pw_80',
  rx = '_paddingSm_k47pw_95',
  fx = '_paddingMd_k47pw_99',
  dx = '_paddingLg_k47pw_103',
  mx = '_backdrop_k47pw_108',
  ca = {
    sheet: nx,
    edgeBottom: ix,
    content: cx,
    edgeTop: sx,
    edgeSide: ux,
    edgeAll: ox,
    paddingSm: rx,
    paddingMd: fx,
    paddingLg: dx,
    backdrop: mx,
  },
  hx = '_container_9k8su_1',
  vx = '_handle_9k8su_13',
  gx = '_dragging_9k8su_21',
  Fo = { container: hx, handle: vx, dragging: gx };
function T0({ className: c, dragging: s, width: u, onPointerDown: o }) {
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
const yx = { none: '', sm: ca.paddingSm, md: ca.paddingMd, lg: ca.paddingLg };
function _x({
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
    _ = { bottom: ca.edgeBottom, top: ca.edgeTop, side: ca.edgeSide, all: ca.edgeAll }[y],
    b = yx[h];
  return r.jsxs('div', {
    className: [ca.sheet, _].filter(Boolean).join(' '),
    role: 'dialog',
    'aria-modal': 'true',
    style: g,
    children: [
      u && r.jsx('div', { className: ca.backdrop, onClick: u, 'aria-hidden': 'true' }),
      r.jsxs('div', {
        className: [ca.content, b].filter(Boolean).join(' '),
        children: [d && y === 'bottom' && r.jsx(T0, {}), s],
      }),
    ],
  });
}
function px({ open: c, screw: s, levels: u, onUpgrade: o, onClose: m }) {
  return c
    ? r.jsxs(_x, {
        open: c,
        onClose: m,
        edge: 'bottom',
        children: [
          r.jsx(T0, {}),
          r.jsx('div', {
            className: Kh.inner,
            children: r.jsx('div', {
              className: Kh.grid,
              children: PS.map((d) => {
                const h = u[d.key],
                  g = Qh(h),
                  y = Qh(h + 1),
                  _ = yr(d, h),
                  b = ex(d, h, 5),
                  { totalCost: T, lvDelta: z } = tx(d, h, s),
                  q = Ae.fromNumber(_),
                  E = Ae.fromNumber(b),
                  U = s.gte(q),
                  H = s.gte(E),
                  le = z > 0;
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
                      { amount: '+1', cost: q, disabled: !U },
                      { amount: '+5', cost: E, disabled: !H },
                      { amount: 'MAX', cost: T, disabled: !le },
                    ],
                    onUpgrade: (J) => {
                      J === '+1'
                        ? o(d.key, 1)
                        : J === '+5'
                          ? o(d.key, 5)
                          : J === 'MAX' && o(d.key, 'max');
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
const bx = '_fxContainer_rlbsy_2',
  Sx = { fxContainer: bx },
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
function xx({ items: c = [], showTower: s = !1, towerContent: u = null, cycleSeconds: o = 24 }) {
  const d = `ssfx-${de.useId().replace(/:/g, '')}`,
    h = Io.map((T, z) => {
      const q = 100 / T.length,
        E = T.map(([U, H], le) => {
          const J = le * q;
          return `
          ${J}%               { left: ${U}%; top: ${H}%; opacity: 0; }
          ${(J + 3).toFixed(2)}%   { left: ${U}%; top: ${H}%; opacity: 1; }
          ${(J + q - 7).toFixed(2)}%  { left: ${U}%; top: ${H}%; opacity: 1; }
          ${(J + q - 3).toFixed(2)}%  { left: ${U}%; top: ${H}%; opacity: 0; }
        `;
        }).join('');
      return `@keyframes ${d}-drift-${z + 1} { ${E} 100% { opacity: 0; } }`;
    }).join(`
`),
    g = Io.map(
      (T, z) => `.${d}-p${z + 1} { animation: ${d}-drift-${z + 1} ${o}s linear infinite; }`
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
      b.map((T, z) => {
        const q = (z % Io.length) + 1,
          E = -(z * (o / Math.max(b.length, 1)));
        return r.jsx(
          'div',
          {
            className: `${d}-slot ${d}-p${q}${z === 0 ? ` ${d}-rm-show` : ''}`,
            style: { animationDelay: `${E}s` },
            children: T,
          },
          z
        );
      }),
    ],
  });
}
function jx({ open: c, onClose: s }) {
  return c
    ? r.jsx(As, {
        open: c,
        onClose: s,
        dimLevel: 'heavy',
        dismissible: !0,
        align: 'center',
        children: r.jsx('div', {
          className: Sx.fxContainer,
          onClick: (u) => {
            (u.stopPropagation(), s());
          },
          role: 'button',
          'aria-label': 'スクリーンセーバーを終了',
          tabIndex: 0,
          onKeyDown: (u) => {
            (u.key === 'Enter' || u.key === ' ') && s();
          },
          children: r.jsx(xx, { showTower: !0 }),
        }),
      })
    : null;
}
const Tx = 30,
  Ax = 30,
  Nx = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 };
function Ex(c, s) {
  return c && s <= 0 ? 'gameover' : null;
}
function zx() {
  const { navigate: c } = Ma(),
    s = X((ee) => ee.isRunActive),
    u = X((ee) => ee.screw),
    o = X((ee) => ee.machineHp),
    m = X((ee) => ee.machineMaxHp),
    d = X((ee) => ee.currentTier),
    h = X((ee) => ee.currentWave),
    g = X((ee) => ee.currentWeapon),
    y = X((ee) => ee.activeCdSec),
    _ = X((ee) => ee.isAutoActive),
    b = X((ee) => ee.gameSpeed),
    T = X((ee) => ee.bgmVolume),
    z = X((ee) => ee.seVolume),
    q = X((ee) => ee.setBgmVolume),
    E = X((ee) => ee.setSeVolume),
    U = X((ee) => ee.setAutoActive),
    H = X((ee) => ee.switchWeapon),
    [le, J] = de.useState(!1),
    [ye, Ye] = de.useState(!1),
    [lt, De] = de.useState(!1),
    [ne, Ze] = de.useState(!1),
    [rt, ut] = de.useState(b),
    [Be, Xe] = de.useState(Nx),
    [kt] = de.useState([]),
    [wt] = de.useState([]),
    [nt] = de.useState([]),
    O = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    G = Ex(s, o),
    [F, _e] = de.useState(null),
    pe = F ?? G,
    x = pe !== null,
    L = Ae.fromNumber(o),
    $ = Ae.fromNumber(m > 0 ? m : 1),
    k = (ee) => {
      ut(ee);
    },
    I = () => {
      Ze((ee) => !ee);
    },
    ie = () => {
      Ye(!0);
    },
    me = () => {
      De(!0);
    },
    We = () => {
      (Ye(!1), _e('retreat'));
    },
    we = () => {
      c('preparation');
    },
    rl = (ee, Vl) => {
      Xe((ki) => ({ ...ki, [ee]: ki[ee] + (Vl === 'max' ? 1 : Vl) }));
    },
    Ul = { bolt: Ae.ZERO, alloy: Ae.ZERO, patches: [] },
    Gl = 30;
  return r.jsxs('div', {
    className: $h.root,
    children: [
      r.jsx(ql, {
        noScroll: !0,
        variant: 'battle',
        header: r.jsx(aS, {
          hpCurrent: L,
          hpMax: $,
          tier: d,
          wave: h,
          totalWaves: Gl,
          secondsRemaining: 30,
          secondsTotal: 30,
          isBossWave: h === Gl,
          enemiesRemaining: 0,
        }),
        footer: r.jsx(Lb, {
          screw: u,
          equippedWeapon: g,
          weaponCds: O,
          activeCd: y,
          activeMax: Tx,
          isAutoActive: _,
          onSwitchWeapon: H,
          onActivate: () => {},
          onToggleAuto: U,
          gameSpeed: rt,
          onSpeedChange: k,
          isPaused: ne,
          onTogglePause: I,
          onOpenMenu: ie,
          onOpenScreenSaver: me,
        }),
        children: r.jsx(L2, {
          enemies: [],
          damageEvents: kt,
          hitEvents: wt,
          deathEvents: nt,
          range: Ax,
        }),
      }),
      r.jsxs('div', {
        className: $h.overlayLayer,
        'aria-live': 'polite',
        children: [
          r.jsx(px, {
            open: le,
            screw: u,
            levels: Be,
            onUpgrade: rl,
            onClose: () => {
              J(!1);
            },
          }),
          r.jsx(LS, {
            open: ye,
            bgmVolume: T,
            seVolume: z,
            onBgmChange: q,
            onSeChange: E,
            onRetreat: We,
            onClose: () => {
              Ye(!1);
            },
          }),
          x &&
            r.jsx(IS, {
              open: x,
              status: pe,
              reachedTier: d,
              reachedWave: h,
              killed: 0,
              elapsedSec: 0,
              reward: Ul,
              onClose: we,
            }),
          r.jsx(jx, {
            open: lt,
            onClose: () => {
              De(!1);
            },
          }),
        ],
      }),
    ],
  });
}
const Mx = [
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
function Jh(c, s) {
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
function _r(c, s) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, s));
}
function Po(c, s, u) {
  let o = 0;
  for (let m = 0; m < u && !(c.maxLv != null && s + m >= c.maxLv); m++) o += _r(c, s + m);
  return o;
}
function Cx(c, s, u) {
  let o = 0,
    m = u,
    d = s;
  for (let h = 0; h < 1e4 && !(c.maxLv != null && d >= c.maxLv); h++) {
    const g = Ae.fromNumber(_r(c, d));
    if (m.lt(g)) break;
    ((m = m.sub(g)), (d += 1), (o += 1));
  }
  return o;
}
const wx = '_root_11wsk_3',
  Ox = { root: wx };
function Rx() {
  const c = X((m) => m.machineLevels),
    s = X((m) => m.bolt),
    u = X((m) => m.incrementMachineLv),
    o = X((m) => m.spendBolt);
  return r.jsx('div', {
    className: Ox.root,
    children: Mx.map((m) => {
      const d = c[m.key],
        h = m.maxLv != null && d >= m.maxLv,
        g = Jh(m, d),
        y = Jh(m, d + 1),
        _ = (ut) => (m.unit === '%' ? Math.round(ut * 1e3) / 10 : ut),
        b = _(g),
        T = _(y),
        z = _r(m, d),
        q = Po(m, d, 5),
        E = Ae.fromNumber(z),
        U = Ae.fromNumber(q),
        H = Cx(m, d, s),
        le = m.maxLv != null ? m.maxLv - d : Number.POSITIVE_INFINITY,
        J = Math.min(H, le),
        ye = J > 0 ? Po(m, d, J) : z,
        Ye = Ae.fromNumber(ye),
        lt = s.lt(E),
        De = s.lt(U) || (m.maxLv != null && d + 5 > m.maxLv),
        ne = J < 1,
        Ze = h
          ? []
          : [
              { amount: '+1', cost: E, disabled: lt },
              { amount: '+5', cost: U, disabled: De },
              { amount: 'MAX', cost: Ye, disabled: ne },
            ],
        rt = (ut) => {
          if (h) return;
          let Be = 0;
          if ((ut === '+1' ? (Be = 1) : ut === '+5' ? (Be = 5) : ut === 'MAX' && (Be = J), Be < 1))
            return;
          m.maxLv != null && (Be = Math.min(Be, m.maxLv - d));
          const Xe = Po(m, d, Be),
            kt = Ae.fromNumber(Xe);
          if (o(kt)) for (let nt = 0; nt < Be; nt++) u(m.key);
        };
      return r.jsx(
        hr,
        {
          title: m.title,
          iconName: m.iconName,
          currentLabel: `Lv ${d}`,
          before: b,
          after: h ? void 0 : T,
          beforeSuffix: m.unit ?? '',
          currency: 'bolt',
          accent: 'primary',
          maxed: h,
          options: Ze,
          onUpgrade: rt,
        },
        m.key
      );
    }),
  });
}
function Dx() {
  const { navigate: c } = Ma(),
    s = (u) => {
      c(u);
    };
  return r.jsx(ql, {
    header: r.jsx($i, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: r.jsx(Vi, { active: 'machine', onChange: s }),
    children: r.jsx(Rx, {}),
  });
}
const Bx = () => r.jsx('div', { children: r.jsx('h1', { children: 'Not Found' }) }),
  Lx = '_content_14xiq_1',
  qx = { content: Lx },
  Hx = '_root_rujvy_1',
  Ux = '_header_rujvy_8',
  Gx = '_slotGrid_rujvy_14',
  Vx = '_emptyHint_rujvy_20',
  rs = { root: Hx, header: Ux, slotGrid: Gx, emptyHint: Vx },
  $x = '_wrapper_16mrg_3',
  Yx = '_filled_16mrg_16',
  kx = '_empty_16mrg_25',
  Zx = '_locked_16mrg_26',
  Xx = '_slotInner_16mrg_59',
  Qx = '_emptyIcon_16mrg_67',
  Kx = '_emptyLabel_16mrg_74',
  sl = {
    wrapper: $x,
    filled: Yx,
    empty: kx,
    locked: Zx,
    slotInner: Xx,
    emptyIcon: Qx,
    emptyLabel: Kx,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  },
  Jx = '_root_12m2l_3',
  Wx = '_selected_12m2l_15',
  Fx = '_merging_12m2l_19',
  Ix = '_locked_12m2l_23',
  Px = '_disabled_12m2l_28',
  e3 = '_card_12m2l_34',
  t3 = '_tierBadge_12m2l_46',
  a3 = '_count_12m2l_54',
  l3 = '_countZero_12m2l_74',
  n3 = '_iconWrap_12m2l_79',
  i3 = '_name_12m2l_90',
  c3 = '_detail_12m2l_102',
  s3 = '_trigger_12m2l_110',
  u3 = '_effect_12m2l_121',
  o3 = '_mergingBadge_12m2l_133',
  ct = {
    root: Jx,
    selected: Wx,
    merging: Fx,
    locked: Ix,
    disabled: Px,
    card: e3,
    tierBadge: t3,
    count: a3,
    countZero: l3,
    iconWrap: n3,
    name: i3,
    detail: c3,
    trigger: s3,
    effect: u3,
    mergingBadge: o3,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  r3 = { sm: 22, md: 26, lg: 32 },
  Wh = { sm: 38, md: 44, lg: 52 };
function pr({
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
  onClick: T,
}) {
  const z = Math.min(Math.max(1, Math.floor(u)), 5),
    q = `var(--c-patch-t${z})`,
    E = T != null && !_ && !y,
    U = h ? { boxShadow: 'var(--glow-cyan-md)' } : g ? { boxShadow: 'var(--glow-purple-md)' } : {},
    H = {
      width: Wh[b],
      height: Wh[b],
      opacity: y ? 0.35 : 1,
      background: y ? 'var(--c-surface)' : `linear-gradient(135deg, ${q}22, ${q}08)`,
      border: y ? '1px solid var(--c-border-faint)' : `1px solid ${q}55`,
      filter: y ? 'none' : `drop-shadow(0 0 4px ${q}55)`,
    },
    le = {
      background: o >= 2 ? `${q}22` : void 0,
      borderColor: o >= 2 ? q : void 0,
      color: o >= 2 ? q : void 0,
    };
  return r.jsx('div', {
    className: [
      ct.root,
      h ? ct.selected : '',
      g ? ct.merging : '',
      y ? ct.locked : '',
      _ ? ct.disabled : '',
      ct[`size-${b}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: U,
    onClick: E ? T : void 0,
    role: E ? 'button' : void 0,
    tabIndex: E ? 0 : void 0,
    onKeyDown: E
      ? (J) => {
          (J.key === 'Enter' || J.key === ' ') && (J.preventDefault(), T == null || T());
        }
      : void 0,
    'aria-pressed': E ? h : void 0,
    'aria-disabled': _ || y ? !0 : void 0,
    children: r.jsxs(Hl, {
      variant: 'elevated',
      padding: 'sm',
      interactive: E,
      className: ct.card,
      children: [
        !y &&
          r.jsx('span', {
            className: ct.tierBadge,
            children: r.jsx(Ts, { text: `T${z}`, variant: 'patch-tier', tier: u }),
          }),
        r.jsxs('span', {
          className: [ct.count, o === 0 ? ct.countZero : ''].filter(Boolean).join(' '),
          style: le,
          children: ['×', y ? '?' : o],
        }),
        r.jsx('div', {
          className: ct.iconWrap,
          style: H,
          children: r.jsx(Ee, {
            name: y ? 'close' : s,
            size: r3[b],
            color: y ? 'var(--c-text-disabled)' : q,
          }),
        }),
        r.jsx(V, {
          variant: 'caption',
          color: y ? 'dim' : 'text',
          className: ct.name,
          children: y ? '???' : c,
        }),
        !y &&
          r.jsxs('div', {
            className: ct.detail,
            children: [
              r.jsx('span', { className: ct.trigger, children: m }),
              r.jsx('span', { className: ct.effect, children: d }),
            ],
          }),
        g && r.jsx('span', { className: ct.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
function A0({ patch: c = null, slotIndex: s, locked: u = !1, size: o = 'md', onClick: m }) {
  const d = c != null,
    h = m != null && !u,
    g = s != null ? `Slot ${s}` : '',
    y = d
      ? `Slot ${s ?? ''}: ${c.name} (Tier ${c.tier})`
      : u
        ? `Slot ${s ?? ''} (locked)`.trim()
        : `Slot ${s ?? ''} (empty)`.trim(),
    _ = d ? sl.filled : u ? sl.locked : sl.empty;
  return r.jsx('div', {
    className: [sl.wrapper, _, sl[`size-${o}`]].filter(Boolean).join(' '),
    role: h ? 'button' : void 0,
    tabIndex: h ? 0 : void 0,
    'aria-label': y,
    'aria-disabled': u ? !0 : void 0,
    onClick: h ? m : void 0,
    onKeyDown: h
      ? (b) => {
          (b.key === 'Enter' || b.key === ' ') && (b.preventDefault(), m == null || m());
        }
      : void 0,
    children:
      d && c != null
        ? r.jsx(pr, {
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
            className: sl.slotInner,
            children: [
              r.jsx('span', {
                className: sl.emptyIcon,
                children: r.jsx(Ee, {
                  name: u ? 'close' : 'plus',
                  size: 28,
                  color: u ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              r.jsx('span', { className: sl.emptyLabel, children: u ? 'LOCKED' : g }),
            ],
          }),
  });
}
function f3(c) {
  return Math.min(1 + c, ps);
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
function v3({ overridePatches: c, overrideEquipped: s, overridePatchSlotsLv: u }) {
  const o = X((q) => q.patches),
    m = X((q) => q.equippedPatches),
    d = X((q) => q.machineLevels.patchSlots),
    h = X((q) => q.unequipPatch),
    g = c ?? o,
    y = s ?? m,
    b = f3(u ?? d),
    T = (q) => {
      const E = y.get(q);
      if (!E) return null;
      const U = `${E.name}#${E.tier}`,
        H = g.get(U);
      return {
        patchId: U,
        name: E.name,
        iconName: d3[E.name] ?? 'spark',
        tier: E.tier,
        trigger: m3[E.name] ?? '常時',
        effect: h3[E.name] ?? '-',
        count: (H == null ? void 0 : H.count) ?? 0,
      };
    },
    z = (q) => {
      y.get(q) && h(q);
    };
  return r.jsxs('div', {
    className: rs.root,
    children: [
      r.jsxs('div', {
        className: rs.header,
        children: [
          r.jsx(V, { variant: 'heading-3', children: '装着スロット' }),
          r.jsxs(V, { variant: 'caption', color: 'dim', children: [y.size, ' / ', b, ' 装着中'] }),
        ],
      }),
      r.jsx('div', {
        className: rs.slotGrid,
        children: Array.from({ length: ps }, (q, E) => {
          const U = E >= b,
            H = U ? null : T(E);
          return r.jsx(
            A0,
            { slotIndex: E + 1, patch: H, locked: U, size: 'md', onClick: U ? void 0 : () => z(E) },
            E
          );
        }),
      }),
      y.size === 0 &&
        b > 0 &&
        r.jsx(V, {
          variant: 'caption',
          color: 'dim',
          className: rs.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const g3 = '_root_16zq4_1',
  y3 = '_header_16zq4_8',
  _3 = '_grid_16zq4_14',
  p3 = '_empty_16zq4_20',
  Di = { root: g3, header: y3, grid: _3, empty: p3 },
  b3 = {
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
  S3 = {
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
  x3 = {
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
function j3({ overridePatches: c, overrideEquipped: s, selectedId: u, onSelect: o }) {
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
          children: r.jsx(V, {
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
              r.jsx(V, { variant: 'heading-3', children: 'パッチ在庫' }),
              r.jsxs(V, { variant: 'caption', color: 'dim', children: [_.length, ' 種類'] }),
            ],
          }),
          r.jsx('div', {
            className: Di.grid,
            children: _.map((b) => {
              const T = `${b.name}#${b.tier}`,
                z = y.has(b.name);
              return r.jsx(
                pr,
                {
                  patchId: T,
                  name: b.name,
                  iconName: b3[b.name] ?? 'spark',
                  tier: b.tier,
                  count: b.count,
                  trigger: S3[b.name] ?? '常時',
                  effect: x3[b.name] ?? '-',
                  selected: u === T,
                  locked: z,
                  onClick: o ? () => o(u === T ? null : T) : void 0,
                },
                T
              );
            }),
          }),
        ],
      });
}
const T3 = '_root_mnc8m_1',
  A3 = '_header_mnc8m_8',
  N3 = '_tierControl_mnc8m_14',
  E3 = '_tierStepperRow_mnc8m_24',
  z3 = '_mergeList_mnc8m_30',
  M3 = '_empty_mnc8m_36',
  wn = { root: T3, header: A3, tierControl: N3, tierStepperRow: E3, mergeList: z3, empty: M3 },
  C3 = '_stepper_1ouvh_1',
  w3 = '_disabled_1ouvh_6',
  O3 = '_btn_1ouvh_11',
  R3 = '_value_1ouvh_38',
  On = {
    stepper: C3,
    disabled: w3,
    btn: O3,
    value: R3,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  D3 = ({
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
      className: [On.stepper, On[`size-${d}`], h ? On.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        r.jsx('button', {
          type: 'button',
          className: On.btn,
          onClick: _,
          disabled: h || !g,
          'aria-label': '減少',
          children: '−',
        }),
        r.jsx('span', {
          className: On.value,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          children: c,
        }),
        r.jsx('button', {
          type: 'button',
          className: On.btn,
          onClick: b,
          disabled: h || !y,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  cr = 5,
  B3 = {
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
function N0(c, s) {
  const u = [];
  for (const o of c.values())
    o.tier < s &&
      o.count >= 2 &&
      u.push({ name: o.name, tier: o.tier, count: o.count, iconName: B3[o.name] ?? 'spark' });
  return u.sort((o, m) => o.tier - m.tier || o.name.localeCompare(m.name));
}
function L3(c, s) {
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
        T = ((b == null ? void 0 : b.count) ?? 0) + h;
      ((u = new Map(u)),
        g === 0 ? u.delete(d) : u.set(d, { ...m, count: g }),
        u.set(_, { name: m.name, tier: y, count: T }),
        (o = !0));
    }
  }
  return u;
}
function q3({ overridePatches: c }) {
  const s = X((z) => z.patches),
    u = X((z) => z.addPatch),
    o = X((z) => z.consumePatch),
    m = X((z) => z.pruneEmptyPatches),
    d = c ?? s,
    h = Math.max(1, ...Array.from(d.values()).map((z) => z.tier)),
    [g, y] = de.useState(Math.min(h, cr - 1)),
    _ = N0(d, g + 1),
    b = _.length > 0,
    T = () => {
      if (c) return;
      const z = L3(d, g + 1);
      for (const [q, E] of d) {
        const U = z.get(q),
          H = (U == null ? void 0 : U.count) ?? 0;
        H < E.count && o(E.name, E.tier, E.count - H);
      }
      for (const [q, E] of z) {
        const U = d.get(q),
          H = (U == null ? void 0 : U.count) ?? 0;
        E.count > H && u(E.name, E.tier, E.count - H);
      }
      m();
    };
  return r.jsxs('div', {
    className: wn.root,
    children: [
      r.jsx('div', {
        className: wn.header,
        children: r.jsx(V, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      r.jsxs('div', {
        className: wn.tierControl,
        children: [
          r.jsx(V, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          r.jsxs('div', {
            className: wn.tierStepperRow,
            children: [
              r.jsx(D3, { value: g, min: 1, max: cr - 1, onChange: y }),
              r.jsxs(V, {
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
                className: wn.mergeList,
                children: _.map((z) =>
                  r.jsx(
                    pr,
                    {
                      patchId: `${z.name}#${z.tier}`,
                      name: z.name,
                      iconName: z.iconName,
                      tier: z.tier,
                      count: z.count,
                      trigger: '-',
                      effect: '-',
                      merging: !0,
                      size: 'md',
                    },
                    `${z.name}#${z.tier}`
                  )
                ),
              }),
              r.jsx(_t, {
                label: `一括合成 (${_.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: T,
              }),
            ],
          })
        : r.jsxs('div', {
            className: wn.empty,
            children: [
              r.jsx(V, { variant: 'body', color: 'dim', children: '合成可能なパッチがありません' }),
              r.jsx(V, {
                variant: 'caption',
                color: 'dim',
                children: '同じ Tier のパッチが 2 個以上あると合成できます',
              }),
            ],
          }),
    ],
  });
}
function H3(c) {
  return Math.min(1 + c, ps);
}
function U3() {
  const { navigate: c } = Ma(),
    [s, u] = de.useState('equip'),
    o = X((q) => q.equippedPatches),
    m = X((q) => q.patches),
    d = X((q) => q.machineLevels.patchSlots),
    h = H3(d),
    g = o.size,
    y = m.size,
    _ = N0(m, 5).length,
    b = (q) => {
      c(q);
    },
    T = () => {
      c('preparation');
    },
    z = [
      { key: 'equip', label: '装着', badge: `${g}/${h}` },
      { key: 'inventory', label: '所持', badge: y > 0 ? y : void 0 },
      { key: 'merge', label: '合成', badge: _ > 0 ? _ : void 0 },
    ];
  return r.jsx(ql, {
    header: r.jsx($i, {
      title: 'パッチ庫',
      subtitle: `装着 ${g}/${h} ・ 在庫 ${y} 種`,
      onBack: T,
      currencies: [],
      tabBar: r.jsx(_s, { tabs: z, value: s, onChange: u, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(Vi, { active: 'patches', onChange: b }),
    children: r.jsxs('div', {
      className: qx.content,
      children: [
        s === 'equip' && r.jsx(v3, {}),
        s === 'inventory' && r.jsx(j3, {}),
        s === 'merge' && r.jsx(q3, {}),
      ],
    }),
  });
}
const G3 = '_footer_1ocpp_1',
  V3 = '_tabPanel_1ocpp_6',
  Fh = { footer: G3, tabPanel: V3 },
  $3 = '_wrapper_120xy_1',
  Y3 = '_header_120xy_7',
  k3 = '_headerLabel_120xy_13',
  Z3 = '_empty_120xy_18',
  X3 = '_emptyIcon_120xy_29',
  Q3 = '_grid_120xy_33',
  K3 = '_note_120xy_39',
  wl = { wrapper: $3, header: Y3, headerLabel: k3, empty: Z3, emptyIcon: X3, grid: Q3, note: K3 },
  J3 = {
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
function W3({ onOpenPatchScreen: c }) {
  const s = X((h) => h.equippedPatches),
    u = X((h) => h.machineLevels.patchSlots),
    o = Math.min(1 + u, ps),
    m = [];
  for (let h = 0; h < o; h++) {
    const g = s.get(h);
    if (g != null) {
      const y = J3[g.name],
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
    className: wl.wrapper,
    children: [
      r.jsxs('div', {
        className: wl.header,
        children: [
          r.jsxs(V, {
            variant: 'caption',
            color: 'mid',
            className: wl.headerLabel,
            children: ['装着 ', d, ' / ', o],
          }),
          c != null &&
            r.jsx(_t, {
              label: '装備変更',
              variant: 'ghost',
              size: 'sm',
              iconRight: r.jsx(Ee, { name: 'chevron-right', size: 14 }),
              onClick: c,
            }),
        ],
      }),
      d === 0
        ? r.jsxs('div', {
            className: wl.empty,
            children: [
              r.jsx('span', {
                className: wl.emptyIcon,
                children: r.jsx(Ee, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              r.jsx(V, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              c != null &&
                r.jsx(_t, {
                  label: 'パッチ庫を開く',
                  variant: 'secondary',
                  size: 'sm',
                  onClick: c,
                }),
            ],
          })
        : r.jsx('div', {
            className: wl.grid,
            children: m.map((h, g) =>
              r.jsx(A0, { patch: h.patch, slotIndex: h.idx, onClick: c }, g)
            ),
          }),
      r.jsx(V, {
        variant: 'caption',
        color: 'dim',
        align: 'center',
        as: 'p',
        className: wl.note,
        children: '変更はパッチ庫で行えます',
      }),
    ],
  });
}
const F3 = '_wrapper_1c3z0_1',
  I3 = '_header_1c3z0_7',
  P3 = '_grid_1c3z0_12',
  er = { wrapper: F3, header: I3, grid: P3 },
  e4 = [
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
function t4({ selectedWeapon: c, onSelect: s }) {
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
        children: r.jsx(V, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      r.jsx('div', {
        className: er.grid,
        children: e4.map((h) =>
          r.jsx(
            _0,
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
const a4 = '_wrapper_5dnkb_1',
  l4 = '_sticky_5dnkb_15',
  n4 = '_summary_5dnkb_19',
  i4 = '_weaponInfo_5dnkb_29',
  c4 = '_patchInfo_5dnkb_37',
  Bi = { wrapper: a4, sticky: l4, summary: n4, weaponInfo: i4, patchInfo: c4 };
function s4({
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
    className: [Bi.wrapper, d ? Bi.sticky : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Bi.summary,
        children: [
          c != null && r.jsx(Ts, { variant: 'tier', tier: c, size: 'sm' }),
          s != null &&
            r.jsxs('span', {
              className: Bi.weaponInfo,
              children: [
                r.jsx(Ee, { name: s, size: 14 }),
                r.jsx(V, { variant: 'label', color: 'primary', children: s.toUpperCase() }),
              ],
            }),
          r.jsxs('span', {
            className: Bi.patchInfo,
            children: [
              r.jsx(Ee, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              r.jsxs(V, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', u] }),
            ],
          }),
        ],
      }),
      r.jsx(_t, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: o,
        iconLeft: r.jsx(Ee, { name: 'triangle', size: 18 }),
        onClick: m,
      }),
    ],
  });
}
const u4 = '_wrapper_1onm1_1',
  o4 = '_header_1onm1_7',
  r4 = '_grid_1onm1_14',
  f4 = '_tierBtn_1onm1_20',
  d4 = '_active_1onm1_35',
  m4 = '_tierLabel_1onm1_50',
  h4 = '_frontierLabel_1onm1_61',
  Ol = {
    wrapper: u4,
    header: o4,
    grid: r4,
    tierBtn: f4,
    active: d4,
    tierLabel: m4,
    frontierLabel: h4,
  };
function v4({ selectedTier: c, onSelect: s }) {
  const u = X((h) => h.highestTier),
    o = Math.max(1, u),
    m = [];
  for (let h = 1; h <= o; h++) m.push(h);
  const d = (h) => `var(--c-tier-${Math.max(1, Math.min(10, h))})`;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': 'Tier 選択',
    className: Ol.wrapper,
    children: [
      r.jsxs('div', {
        className: Ol.header,
        children: [
          r.jsx(V, {
            variant: 'caption',
            color: 'mid',
            children: '到達済み Tier を選んで出撃します。',
          }),
          r.jsxs(V, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', o] }),
        ],
      }),
      r.jsx('div', {
        className: Ol.grid,
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
              className: [Ol.tierBtn, g ? Ol.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': _ },
              onClick: () => (s == null ? void 0 : s(h)),
              children: [
                r.jsxs('span', { className: Ol.tierLabel, children: ['T', h] }),
                y && !g && r.jsx('span', { className: Ol.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            h
          );
        }),
      }),
    ],
  });
}
const g4 = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function y4() {
  const { navigate: c } = Ma(),
    [s, u] = de.useState('tier'),
    o = X((z) => z.highestTier),
    [m, d] = de.useState(Math.max(1, o)),
    h = X((z) => z.initialWeapon),
    y = [...X((z) => z.equippedPatches).values()].length;
  function _() {
    c('battle');
  }
  const b = r.jsx($i, {
      title: '出撃準備',
      currencies: ['screw', 'bolt', 'alloy'],
      tabBar: r.jsx(_s, { tabs: g4, value: s, onChange: u, variant: 'underline', fullWidth: !0 }),
    }),
    T = r.jsxs('div', {
      className: Fh.footer,
      children: [
        r.jsx(s4, { tier: m, weaponKind: h, patchCount: y, sticky: !1, onLaunch: _ }),
        r.jsx(Vi, { active: 'preparation', onChange: (z) => c(z) }),
      ],
    });
  return r.jsx(ql, {
    header: b,
    footer: T,
    children: r.jsxs('div', {
      className: Fh.tabPanel,
      children: [
        s === 'tier' && r.jsx(v4, { selectedTier: m, onSelect: d }),
        s === 'weapon' && r.jsx(t4, {}),
        s === 'patches' && r.jsx(W3, { onOpenPatchScreen: () => c('patches') }),
      ],
    }),
  });
}
const _4 = '_content_iggfi_1',
  p4 = { content: _4 },
  b4 = '_root_1ouw6_1',
  S4 = '_header_1ouw6_8',
  x4 = '_storageCard_1ouw6_13',
  j4 = '_storageRow_1ouw6_23',
  T4 = '_divider_1ouw6_29',
  A4 = '_section_1ouw6_34',
  N4 = '_dangerSection_1ouw6_40',
  E4 = '_sectionHeader_1ouw6_50',
  $t = {
    root: b4,
    header: S4,
    storageCard: x4,
    storageRow: j4,
    divider: T4,
    section: A4,
    dangerSection: N4,
    sectionHeader: E4,
  },
  z4 = '_wrapper_11b89_1',
  M4 = '_disabled_11b89_6',
  C4 = '_hiddenInput_11b89_11',
  w4 = '_btn_11b89_15',
  O4 = '_fileName_11b89_41',
  Li = { wrapper: z4, disabled: M4, hiddenInput: C4, btn: w4, fileName: O4 },
  R4 = ({
    accept: c = 'application/json',
    onChange: s,
    label: u = 'ファイルを選択',
    disabled: o = !1,
  }) => {
    const m = de.useRef(null),
      [d, h] = de.useState(null),
      g = () => {
        var _;
        o || (_ = m.current) == null || _.click();
      },
      y = (_) => {
        var T;
        const b = ((T = _.target.files) == null ? void 0 : T[0]) ?? null;
        (h((b == null ? void 0 : b.name) ?? null), s(b), m.current && (m.current.value = ''));
      };
    return r.jsxs('div', {
      className: [Li.wrapper, o ? Li.disabled : ''].join(' '),
      children: [
        r.jsx('input', {
          ref: m,
          type: 'file',
          accept: c,
          className: Li.hiddenInput,
          onChange: y,
          disabled: o,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        r.jsx('button', {
          type: 'button',
          className: Li.btn,
          onClick: g,
          disabled: o,
          children: u,
        }),
        d && r.jsx('span', { className: Li.fileName, title: d, children: d }),
      ],
    });
  };
function D4({ storageInfo: c, onExport: s, onImport: u, onReset: o }) {
  const [m, d] = de.useState(!1),
    [h, g] = de.useState(!1),
    [y, _] = de.useState(!1),
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
    T = async (q) => {
      if (!(!q || !u)) {
        g(!0);
        try {
          await u(q);
        } finally {
          g(!1);
        }
      }
    },
    z = async () => {
      (d(!1), o && (await o()));
    };
  return r.jsxs('div', {
    className: $t.root,
    children: [
      r.jsx('div', {
        className: $t.header,
        children: r.jsx(V, { variant: 'heading-3', children: 'データ管理' }),
      }),
      c &&
        r.jsxs('div', {
          className: $t.storageCard,
          children: [
            r.jsx(V, { variant: 'label', color: 'mid', children: 'ストレージ使用量' }),
            r.jsxs('div', {
              className: $t.storageRow,
              children: [
                r.jsx(V, { variant: 'numeric-l', children: c.usedKb }),
                r.jsx(V, { variant: 'caption', color: 'dim', children: 'KB' }),
              ],
            }),
            r.jsxs(V, {
              variant: 'caption',
              color: 'dim',
              children: ['セーブスロット: ', c.slots, ' / 最終保存: ', c.lastSavedAt],
            }),
          ],
        }),
      r.jsx('div', { className: $t.divider }),
      r.jsxs('div', {
        className: $t.section,
        children: [
          r.jsxs('div', {
            className: $t.sectionHeader,
            children: [
              r.jsx(V, { variant: 'label', color: 'mid', children: 'エクスポート' }),
              r.jsx(V, {
                variant: 'caption',
                color: 'dim',
                children: 'セーブデータを JSON ファイルとしてダウンロード',
              }),
            ],
          }),
          r.jsx(_t, {
            label: y ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: b,
            disabled: y || !s,
          }),
        ],
      }),
      r.jsxs('div', {
        className: $t.section,
        children: [
          r.jsxs('div', {
            className: $t.sectionHeader,
            children: [
              r.jsx(V, { variant: 'label', color: 'mid', children: 'インポート' }),
              r.jsx(V, {
                variant: 'caption',
                color: 'dim',
                children: 'JSON ファイルからセーブデータを復元（上書き）',
              }),
            ],
          }),
          r.jsx(R4, {
            accept: 'application/json',
            onChange: T,
            label: h ? 'インポート中...' : 'ファイルを選択してインポート',
            disabled: h || !u,
          }),
        ],
      }),
      r.jsx('div', { className: $t.divider }),
      r.jsxs('div', {
        className: $t.dangerSection,
        children: [
          r.jsxs('div', {
            className: $t.sectionHeader,
            children: [
              r.jsx(V, { variant: 'label', color: 'mid', children: 'データリセット' }),
              r.jsx(V, {
                variant: 'caption',
                color: 'dim',
                children: 'すべてのデータを削除します。この操作は取り消せません。',
              }),
            ],
          }),
          r.jsx(_t, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => d(!0),
            disabled: !o,
          }),
        ],
      }),
      r.jsx(j0, {
        open: m,
        title: 'データをリセットしますか？',
        message: 'すべてのセーブデータが削除されます。この操作は取り消せません。',
        iconName: 'skull',
        confirmLabel: 'リセットする',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: z,
        onCancel: () => d(!1),
      }),
    ],
  });
}
const B4 = '_root_sysyb_1',
  L4 = '_header_sysyb_8',
  q4 = '_section_sysyb_13',
  H4 = '_sectionHeader_sysyb_20',
  U4 = '_divider_sysyb_26',
  Rn = { root: B4, header: L4, section: q4, sectionHeader: H4, divider: U4 },
  G4 = [
    { label: '×1', value: 1 },
    { label: '×2', value: 2 },
    { label: '×3', value: 3 },
  ];
function V4({ overrideVibration: c, overrideSpeed: s, onVibrationChange: u, onSpeedChange: o }) {
  const m = X((z) => z.vibrationEnabled),
    d = X((z) => z.defaultGameSpeed),
    h = X((z) => z.setVibrationEnabled),
    g = X((z) => z.setDefaultGameSpeed),
    y = c ?? m,
    _ = s ?? d,
    b = (z) => {
      u ? u(z) : h(z);
    },
    T = (z) => {
      o ? o(z) : g(z);
    };
  return r.jsxs('div', {
    className: Rn.root,
    children: [
      r.jsx('div', {
        className: Rn.header,
        children: r.jsx(V, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      r.jsx('div', {
        className: Rn.section,
        children: r.jsx(gr, {
          checked: y,
          onChange: b,
          label: 'バイブレーション',
          description: '操作時に端末を振動させます',
        }),
      }),
      r.jsx('div', { className: Rn.divider }),
      r.jsxs('div', {
        className: Rn.section,
        children: [
          r.jsxs('div', {
            className: Rn.sectionHeader,
            children: [
              r.jsx(V, { variant: 'label', color: 'mid', children: '初期速度倍率' }),
              r.jsx(V, { variant: 'caption', color: 'dim', children: 'ゲーム開始時の速度' }),
            ],
          }),
          r.jsx(x0, { options: G4, value: _, onChange: T }),
        ],
      }),
    ],
  });
}
const $4 = '_root_ihb90_2',
  Y4 = '_muteRow_ihb90_9',
  k4 = '_muteLabelGroup_ihb90_16',
  Z4 = '_sliderRow_ihb90_24',
  X4 = '_muted_ihb90_29',
  Q4 = '_sliderIcon_ihb90_29',
  K4 = '_sliderArea_ihb90_41',
  J4 = '_sliderValue_ihb90_46',
  ol = {
    root: $4,
    muteRow: Y4,
    muteLabelGroup: k4,
    sliderRow: Z4,
    muted: X4,
    sliderIcon: Q4,
    sliderArea: K4,
    sliderValue: J4,
  };
function W4(c) {
  return 440 * Math.pow(2, (c - 69) / 12);
}
const F4 = {
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
function R(c) {
  const s = c.match(/^([A-G]#?b?)(\d)$/);
  if (!s) throw new Error(`Invalid note: ${c}`);
  const u = F4[s[1]];
  if (u === void 0) throw new Error(`Invalid note name: ${s[1]}`);
  const m = 12 + parseInt(s[2], 10) * 12 + u;
  return W4(m);
}
(R('A2'),
  R('B2'),
  R('C3'),
  R('D3'),
  R('E3'),
  R('F3'),
  R('G3'),
  R('A3'),
  R('B3'),
  R('C4'),
  R('D4'),
  R('E4'),
  R('F4'),
  R('G4'),
  R('A4'));
(R('E2'),
  R('F#2'),
  R('G2'),
  R('A2'),
  R('B2'),
  R('C3'),
  R('D3'),
  R('E3'),
  R('F#3'),
  R('G3'),
  R('A3'),
  R('B3'),
  R('C4'),
  R('D4'),
  R('E4'));
const I4 = [R('A2'), R('C3'), R('E3')],
  P4 = [R('E2'), R('G2'), R('B2')];
(R('D3'), R('F3'), R('A3'));
const e5 = [R('G2'), R('B2'), R('D3')],
  t5 = [R('C3'), R('E3'), R('G3')],
  a5 = [R('B2'), R('D3'), R('F3')];
function Yt(c, s, u, o, m, d, h, g) {
  const y = c.createOscillator(),
    _ = c.createGain();
  ((y.type = u), y.frequency.setValueAtTime(o, m));
  const b = 0.01,
    T = Math.min(0.08, d * 0.4);
  if (
    (_.gain.setValueAtTime(1e-4, m),
    _.gain.linearRampToValueAtTime(h, m + b),
    _.gain.setValueAtTime(h, m + d - T),
    _.gain.exponentialRampToValueAtTime(1e-4, m + d),
    g !== void 0)
  ) {
    const z = c.createBiquadFilter();
    ((z.type = 'lowpass'),
      (z.frequency.value = g),
      (z.Q.value = 0.8),
      y.connect(z).connect(_).connect(s));
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
function Gi(c, s, u, o) {
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
function l5(c, s, u, o, m) {
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
const n5 = 100,
  Rl = 60 / n5,
  Hi = Rl * 4,
  E0 = 8,
  i5 = Hi * E0,
  c5 = 2,
  s5 = 100,
  u5 = [R('A2'), R('A2'), R('G2'), R('G2'), R('C3'), R('C3'), R('E2'), R('E2')],
  Ih = [R('A3'), R('C4'), R('E4'), R('A4'), R('G4'), R('E4'), R('C4'), R('A3')],
  Ph = [
    [R('A3'), R('C4'), R('E4')],
    [R('G3'), R('B3'), R('D4')],
    [R('C3'), R('E3'), R('G3')],
    [R('E3'), R('G3'), R('B3')],
  ];
function o5(c, s, u, o) {
  for (let m = 0; m < E0; m++) {
    const d = u + m * Hi,
      h = u5[m];
    (Yt(c, s, 'sawtooth', h, d, Rl * 1.8, 0.22, 300),
      Yt(c, s, 'sawtooth', h, d + Rl * 2, Rl * 1.8, 0.22, 300),
      Gi(c, s, d, 0.35),
      Gi(c, s, d + Rl * 2, 0.28));
    for (let g = 0; g < 8; g++) {
      const y = (m * 8 + g) % Ih.length,
        _ = d + g * Rl * 0.5;
      Yt(c, s, 'square', Ih[y], _, Rl * 0.4, 0.07, 2400);
    }
  }
  for (let m = 0; m < Ph.length; m++) {
    const d = Ph[m],
      h = u + m * Hi * 2,
      g = Hi * 2;
    for (const y of d) {
      const _ = c.createOscillator(),
        b = c.createGain();
      ((_.type = 'triangle'), _.frequency.setValueAtTime(y, h));
      const T = 0.08;
      (b.gain.setValueAtTime(1e-4, h),
        b.gain.linearRampToValueAtTime(T, h + 0.15),
        b.gain.setValueAtTime(T, h + g - 0.2),
        b.gain.exponentialRampToValueAtTime(1e-4, h + g),
        _.connect(b).connect(s),
        _.start(h),
        _.stop(h + g + 0.05),
        o.push(_));
    }
  }
}
function r5(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + c5 * Hi;
    for (; u < g; ) (o5(c, s, u, m), (u += i5));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, s5)));
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
const f5 = 100,
  Na = 60 / f5,
  br = Na * 4,
  z0 = 8,
  ul = br * z0,
  d5 = 2,
  m5 = 100,
  e0 = [R('E5'), R('D5'), R('B4'), R('G4'), R('F#4'), R('E4'), R('D4'), R('B3')];
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
    Yt(c, s, 'sine', 120, u, 0.12, o * 0.5, 300));
}
function h5(c, s, u, o) {
  {
    const d = c.createOscillator(),
      h = c.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(R('E1'), u));
    const g = 0.35;
    (h.gain.setValueAtTime(1e-4, u),
      h.gain.linearRampToValueAtTime(g, u + 0.3),
      h.gain.setValueAtTime(g, u + ul - 0.3),
      h.gain.linearRampToValueAtTime(1e-4, u + ul));
    const y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 120),
      d.connect(y).connect(h).connect(s),
      d.start(u),
      d.stop(u + ul + 0.05),
      o.push(d));
  }
  for (let d = 0; d < z0; d++) {
    const h = u + d * br;
    for (let g = 0; g < 4; g++) {
      const y = h + g * Na;
      (Yt(c, s, 'sawtooth', R('E2'), y, Na * 0.9, 0.22, 400),
        Yt(c, s, 'sawtooth', R('B2'), y, Na * 0.8, 0.1, 600));
    }
    (Gi(c, s, h, 0.5),
      Gi(c, s, h + Na * 2, 0.45),
      t0(c, s, h + Na, 0.4),
      t0(c, s, h + Na * 3, 0.38));
  }
  const m = [...a5, R('C4')];
  for (const d of m) {
    const h = c.createOscillator(),
      g = c.createGain();
    ((h.type = 'sawtooth'), h.frequency.setValueAtTime(d, u));
    const y = 0.07;
    (g.gain.setValueAtTime(1e-4, u),
      g.gain.linearRampToValueAtTime(y, u + 0.8),
      g.gain.setValueAtTime(y, u + ul - 0.8),
      g.gain.exponentialRampToValueAtTime(1e-4, u + ul));
    const _ = c.createBiquadFilter();
    ((_.type = 'lowpass'),
      (_.frequency.value = 900),
      h.connect(_).connect(g).connect(s),
      h.start(u),
      h.stop(u + ul + 0.05),
      o.push(h));
  }
  for (let d = 0; d < e0.length; d++) {
    const h = u + d * Na * 2;
    Yt(c, s, 'sawtooth', e0[d], h, Na * 1.6, 0.08, 2e3);
  }
  {
    const d = c.createBufferSource();
    d.buffer = Yi(c, ul + 0.1);
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
function v5(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + d5 * br;
    for (; u < g; ) (h5(c, s, u, m), (u += ul));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, m5)));
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
const g5 = 120,
  Ea = 60 / g5,
  Sr = Ea * 4,
  M0 = 8,
  ms = Sr * M0,
  y5 = 2,
  _5 = 100,
  p5 = [R('E2'), R('E2'), R('D2'), R('D2'), R('E2'), R('E2'), R('B1'), R('B1')],
  a0 = [
    R('E4'),
    R('G4'),
    R('B4'),
    R('D5'),
    R('E5'),
    R('D5'),
    R('B4'),
    R('G4'),
    R('E4'),
    R('F#4'),
    R('G4'),
    R('A4'),
    R('B4'),
    R('A4'),
    R('G4'),
    R('F#4'),
  ];
function l0(c, s, u, o) {
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
    Yt(c, s, 'triangle', 200, u, 0.08, o * 0.4));
}
function b5(c, s, u, o) {
  for (let d = 0; d < M0; d++) {
    const h = u + d * Sr,
      g = p5[d];
    for (let y = 0; y < 4; y++) Yt(c, s, 'sawtooth', g, h + y * Ea, Ea * 0.85, 0.26, 280);
    for (let y = 0; y < 4; y++) Gi(c, s, h + y * Ea, 0.42);
    (l0(c, s, h + Ea, 0.3), l0(c, s, h + Ea * 3, 0.3));
    for (let y = 0; y < 8; y++) l5(c, s, h + y * Ea * 0.5, 0.12, 0.08);
    for (let y = 0; y < 16; y++) {
      const _ = (d * 16 + y) % a0.length,
        b = h + y * Ea * 0.25;
      Yt(c, s, 'sawtooth', a0[_], b, Ea * 0.22, 0.06, 3200);
    }
  }
  const m = [R('E3'), R('G3'), R('B3')];
  for (const d of m) {
    const h = c.createOscillator(),
      g = c.createGain();
    ((h.type = 'triangle'),
      h.frequency.setValueAtTime(d, u),
      g.gain.setValueAtTime(1e-4, u),
      g.gain.linearRampToValueAtTime(0.06, u + 0.2),
      g.gain.setValueAtTime(0.06, u + ms - 0.3),
      g.gain.exponentialRampToValueAtTime(1e-4, u + ms));
    const y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 1200),
      h.connect(y).connect(g).connect(s),
      h.start(u),
      h.stop(u + ms + 0.05),
      o.push(h));
  }
}
function S5(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + y5 * Sr;
    for (; u < g; ) (b5(c, s, u, m), (u += ms));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, _5)));
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
const x5 = 80,
  hs = 60 / x5,
  ys = hs * 4,
  j5 = 8,
  vs = ys * j5,
  T5 = 2,
  A5 = 100,
  n0 = [I4, t5, e5, P4],
  tr = [R('A3'), R('C4'), R('E4'), R('G4'), R('A4'), R('E4')];
function N5(c, s, u, o) {
  {
    const m = c.createOscillator(),
      d = c.createGain();
    ((m.type = 'sine'), m.frequency.setValueAtTime(R('A2'), u));
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
  for (let m = 0; m < n0.length; m++) {
    const d = n0[m],
      h = u + m * ys * 2,
      g = ys * 2;
    for (const y of d) {
      const _ = c.createOscillator(),
        b = c.createGain();
      ((_.type = 'triangle'), _.frequency.setValueAtTime(y, h));
      const T = 0.1,
        z = 0.4,
        q = 0.6;
      (b.gain.setValueAtTime(1e-4, h),
        b.gain.linearRampToValueAtTime(T, h + z),
        b.gain.setValueAtTime(T, h + g - q),
        b.gain.exponentialRampToValueAtTime(1e-4, h + g));
      const E = c.createDelay(0.5);
      E.delayTime.value = 0.25;
      const U = c.createGain();
      U.gain.value = 0.2;
      const H = c.createBiquadFilter();
      ((H.type = 'lowpass'),
        (H.frequency.value = 2e3),
        _.connect(b).connect(s),
        _.connect(E).connect(H).connect(U).connect(s),
        _.start(h),
        _.stop(h + g + 0.5),
        o.push(_));
    }
  }
  for (let m = 0; m < tr.length; m++) {
    const d = u + m * hs * 2;
    (Yt(c, s, 'sawtooth', tr[m], d, hs * 1.5, 0.09, 1800),
      Yt(c, s, 'sine', tr[m] * 0.5, d + 0.12, hs * 1.2, 0.05, 600));
  }
}
function E5(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const g = c.currentTime + T5 * ys;
    for (; u < g; ) (N5(c, s, u, m), (u += vs));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, A5)));
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
function z5(c, s, u) {
  switch (c) {
    case 'title':
      return E5(s, u);
    case 'base':
      return r5(s, u);
    case 'battleNormal':
      return S5(s, u);
    case 'battleBoss':
      return v5(s, u);
  }
}
function M5(c, s) {
  const u = Math.max(1, Math.floor(c.sampleRate * s)),
    o = c.createBuffer(1, u, c.sampleRate),
    m = o.getChannelData(0);
  for (let d = 0; d < u; d++) m[d] = Math.random() * 2 - 1;
  return o;
}
function It(c, s, u, o, m) {
  const d = c.gain;
  (d.setValueAtTime(1e-4, s),
    d.linearRampToValueAtTime(u, s + o),
    d.exponentialRampToValueAtTime(1e-4, s + o + m));
}
function re(c, s, u, o, m, d, h, g, y) {
  const _ = c.createOscillator(),
    b = c.createGain();
  ((_.type = u),
    _.frequency.setValueAtTime(o, m),
    y !== void 0 && _.frequency.exponentialRampToValueAtTime(Math.max(1e-4, y), m + h + g),
    It(b, m, d, h, g),
    _.connect(b).connect(s),
    _.start(m),
    _.stop(m + h + g + 0.02));
}
function Pt(c, s, u, o, m, d) {
  const h = c.createBufferSource();
  h.buffer = M5(c, u);
  const g = c.createGain();
  if ((It(g, o, m, 0.002, u), d)) {
    const y = c.createBiquadFilter();
    ((y.type = d.type),
      (y.frequency.value = d.frequency),
      d.q !== void 0 && (y.Q.value = d.q),
      h.connect(y).connect(g).connect(s));
  } else h.connect(g).connect(s);
  h.start(o);
}
const C5 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createOscillator(),
      d = c.createGain();
    ((o.type = 'sawtooth'),
      (m.type = 'sawtooth'),
      o.frequency.setValueAtTime(900, u),
      o.frequency.exponentialRampToValueAtTime(1500, u + 0.5),
      m.frequency.setValueAtTime(905, u),
      m.frequency.exponentialRampToValueAtTime(1510, u + 0.5),
      It(d, u, 0.28, 0.02, 0.5),
      o.connect(d),
      m.connect(d),
      d.connect(s),
      o.start(u),
      m.start(u),
      o.stop(u + 0.55),
      m.stop(u + 0.55));
  },
  w5 = (c, s, u) => {
    for (let o = 0; o < 4; o++) {
      const m = u + o * 0.12;
      (re(c, s, 'sine', 110, m, 0.4, 0.005, 0.18, 35),
        Pt(c, s, 0.08, m, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  O5 = (c, s, u) => {
    (Pt(c, s, 0.4, u, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      re(c, s, 'triangle', 3e3, u, 0.25, 0.005, 0.15, 1500),
      re(c, s, 'sawtooth', 200, u + 0.05, 0.18, 0.005, 0.3, 80));
  },
  R5 = (c, s, u) => {
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
        It(h, m, 0.2, 0.002, 0.06),
        d.connect(g).connect(h).connect(s),
        d.start(m),
        d.stop(m + 0.08));
    }
  },
  D5 = (c, s, u) => {
    (Pt(c, s, 0.1, u, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      re(c, s, 'triangle', 500, u, 0.18, 0.003, 0.08, 200));
  },
  B5 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(80, u),
      o.frequency.linearRampToValueAtTime(160, u + 0.8),
      It(m, u, 0.3, 0.1, 0.7),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.85),
      re(c, s, 'square', 320, u + 0.2, 0.15, 0.02, 0.4));
  },
  L5 = (c, s, u) => {
    (Pt(c, s, 0.5, u, 0.45, { type: 'lowpass', frequency: 1200 }),
      re(c, s, 'sine', 90, u, 0.5, 0.005, 0.6, 30),
      re(c, s, 'triangle', 1200, u + 0.1, 0.2, 0.02, 0.4, 2400),
      re(c, s, 'triangle', 1600, u + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  q5 = (c, s, u) => {
    (re(c, s, 'sine', 180, u, 0.3, 0.005, 0.12, 60),
      Pt(c, s, 0.08, u, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  H5 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(220, u),
      o.frequency.exponentialRampToValueAtTime(40, u + 1.2),
      It(m, u, 0.45, 0.02, 1.2),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 1.3),
      Pt(c, s, 0.8, u, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  U5 = (c, s, u) => {
    (re(c, s, 'triangle', 700, u, 0.22, 0.01, 0.18),
      re(c, s, 'triangle', 1050, u + 0.12, 0.22, 0.01, 0.22));
  },
  G5 = (c, s, u) => {
    (re(c, s, 'triangle', 600, u, 0.25, 0.01, 0.2),
      re(c, s, 'triangle', 900, u + 0.12, 0.25, 0.01, 0.2),
      re(c, s, 'triangle', 1350, u + 0.24, 0.3, 0.01, 0.45),
      re(c, s, 'sine', 2400, u + 0.3, 0.15, 0.02, 0.5));
  },
  V5 = (c, s, u) => {
    (re(c, s, 'triangle', 600, u, 0.28, 0.01, 0.18),
      re(c, s, 'triangle', 750, u + 0.12, 0.28, 0.01, 0.18),
      re(c, s, 'triangle', 900, u + 0.24, 0.28, 0.01, 0.22),
      re(c, s, 'triangle', 1200, u + 0.36, 0.32, 0.01, 0.5),
      re(c, s, 'sine', 2400, u + 0.42, 0.18, 0.02, 0.6));
  },
  $5 = (c, s, u) => {
    (re(c, s, 'sawtooth', 300, u, 0.3, 0.02, 0.4, 220),
      re(c, s, 'sawtooth', 220, u + 0.35, 0.3, 0.02, 0.5, 160),
      re(c, s, 'sawtooth', 160, u + 0.8, 0.3, 0.02, 0.7, 80),
      Pt(c, s, 1, u, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  Y5 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(700, u),
      o.frequency.exponentialRampToValueAtTime(400, u + 0.4),
      It(m, u, 0.22, 0.02, 0.4),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.45),
      Pt(c, s, 0.5, u, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  k5 = (c, s, u) => {
    re(c, s, 'triangle', 1e3, u, 0.18, 0.003, 0.05);
  },
  Z5 = (c, s, u) => {
    (re(c, s, 'triangle', 880, u, 0.2, 0.005, 0.08),
      re(c, s, 'triangle', 1320, u + 0.06, 0.2, 0.005, 0.12));
  },
  X5 = (c, s, u) => {
    (re(c, s, 'square', 260, u, 0.18, 0.005, 0.07),
      re(c, s, 'square', 200, u + 0.06, 0.18, 0.005, 0.1));
  },
  Q5 = (c, s, u) => {
    re(c, s, 'triangle', 1400, u, 0.12, 0.003, 0.04);
  },
  K5 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(500, u),
      o.frequency.exponentialRampToValueAtTime(1e3, u + 0.12),
      It(m, u, 0.18, 0.01, 0.12),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.15));
  },
  J5 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(1e3, u),
      o.frequency.exponentialRampToValueAtTime(500, u + 0.1),
      It(m, u, 0.16, 0.005, 0.1),
      o.connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.13));
  },
  W5 = (c, s, u) => {
    (re(c, s, 'sawtooth', 200, u, 0.3, 0.01, 0.35, 80),
      re(c, s, 'triangle', 600, u + 0.05, 0.22, 0.01, 0.3, 1200),
      re(c, s, 'triangle', 1200, u + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  F5 = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain(),
      d = c.createBiquadFilter();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(1600, u),
      o.frequency.exponentialRampToValueAtTime(700, u + 0.08),
      (d.type = 'highpass'),
      (d.frequency.value = 800),
      It(m, u, 0.22, 0.003, 0.09),
      o.connect(d).connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.12));
  },
  I5 = (c, s, u) => {
    (re(c, s, 'sine', 130, u, 0.5, 0.01, 0.28, 40),
      Pt(c, s, 0.12, u, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  P5 = (c, s, u) => {
    (Pt(c, s, 0.18, u, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      re(c, s, 'triangle', 2200, u, 0.15, 0.002, 0.06, 1800));
  },
  ej = (c, s, u) => {
    const o = c.createOscillator(),
      m = c.createGain(),
      d = c.createBiquadFilter();
    ((o.type = 'square'),
      o.frequency.setValueAtTime(900, u),
      o.frequency.exponentialRampToValueAtTime(1400, u + 0.05),
      (d.type = 'bandpass'),
      (d.frequency.value = 1500),
      (d.Q.value = 3),
      It(m, u, 0.18, 0.002, 0.07),
      o.connect(d).connect(m).connect(s),
      o.start(u),
      o.stop(u + 0.1),
      Pt(c, s, 0.05, u, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  tj = (c, s, u) => {
    (re(c, s, 'triangle', 700, u, 0.18, 0.005, 0.05),
      re(c, s, 'triangle', 1050, u + 0.04, 0.18, 0.005, 0.06));
  },
  aj = {
    laserShoot: F5,
    cannonShoot: I5,
    thunderShoot: P5,
    cutterShoot: ej,
    weaponSwitch: tj,
    activeLaser: C5,
    activeCannon: w5,
    activeThunder: O5,
    activeCutter: R5,
    enemyKill: D5,
    bossWarn: B5,
    bossKill: L5,
    machineHit: q5,
    machineDown: H5,
    waveClear: U5,
    tierClear: G5,
    tap: k5,
    purchaseOk: Z5,
    reject: X5,
    tabSwitch: Q5,
    dialogOpen: K5,
    dialogClose: J5,
    launch: W5,
    resultClear: V5,
    resultGameOver: $5,
    resultRetreat: Y5,
  },
  lj = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function i0(c) {
  return Math.max(0, Math.min(1, c));
}
class nj {
  constructor() {
    Kt(this, 'ctx', null);
    Kt(this, 'seGain', null);
    Kt(this, 'bgmGain', null);
    Kt(this, 'masterGain', null);
    Kt(this, 'lastPlayAt', new Map());
    Kt(this, 'seVolume', 0.7);
    Kt(this, 'bgmVolume', 0.5);
    Kt(this, 'currentBgm', null);
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
      o = lj[s];
    if (o !== void 0) {
      const d = this.lastPlayAt.get(s) ?? 0;
      if (u - d < o) return;
      this.lastPlayAt.set(s, u);
    }
    const m = aj[s];
    m(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(s) {
    ((this.seVolume = i0(s)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(s) {
    ((this.bgmVolume = i0(s)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
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
    const u = z5(s, this.ctx, this.bgmGain);
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
const fs = new nj();
function c0({ label: c, iconName: s, value: u, muted: o, onChange: m }) {
  return r.jsx(Hl, {
    variant: 'sunken',
    padding: 'md',
    children: r.jsxs('div', {
      className: [ol.sliderRow, o ? ol.muted : ''].filter(Boolean).join(' '),
      children: [
        r.jsx('span', { className: ol.sliderIcon, children: r.jsx(Ee, { name: s, size: 16 }) }),
        r.jsx(V, { variant: 'label', color: o ? 'dim' : 'mid', children: c }),
        r.jsx('div', {
          className: ol.sliderArea,
          children: r.jsx(ir, { value: u, min: 0, max: 1, step: 0.01, onChange: m, disabled: o }),
        }),
        r.jsx('span', {
          className: ol.sliderValue,
          children: r.jsx(Ll, {
            value: Math.round(u * 100),
            size: 'sm',
            accentColor: o ? 'dim' : 'text',
          }),
        }),
      ],
    }),
  });
}
function ij({
  overrideBgmVolume: c,
  overrideSeVolume: s,
  overrideMute: u,
  onBgmChange: o,
  onSeChange: m,
  onMuteChange: d,
}) {
  const h = X((H) => H.bgmVolume),
    g = X((H) => H.seVolume),
    y = X((H) => H.setBgmVolume),
    _ = X((H) => H.setSeVolume),
    b = c ?? h,
    T = s ?? g,
    z = u ?? !1,
    q = (H) => {
      o ? o(H) : (y(H), fs.setBgmVolume(z ? 0 : H));
    },
    E = (H) => {
      m ? m(H) : (_(H), fs.setSeVolume(z ? 0 : H));
    },
    U = (H) => {
      d ? d(H) : (fs.setBgmVolume(H ? 0 : b), fs.setSeVolume(H ? 0 : T));
    };
  return r.jsxs('div', {
    className: ol.root,
    role: 'tabpanel',
    'aria-label': 'サウンド設定',
    children: [
      r.jsx(Hl, {
        variant: 'sunken',
        padding: 'md',
        children: r.jsxs('div', {
          className: ol.muteRow,
          children: [
            r.jsxs('span', {
              className: ol.muteLabelGroup,
              children: [
                r.jsx(V, { variant: 'label', color: 'mid', children: 'ミュート' }),
                r.jsx(V, { variant: 'caption', color: 'dim', children: '全サウンドを一時停止' }),
              ],
            }),
            r.jsx(gr, { checked: z, onChange: U, accent: 'primary' }),
          ],
        }),
      }),
      r.jsx(c0, { label: 'BGM', iconName: 'play', value: b, muted: z, onChange: q }),
      r.jsx(c0, { label: 'SE', iconName: 'spark', value: T, muted: z, onChange: E }),
    ],
  });
}
const sr = (c, s) => s.some((u) => c instanceof u);
let s0, u0;
function cj() {
  return s0 || (s0 = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function sj() {
  return (
    u0 ||
    (u0 = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const ur = new WeakMap(),
  ar = new WeakMap(),
  Ns = new WeakMap();
function uj(c) {
  const s = new Promise((u, o) => {
    const m = () => {
        (c.removeEventListener('success', d), c.removeEventListener('error', h));
      },
      d = () => {
        (u(Bl(c.result)), m());
      },
      h = () => {
        (o(c.error), m());
      };
    (c.addEventListener('success', d), c.addEventListener('error', h));
  });
  return (Ns.set(s, c), s);
}
function oj(c) {
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
    return Bl(c[s]);
  },
  set(c, s, u) {
    return ((c[s] = u), !0);
  },
  has(c, s) {
    return c instanceof IDBTransaction && (s === 'done' || s === 'store') ? !0 : s in c;
  },
};
function C0(c) {
  or = c(or);
}
function rj(c) {
  return sj().includes(c)
    ? function (...s) {
        return (c.apply(rr(this), s), Bl(this.request));
      }
    : function (...s) {
        return Bl(c.apply(rr(this), s));
      };
}
function fj(c) {
  return typeof c == 'function'
    ? rj(c)
    : (c instanceof IDBTransaction && oj(c), sr(c, cj()) ? new Proxy(c, or) : c);
}
function Bl(c) {
  if (c instanceof IDBRequest) return uj(c);
  if (ar.has(c)) return ar.get(c);
  const s = fj(c);
  return (s !== c && (ar.set(c, s), Ns.set(s, c)), s);
}
const rr = (c) => Ns.get(c);
function dj(c, s, { blocked: u, upgrade: o, blocking: m, terminated: d } = {}) {
  const h = indexedDB.open(c, s),
    g = Bl(h);
  return (
    o &&
      h.addEventListener('upgradeneeded', (y) => {
        o(Bl(h.result), y.oldVersion, y.newVersion, Bl(h.transaction), y);
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
const mj = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  hj = ['put', 'add', 'delete', 'clear'],
  lr = new Map();
function o0(c, s) {
  if (!(c instanceof IDBDatabase && !(s in c) && typeof s == 'string')) return;
  if (lr.get(s)) return lr.get(s);
  const u = s.replace(/FromIndex$/, ''),
    o = s !== u,
    m = hj.includes(u);
  if (!(u in (o ? IDBIndex : IDBObjectStore).prototype) || !(m || mj.includes(u))) return;
  const d = async function (h, ...g) {
    const y = this.transaction(h, m ? 'readwrite' : 'readonly');
    let _ = y.store;
    return (o && (_ = _.index(g.shift())), (await Promise.all([_[u](...g), m && y.done]))[0]);
  };
  return (lr.set(s, d), d);
}
C0((c) => ({
  ...c,
  get: (s, u, o) => o0(s, u) || c.get(s, u, o),
  has: (s, u) => !!o0(s, u) || c.has(s, u),
}));
const vj = ['continue', 'continuePrimaryKey', 'advance'],
  r0 = {},
  fr = new WeakMap(),
  w0 = new WeakMap(),
  gj = {
    get(c, s) {
      if (!vj.includes(s)) return c[s];
      let u = r0[s];
      return (
        u ||
          (u = r0[s] =
            function (...o) {
              fr.set(this, w0.get(this)[s](...o));
            }),
        u
      );
    },
  };
async function* yj(...c) {
  let s = this;
  if ((s instanceof IDBCursor || (s = await s.openCursor(...c)), !s)) return;
  s = s;
  const u = new Proxy(s, gj);
  for (w0.set(u, s), Ns.set(u, rr(s)); s; )
    (yield u, (s = await (fr.get(u) || s.continue())), fr.delete(u));
}
function f0(c, s) {
  return (
    (s === Symbol.asyncIterator && sr(c, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (s === 'iterate' && sr(c, [IDBIndex, IDBObjectStore]))
  );
}
C0((c) => ({
  ...c,
  get(s, u, o) {
    return f0(s, u) ? yj : c.get(s, u, o);
  },
  has(s, u) {
    return f0(s, u) || c.has(s, u);
  },
}));
const _j = {
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
function pj(c, s, u, o) {
  for (let m = u + 1; m <= o; m++) {
    const d = _j[m];
    if (!d) throw new Error(`No migration registered for version ${m}`);
    d(c, s);
  }
}
let qi = null;
async function d0() {
  return (
    qi ||
    ((qi = await dj(v0, gs, {
      upgrade(c, s, u, o) {
        try {
          pj(c, o, s, u ?? gs);
        } catch (m) {
          throw (console.error('[DB] Migration failed:', m), m);
        }
      },
    })),
    await bj(qi),
    qi)
  );
}
async function bj(c) {
  const s = c.transaction([Q.profile, Q.currencies, Q.machine, Q.weapons, Q.settings], 'readwrite'),
    [u, o, m, d] = await Promise.all([
      s.objectStore(Q.profile).get('singleton'),
      s.objectStore(Q.currencies).get('singleton'),
      s.objectStore(Q.weapons).get('singleton'),
      s.objectStore(Q.settings).get('singleton'),
    ]),
    h = Date.now(),
    g = [];
  (u || g.push(s.objectStore(Q.profile).put({ ...m_, createdAt: h, lastPlayedAt: h })),
    o || g.push(s.objectStore(Q.currencies).put(h_)),
    m || g.push(s.objectStore(Q.weapons).put(v_)),
    d || g.push(s.objectStore(Q.settings).put(g_)));
  const y = s.objectStore(Q.machine),
    _ = await y.getAllKeys(),
    b = new Set(_);
  for (const T of g0) b.has(T) || g.push(y.put({ key: T, lv: 0 }));
  (await Promise.all(g), await s.done);
}
async function Sj(c) {
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
const O0 = 'tower-like-game:import-backups',
  xj = 3;
function jj() {
  try {
    const c = localStorage.getItem(O0);
    return c ? JSON.parse(c) : [];
  } catch {
    return [];
  }
}
function Tj(c) {
  try {
    localStorage.setItem(O0, JSON.stringify(c));
  } catch (s) {
    console.warn('[DB] Failed to save backup to localStorage:', s);
  }
}
function Aj(c) {
  const s = jj();
  s.unshift({ savedAt: Date.now(), data: c });
  const u = s.slice(0, xj);
  Tj(u);
}
async function R0(c) {
  const s = await Sj(c);
  return { formatVersion: 1, dbVersion: gs, exportedAt: Date.now(), data: s };
}
async function Nj(c, s) {
  if (s.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${s.formatVersion}`);
  try {
    const d = await R0(c);
    Aj(d);
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
const Ej = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function zj() {
  const { navigate: c } = Ma(),
    [s, u] = de.useState('sound'),
    o = async () => {
      const h = await d0(),
        g = await R0(h),
        y = JSON.stringify(g, null, 2),
        _ = new Blob([y], { type: 'application/json' }),
        b = URL.createObjectURL(_),
        T = document.createElement('a');
      ((T.href = b),
        (T.download = `neon-spire-save-${new Date().toISOString().slice(0, 10)}.json`),
        T.click(),
        URL.revokeObjectURL(b));
    },
    m = async (h) => {
      const g = await h.text(),
        y = JSON.parse(g),
        _ = await d0();
      (await Nj(_, y), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(v0), window.location.reload());
    };
  return r.jsx(ql, {
    header: r.jsx($i, {
      title: '設定',
      currencies: [],
      tabBar: r.jsx(_s, { tabs: Ej, value: s, onChange: u, fullWidth: !0 }),
    }),
    footer: r.jsx(Vi, { active: 'settings', onChange: c }),
    children: r.jsxs('div', {
      className: p4.content,
      children: [
        s === 'sound' && r.jsx(ij, {}),
        s === 'game' && r.jsx(V4, {}),
        s === 'data' && r.jsx(D4, { onExport: o, onImport: m, onReset: d }),
      ],
    }),
  });
}
const Mj = '_layout_1c9in_1',
  Cj = '_heroWrap_1c9in_12',
  m0 = { layout: Mj, heroWrap: Cj },
  wj = '_root_5udm7_1',
  Oj = { root: wj };
function Rj({ onResume: c, onNewGame: s, onSettings: u, lastSavedAt: o }) {
  const m = X((y) => y.createdAt),
    { navigate: d } = Ma(),
    h = m > 0;
  function g() {
    u ? u() : d('settings');
  }
  return r.jsxs('div', {
    className: Oj.root,
    children: [
      r.jsx(_t, {
        label: h ? '続きから' : '続きから (セーブなし)',
        variant: h ? 'primary' : 'ghost',
        size: 'lg',
        fullWidth: !0,
        disabled: !h,
        iconLeft: r.jsx(Ee, { name: 'play', size: 18 }),
        onClick: c,
      }),
      h &&
        o != null &&
        r.jsx(V, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
          children: '最終セーブ: ' + o,
        }),
      r.jsx(_t, {
        label: '新規開始',
        variant: h ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: r.jsx(Ee, { name: 'plus', size: 18 }),
        onClick: s,
      }),
      r.jsx(_t, {
        label: '設定',
        variant: 'ghost',
        size: 'md',
        fullWidth: !0,
        iconLeft: r.jsx(Ee, { name: 'settings', size: 16 }),
        onClick: g,
      }),
    ],
  });
}
const Dj = '_root_qkflo_2',
  Bj = '_title_qkflo_12',
  h0 = { root: Dj, title: Bj };
function Lj({ title: c = 'NEON SPIRE', subtitle: s, version: u, tagline: o }) {
  return r.jsxs('header', {
    className: h0.root,
    role: 'banner',
    children: [
      r.jsx('h1', { className: h0.title, children: c }),
      s != null &&
        r.jsx(V, {
          variant: 'label',
          color: 'mid',
          align: 'center',
          style: { fontSize: 11, letterSpacing: '0.24em' },
          children: s,
        }),
      o != null &&
        r.jsx(V, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { marginTop: 4, fontSize: 11 },
          children: o,
        }),
      u != null &&
        r.jsx(V, {
          variant: 'numeric-s',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10, marginTop: 6, opacity: 0.7 },
          children: u,
        }),
    ],
  });
}
const qj = '_root_1szye_1',
  Hj = '_ringOuter_1szye_9',
  Uj = '_ringMiddle_1szye_17',
  Gj = '_glowDisc_1szye_24',
  Vj = '_cornerAccent_1szye_31',
  $j = '_icon_1szye_40',
  Dn = { root: qj, ringOuter: Hj, ringMiddle: Uj, glowDisc: Gj, cornerAccent: Vj, icon: $j };
function Yj({ size: c = 180, iconName: s = 'tower' }) {
  return r.jsxs('div', {
    className: Dn.root,
    style: { width: c, height: c },
    role: 'presentation',
    'aria-hidden': 'true',
    children: [
      r.jsx('div', { className: Dn.ringOuter }),
      r.jsx('div', { className: Dn.ringMiddle }),
      r.jsx('div', { className: Dn.glowDisc }),
      [0, 90, 180, 270].map((u) =>
        r.jsx(
          'div',
          {
            className: Dn.cornerAccent,
            style: { transform: `rotate(${u}deg) translate(${c / 2 - 5}px) rotate(45deg)` },
          },
          u
        )
      ),
      r.jsx('span', {
        className: Dn.icon,
        children: r.jsx(Ee, { name: s, size: Math.round(c * 0.49) }),
      }),
    ],
  });
}
function kj(c) {
  if (c < 0) return '今';
  const s = Math.floor(c / 1e3);
  if (s < 60) return '今';
  const u = Math.floor(s / 60);
  if (u < 60) return `${u} 分前`;
  const o = Math.floor(u / 60);
  return o < 24 ? `${o} 時間前` : `${Math.floor(o / 24)} 日前`;
}
function Zj() {
  const { navigate: c } = Ma(),
    s = X((o) => o.createdAt),
    u = de.useMemo(() => (s > 0 ? kj(Date.now() - s) : void 0), [s]);
  return r.jsx(ql, {
    children: r.jsxs('div', {
      className: m0.layout,
      children: [
        r.jsx(Lj, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.1.0',
        }),
        r.jsx('div', { className: m0.heroWrap, children: r.jsx(Yj, {}) }),
        r.jsx(Rj, {
          lastSavedAt: u,
          onResume: () => c('preparation'),
          onNewGame: () => c('preparation'),
          onSettings: () => c('settings'),
        }),
      ],
    }),
  });
}
function Xj() {
  const { screen: c } = Ma();
  switch (c) {
    case 'title':
      return r.jsx(Zj, {});
    case 'preparation':
      return r.jsx(y4, {});
    case 'machine':
      return r.jsx(Dx, {});
    case 'armory':
      return r.jsx(Hp, {});
    case 'patches':
      return r.jsx(U3, {});
    case 'settings':
      return r.jsx(zj, {});
    case 'battle':
      return r.jsx(zx, {});
    default:
      return r.jsx(Bx, {});
  }
}
const D0 = document.getElementById('root');
if (!D0) throw new Error('Failed to find #root element');
vg.createRoot(D0).render(r.jsx(Lp, { children: r.jsx(Xj, {}) }));
