var ly = Object.defineProperty;
var ny = (c, u, s) =>
  u in c ? ly(c, u, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (c[u] = s);
var Kt = (c, u, s) => ny(c, typeof u != 'symbol' ? u + '' : u, s);
(function () {
  const u = document.createElement('link').relList;
  if (u && u.supports && u.supports('modulepreload')) return;
  for (const m of document.querySelectorAll('link[rel="modulepreload"]')) o(m);
  new MutationObserver((m) => {
    for (const d of m)
      if (d.type === 'childList')
        for (const h of d.addedNodes) h.tagName === 'LINK' && h.rel === 'modulepreload' && o(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(m) {
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
    const d = s(m);
    fetch(m.href, d);
  }
})();
function iy(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var Yo = { exports: {} },
  Mi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jh;
function cy() {
  if (jh) return Mi;
  jh = 1;
  var c = Symbol.for('react.transitional.element'),
    u = Symbol.for('react.fragment');
  function s(o, m, d) {
    var h = null;
    if ((d !== void 0 && (h = '' + d), m.key !== void 0 && (h = '' + m.key), 'key' in m)) {
      d = {};
      for (var y in m) y !== 'key' && (d[y] = m[y]);
    } else d = m;
    return ((m = d.ref), { $$typeof: c, type: o, key: h, ref: m !== void 0 ? m : null, props: d });
  }
  return ((Mi.Fragment = u), (Mi.jsx = s), (Mi.jsxs = s), Mi);
}
var Th;
function sy() {
  return (Th || ((Th = 1), (Yo.exports = cy())), Yo.exports);
}
var r = sy(),
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
 */ var Ah;
function uy() {
  return (
    Ah ||
      ((Ah = 1),
      (function (c) {
        function u(R, V) {
          var F = R.length;
          R.push(V);
          e: for (; 0 < F; ) {
            var ge = (F - 1) >>> 1,
              pe = R[ge];
            if (0 < m(pe, V)) ((R[ge] = V), (R[F] = pe), (F = ge));
            else break e;
          }
        }
        function s(R) {
          return R.length === 0 ? null : R[0];
        }
        function o(R) {
          if (R.length === 0) return null;
          var V = R[0],
            F = R.pop();
          if (F !== V) {
            R[0] = F;
            e: for (var ge = 0, pe = R.length, x = pe >>> 1; ge < x; ) {
              var q = 2 * (ge + 1) - 1,
                $ = R[q],
                Y = q + 1,
                P = R[Y];
              if (0 > m($, F))
                Y < pe && 0 > m(P, $)
                  ? ((R[ge] = P), (R[Y] = F), (ge = Y))
                  : ((R[ge] = $), (R[q] = F), (ge = q));
              else if (Y < pe && 0 > m(P, F)) ((R[ge] = P), (R[Y] = F), (ge = Y));
              else break e;
            }
          }
          return V;
        }
        function m(R, V) {
          var F = R.sortIndex - V.sortIndex;
          return F !== 0 ? F : R.id - V.id;
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
        var _ = [],
          g = [],
          b = 1,
          T = null,
          z = 3,
          C = !1,
          O = !1,
          U = !1,
          H = !1,
          I = typeof setTimeout == 'function' ? setTimeout : null,
          J = typeof clearTimeout == 'function' ? clearTimeout : null,
          _e = typeof setImmediate < 'u' ? setImmediate : null;
        function ke(R) {
          for (var V = s(g); V !== null; ) {
            if (V.callback === null) o(g);
            else if (V.startTime <= R) (o(g), (V.sortIndex = V.expirationTime), u(_, V));
            else break;
            V = s(g);
          }
        }
        function lt(R) {
          if (((U = !1), ke(R), !O))
            if (s(_) !== null) ((O = !0), De || ((De = !0), Xe()));
            else {
              var V = s(g);
              V !== null && nt(lt, V.startTime - R);
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
            var R = c.unstable_now();
            rt = R;
            var V = !0;
            try {
              e: {
                ((O = !1), U && ((U = !1), J(ne), (ne = -1)), (C = !0));
                var F = z;
                try {
                  t: {
                    for (ke(R), T = s(_); T !== null && !(T.expirationTime > R && ut()); ) {
                      var ge = T.callback;
                      if (typeof ge == 'function') {
                        ((T.callback = null), (z = T.priorityLevel));
                        var pe = ge(T.expirationTime <= R);
                        if (((R = c.unstable_now()), typeof pe == 'function')) {
                          ((T.callback = pe), ke(R), (V = !0));
                          break t;
                        }
                        (T === s(_) && o(_), ke(R));
                      } else o(_);
                      T = s(_);
                    }
                    if (T !== null) V = !0;
                    else {
                      var x = s(g);
                      (x !== null && nt(lt, x.startTime - R), (V = !1));
                    }
                  }
                  break e;
                } finally {
                  ((T = null), (z = F), (C = !1));
                }
                V = void 0;
              }
            } finally {
              V ? Xe() : (De = !1);
            }
          }
        }
        var Xe;
        if (typeof _e == 'function')
          Xe = function () {
            _e(Be);
          };
        else if (typeof MessageChannel < 'u') {
          var Yt = new MessageChannel(),
            wt = Yt.port2;
          ((Yt.port1.onmessage = Be),
            (Xe = function () {
              wt.postMessage(null);
            }));
        } else
          Xe = function () {
            I(Be, 0);
          };
        function nt(R, V) {
          ne = I(function () {
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
            return z;
          }),
          (c.unstable_next = function (R) {
            switch (z) {
              case 1:
              case 2:
              case 3:
                var V = 3;
                break;
              default:
                V = z;
            }
            var F = z;
            z = V;
            try {
              return R();
            } finally {
              z = F;
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
            var F = z;
            z = R;
            try {
              return V();
            } finally {
              z = F;
            }
          }),
          (c.unstable_scheduleCallback = function (R, V, F) {
            var ge = c.unstable_now();
            switch (
              (typeof F == 'object' && F !== null
                ? ((F = F.delay), (F = typeof F == 'number' && 0 < F ? ge + F : ge))
                : (F = ge),
              R)
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
              (R = {
                id: b++,
                callback: V,
                priorityLevel: R,
                startTime: F,
                expirationTime: pe,
                sortIndex: -1,
              }),
              F > ge
                ? ((R.sortIndex = F),
                  u(g, R),
                  s(_) === null &&
                    R === s(g) &&
                    (U ? (J(ne), (ne = -1)) : (U = !0), nt(lt, F - ge)))
                : ((R.sortIndex = pe), u(_, R), O || C || ((O = !0), De || ((De = !0), Xe()))),
              R
            );
          }),
          (c.unstable_shouldYield = ut),
          (c.unstable_wrapCallback = function (R) {
            var V = z;
            return function () {
              var F = z;
              z = V;
              try {
                return R.apply(this, arguments);
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
function oy() {
  return (Nh || ((Nh = 1), (Xo.exports = uy())), Xo.exports);
}
var Ko = { exports: {} },
  ee = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eh;
function ry() {
  if (Eh) return ee;
  Eh = 1;
  var c = Symbol.for('react.transitional.element'),
    u = Symbol.for('react.portal'),
    s = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    m = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    y = Symbol.for('react.forward_ref'),
    _ = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    T = Symbol.for('react.activity'),
    z = Symbol.iterator;
  function C(x) {
    return x === null || typeof x != 'object'
      ? null
      : ((x = (z && x[z]) || x['@@iterator']), typeof x == 'function' ? x : null);
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
  function I(x, q, $) {
    ((this.props = x), (this.context = q), (this.refs = H), (this.updater = $ || O));
  }
  ((I.prototype.isReactComponent = {}),
    (I.prototype.setState = function (x, q) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, q, 'setState');
    }),
    (I.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function J() {}
  J.prototype = I.prototype;
  function _e(x, q, $) {
    ((this.props = x), (this.context = q), (this.refs = H), (this.updater = $ || O));
  }
  var ke = (_e.prototype = new J());
  ((ke.constructor = _e), U(ke, I.prototype), (ke.isPureReactComponent = !0));
  var lt = Array.isArray;
  function De() {}
  var ne = { H: null, A: null, T: null, S: null },
    Ze = Object.prototype.hasOwnProperty;
  function rt(x, q, $) {
    var Y = $.ref;
    return { $$typeof: c, type: x, key: q, ref: Y !== void 0 ? Y : null, props: $ };
  }
  function ut(x, q) {
    return rt(x.type, q, x.props);
  }
  function Be(x) {
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
  var Yt = /\/+/g;
  function wt(x, q) {
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
            ? x.then(De, De)
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
  function R(x, q, $, Y, P) {
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
            case u:
              me = !0;
              break;
            case b:
              return ((me = x._init), R(me(x._payload), q, $, Y, P));
          }
      }
    if (me)
      return (
        (P = P(x)),
        (me = Y === '' ? '.' + wt(x, 0) : Y),
        lt(P)
          ? (($ = ''),
            me != null && ($ = me.replace(Yt, '$&/') + '/'),
            R(P, q, $, '', function (rl) {
              return rl;
            }))
          : P != null &&
            (Be(P) &&
              (P = ut(
                P,
                $ +
                  (P.key == null || (x && x.key === P.key)
                    ? ''
                    : ('' + P.key).replace(Yt, '$&/') + '/') +
                  me
              )),
            q.push(P)),
        1
      );
    me = 0;
    var We = Y === '' ? '.' : Y + ':';
    if (lt(x))
      for (var we = 0; we < x.length; we++)
        ((Y = x[we]), (ie = We + wt(Y, we)), (me += R(Y, q, $, ie, P)));
    else if (((we = C(x)), typeof we == 'function'))
      for (x = we.call(x), we = 0; !(Y = x.next()).done; )
        ((Y = Y.value), (ie = We + wt(Y, we++)), (me += R(Y, q, $, ie, P)));
    else if (ie === 'object') {
      if (typeof x.then == 'function') return R(nt(x), q, $, Y, P);
      throw (
        (q = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (q === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : q) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return me;
  }
  function V(x, q, $) {
    if (x == null) return x;
    var Y = [],
      P = 0;
    return (
      R(x, Y, '', '', function (ie) {
        return q.call($, ie, P++);
      }),
      Y
    );
  }
  function F(x) {
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
  var ge =
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
    pe = {
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
        if (!Be(x))
          throw Error('React.Children.only expected to receive a single React element child.');
        return x;
      },
    };
  return (
    (ee.Activity = T),
    (ee.Children = pe),
    (ee.Component = I),
    (ee.Fragment = s),
    (ee.Profiler = m),
    (ee.PureComponent = _e),
    (ee.StrictMode = o),
    (ee.Suspense = _),
    (ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne),
    (ee.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return ne.H.useMemoCache(x);
      },
    }),
    (ee.cache = function (x) {
      return function () {
        return x.apply(null, arguments);
      };
    }),
    (ee.cacheSignal = function () {
      return null;
    }),
    (ee.cloneElement = function (x, q, $) {
      if (x == null) throw Error('The argument must be a React element, but you passed ' + x + '.');
      var Y = U({}, x.props),
        P = x.key;
      if (q != null)
        for (ie in (q.key !== void 0 && (P = '' + q.key), q))
          !Ze.call(q, ie) ||
            ie === 'key' ||
            ie === '__self' ||
            ie === '__source' ||
            (ie === 'ref' && q.ref === void 0) ||
            (Y[ie] = q[ie]);
      var ie = arguments.length - 2;
      if (ie === 1) Y.children = $;
      else if (1 < ie) {
        for (var me = Array(ie), We = 0; We < ie; We++) me[We] = arguments[We + 2];
        Y.children = me;
      }
      return rt(x.type, P, Y);
    }),
    (ee.createContext = function (x) {
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
    (ee.createElement = function (x, q, $) {
      var Y,
        P = {},
        ie = null;
      if (q != null)
        for (Y in (q.key !== void 0 && (ie = '' + q.key), q))
          Ze.call(q, Y) && Y !== 'key' && Y !== '__self' && Y !== '__source' && (P[Y] = q[Y]);
      var me = arguments.length - 2;
      if (me === 1) P.children = $;
      else if (1 < me) {
        for (var We = Array(me), we = 0; we < me; we++) We[we] = arguments[we + 2];
        P.children = We;
      }
      if (x && x.defaultProps)
        for (Y in ((me = x.defaultProps), me)) P[Y] === void 0 && (P[Y] = me[Y]);
      return rt(x, ie, P);
    }),
    (ee.createRef = function () {
      return { current: null };
    }),
    (ee.forwardRef = function (x) {
      return { $$typeof: y, render: x };
    }),
    (ee.isValidElement = Be),
    (ee.lazy = function (x) {
      return { $$typeof: b, _payload: { _status: -1, _result: x }, _init: F };
    }),
    (ee.memo = function (x, q) {
      return { $$typeof: g, type: x, compare: q === void 0 ? null : q };
    }),
    (ee.startTransition = function (x) {
      var q = ne.T,
        $ = {};
      ne.T = $;
      try {
        var Y = x(),
          P = ne.S;
        (P !== null && P($, Y),
          typeof Y == 'object' && Y !== null && typeof Y.then == 'function' && Y.then(De, ge));
      } catch (ie) {
        ge(ie);
      } finally {
        (q !== null && $.types !== null && (q.types = $.types), (ne.T = q));
      }
    }),
    (ee.unstable_useCacheRefresh = function () {
      return ne.H.useCacheRefresh();
    }),
    (ee.use = function (x) {
      return ne.H.use(x);
    }),
    (ee.useActionState = function (x, q, $) {
      return ne.H.useActionState(x, q, $);
    }),
    (ee.useCallback = function (x, q) {
      return ne.H.useCallback(x, q);
    }),
    (ee.useContext = function (x) {
      return ne.H.useContext(x);
    }),
    (ee.useDebugValue = function () {}),
    (ee.useDeferredValue = function (x, q) {
      return ne.H.useDeferredValue(x, q);
    }),
    (ee.useEffect = function (x, q) {
      return ne.H.useEffect(x, q);
    }),
    (ee.useEffectEvent = function (x) {
      return ne.H.useEffectEvent(x);
    }),
    (ee.useId = function () {
      return ne.H.useId();
    }),
    (ee.useImperativeHandle = function (x, q, $) {
      return ne.H.useImperativeHandle(x, q, $);
    }),
    (ee.useInsertionEffect = function (x, q) {
      return ne.H.useInsertionEffect(x, q);
    }),
    (ee.useLayoutEffect = function (x, q) {
      return ne.H.useLayoutEffect(x, q);
    }),
    (ee.useMemo = function (x, q) {
      return ne.H.useMemo(x, q);
    }),
    (ee.useOptimistic = function (x, q) {
      return ne.H.useOptimistic(x, q);
    }),
    (ee.useReducer = function (x, q, $) {
      return ne.H.useReducer(x, q, $);
    }),
    (ee.useRef = function (x) {
      return ne.H.useRef(x);
    }),
    (ee.useState = function (x) {
      return ne.H.useState(x);
    }),
    (ee.useSyncExternalStore = function (x, q, $) {
      return ne.H.useSyncExternalStore(x, q, $);
    }),
    (ee.useTransition = function () {
      return ne.H.useTransition();
    }),
    (ee.version = '19.2.5'),
    ee
  );
}
var zh;
function dr() {
  return (zh || ((zh = 1), (Ko.exports = ry())), Ko.exports);
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
function fy() {
  if (Mh) return it;
  Mh = 1;
  var c = dr();
  function u(_) {
    var g = 'https://react.dev/errors/' + _;
    if (1 < arguments.length) {
      g += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++) g += '&args[]=' + encodeURIComponent(arguments[b]);
    }
    return (
      'Minified React error #' +
      _ +
      '; visit ' +
      g +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function s() {}
  var o = {
      d: {
        f: s,
        r: function () {
          throw Error(u(522));
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
    m = Symbol.for('react.portal');
  function d(_, g, b) {
    var T = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: T == null ? null : '' + T,
      children: _,
      containerInfo: g,
      implementation: b,
    };
  }
  var h = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function y(_, g) {
    if (_ === 'font') return '';
    if (typeof g == 'string') return g === 'use-credentials' ? g : '';
  }
  return (
    (it.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (it.createPortal = function (_, g) {
      var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(u(299));
      return d(_, g, null, b);
    }),
    (it.flushSync = function (_) {
      var g = h.T,
        b = o.p;
      try {
        if (((h.T = null), (o.p = 2), _)) return _();
      } finally {
        ((h.T = g), (o.p = b), o.d.f());
      }
    }),
    (it.preconnect = function (_, g) {
      typeof _ == 'string' &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
          : (g = null),
        o.d.C(_, g));
    }),
    (it.prefetchDNS = function (_) {
      typeof _ == 'string' && o.d.D(_);
    }),
    (it.preinit = function (_, g) {
      if (typeof _ == 'string' && g && typeof g.as == 'string') {
        var b = g.as,
          T = y(b, g.crossOrigin),
          z = typeof g.integrity == 'string' ? g.integrity : void 0,
          C = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
        b === 'style'
          ? o.d.S(_, typeof g.precedence == 'string' ? g.precedence : void 0, {
              crossOrigin: T,
              integrity: z,
              fetchPriority: C,
            })
          : b === 'script' &&
            o.d.X(_, {
              crossOrigin: T,
              integrity: z,
              fetchPriority: C,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
      }
    }),
    (it.preinitModule = function (_, g) {
      if (typeof _ == 'string')
        if (typeof g == 'object' && g !== null) {
          if (g.as == null || g.as === 'script') {
            var b = y(g.as, g.crossOrigin);
            o.d.M(_, {
              crossOrigin: b,
              integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
          }
        } else g == null && o.d.M(_);
    }),
    (it.preload = function (_, g) {
      if (typeof _ == 'string' && typeof g == 'object' && g !== null && typeof g.as == 'string') {
        var b = g.as,
          T = y(b, g.crossOrigin);
        o.d.L(_, b, {
          crossOrigin: T,
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
    (it.preloadModule = function (_, g) {
      if (typeof _ == 'string')
        if (g) {
          var b = y(g.as, g.crossOrigin);
          o.d.m(_, {
            as: typeof g.as == 'string' && g.as !== 'script' ? g.as : void 0,
            crossOrigin: b,
            integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          });
        } else o.d.m(_);
    }),
    (it.requestFormReset = function (_) {
      o.d.r(_);
    }),
    (it.unstable_batchedUpdates = function (_, g) {
      return _(g);
    }),
    (it.useFormState = function (_, g, b) {
      return h.H.useFormState(_, g, b);
    }),
    (it.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (it.version = '19.2.5'),
    it
  );
}
var Ch;
function dy() {
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
      } catch (u) {
        console.error(u);
      }
  }
  return (c(), (Jo.exports = fy()), Jo.exports);
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
function my() {
  if (wh) return Ci;
  wh = 1;
  var c = oy(),
    u = dr(),
    s = dy();
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
  function _(e) {
    if (d(e) !== e) throw Error(o(188));
  }
  function g(e) {
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
          if (i === a) return (_(n), e);
          if (i === l) return (_(n), t);
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
    C = Symbol.for('react.transitional.element'),
    O = Symbol.for('react.portal'),
    U = Symbol.for('react.fragment'),
    H = Symbol.for('react.strict_mode'),
    I = Symbol.for('react.profiler'),
    J = Symbol.for('react.consumer'),
    _e = Symbol.for('react.context'),
    ke = Symbol.for('react.forward_ref'),
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
  var Yt = Symbol.for('react.client.reference');
  function wt(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === Yt ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case U:
        return 'Fragment';
      case I:
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
        case O:
          return 'Portal';
        case _e:
          return e.displayName || 'Context';
        case J:
          return (e._context.displayName || 'Context') + '.Consumer';
        case ke:
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
    R = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    V = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    F = { pending: !1, data: null, method: null, action: null },
    ge = [],
    pe = -1;
  function x(e) {
    return { current: e };
  }
  function q(e) {
    0 > pe || ((e.current = ge[pe]), (ge[pe] = null), pe--);
  }
  function $(e, t) {
    (pe++, (ge[pe] = e.current), (e.current = t));
  }
  var Y = x(null),
    P = x(null),
    ie = x(null),
    me = x(null);
  function We(e, t) {
    switch (($(ie, t), $(P, e), $(Y, null), t.nodeType)) {
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
    (q(Y), $(Y, e));
  }
  function we() {
    (q(Y), q(P), q(ie));
  }
  function rl(e) {
    e.memoizedState !== null && $(me, e);
    var t = Y.current,
      a = Qm(t, e.type);
    t !== a && ($(P, e), $(Y, a));
  }
  function Ul(e) {
    (P.current === e && (q(Y), q(P)), me.current === e && (q(me), (Ai._currentValue = F)));
  }
  var Gl, Es;
  function za(e) {
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
  var Xi = !1;
  function te(e, t) {
    if (!e || Xi) return '';
    Xi = !0;
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
                  var E = M;
                }
                Reflect.construct(e, [], L);
              } else {
                try {
                  L.call();
                } catch (M) {
                  E = M;
                }
                e.call(L.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (M) {
                E = M;
              }
              (L = e()) && typeof L.catch == 'function' && L.catch(function () {});
            }
          } catch (M) {
            if (M && E && typeof M.stack == 'string') return [M.stack, E.stack];
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
      ((Xi = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? za(a) : '';
  }
  function Qi(e, t) {
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
        return te(e.type, !1);
      case 11:
        return te(e.type.render, !1);
      case 1:
        return te(e.type, !0);
      case 31:
        return za('Activity');
      default:
        return '';
    }
  }
  function Ln(e) {
    try {
      var t = '',
        a = null;
      do ((t += Qi(e, a)), (a = e), (e = e.return));
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
    B1 = c.unstable_shouldYield,
    L1 = c.unstable_requestPaint,
    gt = c.unstable_now,
    q1 = c.unstable_getCurrentPriorityLevel,
    jr = c.unstable_ImmediatePriority,
    Tr = c.unstable_UserBlockingPriority,
    Ki = c.unstable_NormalPriority,
    H1 = c.unstable_LowPriority,
    Ar = c.unstable_IdlePriority,
    U1 = c.log,
    G1 = c.unstable_setDisableYieldValue,
    qn = null,
    pt = null;
  function Ma(e) {
    if ((typeof U1 == 'function' && G1(e), pt && typeof pt.setStrictMode == 'function'))
      try {
        pt.setStrictMode(qn, e);
      } catch {}
  }
  var bt = Math.clz32 ? Math.clz32 : k1,
    V1 = Math.log,
    $1 = Math.LN2;
  function k1(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((V1(e) / $1) | 0)) | 0);
  }
  var Ji = 256,
    Wi = 262144,
    Fi = 4194304;
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
  function Ii(e, t, a) {
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
  function Hn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Y1(e, t) {
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
    var e = Fi;
    return ((Fi <<= 1), (Fi & 62914560) === 0 && (Fi = 4194304), e);
  }
  function ws(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Un(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Z1(e, t, a, l, n, i) {
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
      var w = 31 - bt(a),
        L = 1 << w;
      ((v[w] = 0), (p[w] = -1));
      var E = N[w];
      if (E !== null)
        for (N[w] = null, w = 0; w < E.length; w++) {
          var M = E[w];
          M !== null && (M.lane &= -536870913);
        }
      a &= ~L;
    }
    (l !== 0 && Er(e, l, 0),
      i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(f & ~t)));
  }
  function Er(e, t, a) {
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
    var e = V.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : yh(e.type));
  }
  function wr(e, t) {
    var a = V.p;
    try {
      return ((V.p = e), t());
    } finally {
      V.p = a;
    }
  }
  var Ca = Math.random().toString(36).slice(2),
    Fe = '__reactFiber$' + Ca,
    ft = '__reactProps$' + Ca,
    Vl = '__reactContainer$' + Ca,
    Ds = '__reactEvents$' + Ca,
    X1 = '__reactListeners$' + Ca,
    Q1 = '__reactHandles$' + Ca,
    Or = '__reactResources$' + Ca,
    Gn = '__reactMarker$' + Ca;
  function Bs(e) {
    (delete e[Fe], delete e[ft], delete e[Ds], delete e[X1], delete e[Q1]);
  }
  function $l(e) {
    var t = e[Fe];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Vl] || a[Fe])) {
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
    if ((e = e[Fe] || e[Vl])) {
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
  var Rr = new Set(),
    Dr = {};
  function dl(e, t) {
    (Zl(e, t), Zl(e + 'Capture', t));
  }
  function Zl(e, t) {
    for (Dr[e] = t, e = 0; e < t.length; e++) Rr.add(t[e]);
  }
  var K1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Br = {},
    Lr = {};
  function J1(e) {
    return zs.call(Lr, e)
      ? !0
      : zs.call(Br, e)
        ? !1
        : K1.test(e)
          ? (Lr[e] = !0)
          : ((Br[e] = !0), !1);
  }
  function Pi(e, t, a) {
    if (J1(t))
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
  function ec(e, t, a) {
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
  function ca(e, t, a, l) {
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
  function W1(e, t, a) {
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
      e._valueTracker = W1(e, t, '' + e[t]);
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
  function tc(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var F1 = /[\n"\\]/g;
  function Rt(e) {
    return e.replace(F1, function (t) {
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
    (t === 'number' && tc(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function Xl(e, t, a, l) {
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
  function Ql(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var I1 = new Set(
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
        : typeof a != 'number' || a === 0 || I1.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function kr(e, t, a) {
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
  var P1 = new Map([
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
    e0 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ac(e) {
    return e0.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function sa() {}
  var Gs = null;
  function Vs(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Kl = null,
    Jl = null;
  function Yr(e) {
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
          ((t = a.value), t != null && Xl(e, !!a.multiple, t, !1));
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
        (Kl !== null || Jl !== null) &&
          (kc(), Kl && ((t = Kl), (e = Jl), (Jl = Kl = null), Yr(t), e)))
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
  var ua = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    ks = !1;
  if (ua)
    try {
      var kn = {};
      (Object.defineProperty(kn, 'passive', {
        get: function () {
          ks = !0;
        },
      }),
        window.addEventListener('test', kn, kn),
        window.removeEventListener('test', kn, kn));
    } catch {
      ks = !1;
    }
  var wa = null,
    Ys = null,
    lc = null;
  function Xr() {
    if (lc) return lc;
    var e,
      t = Ys,
      a = t.length,
      l,
      n = 'value' in wa ? wa.value : wa.textContent,
      i = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++);
    var f = a - e;
    for (l = 1; l <= f && t[a - l] === n[i - l]; l++);
    return (lc = n.slice(e, 1 < l ? 1 - l : void 0));
  }
  function nc(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ic() {
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
          ? ic
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
            (this.isDefaultPrevented = ic));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = ic));
        },
        persist: function () {},
        isPersistent: ic,
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
    cc = dt(ml),
    Yn = T({}, ml, { view: 0, detail: 0 }),
    t0 = dt(Yn),
    Zs,
    Xs,
    Zn,
    sc = T({}, Yn, {
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
    Kr = dt(sc),
    a0 = T({}, sc, { dataTransfer: 0 }),
    l0 = dt(a0),
    n0 = T({}, Yn, { relatedTarget: 0 }),
    Qs = dt(n0),
    i0 = T({}, ml, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    c0 = dt(i0),
    s0 = T({}, ml, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    u0 = dt(s0),
    o0 = T({}, ml, { data: 0 }),
    Jr = dt(o0),
    r0 = {
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
    f0 = {
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
    d0 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function m0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = d0[e]) ? !!t[e] : !1;
  }
  function Ks() {
    return m0;
  }
  var h0 = T({}, Yn, {
      key: function (e) {
        if (e.key) {
          var t = r0[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = nc(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? f0[e.keyCode] || 'Unidentified'
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
        return e.type === 'keypress' ? nc(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? nc(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    v0 = dt(h0),
    y0 = T({}, sc, {
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
    Wr = dt(y0),
    _0 = T({}, Yn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ks,
    }),
    g0 = dt(_0),
    p0 = T({}, ml, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    b0 = dt(p0),
    S0 = T({}, sc, {
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
    x0 = dt(S0),
    j0 = T({}, ml, { newState: 0, oldState: 0 }),
    T0 = dt(j0),
    A0 = [9, 13, 27, 32],
    Js = ua && 'CompositionEvent' in window,
    Xn = null;
  ua && 'documentMode' in document && (Xn = document.documentMode);
  var N0 = ua && 'TextEvent' in window && !Xn,
    Fr = ua && (!Js || (Xn && 8 < Xn && 11 >= Xn)),
    Ir = ' ',
    Pr = !1;
  function ef(e, t) {
    switch (e) {
      case 'keyup':
        return A0.indexOf(t.keyCode) !== -1;
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
  var Wl = !1;
  function E0(e, t) {
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
  function z0(e, t) {
    if (Wl)
      return e === 'compositionend' || (!Js && ef(e, t))
        ? ((e = Xr()), (lc = Ys = wa = null), (Wl = !1), e)
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
  var M0 = {
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
    return t === 'input' ? !!M0[e.type] : t === 'textarea';
  }
  function lf(e, t, a, l) {
    (Kl ? (Jl ? Jl.push(l) : (Jl = [l])) : (Kl = l),
      (t = Wc(t, 'onChange')),
      0 < t.length &&
        ((a = new cc('onChange', 'change', null, a, l)), e.push({ event: a, listeners: t })));
  }
  var Qn = null,
    Kn = null;
  function C0(e) {
    Gm(e, 0);
  }
  function uc(e) {
    var t = Vn(e);
    if (Hr(t)) return e;
  }
  function nf(e, t) {
    if (e === 'change') return t;
  }
  var cf = !1;
  if (ua) {
    var Ws;
    if (ua) {
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
    Qn && (Qn.detachEvent('onpropertychange', of), (Kn = Qn = null));
  }
  function of(e) {
    if (e.propertyName === 'value' && uc(Kn)) {
      var t = [];
      (lf(t, Kn, e, Vs(e)), Zr(C0, t));
    }
  }
  function w0(e, t, a) {
    e === 'focusin'
      ? (uf(), (Qn = t), (Kn = a), Qn.attachEvent('onpropertychange', of))
      : e === 'focusout' && uf();
  }
  function O0(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return uc(Kn);
  }
  function R0(e, t) {
    if (e === 'click') return uc(t);
  }
  function D0(e, t) {
    if (e === 'input' || e === 'change') return uc(t);
  }
  function B0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var St = typeof Object.is == 'function' ? Object.is : B0;
  function Jn(e, t) {
    if (St(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!zs.call(t, n) || !St(e[n], t[n])) return !1;
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
    for (var t = tc(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = tc(e.document);
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
  var L0 = ua && 'documentMode' in document && 11 >= document.documentMode,
    Fl = null,
    Ps = null,
    Wn = null,
    eu = !1;
  function hf(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    eu ||
      Fl == null ||
      Fl !== tc(l) ||
      ((l = Fl),
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
        (l = Wc(Ps, 'onSelect')),
        0 < l.length &&
          ((t = new cc('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: l }),
          (t.target = Fl))));
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
  var Il = {
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
  ua &&
    ((vf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Il.animationend.animation,
      delete Il.animationiteration.animation,
      delete Il.animationstart.animation),
    'TransitionEvent' in window || delete Il.transitionend.transition);
  function vl(e) {
    if (tu[e]) return tu[e];
    if (!Il[e]) return e;
    var t = Il[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in vf) return (tu[e] = t[a]);
    return e;
  }
  var yf = vl('animationend'),
    _f = vl('animationiteration'),
    gf = vl('animationstart'),
    q0 = vl('transitionrun'),
    H0 = vl('transitionstart'),
    U0 = vl('transitioncancel'),
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
  var oc =
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
    Pl = 0,
    lu = 0;
  function rc() {
    for (var e = Pl, t = (lu = Pl = 0); t < e; ) {
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
  function fc(e, t, a, l) {
    ((Dt[Pl++] = e),
      (Dt[Pl++] = t),
      (Dt[Pl++] = a),
      (Dt[Pl++] = l),
      (lu |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l));
  }
  function nu(e, t, a, l) {
    return (fc(e, t, a, l), dc(e));
  }
  function yl(e, t) {
    return (fc(e, null, null, t), dc(e));
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
          ((n = 31 - bt(a)),
          (e = i.hiddenUpdates),
          (l = e[n]),
          l === null ? (e[n] = [t]) : l.push(t),
          (t.lane = a | 536870912)),
        i)
      : null;
  }
  function dc(e) {
    if (50 < gi) throw ((gi = 0), (ho = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var en = {};
  function G0(e, t, a, l) {
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
    return new G0(e, t, a, l);
  }
  function iu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function oa(e, t) {
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
  function mc(e, t, a, l, n, i) {
    var f = 0;
    if (((l = e), typeof e == 'function')) iu(e) && (f = 1);
    else if (typeof e == 'string')
      f = Zv(e, a, Y.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case rt:
          return ((e = xt(31, a, t, n)), (e.elementType = rt), (e.lanes = i), e);
        case U:
          return _l(a.children, n, i, t);
        case H:
          ((f = 8), (n |= 24));
          break;
        case I:
          return ((e = xt(12, a, t, n | 2)), (e.elementType = I), (e.lanes = i), e);
        case lt:
          return ((e = xt(13, a, t, n)), (e.elementType = lt), (e.lanes = i), e);
        case De:
          return ((e = xt(19, a, t, n)), (e.elementType = De), (e.lanes = i), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case _e:
                f = 10;
                break e;
              case J:
                f = 9;
                break e;
              case ke:
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
  function _l(e, t, a, l) {
    return ((e = xt(7, e, l, t)), (e.lanes = a), e);
  }
  function cu(e, t, a) {
    return ((e = xt(6, e, null, t)), (e.lanes = a), e);
  }
  function jf(e) {
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
  var Tf = new WeakMap();
  function Bt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = Tf.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: Ln(t) }), Tf.set(e, t), t);
    }
    return { value: e, source: t, stack: Ln(t) };
  }
  var tn = [],
    an = 0,
    hc = null,
    Fn = 0,
    Lt = [],
    qt = 0,
    Oa = null,
    ea = 1,
    ta = '';
  function ra(e, t) {
    ((tn[an++] = Fn), (tn[an++] = hc), (hc = e), (Fn = t));
  }
  function Af(e, t, a) {
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
    e.return !== null && (ra(e, 1), Af(e, 1, 0));
  }
  function ou(e) {
    for (; e === hc; ) ((hc = tn[--an]), (tn[an] = null), (Fn = tn[--an]), (tn[an] = null));
    for (; e === Oa; )
      ((Oa = Lt[--qt]),
        (Lt[qt] = null),
        (ta = Lt[--qt]),
        (Lt[qt] = null),
        (ea = Lt[--qt]),
        (Lt[qt] = null));
  }
  function Nf(e, t) {
    ((Lt[qt++] = ea), (Lt[qt++] = ta), (Lt[qt++] = Oa), (ea = t.id), (ta = t.overflow), (Oa = e));
  }
  var Ie = null,
    ze = null,
    fe = !1,
    Ra = null,
    Ht = !1,
    ru = Error(o(519));
  function Da(e) {
    var t = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (In(Bt(t, e)), ru);
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
      Ym(t.textContent, a)
        ? (l.popover != null && (se('beforetoggle', t), se('toggle', t)),
          l.onScroll != null && se('scroll', t),
          l.onScrollEnd != null && se('scrollend', t),
          l.onClick != null && (t.onclick = sa),
          (t = !0))
        : (t = !1),
      t || Da(e, !0));
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
  function ln(e) {
    if (e !== Ie) return !1;
    if (!fe) return (zf(e), (fe = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || Mo(e.type, e.memoizedProps))),
        (a = !a)),
      a && ze && Da(e),
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
        ? ((t = ze), Ka(e.type) ? ((e = Do), (Do = null), (ze = e)) : (ze = t))
        : (ze = Ie ? Gt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function gl() {
    ((ze = Ie = null), (fe = !1));
  }
  function fu() {
    var e = Ra;
    return (e !== null && (yt === null ? (yt = e) : yt.push.apply(yt, e), (Ra = null)), e);
  }
  function In(e) {
    Ra === null ? (Ra = [e]) : Ra.push(e);
  }
  var du = x(null),
    pl = null,
    fa = null;
  function Ba(e, t, a) {
    ($(du, t._currentValue), (t._currentValue = a));
  }
  function da(e) {
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
  function nn(e, t, a, l) {
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
      } else if (n === me.current) {
        if (((f = n.alternate), f === null)) throw Error(o(387));
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(Ai) : (e = [Ai]));
      }
      n = n.return;
    }
    (e !== null && hu(t, e, a, l), (t.flags |= 262144));
  }
  function vc(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!St(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function bl(e) {
    ((pl = e), (fa = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function Pe(e) {
    return Mf(pl, e);
  }
  function yc(e, t) {
    return (pl === null && bl(e), Mf(e, t));
  }
  function Mf(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), fa === null)) {
      if (e === null) throw Error(o(308));
      ((fa = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else fa = fa.next = t;
    return a;
  }
  var V0 =
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
    $0 = c.unstable_scheduleCallback,
    k0 = c.unstable_NormalPriority,
    He = {
      $$typeof: _e,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function vu() {
    return { controller: new V0(), data: new Map(), refCount: 0 };
  }
  function Pn(e) {
    (e.refCount--,
      e.refCount === 0 &&
        $0(k0, function () {
          e.controller.abort();
        }));
  }
  var ei = null,
    yu = 0,
    cn = 0,
    sn = null;
  function Y0(e, t) {
    if (ei === null) {
      var a = (ei = []);
      ((yu = 0),
        (cn = bo()),
        (sn = {
          status: 'pending',
          value: void 0,
          then: function (l) {
            a.push(l);
          },
        }));
    }
    return (yu++, t.then(Cf, Cf), t);
  }
  function Cf() {
    if (--yu === 0 && ei !== null) {
      sn !== null && (sn.status = 'fulfilled');
      var e = ei;
      ((ei = null), (cn = 0), (sn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Z0(e, t) {
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
  var wf = R.S;
  R.S = function (e, t) {
    ((hm = gt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Y0(e, t),
      wf !== null && wf(e, t));
  };
  var Sl = x(null);
  function _u() {
    var e = Sl.current;
    return e !== null ? e : Ne.pooledCache;
  }
  function _c(e, t) {
    t === null ? $(Sl, Sl.current) : $(Sl, t.pool);
  }
  function Of() {
    var e = _u();
    return e === null ? null : { parent: He._currentValue, pool: e };
  }
  var un = Error(o(460)),
    gu = Error(o(474)),
    gc = Error(o(542)),
    pc = { then: function () {} };
  function Rf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Df(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(sa, sa), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Lf(e), e);
      default:
        if (typeof t.status == 'string') t.then(sa, sa);
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
        throw ((jl = t), un);
    }
  }
  function xl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((jl = a), un) : a;
    }
  }
  var jl = null;
  function Bf() {
    if (jl === null) throw Error(o(459));
    var e = jl;
    return ((jl = null), e);
  }
  function Lf(e) {
    if (e === un || e === gc) throw Error(o(483));
  }
  var on = null,
    ti = 0;
  function bc(e) {
    var t = ti;
    return ((ti += 1), on === null && (on = []), Df(on, e, t));
  }
  function ai(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Sc(e, t) {
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
      return ((j = oa(j, S)), (j.index = 0), (j.sibling = null), j);
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
    function p(j, S, A, B) {
      var K = A.type;
      return K === U
        ? w(j, S, A.props.children, B, A.key)
        : S !== null &&
            (S.elementType === K ||
              (typeof K == 'object' && K !== null && K.$$typeof === Ze && xl(K) === S.type))
          ? ((S = n(S, A.props)), ai(S, A), (S.return = j), S)
          : ((S = mc(A.type, A.key, A.props, null, j.mode, B)), ai(S, A), (S.return = j), S);
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
        ? ((S = _l(A, j.mode, B, K)), (S.return = j), S)
        : ((S = n(S, A)), (S.return = j), S);
    }
    function L(j, S, A) {
      if ((typeof S == 'string' && S !== '') || typeof S == 'number' || typeof S == 'bigint')
        return ((S = cu('' + S, j.mode, A)), (S.return = j), S);
      if (typeof S == 'object' && S !== null) {
        switch (S.$$typeof) {
          case C:
            return ((A = mc(S.type, S.key, S.props, null, j.mode, A)), ai(A, S), (A.return = j), A);
          case O:
            return ((S = su(S, j.mode, A)), (S.return = j), S);
          case Ze:
            return ((S = xl(S)), L(j, S, A));
        }
        if (nt(S) || Xe(S)) return ((S = _l(S, j.mode, A, null)), (S.return = j), S);
        if (typeof S.then == 'function') return L(j, bc(S), A);
        if (S.$$typeof === _e) return L(j, yc(j, S), A);
        Sc(j, S);
      }
      return null;
    }
    function E(j, S, A, B) {
      var K = S !== null ? S.key : null;
      if ((typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint')
        return K !== null ? null : v(j, S, '' + A, B);
      if (typeof A == 'object' && A !== null) {
        switch (A.$$typeof) {
          case C:
            return A.key === K ? p(j, S, A, B) : null;
          case O:
            return A.key === K ? N(j, S, A, B) : null;
          case Ze:
            return ((A = xl(A)), E(j, S, A, B));
        }
        if (nt(A) || Xe(A)) return K !== null ? null : w(j, S, A, B, null);
        if (typeof A.then == 'function') return E(j, S, bc(A), B);
        if (A.$$typeof === _e) return E(j, S, yc(j, A), B);
        Sc(j, A);
      }
      return null;
    }
    function M(j, S, A, B, K) {
      if ((typeof B == 'string' && B !== '') || typeof B == 'number' || typeof B == 'bigint')
        return ((j = j.get(A) || null), v(S, j, '' + B, K));
      if (typeof B == 'object' && B !== null) {
        switch (B.$$typeof) {
          case C:
            return ((j = j.get(B.key === null ? A : B.key) || null), p(S, j, B, K));
          case O:
            return ((j = j.get(B.key === null ? A : B.key) || null), N(S, j, B, K));
          case Ze:
            return ((B = xl(B)), M(j, S, A, B, K));
        }
        if (nt(B) || Xe(B)) return ((j = j.get(A) || null), w(S, j, B, K, null));
        if (typeof B.then == 'function') return M(j, S, A, bc(B), K);
        if (B.$$typeof === _e) return M(j, S, A, yc(S, B), K);
        Sc(S, B);
      }
      return null;
    }
    function k(j, S, A, B) {
      for (
        var K = null, he = null, Z = S, le = (S = 0), oe = null;
        Z !== null && le < A.length;
        le++
      ) {
        Z.index > le ? ((oe = Z), (Z = null)) : (oe = Z.sibling);
        var ve = E(j, Z, A[le], B);
        if (ve === null) {
          Z === null && (Z = oe);
          break;
        }
        (e && Z && ve.alternate === null && t(j, Z),
          (S = i(ve, S, le)),
          he === null ? (K = ve) : (he.sibling = ve),
          (he = ve),
          (Z = oe));
      }
      if (le === A.length) return (a(j, Z), fe && ra(j, le), K);
      if (Z === null) {
        for (; le < A.length; le++)
          ((Z = L(j, A[le], B)),
            Z !== null && ((S = i(Z, S, le)), he === null ? (K = Z) : (he.sibling = Z), (he = Z)));
        return (fe && ra(j, le), K);
      }
      for (Z = l(Z); le < A.length; le++)
        ((oe = M(Z, j, le, A[le], B)),
          oe !== null &&
            (e && oe.alternate !== null && Z.delete(oe.key === null ? le : oe.key),
            (S = i(oe, S, le)),
            he === null ? (K = oe) : (he.sibling = oe),
            (he = oe)));
      return (
        e &&
          Z.forEach(function (Pa) {
            return t(j, Pa);
          }),
        fe && ra(j, le),
        K
      );
    }
    function W(j, S, A, B) {
      if (A == null) throw Error(o(151));
      for (
        var K = null, he = null, Z = S, le = (S = 0), oe = null, ve = A.next();
        Z !== null && !ve.done;
        le++, ve = A.next()
      ) {
        Z.index > le ? ((oe = Z), (Z = null)) : (oe = Z.sibling);
        var Pa = E(j, Z, ve.value, B);
        if (Pa === null) {
          Z === null && (Z = oe);
          break;
        }
        (e && Z && Pa.alternate === null && t(j, Z),
          (S = i(Pa, S, le)),
          he === null ? (K = Pa) : (he.sibling = Pa),
          (he = Pa),
          (Z = oe));
      }
      if (ve.done) return (a(j, Z), fe && ra(j, le), K);
      if (Z === null) {
        for (; !ve.done; le++, ve = A.next())
          ((ve = L(j, ve.value, B)),
            ve !== null &&
              ((S = i(ve, S, le)), he === null ? (K = ve) : (he.sibling = ve), (he = ve)));
        return (fe && ra(j, le), K);
      }
      for (Z = l(Z); !ve.done; le++, ve = A.next())
        ((ve = M(Z, j, le, ve.value, B)),
          ve !== null &&
            (e && ve.alternate !== null && Z.delete(ve.key === null ? le : ve.key),
            (S = i(ve, S, le)),
            he === null ? (K = ve) : (he.sibling = ve),
            (he = ve)));
      return (
        e &&
          Z.forEach(function (ay) {
            return t(j, ay);
          }),
        fe && ra(j, le),
        K
      );
    }
    function Te(j, S, A, B) {
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
                    (typeof K == 'object' && K !== null && K.$$typeof === Ze && xl(K) === S.type)
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
                ? ((B = _l(A.props.children, j.mode, B, A.key)), (B.return = j), (j = B))
                : ((B = mc(A.type, A.key, A.props, null, j.mode, B)),
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
            return ((A = xl(A)), Te(j, S, A, B));
        }
        if (nt(A)) return k(j, S, A, B);
        if (Xe(A)) {
          if (((K = Xe(A)), typeof K != 'function')) throw Error(o(150));
          return ((A = K.call(A)), W(j, S, A, B));
        }
        if (typeof A.then == 'function') return Te(j, S, bc(A), B);
        if (A.$$typeof === _e) return Te(j, S, yc(j, A), B);
        Sc(j, A);
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
        var K = Te(j, S, A, B);
        return ((on = null), K);
      } catch (Z) {
        if (Z === un || Z === gc) throw Z;
        var he = xt(29, Z, null, j.mode);
        return ((he.lanes = B), (he.return = j), he);
      } finally {
      }
    };
  }
  var Tl = qf(!0),
    Hf = qf(!1),
    La = !1;
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
  function qa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ha(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (ye & 2) !== 0)) {
      var n = l.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (l.pending = t),
        (t = dc(e)),
        Sf(e, null, a),
        t
      );
    }
    return (fc(e, l, t, a), dc(e));
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
      var e = sn;
      if (e !== null) throw e;
    }
  }
  function ii(e, t, a, l) {
    xu = !1;
    var n = e.updateQueue;
    La = !1;
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
      var L = n.baseState;
      ((f = 0), (w = N = p = null), (v = i));
      do {
        var E = v.lane & -536870913,
          M = E !== v.lane;
        if (M ? (ue & E) === E : (l & E) === E) {
          (E !== 0 && E === cn && (xu = !0),
            w !== null &&
              (w = w.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          e: {
            var k = e,
              W = v;
            E = t;
            var Te = a;
            switch (W.tag) {
              case 1:
                if (((k = W.payload), typeof k == 'function')) {
                  L = k.call(Te, L, E);
                  break e;
                }
                L = k;
                break e;
              case 3:
                k.flags = (k.flags & -65537) | 128;
              case 0:
                if (
                  ((k = W.payload), (E = typeof k == 'function' ? k.call(Te, L, E) : k), E == null)
                )
                  break e;
                L = T({}, L, E);
                break e;
              case 2:
                La = !0;
            }
          }
          ((E = v.callback),
            E !== null &&
              ((e.flags |= 64),
              M && (e.flags |= 8192),
              (M = n.callbacks),
              M === null ? (n.callbacks = [E]) : M.push(E)));
        } else
          ((M = { lane: E, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            w === null ? ((N = w = M), (p = L)) : (w = w.next = M),
            (f |= E));
        if (((v = v.next), v === null)) {
          if (((v = n.shared.pending), v === null)) break;
          ((M = v),
            (v = M.next),
            (M.next = null),
            (n.lastBaseUpdate = M),
            (n.shared.pending = null));
        }
      } while (!0);
      (w === null && (p = L),
        (n.baseState = p),
        (n.firstBaseUpdate = N),
        (n.lastBaseUpdate = w),
        i === null && (n.shared.lanes = 0),
        (ka |= f),
        (e.lanes = f),
        (e.memoizedState = L));
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
  var rn = x(null),
    xc = x(0);
  function Vf(e, t) {
    ((e = Sa), $(xc, e), $(rn, t), (Sa = e | t.baseLanes));
  }
  function ju() {
    ($(xc, Sa), $(rn, rn.current));
  }
  function Tu() {
    ((Sa = xc.current), q(rn), q(xc));
  }
  var jt = x(null),
    Ut = null;
  function Ua(e) {
    var t = e.alternate;
    ($(Le, Le.current & 1),
      $(jt, e),
      Ut === null && (t === null || rn.current !== null || t.memoizedState !== null) && (Ut = e));
  }
  function Au(e) {
    ($(Le, Le.current), $(jt, e), Ut === null && (Ut = e));
  }
  function $f(e) {
    e.tag === 22 ? ($(Le, Le.current), $(jt, e), Ut === null && (Ut = e)) : Ga();
  }
  function Ga() {
    ($(Le, Le.current), $(jt, jt.current));
  }
  function Tt(e) {
    (q(jt), Ut === e && (Ut = null), q(Le));
  }
  var Le = x(0);
  function jc(e) {
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
  var ma = 0,
    ae = null,
    xe = null,
    Ue = null,
    Tc = !1,
    fn = !1,
    Al = !1,
    Ac = 0,
    ci = 0,
    dn = null,
    X0 = 0;
  function Oe() {
    throw Error(o(321));
  }
  function Nu(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!St(e[a], t[a])) return !1;
    return !0;
  }
  function Eu(e, t, a, l, n, i) {
    return (
      (ma = i),
      (ae = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (R.H = e === null || e.memoizedState === null ? Ad : $u),
      (Al = !1),
      (i = a(l, n)),
      (Al = !1),
      fn && (i = Yf(t, a, l, n)),
      kf(e),
      i
    );
  }
  function kf(e) {
    R.H = oi;
    var t = xe !== null && xe.next !== null;
    if (((ma = 0), (Ue = xe = ae = null), (Tc = !1), (ci = 0), (dn = null), t)) throw Error(o(300));
    e === null || Ge || ((e = e.dependencies), e !== null && vc(e) && (Ge = !0));
  }
  function Yf(e, t, a, l) {
    ae = e;
    var n = 0;
    do {
      if ((fn && (dn = null), (ci = 0), (fn = !1), 25 <= n)) throw Error(o(301));
      if (((n += 1), (Ue = xe = null), e.updateQueue != null)) {
        var i = e.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((R.H = Nd), (i = t(a, l)));
    } while (fn);
    return i;
  }
  function Q0() {
    var e = R.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? si(t) : t),
      (e = e.useState()[0]),
      (xe !== null ? xe.memoizedState : null) !== e && (ae.flags |= 1024),
      t
    );
  }
  function zu() {
    var e = Ac !== 0;
    return ((Ac = 0), e);
  }
  function Mu(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Cu(e) {
    if (Tc) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Tc = !1;
    }
    ((ma = 0), (Ue = xe = ae = null), (fn = !1), (ci = Ac = 0), (dn = null));
  }
  function ot() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Ue === null ? (ae.memoizedState = Ue = e) : (Ue = Ue.next = e), Ue);
  }
  function qe() {
    if (xe === null) {
      var e = ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = xe.next;
    var t = Ue === null ? ae.memoizedState : Ue.next;
    if (t !== null) ((Ue = t), (xe = e));
    else {
      if (e === null) throw ae.alternate === null ? Error(o(467)) : Error(o(310));
      ((xe = e),
        (e = {
          memoizedState: xe.memoizedState,
          baseState: xe.baseState,
          baseQueue: xe.baseQueue,
          queue: xe.queue,
          next: null,
        }),
        Ue === null ? (ae.memoizedState = Ue = e) : (Ue = Ue.next = e));
    }
    return Ue;
  }
  function Nc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function si(e) {
    var t = ci;
    return (
      (ci += 1),
      dn === null && (dn = []),
      (e = Df(dn, e, t)),
      (t = ae),
      (Ue === null ? t.memoizedState : Ue.next) === null &&
        ((t = t.alternate), (R.H = t === null || t.memoizedState === null ? Ad : $u)),
      e
    );
  }
  function Ec(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return si(e);
      if (e.$$typeof === _e) return Pe(e);
    }
    throw Error(o(438, String(e)));
  }
  function wu(e) {
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
      a === null && ((a = Nc()), (ae.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++) a[l] = ut;
    return (t.index++, a);
  }
  function ha(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function zc(e) {
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
        var L = N.lane & -536870913;
        if (L !== N.lane ? (ue & L) === L : (ma & L) === L) {
          var E = N.revertLane;
          if (E === 0)
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
              L === cn && (w = !0));
          else if ((ma & E) === E) {
            ((N = N.next), E === cn && (w = !0));
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
              p === null ? ((v = p = L), (f = i)) : (p = p.next = L),
              (ae.lanes |= E),
              (ka |= E));
          ((L = N.action), Al && a(i, L), (i = N.hasEagerState ? N.eagerState : a(i, L)));
        } else
          ((E = {
            lane: L,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null,
          }),
            p === null ? ((v = p = E), (f = i)) : (p = p.next = E),
            (ae.lanes |= L),
            (ka |= L));
        N = N.next;
      } while (N !== null && N !== t);
      if (
        (p === null ? (f = i) : (p.next = v),
        !St(i, e.memoizedState) && ((Ge = !0), w && ((a = sn), a !== null)))
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
      (St(i, t.memoizedState) || (Ge = !0),
        (t.memoizedState = i),
        t.baseQueue === null && (t.baseState = i),
        (a.lastRenderedState = i));
    }
    return [i, l];
  }
  function Zf(e, t, a) {
    var l = ae,
      n = qe(),
      i = fe;
    if (i) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var f = !St((xe || n).memoizedState, a);
    if (
      (f && ((n.memoizedState = a), (Ge = !0)),
      (n = n.queue),
      Lu(Kf.bind(null, l, n, e), [e]),
      n.getSnapshot !== t || f || (Ue !== null && Ue.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        mn(9, { destroy: void 0 }, Qf.bind(null, l, n, a, t), null),
        Ne === null)
      )
        throw Error(o(349));
      i || (ma & 127) !== 0 || Xf(l, t, a);
    }
    return a;
  }
  function Xf(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = ae.updateQueue),
      t === null
        ? ((t = Nc()), (ae.updateQueue = t), (t.stores = [e]))
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
      return !St(e, a);
    } catch {
      return !0;
    }
  }
  function Wf(e) {
    var t = yl(e, 2);
    t !== null && _t(t, e, 2);
  }
  function Du(e) {
    var t = ot();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Al)) {
        Ma(!0);
        try {
          a();
        } finally {
          Ma(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ha,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Ff(e, t, a, l) {
    return ((e.baseState = a), Ou(e, xe, typeof l == 'function' ? l : ha));
  }
  function K0(e, t, a, l, n) {
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
          ? ((i.next = t.pending = i), If(t, i))
          : ((i.next = a.next), (t.pending = a.next = i)));
    }
  }
  function If(e, t) {
    var a = t.action,
      l = t.payload,
      n = e.state;
    if (t.isTransition) {
      var i = R.T,
        f = {};
      R.T = f;
      try {
        var v = a(n, l),
          p = R.S;
        (p !== null && p(f, v), Pf(e, t, v));
      } catch (N) {
        Bu(e, t, N);
      } finally {
        (i !== null && f.types !== null && (i.types = f.types), (R.T = i));
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
          var l = ae;
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
            Da(l);
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
      (a = xd.bind(null, ae, l)),
      (l.dispatch = a),
      (l = Du(!1)),
      (i = Vu.bind(null, ae, !1, l.queue)),
      (l = ot()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (l.queue = n),
      (a = K0.bind(null, ae, n, i, a)),
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
      (e = zc(ha)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var l = si(t);
      } catch (f) {
        throw f === un ? gc : f;
      }
    else l = t;
    t = qe();
    var n = t.queue,
      i = n.dispatch;
    return (
      a !== t.memoizedState &&
        ((ae.flags |= 2048), mn(9, { destroy: void 0 }, J0.bind(null, n, a), null)),
      [l, i, e]
    );
  }
  function J0(e, t) {
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
  function mn(e, t, a, l) {
    return (
      (e = { tag: e, create: a, deps: l, inst: t, next: null }),
      (t = ae.updateQueue),
      t === null && ((t = Nc()), (ae.updateQueue = t)),
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
  function Mc(e, t, a, l) {
    var n = ot();
    ((ae.flags |= e),
      (n.memoizedState = mn(1 | t, { destroy: void 0 }, a, l === void 0 ? null : l)));
  }
  function Cc(e, t, a, l) {
    var n = qe();
    l = l === void 0 ? null : l;
    var i = n.memoizedState.inst;
    xe !== null && l !== null && Nu(l, xe.memoizedState.deps)
      ? (n.memoizedState = mn(t, i, a, l))
      : ((ae.flags |= e), (n.memoizedState = mn(1 | t, i, a, l)));
  }
  function ud(e, t) {
    Mc(8390656, 8, e, t);
  }
  function Lu(e, t) {
    Cc(2048, 8, e, t);
  }
  function W0(e) {
    ae.flags |= 4;
    var t = ae.updateQueue;
    if (t === null) ((t = Nc()), (ae.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function od(e) {
    var t = qe().memoizedState;
    return (
      W0({ ref: t, nextImpl: e }),
      function () {
        if ((ye & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function rd(e, t) {
    return Cc(4, 2, e, t);
  }
  function fd(e, t) {
    return Cc(4, 4, e, t);
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
    ((a = a != null ? a.concat([e]) : null), Cc(4, 4, dd.bind(null, t, e), a));
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
      Ma(!0);
      try {
        e();
      } finally {
        Ma(!1);
      }
    }
    return ((a.memoizedState = [l, t]), l);
  }
  function Hu(e, t, a) {
    return a === void 0 || ((ma & 1073741824) !== 0 && (ue & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = ym()), (ae.lanes |= e), (ka |= e), a);
  }
  function yd(e, t, a, l) {
    return St(a, t)
      ? a
      : rn.current !== null
        ? ((e = Hu(e, a, l)), St(e, t) || (Ge = !0), e)
        : (ma & 42) === 0 || ((ma & 1073741824) !== 0 && (ue & 261930) === 0)
          ? ((Ge = !0), (e.memoizedState = a))
          : ((e = ym()), (ae.lanes |= e), (ka |= e), t);
  }
  function _d(e, t, a, l, n) {
    var i = V.p;
    V.p = i !== 0 && 8 > i ? i : 8;
    var f = R.T,
      v = {};
    ((R.T = v), Vu(e, !1, t, a));
    try {
      var p = n(),
        N = R.S;
      if (
        (N !== null && N(v, p), p !== null && typeof p == 'object' && typeof p.then == 'function')
      ) {
        var w = Z0(p, l);
        ui(e, t, w, Et(e));
      } else ui(e, t, l, Et(e));
    } catch (L) {
      ui(e, t, { then: function () {}, status: 'rejected', reason: L }, Et());
    } finally {
      ((V.p = i), f !== null && v.types !== null && (f.types = v.types), (R.T = f));
    }
  }
  function F0() {}
  function Uu(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var n = gd(e).queue;
    _d(
      e,
      n,
      t,
      F,
      a === null
        ? F0
        : function () {
            return (pd(e), a(l));
          }
    );
  }
  function gd(e) {
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
        lastRenderedReducer: ha,
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
          lastRenderedReducer: ha,
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
    (t.next === null && (t = e.alternate.memoizedState), ui(e, t.next.queue, {}, Et()));
  }
  function Gu() {
    return Pe(Ai);
  }
  function bd() {
    return qe().memoizedState;
  }
  function Sd() {
    return qe().memoizedState;
  }
  function I0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Et();
          e = qa(a);
          var l = Ha(t, e, a);
          (l !== null && (_t(l, t, a), li(l, t, a)), (t = { cache: vu() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function P0(e, t, a) {
    var l = Et();
    ((a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      wc(e) ? jd(t, a) : ((a = nu(e, t, a, l)), a !== null && (_t(a, e, l), Td(a, t, l))));
  }
  function xd(e, t, a) {
    var l = Et();
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
    if (wc(e)) jd(t, n);
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
            return (fc(e, t, n, 0), Ne === null && rc(), !1);
        } catch {
        } finally {
        }
      if (((a = nu(e, t, n, l)), a !== null)) return (_t(a, e, l), Td(a, t, l), !0);
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
    } else ((t = nu(e, a, l, 2)), t !== null && _t(t, e, 2));
  }
  function wc(e) {
    var t = e.alternate;
    return e === ae || (t !== null && t === ae);
  }
  function jd(e, t) {
    fn = Tc = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function Td(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      ((l &= e.pendingLanes), (a |= l), (t.lanes = a), zr(e, a));
    }
  }
  var oi = {
    readContext: Pe,
    use: Ec,
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
  oi.useEffectEvent = Oe;
  var Ad = {
      readContext: Pe,
      use: Ec,
      useCallback: function (e, t) {
        return ((ot().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Pe,
      useEffect: ud,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), Mc(4194308, 4, dd.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return Mc(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Mc(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = ot();
        t = t === void 0 ? null : t;
        var l = e();
        if (Al) {
          Ma(!0);
          try {
            e();
          } finally {
            Ma(!1);
          }
        }
        return ((a.memoizedState = [l, t]), l);
      },
      useReducer: function (e, t, a) {
        var l = ot();
        if (a !== void 0) {
          var n = a(t);
          if (Al) {
            Ma(!0);
            try {
              a(t);
            } finally {
              Ma(!1);
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
          (e = e.dispatch = P0.bind(null, ae, e)),
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
          a = xd.bind(null, ae, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: qu,
      useDeferredValue: function (e, t) {
        var a = ot();
        return Hu(a, e, t);
      },
      useTransition: function () {
        var e = Du(!1);
        return ((e = _d.bind(null, ae, e.queue, !0, !1)), (ot().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var l = ae,
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
          mn(9, { destroy: void 0 }, Qf.bind(null, l, i, a, t), null),
          a
        );
      },
      useId: function () {
        var e = ot(),
          t = Ne.identifierPrefix;
        if (fe) {
          var a = ta,
            l = ea;
          ((a = (l & ~(1 << (32 - bt(l) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = Ac++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = X0++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
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
        return ((t.queue = a), (t = Vu.bind(null, ae, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: wu,
      useCacheRefresh: function () {
        return (ot().memoizedState = I0.bind(null, ae));
      },
      useEffectEvent: function (e) {
        var t = ot(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((ye & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    $u = {
      readContext: Pe,
      use: Ec,
      useCallback: hd,
      useContext: Pe,
      useEffect: Lu,
      useImperativeHandle: md,
      useInsertionEffect: rd,
      useLayoutEffect: fd,
      useMemo: vd,
      useReducer: zc,
      useRef: sd,
      useState: function () {
        return zc(ha);
      },
      useDebugValue: qu,
      useDeferredValue: function (e, t) {
        var a = qe();
        return yd(a, xe.memoizedState, e, t);
      },
      useTransition: function () {
        var e = zc(ha)[0],
          t = qe().memoizedState;
        return [typeof e == 'boolean' ? e : si(e), t];
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
    use: Ec,
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
      return Ru(ha);
    },
    useDebugValue: qu,
    useDeferredValue: function (e, t) {
      var a = qe();
      return xe === null ? Hu(a, e, t) : yd(a, xe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Ru(ha)[0],
        t = qe().memoizedState;
      return [typeof e == 'boolean' ? e : si(e), t];
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
  function ku(e, t, a, l) {
    ((t = e.memoizedState),
      (a = a(l, t)),
      (a = a == null ? t : T({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var Yu = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var l = Et(),
        n = qa(l);
      ((n.payload = t),
        a != null && (n.callback = a),
        (t = Ha(e, n, l)),
        t !== null && (_t(t, e, l), li(t, e, l)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var l = Et(),
        n = qa(l);
      ((n.tag = 1),
        (n.payload = t),
        a != null && (n.callback = a),
        (t = Ha(e, n, l)),
        t !== null && (_t(t, e, l), li(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Et(),
        l = qa(a);
      ((l.tag = 2),
        t != null && (l.callback = t),
        (t = Ha(e, l, a)),
        t !== null && (_t(t, e, a), li(t, e, a)));
    },
  };
  function Ed(e, t, a, l, n, i, f) {
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
      t.state !== e && Yu.enqueueReplaceState(t, t.state, null));
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
    oc(e);
  }
  function Cd(e) {
    console.error(e);
  }
  function wd(e) {
    oc(e);
  }
  function Oc(e, t) {
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
      (a = qa(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Oc(e, t);
      }),
      a
    );
  }
  function Rd(e) {
    return ((e = qa(e)), (e.tag = 3), e);
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
          typeof n != 'function' && (Ya === null ? (Ya = new Set([this])) : Ya.add(this)));
        var v = l.stack;
        this.componentDidCatch(l.value, { componentStack: v !== null ? v : '' });
      });
  }
  function ev(e, t, a, l, n) {
    if (((a.flags |= 32768), l !== null && typeof l == 'object' && typeof l.then == 'function')) {
      if (((t = a.alternate), t !== null && nn(t, a, n, !0), (a = jt.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Ut === null ? Yc() : a.alternate === null && Re === 0 && (Re = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = n),
              l === pc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([l])) : t.add(l),
                  _o(e, l, n)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              l === pc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([l])) : a.add(l)),
                  _o(e, l, n)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (_o(e, l, n), Yc(), !1);
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
            Re !== 4 && (Re = 2)),
        !1
      );
    var i = Error(o(520), { cause: l });
    if (((i = Bt(i, a)), _i === null ? (_i = [i]) : _i.push(i), Re !== 4 && (Re = 2), t === null))
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
        ? (Mu(e, t, n), va(e, t, n))
        : (fe && v && uu(t), (t.flags |= 1), et(e, t, l, n), t.child)
    );
  }
  function Ld(e, t, a, l, n) {
    if (e === null) {
      var i = a.type;
      return typeof i == 'function' && !iu(i) && i.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = i), qd(e, t, i, l, n))
        : ((e = mc(a.type, null, l, t, t.mode, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((i = e.child), !eo(e, n))) {
      var f = i.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Jn), a(f, l) && e.ref === t.ref))
        return va(e, t, n);
    }
    return ((t.flags |= 1), (e = oa(i, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function qd(e, t, a, l, n) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Jn(i, l) && e.ref === t.ref)
        if (((Ge = !1), (t.pendingProps = l = i), eo(e, n))) (e.flags & 131072) !== 0 && (Ge = !0);
        else return ((t.lanes = e.lanes), va(e, t, n));
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
          e !== null && _c(t, i !== null ? i.cachePool : null),
          i !== null ? Vf(t, i) : ju(),
          $f(t));
      else return ((l = t.lanes = 536870912), Ud(e, t, i !== null ? i.baseLanes | a : a, a, l));
    } else
      i !== null
        ? (_c(t, i.cachePool), Vf(t, i), Ga(), (t.memoizedState = null))
        : (e !== null && _c(t, null), ju(), Ga());
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
  function Ud(e, t, a, l, n) {
    var i = _u();
    return (
      (i = i === null ? null : { parent: He._currentValue, pool: i }),
      (t.memoizedState = { baseLanes: a, cachePool: i }),
      e !== null && _c(t, null),
      ju(),
      $f(t),
      e !== null && nn(e, t, l, !0),
      (t.childLanes = n),
      null
    );
  }
  function Rc(e, t) {
    return (
      (t = Bc({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Gd(e, t, a) {
    return (
      Tl(t, e.child, null, a),
      (e = Rc(t, t.pendingProps)),
      (e.flags |= 2),
      Tt(t),
      (t.memoizedState = null),
      e
    );
  }
  function tv(e, t, a) {
    var l = t.pendingProps,
      n = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (fe) {
        if (l.mode === 'hidden') return ((e = Rc(t, l)), (t.lanes = 536870912), ri(null, e));
        if (
          (Au(t),
          (e = ze)
            ? ((e = Im(e, Ht)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Oa !== null ? { id: ea, overflow: ta } : null,
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
          throw Da(t);
        return ((t.lanes = 536870912), null);
      }
      return Rc(t, l);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var f = i.dehydrated;
      if ((Au(t), n))
        if (t.flags & 256) ((t.flags &= -257), (t = Gd(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if ((Ge || nn(e, t, a, !1), (n = (a & e.childLanes) !== 0), Ge || n)) {
        if (((l = Ne), l !== null && ((f = Mr(l, a)), f !== 0 && f !== i.retryLane)))
          throw ((i.retryLane = f), yl(e, f), _t(l, e, f), Xu);
        (Yc(), (t = Gd(e, t, a)));
      } else
        ((e = i.treeContext),
          (ze = Gt(f.nextSibling)),
          (Ie = t),
          (fe = !0),
          (Ra = null),
          (Ht = !1),
          e !== null && Nf(t, e),
          (t = Rc(t, l)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = oa(e.child, { mode: l.mode, children: l.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Dc(e, t) {
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
        ? (Mu(e, t, n), va(e, t, n))
        : (fe && l && uu(t), (t.flags |= 1), et(e, t, a, n), t.child)
    );
  }
  function Vd(e, t, a, l, n, i) {
    return (
      bl(t),
      (t.updateQueue = null),
      (a = Yf(t, l, a, n)),
      kf(e),
      (l = zu()),
      e !== null && !Ge
        ? (Mu(e, t, i), va(e, t, i))
        : (fe && l && uu(t), (t.flags |= 1), et(e, t, a, i), t.child)
    );
  }
  function $d(e, t, a, l, n) {
    if ((bl(t), t.stateNode === null)) {
      var i = en,
        f = a.contextType;
      (typeof f == 'object' && f !== null && (i = Pe(f)),
        (i = new a(l, i)),
        (t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = Yu),
        (t.stateNode = i),
        (i._reactInternals = t),
        (i = t.stateNode),
        (i.props = l),
        (i.state = t.memoizedState),
        (i.refs = {}),
        pu(t),
        (f = a.contextType),
        (i.context = typeof f == 'object' && f !== null ? Pe(f) : en),
        (i.state = t.memoizedState),
        (f = a.getDerivedStateFromProps),
        typeof f == 'function' && (ku(t, a, f, l), (i.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof i.getSnapshotBeforeUpdate == 'function' ||
          (typeof i.UNSAFE_componentWillMount != 'function' &&
            typeof i.componentWillMount != 'function') ||
          ((f = i.state),
          typeof i.componentWillMount == 'function' && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
          f !== i.state && Yu.enqueueReplaceState(i, i.state, null),
          ii(t, l, i, n),
          ni(),
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
      ((f = en), typeof w == 'object' && w !== null && (f = Pe(w)));
      var L = a.getDerivedStateFromProps;
      ((w = typeof L == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        w ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((v || N !== f) && zd(t, i, l, f)),
        (La = !1));
      var E = t.memoizedState;
      ((i.state = E),
        ii(t, l, i, n),
        ni(),
        (N = t.memoizedState),
        v || E !== N || La
          ? (typeof L == 'function' && (ku(t, a, L, l), (N = t.memoizedState)),
            (p = La || Ed(t, a, p, l, E, N, f))
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
        (L = t.pendingProps),
        (E = i.context),
        (N = a.contextType),
        (p = en),
        typeof N == 'object' && N !== null && (p = Pe(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((f !== L || E !== p) && zd(t, i, l, p)),
        (La = !1),
        (E = t.memoizedState),
        (i.state = E),
        ii(t, l, i, n),
        ni());
      var M = t.memoizedState;
      f !== L || E !== M || La || (e !== null && e.dependencies !== null && vc(e.dependencies))
        ? (typeof v == 'function' && (ku(t, a, v, l), (M = t.memoizedState)),
          (w =
            La ||
            Ed(t, a, w, l, E, M, p) ||
            (e !== null && e.dependencies !== null && vc(e.dependencies)))
            ? (N ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(l, M, p),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(l, M, p)),
              typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (f === e.memoizedProps && E === e.memoizedState) ||
                (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (f === e.memoizedProps && E === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = l),
              (t.memoizedState = M)),
          (i.props = l),
          (i.state = M),
          (i.context = p),
          (l = w))
        : (typeof i.componentDidUpdate != 'function' ||
            (f === e.memoizedProps && E === e.memoizedState) ||
            (t.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (f === e.memoizedProps && E === e.memoizedState) ||
            (t.flags |= 1024),
          (l = !1));
    }
    return (
      (i = l),
      Dc(e, t),
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
        : (e = va(e, t, n)),
      e
    );
  }
  function kd(e, t, a, l) {
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
      ((f = i) || (f = e !== null && e.memoizedState === null ? !1 : (Le.current & 2) !== 0),
      f && ((n = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (fe) {
        if (
          (n ? Ua(t) : Ga(),
          (e = ze)
            ? ((e = Im(e, Ht)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Oa !== null ? { id: ea, overflow: ta } : null,
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
          throw Da(t);
        return (Ro(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = l.children;
      return (
        (l = l.fallback),
        n
          ? (Ga(),
            (n = t.mode),
            (v = Bc({ mode: 'hidden', children: v }, n)),
            (l = _l(l, n, a, null)),
            (v.return = t),
            (l.return = t),
            (v.sibling = l),
            (t.child = v),
            (l = t.child),
            (l.memoizedState = Ju(a)),
            (l.childLanes = Wu(e, f, a)),
            (t.memoizedState = Ku),
            ri(null, l))
          : (Ua(t), Fu(t, v))
      );
    }
    var p = e.memoizedState;
    if (p !== null && ((v = p.dehydrated), v !== null)) {
      if (i)
        t.flags & 256
          ? (Ua(t), (t.flags &= -257), (t = Iu(e, t, a)))
          : t.memoizedState !== null
            ? (Ga(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Ga(),
              (v = l.fallback),
              (n = t.mode),
              (l = Bc({ mode: 'visible', children: l.children }, n)),
              (v = _l(v, n, a, null)),
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
              (t = ri(null, l)));
      else if ((Ua(t), Ro(v))) {
        if (((f = v.nextSibling && v.nextSibling.dataset), f)) var N = f.dgst;
        ((f = N),
          (l = Error(o(419))),
          (l.stack = ''),
          (l.digest = f),
          In({ value: l, source: null, stack: null }),
          (t = Iu(e, t, a)));
      } else if ((Ge || nn(e, t, a, !1), (f = (a & e.childLanes) !== 0), Ge || f)) {
        if (((f = Ne), f !== null && ((l = Mr(f, a)), l !== 0 && l !== p.retryLane)))
          throw ((p.retryLane = l), yl(e, l), _t(f, e, l), Xu);
        (Oo(v) || Yc(), (t = Iu(e, t, a)));
      } else
        Oo(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = p.treeContext),
            (ze = Gt(v.nextSibling)),
            (Ie = t),
            (fe = !0),
            (Ra = null),
            (Ht = !1),
            e !== null && Nf(t, e),
            (t = Fu(t, l.children)),
            (t.flags |= 4096));
      return t;
    }
    return n
      ? (Ga(),
        (v = l.fallback),
        (n = t.mode),
        (p = e.child),
        (N = p.sibling),
        (l = oa(p, { mode: 'hidden', children: l.children })),
        (l.subtreeFlags = p.subtreeFlags & 65011712),
        N !== null ? (v = oa(N, v)) : ((v = _l(v, n, a, null)), (v.flags |= 2)),
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
              ? ((p = He._currentValue), (n = n.parent !== p ? { parent: p, pool: p } : n))
              : (n = Of()),
            (v = { baseLanes: v.baseLanes | a, cachePool: n })),
        (l.memoizedState = v),
        (l.childLanes = Wu(e, f, a)),
        (t.memoizedState = Ku),
        ri(e.child, l))
      : (Ua(t),
        (a = e.child),
        (e = a.sibling),
        (a = oa(a, { mode: 'visible', children: l.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((f = t.deletions), f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function Fu(e, t) {
    return ((t = Bc({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Bc(e, t) {
    return ((e = xt(22, e, null, t)), (e.lanes = 0), e);
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
      (l = fe ? Fn : 0),
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
          ((e = a.alternate), e !== null && jc(e) === null && (n = a), (a = a.sibling));
        ((a = n),
          a === null ? ((n = t.child), (t.child = null)) : ((n = a.sibling), (a.sibling = null)),
          Pu(t, !1, n, a, i, l));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, n = t.child, t.child = null; n !== null; ) {
          if (((e = n.alternate), e !== null && jc(e) === null)) {
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
  function va(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (ka |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((nn(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = oa(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = oa(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function eo(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && vc(e)));
  }
  function av(e, t, a) {
    switch (t.tag) {
      case 3:
        (We(t, t.stateNode.containerInfo), Ba(t, He, e.memoizedState.cache), gl());
        break;
      case 27:
      case 5:
        rl(t);
        break;
      case 4:
        We(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ba(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Au(t), null);
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (Ua(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? Yd(e, t, a)
              : (Ua(t), (e = va(e, t, a)), e !== null ? e.sibling : null);
        Ua(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (
          ((l = (a & t.childLanes) !== 0),
          l || (nn(e, t, a, !1), (l = (a & t.childLanes) !== 0)),
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
        Ba(t, He, e.memoizedState.cache);
    }
    return va(e, t, a);
  }
  function Qd(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Ge = !0;
      else {
        if (!eo(e, a) && (t.flags & 128) === 0) return ((Ge = !1), av(e, t, a));
        Ge = (e.flags & 131072) !== 0;
      }
    else ((Ge = !1), fe && (t.flags & 1048576) !== 0 && Af(t, Fn, t.index));
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
              if (n === ke) {
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
          ((n = i.element), bu(e, t), ii(t, l, null, a));
          var f = t.memoizedState;
          if (
            ((l = f.cache),
            Ba(t, He, l),
            l !== i.cache && hu(t, [He], a, !0),
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
              t = kd(e, t, l, a);
              break e;
            } else if (l !== n) {
              ((n = Bt(Error(o(424)), t)), In(n), (t = kd(e, t, l, a)));
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
                  Ra = null,
                  Ht = !0,
                  a = Hf(t, null, l, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((gl(), l === n)) {
              t = va(e, t, a);
              break e;
            }
            et(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Dc(e, t),
          e === null
            ? (a = nh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : fe ||
                ((a = t.type),
                (e = t.pendingProps),
                (l = Fc(ie.current).createElement(a)),
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
            Ka(t.type) ? ((Do = n), (ze = Gt(l.firstChild))) : (ze = n)),
          et(e, t, t.pendingProps.children, a),
          Dc(e, t),
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
            n || Da(t)),
          rl(t),
          (n = t.type),
          (i = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (l = i.children),
          Mo(n, i) ? (l = null) : f !== null && Mo(n, f) && (t.flags |= 32),
          t.memoizedState !== null && ((n = Eu(e, t, Q0, null, null, a)), (Ai._currentValue = n)),
          Dc(e, t),
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
            e || Da(t)),
          null
        );
      case 13:
        return Yd(e, t, a);
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
        return ((l = t.pendingProps), Ba(t, t.type, l.value), et(e, t, l.children, a), t.child);
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
            ? ((n = _u()),
              n === null &&
                ((n = Ne),
                (i = vu()),
                (n.pooledCache = i),
                i.refCount++,
                i !== null && (n.pooledCacheLanes |= a),
                (n = i)),
              (t.memoizedState = { parent: l, cache: n }),
              pu(t),
              Ba(t, He, n))
            : ((e.lanes & a) !== 0 && (bu(e, t), ii(t, null, null, a), ni()),
              (n = e.memoizedState),
              (i = t.memoizedState),
              n.parent !== l
                ? ((n = { parent: l, cache: l }),
                  (t.memoizedState = n),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n),
                  Ba(t, He, l))
                : ((l = i.cache), Ba(t, He, l), l !== n.cache && hu(t, [He], a, !0))),
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
        else throw ((jl = pc), gu);
    } else e.flags &= -16777217;
  }
  function Kd(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !oh(t)))
      if (bm()) e.flags |= 8192;
      else throw ((jl = pc), gu);
  }
  function Lc(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Nr() : 536870912), (e.lanes |= t), (_n |= t)));
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
          da(He),
          we(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (ln(t)
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
          ((e = Y.current), ln(t) ? Ef(t) : ((e = th(n, l, a)), (t.stateNode = e), ya(t)));
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
          if (((i = Y.current), ln(t))) Ef(t);
          else {
            var f = Fc(ie.current);
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
          if (((e = ie.current), ln(t))) {
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
              e || Da(t, !0));
          } else ((e = Fc(e).createTextNode(l)), (e[Fe] = t), (t.stateNode = e));
        }
        return (Me(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((l = ln(t)), a !== null)) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(o(557));
              e[Fe] = t;
            } else (gl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Me(t), (e = !1));
          } else
            ((a = fu()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (Tt(t), t) : (Tt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return (Me(t), null);
      case 13:
        if (
          ((l = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((n = ln(t)), l !== null && l.dehydrated !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (((n = t.memoizedState), (n = n !== null ? n.dehydrated : null), !n))
                throw Error(o(317));
              n[Fe] = t;
            } else (gl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Me(t), (n = !1));
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
              Lc(t, t.updateQueue),
              Me(t),
              null)
        );
      case 4:
        return (we(), e === null && To(t.stateNode.containerInfo), Me(t), null);
      case 10:
        return (da(t.type), Me(t), null);
      case 19:
        if ((q(Le), (l = t.memoizedState), l === null)) return (Me(t), null);
        if (((n = (t.flags & 128) !== 0), (i = l.rendering), i === null))
          if (n) fi(l, !1);
          else {
            if (Re !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((i = jc(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      fi(l, !1),
                      e = i.updateQueue,
                      t.updateQueue = e,
                      Lc(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (xf(a, e), (a = a.sibling));
                  return ($(Le, (Le.current & 1) | 2), fe && ra(t, l.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            l.tail !== null &&
              gt() > Vc &&
              ((t.flags |= 128), (n = !0), fi(l, !1), (t.lanes = 4194304));
          }
        else {
          if (!n)
            if (((e = jc(i)), e !== null)) {
              if (
                ((t.flags |= 128),
                (n = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Lc(t, e),
                fi(l, !0),
                l.tail === null && l.tailMode === 'hidden' && !i.alternate && !fe)
              )
                return (Me(t), null);
            } else
              2 * gt() - l.renderingStartTime > Vc &&
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
            (l.renderingStartTime = gt()),
            (e.sibling = null),
            (a = Le.current),
            $(Le, n ? (a & 1) | 2 : a & 1),
            fe && ra(t, l.treeForkCount),
            e)
          : (Me(t), null);
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
              (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Me(t),
          (a = t.updateQueue),
          a !== null && Lc(t, a.retryQueue),
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
          e !== null && q(Sl),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          da(He),
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
          da(He),
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
        return (q(Le), null);
      case 4:
        return (we(), null);
      case 10:
        return (da(t.type), null);
      case 22:
      case 23:
        return (
          Tt(t),
          Tu(),
          e !== null && q(Sl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (da(He), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Jd(e, t) {
    switch ((ou(t), t.tag)) {
      case 3:
        (da(He), we());
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
        t.memoizedState !== null && Tt(t);
        break;
      case 13:
        Tt(t);
        break;
      case 19:
        q(Le);
        break;
      case 10:
        da(t.type);
        break;
      case 22:
      case 23:
        (Tt(t), Tu(), e !== null && q(Sl));
        break;
      case 24:
        da(He);
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
      Se(t, t.return, v);
    }
  }
  function Va(e, t, a) {
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
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Ka(e.type)) || e.tag === 4
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
        if ((e.tag === 27 && Ka(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
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
            a != null || t.onclick !== null || (t.onclick = sa)));
    else if (
      l !== 4 &&
      (l === 27 && Ka(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (no(e, t, a), e = e.sibling; e !== null; ) (no(e, t, a), (e = e.sibling));
  }
  function qc(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (l !== 4 && (l === 27 && Ka(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (qc(e, t, a), e = e.sibling; e !== null; ) (qc(e, t, a), (e = e.sibling));
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
    if (((e = e.containerInfo), (Eo = ns), (e = mf(e)), Is(e))) {
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
              L = e,
              E = null;
            t: for (;;) {
              for (
                var M;
                L !== a || (n !== 0 && L.nodeType !== 3) || (v = f + n),
                  L !== i || (l !== 0 && L.nodeType !== 3) || (p = f + l),
                  L.nodeType === 3 && (f += L.nodeValue.length),
                  (M = L.firstChild) !== null;
              )
                ((E = L), (L = M));
              for (;;) {
                if (L === e) break t;
                if (
                  (E === a && ++N === n && (v = f),
                  E === i && ++w === l && (p = f),
                  (M = L.nextSibling) !== null)
                )
                  break;
                ((L = E), (E = L.parentNode));
              }
              L = M;
            }
            a = v === -1 || p === -1 ? null : { start: v, end: p };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (zo = { focusedElem: e, selectionRange: a }, ns = !1, Ke = t; Ke !== null; )
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
                  var k = Nl(a.type, n);
                  ((e = l.getSnapshotBeforeUpdate(k, i)),
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
        (pa(e, a), l & 4 && di(5, a));
        break;
      case 1:
        if ((pa(e, a), l & 4))
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
        (l & 64 && Wd(a), l & 512 && mi(a, a.return));
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
        (pa(e, a), t === null && l & 4 && Id(a), l & 512 && mi(a, a.return));
        break;
      case 12:
        pa(e, a);
        break;
      case 31:
        (pa(e, a), l & 4 && im(e, a));
        break;
      case 13:
        (pa(e, a),
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
            (Ve = t) && !i ? ba(e, a, (a.subtreeFlags & 8772) !== 0) : pa(e, a),
            (_a = n),
            (Ve = i));
        }
        break;
      case 30:
        break;
      default:
        pa(e, a);
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
  function ga(e, t, a) {
    for (a = a.child; a !== null; ) (nm(e, t, a), (a = a.sibling));
  }
  function nm(e, t, a) {
    if (pt && typeof pt.onCommitFiberUnmount == 'function')
      try {
        pt.onCommitFiberUnmount(qn, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (Ve || aa(a, t),
          ga(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        Ve || aa(a, t);
        var l = Ce,
          n = mt;
        (Ka(a.type) && ((Ce = a.stateNode), (mt = !1)),
          ga(e, t, a),
          xi(a.stateNode),
          (Ce = l),
          (mt = n));
        break;
      case 5:
        Ve || aa(a, t);
      case 6:
        if (((l = Ce), (n = mt), (Ce = null), ga(e, t, a), (Ce = l), (mt = n), Ce !== null))
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
              An(e))
            : Wm(Ce, a.stateNode));
        break;
      case 4:
        ((l = Ce),
          (n = mt),
          (Ce = a.stateNode.containerInfo),
          (mt = !0),
          ga(e, t, a),
          (Ce = l),
          (mt = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Va(2, a, t), Ve || Va(4, a, t), ga(e, t, a));
        break;
      case 1:
        (Ve ||
          (aa(a, t), (l = a.stateNode), typeof l.componentWillUnmount == 'function' && Fd(a, t, l)),
          ga(e, t, a));
        break;
      case 21:
        ga(e, t, a);
        break;
      case 22:
        ((Ve = (l = Ve) || a.memoizedState !== null), ga(e, t, a), (Ve = l));
        break;
      default:
        ga(e, t, a);
    }
  }
  function im(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        An(e);
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
        An(e);
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
  function Hc(e, t) {
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
              if (Ka(v.type)) {
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
        (ht(t, e), vt(e), l & 4 && (Va(3, e, e.return), di(3, e), Va(5, e, e.return)));
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
            Ql(n, '');
          } catch (k) {
            Se(e, e.return, k);
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
          } catch (k) {
            Se(e, e.return, k);
          }
        }
        break;
      case 3:
        if (
          ((es = null),
          (n = Xt),
          (Xt = Ic(t.containerInfo)),
          ht(t, e),
          (Xt = n),
          vt(e),
          l & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            An(t.containerInfo);
          } catch (k) {
            Se(e, e.return, k);
          }
        io && ((io = !1), um(e));
        break;
      case 4:
        ((l = Xt), (Xt = Ic(e.stateNode.containerInfo)), ht(t, e), vt(e), (Xt = l));
        break;
      case 12:
        (ht(t, e), vt(e));
        break;
      case 31:
        (ht(t, e),
          vt(e),
          l & 4 && ((l = e.updateQueue), l !== null && ((e.updateQueue = null), Hc(e, l))));
        break;
      case 13:
        (ht(t, e),
          vt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Gc = gt()),
          l & 4 && ((l = e.updateQueue), l !== null && ((e.updateQueue = null), Hc(e, l))));
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
                    var L = p.memoizedProps.style,
                      E = L != null && L.hasOwnProperty('display') ? L.display : null;
                    v.style.display = E == null || typeof E == 'boolean' ? '' : ('' + E).trim();
                  }
                } catch (k) {
                  Se(p, p.return, k);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                p = t;
                try {
                  p.stateNode.nodeValue = n ? '' : p.memoizedProps;
                } catch (k) {
                  Se(p, p.return, k);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                p = t;
                try {
                  var M = p.stateNode;
                  n ? Fm(M, !0) : Fm(p.stateNode, !1);
                } catch (k) {
                  Se(p, p.return, k);
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
          l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), Hc(e, a))));
        break;
      case 19:
        (ht(t, e),
          vt(e),
          l & 4 && ((l = e.updateQueue), l !== null && ((e.updateQueue = null), Hc(e, l))));
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
            qc(e, i, n);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && (Ql(f, ''), (a.flags &= -33));
            var v = lo(e);
            qc(e, v, f);
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
  function pa(e, t) {
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
          (Va(4, t, t.return), El(t));
          break;
        case 1:
          aa(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && Fd(t, t.return, a), El(t));
          break;
        case 27:
          xi(t.stateNode);
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
  function ba(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate,
        n = e,
        i = t,
        f = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (ba(n, i, a), di(4, i));
          break;
        case 1:
          if ((ba(n, i, a), (l = i), (n = l.stateNode), typeof n.componentDidMount == 'function'))
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
          (a && f & 64 && Wd(i), mi(i, i.return));
          break;
        case 27:
          em(i);
        case 26:
        case 5:
          (ba(n, i, a), a && l === null && f & 4 && Id(i), mi(i, i.return));
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
          (i.memoizedState === null && ba(n, i, a), mi(i, i.return));
          break;
        case 30:
          break;
        default:
          ba(n, i, a);
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
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (om(e, t, a, l), (t = t.sibling));
  }
  function om(e, t, a, l) {
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
              : hi(e, t)
            : i._visibility & 2
              ? Qt(e, t, a, l)
              : ((i._visibility |= 2), hn(e, t, a, l, (t.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && co(f, t));
        break;
      case 24:
        (Qt(e, t, a, l), n & 2048 && so(t.alternate, t));
        break;
      default:
        Qt(e, t, a, l);
    }
  }
  function hn(e, t, a, l, n) {
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
          (hn(i, f, v, p, n), di(8, f));
          break;
        case 23:
          break;
        case 22:
          var w = f.stateNode;
          (f.memoizedState !== null
            ? w._visibility & 2
              ? hn(i, f, v, p, n)
              : hi(i, f)
            : ((w._visibility |= 2), hn(i, f, v, p, n)),
            n && N & 2048 && co(f.alternate, f));
          break;
        case 24:
          (hn(i, f, v, p, n), n && N & 2048 && so(f.alternate, f));
          break;
        default:
          hn(i, f, v, p, n);
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
  function vn(e, t, a) {
    if (e.subtreeFlags & vi) for (e = e.child; e !== null; ) (rm(e, t, a), (e = e.sibling));
  }
  function rm(e, t, a) {
    switch (e.tag) {
      case 26:
        (vn(e, t, a),
          e.flags & vi && e.memoizedState !== null && Xv(a, Xt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        vn(e, t, a);
        break;
      case 3:
      case 4:
        var l = Xt;
        ((Xt = Ic(e.stateNode.containerInfo)), vn(e, t, a), (Xt = l));
        break;
      case 22:
        e.memoizedState === null &&
          ((l = e.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = vi), (vi = 16777216), vn(e, t, a), (vi = l))
            : vn(e, t, a));
        break;
      default:
        vn(e, t, a);
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
  function yi(e) {
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
        (yi(e), e.flags & 2048 && Va(9, e, e.return));
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
          ? ((t._visibility &= -3), Uc(e))
          : yi(e);
        break;
      default:
        yi(e);
    }
  }
  function Uc(e) {
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
          (Va(8, t, t.return), Uc(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Uc(t)));
          break;
        default:
          Uc(t);
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
          Va(8, a, t);
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
    ye = 0,
    Ne = null,
    ce = null,
    ue = 0,
    be = 0,
    At = null,
    $a = !1,
    yn = !1,
    uo = !1,
    Sa = 0,
    Re = 0,
    ka = 0,
    zl = 0,
    oo = 0,
    Nt = 0,
    _n = 0,
    _i = null,
    yt = null,
    ro = !1,
    Gc = 0,
    hm = 0,
    Vc = 1 / 0,
    $c = null,
    Ya = null,
    Ye = 0,
    Za = null,
    gn = null,
    xa = 0,
    fo = 0,
    mo = null,
    vm = null,
    gi = 0,
    ho = null;
  function Et() {
    return (ye & 2) !== 0 && ue !== 0 ? ue & -ue : R.T !== null ? bo() : Cr();
  }
  function ym() {
    if (Nt === 0)
      if ((ue & 536870912) === 0 || fe) {
        var e = Wi;
        ((Wi <<= 1), (Wi & 3932160) === 0 && (Wi = 262144), (Nt = e));
      } else Nt = 536870912;
    return ((e = jt.current), e !== null && (e.flags |= 32), Nt);
  }
  function _t(e, t, a) {
    (((e === Ne && (be === 2 || be === 9)) || e.cancelPendingCommit !== null) &&
      (pn(e, 0), Xa(e, ue, Nt, !1)),
      Un(e, a),
      ((ye & 2) === 0 || e !== Ne) &&
        (e === Ne && ((ye & 2) === 0 && (zl |= a), Re === 4 && Xa(e, ue, Nt, !1)), la(e)));
  }
  function _m(e, t, a) {
    if ((ye & 6) !== 0) throw Error(o(327));
    var l = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Hn(e, t),
      n = l ? fv(e, t) : yo(e, t, !0),
      i = l;
    do {
      if (n === 0) {
        yn && !l && Xa(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), i && !ov(a))) {
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
              n = _i;
              var p = v.current.memoizedState.isDehydrated;
              if ((p && (pn(v, f).flags |= 256), (f = yo(v, f, !1)), f !== 2)) {
                if (uo && !p) {
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
          (pn(e, 0), Xa(e, t, 0, !0));
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
              Xa(l, t, Nt, !$a);
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
          if ((t & 62914560) === t && ((n = Gc + 300 - gt()), 10 < n)) {
            if ((Xa(l, t, Nt, !$a), Ii(l, 0, !0) !== 0)) break e;
            ((xa = t),
              (l.timeoutHandle = Km(
                gm.bind(null, l, a, yt, $c, ro, t, Nt, zl, _n, $a, i, 'Throttled', -0, 0),
                n
              )));
            break e;
          }
          gm(l, a, yt, $c, ro, t, Nt, zl, _n, $a, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    la(e);
  }
  function gm(e, t, a, l, n, i, f, v, p, N, w, L, E, M) {
    if (((e.timeoutHandle = -1), (L = t.subtreeFlags), L & 8192 || (L & 16785408) === 16785408)) {
      ((L = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: sa,
      }),
        rm(t, i, L));
      var k = (i & 62914560) === i ? Gc - gt() : (i & 4194048) === i ? hm - gt() : 0;
      if (((k = Qv(L, k)), k !== null)) {
        ((xa = i),
          (e.cancelPendingCommit = k(Nm.bind(null, e, t, i, a, l, n, f, v, p, w, L, null, E, M))),
          Xa(e, i, f, !N));
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
  function Xa(e, t, a, l) {
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
    a !== 0 && Er(e, a, t);
  }
  function kc() {
    return (ye & 6) === 0 ? (pi(0), !1) : !0;
  }
  function vo() {
    if (ce !== null) {
      if (be === 0) var e = ce.return;
      else ((e = ce), (fa = pl = null), Cu(e), (on = null), (ti = 0), (e = ce));
      for (; e !== null; ) (Jd(e.alternate, e), (e = e.return));
      ce = null;
    }
  }
  function pn(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), Mv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (xa = 0),
      vo(),
      (Ne = e),
      (ce = a = oa(e.current, null)),
      (ue = t),
      (be = 0),
      (At = null),
      ($a = !1),
      (yn = Hn(e, t)),
      (uo = !1),
      (_n = Nt = oo = zl = ka = Re = 0),
      (yt = _i = null),
      (ro = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var n = 31 - bt(l),
          i = 1 << n;
        ((t |= e[n]), (l &= ~i));
      }
    return ((Sa = t), rc(), a);
  }
  function pm(e, t) {
    ((ae = null),
      (R.H = oi),
      t === un || t === gc
        ? ((t = Bf()), (be = 3))
        : t === gu
          ? ((t = Bf()), (be = 4))
          : (be =
              t === Xu
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (At = t),
      ce === null && ((Re = 1), Oc(e, Bt(t, e.current))));
  }
  function bm() {
    var e = jt.current;
    return e === null
      ? !0
      : (ue & 4194048) === ue
        ? Ut === null
        : (ue & 62914560) === ue || (ue & 536870912) !== 0
          ? e === Ut
          : !1;
  }
  function Sm() {
    var e = R.H;
    return ((R.H = oi), e === null ? oi : e);
  }
  function xm() {
    var e = R.A;
    return ((R.A = sv), e);
  }
  function Yc() {
    ((Re = 4),
      $a || ((ue & 4194048) !== ue && jt.current !== null) || (yn = !0),
      ((ka & 134217727) === 0 && (zl & 134217727) === 0) || Ne === null || Xa(Ne, ue, Nt, !1));
  }
  function yo(e, t, a) {
    var l = ye;
    ye |= 2;
    var n = Sm(),
      i = xm();
    ((Ne !== e || ue !== t) && (($c = null), pn(e, t)), (t = !1));
    var f = Re;
    e: do
      try {
        if (be !== 0 && ce !== null) {
          var v = ce,
            p = At;
          switch (be) {
            case 8:
              (vo(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jt.current === null && (t = !0);
              var N = be;
              if (((be = 0), (At = null), bn(e, v, p, N), a && yn)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((N = be), (be = 0), (At = null), bn(e, v, p, N));
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
      (fa = pl = null),
      (ye = l),
      (R.H = n),
      (R.A = i),
      ce === null && ((Ne = null), (ue = 0), rc()),
      f
    );
  }
  function rv() {
    for (; ce !== null; ) jm(ce);
  }
  function fv(e, t) {
    var a = ye;
    ye |= 2;
    var l = Sm(),
      n = xm();
    Ne !== e || ue !== t ? (($c = null), (Vc = gt() + 500), pn(e, t)) : (yn = Hn(e, t));
    e: do
      try {
        if (be !== 0 && ce !== null) {
          t = ce;
          var i = At;
          t: switch (be) {
            case 1:
              ((be = 0), (At = null), bn(e, t, i, 1));
              break;
            case 2:
            case 9:
              if (Rf(i)) {
                ((be = 0), (At = null), Tm(t));
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
              Rf(i) ? ((be = 0), (At = null), Tm(t)) : ((be = 0), (At = null), bn(e, t, i, 7));
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
                    ((be = 0), (At = null));
                    var p = v.sibling;
                    if (p !== null) ce = p;
                    else {
                      var N = v.return;
                      N !== null ? ((ce = N), Zc(N)) : (ce = null);
                    }
                    break t;
                  }
              }
              ((be = 0), (At = null), bn(e, t, i, 5));
              break;
            case 6:
              ((be = 0), (At = null), bn(e, t, i, 6));
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
      (fa = pl = null),
      (R.H = l),
      (R.A = n),
      (ye = a),
      ce !== null ? 0 : ((Ne = null), (ue = 0), rc(), Re)
    );
  }
  function dv() {
    for (; ce !== null && !B1(); ) jm(ce);
  }
  function jm(e) {
    var t = Qd(e.alternate, e, Sa);
    ((e.memoizedProps = e.pendingProps), t === null ? Zc(e) : (ce = t));
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
        (Jd(a, t), (t = ce = xf(t, Sa)), (t = Qd(a, t, Sa)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Zc(e) : (ce = t));
  }
  function bn(e, t, a, l) {
    ((fa = pl = null), Cu(t), (on = null), (ti = 0));
    var n = t.return;
    try {
      if (ev(e, n, t, a, ue)) {
        ((Re = 1), Oc(e, Bt(a, e.current)), (ce = null));
        return;
      }
    } catch (i) {
      if (n !== null) throw ((ce = n), i);
      ((Re = 1), Oc(e, Bt(a, e.current)), (ce = null));
      return;
    }
    t.flags & 32768
      ? (fe || l === 1
          ? (e = !0)
          : yn || (ue & 536870912) !== 0
            ? (e = !1)
            : (($a = e = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = jt.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
        Am(t, e))
      : Zc(t);
  }
  function Zc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Am(t, $a);
        return;
      }
      e = t.return;
      var a = lv(t.alternate, t, Sa);
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
    do Xc();
    while (Ye !== 0);
    if ((ye & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((i = t.lanes | t.childLanes),
        (i |= lu),
        Z1(e, a, i, f, v, p),
        e === Ne && ((ce = Ne = null), (ue = 0)),
        (gn = t),
        (Za = e),
        (xa = a),
        (fo = i),
        (mo = n),
        (vm = l),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            yv(Ki, function () {
              return (wm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = R.T), (R.T = null), (n = V.p), (V.p = 2), (f = ye), (ye |= 4));
        try {
          iv(e, t, a);
        } finally {
          ((ye = f), (V.p = n), (R.T = l));
        }
      }
      ((Ye = 1), Em(), zm(), Mm());
    }
  }
  function Em() {
    if (Ye === 1) {
      Ye = 0;
      var e = Za,
        t = gn,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = R.T), (R.T = null));
        var l = V.p;
        V.p = 2;
        var n = ye;
        ye |= 4;
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
                var L = v.ownerDocument || document,
                  E = (L && L.defaultView) || window;
                if (E.getSelection) {
                  var M = E.getSelection(),
                    k = v.textContent.length,
                    W = Math.min(p.start, k),
                    Te = p.end === void 0 ? W : Math.min(p.end, k);
                  !M.extend && W > Te && ((f = Te), (Te = W), (W = f));
                  var j = ff(v, W),
                    S = ff(v, Te);
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
                      W > Te
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
          ((ns = !!Eo), (zo = Eo = null));
        } finally {
          ((ye = n), (V.p = l), (R.T = a));
        }
      }
      ((e.current = t), (Ye = 2));
    }
  }
  function zm() {
    if (Ye === 2) {
      Ye = 0;
      var e = Za,
        t = gn,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = R.T), (R.T = null));
        var l = V.p;
        V.p = 2;
        var n = ye;
        ye |= 4;
        try {
          am(e, t.alternate, t);
        } finally {
          ((ye = n), (V.p = l), (R.T = a));
        }
      }
      Ye = 3;
    }
  }
  function Mm() {
    if (Ye === 4 || Ye === 3) {
      ((Ye = 0), L1());
      var e = Za,
        t = gn,
        a = xa,
        l = vm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ye = 5)
        : ((Ye = 0), (gn = Za = null), Cm(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (
        (n === 0 && (Ya = null),
        Rs(a),
        (t = t.stateNode),
        pt && typeof pt.onCommitFiberRoot == 'function')
      )
        try {
          pt.onCommitFiberRoot(qn, t, void 0, (t.current.flags & 128) === 128);
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
      ((xa & 3) !== 0 && Xc(),
        la(e),
        (n = e.pendingLanes),
        (a & 261930) !== 0 && (n & 42) !== 0 ? (e === ho ? gi++ : ((gi = 0), (ho = e))) : (gi = 0),
        pi(0));
    }
  }
  function Cm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Pn(t)));
  }
  function Xc() {
    return (Em(), zm(), Mm(), wm());
  }
  function wm() {
    if (Ye !== 5) return !1;
    var e = Za,
      t = fo;
    fo = 0;
    var a = Rs(xa),
      l = R.T,
      n = V.p;
    try {
      ((V.p = 32 > a ? 32 : a), (R.T = null), (a = mo), (mo = null));
      var i = Za,
        f = xa;
      if (((Ye = 0), (gn = Za = null), (xa = 0), (ye & 6) !== 0)) throw Error(o(331));
      var v = ye;
      if (
        ((ye |= 4),
        dm(i.current),
        om(i, i.current, f, a),
        (ye = v),
        pi(0, !1),
        pt && typeof pt.onPostCommitFiberRoot == 'function')
      )
        try {
          pt.onPostCommitFiberRoot(qn, i);
        } catch {}
      return !0;
    } finally {
      ((V.p = n), (R.T = l), Cm(e, t));
    }
  }
  function Om(e, t, a) {
    ((t = Bt(a, t)),
      (t = Zu(e.stateNode, t, 2)),
      (e = Ha(e, t, 2)),
      e !== null && (Un(e, 2), la(e)));
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
            (typeof l.componentDidCatch == 'function' && (Ya === null || !Ya.has(l)))
          ) {
            ((e = Bt(a, e)),
              (a = Rd(2)),
              (l = Ha(t, a, 2)),
              l !== null && (Dd(a, l, t, e), Un(l, 2), la(l)));
            break;
          }
        }
        t = t.return;
      }
  }
  function _o(e, t, a) {
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
        (Re === 4 || (Re === 3 && (ue & 62914560) === ue && 300 > gt() - Gc)
          ? (ye & 2) === 0 && pn(e, 0)
          : (oo |= a),
        _n === ue && (_n = 0)),
      la(e));
  }
  function Rm(e, t) {
    (t === 0 && (t = Nr()), (e = yl(e, t)), e !== null && (Un(e, t), la(e)));
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
  function yv(e, t) {
    return Ms(e, t);
  }
  var Qc = null,
    Sn = null,
    go = !1,
    Kc = !1,
    po = !1,
    Qa = 0;
  function la(e) {
    (e !== Sn && e.next === null && (Sn === null ? (Qc = Sn = e) : (Sn = Sn.next = e)),
      (Kc = !0),
      go || ((go = !0), gv()));
  }
  function pi(e, t) {
    if (!po && Kc) {
      po = !0;
      do
        for (var a = !1, l = Qc; l !== null; ) {
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
            i !== 0 && ((a = !0), qm(l, i));
          } else
            ((i = ue),
              (i = Ii(
                l,
                l === Ne ? i : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1
              )),
              (i & 3) === 0 || Hn(l, i) || ((a = !0), qm(l, i)));
          l = l.next;
        }
      while (a);
      po = !1;
    }
  }
  function _v() {
    Dm();
  }
  function Dm() {
    Kc = go = !1;
    var e = 0;
    Qa !== 0 && zv() && (e = Qa);
    for (var t = gt(), a = null, l = Qc; l !== null; ) {
      var n = l.next,
        i = Bm(l, t);
      (i === 0
        ? ((l.next = null), a === null ? (Qc = n) : (a.next = n), n === null && (Sn = a))
        : ((a = l), (e !== 0 || (i & 3) !== 0) && (Kc = !0)),
        (l = n));
    }
    ((Ye !== 0 && Ye !== 5) || pi(e), Qa !== 0 && (Qa = 0));
  }
  function Bm(e, t) {
    for (
      var a = e.suspendedLanes,
        l = e.pingedLanes,
        n = e.expirationTimes,
        i = e.pendingLanes & -62914561;
      0 < i;
    ) {
      var f = 31 - bt(i),
        v = 1 << f,
        p = n[f];
      (p === -1
        ? ((v & a) === 0 || (v & l) !== 0) && (n[f] = Y1(v, t))
        : p <= t && (e.expiredLanes |= v),
        (i &= ~v));
    }
    if (
      ((t = Ne),
      (a = ue),
      (a = Ii(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (l = e.callbackNode),
      a === 0 || (e === t && (be === 2 || be === 9)) || e.cancelPendingCommit !== null)
    )
      return (l !== null && l !== null && Cs(l), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Hn(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((l !== null && Cs(l), Rs(a))) {
        case 2:
        case 8:
          a = Tr;
          break;
        case 32:
          a = Ki;
          break;
        case 268435456:
          a = Ar;
          break;
        default:
          a = Ki;
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
    if (Ye !== 0 && Ye !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (Xc() && e.callbackNode !== a) return null;
    var l = ue;
    return (
      (l = Ii(e, e === Ne ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      l === 0
        ? null
        : (_m(e, l, t),
          Bm(e, gt()),
          e.callbackNode != null && e.callbackNode === a ? Lm.bind(null, e) : null)
    );
  }
  function qm(e, t) {
    if (Xc()) return null;
    _m(e, t, !0);
  }
  function gv() {
    Cv(function () {
      (ye & 6) !== 0 ? Ms(jr, _v) : Dm();
    });
  }
  function bo() {
    if (Qa === 0) {
      var e = cn;
      (e === 0 && ((e = Ji), (Ji <<= 1), (Ji & 261888) === 0 && (Ji = 256)), (Qa = e));
    }
    return Qa;
  }
  function Hm(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : ac('' + e);
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
      var v = new cc('action', 'action', null, l, n);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Qa !== 0) {
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
  (Zt(yf, 'onAnimationEnd'),
    Zt(_f, 'onAnimationIteration'),
    Zt(gf, 'onAnimationStart'),
    Zt('dblclick', 'onDoubleClick'),
    Zt('focusin', 'onFocus'),
    Zt('focusout', 'onBlur'),
    Zt(q0, 'onTransitionRun'),
    Zt(H0, 'onTransitionStart'),
    Zt(U0, 'onTransitionCancel'),
    Zt(pf, 'onTransitionEnd'),
    Zl('onMouseEnter', ['mouseout', 'mouseover']),
    Zl('onMouseLeave', ['mouseout', 'mouseover']),
    Zl('onPointerEnter', ['pointerout', 'pointerover']),
    Zl('onPointerLeave', ['pointerout', 'pointerover']),
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
  var bi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    xv = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(bi)
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
              oc(w);
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
              oc(w);
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
  var Jc = '_reactListening' + Math.random().toString(36).slice(2);
  function To(e) {
    if (!e[Jc]) {
      ((e[Jc] = !0),
        Rr.forEach(function (a) {
          a !== 'selectionchange' && (xv.has(a) || jo(a, !1, e), jo(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Jc] || ((t[Jc] = !0), jo('selectionchange', !1, t));
    }
  }
  function Vm(e, t, a, l) {
    switch (yh(t)) {
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
      !ks || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (n = !0),
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
            if (((f = $l(v)), f === null)) return;
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
        L = [];
      e: {
        var E = bf.get(e);
        if (E !== void 0) {
          var M = cc,
            k = e;
          switch (e) {
            case 'keypress':
              if (nc(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              M = v0;
              break;
            case 'focusin':
              ((k = 'focus'), (M = Qs));
              break;
            case 'focusout':
              ((k = 'blur'), (M = Qs));
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
              M = l0;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              M = g0;
              break;
            case yf:
            case _f:
            case gf:
              M = c0;
              break;
            case pf:
              M = b0;
              break;
            case 'scroll':
            case 'scrollend':
              M = t0;
              break;
            case 'wheel':
              M = x0;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              M = u0;
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
              M = T0;
          }
          var W = (t & 4) !== 0,
            Te = !W && (e === 'scroll' || e === 'scrollend'),
            j = W ? (E !== null ? E + 'Capture' : null) : E;
          W = [];
          for (var S = N, A; S !== null; ) {
            var B = S;
            if (
              ((A = B.stateNode),
              (B = B.tag),
              (B !== 5 && B !== 26 && B !== 27) ||
                A === null ||
                j === null ||
                ((B = $n(S, j)), B != null && W.push(Si(S, B, A))),
              Te)
            )
              break;
            S = S.return;
          }
          0 < W.length && ((E = new M(E, k, null, a, w)), L.push({ event: E, listeners: W }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((E = e === 'mouseover' || e === 'pointerover'),
            (M = e === 'mouseout' || e === 'pointerout'),
            E && a !== Gs && (k = a.relatedTarget || a.fromElement) && ($l(k) || k[Vl]))
          )
            break e;
          if (
            (M || E) &&
            ((E =
              w.window === w
                ? w
                : (E = w.ownerDocument)
                  ? E.defaultView || E.parentWindow
                  : window),
            M
              ? ((k = a.relatedTarget || a.toElement),
                (M = N),
                (k = k ? $l(k) : null),
                k !== null &&
                  ((Te = d(k)), (W = k.tag), k !== Te || (W !== 5 && W !== 27 && W !== 6)) &&
                  (k = null))
              : ((M = null), (k = N)),
            M !== k)
          ) {
            if (
              ((W = Kr),
              (B = 'onMouseLeave'),
              (j = 'onMouseEnter'),
              (S = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((W = Wr), (B = 'onPointerLeave'), (j = 'onPointerEnter'), (S = 'pointer')),
              (Te = M == null ? E : Vn(M)),
              (A = k == null ? E : Vn(k)),
              (E = new W(B, S + 'leave', M, a, w)),
              (E.target = Te),
              (E.relatedTarget = A),
              (B = null),
              $l(w) === N &&
                ((W = new W(j, S + 'enter', k, a, w)),
                (W.target = A),
                (W.relatedTarget = Te),
                (B = W)),
              (Te = B),
              M && k)
            )
              t: {
                for (W = jv, j = M, S = k, A = 0, B = j; B; B = W(B)) A++;
                B = 0;
                for (var K = S; K; K = W(K)) B++;
                for (; 0 < A - B; ) ((j = W(j)), A--);
                for (; 0 < B - A; ) ((S = W(S)), B--);
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
            (M !== null && $m(L, E, M, W, !1), k !== null && Te !== null && $m(L, Te, k, W, !0));
          }
        }
        e: {
          if (
            ((E = N ? Vn(N) : window),
            (M = E.nodeName && E.nodeName.toLowerCase()),
            M === 'select' || (M === 'input' && E.type === 'file'))
          )
            var he = nf;
          else if (af(E))
            if (cf) he = D0;
            else {
              he = O0;
              var Z = w0;
            }
          else
            ((M = E.nodeName),
              !M || M.toLowerCase() !== 'input' || (E.type !== 'checkbox' && E.type !== 'radio')
                ? N && Us(N.elementType) && (he = nf)
                : (he = R0));
          if (he && (he = he(e, N))) {
            lf(L, he, a, w);
            break e;
          }
          (Z && Z(e, E, N),
            e === 'focusout' &&
              N &&
              E.type === 'number' &&
              N.memoizedProps.value != null &&
              Hs(E, 'number', E.value));
        }
        switch (((Z = N ? Vn(N) : window), e)) {
          case 'focusin':
            (af(Z) || Z.contentEditable === 'true') && ((Fl = Z), (Ps = N), (Wn = null));
            break;
          case 'focusout':
            Wn = Ps = Fl = null;
            break;
          case 'mousedown':
            eu = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((eu = !1), hf(L, a, w));
            break;
          case 'selectionchange':
            if (L0) break;
          case 'keydown':
          case 'keyup':
            hf(L, a, w);
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
          Wl
            ? ef(e, a) && (oe = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (oe = 'onCompositionStart');
        (oe &&
          (Fr &&
            a.locale !== 'ko' &&
            (Wl || oe !== 'onCompositionStart'
              ? oe === 'onCompositionEnd' && Wl && (le = Xr())
              : ((wa = w), (Ys = 'value' in wa ? wa.value : wa.textContent), (Wl = !0))),
          (Z = Wc(N, oe)),
          0 < Z.length &&
            ((oe = new Jr(oe, e, null, a, w)),
            L.push({ event: oe, listeners: Z }),
            le ? (oe.data = le) : ((le = tf(a)), le !== null && (oe.data = le)))),
          (le = N0 ? E0(e, a) : z0(e, a)) &&
            ((oe = Wc(N, 'onBeforeInput')),
            0 < oe.length &&
              ((Z = new Jr('onBeforeInput', 'beforeinput', null, a, w)),
              L.push({ event: Z, listeners: oe }),
              (Z.data = le))),
          pv(L, e, N, a, w));
      }
      Gm(L, t);
    });
  }
  function Si(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function Wc(e, t) {
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
          ? ((N = $n(a, i)), N != null && f.unshift(Si(a, N, p)))
          : n || ((N = $n(a, i)), N != null && f.push(Si(a, N, p)))),
        (a = a.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var Tv = /\r\n?/g,
    Av = /\u0000|\uFFFD/g;
  function km(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Tv,
        `
`
      )
      .replace(Av, '');
  }
  function Ym(e, t) {
    return ((t = km(t)), km(e) === t);
  }
  function je(e, t, a, l, n, i) {
    switch (a) {
      case 'children':
        typeof l == 'string'
          ? t === 'body' || (t === 'textarea' && l === '') || Ql(e, l)
          : (typeof l == 'number' || typeof l == 'bigint') && t !== 'body' && Ql(e, '' + l);
        break;
      case 'className':
        ec(e, 'class', l);
        break;
      case 'tabIndex':
        ec(e, 'tabindex', l);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        ec(e, a, l);
        break;
      case 'style':
        kr(e, l, i);
        break;
      case 'data':
        if (t !== 'object') {
          ec(e, 'data', l);
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
        ((l = ac('' + l)), e.setAttribute(a, l));
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
        ((l = ac('' + l)), e.setAttribute(a, l));
        break;
      case 'onClick':
        l != null && (e.onclick = sa);
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
        ((a = ac('' + l)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (se('beforetoggle', e), se('toggle', e), Pi(e, 'popover', l));
        break;
      case 'xlinkActuate':
        ca(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', l);
        break;
      case 'xlinkArcrole':
        ca(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', l);
        break;
      case 'xlinkRole':
        ca(e, 'http://www.w3.org/1999/xlink', 'xlink:role', l);
        break;
      case 'xlinkShow':
        ca(e, 'http://www.w3.org/1999/xlink', 'xlink:show', l);
        break;
      case 'xlinkTitle':
        ca(e, 'http://www.w3.org/1999/xlink', 'xlink:title', l);
        break;
      case 'xlinkType':
        ca(e, 'http://www.w3.org/1999/xlink', 'xlink:type', l);
        break;
      case 'xmlBase':
        ca(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', l);
        break;
      case 'xmlLang':
        ca(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', l);
        break;
      case 'xmlSpace':
        ca(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', l);
        break;
      case 'is':
        Pi(e, 'is', l);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = P1.get(a) || a), Pi(e, a, l));
    }
  }
  function No(e, t, a, l, n, i) {
    switch (a) {
      case 'style':
        kr(e, l, i);
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
          ? Ql(e, l)
          : (typeof l == 'number' || typeof l == 'bigint') && Ql(e, '' + l);
        break;
      case 'onScroll':
        l != null && se('scroll', e);
        break;
      case 'onScrollEnd':
        l != null && se('scrollend', e);
        break;
      case 'onClick':
        l != null && (e.onclick = sa);
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
            a in e ? (e[a] = l) : l === !0 ? e.setAttribute(a, '') : Pi(e, a, l);
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
          t != null ? Xl(e, !!l, t, !1) : a != null && Xl(e, !!l, a, !0));
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
        for (M in a) {
          var L = a[M];
          if (a.hasOwnProperty(M) && L != null)
            switch (M) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                p = L;
              default:
                l.hasOwnProperty(M) || je(e, t, M, null, l, L);
            }
        }
        for (var E in l) {
          var M = l[E];
          if (((L = a[E]), l.hasOwnProperty(E) && (M != null || L != null)))
            switch (E) {
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
                M !== L && je(e, t, E, M, l, L);
            }
        }
        qs(e, f, v, p, N, w, i, n);
        return;
      case 'select':
        M = f = v = E = null;
        for (i in a)
          if (((p = a[i]), a.hasOwnProperty(i) && p != null))
            switch (i) {
              case 'value':
                break;
              case 'multiple':
                M = p;
              default:
                l.hasOwnProperty(i) || je(e, t, i, null, l, p);
            }
        for (n in l)
          if (((i = l[n]), (p = a[n]), l.hasOwnProperty(n) && (i != null || p != null)))
            switch (n) {
              case 'value':
                E = i;
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
          (l = M),
          E != null
            ? Xl(e, !!a, E, !1)
            : !!l != !!a && (t != null ? Xl(e, !!a, t, !0) : Xl(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        M = E = null;
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
                E = n;
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
                n !== i && je(e, t, f, n, l, i);
            }
        Gr(e, E, M);
        return;
      case 'option':
        for (var k in a)
          if (((E = a[k]), a.hasOwnProperty(k) && E != null && !l.hasOwnProperty(k)))
            switch (k) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                je(e, t, k, null, l, E);
            }
        for (p in l)
          if (((E = l[p]), (M = a[p]), l.hasOwnProperty(p) && E !== M && (E != null || M != null)))
            switch (p) {
              case 'selected':
                e.selected = E && typeof E != 'function' && typeof E != 'symbol';
                break;
              default:
                je(e, t, p, E, l, M);
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
          ((E = a[W]),
            a.hasOwnProperty(W) && E != null && !l.hasOwnProperty(W) && je(e, t, W, null, l, E));
        for (N in l)
          if (((E = l[N]), (M = a[N]), l.hasOwnProperty(N) && E !== M && (E != null || M != null)))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (E != null) throw Error(o(137, t));
                break;
              default:
                je(e, t, N, E, l, M);
            }
        return;
      default:
        if (Us(t)) {
          for (var Te in a)
            ((E = a[Te]),
              a.hasOwnProperty(Te) &&
                E !== void 0 &&
                !l.hasOwnProperty(Te) &&
                No(e, t, Te, void 0, l, E));
          for (w in l)
            ((E = l[w]),
              (M = a[w]),
              !l.hasOwnProperty(w) ||
                E === M ||
                (E === void 0 && M === void 0) ||
                No(e, t, w, E, l, M));
          return;
        }
    }
    for (var j in a)
      ((E = a[j]),
        a.hasOwnProperty(j) && E != null && !l.hasOwnProperty(j) && je(e, t, j, null, l, E));
    for (L in l)
      ((E = l[L]),
        (M = a[L]),
        !l.hasOwnProperty(L) || E === M || (E == null && M == null) || je(e, t, L, E, l, M));
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
              L = p.initiatorType;
            w && Zm(L) && ((p = p.responseEnd), (f += w * (p < v ? 1 : (v - N) / (p - N))));
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
  function Fc(e) {
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
  function Ka(e) {
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
            (e.removeChild(n), An(t));
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
    An(t);
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
    switch (((t = Fc(a)), e)) {
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
    ah = new Set();
  function Ic(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var ja = V.d;
  V.d = { f: Bv, r: Lv, D: qv, C: Hv, L: Uv, m: Gv, X: $v, S: Vv, M: kv };
  function Bv() {
    var e = ja.f(),
      t = kc();
    return e || t;
  }
  function Lv(e) {
    var t = kl(e);
    t !== null && t.tag === 5 && t.type === 'form' ? pd(t) : ja.r(e);
  }
  var xn = typeof document > 'u' ? null : document;
  function lh(e, t, a) {
    var l = xn;
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
    (ja.D(e), lh('dns-prefetch', e, null));
  }
  function Hv(e, t) {
    (ja.C(e, t), lh('preconnect', e, t));
  }
  function Uv(e, t, a) {
    ja.L(e, t, a);
    var l = xn;
    if (l && e && t) {
      var n = 'link[rel="preload"][as="' + Rt(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((n += '[imagesrcset="' + Rt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (n += '[imagesizes="' + Rt(a.imageSizes) + '"]'))
        : (n += '[href="' + Rt(e) + '"]');
      var i = n;
      switch (t) {
        case 'style':
          i = jn(e);
          break;
        case 'script':
          i = Tn(e);
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
  function Gv(e, t) {
    ja.m(e, t);
    var a = xn;
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
          i = Tn(e);
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
  function Vv(e, t, a) {
    ja.S(e, t, a);
    var l = xn;
    if (l && e) {
      var n = Yl(l).hoistableStyles,
        i = jn(e);
      t = t || 'default';
      var f = n.get(i);
      if (!f) {
        var v = { loading: 0, preload: null };
        if ((f = l.querySelector(ji(i)))) v.loading = 5;
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
            Pc(f, t, l));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: v }), n.set(i, f));
      }
    }
  }
  function $v(e, t) {
    ja.X(e, t);
    var a = xn;
    if (a && e) {
      var l = Yl(a).hoistableScripts,
        n = Tn(e),
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
  function kv(e, t) {
    ja.M(e, t);
    var a = xn;
    if (a && e) {
      var l = Yl(a).hoistableScripts,
        n = Tn(e),
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
  function nh(e, t, a, l) {
    var n = (n = ie.current) ? Ic(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = jn(a.href)),
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
          e = jn(a.href);
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
                i || Yv(n, e, a, f.state))),
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
            ? ((t = Tn(a)),
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
  function jn(e) {
    return 'href="' + Rt(e) + '"';
  }
  function ji(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function ih(e) {
    return T({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function Yv(e, t, a, l) {
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
  function Tn(e) {
    return '[src="' + Rt(e) + '"]';
  }
  function Ti(e) {
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
            Pc(l, a.precedence, e),
            (t.instance = l)
          );
        case 'stylesheet':
          n = jn(a.href);
          var i = e.querySelector(ji(n));
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
            Pc(i, a.precedence, e),
            (t.instance = i)
          );
        case 'script':
          return (
            (i = Tn(a.src)),
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
        ((l = t.instance), (t.state.loading |= 4), Pc(l, a.precedence, e));
    return t.instance;
  }
  function Pc(e, t, a) {
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
  var es = null;
  function sh(e, t, a) {
    if (es === null) {
      var l = new Map(),
        n = (es = new Map());
      n.set(a, l);
    } else ((n = es), (l = n.get(a)), l || ((l = new Map()), n.set(a, l)));
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
        var n = jn(l.href),
          i = t.querySelector(ji(n));
        if (i) {
          ((t = i._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = ts.bind(e)), t.then(e, e)),
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
          (a = ts.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var qo = 0;
  function Qv(e, t) {
    return (
      e.stylesheets && e.count === 0 && ls(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var l = setTimeout(function () {
              if ((e.stylesheets && ls(e, e.stylesheets), e.unsuspend)) {
                var i = e.unsuspend;
                ((e.unsuspend = null), i());
              }
            }, 6e4 + t);
            0 < e.imgBytes && qo === 0 && (qo = 62500 * Ev());
            var n = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && ls(e, e.stylesheets), e.unsuspend))
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
  function ts() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) ls(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var as = null;
  function ls(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (as = new Map()), t.forEach(Kv, e), (as = null), ts.call(e)));
  }
  function Kv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = as.get(e);
      if (a) var l = a.get(null);
      else {
        ((a = new Map()), as.set(e, a));
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
        (l = ts.bind(this)),
        n.addEventListener('load', l),
        n.addEventListener('error', l),
        i
          ? i.parentNode.insertBefore(n, i.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(n, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Ai = {
    $$typeof: _e,
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
  function rh(e, t, a, l, n, i, f, v, p, N, w, L) {
    return (
      (e = new Jv(e, t, a, f, p, N, w, L, v)),
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
      pu(i),
      e
    );
  }
  function fh(e) {
    return e ? ((e = en), e) : en;
  }
  function dh(e, t, a, l, n, i) {
    ((n = fh(n)),
      l.context === null ? (l.context = n) : (l.pendingContext = n),
      (l = qa(t)),
      (l.payload = { element: a }),
      (i = i === void 0 ? null : i),
      i !== null && (l.callback = i),
      (a = Ha(e, l, t)),
      a !== null && (_t(a, e, t), li(a, e, t)));
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
      var t = yl(e, 67108864);
      (t !== null && _t(t, e, 67108864), Ho(e, 67108864));
    }
  }
  function vh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Et();
      t = Os(t);
      var a = yl(e, t);
      (a !== null && _t(a, e, t), Ho(e, t));
    }
  }
  var ns = !0;
  function Wv(e, t, a, l) {
    var n = R.T;
    R.T = null;
    var i = V.p;
    try {
      ((V.p = 2), Uo(e, t, a, l));
    } finally {
      ((V.p = i), (R.T = n));
    }
  }
  function Fv(e, t, a, l) {
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
    if (ns) {
      var n = Go(l);
      if (n === null) (Ao(e, t, l, is, a), _h(e, l));
      else if (Pv(n, e, t, a, l)) l.stopPropagation();
      else if ((_h(e, l), t & 4 && -1 < Iv.indexOf(e))) {
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
                      var p = 1 << (31 - bt(f));
                      ((v.entanglements[1] |= p), (f &= ~p));
                    }
                    (la(i), (ye & 6) === 0 && ((Vc = gt() + 500), pi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = yl(i, 2)), v !== null && _t(v, i, 2), kc(), Ho(i, 2));
            }
          if (((i = Go(l)), i === null && Ao(e, t, l, is, a), i === n)) break;
          n = i;
        }
        n !== null && l.stopPropagation();
      } else Ao(e, t, l, null, a);
    }
  }
  function Go(e) {
    return ((e = Vs(e)), Vo(e));
  }
  var is = null;
  function Vo(e) {
    if (((is = null), (e = $l(e)), e !== null)) {
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
    return ((is = e), null);
  }
  function yh(e) {
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
        switch (q1()) {
          case jr:
            return 2;
          case Tr:
            return 8;
          case Ki:
          case H1:
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
    Ja = null,
    Wa = null,
    Fa = null,
    Ni = new Map(),
    Ei = new Map(),
    Ia = [],
    Iv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function _h(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Ja = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Wa = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Fa = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Ni.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Ei.delete(t.pointerId);
    }
  }
  function zi(e, t, a, l, n, i) {
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
        return ((Ja = zi(Ja, e, t, a, l, n)), !0);
      case 'dragenter':
        return ((Wa = zi(Wa, e, t, a, l, n)), !0);
      case 'mouseover':
        return ((Fa = zi(Fa, e, t, a, l, n)), !0);
      case 'pointerover':
        var i = n.pointerId;
        return (Ni.set(i, zi(Ni.get(i) || null, e, t, a, l, n)), !0);
      case 'gotpointercapture':
        return ((i = n.pointerId), Ei.set(i, zi(Ei.get(i) || null, e, t, a, l, n)), !0);
    }
    return !1;
  }
  function gh(e) {
    var t = $l(e.target);
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
          if (((t = y(a)), t !== null)) {
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
  function cs(e) {
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
    cs(e) && a.delete(t);
  }
  function ey() {
    (($o = !1),
      Ja !== null && cs(Ja) && (Ja = null),
      Wa !== null && cs(Wa) && (Wa = null),
      Fa !== null && cs(Fa) && (Fa = null),
      Ni.forEach(ph),
      Ei.forEach(ph));
  }
  function ss(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      $o || (($o = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, ey)));
  }
  var us = null;
  function bh(e) {
    us !== e &&
      ((us = e),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        us === e && (us = null);
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
  function An(e) {
    function t(p) {
      return ss(p, e);
    }
    (Ja !== null && ss(Ja, e),
      Wa !== null && ss(Wa, e),
      Fa !== null && ss(Fa, e),
      Ni.forEach(t),
      Ei.forEach(t));
    for (var a = 0; a < Ia.length; a++) {
      var l = Ia[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Ia.length && ((a = Ia[0]), a.blockedOn === null); )
      (gh(a), a.blockedOn === null && Ia.shift());
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
  function ko(e) {
    this._internalRoot = e;
  }
  ((os.prototype.render = ko.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var a = t.current,
        l = Et();
      dh(a, l, e, t, null, null);
    }),
    (os.prototype.unmount = ko.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (dh(e.current, 2, null, e, null, null), kc(), (t[Vl] = null));
        }
      }));
  function os(e) {
    this._internalRoot = e;
  }
  os.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Cr();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Ia.length && t !== 0 && t < Ia[a].priority; a++);
      (Ia.splice(a, 0, e), a === 0 && gh(e));
    }
  };
  var xh = u.version;
  if (xh !== '19.2.5') throw Error(o(527, xh, '19.2.5'));
  V.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return ((e = g(t)), (e = e !== null ? b(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var ty = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: R,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var rs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!rs.isDisabled && rs.supportsFiber)
      try {
        ((qn = rs.inject(ty)), (pt = rs));
      } catch {}
  }
  return (
    (Ci.createRoot = function (e, t) {
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
        (e[Vl] = t.current),
        To(e),
        new ko(t)
      );
    }),
    (Ci.hydrateRoot = function (e, t, a) {
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
        (l = Et()),
        (l = Os(l)),
        (n = qa(l)),
        (n.callback = null),
        Ha(a, n, l),
        (a = l),
        (t.current.lanes = a),
        Un(t, a),
        la(t),
        (e[Vl] = t.current),
        To(e),
        new os(t)
      );
    }),
    (Ci.version = '19.2.5'),
    Ci
  );
}
var Oh;
function hy() {
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
      } catch (u) {
        console.error(u);
      }
  }
  return (c(), (Zo.exports = my()), Zo.exports);
}
var vy = hy(),
  de = dr();
const fs = iy(de),
  yy = '_content_11wqi_1',
  _y = { content: yy },
  gy = '_tabBar_rhd8d_2',
  py = '_fullWidth_rhd8d_9',
  by = '_tab_rhd8d_2',
  Sy = '_tabActive_rhd8d_54',
  xy = '_tabDisabled_rhd8d_101',
  jy = '_tabIcon_rhd8d_107',
  Ty = '_tabLabel_rhd8d_114',
  Ay = '_badge_rhd8d_119',
  Ny = '_badgeActive_rhd8d_137',
  Ey = '_indicator_rhd8d_158',
  zt = {
    tabBar: gy,
    fullWidth: py,
    tab: by,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: Sy,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: xy,
    tabIcon: jy,
    tabLabel: Ty,
    badge: Ay,
    badgeActive: Ny,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Ey,
  },
  zy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  My = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Cy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  wy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Oy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Ry = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Dy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  By = { screw: Ry, bolt: My, alloy: zy, laser: Oy, cannon: Cy, thunder: Dy, cutter: wy };
function Ly(c, u) {
  return c.replace(/\swidth="\d+"/, ` width="${u}"`).replace(/\sheight="\d+"/, ` height="${u}"`);
}
function Ee({ name: c, size: u = 16, color: s = 'currentColor', className: o }) {
  const m = By[c];
  if (m)
    return r.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: s, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: Ly(m, u) },
    });
  const d = {
    width: u,
    height: u,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: s,
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
            fill: s,
            fillOpacity: '0.15',
            stroke: s,
          }),
          r.jsx('circle', { cx: '12', cy: '12', r: '3.2' }),
        ],
      });
    case 'tower':
      return r.jsx('svg', {
        ...d,
        children: r.jsx('polygon', {
          points: '12,4 20,20 4,20',
          fill: s,
          stroke: s,
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
            fill: s,
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
          fill: s,
          stroke: 'none',
        }),
      });
    case 'skull':
      return r.jsxs('svg', {
        ...d,
        children: [
          r.jsx('circle', { cx: '12', cy: '10', r: '7' }),
          r.jsx('circle', { cx: '9.5', cy: '9.5', r: '1.5', fill: s, stroke: 'none' }),
          r.jsx('circle', { cx: '14.5', cy: '9.5', r: '1.5', fill: s, stroke: 'none' }),
          r.jsx('path', { d: 'M8 16 V21 M12 16 V21 M16 16 V21', strokeWidth: '2.5' }),
          r.jsx('rect', { x: '7', y: '16', width: '10', height: '1.5', fill: s, stroke: 'none' }),
        ],
      });
    case 'spark':
      return r.jsx('svg', {
        ...d,
        children: r.jsx('polygon', {
          points: '12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10',
          fill: s,
          stroke: 'none',
        }),
      });
    case 'target':
      return r.jsxs('svg', {
        ...d,
        children: [
          r.jsx('circle', { cx: '12', cy: '12', r: '9' }),
          r.jsx('circle', { cx: '12', cy: '12', r: '5' }),
          r.jsx('circle', { cx: '12', cy: '12', r: '1.5', fill: s, stroke: 'none' }),
          r.jsx('line', { x1: '12', y1: '3', x2: '12', y2: '6' }),
          r.jsx('line', { x1: '12', y1: '18', x2: '12', y2: '21' }),
          r.jsx('line', { x1: '3', y1: '12', x2: '6', y2: '12' }),
          r.jsx('line', { x1: '18', y1: '12', x2: '21', y2: '12' }),
        ],
      });
    case 'play':
      return r.jsx('svg', {
        ...d,
        children: r.jsx('polygon', { points: '6,4 20,12 6,20', fill: s, stroke: 'none' }),
      });
    case 'pause':
      return r.jsxs('svg', {
        ...d,
        children: [
          r.jsx('rect', { x: '5', y: '4', width: '5', height: '16', fill: s, stroke: 'none' }),
          r.jsx('rect', { x: '14', y: '4', width: '5', height: '16', fill: s, stroke: 'none' }),
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
  value: u,
  onChange: s,
  variant: o = 'underline',
  size: m = 'md',
  fullWidth: d = !1,
  align: h = 'start',
}) {
  const y = de.useRef(null),
    [_, g] = de.useState({ left: 0, width: 0 });
  return (
    de.useEffect(() => {
      const b = y.current;
      if (!b) return;
      const T = c.findIndex((H) => H.key === u);
      if (T < 0) return;
      const C = b.querySelectorAll('[role="tab"]')[T];
      if (!C) return;
      const O = b.getBoundingClientRect(),
        U = C.getBoundingClientRect();
      g({ left: U.left - O.left, width: U.width });
    }, [u, c]),
    r.jsxs('div', {
      ref: y,
      role: 'tablist',
      className: [
        zt.tabBar,
        zt[`variant-${o}`],
        zt[`size-${m}`],
        zt[`align-${h}`],
        d ? zt.fullWidth : '',
      ]
        .filter(Boolean)
        .join(' '),
      children: [
        c.map((b) => {
          const T = b.key === u;
          return r.jsxs(
            'button',
            {
              type: 'button',
              role: 'tab',
              'aria-selected': T,
              disabled: b.disabled === !0,
              className: [zt.tab, T ? zt.tabActive : '', b.disabled === !0 ? zt.tabDisabled : '']
                .filter(Boolean)
                .join(' '),
              onClick: () => {
                b.disabled !== !0 && s(b.key);
              },
              children: [
                b.iconName != null &&
                  r.jsx('span', {
                    className: zt.tabIcon,
                    'aria-hidden': 'true',
                    children: r.jsx(Ee, { name: b.iconName, size: m === 'sm' ? 12 : 14 }),
                  }),
                r.jsx('span', { className: zt.tabLabel, children: b.label }),
                b.badge != null &&
                  r.jsx('span', {
                    className: [zt.badge, T ? zt.badgeActive : ''].filter(Boolean).join(' '),
                    children: b.badge,
                  }),
              ],
            },
            b.key
          );
        }),
        o === 'underline' &&
          r.jsx('span', {
            className: zt.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${_.left}px)`, width: _.width },
          }),
      ],
    })
  );
}
const qy = '_shell_1wkhk_6',
  Hy = '_header_1wkhk_19',
  Uy = '_main_1wkhk_32',
  Gy = '_noScroll_1wkhk_41',
  Vy = '_footer_1wkhk_46',
  $y = '_battle_1wkhk_59',
  Nn = { shell: qy, header: Hy, main: Uy, noScroll: Gy, footer: Vy, battle: $y };
function ql({ header: c, footer: u, children: s, noScroll: o = !1, variant: m = 'default' }) {
  return r.jsxs('div', {
    className: [Nn.shell, m === 'battle' ? Nn.battle : ''].filter(Boolean).join(' '),
    children: [
      c != null && r.jsx('header', { className: Nn.header, children: c }),
      r.jsx('main', {
        className: [Nn.main, o ? Nn.noScroll : ''].filter(Boolean).join(' '),
        children: s,
      }),
      u != null && r.jsx('footer', { className: Nn.footer, children: u }),
    ],
  });
}
const ky = '_nav_4erx0_2',
  Yy = '_tab_4erx0_10',
  Zy = '_active_4erx0_33',
  Xy = '_iconWrap_4erx0_38',
  Qy = '_badge_4erx0_51',
  wi = { nav: ky, tab: Yy, active: Zy, iconWrap: Xy, badge: Qy },
  Ky = '_text_1wy1n_1',
  Jy = '_variant_heading_1_1wy1n_6',
  Wy = '_variant_heading_2_1wy1n_15',
  Fy = '_variant_heading_3_1wy1n_24',
  Iy = '_variant_body_1wy1n_33',
  Py = '_variant_caption_1wy1n_41',
  e_ = '_variant_label_1wy1n_49',
  t_ = '_variant_numeric_l_1wy1n_58',
  a_ = '_variant_numeric_m_1wy1n_67',
  l_ = '_variant_numeric_s_1wy1n_76',
  n_ = '_color_default_1wy1n_85',
  i_ = '_color_mid_1wy1n_89',
  c_ = '_color_dim_1wy1n_93',
  s_ = '_color_disabled_1wy1n_97',
  u_ = '_color_primary_1wy1n_101',
  o_ = '_color_secondary_1wy1n_105',
  r_ = '_color_danger_1wy1n_109',
  f_ = '_color_success_1wy1n_113',
  d_ = '_color_warning_1wy1n_117',
  m_ = '_truncate_1wy1n_121',
  h_ = '_align_left_1wy1n_128',
  v_ = '_align_center_1wy1n_132',
  y_ = '_align_right_1wy1n_136',
  Oi = {
    text: Ky,
    variant_heading_1: Jy,
    variant_heading_2: Wy,
    variant_heading_3: Fy,
    variant_body: Iy,
    variant_caption: Py,
    variant_label: e_,
    variant_numeric_l: t_,
    variant_numeric_m: a_,
    variant_numeric_s: l_,
    color_default: n_,
    color_mid: i_,
    color_dim: c_,
    color_disabled: s_,
    color_primary: u_,
    color_secondary: o_,
    color_danger: r_,
    color_success: f_,
    color_warning: d_,
    truncate: m_,
    align_left: h_,
    align_center: v_,
    align_right: y_,
  };
function __(c) {
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
  children: u,
  as: s,
  color: o = 'default',
  className: m,
  truncate: d,
  align: h,
  style: y,
}) {
  const _ = s ?? __(c),
    g = c.replace(/-/g, '_'),
    b = o === 'text' ? 'default' : o;
  return r.jsx(_, {
    className: [
      Oi.text,
      Oi[`variant_${g}`],
      Oi[`color_${b}`],
      d ? Oi.truncate : '',
      h ? Oi[`align_${h}`] : '',
      m,
    ]
      .filter(Boolean)
      .join(' '),
    style: y,
    children: u,
  });
}
const g_ = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function ki({ active: c, onChange: u, badges: s }) {
  return r.jsx('nav', {
    className: wi.nav,
    'aria-label': 'メインナビゲーション',
    children: g_.map(({ key: o, label: m, iconName: d }) => {
      const h = o === c,
        y = s == null ? void 0 : s[o];
      return r.jsxs(
        'button',
        {
          type: 'button',
          className: [wi.tab, h ? wi.active : ''].filter(Boolean).join(' '),
          onClick: () => u(o),
          'aria-current': h ? 'page' : void 0,
          'aria-label': m,
          children: [
            r.jsxs('span', {
              className: wi.iconWrap,
              children: [
                r.jsx(Ee, {
                  name: d,
                  size: 22,
                  color: h ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                y != null &&
                  r.jsx('span', { className: wi.badge, 'aria-hidden': 'true', children: y }),
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
const p_ = '_root_kv5uk_2',
  b_ = '_titleRow_kv5uk_8',
  S_ = '_left_kv5uk_17',
  x_ = '_center_kv5uk_24',
  j_ = '_right_kv5uk_33',
  T_ = '_currencies_kv5uk_42',
  A_ = '_actions_kv5uk_49',
  N_ = '_tabBarSlot_kv5uk_56',
  el = {
    root: p_,
    titleRow: b_,
    left: S_,
    center: x_,
    right: j_,
    currencies: T_,
    actions: A_,
    tabBarSlot: N_,
  },
  E_ = '_root_i843c_2',
  z_ = '_icon_i843c_10',
  M_ = '_delta_i843c_30',
  C_ = '_deltaSm_i843c_37',
  w_ = '_deltaMd_i843c_41',
  O_ = '_deltaLg_i843c_45',
  R_ = '_subtle_i843c_50',
  D_ = '_currencyLabel_i843c_55',
  B_ = '_rankStamp_i843c_64',
  na = {
    root: E_,
    icon: z_,
    delta: M_,
    deltaSm: C_,
    deltaMd: w_,
    deltaLg: O_,
    subtle: R_,
    currencyLabel: D_,
    rankStamp: B_,
  },
  L_ = '_root_1wxcz_1',
  q_ = '_sizeSm_1wxcz_13',
  H_ = '_sizeMd_1wxcz_17',
  U_ = '_sizeLg_1wxcz_21',
  G_ = '_sizeXl_1wxcz_25',
  V_ = '_affix_1wxcz_29',
  Ml = { root: L_, sizeSm: q_, sizeMd: H_, sizeLg: U_, sizeXl: G_, affix: V_ };
function nr(c) {
  let u = c.length;
  for (; u > 0 && c[u - 1] === 0; ) u--;
  return c.slice(0, u);
}
function Ri(c) {
  let u = 0;
  for (let s = 0; s < c.length; s++) {
    const o = Math.floor(c[s] + u);
    ((c[s] = o % 1e3), (u = Math.floor(o / 1e3)));
  }
  for (; u > 0; ) (c.push(u % 1e3), (u = Math.floor(u / 1e3)));
  return nr(c);
}
function $_(c, u) {
  for (; u !== 0; ) {
    const s = u;
    ((u = c % u), (c = s));
  }
  return c;
}
function k_(c) {
  const u = c.toString(),
    s = u.indexOf('.');
  if (s === -1) return { num: Math.round(c), den: 1 };
  const o = u.length - s - 1,
    m = Math.pow(10, o),
    d = Math.round(c * m),
    h = $_(Math.abs(d), m);
  return { num: d / h, den: m / h };
}
function Y_(c) {
  let u = '',
    s = c;
  for (; s > 0; )
    ((s -= 1), (u = String.fromCharCode(65 + (s % 26)) + u), (s = Math.floor(s / 26)));
  return u;
}
const st = class st {
  constructor(u) {
    Kt(this, 'digits');
    this.digits = u;
  }
  static fromNumber(u) {
    if (u <= 0) return st.ZERO;
    const s = [];
    let o = Math.floor(u);
    for (; o > 0; ) (s.push(o % 1e3), (o = Math.floor(o / 1e3)));
    return new st(nr(s));
  }
  static fromString(u) {
    const s = u.trim();
    if (s === '' || s === '0') return st.ZERO;
    const o = [];
    let m = s.length;
    for (; m > 0; ) {
      const d = Math.max(0, m - 3);
      (o.push(parseInt(s.slice(d, m), 10)), (m = d));
    }
    return new st(nr(o));
  }
  static fromJSON(u) {
    return new st(Ri([...u]));
  }
  add(u) {
    const s = this.digits,
      o = u.digits,
      m = Math.max(s.length, o.length),
      d = new Array(m).fill(0);
    let h = 0;
    for (let y = 0; y < m; y++) {
      const _ = (s[y] ?? 0) + (o[y] ?? 0) + h;
      ((d[y] = _ % 1e3), (h = Math.floor(_ / 1e3)));
    }
    return (h > 0 && d.push(h), new st(Ri(d)));
  }
  sub(u) {
    if (this.compare(u) <= 0) return st.ZERO;
    const s = this.digits,
      o = u.digits,
      m = new Array(s.length).fill(0);
    let d = 0;
    for (let h = 0; h < s.length; h++) {
      let y = (s[h] ?? 0) - (o[h] ?? 0) - d;
      (y < 0 ? ((y += 1e3), (d = 1)) : (d = 0), (m[h] = y));
    }
    return new st(Ri(m));
  }
  mulInt(u) {
    if (u <= 0 || this.isZero()) return st.ZERO;
    const s = this.digits,
      o = new Array(s.length).fill(0);
    let m = 0;
    for (let d = 0; d < s.length; d++) {
      const h = s[d] * u + m;
      ((o[d] = h % 1e3), (m = Math.floor(h / 1e3)));
    }
    for (; m > 0; ) (o.push(m % 1e3), (m = Math.floor(m / 1e3)));
    return new st(Ri(o));
  }
  divInt(u) {
    if (u <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return st.ZERO;
    const s = this.digits,
      o = new Array(s.length).fill(0);
    let m = 0;
    for (let d = s.length - 1; d >= 0; d--) {
      const h = m * 1e3 + (s[d] ?? 0);
      ((o[d] = Math.floor(h / u)), (m = h % u));
    }
    return (m > 0 && (o[0] += 1), new st(Ri(o)));
  }
  mulRational(u, s) {
    return this.mulInt(u).divInt(s);
  }
  mulNumber(u) {
    const { num: s, den: o } = k_(u);
    return this.mulRational(s, o);
  }
  compare(u) {
    const s = this.digits,
      o = u.digits;
    if (s.length !== o.length) return s.length < o.length ? -1 : 1;
    for (let m = s.length - 1; m >= 0; m--) {
      const d = s[m] ?? 0,
        h = o[m] ?? 0;
      if (d < h) return -1;
      if (d > h) return 1;
    }
    return 0;
  }
  eq(u) {
    return this.compare(u) === 0;
  }
  lt(u) {
    return this.compare(u) === -1;
  }
  gt(u) {
    return this.compare(u) === 1;
  }
  lte(u) {
    return this.compare(u) <= 0;
  }
  gte(u) {
    return this.compare(u) >= 0;
  }
  isZero() {
    return this.digits.length === 0;
  }
  toJSON() {
    return [...this.digits];
  }
  toString() {
    if (this.digits.length === 0) return '0';
    const u = this.digits.length;
    let s = String(this.digits[u - 1]);
    for (let o = u - 2; o >= 0; o--) s += String(this.digits[o]).padStart(3, '0');
    return s;
  }
  toDisplay() {
    if (this.digits.length === 0) return '0';
    const u = this.digits.length,
      s = this.digits[u - 1];
    if (u === 1) return String(s);
    const o = u - 1,
      m = Y_(o),
      d = this.digits[u - 2] ?? 0,
      h = Math.floor(d / 10);
    return `${s}.${String(h).padStart(2, '0')}${m}`;
  }
};
Kt(st, 'ZERO', new st([]));
let Ae = st;
function Z_(c) {
  if (c === '') return 0;
  let u = 0;
  for (let s = 0; s < c.length; s++) u = u * 26 + (c.charCodeAt(s) - 65 + 1);
  return u;
}
function X_(c) {
  if (c <= 0) return { color: 'var(--c-text)', glow: '0 0 6px rgba(232,239,255,0.35)' };
  const u = Math.min(1, (c - 1) / 19),
    s = 195 + u * 100,
    o = 0.86 - u * 0.14,
    m = 0.13 + u * 0.07,
    d = `oklch(${o.toFixed(3)} ${m.toFixed(3)} ${s.toFixed(1)})`,
    h = Math.min(0.95, o + 0.05),
    y = m + 0.05,
    _ = `oklch(${h.toFixed(3)} ${y.toFixed(3)} ${s.toFixed(1)} / 0.55)`;
  return { color: d, glow: `0 0 8px ${_}` };
}
function Q_(c) {
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
function K_(c) {
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
  size: u = 'md',
  accentColor: s = 'scale',
  glow: o = !1,
  prefix: m,
  suffix: d,
  decimals: h,
  style: y,
}) {
  const _ = typeof c == 'number' ? Ae.fromNumber(c) : c;
  let g;
  h != null && typeof c == 'number' ? (g = c.toFixed(h)) : (g = _.toDisplay());
  const b = g.match(/^[\d.]+([A-Z]*)$/),
    T = b ? b[1] : '',
    z = Z_(T);
  let C, O;
  if (s === 'scale') {
    const I = X_(z);
    ((C = I.color), (O = o ? I.glow : void 0));
  } else ((C = Q_(s)), (O = o ? K_(s) : void 0));
  const U = { sm: Ml.sizeSm, md: Ml.sizeMd, lg: Ml.sizeLg, xl: Ml.sizeXl }[u],
    H = { color: C, ...(O != null ? { textShadow: O } : {}), ...y };
  return r.jsxs('span', {
    className: `${Ml.root} ${U}`,
    style: H,
    children: [
      m != null && r.jsx('span', { className: Ml.affix, children: m }),
      g,
      d != null && r.jsx('span', { className: Ml.affix, children: d }),
    ],
  });
}
const J_ = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  W_ = { sm: 12, md: 16, lg: 22, xl: 28 };
function F_({ delta: c, sizeClass: u }) {
  const s = c === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return r.jsx('span', {
    className: `${na.delta} ${u}`,
    style: { color: s },
    'aria-hidden': 'true',
    children: c,
  });
}
function Vi({
  currency: c,
  value: u,
  size: s = 'md',
  delta: o,
  showLabel: m,
  subtle: d,
  align: h = 'start',
  ranked: y,
}) {
  const _ = typeof u == 'number' ? Ae.fromNumber(u) : u,
    g = J_[c],
    b = d ? 'var(--c-text-disabled)' : `var(${g.cssVar})`,
    T = o && !d ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: b },
    z = { sm: na.deltaSm, md: na.deltaMd, lg: na.deltaLg, xl: na.deltaLg }[s],
    C = r.jsx(Ee, { name: c, size: W_[s], color: b, className: na.icon }),
    O = r.jsxs(r.Fragment, {
      children: [
        o !== void 0 && !d && r.jsx(F_, { delta: o, sizeClass: z }),
        r.jsx(Ll, { value: _, size: s, accentColor: 'primary', style: T }),
      ],
    });
  return r.jsxs('span', {
    className: [na.root, d ? na.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${g.label} ${_.toDisplay()}`,
    children: [
      h === 'end'
        ? r.jsxs(r.Fragment, { children: [O, C] })
        : r.jsxs(r.Fragment, { children: [C, O] }),
      m && r.jsx('span', { className: na.currencyLabel, 'aria-hidden': 'true', children: g.label }),
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
const I_ = '_iconButton_1fyi8_1',
  P_ = '_round_1fyi8_23',
  eg = '_active_1fyi8_85',
  tg = '_iconWrap_1fyi8_113',
  En = {
    iconButton: I_,
    round: P_,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: eg,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: tg,
  },
  ag = { sm: 14, md: 18, lg: 22 };
function hs({
  icon: c,
  label: u,
  size: s = 'md',
  variant: o = 'ghost',
  shape: m = 'square',
  active: d = !1,
  disabled: h = !1,
  onClick: y,
}) {
  const _ = o === 'default' ? 'ghost' : o,
    g = typeof c == 'string' ? r.jsx(Ee, { name: c, size: ag[s] }) : c;
  return r.jsx('button', {
    type: 'button',
    className: [
      En.iconButton,
      En[`variant-${_}`],
      En[`size-${s}`],
      m === 'round' ? En.round : '',
      d ? En.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: y,
    'aria-label': u,
    'aria-pressed': d,
    'aria-disabled': h,
    children: r.jsx('span', { className: En.iconWrap, 'aria-hidden': 'true', children: g }),
  });
}
const Rh = (c) => {
    let u;
    const s = new Set(),
      o = (g, b) => {
        const T = typeof g == 'function' ? g(u) : g;
        if (!Object.is(T, u)) {
          const z = u;
          ((u = (b ?? (typeof T != 'object' || T === null)) ? T : Object.assign({}, u, T)),
            s.forEach((C) => C(u, z)));
        }
      },
      m = () => u,
      y = {
        setState: o,
        getState: m,
        getInitialState: () => _,
        subscribe: (g) => (s.add(g), () => s.delete(g)),
      },
      _ = (u = c(o, m, y));
    return y;
  },
  lg = (c) => (c ? Rh(c) : Rh),
  ng = (c) => c;
function ig(c, u = ng) {
  const s = fs.useSyncExternalStore(
    c.subscribe,
    fs.useCallback(() => u(c.getState()), [c, u]),
    fs.useCallback(() => u(c.getInitialState()), [c, u])
  );
  return (fs.useDebugValue(s), s);
}
const cg = (c) => {
    const u = lg(c),
      s = (o) => ig(u, o);
    return (Object.assign(s, u), s);
  },
  sg = (c) => cg,
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
  ug = (c, u) => ({
    ...Dh,
    startRun: ({ initialWeapon: s, machineMaxHp: o, gameSpeed: m }) =>
      c({
        isRunActive: !0,
        screw: Ae.ZERO,
        machineHp: o,
        machineMaxHp: o,
        currentTier: 1,
        currentWave: 1,
        currentWeapon: s,
        weaponSwitchCdSec: 0,
        activeCdSec: 0,
        isAutoActive: !1,
        gameSpeed: m,
      }),
    endRun: () => c(Dh),
    addScrew: (s) => c((o) => ({ screw: o.screw.add(s) })),
    spendScrew: (s) => {
      const o = u().screw;
      return o.lt(s) ? !1 : (c({ screw: o.sub(s) }), !0);
    },
    setMachineHp: (s) => c((o) => ({ machineHp: Math.max(0, Math.min(s, o.machineMaxHp)) })),
    damageHp: (s) => c((o) => ({ machineHp: Math.max(0, o.machineHp - s) })),
    advanceWave: () => c((s) => ({ currentWave: s.currentWave + 1 })),
    advanceTier: () => c((s) => ({ currentTier: s.currentTier + 1, currentWave: 1 })),
    switchWeapon: (s) => c({ currentWeapon: s }),
    setWeaponSwitchCd: (s) => c({ weaponSwitchCdSec: Math.max(0, s) }),
    setActiveCd: (s) => c({ activeCdSec: Math.max(0, s) }),
    setAutoActive: (s) => c({ isAutoActive: s }),
    tickCooldowns: (s) =>
      c((o) => ({
        weaponSwitchCdSec: Math.max(0, o.weaponSwitchCdSec - s),
        activeCdSec: Math.max(0, o.activeCdSec - s),
      })),
  }),
  og = { bolt: Ae.ZERO, alloy: Ae.ZERO },
  rg = (c, u) => ({
    ...og,
    addBolt: (s) => c((o) => ({ bolt: o.bolt.add(s) })),
    spendBolt: (s) => {
      const o = u().bolt;
      return o.lt(s) ? !1 : (c({ bolt: o.sub(s) }), !0);
    },
    addAlloy: (s) => c((o) => ({ alloy: o.alloy.add(s) })),
    spendAlloy: (s) => {
      const o = u().alloy;
      return o.lt(s) ? !1 : (c({ alloy: o.sub(s) }), !0);
    },
    resetCurrencies: () => c({ bolt: Ae.ZERO, alloy: Ae.ZERO }),
  }),
  Bn = 6,
  fg = { equippedPatches: new Map() },
  dg = (c, u) => ({
    ...fg,
    equipPatch: (s, o, m) => {
      const d = u().equippedPatches;
      for (const [h, y] of d) if (y.name === o && h !== s) return !1;
      return (
        c((h) => {
          const y = new Map(h.equippedPatches);
          return (y.set(s, { name: o, tier: m }), { equippedPatches: y });
        }),
        !0
      );
    },
    unequipPatch: (s) => {
      c((o) => {
        const m = new Map(o.equippedPatches);
        return (m.delete(s), { equippedPatches: m });
      });
    },
    clearEquippedPatches: () => c({ equippedPatches: new Map() }),
  }),
  v1 = 'tower-like-game',
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
  y1 = [
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
  mg = {
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
  hg = { id: 'singleton', bolt: [], alloy: [] },
  vg = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  yg = {
    id: 'singleton',
    defaultGameSpeed: 1,
    bgmVolume: 0.8,
    seVolume: 0.8,
    vibrationEnabled: !0,
  };
function _1() {
  return Object.fromEntries(y1.map((c) => [c, 0]));
}
const _g = { machineLevels: _1() },
  gg = (c) => ({
    ..._g,
    incrementMachineLv: (u) =>
      c((s) => ({ machineLevels: { ...s.machineLevels, [u]: s.machineLevels[u] + 1 } })),
    setMachineLv: (u, s) => c((o) => ({ machineLevels: { ...o.machineLevels, [u]: s } })),
    resetMachine: () => c({ machineLevels: _1() }),
  });
function Bh(c, u) {
  return `${c}#${u}`;
}
const pg = { patches: new Map() },
  bg = (c, u) => ({
    ...pg,
    addPatch: (s, o, m = 1) => {
      const d = Bh(s, o);
      c((h) => {
        const y = new Map(h.patches),
          _ = y.get(d);
        return (
          _ ? y.set(d, { ..._, count: _.count + m }) : y.set(d, { name: s, tier: o, count: m }),
          { patches: y }
        );
      });
    },
    consumePatch: (s, o, m = 1) => {
      const d = Bh(s, o),
        h = u().patches.get(d);
      return !h || h.count < m
        ? !1
        : (c((y) => {
            const _ = new Map(y.patches),
              g = _.get(d);
            if (!g) return {};
            const b = g.count - m;
            return (b <= 0 ? _.delete(d) : _.set(d, { ...g, count: b }), { patches: _ });
          }),
          !0);
    },
    pruneEmptyPatches: () => {
      c((s) => {
        const o = new Map(s.patches);
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
  Sg = (c) => ({
    ...Lh,
    updateHighest: (u, s) =>
      c((o) =>
        u > o.highestTier
          ? { highestTier: u, highestWave: s }
          : u === o.highestTier
            ? { highestWave: Math.max(o.highestWave, s) }
            : {}
      ),
    addPlayTimeSec: (u) => c((s) => ({ totalPlayTimeSec: s.totalPlayTimeSec + u })),
    incrementRuns: () => c((u) => ({ totalRuns: u.totalRuns + 1 })),
    addEnemiesKilled: (u) => c((s) => ({ totalEnemiesKilled: s.totalEnemiesKilled + u })),
    setLastPlayedAt: (u) => c({ lastPlayedAt: u }),
    resetProfile: (u) => c({ ...Lh, createdAt: u, lastPlayedAt: u }),
  }),
  qh = { defaultGameSpeed: 1, bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  xg = (c) => ({
    ...qh,
    setDefaultGameSpeed: (u) => c({ defaultGameSpeed: u }),
    setBgmVolume: (u) => c({ bgmVolume: Math.max(0, Math.min(1, u)) }),
    setSeVolume: (u) => c({ seVolume: Math.max(0, Math.min(1, u)) }),
    setVibrationEnabled: (u) => c({ vibrationEnabled: u }),
    resetSettings: () => c(qh),
  }),
  Hh = { weaponLv: 0, initialWeapon: 'laser' },
  jg = (c) => ({
    ...Hh,
    incrementWeaponLv: () => c((u) => ({ weaponLv: u.weaponLv + 1 })),
    setWeaponLv: (u) => c({ weaponLv: u }),
    setInitialWeapon: (u) => c({ initialWeapon: u }),
    resetWeapons: () => c(Hh),
  }),
  X = sg()((...c) => ({
    ...Sg(...c),
    ...rg(...c),
    ...gg(...c),
    ...jg(...c),
    ...bg(...c),
    ...dg(...c),
    ...xg(...c),
    ...ug(...c),
  }));
function Yi({ title: c, subtitle: u, onBack: s, currencies: o, tabBar: m, actions: d }) {
  const h = X((z) => z.bolt),
    y = X((z) => z.alloy),
    _ = X((z) => z.screw),
    g = X((z) => z.isRunActive),
    b = (o ?? []).filter((z) => (z === 'screw' ? g : !0));
  function T(z) {
    switch (z) {
      case 'bolt':
        return h;
      case 'alloy':
        return y;
      case 'screw':
        return _;
    }
  }
  return r.jsxs('div', {
    className: el.root,
    children: [
      r.jsxs('div', {
        className: el.titleRow,
        children: [
          r.jsx('div', {
            className: el.left,
            children:
              s != null &&
              r.jsx(hs, {
                icon: 'chevron-left',
                label: '戻る',
                variant: 'ghost',
                size: 'md',
                onClick: s,
              }),
          }),
          r.jsxs('div', {
            className: el.center,
            children: [
              r.jsx(G, { variant: 'heading-3', truncate: !0, align: 'center', children: c }),
              u != null &&
                r.jsx(G, { variant: 'caption', color: 'dim', align: 'center', children: u }),
            ],
          }),
          r.jsxs('div', {
            className: el.right,
            children: [
              b.length > 0 &&
                r.jsx('div', {
                  className: el.currencies,
                  children: b.map((z) => r.jsx(Vi, { currency: z, value: T(z), size: 'sm' }, z)),
                }),
              d != null && r.jsx('div', { className: el.actions, children: d }),
            ],
          }),
        ],
      }),
      m != null && r.jsx('div', { className: el.tabBarSlot, children: m }),
    ],
  });
}
const Tg = '_tab_1nc83_3',
  Ag = { tab: Tg },
  Ng = '_wrapper_1opqp_3',
  Eg = '_active_1opqp_12',
  zg = '_card_1opqp_12',
  Mg = '_locked_1opqp_18',
  Cg = '_tall_1opqp_34',
  wg = '_iconTile_1opqp_37',
  Og = '_headerText_1opqp_42',
  Rg = '_description_1opqp_45',
  Dg = '_name_1opqp_48',
  Bg = '_wide_1opqp_53',
  Lg = '_body_1opqp_61',
  qg = '_header_1opqp_42',
  Hg = '_statGrid_1opqp_121',
  Ug = '_statChip_1opqp_129',
  Gg = '_statLabel_1opqp_140',
  Vg = '_statValue_1opqp_147',
  $g = '_lockedBadge_1opqp_158',
  at = {
    wrapper: Ng,
    active: Eg,
    card: zg,
    locked: Mg,
    tall: Cg,
    iconTile: wg,
    headerText: Og,
    description: Rg,
    name: Dg,
    wide: Bg,
    body: Lg,
    header: qg,
    statGrid: Hg,
    statChip: Ug,
    statLabel: Gg,
    statValue: Vg,
    lockedBadge: $g,
  },
  kg = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function g1({
  weapon: c,
  name: u,
  description: s,
  stats: o,
  layout: m = 'tall',
  active: d = !1,
  locked: h = !1,
  onClick: y,
}) {
  const _ = m === 'wide',
    g = y != null && !h;
  return r.jsx('div', {
    className: [at.wrapper, d ? at.active : '', h ? at.locked : '', _ ? at.wide : at.tall]
      .filter(Boolean)
      .join(' '),
    onClick: g ? y : void 0,
    role: g ? 'button' : void 0,
    tabIndex: g ? 0 : void 0,
    onKeyDown: g
      ? (b) => {
          (b.key === 'Enter' || b.key === ' ') && (b.preventDefault(), y());
        }
      : void 0,
    'aria-pressed': y != null ? d : void 0,
    children: r.jsxs('div', {
      className: at.card,
      style: g ? { cursor: 'pointer' } : void 0,
      children: [
        r.jsx('div', {
          className: at.iconTile,
          'aria-hidden': !0,
          children: r.jsx(Ee, { name: c, size: _ ? 40 : 52 }),
        }),
        r.jsxs('div', {
          className: at.body,
          children: [
            r.jsx('div', {
              className: at.header,
              children: r.jsxs('div', {
                className: at.headerText,
                children: [
                  r.jsx('span', { className: at.name, children: u }),
                  s != null &&
                    s.length > 0 &&
                    r.jsx('span', { className: at.description, children: s }),
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
                          style: b.accent != null ? { color: kg[b.accent] } : void 0,
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
function Ss(c) {
  return Math.pow(1.02, c);
}
function xs(c, u) {
  return Math.min(10, c * (1 + 0.03 * u));
}
const js = { laser: 120, cannon: 480, thunder: 84, cutter: 62 },
  Ts = { laser: 1, cannon: 0.5, thunder: 0.7, cutter: 2 },
  mr = { laser: 580, thunder: 420, cannon: 520 };
function Yg(c) {
  const u = Math.round(js.laser * Ss(c)),
    s = Math.floor(1 + 0.1 * c),
    o = Math.round(xs(Ts.laser, c) * 10) / 10;
  return [
    { label: 'DMG', value: u, accent: 'primary' },
    { label: '貫通', value: s },
    { label: '射程', value: mr.laser, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Zg(c) {
  const u = Math.round(js.cannon * Ss(c)),
    s = Math.round((30 + 0.5 * c) * 10) / 10,
    o = Math.round(xs(Ts.cannon, c) * 10) / 10;
  return [
    { label: 'DMG', value: u, accent: 'primary' },
    { label: '半径', value: s, suffix: 'm' },
    { label: '射程', value: mr.cannon, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Xg(c) {
  const u = Math.round(js.thunder * Ss(c)),
    s = Math.floor(7 + 0.1 * c),
    o = Math.round(xs(Ts.thunder, c) * 10) / 10;
  return [
    { label: 'DMG', value: u, accent: 'primary' },
    { label: '連鎖', value: s },
    { label: '射程', value: mr.thunder, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Qg(c) {
  const u = Math.round(js.cutter * Ss(c)),
    s = Math.round((80 + 0.5 * c) * 10) / 10,
    o = Math.floor(1 + 0.05 * c),
    m = Math.round(xs(Ts.cutter, c) * 10) / 10;
  return [
    { label: 'DMG', value: u, accent: 'primary' },
    { label: '旋回', value: s, suffix: 'm' },
    { label: '同時', value: o },
    { label: '連射', value: m, suffix: '/s' },
  ];
}
const Kg = [
  { kind: 'laser', name: 'LASER', description: '高速直進ビーム。', buildStats: Yg },
  { kind: 'cannon', name: 'CANNON', description: '範囲爆発。', buildStats: Zg },
  { kind: 'thunder', name: 'THUNDER', description: '連鎖電撃。', buildStats: Xg },
  { kind: 'cutter', name: 'CUTTER', description: '旋回斬撃。', buildStats: Qg },
];
function Jg() {
  const c = X((u) => u.weaponLv);
  return r.jsx('div', {
    className: Ag.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: Kg.map((u) =>
      r.jsx(
        g1,
        {
          weapon: u.kind,
          name: u.name,
          description: u.description,
          stats: u.buildStats(c),
          layout: 'wide',
        },
        u.kind
      )
    ),
  });
}
const Wg = '_tab_1oky8_3',
  Fg = '_topRow_1oky8_9',
  Ig = '_description_1oky8_15',
  Pg = '_previewCard_1oky8_21',
  ep = '_previewLabel_1oky8_25',
  tp = '_impactGrid_1oky8_32',
  ap = '_impactRow_1oky8_37',
  lp = '_impactRowBordered_1oky8_45',
  np = '_impactLabel_1oky8_49',
  ip = '_impactValues_1oky8_55',
  cp = '_arrow_1oky8_62',
  Jt = {
    tab: Wg,
    topRow: Fg,
    description: Ig,
    previewCard: Pg,
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
  Di = {
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
  variant: u = 'default',
  interactive: s = !1,
  padding: o = 'md',
  radius: m,
  className: d,
}) {
  const h = [
    Di.card,
    Di[`variant-${u}`],
    Di[`padding-${o}`],
    m != null ? Di[`radius-${m}`] : '',
    s ? Di.interactive : '',
    d ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return r.jsx('div', { className: h, children: c });
}
const op = '_root_168oy_2',
  rp = '_header_168oy_15',
  fp = '_iconWrap_168oy_22',
  dp = '_title_168oy_34',
  mp = '_lvBadge_168oy_47',
  hp = '_description_168oy_60',
  vp = '_valueRow_168oy_66',
  yp = '_valueBefore_168oy_74',
  _p = '_valueAfter_168oy_83',
  gp = '_arrow_168oy_93',
  pp = '_buttons_168oy_100',
  bp = '_btnCol_168oy_105',
  Sp = '_btn_168oy_105',
  xp = '_btnPrimary_168oy_132',
  jp = '_btnSecondary_168oy_139',
  Tp = '_btnWarning_168oy_146',
  Ap = '_costRow_168oy_172',
  Np = '_costNum_168oy_181',
  Ep = '_costDisabled_168oy_190',
  $e = {
    root: op,
    header: rp,
    iconWrap: fp,
    title: dp,
    lvBadge: mp,
    description: hp,
    valueRow: vp,
    valueBefore: yp,
    valueAfter: _p,
    arrow: gp,
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
  description: u,
  iconName: s,
  iconColor: o,
  currentLabel: m,
  before: d,
  after: h,
  beforeSuffix: y = '',
  currency: _ = 'bolt',
  accent: g,
  options: b = [],
  maxed: T = !1,
  onUpgrade: z,
}) {
  const C = g ?? Cp[_],
    O = zp[C],
    U = o ?? O,
    H = wp[C],
    I = Op[C];
  return r.jsxs('div', {
    className: $e.root,
    role: 'group',
    'aria-label': c,
    'data-maxed': T,
    children: [
      r.jsxs('div', {
        className: $e.header,
        children: [
          s != null &&
            r.jsx('span', {
              className: $e.iconWrap,
              children: r.jsx(Ee, { name: s, size: 14, color: U }),
            }),
          r.jsx('span', { className: $e.title, children: c }),
          m != null &&
            !T &&
            r.jsx('span', {
              className: $e.lvBadge,
              style: { color: O, boxShadow: Mp[C] },
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
      u != null &&
        u.length > 0 &&
        r.jsx(G, { variant: 'caption', color: 'dim', className: $e.description, children: u }),
      d != null &&
        r.jsxs('div', {
          className: $e.valueRow,
          children: [
            r.jsxs('span', { className: $e.valueBefore, children: [Wo(d), y] }),
            h != null &&
              !T &&
              r.jsxs(r.Fragment, {
                children: [
                  r.jsx('span', { className: $e.arrow, children: '→' }),
                  r.jsxs('span', {
                    className: $e.valueAfter,
                    style: { color: O, textShadow: `0 0 5px ${I}` },
                    children: [Wo(h), y],
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
            const _e = J.disabled === !0;
            return r.jsxs(
              'div',
              {
                className: $e.btnCol,
                children: [
                  r.jsx('button', {
                    type: 'button',
                    className: `${$e.btn} ${H}`,
                    disabled: _e,
                    onClick: _e ? void 0 : () => (z == null ? void 0 : z(J.amount)),
                    children: J.amount,
                  }),
                  r.jsx('div', {
                    className: $e.costRow,
                    children: r.jsx('span', {
                      className: `${$e.costNum} ${_e ? $e.costDisabled : ''}`,
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
  const u = Math.ceil(200 * Math.pow(1.12, c));
  return Ae.fromNumber(u);
}
function Uh(c, u) {
  let s = Ae.ZERO;
  for (let o = 0; o < u; o++) s = s.add(vr(c + o));
  return s;
}
function Rp(c, u) {
  let s = u,
    o = 0;
  for (;;) {
    const m = vr(c + o);
    if (s.lt(m) || ((s = s.sub(m)), o++, o > 1e4)) break;
  }
  return o;
}
function Gh(c) {
  return Math.pow(1.02, c);
}
const Vh = { laser: 120 };
function Dp(c) {
  const u = c + 1,
    s = Gh(c),
    o = Gh(u);
  return [
    { label: 'LASER DMG', before: Math.round(Vh.laser * s), after: Math.round(Vh.laser * o) },
    {
      label: 'CANNON 半径',
      before: Math.round((30 + 0.5 * c) * 10) / 10,
      after: Math.round((30 + 0.5 * u) * 10) / 10,
      suffix: 'm',
    },
    { label: 'THUNDER 連鎖', before: Math.floor(7 + 0.1 * c), after: Math.floor(7 + 0.1 * u) },
    { label: 'CUTTER 同時', before: Math.floor(1 + 0.05 * c), after: Math.floor(1 + 0.05 * u) },
  ];
}
function Bp() {
  const c = X((O) => O.weaponLv),
    u = X((O) => O.alloy),
    s = X((O) => O.incrementWeaponLv),
    o = X((O) => O.setWeaponLv),
    m = X((O) => O.spendAlloy),
    d = vr(c),
    h = Uh(c, 5),
    y = Rp(c, u),
    _ = Uh(c, y),
    g = !u.lt(d),
    b = y >= 5,
    T = y >= 1,
    z = Dp(c);
  function C(O) {
    O === '+1'
      ? m(d) && s()
      : O === '+5'
        ? m(h) && o(c + 5)
        : O === 'MAX' && y > 0 && m(_) && o(c + y);
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
          r.jsx(Vi, { currency: 'alloy', value: u, size: 'sm' }),
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
          { amount: '+1', cost: d, disabled: !g },
          { amount: '+5', cost: h, disabled: !b },
          { amount: 'MAX', cost: _, disabled: !T },
        ],
        onUpgrade: C,
      }),
      r.jsxs(Hl, {
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
            children: z.map((O, U) =>
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
                        r.jsx(Ll, {
                          value: O.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: O.suffix,
                          decimals: O.suffix === 'm' ? 1 : 0,
                        }),
                        r.jsx('span', { className: Jt.arrow, children: '→' }),
                        r.jsx(Ll, {
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
function Lp({ children: c, initialScreen: u }) {
  const [s, o] = de.useState(u ?? 'title'),
    m = de.useCallback((d) => {
      o(d);
    }, []);
  return r.jsx(p1.Provider, { value: { screen: s, navigate: m }, children: c });
}
function ol() {
  const c = de.useContext(p1);
  if (!c) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return c;
}
const qp = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function Hp(c = {}) {
  const { initialTab: u = 'details' } = c,
    [s, o] = de.useState(u),
    { screen: m, navigate: d } = ol();
  return r.jsx(ql, {
    header: r.jsx(Yi, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => d('preparation'),
      tabBar: r.jsx(bs, { tabs: qp, value: s, onChange: o, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(ki, { active: m, onChange: (h) => d(h) }),
    children: r.jsxs('div', {
      className: _y.content,
      children: [s === 'details' && r.jsx(Jg, {}), s === 'upgrade' && r.jsx(Bp, {})],
    }),
  });
}
const Up = '_root_15ig1_1',
  Gp = '_overlayLayer_15ig1_10',
  $h = { root: Up, overlayLayer: Gp },
  Vp = '_root_1375f_3',
  $p = '_rangeCircle_1375f_15',
  kp = '_machine_1375f_27',
  Yp = '_machineRingOuter_1375f_40',
  Zp = '_pin_1375f_50',
  Xp = '_enemy_1375f_60',
  Qp = '_enemyUpper_1375f_71',
  Kp = '_enemyHpBar_1375f_74',
  tl = {
    root: Vp,
    rangeCircle: $p,
    machine: kp,
    machineRingOuter: Yp,
    pin: Zp,
    enemy: Xp,
    enemyUpper: Qp,
    enemyHpBar: Kp,
  },
  Jp = '_root_14p1r_1',
  Wp = { root: Jp };
function Fp({ value: c, x: u, y: s, crit: o = !1, duration: m = 800, onDone: d }) {
  const h = de.useId().replace(/:/g, 'dp'),
    y = `
    @keyframes ${h}-pop {
      0%   { transform: translate(-50%, 0) scale(${o ? 0.6 : 0.8}); opacity: 0; }
      15%  { transform: translate(-50%, -4px) scale(${o ? 1.15 : 1}); opacity: 1; }
      100% { transform: translate(-50%, -28px) scale(${o ? 1 : 0.95}); opacity: 0; }
    }
    .${h} {
      position: absolute;
      left: ${u}%;
      top: ${s}%;
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
        className: `${h} ${Wp.root}`,
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
const Ip = '_wrap_14rhu_1',
  Pp = { wrap: Ip },
  kh = 8;
function e2({ x: c, y: u, color: s = 'var(--c-text-mid)', duration: o = 480, onDone: m }) {
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
      background: radial-gradient(circle, ${s === 'var(--c-text-mid)' ? 'rgba(167,184,216,0.9)' : s}, transparent 65%);
      animation: ${d}-flash ${o}ms var(--ease-out) both;
    }
    .${d}-shard {
      position: absolute; left: 0; top: 0;
      width: 4px; height: 4px;
      background: ${s};
      box-shadow: 0 0 4px ${s};
      animation: ${d}-shard ${o}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${d}-flash, .${d}-shard { animation-duration: 1ms; opacity: 0; }
    }
  `,
    _ = Array.from({ length: kh }, (g, b) =>
      r.jsx('div', { className: `${d}-shard`, style: { '--a': `${(b * 360) / kh}deg` } }, b)
    );
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: y } }),
      r.jsxs('div', {
        className: `${d}-wrap ${Pp.wrap}`,
        style: { left: `${c}%`, top: `${u}%` },
        onAnimationEnd: m,
        children: [r.jsx('div', { className: `${d}-flash` }), _],
      }),
    ],
  });
}
const t2 = '_wrap_14rhu_1',
  a2 = { wrap: t2 };
function l2({ x: c, y: u, color: s = 'var(--c-primary-hi)', duration: o = 220, onDone: m }) {
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
      background: radial-gradient(circle, ${s}, transparent 60%);
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
        className: `${d}-w ${a2.wrap}`,
        style: { left: `${c}%`, top: `${u}%` },
        onAnimationEnd: m,
        children: r.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const n2 = '_root_2lc0r_2',
  i2 = '_boss_2lc0r_12',
  c2 = '_elite_2lc0r_16',
  s2 = '_sizeSm_2lc0r_21',
  u2 = '_sizeMd_2lc0r_25',
  o2 = '_sizeLg_2lc0r_29',
  r2 = '_header_2lc0r_35',
  f2 = '_headerRight_2lc0r_42',
  d2 = '_hpText_2lc0r_50',
  Ea = {
    root: n2,
    boss: i2,
    elite: c2,
    sizeSm: s2,
    sizeMd: u2,
    sizeLg: o2,
    header: r2,
    headerRight: f2,
    hpText: d2,
  },
  m2 = '_badge_4fy54_1',
  h2 = '_glow_4fy54_90',
  v2 = '_iconLeft_4fy54_118',
  Bi = {
    badge: m2,
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
    glow: h2,
    iconLeft: v2,
  };
function As({
  text: c,
  variant: u = 'neutral',
  tier: s,
  size: o = 'md',
  glow: m = !1,
  iconLeft: d,
}) {
  let h;
  const y = u === 'default' ? 'neutral' : u;
  if (y === 'tier' && s != null) {
    const g = Math.min(Math.max(1, Math.floor(s)), 12);
    h = { '--badge-color': `var(--c-tier-${Math.min(g, 10)})` };
  } else
    y === 'patch-tier' &&
      s != null &&
      (h = { '--badge-color': `var(--c-patch-t${Math.min(Math.max(1, Math.floor(s)), 5)})` });
  let _ = c;
  return (
    _ == null &&
      (y === 'tier' && s != null
        ? (_ = `T${s}`)
        : y === 'patch-tier' && s != null
          ? (_ = `T${s}`)
          : (_ = '')),
    r.jsxs('span', {
      className: [Bi.badge, Bi[`variant-${y}`], Bi[`size-${o}`], m ? Bi.glow : '']
        .filter(Boolean)
        .join(' '),
      style: h,
      children: [
        d != null && r.jsx('span', { className: Bi.iconLeft, 'aria-hidden': 'true', children: d }),
        _,
      ],
    })
  );
}
const y2 = '_root_1pi3d_2',
  _2 = '_sizeSm_1pi3d_11',
  g2 = '_sizeMd_1pi3d_15',
  p2 = '_sizeLg_1pi3d_19',
  b2 = '_fill_1pi3d_23',
  S2 = '_label_1pi3d_29',
  x2 = '_withTrailing_1pi3d_46',
  j2 = '_trailingLabel_1pi3d_56',
  al = {
    root: y2,
    sizeSm: _2,
    sizeMd: g2,
    sizeLg: p2,
    fill: b2,
    label: S2,
    withTrailing: x2,
    trailingLabel: j2,
  },
  T2 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  A2 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function b1({
  value: c,
  max: u,
  color: s = 'primary',
  size: o = 'md',
  variant: m = 'solid',
  showLabel: d = !1,
  label: h,
  trailingLabel: y,
  glow: _ = !1,
  reverse: g = !1,
}) {
  const b = Math.max(1, u),
    T = Math.min(Math.max(0, c), b),
    z = (T / b) * 100,
    C = T2[s],
    O = _ || m === 'neon' ? A2[s] : void 0,
    U = { sm: al.sizeSm, md: al.sizeMd, lg: al.sizeLg }[o],
    H = {
      width: `${z}%`,
      backgroundColor: C,
      ...(O != null ? { boxShadow: O } : {}),
      ...(g ? { marginLeft: 'auto' } : {}),
    },
    I = h ?? `${T} / ${b}`,
    J = r.jsxs('div', {
      className: `${al.root} ${U}`,
      role: 'progressbar',
      'aria-valuenow': T,
      'aria-valuemin': 0,
      'aria-valuemax': b,
      'aria-label': h ?? `${T} / ${b}`,
      children: [
        r.jsx('div', { className: al.fill, style: H }),
        d && r.jsx('span', { className: al.label, children: I }),
      ],
    });
  return y == null
    ? J
    : r.jsxs('div', {
        className: al.withTrailing,
        children: [J, r.jsx('span', { className: al.trailingLabel, children: y })],
      });
}
function N2(c, u) {
  if (u.isZero()) return 0;
  const s = parseFloat(c.toString()),
    o = parseFloat(u.toString());
  return o === 0 || isNaN(o) ? 0 : Math.min(1e3, Math.max(0, Math.round((s / o) * 1e3)));
}
const E2 = { sm: Ea.sizeSm, md: Ea.sizeMd, lg: Ea.sizeLg };
function z2({
  name: c,
  variant: u,
  current: s,
  max: o,
  tier: m,
  size: d = 'md',
  showValue: h = !0,
  type: y,
  currentHp: _,
  maxHp: g,
}) {
  const b = u ?? y ?? 'normal',
    T = s ?? _ ?? 0,
    z = o ?? g ?? 0,
    C = typeof T == 'number' ? Ae.fromNumber(T) : T,
    O = typeof z == 'number' ? Ae.fromNumber(z) : z,
    U = N2(C, O),
    H = U <= 250,
    I = H ? 'hp-low' : 'hp',
    J = d === 'lg' ? 'lg' : d === 'sm' ? 'sm' : 'md';
  let _e;
  return (
    b === 'boss'
      ? (_e = { boxShadow: 'var(--glow-danger-md)' })
      : b === 'elite' && (_e = { boxShadow: 'var(--glow-purple-md)' }),
    r.jsxs('div', {
      className: [Ea.root, b === 'boss' ? Ea.boss : '', b === 'elite' ? Ea.elite : '', E2[d]]
        .filter(Boolean)
        .join(' '),
      style: _e,
      children: [
        r.jsxs('div', {
          className: Ea.header,
          children: [
            r.jsx(G, { variant: 'label', color: 'mid', children: c }),
            r.jsxs('div', {
              className: Ea.headerRight,
              children: [
                b === 'normal' &&
                  m !== void 0 &&
                  r.jsxs(G, { variant: 'numeric-s', color: 'dim', children: ['T', m] }),
                (b === 'elite' || b === 'boss') &&
                  r.jsx(As, { text: b.toUpperCase(), variant: b, glow: b === 'boss' }),
              ],
            }),
          ],
        }),
        r.jsx(b1, { value: U, max: 1e3, color: I, size: J, glow: H }),
        h &&
          r.jsx('div', {
            className: Ea.hpText,
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
const M2 = [
  { id: 'p1', x: 30, y: 22, kind: 'normal' },
  { id: 'p2', x: 65, y: 18, kind: 'normal' },
  { id: 'p3', x: 50, y: 30, kind: 'elite' },
  { id: 'p4', x: 78, y: 38, kind: 'normal' },
  { id: 'p5', x: 22, y: 50, kind: 'normal' },
  { id: 'p6', x: 60, y: 72, kind: 'boss' },
];
function C2(c) {
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
function w2(c) {
  return c !== 'normal';
}
function O2(c) {
  return c === 'boss' ? 'boss' : c === 'elite' || c === 'miniboss' ? 'elite' : 'normal';
}
function R2(c) {
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
function D2({
  enemies: c,
  machinePosition: u = { x: 50, y: 50 },
  damageEvents: s,
  hitEvents: o,
  deathEvents: m,
  onDamageDone: d,
  onHitDone: h,
  onDeathDone: y,
  range: _,
  dummyPins: g = M2,
}) {
  const b = u.x,
    T = u.y,
    z = _ * 2;
  return r.jsxs('div', {
    className: tl.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: [
      r.jsx('div', {
        className: tl.rangeCircle,
        style: { left: `${b}%`, top: `${T}%`, width: `${z}%` },
        'aria-hidden': !0,
      }),
      g.map((C) =>
        r.jsx(
          'div',
          {
            className: tl.pin,
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
        const O = w2(C.kind),
          U = R2(C.kind),
          H = C.kind === 'boss' ? 32 : C.kind === 'miniboss' ? 28 : 22;
        return r.jsxs(
          'div',
          {
            className: [tl.enemy, O ? tl.enemyUpper : ''].filter(Boolean).join(' '),
            style: { left: `${C.position.x}%`, top: `${C.position.y}%` },
            'aria-label': `${C.kind}`,
            children: [
              r.jsx(Ee, { name: C2(C.kind), size: H, color: U }),
              O &&
                r.jsx('div', {
                  className: tl.enemyHpBar,
                  children: r.jsx(z2, {
                    name: C.kind,
                    variant: O2(C.kind),
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
        className: tl.machine,
        style: { left: `${b}%`, top: `${T}%` },
        'aria-label': 'マシン',
        children: [
          r.jsx('span', { className: tl.machineRingOuter, 'aria-hidden': !0 }),
          r.jsx(Ee, { name: 'tower', size: 22, color: 'var(--c-primary)' }),
        ],
      }),
      s.map((C) =>
        r.jsx(
          Fp,
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
        r.jsx(l2, { x: C.x, y: C.y, onDone: () => (h == null ? void 0 : h(C.id)) }, C.id)
      ),
      m.map((C) =>
        r.jsx(e2, { x: C.x, y: C.y, onDone: () => (y == null ? void 0 : y(C.id)) }, C.id)
      ),
    ],
  });
}
const B2 = '_root_1qch4_2',
  L2 = '_topRow_1qch4_13',
  q2 = '_weaponSlots_1qch4_21',
  H2 = '_activeArea_1qch4_29',
  U2 = '_activeButton_1qch4_37',
  G2 = '_activeDisabled_1qch4_57',
  V2 = '_modeLabel_1qch4_65',
  $2 = '_modeLabelAuto_1qch4_76',
  k2 = '_toggleHidden_1qch4_81',
  Y2 = '_bottomRow_1qch4_95',
  Z2 = '_currencyArea_1qch4_101',
  X2 = '_speedArea_1qch4_106',
  Q2 = '_sysButtons_1qch4_113',
  Mt = {
    root: B2,
    topRow: L2,
    weaponSlots: q2,
    activeArea: H2,
    activeButton: U2,
    activeDisabled: G2,
    modeLabel: V2,
    modeLabelAuto: $2,
    toggleHidden: k2,
    bottomRow: Y2,
    currencyArea: Z2,
    speedArea: X2,
    sysButtons: Q2,
  },
  K2 = '_root_x9cjr_1',
  J2 = '_svg_x9cjr_9',
  W2 = '_track_x9cjr_15',
  F2 = '_arc_x9cjr_19',
  I2 = '_center_x9cjr_28',
  P2 = '_labelText_x9cjr_37',
  zn = { root: K2, svg: J2, track: W2, arc: F2, center: I2, labelText: P2 },
  eb = { xs: 20, sm: 32, md: 48, lg: 64 },
  tb = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  ab = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function S1({
  value: c,
  max: u,
  size: s = 24,
  color: o = 'primary',
  thickness: m = 3,
  glow: d = !1,
  showLabel: h = !1,
  withLabel: y = !1,
  label: _,
  children: g,
}) {
  const b = typeof s == 'number' ? s : eb[s],
    T =
      u != null
        ? Math.min(Math.max(0, c), Math.max(1, u)) / Math.max(1, u)
        : Math.min(Math.max(0, c), 100) / 100,
    z = u != null ? Math.min(Math.max(0, c), Math.max(1, u)) : c,
    C = u != null ? Math.max(1, u) : 100,
    O = tb[o],
    U = d ? ab[o] : void 0,
    H = b / 2,
    I = H - m / 2,
    J = 2 * Math.PI * I,
    _e = J * (1 - T),
    lt = h || y || g != null,
    De = _ ?? `${Math.round(T * 100)}%`;
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
        'aria-valuenow': z,
        'aria-valuemin': 0,
        'aria-valuemax': C,
        'aria-label': _ ?? `${z} / ${C}`,
        children: [
          r.jsx('circle', {
            className: zn.track,
            cx: H,
            cy: H,
            r: I,
            fill: 'none',
            strokeWidth: m,
          }),
          r.jsx('circle', {
            className: zn.arc,
            cx: H,
            cy: H,
            r: I,
            fill: 'none',
            stroke: O,
            strokeWidth: m,
            strokeLinecap: 'round',
            strokeDasharray: J,
            strokeDashoffset: _e,
            style: U != null ? { filter: `drop-shadow(0 0 4px ${O})` } : void 0,
            transform: `rotate(-90 ${H} ${H})`,
          }),
        ],
      }),
      lt &&
        r.jsx('span', {
          className: zn.center,
          children:
            g ?? r.jsx('span', { className: zn.labelText, style: { color: O }, children: De }),
        }),
    ],
  });
}
const lb = '_root_8pbri_1',
  nb = '_disabled_8pbri_8',
  ib = '_segment_8pbri_13',
  cb = '_selected_8pbri_27',
  sb = '_unselected_8pbri_33',
  Mn = {
    root: lb,
    disabled: nb,
    segment: ib,
    selected: cb,
    unselected: sb,
    'size-sm': '_size-sm_8pbri_42',
    'size-md': '_size-md_8pbri_47',
  },
  x1 = ({ options: c, value: u, onChange: s, size: o = 'md', disabled: m = !1 }) =>
    r.jsx('div', {
      className: [Mn.root, Mn[`size-${o}`], m ? Mn.disabled : ''].join(' '),
      role: 'group',
      children: c.map((d) => {
        const h = d.value === u;
        return r.jsx(
          'button',
          {
            type: 'button',
            role: 'radio',
            'aria-checked': h,
            className: [Mn.segment, h ? Mn.selected : Mn.unselected].join(' '),
            onClick: () => {
              m || s(d.value);
            },
            disabled: m,
            children: d.label,
          },
          String(d.value)
        );
      }),
    }),
  ub = '_wrapper_16nmz_9',
  ob = '_disabled_16nmz_15',
  rb = '_off_16nmz_31',
  fb = '_on_16nmz_35',
  db = '_accent_primary_16nmz_35',
  mb = '_accent_secondary_16nmz_39',
  hb = '_accent_success_16nmz_43',
  vb = '_accent_disabled_16nmz_47',
  yb = '_size_md_16nmz_56',
  _b = '_knob_16nmz_60',
  gb = '_size_sm_16nmz_70',
  pb = '_labelGroup_16nmz_93',
  bb = '_label_16nmz_93',
  Sb = '_description_16nmz_106',
  Wt = {
    wrapper: ub,
    disabled: ob,
    switch: '_switch_16nmz_22',
    off: rb,
    on: fb,
    accent_primary: db,
    accent_secondary: mb,
    accent_success: hb,
    accent_disabled: vb,
    size_md: yb,
    knob: _b,
    size_sm: gb,
    labelGroup: pb,
    label: bb,
    description: Sb,
  },
  yr = ({
    checked: c,
    onChange: u,
    disabled: s = !1,
    label: o,
    description: m,
    accent: d = 'primary',
    size: h = 'md',
  }) => {
    const y = s || d === 'disabled',
      _ = () => {
        y || u(!c);
      };
    return r.jsxs('label', {
      className: [Wt.wrapper, y ? Wt.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': y,
      children: [
        r.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': c,
          'aria-disabled': y,
          className: [Wt.switch, c ? Wt.on : Wt.off, Wt[`size_${h}`], Wt[`accent_${d}`]]
            .filter(Boolean)
            .join(' '),
          onClick: _,
          disabled: y,
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
  xb = '_root_afe45_2',
  jb = '_swapDisabled_afe45_14',
  Tb = '_active_afe45_20',
  Ab = '_onCd_afe45_27',
  Nb = '_iconWrap_afe45_27',
  Eb = '_cdOverlay_afe45_47',
  zb = '_cdProgress_afe45_57',
  Mb = '_swapOverlay_afe45_68',
  ll = {
    root: xb,
    swapDisabled: jb,
    active: Tb,
    onCd: Ab,
    iconWrap: Nb,
    cdOverlay: Eb,
    cdProgress: zb,
    swapOverlay: Mb,
  },
  Cb = { sm: 40, md: 52, lg: 64 },
  wb = { sm: 18, md: 24, lg: 30 };
function Ob({
  weapon: c,
  active: u = !1,
  ready: s = !1,
  cdProgress: o = 100,
  swapDisabled: m = !1,
  size: d = 'md',
  onClick: h,
}) {
  const y = Cb[d],
    _ = wb[d],
    g = o < 100,
    b = [ll.root, u ? ll.active : '', g ? ll.onCd : '', m ? ll.swapDisabled : '']
      .filter(Boolean)
      .join(' ');
  return r.jsxs('button', {
    type: 'button',
    className: b,
    style: { width: y, height: y, minWidth: y, minHeight: y },
    onClick: m ? void 0 : h,
    disabled: m && h == null,
    'aria-label': `${c} weapon slot${u ? ' (active)' : ''}${g ? ` (cooldown ${o}%)` : s ? ' (ready)' : ''}`,
    'aria-pressed': u,
    children: [
      r.jsx('span', {
        className: ll.iconWrap,
        children: r.jsx(Ee, {
          name: c,
          size: _,
          color: u ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      g &&
        r.jsxs(r.Fragment, {
          children: [
            r.jsx('span', { className: ll.cdOverlay, 'aria-hidden': 'true' }),
            r.jsx('span', {
              className: ll.cdProgress,
              'aria-hidden': 'true',
              children: r.jsx(S1, {
                value: o,
                max: 100,
                size: y - 4,
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
const Zh = ['laser', 'cannon', 'thunder', 'cutter'],
  Rb = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
  ];
function Db({
  screw: c,
  equippedWeapon: u,
  weaponCds: s,
  activeCd: o,
  activeMax: m,
  isAutoActive: d,
  onSwitchWeapon: h,
  onActivate: y,
  onToggleAuto: _,
  gameSpeed: g,
  onSpeedChange: b,
  isPaused: T,
  onTogglePause: z,
  onOpenMenu: C,
  onOpenScreenSaver: O,
}) {
  const U = o > 0,
    H = d || U,
    I = Zh.some((J) => J !== u && (s[J] ?? 100) < 100);
  return r.jsxs('div', {
    className: Mt.root,
    children: [
      r.jsxs('div', {
        className: Mt.topRow,
        children: [
          r.jsx('div', {
            className: Mt.weaponSlots,
            children: Zh.map((J) =>
              r.jsx(
                Ob,
                {
                  weapon: J,
                  active: J === u,
                  cdProgress: s[J] ?? 100,
                  swapDisabled: I && J !== u,
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
            className: Mt.activeArea,
            children: [
              r.jsx('button', {
                type: 'button',
                className: [Mt.activeButton, H ? Mt.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: H ? void 0 : y,
                disabled: H,
                'aria-label': `アクティブスキル発動${U ? ' (クールダウン中)' : d ? ' (自動モード)' : ''}`,
                children: r.jsx(S1, {
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
                className: [Mt.modeLabel, d ? Mt.modeLabelAuto : ''].filter(Boolean).join(' '),
                'aria-hidden': !0,
                children: d ? 'AUTO' : 'MANUAL',
              }),
              r.jsx('div', {
                className: Mt.toggleHidden,
                children: r.jsx(yr, {
                  checked: d,
                  onChange: _,
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
        className: Mt.bottomRow,
        children: [
          r.jsx('div', {
            className: Mt.currencyArea,
            children: r.jsx(Vi, { currency: 'screw', value: c, size: 'lg' }),
          }),
          r.jsx('div', {
            className: Mt.speedArea,
            children: r.jsx(x1, { options: Rb, value: g, onChange: b, size: 'sm' }),
          }),
          r.jsxs('div', {
            className: Mt.sysButtons,
            children: [
              r.jsx(hs, {
                icon: T ? 'play' : 'pause',
                label: T ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: T,
                onClick: z,
              }),
              r.jsx(hs, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: C,
              }),
              r.jsx(hs, {
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
const Bb = '_root_1mk5i_3',
  Lb = '_leftCol_1mk5i_14',
  qb = '_hpText_1mk5i_22',
  Hb = '_hpDivider_1mk5i_30',
  Ub = '_centerCol_1mk5i_36',
  Gb = '_srOnly_1mk5i_42',
  Vb = '_rightCol_1mk5i_55',
  $b = '_enemiesNum_1mk5i_64',
  nl = {
    root: Bb,
    leftCol: Lb,
    hpText: qb,
    hpDivider: Hb,
    centerCol: Ub,
    srOnly: Gb,
    rightCol: Vb,
    enemiesNum: $b,
  },
  kb = '_root_nxl33_2',
  Yb = '_boss_nxl33_14',
  Zb = '_header_nxl33_20',
  Xb = '_waveLabel_nxl33_26',
  Qb = '_waveNum_nxl33_35',
  Kb = '_milestone_nxl33_41',
  Jb = '_milestoneText_nxl33_48',
  Wb = '_seconds_nxl33_58',
  Ta = {
    root: kb,
    boss: Yb,
    header: Zb,
    waveLabel: Xb,
    waveNum: Qb,
    milestone: Kb,
    milestoneText: Jb,
    seconds: Wb,
    'size-sm': '_size-sm_nxl33_64',
    'size-md': '_size-md_nxl33_72',
    'size-lg': '_size-lg_nxl33_76',
  },
  Fb = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  },
  Ib = { sm: 'var(--fs-label)', md: 'var(--fs-caption)', lg: 'var(--fs-body)' };
function Pb({
  waveNumber: c,
  secondsLeft: u,
  secondsMax: s,
  nextMilestone: o,
  showSeconds: m = !0,
  size: d = 'md',
}) {
  const h = (o == null ? void 0 : o.kind) === 'boss',
    y = o != null ? Fb[o.kind] : null;
  return r.jsxs('div', {
    className: [Ta.root, Ta[`size-${d}`], h ? Ta.boss : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Ta.header,
        children: [
          r.jsxs('span', {
            className: Ta.waveLabel,
            style: { fontSize: Ib[d] },
            children: ['WAVE ', r.jsx('span', { className: Ta.waveNum, children: c })],
          }),
          y != null &&
            o != null &&
            r.jsxs('span', {
              className: Ta.milestone,
              style: { color: y.color },
              children: [
                r.jsx(Ee, { name: y.iconName, size: 12, color: y.color }),
                r.jsxs('span', { className: Ta.milestoneText, children: [y.label, ' @', o.wave] }),
              ],
            }),
          m &&
            r.jsx('span', {
              className: Ta.seconds,
              children: r.jsxs(G, { variant: 'numeric-s', color: 'mid', children: [u, 's'] }),
            }),
        ],
      }),
      r.jsx(b1, {
        value: u,
        max: Math.max(1, s),
        color: h ? 'secondary' : 'wave',
        size: d === 'lg' ? 'md' : 'sm',
        glow: h,
      }),
    ],
  });
}
function eS({
  hpCurrent: c,
  hpMax: u,
  tier: s,
  wave: o,
  totalWaves: m,
  secondsRemaining: d,
  secondsTotal: h,
  isBossWave: y = !1,
  nextMilestone: _,
  enemiesRemaining: g,
}) {
  const b = _ ?? (y ? { wave: o, kind: 'boss' } : void 0),
    T = g ?? 0;
  return r.jsxs('div', {
    className: nl.root,
    children: [
      r.jsxs('div', {
        className: nl.leftCol,
        children: [
          r.jsx(As, { variant: 'tier', tier: s, size: 'sm', glow: y }),
          r.jsxs('span', {
            className: nl.hpText,
            'aria-label': `HP ${c.toDisplay()} / ${u.toDisplay()}`,
            children: [
              r.jsx(Ll, {
                value: c,
                size: 'sm',
                accentColor: 'text',
                style: { fontWeight: 'var(--fw-semibold)' },
              }),
              r.jsx('span', { className: nl.hpDivider, children: '/' }),
              r.jsx(Ll, { value: u, size: 'sm', accentColor: 'dim' }),
            ],
          }),
        ],
      }),
      r.jsxs('div', {
        className: nl.centerCol,
        children: [
          r.jsx(Pb, {
            waveNumber: o,
            secondsLeft: d,
            secondsMax: h,
            nextMilestone: b,
            showSeconds: !1,
            size: 'sm',
          }),
          r.jsxs('span', { className: nl.srOnly, 'aria-hidden': 'false', children: [o, '/', m] }),
        ],
      }),
      r.jsxs('div', {
        className: nl.rightCol,
        'aria-label': `残敵 ${T}`,
        children: [
          r.jsx(G, { variant: 'numeric-s', color: 'text', className: nl.enemiesNum, children: T }),
          r.jsx(Ee, { name: 'target', size: 14, color: 'var(--c-text-mid)' }),
        ],
      }),
    ],
  });
}
const tS = '_card_1o3jz_1',
  aS = '_header_1o3jz_8',
  lS = '_soundSection_1o3jz_13',
  nS = '_sliderRow_1o3jz_19',
  iS = '_sliderLabel_1o3jz_26',
  cS = '_sliderValue_1o3jz_31',
  sS = '_divider_1o3jz_38',
  uS = '_actions_1o3jz_44',
  Ft = {
    card: tS,
    header: aS,
    soundSection: lS,
    sliderRow: nS,
    sliderLabel: iS,
    sliderValue: cS,
    divider: sS,
    actions: uS,
  },
  oS = '_button_10kfo_1',
  rS = '_fullWidth_10kfo_109',
  fS = '_iconLeft_10kfo_113',
  dS = '_iconRight_10kfo_114',
  mS = '_label_10kfo_120',
  Cl = {
    button: oS,
    'variant-primary': '_variant-primary_10kfo_28',
    'variant-secondary': '_variant-secondary_10kfo_42',
    'variant-danger': '_variant-danger_10kfo_56',
    'variant-ghost': '_variant-ghost_10kfo_70',
    'size-sm': '_size-sm_10kfo_85',
    'size-md': '_size-md_10kfo_93',
    'size-lg': '_size-lg_10kfo_101',
    fullWidth: rS,
    iconLeft: fS,
    iconRight: dS,
    label: mS,
  };
function Ct({
  label: c,
  variant: u = 'primary',
  size: s = 'md',
  fullWidth: o = !1,
  iconLeft: m,
  iconRight: d,
  disabled: h = !1,
  onClick: y,
  type: _ = 'button',
}) {
  return r.jsxs('button', {
    type: _,
    className: [Cl.button, Cl[`variant-${u}`], Cl[`size-${s}`], o ? Cl.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: y,
    'aria-disabled': h,
    children: [
      m != null && r.jsx('span', { className: Cl.iconLeft, 'aria-hidden': 'true', children: m }),
      r.jsx('span', { className: Cl.label, children: c }),
      d != null && r.jsx('span', { className: Cl.iconRight, 'aria-hidden': 'true', children: d }),
    ],
  });
}
const hS = '_overlay_1i1z1_12',
  vS = '_fullscreen_1i1z1_21',
  yS = '_absolute_1i1z1_27',
  _S = '_alignCenter_1i1z1_33',
  gS = '_alignTop_1i1z1_38',
  pS = '_alignBottom_1i1z1_44',
  bS = '_content_1i1z1_50',
  Dl = {
    overlay: hS,
    fullscreen: vS,
    absolute: yS,
    alignCenter: _S,
    alignTop: gS,
    alignBottom: pS,
    content: bS,
  },
  SS = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Xh = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  xS = { center: Dl.alignCenter, top: Dl.alignTop, bottom: Dl.alignBottom };
function _r({
  fullscreen: c = !0,
  children: u,
  onClose: s,
  dismissible: o = !0,
  dimLevel: m = 'normal',
  blur: d = 0,
  align: h = 'center',
  zIndex: y = 'overlay',
  style: _,
  open: g,
}) {
  const b = () => {
      o && s && s();
    },
    T = (U) => {
      U.stopPropagation();
    },
    z = SS[m],
    C = typeof y == 'number' ? y : (Xh[y] ?? Xh.overlay),
    O = {
      background: `rgba(2, 4, 10, ${z})`,
      zIndex: C,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ..._,
    };
  return r.jsx('div', {
    className: [Dl.overlay, c ? Dl.fullscreen : Dl.absolute, xS[h]].join(' '),
    style: O,
    onClick: b,
    role: 'presentation',
    'aria-modal': 'true',
    children: r.jsx('div', { className: Dl.content, onClick: T, children: u }),
  });
}
const jS = '_wrapper_131tr_1',
  TS = '_disabled_131tr_5',
  AS = '_input_131tr_18',
  ds = {
    wrapper: jS,
    disabled: TS,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: AS,
  },
  ir = ({
    value: c,
    min: u = 0,
    max: s = 1,
    step: o = 0.01,
    onChange: m,
    color: d = 'primary',
    disabled: h = !1,
  }) => {
    const y = s === u ? 0 : ((c - u) / (s - u)) * 100,
      _ = (b) => {
        h || m(parseFloat(b.target.value));
      },
      g = { '--slider-fill-pct': `${y}%` };
    return r.jsx('div', {
      className: [ds.wrapper, ds[`color-${d}`], h ? ds.disabled : ''].join(' '),
      style: g,
      children: r.jsx('input', {
        type: 'range',
        className: ds.input,
        min: u,
        max: s,
        step: o,
        value: c,
        onChange: _,
        disabled: h,
        'aria-valuenow': c,
        'aria-valuemin': u,
        'aria-valuemax': s,
      }),
    });
  },
  NS = '_dialog_49iek_13',
  ES = '_card_49iek_20',
  zS = '_titleRow_49iek_27',
  MS = '_titleIcon_49iek_33',
  CS = '_title_49iek_27',
  wS = '_message_49iek_46',
  OS = '_actions_49iek_50',
  RS = '_variantDanger_49iek_57',
  il = {
    dialog: NS,
    card: ES,
    titleRow: zS,
    titleIcon: MS,
    title: CS,
    message: wS,
    actions: OS,
    variantDanger: RS,
  };
function j1({
  open: c,
  title: u,
  message: s,
  iconName: o,
  confirmLabel: m = '確定',
  cancelLabel: d = 'キャンセル',
  onConfirm: h,
  onCancel: y,
  variant: _ = 'default',
}) {
  return c
    ? r.jsx(_r, {
        open: c,
        onClose: y,
        dismissible: !0,
        children: r.jsx('div', {
          className: [il.dialog, _ === 'danger' ? il.variantDanger : ''].filter(Boolean).join(' '),
          children: r.jsxs(Hl, {
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
                      children: r.jsx(Ee, {
                        name: o,
                        size: 20,
                        color: _ === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  r.jsx(G, { variant: 'heading-3', as: 'h2', className: il.title, children: u }),
                ],
              }),
              s != null &&
                s.length > 0 &&
                r.jsx(G, { variant: 'body', color: 'mid', className: il.message, children: s }),
              r.jsxs('div', {
                className: il.actions,
                children: [
                  r.jsx(Ct, { label: d, variant: 'ghost', fullWidth: !0, onClick: y }),
                  r.jsx(Ct, {
                    label: m,
                    variant: _ === 'danger' ? 'danger' : 'primary',
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
function DS({
  open: c,
  bgmVolume: u,
  seVolume: s,
  onBgmChange: o,
  onSeChange: m,
  onRetreat: d,
  onClose: h,
}) {
  const [y, _] = de.useState(!1);
  if (!c) return null;
  const g = () => {
      _(!0);
    },
    b = () => {
      (_(!1), d());
    },
    T = () => {
      _(!1);
    };
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx(_r, {
        open: c,
        onClose: h,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !y,
        children: r.jsxs(Hl, {
          variant: 'elevated',
          padding: 'lg',
          className: Ft.card,
          children: [
            r.jsx('div', {
              className: Ft.header,
              children: r.jsx(G, {
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
                    r.jsx(G, {
                      variant: 'label',
                      color: 'mid',
                      className: Ft.sliderLabel,
                      children: 'BGM',
                    }),
                    r.jsx(G, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: Ft.sliderValue,
                      children: Math.round(u * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(ir, { value: u, min: 0, max: 1, step: 0.01, onChange: o, color: 'primary' }),
                r.jsxs('div', {
                  className: Ft.sliderRow,
                  children: [
                    r.jsx(G, {
                      variant: 'label',
                      color: 'mid',
                      className: Ft.sliderLabel,
                      children: 'SE',
                    }),
                    r.jsx(G, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: Ft.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(ir, { value: s, min: 0, max: 1, step: 0.01, onChange: m, color: 'primary' }),
              ],
            }),
            r.jsx('div', { className: Ft.divider, role: 'separator' }),
            r.jsxs('div', {
              className: Ft.actions,
              children: [
                r.jsx(Ct, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: g }),
                r.jsx(Ct, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: h }),
              ],
            }),
          ],
        }),
      }),
      r.jsx(j1, {
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
const BS = '_card_1fzt0_2',
  LS = '_header_1fzt0_14',
  qS = '_statusText_1fzt0_19',
  HS = '_section_1fzt0_23',
  US = '_sectionTitle_1fzt0_29',
  GS = '_statsGrid_1fzt0_35',
  VS = '_statItem_1fzt0_41',
  $S = '_rewardList_1fzt0_52',
  kS = '_rewardCurrency_1fzt0_58',
  YS = '_patchList_1fzt0_66',
  ZS = '_patchItem_1fzt0_72',
  XS = '_actions_1fzt0_87',
  Je = {
    card: BS,
    header: LS,
    statusText: qS,
    section: HS,
    sectionTitle: US,
    statsGrid: GS,
    statItem: VS,
    rewardList: $S,
    rewardCurrency: kS,
    patchList: YS,
    patchItem: ZS,
    actions: XS,
  },
  QS = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  KS = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function JS(c) {
  const u = Math.floor(c / 60),
    s = Math.floor(c % 60);
  return `${u.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function WS({
  open: c,
  status: u,
  reachedTier: s,
  reachedWave: o,
  killed: m,
  elapsedSec: d,
  reward: h,
  onClose: y,
}) {
  if (!c) return null;
  const _ = QS[u],
    g = KS[u];
  return r.jsx(_r, {
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
          children: r.jsx(G, {
            variant: 'heading-1',
            as: 'h2',
            color: g,
            align: 'center',
            className: Je.statusText,
            children: _,
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
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: s.toString() }),
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
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: JS(d) }),
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
                  children: r.jsx(Vi, { currency: 'bolt', value: h.bolt, size: 'lg' }),
                }),
                r.jsx('div', {
                  className: Je.rewardCurrency,
                  children: r.jsx(Vi, { currency: 'alloy', value: h.alloy, size: 'lg' }),
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
const FS = [
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
function gr(c, u) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, u));
}
function Qh(c) {
  return 1 + 0.1 * c;
}
function IS(c, u, s) {
  let o = 0;
  for (let m = 0; m < s; m++) o += gr(c, u + m);
  return o;
}
function PS(c, u, s) {
  let o = Ae.ZERO,
    m = 0;
  for (;;) {
    const d = Ae.fromNumber(gr(c, u + m)),
      h = o.add(d);
    if (h.gt(s) || ((o = h), m++, m >= 1e4)) break;
  }
  return { lvDelta: m, totalCost: o };
}
const ex = '_inner_1ld24_2',
  tx = '_grid_1ld24_7',
  Kh = { inner: ex, grid: tx },
  ax = '_sheet_k47pw_38',
  lx = '_edgeBottom_k47pw_43',
  nx = '_content_k47pw_49',
  ix = '_edgeTop_k47pw_55',
  cx = '_edgeSide_k47pw_66',
  sx = '_edgeAll_k47pw_80',
  ux = '_paddingSm_k47pw_95',
  ox = '_paddingMd_k47pw_99',
  rx = '_paddingLg_k47pw_103',
  fx = '_backdrop_k47pw_108',
  ia = {
    sheet: ax,
    edgeBottom: lx,
    content: nx,
    edgeTop: ix,
    edgeSide: cx,
    edgeAll: sx,
    paddingSm: ux,
    paddingMd: ox,
    paddingLg: rx,
    backdrop: fx,
  },
  dx = '_container_9k8su_1',
  mx = '_handle_9k8su_13',
  hx = '_dragging_9k8su_21',
  Fo = { container: dx, handle: mx, dragging: hx };
function T1({ className: c, dragging: u, width: s, onPointerDown: o }) {
  return r.jsx('div', {
    className: [Fo.container, c].filter(Boolean).join(' '),
    'aria-hidden': 'true',
    onPointerDown: o,
    children: r.jsx('span', {
      className: [Fo.handle, u ? Fo.dragging : ''].filter(Boolean).join(' '),
      style: s !== void 0 ? { width: `${s}px` } : void 0,
    }),
  });
}
const vx = { none: '', sm: ia.paddingSm, md: ia.paddingMd, lg: ia.paddingLg };
function yx({
  open: c,
  children: u,
  onClose: s,
  edge: o,
  position: m,
  withHandle: d,
  padding: h = 'none',
  style: y,
}) {
  const _ = o ?? 'bottom',
    g = { bottom: ia.edgeBottom, top: ia.edgeTop, side: ia.edgeSide, all: ia.edgeAll }[_],
    b = vx[h];
  return r.jsxs('div', {
    className: [ia.sheet, g].filter(Boolean).join(' '),
    role: 'dialog',
    'aria-modal': 'true',
    style: y,
    children: [
      s && r.jsx('div', { className: ia.backdrop, onClick: s, 'aria-hidden': 'true' }),
      r.jsxs('div', {
        className: [ia.content, b].filter(Boolean).join(' '),
        children: [d && _ === 'bottom' && r.jsx(T1, {}), u],
      }),
    ],
  });
}
function _x({ open: c, screw: u, levels: s, onUpgrade: o, onClose: m }) {
  return c
    ? r.jsxs(yx, {
        open: c,
        onClose: m,
        edge: 'bottom',
        children: [
          r.jsx(T1, {}),
          r.jsx('div', {
            className: Kh.inner,
            children: r.jsx('div', {
              className: Kh.grid,
              children: FS.map((d) => {
                const h = s[d.key],
                  y = Qh(h),
                  _ = Qh(h + 1),
                  g = gr(d, h),
                  b = IS(d, h, 5),
                  { totalCost: T, lvDelta: z } = PS(d, h, u),
                  C = Ae.fromNumber(g),
                  O = Ae.fromNumber(b),
                  U = u.gte(C),
                  H = u.gte(O),
                  I = z > 0;
                return r.jsx(
                  hr,
                  {
                    title: d.title,
                    iconName: d.iconName,
                    currentLabel: `Lv ${h}`,
                    before: Math.round(y * 10) / 10,
                    after: Math.round(_ * 10) / 10,
                    beforeSuffix: '×',
                    currency: 'screw',
                    accent: 'warning',
                    options: [
                      { amount: '+1', cost: C, disabled: !U },
                      { amount: '+5', cost: O, disabled: !H },
                      { amount: 'MAX', cost: T, disabled: !I },
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
const gx = '_root_9fvdn_2',
  px = { root: gx },
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
function bx({ items: c = [], showTower: u = !1, towerContent: s = null, cycleSeconds: o = 24 }) {
  const d = `ssfx-${de.useId().replace(/:/g, '')}`,
    h = Io.map((T, z) => {
      const C = 100 / T.length,
        O = T.map(([U, H], I) => {
          const J = I * C;
          return `
          ${J}%               { left: ${U}%; top: ${H}%; opacity: 0; }
          ${(J + 3).toFixed(2)}%   { left: ${U}%; top: ${H}%; opacity: 1; }
          ${(J + C - 7).toFixed(2)}%  { left: ${U}%; top: ${H}%; opacity: 1; }
          ${(J + C - 3).toFixed(2)}%  { left: ${U}%; top: ${H}%; opacity: 0; }
        `;
        }).join('');
      return `@keyframes ${d}-drift-${z + 1} { ${O} 100% { opacity: 0; } }`;
    }).join(`
`),
    y = Io.map(
      (T, z) => `.${d}-p${z + 1} { animation: ${d}-drift-${z + 1} ${o}s linear infinite; }`
    ).join(`
`),
    _ = `
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
    g = r.jsxs('div', {
      className: `${d}-tower`,
      children: [
        r.jsx('div', { className: `${d}-tower-r1` }),
        r.jsx('div', { className: `${d}-tower-r2` }),
        r.jsx('div', { className: `${d}-tower-core`, children: s }),
      ],
    }),
    b = u ? [g, ...c] : [...c];
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
      r.jsx('style', { dangerouslySetInnerHTML: { __html: _ } }),
      b.map((T, z) => {
        const C = (z % Io.length) + 1,
          O = -(z * (o / Math.max(b.length, 1)));
        return r.jsx(
          'div',
          {
            className: `${d}-slot ${d}-p${C}${z === 0 ? ` ${d}-rm-show` : ''}`,
            style: { animationDelay: `${O}s` },
            children: T,
          },
          z
        );
      }),
    ],
  });
}
function Sx({ open: c, onClose: u }) {
  return c
    ? r.jsx('div', {
        className: px.root,
        onClick: u,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (s) => {
          (s.key === 'Enter' || s.key === ' ') && u();
        },
        children: r.jsx(bx, {
          showTower: !0,
          towerContent: r.jsx(Ee, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
const xx = 30,
  jx = 30,
  Tx = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 };
function Ax(c, u) {
  return c && u <= 0 ? 'gameover' : null;
}
function Nx() {
  const { navigate: c } = ol(),
    u = X((te) => te.isRunActive),
    s = X((te) => te.screw),
    o = X((te) => te.machineHp),
    m = X((te) => te.machineMaxHp),
    d = X((te) => te.currentTier),
    h = X((te) => te.currentWave),
    y = X((te) => te.currentWeapon),
    _ = X((te) => te.activeCdSec),
    g = X((te) => te.isAutoActive),
    b = X((te) => te.gameSpeed),
    T = X((te) => te.bgmVolume),
    z = X((te) => te.seVolume),
    C = X((te) => te.setBgmVolume),
    O = X((te) => te.setSeVolume),
    U = X((te) => te.setAutoActive),
    H = X((te) => te.switchWeapon),
    [I, J] = de.useState(!1),
    [_e, ke] = de.useState(!1),
    [lt, De] = de.useState(!1),
    [ne, Ze] = de.useState(!1),
    [rt, ut] = de.useState(b),
    [Be, Xe] = de.useState(Tx),
    [Yt] = de.useState([]),
    [wt] = de.useState([]),
    [nt] = de.useState([]),
    R = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    V = Ax(u, o),
    [F, ge] = de.useState(null),
    pe = F ?? V,
    x = pe !== null,
    q = Ae.fromNumber(o),
    $ = Ae.fromNumber(m > 0 ? m : 1),
    Y = (te) => {
      ut(te);
    },
    P = () => {
      Ze((te) => !te);
    },
    ie = () => {
      ke(!0);
    },
    me = () => {
      De(!0);
    },
    We = () => {
      (ke(!1), ge('retreat'));
    },
    we = () => {
      c('preparation');
    },
    rl = (te, Qi) => {
      Xe((Ln) => ({ ...Ln, [te]: Ln[te] + (Qi === 'max' ? 1 : Qi) }));
    },
    Ul = { bolt: Ae.ZERO, alloy: Ae.ZERO, patches: [] },
    Gl = 30;
  return r.jsxs('div', {
    className: $h.root,
    children: [
      r.jsx(ql, {
        noScroll: !0,
        variant: 'battle',
        header: r.jsx(eS, {
          hpCurrent: q,
          hpMax: $,
          tier: d,
          wave: h,
          totalWaves: Gl,
          secondsRemaining: 30,
          secondsTotal: 30,
          isBossWave: h === Gl,
          enemiesRemaining: 18,
        }),
        footer: r.jsx(Db, {
          screw: s,
          equippedWeapon: y,
          weaponCds: R,
          activeCd: _,
          activeMax: xx,
          isAutoActive: g,
          onSwitchWeapon: H,
          onActivate: () => {},
          onToggleAuto: U,
          gameSpeed: rt,
          onSpeedChange: Y,
          isPaused: ne,
          onTogglePause: P,
          onOpenMenu: ie,
          onOpenScreenSaver: me,
        }),
        children: r.jsx(D2, {
          enemies: [],
          damageEvents: Yt,
          hitEvents: wt,
          deathEvents: nt,
          range: jx,
        }),
      }),
      r.jsxs('div', {
        className: $h.overlayLayer,
        'aria-live': 'polite',
        children: [
          r.jsx(_x, {
            open: I,
            screw: s,
            levels: Be,
            onUpgrade: rl,
            onClose: () => {
              J(!1);
            },
          }),
          r.jsx(DS, {
            open: _e,
            bgmVolume: T,
            seVolume: z,
            onBgmChange: C,
            onSeChange: O,
            onRetreat: We,
            onClose: () => {
              ke(!1);
            },
          }),
          x &&
            r.jsx(WS, {
              open: x,
              status: pe,
              reachedTier: d,
              reachedWave: h,
              killed: 0,
              elapsedSec: 0,
              reward: Ul,
              onClose: we,
            }),
          r.jsx(Sx, {
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
const Ex = [
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
function Jh(c, u) {
  switch (c.growthType) {
    case 'multiply':
      return Math.ceil(c.baseValue * Math.pow(c.growthFactor, u));
    case 'linear':
    case 'fixed_step':
      return c.baseValue + c.growthFactor * u;
    case 'asymptotic':
      return 1 - 1 / (1 + c.growthFactor * u);
    case 'asymptotic_half':
      return 0.5 * (1 - 1 / (1 + c.growthFactor * u));
    case 'range_asymptotic': {
      const m = c.growthFactor * u;
      return Math.ceil(150 + 250 * (1 - 1 / (1 + m)));
    }
    default:
      return c.baseValue;
  }
}
function pr(c, u) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, u));
}
function Po(c, u, s) {
  let o = 0;
  for (let m = 0; m < s && !(c.maxLv != null && u + m >= c.maxLv); m++) o += pr(c, u + m);
  return o;
}
function zx(c, u, s) {
  let o = 0,
    m = s,
    d = u;
  for (let h = 0; h < 1e4 && !(c.maxLv != null && d >= c.maxLv); h++) {
    const y = Ae.fromNumber(pr(c, d));
    if (m.lt(y)) break;
    ((m = m.sub(y)), (d += 1), (o += 1));
  }
  return o;
}
const Mx = '_root_in43u_3',
  Cx = { root: Mx };
function wx() {
  const c = X((m) => m.machineLevels),
    u = X((m) => m.bolt),
    s = X((m) => m.incrementMachineLv),
    o = X((m) => m.spendBolt);
  return r.jsx('div', {
    className: Cx.root,
    children: Ex.map((m) => {
      const d = c[m.key],
        h = m.maxLv != null && d >= m.maxLv,
        y = Jh(m, d),
        _ = Jh(m, d + 1),
        g = (ut) => (m.unit === '%' ? Math.round(ut * 1e3) / 10 : ut),
        b = g(y),
        T = g(_),
        z = pr(m, d),
        C = Po(m, d, 5),
        O = Ae.fromNumber(z),
        U = Ae.fromNumber(C),
        H = zx(m, d, u),
        I = m.maxLv != null ? m.maxLv - d : Number.POSITIVE_INFINITY,
        J = Math.min(H, I),
        _e = J > 0 ? Po(m, d, J) : z,
        ke = Ae.fromNumber(_e),
        lt = u.lt(O),
        De = u.lt(U) || (m.maxLv != null && d + 5 > m.maxLv),
        ne = J < 1,
        Ze = h
          ? []
          : [
              { amount: '+1', cost: O, disabled: lt },
              { amount: '+5', cost: U, disabled: De },
              { amount: 'MAX', cost: ke, disabled: ne },
            ],
        rt = (ut) => {
          if (h) return;
          let Be = 0;
          if ((ut === '+1' ? (Be = 1) : ut === '+5' ? (Be = 5) : ut === 'MAX' && (Be = J), Be < 1))
            return;
          m.maxLv != null && (Be = Math.min(Be, m.maxLv - d));
          const Xe = Po(m, d, Be),
            Yt = Ae.fromNumber(Xe);
          if (o(Yt)) for (let nt = 0; nt < Be; nt++) s(m.key);
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
function Ox() {
  const { navigate: c } = ol(),
    u = (s) => {
      c(s);
    };
  return r.jsx(ql, {
    header: r.jsx(Yi, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: r.jsx(ki, { active: 'machine', onChange: u }),
    children: r.jsx(wx, {}),
  });
}
const Rx = () => r.jsx('div', { children: r.jsx('h1', { children: 'Not Found' }) }),
  Dx = '_content_14xiq_1',
  Bx = { content: Dx },
  Lx = '_root_1l9jp_1',
  qx = '_header_1l9jp_8',
  Hx = '_headerTitleRow_1l9jp_15',
  Ux = '_headerCount_1l9jp_21',
  Gx = '_slotGrid_1l9jp_35',
  Vx = '_emptyHint_1l9jp_41',
  Cn = { root: Lx, header: qx, headerTitleRow: Hx, headerCount: Ux, slotGrid: Gx, emptyHint: Vx },
  $x = '_wrapper_16mrg_3',
  kx = '_filled_16mrg_16',
  Yx = '_empty_16mrg_25',
  Zx = '_locked_16mrg_26',
  Xx = '_slotInner_16mrg_59',
  Qx = '_emptyIcon_16mrg_67',
  Kx = '_emptyLabel_16mrg_74',
  cl = {
    wrapper: $x,
    filled: kx,
    empty: Yx,
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
function br({
  name: c,
  iconName: u,
  tier: s,
  count: o,
  trigger: m,
  effect: d,
  selected: h = !1,
  merging: y = !1,
  locked: _ = !1,
  disabled: g = !1,
  size: b = 'md',
  onClick: T,
}) {
  const z = Math.min(Math.max(1, Math.floor(s)), 5),
    C = `var(--c-patch-t${z})`,
    O = T != null && !g && !_,
    U = h ? { boxShadow: 'var(--glow-cyan-md)' } : y ? { boxShadow: 'var(--glow-purple-md)' } : {},
    H = {
      width: Wh[b],
      height: Wh[b],
      opacity: _ ? 0.35 : 1,
      background: _ ? 'var(--c-surface)' : `linear-gradient(135deg, ${C}22, ${C}08)`,
      border: _ ? '1px solid var(--c-border-faint)' : `1px solid ${C}55`,
      filter: _ ? 'none' : `drop-shadow(0 0 4px ${C}55)`,
    },
    I = {
      background: o >= 2 ? `${C}22` : void 0,
      borderColor: o >= 2 ? C : void 0,
      color: o >= 2 ? C : void 0,
    };
  return r.jsx('div', {
    className: [
      ct.root,
      h ? ct.selected : '',
      y ? ct.merging : '',
      _ ? ct.locked : '',
      g ? ct.disabled : '',
      ct[`size-${b}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: U,
    onClick: O ? T : void 0,
    role: O ? 'button' : void 0,
    tabIndex: O ? 0 : void 0,
    onKeyDown: O
      ? (J) => {
          (J.key === 'Enter' || J.key === ' ') && (J.preventDefault(), T == null || T());
        }
      : void 0,
    'aria-pressed': O ? h : void 0,
    'aria-disabled': g || _ ? !0 : void 0,
    children: r.jsxs(Hl, {
      variant: 'elevated',
      padding: 'sm',
      interactive: O,
      className: ct.card,
      children: [
        !_ &&
          r.jsx('span', {
            className: ct.tierBadge,
            children: r.jsx(As, { text: `T${z}`, variant: 'patch-tier', tier: s }),
          }),
        r.jsxs('span', {
          className: [ct.count, o === 0 ? ct.countZero : ''].filter(Boolean).join(' '),
          style: I,
          children: ['×', _ ? '?' : o],
        }),
        r.jsx('div', {
          className: ct.iconWrap,
          style: H,
          children: r.jsx(Ee, {
            name: _ ? 'close' : u,
            size: r3[b],
            color: _ ? 'var(--c-text-disabled)' : C,
          }),
        }),
        r.jsx(G, {
          variant: 'caption',
          color: _ ? 'dim' : 'text',
          className: ct.name,
          children: _ ? '???' : c,
        }),
        !_ &&
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
function A1({ patch: c = null, slotIndex: u, locked: s = !1, size: o = 'md', onClick: m }) {
  const d = c != null,
    h = m != null && !s,
    y = u != null ? `Slot ${u}` : '',
    _ = d
      ? `Slot ${u ?? ''}: ${c.name} (Tier ${c.tier})`
      : s
        ? `Slot ${u ?? ''} (locked)`.trim()
        : `Slot ${u ?? ''} (empty)`.trim(),
    g = d ? cl.filled : s ? cl.locked : cl.empty;
  return r.jsx('div', {
    className: [cl.wrapper, g, cl[`size-${o}`]].filter(Boolean).join(' '),
    role: h ? 'button' : void 0,
    tabIndex: h ? 0 : void 0,
    'aria-label': _,
    'aria-disabled': s ? !0 : void 0,
    onClick: h ? m : void 0,
    onKeyDown: h
      ? (b) => {
          (b.key === 'Enter' || b.key === ' ') && (b.preventDefault(), m == null || m());
        }
      : void 0,
    children:
      d && c != null
        ? r.jsx(br, {
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
            className: cl.slotInner,
            children: [
              r.jsx('span', {
                className: cl.emptyIcon,
                children: r.jsx(Ee, {
                  name: s ? 'close' : 'plus',
                  size: 28,
                  color: s ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              r.jsx('span', { className: cl.emptyLabel, children: s ? 'LOCKED' : y }),
            ],
          }),
  });
}
function f3(c) {
  return Math.min(1 + c, Bn);
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
function v3({ overridePatches: c, overrideEquipped: u, overridePatchSlotsLv: s }) {
  const o = X((O) => O.patches),
    m = X((O) => O.equippedPatches),
    d = X((O) => O.machineLevels.patchSlots),
    h = X((O) => O.unequipPatch),
    y = c ?? o,
    _ = u ?? m,
    b = f3(s ?? d),
    T = (O) => {
      const U = _.get(O);
      if (!U) return null;
      const H = `${U.name}#${U.tier}`,
        I = y.get(H);
      return {
        patchId: H,
        name: U.name,
        iconName: d3[U.name] ?? 'spark',
        tier: U.tier,
        trigger: m3[U.name] ?? '常時',
        effect: h3[U.name] ?? '-',
        count: (I == null ? void 0 : I.count) ?? 0,
      };
    },
    z = (O) => {
      _.get(O) && h(O);
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
                children: [_.size, '/', b],
              }),
            ],
          }),
          r.jsxs(G, {
            variant: 'caption',
            color: 'dim',
            children: ['(', Bn, ' スロット中 ', C, ' ロック・', _.size, ' / ', b, ' ', '装着中)'],
          }),
        ],
      }),
      r.jsx('div', {
        className: Cn.slotGrid,
        children: Array.from({ length: Bn }, (O, U) => {
          const H = U >= b,
            I = H ? null : T(U);
          return r.jsx(
            A1,
            { slotIndex: U + 1, patch: I, locked: H, size: 'md', onClick: H ? void 0 : () => z(U) },
            U
          );
        }),
      }),
      _.size === 0 &&
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
const y3 = '_root_16zq4_1',
  _3 = '_header_16zq4_8',
  g3 = '_grid_16zq4_14',
  p3 = '_empty_16zq4_20',
  Li = { root: y3, header: _3, grid: g3, empty: p3 },
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
function j3({ overridePatches: c, overrideEquipped: u, selectedId: s, onSelect: o }) {
  const m = X((b) => b.patches),
    d = X((b) => b.equippedPatches),
    h = c ?? m,
    y = u ?? d,
    _ = new Set(Array.from(y.values()).map((b) => b.name)),
    g = Array.from(h.values());
  return g.length === 0
    ? r.jsx('div', {
        className: Li.root,
        children: r.jsx('div', {
          className: Li.empty,
          children: r.jsx(G, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : r.jsxs('div', {
        className: Li.root,
        children: [
          r.jsxs('div', {
            className: Li.header,
            children: [
              r.jsx(G, { variant: 'heading-3', children: 'パッチ在庫' }),
              r.jsxs(G, { variant: 'caption', color: 'dim', children: [g.length, ' 種類'] }),
            ],
          }),
          r.jsx('div', {
            className: Li.grid,
            children: g.map((b) => {
              const T = `${b.name}#${b.tier}`,
                z = _.has(b.name);
              return r.jsx(
                br,
                {
                  patchId: T,
                  name: b.name,
                  iconName: b3[b.name] ?? 'spark',
                  tier: b.tier,
                  count: b.count,
                  trigger: S3[b.name] ?? '常時',
                  effect: x3[b.name] ?? '-',
                  selected: s === T,
                  locked: z,
                  onClick: o ? () => o(s === T ? null : T) : void 0,
                },
                T
              );
            }),
          }),
        ],
      });
}
const T3 = '_root_1svx2_1',
  A3 = '_header_1svx2_8',
  N3 = '_tierControl_1svx2_14',
  E3 = '_tierStepperRow_1svx2_24',
  z3 = '_mergeList_1svx2_30',
  M3 = '_empty_1svx2_36',
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
    min: u,
    max: s,
    step: o = 1,
    onChange: m,
    size: d = 'md',
    disabled: h = !1,
  }) => {
    const y = c - o >= u,
      _ = c + o <= s,
      g = () => {
        h || !y || m(Math.max(u, c - o));
      },
      b = () => {
        h || !_ || m(Math.min(s, c + o));
      };
    return r.jsxs('div', {
      className: [On.stepper, On[`size-${d}`], h ? On.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        r.jsx('button', {
          type: 'button',
          className: On.btn,
          onClick: g,
          disabled: h || !y,
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
          disabled: h || !_,
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
function N1(c, u) {
  const s = [];
  for (const o of c.values())
    o.tier < u &&
      o.count >= 2 &&
      s.push({ name: o.name, tier: o.tier, count: o.count, iconName: B3[o.name] ?? 'spark' });
  return s.sort((o, m) => o.tier - m.tier || o.name.localeCompare(m.name));
}
function L3(c, u) {
  let s = new Map(c),
    o = !0;
  for (; o; ) {
    o = !1;
    for (const m of Array.from(s.values())) {
      if (m.tier >= u || m.count < 2 || m.tier >= cr) continue;
      const d = `${m.name}#${m.tier}`,
        h = Math.floor(m.count / 2),
        y = m.count % 2,
        _ = m.tier + 1,
        g = `${m.name}#${_}`,
        b = s.get(g),
        T = ((b == null ? void 0 : b.count) ?? 0) + h;
      ((s = new Map(s)),
        y === 0 ? s.delete(d) : s.set(d, { ...m, count: y }),
        s.set(g, { name: m.name, tier: _, count: T }),
        (o = !0));
    }
  }
  return s;
}
function q3({ overridePatches: c }) {
  const u = X((z) => z.patches),
    s = X((z) => z.addPatch),
    o = X((z) => z.consumePatch),
    m = X((z) => z.pruneEmptyPatches),
    d = c ?? u,
    h = Math.max(1, ...Array.from(d.values()).map((z) => z.tier)),
    [y, _] = de.useState(Math.min(h, cr - 1)),
    g = N1(d, y + 1),
    b = g.length > 0,
    T = () => {
      if (c) return;
      const z = L3(d, y + 1);
      for (const [C, O] of d) {
        const U = z.get(C),
          H = (U == null ? void 0 : U.count) ?? 0;
        H < O.count && o(O.name, O.tier, O.count - H);
      }
      for (const [C, O] of z) {
        const U = d.get(C),
          H = (U == null ? void 0 : U.count) ?? 0;
        O.count > H && s(O.name, O.tier, O.count - H);
      }
      m();
    };
  return r.jsxs('div', {
    className: wn.root,
    children: [
      r.jsx('div', {
        className: wn.header,
        children: r.jsx(G, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      r.jsxs('div', {
        className: wn.tierControl,
        children: [
          r.jsx(G, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          r.jsxs('div', {
            className: wn.tierStepperRow,
            children: [
              r.jsx(D3, { value: y, min: 1, max: cr - 1, onChange: _ }),
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
                className: wn.mergeList,
                children: g.map((z) =>
                  r.jsx(
                    br,
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
              r.jsx(Ct, {
                label: `一括合成 (${g.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: T,
              }),
            ],
          })
        : r.jsxs('div', {
            className: wn.empty,
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
function H3(c) {
  return Math.min(1 + c, Bn);
}
function U3() {
  const { navigate: c } = ol(),
    [u, s] = de.useState('equip'),
    o = X((C) => C.equippedPatches),
    m = X((C) => C.patches),
    d = X((C) => C.machineLevels.patchSlots),
    h = H3(d),
    y = o.size,
    _ = m.size,
    g = N1(m, 5).length,
    b = (C) => {
      c(C);
    },
    T = () => {
      c('preparation');
    },
    z = [
      { key: 'equip', label: '装着', badge: `${y}/${h}` },
      { key: 'inventory', label: '所持', badge: _ > 0 ? _ : void 0 },
      { key: 'merge', label: '合成', badge: g > 0 ? g : void 0 },
    ];
  return r.jsx(ql, {
    header: r.jsx(Yi, {
      title: 'パッチ庫',
      subtitle: `装着 ${y}/${h} ・ 在庫 ${_} 種`,
      onBack: T,
      currencies: [],
      tabBar: r.jsx(bs, { tabs: z, value: u, onChange: s, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(ki, { active: 'patches', onChange: b }),
    children: r.jsxs('div', {
      className: Bx.content,
      children: [
        u === 'equip' && r.jsx(v3, {}),
        u === 'inventory' && r.jsx(j3, {}),
        u === 'merge' && r.jsx(q3, {}),
      ],
    }),
  });
}
const G3 = '_footer_qoo97_1',
  V3 = '_tabPanel_qoo97_7',
  Fh = { footer: G3, tabPanel: V3 },
  $3 = '_wrapper_1lf9s_1',
  k3 = '_header_1lf9s_7',
  Y3 = '_headerLabel_1lf9s_13',
  Z3 = '_empty_1lf9s_18',
  X3 = '_emptyIcon_1lf9s_29',
  Q3 = '_grid_1lf9s_33',
  K3 = '_note_1lf9s_39',
  wl = { wrapper: $3, header: k3, headerLabel: Y3, empty: Z3, emptyIcon: X3, grid: Q3, note: K3 },
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
  const u = X((h) => h.equippedPatches),
    s = X((h) => h.machineLevels.patchSlots),
    o = Math.min(1 + s, Bn),
    m = [];
  for (let h = 0; h < o; h++) {
    const y = u.get(h);
    if (y != null) {
      const _ = J3[y.name],
        g = {
          patchId: `${y.name}#${y.tier}`,
          name: _.name,
          iconName: _.iconName,
          tier: y.tier,
          trigger: _.trigger,
          effect: _.effect,
          count: 1,
        };
      m.push({ kind: 'filled', patch: g, idx: h + 1 });
    } else m.push({ kind: 'empty', patch: null, idx: h + 1 });
  }
  const d = [...u.values()].length;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '装着パッチ',
    className: wl.wrapper,
    children: [
      r.jsxs('div', {
        className: wl.header,
        children: [
          r.jsxs(G, {
            variant: 'caption',
            color: 'mid',
            className: wl.headerLabel,
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
            className: wl.empty,
            children: [
              r.jsx('span', {
                className: wl.emptyIcon,
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
            className: wl.grid,
            children: m.map((h, y) =>
              r.jsx(A1, { patch: h.patch, slotIndex: h.idx, onClick: c }, y)
            ),
          }),
      r.jsx(G, {
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
const F3 = '_wrapper_iebuz_1',
  I3 = '_header_iebuz_7',
  P3 = '_grid_iebuz_12',
  er = { wrapper: F3, header: I3, grid: P3 },
  e5 = [
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
function t5({ selectedWeapon: c, onSelect: u }) {
  const s = X((h) => h.initialWeapon),
    o = X((h) => h.setInitialWeapon),
    m = c ?? s,
    d = (h) => {
      (o(h), u == null || u(h));
    };
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: er.wrapper,
    children: [
      r.jsx('div', {
        className: er.header,
        children: r.jsx(G, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      r.jsx('div', {
        className: er.grid,
        children: e5.map((h) =>
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
const a5 = '_wrapper_1rg1e_1',
  l5 = '_sticky_1rg1e_15',
  n5 = '_summary_1rg1e_19',
  i5 = '_weaponInfo_1rg1e_29',
  c5 = '_patchInfo_1rg1e_37',
  qi = { wrapper: a5, sticky: l5, summary: n5, weaponInfo: i5, patchInfo: c5 };
function s5({
  tier: c,
  weaponKind: u,
  patchCount: s = 0,
  disabled: o = !1,
  onLaunch: m,
  sticky: d = !0,
}) {
  return r.jsxs('div', {
    role: 'group',
    'aria-label': '出撃',
    className: [qi.wrapper, d ? qi.sticky : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: qi.summary,
        children: [
          c != null && r.jsx(As, { variant: 'tier', tier: c, size: 'sm' }),
          u != null &&
            r.jsxs('span', {
              className: qi.weaponInfo,
              children: [
                r.jsx(Ee, { name: u, size: 14 }),
                r.jsx(G, { variant: 'label', color: 'primary', children: u.toUpperCase() }),
              ],
            }),
          r.jsxs('span', {
            className: qi.patchInfo,
            children: [
              r.jsx(Ee, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              r.jsxs(G, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', s] }),
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
const u5 = '_wrapper_1ul9l_1',
  o5 = '_header_1ul9l_7',
  r5 = '_grid_1ul9l_14',
  f5 = '_tierBtn_1ul9l_20',
  d5 = '_active_1ul9l_35',
  m5 = '_tierLabel_1ul9l_50',
  h5 = '_frontierLabel_1ul9l_61',
  Ol = {
    wrapper: u5,
    header: o5,
    grid: r5,
    tierBtn: f5,
    active: d5,
    tierLabel: m5,
    frontierLabel: h5,
  };
function v5({ selectedTier: c, onSelect: u }) {
  const s = X((h) => h.highestTier),
    o = Math.max(1, s),
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
            _ = h === o,
            g = d(h);
          return r.jsxs(
            'button',
            {
              type: 'button',
              'aria-pressed': y,
              'data-active': y,
              'data-frontier': _,
              className: [Ol.tierBtn, y ? Ol.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': g },
              onClick: () => (u == null ? void 0 : u(h)),
              children: [
                r.jsxs('span', { className: Ol.tierLabel, children: ['T', h] }),
                _ && !y && r.jsx('span', { className: Ol.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            h
          );
        }),
      }),
    ],
  });
}
const y5 = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function _5(c) {
  const { initialSelectedTier: u } = c,
    { navigate: s } = ol(),
    [o, m] = de.useState('tier'),
    d = X((O) => O.highestTier),
    [h, y] = de.useState(u ?? Math.max(1, d)),
    _ = X((O) => O.initialWeapon),
    b = [...X((O) => O.equippedPatches).values()].length;
  function T() {
    s('battle');
  }
  const z = r.jsx(Yi, {
      title: '出撃準備',
      currencies: ['screw', 'bolt', 'alloy'],
      tabBar: r.jsx(bs, { tabs: y5, value: o, onChange: m, variant: 'underline', fullWidth: !0 }),
    }),
    C = r.jsxs('div', {
      className: Fh.footer,
      children: [
        r.jsx(s5, { tier: h, weaponKind: _, patchCount: b, sticky: !1, onLaunch: T }),
        r.jsx(ki, { active: 'preparation', onChange: (O) => s(O) }),
      ],
    });
  return r.jsx(ql, {
    header: z,
    footer: C,
    children: r.jsxs('div', {
      className: Fh.tabPanel,
      children: [
        o === 'tier' && r.jsx(v5, { selectedTier: h, onSelect: y }),
        o === 'weapon' && r.jsx(t5, {}),
        o === 'patches' && r.jsx(W3, { onOpenPatchScreen: () => s('patches') }),
      ],
    }),
  });
}
const g5 = '_content_mk0vl_1',
  p5 = { content: g5 },
  b5 = '_root_1b7n9_1',
  S5 = '_header_1b7n9_8',
  x5 = '_storageCard_1b7n9_13',
  j5 = '_storageRow_1b7n9_23',
  T5 = '_divider_1b7n9_29',
  A5 = '_section_1b7n9_34',
  N5 = '_dangerSection_1b7n9_40',
  E5 = '_sectionHeader_1b7n9_50',
  $t = {
    root: b5,
    header: S5,
    storageCard: x5,
    storageRow: j5,
    divider: T5,
    section: A5,
    dangerSection: N5,
    sectionHeader: E5,
  },
  z5 = '_wrapper_11b89_1',
  M5 = '_disabled_11b89_6',
  C5 = '_hiddenInput_11b89_11',
  w5 = '_btn_11b89_15',
  O5 = '_fileName_11b89_41',
  Hi = { wrapper: z5, disabled: M5, hiddenInput: C5, btn: w5, fileName: O5 },
  R5 = ({
    accept: c = 'application/json',
    onChange: u,
    label: s = 'ファイルを選択',
    disabled: o = !1,
  }) => {
    const m = de.useRef(null),
      [d, h] = de.useState(null),
      y = () => {
        var g;
        o || (g = m.current) == null || g.click();
      },
      _ = (g) => {
        var T;
        const b = ((T = g.target.files) == null ? void 0 : T[0]) ?? null;
        (h((b == null ? void 0 : b.name) ?? null), u(b), m.current && (m.current.value = ''));
      };
    return r.jsxs('div', {
      className: [Hi.wrapper, o ? Hi.disabled : ''].join(' '),
      children: [
        r.jsx('input', {
          ref: m,
          type: 'file',
          accept: c,
          className: Hi.hiddenInput,
          onChange: _,
          disabled: o,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        r.jsx('button', {
          type: 'button',
          className: Hi.btn,
          onClick: y,
          disabled: o,
          children: s,
        }),
        d && r.jsx('span', { className: Hi.fileName, title: d, children: d }),
      ],
    });
  };
function D5({ storageInfo: c, onExport: u, onImport: s, onReset: o }) {
  const [m, d] = de.useState(!1),
    [h, y] = de.useState(!1),
    [_, g] = de.useState(!1),
    b = async () => {
      if (u) {
        g(!0);
        try {
          await u();
        } finally {
          g(!1);
        }
      }
    },
    T = async (C) => {
      if (!(!C || !s)) {
        y(!0);
        try {
          await s(C);
        } finally {
          y(!1);
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
            label: _ ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: b,
            disabled: _ || !u,
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
          r.jsx(R5, {
            accept: 'application/json',
            onChange: T,
            label: h ? 'インポート中...' : 'ファイルを選択してインポート',
            disabled: h || !s,
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
      r.jsx(j1, {
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
const B5 = '_root_1rbig_1',
  L5 = '_header_1rbig_8',
  q5 = '_section_1rbig_13',
  H5 = '_sectionHeader_1rbig_20',
  U5 = '_divider_1rbig_26',
  Rn = { root: B5, header: L5, section: q5, sectionHeader: H5, divider: U5 },
  G5 = [
    { label: '×1', value: 1 },
    { label: '×2', value: 2 },
    { label: '×3', value: 3 },
  ];
function V5({ overrideVibration: c, overrideSpeed: u, onVibrationChange: s, onSpeedChange: o }) {
  const m = X((z) => z.vibrationEnabled),
    d = X((z) => z.defaultGameSpeed),
    h = X((z) => z.setVibrationEnabled),
    y = X((z) => z.setDefaultGameSpeed),
    _ = c ?? m,
    g = u ?? d,
    b = (z) => {
      s ? s(z) : h(z);
    },
    T = (z) => {
      o ? o(z) : y(z);
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
        children: r.jsx(yr, {
          checked: _,
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
          r.jsx(x1, { options: G5, value: g, onChange: T }),
        ],
      }),
    ],
  });
}
const $5 = '_root_nuc5y_2',
  k5 = '_muteRow_nuc5y_9',
  Y5 = '_muteLabelGroup_nuc5y_16',
  Z5 = '_sliderRow_nuc5y_24',
  X5 = '_muted_nuc5y_29',
  Q5 = '_sliderIcon_nuc5y_29',
  K5 = '_sliderArea_nuc5y_41',
  J5 = '_sliderValue_nuc5y_46',
  ul = {
    root: $5,
    muteRow: k5,
    muteLabelGroup: Y5,
    sliderRow: Z5,
    muted: X5,
    sliderIcon: Q5,
    sliderArea: K5,
    sliderValue: J5,
  };
function W5(c) {
  return 440 * Math.pow(2, (c - 69) / 12);
}
const F5 = {
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
  const u = c.match(/^([A-G]#?b?)(\d)$/);
  if (!u) throw new Error(`Invalid note: ${c}`);
  const s = F5[u[1]];
  if (s === void 0) throw new Error(`Invalid note name: ${u[1]}`);
  const m = 12 + parseInt(u[2], 10) * 12 + s;
  return W5(m);
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
const I5 = [D('A2'), D('C3'), D('E3')],
  P5 = [D('E2'), D('G2'), D('B2')];
(D('D3'), D('F3'), D('A3'));
const e4 = [D('G2'), D('B2'), D('D3')],
  t4 = [D('C3'), D('E3'), D('G3')],
  a4 = [D('B2'), D('D3'), D('F3')];
function kt(c, u, s, o, m, d, h, y) {
  const _ = c.createOscillator(),
    g = c.createGain();
  ((_.type = s), _.frequency.setValueAtTime(o, m));
  const b = 0.01,
    T = Math.min(0.08, d * 0.4);
  if (
    (g.gain.setValueAtTime(1e-4, m),
    g.gain.linearRampToValueAtTime(h, m + b),
    g.gain.setValueAtTime(h, m + d - T),
    g.gain.exponentialRampToValueAtTime(1e-4, m + d),
    y !== void 0)
  ) {
    const z = c.createBiquadFilter();
    ((z.type = 'lowpass'),
      (z.frequency.value = y),
      (z.Q.value = 0.8),
      _.connect(z).connect(g).connect(u));
  } else _.connect(g).connect(u);
  (_.start(m), _.stop(m + d + 0.02));
}
function Zi(c, u) {
  const s = Math.max(1, Math.floor(c.sampleRate * u)),
    o = c.createBuffer(1, s, c.sampleRate),
    m = o.getChannelData(0);
  let d = 74565;
  for (let h = 0; h < s; h++)
    ((d = (d * 1664525 + 1013904223) & 4294967295), (m[h] = d / 2147483648 - 1));
  return o;
}
function $i(c, u, s, o) {
  const m = c.createOscillator(),
    d = c.createGain();
  ((m.type = 'sine'),
    m.frequency.setValueAtTime(80, s),
    m.frequency.exponentialRampToValueAtTime(30, s + 0.12),
    d.gain.setValueAtTime(o, s),
    d.gain.exponentialRampToValueAtTime(1e-4, s + 0.18),
    m.connect(d).connect(u),
    m.start(s),
    m.stop(s + 0.22));
  const h = c.createBufferSource();
  h.buffer = Zi(c, 0.04);
  const y = c.createGain(),
    _ = c.createBiquadFilter();
  ((_.type = 'highpass'),
    (_.frequency.value = 400),
    y.gain.setValueAtTime(o * 0.3, s),
    y.gain.exponentialRampToValueAtTime(1e-4, s + 0.04),
    h.connect(_).connect(y).connect(u),
    h.start(s));
}
function l4(c, u, s, o, m) {
  const d = c.createBufferSource();
  d.buffer = Zi(c, m + 0.01);
  const h = c.createGain(),
    y = c.createBiquadFilter();
  ((y.type = 'highpass'),
    (y.frequency.value = 6e3),
    h.gain.setValueAtTime(o, s),
    h.gain.exponentialRampToValueAtTime(1e-4, s + m),
    d.connect(y).connect(h).connect(u),
    d.start(s));
}
const n4 = 100,
  Rl = 60 / n4,
  Gi = Rl * 4,
  E1 = 8,
  i4 = Gi * E1,
  c4 = 2,
  s4 = 100,
  u4 = [D('A2'), D('A2'), D('G2'), D('G2'), D('C3'), D('C3'), D('E2'), D('E2')],
  Ih = [D('A3'), D('C4'), D('E4'), D('A4'), D('G4'), D('E4'), D('C4'), D('A3')],
  Ph = [
    [D('A3'), D('C4'), D('E4')],
    [D('G3'), D('B3'), D('D4')],
    [D('C3'), D('E3'), D('G3')],
    [D('E3'), D('G3'), D('B3')],
  ];
function o4(c, u, s, o) {
  for (let m = 0; m < E1; m++) {
    const d = s + m * Gi,
      h = u4[m];
    (kt(c, u, 'sawtooth', h, d, Rl * 1.8, 0.22, 300),
      kt(c, u, 'sawtooth', h, d + Rl * 2, Rl * 1.8, 0.22, 300),
      $i(c, u, d, 0.35),
      $i(c, u, d + Rl * 2, 0.28));
    for (let y = 0; y < 8; y++) {
      const _ = (m * 8 + y) % Ih.length,
        g = d + y * Rl * 0.5;
      kt(c, u, 'square', Ih[_], g, Rl * 0.4, 0.07, 2400);
    }
  }
  for (let m = 0; m < Ph.length; m++) {
    const d = Ph[m],
      h = s + m * Gi * 2,
      y = Gi * 2;
    for (const _ of d) {
      const g = c.createOscillator(),
        b = c.createGain();
      ((g.type = 'triangle'), g.frequency.setValueAtTime(_, h));
      const T = 0.08;
      (b.gain.setValueAtTime(1e-4, h),
        b.gain.linearRampToValueAtTime(T, h + 0.15),
        b.gain.setValueAtTime(T, h + y - 0.2),
        b.gain.exponentialRampToValueAtTime(1e-4, h + y),
        g.connect(b).connect(u),
        g.start(h),
        g.stop(h + y + 0.05),
        o.push(g));
    }
  }
}
function r4(c, u) {
  let s = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + c4 * Gi;
    for (; s < y; ) (o4(c, u, s, m), (s += i4));
  }
  return {
    start() {
      ((s = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, s4)));
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
const f4 = 100,
  Aa = 60 / f4,
  Sr = Aa * 4,
  z1 = 8,
  sl = Sr * z1,
  d4 = 2,
  m4 = 100,
  e1 = [D('E5'), D('D5'), D('B4'), D('G4'), D('F#4'), D('E4'), D('D4'), D('B3')];
function t1(c, u, s, o) {
  const m = c.createBufferSource();
  m.buffer = Zi(c, 0.2);
  const d = c.createGain(),
    h = c.createBiquadFilter();
  ((h.type = 'bandpass'),
    (h.frequency.value = 900),
    (h.Q.value = 0.6),
    d.gain.setValueAtTime(o, s),
    d.gain.exponentialRampToValueAtTime(1e-4, s + 0.18),
    m.connect(h).connect(d).connect(u),
    m.start(s),
    kt(c, u, 'sine', 120, s, 0.12, o * 0.5, 300));
}
function h4(c, u, s, o) {
  {
    const d = c.createOscillator(),
      h = c.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(D('E1'), s));
    const y = 0.35;
    (h.gain.setValueAtTime(1e-4, s),
      h.gain.linearRampToValueAtTime(y, s + 0.3),
      h.gain.setValueAtTime(y, s + sl - 0.3),
      h.gain.linearRampToValueAtTime(1e-4, s + sl));
    const _ = c.createBiquadFilter();
    ((_.type = 'lowpass'),
      (_.frequency.value = 120),
      d.connect(_).connect(h).connect(u),
      d.start(s),
      d.stop(s + sl + 0.05),
      o.push(d));
  }
  for (let d = 0; d < z1; d++) {
    const h = s + d * Sr;
    for (let y = 0; y < 4; y++) {
      const _ = h + y * Aa;
      (kt(c, u, 'sawtooth', D('E2'), _, Aa * 0.9, 0.22, 400),
        kt(c, u, 'sawtooth', D('B2'), _, Aa * 0.8, 0.1, 600));
    }
    ($i(c, u, h, 0.5),
      $i(c, u, h + Aa * 2, 0.45),
      t1(c, u, h + Aa, 0.4),
      t1(c, u, h + Aa * 3, 0.38));
  }
  const m = [...a4, D('C4')];
  for (const d of m) {
    const h = c.createOscillator(),
      y = c.createGain();
    ((h.type = 'sawtooth'), h.frequency.setValueAtTime(d, s));
    const _ = 0.07;
    (y.gain.setValueAtTime(1e-4, s),
      y.gain.linearRampToValueAtTime(_, s + 0.8),
      y.gain.setValueAtTime(_, s + sl - 0.8),
      y.gain.exponentialRampToValueAtTime(1e-4, s + sl));
    const g = c.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 900),
      h.connect(g).connect(y).connect(u),
      h.start(s),
      h.stop(s + sl + 0.05),
      o.push(h));
  }
  for (let d = 0; d < e1.length; d++) {
    const h = s + d * Aa * 2;
    kt(c, u, 'sawtooth', e1[d], h, Aa * 1.6, 0.08, 2e3);
  }
  {
    const d = c.createBufferSource();
    d.buffer = Zi(c, sl + 0.1);
    const h = c.createGain(),
      y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 200),
      h.gain.setValueAtTime(0.04, s),
      d.connect(y).connect(h).connect(u),
      d.start(s),
      o.push(d));
  }
}
function v4(c, u) {
  let s = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + d4 * Sr;
    for (; s < y; ) (h4(c, u, s, m), (s += sl));
  }
  return {
    start() {
      ((s = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, m4)));
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
const y4 = 120,
  Na = 60 / y4,
  xr = Na * 4,
  M1 = 8,
  vs = xr * M1,
  _4 = 2,
  g4 = 100,
  p4 = [D('E2'), D('E2'), D('D2'), D('D2'), D('E2'), D('E2'), D('B1'), D('B1')],
  a1 = [
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
function l1(c, u, s, o) {
  const m = c.createBufferSource();
  m.buffer = Zi(c, 0.15);
  const d = c.createGain(),
    h = c.createBiquadFilter();
  ((h.type = 'bandpass'),
    (h.frequency.value = 1800),
    (h.Q.value = 0.8),
    d.gain.setValueAtTime(o, s),
    d.gain.exponentialRampToValueAtTime(1e-4, s + 0.13),
    m.connect(h).connect(d).connect(u),
    m.start(s),
    kt(c, u, 'triangle', 200, s, 0.08, o * 0.4));
}
function b4(c, u, s, o) {
  for (let d = 0; d < M1; d++) {
    const h = s + d * xr,
      y = p4[d];
    for (let _ = 0; _ < 4; _++) kt(c, u, 'sawtooth', y, h + _ * Na, Na * 0.85, 0.26, 280);
    for (let _ = 0; _ < 4; _++) $i(c, u, h + _ * Na, 0.42);
    (l1(c, u, h + Na, 0.3), l1(c, u, h + Na * 3, 0.3));
    for (let _ = 0; _ < 8; _++) l4(c, u, h + _ * Na * 0.5, 0.12, 0.08);
    for (let _ = 0; _ < 16; _++) {
      const g = (d * 16 + _) % a1.length,
        b = h + _ * Na * 0.25;
      kt(c, u, 'sawtooth', a1[g], b, Na * 0.22, 0.06, 3200);
    }
  }
  const m = [D('E3'), D('G3'), D('B3')];
  for (const d of m) {
    const h = c.createOscillator(),
      y = c.createGain();
    ((h.type = 'triangle'),
      h.frequency.setValueAtTime(d, s),
      y.gain.setValueAtTime(1e-4, s),
      y.gain.linearRampToValueAtTime(0.06, s + 0.2),
      y.gain.setValueAtTime(0.06, s + vs - 0.3),
      y.gain.exponentialRampToValueAtTime(1e-4, s + vs));
    const _ = c.createBiquadFilter();
    ((_.type = 'lowpass'),
      (_.frequency.value = 1200),
      h.connect(_).connect(y).connect(u),
      h.start(s),
      h.stop(s + vs + 0.05),
      o.push(h));
  }
}
function S4(c, u) {
  let s = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + _4 * xr;
    for (; s < y; ) (b4(c, u, s, m), (s += vs));
  }
  return {
    start() {
      ((s = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, g4)));
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
const x4 = 80,
  ys = 60 / x4,
  ps = ys * 4,
  j4 = 8,
  _s = ps * j4,
  T4 = 2,
  A4 = 100,
  n1 = [I5, t4, e4, P5],
  tr = [D('A3'), D('C4'), D('E4'), D('G4'), D('A4'), D('E4')];
function N4(c, u, s, o) {
  {
    const m = c.createOscillator(),
      d = c.createGain();
    ((m.type = 'sine'), m.frequency.setValueAtTime(D('A2'), s));
    const h = 0.28;
    (d.gain.setValueAtTime(1e-4, s),
      d.gain.linearRampToValueAtTime(h, s + 0.5),
      d.gain.setValueAtTime(h, s + _s - 0.5),
      d.gain.linearRampToValueAtTime(1e-4, s + _s));
    const y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 180),
      m.connect(y).connect(d).connect(u),
      m.start(s),
      m.stop(s + _s + 0.05),
      o.push(m));
  }
  for (let m = 0; m < n1.length; m++) {
    const d = n1[m],
      h = s + m * ps * 2,
      y = ps * 2;
    for (const _ of d) {
      const g = c.createOscillator(),
        b = c.createGain();
      ((g.type = 'triangle'), g.frequency.setValueAtTime(_, h));
      const T = 0.1,
        z = 0.4,
        C = 0.6;
      (b.gain.setValueAtTime(1e-4, h),
        b.gain.linearRampToValueAtTime(T, h + z),
        b.gain.setValueAtTime(T, h + y - C),
        b.gain.exponentialRampToValueAtTime(1e-4, h + y));
      const O = c.createDelay(0.5);
      O.delayTime.value = 0.25;
      const U = c.createGain();
      U.gain.value = 0.2;
      const H = c.createBiquadFilter();
      ((H.type = 'lowpass'),
        (H.frequency.value = 2e3),
        g.connect(b).connect(u),
        g.connect(O).connect(H).connect(U).connect(u),
        g.start(h),
        g.stop(h + y + 0.5),
        o.push(g));
    }
  }
  for (let m = 0; m < tr.length; m++) {
    const d = s + m * ys * 2;
    (kt(c, u, 'sawtooth', tr[m], d, ys * 1.5, 0.09, 1800),
      kt(c, u, 'sine', tr[m] * 0.5, d + 0.12, ys * 1.2, 0.05, 600));
  }
}
function E4(c, u) {
  let s = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + T4 * ps;
    for (; s < y; ) (N4(c, u, s, m), (s += _s));
  }
  return {
    start() {
      ((s = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, A4)));
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
function z4(c, u, s) {
  switch (c) {
    case 'title':
      return E4(u, s);
    case 'base':
      return r4(u, s);
    case 'battleNormal':
      return S4(u, s);
    case 'battleBoss':
      return v4(u, s);
  }
}
function M4(c, u) {
  const s = Math.max(1, Math.floor(c.sampleRate * u)),
    o = c.createBuffer(1, s, c.sampleRate),
    m = o.getChannelData(0);
  for (let d = 0; d < s; d++) m[d] = Math.random() * 2 - 1;
  return o;
}
function It(c, u, s, o, m) {
  const d = c.gain;
  (d.setValueAtTime(1e-4, u),
    d.linearRampToValueAtTime(s, u + o),
    d.exponentialRampToValueAtTime(1e-4, u + o + m));
}
function re(c, u, s, o, m, d, h, y, _) {
  const g = c.createOscillator(),
    b = c.createGain();
  ((g.type = s),
    g.frequency.setValueAtTime(o, m),
    _ !== void 0 && g.frequency.exponentialRampToValueAtTime(Math.max(1e-4, _), m + h + y),
    It(b, m, d, h, y),
    g.connect(b).connect(u),
    g.start(m),
    g.stop(m + h + y + 0.02));
}
function Pt(c, u, s, o, m, d) {
  const h = c.createBufferSource();
  h.buffer = M4(c, s);
  const y = c.createGain();
  if ((It(y, o, m, 0.002, s), d)) {
    const _ = c.createBiquadFilter();
    ((_.type = d.type),
      (_.frequency.value = d.frequency),
      d.q !== void 0 && (_.Q.value = d.q),
      h.connect(_).connect(y).connect(u));
  } else h.connect(y).connect(u);
  h.start(o);
}
const C4 = (c, u, s) => {
    const o = c.createOscillator(),
      m = c.createOscillator(),
      d = c.createGain();
    ((o.type = 'sawtooth'),
      (m.type = 'sawtooth'),
      o.frequency.setValueAtTime(900, s),
      o.frequency.exponentialRampToValueAtTime(1500, s + 0.5),
      m.frequency.setValueAtTime(905, s),
      m.frequency.exponentialRampToValueAtTime(1510, s + 0.5),
      It(d, s, 0.28, 0.02, 0.5),
      o.connect(d),
      m.connect(d),
      d.connect(u),
      o.start(s),
      m.start(s),
      o.stop(s + 0.55),
      m.stop(s + 0.55));
  },
  w4 = (c, u, s) => {
    for (let o = 0; o < 4; o++) {
      const m = s + o * 0.12;
      (re(c, u, 'sine', 110, m, 0.4, 0.005, 0.18, 35),
        Pt(c, u, 0.08, m, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  O4 = (c, u, s) => {
    (Pt(c, u, 0.4, s, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      re(c, u, 'triangle', 3e3, s, 0.25, 0.005, 0.15, 1500),
      re(c, u, 'sawtooth', 200, s + 0.05, 0.18, 0.005, 0.3, 80));
  },
  R4 = (c, u, s) => {
    for (let o = 0; o < 5; o++) {
      const m = s + o * 0.07,
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
        d.connect(y).connect(h).connect(u),
        d.start(m),
        d.stop(m + 0.08));
    }
  },
  D4 = (c, u, s) => {
    (Pt(c, u, 0.1, s, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      re(c, u, 'triangle', 500, s, 0.18, 0.003, 0.08, 200));
  },
  B4 = (c, u, s) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(80, s),
      o.frequency.linearRampToValueAtTime(160, s + 0.8),
      It(m, s, 0.3, 0.1, 0.7),
      o.connect(m).connect(u),
      o.start(s),
      o.stop(s + 0.85),
      re(c, u, 'square', 320, s + 0.2, 0.15, 0.02, 0.4));
  },
  L4 = (c, u, s) => {
    (Pt(c, u, 0.5, s, 0.45, { type: 'lowpass', frequency: 1200 }),
      re(c, u, 'sine', 90, s, 0.5, 0.005, 0.6, 30),
      re(c, u, 'triangle', 1200, s + 0.1, 0.2, 0.02, 0.4, 2400),
      re(c, u, 'triangle', 1600, s + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  q4 = (c, u, s) => {
    (re(c, u, 'sine', 180, s, 0.3, 0.005, 0.12, 60),
      Pt(c, u, 0.08, s, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  H4 = (c, u, s) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(220, s),
      o.frequency.exponentialRampToValueAtTime(40, s + 1.2),
      It(m, s, 0.45, 0.02, 1.2),
      o.connect(m).connect(u),
      o.start(s),
      o.stop(s + 1.3),
      Pt(c, u, 0.8, s, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  U4 = (c, u, s) => {
    (re(c, u, 'triangle', 700, s, 0.22, 0.01, 0.18),
      re(c, u, 'triangle', 1050, s + 0.12, 0.22, 0.01, 0.22));
  },
  G4 = (c, u, s) => {
    (re(c, u, 'triangle', 600, s, 0.25, 0.01, 0.2),
      re(c, u, 'triangle', 900, s + 0.12, 0.25, 0.01, 0.2),
      re(c, u, 'triangle', 1350, s + 0.24, 0.3, 0.01, 0.45),
      re(c, u, 'sine', 2400, s + 0.3, 0.15, 0.02, 0.5));
  },
  V4 = (c, u, s) => {
    (re(c, u, 'triangle', 600, s, 0.28, 0.01, 0.18),
      re(c, u, 'triangle', 750, s + 0.12, 0.28, 0.01, 0.18),
      re(c, u, 'triangle', 900, s + 0.24, 0.28, 0.01, 0.22),
      re(c, u, 'triangle', 1200, s + 0.36, 0.32, 0.01, 0.5),
      re(c, u, 'sine', 2400, s + 0.42, 0.18, 0.02, 0.6));
  },
  $4 = (c, u, s) => {
    (re(c, u, 'sawtooth', 300, s, 0.3, 0.02, 0.4, 220),
      re(c, u, 'sawtooth', 220, s + 0.35, 0.3, 0.02, 0.5, 160),
      re(c, u, 'sawtooth', 160, s + 0.8, 0.3, 0.02, 0.7, 80),
      Pt(c, u, 1, s, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  k4 = (c, u, s) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(700, s),
      o.frequency.exponentialRampToValueAtTime(400, s + 0.4),
      It(m, s, 0.22, 0.02, 0.4),
      o.connect(m).connect(u),
      o.start(s),
      o.stop(s + 0.45),
      Pt(c, u, 0.5, s, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  Y4 = (c, u, s) => {
    re(c, u, 'triangle', 1e3, s, 0.18, 0.003, 0.05);
  },
  Z4 = (c, u, s) => {
    (re(c, u, 'triangle', 880, s, 0.2, 0.005, 0.08),
      re(c, u, 'triangle', 1320, s + 0.06, 0.2, 0.005, 0.12));
  },
  X4 = (c, u, s) => {
    (re(c, u, 'square', 260, s, 0.18, 0.005, 0.07),
      re(c, u, 'square', 200, s + 0.06, 0.18, 0.005, 0.1));
  },
  Q4 = (c, u, s) => {
    re(c, u, 'triangle', 1400, s, 0.12, 0.003, 0.04);
  },
  K4 = (c, u, s) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(500, s),
      o.frequency.exponentialRampToValueAtTime(1e3, s + 0.12),
      It(m, s, 0.18, 0.01, 0.12),
      o.connect(m).connect(u),
      o.start(s),
      o.stop(s + 0.15));
  },
  J4 = (c, u, s) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(1e3, s),
      o.frequency.exponentialRampToValueAtTime(500, s + 0.1),
      It(m, s, 0.16, 0.005, 0.1),
      o.connect(m).connect(u),
      o.start(s),
      o.stop(s + 0.13));
  },
  W4 = (c, u, s) => {
    (re(c, u, 'sawtooth', 200, s, 0.3, 0.01, 0.35, 80),
      re(c, u, 'triangle', 600, s + 0.05, 0.22, 0.01, 0.3, 1200),
      re(c, u, 'triangle', 1200, s + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  F4 = (c, u, s) => {
    const o = c.createOscillator(),
      m = c.createGain(),
      d = c.createBiquadFilter();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(1600, s),
      o.frequency.exponentialRampToValueAtTime(700, s + 0.08),
      (d.type = 'highpass'),
      (d.frequency.value = 800),
      It(m, s, 0.22, 0.003, 0.09),
      o.connect(d).connect(m).connect(u),
      o.start(s),
      o.stop(s + 0.12));
  },
  I4 = (c, u, s) => {
    (re(c, u, 'sine', 130, s, 0.5, 0.01, 0.28, 40),
      Pt(c, u, 0.12, s, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  P4 = (c, u, s) => {
    (Pt(c, u, 0.18, s, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      re(c, u, 'triangle', 2200, s, 0.15, 0.002, 0.06, 1800));
  },
  ej = (c, u, s) => {
    const o = c.createOscillator(),
      m = c.createGain(),
      d = c.createBiquadFilter();
    ((o.type = 'square'),
      o.frequency.setValueAtTime(900, s),
      o.frequency.exponentialRampToValueAtTime(1400, s + 0.05),
      (d.type = 'bandpass'),
      (d.frequency.value = 1500),
      (d.Q.value = 3),
      It(m, s, 0.18, 0.002, 0.07),
      o.connect(d).connect(m).connect(u),
      o.start(s),
      o.stop(s + 0.1),
      Pt(c, u, 0.05, s, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  tj = (c, u, s) => {
    (re(c, u, 'triangle', 700, s, 0.18, 0.005, 0.05),
      re(c, u, 'triangle', 1050, s + 0.04, 0.18, 0.005, 0.06));
  },
  aj = {
    laserShoot: F4,
    cannonShoot: I4,
    thunderShoot: P4,
    cutterShoot: ej,
    weaponSwitch: tj,
    activeLaser: C4,
    activeCannon: w4,
    activeThunder: O4,
    activeCutter: R4,
    enemyKill: D4,
    bossWarn: B4,
    bossKill: L4,
    machineHit: q4,
    machineDown: H4,
    waveClear: U4,
    tierClear: G4,
    tap: Y4,
    purchaseOk: Z4,
    reject: X4,
    tabSwitch: Q4,
    dialogOpen: K4,
    dialogClose: J4,
    launch: W4,
    resultClear: V4,
    resultGameOver: $4,
    resultRetreat: k4,
  },
  lj = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function i1(c) {
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
    const u = window.AudioContext ?? window.webkitAudioContext;
    if (!u) return;
    const s = new u();
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
  play(u) {
    if (!this.ctx || !this.seGain) return;
    this.ctx.state === 'suspended' && this.ctx.resume();
    const s = performance.now(),
      o = lj[u];
    if (o !== void 0) {
      const d = this.lastPlayAt.get(u) ?? 0;
      if (s - d < o) return;
      this.lastPlayAt.set(u, s);
    }
    const m = aj[u];
    m(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(u) {
    ((this.seVolume = i1(u)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(u) {
    ((this.bgmVolume = i1(u)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
  }
  getSeVolume() {
    return this.seVolume;
  }
  getBgmVolume() {
    return this.bgmVolume;
  }
  playBgm(u) {
    var o, m;
    if (
      !this.ctx ||
      !this.bgmGain ||
      (this.ctx.state === 'suspended' && this.ctx.resume(),
      ((o = this.currentBgm) == null ? void 0 : o.id) === u)
    )
      return;
    (m = this.currentBgm) == null || m.track.stop();
    const s = z4(u, this.ctx, this.bgmGain);
    (s.start(), (this.currentBgm = { id: u, track: s }));
  }
  stopBgm() {
    var u;
    ((u = this.currentBgm) == null || u.track.stop(), (this.currentBgm = null));
  }
  getCurrentBgm() {
    var u;
    return ((u = this.currentBgm) == null ? void 0 : u.id) ?? null;
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
const ms = new nj();
function c1({ label: c, iconName: u, value: s, muted: o, onChange: m }) {
  return r.jsx(Hl, {
    variant: 'sunken',
    padding: 'md',
    children: r.jsxs('div', {
      className: [ul.sliderRow, o ? ul.muted : ''].filter(Boolean).join(' '),
      children: [
        r.jsx('span', { className: ul.sliderIcon, children: r.jsx(Ee, { name: u, size: 16 }) }),
        r.jsx(G, { variant: 'label', color: o ? 'dim' : 'mid', children: c }),
        r.jsx('div', {
          className: ul.sliderArea,
          children: r.jsx(ir, { value: s, min: 0, max: 1, step: 0.01, onChange: m, disabled: o }),
        }),
        r.jsx('span', {
          className: ul.sliderValue,
          children: r.jsx(Ll, {
            value: Math.round(s * 100),
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
  overrideSeVolume: u,
  overrideMute: s,
  onBgmChange: o,
  onSeChange: m,
  onMuteChange: d,
}) {
  const h = X((H) => H.bgmVolume),
    y = X((H) => H.seVolume),
    _ = X((H) => H.setBgmVolume),
    g = X((H) => H.setSeVolume),
    b = c ?? h,
    T = u ?? y,
    z = s ?? !1,
    C = (H) => {
      o ? o(H) : (_(H), ms.setBgmVolume(z ? 0 : H));
    },
    O = (H) => {
      m ? m(H) : (g(H), ms.setSeVolume(z ? 0 : H));
    },
    U = (H) => {
      d ? d(H) : (ms.setBgmVolume(H ? 0 : b), ms.setSeVolume(H ? 0 : T));
    };
  return r.jsxs('div', {
    className: ul.root,
    role: 'tabpanel',
    'aria-label': 'サウンド設定',
    children: [
      r.jsx(Hl, {
        variant: 'sunken',
        padding: 'md',
        children: r.jsxs('div', {
          className: ul.muteRow,
          children: [
            r.jsxs('span', {
              className: ul.muteLabelGroup,
              children: [
                r.jsx(G, { variant: 'label', color: 'mid', children: 'ミュート' }),
                r.jsx(G, { variant: 'caption', color: 'dim', children: '全サウンドを一時停止' }),
              ],
            }),
            r.jsx(yr, { checked: z, onChange: U, accent: 'primary' }),
          ],
        }),
      }),
      r.jsx(c1, { label: 'BGM', iconName: 'play', value: b, muted: z, onChange: C }),
      r.jsx(c1, { label: 'SE', iconName: 'spark', value: T, muted: z, onChange: O }),
    ],
  });
}
const sr = (c, u) => u.some((s) => c instanceof s);
let s1, u1;
function cj() {
  return s1 || (s1 = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function sj() {
  return (
    u1 ||
    (u1 = [
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
  const u = new Promise((s, o) => {
    const m = () => {
        (c.removeEventListener('success', d), c.removeEventListener('error', h));
      },
      d = () => {
        (s(Bl(c.result)), m());
      },
      h = () => {
        (o(c.error), m());
      };
    (c.addEventListener('success', d), c.addEventListener('error', h));
  });
  return (Ns.set(u, c), u);
}
function oj(c) {
  if (ur.has(c)) return;
  const u = new Promise((s, o) => {
    const m = () => {
        (c.removeEventListener('complete', d),
          c.removeEventListener('error', h),
          c.removeEventListener('abort', h));
      },
      d = () => {
        (s(), m());
      },
      h = () => {
        (o(c.error || new DOMException('AbortError', 'AbortError')), m());
      };
    (c.addEventListener('complete', d),
      c.addEventListener('error', h),
      c.addEventListener('abort', h));
  });
  ur.set(c, u);
}
let or = {
  get(c, u, s) {
    if (c instanceof IDBTransaction) {
      if (u === 'done') return ur.get(c);
      if (u === 'store')
        return s.objectStoreNames[1] ? void 0 : s.objectStore(s.objectStoreNames[0]);
    }
    return Bl(c[u]);
  },
  set(c, u, s) {
    return ((c[u] = s), !0);
  },
  has(c, u) {
    return c instanceof IDBTransaction && (u === 'done' || u === 'store') ? !0 : u in c;
  },
};
function C1(c) {
  or = c(or);
}
function rj(c) {
  return sj().includes(c)
    ? function (...u) {
        return (c.apply(rr(this), u), Bl(this.request));
      }
    : function (...u) {
        return Bl(c.apply(rr(this), u));
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
  const u = fj(c);
  return (u !== c && (ar.set(c, u), Ns.set(u, c)), u);
}
const rr = (c) => Ns.get(c);
function dj(c, u, { blocked: s, upgrade: o, blocking: m, terminated: d } = {}) {
  const h = indexedDB.open(c, u),
    y = Bl(h);
  return (
    o &&
      h.addEventListener('upgradeneeded', (_) => {
        o(Bl(h.result), _.oldVersion, _.newVersion, Bl(h.transaction), _);
      }),
    s && h.addEventListener('blocked', (_) => s(_.oldVersion, _.newVersion, _)),
    y
      .then((_) => {
        (d && _.addEventListener('close', () => d()),
          m && _.addEventListener('versionchange', (g) => m(g.oldVersion, g.newVersion, g)));
      })
      .catch(() => {}),
    y
  );
}
const mj = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  hj = ['put', 'add', 'delete', 'clear'],
  lr = new Map();
function o1(c, u) {
  if (!(c instanceof IDBDatabase && !(u in c) && typeof u == 'string')) return;
  if (lr.get(u)) return lr.get(u);
  const s = u.replace(/FromIndex$/, ''),
    o = u !== s,
    m = hj.includes(s);
  if (!(s in (o ? IDBIndex : IDBObjectStore).prototype) || !(m || mj.includes(s))) return;
  const d = async function (h, ...y) {
    const _ = this.transaction(h, m ? 'readwrite' : 'readonly');
    let g = _.store;
    return (o && (g = g.index(y.shift())), (await Promise.all([g[s](...y), m && _.done]))[0]);
  };
  return (lr.set(u, d), d);
}
C1((c) => ({
  ...c,
  get: (u, s, o) => o1(u, s) || c.get(u, s, o),
  has: (u, s) => !!o1(u, s) || c.has(u, s),
}));
const vj = ['continue', 'continuePrimaryKey', 'advance'],
  r1 = {},
  fr = new WeakMap(),
  w1 = new WeakMap(),
  yj = {
    get(c, u) {
      if (!vj.includes(u)) return c[u];
      let s = r1[u];
      return (
        s ||
          (s = r1[u] =
            function (...o) {
              fr.set(this, w1.get(this)[u](...o));
            }),
        s
      );
    },
  };
async function* _j(...c) {
  let u = this;
  if ((u instanceof IDBCursor || (u = await u.openCursor(...c)), !u)) return;
  u = u;
  const s = new Proxy(u, yj);
  for (w1.set(s, u), Ns.set(s, rr(u)); u; )
    (yield s, (u = await (fr.get(s) || u.continue())), fr.delete(s));
}
function f1(c, u) {
  return (
    (u === Symbol.asyncIterator && sr(c, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (u === 'iterate' && sr(c, [IDBIndex, IDBObjectStore]))
  );
}
C1((c) => ({
  ...c,
  get(u, s, o) {
    return f1(u, s) ? _j : c.get(u, s, o);
  },
  has(u, s) {
    return f1(u, s) || c.has(u, s);
  },
}));
const gj = {
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
function pj(c, u, s, o) {
  for (let m = s + 1; m <= o; m++) {
    const d = gj[m];
    if (!d) throw new Error(`No migration registered for version ${m}`);
    d(c, u);
  }
}
let Ui = null;
async function d1() {
  return (
    Ui ||
    ((Ui = await dj(v1, gs, {
      upgrade(c, u, s, o) {
        try {
          pj(c, o, u, s ?? gs);
        } catch (m) {
          throw (console.error('[DB] Migration failed:', m), m);
        }
      },
    })),
    await bj(Ui),
    Ui)
  );
}
async function bj(c) {
  const u = c.transaction([Q.profile, Q.currencies, Q.machine, Q.weapons, Q.settings], 'readwrite'),
    [s, o, m, d] = await Promise.all([
      u.objectStore(Q.profile).get('singleton'),
      u.objectStore(Q.currencies).get('singleton'),
      u.objectStore(Q.weapons).get('singleton'),
      u.objectStore(Q.settings).get('singleton'),
    ]),
    h = Date.now(),
    y = [];
  (s || y.push(u.objectStore(Q.profile).put({ ...mg, createdAt: h, lastPlayedAt: h })),
    o || y.push(u.objectStore(Q.currencies).put(hg)),
    m || y.push(u.objectStore(Q.weapons).put(vg)),
    d || y.push(u.objectStore(Q.settings).put(yg)));
  const _ = u.objectStore(Q.machine),
    g = await _.getAllKeys(),
    b = new Set(g);
  for (const T of y1) b.has(T) || y.push(_.put({ key: T, lv: 0 }));
  (await Promise.all(y), await u.done);
}
async function Sj(c) {
  const u = c.transaction(
      [Q.profile, Q.currencies, Q.machine, Q.weapons, Q.patches, Q.equippedPatches, Q.settings],
      'readonly'
    ),
    [s, o, m, d, h, y, _] = await Promise.all([
      u.objectStore(Q.profile).get('singleton'),
      u.objectStore(Q.currencies).get('singleton'),
      u.objectStore(Q.machine).getAll(),
      u.objectStore(Q.weapons).get('singleton'),
      u.objectStore(Q.patches).getAll(),
      u.objectStore(Q.equippedPatches).getAll(),
      u.objectStore(Q.settings).get('singleton'),
    ]);
  if ((await u.done, !s || !o || !d || !_))
    throw new Error(
      '[DB] loadSaveState: Required singleton record is missing. Run openDatabase() first.'
    );
  return {
    profile: s,
    currencies: o,
    machine: m,
    weapons: d,
    patches: h,
    equippedPatches: y,
    settings: _,
  };
}
const O1 = 'tower-like-game:import-backups',
  xj = 3;
function jj() {
  try {
    const c = localStorage.getItem(O1);
    return c ? JSON.parse(c) : [];
  } catch {
    return [];
  }
}
function Tj(c) {
  try {
    localStorage.setItem(O1, JSON.stringify(c));
  } catch (u) {
    console.warn('[DB] Failed to save backup to localStorage:', u);
  }
}
function Aj(c) {
  const u = jj();
  u.unshift({ savedAt: Date.now(), data: c });
  const s = u.slice(0, xj);
  Tj(s);
}
async function R1(c) {
  const u = await Sj(c);
  return { formatVersion: 1, dbVersion: gs, exportedAt: Date.now(), data: u };
}
async function Nj(c, u) {
  if (u.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${u.formatVersion}`);
  try {
    const d = await R1(c);
    Aj(d);
  } catch (d) {
    console.warn('[DB] Pre-import backup failed (proceeding anyway):', d);
  }
  const { data: s } = u,
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
    o.objectStore(Q.profile).put(s.profile),
    o.objectStore(Q.currencies).put(s.currencies),
    o.objectStore(Q.weapons).put(s.weapons),
    o.objectStore(Q.settings).put(s.settings),
    ...s.machine.map((d) => o.objectStore(Q.machine).put(d)),
    ...s.patches.map((d) => o.objectStore(Q.patches).put(d)),
    ...s.equippedPatches.map((d) => o.objectStore(Q.equippedPatches).put(d)),
  ];
  (await Promise.all(m), await o.done);
}
const Ej = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function zj() {
  const { navigate: c } = ol(),
    [u, s] = de.useState('sound'),
    o = async () => {
      const h = await d1(),
        y = await R1(h),
        _ = JSON.stringify(y, null, 2),
        g = new Blob([_], { type: 'application/json' }),
        b = URL.createObjectURL(g),
        T = document.createElement('a');
      ((T.href = b),
        (T.download = `neon-spire-save-${new Date().toISOString().slice(0, 10)}.json`),
        T.click(),
        URL.revokeObjectURL(b));
    },
    m = async (h) => {
      const y = await h.text(),
        _ = JSON.parse(y),
        g = await d1();
      (await Nj(g, _), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(v1), window.location.reload());
    };
  return r.jsx(ql, {
    header: r.jsx(Yi, {
      title: '設定',
      onBack: () => c('title'),
      currencies: [],
      tabBar: r.jsx(bs, { tabs: Ej, value: u, onChange: s, fullWidth: !0 }),
    }),
    footer: r.jsx(ki, { active: 'settings', onChange: c }),
    children: r.jsxs('div', {
      className: p5.content,
      children: [
        u === 'sound' && r.jsx(ij, {}),
        u === 'game' && r.jsx(V5, {}),
        u === 'data' && r.jsx(D5, { onExport: o, onImport: m, onReset: d }),
      ],
    }),
  });
}
const Mj = '_layout_1c9in_1',
  Cj = '_heroWrap_1c9in_12',
  m1 = { layout: Mj, heroWrap: Cj },
  wj = '_root_5udm7_1',
  Oj = { root: wj };
function Rj({ onResume: c, onNewGame: u, lastSavedAt: s }) {
  const m = X((d) => d.createdAt) > 0;
  return r.jsxs('div', {
    className: Oj.root,
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
        s != null &&
        r.jsx(G, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
          children: '最終セーブ: ' + s,
        }),
      r.jsx(Ct, {
        label: '新規開始',
        variant: m ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: r.jsx(Ee, { name: 'plus', size: 18 }),
        onClick: u,
      }),
    ],
  });
}
const Dj = '_root_qkflo_2',
  Bj = '_title_qkflo_12',
  h1 = { root: Dj, title: Bj };
function Lj({ title: c = 'NEON SPIRE', subtitle: u, version: s, tagline: o }) {
  return r.jsxs('header', {
    className: h1.root,
    role: 'banner',
    children: [
      r.jsx('h1', { className: h1.title, children: c }),
      u != null &&
        r.jsx(G, {
          variant: 'label',
          color: 'mid',
          align: 'center',
          style: { fontSize: 11, letterSpacing: '0.24em' },
          children: u,
        }),
      o != null &&
        r.jsx(G, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { marginTop: 4, fontSize: 11 },
          children: o,
        }),
      s != null &&
        r.jsx(G, {
          variant: 'numeric-s',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10, marginTop: 6, opacity: 0.7 },
          children: s,
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
function kj({ size: c = 180, iconName: u = 'tower' }) {
  return r.jsxs('div', {
    className: Dn.root,
    style: { width: c, height: c },
    role: 'presentation',
    'aria-hidden': 'true',
    children: [
      r.jsx('div', { className: Dn.ringOuter }),
      r.jsx('div', { className: Dn.ringMiddle }),
      r.jsx('div', { className: Dn.glowDisc }),
      [0, 90, 180, 270].map((s) =>
        r.jsx(
          'div',
          {
            className: Dn.cornerAccent,
            style: { transform: `rotate(${s}deg) translate(${c / 2 - 5}px) rotate(45deg)` },
          },
          s
        )
      ),
      r.jsx('span', {
        className: Dn.icon,
        children: r.jsx(Ee, { name: u, size: Math.round(c * 0.49) }),
      }),
    ],
  });
}
function Yj(c) {
  if (c < 0) return '今';
  const u = Math.floor(c / 1e3);
  if (u < 60) return '今';
  const s = Math.floor(u / 60);
  if (s < 60) return `${s} 分前`;
  const o = Math.floor(s / 60);
  return o < 24 ? `${o} 時間前` : `${Math.floor(o / 24)} 日前`;
}
function Zj() {
  const { navigate: c } = ol(),
    u = X((o) => o.createdAt),
    s = de.useMemo(() => (u > 0 ? Yj(Date.now() - u) : void 0), [u]);
  return r.jsx(ql, {
    children: r.jsxs('div', {
      className: m1.layout,
      children: [
        r.jsx(Lj, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.1.0',
        }),
        r.jsx('div', { className: m1.heroWrap, children: r.jsx(kj, {}) }),
        r.jsx(Rj, {
          lastSavedAt: s,
          onResume: () => c('preparation'),
          onNewGame: () => c('preparation'),
        }),
      ],
    }),
  });
}
function Xj() {
  const { screen: c } = ol();
  switch (c) {
    case 'title':
      return r.jsx(Zj, {});
    case 'preparation':
      return r.jsx(_5, {});
    case 'machine':
      return r.jsx(Ox, {});
    case 'armory':
      return r.jsx(Hp, {});
    case 'patches':
      return r.jsx(U3, {});
    case 'settings':
      return r.jsx(zj, {});
    case 'battle':
      return r.jsx(Nx, {});
    default:
      return r.jsx(Rx, {});
  }
}
const D1 = document.getElementById('root');
if (!D1) throw new Error('Failed to find #root element');
vy.createRoot(D1).render(r.jsx(Lp, { children: r.jsx(Xj, {}) }));
