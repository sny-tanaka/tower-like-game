var ng = Object.defineProperty;
var lg = (l, i, s) =>
  i in l ? ng(l, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (l[i] = s);
var xa = (l, i, s) => lg(l, typeof i != 'symbol' ? i + '' : i, s);
(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const f of document.querySelectorAll('link[rel="modulepreload"]')) o(f);
  new MutationObserver((f) => {
    for (const d of f)
      if (d.type === 'childList')
        for (const m of d.addedNodes) m.tagName === 'LINK' && m.rel === 'modulepreload' && o(m);
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
  function o(f) {
    if (f.ep) return;
    f.ep = !0;
    const d = s(f);
    fetch(f.href, d);
  }
})();
function ig(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, 'default') ? l.default : l;
}
var wu = { exports: {} },
  _c = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var n0;
function cg() {
  if (n0) return _c;
  n0 = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function s(o, f, d) {
    var m = null;
    if ((d !== void 0 && (m = '' + d), f.key !== void 0 && (m = '' + f.key), 'key' in f)) {
      d = {};
      for (var p in f) p !== 'key' && (d[p] = f[p]);
    } else d = f;
    return ((f = d.ref), { $$typeof: l, type: o, key: m, ref: f !== void 0 ? f : null, props: d });
  }
  return ((_c.Fragment = i), (_c.jsx = s), (_c.jsxs = s), _c);
}
var l0;
function sg() {
  return (l0 || ((l0 = 1), (wu.exports = cg())), wu.exports);
}
var u = sg(),
  Nu = { exports: {} },
  bc = {},
  zu = { exports: {} },
  Cu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var i0;
function og() {
  return (
    i0 ||
      ((i0 = 1),
      (function (l) {
        function i(D, Z) {
          var ie = D.length;
          D.push(Z);
          e: for (; 0 < ie; ) {
            var Te = (ie - 1) >>> 1,
              Ee = D[Te];
            if (0 < f(Ee, Z)) ((D[Te] = Z), (D[ie] = Ee), (ie = Te));
            else break e;
          }
        }
        function s(D) {
          return D.length === 0 ? null : D[0];
        }
        function o(D) {
          if (D.length === 0) return null;
          var Z = D[0],
            ie = D.pop();
          if (ie !== Z) {
            D[0] = ie;
            e: for (var Te = 0, Ee = D.length, x = Ee >>> 1; Te < x; ) {
              var k = 2 * (Te + 1) - 1,
                X = D[k],
                F = k + 1,
                ce = D[F];
              if (0 > f(X, ie))
                F < Ee && 0 > f(ce, X)
                  ? ((D[Te] = ce), (D[F] = ie), (Te = F))
                  : ((D[Te] = X), (D[k] = ie), (Te = k));
              else if (F < Ee && 0 > f(ce, ie)) ((D[Te] = ce), (D[F] = ie), (Te = F));
              else break e;
            }
          }
          return Z;
        }
        function f(D, Z) {
          var ie = D.sortIndex - Z.sortIndex;
          return ie !== 0 ? ie : D.id - Z.id;
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
          E = !1,
          U = !1,
          O = !1,
          K = typeof setTimeout == 'function' ? setTimeout : null,
          V = typeof clearTimeout == 'function' ? clearTimeout : null,
          se = typeof setImmediate < 'u' ? setImmediate : null;
        function C(D) {
          for (var Z = s(y); Z !== null; ) {
            if (Z.callback === null) o(y);
            else if (Z.startTime <= D) (o(y), (Z.sortIndex = Z.expirationTime), i(g, Z));
            else break;
            Z = s(y);
          }
        }
        function ae(D) {
          if (((U = !1), C(D), !E))
            if (s(g) !== null) ((E = !0), de || ((de = !0), at()));
            else {
              var Z = s(y);
              Z !== null && ot(ae, Z.startTime - D);
            }
        }
        var de = !1,
          P = -1,
          Re = 5,
          it = -1;
        function et() {
          return O ? !0 : !(l.unstable_now() - it < Re);
        }
        function ke() {
          if (((O = !1), de)) {
            var D = l.unstable_now();
            it = D;
            var Z = !0;
            try {
              e: {
                ((E = !1), U && ((U = !1), V(P), (P = -1)), (M = !0));
                var ie = A;
                try {
                  t: {
                    for (C(D), b = s(g); b !== null && !(b.expirationTime > D && et()); ) {
                      var Te = b.callback;
                      if (typeof Te == 'function') {
                        ((b.callback = null), (A = b.priorityLevel));
                        var Ee = Te(b.expirationTime <= D);
                        if (((D = l.unstable_now()), typeof Ee == 'function')) {
                          ((b.callback = Ee), C(D), (Z = !0));
                          break t;
                        }
                        (b === s(g) && o(g), C(D));
                      } else o(g);
                      b = s(g);
                    }
                    if (b !== null) Z = !0;
                    else {
                      var x = s(y);
                      (x !== null && ot(ae, x.startTime - D), (Z = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (A = ie), (M = !1));
                }
                Z = void 0;
              }
            } finally {
              Z ? at() : (de = !1);
            }
          }
        }
        var at;
        if (typeof se == 'function')
          at = function () {
            se(ke);
          };
        else if (typeof MessageChannel < 'u') {
          var $t = new MessageChannel(),
            Ut = $t.port2;
          (($t.port1.onmessage = ke),
            (at = function () {
              Ut.postMessage(null);
            }));
        } else
          at = function () {
            K(ke, 0);
          };
        function ot(D, Z) {
          P = K(function () {
            D(l.unstable_now());
          }, Z);
        }
        ((l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (D) {
            D.callback = null;
          }),
          (l.unstable_forceFrameRate = function (D) {
            0 > D || 125 < D
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (Re = 0 < D ? Math.floor(1e3 / D) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return A;
          }),
          (l.unstable_next = function (D) {
            switch (A) {
              case 1:
              case 2:
              case 3:
                var Z = 3;
                break;
              default:
                Z = A;
            }
            var ie = A;
            A = Z;
            try {
              return D();
            } finally {
              A = ie;
            }
          }),
          (l.unstable_requestPaint = function () {
            O = !0;
          }),
          (l.unstable_runWithPriority = function (D, Z) {
            switch (D) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                D = 3;
            }
            var ie = A;
            A = D;
            try {
              return Z();
            } finally {
              A = ie;
            }
          }),
          (l.unstable_scheduleCallback = function (D, Z, ie) {
            var Te = l.unstable_now();
            switch (
              (typeof ie == 'object' && ie !== null
                ? ((ie = ie.delay), (ie = typeof ie == 'number' && 0 < ie ? Te + ie : Te))
                : (ie = Te),
              D)
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
              (Ee = ie + Ee),
              (D = {
                id: _++,
                callback: Z,
                priorityLevel: D,
                startTime: ie,
                expirationTime: Ee,
                sortIndex: -1,
              }),
              ie > Te
                ? ((D.sortIndex = ie),
                  i(y, D),
                  s(g) === null && D === s(y) && (U ? (V(P), (P = -1)) : (U = !0), ot(ae, ie - Te)))
                : ((D.sortIndex = Ee), i(g, D), E || M || ((E = !0), de || ((de = !0), at()))),
              D
            );
          }),
          (l.unstable_shouldYield = et),
          (l.unstable_wrapCallback = function (D) {
            var Z = A;
            return function () {
              var ie = A;
              A = Z;
              try {
                return D.apply(this, arguments);
              } finally {
                A = ie;
              }
            };
          }));
      })(Cu)),
    Cu
  );
}
var c0;
function rg() {
  return (c0 || ((c0 = 1), (zu.exports = og())), zu.exports);
}
var Ru = { exports: {} },
  re = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var s0;
function ug() {
  if (s0) return re;
  s0 = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    s = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
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
  var E = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    U = Object.assign,
    O = {};
  function K(x, k, X) {
    ((this.props = x), (this.context = k), (this.refs = O), (this.updater = X || E));
  }
  ((K.prototype.isReactComponent = {}),
    (K.prototype.setState = function (x, k) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, k, 'setState');
    }),
    (K.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function V() {}
  V.prototype = K.prototype;
  function se(x, k, X) {
    ((this.props = x), (this.context = k), (this.refs = O), (this.updater = X || E));
  }
  var C = (se.prototype = new V());
  ((C.constructor = se), U(C, K.prototype), (C.isPureReactComponent = !0));
  var ae = Array.isArray;
  function de() {}
  var P = { H: null, A: null, T: null, S: null },
    Re = Object.prototype.hasOwnProperty;
  function it(x, k, X) {
    var F = X.ref;
    return { $$typeof: l, type: x, key: k, ref: F !== void 0 ? F : null, props: X };
  }
  function et(x, k) {
    return it(x.type, k, x.props);
  }
  function ke(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === l;
  }
  function at(x) {
    var k = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function (X) {
        return k[X];
      })
    );
  }
  var $t = /\/+/g;
  function Ut(x, k) {
    return typeof x == 'object' && x !== null && x.key != null ? at('' + x.key) : k.toString(36);
  }
  function ot(x) {
    switch (x.status) {
      case 'fulfilled':
        return x.value;
      case 'rejected':
        throw x.reason;
      default:
        switch (
          (typeof x.status == 'string'
            ? x.then(de, de)
            : ((x.status = 'pending'),
              x.then(
                function (k) {
                  x.status === 'pending' && ((x.status = 'fulfilled'), (x.value = k));
                },
                function (k) {
                  x.status === 'pending' && ((x.status = 'rejected'), (x.reason = k));
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
  function D(x, k, X, F, ce) {
    var me = typeof x;
    (me === 'undefined' || me === 'boolean') && (x = null);
    var Me = !1;
    if (x === null) Me = !0;
    else
      switch (me) {
        case 'bigint':
        case 'string':
        case 'number':
          Me = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case l:
            case i:
              Me = !0;
              break;
            case _:
              return ((Me = x._init), D(Me(x._payload), k, X, F, ce));
          }
      }
    if (Me)
      return (
        (ce = ce(x)),
        (Me = F === '' ? '.' + Ut(x, 0) : F),
        ae(ce)
          ? ((X = ''),
            Me != null && (X = Me.replace($t, '$&/') + '/'),
            D(ce, k, X, '', function ($a) {
              return $a;
            }))
          : ce != null &&
            (ke(ce) &&
              (ce = et(
                ce,
                X +
                  (ce.key == null || (x && x.key === ce.key)
                    ? ''
                    : ('' + ce.key).replace($t, '$&/') + '/') +
                  Me
              )),
            k.push(ce)),
        1
      );
    Me = 0;
    var pt = F === '' ? '.' : F + ':';
    if (ae(x))
      for (var Ke = 0; Ke < x.length; Ke++)
        ((F = x[Ke]), (me = pt + Ut(F, Ke)), (Me += D(F, k, X, me, ce)));
    else if (((Ke = M(x)), typeof Ke == 'function'))
      for (x = Ke.call(x), Ke = 0; !(F = x.next()).done; )
        ((F = F.value), (me = pt + Ut(F, Ke++)), (Me += D(F, k, X, me, ce)));
    else if (me === 'object') {
      if (typeof x.then == 'function') return D(ot(x), k, X, F, ce);
      throw (
        (k = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (k === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : k) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Me;
  }
  function Z(x, k, X) {
    if (x == null) return x;
    var F = [],
      ce = 0;
    return (
      D(x, F, '', '', function (me) {
        return k.call(X, me, ce++);
      }),
      F
    );
  }
  function ie(x) {
    if (x._status === -1) {
      var k = x._result;
      ((k = k()),
        k.then(
          function (X) {
            (x._status === 0 || x._status === -1) && ((x._status = 1), (x._result = X));
          },
          function (X) {
            (x._status === 0 || x._status === -1) && ((x._status = 2), (x._result = X));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = k)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var Te =
      typeof reportError == 'function'
        ? reportError
        : function (x) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var k = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof x == 'object' && x !== null && typeof x.message == 'string'
                    ? String(x.message)
                    : String(x),
                error: x,
              });
              if (!window.dispatchEvent(k)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', x);
              return;
            }
            console.error(x);
          },
    Ee = {
      map: Z,
      forEach: function (x, k, X) {
        Z(
          x,
          function () {
            k.apply(this, arguments);
          },
          X
        );
      },
      count: function (x) {
        var k = 0;
        return (
          Z(x, function () {
            k++;
          }),
          k
        );
      },
      toArray: function (x) {
        return (
          Z(x, function (k) {
            return k;
          }) || []
        );
      },
      only: function (x) {
        if (!ke(x))
          throw Error('React.Children.only expected to receive a single React element child.');
        return x;
      },
    };
  return (
    (re.Activity = b),
    (re.Children = Ee),
    (re.Component = K),
    (re.Fragment = s),
    (re.Profiler = f),
    (re.PureComponent = se),
    (re.StrictMode = o),
    (re.Suspense = g),
    (re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P),
    (re.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return P.H.useMemoCache(x);
      },
    }),
    (re.cache = function (x) {
      return function () {
        return x.apply(null, arguments);
      };
    }),
    (re.cacheSignal = function () {
      return null;
    }),
    (re.cloneElement = function (x, k, X) {
      if (x == null) throw Error('The argument must be a React element, but you passed ' + x + '.');
      var F = U({}, x.props),
        ce = x.key;
      if (k != null)
        for (me in (k.key !== void 0 && (ce = '' + k.key), k))
          !Re.call(k, me) ||
            me === 'key' ||
            me === '__self' ||
            me === '__source' ||
            (me === 'ref' && k.ref === void 0) ||
            (F[me] = k[me]);
      var me = arguments.length - 2;
      if (me === 1) F.children = X;
      else if (1 < me) {
        for (var Me = Array(me), pt = 0; pt < me; pt++) Me[pt] = arguments[pt + 2];
        F.children = Me;
      }
      return it(x.type, ce, F);
    }),
    (re.createContext = function (x) {
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
    (re.createElement = function (x, k, X) {
      var F,
        ce = {},
        me = null;
      if (k != null)
        for (F in (k.key !== void 0 && (me = '' + k.key), k))
          Re.call(k, F) && F !== 'key' && F !== '__self' && F !== '__source' && (ce[F] = k[F]);
      var Me = arguments.length - 2;
      if (Me === 1) ce.children = X;
      else if (1 < Me) {
        for (var pt = Array(Me), Ke = 0; Ke < Me; Ke++) pt[Ke] = arguments[Ke + 2];
        ce.children = pt;
      }
      if (x && x.defaultProps)
        for (F in ((Me = x.defaultProps), Me)) ce[F] === void 0 && (ce[F] = Me[F]);
      return it(x, me, ce);
    }),
    (re.createRef = function () {
      return { current: null };
    }),
    (re.forwardRef = function (x) {
      return { $$typeof: p, render: x };
    }),
    (re.isValidElement = ke),
    (re.lazy = function (x) {
      return { $$typeof: _, _payload: { _status: -1, _result: x }, _init: ie };
    }),
    (re.memo = function (x, k) {
      return { $$typeof: y, type: x, compare: k === void 0 ? null : k };
    }),
    (re.startTransition = function (x) {
      var k = P.T,
        X = {};
      P.T = X;
      try {
        var F = x(),
          ce = P.S;
        (ce !== null && ce(X, F),
          typeof F == 'object' && F !== null && typeof F.then == 'function' && F.then(de, Te));
      } catch (me) {
        Te(me);
      } finally {
        (k !== null && X.types !== null && (k.types = X.types), (P.T = k));
      }
    }),
    (re.unstable_useCacheRefresh = function () {
      return P.H.useCacheRefresh();
    }),
    (re.use = function (x) {
      return P.H.use(x);
    }),
    (re.useActionState = function (x, k, X) {
      return P.H.useActionState(x, k, X);
    }),
    (re.useCallback = function (x, k) {
      return P.H.useCallback(x, k);
    }),
    (re.useContext = function (x) {
      return P.H.useContext(x);
    }),
    (re.useDebugValue = function () {}),
    (re.useDeferredValue = function (x, k) {
      return P.H.useDeferredValue(x, k);
    }),
    (re.useEffect = function (x, k) {
      return P.H.useEffect(x, k);
    }),
    (re.useEffectEvent = function (x) {
      return P.H.useEffectEvent(x);
    }),
    (re.useId = function () {
      return P.H.useId();
    }),
    (re.useImperativeHandle = function (x, k, X) {
      return P.H.useImperativeHandle(x, k, X);
    }),
    (re.useInsertionEffect = function (x, k) {
      return P.H.useInsertionEffect(x, k);
    }),
    (re.useLayoutEffect = function (x, k) {
      return P.H.useLayoutEffect(x, k);
    }),
    (re.useMemo = function (x, k) {
      return P.H.useMemo(x, k);
    }),
    (re.useOptimistic = function (x, k) {
      return P.H.useOptimistic(x, k);
    }),
    (re.useReducer = function (x, k, X) {
      return P.H.useReducer(x, k, X);
    }),
    (re.useRef = function (x) {
      return P.H.useRef(x);
    }),
    (re.useState = function (x) {
      return P.H.useState(x);
    }),
    (re.useSyncExternalStore = function (x, k, X) {
      return P.H.useSyncExternalStore(x, k, X);
    }),
    (re.useTransition = function () {
      return P.H.useTransition();
    }),
    (re.version = '19.2.5'),
    re
  );
}
var o0;
function lf() {
  return (o0 || ((o0 = 1), (Ru.exports = ug())), Ru.exports);
}
var Ou = { exports: {} },
  Ot = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var r0;
function fg() {
  if (r0) return Ot;
  r0 = 1;
  var l = lf();
  function i(g) {
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
  var o = {
      d: {
        f: s,
        r: function () {
          throw Error(i(522));
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
    (Ot.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (Ot.createPortal = function (g, y) {
      var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(i(299));
      return d(g, y, null, _);
    }),
    (Ot.flushSync = function (g) {
      var y = m.T,
        _ = o.p;
      try {
        if (((m.T = null), (o.p = 2), g)) return g();
      } finally {
        ((m.T = y), (o.p = _), o.d.f());
      }
    }),
    (Ot.preconnect = function (g, y) {
      typeof g == 'string' &&
        (y
          ? ((y = y.crossOrigin),
            (y = typeof y == 'string' ? (y === 'use-credentials' ? y : '') : void 0))
          : (y = null),
        o.d.C(g, y));
    }),
    (Ot.prefetchDNS = function (g) {
      typeof g == 'string' && o.d.D(g);
    }),
    (Ot.preinit = function (g, y) {
      if (typeof g == 'string' && y && typeof y.as == 'string') {
        var _ = y.as,
          b = p(_, y.crossOrigin),
          A = typeof y.integrity == 'string' ? y.integrity : void 0,
          M = typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0;
        _ === 'style'
          ? o.d.S(g, typeof y.precedence == 'string' ? y.precedence : void 0, {
              crossOrigin: b,
              integrity: A,
              fetchPriority: M,
            })
          : _ === 'script' &&
            o.d.X(g, {
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
            o.d.M(g, {
              crossOrigin: _,
              integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
          }
        } else y == null && o.d.M(g);
    }),
    (Ot.preload = function (g, y) {
      if (typeof g == 'string' && typeof y == 'object' && y !== null && typeof y.as == 'string') {
        var _ = y.as,
          b = p(_, y.crossOrigin);
        o.d.L(g, _, {
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
          o.d.m(g, {
            as: typeof y.as == 'string' && y.as !== 'script' ? y.as : void 0,
            crossOrigin: _,
            integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
          });
        } else o.d.m(g);
    }),
    (Ot.requestFormReset = function (g) {
      o.d.r(g);
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
var u0;
function dg() {
  if (u0) return Ou.exports;
  u0 = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return (l(), (Ou.exports = fg()), Ou.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var f0;
function mg() {
  if (f0) return bc;
  f0 = 1;
  var l = rg(),
    i = lf(),
    s = dg();
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
    if (d(e) !== e) throw Error(o(188));
  }
  function y(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var a = e, n = t; ; ) {
      var c = a.return;
      if (c === null) break;
      var r = c.alternate;
      if (r === null) {
        if (((n = c.return), n !== null)) {
          a = n;
          continue;
        }
        break;
      }
      if (c.child === r.child) {
        for (r = c.child; r; ) {
          if (r === a) return (g(c), e);
          if (r === n) return (g(c), t);
          r = r.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== n.return) ((a = c), (n = r));
      else {
        for (var h = !1, v = c.child; v; ) {
          if (v === a) {
            ((h = !0), (a = c), (n = r));
            break;
          }
          if (v === n) {
            ((h = !0), (n = c), (a = r));
            break;
          }
          v = v.sibling;
        }
        if (!h) {
          for (v = r.child; v; ) {
            if (v === a) {
              ((h = !0), (a = r), (n = c));
              break;
            }
            if (v === n) {
              ((h = !0), (n = r), (a = c));
              break;
            }
            v = v.sibling;
          }
          if (!h) throw Error(o(189));
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
  var b = Object.assign,
    A = Symbol.for('react.element'),
    M = Symbol.for('react.transitional.element'),
    E = Symbol.for('react.portal'),
    U = Symbol.for('react.fragment'),
    O = Symbol.for('react.strict_mode'),
    K = Symbol.for('react.profiler'),
    V = Symbol.for('react.consumer'),
    se = Symbol.for('react.context'),
    C = Symbol.for('react.forward_ref'),
    ae = Symbol.for('react.suspense'),
    de = Symbol.for('react.suspense_list'),
    P = Symbol.for('react.memo'),
    Re = Symbol.for('react.lazy'),
    it = Symbol.for('react.activity'),
    et = Symbol.for('react.memo_cache_sentinel'),
    ke = Symbol.iterator;
  function at(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (ke && e[ke]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var $t = Symbol.for('react.client.reference');
  function Ut(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === $t ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case U:
        return 'Fragment';
      case K:
        return 'Profiler';
      case O:
        return 'StrictMode';
      case ae:
        return 'Suspense';
      case de:
        return 'SuspenseList';
      case it:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case E:
          return 'Portal';
        case se:
          return e.displayName || 'Context';
        case V:
          return (e._context.displayName || 'Context') + '.Consumer';
        case C:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case P:
          return ((t = e.displayName || null), t !== null ? t : Ut(e.type) || 'Memo');
        case Re:
          ((t = e._payload), (e = e._init));
          try {
            return Ut(e(t));
          } catch {}
      }
    return null;
  }
  var ot = Array.isArray,
    D = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Z = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ie = { pending: !1, data: null, method: null, action: null },
    Te = [],
    Ee = -1;
  function x(e) {
    return { current: e };
  }
  function k(e) {
    0 > Ee || ((e.current = Te[Ee]), (Te[Ee] = null), Ee--);
  }
  function X(e, t) {
    (Ee++, (Te[Ee] = e.current), (e.current = t));
  }
  var F = x(null),
    ce = x(null),
    me = x(null),
    Me = x(null);
  function pt(e, t) {
    switch ((X(me, t), X(ce, e), X(F, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Mh(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Mh(t)), (e = Eh(t, e)));
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
    (k(F), X(F, e));
  }
  function Ke() {
    (k(F), k(ce), k(me));
  }
  function $a(e) {
    e.memoizedState !== null && X(Me, e);
    var t = F.current,
      a = Eh(t, e.type);
    t !== a && (X(ce, e), X(F, a));
  }
  function Na(e) {
    (ce.current === e && (k(F), k(ce)), Me.current === e && (k(Me), (pc._currentValue = ie)));
  }
  var he, vt;
  function Qe(e) {
    if (he === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((he = (t && t[1]) || ''),
          (vt =
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
      he +
      e +
      vt
    );
  }
  var ne = !1;
  function ga(e, t) {
    if (!e || ne) return '';
    ne = !0;
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
                } catch (R) {
                  var z = R;
                }
                Reflect.construct(e, [], H);
              } else {
                try {
                  H.call();
                } catch (R) {
                  z = R;
                }
                e.call(H.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                z = R;
              }
              (H = e()) && typeof H.catch == 'function' && H.catch(function () {});
            }
          } catch (R) {
            if (R && z && typeof R.stack == 'string') return [R.stack, z.stack];
          }
          return [null, null];
        },
      };
      n.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var c = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, 'name');
      c &&
        c.configurable &&
        Object.defineProperty(n.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var r = n.DetermineComponentFrameRoot(),
        h = r[0],
        v = r[1];
      if (h && v) {
        var S = h.split(`
`),
          N = v.split(`
`);
        for (c = n = 0; n < S.length && !S[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; c < N.length && !N[c].includes('DetermineComponentFrameRoot'); ) c++;
        if (n === S.length || c === N.length)
          for (n = S.length - 1, c = N.length - 1; 1 <= n && 0 <= c && S[n] !== N[c]; ) c--;
        for (; 1 <= n && 0 <= c; n--, c--)
          if (S[n] !== N[c]) {
            if (n !== 1 || c !== 1)
              do
                if ((n--, c--, 0 > c || S[n] !== N[c])) {
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
              while (1 <= n && 0 <= c);
            break;
          }
      }
    } finally {
      ((ne = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? Qe(a) : '';
  }
  function rt(e, t) {
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
  function _t(e) {
    try {
      var t = '',
        a = null;
      do ((t += rt(e, a)), (a = e), (e = e.return));
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
  var De = Object.prototype.hasOwnProperty,
    Tt = l.unstable_scheduleCallback,
    He = l.unstable_cancelCallback,
    Ze = l.unstable_shouldYield,
    Rt = l.unstable_requestPaint,
    Be = l.unstable_now,
    na = l.unstable_getCurrentPriorityLevel,
    ka = l.unstable_ImmediatePriority,
    Ha = l.unstable_UserBlockingPriority,
    hn = l.unstable_NormalPriority,
    Ei = l.unstable_LowPriority,
    Jn = l.unstable_IdlePriority,
    Fn = l.log,
    Cl = l.unstable_setDisableYieldValue,
    za = null,
    yt = null;
  function bt(e) {
    if ((typeof Fn == 'function' && Cl(e), yt && typeof yt.setStrictMode == 'function'))
      try {
        yt.setStrictMode(za, e);
      } catch {}
  }
  var St = Math.clz32 ? Math.clz32 : Q,
    wi = Math.log,
    pn = Math.LN2;
  function Q(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((wi(e) / pn) | 0)) | 0);
  }
  var Ua = 256,
    va = 262144,
    qa = 4194304;
  function la(e) {
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
  function Va(e, t, a) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var c = 0,
      r = e.suspendedLanes,
      h = e.pingedLanes;
    e = e.warmLanes;
    var v = n & 134217727;
    return (
      v !== 0
        ? ((n = v & ~r),
          n !== 0
            ? (c = la(n))
            : ((h &= v), h !== 0 ? (c = la(h)) : a || ((a = v & ~e), a !== 0 && (c = la(a)))))
        : ((v = n & ~r),
          v !== 0
            ? (c = la(v))
            : h !== 0
              ? (c = la(h))
              : a || ((a = n & ~e), a !== 0 && (c = la(a)))),
      c === 0
        ? 0
        : t !== 0 &&
            t !== c &&
            (t & r) === 0 &&
            ((r = c & -c), (a = t & -t), r >= a || (r === 32 && (a & 4194048) !== 0))
          ? t
          : c
    );
  }
  function In(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Pn(e, t) {
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
  function Ni() {
    var e = qa;
    return ((qa <<= 1), (qa & 62914560) === 0 && (qa = 4194304), e);
  }
  function el(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function J(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function ue(e, t, a, n, c, r) {
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
      var B = 31 - St(a),
        H = 1 << B;
      ((v[B] = 0), (S[B] = -1));
      var z = N[B];
      if (z !== null)
        for (N[B] = null, B = 0; B < z.length; B++) {
          var R = z[B];
          R !== null && (R.lane &= -536870913);
        }
      a &= ~H;
    }
    (n !== 0 && ge(e, n, 0),
      r !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(h & ~t)));
  }
  function ge(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - St(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function we(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var n = 31 - St(a),
        c = 1 << n;
      ((c & t) | (e[n] & t) && (e[n] |= t), (a &= ~c));
    }
  }
  function We(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : kt(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function kt(e) {
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
  function Oe(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function ye() {
    var e = Z.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Jh(e.type));
  }
  function be(e, t) {
    var a = Z.p;
    try {
      return ((Z.p = e), t());
    } finally {
      Z.p = a;
    }
  }
  var Xe = Math.random().toString(36).slice(2),
    tt = '__reactFiber$' + Xe,
    Mt = '__reactProps$' + Xe,
    Ca = '__reactContainer$' + Xe,
    _o = '__reactEvents$' + Xe,
    X1 = '__reactListeners$' + Xe,
    K1 = '__reactHandles$' + Xe,
    mf = '__reactResources$' + Xe,
    zi = '__reactMarker$' + Xe;
  function bo(e) {
    (delete e[tt], delete e[Mt], delete e[_o], delete e[X1], delete e[K1]);
  }
  function Rl(e) {
    var t = e[tt];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Ca] || a[tt])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = Dh(e); e !== null; ) {
            if ((a = e[tt])) return a;
            e = Dh(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function Ol(e) {
    if ((e = e[tt] || e[Ca])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Ci(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Dl(e) {
    var t = e[mf];
    return (t || (t = e[mf] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function xt(e) {
    e[zi] = !0;
  }
  var hf = new Set(),
    pf = {};
  function tl(e, t) {
    (Bl(e, t), Bl(e + 'Capture', t));
  }
  function Bl(e, t) {
    for (pf[e] = t, e = 0; e < t.length; e++) hf.add(t[e]);
  }
  var Q1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    yf = {},
    gf = {};
  function W1(e) {
    return De.call(gf, e)
      ? !0
      : De.call(yf, e)
        ? !1
        : Q1.test(e)
          ? (gf[e] = !0)
          : ((yf[e] = !0), !1);
  }
  function Hc(e, t, a) {
    if (W1(t))
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
  function Uc(e, t, a) {
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
  function Ga(e, t, a, n) {
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
  function ia(e) {
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
  function vf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function J1(e, t, a) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var c = n.get,
        r = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return c.call(this);
          },
          set: function (h) {
            ((a = '' + h), r.call(this, h));
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
  function So(e) {
    if (!e._valueTracker) {
      var t = vf(e) ? 'checked' : 'value';
      e._valueTracker = J1(e, t, '' + e[t]);
    }
  }
  function _f(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      n = '';
    return (
      e && (n = vf(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function qc(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var F1 = /[\n"\\]/g;
  function ca(e) {
    return e.replace(F1, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function xo(e, t, a, n, c, r, h, v) {
    ((e.name = ''),
      h != null && typeof h != 'function' && typeof h != 'symbol' && typeof h != 'boolean'
        ? (e.type = h)
        : e.removeAttribute('type'),
      t != null
        ? h === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + ia(t))
          : e.value !== '' + ia(t) && (e.value = '' + ia(t))
        : (h !== 'submit' && h !== 'reset') || e.removeAttribute('value'),
      t != null
        ? jo(e, h, ia(t))
        : a != null
          ? jo(e, h, ia(a))
          : n != null && e.removeAttribute('value'),
      c == null && r != null && (e.defaultChecked = !!r),
      c != null && (e.checked = c && typeof c != 'function' && typeof c != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (e.name = '' + ia(v))
        : e.removeAttribute('name'));
  }
  function bf(e, t, a, n, c, r, h, v) {
    if (
      (r != null &&
        typeof r != 'function' &&
        typeof r != 'symbol' &&
        typeof r != 'boolean' &&
        (e.type = r),
      t != null || a != null)
    ) {
      if (!((r !== 'submit' && r !== 'reset') || t != null)) {
        So(e);
        return;
      }
      ((a = a != null ? '' + ia(a) : ''),
        (t = t != null ? '' + ia(t) : a),
        v || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? c),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = v ? e.checked : !!n),
      (e.defaultChecked = !!n),
      h != null &&
        typeof h != 'function' &&
        typeof h != 'symbol' &&
        typeof h != 'boolean' &&
        (e.name = h),
      So(e));
  }
  function jo(e, t, a) {
    (t === 'number' && qc(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function Ll(e, t, a, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var c = 0; c < a.length; c++) t['$' + a[c]] = !0;
      for (a = 0; a < e.length; a++)
        ((c = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== c && (e[a].selected = c),
          c && n && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + ia(a), t = null, c = 0; c < e.length; c++) {
        if (e[c].value === a) {
          ((e[c].selected = !0), n && (e[c].defaultSelected = !0));
          return;
        }
        t !== null || e[c].disabled || (t = e[c]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Sf(e, t, a) {
    if (t != null && ((t = '' + ia(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + ia(a) : '';
  }
  function xf(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(o(92));
        if (ot(n)) {
          if (1 < n.length) throw Error(o(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = ia(t)),
      (e.defaultValue = a),
      (n = e.textContent),
      n === a && n !== '' && n !== null && (e.value = n),
      So(e));
  }
  function $l(e, t) {
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
  function jf(e, t, a) {
    var n = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || I1.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function Af(e, t, a) {
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
      for (var c in t) ((n = t[c]), t.hasOwnProperty(c) && a[c] !== n && jf(e, c, n));
    } else for (var r in t) t.hasOwnProperty(r) && jf(e, r, t[r]);
  }
  function Ao(e) {
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
    ep =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Vc(e) {
    return ep.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Ya() {}
  var To = null;
  function Mo(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var kl = null,
    Hl = null;
  function Tf(e) {
    var t = Ol(e);
    if (t && (e = t.stateNode)) {
      var a = e[Mt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (xo(
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
              a = a.querySelectorAll('input[name="' + ca('' + t) + '"][type="radio"]'), t = 0;
              t < a.length;
              t++
            ) {
              var n = a[t];
              if (n !== e && n.form === e.form) {
                var c = n[Mt] || null;
                if (!c) throw Error(o(90));
                xo(
                  n,
                  c.value,
                  c.defaultValue,
                  c.defaultValue,
                  c.checked,
                  c.defaultChecked,
                  c.type,
                  c.name
                );
              }
            }
            for (t = 0; t < a.length; t++) ((n = a[t]), n.form === e.form && _f(n));
          }
          break e;
        case 'textarea':
          Sf(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && Ll(e, !!a.multiple, t, !1));
      }
    }
  }
  var Eo = !1;
  function Mf(e, t, a) {
    if (Eo) return e(t, a);
    Eo = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Eo = !1),
        (kl !== null || Hl !== null) &&
          (Ns(), kl && ((t = kl), (e = Hl), (Hl = kl = null), Tf(t), e)))
      )
        for (t = 0; t < e.length; t++) Tf(e[t]);
    }
  }
  function Ri(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var n = a[Mt] || null;
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
  var Za = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    wo = !1;
  if (Za)
    try {
      var Oi = {};
      (Object.defineProperty(Oi, 'passive', {
        get: function () {
          wo = !0;
        },
      }),
        window.addEventListener('test', Oi, Oi),
        window.removeEventListener('test', Oi, Oi));
    } catch {
      wo = !1;
    }
  var yn = null,
    No = null,
    Gc = null;
  function Ef() {
    if (Gc) return Gc;
    var e,
      t = No,
      a = t.length,
      n,
      c = 'value' in yn ? yn.value : yn.textContent,
      r = c.length;
    for (e = 0; e < a && t[e] === c[e]; e++);
    var h = a - e;
    for (n = 1; n <= h && t[a - n] === c[r - n]; n++);
    return (Gc = c.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Yc(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Zc() {
    return !0;
  }
  function wf() {
    return !1;
  }
  function qt(e) {
    function t(a, n, c, r, h) {
      ((this._reactName = a),
        (this._targetInst = c),
        (this.type = n),
        (this.nativeEvent = r),
        (this.target = h),
        (this.currentTarget = null));
      for (var v in e) e.hasOwnProperty(v) && ((a = e[v]), (this[v] = a ? a(r) : r[v]));
      return (
        (this.isDefaultPrevented = (
          r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1
        )
          ? Zc
          : wf),
        (this.isPropagationStopped = wf),
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
            (this.isDefaultPrevented = Zc));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Zc));
        },
        persist: function () {},
        isPersistent: Zc,
      }),
      t
    );
  }
  var al = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Xc = qt(al),
    Di = b({}, al, { view: 0, detail: 0 }),
    tp = qt(Di),
    zo,
    Co,
    Bi,
    Kc = b({}, Di, {
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
      getModifierState: Oo,
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
          : (e !== Bi &&
              (Bi && e.type === 'mousemove'
                ? ((zo = e.screenX - Bi.screenX), (Co = e.screenY - Bi.screenY))
                : (Co = zo = 0),
              (Bi = e)),
            zo);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Co;
      },
    }),
    Nf = qt(Kc),
    ap = b({}, Kc, { dataTransfer: 0 }),
    np = qt(ap),
    lp = b({}, Di, { relatedTarget: 0 }),
    Ro = qt(lp),
    ip = b({}, al, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    cp = qt(ip),
    sp = b({}, al, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    op = qt(sp),
    rp = b({}, al, { data: 0 }),
    zf = qt(rp),
    up = {
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
    fp = {
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
    dp = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function mp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = dp[e]) ? !!t[e] : !1;
  }
  function Oo() {
    return mp;
  }
  var hp = b({}, Di, {
      key: function (e) {
        if (e.key) {
          var t = up[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Yc(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? fp[e.keyCode] || 'Unidentified'
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
      getModifierState: Oo,
      charCode: function (e) {
        return e.type === 'keypress' ? Yc(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Yc(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    pp = qt(hp),
    yp = b({}, Kc, {
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
    Cf = qt(yp),
    gp = b({}, Di, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Oo,
    }),
    vp = qt(gp),
    _p = b({}, al, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    bp = qt(_p),
    Sp = b({}, Kc, {
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
    xp = qt(Sp),
    jp = b({}, al, { newState: 0, oldState: 0 }),
    Ap = qt(jp),
    Tp = [9, 13, 27, 32],
    Do = Za && 'CompositionEvent' in window,
    Li = null;
  Za && 'documentMode' in document && (Li = document.documentMode);
  var Mp = Za && 'TextEvent' in window && !Li,
    Rf = Za && (!Do || (Li && 8 < Li && 11 >= Li)),
    Of = ' ',
    Df = !1;
  function Bf(e, t) {
    switch (e) {
      case 'keyup':
        return Tp.indexOf(t.keyCode) !== -1;
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
  function Lf(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Ul = !1;
  function Ep(e, t) {
    switch (e) {
      case 'compositionend':
        return Lf(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Df = !0), Of);
      case 'textInput':
        return ((e = t.data), e === Of && Df ? null : e);
      default:
        return null;
    }
  }
  function wp(e, t) {
    if (Ul)
      return e === 'compositionend' || (!Do && Bf(e, t))
        ? ((e = Ef()), (Gc = No = yn = null), (Ul = !1), e)
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
        return Rf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Np = {
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
  function $f(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Np[e.type] : t === 'textarea';
  }
  function kf(e, t, a, n) {
    (kl ? (Hl ? Hl.push(n) : (Hl = [n])) : (kl = n),
      (t = Ls(t, 'onChange')),
      0 < t.length &&
        ((a = new Xc('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var $i = null,
    ki = null;
  function zp(e) {
    bh(e, 0);
  }
  function Qc(e) {
    var t = Ci(e);
    if (_f(t)) return e;
  }
  function Hf(e, t) {
    if (e === 'change') return t;
  }
  var Uf = !1;
  if (Za) {
    var Bo;
    if (Za) {
      var Lo = 'oninput' in document;
      if (!Lo) {
        var qf = document.createElement('div');
        (qf.setAttribute('oninput', 'return;'), (Lo = typeof qf.oninput == 'function'));
      }
      Bo = Lo;
    } else Bo = !1;
    Uf = Bo && (!document.documentMode || 9 < document.documentMode);
  }
  function Vf() {
    $i && ($i.detachEvent('onpropertychange', Gf), (ki = $i = null));
  }
  function Gf(e) {
    if (e.propertyName === 'value' && Qc(ki)) {
      var t = [];
      (kf(t, ki, e, Mo(e)), Mf(zp, t));
    }
  }
  function Cp(e, t, a) {
    e === 'focusin'
      ? (Vf(), ($i = t), (ki = a), $i.attachEvent('onpropertychange', Gf))
      : e === 'focusout' && Vf();
  }
  function Rp(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Qc(ki);
  }
  function Op(e, t) {
    if (e === 'click') return Qc(t);
  }
  function Dp(e, t) {
    if (e === 'input' || e === 'change') return Qc(t);
  }
  function Bp(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Kt = typeof Object.is == 'function' ? Object.is : Bp;
  function Hi(e, t) {
    if (Kt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      n = Object.keys(t);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var c = a[n];
      if (!De.call(t, c) || !Kt(e[c], t[c])) return !1;
    }
    return !0;
  }
  function Yf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Zf(e, t) {
    var a = Yf(e);
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
      a = Yf(a);
    }
  }
  function Xf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Xf(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Kf(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = qc(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = qc(e.document);
    }
    return t;
  }
  function $o(e) {
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
  var Lp = Za && 'documentMode' in document && 11 >= document.documentMode,
    ql = null,
    ko = null,
    Ui = null,
    Ho = !1;
  function Qf(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Ho ||
      ql == null ||
      ql !== qc(n) ||
      ((n = ql),
      'selectionStart' in n && $o(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Ui && Hi(Ui, n)) ||
        ((Ui = n),
        (n = Ls(ko, 'onSelect')),
        0 < n.length &&
          ((t = new Xc('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: n }),
          (t.target = ql))));
  }
  function nl(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var Vl = {
      animationend: nl('Animation', 'AnimationEnd'),
      animationiteration: nl('Animation', 'AnimationIteration'),
      animationstart: nl('Animation', 'AnimationStart'),
      transitionrun: nl('Transition', 'TransitionRun'),
      transitionstart: nl('Transition', 'TransitionStart'),
      transitioncancel: nl('Transition', 'TransitionCancel'),
      transitionend: nl('Transition', 'TransitionEnd'),
    },
    Uo = {},
    Wf = {};
  Za &&
    ((Wf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Vl.animationend.animation,
      delete Vl.animationiteration.animation,
      delete Vl.animationstart.animation),
    'TransitionEvent' in window || delete Vl.transitionend.transition);
  function ll(e) {
    if (Uo[e]) return Uo[e];
    if (!Vl[e]) return e;
    var t = Vl[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in Wf) return (Uo[e] = t[a]);
    return e;
  }
  var Jf = ll('animationend'),
    Ff = ll('animationiteration'),
    If = ll('animationstart'),
    $p = ll('transitionrun'),
    kp = ll('transitionstart'),
    Hp = ll('transitioncancel'),
    Pf = ll('transitionend'),
    ed = new Map(),
    qo =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  qo.push('scrollEnd');
  function _a(e, t) {
    (ed.set(e, t), tl(t, [e]));
  }
  var Wc =
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
    sa = [],
    Gl = 0,
    Vo = 0;
  function Jc() {
    for (var e = Gl, t = (Vo = Gl = 0); t < e; ) {
      var a = sa[t];
      sa[t++] = null;
      var n = sa[t];
      sa[t++] = null;
      var c = sa[t];
      sa[t++] = null;
      var r = sa[t];
      if (((sa[t++] = null), n !== null && c !== null)) {
        var h = n.pending;
        (h === null ? (c.next = c) : ((c.next = h.next), (h.next = c)), (n.pending = c));
      }
      r !== 0 && td(a, c, r);
    }
  }
  function Fc(e, t, a, n) {
    ((sa[Gl++] = e),
      (sa[Gl++] = t),
      (sa[Gl++] = a),
      (sa[Gl++] = n),
      (Vo |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function Go(e, t, a, n) {
    return (Fc(e, t, a, n), Ic(e));
  }
  function il(e, t) {
    return (Fc(e, null, null, t), Ic(e));
  }
  function td(e, t, a) {
    e.lanes |= a;
    var n = e.alternate;
    n !== null && (n.lanes |= a);
    for (var c = !1, r = e.return; r !== null; )
      ((r.childLanes |= a),
        (n = r.alternate),
        n !== null && (n.childLanes |= a),
        r.tag === 22 && ((e = r.stateNode), e === null || e._visibility & 1 || (c = !0)),
        (e = r),
        (r = r.return));
    return e.tag === 3
      ? ((r = e.stateNode),
        c &&
          t !== null &&
          ((c = 31 - St(a)),
          (e = r.hiddenUpdates),
          (n = e[c]),
          n === null ? (e[c] = [t]) : n.push(t),
          (t.lane = a | 536870912)),
        r)
      : null;
  }
  function Ic(e) {
    if (50 < oc) throw ((oc = 0), (Ir = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Yl = {};
  function Up(e, t, a, n) {
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
    return new Up(e, t, a, n);
  }
  function Yo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Xa(e, t) {
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
  function ad(e, t) {
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
  function Pc(e, t, a, n, c, r) {
    var h = 0;
    if (((n = e), typeof e == 'function')) Yo(e) && (h = 1);
    else if (typeof e == 'string')
      h = Zy(e, a, F.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case it:
          return ((e = Qt(31, a, t, c)), (e.elementType = it), (e.lanes = r), e);
        case U:
          return cl(a.children, c, r, t);
        case O:
          ((h = 8), (c |= 24));
          break;
        case K:
          return ((e = Qt(12, a, t, c | 2)), (e.elementType = K), (e.lanes = r), e);
        case ae:
          return ((e = Qt(13, a, t, c)), (e.elementType = ae), (e.lanes = r), e);
        case de:
          return ((e = Qt(19, a, t, c)), (e.elementType = de), (e.lanes = r), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case se:
                h = 10;
                break e;
              case V:
                h = 9;
                break e;
              case C:
                h = 11;
                break e;
              case P:
                h = 14;
                break e;
              case Re:
                ((h = 16), (n = null));
                break e;
            }
          ((h = 29), (a = Error(o(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Qt(h, a, t, c)), (t.elementType = e), (t.type = n), (t.lanes = r), t);
  }
  function cl(e, t, a, n) {
    return ((e = Qt(7, e, n, t)), (e.lanes = a), e);
  }
  function Zo(e, t, a) {
    return ((e = Qt(6, e, null, t)), (e.lanes = a), e);
  }
  function nd(e) {
    var t = Qt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Xo(e, t, a) {
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
  var ld = new WeakMap();
  function oa(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = ld.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: _t(t) }), ld.set(e, t), t);
    }
    return { value: e, source: t, stack: _t(t) };
  }
  var Zl = [],
    Xl = 0,
    es = null,
    qi = 0,
    ra = [],
    ua = 0,
    gn = null,
    Ra = 1,
    Oa = '';
  function Ka(e, t) {
    ((Zl[Xl++] = qi), (Zl[Xl++] = es), (es = e), (qi = t));
  }
  function id(e, t, a) {
    ((ra[ua++] = Ra), (ra[ua++] = Oa), (ra[ua++] = gn), (gn = e));
    var n = Ra;
    e = Oa;
    var c = 32 - St(n) - 1;
    ((n &= ~(1 << c)), (a += 1));
    var r = 32 - St(t) + c;
    if (30 < r) {
      var h = c - (c % 5);
      ((r = (n & ((1 << h) - 1)).toString(32)),
        (n >>= h),
        (c -= h),
        (Ra = (1 << (32 - St(t) + c)) | (a << c) | n),
        (Oa = r + e));
    } else ((Ra = (1 << r) | (a << c) | n), (Oa = e));
  }
  function Ko(e) {
    e.return !== null && (Ka(e, 1), id(e, 1, 0));
  }
  function Qo(e) {
    for (; e === es; ) ((es = Zl[--Xl]), (Zl[Xl] = null), (qi = Zl[--Xl]), (Zl[Xl] = null));
    for (; e === gn; )
      ((gn = ra[--ua]),
        (ra[ua] = null),
        (Oa = ra[--ua]),
        (ra[ua] = null),
        (Ra = ra[--ua]),
        (ra[ua] = null));
  }
  function cd(e, t) {
    ((ra[ua++] = Ra), (ra[ua++] = Oa), (ra[ua++] = gn), (Ra = t.id), (Oa = t.overflow), (gn = e));
  }
  var Et = null,
    Je = null,
    Ae = !1,
    vn = null,
    fa = !1,
    Wo = Error(o(519));
  function _n(e) {
    var t = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Vi(oa(t, e)), Wo);
  }
  function sd(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[tt] = e), (t[Mt] = n), a)) {
      case 'dialog':
        (_e('cancel', t), _e('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        _e('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < uc.length; a++) _e(uc[a], t);
        break;
      case 'source':
        _e('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (_e('error', t), _e('load', t));
        break;
      case 'details':
        _e('toggle', t);
        break;
      case 'input':
        (_e('invalid', t),
          bf(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        _e('invalid', t);
        break;
      case 'textarea':
        (_e('invalid', t), xf(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      Ah(t.textContent, a)
        ? (n.popover != null && (_e('beforetoggle', t), _e('toggle', t)),
          n.onScroll != null && _e('scroll', t),
          n.onScrollEnd != null && _e('scrollend', t),
          n.onClick != null && (t.onclick = Ya),
          (t = !0))
        : (t = !1),
      t || _n(e, !0));
  }
  function od(e) {
    for (Et = e.return; Et; )
      switch (Et.tag) {
        case 5:
        case 31:
        case 13:
          fa = !1;
          return;
        case 27:
        case 3:
          fa = !0;
          return;
        default:
          Et = Et.return;
      }
  }
  function Kl(e) {
    if (e !== Et) return !1;
    if (!Ae) return (od(e), (Ae = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || mu(e.type, e.memoizedProps))),
        (a = !a)),
      a && Je && _n(e),
      od(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      Je = Oh(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      Je = Oh(e);
    } else
      t === 27
        ? ((t = Je), On(e.type) ? ((e = vu), (vu = null), (Je = e)) : (Je = t))
        : (Je = Et ? ma(e.stateNode.nextSibling) : null);
    return !0;
  }
  function sl() {
    ((Je = Et = null), (Ae = !1));
  }
  function Jo() {
    var e = vn;
    return (e !== null && (Zt === null ? (Zt = e) : Zt.push.apply(Zt, e), (vn = null)), e);
  }
  function Vi(e) {
    vn === null ? (vn = [e]) : vn.push(e);
  }
  var Fo = x(null),
    ol = null,
    Qa = null;
  function bn(e, t, a) {
    (X(Fo, t._currentValue), (t._currentValue = a));
  }
  function Wa(e) {
    ((e._currentValue = Fo.current), k(Fo));
  }
  function Io(e, t, a) {
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
  function Po(e, t, a, n) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var r = c.dependencies;
      if (r !== null) {
        var h = c.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var v = r;
          r = c;
          for (var S = 0; S < t.length; S++)
            if (v.context === t[S]) {
              ((r.lanes |= a),
                (v = r.alternate),
                v !== null && (v.lanes |= a),
                Io(r.return, a, e),
                n || (h = null));
              break e;
            }
          r = v.next;
        }
      } else if (c.tag === 18) {
        if (((h = c.return), h === null)) throw Error(o(341));
        ((h.lanes |= a), (r = h.alternate), r !== null && (r.lanes |= a), Io(h, a, e), (h = null));
      } else h = c.child;
      if (h !== null) h.return = c;
      else
        for (h = c; h !== null; ) {
          if (h === e) {
            h = null;
            break;
          }
          if (((c = h.sibling), c !== null)) {
            ((c.return = h.return), (h = c));
            break;
          }
          h = h.return;
        }
      c = h;
    }
  }
  function Ql(e, t, a, n) {
    e = null;
    for (var c = t, r = !1; c !== null; ) {
      if (!r) {
        if ((c.flags & 524288) !== 0) r = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var h = c.alternate;
        if (h === null) throw Error(o(387));
        if (((h = h.memoizedProps), h !== null)) {
          var v = c.type;
          Kt(c.pendingProps.value, h.value) || (e !== null ? e.push(v) : (e = [v]));
        }
      } else if (c === Me.current) {
        if (((h = c.alternate), h === null)) throw Error(o(387));
        h.memoizedState.memoizedState !== c.memoizedState.memoizedState &&
          (e !== null ? e.push(pc) : (e = [pc]));
      }
      c = c.return;
    }
    (e !== null && Po(t, e, a, n), (t.flags |= 262144));
  }
  function ts(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Kt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function rl(e) {
    ((ol = e), (Qa = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function wt(e) {
    return rd(ol, e);
  }
  function as(e, t) {
    return (ol === null && rl(e), rd(e, t));
  }
  function rd(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Qa === null)) {
      if (e === null) throw Error(o(308));
      ((Qa = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Qa = Qa.next = t;
    return a;
  }
  var qp =
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
    Vp = l.unstable_scheduleCallback,
    Gp = l.unstable_NormalPriority,
    ut = {
      $$typeof: se,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function er() {
    return { controller: new qp(), data: new Map(), refCount: 0 };
  }
  function Gi(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Vp(Gp, function () {
          e.controller.abort();
        }));
  }
  var Yi = null,
    tr = 0,
    Wl = 0,
    Jl = null;
  function Yp(e, t) {
    if (Yi === null) {
      var a = (Yi = []);
      ((tr = 0),
        (Wl = lu()),
        (Jl = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (tr++, t.then(ud, ud), t);
  }
  function ud() {
    if (--tr === 0 && Yi !== null) {
      Jl !== null && (Jl.status = 'fulfilled');
      var e = Yi;
      ((Yi = null), (Wl = 0), (Jl = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Zp(e, t) {
    var a = [],
      n = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (c) {
          a.push(c);
        },
      };
    return (
      e.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = t));
          for (var c = 0; c < a.length; c++) (0, a[c])(t);
        },
        function (c) {
          for (n.status = 'rejected', n.reason = c, c = 0; c < a.length; c++) (0, a[c])(void 0);
        }
      ),
      n
    );
  }
  var fd = D.S;
  D.S = function (e, t) {
    ((Qm = Be()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Yp(e, t),
      fd !== null && fd(e, t));
  };
  var ul = x(null);
  function ar() {
    var e = ul.current;
    return e !== null ? e : Ge.pooledCache;
  }
  function ns(e, t) {
    t === null ? X(ul, ul.current) : X(ul, t.pool);
  }
  function dd() {
    var e = ar();
    return e === null ? null : { parent: ut._currentValue, pool: e };
  }
  var Fl = Error(o(460)),
    nr = Error(o(474)),
    ls = Error(o(542)),
    is = { then: function () {} };
  function md(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function hd(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(Ya, Ya), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), yd(e), e);
      default:
        if (typeof t.status == 'string') t.then(Ya, Ya);
        else {
          if (((e = Ge), e !== null && 100 < e.shellSuspendCounter)) throw Error(o(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (n) {
                if (t.status === 'pending') {
                  var c = t;
                  ((c.status = 'fulfilled'), (c.value = n));
                }
              },
              function (n) {
                if (t.status === 'pending') {
                  var c = t;
                  ((c.status = 'rejected'), (c.reason = n));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), yd(e), e);
        }
        throw ((dl = t), Fl);
    }
  }
  function fl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((dl = a), Fl) : a;
    }
  }
  var dl = null;
  function pd() {
    if (dl === null) throw Error(o(459));
    var e = dl;
    return ((dl = null), e);
  }
  function yd(e) {
    if (e === Fl || e === ls) throw Error(o(483));
  }
  var Il = null,
    Zi = 0;
  function cs(e) {
    var t = Zi;
    return ((Zi += 1), Il === null && (Il = []), hd(Il, e, t));
  }
  function Xi(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function ss(e, t) {
    throw t.$$typeof === A
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function gd(e) {
    function t(T, j) {
      if (e) {
        var w = T.deletions;
        w === null ? ((T.deletions = [j]), (T.flags |= 16)) : w.push(j);
      }
    }
    function a(T, j) {
      if (!e) return null;
      for (; j !== null; ) (t(T, j), (j = j.sibling));
      return null;
    }
    function n(T) {
      for (var j = new Map(); T !== null; )
        (T.key !== null ? j.set(T.key, T) : j.set(T.index, T), (T = T.sibling));
      return j;
    }
    function c(T, j) {
      return ((T = Xa(T, j)), (T.index = 0), (T.sibling = null), T);
    }
    function r(T, j, w) {
      return (
        (T.index = w),
        e
          ? ((w = T.alternate),
            w !== null
              ? ((w = w.index), w < j ? ((T.flags |= 67108866), j) : w)
              : ((T.flags |= 67108866), j))
          : ((T.flags |= 1048576), j)
      );
    }
    function h(T) {
      return (e && T.alternate === null && (T.flags |= 67108866), T);
    }
    function v(T, j, w, $) {
      return j === null || j.tag !== 6
        ? ((j = Zo(w, T.mode, $)), (j.return = T), j)
        : ((j = c(j, w)), (j.return = T), j);
    }
    function S(T, j, w, $) {
      var le = w.type;
      return le === U
        ? B(T, j, w.props.children, $, w.key)
        : j !== null &&
            (j.elementType === le ||
              (typeof le == 'object' && le !== null && le.$$typeof === Re && fl(le) === j.type))
          ? ((j = c(j, w.props)), Xi(j, w), (j.return = T), j)
          : ((j = Pc(w.type, w.key, w.props, null, T.mode, $)), Xi(j, w), (j.return = T), j);
    }
    function N(T, j, w, $) {
      return j === null ||
        j.tag !== 4 ||
        j.stateNode.containerInfo !== w.containerInfo ||
        j.stateNode.implementation !== w.implementation
        ? ((j = Xo(w, T.mode, $)), (j.return = T), j)
        : ((j = c(j, w.children || [])), (j.return = T), j);
    }
    function B(T, j, w, $, le) {
      return j === null || j.tag !== 7
        ? ((j = cl(w, T.mode, $, le)), (j.return = T), j)
        : ((j = c(j, w)), (j.return = T), j);
    }
    function H(T, j, w) {
      if ((typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint')
        return ((j = Zo('' + j, T.mode, w)), (j.return = T), j);
      if (typeof j == 'object' && j !== null) {
        switch (j.$$typeof) {
          case M:
            return ((w = Pc(j.type, j.key, j.props, null, T.mode, w)), Xi(w, j), (w.return = T), w);
          case E:
            return ((j = Xo(j, T.mode, w)), (j.return = T), j);
          case Re:
            return ((j = fl(j)), H(T, j, w));
        }
        if (ot(j) || at(j)) return ((j = cl(j, T.mode, w, null)), (j.return = T), j);
        if (typeof j.then == 'function') return H(T, cs(j), w);
        if (j.$$typeof === se) return H(T, as(T, j), w);
        ss(T, j);
      }
      return null;
    }
    function z(T, j, w, $) {
      var le = j !== null ? j.key : null;
      if ((typeof w == 'string' && w !== '') || typeof w == 'number' || typeof w == 'bigint')
        return le !== null ? null : v(T, j, '' + w, $);
      if (typeof w == 'object' && w !== null) {
        switch (w.$$typeof) {
          case M:
            return w.key === le ? S(T, j, w, $) : null;
          case E:
            return w.key === le ? N(T, j, w, $) : null;
          case Re:
            return ((w = fl(w)), z(T, j, w, $));
        }
        if (ot(w) || at(w)) return le !== null ? null : B(T, j, w, $, null);
        if (typeof w.then == 'function') return z(T, j, cs(w), $);
        if (w.$$typeof === se) return z(T, j, as(T, w), $);
        ss(T, w);
      }
      return null;
    }
    function R(T, j, w, $, le) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((T = T.get(w) || null), v(j, T, '' + $, le));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case M:
            return ((T = T.get($.key === null ? w : $.key) || null), S(j, T, $, le));
          case E:
            return ((T = T.get($.key === null ? w : $.key) || null), N(j, T, $, le));
          case Re:
            return (($ = fl($)), R(T, j, w, $, le));
        }
        if (ot($) || at($)) return ((T = T.get(w) || null), B(j, T, $, le, null));
        if (typeof $.then == 'function') return R(T, j, w, cs($), le);
        if ($.$$typeof === se) return R(T, j, w, as(j, $), le);
        ss(j, $);
      }
      return null;
    }
    function I(T, j, w, $) {
      for (
        var le = null, Ne = null, te = j, pe = (j = 0), xe = null;
        te !== null && pe < w.length;
        pe++
      ) {
        te.index > pe ? ((xe = te), (te = null)) : (xe = te.sibling);
        var ze = z(T, te, w[pe], $);
        if (ze === null) {
          te === null && (te = xe);
          break;
        }
        (e && te && ze.alternate === null && t(T, te),
          (j = r(ze, j, pe)),
          Ne === null ? (le = ze) : (Ne.sibling = ze),
          (Ne = ze),
          (te = xe));
      }
      if (pe === w.length) return (a(T, te), Ae && Ka(T, pe), le);
      if (te === null) {
        for (; pe < w.length; pe++)
          ((te = H(T, w[pe], $)),
            te !== null &&
              ((j = r(te, j, pe)), Ne === null ? (le = te) : (Ne.sibling = te), (Ne = te)));
        return (Ae && Ka(T, pe), le);
      }
      for (te = n(te); pe < w.length; pe++)
        ((xe = R(te, T, pe, w[pe], $)),
          xe !== null &&
            (e && xe.alternate !== null && te.delete(xe.key === null ? pe : xe.key),
            (j = r(xe, j, pe)),
            Ne === null ? (le = xe) : (Ne.sibling = xe),
            (Ne = xe)));
      return (
        e &&
          te.forEach(function (kn) {
            return t(T, kn);
          }),
        Ae && Ka(T, pe),
        le
      );
    }
    function oe(T, j, w, $) {
      if (w == null) throw Error(o(151));
      for (
        var le = null, Ne = null, te = j, pe = (j = 0), xe = null, ze = w.next();
        te !== null && !ze.done;
        pe++, ze = w.next()
      ) {
        te.index > pe ? ((xe = te), (te = null)) : (xe = te.sibling);
        var kn = z(T, te, ze.value, $);
        if (kn === null) {
          te === null && (te = xe);
          break;
        }
        (e && te && kn.alternate === null && t(T, te),
          (j = r(kn, j, pe)),
          Ne === null ? (le = kn) : (Ne.sibling = kn),
          (Ne = kn),
          (te = xe));
      }
      if (ze.done) return (a(T, te), Ae && Ka(T, pe), le);
      if (te === null) {
        for (; !ze.done; pe++, ze = w.next())
          ((ze = H(T, ze.value, $)),
            ze !== null &&
              ((j = r(ze, j, pe)), Ne === null ? (le = ze) : (Ne.sibling = ze), (Ne = ze)));
        return (Ae && Ka(T, pe), le);
      }
      for (te = n(te); !ze.done; pe++, ze = w.next())
        ((ze = R(te, T, pe, ze.value, $)),
          ze !== null &&
            (e && ze.alternate !== null && te.delete(ze.key === null ? pe : ze.key),
            (j = r(ze, j, pe)),
            Ne === null ? (le = ze) : (Ne.sibling = ze),
            (Ne = ze)));
      return (
        e &&
          te.forEach(function (ag) {
            return t(T, ag);
          }),
        Ae && Ka(T, pe),
        le
      );
    }
    function Ve(T, j, w, $) {
      if (
        (typeof w == 'object' &&
          w !== null &&
          w.type === U &&
          w.key === null &&
          (w = w.props.children),
        typeof w == 'object' && w !== null)
      ) {
        switch (w.$$typeof) {
          case M:
            e: {
              for (var le = w.key; j !== null; ) {
                if (j.key === le) {
                  if (((le = w.type), le === U)) {
                    if (j.tag === 7) {
                      (a(T, j.sibling), ($ = c(j, w.props.children)), ($.return = T), (T = $));
                      break e;
                    }
                  } else if (
                    j.elementType === le ||
                    (typeof le == 'object' &&
                      le !== null &&
                      le.$$typeof === Re &&
                      fl(le) === j.type)
                  ) {
                    (a(T, j.sibling), ($ = c(j, w.props)), Xi($, w), ($.return = T), (T = $));
                    break e;
                  }
                  a(T, j);
                  break;
                } else t(T, j);
                j = j.sibling;
              }
              w.type === U
                ? (($ = cl(w.props.children, T.mode, $, w.key)), ($.return = T), (T = $))
                : (($ = Pc(w.type, w.key, w.props, null, T.mode, $)),
                  Xi($, w),
                  ($.return = T),
                  (T = $));
            }
            return h(T);
          case E:
            e: {
              for (le = w.key; j !== null; ) {
                if (j.key === le)
                  if (
                    j.tag === 4 &&
                    j.stateNode.containerInfo === w.containerInfo &&
                    j.stateNode.implementation === w.implementation
                  ) {
                    (a(T, j.sibling), ($ = c(j, w.children || [])), ($.return = T), (T = $));
                    break e;
                  } else {
                    a(T, j);
                    break;
                  }
                else t(T, j);
                j = j.sibling;
              }
              (($ = Xo(w, T.mode, $)), ($.return = T), (T = $));
            }
            return h(T);
          case Re:
            return ((w = fl(w)), Ve(T, j, w, $));
        }
        if (ot(w)) return I(T, j, w, $);
        if (at(w)) {
          if (((le = at(w)), typeof le != 'function')) throw Error(o(150));
          return ((w = le.call(w)), oe(T, j, w, $));
        }
        if (typeof w.then == 'function') return Ve(T, j, cs(w), $);
        if (w.$$typeof === se) return Ve(T, j, as(T, w), $);
        ss(T, w);
      }
      return (typeof w == 'string' && w !== '') || typeof w == 'number' || typeof w == 'bigint'
        ? ((w = '' + w),
          j !== null && j.tag === 6
            ? (a(T, j.sibling), ($ = c(j, w)), ($.return = T), (T = $))
            : (a(T, j), ($ = Zo(w, T.mode, $)), ($.return = T), (T = $)),
          h(T))
        : a(T, j);
    }
    return function (T, j, w, $) {
      try {
        Zi = 0;
        var le = Ve(T, j, w, $);
        return ((Il = null), le);
      } catch (te) {
        if (te === Fl || te === ls) throw te;
        var Ne = Qt(29, te, null, T.mode);
        return ((Ne.lanes = $), (Ne.return = T), Ne);
      } finally {
      }
    };
  }
  var ml = gd(!0),
    vd = gd(!1),
    Sn = !1;
  function lr(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ir(e, t) {
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
  function xn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function jn(e, t, a) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Ce & 2) !== 0)) {
      var c = n.pending;
      return (
        c === null ? (t.next = t) : ((t.next = c.next), (c.next = t)),
        (n.pending = t),
        (t = Ic(e)),
        td(e, null, a),
        t
      );
    }
    return (Fc(e, n, t, a), Ic(e));
  }
  function Ki(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), we(e, a));
    }
  }
  function cr(e, t) {
    var a = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var c = null,
        r = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var h = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (r === null ? (c = r = h) : (r = r.next = h), (a = a.next));
        } while (a !== null);
        r === null ? (c = r = t) : (r = r.next = t);
      } else c = r = t;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: r,
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
  var sr = !1;
  function Qi() {
    if (sr) {
      var e = Jl;
      if (e !== null) throw e;
    }
  }
  function Wi(e, t, a, n) {
    sr = !1;
    var c = e.updateQueue;
    Sn = !1;
    var r = c.firstBaseUpdate,
      h = c.lastBaseUpdate,
      v = c.shared.pending;
    if (v !== null) {
      c.shared.pending = null;
      var S = v,
        N = S.next;
      ((S.next = null), h === null ? (r = N) : (h.next = N), (h = S));
      var B = e.alternate;
      B !== null &&
        ((B = B.updateQueue),
        (v = B.lastBaseUpdate),
        v !== h && (v === null ? (B.firstBaseUpdate = N) : (v.next = N), (B.lastBaseUpdate = S)));
    }
    if (r !== null) {
      var H = c.baseState;
      ((h = 0), (B = N = S = null), (v = r));
      do {
        var z = v.lane & -536870913,
          R = z !== v.lane;
        if (R ? (Se & z) === z : (n & z) === z) {
          (z !== 0 && z === Wl && (sr = !0),
            B !== null &&
              (B = B.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          e: {
            var I = e,
              oe = v;
            z = t;
            var Ve = a;
            switch (oe.tag) {
              case 1:
                if (((I = oe.payload), typeof I == 'function')) {
                  H = I.call(Ve, H, z);
                  break e;
                }
                H = I;
                break e;
              case 3:
                I.flags = (I.flags & -65537) | 128;
              case 0:
                if (
                  ((I = oe.payload), (z = typeof I == 'function' ? I.call(Ve, H, z) : I), z == null)
                )
                  break e;
                H = b({}, H, z);
                break e;
              case 2:
                Sn = !0;
            }
          }
          ((z = v.callback),
            z !== null &&
              ((e.flags |= 64),
              R && (e.flags |= 8192),
              (R = c.callbacks),
              R === null ? (c.callbacks = [z]) : R.push(z)));
        } else
          ((R = { lane: z, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            B === null ? ((N = B = R), (S = H)) : (B = B.next = R),
            (h |= z));
        if (((v = v.next), v === null)) {
          if (((v = c.shared.pending), v === null)) break;
          ((R = v),
            (v = R.next),
            (R.next = null),
            (c.lastBaseUpdate = R),
            (c.shared.pending = null));
        }
      } while (!0);
      (B === null && (S = H),
        (c.baseState = S),
        (c.firstBaseUpdate = N),
        (c.lastBaseUpdate = B),
        r === null && (c.shared.lanes = 0),
        (wn |= h),
        (e.lanes = h),
        (e.memoizedState = H));
    }
  }
  function _d(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function bd(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) _d(a[e], t);
  }
  var Pl = x(null),
    os = x(0);
  function Sd(e, t) {
    ((e = ln), X(os, e), X(Pl, t), (ln = e | t.baseLanes));
  }
  function or() {
    (X(os, ln), X(Pl, Pl.current));
  }
  function rr() {
    ((ln = os.current), k(Pl), k(os));
  }
  var Wt = x(null),
    da = null;
  function An(e) {
    var t = e.alternate;
    (X(ct, ct.current & 1),
      X(Wt, e),
      da === null && (t === null || Pl.current !== null || t.memoizedState !== null) && (da = e));
  }
  function ur(e) {
    (X(ct, ct.current), X(Wt, e), da === null && (da = e));
  }
  function xd(e) {
    e.tag === 22 ? (X(ct, ct.current), X(Wt, e), da === null && (da = e)) : Tn();
  }
  function Tn() {
    (X(ct, ct.current), X(Wt, Wt.current));
  }
  function Jt(e) {
    (k(Wt), da === e && (da = null), k(ct));
  }
  var ct = x(0);
  function rs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || yu(a) || gu(a))) return t;
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
  var Ja = 0,
    fe = null,
    Ue = null,
    ft = null,
    us = !1,
    ei = !1,
    hl = !1,
    fs = 0,
    Ji = 0,
    ti = null,
    Xp = 0;
  function nt() {
    throw Error(o(321));
  }
  function fr(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!Kt(e[a], t[a])) return !1;
    return !0;
  }
  function dr(e, t, a, n, c, r) {
    return (
      (Ja = r),
      (fe = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (D.H = e === null || e.memoizedState === null ? im : Er),
      (hl = !1),
      (r = a(n, c)),
      (hl = !1),
      ei && (r = Ad(t, a, n, c)),
      jd(e),
      r
    );
  }
  function jd(e) {
    D.H = Pi;
    var t = Ue !== null && Ue.next !== null;
    if (((Ja = 0), (ft = Ue = fe = null), (us = !1), (Ji = 0), (ti = null), t)) throw Error(o(300));
    e === null || dt || ((e = e.dependencies), e !== null && ts(e) && (dt = !0));
  }
  function Ad(e, t, a, n) {
    fe = e;
    var c = 0;
    do {
      if ((ei && (ti = null), (Ji = 0), (ei = !1), 25 <= c)) throw Error(o(301));
      if (((c += 1), (ft = Ue = null), e.updateQueue != null)) {
        var r = e.updateQueue;
        ((r.lastEffect = null),
          (r.events = null),
          (r.stores = null),
          r.memoCache != null && (r.memoCache.index = 0));
      }
      ((D.H = cm), (r = t(a, n)));
    } while (ei);
    return r;
  }
  function Kp() {
    var e = D.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? Fi(t) : t),
      (e = e.useState()[0]),
      (Ue !== null ? Ue.memoizedState : null) !== e && (fe.flags |= 1024),
      t
    );
  }
  function mr() {
    var e = fs !== 0;
    return ((fs = 0), e);
  }
  function hr(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function pr(e) {
    if (us) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      us = !1;
    }
    ((Ja = 0), (ft = Ue = fe = null), (ei = !1), (Ji = fs = 0), (ti = null));
  }
  function Ht() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (ft === null ? (fe.memoizedState = ft = e) : (ft = ft.next = e), ft);
  }
  function st() {
    if (Ue === null) {
      var e = fe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ue.next;
    var t = ft === null ? fe.memoizedState : ft.next;
    if (t !== null) ((ft = t), (Ue = e));
    else {
      if (e === null) throw fe.alternate === null ? Error(o(467)) : Error(o(310));
      ((Ue = e),
        (e = {
          memoizedState: Ue.memoizedState,
          baseState: Ue.baseState,
          baseQueue: Ue.baseQueue,
          queue: Ue.queue,
          next: null,
        }),
        ft === null ? (fe.memoizedState = ft = e) : (ft = ft.next = e));
    }
    return ft;
  }
  function ds() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Fi(e) {
    var t = Ji;
    return (
      (Ji += 1),
      ti === null && (ti = []),
      (e = hd(ti, e, t)),
      (t = fe),
      (ft === null ? t.memoizedState : ft.next) === null &&
        ((t = t.alternate), (D.H = t === null || t.memoizedState === null ? im : Er)),
      e
    );
  }
  function ms(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return Fi(e);
      if (e.$$typeof === se) return wt(e);
    }
    throw Error(o(438, String(e)));
  }
  function yr(e) {
    var t = null,
      a = fe.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var n = fe.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (t = {
              data: n.data.map(function (c) {
                return c.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = ds()), (fe.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = et;
    return (t.index++, a);
  }
  function Fa(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function hs(e) {
    var t = st();
    return gr(t, Ue, e);
  }
  function gr(e, t, a) {
    var n = e.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = a;
    var c = e.baseQueue,
      r = n.pending;
    if (r !== null) {
      if (c !== null) {
        var h = c.next;
        ((c.next = r.next), (r.next = h));
      }
      ((t.baseQueue = c = r), (n.pending = null));
    }
    if (((r = e.baseState), c === null)) e.memoizedState = r;
    else {
      t = c.next;
      var v = (h = null),
        S = null,
        N = t,
        B = !1;
      do {
        var H = N.lane & -536870913;
        if (H !== N.lane ? (Se & H) === H : (Ja & H) === H) {
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
              H === Wl && (B = !0));
          else if ((Ja & z) === z) {
            ((N = N.next), z === Wl && (B = !0));
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
              S === null ? ((v = S = H), (h = r)) : (S = S.next = H),
              (fe.lanes |= z),
              (wn |= z));
          ((H = N.action), hl && a(r, H), (r = N.hasEagerState ? N.eagerState : a(r, H)));
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
            S === null ? ((v = S = z), (h = r)) : (S = S.next = z),
            (fe.lanes |= H),
            (wn |= H));
        N = N.next;
      } while (N !== null && N !== t);
      if (
        (S === null ? (h = r) : (S.next = v),
        !Kt(r, e.memoizedState) && ((dt = !0), B && ((a = Jl), a !== null)))
      )
        throw a;
      ((e.memoizedState = r), (e.baseState = h), (e.baseQueue = S), (n.lastRenderedState = r));
    }
    return (c === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function vr(e) {
    var t = st(),
      a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var n = a.dispatch,
      c = a.pending,
      r = t.memoizedState;
    if (c !== null) {
      a.pending = null;
      var h = (c = c.next);
      do ((r = e(r, h.action)), (h = h.next));
      while (h !== c);
      (Kt(r, t.memoizedState) || (dt = !0),
        (t.memoizedState = r),
        t.baseQueue === null && (t.baseState = r),
        (a.lastRenderedState = r));
    }
    return [r, n];
  }
  function Td(e, t, a) {
    var n = fe,
      c = st(),
      r = Ae;
    if (r) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var h = !Kt((Ue || c).memoizedState, a);
    if (
      (h && ((c.memoizedState = a), (dt = !0)),
      (c = c.queue),
      Sr(wd.bind(null, n, c, e), [e]),
      c.getSnapshot !== t || h || (ft !== null && ft.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ai(9, { destroy: void 0 }, Ed.bind(null, n, c, a, t), null),
        Ge === null)
      )
        throw Error(o(349));
      r || (Ja & 127) !== 0 || Md(n, t, a);
    }
    return a;
  }
  function Md(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = fe.updateQueue),
      t === null
        ? ((t = ds()), (fe.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function Ed(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), Nd(t) && zd(e));
  }
  function wd(e, t, a) {
    return a(function () {
      Nd(t) && zd(e);
    });
  }
  function Nd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Kt(e, a);
    } catch {
      return !0;
    }
  }
  function zd(e) {
    var t = il(e, 2);
    t !== null && Xt(t, e, 2);
  }
  function _r(e) {
    var t = Ht();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), hl)) {
        bt(!0);
        try {
          a();
        } finally {
          bt(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fa,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Cd(e, t, a, n) {
    return ((e.baseState = a), gr(e, Ue, typeof n == 'function' ? n : Fa));
  }
  function Qp(e, t, a, n, c) {
    if (gs(e)) throw Error(o(485));
    if (((e = t.action), e !== null)) {
      var r = {
        payload: c,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (h) {
          r.listeners.push(h);
        },
      };
      (D.T !== null ? a(!0) : (r.isTransition = !1),
        n(r),
        (a = t.pending),
        a === null
          ? ((r.next = t.pending = r), Rd(t, r))
          : ((r.next = a.next), (t.pending = a.next = r)));
    }
  }
  function Rd(e, t) {
    var a = t.action,
      n = t.payload,
      c = e.state;
    if (t.isTransition) {
      var r = D.T,
        h = {};
      D.T = h;
      try {
        var v = a(c, n),
          S = D.S;
        (S !== null && S(h, v), Od(e, t, v));
      } catch (N) {
        br(e, t, N);
      } finally {
        (r !== null && h.types !== null && (r.types = h.types), (D.T = r));
      }
    } else
      try {
        ((r = a(c, n)), Od(e, t, r));
      } catch (N) {
        br(e, t, N);
      }
  }
  function Od(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            Dd(e, t, n);
          },
          function (n) {
            return br(e, t, n);
          }
        )
      : Dd(e, t, a);
  }
  function Dd(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      Bd(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), Rd(e, a))));
  }
  function br(e, t, a) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = a), Bd(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function Bd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Ld(e, t) {
    return t;
  }
  function $d(e, t) {
    if (Ae) {
      var a = Ge.formState;
      if (a !== null) {
        e: {
          var n = fe;
          if (Ae) {
            if (Je) {
              t: {
                for (var c = Je, r = fa; c.nodeType !== 8; ) {
                  if (!r) {
                    c = null;
                    break t;
                  }
                  if (((c = ma(c.nextSibling)), c === null)) {
                    c = null;
                    break t;
                  }
                }
                ((r = c.data), (c = r === 'F!' || r === 'F' ? c : null));
              }
              if (c) {
                ((Je = ma(c.nextSibling)), (n = c.data === 'F!'));
                break e;
              }
            }
            _n(n);
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
        lastRenderedReducer: Ld,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = am.bind(null, fe, n)),
      (n.dispatch = a),
      (n = _r(!1)),
      (r = Mr.bind(null, fe, !1, n.queue)),
      (n = Ht()),
      (c = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = c),
      (a = Qp.bind(null, fe, c, r, a)),
      (c.dispatch = a),
      (n.memoizedState = e),
      [t, a, !1]
    );
  }
  function kd(e) {
    var t = st();
    return Hd(t, Ue, e);
  }
  function Hd(e, t, a) {
    if (
      ((t = gr(e, t, Ld)[0]),
      (e = hs(Fa)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = Fi(t);
      } catch (h) {
        throw h === Fl ? ls : h;
      }
    else n = t;
    t = st();
    var c = t.queue,
      r = c.dispatch;
    return (
      a !== t.memoizedState &&
        ((fe.flags |= 2048), ai(9, { destroy: void 0 }, Wp.bind(null, c, a), null)),
      [n, r, e]
    );
  }
  function Wp(e, t) {
    e.action = t;
  }
  function Ud(e) {
    var t = st(),
      a = Ue;
    if (a !== null) return Hd(t, a, e);
    (st(), (t = t.memoizedState), (a = st()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = e), [t, n, !1]);
  }
  function ai(e, t, a, n) {
    return (
      (e = { tag: e, create: a, deps: n, inst: t, next: null }),
      (t = fe.updateQueue),
      t === null && ((t = ds()), (fe.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((n = a.next), (a.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function qd() {
    return st().memoizedState;
  }
  function ps(e, t, a, n) {
    var c = Ht();
    ((fe.flags |= e),
      (c.memoizedState = ai(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function ys(e, t, a, n) {
    var c = st();
    n = n === void 0 ? null : n;
    var r = c.memoizedState.inst;
    Ue !== null && n !== null && fr(n, Ue.memoizedState.deps)
      ? (c.memoizedState = ai(t, r, a, n))
      : ((fe.flags |= e), (c.memoizedState = ai(1 | t, r, a, n)));
  }
  function Vd(e, t) {
    ps(8390656, 8, e, t);
  }
  function Sr(e, t) {
    ys(2048, 8, e, t);
  }
  function Jp(e) {
    fe.flags |= 4;
    var t = fe.updateQueue;
    if (t === null) ((t = ds()), (fe.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function Gd(e) {
    var t = st().memoizedState;
    return (
      Jp({ ref: t, nextImpl: e }),
      function () {
        if ((Ce & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Yd(e, t) {
    return ys(4, 2, e, t);
  }
  function Zd(e, t) {
    return ys(4, 4, e, t);
  }
  function Xd(e, t) {
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
  function Kd(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), ys(4, 4, Xd.bind(null, t, e), a));
  }
  function xr() {}
  function Qd(e, t) {
    var a = st();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    return t !== null && fr(t, n[1]) ? n[0] : ((a.memoizedState = [e, t]), e);
  }
  function Wd(e, t) {
    var a = st();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    if (t !== null && fr(t, n[1])) return n[0];
    if (((n = e()), hl)) {
      bt(!0);
      try {
        e();
      } finally {
        bt(!1);
      }
    }
    return ((a.memoizedState = [n, t]), n);
  }
  function jr(e, t, a) {
    return a === void 0 || ((Ja & 1073741824) !== 0 && (Se & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = Jm()), (fe.lanes |= e), (wn |= e), a);
  }
  function Jd(e, t, a, n) {
    return Kt(a, t)
      ? a
      : Pl.current !== null
        ? ((e = jr(e, a, n)), Kt(e, t) || (dt = !0), e)
        : (Ja & 42) === 0 || ((Ja & 1073741824) !== 0 && (Se & 261930) === 0)
          ? ((dt = !0), (e.memoizedState = a))
          : ((e = Jm()), (fe.lanes |= e), (wn |= e), t);
  }
  function Fd(e, t, a, n, c) {
    var r = Z.p;
    Z.p = r !== 0 && 8 > r ? r : 8;
    var h = D.T,
      v = {};
    ((D.T = v), Mr(e, !1, t, a));
    try {
      var S = c(),
        N = D.S;
      if (
        (N !== null && N(v, S), S !== null && typeof S == 'object' && typeof S.then == 'function')
      ) {
        var B = Zp(S, n);
        Ii(e, t, B, Pt(e));
      } else Ii(e, t, n, Pt(e));
    } catch (H) {
      Ii(e, t, { then: function () {}, status: 'rejected', reason: H }, Pt());
    } finally {
      ((Z.p = r), h !== null && v.types !== null && (h.types = v.types), (D.T = h));
    }
  }
  function Fp() {}
  function Ar(e, t, a, n) {
    if (e.tag !== 5) throw Error(o(476));
    var c = Id(e).queue;
    Fd(
      e,
      c,
      t,
      ie,
      a === null
        ? Fp
        : function () {
            return (Pd(e), a(n));
          }
    );
  }
  function Id(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ie,
      baseState: ie,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fa,
        lastRenderedState: ie,
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
          lastRenderedReducer: Fa,
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
  function Pd(e) {
    var t = Id(e);
    (t.next === null && (t = e.alternate.memoizedState), Ii(e, t.next.queue, {}, Pt()));
  }
  function Tr() {
    return wt(pc);
  }
  function em() {
    return st().memoizedState;
  }
  function tm() {
    return st().memoizedState;
  }
  function Ip(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Pt();
          e = xn(a);
          var n = jn(t, e, a);
          (n !== null && (Xt(n, t, a), Ki(n, t, a)), (t = { cache: er() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Pp(e, t, a) {
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
      gs(e) ? nm(t, a) : ((a = Go(e, t, a, n)), a !== null && (Xt(a, e, n), lm(a, t, n))));
  }
  function am(e, t, a) {
    var n = Pt();
    Ii(e, t, a, n);
  }
  function Ii(e, t, a, n) {
    var c = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (gs(e)) nm(t, c);
    else {
      var r = e.alternate;
      if (
        e.lanes === 0 &&
        (r === null || r.lanes === 0) &&
        ((r = t.lastRenderedReducer), r !== null)
      )
        try {
          var h = t.lastRenderedState,
            v = r(h, a);
          if (((c.hasEagerState = !0), (c.eagerState = v), Kt(v, h)))
            return (Fc(e, t, c, 0), Ge === null && Jc(), !1);
        } catch {
        } finally {
        }
      if (((a = Go(e, t, c, n)), a !== null)) return (Xt(a, e, n), lm(a, t, n), !0);
    }
    return !1;
  }
  function Mr(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: lu(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      gs(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = Go(e, a, n, 2)), t !== null && Xt(t, e, 2));
  }
  function gs(e) {
    var t = e.alternate;
    return e === fe || (t !== null && t === fe);
  }
  function nm(e, t) {
    ei = us = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function lm(e, t, a) {
    if ((a & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), we(e, a));
    }
  }
  var Pi = {
    readContext: wt,
    use: ms,
    useCallback: nt,
    useContext: nt,
    useEffect: nt,
    useImperativeHandle: nt,
    useLayoutEffect: nt,
    useInsertionEffect: nt,
    useMemo: nt,
    useReducer: nt,
    useRef: nt,
    useState: nt,
    useDebugValue: nt,
    useDeferredValue: nt,
    useTransition: nt,
    useSyncExternalStore: nt,
    useId: nt,
    useHostTransitionStatus: nt,
    useFormState: nt,
    useActionState: nt,
    useOptimistic: nt,
    useMemoCache: nt,
    useCacheRefresh: nt,
  };
  Pi.useEffectEvent = nt;
  var im = {
      readContext: wt,
      use: ms,
      useCallback: function (e, t) {
        return ((Ht().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: wt,
      useEffect: Vd,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), ps(4194308, 4, Xd.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return ps(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        ps(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = Ht();
        t = t === void 0 ? null : t;
        var n = e();
        if (hl) {
          bt(!0);
          try {
            e();
          } finally {
            bt(!1);
          }
        }
        return ((a.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, a) {
        var n = Ht();
        if (a !== void 0) {
          var c = a(t);
          if (hl) {
            bt(!0);
            try {
              a(t);
            } finally {
              bt(!1);
            }
          }
        } else c = t;
        return (
          (n.memoizedState = n.baseState = c),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: c,
          }),
          (n.queue = e),
          (e = e.dispatch = Pp.bind(null, fe, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Ht();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = _r(e);
        var t = e.queue,
          a = am.bind(null, fe, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: xr,
      useDeferredValue: function (e, t) {
        var a = Ht();
        return jr(a, e, t);
      },
      useTransition: function () {
        var e = _r(!1);
        return ((e = Fd.bind(null, fe, e.queue, !0, !1)), (Ht().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = fe,
          c = Ht();
        if (Ae) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = t()), Ge === null)) throw Error(o(349));
          (Se & 127) !== 0 || Md(n, t, a);
        }
        c.memoizedState = a;
        var r = { value: a, getSnapshot: t };
        return (
          (c.queue = r),
          Vd(wd.bind(null, n, r, e), [e]),
          (n.flags |= 2048),
          ai(9, { destroy: void 0 }, Ed.bind(null, n, r, a, t), null),
          a
        );
      },
      useId: function () {
        var e = Ht(),
          t = Ge.identifierPrefix;
        if (Ae) {
          var a = Oa,
            n = Ra;
          ((a = (n & ~(1 << (32 - St(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = fs++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = Xp++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Tr,
      useFormState: $d,
      useActionState: $d,
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
        return ((t.queue = a), (t = Mr.bind(null, fe, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: yr,
      useCacheRefresh: function () {
        return (Ht().memoizedState = Ip.bind(null, fe));
      },
      useEffectEvent: function (e) {
        var t = Ht(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((Ce & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Er = {
      readContext: wt,
      use: ms,
      useCallback: Qd,
      useContext: wt,
      useEffect: Sr,
      useImperativeHandle: Kd,
      useInsertionEffect: Yd,
      useLayoutEffect: Zd,
      useMemo: Wd,
      useReducer: hs,
      useRef: qd,
      useState: function () {
        return hs(Fa);
      },
      useDebugValue: xr,
      useDeferredValue: function (e, t) {
        var a = st();
        return Jd(a, Ue.memoizedState, e, t);
      },
      useTransition: function () {
        var e = hs(Fa)[0],
          t = st().memoizedState;
        return [typeof e == 'boolean' ? e : Fi(e), t];
      },
      useSyncExternalStore: Td,
      useId: em,
      useHostTransitionStatus: Tr,
      useFormState: kd,
      useActionState: kd,
      useOptimistic: function (e, t) {
        var a = st();
        return Cd(a, Ue, e, t);
      },
      useMemoCache: yr,
      useCacheRefresh: tm,
    };
  Er.useEffectEvent = Gd;
  var cm = {
    readContext: wt,
    use: ms,
    useCallback: Qd,
    useContext: wt,
    useEffect: Sr,
    useImperativeHandle: Kd,
    useInsertionEffect: Yd,
    useLayoutEffect: Zd,
    useMemo: Wd,
    useReducer: vr,
    useRef: qd,
    useState: function () {
      return vr(Fa);
    },
    useDebugValue: xr,
    useDeferredValue: function (e, t) {
      var a = st();
      return Ue === null ? jr(a, e, t) : Jd(a, Ue.memoizedState, e, t);
    },
    useTransition: function () {
      var e = vr(Fa)[0],
        t = st().memoizedState;
      return [typeof e == 'boolean' ? e : Fi(e), t];
    },
    useSyncExternalStore: Td,
    useId: em,
    useHostTransitionStatus: Tr,
    useFormState: Ud,
    useActionState: Ud,
    useOptimistic: function (e, t) {
      var a = st();
      return Ue !== null ? Cd(a, Ue, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: yr,
    useCacheRefresh: tm,
  };
  cm.useEffectEvent = Gd;
  function wr(e, t, a, n) {
    ((t = e.memoizedState),
      (a = a(n, t)),
      (a = a == null ? t : b({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var Nr = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var n = Pt(),
        c = xn(n);
      ((c.payload = t),
        a != null && (c.callback = a),
        (t = jn(e, c, n)),
        t !== null && (Xt(t, e, n), Ki(t, e, n)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var n = Pt(),
        c = xn(n);
      ((c.tag = 1),
        (c.payload = t),
        a != null && (c.callback = a),
        (t = jn(e, c, n)),
        t !== null && (Xt(t, e, n), Ki(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Pt(),
        n = xn(a);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = jn(e, n, a)),
        t !== null && (Xt(t, e, a), Ki(t, e, a)));
    },
  };
  function sm(e, t, a, n, c, r, h) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, r, h)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Hi(a, n) || !Hi(c, r)
          : !0
    );
  }
  function om(e, t, a, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, n),
      t.state !== e && Nr.enqueueReplaceState(t, t.state, null));
  }
  function pl(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var n in t) n !== 'ref' && (a[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = b({}, a));
      for (var c in e) a[c] === void 0 && (a[c] = e[c]);
    }
    return a;
  }
  function rm(e) {
    Wc(e);
  }
  function um(e) {
    console.error(e);
  }
  function fm(e) {
    Wc(e);
  }
  function vs(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function dm(e, t, a) {
    try {
      var n = e.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (c) {
      setTimeout(function () {
        throw c;
      });
    }
  }
  function zr(e, t, a) {
    return (
      (a = xn(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        vs(e, t);
      }),
      a
    );
  }
  function mm(e) {
    return ((e = xn(e)), (e.tag = 3), e);
  }
  function hm(e, t, a, n) {
    var c = a.type.getDerivedStateFromError;
    if (typeof c == 'function') {
      var r = n.value;
      ((e.payload = function () {
        return c(r);
      }),
        (e.callback = function () {
          dm(t, a, n);
        }));
    }
    var h = a.stateNode;
    h !== null &&
      typeof h.componentDidCatch == 'function' &&
      (e.callback = function () {
        (dm(t, a, n),
          typeof c != 'function' && (Nn === null ? (Nn = new Set([this])) : Nn.add(this)));
        var v = n.stack;
        this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' });
      });
  }
  function ey(e, t, a, n, c) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && Ql(t, a, c, !0), (a = Wt.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              da === null ? zs() : a.alternate === null && lt === 0 && (lt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = c),
              n === is
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  tu(e, n, c)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === is
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  tu(e, n, c)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (tu(e, n, c), zs(), !1);
    }
    if (Ae)
      return (
        (t = Wt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = c),
            n !== Wo && ((e = Error(o(422), { cause: n })), Vi(oa(e, a))))
          : (n !== Wo && ((t = Error(o(423), { cause: n })), Vi(oa(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (c &= -c),
            (e.lanes |= c),
            (n = oa(n, a)),
            (c = zr(e.stateNode, n, c)),
            cr(e, c),
            lt !== 4 && (lt = 2)),
        !1
      );
    var r = Error(o(520), { cause: n });
    if (((r = oa(r, a)), sc === null ? (sc = [r]) : sc.push(r), lt !== 4 && (lt = 2), t === null))
      return !0;
    ((n = oa(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = c & -c),
            (a.lanes |= e),
            (e = zr(a.stateNode, n, e)),
            cr(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (r = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (r !== null &&
                  typeof r.componentDidCatch == 'function' &&
                  (Nn === null || !Nn.has(r)))))
          )
            return (
              (a.flags |= 65536),
              (c &= -c),
              (a.lanes |= c),
              (c = mm(c)),
              hm(c, e, a, n),
              cr(a, c),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Cr = Error(o(461)),
    dt = !1;
  function Nt(e, t, a, n) {
    t.child = e === null ? vd(t, null, a, n) : ml(t, e.child, a, n);
  }
  function pm(e, t, a, n, c) {
    a = a.render;
    var r = t.ref;
    if ('ref' in n) {
      var h = {};
      for (var v in n) v !== 'ref' && (h[v] = n[v]);
    } else h = n;
    return (
      rl(t),
      (n = dr(e, t, a, h, r, c)),
      (v = mr()),
      e !== null && !dt
        ? (hr(e, t, c), Ia(e, t, c))
        : (Ae && v && Ko(t), (t.flags |= 1), Nt(e, t, n, c), t.child)
    );
  }
  function ym(e, t, a, n, c) {
    if (e === null) {
      var r = a.type;
      return typeof r == 'function' && !Yo(r) && r.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = r), gm(e, t, r, n, c))
        : ((e = Pc(a.type, null, n, t, t.mode, c)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((r = e.child), !Hr(e, c))) {
      var h = r.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Hi), a(h, n) && e.ref === t.ref))
        return Ia(e, t, c);
    }
    return ((t.flags |= 1), (e = Xa(r, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function gm(e, t, a, n, c) {
    if (e !== null) {
      var r = e.memoizedProps;
      if (Hi(r, n) && e.ref === t.ref)
        if (((dt = !1), (t.pendingProps = n = r), Hr(e, c))) (e.flags & 131072) !== 0 && (dt = !0);
        else return ((t.lanes = e.lanes), Ia(e, t, c));
    }
    return Rr(e, t, a, n, c);
  }
  function vm(e, t, a, n) {
    var c = n.children,
      r = e !== null ? e.memoizedState : null;
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
        if (((r = r !== null ? r.baseLanes | a : a), e !== null)) {
          for (n = t.child = e.child, c = 0; n !== null; )
            ((c = c | n.lanes | n.childLanes), (n = n.sibling));
          n = c & ~r;
        } else ((n = 0), (t.child = null));
        return _m(e, t, r, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && ns(t, r !== null ? r.cachePool : null),
          r !== null ? Sd(t, r) : or(),
          xd(t));
      else return ((n = t.lanes = 536870912), _m(e, t, r !== null ? r.baseLanes | a : a, a, n));
    } else
      r !== null
        ? (ns(t, r.cachePool), Sd(t, r), Tn(), (t.memoizedState = null))
        : (e !== null && ns(t, null), or(), Tn());
    return (Nt(e, t, c, a), t.child);
  }
  function ec(e, t) {
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
  function _m(e, t, a, n, c) {
    var r = ar();
    return (
      (r = r === null ? null : { parent: ut._currentValue, pool: r }),
      (t.memoizedState = { baseLanes: a, cachePool: r }),
      e !== null && ns(t, null),
      or(),
      xd(t),
      e !== null && Ql(e, t, n, !0),
      (t.childLanes = c),
      null
    );
  }
  function _s(e, t) {
    return (
      (t = Ss({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function bm(e, t, a) {
    return (
      ml(t, e.child, null, a),
      (e = _s(t, t.pendingProps)),
      (e.flags |= 2),
      Jt(t),
      (t.memoizedState = null),
      e
    );
  }
  function ty(e, t, a) {
    var n = t.pendingProps,
      c = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ae) {
        if (n.mode === 'hidden') return ((e = _s(t, n)), (t.lanes = 536870912), ec(null, e));
        if (
          (ur(t),
          (e = Je)
            ? ((e = Rh(e, fa)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: gn !== null ? { id: Ra, overflow: Oa } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = nd(e)),
                (a.return = t),
                (t.child = a),
                (Et = t),
                (Je = null)))
            : (e = null),
          e === null)
        )
          throw _n(t);
        return ((t.lanes = 536870912), null);
      }
      return _s(t, n);
    }
    var r = e.memoizedState;
    if (r !== null) {
      var h = r.dehydrated;
      if ((ur(t), c))
        if (t.flags & 256) ((t.flags &= -257), (t = bm(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if ((dt || Ql(e, t, a, !1), (c = (a & e.childLanes) !== 0), dt || c)) {
        if (((n = Ge), n !== null && ((h = We(n, a)), h !== 0 && h !== r.retryLane)))
          throw ((r.retryLane = h), il(e, h), Xt(n, e, h), Cr);
        (zs(), (t = bm(e, t, a)));
      } else
        ((e = r.treeContext),
          (Je = ma(h.nextSibling)),
          (Et = t),
          (Ae = !0),
          (vn = null),
          (fa = !1),
          e !== null && cd(t, e),
          (t = _s(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = Xa(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function bs(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Rr(e, t, a, n, c) {
    return (
      rl(t),
      (a = dr(e, t, a, n, void 0, c)),
      (n = mr()),
      e !== null && !dt
        ? (hr(e, t, c), Ia(e, t, c))
        : (Ae && n && Ko(t), (t.flags |= 1), Nt(e, t, a, c), t.child)
    );
  }
  function Sm(e, t, a, n, c, r) {
    return (
      rl(t),
      (t.updateQueue = null),
      (a = Ad(t, n, a, c)),
      jd(e),
      (n = mr()),
      e !== null && !dt
        ? (hr(e, t, r), Ia(e, t, r))
        : (Ae && n && Ko(t), (t.flags |= 1), Nt(e, t, a, r), t.child)
    );
  }
  function xm(e, t, a, n, c) {
    if ((rl(t), t.stateNode === null)) {
      var r = Yl,
        h = a.contextType;
      (typeof h == 'object' && h !== null && (r = wt(h)),
        (r = new a(n, r)),
        (t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null),
        (r.updater = Nr),
        (t.stateNode = r),
        (r._reactInternals = t),
        (r = t.stateNode),
        (r.props = n),
        (r.state = t.memoizedState),
        (r.refs = {}),
        lr(t),
        (h = a.contextType),
        (r.context = typeof h == 'object' && h !== null ? wt(h) : Yl),
        (r.state = t.memoizedState),
        (h = a.getDerivedStateFromProps),
        typeof h == 'function' && (wr(t, a, h, n), (r.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof r.getSnapshotBeforeUpdate == 'function' ||
          (typeof r.UNSAFE_componentWillMount != 'function' &&
            typeof r.componentWillMount != 'function') ||
          ((h = r.state),
          typeof r.componentWillMount == 'function' && r.componentWillMount(),
          typeof r.UNSAFE_componentWillMount == 'function' && r.UNSAFE_componentWillMount(),
          h !== r.state && Nr.enqueueReplaceState(r, r.state, null),
          Wi(t, n, r, c),
          Qi(),
          (r.state = t.memoizedState)),
        typeof r.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      r = t.stateNode;
      var v = t.memoizedProps,
        S = pl(a, v);
      r.props = S;
      var N = r.context,
        B = a.contextType;
      ((h = Yl), typeof B == 'object' && B !== null && (h = wt(B)));
      var H = a.getDerivedStateFromProps;
      ((B = typeof H == 'function' || typeof r.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        B ||
          (typeof r.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof r.componentWillReceiveProps != 'function') ||
          ((v || N !== h) && om(t, r, n, h)),
        (Sn = !1));
      var z = t.memoizedState;
      ((r.state = z),
        Wi(t, n, r, c),
        Qi(),
        (N = t.memoizedState),
        v || z !== N || Sn
          ? (typeof H == 'function' && (wr(t, a, H, n), (N = t.memoizedState)),
            (S = Sn || sm(t, a, S, n, z, N, h))
              ? (B ||
                  (typeof r.UNSAFE_componentWillMount != 'function' &&
                    typeof r.componentWillMount != 'function') ||
                  (typeof r.componentWillMount == 'function' && r.componentWillMount(),
                  typeof r.UNSAFE_componentWillMount == 'function' &&
                    r.UNSAFE_componentWillMount()),
                typeof r.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof r.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = N)),
            (r.props = n),
            (r.state = N),
            (r.context = h),
            (n = S))
          : (typeof r.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((r = t.stateNode),
        ir(e, t),
        (h = t.memoizedProps),
        (B = pl(a, h)),
        (r.props = B),
        (H = t.pendingProps),
        (z = r.context),
        (N = a.contextType),
        (S = Yl),
        typeof N == 'object' && N !== null && (S = wt(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof r.getSnapshotBeforeUpdate == 'function') ||
          (typeof r.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof r.componentWillReceiveProps != 'function') ||
          ((h !== H || z !== S) && om(t, r, n, S)),
        (Sn = !1),
        (z = t.memoizedState),
        (r.state = z),
        Wi(t, n, r, c),
        Qi());
      var R = t.memoizedState;
      h !== H || z !== R || Sn || (e !== null && e.dependencies !== null && ts(e.dependencies))
        ? (typeof v == 'function' && (wr(t, a, v, n), (R = t.memoizedState)),
          (B =
            Sn ||
            sm(t, a, B, n, z, R, S) ||
            (e !== null && e.dependencies !== null && ts(e.dependencies)))
            ? (N ||
                (typeof r.UNSAFE_componentWillUpdate != 'function' &&
                  typeof r.componentWillUpdate != 'function') ||
                (typeof r.componentWillUpdate == 'function' && r.componentWillUpdate(n, R, S),
                typeof r.UNSAFE_componentWillUpdate == 'function' &&
                  r.UNSAFE_componentWillUpdate(n, R, S)),
              typeof r.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof r.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof r.componentDidUpdate != 'function' ||
                (h === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 4),
              typeof r.getSnapshotBeforeUpdate != 'function' ||
                (h === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = R)),
          (r.props = n),
          (r.state = R),
          (r.context = S),
          (n = B))
        : (typeof r.componentDidUpdate != 'function' ||
            (h === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 4),
          typeof r.getSnapshotBeforeUpdate != 'function' ||
            (h === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (r = n),
      bs(e, t),
      (n = (t.flags & 128) !== 0),
      r || n
        ? ((r = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : r.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = ml(t, e.child, null, c)), (t.child = ml(t, null, a, c)))
            : Nt(e, t, a, c),
          (t.memoizedState = r.state),
          (e = t.child))
        : (e = Ia(e, t, c)),
      e
    );
  }
  function jm(e, t, a, n) {
    return (sl(), (t.flags |= 256), Nt(e, t, a, n), t.child);
  }
  var Or = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Dr(e) {
    return { baseLanes: e, cachePool: dd() };
  }
  function Br(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= It), e);
  }
  function Am(e, t, a) {
    var n = t.pendingProps,
      c = !1,
      r = (t.flags & 128) !== 0,
      h;
    if (
      ((h = r) || (h = e !== null && e.memoizedState === null ? !1 : (ct.current & 2) !== 0),
      h && ((c = !0), (t.flags &= -129)),
      (h = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ae) {
        if (
          (c ? An(t) : Tn(),
          (e = Je)
            ? ((e = Rh(e, fa)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: gn !== null ? { id: Ra, overflow: Oa } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = nd(e)),
                (a.return = t),
                (t.child = a),
                (Et = t),
                (Je = null)))
            : (e = null),
          e === null)
        )
          throw _n(t);
        return (gu(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = n.children;
      return (
        (n = n.fallback),
        c
          ? (Tn(),
            (c = t.mode),
            (v = Ss({ mode: 'hidden', children: v }, c)),
            (n = cl(n, c, a, null)),
            (v.return = t),
            (n.return = t),
            (v.sibling = n),
            (t.child = v),
            (n = t.child),
            (n.memoizedState = Dr(a)),
            (n.childLanes = Br(e, h, a)),
            (t.memoizedState = Or),
            ec(null, n))
          : (An(t), Lr(t, v))
      );
    }
    var S = e.memoizedState;
    if (S !== null && ((v = S.dehydrated), v !== null)) {
      if (r)
        t.flags & 256
          ? (An(t), (t.flags &= -257), (t = $r(e, t, a)))
          : t.memoizedState !== null
            ? (Tn(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Tn(),
              (v = n.fallback),
              (c = t.mode),
              (n = Ss({ mode: 'visible', children: n.children }, c)),
              (v = cl(v, c, a, null)),
              (v.flags |= 2),
              (n.return = t),
              (v.return = t),
              (n.sibling = v),
              (t.child = n),
              ml(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = Dr(a)),
              (n.childLanes = Br(e, h, a)),
              (t.memoizedState = Or),
              (t = ec(null, n)));
      else if ((An(t), gu(v))) {
        if (((h = v.nextSibling && v.nextSibling.dataset), h)) var N = h.dgst;
        ((h = N),
          (n = Error(o(419))),
          (n.stack = ''),
          (n.digest = h),
          Vi({ value: n, source: null, stack: null }),
          (t = $r(e, t, a)));
      } else if ((dt || Ql(e, t, a, !1), (h = (a & e.childLanes) !== 0), dt || h)) {
        if (((h = Ge), h !== null && ((n = We(h, a)), n !== 0 && n !== S.retryLane)))
          throw ((S.retryLane = n), il(e, n), Xt(h, e, n), Cr);
        (yu(v) || zs(), (t = $r(e, t, a)));
      } else
        yu(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = S.treeContext),
            (Je = ma(v.nextSibling)),
            (Et = t),
            (Ae = !0),
            (vn = null),
            (fa = !1),
            e !== null && cd(t, e),
            (t = Lr(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return c
      ? (Tn(),
        (v = n.fallback),
        (c = t.mode),
        (S = e.child),
        (N = S.sibling),
        (n = Xa(S, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = S.subtreeFlags & 65011712),
        N !== null ? (v = Xa(N, v)) : ((v = cl(v, c, a, null)), (v.flags |= 2)),
        (v.return = t),
        (n.return = t),
        (n.sibling = v),
        (t.child = n),
        ec(null, n),
        (n = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = Dr(a))
          : ((c = v.cachePool),
            c !== null
              ? ((S = ut._currentValue), (c = c.parent !== S ? { parent: S, pool: S } : c))
              : (c = dd()),
            (v = { baseLanes: v.baseLanes | a, cachePool: c })),
        (n.memoizedState = v),
        (n.childLanes = Br(e, h, a)),
        (t.memoizedState = Or),
        ec(e.child, n))
      : (An(t),
        (a = e.child),
        (e = a.sibling),
        (a = Xa(a, { mode: 'visible', children: n.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((h = t.deletions), h === null ? ((t.deletions = [e]), (t.flags |= 16)) : h.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function Lr(e, t) {
    return ((t = Ss({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Ss(e, t) {
    return ((e = Qt(22, e, null, t)), (e.lanes = 0), e);
  }
  function $r(e, t, a) {
    return (
      ml(t, e.child, null, a),
      (e = Lr(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Tm(e, t, a) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), Io(e.return, t, a));
  }
  function kr(e, t, a, n, c, r) {
    var h = e.memoizedState;
    h === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: c,
          treeForkCount: r,
        })
      : ((h.isBackwards = t),
        (h.rendering = null),
        (h.renderingStartTime = 0),
        (h.last = n),
        (h.tail = a),
        (h.tailMode = c),
        (h.treeForkCount = r));
  }
  function Mm(e, t, a) {
    var n = t.pendingProps,
      c = n.revealOrder,
      r = n.tail;
    n = n.children;
    var h = ct.current,
      v = (h & 2) !== 0;
    if (
      (v ? ((h = (h & 1) | 2), (t.flags |= 128)) : (h &= 1),
      X(ct, h),
      Nt(e, t, n, a),
      (n = Ae ? qi : 0),
      !v && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Tm(e, a, t);
        else if (e.tag === 19) Tm(e, a, t);
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
    switch (c) {
      case 'forwards':
        for (a = t.child, c = null; a !== null; )
          ((e = a.alternate), e !== null && rs(e) === null && (c = a), (a = a.sibling));
        ((a = c),
          a === null ? ((c = t.child), (t.child = null)) : ((c = a.sibling), (a.sibling = null)),
          kr(t, !1, c, a, r, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, c = t.child, t.child = null; c !== null; ) {
          if (((e = c.alternate), e !== null && rs(e) === null)) {
            t.child = c;
            break;
          }
          ((e = c.sibling), (c.sibling = a), (a = c), (c = e));
        }
        kr(t, !0, a, null, r, n);
        break;
      case 'together':
        kr(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Ia(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (wn |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Ql(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = Xa(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = Xa(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function Hr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && ts(e)));
  }
  function ay(e, t, a) {
    switch (t.tag) {
      case 3:
        (pt(t, t.stateNode.containerInfo), bn(t, ut, e.memoizedState.cache), sl());
        break;
      case 27:
      case 5:
        $a(t);
        break;
      case 4:
        pt(t, t.stateNode.containerInfo);
        break;
      case 10:
        bn(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), ur(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (An(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? Am(e, t, a)
              : (An(t), (e = Ia(e, t, a)), e !== null ? e.sibling : null);
        An(t);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (
          ((n = (a & t.childLanes) !== 0),
          n || (Ql(e, t, a, !1), (n = (a & t.childLanes) !== 0)),
          c)
        ) {
          if (n) return Mm(e, t, a);
          t.flags |= 128;
        }
        if (
          ((c = t.memoizedState),
          c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
          X(ct, ct.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), vm(e, t, a, t.pendingProps));
      case 24:
        bn(t, ut, e.memoizedState.cache);
    }
    return Ia(e, t, a);
  }
  function Em(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) dt = !0;
      else {
        if (!Hr(e, a) && (t.flags & 128) === 0) return ((dt = !1), ay(e, t, a));
        dt = (e.flags & 131072) !== 0;
      }
    else ((dt = !1), Ae && (t.flags & 1048576) !== 0 && id(t, qi, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = fl(t.elementType)), (t.type = e), typeof e == 'function'))
            Yo(e)
              ? ((n = pl(e, n)), (t.tag = 1), (t = xm(null, t, e, n, a)))
              : ((t.tag = 0), (t = Rr(null, t, e, n, a)));
          else {
            if (e != null) {
              var c = e.$$typeof;
              if (c === C) {
                ((t.tag = 11), (t = pm(null, t, e, n, a)));
                break e;
              } else if (c === P) {
                ((t.tag = 14), (t = ym(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = Ut(e) || e), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return Rr(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (c = pl(n, t.pendingProps)), xm(e, t, n, c, a));
      case 3:
        e: {
          if ((pt(t, t.stateNode.containerInfo), e === null)) throw Error(o(387));
          n = t.pendingProps;
          var r = t.memoizedState;
          ((c = r.element), ir(e, t), Wi(t, n, null, a));
          var h = t.memoizedState;
          if (
            ((n = h.cache),
            bn(t, ut, n),
            n !== r.cache && Po(t, [ut], a, !0),
            Qi(),
            (n = h.element),
            r.isDehydrated)
          )
            if (
              ((r = { element: n, isDehydrated: !1, cache: h.cache }),
              (t.updateQueue.baseState = r),
              (t.memoizedState = r),
              t.flags & 256)
            ) {
              t = jm(e, t, n, a);
              break e;
            } else if (n !== c) {
              ((c = oa(Error(o(424)), t)), Vi(c), (t = jm(e, t, n, a)));
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
                Je = ma(e.firstChild),
                  Et = t,
                  Ae = !0,
                  vn = null,
                  fa = !0,
                  a = vd(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((sl(), n === c)) {
              t = Ia(e, t, a);
              break e;
            }
            Nt(e, t, n, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          bs(e, t),
          e === null
            ? (a = kh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : Ae ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = $s(me.current).createElement(a)),
                (n[tt] = t),
                (n[Mt] = e),
                zt(n, a, e),
                xt(n),
                (t.stateNode = n))
            : (t.memoizedState = kh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          $a(t),
          e === null &&
            Ae &&
            ((n = t.stateNode = Bh(t.type, t.pendingProps, me.current)),
            (Et = t),
            (fa = !0),
            (c = Je),
            On(t.type) ? ((vu = c), (Je = ma(n.firstChild))) : (Je = c)),
          Nt(e, t, t.pendingProps.children, a),
          bs(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ae &&
            ((c = n = Je) &&
              ((n = Ry(n, t.type, t.pendingProps, fa)),
              n !== null
                ? ((t.stateNode = n), (Et = t), (Je = ma(n.firstChild)), (fa = !1), (c = !0))
                : (c = !1)),
            c || _n(t)),
          $a(t),
          (c = t.type),
          (r = t.pendingProps),
          (h = e !== null ? e.memoizedProps : null),
          (n = r.children),
          mu(c, r) ? (n = null) : h !== null && mu(c, h) && (t.flags |= 32),
          t.memoizedState !== null && ((c = dr(e, t, Kp, null, null, a)), (pc._currentValue = c)),
          bs(e, t),
          Nt(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ae &&
            ((e = a = Je) &&
              ((a = Oy(a, t.pendingProps, fa)),
              a !== null ? ((t.stateNode = a), (Et = t), (Je = null), (e = !0)) : (e = !1)),
            e || _n(t)),
          null
        );
      case 13:
        return Am(e, t, a);
      case 4:
        return (
          pt(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = ml(t, null, n, a)) : Nt(e, t, n, a),
          t.child
        );
      case 11:
        return pm(e, t, t.type, t.pendingProps, a);
      case 7:
        return (Nt(e, t, t.pendingProps, a), t.child);
      case 8:
        return (Nt(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (Nt(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((n = t.pendingProps), bn(t, t.type, n.value), Nt(e, t, n.children, a), t.child);
      case 9:
        return (
          (c = t.type._context),
          (n = t.pendingProps.children),
          rl(t),
          (c = wt(c)),
          (n = n(c)),
          (t.flags |= 1),
          Nt(e, t, n, a),
          t.child
        );
      case 14:
        return ym(e, t, t.type, t.pendingProps, a);
      case 15:
        return gm(e, t, t.type, t.pendingProps, a);
      case 19:
        return Mm(e, t, a);
      case 31:
        return ty(e, t, a);
      case 22:
        return vm(e, t, a, t.pendingProps);
      case 24:
        return (
          rl(t),
          (n = wt(ut)),
          e === null
            ? ((c = ar()),
              c === null &&
                ((c = Ge),
                (r = er()),
                (c.pooledCache = r),
                r.refCount++,
                r !== null && (c.pooledCacheLanes |= a),
                (c = r)),
              (t.memoizedState = { parent: n, cache: c }),
              lr(t),
              bn(t, ut, c))
            : ((e.lanes & a) !== 0 && (ir(e, t), Wi(t, null, null, a), Qi()),
              (c = e.memoizedState),
              (r = t.memoizedState),
              c.parent !== n
                ? ((c = { parent: n, cache: n }),
                  (t.memoizedState = c),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = c),
                  bn(t, ut, n))
                : ((n = r.cache), bn(t, ut, n), n !== c.cache && Po(t, [ut], a, !0))),
          Nt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Pa(e) {
    e.flags |= 4;
  }
  function Ur(e, t, a, n, c) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (c & 335544128) === c))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (eh()) e.flags |= 8192;
        else throw ((dl = is), nr);
    } else e.flags &= -16777217;
  }
  function wm(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Gh(t)))
      if (eh()) e.flags |= 8192;
      else throw ((dl = is), nr);
  }
  function xs(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Ni() : 536870912), (e.lanes |= t), (ci |= t)));
  }
  function tc(e, t) {
    if (!Ae)
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
      for (var c = e.child; c !== null; )
        ((a |= c.lanes | c.childLanes),
          (n |= c.subtreeFlags & 65011712),
          (n |= c.flags & 65011712),
          (c.return = e),
          (c = c.sibling));
    else
      for (c = e.child; c !== null; )
        ((a |= c.lanes | c.childLanes),
          (n |= c.subtreeFlags),
          (n |= c.flags),
          (c.return = e),
          (c = c.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = a), t);
  }
  function ny(e, t, a) {
    var n = t.pendingProps;
    switch ((Qo(t), t.tag)) {
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
          Wa(ut),
          Ke(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (Kl(t)
              ? Pa(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Jo())),
          Fe(t),
          null
        );
      case 26:
        var c = t.type,
          r = t.memoizedState;
        return (
          e === null
            ? (Pa(t), r !== null ? (Fe(t), wm(t, r)) : (Fe(t), Ur(t, c, null, n, a)))
            : r
              ? r !== e.memoizedState
                ? (Pa(t), Fe(t), wm(t, r))
                : (Fe(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Pa(t), Fe(t), Ur(t, c, e, n, a)),
          null
        );
      case 27:
        if ((Na(t), (a = me.current), (c = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Pa(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(o(166));
            return (Fe(t), null);
          }
          ((e = F.current), Kl(t) ? sd(t) : ((e = Bh(c, n, a)), (t.stateNode = e), Pa(t)));
        }
        return (Fe(t), null);
      case 5:
        if ((Na(t), (c = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Pa(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(o(166));
            return (Fe(t), null);
          }
          if (((r = F.current), Kl(t))) sd(t);
          else {
            var h = $s(me.current);
            switch (r) {
              case 1:
                r = h.createElementNS('http://www.w3.org/2000/svg', c);
                break;
              case 2:
                r = h.createElementNS('http://www.w3.org/1998/Math/MathML', c);
                break;
              default:
                switch (c) {
                  case 'svg':
                    r = h.createElementNS('http://www.w3.org/2000/svg', c);
                    break;
                  case 'math':
                    r = h.createElementNS('http://www.w3.org/1998/Math/MathML', c);
                    break;
                  case 'script':
                    ((r = h.createElement('div')),
                      (r.innerHTML = '<script><\/script>'),
                      (r = r.removeChild(r.firstChild)));
                    break;
                  case 'select':
                    ((r =
                      typeof n.is == 'string'
                        ? h.createElement('select', { is: n.is })
                        : h.createElement('select')),
                      n.multiple ? (r.multiple = !0) : n.size && (r.size = n.size));
                    break;
                  default:
                    r =
                      typeof n.is == 'string'
                        ? h.createElement(c, { is: n.is })
                        : h.createElement(c);
                }
            }
            ((r[tt] = t), (r[Mt] = n));
            e: for (h = t.child; h !== null; ) {
              if (h.tag === 5 || h.tag === 6) r.appendChild(h.stateNode);
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
            t.stateNode = r;
            e: switch ((zt(r, c, n), c)) {
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
            n && Pa(t);
          }
        }
        return (Fe(t), Ur(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Pa(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = me.current), Kl(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (n = null), (c = Et), c !== null))
              switch (c.tag) {
                case 27:
                case 5:
                  n = c.memoizedProps;
              }
            ((e[tt] = t),
              (e = !!(
                e.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                Ah(e.nodeValue, a)
              )),
              e || _n(t, !0));
          } else ((e = $s(e).createTextNode(n)), (e[tt] = t), (t.stateNode = e));
        }
        return (Fe(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = Kl(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(o(557));
              e[tt] = t;
            } else (sl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Fe(t), (e = !1));
          } else
            ((a = Jo()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (Jt(t), t) : (Jt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return (Fe(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((c = Kl(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!c) throw Error(o(318));
              if (((c = t.memoizedState), (c = c !== null ? c.dehydrated : null), !c))
                throw Error(o(317));
              c[tt] = t;
            } else (sl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Fe(t), (c = !1));
          } else
            ((c = Jo()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c),
              (c = !0));
          if (!c) return t.flags & 256 ? (Jt(t), t) : (Jt(t), null);
        }
        return (
          Jt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = n !== null),
              (e = e !== null && e.memoizedState !== null),
              a &&
                ((n = t.child),
                (c = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (c = n.alternate.memoizedState.cachePool.pool),
                (r = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (r = n.memoizedState.cachePool.pool),
                r !== c && (n.flags |= 2048)),
              a !== e && a && (t.child.flags |= 8192),
              xs(t, t.updateQueue),
              Fe(t),
              null)
        );
      case 4:
        return (Ke(), e === null && ou(t.stateNode.containerInfo), Fe(t), null);
      case 10:
        return (Wa(t.type), Fe(t), null);
      case 19:
        if ((k(ct), (n = t.memoizedState), n === null)) return (Fe(t), null);
        if (((c = (t.flags & 128) !== 0), (r = n.rendering), r === null))
          if (c) tc(n, !1);
          else {
            if (lt !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((r = rs(e)), r !== null)) {
                  for (
                    t.flags |= 128,
                      tc(n, !1),
                      e = r.updateQueue,
                      t.updateQueue = e,
                      xs(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (ad(a, e), (a = a.sibling));
                  return (X(ct, (ct.current & 1) | 2), Ae && Ka(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              Be() > Es &&
              ((t.flags |= 128), (c = !0), tc(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!c)
            if (((e = rs(r)), e !== null)) {
              if (
                ((t.flags |= 128),
                (c = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                xs(t, e),
                tc(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !r.alternate && !Ae)
              )
                return (Fe(t), null);
            } else
              2 * Be() - n.renderingStartTime > Es &&
                a !== 536870912 &&
                ((t.flags |= 128), (c = !0), tc(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((r.sibling = t.child), (t.child = r))
            : ((e = n.last), e !== null ? (e.sibling = r) : (t.child = r), (n.last = r));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = Be()),
            (e.sibling = null),
            (a = ct.current),
            X(ct, c ? (a & 1) | 2 : a & 1),
            Ae && Ka(t, n.treeForkCount),
            e)
          : (Fe(t), null);
      case 22:
      case 23:
        return (
          Jt(t),
          rr(),
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
          a !== null && xs(t, a.retryQueue),
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
          e !== null && k(ul),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Wa(ut),
          Fe(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function ly(e, t) {
    switch ((Qo(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Wa(ut),
          Ke(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Na(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Jt(t), t.alternate === null)) throw Error(o(340));
          sl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Jt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(o(340));
          sl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (k(ct), null);
      case 4:
        return (Ke(), null);
      case 10:
        return (Wa(t.type), null);
      case 22:
      case 23:
        return (
          Jt(t),
          rr(),
          e !== null && k(ul),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Wa(ut), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Nm(e, t) {
    switch ((Qo(t), t.tag)) {
      case 3:
        (Wa(ut), Ke());
        break;
      case 26:
      case 27:
      case 5:
        Na(t);
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
        k(ct);
        break;
      case 10:
        Wa(t.type);
        break;
      case 22:
      case 23:
        (Jt(t), rr(), e !== null && k(ul));
        break;
      case 24:
        Wa(ut);
    }
  }
  function ac(e, t) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var c = n.next;
        a = c;
        do {
          if ((a.tag & e) === e) {
            n = void 0;
            var r = a.create,
              h = a.inst;
            ((n = r()), (h.destroy = n));
          }
          a = a.next;
        } while (a !== c);
      }
    } catch (v) {
      $e(t, t.return, v);
    }
  }
  function Mn(e, t, a) {
    try {
      var n = t.updateQueue,
        c = n !== null ? n.lastEffect : null;
      if (c !== null) {
        var r = c.next;
        n = r;
        do {
          if ((n.tag & e) === e) {
            var h = n.inst,
              v = h.destroy;
            if (v !== void 0) {
              ((h.destroy = void 0), (c = t));
              var S = a,
                N = v;
              try {
                N();
              } catch (B) {
                $e(c, S, B);
              }
            }
          }
          n = n.next;
        } while (n !== r);
      }
    } catch (B) {
      $e(t, t.return, B);
    }
  }
  function zm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        bd(t, a);
      } catch (n) {
        $e(e, e.return, n);
      }
    }
  }
  function Cm(e, t, a) {
    ((a.props = pl(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      $e(e, t, n);
    }
  }
  function nc(e, t) {
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
    } catch (c) {
      $e(e, t, c);
    }
  }
  function Da(e, t) {
    var a = e.ref,
      n = e.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (c) {
          $e(e, t, c);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (c) {
          $e(e, t, c);
        }
      else a.current = null;
  }
  function Rm(e) {
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
    } catch (c) {
      $e(e, e.return, c);
    }
  }
  function qr(e, t, a) {
    try {
      var n = e.stateNode;
      (My(n, e.type, a, t), (n[Mt] = t));
    } catch (c) {
      $e(e, e.return, c);
    }
  }
  function Om(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && On(e.type)) || e.tag === 4
    );
  }
  function Vr(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Om(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && On(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Gr(e, t, a) {
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
            a != null || t.onclick !== null || (t.onclick = Ya)));
    else if (
      n !== 4 &&
      (n === 27 && On(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Gr(e, t, a), e = e.sibling; e !== null; ) (Gr(e, t, a), (e = e.sibling));
  }
  function js(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && On(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (js(e, t, a), e = e.sibling; e !== null; ) (js(e, t, a), (e = e.sibling));
  }
  function Dm(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, c = t.attributes; c.length; ) t.removeAttributeNode(c[0]);
      (zt(t, n, a), (t[tt] = e), (t[Mt] = a));
    } catch (r) {
      $e(e, e.return, r);
    }
  }
  var en = !1,
    mt = !1,
    Yr = !1,
    Bm = typeof WeakSet == 'function' ? WeakSet : Set,
    jt = null;
  function iy(e, t) {
    if (((e = e.containerInfo), (fu = Ys), (e = Kf(e)), $o(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var c = n.anchorOffset,
              r = n.focusNode;
            n = n.focusOffset;
            try {
              (a.nodeType, r.nodeType);
            } catch {
              a = null;
              break e;
            }
            var h = 0,
              v = -1,
              S = -1,
              N = 0,
              B = 0,
              H = e,
              z = null;
            t: for (;;) {
              for (
                var R;
                H !== a || (c !== 0 && H.nodeType !== 3) || (v = h + c),
                  H !== r || (n !== 0 && H.nodeType !== 3) || (S = h + n),
                  H.nodeType === 3 && (h += H.nodeValue.length),
                  (R = H.firstChild) !== null;
              )
                ((z = H), (H = R));
              for (;;) {
                if (H === e) break t;
                if (
                  (z === a && ++N === c && (v = h),
                  z === r && ++B === n && (S = h),
                  (R = H.nextSibling) !== null)
                )
                  break;
                ((H = z), (z = H.parentNode));
              }
              H = R;
            }
            a = v === -1 || S === -1 ? null : { start: v, end: S };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (du = { focusedElem: e, selectionRange: a }, Ys = !1, jt = t; jt !== null; )
      if (((t = jt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (jt = e));
      else
        for (; jt !== null; ) {
          switch (((t = jt), (r = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (a = 0; a < e.length; a++) ((c = e[a]), (c.ref.impl = c.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && r !== null) {
                ((e = void 0),
                  (a = t),
                  (c = r.memoizedProps),
                  (r = r.memoizedState),
                  (n = a.stateNode));
                try {
                  var I = pl(a.type, c);
                  ((e = n.getSnapshotBeforeUpdate(I, r)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (oe) {
                  $e(a, a.return, oe);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) pu(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      pu(e);
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
            ((e.return = t.return), (jt = e));
            break;
          }
          jt = t.return;
        }
  }
  function Lm(e, t, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (an(e, a), n & 4 && ac(5, a));
        break;
      case 1:
        if ((an(e, a), n & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (h) {
              $e(a, a.return, h);
            }
          else {
            var c = pl(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(c, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (h) {
              $e(a, a.return, h);
            }
          }
        (n & 64 && zm(a), n & 512 && nc(a, a.return));
        break;
      case 3:
        if ((an(e, a), n & 64 && ((e = a.updateQueue), e !== null))) {
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
            bd(e, t);
          } catch (h) {
            $e(a, a.return, h);
          }
        }
        break;
      case 27:
        t === null && n & 4 && Dm(a);
      case 26:
      case 5:
        (an(e, a), t === null && n & 4 && Rm(a), n & 512 && nc(a, a.return));
        break;
      case 12:
        an(e, a);
        break;
      case 31:
        (an(e, a), n & 4 && Hm(e, a));
        break;
      case 13:
        (an(e, a),
          n & 4 && Um(e, a),
          n & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = hy.bind(null, a)), Dy(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || en), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || mt), (c = en));
          var r = mt;
          ((en = n),
            (mt = t) && !r ? nn(e, a, (a.subtreeFlags & 8772) !== 0) : an(e, a),
            (en = c),
            (mt = r));
        }
        break;
      case 30:
        break;
      default:
        an(e, a);
    }
  }
  function $m(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), $m(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && bo(t)),
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
  function tn(e, t, a) {
    for (a = a.child; a !== null; ) (km(e, t, a), (a = a.sibling));
  }
  function km(e, t, a) {
    if (yt && typeof yt.onCommitFiberUnmount == 'function')
      try {
        yt.onCommitFiberUnmount(za, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (mt || Da(a, t),
          tn(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        mt || Da(a, t);
        var n = Pe,
          c = Vt;
        (On(a.type) && ((Pe = a.stateNode), (Vt = !1)),
          tn(e, t, a),
          dc(a.stateNode),
          (Pe = n),
          (Vt = c));
        break;
      case 5:
        mt || Da(a, t);
      case 6:
        if (((n = Pe), (c = Vt), (Pe = null), tn(e, t, a), (Pe = n), (Vt = c), Pe !== null))
          if (Vt)
            try {
              (Pe.nodeType === 9
                ? Pe.body
                : Pe.nodeName === 'HTML'
                  ? Pe.ownerDocument.body
                  : Pe
              ).removeChild(a.stateNode);
            } catch (r) {
              $e(a, t, r);
            }
          else
            try {
              Pe.removeChild(a.stateNode);
            } catch (r) {
              $e(a, t, r);
            }
        break;
      case 18:
        Pe !== null &&
          (Vt
            ? ((e = Pe),
              zh(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              hi(e))
            : zh(Pe, a.stateNode));
        break;
      case 4:
        ((n = Pe),
          (c = Vt),
          (Pe = a.stateNode.containerInfo),
          (Vt = !0),
          tn(e, t, a),
          (Pe = n),
          (Vt = c));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Mn(2, a, t), mt || Mn(4, a, t), tn(e, t, a));
        break;
      case 1:
        (mt ||
          (Da(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && Cm(a, t, n)),
          tn(e, t, a));
        break;
      case 21:
        tn(e, t, a);
        break;
      case 22:
        ((mt = (n = mt) || a.memoizedState !== null), tn(e, t, a), (mt = n));
        break;
      default:
        tn(e, t, a);
    }
  }
  function Hm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        hi(e);
      } catch (a) {
        $e(t, t.return, a);
      }
    }
  }
  function Um(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        hi(e);
      } catch (a) {
        $e(t, t.return, a);
      }
  }
  function cy(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Bm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Bm()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function As(e, t) {
    var a = cy(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var c = py.bind(null, e, n);
        n.then(c, c);
      }
    });
  }
  function Gt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var c = a[n],
          r = e,
          h = t,
          v = h;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (On(v.type)) {
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
        if (Pe === null) throw Error(o(160));
        (km(r, h, c),
          (Pe = null),
          (Vt = !1),
          (r = c.alternate),
          r !== null && (r.return = null),
          (c.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (qm(t, e), (t = t.sibling));
  }
  var ba = null;
  function qm(e, t) {
    var a = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Gt(t, e), Yt(e), n & 4 && (Mn(3, e, e.return), ac(3, e), Mn(5, e, e.return)));
        break;
      case 1:
        (Gt(t, e),
          Yt(e),
          n & 512 && (mt || a === null || Da(a, a.return)),
          n & 64 &&
            en &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var c = ba;
        if ((Gt(t, e), Yt(e), n & 512 && (mt || a === null || Da(a, a.return)), n & 4)) {
          var r = a !== null ? a.memoizedState : null;
          if (((n = e.memoizedState), a === null))
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  ((n = e.type), (a = e.memoizedProps), (c = c.ownerDocument || c));
                  t: switch (n) {
                    case 'title':
                      ((r = c.getElementsByTagName('title')[0]),
                        (!r ||
                          r[zi] ||
                          r[tt] ||
                          r.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          r.hasAttribute('itemprop')) &&
                          ((r = c.createElement(n)),
                          c.head.insertBefore(r, c.querySelector('head > title'))),
                        zt(r, n, a),
                        (r[tt] = e),
                        xt(r),
                        (n = r));
                      break e;
                    case 'link':
                      var h = qh('link', 'href', c).get(n + (a.href || ''));
                      if (h) {
                        for (var v = 0; v < h.length; v++)
                          if (
                            ((r = h[v]),
                            r.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              r.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              r.getAttribute('title') === (a.title == null ? null : a.title) &&
                              r.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            h.splice(v, 1);
                            break t;
                          }
                      }
                      ((r = c.createElement(n)), zt(r, n, a), c.head.appendChild(r));
                      break;
                    case 'meta':
                      if ((h = qh('meta', 'content', c).get(n + (a.content || '')))) {
                        for (v = 0; v < h.length; v++)
                          if (
                            ((r = h[v]),
                            r.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              r.getAttribute('name') === (a.name == null ? null : a.name) &&
                              r.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              r.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              r.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            h.splice(v, 1);
                            break t;
                          }
                      }
                      ((r = c.createElement(n)), zt(r, n, a), c.head.appendChild(r));
                      break;
                    default:
                      throw Error(o(468, n));
                  }
                  ((r[tt] = e), xt(r), (n = r));
                }
                e.stateNode = n;
              } else Vh(c, e.type, e.stateNode);
            else e.stateNode = Uh(c, n, e.memoizedProps);
          else
            r !== n
              ? (r === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : r.count--,
                n === null ? Vh(c, e.type, e.stateNode) : Uh(c, n, e.memoizedProps))
              : n === null && e.stateNode !== null && qr(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Gt(t, e),
          Yt(e),
          n & 512 && (mt || a === null || Da(a, a.return)),
          a !== null && n & 4 && qr(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Gt(t, e), Yt(e), n & 512 && (mt || a === null || Da(a, a.return)), e.flags & 32)) {
          c = e.stateNode;
          try {
            $l(c, '');
          } catch (I) {
            $e(e, e.return, I);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((c = e.memoizedProps), qr(e, c, a !== null ? a.memoizedProps : c)),
          n & 1024 && (Yr = !0));
        break;
      case 6:
        if ((Gt(t, e), Yt(e), n & 4)) {
          if (e.stateNode === null) throw Error(o(162));
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
          ((Us = null),
          (c = ba),
          (ba = ks(t.containerInfo)),
          Gt(t, e),
          (ba = c),
          Yt(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            hi(t.containerInfo);
          } catch (I) {
            $e(e, e.return, I);
          }
        Yr && ((Yr = !1), Vm(e));
        break;
      case 4:
        ((n = ba), (ba = ks(e.stateNode.containerInfo)), Gt(t, e), Yt(e), (ba = n));
        break;
      case 12:
        (Gt(t, e), Yt(e));
        break;
      case 31:
        (Gt(t, e),
          Yt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), As(e, n))));
        break;
      case 13:
        (Gt(t, e),
          Yt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Ms = Be()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), As(e, n))));
        break;
      case 22:
        c = e.memoizedState !== null;
        var S = a !== null && a.memoizedState !== null,
          N = en,
          B = mt;
        if (((en = N || c), (mt = B || S), Gt(t, e), (mt = B), (en = N), Yt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = c ? t._visibility & -2 : t._visibility | 1,
              c && (a === null || S || en || mt || yl(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                S = a = t;
                try {
                  if (((r = S.stateNode), c))
                    ((h = r.style),
                      typeof h.setProperty == 'function'
                        ? h.setProperty('display', 'none', 'important')
                        : (h.display = 'none'));
                  else {
                    v = S.stateNode;
                    var H = S.memoizedProps.style,
                      z = H != null && H.hasOwnProperty('display') ? H.display : null;
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
                  S.stateNode.nodeValue = c ? '' : S.memoizedProps;
                } catch (I) {
                  $e(S, S.return, I);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                S = t;
                try {
                  var R = S.stateNode;
                  c ? Ch(R, !0) : Ch(S.stateNode, !1);
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
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), As(e, a))));
        break;
      case 19:
        (Gt(t, e),
          Yt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), As(e, n))));
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
          if (Om(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var c = a.stateNode,
              r = Vr(e);
            js(e, r, c);
            break;
          case 5:
            var h = a.stateNode;
            a.flags & 32 && ($l(h, ''), (a.flags &= -33));
            var v = Vr(e);
            js(e, v, h);
            break;
          case 3:
          case 4:
            var S = a.stateNode.containerInfo,
              N = Vr(e);
            Gr(e, N, S);
            break;
          default:
            throw Error(o(161));
        }
      } catch (B) {
        $e(e, e.return, B);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Vm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Vm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function an(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Lm(e, t.alternate, t), (t = t.sibling));
  }
  function yl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Mn(4, t, t.return), yl(t));
          break;
        case 1:
          Da(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && Cm(t, t.return, a), yl(t));
          break;
        case 27:
          dc(t.stateNode);
        case 26:
        case 5:
          (Da(t, t.return), yl(t));
          break;
        case 22:
          t.memoizedState === null && yl(t);
          break;
        case 30:
          yl(t);
          break;
        default:
          yl(t);
      }
      e = e.sibling;
    }
  }
  function nn(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        c = e,
        r = t,
        h = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          (nn(c, r, a), ac(4, r));
          break;
        case 1:
          if ((nn(c, r, a), (n = r), (c = n.stateNode), typeof c.componentDidMount == 'function'))
            try {
              c.componentDidMount();
            } catch (N) {
              $e(n, n.return, N);
            }
          if (((n = r), (c = n.updateQueue), c !== null)) {
            var v = n.stateNode;
            try {
              var S = c.shared.hiddenCallbacks;
              if (S !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < S.length; c++) _d(S[c], v);
            } catch (N) {
              $e(n, n.return, N);
            }
          }
          (a && h & 64 && zm(r), nc(r, r.return));
          break;
        case 27:
          Dm(r);
        case 26:
        case 5:
          (nn(c, r, a), a && n === null && h & 4 && Rm(r), nc(r, r.return));
          break;
        case 12:
          nn(c, r, a);
          break;
        case 31:
          (nn(c, r, a), a && h & 4 && Hm(c, r));
          break;
        case 13:
          (nn(c, r, a), a && h & 4 && Um(c, r));
          break;
        case 22:
          (r.memoizedState === null && nn(c, r, a), nc(r, r.return));
          break;
        case 30:
          break;
        default:
          nn(c, r, a);
      }
      t = t.sibling;
    }
  }
  function Zr(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && Gi(a)));
  }
  function Xr(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Gi(e)));
  }
  function Sa(e, t, a, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Gm(e, t, a, n), (t = t.sibling));
  }
  function Gm(e, t, a, n) {
    var c = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Sa(e, t, a, n), c & 2048 && ac(9, t));
        break;
      case 1:
        Sa(e, t, a, n);
        break;
      case 3:
        (Sa(e, t, a, n),
          c & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Gi(e))));
        break;
      case 12:
        if (c & 2048) {
          (Sa(e, t, a, n), (e = t.stateNode));
          try {
            var r = t.memoizedProps,
              h = r.id,
              v = r.onPostCommit;
            typeof v == 'function' &&
              v(h, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (S) {
            $e(t, t.return, S);
          }
        } else Sa(e, t, a, n);
        break;
      case 31:
        Sa(e, t, a, n);
        break;
      case 13:
        Sa(e, t, a, n);
        break;
      case 23:
        break;
      case 22:
        ((r = t.stateNode),
          (h = t.alternate),
          t.memoizedState !== null
            ? r._visibility & 2
              ? Sa(e, t, a, n)
              : lc(e, t)
            : r._visibility & 2
              ? Sa(e, t, a, n)
              : ((r._visibility |= 2), ni(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          c & 2048 && Zr(h, t));
        break;
      case 24:
        (Sa(e, t, a, n), c & 2048 && Xr(t.alternate, t));
        break;
      default:
        Sa(e, t, a, n);
    }
  }
  function ni(e, t, a, n, c) {
    for (c = c && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var r = e,
        h = t,
        v = a,
        S = n,
        N = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          (ni(r, h, v, S, c), ac(8, h));
          break;
        case 23:
          break;
        case 22:
          var B = h.stateNode;
          (h.memoizedState !== null
            ? B._visibility & 2
              ? ni(r, h, v, S, c)
              : lc(r, h)
            : ((B._visibility |= 2), ni(r, h, v, S, c)),
            c && N & 2048 && Zr(h.alternate, h));
          break;
        case 24:
          (ni(r, h, v, S, c), c && N & 2048 && Xr(h.alternate, h));
          break;
        default:
          ni(r, h, v, S, c);
      }
      t = t.sibling;
    }
  }
  function lc(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          n = t,
          c = n.flags;
        switch (n.tag) {
          case 22:
            (lc(a, n), c & 2048 && Zr(n.alternate, n));
            break;
          case 24:
            (lc(a, n), c & 2048 && Xr(n.alternate, n));
            break;
          default:
            lc(a, n);
        }
        t = t.sibling;
      }
  }
  var ic = 8192;
  function li(e, t, a) {
    if (e.subtreeFlags & ic) for (e = e.child; e !== null; ) (Ym(e, t, a), (e = e.sibling));
  }
  function Ym(e, t, a) {
    switch (e.tag) {
      case 26:
        (li(e, t, a),
          e.flags & ic && e.memoizedState !== null && Xy(a, ba, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        li(e, t, a);
        break;
      case 3:
      case 4:
        var n = ba;
        ((ba = ks(e.stateNode.containerInfo)), li(e, t, a), (ba = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = ic), (ic = 16777216), li(e, t, a), (ic = n))
            : li(e, t, a));
        break;
      default:
        li(e, t, a);
    }
  }
  function Zm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function cc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((jt = n), Km(n, e));
        }
      Zm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Xm(e), (e = e.sibling));
  }
  function Xm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (cc(e), e.flags & 2048 && Mn(9, e, e.return));
        break;
      case 3:
        cc(e);
        break;
      case 12:
        cc(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Ts(e))
          : cc(e);
        break;
      default:
        cc(e);
    }
  }
  function Ts(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((jt = n), Km(n, e));
        }
      Zm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Mn(8, t, t.return), Ts(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Ts(t)));
          break;
        default:
          Ts(t);
      }
      e = e.sibling;
    }
  }
  function Km(e, t) {
    for (; jt !== null; ) {
      var a = jt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Mn(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Gi(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (jt = n));
      else
        e: for (a = e; jt !== null; ) {
          n = jt;
          var c = n.sibling,
            r = n.return;
          if (($m(n), n === a)) {
            jt = null;
            break e;
          }
          if (c !== null) {
            ((c.return = r), (jt = c));
            break e;
          }
          jt = r;
        }
    }
  }
  var sy = {
      getCacheForType: function (e) {
        var t = wt(ut),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return wt(ut).controller.signal;
      },
    },
    oy = typeof WeakMap == 'function' ? WeakMap : Map,
    Ce = 0,
    Ge = null,
    ve = null,
    Se = 0,
    Le = 0,
    Ft = null,
    En = !1,
    ii = !1,
    Kr = !1,
    ln = 0,
    lt = 0,
    wn = 0,
    gl = 0,
    Qr = 0,
    It = 0,
    ci = 0,
    sc = null,
    Zt = null,
    Wr = !1,
    Ms = 0,
    Qm = 0,
    Es = 1 / 0,
    ws = null,
    Nn = null,
    gt = 0,
    zn = null,
    si = null,
    cn = 0,
    Jr = 0,
    Fr = null,
    Wm = null,
    oc = 0,
    Ir = null;
  function Pt() {
    return (Ce & 2) !== 0 && Se !== 0 ? Se & -Se : D.T !== null ? lu() : ye();
  }
  function Jm() {
    if (It === 0)
      if ((Se & 536870912) === 0 || Ae) {
        var e = va;
        ((va <<= 1), (va & 3932160) === 0 && (va = 262144), (It = e));
      } else It = 536870912;
    return ((e = Wt.current), e !== null && (e.flags |= 32), It);
  }
  function Xt(e, t, a) {
    (((e === Ge && (Le === 2 || Le === 9)) || e.cancelPendingCommit !== null) &&
      (oi(e, 0), Cn(e, Se, It, !1)),
      J(e, a),
      ((Ce & 2) === 0 || e !== Ge) &&
        (e === Ge && ((Ce & 2) === 0 && (gl |= a), lt === 4 && Cn(e, Se, It, !1)), Ba(e)));
  }
  function Fm(e, t, a) {
    if ((Ce & 6) !== 0) throw Error(o(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || In(e, t),
      c = n ? fy(e, t) : eu(e, t, !0),
      r = n;
    do {
      if (c === 0) {
        ii && !n && Cn(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), r && !ry(a))) {
          ((c = eu(e, t, !1)), (r = !1));
          continue;
        }
        if (c === 2) {
          if (((r = t), e.errorRecoveryDisabledLanes & r)) var h = 0;
          else
            ((h = e.pendingLanes & -536870913), (h = h !== 0 ? h : h & 536870912 ? 536870912 : 0));
          if (h !== 0) {
            t = h;
            e: {
              var v = e;
              c = sc;
              var S = v.current.memoizedState.isDehydrated;
              if ((S && (oi(v, h).flags |= 256), (h = eu(v, h, !1)), h !== 2)) {
                if (Kr && !S) {
                  ((v.errorRecoveryDisabledLanes |= r), (gl |= r), (c = 4));
                  break e;
                }
                ((r = Zt), (Zt = c), r !== null && (Zt === null ? (Zt = r) : Zt.push.apply(Zt, r)));
              }
              c = h;
            }
            if (((r = !1), c !== 2)) continue;
          }
        }
        if (c === 1) {
          (oi(e, 0), Cn(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (r = c), r)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Cn(n, t, It, !En);
              break e;
            case 2:
              Zt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((c = Ms + 300 - Be()), 10 < c)) {
            if ((Cn(n, t, It, !En), Va(n, 0, !0) !== 0)) break e;
            ((cn = t),
              (n.timeoutHandle = wh(
                Im.bind(null, n, a, Zt, ws, Wr, t, It, gl, ci, En, r, 'Throttled', -0, 0),
                c
              )));
            break e;
          }
          Im(n, a, Zt, ws, Wr, t, It, gl, ci, En, r, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ba(e);
  }
  function Im(e, t, a, n, c, r, h, v, S, N, B, H, z, R) {
    if (((e.timeoutHandle = -1), (H = t.subtreeFlags), H & 8192 || (H & 16785408) === 16785408)) {
      ((H = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ya,
      }),
        Ym(t, r, H));
      var I = (r & 62914560) === r ? Ms - Be() : (r & 4194048) === r ? Qm - Be() : 0;
      if (((I = Ky(H, I)), I !== null)) {
        ((cn = r),
          (e.cancelPendingCommit = I(ch.bind(null, e, t, r, a, n, c, h, v, S, B, H, null, z, R))),
          Cn(e, r, h, !N));
        return;
      }
    }
    ch(e, t, r, a, n, c, h, v, S);
  }
  function ry(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var c = a[n],
            r = c.getSnapshot;
          c = c.value;
          try {
            if (!Kt(r(), c)) return !1;
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
  function Cn(e, t, a, n) {
    ((t &= ~Qr),
      (t &= ~gl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var c = t; 0 < c; ) {
      var r = 31 - St(c),
        h = 1 << r;
      ((n[r] = -1), (c &= ~h));
    }
    a !== 0 && ge(e, a, t);
  }
  function Ns() {
    return (Ce & 6) === 0 ? (rc(0), !1) : !0;
  }
  function Pr() {
    if (ve !== null) {
      if (Le === 0) var e = ve.return;
      else ((e = ve), (Qa = ol = null), pr(e), (Il = null), (Zi = 0), (e = ve));
      for (; e !== null; ) (Nm(e.alternate, e), (e = e.return));
      ve = null;
    }
  }
  function oi(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), Ny(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (cn = 0),
      Pr(),
      (Ge = e),
      (ve = a = Xa(e.current, null)),
      (Se = t),
      (Le = 0),
      (Ft = null),
      (En = !1),
      (ii = In(e, t)),
      (Kr = !1),
      (ci = It = Qr = gl = wn = lt = 0),
      (Zt = sc = null),
      (Wr = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var c = 31 - St(n),
          r = 1 << c;
        ((t |= e[c]), (n &= ~r));
      }
    return ((ln = t), Jc(), a);
  }
  function Pm(e, t) {
    ((fe = null),
      (D.H = Pi),
      t === Fl || t === ls
        ? ((t = pd()), (Le = 3))
        : t === nr
          ? ((t = pd()), (Le = 4))
          : (Le =
              t === Cr
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Ft = t),
      ve === null && ((lt = 1), vs(e, oa(t, e.current))));
  }
  function eh() {
    var e = Wt.current;
    return e === null
      ? !0
      : (Se & 4194048) === Se
        ? da === null
        : (Se & 62914560) === Se || (Se & 536870912) !== 0
          ? e === da
          : !1;
  }
  function th() {
    var e = D.H;
    return ((D.H = Pi), e === null ? Pi : e);
  }
  function ah() {
    var e = D.A;
    return ((D.A = sy), e);
  }
  function zs() {
    ((lt = 4),
      En || ((Se & 4194048) !== Se && Wt.current !== null) || (ii = !0),
      ((wn & 134217727) === 0 && (gl & 134217727) === 0) || Ge === null || Cn(Ge, Se, It, !1));
  }
  function eu(e, t, a) {
    var n = Ce;
    Ce |= 2;
    var c = th(),
      r = ah();
    ((Ge !== e || Se !== t) && ((ws = null), oi(e, t)), (t = !1));
    var h = lt;
    e: do
      try {
        if (Le !== 0 && ve !== null) {
          var v = ve,
            S = Ft;
          switch (Le) {
            case 8:
              (Pr(), (h = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Wt.current === null && (t = !0);
              var N = Le;
              if (((Le = 0), (Ft = null), ri(e, v, S, N), a && ii)) {
                h = 0;
                break e;
              }
              break;
            default:
              ((N = Le), (Le = 0), (Ft = null), ri(e, v, S, N));
          }
        }
        (uy(), (h = lt));
        break;
      } catch (B) {
        Pm(e, B);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Qa = ol = null),
      (Ce = n),
      (D.H = c),
      (D.A = r),
      ve === null && ((Ge = null), (Se = 0), Jc()),
      h
    );
  }
  function uy() {
    for (; ve !== null; ) nh(ve);
  }
  function fy(e, t) {
    var a = Ce;
    Ce |= 2;
    var n = th(),
      c = ah();
    Ge !== e || Se !== t ? ((ws = null), (Es = Be() + 500), oi(e, t)) : (ii = In(e, t));
    e: do
      try {
        if (Le !== 0 && ve !== null) {
          t = ve;
          var r = Ft;
          t: switch (Le) {
            case 1:
              ((Le = 0), (Ft = null), ri(e, t, r, 1));
              break;
            case 2:
            case 9:
              if (md(r)) {
                ((Le = 0), (Ft = null), lh(t));
                break;
              }
              ((t = function () {
                ((Le !== 2 && Le !== 9) || Ge !== e || (Le = 7), Ba(e));
              }),
                r.then(t, t));
              break e;
            case 3:
              Le = 7;
              break e;
            case 4:
              Le = 5;
              break e;
            case 7:
              md(r) ? ((Le = 0), (Ft = null), lh(t)) : ((Le = 0), (Ft = null), ri(e, t, r, 7));
              break;
            case 5:
              var h = null;
              switch (ve.tag) {
                case 26:
                  h = ve.memoizedState;
                case 5:
                case 27:
                  var v = ve;
                  if (h ? Gh(h) : v.stateNode.complete) {
                    ((Le = 0), (Ft = null));
                    var S = v.sibling;
                    if (S !== null) ve = S;
                    else {
                      var N = v.return;
                      N !== null ? ((ve = N), Cs(N)) : (ve = null);
                    }
                    break t;
                  }
              }
              ((Le = 0), (Ft = null), ri(e, t, r, 5));
              break;
            case 6:
              ((Le = 0), (Ft = null), ri(e, t, r, 6));
              break;
            case 8:
              (Pr(), (lt = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        dy();
        break;
      } catch (B) {
        Pm(e, B);
      }
    while (!0);
    return (
      (Qa = ol = null),
      (D.H = n),
      (D.A = c),
      (Ce = a),
      ve !== null ? 0 : ((Ge = null), (Se = 0), Jc(), lt)
    );
  }
  function dy() {
    for (; ve !== null && !Ze(); ) nh(ve);
  }
  function nh(e) {
    var t = Em(e.alternate, e, ln);
    ((e.memoizedProps = e.pendingProps), t === null ? Cs(e) : (ve = t));
  }
  function lh(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Sm(a, t, t.pendingProps, t.type, void 0, Se);
        break;
      case 11:
        t = Sm(a, t, t.pendingProps, t.type.render, t.ref, Se);
        break;
      case 5:
        pr(t);
      default:
        (Nm(a, t), (t = ve = ad(t, ln)), (t = Em(a, t, ln)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Cs(e) : (ve = t));
  }
  function ri(e, t, a, n) {
    ((Qa = ol = null), pr(t), (Il = null), (Zi = 0));
    var c = t.return;
    try {
      if (ey(e, c, t, a, Se)) {
        ((lt = 1), vs(e, oa(a, e.current)), (ve = null));
        return;
      }
    } catch (r) {
      if (c !== null) throw ((ve = c), r);
      ((lt = 1), vs(e, oa(a, e.current)), (ve = null));
      return;
    }
    t.flags & 32768
      ? (Ae || n === 1
          ? (e = !0)
          : ii || (Se & 536870912) !== 0
            ? (e = !1)
            : ((En = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Wt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        ih(t, e))
      : Cs(t);
  }
  function Cs(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        ih(t, En);
        return;
      }
      e = t.return;
      var a = ny(t.alternate, t, ln);
      if (a !== null) {
        ve = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ve = t;
        return;
      }
      ve = t = e;
    } while (t !== null);
    lt === 0 && (lt = 5);
  }
  function ih(e, t) {
    do {
      var a = ly(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (ve = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ve = e;
        return;
      }
      ve = e = a;
    } while (e !== null);
    ((lt = 6), (ve = null));
  }
  function ch(e, t, a, n, c, r, h, v, S) {
    e.cancelPendingCommit = null;
    do Rs();
    while (gt !== 0);
    if ((Ce & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((r = t.lanes | t.childLanes),
        (r |= Vo),
        ue(e, a, r, h, v, S),
        e === Ge && ((ve = Ge = null), (Se = 0)),
        (si = t),
        (zn = e),
        (cn = a),
        (Jr = r),
        (Fr = c),
        (Wm = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            yy(hn, function () {
              return (fh(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = D.T), (D.T = null), (c = Z.p), (Z.p = 2), (h = Ce), (Ce |= 4));
        try {
          iy(e, t, a);
        } finally {
          ((Ce = h), (Z.p = c), (D.T = n));
        }
      }
      ((gt = 1), sh(), oh(), rh());
    }
  }
  function sh() {
    if (gt === 1) {
      gt = 0;
      var e = zn,
        t = si,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = D.T), (D.T = null));
        var n = Z.p;
        Z.p = 2;
        var c = Ce;
        Ce |= 4;
        try {
          qm(t, e);
          var r = du,
            h = Kf(e.containerInfo),
            v = r.focusedElem,
            S = r.selectionRange;
          if (h !== v && v && v.ownerDocument && Xf(v.ownerDocument.documentElement, v)) {
            if (S !== null && $o(v)) {
              var N = S.start,
                B = S.end;
              if ((B === void 0 && (B = N), 'selectionStart' in v))
                ((v.selectionStart = N), (v.selectionEnd = Math.min(B, v.value.length)));
              else {
                var H = v.ownerDocument || document,
                  z = (H && H.defaultView) || window;
                if (z.getSelection) {
                  var R = z.getSelection(),
                    I = v.textContent.length,
                    oe = Math.min(S.start, I),
                    Ve = S.end === void 0 ? oe : Math.min(S.end, I);
                  !R.extend && oe > Ve && ((h = Ve), (Ve = oe), (oe = h));
                  var T = Zf(v, oe),
                    j = Zf(v, Ve);
                  if (
                    T &&
                    j &&
                    (R.rangeCount !== 1 ||
                      R.anchorNode !== T.node ||
                      R.anchorOffset !== T.offset ||
                      R.focusNode !== j.node ||
                      R.focusOffset !== j.offset)
                  ) {
                    var w = H.createRange();
                    (w.setStart(T.node, T.offset),
                      R.removeAllRanges(),
                      oe > Ve
                        ? (R.addRange(w), R.extend(j.node, j.offset))
                        : (w.setEnd(j.node, j.offset), R.addRange(w)));
                  }
                }
              }
            }
            for (H = [], R = v; (R = R.parentNode); )
              R.nodeType === 1 && H.push({ element: R, left: R.scrollLeft, top: R.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < H.length; v++) {
              var $ = H[v];
              (($.element.scrollLeft = $.left), ($.element.scrollTop = $.top));
            }
          }
          ((Ys = !!fu), (du = fu = null));
        } finally {
          ((Ce = c), (Z.p = n), (D.T = a));
        }
      }
      ((e.current = t), (gt = 2));
    }
  }
  function oh() {
    if (gt === 2) {
      gt = 0;
      var e = zn,
        t = si,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = D.T), (D.T = null));
        var n = Z.p;
        Z.p = 2;
        var c = Ce;
        Ce |= 4;
        try {
          Lm(e, t.alternate, t);
        } finally {
          ((Ce = c), (Z.p = n), (D.T = a));
        }
      }
      gt = 3;
    }
  }
  function rh() {
    if (gt === 4 || gt === 3) {
      ((gt = 0), Rt());
      var e = zn,
        t = si,
        a = cn,
        n = Wm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (gt = 5)
        : ((gt = 0), (si = zn = null), uh(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (
        (c === 0 && (Nn = null),
        Oe(a),
        (t = t.stateNode),
        yt && typeof yt.onCommitFiberRoot == 'function')
      )
        try {
          yt.onCommitFiberRoot(za, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = D.T), (c = Z.p), (Z.p = 2), (D.T = null));
        try {
          for (var r = e.onRecoverableError, h = 0; h < n.length; h++) {
            var v = n[h];
            r(v.value, { componentStack: v.stack });
          }
        } finally {
          ((D.T = t), (Z.p = c));
        }
      }
      ((cn & 3) !== 0 && Rs(),
        Ba(e),
        (c = e.pendingLanes),
        (a & 261930) !== 0 && (c & 42) !== 0 ? (e === Ir ? oc++ : ((oc = 0), (Ir = e))) : (oc = 0),
        rc(0));
    }
  }
  function uh(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Gi(t)));
  }
  function Rs() {
    return (sh(), oh(), rh(), fh());
  }
  function fh() {
    if (gt !== 5) return !1;
    var e = zn,
      t = Jr;
    Jr = 0;
    var a = Oe(cn),
      n = D.T,
      c = Z.p;
    try {
      ((Z.p = 32 > a ? 32 : a), (D.T = null), (a = Fr), (Fr = null));
      var r = zn,
        h = cn;
      if (((gt = 0), (si = zn = null), (cn = 0), (Ce & 6) !== 0)) throw Error(o(331));
      var v = Ce;
      if (
        ((Ce |= 4),
        Xm(r.current),
        Gm(r, r.current, h, a),
        (Ce = v),
        rc(0, !1),
        yt && typeof yt.onPostCommitFiberRoot == 'function')
      )
        try {
          yt.onPostCommitFiberRoot(za, r);
        } catch {}
      return !0;
    } finally {
      ((Z.p = c), (D.T = n), uh(e, t));
    }
  }
  function dh(e, t, a) {
    ((t = oa(a, t)),
      (t = zr(e.stateNode, t, 2)),
      (e = jn(e, t, 2)),
      e !== null && (J(e, 2), Ba(e)));
  }
  function $e(e, t, a) {
    if (e.tag === 3) dh(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          dh(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Nn === null || !Nn.has(n)))
          ) {
            ((e = oa(a, e)),
              (a = mm(2)),
              (n = jn(t, a, 2)),
              n !== null && (hm(a, n, t, e), J(n, 2), Ba(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function tu(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new oy();
      var c = new Set();
      n.set(t, c);
    } else ((c = n.get(t)), c === void 0 && ((c = new Set()), n.set(t, c)));
    c.has(a) || ((Kr = !0), c.add(a), (e = my.bind(null, e, t, a)), t.then(e, e));
  }
  function my(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ge === e &&
        (Se & a) === a &&
        (lt === 4 || (lt === 3 && (Se & 62914560) === Se && 300 > Be() - Ms)
          ? (Ce & 2) === 0 && oi(e, 0)
          : (Qr |= a),
        ci === Se && (ci = 0)),
      Ba(e));
  }
  function mh(e, t) {
    (t === 0 && (t = Ni()), (e = il(e, t)), e !== null && (J(e, t), Ba(e)));
  }
  function hy(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), mh(e, a));
  }
  function py(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode,
          c = e.memoizedState;
        c !== null && (a = c.retryLane);
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
    (n !== null && n.delete(t), mh(e, a));
  }
  function yy(e, t) {
    return Tt(e, t);
  }
  var Os = null,
    ui = null,
    au = !1,
    Ds = !1,
    nu = !1,
    Rn = 0;
  function Ba(e) {
    (e !== ui && e.next === null && (ui === null ? (Os = ui = e) : (ui = ui.next = e)),
      (Ds = !0),
      au || ((au = !0), vy()));
  }
  function rc(e, t) {
    if (!nu && Ds) {
      nu = !0;
      do
        for (var a = !1, n = Os; n !== null; ) {
          if (e !== 0) {
            var c = n.pendingLanes;
            if (c === 0) var r = 0;
            else {
              var h = n.suspendedLanes,
                v = n.pingedLanes;
              ((r = (1 << (31 - St(42 | e) + 1)) - 1),
                (r &= c & ~(h & ~v)),
                (r = r & 201326741 ? (r & 201326741) | 1 : r ? r | 2 : 0));
            }
            r !== 0 && ((a = !0), gh(n, r));
          } else
            ((r = Se),
              (r = Va(
                n,
                n === Ge ? r : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (r & 3) === 0 || In(n, r) || ((a = !0), gh(n, r)));
          n = n.next;
        }
      while (a);
      nu = !1;
    }
  }
  function gy() {
    hh();
  }
  function hh() {
    Ds = au = !1;
    var e = 0;
    Rn !== 0 && wy() && (e = Rn);
    for (var t = Be(), a = null, n = Os; n !== null; ) {
      var c = n.next,
        r = ph(n, t);
      (r === 0
        ? ((n.next = null), a === null ? (Os = c) : (a.next = c), c === null && (ui = a))
        : ((a = n), (e !== 0 || (r & 3) !== 0) && (Ds = !0)),
        (n = c));
    }
    ((gt !== 0 && gt !== 5) || rc(e), Rn !== 0 && (Rn = 0));
  }
  function ph(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        c = e.expirationTimes,
        r = e.pendingLanes & -62914561;
      0 < r;
    ) {
      var h = 31 - St(r),
        v = 1 << h,
        S = c[h];
      (S === -1
        ? ((v & a) === 0 || (v & n) !== 0) && (c[h] = Pn(v, t))
        : S <= t && (e.expiredLanes |= v),
        (r &= ~v));
    }
    if (
      ((t = Ge),
      (a = Se),
      (a = Va(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (Le === 2 || Le === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && He(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || In(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && He(n), Oe(a))) {
        case 2:
        case 8:
          a = Ha;
          break;
        case 32:
          a = hn;
          break;
        case 268435456:
          a = Jn;
          break;
        default:
          a = hn;
      }
      return (
        (n = yh.bind(null, e)),
        (a = Tt(a, n)),
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
  function yh(e, t) {
    if (gt !== 0 && gt !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (Rs() && e.callbackNode !== a) return null;
    var n = Se;
    return (
      (n = Va(e, e === Ge ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Fm(e, n, t),
          ph(e, Be()),
          e.callbackNode != null && e.callbackNode === a ? yh.bind(null, e) : null)
    );
  }
  function gh(e, t) {
    if (Rs()) return null;
    Fm(e, t, !0);
  }
  function vy() {
    zy(function () {
      (Ce & 6) !== 0 ? Tt(ka, gy) : hh();
    });
  }
  function lu() {
    if (Rn === 0) {
      var e = Wl;
      (e === 0 && ((e = Ua), (Ua <<= 1), (Ua & 261888) === 0 && (Ua = 256)), (Rn = e));
    }
    return Rn;
  }
  function vh(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Vc('' + e);
  }
  function _h(e, t) {
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
  function _y(e, t, a, n, c) {
    if (t === 'submit' && a && a.stateNode === c) {
      var r = vh((c[Mt] || null).action),
        h = n.submitter;
      h &&
        ((t = (t = h[Mt] || null) ? vh(t.formAction) : h.getAttribute('formAction')),
        t !== null && ((r = t), (h = null)));
      var v = new Xc('action', 'action', null, n, c);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (Rn !== 0) {
                  var S = h ? _h(c, h) : new FormData(c);
                  Ar(a, { pending: !0, data: S, method: c.method, action: r }, null, S);
                }
              } else
                typeof r == 'function' &&
                  (v.preventDefault(),
                  (S = h ? _h(c, h) : new FormData(c)),
                  Ar(a, { pending: !0, data: S, method: c.method, action: r }, r, S));
            },
            currentTarget: c,
          },
        ],
      });
    }
  }
  for (var iu = 0; iu < qo.length; iu++) {
    var cu = qo[iu],
      by = cu.toLowerCase(),
      Sy = cu[0].toUpperCase() + cu.slice(1);
    _a(by, 'on' + Sy);
  }
  (_a(Jf, 'onAnimationEnd'),
    _a(Ff, 'onAnimationIteration'),
    _a(If, 'onAnimationStart'),
    _a('dblclick', 'onDoubleClick'),
    _a('focusin', 'onFocus'),
    _a('focusout', 'onBlur'),
    _a($p, 'onTransitionRun'),
    _a(kp, 'onTransitionStart'),
    _a(Hp, 'onTransitionCancel'),
    _a(Pf, 'onTransitionEnd'),
    Bl('onMouseEnter', ['mouseout', 'mouseover']),
    Bl('onMouseLeave', ['mouseout', 'mouseover']),
    Bl('onPointerEnter', ['pointerout', 'pointerover']),
    Bl('onPointerLeave', ['pointerout', 'pointerover']),
    tl('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    tl(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    tl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    tl('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    tl(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    tl(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var uc =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    xy = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(uc)
    );
  function bh(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var n = e[a],
        c = n.event;
      n = n.listeners;
      e: {
        var r = void 0;
        if (t)
          for (var h = n.length - 1; 0 <= h; h--) {
            var v = n[h],
              S = v.instance,
              N = v.currentTarget;
            if (((v = v.listener), S !== r && c.isPropagationStopped())) break e;
            ((r = v), (c.currentTarget = N));
            try {
              r(c);
            } catch (B) {
              Wc(B);
            }
            ((c.currentTarget = null), (r = S));
          }
        else
          for (h = 0; h < n.length; h++) {
            if (
              ((v = n[h]),
              (S = v.instance),
              (N = v.currentTarget),
              (v = v.listener),
              S !== r && c.isPropagationStopped())
            )
              break e;
            ((r = v), (c.currentTarget = N));
            try {
              r(c);
            } catch (B) {
              Wc(B);
            }
            ((c.currentTarget = null), (r = S));
          }
      }
    }
  }
  function _e(e, t) {
    var a = t[_o];
    a === void 0 && (a = t[_o] = new Set());
    var n = e + '__bubble';
    a.has(n) || (Sh(t, e, 2, !1), a.add(n));
  }
  function su(e, t, a) {
    var n = 0;
    (t && (n |= 4), Sh(a, e, n, t));
  }
  var Bs = '_reactListening' + Math.random().toString(36).slice(2);
  function ou(e) {
    if (!e[Bs]) {
      ((e[Bs] = !0),
        hf.forEach(function (a) {
          a !== 'selectionchange' && (xy.has(a) || su(a, !1, e), su(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Bs] || ((t[Bs] = !0), su('selectionchange', !1, t));
    }
  }
  function Sh(e, t, a, n) {
    switch (Jh(t)) {
      case 2:
        var c = Jy;
        break;
      case 8:
        c = Fy;
        break;
      default:
        c = ju;
    }
    ((a = c.bind(null, t, a, e)),
      (c = void 0),
      !wo || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (c = !0),
      n
        ? c !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: c })
          : e.addEventListener(t, a, !0)
        : c !== void 0
          ? e.addEventListener(t, a, { passive: c })
          : e.addEventListener(t, a, !1));
  }
  function ru(e, t, a, n, c) {
    var r = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var h = n.tag;
        if (h === 3 || h === 4) {
          var v = n.stateNode.containerInfo;
          if (v === c) break;
          if (h === 4)
            for (h = n.return; h !== null; ) {
              var S = h.tag;
              if ((S === 3 || S === 4) && h.stateNode.containerInfo === c) return;
              h = h.return;
            }
          for (; v !== null; ) {
            if (((h = Rl(v)), h === null)) return;
            if (((S = h.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              n = r = h;
              continue e;
            }
            v = v.parentNode;
          }
        }
        n = n.return;
      }
    Mf(function () {
      var N = r,
        B = Mo(a),
        H = [];
      e: {
        var z = ed.get(e);
        if (z !== void 0) {
          var R = Xc,
            I = e;
          switch (e) {
            case 'keypress':
              if (Yc(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              R = pp;
              break;
            case 'focusin':
              ((I = 'focus'), (R = Ro));
              break;
            case 'focusout':
              ((I = 'blur'), (R = Ro));
              break;
            case 'beforeblur':
            case 'afterblur':
              R = Ro;
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
              R = Nf;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              R = np;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              R = vp;
              break;
            case Jf:
            case Ff:
            case If:
              R = cp;
              break;
            case Pf:
              R = bp;
              break;
            case 'scroll':
            case 'scrollend':
              R = tp;
              break;
            case 'wheel':
              R = xp;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              R = op;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              R = Cf;
              break;
            case 'toggle':
            case 'beforetoggle':
              R = Ap;
          }
          var oe = (t & 4) !== 0,
            Ve = !oe && (e === 'scroll' || e === 'scrollend'),
            T = oe ? (z !== null ? z + 'Capture' : null) : z;
          oe = [];
          for (var j = N, w; j !== null; ) {
            var $ = j;
            if (
              ((w = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                w === null ||
                T === null ||
                (($ = Ri(j, T)), $ != null && oe.push(fc(j, $, w))),
              Ve)
            )
              break;
            j = j.return;
          }
          0 < oe.length && ((z = new R(z, I, null, a, B)), H.push({ event: z, listeners: oe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((z = e === 'mouseover' || e === 'pointerover'),
            (R = e === 'mouseout' || e === 'pointerout'),
            z && a !== To && (I = a.relatedTarget || a.fromElement) && (Rl(I) || I[Ca]))
          )
            break e;
          if (
            (R || z) &&
            ((z =
              B.window === B
                ? B
                : (z = B.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            R
              ? ((I = a.relatedTarget || a.toElement),
                (R = N),
                (I = I ? Rl(I) : null),
                I !== null &&
                  ((Ve = d(I)), (oe = I.tag), I !== Ve || (oe !== 5 && oe !== 27 && oe !== 6)) &&
                  (I = null))
              : ((R = null), (I = N)),
            R !== I)
          ) {
            if (
              ((oe = Nf),
              ($ = 'onMouseLeave'),
              (T = 'onMouseEnter'),
              (j = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((oe = Cf), ($ = 'onPointerLeave'), (T = 'onPointerEnter'), (j = 'pointer')),
              (Ve = R == null ? z : Ci(R)),
              (w = I == null ? z : Ci(I)),
              (z = new oe($, j + 'leave', R, a, B)),
              (z.target = Ve),
              (z.relatedTarget = w),
              ($ = null),
              Rl(B) === N &&
                ((oe = new oe(T, j + 'enter', I, a, B)),
                (oe.target = w),
                (oe.relatedTarget = Ve),
                ($ = oe)),
              (Ve = $),
              R && I)
            )
              t: {
                for (oe = jy, T = R, j = I, w = 0, $ = T; $; $ = oe($)) w++;
                $ = 0;
                for (var le = j; le; le = oe(le)) $++;
                for (; 0 < w - $; ) ((T = oe(T)), w--);
                for (; 0 < $ - w; ) ((j = oe(j)), $--);
                for (; w--; ) {
                  if (T === j || (j !== null && T === j.alternate)) {
                    oe = T;
                    break t;
                  }
                  ((T = oe(T)), (j = oe(j)));
                }
                oe = null;
              }
            else oe = null;
            (R !== null && xh(H, z, R, oe, !1), I !== null && Ve !== null && xh(H, Ve, I, oe, !0));
          }
        }
        e: {
          if (
            ((z = N ? Ci(N) : window),
            (R = z.nodeName && z.nodeName.toLowerCase()),
            R === 'select' || (R === 'input' && z.type === 'file'))
          )
            var Ne = Hf;
          else if ($f(z))
            if (Uf) Ne = Dp;
            else {
              Ne = Rp;
              var te = Cp;
            }
          else
            ((R = z.nodeName),
              !R || R.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? N && Ao(N.elementType) && (Ne = Hf)
                : (Ne = Op));
          if (Ne && (Ne = Ne(e, N))) {
            kf(H, Ne, a, B);
            break e;
          }
          (te && te(e, z, N),
            e === 'focusout' &&
              N &&
              z.type === 'number' &&
              N.memoizedProps.value != null &&
              jo(z, 'number', z.value));
        }
        switch (((te = N ? Ci(N) : window), e)) {
          case 'focusin':
            ($f(te) || te.contentEditable === 'true') && ((ql = te), (ko = N), (Ui = null));
            break;
          case 'focusout':
            Ui = ko = ql = null;
            break;
          case 'mousedown':
            Ho = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Ho = !1), Qf(H, a, B));
            break;
          case 'selectionchange':
            if (Lp) break;
          case 'keydown':
          case 'keyup':
            Qf(H, a, B);
        }
        var pe;
        if (Do)
          e: {
            switch (e) {
              case 'compositionstart':
                var xe = 'onCompositionStart';
                break e;
              case 'compositionend':
                xe = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                xe = 'onCompositionUpdate';
                break e;
            }
            xe = void 0;
          }
        else
          Ul
            ? Bf(e, a) && (xe = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (xe = 'onCompositionStart');
        (xe &&
          (Rf &&
            a.locale !== 'ko' &&
            (Ul || xe !== 'onCompositionStart'
              ? xe === 'onCompositionEnd' && Ul && (pe = Ef())
              : ((yn = B), (No = 'value' in yn ? yn.value : yn.textContent), (Ul = !0))),
          (te = Ls(N, xe)),
          0 < te.length &&
            ((xe = new zf(xe, e, null, a, B)),
            H.push({ event: xe, listeners: te }),
            pe ? (xe.data = pe) : ((pe = Lf(a)), pe !== null && (xe.data = pe)))),
          (pe = Mp ? Ep(e, a) : wp(e, a)) &&
            ((xe = Ls(N, 'onBeforeInput')),
            0 < xe.length &&
              ((te = new zf('onBeforeInput', 'beforeinput', null, a, B)),
              H.push({ event: te, listeners: xe }),
              (te.data = pe))),
          _y(H, e, N, a, B));
      }
      bh(H, t);
    });
  }
  function fc(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function Ls(e, t) {
    for (var a = t + 'Capture', n = []; e !== null; ) {
      var c = e,
        r = c.stateNode;
      if (
        ((c = c.tag),
        (c !== 5 && c !== 26 && c !== 27) ||
          r === null ||
          ((c = Ri(e, a)),
          c != null && n.unshift(fc(e, c, r)),
          (c = Ri(e, t)),
          c != null && n.push(fc(e, c, r))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function jy(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function xh(e, t, a, n, c) {
    for (var r = t._reactName, h = []; a !== null && a !== n; ) {
      var v = a,
        S = v.alternate,
        N = v.stateNode;
      if (((v = v.tag), S !== null && S === n)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        N === null ||
        ((S = N),
        c
          ? ((N = Ri(a, r)), N != null && h.unshift(fc(a, N, S)))
          : c || ((N = Ri(a, r)), N != null && h.push(fc(a, N, S)))),
        (a = a.return));
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var Ay = /\r\n?/g,
    Ty = /\u0000|\uFFFD/g;
  function jh(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Ay,
        `
`
      )
      .replace(Ty, '');
  }
  function Ah(e, t) {
    return ((t = jh(t)), jh(e) === t);
  }
  function qe(e, t, a, n, c, r) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || $l(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && $l(e, '' + n);
        break;
      case 'className':
        Uc(e, 'class', n);
        break;
      case 'tabIndex':
        Uc(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Uc(e, a, n);
        break;
      case 'style':
        Af(e, n, r);
        break;
      case 'data':
        if (t !== 'object') {
          Uc(e, 'data', n);
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
        ((n = Vc('' + n)), e.setAttribute(a, n));
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
          typeof r == 'function' &&
            (a === 'formAction'
              ? (t !== 'input' && qe(e, t, 'name', c.name, c, null),
                qe(e, t, 'formEncType', c.formEncType, c, null),
                qe(e, t, 'formMethod', c.formMethod, c, null),
                qe(e, t, 'formTarget', c.formTarget, c, null))
              : (qe(e, t, 'encType', c.encType, c, null),
                qe(e, t, 'method', c.method, c, null),
                qe(e, t, 'target', c.target, c, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = Vc('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = Ya);
        break;
      case 'onScroll':
        n != null && _e('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && _e('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(o(61));
          if (((a = n.__html), a != null)) {
            if (c.children != null) throw Error(o(60));
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
        ((a = Vc('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (_e('beforetoggle', e), _e('toggle', e), Hc(e, 'popover', n));
        break;
      case 'xlinkActuate':
        Ga(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        Ga(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        Ga(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        Ga(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        Ga(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        Ga(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        Ga(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        Ga(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        Ga(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Hc(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = P1.get(a) || a), Hc(e, a, n));
    }
  }
  function uu(e, t, a, n, c, r) {
    switch (a) {
      case 'style':
        Af(e, n, r);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(o(61));
          if (((a = n.__html), a != null)) {
            if (c.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? $l(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && $l(e, '' + n);
        break;
      case 'onScroll':
        n != null && _e('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && _e('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = Ya);
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
        if (!pf.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((c = a.endsWith('Capture')),
              (t = a.slice(2, c ? a.length - 7 : void 0)),
              (r = e[Mt] || null),
              (r = r != null ? r[a] : null),
              typeof r == 'function' && e.removeEventListener(t, r, c),
              typeof n == 'function')
            ) {
              (typeof r != 'function' &&
                r !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, n, c));
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
        (_e('error', e), _e('load', e));
        var n = !1,
          c = !1,
          r;
        for (r in a)
          if (a.hasOwnProperty(r)) {
            var h = a[r];
            if (h != null)
              switch (r) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  c = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(o(137, t));
                default:
                  qe(e, t, r, h, a, null);
              }
          }
        (c && qe(e, t, 'srcSet', a.srcSet, a, null), n && qe(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        _e('invalid', e);
        var v = (r = h = c = null),
          S = null,
          N = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var B = a[n];
            if (B != null)
              switch (n) {
                case 'name':
                  c = B;
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
                  r = B;
                  break;
                case 'defaultValue':
                  v = B;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (B != null) throw Error(o(137, t));
                  break;
                default:
                  qe(e, t, n, B, a, null);
              }
          }
        bf(e, r, v, S, N, h, c, !1);
        return;
      case 'select':
        (_e('invalid', e), (n = h = r = null));
        for (c in a)
          if (a.hasOwnProperty(c) && ((v = a[c]), v != null))
            switch (c) {
              case 'value':
                r = v;
                break;
              case 'defaultValue':
                h = v;
                break;
              case 'multiple':
                n = v;
              default:
                qe(e, t, c, v, a, null);
            }
        ((t = r),
          (a = h),
          (e.multiple = !!n),
          t != null ? Ll(e, !!n, t, !1) : a != null && Ll(e, !!n, a, !0));
        return;
      case 'textarea':
        (_e('invalid', e), (r = c = n = null));
        for (h in a)
          if (a.hasOwnProperty(h) && ((v = a[h]), v != null))
            switch (h) {
              case 'value':
                n = v;
                break;
              case 'defaultValue':
                c = v;
                break;
              case 'children':
                r = v;
                break;
              case 'dangerouslySetInnerHTML':
                if (v != null) throw Error(o(91));
                break;
              default:
                qe(e, t, h, v, a, null);
            }
        xf(e, n, c, r);
        return;
      case 'option':
        for (S in a)
          if (a.hasOwnProperty(S) && ((n = a[S]), n != null))
            switch (S) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                qe(e, t, S, n, a, null);
            }
        return;
      case 'dialog':
        (_e('beforetoggle', e), _e('toggle', e), _e('cancel', e), _e('close', e));
        break;
      case 'iframe':
      case 'object':
        _e('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < uc.length; n++) _e(uc[n], e);
        break;
      case 'image':
        (_e('error', e), _e('load', e));
        break;
      case 'details':
        _e('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (_e('error', e), _e('load', e));
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
                qe(e, t, N, n, a, null);
            }
        return;
      default:
        if (Ao(t)) {
          for (B in a)
            a.hasOwnProperty(B) && ((n = a[B]), n !== void 0 && uu(e, t, B, n, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((n = a[v]), n != null && qe(e, t, v, n, a, null));
  }
  function My(e, t, a, n) {
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
        var c = null,
          r = null,
          h = null,
          v = null,
          S = null,
          N = null,
          B = null;
        for (R in a) {
          var H = a[R];
          if (a.hasOwnProperty(R) && H != null)
            switch (R) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                S = H;
              default:
                n.hasOwnProperty(R) || qe(e, t, R, null, n, H);
            }
        }
        for (var z in n) {
          var R = n[z];
          if (((H = a[z]), n.hasOwnProperty(z) && (R != null || H != null)))
            switch (z) {
              case 'type':
                r = R;
                break;
              case 'name':
                c = R;
                break;
              case 'checked':
                N = R;
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
                if (R != null) throw Error(o(137, t));
                break;
              default:
                R !== H && qe(e, t, z, R, n, H);
            }
        }
        xo(e, h, v, S, N, B, r, c);
        return;
      case 'select':
        R = h = v = z = null;
        for (r in a)
          if (((S = a[r]), a.hasOwnProperty(r) && S != null))
            switch (r) {
              case 'value':
                break;
              case 'multiple':
                R = S;
              default:
                n.hasOwnProperty(r) || qe(e, t, r, null, n, S);
            }
        for (c in n)
          if (((r = n[c]), (S = a[c]), n.hasOwnProperty(c) && (r != null || S != null)))
            switch (c) {
              case 'value':
                z = r;
                break;
              case 'defaultValue':
                v = r;
                break;
              case 'multiple':
                h = r;
              default:
                r !== S && qe(e, t, c, r, n, S);
            }
        ((t = v),
          (a = h),
          (n = R),
          z != null
            ? Ll(e, !!a, z, !1)
            : !!n != !!a && (t != null ? Ll(e, !!a, t, !0) : Ll(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        R = z = null;
        for (v in a)
          if (((c = a[v]), a.hasOwnProperty(v) && c != null && !n.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                qe(e, t, v, null, n, c);
            }
        for (h in n)
          if (((c = n[h]), (r = a[h]), n.hasOwnProperty(h) && (c != null || r != null)))
            switch (h) {
              case 'value':
                z = c;
                break;
              case 'defaultValue':
                R = c;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (c != null) throw Error(o(91));
                break;
              default:
                c !== r && qe(e, t, h, c, n, r);
            }
        Sf(e, z, R);
        return;
      case 'option':
        for (var I in a)
          if (((z = a[I]), a.hasOwnProperty(I) && z != null && !n.hasOwnProperty(I)))
            switch (I) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                qe(e, t, I, null, n, z);
            }
        for (S in n)
          if (((z = n[S]), (R = a[S]), n.hasOwnProperty(S) && z !== R && (z != null || R != null)))
            switch (S) {
              case 'selected':
                e.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                qe(e, t, S, z, n, R);
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
        for (var oe in a)
          ((z = a[oe]),
            a.hasOwnProperty(oe) && z != null && !n.hasOwnProperty(oe) && qe(e, t, oe, null, n, z));
        for (N in n)
          if (((z = n[N]), (R = a[N]), n.hasOwnProperty(N) && z !== R && (z != null || R != null)))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(o(137, t));
                break;
              default:
                qe(e, t, N, z, n, R);
            }
        return;
      default:
        if (Ao(t)) {
          for (var Ve in a)
            ((z = a[Ve]),
              a.hasOwnProperty(Ve) &&
                z !== void 0 &&
                !n.hasOwnProperty(Ve) &&
                uu(e, t, Ve, void 0, n, z));
          for (B in n)
            ((z = n[B]),
              (R = a[B]),
              !n.hasOwnProperty(B) ||
                z === R ||
                (z === void 0 && R === void 0) ||
                uu(e, t, B, z, n, R));
          return;
        }
    }
    for (var T in a)
      ((z = a[T]),
        a.hasOwnProperty(T) && z != null && !n.hasOwnProperty(T) && qe(e, t, T, null, n, z));
    for (H in n)
      ((z = n[H]),
        (R = a[H]),
        !n.hasOwnProperty(H) || z === R || (z == null && R == null) || qe(e, t, H, z, n, R));
  }
  function Th(e) {
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
  function Ey() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var c = a[n],
          r = c.transferSize,
          h = c.initiatorType,
          v = c.duration;
        if (r && v && Th(h)) {
          for (h = 0, v = c.responseEnd, n += 1; n < a.length; n++) {
            var S = a[n],
              N = S.startTime;
            if (N > v) break;
            var B = S.transferSize,
              H = S.initiatorType;
            B && Th(H) && ((S = S.responseEnd), (h += B * (S < v ? 1 : (v - N) / (S - N))));
          }
          if ((--n, (t += (8 * (r + h)) / (c.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var fu = null,
    du = null;
  function $s(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Mh(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Eh(e, t) {
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
  function mu(e, t) {
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
  var hu = null;
  function wy() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === hu ? !1 : ((hu = e), !0)) : ((hu = null), !1);
  }
  var wh = typeof setTimeout == 'function' ? setTimeout : void 0,
    Ny = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Nh = typeof Promise == 'function' ? Promise : void 0,
    zy =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Nh < 'u'
          ? function (e) {
              return Nh.resolve(null).then(e).catch(Cy);
            }
          : wh;
  function Cy(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function On(e) {
    return e === 'head';
  }
  function zh(e, t) {
    var a = t,
      n = 0;
    do {
      var c = a.nextSibling;
      if ((e.removeChild(a), c && c.nodeType === 8))
        if (((a = c.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (e.removeChild(c), hi(t));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') dc(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), dc(a));
          for (var r = a.firstChild; r; ) {
            var h = r.nextSibling,
              v = r.nodeName;
            (r[zi] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && r.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(r),
              (r = h));
          }
        } else a === 'body' && dc(e.ownerDocument.body);
      a = c;
    } while (a);
    hi(t);
  }
  function Ch(e, t) {
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
  function pu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (pu(a), bo(a));
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
  function Ry(e, t, a, n) {
    for (; e.nodeType === 1; ) {
      var c = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[zi])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((r = e.getAttribute('rel')),
                r === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                r !== c.rel ||
                e.getAttribute('href') !== (c.href == null || c.href === '' ? null : c.href) ||
                e.getAttribute('crossorigin') !== (c.crossOrigin == null ? null : c.crossOrigin) ||
                e.getAttribute('title') !== (c.title == null ? null : c.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((r = e.getAttribute('src')),
                (r !== (c.src == null ? null : c.src) ||
                  e.getAttribute('type') !== (c.type == null ? null : c.type) ||
                  e.getAttribute('crossorigin') !==
                    (c.crossOrigin == null ? null : c.crossOrigin)) &&
                  r &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var r = c.name == null ? null : '' + c.name;
        if (c.type === 'hidden' && e.getAttribute('name') === r) return e;
      } else return e;
      if (((e = ma(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Oy(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = ma(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Rh(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = ma(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function yu(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function gu(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function Dy(e, t) {
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
  function ma(e) {
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
  var vu = null;
  function Oh(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '/$' || a === '/&') {
          if (t === 0) return ma(e.nextSibling);
          t--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Dh(e) {
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
  function Bh(e, t, a) {
    switch (((t = $s(a)), e)) {
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
  function dc(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    bo(e);
  }
  var ha = new Map(),
    Lh = new Set();
  function ks(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var sn = Z.d;
  Z.d = { f: By, r: Ly, D: $y, C: ky, L: Hy, m: Uy, X: Vy, S: qy, M: Gy };
  function By() {
    var e = sn.f(),
      t = Ns();
    return e || t;
  }
  function Ly(e) {
    var t = Ol(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Pd(t) : sn.r(e);
  }
  var fi = typeof document > 'u' ? null : document;
  function $h(e, t, a) {
    var n = fi;
    if (n && typeof t == 'string' && t) {
      var c = ca(t);
      ((c = 'link[rel="' + e + '"][href="' + c + '"]'),
        typeof a == 'string' && (c += '[crossorigin="' + a + '"]'),
        Lh.has(c) ||
          (Lh.add(c),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(c) === null &&
            ((t = n.createElement('link')), zt(t, 'link', e), xt(t), n.head.appendChild(t))));
    }
  }
  function $y(e) {
    (sn.D(e), $h('dns-prefetch', e, null));
  }
  function ky(e, t) {
    (sn.C(e, t), $h('preconnect', e, t));
  }
  function Hy(e, t, a) {
    sn.L(e, t, a);
    var n = fi;
    if (n && e && t) {
      var c = 'link[rel="preload"][as="' + ca(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((c += '[imagesrcset="' + ca(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (c += '[imagesizes="' + ca(a.imageSizes) + '"]'))
        : (c += '[href="' + ca(e) + '"]');
      var r = c;
      switch (t) {
        case 'style':
          r = di(e);
          break;
        case 'script':
          r = mi(e);
      }
      ha.has(r) ||
        ((e = b(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        ha.set(r, e),
        n.querySelector(c) !== null ||
          (t === 'style' && n.querySelector(mc(r))) ||
          (t === 'script' && n.querySelector(hc(r))) ||
          ((t = n.createElement('link')), zt(t, 'link', e), xt(t), n.head.appendChild(t)));
    }
  }
  function Uy(e, t) {
    sn.m(e, t);
    var a = fi;
    if (a && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        c = 'link[rel="modulepreload"][as="' + ca(n) + '"][href="' + ca(e) + '"]',
        r = c;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          r = mi(e);
      }
      if (
        !ha.has(r) &&
        ((e = b({ rel: 'modulepreload', href: e }, t)), ha.set(r, e), a.querySelector(c) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(hc(r))) return;
        }
        ((n = a.createElement('link')), zt(n, 'link', e), xt(n), a.head.appendChild(n));
      }
    }
  }
  function qy(e, t, a) {
    sn.S(e, t, a);
    var n = fi;
    if (n && e) {
      var c = Dl(n).hoistableStyles,
        r = di(e);
      t = t || 'default';
      var h = c.get(r);
      if (!h) {
        var v = { loading: 0, preload: null };
        if ((h = n.querySelector(mc(r)))) v.loading = 5;
        else {
          ((e = b({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = ha.get(r)) && _u(e, a));
          var S = (h = n.createElement('link'));
          (xt(S),
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
        ((h = { type: 'stylesheet', instance: h, count: 1, state: v }), c.set(r, h));
      }
    }
  }
  function Vy(e, t) {
    sn.X(e, t);
    var a = fi;
    if (a && e) {
      var n = Dl(a).hoistableScripts,
        c = mi(e),
        r = n.get(c);
      r ||
        ((r = a.querySelector(hc(c))),
        r ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = ha.get(c)) && bu(e, t),
          (r = a.createElement('script')),
          xt(r),
          zt(r, 'link', e),
          a.head.appendChild(r)),
        (r = { type: 'script', instance: r, count: 1, state: null }),
        n.set(c, r));
    }
  }
  function Gy(e, t) {
    sn.M(e, t);
    var a = fi;
    if (a && e) {
      var n = Dl(a).hoistableScripts,
        c = mi(e),
        r = n.get(c);
      r ||
        ((r = a.querySelector(hc(c))),
        r ||
          ((e = b({ src: e, async: !0, type: 'module' }, t)),
          (t = ha.get(c)) && bu(e, t),
          (r = a.createElement('script')),
          xt(r),
          zt(r, 'link', e),
          a.head.appendChild(r)),
        (r = { type: 'script', instance: r, count: 1, state: null }),
        n.set(c, r));
    }
  }
  function kh(e, t, a, n) {
    var c = (c = me.current) ? ks(c) : null;
    if (!c) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = di(a.href)),
            (a = Dl(c).hoistableStyles),
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
          e = di(a.href);
          var r = Dl(c).hoistableStyles,
            h = r.get(e);
          if (
            (h ||
              ((c = c.ownerDocument || c),
              (h = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              r.set(e, h),
              (r = c.querySelector(mc(e))) && !r._p && ((h.instance = r), (h.state.loading = 5)),
              ha.has(e) ||
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
                ha.set(e, a),
                r || Yy(c, e, a, h.state))),
            t && n === null)
          )
            throw Error(o(528, ''));
          return h;
        }
        if (t && n !== null) throw Error(o(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = mi(a)),
              (a = Dl(c).hoistableScripts),
              (n = a.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function di(e) {
    return 'href="' + ca(e) + '"';
  }
  function mc(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Hh(e) {
    return b({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function Yy(e, t, a, n) {
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
        xt(t),
        e.head.appendChild(t));
  }
  function mi(e) {
    return '[src="' + ca(e) + '"]';
  }
  function hc(e) {
    return 'script[async]' + e;
  }
  function Uh(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + ca(a.href) + '"]');
          if (n) return ((t.instance = n), xt(n), n);
          var c = b({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            xt(n),
            zt(n, 'style', c),
            Hs(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          c = di(a.href);
          var r = e.querySelector(mc(c));
          if (r) return ((t.state.loading |= 4), (t.instance = r), xt(r), r);
          ((n = Hh(a)),
            (c = ha.get(c)) && _u(n, c),
            (r = (e.ownerDocument || e).createElement('link')),
            xt(r));
          var h = r;
          return (
            (h._p = new Promise(function (v, S) {
              ((h.onload = v), (h.onerror = S));
            })),
            zt(r, 'link', n),
            (t.state.loading |= 4),
            Hs(r, a.precedence, e),
            (t.instance = r)
          );
        case 'script':
          return (
            (r = mi(a.src)),
            (c = e.querySelector(hc(r)))
              ? ((t.instance = c), xt(c), c)
              : ((n = a),
                (c = ha.get(r)) && ((n = b({}, a)), bu(n, c)),
                (e = e.ownerDocument || e),
                (c = e.createElement('script')),
                xt(c),
                zt(c, 'link', n),
                e.head.appendChild(c),
                (t.instance = c))
          );
        case 'void':
          return null;
        default:
          throw Error(o(443, t.type));
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
        c = n.length ? n[n.length - 1] : null,
        r = c,
        h = 0;
      h < n.length;
      h++
    ) {
      var v = n[h];
      if (v.dataset.precedence === t) r = v;
      else if (r !== c) break;
    }
    r
      ? r.parentNode.insertBefore(e, r.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function _u(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function bu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Us = null;
  function qh(e, t, a) {
    if (Us === null) {
      var n = new Map(),
        c = (Us = new Map());
      c.set(a, n);
    } else ((c = Us), (n = c.get(a)), n || ((n = new Map()), c.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), c = 0; c < a.length; c++) {
      var r = a[c];
      if (
        !(r[zi] || r[tt] || (e === 'link' && r.getAttribute('rel') === 'stylesheet')) &&
        r.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var h = r.getAttribute(t) || '';
        h = e + h;
        var v = n.get(h);
        v ? v.push(r) : n.set(h, [r]);
      }
    }
    return n;
  }
  function Vh(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function Zy(e, t, a) {
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
  function Gh(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function Xy(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var c = di(n.href),
          r = t.querySelector(mc(c));
        if (r) {
          ((t = r._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = qs.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = r),
            xt(r));
          return;
        }
        ((r = t.ownerDocument || t),
          (n = Hh(n)),
          (c = ha.get(c)) && _u(n, c),
          (r = r.createElement('link')),
          xt(r));
        var h = r;
        ((h._p = new Promise(function (v, S) {
          ((h.onload = v), (h.onerror = S));
        })),
          zt(r, 'link', n),
          (a.instance = r));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = qs.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var Su = 0;
  function Ky(e, t) {
    return (
      e.stylesheets && e.count === 0 && Gs(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Gs(e, e.stylesheets), e.unsuspend)) {
                var r = e.unsuspend;
                ((e.unsuspend = null), r());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Su === 0 && (Su = 62500 * Ey());
            var c = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Gs(e, e.stylesheets), e.unsuspend))
                ) {
                  var r = e.unsuspend;
                  ((e.unsuspend = null), r());
                }
              },
              (e.imgBytes > Su ? 50 : 800) + t
            );
            return (
              (e.unsuspend = a),
              function () {
                ((e.unsuspend = null), clearTimeout(n), clearTimeout(c));
              }
            );
          }
        : null
    );
  }
  function qs() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Gs(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Vs = null;
  function Gs(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Vs = new Map()), t.forEach(Qy, e), (Vs = null), qs.call(e)));
  }
  function Qy(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Vs.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), Vs.set(e, a));
        for (
          var c = e.querySelectorAll('link[data-precedence],style[data-precedence]'), r = 0;
          r < c.length;
          r++
        ) {
          var h = c[r];
          (h.nodeName === 'LINK' || h.getAttribute('media') !== 'not all') &&
            (a.set(h.dataset.precedence, h), (n = h));
        }
        n && a.set(null, n);
      }
      ((c = t.instance),
        (h = c.getAttribute('data-precedence')),
        (r = a.get(h) || n),
        r === n && a.set(null, c),
        a.set(h, c),
        this.count++,
        (n = qs.bind(this)),
        c.addEventListener('load', n),
        c.addEventListener('error', n),
        r
          ? r.parentNode.insertBefore(c, r.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(c, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var pc = {
    $$typeof: se,
    Provider: null,
    Consumer: null,
    _currentValue: ie,
    _currentValue2: ie,
    _threadCount: 0,
  };
  function Wy(e, t, a, n, c, r, h, v, S) {
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
      (this.expirationTimes = el(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = el(0)),
      (this.hiddenUpdates = el(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = c),
      (this.onCaughtError = r),
      (this.onRecoverableError = h),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = S),
      (this.incompleteTransitions = new Map()));
  }
  function Yh(e, t, a, n, c, r, h, v, S, N, B, H) {
    return (
      (e = new Wy(e, t, a, h, S, N, B, H, v)),
      (t = 1),
      r === !0 && (t |= 24),
      (r = Qt(3, null, null, t)),
      (e.current = r),
      (r.stateNode = e),
      (t = er()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (r.memoizedState = { element: n, isDehydrated: a, cache: t }),
      lr(r),
      e
    );
  }
  function Zh(e) {
    return e ? ((e = Yl), e) : Yl;
  }
  function Xh(e, t, a, n, c, r) {
    ((c = Zh(c)),
      n.context === null ? (n.context = c) : (n.pendingContext = c),
      (n = xn(t)),
      (n.payload = { element: a }),
      (r = r === void 0 ? null : r),
      r !== null && (n.callback = r),
      (a = jn(e, n, t)),
      a !== null && (Xt(a, e, t), Ki(a, e, t)));
  }
  function Kh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function xu(e, t) {
    (Kh(e, t), (e = e.alternate) && Kh(e, t));
  }
  function Qh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = il(e, 67108864);
      (t !== null && Xt(t, e, 67108864), xu(e, 67108864));
    }
  }
  function Wh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Pt();
      t = kt(t);
      var a = il(e, t);
      (a !== null && Xt(a, e, t), xu(e, t));
    }
  }
  var Ys = !0;
  function Jy(e, t, a, n) {
    var c = D.T;
    D.T = null;
    var r = Z.p;
    try {
      ((Z.p = 2), ju(e, t, a, n));
    } finally {
      ((Z.p = r), (D.T = c));
    }
  }
  function Fy(e, t, a, n) {
    var c = D.T;
    D.T = null;
    var r = Z.p;
    try {
      ((Z.p = 8), ju(e, t, a, n));
    } finally {
      ((Z.p = r), (D.T = c));
    }
  }
  function ju(e, t, a, n) {
    if (Ys) {
      var c = Au(n);
      if (c === null) (ru(e, t, n, Zs, a), Fh(e, n));
      else if (Py(c, e, t, a, n)) n.stopPropagation();
      else if ((Fh(e, n), t & 4 && -1 < Iy.indexOf(e))) {
        for (; c !== null; ) {
          var r = Ol(c);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (((r = r.stateNode), r.current.memoizedState.isDehydrated)) {
                  var h = la(r.pendingLanes);
                  if (h !== 0) {
                    var v = r;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; h; ) {
                      var S = 1 << (31 - St(h));
                      ((v.entanglements[1] |= S), (h &= ~S));
                    }
                    (Ba(r), (Ce & 6) === 0 && ((Es = Be() + 500), rc(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = il(r, 2)), v !== null && Xt(v, r, 2), Ns(), xu(r, 2));
            }
          if (((r = Au(n)), r === null && ru(e, t, n, Zs, a), r === c)) break;
          c = r;
        }
        c !== null && n.stopPropagation();
      } else ru(e, t, n, null, a);
    }
  }
  function Au(e) {
    return ((e = Mo(e)), Tu(e));
  }
  var Zs = null;
  function Tu(e) {
    if (((Zs = null), (e = Rl(e)), e !== null)) {
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
    return ((Zs = e), null);
  }
  function Jh(e) {
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
        switch (na()) {
          case ka:
            return 2;
          case Ha:
            return 8;
          case hn:
          case Ei:
            return 32;
          case Jn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Mu = !1,
    Dn = null,
    Bn = null,
    Ln = null,
    yc = new Map(),
    gc = new Map(),
    $n = [],
    Iy =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Fh(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Dn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Bn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Ln = null;
        break;
      case 'pointerover':
      case 'pointerout':
        yc.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        gc.delete(t.pointerId);
    }
  }
  function vc(e, t, a, n, c, r) {
    return e === null || e.nativeEvent !== r
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: r,
          targetContainers: [c],
        }),
        t !== null && ((t = Ol(t)), t !== null && Qh(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        c !== null && t.indexOf(c) === -1 && t.push(c),
        e);
  }
  function Py(e, t, a, n, c) {
    switch (t) {
      case 'focusin':
        return ((Dn = vc(Dn, e, t, a, n, c)), !0);
      case 'dragenter':
        return ((Bn = vc(Bn, e, t, a, n, c)), !0);
      case 'mouseover':
        return ((Ln = vc(Ln, e, t, a, n, c)), !0);
      case 'pointerover':
        var r = c.pointerId;
        return (yc.set(r, vc(yc.get(r) || null, e, t, a, n, c)), !0);
      case 'gotpointercapture':
        return ((r = c.pointerId), gc.set(r, vc(gc.get(r) || null, e, t, a, n, c)), !0);
    }
    return !1;
  }
  function Ih(e) {
    var t = Rl(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = m(a)), t !== null)) {
            ((e.blockedOn = t),
              be(e.priority, function () {
                Wh(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = p(a)), t !== null)) {
            ((e.blockedOn = t),
              be(e.priority, function () {
                Wh(a);
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
  function Xs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Au(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((To = n), a.target.dispatchEvent(n), (To = null));
      } else return ((t = Ol(a)), t !== null && Qh(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function Ph(e, t, a) {
    Xs(e) && a.delete(t);
  }
  function eg() {
    ((Mu = !1),
      Dn !== null && Xs(Dn) && (Dn = null),
      Bn !== null && Xs(Bn) && (Bn = null),
      Ln !== null && Xs(Ln) && (Ln = null),
      yc.forEach(Ph),
      gc.forEach(Ph));
  }
  function Ks(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Mu || ((Mu = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, eg)));
  }
  var Qs = null;
  function e0(e) {
    Qs !== e &&
      ((Qs = e),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        Qs === e && (Qs = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            c = e[t + 2];
          if (typeof n != 'function') {
            if (Tu(n || a) === null) continue;
            break;
          }
          var r = Ol(a);
          r !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Ar(r, { pending: !0, data: c, method: a.method, action: n }, n, c));
        }
      }));
  }
  function hi(e) {
    function t(S) {
      return Ks(S, e);
    }
    (Dn !== null && Ks(Dn, e),
      Bn !== null && Ks(Bn, e),
      Ln !== null && Ks(Ln, e),
      yc.forEach(t),
      gc.forEach(t));
    for (var a = 0; a < $n.length; a++) {
      var n = $n[a];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < $n.length && ((a = $n[0]), a.blockedOn === null); )
      (Ih(a), a.blockedOn === null && $n.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var c = a[n],
          r = a[n + 1],
          h = c[Mt] || null;
        if (typeof r == 'function') h || e0(a);
        else if (h) {
          var v = null;
          if (r && r.hasAttribute('formAction')) {
            if (((c = r), (h = r[Mt] || null))) v = h.formAction;
            else if (Tu(c) !== null) continue;
          } else v = h.action;
          (typeof v == 'function' ? (a[n + 1] = v) : (a.splice(n, 3), (n -= 3)), e0(a));
        }
      }
  }
  function t0() {
    function e(r) {
      r.canIntercept &&
        r.info === 'react-transition' &&
        r.intercept({
          handler: function () {
            return new Promise(function (h) {
              return (c = h);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (c !== null && (c(), (c = null)), n || setTimeout(a, 20));
    }
    function a() {
      if (!n && !navigation.transition) {
        var r = navigation.currentEntry;
        r &&
          r.url != null &&
          navigation.navigate(r.url, {
            state: r.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var n = !1,
        c = null;
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
            c !== null && (c(), (c = null)));
        }
      );
    }
  }
  function Eu(e) {
    this._internalRoot = e;
  }
  ((Ws.prototype.render = Eu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var a = t.current,
        n = Pt();
      Xh(a, n, e, t, null, null);
    }),
    (Ws.prototype.unmount = Eu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Xh(e.current, 2, null, e, null, null), Ns(), (t[Ca] = null));
        }
      }));
  function Ws(e) {
    this._internalRoot = e;
  }
  Ws.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = ye();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < $n.length && t !== 0 && t < $n[a].priority; a++);
      ($n.splice(a, 0, e), a === 0 && Ih(e));
    }
  };
  var a0 = i.version;
  if (a0 !== '19.2.5') throw Error(o(527, a0, '19.2.5'));
  Z.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return ((e = y(t)), (e = e !== null ? _(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var tg = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: D,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Js = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Js.isDisabled && Js.supportsFiber)
      try {
        ((za = Js.inject(tg)), (yt = Js));
      } catch {}
  }
  return (
    (bc.createRoot = function (e, t) {
      if (!f(e)) throw Error(o(299));
      var a = !1,
        n = '',
        c = rm,
        r = um,
        h = fm;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (c = t.onUncaughtError),
          t.onCaughtError !== void 0 && (r = t.onCaughtError),
          t.onRecoverableError !== void 0 && (h = t.onRecoverableError)),
        (t = Yh(e, 1, !1, null, null, a, n, null, c, r, h, t0)),
        (e[Ca] = t.current),
        ou(e),
        new Eu(t)
      );
    }),
    (bc.hydrateRoot = function (e, t, a) {
      if (!f(e)) throw Error(o(299));
      var n = !1,
        c = '',
        r = rm,
        h = um,
        v = fm,
        S = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (c = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (r = a.onUncaughtError),
          a.onCaughtError !== void 0 && (h = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (S = a.formState)),
        (t = Yh(e, 1, !0, t, a ?? null, n, c, S, r, h, v, t0)),
        (t.context = Zh(null)),
        (a = t.current),
        (n = Pt()),
        (n = kt(n)),
        (c = xn(n)),
        (c.callback = null),
        jn(a, c, n),
        (a = n),
        (t.current.lanes = a),
        J(t, a),
        Ba(t),
        (e[Ca] = t.current),
        ou(e),
        new Ws(t)
      );
    }),
    (bc.version = '19.2.5'),
    bc
  );
}
var d0;
function hg() {
  if (d0) return Nu.exports;
  d0 = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return (l(), (Nu.exports = mg()), Nu.exports);
}
var pg = hg(),
  q = lf();
const Fs = ig(q);
function yg(l) {
  return 440 * Math.pow(2, (l - 69) / 12);
}
const gg = {
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
  const i = l.match(/^([A-G]#?b?)(\d)$/);
  if (!i) throw new Error(`Invalid note: ${l}`);
  const s = gg[i[1]];
  if (s === void 0) throw new Error(`Invalid note name: ${i[1]}`);
  const f = 12 + parseInt(i[2], 10) * 12 + s;
  return yg(f);
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
const vg = [L('A2'), L('C3'), L('E3')],
  _g = [L('E2'), L('G2'), L('B2')];
(L('D3'), L('F3'), L('A3'));
const bg = [L('G2'), L('B2'), L('D3')],
  Sg = [L('C3'), L('E3'), L('G3')],
  xg = [L('B2'), L('D3'), L('F3')];
function ya(l, i, s, o, f, d, m, p, g) {
  const y = l.createOscillator(),
    _ = l.createGain();
  ((y.type = s), y.frequency.setValueAtTime(o, f));
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
      y.connect(M).connect(_).connect(i));
  } else y.connect(_).connect(i);
  (y.start(f), y.stop(f + d + 0.02), g == null || g.push(y));
}
function Dc(l, i) {
  const s = Math.max(1, Math.floor(l.sampleRate * i)),
    o = l.createBuffer(1, s, l.sampleRate),
    f = o.getChannelData(0);
  let d = 74565;
  for (let m = 0; m < s; m++)
    ((d = (d * 1664525 + 1013904223) & 4294967295), (f[m] = d / 2147483648 - 1));
  return o;
}
function Oc(l, i, s, o, f) {
  const d = l.createOscillator(),
    m = l.createGain();
  ((d.type = 'sine'),
    d.frequency.setValueAtTime(80, s),
    d.frequency.exponentialRampToValueAtTime(30, s + 0.12),
    m.gain.setValueAtTime(o, s),
    m.gain.exponentialRampToValueAtTime(1e-4, s + 0.18),
    d.connect(m).connect(i),
    d.start(s),
    d.stop(s + 0.22),
    f == null || f.push(d));
  const p = l.createBufferSource();
  p.buffer = Dc(l, 0.04);
  const g = l.createGain(),
    y = l.createBiquadFilter();
  ((y.type = 'highpass'),
    (y.frequency.value = 400),
    g.gain.setValueAtTime(o * 0.3, s),
    g.gain.exponentialRampToValueAtTime(1e-4, s + 0.04),
    p.connect(y).connect(g).connect(i),
    p.start(s),
    f == null || f.push(p));
}
function jg(l, i, s, o, f, d) {
  const m = l.createBufferSource();
  m.buffer = Dc(l, f + 0.01);
  const p = l.createGain(),
    g = l.createBiquadFilter();
  ((g.type = 'highpass'),
    (g.frequency.value = 6e3),
    p.gain.setValueAtTime(o, s),
    p.gain.exponentialRampToValueAtTime(1e-4, s + f),
    m.connect(g).connect(p).connect(i),
    m.start(s),
    d == null || d.push(m));
}
const Ag = 100,
  jl = 60 / Ag,
  Rc = jl * 4,
  a1 = 8,
  Tg = Rc * a1,
  Mg = 2,
  Eg = 100,
  wg = [L('A2'), L('A2'), L('G2'), L('G2'), L('C3'), L('C3'), L('E2'), L('E2')],
  m0 = [L('A3'), L('C4'), L('E4'), L('A4'), L('G4'), L('E4'), L('C4'), L('A3')],
  h0 = [
    [L('A3'), L('C4'), L('E4')],
    [L('G3'), L('B3'), L('D4')],
    [L('C3'), L('E3'), L('G3')],
    [L('E3'), L('G3'), L('B3')],
  ];
function Ng(l, i, s, o) {
  for (let f = 0; f < a1; f++) {
    const d = s + f * Rc,
      m = wg[f];
    (ya(l, i, 'sawtooth', m, d, jl * 1.8, 0.22, 300, o),
      ya(l, i, 'sawtooth', m, d + jl * 2, jl * 1.8, 0.22, 300, o),
      Oc(l, i, d, 0.35, o),
      Oc(l, i, d + jl * 2, 0.28, o));
    for (let p = 0; p < 8; p++) {
      const g = (f * 8 + p) % m0.length,
        y = d + p * jl * 0.5;
      ya(l, i, 'square', m0[g], y, jl * 0.4, 0.07, 2400, o);
    }
  }
  for (let f = 0; f < h0.length; f++) {
    const d = h0[f],
      m = s + f * Rc * 2,
      p = Rc * 2;
    for (const g of d) {
      const y = l.createOscillator(),
        _ = l.createGain();
      ((y.type = 'triangle'), y.frequency.setValueAtTime(g, m));
      const b = 0.08;
      (_.gain.setValueAtTime(1e-4, m),
        _.gain.linearRampToValueAtTime(b, m + 0.15),
        _.gain.setValueAtTime(b, m + p - 0.2),
        _.gain.exponentialRampToValueAtTime(1e-4, m + p),
        y.connect(_).connect(i),
        y.start(m),
        y.stop(m + p + 0.05),
        o.push(y));
    }
  }
}
function zg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + Mg * Rc;
    for (; s < p; ) (Ng(l, i, s, f), (s += Tg));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, Eg)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const m = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(m);
        } catch {}
      f.length = 0;
    },
  };
}
const Cg = 100,
  rn = 60 / Cg,
  cf = rn * 4,
  n1 = 8,
  Yn = cf * n1,
  Rg = 2,
  Og = 100,
  p0 = [L('E5'), L('D5'), L('B4'), L('G4'), L('F#4'), L('E4'), L('D4'), L('B3')];
function y0(l, i, s, o, f) {
  const d = l.createBufferSource();
  d.buffer = Dc(l, 0.2);
  const m = l.createGain(),
    p = l.createBiquadFilter();
  ((p.type = 'bandpass'),
    (p.frequency.value = 900),
    (p.Q.value = 0.6),
    m.gain.setValueAtTime(o, s),
    m.gain.exponentialRampToValueAtTime(1e-4, s + 0.18),
    d.connect(p).connect(m).connect(i),
    d.start(s),
    f.push(d),
    ya(l, i, 'sine', 120, s, 0.12, o * 0.5, 300, f));
}
function Dg(l, i, s, o) {
  {
    const d = l.createOscillator(),
      m = l.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(L('E1'), s));
    const p = 0.35;
    (m.gain.setValueAtTime(1e-4, s),
      m.gain.linearRampToValueAtTime(p, s + 0.3),
      m.gain.setValueAtTime(p, s + Yn - 0.3),
      m.gain.linearRampToValueAtTime(1e-4, s + Yn));
    const g = l.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 120),
      d.connect(g).connect(m).connect(i),
      d.start(s),
      d.stop(s + Yn + 0.05),
      o.push(d));
  }
  for (let d = 0; d < n1; d++) {
    const m = s + d * cf;
    for (let p = 0; p < 4; p++) {
      const g = m + p * rn;
      (ya(l, i, 'sawtooth', L('E2'), g, rn * 0.9, 0.22, 400, o),
        ya(l, i, 'sawtooth', L('B2'), g, rn * 0.8, 0.1, 600, o));
    }
    (Oc(l, i, m, 0.5, o),
      Oc(l, i, m + rn * 2, 0.45, o),
      y0(l, i, m + rn, 0.4, o),
      y0(l, i, m + rn * 3, 0.38, o));
  }
  const f = [...xg, L('C4')];
  for (const d of f) {
    const m = l.createOscillator(),
      p = l.createGain();
    ((m.type = 'sawtooth'), m.frequency.setValueAtTime(d, s));
    const g = 0.07;
    (p.gain.setValueAtTime(1e-4, s),
      p.gain.linearRampToValueAtTime(g, s + 0.8),
      p.gain.setValueAtTime(g, s + Yn - 0.8),
      p.gain.exponentialRampToValueAtTime(1e-4, s + Yn));
    const y = l.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 900),
      m.connect(y).connect(p).connect(i),
      m.start(s),
      m.stop(s + Yn + 0.05),
      o.push(m));
  }
  for (let d = 0; d < p0.length; d++) {
    const m = s + d * rn * 2;
    ya(l, i, 'sawtooth', p0[d], m, rn * 1.6, 0.08, 2e3, o);
  }
  {
    const d = l.createBufferSource();
    d.buffer = Dc(l, Yn + 0.1);
    const m = l.createGain(),
      p = l.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 200),
      m.gain.setValueAtTime(0.04, s),
      d.connect(p).connect(m).connect(i),
      d.start(s),
      o.push(d));
  }
}
function Bg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + Rg * cf;
    for (; s < p; ) (Dg(l, i, s, f), (s += Yn));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, Og)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const m = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(m);
        } catch {}
      f.length = 0;
    },
  };
}
const Lg = 120,
  un = 60 / Lg,
  sf = un * 4,
  l1 = 8,
  ao = sf * l1,
  $g = 2,
  kg = 100,
  Hg = [L('E2'), L('E2'), L('D2'), L('D2'), L('E2'), L('E2'), L('B1'), L('B1')],
  g0 = [
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
function v0(l, i, s, o, f) {
  const d = l.createBufferSource();
  d.buffer = Dc(l, 0.15);
  const m = l.createGain(),
    p = l.createBiquadFilter();
  ((p.type = 'bandpass'),
    (p.frequency.value = 1800),
    (p.Q.value = 0.8),
    m.gain.setValueAtTime(o, s),
    m.gain.exponentialRampToValueAtTime(1e-4, s + 0.13),
    d.connect(p).connect(m).connect(i),
    d.start(s),
    f.push(d),
    ya(l, i, 'triangle', 200, s, 0.08, o * 0.4, void 0, f));
}
function Ug(l, i, s, o) {
  for (let d = 0; d < l1; d++) {
    const m = s + d * sf,
      p = Hg[d];
    for (let g = 0; g < 4; g++) ya(l, i, 'sawtooth', p, m + g * un, un * 0.85, 0.26, 280, o);
    for (let g = 0; g < 4; g++) Oc(l, i, m + g * un, 0.42, o);
    (v0(l, i, m + un, 0.3, o), v0(l, i, m + un * 3, 0.3, o));
    for (let g = 0; g < 8; g++) jg(l, i, m + g * un * 0.5, 0.12, 0.08, o);
    for (let g = 0; g < 16; g++) {
      const y = (d * 16 + g) % g0.length,
        _ = m + g * un * 0.25;
      ya(l, i, 'sawtooth', g0[y], _, un * 0.22, 0.06, 3200, o);
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
      p.gain.setValueAtTime(0.06, s + ao - 0.3),
      p.gain.exponentialRampToValueAtTime(1e-4, s + ao));
    const g = l.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 1200),
      m.connect(g).connect(p).connect(i),
      m.start(s),
      m.stop(s + ao + 0.05),
      o.push(m));
  }
}
function qg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + $g * sf;
    for (; s < p; ) (Ug(l, i, s, f), (s += ao));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, kg)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const m = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(m);
        } catch {}
      f.length = 0;
    },
  };
}
const Vg = 80,
  no = 60 / Vg,
  io = no * 4,
  Gg = 8,
  lo = io * Gg,
  Yg = 2,
  Zg = 100,
  _0 = [vg, Sg, bg, _g],
  Du = [L('A3'), L('C4'), L('E4'), L('G4'), L('A4'), L('E4')];
function Xg(l, i, s, o) {
  {
    const f = l.createOscillator(),
      d = l.createGain();
    ((f.type = 'sine'), f.frequency.setValueAtTime(L('A2'), s));
    const m = 0.28;
    (d.gain.setValueAtTime(1e-4, s),
      d.gain.linearRampToValueAtTime(m, s + 0.5),
      d.gain.setValueAtTime(m, s + lo - 0.5),
      d.gain.linearRampToValueAtTime(1e-4, s + lo));
    const p = l.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 180),
      f.connect(p).connect(d).connect(i),
      f.start(s),
      f.stop(s + lo + 0.05),
      o.push(f));
  }
  for (let f = 0; f < _0.length; f++) {
    const d = _0[f],
      m = s + f * io * 2,
      p = io * 2;
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
      const E = l.createDelay(0.5);
      E.delayTime.value = 0.25;
      const U = l.createGain();
      U.gain.value = 0.2;
      const O = l.createBiquadFilter();
      ((O.type = 'lowpass'),
        (O.frequency.value = 2e3),
        y.connect(_).connect(i),
        y.connect(E).connect(O).connect(U).connect(i),
        y.start(m),
        y.stop(m + p + 0.5),
        o.push(y));
    }
  }
  for (let f = 0; f < Du.length; f++) {
    const d = s + f * no * 2;
    (ya(l, i, 'sawtooth', Du[f], d, no * 1.5, 0.09, 1800, o),
      ya(l, i, 'sine', Du[f] * 0.5, d + 0.12, no * 1.2, 0.05, 600, o));
  }
}
function Kg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + Yg * io;
    for (; s < p; ) (Xg(l, i, s, f), (s += lo));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, Zg)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const m = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(m);
        } catch {}
      f.length = 0;
    },
  };
}
function Qg(l, i, s) {
  switch (l) {
    case 'title':
      return Kg(i, s);
    case 'base':
      return zg(i, s);
    case 'battleNormal':
      return qg(i, s);
    case 'battleBoss':
      return Bg(i, s);
  }
}
function Wg(l, i) {
  const s = Math.max(1, Math.floor(l.sampleRate * i)),
    o = l.createBuffer(1, s, l.sampleRate),
    f = o.getChannelData(0);
  for (let d = 0; d < s; d++) f[d] = Math.random() * 2 - 1;
  return o;
}
function Ea(l, i, s, o, f) {
  const d = l.gain;
  (d.setValueAtTime(1e-4, i),
    d.linearRampToValueAtTime(s, i + o),
    d.exponentialRampToValueAtTime(1e-4, i + o + f));
}
function je(l, i, s, o, f, d, m, p, g) {
  const y = l.createOscillator(),
    _ = l.createGain();
  ((y.type = s),
    y.frequency.setValueAtTime(o, f),
    g !== void 0 && y.frequency.exponentialRampToValueAtTime(Math.max(1e-4, g), f + m + p),
    Ea(_, f, d, m, p),
    y.connect(_).connect(i),
    y.start(f),
    y.stop(f + m + p + 0.02));
}
function wa(l, i, s, o, f, d) {
  const m = l.createBufferSource();
  m.buffer = Wg(l, s);
  const p = l.createGain();
  if ((Ea(p, o, f, 0.002, s), d)) {
    const g = l.createBiquadFilter();
    ((g.type = d.type),
      (g.frequency.value = d.frequency),
      d.q !== void 0 && (g.Q.value = d.q),
      m.connect(g).connect(p).connect(i));
  } else m.connect(p).connect(i);
  m.start(o);
}
const Jg = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createOscillator(),
      d = l.createGain();
    ((o.type = 'sawtooth'),
      (f.type = 'sawtooth'),
      o.frequency.setValueAtTime(900, s),
      o.frequency.exponentialRampToValueAtTime(1500, s + 0.5),
      f.frequency.setValueAtTime(905, s),
      f.frequency.exponentialRampToValueAtTime(1510, s + 0.5),
      Ea(d, s, 0.28, 0.02, 0.5),
      o.connect(d),
      f.connect(d),
      d.connect(i),
      o.start(s),
      f.start(s),
      o.stop(s + 0.55),
      f.stop(s + 0.55));
  },
  Fg = (l, i, s) => {
    for (let o = 0; o < 4; o++) {
      const f = s + o * 0.12;
      (je(l, i, 'sine', 110, f, 0.4, 0.005, 0.18, 35),
        wa(l, i, 0.08, f, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  Ig = (l, i, s) => {
    (wa(l, i, 0.4, s, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      je(l, i, 'triangle', 3e3, s, 0.25, 0.005, 0.15, 1500),
      je(l, i, 'sawtooth', 200, s + 0.05, 0.18, 0.005, 0.3, 80));
  },
  Pg = (l, i, s) => {
    for (let o = 0; o < 5; o++) {
      const f = s + o * 0.07,
        d = l.createOscillator(),
        m = l.createGain(),
        p = l.createBiquadFilter();
      ((d.type = 'square'),
        d.frequency.setValueAtTime(1100 + o * 60, f),
        d.frequency.exponentialRampToValueAtTime(1700 + o * 60, f + 0.04),
        (p.type = 'bandpass'),
        (p.frequency.value = 1600),
        (p.Q.value = 4),
        Ea(m, f, 0.2, 0.002, 0.06),
        d.connect(p).connect(m).connect(i),
        d.start(f),
        d.stop(f + 0.08));
    }
  },
  ev = (l, i, s) => {
    (wa(l, i, 0.1, s, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      je(l, i, 'triangle', 500, s, 0.18, 0.003, 0.08, 200));
  },
  tv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(80, s),
      o.frequency.linearRampToValueAtTime(160, s + 0.8),
      Ea(f, s, 0.3, 0.1, 0.7),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.85),
      je(l, i, 'square', 320, s + 0.2, 0.15, 0.02, 0.4));
  },
  av = (l, i, s) => {
    (wa(l, i, 0.5, s, 0.45, { type: 'lowpass', frequency: 1200 }),
      je(l, i, 'sine', 90, s, 0.5, 0.005, 0.6, 30),
      je(l, i, 'triangle', 1200, s + 0.1, 0.2, 0.02, 0.4, 2400),
      je(l, i, 'triangle', 1600, s + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  nv = (l, i, s) => {
    (je(l, i, 'sine', 180, s, 0.3, 0.005, 0.12, 60),
      wa(l, i, 0.08, s, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  lv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(220, s),
      o.frequency.exponentialRampToValueAtTime(40, s + 1.2),
      Ea(f, s, 0.45, 0.02, 1.2),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 1.3),
      wa(l, i, 0.8, s, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  iv = (l, i, s) => {
    (je(l, i, 'triangle', 700, s, 0.22, 0.01, 0.18),
      je(l, i, 'triangle', 1050, s + 0.12, 0.22, 0.01, 0.22));
  },
  cv = (l, i, s) => {
    (je(l, i, 'triangle', 600, s, 0.25, 0.01, 0.2),
      je(l, i, 'triangle', 900, s + 0.12, 0.25, 0.01, 0.2),
      je(l, i, 'triangle', 1350, s + 0.24, 0.3, 0.01, 0.45),
      je(l, i, 'sine', 2400, s + 0.3, 0.15, 0.02, 0.5));
  },
  sv = (l, i, s) => {
    (je(l, i, 'triangle', 600, s, 0.28, 0.01, 0.18),
      je(l, i, 'triangle', 750, s + 0.12, 0.28, 0.01, 0.18),
      je(l, i, 'triangle', 900, s + 0.24, 0.28, 0.01, 0.22),
      je(l, i, 'triangle', 1200, s + 0.36, 0.32, 0.01, 0.5),
      je(l, i, 'sine', 2400, s + 0.42, 0.18, 0.02, 0.6));
  },
  ov = (l, i, s) => {
    (je(l, i, 'sawtooth', 300, s, 0.3, 0.02, 0.4, 220),
      je(l, i, 'sawtooth', 220, s + 0.35, 0.3, 0.02, 0.5, 160),
      je(l, i, 'sawtooth', 160, s + 0.8, 0.3, 0.02, 0.7, 80),
      wa(l, i, 1, s, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  rv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(700, s),
      o.frequency.exponentialRampToValueAtTime(400, s + 0.4),
      Ea(f, s, 0.22, 0.02, 0.4),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.45),
      wa(l, i, 0.5, s, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  uv = (l, i, s) => {
    je(l, i, 'triangle', 1e3, s, 0.18, 0.003, 0.05);
  },
  fv = (l, i, s) => {
    (je(l, i, 'triangle', 880, s, 0.2, 0.005, 0.08),
      je(l, i, 'triangle', 1320, s + 0.06, 0.2, 0.005, 0.12));
  },
  dv = (l, i, s) => {
    (je(l, i, 'square', 260, s, 0.18, 0.005, 0.07),
      je(l, i, 'square', 200, s + 0.06, 0.18, 0.005, 0.1));
  },
  mv = (l, i, s) => {
    je(l, i, 'triangle', 1400, s, 0.12, 0.003, 0.04);
  },
  hv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(500, s),
      o.frequency.exponentialRampToValueAtTime(1e3, s + 0.12),
      Ea(f, s, 0.18, 0.01, 0.12),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.15));
  },
  pv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(1e3, s),
      o.frequency.exponentialRampToValueAtTime(500, s + 0.1),
      Ea(f, s, 0.16, 0.005, 0.1),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.13));
  },
  yv = (l, i, s) => {
    (je(l, i, 'sawtooth', 200, s, 0.3, 0.01, 0.35, 80),
      je(l, i, 'triangle', 600, s + 0.05, 0.22, 0.01, 0.3, 1200),
      je(l, i, 'triangle', 1200, s + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  gv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(1600, s),
      o.frequency.exponentialRampToValueAtTime(700, s + 0.08),
      (d.type = 'highpass'),
      (d.frequency.value = 800),
      Ea(f, s, 0.22, 0.003, 0.09),
      o.connect(d).connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.12));
  },
  vv = (l, i, s) => {
    (je(l, i, 'sine', 130, s, 0.5, 0.01, 0.28, 40),
      wa(l, i, 0.12, s, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  _v = (l, i, s) => {
    (wa(l, i, 0.18, s, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      je(l, i, 'triangle', 2200, s, 0.15, 0.002, 0.06, 1800));
  },
  bv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((o.type = 'square'),
      o.frequency.setValueAtTime(900, s),
      o.frequency.exponentialRampToValueAtTime(1400, s + 0.05),
      (d.type = 'bandpass'),
      (d.frequency.value = 1500),
      (d.Q.value = 3),
      Ea(f, s, 0.18, 0.002, 0.07),
      o.connect(d).connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.1),
      wa(l, i, 0.05, s, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  Sv = (l, i, s) => {
    (je(l, i, 'triangle', 700, s, 0.18, 0.005, 0.05),
      je(l, i, 'triangle', 1050, s + 0.04, 0.18, 0.005, 0.06));
  },
  xv = {
    laserShoot: gv,
    cannonShoot: vv,
    thunderShoot: _v,
    cutterShoot: bv,
    weaponSwitch: Sv,
    activeLaser: Jg,
    activeCannon: Fg,
    activeThunder: Ig,
    activeCutter: Pg,
    enemyKill: ev,
    bossWarn: tv,
    bossKill: av,
    machineHit: nv,
    machineDown: lv,
    waveClear: iv,
    tierClear: cv,
    tap: uv,
    purchaseOk: fv,
    reject: dv,
    tabSwitch: mv,
    dialogOpen: hv,
    dialogClose: pv,
    launch: yv,
    resultClear: sv,
    resultGameOver: ov,
    resultRetreat: rv,
  },
  jv = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function b0(l) {
  return Math.max(0, Math.min(1, l));
}
class Av {
  constructor() {
    xa(this, 'ctx', null);
    xa(this, 'seGain', null);
    xa(this, 'bgmGain', null);
    xa(this, 'masterGain', null);
    xa(this, 'lastPlayAt', new Map());
    xa(this, 'seVolume', 0.7);
    xa(this, 'bgmVolume', 0.5);
    xa(this, 'currentBgm', null);
  }
  init() {
    if (this.ctx) return;
    const i = window.AudioContext ?? window.webkitAudioContext;
    if (!i) return;
    const s = new i();
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
  play(i) {
    if (!this.ctx || !this.seGain) return;
    this.ctx.state === 'suspended' && this.ctx.resume();
    const s = performance.now(),
      o = jv[i];
    if (o !== void 0) {
      const d = this.lastPlayAt.get(i) ?? 0;
      if (s - d < o) return;
      this.lastPlayAt.set(i, s);
    }
    const f = xv[i];
    f(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(i) {
    ((this.seVolume = b0(i)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(i) {
    ((this.bgmVolume = b0(i)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
  }
  getSeVolume() {
    return this.seVolume;
  }
  getBgmVolume() {
    return this.bgmVolume;
  }
  playBgm(i) {
    var o;
    if (
      !this.ctx ||
      !this.bgmGain ||
      (this.ctx.state === 'suspended' && this.ctx.resume(),
      ((o = this.currentBgm) == null ? void 0 : o.id) === i)
    )
      return;
    this.currentBgm != null && (this.currentBgm.track.stop(), (this.currentBgm = null));
    const s = Qg(i, this.ctx, this.bgmGain);
    (s.start(), (this.currentBgm = { id: i, track: s }));
  }
  stopBgm() {
    var i;
    ((i = this.currentBgm) == null || i.track.stop(), (this.currentBgm = null));
  }
  getCurrentBgm() {
    var i;
    return ((i = this.currentBgm) == null ? void 0 : i.id) ?? null;
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
const Ie = new Av(),
  Tv = '_content_11wqi_1',
  Mv = { content: Tv },
  Ev = '_tabBar_rhd8d_2',
  wv = '_fullWidth_rhd8d_9',
  Nv = '_tab_rhd8d_2',
  zv = '_tabActive_rhd8d_54',
  Cv = '_tabDisabled_rhd8d_101',
  Rv = '_tabIcon_rhd8d_107',
  Ov = '_tabLabel_rhd8d_114',
  Dv = '_badge_rhd8d_119',
  Bv = '_badgeActive_rhd8d_137',
  Lv = '_indicator_rhd8d_158',
  ea = {
    tabBar: Ev,
    fullWidth: wv,
    tab: Nv,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: zv,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: Cv,
    tabIcon: Rv,
    tabLabel: Ov,
    badge: Dv,
    badgeActive: Bv,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Lv,
  },
  $v = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  kv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Hv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Uv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  qv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Vv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Gv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Yv = { screw: Vv, bolt: kv, alloy: $v, laser: qv, cannon: Hv, thunder: Gv, cutter: Uv };
function Zv(l, i) {
  return l.replace(/\swidth="\d+"/, ` width="${i}"`).replace(/\sheight="\d+"/, ` height="${i}"`);
}
function Ye({ name: l, size: i = 16, color: s = 'currentColor', className: o }) {
  const f = Yv[l];
  if (f)
    return u.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: s, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: Zv(f, i) },
    });
  const d = {
    width: i,
    height: i,
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
function oo({
  tabs: l,
  value: i,
  onChange: s,
  variant: o = 'underline',
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
      const b = l.findIndex((O) => O.key === i);
      if (b < 0) return;
      const M = _.querySelectorAll('[role="tab"]')[b];
      if (!M) return;
      const E = _.getBoundingClientRect(),
        U = M.getBoundingClientRect();
      y({ left: U.left - E.left, width: U.width });
    }, [i, l]),
    u.jsxs('div', {
      ref: p,
      role: 'tablist',
      className: [
        ea.tabBar,
        ea[`variant-${o}`],
        ea[`size-${f}`],
        ea[`align-${m}`],
        d ? ea.fullWidth : '',
      ]
        .filter(Boolean)
        .join(' '),
      children: [
        l.map((_) => {
          const b = _.key === i;
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
        o === 'underline' &&
          u.jsx('span', {
            className: ea.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${g.left}px)`, width: g.width },
          }),
      ],
    })
  );
}
const Xv = '_shell_ka520_6',
  Kv = '_header_ka520_19',
  Qv = '_main_ka520_32',
  Wv = '_noScroll_ka520_43',
  Jv = '_footer_ka520_48',
  Fv = '_battle_ka520_61',
  pi = { shell: Xv, header: Kv, main: Qv, noScroll: Wv, footer: Jv, battle: Fv };
function Nl({ header: l, footer: i, children: s, noScroll: o = !1, variant: f = 'default' }) {
  return u.jsxs('div', {
    className: [pi.shell, f === 'battle' ? pi.battle : ''].filter(Boolean).join(' '),
    children: [
      l != null && u.jsx('header', { className: pi.header, children: l }),
      u.jsx('main', {
        className: [pi.main, o ? pi.noScroll : ''].filter(Boolean).join(' '),
        children: s,
      }),
      i != null && u.jsx('footer', { className: pi.footer, children: i }),
    ],
  });
}
const Iv = '_nav_4erx0_2',
  Pv = '_tab_4erx0_10',
  e_ = '_active_4erx0_33',
  t_ = '_iconWrap_4erx0_38',
  a_ = '_badge_4erx0_51',
  Sc = { nav: Iv, tab: Pv, active: e_, iconWrap: t_, badge: a_ },
  n_ = '_text_1wy1n_1',
  l_ = '_variant_heading_1_1wy1n_6',
  i_ = '_variant_heading_2_1wy1n_15',
  c_ = '_variant_heading_3_1wy1n_24',
  s_ = '_variant_body_1wy1n_33',
  o_ = '_variant_caption_1wy1n_41',
  r_ = '_variant_label_1wy1n_49',
  u_ = '_variant_numeric_l_1wy1n_58',
  f_ = '_variant_numeric_m_1wy1n_67',
  d_ = '_variant_numeric_s_1wy1n_76',
  m_ = '_color_default_1wy1n_85',
  h_ = '_color_mid_1wy1n_89',
  p_ = '_color_dim_1wy1n_93',
  y_ = '_color_disabled_1wy1n_97',
  g_ = '_color_primary_1wy1n_101',
  v_ = '_color_secondary_1wy1n_105',
  __ = '_color_danger_1wy1n_109',
  b_ = '_color_success_1wy1n_113',
  S_ = '_color_warning_1wy1n_117',
  x_ = '_truncate_1wy1n_121',
  j_ = '_align_left_1wy1n_128',
  A_ = '_align_center_1wy1n_132',
  T_ = '_align_right_1wy1n_136',
  xc = {
    text: n_,
    variant_heading_1: l_,
    variant_heading_2: i_,
    variant_heading_3: c_,
    variant_body: s_,
    variant_caption: o_,
    variant_label: r_,
    variant_numeric_l: u_,
    variant_numeric_m: f_,
    variant_numeric_s: d_,
    color_default: m_,
    color_mid: h_,
    color_dim: p_,
    color_disabled: y_,
    color_primary: g_,
    color_secondary: v_,
    color_danger: __,
    color_success: b_,
    color_warning: S_,
    truncate: x_,
    align_left: j_,
    align_center: A_,
    align_right: T_,
  };
function M_(l) {
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
  children: i,
  as: s,
  color: o = 'default',
  className: f,
  truncate: d,
  align: m,
  style: p,
}) {
  const g = s ?? M_(l),
    y = l.replace(/-/g, '_'),
    _ = o === 'text' ? 'default' : o;
  return u.jsx(g, {
    className: [
      xc.text,
      xc[`variant_${y}`],
      xc[`color_${_}`],
      d ? xc.truncate : '',
      m ? xc[`align_${m}`] : '',
      f,
    ]
      .filter(Boolean)
      .join(' '),
    style: p,
    children: i,
  });
}
const E_ = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function Bc({ active: l, onChange: i, badges: s }) {
  return u.jsx('nav', {
    className: Sc.nav,
    'aria-label': 'メインナビゲーション',
    children: E_.map(({ key: o, label: f, iconName: d }) => {
      const m = o === l,
        p = s == null ? void 0 : s[o];
      return u.jsxs(
        'button',
        {
          type: 'button',
          className: [Sc.tab, m ? Sc.active : ''].filter(Boolean).join(' '),
          onClick: () => i(o),
          'aria-current': m ? 'page' : void 0,
          'aria-label': f,
          children: [
            u.jsxs('span', {
              className: Sc.iconWrap,
              children: [
                u.jsx(Ye, {
                  name: d,
                  size: 22,
                  color: m ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                p != null &&
                  u.jsx('span', { className: Sc.badge, 'aria-hidden': 'true', children: p }),
              ],
            }),
            u.jsx(Y, { variant: 'caption', color: m ? 'primary' : 'dim', children: f }),
          ],
        },
        o
      );
    }),
  });
}
const w_ = '_root_kv5uk_2',
  N_ = '_titleRow_kv5uk_8',
  z_ = '_left_kv5uk_17',
  C_ = '_center_kv5uk_24',
  R_ = '_right_kv5uk_33',
  O_ = '_currencies_kv5uk_42',
  D_ = '_actions_kv5uk_49',
  B_ = '_tabBarSlot_kv5uk_56',
  Hn = {
    root: w_,
    titleRow: N_,
    left: z_,
    center: C_,
    right: R_,
    currencies: O_,
    actions: D_,
    tabBarSlot: B_,
  },
  L_ = '_root_i843c_2',
  $_ = '_icon_i843c_10',
  k_ = '_delta_i843c_30',
  H_ = '_deltaSm_i843c_37',
  U_ = '_deltaMd_i843c_41',
  q_ = '_deltaLg_i843c_45',
  V_ = '_subtle_i843c_50',
  G_ = '_currencyLabel_i843c_55',
  Y_ = '_rankStamp_i843c_64',
  La = {
    root: L_,
    icon: $_,
    delta: k_,
    deltaSm: H_,
    deltaMd: U_,
    deltaLg: q_,
    subtle: V_,
    currencyLabel: G_,
    rankStamp: Y_,
  },
  Z_ = '_root_1wxcz_1',
  X_ = '_sizeSm_1wxcz_13',
  K_ = '_sizeMd_1wxcz_17',
  Q_ = '_sizeLg_1wxcz_21',
  W_ = '_sizeXl_1wxcz_25',
  J_ = '_affix_1wxcz_29',
  vl = { root: Z_, sizeSm: X_, sizeMd: K_, sizeLg: Q_, sizeXl: W_, affix: J_ };
function Xu(l) {
  let i = l.length;
  for (; i > 0 && l[i - 1] === 0; ) i--;
  return l.slice(0, i);
}
function jc(l) {
  let i = 0;
  for (let s = 0; s < l.length; s++) {
    const o = Math.floor(l[s] + i);
    ((l[s] = o % 1e3), (i = Math.floor(o / 1e3)));
  }
  for (; i > 0; ) (l.push(i % 1e3), (i = Math.floor(i / 1e3)));
  return Xu(l);
}
function F_(l, i) {
  for (; i !== 0; ) {
    const s = i;
    ((i = l % i), (l = s));
  }
  return l;
}
function I_(l) {
  const i = l.toString(),
    s = i.indexOf('.');
  if (s === -1) return { num: Math.round(l), den: 1 };
  const o = i.length - s - 1,
    f = Math.pow(10, o),
    d = Math.round(l * f),
    m = F_(Math.abs(d), f);
  return { num: d / m, den: f / m };
}
function P_(l) {
  let i = '',
    s = l;
  for (; s > 0; )
    ((s -= 1), (i = String.fromCharCode(65 + (s % 26)) + i), (s = Math.floor(s / 26)));
  return i;
}
const Bt = class Bt {
  constructor(i) {
    xa(this, 'digits');
    this.digits = i;
  }
  static fromNumber(i) {
    if (i <= 0) return Bt.ZERO;
    const s = [];
    let o = Math.floor(i);
    for (; o > 0; ) (s.push(o % 1e3), (o = Math.floor(o / 1e3)));
    return new Bt(Xu(s));
  }
  static fromString(i) {
    const s = i.trim();
    if (s === '' || s === '0') return Bt.ZERO;
    const o = [];
    let f = s.length;
    for (; f > 0; ) {
      const d = Math.max(0, f - 3);
      (o.push(parseInt(s.slice(d, f), 10)), (f = d));
    }
    return new Bt(Xu(o));
  }
  static fromJSON(i) {
    return new Bt(jc([...i]));
  }
  add(i) {
    const s = this.digits,
      o = i.digits,
      f = Math.max(s.length, o.length),
      d = new Array(f).fill(0);
    let m = 0;
    for (let p = 0; p < f; p++) {
      const g = (s[p] ?? 0) + (o[p] ?? 0) + m;
      ((d[p] = g % 1e3), (m = Math.floor(g / 1e3)));
    }
    return (m > 0 && d.push(m), new Bt(jc(d)));
  }
  sub(i) {
    if (this.compare(i) <= 0) return Bt.ZERO;
    const s = this.digits,
      o = i.digits,
      f = new Array(s.length).fill(0);
    let d = 0;
    for (let m = 0; m < s.length; m++) {
      let p = (s[m] ?? 0) - (o[m] ?? 0) - d;
      (p < 0 ? ((p += 1e3), (d = 1)) : (d = 0), (f[m] = p));
    }
    return new Bt(jc(f));
  }
  mulInt(i) {
    if (i <= 0 || this.isZero()) return Bt.ZERO;
    const s = this.digits,
      o = new Array(s.length).fill(0);
    let f = 0;
    for (let d = 0; d < s.length; d++) {
      const m = s[d] * i + f;
      ((o[d] = m % 1e3), (f = Math.floor(m / 1e3)));
    }
    for (; f > 0; ) (o.push(f % 1e3), (f = Math.floor(f / 1e3)));
    return new Bt(jc(o));
  }
  divInt(i) {
    if (i <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return Bt.ZERO;
    const s = this.digits,
      o = new Array(s.length).fill(0);
    let f = 0;
    for (let d = s.length - 1; d >= 0; d--) {
      const m = f * 1e3 + (s[d] ?? 0);
      ((o[d] = Math.floor(m / i)), (f = m % i));
    }
    return (f > 0 && (o[0] += 1), new Bt(jc(o)));
  }
  mulRational(i, s) {
    return this.mulInt(i).divInt(s);
  }
  mulNumber(i) {
    const { num: s, den: o } = I_(i);
    return this.mulRational(s, o);
  }
  compare(i) {
    const s = this.digits,
      o = i.digits;
    if (s.length !== o.length) return s.length < o.length ? -1 : 1;
    for (let f = s.length - 1; f >= 0; f--) {
      const d = s[f] ?? 0,
        m = o[f] ?? 0;
      if (d < m) return -1;
      if (d > m) return 1;
    }
    return 0;
  }
  eq(i) {
    return this.compare(i) === 0;
  }
  lt(i) {
    return this.compare(i) === -1;
  }
  gt(i) {
    return this.compare(i) === 1;
  }
  lte(i) {
    return this.compare(i) <= 0;
  }
  gte(i) {
    return this.compare(i) >= 0;
  }
  isZero() {
    return this.digits.length === 0;
  }
  toJSON() {
    return [...this.digits];
  }
  toString() {
    if (this.digits.length === 0) return '0';
    const i = this.digits.length;
    let s = String(this.digits[i - 1]);
    for (let o = i - 2; o >= 0; o--) s += String(this.digits[o]).padStart(3, '0');
    return s;
  }
  toDisplay() {
    if (this.digits.length === 0) return '0';
    const i = this.digits.length,
      s = this.digits[i - 1];
    if (i === 1) return String(s);
    const o = i - 1,
      f = P_(o),
      d = this.digits[i - 2] ?? 0,
      m = Math.floor(d / 10);
    return `${s}.${String(m).padStart(2, '0')}${f}`;
  }
};
xa(Bt, 'ZERO', new Bt([]));
let W = Bt;
function eb(l) {
  if (l === '') return 0;
  let i = 0;
  for (let s = 0; s < l.length; s++) i = i * 26 + (l.charCodeAt(s) - 65 + 1);
  return i;
}
function tb(l) {
  if (l <= 0) return { color: 'var(--c-text)', glow: '0 0 6px rgba(232,239,255,0.35)' };
  const i = Math.min(1, (l - 1) / 19),
    s = 195 + i * 100,
    o = 0.86 - i * 0.14,
    f = 0.13 + i * 0.07,
    d = `oklch(${o.toFixed(3)} ${f.toFixed(3)} ${s.toFixed(1)})`,
    m = Math.min(0.95, o + 0.05),
    p = f + 0.05,
    g = `oklch(${m.toFixed(3)} ${p.toFixed(3)} ${s.toFixed(1)} / 0.55)`;
  return { color: d, glow: `0 0 8px ${g}` };
}
function ab(l) {
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
function nb(l) {
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
function Xn({
  value: l,
  size: i = 'md',
  accentColor: s = 'scale',
  glow: o = !1,
  prefix: f,
  suffix: d,
  decimals: m,
  style: p,
}) {
  const g = typeof l == 'number' ? W.fromNumber(l) : l;
  let y;
  m != null && typeof l == 'number' ? (y = l.toFixed(m)) : (y = g.toDisplay());
  const _ = y.match(/^[\d.]+([A-Z]*)$/),
    b = _ ? _[1] : '',
    A = eb(b);
  let M, E;
  if (s === 'scale') {
    const K = tb(A);
    ((M = K.color), (E = o ? K.glow : void 0));
  } else ((M = ab(s)), (E = o ? nb(s) : void 0));
  const U = { sm: vl.sizeSm, md: vl.sizeMd, lg: vl.sizeLg, xl: vl.sizeXl }[i],
    O = { color: M, ...(E != null ? { textShadow: E } : {}), ...p };
  return u.jsxs('span', {
    className: `${vl.root} ${U}`,
    style: O,
    children: [
      f != null && u.jsx('span', { className: vl.affix, children: f }),
      y,
      d != null && u.jsx('span', { className: vl.affix, children: d }),
    ],
  });
}
const lb = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  ib = { sm: 12, md: 16, lg: 22, xl: 28 };
function cb({ delta: l, sizeClass: i }) {
  const s = l === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return u.jsx('span', {
    className: `${La.delta} ${i}`,
    style: { color: s },
    'aria-hidden': 'true',
    children: l,
  });
}
function Ml({
  currency: l,
  value: i,
  size: s = 'md',
  delta: o,
  showLabel: f,
  subtle: d,
  align: m = 'start',
  ranked: p,
}) {
  const g = typeof i == 'number' ? W.fromNumber(i) : i,
    y = lb[l],
    _ = d ? 'var(--c-text-disabled)' : `var(${y.cssVar})`,
    b = o && !d ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: _ },
    A = { sm: La.deltaSm, md: La.deltaMd, lg: La.deltaLg, xl: La.deltaLg }[s],
    M = u.jsx(Ye, { name: l, size: ib[s], color: _, className: La.icon }),
    E = u.jsxs(u.Fragment, {
      children: [
        o !== void 0 && !d && u.jsx(cb, { delta: o, sizeClass: A }),
        u.jsx(Xn, { value: g, size: s, accentColor: 'primary', style: b }),
      ],
    });
  return u.jsxs('span', {
    className: [La.root, d ? La.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${y.label} ${g.toDisplay()}`,
    children: [
      m === 'end'
        ? u.jsxs(u.Fragment, { children: [E, M] })
        : u.jsxs(u.Fragment, { children: [M, E] }),
      f && u.jsx('span', { className: La.currencyLabel, 'aria-hidden': 'true', children: y.label }),
      p !== void 0 &&
        p !== '' &&
        u.jsx('span', {
          className: La.rankStamp,
          'data-rank': p,
          'aria-label': `rank ${p}`,
          children: p,
        }),
    ],
  });
}
const sb = '_iconButton_1fyi8_1',
  ob = '_round_1fyi8_23',
  rb = '_active_1fyi8_85',
  ub = '_iconWrap_1fyi8_113',
  yi = {
    iconButton: sb,
    round: ob,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: rb,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: ub,
  },
  fb = { sm: 14, md: 18, lg: 22 };
function co({
  icon: l,
  label: i,
  size: s = 'md',
  variant: o = 'ghost',
  shape: f = 'square',
  active: d = !1,
  disabled: m = !1,
  onClick: p,
}) {
  const g = o === 'default' ? 'ghost' : o,
    y = typeof l == 'string' ? u.jsx(Ye, { name: l, size: fb[s] }) : l;
  return u.jsx('button', {
    type: 'button',
    className: [
      yi.iconButton,
      yi[`variant-${g}`],
      yi[`size-${s}`],
      f === 'round' ? yi.round : '',
      d ? yi.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: m,
    onClick: p,
    'aria-label': i,
    'aria-pressed': d,
    'aria-disabled': m,
    children: u.jsx('span', { className: yi.iconWrap, 'aria-hidden': 'true', children: y }),
  });
}
const S0 = (l) => {
    let i;
    const s = new Set(),
      o = (y, _) => {
        const b = typeof y == 'function' ? y(i) : y;
        if (!Object.is(b, i)) {
          const A = i;
          ((i = (_ ?? (typeof b != 'object' || b === null)) ? b : Object.assign({}, i, b)),
            s.forEach((M) => M(i, A)));
        }
      },
      f = () => i,
      p = {
        setState: o,
        getState: f,
        getInitialState: () => g,
        subscribe: (y) => (s.add(y), () => s.delete(y)),
      },
      g = (i = l(o, f, p));
    return p;
  },
  db = (l) => (l ? S0(l) : S0),
  mb = (l) => l;
function hb(l, i = mb) {
  const s = Fs.useSyncExternalStore(
    l.subscribe,
    Fs.useCallback(() => i(l.getState()), [l, i]),
    Fs.useCallback(() => i(l.getInitialState()), [l, i])
  );
  return (Fs.useDebugValue(s), s);
}
const pb = (l) => {
    const i = db(l),
      s = (o) => hb(i, o);
    return (Object.assign(s, i), s);
  },
  yb = (l) => pb,
  i1 = [
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
function of(l, i) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, i));
}
function mn(l) {
  return 1 + 0.1 * l;
}
function c1(l, i, s) {
  let o = 0;
  for (let f = 0; f < s; f++) o += of(l, i + f);
  return o;
}
function s1(l, i, s) {
  let o = W.ZERO,
    f = 0;
  for (;;) {
    const d = W.fromNumber(of(l, i + f)),
      m = o.add(d);
    if (m.gt(s) || ((o = m), f++, f >= 1e4)) break;
  }
  return { lvDelta: f, totalCost: o };
}
const Ku = 3,
  rf = 60,
  x0 = {
    isRunActive: !1,
    screw: W.ZERO,
    machineHp: W.ZERO,
    machineMaxHp: W.ZERO,
    baseMachineMaxHp: W.ZERO,
    currentTier: 1,
    currentWave: 1,
    currentWeapon: 'laser',
    weaponSwitchCdSec: 0,
    activeCdSec: 0,
    isAutoActive: !1,
    isPaused: !1,
    runStartBolt: W.ZERO,
    runStartAlloy: W.ZERO,
  };
function gb(l, i, s) {
  return l.lt(i) ? i : l.gt(s) ? s : l;
}
const vb = (l, i) => ({
    ...x0,
    startRun: ({ initialWeapon: s, baseMachineMaxHp: o }) => {
      i().resetRunWorkshop();
      const f = i().runWorkshopLevels.hpMul,
        d = mn(f),
        m = o.mulNumber(d),
        p = i();
      l({
        isRunActive: !0,
        screw: W.ZERO,
        machineHp: m,
        machineMaxHp: m,
        baseMachineMaxHp: o,
        currentTier: 1,
        currentWave: 1,
        currentWeapon: s,
        weaponSwitchCdSec: 0,
        activeCdSec: rf,
        isAutoActive: !1,
        isPaused: !1,
        runStartBolt: p.bolt,
        runStartAlloy: p.alloy,
      });
    },
    endRun: () => {
      (l(x0), i().resetRunWorkshop());
    },
    addScrew: (s) => l((o) => ({ screw: o.screw.add(s) })),
    spendScrew: (s) => {
      const o = i().screw;
      return o.lt(s) ? !1 : (l({ screw: o.sub(s) }), !0);
    },
    setMachineHp: (s) => l((o) => ({ machineHp: gb(s, W.ZERO, o.machineMaxHp) })),
    damageHp: (s) =>
      l((o) => {
        const f = o.machineHp.sub(s);
        return { machineHp: f.lt(W.ZERO) ? W.ZERO : f };
      }),
    recalcMachineMaxHpFromHpMul: (s) => {
      const o = i(),
        f = o.machineMaxHp,
        d = o.machineHp,
        m = f.sub(d),
        p = m.lt(W.ZERO) ? W.ZERO : m,
        g = o.baseMachineMaxHp.mulNumber(mn(s)),
        y = g.sub(p),
        _ = y.lt(W.ZERO) ? W.ZERO : y;
      l({ machineMaxHp: g, machineHp: _ });
    },
    advanceWave: () => l((s) => ({ currentWave: s.currentWave + 1 })),
    advanceTier: () => l((s) => ({ currentTier: s.currentTier + 1, currentWave: 1 })),
    switchWeapon: (s) => {
      const o = i();
      o.weaponSwitchCdSec > 0 ||
        (o.currentWeapon !== s && l({ currentWeapon: s, weaponSwitchCdSec: Ku }));
    },
    setWeaponSwitchCd: (s) => l({ weaponSwitchCdSec: Math.max(0, s) }),
    setActiveCd: (s) => l({ activeCdSec: Math.max(0, s) }),
    setAutoActive: (s) => l({ isAutoActive: s }),
    setPaused: (s) => l({ isPaused: s }),
    triggerActive: (s) => (i().activeCdSec > 0 ? !1 : (l({ activeCdSec: Math.max(0, s) }), !0)),
    tickCooldowns: (s) =>
      l((o) => ({
        weaponSwitchCdSec: Math.max(0, o.weaponSwitchCdSec - s),
        activeCdSec: Math.max(0, o.activeCdSec - s),
      })),
  }),
  _b = { bolt: W.ZERO, alloy: W.ZERO },
  bb = (l, i) => ({
    ..._b,
    addBolt: (s) => l((o) => ({ bolt: o.bolt.add(s) })),
    spendBolt: (s) => {
      const o = i().bolt;
      return o.lt(s) ? !1 : (l({ bolt: o.sub(s) }), !0);
    },
    addAlloy: (s) => l((o) => ({ alloy: o.alloy.add(s) })),
    spendAlloy: (s) => {
      const o = i().alloy;
      return o.lt(s) ? !1 : (l({ alloy: o.sub(s) }), !0);
    },
    resetCurrencies: () => l({ bolt: W.ZERO, alloy: W.ZERO }),
  }),
  ji = 6,
  Sb = { equippedPatches: new Map() },
  xb = (l, i) => ({
    ...Sb,
    equipPatch: (s, o, f) => {
      const d = i().equippedPatches;
      for (const [m, p] of d) if (p.name === o && m !== s) return !1;
      return (
        l((m) => {
          const p = new Map(m.equippedPatches);
          return (p.set(s, { name: o, tier: f }), { equippedPatches: p });
        }),
        !0
      );
    },
    unequipPatch: (s) => {
      l((o) => {
        const f = new Map(o.equippedPatches);
        return (f.delete(s), { equippedPatches: f });
      });
    },
    clearEquippedPatches: () => l({ equippedPatches: new Map() }),
  }),
  o1 = 'tower-like-game',
  so = 1,
  ee = {
    profile: 'profile',
    currencies: 'currencies',
    machine: 'machine',
    weapons: 'weapons',
    patches: 'patches',
    equippedPatches: 'equippedPatches',
    settings: 'settings',
  },
  ro = [
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
  r1 = {
    id: 'singleton',
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    schemaVersion: so,
  },
  u1 = { id: 'singleton', bolt: [], alloy: [] },
  f1 = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  d1 = { id: 'singleton', bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 };
function m1() {
  return Object.fromEntries(ro.map((l) => [l, 0]));
}
const jb = { machineLevels: m1() },
  Ab = (l) => ({
    ...jb,
    incrementMachineLv: (i) =>
      l((s) => ({ machineLevels: { ...s.machineLevels, [i]: s.machineLevels[i] + 1 } })),
    setMachineLv: (i, s) => l((o) => ({ machineLevels: { ...o.machineLevels, [i]: s } })),
    resetMachine: () => l({ machineLevels: m1() }),
  });
function Qu(l, i) {
  return `${l}#${i}`;
}
const Tb = { patches: new Map() },
  Mb = (l, i) => ({
    ...Tb,
    addPatch: (s, o, f = 1) => {
      const d = Qu(s, o);
      l((m) => {
        const p = new Map(m.patches),
          g = p.get(d);
        return (
          g ? p.set(d, { ...g, count: g.count + f }) : p.set(d, { name: s, tier: o, count: f }),
          { patches: p }
        );
      });
    },
    consumePatch: (s, o, f = 1) => {
      const d = Qu(s, o),
        m = i().patches.get(d);
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
        const o = new Map(s.patches);
        for (const [f, d] of o) d.count <= 0 && o.delete(f);
        return { patches: o };
      });
    },
    resetPatches: () => l({ patches: new Map() }),
  }),
  j0 = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  Eb = (l) => ({
    ...j0,
    updateHighest: (i, s) =>
      l((o) =>
        i > o.highestTier
          ? { highestTier: i, highestWave: s }
          : i === o.highestTier
            ? { highestWave: Math.max(o.highestWave, s) }
            : {}
      ),
    addPlayTimeSec: (i) => l((s) => ({ totalPlayTimeSec: s.totalPlayTimeSec + i })),
    incrementRuns: () => l((i) => ({ totalRuns: i.totalRuns + 1 })),
    addEnemiesKilled: (i) => l((s) => ({ totalEnemiesKilled: s.totalEnemiesKilled + i })),
    setLastPlayedAt: (i) => l({ lastPlayedAt: i }),
    resetProfile: (i) => l({ ...j0, createdAt: i, lastPlayedAt: i }),
  }),
  h1 = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
  wb = { runWorkshopLevels: h1 },
  Nb = (l, i) => ({
    ...wb,
    upgradeRunWorkshop: (s, o) => {
      const f = i1.find((_) => _.key === s);
      if (f == null) return !1;
      const d = i().runWorkshopLevels[s];
      let m, p;
      if (o === 'max') {
        const _ = s1(f, d, i().screw);
        if (_.lvDelta === 0) return !1;
        ((m = _.lvDelta), (p = _.totalCost));
      } else ((m = o), (p = W.fromNumber(c1(f, d, o))));
      if (!i().spendScrew(p)) return !1;
      const y = d + m;
      return (
        l((_) => ({ runWorkshopLevels: { ..._.runWorkshopLevels, [s]: y } })),
        s === 'hpMul' && i().recalcMachineMaxHpFromHpMul(y),
        !0
      );
    },
    resetRunWorkshop: () => l({ runWorkshopLevels: h1 }),
  }),
  A0 = { bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  zb = (l) => ({
    ...A0,
    setBgmVolume: (i) => l({ bgmVolume: Math.max(0, Math.min(1, i)) }),
    setSeVolume: (i) => l({ seVolume: Math.max(0, Math.min(1, i)) }),
    setVibrationEnabled: (i) => l({ vibrationEnabled: i }),
    resetSettings: () => l(A0),
  }),
  T0 = { weaponLv: 0, initialWeapon: 'laser' },
  Cb = (l) => ({
    ...T0,
    incrementWeaponLv: () => l((i) => ({ weaponLv: i.weaponLv + 1 })),
    setWeaponLv: (i) => l({ weaponLv: i }),
    setInitialWeapon: (i) => l({ initialWeapon: i }),
    resetWeapons: () => l(T0),
  }),
  G = yb()((...l) => ({
    ...Eb(...l),
    ...bb(...l),
    ...Ab(...l),
    ...Cb(...l),
    ...Mb(...l),
    ...xb(...l),
    ...zb(...l),
    ...vb(...l),
    ...Nb(...l),
  }));
function Lc({ title: l, subtitle: i, onBack: s, currencies: o, tabBar: f, actions: d }) {
  const m = G((A) => A.bolt),
    p = G((A) => A.alloy),
    g = G((A) => A.screw),
    y = G((A) => A.isRunActive),
    _ = (o ?? []).filter((A) => (A === 'screw' ? y : !0));
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
    className: Hn.root,
    children: [
      u.jsxs('div', {
        className: Hn.titleRow,
        children: [
          u.jsx('div', {
            className: Hn.left,
            children:
              s != null &&
              u.jsx(co, {
                icon: 'chevron-left',
                label: '戻る',
                variant: 'ghost',
                size: 'md',
                onClick: s,
              }),
          }),
          u.jsxs('div', {
            className: Hn.center,
            children: [
              u.jsx(Y, { variant: 'heading-3', truncate: !0, align: 'center', children: l }),
              i != null &&
                u.jsx(Y, { variant: 'caption', color: 'dim', align: 'center', children: i }),
            ],
          }),
          u.jsxs('div', {
            className: Hn.right,
            children: [
              _.length > 0 &&
                u.jsx('div', {
                  className: Hn.currencies,
                  children: _.map((A) => u.jsx(Ml, { currency: A, value: b(A), size: 'sm' }, A)),
                }),
              d != null && u.jsx('div', { className: Hn.actions, children: d }),
            ],
          }),
        ],
      }),
      f != null && u.jsx('div', { className: Hn.tabBarSlot, children: f }),
    ],
  });
}
const Rb = '_tab_1nc83_3',
  Ob = { tab: Rb },
  Db = '_wrapper_1opqp_3',
  Bb = '_active_1opqp_12',
  Lb = '_card_1opqp_12',
  $b = '_locked_1opqp_18',
  kb = '_tall_1opqp_34',
  Hb = '_iconTile_1opqp_37',
  Ub = '_headerText_1opqp_42',
  qb = '_description_1opqp_45',
  Vb = '_name_1opqp_48',
  Gb = '_wide_1opqp_53',
  Yb = '_body_1opqp_61',
  Zb = '_header_1opqp_42',
  Xb = '_statGrid_1opqp_121',
  Kb = '_statChip_1opqp_129',
  Qb = '_statLabel_1opqp_140',
  Wb = '_statValue_1opqp_147',
  Jb = '_lockedBadge_1opqp_158',
  Ct = {
    wrapper: Db,
    active: Bb,
    card: Lb,
    locked: $b,
    tall: kb,
    iconTile: Hb,
    headerText: Ub,
    description: qb,
    name: Vb,
    wide: Gb,
    body: Yb,
    header: Zb,
    statGrid: Xb,
    statChip: Kb,
    statLabel: Qb,
    statValue: Wb,
    lockedBadge: Jb,
  },
  Fb = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function p1({
  weapon: l,
  name: i,
  description: s,
  stats: o,
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
                  u.jsx('span', { className: Ct.name, children: i }),
                  s != null &&
                    s.length > 0 &&
                    u.jsx('span', { className: Ct.description, children: s }),
                ],
              }),
            }),
            !m &&
              o.length > 0 &&
              u.jsx('div', {
                className: Ct.statGrid,
                children: o.map((_) => {
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
                          style: _.accent != null ? { color: Fb[_.accent] } : void 0,
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
const Mi = [
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
  M0 = 1e-9;
function Ib(l, i, s) {
  const o = Math.ceil(l * Math.pow(i, s) - M0),
    f = Math.ceil(l * Math.pow(i, s - 1) - M0);
  return Math.max(1, o - f);
}
function El(l, i) {
  switch (l.growthType) {
    case 'multiply': {
      let s = Math.ceil(l.baseValue);
      for (let o = 1; o <= i; o++) s += Ib(l.baseValue, l.growthFactor, o);
      return s;
    }
    case 'linear':
    case 'fixed_step':
      return l.baseValue + l.growthFactor * i;
    case 'asymptotic':
      return 1 - 1 / (1 + l.growthFactor * i);
    case 'asymptotic_half':
      return 0.5 * (1 - 1 / (1 + l.growthFactor * i));
    case 'range_asymptotic': {
      const f = l.growthFactor * i;
      return Math.ceil(150 + 250 * (1 - 1 / (1 + f)));
    }
    default:
      return l.baseValue;
  }
}
function uf(l, i) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, i));
}
function Bu(l, i, s) {
  let o = 0;
  for (let f = 0; f < s && !(l.maxLv != null && i + f >= l.maxLv); f++) o += uf(l, i + f);
  return o;
}
function Pb(l, i, s) {
  let o = 0,
    f = s,
    d = i;
  for (let m = 0; m < 1e4 && !(l.maxLv != null && d >= l.maxLv); m++) {
    const p = W.fromNumber(uf(l, d));
    if (f.lt(p)) break;
    ((f = f.sub(p)), (d += 1), (o += 1));
  }
  return o;
}
function y1(l, i) {
  if (l.isZero()) return W.ZERO;
  if (i <= 0) return l;
  if (i >= 1) return W.ZERO;
  const s = 1 - i;
  return l.mulNumber(s);
}
function uo(l, i) {
  return l <= 0 ? !1 : l >= 1 ? !0 : i() < l;
}
function zl(l, i, s) {
  const { machine: o, weapon: f, isCrit: d } = l;
  let m = o.baseAttack.mulNumber(f.damageMultiplier);
  d && (m = m.mulNumber(o.critMultiplier));
  const p = m.sub(i),
    g = y1(p, s);
  return { rawDmg: m, finalDmg: g, isCrit: d };
}
function e2(l, i) {
  const s = l.sub(i.defense);
  return y1(s, i.damageReduction);
}
const t2 = 0.5,
  a2 = 2,
  n2 = 30,
  l2 = 25,
  g1 = 5,
  i2 = 360 / g1,
  c2 = 3,
  s2 = 20;
function fo(l) {
  const i = Math.max(0, Math.floor(l)),
    s = a2 * Math.pow(1.02, i),
    o = Math.min(10, t2 * (1 + 0.03 * i)),
    f = n2 + 0.5 * i,
    d = s2 * (1 + 0.05 * i);
  return {
    attackPerSec: o,
    splashRadius: f,
    damageMul: s,
    volleyCdSec: l2,
    volleyDamageMul: d,
    volleyShots: g1,
  };
}
function Ai(l, i, s, o) {
  const f = l - s,
    d = i - o;
  return Math.sqrt(f * f + d * d);
}
function o2(l, i, s, o) {
  if (s.length === 0) return { hits: [], blastX: 50, blastY: 50 };
  const f = 50,
    d = 50;
  let m = s[0],
    p = Ai(f, d, m.position.x, m.position.y);
  for (let A = 1; A < s.length; A++) {
    const M = s[A],
      E = Ai(f, d, M.position.x, M.position.y);
    E < p && ((p = E), (m = M));
  }
  const g = m.position.x,
    y = m.position.y,
    _ = uo(l.critRate, o),
    b = [];
  for (const A of s)
    if (Ai(g, y, A.position.x, A.position.y) <= i.splashRadius) {
      const E = zl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: _ }, W.ZERO, 0);
      b.push({ enemyId: A.id, damage: E.finalDmg, crit: _ });
    }
  return { hits: b, blastX: g, blastY: y };
}
function r2(l, i, s, o) {
  let m = 0;
  if (s.length > 0) {
    let b = s[0],
      A = Ai(50, 50, b.position.x, b.position.y);
    for (let U = 1; U < s.length; U++) {
      const O = s[U],
        K = Ai(50, 50, O.position.x, O.position.y);
      K < A && ((A = K), (b = O));
    }
    const M = b.position.x - 50,
      E = b.position.y - 50;
    m = (Math.atan2(E, M) * 180) / Math.PI;
  }
  const g = (i2 * i.volleyShots) / i.volleyShots,
    y = i.splashRadius * c2,
    _ = [];
  for (let b = 0; b < i.volleyShots; b++) {
    const M = ((m + g * b) * Math.PI) / 180,
      E = Math.cos(M),
      U = Math.sin(M);
    let O = null,
      K = -1 / 0;
    for (const ae of s) {
      const de = ae.position.x - 50,
        P = ae.position.y - 50,
        Re = de * E + P * U;
      Re > 0 && Re > K && ((K = Re), (O = ae));
    }
    let V, se;
    O !== null
      ? ((V = O.position.x), (se = O.position.y))
      : ((V = 50 + E * 100), (se = 50 + U * 100));
    const C = [];
    for (const ae of s)
      if (Ai(V, se, ae.position.x, ae.position.y) <= y) {
        const P = zl(
          { machine: l, weapon: { damageMultiplier: i.damageMul * i.volleyDamageMul }, isCrit: !1 },
          W.ZERO,
          0
        );
        C.push({ enemyId: ae.id, damage: P.finalDmg });
      }
    _.push({ targetEnemyId: (O == null ? void 0 : O.id) ?? null, blastX: V, blastY: se, hits: C });
  }
  return { shots: _ };
}
const u2 = 2.5,
  f2 = 80,
  d2 = 1,
  m2 = 1.2;
function $c(l) {
  const i = u2 * (1 + 0.03 * l),
    s = f2 + 0.5 * l,
    o = Math.floor(d2 + 0.05 * l),
    f = m2 * Math.pow(1.02, l);
  return {
    attackPerSec: i,
    orbitRadius: s,
    simultaneousHits: o,
    damageMul: f,
    overdriveCdSec: h2,
    overdriveDurationSec: p2,
    overdriveAttackSpeedMul: v1,
    overdriveDamageMul: 1,
  };
}
const h2 = 35,
  p2 = 8,
  v1 = 3;
function y2(l, i) {
  return l <= 0 ? Number.POSITIVE_INFINITY : (i / l) * 1e3;
}
function g2(l, i, s) {
  const o = (p) => ((p % 360) + 360) % 360,
    f = o(l),
    d = o(i);
  return o(f - d) <= s;
}
function v2(l, i, s, o, f, d = 2, m = 50, p = 50) {
  const g = 360 / d,
    y = [];
  for (let E = 0; E < d; E++) y.push(o + E * g);
  const A = s
      .filter((E) => {
        const U = E.position.x - m,
          O = E.position.y - p,
          K = (Math.atan2(O, U) * 180) / Math.PI;
        return y.some((V) => g2(K, V, g));
      })
      .slice(0, i.simultaneousHits)
      .map((E) => {
        const U = uo(l.critRate, f),
          O = zl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: U }, W.ZERO, 0);
        return { enemyId: E.id, damage: O.finalDmg, crit: U };
      }),
    M = (((o + g) % 360) + 360) % 360;
  return { hits: A, angle: M };
}
function _2(l) {
  return {
    active: !0,
    remainingSec: l.overdriveDurationSec,
    attackSpeedMul: l.overdriveAttackSpeedMul,
    damageMul: l.overdriveDamageMul,
  };
}
function b2(l, i) {
  if (!l.active) return l;
  const s = l.remainingSec - i;
  return s <= 0
    ? { active: !1, remainingSec: 0, attackSpeedMul: 1, damageMul: 1 }
    : { ...l, remainingSec: s };
}
const S2 = 2.5,
  x2 = 0.4;
function mo(l) {
  const i = Math.max(0, l),
    s = S2 * (1 + 0.03 * i),
    o = Math.floor(1 + 0.1 * i),
    f = x2 * Math.pow(1.02, i),
    d = 10 * (1 + 0.05 * i);
  return { attackPerSec: s, pierce: o, damageMul: f, megaCdSec: j2, megaDamageMul: d };
}
const j2 = 20;
function A2(l, i, s, o) {
  if (s.length === 0) return { hits: [], beamX: 0, beamY: 0 };
  const f = s.slice(0, i.pierce),
    d = f.map((y) => {
      const _ = uo(l.critRate, o),
        b = zl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: _ }, W.ZERO, 0);
      return { enemyId: y.id, damage: b.finalDmg, crit: _ };
    }),
    m = f[f.length - 1],
    p = m.position.x,
    g = m.position.y;
  return { hits: d, beamX: p, beamY: g };
}
const T2 = 6;
function M2(l, i, s, o = 0, f = 50, d = 50, m = T2) {
  if (s.length === 0) return { hits: [] };
  const p = (o * Math.PI) / 180,
    g = Math.cos(p),
    y = Math.sin(p),
    _ = m / 2,
    b = i.damageMul * i.megaDamageMul,
    A = [];
  for (const M of s) {
    const E = M.position.x - f,
      U = M.position.y - d;
    if (E * g + U * y <= 0) continue;
    const K = -E * y + U * g;
    if (Math.abs(K) > _) continue;
    const V = zl({ machine: l, weapon: { damageMultiplier: b }, isCrit: !1 }, W.ZERO, 0);
    A.push({ enemyId: M.id, damage: V.finalDmg });
  }
  return { hits: A };
}
const E2 = 3,
  w2 = 0.9,
  N2 = 30,
  z2 = 0.18,
  C2 = 2.5;
function ho(l) {
  const i = Math.max(0, l),
    s = z2 * Math.pow(1.02, i),
    o = Math.min(10, C2 * (1 + 0.03 * i)),
    f = 15 * (1 + 0.05 * i);
  return {
    attackPerSec: o,
    chainCount: E2,
    chainFalloff: w2,
    damageMul: s,
    plasmaCdSec: N2,
    plasmaDamageMul: f,
  };
}
function R2(l, i, s, o) {
  if (s.length === 0) return { hits: [], path: [] };
  const f = s.slice(0, i.chainCount),
    d = [],
    m = [];
  for (const p of f) {
    const g = uo(l.critRate, o),
      y = zl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: g }, W.ZERO, 0);
    (d.push({ enemyId: p.id, damage: y.finalDmg, crit: g }),
      m.push({ x: p.position.x, y: p.position.y }));
  }
  return { hits: d, path: m };
}
function O2(l, i, s) {
  if (s.length === 0) return { hits: [] };
  const o = [];
  for (let f = 0; f < s.length; f++) {
    const d = s[f],
      m = Math.pow(i.chainFalloff, f),
      p = i.damageMul * i.plasmaDamageMul * m,
      g = zl({ machine: l, weapon: { damageMultiplier: p }, isCrit: !1 }, W.ZERO, 0);
    o.push({ enemyId: d.id, damage: g.finalDmg });
  }
  return { hits: o };
}
function Ti(l) {
  return Math.round(l * 10) / 10;
}
function po(l, i) {
  return W.fromNumber(l).mulNumber(i).toString();
}
function _1(l) {
  const i = Mi.find((s) => s.key === 'baseAttack');
  return i != null ? El(i, l) : 1;
}
function b1(l) {
  const i = Mi.find((s) => s.key === 'range');
  return i != null ? El(i, l) : 150;
}
function S1(l, i, s) {
  const o = mo(l);
  return [
    { label: 'DMG', value: po(i, o.damageMul), accent: 'primary' },
    { label: '貫通', value: o.pierce },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Ti(o.attackPerSec), suffix: '/s' },
  ];
}
function x1(l, i, s) {
  const o = fo(l);
  return [
    { label: 'DMG', value: po(i, o.damageMul), accent: 'primary' },
    { label: '爆発半径', value: Ti(o.splashRadius), suffix: 'm' },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Ti(o.attackPerSec), suffix: '/s' },
  ];
}
function j1(l, i, s) {
  const o = ho(l);
  return [
    { label: 'DMG', value: po(i, o.damageMul), accent: 'primary' },
    { label: 'ターゲット数', value: o.chainCount },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Ti(o.attackPerSec), suffix: '/s' },
  ];
}
function A1(l, i) {
  const s = $c(l);
  return [
    { label: 'DMG', value: po(i, s.damageMul), accent: 'primary' },
    { label: '回転半径', value: Ti(s.orbitRadius), suffix: 'm' },
    { label: '刃の数', value: s.simultaneousHits },
    { label: '回転速度', value: Ti(s.attackPerSec), suffix: '/s' },
  ];
}
const D2 = [
  { kind: 'laser', name: 'LASER', description: '弾速が速く貫通する', buildStats: S1 },
  { kind: 'cannon', name: 'CANNON', description: '爆発時に範囲内にもダメージ', buildStats: x1 },
  { kind: 'thunder', name: 'THUNDER', description: '複数の敵を同時に攻撃', buildStats: j1 },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシンの周辺を回転する刃で攻撃',
    buildStats: (l, i) => A1(l, i),
  },
];
function B2() {
  const l = G((f) => f.weaponLv),
    i = G((f) => f.machineLevels),
    s = _1(i.baseAttack),
    o = b1(i.range);
  return u.jsx('div', {
    className: Ob.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: D2.map((f) =>
      u.jsx(
        p1,
        {
          weapon: f.kind,
          name: f.name,
          description: f.description,
          stats: f.buildStats(l, s, o),
          layout: 'wide',
        },
        f.kind
      )
    ),
  });
}
const L2 = '_tab_1oky8_3',
  $2 = '_topRow_1oky8_9',
  k2 = '_description_1oky8_15',
  H2 = '_previewCard_1oky8_21',
  U2 = '_previewLabel_1oky8_25',
  q2 = '_impactGrid_1oky8_32',
  V2 = '_impactRow_1oky8_37',
  G2 = '_impactRowBordered_1oky8_45',
  Y2 = '_impactLabel_1oky8_49',
  Z2 = '_impactValues_1oky8_55',
  X2 = '_arrow_1oky8_62',
  ja = {
    tab: L2,
    topRow: $2,
    description: k2,
    previewCard: H2,
    previewLabel: U2,
    impactGrid: q2,
    impactRow: V2,
    impactRowBordered: G2,
    impactLabel: Y2,
    impactValues: Z2,
    arrow: X2,
  },
  K2 = '_card_1403j_1',
  Q2 = '_interactive_1403j_97',
  Ac = {
    card: K2,
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
    interactive: Q2,
  };
function Kn({
  children: l,
  variant: i = 'default',
  interactive: s = !1,
  padding: o = 'md',
  radius: f,
  className: d,
}) {
  const m = [
    Ac.card,
    Ac[`variant-${i}`],
    Ac[`padding-${o}`],
    f != null ? Ac[`radius-${f}`] : '',
    s ? Ac.interactive : '',
    d ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return u.jsx('div', { className: m, children: l });
}
const W2 = '_root_168oy_2',
  J2 = '_header_168oy_15',
  F2 = '_iconWrap_168oy_22',
  I2 = '_title_168oy_34',
  P2 = '_lvBadge_168oy_47',
  eS = '_description_168oy_60',
  tS = '_valueRow_168oy_66',
  aS = '_valueBefore_168oy_74',
  nS = '_valueAfter_168oy_83',
  lS = '_arrow_168oy_93',
  iS = '_buttons_168oy_100',
  cS = '_btnCol_168oy_105',
  sS = '_btn_168oy_105',
  oS = '_btnPrimary_168oy_132',
  rS = '_btnSecondary_168oy_139',
  uS = '_btnWarning_168oy_146',
  fS = '_costRow_168oy_172',
  dS = '_costNum_168oy_181',
  mS = '_costDisabled_168oy_190',
  ht = {
    root: W2,
    header: J2,
    iconWrap: F2,
    title: I2,
    lvBadge: P2,
    description: eS,
    valueRow: tS,
    valueBefore: aS,
    valueAfter: nS,
    arrow: lS,
    buttons: iS,
    btnCol: cS,
    btn: sS,
    btnPrimary: oS,
    btnSecondary: rS,
    btnWarning: uS,
    costRow: fS,
    costNum: dS,
    costDisabled: mS,
  },
  hS = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  pS = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  yS = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  gS = { primary: ht.btnPrimary, secondary: ht.btnSecondary, warning: ht.btnWarning },
  vS = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function Lu(l) {
  return l instanceof W ? l.toDisplay() : l.toLocaleString();
}
function ff({
  title: l,
  description: i,
  iconName: s,
  iconColor: o,
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
  const M = y ?? yS[g],
    E = hS[M],
    U = o ?? E,
    O = gS[M],
    K = vS[M];
  return u.jsxs('div', {
    className: ht.root,
    role: 'group',
    'aria-label': l,
    'data-maxed': b,
    children: [
      u.jsxs('div', {
        className: ht.header,
        children: [
          s != null &&
            u.jsx('span', {
              className: ht.iconWrap,
              children: u.jsx(Ye, { name: s, size: 14, color: U }),
            }),
          u.jsx('span', { className: ht.title, children: l }),
          f != null &&
            !b &&
            u.jsx('span', {
              className: ht.lvBadge,
              style: { color: E, boxShadow: pS[M] },
              children: f,
            }),
          b &&
            u.jsx('span', {
              className: ht.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      i != null &&
        i.length > 0 &&
        u.jsx(Y, { variant: 'caption', color: 'dim', className: ht.description, children: i }),
      d != null &&
        u.jsxs('div', {
          className: ht.valueRow,
          children: [
            u.jsxs('span', { className: ht.valueBefore, children: [Lu(d), p] }),
            m != null &&
              !b &&
              u.jsxs(u.Fragment, {
                children: [
                  u.jsx('span', { className: ht.arrow, children: '→' }),
                  u.jsxs('span', {
                    className: ht.valueAfter,
                    style: { color: E, textShadow: `0 0 5px ${K}` },
                    children: [Lu(m), p],
                  }),
                ],
              }),
          ],
        }),
      !b &&
        _.length > 0 &&
        u.jsx('div', {
          className: ht.buttons,
          style: { gridTemplateColumns: `repeat(${_.length}, 1fr)` },
          children: _.map((V) => {
            const se = V.disabled === !0;
            return u.jsxs(
              'div',
              {
                className: ht.btnCol,
                children: [
                  u.jsx('button', {
                    type: 'button',
                    className: `${ht.btn} ${O}`,
                    disabled: se,
                    onClick: se ? void 0 : () => (A == null ? void 0 : A(V.amount)),
                    children: V.amount,
                  }),
                  u.jsx('div', {
                    className: ht.costRow,
                    children: u.jsx('span', {
                      className: `${ht.costNum} ${se ? ht.costDisabled : ''}`,
                      children: Lu(V.cost),
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
function df(l) {
  const i = Math.ceil(200 * Math.pow(1.12, l));
  return W.fromNumber(i);
}
function E0(l, i) {
  let s = W.ZERO;
  for (let o = 0; o < i; o++) s = s.add(df(l + o));
  return s;
}
function _S(l, i) {
  let s = i,
    o = 0;
  for (;;) {
    const f = df(l + o);
    if (s.lt(f) || ((s = s.sub(f)), o++, o > 1e4)) break;
  }
  return o;
}
function w0(l) {
  return Math.pow(1.02, l);
}
const N0 = { laser: 120 };
function bS(l) {
  const i = l + 1,
    s = w0(l),
    o = w0(i);
  return [
    { label: 'LASER DMG', before: Math.round(N0.laser * s), after: Math.round(N0.laser * o) },
    {
      label: 'CANNON 半径',
      before: Math.round((30 + 0.5 * l) * 10) / 10,
      after: Math.round((30 + 0.5 * i) * 10) / 10,
      suffix: 'm',
    },
    { label: 'THUNDER 連鎖', before: Math.floor(7 + 0.1 * l), after: Math.floor(7 + 0.1 * i) },
    { label: 'CUTTER 同時', before: Math.floor(1 + 0.05 * l), after: Math.floor(1 + 0.05 * i) },
  ];
}
function SS() {
  const l = G((E) => E.weaponLv),
    i = G((E) => E.alloy),
    s = G((E) => E.incrementWeaponLv),
    o = G((E) => E.setWeaponLv),
    f = G((E) => E.spendAlloy),
    d = df(l),
    m = E0(l, 5),
    p = _S(l, i),
    g = E0(l, p),
    y = !i.lt(d),
    _ = p >= 5,
    b = p >= 1,
    A = bS(l);
  function M(E) {
    E === '+1'
      ? f(d) && s()
      : E === '+5'
        ? f(m) && o(l + 5)
        : E === 'MAX' && p > 0 && f(g) && o(l + p);
  }
  return u.jsxs('div', {
    className: ja.tab,
    role: 'tabpanel',
    'aria-label': '武器強化',
    children: [
      u.jsxs('div', {
        className: ja.topRow,
        children: [
          u.jsx(Y, {
            variant: 'caption',
            color: 'mid',
            className: ja.description,
            children: '全 4 武器に共通で効く強化です。',
          }),
          u.jsx(Ml, { currency: 'alloy', value: i, size: 'sm' }),
        ],
      }),
      u.jsx(ff, {
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
      u.jsxs(Kn, {
        variant: 'sunken',
        padding: 'md',
        className: ja.previewCard,
        children: [
          u.jsx(Y, {
            variant: 'label',
            color: 'dim',
            className: ja.previewLabel,
            children: '次 Lv での効果プレビュー',
          }),
          u.jsx('div', {
            className: ja.impactGrid,
            children: A.map((E, U) =>
              u.jsxs(
                'div',
                {
                  className: [ja.impactRow, U > 0 ? ja.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    u.jsx(Y, {
                      variant: 'caption',
                      color: 'mid',
                      className: ja.impactLabel,
                      children: E.label,
                    }),
                    u.jsxs('span', {
                      className: ja.impactValues,
                      children: [
                        u.jsx(Xn, {
                          value: E.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: E.suffix,
                          decimals: E.suffix === 'm' ? 1 : 0,
                        }),
                        u.jsx('span', { className: ja.arrow, children: '→' }),
                        u.jsx(Xn, {
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
const T1 = q.createContext(null);
function xS({ children: l, initialScreen: i }) {
  const [s, o] = q.useState(i ?? 'title'),
    f = q.useCallback((d) => {
      o(d);
    }, []);
  return u.jsx(T1.Provider, { value: { screen: s, navigate: f }, children: l });
}
function Qn() {
  const l = q.useContext(T1);
  if (!l) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return l;
}
const jS = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function AS(l = {}) {
  const { initialTab: i = 'details' } = l,
    [s, o] = q.useState(i),
    { screen: f, navigate: d } = Qn();
  return u.jsx(Nl, {
    header: u.jsx(Lc, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => d('preparation'),
      tabBar: u.jsx(oo, { tabs: jS, value: s, onChange: o, variant: 'underline', fullWidth: !0 }),
    }),
    footer: u.jsx(Bc, { active: f, onChange: (m) => d(m) }),
    children: u.jsxs('div', {
      className: Mv.content,
      children: [s === 'details' && u.jsx(B2, {}), s === 'upgrade' && u.jsx(SS, {})],
    }),
  });
}
const TS = '_root_1ozz7_1',
  MS = '_battleFooter_1ozz7_10',
  ES = '_overlayLayer_1ozz7_14',
  $u = { root: TS, battleFooter: MS, overlayLayer: ES },
  wS = {
    elite: { color: 'var(--c-warning)', label: 'ELITE', glow: '0 0 16px rgba(246,185,74,0.6)' },
    boss: { color: 'var(--c-danger)', label: 'BOSS', glow: '0 0 24px rgba(255,77,109,0.7)' },
    'battle-start': {
      color: 'var(--c-primary)',
      label: 'BATTLE START',
      glow: '0 0 20px rgba(80,220,255,0.7)',
    },
  };
function z0({ kind: l = 'elite', name: i, duration: s = 1600, onDone: o }) {
  const d = `app-${q.useId().replace(/:/g, '')}`,
    m = wS[l],
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
        onAnimationEnd: o,
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
              i != null &&
                i !== '' &&
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
                  children: i,
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
function NS({ waveNumber: l, duration: i = 1100, onDone: s }) {
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
      animation: ${f}-in ${i}ms var(--ease-default) both;
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
const zS = '_root_paca6_3',
  CS = '_field_paca6_21',
  RS = '_rangeCircle_paca6_35',
  OS = '_machine_paca6_46',
  DS = '_machineRingOuter_paca6_59',
  BS = '_pin_paca6_69',
  LS = '_enemy_paca6_79',
  _l = {
    root: zS,
    field: CS,
    rangeCircle: RS,
    machine: OS,
    machineRingOuter: DS,
    pin: BS,
    enemy: LS,
  },
  $S = '_wrap_14rhu_1',
  kS = { wrap: $S };
function HS({
  x: l,
  y: i,
  radius: s = 12,
  color: o = 'var(--c-warning)',
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
      border: 3px solid ${o};
      box-shadow: 0 0 24px ${o}aa, inset 0 0 24px ${o}66;
      animation: ${p}-ring ${f}ms ${d}ms var(--ease-out) both;
    }
    .${p}-flash {
      position: absolute; left: 0; top: 0;
      width: ${s * 2}vmin; height: ${s * 2}vmin; border-radius: 50%;
      background: radial-gradient(circle, ${o} 0%, transparent 60%);
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
        className: `${p}-wrap ${kS.wrap}`,
        style: { left: `${l}%`, top: `${i}%` },
        onAnimationEnd: m,
        children: [
          u.jsx('div', { className: `${p}-flash` }),
          u.jsx('div', { className: `${p}-ring` }),
        ],
      }),
    ],
  });
}
const US = '_shell_g836j_1',
  qS = '_inner_g836j_8',
  VS = '_ball_g836j_14',
  GS = '_highlight_g836j_23',
  Is = { shell: US, inner: qS, ball: VS, highlight: GS };
function YS({
  x1: l = 50,
  y1: i = 50,
  x2: s = 80,
  y2: o = 20,
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
    _ = p ? o : i,
    b = (Math.atan2(o - i, s - l) * 180) / Math.PI;
  return u.jsx('div', {
    className: Is.shell,
    style: {
      left: `${y}%`,
      top: `${_}%`,
      width: `${d}vmin`,
      height: `${d}vmin`,
      transition: `left ${f}ms cubic-bezier(.4,0,.6,1), top ${f}ms cubic-bezier(.4,0,.6,1)`,
    },
    children: u.jsxs('div', {
      className: Is.inner,
      style: { transform: `rotate(${b}deg)` },
      children: [
        u.jsx('div', { className: Is.ball }),
        u.jsx('div', {
          className: Is.highlight,
          style: { width: `${d * 0.32}vmin`, height: `${d * 0.32}vmin` },
        }),
      ],
    }),
  });
}
const ZS = '_svg_gil20_1',
  XS = { svg: ZS };
function KS({
  points: l,
  color: i = 'var(--c-primary)',
  segmentMs: s = 90,
  jaggedness: o = 2.2,
  subdivisions: f = 4,
  delayMs: d = 0,
  onDone: m,
}) {
  const g = `chn-${q.useId().replace(/:/g, '')}`,
    y = l.length >= 2,
    _ = q.useMemo(() => {
      if (!y) return '';
      const M = [];
      for (let E = 0; E < l.length - 1; E++) {
        const U = l[E],
          O = l[E + 1],
          K = O.x - U.x,
          V = O.y - U.y,
          se = Math.hypot(K, V) || 1,
          C = -V / se,
          ae = K / se;
        E === 0 && M.push(U);
        for (let de = 1; de < f; de++) {
          const P = de / f,
            Re = U.x + K * P,
            it = U.y + V * P,
            et = (Math.random() - 0.5) * 2 * o;
          M.push({ x: Re + C * et, y: it + ae * et });
        }
        M.push(O);
      }
      return M.map((E, U) => `${U === 0 ? 'M' : 'L'}${E.x.toFixed(2)} ${E.y.toFixed(2)}`).join(' ');
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
        className: XS.svg,
        onAnimationEnd: m,
        children: [
          u.jsx('path', {
            className: g,
            d: _,
            fill: 'none',
            stroke: i,
            strokeWidth: 1.8,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeDasharray: 300,
            style: { filter: `drop-shadow(0 0 3px ${i})`, opacity: 0.5 },
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
            style: { filter: `drop-shadow(0 0 1.5px ${i}) drop-shadow(0 0 3px ${i})` },
          }),
        ],
      }),
    ],
  });
}
function QS({
  cx: l = 50,
  cy: i = 50,
  length: s = 14,
  thickness: o = 2.2,
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
  const M = (o / (s * 2)) * 100,
    E = (o / (s * 4)) * 100,
    U = `
    @keyframes ${b}-spin { to { transform: translate(-50%, -50%) rotate(${360 * A}deg); } }
    @keyframes ${b}-trail-pulse {
      0%, 100% { opacity: 0.18; }
      50%      { opacity: 0.36; }
    }
    .${b}-hub {
      position: absolute;
      left: ${l}%; top: ${i}%;
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
    O = (V) =>
      `M 10 ${V * 3.5} ` +
      Array.from({ length: 9 }, (se, C) => {
        const ae = 10 + C * 10;
        return `L ${ae + 4} ${V * 8} L ${ae + 8} ${V * 3.5} `;
      }).join(''),
    K = [];
  for (let V = 0; V < f; V++) {
    const se = (360 / f) * V,
      C = 30 * A,
      ae = (C * Math.PI) / 180,
      de = s * Math.cos(ae),
      P = s * Math.sin(ae),
      Re = `M 0 0 L ${s} 0 A ${s} ${s} 0 0 ${C > 0 ? 1 : 0} ${de.toFixed(2)} ${P.toFixed(2)} Z`;
    (K.push(
      u.jsx(
        'svg',
        {
          className: `${b}-sweep`,
          viewBox: `0 0 ${s} ${s}`,
          style: { transform: `rotate(${se - C}deg)`, transformOrigin: '0 0' },
          preserveAspectRatio: 'none',
          children: u.jsx('path', { d: Re, fill: p, opacity: 0.18 }),
        },
        `sweep-${V}`
      )
    ),
      K.push(
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
                d: O(-1),
                fill: p,
                opacity: 0.85,
                stroke: p,
                strokeWidth: 0.6,
                strokeLinejoin: 'round',
              }),
              u.jsx('path', {
                d: O(1),
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
      u.jsx('style', { dangerouslySetInnerHTML: { __html: U } }),
      u.jsxs('div', {
        className: `${b}-hub`,
        children: [u.jsx('div', { className: `${b}-orbit` }), K],
      }),
    ],
  });
}
const WS = '_root_14p1r_1',
  JS = { root: WS };
function FS({ value: l, x: i, y: s, crit: o = !1, duration: f = 800, onDone: d }) {
  const m = q.useId().replace(/:/g, 'dp'),
    p = `
    @keyframes ${m}-pop {
      0%   { transform: translate(-50%, 0) scale(${o ? 0.6 : 0.8}); opacity: 0; }
      15%  { transform: translate(-50%, -4px) scale(${o ? 1.15 : 1}); opacity: 1; }
      100% { transform: translate(-50%, -28px) scale(${o ? 1 : 0.95}); opacity: 0; }
    }
    .${m} {
      position: absolute;
      left: ${i}%;
      top: ${s}%;
      animation: ${m}-pop ${f}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
      filter: drop-shadow(0 0 4px ${o ? 'rgba(246,185,74,0.7)' : 'rgba(255,255,255,0.45)'});
    }
    @media (prefers-reduced-motion: reduce) {
      .${m} { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      u.jsx('div', {
        className: `${m} ${JS.root}`,
        onAnimationEnd: d,
        children: u.jsx(Xn, {
          value: l,
          size: o ? 'lg' : 'md',
          accentColor: o ? 'warning' : 'scale',
          glow: !0,
          style: o ? { fontSize: 22, fontWeight: 700 } : { fontSize: 16, fontWeight: 600 },
        }),
      }),
    ],
  });
}
const IS = '_wrap_14rhu_1',
  PS = { wrap: IS },
  C0 = 8;
function ex({ x: l, y: i, color: s = 'var(--c-text-mid)', duration: o = 480, onDone: f }) {
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
    g = Array.from({ length: C0 }, (y, _) =>
      u.jsx('div', { className: `${d}-shard`, style: { '--a': `${(_ * 360) / C0}deg` } }, _)
    );
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      u.jsxs('div', {
        className: `${d}-wrap ${PS.wrap}`,
        style: { left: `${l}%`, top: `${i}%` },
        onAnimationEnd: f,
        children: [u.jsx('div', { className: `${d}-flash` }), g],
      }),
    ],
  });
}
const tx = '_wrap_14rhu_1',
  ax = { wrap: tx };
function nx({ x: l, y: i, color: s = 'var(--c-primary-hi)', duration: o = 220, onDone: f }) {
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
      animation: ${d}-f ${o}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${d}-d { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: m } }),
      u.jsx('div', {
        className: `${d}-w ${ax.wrap}`,
        style: { left: `${l}%`, top: `${i}%` },
        onAnimationEnd: f,
        children: u.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const lx = '_beam_14ieu_1',
  ix = { beam: lx };
function cx({
  x1: l,
  y1: i,
  x2: s,
  y2: o,
  color: f = 'var(--c-primary)',
  duration: d = 220,
  onDone: m,
}) {
  const p = q.useId().replace(/:/g, 'lb'),
    g = s - l,
    y = o - i,
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
      left: ${l}%; top: ${i}%;
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
      u.jsx('div', { className: `${p} ${ix.beam}`, onAnimationEnd: m }),
    ],
  });
}
const sx = '_beam_14ieu_1',
  ox = { beam: sx };
function rx({
  x: l,
  y: i,
  angle: s = 0,
  duration: o = 600,
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
      left: ${l}%; top: ${i}%;
      width: 150%; height: 12px;
      background: linear-gradient(90deg, ${f}, transparent 95%);
      box-shadow: 0 0 18px ${f}, 0 0 36px ${f}88;
      transform-origin: 0 50%;
      animation: ${m}-grow ${o}ms var(--ease-out) both;
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
      u.jsx('div', { className: `${m} ${ox.beam}`, onAnimationEnd: d }),
    ],
  });
}
const ux = '_wrap_14rhu_1',
  fx = { wrap: ux };
function dx({ x: l, y: i, size: s = 80, color: o = 'var(--c-secondary)' }) {
  const f = q.useId().replace(/:/g, 'oa'),
    d = `
    @keyframes ${f}-rot   { from { transform: rotate(0deg);   } to { transform: rotate(360deg); } }
    @keyframes ${f}-rot-r { from { transform: rotate(360deg); } to { transform: rotate(0deg);   } }
    @keyframes ${f}-pulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
    .${f}-w {
      position: absolute;
      left: ${l}%; top: ${i}%;
      width: ${s}px; height: ${s}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: var(--z-fx-field);
      animation: ${f}-pulse 1.2s ease-in-out infinite;
    }
    .${f}-r1 {
      position: absolute; inset: 0; border-radius: 50%;
      border: 2px dashed ${o};
      box-shadow: 0 0 16px ${o}88;
      animation: ${f}-rot 2.4s linear infinite;
    }
    .${f}-r2 {
      position: absolute; inset: 12px; border-radius: 50%;
      border: 1px solid ${o};
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
        className: `${f}-w ${fx.wrap}`,
        children: [u.jsx('div', { className: `${f}-r1` }), u.jsx('div', { className: `${f}-r2` })],
      }),
    ],
  });
}
const mx = { screw: 'var(--c-screw)', bolt: 'var(--c-bolt)', alloy: 'var(--c-alloy)' };
function hx({ x: l, y: i, targetX: s, targetY: o, iconName: f, duration: d = 400, onDone: m }) {
  const g = `pk-${q.useId().replace(/:/g, '')}`,
    y = mx[f],
    _ = (l + s) / 2,
    b = Math.min(l, s, i, o) - 8,
    A = `
    @keyframes ${g}-arc {
      0%   { left: ${l}%;       top: ${i}%;       transform: translate(-50%, -50%) scale(1);   opacity: 1; }
      40%  { left: ${_}%;    top: ${b}%;    transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
      100% { left: ${s}%; top: ${o}%; transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
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
function px({
  x: l = 50,
  y: i = 60,
  fromY: s = 0,
  duration: o = 320,
  color: f = 'var(--c-primary)',
  segments: d = 7,
  jaggedness: m = 3.5,
  onDone: p,
}) {
  const y = `thn-${q.useId().replace(/:/g, '')}`,
    _ = q.useMemo(() => {
      const E = [{ x: l, y: s }],
        O = (i - s) / d;
      for (let K = 1; K < d; K++) {
        const V = s + O * K,
          se = l + (Math.random() - 0.5) * 2 * m;
        E.push({ x: se, y: V });
      }
      return (
        E.push({ x: l, y: i }),
        E.map((K, V) => `${V === 0 ? 'M' : 'L'}${K.x.toFixed(2)} ${K.y.toFixed(2)}`).join(' ')
      );
    }, []),
    b = Math.round(o * 0.35),
    A = Math.round(o * 0.65),
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
      position: absolute; left: ${l}%; top: ${i}%;
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
const yx = '_root_5xktu_1',
  gx = '_shape_5xktu_11',
  vx = '_hpBar_5xktu_22',
  _x = '_hpFill_5xktu_32',
  Ps = { root: yx, shape: gx, hpBar: vx, hpFill: _x },
  bx = {
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
  Sx = { standard: !1, swift: !0, tough: !1, elite: !1, miniboss: !0, boss: !0 };
function xx(l) {
  switch (l) {
    case 'frozen':
      return 'hue-rotate(180deg) saturate(1.6) brightness(1.05)';
    case 'burning':
      return 'hue-rotate(-25deg) saturate(1.4) brightness(1.1)';
    default:
      return 'none';
  }
}
function jx({ color: l }) {
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
function Ax({ color: l }) {
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
function Tx({ color: l }) {
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
function Mx({ color: l }) {
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
function Ex({ color: l }) {
  return u.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      [0, 90, 180, 270].map((i) =>
        u.jsx(
          'polygon',
          { points: '46,-6 46,6 56,0', transform: `rotate(${i})`, fill: l, opacity: 0.6 },
          i
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
function wx({ color: l }) {
  return u.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      [0, 60, 120, 180, 240, 300].map((i) =>
        u.jsx(
          'polygon',
          { points: '0,-48 6,-30 -6,-30', transform: `rotate(${i})`, fill: l, opacity: 0.7 },
          i
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
const Nx = { standard: jx, swift: Ax, tough: Tx, elite: Mx, miniboss: Ex, boss: wx };
function zx(l, i) {
  return l === 'elite'
    ? 'elite'
    : l === 'miniboss'
      ? 'miniboss'
      : l === 'boss'
        ? 'boss'
        : i === 'swift'
          ? 'swift'
          : i === 'tough'
            ? 'tough'
            : 'standard';
}
function Cx({ type: l, size: i, hp: s, showHp: o, facing: f = 0, status: d = 'normal' }) {
  const m = bx[l],
    p = i ?? m.size,
    g = Nx[l],
    y = o ?? m.defaultHp,
    _ = Sx[l] ? `${(f * 180) / Math.PI}deg` : '0deg',
    b = l === 'boss' ? 8 : l === 'miniboss' ? 6 : 4,
    A = { width: p, height: p },
    M = {
      width: p,
      height: p,
      color: m.color,
      filter: `drop-shadow(0 0 ${b}px ${m.glow}) ${xx(d)}`,
      transform: `rotate(${_})`,
    },
    E = { width: p + 4, height: l === 'boss' ? 4 : 3 },
    U = {
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
    className: Ps.root,
    style: A,
    children: [
      u.jsx('div', { className: Ps.shape, style: M, children: u.jsx(g, { color: m.color }) }),
      y &&
        s != null &&
        u.jsx('div', {
          className: Ps.hpBar,
          style: E,
          children: u.jsx('div', { className: Ps.hpFill, style: U }),
        }),
    ],
  });
}
function R0(l) {
  switch (l) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}
function Rx({
  enemies: l,
  machinePosition: i = { x: 50, y: 50 },
  damageEvents: s,
  hitEvents: o,
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
  cutterRotateMs: E,
  range: U,
  dummyPins: O = [],
}) {
  const K = i.x,
    V = i.y,
    se = U * 2;
  return u.jsx('div', {
    className: _l.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: u.jsxs('div', {
      className: _l.field,
      children: [
        u.jsx('div', {
          className: _l.rangeCircle,
          style: { left: `${K}%`, top: `${V}%`, width: `${se}%`, height: `${se}%` },
          'aria-hidden': !0,
        }),
        O.map((C) =>
          u.jsx(
            'div',
            {
              className: _l.pin,
              style: { left: `${C.x}%`, top: `${C.y}%`, color: R0(C.kind) },
              'aria-hidden': !0,
              children: u.jsx(Ye, {
                name: 'target',
                size: C.kind === 'boss' ? 18 : C.kind === 'elite' ? 16 : 14,
                color: R0(C.kind),
              }),
            },
            C.id
          )
        ),
        l.map((C) => {
          const ae = zx(C.kind, C.subtype),
            de = C.frozenUntilMs != null,
            P = C.burnUntilMs != null,
            Re = de ? 'frozen' : P ? 'burning' : 'normal',
            it = parseFloat(C.hp.toString()),
            et = Math.max(1e-4, parseFloat(C.maxHp.toString())),
            ke = Math.max(0, Math.min(1, it / et)),
            at = Math.atan2(V - C.position.y, K - C.position.x);
          return u.jsx(
            'div',
            {
              className: _l.enemy,
              style: {
                left: `${C.position.x}%`,
                top: `${C.position.y}%`,
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
              },
              children: u.jsx(Cx, { type: ae, hp: ke, status: Re, facing: at }),
            },
            C.id
          );
        }),
        u.jsxs('div', {
          className: _l.machine,
          style: { left: `${K}%`, top: `${V}%` },
          'aria-label': 'マシン',
          children: [
            u.jsx('span', { className: _l.machineRingOuter, 'aria-hidden': !0 }),
            u.jsx(Ye, { name: 'tower', size: 22, color: 'var(--c-primary)' }),
          ],
        }),
        A && u.jsx(QS, { cx: K, cy: V, rotateMs: E }),
        M && u.jsx(dx, { x: K, y: V }),
        s.map((C) =>
          u.jsx(
            FS,
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
          u.jsx(nx, { x: C.x, y: C.y, onDone: () => (m == null ? void 0 : m(C.id)) }, C.id)
        ),
        f.map((C) =>
          u.jsx(ex, { x: C.x, y: C.y, onDone: () => (p == null ? void 0 : p(C.id)) }, C.id)
        ),
        _.map((C) =>
          u.jsx(
            hx,
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
                cx,
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
                YS,
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
                HS,
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
                px,
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
                KS,
                {
                  points: C.points,
                  delayMs: C.delayMs,
                  onDone: () => (y == null ? void 0 : y(C.id)),
                },
                C.id
              );
            case 'megaBeam':
              return u.jsx(
                rx,
                { x: C.x, y: C.y, angle: C.angle, onDone: () => (y == null ? void 0 : y(C.id)) },
                C.id
              );
          }
        }),
      ],
    }),
  });
}
const Ox = '_root_rkbwe_2',
  Dx = '_topRow_rkbwe_13',
  Bx = '_weaponSlots_rkbwe_21',
  Lx = '_activeArea_rkbwe_29',
  $x = '_activeButton_rkbwe_37',
  kx = '_activeDisabled_rkbwe_57',
  Hx = '_modeToggle_rkbwe_66',
  Ux = '_modeToggleOn_rkbwe_89',
  qx = '_sheetToggleButton_rkbwe_96',
  Vx = '_bottomRow_rkbwe_108',
  Gx = '_currencyArea_rkbwe_115',
  Yx = '_screwSlot_rkbwe_125',
  Zx = '_sysButtons_rkbwe_138',
  ta = {
    root: Ox,
    topRow: Dx,
    weaponSlots: Bx,
    activeArea: Lx,
    activeButton: $x,
    activeDisabled: kx,
    modeToggle: Hx,
    modeToggleOn: Ux,
    sheetToggleButton: qx,
    bottomRow: Vx,
    currencyArea: Gx,
    screwSlot: Yx,
    sysButtons: Zx,
  },
  Xx = '_badge_4fy54_1',
  Kx = '_glow_4fy54_90',
  Qx = '_iconLeft_4fy54_118',
  Tc = {
    badge: Xx,
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
    glow: Kx,
    iconLeft: Qx,
  };
function kc({
  text: l,
  variant: i = 'neutral',
  tier: s,
  size: o = 'md',
  glow: f = !1,
  iconLeft: d,
}) {
  let m;
  const p = i === 'default' ? 'neutral' : i;
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
      className: [Tc.badge, Tc[`variant-${p}`], Tc[`size-${o}`], f ? Tc.glow : '']
        .filter(Boolean)
        .join(' '),
      style: m,
      children: [
        d != null && u.jsx('span', { className: Tc.iconLeft, 'aria-hidden': 'true', children: d }),
        g,
      ],
    })
  );
}
const Wx = '_root_x9cjr_1',
  Jx = '_svg_x9cjr_9',
  Fx = '_track_x9cjr_15',
  Ix = '_arc_x9cjr_19',
  Px = '_center_x9cjr_28',
  e5 = '_labelText_x9cjr_37',
  gi = { root: Wx, svg: Jx, track: Fx, arc: Ix, center: Px, labelText: e5 },
  t5 = { xs: 20, sm: 32, md: 48, lg: 64 },
  a5 = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  n5 = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function M1({
  value: l,
  max: i,
  size: s = 24,
  color: o = 'primary',
  thickness: f = 3,
  glow: d = !1,
  showLabel: m = !1,
  withLabel: p = !1,
  label: g,
  children: y,
}) {
  const _ = typeof s == 'number' ? s : t5[s],
    b =
      i != null
        ? Math.min(Math.max(0, l), Math.max(1, i)) / Math.max(1, i)
        : Math.min(Math.max(0, l), 100) / 100,
    A = i != null ? Math.min(Math.max(0, l), Math.max(1, i)) : l,
    M = i != null ? Math.max(1, i) : 100,
    E = a5[o],
    U = d ? n5[o] : void 0,
    O = _ / 2,
    K = O - f / 2,
    V = 2 * Math.PI * K,
    se = V * (1 - b),
    ae = m || p || y != null,
    de = g ?? `${Math.round(b * 100)}%`;
  return u.jsxs('span', {
    className: gi.root,
    style: { width: _, height: _ },
    children: [
      u.jsxs('svg', {
        className: gi.svg,
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
            className: gi.track,
            cx: O,
            cy: O,
            r: K,
            fill: 'none',
            strokeWidth: f,
          }),
          u.jsx('circle', {
            className: gi.arc,
            cx: O,
            cy: O,
            r: K,
            fill: 'none',
            stroke: E,
            strokeWidth: f,
            strokeLinecap: 'round',
            strokeDasharray: V,
            strokeDashoffset: se,
            style: U != null ? { filter: `drop-shadow(0 0 4px ${E})` } : void 0,
            transform: `rotate(-90 ${O} ${O})`,
          }),
        ],
      }),
      ae &&
        u.jsx('span', {
          className: gi.center,
          children:
            y ?? u.jsx('span', { className: gi.labelText, style: { color: E }, children: de }),
        }),
    ],
  });
}
const l5 = '_root_afe45_2',
  i5 = '_swapDisabled_afe45_14',
  c5 = '_active_afe45_20',
  s5 = '_onCd_afe45_27',
  o5 = '_iconWrap_afe45_27',
  r5 = '_cdOverlay_afe45_47',
  u5 = '_cdProgress_afe45_57',
  f5 = '_swapOverlay_afe45_68',
  Un = {
    root: l5,
    swapDisabled: i5,
    active: c5,
    onCd: s5,
    iconWrap: o5,
    cdOverlay: r5,
    cdProgress: u5,
    swapOverlay: f5,
  },
  d5 = { sm: 40, md: 52, lg: 64 },
  m5 = { sm: 18, md: 24, lg: 30 };
function h5({
  weapon: l,
  active: i = !1,
  ready: s = !1,
  cdProgress: o = 100,
  swapDisabled: f = !1,
  size: d = 'md',
  onClick: m,
}) {
  const p = d5[d],
    g = m5[d],
    y = o < 100,
    _ = [Un.root, i ? Un.active : '', y ? Un.onCd : '', f ? Un.swapDisabled : '']
      .filter(Boolean)
      .join(' ');
  return u.jsxs('button', {
    type: 'button',
    className: _,
    style: { width: p, height: p, minWidth: p, minHeight: p },
    onClick: f ? void 0 : m,
    disabled: f && m == null,
    'aria-label': `${l} weapon slot${i ? ' (active)' : ''}${y ? ` (cooldown ${o}%)` : s ? ' (ready)' : ''}`,
    'aria-pressed': i,
    children: [
      u.jsx('span', {
        className: Un.iconWrap,
        children: u.jsx(Ye, {
          name: l,
          size: g,
          color: i ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      y &&
        u.jsxs(u.Fragment, {
          children: [
            u.jsx('span', { className: Un.cdOverlay, 'aria-hidden': 'true' }),
            u.jsx('span', {
              className: Un.cdProgress,
              'aria-hidden': 'true',
              children: u.jsx(M1, {
                value: o,
                max: 100,
                size: p - 4,
                color: 'cd',
                thickness: d === 'sm' ? 2 : 3,
              }),
            }),
          ],
        }),
      f && u.jsx('span', { className: Un.swapOverlay, 'aria-hidden': 'true' }),
    ],
  });
}
const O0 = ['laser', 'cannon', 'thunder', 'cutter'];
function p5({
  screw: l,
  earnedBolt: i,
  equippedWeapon: s,
  weaponCds: o,
  activeCd: f,
  activeMax: d,
  isAutoActive: m,
  onSwitchWeapon: p,
  onActivate: g,
  onToggleAuto: y,
  isPaused: _,
  onTogglePause: b,
  onOpenScreenSaver: A,
  isWorkshopOpen: M = !1,
  onToggleWorkshop: E,
}) {
  const U = f > 0,
    O = m || U,
    K = O0.some((V) => V !== s && (o[V] ?? 100) < 100);
  return u.jsxs('div', {
    className: ta.root,
    children: [
      E != null &&
        u.jsx('button', {
          type: 'button',
          className: ta.sheetToggleButton,
          onClick: E,
          'aria-expanded': M,
          'aria-label': M ? 'アップグレードを閉じる' : 'アップグレードを開く',
          children: u.jsx(kc, { text: 'アップグレード', variant: 'info', size: 'md', glow: !0 }),
        }),
      u.jsxs('div', {
        className: ta.topRow,
        children: [
          u.jsx('div', {
            className: ta.weaponSlots,
            children: O0.map((V) =>
              u.jsx(
                h5,
                {
                  weapon: V,
                  active: V === s,
                  cdProgress: o[V] ?? 100,
                  swapDisabled: K && V !== s,
                  size: 'md',
                  onClick: () => {
                    p(V);
                  },
                },
                V
              )
            ),
          }),
          u.jsxs('div', {
            className: ta.activeArea,
            children: [
              u.jsx('button', {
                type: 'button',
                className: [ta.activeButton, O ? ta.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: O ? void 0 : g,
                disabled: O,
                'aria-label': `アクティブスキル発動${U ? ' (クールダウン中)' : m ? ' (自動モード)' : ''}`,
                children: u.jsx(M1, {
                  value: U ? d - f : d,
                  max: d > 0 ? d : 1,
                  size: 64,
                  color: U ? 'cd' : 'primary',
                  glow: !U && !m,
                  thickness: 4,
                  children: u.jsx(Ye, {
                    name: 'lightning',
                    size: 26,
                    color: O ? 'var(--c-text-disabled)' : 'var(--c-secondary)',
                  }),
                }),
              }),
              u.jsx('button', {
                type: 'button',
                className: [ta.modeToggle, m ? ta.modeToggleOn : ''].filter(Boolean).join(' '),
                onClick: () => y(!m),
                'aria-pressed': m,
                'aria-label': m
                  ? 'アクティブスキルを手動モードに切り替え'
                  : 'アクティブスキルを自動モードに切り替え',
                children: m ? 'AUTO' : 'MANUAL',
              }),
            ],
          }),
        ],
      }),
      u.jsxs('div', {
        className: ta.bottomRow,
        children: [
          u.jsxs('div', {
            className: ta.currencyArea,
            children: [
              u.jsx('span', {
                className: ta.screwSlot,
                children: u.jsx(Ml, { currency: 'screw', value: l, size: 'lg' }),
              }),
              u.jsx(Ml, { currency: 'bolt', value: i, size: 'md' }),
            ],
          }),
          u.jsxs('div', {
            className: ta.sysButtons,
            children: [
              u.jsx(co, {
                icon: _ ? 'play' : 'pause',
                label: _ ? '再開 (メニューを閉じる)' : '一時停止 (メニューを開く)',
                size: 'md',
                variant: 'ghost',
                active: _,
                onClick: b,
              }),
              u.jsx(co, {
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
const y5 = '_root_1y4n6_3',
  g5 = '_headerRow_1y4n6_13',
  v5 = '_hpValue_1y4n6_21',
  _5 = '_hpDivider_1y4n6_31',
  b5 = '_shieldBlock_1y4n6_36',
  S5 = '_srOnly_1y4n6_44',
  vi = { root: y5, headerRow: g5, hpValue: v5, hpDivider: _5, shieldBlock: b5, srOnly: S5 },
  x5 = '_root_1pi3d_2',
  j5 = '_sizeSm_1pi3d_11',
  A5 = '_sizeMd_1pi3d_15',
  T5 = '_sizeLg_1pi3d_19',
  M5 = '_fill_1pi3d_23',
  E5 = '_label_1pi3d_29',
  w5 = '_withTrailing_1pi3d_46',
  N5 = '_trailingLabel_1pi3d_56',
  qn = {
    root: x5,
    sizeSm: j5,
    sizeMd: A5,
    sizeLg: T5,
    fill: M5,
    label: E5,
    withTrailing: w5,
    trailingLabel: N5,
  },
  z5 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  C5 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function D0({
  value: l,
  max: i,
  color: s = 'primary',
  size: o = 'md',
  variant: f = 'solid',
  showLabel: d = !1,
  label: m,
  trailingLabel: p,
  glow: g = !1,
  reverse: y = !1,
}) {
  const _ = Math.max(1, i),
    b = Math.min(Math.max(0, l), _),
    A = (b / _) * 100,
    M = z5[s],
    E = g || f === 'neon' ? C5[s] : void 0,
    U = { sm: qn.sizeSm, md: qn.sizeMd, lg: qn.sizeLg }[o],
    O = {
      width: `${A}%`,
      backgroundColor: M,
      ...(E != null ? { boxShadow: E } : {}),
      ...(y ? { marginLeft: 'auto' } : {}),
    },
    K = m ?? `${b} / ${_}`,
    V = u.jsxs('div', {
      className: `${qn.root} ${U}`,
      role: 'progressbar',
      'aria-valuenow': b,
      'aria-valuemin': 0,
      'aria-valuemax': _,
      'aria-label': m ?? `${b} / ${_}`,
      children: [
        u.jsx('div', { className: qn.fill, style: O }),
        d && u.jsx('span', { className: qn.label, children: K }),
      ],
    });
  return p == null
    ? V
    : u.jsxs('div', {
        className: qn.withTrailing,
        children: [V, u.jsx('span', { className: qn.trailingLabel, children: p })],
      });
}
const R5 = '_root_17jsg_2',
  O5 = '_boss_17jsg_10',
  D5 = '_header_17jsg_16',
  B5 = '_milestone_17jsg_23',
  L5 = '_milestoneText_17jsg_30',
  $5 = '_seconds_17jsg_40',
  k5 = '_timerTrack_17jsg_46',
  H5 = '_timerFill_17jsg_56',
  U5 = '_drainBar_17jsg_1',
  q5 = '_timerFillBoss_17jsg_74',
  V5 = '_timerFillPaused_17jsg_79',
  G5 = '_waveLabel_17jsg_102',
  aa = {
    root: R5,
    boss: O5,
    header: D5,
    milestone: B5,
    milestoneText: L5,
    seconds: $5,
    timerTrack: k5,
    timerFill: H5,
    drainBar: U5,
    timerFillBoss: q5,
    timerFillPaused: V5,
    'size-sm': '_size-sm_17jsg_98',
    waveLabel: G5,
    'size-md': '_size-md_17jsg_106',
    'size-lg': '_size-lg_17jsg_110',
  },
  Y5 = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  };
function Z5({
  waveNumber: l,
  secondsLeft: i,
  secondsMax: s,
  nextMilestone: o,
  showSeconds: f = !0,
  size: d = 'md',
  paused: m = !1,
  isBossWave: p = !1,
}) {
  const g = p || (o == null ? void 0 : o.kind) === 'boss',
    y = o != null ? Y5[o.kind] : null,
    _ = Math.max(1, s);
  return u.jsxs('div', {
    className: [aa.root, aa[`size-${d}`], g ? aa.boss : ''].filter(Boolean).join(' '),
    children: [
      u.jsxs('div', {
        className: aa.header,
        children: [
          u.jsx(kc, { text: `WAVE ${l}`, variant: 'tier' }),
          !p &&
            y != null &&
            o != null &&
            u.jsxs('span', {
              className: aa.milestone,
              style: { color: y.color },
              children: [
                u.jsx(Ye, { name: y.iconName, size: 12, color: y.color }),
                u.jsxs('span', { className: aa.milestoneText, children: [y.label, ' @', o.wave] }),
              ],
            }),
          p &&
            u.jsxs('span', {
              className: aa.milestone,
              style: { color: 'var(--c-secondary)' },
              children: [
                u.jsx(Ye, { name: 'skull', size: 12, color: 'var(--c-secondary)' }),
                u.jsx('span', { className: aa.milestoneText, children: 'BOSS WAVE' }),
              ],
            }),
          f &&
            !p &&
            u.jsx('span', {
              className: aa.seconds,
              children: u.jsxs(Y, {
                variant: 'numeric-s',
                color: 'mid',
                children: [Math.ceil(i), 's'],
              }),
            }),
        ],
      }),
      !p &&
        u.jsx('div', {
          className: aa.timerTrack,
          role: 'progressbar',
          'aria-label': `Wave ${l} timer`,
          'aria-valuemin': 0,
          'aria-valuemax': _,
          'aria-valuenow': Math.max(0, i),
          children: u.jsx(X5, { secondsRemaining: i, secondsMax: _, isBoss: g, paused: m }, l),
        }),
    ],
  });
}
function X5({ secondsRemaining: l, secondsMax: i, isBoss: s, paused: o }) {
  const [f] = q.useState(() => {
      const m = Math.max(0, Math.min(1, l / i)),
        p = Math.max(0.01, l);
      return { initialScale: m, durationSec: p };
    }),
    d = [aa.timerFill, s ? aa.timerFillBoss : '', o ? aa.timerFillPaused : '']
      .filter(Boolean)
      .join(' ');
  return u.jsx('div', {
    className: d,
    style: { '--start-scale': f.initialScale, animationDuration: `${f.durationSec}s` },
  });
}
function K5({
  hpCurrent: l,
  hpMax: i,
  shieldCurrent: s,
  shieldMax: o,
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
    E = s != null && o != null,
    U = B0(l, i),
    O = E ? B0(s, o) : 0;
  return u.jsxs('div', {
    className: vi.root,
    role: 'group',
    'aria-label': 'バトル状態',
    children: [
      u.jsxs('div', {
        className: vi.headerRow,
        children: [
          u.jsx(kc, { variant: 'tier', tier: f, size: 'md', glow: !0 }),
          u.jsx(Y, { variant: 'label', color: 'dim', style: { fontSize: 10 }, children: 'HP' }),
          u.jsxs('span', {
            className: vi.hpValue,
            'aria-label': `HP ${l.toDisplay()} / ${i.toDisplay()}`,
            children: [
              u.jsx(Xn, {
                value: l,
                size: 'sm',
                accentColor: b ? 'danger' : 'text',
                glow: b,
                style: { fontSize: 14 },
              }),
              u.jsx('span', { className: vi.hpDivider, children: '/' }),
              u.jsx(Xn, { value: i, size: 'sm', accentColor: 'dim', style: { fontSize: 11 } }),
            ],
          }),
          E &&
            u.jsxs('span', {
              className: vi.shieldBlock,
              children: [
                u.jsx(Y, {
                  variant: 'label',
                  color: 'primary',
                  style: { fontSize: 9.5 },
                  children: 'SHLD',
                }),
                u.jsx(Xn, {
                  value: s,
                  size: 'sm',
                  accentColor: 'primary',
                  style: { fontSize: 11 },
                }),
              ],
            }),
        ],
      }),
      u.jsx(D0, { value: U, max: 100, color: U <= 30 ? 'hp-low' : 'hp', size: 'md' }),
      E && u.jsx(D0, { value: O, max: 100, color: 'shield', size: 'sm' }),
      u.jsx(Z5, {
        waveNumber: d,
        secondsLeft: p,
        secondsMax: g,
        nextMilestone: M,
        showSeconds: !1,
        size: 'sm',
        paused: A,
        isBossWave: y,
      }),
      u.jsxs('span', { className: vi.srOnly, 'aria-hidden': 'false', children: [d, '/', m] }),
    ],
  });
}
function B0(l, i) {
  const s = parseFloat(l.toString()),
    o = parseFloat(i.toString());
  return o === 0 ? 0 : Math.max(0, Math.min(100, (s / o) * 100));
}
const Q5 = '_card_1o3jz_1',
  W5 = '_header_1o3jz_8',
  J5 = '_soundSection_1o3jz_13',
  F5 = '_sliderRow_1o3jz_19',
  I5 = '_sliderLabel_1o3jz_26',
  P5 = '_sliderValue_1o3jz_31',
  e3 = '_divider_1o3jz_38',
  t3 = '_actions_1o3jz_44',
  Aa = {
    card: Q5,
    header: W5,
    soundSection: J5,
    sliderRow: F5,
    sliderLabel: I5,
    sliderValue: P5,
    divider: e3,
    actions: t3,
  },
  a3 = '_button_1oo6e_1',
  n3 = '_fullWidth_1oo6e_109',
  l3 = '_iconLeft_1oo6e_113',
  i3 = '_iconRight_1oo6e_114',
  c3 = '_iconSpacer_1oo6e_120',
  s3 = '_label_1oo6e_124',
  on = {
    button: a3,
    'variant-primary': '_variant-primary_1oo6e_28',
    'variant-secondary': '_variant-secondary_1oo6e_42',
    'variant-danger': '_variant-danger_1oo6e_56',
    'variant-ghost': '_variant-ghost_1oo6e_70',
    'size-sm': '_size-sm_1oo6e_85',
    'size-md': '_size-md_1oo6e_93',
    'size-lg': '_size-lg_1oo6e_101',
    fullWidth: n3,
    iconLeft: l3,
    iconRight: i3,
    iconSpacer: c3,
    label: s3,
  };
function Lt({
  label: l,
  variant: i = 'primary',
  size: s = 'md',
  fullWidth: o = !1,
  iconLeft: f,
  iconRight: d,
  disabled: m = !1,
  onClick: p,
  type: g = 'button',
}) {
  return u.jsxs('button', {
    type: g,
    className: [on.button, on[`variant-${i}`], on[`size-${s}`], o ? on.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: m,
    onClick: p,
    'aria-disabled': m,
    children: [
      f != null && u.jsx('span', { className: on.iconLeft, 'aria-hidden': 'true', children: f }),
      u.jsx('span', { className: on.label, children: l }),
      d != null
        ? u.jsx('span', { className: on.iconRight, 'aria-hidden': 'true', children: d })
        : f != null
          ? u.jsx('span', {
              className: `${on.iconRight} ${on.iconSpacer}`,
              'aria-hidden': 'true',
              children: f,
            })
          : null,
    ],
  });
}
const o3 = '_overlay_1i1z1_12',
  r3 = '_fullscreen_1i1z1_21',
  u3 = '_absolute_1i1z1_27',
  f3 = '_alignCenter_1i1z1_33',
  d3 = '_alignTop_1i1z1_38',
  m3 = '_alignBottom_1i1z1_44',
  h3 = '_content_1i1z1_50',
  Al = {
    overlay: o3,
    fullscreen: r3,
    absolute: u3,
    alignCenter: f3,
    alignTop: d3,
    alignBottom: m3,
    content: h3,
  },
  p3 = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  L0 = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  y3 = { center: Al.alignCenter, top: Al.alignTop, bottom: Al.alignBottom };
function yo({
  fullscreen: l = !0,
  children: i,
  onClose: s,
  dismissible: o = !0,
  dimLevel: f = 'normal',
  blur: d = 0,
  align: m = 'center',
  zIndex: p = 'overlay',
  style: g,
  open: y,
}) {
  const _ = () => {
      o && s && s();
    },
    b = (U) => {
      U.stopPropagation();
    },
    A = p3[f],
    M = typeof p == 'number' ? p : (L0[p] ?? L0.overlay),
    E = {
      background: `rgba(2, 4, 10, ${A})`,
      zIndex: M,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...g,
    };
  return u.jsx('div', {
    className: [Al.overlay, l ? Al.fullscreen : Al.absolute, y3[m]].join(' '),
    style: E,
    onClick: _,
    role: 'presentation',
    'aria-modal': 'true',
    children: u.jsx('div', { className: Al.content, onClick: b, children: i }),
  });
}
const g3 = '_wrapper_131tr_1',
  v3 = '_disabled_131tr_5',
  _3 = '_input_131tr_18',
  eo = {
    wrapper: g3,
    disabled: v3,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: _3,
  },
  Wu = ({
    value: l,
    min: i = 0,
    max: s = 1,
    step: o = 0.01,
    onChange: f,
    color: d = 'primary',
    disabled: m = !1,
  }) => {
    const p = s === i ? 0 : ((l - i) / (s - i)) * 100,
      g = (_) => {
        m || f(parseFloat(_.target.value));
      },
      y = { '--slider-fill-pct': `${p}%` };
    return u.jsx('div', {
      className: [eo.wrapper, eo[`color-${d}`], m ? eo.disabled : ''].join(' '),
      style: y,
      children: u.jsx('input', {
        type: 'range',
        className: eo.input,
        min: i,
        max: s,
        step: o,
        value: l,
        onChange: g,
        disabled: m,
        'aria-valuenow': l,
        'aria-valuemin': i,
        'aria-valuemax': s,
      }),
    });
  },
  b3 = '_dialog_49iek_13',
  S3 = '_card_49iek_20',
  x3 = '_titleRow_49iek_27',
  j3 = '_titleIcon_49iek_33',
  A3 = '_title_49iek_27',
  T3 = '_message_49iek_46',
  M3 = '_actions_49iek_50',
  E3 = '_variantDanger_49iek_57',
  Vn = {
    dialog: b3,
    card: S3,
    titleRow: x3,
    titleIcon: j3,
    title: A3,
    message: T3,
    actions: M3,
    variantDanger: E3,
  };
function E1({
  open: l,
  title: i,
  message: s,
  iconName: o,
  confirmLabel: f = '確定',
  cancelLabel: d = 'キャンセル',
  onConfirm: m,
  onCancel: p,
  variant: g = 'default',
}) {
  return l
    ? u.jsx(yo, {
        open: l,
        onClose: p,
        dismissible: !0,
        children: u.jsx('div', {
          className: [Vn.dialog, g === 'danger' ? Vn.variantDanger : ''].filter(Boolean).join(' '),
          children: u.jsxs(Kn, {
            variant: 'elevated',
            padding: 'lg',
            className: Vn.card,
            children: [
              u.jsxs('div', {
                className: Vn.titleRow,
                children: [
                  o != null &&
                    u.jsx('span', {
                      className: Vn.titleIcon,
                      'aria-hidden': 'true',
                      children: u.jsx(Ye, {
                        name: o,
                        size: 20,
                        color: g === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  u.jsx(Y, { variant: 'heading-3', as: 'h2', className: Vn.title, children: i }),
                ],
              }),
              s != null &&
                s.length > 0 &&
                u.jsx(Y, { variant: 'body', color: 'mid', className: Vn.message, children: s }),
              u.jsxs('div', {
                className: Vn.actions,
                children: [
                  u.jsx(Lt, { label: d, variant: 'ghost', fullWidth: !0, onClick: p }),
                  u.jsx(Lt, {
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
function w3({
  open: l,
  bgmVolume: i,
  seVolume: s,
  onBgmChange: o,
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
      u.jsx(yo, {
        open: l,
        onClose: m,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !p,
        children: u.jsxs(Kn, {
          variant: 'elevated',
          padding: 'lg',
          className: Aa.card,
          children: [
            u.jsx('div', {
              className: Aa.header,
              children: u.jsx(Y, {
                variant: 'heading-2',
                as: 'h2',
                align: 'center',
                children: 'メニュー',
              }),
            }),
            u.jsxs('div', {
              className: Aa.soundSection,
              children: [
                u.jsxs('div', {
                  className: Aa.sliderRow,
                  children: [
                    u.jsx(Y, {
                      variant: 'label',
                      color: 'mid',
                      className: Aa.sliderLabel,
                      children: 'BGM',
                    }),
                    u.jsx(Y, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: Aa.sliderValue,
                      children: Math.round(i * 100).toString(),
                    }),
                  ],
                }),
                u.jsx(Wu, { value: i, min: 0, max: 1, step: 0.01, onChange: o, color: 'primary' }),
                u.jsxs('div', {
                  className: Aa.sliderRow,
                  children: [
                    u.jsx(Y, {
                      variant: 'label',
                      color: 'mid',
                      className: Aa.sliderLabel,
                      children: 'SE',
                    }),
                    u.jsx(Y, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: Aa.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                u.jsx(Wu, { value: s, min: 0, max: 1, step: 0.01, onChange: f, color: 'primary' }),
              ],
            }),
            u.jsx('div', { className: Aa.divider, role: 'separator' }),
            u.jsxs('div', {
              className: Aa.actions,
              children: [
                u.jsx(Lt, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: y }),
                u.jsx(Lt, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: m }),
              ],
            }),
          ],
        }),
      }),
      u.jsx(E1, {
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
const N3 = '_card_1fzt0_2',
  z3 = '_header_1fzt0_14',
  C3 = '_statusText_1fzt0_19',
  R3 = '_section_1fzt0_23',
  O3 = '_sectionTitle_1fzt0_29',
  D3 = '_statsGrid_1fzt0_35',
  B3 = '_statItem_1fzt0_41',
  L3 = '_rewardList_1fzt0_52',
  $3 = '_rewardCurrency_1fzt0_58',
  k3 = '_patchList_1fzt0_66',
  H3 = '_patchItem_1fzt0_72',
  U3 = '_actions_1fzt0_87',
  At = {
    card: N3,
    header: z3,
    statusText: C3,
    section: R3,
    sectionTitle: O3,
    statsGrid: D3,
    statItem: B3,
    rewardList: L3,
    rewardCurrency: $3,
    patchList: k3,
    patchItem: H3,
    actions: U3,
  },
  q3 = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  V3 = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function G3(l) {
  const i = Math.floor(l / 60),
    s = Math.floor(l % 60);
  return `${i.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function Y3({
  open: l,
  status: i,
  reachedTier: s,
  reachedWave: o,
  killed: f,
  elapsedSec: d,
  reward: m,
  onClose: p,
}) {
  if (!l) return null;
  const g = q3[i],
    y = V3[i];
  return u.jsx(yo, {
    open: l,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: u.jsxs(Kn, {
      variant: 'elevated',
      padding: 'lg',
      className: At.card,
      children: [
        u.jsx('div', {
          className: At.header,
          children: u.jsx(Y, {
            variant: 'heading-1',
            as: 'h2',
            color: y,
            align: 'center',
            className: At.statusText,
            children: g,
          }),
        }),
        u.jsxs('div', {
          className: At.section,
          children: [
            u.jsx(Y, {
              variant: 'label',
              color: 'mid',
              className: At.sectionTitle,
              children: 'バトル記録',
            }),
            u.jsxs('div', {
              className: At.statsGrid,
              children: [
                u.jsxs('div', {
                  className: At.statItem,
                  children: [
                    u.jsx(Y, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    u.jsx(Y, { variant: 'numeric-m', color: 'primary', children: s.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: At.statItem,
                  children: [
                    u.jsx(Y, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    u.jsx(Y, { variant: 'numeric-m', color: 'primary', children: o.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: At.statItem,
                  children: [
                    u.jsx(Y, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    u.jsx(Y, { variant: 'numeric-m', color: 'primary', children: f.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: At.statItem,
                  children: [
                    u.jsx(Y, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    u.jsx(Y, { variant: 'numeric-m', color: 'primary', children: G3(d) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        u.jsxs('div', {
          className: At.section,
          children: [
            u.jsx(Y, {
              variant: 'label',
              color: 'mid',
              className: At.sectionTitle,
              children: '獲得',
            }),
            u.jsxs('div', {
              className: At.rewardList,
              children: [
                u.jsx('div', {
                  className: At.rewardCurrency,
                  children: u.jsx(Ml, { currency: 'bolt', value: m.bolt, size: 'lg' }),
                }),
                u.jsx('div', {
                  className: At.rewardCurrency,
                  children: u.jsx(Ml, { currency: 'alloy', value: m.alloy, size: 'lg' }),
                }),
                m.patches.length > 0 &&
                  u.jsx('div', {
                    className: At.patchList,
                    children: m.patches.map((_, b) =>
                      u.jsxs(
                        'div',
                        {
                          className: At.patchItem,
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
          className: At.actions,
          children: u.jsx(Lt, {
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
const Z3 = '_root_1tank_3',
  X3 = '_inner_1tank_20',
  K3 = '_header_1tank_28',
  Q3 = '_headerText_1tank_35',
  W3 = '_grid_1tank_44',
  Mc = { root: Z3, inner: X3, header: K3, headerText: Q3, grid: W3 };
function J3({ open: l, screw: i, levels: s, onUpgrade: o, onClose: f }) {
  return l
    ? u.jsx('section', {
        className: Mc.root,
        role: 'dialog',
        'aria-modal': 'false',
        'aria-label': 'ラン中ワークショップ',
        children: u.jsxs('div', {
          className: Mc.inner,
          children: [
            u.jsxs('div', {
              className: Mc.header,
              children: [
                u.jsxs('div', {
                  className: Mc.headerText,
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
                u.jsx(Ml, { currency: 'screw', value: i, size: 'md' }),
                f != null &&
                  u.jsx(co, {
                    icon: 'chevron-down',
                    label: '閉じる',
                    variant: 'ghost',
                    size: 'sm',
                    onClick: f,
                  }),
              ],
            }),
            u.jsx('div', {
              className: Mc.grid,
              children: i1.map((d) => {
                const m = s[d.key],
                  p = mn(m),
                  g = mn(m + 1),
                  y = of(d, m),
                  _ = c1(d, m, 5),
                  { totalCost: b, lvDelta: A } = s1(d, m, i),
                  M = W.fromNumber(y),
                  E = W.fromNumber(_),
                  U = i.gte(M),
                  O = i.gte(E),
                  K = A > 0;
                return u.jsx(
                  ff,
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
                      { amount: '+1', cost: M, disabled: !U },
                      { amount: '+5', cost: E, disabled: !O },
                      { amount: 'MAX', cost: b, disabled: !K },
                    ],
                    onUpgrade: (V) => {
                      V === '+1'
                        ? o(d.key, 1)
                        : V === '+5'
                          ? o(d.key, 5)
                          : V === 'MAX' && o(d.key, 'max');
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
const F3 = '_root_9fvdn_2',
  I3 = { root: F3 },
  ku = [
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
function P3({ items: l = [], showTower: i = !1, towerContent: s = null, cycleSeconds: o = 24 }) {
  const d = `ssfx-${q.useId().replace(/:/g, '')}`,
    m = ku.map((b, A) => {
      const M = 100 / b.length,
        E = b
          .map(([U, O], K) => {
            const V = K * M;
            return `
          ${V}%               { left: ${U}%; top: ${O}%; opacity: 0; }
          ${(V + 3).toFixed(2)}%   { left: ${U}%; top: ${O}%; opacity: 1; }
          ${(V + M - 7).toFixed(2)}%  { left: ${U}%; top: ${O}%; opacity: 1; }
          ${(V + M - 3).toFixed(2)}%  { left: ${U}%; top: ${O}%; opacity: 0; }
        `;
          })
          .join('');
      return `@keyframes ${d}-drift-${A + 1} { ${E} 100% { opacity: 0; } }`;
    }).join(`
`),
    p = ku.map(
      (b, A) => `.${d}-p${A + 1} { animation: ${d}-drift-${A + 1} ${o}s linear infinite; }`
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
    _ = i ? [y, ...l] : [...l];
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
        const M = (A % ku.length) + 1,
          E = -(A * (o / Math.max(_.length, 1)));
        return u.jsx(
          'div',
          {
            className: `${d}-slot ${d}-p${M}${A === 0 ? ` ${d}-rm-show` : ''}`,
            style: { animationDelay: `${E}s` },
            children: b,
          },
          A
        );
      }),
    ],
  });
}
function e4({ open: l, onClose: i }) {
  return l
    ? u.jsx('div', {
        className: I3.root,
        onClick: i,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (s) => {
          (s.key === 'Enter' || s.key === ' ') && i();
        },
        children: u.jsx(P3, {
          showTower: !0,
          towerContent: u.jsx(Ye, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
const wl = { HP: 10, ATK: 2, SPD: 10, SPAWN_INTERVAL: 2, HP_GROWTH: 1.8, ATK_GROWTH: 1.4 };
function t4(l) {
  return l <= 10
    ? 1 + 0.074 * (l - 1)
    : l <= 20
      ? 1 + 0.074 * 9 + 0.133 * (l - 10)
      : 1 + 0.074 * 9 + 0.133 * 10 + 0.2 * (l - 20);
}
function a4(l) {
  return l <= 10
    ? 1 + 0.037 * (l - 1)
    : l <= 20
      ? 1 + 0.037 * 9 + 0.067 * (l - 10)
      : 1 + 0.037 * 9 + 0.067 * 10 + 0.1 * (l - 20);
}
function n4(l) {
  return l <= 10
    ? 1 + 0.019 * (l - 1)
    : l <= 20
      ? 1 + 0.019 * 9 + 0.033 * (l - 10)
      : 1 + 0.019 * 9 + 0.033 * 10 + 0.05 * (l - 20);
}
function l4(l) {
  return 1 + 0.2 * Math.max(0, l - 1);
}
function i4(l) {
  return Math.pow(1.5, Math.max(0, l - 1));
}
function c4(l) {
  let i = W.fromNumber(wl.HP);
  for (let s = 1; s < l; s++) i = i.mulNumber(wl.HP_GROWTH);
  return i;
}
function s4(l) {
  let i = W.fromNumber(wl.ATK);
  for (let s = 1; s < l; s++) i = i.mulNumber(wl.ATK_GROWTH);
  return i;
}
const o4 = { standard: 1, swift: 0.6, tough: 5 },
  r4 = { standard: 1, swift: 0.5, tough: 1 },
  u4 = { standard: 1, swift: 2, tough: 0.5 },
  f4 = { elite: 10, miniboss: 50, boss: 250 },
  d4 = { elite: 2.5, miniboss: 5, boss: 8 },
  m4 = {
    elite: { screw: 10, bolt: 10, alloyChance: 0.3, alloyAmount: 1 },
    miniboss: { screw: 50, bolt: 50, alloyChance: 1, alloyAmount: 1 },
    boss: { screw: 250, bolt: 250, alloyChance: 1, alloyAmount: 5 },
  },
  h4 = { standard: 1, swift: 2, tough: 5 },
  p4 = { standard: 1, swift: 2, tough: 5 };
function $0(l, i, s, o) {
  const f = c4(l),
    d = s4(l),
    m = t4(i),
    p = a4(i),
    g = l4(i) * i4(l);
  if (s === 'normal') {
    const E = o ?? 'standard',
      U = f.mulNumber(o4[E]).mulNumber(m),
      O = d.mulNumber(r4[E]).mulNumber(p),
      K = wl.SPD * u4[E];
    return {
      kind: 'normal',
      subtype: E,
      hp: U,
      atk: O,
      speed: K,
      reward: {
        screw: Math.max(1, Math.round(h4[E] * g)),
        bolt: p4[E],
        alloyChance: 0,
        alloyAmount: 0,
      },
    };
  }
  const y = s,
    _ = f.mulNumber(f4[y]).mulNumber(m),
    b = d.mulNumber(d4[y]).mulNumber(p),
    A = wl.SPD,
    M = m4[y];
  return {
    kind: s,
    hp: _,
    atk: b,
    speed: A,
    reward: { ...M, screw: Math.max(1, Math.round(M.screw * g)) },
  };
}
function k0(l, i, s, o) {
  const f = o() < 0.5 ? 0 : 100,
    d = o() * 100;
  return { ...l, id: i, spawnedAtMs: s, position: { x: f, y: d }, maxHp: l.hp };
}
const y4 = 30,
  Ju = 26;
function g4(l) {
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
function v4(l) {
  const i = [];
  for (let s = 1; s <= y4; s++) {
    const o = n4(s),
      f = wl.SPAWN_INTERVAL / o,
      d = g4(s);
    let m;
    (s === 5 || s === 15 || s === 25
      ? (m = 'elite')
      : s === 10 || s === 20
        ? (m = 'miniboss')
        : s === 30 && (m = 'boss'),
      i.push({
        waveIndex: s,
        tier: l,
        durationSec: Ju,
        spawnIntervalSec: f,
        normalSpawnTable: d,
        eliteKind: m,
      }));
  }
  return i;
}
function _4(l, i, s, o, f) {
  const d = [],
    m = i / 1e3,
    p = s / 1e3,
    g = Math.floor(m / l.spawnIntervalSec),
    y = Math.floor(p / l.spawnIntervalSec),
    _ = g - y;
  for (let M = 0; M < _; M++) {
    const E = b4(l.normalSpawnTable, o),
      U = $0(l.tier, l.waveIndex, 'normal', E);
    d.push(k0(U, f(), i, o));
  }
  const A = l.durationSec - 1;
  if (l.eliteKind !== void 0 && p < A && m >= A) {
    const M = $0(l.tier, l.waveIndex, l.eliteKind);
    d.push(k0(M, f(), i, o));
  }
  return d;
}
function b4(l, i) {
  const s = i();
  let o = 0;
  for (const f of l) if (((o += f.weight), s < o)) return f.subtype;
  return l[l.length - 1].subtype;
}
const H0 = 50,
  U0 = 50;
function S4(l, i, s) {
  if (l.frozenUntilMs != null && s != null && l.frozenUntilMs > s) return l;
  const o = H0 - l.position.x,
    f = U0 - l.position.y,
    d = Math.sqrt(o * o + f * f);
  if (d <= 0) return l;
  const m = l.speed * i;
  if (m <= 0) return l;
  if (m >= d) return { ...l, position: { x: H0, y: U0 } };
  const p = m / d;
  return { ...l, position: { x: l.position.x + o * p, y: l.position.y + f * p } };
}
function _i(l, i, s) {
  const o = Mi.find((f) => f.key === l);
  return o == null ? s : El(o, i);
}
function Hu({ machineMaxHp: l, machineLevels: i }) {
  return {
    baseAttack: W.fromNumber(_i('baseAttack', i.baseAttack, 1)),
    defense: W.fromNumber(_i('defense', i.defense, 1)),
    damageReduction: _i('damageReduction', i.damageReduction, 0),
    critRate: _i('critRate', i.critRate, 0),
    critMultiplier: _i('critMultiplier', i.critMultiplier, 1.5),
    maxHp: l.isZero() ? W.fromNumber(1) : l,
    hpRegen: W.fromNumber(_i('hpRegen', i.hpRegen, 1)),
  };
}
function x4(l, i) {
  switch (l) {
    case 'laser':
      return mo(i).attackPerSec;
    case 'cannon':
      return fo(i).attackPerSec;
    case 'thunder':
      return ho(i).attackPerSec;
    case 'cutter':
      return $c(i).attackPerSec;
  }
}
function j4({
  weapon: l,
  weaponLv: i,
  machine: s,
  enemiesInRange: o,
  rng: f,
  cutterAngleDeg: d = 0,
  attackMul: m,
}) {
  switch (l) {
    case 'laser': {
      const p = mo(i),
        g = { ...p, damageMul: p.damageMul * m };
      return {
        hits: A2(s, g, o, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cannon': {
      const p = fo(i),
        g = { ...p, damageMul: p.damageMul * m },
        y = o2(s, g, o, f);
      return {
        hits: y.hits.map((_) => ({ enemyId: _.enemyId, damage: _.damage, crit: _.crit })),
        impactX: y.blastX,
        impactY: y.blastY,
      };
    }
    case 'thunder': {
      const p = ho(i),
        g = { ...p, damageMul: p.damageMul * m };
      return {
        hits: R2(s, g, o, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cutter': {
      const p = $c(i),
        g = { ...p, damageMul: p.damageMul * m },
        y = v2(s, g, o, d, f);
      return {
        hits: y.hits.map((_) => ({ enemyId: _.enemyId, damage: _.damage, crit: _.crit })),
        cutterAngle: y.angle,
      };
    }
  }
}
function A4(l, i, s) {
  if (i.type !== 'onWaveClear') return null;
  const o = l.tier;
  return { boltGain: W.fromNumber(5 * o) };
}
function T4(l, i, s) {
  if (i.type !== 'onDropRoll') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { dropMultiplier: 2 };
}
function M4(l, i, s) {
  return i.type !== 'onAttack' || i.enemyKind === 'normal'
    ? null
    : { damageMultiplier: 1 + 0.05 * l.tier };
}
function E4(l, i, s) {
  if (i.type !== 'onAttack') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { burnSec: 1 + 0.2 * o };
}
function w4(l, i, s) {
  if (i.type !== 'onHit') return null;
  const o = l.tier,
    f = 0.03,
    m = f + ((0.3 - f) * o) / (o + 20);
  return s() >= m ? null : { overrideReceivedDamage: W.ZERO };
}
function N4(l, i, s) {
  if (i.type !== 'onAttack') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { extraShot: !0 };
}
function z4(l, i, s) {
  if (i.type !== 'onAttack') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { freeze: !0, freezeSec: 1 + 0.2 * o };
}
function C4(l, i, s) {
  if (i.type !== 'onAttack' || i.enemyKind !== 'normal') return null;
  const o = l.tier,
    f = 0.02,
    m = f + ((0.2 - f) * o) / (o + 20);
  return s() >= m ? null : { instantKill: !0 };
}
function R4(l, i, s) {
  if (i.type !== 'onKill') return null;
  const o = l.tier,
    f = Math.ceil(0.5 * o);
  return { heal: W.fromNumber(f) };
}
function O4(l, i, s) {
  if (i.type !== 'onWaveClear') return null;
  const o = l.tier;
  return { heal: W.fromNumber(5 * o) };
}
const D4 = {
  instantKill: C4,
  bossKiller: M4,
  doubleShot: N4,
  damageImmune: w4,
  killHeal: R4,
  shieldRegen: O4,
  bonusDrop: T4,
  boltCast: A4,
  freezeHit: z4,
  burnHit: E4,
};
function B4(l, i) {
  const s = { ...l };
  if (
    (i.damageMultiplier !== void 0 &&
      (s.damageMultiplier = (s.damageMultiplier ?? 1) + (i.damageMultiplier - 1)),
    i.instantKill && (s.instantKill = !0),
    i.overrideReceivedDamage !== void 0)
  )
    if (s.overrideReceivedDamage === void 0) s.overrideReceivedDamage = i.overrideReceivedDamage;
    else {
      const o = s.overrideReceivedDamage,
        f = i.overrideReceivedDamage;
      s.overrideReceivedDamage = o.lte(f) ? o : f;
    }
  return (
    i.heal !== void 0 && (s.heal = (s.heal ?? W.ZERO).add(i.heal)),
    i.shieldRecover !== void 0 && (s.shieldRecover = (s.shieldRecover ?? 0) + i.shieldRecover),
    i.dropMultiplier !== void 0 &&
      (s.dropMultiplier = (s.dropMultiplier ?? 1) + (i.dropMultiplier - 1)),
    i.boltGain !== void 0 && (s.boltGain = (s.boltGain ?? W.ZERO).add(i.boltGain)),
    i.extraShot && (s.extraShot = !0),
    i.freeze && ((s.freeze = !0), (s.freezeSec = Math.max(s.freezeSec ?? 0, i.freezeSec ?? 0))),
    i.burnSec !== void 0 && (s.burnSec = Math.max(s.burnSec ?? 0, i.burnSec)),
    s
  );
}
function Ec(l, i, s) {
  let o = {};
  for (const f of l) {
    const d = D4[f.name];
    if (d === void 0) continue;
    const m = d(f, i, s);
    m !== null && (o = B4(o, m));
  }
  return o;
}
const L4 = { normal: 0, elite: 0.01, miniboss: 0.05, boss: 0.2 },
  Uu = [
    'instantKill',
    'bossKiller',
    'doubleShot',
    'damageImmune',
    'killHeal',
    'shieldRegen',
    'bonusDrop',
    'boltCast',
    'freezeHit',
    'burnHit',
  ];
function $4(l, i, s) {
  const o = L4[l] ?? 0;
  if (o <= 0) return !1;
  const f = Math.min(1, o * i);
  return s() < f;
}
function k4(l, i) {
  const s = Math.max(1, Math.floor(l)),
    o = (s * (s + 1)) / 2;
  let f = i() * o;
  for (let d = 1; d <= s; d++) {
    const m = s - d + 1;
    if (f < m) return d;
    f -= m;
  }
  return s;
}
function H4(l) {
  const i = Math.floor(l() * Uu.length);
  return Uu[Math.min(Uu.length - 1, i)];
}
function U4(l, i, s, o) {
  if (!$4(l, s, o)) return null;
  const f = k4(i, o);
  return { name: H4(o), tier: f };
}
const q4 = 1;
function V4(l, i) {
  if (i) return 0;
  const s = l / 1e3;
  return Math.min(q4, Math.max(0, s));
}
const G4 = 1;
function Y4(l, i, s, o, f) {
  if (s >= o) {
    const d = Math.max(0, (i - G4) * 1e3);
    return l >= d && f === 0 ? 'advanceTier' : 'continue';
  }
  return l < i * 1e3 ? 'continue' : 'advanceWave';
}
function Z4(l, i, s, o) {
  const f = l !== i;
  return { resetElapsed: f || s !== o, resetEnemies: f };
}
const fn = 50,
  dn = 50;
function to(l) {
  const i = l.x - fn,
    s = l.y - dn;
  return Math.sqrt(i * i + s * s);
}
const w1 = 10,
  X4 = 5,
  K4 = 5;
function Q4(l, i, s) {
  let o = l.x - i.x,
    f = l.y - i.y;
  const d = Math.sqrt(o * o + f * f);
  return (
    d === 0 ? ((o = 1), (f = 0)) : ((o /= d), (f /= d)),
    { x: Math.max(0, Math.min(100, l.x + o * s)), y: Math.max(0, Math.min(100, l.y + f * s)) }
  );
}
const W4 = 14,
  J4 = {
    laser: 'laserShoot',
    cannon: 'cannonShoot',
    thunder: 'thunderShoot',
    cutter: 'cutterShoot',
  },
  F4 = {
    laser: 'activeLaser',
    cannon: 'activeCannon',
    thunder: 'activeThunder',
    cutter: 'activeCutter',
  },
  I4 = 0.5;
function P4({ range: l, paused: i = !1 }) {
  const s = q.useRef(i);
  s.current = i;
  const o = q.useRef(null),
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
    E = q.useRef(0),
    U = q.useRef(0),
    O = q.useRef(0),
    K = q.useRef(new Set()),
    V = q.useRef({ active: !1, remainingSec: 0, attackSpeedMul: 1, damageMul: 1 }),
    se = q.useRef([]),
    [C, ae] = q.useState([]),
    [de, P] = q.useState([]),
    [Re, it] = q.useState([]),
    [et, ke] = q.useState([]),
    [at, $t] = q.useState([]),
    [Ut, ot] = q.useState([]),
    [D, Z] = q.useState(0),
    [ie, Te] = q.useState(!1),
    Ee = G((he) => he.isRunActive),
    x = G((he) => he.currentTier),
    k = G((he) => he.currentWave),
    X = q.useMemo(() => v4(x), [x]),
    F = q.useRef(x),
    ce = q.useRef(k);
  q.useEffect(() => {
    const he = Z4(F.current, x, ce.current, k);
    ((F.current = x),
      (ce.current = k),
      he.resetElapsed && ((d.current = 0), (m.current = 0), Z(0)),
      he.resetEnemies && ((p.current = []), ae([]), (se.current = [])));
  }, [x, k]);
  const me = q.useCallback((he) => {
      P((vt) => vt.filter((Qe) => Qe.id !== he));
    }, []),
    Me = q.useCallback((he) => {
      it((vt) => vt.filter((Qe) => Qe.id !== he));
    }, []),
    pt = q.useCallback((he) => {
      ke((vt) => vt.filter((Qe) => Qe.id !== he));
    }, []),
    Ke = q.useCallback((he) => {
      $t((vt) => vt.filter((Qe) => Qe.id !== he));
    }, []),
    $a = q.useCallback((he) => {
      ot((vt) => vt.filter((Qe) => Qe.id !== he));
    }, []),
    Na = q.useCallback(() => {
      const he = G.getState();
      if (he.activeCdSec > 0 || he.machineHp.isZero() || !he.isRunActive || !he.triggerActive(rf))
        return !1;
      Ie.play(F4[he.currentWeapon]);
      const Qe = Hu({ machineMaxHp: he.machineMaxHp, machineLevels: he.machineLevels }),
        ne = mn(he.runWorkshopLevels.attackMul),
        ga = [],
        rt = [],
        _t = (De) => {
          const Tt = new Map(De.map((He) => [He.enemyId, He]));
          p.current = p.current.map((He) => {
            const Ze = Tt.get(He.id);
            return Ze == null
              ? He
              : ((b.current += 1),
                ga.push({
                  id: `de-${b.current}`,
                  x: He.position.x,
                  y: He.position.y,
                  value: Ze.damage,
                  crit: Ze.crit ?? !1,
                }),
                { ...He, hp: He.hp.sub(Ze.damage) });
          });
        };
      switch (he.currentWeapon) {
        case 'laser': {
          const De = mo(he.weaponLv),
            Tt = { ...De, damageMul: De.damageMul * ne };
          let He = 0;
          if (p.current.length > 0) {
            const Rt = p.current.reduce((ka, Ha) => (to(Ha.position) < to(ka.position) ? Ha : ka)),
              Be = Rt.position.x - fn,
              na = Rt.position.y - dn;
            He = (Math.atan2(na, Be) * 180) / Math.PI;
          }
          const Ze = M2(Qe, Tt, p.current, He, fn, dn);
          (_t(Ze.hits.map((Rt) => ({ enemyId: Rt.enemyId, damage: Rt.damage }))),
            (M.current += 1),
            rt.push({ id: `pe-${M.current}`, kind: 'megaBeam', x: fn, y: dn, angle: He }));
          break;
        }
        case 'cannon': {
          const De = fo(he.weaponLv),
            Tt = { ...De, damageMul: De.damageMul * ne },
            He = r2(Qe, Tt, p.current),
            Ze = 480,
            Rt = O.current;
          for (const Be of He.shots) {
            ((M.current += 1),
              rt.push({
                id: `pe-${M.current}`,
                kind: 'cannonShell',
                x1: fn,
                y1: dn,
                x2: Be.blastX,
                y2: Be.blastY,
                durationMs: Ze,
              }),
              (M.current += 1),
              rt.push({
                id: `pe-${M.current}`,
                kind: 'blast',
                x: Be.blastX,
                y: Be.blastY,
                delayMs: Ze,
              }));
            for (const na of Be.hits)
              se.current.push({
                enemyId: na.enemyId,
                damage: na.damage,
                crit: !1,
                freeze: !1,
                applyAtMs: Rt + Ze,
              });
          }
          break;
        }
        case 'thunder': {
          const De = ho(he.weaponLv),
            Tt = { ...De, damageMul: De.damageMul * ne },
            He = O2(Qe, Tt, p.current),
            Ze = [{ x: fn, y: dn }];
          for (const Rt of He.hits) {
            const Be = p.current.find((na) => na.id === Rt.enemyId);
            Be != null && Ze.push({ x: Be.position.x, y: Be.position.y });
          }
          (Ze.length > 1 &&
            ((M.current += 1), rt.push({ id: `pe-${M.current}`, kind: 'chain', points: Ze })),
            _t(He.hits));
          break;
        }
        case 'cutter': {
          const De = $c(he.weaponLv);
          ((V.current = _2(De)), Te(!0));
          break;
        }
      }
      return (
        ga.length > 0 && P((De) => [...De, ...ga]),
        rt.length > 0 && ke((De) => [...De, ...rt]),
        !0
      );
    }, []);
  return (
    q.useEffect(() => {
      if (!Ee) return;
      const he = (vt) => {
        const Qe = vt - f.current;
        f.current = vt;
        const ne = G.getState(),
          ga = ne.machineHp.isZero(),
          rt = V4(Qe, ne.isPaused || ga || s.current);
        if (rt > 0) {
          O.current += rt * 1e3;
          const _t = O.current,
            De = Array.from(ne.equippedPatches.values());
          (ne.tickCooldowns(rt),
            ne.isAutoActive && ne.activeCdSec <= 0 && Na(),
            V.current.active && ((V.current = b2(V.current, rt)), V.current.active || Te(!1)),
            (m.current = d.current),
            (d.current += rt * 1e3));
          const Tt = X[ne.currentWave - 1];
          if (Tt != null) {
            const He = _4(
              Tt,
              d.current,
              m.current,
              Math.random,
              () => ((g.current += 1), `e-${ne.currentTier}-${ne.currentWave}-${g.current}`)
            );
            if (He.length > 0) {
              p.current = [...p.current, ...He];
              const J = He.filter((ue) => ue.kind !== 'normal');
              if (J.length > 0) {
                const ue = J.map((ge) => {
                  U.current += 1;
                  const we = ge.kind,
                    We =
                      we === 'boss'
                        ? `TIER ${ne.currentTier} BOSS`
                        : we === 'miniboss'
                          ? `MINI BOSS T${ne.currentTier}W${ne.currentWave}`
                          : `ELITE T${ne.currentTier}W${ne.currentWave}`;
                  return { id: `ap-${U.current}`, kind: we, name: We };
                });
                ot((ge) => [...ge, ...ue]);
              }
            }
            ((p.current = p.current.map((J) => S4(J, rt, _t))),
              (p.current = p.current.map((J) => {
                let ue = J;
                if (ue.burnUntilMs != null && ue.burnPerSec != null && ue.burnUntilMs > _t) {
                  const we = ue.burnPerSec.mulNumber(rt);
                  ue = { ...ue, hp: ue.hp.sub(we) };
                }
                const ge = {};
                return (
                  ue.frozenUntilMs != null && ue.frozenUntilMs <= _t && (ge.frozenUntilMs = void 0),
                  ue.burnUntilMs != null &&
                    ue.burnUntilMs <= _t &&
                    ((ge.burnUntilMs = void 0), (ge.burnPerSec = void 0)),
                  Object.keys(ge).length > 0 && (ue = { ...ue, ...ge }),
                  ue
                );
              })));
            const Ze = [];
            se.current = se.current.filter((J) => (J.applyAtMs <= _t ? (Ze.push(J), !1) : !0));
            const Rt = [];
            if (Ze.length > 0) {
              const J = new Map(Ze.map((ue) => [ue.enemyId, ue]));
              p.current = p.current.map((ue) => {
                const ge = J.get(ue.id);
                if (ge == null) return ue;
                let we = { ...ue, hp: ue.hp.sub(ge.damage) };
                if (ge.freeze && ge.freezeSec != null && ge.freezeSec > 0) {
                  const We = _t + ge.freezeSec * 1e3;
                  we = { ...we, frozenUntilMs: Math.max(we.frozenUntilMs ?? 0, We) };
                }
                if (ge.burnSec != null && ge.burnSec > 0) {
                  const We = _t + ge.burnSec * 1e3,
                    kt = ge.damage.mulNumber(0.3),
                    Oe = we.burnPerSec;
                  we = {
                    ...we,
                    burnUntilMs: Math.max(we.burnUntilMs ?? 0, We),
                    burnPerSec: Oe != null && Oe.gt(kt) ? Oe : kt,
                  };
                }
                return we;
              });
              for (const ue of Ze) {
                const ge = p.current.find((we) => we.id === ue.enemyId);
                ((b.current += 1),
                  Rt.push({
                    id: `de-${b.current}`,
                    x: (ge == null ? void 0 : ge.position.x) ?? 50,
                    y: (ge == null ? void 0 : ge.position.y) ?? 50,
                    value: ue.damage,
                    crit: ue.crit,
                  }));
              }
            }
            const Be = ne.runWorkshopLevels.attackMul,
              na = ne.runWorkshopLevels.attackSpeedMul,
              ka = mn(Be),
              Ha = mn(na),
              hn = x4(ne.currentWeapon, ne.weaponLv),
              Ei = V.current.active ? V.current.attackSpeedMul : 1,
              Jn = Math.min(w1, hn * Ha * Ei),
              Fn = Jn > 0 ? 1e3 / Jn : 1 / 0;
            y.current += rt * 1e3;
            let Cl = 0;
            const za = 10,
              yt = [],
              bt = [];
            for (; y.current >= Fn && Cl < za; ) {
              const J = ne.currentWeapon === 'cutter' ? W4 : l,
                ue = p.current
                  .map((We) => ({ enemy: We, dist: to(We.position) }))
                  .filter(({ dist: We }) => We <= J)
                  .sort((We, kt) => We.dist - kt.dist)
                  .map(({ enemy: We }) => We);
              if (ue.length === 0) {
                y.current = Math.min(y.current, Fn);
                break;
              }
              ((y.current -= Fn), (Cl += 1), Ie.play(J4[ne.currentWeapon]));
              const ge = Hu({ machineMaxHp: ne.machineMaxHp, machineLevels: ne.machineLevels }),
                we = j4({
                  weapon: ne.currentWeapon,
                  weaponLv: ne.weaponLv,
                  machine: ge,
                  enemiesInRange: ue,
                  rng: Math.random,
                  cutterAngleDeg: _.current,
                  attackMul: ka,
                });
              if ((we.cutterAngle != null && (_.current = we.cutterAngle), we.hits.length > 0)) {
                const We = we.hits.map((Oe) => {
                  const ye = p.current.find((tt) => tt.id === Oe.enemyId);
                  if (ye == null) return { ...Oe, freeze: !1, freezeSec: void 0, burnSec: void 0 };
                  const be = Ec(De, { type: 'onAttack', enemyKind: ye.kind }, Math.random);
                  let Xe = Oe.damage;
                  return (
                    be.damageMultiplier != null &&
                      be.damageMultiplier !== 1 &&
                      (Xe = Xe.mulNumber(be.damageMultiplier)),
                    be.extraShot && (Xe = Xe.add(Oe.damage)),
                    be.instantKill && (Xe = ye.hp),
                    {
                      ...Oe,
                      damage: Xe,
                      freeze: be.freeze === !0,
                      freezeSec: be.freezeSec,
                      burnSec: be.burnSec,
                    }
                  );
                });
                if (ne.currentWeapon === 'cannon')
                  for (const ye of We)
                    se.current.push({
                      enemyId: ye.enemyId,
                      damage: ye.damage,
                      crit: ye.crit ?? !1,
                      freeze: ye.freeze,
                      freezeSec: ye.freezeSec,
                      burnSec: ye.burnSec,
                      applyAtMs: _t + 480,
                    });
                else {
                  const Oe = new Map(We.map((ye) => [ye.enemyId, ye]));
                  p.current = p.current.map((ye) => {
                    const be = Oe.get(ye.id);
                    if (be == null) return ye;
                    let Xe = { ...ye, hp: ye.hp.sub(be.damage) };
                    if (be.freeze && be.freezeSec != null && be.freezeSec > 0) {
                      const tt = _t + be.freezeSec * 1e3;
                      Xe = { ...Xe, frozenUntilMs: Math.max(Xe.frozenUntilMs ?? 0, tt) };
                    }
                    if (be.burnSec != null && be.burnSec > 0) {
                      const tt = _t + be.burnSec * 1e3,
                        Mt = be.damage.mulNumber(0.3),
                        Ca = Xe.burnPerSec;
                      Xe = {
                        ...Xe,
                        burnUntilMs: Math.max(Xe.burnUntilMs ?? 0, tt),
                        burnPerSec: Ca != null && Ca.gt(Mt) ? Ca : Mt,
                      };
                    }
                    return Xe;
                  });
                  for (const ye of We) {
                    const be = p.current.find((Xe) => Xe.id === ye.enemyId);
                    ((b.current += 1),
                      yt.push({
                        id: `de-${b.current}`,
                        x: (be == null ? void 0 : be.position.x) ?? 50,
                        y: (be == null ? void 0 : be.position.y) ?? 50,
                        value: ye.damage,
                        crit: ye.crit,
                      }));
                  }
                }
                const kt = We.map((Oe) => p.current.find((ye) => ye.id === Oe.enemyId))
                  .filter((Oe) => Oe != null)
                  .map((Oe) => ({ x: Oe.position.x, y: Oe.position.y }));
                if (ne.currentWeapon === 'laser')
                  for (const Oe of kt)
                    ((M.current += 1),
                      bt.push({
                        id: `pj-${M.current}`,
                        kind: 'laser',
                        x1: fn,
                        y1: dn,
                        x2: Oe.x,
                        y2: Oe.y,
                      }));
                else if (ne.currentWeapon === 'cannon') {
                  const ye = we.impactX,
                    be = we.impactY;
                  ye != null &&
                    be != null &&
                    ((M.current += 1),
                    bt.push({
                      id: `pj-${M.current}`,
                      kind: 'cannonShell',
                      x1: fn,
                      y1: dn,
                      x2: ye,
                      y2: be,
                      durationMs: 480,
                    }),
                    (M.current += 1),
                    bt.push({ id: `pj-${M.current}`, kind: 'blast', x: ye, y: be, delayMs: 480 }));
                } else if (ne.currentWeapon === 'thunder' && kt.length > 0)
                  for (const ye of kt)
                    ((M.current += 1),
                      bt.push({
                        id: `pj-${M.current}`,
                        kind: 'thunderStrike',
                        x: ye.x,
                        y: ye.y,
                        durationMs: 320,
                      }));
              }
            }
            const St = [...yt, ...Rt];
            (St.length > 0 && P((J) => [...J, ...St]), bt.length > 0 && ke((J) => [...J, ...bt]));
            const wi = mn(ne.runWorkshopLevels.screwGainMul),
              pn = [],
              Q = [],
              Ua = [];
            let va = W.ZERO,
              qa = W.ZERO,
              la = W.ZERO,
              Va = W.ZERO;
            for (const J of p.current)
              if (J.hp.lte(W.ZERO)) {
                ((A.current += 1),
                  pn.push({ id: `dh-${A.current}`, x: J.position.x, y: J.position.y }));
                const ue = Ec(De, { type: 'onKill', enemyKind: J.kind }, Math.random);
                ue.heal != null && (Va = Va.add(ue.heal));
                const we =
                    Ec(
                      De,
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
                  ((va = va.add(W.fromNumber(We * wi * we))),
                  (E.current += 1),
                  Q.push({
                    id: `pk-${E.current}`,
                    x: J.position.x,
                    y: J.position.y,
                    iconName: 'screw',
                  }));
                const kt = J.reward.bolt;
                (kt > 0 &&
                  (J.kind !== 'normal' || Math.random() < I4) &&
                  ((qa = qa.add(W.fromNumber(kt * we))),
                  (E.current += 1),
                  Q.push({
                    id: `pk-${E.current}`,
                    x: J.position.x,
                    y: J.position.y,
                    iconName: 'bolt',
                  })),
                  J.reward.alloyChance > 0 &&
                    J.reward.alloyAmount > 0 &&
                    Math.random() < J.reward.alloyChance &&
                    ((la = la.add(W.fromNumber(J.reward.alloyAmount * we))),
                    (E.current += 1),
                    Q.push({
                      id: `pk-${E.current}`,
                      x: J.position.x,
                      y: J.position.y,
                      iconName: 'alloy',
                    })));
                const Oe =
                    El(
                      Mi.find((be) => be.key === 'patchDropRate'),
                      ne.machineLevels.patchDropRate
                    ) * we,
                  ye = U4(J.kind, ne.currentTier, Oe, Math.random);
                (ye != null && ne.addPatch(ye.name, ye.tier, 1),
                  Ie.play(J.kind === 'boss' || J.kind === 'miniboss' ? 'bossKill' : 'enemyKill'));
              } else Ua.push(J);
            (Va.isZero() || ne.setMachineHp(ne.machineHp.add(Va)),
              pn.length > 0 && ((p.current = Ua), it((J) => [...J, ...pn])),
              Q.length > 0 && $t((J) => [...J, ...Q]),
              va.isZero() || ne.addScrew(va),
              qa.isZero() || ne.addBolt(qa),
              la.isZero() || ne.addAlloy(la));
            const In = Hu({ machineMaxHp: ne.machineMaxHp, machineLevels: ne.machineLevels });
            let Pn = W.ZERO;
            const Ni = new Set();
            if (
              ((p.current = p.current.map((J) => {
                if (to(J.position) > X4) return J;
                const ge = e2(J.atk, In);
                return (
                  (Pn = Pn.add(ge.mulNumber(rt))),
                  Ni.add(J.id),
                  K.current.has(J.id) ? J : { ...J, position: Q4(J.position, { x: fn, y: dn }, K4) }
                );
              })),
              (K.current = Ni),
              !Pn.isZero())
            ) {
              const ue =
                Ec(De, { type: 'onHit', receivedDamage: Pn }, Math.random).overrideReceivedDamage ??
                Pn;
              if (!ue.isZero()) {
                const ge = ne.machineHp;
                ne.damageHp(ue);
                const we = G.getState().machineHp;
                Ie.play(we.isZero() && !ge.isZero() ? 'machineDown' : 'machineHit');
              }
            }
            const el = Y4(d.current, Tt.durationSec, ne.currentWave, X.length, p.current.length);
            if (el === 'advanceWave' || el === 'advanceTier') {
              const J = Ec(De, { type: 'onWaveClear' }, Math.random);
              (J.heal != null && !J.heal.isZero() && ne.setMachineHp(ne.machineHp.add(J.heal)),
                J.boltGain != null && !J.boltGain.isZero() && ne.addBolt(J.boltGain),
                el === 'advanceWave'
                  ? (ne.advanceWave(), Ie.play('waveClear'))
                  : (ne.advanceTier(), Ie.play('tierClear')),
                (d.current = 0),
                (m.current = 0));
            }
          }
        }
        (ae(p.current), Z(d.current / 1e3), (o.current = requestAnimationFrame(he)));
      };
      return (
        (f.current = performance.now()),
        (o.current = requestAnimationFrame(he)),
        () => {
          o.current != null && (cancelAnimationFrame(o.current), (o.current = null));
        }
      );
    }, [Ee, X, l, Na]),
    {
      enemies: C,
      damageEvents: de,
      deathEvents: Re,
      projectileEvents: et,
      pickupEvents: at,
      appearanceEvents: Ut,
      waveElapsedSec: D,
      onDamageDone: me,
      onDeathDone: Me,
      onProjectileDone: pt,
      onPickupDone: Ke,
      onAppearanceDone: $a,
      fireActive: Na,
      isOverdriveActive: ie,
    }
  );
}
const q0 = 30,
  ej = 2;
function tj(l, i) {
  return l && i.lte(W.ZERO) ? 'gameover' : null;
}
function aj() {
  const { navigate: l } = Qn(),
    i = G((Q) => Q.isRunActive),
    s = G((Q) => Q.screw),
    o = G((Q) => Q.bolt),
    f = G((Q) => Q.alloy),
    d = G((Q) => Q.runStartBolt),
    m = G((Q) => Q.runStartAlloy),
    p = G((Q) => Q.machineHp),
    g = G((Q) => Q.machineMaxHp),
    y = G((Q) => Q.currentTier),
    _ = G((Q) => Q.currentWave),
    b = G((Q) => Q.currentWeapon),
    A = G((Q) => Q.weaponLv),
    M = G((Q) => Q.activeCdSec),
    E = G((Q) => Q.isAutoActive),
    U = G((Q) => Q.isPaused),
    O = G((Q) => Q.runWorkshopLevels),
    K = G((Q) => Q.bgmVolume),
    V = G((Q) => Q.seVolume),
    se = G((Q) => Q.setBgmVolume),
    C = G((Q) => Q.setSeVolume),
    ae = G((Q) => Q.setAutoActive),
    de = G((Q) => Q.switchWeapon),
    P = G((Q) => Q.setPaused),
    Re = G((Q) => Q.upgradeRunWorkshop),
    it = G((Q) => Q.weaponSwitchCdSec),
    [et, ke] = q.useState(!1),
    [at, $t] = q.useState(!1),
    [Ut, ot] = q.useState(!1),
    D = q.useRef(i);
  (q.useEffect(() => {
    (i && !D.current && ot(!0), (D.current = i));
  }, [i]),
    q.useEffect(() => {
      _ === 30 ? Ie.playBgm('battleBoss') : Ie.playBgm('battleNormal');
    }, [_]));
  const Z = q.useRef(i);
  ((Z.current = i),
    q.useEffect(() => {
      const Q = () => {
        document.hidden && Z.current && P(!0);
      };
      return (
        document.addEventListener('visibilitychange', Q),
        () => {
          document.removeEventListener('visibilitychange', Q);
        }
      );
    }, [P]));
  const ie = q.useRef(_),
    [Te, Ee] = q.useState(null);
  q.useEffect(() => {
    (ie.current !== _ && Ee((Q) => (Q ?? 0) + 1), (ie.current = _));
  }, [_]);
  const x = tj(i, p),
    [k, X] = q.useState(null),
    F = k ?? x,
    ce = F !== null,
    {
      enemies: me,
      damageEvents: Me,
      deathEvents: pt,
      projectileEvents: Ke,
      pickupEvents: $a,
      waveElapsedSec: Na,
      onDamageDone: he,
      onDeathDone: vt,
      onProjectileDone: Qe,
      onPickupDone: ne,
      appearanceEvents: ga,
      onAppearanceDone: rt,
      fireActive: _t,
      isOverdriveActive: De,
    } = P4({ range: q0, paused: ce }),
    Tt = Math.max(0, Ju - Na),
    He = [],
    Ze = Math.max(0, Math.min(100, ((Ku - it) / Ku) * 100)),
    Rt = {
      laser: b === 'laser' ? 100 : Ze,
      cannon: b === 'cannon' ? 100 : Ze,
      thunder: b === 'thunder' ? 100 : Ze,
      cutter: b === 'cutter' ? 100 : Ze,
    },
    Be = p,
    na = g.isZero() ? W.fromNumber(1) : g,
    ka = () => {
      const Q = !U;
      (P(Q), Ie.play(Q ? 'dialogOpen' : 'tap'));
    },
    Ha = () => {
      ($t(!0), Ie.play('dialogOpen'));
    },
    hn = () => {
      (P(!1), X('retreat'), Ie.play('resultRetreat'));
    },
    Ei = () => {
      l('preparation');
    },
    Jn = (Q, Ua) => {
      const va = Re(Q, Ua);
      Ie.play(va ? 'purchaseOk' : 'reject');
    },
    Fn = (Q) => {
      (de(Q), Ie.play('weaponSwitch'));
    },
    Cl = () => {
      _t() || Ie.play('reject');
    },
    za = o.sub(d),
    yt = f.sub(m),
    bt = za.lt(W.ZERO) ? W.ZERO : za,
    St = yt.lt(W.ZERO) ? W.ZERO : yt,
    wi = { bolt: bt, alloy: St, patches: [] },
    pn = 30;
  return u.jsxs('div', {
    className: $u.root,
    children: [
      u.jsx(Nl, {
        noScroll: !0,
        variant: 'battle',
        header: u.jsx(K5, {
          hpCurrent: Be,
          hpMax: na,
          tier: y,
          wave: _,
          totalWaves: pn,
          secondsRemaining: Tt,
          secondsTotal: Ju,
          isBossWave: _ === pn,
          paused: U || ce,
        }),
        footer: u.jsxs('div', {
          className: $u.battleFooter,
          children: [
            u.jsx(J3, {
              open: et,
              screw: s,
              levels: O,
              onUpgrade: Jn,
              onClose: () => {
                ke(!1);
              },
            }),
            u.jsx(p5, {
              screw: s,
              earnedBolt: bt,
              equippedWeapon: b,
              weaponCds: Rt,
              activeCd: M,
              activeMax: rf,
              isAutoActive: E,
              onSwitchWeapon: Fn,
              onActivate: Cl,
              onToggleAuto: ae,
              isPaused: U,
              onTogglePause: ka,
              onOpenScreenSaver: Ha,
              isWorkshopOpen: et,
              onToggleWorkshop: () => {
                ke((Q) => !Q);
              },
            }),
          ],
        }),
        children: u.jsx(Rx, {
          enemies: me,
          damageEvents: Me,
          hitEvents: He,
          deathEvents: pt,
          projectileEvents: Ke,
          pickupEvents: $a,
          onDamageDone: he,
          onDeathDone: vt,
          onProjectileDone: Qe,
          onPickupDone: ne,
          showCutterOrbit: b === 'cutter' && i && !U && !ce,
          showOverdriveAura: De && i && !ce,
          cutterRotateMs: y2(
            Math.min(w1, $c(A).attackPerSec * mn(O.attackSpeedMul) * (De ? v1 : 1)),
            ej
          ),
          range: q0,
        }),
      }),
      u.jsxs('div', {
        className: $u.overlayLayer,
        'aria-live': 'polite',
        children: [
          u.jsx(w3, {
            open: U,
            bgmVolume: K,
            seVolume: V,
            onBgmChange: se,
            onSeChange: C,
            onRetreat: hn,
            onClose: () => {
              P(!1);
            },
          }),
          ce &&
            u.jsx(Y3, {
              open: ce,
              status: F,
              reachedTier: y,
              reachedWave: _,
              killed: 0,
              elapsedSec: 0,
              reward: wi,
              onClose: Ei,
            }),
          u.jsx(e4, {
            open: at,
            onClose: () => {
              $t(!1);
            },
          }),
          Ut &&
            u.jsx(z0, {
              kind: 'battle-start',
              onDone: () => {
                ot(!1);
              },
            }),
          ga.map((Q) =>
            u.jsx(
              z0,
              {
                kind: Q.kind === 'miniboss' ? 'boss' : Q.kind,
                name: Q.name,
                onDone: () => rt(Q.id),
              },
              Q.id
            )
          ),
          Te != null &&
            u.jsx(
              NS,
              {
                waveNumber: _,
                onDone: () => {
                  Ee(null);
                },
              },
              Te
            ),
        ],
      }),
    ],
  });
}
const nj = '_root_1420p_3',
  lj = { root: nj };
function ij() {
  const l = G((f) => f.machineLevels),
    i = G((f) => f.bolt),
    s = G((f) => f.incrementMachineLv),
    o = G((f) => f.spendBolt);
  return u.jsx('div', {
    className: lj.root,
    children: Mi.map((f) => {
      const d = l[f.key],
        m = f.maxLv != null && d >= f.maxLv,
        p = El(f, d),
        g = El(f, d + 1),
        y = (et) => (f.unit === '%' ? Math.round(et * 1e3) / 10 : et),
        _ = y(p),
        b = y(g),
        A = uf(f, d),
        M = Bu(f, d, 5),
        E = W.fromNumber(A),
        U = W.fromNumber(M),
        O = Pb(f, d, i),
        K = f.maxLv != null ? f.maxLv - d : Number.POSITIVE_INFINITY,
        V = Math.min(O, K),
        se = V > 0 ? Bu(f, d, V) : A,
        C = W.fromNumber(se),
        ae = i.lt(E),
        de = i.lt(U) || (f.maxLv != null && d + 5 > f.maxLv),
        P = V < 1,
        Re = m
          ? []
          : [
              { amount: '+1', cost: E, disabled: ae },
              { amount: '+5', cost: U, disabled: de },
              { amount: 'MAX', cost: C, disabled: P },
            ],
        it = (et) => {
          if (m) return;
          let ke = 0;
          if ((et === '+1' ? (ke = 1) : et === '+5' ? (ke = 5) : et === 'MAX' && (ke = V), ke < 1))
            return;
          f.maxLv != null && (ke = Math.min(ke, f.maxLv - d));
          const at = Bu(f, d, ke),
            $t = W.fromNumber(at);
          if (o($t)) for (let ot = 0; ot < ke; ot++) s(f.key);
        };
      return u.jsx(
        ff,
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
          onUpgrade: it,
        },
        f.key
      );
    }),
  });
}
function cj() {
  const { navigate: l } = Qn(),
    i = (s) => {
      l(s);
    };
  return u.jsx(Nl, {
    header: u.jsx(Lc, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: u.jsx(Bc, { active: 'machine', onChange: i }),
    children: u.jsx(ij, {}),
  });
}
const sj = () => u.jsx('div', { children: u.jsx('h1', { children: 'Not Found' }) }),
  oj = '_content_9srrg_1',
  rj = { content: oj },
  uj = '_root_rnqkk_2',
  fj = '_header_rnqkk_9',
  dj = '_headerTitleRow_rnqkk_16',
  mj = '_headerCount_rnqkk_22',
  hj = '_slotGrid_rnqkk_36',
  pj = '_emptyHint_rnqkk_42',
  yj = '_pickerDialog_rnqkk_48',
  gj = '_pickerHeader_rnqkk_55',
  vj = '_pickerGrid_rnqkk_62',
  _j = '_pickerEmpty_rnqkk_71',
  bj = '_pickerActions_rnqkk_76',
  Ta = {
    root: uj,
    header: fj,
    headerTitleRow: dj,
    headerCount: mj,
    slotGrid: hj,
    emptyHint: pj,
    pickerDialog: yj,
    pickerHeader: gj,
    pickerGrid: vj,
    pickerEmpty: _j,
    pickerActions: bj,
  },
  Sj = '_root_12m2l_3',
  xj = '_selected_12m2l_15',
  jj = '_merging_12m2l_19',
  Aj = '_locked_12m2l_23',
  Tj = '_disabled_12m2l_28',
  Mj = '_card_12m2l_34',
  Ej = '_tierBadge_12m2l_46',
  wj = '_count_12m2l_54',
  Nj = '_countZero_12m2l_74',
  zj = '_iconWrap_12m2l_79',
  Cj = '_name_12m2l_90',
  Rj = '_detail_12m2l_102',
  Oj = '_trigger_12m2l_110',
  Dj = '_effect_12m2l_121',
  Bj = '_mergingBadge_12m2l_133',
  Dt = {
    root: Sj,
    selected: xj,
    merging: jj,
    locked: Aj,
    disabled: Tj,
    card: Mj,
    tierBadge: Ej,
    count: wj,
    countZero: Nj,
    iconWrap: zj,
    name: Cj,
    detail: Rj,
    trigger: Oj,
    effect: Dj,
    mergingBadge: Bj,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  Lj = { sm: 22, md: 26, lg: 32 },
  V0 = { sm: 38, md: 44, lg: 52 };
function go({
  name: l,
  iconName: i,
  tier: s,
  count: o,
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
    E = b != null && !y && !g,
    U = m ? { boxShadow: 'var(--glow-cyan-md)' } : p ? { boxShadow: 'var(--glow-purple-md)' } : {},
    O = {
      width: V0[_],
      height: V0[_],
      opacity: g ? 0.35 : 1,
      background: g ? 'var(--c-surface)' : `linear-gradient(135deg, ${M}22, ${M}08)`,
      border: g ? '1px solid var(--c-border-faint)' : `1px solid ${M}55`,
      filter: g ? 'none' : `drop-shadow(0 0 4px ${M}55)`,
    },
    K = {
      background: o >= 2 ? `${M}22` : void 0,
      borderColor: o >= 2 ? M : void 0,
      color: o >= 2 ? M : void 0,
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
    style: U,
    onClick: E ? b : void 0,
    role: E ? 'button' : void 0,
    tabIndex: E ? 0 : void 0,
    onKeyDown: E
      ? (V) => {
          (V.key === 'Enter' || V.key === ' ') && (V.preventDefault(), b == null || b());
        }
      : void 0,
    'aria-pressed': E ? m : void 0,
    'aria-disabled': y || g ? !0 : void 0,
    children: u.jsxs(Kn, {
      variant: 'elevated',
      padding: 'sm',
      interactive: E,
      className: Dt.card,
      children: [
        !g &&
          u.jsx('span', {
            className: Dt.tierBadge,
            children: u.jsx(kc, { text: `T${A}`, variant: 'patch-tier', tier: s }),
          }),
        u.jsxs('span', {
          className: [Dt.count, o === 0 ? Dt.countZero : ''].filter(Boolean).join(' '),
          style: K,
          children: ['×', g ? '?' : o],
        }),
        u.jsx('div', {
          className: Dt.iconWrap,
          style: O,
          children: u.jsx(Ye, {
            name: g ? 'close' : i,
            size: Lj[_],
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
const $j = '_wrapper_16mrg_3',
  kj = '_filled_16mrg_16',
  Hj = '_empty_16mrg_25',
  Uj = '_locked_16mrg_26',
  qj = '_slotInner_16mrg_59',
  Vj = '_emptyIcon_16mrg_67',
  Gj = '_emptyLabel_16mrg_74',
  Gn = {
    wrapper: $j,
    filled: kj,
    empty: Hj,
    locked: Uj,
    slotInner: qj,
    emptyIcon: Vj,
    emptyLabel: Gj,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  };
function N1({ patch: l = null, slotIndex: i, locked: s = !1, size: o = 'md', onClick: f }) {
  const d = l != null,
    m = f != null && !s,
    p = i != null ? `Slot ${i}` : '',
    g = d
      ? `Slot ${i ?? ''}: ${l.name} (Tier ${l.tier})`
      : s
        ? `Slot ${i ?? ''} (locked)`.trim()
        : `Slot ${i ?? ''} (empty)`.trim(),
    y = d ? Gn.filled : s ? Gn.locked : Gn.empty;
  return u.jsx('div', {
    className: [Gn.wrapper, y, Gn[`size-${o}`]].filter(Boolean).join(' '),
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
        ? u.jsx(go, {
            patchId: l.patchId,
            name: l.name,
            iconName: l.iconName,
            tier: l.tier,
            count: l.count,
            trigger: l.trigger,
            effect: l.effect,
            size: o,
          })
        : u.jsxs('div', {
            className: Gn.slotInner,
            children: [
              u.jsx('span', {
                className: Gn.emptyIcon,
                children: u.jsx(Ye, {
                  name: s ? 'close' : 'plus',
                  size: 28,
                  color: s ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              u.jsx('span', { className: Gn.emptyLabel, children: s ? 'LOCKED' : p }),
            ],
          }),
  });
}
function Yj(l) {
  return Math.min(1 + l, ji);
}
const G0 = {
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
  Y0 = {
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
  Z0 = {
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
function Zj({ overridePatches: l, overrideEquipped: i, overridePatchSlotsLv: s }) {
  const o = G((C) => C.patches),
    f = G((C) => C.equippedPatches),
    d = G((C) => C.machineLevels.patchSlots),
    m = G((C) => C.equipPatch),
    p = G((C) => C.unequipPatch),
    g = l ?? o,
    y = i ?? f,
    b = Yj(s ?? d),
    [A, M] = q.useState(null),
    E = (C) => {
      const ae = y.get(C);
      if (!ae) return null;
      const de = `${ae.name}#${ae.tier}`,
        P = g.get(de);
      return {
        patchId: de,
        name: ae.name,
        iconName: G0[ae.name] ?? 'spark',
        tier: ae.tier,
        trigger: Y0[ae.name] ?? '常時',
        effect: Z0[ae.name] ?? '-',
        count: (P == null ? void 0 : P.count) ?? 0,
      };
    },
    U = (C) => {
      if (y.get(C)) {
        p(C);
        return;
      }
      M(C);
    },
    O = new Set(Array.from(y.values()).map((C) => C.name)),
    K = Array.from(g.values()).filter((C) => !O.has(C.name)),
    V = (C, ae) => {
      if (A == null) return;
      m(A, C, ae) && M(null);
    },
    se = ji - b;
  return u.jsxs('div', {
    className: Ta.root,
    children: [
      u.jsxs('div', {
        className: Ta.header,
        children: [
          u.jsxs('div', {
            className: Ta.headerTitleRow,
            children: [
              u.jsx(Y, { variant: 'heading-3', children: '装着スロット' }),
              u.jsxs(Y, {
                variant: 'caption',
                color: 'mid',
                className: Ta.headerCount,
                children: [y.size, '/', b],
              }),
            ],
          }),
          u.jsxs(Y, {
            variant: 'caption',
            color: 'dim',
            children: ['(', ji, ' スロット中 ', se, ' ロック・', y.size, ' / ', b, ' ', '装着中)'],
          }),
        ],
      }),
      u.jsx('div', {
        className: Ta.slotGrid,
        children: Array.from({ length: ji }, (C, ae) => {
          const de = ae >= b,
            P = de ? null : E(ae);
          return u.jsx(
            N1,
            {
              slotIndex: ae + 1,
              patch: P,
              locked: de,
              size: 'md',
              onClick: de ? void 0 : () => U(ae),
            },
            ae
          );
        }),
      }),
      y.size === 0 &&
        b > 0 &&
        u.jsx(Y, {
          variant: 'caption',
          color: 'dim',
          className: Ta.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
      A != null &&
        u.jsx(yo, {
          open: !0,
          onClose: () => M(null),
          dismissible: !0,
          children: u.jsx('div', {
            className: Ta.pickerDialog,
            children: u.jsxs(Kn, {
              variant: 'elevated',
              padding: 'lg',
              children: [
                u.jsxs('div', {
                  className: Ta.pickerHeader,
                  children: [
                    u.jsxs(Y, {
                      variant: 'heading-3',
                      as: 'h2',
                      children: ['スロット ', A + 1, ' に装着'],
                    }),
                    u.jsxs(Y, {
                      variant: 'caption',
                      color: 'dim',
                      children: ['在庫から選択 (', K.length, ' 種)'],
                    }),
                  ],
                }),
                K.length === 0
                  ? u.jsx(Y, {
                      variant: 'body',
                      color: 'dim',
                      className: Ta.pickerEmpty,
                      children: '装着可能なパッチが在庫にありません',
                    })
                  : u.jsx('div', {
                      className: Ta.pickerGrid,
                      children: K.map((C) => {
                        const ae = `${C.name}#${C.tier}`;
                        return u.jsx(
                          go,
                          {
                            patchId: ae,
                            name: C.name,
                            iconName: G0[C.name] ?? 'spark',
                            tier: C.tier,
                            count: C.count,
                            trigger: Y0[C.name] ?? '常時',
                            effect: Z0[C.name] ?? '-',
                            onClick: () => V(C.name, C.tier),
                          },
                          ae
                        );
                      }),
                    }),
                u.jsx('div', {
                  className: Ta.pickerActions,
                  children: u.jsx(Lt, {
                    label: 'キャンセル',
                    variant: 'ghost',
                    fullWidth: !0,
                    onClick: () => M(null),
                  }),
                }),
              ],
            }),
          }),
        }),
    ],
  });
}
const Xj = '_root_16zq4_1',
  Kj = '_header_16zq4_8',
  Qj = '_grid_16zq4_14',
  Wj = '_empty_16zq4_20',
  wc = { root: Xj, header: Kj, grid: Qj, empty: Wj },
  Jj = {
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
  Fj = {
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
  Ij = {
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
function Pj({ overridePatches: l, overrideEquipped: i, selectedId: s, onSelect: o }) {
  const f = G((_) => _.patches),
    d = G((_) => _.equippedPatches),
    m = l ?? f,
    p = i ?? d,
    g = new Set(Array.from(p.values()).map((_) => _.name)),
    y = Array.from(m.values());
  return y.length === 0
    ? u.jsx('div', {
        className: wc.root,
        children: u.jsx('div', {
          className: wc.empty,
          children: u.jsx(Y, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : u.jsxs('div', {
        className: wc.root,
        children: [
          u.jsxs('div', {
            className: wc.header,
            children: [
              u.jsx(Y, { variant: 'heading-3', children: 'パッチ在庫' }),
              u.jsxs(Y, { variant: 'caption', color: 'dim', children: [y.length, ' 種類'] }),
            ],
          }),
          u.jsx('div', {
            className: wc.grid,
            children: y.map((_) => {
              const b = `${_.name}#${_.tier}`,
                A = g.has(_.name);
              return u.jsx(
                go,
                {
                  patchId: b,
                  name: _.name,
                  iconName: Jj[_.name] ?? 'spark',
                  tier: _.tier,
                  count: _.count,
                  trigger: Fj[_.name] ?? '常時',
                  effect: Ij[_.name] ?? '-',
                  selected: s === b,
                  locked: A,
                  onClick: o ? () => o(s === b ? null : b) : void 0,
                },
                b
              );
            }),
          }),
        ],
      });
}
const eA = '_root_1svx2_1',
  tA = '_header_1svx2_8',
  aA = '_tierControl_1svx2_14',
  nA = '_tierStepperRow_1svx2_24',
  lA = '_mergeList_1svx2_30',
  iA = '_empty_1svx2_36',
  bi = { root: eA, header: tA, tierControl: aA, tierStepperRow: nA, mergeList: lA, empty: iA },
  cA = '_stepper_1ouvh_1',
  sA = '_disabled_1ouvh_6',
  oA = '_btn_1ouvh_11',
  rA = '_value_1ouvh_38',
  Si = {
    stepper: cA,
    disabled: sA,
    btn: oA,
    value: rA,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  uA = ({
    value: l,
    min: i,
    max: s,
    step: o = 1,
    onChange: f,
    size: d = 'md',
    disabled: m = !1,
  }) => {
    const p = l - o >= i,
      g = l + o <= s,
      y = () => {
        m || !p || f(Math.max(i, l - o));
      },
      _ = () => {
        m || !g || f(Math.min(s, l + o));
      };
    return u.jsxs('div', {
      className: [Si.stepper, Si[`size-${d}`], m ? Si.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        u.jsx('button', {
          type: 'button',
          className: Si.btn,
          onClick: y,
          disabled: m || !p,
          'aria-label': '減少',
          children: '−',
        }),
        u.jsx('span', {
          className: Si.value,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          children: l,
        }),
        u.jsx('button', {
          type: 'button',
          className: Si.btn,
          onClick: _,
          disabled: m || !g,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  Fu = 5,
  fA = {
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
function z1(l, i) {
  const s = [];
  for (const o of l.values())
    o.tier < i &&
      o.count >= 2 &&
      s.push({ name: o.name, tier: o.tier, count: o.count, iconName: fA[o.name] ?? 'spark' });
  return s.sort((o, f) => o.tier - f.tier || o.name.localeCompare(f.name));
}
function dA(l, i) {
  let s = new Map(l),
    o = !0;
  for (; o; ) {
    o = !1;
    for (const f of Array.from(s.values())) {
      if (f.tier >= i || f.count < 2 || f.tier >= Fu) continue;
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
        (o = !0));
    }
  }
  return s;
}
function mA({ overridePatches: l }) {
  const i = G((A) => A.patches),
    s = G((A) => A.addPatch),
    o = G((A) => A.consumePatch),
    f = G((A) => A.pruneEmptyPatches),
    d = l ?? i,
    m = Math.max(1, ...Array.from(d.values()).map((A) => A.tier)),
    [p, g] = q.useState(Math.min(m, Fu - 1)),
    y = z1(d, p + 1),
    _ = y.length > 0,
    b = () => {
      if (l) return;
      const A = dA(d, p + 1);
      for (const [M, E] of d) {
        const U = A.get(M),
          O = (U == null ? void 0 : U.count) ?? 0;
        O < E.count && o(E.name, E.tier, E.count - O);
      }
      for (const [M, E] of A) {
        const U = d.get(M),
          O = (U == null ? void 0 : U.count) ?? 0;
        E.count > O && s(E.name, E.tier, E.count - O);
      }
      f();
    };
  return u.jsxs('div', {
    className: bi.root,
    children: [
      u.jsx('div', {
        className: bi.header,
        children: u.jsx(Y, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      u.jsxs('div', {
        className: bi.tierControl,
        children: [
          u.jsx(Y, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          u.jsxs('div', {
            className: bi.tierStepperRow,
            children: [
              u.jsx(uA, { value: p, min: 1, max: Fu - 1, onChange: g }),
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
                className: bi.mergeList,
                children: y.map((A) =>
                  u.jsx(
                    go,
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
              u.jsx(Lt, {
                label: `一括合成 (${y.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: b,
              }),
            ],
          })
        : u.jsxs('div', {
            className: bi.empty,
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
function hA(l) {
  return Math.min(1 + l, ji);
}
function pA() {
  const { navigate: l } = Qn(),
    [i, s] = q.useState('equip'),
    o = G((M) => M.equippedPatches),
    f = G((M) => M.patches),
    d = G((M) => M.machineLevels.patchSlots),
    m = hA(d),
    p = o.size,
    g = f.size,
    y = z1(f, 5).length,
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
  return u.jsx(Nl, {
    header: u.jsx(Lc, {
      title: 'パッチ庫',
      subtitle: `装着 ${p}/${m} ・ 在庫 ${g} 種`,
      onBack: b,
      currencies: [],
      tabBar: u.jsx(oo, { tabs: A, value: i, onChange: s, variant: 'underline', fullWidth: !0 }),
    }),
    footer: u.jsx(Bc, { active: 'patches', onChange: _ }),
    children: u.jsxs('div', {
      className: rj.content,
      children: [
        i === 'equip' && u.jsx(Zj, {}),
        i === 'inventory' && u.jsx(Pj, {}),
        i === 'merge' && u.jsx(mA, {}),
      ],
    }),
  });
}
const yA = '_footer_qoo97_1',
  gA = '_tabPanel_qoo97_7',
  X0 = { footer: yA, tabPanel: gA },
  vA = '_wrapper_1lf9s_1',
  _A = '_header_1lf9s_7',
  bA = '_headerLabel_1lf9s_13',
  SA = '_empty_1lf9s_18',
  xA = '_emptyIcon_1lf9s_29',
  jA = '_grid_1lf9s_33',
  AA = '_note_1lf9s_39',
  bl = { wrapper: vA, header: _A, headerLabel: bA, empty: SA, emptyIcon: xA, grid: jA, note: AA },
  TA = {
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
function MA({ onOpenPatchScreen: l }) {
  const i = G((m) => m.equippedPatches),
    s = G((m) => m.machineLevels.patchSlots),
    o = Math.min(1 + s, ji),
    f = [];
  for (let m = 0; m < o; m++) {
    const p = i.get(m);
    if (p != null) {
      const g = TA[p.name],
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
  const d = [...i.values()].length;
  return u.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '装着パッチ',
    className: bl.wrapper,
    children: [
      u.jsxs('div', {
        className: bl.header,
        children: [
          u.jsxs(Y, {
            variant: 'caption',
            color: 'mid',
            className: bl.headerLabel,
            children: ['装着 ', d, ' / ', o],
          }),
          l != null &&
            u.jsx(Lt, {
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
            className: bl.empty,
            children: [
              u.jsx('span', {
                className: bl.emptyIcon,
                children: u.jsx(Ye, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              u.jsx(Y, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              l != null &&
                u.jsx(Lt, {
                  label: 'パッチ庫を開く',
                  variant: 'secondary',
                  size: 'sm',
                  onClick: l,
                }),
            ],
          })
        : u.jsx('div', {
            className: bl.grid,
            children: f.map((m, p) =>
              u.jsx(N1, { patch: m.patch, slotIndex: m.idx, onClick: l }, p)
            ),
          }),
      u.jsx(Y, {
        variant: 'caption',
        color: 'dim',
        align: 'center',
        as: 'p',
        className: bl.note,
        children: '変更はパッチ庫で行えます',
      }),
    ],
  });
}
const EA = '_wrapper_iebuz_1',
  wA = '_header_iebuz_7',
  NA = '_grid_iebuz_12',
  qu = { wrapper: EA, header: wA, grid: NA },
  zA = [
    { kind: 'laser', name: 'LASER', description: '高速直進ビーム。貫通で削る。', buildStats: S1 },
    { kind: 'cannon', name: 'CANNON', description: '範囲爆発で群れを薙ぐ。', buildStats: x1 },
    { kind: 'thunder', name: 'THUNDER', description: '同時 3 体を撃つ電撃。', buildStats: j1 },
    {
      kind: 'cutter',
      name: 'CUTTER',
      description: 'マシン周囲を旋回する斬撃。',
      buildStats: (l, i) => A1(l, i),
    },
  ];
function CA({ selectedWeapon: l, onSelect: i }) {
  const s = G((y) => y.initialWeapon),
    o = G((y) => y.setInitialWeapon),
    f = G((y) => y.machineLevels),
    d = _1(f.baseAttack),
    m = b1(f.range),
    p = l ?? s,
    g = (y) => {
      (o(y), i == null || i(y));
    };
  return u.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: qu.wrapper,
    children: [
      u.jsx('div', {
        className: qu.header,
        children: u.jsx(Y, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      u.jsx('div', {
        className: qu.grid,
        children: zA.map((y) =>
          u.jsx(
            p1,
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
const RA = '_wrapper_1rg1e_1',
  OA = '_sticky_1rg1e_15',
  DA = '_summary_1rg1e_19',
  BA = '_weaponInfo_1rg1e_29',
  LA = '_patchInfo_1rg1e_37',
  Nc = { wrapper: RA, sticky: OA, summary: DA, weaponInfo: BA, patchInfo: LA };
function $A({
  tier: l,
  weaponKind: i,
  patchCount: s = 0,
  disabled: o = !1,
  onLaunch: f,
  sticky: d = !0,
}) {
  return u.jsxs('div', {
    role: 'group',
    'aria-label': '出撃',
    className: [Nc.wrapper, d ? Nc.sticky : ''].filter(Boolean).join(' '),
    children: [
      u.jsxs('div', {
        className: Nc.summary,
        children: [
          l != null && u.jsx(kc, { variant: 'tier', tier: l, size: 'sm' }),
          i != null &&
            u.jsxs('span', {
              className: Nc.weaponInfo,
              children: [
                u.jsx(Ye, { name: i, size: 14 }),
                u.jsx(Y, { variant: 'label', color: 'primary', children: i.toUpperCase() }),
              ],
            }),
          u.jsxs('span', {
            className: Nc.patchInfo,
            children: [
              u.jsx(Ye, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              u.jsxs(Y, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', s] }),
            ],
          }),
        ],
      }),
      u.jsx(Lt, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: o,
        iconLeft: u.jsx(Ye, { name: 'tower', size: 18 }),
        onClick: f,
      }),
    ],
  });
}
const kA = '_wrapper_1ul9l_1',
  HA = '_header_1ul9l_7',
  UA = '_grid_1ul9l_14',
  qA = '_tierBtn_1ul9l_20',
  VA = '_active_1ul9l_35',
  GA = '_tierLabel_1ul9l_50',
  YA = '_frontierLabel_1ul9l_61',
  Sl = {
    wrapper: kA,
    header: HA,
    grid: UA,
    tierBtn: qA,
    active: VA,
    tierLabel: GA,
    frontierLabel: YA,
  };
function ZA({ selectedTier: l, onSelect: i }) {
  const s = G((m) => m.highestTier),
    o = Math.max(1, s),
    f = [];
  for (let m = 1; m <= o; m++) f.push(m);
  const d = (m) => `var(--c-tier-${Math.max(1, Math.min(10, m))})`;
  return u.jsxs('div', {
    role: 'tabpanel',
    'aria-label': 'Tier 選択',
    className: Sl.wrapper,
    children: [
      u.jsxs('div', {
        className: Sl.header,
        children: [
          u.jsx(Y, {
            variant: 'caption',
            color: 'mid',
            children: '到達済み Tier を選んで出撃します。',
          }),
          u.jsxs(Y, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', o] }),
        ],
      }),
      u.jsx('div', {
        className: Sl.grid,
        children: f.map((m) => {
          const p = m === l,
            g = m === o,
            y = d(m);
          return u.jsxs(
            'button',
            {
              type: 'button',
              'aria-pressed': p,
              'data-active': p,
              'data-frontier': g,
              className: [Sl.tierBtn, p ? Sl.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': y },
              onClick: () => (i == null ? void 0 : i(m)),
              children: [
                u.jsxs('span', { className: Sl.tierLabel, children: ['T', m] }),
                g && !p && u.jsx('span', { className: Sl.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            m
          );
        }),
      }),
    ],
  });
}
const XA = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function KA(l) {
  const { initialSelectedTier: i } = l,
    { navigate: s } = Qn(),
    [o, f] = q.useState('tier'),
    d = G((O) => O.highestTier),
    [m, p] = q.useState(i ?? Math.max(1, d)),
    g = G((O) => O.initialWeapon),
    _ = [...G((O) => O.equippedPatches).values()].length,
    b = G((O) => O.machineLevels),
    A = G((O) => O.startRun);
  function M() {
    const O = Mi.find((V) => V.key === 'maxHp'),
      K = O != null ? El(O, b.maxHp) : 100;
    (A({ initialWeapon: g, baseMachineMaxHp: W.fromNumber(K) }), s('battle'));
  }
  const E = u.jsx(Lc, {
      title: '出撃準備',
      currencies: ['bolt', 'alloy'],
      tabBar: u.jsx(oo, { tabs: XA, value: o, onChange: f, variant: 'underline', fullWidth: !0 }),
    }),
    U = u.jsxs('div', {
      className: X0.footer,
      children: [
        u.jsx($A, { tier: m, weaponKind: g, patchCount: _, sticky: !1, onLaunch: M }),
        u.jsx(Bc, { active: 'preparation', onChange: (O) => s(O) }),
      ],
    });
  return u.jsx(Nl, {
    header: E,
    footer: U,
    children: u.jsxs('div', {
      className: X0.tabPanel,
      children: [
        o === 'tier' && u.jsx(ZA, { selectedTier: m, onSelect: p }),
        o === 'weapon' && u.jsx(CA, {}),
        o === 'patches' && u.jsx(MA, { onOpenPatchScreen: () => s('patches') }),
      ],
    }),
  });
}
const QA = '_content_8gsha_1',
  WA = { content: QA },
  JA = '_root_1b7n9_1',
  FA = '_header_1b7n9_8',
  IA = '_storageCard_1b7n9_13',
  PA = '_storageRow_1b7n9_23',
  eT = '_divider_1b7n9_29',
  tT = '_section_1b7n9_34',
  aT = '_dangerSection_1b7n9_40',
  nT = '_sectionHeader_1b7n9_50',
  pa = {
    root: JA,
    header: FA,
    storageCard: IA,
    storageRow: PA,
    divider: eT,
    section: tT,
    dangerSection: aT,
    sectionHeader: nT,
  },
  lT = '_wrapper_11b89_1',
  iT = '_disabled_11b89_6',
  cT = '_hiddenInput_11b89_11',
  sT = '_btn_11b89_15',
  oT = '_fileName_11b89_41',
  zc = { wrapper: lT, disabled: iT, hiddenInput: cT, btn: sT, fileName: oT },
  rT = ({
    accept: l = 'application/json',
    onChange: i,
    label: s = 'ファイルを選択',
    disabled: o = !1,
  }) => {
    const f = q.useRef(null),
      [d, m] = q.useState(null),
      p = () => {
        var y;
        o || (y = f.current) == null || y.click();
      },
      g = (y) => {
        var b;
        const _ = ((b = y.target.files) == null ? void 0 : b[0]) ?? null;
        (m((_ == null ? void 0 : _.name) ?? null), i(_), f.current && (f.current.value = ''));
      };
    return u.jsxs('div', {
      className: [zc.wrapper, o ? zc.disabled : ''].join(' '),
      children: [
        u.jsx('input', {
          ref: f,
          type: 'file',
          accept: l,
          className: zc.hiddenInput,
          onChange: g,
          disabled: o,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        u.jsx('button', {
          type: 'button',
          className: zc.btn,
          onClick: p,
          disabled: o,
          children: s,
        }),
        d && u.jsx('span', { className: zc.fileName, title: d, children: d }),
      ],
    });
  };
function uT({ storageInfo: l, onExport: i, onImport: s, onReset: o }) {
  const [f, d] = q.useState(!1),
    [m, p] = q.useState(!1),
    [g, y] = q.useState(!1),
    _ = async () => {
      if (i) {
        y(!0);
        try {
          await i();
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
      (d(!1), o && (await o()));
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
          u.jsx(Lt, {
            label: g ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: _,
            disabled: g || !i,
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
          u.jsx(rT, {
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
          u.jsx(Lt, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => d(!0),
            disabled: !o,
          }),
        ],
      }),
      u.jsx(E1, {
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
const fT = '_root_1rbig_1',
  dT = '_header_1rbig_8',
  mT = '_section_1rbig_13',
  Vu = { root: fT, header: dT, section: mT },
  hT = '_wrapper_16nmz_9',
  pT = '_disabled_16nmz_15',
  yT = '_off_16nmz_31',
  gT = '_on_16nmz_35',
  vT = '_accent_primary_16nmz_35',
  _T = '_accent_secondary_16nmz_39',
  bT = '_accent_success_16nmz_43',
  ST = '_accent_disabled_16nmz_47',
  xT = '_size_md_16nmz_56',
  jT = '_knob_16nmz_60',
  AT = '_size_sm_16nmz_70',
  TT = '_labelGroup_16nmz_93',
  MT = '_label_16nmz_93',
  ET = '_description_16nmz_106',
  Ma = {
    wrapper: hT,
    disabled: pT,
    switch: '_switch_16nmz_22',
    off: yT,
    on: gT,
    accent_primary: vT,
    accent_secondary: _T,
    accent_success: bT,
    accent_disabled: ST,
    size_md: xT,
    knob: jT,
    size_sm: AT,
    labelGroup: TT,
    label: MT,
    description: ET,
  },
  C1 = ({
    checked: l,
    onChange: i,
    disabled: s = !1,
    label: o,
    description: f,
    accent: d = 'primary',
    size: m = 'md',
  }) => {
    const p = s || d === 'disabled',
      g = () => {
        p || i(!l);
      };
    return u.jsxs('label', {
      className: [Ma.wrapper, p ? Ma.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': p,
      children: [
        u.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': l,
          'aria-disabled': p,
          className: [Ma.switch, l ? Ma.on : Ma.off, Ma[`size_${m}`], Ma[`accent_${d}`]]
            .filter(Boolean)
            .join(' '),
          onClick: g,
          disabled: p,
          children: u.jsx('span', { className: Ma.knob }),
        }),
        (o || f) &&
          u.jsxs('span', {
            className: Ma.labelGroup,
            children: [
              o && u.jsx('span', { className: Ma.label, children: o }),
              f && u.jsx('span', { className: Ma.description, children: f }),
            ],
          }),
      ],
    });
  };
function wT({ overrideVibration: l, onVibrationChange: i }) {
  const s = G((m) => m.vibrationEnabled),
    o = G((m) => m.setVibrationEnabled),
    f = l ?? s,
    d = (m) => {
      i ? i(m) : o(m);
    };
  return u.jsxs('div', {
    className: Vu.root,
    children: [
      u.jsx('div', {
        className: Vu.header,
        children: u.jsx(Y, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      u.jsx('div', {
        className: Vu.section,
        children: u.jsx(C1, {
          checked: f,
          onChange: d,
          label: 'バイブレーション',
          description: '操作時に端末を振動させます',
        }),
      }),
    ],
  });
}
const NT = '_root_nuc5y_2',
  zT = '_muteRow_nuc5y_9',
  CT = '_muteLabelGroup_nuc5y_16',
  RT = '_sliderRow_nuc5y_24',
  OT = '_muted_nuc5y_29',
  DT = '_sliderIcon_nuc5y_29',
  BT = '_sliderArea_nuc5y_41',
  LT = '_sliderValue_nuc5y_46',
  Zn = {
    root: NT,
    muteRow: zT,
    muteLabelGroup: CT,
    sliderRow: RT,
    muted: OT,
    sliderIcon: DT,
    sliderArea: BT,
    sliderValue: LT,
  };
function K0({ label: l, iconName: i, value: s, muted: o, onChange: f }) {
  return u.jsx(Kn, {
    variant: 'sunken',
    padding: 'md',
    children: u.jsxs('div', {
      className: [Zn.sliderRow, o ? Zn.muted : ''].filter(Boolean).join(' '),
      children: [
        u.jsx('span', { className: Zn.sliderIcon, children: u.jsx(Ye, { name: i, size: 16 }) }),
        u.jsx(Y, { variant: 'label', color: o ? 'dim' : 'mid', children: l }),
        u.jsx('div', {
          className: Zn.sliderArea,
          children: u.jsx(Wu, { value: s, min: 0, max: 1, step: 0.01, onChange: f, disabled: o }),
        }),
        u.jsx('span', {
          className: Zn.sliderValue,
          children: u.jsx(Xn, {
            value: Math.round(s * 100),
            size: 'sm',
            accentColor: o ? 'dim' : 'text',
          }),
        }),
      ],
    }),
  });
}
function $T({
  overrideBgmVolume: l,
  overrideSeVolume: i,
  overrideMute: s,
  onBgmChange: o,
  onSeChange: f,
  onMuteChange: d,
}) {
  const m = G((O) => O.bgmVolume),
    p = G((O) => O.seVolume),
    g = G((O) => O.setBgmVolume),
    y = G((O) => O.setSeVolume),
    _ = l ?? m,
    b = i ?? p,
    A = s ?? !1,
    M = (O) => {
      o ? o(O) : (g(O), Ie.setBgmVolume(A ? 0 : O));
    },
    E = (O) => {
      f ? f(O) : (y(O), Ie.setSeVolume(A ? 0 : O));
    },
    U = (O) => {
      d ? d(O) : (Ie.setBgmVolume(O ? 0 : _), Ie.setSeVolume(O ? 0 : b));
    };
  return u.jsxs('div', {
    className: Zn.root,
    role: 'tabpanel',
    'aria-label': 'サウンド設定',
    children: [
      u.jsx(Kn, {
        variant: 'sunken',
        padding: 'md',
        children: u.jsxs('div', {
          className: Zn.muteRow,
          children: [
            u.jsxs('span', {
              className: Zn.muteLabelGroup,
              children: [
                u.jsx(Y, { variant: 'label', color: 'mid', children: 'ミュート' }),
                u.jsx(Y, { variant: 'caption', color: 'dim', children: '全サウンドを一時停止' }),
              ],
            }),
            u.jsx(C1, { checked: A, onChange: U, accent: 'primary' }),
          ],
        }),
      }),
      u.jsx(K0, { label: 'BGM', iconName: 'play', value: _, muted: A, onChange: M }),
      u.jsx(K0, { label: 'SE', iconName: 'spark', value: b, muted: A, onChange: E }),
    ],
  });
}
const Iu = (l, i) => i.some((s) => l instanceof s);
let Q0, W0;
function kT() {
  return Q0 || (Q0 = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function HT() {
  return (
    W0 ||
    (W0 = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Pu = new WeakMap(),
  Gu = new WeakMap(),
  vo = new WeakMap();
function UT(l) {
  const i = new Promise((s, o) => {
    const f = () => {
        (l.removeEventListener('success', d), l.removeEventListener('error', m));
      },
      d = () => {
        (s(Tl(l.result)), f());
      },
      m = () => {
        (o(l.error), f());
      };
    (l.addEventListener('success', d), l.addEventListener('error', m));
  });
  return (vo.set(i, l), i);
}
function qT(l) {
  if (Pu.has(l)) return;
  const i = new Promise((s, o) => {
    const f = () => {
        (l.removeEventListener('complete', d),
          l.removeEventListener('error', m),
          l.removeEventListener('abort', m));
      },
      d = () => {
        (s(), f());
      },
      m = () => {
        (o(l.error || new DOMException('AbortError', 'AbortError')), f());
      };
    (l.addEventListener('complete', d),
      l.addEventListener('error', m),
      l.addEventListener('abort', m));
  });
  Pu.set(l, i);
}
let ef = {
  get(l, i, s) {
    if (l instanceof IDBTransaction) {
      if (i === 'done') return Pu.get(l);
      if (i === 'store')
        return s.objectStoreNames[1] ? void 0 : s.objectStore(s.objectStoreNames[0]);
    }
    return Tl(l[i]);
  },
  set(l, i, s) {
    return ((l[i] = s), !0);
  },
  has(l, i) {
    return l instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in l;
  },
};
function R1(l) {
  ef = l(ef);
}
function VT(l) {
  return HT().includes(l)
    ? function (...i) {
        return (l.apply(tf(this), i), Tl(this.request));
      }
    : function (...i) {
        return Tl(l.apply(tf(this), i));
      };
}
function GT(l) {
  return typeof l == 'function'
    ? VT(l)
    : (l instanceof IDBTransaction && qT(l), Iu(l, kT()) ? new Proxy(l, ef) : l);
}
function Tl(l) {
  if (l instanceof IDBRequest) return UT(l);
  if (Gu.has(l)) return Gu.get(l);
  const i = GT(l);
  return (i !== l && (Gu.set(l, i), vo.set(i, l)), i);
}
const tf = (l) => vo.get(l);
function YT(l, i, { blocked: s, upgrade: o, blocking: f, terminated: d } = {}) {
  const m = indexedDB.open(l, i),
    p = Tl(m);
  return (
    o &&
      m.addEventListener('upgradeneeded', (g) => {
        o(Tl(m.result), g.oldVersion, g.newVersion, Tl(m.transaction), g);
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
const ZT = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  XT = ['put', 'add', 'delete', 'clear'],
  Yu = new Map();
function J0(l, i) {
  if (!(l instanceof IDBDatabase && !(i in l) && typeof i == 'string')) return;
  if (Yu.get(i)) return Yu.get(i);
  const s = i.replace(/FromIndex$/, ''),
    o = i !== s,
    f = XT.includes(s);
  if (!(s in (o ? IDBIndex : IDBObjectStore).prototype) || !(f || ZT.includes(s))) return;
  const d = async function (m, ...p) {
    const g = this.transaction(m, f ? 'readwrite' : 'readonly');
    let y = g.store;
    return (o && (y = y.index(p.shift())), (await Promise.all([y[s](...p), f && g.done]))[0]);
  };
  return (Yu.set(i, d), d);
}
R1((l) => ({
  ...l,
  get: (i, s, o) => J0(i, s) || l.get(i, s, o),
  has: (i, s) => !!J0(i, s) || l.has(i, s),
}));
const KT = ['continue', 'continuePrimaryKey', 'advance'],
  F0 = {},
  af = new WeakMap(),
  O1 = new WeakMap(),
  QT = {
    get(l, i) {
      if (!KT.includes(i)) return l[i];
      let s = F0[i];
      return (
        s ||
          (s = F0[i] =
            function (...o) {
              af.set(this, O1.get(this)[i](...o));
            }),
        s
      );
    },
  };
async function* WT(...l) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...l)), !i)) return;
  i = i;
  const s = new Proxy(i, QT);
  for (O1.set(s, i), vo.set(s, tf(i)); i; )
    (yield s, (i = await (af.get(s) || i.continue())), af.delete(s));
}
function I0(l, i) {
  return (
    (i === Symbol.asyncIterator && Iu(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && Iu(l, [IDBIndex, IDBObjectStore]))
  );
}
R1((l) => ({
  ...l,
  get(i, s, o) {
    return I0(i, s) ? WT : l.get(i, s, o);
  },
  has(i, s) {
    return I0(i, s) || l.has(i, s);
  },
}));
const JT = {
  1: (l) => {
    (l.createObjectStore(ee.profile, { keyPath: 'id' }),
      l.createObjectStore(ee.currencies, { keyPath: 'id' }),
      l.createObjectStore(ee.machine, { keyPath: 'key' }),
      l.createObjectStore(ee.weapons, { keyPath: 'id' }),
      l
        .createObjectStore(ee.patches, { keyPath: ['name', 'tier'] })
        .createIndex('byName', 'name', { unique: !1 }),
      l.createObjectStore(ee.equippedPatches, { keyPath: 'slotIndex' }),
      l.createObjectStore(ee.settings, { keyPath: 'id' }));
  },
};
function FT(l, i, s, o) {
  for (let f = s + 1; f <= o; f++) {
    const d = JT[f];
    if (!d) throw new Error(`No migration registered for version ${f}`);
    d(l, i);
  }
}
let Cc = null;
async function nf() {
  return (
    Cc ||
    ((Cc = await YT(o1, so, {
      upgrade(l, i, s, o) {
        try {
          FT(l, o, i, s ?? so);
        } catch (f) {
          throw (console.error('[DB] Migration failed:', f), f);
        }
      },
    })),
    await IT(Cc),
    Cc)
  );
}
async function IT(l) {
  const i = l.transaction(
      [ee.profile, ee.currencies, ee.machine, ee.weapons, ee.settings],
      'readwrite'
    ),
    [s, o, f, d] = await Promise.all([
      i.objectStore(ee.profile).get('singleton'),
      i.objectStore(ee.currencies).get('singleton'),
      i.objectStore(ee.weapons).get('singleton'),
      i.objectStore(ee.settings).get('singleton'),
    ]),
    m = Date.now(),
    p = [];
  (s || p.push(i.objectStore(ee.profile).put({ ...r1, createdAt: m, lastPlayedAt: m })),
    o || p.push(i.objectStore(ee.currencies).put(u1)),
    f || p.push(i.objectStore(ee.weapons).put(f1)),
    d || p.push(i.objectStore(ee.settings).put(d1)));
  const g = i.objectStore(ee.machine),
    y = await g.getAllKeys(),
    _ = new Set(y);
  for (const b of ro) _.has(b) || p.push(g.put({ key: b, lv: 0 }));
  (await Promise.all(p), await i.done);
}
async function PT(l, i) {
  await l.put(ee.profile, i);
}
async function eM(l, i) {
  await l.put(ee.currencies, i);
}
async function tM(l, i) {
  await l.put(ee.machine, i);
}
async function aM(l, i) {
  await l.put(ee.weapons, i);
}
async function nM(l, i) {
  await l.put(ee.patches, i);
}
async function lM(l) {
  return l.getAll(ee.equippedPatches);
}
async function iM(l, i) {
  const o = (await lM(l)).find((f) => f.name === i.name && f.slotIndex !== i.slotIndex);
  if (o) throw new Error(`Patch "${i.name}" is already equipped in slot ${o.slotIndex}`);
  await l.put(ee.equippedPatches, i);
}
async function cM(l, i) {
  await l.put(ee.settings, i);
}
async function D1(l) {
  const i = l.transaction(
      [
        ee.profile,
        ee.currencies,
        ee.machine,
        ee.weapons,
        ee.patches,
        ee.equippedPatches,
        ee.settings,
      ],
      'readonly'
    ),
    [s, o, f, d, m, p, g] = await Promise.all([
      i.objectStore(ee.profile).get('singleton'),
      i.objectStore(ee.currencies).get('singleton'),
      i.objectStore(ee.machine).getAll(),
      i.objectStore(ee.weapons).get('singleton'),
      i.objectStore(ee.patches).getAll(),
      i.objectStore(ee.equippedPatches).getAll(),
      i.objectStore(ee.settings).get('singleton'),
    ]);
  if ((await i.done, !s || !o || !d || !g))
    throw new Error(
      '[DB] loadSaveState: Required singleton record is missing. Run openDatabase() first.'
    );
  return {
    profile: s,
    currencies: o,
    machine: f,
    weapons: d,
    patches: m,
    equippedPatches: p,
    settings: g,
  };
}
const B1 = 'tower-like-game:import-backups',
  sM = 3;
function oM() {
  try {
    const l = localStorage.getItem(B1);
    return l ? JSON.parse(l) : [];
  } catch {
    return [];
  }
}
function rM(l) {
  try {
    localStorage.setItem(B1, JSON.stringify(l));
  } catch (i) {
    console.warn('[DB] Failed to save backup to localStorage:', i);
  }
}
function uM(l) {
  const i = oM();
  i.unshift({ savedAt: Date.now(), data: l });
  const s = i.slice(0, sM);
  rM(s);
}
async function L1(l) {
  const i = await D1(l);
  return { formatVersion: 1, dbVersion: so, exportedAt: Date.now(), data: i };
}
async function fM(l, i) {
  if (i.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${i.formatVersion}`);
  try {
    const d = await L1(l);
    uM(d);
  } catch (d) {
    console.warn('[DB] Pre-import backup failed (proceeding anyway):', d);
  }
  const { data: s } = i,
    o = l.transaction(
      [
        ee.profile,
        ee.currencies,
        ee.machine,
        ee.weapons,
        ee.patches,
        ee.equippedPatches,
        ee.settings,
      ],
      'readwrite'
    );
  await Promise.all([
    o.objectStore(ee.profile).clear(),
    o.objectStore(ee.currencies).clear(),
    o.objectStore(ee.machine).clear(),
    o.objectStore(ee.weapons).clear(),
    o.objectStore(ee.patches).clear(),
    o.objectStore(ee.equippedPatches).clear(),
    o.objectStore(ee.settings).clear(),
  ]);
  const f = [
    o.objectStore(ee.profile).put(s.profile),
    o.objectStore(ee.currencies).put(s.currencies),
    o.objectStore(ee.weapons).put(s.weapons),
    o.objectStore(ee.settings).put(s.settings),
    ...s.machine.map((d) => o.objectStore(ee.machine).put(d)),
    ...s.patches.map((d) => o.objectStore(ee.patches).put(d)),
    ...s.equippedPatches.map((d) => o.objectStore(ee.equippedPatches).put(d)),
  ];
  (await Promise.all(f), await o.done);
}
const dM = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function mM() {
  const { navigate: l } = Qn(),
    [i, s] = q.useState('sound'),
    o = async () => {
      const m = await nf(),
        p = await L1(m),
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
        y = await nf();
      (await fM(y, g), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(o1), window.location.reload());
    };
  return u.jsx(Nl, {
    header: u.jsx(Lc, {
      title: '設定',
      onBack: () => l('title'),
      currencies: [],
      tabBar: u.jsx(oo, { tabs: dM, value: i, onChange: s, fullWidth: !0 }),
    }),
    footer: u.jsx(Bc, { active: 'settings', onChange: l }),
    children: u.jsxs('div', {
      className: WA.content,
      children: [
        i === 'sound' && u.jsx($T, {}),
        i === 'game' && u.jsx(wT, {}),
        i === 'data' && u.jsx(uT, { onExport: o, onImport: f, onReset: d }),
      ],
    }),
  });
}
const hM = '_layout_198wk_1',
  pM = '_heroWrap_198wk_12',
  P0 = { layout: hM, heroWrap: pM },
  yM = '_banner_sva4m_3',
  gM = '_bannerInfo_sva4m_24',
  Zu = { banner: yM, bannerInfo: gM };
function vM({ banner: l, onApply: i }) {
  return l === null
    ? null
    : l.kind === 'has-update'
      ? u.jsxs('div', {
          className: Zu.banner,
          role: 'status',
          'aria-live': 'polite',
          children: [
            u.jsx(Y, { variant: 'body', color: 'default', children: '新しいバージョンがあります' }),
            u.jsx(Lt, { label: '更新', size: 'sm', variant: 'primary', onClick: i }),
          ],
        })
      : u.jsx('div', {
          className: `${Zu.banner} ${Zu.bannerInfo}`,
          role: 'status',
          'aria-live': 'polite',
          children: u.jsx(Y, {
            variant: 'body',
            color: 'dim',
            children: '現在のバージョンは最新です',
          }),
        });
}
const _M = '_root_5udm7_1',
  bM = { root: _M };
function SM({
  onResume: l,
  onNewGame: i,
  lastSavedAt: s,
  onCheckUpdate: o,
  isCheckingUpdate: f = !1,
}) {
  const m = G((p) => p.createdAt) > 0;
  return u.jsxs('div', {
    className: bM.root,
    children: [
      u.jsx(Lt, {
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
      u.jsx(Lt, {
        label: '新規開始',
        variant: m ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: u.jsx(Ye, { name: 'plus', size: 18 }),
        onClick: i,
      }),
      o != null &&
        u.jsx(Lt, {
          label: f ? '確認中…' : '更新を確認',
          variant: 'ghost',
          size: 'md',
          fullWidth: !0,
          disabled: f,
          onClick: o,
        }),
    ],
  });
}
const xM = '_root_qkflo_2',
  jM = '_title_qkflo_12',
  e1 = { root: xM, title: jM };
function AM({ title: l = 'NEON SPIRE', subtitle: i, version: s, tagline: o }) {
  return u.jsxs('header', {
    className: e1.root,
    role: 'banner',
    children: [
      u.jsx('h1', { className: e1.title, children: l }),
      i != null &&
        u.jsx(Y, {
          variant: 'label',
          color: 'mid',
          align: 'center',
          style: { fontSize: 11, letterSpacing: '0.24em' },
          children: i,
        }),
      o != null &&
        u.jsx(Y, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { marginTop: 4, fontSize: 11 },
          children: o,
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
const TM = '_root_1szye_1',
  MM = '_ringOuter_1szye_9',
  EM = '_ringMiddle_1szye_17',
  wM = '_glowDisc_1szye_24',
  NM = '_cornerAccent_1szye_31',
  zM = '_icon_1szye_40',
  xi = { root: TM, ringOuter: MM, ringMiddle: EM, glowDisc: wM, cornerAccent: NM, icon: zM };
function CM({ size: l = 180, iconName: i = 'tower' }) {
  return u.jsxs('div', {
    className: xi.root,
    style: { width: l, height: l },
    role: 'presentation',
    'aria-hidden': 'true',
    children: [
      u.jsx('div', { className: xi.ringOuter }),
      u.jsx('div', { className: xi.ringMiddle }),
      u.jsx('div', { className: xi.glowDisc }),
      [0, 90, 180, 270].map((s) =>
        u.jsx(
          'div',
          {
            className: xi.cornerAccent,
            style: { transform: `rotate(${s}deg) translate(${l / 2 - 5}px) rotate(45deg)` },
          },
          s
        )
      ),
      u.jsx('span', {
        className: xi.icon,
        children: u.jsx(Ye, { name: i, size: Math.round(l * 0.49) }),
      }),
    ],
  });
}
const RM = 'modulepreload',
  OM = function (l) {
    return '/tower-like-game/' + l;
  },
  t1 = {},
  DM = function (i, s, o) {
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
          if (((y = OM(y)), y in t1)) return;
          t1[y] = !0;
          const _ = y.endsWith('.css'),
            b = _ ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${y}"]${b}`)) return;
          const A = document.createElement('link');
          if (
            ((A.rel = _ ? 'stylesheet' : RM),
            _ || (A.as = 'script'),
            (A.crossOrigin = ''),
            (A.href = y),
            g && A.setAttribute('nonce', g),
            document.head.appendChild(A),
            _)
          )
            return new Promise((M, E) => {
              (A.addEventListener('load', M),
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
      return i().catch(d);
    });
  };
function BM(l = {}) {
  const {
    immediate: i = !1,
    onNeedRefresh: s,
    onOfflineReady: o,
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
        ((p = await DM(async () => {
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
          b.isUpdate || o == null || o();
        }),
        p
          .register({ immediate: i })
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
function LM(l = {}) {
  const {
      immediate: i = !0,
      onNeedRefresh: s,
      onOfflineReady: o,
      onRegistered: f,
      onRegisteredSW: d,
      onRegisterError: m,
    } = l,
    [p, g] = q.useState(!1),
    [y, _] = q.useState(!1),
    [b] = q.useState(() =>
      BM({
        immediate: i,
        onOfflineReady() {
          (_(!0), o == null || o());
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
const $M = 2500,
  kM = 1500;
function HM() {
  const l = q.useRef(null),
    {
      needRefresh: [i],
      updateServiceWorker: s,
    } = LM({
      onRegisteredSW: (A, M) => {
        l.current = M ?? null;
      },
    }),
    [o, f] = q.useState(!1),
    [d, m] = q.useState(!1),
    p = q.useRef(null),
    g = q.useRef(i);
  q.useEffect(() => {
    g.current = i;
  }, [i]);
  const y = q.useCallback(async () => {
      if (!o && !g.current) {
        (f(!0), m(!1));
        try {
          const A = l.current;
          (A && (await A.update()),
            await new Promise((M) => {
              window.setTimeout(M, kM);
            }));
        } catch {}
        (f(!1),
          g.current ||
            (m(!0),
            p.current !== null && window.clearTimeout(p.current),
            (p.current = window.setTimeout(() => {
              (m(!1), (p.current = null));
            }, $M))));
      }
    }, [o]),
    _ = q.useCallback(() => {
      s(!0);
    }, [s]);
  return {
    banner: i ? { kind: 'has-update' } : d ? { kind: 'up-to-date' } : null,
    checkForUpdate: y,
    isChecking: o,
    applyUpdate: _,
  };
}
function UM(l) {
  if (l < 0) return '今';
  const i = Math.floor(l / 1e3);
  if (i < 60) return '今';
  const s = Math.floor(i / 60);
  if (s < 60) return `${s} 分前`;
  const o = Math.floor(s / 60);
  return o < 24 ? `${o} 時間前` : `${Math.floor(o / 24)} 日前`;
}
function qM() {
  const { navigate: l } = Qn(),
    i = G((p) => p.createdAt),
    { banner: s, checkForUpdate: o, isChecking: f, applyUpdate: d } = HM(),
    m = q.useMemo(() => (i > 0 ? UM(Date.now() - i) : void 0), [i]);
  return u.jsx(Nl, {
    children: u.jsxs('div', {
      className: P0.layout,
      children: [
        u.jsx(AM, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.2.0',
        }),
        u.jsx('div', { className: P0.heroWrap, children: u.jsx(CM, {}) }),
        u.jsx(SM, {
          lastSavedAt: m,
          onResume: () => l('preparation'),
          onNewGame: () => l('preparation'),
          onCheckUpdate: () => void o(),
          isCheckingUpdate: f,
        }),
        u.jsx(vM, { banner: s, onApply: d }),
      ],
    }),
  });
}
const VM = {
  title: 'title',
  preparation: 'base',
  machine: 'base',
  armory: 'base',
  patches: 'base',
  settings: 'base',
  battle: 'battleNormal',
};
function GM(l, i) {
  (q.useEffect(() => {
    const s = () => {
      Ie.isInitialized() || (Ie.init(), Ie.setBgmVolume(l), Ie.setSeVolume(i));
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
      Ie.setBgmVolume(l);
    }, [l]),
    q.useEffect(() => {
      Ie.setSeVolume(i);
    }, [i]));
}
function YM() {
  const { screen: l } = Qn(),
    i = G((o) => o.bgmVolume),
    s = G((o) => o.seVolume);
  switch (
    (GM(i, s),
    q.useEffect(() => {
      Ie.playBgm(VM[l]);
    }, [l]),
    l)
  ) {
    case 'title':
      return u.jsx(qM, {});
    case 'preparation':
      return u.jsx(KA, {});
    case 'machine':
      return u.jsx(cj, {});
    case 'armory':
      return u.jsx(AS, {});
    case 'patches':
      return u.jsx(pA, {});
    case 'settings':
      return u.jsx(mM, {});
    case 'battle':
      return u.jsx(aj, {});
    default:
      return u.jsx(sj, {});
  }
}
async function Wn() {
  return nf();
}
async function ZM() {
  const l = await Wn(),
    i = await D1(l),
    s = G.getState(),
    o = i.profile ?? r1;
  G.setState({
    highestTier: o.highestTier,
    highestWave: o.highestWave,
    totalPlayTimeSec: o.totalPlayTimeSec,
    totalRuns: o.totalRuns,
    totalEnemiesKilled: o.totalEnemiesKilled,
    createdAt: o.createdAt,
    lastPlayedAt: o.lastPlayedAt,
  });
  const f = i.currencies ?? u1;
  G.setState({ bolt: W.fromJSON(f.bolt), alloy: W.fromJSON(f.alloy) });
  const d = i.machine,
    m = { ...s.machineLevels };
  for (const M of ro) {
    const E = d.find((U) => U.key === M);
    m[M] = E ? E.lv : 0;
  }
  G.setState({ machineLevels: m });
  const p = i.weapons ?? f1;
  G.setState({ weaponLv: p.weaponLv, initialWeapon: p.initialWeapon });
  const g = i.patches,
    y = new Map();
  for (const M of g)
    M.count > 0 && y.set(Qu(M.name, M.tier), { name: M.name, tier: M.tier, count: M.count });
  G.setState({ patches: y });
  const _ = i.equippedPatches,
    b = new Map();
  for (const M of _) b.set(M.slotIndex, { name: M.name, tier: M.tier });
  G.setState({ equippedPatches: b });
  const A = i.settings ?? d1;
  G.setState({
    bgmVolume: A.bgmVolume,
    seVolume: A.seVolume,
    vibrationEnabled: A.vibrationEnabled,
  });
}
async function $1() {
  const l = await Wn(),
    { bolt: i, alloy: s } = G.getState();
  await eM(l, { id: 'singleton', bolt: i.toJSON(), alloy: s.toJSON() });
}
async function k1() {
  const l = await Wn(),
    { machineLevels: i } = G.getState();
  await Promise.all(ro.map((s) => tM(l, { key: s, lv: i[s] })));
}
async function H1() {
  const l = await Wn(),
    { weaponLv: i, initialWeapon: s } = G.getState();
  await aM(l, { id: 'singleton', weaponLv: i, initialWeapon: s });
}
async function U1() {
  const l = await Wn(),
    { bgmVolume: i, seVolume: s, vibrationEnabled: o } = G.getState();
  await cM(l, { id: 'singleton', bgmVolume: i, seVolume: s, vibrationEnabled: o });
}
async function q1() {
  const l = await Wn(),
    {
      highestTier: i,
      highestWave: s,
      totalPlayTimeSec: o,
      totalRuns: f,
      totalEnemiesKilled: d,
      createdAt: m,
      lastPlayedAt: p,
    } = G.getState();
  await PT(l, {
    id: 'singleton',
    highestTier: i,
    highestWave: s,
    totalPlayTimeSec: o,
    totalRuns: f,
    totalEnemiesKilled: d,
    createdAt: m,
    lastPlayedAt: p,
    schemaVersion: 1,
  });
}
async function V1() {
  const l = await Wn(),
    { patches: i } = G.getState(),
    s = [];
  for (const o of i.values())
    o.count > 0 && s.push(nM(l, { name: o.name, tier: o.tier, count: o.count }));
  await Promise.all(s);
}
async function G1() {
  const l = await Wn(),
    { equippedPatches: i } = G.getState(),
    s = [];
  for (const [o, f] of i) s.push(iM(l, { slotIndex: o, name: f.name, tier: f.tier }));
  await Promise.all(s);
}
async function Y1() {
  await Promise.all([q1(), $1(), k1(), H1(), V1(), G1(), U1()]);
}
function XM() {
  const l = () => {
    document.visibilityState === 'hidden' && Y1();
  };
  return (
    document.addEventListener('visibilitychange', l),
    () => document.removeEventListener('visibilitychange', l)
  );
}
const KM = 500;
function xl(l, i) {
  let s = null;
  return () => {
    (s != null && clearTimeout(s),
      (s = setTimeout(() => {
        i().catch((o) => {
          console.error(`[autosave:${l}] failed`, o);
        });
      }, KM)));
  };
}
function QM() {
  (XM(),
    window.addEventListener('beforeunload', () => {
      Y1();
    }));
  const l = xl('currencies', $1),
    i = xl('machine', k1),
    s = xl('weapons', H1),
    o = xl('settings', U1),
    f = xl('profile', q1),
    d = xl('patches', V1),
    m = xl('equippedPatches', G1);
  G.subscribe((p, g) => {
    ((p.bolt !== g.bolt || p.alloy !== g.alloy) && l(),
      p.machineLevels !== g.machineLevels && i(),
      (p.weaponLv !== g.weaponLv || p.initialWeapon !== g.initialWeapon) && s(),
      (p.bgmVolume !== g.bgmVolume ||
        p.seVolume !== g.seVolume ||
        p.vibrationEnabled !== g.vibrationEnabled) &&
        o(),
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
const Z1 = document.getElementById('root');
if (!Z1) throw new Error('Failed to find #root element');
const WM = pg.createRoot(Z1);
ZM()
  .catch((l) => {
    console.error('[hydrateStore] failed', l);
  })
  .finally(() => {
    (QM(), WM.render(u.jsx(xS, { children: u.jsx(YM, {}) })));
  });
