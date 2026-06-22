var ey = Object.defineProperty;
var ty = (c, u, s) =>
  u in c ? ey(c, u, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (c[u] = s);
var Kt = (c, u, s) => ty(c, typeof u != 'symbol' ? u + '' : u, s);
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
function ay(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var $o = { exports: {} },
  Ei = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bh;
function ly() {
  if (bh) return Ei;
  bh = 1;
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
  return ((Ei.Fragment = u), (Ei.jsx = s), (Ei.jsxs = s), Ei);
}
var Sh;
function ny() {
  return (Sh || ((Sh = 1), ($o.exports = ly())), $o.exports);
}
var r = ny(),
  Yo = { exports: {} },
  Mi = {},
  ko = { exports: {} },
  Zo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xh;
function iy() {
  return (
    xh ||
      ((xh = 1),
      (function (c) {
        function u(R, V) {
          var W = R.length;
          R.push(V);
          e: for (; 0 < W; ) {
            var _e = (W - 1) >>> 1,
              be = R[_e];
            if (0 < m(be, V)) ((R[_e] = V), (R[W] = be), (W = _e));
            else break e;
          }
        }
        function s(R) {
          return R.length === 0 ? null : R[0];
        }
        function o(R) {
          if (R.length === 0) return null;
          var V = R[0],
            W = R.pop();
          if (W !== V) {
            R[0] = W;
            e: for (var _e = 0, be = R.length, x = be >>> 1; _e < x; ) {
              var H = 2 * (_e + 1) - 1,
                $ = R[H],
                k = H + 1,
                P = R[k];
              if (0 > m($, W))
                k < be && 0 > m(P, $)
                  ? ((R[_e] = P), (R[k] = W), (_e = k))
                  : ((R[_e] = $), (R[H] = W), (_e = H));
              else if (k < be && 0 > m(P, W)) ((R[_e] = P), (R[k] = W), (_e = k));
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
          q = !1,
          F = typeof setTimeout == 'function' ? setTimeout : null,
          ae = typeof clearTimeout == 'function' ? clearTimeout : null,
          re = typeof setImmediate < 'u' ? setImmediate : null;
        function we(R) {
          for (var V = s(p); V !== null; ) {
            if (V.callback === null) o(p);
            else if (V.startTime <= R) (o(p), (V.sortIndex = V.expirationTime), u(g, V));
            else break;
            V = s(p);
          }
        }
        function Xe(R) {
          if (((U = !1), we(R), !O))
            if (s(g) !== null) ((O = !0), ce || ((ce = !0), Ke()));
            else {
              var V = s(p);
              V !== null && ct(Xe, V.startTime - R);
            }
        }
        var ce = !1,
          I = -1,
          Ue = 5,
          it = -1;
        function Qe() {
          return q ? !0 : !(c.unstable_now() - it < Ue);
        }
        function Re() {
          if (((q = !1), ce)) {
            var R = c.unstable_now();
            it = R;
            var V = !0;
            try {
              e: {
                ((O = !1), U && ((U = !1), ae(I), (I = -1)), (C = !0));
                var W = E;
                try {
                  t: {
                    for (we(R), T = s(g); T !== null && !(T.expirationTime > R && Qe()); ) {
                      var _e = T.callback;
                      if (typeof _e == 'function') {
                        ((T.callback = null), (E = T.priorityLevel));
                        var be = _e(T.expirationTime <= R);
                        if (((R = c.unstable_now()), typeof be == 'function')) {
                          ((T.callback = be), we(R), (V = !0));
                          break t;
                        }
                        (T === s(g) && o(g), we(R));
                      } else o(g);
                      T = s(g);
                    }
                    if (T !== null) V = !0;
                    else {
                      var x = s(p);
                      (x !== null && ct(Xe, x.startTime - R), (V = !1));
                    }
                  }
                  break e;
                } finally {
                  ((T = null), (E = W), (C = !1));
                }
                V = void 0;
              }
            } finally {
              V ? Ke() : (ce = !1);
            }
          }
        }
        var Ke;
        if (typeof re == 'function')
          Ke = function () {
            re(Re);
          };
        else if (typeof MessageChannel < 'u') {
          var kt = new MessageChannel(),
            wt = kt.port2;
          ((kt.port1.onmessage = Re),
            (Ke = function () {
              wt.postMessage(null);
            }));
        } else
          Ke = function () {
            F(Re, 0);
          };
        function ct(R, V) {
          I = F(function () {
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
              : (Ue = 0 < R ? Math.floor(1e3 / R) : 5);
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
            q = !0;
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
            var _e = c.unstable_now();
            switch (
              (typeof W == 'object' && W !== null
                ? ((W = W.delay), (W = typeof W == 'number' && 0 < W ? _e + W : _e))
                : (W = _e),
              R)
            ) {
              case 1:
                var be = -1;
                break;
              case 2:
                be = 250;
                break;
              case 5:
                be = 1073741823;
                break;
              case 4:
                be = 1e4;
                break;
              default:
                be = 5e3;
            }
            return (
              (be = W + be),
              (R = {
                id: b++,
                callback: V,
                priorityLevel: R,
                startTime: W,
                expirationTime: be,
                sortIndex: -1,
              }),
              W > _e
                ? ((R.sortIndex = W),
                  u(p, R),
                  s(g) === null && R === s(p) && (U ? (ae(I), (I = -1)) : (U = !0), ct(Xe, W - _e)))
                : ((R.sortIndex = be), u(g, R), O || C || ((O = !0), ce || ((ce = !0), Ke()))),
              R
            );
          }),
          (c.unstable_shouldYield = Qe),
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
      })(Zo)),
    Zo
  );
}
var jh;
function cy() {
  return (jh || ((jh = 1), (ko.exports = iy())), ko.exports);
}
var Xo = { exports: {} },
  te = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Th;
function sy() {
  if (Th) return te;
  Th = 1;
  var c = Symbol.for('react.transitional.element'),
    u = Symbol.for('react.portal'),
    s = Symbol.for('react.fragment'),
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
    q = {};
  function F(x, H, $) {
    ((this.props = x), (this.context = H), (this.refs = q), (this.updater = $ || O));
  }
  ((F.prototype.isReactComponent = {}),
    (F.prototype.setState = function (x, H) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, H, 'setState');
    }),
    (F.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function ae() {}
  ae.prototype = F.prototype;
  function re(x, H, $) {
    ((this.props = x), (this.context = H), (this.refs = q), (this.updater = $ || O));
  }
  var we = (re.prototype = new ae());
  ((we.constructor = re), U(we, F.prototype), (we.isPureReactComponent = !0));
  var Xe = Array.isArray;
  function ce() {}
  var I = { H: null, A: null, T: null, S: null },
    Ue = Object.prototype.hasOwnProperty;
  function it(x, H, $) {
    var k = $.ref;
    return { $$typeof: c, type: x, key: H, ref: k !== void 0 ? k : null, props: $ };
  }
  function Qe(x, H) {
    return it(x.type, H, x.props);
  }
  function Re(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === c;
  }
  function Ke(x) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function ($) {
        return H[$];
      })
    );
  }
  var kt = /\/+/g;
  function wt(x, H) {
    return typeof x == 'object' && x !== null && x.key != null ? Ke('' + x.key) : H.toString(36);
  }
  function ct(x) {
    switch (x.status) {
      case 'fulfilled':
        return x.value;
      case 'rejected':
        throw x.reason;
      default:
        switch (
          (typeof x.status == 'string'
            ? x.then(ce, ce)
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
  function R(x, H, $, k, P) {
    var ie = typeof x;
    (ie === 'undefined' || ie === 'boolean') && (x = null);
    var ve = !1;
    if (x === null) ve = !0;
    else
      switch (ie) {
        case 'bigint':
        case 'string':
        case 'number':
          ve = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case c:
            case u:
              ve = !0;
              break;
            case b:
              return ((ve = x._init), R(ve(x._payload), H, $, k, P));
          }
      }
    if (ve)
      return (
        (P = P(x)),
        (ve = k === '' ? '.' + wt(x, 0) : k),
        Xe(P)
          ? (($ = ''),
            ve != null && ($ = ve.replace(kt, '$&/') + '/'),
            R(P, H, $, '', function (ol) {
              return ol;
            }))
          : P != null &&
            (Re(P) &&
              (P = Qe(
                P,
                $ +
                  (P.key == null || (x && x.key === P.key)
                    ? ''
                    : ('' + P.key).replace(kt, '$&/') + '/') +
                  ve
              )),
            H.push(P)),
        1
      );
    ve = 0;
    var Ie = k === '' ? '.' : k + ':';
    if (Xe(x))
      for (var De = 0; De < x.length; De++)
        ((k = x[De]), (ie = Ie + wt(k, De)), (ve += R(k, H, $, ie, P)));
    else if (((De = C(x)), typeof De == 'function'))
      for (x = De.call(x), De = 0; !(k = x.next()).done; )
        ((k = k.value), (ie = Ie + wt(k, De++)), (ve += R(k, H, $, ie, P)));
    else if (ie === 'object') {
      if (typeof x.then == 'function') return R(ct(x), H, $, k, P);
      throw (
        (H = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return ve;
  }
  function V(x, H, $) {
    if (x == null) return x;
    var k = [],
      P = 0;
    return (
      R(x, k, '', '', function (ie) {
        return H.call($, ie, P++);
      }),
      k
    );
  }
  function W(x) {
    if (x._status === -1) {
      var H = x._result;
      ((H = H()),
        H.then(
          function ($) {
            (x._status === 0 || x._status === -1) && ((x._status = 1), (x._result = $));
          },
          function ($) {
            (x._status === 0 || x._status === -1) && ((x._status = 2), (x._result = $));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = H)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var _e =
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
    be = {
      map: V,
      forEach: function (x, H, $) {
        V(
          x,
          function () {
            H.apply(this, arguments);
          },
          $
        );
      },
      count: function (x) {
        var H = 0;
        return (
          V(x, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (x) {
        return (
          V(x, function (H) {
            return H;
          }) || []
        );
      },
      only: function (x) {
        if (!Re(x))
          throw Error('React.Children.only expected to receive a single React element child.');
        return x;
      },
    };
  return (
    (te.Activity = T),
    (te.Children = be),
    (te.Component = F),
    (te.Fragment = s),
    (te.Profiler = m),
    (te.PureComponent = re),
    (te.StrictMode = o),
    (te.Suspense = g),
    (te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I),
    (te.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return I.H.useMemoCache(x);
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
    (te.cloneElement = function (x, H, $) {
      if (x == null) throw Error('The argument must be a React element, but you passed ' + x + '.');
      var k = U({}, x.props),
        P = x.key;
      if (H != null)
        for (ie in (H.key !== void 0 && (P = '' + H.key), H))
          !Ue.call(H, ie) ||
            ie === 'key' ||
            ie === '__self' ||
            ie === '__source' ||
            (ie === 'ref' && H.ref === void 0) ||
            (k[ie] = H[ie]);
      var ie = arguments.length - 2;
      if (ie === 1) k.children = $;
      else if (1 < ie) {
        for (var ve = Array(ie), Ie = 0; Ie < ie; Ie++) ve[Ie] = arguments[Ie + 2];
        k.children = ve;
      }
      return it(x.type, P, k);
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
    (te.createElement = function (x, H, $) {
      var k,
        P = {},
        ie = null;
      if (H != null)
        for (k in (H.key !== void 0 && (ie = '' + H.key), H))
          Ue.call(H, k) && k !== 'key' && k !== '__self' && k !== '__source' && (P[k] = H[k]);
      var ve = arguments.length - 2;
      if (ve === 1) P.children = $;
      else if (1 < ve) {
        for (var Ie = Array(ve), De = 0; De < ve; De++) Ie[De] = arguments[De + 2];
        P.children = Ie;
      }
      if (x && x.defaultProps)
        for (k in ((ve = x.defaultProps), ve)) P[k] === void 0 && (P[k] = ve[k]);
      return it(x, ie, P);
    }),
    (te.createRef = function () {
      return { current: null };
    }),
    (te.forwardRef = function (x) {
      return { $$typeof: y, render: x };
    }),
    (te.isValidElement = Re),
    (te.lazy = function (x) {
      return { $$typeof: b, _payload: { _status: -1, _result: x }, _init: W };
    }),
    (te.memo = function (x, H) {
      return { $$typeof: p, type: x, compare: H === void 0 ? null : H };
    }),
    (te.startTransition = function (x) {
      var H = I.T,
        $ = {};
      I.T = $;
      try {
        var k = x(),
          P = I.S;
        (P !== null && P($, k),
          typeof k == 'object' && k !== null && typeof k.then == 'function' && k.then(ce, _e));
      } catch (ie) {
        _e(ie);
      } finally {
        (H !== null && $.types !== null && (H.types = $.types), (I.T = H));
      }
    }),
    (te.unstable_useCacheRefresh = function () {
      return I.H.useCacheRefresh();
    }),
    (te.use = function (x) {
      return I.H.use(x);
    }),
    (te.useActionState = function (x, H, $) {
      return I.H.useActionState(x, H, $);
    }),
    (te.useCallback = function (x, H) {
      return I.H.useCallback(x, H);
    }),
    (te.useContext = function (x) {
      return I.H.useContext(x);
    }),
    (te.useDebugValue = function () {}),
    (te.useDeferredValue = function (x, H) {
      return I.H.useDeferredValue(x, H);
    }),
    (te.useEffect = function (x, H) {
      return I.H.useEffect(x, H);
    }),
    (te.useEffectEvent = function (x) {
      return I.H.useEffectEvent(x);
    }),
    (te.useId = function () {
      return I.H.useId();
    }),
    (te.useImperativeHandle = function (x, H, $) {
      return I.H.useImperativeHandle(x, H, $);
    }),
    (te.useInsertionEffect = function (x, H) {
      return I.H.useInsertionEffect(x, H);
    }),
    (te.useLayoutEffect = function (x, H) {
      return I.H.useLayoutEffect(x, H);
    }),
    (te.useMemo = function (x, H) {
      return I.H.useMemo(x, H);
    }),
    (te.useOptimistic = function (x, H) {
      return I.H.useOptimistic(x, H);
    }),
    (te.useReducer = function (x, H, $) {
      return I.H.useReducer(x, H, $);
    }),
    (te.useRef = function (x) {
      return I.H.useRef(x);
    }),
    (te.useState = function (x) {
      return I.H.useState(x);
    }),
    (te.useSyncExternalStore = function (x, H, $) {
      return I.H.useSyncExternalStore(x, H, $);
    }),
    (te.useTransition = function () {
      return I.H.useTransition();
    }),
    (te.version = '19.2.5'),
    te
  );
}
var Ah;
function rr() {
  return (Ah || ((Ah = 1), (Xo.exports = sy())), Xo.exports);
}
var Qo = { exports: {} },
  st = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nh;
function uy() {
  if (Nh) return st;
  Nh = 1;
  var c = rr();
  function u(g) {
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
    (st.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (st.createPortal = function (g, p) {
      var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)) throw Error(u(299));
      return d(g, p, null, b);
    }),
    (st.flushSync = function (g) {
      var p = h.T,
        b = o.p;
      try {
        if (((h.T = null), (o.p = 2), g)) return g();
      } finally {
        ((h.T = p), (o.p = b), o.d.f());
      }
    }),
    (st.preconnect = function (g, p) {
      typeof g == 'string' &&
        (p
          ? ((p = p.crossOrigin),
            (p = typeof p == 'string' ? (p === 'use-credentials' ? p : '') : void 0))
          : (p = null),
        o.d.C(g, p));
    }),
    (st.prefetchDNS = function (g) {
      typeof g == 'string' && o.d.D(g);
    }),
    (st.preinit = function (g, p) {
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
    (st.preinitModule = function (g, p) {
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
    (st.preload = function (g, p) {
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
    (st.preloadModule = function (g, p) {
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
    (st.requestFormReset = function (g) {
      o.d.r(g);
    }),
    (st.unstable_batchedUpdates = function (g, p) {
      return g(p);
    }),
    (st.useFormState = function (g, p, b) {
      return h.H.useFormState(g, p, b);
    }),
    (st.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (st.version = '19.2.5'),
    st
  );
}
var zh;
function oy() {
  if (zh) return Qo.exports;
  zh = 1;
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
  return (c(), (Qo.exports = uy()), Qo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eh;
function ry() {
  if (Eh) return Mi;
  Eh = 1;
  var c = cy(),
    u = rr(),
    s = oy();
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
    q = Symbol.for('react.strict_mode'),
    F = Symbol.for('react.profiler'),
    ae = Symbol.for('react.consumer'),
    re = Symbol.for('react.context'),
    we = Symbol.for('react.forward_ref'),
    Xe = Symbol.for('react.suspense'),
    ce = Symbol.for('react.suspense_list'),
    I = Symbol.for('react.memo'),
    Ue = Symbol.for('react.lazy'),
    it = Symbol.for('react.activity'),
    Qe = Symbol.for('react.memo_cache_sentinel'),
    Re = Symbol.iterator;
  function Ke(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Re && e[Re]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var kt = Symbol.for('react.client.reference');
  function wt(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === kt ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case U:
        return 'Fragment';
      case F:
        return 'Profiler';
      case q:
        return 'StrictMode';
      case Xe:
        return 'Suspense';
      case ce:
        return 'SuspenseList';
      case it:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case O:
          return 'Portal';
        case re:
          return e.displayName || 'Context';
        case ae:
          return (e._context.displayName || 'Context') + '.Consumer';
        case we:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case I:
          return ((t = e.displayName || null), t !== null ? t : wt(e.type) || 'Memo');
        case Ue:
          ((t = e._payload), (e = e._init));
          try {
            return wt(e(t));
          } catch {}
      }
    return null;
  }
  var ct = Array.isArray,
    R = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    V = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    W = { pending: !1, data: null, method: null, action: null },
    _e = [],
    be = -1;
  function x(e) {
    return { current: e };
  }
  function H(e) {
    0 > be || ((e.current = _e[be]), (_e[be] = null), be--);
  }
  function $(e, t) {
    (be++, (_e[be] = e.current), (e.current = t));
  }
  var k = x(null),
    P = x(null),
    ie = x(null),
    ve = x(null);
  function Ie(e, t) {
    switch (($(ie, t), $(P, e), $(k, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Ym(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Ym(t)), (e = km(t, e)));
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
    (H(k), $(k, e));
  }
  function De() {
    (H(k), H(P), H(ie));
  }
  function ol(e) {
    e.memoizedState !== null && $(ve, e);
    var t = k.current,
      a = km(t, e.type);
    t !== a && ($(P, e), $(k, a));
  }
  function Hl(e) {
    (P.current === e && (H(k), H(P)), ve.current === e && (H(ve), (Ti._currentValue = W)));
  }
  var ql, As;
  function za(e) {
    if (ql === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((ql = (t && t[1]) || ''),
          (As =
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
      ql +
      e +
      As
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
  function w1(e, t) {
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
  function _r(e) {
    try {
      var t = '',
        a = null;
      do ((t += w1(e, a)), (a = e), (e = e.return));
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
  var Ns = Object.prototype.hasOwnProperty,
    zs = c.unstable_scheduleCallback,
    Es = c.unstable_cancelCallback,
    O1 = c.unstable_shouldYield,
    R1 = c.unstable_requestPaint,
    _t = c.unstable_now,
    D1 = c.unstable_getCurrentPriorityLevel,
    br = c.unstable_ImmediatePriority,
    Sr = c.unstable_UserBlockingPriority,
    Zi = c.unstable_NormalPriority,
    B1 = c.unstable_LowPriority,
    xr = c.unstable_IdlePriority,
    L1 = c.log,
    H1 = c.unstable_setDisableYieldValue,
    Ln = null,
    bt = null;
  function Ea(e) {
    if ((typeof L1 == 'function' && H1(e), bt && typeof bt.setStrictMode == 'function'))
      try {
        bt.setStrictMode(Ln, e);
      } catch {}
  }
  var St = Math.clz32 ? Math.clz32 : G1,
    q1 = Math.log,
    U1 = Math.LN2;
  function G1(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((q1(e) / U1) | 0)) | 0);
  }
  var Xi = 256,
    Qi = 262144,
    Ki = 4194304;
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
  function V1(e, t) {
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
  function jr() {
    var e = Ki;
    return ((Ki <<= 1), (Ki & 62914560) === 0 && (Ki = 4194304), e);
  }
  function Ms(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function qn(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function $1(e, t, a, l, n, i) {
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
      var w = 31 - St(a),
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
    (l !== 0 && Tr(e, l, 0),
      i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(f & ~t)));
  }
  function Tr(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var l = 31 - St(t);
    ((e.entangledLanes |= t),
      (e.entanglements[l] = e.entanglements[l] | 1073741824 | (a & 261930)));
  }
  function Ar(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var l = 31 - St(a),
        n = 1 << l;
      ((n & t) | (e[l] & t) && (e[l] |= t), (a &= ~n));
    }
  }
  function Nr(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : Cs(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function Cs(e) {
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
  function ws(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function zr() {
    var e = V.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : mh(e.type));
  }
  function Er(e, t) {
    var a = V.p;
    try {
      return ((V.p = e), t());
    } finally {
      V.p = a;
    }
  }
  var Ma = Math.random().toString(36).slice(2),
    Pe = '__reactFiber$' + Ma,
    ft = '__reactProps$' + Ma,
    Gl = '__reactContainer$' + Ma,
    Os = '__reactEvents$' + Ma,
    Y1 = '__reactListeners$' + Ma,
    k1 = '__reactHandles$' + Ma,
    Mr = '__reactResources$' + Ma,
    Un = '__reactMarker$' + Ma;
  function Rs(e) {
    (delete e[Pe], delete e[ft], delete e[Os], delete e[Y1], delete e[k1]);
  }
  function Vl(e) {
    var t = e[Pe];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Gl] || a[Pe])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = Fm(e); e !== null; ) {
            if ((a = e[Pe])) return a;
            e = Fm(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function $l(e) {
    if ((e = e[Pe] || e[Gl])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Gn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Yl(e) {
    var t = e[Mr];
    return (t || (t = e[Mr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function Je(e) {
    e[Un] = !0;
  }
  var Cr = new Set(),
    wr = {};
  function fl(e, t) {
    (kl(e, t), kl(e + 'Capture', t));
  }
  function kl(e, t) {
    for (wr[e] = t, e = 0; e < t.length; e++) Cr.add(t[e]);
  }
  var Z1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Or = {},
    Rr = {};
  function X1(e) {
    return Ns.call(Rr, e)
      ? !0
      : Ns.call(Or, e)
        ? !1
        : Z1.test(e)
          ? (Rr[e] = !0)
          : ((Or[e] = !0), !1);
  }
  function Wi(e, t, a) {
    if (X1(t))
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
  function Dr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function Q1(e, t, a) {
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
  function Ds(e) {
    if (!e._valueTracker) {
      var t = Dr(e) ? 'checked' : 'value';
      e._valueTracker = Q1(e, t, '' + e[t]);
    }
  }
  function Br(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      l = '';
    return (
      e && (l = Dr(e) ? (e.checked ? 'true' : 'false') : e.value),
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
  var K1 = /[\n"\\]/g;
  function Rt(e) {
    return e.replace(K1, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Bs(e, t, a, l, n, i, f, v) {
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
        ? Ls(e, f, Ot(t))
        : a != null
          ? Ls(e, f, Ot(a))
          : l != null && e.removeAttribute('value'),
      n == null && i != null && (e.defaultChecked = !!i),
      n != null && (e.checked = n && typeof n != 'function' && typeof n != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (e.name = '' + Ot(v))
        : e.removeAttribute('name'));
  }
  function Lr(e, t, a, l, n, i, f, v) {
    if (
      (i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (e.type = i),
      t != null || a != null)
    ) {
      if (!((i !== 'submit' && i !== 'reset') || t != null)) {
        Ds(e);
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
      Ds(e));
  }
  function Ls(e, t, a) {
    (t === 'number' && Ii(e.ownerDocument) === e) ||
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
  function Hr(e, t, a) {
    if (t != null && ((t = '' + Ot(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + Ot(a) : '';
  }
  function qr(e, t, a, l) {
    if (t == null) {
      if (l != null) {
        if (a != null) throw Error(o(92));
        if (ct(l)) {
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
      Ds(e));
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
  var J1 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Ur(e, t, a) {
    var l = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? l
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : l
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || J1.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function Gr(e, t, a) {
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
      for (var n in t) ((l = t[n]), t.hasOwnProperty(n) && a[n] !== l && Ur(e, n, l));
    } else for (var i in t) t.hasOwnProperty(i) && Ur(e, i, t[i]);
  }
  function Hs(e) {
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
  var W1 = new Map([
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
    F1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Pi(e) {
    return F1.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function ca() {}
  var qs = null;
  function Us(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Ql = null,
    Kl = null;
  function Vr(e) {
    var t = $l(e);
    if (t && (e = t.stateNode)) {
      var a = e[ft] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (Bs(
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
                Bs(
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
            for (t = 0; t < a.length; t++) ((l = a[t]), l.form === e.form && Br(l));
          }
          break e;
        case 'textarea':
          Hr(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && Zl(e, !!a.multiple, t, !1));
      }
    }
  }
  var Gs = !1;
  function $r(e, t, a) {
    if (Gs) return e(t, a);
    Gs = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (
        ((Gs = !1),
        (Ql !== null || Kl !== null) &&
          (Gc(), Ql && ((t = Ql), (e = Kl), (Kl = Ql = null), Vr(t), e)))
      )
        for (t = 0; t < e.length; t++) Vr(e[t]);
    }
  }
  function Vn(e, t) {
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
    Vs = !1;
  if (sa)
    try {
      var $n = {};
      (Object.defineProperty($n, 'passive', {
        get: function () {
          Vs = !0;
        },
      }),
        window.addEventListener('test', $n, $n),
        window.removeEventListener('test', $n, $n));
    } catch {
      Vs = !1;
    }
  var Ca = null,
    $s = null,
    ec = null;
  function Yr() {
    if (ec) return ec;
    var e,
      t = $s,
      a = t.length,
      l,
      n = 'value' in Ca ? Ca.value : Ca.textContent,
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
  function kr() {
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
          : kr),
        (this.isPropagationStopped = kr),
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
    lc = dt(dl),
    Yn = T({}, dl, { view: 0, detail: 0 }),
    I1 = dt(Yn),
    Ys,
    ks,
    kn,
    nc = T({}, Yn, {
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
      getModifierState: Xs,
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
          : (e !== kn &&
              (kn && e.type === 'mousemove'
                ? ((Ys = e.screenX - kn.screenX), (ks = e.screenY - kn.screenY))
                : (ks = Ys = 0),
              (kn = e)),
            Ys);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : ks;
      },
    }),
    Zr = dt(nc),
    P1 = T({}, nc, { dataTransfer: 0 }),
    e0 = dt(P1),
    t0 = T({}, Yn, { relatedTarget: 0 }),
    Zs = dt(t0),
    a0 = T({}, dl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    l0 = dt(a0),
    n0 = T({}, dl, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    i0 = dt(n0),
    c0 = T({}, dl, { data: 0 }),
    Xr = dt(c0),
    s0 = {
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
    u0 = {
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
    o0 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function r0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = o0[e]) ? !!t[e] : !1;
  }
  function Xs() {
    return r0;
  }
  var f0 = T({}, Yn, {
      key: function (e) {
        if (e.key) {
          var t = s0[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = tc(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? u0[e.keyCode] || 'Unidentified'
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
      getModifierState: Xs,
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
    d0 = dt(f0),
    m0 = T({}, nc, {
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
    Qr = dt(m0),
    h0 = T({}, Yn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Xs,
    }),
    v0 = dt(h0),
    y0 = T({}, dl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    g0 = dt(y0),
    p0 = T({}, nc, {
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
    _0 = dt(p0),
    b0 = T({}, dl, { newState: 0, oldState: 0 }),
    S0 = dt(b0),
    x0 = [9, 13, 27, 32],
    Qs = sa && 'CompositionEvent' in window,
    Zn = null;
  sa && 'documentMode' in document && (Zn = document.documentMode);
  var j0 = sa && 'TextEvent' in window && !Zn,
    Kr = sa && (!Qs || (Zn && 8 < Zn && 11 >= Zn)),
    Jr = ' ',
    Wr = !1;
  function Fr(e, t) {
    switch (e) {
      case 'keyup':
        return x0.indexOf(t.keyCode) !== -1;
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
  function Ir(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Jl = !1;
  function T0(e, t) {
    switch (e) {
      case 'compositionend':
        return Ir(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Wr = !0), Jr);
      case 'textInput':
        return ((e = t.data), e === Jr && Wr ? null : e);
      default:
        return null;
    }
  }
  function A0(e, t) {
    if (Jl)
      return e === 'compositionend' || (!Qs && Fr(e, t))
        ? ((e = Yr()), (ec = $s = Ca = null), (Jl = !1), e)
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
        return Kr && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var N0 = {
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
  function Pr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!N0[e.type] : t === 'textarea';
  }
  function ef(e, t, a, l) {
    (Ql ? (Kl ? Kl.push(l) : (Kl = [l])) : (Ql = l),
      (t = Qc(t, 'onChange')),
      0 < t.length &&
        ((a = new lc('onChange', 'change', null, a, l)), e.push({ event: a, listeners: t })));
  }
  var Xn = null,
    Qn = null;
  function z0(e) {
    Hm(e, 0);
  }
  function ic(e) {
    var t = Gn(e);
    if (Br(t)) return e;
  }
  function tf(e, t) {
    if (e === 'change') return t;
  }
  var af = !1;
  if (sa) {
    var Ks;
    if (sa) {
      var Js = 'oninput' in document;
      if (!Js) {
        var lf = document.createElement('div');
        (lf.setAttribute('oninput', 'return;'), (Js = typeof lf.oninput == 'function'));
      }
      Ks = Js;
    } else Ks = !1;
    af = Ks && (!document.documentMode || 9 < document.documentMode);
  }
  function nf() {
    Xn && (Xn.detachEvent('onpropertychange', cf), (Qn = Xn = null));
  }
  function cf(e) {
    if (e.propertyName === 'value' && ic(Qn)) {
      var t = [];
      (ef(t, Qn, e, Us(e)), $r(z0, t));
    }
  }
  function E0(e, t, a) {
    e === 'focusin'
      ? (nf(), (Xn = t), (Qn = a), Xn.attachEvent('onpropertychange', cf))
      : e === 'focusout' && nf();
  }
  function M0(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return ic(Qn);
  }
  function C0(e, t) {
    if (e === 'click') return ic(t);
  }
  function w0(e, t) {
    if (e === 'input' || e === 'change') return ic(t);
  }
  function O0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var xt = typeof Object.is == 'function' ? Object.is : O0;
  function Kn(e, t) {
    if (xt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!Ns.call(t, n) || !xt(e[n], t[n])) return !1;
    }
    return !0;
  }
  function sf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function uf(e, t) {
    var a = sf(e);
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
      a = sf(a);
    }
  }
  function of(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? of(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function rf(e) {
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
  function Ws(e) {
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
  var R0 = sa && 'documentMode' in document && 11 >= document.documentMode,
    Wl = null,
    Fs = null,
    Jn = null,
    Is = !1;
  function ff(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Is ||
      Wl == null ||
      Wl !== Ii(l) ||
      ((l = Wl),
      'selectionStart' in l && Ws(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (Jn && Kn(Jn, l)) ||
        ((Jn = l),
        (l = Qc(Fs, 'onSelect')),
        0 < l.length &&
          ((t = new lc('onSelect', 'select', null, t, a)),
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
    Ps = {},
    df = {};
  sa &&
    ((df = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Fl.animationend.animation,
      delete Fl.animationiteration.animation,
      delete Fl.animationstart.animation),
    'TransitionEvent' in window || delete Fl.transitionend.transition);
  function hl(e) {
    if (Ps[e]) return Ps[e];
    if (!Fl[e]) return e;
    var t = Fl[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in df) return (Ps[e] = t[a]);
    return e;
  }
  var mf = hl('animationend'),
    hf = hl('animationiteration'),
    vf = hl('animationstart'),
    D0 = hl('transitionrun'),
    B0 = hl('transitionstart'),
    L0 = hl('transitioncancel'),
    yf = hl('transitionend'),
    gf = new Map(),
    eu =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  eu.push('scrollEnd');
  function Zt(e, t) {
    (gf.set(e, t), fl(t, [e]));
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
    Il = 0,
    tu = 0;
  function sc() {
    for (var e = Il, t = (tu = Il = 0); t < e; ) {
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
      i !== 0 && pf(a, n, i);
    }
  }
  function uc(e, t, a, l) {
    ((Dt[Il++] = e),
      (Dt[Il++] = t),
      (Dt[Il++] = a),
      (Dt[Il++] = l),
      (tu |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l));
  }
  function au(e, t, a, l) {
    return (uc(e, t, a, l), oc(e));
  }
  function vl(e, t) {
    return (uc(e, null, null, t), oc(e));
  }
  function pf(e, t, a) {
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
    if (50 < gi) throw ((gi = 0), (fo = null), Error(o(185)));
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
  function jt(e, t, a, l) {
    return new H0(e, t, a, l);
  }
  function lu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function ua(e, t) {
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
  function _f(e, t) {
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
    if (((l = e), typeof e == 'function')) lu(e) && (f = 1);
    else if (typeof e == 'string')
      f = $v(e, a, k.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case it:
          return ((e = jt(31, a, t, n)), (e.elementType = it), (e.lanes = i), e);
        case U:
          return yl(a.children, n, i, t);
        case q:
          ((f = 8), (n |= 24));
          break;
        case F:
          return ((e = jt(12, a, t, n | 2)), (e.elementType = F), (e.lanes = i), e);
        case Xe:
          return ((e = jt(13, a, t, n)), (e.elementType = Xe), (e.lanes = i), e);
        case ce:
          return ((e = jt(19, a, t, n)), (e.elementType = ce), (e.lanes = i), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case re:
                f = 10;
                break e;
              case ae:
                f = 9;
                break e;
              case we:
                f = 11;
                break e;
              case I:
                f = 14;
                break e;
              case Ue:
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
  function nu(e, t, a) {
    return ((e = jt(6, e, null, t)), (e.lanes = a), e);
  }
  function bf(e) {
    var t = jt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function iu(e, t, a) {
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
  var Sf = new WeakMap();
  function Bt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = Sf.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: _r(t) }), Sf.set(e, t), t);
    }
    return { value: e, source: t, stack: _r(t) };
  }
  var en = [],
    tn = 0,
    fc = null,
    Wn = 0,
    Lt = [],
    Ht = 0,
    wa = null,
    ea = 1,
    ta = '';
  function oa(e, t) {
    ((en[tn++] = Wn), (en[tn++] = fc), (fc = e), (Wn = t));
  }
  function xf(e, t, a) {
    ((Lt[Ht++] = ea), (Lt[Ht++] = ta), (Lt[Ht++] = wa), (wa = e));
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
  function cu(e) {
    e.return !== null && (oa(e, 1), xf(e, 1, 0));
  }
  function su(e) {
    for (; e === fc; ) ((fc = en[--tn]), (en[tn] = null), (Wn = en[--tn]), (en[tn] = null));
    for (; e === wa; )
      ((wa = Lt[--Ht]),
        (Lt[Ht] = null),
        (ta = Lt[--Ht]),
        (Lt[Ht] = null),
        (ea = Lt[--Ht]),
        (Lt[Ht] = null));
  }
  function jf(e, t) {
    ((Lt[Ht++] = ea), (Lt[Ht++] = ta), (Lt[Ht++] = wa), (ea = t.id), (ta = t.overflow), (wa = e));
  }
  var et = null,
    Me = null,
    he = !1,
    Oa = null,
    qt = !1,
    uu = Error(o(519));
  function Ra(e) {
    var t = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Fn(Bt(t, e)), uu);
  }
  function Tf(e) {
    var t = e.stateNode,
      a = e.type,
      l = e.memoizedProps;
    switch (((t[Pe] = e), (t[ft] = l), a)) {
      case 'dialog':
        (ue('cancel', t), ue('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ue('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < _i.length; a++) ue(_i[a], t);
        break;
      case 'source':
        ue('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (ue('error', t), ue('load', t));
        break;
      case 'details':
        ue('toggle', t);
        break;
      case 'input':
        (ue('invalid', t),
          Lr(t, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
        break;
      case 'select':
        ue('invalid', t);
        break;
      case 'textarea':
        (ue('invalid', t), qr(t, l.value, l.defaultValue, l.children));
    }
    ((a = l.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      l.suppressHydrationWarning === !0 ||
      Vm(t.textContent, a)
        ? (l.popover != null && (ue('beforetoggle', t), ue('toggle', t)),
          l.onScroll != null && ue('scroll', t),
          l.onScrollEnd != null && ue('scrollend', t),
          l.onClick != null && (t.onclick = ca),
          (t = !0))
        : (t = !1),
      t || Ra(e, !0));
  }
  function Af(e) {
    for (et = e.return; et; )
      switch (et.tag) {
        case 5:
        case 31:
        case 13:
          qt = !1;
          return;
        case 27:
        case 3:
          qt = !0;
          return;
        default:
          et = et.return;
      }
  }
  function an(e) {
    if (e !== et) return !1;
    if (!he) return (Af(e), (he = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || zo(e.type, e.memoizedProps))),
        (a = !a)),
      a && Me && Ra(e),
      Af(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      Me = Wm(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      Me = Wm(e);
    } else
      t === 27
        ? ((t = Me), Qa(e.type) ? ((e = Oo), (Oo = null), (Me = e)) : (Me = t))
        : (Me = et ? Gt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function gl() {
    ((Me = et = null), (he = !1));
  }
  function ou() {
    var e = Oa;
    return (e !== null && (yt === null ? (yt = e) : yt.push.apply(yt, e), (Oa = null)), e);
  }
  function Fn(e) {
    Oa === null ? (Oa = [e]) : Oa.push(e);
  }
  var ru = x(null),
    pl = null,
    ra = null;
  function Da(e, t, a) {
    ($(ru, t._currentValue), (t._currentValue = a));
  }
  function fa(e) {
    ((e._currentValue = ru.current), H(ru));
  }
  function fu(e, t, a) {
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
  function du(e, t, a, l) {
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
                fu(i.return, a, e),
                l || (f = null));
              break e;
            }
          i = v.next;
        }
      } else if (n.tag === 18) {
        if (((f = n.return), f === null)) throw Error(o(341));
        ((f.lanes |= a), (i = f.alternate), i !== null && (i.lanes |= a), fu(f, a, e), (f = null));
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
          xt(n.pendingProps.value, f.value) || (e !== null ? e.push(v) : (e = [v]));
        }
      } else if (n === ve.current) {
        if (((f = n.alternate), f === null)) throw Error(o(387));
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(Ti) : (e = [Ti]));
      }
      n = n.return;
    }
    (e !== null && du(t, e, a, l), (t.flags |= 262144));
  }
  function dc(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!xt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function _l(e) {
    ((pl = e), (ra = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function tt(e) {
    return Nf(pl, e);
  }
  function mc(e, t) {
    return (pl === null && _l(e), Nf(e, t));
  }
  function Nf(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), ra === null)) {
      if (e === null) throw Error(o(308));
      ((ra = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else ra = ra.next = t;
    return a;
  }
  var q0 =
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
    U0 = c.unstable_scheduleCallback,
    G0 = c.unstable_NormalPriority,
    Ge = {
      $$typeof: re,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function mu() {
    return { controller: new q0(), data: new Map(), refCount: 0 };
  }
  function In(e) {
    (e.refCount--,
      e.refCount === 0 &&
        U0(G0, function () {
          e.controller.abort();
        }));
  }
  var Pn = null,
    hu = 0,
    nn = 0,
    cn = null;
  function V0(e, t) {
    if (Pn === null) {
      var a = (Pn = []);
      ((hu = 0),
        (nn = po()),
        (cn = {
          status: 'pending',
          value: void 0,
          then: function (l) {
            a.push(l);
          },
        }));
    }
    return (hu++, t.then(zf, zf), t);
  }
  function zf() {
    if (--hu === 0 && Pn !== null) {
      cn !== null && (cn.status = 'fulfilled');
      var e = Pn;
      ((Pn = null), (nn = 0), (cn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function $0(e, t) {
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
  var Ef = R.S;
  R.S = function (e, t) {
    ((fm = _t()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && V0(e, t),
      Ef !== null && Ef(e, t));
  };
  var bl = x(null);
  function vu() {
    var e = bl.current;
    return e !== null ? e : Ne.pooledCache;
  }
  function hc(e, t) {
    t === null ? $(bl, bl.current) : $(bl, t.pool);
  }
  function Mf() {
    var e = vu();
    return e === null ? null : { parent: Ge._currentValue, pool: e };
  }
  var sn = Error(o(460)),
    yu = Error(o(474)),
    vc = Error(o(542)),
    yc = { then: function () {} };
  function Cf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function wf(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(ca, ca), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Rf(e), e);
      default:
        if (typeof t.status == 'string') t.then(ca, ca);
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
            throw ((e = t.reason), Rf(e), e);
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
  function Of() {
    if (xl === null) throw Error(o(459));
    var e = xl;
    return ((xl = null), e);
  }
  function Rf(e) {
    if (e === sn || e === vc) throw Error(o(483));
  }
  var un = null,
    ei = 0;
  function gc(e) {
    var t = ei;
    return ((ei += 1), un === null && (un = []), wf(un, e, t));
  }
  function ti(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function pc(e, t) {
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
  function Df(e) {
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
        ? ((S = nu(A, j.mode, B)), (S.return = j), S)
        : ((S = n(S, A)), (S.return = j), S);
    }
    function _(j, S, A, B) {
      var K = A.type;
      return K === U
        ? w(j, S, A.props.children, B, A.key)
        : S !== null &&
            (S.elementType === K ||
              (typeof K == 'object' && K !== null && K.$$typeof === Ue && Sl(K) === S.type))
          ? ((S = n(S, A.props)), ti(S, A), (S.return = j), S)
          : ((S = rc(A.type, A.key, A.props, null, j.mode, B)), ti(S, A), (S.return = j), S);
    }
    function N(j, S, A, B) {
      return S === null ||
        S.tag !== 4 ||
        S.stateNode.containerInfo !== A.containerInfo ||
        S.stateNode.implementation !== A.implementation
        ? ((S = iu(A, j.mode, B)), (S.return = j), S)
        : ((S = n(S, A.children || [])), (S.return = j), S);
    }
    function w(j, S, A, B, K) {
      return S === null || S.tag !== 7
        ? ((S = yl(A, j.mode, B, K)), (S.return = j), S)
        : ((S = n(S, A)), (S.return = j), S);
    }
    function L(j, S, A) {
      if ((typeof S == 'string' && S !== '') || typeof S == 'number' || typeof S == 'bigint')
        return ((S = nu('' + S, j.mode, A)), (S.return = j), S);
      if (typeof S == 'object' && S !== null) {
        switch (S.$$typeof) {
          case C:
            return ((A = rc(S.type, S.key, S.props, null, j.mode, A)), ti(A, S), (A.return = j), A);
          case O:
            return ((S = iu(S, j.mode, A)), (S.return = j), S);
          case Ue:
            return ((S = Sl(S)), L(j, S, A));
        }
        if (ct(S) || Ke(S)) return ((S = yl(S, j.mode, A, null)), (S.return = j), S);
        if (typeof S.then == 'function') return L(j, gc(S), A);
        if (S.$$typeof === re) return L(j, mc(j, S), A);
        pc(j, S);
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
          case Ue:
            return ((A = Sl(A)), z(j, S, A, B));
        }
        if (ct(A) || Ke(A)) return K !== null ? null : w(j, S, A, B, null);
        if (typeof A.then == 'function') return z(j, S, gc(A), B);
        if (A.$$typeof === re) return z(j, S, mc(j, A), B);
        pc(j, A);
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
          case Ue:
            return ((B = Sl(B)), M(j, S, A, B, K));
        }
        if (ct(B) || Ke(B)) return ((j = j.get(A) || null), w(S, j, B, K, null));
        if (typeof B.then == 'function') return M(j, S, A, gc(B), K);
        if (B.$$typeof === re) return M(j, S, A, mc(S, B), K);
        pc(S, B);
      }
      return null;
    }
    function Y(j, S, A, B) {
      for (
        var K = null, ye = null, Z = S, ne = (S = 0), de = null;
        Z !== null && ne < A.length;
        ne++
      ) {
        Z.index > ne ? ((de = Z), (Z = null)) : (de = Z.sibling);
        var ge = z(j, Z, A[ne], B);
        if (ge === null) {
          Z === null && (Z = de);
          break;
        }
        (e && Z && ge.alternate === null && t(j, Z),
          (S = i(ge, S, ne)),
          ye === null ? (K = ge) : (ye.sibling = ge),
          (ye = ge),
          (Z = de));
      }
      if (ne === A.length) return (a(j, Z), he && oa(j, ne), K);
      if (Z === null) {
        for (; ne < A.length; ne++)
          ((Z = L(j, A[ne], B)),
            Z !== null && ((S = i(Z, S, ne)), ye === null ? (K = Z) : (ye.sibling = Z), (ye = Z)));
        return (he && oa(j, ne), K);
      }
      for (Z = l(Z); ne < A.length; ne++)
        ((de = M(Z, j, ne, A[ne], B)),
          de !== null &&
            (e && de.alternate !== null && Z.delete(de.key === null ? ne : de.key),
            (S = i(de, S, ne)),
            ye === null ? (K = de) : (ye.sibling = de),
            (ye = de)));
      return (
        e &&
          Z.forEach(function (Ia) {
            return t(j, Ia);
          }),
        he && oa(j, ne),
        K
      );
    }
    function J(j, S, A, B) {
      if (A == null) throw Error(o(151));
      for (
        var K = null, ye = null, Z = S, ne = (S = 0), de = null, ge = A.next();
        Z !== null && !ge.done;
        ne++, ge = A.next()
      ) {
        Z.index > ne ? ((de = Z), (Z = null)) : (de = Z.sibling);
        var Ia = z(j, Z, ge.value, B);
        if (Ia === null) {
          Z === null && (Z = de);
          break;
        }
        (e && Z && Ia.alternate === null && t(j, Z),
          (S = i(Ia, S, ne)),
          ye === null ? (K = Ia) : (ye.sibling = Ia),
          (ye = Ia),
          (Z = de));
      }
      if (ge.done) return (a(j, Z), he && oa(j, ne), K);
      if (Z === null) {
        for (; !ge.done; ne++, ge = A.next())
          ((ge = L(j, ge.value, B)),
            ge !== null &&
              ((S = i(ge, S, ne)), ye === null ? (K = ge) : (ye.sibling = ge), (ye = ge)));
        return (he && oa(j, ne), K);
      }
      for (Z = l(Z); !ge.done; ne++, ge = A.next())
        ((ge = M(Z, j, ne, ge.value, B)),
          ge !== null &&
            (e && ge.alternate !== null && Z.delete(ge.key === null ? ne : ge.key),
            (S = i(ge, S, ne)),
            ye === null ? (K = ge) : (ye.sibling = ge),
            (ye = ge)));
      return (
        e &&
          Z.forEach(function (Pv) {
            return t(j, Pv);
          }),
        he && oa(j, ne),
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
                    (typeof K == 'object' && K !== null && K.$$typeof === Ue && Sl(K) === S.type)
                  ) {
                    (a(j, S.sibling), (B = n(S, A.props)), ti(B, A), (B.return = j), (j = B));
                    break e;
                  }
                  a(j, S);
                  break;
                } else t(j, S);
                S = S.sibling;
              }
              A.type === U
                ? ((B = yl(A.props.children, j.mode, B, A.key)), (B.return = j), (j = B))
                : ((B = rc(A.type, A.key, A.props, null, j.mode, B)),
                  ti(B, A),
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
              ((B = iu(A, j.mode, B)), (B.return = j), (j = B));
            }
            return f(j);
          case Ue:
            return ((A = Sl(A)), Ae(j, S, A, B));
        }
        if (ct(A)) return Y(j, S, A, B);
        if (Ke(A)) {
          if (((K = Ke(A)), typeof K != 'function')) throw Error(o(150));
          return ((A = K.call(A)), J(j, S, A, B));
        }
        if (typeof A.then == 'function') return Ae(j, S, gc(A), B);
        if (A.$$typeof === re) return Ae(j, S, mc(j, A), B);
        pc(j, A);
      }
      return (typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint'
        ? ((A = '' + A),
          S !== null && S.tag === 6
            ? (a(j, S.sibling), (B = n(S, A)), (B.return = j), (j = B))
            : (a(j, S), (B = nu(A, j.mode, B)), (B.return = j), (j = B)),
          f(j))
        : a(j, S);
    }
    return function (j, S, A, B) {
      try {
        ei = 0;
        var K = Ae(j, S, A, B);
        return ((un = null), K);
      } catch (Z) {
        if (Z === sn || Z === vc) throw Z;
        var ye = jt(29, Z, null, j.mode);
        return ((ye.lanes = B), (ye.return = j), ye);
      } finally {
      }
    };
  }
  var jl = Df(!0),
    Bf = Df(!1),
    Ba = !1;
  function gu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function pu(e, t) {
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
  function Ha(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (pe & 2) !== 0)) {
      var n = l.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (l.pending = t),
        (t = oc(e)),
        pf(e, null, a),
        t
      );
    }
    return (uc(e, l, t, a), oc(e));
  }
  function ai(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var l = t.lanes;
      ((l &= e.pendingLanes), (a |= l), (t.lanes = a), Ar(e, a));
    }
  }
  function _u(e, t) {
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
  var bu = !1;
  function li() {
    if (bu) {
      var e = cn;
      if (e !== null) throw e;
    }
  }
  function ni(e, t, a, l) {
    bu = !1;
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
        if (M ? (fe & z) === z : (l & z) === z) {
          (z !== 0 && z === nn && (bu = !0),
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
  function Lf(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function Hf(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) Lf(a[e], t);
  }
  var on = x(null),
    _c = x(0);
  function qf(e, t) {
    ((e = ba), $(_c, e), $(on, t), (ba = e | t.baseLanes));
  }
  function Su() {
    ($(_c, ba), $(on, on.current));
  }
  function xu() {
    ((ba = _c.current), H(on), H(_c));
  }
  var Tt = x(null),
    Ut = null;
  function qa(e) {
    var t = e.alternate;
    ($(He, He.current & 1),
      $(Tt, e),
      Ut === null && (t === null || on.current !== null || t.memoizedState !== null) && (Ut = e));
  }
  function ju(e) {
    ($(He, He.current), $(Tt, e), Ut === null && (Ut = e));
  }
  function Uf(e) {
    e.tag === 22 ? ($(He, He.current), $(Tt, e), Ut === null && (Ut = e)) : Ua();
  }
  function Ua() {
    ($(He, He.current), $(Tt, Tt.current));
  }
  function At(e) {
    (H(Tt), Ut === e && (Ut = null), H(He));
  }
  var He = x(0);
  function bc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Co(a) || wo(a))) return t;
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
    le = null,
    je = null,
    Ve = null,
    Sc = !1,
    rn = !1,
    Tl = !1,
    xc = 0,
    ii = 0,
    fn = null,
    Y0 = 0;
  function Be() {
    throw Error(o(321));
  }
  function Tu(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!xt(e[a], t[a])) return !1;
    return !0;
  }
  function Au(e, t, a, l, n, i) {
    return (
      (da = i),
      (le = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (R.H = e === null || e.memoizedState === null ? xd : Gu),
      (Tl = !1),
      (i = a(l, n)),
      (Tl = !1),
      rn && (i = Vf(t, a, l, n)),
      Gf(e),
      i
    );
  }
  function Gf(e) {
    R.H = ui;
    var t = je !== null && je.next !== null;
    if (((da = 0), (Ve = je = le = null), (Sc = !1), (ii = 0), (fn = null), t)) throw Error(o(300));
    e === null || $e || ((e = e.dependencies), e !== null && dc(e) && ($e = !0));
  }
  function Vf(e, t, a, l) {
    le = e;
    var n = 0;
    do {
      if ((rn && (fn = null), (ii = 0), (rn = !1), 25 <= n)) throw Error(o(301));
      if (((n += 1), (Ve = je = null), e.updateQueue != null)) {
        var i = e.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((R.H = jd), (i = t(a, l)));
    } while (rn);
    return i;
  }
  function k0() {
    var e = R.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? ci(t) : t),
      (e = e.useState()[0]),
      (je !== null ? je.memoizedState : null) !== e && (le.flags |= 1024),
      t
    );
  }
  function Nu() {
    var e = xc !== 0;
    return ((xc = 0), e);
  }
  function zu(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Eu(e) {
    if (Sc) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Sc = !1;
    }
    ((da = 0), (Ve = je = le = null), (rn = !1), (ii = xc = 0), (fn = null));
  }
  function rt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Ve === null ? (le.memoizedState = Ve = e) : (Ve = Ve.next = e), Ve);
  }
  function qe() {
    if (je === null) {
      var e = le.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = je.next;
    var t = Ve === null ? le.memoizedState : Ve.next;
    if (t !== null) ((Ve = t), (je = e));
    else {
      if (e === null) throw le.alternate === null ? Error(o(467)) : Error(o(310));
      ((je = e),
        (e = {
          memoizedState: je.memoizedState,
          baseState: je.baseState,
          baseQueue: je.baseQueue,
          queue: je.queue,
          next: null,
        }),
        Ve === null ? (le.memoizedState = Ve = e) : (Ve = Ve.next = e));
    }
    return Ve;
  }
  function jc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ci(e) {
    var t = ii;
    return (
      (ii += 1),
      fn === null && (fn = []),
      (e = wf(fn, e, t)),
      (t = le),
      (Ve === null ? t.memoizedState : Ve.next) === null &&
        ((t = t.alternate), (R.H = t === null || t.memoizedState === null ? xd : Gu)),
      e
    );
  }
  function Tc(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return ci(e);
      if (e.$$typeof === re) return tt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Mu(e) {
    var t = null,
      a = le.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var l = le.alternate;
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
      a === null && ((a = jc()), (le.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++) a[l] = Qe;
    return (t.index++, a);
  }
  function ma(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Ac(e) {
    var t = qe();
    return Cu(t, je, e);
  }
  function Cu(e, t, a) {
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
        if (L !== N.lane ? (fe & L) === L : (da & L) === L) {
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
              (le.lanes |= z),
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
            (le.lanes |= L),
            ($a |= L));
        N = N.next;
      } while (N !== null && N !== t);
      if (
        (_ === null ? (f = i) : (_.next = v),
        !xt(i, e.memoizedState) && (($e = !0), w && ((a = cn), a !== null)))
      )
        throw a;
      ((e.memoizedState = i), (e.baseState = f), (e.baseQueue = _), (l.lastRenderedState = i));
    }
    return (n === null && (l.lanes = 0), [e.memoizedState, l.dispatch]);
  }
  function wu(e) {
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
      (xt(i, t.memoizedState) || ($e = !0),
        (t.memoizedState = i),
        t.baseQueue === null && (t.baseState = i),
        (a.lastRenderedState = i));
    }
    return [i, l];
  }
  function $f(e, t, a) {
    var l = le,
      n = qe(),
      i = he;
    if (i) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var f = !xt((je || n).memoizedState, a);
    if (
      (f && ((n.memoizedState = a), ($e = !0)),
      (n = n.queue),
      Du(Zf.bind(null, l, n, e), [e]),
      n.getSnapshot !== t || f || (Ve !== null && Ve.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        dn(9, { destroy: void 0 }, kf.bind(null, l, n, a, t), null),
        Ne === null)
      )
        throw Error(o(349));
      i || (da & 127) !== 0 || Yf(l, t, a);
    }
    return a;
  }
  function Yf(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = le.updateQueue),
      t === null
        ? ((t = jc()), (le.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function kf(e, t, a, l) {
    ((t.value = a), (t.getSnapshot = l), Xf(t) && Qf(e));
  }
  function Zf(e, t, a) {
    return a(function () {
      Xf(t) && Qf(e);
    });
  }
  function Xf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !xt(e, a);
    } catch {
      return !0;
    }
  }
  function Qf(e) {
    var t = vl(e, 2);
    t !== null && gt(t, e, 2);
  }
  function Ou(e) {
    var t = rt();
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
  function Kf(e, t, a, l) {
    return ((e.baseState = a), Cu(e, je, typeof l == 'function' ? l : ma));
  }
  function Z0(e, t, a, l, n) {
    if (Ec(e)) throw Error(o(485));
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
          ? ((i.next = t.pending = i), Jf(t, i))
          : ((i.next = a.next), (t.pending = a.next = i)));
    }
  }
  function Jf(e, t) {
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
        (_ !== null && _(f, v), Wf(e, t, v));
      } catch (N) {
        Ru(e, t, N);
      } finally {
        (i !== null && f.types !== null && (i.types = f.types), (R.T = i));
      }
    } else
      try {
        ((i = a(n, l)), Wf(e, t, i));
      } catch (N) {
        Ru(e, t, N);
      }
  }
  function Wf(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (l) {
            Ff(e, t, l);
          },
          function (l) {
            return Ru(e, t, l);
          }
        )
      : Ff(e, t, a);
  }
  function Ff(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      If(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), Jf(e, a))));
  }
  function Ru(e, t, a) {
    var l = e.pending;
    if (((e.pending = null), l !== null)) {
      l = l.next;
      do ((t.status = 'rejected'), (t.reason = a), If(t), (t = t.next));
      while (t !== l);
    }
    e.action = null;
  }
  function If(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Pf(e, t) {
    return t;
  }
  function ed(e, t) {
    if (he) {
      var a = Ne.formState;
      if (a !== null) {
        e: {
          var l = le;
          if (he) {
            if (Me) {
              t: {
                for (var n = Me, i = qt; n.nodeType !== 8; ) {
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
      (a = rt()),
      (a.memoizedState = a.baseState = t),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pf,
        lastRenderedState: t,
      }),
      (a.queue = l),
      (a = _d.bind(null, le, l)),
      (l.dispatch = a),
      (l = Ou(!1)),
      (i = Uu.bind(null, le, !1, l.queue)),
      (l = rt()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (l.queue = n),
      (a = Z0.bind(null, le, n, i, a)),
      (n.dispatch = a),
      (l.memoizedState = e),
      [t, a, !1]
    );
  }
  function td(e) {
    var t = qe();
    return ad(t, je, e);
  }
  function ad(e, t, a) {
    if (
      ((t = Cu(e, t, Pf)[0]),
      (e = Ac(ma)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var l = ci(t);
      } catch (f) {
        throw f === sn ? vc : f;
      }
    else l = t;
    t = qe();
    var n = t.queue,
      i = n.dispatch;
    return (
      a !== t.memoizedState &&
        ((le.flags |= 2048), dn(9, { destroy: void 0 }, X0.bind(null, n, a), null)),
      [l, i, e]
    );
  }
  function X0(e, t) {
    e.action = t;
  }
  function ld(e) {
    var t = qe(),
      a = je;
    if (a !== null) return ad(t, a, e);
    (qe(), (t = t.memoizedState), (a = qe()));
    var l = a.queue.dispatch;
    return ((a.memoizedState = e), [t, l, !1]);
  }
  function dn(e, t, a, l) {
    return (
      (e = { tag: e, create: a, deps: l, inst: t, next: null }),
      (t = le.updateQueue),
      t === null && ((t = jc()), (le.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((l = a.next), (a.next = e), (e.next = l), (t.lastEffect = e)),
      e
    );
  }
  function nd() {
    return qe().memoizedState;
  }
  function Nc(e, t, a, l) {
    var n = rt();
    ((le.flags |= e),
      (n.memoizedState = dn(1 | t, { destroy: void 0 }, a, l === void 0 ? null : l)));
  }
  function zc(e, t, a, l) {
    var n = qe();
    l = l === void 0 ? null : l;
    var i = n.memoizedState.inst;
    je !== null && l !== null && Tu(l, je.memoizedState.deps)
      ? (n.memoizedState = dn(t, i, a, l))
      : ((le.flags |= e), (n.memoizedState = dn(1 | t, i, a, l)));
  }
  function id(e, t) {
    Nc(8390656, 8, e, t);
  }
  function Du(e, t) {
    zc(2048, 8, e, t);
  }
  function Q0(e) {
    le.flags |= 4;
    var t = le.updateQueue;
    if (t === null) ((t = jc()), (le.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function cd(e) {
    var t = qe().memoizedState;
    return (
      Q0({ ref: t, nextImpl: e }),
      function () {
        if ((pe & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function sd(e, t) {
    return zc(4, 2, e, t);
  }
  function ud(e, t) {
    return zc(4, 4, e, t);
  }
  function od(e, t) {
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
  function rd(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), zc(4, 4, od.bind(null, t, e), a));
  }
  function Bu() {}
  function fd(e, t) {
    var a = qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Tu(t, l[1]) ? l[0] : ((a.memoizedState = [e, t]), e);
  }
  function dd(e, t) {
    var a = qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Tu(t, l[1])) return l[0];
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
  function Lu(e, t, a) {
    return a === void 0 || ((da & 1073741824) !== 0 && (fe & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = mm()), (le.lanes |= e), ($a |= e), a);
  }
  function md(e, t, a, l) {
    return xt(a, t)
      ? a
      : on.current !== null
        ? ((e = Lu(e, a, l)), xt(e, t) || ($e = !0), e)
        : (da & 42) === 0 || ((da & 1073741824) !== 0 && (fe & 261930) === 0)
          ? (($e = !0), (e.memoizedState = a))
          : ((e = mm()), (le.lanes |= e), ($a |= e), t);
  }
  function hd(e, t, a, l, n) {
    var i = V.p;
    V.p = i !== 0 && 8 > i ? i : 8;
    var f = R.T,
      v = {};
    ((R.T = v), Uu(e, !1, t, a));
    try {
      var _ = n(),
        N = R.S;
      if (
        (N !== null && N(v, _), _ !== null && typeof _ == 'object' && typeof _.then == 'function')
      ) {
        var w = $0(_, l);
        si(e, t, w, Et(e));
      } else si(e, t, l, Et(e));
    } catch (L) {
      si(e, t, { then: function () {}, status: 'rejected', reason: L }, Et());
    } finally {
      ((V.p = i), f !== null && v.types !== null && (f.types = v.types), (R.T = f));
    }
  }
  function K0() {}
  function Hu(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var n = vd(e).queue;
    hd(
      e,
      n,
      t,
      W,
      a === null
        ? K0
        : function () {
            return (yd(e), a(l));
          }
    );
  }
  function vd(e) {
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
  function yd(e) {
    var t = vd(e);
    (t.next === null && (t = e.alternate.memoizedState), si(e, t.next.queue, {}, Et()));
  }
  function qu() {
    return tt(Ti);
  }
  function gd() {
    return qe().memoizedState;
  }
  function pd() {
    return qe().memoizedState;
  }
  function J0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Et();
          e = La(a);
          var l = Ha(t, e, a);
          (l !== null && (gt(l, t, a), ai(l, t, a)), (t = { cache: mu() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function W0(e, t, a) {
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
      Ec(e) ? bd(t, a) : ((a = au(e, t, a, l)), a !== null && (gt(a, e, l), Sd(a, t, l))));
  }
  function _d(e, t, a) {
    var l = Et();
    si(e, t, a, l);
  }
  function si(e, t, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ec(e)) bd(t, n);
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
      if (((a = au(e, t, n, l)), a !== null)) return (gt(a, e, l), Sd(a, t, l), !0);
    }
    return !1;
  }
  function Uu(e, t, a, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: po(),
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ec(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = au(e, a, l, 2)), t !== null && gt(t, e, 2));
  }
  function Ec(e) {
    var t = e.alternate;
    return e === le || (t !== null && t === le);
  }
  function bd(e, t) {
    rn = Sc = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function Sd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      ((l &= e.pendingLanes), (a |= l), (t.lanes = a), Ar(e, a));
    }
  }
  var ui = {
    readContext: tt,
    use: Tc,
    useCallback: Be,
    useContext: Be,
    useEffect: Be,
    useImperativeHandle: Be,
    useLayoutEffect: Be,
    useInsertionEffect: Be,
    useMemo: Be,
    useReducer: Be,
    useRef: Be,
    useState: Be,
    useDebugValue: Be,
    useDeferredValue: Be,
    useTransition: Be,
    useSyncExternalStore: Be,
    useId: Be,
    useHostTransitionStatus: Be,
    useFormState: Be,
    useActionState: Be,
    useOptimistic: Be,
    useMemoCache: Be,
    useCacheRefresh: Be,
  };
  ui.useEffectEvent = Be;
  var xd = {
      readContext: tt,
      use: Tc,
      useCallback: function (e, t) {
        return ((rt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: tt,
      useEffect: id,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), Nc(4194308, 4, od.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return Nc(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Nc(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = rt();
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
        var l = rt();
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
          (e = e.dispatch = W0.bind(null, le, e)),
          [l.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = rt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Ou(e);
        var t = e.queue,
          a = _d.bind(null, le, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: Bu,
      useDeferredValue: function (e, t) {
        var a = rt();
        return Lu(a, e, t);
      },
      useTransition: function () {
        var e = Ou(!1);
        return ((e = hd.bind(null, le, e.queue, !0, !1)), (rt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var l = le,
          n = rt();
        if (he) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = t()), Ne === null)) throw Error(o(349));
          (fe & 127) !== 0 || Yf(l, t, a);
        }
        n.memoizedState = a;
        var i = { value: a, getSnapshot: t };
        return (
          (n.queue = i),
          id(Zf.bind(null, l, i, e), [e]),
          (l.flags |= 2048),
          dn(9, { destroy: void 0 }, kf.bind(null, l, i, a, t), null),
          a
        );
      },
      useId: function () {
        var e = rt(),
          t = Ne.identifierPrefix;
        if (he) {
          var a = ta,
            l = ea;
          ((a = (l & ~(1 << (32 - St(l) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = xc++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = Y0++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: qu,
      useFormState: ed,
      useActionState: ed,
      useOptimistic: function (e) {
        var t = rt();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = a), (t = Uu.bind(null, le, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: Mu,
      useCacheRefresh: function () {
        return (rt().memoizedState = J0.bind(null, le));
      },
      useEffectEvent: function (e) {
        var t = rt(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((pe & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Gu = {
      readContext: tt,
      use: Tc,
      useCallback: fd,
      useContext: tt,
      useEffect: Du,
      useImperativeHandle: rd,
      useInsertionEffect: sd,
      useLayoutEffect: ud,
      useMemo: dd,
      useReducer: Ac,
      useRef: nd,
      useState: function () {
        return Ac(ma);
      },
      useDebugValue: Bu,
      useDeferredValue: function (e, t) {
        var a = qe();
        return md(a, je.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Ac(ma)[0],
          t = qe().memoizedState;
        return [typeof e == 'boolean' ? e : ci(e), t];
      },
      useSyncExternalStore: $f,
      useId: gd,
      useHostTransitionStatus: qu,
      useFormState: td,
      useActionState: td,
      useOptimistic: function (e, t) {
        var a = qe();
        return Kf(a, je, e, t);
      },
      useMemoCache: Mu,
      useCacheRefresh: pd,
    };
  Gu.useEffectEvent = cd;
  var jd = {
    readContext: tt,
    use: Tc,
    useCallback: fd,
    useContext: tt,
    useEffect: Du,
    useImperativeHandle: rd,
    useInsertionEffect: sd,
    useLayoutEffect: ud,
    useMemo: dd,
    useReducer: wu,
    useRef: nd,
    useState: function () {
      return wu(ma);
    },
    useDebugValue: Bu,
    useDeferredValue: function (e, t) {
      var a = qe();
      return je === null ? Lu(a, e, t) : md(a, je.memoizedState, e, t);
    },
    useTransition: function () {
      var e = wu(ma)[0],
        t = qe().memoizedState;
      return [typeof e == 'boolean' ? e : ci(e), t];
    },
    useSyncExternalStore: $f,
    useId: gd,
    useHostTransitionStatus: qu,
    useFormState: ld,
    useActionState: ld,
    useOptimistic: function (e, t) {
      var a = qe();
      return je !== null ? Kf(a, je, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: Mu,
    useCacheRefresh: pd,
  };
  jd.useEffectEvent = cd;
  function Vu(e, t, a, l) {
    ((t = e.memoizedState),
      (a = a(l, t)),
      (a = a == null ? t : T({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var $u = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var l = Et(),
        n = La(l);
      ((n.payload = t),
        a != null && (n.callback = a),
        (t = Ha(e, n, l)),
        t !== null && (gt(t, e, l), ai(t, e, l)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var l = Et(),
        n = La(l);
      ((n.tag = 1),
        (n.payload = t),
        a != null && (n.callback = a),
        (t = Ha(e, n, l)),
        t !== null && (gt(t, e, l), ai(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Et(),
        l = La(a);
      ((l.tag = 2),
        t != null && (l.callback = t),
        (t = Ha(e, l, a)),
        t !== null && (gt(t, e, a), ai(t, e, a)));
    },
  };
  function Td(e, t, a, l, n, i, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(l, i, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Kn(a, l) || !Kn(n, i)
          : !0
    );
  }
  function Ad(e, t, a, l) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, l),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, l),
      t.state !== e && $u.enqueueReplaceState(t, t.state, null));
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
  function Nd(e) {
    cc(e);
  }
  function zd(e) {
    console.error(e);
  }
  function Ed(e) {
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
  function Md(e, t, a) {
    try {
      var l = e.onCaughtError;
      l(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Yu(e, t, a) {
    return (
      (a = La(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Mc(e, t);
      }),
      a
    );
  }
  function Cd(e) {
    return ((e = La(e)), (e.tag = 3), e);
  }
  function wd(e, t, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == 'function') {
      var i = l.value;
      ((e.payload = function () {
        return n(i);
      }),
        (e.callback = function () {
          Md(t, a, l);
        }));
    }
    var f = a.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (e.callback = function () {
        (Md(t, a, l),
          typeof n != 'function' && (Ya === null ? (Ya = new Set([this])) : Ya.add(this)));
        var v = l.stack;
        this.componentDidCatch(l.value, { componentStack: v !== null ? v : '' });
      });
  }
  function F0(e, t, a, l, n) {
    if (((a.flags |= 32768), l !== null && typeof l == 'object' && typeof l.then == 'function')) {
      if (((t = a.alternate), t !== null && ln(t, a, n, !0), (a = Tt.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Ut === null ? Vc() : a.alternate === null && Le === 0 && (Le = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = n),
              l === yc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([l])) : t.add(l),
                  vo(e, l, n)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              l === yc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([l])) : a.add(l)),
                  vo(e, l, n)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (vo(e, l, n), Vc(), !1);
    }
    if (he)
      return (
        (t = Tt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            l !== uu && ((e = Error(o(422), { cause: l })), Fn(Bt(e, a))))
          : (l !== uu && ((t = Error(o(423), { cause: l })), Fn(Bt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (n &= -n),
            (e.lanes |= n),
            (l = Bt(l, a)),
            (n = Yu(e.stateNode, l, n)),
            _u(e, n),
            Le !== 4 && (Le = 2)),
        !1
      );
    var i = Error(o(520), { cause: l });
    if (((i = Bt(i, a)), yi === null ? (yi = [i]) : yi.push(i), Le !== 4 && (Le = 2), t === null))
      return !0;
    ((l = Bt(l, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = n & -n),
            (a.lanes |= e),
            (e = Yu(a.stateNode, l, e)),
            _u(a, e),
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
              (n = Cd(n)),
              wd(n, e, a, l),
              _u(a, n),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var ku = Error(o(461)),
    $e = !1;
  function at(e, t, a, l) {
    t.child = e === null ? Bf(t, null, a, l) : jl(t, e.child, a, l);
  }
  function Od(e, t, a, l, n) {
    a = a.render;
    var i = t.ref;
    if ('ref' in l) {
      var f = {};
      for (var v in l) v !== 'ref' && (f[v] = l[v]);
    } else f = l;
    return (
      _l(t),
      (l = Au(e, t, a, f, i, n)),
      (v = Nu()),
      e !== null && !$e
        ? (zu(e, t, n), ha(e, t, n))
        : (he && v && cu(t), (t.flags |= 1), at(e, t, l, n), t.child)
    );
  }
  function Rd(e, t, a, l, n) {
    if (e === null) {
      var i = a.type;
      return typeof i == 'function' && !lu(i) && i.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = i), Dd(e, t, i, l, n))
        : ((e = rc(a.type, null, l, t, t.mode, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((i = e.child), !Iu(e, n))) {
      var f = i.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Kn), a(f, l) && e.ref === t.ref))
        return ha(e, t, n);
    }
    return ((t.flags |= 1), (e = ua(i, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function Dd(e, t, a, l, n) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Kn(i, l) && e.ref === t.ref)
        if ((($e = !1), (t.pendingProps = l = i), Iu(e, n))) (e.flags & 131072) !== 0 && ($e = !0);
        else return ((t.lanes = e.lanes), ha(e, t, n));
    }
    return Zu(e, t, a, l, n);
  }
  function Bd(e, t, a, l) {
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
        return Ld(e, t, i, a, l);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && hc(t, i !== null ? i.cachePool : null),
          i !== null ? qf(t, i) : Su(),
          Uf(t));
      else return ((l = t.lanes = 536870912), Ld(e, t, i !== null ? i.baseLanes | a : a, a, l));
    } else
      i !== null
        ? (hc(t, i.cachePool), qf(t, i), Ua(), (t.memoizedState = null))
        : (e !== null && hc(t, null), Su(), Ua());
    return (at(e, t, n, a), t.child);
  }
  function oi(e, t) {
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
  function Ld(e, t, a, l, n) {
    var i = vu();
    return (
      (i = i === null ? null : { parent: Ge._currentValue, pool: i }),
      (t.memoizedState = { baseLanes: a, cachePool: i }),
      e !== null && hc(t, null),
      Su(),
      Uf(t),
      e !== null && ln(e, t, l, !0),
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
  function Hd(e, t, a) {
    return (
      jl(t, e.child, null, a),
      (e = Cc(t, t.pendingProps)),
      (e.flags |= 2),
      At(t),
      (t.memoizedState = null),
      e
    );
  }
  function I0(e, t, a) {
    var l = t.pendingProps,
      n = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (he) {
        if (l.mode === 'hidden') return ((e = Cc(t, l)), (t.lanes = 536870912), oi(null, e));
        if (
          (ju(t),
          (e = Me)
            ? ((e = Jm(e, qt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: wa !== null ? { id: ea, overflow: ta } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = bf(e)),
                (a.return = t),
                (t.child = a),
                (et = t),
                (Me = null)))
            : (e = null),
          e === null)
        )
          throw Ra(t);
        return ((t.lanes = 536870912), null);
      }
      return Cc(t, l);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var f = i.dehydrated;
      if ((ju(t), n))
        if (t.flags & 256) ((t.flags &= -257), (t = Hd(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if (($e || ln(e, t, a, !1), (n = (a & e.childLanes) !== 0), $e || n)) {
        if (((l = Ne), l !== null && ((f = Nr(l, a)), f !== 0 && f !== i.retryLane)))
          throw ((i.retryLane = f), vl(e, f), gt(l, e, f), ku);
        (Vc(), (t = Hd(e, t, a)));
      } else
        ((e = i.treeContext),
          (Me = Gt(f.nextSibling)),
          (et = t),
          (he = !0),
          (Oa = null),
          (qt = !1),
          e !== null && jf(t, e),
          (t = Cc(t, l)),
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
  function wc(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Zu(e, t, a, l, n) {
    return (
      _l(t),
      (a = Au(e, t, a, l, void 0, n)),
      (l = Nu()),
      e !== null && !$e
        ? (zu(e, t, n), ha(e, t, n))
        : (he && l && cu(t), (t.flags |= 1), at(e, t, a, n), t.child)
    );
  }
  function qd(e, t, a, l, n, i) {
    return (
      _l(t),
      (t.updateQueue = null),
      (a = Vf(t, l, a, n)),
      Gf(e),
      (l = Nu()),
      e !== null && !$e
        ? (zu(e, t, i), ha(e, t, i))
        : (he && l && cu(t), (t.flags |= 1), at(e, t, a, i), t.child)
    );
  }
  function Ud(e, t, a, l, n) {
    if ((_l(t), t.stateNode === null)) {
      var i = Pl,
        f = a.contextType;
      (typeof f == 'object' && f !== null && (i = tt(f)),
        (i = new a(l, i)),
        (t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = $u),
        (t.stateNode = i),
        (i._reactInternals = t),
        (i = t.stateNode),
        (i.props = l),
        (i.state = t.memoizedState),
        (i.refs = {}),
        gu(t),
        (f = a.contextType),
        (i.context = typeof f == 'object' && f !== null ? tt(f) : Pl),
        (i.state = t.memoizedState),
        (f = a.getDerivedStateFromProps),
        typeof f == 'function' && (Vu(t, a, f, l), (i.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof i.getSnapshotBeforeUpdate == 'function' ||
          (typeof i.UNSAFE_componentWillMount != 'function' &&
            typeof i.componentWillMount != 'function') ||
          ((f = i.state),
          typeof i.componentWillMount == 'function' && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
          f !== i.state && $u.enqueueReplaceState(i, i.state, null),
          ni(t, l, i, n),
          li(),
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
      ((f = Pl), typeof w == 'object' && w !== null && (f = tt(w)));
      var L = a.getDerivedStateFromProps;
      ((w = typeof L == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        w ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((v || N !== f) && Ad(t, i, l, f)),
        (Ba = !1));
      var z = t.memoizedState;
      ((i.state = z),
        ni(t, l, i, n),
        li(),
        (N = t.memoizedState),
        v || z !== N || Ba
          ? (typeof L == 'function' && (Vu(t, a, L, l), (N = t.memoizedState)),
            (_ = Ba || Td(t, a, _, l, z, N, f))
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
        pu(e, t),
        (f = t.memoizedProps),
        (w = Al(a, f)),
        (i.props = w),
        (L = t.pendingProps),
        (z = i.context),
        (N = a.contextType),
        (_ = Pl),
        typeof N == 'object' && N !== null && (_ = tt(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((f !== L || z !== _) && Ad(t, i, l, _)),
        (Ba = !1),
        (z = t.memoizedState),
        (i.state = z),
        ni(t, l, i, n),
        li());
      var M = t.memoizedState;
      f !== L || z !== M || Ba || (e !== null && e.dependencies !== null && dc(e.dependencies))
        ? (typeof v == 'function' && (Vu(t, a, v, l), (M = t.memoizedState)),
          (w =
            Ba ||
            Td(t, a, w, l, z, M, _) ||
            (e !== null && e.dependencies !== null && dc(e.dependencies)))
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
      wc(e, t),
      (l = (t.flags & 128) !== 0),
      i || l
        ? ((i = t.stateNode),
          (a = l && typeof a.getDerivedStateFromError != 'function' ? null : i.render()),
          (t.flags |= 1),
          e !== null && l
            ? ((t.child = jl(t, e.child, null, n)), (t.child = jl(t, null, a, n)))
            : at(e, t, a, n),
          (t.memoizedState = i.state),
          (e = t.child))
        : (e = ha(e, t, n)),
      e
    );
  }
  function Gd(e, t, a, l) {
    return (gl(), (t.flags |= 256), at(e, t, a, l), t.child);
  }
  var Xu = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Qu(e) {
    return { baseLanes: e, cachePool: Mf() };
  }
  function Ku(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= zt), e);
  }
  function Vd(e, t, a) {
    var l = t.pendingProps,
      n = !1,
      i = (t.flags & 128) !== 0,
      f;
    if (
      ((f = i) || (f = e !== null && e.memoizedState === null ? !1 : (He.current & 2) !== 0),
      f && ((n = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (he) {
        if (
          (n ? qa(t) : Ua(),
          (e = Me)
            ? ((e = Jm(e, qt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: wa !== null ? { id: ea, overflow: ta } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = bf(e)),
                (a.return = t),
                (t.child = a),
                (et = t),
                (Me = null)))
            : (e = null),
          e === null)
        )
          throw Ra(t);
        return (wo(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = l.children;
      return (
        (l = l.fallback),
        n
          ? (Ua(),
            (n = t.mode),
            (v = Oc({ mode: 'hidden', children: v }, n)),
            (l = yl(l, n, a, null)),
            (v.return = t),
            (l.return = t),
            (v.sibling = l),
            (t.child = v),
            (l = t.child),
            (l.memoizedState = Qu(a)),
            (l.childLanes = Ku(e, f, a)),
            (t.memoizedState = Xu),
            oi(null, l))
          : (qa(t), Ju(t, v))
      );
    }
    var _ = e.memoizedState;
    if (_ !== null && ((v = _.dehydrated), v !== null)) {
      if (i)
        t.flags & 256
          ? (qa(t), (t.flags &= -257), (t = Wu(e, t, a)))
          : t.memoizedState !== null
            ? (Ua(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Ua(),
              (v = l.fallback),
              (n = t.mode),
              (l = Oc({ mode: 'visible', children: l.children }, n)),
              (v = yl(v, n, a, null)),
              (v.flags |= 2),
              (l.return = t),
              (v.return = t),
              (l.sibling = v),
              (t.child = l),
              jl(t, e.child, null, a),
              (l = t.child),
              (l.memoizedState = Qu(a)),
              (l.childLanes = Ku(e, f, a)),
              (t.memoizedState = Xu),
              (t = oi(null, l)));
      else if ((qa(t), wo(v))) {
        if (((f = v.nextSibling && v.nextSibling.dataset), f)) var N = f.dgst;
        ((f = N),
          (l = Error(o(419))),
          (l.stack = ''),
          (l.digest = f),
          Fn({ value: l, source: null, stack: null }),
          (t = Wu(e, t, a)));
      } else if (($e || ln(e, t, a, !1), (f = (a & e.childLanes) !== 0), $e || f)) {
        if (((f = Ne), f !== null && ((l = Nr(f, a)), l !== 0 && l !== _.retryLane)))
          throw ((_.retryLane = l), vl(e, l), gt(f, e, l), ku);
        (Co(v) || Vc(), (t = Wu(e, t, a)));
      } else
        Co(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = _.treeContext),
            (Me = Gt(v.nextSibling)),
            (et = t),
            (he = !0),
            (Oa = null),
            (qt = !1),
            e !== null && jf(t, e),
            (t = Ju(t, l.children)),
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
        oi(null, l),
        (l = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = Qu(a))
          : ((n = v.cachePool),
            n !== null
              ? ((_ = Ge._currentValue), (n = n.parent !== _ ? { parent: _, pool: _ } : n))
              : (n = Mf()),
            (v = { baseLanes: v.baseLanes | a, cachePool: n })),
        (l.memoizedState = v),
        (l.childLanes = Ku(e, f, a)),
        (t.memoizedState = Xu),
        oi(e.child, l))
      : (qa(t),
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
  function Ju(e, t) {
    return ((t = Oc({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Oc(e, t) {
    return ((e = jt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Wu(e, t, a) {
    return (
      jl(t, e.child, null, a),
      (e = Ju(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function $d(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    (l !== null && (l.lanes |= t), fu(e.return, t, a));
  }
  function Fu(e, t, a, l, n, i) {
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
  function Yd(e, t, a) {
    var l = t.pendingProps,
      n = l.revealOrder,
      i = l.tail;
    l = l.children;
    var f = He.current,
      v = (f & 2) !== 0;
    if (
      (v ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      $(He, f),
      at(e, t, l, a),
      (l = he ? Wn : 0),
      !v && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && $d(e, a, t);
        else if (e.tag === 19) $d(e, a, t);
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
          Fu(t, !1, n, a, i, l));
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
        Fu(t, !0, a, null, i, l);
        break;
      case 'together':
        Fu(t, !1, null, null, void 0, l);
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
  function Iu(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && dc(e)));
  }
  function P0(e, t, a) {
    switch (t.tag) {
      case 3:
        (Ie(t, t.stateNode.containerInfo), Da(t, Ge, e.memoizedState.cache), gl());
        break;
      case 27:
      case 5:
        ol(t);
        break;
      case 4:
        Ie(t, t.stateNode.containerInfo);
        break;
      case 10:
        Da(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), ju(t), null);
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (qa(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? Vd(e, t, a)
              : (qa(t), (e = ha(e, t, a)), e !== null ? e.sibling : null);
        qa(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (
          ((l = (a & t.childLanes) !== 0),
          l || (ln(e, t, a, !1), (l = (a & t.childLanes) !== 0)),
          n)
        ) {
          if (l) return Yd(e, t, a);
          t.flags |= 128;
        }
        if (
          ((n = t.memoizedState),
          n !== null && ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          $(He, He.current),
          l)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Bd(e, t, a, t.pendingProps));
      case 24:
        Da(t, Ge, e.memoizedState.cache);
    }
    return ha(e, t, a);
  }
  function kd(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) $e = !0;
      else {
        if (!Iu(e, a) && (t.flags & 128) === 0) return (($e = !1), P0(e, t, a));
        $e = (e.flags & 131072) !== 0;
      }
    else (($e = !1), he && (t.flags & 1048576) !== 0 && xf(t, Wn, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (((e = Sl(t.elementType)), (t.type = e), typeof e == 'function'))
            lu(e)
              ? ((l = Al(e, l)), (t.tag = 1), (t = Ud(null, t, e, l, a)))
              : ((t.tag = 0), (t = Zu(null, t, e, l, a)));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === we) {
                ((t.tag = 11), (t = Od(null, t, e, l, a)));
                break e;
              } else if (n === I) {
                ((t.tag = 14), (t = Rd(null, t, e, l, a)));
                break e;
              }
            }
            throw ((t = wt(e) || e), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return Zu(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((l = t.type), (n = Al(l, t.pendingProps)), Ud(e, t, l, n, a));
      case 3:
        e: {
          if ((Ie(t, t.stateNode.containerInfo), e === null)) throw Error(o(387));
          l = t.pendingProps;
          var i = t.memoizedState;
          ((n = i.element), pu(e, t), ni(t, l, null, a));
          var f = t.memoizedState;
          if (
            ((l = f.cache),
            Da(t, Ge, l),
            l !== i.cache && du(t, [Ge], a, !0),
            li(),
            (l = f.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: l, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              t = Gd(e, t, l, a);
              break e;
            } else if (l !== n) {
              ((n = Bt(Error(o(424)), t)), Fn(n), (t = Gd(e, t, l, a)));
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
                  et = t,
                  he = !0,
                  Oa = null,
                  qt = !0,
                  a = Bf(t, null, l, a),
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
            at(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          wc(e, t),
          e === null
            ? (a = th(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : he ||
                ((a = t.type),
                (e = t.pendingProps),
                (l = Kc(ie.current).createElement(a)),
                (l[Pe] = t),
                (l[ft] = e),
                lt(l, a, e),
                Je(l),
                (t.stateNode = l))
            : (t.memoizedState = th(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          ol(t),
          e === null &&
            he &&
            ((l = t.stateNode = Im(t.type, t.pendingProps, ie.current)),
            (et = t),
            (qt = !0),
            (n = Me),
            Qa(t.type) ? ((Oo = n), (Me = Gt(l.firstChild))) : (Me = n)),
          at(e, t, t.pendingProps.children, a),
          wc(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            he &&
            ((n = l = Me) &&
              ((l = Mv(l, t.type, t.pendingProps, qt)),
              l !== null
                ? ((t.stateNode = l), (et = t), (Me = Gt(l.firstChild)), (qt = !1), (n = !0))
                : (n = !1)),
            n || Ra(t)),
          ol(t),
          (n = t.type),
          (i = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (l = i.children),
          zo(n, i) ? (l = null) : f !== null && zo(n, f) && (t.flags |= 32),
          t.memoizedState !== null && ((n = Au(e, t, k0, null, null, a)), (Ti._currentValue = n)),
          wc(e, t),
          at(e, t, l, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            he &&
            ((e = a = Me) &&
              ((a = Cv(a, t.pendingProps, qt)),
              a !== null ? ((t.stateNode = a), (et = t), (Me = null), (e = !0)) : (e = !1)),
            e || Ra(t)),
          null
        );
      case 13:
        return Vd(e, t, a);
      case 4:
        return (
          Ie(t, t.stateNode.containerInfo),
          (l = t.pendingProps),
          e === null ? (t.child = jl(t, null, l, a)) : at(e, t, l, a),
          t.child
        );
      case 11:
        return Od(e, t, t.type, t.pendingProps, a);
      case 7:
        return (at(e, t, t.pendingProps, a), t.child);
      case 8:
        return (at(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (at(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((l = t.pendingProps), Da(t, t.type, l.value), at(e, t, l.children, a), t.child);
      case 9:
        return (
          (n = t.type._context),
          (l = t.pendingProps.children),
          _l(t),
          (n = tt(n)),
          (l = l(n)),
          (t.flags |= 1),
          at(e, t, l, a),
          t.child
        );
      case 14:
        return Rd(e, t, t.type, t.pendingProps, a);
      case 15:
        return Dd(e, t, t.type, t.pendingProps, a);
      case 19:
        return Yd(e, t, a);
      case 31:
        return I0(e, t, a);
      case 22:
        return Bd(e, t, a, t.pendingProps);
      case 24:
        return (
          _l(t),
          (l = tt(Ge)),
          e === null
            ? ((n = vu()),
              n === null &&
                ((n = Ne),
                (i = mu()),
                (n.pooledCache = i),
                i.refCount++,
                i !== null && (n.pooledCacheLanes |= a),
                (n = i)),
              (t.memoizedState = { parent: l, cache: n }),
              gu(t),
              Da(t, Ge, n))
            : ((e.lanes & a) !== 0 && (pu(e, t), ni(t, null, null, a), li()),
              (n = e.memoizedState),
              (i = t.memoizedState),
              n.parent !== l
                ? ((n = { parent: l, cache: l }),
                  (t.memoizedState = n),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n),
                  Da(t, Ge, l))
                : ((l = i.cache), Da(t, Ge, l), l !== n.cache && du(t, [Ge], a, !0))),
          at(e, t, t.pendingProps.children, a),
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
  function Pu(e, t, a, l, n) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (n & 335544128) === n))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (gm()) e.flags |= 8192;
        else throw ((xl = yc), yu);
    } else e.flags &= -16777217;
  }
  function Zd(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !ch(t)))
      if (gm()) e.flags |= 8192;
      else throw ((xl = yc), yu);
  }
  function Rc(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? jr() : 536870912), (e.lanes |= t), (yn |= t)));
  }
  function ri(e, t) {
    if (!he)
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
  function ev(e, t, a) {
    var l = t.pendingProps;
    switch ((su(t), t.tag)) {
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
          fa(Ge),
          De(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (an(t)
              ? va(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), ou())),
          Ce(t),
          null
        );
      case 26:
        var n = t.type,
          i = t.memoizedState;
        return (
          e === null
            ? (va(t), i !== null ? (Ce(t), Zd(t, i)) : (Ce(t), Pu(t, n, null, l, a)))
            : i
              ? i !== e.memoizedState
                ? (va(t), Ce(t), Zd(t, i))
                : (Ce(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== l && va(t), Ce(t), Pu(t, n, e, l, a)),
          null
        );
      case 27:
        if ((Hl(t), (a = ie.current), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && va(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(o(166));
            return (Ce(t), null);
          }
          ((e = k.current), an(t) ? Tf(t) : ((e = Im(n, l, a)), (t.stateNode = e), va(t)));
        }
        return (Ce(t), null);
      case 5:
        if ((Hl(t), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && va(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(o(166));
            return (Ce(t), null);
          }
          if (((i = k.current), an(t))) Tf(t);
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
            ((i[Pe] = t), (i[ft] = l));
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
            e: switch ((lt(i, n, l), n)) {
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
        return (Ce(t), Pu(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== l && va(t);
        else {
          if (typeof l != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = ie.current), an(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (l = null), (n = et), n !== null))
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            ((e[Pe] = t),
              (e = !!(
                e.nodeValue === a ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                Vm(e.nodeValue, a)
              )),
              e || Ra(t, !0));
          } else ((e = Kc(e).createTextNode(l)), (e[Pe] = t), (t.stateNode = e));
        }
        return (Ce(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((l = an(t)), a !== null)) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(o(557));
              e[Pe] = t;
            } else (gl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ce(t), (e = !1));
          } else
            ((a = ou()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (At(t), t) : (At(t), null);
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
              n[Pe] = t;
            } else (gl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ce(t), (n = !1));
          } else
            ((n = ou()),
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
              Ce(t),
              null)
        );
      case 4:
        return (De(), e === null && xo(t.stateNode.containerInfo), Ce(t), null);
      case 10:
        return (fa(t.type), Ce(t), null);
      case 19:
        if ((H(He), (l = t.memoizedState), l === null)) return (Ce(t), null);
        if (((n = (t.flags & 128) !== 0), (i = l.rendering), i === null))
          if (n) ri(l, !1);
          else {
            if (Le !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((i = bc(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      ri(l, !1),
                      e = i.updateQueue,
                      t.updateQueue = e,
                      Rc(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (_f(a, e), (a = a.sibling));
                  return ($(He, (He.current & 1) | 2), he && oa(t, l.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            l.tail !== null &&
              _t() > qc &&
              ((t.flags |= 128), (n = !0), ri(l, !1), (t.lanes = 4194304));
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
                ri(l, !0),
                l.tail === null && l.tailMode === 'hidden' && !i.alternate && !he)
              )
                return (Ce(t), null);
            } else
              2 * _t() - l.renderingStartTime > qc &&
                a !== 536870912 &&
                ((t.flags |= 128), (n = !0), ri(l, !1), (t.lanes = 4194304));
          l.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : ((e = l.last), e !== null ? (e.sibling = i) : (t.child = i), (l.last = i));
        }
        return l.tail !== null
          ? ((e = l.tail),
            (l.rendering = e),
            (l.tail = e.sibling),
            (l.renderingStartTime = _t()),
            (e.sibling = null),
            (a = He.current),
            $(He, n ? (a & 1) | 2 : a & 1),
            he && oa(t, l.treeForkCount),
            e)
          : (Ce(t), null);
      case 22:
      case 23:
        return (
          At(t),
          xu(),
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
          e !== null && H(bl),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          fa(Ge),
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
  function tv(e, t) {
    switch ((su(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          fa(Ge),
          De(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Hl(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((At(t), t.alternate === null)) throw Error(o(340));
          gl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((At(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(o(340));
          gl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (H(He), null);
      case 4:
        return (De(), null);
      case 10:
        return (fa(t.type), null);
      case 22:
      case 23:
        return (
          At(t),
          xu(),
          e !== null && H(bl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (fa(Ge), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Xd(e, t) {
    switch ((su(t), t.tag)) {
      case 3:
        (fa(Ge), De());
        break;
      case 26:
      case 27:
      case 5:
        Hl(t);
        break;
      case 4:
        De();
        break;
      case 31:
        t.memoizedState !== null && At(t);
        break;
      case 13:
        At(t);
        break;
      case 19:
        H(He);
        break;
      case 10:
        fa(t.type);
        break;
      case 22:
      case 23:
        (At(t), xu(), e !== null && H(bl));
        break;
      case 24:
        fa(Ge);
    }
  }
  function fi(e, t) {
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
  function Qd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Hf(t, a);
      } catch (l) {
        xe(e, e.return, l);
      }
    }
  }
  function Kd(e, t, a) {
    ((a.props = Al(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (l) {
      xe(e, t, l);
    }
  }
  function di(e, t) {
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
  function Jd(e) {
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
  function eo(e, t, a) {
    try {
      var l = e.stateNode;
      (jv(l, e.type, a, t), (l[ft] = t));
    } catch (n) {
      xe(e, e.return, n);
    }
  }
  function Wd(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Qa(e.type)) || e.tag === 4
    );
  }
  function to(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Wd(e.return)) return null;
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
  function ao(e, t, a) {
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
      for (ao(e, t, a), e = e.sibling; e !== null; ) (ao(e, t, a), (e = e.sibling));
  }
  function Dc(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (l !== 4 && (l === 27 && Qa(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (Dc(e, t, a), e = e.sibling; e !== null; ) (Dc(e, t, a), (e = e.sibling));
  }
  function Fd(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
      (lt(t, l, a), (t[Pe] = e), (t[ft] = a));
    } catch (i) {
      xe(e, e.return, i);
    }
  }
  var ya = !1,
    Ye = !1,
    lo = !1,
    Id = typeof WeakSet == 'function' ? WeakSet : Set,
    We = null;
  function av(e, t) {
    if (((e = e.containerInfo), (Ao = ts), (e = rf(e)), Ws(e))) {
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
    for (No = { focusedElem: e, selectionRange: a }, ts = !1, We = t; We !== null; )
      if (((t = We), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (We = e));
      else
        for (; We !== null; ) {
          switch (((t = We), (i = t.alternate), (e = t.flags), t.tag)) {
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
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) Mo(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Mo(e);
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
            ((e.return = t.return), (We = e));
            break;
          }
          We = t.return;
        }
  }
  function Pd(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (pa(e, a), l & 4 && fi(5, a));
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
        (l & 64 && Qd(a), l & 512 && di(a, a.return));
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
            Hf(e, t);
          } catch (f) {
            xe(a, a.return, f);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Fd(a);
      case 26:
      case 5:
        (pa(e, a), t === null && l & 4 && Jd(a), l & 512 && di(a, a.return));
        break;
      case 12:
        pa(e, a);
        break;
      case 31:
        (pa(e, a), l & 4 && am(e, a));
        break;
      case 13:
        (pa(e, a),
          l & 4 && lm(e, a),
          l & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = fv.bind(null, a)), wv(e, a)))));
        break;
      case 22:
        if (((l = a.memoizedState !== null || ya), !l)) {
          ((t = (t !== null && t.memoizedState !== null) || Ye), (n = ya));
          var i = Ye;
          ((ya = l),
            (Ye = t) && !i ? _a(e, a, (a.subtreeFlags & 8772) !== 0) : pa(e, a),
            (ya = n),
            (Ye = i));
        }
        break;
      case 30:
        break;
      default:
        pa(e, a);
    }
  }
  function em(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), em(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Rs(t)),
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
    for (a = a.child; a !== null; ) (tm(e, t, a), (a = a.sibling));
  }
  function tm(e, t, a) {
    if (bt && typeof bt.onCommitFiberUnmount == 'function')
      try {
        bt.onCommitFiberUnmount(Ln, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (Ye || aa(a, t),
          ga(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        Ye || aa(a, t);
        var l = Oe,
          n = mt;
        (Qa(a.type) && ((Oe = a.stateNode), (mt = !1)),
          ga(e, t, a),
          Si(a.stateNode),
          (Oe = l),
          (mt = n));
        break;
      case 5:
        Ye || aa(a, t);
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
              Qm(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              Tn(e))
            : Qm(Oe, a.stateNode));
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
        (Ga(2, a, t), Ye || Ga(4, a, t), ga(e, t, a));
        break;
      case 1:
        (Ye ||
          (aa(a, t), (l = a.stateNode), typeof l.componentWillUnmount == 'function' && Kd(a, t, l)),
          ga(e, t, a));
        break;
      case 21:
        ga(e, t, a);
        break;
      case 22:
        ((Ye = (l = Ye) || a.memoizedState !== null), ga(e, t, a), (Ye = l));
        break;
      default:
        ga(e, t, a);
    }
  }
  function am(e, t) {
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
  function lm(e, t) {
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
  function lv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Id()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Id()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Bc(e, t) {
    var a = lv(e);
    t.forEach(function (l) {
      if (!a.has(l)) {
        a.add(l);
        var n = dv.bind(null, e, l);
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
        (tm(i, f, n),
          (Oe = null),
          (mt = !1),
          (i = n.alternate),
          i !== null && (i.return = null),
          (n.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (nm(t, e), (t = t.sibling));
  }
  var Xt = null;
  function nm(e, t) {
    var a = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (ht(t, e), vt(e), l & 4 && (Ga(3, e, e.return), fi(3, e), Ga(5, e, e.return)));
        break;
      case 1:
        (ht(t, e),
          vt(e),
          l & 512 && (Ye || a === null || aa(a, a.return)),
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
        if ((ht(t, e), vt(e), l & 512 && (Ye || a === null || aa(a, a.return)), l & 4)) {
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
                          i[Un] ||
                          i[Pe] ||
                          i.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          i.hasAttribute('itemprop')) &&
                          ((i = n.createElement(l)),
                          n.head.insertBefore(i, n.querySelector('head > title'))),
                        lt(i, l, a),
                        (i[Pe] = e),
                        Je(i),
                        (l = i));
                      break e;
                    case 'link':
                      var f = nh('link', 'href', n).get(l + (a.href || ''));
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
                      ((i = n.createElement(l)), lt(i, l, a), n.head.appendChild(i));
                      break;
                    case 'meta':
                      if ((f = nh('meta', 'content', n).get(l + (a.content || '')))) {
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
                      ((i = n.createElement(l)), lt(i, l, a), n.head.appendChild(i));
                      break;
                    default:
                      throw Error(o(468, l));
                  }
                  ((i[Pe] = e), Je(i), (l = i));
                }
                e.stateNode = l;
              } else ih(n, e.type, e.stateNode);
            else e.stateNode = lh(n, l, e.memoizedProps);
          else
            i !== l
              ? (i === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : i.count--,
                l === null ? ih(n, e.type, e.stateNode) : lh(n, l, e.memoizedProps))
              : l === null && e.stateNode !== null && eo(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (ht(t, e),
          vt(e),
          l & 512 && (Ye || a === null || aa(a, a.return)),
          a !== null && l & 4 && eo(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((ht(t, e), vt(e), l & 512 && (Ye || a === null || aa(a, a.return)), e.flags & 32)) {
          n = e.stateNode;
          try {
            Xl(n, '');
          } catch (Y) {
            xe(e, e.return, Y);
          }
        }
        (l & 4 &&
          e.stateNode != null &&
          ((n = e.memoizedProps), eo(e, n, a !== null ? a.memoizedProps : n)),
          l & 1024 && (lo = !0));
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
          ((Fc = null),
          (n = Xt),
          (Xt = Jc(t.containerInfo)),
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
        lo && ((lo = !1), im(e));
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
            (Hc = _t()),
          l & 4 && ((l = e.updateQueue), l !== null && ((e.updateQueue = null), Bc(e, l))));
        break;
      case 22:
        n = e.memoizedState !== null;
        var _ = a !== null && a.memoizedState !== null,
          N = ya,
          w = Ye;
        if (((ya = N || n), (Ye = w || _), ht(t, e), (Ye = w), (ya = N), vt(e), l & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (a === null || _ || ya || Ye || Nl(e)),
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
                  n ? Km(M, !0) : Km(_.stateNode, !1);
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
          if (Wd(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var n = a.stateNode,
              i = to(e);
            Dc(e, i, n);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && (Xl(f, ''), (a.flags &= -33));
            var v = to(e);
            Dc(e, v, f);
            break;
          case 3:
          case 4:
            var _ = a.stateNode.containerInfo,
              N = to(e);
            ao(e, N, _);
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
  function im(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (im(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function pa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Pd(e, t.alternate, t), (t = t.sibling));
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
          (typeof a.componentWillUnmount == 'function' && Kd(t, t.return, a), Nl(t));
          break;
        case 27:
          Si(t.stateNode);
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
          (_a(n, i, a), fi(4, i));
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
                for (n.shared.hiddenCallbacks = null, n = 0; n < _.length; n++) Lf(_[n], v);
            } catch (N) {
              xe(l, l.return, N);
            }
          }
          (a && f & 64 && Qd(i), di(i, i.return));
          break;
        case 27:
          Fd(i);
        case 26:
        case 5:
          (_a(n, i, a), a && l === null && f & 4 && Jd(i), di(i, i.return));
          break;
        case 12:
          _a(n, i, a);
          break;
        case 31:
          (_a(n, i, a), a && f & 4 && am(n, i));
          break;
        case 13:
          (_a(n, i, a), a && f & 4 && lm(n, i));
          break;
        case 22:
          (i.memoizedState === null && _a(n, i, a), di(i, i.return));
          break;
        case 30:
          break;
        default:
          _a(n, i, a);
      }
      t = t.sibling;
    }
  }
  function no(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && In(a)));
  }
  function io(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && In(e)));
  }
  function Qt(e, t, a, l) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (cm(e, t, a, l), (t = t.sibling));
  }
  function cm(e, t, a, l) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Qt(e, t, a, l), n & 2048 && fi(9, t));
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
            t !== e && (t.refCount++, e != null && In(e))));
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
              : mi(e, t)
            : i._visibility & 2
              ? Qt(e, t, a, l)
              : ((i._visibility |= 2), mn(e, t, a, l, (t.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && no(f, t));
        break;
      case 24:
        (Qt(e, t, a, l), n & 2048 && io(t.alternate, t));
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
          (mn(i, f, v, _, n), fi(8, f));
          break;
        case 23:
          break;
        case 22:
          var w = f.stateNode;
          (f.memoizedState !== null
            ? w._visibility & 2
              ? mn(i, f, v, _, n)
              : mi(i, f)
            : ((w._visibility |= 2), mn(i, f, v, _, n)),
            n && N & 2048 && no(f.alternate, f));
          break;
        case 24:
          (mn(i, f, v, _, n), n && N & 2048 && io(f.alternate, f));
          break;
        default:
          mn(i, f, v, _, n);
      }
      t = t.sibling;
    }
  }
  function mi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          l = t,
          n = l.flags;
        switch (l.tag) {
          case 22:
            (mi(a, l), n & 2048 && no(l.alternate, l));
            break;
          case 24:
            (mi(a, l), n & 2048 && io(l.alternate, l));
            break;
          default:
            mi(a, l);
        }
        t = t.sibling;
      }
  }
  var hi = 8192;
  function hn(e, t, a) {
    if (e.subtreeFlags & hi) for (e = e.child; e !== null; ) (sm(e, t, a), (e = e.sibling));
  }
  function sm(e, t, a) {
    switch (e.tag) {
      case 26:
        (hn(e, t, a),
          e.flags & hi && e.memoizedState !== null && Yv(a, Xt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        hn(e, t, a);
        break;
      case 3:
      case 4:
        var l = Xt;
        ((Xt = Jc(e.stateNode.containerInfo)), hn(e, t, a), (Xt = l));
        break;
      case 22:
        e.memoizedState === null &&
          ((l = e.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = hi), (hi = 16777216), hn(e, t, a), (hi = l))
            : hn(e, t, a));
        break;
      default:
        hn(e, t, a);
    }
  }
  function um(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function vi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          ((We = l), rm(l, e));
        }
      um(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (om(e), (e = e.sibling));
  }
  function om(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (vi(e), e.flags & 2048 && Ga(9, e, e.return));
        break;
      case 3:
        vi(e);
        break;
      case 12:
        vi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Lc(e))
          : vi(e);
        break;
      default:
        vi(e);
    }
  }
  function Lc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          ((We = l), rm(l, e));
        }
      um(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Ga(8, t, t.return), Lc(t));
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
  function rm(e, t) {
    for (; We !== null; ) {
      var a = We;
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
          In(a.memoizedState.cache);
      }
      if (((l = a.child), l !== null)) ((l.return = a), (We = l));
      else
        e: for (a = e; We !== null; ) {
          l = We;
          var n = l.sibling,
            i = l.return;
          if ((em(l), l === a)) {
            We = null;
            break e;
          }
          if (n !== null) {
            ((n.return = i), (We = n));
            break e;
          }
          We = i;
        }
    }
  }
  var nv = {
      getCacheForType: function (e) {
        var t = tt(Ge),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return tt(Ge).controller.signal;
      },
    },
    iv = typeof WeakMap == 'function' ? WeakMap : Map,
    pe = 0,
    Ne = null,
    se = null,
    fe = 0,
    Se = 0,
    Nt = null,
    Va = !1,
    vn = !1,
    co = !1,
    ba = 0,
    Le = 0,
    $a = 0,
    zl = 0,
    so = 0,
    zt = 0,
    yn = 0,
    yi = null,
    yt = null,
    uo = !1,
    Hc = 0,
    fm = 0,
    qc = 1 / 0,
    Uc = null,
    Ya = null,
    Ze = 0,
    ka = null,
    gn = null,
    Sa = 0,
    oo = 0,
    ro = null,
    dm = null,
    gi = 0,
    fo = null;
  function Et() {
    return (pe & 2) !== 0 && fe !== 0 ? fe & -fe : R.T !== null ? po() : zr();
  }
  function mm() {
    if (zt === 0)
      if ((fe & 536870912) === 0 || he) {
        var e = Qi;
        ((Qi <<= 1), (Qi & 3932160) === 0 && (Qi = 262144), (zt = e));
      } else zt = 536870912;
    return ((e = Tt.current), e !== null && (e.flags |= 32), zt);
  }
  function gt(e, t, a) {
    (((e === Ne && (Se === 2 || Se === 9)) || e.cancelPendingCommit !== null) &&
      (pn(e, 0), Za(e, fe, zt, !1)),
      qn(e, a),
      ((pe & 2) === 0 || e !== Ne) &&
        (e === Ne && ((pe & 2) === 0 && (zl |= a), Le === 4 && Za(e, fe, zt, !1)), la(e)));
  }
  function hm(e, t, a) {
    if ((pe & 6) !== 0) throw Error(o(327));
    var l = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Hn(e, t),
      n = l ? uv(e, t) : ho(e, t, !0),
      i = l;
    do {
      if (n === 0) {
        vn && !l && Za(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), i && !cv(a))) {
          ((n = ho(e, t, !1)), (i = !1));
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
              n = yi;
              var _ = v.current.memoizedState.isDehydrated;
              if ((_ && (pn(v, f).flags |= 256), (f = ho(v, f, !1)), f !== 2)) {
                if (co && !_) {
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
              Za(l, t, zt, !Va);
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
          if ((t & 62914560) === t && ((n = Hc + 300 - _t()), 10 < n)) {
            if ((Za(l, t, zt, !Va), Ji(l, 0, !0) !== 0)) break e;
            ((Sa = t),
              (l.timeoutHandle = Zm(
                vm.bind(null, l, a, yt, Uc, uo, t, zt, zl, yn, Va, i, 'Throttled', -0, 0),
                n
              )));
            break e;
          }
          vm(l, a, yt, Uc, uo, t, zt, zl, yn, Va, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    la(e);
  }
  function vm(e, t, a, l, n, i, f, v, _, N, w, L, z, M) {
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
        sm(t, i, L));
      var Y = (i & 62914560) === i ? Hc - _t() : (i & 4194048) === i ? fm - _t() : 0;
      if (((Y = kv(L, Y)), Y !== null)) {
        ((Sa = i),
          (e.cancelPendingCommit = Y(jm.bind(null, e, t, i, a, l, n, f, v, _, w, L, null, z, M))),
          Za(e, i, f, !N));
        return;
      }
    }
    jm(e, t, i, a, l, n, f, v, _);
  }
  function cv(e) {
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
  function Za(e, t, a, l) {
    ((t &= ~so),
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
    a !== 0 && Tr(e, a, t);
  }
  function Gc() {
    return (pe & 6) === 0 ? (pi(0), !1) : !0;
  }
  function mo() {
    if (se !== null) {
      if (Se === 0) var e = se.return;
      else ((e = se), (ra = pl = null), Eu(e), (un = null), (ei = 0), (e = se));
      for (; e !== null; ) (Xd(e.alternate, e), (e = e.return));
      se = null;
    }
  }
  function pn(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), Nv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (Sa = 0),
      mo(),
      (Ne = e),
      (se = a = ua(e.current, null)),
      (fe = t),
      (Se = 0),
      (Nt = null),
      (Va = !1),
      (vn = Hn(e, t)),
      (co = !1),
      (yn = zt = so = zl = $a = Le = 0),
      (yt = yi = null),
      (uo = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var n = 31 - St(l),
          i = 1 << n;
        ((t |= e[n]), (l &= ~i));
      }
    return ((ba = t), sc(), a);
  }
  function ym(e, t) {
    ((le = null),
      (R.H = ui),
      t === sn || t === vc
        ? ((t = Of()), (Se = 3))
        : t === yu
          ? ((t = Of()), (Se = 4))
          : (Se =
              t === ku
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Nt = t),
      se === null && ((Le = 1), Mc(e, Bt(t, e.current))));
  }
  function gm() {
    var e = Tt.current;
    return e === null
      ? !0
      : (fe & 4194048) === fe
        ? Ut === null
        : (fe & 62914560) === fe || (fe & 536870912) !== 0
          ? e === Ut
          : !1;
  }
  function pm() {
    var e = R.H;
    return ((R.H = ui), e === null ? ui : e);
  }
  function _m() {
    var e = R.A;
    return ((R.A = nv), e);
  }
  function Vc() {
    ((Le = 4),
      Va || ((fe & 4194048) !== fe && Tt.current !== null) || (vn = !0),
      (($a & 134217727) === 0 && (zl & 134217727) === 0) || Ne === null || Za(Ne, fe, zt, !1));
  }
  function ho(e, t, a) {
    var l = pe;
    pe |= 2;
    var n = pm(),
      i = _m();
    ((Ne !== e || fe !== t) && ((Uc = null), pn(e, t)), (t = !1));
    var f = Le;
    e: do
      try {
        if (Se !== 0 && se !== null) {
          var v = se,
            _ = Nt;
          switch (Se) {
            case 8:
              (mo(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Tt.current === null && (t = !0);
              var N = Se;
              if (((Se = 0), (Nt = null), _n(e, v, _, N), a && vn)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((N = Se), (Se = 0), (Nt = null), _n(e, v, _, N));
          }
        }
        (sv(), (f = Le));
        break;
      } catch (w) {
        ym(e, w);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (ra = pl = null),
      (pe = l),
      (R.H = n),
      (R.A = i),
      se === null && ((Ne = null), (fe = 0), sc()),
      f
    );
  }
  function sv() {
    for (; se !== null; ) bm(se);
  }
  function uv(e, t) {
    var a = pe;
    pe |= 2;
    var l = pm(),
      n = _m();
    Ne !== e || fe !== t ? ((Uc = null), (qc = _t() + 500), pn(e, t)) : (vn = Hn(e, t));
    e: do
      try {
        if (Se !== 0 && se !== null) {
          t = se;
          var i = Nt;
          t: switch (Se) {
            case 1:
              ((Se = 0), (Nt = null), _n(e, t, i, 1));
              break;
            case 2:
            case 9:
              if (Cf(i)) {
                ((Se = 0), (Nt = null), Sm(t));
                break;
              }
              ((t = function () {
                ((Se !== 2 && Se !== 9) || Ne !== e || (Se = 7), la(e));
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
              Cf(i) ? ((Se = 0), (Nt = null), Sm(t)) : ((Se = 0), (Nt = null), _n(e, t, i, 7));
              break;
            case 5:
              var f = null;
              switch (se.tag) {
                case 26:
                  f = se.memoizedState;
                case 5:
                case 27:
                  var v = se;
                  if (f ? ch(f) : v.stateNode.complete) {
                    ((Se = 0), (Nt = null));
                    var _ = v.sibling;
                    if (_ !== null) se = _;
                    else {
                      var N = v.return;
                      N !== null ? ((se = N), $c(N)) : (se = null);
                    }
                    break t;
                  }
              }
              ((Se = 0), (Nt = null), _n(e, t, i, 5));
              break;
            case 6:
              ((Se = 0), (Nt = null), _n(e, t, i, 6));
              break;
            case 8:
              (mo(), (Le = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        ov();
        break;
      } catch (w) {
        ym(e, w);
      }
    while (!0);
    return (
      (ra = pl = null),
      (R.H = l),
      (R.A = n),
      (pe = a),
      se !== null ? 0 : ((Ne = null), (fe = 0), sc(), Le)
    );
  }
  function ov() {
    for (; se !== null && !O1(); ) bm(se);
  }
  function bm(e) {
    var t = kd(e.alternate, e, ba);
    ((e.memoizedProps = e.pendingProps), t === null ? $c(e) : (se = t));
  }
  function Sm(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = qd(a, t, t.pendingProps, t.type, void 0, fe);
        break;
      case 11:
        t = qd(a, t, t.pendingProps, t.type.render, t.ref, fe);
        break;
      case 5:
        Eu(t);
      default:
        (Xd(a, t), (t = se = _f(t, ba)), (t = kd(a, t, ba)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? $c(e) : (se = t));
  }
  function _n(e, t, a, l) {
    ((ra = pl = null), Eu(t), (un = null), (ei = 0));
    var n = t.return;
    try {
      if (F0(e, n, t, a, fe)) {
        ((Le = 1), Mc(e, Bt(a, e.current)), (se = null));
        return;
      }
    } catch (i) {
      if (n !== null) throw ((se = n), i);
      ((Le = 1), Mc(e, Bt(a, e.current)), (se = null));
      return;
    }
    t.flags & 32768
      ? (he || l === 1
          ? (e = !0)
          : vn || (fe & 536870912) !== 0
            ? (e = !1)
            : ((Va = e = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = Tt.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
        xm(t, e))
      : $c(t);
  }
  function $c(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        xm(t, Va);
        return;
      }
      e = t.return;
      var a = ev(t.alternate, t, ba);
      if (a !== null) {
        se = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        se = t;
        return;
      }
      se = t = e;
    } while (t !== null);
    Le === 0 && (Le = 5);
  }
  function xm(e, t) {
    do {
      var a = tv(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (se = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        se = e;
        return;
      }
      se = e = a;
    } while (e !== null);
    ((Le = 6), (se = null));
  }
  function jm(e, t, a, l, n, i, f, v, _) {
    e.cancelPendingCommit = null;
    do Yc();
    while (Ze !== 0);
    if ((pe & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((i = t.lanes | t.childLanes),
        (i |= tu),
        $1(e, a, i, f, v, _),
        e === Ne && ((se = Ne = null), (fe = 0)),
        (gn = t),
        (ka = e),
        (Sa = a),
        (oo = i),
        (ro = n),
        (dm = l),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            mv(Zi, function () {
              return (Em(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = R.T), (R.T = null), (n = V.p), (V.p = 2), (f = pe), (pe |= 4));
        try {
          av(e, t, a);
        } finally {
          ((pe = f), (V.p = n), (R.T = l));
        }
      }
      ((Ze = 1), Tm(), Am(), Nm());
    }
  }
  function Tm() {
    if (Ze === 1) {
      Ze = 0;
      var e = ka,
        t = gn,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = R.T), (R.T = null));
        var l = V.p;
        V.p = 2;
        var n = pe;
        pe |= 4;
        try {
          nm(t, e);
          var i = No,
            f = rf(e.containerInfo),
            v = i.focusedElem,
            _ = i.selectionRange;
          if (f !== v && v && v.ownerDocument && of(v.ownerDocument.documentElement, v)) {
            if (_ !== null && Ws(v)) {
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
                  var j = uf(v, J),
                    S = uf(v, Ae);
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
          ((ts = !!Ao), (No = Ao = null));
        } finally {
          ((pe = n), (V.p = l), (R.T = a));
        }
      }
      ((e.current = t), (Ze = 2));
    }
  }
  function Am() {
    if (Ze === 2) {
      Ze = 0;
      var e = ka,
        t = gn,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = R.T), (R.T = null));
        var l = V.p;
        V.p = 2;
        var n = pe;
        pe |= 4;
        try {
          Pd(e, t.alternate, t);
        } finally {
          ((pe = n), (V.p = l), (R.T = a));
        }
      }
      Ze = 3;
    }
  }
  function Nm() {
    if (Ze === 4 || Ze === 3) {
      ((Ze = 0), R1());
      var e = ka,
        t = gn,
        a = Sa,
        l = dm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ze = 5)
        : ((Ze = 0), (gn = ka = null), zm(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (
        (n === 0 && (Ya = null),
        ws(a),
        (t = t.stateNode),
        bt && typeof bt.onCommitFiberRoot == 'function')
      )
        try {
          bt.onCommitFiberRoot(Ln, t, void 0, (t.current.flags & 128) === 128);
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
      ((Sa & 3) !== 0 && Yc(),
        la(e),
        (n = e.pendingLanes),
        (a & 261930) !== 0 && (n & 42) !== 0 ? (e === fo ? gi++ : ((gi = 0), (fo = e))) : (gi = 0),
        pi(0));
    }
  }
  function zm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), In(t)));
  }
  function Yc() {
    return (Tm(), Am(), Nm(), Em());
  }
  function Em() {
    if (Ze !== 5) return !1;
    var e = ka,
      t = oo;
    oo = 0;
    var a = ws(Sa),
      l = R.T,
      n = V.p;
    try {
      ((V.p = 32 > a ? 32 : a), (R.T = null), (a = ro), (ro = null));
      var i = ka,
        f = Sa;
      if (((Ze = 0), (gn = ka = null), (Sa = 0), (pe & 6) !== 0)) throw Error(o(331));
      var v = pe;
      if (
        ((pe |= 4),
        om(i.current),
        cm(i, i.current, f, a),
        (pe = v),
        pi(0, !1),
        bt && typeof bt.onPostCommitFiberRoot == 'function')
      )
        try {
          bt.onPostCommitFiberRoot(Ln, i);
        } catch {}
      return !0;
    } finally {
      ((V.p = n), (R.T = l), zm(e, t));
    }
  }
  function Mm(e, t, a) {
    ((t = Bt(a, t)),
      (t = Yu(e.stateNode, t, 2)),
      (e = Ha(e, t, 2)),
      e !== null && (qn(e, 2), la(e)));
  }
  function xe(e, t, a) {
    if (e.tag === 3) Mm(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Mm(t, e, a);
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof l.componentDidCatch == 'function' && (Ya === null || !Ya.has(l)))
          ) {
            ((e = Bt(a, e)),
              (a = Cd(2)),
              (l = Ha(t, a, 2)),
              l !== null && (wd(a, l, t, e), qn(l, 2), la(l)));
            break;
          }
        }
        t = t.return;
      }
  }
  function vo(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new iv();
      var n = new Set();
      l.set(t, n);
    } else ((n = l.get(t)), n === void 0 && ((n = new Set()), l.set(t, n)));
    n.has(a) || ((co = !0), n.add(a), (e = rv.bind(null, e, t, a)), t.then(e, e));
  }
  function rv(e, t, a) {
    var l = e.pingCache;
    (l !== null && l.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ne === e &&
        (fe & a) === a &&
        (Le === 4 || (Le === 3 && (fe & 62914560) === fe && 300 > _t() - Hc)
          ? (pe & 2) === 0 && pn(e, 0)
          : (so |= a),
        yn === fe && (yn = 0)),
      la(e));
  }
  function Cm(e, t) {
    (t === 0 && (t = jr()), (e = vl(e, t)), e !== null && (qn(e, t), la(e)));
  }
  function fv(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), Cm(e, a));
  }
  function dv(e, t) {
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
    (l !== null && l.delete(t), Cm(e, a));
  }
  function mv(e, t) {
    return zs(e, t);
  }
  var kc = null,
    bn = null,
    yo = !1,
    Zc = !1,
    go = !1,
    Xa = 0;
  function la(e) {
    (e !== bn && e.next === null && (bn === null ? (kc = bn = e) : (bn = bn.next = e)),
      (Zc = !0),
      yo || ((yo = !0), vv()));
  }
  function pi(e, t) {
    if (!go && Zc) {
      go = !0;
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
            i !== 0 && ((a = !0), Dm(l, i));
          } else
            ((i = fe),
              (i = Ji(
                l,
                l === Ne ? i : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1
              )),
              (i & 3) === 0 || Hn(l, i) || ((a = !0), Dm(l, i)));
          l = l.next;
        }
      while (a);
      go = !1;
    }
  }
  function hv() {
    wm();
  }
  function wm() {
    Zc = yo = !1;
    var e = 0;
    Xa !== 0 && Av() && (e = Xa);
    for (var t = _t(), a = null, l = kc; l !== null; ) {
      var n = l.next,
        i = Om(l, t);
      (i === 0
        ? ((l.next = null), a === null ? (kc = n) : (a.next = n), n === null && (bn = a))
        : ((a = l), (e !== 0 || (i & 3) !== 0) && (Zc = !0)),
        (l = n));
    }
    ((Ze !== 0 && Ze !== 5) || pi(e), Xa !== 0 && (Xa = 0));
  }
  function Om(e, t) {
    for (
      var a = e.suspendedLanes,
        l = e.pingedLanes,
        n = e.expirationTimes,
        i = e.pendingLanes & -62914561;
      0 < i;
    ) {
      var f = 31 - St(i),
        v = 1 << f,
        _ = n[f];
      (_ === -1
        ? ((v & a) === 0 || (v & l) !== 0) && (n[f] = V1(v, t))
        : _ <= t && (e.expiredLanes |= v),
        (i &= ~v));
    }
    if (
      ((t = Ne),
      (a = fe),
      (a = Ji(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (l = e.callbackNode),
      a === 0 || (e === t && (Se === 2 || Se === 9)) || e.cancelPendingCommit !== null)
    )
      return (l !== null && l !== null && Es(l), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Hn(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((l !== null && Es(l), ws(a))) {
        case 2:
        case 8:
          a = Sr;
          break;
        case 32:
          a = Zi;
          break;
        case 268435456:
          a = xr;
          break;
        default:
          a = Zi;
      }
      return (
        (l = Rm.bind(null, e)),
        (a = zs(a, l)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      l !== null && l !== null && Es(l),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Rm(e, t) {
    if (Ze !== 0 && Ze !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (Yc() && e.callbackNode !== a) return null;
    var l = fe;
    return (
      (l = Ji(e, e === Ne ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      l === 0
        ? null
        : (hm(e, l, t),
          Om(e, _t()),
          e.callbackNode != null && e.callbackNode === a ? Rm.bind(null, e) : null)
    );
  }
  function Dm(e, t) {
    if (Yc()) return null;
    hm(e, t, !0);
  }
  function vv() {
    zv(function () {
      (pe & 6) !== 0 ? zs(br, hv) : wm();
    });
  }
  function po() {
    if (Xa === 0) {
      var e = nn;
      (e === 0 && ((e = Xi), (Xi <<= 1), (Xi & 261888) === 0 && (Xi = 256)), (Xa = e));
    }
    return Xa;
  }
  function Bm(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Pi('' + e);
  }
  function Lm(e, t) {
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
  function yv(e, t, a, l, n) {
    if (t === 'submit' && a && a.stateNode === n) {
      var i = Bm((n[ft] || null).action),
        f = l.submitter;
      f &&
        ((t = (t = f[ft] || null) ? Bm(t.formAction) : f.getAttribute('formAction')),
        t !== null && ((i = t), (f = null)));
      var v = new lc('action', 'action', null, l, n);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Xa !== 0) {
                  var _ = f ? Lm(n, f) : new FormData(n);
                  Hu(a, { pending: !0, data: _, method: n.method, action: i }, null, _);
                }
              } else
                typeof i == 'function' &&
                  (v.preventDefault(),
                  (_ = f ? Lm(n, f) : new FormData(n)),
                  Hu(a, { pending: !0, data: _, method: n.method, action: i }, i, _));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var _o = 0; _o < eu.length; _o++) {
    var bo = eu[_o],
      gv = bo.toLowerCase(),
      pv = bo[0].toUpperCase() + bo.slice(1);
    Zt(gv, 'on' + pv);
  }
  (Zt(mf, 'onAnimationEnd'),
    Zt(hf, 'onAnimationIteration'),
    Zt(vf, 'onAnimationStart'),
    Zt('dblclick', 'onDoubleClick'),
    Zt('focusin', 'onFocus'),
    Zt('focusout', 'onBlur'),
    Zt(D0, 'onTransitionRun'),
    Zt(B0, 'onTransitionStart'),
    Zt(L0, 'onTransitionCancel'),
    Zt(yf, 'onTransitionEnd'),
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
  var _i =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    _v = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(_i)
    );
  function Hm(e, t) {
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
              cc(w);
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
              cc(w);
            }
            ((n.currentTarget = null), (i = _));
          }
      }
    }
  }
  function ue(e, t) {
    var a = t[Os];
    a === void 0 && (a = t[Os] = new Set());
    var l = e + '__bubble';
    a.has(l) || (qm(t, e, 2, !1), a.add(l));
  }
  function So(e, t, a) {
    var l = 0;
    (t && (l |= 4), qm(a, e, l, t));
  }
  var Xc = '_reactListening' + Math.random().toString(36).slice(2);
  function xo(e) {
    if (!e[Xc]) {
      ((e[Xc] = !0),
        Cr.forEach(function (a) {
          a !== 'selectionchange' && (_v.has(a) || So(a, !1, e), So(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Xc] || ((t[Xc] = !0), So('selectionchange', !1, t));
    }
  }
  function qm(e, t, a, l) {
    switch (mh(t)) {
      case 2:
        var n = Qv;
        break;
      case 8:
        n = Kv;
        break;
      default:
        n = Ho;
    }
    ((a = n.bind(null, t, a, e)),
      (n = void 0),
      !Vs || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (n = !0),
      l
        ? n !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: n })
          : e.addEventListener(t, a, !0)
        : n !== void 0
          ? e.addEventListener(t, a, { passive: n })
          : e.addEventListener(t, a, !1));
  }
  function jo(e, t, a, l, n) {
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
    $r(function () {
      var N = i,
        w = Us(a),
        L = [];
      e: {
        var z = gf.get(e);
        if (z !== void 0) {
          var M = lc,
            Y = e;
          switch (e) {
            case 'keypress':
              if (tc(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              M = d0;
              break;
            case 'focusin':
              ((Y = 'focus'), (M = Zs));
              break;
            case 'focusout':
              ((Y = 'blur'), (M = Zs));
              break;
            case 'beforeblur':
            case 'afterblur':
              M = Zs;
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
              M = Zr;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              M = e0;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              M = v0;
              break;
            case mf:
            case hf:
            case vf:
              M = l0;
              break;
            case yf:
              M = g0;
              break;
            case 'scroll':
            case 'scrollend':
              M = I1;
              break;
            case 'wheel':
              M = _0;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              M = i0;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              M = Qr;
              break;
            case 'toggle':
            case 'beforetoggle':
              M = S0;
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
                ((B = Vn(S, j)), B != null && J.push(bi(S, B, A))),
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
            z && a !== qs && (Y = a.relatedTarget || a.fromElement) && (Vl(Y) || Y[Gl]))
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
              ((J = Zr),
              (B = 'onMouseLeave'),
              (j = 'onMouseEnter'),
              (S = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((J = Qr), (B = 'onPointerLeave'), (j = 'onPointerEnter'), (S = 'pointer')),
              (Ae = M == null ? z : Gn(M)),
              (A = Y == null ? z : Gn(Y)),
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
                for (J = bv, j = M, S = Y, A = 0, B = j; B; B = J(B)) A++;
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
            (M !== null && Um(L, z, M, J, !1), Y !== null && Ae !== null && Um(L, Ae, Y, J, !0));
          }
        }
        e: {
          if (
            ((z = N ? Gn(N) : window),
            (M = z.nodeName && z.nodeName.toLowerCase()),
            M === 'select' || (M === 'input' && z.type === 'file'))
          )
            var ye = tf;
          else if (Pr(z))
            if (af) ye = w0;
            else {
              ye = M0;
              var Z = E0;
            }
          else
            ((M = z.nodeName),
              !M || M.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? N && Hs(N.elementType) && (ye = tf)
                : (ye = C0));
          if (ye && (ye = ye(e, N))) {
            ef(L, ye, a, w);
            break e;
          }
          (Z && Z(e, z, N),
            e === 'focusout' &&
              N &&
              z.type === 'number' &&
              N.memoizedProps.value != null &&
              Ls(z, 'number', z.value));
        }
        switch (((Z = N ? Gn(N) : window), e)) {
          case 'focusin':
            (Pr(Z) || Z.contentEditable === 'true') && ((Wl = Z), (Fs = N), (Jn = null));
            break;
          case 'focusout':
            Jn = Fs = Wl = null;
            break;
          case 'mousedown':
            Is = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Is = !1), ff(L, a, w));
            break;
          case 'selectionchange':
            if (R0) break;
          case 'keydown':
          case 'keyup':
            ff(L, a, w);
        }
        var ne;
        if (Qs)
          e: {
            switch (e) {
              case 'compositionstart':
                var de = 'onCompositionStart';
                break e;
              case 'compositionend':
                de = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                de = 'onCompositionUpdate';
                break e;
            }
            de = void 0;
          }
        else
          Jl
            ? Fr(e, a) && (de = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (de = 'onCompositionStart');
        (de &&
          (Kr &&
            a.locale !== 'ko' &&
            (Jl || de !== 'onCompositionStart'
              ? de === 'onCompositionEnd' && Jl && (ne = Yr())
              : ((Ca = w), ($s = 'value' in Ca ? Ca.value : Ca.textContent), (Jl = !0))),
          (Z = Qc(N, de)),
          0 < Z.length &&
            ((de = new Xr(de, e, null, a, w)),
            L.push({ event: de, listeners: Z }),
            ne ? (de.data = ne) : ((ne = Ir(a)), ne !== null && (de.data = ne)))),
          (ne = j0 ? T0(e, a) : A0(e, a)) &&
            ((de = Qc(N, 'onBeforeInput')),
            0 < de.length &&
              ((Z = new Xr('onBeforeInput', 'beforeinput', null, a, w)),
              L.push({ event: Z, listeners: de }),
              (Z.data = ne))),
          yv(L, e, N, a, w));
      }
      Hm(L, t);
    });
  }
  function bi(e, t, a) {
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
          ((n = Vn(e, a)),
          n != null && l.unshift(bi(e, n, i)),
          (n = Vn(e, t)),
          n != null && l.push(bi(e, n, i))),
        e.tag === 3)
      )
        return l;
      e = e.return;
    }
    return [];
  }
  function bv(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Um(e, t, a, l, n) {
    for (var i = t._reactName, f = []; a !== null && a !== l; ) {
      var v = a,
        _ = v.alternate,
        N = v.stateNode;
      if (((v = v.tag), _ !== null && _ === l)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        N === null ||
        ((_ = N),
        n
          ? ((N = Vn(a, i)), N != null && f.unshift(bi(a, N, _)))
          : n || ((N = Vn(a, i)), N != null && f.push(bi(a, N, _)))),
        (a = a.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var Sv = /\r\n?/g,
    xv = /\u0000|\uFFFD/g;
  function Gm(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Sv,
        `
`
      )
      .replace(xv, '');
  }
  function Vm(e, t) {
    return ((t = Gm(t)), Gm(e) === t);
  }
  function Te(e, t, a, l, n, i) {
    switch (a) {
      case 'children':
        typeof l == 'string'
          ? t === 'body' || (t === 'textarea' && l === '') || Xl(e, l)
          : (typeof l == 'number' || typeof l == 'bigint') && t !== 'body' && Xl(e, '' + l);
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
        Gr(e, l, i);
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
        ((l = Pi('' + l)), e.setAttribute(a, l));
        break;
      case 'onClick':
        l != null && (e.onclick = ca);
        break;
      case 'onScroll':
        l != null && ue('scroll', e);
        break;
      case 'onScrollEnd':
        l != null && ue('scrollend', e);
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
        (ue('beforetoggle', e), ue('toggle', e), Wi(e, 'popover', l));
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
        Wi(e, 'is', l);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = W1.get(a) || a), Wi(e, a, l));
    }
  }
  function To(e, t, a, l, n, i) {
    switch (a) {
      case 'style':
        Gr(e, l, i);
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
        l != null && ue('scroll', e);
        break;
      case 'onScrollEnd':
        l != null && ue('scrollend', e);
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
        if (!wr.hasOwnProperty(a))
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
  function lt(e, t, a) {
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
        (ue('error', e), ue('load', e));
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
        ue('invalid', e);
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
        Lr(e, i, v, _, N, f, n, !1);
        return;
      case 'select':
        (ue('invalid', e), (l = f = i = null));
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
        (ue('invalid', e), (i = n = l = null));
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
        qr(e, l, n, i);
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
        (ue('beforetoggle', e), ue('toggle', e), ue('cancel', e), ue('close', e));
        break;
      case 'iframe':
      case 'object':
        ue('load', e);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < _i.length; l++) ue(_i[l], e);
        break;
      case 'image':
        (ue('error', e), ue('load', e));
        break;
      case 'details':
        ue('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (ue('error', e), ue('load', e));
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
        if (Hs(t)) {
          for (w in a)
            a.hasOwnProperty(w) && ((l = a[w]), l !== void 0 && To(e, t, w, l, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((l = a[v]), l != null && Te(e, t, v, l, a, null));
  }
  function jv(e, t, a, l) {
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
        Bs(e, f, v, _, N, w, i, n);
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
        Hr(e, z, M);
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
        if (Hs(t)) {
          for (var Ae in a)
            ((z = a[Ae]),
              a.hasOwnProperty(Ae) &&
                z !== void 0 &&
                !l.hasOwnProperty(Ae) &&
                To(e, t, Ae, void 0, l, z));
          for (w in l)
            ((z = l[w]),
              (M = a[w]),
              !l.hasOwnProperty(w) ||
                z === M ||
                (z === void 0 && M === void 0) ||
                To(e, t, w, z, l, M));
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
  function $m(e) {
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
  function Tv() {
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
        if (i && v && $m(f)) {
          for (f = 0, v = n.responseEnd, l += 1; l < a.length; l++) {
            var _ = a[l],
              N = _.startTime;
            if (N > v) break;
            var w = _.transferSize,
              L = _.initiatorType;
            w && $m(L) && ((_ = _.responseEnd), (f += w * (_ < v ? 1 : (v - N) / (_ - N))));
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
  var Ao = null,
    No = null;
  function Kc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Ym(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function km(e, t) {
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
  function zo(e, t) {
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
  var Eo = null;
  function Av() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Eo ? !1 : ((Eo = e), !0)) : ((Eo = null), !1);
  }
  var Zm = typeof setTimeout == 'function' ? setTimeout : void 0,
    Nv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Xm = typeof Promise == 'function' ? Promise : void 0,
    zv =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Xm < 'u'
          ? function (e) {
              return Xm.resolve(null).then(e).catch(Ev);
            }
          : Zm;
  function Ev(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Qa(e) {
    return e === 'head';
  }
  function Qm(e, t) {
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
        else if (a === 'html') Si(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), Si(a));
          for (var i = a.firstChild; i; ) {
            var f = i.nextSibling,
              v = i.nodeName;
            (i[Un] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(i),
              (i = f));
          }
        } else a === 'body' && Si(e.ownerDocument.body);
      a = n;
    } while (a);
    Tn(t);
  }
  function Km(e, t) {
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
  function Mo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Mo(a), Rs(a));
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
  function Mv(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var n = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (l) {
        if (!e[Un])
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
  function Cv(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = Gt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Jm(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Gt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Co(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function wo(e) {
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
  var Oo = null;
  function Wm(e) {
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
  function Fm(e) {
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
  function Im(e, t, a) {
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
  function Si(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Rs(e);
  }
  var Vt = new Map(),
    Pm = new Set();
  function Jc(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var xa = V.d;
  V.d = { f: Ov, r: Rv, D: Dv, C: Bv, L: Lv, m: Hv, X: Uv, S: qv, M: Gv };
  function Ov() {
    var e = xa.f(),
      t = Gc();
    return e || t;
  }
  function Rv(e) {
    var t = $l(e);
    t !== null && t.tag === 5 && t.type === 'form' ? yd(t) : xa.r(e);
  }
  var Sn = typeof document > 'u' ? null : document;
  function eh(e, t, a) {
    var l = Sn;
    if (l && typeof t == 'string' && t) {
      var n = Rt(t);
      ((n = 'link[rel="' + e + '"][href="' + n + '"]'),
        typeof a == 'string' && (n += '[crossorigin="' + a + '"]'),
        Pm.has(n) ||
          (Pm.add(n),
          (e = { rel: e, crossOrigin: a, href: t }),
          l.querySelector(n) === null &&
            ((t = l.createElement('link')), lt(t, 'link', e), Je(t), l.head.appendChild(t))));
    }
  }
  function Dv(e) {
    (xa.D(e), eh('dns-prefetch', e, null));
  }
  function Bv(e, t) {
    (xa.C(e, t), eh('preconnect', e, t));
  }
  function Lv(e, t, a) {
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
          (t === 'style' && l.querySelector(xi(i))) ||
          (t === 'script' && l.querySelector(ji(i))) ||
          ((t = l.createElement('link')), lt(t, 'link', e), Je(t), l.head.appendChild(t)));
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
            if (a.querySelector(ji(i))) return;
        }
        ((l = a.createElement('link')), lt(l, 'link', e), Je(l), a.head.appendChild(l));
      }
    }
  }
  function qv(e, t, a) {
    xa.S(e, t, a);
    var l = Sn;
    if (l && e) {
      var n = Yl(l).hoistableStyles,
        i = xn(e);
      t = t || 'default';
      var f = n.get(i);
      if (!f) {
        var v = { loading: 0, preload: null };
        if ((f = l.querySelector(xi(i)))) v.loading = 5;
        else {
          ((e = T({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Vt.get(i)) && Ro(e, a));
          var _ = (f = l.createElement('link'));
          (Je(_),
            lt(_, 'link', e),
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
            Wc(f, t, l));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: v }), n.set(i, f));
      }
    }
  }
  function Uv(e, t) {
    xa.X(e, t);
    var a = Sn;
    if (a && e) {
      var l = Yl(a).hoistableScripts,
        n = jn(e),
        i = l.get(n);
      i ||
        ((i = a.querySelector(ji(n))),
        i ||
          ((e = T({ src: e, async: !0 }, t)),
          (t = Vt.get(n)) && Do(e, t),
          (i = a.createElement('script')),
          Je(i),
          lt(i, 'link', e),
          a.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        l.set(n, i));
    }
  }
  function Gv(e, t) {
    xa.M(e, t);
    var a = Sn;
    if (a && e) {
      var l = Yl(a).hoistableScripts,
        n = jn(e),
        i = l.get(n);
      i ||
        ((i = a.querySelector(ji(n))),
        i ||
          ((e = T({ src: e, async: !0, type: 'module' }, t)),
          (t = Vt.get(n)) && Do(e, t),
          (i = a.createElement('script')),
          Je(i),
          lt(i, 'link', e),
          a.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        l.set(n, i));
    }
  }
  function th(e, t, a, l) {
    var n = (n = ie.current) ? Jc(n) : null;
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
              (i = n.querySelector(xi(e))) && !i._p && ((f.instance = i), (f.state.loading = 5)),
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
                i || Vv(n, e, a, f.state))),
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
  function xi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function ah(e) {
    return T({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function Vv(e, t, a, l) {
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
        lt(t, 'link', a),
        Je(t),
        e.head.appendChild(t));
  }
  function jn(e) {
    return '[src="' + Rt(e) + '"]';
  }
  function ji(e) {
    return 'script[async]' + e;
  }
  function lh(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var l = e.querySelector('style[data-href~="' + Rt(a.href) + '"]');
          if (l) return ((t.instance = l), Je(l), l);
          var n = T({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (e.ownerDocument || e).createElement('style')),
            Je(l),
            lt(l, 'style', n),
            Wc(l, a.precedence, e),
            (t.instance = l)
          );
        case 'stylesheet':
          n = xn(a.href);
          var i = e.querySelector(xi(n));
          if (i) return ((t.state.loading |= 4), (t.instance = i), Je(i), i);
          ((l = ah(a)),
            (n = Vt.get(n)) && Ro(l, n),
            (i = (e.ownerDocument || e).createElement('link')),
            Je(i));
          var f = i;
          return (
            (f._p = new Promise(function (v, _) {
              ((f.onload = v), (f.onerror = _));
            })),
            lt(i, 'link', l),
            (t.state.loading |= 4),
            Wc(i, a.precedence, e),
            (t.instance = i)
          );
        case 'script':
          return (
            (i = jn(a.src)),
            (n = e.querySelector(ji(i)))
              ? ((t.instance = n), Je(n), n)
              : ((l = a),
                (n = Vt.get(i)) && ((l = T({}, a)), Do(l, n)),
                (e = e.ownerDocument || e),
                (n = e.createElement('script')),
                Je(n),
                lt(n, 'link', l),
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
  function Ro(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Do(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Fc = null;
  function nh(e, t, a) {
    if (Fc === null) {
      var l = new Map(),
        n = (Fc = new Map());
      n.set(a, l);
    } else ((n = Fc), (l = n.get(a)), l || ((l = new Map()), n.set(a, l)));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var i = a[n];
      if (
        !(i[Un] || i[Pe] || (e === 'link' && i.getAttribute('rel') === 'stylesheet')) &&
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
  function ih(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function $v(e, t, a) {
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
  function ch(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function Yv(e, t, a, l) {
    if (
      a.type === 'stylesheet' &&
      (typeof l.media != 'string' || matchMedia(l.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var n = xn(l.href),
          i = t.querySelector(xi(n));
        if (i) {
          ((t = i._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Ic.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = i),
            Je(i));
          return;
        }
        ((i = t.ownerDocument || t),
          (l = ah(l)),
          (n = Vt.get(n)) && Ro(l, n),
          (i = i.createElement('link')),
          Je(i));
        var f = i;
        ((f._p = new Promise(function (v, _) {
          ((f.onload = v), (f.onerror = _));
        })),
          lt(i, 'link', l),
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
  var Bo = 0;
  function kv(e, t) {
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
            0 < e.imgBytes && Bo === 0 && (Bo = 62500 * Tv());
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
              (e.imgBytes > Bo ? 50 : 800) + t
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
        (e.count++, (Pc = new Map()), t.forEach(Zv, e), (Pc = null), Ic.call(e)));
  }
  function Zv(e, t) {
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
  var Ti = {
    $$typeof: re,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0,
  };
  function Xv(e, t, a, l, n, i, f, v, _) {
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
      (this.expirationTimes = Ms(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Ms(0)),
      (this.hiddenUpdates = Ms(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = n),
      (this.onCaughtError = i),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = _),
      (this.incompleteTransitions = new Map()));
  }
  function sh(e, t, a, l, n, i, f, v, _, N, w, L) {
    return (
      (e = new Xv(e, t, a, f, _, N, w, L, v)),
      (t = 1),
      i === !0 && (t |= 24),
      (i = jt(3, null, null, t)),
      (e.current = i),
      (i.stateNode = e),
      (t = mu()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (i.memoizedState = { element: l, isDehydrated: a, cache: t }),
      gu(i),
      e
    );
  }
  function uh(e) {
    return e ? ((e = Pl), e) : Pl;
  }
  function oh(e, t, a, l, n, i) {
    ((n = uh(n)),
      l.context === null ? (l.context = n) : (l.pendingContext = n),
      (l = La(t)),
      (l.payload = { element: a }),
      (i = i === void 0 ? null : i),
      i !== null && (l.callback = i),
      (a = Ha(e, l, t)),
      a !== null && (gt(a, e, t), ai(a, e, t)));
  }
  function rh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Lo(e, t) {
    (rh(e, t), (e = e.alternate) && rh(e, t));
  }
  function fh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = vl(e, 67108864);
      (t !== null && gt(t, e, 67108864), Lo(e, 67108864));
    }
  }
  function dh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Et();
      t = Cs(t);
      var a = vl(e, t);
      (a !== null && gt(a, e, t), Lo(e, t));
    }
  }
  var ts = !0;
  function Qv(e, t, a, l) {
    var n = R.T;
    R.T = null;
    var i = V.p;
    try {
      ((V.p = 2), Ho(e, t, a, l));
    } finally {
      ((V.p = i), (R.T = n));
    }
  }
  function Kv(e, t, a, l) {
    var n = R.T;
    R.T = null;
    var i = V.p;
    try {
      ((V.p = 8), Ho(e, t, a, l));
    } finally {
      ((V.p = i), (R.T = n));
    }
  }
  function Ho(e, t, a, l) {
    if (ts) {
      var n = qo(l);
      if (n === null) (jo(e, t, l, as, a), hh(e, l));
      else if (Wv(n, e, t, a, l)) l.stopPropagation();
      else if ((hh(e, l), t & 4 && -1 < Jv.indexOf(e))) {
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
                      var _ = 1 << (31 - St(f));
                      ((v.entanglements[1] |= _), (f &= ~_));
                    }
                    (la(i), (pe & 6) === 0 && ((qc = _t() + 500), pi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = vl(i, 2)), v !== null && gt(v, i, 2), Gc(), Lo(i, 2));
            }
          if (((i = qo(l)), i === null && jo(e, t, l, as, a), i === n)) break;
          n = i;
        }
        n !== null && l.stopPropagation();
      } else jo(e, t, l, null, a);
    }
  }
  function qo(e) {
    return ((e = Us(e)), Uo(e));
  }
  var as = null;
  function Uo(e) {
    if (((as = null), (e = Vl(e)), e !== null)) {
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
    return ((as = e), null);
  }
  function mh(e) {
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
        switch (D1()) {
          case br:
            return 2;
          case Sr:
            return 8;
          case Zi:
          case B1:
            return 32;
          case xr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Go = !1,
    Ka = null,
    Ja = null,
    Wa = null,
    Ai = new Map(),
    Ni = new Map(),
    Fa = [],
    Jv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function hh(e, t) {
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
        Ai.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Ni.delete(t.pointerId);
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
        t !== null && ((t = $l(t)), t !== null && fh(t)),
        e)
      : ((e.eventSystemFlags |= l),
        (t = e.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e);
  }
  function Wv(e, t, a, l, n) {
    switch (t) {
      case 'focusin':
        return ((Ka = zi(Ka, e, t, a, l, n)), !0);
      case 'dragenter':
        return ((Ja = zi(Ja, e, t, a, l, n)), !0);
      case 'mouseover':
        return ((Wa = zi(Wa, e, t, a, l, n)), !0);
      case 'pointerover':
        var i = n.pointerId;
        return (Ai.set(i, zi(Ai.get(i) || null, e, t, a, l, n)), !0);
      case 'gotpointercapture':
        return ((i = n.pointerId), Ni.set(i, zi(Ni.get(i) || null, e, t, a, l, n)), !0);
    }
    return !1;
  }
  function vh(e) {
    var t = Vl(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = h(a)), t !== null)) {
            ((e.blockedOn = t),
              Er(e.priority, function () {
                dh(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = y(a)), t !== null)) {
            ((e.blockedOn = t),
              Er(e.priority, function () {
                dh(a);
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
      var a = qo(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(a.type, a);
        ((qs = l), a.target.dispatchEvent(l), (qs = null));
      } else return ((t = $l(a)), t !== null && fh(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function yh(e, t, a) {
    ls(e) && a.delete(t);
  }
  function Fv() {
    ((Go = !1),
      Ka !== null && ls(Ka) && (Ka = null),
      Ja !== null && ls(Ja) && (Ja = null),
      Wa !== null && ls(Wa) && (Wa = null),
      Ai.forEach(yh),
      Ni.forEach(yh));
  }
  function ns(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Go || ((Go = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, Fv)));
  }
  var is = null;
  function gh(e) {
    is !== e &&
      ((is = e),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        is === e && (is = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            l = e[t + 1],
            n = e[t + 2];
          if (typeof l != 'function') {
            if (Uo(l || a) === null) continue;
            break;
          }
          var i = $l(a);
          i !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Hu(i, { pending: !0, data: n, method: a.method, action: l }, l, n));
        }
      }));
  }
  function Tn(e) {
    function t(_) {
      return ns(_, e);
    }
    (Ka !== null && ns(Ka, e),
      Ja !== null && ns(Ja, e),
      Wa !== null && ns(Wa, e),
      Ai.forEach(t),
      Ni.forEach(t));
    for (var a = 0; a < Fa.length; a++) {
      var l = Fa[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Fa.length && ((a = Fa[0]), a.blockedOn === null); )
      (vh(a), a.blockedOn === null && Fa.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (l = 0; l < a.length; l += 3) {
        var n = a[l],
          i = a[l + 1],
          f = n[ft] || null;
        if (typeof i == 'function') f || gh(a);
        else if (f) {
          var v = null;
          if (i && i.hasAttribute('formAction')) {
            if (((n = i), (f = i[ft] || null))) v = f.formAction;
            else if (Uo(n) !== null) continue;
          } else v = f.action;
          (typeof v == 'function' ? (a[l + 1] = v) : (a.splice(l, 3), (l -= 3)), gh(a));
        }
      }
  }
  function ph() {
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
  function Vo(e) {
    this._internalRoot = e;
  }
  ((cs.prototype.render = Vo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var a = t.current,
        l = Et();
      oh(a, l, e, t, null, null);
    }),
    (cs.prototype.unmount = Vo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (oh(e.current, 2, null, e, null, null), Gc(), (t[Gl] = null));
        }
      }));
  function cs(e) {
    this._internalRoot = e;
  }
  cs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = zr();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Fa.length && t !== 0 && t < Fa[a].priority; a++);
      (Fa.splice(a, 0, e), a === 0 && vh(e));
    }
  };
  var _h = u.version;
  if (_h !== '19.2.5') throw Error(o(527, _h, '19.2.5'));
  V.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return ((e = p(t)), (e = e !== null ? b(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var Iv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: R,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var ss = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ss.isDisabled && ss.supportsFiber)
      try {
        ((Ln = ss.inject(Iv)), (bt = ss));
      } catch {}
  }
  return (
    (Mi.createRoot = function (e, t) {
      if (!m(e)) throw Error(o(299));
      var a = !1,
        l = '',
        n = Nd,
        i = zd,
        f = Ed;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (i = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = sh(e, 1, !1, null, null, a, l, null, n, i, f, ph)),
        (e[Gl] = t.current),
        xo(e),
        new Vo(t)
      );
    }),
    (Mi.hydrateRoot = function (e, t, a) {
      if (!m(e)) throw Error(o(299));
      var l = !1,
        n = '',
        i = Nd,
        f = zd,
        v = Ed,
        _ = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (l = !0),
          a.identifierPrefix !== void 0 && (n = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (i = a.onUncaughtError),
          a.onCaughtError !== void 0 && (f = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (_ = a.formState)),
        (t = sh(e, 1, !0, t, a ?? null, l, n, _, i, f, v, ph)),
        (t.context = uh(null)),
        (a = t.current),
        (l = Et()),
        (l = Cs(l)),
        (n = La(l)),
        (n.callback = null),
        Ha(a, n, l),
        (a = l),
        (t.current.lanes = a),
        qn(t, a),
        la(t),
        (e[Gl] = t.current),
        xo(e),
        new cs(t)
      );
    }),
    (Mi.version = '19.2.5'),
    Mi
  );
}
var Mh;
function fy() {
  if (Mh) return Yo.exports;
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
      } catch (u) {
        console.error(u);
      }
  }
  return (c(), (Yo.exports = ry()), Yo.exports);
}
var dy = fy(),
  oe = rr();
const us = ay(oe),
  my = '_content_11wqi_1',
  hy = { content: my },
  vy = '_tabBar_rhd8d_2',
  yy = '_fullWidth_rhd8d_9',
  gy = '_tab_rhd8d_2',
  py = '_tabActive_rhd8d_54',
  _y = '_tabDisabled_rhd8d_101',
  by = '_tabIcon_rhd8d_107',
  Sy = '_tabLabel_rhd8d_114',
  xy = '_badge_rhd8d_119',
  jy = '_badgeActive_rhd8d_137',
  Ty = '_indicator_rhd8d_158',
  Mt = {
    tabBar: vy,
    fullWidth: yy,
    tab: gy,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: py,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: _y,
    tabIcon: by,
    tabLabel: Sy,
    badge: xy,
    badgeActive: jy,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Ty,
  },
  Ay = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Ny = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  zy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Ey = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  My = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Cy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
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
  Oy = { screw: Cy, bolt: Ny, alloy: Ay, laser: My, cannon: zy, thunder: wy, cutter: Ey };
function Ry(c, u) {
  return c.replace(/\swidth="\d+"/, ` width="${u}"`).replace(/\sheight="\d+"/, ` height="${u}"`);
}
function Ee({ name: c, size: u = 16, color: s = 'currentColor', className: o }) {
  const m = Oy[c];
  if (m)
    return r.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: s, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: Ry(m, u) },
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
function ps({
  tabs: c,
  value: u,
  onChange: s,
  variant: o = 'underline',
  size: m = 'md',
  fullWidth: d = !1,
  align: h = 'start',
}) {
  const y = oe.useRef(null),
    [g, p] = oe.useState({ left: 0, width: 0 });
  return (
    oe.useEffect(() => {
      const b = y.current;
      if (!b) return;
      const T = c.findIndex((q) => q.key === u);
      if (T < 0) return;
      const C = b.querySelectorAll('[role="tab"]')[T];
      if (!C) return;
      const O = b.getBoundingClientRect(),
        U = C.getBoundingClientRect();
      p({ left: U.left - O.left, width: U.width });
    }, [u, c]),
    r.jsxs('div', {
      ref: y,
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
          const T = b.key === u;
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
                b.disabled !== !0 && s(b.key);
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
            style: { transform: `translateX(${g.left}px)`, width: g.width },
          }),
      ],
    })
  );
}
const Dy = '_shell_1wkhk_6',
  By = '_header_1wkhk_19',
  Ly = '_main_1wkhk_32',
  Hy = '_noScroll_1wkhk_41',
  qy = '_footer_1wkhk_46',
  Uy = '_battle_1wkhk_59',
  An = { shell: Dy, header: By, main: Ly, noScroll: Hy, footer: qy, battle: Uy };
function Bl({ header: c, footer: u, children: s, noScroll: o = !1, variant: m = 'default' }) {
  return r.jsxs('div', {
    className: [An.shell, m === 'battle' ? An.battle : ''].filter(Boolean).join(' '),
    children: [
      c != null && r.jsx('header', { className: An.header, children: c }),
      r.jsx('main', {
        className: [An.main, o ? An.noScroll : ''].filter(Boolean).join(' '),
        children: s,
      }),
      u != null && r.jsx('footer', { className: An.footer, children: u }),
    ],
  });
}
const Gy = '_nav_4erx0_2',
  Vy = '_tab_4erx0_10',
  $y = '_active_4erx0_33',
  Yy = '_iconWrap_4erx0_38',
  ky = '_badge_4erx0_51',
  Ci = { nav: Gy, tab: Vy, active: $y, iconWrap: Yy, badge: ky },
  Zy = '_text_1wy1n_1',
  Xy = '_variant_heading_1_1wy1n_6',
  Qy = '_variant_heading_2_1wy1n_15',
  Ky = '_variant_heading_3_1wy1n_24',
  Jy = '_variant_body_1wy1n_33',
  Wy = '_variant_caption_1wy1n_41',
  Fy = '_variant_label_1wy1n_49',
  Iy = '_variant_numeric_l_1wy1n_58',
  Py = '_variant_numeric_m_1wy1n_67',
  eg = '_variant_numeric_s_1wy1n_76',
  tg = '_color_default_1wy1n_85',
  ag = '_color_mid_1wy1n_89',
  lg = '_color_dim_1wy1n_93',
  ng = '_color_disabled_1wy1n_97',
  ig = '_color_primary_1wy1n_101',
  cg = '_color_secondary_1wy1n_105',
  sg = '_color_danger_1wy1n_109',
  ug = '_color_success_1wy1n_113',
  og = '_color_warning_1wy1n_117',
  rg = '_truncate_1wy1n_121',
  fg = '_align_left_1wy1n_128',
  dg = '_align_center_1wy1n_132',
  mg = '_align_right_1wy1n_136',
  wi = {
    text: Zy,
    variant_heading_1: Xy,
    variant_heading_2: Qy,
    variant_heading_3: Ky,
    variant_body: Jy,
    variant_caption: Wy,
    variant_label: Fy,
    variant_numeric_l: Iy,
    variant_numeric_m: Py,
    variant_numeric_s: eg,
    color_default: tg,
    color_mid: ag,
    color_dim: lg,
    color_disabled: ng,
    color_primary: ig,
    color_secondary: cg,
    color_danger: sg,
    color_success: ug,
    color_warning: og,
    truncate: rg,
    align_left: fg,
    align_center: dg,
    align_right: mg,
  };
function hg(c) {
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
  const g = s ?? hg(c),
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
    children: u,
  });
}
const vg = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function $i({ active: c, onChange: u, badges: s }) {
  return r.jsx('nav', {
    className: Ci.nav,
    'aria-label': 'メインナビゲーション',
    children: vg.map(({ key: o, label: m, iconName: d }) => {
      const h = o === c,
        y = s == null ? void 0 : s[o];
      return r.jsxs(
        'button',
        {
          type: 'button',
          className: [Ci.tab, h ? Ci.active : ''].filter(Boolean).join(' '),
          onClick: () => u(o),
          'aria-current': h ? 'page' : void 0,
          'aria-label': m,
          children: [
            r.jsxs('span', {
              className: Ci.iconWrap,
              children: [
                r.jsx(Ee, {
                  name: d,
                  size: 22,
                  color: h ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                y != null &&
                  r.jsx('span', { className: Ci.badge, 'aria-hidden': 'true', children: y }),
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
const yg = '_root_kv5uk_2',
  gg = '_titleRow_kv5uk_8',
  pg = '_left_kv5uk_17',
  _g = '_center_kv5uk_24',
  bg = '_right_kv5uk_33',
  Sg = '_currencies_kv5uk_42',
  xg = '_actions_kv5uk_49',
  jg = '_tabBarSlot_kv5uk_56',
  Pa = {
    root: yg,
    titleRow: gg,
    left: pg,
    center: _g,
    right: bg,
    currencies: Sg,
    actions: xg,
    tabBarSlot: jg,
  },
  Tg = '_root_i843c_2',
  Ag = '_icon_i843c_10',
  Ng = '_delta_i843c_30',
  zg = '_deltaSm_i843c_37',
  Eg = '_deltaMd_i843c_41',
  Mg = '_deltaLg_i843c_45',
  Cg = '_subtle_i843c_50',
  wg = '_currencyLabel_i843c_55',
  Og = '_rankStamp_i843c_64',
  na = {
    root: Tg,
    icon: Ag,
    delta: Ng,
    deltaSm: zg,
    deltaMd: Eg,
    deltaLg: Mg,
    subtle: Cg,
    currencyLabel: wg,
    rankStamp: Og,
  },
  Rg = '_root_1wxcz_1',
  Dg = '_sizeSm_1wxcz_13',
  Bg = '_sizeMd_1wxcz_17',
  Lg = '_sizeLg_1wxcz_21',
  Hg = '_sizeXl_1wxcz_25',
  qg = '_affix_1wxcz_29',
  El = { root: Rg, sizeSm: Dg, sizeMd: Bg, sizeLg: Lg, sizeXl: Hg, affix: qg };
function ar(c) {
  let u = c.length;
  for (; u > 0 && c[u - 1] === 0; ) u--;
  return c.slice(0, u);
}
function Oi(c) {
  let u = 0;
  for (let s = 0; s < c.length; s++) {
    const o = Math.floor(c[s] + u);
    ((c[s] = o % 1e3), (u = Math.floor(o / 1e3)));
  }
  for (; u > 0; ) (c.push(u % 1e3), (u = Math.floor(u / 1e3)));
  return ar(c);
}
function Ug(c, u) {
  for (; u !== 0; ) {
    const s = u;
    ((u = c % u), (c = s));
  }
  return c;
}
function Gg(c) {
  const u = c.toString(),
    s = u.indexOf('.');
  if (s === -1) return { num: Math.round(c), den: 1 };
  const o = u.length - s - 1,
    m = Math.pow(10, o),
    d = Math.round(c * m),
    h = Ug(Math.abs(d), m);
  return { num: d / h, den: m / h };
}
function Vg(c) {
  let u = '',
    s = c;
  for (; s > 0; )
    ((s -= 1), (u = String.fromCharCode(65 + (s % 26)) + u), (s = Math.floor(s / 26)));
  return u;
}
const ot = class ot {
  constructor(u) {
    Kt(this, 'digits');
    this.digits = u;
  }
  static fromNumber(u) {
    if (u <= 0) return ot.ZERO;
    const s = [];
    let o = Math.floor(u);
    for (; o > 0; ) (s.push(o % 1e3), (o = Math.floor(o / 1e3)));
    return new ot(ar(s));
  }
  static fromString(u) {
    const s = u.trim();
    if (s === '' || s === '0') return ot.ZERO;
    const o = [];
    let m = s.length;
    for (; m > 0; ) {
      const d = Math.max(0, m - 3);
      (o.push(parseInt(s.slice(d, m), 10)), (m = d));
    }
    return new ot(ar(o));
  }
  static fromJSON(u) {
    return new ot(Oi([...u]));
  }
  add(u) {
    const s = this.digits,
      o = u.digits,
      m = Math.max(s.length, o.length),
      d = new Array(m).fill(0);
    let h = 0;
    for (let y = 0; y < m; y++) {
      const g = (s[y] ?? 0) + (o[y] ?? 0) + h;
      ((d[y] = g % 1e3), (h = Math.floor(g / 1e3)));
    }
    return (h > 0 && d.push(h), new ot(Oi(d)));
  }
  sub(u) {
    if (this.compare(u) <= 0) return ot.ZERO;
    const s = this.digits,
      o = u.digits,
      m = new Array(s.length).fill(0);
    let d = 0;
    for (let h = 0; h < s.length; h++) {
      let y = (s[h] ?? 0) - (o[h] ?? 0) - d;
      (y < 0 ? ((y += 1e3), (d = 1)) : (d = 0), (m[h] = y));
    }
    return new ot(Oi(m));
  }
  mulInt(u) {
    if (u <= 0 || this.isZero()) return ot.ZERO;
    const s = this.digits,
      o = new Array(s.length).fill(0);
    let m = 0;
    for (let d = 0; d < s.length; d++) {
      const h = s[d] * u + m;
      ((o[d] = h % 1e3), (m = Math.floor(h / 1e3)));
    }
    for (; m > 0; ) (o.push(m % 1e3), (m = Math.floor(m / 1e3)));
    return new ot(Oi(o));
  }
  divInt(u) {
    if (u <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return ot.ZERO;
    const s = this.digits,
      o = new Array(s.length).fill(0);
    let m = 0;
    for (let d = s.length - 1; d >= 0; d--) {
      const h = m * 1e3 + (s[d] ?? 0);
      ((o[d] = Math.floor(h / u)), (m = h % u));
    }
    return (m > 0 && (o[0] += 1), new ot(Oi(o)));
  }
  mulRational(u, s) {
    return this.mulInt(u).divInt(s);
  }
  mulNumber(u) {
    const { num: s, den: o } = Gg(u);
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
      m = Vg(o),
      d = this.digits[u - 2] ?? 0,
      h = Math.floor(d / 10);
    return `${s}.${String(h).padStart(2, '0')}${m}`;
  }
};
Kt(ot, 'ZERO', new ot([]));
let ze = ot;
function $g(c) {
  if (c === '') return 0;
  let u = 0;
  for (let s = 0; s < c.length; s++) u = u * 26 + (c.charCodeAt(s) - 65 + 1);
  return u;
}
function Yg(c) {
  if (c <= 0) return { color: 'var(--c-text)', glow: '0 0 6px rgba(232,239,255,0.35)' };
  const u = Math.min(1, (c - 1) / 19),
    s = 195 + u * 100,
    o = 0.86 - u * 0.14,
    m = 0.13 + u * 0.07,
    d = `oklch(${o.toFixed(3)} ${m.toFixed(3)} ${s.toFixed(1)})`,
    h = Math.min(0.95, o + 0.05),
    y = m + 0.05,
    g = `oklch(${h.toFixed(3)} ${y.toFixed(3)} ${s.toFixed(1)} / 0.55)`;
  return { color: d, glow: `0 0 8px ${g}` };
}
function kg(c) {
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
function Zg(c) {
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
  size: u = 'md',
  accentColor: s = 'scale',
  glow: o = !1,
  prefix: m,
  suffix: d,
  decimals: h,
  style: y,
}) {
  const g = typeof c == 'number' ? ze.fromNumber(c) : c;
  let p;
  h != null && typeof c == 'number' ? (p = c.toFixed(h)) : (p = g.toDisplay());
  const b = p.match(/^[\d.]+([A-Z]*)$/),
    T = b ? b[1] : '',
    E = $g(T);
  let C, O;
  if (s === 'scale') {
    const F = Yg(E);
    ((C = F.color), (O = o ? F.glow : void 0));
  } else ((C = kg(s)), (O = o ? Zg(s) : void 0));
  const U = { sm: El.sizeSm, md: El.sizeMd, lg: El.sizeLg, xl: El.sizeXl }[u],
    q = { color: C, ...(O != null ? { textShadow: O } : {}), ...y };
  return r.jsxs('span', {
    className: `${El.root} ${U}`,
    style: q,
    children: [
      m != null && r.jsx('span', { className: El.affix, children: m }),
      p,
      d != null && r.jsx('span', { className: El.affix, children: d }),
    ],
  });
}
const Xg = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  Qg = { sm: 12, md: 16, lg: 22, xl: 28 };
function Kg({ delta: c, sizeClass: u }) {
  const s = c === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return r.jsx('span', {
    className: `${na.delta} ${u}`,
    style: { color: s },
    'aria-hidden': 'true',
    children: c,
  });
}
function Gi({
  currency: c,
  value: u,
  size: s = 'md',
  delta: o,
  showLabel: m,
  subtle: d,
  align: h = 'start',
  ranked: y,
}) {
  const g = typeof u == 'number' ? ze.fromNumber(u) : u,
    p = Xg[c],
    b = d ? 'var(--c-text-disabled)' : `var(${p.cssVar})`,
    T = o && !d ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: b },
    E = { sm: na.deltaSm, md: na.deltaMd, lg: na.deltaLg, xl: na.deltaLg }[s],
    C = r.jsx(Ee, { name: c, size: Qg[s], color: b, className: na.icon }),
    O = r.jsxs(r.Fragment, {
      children: [
        o !== void 0 && !d && r.jsx(Kg, { delta: o, sizeClass: E }),
        r.jsx(sl, { value: g, size: s, accentColor: 'primary', style: T }),
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
const Jg = '_iconButton_1fyi8_1',
  Wg = '_round_1fyi8_23',
  Fg = '_active_1fyi8_85',
  Ig = '_iconWrap_1fyi8_113',
  Nn = {
    iconButton: Jg,
    round: Wg,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: Fg,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: Ig,
  },
  Pg = { sm: 14, md: 18, lg: 22 };
function fs({
  icon: c,
  label: u,
  size: s = 'md',
  variant: o = 'ghost',
  shape: m = 'square',
  active: d = !1,
  disabled: h = !1,
  onClick: y,
}) {
  const g = o === 'default' ? 'ghost' : o,
    p = typeof c == 'string' ? r.jsx(Ee, { name: c, size: Pg[s] }) : c;
  return r.jsx('button', {
    type: 'button',
    className: [
      Nn.iconButton,
      Nn[`variant-${g}`],
      Nn[`size-${s}`],
      m === 'round' ? Nn.round : '',
      d ? Nn.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: y,
    'aria-label': u,
    'aria-pressed': d,
    'aria-disabled': h,
    children: r.jsx('span', { className: Nn.iconWrap, 'aria-hidden': 'true', children: p }),
  });
}
const Ch = (c) => {
    let u;
    const s = new Set(),
      o = (p, b) => {
        const T = typeof p == 'function' ? p(u) : p;
        if (!Object.is(T, u)) {
          const E = u;
          ((u = (b ?? (typeof T != 'object' || T === null)) ? T : Object.assign({}, u, T)),
            s.forEach((C) => C(u, E)));
        }
      },
      m = () => u,
      y = {
        setState: o,
        getState: m,
        getInitialState: () => g,
        subscribe: (p) => (s.add(p), () => s.delete(p)),
      },
      g = (u = c(o, m, y));
    return y;
  },
  ep = (c) => (c ? Ch(c) : Ch),
  tp = (c) => c;
function ap(c, u = tp) {
  const s = us.useSyncExternalStore(
    c.subscribe,
    us.useCallback(() => u(c.getState()), [c, u]),
    us.useCallback(() => u(c.getInitialState()), [c, u])
  );
  return (us.useDebugValue(s), s);
}
const lp = (c) => {
    const u = ep(c),
      s = (o) => ap(u, o);
    return (Object.assign(s, u), s);
  },
  np = (c) => lp,
  wh = {
    isRunActive: !1,
    screw: ze.ZERO,
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
  ip = (c, u) => ({
    ...wh,
    startRun: ({ initialWeapon: s, machineMaxHp: o, gameSpeed: m }) =>
      c({
        isRunActive: !0,
        screw: ze.ZERO,
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
    endRun: () => c(wh),
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
  cp = { bolt: ze.ZERO, alloy: ze.ZERO },
  sp = (c, u) => ({
    ...cp,
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
    resetCurrencies: () => c({ bolt: ze.ZERO, alloy: ze.ZERO }),
  }),
  Bn = 6,
  up = { equippedPatches: new Map() },
  op = (c, u) => ({
    ...up,
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
  d1 = 'tower-like-game',
  vs = 1,
  Q = {
    profile: 'profile',
    currencies: 'currencies',
    machine: 'machine',
    weapons: 'weapons',
    patches: 'patches',
    equippedPatches: 'equippedPatches',
    settings: 'settings',
  },
  m1 = [
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
  rp = {
    id: 'singleton',
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    schemaVersion: vs,
  },
  fp = { id: 'singleton', bolt: [], alloy: [] },
  dp = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  mp = {
    id: 'singleton',
    defaultGameSpeed: 1,
    bgmVolume: 0.8,
    seVolume: 0.8,
    vibrationEnabled: !0,
  };
function h1() {
  return Object.fromEntries(m1.map((c) => [c, 0]));
}
const hp = { machineLevels: h1() },
  vp = (c) => ({
    ...hp,
    incrementMachineLv: (u) =>
      c((s) => ({ machineLevels: { ...s.machineLevels, [u]: s.machineLevels[u] + 1 } })),
    setMachineLv: (u, s) => c((o) => ({ machineLevels: { ...o.machineLevels, [u]: s } })),
    resetMachine: () => c({ machineLevels: h1() }),
  });
function Oh(c, u) {
  return `${c}#${u}`;
}
const yp = { patches: new Map() },
  gp = (c, u) => ({
    ...yp,
    addPatch: (s, o, m = 1) => {
      const d = Oh(s, o);
      c((h) => {
        const y = new Map(h.patches),
          g = y.get(d);
        return (
          g ? y.set(d, { ...g, count: g.count + m }) : y.set(d, { name: s, tier: o, count: m }),
          { patches: y }
        );
      });
    },
    consumePatch: (s, o, m = 1) => {
      const d = Oh(s, o),
        h = u().patches.get(d);
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
      c((s) => {
        const o = new Map(s.patches);
        for (const [m, d] of o) d.count <= 0 && o.delete(m);
        return { patches: o };
      });
    },
    resetPatches: () => c({ patches: new Map() }),
  }),
  Rh = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  pp = (c) => ({
    ...Rh,
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
    resetProfile: (u) => c({ ...Rh, createdAt: u, lastPlayedAt: u }),
  }),
  Dh = { defaultGameSpeed: 1, bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  _p = (c) => ({
    ...Dh,
    setDefaultGameSpeed: (u) => c({ defaultGameSpeed: u }),
    setBgmVolume: (u) => c({ bgmVolume: Math.max(0, Math.min(1, u)) }),
    setSeVolume: (u) => c({ seVolume: Math.max(0, Math.min(1, u)) }),
    setVibrationEnabled: (u) => c({ vibrationEnabled: u }),
    resetSettings: () => c(Dh),
  }),
  Bh = { weaponLv: 0, initialWeapon: 'laser' },
  bp = (c) => ({
    ...Bh,
    incrementWeaponLv: () => c((u) => ({ weaponLv: u.weaponLv + 1 })),
    setWeaponLv: (u) => c({ weaponLv: u }),
    setInitialWeapon: (u) => c({ initialWeapon: u }),
    resetWeapons: () => c(Bh),
  }),
  X = np()((...c) => ({
    ...pp(...c),
    ...sp(...c),
    ...vp(...c),
    ...bp(...c),
    ...gp(...c),
    ...op(...c),
    ..._p(...c),
    ...ip(...c),
  }));
function Yi({ title: c, subtitle: u, onBack: s, currencies: o, tabBar: m, actions: d }) {
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
              s != null &&
              r.jsx(fs, {
                icon: 'chevron-left',
                label: '戻る',
                variant: 'ghost',
                size: 'md',
                onClick: s,
              }),
          }),
          r.jsxs('div', {
            className: Pa.center,
            children: [
              r.jsx(G, { variant: 'heading-3', truncate: !0, align: 'center', children: c }),
              u != null &&
                r.jsx(G, { variant: 'caption', color: 'dim', align: 'center', children: u }),
            ],
          }),
          r.jsxs('div', {
            className: Pa.right,
            children: [
              b.length > 0 &&
                r.jsx('div', {
                  className: Pa.currencies,
                  children: b.map((E) => r.jsx(Gi, { currency: E, value: T(E), size: 'sm' }, E)),
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
const Sp = '_tab_1nc83_3',
  xp = { tab: Sp },
  jp = '_wrapper_1opqp_3',
  Tp = '_active_1opqp_12',
  Ap = '_card_1opqp_12',
  Np = '_locked_1opqp_18',
  zp = '_tall_1opqp_34',
  Ep = '_iconTile_1opqp_37',
  Mp = '_headerText_1opqp_42',
  Cp = '_description_1opqp_45',
  wp = '_name_1opqp_48',
  Op = '_wide_1opqp_53',
  Rp = '_body_1opqp_61',
  Dp = '_header_1opqp_42',
  Bp = '_statGrid_1opqp_121',
  Lp = '_statChip_1opqp_129',
  Hp = '_statLabel_1opqp_140',
  qp = '_statValue_1opqp_147',
  Up = '_lockedBadge_1opqp_158',
  nt = {
    wrapper: jp,
    active: Tp,
    card: Ap,
    locked: Np,
    tall: zp,
    iconTile: Ep,
    headerText: Mp,
    description: Cp,
    name: wp,
    wide: Op,
    body: Rp,
    header: Dp,
    statGrid: Bp,
    statChip: Lp,
    statLabel: Hp,
    statValue: qp,
    lockedBadge: Up,
  },
  Gp = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function v1({
  weapon: c,
  name: u,
  description: s,
  stats: o,
  layout: m = 'tall',
  active: d = !1,
  locked: h = !1,
  onClick: y,
}) {
  const g = m === 'wide',
    p = y != null && !h;
  return r.jsx('div', {
    className: [nt.wrapper, d ? nt.active : '', h ? nt.locked : '', g ? nt.wide : nt.tall]
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
      className: nt.card,
      style: p ? { cursor: 'pointer' } : void 0,
      children: [
        r.jsx('div', {
          className: nt.iconTile,
          'aria-hidden': !0,
          children: r.jsx(Ee, { name: c, size: g ? 40 : 52 }),
        }),
        r.jsxs('div', {
          className: nt.body,
          children: [
            r.jsx('div', {
              className: nt.header,
              children: r.jsxs('div', {
                className: nt.headerText,
                children: [
                  r.jsx('span', { className: nt.name, children: u }),
                  s != null &&
                    s.length > 0 &&
                    r.jsx('span', { className: nt.description, children: s }),
                ],
              }),
            }),
            !h &&
              o.length > 0 &&
              r.jsx('div', {
                className: nt.statGrid,
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
                      className: nt.statChip,
                      children: [
                        r.jsx('span', { className: nt.statLabel, children: b.label }),
                        r.jsx('span', {
                          className: nt.statValue,
                          style: b.accent != null ? { color: Gp[b.accent] } : void 0,
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
                className: nt.lockedBadge,
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
function _s(c) {
  return Math.pow(1.02, c);
}
function bs(c, u) {
  return Math.min(10, c * (1 + 0.03 * u));
}
const Ss = { laser: 120, cannon: 480, thunder: 84, cutter: 62 },
  xs = { laser: 1, cannon: 0.5, thunder: 0.7, cutter: 2 },
  fr = { laser: 580, thunder: 420, cannon: 520 };
function Vp(c) {
  const u = Math.round(Ss.laser * _s(c)),
    s = Math.floor(1 + 0.1 * c),
    o = Math.round(bs(xs.laser, c) * 10) / 10;
  return [
    { label: 'DMG', value: u, accent: 'primary' },
    { label: '貫通', value: s },
    { label: '射程', value: fr.laser, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function $p(c) {
  const u = Math.round(Ss.cannon * _s(c)),
    s = Math.round((30 + 0.5 * c) * 10) / 10,
    o = Math.round(bs(xs.cannon, c) * 10) / 10;
  return [
    { label: 'DMG', value: u, accent: 'primary' },
    { label: '半径', value: s, suffix: 'm' },
    { label: '射程', value: fr.cannon, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function Yp(c) {
  const u = Math.round(Ss.thunder * _s(c)),
    s = Math.floor(7 + 0.1 * c),
    o = Math.round(bs(xs.thunder, c) * 10) / 10;
  return [
    { label: 'DMG', value: u, accent: 'primary' },
    { label: '連鎖', value: s },
    { label: '射程', value: fr.thunder, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function kp(c) {
  const u = Math.round(Ss.cutter * _s(c)),
    s = Math.round((80 + 0.5 * c) * 10) / 10,
    o = Math.floor(1 + 0.05 * c),
    m = Math.round(bs(xs.cutter, c) * 10) / 10;
  return [
    { label: 'DMG', value: u, accent: 'primary' },
    { label: '旋回', value: s, suffix: 'm' },
    { label: '同時', value: o },
    { label: '連射', value: m, suffix: '/s' },
  ];
}
const Zp = [
  { kind: 'laser', name: 'LASER', description: '高速直進ビーム。', buildStats: Vp },
  { kind: 'cannon', name: 'CANNON', description: '範囲爆発。', buildStats: $p },
  { kind: 'thunder', name: 'THUNDER', description: '連鎖電撃。', buildStats: Yp },
  { kind: 'cutter', name: 'CUTTER', description: '旋回斬撃。', buildStats: kp },
];
function Xp() {
  const c = X((u) => u.weaponLv);
  return r.jsx('div', {
    className: xp.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: Zp.map((u) =>
      r.jsx(
        v1,
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
const Qp = '_tab_1oky8_3',
  Kp = '_topRow_1oky8_9',
  Jp = '_description_1oky8_15',
  Wp = '_previewCard_1oky8_21',
  Fp = '_previewLabel_1oky8_25',
  Ip = '_impactGrid_1oky8_32',
  Pp = '_impactRow_1oky8_37',
  e_ = '_impactRowBordered_1oky8_45',
  t_ = '_impactLabel_1oky8_49',
  a_ = '_impactValues_1oky8_55',
  l_ = '_arrow_1oky8_62',
  Jt = {
    tab: Qp,
    topRow: Kp,
    description: Jp,
    previewCard: Wp,
    previewLabel: Fp,
    impactGrid: Ip,
    impactRow: Pp,
    impactRowBordered: e_,
    impactLabel: t_,
    impactValues: a_,
    arrow: l_,
  },
  n_ = '_card_1403j_1',
  i_ = '_interactive_1403j_97',
  Ri = {
    card: n_,
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
    interactive: i_,
  };
function Ll({
  children: c,
  variant: u = 'default',
  interactive: s = !1,
  padding: o = 'md',
  radius: m,
  className: d,
}) {
  const h = [
    Ri.card,
    Ri[`variant-${u}`],
    Ri[`padding-${o}`],
    m != null ? Ri[`radius-${m}`] : '',
    s ? Ri.interactive : '',
    d ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return r.jsx('div', { className: h, children: c });
}
const c_ = '_root_168oy_2',
  s_ = '_header_168oy_15',
  u_ = '_iconWrap_168oy_22',
  o_ = '_title_168oy_34',
  r_ = '_lvBadge_168oy_47',
  f_ = '_description_168oy_60',
  d_ = '_valueRow_168oy_66',
  m_ = '_valueBefore_168oy_74',
  h_ = '_valueAfter_168oy_83',
  v_ = '_arrow_168oy_93',
  y_ = '_buttons_168oy_100',
  g_ = '_btnCol_168oy_105',
  p_ = '_btn_168oy_105',
  __ = '_btnPrimary_168oy_132',
  b_ = '_btnSecondary_168oy_139',
  S_ = '_btnWarning_168oy_146',
  x_ = '_costRow_168oy_172',
  j_ = '_costNum_168oy_181',
  T_ = '_costDisabled_168oy_190',
  ke = {
    root: c_,
    header: s_,
    iconWrap: u_,
    title: o_,
    lvBadge: r_,
    description: f_,
    valueRow: d_,
    valueBefore: m_,
    valueAfter: h_,
    arrow: v_,
    buttons: y_,
    btnCol: g_,
    btn: p_,
    btnPrimary: __,
    btnSecondary: b_,
    btnWarning: S_,
    costRow: x_,
    costNum: j_,
    costDisabled: T_,
  },
  A_ = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  N_ = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  z_ = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  E_ = { primary: ke.btnPrimary, secondary: ke.btnSecondary, warning: ke.btnWarning },
  M_ = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function Ko(c) {
  return c instanceof ze ? c.toDisplay() : c.toLocaleString();
}
function dr({
  title: c,
  description: u,
  iconName: s,
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
  const C = p ?? z_[g],
    O = A_[C],
    U = o ?? O,
    q = E_[C],
    F = M_[C];
  return r.jsxs('div', {
    className: ke.root,
    role: 'group',
    'aria-label': c,
    'data-maxed': T,
    children: [
      r.jsxs('div', {
        className: ke.header,
        children: [
          s != null &&
            r.jsx('span', {
              className: ke.iconWrap,
              children: r.jsx(Ee, { name: s, size: 14, color: U }),
            }),
          r.jsx('span', { className: ke.title, children: c }),
          m != null &&
            !T &&
            r.jsx('span', {
              className: ke.lvBadge,
              style: { color: O, boxShadow: N_[C] },
              children: m,
            }),
          T &&
            r.jsx('span', {
              className: ke.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      u != null &&
        u.length > 0 &&
        r.jsx(G, { variant: 'caption', color: 'dim', className: ke.description, children: u }),
      d != null &&
        r.jsxs('div', {
          className: ke.valueRow,
          children: [
            r.jsxs('span', { className: ke.valueBefore, children: [Ko(d), y] }),
            h != null &&
              !T &&
              r.jsxs(r.Fragment, {
                children: [
                  r.jsx('span', { className: ke.arrow, children: '→' }),
                  r.jsxs('span', {
                    className: ke.valueAfter,
                    style: { color: O, textShadow: `0 0 5px ${F}` },
                    children: [Ko(h), y],
                  }),
                ],
              }),
          ],
        }),
      !T &&
        b.length > 0 &&
        r.jsx('div', {
          className: ke.buttons,
          style: { gridTemplateColumns: `repeat(${b.length}, 1fr)` },
          children: b.map((ae) => {
            const re = ae.disabled === !0;
            return r.jsxs(
              'div',
              {
                className: ke.btnCol,
                children: [
                  r.jsx('button', {
                    type: 'button',
                    className: `${ke.btn} ${q}`,
                    disabled: re,
                    onClick: re ? void 0 : () => (E == null ? void 0 : E(ae.amount)),
                    children: ae.amount,
                  }),
                  r.jsx('div', {
                    className: ke.costRow,
                    children: r.jsx('span', {
                      className: `${ke.costNum} ${re ? ke.costDisabled : ''}`,
                      children: Ko(ae.cost),
                    }),
                  }),
                ],
              },
              ae.amount
            );
          }),
        }),
    ],
  });
}
function mr(c) {
  const u = Math.ceil(200 * Math.pow(1.12, c));
  return ze.fromNumber(u);
}
function Lh(c, u) {
  let s = ze.ZERO;
  for (let o = 0; o < u; o++) s = s.add(mr(c + o));
  return s;
}
function C_(c, u) {
  let s = u,
    o = 0;
  for (;;) {
    const m = mr(c + o);
    if (s.lt(m) || ((s = s.sub(m)), o++, o > 1e4)) break;
  }
  return o;
}
function Hh(c) {
  return Math.pow(1.02, c);
}
const qh = { laser: 120 };
function w_(c) {
  const u = c + 1,
    s = Hh(c),
    o = Hh(u);
  return [
    { label: 'LASER DMG', before: Math.round(qh.laser * s), after: Math.round(qh.laser * o) },
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
function O_() {
  const c = X((O) => O.weaponLv),
    u = X((O) => O.alloy),
    s = X((O) => O.incrementWeaponLv),
    o = X((O) => O.setWeaponLv),
    m = X((O) => O.spendAlloy),
    d = mr(c),
    h = Lh(c, 5),
    y = C_(c, u),
    g = Lh(c, y),
    p = !u.lt(d),
    b = y >= 5,
    T = y >= 1,
    E = w_(c);
  function C(O) {
    O === '+1'
      ? m(d) && s()
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
          r.jsx(Gi, { currency: 'alloy', value: u, size: 'sm' }),
        ],
      }),
      r.jsx(dr, {
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
const y1 = oe.createContext(null);
function R_({ children: c, initialScreen: u }) {
  const [s, o] = oe.useState(u ?? 'title'),
    m = oe.useCallback((d) => {
      o(d);
    }, []);
  return r.jsx(y1.Provider, { value: { screen: s, navigate: m }, children: c });
}
function ul() {
  const c = oe.useContext(y1);
  if (!c) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return c;
}
const D_ = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function B_(c = {}) {
  const { initialTab: u = 'details' } = c,
    [s, o] = oe.useState(u),
    { screen: m, navigate: d } = ul();
  return r.jsx(Bl, {
    header: r.jsx(Yi, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => d('preparation'),
      tabBar: r.jsx(ps, { tabs: D_, value: s, onChange: o, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx($i, { active: m, onChange: (h) => d(h) }),
    children: r.jsxs('div', {
      className: hy.content,
      children: [s === 'details' && r.jsx(Xp, {}), s === 'upgrade' && r.jsx(O_, {})],
    }),
  });
}
const L_ = '_root_15ig1_1',
  H_ = '_overlayLayer_15ig1_10',
  Uh = { root: L_, overlayLayer: H_ },
  q_ = '_root_1375f_3',
  U_ = '_rangeCircle_1375f_15',
  G_ = '_machine_1375f_27',
  V_ = '_machineRingOuter_1375f_40',
  $_ = '_pin_1375f_50',
  Y_ = '_enemy_1375f_60',
  k_ = '_enemyUpper_1375f_71',
  Z_ = '_enemyHpBar_1375f_74',
  el = {
    root: q_,
    rangeCircle: U_,
    machine: G_,
    machineRingOuter: V_,
    pin: $_,
    enemy: Y_,
    enemyUpper: k_,
    enemyHpBar: Z_,
  },
  X_ = '_root_14p1r_1',
  Q_ = { root: X_ };
function K_({ value: c, x: u, y: s, crit: o = !1, duration: m = 800, onDone: d }) {
  const h = oe.useId().replace(/:/g, 'dp'),
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
        className: `${h} ${Q_.root}`,
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
const J_ = '_wrap_14rhu_1',
  W_ = { wrap: J_ },
  Gh = 8;
function F_({ x: c, y: u, color: s = 'var(--c-text-mid)', duration: o = 480, onDone: m }) {
  const d = oe.useId().replace(/:/g, 'ed'),
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
    g = Array.from({ length: Gh }, (p, b) =>
      r.jsx('div', { className: `${d}-shard`, style: { '--a': `${(b * 360) / Gh}deg` } }, b)
    );
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: y } }),
      r.jsxs('div', {
        className: `${d}-wrap ${W_.wrap}`,
        style: { left: `${c}%`, top: `${u}%` },
        onAnimationEnd: m,
        children: [r.jsx('div', { className: `${d}-flash` }), g],
      }),
    ],
  });
}
const I_ = '_wrap_14rhu_1',
  P_ = { wrap: I_ };
function e2({ x: c, y: u, color: s = 'var(--c-primary-hi)', duration: o = 220, onDone: m }) {
  const d = oe.useId().replace(/:/g, 'eh'),
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
        className: `${d}-w ${P_.wrap}`,
        style: { left: `${c}%`, top: `${u}%` },
        onAnimationEnd: m,
        children: r.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const t2 = '_root_2lc0r_2',
  a2 = '_boss_2lc0r_12',
  l2 = '_elite_2lc0r_16',
  n2 = '_sizeSm_2lc0r_21',
  i2 = '_sizeMd_2lc0r_25',
  c2 = '_sizeLg_2lc0r_29',
  s2 = '_header_2lc0r_35',
  u2 = '_headerRight_2lc0r_42',
  o2 = '_hpText_2lc0r_50',
  Na = {
    root: t2,
    boss: a2,
    elite: l2,
    sizeSm: n2,
    sizeMd: i2,
    sizeLg: c2,
    header: s2,
    headerRight: u2,
    hpText: o2,
  },
  r2 = '_badge_4fy54_1',
  f2 = '_glow_4fy54_90',
  d2 = '_iconLeft_4fy54_118',
  Di = {
    badge: r2,
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
    glow: f2,
    iconLeft: d2,
  };
function js({
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
    const p = Math.min(Math.max(1, Math.floor(s)), 12);
    h = { '--badge-color': `var(--c-tier-${Math.min(p, 10)})` };
  } else
    y === 'patch-tier' &&
      s != null &&
      (h = { '--badge-color': `var(--c-patch-t${Math.min(Math.max(1, Math.floor(s)), 5)})` });
  let g = c;
  return (
    g == null &&
      (y === 'tier' && s != null
        ? (g = `T${s}`)
        : y === 'patch-tier' && s != null
          ? (g = `T${s}`)
          : (g = '')),
    r.jsxs('span', {
      className: [Di.badge, Di[`variant-${y}`], Di[`size-${o}`], m ? Di.glow : '']
        .filter(Boolean)
        .join(' '),
      style: h,
      children: [
        d != null && r.jsx('span', { className: Di.iconLeft, 'aria-hidden': 'true', children: d }),
        g,
      ],
    })
  );
}
const m2 = '_root_1pi3d_2',
  h2 = '_sizeSm_1pi3d_11',
  v2 = '_sizeMd_1pi3d_15',
  y2 = '_sizeLg_1pi3d_19',
  g2 = '_fill_1pi3d_23',
  p2 = '_label_1pi3d_29',
  _2 = '_withTrailing_1pi3d_46',
  b2 = '_trailingLabel_1pi3d_56',
  tl = {
    root: m2,
    sizeSm: h2,
    sizeMd: v2,
    sizeLg: y2,
    fill: g2,
    label: p2,
    withTrailing: _2,
    trailingLabel: b2,
  },
  S2 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  x2 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function ys({
  value: c,
  max: u,
  color: s = 'primary',
  size: o = 'md',
  variant: m = 'solid',
  showLabel: d = !1,
  label: h,
  trailingLabel: y,
  glow: g = !1,
  reverse: p = !1,
}) {
  const b = Math.max(1, u),
    T = Math.min(Math.max(0, c), b),
    E = (T / b) * 100,
    C = S2[s],
    O = g || m === 'neon' ? x2[s] : void 0,
    U = { sm: tl.sizeSm, md: tl.sizeMd, lg: tl.sizeLg }[o],
    q = {
      width: `${E}%`,
      backgroundColor: C,
      ...(O != null ? { boxShadow: O } : {}),
      ...(p ? { marginLeft: 'auto' } : {}),
    },
    F = h ?? `${T} / ${b}`,
    ae = r.jsxs('div', {
      className: `${tl.root} ${U}`,
      role: 'progressbar',
      'aria-valuenow': T,
      'aria-valuemin': 0,
      'aria-valuemax': b,
      'aria-label': h ?? `${T} / ${b}`,
      children: [
        r.jsx('div', { className: tl.fill, style: q }),
        d && r.jsx('span', { className: tl.label, children: F }),
      ],
    });
  return y == null
    ? ae
    : r.jsxs('div', {
        className: tl.withTrailing,
        children: [ae, r.jsx('span', { className: tl.trailingLabel, children: y })],
      });
}
function j2(c, u) {
  if (u.isZero()) return 0;
  const s = parseFloat(c.toString()),
    o = parseFloat(u.toString());
  return o === 0 || isNaN(o) ? 0 : Math.min(1e3, Math.max(0, Math.round((s / o) * 1e3)));
}
const T2 = { sm: Na.sizeSm, md: Na.sizeMd, lg: Na.sizeLg };
function A2({
  name: c,
  variant: u,
  current: s,
  max: o,
  tier: m,
  size: d = 'md',
  showValue: h = !0,
  type: y,
  currentHp: g,
  maxHp: p,
}) {
  const b = u ?? y ?? 'normal',
    T = s ?? g ?? 0,
    E = o ?? p ?? 0,
    C = typeof T == 'number' ? ze.fromNumber(T) : T,
    O = typeof E == 'number' ? ze.fromNumber(E) : E,
    U = j2(C, O),
    q = U <= 250,
    F = q ? 'hp-low' : 'hp',
    ae = d === 'lg' ? 'lg' : d === 'sm' ? 'sm' : 'md';
  let re;
  return (
    b === 'boss'
      ? (re = { boxShadow: 'var(--glow-danger-md)' })
      : b === 'elite' && (re = { boxShadow: 'var(--glow-purple-md)' }),
    r.jsxs('div', {
      className: [Na.root, b === 'boss' ? Na.boss : '', b === 'elite' ? Na.elite : '', T2[d]]
        .filter(Boolean)
        .join(' '),
      style: re,
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
                  r.jsx(js, { text: b.toUpperCase(), variant: b, glow: b === 'boss' }),
              ],
            }),
          ],
        }),
        r.jsx(ys, { value: U, max: 1e3, color: F, size: ae, glow: q }),
        h &&
          r.jsx('div', {
            className: Na.hpText,
            children: r.jsxs(G, {
              variant: 'numeric-s',
              color: q ? 'danger' : 'mid',
              children: [C.toDisplay(), ' / ', O.toDisplay()],
            }),
          }),
      ],
    })
  );
}
const N2 = [
  { id: 'p1', x: 30, y: 22, kind: 'normal' },
  { id: 'p2', x: 65, y: 18, kind: 'normal' },
  { id: 'p3', x: 50, y: 30, kind: 'elite' },
  { id: 'p4', x: 78, y: 38, kind: 'normal' },
  { id: 'p5', x: 22, y: 50, kind: 'normal' },
  { id: 'p6', x: 60, y: 72, kind: 'boss' },
];
function z2(c) {
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
function E2(c) {
  return c !== 'normal';
}
function M2(c) {
  return c === 'boss' ? 'boss' : c === 'elite' || c === 'miniboss' ? 'elite' : 'normal';
}
function C2(c) {
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
function Vh(c) {
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
  machinePosition: u = { x: 50, y: 50 },
  damageEvents: s,
  hitEvents: o,
  deathEvents: m,
  onDamageDone: d,
  onHitDone: h,
  onDeathDone: y,
  range: g,
  dummyPins: p = N2,
}) {
  const b = u.x,
    T = u.y,
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
            style: { left: `${C.x}%`, top: `${C.y}%`, color: Vh(C.kind) },
            'aria-hidden': !0,
            children: r.jsx(Ee, {
              name: 'target',
              size: C.kind === 'boss' ? 18 : C.kind === 'elite' ? 16 : 14,
              color: Vh(C.kind),
            }),
          },
          C.id
        )
      ),
      c.map((C) => {
        const O = E2(C.kind),
          U = C2(C.kind),
          q = C.kind === 'boss' ? 32 : C.kind === 'miniboss' ? 28 : 22;
        return r.jsxs(
          'div',
          {
            className: [el.enemy, O ? el.enemyUpper : ''].filter(Boolean).join(' '),
            style: { left: `${C.position.x}%`, top: `${C.position.y}%` },
            'aria-label': `${C.kind}`,
            children: [
              r.jsx(Ee, { name: z2(C.kind), size: q, color: U }),
              O &&
                r.jsx('div', {
                  className: el.enemyHpBar,
                  children: r.jsx(A2, {
                    name: C.kind,
                    variant: M2(C.kind),
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
      s.map((C) =>
        r.jsx(
          K_,
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
        r.jsx(e2, { x: C.x, y: C.y, onDone: () => (h == null ? void 0 : h(C.id)) }, C.id)
      ),
      m.map((C) =>
        r.jsx(F_, { x: C.x, y: C.y, onDone: () => (y == null ? void 0 : y(C.id)) }, C.id)
      ),
    ],
  });
}
const O2 = '_root_1rwl0_2',
  R2 = '_topRow_1rwl0_13',
  D2 = '_weaponSlots_1rwl0_21',
  B2 = '_activeArea_1rwl0_29',
  L2 = '_activeButton_1rwl0_37',
  H2 = '_activeDisabled_1rwl0_57',
  q2 = '_modeToggle_1rwl0_66',
  U2 = '_modeToggleOn_1rwl0_89',
  G2 = '_sheetHandleTrigger_1rwl0_96',
  V2 = '_workshopGrid_1rwl0_112',
  $2 = '_bottomRow_1rwl0_120',
  Y2 = '_currencyArea_1rwl0_126',
  k2 = '_speedArea_1rwl0_131',
  Z2 = '_sysButtons_1rwl0_138',
  pt = {
    root: O2,
    topRow: R2,
    weaponSlots: D2,
    activeArea: B2,
    activeButton: L2,
    activeDisabled: H2,
    modeToggle: q2,
    modeToggleOn: U2,
    sheetHandleTrigger: G2,
    workshopGrid: V2,
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
function g1({
  value: c,
  max: u,
  size: s = 24,
  color: o = 'primary',
  thickness: m = 3,
  glow: d = !1,
  showLabel: h = !1,
  withLabel: y = !1,
  label: g,
  children: p,
}) {
  const b = typeof s == 'number' ? s : I2[s],
    T =
      u != null
        ? Math.min(Math.max(0, c), Math.max(1, u)) / Math.max(1, u)
        : Math.min(Math.max(0, c), 100) / 100,
    E = u != null ? Math.min(Math.max(0, c), Math.max(1, u)) : c,
    C = u != null ? Math.max(1, u) : 100,
    O = P2[o],
    U = d ? eb[o] : void 0,
    q = b / 2,
    F = q - m / 2,
    ae = 2 * Math.PI * F,
    re = ae * (1 - T),
    Xe = h || y || p != null,
    ce = g ?? `${Math.round(T * 100)}%`;
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
            cx: q,
            cy: q,
            r: F,
            fill: 'none',
            strokeWidth: m,
          }),
          r.jsx('circle', {
            className: zn.arc,
            cx: q,
            cy: q,
            r: F,
            fill: 'none',
            stroke: O,
            strokeWidth: m,
            strokeLinecap: 'round',
            strokeDasharray: ae,
            strokeDashoffset: re,
            style: U != null ? { filter: `drop-shadow(0 0 4px ${O})` } : void 0,
            transform: `rotate(-90 ${q} ${q})`,
          }),
        ],
      }),
      Xe &&
        r.jsx('span', {
          className: zn.center,
          children:
            p ?? r.jsx('span', { className: zn.labelText, style: { color: O }, children: ce }),
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
  p1 = ({ options: c, value: u, onChange: s, size: o = 'md', disabled: m = !1 }) =>
    r.jsx('div', {
      className: [En.root, En[`size-${o}`], m ? En.disabled : ''].join(' '),
      role: 'group',
      children: c.map((d) => {
        const h = d.value === u;
        return r.jsx(
          'button',
          {
            type: 'button',
            role: 'radio',
            'aria-checked': h,
            className: [En.segment, h ? En.selected : En.unselected].join(' '),
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
  cb = '_container_9k8su_1',
  sb = '_handle_9k8su_13',
  ub = '_dragging_9k8su_21',
  Jo = { container: cb, handle: sb, dragging: ub };
function ob({ className: c, dragging: u, width: s, onPointerDown: o }) {
  return r.jsx('div', {
    className: [Jo.container, c].filter(Boolean).join(' '),
    'aria-hidden': 'true',
    onPointerDown: o,
    children: r.jsx('span', {
      className: [Jo.handle, u ? Jo.dragging : ''].filter(Boolean).join(' '),
      style: s !== void 0 ? { width: `${s}px` } : void 0,
    }),
  });
}
const rb = '_root_afe45_2',
  fb = '_swapDisabled_afe45_14',
  db = '_active_afe45_20',
  mb = '_onCd_afe45_27',
  hb = '_iconWrap_afe45_27',
  vb = '_cdOverlay_afe45_47',
  yb = '_cdProgress_afe45_57',
  gb = '_swapOverlay_afe45_68',
  al = {
    root: rb,
    swapDisabled: fb,
    active: db,
    onCd: mb,
    iconWrap: hb,
    cdOverlay: vb,
    cdProgress: yb,
    swapOverlay: gb,
  },
  pb = { sm: 40, md: 52, lg: 64 },
  _b = { sm: 18, md: 24, lg: 30 };
function bb({
  weapon: c,
  active: u = !1,
  ready: s = !1,
  cdProgress: o = 100,
  swapDisabled: m = !1,
  size: d = 'md',
  onClick: h,
}) {
  const y = pb[d],
    g = _b[d],
    p = o < 100,
    b = [al.root, u ? al.active : '', p ? al.onCd : '', m ? al.swapDisabled : '']
      .filter(Boolean)
      .join(' ');
  return r.jsxs('button', {
    type: 'button',
    className: b,
    style: { width: y, height: y, minWidth: y, minHeight: y },
    onClick: m ? void 0 : h,
    disabled: m && h == null,
    'aria-label': `${c} weapon slot${u ? ' (active)' : ''}${p ? ` (cooldown ${o}%)` : s ? ' (ready)' : ''}`,
    'aria-pressed': u,
    children: [
      r.jsx('span', {
        className: al.iconWrap,
        children: r.jsx(Ee, {
          name: c,
          size: g,
          color: u ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      p &&
        r.jsxs(r.Fragment, {
          children: [
            r.jsx('span', { className: al.cdOverlay, 'aria-hidden': 'true' }),
            r.jsx('span', {
              className: al.cdProgress,
              'aria-hidden': 'true',
              children: r.jsx(g1, {
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
const Sb = [
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
function xb(c, u) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, u));
}
function $h(c) {
  return 1 + 0.1 * c;
}
const Yh = ['laser', 'cannon', 'thunder', 'cutter'],
  jb = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
  ];
function Tb({
  screw: c,
  equippedWeapon: u,
  weaponCds: s,
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
  onToggleWorkshop: q,
  workshopLevels: F,
  onWorkshopUpgrade: ae,
}) {
  const re = o > 0,
    we = d || re,
    Xe = Yh.some((ce) => ce !== u && (s[ce] ?? 100) < 100);
  return r.jsxs('div', {
    className: pt.root,
    children: [
      q != null && r.jsx(Ab, { isOpen: U, onToggle: q }),
      r.jsxs('div', {
        className: pt.topRow,
        children: [
          r.jsx('div', {
            className: pt.weaponSlots,
            children: Yh.map((ce) =>
              r.jsx(
                bb,
                {
                  weapon: ce,
                  active: ce === u,
                  cdProgress: s[ce] ?? 100,
                  swapDisabled: Xe && ce !== u,
                  size: 'md',
                  onClick: () => {
                    h(ce);
                  },
                },
                ce
              )
            ),
          }),
          r.jsxs('div', {
            className: pt.activeArea,
            children: [
              r.jsx('button', {
                type: 'button',
                className: [pt.activeButton, we ? pt.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: we ? void 0 : y,
                disabled: we,
                'aria-label': `アクティブスキル発動${re ? ' (クールダウン中)' : d ? ' (自動モード)' : ''}`,
                children: r.jsx(g1, {
                  value: re ? o : m,
                  max: m > 0 ? m : 1,
                  size: 64,
                  color: re ? 'cd' : 'primary',
                  glow: !re && !d,
                  thickness: 4,
                  children: r.jsx(Ee, {
                    name: 'lightning',
                    size: 26,
                    color: we ? 'var(--c-text-disabled)' : 'var(--c-secondary)',
                  }),
                }),
              }),
              r.jsx('button', {
                type: 'button',
                className: [pt.modeToggle, d ? pt.modeToggleOn : ''].filter(Boolean).join(' '),
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
      U &&
        r.jsx('div', {
          className: pt.workshopGrid,
          role: 'group',
          'aria-label': 'ラン中ワークショップ',
          children: Sb.map((ce) => {
            const I = (F == null ? void 0 : F[ce.key]) ?? 0,
              Ue = $h(I),
              it = $h(I + 1),
              Qe = xb(ce, I),
              Re = c.lt(ze.fromNumber(Qe));
            return r.jsx(
              dr,
              {
                title: ce.title.replace(/\s*倍率$/, ''),
                iconName: ce.iconName,
                currentLabel: `Lv ${I}`,
                before: Ue,
                after: it,
                beforeSuffix: '×',
                currency: 'screw',
                accent: 'warning',
                options: [{ amount: '+1', cost: ze.fromNumber(Qe), disabled: Re }],
                onUpgrade: () => (ae == null ? void 0 : ae(ce.key)),
              },
              ce.key
            );
          }),
        }),
      r.jsxs('div', {
        className: pt.bottomRow,
        children: [
          r.jsx('div', {
            className: pt.currencyArea,
            children: r.jsx(Gi, { currency: 'screw', value: c, size: 'lg' }),
          }),
          r.jsx('div', {
            className: pt.speedArea,
            children: r.jsx(p1, { options: jb, value: p, onChange: b, size: 'sm' }),
          }),
          r.jsxs('div', {
            className: pt.sysButtons,
            children: [
              r.jsx(fs, {
                icon: T ? 'play' : 'pause',
                label: T ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: T,
                onClick: E,
              }),
              r.jsx(fs, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: C,
              }),
              r.jsx(fs, {
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
function Ab({ isOpen: c, onToggle: u }) {
  const s = oe.useRef(null),
    o = oe.useRef(!1),
    m = (y) => {
      ((s.current = y.clientY), (o.current = !1), y.currentTarget.setPointerCapture(y.pointerId));
    },
    d = (y) => {
      if (s.current == null || o.current) return;
      const g = s.current - y.clientY,
        p = 24;
      ((g > p && !c) || (g < -p && c)) && ((o.current = !0), u());
    },
    h = (y) => {
      ((s.current = null), (o.current = !1));
      try {
        y.currentTarget.releasePointerCapture(y.pointerId);
      } catch {}
    };
  return r.jsx('div', {
    className: pt.sheetHandleTrigger,
    onPointerDown: m,
    onPointerMove: d,
    onPointerUp: h,
    onPointerCancel: h,
    role: 'separator',
    'aria-orientation': 'horizontal',
    'aria-label': c ? 'ドラッグでワークショップを閉じる' : 'ドラッグでワークショップを開く',
    'aria-expanded': c,
    children: r.jsx(ob, { dragging: c }),
  });
}
const Nb = '_root_1mk5i_3',
  zb = '_hpDivider_1mk5i_30',
  Eb = '_srOnly_1mk5i_42',
  Mn = { root: Nb, hpDivider: zb, srOnly: Eb },
  Mb = '_root_nxl33_2',
  Cb = '_boss_nxl33_14',
  wb = '_header_nxl33_20',
  Ob = '_waveLabel_nxl33_26',
  Rb = '_waveNum_nxl33_35',
  Db = '_milestone_nxl33_41',
  Bb = '_milestoneText_nxl33_48',
  Lb = '_seconds_nxl33_58',
  ja = {
    root: Mb,
    boss: Cb,
    header: wb,
    waveLabel: Ob,
    waveNum: Rb,
    milestone: Db,
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
  secondsLeft: u,
  secondsMax: s,
  nextMilestone: o,
  showSeconds: m = !0,
  size: d = 'md',
}) {
  const h = (o == null ? void 0 : o.kind) === 'boss',
    y = o != null ? Hb[o.kind] : null;
  return r.jsxs('div', {
    className: [ja.root, ja[`size-${d}`], h ? ja.boss : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: ja.header,
        children: [
          r.jsxs('span', {
            className: ja.waveLabel,
            style: { fontSize: qb[d] },
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
              children: r.jsxs(G, { variant: 'numeric-s', color: 'mid', children: [u, 's'] }),
            }),
        ],
      }),
      r.jsx(ys, {
        value: u,
        max: Math.max(1, s),
        color: h ? 'secondary' : 'wave',
        size: d === 'lg' ? 'md' : 'sm',
        glow: h,
      }),
    ],
  });
}
function Gb({
  hpCurrent: c,
  hpMax: u,
  shieldCurrent: s,
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
    C = s != null && o != null,
    O = kh(c, u),
    U = C ? kh(s, o) : 0;
  return r.jsxs('div', {
    className: Mn.root,
    role: 'group',
    'aria-label': 'バトル状態',
    children: [
      r.jsxs('div', {
        className: Mn.headerRow,
        children: [
          r.jsx(js, { variant: 'tier', tier: m, size: 'md', glow: !0 }),
          r.jsx(G, { variant: 'label', color: 'dim', style: { fontSize: 10 }, children: 'HP' }),
          r.jsxs('span', {
            className: Mn.hpValue,
            'aria-label': `HP ${c.toDisplay()} / ${u.toDisplay()}`,
            children: [
              r.jsx(sl, {
                value: c,
                size: 'sm',
                accentColor: T ? 'danger' : 'text',
                glow: T,
                style: { fontSize: 14 },
              }),
              r.jsx('span', { className: Mn.hpDivider, children: '/' }),
              r.jsx(sl, { value: u, size: 'sm', accentColor: 'dim', style: { fontSize: 11 } }),
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
                  value: s,
                  size: 'sm',
                  accentColor: 'primary',
                  style: { fontSize: 11 },
                }),
              ],
            }),
        ],
      }),
      r.jsx(ys, { value: O, max: 100, color: O <= 30 ? 'hp-low' : 'hp', size: 'md' }),
      C && r.jsx(ys, { value: U, max: 100, color: 'shield', size: 'sm' }),
      r.jsx(Ub, {
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
function kh(c, u) {
  const s = parseFloat(c.toString()),
    o = parseFloat(u.toString());
  return o === 0 ? 0 : Math.max(0, Math.min(100, (s / o) * 100));
}
const Vb = '_card_1o3jz_1',
  $b = '_header_1o3jz_8',
  Yb = '_soundSection_1o3jz_13',
  kb = '_sliderRow_1o3jz_19',
  Zb = '_sliderLabel_1o3jz_26',
  Xb = '_sliderValue_1o3jz_31',
  Qb = '_divider_1o3jz_38',
  Kb = '_actions_1o3jz_44',
  Wt = {
    card: Vb,
    header: $b,
    soundSection: Yb,
    sliderRow: kb,
    sliderLabel: Zb,
    sliderValue: Xb,
    divider: Qb,
    actions: Kb,
  },
  Jb = '_button_10kfo_1',
  Wb = '_fullWidth_10kfo_109',
  Fb = '_iconLeft_10kfo_113',
  Ib = '_iconRight_10kfo_114',
  Pb = '_label_10kfo_120',
  Ml = {
    button: Jb,
    'variant-primary': '_variant-primary_10kfo_28',
    'variant-secondary': '_variant-secondary_10kfo_42',
    'variant-danger': '_variant-danger_10kfo_56',
    'variant-ghost': '_variant-ghost_10kfo_70',
    'size-sm': '_size-sm_10kfo_85',
    'size-md': '_size-md_10kfo_93',
    'size-lg': '_size-lg_10kfo_101',
    fullWidth: Wb,
    iconLeft: Fb,
    iconRight: Ib,
    label: Pb,
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
  type: g = 'button',
}) {
  return r.jsxs('button', {
    type: g,
    className: [Ml.button, Ml[`variant-${u}`], Ml[`size-${s}`], o ? Ml.fullWidth : '']
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
const eS = '_overlay_1i1z1_12',
  tS = '_fullscreen_1i1z1_21',
  aS = '_absolute_1i1z1_27',
  lS = '_alignCenter_1i1z1_33',
  nS = '_alignTop_1i1z1_38',
  iS = '_alignBottom_1i1z1_44',
  cS = '_content_1i1z1_50',
  Rl = {
    overlay: eS,
    fullscreen: tS,
    absolute: aS,
    alignCenter: lS,
    alignTop: nS,
    alignBottom: iS,
    content: cS,
  },
  sS = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Zh = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  uS = { center: Rl.alignCenter, top: Rl.alignTop, bottom: Rl.alignBottom };
function hr({
  fullscreen: c = !0,
  children: u,
  onClose: s,
  dismissible: o = !0,
  dimLevel: m = 'normal',
  blur: d = 0,
  align: h = 'center',
  zIndex: y = 'overlay',
  style: g,
  open: p,
}) {
  const b = () => {
      o && s && s();
    },
    T = (U) => {
      U.stopPropagation();
    },
    E = sS[m],
    C = typeof y == 'number' ? y : (Zh[y] ?? Zh.overlay),
    O = {
      background: `rgba(2, 4, 10, ${E})`,
      zIndex: C,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...g,
    };
  return r.jsx('div', {
    className: [Rl.overlay, c ? Rl.fullscreen : Rl.absolute, uS[h]].join(' '),
    style: O,
    onClick: b,
    role: 'presentation',
    'aria-modal': 'true',
    children: r.jsx('div', { className: Rl.content, onClick: T, children: u }),
  });
}
const oS = '_wrapper_131tr_1',
  rS = '_disabled_131tr_5',
  fS = '_input_131tr_18',
  os = {
    wrapper: oS,
    disabled: rS,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: fS,
  },
  lr = ({
    value: c,
    min: u = 0,
    max: s = 1,
    step: o = 0.01,
    onChange: m,
    color: d = 'primary',
    disabled: h = !1,
  }) => {
    const y = s === u ? 0 : ((c - u) / (s - u)) * 100,
      g = (b) => {
        h || m(parseFloat(b.target.value));
      },
      p = { '--slider-fill-pct': `${y}%` };
    return r.jsx('div', {
      className: [os.wrapper, os[`color-${d}`], h ? os.disabled : ''].join(' '),
      style: p,
      children: r.jsx('input', {
        type: 'range',
        className: os.input,
        min: u,
        max: s,
        step: o,
        value: c,
        onChange: g,
        disabled: h,
        'aria-valuenow': c,
        'aria-valuemin': u,
        'aria-valuemax': s,
      }),
    });
  },
  dS = '_dialog_49iek_13',
  mS = '_card_49iek_20',
  hS = '_titleRow_49iek_27',
  vS = '_titleIcon_49iek_33',
  yS = '_title_49iek_27',
  gS = '_message_49iek_46',
  pS = '_actions_49iek_50',
  _S = '_variantDanger_49iek_57',
  ll = {
    dialog: dS,
    card: mS,
    titleRow: hS,
    titleIcon: vS,
    title: yS,
    message: gS,
    actions: pS,
    variantDanger: _S,
  };
function _1({
  open: c,
  title: u,
  message: s,
  iconName: o,
  confirmLabel: m = '確定',
  cancelLabel: d = 'キャンセル',
  onConfirm: h,
  onCancel: y,
  variant: g = 'default',
}) {
  return c
    ? r.jsx(hr, {
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
                  r.jsx(G, { variant: 'heading-3', as: 'h2', className: ll.title, children: u }),
                ],
              }),
              s != null &&
                s.length > 0 &&
                r.jsx(G, { variant: 'body', color: 'mid', className: ll.message, children: s }),
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
function bS({
  open: c,
  bgmVolume: u,
  seVolume: s,
  onBgmChange: o,
  onSeChange: m,
  onRetreat: d,
  onClose: h,
}) {
  const [y, g] = oe.useState(!1);
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
      r.jsx(hr, {
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
                      children: Math.round(u * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(lr, { value: u, min: 0, max: 1, step: 0.01, onChange: o, color: 'primary' }),
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
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(lr, { value: s, min: 0, max: 1, step: 0.01, onChange: m, color: 'primary' }),
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
      r.jsx(_1, {
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
const SS = '_card_1fzt0_2',
  xS = '_header_1fzt0_14',
  jS = '_statusText_1fzt0_19',
  TS = '_section_1fzt0_23',
  AS = '_sectionTitle_1fzt0_29',
  NS = '_statsGrid_1fzt0_35',
  zS = '_statItem_1fzt0_41',
  ES = '_rewardList_1fzt0_52',
  MS = '_rewardCurrency_1fzt0_58',
  CS = '_patchList_1fzt0_66',
  wS = '_patchItem_1fzt0_72',
  OS = '_actions_1fzt0_87',
  Fe = {
    card: SS,
    header: xS,
    statusText: jS,
    section: TS,
    sectionTitle: AS,
    statsGrid: NS,
    statItem: zS,
    rewardList: ES,
    rewardCurrency: MS,
    patchList: CS,
    patchItem: wS,
    actions: OS,
  },
  RS = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  DS = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function BS(c) {
  const u = Math.floor(c / 60),
    s = Math.floor(c % 60);
  return `${u.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function LS({
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
  const g = RS[u],
    p = DS[u];
  return r.jsx(hr, {
    open: c,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: r.jsxs(Ll, {
      variant: 'elevated',
      padding: 'lg',
      className: Fe.card,
      children: [
        r.jsx('div', {
          className: Fe.header,
          children: r.jsx(G, {
            variant: 'heading-1',
            as: 'h2',
            color: p,
            align: 'center',
            className: Fe.statusText,
            children: g,
          }),
        }),
        r.jsxs('div', {
          className: Fe.section,
          children: [
            r.jsx(G, {
              variant: 'label',
              color: 'mid',
              className: Fe.sectionTitle,
              children: 'バトル記録',
            }),
            r.jsxs('div', {
              className: Fe.statsGrid,
              children: [
                r.jsxs('div', {
                  className: Fe.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: s.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Fe.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: o.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Fe.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: m.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: Fe.statItem,
                  children: [
                    r.jsx(G, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    r.jsx(G, { variant: 'numeric-m', color: 'primary', children: BS(d) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        r.jsxs('div', {
          className: Fe.section,
          children: [
            r.jsx(G, {
              variant: 'label',
              color: 'mid',
              className: Fe.sectionTitle,
              children: '獲得',
            }),
            r.jsxs('div', {
              className: Fe.rewardList,
              children: [
                r.jsx('div', {
                  className: Fe.rewardCurrency,
                  children: r.jsx(Gi, { currency: 'bolt', value: h.bolt, size: 'lg' }),
                }),
                r.jsx('div', {
                  className: Fe.rewardCurrency,
                  children: r.jsx(Gi, { currency: 'alloy', value: h.alloy, size: 'lg' }),
                }),
                h.patches.length > 0 &&
                  r.jsx('div', {
                    className: Fe.patchList,
                    children: h.patches.map((b, T) =>
                      r.jsxs(
                        'div',
                        {
                          className: Fe.patchItem,
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
          className: Fe.actions,
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
const HS = '_root_9fvdn_2',
  qS = { root: HS },
  Wo = [
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
function US({ items: c = [], showTower: u = !1, towerContent: s = null, cycleSeconds: o = 24 }) {
  const d = `ssfx-${oe.useId().replace(/:/g, '')}`,
    h = Wo.map((T, E) => {
      const C = 100 / T.length,
        O = T.map(([U, q], F) => {
          const ae = F * C;
          return `
          ${ae}%               { left: ${U}%; top: ${q}%; opacity: 0; }
          ${(ae + 3).toFixed(2)}%   { left: ${U}%; top: ${q}%; opacity: 1; }
          ${(ae + C - 7).toFixed(2)}%  { left: ${U}%; top: ${q}%; opacity: 1; }
          ${(ae + C - 3).toFixed(2)}%  { left: ${U}%; top: ${q}%; opacity: 0; }
        `;
        }).join('');
      return `@keyframes ${d}-drift-${E + 1} { ${O} 100% { opacity: 0; } }`;
    }).join(`
`),
    y = Wo.map(
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
        r.jsx('div', { className: `${d}-tower-core`, children: s }),
      ],
    }),
    b = u ? [p, ...c] : [...c];
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
        const C = (E % Wo.length) + 1,
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
function GS({ open: c, onClose: u }) {
  return c
    ? r.jsx('div', {
        className: qS.root,
        onClick: u,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (s) => {
          (s.key === 'Enter' || s.key === ' ') && u();
        },
        children: r.jsx(US, {
          showTower: !0,
          towerContent: r.jsx(Ee, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
const VS = 30,
  $S = 30,
  YS = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 };
function kS(c, u) {
  return c && u <= 0 ? 'gameover' : null;
}
function ZS() {
  const { navigate: c } = ul(),
    u = X((ee) => ee.isRunActive),
    s = X((ee) => ee.screw),
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
    q = X((ee) => ee.switchWeapon),
    [F, ae] = oe.useState(!1),
    [re, we] = oe.useState(!1),
    [Xe, ce] = oe.useState(!1),
    [I, Ue] = oe.useState(!1),
    [it, Qe] = oe.useState(b),
    [Re, Ke] = oe.useState(YS),
    [kt] = oe.useState([]),
    [wt] = oe.useState([]),
    [ct] = oe.useState([]),
    R = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    V = kS(u, o),
    [W, _e] = oe.useState(null),
    be = W ?? V,
    x = be !== null,
    H = ze.fromNumber(o),
    $ = ze.fromNumber(m > 0 ? m : 1),
    k = (ee) => {
      Qe(ee);
    },
    P = () => {
      Ue((ee) => !ee);
    },
    ie = () => {
      we(!0);
    },
    ve = () => {
      ce(!0);
    },
    Ie = () => {
      (we(!1), _e('retreat'));
    },
    De = () => {
      c('preparation');
    },
    ol = (ee) => {
      Ke((Ul) => ({ ...Ul, [ee]: Ul[ee] + 1 }));
    },
    Hl = { bolt: ze.ZERO, alloy: ze.ZERO, patches: [] },
    ql = 30;
  return r.jsxs('div', {
    className: Uh.root,
    children: [
      r.jsx(Bl, {
        noScroll: !0,
        variant: 'battle',
        header: r.jsx(Gb, {
          hpCurrent: H,
          hpMax: $,
          tier: d,
          wave: h,
          totalWaves: ql,
          secondsRemaining: 30,
          secondsTotal: 30,
          isBossWave: h === ql,
        }),
        footer: r.jsx(Tb, {
          screw: s,
          equippedWeapon: y,
          weaponCds: R,
          activeCd: g,
          activeMax: VS,
          isAutoActive: p,
          onSwitchWeapon: q,
          onActivate: () => {},
          onToggleAuto: U,
          gameSpeed: it,
          onSpeedChange: k,
          isPaused: I,
          onTogglePause: P,
          onOpenMenu: ie,
          onOpenScreenSaver: ve,
          isWorkshopOpen: F,
          onToggleWorkshop: () => {
            ae((ee) => !ee);
          },
          workshopLevels: Re,
          onWorkshopUpgrade: ol,
        }),
        children: r.jsx(w2, {
          enemies: [],
          damageEvents: kt,
          hitEvents: wt,
          deathEvents: ct,
          range: $S,
        }),
      }),
      r.jsxs('div', {
        className: Uh.overlayLayer,
        'aria-live': 'polite',
        children: [
          r.jsx(bS, {
            open: re,
            bgmVolume: T,
            seVolume: E,
            onBgmChange: C,
            onSeChange: O,
            onRetreat: Ie,
            onClose: () => {
              we(!1);
            },
          }),
          x &&
            r.jsx(LS, {
              open: x,
              status: be,
              reachedTier: d,
              reachedWave: h,
              killed: 0,
              elapsedSec: 0,
              reward: Hl,
              onClose: De,
            }),
          r.jsx(GS, {
            open: Xe,
            onClose: () => {
              ce(!1);
            },
          }),
        ],
      }),
    ],
  });
}
const XS = [
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
function Xh(c, u) {
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
function vr(c, u) {
  return Math.ceil(c.baseCost * Math.pow(c.costGrowth, u));
}
function Fo(c, u, s) {
  let o = 0;
  for (let m = 0; m < s && !(c.maxLv != null && u + m >= c.maxLv); m++) o += vr(c, u + m);
  return o;
}
function QS(c, u, s) {
  let o = 0,
    m = s,
    d = u;
  for (let h = 0; h < 1e4 && !(c.maxLv != null && d >= c.maxLv); h++) {
    const y = ze.fromNumber(vr(c, d));
    if (m.lt(y)) break;
    ((m = m.sub(y)), (d += 1), (o += 1));
  }
  return o;
}
const KS = '_root_in43u_3',
  JS = { root: KS };
function WS() {
  const c = X((m) => m.machineLevels),
    u = X((m) => m.bolt),
    s = X((m) => m.incrementMachineLv),
    o = X((m) => m.spendBolt);
  return r.jsx('div', {
    className: JS.root,
    children: XS.map((m) => {
      const d = c[m.key],
        h = m.maxLv != null && d >= m.maxLv,
        y = Xh(m, d),
        g = Xh(m, d + 1),
        p = (Qe) => (m.unit === '%' ? Math.round(Qe * 1e3) / 10 : Qe),
        b = p(y),
        T = p(g),
        E = vr(m, d),
        C = Fo(m, d, 5),
        O = ze.fromNumber(E),
        U = ze.fromNumber(C),
        q = QS(m, d, u),
        F = m.maxLv != null ? m.maxLv - d : Number.POSITIVE_INFINITY,
        ae = Math.min(q, F),
        re = ae > 0 ? Fo(m, d, ae) : E,
        we = ze.fromNumber(re),
        Xe = u.lt(O),
        ce = u.lt(U) || (m.maxLv != null && d + 5 > m.maxLv),
        I = ae < 1,
        Ue = h
          ? []
          : [
              { amount: '+1', cost: O, disabled: Xe },
              { amount: '+5', cost: U, disabled: ce },
              { amount: 'MAX', cost: we, disabled: I },
            ],
        it = (Qe) => {
          if (h) return;
          let Re = 0;
          if ((Qe === '+1' ? (Re = 1) : Qe === '+5' ? (Re = 5) : Qe === 'MAX' && (Re = ae), Re < 1))
            return;
          m.maxLv != null && (Re = Math.min(Re, m.maxLv - d));
          const Ke = Fo(m, d, Re),
            kt = ze.fromNumber(Ke);
          if (o(kt)) for (let ct = 0; ct < Re; ct++) s(m.key);
        };
      return r.jsx(
        dr,
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
          options: Ue,
          onUpgrade: it,
        },
        m.key
      );
    }),
  });
}
function FS() {
  const { navigate: c } = ul(),
    u = (s) => {
      c(s);
    };
  return r.jsx(Bl, {
    header: r.jsx(Yi, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: r.jsx($i, { active: 'machine', onChange: u }),
    children: r.jsx(WS, {}),
  });
}
const IS = () => r.jsx('div', { children: r.jsx('h1', { children: 'Not Found' }) }),
  PS = '_content_14xiq_1',
  ex = { content: PS },
  tx = '_root_1l9jp_1',
  ax = '_header_1l9jp_8',
  lx = '_headerTitleRow_1l9jp_15',
  nx = '_headerCount_1l9jp_21',
  ix = '_slotGrid_1l9jp_35',
  cx = '_emptyHint_1l9jp_41',
  Cn = { root: tx, header: ax, headerTitleRow: lx, headerCount: nx, slotGrid: ix, emptyHint: cx },
  sx = '_wrapper_16mrg_3',
  ux = '_filled_16mrg_16',
  ox = '_empty_16mrg_25',
  rx = '_locked_16mrg_26',
  fx = '_slotInner_16mrg_59',
  dx = '_emptyIcon_16mrg_67',
  mx = '_emptyLabel_16mrg_74',
  nl = {
    wrapper: sx,
    filled: ux,
    empty: ox,
    locked: rx,
    slotInner: fx,
    emptyIcon: dx,
    emptyLabel: mx,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  },
  hx = '_root_12m2l_3',
  vx = '_selected_12m2l_15',
  yx = '_merging_12m2l_19',
  gx = '_locked_12m2l_23',
  px = '_disabled_12m2l_28',
  _x = '_card_12m2l_34',
  bx = '_tierBadge_12m2l_46',
  Sx = '_count_12m2l_54',
  xx = '_countZero_12m2l_74',
  jx = '_iconWrap_12m2l_79',
  Tx = '_name_12m2l_90',
  Ax = '_detail_12m2l_102',
  Nx = '_trigger_12m2l_110',
  zx = '_effect_12m2l_121',
  Ex = '_mergingBadge_12m2l_133',
  ut = {
    root: hx,
    selected: vx,
    merging: yx,
    locked: gx,
    disabled: px,
    card: _x,
    tierBadge: bx,
    count: Sx,
    countZero: xx,
    iconWrap: jx,
    name: Tx,
    detail: Ax,
    trigger: Nx,
    effect: zx,
    mergingBadge: Ex,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  Mx = { sm: 22, md: 26, lg: 32 },
  Qh = { sm: 38, md: 44, lg: 52 };
function yr({
  name: c,
  iconName: u,
  tier: s,
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
  const E = Math.min(Math.max(1, Math.floor(s)), 5),
    C = `var(--c-patch-t${E})`,
    O = T != null && !p && !g,
    U = h ? { boxShadow: 'var(--glow-cyan-md)' } : y ? { boxShadow: 'var(--glow-purple-md)' } : {},
    q = {
      width: Qh[b],
      height: Qh[b],
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
      ut.root,
      h ? ut.selected : '',
      y ? ut.merging : '',
      g ? ut.locked : '',
      p ? ut.disabled : '',
      ut[`size-${b}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: U,
    onClick: O ? T : void 0,
    role: O ? 'button' : void 0,
    tabIndex: O ? 0 : void 0,
    onKeyDown: O
      ? (ae) => {
          (ae.key === 'Enter' || ae.key === ' ') && (ae.preventDefault(), T == null || T());
        }
      : void 0,
    'aria-pressed': O ? h : void 0,
    'aria-disabled': p || g ? !0 : void 0,
    children: r.jsxs(Ll, {
      variant: 'elevated',
      padding: 'sm',
      interactive: O,
      className: ut.card,
      children: [
        !g &&
          r.jsx('span', {
            className: ut.tierBadge,
            children: r.jsx(js, { text: `T${E}`, variant: 'patch-tier', tier: s }),
          }),
        r.jsxs('span', {
          className: [ut.count, o === 0 ? ut.countZero : ''].filter(Boolean).join(' '),
          style: F,
          children: ['×', g ? '?' : o],
        }),
        r.jsx('div', {
          className: ut.iconWrap,
          style: q,
          children: r.jsx(Ee, {
            name: g ? 'close' : u,
            size: Mx[b],
            color: g ? 'var(--c-text-disabled)' : C,
          }),
        }),
        r.jsx(G, {
          variant: 'caption',
          color: g ? 'dim' : 'text',
          className: ut.name,
          children: g ? '???' : c,
        }),
        !g &&
          r.jsxs('div', {
            className: ut.detail,
            children: [
              r.jsx('span', { className: ut.trigger, children: m }),
              r.jsx('span', { className: ut.effect, children: d }),
            ],
          }),
        y && r.jsx('span', { className: ut.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
function b1({ patch: c = null, slotIndex: u, locked: s = !1, size: o = 'md', onClick: m }) {
  const d = c != null,
    h = m != null && !s,
    y = u != null ? `Slot ${u}` : '',
    g = d
      ? `Slot ${u ?? ''}: ${c.name} (Tier ${c.tier})`
      : s
        ? `Slot ${u ?? ''} (locked)`.trim()
        : `Slot ${u ?? ''} (empty)`.trim(),
    p = d ? nl.filled : s ? nl.locked : nl.empty;
  return r.jsx('div', {
    className: [nl.wrapper, p, nl[`size-${o}`]].filter(Boolean).join(' '),
    role: h ? 'button' : void 0,
    tabIndex: h ? 0 : void 0,
    'aria-label': g,
    'aria-disabled': s ? !0 : void 0,
    onClick: h ? m : void 0,
    onKeyDown: h
      ? (b) => {
          (b.key === 'Enter' || b.key === ' ') && (b.preventDefault(), m == null || m());
        }
      : void 0,
    children:
      d && c != null
        ? r.jsx(yr, {
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
                  name: s ? 'close' : 'plus',
                  size: 28,
                  color: s ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              r.jsx('span', { className: nl.emptyLabel, children: s ? 'LOCKED' : y }),
            ],
          }),
  });
}
function Cx(c) {
  return Math.min(1 + c, Bn);
}
const wx = {
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
  Rx = {
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
function Dx({ overridePatches: c, overrideEquipped: u, overridePatchSlotsLv: s }) {
  const o = X((O) => O.patches),
    m = X((O) => O.equippedPatches),
    d = X((O) => O.machineLevels.patchSlots),
    h = X((O) => O.unequipPatch),
    y = c ?? o,
    g = u ?? m,
    b = Cx(s ?? d),
    T = (O) => {
      const U = g.get(O);
      if (!U) return null;
      const q = `${U.name}#${U.tier}`,
        F = y.get(q);
      return {
        patchId: q,
        name: U.name,
        iconName: wx[U.name] ?? 'spark',
        tier: U.tier,
        trigger: Ox[U.name] ?? '常時',
        effect: Rx[U.name] ?? '-',
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
          const q = U >= b,
            F = q ? null : T(U);
          return r.jsx(
            b1,
            { slotIndex: U + 1, patch: F, locked: q, size: 'md', onClick: q ? void 0 : () => E(U) },
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
const Bx = '_root_16zq4_1',
  Lx = '_header_16zq4_8',
  Hx = '_grid_16zq4_14',
  qx = '_empty_16zq4_20',
  Bi = { root: Bx, header: Lx, grid: Hx, empty: qx },
  Ux = {
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
  Gx = {
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
  Vx = {
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
function $x({ overridePatches: c, overrideEquipped: u, selectedId: s, onSelect: o }) {
  const m = X((b) => b.patches),
    d = X((b) => b.equippedPatches),
    h = c ?? m,
    y = u ?? d,
    g = new Set(Array.from(y.values()).map((b) => b.name)),
    p = Array.from(h.values());
  return p.length === 0
    ? r.jsx('div', {
        className: Bi.root,
        children: r.jsx('div', {
          className: Bi.empty,
          children: r.jsx(G, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : r.jsxs('div', {
        className: Bi.root,
        children: [
          r.jsxs('div', {
            className: Bi.header,
            children: [
              r.jsx(G, { variant: 'heading-3', children: 'パッチ在庫' }),
              r.jsxs(G, { variant: 'caption', color: 'dim', children: [p.length, ' 種類'] }),
            ],
          }),
          r.jsx('div', {
            className: Bi.grid,
            children: p.map((b) => {
              const T = `${b.name}#${b.tier}`,
                E = g.has(b.name);
              return r.jsx(
                yr,
                {
                  patchId: T,
                  name: b.name,
                  iconName: Ux[b.name] ?? 'spark',
                  tier: b.tier,
                  count: b.count,
                  trigger: Gx[b.name] ?? '常時',
                  effect: Vx[b.name] ?? '-',
                  selected: s === T,
                  locked: E,
                  onClick: o ? () => o(s === T ? null : T) : void 0,
                },
                T
              );
            }),
          }),
        ],
      });
}
const Yx = '_root_1svx2_1',
  kx = '_header_1svx2_8',
  Zx = '_tierControl_1svx2_14',
  Xx = '_tierStepperRow_1svx2_24',
  Qx = '_mergeList_1svx2_30',
  Kx = '_empty_1svx2_36',
  wn = { root: Yx, header: kx, tierControl: Zx, tierStepperRow: Xx, mergeList: Qx, empty: Kx },
  Jx = '_stepper_1ouvh_1',
  Wx = '_disabled_1ouvh_6',
  Fx = '_btn_1ouvh_11',
  Ix = '_value_1ouvh_38',
  On = {
    stepper: Jx,
    disabled: Wx,
    btn: Fx,
    value: Ix,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  Px = ({
    value: c,
    min: u,
    max: s,
    step: o = 1,
    onChange: m,
    size: d = 'md',
    disabled: h = !1,
  }) => {
    const y = c - o >= u,
      g = c + o <= s,
      p = () => {
        h || !y || m(Math.max(u, c - o));
      },
      b = () => {
        h || !g || m(Math.min(s, c + o));
      };
    return r.jsxs('div', {
      className: [On.stepper, On[`size-${d}`], h ? On.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        r.jsx('button', {
          type: 'button',
          className: On.btn,
          onClick: p,
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
          disabled: h || !g,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  nr = 5,
  e3 = {
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
function S1(c, u) {
  const s = [];
  for (const o of c.values())
    o.tier < u &&
      o.count >= 2 &&
      s.push({ name: o.name, tier: o.tier, count: o.count, iconName: e3[o.name] ?? 'spark' });
  return s.sort((o, m) => o.tier - m.tier || o.name.localeCompare(m.name));
}
function t3(c, u) {
  let s = new Map(c),
    o = !0;
  for (; o; ) {
    o = !1;
    for (const m of Array.from(s.values())) {
      if (m.tier >= u || m.count < 2 || m.tier >= nr) continue;
      const d = `${m.name}#${m.tier}`,
        h = Math.floor(m.count / 2),
        y = m.count % 2,
        g = m.tier + 1,
        p = `${m.name}#${g}`,
        b = s.get(p),
        T = ((b == null ? void 0 : b.count) ?? 0) + h;
      ((s = new Map(s)),
        y === 0 ? s.delete(d) : s.set(d, { ...m, count: y }),
        s.set(p, { name: m.name, tier: g, count: T }),
        (o = !0));
    }
  }
  return s;
}
function a3({ overridePatches: c }) {
  const u = X((E) => E.patches),
    s = X((E) => E.addPatch),
    o = X((E) => E.consumePatch),
    m = X((E) => E.pruneEmptyPatches),
    d = c ?? u,
    h = Math.max(1, ...Array.from(d.values()).map((E) => E.tier)),
    [y, g] = oe.useState(Math.min(h, nr - 1)),
    p = S1(d, y + 1),
    b = p.length > 0,
    T = () => {
      if (c) return;
      const E = t3(d, y + 1);
      for (const [C, O] of d) {
        const U = E.get(C),
          q = (U == null ? void 0 : U.count) ?? 0;
        q < O.count && o(O.name, O.tier, O.count - q);
      }
      for (const [C, O] of E) {
        const U = d.get(C),
          q = (U == null ? void 0 : U.count) ?? 0;
        O.count > q && s(O.name, O.tier, O.count - q);
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
              r.jsx(Px, { value: y, min: 1, max: nr - 1, onChange: g }),
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
                children: p.map((E) =>
                  r.jsx(
                    yr,
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
function l3(c) {
  return Math.min(1 + c, Bn);
}
function n3() {
  const { navigate: c } = ul(),
    [u, s] = oe.useState('equip'),
    o = X((C) => C.equippedPatches),
    m = X((C) => C.patches),
    d = X((C) => C.machineLevels.patchSlots),
    h = l3(d),
    y = o.size,
    g = m.size,
    p = S1(m, 5).length,
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
    header: r.jsx(Yi, {
      title: 'パッチ庫',
      subtitle: `装着 ${y}/${h} ・ 在庫 ${g} 種`,
      onBack: T,
      currencies: [],
      tabBar: r.jsx(ps, { tabs: E, value: u, onChange: s, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx($i, { active: 'patches', onChange: b }),
    children: r.jsxs('div', {
      className: ex.content,
      children: [
        u === 'equip' && r.jsx(Dx, {}),
        u === 'inventory' && r.jsx($x, {}),
        u === 'merge' && r.jsx(a3, {}),
      ],
    }),
  });
}
const i3 = '_footer_qoo97_1',
  c3 = '_tabPanel_qoo97_7',
  Kh = { footer: i3, tabPanel: c3 },
  s3 = '_wrapper_1lf9s_1',
  u3 = '_header_1lf9s_7',
  o3 = '_headerLabel_1lf9s_13',
  r3 = '_empty_1lf9s_18',
  f3 = '_emptyIcon_1lf9s_29',
  d3 = '_grid_1lf9s_33',
  m3 = '_note_1lf9s_39',
  Cl = { wrapper: s3, header: u3, headerLabel: o3, empty: r3, emptyIcon: f3, grid: d3, note: m3 },
  h3 = {
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
function v3({ onOpenPatchScreen: c }) {
  const u = X((h) => h.equippedPatches),
    s = X((h) => h.machineLevels.patchSlots),
    o = Math.min(1 + s, Bn),
    m = [];
  for (let h = 0; h < o; h++) {
    const y = u.get(h);
    if (y != null) {
      const g = h3[y.name],
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
  const d = [...u.values()].length;
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
              r.jsx(b1, { patch: h.patch, slotIndex: h.idx, onClick: c }, y)
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
const y3 = '_wrapper_iebuz_1',
  g3 = '_header_iebuz_7',
  p3 = '_grid_iebuz_12',
  Io = { wrapper: y3, header: g3, grid: p3 },
  _3 = [
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
function b3({ selectedWeapon: c, onSelect: u }) {
  const s = X((h) => h.initialWeapon),
    o = X((h) => h.setInitialWeapon),
    m = c ?? s,
    d = (h) => {
      (o(h), u == null || u(h));
    };
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: Io.wrapper,
    children: [
      r.jsx('div', {
        className: Io.header,
        children: r.jsx(G, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      r.jsx('div', {
        className: Io.grid,
        children: _3.map((h) =>
          r.jsx(
            v1,
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
const S3 = '_wrapper_1rg1e_1',
  x3 = '_sticky_1rg1e_15',
  j3 = '_summary_1rg1e_19',
  T3 = '_weaponInfo_1rg1e_29',
  A3 = '_patchInfo_1rg1e_37',
  Li = { wrapper: S3, sticky: x3, summary: j3, weaponInfo: T3, patchInfo: A3 };
function N3({
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
    className: [Li.wrapper, d ? Li.sticky : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Li.summary,
        children: [
          c != null && r.jsx(js, { variant: 'tier', tier: c, size: 'sm' }),
          u != null &&
            r.jsxs('span', {
              className: Li.weaponInfo,
              children: [
                r.jsx(Ee, { name: u, size: 14 }),
                r.jsx(G, { variant: 'label', color: 'primary', children: u.toUpperCase() }),
              ],
            }),
          r.jsxs('span', {
            className: Li.patchInfo,
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
const z3 = '_wrapper_1ul9l_1',
  E3 = '_header_1ul9l_7',
  M3 = '_grid_1ul9l_14',
  C3 = '_tierBtn_1ul9l_20',
  w3 = '_active_1ul9l_35',
  O3 = '_tierLabel_1ul9l_50',
  R3 = '_frontierLabel_1ul9l_61',
  wl = {
    wrapper: z3,
    header: E3,
    grid: M3,
    tierBtn: C3,
    active: w3,
    tierLabel: O3,
    frontierLabel: R3,
  };
function D3({ selectedTier: c, onSelect: u }) {
  const s = X((h) => h.highestTier),
    o = Math.max(1, s),
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
          r.jsx(G, {
            variant: 'caption',
            color: 'mid',
            children: '到達済み Tier を選んで出撃します。',
          }),
          r.jsxs(G, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', o] }),
        ],
      }),
      r.jsx('div', {
        className: wl.grid,
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
              className: [wl.tierBtn, y ? wl.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': p },
              onClick: () => (u == null ? void 0 : u(h)),
              children: [
                r.jsxs('span', { className: wl.tierLabel, children: ['T', h] }),
                g && !y && r.jsx('span', { className: wl.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            h
          );
        }),
      }),
    ],
  });
}
const B3 = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function L3(c) {
  const { initialSelectedTier: u } = c,
    { navigate: s } = ul(),
    [o, m] = oe.useState('tier'),
    d = X((O) => O.highestTier),
    [h, y] = oe.useState(u ?? Math.max(1, d)),
    g = X((O) => O.initialWeapon),
    b = [...X((O) => O.equippedPatches).values()].length;
  function T() {
    s('battle');
  }
  const E = r.jsx(Yi, {
      title: '出撃準備',
      currencies: ['screw', 'bolt', 'alloy'],
      tabBar: r.jsx(ps, { tabs: B3, value: o, onChange: m, variant: 'underline', fullWidth: !0 }),
    }),
    C = r.jsxs('div', {
      className: Kh.footer,
      children: [
        r.jsx(N3, { tier: h, weaponKind: g, patchCount: b, sticky: !1, onLaunch: T }),
        r.jsx($i, { active: 'preparation', onChange: (O) => s(O) }),
      ],
    });
  return r.jsx(Bl, {
    header: E,
    footer: C,
    children: r.jsxs('div', {
      className: Kh.tabPanel,
      children: [
        o === 'tier' && r.jsx(D3, { selectedTier: h, onSelect: y }),
        o === 'weapon' && r.jsx(b3, {}),
        o === 'patches' && r.jsx(v3, { onOpenPatchScreen: () => s('patches') }),
      ],
    }),
  });
}
const H3 = '_content_mk0vl_1',
  q3 = { content: H3 },
  U3 = '_root_1b7n9_1',
  G3 = '_header_1b7n9_8',
  V3 = '_storageCard_1b7n9_13',
  $3 = '_storageRow_1b7n9_23',
  Y3 = '_divider_1b7n9_29',
  k3 = '_section_1b7n9_34',
  Z3 = '_dangerSection_1b7n9_40',
  X3 = '_sectionHeader_1b7n9_50',
  $t = {
    root: U3,
    header: G3,
    storageCard: V3,
    storageRow: $3,
    divider: Y3,
    section: k3,
    dangerSection: Z3,
    sectionHeader: X3,
  },
  Q3 = '_wrapper_11b89_1',
  K3 = '_disabled_11b89_6',
  J3 = '_hiddenInput_11b89_11',
  W3 = '_btn_11b89_15',
  F3 = '_fileName_11b89_41',
  Hi = { wrapper: Q3, disabled: K3, hiddenInput: J3, btn: W3, fileName: F3 },
  I3 = ({
    accept: c = 'application/json',
    onChange: u,
    label: s = 'ファイルを選択',
    disabled: o = !1,
  }) => {
    const m = oe.useRef(null),
      [d, h] = oe.useState(null),
      y = () => {
        var p;
        o || (p = m.current) == null || p.click();
      },
      g = (p) => {
        var T;
        const b = ((T = p.target.files) == null ? void 0 : T[0]) ?? null;
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
          onChange: g,
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
function P3({ storageInfo: c, onExport: u, onImport: s, onReset: o }) {
  const [m, d] = oe.useState(!1),
    [h, y] = oe.useState(!1),
    [g, p] = oe.useState(!1),
    b = async () => {
      if (u) {
        p(!0);
        try {
          await u();
        } finally {
          p(!1);
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
            disabled: g || !u,
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
          r.jsx(I3, {
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
      r.jsx(_1, {
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
const e5 = '_root_1rbig_1',
  t5 = '_header_1rbig_8',
  a5 = '_section_1rbig_13',
  l5 = '_sectionHeader_1rbig_20',
  n5 = '_divider_1rbig_26',
  Rn = { root: e5, header: t5, section: a5, sectionHeader: l5, divider: n5 },
  i5 = '_wrapper_16nmz_9',
  c5 = '_disabled_16nmz_15',
  s5 = '_off_16nmz_31',
  u5 = '_on_16nmz_35',
  o5 = '_accent_primary_16nmz_35',
  r5 = '_accent_secondary_16nmz_39',
  f5 = '_accent_success_16nmz_43',
  d5 = '_accent_disabled_16nmz_47',
  m5 = '_size_md_16nmz_56',
  h5 = '_knob_16nmz_60',
  v5 = '_size_sm_16nmz_70',
  y5 = '_labelGroup_16nmz_93',
  g5 = '_label_16nmz_93',
  p5 = '_description_16nmz_106',
  Ft = {
    wrapper: i5,
    disabled: c5,
    switch: '_switch_16nmz_22',
    off: s5,
    on: u5,
    accent_primary: o5,
    accent_secondary: r5,
    accent_success: f5,
    accent_disabled: d5,
    size_md: m5,
    knob: h5,
    size_sm: v5,
    labelGroup: y5,
    label: g5,
    description: p5,
  },
  x1 = ({
    checked: c,
    onChange: u,
    disabled: s = !1,
    label: o,
    description: m,
    accent: d = 'primary',
    size: h = 'md',
  }) => {
    const y = s || d === 'disabled',
      g = () => {
        y || u(!c);
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
  _5 = [
    { label: '×1', value: 1 },
    { label: '×2', value: 2 },
    { label: '×3', value: 3 },
  ];
function b5({ overrideVibration: c, overrideSpeed: u, onVibrationChange: s, onSpeedChange: o }) {
  const m = X((E) => E.vibrationEnabled),
    d = X((E) => E.defaultGameSpeed),
    h = X((E) => E.setVibrationEnabled),
    y = X((E) => E.setDefaultGameSpeed),
    g = c ?? m,
    p = u ?? d,
    b = (E) => {
      s ? s(E) : h(E);
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
        children: r.jsx(x1, {
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
          r.jsx(p1, { options: _5, value: p, onChange: T }),
        ],
      }),
    ],
  });
}
const S5 = '_root_nuc5y_2',
  x5 = '_muteRow_nuc5y_9',
  j5 = '_muteLabelGroup_nuc5y_16',
  T5 = '_sliderRow_nuc5y_24',
  A5 = '_muted_nuc5y_29',
  N5 = '_sliderIcon_nuc5y_29',
  z5 = '_sliderArea_nuc5y_41',
  E5 = '_sliderValue_nuc5y_46',
  cl = {
    root: S5,
    muteRow: x5,
    muteLabelGroup: j5,
    sliderRow: T5,
    muted: A5,
    sliderIcon: N5,
    sliderArea: z5,
    sliderValue: E5,
  };
function M5(c) {
  return 440 * Math.pow(2, (c - 69) / 12);
}
const C5 = {
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
  const s = C5[u[1]];
  if (s === void 0) throw new Error(`Invalid note name: ${u[1]}`);
  const m = 12 + parseInt(u[2], 10) * 12 + s;
  return M5(m);
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
const w5 = [D('A2'), D('C3'), D('E3')],
  O5 = [D('E2'), D('G2'), D('B2')];
(D('D3'), D('F3'), D('A3'));
const R5 = [D('G2'), D('B2'), D('D3')],
  D5 = [D('C3'), D('E3'), D('G3')],
  B5 = [D('B2'), D('D3'), D('F3')];
function Yt(c, u, s, o, m, d, h, y) {
  const g = c.createOscillator(),
    p = c.createGain();
  ((g.type = s), g.frequency.setValueAtTime(o, m));
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
      g.connect(E).connect(p).connect(u));
  } else g.connect(p).connect(u);
  (g.start(m), g.stop(m + d + 0.02));
}
function ki(c, u) {
  const s = Math.max(1, Math.floor(c.sampleRate * u)),
    o = c.createBuffer(1, s, c.sampleRate),
    m = o.getChannelData(0);
  let d = 74565;
  for (let h = 0; h < s; h++)
    ((d = (d * 1664525 + 1013904223) & 4294967295), (m[h] = d / 2147483648 - 1));
  return o;
}
function Vi(c, u, s, o) {
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
  h.buffer = ki(c, 0.04);
  const y = c.createGain(),
    g = c.createBiquadFilter();
  ((g.type = 'highpass'),
    (g.frequency.value = 400),
    y.gain.setValueAtTime(o * 0.3, s),
    y.gain.exponentialRampToValueAtTime(1e-4, s + 0.04),
    h.connect(g).connect(y).connect(u),
    h.start(s));
}
function L5(c, u, s, o, m) {
  const d = c.createBufferSource();
  d.buffer = ki(c, m + 0.01);
  const h = c.createGain(),
    y = c.createBiquadFilter();
  ((y.type = 'highpass'),
    (y.frequency.value = 6e3),
    h.gain.setValueAtTime(o, s),
    h.gain.exponentialRampToValueAtTime(1e-4, s + m),
    d.connect(y).connect(h).connect(u),
    d.start(s));
}
const H5 = 100,
  Ol = 60 / H5,
  Ui = Ol * 4,
  j1 = 8,
  q5 = Ui * j1,
  U5 = 2,
  G5 = 100,
  V5 = [D('A2'), D('A2'), D('G2'), D('G2'), D('C3'), D('C3'), D('E2'), D('E2')],
  Jh = [D('A3'), D('C4'), D('E4'), D('A4'), D('G4'), D('E4'), D('C4'), D('A3')],
  Wh = [
    [D('A3'), D('C4'), D('E4')],
    [D('G3'), D('B3'), D('D4')],
    [D('C3'), D('E3'), D('G3')],
    [D('E3'), D('G3'), D('B3')],
  ];
function $5(c, u, s, o) {
  for (let m = 0; m < j1; m++) {
    const d = s + m * Ui,
      h = V5[m];
    (Yt(c, u, 'sawtooth', h, d, Ol * 1.8, 0.22, 300),
      Yt(c, u, 'sawtooth', h, d + Ol * 2, Ol * 1.8, 0.22, 300),
      Vi(c, u, d, 0.35),
      Vi(c, u, d + Ol * 2, 0.28));
    for (let y = 0; y < 8; y++) {
      const g = (m * 8 + y) % Jh.length,
        p = d + y * Ol * 0.5;
      Yt(c, u, 'square', Jh[g], p, Ol * 0.4, 0.07, 2400);
    }
  }
  for (let m = 0; m < Wh.length; m++) {
    const d = Wh[m],
      h = s + m * Ui * 2,
      y = Ui * 2;
    for (const g of d) {
      const p = c.createOscillator(),
        b = c.createGain();
      ((p.type = 'triangle'), p.frequency.setValueAtTime(g, h));
      const T = 0.08;
      (b.gain.setValueAtTime(1e-4, h),
        b.gain.linearRampToValueAtTime(T, h + 0.15),
        b.gain.setValueAtTime(T, h + y - 0.2),
        b.gain.exponentialRampToValueAtTime(1e-4, h + y),
        p.connect(b).connect(u),
        p.start(h),
        p.stop(h + y + 0.05),
        o.push(p));
    }
  }
}
function Y5(c, u) {
  let s = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + U5 * Ui;
    for (; s < y; ) ($5(c, u, s, m), (s += q5));
  }
  return {
    start() {
      ((s = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, G5)));
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
const k5 = 100,
  Ta = 60 / k5,
  gr = Ta * 4,
  T1 = 8,
  il = gr * T1,
  Z5 = 2,
  X5 = 100,
  Fh = [D('E5'), D('D5'), D('B4'), D('G4'), D('F#4'), D('E4'), D('D4'), D('B3')];
function Ih(c, u, s, o) {
  const m = c.createBufferSource();
  m.buffer = ki(c, 0.2);
  const d = c.createGain(),
    h = c.createBiquadFilter();
  ((h.type = 'bandpass'),
    (h.frequency.value = 900),
    (h.Q.value = 0.6),
    d.gain.setValueAtTime(o, s),
    d.gain.exponentialRampToValueAtTime(1e-4, s + 0.18),
    m.connect(h).connect(d).connect(u),
    m.start(s),
    Yt(c, u, 'sine', 120, s, 0.12, o * 0.5, 300));
}
function Q5(c, u, s, o) {
  {
    const d = c.createOscillator(),
      h = c.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(D('E1'), s));
    const y = 0.35;
    (h.gain.setValueAtTime(1e-4, s),
      h.gain.linearRampToValueAtTime(y, s + 0.3),
      h.gain.setValueAtTime(y, s + il - 0.3),
      h.gain.linearRampToValueAtTime(1e-4, s + il));
    const g = c.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 120),
      d.connect(g).connect(h).connect(u),
      d.start(s),
      d.stop(s + il + 0.05),
      o.push(d));
  }
  for (let d = 0; d < T1; d++) {
    const h = s + d * gr;
    for (let y = 0; y < 4; y++) {
      const g = h + y * Ta;
      (Yt(c, u, 'sawtooth', D('E2'), g, Ta * 0.9, 0.22, 400),
        Yt(c, u, 'sawtooth', D('B2'), g, Ta * 0.8, 0.1, 600));
    }
    (Vi(c, u, h, 0.5),
      Vi(c, u, h + Ta * 2, 0.45),
      Ih(c, u, h + Ta, 0.4),
      Ih(c, u, h + Ta * 3, 0.38));
  }
  const m = [...B5, D('C4')];
  for (const d of m) {
    const h = c.createOscillator(),
      y = c.createGain();
    ((h.type = 'sawtooth'), h.frequency.setValueAtTime(d, s));
    const g = 0.07;
    (y.gain.setValueAtTime(1e-4, s),
      y.gain.linearRampToValueAtTime(g, s + 0.8),
      y.gain.setValueAtTime(g, s + il - 0.8),
      y.gain.exponentialRampToValueAtTime(1e-4, s + il));
    const p = c.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 900),
      h.connect(p).connect(y).connect(u),
      h.start(s),
      h.stop(s + il + 0.05),
      o.push(h));
  }
  for (let d = 0; d < Fh.length; d++) {
    const h = s + d * Ta * 2;
    Yt(c, u, 'sawtooth', Fh[d], h, Ta * 1.6, 0.08, 2e3);
  }
  {
    const d = c.createBufferSource();
    d.buffer = ki(c, il + 0.1);
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
function K5(c, u) {
  let s = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + Z5 * gr;
    for (; s < y; ) (Q5(c, u, s, m), (s += il));
  }
  return {
    start() {
      ((s = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, X5)));
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
const J5 = 120,
  Aa = 60 / J5,
  pr = Aa * 4,
  A1 = 8,
  ds = pr * A1,
  W5 = 2,
  F5 = 100,
  I5 = [D('E2'), D('E2'), D('D2'), D('D2'), D('E2'), D('E2'), D('B1'), D('B1')],
  Ph = [
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
function e1(c, u, s, o) {
  const m = c.createBufferSource();
  m.buffer = ki(c, 0.15);
  const d = c.createGain(),
    h = c.createBiquadFilter();
  ((h.type = 'bandpass'),
    (h.frequency.value = 1800),
    (h.Q.value = 0.8),
    d.gain.setValueAtTime(o, s),
    d.gain.exponentialRampToValueAtTime(1e-4, s + 0.13),
    m.connect(h).connect(d).connect(u),
    m.start(s),
    Yt(c, u, 'triangle', 200, s, 0.08, o * 0.4));
}
function P5(c, u, s, o) {
  for (let d = 0; d < A1; d++) {
    const h = s + d * pr,
      y = I5[d];
    for (let g = 0; g < 4; g++) Yt(c, u, 'sawtooth', y, h + g * Aa, Aa * 0.85, 0.26, 280);
    for (let g = 0; g < 4; g++) Vi(c, u, h + g * Aa, 0.42);
    (e1(c, u, h + Aa, 0.3), e1(c, u, h + Aa * 3, 0.3));
    for (let g = 0; g < 8; g++) L5(c, u, h + g * Aa * 0.5, 0.12, 0.08);
    for (let g = 0; g < 16; g++) {
      const p = (d * 16 + g) % Ph.length,
        b = h + g * Aa * 0.25;
      Yt(c, u, 'sawtooth', Ph[p], b, Aa * 0.22, 0.06, 3200);
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
      y.gain.setValueAtTime(0.06, s + ds - 0.3),
      y.gain.exponentialRampToValueAtTime(1e-4, s + ds));
    const g = c.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 1200),
      h.connect(g).connect(y).connect(u),
      h.start(s),
      h.stop(s + ds + 0.05),
      o.push(h));
  }
}
function e4(c, u) {
  let s = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + W5 * pr;
    for (; s < y; ) (P5(c, u, s, m), (s += ds));
  }
  return {
    start() {
      ((s = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, F5)));
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
const t4 = 80,
  ms = 60 / t4,
  gs = ms * 4,
  a4 = 8,
  hs = gs * a4,
  l4 = 2,
  n4 = 100,
  t1 = [w5, D5, R5, O5],
  Po = [D('A3'), D('C4'), D('E4'), D('G4'), D('A4'), D('E4')];
function i4(c, u, s, o) {
  {
    const m = c.createOscillator(),
      d = c.createGain();
    ((m.type = 'sine'), m.frequency.setValueAtTime(D('A2'), s));
    const h = 0.28;
    (d.gain.setValueAtTime(1e-4, s),
      d.gain.linearRampToValueAtTime(h, s + 0.5),
      d.gain.setValueAtTime(h, s + hs - 0.5),
      d.gain.linearRampToValueAtTime(1e-4, s + hs));
    const y = c.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 180),
      m.connect(y).connect(d).connect(u),
      m.start(s),
      m.stop(s + hs + 0.05),
      o.push(m));
  }
  for (let m = 0; m < t1.length; m++) {
    const d = t1[m],
      h = s + m * gs * 2,
      y = gs * 2;
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
      const q = c.createBiquadFilter();
      ((q.type = 'lowpass'),
        (q.frequency.value = 2e3),
        p.connect(b).connect(u),
        p.connect(O).connect(q).connect(U).connect(u),
        p.start(h),
        p.stop(h + y + 0.5),
        o.push(p));
    }
  }
  for (let m = 0; m < Po.length; m++) {
    const d = s + m * ms * 2;
    (Yt(c, u, 'sawtooth', Po[m], d, ms * 1.5, 0.09, 1800),
      Yt(c, u, 'sine', Po[m] * 0.5, d + 0.12, ms * 1.2, 0.05, 600));
  }
}
function c4(c, u) {
  let s = 0,
    o = null;
  const m = [];
  function d() {
    const y = c.currentTime + l4 * gs;
    for (; s < y; ) (i4(c, u, s, m), (s += hs));
  }
  return {
    start() {
      ((s = c.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, n4)));
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
function s4(c, u, s) {
  switch (c) {
    case 'title':
      return c4(u, s);
    case 'base':
      return Y5(u, s);
    case 'battleNormal':
      return e4(u, s);
    case 'battleBoss':
      return K5(u, s);
  }
}
function u4(c, u) {
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
function me(c, u, s, o, m, d, h, y, g) {
  const p = c.createOscillator(),
    b = c.createGain();
  ((p.type = s),
    p.frequency.setValueAtTime(o, m),
    g !== void 0 && p.frequency.exponentialRampToValueAtTime(Math.max(1e-4, g), m + h + y),
    It(b, m, d, h, y),
    p.connect(b).connect(u),
    p.start(m),
    p.stop(m + h + y + 0.02));
}
function Pt(c, u, s, o, m, d) {
  const h = c.createBufferSource();
  h.buffer = u4(c, s);
  const y = c.createGain();
  if ((It(y, o, m, 0.002, s), d)) {
    const g = c.createBiquadFilter();
    ((g.type = d.type),
      (g.frequency.value = d.frequency),
      d.q !== void 0 && (g.Q.value = d.q),
      h.connect(g).connect(y).connect(u));
  } else h.connect(y).connect(u);
  h.start(o);
}
const o4 = (c, u, s) => {
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
  r4 = (c, u, s) => {
    for (let o = 0; o < 4; o++) {
      const m = s + o * 0.12;
      (me(c, u, 'sine', 110, m, 0.4, 0.005, 0.18, 35),
        Pt(c, u, 0.08, m, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  f4 = (c, u, s) => {
    (Pt(c, u, 0.4, s, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      me(c, u, 'triangle', 3e3, s, 0.25, 0.005, 0.15, 1500),
      me(c, u, 'sawtooth', 200, s + 0.05, 0.18, 0.005, 0.3, 80));
  },
  d4 = (c, u, s) => {
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
  m4 = (c, u, s) => {
    (Pt(c, u, 0.1, s, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      me(c, u, 'triangle', 500, s, 0.18, 0.003, 0.08, 200));
  },
  h4 = (c, u, s) => {
    const o = c.createOscillator(),
      m = c.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(80, s),
      o.frequency.linearRampToValueAtTime(160, s + 0.8),
      It(m, s, 0.3, 0.1, 0.7),
      o.connect(m).connect(u),
      o.start(s),
      o.stop(s + 0.85),
      me(c, u, 'square', 320, s + 0.2, 0.15, 0.02, 0.4));
  },
  v4 = (c, u, s) => {
    (Pt(c, u, 0.5, s, 0.45, { type: 'lowpass', frequency: 1200 }),
      me(c, u, 'sine', 90, s, 0.5, 0.005, 0.6, 30),
      me(c, u, 'triangle', 1200, s + 0.1, 0.2, 0.02, 0.4, 2400),
      me(c, u, 'triangle', 1600, s + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  y4 = (c, u, s) => {
    (me(c, u, 'sine', 180, s, 0.3, 0.005, 0.12, 60),
      Pt(c, u, 0.08, s, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  g4 = (c, u, s) => {
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
  p4 = (c, u, s) => {
    (me(c, u, 'triangle', 700, s, 0.22, 0.01, 0.18),
      me(c, u, 'triangle', 1050, s + 0.12, 0.22, 0.01, 0.22));
  },
  _4 = (c, u, s) => {
    (me(c, u, 'triangle', 600, s, 0.25, 0.01, 0.2),
      me(c, u, 'triangle', 900, s + 0.12, 0.25, 0.01, 0.2),
      me(c, u, 'triangle', 1350, s + 0.24, 0.3, 0.01, 0.45),
      me(c, u, 'sine', 2400, s + 0.3, 0.15, 0.02, 0.5));
  },
  b4 = (c, u, s) => {
    (me(c, u, 'triangle', 600, s, 0.28, 0.01, 0.18),
      me(c, u, 'triangle', 750, s + 0.12, 0.28, 0.01, 0.18),
      me(c, u, 'triangle', 900, s + 0.24, 0.28, 0.01, 0.22),
      me(c, u, 'triangle', 1200, s + 0.36, 0.32, 0.01, 0.5),
      me(c, u, 'sine', 2400, s + 0.42, 0.18, 0.02, 0.6));
  },
  S4 = (c, u, s) => {
    (me(c, u, 'sawtooth', 300, s, 0.3, 0.02, 0.4, 220),
      me(c, u, 'sawtooth', 220, s + 0.35, 0.3, 0.02, 0.5, 160),
      me(c, u, 'sawtooth', 160, s + 0.8, 0.3, 0.02, 0.7, 80),
      Pt(c, u, 1, s, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  x4 = (c, u, s) => {
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
  j4 = (c, u, s) => {
    me(c, u, 'triangle', 1e3, s, 0.18, 0.003, 0.05);
  },
  T4 = (c, u, s) => {
    (me(c, u, 'triangle', 880, s, 0.2, 0.005, 0.08),
      me(c, u, 'triangle', 1320, s + 0.06, 0.2, 0.005, 0.12));
  },
  A4 = (c, u, s) => {
    (me(c, u, 'square', 260, s, 0.18, 0.005, 0.07),
      me(c, u, 'square', 200, s + 0.06, 0.18, 0.005, 0.1));
  },
  N4 = (c, u, s) => {
    me(c, u, 'triangle', 1400, s, 0.12, 0.003, 0.04);
  },
  z4 = (c, u, s) => {
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
  E4 = (c, u, s) => {
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
  M4 = (c, u, s) => {
    (me(c, u, 'sawtooth', 200, s, 0.3, 0.01, 0.35, 80),
      me(c, u, 'triangle', 600, s + 0.05, 0.22, 0.01, 0.3, 1200),
      me(c, u, 'triangle', 1200, s + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  C4 = (c, u, s) => {
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
  w4 = (c, u, s) => {
    (me(c, u, 'sine', 130, s, 0.5, 0.01, 0.28, 40),
      Pt(c, u, 0.12, s, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  O4 = (c, u, s) => {
    (Pt(c, u, 0.18, s, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      me(c, u, 'triangle', 2200, s, 0.15, 0.002, 0.06, 1800));
  },
  R4 = (c, u, s) => {
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
  D4 = (c, u, s) => {
    (me(c, u, 'triangle', 700, s, 0.18, 0.005, 0.05),
      me(c, u, 'triangle', 1050, s + 0.04, 0.18, 0.005, 0.06));
  },
  B4 = {
    laserShoot: C4,
    cannonShoot: w4,
    thunderShoot: O4,
    cutterShoot: R4,
    weaponSwitch: D4,
    activeLaser: o4,
    activeCannon: r4,
    activeThunder: f4,
    activeCutter: d4,
    enemyKill: m4,
    bossWarn: h4,
    bossKill: v4,
    machineHit: y4,
    machineDown: g4,
    waveClear: p4,
    tierClear: _4,
    tap: j4,
    purchaseOk: T4,
    reject: A4,
    tabSwitch: N4,
    dialogOpen: z4,
    dialogClose: E4,
    launch: M4,
    resultClear: b4,
    resultGameOver: S4,
    resultRetreat: x4,
  },
  L4 = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function a1(c) {
  return Math.max(0, Math.min(1, c));
}
class H4 {
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
      o = L4[u];
    if (o !== void 0) {
      const d = this.lastPlayAt.get(u) ?? 0;
      if (s - d < o) return;
      this.lastPlayAt.set(u, s);
    }
    const m = B4[u];
    m(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(u) {
    ((this.seVolume = a1(u)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(u) {
    ((this.bgmVolume = a1(u)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
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
    const s = s4(u, this.ctx, this.bgmGain);
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
const rs = new H4();
function l1({ label: c, iconName: u, value: s, muted: o, onChange: m }) {
  return r.jsx(Ll, {
    variant: 'sunken',
    padding: 'md',
    children: r.jsxs('div', {
      className: [cl.sliderRow, o ? cl.muted : ''].filter(Boolean).join(' '),
      children: [
        r.jsx('span', { className: cl.sliderIcon, children: r.jsx(Ee, { name: u, size: 16 }) }),
        r.jsx(G, { variant: 'label', color: o ? 'dim' : 'mid', children: c }),
        r.jsx('div', {
          className: cl.sliderArea,
          children: r.jsx(lr, { value: s, min: 0, max: 1, step: 0.01, onChange: m, disabled: o }),
        }),
        r.jsx('span', {
          className: cl.sliderValue,
          children: r.jsx(sl, {
            value: Math.round(s * 100),
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
  overrideSeVolume: u,
  overrideMute: s,
  onBgmChange: o,
  onSeChange: m,
  onMuteChange: d,
}) {
  const h = X((q) => q.bgmVolume),
    y = X((q) => q.seVolume),
    g = X((q) => q.setBgmVolume),
    p = X((q) => q.setSeVolume),
    b = c ?? h,
    T = u ?? y,
    E = s ?? !1,
    C = (q) => {
      o ? o(q) : (g(q), rs.setBgmVolume(E ? 0 : q));
    },
    O = (q) => {
      m ? m(q) : (p(q), rs.setSeVolume(E ? 0 : q));
    },
    U = (q) => {
      d ? d(q) : (rs.setBgmVolume(q ? 0 : b), rs.setSeVolume(q ? 0 : T));
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
            r.jsx(x1, { checked: E, onChange: U, accent: 'primary' }),
          ],
        }),
      }),
      r.jsx(l1, { label: 'BGM', iconName: 'play', value: b, muted: E, onChange: C }),
      r.jsx(l1, { label: 'SE', iconName: 'spark', value: T, muted: E, onChange: O }),
    ],
  });
}
const ir = (c, u) => u.some((s) => c instanceof s);
let n1, i1;
function U4() {
  return n1 || (n1 = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function G4() {
  return (
    i1 ||
    (i1 = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const cr = new WeakMap(),
  er = new WeakMap(),
  Ts = new WeakMap();
function V4(c) {
  const u = new Promise((s, o) => {
    const m = () => {
        (c.removeEventListener('success', d), c.removeEventListener('error', h));
      },
      d = () => {
        (s(Dl(c.result)), m());
      },
      h = () => {
        (o(c.error), m());
      };
    (c.addEventListener('success', d), c.addEventListener('error', h));
  });
  return (Ts.set(u, c), u);
}
function $4(c) {
  if (cr.has(c)) return;
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
  cr.set(c, u);
}
let sr = {
  get(c, u, s) {
    if (c instanceof IDBTransaction) {
      if (u === 'done') return cr.get(c);
      if (u === 'store')
        return s.objectStoreNames[1] ? void 0 : s.objectStore(s.objectStoreNames[0]);
    }
    return Dl(c[u]);
  },
  set(c, u, s) {
    return ((c[u] = s), !0);
  },
  has(c, u) {
    return c instanceof IDBTransaction && (u === 'done' || u === 'store') ? !0 : u in c;
  },
};
function N1(c) {
  sr = c(sr);
}
function Y4(c) {
  return G4().includes(c)
    ? function (...u) {
        return (c.apply(ur(this), u), Dl(this.request));
      }
    : function (...u) {
        return Dl(c.apply(ur(this), u));
      };
}
function k4(c) {
  return typeof c == 'function'
    ? Y4(c)
    : (c instanceof IDBTransaction && $4(c), ir(c, U4()) ? new Proxy(c, sr) : c);
}
function Dl(c) {
  if (c instanceof IDBRequest) return V4(c);
  if (er.has(c)) return er.get(c);
  const u = k4(c);
  return (u !== c && (er.set(c, u), Ts.set(u, c)), u);
}
const ur = (c) => Ts.get(c);
function Z4(c, u, { blocked: s, upgrade: o, blocking: m, terminated: d } = {}) {
  const h = indexedDB.open(c, u),
    y = Dl(h);
  return (
    o &&
      h.addEventListener('upgradeneeded', (g) => {
        o(Dl(h.result), g.oldVersion, g.newVersion, Dl(h.transaction), g);
      }),
    s && h.addEventListener('blocked', (g) => s(g.oldVersion, g.newVersion, g)),
    y
      .then((g) => {
        (d && g.addEventListener('close', () => d()),
          m && g.addEventListener('versionchange', (p) => m(p.oldVersion, p.newVersion, p)));
      })
      .catch(() => {}),
    y
  );
}
const X4 = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  Q4 = ['put', 'add', 'delete', 'clear'],
  tr = new Map();
function c1(c, u) {
  if (!(c instanceof IDBDatabase && !(u in c) && typeof u == 'string')) return;
  if (tr.get(u)) return tr.get(u);
  const s = u.replace(/FromIndex$/, ''),
    o = u !== s,
    m = Q4.includes(s);
  if (!(s in (o ? IDBIndex : IDBObjectStore).prototype) || !(m || X4.includes(s))) return;
  const d = async function (h, ...y) {
    const g = this.transaction(h, m ? 'readwrite' : 'readonly');
    let p = g.store;
    return (o && (p = p.index(y.shift())), (await Promise.all([p[s](...y), m && g.done]))[0]);
  };
  return (tr.set(u, d), d);
}
N1((c) => ({
  ...c,
  get: (u, s, o) => c1(u, s) || c.get(u, s, o),
  has: (u, s) => !!c1(u, s) || c.has(u, s),
}));
const K4 = ['continue', 'continuePrimaryKey', 'advance'],
  s1 = {},
  or = new WeakMap(),
  z1 = new WeakMap(),
  J4 = {
    get(c, u) {
      if (!K4.includes(u)) return c[u];
      let s = s1[u];
      return (
        s ||
          (s = s1[u] =
            function (...o) {
              or.set(this, z1.get(this)[u](...o));
            }),
        s
      );
    },
  };
async function* W4(...c) {
  let u = this;
  if ((u instanceof IDBCursor || (u = await u.openCursor(...c)), !u)) return;
  u = u;
  const s = new Proxy(u, J4);
  for (z1.set(s, u), Ts.set(s, ur(u)); u; )
    (yield s, (u = await (or.get(s) || u.continue())), or.delete(s));
}
function u1(c, u) {
  return (
    (u === Symbol.asyncIterator && ir(c, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (u === 'iterate' && ir(c, [IDBIndex, IDBObjectStore]))
  );
}
N1((c) => ({
  ...c,
  get(u, s, o) {
    return u1(u, s) ? W4 : c.get(u, s, o);
  },
  has(u, s) {
    return u1(u, s) || c.has(u, s);
  },
}));
const F4 = {
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
function I4(c, u, s, o) {
  for (let m = s + 1; m <= o; m++) {
    const d = F4[m];
    if (!d) throw new Error(`No migration registered for version ${m}`);
    d(c, u);
  }
}
let qi = null;
async function o1() {
  return (
    qi ||
    ((qi = await Z4(d1, vs, {
      upgrade(c, u, s, o) {
        try {
          I4(c, o, u, s ?? vs);
        } catch (m) {
          throw (console.error('[DB] Migration failed:', m), m);
        }
      },
    })),
    await P4(qi),
    qi)
  );
}
async function P4(c) {
  const u = c.transaction([Q.profile, Q.currencies, Q.machine, Q.weapons, Q.settings], 'readwrite'),
    [s, o, m, d] = await Promise.all([
      u.objectStore(Q.profile).get('singleton'),
      u.objectStore(Q.currencies).get('singleton'),
      u.objectStore(Q.weapons).get('singleton'),
      u.objectStore(Q.settings).get('singleton'),
    ]),
    h = Date.now(),
    y = [];
  (s || y.push(u.objectStore(Q.profile).put({ ...rp, createdAt: h, lastPlayedAt: h })),
    o || y.push(u.objectStore(Q.currencies).put(fp)),
    m || y.push(u.objectStore(Q.weapons).put(dp)),
    d || y.push(u.objectStore(Q.settings).put(mp)));
  const g = u.objectStore(Q.machine),
    p = await g.getAllKeys(),
    b = new Set(p);
  for (const T of m1) b.has(T) || y.push(g.put({ key: T, lv: 0 }));
  (await Promise.all(y), await u.done);
}
async function ej(c) {
  const u = c.transaction(
      [Q.profile, Q.currencies, Q.machine, Q.weapons, Q.patches, Q.equippedPatches, Q.settings],
      'readonly'
    ),
    [s, o, m, d, h, y, g] = await Promise.all([
      u.objectStore(Q.profile).get('singleton'),
      u.objectStore(Q.currencies).get('singleton'),
      u.objectStore(Q.machine).getAll(),
      u.objectStore(Q.weapons).get('singleton'),
      u.objectStore(Q.patches).getAll(),
      u.objectStore(Q.equippedPatches).getAll(),
      u.objectStore(Q.settings).get('singleton'),
    ]);
  if ((await u.done, !s || !o || !d || !g))
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
    settings: g,
  };
}
const E1 = 'tower-like-game:import-backups',
  tj = 3;
function aj() {
  try {
    const c = localStorage.getItem(E1);
    return c ? JSON.parse(c) : [];
  } catch {
    return [];
  }
}
function lj(c) {
  try {
    localStorage.setItem(E1, JSON.stringify(c));
  } catch (u) {
    console.warn('[DB] Failed to save backup to localStorage:', u);
  }
}
function nj(c) {
  const u = aj();
  u.unshift({ savedAt: Date.now(), data: c });
  const s = u.slice(0, tj);
  lj(s);
}
async function M1(c) {
  const u = await ej(c);
  return { formatVersion: 1, dbVersion: vs, exportedAt: Date.now(), data: u };
}
async function ij(c, u) {
  if (u.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${u.formatVersion}`);
  try {
    const d = await M1(c);
    nj(d);
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
const cj = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function sj() {
  const { navigate: c } = ul(),
    [u, s] = oe.useState('sound'),
    o = async () => {
      const h = await o1(),
        y = await M1(h),
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
        p = await o1();
      (await ij(p, g), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(d1), window.location.reload());
    };
  return r.jsx(Bl, {
    header: r.jsx(Yi, {
      title: '設定',
      onBack: () => c('title'),
      currencies: [],
      tabBar: r.jsx(ps, { tabs: cj, value: u, onChange: s, fullWidth: !0 }),
    }),
    footer: r.jsx($i, { active: 'settings', onChange: c }),
    children: r.jsxs('div', {
      className: q3.content,
      children: [
        u === 'sound' && r.jsx(q4, {}),
        u === 'game' && r.jsx(b5, {}),
        u === 'data' && r.jsx(P3, { onExport: o, onImport: m, onReset: d }),
      ],
    }),
  });
}
const uj = '_layout_1c9in_1',
  oj = '_heroWrap_1c9in_12',
  r1 = { layout: uj, heroWrap: oj },
  rj = '_root_5udm7_1',
  fj = { root: rj };
function dj({ onResume: c, onNewGame: u, lastSavedAt: s }) {
  const m = X((d) => d.createdAt) > 0;
  return r.jsxs('div', {
    className: fj.root,
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
const mj = '_root_qkflo_2',
  hj = '_title_qkflo_12',
  f1 = { root: mj, title: hj };
function vj({ title: c = 'NEON SPIRE', subtitle: u, version: s, tagline: o }) {
  return r.jsxs('header', {
    className: f1.root,
    role: 'banner',
    children: [
      r.jsx('h1', { className: f1.title, children: c }),
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
const yj = '_root_1szye_1',
  gj = '_ringOuter_1szye_9',
  pj = '_ringMiddle_1szye_17',
  _j = '_glowDisc_1szye_24',
  bj = '_cornerAccent_1szye_31',
  Sj = '_icon_1szye_40',
  Dn = { root: yj, ringOuter: gj, ringMiddle: pj, glowDisc: _j, cornerAccent: bj, icon: Sj };
function xj({ size: c = 180, iconName: u = 'tower' }) {
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
function jj(c) {
  if (c < 0) return '今';
  const u = Math.floor(c / 1e3);
  if (u < 60) return '今';
  const s = Math.floor(u / 60);
  if (s < 60) return `${s} 分前`;
  const o = Math.floor(s / 60);
  return o < 24 ? `${o} 時間前` : `${Math.floor(o / 24)} 日前`;
}
function Tj() {
  const { navigate: c } = ul(),
    u = X((o) => o.createdAt),
    s = oe.useMemo(() => (u > 0 ? jj(Date.now() - u) : void 0), [u]);
  return r.jsx(Bl, {
    children: r.jsxs('div', {
      className: r1.layout,
      children: [
        r.jsx(vj, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.1.0',
        }),
        r.jsx('div', { className: r1.heroWrap, children: r.jsx(xj, {}) }),
        r.jsx(dj, {
          lastSavedAt: s,
          onResume: () => c('preparation'),
          onNewGame: () => c('preparation'),
        }),
      ],
    }),
  });
}
function Aj() {
  const { screen: c } = ul();
  switch (c) {
    case 'title':
      return r.jsx(Tj, {});
    case 'preparation':
      return r.jsx(L3, {});
    case 'machine':
      return r.jsx(FS, {});
    case 'armory':
      return r.jsx(B_, {});
    case 'patches':
      return r.jsx(n3, {});
    case 'settings':
      return r.jsx(sj, {});
    case 'battle':
      return r.jsx(ZS, {});
    default:
      return r.jsx(IS, {});
  }
}
const C1 = document.getElementById('root');
if (!C1) throw new Error('Failed to find #root element');
dy.createRoot(C1).render(r.jsx(R_, { children: r.jsx(Aj, {}) }));
