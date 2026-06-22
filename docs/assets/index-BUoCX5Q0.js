var ty = Object.defineProperty;
var ay = (c, s, u) =>
  s in c ? ty(c, s, { enumerable: !0, configurable: !0, writable: !0, value: u }) : (c[s] = u);
var Kt = (c, s, u) => ay(c, typeof s != 'symbol' ? s + '' : s, u);
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
function ly(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var ko = { exports: {} },
  Mi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xh;
function ny() {
  if (xh) return Mi;
  xh = 1;
  var c = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.fragment');
  function u(o, m, d) {
    var h = null;
    if ((d !== void 0 && (h = '' + d), m.key !== void 0 && (h = '' + m.key), 'key' in m)) {
      d = {};
      for (var y in m) y !== 'key' && (d[y] = m[y]);
    } else d = m;
    return ((m = d.ref), { $$typeof: c, type: o, key: h, ref: m !== void 0 ? m : null, props: d });
  }
  return ((Mi.Fragment = s), (Mi.jsx = u), (Mi.jsxs = u), Mi);
}
var jh;
function iy() {
  return (jh || ((jh = 1), (ko.exports = ny())), ko.exports);
}
var r = iy(),
  Zo = { exports: {} },
  Ci = {},
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
 */ var Th;
function cy() {
  return (
    Th ||
      ((Th = 1),
      (function (c) {
        function s(R, V) {
          var W = R.length;
          R.push(V);
          e: for (; 0 < W; ) {
            var pe = (W - 1) >>> 1,
              _e = R[pe];
            if (0 < m(_e, V)) ((R[pe] = V), (R[W] = _e), (W = pe));
            else break e;
          }
        }
        function u(R) {
          return R.length === 0 ? null : R[0];
        }
        function o(R) {
          if (R.length === 0) return null;
          var V = R[0],
            W = R.pop();
          if (W !== V) {
            R[0] = W;
            e: for (var pe = 0, _e = R.length, x = _e >>> 1; pe < x; ) {
              var q = 2 * (pe + 1) - 1,
                $ = R[q],
                k = q + 1,
                P = R[k];
              if (0 > m($, W))
                k < _e && 0 > m(P, $)
                  ? ((R[pe] = P), (R[k] = W), (pe = k))
                  : ((R[pe] = $), (R[q] = W), (pe = q));
              else if (k < _e && 0 > m(P, W)) ((R[pe] = P), (R[k] = W), (pe = k));
              else break e;
            }
          }
          return V;
        }
        function m(R, V) {
          var W = R.sortIndex - V.sortIndex;
          return W !== 0 ? W : R.id - V.id;
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
            y = h.now();
          c.unstable_now = function () {
            return h.now() - y;
          };
        }
        var g = [],
          p = [],
          b = 1,
          T = null,
          E = 3,
          C = !1,
          O = !1,
          U = !1,
          H = !1,
          F = typeof setTimeout == 'function' ? setTimeout : null,
          I = typeof clearTimeout == 'function' ? clearTimeout : null,
          me = typeof setImmediate < 'u' ? setImmediate : null;
        function be(R) {
          for (var V = u(p); V !== null; ) {
            if (V.callback === null) o(p);
            else if (V.startTime <= R) (o(p), (V.sortIndex = V.expirationTime), s(g, V));
            else break;
            V = u(p);
          }
        }
        function lt(R) {
          if (((U = !1), be(R), !O))
            if (u(g) !== null) ((O = !0), Be || ((Be = !0), Xe()));
            else {
              var V = u(p);
              V !== null && nt(lt, V.startTime - R);
            }
        }
        var Be = !1,
          ne = -1,
          Ze = 5,
          rt = -1;
        function ut() {
          return H ? !0 : !(c.unstable_now() - rt < Ze);
        }
        function Le() {
          if (((H = !1), Be)) {
            var R = c.unstable_now();
            rt = R;
            var V = !0;
            try {
              e: {
                ((O = !1), U && ((U = !1), I(ne), (ne = -1)), (C = !0));
                var W = E;
                try {
                  t: {
                    for (be(R), T = u(g); T !== null && !(T.expirationTime > R && ut()); ) {
                      var pe = T.callback;
                      if (typeof pe == 'function') {
                        ((T.callback = null), (E = T.priorityLevel));
                        var _e = pe(T.expirationTime <= R);
                        if (((R = c.unstable_now()), typeof _e == 'function')) {
                          ((T.callback = _e), be(R), (V = !0));
                          break t;
                        }
                        (T === u(g) && o(g), be(R));
                      } else o(g);
                      T = u(g);
                    }
                    if (T !== null) V = !0;
                    else {
                      var x = u(p);
                      (x !== null && nt(lt, x.startTime - R), (V = !1));
                    }
                  }
                  break e;
                } finally {
                  ((T = null), (E = W), (C = !1));
                }
                V = void 0;
              }
            } finally {
              V ? Xe() : (Be = !1);
            }
          }
        }
        var Xe;
        if (typeof me == 'function')
          Xe = function () {
            me(Le);
          };
        else if (typeof MessageChannel < 'u') {
          var kt = new MessageChannel(),
            Ot = kt.port2;
          ((kt.port1.onmessage = Le),
            (Xe = function () {
              Ot.postMessage(null);
            }));
        } else
          Xe = function () {
            F(Le, 0);
          };
        function nt(R, V) {
          ne = F(function () {
            R(c.unstable_now());
          }, V);
        }
        ((c.unstable_IdlePriority = 5),
          (c.unstable_ImmediatePriority = 1),
          (c.unstable_LowPriority = 4),
          (c.unstable_NormalPriority = 3),
          (c.unstable_Profiling = null),
          (c.unstable_UserBlockingPriority = 2),
          (c.unstable_cancelCallback = function (R) {
            R.callback = null;
          }),
          (c.unstable_forceFrameRate = function (R) {
            0 > R || 125 < R
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (Ze = 0 < R ? Math.floor(1e3 / R) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return E;
          }),
          (c.unstable_next = function (R) {
            switch (E) {
              case 1:
              case 2:
              case 3:
                var V = 3;
                break;
              default:
                V = E;
            }
            var W = E;
            E = V;
            try {
              return R();
            } finally {
              E = W;
            }
          }),
          (c.unstable_requestPaint = function () {
            H = !0;
          }),
          (c.unstable_runWithPriority = function (R, V) {
            switch (R) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                R = 3;
            }
            var W = E;
            E = R;
            try {
              return V();
            } finally {
              E = W;
            }
          }),
          (c.unstable_scheduleCallback = function (R, V, W) {
            var pe = c.unstable_now();
            switch (
              (typeof W == 'object' && W !== null
                ? ((W = W.delay), (W = typeof W == 'number' && 0 < W ? pe + W : pe))
                : (W = pe),
              R)
            ) {
              case 1:
                var _e = -1;
                break;
              case 2:
                _e = 250;
                break;
              case 5:
                _e = 1073741823;
                break;
              case 4:
                _e = 1e4;
                break;
              default:
                _e = 5e3;
            }
            return (
              (_e = W + _e),
              (R = {
                id: b++,
                callback: V,
                priorityLevel: R,
                startTime: W,
                expirationTime: _e,
                sortIndex: -1,
              }),
              W > pe
                ? ((R.sortIndex = W),
                  s(p, R),
                  u(g) === null &&
                    R === u(p) &&
                    (U ? (I(ne), (ne = -1)) : (U = !0), nt(lt, W - pe)))
                : ((R.sortIndex = _e), s(g, R), O || C || ((O = !0), Be || ((Be = !0), Xe()))),
              R
            );
          }),
          (c.unstable_shouldYield = ut),
          (c.unstable_wrapCallback = function (R) {
            var V = E;
            return function () {
              var W = E;
              E = V;
              try {
                return R.apply(this, arguments);
              } finally {
                E = W;
              }
            };
          }));
      })(Qo)),
    Qo
  );
}
var Ah;
function sy() {
  return (Ah || ((Ah = 1), (Xo.exports = cy())), Xo.exports);
}
var Ko = { exports: {} },
  te = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nh;
function uy() {
  if (Nh) return te;
  Nh = 1;
  var c = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.portal'),
    u = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    m = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    y = Symbol.for('react.forward_ref'),
    g = Symbol.for('react.suspense'),
    p = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    T = Symbol.for('react.activity'),
    E = Symbol.iterator;
  function C(x) {
    return x === null || typeof x != 'object'
      ? null
      : ((x = (E && x[E]) || x['@@iterator']), typeof x == 'function' ? x : null);
  }
  var O = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    U = Object.assign,
    H = {};
  function F(x, q, $) {
    ((this.props = x), (this.context = q), (this.refs = H), (this.updater = $ || O));
  }
  ((F.prototype.isReactComponent = {}),
    (F.prototype.setState = function (x, q) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, q, 'setState');
    }),
    (F.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function I() {}
  I.prototype = F.prototype;
  function me(x, q, $) {
    ((this.props = x), (this.context = q), (this.refs = H), (this.updater = $ || O));
  }
  var be = (me.prototype = new I());
  ((be.constructor = me), U(be, F.prototype), (be.isPureReactComponent = !0));
  var lt = Array.isArray;
  function Be() {}
  var ne = { H: null, A: null, T: null, S: null },
    Ze = Object.prototype.hasOwnProperty;
  function rt(x, q, $) {
    var k = $.ref;
    return { $$typeof: c, type: x, key: q, ref: k !== void 0 ? k : null, props: $ };
  }
  function ut(x, q) {
    return rt(x.type, q, x.props);
  }
  function Le(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === c;
  }
  function Xe(x) {
    var q = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function ($) {
        return q[$];
      })
    );
  }
  var kt = /\/+/g;
  function Ot(x, q) {
    return typeof x == 'object' && x !== null && x.key != null ? Xe('' + x.key) : q.toString(36);
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
            ? x.then(Be, Be)
            : ((x.status = 'pending'),
              x.then(
                function (q) {
                  x.status === 'pending' && ((x.status = 'fulfilled'), (x.value = q));
                },
                function (q) {
                  x.status === 'pending' && ((x.status = 'rejected'), (x.reason = q));
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
  function R(x, q, $, k, P) {
    var ie = typeof x;
    (ie === 'undefined' || ie === 'boolean') && (x = null);
    var he = !1;
    if (x === null) he = !0;
    else
      switch (ie) {
        case 'bigint':
        case 'string':
        case 'number':
          he = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case c:
            case s:
              he = !0;
              break;
            case b:
              return ((he = x._init), R(he(x._payload), q, $, k, P));
          }
      }
    if (he)
      return (
        (P = P(x)),
        (he = k === '' ? '.' + Ot(x, 0) : k),
        lt(P)
          ? (($ = ''),
            he != null && ($ = he.replace(kt, '$&/') + '/'),
            R(P, q, $, '', function (ol) {
              return ol;
            }))
          : P != null &&
            (Le(P) &&
              (P = ut(
                P,
                $ +
                  (P.key == null || (x && x.key === P.key)
                    ? ''
                    : ('' + P.key).replace(kt, '$&/') + '/') +
                  he
              )),
            q.push(P)),
        1
      );
    he = 0;
    var We = k === '' ? '.' : k + ':';
    if (lt(x))
      for (var we = 0; we < x.length; we++)
        ((k = x[we]), (ie = We + Ot(k, we)), (he += R(k, q, $, ie, P)));
    else if (((we = C(x)), typeof we == 'function'))
      for (x = we.call(x), we = 0; !(k = x.next()).done; )
        ((k = k.value), (ie = We + Ot(k, we++)), (he += R(k, q, $, ie, P)));
    else if (ie === 'object') {
      if (typeof x.then == 'function') return R(nt(x), q, $, k, P);
      throw (
        (q = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (q === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : q) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return he;
  }
  function V(x, q, $) {
    if (x == null) return x;
    var k = [],
      P = 0;
    return (
      R(x, k, '', '', function (ie) {
        return q.call($, ie, P++);
      }),
      k
    );
  }
  function W(x) {
    if (x._status === -1) {
      var q = x._result;
      ((q = q()),
        q.then(
          function ($) {
            (x._status === 0 || x._status === -1) && ((x._status = 1), (x._result = $));
          },
          function ($) {
            (x._status === 0 || x._status === -1) && ((x._status = 2), (x._result = $));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = q)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var pe =
      typeof reportError == 'function'
        ? reportError
        : function (x) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var q = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof x == 'object' && x !== null && typeof x.message == 'string'
                    ? String(x.message)
                    : String(x),
                error: x,
              });
              if (!window.dispatchEvent(q)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', x);
              return;
            }
            console.error(x);
          },
    _e = {
      map: V,
      forEach: function (x, q, $) {
        V(
          x,
          function () {
            q.apply(this, arguments);
          },
          $
        );
      },
      count: function (x) {
        var q = 0;
        return (
          V(x, function () {
            q++;
          }),
          q
        );
      },
      toArray: function (x) {
        return (
          V(x, function (q) {
            return q;
          }) || []
        );
      },
      only: function (x) {
        if (!Le(x))
          throw Error('React.Children.only expected to receive a single React element child.');
        return x;
      },
    };
  return (
    (te.Activity = T),
    (te.Children = _e),
    (te.Component = F),
    (te.Fragment = u),
    (te.Profiler = m),
    (te.PureComponent = me),
    (te.StrictMode = o),
    (te.Suspense = g),
    (te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne),
    (te.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return ne.H.useMemoCache(x);
      },
    }),
    (te.cache = function (x) {
      return function () {
        return x.apply(null, arguments);
      };
    }),
    (te.cacheSignal = function () {
      return null;
    }),
    (te.cloneElement = function (x, q, $) {
      if (x == null) throw Error('The argument must be a React element, but you passed ' + x + '.');
      var k = U({}, x.props),
        P = x.key;
      if (q != null)
        for (ie in (q.key !== void 0 && (P = '' + q.key), q))
          !Ze.call(q, ie) ||
            ie === 'key' ||
            ie === '__self' ||
            ie === '__source' ||
            (ie === 'ref' && q.ref === void 0) ||
            (k[ie] = q[ie]);
      var ie = arguments.length - 2;
      if (ie === 1) k.children = $;
      else if (1 < ie) {
        for (var he = Array(ie), We = 0; We < ie; We++) he[We] = arguments[We + 2];
        k.children = he;
      }
      return rt(x.type, P, k);
    }),
    (te.createContext = function (x) {
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
    (te.createElement = function (x, q, $) {
      var k,
        P = {},
        ie = null;
      if (q != null)
        for (k in (q.key !== void 0 && (ie = '' + q.key), q))
          Ze.call(q, k) && k !== 'key' && k !== '__self' && k !== '__source' && (P[k] = q[k]);
      var he = arguments.length - 2;
      if (he === 1) P.children = $;
      else if (1 < he) {
        for (var We = Array(he), we = 0; we < he; we++) We[we] = arguments[we + 2];
        P.children = We;
      }
      if (x && x.defaultProps)
        for (k in ((he = x.defaultProps), he)) P[k] === void 0 && (P[k] = he[k]);
      return rt(x, ie, P);
    }),
    (te.createRef = function () {
      return { current: null };
    }),
    (te.forwardRef = function (x) {
      return { $$typeof: y, render: x };
    }),
    (te.isValidElement = Le),
    (te.lazy = function (x) {
      return { $$typeof: b, _payload: { _status: -1, _result: x }, _init: W };
    }),
    (te.memo = function (x, q) {
      return { $$typeof: p, type: x, compare: q === void 0 ? null : q };
    }),
    (te.startTransition = function (x) {
      var q = ne.T,
        $ = {};
      ne.T = $;
      try {
        var k = x(),
          P = ne.S;
        (P !== null && P($, k),
          typeof k == 'object' && k !== null && typeof k.then == 'function' && k.then(Be, pe));
      } catch (ie) {
        pe(ie);
      } finally {
        (q !== null && $.types !== null && (q.types = $.types), (ne.T = q));
      }
    }),
    (te.unstable_useCacheRefresh = function () {
      return ne.H.useCacheRefresh();
    }),
    (te.use = function (x) {
      return ne.H.use(x);
    }),
    (te.useActionState = function (x, q, $) {
      return ne.H.useActionState(x, q, $);
    }),
    (te.useCallback = function (x, q) {
      return ne.H.useCallback(x, q);
    }),
    (te.useContext = function (x) {
      return ne.H.useContext(x);
    }),
    (te.useDebugValue = function () {}),
    (te.useDeferredValue = function (x, q) {
      return ne.H.useDeferredValue(x, q);
    }),
    (te.useEffect = function (x, q) {
      return ne.H.useEffect(x, q);
    }),
    (te.useEffectEvent = function (x) {
      return ne.H.useEffectEvent(x);
    }),
    (te.useId = function () {
      return ne.H.useId();
    }),
    (te.useImperativeHandle = function (x, q, $) {
      return ne.H.useImperativeHandle(x, q, $);
    }),
    (te.useInsertionEffect = function (x, q) {
      return ne.H.useInsertionEffect(x, q);
    }),
    (te.useLayoutEffect = function (x, q) {
      return ne.H.useLayoutEffect(x, q);
    }),
    (te.useMemo = function (x, q) {
      return ne.H.useMemo(x, q);
    }),
    (te.useOptimistic = function (x, q) {
      return ne.H.useOptimistic(x, q);
    }),
    (te.useReducer = function (x, q, $) {
      return ne.H.useReducer(x, q, $);
    }),
    (te.useRef = function (x) {
      return ne.H.useRef(x);
    }),
    (te.useState = function (x) {
      return ne.H.useState(x);
    }),
    (te.useSyncExternalStore = function (x, q, $) {
      return ne.H.useSyncExternalStore(x, q, $);
    }),
    (te.useTransition = function () {
      return ne.H.useTransition();
    }),
    (te.version = '19.2.5'),
    te
  );
}
var zh;
function fr() {
  return (zh || ((zh = 1), (Ko.exports = uy())), Ko.exports);
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
 */ var Eh;
function oy() {
  if (Eh) return it;
  Eh = 1;
  var c = fr();
  function s(g) {
    var p = 'https://react.dev/errors/' + g;
    if (1 < arguments.length) {
      p += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++) p += '&args[]=' + encodeURIComponent(arguments[b]);
    }
    return (
      'Minified React error #' +
      g +
      '; visit ' +
      p +
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
  function d(g, p, b) {
    var T = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: T == null ? null : '' + T,
      children: g,
      containerInfo: p,
      implementation: b,
    };
  }
  var h = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function y(g, p) {
    if (g === 'font') return '';
    if (typeof p == 'string') return p === 'use-credentials' ? p : '';
  }
  return (
    (it.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (it.createPortal = function (g, p) {
      var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)) throw Error(s(299));
      return d(g, p, null, b);
    }),
    (it.flushSync = function (g) {
      var p = h.T,
        b = o.p;
      try {
        if (((h.T = null), (o.p = 2), g)) return g();
      } finally {
        ((h.T = p), (o.p = b), o.d.f());
      }
    }),
    (it.preconnect = function (g, p) {
      typeof g == 'string' &&
        (p
          ? ((p = p.crossOrigin),
            (p = typeof p == 'string' ? (p === 'use-credentials' ? p : '') : void 0))
          : (p = null),
        o.d.C(g, p));
    }),
    (it.prefetchDNS = function (g) {
      typeof g == 'string' && o.d.D(g);
    }),
    (it.preinit = function (g, p) {
      if (typeof g == 'string' && p && typeof p.as == 'string') {
        var b = p.as,
          T = y(b, p.crossOrigin),
          E = typeof p.integrity == 'string' ? p.integrity : void 0,
          C = typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0;
        b === 'style'
          ? o.d.S(g, typeof p.precedence == 'string' ? p.precedence : void 0, {
              crossOrigin: T,
              integrity: E,
              fetchPriority: C,
            })
          : b === 'script' &&
            o.d.X(g, {
              crossOrigin: T,
              integrity: E,
              fetchPriority: C,
              nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
            });
      }
    }),
    (it.preinitModule = function (g, p) {
      if (typeof g == 'string')
        if (typeof p == 'object' && p !== null) {
          if (p.as == null || p.as === 'script') {
            var b = y(p.as, p.crossOrigin);
            o.d.M(g, {
              crossOrigin: b,
              integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
              nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
            });
          }
        } else p == null && o.d.M(g);
    }),
    (it.preload = function (g, p) {
      if (typeof g == 'string' && typeof p == 'object' && p !== null && typeof p.as == 'string') {
        var b = p.as,
          T = y(b, p.crossOrigin);
        o.d.L(g, b, {
          crossOrigin: T,
          integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
          nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
          type: typeof p.type == 'string' ? p.type : void 0,
          fetchPriority: typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0,
          referrerPolicy: typeof p.referrerPolicy == 'string' ? p.referrerPolicy : void 0,
          imageSrcSet: typeof p.imageSrcSet == 'string' ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == 'string' ? p.imageSizes : void 0,
          media: typeof p.media == 'string' ? p.media : void 0,
        });
      }
    }),
    (it.preloadModule = function (g, p) {
      if (typeof g == 'string')
        if (p) {
          var b = y(p.as, p.crossOrigin);
          o.d.m(g, {
            as: typeof p.as == 'string' && p.as !== 'script' ? p.as : void 0,
            crossOrigin: b,
            integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
          });
        } else o.d.m(g);
    }),
    (it.requestFormReset = function (g) {
      o.d.r(g);
    }),
    (it.unstable_batchedUpdates = function (g, p) {
      return g(p);
    }),
    (it.useFormState = function (g, p, b) {
      return h.H.useFormState(g, p, b);
    }),
    (it.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (it.version = '19.2.5'),
    it
  );
}
var Mh;
function ry() {
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
  return (c(), (Jo.exports = oy()), Jo.exports);
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
function fy() {
  if (Ch) return Ci;
  Ch = 1;
  var c = sy(),
    s = fr(),
    u = ry();
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
  function y(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (d(e) !== e) throw Error(o(188));
  }
  function p(e) {
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
          if (i === a) return (g(n), e);
          if (i === l) return (g(n), t);
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
    E = Symbol.for('react.element'),
    C = Symbol.for('react.transitional.element'),
    O = Symbol.for('react.portal'),
    U = Symbol.for('react.fragment'),
    H = Symbol.for('react.strict_mode'),
    F = Symbol.for('react.profiler'),
    I = Symbol.for('react.consumer'),
    me = Symbol.for('react.context'),
    be = Symbol.for('react.forward_ref'),
    lt = Symbol.for('react.suspense'),
    Be = Symbol.for('react.suspense_list'),
    ne = Symbol.for('react.memo'),
    Ze = Symbol.for('react.lazy'),
    rt = Symbol.for('react.activity'),
    ut = Symbol.for('react.memo_cache_sentinel'),
    Le = Symbol.iterator;
  function Xe(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Le && e[Le]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var kt = Symbol.for('react.client.reference');
  function Ot(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === kt ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case U:
        return 'Fragment';
      case F:
        return 'Profiler';
      case H:
        return 'StrictMode';
      case lt:
        return 'Suspense';
      case Be:
        return 'SuspenseList';
      case rt:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case O:
          return 'Portal';
        case me:
          return e.displayName || 'Context';
        case I:
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
        case ne:
          return ((t = e.displayName || null), t !== null ? t : Ot(e.type) || 'Memo');
        case Ze:
          ((t = e._payload), (e = e._init));
          try {
            return Ot(e(t));
          } catch {}
      }
    return null;
  }
  var nt = Array.isArray,
    R = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    V = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    W = { pending: !1, data: null, method: null, action: null },
    pe = [],
    _e = -1;
  function x(e) {
    return { current: e };
  }
  function q(e) {
    0 > _e || ((e.current = pe[_e]), (pe[_e] = null), _e--);
  }
  function $(e, t) {
    (_e++, (pe[_e] = e.current), (e.current = t));
  }
  var k = x(null),
    P = x(null),
    ie = x(null),
    he = x(null);
  function We(e, t) {
    switch (($(ie, t), $(P, e), $(k, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Zm(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Zm(t)), (e = Xm(t, e)));
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
    (q(k), $(k, e));
  }
  function we() {
    (q(k), q(P), q(ie));
  }
  function ol(e) {
    e.memoizedState !== null && $(he, e);
    var t = k.current,
      a = Xm(t, e.type);
    t !== a && ($(P, e), $(k, a));
  }
  function ql(e) {
    (P.current === e && (q(k), q(P)), he.current === e && (q(he), (Ai._currentValue = W)));
  }
  var Hl, zs;
  function za(e) {
    if (Hl === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((Hl = (t && t[1]) || ''),
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
      e +
      zs
    );
  }
  var ee = !1;
  function Ul(e, t) {
    if (!e || ee) return '';
    ee = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var L = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(L.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(L, []);
                } catch (M) {
                  var z = M;
                }
                Reflect.construct(e, [], L);
              } else {
                try {
                  L.call();
                } catch (M) {
                  z = M;
                }
                e.call(L.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (M) {
                z = M;
              }
              (L = e()) && typeof L.catch == 'function' && L.catch(function () {});
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
        var _ = f.split(`
`),
          N = v.split(`
`);
        for (n = l = 0; l < _.length && !_[l].includes('DetermineComponentFrameRoot'); ) l++;
        for (; n < N.length && !N[n].includes('DetermineComponentFrameRoot'); ) n++;
        if (l === _.length || n === N.length)
          for (l = _.length - 1, n = N.length - 1; 1 <= l && 0 <= n && _[l] !== N[n]; ) n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (_[l] !== N[n]) {
            if (l !== 1 || n !== 1)
              do
                if ((l--, n--, 0 > n || _[l] !== N[n])) {
                  var w =
                    `
` + _[l].replace(' at new ', ' at ');
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
    return (a = e ? e.displayName || e.name : '') ? za(a) : '';
  }
  function Ki(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return za(e.type);
      case 16:
        return za('Lazy');
      case 13:
        return e.child !== t && t !== null ? za('Suspense Fallback') : za('Suspense');
      case 19:
        return za('SuspenseList');
      case 0:
      case 15:
        return Ul(e.type, !1);
      case 11:
        return Ul(e.type.render, !1);
      case 1:
        return Ul(e.type, !0);
      case 31:
        return za('Activity');
      default:
        return '';
    }
  }
  function Sr(e) {
    try {
      var t = '',
        a = null;
      do ((t += Ki(e, a)), (a = e), (e = e.return));
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
  var Es = Object.prototype.hasOwnProperty,
    Ms = c.unstable_scheduleCallback,
    Cs = c.unstable_cancelCallback,
    R1 = c.unstable_shouldYield,
    D1 = c.unstable_requestPaint,
    pt = c.unstable_now,
    B1 = c.unstable_getCurrentPriorityLevel,
    xr = c.unstable_ImmediatePriority,
    jr = c.unstable_UserBlockingPriority,
    Ji = c.unstable_NormalPriority,
    L1 = c.unstable_LowPriority,
    Tr = c.unstable_IdlePriority,
    q1 = c.log,
    H1 = c.unstable_setDisableYieldValue,
    qn = null,
    _t = null;
  function Ea(e) {
    if ((typeof q1 == 'function' && H1(e), _t && typeof _t.setStrictMode == 'function'))
      try {
        _t.setStrictMode(qn, e);
      } catch {}
  }
  var bt = Math.clz32 ? Math.clz32 : V1,
    U1 = Math.log,
    G1 = Math.LN2;
  function V1(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((U1(e) / G1) | 0)) | 0);
  }
  var Wi = 256,
    Fi = 262144,
    Ii = 4194304;
  function rl(e) {
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
  function Pi(e, t, a) {
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
            ? (n = rl(l))
            : ((f &= v), f !== 0 ? (n = rl(f)) : a || ((a = v & ~e), a !== 0 && (n = rl(a)))))
        : ((v = l & ~i),
          v !== 0
            ? (n = rl(v))
            : f !== 0
              ? (n = rl(f))
              : a || ((a = l & ~e), a !== 0 && (n = rl(a)))),
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
  function Hn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function $1(e, t) {
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
  function Ar() {
    var e = Ii;
    return ((Ii <<= 1), (Ii & 62914560) === 0 && (Ii = 4194304), e);
  }
  function Os(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Un(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Y1(e, t, a, l, n, i) {
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
      _ = e.expirationTimes,
      N = e.hiddenUpdates;
    for (a = f & ~a; 0 < a; ) {
      var w = 31 - bt(a),
        L = 1 << w;
      ((v[w] = 0), (_[w] = -1));
      var z = N[w];
      if (z !== null)
        for (N[w] = null, w = 0; w < z.length; w++) {
          var M = z[w];
          M !== null && (M.lane &= -536870913);
        }
      a &= ~L;
    }
    (l !== 0 && Nr(e, l, 0),
      i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(f & ~t)));
  }
  function Nr(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var l = 31 - bt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[l] = e.entanglements[l] | 1073741824 | (a & 261930)));
  }
  function zr(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var l = 31 - bt(a),
        n = 1 << l;
      ((n & t) | (e[l] & t) && (e[l] |= t), (a &= ~n));
    }
  }
  function Er(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : ws(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function ws(e) {
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
  function Mr() {
    var e = V.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : vh(e.type));
  }
  function Cr(e, t) {
    var a = V.p;
    try {
      return ((V.p = e), t());
    } finally {
      V.p = a;
    }
  }
  var Ma = Math.random().toString(36).slice(2),
    Fe = '__reactFiber$' + Ma,
    ft = '__reactProps$' + Ma,
    Gl = '__reactContainer$' + Ma,
    Ds = '__reactEvents$' + Ma,
    k1 = '__reactListeners$' + Ma,
    Z1 = '__reactHandles$' + Ma,
    Or = '__reactResources$' + Ma,
    Gn = '__reactMarker$' + Ma;
  function Bs(e) {
    (delete e[Fe], delete e[ft], delete e[Ds], delete e[k1], delete e[Z1]);
  }
  function Vl(e) {
    var t = e[Fe];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Gl] || a[Fe])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = Pm(e); e !== null; ) {
            if ((a = e[Fe])) return a;
            e = Pm(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function $l(e) {
    if ((e = e[Fe] || e[Gl])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Vn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Yl(e) {
    var t = e[Or];
    return (t || (t = e[Or] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function Qe(e) {
    e[Gn] = !0;
  }
  var wr = new Set(),
    Rr = {};
  function fl(e, t) {
    (kl(e, t), kl(e + 'Capture', t));
  }
  function kl(e, t) {
    for (Rr[e] = t, e = 0; e < t.length; e++) wr.add(t[e]);
  }
  var X1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Dr = {},
    Br = {};
  function Q1(e) {
    return Es.call(Br, e)
      ? !0
      : Es.call(Dr, e)
        ? !1
        : X1.test(e)
          ? (Br[e] = !0)
          : ((Dr[e] = !0), !1);
  }
  function ec(e, t, a) {
    if (Q1(t))
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
  function tc(e, t, a) {
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
  function ia(e, t, a, l) {
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
  function wt(e) {
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
  function Lr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function K1(e, t, a) {
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
      var t = Lr(e) ? 'checked' : 'value';
      e._valueTracker = K1(e, t, '' + e[t]);
    }
  }
  function qr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      l = '';
    return (
      e && (l = Lr(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = l),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function ac(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var J1 = /[\n"\\]/g;
  function Rt(e) {
    return e.replace(J1, function (t) {
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
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + wt(t))
          : e.value !== '' + wt(t) && (e.value = '' + wt(t))
        : (f !== 'submit' && f !== 'reset') || e.removeAttribute('value'),
      t != null
        ? Hs(e, f, wt(t))
        : a != null
          ? Hs(e, f, wt(a))
          : l != null && e.removeAttribute('value'),
      n == null && i != null && (e.defaultChecked = !!i),
      n != null && (e.checked = n && typeof n != 'function' && typeof n != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (e.name = '' + wt(v))
        : e.removeAttribute('name'));
  }
  function Hr(e, t, a, l, n, i, f, v) {
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
      ((a = a != null ? '' + wt(a) : ''),
        (t = t != null ? '' + wt(t) : a),
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
    (t === 'number' && ac(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function Zl(e, t, a, l) {
    if (((e = e.options), t)) {
      t = {};
      for (var n = 0; n < a.length; n++) t['$' + a[n]] = !0;
      for (a = 0; a < e.length; a++)
        ((n = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== n && (e[a].selected = n),
          n && l && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + wt(a), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === a) {
          ((e[n].selected = !0), l && (e[n].defaultSelected = !0));
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ur(e, t, a) {
    if (t != null && ((t = '' + wt(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + wt(a) : '';
  }
  function Gr(e, t, a, l) {
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
    ((a = wt(t)),
      (e.defaultValue = a),
      (l = e.textContent),
      l === a && l !== '' && l !== null && (e.value = l),
      Ls(e));
  }
  function Xl(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var W1 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Vr(e, t, a) {
    var l = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? l
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : l
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || W1.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function $r(e, t, a) {
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
      for (var n in t) ((l = t[n]), t.hasOwnProperty(n) && a[n] !== l && Vr(e, n, l));
    } else for (var i in t) t.hasOwnProperty(i) && Vr(e, i, t[i]);
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
  var F1 = new Map([
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
    I1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function lc(e) {
    return I1.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function ca() {}
  var Gs = null;
  function Vs(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Ql = null,
    Kl = null;
  function Yr(e) {
    var t = $l(e);
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
            for (t = 0; t < a.length; t++) ((l = a[t]), l.form === e.form && qr(l));
          }
          break e;
        case 'textarea':
          Ur(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && Zl(e, !!a.multiple, t, !1));
      }
    }
  }
  var $s = !1;
  function kr(e, t, a) {
    if ($s) return e(t, a);
    $s = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (
        (($s = !1),
        (Ql !== null || Kl !== null) &&
          (kc(), Ql && ((t = Ql), (e = Kl), (Kl = Ql = null), Yr(t), e)))
      )
        for (t = 0; t < e.length; t++) Yr(e[t]);
    }
  }
  function $n(e, t) {
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
  var sa = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Ys = !1;
  if (sa)
    try {
      var Yn = {};
      (Object.defineProperty(Yn, 'passive', {
        get: function () {
          Ys = !0;
        },
      }),
        window.addEventListener('test', Yn, Yn),
        window.removeEventListener('test', Yn, Yn));
    } catch {
      Ys = !1;
    }
  var Ca = null,
    ks = null,
    nc = null;
  function Zr() {
    if (nc) return nc;
    var e,
      t = ks,
      a = t.length,
      l,
      n = 'value' in Ca ? Ca.value : Ca.textContent,
      i = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++);
    var f = a - e;
    for (l = 1; l <= f && t[a - l] === n[i - l]; l++);
    return (nc = n.slice(e, 1 < l ? 1 - l : void 0));
  }
  function ic(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function cc() {
    return !0;
  }
  function Xr() {
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
          ? cc
          : Xr),
        (this.isPropagationStopped = Xr),
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
            (this.isDefaultPrevented = cc));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = cc));
        },
        persist: function () {},
        isPersistent: cc,
      }),
      t
    );
  }
  var dl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    sc = dt(dl),
    kn = T({}, dl, { view: 0, detail: 0 }),
    P1 = dt(kn),
    Zs,
    Xs,
    Zn,
    uc = T({}, kn, {
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
          : (e !== Zn &&
              (Zn && e.type === 'mousemove'
                ? ((Zs = e.screenX - Zn.screenX), (Xs = e.screenY - Zn.screenY))
                : (Xs = Zs = 0),
              (Zn = e)),
            Zs);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Xs;
      },
    }),
    Qr = dt(uc),
    e0 = T({}, uc, { dataTransfer: 0 }),
    t0 = dt(e0),
    a0 = T({}, kn, { relatedTarget: 0 }),
    Qs = dt(a0),
    l0 = T({}, dl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    n0 = dt(l0),
    i0 = T({}, dl, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    c0 = dt(i0),
    s0 = T({}, dl, { data: 0 }),
    Kr = dt(s0),
    u0 = {
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
    o0 = {
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
    r0 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function f0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = r0[e]) ? !!t[e] : !1;
  }
  function Ks() {
    return f0;
  }
  var d0 = T({}, kn, {
      key: function (e) {
        if (e.key) {
          var t = u0[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = ic(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? o0[e.keyCode] || 'Unidentified'
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
        return e.type === 'keypress' ? ic(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? ic(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    m0 = dt(d0),
    h0 = T({}, uc, {
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
    Jr = dt(h0),
    v0 = T({}, kn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ks,
    }),
    y0 = dt(v0),
    g0 = T({}, dl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    p0 = dt(g0),
    _0 = T({}, uc, {
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
    b0 = dt(_0),
    S0 = T({}, dl, { newState: 0, oldState: 0 }),
    x0 = dt(S0),
    j0 = [9, 13, 27, 32],
    Js = sa && 'CompositionEvent' in window,
    Xn = null;
  sa && 'documentMode' in document && (Xn = document.documentMode);
  var T0 = sa && 'TextEvent' in window && !Xn,
    Wr = sa && (!Js || (Xn && 8 < Xn && 11 >= Xn)),
    Fr = ' ',
    Ir = !1;
  function Pr(e, t) {
    switch (e) {
      case 'keyup':
        return j0.indexOf(t.keyCode) !== -1;
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
  function ef(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Jl = !1;
  function A0(e, t) {
    switch (e) {
      case 'compositionend':
        return ef(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Ir = !0), Fr);
      case 'textInput':
        return ((e = t.data), e === Fr && Ir ? null : e);
      default:
        return null;
    }
  }
  function N0(e, t) {
    if (Jl)
      return e === 'compositionend' || (!Js && Pr(e, t))
        ? ((e = Zr()), (nc = ks = Ca = null), (Jl = !1), e)
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
        return Wr && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var z0 = {
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
  function tf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!z0[e.type] : t === 'textarea';
  }
  function af(e, t, a, l) {
    (Ql ? (Kl ? Kl.push(l) : (Kl = [l])) : (Ql = l),
      (t = Fc(t, 'onChange')),
      0 < t.length &&
        ((a = new sc('onChange', 'change', null, a, l)), e.push({ event: a, listeners: t })));
  }
  var Qn = null,
    Kn = null;
  function E0(e) {
    Um(e, 0);
  }
  function oc(e) {
    var t = Vn(e);
    if (qr(t)) return e;
  }
  function lf(e, t) {
    if (e === 'change') return t;
  }
  var nf = !1;
  if (sa) {
    var Ws;
    if (sa) {
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
    Qn && (Qn.detachEvent('onpropertychange', uf), (Kn = Qn = null));
  }
  function uf(e) {
    if (e.propertyName === 'value' && oc(Kn)) {
      var t = [];
      (af(t, Kn, e, Vs(e)), kr(E0, t));
    }
  }
  function M0(e, t, a) {
    e === 'focusin'
      ? (sf(), (Qn = t), (Kn = a), Qn.attachEvent('onpropertychange', uf))
      : e === 'focusout' && sf();
  }
  function C0(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return oc(Kn);
  }
  function O0(e, t) {
    if (e === 'click') return oc(t);
  }
  function w0(e, t) {
    if (e === 'input' || e === 'change') return oc(t);
  }
  function R0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var St = typeof Object.is == 'function' ? Object.is : R0;
  function Jn(e, t) {
    if (St(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!Es.call(t, n) || !St(e[n], t[n])) return !1;
    }
    return !0;
  }
  function of(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function rf(e, t) {
    var a = of(e);
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
      a = of(a);
    }
  }
  function ff(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? ff(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function df(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = ac(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = ac(e.document);
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
  var D0 = sa && 'documentMode' in document && 11 >= document.documentMode,
    Wl = null,
    Ps = null,
    Wn = null,
    eu = !1;
  function mf(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    eu ||
      Wl == null ||
      Wl !== ac(l) ||
      ((l = Wl),
      'selectionStart' in l && Is(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (Wn && Jn(Wn, l)) ||
        ((Wn = l),
        (l = Fc(Ps, 'onSelect')),
        0 < l.length &&
          ((t = new sc('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: l }),
          (t.target = Wl))));
  }
  function ml(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var Fl = {
      animationend: ml('Animation', 'AnimationEnd'),
      animationiteration: ml('Animation', 'AnimationIteration'),
      animationstart: ml('Animation', 'AnimationStart'),
      transitionrun: ml('Transition', 'TransitionRun'),
      transitionstart: ml('Transition', 'TransitionStart'),
      transitioncancel: ml('Transition', 'TransitionCancel'),
      transitionend: ml('Transition', 'TransitionEnd'),
    },
    tu = {},
    hf = {};
  sa &&
    ((hf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Fl.animationend.animation,
      delete Fl.animationiteration.animation,
      delete Fl.animationstart.animation),
    'TransitionEvent' in window || delete Fl.transitionend.transition);
  function hl(e) {
    if (tu[e]) return tu[e];
    if (!Fl[e]) return e;
    var t = Fl[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in hf) return (tu[e] = t[a]);
    return e;
  }
  var vf = hl('animationend'),
    yf = hl('animationiteration'),
    gf = hl('animationstart'),
    B0 = hl('transitionrun'),
    L0 = hl('transitionstart'),
    q0 = hl('transitioncancel'),
    pf = hl('transitionend'),
    _f = new Map(),
    au =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  au.push('scrollEnd');
  function Zt(e, t) {
    (_f.set(e, t), fl(t, [e]));
  }
  var rc =
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
    Il = 0,
    lu = 0;
  function fc() {
    for (var e = Il, t = (lu = Il = 0); t < e; ) {
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
      i !== 0 && bf(a, n, i);
    }
  }
  function dc(e, t, a, l) {
    ((Dt[Il++] = e),
      (Dt[Il++] = t),
      (Dt[Il++] = a),
      (Dt[Il++] = l),
      (lu |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l));
  }
  function nu(e, t, a, l) {
    return (dc(e, t, a, l), mc(e));
  }
  function vl(e, t) {
    return (dc(e, null, null, t), mc(e));
  }
  function bf(e, t, a) {
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
          ((n = 31 - bt(a)),
          (e = i.hiddenUpdates),
          (l = e[n]),
          l === null ? (e[n] = [t]) : l.push(t),
          (t.lane = a | 536870912)),
        i)
      : null;
  }
  function mc(e) {
    if (50 < pi) throw ((pi = 0), (ho = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Pl = {};
  function H0(e, t, a, l) {
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
  function xt(e, t, a, l) {
    return new H0(e, t, a, l);
  }
  function iu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function ua(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = xt(e.tag, t, e.key, e.mode)),
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
  function Sf(e, t) {
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
  function hc(e, t, a, l, n, i) {
    var f = 0;
    if (((l = e), typeof e == 'function')) iu(e) && (f = 1);
    else if (typeof e == 'string')
      f = Yv(e, a, k.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case rt:
          return ((e = xt(31, a, t, n)), (e.elementType = rt), (e.lanes = i), e);
        case U:
          return yl(a.children, n, i, t);
        case H:
          ((f = 8), (n |= 24));
          break;
        case F:
          return ((e = xt(12, a, t, n | 2)), (e.elementType = F), (e.lanes = i), e);
        case lt:
          return ((e = xt(13, a, t, n)), (e.elementType = lt), (e.lanes = i), e);
        case Be:
          return ((e = xt(19, a, t, n)), (e.elementType = Be), (e.lanes = i), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case me:
                f = 10;
                break e;
              case I:
                f = 9;
                break e;
              case be:
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
    return ((t = xt(f, a, t, n)), (t.elementType = e), (t.type = l), (t.lanes = i), t);
  }
  function yl(e, t, a, l) {
    return ((e = xt(7, e, l, t)), (e.lanes = a), e);
  }
  function cu(e, t, a) {
    return ((e = xt(6, e, null, t)), (e.lanes = a), e);
  }
  function xf(e) {
    var t = xt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function su(e, t, a) {
    return (
      (t = xt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var jf = new WeakMap();
  function Bt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = jf.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: Sr(t) }), jf.set(e, t), t);
    }
    return { value: e, source: t, stack: Sr(t) };
  }
  var en = [],
    tn = 0,
    vc = null,
    Fn = 0,
    Lt = [],
    qt = 0,
    Oa = null,
    ea = 1,
    ta = '';
  function oa(e, t) {
    ((en[tn++] = Fn), (en[tn++] = vc), (vc = e), (Fn = t));
  }
  function Tf(e, t, a) {
    ((Lt[qt++] = ea), (Lt[qt++] = ta), (Lt[qt++] = Oa), (Oa = e));
    var l = ea;
    e = ta;
    var n = 32 - bt(l) - 1;
    ((l &= ~(1 << n)), (a += 1));
    var i = 32 - bt(t) + n;
    if (30 < i) {
      var f = n - (n % 5);
      ((i = (l & ((1 << f) - 1)).toString(32)),
        (l >>= f),
        (n -= f),
        (ea = (1 << (32 - bt(t) + n)) | (a << n) | l),
        (ta = i + e));
    } else ((ea = (1 << i) | (a << n) | l), (ta = e));
  }
  function uu(e) {
    e.return !== null && (oa(e, 1), Tf(e, 1, 0));
  }
  function ou(e) {
    for (; e === vc; ) ((vc = en[--tn]), (en[tn] = null), (Fn = en[--tn]), (en[tn] = null));
    for (; e === Oa; )
      ((Oa = Lt[--qt]),
        (Lt[qt] = null),
        (ta = Lt[--qt]),
        (Lt[qt] = null),
        (ea = Lt[--qt]),
        (Lt[qt] = null));
  }
  function Af(e, t) {
    ((Lt[qt++] = ea), (Lt[qt++] = ta), (Lt[qt++] = Oa), (ea = t.id), (ta = t.overflow), (Oa = e));
  }
  var Ie = null,
    Me = null,
    fe = !1,
    wa = null,
    Ht = !1,
    ru = Error(o(519));
  function Ra(e) {
    var t = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (In(Bt(t, e)), ru);
  }
  function Nf(e) {
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
        for (a = 0; a < bi.length; a++) se(bi[a], t);
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
          Hr(t, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
        break;
      case 'select':
        se('invalid', t);
        break;
      case 'textarea':
        (se('invalid', t), Gr(t, l.value, l.defaultValue, l.children));
    }
    ((a = l.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      l.suppressHydrationWarning === !0 ||
      Ym(t.textContent, a)
        ? (l.popover != null && (se('beforetoggle', t), se('toggle', t)),
          l.onScroll != null && se('scroll', t),
          l.onScrollEnd != null && se('scrollend', t),
          l.onClick != null && (t.onclick = ca),
          (t = !0))
        : (t = !1),
      t || Ra(e, !0));
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
  function an(e) {
    if (e !== Ie) return !1;
    if (!fe) return (zf(e), (fe = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || Mo(e.type, e.memoizedProps))),
        (a = !a)),
      a && Me && Ra(e),
      zf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      Me = Im(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      Me = Im(e);
    } else
      t === 27
        ? ((t = Me), Qa(e.type) ? ((e = Do), (Do = null), (Me = e)) : (Me = t))
        : (Me = Ie ? Gt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function gl() {
    ((Me = Ie = null), (fe = !1));
  }
  function fu() {
    var e = wa;
    return (e !== null && (yt === null ? (yt = e) : yt.push.apply(yt, e), (wa = null)), e);
  }
  function In(e) {
    wa === null ? (wa = [e]) : wa.push(e);
  }
  var du = x(null),
    pl = null,
    ra = null;
  function Da(e, t, a) {
    ($(du, t._currentValue), (t._currentValue = a));
  }
  function fa(e) {
    ((e._currentValue = du.current), q(du));
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
          for (var _ = 0; _ < t.length; _++)
            if (v.context === t[_]) {
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
  function ln(e, t, a, l) {
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
          St(n.pendingProps.value, f.value) || (e !== null ? e.push(v) : (e = [v]));
        }
      } else if (n === he.current) {
        if (((f = n.alternate), f === null)) throw Error(o(387));
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(Ai) : (e = [Ai]));
      }
      n = n.return;
    }
    (e !== null && hu(t, e, a, l), (t.flags |= 262144));
  }
  function yc(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!St(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function _l(e) {
    ((pl = e), (ra = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function Pe(e) {
    return Ef(pl, e);
  }
  function gc(e, t) {
    return (pl === null && _l(e), Ef(e, t));
  }
  function Ef(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), ra === null)) {
      if (e === null) throw Error(o(308));
      ((ra = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else ra = ra.next = t;
    return a;
  }
  var U0 =
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
    G0 = c.unstable_scheduleCallback,
    V0 = c.unstable_NormalPriority,
    Ue = {
      $$typeof: me,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function vu() {
    return { controller: new U0(), data: new Map(), refCount: 0 };
  }
  function Pn(e) {
    (e.refCount--,
      e.refCount === 0 &&
        G0(V0, function () {
          e.controller.abort();
        }));
  }
  var ei = null,
    yu = 0,
    nn = 0,
    cn = null;
  function $0(e, t) {
    if (ei === null) {
      var a = (ei = []);
      ((yu = 0),
        (nn = bo()),
        (cn = {
          status: 'pending',
          value: void 0,
          then: function (l) {
            a.push(l);
          },
        }));
    }
    return (yu++, t.then(Mf, Mf), t);
  }
  function Mf() {
    if (--yu === 0 && ei !== null) {
      cn !== null && (cn.status = 'fulfilled');
      var e = ei;
      ((ei = null), (nn = 0), (cn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Y0(e, t) {
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
  var Cf = R.S;
  R.S = function (e, t) {
    ((mm = pt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && $0(e, t),
      Cf !== null && Cf(e, t));
  };
  var bl = x(null);
  function gu() {
    var e = bl.current;
    return e !== null ? e : ze.pooledCache;
  }
  function pc(e, t) {
    t === null ? $(bl, bl.current) : $(bl, t.pool);
  }
  function Of() {
    var e = gu();
    return e === null ? null : { parent: Ue._currentValue, pool: e };
  }
  var sn = Error(o(460)),
    pu = Error(o(474)),
    _c = Error(o(542)),
    bc = { then: function () {} };
  function wf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Rf(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(ca, ca), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Bf(e), e);
      default:
        if (typeof t.status == 'string') t.then(ca, ca);
        else {
          if (((e = ze), e !== null && 100 < e.shellSuspendCounter)) throw Error(o(482));
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
            throw ((e = t.reason), Bf(e), e);
        }
        throw ((xl = t), sn);
    }
  }
  function Sl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((xl = a), sn) : a;
    }
  }
  var xl = null;
  function Df() {
    if (xl === null) throw Error(o(459));
    var e = xl;
    return ((xl = null), e);
  }
  function Bf(e) {
    if (e === sn || e === _c) throw Error(o(483));
  }
  var un = null,
    ti = 0;
  function Sc(e) {
    var t = ti;
    return ((ti += 1), un === null && (un = []), Rf(un, e, t));
  }
  function ai(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function xc(e, t) {
    throw t.$$typeof === E
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function Lf(e) {
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
      return ((j = ua(j, S)), (j.index = 0), (j.sibling = null), j);
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
    function v(j, S, A, B) {
      return S === null || S.tag !== 6
        ? ((S = cu(A, j.mode, B)), (S.return = j), S)
        : ((S = n(S, A)), (S.return = j), S);
    }
    function _(j, S, A, B) {
      var K = A.type;
      return K === U
        ? w(j, S, A.props.children, B, A.key)
        : S !== null &&
            (S.elementType === K ||
              (typeof K == 'object' && K !== null && K.$$typeof === Ze && Sl(K) === S.type))
          ? ((S = n(S, A.props)), ai(S, A), (S.return = j), S)
          : ((S = hc(A.type, A.key, A.props, null, j.mode, B)), ai(S, A), (S.return = j), S);
    }
    function N(j, S, A, B) {
      return S === null ||
        S.tag !== 4 ||
        S.stateNode.containerInfo !== A.containerInfo ||
        S.stateNode.implementation !== A.implementation
        ? ((S = su(A, j.mode, B)), (S.return = j), S)
        : ((S = n(S, A.children || [])), (S.return = j), S);
    }
    function w(j, S, A, B, K) {
      return S === null || S.tag !== 7
        ? ((S = yl(A, j.mode, B, K)), (S.return = j), S)
        : ((S = n(S, A)), (S.return = j), S);
    }
    function L(j, S, A) {
      if ((typeof S == 'string' && S !== '') || typeof S == 'number' || typeof S == 'bigint')
        return ((S = cu('' + S, j.mode, A)), (S.return = j), S);
      if (typeof S == 'object' && S !== null) {
        switch (S.$$typeof) {
          case C:
            return ((A = hc(S.type, S.key, S.props, null, j.mode, A)), ai(A, S), (A.return = j), A);
          case O:
            return ((S = su(S, j.mode, A)), (S.return = j), S);
          case Ze:
            return ((S = Sl(S)), L(j, S, A));
        }
        if (nt(S) || Xe(S)) return ((S = yl(S, j.mode, A, null)), (S.return = j), S);
        if (typeof S.then == 'function') return L(j, Sc(S), A);
        if (S.$$typeof === me) return L(j, gc(j, S), A);
        xc(j, S);
      }
      return null;
    }
    function z(j, S, A, B) {
      var K = S !== null ? S.key : null;
      if ((typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint')
        return K !== null ? null : v(j, S, '' + A, B);
      if (typeof A == 'object' && A !== null) {
        switch (A.$$typeof) {
          case C:
            return A.key === K ? _(j, S, A, B) : null;
          case O:
            return A.key === K ? N(j, S, A, B) : null;
          case Ze:
            return ((A = Sl(A)), z(j, S, A, B));
        }
        if (nt(A) || Xe(A)) return K !== null ? null : w(j, S, A, B, null);
        if (typeof A.then == 'function') return z(j, S, Sc(A), B);
        if (A.$$typeof === me) return z(j, S, gc(j, A), B);
        xc(j, A);
      }
      return null;
    }
    function M(j, S, A, B, K) {
      if ((typeof B == 'string' && B !== '') || typeof B == 'number' || typeof B == 'bigint')
        return ((j = j.get(A) || null), v(S, j, '' + B, K));
      if (typeof B == 'object' && B !== null) {
        switch (B.$$typeof) {
          case C:
            return ((j = j.get(B.key === null ? A : B.key) || null), _(S, j, B, K));
          case O:
            return ((j = j.get(B.key === null ? A : B.key) || null), N(S, j, B, K));
          case Ze:
            return ((B = Sl(B)), M(j, S, A, B, K));
        }
        if (nt(B) || Xe(B)) return ((j = j.get(A) || null), w(S, j, B, K, null));
        if (typeof B.then == 'function') return M(j, S, A, Sc(B), K);
        if (B.$$typeof === me) return M(j, S, A, gc(S, B), K);
        xc(S, B);
      }
      return null;
    }
    function Y(j, S, A, B) {
      for (
        var K = null, ve = null, Z = S, le = (S = 0), oe = null;
        Z !== null && le < A.length;
        le++
      ) {
        Z.index > le ? ((oe = Z), (Z = null)) : (oe = Z.sibling);
        var ye = z(j, Z, A[le], B);
        if (ye === null) {
          Z === null && (Z = oe);
          break;
        }
        (e && Z && ye.alternate === null && t(j, Z),
          (S = i(ye, S, le)),
          ve === null ? (K = ye) : (ve.sibling = ye),
          (ve = ye),
          (Z = oe));
      }
      if (le === A.length) return (a(j, Z), fe && oa(j, le), K);
      if (Z === null) {
        for (; le < A.length; le++)
          ((Z = L(j, A[le], B)),
            Z !== null && ((S = i(Z, S, le)), ve === null ? (K = Z) : (ve.sibling = Z), (ve = Z)));
        return (fe && oa(j, le), K);
      }
      for (Z = l(Z); le < A.length; le++)
        ((oe = M(Z, j, le, A[le], B)),
          oe !== null &&
            (e && oe.alternate !== null && Z.delete(oe.key === null ? le : oe.key),
            (S = i(oe, S, le)),
            ve === null ? (K = oe) : (ve.sibling = oe),
            (ve = oe)));
      return (
        e &&
          Z.forEach(function (Ia) {
            return t(j, Ia);
          }),
        fe && oa(j, le),
        K
      );
    }
    function J(j, S, A, B) {
      if (A == null) throw Error(o(151));
      for (
        var K = null, ve = null, Z = S, le = (S = 0), oe = null, ye = A.next();
        Z !== null && !ye.done;
        le++, ye = A.next()
      ) {
        Z.index > le ? ((oe = Z), (Z = null)) : (oe = Z.sibling);
        var Ia = z(j, Z, ye.value, B);
        if (Ia === null) {
          Z === null && (Z = oe);
          break;
        }
        (e && Z && Ia.alternate === null && t(j, Z),
          (S = i(Ia, S, le)),
          ve === null ? (K = Ia) : (ve.sibling = Ia),
          (ve = Ia),
          (Z = oe));
      }
      if (ye.done) return (a(j, Z), fe && oa(j, le), K);
      if (Z === null) {
        for (; !ye.done; le++, ye = A.next())
          ((ye = L(j, ye.value, B)),
            ye !== null &&
              ((S = i(ye, S, le)), ve === null ? (K = ye) : (ve.sibling = ye), (ve = ye)));
        return (fe && oa(j, le), K);
      }
      for (Z = l(Z); !ye.done; le++, ye = A.next())
        ((ye = M(Z, j, le, ye.value, B)),
          ye !== null &&
            (e && ye.alternate !== null && Z.delete(ye.key === null ? le : ye.key),
            (S = i(ye, S, le)),
            ve === null ? (K = ye) : (ve.sibling = ye),
            (ve = ye)));
      return (
        e &&
          Z.forEach(function (ey) {
            return t(j, ey);
          }),
        fe && oa(j, le),
        K
      );
    }
    function Ae(j, S, A, B) {
      if (
        (typeof A == 'object' &&
          A !== null &&
          A.type === U &&
          A.key === null &&
          (A = A.props.children),
        typeof A == 'object' && A !== null)
      ) {
        switch (A.$$typeof) {
          case C:
            e: {
              for (var K = A.key; S !== null; ) {
                if (S.key === K) {
                  if (((K = A.type), K === U)) {
                    if (S.tag === 7) {
                      (a(j, S.sibling), (B = n(S, A.props.children)), (B.return = j), (j = B));
                      break e;
                    }
                  } else if (
                    S.elementType === K ||
                    (typeof K == 'object' && K !== null && K.$$typeof === Ze && Sl(K) === S.type)
                  ) {
                    (a(j, S.sibling), (B = n(S, A.props)), ai(B, A), (B.return = j), (j = B));
                    break e;
                  }
                  a(j, S);
                  break;
                } else t(j, S);
                S = S.sibling;
              }
              A.type === U
                ? ((B = yl(A.props.children, j.mode, B, A.key)), (B.return = j), (j = B))
                : ((B = hc(A.type, A.key, A.props, null, j.mode, B)),
                  ai(B, A),
                  (B.return = j),
                  (j = B));
            }
            return f(j);
          case O:
            e: {
              for (K = A.key; S !== null; ) {
                if (S.key === K)
                  if (
                    S.tag === 4 &&
                    S.stateNode.containerInfo === A.containerInfo &&
                    S.stateNode.implementation === A.implementation
                  ) {
                    (a(j, S.sibling), (B = n(S, A.children || [])), (B.return = j), (j = B));
                    break e;
                  } else {
                    a(j, S);
                    break;
                  }
                else t(j, S);
                S = S.sibling;
              }
              ((B = su(A, j.mode, B)), (B.return = j), (j = B));
            }
            return f(j);
          case Ze:
            return ((A = Sl(A)), Ae(j, S, A, B));
        }
        if (nt(A)) return Y(j, S, A, B);
        if (Xe(A)) {
          if (((K = Xe(A)), typeof K != 'function')) throw Error(o(150));
          return ((A = K.call(A)), J(j, S, A, B));
        }
        if (typeof A.then == 'function') return Ae(j, S, Sc(A), B);
        if (A.$$typeof === me) return Ae(j, S, gc(j, A), B);
        xc(j, A);
      }
      return (typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint'
        ? ((A = '' + A),
          S !== null && S.tag === 6
            ? (a(j, S.sibling), (B = n(S, A)), (B.return = j), (j = B))
            : (a(j, S), (B = cu(A, j.mode, B)), (B.return = j), (j = B)),
          f(j))
        : a(j, S);
    }
    return function (j, S, A, B) {
      try {
        ti = 0;
        var K = Ae(j, S, A, B);
        return ((un = null), K);
      } catch (Z) {
        if (Z === sn || Z === _c) throw Z;
        var ve = xt(29, Z, null, j.mode);
        return ((ve.lanes = B), (ve.return = j), ve);
      } finally {
      }
    };
  }
  var jl = Lf(!0),
    qf = Lf(!1),
    Ba = !1;
  function _u(e) {
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
  function La(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function qa(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (ge & 2) !== 0)) {
      var n = l.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (l.pending = t),
        (t = mc(e)),
        bf(e, null, a),
        t
      );
    }
    return (dc(e, l, t, a), mc(e));
  }
  function li(e, t, a) {
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
  function ni() {
    if (xu) {
      var e = cn;
      if (e !== null) throw e;
    }
  }
  function ii(e, t, a, l) {
    xu = !1;
    var n = e.updateQueue;
    Ba = !1;
    var i = n.firstBaseUpdate,
      f = n.lastBaseUpdate,
      v = n.shared.pending;
    if (v !== null) {
      n.shared.pending = null;
      var _ = v,
        N = _.next;
      ((_.next = null), f === null ? (i = N) : (f.next = N), (f = _));
      var w = e.alternate;
      w !== null &&
        ((w = w.updateQueue),
        (v = w.lastBaseUpdate),
        v !== f && (v === null ? (w.firstBaseUpdate = N) : (v.next = N), (w.lastBaseUpdate = _)));
    }
    if (i !== null) {
      var L = n.baseState;
      ((f = 0), (w = N = _ = null), (v = i));
      do {
        var z = v.lane & -536870913,
          M = z !== v.lane;
        if (M ? (ue & z) === z : (l & z) === z) {
          (z !== 0 && z === nn && (xu = !0),
            w !== null &&
              (w = w.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          e: {
            var Y = e,
              J = v;
            z = t;
            var Ae = a;
            switch (J.tag) {
              case 1:
                if (((Y = J.payload), typeof Y == 'function')) {
                  L = Y.call(Ae, L, z);
                  break e;
                }
                L = Y;
                break e;
              case 3:
                Y.flags = (Y.flags & -65537) | 128;
              case 0:
                if (
                  ((Y = J.payload), (z = typeof Y == 'function' ? Y.call(Ae, L, z) : Y), z == null)
                )
                  break e;
                L = T({}, L, z);
                break e;
              case 2:
                Ba = !0;
            }
          }
          ((z = v.callback),
            z !== null &&
              ((e.flags |= 64),
              M && (e.flags |= 8192),
              (M = n.callbacks),
              M === null ? (n.callbacks = [z]) : M.push(z)));
        } else
          ((M = { lane: z, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            w === null ? ((N = w = M), (_ = L)) : (w = w.next = M),
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
      (w === null && (_ = L),
        (n.baseState = _),
        (n.firstBaseUpdate = N),
        (n.lastBaseUpdate = w),
        i === null && (n.shared.lanes = 0),
        ($a |= f),
        (e.lanes = f),
        (e.memoizedState = L));
    }
  }
  function Hf(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function Uf(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) Hf(a[e], t);
  }
  var on = x(null),
    jc = x(0);
  function Gf(e, t) {
    ((e = ba), $(jc, e), $(on, t), (ba = e | t.baseLanes));
  }
  function ju() {
    ($(jc, ba), $(on, on.current));
  }
  function Tu() {
    ((ba = jc.current), q(on), q(jc));
  }
  var jt = x(null),
    Ut = null;
  function Ha(e) {
    var t = e.alternate;
    ($(qe, qe.current & 1),
      $(jt, e),
      Ut === null && (t === null || on.current !== null || t.memoizedState !== null) && (Ut = e));
  }
  function Au(e) {
    ($(qe, qe.current), $(jt, e), Ut === null && (Ut = e));
  }
  function Vf(e) {
    e.tag === 22 ? ($(qe, qe.current), $(jt, e), Ut === null && (Ut = e)) : Ua();
  }
  function Ua() {
    ($(qe, qe.current), $(jt, jt.current));
  }
  function Tt(e) {
    (q(jt), Ut === e && (Ut = null), q(qe));
  }
  var qe = x(0);
  function Tc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || wo(a) || Ro(a))) return t;
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
  var da = 0,
    ae = null,
    je = null,
    Ge = null,
    Ac = !1,
    rn = !1,
    Tl = !1,
    Nc = 0,
    ci = 0,
    fn = null,
    k0 = 0;
  function Re() {
    throw Error(o(321));
  }
  function Nu(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!St(e[a], t[a])) return !1;
    return !0;
  }
  function zu(e, t, a, l, n, i) {
    return (
      (da = i),
      (ae = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (R.H = e === null || e.memoizedState === null ? Td : $u),
      (Tl = !1),
      (i = a(l, n)),
      (Tl = !1),
      rn && (i = Yf(t, a, l, n)),
      $f(e),
      i
    );
  }
  function $f(e) {
    R.H = oi;
    var t = je !== null && je.next !== null;
    if (((da = 0), (Ge = je = ae = null), (Ac = !1), (ci = 0), (fn = null), t)) throw Error(o(300));
    e === null || Ve || ((e = e.dependencies), e !== null && yc(e) && (Ve = !0));
  }
  function Yf(e, t, a, l) {
    ae = e;
    var n = 0;
    do {
      if ((rn && (fn = null), (ci = 0), (rn = !1), 25 <= n)) throw Error(o(301));
      if (((n += 1), (Ge = je = null), e.updateQueue != null)) {
        var i = e.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((R.H = Ad), (i = t(a, l)));
    } while (rn);
    return i;
  }
  function Z0() {
    var e = R.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? si(t) : t),
      (e = e.useState()[0]),
      (je !== null ? je.memoizedState : null) !== e && (ae.flags |= 1024),
      t
    );
  }
  function Eu() {
    var e = Nc !== 0;
    return ((Nc = 0), e);
  }
  function Mu(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Cu(e) {
    if (Ac) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Ac = !1;
    }
    ((da = 0), (Ge = je = ae = null), (rn = !1), (ci = Nc = 0), (fn = null));
  }
  function ot() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Ge === null ? (ae.memoizedState = Ge = e) : (Ge = Ge.next = e), Ge);
  }
  function He() {
    if (je === null) {
      var e = ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = je.next;
    var t = Ge === null ? ae.memoizedState : Ge.next;
    if (t !== null) ((Ge = t), (je = e));
    else {
      if (e === null) throw ae.alternate === null ? Error(o(467)) : Error(o(310));
      ((je = e),
        (e = {
          memoizedState: je.memoizedState,
          baseState: je.baseState,
          baseQueue: je.baseQueue,
          queue: je.queue,
          next: null,
        }),
        Ge === null ? (ae.memoizedState = Ge = e) : (Ge = Ge.next = e));
    }
    return Ge;
  }
  function zc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function si(e) {
    var t = ci;
    return (
      (ci += 1),
      fn === null && (fn = []),
      (e = Rf(fn, e, t)),
      (t = ae),
      (Ge === null ? t.memoizedState : Ge.next) === null &&
        ((t = t.alternate), (R.H = t === null || t.memoizedState === null ? Td : $u)),
      e
    );
  }
  function Ec(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return si(e);
      if (e.$$typeof === me) return Pe(e);
    }
    throw Error(o(438, String(e)));
  }
  function Ou(e) {
    var t = null,
      a = ae.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var l = ae.alternate;
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
      a === null && ((a = zc()), (ae.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++) a[l] = ut;
    return (t.index++, a);
  }
  function ma(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Mc(e) {
    var t = He();
    return wu(t, je, e);
  }
  function wu(e, t, a) {
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
        _ = null,
        N = t,
        w = !1;
      do {
        var L = N.lane & -536870913;
        if (L !== N.lane ? (ue & L) === L : (da & L) === L) {
          var z = N.revertLane;
          if (z === 0)
            (_ !== null &&
              (_ = _.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: N.action,
                  hasEagerState: N.hasEagerState,
                  eagerState: N.eagerState,
                  next: null,
                }),
              L === nn && (w = !0));
          else if ((da & z) === z) {
            ((N = N.next), z === nn && (w = !0));
            continue;
          } else
            ((L = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null,
            }),
              _ === null ? ((v = _ = L), (f = i)) : (_ = _.next = L),
              (ae.lanes |= z),
              ($a |= z));
          ((L = N.action), Tl && a(i, L), (i = N.hasEagerState ? N.eagerState : a(i, L)));
        } else
          ((z = {
            lane: L,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null,
          }),
            _ === null ? ((v = _ = z), (f = i)) : (_ = _.next = z),
            (ae.lanes |= L),
            ($a |= L));
        N = N.next;
      } while (N !== null && N !== t);
      if (
        (_ === null ? (f = i) : (_.next = v),
        !St(i, e.memoizedState) && ((Ve = !0), w && ((a = cn), a !== null)))
      )
        throw a;
      ((e.memoizedState = i), (e.baseState = f), (e.baseQueue = _), (l.lastRenderedState = i));
    }
    return (n === null && (l.lanes = 0), [e.memoizedState, l.dispatch]);
  }
  function Ru(e) {
    var t = He(),
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
      (St(i, t.memoizedState) || (Ve = !0),
        (t.memoizedState = i),
        t.baseQueue === null && (t.baseState = i),
        (a.lastRenderedState = i));
    }
    return [i, l];
  }
  function kf(e, t, a) {
    var l = ae,
      n = He(),
      i = fe;
    if (i) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var f = !St((je || n).memoizedState, a);
    if (
      (f && ((n.memoizedState = a), (Ve = !0)),
      (n = n.queue),
      Lu(Qf.bind(null, l, n, e), [e]),
      n.getSnapshot !== t || f || (Ge !== null && Ge.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        dn(9, { destroy: void 0 }, Xf.bind(null, l, n, a, t), null),
        ze === null)
      )
        throw Error(o(349));
      i || (da & 127) !== 0 || Zf(l, t, a);
    }
    return a;
  }
  function Zf(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = ae.updateQueue),
      t === null
        ? ((t = zc()), (ae.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function Xf(e, t, a, l) {
    ((t.value = a), (t.getSnapshot = l), Kf(t) && Jf(e));
  }
  function Qf(e, t, a) {
    return a(function () {
      Kf(t) && Jf(e);
    });
  }
  function Kf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !St(e, a);
    } catch {
      return !0;
    }
  }
  function Jf(e) {
    var t = vl(e, 2);
    t !== null && gt(t, e, 2);
  }
  function Du(e) {
    var t = ot();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Tl)) {
        Ea(!0);
        try {
          a();
        } finally {
          Ea(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ma,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Wf(e, t, a, l) {
    return ((e.baseState = a), wu(e, je, typeof l == 'function' ? l : ma));
  }
  function X0(e, t, a, l, n) {
    if (wc(e)) throw Error(o(485));
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
      (R.T !== null ? a(!0) : (i.isTransition = !1),
        l(i),
        (a = t.pending),
        a === null
          ? ((i.next = t.pending = i), Ff(t, i))
          : ((i.next = a.next), (t.pending = a.next = i)));
    }
  }
  function Ff(e, t) {
    var a = t.action,
      l = t.payload,
      n = e.state;
    if (t.isTransition) {
      var i = R.T,
        f = {};
      R.T = f;
      try {
        var v = a(n, l),
          _ = R.S;
        (_ !== null && _(f, v), If(e, t, v));
      } catch (N) {
        Bu(e, t, N);
      } finally {
        (i !== null && f.types !== null && (i.types = f.types), (R.T = i));
      }
    } else
      try {
        ((i = a(n, l)), If(e, t, i));
      } catch (N) {
        Bu(e, t, N);
      }
  }
  function If(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (l) {
            Pf(e, t, l);
          },
          function (l) {
            return Bu(e, t, l);
          }
        )
      : Pf(e, t, a);
  }
  function Pf(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      ed(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), Ff(e, a))));
  }
  function Bu(e, t, a) {
    var l = e.pending;
    if (((e.pending = null), l !== null)) {
      l = l.next;
      do ((t.status = 'rejected'), (t.reason = a), ed(t), (t = t.next));
      while (t !== l);
    }
    e.action = null;
  }
  function ed(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function td(e, t) {
    return t;
  }
  function ad(e, t) {
    if (fe) {
      var a = ze.formState;
      if (a !== null) {
        e: {
          var l = ae;
          if (fe) {
            if (Me) {
              t: {
                for (var n = Me, i = Ht; n.nodeType !== 8; ) {
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
                ((Me = Gt(n.nextSibling)), (l = n.data === 'F!'));
                break e;
              }
            }
            Ra(l);
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
        lastRenderedReducer: td,
        lastRenderedState: t,
      }),
      (a.queue = l),
      (a = Sd.bind(null, ae, l)),
      (l.dispatch = a),
      (l = Du(!1)),
      (i = Vu.bind(null, ae, !1, l.queue)),
      (l = ot()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (l.queue = n),
      (a = X0.bind(null, ae, n, i, a)),
      (n.dispatch = a),
      (l.memoizedState = e),
      [t, a, !1]
    );
  }
  function ld(e) {
    var t = He();
    return nd(t, je, e);
  }
  function nd(e, t, a) {
    if (
      ((t = wu(e, t, td)[0]),
      (e = Mc(ma)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var l = si(t);
      } catch (f) {
        throw f === sn ? _c : f;
      }
    else l = t;
    t = He();
    var n = t.queue,
      i = n.dispatch;
    return (
      a !== t.memoizedState &&
        ((ae.flags |= 2048), dn(9, { destroy: void 0 }, Q0.bind(null, n, a), null)),
      [l, i, e]
    );
  }
  function Q0(e, t) {
    e.action = t;
  }
  function id(e) {
    var t = He(),
      a = je;
    if (a !== null) return nd(t, a, e);
    (He(), (t = t.memoizedState), (a = He()));
    var l = a.queue.dispatch;
    return ((a.memoizedState = e), [t, l, !1]);
  }
  function dn(e, t, a, l) {
    return (
      (e = { tag: e, create: a, deps: l, inst: t, next: null }),
      (t = ae.updateQueue),
      t === null && ((t = zc()), (ae.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((l = a.next), (a.next = e), (e.next = l), (t.lastEffect = e)),
      e
    );
  }
  function cd() {
    return He().memoizedState;
  }
  function Cc(e, t, a, l) {
    var n = ot();
    ((ae.flags |= e),
      (n.memoizedState = dn(1 | t, { destroy: void 0 }, a, l === void 0 ? null : l)));
  }
  function Oc(e, t, a, l) {
    var n = He();
    l = l === void 0 ? null : l;
    var i = n.memoizedState.inst;
    je !== null && l !== null && Nu(l, je.memoizedState.deps)
      ? (n.memoizedState = dn(t, i, a, l))
      : ((ae.flags |= e), (n.memoizedState = dn(1 | t, i, a, l)));
  }
  function sd(e, t) {
    Cc(8390656, 8, e, t);
  }
  function Lu(e, t) {
    Oc(2048, 8, e, t);
  }
  function K0(e) {
    ae.flags |= 4;
    var t = ae.updateQueue;
    if (t === null) ((t = zc()), (ae.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function ud(e) {
    var t = He().memoizedState;
    return (
      K0({ ref: t, nextImpl: e }),
      function () {
        if ((ge & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function od(e, t) {
    return Oc(4, 2, e, t);
  }
  function rd(e, t) {
    return Oc(4, 4, e, t);
  }
  function fd(e, t) {
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
  function dd(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), Oc(4, 4, fd.bind(null, t, e), a));
  }
  function qu() {}
  function md(e, t) {
    var a = He();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Nu(t, l[1]) ? l[0] : ((a.memoizedState = [e, t]), e);
  }
  function hd(e, t) {
    var a = He();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Nu(t, l[1])) return l[0];
    if (((l = e()), Tl)) {
      Ea(!0);
      try {
        e();
      } finally {
        Ea(!1);
      }
    }
    return ((a.memoizedState = [l, t]), l);
  }
  function Hu(e, t, a) {
    return a === void 0 || ((da & 1073741824) !== 0 && (ue & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = vm()), (ae.lanes |= e), ($a |= e), a);
  }
  function vd(e, t, a, l) {
    return St(a, t)
      ? a
      : on.current !== null
        ? ((e = Hu(e, a, l)), St(e, t) || (Ve = !0), e)
        : (da & 42) === 0 || ((da & 1073741824) !== 0 && (ue & 261930) === 0)
          ? ((Ve = !0), (e.memoizedState = a))
          : ((e = vm()), (ae.lanes |= e), ($a |= e), t);
  }
  function yd(e, t, a, l, n) {
    var i = V.p;
    V.p = i !== 0 && 8 > i ? i : 8;
    var f = R.T,
      v = {};
    ((R.T = v), Vu(e, !1, t, a));
    try {
      var _ = n(),
        N = R.S;
      if (
        (N !== null && N(v, _), _ !== null && typeof _ == 'object' && typeof _.then == 'function')
      ) {
        var w = Y0(_, l);
        ui(e, t, w, zt(e));
      } else ui(e, t, l, zt(e));
    } catch (L) {
      ui(e, t, { then: function () {}, status: 'rejected', reason: L }, zt());
    } finally {
      ((V.p = i), f !== null && v.types !== null && (f.types = v.types), (R.T = f));
    }
  }
  function J0() {}
  function Uu(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var n = gd(e).queue;
    yd(
      e,
      n,
      t,
      W,
      a === null
        ? J0
        : function () {
            return (pd(e), a(l));
          }
    );
  }
  function gd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: W,
      baseState: W,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ma,
        lastRenderedState: W,
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
          lastRenderedReducer: ma,
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
    var t = gd(e);
    (t.next === null && (t = e.alternate.memoizedState), ui(e, t.next.queue, {}, zt()));
  }
  function Gu() {
    return Pe(Ai);
  }
  function _d() {
    return He().memoizedState;
  }
  function bd() {
    return He().memoizedState;
  }
  function W0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = zt();
          e = La(a);
          var l = qa(t, e, a);
          (l !== null && (gt(l, t, a), li(l, t, a)), (t = { cache: vu() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function F0(e, t, a) {
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
      wc(e) ? xd(t, a) : ((a = nu(e, t, a, l)), a !== null && (gt(a, e, l), jd(a, t, l))));
  }
  function Sd(e, t, a) {
    var l = zt();
    ui(e, t, a, l);
  }
  function ui(e, t, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (wc(e)) xd(t, n);
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
          if (((n.hasEagerState = !0), (n.eagerState = v), St(v, f)))
            return (dc(e, t, n, 0), ze === null && fc(), !1);
        } catch {
        } finally {
        }
      if (((a = nu(e, t, n, l)), a !== null)) return (gt(a, e, l), jd(a, t, l), !0);
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
      wc(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = nu(e, a, l, 2)), t !== null && gt(t, e, 2));
  }
  function wc(e) {
    var t = e.alternate;
    return e === ae || (t !== null && t === ae);
  }
  function xd(e, t) {
    rn = Ac = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function jd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      ((l &= e.pendingLanes), (a |= l), (t.lanes = a), zr(e, a));
    }
  }
  var oi = {
    readContext: Pe,
    use: Ec,
    useCallback: Re,
    useContext: Re,
    useEffect: Re,
    useImperativeHandle: Re,
    useLayoutEffect: Re,
    useInsertionEffect: Re,
    useMemo: Re,
    useReducer: Re,
    useRef: Re,
    useState: Re,
    useDebugValue: Re,
    useDeferredValue: Re,
    useTransition: Re,
    useSyncExternalStore: Re,
    useId: Re,
    useHostTransitionStatus: Re,
    useFormState: Re,
    useActionState: Re,
    useOptimistic: Re,
    useMemoCache: Re,
    useCacheRefresh: Re,
  };
  oi.useEffectEvent = Re;
  var Td = {
      readContext: Pe,
      use: Ec,
      useCallback: function (e, t) {
        return ((ot().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Pe,
      useEffect: sd,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), Cc(4194308, 4, fd.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return Cc(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Cc(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = ot();
        t = t === void 0 ? null : t;
        var l = e();
        if (Tl) {
          Ea(!0);
          try {
            e();
          } finally {
            Ea(!1);
          }
        }
        return ((a.memoizedState = [l, t]), l);
      },
      useReducer: function (e, t, a) {
        var l = ot();
        if (a !== void 0) {
          var n = a(t);
          if (Tl) {
            Ea(!0);
            try {
              a(t);
            } finally {
              Ea(!1);
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
          (e = e.dispatch = F0.bind(null, ae, e)),
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
          a = Sd.bind(null, ae, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: qu,
      useDeferredValue: function (e, t) {
        var a = ot();
        return Hu(a, e, t);
      },
      useTransition: function () {
        var e = Du(!1);
        return ((e = yd.bind(null, ae, e.queue, !0, !1)), (ot().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var l = ae,
          n = ot();
        if (fe) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = t()), ze === null)) throw Error(o(349));
          (ue & 127) !== 0 || Zf(l, t, a);
        }
        n.memoizedState = a;
        var i = { value: a, getSnapshot: t };
        return (
          (n.queue = i),
          sd(Qf.bind(null, l, i, e), [e]),
          (l.flags |= 2048),
          dn(9, { destroy: void 0 }, Xf.bind(null, l, i, a, t), null),
          a
        );
      },
      useId: function () {
        var e = ot(),
          t = ze.identifierPrefix;
        if (fe) {
          var a = ta,
            l = ea;
          ((a = (l & ~(1 << (32 - bt(l) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = Nc++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = k0++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Gu,
      useFormState: ad,
      useActionState: ad,
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
        return ((t.queue = a), (t = Vu.bind(null, ae, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: Ou,
      useCacheRefresh: function () {
        return (ot().memoizedState = W0.bind(null, ae));
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
      use: Ec,
      useCallback: md,
      useContext: Pe,
      useEffect: Lu,
      useImperativeHandle: dd,
      useInsertionEffect: od,
      useLayoutEffect: rd,
      useMemo: hd,
      useReducer: Mc,
      useRef: cd,
      useState: function () {
        return Mc(ma);
      },
      useDebugValue: qu,
      useDeferredValue: function (e, t) {
        var a = He();
        return vd(a, je.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Mc(ma)[0],
          t = He().memoizedState;
        return [typeof e == 'boolean' ? e : si(e), t];
      },
      useSyncExternalStore: kf,
      useId: _d,
      useHostTransitionStatus: Gu,
      useFormState: ld,
      useActionState: ld,
      useOptimistic: function (e, t) {
        var a = He();
        return Wf(a, je, e, t);
      },
      useMemoCache: Ou,
      useCacheRefresh: bd,
    };
  $u.useEffectEvent = ud;
  var Ad = {
    readContext: Pe,
    use: Ec,
    useCallback: md,
    useContext: Pe,
    useEffect: Lu,
    useImperativeHandle: dd,
    useInsertionEffect: od,
    useLayoutEffect: rd,
    useMemo: hd,
    useReducer: Ru,
    useRef: cd,
    useState: function () {
      return Ru(ma);
    },
    useDebugValue: qu,
    useDeferredValue: function (e, t) {
      var a = He();
      return je === null ? Hu(a, e, t) : vd(a, je.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Ru(ma)[0],
        t = He().memoizedState;
      return [typeof e == 'boolean' ? e : si(e), t];
    },
    useSyncExternalStore: kf,
    useId: _d,
    useHostTransitionStatus: Gu,
    useFormState: id,
    useActionState: id,
    useOptimistic: function (e, t) {
      var a = He();
      return je !== null ? Wf(a, je, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: Ou,
    useCacheRefresh: bd,
  };
  Ad.useEffectEvent = ud;
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
        n = La(l);
      ((n.payload = t),
        a != null && (n.callback = a),
        (t = qa(e, n, l)),
        t !== null && (gt(t, e, l), li(t, e, l)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var l = zt(),
        n = La(l);
      ((n.tag = 1),
        (n.payload = t),
        a != null && (n.callback = a),
        (t = qa(e, n, l)),
        t !== null && (gt(t, e, l), li(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = zt(),
        l = La(a);
      ((l.tag = 2),
        t != null && (l.callback = t),
        (t = qa(e, l, a)),
        t !== null && (gt(t, e, a), li(t, e, a)));
    },
  };
  function Nd(e, t, a, l, n, i, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(l, i, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Jn(a, l) || !Jn(n, i)
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
  function Al(e, t) {
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
  function Ed(e) {
    rc(e);
  }
  function Md(e) {
    console.error(e);
  }
  function Cd(e) {
    rc(e);
  }
  function Rc(e, t) {
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
      (a = La(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Rc(e, t);
      }),
      a
    );
  }
  function wd(e) {
    return ((e = La(e)), (e.tag = 3), e);
  }
  function Rd(e, t, a, l) {
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
          typeof n != 'function' && (Ya === null ? (Ya = new Set([this])) : Ya.add(this)));
        var v = l.stack;
        this.componentDidCatch(l.value, { componentStack: v !== null ? v : '' });
      });
  }
  function I0(e, t, a, l, n) {
    if (((a.flags |= 32768), l !== null && typeof l == 'object' && typeof l.then == 'function')) {
      if (((t = a.alternate), t !== null && ln(t, a, n, !0), (a = jt.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Ut === null ? Zc() : a.alternate === null && De === 0 && (De = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = n),
              l === bc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([l])) : t.add(l),
                  go(e, l, n)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              l === bc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([l])) : a.add(l)),
                  go(e, l, n)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (go(e, l, n), Zc(), !1);
    }
    if (fe)
      return (
        (t = jt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            l !== ru && ((e = Error(o(422), { cause: l })), In(Bt(e, a))))
          : (l !== ru && ((t = Error(o(423), { cause: l })), In(Bt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (n &= -n),
            (e.lanes |= n),
            (l = Bt(l, a)),
            (n = Zu(e.stateNode, l, n)),
            Su(e, n),
            De !== 4 && (De = 2)),
        !1
      );
    var i = Error(o(520), { cause: l });
    if (((i = Bt(i, a)), gi === null ? (gi = [i]) : gi.push(i), De !== 4 && (De = 2), t === null))
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
                  (Ya === null || !Ya.has(i)))))
          )
            return (
              (a.flags |= 65536),
              (n &= -n),
              (a.lanes |= n),
              (n = wd(n)),
              Rd(n, e, a, l),
              Su(a, n),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Xu = Error(o(461)),
    Ve = !1;
  function et(e, t, a, l) {
    t.child = e === null ? qf(t, null, a, l) : jl(t, e.child, a, l);
  }
  function Dd(e, t, a, l, n) {
    a = a.render;
    var i = t.ref;
    if ('ref' in l) {
      var f = {};
      for (var v in l) v !== 'ref' && (f[v] = l[v]);
    } else f = l;
    return (
      _l(t),
      (l = zu(e, t, a, f, i, n)),
      (v = Eu()),
      e !== null && !Ve
        ? (Mu(e, t, n), ha(e, t, n))
        : (fe && v && uu(t), (t.flags |= 1), et(e, t, l, n), t.child)
    );
  }
  function Bd(e, t, a, l, n) {
    if (e === null) {
      var i = a.type;
      return typeof i == 'function' && !iu(i) && i.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = i), Ld(e, t, i, l, n))
        : ((e = hc(a.type, null, l, t, t.mode, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((i = e.child), !eo(e, n))) {
      var f = i.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Jn), a(f, l) && e.ref === t.ref))
        return ha(e, t, n);
    }
    return ((t.flags |= 1), (e = ua(i, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function Ld(e, t, a, l, n) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Jn(i, l) && e.ref === t.ref)
        if (((Ve = !1), (t.pendingProps = l = i), eo(e, n))) (e.flags & 131072) !== 0 && (Ve = !0);
        else return ((t.lanes = e.lanes), ha(e, t, n));
    }
    return Qu(e, t, a, l, n);
  }
  function qd(e, t, a, l) {
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
        return Hd(e, t, i, a, l);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && pc(t, i !== null ? i.cachePool : null),
          i !== null ? Gf(t, i) : ju(),
          Vf(t));
      else return ((l = t.lanes = 536870912), Hd(e, t, i !== null ? i.baseLanes | a : a, a, l));
    } else
      i !== null
        ? (pc(t, i.cachePool), Gf(t, i), Ua(), (t.memoizedState = null))
        : (e !== null && pc(t, null), ju(), Ua());
    return (et(e, t, n, a), t.child);
  }
  function ri(e, t) {
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
  function Hd(e, t, a, l, n) {
    var i = gu();
    return (
      (i = i === null ? null : { parent: Ue._currentValue, pool: i }),
      (t.memoizedState = { baseLanes: a, cachePool: i }),
      e !== null && pc(t, null),
      ju(),
      Vf(t),
      e !== null && ln(e, t, l, !0),
      (t.childLanes = n),
      null
    );
  }
  function Dc(e, t) {
    return (
      (t = Lc({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Ud(e, t, a) {
    return (
      jl(t, e.child, null, a),
      (e = Dc(t, t.pendingProps)),
      (e.flags |= 2),
      Tt(t),
      (t.memoizedState = null),
      e
    );
  }
  function P0(e, t, a) {
    var l = t.pendingProps,
      n = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (fe) {
        if (l.mode === 'hidden') return ((e = Dc(t, l)), (t.lanes = 536870912), ri(null, e));
        if (
          (Au(t),
          (e = Me)
            ? ((e = Fm(e, Ht)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Oa !== null ? { id: ea, overflow: ta } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = xf(e)),
                (a.return = t),
                (t.child = a),
                (Ie = t),
                (Me = null)))
            : (e = null),
          e === null)
        )
          throw Ra(t);
        return ((t.lanes = 536870912), null);
      }
      return Dc(t, l);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var f = i.dehydrated;
      if ((Au(t), n))
        if (t.flags & 256) ((t.flags &= -257), (t = Ud(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if ((Ve || ln(e, t, a, !1), (n = (a & e.childLanes) !== 0), Ve || n)) {
        if (((l = ze), l !== null && ((f = Er(l, a)), f !== 0 && f !== i.retryLane)))
          throw ((i.retryLane = f), vl(e, f), gt(l, e, f), Xu);
        (Zc(), (t = Ud(e, t, a)));
      } else
        ((e = i.treeContext),
          (Me = Gt(f.nextSibling)),
          (Ie = t),
          (fe = !0),
          (wa = null),
          (Ht = !1),
          e !== null && Af(t, e),
          (t = Dc(t, l)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = ua(e.child, { mode: l.mode, children: l.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Bc(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Qu(e, t, a, l, n) {
    return (
      _l(t),
      (a = zu(e, t, a, l, void 0, n)),
      (l = Eu()),
      e !== null && !Ve
        ? (Mu(e, t, n), ha(e, t, n))
        : (fe && l && uu(t), (t.flags |= 1), et(e, t, a, n), t.child)
    );
  }
  function Gd(e, t, a, l, n, i) {
    return (
      _l(t),
      (t.updateQueue = null),
      (a = Yf(t, l, a, n)),
      $f(e),
      (l = Eu()),
      e !== null && !Ve
        ? (Mu(e, t, i), ha(e, t, i))
        : (fe && l && uu(t), (t.flags |= 1), et(e, t, a, i), t.child)
    );
  }
  function Vd(e, t, a, l, n) {
    if ((_l(t), t.stateNode === null)) {
      var i = Pl,
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
        _u(t),
        (f = a.contextType),
        (i.context = typeof f == 'object' && f !== null ? Pe(f) : Pl),
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
          ii(t, l, i, n),
          ni(),
          (i.state = t.memoizedState)),
        typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
        (l = !0));
    } else if (e === null) {
      i = t.stateNode;
      var v = t.memoizedProps,
        _ = Al(a, v);
      i.props = _;
      var N = i.context,
        w = a.contextType;
      ((f = Pl), typeof w == 'object' && w !== null && (f = Pe(w)));
      var L = a.getDerivedStateFromProps;
      ((w = typeof L == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        w ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((v || N !== f) && zd(t, i, l, f)),
        (Ba = !1));
      var z = t.memoizedState;
      ((i.state = z),
        ii(t, l, i, n),
        ni(),
        (N = t.memoizedState),
        v || z !== N || Ba
          ? (typeof L == 'function' && (Yu(t, a, L, l), (N = t.memoizedState)),
            (_ = Ba || Nd(t, a, _, l, z, N, f))
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
            (l = _))
          : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (l = !1)));
    } else {
      ((i = t.stateNode),
        bu(e, t),
        (f = t.memoizedProps),
        (w = Al(a, f)),
        (i.props = w),
        (L = t.pendingProps),
        (z = i.context),
        (N = a.contextType),
        (_ = Pl),
        typeof N == 'object' && N !== null && (_ = Pe(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((f !== L || z !== _) && zd(t, i, l, _)),
        (Ba = !1),
        (z = t.memoizedState),
        (i.state = z),
        ii(t, l, i, n),
        ni());
      var M = t.memoizedState;
      f !== L || z !== M || Ba || (e !== null && e.dependencies !== null && yc(e.dependencies))
        ? (typeof v == 'function' && (Yu(t, a, v, l), (M = t.memoizedState)),
          (w =
            Ba ||
            Nd(t, a, w, l, z, M, _) ||
            (e !== null && e.dependencies !== null && yc(e.dependencies)))
            ? (N ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(l, M, _),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(l, M, _)),
              typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (f === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (f === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = l),
              (t.memoizedState = M)),
          (i.props = l),
          (i.state = M),
          (i.context = _),
          (l = w))
        : (typeof i.componentDidUpdate != 'function' ||
            (f === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (f === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 1024),
          (l = !1));
    }
    return (
      (i = l),
      Bc(e, t),
      (l = (t.flags & 128) !== 0),
      i || l
        ? ((i = t.stateNode),
          (a = l && typeof a.getDerivedStateFromError != 'function' ? null : i.render()),
          (t.flags |= 1),
          e !== null && l
            ? ((t.child = jl(t, e.child, null, n)), (t.child = jl(t, null, a, n)))
            : et(e, t, a, n),
          (t.memoizedState = i.state),
          (e = t.child))
        : (e = ha(e, t, n)),
      e
    );
  }
  function $d(e, t, a, l) {
    return (gl(), (t.flags |= 256), et(e, t, a, l), t.child);
  }
  var Ku = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Ju(e) {
    return { baseLanes: e, cachePool: Of() };
  }
  function Wu(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Nt), e);
  }
  function Yd(e, t, a) {
    var l = t.pendingProps,
      n = !1,
      i = (t.flags & 128) !== 0,
      f;
    if (
      ((f = i) || (f = e !== null && e.memoizedState === null ? !1 : (qe.current & 2) !== 0),
      f && ((n = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (fe) {
        if (
          (n ? Ha(t) : Ua(),
          (e = Me)
            ? ((e = Fm(e, Ht)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Oa !== null ? { id: ea, overflow: ta } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = xf(e)),
                (a.return = t),
                (t.child = a),
                (Ie = t),
                (Me = null)))
            : (e = null),
          e === null)
        )
          throw Ra(t);
        return (Ro(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = l.children;
      return (
        (l = l.fallback),
        n
          ? (Ua(),
            (n = t.mode),
            (v = Lc({ mode: 'hidden', children: v }, n)),
            (l = yl(l, n, a, null)),
            (v.return = t),
            (l.return = t),
            (v.sibling = l),
            (t.child = v),
            (l = t.child),
            (l.memoizedState = Ju(a)),
            (l.childLanes = Wu(e, f, a)),
            (t.memoizedState = Ku),
            ri(null, l))
          : (Ha(t), Fu(t, v))
      );
    }
    var _ = e.memoizedState;
    if (_ !== null && ((v = _.dehydrated), v !== null)) {
      if (i)
        t.flags & 256
          ? (Ha(t), (t.flags &= -257), (t = Iu(e, t, a)))
          : t.memoizedState !== null
            ? (Ua(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Ua(),
              (v = l.fallback),
              (n = t.mode),
              (l = Lc({ mode: 'visible', children: l.children }, n)),
              (v = yl(v, n, a, null)),
              (v.flags |= 2),
              (l.return = t),
              (v.return = t),
              (l.sibling = v),
              (t.child = l),
              jl(t, e.child, null, a),
              (l = t.child),
              (l.memoizedState = Ju(a)),
              (l.childLanes = Wu(e, f, a)),
              (t.memoizedState = Ku),
              (t = ri(null, l)));
      else if ((Ha(t), Ro(v))) {
        if (((f = v.nextSibling && v.nextSibling.dataset), f)) var N = f.dgst;
        ((f = N),
          (l = Error(o(419))),
          (l.stack = ''),
          (l.digest = f),
          In({ value: l, source: null, stack: null }),
          (t = Iu(e, t, a)));
      } else if ((Ve || ln(e, t, a, !1), (f = (a & e.childLanes) !== 0), Ve || f)) {
        if (((f = ze), f !== null && ((l = Er(f, a)), l !== 0 && l !== _.retryLane)))
          throw ((_.retryLane = l), vl(e, l), gt(f, e, l), Xu);
        (wo(v) || Zc(), (t = Iu(e, t, a)));
      } else
        wo(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = _.treeContext),
            (Me = Gt(v.nextSibling)),
            (Ie = t),
            (fe = !0),
            (wa = null),
            (Ht = !1),
            e !== null && Af(t, e),
            (t = Fu(t, l.children)),
            (t.flags |= 4096));
      return t;
    }
    return n
      ? (Ua(),
        (v = l.fallback),
        (n = t.mode),
        (_ = e.child),
        (N = _.sibling),
        (l = ua(_, { mode: 'hidden', children: l.children })),
        (l.subtreeFlags = _.subtreeFlags & 65011712),
        N !== null ? (v = ua(N, v)) : ((v = yl(v, n, a, null)), (v.flags |= 2)),
        (v.return = t),
        (l.return = t),
        (l.sibling = v),
        (t.child = l),
        ri(null, l),
        (l = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = Ju(a))
          : ((n = v.cachePool),
            n !== null
              ? ((_ = Ue._currentValue), (n = n.parent !== _ ? { parent: _, pool: _ } : n))
              : (n = Of()),
            (v = { baseLanes: v.baseLanes | a, cachePool: n })),
        (l.memoizedState = v),
        (l.childLanes = Wu(e, f, a)),
        (t.memoizedState = Ku),
        ri(e.child, l))
      : (Ha(t),
        (a = e.child),
        (e = a.sibling),
        (a = ua(a, { mode: 'visible', children: l.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((f = t.deletions), f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function Fu(e, t) {
    return ((t = Lc({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Lc(e, t) {
    return ((e = xt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Iu(e, t, a) {
    return (
      jl(t, e.child, null, a),
      (e = Fu(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function kd(e, t, a) {
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
  function Zd(e, t, a) {
    var l = t.pendingProps,
      n = l.revealOrder,
      i = l.tail;
    l = l.children;
    var f = qe.current,
      v = (f & 2) !== 0;
    if (
      (v ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      $(qe, f),
      et(e, t, l, a),
      (l = fe ? Fn : 0),
      !v && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && kd(e, a, t);
        else if (e.tag === 19) kd(e, a, t);
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
          ((e = a.alternate), e !== null && Tc(e) === null && (n = a), (a = a.sibling));
        ((a = n),
          a === null ? ((n = t.child), (t.child = null)) : ((n = a.sibling), (a.sibling = null)),
          Pu(t, !1, n, a, i, l));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, n = t.child, t.child = null; n !== null; ) {
          if (((e = n.alternate), e !== null && Tc(e) === null)) {
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
  function ha(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), ($a |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((ln(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = ua(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = ua(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function eo(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && yc(e)));
  }
  function ev(e, t, a) {
    switch (t.tag) {
      case 3:
        (We(t, t.stateNode.containerInfo), Da(t, Ue, e.memoizedState.cache), gl());
        break;
      case 27:
      case 5:
        ol(t);
        break;
      case 4:
        We(t, t.stateNode.containerInfo);
        break;
      case 10:
        Da(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Au(t), null);
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (Ha(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? Yd(e, t, a)
              : (Ha(t), (e = ha(e, t, a)), e !== null ? e.sibling : null);
        Ha(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (
          ((l = (a & t.childLanes) !== 0),
          l || (ln(e, t, a, !1), (l = (a & t.childLanes) !== 0)),
          n)
        ) {
          if (l) return Zd(e, t, a);
          t.flags |= 128;
        }
        if (
          ((n = t.memoizedState),
          n !== null && ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          $(qe, qe.current),
          l)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), qd(e, t, a, t.pendingProps));
      case 24:
        Da(t, Ue, e.memoizedState.cache);
    }
    return ha(e, t, a);
  }
  function Xd(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Ve = !0;
      else {
        if (!eo(e, a) && (t.flags & 128) === 0) return ((Ve = !1), ev(e, t, a));
        Ve = (e.flags & 131072) !== 0;
      }
    else ((Ve = !1), fe && (t.flags & 1048576) !== 0 && Tf(t, Fn, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (((e = Sl(t.elementType)), (t.type = e), typeof e == 'function'))
            iu(e)
              ? ((l = Al(e, l)), (t.tag = 1), (t = Vd(null, t, e, l, a)))
              : ((t.tag = 0), (t = Qu(null, t, e, l, a)));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === be) {
                ((t.tag = 11), (t = Dd(null, t, e, l, a)));
                break e;
              } else if (n === ne) {
                ((t.tag = 14), (t = Bd(null, t, e, l, a)));
                break e;
              }
            }
            throw ((t = Ot(e) || e), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return Qu(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((l = t.type), (n = Al(l, t.pendingProps)), Vd(e, t, l, n, a));
      case 3:
        e: {
          if ((We(t, t.stateNode.containerInfo), e === null)) throw Error(o(387));
          l = t.pendingProps;
          var i = t.memoizedState;
          ((n = i.element), bu(e, t), ii(t, l, null, a));
          var f = t.memoizedState;
          if (
            ((l = f.cache),
            Da(t, Ue, l),
            l !== i.cache && hu(t, [Ue], a, !0),
            ni(),
            (l = f.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: l, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              t = $d(e, t, l, a);
              break e;
            } else if (l !== n) {
              ((n = Bt(Error(o(424)), t)), In(n), (t = $d(e, t, l, a)));
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
                Me = Gt(e.firstChild),
                  Ie = t,
                  fe = !0,
                  wa = null,
                  Ht = !0,
                  a = qf(t, null, l, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((gl(), l === n)) {
              t = ha(e, t, a);
              break e;
            }
            et(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Bc(e, t),
          e === null
            ? (a = lh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : fe ||
                ((a = t.type),
                (e = t.pendingProps),
                (l = Ic(ie.current).createElement(a)),
                (l[Fe] = t),
                (l[ft] = e),
                tt(l, a, e),
                Qe(l),
                (t.stateNode = l))
            : (t.memoizedState = lh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          ol(t),
          e === null &&
            fe &&
            ((l = t.stateNode = eh(t.type, t.pendingProps, ie.current)),
            (Ie = t),
            (Ht = !0),
            (n = Me),
            Qa(t.type) ? ((Do = n), (Me = Gt(l.firstChild))) : (Me = n)),
          et(e, t, t.pendingProps.children, a),
          Bc(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            fe &&
            ((n = l = Me) &&
              ((l = Cv(l, t.type, t.pendingProps, Ht)),
              l !== null
                ? ((t.stateNode = l), (Ie = t), (Me = Gt(l.firstChild)), (Ht = !1), (n = !0))
                : (n = !1)),
            n || Ra(t)),
          ol(t),
          (n = t.type),
          (i = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (l = i.children),
          Mo(n, i) ? (l = null) : f !== null && Mo(n, f) && (t.flags |= 32),
          t.memoizedState !== null && ((n = zu(e, t, Z0, null, null, a)), (Ai._currentValue = n)),
          Bc(e, t),
          et(e, t, l, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            fe &&
            ((e = a = Me) &&
              ((a = Ov(a, t.pendingProps, Ht)),
              a !== null ? ((t.stateNode = a), (Ie = t), (Me = null), (e = !0)) : (e = !1)),
            e || Ra(t)),
          null
        );
      case 13:
        return Yd(e, t, a);
      case 4:
        return (
          We(t, t.stateNode.containerInfo),
          (l = t.pendingProps),
          e === null ? (t.child = jl(t, null, l, a)) : et(e, t, l, a),
          t.child
        );
      case 11:
        return Dd(e, t, t.type, t.pendingProps, a);
      case 7:
        return (et(e, t, t.pendingProps, a), t.child);
      case 8:
        return (et(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (et(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((l = t.pendingProps), Da(t, t.type, l.value), et(e, t, l.children, a), t.child);
      case 9:
        return (
          (n = t.type._context),
          (l = t.pendingProps.children),
          _l(t),
          (n = Pe(n)),
          (l = l(n)),
          (t.flags |= 1),
          et(e, t, l, a),
          t.child
        );
      case 14:
        return Bd(e, t, t.type, t.pendingProps, a);
      case 15:
        return Ld(e, t, t.type, t.pendingProps, a);
      case 19:
        return Zd(e, t, a);
      case 31:
        return P0(e, t, a);
      case 22:
        return qd(e, t, a, t.pendingProps);
      case 24:
        return (
          _l(t),
          (l = Pe(Ue)),
          e === null
            ? ((n = gu()),
              n === null &&
                ((n = ze),
                (i = vu()),
                (n.pooledCache = i),
                i.refCount++,
                i !== null && (n.pooledCacheLanes |= a),
                (n = i)),
              (t.memoizedState = { parent: l, cache: n }),
              _u(t),
              Da(t, Ue, n))
            : ((e.lanes & a) !== 0 && (bu(e, t), ii(t, null, null, a), ni()),
              (n = e.memoizedState),
              (i = t.memoizedState),
              n.parent !== l
                ? ((n = { parent: l, cache: l }),
                  (t.memoizedState = n),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n),
                  Da(t, Ue, l))
                : ((l = i.cache), Da(t, Ue, l), l !== n.cache && hu(t, [Ue], a, !0))),
          et(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function va(e) {
    e.flags |= 4;
  }
  function to(e, t, a, l, n) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (n & 335544128) === n))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (_m()) e.flags |= 8192;
        else throw ((xl = bc), pu);
    } else e.flags &= -16777217;
  }
  function Qd(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !uh(t)))
      if (_m()) e.flags |= 8192;
      else throw ((xl = bc), pu);
  }
  function qc(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Ar() : 536870912), (e.lanes |= t), (yn |= t)));
  }
  function fi(e, t) {
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
  function Ce(e) {
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
  function tv(e, t, a) {
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
        return (Ce(t), null);
      case 1:
        return (Ce(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          fa(Ue),
          we(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (an(t)
              ? va(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), fu())),
          Ce(t),
          null
        );
      case 26:
        var n = t.type,
          i = t.memoizedState;
        return (
          e === null
            ? (va(t), i !== null ? (Ce(t), Qd(t, i)) : (Ce(t), to(t, n, null, l, a)))
            : i
              ? i !== e.memoizedState
                ? (va(t), Ce(t), Qd(t, i))
                : (Ce(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== l && va(t), Ce(t), to(t, n, e, l, a)),
          null
        );
      case 27:
        if ((ql(t), (a = ie.current), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && va(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(o(166));
            return (Ce(t), null);
          }
          ((e = k.current), an(t) ? Nf(t) : ((e = eh(n, l, a)), (t.stateNode = e), va(t)));
        }
        return (Ce(t), null);
      case 5:
        if ((ql(t), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && va(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(o(166));
            return (Ce(t), null);
          }
          if (((i = k.current), an(t))) Nf(t);
          else {
            var f = Ic(ie.current);
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
            l && va(t);
          }
        }
        return (Ce(t), to(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== l && va(t);
        else {
          if (typeof l != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = ie.current), an(t))) {
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
                Ym(e.nodeValue, a)
              )),
              e || Ra(t, !0));
          } else ((e = Ic(e).createTextNode(l)), (e[Fe] = t), (t.stateNode = e));
        }
        return (Ce(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((l = an(t)), a !== null)) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(o(557));
              e[Fe] = t;
            } else (gl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ce(t), (e = !1));
          } else
            ((a = fu()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (Tt(t), t) : (Tt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return (Ce(t), null);
      case 13:
        if (
          ((l = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((n = an(t)), l !== null && l.dehydrated !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (((n = t.memoizedState), (n = n !== null ? n.dehydrated : null), !n))
                throw Error(o(317));
              n[Fe] = t;
            } else (gl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ce(t), (n = !1));
          } else
            ((n = fu()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
              (n = !0));
          if (!n) return t.flags & 256 ? (Tt(t), t) : (Tt(t), null);
        }
        return (
          Tt(t),
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
              qc(t, t.updateQueue),
              Ce(t),
              null)
        );
      case 4:
        return (we(), e === null && To(t.stateNode.containerInfo), Ce(t), null);
      case 10:
        return (fa(t.type), Ce(t), null);
      case 19:
        if ((q(qe), (l = t.memoizedState), l === null)) return (Ce(t), null);
        if (((n = (t.flags & 128) !== 0), (i = l.rendering), i === null))
          if (n) fi(l, !1);
          else {
            if (De !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((i = Tc(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      fi(l, !1),
                      e = i.updateQueue,
                      t.updateQueue = e,
                      qc(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (Sf(a, e), (a = a.sibling));
                  return ($(qe, (qe.current & 1) | 2), fe && oa(t, l.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            l.tail !== null &&
              pt() > $c &&
              ((t.flags |= 128), (n = !0), fi(l, !1), (t.lanes = 4194304));
          }
        else {
          if (!n)
            if (((e = Tc(i)), e !== null)) {
              if (
                ((t.flags |= 128),
                (n = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                qc(t, e),
                fi(l, !0),
                l.tail === null && l.tailMode === 'hidden' && !i.alternate && !fe)
              )
                return (Ce(t), null);
            } else
              2 * pt() - l.renderingStartTime > $c &&
                a !== 536870912 &&
                ((t.flags |= 128), (n = !0), fi(l, !1), (t.lanes = 4194304));
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
            (a = qe.current),
            $(qe, n ? (a & 1) | 2 : a & 1),
            fe && oa(t, l.treeForkCount),
            e)
          : (Ce(t), null);
      case 22:
      case 23:
        return (
          Tt(t),
          Tu(),
          (l = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== l && (t.flags |= 8192)
            : l && (t.flags |= 8192),
          l
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Ce(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ce(t),
          (a = t.updateQueue),
          a !== null && qc(t, a.retryQueue),
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
          e !== null && q(bl),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          fa(Ue),
          Ce(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function av(e, t) {
    switch ((ou(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          fa(Ue),
          we(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (ql(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Tt(t), t.alternate === null)) throw Error(o(340));
          gl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Tt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(o(340));
          gl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (q(qe), null);
      case 4:
        return (we(), null);
      case 10:
        return (fa(t.type), null);
      case 22:
      case 23:
        return (
          Tt(t),
          Tu(),
          e !== null && q(bl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (fa(Ue), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kd(e, t) {
    switch ((ou(t), t.tag)) {
      case 3:
        (fa(Ue), we());
        break;
      case 26:
      case 27:
      case 5:
        ql(t);
        break;
      case 4:
        we();
        break;
      case 31:
        t.memoizedState !== null && Tt(t);
        break;
      case 13:
        Tt(t);
        break;
      case 19:
        q(qe);
        break;
      case 10:
        fa(t.type);
        break;
      case 22:
      case 23:
        (Tt(t), Tu(), e !== null && q(bl));
        break;
      case 24:
        fa(Ue);
    }
  }
  function di(e, t) {
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
      xe(t, t.return, v);
    }
  }
  function Ga(e, t, a) {
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
              var _ = a,
                N = v;
              try {
                N();
              } catch (w) {
                xe(n, _, w);
              }
            }
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (w) {
      xe(t, t.return, w);
    }
  }
  function Jd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Uf(t, a);
      } catch (l) {
        xe(e, e.return, l);
      }
    }
  }
  function Wd(e, t, a) {
    ((a.props = Al(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (l) {
      xe(e, t, l);
    }
  }
  function mi(e, t) {
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
      xe(e, t, n);
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
          xe(e, t, n);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (n) {
          xe(e, t, n);
        }
      else a.current = null;
  }
  function Fd(e) {
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
      xe(e, e.return, n);
    }
  }
  function ao(e, t, a) {
    try {
      var l = e.stateNode;
      (Tv(l, e.type, a, t), (l[ft] = t));
    } catch (n) {
      xe(e, e.return, n);
    }
  }
  function Id(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Qa(e.type)) || e.tag === 4
    );
  }
  function lo(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Id(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && Qa(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
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
            a != null || t.onclick !== null || (t.onclick = ca)));
    else if (
      l !== 4 &&
      (l === 27 && Qa(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (no(e, t, a), e = e.sibling; e !== null; ) (no(e, t, a), (e = e.sibling));
  }
  function Hc(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (l !== 4 && (l === 27 && Qa(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (Hc(e, t, a), e = e.sibling; e !== null; ) (Hc(e, t, a), (e = e.sibling));
  }
  function Pd(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
      (tt(t, l, a), (t[Fe] = e), (t[ft] = a));
    } catch (i) {
      xe(e, e.return, i);
    }
  }
  var ya = !1,
    $e = !1,
    io = !1,
    em = typeof WeakSet == 'function' ? WeakSet : Set,
    Ke = null;
  function lv(e, t) {
    if (((e = e.containerInfo), (zo = is), (e = df(e)), Is(e))) {
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
              _ = -1,
              N = 0,
              w = 0,
              L = e,
              z = null;
            t: for (;;) {
              for (
                var M;
                L !== a || (n !== 0 && L.nodeType !== 3) || (v = f + n),
                  L !== i || (l !== 0 && L.nodeType !== 3) || (_ = f + l),
                  L.nodeType === 3 && (f += L.nodeValue.length),
                  (M = L.firstChild) !== null;
              )
                ((z = L), (L = M));
              for (;;) {
                if (L === e) break t;
                if (
                  (z === a && ++N === n && (v = f),
                  z === i && ++w === l && (_ = f),
                  (M = L.nextSibling) !== null)
                )
                  break;
                ((L = z), (z = L.parentNode));
              }
              L = M;
            }
            a = v === -1 || _ === -1 ? null : { start: v, end: _ };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Eo = { focusedElem: e, selectionRange: a }, is = !1, Ke = t; Ke !== null; )
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
                  var Y = Al(a.type, n);
                  ((e = l.getSnapshotBeforeUpdate(Y, i)),
                    (l.__reactInternalSnapshotBeforeUpdate = e));
                } catch (J) {
                  xe(a, a.return, J);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) Oo(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Oo(e);
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
  function tm(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (pa(e, a), l & 4 && di(5, a));
        break;
      case 1:
        if ((pa(e, a), l & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              xe(a, a.return, f);
            }
          else {
            var n = Al(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              xe(a, a.return, f);
            }
          }
        (l & 64 && Jd(a), l & 512 && mi(a, a.return));
        break;
      case 3:
        if ((pa(e, a), l & 64 && ((e = a.updateQueue), e !== null))) {
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
            Uf(e, t);
          } catch (f) {
            xe(a, a.return, f);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Pd(a);
      case 26:
      case 5:
        (pa(e, a), t === null && l & 4 && Fd(a), l & 512 && mi(a, a.return));
        break;
      case 12:
        pa(e, a);
        break;
      case 31:
        (pa(e, a), l & 4 && nm(e, a));
        break;
      case 13:
        (pa(e, a),
          l & 4 && im(e, a),
          l & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = dv.bind(null, a)), wv(e, a)))));
        break;
      case 22:
        if (((l = a.memoizedState !== null || ya), !l)) {
          ((t = (t !== null && t.memoizedState !== null) || $e), (n = ya));
          var i = $e;
          ((ya = l),
            ($e = t) && !i ? _a(e, a, (a.subtreeFlags & 8772) !== 0) : pa(e, a),
            (ya = n),
            ($e = i));
        }
        break;
      case 30:
        break;
      default:
        pa(e, a);
    }
  }
  function am(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), am(t)),
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
  var Oe = null,
    mt = !1;
  function ga(e, t, a) {
    for (a = a.child; a !== null; ) (lm(e, t, a), (a = a.sibling));
  }
  function lm(e, t, a) {
    if (_t && typeof _t.onCommitFiberUnmount == 'function')
      try {
        _t.onCommitFiberUnmount(qn, a);
      } catch {}
    switch (a.tag) {
      case 26:
        ($e || aa(a, t),
          ga(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        $e || aa(a, t);
        var l = Oe,
          n = mt;
        (Qa(a.type) && ((Oe = a.stateNode), (mt = !1)),
          ga(e, t, a),
          xi(a.stateNode),
          (Oe = l),
          (mt = n));
        break;
      case 5:
        $e || aa(a, t);
      case 6:
        if (((l = Oe), (n = mt), (Oe = null), ga(e, t, a), (Oe = l), (mt = n), Oe !== null))
          if (mt)
            try {
              (Oe.nodeType === 9
                ? Oe.body
                : Oe.nodeName === 'HTML'
                  ? Oe.ownerDocument.body
                  : Oe
              ).removeChild(a.stateNode);
            } catch (i) {
              xe(a, t, i);
            }
          else
            try {
              Oe.removeChild(a.stateNode);
            } catch (i) {
              xe(a, t, i);
            }
        break;
      case 18:
        Oe !== null &&
          (mt
            ? ((e = Oe),
              Jm(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              Tn(e))
            : Jm(Oe, a.stateNode));
        break;
      case 4:
        ((l = Oe),
          (n = mt),
          (Oe = a.stateNode.containerInfo),
          (mt = !0),
          ga(e, t, a),
          (Oe = l),
          (mt = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Ga(2, a, t), $e || Ga(4, a, t), ga(e, t, a));
        break;
      case 1:
        ($e ||
          (aa(a, t), (l = a.stateNode), typeof l.componentWillUnmount == 'function' && Wd(a, t, l)),
          ga(e, t, a));
        break;
      case 21:
        ga(e, t, a);
        break;
      case 22:
        (($e = (l = $e) || a.memoizedState !== null), ga(e, t, a), ($e = l));
        break;
      default:
        ga(e, t, a);
    }
  }
  function nm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Tn(e);
      } catch (a) {
        xe(t, t.return, a);
      }
    }
  }
  function im(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Tn(e);
      } catch (a) {
        xe(t, t.return, a);
      }
  }
  function nv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new em()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new em()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Uc(e, t) {
    var a = nv(e);
    t.forEach(function (l) {
      if (!a.has(l)) {
        a.add(l);
        var n = mv.bind(null, e, l);
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
              if (Qa(v.type)) {
                ((Oe = v.stateNode), (mt = !1));
                break e;
              }
              break;
            case 5:
              ((Oe = v.stateNode), (mt = !1));
              break e;
            case 3:
            case 4:
              ((Oe = v.stateNode.containerInfo), (mt = !0));
              break e;
          }
          v = v.return;
        }
        if (Oe === null) throw Error(o(160));
        (lm(i, f, n),
          (Oe = null),
          (mt = !1),
          (i = n.alternate),
          i !== null && (i.return = null),
          (n.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (cm(t, e), (t = t.sibling));
  }
  var Xt = null;
  function cm(e, t) {
    var a = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (ht(t, e), vt(e), l & 4 && (Ga(3, e, e.return), di(3, e), Ga(5, e, e.return)));
        break;
      case 1:
        (ht(t, e),
          vt(e),
          l & 512 && ($e || a === null || aa(a, a.return)),
          l & 64 &&
            ya &&
            ((e = e.updateQueue),
            e !== null &&
              ((l = e.callbacks),
              l !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? l : a.concat(l))))));
        break;
      case 26:
        var n = Xt;
        if ((ht(t, e), vt(e), l & 512 && ($e || a === null || aa(a, a.return)), l & 4)) {
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
                          i[Gn] ||
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
                            break t;
                          }
                      }
                      ((i = n.createElement(l)), tt(i, l, a), n.head.appendChild(i));
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
              } else sh(n, e.type, e.stateNode);
            else e.stateNode = ih(n, l, e.memoizedProps);
          else
            i !== l
              ? (i === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : i.count--,
                l === null ? sh(n, e.type, e.stateNode) : ih(n, l, e.memoizedProps))
              : l === null && e.stateNode !== null && ao(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (ht(t, e),
          vt(e),
          l & 512 && ($e || a === null || aa(a, a.return)),
          a !== null && l & 4 && ao(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((ht(t, e), vt(e), l & 512 && ($e || a === null || aa(a, a.return)), e.flags & 32)) {
          n = e.stateNode;
          try {
            Xl(n, '');
          } catch (Y) {
            xe(e, e.return, Y);
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
            xe(e, e.return, Y);
          }
        }
        break;
      case 3:
        if (
          ((ts = null),
          (n = Xt),
          (Xt = Pc(t.containerInfo)),
          ht(t, e),
          (Xt = n),
          vt(e),
          l & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Tn(t.containerInfo);
          } catch (Y) {
            xe(e, e.return, Y);
          }
        io && ((io = !1), sm(e));
        break;
      case 4:
        ((l = Xt), (Xt = Pc(e.stateNode.containerInfo)), ht(t, e), vt(e), (Xt = l));
        break;
      case 12:
        (ht(t, e), vt(e));
        break;
      case 31:
        (ht(t, e),
          vt(e),
          l & 4 && ((l = e.updateQueue), l !== null && ((e.updateQueue = null), Uc(e, l))));
        break;
      case 13:
        (ht(t, e),
          vt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Vc = pt()),
          l & 4 && ((l = e.updateQueue), l !== null && ((e.updateQueue = null), Uc(e, l))));
        break;
      case 22:
        n = e.memoizedState !== null;
        var _ = a !== null && a.memoizedState !== null,
          N = ya,
          w = $e;
        if (((ya = N || n), ($e = w || _), ht(t, e), ($e = w), (ya = N), vt(e), l & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (a === null || _ || ya || $e || Nl(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                _ = a = t;
                try {
                  if (((i = _.stateNode), n))
                    ((f = i.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    v = _.stateNode;
                    var L = _.memoizedProps.style,
                      z = L != null && L.hasOwnProperty('display') ? L.display : null;
                    v.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (Y) {
                  xe(_, _.return, Y);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                _ = t;
                try {
                  _.stateNode.nodeValue = n ? '' : _.memoizedProps;
                } catch (Y) {
                  xe(_, _.return, Y);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                _ = t;
                try {
                  var M = _.stateNode;
                  n ? Wm(M, !0) : Wm(_.stateNode, !1);
                } catch (Y) {
                  xe(_, _.return, Y);
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
          l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), Uc(e, a))));
        break;
      case 19:
        (ht(t, e),
          vt(e),
          l & 4 && ((l = e.updateQueue), l !== null && ((e.updateQueue = null), Uc(e, l))));
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
              i = lo(e);
            Hc(e, i, n);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && (Xl(f, ''), (a.flags &= -33));
            var v = lo(e);
            Hc(e, v, f);
            break;
          case 3:
          case 4:
            var _ = a.stateNode.containerInfo,
              N = lo(e);
            no(e, N, _);
            break;
          default:
            throw Error(o(161));
        }
      } catch (w) {
        xe(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function sm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (sm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function pa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (tm(e, t.alternate, t), (t = t.sibling));
  }
  function Nl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Ga(4, t, t.return), Nl(t));
          break;
        case 1:
          aa(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && Wd(t, t.return, a), Nl(t));
          break;
        case 27:
          xi(t.stateNode);
        case 26:
        case 5:
          (aa(t, t.return), Nl(t));
          break;
        case 22:
          t.memoizedState === null && Nl(t);
          break;
        case 30:
          Nl(t);
          break;
        default:
          Nl(t);
      }
      e = e.sibling;
    }
  }
  function _a(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate,
        n = e,
        i = t,
        f = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (_a(n, i, a), di(4, i));
          break;
        case 1:
          if ((_a(n, i, a), (l = i), (n = l.stateNode), typeof n.componentDidMount == 'function'))
            try {
              n.componentDidMount();
            } catch (N) {
              xe(l, l.return, N);
            }
          if (((l = i), (n = l.updateQueue), n !== null)) {
            var v = l.stateNode;
            try {
              var _ = n.shared.hiddenCallbacks;
              if (_ !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < _.length; n++) Hf(_[n], v);
            } catch (N) {
              xe(l, l.return, N);
            }
          }
          (a && f & 64 && Jd(i), mi(i, i.return));
          break;
        case 27:
          Pd(i);
        case 26:
        case 5:
          (_a(n, i, a), a && l === null && f & 4 && Fd(i), mi(i, i.return));
          break;
        case 12:
          _a(n, i, a);
          break;
        case 31:
          (_a(n, i, a), a && f & 4 && nm(n, i));
          break;
        case 13:
          (_a(n, i, a), a && f & 4 && im(n, i));
          break;
        case 22:
          (i.memoizedState === null && _a(n, i, a), mi(i, i.return));
          break;
        case 30:
          break;
        default:
          _a(n, i, a);
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
      e !== a && (e != null && e.refCount++, a != null && Pn(a)));
  }
  function so(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Pn(e)));
  }
  function Qt(e, t, a, l) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (um(e, t, a, l), (t = t.sibling));
  }
  function um(e, t, a, l) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Qt(e, t, a, l), n & 2048 && di(9, t));
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
            t !== e && (t.refCount++, e != null && Pn(e))));
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
          } catch (_) {
            xe(t, t.return, _);
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
              : hi(e, t)
            : i._visibility & 2
              ? Qt(e, t, a, l)
              : ((i._visibility |= 2), mn(e, t, a, l, (t.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && co(f, t));
        break;
      case 24:
        (Qt(e, t, a, l), n & 2048 && so(t.alternate, t));
        break;
      default:
        Qt(e, t, a, l);
    }
  }
  function mn(e, t, a, l, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var i = e,
        f = t,
        v = a,
        _ = l,
        N = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (mn(i, f, v, _, n), di(8, f));
          break;
        case 23:
          break;
        case 22:
          var w = f.stateNode;
          (f.memoizedState !== null
            ? w._visibility & 2
              ? mn(i, f, v, _, n)
              : hi(i, f)
            : ((w._visibility |= 2), mn(i, f, v, _, n)),
            n && N & 2048 && co(f.alternate, f));
          break;
        case 24:
          (mn(i, f, v, _, n), n && N & 2048 && so(f.alternate, f));
          break;
        default:
          mn(i, f, v, _, n);
      }
      t = t.sibling;
    }
  }
  function hi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          l = t,
          n = l.flags;
        switch (l.tag) {
          case 22:
            (hi(a, l), n & 2048 && co(l.alternate, l));
            break;
          case 24:
            (hi(a, l), n & 2048 && so(l.alternate, l));
            break;
          default:
            hi(a, l);
        }
        t = t.sibling;
      }
  }
  var vi = 8192;
  function hn(e, t, a) {
    if (e.subtreeFlags & vi) for (e = e.child; e !== null; ) (om(e, t, a), (e = e.sibling));
  }
  function om(e, t, a) {
    switch (e.tag) {
      case 26:
        (hn(e, t, a),
          e.flags & vi && e.memoizedState !== null && kv(a, Xt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        hn(e, t, a);
        break;
      case 3:
      case 4:
        var l = Xt;
        ((Xt = Pc(e.stateNode.containerInfo)), hn(e, t, a), (Xt = l));
        break;
      case 22:
        e.memoizedState === null &&
          ((l = e.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = vi), (vi = 16777216), hn(e, t, a), (vi = l))
            : hn(e, t, a));
        break;
      default:
        hn(e, t, a);
    }
  }
  function rm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function yi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          ((Ke = l), dm(l, e));
        }
      rm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (fm(e), (e = e.sibling));
  }
  function fm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (yi(e), e.flags & 2048 && Ga(9, e, e.return));
        break;
      case 3:
        yi(e);
        break;
      case 12:
        yi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Gc(e))
          : yi(e);
        break;
      default:
        yi(e);
    }
  }
  function Gc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          ((Ke = l), dm(l, e));
        }
      rm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Ga(8, t, t.return), Gc(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Gc(t)));
          break;
        default:
          Gc(t);
      }
      e = e.sibling;
    }
  }
  function dm(e, t) {
    for (; Ke !== null; ) {
      var a = Ke;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ga(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Pn(a.memoizedState.cache);
      }
      if (((l = a.child), l !== null)) ((l.return = a), (Ke = l));
      else
        e: for (a = e; Ke !== null; ) {
          l = Ke;
          var n = l.sibling,
            i = l.return;
          if ((am(l), l === a)) {
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
  var iv = {
      getCacheForType: function (e) {
        var t = Pe(Ue),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return Pe(Ue).controller.signal;
      },
    },
    cv = typeof WeakMap == 'function' ? WeakMap : Map,
    ge = 0,
    ze = null,
    ce = null,
    ue = 0,
    Se = 0,
    At = null,
    Va = !1,
    vn = !1,
    uo = !1,
    ba = 0,
    De = 0,
    $a = 0,
    zl = 0,
    oo = 0,
    Nt = 0,
    yn = 0,
    gi = null,
    yt = null,
    ro = !1,
    Vc = 0,
    mm = 0,
    $c = 1 / 0,
    Yc = null,
    Ya = null,
    ke = 0,
    ka = null,
    gn = null,
    Sa = 0,
    fo = 0,
    mo = null,
    hm = null,
    pi = 0,
    ho = null;
  function zt() {
    return (ge & 2) !== 0 && ue !== 0 ? ue & -ue : R.T !== null ? bo() : Mr();
  }
  function vm() {
    if (Nt === 0)
      if ((ue & 536870912) === 0 || fe) {
        var e = Fi;
        ((Fi <<= 1), (Fi & 3932160) === 0 && (Fi = 262144), (Nt = e));
      } else Nt = 536870912;
    return ((e = jt.current), e !== null && (e.flags |= 32), Nt);
  }
  function gt(e, t, a) {
    (((e === ze && (Se === 2 || Se === 9)) || e.cancelPendingCommit !== null) &&
      (pn(e, 0), Za(e, ue, Nt, !1)),
      Un(e, a),
      ((ge & 2) === 0 || e !== ze) &&
        (e === ze && ((ge & 2) === 0 && (zl |= a), De === 4 && Za(e, ue, Nt, !1)), la(e)));
  }
  function ym(e, t, a) {
    if ((ge & 6) !== 0) throw Error(o(327));
    var l = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Hn(e, t),
      n = l ? ov(e, t) : yo(e, t, !0),
      i = l;
    do {
      if (n === 0) {
        vn && !l && Za(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), i && !sv(a))) {
          ((n = yo(e, t, !1)), (i = !1));
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
              n = gi;
              var _ = v.current.memoizedState.isDehydrated;
              if ((_ && (pn(v, f).flags |= 256), (f = yo(v, f, !1)), f !== 2)) {
                if (uo && !_) {
                  ((v.errorRecoveryDisabledLanes |= i), (zl |= i), (n = 4));
                  break e;
                }
                ((i = yt), (yt = n), i !== null && (yt === null ? (yt = i) : yt.push.apply(yt, i)));
              }
              n = f;
            }
            if (((i = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          (pn(e, 0), Za(e, t, 0, !0));
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
              Za(l, t, Nt, !Va);
              break e;
            case 2:
              yt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((n = Vc + 300 - pt()), 10 < n)) {
            if ((Za(l, t, Nt, !Va), Pi(l, 0, !0) !== 0)) break e;
            ((Sa = t),
              (l.timeoutHandle = Qm(
                gm.bind(null, l, a, yt, Yc, ro, t, Nt, zl, yn, Va, i, 'Throttled', -0, 0),
                n
              )));
            break e;
          }
          gm(l, a, yt, Yc, ro, t, Nt, zl, yn, Va, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    la(e);
  }
  function gm(e, t, a, l, n, i, f, v, _, N, w, L, z, M) {
    if (((e.timeoutHandle = -1), (L = t.subtreeFlags), L & 8192 || (L & 16785408) === 16785408)) {
      ((L = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ca,
      }),
        om(t, i, L));
      var Y = (i & 62914560) === i ? Vc - pt() : (i & 4194048) === i ? mm - pt() : 0;
      if (((Y = Zv(L, Y)), Y !== null)) {
        ((Sa = i),
          (e.cancelPendingCommit = Y(Am.bind(null, e, t, i, a, l, n, f, v, _, w, L, null, z, M))),
          Za(e, i, f, !N));
        return;
      }
    }
    Am(e, t, i, a, l, n, f, v, _);
  }
  function sv(e) {
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
            if (!St(i(), n)) return !1;
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
  function Za(e, t, a, l) {
    ((t &= ~oo),
      (t &= ~zl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      l && (e.warmLanes |= t),
      (l = e.expirationTimes));
    for (var n = t; 0 < n; ) {
      var i = 31 - bt(n),
        f = 1 << i;
      ((l[i] = -1), (n &= ~f));
    }
    a !== 0 && Nr(e, a, t);
  }
  function kc() {
    return (ge & 6) === 0 ? (_i(0), !1) : !0;
  }
  function vo() {
    if (ce !== null) {
      if (Se === 0) var e = ce.return;
      else ((e = ce), (ra = pl = null), Cu(e), (un = null), (ti = 0), (e = ce));
      for (; e !== null; ) (Kd(e.alternate, e), (e = e.return));
      ce = null;
    }
  }
  function pn(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), zv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (Sa = 0),
      vo(),
      (ze = e),
      (ce = a = ua(e.current, null)),
      (ue = t),
      (Se = 0),
      (At = null),
      (Va = !1),
      (vn = Hn(e, t)),
      (uo = !1),
      (yn = Nt = oo = zl = $a = De = 0),
      (yt = gi = null),
      (ro = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var n = 31 - bt(l),
          i = 1 << n;
        ((t |= e[n]), (l &= ~i));
      }
    return ((ba = t), fc(), a);
  }
  function pm(e, t) {
    ((ae = null),
      (R.H = oi),
      t === sn || t === _c
        ? ((t = Df()), (Se = 3))
        : t === pu
          ? ((t = Df()), (Se = 4))
          : (Se =
              t === Xu
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (At = t),
      ce === null && ((De = 1), Rc(e, Bt(t, e.current))));
  }
  function _m() {
    var e = jt.current;
    return e === null
      ? !0
      : (ue & 4194048) === ue
        ? Ut === null
        : (ue & 62914560) === ue || (ue & 536870912) !== 0
          ? e === Ut
          : !1;
  }
  function bm() {
    var e = R.H;
    return ((R.H = oi), e === null ? oi : e);
  }
  function Sm() {
    var e = R.A;
    return ((R.A = iv), e);
  }
  function Zc() {
    ((De = 4),
      Va || ((ue & 4194048) !== ue && jt.current !== null) || (vn = !0),
      (($a & 134217727) === 0 && (zl & 134217727) === 0) || ze === null || Za(ze, ue, Nt, !1));
  }
  function yo(e, t, a) {
    var l = ge;
    ge |= 2;
    var n = bm(),
      i = Sm();
    ((ze !== e || ue !== t) && ((Yc = null), pn(e, t)), (t = !1));
    var f = De;
    e: do
      try {
        if (Se !== 0 && ce !== null) {
          var v = ce,
            _ = At;
          switch (Se) {
            case 8:
              (vo(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jt.current === null && (t = !0);
              var N = Se;
              if (((Se = 0), (At = null), _n(e, v, _, N), a && vn)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((N = Se), (Se = 0), (At = null), _n(e, v, _, N));
          }
        }
        (uv(), (f = De));
        break;
      } catch (w) {
        pm(e, w);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (ra = pl = null),
      (ge = l),
      (R.H = n),
      (R.A = i),
      ce === null && ((ze = null), (ue = 0), fc()),
      f
    );
  }
  function uv() {
    for (; ce !== null; ) xm(ce);
  }
  function ov(e, t) {
    var a = ge;
    ge |= 2;
    var l = bm(),
      n = Sm();
    ze !== e || ue !== t ? ((Yc = null), ($c = pt() + 500), pn(e, t)) : (vn = Hn(e, t));
    e: do
      try {
        if (Se !== 0 && ce !== null) {
          t = ce;
          var i = At;
          t: switch (Se) {
            case 1:
              ((Se = 0), (At = null), _n(e, t, i, 1));
              break;
            case 2:
            case 9:
              if (wf(i)) {
                ((Se = 0), (At = null), jm(t));
                break;
              }
              ((t = function () {
                ((Se !== 2 && Se !== 9) || ze !== e || (Se = 7), la(e));
              }),
                i.then(t, t));
              break e;
            case 3:
              Se = 7;
              break e;
            case 4:
              Se = 5;
              break e;
            case 7:
              wf(i) ? ((Se = 0), (At = null), jm(t)) : ((Se = 0), (At = null), _n(e, t, i, 7));
              break;
            case 5:
              var f = null;
              switch (ce.tag) {
                case 26:
                  f = ce.memoizedState;
                case 5:
                case 27:
                  var v = ce;
                  if (f ? uh(f) : v.stateNode.complete) {
                    ((Se = 0), (At = null));
                    var _ = v.sibling;
                    if (_ !== null) ce = _;
                    else {
                      var N = v.return;
                      N !== null ? ((ce = N), Xc(N)) : (ce = null);
                    }
                    break t;
                  }
              }
              ((Se = 0), (At = null), _n(e, t, i, 5));
              break;
            case 6:
              ((Se = 0), (At = null), _n(e, t, i, 6));
              break;
            case 8:
              (vo(), (De = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        rv();
        break;
      } catch (w) {
        pm(e, w);
      }
    while (!0);
    return (
      (ra = pl = null),
      (R.H = l),
      (R.A = n),
      (ge = a),
      ce !== null ? 0 : ((ze = null), (ue = 0), fc(), De)
    );
  }
  function rv() {
    for (; ce !== null && !R1(); ) xm(ce);
  }
  function xm(e) {
    var t = Xd(e.alternate, e, ba);
    ((e.memoizedProps = e.pendingProps), t === null ? Xc(e) : (ce = t));
  }
  function jm(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Gd(a, t, t.pendingProps, t.type, void 0, ue);
        break;
      case 11:
        t = Gd(a, t, t.pendingProps, t.type.render, t.ref, ue);
        break;
      case 5:
        Cu(t);
      default:
        (Kd(a, t), (t = ce = Sf(t, ba)), (t = Xd(a, t, ba)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Xc(e) : (ce = t));
  }
  function _n(e, t, a, l) {
    ((ra = pl = null), Cu(t), (un = null), (ti = 0));
    var n = t.return;
    try {
      if (I0(e, n, t, a, ue)) {
        ((De = 1), Rc(e, Bt(a, e.current)), (ce = null));
        return;
      }
    } catch (i) {
      if (n !== null) throw ((ce = n), i);
      ((De = 1), Rc(e, Bt(a, e.current)), (ce = null));
      return;
    }
    t.flags & 32768
      ? (fe || l === 1
          ? (e = !0)
          : vn || (ue & 536870912) !== 0
            ? (e = !1)
            : ((Va = e = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = jt.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
        Tm(t, e))
      : Xc(t);
  }
  function Xc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Tm(t, Va);
        return;
      }
      e = t.return;
      var a = tv(t.alternate, t, ba);
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
    De === 0 && (De = 5);
  }
  function Tm(e, t) {
    do {
      var a = av(e.alternate, e);
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
    ((De = 6), (ce = null));
  }
  function Am(e, t, a, l, n, i, f, v, _) {
    e.cancelPendingCommit = null;
    do Qc();
    while (ke !== 0);
    if ((ge & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((i = t.lanes | t.childLanes),
        (i |= lu),
        Y1(e, a, i, f, v, _),
        e === ze && ((ce = ze = null), (ue = 0)),
        (gn = t),
        (ka = e),
        (Sa = a),
        (fo = i),
        (mo = n),
        (hm = l),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            hv(Ji, function () {
              return (Cm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = R.T), (R.T = null), (n = V.p), (V.p = 2), (f = ge), (ge |= 4));
        try {
          lv(e, t, a);
        } finally {
          ((ge = f), (V.p = n), (R.T = l));
        }
      }
      ((ke = 1), Nm(), zm(), Em());
    }
  }
  function Nm() {
    if (ke === 1) {
      ke = 0;
      var e = ka,
        t = gn,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = R.T), (R.T = null));
        var l = V.p;
        V.p = 2;
        var n = ge;
        ge |= 4;
        try {
          cm(t, e);
          var i = Eo,
            f = df(e.containerInfo),
            v = i.focusedElem,
            _ = i.selectionRange;
          if (f !== v && v && v.ownerDocument && ff(v.ownerDocument.documentElement, v)) {
            if (_ !== null && Is(v)) {
              var N = _.start,
                w = _.end;
              if ((w === void 0 && (w = N), 'selectionStart' in v))
                ((v.selectionStart = N), (v.selectionEnd = Math.min(w, v.value.length)));
              else {
                var L = v.ownerDocument || document,
                  z = (L && L.defaultView) || window;
                if (z.getSelection) {
                  var M = z.getSelection(),
                    Y = v.textContent.length,
                    J = Math.min(_.start, Y),
                    Ae = _.end === void 0 ? J : Math.min(_.end, Y);
                  !M.extend && J > Ae && ((f = Ae), (Ae = J), (J = f));
                  var j = rf(v, J),
                    S = rf(v, Ae);
                  if (
                    j &&
                    S &&
                    (M.rangeCount !== 1 ||
                      M.anchorNode !== j.node ||
                      M.anchorOffset !== j.offset ||
                      M.focusNode !== S.node ||
                      M.focusOffset !== S.offset)
                  ) {
                    var A = L.createRange();
                    (A.setStart(j.node, j.offset),
                      M.removeAllRanges(),
                      J > Ae
                        ? (M.addRange(A), M.extend(S.node, S.offset))
                        : (A.setEnd(S.node, S.offset), M.addRange(A)));
                  }
                }
              }
            }
            for (L = [], M = v; (M = M.parentNode); )
              M.nodeType === 1 && L.push({ element: M, left: M.scrollLeft, top: M.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < L.length; v++) {
              var B = L[v];
              ((B.element.scrollLeft = B.left), (B.element.scrollTop = B.top));
            }
          }
          ((is = !!zo), (Eo = zo = null));
        } finally {
          ((ge = n), (V.p = l), (R.T = a));
        }
      }
      ((e.current = t), (ke = 2));
    }
  }
  function zm() {
    if (ke === 2) {
      ke = 0;
      var e = ka,
        t = gn,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = R.T), (R.T = null));
        var l = V.p;
        V.p = 2;
        var n = ge;
        ge |= 4;
        try {
          tm(e, t.alternate, t);
        } finally {
          ((ge = n), (V.p = l), (R.T = a));
        }
      }
      ke = 3;
    }
  }
  function Em() {
    if (ke === 4 || ke === 3) {
      ((ke = 0), D1());
      var e = ka,
        t = gn,
        a = Sa,
        l = hm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (ke = 5)
        : ((ke = 0), (gn = ka = null), Mm(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (
        (n === 0 && (Ya = null),
        Rs(a),
        (t = t.stateNode),
        _t && typeof _t.onCommitFiberRoot == 'function')
      )
        try {
          _t.onCommitFiberRoot(qn, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        ((t = R.T), (n = V.p), (V.p = 2), (R.T = null));
        try {
          for (var i = e.onRecoverableError, f = 0; f < l.length; f++) {
            var v = l[f];
            i(v.value, { componentStack: v.stack });
          }
        } finally {
          ((R.T = t), (V.p = n));
        }
      }
      ((Sa & 3) !== 0 && Qc(),
        la(e),
        (n = e.pendingLanes),
        (a & 261930) !== 0 && (n & 42) !== 0 ? (e === ho ? pi++ : ((pi = 0), (ho = e))) : (pi = 0),
        _i(0));
    }
  }
  function Mm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Pn(t)));
  }
  function Qc() {
    return (Nm(), zm(), Em(), Cm());
  }
  function Cm() {
    if (ke !== 5) return !1;
    var e = ka,
      t = fo;
    fo = 0;
    var a = Rs(Sa),
      l = R.T,
      n = V.p;
    try {
      ((V.p = 32 > a ? 32 : a), (R.T = null), (a = mo), (mo = null));
      var i = ka,
        f = Sa;
      if (((ke = 0), (gn = ka = null), (Sa = 0), (ge & 6) !== 0)) throw Error(o(331));
      var v = ge;
      if (
        ((ge |= 4),
        fm(i.current),
        um(i, i.current, f, a),
        (ge = v),
        _i(0, !1),
        _t && typeof _t.onPostCommitFiberRoot == 'function')
      )
        try {
          _t.onPostCommitFiberRoot(qn, i);
        } catch {}
      return !0;
    } finally {
      ((V.p = n), (R.T = l), Mm(e, t));
    }
  }
  function Om(e, t, a) {
    ((t = Bt(a, t)),
      (t = Zu(e.stateNode, t, 2)),
      (e = qa(e, t, 2)),
      e !== null && (Un(e, 2), la(e)));
  }
  function xe(e, t, a) {
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
            (typeof l.componentDidCatch == 'function' && (Ya === null || !Ya.has(l)))
          ) {
            ((e = Bt(a, e)),
              (a = wd(2)),
              (l = qa(t, a, 2)),
              l !== null && (Rd(a, l, t, e), Un(l, 2), la(l)));
            break;
          }
        }
        t = t.return;
      }
  }
  function go(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new cv();
      var n = new Set();
      l.set(t, n);
    } else ((n = l.get(t)), n === void 0 && ((n = new Set()), l.set(t, n)));
    n.has(a) || ((uo = !0), n.add(a), (e = fv.bind(null, e, t, a)), t.then(e, e));
  }
  function fv(e, t, a) {
    var l = e.pingCache;
    (l !== null && l.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      ze === e &&
        (ue & a) === a &&
        (De === 4 || (De === 3 && (ue & 62914560) === ue && 300 > pt() - Vc)
          ? (ge & 2) === 0 && pn(e, 0)
          : (oo |= a),
        yn === ue && (yn = 0)),
      la(e));
  }
  function wm(e, t) {
    (t === 0 && (t = Ar()), (e = vl(e, t)), e !== null && (Un(e, t), la(e)));
  }
  function dv(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), wm(e, a));
  }
  function mv(e, t) {
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
    (l !== null && l.delete(t), wm(e, a));
  }
  function hv(e, t) {
    return Ms(e, t);
  }
  var Kc = null,
    bn = null,
    po = !1,
    Jc = !1,
    _o = !1,
    Xa = 0;
  function la(e) {
    (e !== bn && e.next === null && (bn === null ? (Kc = bn = e) : (bn = bn.next = e)),
      (Jc = !0),
      po || ((po = !0), yv()));
  }
  function _i(e, t) {
    if (!_o && Jc) {
      _o = !0;
      do
        for (var a = !1, l = Kc; l !== null; ) {
          if (e !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var i = 0;
            else {
              var f = l.suspendedLanes,
                v = l.pingedLanes;
              ((i = (1 << (31 - bt(42 | e) + 1)) - 1),
                (i &= n & ~(f & ~v)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((a = !0), Lm(l, i));
          } else
            ((i = ue),
              (i = Pi(
                l,
                l === ze ? i : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1
              )),
              (i & 3) === 0 || Hn(l, i) || ((a = !0), Lm(l, i)));
          l = l.next;
        }
      while (a);
      _o = !1;
    }
  }
  function vv() {
    Rm();
  }
  function Rm() {
    Jc = po = !1;
    var e = 0;
    Xa !== 0 && Nv() && (e = Xa);
    for (var t = pt(), a = null, l = Kc; l !== null; ) {
      var n = l.next,
        i = Dm(l, t);
      (i === 0
        ? ((l.next = null), a === null ? (Kc = n) : (a.next = n), n === null && (bn = a))
        : ((a = l), (e !== 0 || (i & 3) !== 0) && (Jc = !0)),
        (l = n));
    }
    ((ke !== 0 && ke !== 5) || _i(e), Xa !== 0 && (Xa = 0));
  }
  function Dm(e, t) {
    for (
      var a = e.suspendedLanes,
        l = e.pingedLanes,
        n = e.expirationTimes,
        i = e.pendingLanes & -62914561;
      0 < i;
    ) {
      var f = 31 - bt(i),
        v = 1 << f,
        _ = n[f];
      (_ === -1
        ? ((v & a) === 0 || (v & l) !== 0) && (n[f] = $1(v, t))
        : _ <= t && (e.expiredLanes |= v),
        (i &= ~v));
    }
    if (
      ((t = ze),
      (a = ue),
      (a = Pi(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (l = e.callbackNode),
      a === 0 || (e === t && (Se === 2 || Se === 9)) || e.cancelPendingCommit !== null)
    )
      return (l !== null && l !== null && Cs(l), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Hn(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((l !== null && Cs(l), Rs(a))) {
        case 2:
        case 8:
          a = jr;
          break;
        case 32:
          a = Ji;
          break;
        case 268435456:
          a = Tr;
          break;
        default:
          a = Ji;
      }
      return (
        (l = Bm.bind(null, e)),
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
  function Bm(e, t) {
    if (ke !== 0 && ke !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (Qc() && e.callbackNode !== a) return null;
    var l = ue;
    return (
      (l = Pi(e, e === ze ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      l === 0
        ? null
        : (ym(e, l, t),
          Dm(e, pt()),
          e.callbackNode != null && e.callbackNode === a ? Bm.bind(null, e) : null)
    );
  }
  function Lm(e, t) {
    if (Qc()) return null;
    ym(e, t, !0);
  }
  function yv() {
    Ev(function () {
      (ge & 6) !== 0 ? Ms(xr, vv) : Rm();
    });
  }
  function bo() {
    if (Xa === 0) {
      var e = nn;
      (e === 0 && ((e = Wi), (Wi <<= 1), (Wi & 261888) === 0 && (Wi = 256)), (Xa = e));
    }
    return Xa;
  }
  function qm(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : lc('' + e);
  }
  function Hm(e, t) {
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
  function gv(e, t, a, l, n) {
    if (t === 'submit' && a && a.stateNode === n) {
      var i = qm((n[ft] || null).action),
        f = l.submitter;
      f &&
        ((t = (t = f[ft] || null) ? qm(t.formAction) : f.getAttribute('formAction')),
        t !== null && ((i = t), (f = null)));
      var v = new sc('action', 'action', null, l, n);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Xa !== 0) {
                  var _ = f ? Hm(n, f) : new FormData(n);
                  Uu(a, { pending: !0, data: _, method: n.method, action: i }, null, _);
                }
              } else
                typeof i == 'function' &&
                  (v.preventDefault(),
                  (_ = f ? Hm(n, f) : new FormData(n)),
                  Uu(a, { pending: !0, data: _, method: n.method, action: i }, i, _));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var So = 0; So < au.length; So++) {
    var xo = au[So],
      pv = xo.toLowerCase(),
      _v = xo[0].toUpperCase() + xo.slice(1);
    Zt(pv, 'on' + _v);
  }
  (Zt(vf, 'onAnimationEnd'),
    Zt(yf, 'onAnimationIteration'),
    Zt(gf, 'onAnimationStart'),
    Zt('dblclick', 'onDoubleClick'),
    Zt('focusin', 'onFocus'),
    Zt('focusout', 'onBlur'),
    Zt(B0, 'onTransitionRun'),
    Zt(L0, 'onTransitionStart'),
    Zt(q0, 'onTransitionCancel'),
    Zt(pf, 'onTransitionEnd'),
    kl('onMouseEnter', ['mouseout', 'mouseover']),
    kl('onMouseLeave', ['mouseout', 'mouseover']),
    kl('onPointerEnter', ['pointerout', 'pointerover']),
    kl('onPointerLeave', ['pointerout', 'pointerover']),
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
  var bi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    bv = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(bi)
    );
  function Um(e, t) {
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
              _ = v.instance,
              N = v.currentTarget;
            if (((v = v.listener), _ !== i && n.isPropagationStopped())) break e;
            ((i = v), (n.currentTarget = N));
            try {
              i(n);
            } catch (w) {
              rc(w);
            }
            ((n.currentTarget = null), (i = _));
          }
        else
          for (f = 0; f < l.length; f++) {
            if (
              ((v = l[f]),
              (_ = v.instance),
              (N = v.currentTarget),
              (v = v.listener),
              _ !== i && n.isPropagationStopped())
            )
              break e;
            ((i = v), (n.currentTarget = N));
            try {
              i(n);
            } catch (w) {
              rc(w);
            }
            ((n.currentTarget = null), (i = _));
          }
      }
    }
  }
  function se(e, t) {
    var a = t[Ds];
    a === void 0 && (a = t[Ds] = new Set());
    var l = e + '__bubble';
    a.has(l) || (Gm(t, e, 2, !1), a.add(l));
  }
  function jo(e, t, a) {
    var l = 0;
    (t && (l |= 4), Gm(a, e, l, t));
  }
  var Wc = '_reactListening' + Math.random().toString(36).slice(2);
  function To(e) {
    if (!e[Wc]) {
      ((e[Wc] = !0),
        wr.forEach(function (a) {
          a !== 'selectionchange' && (bv.has(a) || jo(a, !1, e), jo(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Wc] || ((t[Wc] = !0), jo('selectionchange', !1, t));
    }
  }
  function Gm(e, t, a, l) {
    switch (vh(t)) {
      case 2:
        var n = Kv;
        break;
      case 8:
        n = Jv;
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
              var _ = f.tag;
              if ((_ === 3 || _ === 4) && f.stateNode.containerInfo === n) return;
              f = f.return;
            }
          for (; v !== null; ) {
            if (((f = Vl(v)), f === null)) return;
            if (((_ = f.tag), _ === 5 || _ === 6 || _ === 26 || _ === 27)) {
              l = i = f;
              continue e;
            }
            v = v.parentNode;
          }
        }
        l = l.return;
      }
    kr(function () {
      var N = i,
        w = Vs(a),
        L = [];
      e: {
        var z = _f.get(e);
        if (z !== void 0) {
          var M = sc,
            Y = e;
          switch (e) {
            case 'keypress':
              if (ic(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              M = m0;
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
              if (a.button === 2) break e;
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
              M = t0;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              M = y0;
              break;
            case vf:
            case yf:
            case gf:
              M = n0;
              break;
            case pf:
              M = p0;
              break;
            case 'scroll':
            case 'scrollend':
              M = P1;
              break;
            case 'wheel':
              M = b0;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              M = c0;
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
              M = x0;
          }
          var J = (t & 4) !== 0,
            Ae = !J && (e === 'scroll' || e === 'scrollend'),
            j = J ? (z !== null ? z + 'Capture' : null) : z;
          J = [];
          for (var S = N, A; S !== null; ) {
            var B = S;
            if (
              ((A = B.stateNode),
              (B = B.tag),
              (B !== 5 && B !== 26 && B !== 27) ||
                A === null ||
                j === null ||
                ((B = $n(S, j)), B != null && J.push(Si(S, B, A))),
              Ae)
            )
              break;
            S = S.return;
          }
          0 < J.length && ((z = new M(z, Y, null, a, w)), L.push({ event: z, listeners: J }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((z = e === 'mouseover' || e === 'pointerover'),
            (M = e === 'mouseout' || e === 'pointerout'),
            z && a !== Gs && (Y = a.relatedTarget || a.fromElement) && (Vl(Y) || Y[Gl]))
          )
            break e;
          if (
            (M || z) &&
            ((z =
              w.window === w
                ? w
                : (z = w.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            M
              ? ((Y = a.relatedTarget || a.toElement),
                (M = N),
                (Y = Y ? Vl(Y) : null),
                Y !== null &&
                  ((Ae = d(Y)), (J = Y.tag), Y !== Ae || (J !== 5 && J !== 27 && J !== 6)) &&
                  (Y = null))
              : ((M = null), (Y = N)),
            M !== Y)
          ) {
            if (
              ((J = Qr),
              (B = 'onMouseLeave'),
              (j = 'onMouseEnter'),
              (S = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((J = Jr), (B = 'onPointerLeave'), (j = 'onPointerEnter'), (S = 'pointer')),
              (Ae = M == null ? z : Vn(M)),
              (A = Y == null ? z : Vn(Y)),
              (z = new J(B, S + 'leave', M, a, w)),
              (z.target = Ae),
              (z.relatedTarget = A),
              (B = null),
              Vl(w) === N &&
                ((J = new J(j, S + 'enter', Y, a, w)),
                (J.target = A),
                (J.relatedTarget = Ae),
                (B = J)),
              (Ae = B),
              M && Y)
            )
              t: {
                for (J = Sv, j = M, S = Y, A = 0, B = j; B; B = J(B)) A++;
                B = 0;
                for (var K = S; K; K = J(K)) B++;
                for (; 0 < A - B; ) ((j = J(j)), A--);
                for (; 0 < B - A; ) ((S = J(S)), B--);
                for (; A--; ) {
                  if (j === S || (S !== null && j === S.alternate)) {
                    J = j;
                    break t;
                  }
                  ((j = J(j)), (S = J(S)));
                }
                J = null;
              }
            else J = null;
            (M !== null && Vm(L, z, M, J, !1), Y !== null && Ae !== null && Vm(L, Ae, Y, J, !0));
          }
        }
        e: {
          if (
            ((z = N ? Vn(N) : window),
            (M = z.nodeName && z.nodeName.toLowerCase()),
            M === 'select' || (M === 'input' && z.type === 'file'))
          )
            var ve = lf;
          else if (tf(z))
            if (nf) ve = w0;
            else {
              ve = C0;
              var Z = M0;
            }
          else
            ((M = z.nodeName),
              !M || M.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? N && Us(N.elementType) && (ve = lf)
                : (ve = O0));
          if (ve && (ve = ve(e, N))) {
            af(L, ve, a, w);
            break e;
          }
          (Z && Z(e, z, N),
            e === 'focusout' &&
              N &&
              z.type === 'number' &&
              N.memoizedProps.value != null &&
              Hs(z, 'number', z.value));
        }
        switch (((Z = N ? Vn(N) : window), e)) {
          case 'focusin':
            (tf(Z) || Z.contentEditable === 'true') && ((Wl = Z), (Ps = N), (Wn = null));
            break;
          case 'focusout':
            Wn = Ps = Wl = null;
            break;
          case 'mousedown':
            eu = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((eu = !1), mf(L, a, w));
            break;
          case 'selectionchange':
            if (D0) break;
          case 'keydown':
          case 'keyup':
            mf(L, a, w);
        }
        var le;
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
          Jl
            ? Pr(e, a) && (oe = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (oe = 'onCompositionStart');
        (oe &&
          (Wr &&
            a.locale !== 'ko' &&
            (Jl || oe !== 'onCompositionStart'
              ? oe === 'onCompositionEnd' && Jl && (le = Zr())
              : ((Ca = w), (ks = 'value' in Ca ? Ca.value : Ca.textContent), (Jl = !0))),
          (Z = Fc(N, oe)),
          0 < Z.length &&
            ((oe = new Kr(oe, e, null, a, w)),
            L.push({ event: oe, listeners: Z }),
            le ? (oe.data = le) : ((le = ef(a)), le !== null && (oe.data = le)))),
          (le = T0 ? A0(e, a) : N0(e, a)) &&
            ((oe = Fc(N, 'onBeforeInput')),
            0 < oe.length &&
              ((Z = new Kr('onBeforeInput', 'beforeinput', null, a, w)),
              L.push({ event: Z, listeners: oe }),
              (Z.data = le))),
          gv(L, e, N, a, w));
      }
      Um(L, t);
    });
  }
  function Si(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function Fc(e, t) {
    for (var a = t + 'Capture', l = []; e !== null; ) {
      var n = e,
        i = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          i === null ||
          ((n = $n(e, a)),
          n != null && l.unshift(Si(e, n, i)),
          (n = $n(e, t)),
          n != null && l.push(Si(e, n, i))),
        e.tag === 3)
      )
        return l;
      e = e.return;
    }
    return [];
  }
  function Sv(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Vm(e, t, a, l, n) {
    for (var i = t._reactName, f = []; a !== null && a !== l; ) {
      var v = a,
        _ = v.alternate,
        N = v.stateNode;
      if (((v = v.tag), _ !== null && _ === l)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        N === null ||
        ((_ = N),
        n
          ? ((N = $n(a, i)), N != null && f.unshift(Si(a, N, _)))
          : n || ((N = $n(a, i)), N != null && f.push(Si(a, N, _)))),
        (a = a.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var xv = /\r\n?/g,
    jv = /\u0000|\uFFFD/g;
  function $m(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        xv,
        `
`
      )
      .replace(jv, '');
  }
  function Ym(e, t) {
    return ((t = $m(t)), $m(e) === t);
  }
  function Te(e, t, a, l, n, i) {
    switch (a) {
      case 'children':
        typeof l == 'string'
          ? t === 'body' || (t === 'textarea' && l === '') || Xl(e, l)
          : (typeof l == 'number' || typeof l == 'bigint') && t !== 'body' && Xl(e, '' + l);
        break;
      case 'className':
        tc(e, 'class', l);
        break;
      case 'tabIndex':
        tc(e, 'tabindex', l);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        tc(e, a, l);
        break;
      case 'style':
        $r(e, l, i);
        break;
      case 'data':
        if (t !== 'object') {
          tc(e, 'data', l);
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
        ((l = lc('' + l)), e.setAttribute(a, l));
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
              ? (t !== 'input' && Te(e, t, 'name', n.name, n, null),
                Te(e, t, 'formEncType', n.formEncType, n, null),
                Te(e, t, 'formMethod', n.formMethod, n, null),
                Te(e, t, 'formTarget', n.formTarget, n, null))
              : (Te(e, t, 'encType', n.encType, n, null),
                Te(e, t, 'method', n.method, n, null),
                Te(e, t, 'target', n.target, n, null)));
        if (l == null || typeof l == 'symbol' || typeof l == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((l = lc('' + l)), e.setAttribute(a, l));
        break;
      case 'onClick':
        l != null && (e.onclick = ca);
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
        ((a = lc('' + l)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (se('beforetoggle', e), se('toggle', e), ec(e, 'popover', l));
        break;
      case 'xlinkActuate':
        ia(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', l);
        break;
      case 'xlinkArcrole':
        ia(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', l);
        break;
      case 'xlinkRole':
        ia(e, 'http://www.w3.org/1999/xlink', 'xlink:role', l);
        break;
      case 'xlinkShow':
        ia(e, 'http://www.w3.org/1999/xlink', 'xlink:show', l);
        break;
      case 'xlinkTitle':
        ia(e, 'http://www.w3.org/1999/xlink', 'xlink:title', l);
        break;
      case 'xlinkType':
        ia(e, 'http://www.w3.org/1999/xlink', 'xlink:type', l);
        break;
      case 'xmlBase':
        ia(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', l);
        break;
      case 'xmlLang':
        ia(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', l);
        break;
      case 'xmlSpace':
        ia(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', l);
        break;
      case 'is':
        ec(e, 'is', l);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = F1.get(a) || a), ec(e, a, l));
    }
  }
  function No(e, t, a, l, n, i) {
    switch (a) {
      case 'style':
        $r(e, l, i);
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
          ? Xl(e, l)
          : (typeof l == 'number' || typeof l == 'bigint') && Xl(e, '' + l);
        break;
      case 'onScroll':
        l != null && se('scroll', e);
        break;
      case 'onScrollEnd':
        l != null && se('scrollend', e);
        break;
      case 'onClick':
        l != null && (e.onclick = ca);
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
            a in e ? (e[a] = l) : l === !0 ? e.setAttribute(a, '') : ec(e, a, l);
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
                  Te(e, t, i, f, a, null);
              }
          }
        (n && Te(e, t, 'srcSet', a.srcSet, a, null), l && Te(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        se('invalid', e);
        var v = (i = f = n = null),
          _ = null,
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
                  _ = w;
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
                  Te(e, t, l, w, a, null);
              }
          }
        Hr(e, i, v, _, N, f, n, !1);
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
                Te(e, t, n, v, a, null);
            }
        ((t = i),
          (a = f),
          (e.multiple = !!l),
          t != null ? Zl(e, !!l, t, !1) : a != null && Zl(e, !!l, a, !0));
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
                Te(e, t, f, v, a, null);
            }
        Gr(e, l, n, i);
        return;
      case 'option':
        for (_ in a)
          if (a.hasOwnProperty(_) && ((l = a[_]), l != null))
            switch (_) {
              case 'selected':
                e.selected = l && typeof l != 'function' && typeof l != 'symbol';
                break;
              default:
                Te(e, t, _, l, a, null);
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
        for (l = 0; l < bi.length; l++) se(bi[l], e);
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
                Te(e, t, N, l, a, null);
            }
        return;
      default:
        if (Us(t)) {
          for (w in a)
            a.hasOwnProperty(w) && ((l = a[w]), l !== void 0 && No(e, t, w, l, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((l = a[v]), l != null && Te(e, t, v, l, a, null));
  }
  function Tv(e, t, a, l) {
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
          _ = null,
          N = null,
          w = null;
        for (M in a) {
          var L = a[M];
          if (a.hasOwnProperty(M) && L != null)
            switch (M) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                _ = L;
              default:
                l.hasOwnProperty(M) || Te(e, t, M, null, l, L);
            }
        }
        for (var z in l) {
          var M = l[z];
          if (((L = a[z]), l.hasOwnProperty(z) && (M != null || L != null)))
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
                w = M;
                break;
              case 'value':
                f = M;
                break;
              case 'defaultValue':
                v = M;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (M != null) throw Error(o(137, t));
                break;
              default:
                M !== L && Te(e, t, z, M, l, L);
            }
        }
        qs(e, f, v, _, N, w, i, n);
        return;
      case 'select':
        M = f = v = z = null;
        for (i in a)
          if (((_ = a[i]), a.hasOwnProperty(i) && _ != null))
            switch (i) {
              case 'value':
                break;
              case 'multiple':
                M = _;
              default:
                l.hasOwnProperty(i) || Te(e, t, i, null, l, _);
            }
        for (n in l)
          if (((i = l[n]), (_ = a[n]), l.hasOwnProperty(n) && (i != null || _ != null)))
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
                i !== _ && Te(e, t, n, i, l, _);
            }
        ((t = v),
          (a = f),
          (l = M),
          z != null
            ? Zl(e, !!a, z, !1)
            : !!l != !!a && (t != null ? Zl(e, !!a, t, !0) : Zl(e, !!a, a ? [] : '', !1)));
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
                Te(e, t, v, null, l, n);
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
                n !== i && Te(e, t, f, n, l, i);
            }
        Ur(e, z, M);
        return;
      case 'option':
        for (var Y in a)
          if (((z = a[Y]), a.hasOwnProperty(Y) && z != null && !l.hasOwnProperty(Y)))
            switch (Y) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                Te(e, t, Y, null, l, z);
            }
        for (_ in l)
          if (((z = l[_]), (M = a[_]), l.hasOwnProperty(_) && z !== M && (z != null || M != null)))
            switch (_) {
              case 'selected':
                e.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                Te(e, t, _, z, l, M);
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
            a.hasOwnProperty(J) && z != null && !l.hasOwnProperty(J) && Te(e, t, J, null, l, z));
        for (N in l)
          if (((z = l[N]), (M = a[N]), l.hasOwnProperty(N) && z !== M && (z != null || M != null)))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(o(137, t));
                break;
              default:
                Te(e, t, N, z, l, M);
            }
        return;
      default:
        if (Us(t)) {
          for (var Ae in a)
            ((z = a[Ae]),
              a.hasOwnProperty(Ae) &&
                z !== void 0 &&
                !l.hasOwnProperty(Ae) &&
                No(e, t, Ae, void 0, l, z));
          for (w in l)
            ((z = l[w]),
              (M = a[w]),
              !l.hasOwnProperty(w) ||
                z === M ||
                (z === void 0 && M === void 0) ||
                No(e, t, w, z, l, M));
          return;
        }
    }
    for (var j in a)
      ((z = a[j]),
        a.hasOwnProperty(j) && z != null && !l.hasOwnProperty(j) && Te(e, t, j, null, l, z));
    for (L in l)
      ((z = l[L]),
        (M = a[L]),
        !l.hasOwnProperty(L) || z === M || (z == null && M == null) || Te(e, t, L, z, l, M));
  }
  function km(e) {
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
  function Av() {
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
        if (i && v && km(f)) {
          for (f = 0, v = n.responseEnd, l += 1; l < a.length; l++) {
            var _ = a[l],
              N = _.startTime;
            if (N > v) break;
            var w = _.transferSize,
              L = _.initiatorType;
            w && km(L) && ((_ = _.responseEnd), (f += w * (_ < v ? 1 : (v - N) / (_ - N))));
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
  var zo = null,
    Eo = null;
  function Ic(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Zm(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Xm(e, t) {
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
  function Nv() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Co ? !1 : ((Co = e), !0)) : ((Co = null), !1);
  }
  var Qm = typeof setTimeout == 'function' ? setTimeout : void 0,
    zv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Km = typeof Promise == 'function' ? Promise : void 0,
    Ev =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Km < 'u'
          ? function (e) {
              return Km.resolve(null).then(e).catch(Mv);
            }
          : Qm;
  function Mv(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Qa(e) {
    return e === 'head';
  }
  function Jm(e, t) {
    var a = t,
      l = 0;
    do {
      var n = a.nextSibling;
      if ((e.removeChild(a), n && n.nodeType === 8))
        if (((a = n.data), a === '/$' || a === '/&')) {
          if (l === 0) {
            (e.removeChild(n), Tn(t));
            return;
          }
          l--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') l++;
        else if (a === 'html') xi(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), xi(a));
          for (var i = a.firstChild; i; ) {
            var f = i.nextSibling,
              v = i.nodeName;
            (i[Gn] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(i),
              (i = f));
          }
        } else a === 'body' && xi(e.ownerDocument.body);
      a = n;
    } while (a);
    Tn(t);
  }
  function Wm(e, t) {
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
  function Oo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Oo(a), Bs(a));
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
  function Cv(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var n = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (l) {
        if (!e[Gn])
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
  function Ov(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = Gt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Fm(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Gt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function wo(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function Ro(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function wv(e, t) {
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
  function Im(e) {
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
  function Pm(e) {
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
  function eh(e, t, a) {
    switch (((t = Ic(a)), e)) {
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
  function xi(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Bs(e);
  }
  var Vt = new Map(),
    th = new Set();
  function Pc(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var xa = V.d;
  V.d = { f: Rv, r: Dv, D: Bv, C: Lv, L: qv, m: Hv, X: Gv, S: Uv, M: Vv };
  function Rv() {
    var e = xa.f(),
      t = kc();
    return e || t;
  }
  function Dv(e) {
    var t = $l(e);
    t !== null && t.tag === 5 && t.type === 'form' ? pd(t) : xa.r(e);
  }
  var Sn = typeof document > 'u' ? null : document;
  function ah(e, t, a) {
    var l = Sn;
    if (l && typeof t == 'string' && t) {
      var n = Rt(t);
      ((n = 'link[rel="' + e + '"][href="' + n + '"]'),
        typeof a == 'string' && (n += '[crossorigin="' + a + '"]'),
        th.has(n) ||
          (th.add(n),
          (e = { rel: e, crossOrigin: a, href: t }),
          l.querySelector(n) === null &&
            ((t = l.createElement('link')), tt(t, 'link', e), Qe(t), l.head.appendChild(t))));
    }
  }
  function Bv(e) {
    (xa.D(e), ah('dns-prefetch', e, null));
  }
  function Lv(e, t) {
    (xa.C(e, t), ah('preconnect', e, t));
  }
  function qv(e, t, a) {
    xa.L(e, t, a);
    var l = Sn;
    if (l && e && t) {
      var n = 'link[rel="preload"][as="' + Rt(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((n += '[imagesrcset="' + Rt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (n += '[imagesizes="' + Rt(a.imageSizes) + '"]'))
        : (n += '[href="' + Rt(e) + '"]');
      var i = n;
      switch (t) {
        case 'style':
          i = xn(e);
          break;
        case 'script':
          i = jn(e);
      }
      Vt.has(i) ||
        ((e = T(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        Vt.set(i, e),
        l.querySelector(n) !== null ||
          (t === 'style' && l.querySelector(ji(i))) ||
          (t === 'script' && l.querySelector(Ti(i))) ||
          ((t = l.createElement('link')), tt(t, 'link', e), Qe(t), l.head.appendChild(t)));
    }
  }
  function Hv(e, t) {
    xa.m(e, t);
    var a = Sn;
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
          i = jn(e);
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
            if (a.querySelector(Ti(i))) return;
        }
        ((l = a.createElement('link')), tt(l, 'link', e), Qe(l), a.head.appendChild(l));
      }
    }
  }
  function Uv(e, t, a) {
    xa.S(e, t, a);
    var l = Sn;
    if (l && e) {
      var n = Yl(l).hoistableStyles,
        i = xn(e);
      t = t || 'default';
      var f = n.get(i);
      if (!f) {
        var v = { loading: 0, preload: null };
        if ((f = l.querySelector(ji(i)))) v.loading = 5;
        else {
          ((e = T({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Vt.get(i)) && Bo(e, a));
          var _ = (f = l.createElement('link'));
          (Qe(_),
            tt(_, 'link', e),
            (_._p = new Promise(function (N, w) {
              ((_.onload = N), (_.onerror = w));
            })),
            _.addEventListener('load', function () {
              v.loading |= 1;
            }),
            _.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            es(f, t, l));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: v }), n.set(i, f));
      }
    }
  }
  function Gv(e, t) {
    xa.X(e, t);
    var a = Sn;
    if (a && e) {
      var l = Yl(a).hoistableScripts,
        n = jn(e),
        i = l.get(n);
      i ||
        ((i = a.querySelector(Ti(n))),
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
  function Vv(e, t) {
    xa.M(e, t);
    var a = Sn;
    if (a && e) {
      var l = Yl(a).hoistableScripts,
        n = jn(e),
        i = l.get(n);
      i ||
        ((i = a.querySelector(Ti(n))),
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
  function lh(e, t, a, l) {
    var n = (n = ie.current) ? Pc(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = xn(a.href)),
            (a = Yl(n).hoistableStyles),
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
          e = xn(a.href);
          var i = Yl(n).hoistableStyles,
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
              (i = n.querySelector(ji(e))) && !i._p && ((f.instance = i), (f.state.loading = 5)),
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
                i || $v(n, e, a, f.state))),
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
            ? ((t = jn(a)),
              (a = Yl(n).hoistableScripts),
              (l = a.get(t)),
              l || ((l = { type: 'script', instance: null, count: 0, state: null }), a.set(t, l)),
              l)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function xn(e) {
    return 'href="' + Rt(e) + '"';
  }
  function ji(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function nh(e) {
    return T({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function $v(e, t, a, l) {
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
  function jn(e) {
    return '[src="' + Rt(e) + '"]';
  }
  function Ti(e) {
    return 'script[async]' + e;
  }
  function ih(e, t, a) {
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
            es(l, a.precedence, e),
            (t.instance = l)
          );
        case 'stylesheet':
          n = xn(a.href);
          var i = e.querySelector(ji(n));
          if (i) return ((t.state.loading |= 4), (t.instance = i), Qe(i), i);
          ((l = nh(a)),
            (n = Vt.get(n)) && Bo(l, n),
            (i = (e.ownerDocument || e).createElement('link')),
            Qe(i));
          var f = i;
          return (
            (f._p = new Promise(function (v, _) {
              ((f.onload = v), (f.onerror = _));
            })),
            tt(i, 'link', l),
            (t.state.loading |= 4),
            es(i, a.precedence, e),
            (t.instance = i)
          );
        case 'script':
          return (
            (i = jn(a.src)),
            (n = e.querySelector(Ti(i)))
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
        ((l = t.instance), (t.state.loading |= 4), es(l, a.precedence, e));
    return t.instance;
  }
  function es(e, t, a) {
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
  var ts = null;
  function ch(e, t, a) {
    if (ts === null) {
      var l = new Map(),
        n = (ts = new Map());
      n.set(a, l);
    } else ((n = ts), (l = n.get(a)), l || ((l = new Map()), n.set(a, l)));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var i = a[n];
      if (
        !(i[Gn] || i[Fe] || (e === 'link' && i.getAttribute('rel') === 'stylesheet')) &&
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
  function sh(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function Yv(e, t, a) {
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
  function uh(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function kv(e, t, a, l) {
    if (
      a.type === 'stylesheet' &&
      (typeof l.media != 'string' || matchMedia(l.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var n = xn(l.href),
          i = t.querySelector(ji(n));
        if (i) {
          ((t = i._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = as.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = i),
            Qe(i));
          return;
        }
        ((i = t.ownerDocument || t),
          (l = nh(l)),
          (n = Vt.get(n)) && Bo(l, n),
          (i = i.createElement('link')),
          Qe(i));
        var f = i;
        ((f._p = new Promise(function (v, _) {
          ((f.onload = v), (f.onerror = _));
        })),
          tt(i, 'link', l),
          (a.instance = i));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = as.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var qo = 0;
  function Zv(e, t) {
    return (
      e.stylesheets && e.count === 0 && ns(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var l = setTimeout(function () {
              if ((e.stylesheets && ns(e, e.stylesheets), e.unsuspend)) {
                var i = e.unsuspend;
                ((e.unsuspend = null), i());
              }
            }, 6e4 + t);
            0 < e.imgBytes && qo === 0 && (qo = 62500 * Av());
            var n = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && ns(e, e.stylesheets), e.unsuspend))
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
  function as() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) ns(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var ls = null;
  function ns(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (ls = new Map()), t.forEach(Xv, e), (ls = null), as.call(e)));
  }
  function Xv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = ls.get(e);
      if (a) var l = a.get(null);
      else {
        ((a = new Map()), ls.set(e, a));
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
        (l = as.bind(this)),
        n.addEventListener('load', l),
        n.addEventListener('error', l),
        i
          ? i.parentNode.insertBefore(n, i.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(n, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Ai = {
    $$typeof: me,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0,
  };
  function Qv(e, t, a, l, n, i, f, v, _) {
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
      (this.formState = _),
      (this.incompleteTransitions = new Map()));
  }
  function oh(e, t, a, l, n, i, f, v, _, N, w, L) {
    return (
      (e = new Qv(e, t, a, f, _, N, w, L, v)),
      (t = 1),
      i === !0 && (t |= 24),
      (i = xt(3, null, null, t)),
      (e.current = i),
      (i.stateNode = e),
      (t = vu()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (i.memoizedState = { element: l, isDehydrated: a, cache: t }),
      _u(i),
      e
    );
  }
  function rh(e) {
    return e ? ((e = Pl), e) : Pl;
  }
  function fh(e, t, a, l, n, i) {
    ((n = rh(n)),
      l.context === null ? (l.context = n) : (l.pendingContext = n),
      (l = La(t)),
      (l.payload = { element: a }),
      (i = i === void 0 ? null : i),
      i !== null && (l.callback = i),
      (a = qa(e, l, t)),
      a !== null && (gt(a, e, t), li(a, e, t)));
  }
  function dh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Ho(e, t) {
    (dh(e, t), (e = e.alternate) && dh(e, t));
  }
  function mh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = vl(e, 67108864);
      (t !== null && gt(t, e, 67108864), Ho(e, 67108864));
    }
  }
  function hh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = zt();
      t = ws(t);
      var a = vl(e, t);
      (a !== null && gt(a, e, t), Ho(e, t));
    }
  }
  var is = !0;
  function Kv(e, t, a, l) {
    var n = R.T;
    R.T = null;
    var i = V.p;
    try {
      ((V.p = 2), Uo(e, t, a, l));
    } finally {
      ((V.p = i), (R.T = n));
    }
  }
  function Jv(e, t, a, l) {
    var n = R.T;
    R.T = null;
    var i = V.p;
    try {
      ((V.p = 8), Uo(e, t, a, l));
    } finally {
      ((V.p = i), (R.T = n));
    }
  }
  function Uo(e, t, a, l) {
    if (is) {
      var n = Go(l);
      if (n === null) (Ao(e, t, l, cs, a), yh(e, l));
      else if (Fv(n, e, t, a, l)) l.stopPropagation();
      else if ((yh(e, l), t & 4 && -1 < Wv.indexOf(e))) {
        for (; n !== null; ) {
          var i = $l(n);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var f = rl(i.pendingLanes);
                  if (f !== 0) {
                    var v = i;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; f; ) {
                      var _ = 1 << (31 - bt(f));
                      ((v.entanglements[1] |= _), (f &= ~_));
                    }
                    (la(i), (ge & 6) === 0 && (($c = pt() + 500), _i(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = vl(i, 2)), v !== null && gt(v, i, 2), kc(), Ho(i, 2));
            }
          if (((i = Go(l)), i === null && Ao(e, t, l, cs, a), i === n)) break;
          n = i;
        }
        n !== null && l.stopPropagation();
      } else Ao(e, t, l, null, a);
    }
  }
  function Go(e) {
    return ((e = Vs(e)), Vo(e));
  }
  var cs = null;
  function Vo(e) {
    if (((cs = null), (e = Vl(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (a === 31) {
          if (((e = y(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((cs = e), null);
  }
  function vh(e) {
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
        switch (B1()) {
          case xr:
            return 2;
          case jr:
            return 8;
          case Ji:
          case L1:
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
    Ka = null,
    Ja = null,
    Wa = null,
    Ni = new Map(),
    zi = new Map(),
    Fa = [],
    Wv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function yh(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Ka = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Ja = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Wa = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Ni.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        zi.delete(t.pointerId);
    }
  }
  function Ei(e, t, a, l, n, i) {
    return e === null || e.nativeEvent !== i
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: l,
          nativeEvent: i,
          targetContainers: [n],
        }),
        t !== null && ((t = $l(t)), t !== null && mh(t)),
        e)
      : ((e.eventSystemFlags |= l),
        (t = e.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e);
  }
  function Fv(e, t, a, l, n) {
    switch (t) {
      case 'focusin':
        return ((Ka = Ei(Ka, e, t, a, l, n)), !0);
      case 'dragenter':
        return ((Ja = Ei(Ja, e, t, a, l, n)), !0);
      case 'mouseover':
        return ((Wa = Ei(Wa, e, t, a, l, n)), !0);
      case 'pointerover':
        var i = n.pointerId;
        return (Ni.set(i, Ei(Ni.get(i) || null, e, t, a, l, n)), !0);
      case 'gotpointercapture':
        return ((i = n.pointerId), zi.set(i, Ei(zi.get(i) || null, e, t, a, l, n)), !0);
    }
    return !1;
  }
  function gh(e) {
    var t = Vl(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = h(a)), t !== null)) {
            ((e.blockedOn = t),
              Cr(e.priority, function () {
                hh(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = y(a)), t !== null)) {
            ((e.blockedOn = t),
              Cr(e.priority, function () {
                hh(a);
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
  function ss(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Go(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(a.type, a);
        ((Gs = l), a.target.dispatchEvent(l), (Gs = null));
      } else return ((t = $l(a)), t !== null && mh(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function ph(e, t, a) {
    ss(e) && a.delete(t);
  }
  function Iv() {
    (($o = !1),
      Ka !== null && ss(Ka) && (Ka = null),
      Ja !== null && ss(Ja) && (Ja = null),
      Wa !== null && ss(Wa) && (Wa = null),
      Ni.forEach(ph),
      zi.forEach(ph));
  }
  function us(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      $o || (($o = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, Iv)));
  }
  var os = null;
  function _h(e) {
    os !== e &&
      ((os = e),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        os === e && (os = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            l = e[t + 1],
            n = e[t + 2];
          if (typeof l != 'function') {
            if (Vo(l || a) === null) continue;
            break;
          }
          var i = $l(a);
          i !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Uu(i, { pending: !0, data: n, method: a.method, action: l }, l, n));
        }
      }));
  }
  function Tn(e) {
    function t(_) {
      return us(_, e);
    }
    (Ka !== null && us(Ka, e),
      Ja !== null && us(Ja, e),
      Wa !== null && us(Wa, e),
      Ni.forEach(t),
      zi.forEach(t));
    for (var a = 0; a < Fa.length; a++) {
      var l = Fa[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Fa.length && ((a = Fa[0]), a.blockedOn === null); )
      (gh(a), a.blockedOn === null && Fa.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (l = 0; l < a.length; l += 3) {
        var n = a[l],
          i = a[l + 1],
          f = n[ft] || null;
        if (typeof i == 'function') f || _h(a);
        else if (f) {
          var v = null;
          if (i && i.hasAttribute('formAction')) {
            if (((n = i), (f = i[ft] || null))) v = f.formAction;
            else if (Vo(n) !== null) continue;
          } else v = f.action;
          (typeof v == 'function' ? (a[l + 1] = v) : (a.splice(l, 3), (l -= 3)), _h(a));
        }
      }
  }
  function bh() {
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
  ((rs.prototype.render = Yo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var a = t.current,
        l = zt();
      fh(a, l, e, t, null, null);
    }),
    (rs.prototype.unmount = Yo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (fh(e.current, 2, null, e, null, null), kc(), (t[Gl] = null));
        }
      }));
  function rs(e) {
    this._internalRoot = e;
  }
  rs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Mr();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Fa.length && t !== 0 && t < Fa[a].priority; a++);
      (Fa.splice(a, 0, e), a === 0 && gh(e));
    }
  };
  var Sh = s.version;
  if (Sh !== '19.2.5') throw Error(o(527, Sh, '19.2.5'));
  V.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return ((e = p(t)), (e = e !== null ? b(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var Pv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: R,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var fs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!fs.isDisabled && fs.supportsFiber)
      try {
        ((qn = fs.inject(Pv)), (_t = fs));
      } catch {}
  }
  return (
    (Ci.createRoot = function (e, t) {
      if (!m(e)) throw Error(o(299));
      var a = !1,
        l = '',
        n = Ed,
        i = Md,
        f = Cd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (i = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = oh(e, 1, !1, null, null, a, l, null, n, i, f, bh)),
        (e[Gl] = t.current),
        To(e),
        new Yo(t)
      );
    }),
    (Ci.hydrateRoot = function (e, t, a) {
      if (!m(e)) throw Error(o(299));
      var l = !1,
        n = '',
        i = Ed,
        f = Md,
        v = Cd,
        _ = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (l = !0),
          a.identifierPrefix !== void 0 && (n = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (i = a.onUncaughtError),
          a.onCaughtError !== void 0 && (f = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (_ = a.formState)),
        (t = oh(e, 1, !0, t, a ?? null, l, n, _, i, f, v, bh)),
        (t.context = rh(null)),
        (a = t.current),
        (l = zt()),
        (l = ws(l)),
        (n = La(l)),
        (n.callback = null),
        qa(a, n, l),
        (a = l),
        (t.current.lanes = a),
        Un(t, a),
        la(t),
        (e[Gl] = t.current),
        To(e),
        new rs(t)
      );
    }),
    (Ci.version = '19.2.5'),
    Ci
  );
}
var Oh;
function dy() {
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
  return (c(), (Zo.exports = fy()), Zo.exports);
}
var my = dy(),
  de = fr();
const ds = ly(de),
  hy = '_content_11wqi_1',
  vy = { content: hy },
  yy = '_tabBar_rhd8d_2',
  gy = '_fullWidth_rhd8d_9',
  py = '_tab_rhd8d_2',
  _y = '_tabActive_rhd8d_54',
  by = '_tabDisabled_rhd8d_101',
  Sy = '_tabIcon_rhd8d_107',
  xy = '_tabLabel_rhd8d_114',
  jy = '_badge_rhd8d_119',
  Ty = '_badgeActive_rhd8d_137',
  Ay = '_indicator_rhd8d_158',
  Et = {
    tabBar: yy,
    fullWidth: gy,
    tab: py,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: _y,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: by,
    tabIcon: Sy,
    tabLabel: xy,
    badge: jy,
    badgeActive: Ty,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Ay,
  },
  Ny = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  zy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Ey = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  My = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Cy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Oy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  wy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Ry = { screw: Oy, bolt: zy, alloy: Ny, laser: Cy, cannon: Ey, thunder: wy, cutter: My };
function Dy(c, s) {
  return c.replace(/\swidth="\d+"/, ` width="${s}"`).replace(/\sheight="\d+"/, ` height="${s}"`);
}
function Ee({ name: c, size: s = 16, color: u = 'currentColor', className: o }) {
  const m = Ry[c];
  if (m)
    return r.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: u, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: Dy(m, s) },
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
    case 'tower':
      return r.jsx('svg', {
        ...d,
        children: r.jsx('polygon', {
          points: '12,4 20,20 4,20',
          fill: u,
          stroke: u,
          strokeLinejoin: 'round',
        }),
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
  const y = de.useRef(null),
    [g, p] = de.useState({ left: 0, width: 0 });
  return (
    de.useEffect(() => {
      const b = y.current;
      if (!b) return;
      const T = c.findIndex((H) => H.key === s);
      if (T < 0) return;
      const C = b.querySelectorAll('[role="tab"]')[T];
      if (!C) return;
      const O = b.getBoundingClientRect(),
        U = C.getBoundingClientRect();
      p({ left: U.left - O.left, width: U.width });
    }, [s, c]),
    r.jsxs('div', {
      ref: y,
      role: 'tablist',
      className: [
        Et.tabBar,
        Et[`variant-${o}`],
        Et[`size-${m}`],
        Et[`align-${h}`],
        d ? Et.fullWidth : '',
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
              className: [Et.tab, T ? Et.tabActive : '', b.disabled === !0 ? Et.tabDisabled : '']
                .filter(Boolean)
                .join(' '),
              onClick: () => {
                b.disabled !== !0 && u(b.key);
              },
              children: [
                b.iconName != null &&
                  r.jsx('span', {
                    className: Et.tabIcon,
                    'aria-hidden': 'true',
                    children: r.jsx(Ee, { name: b.iconName, size: m === 'sm' ? 12 : 14 }),
                  }),
                r.jsx('span', { className: Et.tabLabel, children: b.label }),
                b.badge != null &&
                  r.jsx('span', {
                    className: [Et.badge, T ? Et.badgeActive : ''].filter(Boolean).join(' '),
                    children: b.badge,
                  }),
              ],
            },
            b.key
          );
        }),
        o === 'underline' &&
          r.jsx('span', {
            className: Et.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${g.left}px)`, width: g.width },
          }),
      ],
    })
  );
}
const By = '_shell_1wkhk_6',
  Ly = '_header_1wkhk_19',
  qy = '_main_1wkhk_32',
  Hy = '_noScroll_1wkhk_41',
  Uy = '_footer_1wkhk_46',
  Gy = '_battle_1wkhk_59',
  An = { shell: By, header: Ly, main: qy, noScroll: Hy, footer: Uy, battle: Gy };
function Bl({ header: c, footer: s, children: u, noScroll: o = !1, variant: m = 'default' }) {
  return r.jsxs('div', {
    className: [An.shell, m === 'battle' ? An.battle : ''].filter(Boolean).join(' '),
    children: [
      c != null && r.jsx('header', { className: An.header, children: c }),
      r.jsx('main', {
        className: [An.main, o ? An.noScroll : ''].filter(Boolean).join(' '),
        children: u,
      }),
      s != null && r.jsx('footer', { className: An.footer, children: s }),
    ],
  });
}
const Vy = '_nav_4erx0_2',
  $y = '_tab_4erx0_10',
  Yy = '_active_4erx0_33',
  ky = '_iconWrap_4erx0_38',
  Zy = '_badge_4erx0_51',
  Oi = { nav: Vy, tab: $y, active: Yy, iconWrap: ky, badge: Zy },
  Xy = '_text_1wy1n_1',
  Qy = '_variant_heading_1_1wy1n_6',
  Ky = '_variant_heading_2_1wy1n_15',
  Jy = '_variant_heading_3_1wy1n_24',
  Wy = '_variant_body_1wy1n_33',
  Fy = '_variant_caption_1wy1n_41',
  Iy = '_variant_label_1wy1n_49',
  Py = '_variant_numeric_l_1wy1n_58',
  eg = '_variant_numeric_m_1wy1n_67',
  tg = '_variant_numeric_s_1wy1n_76',
  ag = '_color_default_1wy1n_85',
  lg = '_color_mid_1wy1n_89',
  ng = '_color_dim_1wy1n_93',
  ig = '_color_disabled_1wy1n_97',
  cg = '_color_primary_1wy1n_101',
  sg = '_color_secondary_1wy1n_105',
  ug = '_color_danger_1wy1n_109',
  og = '_color_success_1wy1n_113',
  rg = '_color_warning_1wy1n_117',
  fg = '_truncate_1wy1n_121',
  dg = '_align_left_1wy1n_128',
  mg = '_align_center_1wy1n_132',
  hg = '_align_right_1wy1n_136',
  wi = {
    text: Xy,
    variant_heading_1: Qy,
    variant_heading_2: Ky,
    variant_heading_3: Jy,
    variant_body: Wy,
    variant_caption: Fy,
    variant_label: Iy,
    variant_numeric_l: Py,
    variant_numeric_m: eg,
    variant_numeric_s: tg,
    color_default: ag,
    color_mid: lg,
    color_dim: ng,
    color_disabled: ig,
    color_primary: cg,
    color_secondary: sg,
    color_danger: ug,
    color_success: og,
    color_warning: rg,
    truncate: fg,
    align_left: dg,
    align_center: mg,
    align_right: hg,
  };
function vg(c) {
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
  className: m,
  truncate: d,
  align: h,
  style: y,
}) {
  const g = u ?? vg(c),
    p = c.replace(/-/g, '_'),
    b = o === 'text' ? 'default' : o;
  return r.jsx(g, {
    className: [
      wi.text,
      wi[`variant_${p}`],
      wi[`color_${b}`],
      d ? wi.truncate : '',
      h ? wi[`align_${h}`] : '',
      m,
    ]
      .filter(Boolean)
      .join(' '),
    style: y,
    children: s,
  });
}
const yg = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function ki({ active: c, onChange: s, badges: u }) {
  return r.jsx('nav', {
    className: Oi.nav,
    'aria-label': 'メインナビゲーション',
    children: yg.map(({ key: o, label: m, iconName: d }) => {
      const h = o === c,
        y = u == null ? void 0 : u[o];
      return r.jsxs(
        'button',
        {
          type: 'button',
          className: [Oi.tab, h ? Oi.active : ''].filter(Boolean).join(' '),
          onClick: () => s(o),
          'aria-current': h ? 'page' : void 0,
          'aria-label': m,
          children: [
            r.jsxs('span', {
              className: Oi.iconWrap,
              children: [
                r.jsx(Ee, {
                  name: d,
                  size: 22,
                  color: h ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                y != null &&
                  r.jsx('span', { className: Oi.badge, 'aria-hidden': 'true', children: y }),
              ],
            }),
            r.jsx(G, { variant: 'caption', color: h ? 'primary' : 'dim', children: m }),
          ],
        },
        o
      );
    }),
  });
}
const gg = '_root_kv5uk_2',
  pg = '_titleRow_kv5uk_8',
  _g = '_left_kv5uk_17',
  bg = '_center_kv5uk_24',
  Sg = '_right_kv5uk_33',
  xg = '_currencies_kv5uk_42',
  jg = '_actions_kv5uk_49',
  Tg = '_tabBarSlot_kv5uk_56',
  Pa = {
    root: gg,
    titleRow: pg,
    left: _g,
    center: bg,
    right: Sg,
    currencies: xg,
    actions: jg,
    tabBarSlot: Tg,
  },
  Ag = '_root_i843c_2',
  Ng = '_icon_i843c_10',
  zg = '_delta_i843c_30',
  Eg = '_deltaSm_i843c_37',
  Mg = '_deltaMd_i843c_41',
  Cg = '_deltaLg_i843c_45',
  Og = '_subtle_i843c_50',
  wg = '_currencyLabel_i843c_55',
  Rg = '_rankStamp_i843c_64',
  na = {
    root: Ag,
    icon: Ng,
    delta: zg,
    deltaSm: Eg,
    deltaMd: Mg,
    deltaLg: Cg,
    subtle: Og,
    currencyLabel: wg,
    rankStamp: Rg,
  },
  Dg = '_root_1wxcz_1',
  Bg = '_sizeSm_1wxcz_13',
  Lg = '_sizeMd_1wxcz_17',
  qg = '_sizeLg_1wxcz_21',
  Hg = '_sizeXl_1wxcz_25',
  Ug = '_affix_1wxcz_29',
  El = { root: Dg, sizeSm: Bg, sizeMd: Lg, sizeLg: qg, sizeXl: Hg, affix: Ug };
function lr(c) {
  let s = c.length;
  for (; s > 0 && c[s - 1] === 0; ) s--;
  return c.slice(0, s);
}
function Ri(c) {
  let s = 0;
  for (let u = 0; u < c.length; u++) {
    const o = Math.floor(c[u] + s);
    ((c[u] = o % 1e3), (s = Math.floor(o / 1e3)));
  }
  for (; s > 0; ) (c.push(s % 1e3), (s = Math.floor(s / 1e3)));
  return lr(c);
}
function Gg(c, s) {
  for (; s !== 0; ) {
    const u = s;
    ((s = c % s), (c = u));
  }
  return c;
}
function Vg(c) {
  const s = c.toString(),
    u = s.indexOf('.');
  if (u === -1) return { num: Math.round(c), den: 1 };
  const o = s.length - u - 1,
    m = Math.pow(10, o),
    d = Math.round(c * m),
    h = Gg(Math.abs(d), m);
  return { num: d / h, den: m / h };
}
function $g(c) {
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
    return new st(lr(u));
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
    return new st(lr(o));
  }
  static fromJSON(s) {
    return new st(Ri([...s]));
  }
  add(s) {
    const u = this.digits,
      o = s.digits,
      m = Math.max(u.length, o.length),
      d = new Array(m).fill(0);
    let h = 0;
    for (let y = 0; y < m; y++) {
      const g = (u[y] ?? 0) + (o[y] ?? 0) + h;
      ((d[y] = g % 1e3), (h = Math.floor(g / 1e3)));
    }
    return (h > 0 && d.push(h), new st(Ri(d)));
  }
  sub(s) {
    if (this.compare(s) <= 0) return st.ZERO;
    const u = this.digits,
      o = s.digits,
      m = new Array(u.length).fill(0);
    let d = 0;
    for (let h = 0; h < u.length; h++) {
      let y = (u[h] ?? 0) - (o[h] ?? 0) - d;
      (y < 0 ? ((y += 1e3), (d = 1)) : (d = 0), (m[h] = y));
    }
    return new st(Ri(m));
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
    return new st(Ri(o));
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
    return (m > 0 && (o[0] += 1), new st(Ri(o)));
  }
  mulRational(s, u) {
    return this.mulInt(s).divInt(u);
  }
  mulNumber(s) {
    const { num: u, den: o } = Vg(s);
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
      m = $g(o),
      d = this.digits[s - 2] ?? 0,
      h = Math.floor(d / 10);
    return `${u}.${String(h).padStart(2, '0')}${m}`;
  }
};
Kt(st, 'ZERO', new st([]));
let Ne = st;
function Yg(c) {
  if (c === '') return 0;
  let s = 0;
  for (let u = 0; u < c.length; u++) s = s * 26 + (c.charCodeAt(u) - 65 + 1);
  return s;
}
function kg(c) {
  if (c <= 0) return { color: 'var(--c-text)', glow: '0 0 6px rgba(232,239,255,0.35)' };
  const s = Math.min(1, (c - 1) / 19),
    u = 195 + s * 100,
    o = 0.86 - s * 0.14,
    m = 0.13 + s * 0.07,
    d = `oklch(${o.toFixed(3)} ${m.toFixed(3)} ${u.toFixed(1)})`,
    h = Math.min(0.95, o + 0.05),
    y = m + 0.05,
    g = `oklch(${h.toFixed(3)} ${y.toFixed(3)} ${u.toFixed(1)} / 0.55)`;
  return { color: d, glow: `0 0 8px ${g}` };
}
function Zg(c) {
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
function Xg(c) {
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
function sl({
  value: c,
  size: s = 'md',
  accentColor: u = 'scale',
  glow: o = !1,
  prefix: m,
  suffix: d,
  decimals: h,
  style: y,
}) {
  const g = typeof c == 'number' ? Ne.fromNumber(c) : c;
  let p;
  h != null && typeof c == 'number' ? (p = c.toFixed(h)) : (p = g.toDisplay());
  const b = p.match(/^[\d.]+([A-Z]*)$/),
    T = b ? b[1] : '',
    E = Yg(T);
  let C, O;
  if (u === 'scale') {
    const F = kg(E);
    ((C = F.color), (O = o ? F.glow : void 0));
  } else ((C = Zg(u)), (O = o ? Xg(u) : void 0));
  const U = { sm: El.sizeSm, md: El.sizeMd, lg: El.sizeLg, xl: El.sizeXl }[s],
    H = { color: C, ...(O != null ? { textShadow: O } : {}), ...y };
  return r.jsxs('span', {
    className: `${El.root} ${U}`,
    style: H,
    children: [
      m != null && r.jsx('span', { className: El.affix, children: m }),
      p,
      d != null && r.jsx('span', { className: El.affix, children: d }),
    ],
  });
}
const Qg = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  Kg = { sm: 12, md: 16, lg: 22, xl: 28 };
function Jg({ delta: c, sizeClass: s }) {
  const u = c === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return r.jsx('span', {
    className: `${na.delta} ${s}`,
    style: { color: u },
    'aria-hidden': 'true',
    children: c,
  });
}
function Ln({
  currency: c,
  value: s,
  size: u = 'md',
  delta: o,
  showLabel: m,
  subtle: d,
  align: h = 'start',
  ranked: y,
}) {
  const g = typeof s == 'number' ? Ne.fromNumber(s) : s,
    p = Qg[c],
    b = d ? 'var(--c-text-disabled)' : `var(${p.cssVar})`,
    T = o && !d ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: b },
    E = { sm: na.deltaSm, md: na.deltaMd, lg: na.deltaLg, xl: na.deltaLg }[u],
    C = r.jsx(Ee, { name: c, size: Kg[u], color: b, className: na.icon }),
    O = r.jsxs(r.Fragment, {
      children: [
        o !== void 0 && !d && r.jsx(Jg, { delta: o, sizeClass: E }),
        r.jsx(sl, { value: g, size: u, accentColor: 'primary', style: T }),
      ],
    });
  return r.jsxs('span', {
    className: [na.root, d ? na.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${p.label} ${g.toDisplay()}`,
    children: [
      h === 'end'
        ? r.jsxs(r.Fragment, { children: [O, C] })
        : r.jsxs(r.Fragment, { children: [C, O] }),
      m && r.jsx('span', { className: na.currencyLabel, 'aria-hidden': 'true', children: p.label }),
      y !== void 0 &&
        y !== '' &&
        r.jsx('span', {
          className: na.rankStamp,
          'data-rank': y,
          'aria-label': `rank ${y}`,
          children: y,
        }),
    ],
  });
}
const Wg = '_iconButton_1fyi8_1',
  Fg = '_round_1fyi8_23',
  Ig = '_active_1fyi8_85',
  Pg = '_iconWrap_1fyi8_113',
  Nn = {
    iconButton: Wg,
    round: Fg,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: Ig,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: Pg,
  },
  ep = { sm: 14, md: 18, lg: 22 };
function Vi({
  icon: c,
  label: s,
  size: u = 'md',
  variant: o = 'ghost',
  shape: m = 'square',
  active: d = !1,
  disabled: h = !1,
  onClick: y,
}) {
  const g = o === 'default' ? 'ghost' : o,
    p = typeof c == 'string' ? r.jsx(Ee, { name: c, size: ep[u] }) : c;
  return r.jsx('button', {
    type: 'button',
    className: [
      Nn.iconButton,
      Nn[`variant-${g}`],
      Nn[`size-${u}`],
      m === 'round' ? Nn.round : '',
      d ? Nn.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: y,
    'aria-label': s,
    'aria-pressed': d,
    'aria-disabled': h,
    children: r.jsx('span', { className: Nn.iconWrap, 'aria-hidden': 'true', children: p }),
  });
}
const wh = (c) => {
    let s;
    const u = new Set(),
      o = (p, b) => {
        const T = typeof p == 'function' ? p(s) : p;
        if (!Object.is(T, s)) {
          const E = s;
          ((s = (b ?? (typeof T != 'object' || T === null)) ? T : Object.assign({}, s, T)),
            u.forEach((C) => C(s, E)));
        }
      },
      m = () => s,
      y = {
        setState: o,
        getState: m,
        getInitialState: () => g,
        subscribe: (p) => (u.add(p), () => u.delete(p)),
      },
      g = (s = c(o, m, y));
    return y;
  },
  tp = (c) => (c ? wh(c) : wh),
  ap = (c) => c;
function lp(c, s = ap) {
  const u = ds.useSyncExternalStore(
    c.subscribe,
    ds.useCallback(() => s(c.getState()), [c, s]),
    ds.useCallback(() => s(c.getInitialState()), [c, s])
  );
  return (ds.useDebugValue(u), u);
}
const np = (c) => {
    const s = tp(c),
      u = (o) => lp(s, o);
    return (Object.assign(u, s), u);
  },
  ip = (c) => np,
  Rh = {
    isRunActive: !1,
    screw: Ne.ZERO,
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
  cp = (c, s) => ({
    ...Rh,
    startRun: ({ initialWeapon: u, machineMaxHp: o, gameSpeed: m }) =>
      c({
        isRunActive: !0,
        screw: Ne.ZERO,
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
  sp = { bolt: Ne.ZERO, alloy: Ne.ZERO },
  up = (c, s) => ({
    ...sp,
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
    resetCurrencies: () => c({ bolt: Ne.ZERO, alloy: Ne.ZERO }),
  }),
  Bn = 6,
  op = { equippedPatches: new Map() },
  rp = (c, s) => ({
    ...op,
    equipPatch: (u, o, m) => {
      const d = s().equippedPatches;
      for (const [h, y] of d) if (y.name === o && h !== u) return !1;
      return (
        c((h) => {
          const y = new Map(h.equippedPatches);
          return (y.set(u, { name: o, tier: m }), { equippedPatches: y });
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
  h1 = 'tower-like-game',
  ps = 1,
  Q = {
    profile: 'profile',
    currencies: 'currencies',
    machine: 'machine',
    weapons: 'weapons',
    patches: 'patches',
    equippedPatches: 'equippedPatches',
    settings: 'settings',
  },
  v1 = [
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
  fp = {
    id: 'singleton',
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    schemaVersion: ps,
  },
  dp = { id: 'singleton', bolt: [], alloy: [] },
  mp = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  hp = {
    id: 'singleton',
    defaultGameSpeed: 1,
    bgmVolume: 0.8,
    seVolume: 0.8,
    vibrationEnabled: !0,
  };
function y1() {
  return Object.fromEntries(v1.map((c) => [c, 0]));
}
const vp = { machineLevels: y1() },
  yp = (c) => ({
    ...vp,
    incrementMachineLv: (s) =>
      c((u) => ({ machineLevels: { ...u.machineLevels, [s]: u.machineLevels[s] + 1 } })),
    setMachineLv: (s, u) => c((o) => ({ machineLevels: { ...o.machineLevels, [s]: u } })),
    resetMachine: () => c({ machineLevels: y1() }),
  });
function Dh(c, s) {
  return `${c}#${s}`;
}
const gp = { patches: new Map() },
  pp = (c, s) => ({
    ...gp,
    addPatch: (u, o, m = 1) => {
      const d = Dh(u, o);
      c((h) => {
        const y = new Map(h.patches),
          g = y.get(d);
        return (
          g ? y.set(d, { ...g, count: g.count + m }) : y.set(d, { name: u, tier: o, count: m }),
          { patches: y }
        );
      });
    },
    consumePatch: (u, o, m = 1) => {
      const d = Dh(u, o),
        h = s().patches.get(d);
      return !h || h.count < m
        ? !1
        : (c((y) => {
            const g = new Map(y.patches),
              p = g.get(d);
            if (!p) return {};
            const b = p.count - m;
            return (b <= 0 ? g.delete(d) : g.set(d, { ...p, count: b }), { patches: g });
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
  _p = (c) => ({
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
  bp = (c) => ({
    ...Lh,
    setDefaultGameSpeed: (s) => c({ defaultGameSpeed: s }),
    setBgmVolume: (s) => c({ bgmVolume: Math.max(0, Math.min(1, s)) }),
    setSeVolume: (s) => c({ seVolume: Math.max(0, Math.min(1, s)) }),
    setVibrationEnabled: (s) => c({ vibrationEnabled: s }),
    resetSettings: () => c(Lh),
  }),
  qh = { weaponLv: 0, initialWeapon: 'laser' },
  Sp = (c) => ({
    ...qh,
    incrementWeaponLv: () => c((s) => ({ weaponLv: s.weaponLv + 1 })),
    setWeaponLv: (s) => c({ weaponLv: s }),
    setInitialWeapon: (s) => c({ initialWeapon: s }),
    resetWeapons: () => c(qh),
  }),
  X = ip()((...c) => ({
    ..._p(...c),
    ...up(...c),
    ...yp(...c),
    ...Sp(...c),
    ...pp(...c),
    ...rp(...c),
    ...bp(...c),
    ...cp(...c),
  }));
function Zi({ title: c, subtitle: s, onBack: u, currencies: o, tabBar: m, actions: d }) {
  const h = X((E) => E.bolt),
    y = X((E) => E.alloy),
    g = X((E) => E.screw),
    p = X((E) => E.isRunActive),
    b = (o ?? []).filter((E) => (E === 'screw' ? p : !0));
  function T(E) {
    switch (E) {
      case 'bolt':
        return h;
      case 'alloy':
        return y;
      case 'screw':
        return g;
    }
  }
  return r.jsxs('div', {
    className: Pa.root,
    children: [
      r.jsxs('div', {
        className: Pa.titleRow,
        children: [
          r.jsx('div', {
            className: Pa.left,
            children:
              u != null &&
              r.jsx(Vi, {
                icon: 'chevron-left',
                label: '戻る',
                variant: 'ghost',
                size: 'md',
                onClick: u,
              }),
          }),
          r.jsxs('div', {
            className: Pa.center,
            children: [
              r.jsx(G, { variant: 'heading-3', truncate: !0, align: 'center', children: c }),
              s != null &&
                r.jsx(G, { variant: 'caption', color: 'dim', align: 'center', children: s }),
            ],
          }),
          r.jsxs('div', {
            className: Pa.right,
            children: [
              b.length > 0 &&
                r.jsx('div', {
                  className: Pa.currencies,
                  children: b.map((E) => r.jsx(Ln, { currency: E, value: T(E), size: 'sm' }, E)),
                }),
              d != null && r.jsx('div', { className: Pa.actions, children: d }),
            ],
          }),
        ],
      }),
      m != null && r.jsx('div', { className: Pa.tabBarSlot, children: m }),
    ],
  });
}
const xp = '_tab_1nc83_3',
  jp = { tab: xp },
  Tp = '_wrapper_1opqp_3',
  Ap = '_active_1opqp_12',
  Np = '_card_1opqp_12',
  zp = '_locked_1opqp_18',
  Ep = '_tall_1opqp_34',
  Mp = '_iconTile_1opqp_37',
  Cp = '_headerText_1opqp_42',
  Op = '_description_1opqp_45',
  wp = '_name_1opqp_48',
  Rp = '_wide_1opqp_53',
  Dp = '_body_1opqp_61',
  Bp = '_header_1opqp_42',
  Lp = '_statGrid_1opqp_121',
  qp = '_statChip_1opqp_129',
  Hp = '_statLabel_1opqp_140',
  Up = '_statValue_1opqp_147',
  Gp = '_lockedBadge_1opqp_158',
  at = {
    wrapper: Tp,
    active: Ap,
    card: Np,
    locked: zp,
    tall: Ep,
    iconTile: Mp,
    headerText: Cp,
    description: Op,
    name: wp,
    wide: Rp,
    body: Dp,
    header: Bp,
    statGrid: Lp,
    statChip: qp,
    statLabel: Hp,
    statValue: Up,
    lockedBadge: Gp,
  },
  Vp = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function g1({
  weapon: c,
  name: s,
  description: u,
  stats: o,
  layout: m = 'tall',
  active: d = !1,
  locked: h = !1,
  onClick: y,
}) {
  const g = m === 'wide',
    p = y != null && !h;
  return r.jsx('div', {
    className: [at.wrapper, d ? at.active : '', h ? at.locked : '', g ? at.wide : at.tall]
      .filter(Boolean)
      .join(' '),
    onClick: p ? y : void 0,
    role: p ? 'button' : void 0,
    tabIndex: p ? 0 : void 0,
    onKeyDown: p
      ? (b) => {
          (b.key === 'Enter' || b.key === ' ') && (b.preventDefault(), y());
        }
      : void 0,
    'aria-pressed': y != null ? d : void 0,
    children: r.jsxs('div', {
      className: at.card,
      style: p ? { cursor: 'pointer' } : void 0,
      children: [
        r.jsx('div', {
          className: at.iconTile,
          'aria-hidden': !0,
          children: r.jsx(Ee, { name: c, size: g ? 40 : 52 }),
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
                          style: b.accent != null ? { color: Vp[b.accent] } : void 0,
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
                  r.jsx(G, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
                ],
              }),
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
  As = { laser: 1, cannon: 0.5, thunder: 0.7, cutter: 2 },
  dr = { laser: 580, thunder: 420, cannon: 520 };
function $p(c) {
  const s = Math.round(Ts.laser * xs(c)),
    u = Math.floor(1 + 0.1 * c),
    o = Math.round(js(As.laser, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '貫通', value: u },
    { label: '射程', value: dr.laser, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Yp(c) {
  const s = Math.round(Ts.cannon * xs(c)),
    u = Math.round((30 + 0.5 * c) * 10) / 10,
    o = Math.round(js(As.cannon, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '半径', value: u, suffix: 'm' },
    { label: '射程', value: dr.cannon, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function kp(c) {
  const s = Math.round(Ts.thunder * xs(c)),
    u = Math.floor(7 + 0.1 * c),
    o = Math.round(js(As.thunder, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '連鎖', value: u },
    { label: '射程', value: dr.thunder, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Zp(c) {
  const s = Math.round(Ts.cutter * xs(c)),
    u = Math.round((80 + 0.5 * c) * 10) / 10,
    o = Math.floor(1 + 0.05 * c),
    m = Math.round(js(As.cutter, c) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '旋回', value: u, suffix: 'm' },
    { label: '同時', value: o },
    { label: '連射', value: m, suffix: '/s' },
  ];
}
const Xp = [
  { kind: 'laser', name: 'LASER', description: '高速直進ビーム。', buildStats: $p },
  { kind: 'cannon', name: 'CANNON', description: '範囲爆発。', buildStats: Yp },
  { kind: 'thunder', name: 'THUNDER', description: '連鎖電撃。', buildStats: kp },
  { kind: 'cutter', name: 'CUTTER', description: '旋回斬撃。', buildStats: Zp },
];
function Qp() {
  const c = X((s) => s.weaponLv);
  return r.jsx('div', {
    className: jp.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: Xp.map((s) =>
      r.jsx(
        g1,
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
const Kp = '_tab_1oky8_3',
  Jp = '_topRow_1oky8_9',
  Wp = '_description_1oky8_15',
  Fp = '_previewCard_1oky8_21',
  Ip = '_previewLabel_1oky8_25',
  Pp = '_impactGrid_1oky8_32',
  e_ = '_impactRow_1oky8_37',
  t_ = '_impactRowBordered_1oky8_45',
  a_ = '_impactLabel_1oky8_49',
  l_ = '_impactValues_1oky8_55',
  n_ = '_arrow_1oky8_62',
  Jt = {
    tab: Kp,
    topRow: Jp,
    description: Wp,
    previewCard: Fp,
    previewLabel: Ip,
    impactGrid: Pp,
    impactRow: e_,
    impactRowBordered: t_,
    impactLabel: a_,
    impactValues: l_,
    arrow: n_,
  },
  i_ = '_card_1403j_1',
  c_ = '_interactive_1403j_97',
  Di = {
    card: i_,
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
    interactive: c_,
  };
function Ll({
  children: c,
  variant: s = 'default',
  interactive: u = !1,
  padding: o = 'md',
  radius: m,
  className: d,
}) {
  const h = [
    Di.card,
    Di[`variant-${s}`],
    Di[`padding-${o}`],
    m != null ? Di[`radius-${m}`] : '',
    u ? Di.interactive : '',
    d ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return r.jsx('div', { className: h, children: c });
}
const s_ = '_root_168oy_2',
  u_ = '_header_168oy_15',
  o_ = '_iconWrap_168oy_22',
  r_ = '_title_168oy_34',
  f_ = '_lvBadge_168oy_47',
  d_ = '_description_168oy_60',
  m_ = '_valueRow_168oy_66',
  h_ = '_valueBefore_168oy_74',
  v_ = '_valueAfter_168oy_83',
  y_ = '_arrow_168oy_93',
  g_ = '_buttons_168oy_100',
  p_ = '_btnCol_168oy_105',
  __ = '_btn_168oy_105',
  b_ = '_btnPrimary_168oy_132',
  S_ = '_btnSecondary_168oy_139',
  x_ = '_btnWarning_168oy_146',
  j_ = '_costRow_168oy_172',
  T_ = '_costNum_168oy_181',
  A_ = '_costDisabled_168oy_190',
  Ye = {
    root: s_,
    header: u_,
    iconWrap: o_,
    title: r_,
    lvBadge: f_,
    description: d_,
    valueRow: m_,
    valueBefore: h_,
    valueAfter: v_,
    arrow: y_,
    buttons: g_,
    btnCol: p_,
    btn: __,
    btnPrimary: b_,
    btnSecondary: S_,
    btnWarning: x_,
    costRow: j_,
    costNum: T_,
    costDisabled: A_,
  },
  N_ = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  z_ = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  E_ = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  M_ = { primary: Ye.btnPrimary, secondary: Ye.btnSecondary, warning: Ye.btnWarning },
  C_ = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function Wo(c) {
  return c instanceof Ne ? c.toDisplay() : c.toLocaleString();
}
function mr({
  title: c,
  description: s,
  iconName: u,
  iconColor: o,
  currentLabel: m,
  before: d,
  after: h,
  beforeSuffix: y = '',
  currency: g = 'bolt',
  accent: p,
  options: b = [],
  maxed: T = !1,
  onUpgrade: E,
}) {
  const C = p ?? E_[g],
    O = N_[C],
    U = o ?? O,
    H = M_[C],
    F = C_[C];
  return r.jsxs('div', {
    className: Ye.root,
    role: 'group',
    'aria-label': c,
    'data-maxed': T,
    children: [
      r.jsxs('div', {
        className: Ye.header,
        children: [
          u != null &&
            r.jsx('span', {
              className: Ye.iconWrap,
              children: r.jsx(Ee, { name: u, size: 14, color: U }),
            }),
          r.jsx('span', { className: Ye.title, children: c }),
          m != null &&
            !T &&
            r.jsx('span', {
              className: Ye.lvBadge,
              style: { color: O, boxShadow: z_[C] },
              children: m,
            }),
          T &&
            r.jsx('span', {
              className: Ye.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      s != null &&
        s.length > 0 &&
        r.jsx(G, { variant: 'caption', color: 'dim', className: Ye.description, children: s }),
      d != null &&
        r.jsxs('div', {
          className: Ye.valueRow,
          children: [
            r.jsxs('span', { className: Ye.valueBefore, children: [Wo(d), y] }),
            h != null &&
              !T &&
              r.jsxs(r.Fragment, {
                children: [
                  r.jsx('span', { className: Ye.arrow, children: '→' }),
                  r.jsxs('span', {
                    className: Ye.valueAfter,
                    style: { color: O, textShadow: `0 0 5px ${F}` },
                    children: [Wo(h), y],
                  }),
                ],
              }),
          ],
        }),
      !T &&
        b.length > 0 &&
        r.jsx('div', {
          className: Ye.buttons,
          style: { gridTemplateColumns: `repeat(${b.length}, 1fr)` },
          children: b.map((I) => {
            const me = I.disabled === !0;
            return r.jsxs(
              'div',
              {
                className: Ye.btnCol,
                children: [
                  r.jsx('button', {
                    type: 'button',
                    className: `${Ye.btn} ${H}`,
                    disabled: me,
                    onClick: me ? void 0 : () => (E == null ? void 0 : E(I.amount)),
                    children: I.amount,
                  }),
                  r.jsx('div', {
                    className: Ye.costRow,
                    children: r.jsx('span', {
                      className: `${Ye.costNum} ${me ? Ye.costDisabled : ''}`,
                      children: Wo(I.cost),
                    }),
                  }),
                ],
              },
              I.amount
            );
          }),
        }),
    ],
  });
}
function hr(c) {
  const s = Math.ceil(200 * Math.pow(1.12, c));
  return Ne.fromNumber(s);
}
function Hh(c, s) {
  let u = Ne.ZERO;
  for (let o = 0; o < s; o++) u = u.add(hr(c + o));
  return u;
}
function O_(c, s) {
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
function w_(c) {
  const s = c + 1,
    u = Uh(c),
    o = Uh(s);
  return [
    { label: 'LASER DMG', before: Math.round(Gh.laser * u), after: Math.round(Gh.laser * o) },
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
function R_() {
  const c = X((O) => O.weaponLv),
    s = X((O) => O.alloy),
    u = X((O) => O.incrementWeaponLv),
    o = X((O) => O.setWeaponLv),
    m = X((O) => O.spendAlloy),
    d = hr(c),
    h = Hh(c, 5),
    y = O_(c, s),
    g = Hh(c, y),
    p = !s.lt(d),
    b = y >= 5,
    T = y >= 1,
    E = w_(c);
  function C(O) {
    O === '+1'
      ? m(d) && u()
      : O === '+5'
        ? m(h) && o(c + 5)
        : O === 'MAX' && y > 0 && m(g) && o(c + y);
  }
  return r.jsxs('div', {
    className: Jt.tab,
    role: 'tabpanel',
    'aria-label': '武器強化',
    children: [
      r.jsxs('div', {
        className: Jt.topRow,
        children: [
          r.jsx(G, {
            variant: 'caption',
            color: 'mid',
            className: Jt.description,
            children: '全 4 武器に共通で効く強化です。',
          }),
          r.jsx(Ln, { currency: 'alloy', value: s, size: 'sm' }),
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
          { amount: '+1', cost: d, disabled: !p },
          { amount: '+5', cost: h, disabled: !b },
          { amount: 'MAX', cost: g, disabled: !T },
        ],
        onUpgrade: C,
      }),
      r.jsxs(Ll, {
        variant: 'sunken',
        padding: 'md',
        className: Jt.previewCard,
        children: [
          r.jsx(G, {
            variant: 'label',
            color: 'dim',
            className: Jt.previewLabel,
            children: '次 Lv での効果プレビュー',
          }),
          r.jsx('div', {
            className: Jt.impactGrid,
            children: E.map((O, U) =>
              r.jsxs(
                'div',
                {
                  className: [Jt.impactRow, U > 0 ? Jt.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    r.jsx(G, {
                      variant: 'caption',
                      color: 'mid',
                      className: Jt.impactLabel,
                      children: O.label,
                    }),
                    r.jsxs('span', {
                      className: Jt.impactValues,
                      children: [
                        r.jsx(sl, {
                          value: O.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: O.suffix,
                          decimals: O.suffix === 'm' ? 1 : 0,
                        }),
                        r.jsx('span', { className: Jt.arrow, children: '→' }),
                        r.jsx(sl, {
                          value: O.after,
                          size: 'sm',
                          accentColor: 'secondary',
                          suffix: O.suffix,
                          decimals: O.suffix === 'm' ? 1 : 0,
                        }),
                      ],
                    }),
                  ],
                },
                O.label
              )
            ),
          }),
        ],
      }),
    ],
  });
}
const p1 = de.createContext(null);
function D_({ children: c, initialScreen: s }) {
  const [u, o] = de.useState(s ?? 'title'),
    m = de.useCallback((d) => {
      o(d);
    }, []);
  return r.jsx(p1.Provider, { value: { screen: u, navigate: m }, children: c });
}
function ul() {
  const c = de.useContext(p1);
  if (!c) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return c;
}
const B_ = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function L_(c = {}) {
  const { initialTab: s = 'details' } = c,
    [u, o] = de.useState(s),
    { screen: m, navigate: d } = ul();
  return r.jsx(Bl, {
    header: r.jsx(Zi, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => d('preparation'),
      tabBar: r.jsx(Ss, { tabs: B_, value: u, onChange: o, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(ki, { active: m, onChange: (h) => d(h) }),
    children: r.jsxs('div', {
      className: vy.content,
      children: [u === 'details' && r.jsx(Qp, {}), u === 'upgrade' && r.jsx(R_, {})],
    }),
  });
}
const q_ = '_root_15ig1_1',
  H_ = '_overlayLayer_15ig1_10',
  Vh = { root: q_, overlayLayer: H_ },
  U_ = '_root_1375f_3',
  G_ = '_rangeCircle_1375f_15',
  V_ = '_machine_1375f_27',
  $_ = '_machineRingOuter_1375f_40',
  Y_ = '_pin_1375f_50',
  k_ = '_enemy_1375f_60',
  Z_ = '_enemyUpper_1375f_71',
  X_ = '_enemyHpBar_1375f_74',
  el = {
    root: U_,
    rangeCircle: G_,
    machine: V_,
    machineRingOuter: $_,
    pin: Y_,
    enemy: k_,
    enemyUpper: Z_,
    enemyHpBar: X_,
  },
  Q_ = '_root_14p1r_1',
  K_ = { root: Q_ };
function J_({ value: c, x: s, y: u, crit: o = !1, duration: m = 800, onDone: d }) {
  const h = de.useId().replace(/:/g, 'dp'),
    y = `
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
      r.jsx('style', { dangerouslySetInnerHTML: { __html: y } }),
      r.jsx('div', {
        className: `${h} ${K_.root}`,
        onAnimationEnd: d,
        children: r.jsx(sl, {
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
const W_ = '_wrap_14rhu_1',
  F_ = { wrap: W_ },
  $h = 8;
function I_({ x: c, y: s, color: u = 'var(--c-text-mid)', duration: o = 480, onDone: m }) {
  const d = de.useId().replace(/:/g, 'ed'),
    y = `
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
    g = Array.from({ length: $h }, (p, b) =>
      r.jsx('div', { className: `${d}-shard`, style: { '--a': `${(b * 360) / $h}deg` } }, b)
    );
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: y } }),
      r.jsxs('div', {
        className: `${d}-wrap ${F_.wrap}`,
        style: { left: `${c}%`, top: `${s}%` },
        onAnimationEnd: m,
        children: [r.jsx('div', { className: `${d}-flash` }), g],
      }),
    ],
  });
}
const P_ = '_wrap_14rhu_1',
  e2 = { wrap: P_ };
function t2({ x: c, y: s, color: u = 'var(--c-primary-hi)', duration: o = 220, onDone: m }) {
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
        className: `${d}-w ${e2.wrap}`,
        style: { left: `${c}%`, top: `${s}%` },
        onAnimationEnd: m,
        children: r.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const a2 = '_root_2lc0r_2',
  l2 = '_boss_2lc0r_12',
  n2 = '_elite_2lc0r_16',
  i2 = '_sizeSm_2lc0r_21',
  c2 = '_sizeMd_2lc0r_25',
  s2 = '_sizeLg_2lc0r_29',
  u2 = '_header_2lc0r_35',
  o2 = '_headerRight_2lc0r_42',
  r2 = '_hpText_2lc0r_50',
  Na = {
    root: a2,
    boss: l2,
    elite: n2,
    sizeSm: i2,
    sizeMd: c2,
    sizeLg: s2,
    header: u2,
    headerRight: o2,
    hpText: r2,
  },
  f2 = '_badge_4fy54_1',
  d2 = '_glow_4fy54_90',
  m2 = '_iconLeft_4fy54_118',
  Bi = {
    badge: f2,
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
    glow: d2,
    iconLeft: m2,
  };
function Xi({
  text: c,
  variant: s = 'neutral',
  tier: u,
  size: o = 'md',
  glow: m = !1,
  iconLeft: d,
}) {
  let h;
  const y = s === 'default' ? 'neutral' : s;
  if (y === 'tier' && u != null) {
    const p = Math.min(Math.max(1, Math.floor(u)), 12);
    h = { '--badge-color': `var(--c-tier-${Math.min(p, 10)})` };
  } else
    y === 'patch-tier' &&
      u != null &&
      (h = { '--badge-color': `var(--c-patch-t${Math.min(Math.max(1, Math.floor(u)), 5)})` });
  let g = c;
  return (
    g == null &&
      (y === 'tier' && u != null
        ? (g = `T${u}`)
        : y === 'patch-tier' && u != null
          ? (g = `T${u}`)
          : (g = '')),
    r.jsxs('span', {
      className: [Bi.badge, Bi[`variant-${y}`], Bi[`size-${o}`], m ? Bi.glow : '']
        .filter(Boolean)
        .join(' '),
      style: h,
      children: [
        d != null && r.jsx('span', { className: Bi.iconLeft, 'aria-hidden': 'true', children: d }),
        g,
      ],
    })
  );
}
const h2 = '_root_1pi3d_2',
  v2 = '_sizeSm_1pi3d_11',
  y2 = '_sizeMd_1pi3d_15',
  g2 = '_sizeLg_1pi3d_19',
  p2 = '_fill_1pi3d_23',
  _2 = '_label_1pi3d_29',
  b2 = '_withTrailing_1pi3d_46',
  S2 = '_trailingLabel_1pi3d_56',
  tl = {
    root: h2,
    sizeSm: v2,
    sizeMd: y2,
    sizeLg: g2,
    fill: p2,
    label: _2,
    withTrailing: b2,
    trailingLabel: S2,
  },
  x2 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  j2 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function _s({
  value: c,
  max: s,
  color: u = 'primary',
  size: o = 'md',
  variant: m = 'solid',
  showLabel: d = !1,
  label: h,
  trailingLabel: y,
  glow: g = !1,
  reverse: p = !1,
}) {
  const b = Math.max(1, s),
    T = Math.min(Math.max(0, c), b),
    E = (T / b) * 100,
    C = x2[u],
    O = g || m === 'neon' ? j2[u] : void 0,
    U = { sm: tl.sizeSm, md: tl.sizeMd, lg: tl.sizeLg }[o],
    H = {
      width: `${E}%`,
      backgroundColor: C,
      ...(O != null ? { boxShadow: O } : {}),
      ...(p ? { marginLeft: 'auto' } : {}),
    },
    F = h ?? `${T} / ${b}`,
    I = r.jsxs('div', {
      className: `${tl.root} ${U}`,
      role: 'progressbar',
      'aria-valuenow': T,
      'aria-valuemin': 0,
      'aria-valuemax': b,
      'aria-label': h ?? `${T} / ${b}`,
      children: [
        r.jsx('div', { className: tl.fill, style: H }),
        d && r.jsx('span', { className: tl.label, children: F }),
      ],
    });
  return y == null
    ? I
    : r.jsxs('div', {
        className: tl.withTrailing,
        children: [I, r.jsx('span', { className: tl.trailingLabel, children: y })],
      });
}
function T2(c, s) {
  if (s.isZero()) return 0;
  const u = parseFloat(c.toString()),
    o = parseFloat(s.toString());
  return o === 0 || isNaN(o) ? 0 : Math.min(1e3, Math.max(0, Math.round((u / o) * 1e3)));
}
const A2 = { sm: Na.sizeSm, md: Na.sizeMd, lg: Na.sizeLg };
function N2({
  name: c,
  variant: s,
  current: u,
  max: o,
  tier: m,
  size: d = 'md',
  showValue: h = !0,
  type: y,
  currentHp: g,
  maxHp: p,
}) {
  const b = s ?? y ?? 'normal',
    T = u ?? g ?? 0,
    E = o ?? p ?? 0,
    C = typeof T == 'number' ? Ne.fromNumber(T) : T,
    O = typeof E == 'number' ? Ne.fromNumber(E) : E,
    U = T2(C, O),
    H = U <= 250,
    F = H ? 'hp-low' : 'hp',
    I = d === 'lg' ? 'lg' : d === 'sm' ? 'sm' : 'md';
  let me;
  return (
    b === 'boss'
      ? (me = { boxShadow: 'var(--glow-danger-md)' })
      : b === 'elite' && (me = { boxShadow: 'var(--glow-purple-md)' }),
    r.jsxs('div', {
      className: [Na.root, b === 'boss' ? Na.boss : '', b === 'elite' ? Na.elite : '', A2[d]]
        .filter(Boolean)
        .join(' '),
      style: me,
      children: [
        r.jsxs('div', {
          className: Na.header,
          children: [
            r.jsx(G, { variant: 'label', color: 'mid', children: c }),
            r.jsxs('div', {
              className: Na.headerRight,
              children: [
                b === 'normal' &&
                  m !== void 0 &&
                  r.jsxs(G, { variant: 'numeric-s', color: 'dim', children: ['T', m] }),
                (b === 'elite' || b === 'boss') &&
                  r.jsx(Xi, { text: b.toUpperCase(), variant: b, glow: b === 'boss' }),
              ],
            }),
          ],
        }),
        r.jsx(_s, { value: U, max: 1e3, color: F, size: I, glow: H }),
        h &&
          r.jsx('div', {
            className: Na.hpText,
            children: r.jsxs(G, {
              variant: 'numeric-s',
              color: H ? 'danger' : 'mid',
              children: [C.toDisplay(), ' / ', O.toDisplay()],
            }),
          }),
      ],
    })
  );
}
const z2 = [
  { id: 'p1', x: 30, y: 22, kind: 'normal' },
  { id: 'p2', x: 65, y: 18, kind: 'normal' },
  { id: 'p3', x: 50, y: 30, kind: 'elite' },
  { id: 'p4', x: 78, y: 38, kind: 'normal' },
  { id: 'p5', x: 22, y: 50, kind: 'normal' },
  { id: 'p6', x: 60, y: 72, kind: 'boss' },
];
function E2(c) {
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
function M2(c) {
  return c !== 'normal';
}
function C2(c) {
  return c === 'boss' ? 'boss' : c === 'elite' || c === 'miniboss' ? 'elite' : 'normal';
}
function O2(c) {
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
function Yh(c) {
  switch (c) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}
function w2({
  enemies: c,
  machinePosition: s = { x: 50, y: 50 },
  damageEvents: u,
  hitEvents: o,
  deathEvents: m,
  onDamageDone: d,
  onHitDone: h,
  onDeathDone: y,
  range: g,
  dummyPins: p = z2,
}) {
  const b = s.x,
    T = s.y,
    E = g * 2;
  return r.jsxs('div', {
    className: el.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: [
      r.jsx('div', {
        className: el.rangeCircle,
        style: { left: `${b}%`, top: `${T}%`, width: `${E}%` },
        'aria-hidden': !0,
      }),
      p.map((C) =>
        r.jsx(
          'div',
          {
            className: el.pin,
            style: { left: `${C.x}%`, top: `${C.y}%`, color: Yh(C.kind) },
            'aria-hidden': !0,
            children: r.jsx(Ee, {
              name: 'target',
              size: C.kind === 'boss' ? 18 : C.kind === 'elite' ? 16 : 14,
              color: Yh(C.kind),
            }),
          },
          C.id
        )
      ),
      c.map((C) => {
        const O = M2(C.kind),
          U = O2(C.kind),
          H = C.kind === 'boss' ? 32 : C.kind === 'miniboss' ? 28 : 22;
        return r.jsxs(
          'div',
          {
            className: [el.enemy, O ? el.enemyUpper : ''].filter(Boolean).join(' '),
            style: { left: `${C.position.x}%`, top: `${C.position.y}%` },
            'aria-label': `${C.kind}`,
            children: [
              r.jsx(Ee, { name: E2(C.kind), size: H, color: U }),
              O &&
                r.jsx('div', {
                  className: el.enemyHpBar,
                  children: r.jsx(N2, {
                    name: C.kind,
                    variant: C2(C.kind),
                    current: C.hp,
                    max: C.hp,
                    size: C.kind === 'boss' ? 'lg' : 'sm',
                    showValue: !1,
                  }),
                }),
            ],
          },
          C.id
        );
      }),
      r.jsxs('div', {
        className: el.machine,
        style: { left: `${b}%`, top: `${T}%` },
        'aria-label': 'マシン',
        children: [
          r.jsx('span', { className: el.machineRingOuter, 'aria-hidden': !0 }),
          r.jsx(Ee, { name: 'tower', size: 22, color: 'var(--c-primary)' }),
        ],
      }),
      u.map((C) =>
        r.jsx(
          J_,
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
      o.map((C) =>
        r.jsx(t2, { x: C.x, y: C.y, onDone: () => (h == null ? void 0 : h(C.id)) }, C.id)
      ),
      m.map((C) =>
        r.jsx(I_, { x: C.x, y: C.y, onDone: () => (y == null ? void 0 : y(C.id)) }, C.id)
      ),
    ],
  });
}
const R2 = '_root_1oybt_2',
  D2 = '_topRow_1oybt_13',
  B2 = '_weaponSlots_1oybt_21',
  L2 = '_activeArea_1oybt_29',
  q2 = '_activeButton_1oybt_37',
  H2 = '_activeDisabled_1oybt_57',
  U2 = '_modeToggle_1oybt_66',
  G2 = '_modeToggleOn_1oybt_89',
  V2 = '_sheetToggleButton_1oybt_96',
  $2 = '_bottomRow_1oybt_108',
  Y2 = '_currencyArea_1oybt_114',
  k2 = '_speedArea_1oybt_119',
  Z2 = '_sysButtons_1oybt_126',
  Mt = {
    root: R2,
    topRow: D2,
    weaponSlots: B2,
    activeArea: L2,
    activeButton: q2,
    activeDisabled: H2,
    modeToggle: U2,
    modeToggleOn: G2,
    sheetToggleButton: V2,
    bottomRow: $2,
    currencyArea: Y2,
    speedArea: k2,
    sysButtons: Z2,
  },
  X2 = '_root_x9cjr_1',
  Q2 = '_svg_x9cjr_9',
  K2 = '_track_x9cjr_15',
  J2 = '_arc_x9cjr_19',
  W2 = '_center_x9cjr_28',
  F2 = '_labelText_x9cjr_37',
  zn = { root: X2, svg: Q2, track: K2, arc: J2, center: W2, labelText: F2 },
  I2 = { xs: 20, sm: 32, md: 48, lg: 64 },
  P2 = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  eb = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function _1({
  value: c,
  max: s,
  size: u = 24,
  color: o = 'primary',
  thickness: m = 3,
  glow: d = !1,
  showLabel: h = !1,
  withLabel: y = !1,
  label: g,
  children: p,
}) {
  const b = typeof u == 'number' ? u : I2[u],
    T =
      s != null
        ? Math.min(Math.max(0, c), Math.max(1, s)) / Math.max(1, s)
        : Math.min(Math.max(0, c), 100) / 100,
    E = s != null ? Math.min(Math.max(0, c), Math.max(1, s)) : c,
    C = s != null ? Math.max(1, s) : 100,
    O = P2[o],
    U = d ? eb[o] : void 0,
    H = b / 2,
    F = H - m / 2,
    I = 2 * Math.PI * F,
    me = I * (1 - T),
    lt = h || y || p != null,
    Be = g ?? `${Math.round(T * 100)}%`;
  return r.jsxs('span', {
    className: zn.root,
    style: { width: b, height: b },
    children: [
      r.jsxs('svg', {
        className: zn.svg,
        width: b,
        height: b,
        viewBox: `0 0 ${b} ${b}`,
        xmlns: 'http://www.w3.org/2000/svg',
        role: 'progressbar',
        'aria-valuenow': E,
        'aria-valuemin': 0,
        'aria-valuemax': C,
        'aria-label': g ?? `${E} / ${C}`,
        children: [
          r.jsx('circle', {
            className: zn.track,
            cx: H,
            cy: H,
            r: F,
            fill: 'none',
            strokeWidth: m,
          }),
          r.jsx('circle', {
            className: zn.arc,
            cx: H,
            cy: H,
            r: F,
            fill: 'none',
            stroke: O,
            strokeWidth: m,
            strokeLinecap: 'round',
            strokeDasharray: I,
            strokeDashoffset: me,
            style: U != null ? { filter: `drop-shadow(0 0 4px ${O})` } : void 0,
            transform: `rotate(-90 ${H} ${H})`,
          }),
        ],
      }),
      lt &&
        r.jsx('span', {
          className: zn.center,
          children:
            p ?? r.jsx('span', { className: zn.labelText, style: { color: O }, children: Be }),
        }),
    ],
  });
}
const tb = '_root_8pbri_1',
  ab = '_disabled_8pbri_8',
  lb = '_segment_8pbri_13',
  nb = '_selected_8pbri_27',
  ib = '_unselected_8pbri_33',
  En = {
    root: tb,
    disabled: ab,
    segment: lb,
    selected: nb,
    unselected: ib,
    'size-sm': '_size-sm_8pbri_42',
    'size-md': '_size-md_8pbri_47',
  },
  b1 = ({ options: c, value: s, onChange: u, size: o = 'md', disabled: m = !1 }) =>
    r.jsx('div', {
      className: [En.root, En[`size-${o}`], m ? En.disabled : ''].join(' '),
      role: 'group',
      children: c.map((d) => {
        const h = d.value === s;
        return r.jsx(
          'button',
          {
            type: 'button',
            role: 'radio',
            'aria-checked': h,
            className: [En.segment, h ? En.selected : En.unselected].join(' '),
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
  cb = '_root_afe45_2',
  sb = '_swapDisabled_afe45_14',
  ub = '_active_afe45_20',
  ob = '_onCd_afe45_27',
  rb = '_iconWrap_afe45_27',
  fb = '_cdOverlay_afe45_47',
  db = '_cdProgress_afe45_57',
  mb = '_swapOverlay_afe45_68',
  al = {
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
function yb({
  weapon: c,
  active: s = !1,
  ready: u = !1,
  cdProgress: o = 100,
  swapDisabled: m = !1,
  size: d = 'md',
  onClick: h,
}) {
  const y = hb[d],
    g = vb[d],
    p = o < 100,
    b = [al.root, s ? al.active : '', p ? al.onCd : '', m ? al.swapDisabled : '']
      .filter(Boolean)
      .join(' ');
  return r.jsxs('button', {
    type: 'button',
    className: b,
    style: { width: y, height: y, minWidth: y, minHeight: y },
    onClick: m ? void 0 : h,
    disabled: m && h == null,
    'aria-label': `${c} weapon slot${s ? ' (active)' : ''}${p ? ` (cooldown ${o}%)` : u ? ' (ready)' : ''}`,
    'aria-pressed': s,
    children: [
      r.jsx('span', {
        className: al.iconWrap,
        children: r.jsx(Ee, {
          name: c,
          size: g,
          color: s ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      p &&
        r.jsxs(r.Fragment, {
          children: [
            r.jsx('span', { className: al.cdOverlay, 'aria-hidden': 'true' }),
            r.jsx('span', {
              className: al.cdProgress,
              'aria-hidden': 'true',
              children: r.jsx(_1, {
                value: o,
                max: 100,
                size: y - 4,
                color: 'cd',
                thickness: d === 'sm' ? 2 : 3,
              }),
            }),
          ],
        }),
      m && r.jsx('span', { className: al.swapOverlay, 'aria-hidden': 'true' }),
    ],
  });
}
const kh = ['laser', 'cannon', 'thunder', 'cutter'],
  gb = [
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
  onActivate: y,
  onToggleAuto: g,
  gameSpeed: p,
  onSpeedChange: b,
  isPaused: T,
  onTogglePause: E,
  onOpenMenu: C,
  onOpenScreenSaver: O,
  isWorkshopOpen: U = !1,
  onToggleWorkshop: H,
}) {
  const F = o > 0,
    I = d || F,
    me = kh.some((be) => be !== s && (u[be] ?? 100) < 100);
  return r.jsxs('div', {
    className: Mt.root,
    children: [
      H != null &&
        r.jsx('button', {
          type: 'button',
          className: Mt.sheetToggleButton,
          onClick: H,
          'aria-expanded': U,
          'aria-label': U ? 'アップグレードを閉じる' : 'アップグレードを開く',
          children: r.jsx(Xi, { text: 'アップグレード', variant: 'info', size: 'md', glow: !0 }),
        }),
      r.jsxs('div', {
        className: Mt.topRow,
        children: [
          r.jsx('div', {
            className: Mt.weaponSlots,
            children: kh.map((be) =>
              r.jsx(
                yb,
                {
                  weapon: be,
                  active: be === s,
                  cdProgress: u[be] ?? 100,
                  swapDisabled: me && be !== s,
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
            className: Mt.activeArea,
            children: [
              r.jsx('button', {
                type: 'button',
                className: [Mt.activeButton, I ? Mt.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: I ? void 0 : y,
                disabled: I,
                'aria-label': `アクティブスキル発動${F ? ' (クールダウン中)' : d ? ' (自動モード)' : ''}`,
                children: r.jsx(_1, {
                  value: F ? o : m,
                  max: m > 0 ? m : 1,
                  size: 64,
                  color: F ? 'cd' : 'primary',
                  glow: !F && !d,
                  thickness: 4,
                  children: r.jsx(Ee, {
                    name: 'lightning',
                    size: 26,
                    color: I ? 'var(--c-text-disabled)' : 'var(--c-secondary)',
                  }),
                }),
              }),
              r.jsx('button', {
                type: 'button',
                className: [Mt.modeToggle, d ? Mt.modeToggleOn : ''].filter(Boolean).join(' '),
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
      r.jsxs('div', {
        className: Mt.bottomRow,
        children: [
          r.jsx('div', {
            className: Mt.currencyArea,
            children: r.jsx(Ln, { currency: 'screw', value: c, size: 'lg' }),
          }),
          r.jsx('div', {
            className: Mt.speedArea,
            children: r.jsx(b1, { options: gb, value: p, onChange: b, size: 'sm' }),
          }),
          r.jsxs('div', {
            className: Mt.sysButtons,
            children: [
              r.jsx(Vi, {
                icon: T ? 'play' : 'pause',
                label: T ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: T,
                onClick: E,
              }),
              r.jsx(Vi, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: C,
              }),
              r.jsx(Vi, {
                icon: 'ice',
                label: 'スクリーンセーバーを起動',
                size: 'md',
                variant: 'ghost',
                onClick: O,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const _b = '_root_1mk5i_3',
  bb = '_hpDivider_1mk5i_30',
  Sb = '_srOnly_1mk5i_42',
  Mn = { root: _b, hpDivider: bb, srOnly: Sb },
  xb = '_root_nxl33_2',
  jb = '_boss_nxl33_14',
  Tb = '_header_nxl33_20',
  Ab = '_waveLabel_nxl33_26',
  Nb = '_waveNum_nxl33_35',
  zb = '_milestone_nxl33_41',
  Eb = '_milestoneText_nxl33_48',
  Mb = '_seconds_nxl33_58',
  ja = {
    root: xb,
    boss: jb,
    header: Tb,
    waveLabel: Ab,
    waveNum: Nb,
    milestone: zb,
    milestoneText: Eb,
    seconds: Mb,
    'size-sm': '_size-sm_nxl33_64',
    'size-md': '_size-md_nxl33_72',
    'size-lg': '_size-lg_nxl33_76',
  },
  Cb = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  },
  Ob = { sm: 'var(--fs-label)', md: 'var(--fs-caption)', lg: 'var(--fs-body)' };
function wb({
  waveNumber: c,
  secondsLeft: s,
  secondsMax: u,
  nextMilestone: o,
  showSeconds: m = !0,
  size: d = 'md',
}) {
  const h = (o == null ? void 0 : o.kind) === 'boss',
    y = o != null ? Cb[o.kind] : null;
  return r.jsxs('div', {
    className: [ja.root, ja[`size-${d}`], h ? ja.boss : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: ja.header,
        children: [
          r.jsxs('span', {
            className: ja.waveLabel,
            style: { fontSize: Ob[d] },
            children: ['WAVE ', r.jsx('span', { className: ja.waveNum, children: c })],
          }),
          y != null &&
            o != null &&
            r.jsxs('span', {
              className: ja.milestone,
              style: { color: y.color },
              children: [
                r.jsx(Ee, { name: y.iconName, size: 12, color: y.color }),
                r.jsxs('span', { className: ja.milestoneText, children: [y.label, ' @', o.wave] }),
              ],
            }),
          m &&
            r.jsx('span', {
              className: ja.seconds,
              children: r.jsxs(G, { variant: 'numeric-s', color: 'mid', children: [s, 's'] }),
            }),
        ],
      }),
      r.jsx(_s, {
        value: s,
        max: Math.max(1, u),
        color: h ? 'secondary' : 'wave',
        size: d === 'lg' ? 'md' : 'sm',
        glow: h,
      }),
    ],
  });
}
function Rb({
  hpCurrent: c,
  hpMax: s,
  shieldCurrent: u,
  shieldMax: o,
  tier: m,
  wave: d,
  totalWaves: h,
  secondsRemaining: y,
  secondsTotal: g,
  isBossWave: p = !1,
  nextMilestone: b,
  damaging: T = !1,
}) {
  const E = b ?? (p ? { wave: d, kind: 'boss' } : void 0),
    C = u != null && o != null,
    O = Zh(c, s),
    U = C ? Zh(u, o) : 0;
  return r.jsxs('div', {
    className: Mn.root,
    role: 'group',
    'aria-label': 'バトル状態',
    children: [
      r.jsxs('div', {
        className: Mn.headerRow,
        children: [
          r.jsx(Xi, { variant: 'tier', tier: m, size: 'md', glow: !0 }),
          r.jsx(G, { variant: 'label', color: 'dim', style: { fontSize: 10 }, children: 'HP' }),
          r.jsxs('span', {
            className: Mn.hpValue,
            'aria-label': `HP ${c.toDisplay()} / ${s.toDisplay()}`,
            children: [
              r.jsx(sl, {
                value: c,
                size: 'sm',
                accentColor: T ? 'danger' : 'text',
                glow: T,
                style: { fontSize: 14 },
              }),
              r.jsx('span', { className: Mn.hpDivider, children: '/' }),
              r.jsx(sl, { value: s, size: 'sm', accentColor: 'dim', style: { fontSize: 11 } }),
            ],
          }),
          C &&
            r.jsxs('span', {
              className: Mn.shieldBlock,
              children: [
                r.jsx(G, {
                  variant: 'label',
                  color: 'primary',
                  style: { fontSize: 9.5 },
                  children: 'SHLD',
                }),
                r.jsx(sl, {
                  value: u,
                  size: 'sm',
                  accentColor: 'primary',
                  style: { fontSize: 11 },
                }),
              ],
            }),
        ],
      }),
      r.jsx(_s, { value: O, max: 100, color: O <= 30 ? 'hp-low' : 'hp', size: 'md' }),
      C && r.jsx(_s, { value: U, max: 100, color: 'shield', size: 'sm' }),
      r.jsx(wb, {
        waveNumber: d,
        secondsLeft: y,
        secondsMax: g,
        nextMilestone: E,
        showSeconds: !1,
        size: 'sm',
      }),
      r.jsxs('span', { className: Mn.srOnly, 'aria-hidden': 'false', children: [d, '/', h] }),
    ],
  });
}
function Zh(c, s) {
  const u = parseFloat(c.toString()),
    o = parseFloat(s.toString());
  return o === 0 ? 0 : Math.max(0, Math.min(100, (u / o) * 100));
}
const Db = '_card_1o3jz_1',
  Bb = '_header_1o3jz_8',
  Lb = '_soundSection_1o3jz_13',
  qb = '_sliderRow_1o3jz_19',
  Hb = '_sliderLabel_1o3jz_26',
  Ub = '_sliderValue_1o3jz_31',
  Gb = '_divider_1o3jz_38',
  Vb = '_actions_1o3jz_44',
  Wt = {
    card: Db,
    header: Bb,
    soundSection: Lb,
    sliderRow: qb,
    sliderLabel: Hb,
    sliderValue: Ub,
    divider: Gb,
    actions: Vb,
  },
  $b = '_button_10kfo_1',
  Yb = '_fullWidth_10kfo_109',
  kb = '_iconLeft_10kfo_113',
  Zb = '_iconRight_10kfo_114',
  Xb = '_label_10kfo_120',
  Ml = {
    button: $b,
    'variant-primary': '_variant-primary_10kfo_28',
    'variant-secondary': '_variant-secondary_10kfo_42',
    'variant-danger': '_variant-danger_10kfo_56',
    'variant-ghost': '_variant-ghost_10kfo_70',
    'size-sm': '_size-sm_10kfo_85',
    'size-md': '_size-md_10kfo_93',
    'size-lg': '_size-lg_10kfo_101',
    fullWidth: Yb,
    iconLeft: kb,
    iconRight: Zb,
    label: Xb,
  };
function Ct({
  label: c,
  variant: s = 'primary',
  size: u = 'md',
  fullWidth: o = !1,
  iconLeft: m,
  iconRight: d,
  disabled: h = !1,
  onClick: y,
  type: g = 'button',
}) {
  return r.jsxs('button', {
    type: g,
    className: [Ml.button, Ml[`variant-${s}`], Ml[`size-${u}`], o ? Ml.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: y,
    'aria-disabled': h,
    children: [
      m != null && r.jsx('span', { className: Ml.iconLeft, 'aria-hidden': 'true', children: m }),
      r.jsx('span', { className: Ml.label, children: c }),
      d != null && r.jsx('span', { className: Ml.iconRight, 'aria-hidden': 'true', children: d }),
    ],
  });
}
const Qb = '_overlay_1i1z1_12',
  Kb = '_fullscreen_1i1z1_21',
  Jb = '_absolute_1i1z1_27',
  Wb = '_alignCenter_1i1z1_33',
  Fb = '_alignTop_1i1z1_38',
  Ib = '_alignBottom_1i1z1_44',
  Pb = '_content_1i1z1_50',
  Rl = {
    overlay: Qb,
    fullscreen: Kb,
    absolute: Jb,
    alignCenter: Wb,
    alignTop: Fb,
    alignBottom: Ib,
    content: Pb,
  },
  eS = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Xh = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  tS = { center: Rl.alignCenter, top: Rl.alignTop, bottom: Rl.alignBottom };
function vr({
  fullscreen: c = !0,
  children: s,
  onClose: u,
  dismissible: o = !0,
  dimLevel: m = 'normal',
  blur: d = 0,
  align: h = 'center',
  zIndex: y = 'overlay',
  style: g,
  open: p,
}) {
  const b = () => {
      o && u && u();
    },
    T = (U) => {
      U.stopPropagation();
    },
    E = eS[m],
    C = typeof y == 'number' ? y : (Xh[y] ?? Xh.overlay),
    O = {
      background: `rgba(2, 4, 10, ${E})`,
      zIndex: C,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...g,
    };
  return r.jsx('div', {
    className: [Rl.overlay, c ? Rl.fullscreen : Rl.absolute, tS[h]].join(' '),
    style: O,
    onClick: b,
    role: 'presentation',
    'aria-modal': 'true',
    children: r.jsx('div', { className: Rl.content, onClick: T, children: s }),
  });
}
const aS = '_wrapper_131tr_1',
  lS = '_disabled_131tr_5',
  nS = '_input_131tr_18',
  ms = {
    wrapper: aS,
    disabled: lS,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: nS,
  },
  nr = ({
    value: c,
    min: s = 0,
    max: u = 1,
    step: o = 0.01,
    onChange: m,
    color: d = 'primary',
    disabled: h = !1,
  }) => {
    const y = u === s ? 0 : ((c - s) / (u - s)) * 100,
      g = (b) => {
        h || m(parseFloat(b.target.value));
      },
      p = { '--slider-fill-pct': `${y}%` };
    return r.jsx('div', {
      className: [ms.wrapper, ms[`color-${d}`], h ? ms.disabled : ''].join(' '),
      style: p,
      children: r.jsx('input', {
        type: 'range',
        className: ms.input,
        min: s,
        max: u,
        step: o,
        value: c,
        onChange: g,
        disabled: h,
        'aria-valuenow': c,
        'aria-valuemin': s,
        'aria-valuemax': u,
      }),
    });
  },
  iS = '_dialog_49iek_13',
  cS = '_card_49iek_20',
  sS = '_titleRow_49iek_27',
  uS = '_titleIcon_49iek_33',
  oS = '_title_49iek_27',
  rS = '_message_49iek_46',
  fS = '_actions_49iek_50',
  dS = '_variantDanger_49iek_57',
  ll = {
    dialog: iS,
    card: cS,
    titleRow: sS,
    titleIcon: uS,
    title: oS,
    message: rS,
    actions: fS,
    variantDanger: dS,
  };
function S1({
  open: c,
  title: s,
  message: u,
  iconName: o,
  confirmLabel: m = '確定',
  cancelLabel: d = 'キャンセル',
  onConfirm: h,
  onCancel: y,
  variant: g = 'default',
}) {
  return c
    ? r.jsx(vr, {
        open: c,
        onClose: y,
        dismissible: !0,
        children: r.jsx('div', {
          className: [ll.dialog, g === 'danger' ? ll.variantDanger : ''].filter(Boolean).join(' '),
          children: r.jsxs(Ll, {
            variant: 'elevated',
            padding: 'lg',
            className: ll.card,
            children: [
              r.jsxs('div', {
                className: ll.titleRow,
                children: [
                  o != null &&
                    r.jsx('span', {
                      className: ll.titleIcon,
                      'aria-hidden': 'true',
                      children: r.jsx(Ee, {
                        name: o,
                        size: 20,
                        color: g === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  r.jsx(G, { variant: 'heading-3', as: 'h2', className: ll.title, children: s }),
                ],
              }),
              u != null &&
                u.length > 0 &&
                r.jsx(G, { variant: 'body', color: 'mid', className: ll.message, children: u }),
              r.jsxs('div', {
                className: ll.actions,
                children: [
                  r.jsx(Ct, { label: d, variant: 'ghost', fullWidth: !0, onClick: y }),
                  r.jsx(Ct, {
                    label: m,
                    variant: g === 'danger' ? 'danger' : 'primary',
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
function mS({
  open: c,
  bgmVolume: s,
  seVolume: u,
  onBgmChange: o,
  onSeChange: m,
  onRetreat: d,
  onClose: h,
}) {
  const [y, g] = de.useState(!1);
  if (!c) return null;
  const p = () => {
      g(!0);
    },
    b = () => {
      (g(!1), d());
    },
    T = () => {
      g(!1);
    };
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx(vr, {
        open: c,
        onClose: h,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !y,
        children: r.jsxs(Ll, {
          variant: 'elevated',
          padding: 'lg',
          className: Wt.card,
          children: [
            r.jsx('div', {
              className: Wt.header,
              children: r.jsx(G, {
                variant: 'heading-2',
                as: 'h2',
                align: 'center',
                children: 'メニュー',
              }),
            }),
            r.jsxs('div', {
              className: Wt.soundSection,
              children: [
                r.jsxs('div', {
                  className: Wt.sliderRow,
                  children: [
                    r.jsx(G, {
                      variant: 'label',
                      color: 'mid',
                      className: Wt.sliderLabel,
                      children: 'BGM',
                    }),
                    r.jsx(G, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: Wt.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(nr, { value: s, min: 0, max: 1, step: 0.01, onChange: o, color: 'primary' }),
                r.jsxs('div', {
                  className: Wt.sliderRow,
                  children: [
                    r.jsx(G, {
                      variant: 'label',
                      color: 'mid',
                      className: Wt.sliderLabel,
                      children: 'SE',
                    }),
                    r.jsx(G, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: Wt.sliderValue,
                      children: Math.round(u * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(nr, { value: u, min: 0, max: 1, step: 0.01, onChange: m, color: 'primary' }),
              ],
            }),
            r.jsx('div', { className: Wt.divider, role: 'separator' }),
            r.jsxs('div', {
              className: Wt.actions,
              children: [
                r.jsx(Ct, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: p }),
                r.jsx(Ct, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: h }),
              ],
            }),
          ],
        }),
      }),
      r.jsx(S1, {
        open: y,
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
const hS = '_card_1fzt0_2',
  vS = '_header_1fzt0_14',
  yS = '_statusText_1fzt0_19',
  gS = '_section_1fzt0_23',
  pS = '_sectionTitle_1fzt0_29',
  _S = '_statsGrid_1fzt0_35',
  bS = '_statItem_1fzt0_41',
  SS = '_rewardList_1fzt0_52',
  xS = '_rewardCurrency_1fzt0_58',
  jS = '_patchList_1fzt0_66',
  TS = '_patchItem_1fzt0_72',
  AS = '_actions_1fzt0_87',
  Je = {
    card: hS,
    header: vS,
    statusText: yS,
    section: gS,
    sectionTitle: pS,
    statsGrid: _S,
    statItem: bS,
    rewardList: SS,
    rewardCurrency: xS,
    patchList: jS,
    patchItem: TS,
    actions: AS,
  },
  NS = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  zS = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function ES(c) {
  const s = Math.floor(c / 60),
    u = Math.floor(c % 60);
  return `${s.toString().padStart(2, '0')}:${u.toString().padStart(2, '0')}`;
}
function MS({
  open: c,
  status: s,
  reachedTier: u,
  reachedWave: o,
  killed: m,
  elapsedSec: d,
  reward: h,
  onClose: y,
}) {
  if (!c) return null;
  const g = NS[s],
    p = zS[s];
  return r.jsx(vr, {
    open: c,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: r.jsxs(Ll, {
      variant: 'elevated',
      padding: 'lg',
      className: Je.card,
      children: [
        r.jsx('div', {
          className: Je.header,
          children: r.jsx(G, {
            variant: 'heading-1',
            as: 'h2',
            color: p,
            align: 'center',
            className: Je.statusText,
            children: g,
          }),
        }),
        r.jsxs('div', {
          className: Je.section,
          children: [
            r.jsx(G, {
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
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: u.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Je.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: o.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Je.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: m.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Je.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: ES(d) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        r.jsxs('div', {
          className: Je.section,
          children: [
            r.jsx(G, {
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
                  children: r.jsx(Ln, { currency: 'bolt', value: h.bolt, size: 'lg' }),
                }),
                r.jsx('div', {
                  className: Je.rewardCurrency,
                  children: r.jsx(Ln, { currency: 'alloy', value: h.alloy, size: 'lg' }),
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
                            r.jsx(G, { variant: 'body', truncate: !0, children: b.name }),
                            r.jsxs(G, {
                              variant: 'caption',
                              color: 'mid',
                              children: ['Tier ', b.tier.toString()],
                            }),
                            r.jsxs(G, {
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
                  r.jsx(G, { variant: 'caption', color: 'dim', children: 'パッチドロップなし' }),
              ],
            }),
          ],
        }),
        r.jsx('div', {
          className: Je.actions,
          children: r.jsx(Ct, {
            label: '出撃準備へ',
            variant: 'primary',
            fullWidth: !0,
            onClick: y,
          }),
        }),
      ],
    }),
  });
}
const CS = [
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
function OS(c, s, u) {
  let o = 0;
  for (let m = 0; m < u; m++) o += yr(c, s + m);
  return o;
}
function wS(c, s, u) {
  let o = Ne.ZERO,
    m = 0;
  for (;;) {
    const d = Ne.fromNumber(yr(c, s + m)),
      h = o.add(d);
    if (h.gt(u) || ((o = h), m++, m >= 1e4)) break;
  }
  return { lvDelta: m, totalCost: o };
}
const RS = '_inner_1ld24_2',
  DS = '_grid_1ld24_7',
  Li = { inner: RS, grid: DS };
function BS({ open: c, screw: s, levels: u, onUpgrade: o, onClose: m }) {
  return c
    ? r.jsx('section', {
        className: Li.root,
        role: 'dialog',
        'aria-modal': 'false',
        'aria-label': 'ラン中ワークショップ',
        children: r.jsxs('div', {
          className: Li.inner,
          children: [
            r.jsxs('div', {
              className: Li.header,
              children: [
                r.jsxs('div', {
                  className: Li.headerText,
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
                r.jsx(Ln, { currency: 'screw', value: s, size: 'md' }),
                m != null &&
                  r.jsx(Vi, {
                    icon: 'chevron-down',
                    label: '閉じる',
                    variant: 'ghost',
                    size: 'sm',
                    onClick: m,
                  }),
              ],
            }),
            r.jsx('div', {
              className: Li.grid,
              children: CS.map((d) => {
                const h = u[d.key],
                  y = Qh(h),
                  g = Qh(h + 1),
                  p = yr(d, h),
                  b = OS(d, h, 5),
                  { totalCost: T, lvDelta: E } = wS(d, h, s),
                  C = Ne.fromNumber(p),
                  O = Ne.fromNumber(b),
                  U = s.gte(C),
                  H = s.gte(O),
                  F = E > 0;
                return r.jsx(
                  mr,
                  {
                    title: d.title,
                    iconName: d.iconName,
                    currentLabel: `Lv ${h}`,
                    before: Math.round(y * 10) / 10,
                    after: Math.round(g * 10) / 10,
                    beforeSuffix: '×',
                    currency: 'screw',
                    accent: 'warning',
                    options: [
                      { amount: '+1', cost: C, disabled: !U },
                      { amount: '+5', cost: O, disabled: !H },
                      { amount: 'MAX', cost: T, disabled: !F },
                    ],
                    onUpgrade: (I) => {
                      I === '+1'
                        ? o(d.key, 1)
                        : I === '+5'
                          ? o(d.key, 5)
                          : I === 'MAX' && o(d.key, 'max');
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
const LS = '_root_9fvdn_2',
  qS = { root: LS },
  Fo = [
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
function HS({ items: c = [], showTower: s = !1, towerContent: u = null, cycleSeconds: o = 24 }) {
  const d = `ssfx-${de.useId().replace(/:/g, '')}`,
    h = Fo.map((T, E) => {
      const C = 100 / T.length,
        O = T.map(([U, H], F) => {
          const I = F * C;
          return `
          ${I}%               { left: ${U}%; top: ${H}%; opacity: 0; }
          ${(I + 3).toFixed(2)}%   { left: ${U}%; top: ${H}%; opacity: 1; }
          ${(I + C - 7).toFixed(2)}%  { left: ${U}%; top: ${H}%; opacity: 1; }
          ${(I + C - 3).toFixed(2)}%  { left: ${U}%; top: ${H}%; opacity: 0; }
        `;
        }).join('');
      return `@keyframes ${d}-drift-${E + 1} { ${O} 100% { opacity: 0; } }`;
    }).join(`
`),
    y = Fo.map(
      (T, E) => `.${d}-p${E + 1} { animation: ${d}-drift-${E + 1} ${o}s linear infinite; }`
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
    ${y}
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
    p = r.jsxs('div', {
      className: `${d}-tower`,
      children: [
        r.jsx('div', { className: `${d}-tower-r1` }),
        r.jsx('div', { className: `${d}-tower-r2` }),
        r.jsx('div', { className: `${d}-tower-core`, children: u }),
      ],
    }),
    b = s ? [p, ...c] : [...c];
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
      r.jsx('style', { dangerouslySetInnerHTML: { __html: g } }),
      b.map((T, E) => {
        const C = (E % Fo.length) + 1,
          O = -(E * (o / Math.max(b.length, 1)));
        return r.jsx(
          'div',
          {
            className: `${d}-slot ${d}-p${C}${E === 0 ? ` ${d}-rm-show` : ''}`,
            style: { animationDelay: `${O}s` },
            children: T,
          },
          E
        );
      }),
    ],
  });
}
function US({ open: c, onClose: s }) {
  return c
    ? r.jsx('div', {
        className: qS.root,
        onClick: s,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (u) => {
          (u.key === 'Enter' || u.key === ' ') && s();
        },
        children: r.jsx(HS, {
          showTower: !0,
          towerContent: r.jsx(Ee, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
const GS = 30,
  VS = 30,
  $S = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 };
function YS(c, s) {
  return c && s <= 0 ? 'gameover' : null;
}
function kS() {
  const { navigate: c } = ul(),
    s = X((ee) => ee.isRunActive),
    u = X((ee) => ee.screw),
    o = X((ee) => ee.machineHp),
    m = X((ee) => ee.machineMaxHp),
    d = X((ee) => ee.currentTier),
    h = X((ee) => ee.currentWave),
    y = X((ee) => ee.currentWeapon),
    g = X((ee) => ee.activeCdSec),
    p = X((ee) => ee.isAutoActive),
    b = X((ee) => ee.gameSpeed),
    T = X((ee) => ee.bgmVolume),
    E = X((ee) => ee.seVolume),
    C = X((ee) => ee.setBgmVolume),
    O = X((ee) => ee.setSeVolume),
    U = X((ee) => ee.setAutoActive),
    H = X((ee) => ee.switchWeapon),
    [F, I] = de.useState(!1),
    [me, be] = de.useState(!1),
    [lt, Be] = de.useState(!1),
    [ne, Ze] = de.useState(!1),
    [rt, ut] = de.useState(b),
    [Le, Xe] = de.useState($S),
    [kt] = de.useState([]),
    [Ot] = de.useState([]),
    [nt] = de.useState([]),
    R = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    V = YS(s, o),
    [W, pe] = de.useState(null),
    _e = W ?? V,
    x = _e !== null,
    q = Ne.fromNumber(o),
    $ = Ne.fromNumber(m > 0 ? m : 1),
    k = (ee) => {
      ut(ee);
    },
    P = () => {
      Ze((ee) => !ee);
    },
    ie = () => {
      be(!0);
    },
    he = () => {
      Be(!0);
    },
    We = () => {
      (be(!1), pe('retreat'));
    },
    we = () => {
      c('preparation');
    },
    ol = (ee, Ul) => {
      Xe((Ki) => ({ ...Ki, [ee]: Ki[ee] + (Ul === 'max' ? 1 : Ul) }));
    },
    ql = { bolt: Ne.ZERO, alloy: Ne.ZERO, patches: [] },
    Hl = 30;
  return r.jsxs('div', {
    className: Vh.root,
    children: [
      r.jsx(Bl, {
        noScroll: !0,
        variant: 'battle',
        header: r.jsx(Rb, {
          hpCurrent: q,
          hpMax: $,
          tier: d,
          wave: h,
          totalWaves: Hl,
          secondsRemaining: 30,
          secondsTotal: 30,
          isBossWave: h === Hl,
        }),
        footer: r.jsxs(r.Fragment, {
          children: [
            r.jsx(BS, {
              open: F,
              screw: u,
              levels: Le,
              onUpgrade: ol,
              onClose: () => {
                I(!1);
              },
            }),
            r.jsx(pb, {
              screw: u,
              equippedWeapon: y,
              weaponCds: R,
              activeCd: g,
              activeMax: GS,
              isAutoActive: p,
              onSwitchWeapon: H,
              onActivate: () => {},
              onToggleAuto: U,
              gameSpeed: rt,
              onSpeedChange: k,
              isPaused: ne,
              onTogglePause: P,
              onOpenMenu: ie,
              onOpenScreenSaver: he,
              isWorkshopOpen: F,
              onToggleWorkshop: () => {
                I((ee) => !ee);
              },
            }),
          ],
        }),
        children: r.jsx(w2, {
          enemies: [],
          damageEvents: kt,
          hitEvents: Ot,
          deathEvents: nt,
          range: VS,
        }),
      }),
      r.jsxs('div', {
        className: Vh.overlayLayer,
        'aria-live': 'polite',
        children: [
          r.jsx(mS, {
            open: me,
            bgmVolume: T,
            seVolume: E,
            onBgmChange: C,
            onSeChange: O,
            onRetreat: We,
            onClose: () => {
              be(!1);
            },
          }),
          x &&
            r.jsx(MS, {
              open: x,
              status: _e,
              reachedTier: d,
              reachedWave: h,
              killed: 0,
              elapsedSec: 0,
              reward: ql,
              onClose: we,
            }),
          r.jsx(US, {
            open: lt,
            onClose: () => {
              Be(!1);
            },
          }),
        ],
      }),
    ],
  });
}
const ZS = [
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
function gr(c, s) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, s));
}
function Io(c, s, u) {
  let o = 0;
  for (let m = 0; m < u && !(c.maxLv != null && s + m >= c.maxLv); m++) o += gr(c, s + m);
  return o;
}
function XS(c, s, u) {
  let o = 0,
    m = u,
    d = s;
  for (let h = 0; h < 1e4 && !(c.maxLv != null && d >= c.maxLv); h++) {
    const y = Ne.fromNumber(gr(c, d));
    if (m.lt(y)) break;
    ((m = m.sub(y)), (d += 1), (o += 1));
  }
  return o;
}
const QS = '_root_in43u_3',
  KS = { root: QS };
function JS() {
  const c = X((m) => m.machineLevels),
    s = X((m) => m.bolt),
    u = X((m) => m.incrementMachineLv),
    o = X((m) => m.spendBolt);
  return r.jsx('div', {
    className: KS.root,
    children: ZS.map((m) => {
      const d = c[m.key],
        h = m.maxLv != null && d >= m.maxLv,
        y = Kh(m, d),
        g = Kh(m, d + 1),
        p = (ut) => (m.unit === '%' ? Math.round(ut * 1e3) / 10 : ut),
        b = p(y),
        T = p(g),
        E = gr(m, d),
        C = Io(m, d, 5),
        O = Ne.fromNumber(E),
        U = Ne.fromNumber(C),
        H = XS(m, d, s),
        F = m.maxLv != null ? m.maxLv - d : Number.POSITIVE_INFINITY,
        I = Math.min(H, F),
        me = I > 0 ? Io(m, d, I) : E,
        be = Ne.fromNumber(me),
        lt = s.lt(O),
        Be = s.lt(U) || (m.maxLv != null && d + 5 > m.maxLv),
        ne = I < 1,
        Ze = h
          ? []
          : [
              { amount: '+1', cost: O, disabled: lt },
              { amount: '+5', cost: U, disabled: Be },
              { amount: 'MAX', cost: be, disabled: ne },
            ],
        rt = (ut) => {
          if (h) return;
          let Le = 0;
          if ((ut === '+1' ? (Le = 1) : ut === '+5' ? (Le = 5) : ut === 'MAX' && (Le = I), Le < 1))
            return;
          m.maxLv != null && (Le = Math.min(Le, m.maxLv - d));
          const Xe = Io(m, d, Le),
            kt = Ne.fromNumber(Xe);
          if (o(kt)) for (let nt = 0; nt < Le; nt++) u(m.key);
        };
      return r.jsx(
        mr,
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
function WS() {
  const { navigate: c } = ul(),
    s = (u) => {
      c(u);
    };
  return r.jsx(Bl, {
    header: r.jsx(Zi, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: r.jsx(ki, { active: 'machine', onChange: s }),
    children: r.jsx(JS, {}),
  });
}
const FS = () => r.jsx('div', { children: r.jsx('h1', { children: 'Not Found' }) }),
  IS = '_content_14xiq_1',
  PS = { content: IS },
  ex = '_root_1l9jp_1',
  tx = '_header_1l9jp_8',
  ax = '_headerTitleRow_1l9jp_15',
  lx = '_headerCount_1l9jp_21',
  nx = '_slotGrid_1l9jp_35',
  ix = '_emptyHint_1l9jp_41',
  Cn = { root: ex, header: tx, headerTitleRow: ax, headerCount: lx, slotGrid: nx, emptyHint: ix },
  cx = '_wrapper_16mrg_3',
  sx = '_filled_16mrg_16',
  ux = '_empty_16mrg_25',
  ox = '_locked_16mrg_26',
  rx = '_slotInner_16mrg_59',
  fx = '_emptyIcon_16mrg_67',
  dx = '_emptyLabel_16mrg_74',
  nl = {
    wrapper: cx,
    filled: sx,
    empty: ux,
    locked: ox,
    slotInner: rx,
    emptyIcon: fx,
    emptyLabel: dx,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  },
  mx = '_root_12m2l_3',
  hx = '_selected_12m2l_15',
  vx = '_merging_12m2l_19',
  yx = '_locked_12m2l_23',
  gx = '_disabled_12m2l_28',
  px = '_card_12m2l_34',
  _x = '_tierBadge_12m2l_46',
  bx = '_count_12m2l_54',
  Sx = '_countZero_12m2l_74',
  xx = '_iconWrap_12m2l_79',
  jx = '_name_12m2l_90',
  Tx = '_detail_12m2l_102',
  Ax = '_trigger_12m2l_110',
  Nx = '_effect_12m2l_121',
  zx = '_mergingBadge_12m2l_133',
  ct = {
    root: mx,
    selected: hx,
    merging: vx,
    locked: yx,
    disabled: gx,
    card: px,
    tierBadge: _x,
    count: bx,
    countZero: Sx,
    iconWrap: xx,
    name: jx,
    detail: Tx,
    trigger: Ax,
    effect: Nx,
    mergingBadge: zx,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  Ex = { sm: 22, md: 26, lg: 32 },
  Jh = { sm: 38, md: 44, lg: 52 };
function pr({
  name: c,
  iconName: s,
  tier: u,
  count: o,
  trigger: m,
  effect: d,
  selected: h = !1,
  merging: y = !1,
  locked: g = !1,
  disabled: p = !1,
  size: b = 'md',
  onClick: T,
}) {
  const E = Math.min(Math.max(1, Math.floor(u)), 5),
    C = `var(--c-patch-t${E})`,
    O = T != null && !p && !g,
    U = h ? { boxShadow: 'var(--glow-cyan-md)' } : y ? { boxShadow: 'var(--glow-purple-md)' } : {},
    H = {
      width: Jh[b],
      height: Jh[b],
      opacity: g ? 0.35 : 1,
      background: g ? 'var(--c-surface)' : `linear-gradient(135deg, ${C}22, ${C}08)`,
      border: g ? '1px solid var(--c-border-faint)' : `1px solid ${C}55`,
      filter: g ? 'none' : `drop-shadow(0 0 4px ${C}55)`,
    },
    F = {
      background: o >= 2 ? `${C}22` : void 0,
      borderColor: o >= 2 ? C : void 0,
      color: o >= 2 ? C : void 0,
    };
  return r.jsx('div', {
    className: [
      ct.root,
      h ? ct.selected : '',
      y ? ct.merging : '',
      g ? ct.locked : '',
      p ? ct.disabled : '',
      ct[`size-${b}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: U,
    onClick: O ? T : void 0,
    role: O ? 'button' : void 0,
    tabIndex: O ? 0 : void 0,
    onKeyDown: O
      ? (I) => {
          (I.key === 'Enter' || I.key === ' ') && (I.preventDefault(), T == null || T());
        }
      : void 0,
    'aria-pressed': O ? h : void 0,
    'aria-disabled': p || g ? !0 : void 0,
    children: r.jsxs(Ll, {
      variant: 'elevated',
      padding: 'sm',
      interactive: O,
      className: ct.card,
      children: [
        !g &&
          r.jsx('span', {
            className: ct.tierBadge,
            children: r.jsx(Xi, { text: `T${E}`, variant: 'patch-tier', tier: u }),
          }),
        r.jsxs('span', {
          className: [ct.count, o === 0 ? ct.countZero : ''].filter(Boolean).join(' '),
          style: F,
          children: ['×', g ? '?' : o],
        }),
        r.jsx('div', {
          className: ct.iconWrap,
          style: H,
          children: r.jsx(Ee, {
            name: g ? 'close' : s,
            size: Ex[b],
            color: g ? 'var(--c-text-disabled)' : C,
          }),
        }),
        r.jsx(G, {
          variant: 'caption',
          color: g ? 'dim' : 'text',
          className: ct.name,
          children: g ? '???' : c,
        }),
        !g &&
          r.jsxs('div', {
            className: ct.detail,
            children: [
              r.jsx('span', { className: ct.trigger, children: m }),
              r.jsx('span', { className: ct.effect, children: d }),
            ],
          }),
        y && r.jsx('span', { className: ct.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
function x1({ patch: c = null, slotIndex: s, locked: u = !1, size: o = 'md', onClick: m }) {
  const d = c != null,
    h = m != null && !u,
    y = s != null ? `Slot ${s}` : '',
    g = d
      ? `Slot ${s ?? ''}: ${c.name} (Tier ${c.tier})`
      : u
        ? `Slot ${s ?? ''} (locked)`.trim()
        : `Slot ${s ?? ''} (empty)`.trim(),
    p = d ? nl.filled : u ? nl.locked : nl.empty;
  return r.jsx('div', {
    className: [nl.wrapper, p, nl[`size-${o}`]].filter(Boolean).join(' '),
    role: h ? 'button' : void 0,
    tabIndex: h ? 0 : void 0,
    'aria-label': g,
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
            className: nl.slotInner,
            children: [
              r.jsx('span', {
                className: nl.emptyIcon,
                children: r.jsx(Ee, {
                  name: u ? 'close' : 'plus',
                  size: 28,
                  color: u ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              r.jsx('span', { className: nl.emptyLabel, children: u ? 'LOCKED' : y }),
            ],
          }),
  });
}
function Mx(c) {
  return Math.min(1 + c, Bn);
}
const Cx = {
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
  Ox = {
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
  wx = {
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
function Rx({ overridePatches: c, overrideEquipped: s, overridePatchSlotsLv: u }) {
  const o = X((O) => O.patches),
    m = X((O) => O.equippedPatches),
    d = X((O) => O.machineLevels.patchSlots),
    h = X((O) => O.unequipPatch),
    y = c ?? o,
    g = s ?? m,
    b = Mx(u ?? d),
    T = (O) => {
      const U = g.get(O);
      if (!U) return null;
      const H = `${U.name}#${U.tier}`,
        F = y.get(H);
      return {
        patchId: H,
        name: U.name,
        iconName: Cx[U.name] ?? 'spark',
        tier: U.tier,
        trigger: Ox[U.name] ?? '常時',
        effect: wx[U.name] ?? '-',
        count: (F == null ? void 0 : F.count) ?? 0,
      };
    },
    E = (O) => {
      g.get(O) && h(O);
    },
    C = Bn - b;
  return r.jsxs('div', {
    className: Cn.root,
    children: [
      r.jsxs('div', {
        className: Cn.header,
        children: [
          r.jsxs('div', {
            className: Cn.headerTitleRow,
            children: [
              r.jsx(G, { variant: 'heading-3', children: '装着スロット' }),
              r.jsxs(G, {
                variant: 'caption',
                color: 'mid',
                className: Cn.headerCount,
                children: [g.size, '/', b],
              }),
            ],
          }),
          r.jsxs(G, {
            variant: 'caption',
            color: 'dim',
            children: ['(', Bn, ' スロット中 ', C, ' ロック・', g.size, ' / ', b, ' ', '装着中)'],
          }),
        ],
      }),
      r.jsx('div', {
        className: Cn.slotGrid,
        children: Array.from({ length: Bn }, (O, U) => {
          const H = U >= b,
            F = H ? null : T(U);
          return r.jsx(
            x1,
            { slotIndex: U + 1, patch: F, locked: H, size: 'md', onClick: H ? void 0 : () => E(U) },
            U
          );
        }),
      }),
      g.size === 0 &&
        b > 0 &&
        r.jsx(G, {
          variant: 'caption',
          color: 'dim',
          className: Cn.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const Dx = '_root_16zq4_1',
  Bx = '_header_16zq4_8',
  Lx = '_grid_16zq4_14',
  qx = '_empty_16zq4_20',
  qi = { root: Dx, header: Bx, grid: Lx, empty: qx },
  Hx = {
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
  Ux = {
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
  Gx = {
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
function Vx({ overridePatches: c, overrideEquipped: s, selectedId: u, onSelect: o }) {
  const m = X((b) => b.patches),
    d = X((b) => b.equippedPatches),
    h = c ?? m,
    y = s ?? d,
    g = new Set(Array.from(y.values()).map((b) => b.name)),
    p = Array.from(h.values());
  return p.length === 0
    ? r.jsx('div', {
        className: qi.root,
        children: r.jsx('div', {
          className: qi.empty,
          children: r.jsx(G, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : r.jsxs('div', {
        className: qi.root,
        children: [
          r.jsxs('div', {
            className: qi.header,
            children: [
              r.jsx(G, { variant: 'heading-3', children: 'パッチ在庫' }),
              r.jsxs(G, { variant: 'caption', color: 'dim', children: [p.length, ' 種類'] }),
            ],
          }),
          r.jsx('div', {
            className: qi.grid,
            children: p.map((b) => {
              const T = `${b.name}#${b.tier}`,
                E = g.has(b.name);
              return r.jsx(
                pr,
                {
                  patchId: T,
                  name: b.name,
                  iconName: Hx[b.name] ?? 'spark',
                  tier: b.tier,
                  count: b.count,
                  trigger: Ux[b.name] ?? '常時',
                  effect: Gx[b.name] ?? '-',
                  selected: u === T,
                  locked: E,
                  onClick: o ? () => o(u === T ? null : T) : void 0,
                },
                T
              );
            }),
          }),
        ],
      });
}
const $x = '_root_1svx2_1',
  Yx = '_header_1svx2_8',
  kx = '_tierControl_1svx2_14',
  Zx = '_tierStepperRow_1svx2_24',
  Xx = '_mergeList_1svx2_30',
  Qx = '_empty_1svx2_36',
  On = { root: $x, header: Yx, tierControl: kx, tierStepperRow: Zx, mergeList: Xx, empty: Qx },
  Kx = '_stepper_1ouvh_1',
  Jx = '_disabled_1ouvh_6',
  Wx = '_btn_1ouvh_11',
  Fx = '_value_1ouvh_38',
  wn = {
    stepper: Kx,
    disabled: Jx,
    btn: Wx,
    value: Fx,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  Ix = ({
    value: c,
    min: s,
    max: u,
    step: o = 1,
    onChange: m,
    size: d = 'md',
    disabled: h = !1,
  }) => {
    const y = c - o >= s,
      g = c + o <= u,
      p = () => {
        h || !y || m(Math.max(s, c - o));
      },
      b = () => {
        h || !g || m(Math.min(u, c + o));
      };
    return r.jsxs('div', {
      className: [wn.stepper, wn[`size-${d}`], h ? wn.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        r.jsx('button', {
          type: 'button',
          className: wn.btn,
          onClick: p,
          disabled: h || !y,
          'aria-label': '減少',
          children: '−',
        }),
        r.jsx('span', {
          className: wn.value,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          children: c,
        }),
        r.jsx('button', {
          type: 'button',
          className: wn.btn,
          onClick: b,
          disabled: h || !g,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  ir = 5,
  Px = {
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
function j1(c, s) {
  const u = [];
  for (const o of c.values())
    o.tier < s &&
      o.count >= 2 &&
      u.push({ name: o.name, tier: o.tier, count: o.count, iconName: Px[o.name] ?? 'spark' });
  return u.sort((o, m) => o.tier - m.tier || o.name.localeCompare(m.name));
}
function e3(c, s) {
  let u = new Map(c),
    o = !0;
  for (; o; ) {
    o = !1;
    for (const m of Array.from(u.values())) {
      if (m.tier >= s || m.count < 2 || m.tier >= ir) continue;
      const d = `${m.name}#${m.tier}`,
        h = Math.floor(m.count / 2),
        y = m.count % 2,
        g = m.tier + 1,
        p = `${m.name}#${g}`,
        b = u.get(p),
        T = ((b == null ? void 0 : b.count) ?? 0) + h;
      ((u = new Map(u)),
        y === 0 ? u.delete(d) : u.set(d, { ...m, count: y }),
        u.set(p, { name: m.name, tier: g, count: T }),
        (o = !0));
    }
  }
  return u;
}
function t3({ overridePatches: c }) {
  const s = X((E) => E.patches),
    u = X((E) => E.addPatch),
    o = X((E) => E.consumePatch),
    m = X((E) => E.pruneEmptyPatches),
    d = c ?? s,
    h = Math.max(1, ...Array.from(d.values()).map((E) => E.tier)),
    [y, g] = de.useState(Math.min(h, ir - 1)),
    p = j1(d, y + 1),
    b = p.length > 0,
    T = () => {
      if (c) return;
      const E = e3(d, y + 1);
      for (const [C, O] of d) {
        const U = E.get(C),
          H = (U == null ? void 0 : U.count) ?? 0;
        H < O.count && o(O.name, O.tier, O.count - H);
      }
      for (const [C, O] of E) {
        const U = d.get(C),
          H = (U == null ? void 0 : U.count) ?? 0;
        O.count > H && u(O.name, O.tier, O.count - H);
      }
      m();
    };
  return r.jsxs('div', {
    className: On.root,
    children: [
      r.jsx('div', {
        className: On.header,
        children: r.jsx(G, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      r.jsxs('div', {
        className: On.tierControl,
        children: [
          r.jsx(G, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          r.jsxs('div', {
            className: On.tierStepperRow,
            children: [
              r.jsx(Ix, { value: y, min: 1, max: ir - 1, onChange: g }),
              r.jsxs(G, {
                variant: 'caption',
                color: 'dim',
                children: ['T', y, ' 以下を T', y + 1, ' に合成'],
              }),
            ],
          }),
        ],
      }),
      b
        ? r.jsxs(r.Fragment, {
            children: [
              r.jsx('div', {
                className: On.mergeList,
                children: p.map((E) =>
                  r.jsx(
                    pr,
                    {
                      patchId: `${E.name}#${E.tier}`,
                      name: E.name,
                      iconName: E.iconName,
                      tier: E.tier,
                      count: E.count,
                      trigger: '-',
                      effect: '-',
                      merging: !0,
                      size: 'md',
                    },
                    `${E.name}#${E.tier}`
                  )
                ),
              }),
              r.jsx(Ct, {
                label: `一括合成 (${p.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: T,
              }),
            ],
          })
        : r.jsxs('div', {
            className: On.empty,
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
function a3(c) {
  return Math.min(1 + c, Bn);
}
function l3() {
  const { navigate: c } = ul(),
    [s, u] = de.useState('equip'),
    o = X((C) => C.equippedPatches),
    m = X((C) => C.patches),
    d = X((C) => C.machineLevels.patchSlots),
    h = a3(d),
    y = o.size,
    g = m.size,
    p = j1(m, 5).length,
    b = (C) => {
      c(C);
    },
    T = () => {
      c('preparation');
    },
    E = [
      { key: 'equip', label: '装着', badge: `${y}/${h}` },
      { key: 'inventory', label: '所持', badge: g > 0 ? g : void 0 },
      { key: 'merge', label: '合成', badge: p > 0 ? p : void 0 },
    ];
  return r.jsx(Bl, {
    header: r.jsx(Zi, {
      title: 'パッチ庫',
      subtitle: `装着 ${y}/${h} ・ 在庫 ${g} 種`,
      onBack: T,
      currencies: [],
      tabBar: r.jsx(Ss, { tabs: E, value: s, onChange: u, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(ki, { active: 'patches', onChange: b }),
    children: r.jsxs('div', {
      className: PS.content,
      children: [
        s === 'equip' && r.jsx(Rx, {}),
        s === 'inventory' && r.jsx(Vx, {}),
        s === 'merge' && r.jsx(t3, {}),
      ],
    }),
  });
}
const n3 = '_footer_qoo97_1',
  i3 = '_tabPanel_qoo97_7',
  Wh = { footer: n3, tabPanel: i3 },
  c3 = '_wrapper_1lf9s_1',
  s3 = '_header_1lf9s_7',
  u3 = '_headerLabel_1lf9s_13',
  o3 = '_empty_1lf9s_18',
  r3 = '_emptyIcon_1lf9s_29',
  f3 = '_grid_1lf9s_33',
  d3 = '_note_1lf9s_39',
  Cl = { wrapper: c3, header: s3, headerLabel: u3, empty: o3, emptyIcon: r3, grid: f3, note: d3 },
  m3 = {
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
function h3({ onOpenPatchScreen: c }) {
  const s = X((h) => h.equippedPatches),
    u = X((h) => h.machineLevels.patchSlots),
    o = Math.min(1 + u, Bn),
    m = [];
  for (let h = 0; h < o; h++) {
    const y = s.get(h);
    if (y != null) {
      const g = m3[y.name],
        p = {
          patchId: `${y.name}#${y.tier}`,
          name: g.name,
          iconName: g.iconName,
          tier: y.tier,
          trigger: g.trigger,
          effect: g.effect,
          count: 1,
        };
      m.push({ kind: 'filled', patch: p, idx: h + 1 });
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
          r.jsxs(G, {
            variant: 'caption',
            color: 'mid',
            className: Cl.headerLabel,
            children: ['装着 ', d, ' / ', o],
          }),
          c != null &&
            r.jsx(Ct, {
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
            className: Cl.empty,
            children: [
              r.jsx('span', {
                className: Cl.emptyIcon,
                children: r.jsx(Ee, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              r.jsx(G, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              c != null &&
                r.jsx(Ct, {
                  label: 'パッチ庫を開く',
                  variant: 'secondary',
                  size: 'sm',
                  onClick: c,
                }),
            ],
          })
        : r.jsx('div', {
            className: Cl.grid,
            children: m.map((h, y) =>
              r.jsx(x1, { patch: h.patch, slotIndex: h.idx, onClick: c }, y)
            ),
          }),
      r.jsx(G, {
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
const v3 = '_wrapper_iebuz_1',
  y3 = '_header_iebuz_7',
  g3 = '_grid_iebuz_12',
  Po = { wrapper: v3, header: y3, grid: g3 },
  p3 = [
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
function _3({ selectedWeapon: c, onSelect: s }) {
  const u = X((h) => h.initialWeapon),
    o = X((h) => h.setInitialWeapon),
    m = c ?? u,
    d = (h) => {
      (o(h), s == null || s(h));
    };
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: Po.wrapper,
    children: [
      r.jsx('div', {
        className: Po.header,
        children: r.jsx(G, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      r.jsx('div', {
        className: Po.grid,
        children: p3.map((h) =>
          r.jsx(
            g1,
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
const b3 = '_wrapper_1rg1e_1',
  S3 = '_sticky_1rg1e_15',
  x3 = '_summary_1rg1e_19',
  j3 = '_weaponInfo_1rg1e_29',
  T3 = '_patchInfo_1rg1e_37',
  Hi = { wrapper: b3, sticky: S3, summary: x3, weaponInfo: j3, patchInfo: T3 };
function A3({
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
    className: [Hi.wrapper, d ? Hi.sticky : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Hi.summary,
        children: [
          c != null && r.jsx(Xi, { variant: 'tier', tier: c, size: 'sm' }),
          s != null &&
            r.jsxs('span', {
              className: Hi.weaponInfo,
              children: [
                r.jsx(Ee, { name: s, size: 14 }),
                r.jsx(G, { variant: 'label', color: 'primary', children: s.toUpperCase() }),
              ],
            }),
          r.jsxs('span', {
            className: Hi.patchInfo,
            children: [
              r.jsx(Ee, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              r.jsxs(G, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', u] }),
            ],
          }),
        ],
      }),
      r.jsx(Ct, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: o,
        iconLeft: r.jsx(Ee, { name: 'tower', size: 18 }),
        onClick: m,
      }),
    ],
  });
}
const N3 = '_wrapper_1ul9l_1',
  z3 = '_header_1ul9l_7',
  E3 = '_grid_1ul9l_14',
  M3 = '_tierBtn_1ul9l_20',
  C3 = '_active_1ul9l_35',
  O3 = '_tierLabel_1ul9l_50',
  w3 = '_frontierLabel_1ul9l_61',
  Ol = {
    wrapper: N3,
    header: z3,
    grid: E3,
    tierBtn: M3,
    active: C3,
    tierLabel: O3,
    frontierLabel: w3,
  };
function R3({ selectedTier: c, onSelect: s }) {
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
          r.jsx(G, {
            variant: 'caption',
            color: 'mid',
            children: '到達済み Tier を選んで出撃します。',
          }),
          r.jsxs(G, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', o] }),
        ],
      }),
      r.jsx('div', {
        className: Ol.grid,
        children: m.map((h) => {
          const y = h === c,
            g = h === o,
            p = d(h);
          return r.jsxs(
            'button',
            {
              type: 'button',
              'aria-pressed': y,
              'data-active': y,
              'data-frontier': g,
              className: [Ol.tierBtn, y ? Ol.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': p },
              onClick: () => (s == null ? void 0 : s(h)),
              children: [
                r.jsxs('span', { className: Ol.tierLabel, children: ['T', h] }),
                g && !y && r.jsx('span', { className: Ol.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            h
          );
        }),
      }),
    ],
  });
}
const D3 = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function B3(c) {
  const { initialSelectedTier: s } = c,
    { navigate: u } = ul(),
    [o, m] = de.useState('tier'),
    d = X((O) => O.highestTier),
    [h, y] = de.useState(s ?? Math.max(1, d)),
    g = X((O) => O.initialWeapon),
    b = [...X((O) => O.equippedPatches).values()].length;
  function T() {
    u('battle');
  }
  const E = r.jsx(Zi, {
      title: '出撃準備',
      currencies: ['screw', 'bolt', 'alloy'],
      tabBar: r.jsx(Ss, { tabs: D3, value: o, onChange: m, variant: 'underline', fullWidth: !0 }),
    }),
    C = r.jsxs('div', {
      className: Wh.footer,
      children: [
        r.jsx(A3, { tier: h, weaponKind: g, patchCount: b, sticky: !1, onLaunch: T }),
        r.jsx(ki, { active: 'preparation', onChange: (O) => u(O) }),
      ],
    });
  return r.jsx(Bl, {
    header: E,
    footer: C,
    children: r.jsxs('div', {
      className: Wh.tabPanel,
      children: [
        o === 'tier' && r.jsx(R3, { selectedTier: h, onSelect: y }),
        o === 'weapon' && r.jsx(_3, {}),
        o === 'patches' && r.jsx(h3, { onOpenPatchScreen: () => u('patches') }),
      ],
    }),
  });
}
const L3 = '_content_mk0vl_1',
  q3 = { content: L3 },
  H3 = '_root_1b7n9_1',
  U3 = '_header_1b7n9_8',
  G3 = '_storageCard_1b7n9_13',
  V3 = '_storageRow_1b7n9_23',
  $3 = '_divider_1b7n9_29',
  Y3 = '_section_1b7n9_34',
  k3 = '_dangerSection_1b7n9_40',
  Z3 = '_sectionHeader_1b7n9_50',
  $t = {
    root: H3,
    header: U3,
    storageCard: G3,
    storageRow: V3,
    divider: $3,
    section: Y3,
    dangerSection: k3,
    sectionHeader: Z3,
  },
  X3 = '_wrapper_11b89_1',
  Q3 = '_disabled_11b89_6',
  K3 = '_hiddenInput_11b89_11',
  J3 = '_btn_11b89_15',
  W3 = '_fileName_11b89_41',
  Ui = { wrapper: X3, disabled: Q3, hiddenInput: K3, btn: J3, fileName: W3 },
  F3 = ({
    accept: c = 'application/json',
    onChange: s,
    label: u = 'ファイルを選択',
    disabled: o = !1,
  }) => {
    const m = de.useRef(null),
      [d, h] = de.useState(null),
      y = () => {
        var p;
        o || (p = m.current) == null || p.click();
      },
      g = (p) => {
        var T;
        const b = ((T = p.target.files) == null ? void 0 : T[0]) ?? null;
        (h((b == null ? void 0 : b.name) ?? null), s(b), m.current && (m.current.value = ''));
      };
    return r.jsxs('div', {
      className: [Ui.wrapper, o ? Ui.disabled : ''].join(' '),
      children: [
        r.jsx('input', {
          ref: m,
          type: 'file',
          accept: c,
          className: Ui.hiddenInput,
          onChange: g,
          disabled: o,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        r.jsx('button', {
          type: 'button',
          className: Ui.btn,
          onClick: y,
          disabled: o,
          children: u,
        }),
        d && r.jsx('span', { className: Ui.fileName, title: d, children: d }),
      ],
    });
  };
function I3({ storageInfo: c, onExport: s, onImport: u, onReset: o }) {
  const [m, d] = de.useState(!1),
    [h, y] = de.useState(!1),
    [g, p] = de.useState(!1),
    b = async () => {
      if (s) {
        p(!0);
        try {
          await s();
        } finally {
          p(!1);
        }
      }
    },
    T = async (C) => {
      if (!(!C || !u)) {
        y(!0);
        try {
          await u(C);
        } finally {
          y(!1);
        }
      }
    },
    E = async () => {
      (d(!1), o && (await o()));
    };
  return r.jsxs('div', {
    className: $t.root,
    children: [
      r.jsx('div', {
        className: $t.header,
        children: r.jsx(G, { variant: 'heading-3', children: 'データ管理' }),
      }),
      c &&
        r.jsxs('div', {
          className: $t.storageCard,
          children: [
            r.jsx(G, { variant: 'label', color: 'mid', children: 'ストレージ使用量' }),
            r.jsxs('div', {
              className: $t.storageRow,
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
      r.jsx('div', { className: $t.divider }),
      r.jsxs('div', {
        className: $t.section,
        children: [
          r.jsxs('div', {
            className: $t.sectionHeader,
            children: [
              r.jsx(G, { variant: 'label', color: 'mid', children: 'エクスポート' }),
              r.jsx(G, {
                variant: 'caption',
                color: 'dim',
                children: 'セーブデータを JSON ファイルとしてダウンロード',
              }),
            ],
          }),
          r.jsx(Ct, {
            label: g ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: b,
            disabled: g || !s,
          }),
        ],
      }),
      r.jsxs('div', {
        className: $t.section,
        children: [
          r.jsxs('div', {
            className: $t.sectionHeader,
            children: [
              r.jsx(G, { variant: 'label', color: 'mid', children: 'インポート' }),
              r.jsx(G, {
                variant: 'caption',
                color: 'dim',
                children: 'JSON ファイルからセーブデータを復元（上書き）',
              }),
            ],
          }),
          r.jsx(F3, {
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
              r.jsx(G, { variant: 'label', color: 'mid', children: 'データリセット' }),
              r.jsx(G, {
                variant: 'caption',
                color: 'dim',
                children: 'すべてのデータを削除します。この操作は取り消せません。',
              }),
            ],
          }),
          r.jsx(Ct, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => d(!0),
            disabled: !o,
          }),
        ],
      }),
      r.jsx(S1, {
        open: m,
        title: 'データをリセットしますか？',
        message: 'すべてのセーブデータが削除されます。この操作は取り消せません。',
        iconName: 'skull',
        confirmLabel: 'リセットする',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: E,
        onCancel: () => d(!1),
      }),
    ],
  });
}
const P3 = '_root_1rbig_1',
  e5 = '_header_1rbig_8',
  t5 = '_section_1rbig_13',
  a5 = '_sectionHeader_1rbig_20',
  l5 = '_divider_1rbig_26',
  Rn = { root: P3, header: e5, section: t5, sectionHeader: a5, divider: l5 },
  n5 = '_wrapper_16nmz_9',
  i5 = '_disabled_16nmz_15',
  c5 = '_off_16nmz_31',
  s5 = '_on_16nmz_35',
  u5 = '_accent_primary_16nmz_35',
  o5 = '_accent_secondary_16nmz_39',
  r5 = '_accent_success_16nmz_43',
  f5 = '_accent_disabled_16nmz_47',
  d5 = '_size_md_16nmz_56',
  m5 = '_knob_16nmz_60',
  h5 = '_size_sm_16nmz_70',
  v5 = '_labelGroup_16nmz_93',
  y5 = '_label_16nmz_93',
  g5 = '_description_16nmz_106',
  Ft = {
    wrapper: n5,
    disabled: i5,
    switch: '_switch_16nmz_22',
    off: c5,
    on: s5,
    accent_primary: u5,
    accent_secondary: o5,
    accent_success: r5,
    accent_disabled: f5,
    size_md: d5,
    knob: m5,
    size_sm: h5,
    labelGroup: v5,
    label: y5,
    description: g5,
  },
  T1 = ({
    checked: c,
    onChange: s,
    disabled: u = !1,
    label: o,
    description: m,
    accent: d = 'primary',
    size: h = 'md',
  }) => {
    const y = u || d === 'disabled',
      g = () => {
        y || s(!c);
      };
    return r.jsxs('label', {
      className: [Ft.wrapper, y ? Ft.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': y,
      children: [
        r.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': c,
          'aria-disabled': y,
          className: [Ft.switch, c ? Ft.on : Ft.off, Ft[`size_${h}`], Ft[`accent_${d}`]]
            .filter(Boolean)
            .join(' '),
          onClick: g,
          disabled: y,
          children: r.jsx('span', { className: Ft.knob }),
        }),
        (o || m) &&
          r.jsxs('span', {
            className: Ft.labelGroup,
            children: [
              o && r.jsx('span', { className: Ft.label, children: o }),
              m && r.jsx('span', { className: Ft.description, children: m }),
            ],
          }),
      ],
    });
  },
  p5 = [
    { label: '×1', value: 1 },
    { label: '×2', value: 2 },
    { label: '×3', value: 3 },
  ];
function _5({ overrideVibration: c, overrideSpeed: s, onVibrationChange: u, onSpeedChange: o }) {
  const m = X((E) => E.vibrationEnabled),
    d = X((E) => E.defaultGameSpeed),
    h = X((E) => E.setVibrationEnabled),
    y = X((E) => E.setDefaultGameSpeed),
    g = c ?? m,
    p = s ?? d,
    b = (E) => {
      u ? u(E) : h(E);
    },
    T = (E) => {
      o ? o(E) : y(E);
    };
  return r.jsxs('div', {
    className: Rn.root,
    children: [
      r.jsx('div', {
        className: Rn.header,
        children: r.jsx(G, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      r.jsx('div', {
        className: Rn.section,
        children: r.jsx(T1, {
          checked: g,
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
              r.jsx(G, { variant: 'label', color: 'mid', children: '初期速度倍率' }),
              r.jsx(G, { variant: 'caption', color: 'dim', children: 'ゲーム開始時の速度' }),
            ],
          }),
          r.jsx(b1, { options: p5, value: p, onChange: T }),
        ],
      }),
    ],
  });
}
const b5 = '_root_nuc5y_2',
  S5 = '_muteRow_nuc5y_9',
  x5 = '_muteLabelGroup_nuc5y_16',
  j5 = '_sliderRow_nuc5y_24',
  T5 = '_muted_nuc5y_29',
  A5 = '_sliderIcon_nuc5y_29',
  N5 = '_sliderArea_nuc5y_41',
  z5 = '_sliderValue_nuc5y_46',
  cl = {
    root: b5,
    muteRow: S5,
    muteLabelGroup: x5,
    sliderRow: j5,
    muted: T5,
    sliderIcon: A5,
    sliderArea: N5,
    sliderValue: z5,
  };
function E5(c) {
  return 440 * Math.pow(2, (c - 69) / 12);
}
const M5 = {
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
  const u = M5[s[1]];
  if (u === void 0) throw new Error(`Invalid note name: ${s[1]}`);
  const m = 12 + parseInt(s[2], 10) * 12 + u;
  return E5(m);
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
const C5 = [D('A2'), D('C3'), D('E3')],
  O5 = [D('E2'), D('G2'), D('B2')];
(D('D3'), D('F3'), D('A3'));
const w5 = [D('G2'), D('B2'), D('D3')],
  R5 = [D('C3'), D('E3'), D('G3')],
  D5 = [D('B2'), D('D3'), D('F3')];
function Yt(c, s, u, o, m, d, h, y) {
  const g = c.createOscillator(),
    p = c.createGain();
  ((g.type = u), g.frequency.setValueAtTime(o, m));
  const b = 0.01,
    T = Math.min(0.08, d * 0.4);
  if (
    (p.gain.setValueAtTime(1e-4, m),
    p.gain.linearRampToValueAtTime(h, m + b),
    p.gain.setValueAtTime(h, m + d - T),
    p.gain.exponentialRampToValueAtTime(1e-4, m + d),
    y !== void 0)
  ) {
    const E = c.createBiquadFilter();
    ((E.type = 'lowpass'),
      (E.frequency.value = y),
      (E.Q.value = 0.8),
      g.connect(E).connect(p).connect(s));
  } else g.connect(p).connect(s);
  (g.start(m), g.stop(m + d + 0.02));
}
function Qi(c, s) {
  const u = Math.max(1, Math.floor(c.sampleRate * s)),
    o = c.createBuffer(1, u, c.sampleRate),
    m = o.getChannelData(0);
  let d = 74565;
  for (let h = 0; h < u; h++)
    ((d = (d * 1664525 + 1013904223) & 4294967295), (m[h] = d / 2147483648 - 1));
  return o;
}
function Yi(c, s, u, o) {
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
  h.buffer = Qi(c, 0.04);
  const y = c.createGain(),
    g = c.createBiquadFilter();
  ((g.type = 'highpass'),
    (g.frequency.value = 400),
    y.gain.setValueAtTime(o * 0.3, u),
    y.gain.exponentialRampToValueAtTime(1e-4, u + 0.04),
    h.connect(g).connect(y).connect(s),
    h.start(u));
}
function B5(c, s, u, o, m) {
  const d = c.createBufferSource();
  d.buffer = Qi(c, m + 0.01);
  const h = c.createGain(),
    y = c.createBiquadFilter();
  ((y.type = 'highpass'),
    (y.frequency.value = 6e3),
    h.gain.setValueAtTime(o, u),
    h.gain.exponentialRampToValueAtTime(1e-4, u + m),
    d.connect(y).connect(h).connect(s),
    d.start(u));
}
const L5 = 100,
  wl = 60 / L5,
  $i = wl * 4,
  A1 = 8,
  q5 = $i * A1,
  H5 = 2,
  U5 = 100,
  G5 = [D('A2'), D('A2'), D('G2'), D('G2'), D('C3'), D('C3'), D('E2'), D('E2')],
  Fh = [D('A3'), D('C4'), D('E4'), D('A4'), D('G4'), D('E4'), D('C4'), D('A3')],
  Ih = [
    [D('A3'), D('C4'), D('E4')],
    [D('G3'), D('B3'), D('D4')],
    [D('C3'), D('E3'), D('G3')],
    [D('E3'), D('G3'), D('B3')],
  ];
function V5(c, s, u, o) {
  for (let m = 0; m < A1; m++) {
    const d = u + m * $i,
      h = G5[m];
    (Yt(c, s, 'sawtooth', h, d, wl * 1.8, 0.22, 300),
      Yt(c, s, 'sawtooth', h, d + wl * 2, wl * 1.8, 0.22, 300),
      Yi(c, s, d, 0.35),
      Yi(c, s, d + wl * 2, 0.28));
    for (let y = 0; y < 8; y++) {
      const g = (m * 8 + y) % Fh.length,
        p = d + y * wl * 0.5;
      Yt(c, s, 'square', Fh[g], p, wl * 0.4, 0.07, 2400);
    }
  }
  for (let m = 0; m < Ih.length; m++) {
    const d = Ih[m],
      h = u + m * $i * 2,
      y = $i * 2;
    for (const g of d) {
      const p = c.createOscillator(),
        b = c.createGain();
      ((p.type = 'triangle'), p.frequency.setValueAtTime(g, h));
      const T = 0.08;
      (b.gain.setValueAtTime(1e-4, h),
        b.gain.linearRampToValueAtTime(T, h + 0.15),
        b.gain.setValueAtTime(T, h + y - 0.2),
        b.gain.exponentialRampToValueAtTime(1e-4, h + y),
        p.connect(b).connect(s),
        p.start(h),
        p.stop(h + y + 0.05),
        o.push(p));
    }
  }
}
function $5(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + H5 * $i;
    for (; u < y; ) (V5(c, s, u, m), (u += q5));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, U5)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const y of m)
        try {
          y.stop(h);
        } catch {}
      m.length = 0;
    },
  };
}
const Y5 = 100,
  Ta = 60 / Y5,
  _r = Ta * 4,
  N1 = 8,
  il = _r * N1,
  k5 = 2,
  Z5 = 100,
  Ph = [D('E5'), D('D5'), D('B4'), D('G4'), D('F#4'), D('E4'), D('D4'), D('B3')];
function e1(c, s, u, o) {
  const m = c.createBufferSource();
  m.buffer = Qi(c, 0.2);
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
function X5(c, s, u, o) {
  {
    const d = c.createOscillator(),
      h = c.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(D('E1'), u));
    const y = 0.35;
    (h.gain.setValueAtTime(1e-4, u),
      h.gain.linearRampToValueAtTime(y, u + 0.3),
      h.gain.setValueAtTime(y, u + il - 0.3),
      h.gain.linearRampToValueAtTime(1e-4, u + il));
    const g = c.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 120),
      d.connect(g).connect(h).connect(s),
      d.start(u),
      d.stop(u + il + 0.05),
      o.push(d));
  }
  for (let d = 0; d < N1; d++) {
    const h = u + d * _r;
    for (let y = 0; y < 4; y++) {
      const g = h + y * Ta;
      (Yt(c, s, 'sawtooth', D('E2'), g, Ta * 0.9, 0.22, 400),
        Yt(c, s, 'sawtooth', D('B2'), g, Ta * 0.8, 0.1, 600));
    }
    (Yi(c, s, h, 0.5),
      Yi(c, s, h + Ta * 2, 0.45),
      e1(c, s, h + Ta, 0.4),
      e1(c, s, h + Ta * 3, 0.38));
  }
  const m = [...D5, D('C4')];
  for (const d of m) {
    const h = c.createOscillator(),
      y = c.createGain();
    ((h.type = 'sawtooth'), h.frequency.setValueAtTime(d, u));
    const g = 0.07;
    (y.gain.setValueAtTime(1e-4, u),
      y.gain.linearRampToValueAtTime(g, u + 0.8),
      y.gain.setValueAtTime(g, u + il - 0.8),
      y.gain.exponentialRampToValueAtTime(1e-4, u + il));
    const p = c.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 900),
      h.connect(p).connect(y).connect(s),
      h.start(u),
      h.stop(u + il + 0.05),
      o.push(h));
  }
  for (let d = 0; d < Ph.length; d++) {
    const h = u + d * Ta * 2;
    Yt(c, s, 'sawtooth', Ph[d], h, Ta * 1.6, 0.08, 2e3);
  }
  {
    const d = c.createBufferSource();
    d.buffer = Qi(c, il + 0.1);
    const h = c.createGain(),
      y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 200),
      h.gain.setValueAtTime(0.04, u),
      d.connect(y).connect(h).connect(s),
      d.start(u),
      o.push(d));
  }
}
function Q5(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + k5 * _r;
    for (; u < y; ) (X5(c, s, u, m), (u += il));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, Z5)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const y of m)
        try {
          y.stop(h);
        } catch {}
      m.length = 0;
    },
  };
}
const K5 = 120,
  Aa = 60 / K5,
  br = Aa * 4,
  z1 = 8,
  vs = br * z1,
  J5 = 2,
  W5 = 100,
  F5 = [D('E2'), D('E2'), D('D2'), D('D2'), D('E2'), D('E2'), D('B1'), D('B1')],
  t1 = [
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
function a1(c, s, u, o) {
  const m = c.createBufferSource();
  m.buffer = Qi(c, 0.15);
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
function I5(c, s, u, o) {
  for (let d = 0; d < z1; d++) {
    const h = u + d * br,
      y = F5[d];
    for (let g = 0; g < 4; g++) Yt(c, s, 'sawtooth', y, h + g * Aa, Aa * 0.85, 0.26, 280);
    for (let g = 0; g < 4; g++) Yi(c, s, h + g * Aa, 0.42);
    (a1(c, s, h + Aa, 0.3), a1(c, s, h + Aa * 3, 0.3));
    for (let g = 0; g < 8; g++) B5(c, s, h + g * Aa * 0.5, 0.12, 0.08);
    for (let g = 0; g < 16; g++) {
      const p = (d * 16 + g) % t1.length,
        b = h + g * Aa * 0.25;
      Yt(c, s, 'sawtooth', t1[p], b, Aa * 0.22, 0.06, 3200);
    }
  }
  const m = [D('E3'), D('G3'), D('B3')];
  for (const d of m) {
    const h = c.createOscillator(),
      y = c.createGain();
    ((h.type = 'triangle'),
      h.frequency.setValueAtTime(d, u),
      y.gain.setValueAtTime(1e-4, u),
      y.gain.linearRampToValueAtTime(0.06, u + 0.2),
      y.gain.setValueAtTime(0.06, u + vs - 0.3),
      y.gain.exponentialRampToValueAtTime(1e-4, u + vs));
    const g = c.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 1200),
      h.connect(g).connect(y).connect(s),
      h.start(u),
      h.stop(u + vs + 0.05),
      o.push(h));
  }
}
function P5(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + J5 * br;
    for (; u < y; ) (I5(c, s, u, m), (u += vs));
  }
  return {
    start() {
      ((u = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, W5)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = c.currentTime + 0.05;
      for (const y of m)
        try {
          y.stop(h);
        } catch {}
      m.length = 0;
    },
  };
}
const e4 = 80,
  ys = 60 / e4,
  bs = ys * 4,
  t4 = 8,
  gs = bs * t4,
  a4 = 2,
  l4 = 100,
  l1 = [C5, R5, w5, O5],
  er = [D('A3'), D('C4'), D('E4'), D('G4'), D('A4'), D('E4')];
function n4(c, s, u, o) {
  {
    const m = c.createOscillator(),
      d = c.createGain();
    ((m.type = 'sine'), m.frequency.setValueAtTime(D('A2'), u));
    const h = 0.28;
    (d.gain.setValueAtTime(1e-4, u),
      d.gain.linearRampToValueAtTime(h, u + 0.5),
      d.gain.setValueAtTime(h, u + gs - 0.5),
      d.gain.linearRampToValueAtTime(1e-4, u + gs));
    const y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 180),
      m.connect(y).connect(d).connect(s),
      m.start(u),
      m.stop(u + gs + 0.05),
      o.push(m));
  }
  for (let m = 0; m < l1.length; m++) {
    const d = l1[m],
      h = u + m * bs * 2,
      y = bs * 2;
    for (const g of d) {
      const p = c.createOscillator(),
        b = c.createGain();
      ((p.type = 'triangle'), p.frequency.setValueAtTime(g, h));
      const T = 0.1,
        E = 0.4,
        C = 0.6;
      (b.gain.setValueAtTime(1e-4, h),
        b.gain.linearRampToValueAtTime(T, h + E),
        b.gain.setValueAtTime(T, h + y - C),
        b.gain.exponentialRampToValueAtTime(1e-4, h + y));
      const O = c.createDelay(0.5);
      O.delayTime.value = 0.25;
      const U = c.createGain();
      U.gain.value = 0.2;
      const H = c.createBiquadFilter();
      ((H.type = 'lowpass'),
        (H.frequency.value = 2e3),
        p.connect(b).connect(s),
        p.connect(O).connect(H).connect(U).connect(s),
        p.start(h),
        p.stop(h + y + 0.5),
        o.push(p));
    }
  }
  for (let m = 0; m < er.length; m++) {
    const d = u + m * ys * 2;
    (Yt(c, s, 'sawtooth', er[m], d, ys * 1.5, 0.09, 1800),
      Yt(c, s, 'sine', er[m] * 0.5, d + 0.12, ys * 1.2, 0.05, 600));
  }
}
function i4(c, s) {
  let u = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + a4 * bs;
    for (; u < y; ) (n4(c, s, u, m), (u += gs));
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
      for (const y of m)
        try {
          y.stop(h);
        } catch {}
      m.length = 0;
    },
  };
}
function c4(c, s, u) {
  switch (c) {
    case 'title':
      return i4(s, u);
    case 'base':
      return $5(s, u);
    case 'battleNormal':
      return P5(s, u);
    case 'battleBoss':
      return Q5(s, u);
  }
}
function s4(c, s) {
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
function re(c, s, u, o, m, d, h, y, g) {
  const p = c.createOscillator(),
    b = c.createGain();
  ((p.type = u),
    p.frequency.setValueAtTime(o, m),
    g !== void 0 && p.frequency.exponentialRampToValueAtTime(Math.max(1e-4, g), m + h + y),
    It(b, m, d, h, y),
    p.connect(b).connect(s),
    p.start(m),
    p.stop(m + h + y + 0.02));
}
function Pt(c, s, u, o, m, d) {
  const h = c.createBufferSource();
  h.buffer = s4(c, u);
  const y = c.createGain();
  if ((It(y, o, m, 0.002, u), d)) {
    const g = c.createBiquadFilter();
    ((g.type = d.type),
      (g.frequency.value = d.frequency),
      d.q !== void 0 && (g.Q.value = d.q),
      h.connect(g).connect(y).connect(s));
  } else h.connect(y).connect(s);
  h.start(o);
}
const u4 = (c, s, u) => {
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
  o4 = (c, s, u) => {
    for (let o = 0; o < 4; o++) {
      const m = u + o * 0.12;
      (re(c, s, 'sine', 110, m, 0.4, 0.005, 0.18, 35),
        Pt(c, s, 0.08, m, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  r4 = (c, s, u) => {
    (Pt(c, s, 0.4, u, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      re(c, s, 'triangle', 3e3, u, 0.25, 0.005, 0.15, 1500),
      re(c, s, 'sawtooth', 200, u + 0.05, 0.18, 0.005, 0.3, 80));
  },
  f4 = (c, s, u) => {
    for (let o = 0; o < 5; o++) {
      const m = u + o * 0.07,
        d = c.createOscillator(),
        h = c.createGain(),
        y = c.createBiquadFilter();
      ((d.type = 'square'),
        d.frequency.setValueAtTime(1100 + o * 60, m),
        d.frequency.exponentialRampToValueAtTime(1700 + o * 60, m + 0.04),
        (y.type = 'bandpass'),
        (y.frequency.value = 1600),
        (y.Q.value = 4),
        It(h, m, 0.2, 0.002, 0.06),
        d.connect(y).connect(h).connect(s),
        d.start(m),
        d.stop(m + 0.08));
    }
  },
  d4 = (c, s, u) => {
    (Pt(c, s, 0.1, u, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      re(c, s, 'triangle', 500, u, 0.18, 0.003, 0.08, 200));
  },
  m4 = (c, s, u) => {
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
  h4 = (c, s, u) => {
    (Pt(c, s, 0.5, u, 0.45, { type: 'lowpass', frequency: 1200 }),
      re(c, s, 'sine', 90, u, 0.5, 0.005, 0.6, 30),
      re(c, s, 'triangle', 1200, u + 0.1, 0.2, 0.02, 0.4, 2400),
      re(c, s, 'triangle', 1600, u + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  v4 = (c, s, u) => {
    (re(c, s, 'sine', 180, u, 0.3, 0.005, 0.12, 60),
      Pt(c, s, 0.08, u, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  y4 = (c, s, u) => {
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
  g4 = (c, s, u) => {
    (re(c, s, 'triangle', 700, u, 0.22, 0.01, 0.18),
      re(c, s, 'triangle', 1050, u + 0.12, 0.22, 0.01, 0.22));
  },
  p4 = (c, s, u) => {
    (re(c, s, 'triangle', 600, u, 0.25, 0.01, 0.2),
      re(c, s, 'triangle', 900, u + 0.12, 0.25, 0.01, 0.2),
      re(c, s, 'triangle', 1350, u + 0.24, 0.3, 0.01, 0.45),
      re(c, s, 'sine', 2400, u + 0.3, 0.15, 0.02, 0.5));
  },
  _4 = (c, s, u) => {
    (re(c, s, 'triangle', 600, u, 0.28, 0.01, 0.18),
      re(c, s, 'triangle', 750, u + 0.12, 0.28, 0.01, 0.18),
      re(c, s, 'triangle', 900, u + 0.24, 0.28, 0.01, 0.22),
      re(c, s, 'triangle', 1200, u + 0.36, 0.32, 0.01, 0.5),
      re(c, s, 'sine', 2400, u + 0.42, 0.18, 0.02, 0.6));
  },
  b4 = (c, s, u) => {
    (re(c, s, 'sawtooth', 300, u, 0.3, 0.02, 0.4, 220),
      re(c, s, 'sawtooth', 220, u + 0.35, 0.3, 0.02, 0.5, 160),
      re(c, s, 'sawtooth', 160, u + 0.8, 0.3, 0.02, 0.7, 80),
      Pt(c, s, 1, u, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  S4 = (c, s, u) => {
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
  x4 = (c, s, u) => {
    re(c, s, 'triangle', 1e3, u, 0.18, 0.003, 0.05);
  },
  j4 = (c, s, u) => {
    (re(c, s, 'triangle', 880, u, 0.2, 0.005, 0.08),
      re(c, s, 'triangle', 1320, u + 0.06, 0.2, 0.005, 0.12));
  },
  T4 = (c, s, u) => {
    (re(c, s, 'square', 260, u, 0.18, 0.005, 0.07),
      re(c, s, 'square', 200, u + 0.06, 0.18, 0.005, 0.1));
  },
  A4 = (c, s, u) => {
    re(c, s, 'triangle', 1400, u, 0.12, 0.003, 0.04);
  },
  N4 = (c, s, u) => {
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
  z4 = (c, s, u) => {
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
  E4 = (c, s, u) => {
    (re(c, s, 'sawtooth', 200, u, 0.3, 0.01, 0.35, 80),
      re(c, s, 'triangle', 600, u + 0.05, 0.22, 0.01, 0.3, 1200),
      re(c, s, 'triangle', 1200, u + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  M4 = (c, s, u) => {
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
  C4 = (c, s, u) => {
    (re(c, s, 'sine', 130, u, 0.5, 0.01, 0.28, 40),
      Pt(c, s, 0.12, u, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  O4 = (c, s, u) => {
    (Pt(c, s, 0.18, u, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      re(c, s, 'triangle', 2200, u, 0.15, 0.002, 0.06, 1800));
  },
  w4 = (c, s, u) => {
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
  R4 = (c, s, u) => {
    (re(c, s, 'triangle', 700, u, 0.18, 0.005, 0.05),
      re(c, s, 'triangle', 1050, u + 0.04, 0.18, 0.005, 0.06));
  },
  D4 = {
    laserShoot: M4,
    cannonShoot: C4,
    thunderShoot: O4,
    cutterShoot: w4,
    weaponSwitch: R4,
    activeLaser: u4,
    activeCannon: o4,
    activeThunder: r4,
    activeCutter: f4,
    enemyKill: d4,
    bossWarn: m4,
    bossKill: h4,
    machineHit: v4,
    machineDown: y4,
    waveClear: g4,
    tierClear: p4,
    tap: x4,
    purchaseOk: j4,
    reject: T4,
    tabSwitch: A4,
    dialogOpen: N4,
    dialogClose: z4,
    launch: E4,
    resultClear: _4,
    resultGameOver: b4,
    resultRetreat: S4,
  },
  B4 = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function n1(c) {
  return Math.max(0, Math.min(1, c));
}
class L4 {
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
      o = B4[s];
    if (o !== void 0) {
      const d = this.lastPlayAt.get(s) ?? 0;
      if (u - d < o) return;
      this.lastPlayAt.set(s, u);
    }
    const m = D4[s];
    m(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(s) {
    ((this.seVolume = n1(s)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(s) {
    ((this.bgmVolume = n1(s)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
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
    const u = c4(s, this.ctx, this.bgmGain);
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
const hs = new L4();
function i1({ label: c, iconName: s, value: u, muted: o, onChange: m }) {
  return r.jsx(Ll, {
    variant: 'sunken',
    padding: 'md',
    children: r.jsxs('div', {
      className: [cl.sliderRow, o ? cl.muted : ''].filter(Boolean).join(' '),
      children: [
        r.jsx('span', { className: cl.sliderIcon, children: r.jsx(Ee, { name: s, size: 16 }) }),
        r.jsx(G, { variant: 'label', color: o ? 'dim' : 'mid', children: c }),
        r.jsx('div', {
          className: cl.sliderArea,
          children: r.jsx(nr, { value: u, min: 0, max: 1, step: 0.01, onChange: m, disabled: o }),
        }),
        r.jsx('span', {
          className: cl.sliderValue,
          children: r.jsx(sl, {
            value: Math.round(u * 100),
            size: 'sm',
            accentColor: o ? 'dim' : 'text',
          }),
        }),
      ],
    }),
  });
}
function q4({
  overrideBgmVolume: c,
  overrideSeVolume: s,
  overrideMute: u,
  onBgmChange: o,
  onSeChange: m,
  onMuteChange: d,
}) {
  const h = X((H) => H.bgmVolume),
    y = X((H) => H.seVolume),
    g = X((H) => H.setBgmVolume),
    p = X((H) => H.setSeVolume),
    b = c ?? h,
    T = s ?? y,
    E = u ?? !1,
    C = (H) => {
      o ? o(H) : (g(H), hs.setBgmVolume(E ? 0 : H));
    },
    O = (H) => {
      m ? m(H) : (p(H), hs.setSeVolume(E ? 0 : H));
    },
    U = (H) => {
      d ? d(H) : (hs.setBgmVolume(H ? 0 : b), hs.setSeVolume(H ? 0 : T));
    };
  return r.jsxs('div', {
    className: cl.root,
    role: 'tabpanel',
    'aria-label': 'サウンド設定',
    children: [
      r.jsx(Ll, {
        variant: 'sunken',
        padding: 'md',
        children: r.jsxs('div', {
          className: cl.muteRow,
          children: [
            r.jsxs('span', {
              className: cl.muteLabelGroup,
              children: [
                r.jsx(G, { variant: 'label', color: 'mid', children: 'ミュート' }),
                r.jsx(G, { variant: 'caption', color: 'dim', children: '全サウンドを一時停止' }),
              ],
            }),
            r.jsx(T1, { checked: E, onChange: U, accent: 'primary' }),
          ],
        }),
      }),
      r.jsx(i1, { label: 'BGM', iconName: 'play', value: b, muted: E, onChange: C }),
      r.jsx(i1, { label: 'SE', iconName: 'spark', value: T, muted: E, onChange: O }),
    ],
  });
}
const cr = (c, s) => s.some((u) => c instanceof u);
let c1, s1;
function H4() {
  return c1 || (c1 = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function U4() {
  return (
    s1 ||
    (s1 = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const sr = new WeakMap(),
  tr = new WeakMap(),
  Ns = new WeakMap();
function G4(c) {
  const s = new Promise((u, o) => {
    const m = () => {
        (c.removeEventListener('success', d), c.removeEventListener('error', h));
      },
      d = () => {
        (u(Dl(c.result)), m());
      },
      h = () => {
        (o(c.error), m());
      };
    (c.addEventListener('success', d), c.addEventListener('error', h));
  });
  return (Ns.set(s, c), s);
}
function V4(c) {
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
    return Dl(c[s]);
  },
  set(c, s, u) {
    return ((c[s] = u), !0);
  },
  has(c, s) {
    return c instanceof IDBTransaction && (s === 'done' || s === 'store') ? !0 : s in c;
  },
};
function E1(c) {
  ur = c(ur);
}
function $4(c) {
  return U4().includes(c)
    ? function (...s) {
        return (c.apply(or(this), s), Dl(this.request));
      }
    : function (...s) {
        return Dl(c.apply(or(this), s));
      };
}
function Y4(c) {
  return typeof c == 'function'
    ? $4(c)
    : (c instanceof IDBTransaction && V4(c), cr(c, H4()) ? new Proxy(c, ur) : c);
}
function Dl(c) {
  if (c instanceof IDBRequest) return G4(c);
  if (tr.has(c)) return tr.get(c);
  const s = Y4(c);
  return (s !== c && (tr.set(c, s), Ns.set(s, c)), s);
}
const or = (c) => Ns.get(c);
function k4(c, s, { blocked: u, upgrade: o, blocking: m, terminated: d } = {}) {
  const h = indexedDB.open(c, s),
    y = Dl(h);
  return (
    o &&
      h.addEventListener('upgradeneeded', (g) => {
        o(Dl(h.result), g.oldVersion, g.newVersion, Dl(h.transaction), g);
      }),
    u && h.addEventListener('blocked', (g) => u(g.oldVersion, g.newVersion, g)),
    y
      .then((g) => {
        (d && g.addEventListener('close', () => d()),
          m && g.addEventListener('versionchange', (p) => m(p.oldVersion, p.newVersion, p)));
      })
      .catch(() => {}),
    y
  );
}
const Z4 = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  X4 = ['put', 'add', 'delete', 'clear'],
  ar = new Map();
function u1(c, s) {
  if (!(c instanceof IDBDatabase && !(s in c) && typeof s == 'string')) return;
  if (ar.get(s)) return ar.get(s);
  const u = s.replace(/FromIndex$/, ''),
    o = s !== u,
    m = X4.includes(u);
  if (!(u in (o ? IDBIndex : IDBObjectStore).prototype) || !(m || Z4.includes(u))) return;
  const d = async function (h, ...y) {
    const g = this.transaction(h, m ? 'readwrite' : 'readonly');
    let p = g.store;
    return (o && (p = p.index(y.shift())), (await Promise.all([p[u](...y), m && g.done]))[0]);
  };
  return (ar.set(s, d), d);
}
E1((c) => ({
  ...c,
  get: (s, u, o) => u1(s, u) || c.get(s, u, o),
  has: (s, u) => !!u1(s, u) || c.has(s, u),
}));
const Q4 = ['continue', 'continuePrimaryKey', 'advance'],
  o1 = {},
  rr = new WeakMap(),
  M1 = new WeakMap(),
  K4 = {
    get(c, s) {
      if (!Q4.includes(s)) return c[s];
      let u = o1[s];
      return (
        u ||
          (u = o1[s] =
            function (...o) {
              rr.set(this, M1.get(this)[s](...o));
            }),
        u
      );
    },
  };
async function* J4(...c) {
  let s = this;
  if ((s instanceof IDBCursor || (s = await s.openCursor(...c)), !s)) return;
  s = s;
  const u = new Proxy(s, K4);
  for (M1.set(u, s), Ns.set(u, or(s)); s; )
    (yield u, (s = await (rr.get(u) || s.continue())), rr.delete(u));
}
function r1(c, s) {
  return (
    (s === Symbol.asyncIterator && cr(c, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (s === 'iterate' && cr(c, [IDBIndex, IDBObjectStore]))
  );
}
E1((c) => ({
  ...c,
  get(s, u, o) {
    return r1(s, u) ? J4 : c.get(s, u, o);
  },
  has(s, u) {
    return r1(s, u) || c.has(s, u);
  },
}));
const W4 = {
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
function F4(c, s, u, o) {
  for (let m = u + 1; m <= o; m++) {
    const d = W4[m];
    if (!d) throw new Error(`No migration registered for version ${m}`);
    d(c, s);
  }
}
let Gi = null;
async function f1() {
  return (
    Gi ||
    ((Gi = await k4(h1, ps, {
      upgrade(c, s, u, o) {
        try {
          F4(c, o, s, u ?? ps);
        } catch (m) {
          throw (console.error('[DB] Migration failed:', m), m);
        }
      },
    })),
    await I4(Gi),
    Gi)
  );
}
async function I4(c) {
  const s = c.transaction([Q.profile, Q.currencies, Q.machine, Q.weapons, Q.settings], 'readwrite'),
    [u, o, m, d] = await Promise.all([
      s.objectStore(Q.profile).get('singleton'),
      s.objectStore(Q.currencies).get('singleton'),
      s.objectStore(Q.weapons).get('singleton'),
      s.objectStore(Q.settings).get('singleton'),
    ]),
    h = Date.now(),
    y = [];
  (u || y.push(s.objectStore(Q.profile).put({ ...fp, createdAt: h, lastPlayedAt: h })),
    o || y.push(s.objectStore(Q.currencies).put(dp)),
    m || y.push(s.objectStore(Q.weapons).put(mp)),
    d || y.push(s.objectStore(Q.settings).put(hp)));
  const g = s.objectStore(Q.machine),
    p = await g.getAllKeys(),
    b = new Set(p);
  for (const T of v1) b.has(T) || y.push(g.put({ key: T, lv: 0 }));
  (await Promise.all(y), await s.done);
}
async function P4(c) {
  const s = c.transaction(
      [Q.profile, Q.currencies, Q.machine, Q.weapons, Q.patches, Q.equippedPatches, Q.settings],
      'readonly'
    ),
    [u, o, m, d, h, y, g] = await Promise.all([
      s.objectStore(Q.profile).get('singleton'),
      s.objectStore(Q.currencies).get('singleton'),
      s.objectStore(Q.machine).getAll(),
      s.objectStore(Q.weapons).get('singleton'),
      s.objectStore(Q.patches).getAll(),
      s.objectStore(Q.equippedPatches).getAll(),
      s.objectStore(Q.settings).get('singleton'),
    ]);
  if ((await s.done, !u || !o || !d || !g))
    throw new Error(
      '[DB] loadSaveState: Required singleton record is missing. Run openDatabase() first.'
    );
  return {
    profile: u,
    currencies: o,
    machine: m,
    weapons: d,
    patches: h,
    equippedPatches: y,
    settings: g,
  };
}
const C1 = 'tower-like-game:import-backups',
  ej = 3;
function tj() {
  try {
    const c = localStorage.getItem(C1);
    return c ? JSON.parse(c) : [];
  } catch {
    return [];
  }
}
function aj(c) {
  try {
    localStorage.setItem(C1, JSON.stringify(c));
  } catch (s) {
    console.warn('[DB] Failed to save backup to localStorage:', s);
  }
}
function lj(c) {
  const s = tj();
  s.unshift({ savedAt: Date.now(), data: c });
  const u = s.slice(0, ej);
  aj(u);
}
async function O1(c) {
  const s = await P4(c);
  return { formatVersion: 1, dbVersion: ps, exportedAt: Date.now(), data: s };
}
async function nj(c, s) {
  if (s.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${s.formatVersion}`);
  try {
    const d = await O1(c);
    lj(d);
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
const ij = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function cj() {
  const { navigate: c } = ul(),
    [s, u] = de.useState('sound'),
    o = async () => {
      const h = await f1(),
        y = await O1(h),
        g = JSON.stringify(y, null, 2),
        p = new Blob([g], { type: 'application/json' }),
        b = URL.createObjectURL(p),
        T = document.createElement('a');
      ((T.href = b),
        (T.download = `neon-spire-save-${new Date().toISOString().slice(0, 10)}.json`),
        T.click(),
        URL.revokeObjectURL(b));
    },
    m = async (h) => {
      const y = await h.text(),
        g = JSON.parse(y),
        p = await f1();
      (await nj(p, g), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(h1), window.location.reload());
    };
  return r.jsx(Bl, {
    header: r.jsx(Zi, {
      title: '設定',
      onBack: () => c('title'),
      currencies: [],
      tabBar: r.jsx(Ss, { tabs: ij, value: s, onChange: u, fullWidth: !0 }),
    }),
    footer: r.jsx(ki, { active: 'settings', onChange: c }),
    children: r.jsxs('div', {
      className: q3.content,
      children: [
        s === 'sound' && r.jsx(q4, {}),
        s === 'game' && r.jsx(_5, {}),
        s === 'data' && r.jsx(I3, { onExport: o, onImport: m, onReset: d }),
      ],
    }),
  });
}
const sj = '_layout_1c9in_1',
  uj = '_heroWrap_1c9in_12',
  d1 = { layout: sj, heroWrap: uj },
  oj = '_root_5udm7_1',
  rj = { root: oj };
function fj({ onResume: c, onNewGame: s, lastSavedAt: u }) {
  const m = X((d) => d.createdAt) > 0;
  return r.jsxs('div', {
    className: rj.root,
    children: [
      r.jsx(Ct, {
        label: m ? '続きから' : '続きから (セーブなし)',
        variant: m ? 'primary' : 'ghost',
        size: 'lg',
        fullWidth: !0,
        disabled: !m,
        iconLeft: r.jsx(Ee, { name: 'play', size: 18 }),
        onClick: c,
      }),
      m &&
        u != null &&
        r.jsx(G, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
          children: '最終セーブ: ' + u,
        }),
      r.jsx(Ct, {
        label: '新規開始',
        variant: m ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: r.jsx(Ee, { name: 'plus', size: 18 }),
        onClick: s,
      }),
    ],
  });
}
const dj = '_root_qkflo_2',
  mj = '_title_qkflo_12',
  m1 = { root: dj, title: mj };
function hj({ title: c = 'NEON SPIRE', subtitle: s, version: u, tagline: o }) {
  return r.jsxs('header', {
    className: m1.root,
    role: 'banner',
    children: [
      r.jsx('h1', { className: m1.title, children: c }),
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
const vj = '_root_1szye_1',
  yj = '_ringOuter_1szye_9',
  gj = '_ringMiddle_1szye_17',
  pj = '_glowDisc_1szye_24',
  _j = '_cornerAccent_1szye_31',
  bj = '_icon_1szye_40',
  Dn = { root: vj, ringOuter: yj, ringMiddle: gj, glowDisc: pj, cornerAccent: _j, icon: bj };
function Sj({ size: c = 180, iconName: s = 'tower' }) {
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
function xj(c) {
  if (c < 0) return '今';
  const s = Math.floor(c / 1e3);
  if (s < 60) return '今';
  const u = Math.floor(s / 60);
  if (u < 60) return `${u} 分前`;
  const o = Math.floor(u / 60);
  return o < 24 ? `${o} 時間前` : `${Math.floor(o / 24)} 日前`;
}
function jj() {
  const { navigate: c } = ul(),
    s = X((o) => o.createdAt),
    u = de.useMemo(() => (s > 0 ? xj(Date.now() - s) : void 0), [s]);
  return r.jsx(Bl, {
    children: r.jsxs('div', {
      className: d1.layout,
      children: [
        r.jsx(hj, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.1.0',
        }),
        r.jsx('div', { className: d1.heroWrap, children: r.jsx(Sj, {}) }),
        r.jsx(fj, {
          lastSavedAt: u,
          onResume: () => c('preparation'),
          onNewGame: () => c('preparation'),
        }),
      ],
    }),
  });
}
function Tj() {
  const { screen: c } = ul();
  switch (c) {
    case 'title':
      return r.jsx(jj, {});
    case 'preparation':
      return r.jsx(B3, {});
    case 'machine':
      return r.jsx(WS, {});
    case 'armory':
      return r.jsx(L_, {});
    case 'patches':
      return r.jsx(l3, {});
    case 'settings':
      return r.jsx(cj, {});
    case 'battle':
      return r.jsx(kS, {});
    default:
      return r.jsx(FS, {});
  }
}
const w1 = document.getElementById('root');
if (!w1) throw new Error('Failed to find #root element');
my.createRoot(w1).render(r.jsx(D_, { children: r.jsx(Tj, {}) }));
