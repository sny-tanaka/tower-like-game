var Py = Object.defineProperty;
var eg = (l, i, s) =>
  i in l ? Py(l, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (l[i] = s);
var Sa = (l, i, s) => eg(l, typeof i != 'symbol' ? i + '' : i, s);
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
function tg(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, 'default') ? l.default : l;
}
var Mu = { exports: {} },
  _c = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var th;
function ag() {
  if (th) return _c;
  th = 1;
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
var ah;
function ng() {
  return (ah || ((ah = 1), (Mu.exports = ag())), Mu.exports);
}
var u = ng(),
  Eu = { exports: {} },
  bc = {},
  wu = { exports: {} },
  Nu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var nh;
function lg() {
  return (
    nh ||
      ((nh = 1),
      (function (l) {
        function i(O, X) {
          var le = O.length;
          O.push(X);
          e: for (; 0 < le; ) {
            var Ae = (le - 1) >>> 1,
              Ee = O[Ae];
            if (0 < f(Ee, X)) ((O[Ae] = X), (O[le] = Ee), (le = Ae));
            else break e;
          }
        }
        function s(O) {
          return O.length === 0 ? null : O[0];
        }
        function o(O) {
          if (O.length === 0) return null;
          var X = O[0],
            le = O.pop();
          if (le !== X) {
            O[0] = le;
            e: for (var Ae = 0, Ee = O.length, x = Ee >>> 1; Ae < x; ) {
              var H = 2 * (Ae + 1) - 1,
                K = O[H],
                J = H + 1,
                ie = O[J];
              if (0 > f(K, le))
                J < Ee && 0 > f(ie, K)
                  ? ((O[Ae] = ie), (O[J] = le), (Ae = J))
                  : ((O[Ae] = K), (O[H] = le), (Ae = H));
              else if (J < Ee && 0 > f(ie, le)) ((O[Ae] = ie), (O[J] = le), (Ae = J));
              else break e;
            }
          }
          return X;
        }
        function f(O, X) {
          var le = O.sortIndex - X.sortIndex;
          return le !== 0 ? le : O.id - X.id;
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
          E = !1,
          T = !1,
          D = !1,
          R = !1,
          Z = typeof setTimeout == 'function' ? setTimeout : null,
          V = typeof clearTimeout == 'function' ? clearTimeout : null,
          se = typeof setImmediate < 'u' ? setImmediate : null;
        function U(O) {
          for (var X = s(y); X !== null; ) {
            if (X.callback === null) o(y);
            else if (X.startTime <= O) (o(y), (X.sortIndex = X.expirationTime), i(g, X));
            else break;
            X = s(y);
          }
        }
        function pe(O) {
          if (((D = !1), U(O), !T))
            if (s(g) !== null) ((T = !0), Me || ((Me = !0), Ie()));
            else {
              var X = s(y);
              X !== null && ht(pe, X.startTime - O);
            }
        }
        var Me = !1,
          ne = -1,
          Re = 5,
          nt = -1;
        function et() {
          return R ? !0 : !(l.unstable_now() - nt < Re);
        }
        function Ve() {
          if (((R = !1), Me)) {
            var O = l.unstable_now();
            nt = O;
            var X = !0;
            try {
              e: {
                ((T = !1), D && ((D = !1), V(ne), (ne = -1)), (E = !0));
                var le = A;
                try {
                  t: {
                    for (U(O), b = s(g); b !== null && !(b.expirationTime > O && et()); ) {
                      var Ae = b.callback;
                      if (typeof Ae == 'function') {
                        ((b.callback = null), (A = b.priorityLevel));
                        var Ee = Ae(b.expirationTime <= O);
                        if (((O = l.unstable_now()), typeof Ee == 'function')) {
                          ((b.callback = Ee), U(O), (X = !0));
                          break t;
                        }
                        (b === s(g) && o(g), U(O));
                      } else o(g);
                      b = s(g);
                    }
                    if (b !== null) X = !0;
                    else {
                      var x = s(y);
                      (x !== null && ht(pe, x.startTime - O), (X = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (A = le), (E = !1));
                }
                X = void 0;
              }
            } finally {
              X ? Ie() : (Me = !1);
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
          ne = Z(function () {
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
            var le = A;
            A = X;
            try {
              return O();
            } finally {
              A = le;
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
            var le = A;
            A = O;
            try {
              return X();
            } finally {
              A = le;
            }
          }),
          (l.unstable_scheduleCallback = function (O, X, le) {
            var Ae = l.unstable_now();
            switch (
              (typeof le == 'object' && le !== null
                ? ((le = le.delay), (le = typeof le == 'number' && 0 < le ? Ae + le : Ae))
                : (le = Ae),
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
              (Ee = le + Ee),
              (O = {
                id: _++,
                callback: X,
                priorityLevel: O,
                startTime: le,
                expirationTime: Ee,
                sortIndex: -1,
              }),
              le > Ae
                ? ((O.sortIndex = le),
                  i(y, O),
                  s(g) === null &&
                    O === s(y) &&
                    (D ? (V(ne), (ne = -1)) : (D = !0), ht(pe, le - Ae)))
                : ((O.sortIndex = Ee), i(g, O), T || E || ((T = !0), Me || ((Me = !0), Ie()))),
              O
            );
          }),
          (l.unstable_shouldYield = et),
          (l.unstable_wrapCallback = function (O) {
            var X = A;
            return function () {
              var le = A;
              A = X;
              try {
                return O.apply(this, arguments);
              } finally {
                A = le;
              }
            };
          }));
      })(Nu)),
    Nu
  );
}
var lh;
function ig() {
  return (lh || ((lh = 1), (wu.exports = lg())), wu.exports);
}
var zu = { exports: {} },
  oe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ih;
function cg() {
  if (ih) return oe;
  ih = 1;
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
  function E(x) {
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
  var pe = Array.isArray;
  function Me() {}
  var ne = { H: null, A: null, T: null, S: null },
    Re = Object.prototype.hasOwnProperty;
  function nt(x, H, K) {
    var J = K.ref;
    return { $$typeof: l, type: x, key: H, ref: J !== void 0 ? J : null, props: K };
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
            ? x.then(Me, Me)
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
  function O(x, H, K, J, ie) {
    var fe = typeof x;
    (fe === 'undefined' || fe === 'boolean') && (x = null);
    var Te = !1;
    if (x === null) Te = !0;
    else
      switch (fe) {
        case 'bigint':
        case 'string':
        case 'number':
          Te = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case l:
            case i:
              Te = !0;
              break;
            case _:
              return ((Te = x._init), O(Te(x._payload), H, K, J, ie));
          }
      }
    if (Te)
      return (
        (ie = ie(x)),
        (Te = J === '' ? '.' + Lt(x, 0) : J),
        pe(ie)
          ? ((K = ''),
            Te != null && (K = Te.replace(Ut, '$&/') + '/'),
            O(ie, H, K, '', function (Ba) {
              return Ba;
            }))
          : ie != null &&
            (Ve(ie) &&
              (ie = et(
                ie,
                K +
                  (ie.key == null || (x && x.key === ie.key)
                    ? ''
                    : ('' + ie.key).replace(Ut, '$&/') + '/') +
                  Te
              )),
            H.push(ie)),
        1
      );
    Te = 0;
    var pt = J === '' ? '.' : J + ':';
    if (pe(x))
      for (var Ke = 0; Ke < x.length; Ke++)
        ((J = x[Ke]), (fe = pt + Lt(J, Ke)), (Te += O(J, H, K, fe, ie)));
    else if (((Ke = E(x)), typeof Ke == 'function'))
      for (x = Ke.call(x), Ke = 0; !(J = x.next()).done; )
        ((J = J.value), (fe = pt + Lt(J, Ke++)), (Te += O(J, H, K, fe, ie)));
    else if (fe === 'object') {
      if (typeof x.then == 'function') return O(ht(x), H, K, J, ie);
      throw (
        (H = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Te;
  }
  function X(x, H, K) {
    if (x == null) return x;
    var J = [],
      ie = 0;
    return (
      O(x, J, '', '', function (fe) {
        return H.call(K, fe, ie++);
      }),
      J
    );
  }
  function le(x) {
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
  var Ae =
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
    (oe.StrictMode = o),
    (oe.Suspense = g),
    (oe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne),
    (oe.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return ne.H.useMemoCache(x);
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
      var J = D({}, x.props),
        ie = x.key;
      if (H != null)
        for (fe in (H.key !== void 0 && (ie = '' + H.key), H))
          !Re.call(H, fe) ||
            fe === 'key' ||
            fe === '__self' ||
            fe === '__source' ||
            (fe === 'ref' && H.ref === void 0) ||
            (J[fe] = H[fe]);
      var fe = arguments.length - 2;
      if (fe === 1) J.children = K;
      else if (1 < fe) {
        for (var Te = Array(fe), pt = 0; pt < fe; pt++) Te[pt] = arguments[pt + 2];
        J.children = Te;
      }
      return nt(x.type, ie, J);
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
      var J,
        ie = {},
        fe = null;
      if (H != null)
        for (J in (H.key !== void 0 && (fe = '' + H.key), H))
          Re.call(H, J) && J !== 'key' && J !== '__self' && J !== '__source' && (ie[J] = H[J]);
      var Te = arguments.length - 2;
      if (Te === 1) ie.children = K;
      else if (1 < Te) {
        for (var pt = Array(Te), Ke = 0; Ke < Te; Ke++) pt[Ke] = arguments[Ke + 2];
        ie.children = pt;
      }
      if (x && x.defaultProps)
        for (J in ((Te = x.defaultProps), Te)) ie[J] === void 0 && (ie[J] = Te[J]);
      return nt(x, fe, ie);
    }),
    (oe.createRef = function () {
      return { current: null };
    }),
    (oe.forwardRef = function (x) {
      return { $$typeof: p, render: x };
    }),
    (oe.isValidElement = Ve),
    (oe.lazy = function (x) {
      return { $$typeof: _, _payload: { _status: -1, _result: x }, _init: le };
    }),
    (oe.memo = function (x, H) {
      return { $$typeof: y, type: x, compare: H === void 0 ? null : H };
    }),
    (oe.startTransition = function (x) {
      var H = ne.T,
        K = {};
      ne.T = K;
      try {
        var J = x(),
          ie = ne.S;
        (ie !== null && ie(K, J),
          typeof J == 'object' && J !== null && typeof J.then == 'function' && J.then(Me, Ae));
      } catch (fe) {
        Ae(fe);
      } finally {
        (H !== null && K.types !== null && (H.types = K.types), (ne.T = H));
      }
    }),
    (oe.unstable_useCacheRefresh = function () {
      return ne.H.useCacheRefresh();
    }),
    (oe.use = function (x) {
      return ne.H.use(x);
    }),
    (oe.useActionState = function (x, H, K) {
      return ne.H.useActionState(x, H, K);
    }),
    (oe.useCallback = function (x, H) {
      return ne.H.useCallback(x, H);
    }),
    (oe.useContext = function (x) {
      return ne.H.useContext(x);
    }),
    (oe.useDebugValue = function () {}),
    (oe.useDeferredValue = function (x, H) {
      return ne.H.useDeferredValue(x, H);
    }),
    (oe.useEffect = function (x, H) {
      return ne.H.useEffect(x, H);
    }),
    (oe.useEffectEvent = function (x) {
      return ne.H.useEffectEvent(x);
    }),
    (oe.useId = function () {
      return ne.H.useId();
    }),
    (oe.useImperativeHandle = function (x, H, K) {
      return ne.H.useImperativeHandle(x, H, K);
    }),
    (oe.useInsertionEffect = function (x, H) {
      return ne.H.useInsertionEffect(x, H);
    }),
    (oe.useLayoutEffect = function (x, H) {
      return ne.H.useLayoutEffect(x, H);
    }),
    (oe.useMemo = function (x, H) {
      return ne.H.useMemo(x, H);
    }),
    (oe.useOptimistic = function (x, H) {
      return ne.H.useOptimistic(x, H);
    }),
    (oe.useReducer = function (x, H, K) {
      return ne.H.useReducer(x, H, K);
    }),
    (oe.useRef = function (x) {
      return ne.H.useRef(x);
    }),
    (oe.useState = function (x) {
      return ne.H.useState(x);
    }),
    (oe.useSyncExternalStore = function (x, H, K) {
      return ne.H.useSyncExternalStore(x, H, K);
    }),
    (oe.useTransition = function () {
      return ne.H.useTransition();
    }),
    (oe.version = '19.2.5'),
    oe
  );
}
var ch;
function tf() {
  return (ch || ((ch = 1), (zu.exports = cg())), zu.exports);
}
var Cu = { exports: {} },
  Ot = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sh;
function sg() {
  if (sh) return Ot;
  sh = 1;
  var l = tf();
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
          E = typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0;
        _ === 'style'
          ? o.d.S(g, typeof y.precedence == 'string' ? y.precedence : void 0, {
              crossOrigin: b,
              integrity: A,
              fetchPriority: E,
            })
          : _ === 'script' &&
            o.d.X(g, {
              crossOrigin: b,
              integrity: A,
              fetchPriority: E,
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
var oh;
function og() {
  if (oh) return Cu.exports;
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
      } catch (i) {
        console.error(i);
      }
  }
  return (l(), (Cu.exports = sg()), Cu.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var rh;
function rg() {
  if (rh) return bc;
  rh = 1;
  var l = ig(),
    i = tf(),
    s = og();
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
    E = Symbol.for('react.transitional.element'),
    T = Symbol.for('react.portal'),
    D = Symbol.for('react.fragment'),
    R = Symbol.for('react.strict_mode'),
    Z = Symbol.for('react.profiler'),
    V = Symbol.for('react.consumer'),
    se = Symbol.for('react.context'),
    U = Symbol.for('react.forward_ref'),
    pe = Symbol.for('react.suspense'),
    Me = Symbol.for('react.suspense_list'),
    ne = Symbol.for('react.memo'),
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
      case pe:
        return 'Suspense';
      case Me:
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
        case ne:
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
    O = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    le = { pending: !1, data: null, method: null, action: null },
    Ae = [],
    Ee = -1;
  function x(e) {
    return { current: e };
  }
  function H(e) {
    0 > Ee || ((e.current = Ae[Ee]), (Ae[Ee] = null), Ee--);
  }
  function K(e, t) {
    (Ee++, (Ae[Ee] = e.current), (e.current = t));
  }
  var J = x(null),
    ie = x(null),
    fe = x(null),
    Te = x(null);
  function pt(e, t) {
    switch ((K(fe, t), K(ie, e), K(J, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? A0(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = A0(t)), (e = T0(t, e)));
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
    (H(J), K(J, e));
  }
  function Ke() {
    (H(J), H(ie), H(fe));
  }
  function Ba(e) {
    e.memoizedState !== null && K(Te, e);
    var t = J.current,
      a = T0(t, e.type);
    t !== a && (K(ie, e), K(J, a));
  }
  function Ea(e) {
    (ie.current === e && (H(J), H(ie)), Te.current === e && (H(Te), (pc._currentValue = le)));
  }
  var de, _t;
  function Qe(e) {
    if (de === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((de = (t && t[1]) || ''),
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
      de +
      e +
      _t
    );
  }
  var te = !1;
  function ga(e, t) {
    if (!e || te) return '';
    te = !0;
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
      ((te = !1), (Error.prepareStackTrace = a));
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
  var De = Object.prototype.hasOwnProperty,
    At = l.unstable_scheduleCallback,
    He = l.unstable_cancelCallback,
    tt = l.unstable_shouldYield,
    Rt = l.unstable_requestPaint,
    Be = l.unstable_now,
    aa = l.unstable_getCurrentPriorityLevel,
    La = l.unstable_ImmediatePriority,
    $a = l.unstable_UserBlockingPriority,
    mn = l.unstable_NormalPriority,
    wi = l.unstable_LowPriority,
    Kn = l.unstable_IdlePriority,
    Qn = l.log,
    zl = l.unstable_setDisableYieldValue,
    wa = null,
    yt = null;
  function Tt(e) {
    if ((typeof Qn == 'function' && zl(e), yt && typeof yt.setStrictMode == 'function'))
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
    var c = 0,
      r = e.suspendedLanes,
      h = e.pingedLanes;
    e = e.warmLanes;
    var v = n & 134217727;
    return (
      v !== 0
        ? ((n = v & ~r),
          n !== 0
            ? (c = na(n))
            : ((h &= v), h !== 0 ? (c = na(h)) : a || ((a = v & ~e), a !== 0 && (c = na(a)))))
        : ((v = n & ~r),
          v !== 0
            ? (c = na(v))
            : h !== 0
              ? (c = na(h))
              : a || ((a = n & ~e), a !== 0 && (c = na(a)))),
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
  function Ni() {
    var e = Ua;
    return ((Ua <<= 1), (Ua & 62914560) === 0 && (Ua = 4194304), e);
  }
  function Pn(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function W(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function re(e, t, a, n, c, r) {
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
    (n !== 0 && ye(e, n, 0),
      r !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(h & ~t)));
  }
  function ye(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - gt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function we(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var n = 31 - gt(a),
        c = 1 << n;
      ((c & t) | (e[n] & t) && (e[n] |= t), (a &= ~c));
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
  function Oe(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function he() {
    var e = X.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Q0(e.type));
  }
  function _e(e, t) {
    var a = X.p;
    try {
      return ((X.p = e), t());
    } finally {
      X.p = a;
    }
  }
  var Ze = Math.random().toString(36).slice(2),
    at = '__reactFiber$' + Ze,
    Mt = '__reactProps$' + Ze,
    Na = '__reactContainer$' + Ze,
    go = '__reactEvents$' + Ze,
    V1 = '__reactListeners$' + Ze,
    G1 = '__reactHandles$' + Ze,
    ff = '__reactResources$' + Ze,
    zi = '__reactMarker$' + Ze;
  function vo(e) {
    (delete e[at], delete e[Mt], delete e[go], delete e[V1], delete e[G1]);
  }
  function Cl(e) {
    var t = e[at];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Na] || a[at])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = R0(e); e !== null; ) {
            if ((a = e[at])) return a;
            e = R0(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function Rl(e) {
    if ((e = e[at] || e[Na])) {
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
  function Ol(e) {
    var t = e[ff];
    return (t || (t = e[ff] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function St(e) {
    e[zi] = !0;
  }
  var df = new Set(),
    mf = {};
  function el(e, t) {
    (Dl(e, t), Dl(e + 'Capture', t));
  }
  function Dl(e, t) {
    for (mf[e] = t, e = 0; e < t.length; e++) df.add(t[e]);
  }
  var Y1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    hf = {},
    pf = {};
  function Z1(e) {
    return De.call(pf, e)
      ? !0
      : De.call(hf, e)
        ? !1
        : Y1.test(e)
          ? (pf[e] = !0)
          : ((hf[e] = !0), !1);
  }
  function Uc(e, t, a) {
    if (Z1(t))
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
  function qc(e, t, a) {
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
  function yf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function X1(e, t, a) {
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
  function _o(e) {
    if (!e._valueTracker) {
      var t = yf(e) ? 'checked' : 'value';
      e._valueTracker = X1(e, t, '' + e[t]);
    }
  }
  function gf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      n = '';
    return (
      e && (n = yf(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function Vc(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var K1 = /[\n"\\]/g;
  function ia(e) {
    return e.replace(K1, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function bo(e, t, a, n, c, r, h, v) {
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
        ? So(e, h, la(t))
        : a != null
          ? So(e, h, la(a))
          : n != null && e.removeAttribute('value'),
      c == null && r != null && (e.defaultChecked = !!r),
      c != null && (e.checked = c && typeof c != 'function' && typeof c != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (e.name = '' + la(v))
        : e.removeAttribute('name'));
  }
  function vf(e, t, a, n, c, r, h, v) {
    if (
      (r != null &&
        typeof r != 'function' &&
        typeof r != 'symbol' &&
        typeof r != 'boolean' &&
        (e.type = r),
      t != null || a != null)
    ) {
      if (!((r !== 'submit' && r !== 'reset') || t != null)) {
        _o(e);
        return;
      }
      ((a = a != null ? '' + la(a) : ''),
        (t = t != null ? '' + la(t) : a),
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
      _o(e));
  }
  function So(e, t, a) {
    (t === 'number' && Vc(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function Bl(e, t, a, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var c = 0; c < a.length; c++) t['$' + a[c]] = !0;
      for (a = 0; a < e.length; a++)
        ((c = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== c && (e[a].selected = c),
          c && n && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + la(a), t = null, c = 0; c < e.length; c++) {
        if (e[c].value === a) {
          ((e[c].selected = !0), n && (e[c].defaultSelected = !0));
          return;
        }
        t !== null || e[c].disabled || (t = e[c]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function _f(e, t, a) {
    if (t != null && ((t = '' + la(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + la(a) : '';
  }
  function bf(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(o(92));
        if (ht(n)) {
          if (1 < n.length) throw Error(o(93));
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
      _o(e));
  }
  function Ll(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Q1 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Sf(e, t, a) {
    var n = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || Q1.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function xf(e, t, a) {
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
      for (var c in t) ((n = t[c]), t.hasOwnProperty(c) && a[c] !== n && Sf(e, c, n));
    } else for (var r in t) t.hasOwnProperty(r) && Sf(e, r, t[r]);
  }
  function xo(e) {
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
    J1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Gc(e) {
    return J1.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Ga() {}
  var jo = null;
  function Ao(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var $l = null,
    Hl = null;
  function jf(e) {
    var t = Rl(e);
    if (t && (e = t.stateNode)) {
      var a = e[Mt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (bo(
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
                var c = n[Mt] || null;
                if (!c) throw Error(o(90));
                bo(
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
            for (t = 0; t < a.length; t++) ((n = a[t]), n.form === e.form && gf(n));
          }
          break e;
        case 'textarea':
          _f(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && Bl(e, !!a.multiple, t, !1));
      }
    }
  }
  var To = !1;
  function Af(e, t, a) {
    if (To) return e(t, a);
    To = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((To = !1),
        ($l !== null || Hl !== null) &&
          (zs(), $l && ((t = $l), (e = Hl), (Hl = $l = null), jf(t), e)))
      )
        for (t = 0; t < e.length; t++) jf(e[t]);
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
  var Ya = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Mo = !1;
  if (Ya)
    try {
      var Oi = {};
      (Object.defineProperty(Oi, 'passive', {
        get: function () {
          Mo = !0;
        },
      }),
        window.addEventListener('test', Oi, Oi),
        window.removeEventListener('test', Oi, Oi));
    } catch {
      Mo = !1;
    }
  var hn = null,
    Eo = null,
    Yc = null;
  function Tf() {
    if (Yc) return Yc;
    var e,
      t = Eo,
      a = t.length,
      n,
      c = 'value' in hn ? hn.value : hn.textContent,
      r = c.length;
    for (e = 0; e < a && t[e] === c[e]; e++);
    var h = a - e;
    for (n = 1; n <= h && t[a - n] === c[r - n]; n++);
    return (Yc = c.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Zc(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Xc() {
    return !0;
  }
  function Mf() {
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
          ? Xc
          : Mf),
        (this.isPropagationStopped = Mf),
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
            (this.isDefaultPrevented = Xc));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Xc));
        },
        persist: function () {},
        isPersistent: Xc,
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
    Kc = qt(tl),
    Di = b({}, tl, { view: 0, detail: 0 }),
    F1 = qt(Di),
    wo,
    No,
    Bi,
    Qc = b({}, Di, {
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
      getModifierState: Co,
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
                ? ((wo = e.screenX - Bi.screenX), (No = e.screenY - Bi.screenY))
                : (No = wo = 0),
              (Bi = e)),
            wo);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : No;
      },
    }),
    Ef = qt(Qc),
    I1 = b({}, Qc, { dataTransfer: 0 }),
    P1 = qt(I1),
    ep = b({}, Di, { relatedTarget: 0 }),
    zo = qt(ep),
    tp = b({}, tl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ap = qt(tp),
    np = b({}, tl, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    lp = qt(np),
    ip = b({}, tl, { data: 0 }),
    wf = qt(ip),
    cp = {
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
    sp = {
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
    op = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function rp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = op[e]) ? !!t[e] : !1;
  }
  function Co() {
    return rp;
  }
  var up = b({}, Di, {
      key: function (e) {
        if (e.key) {
          var t = cp[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Zc(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? sp[e.keyCode] || 'Unidentified'
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
      getModifierState: Co,
      charCode: function (e) {
        return e.type === 'keypress' ? Zc(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Zc(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    fp = qt(up),
    dp = b({}, Qc, {
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
    Nf = qt(dp),
    mp = b({}, Di, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Co,
    }),
    hp = qt(mp),
    pp = b({}, tl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    yp = qt(pp),
    gp = b({}, Qc, {
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
    vp = qt(gp),
    _p = b({}, tl, { newState: 0, oldState: 0 }),
    bp = qt(_p),
    Sp = [9, 13, 27, 32],
    Ro = Ya && 'CompositionEvent' in window,
    Li = null;
  Ya && 'documentMode' in document && (Li = document.documentMode);
  var xp = Ya && 'TextEvent' in window && !Li,
    zf = Ya && (!Ro || (Li && 8 < Li && 11 >= Li)),
    Cf = ' ',
    Rf = !1;
  function Of(e, t) {
    switch (e) {
      case 'keyup':
        return Sp.indexOf(t.keyCode) !== -1;
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
  function Df(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var kl = !1;
  function jp(e, t) {
    switch (e) {
      case 'compositionend':
        return Df(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Rf = !0), Cf);
      case 'textInput':
        return ((e = t.data), e === Cf && Rf ? null : e);
      default:
        return null;
    }
  }
  function Ap(e, t) {
    if (kl)
      return e === 'compositionend' || (!Ro && Of(e, t))
        ? ((e = Tf()), (Yc = Eo = hn = null), (kl = !1), e)
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
        return zf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Tp = {
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
  function Bf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Tp[e.type] : t === 'textarea';
  }
  function Lf(e, t, a, n) {
    ($l ? (Hl ? Hl.push(n) : (Hl = [n])) : ($l = n),
      (t = $s(t, 'onChange')),
      0 < t.length &&
        ((a = new Kc('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var $i = null,
    Hi = null;
  function Mp(e) {
    v0(e, 0);
  }
  function Wc(e) {
    var t = Ci(e);
    if (gf(t)) return e;
  }
  function $f(e, t) {
    if (e === 'change') return t;
  }
  var Hf = !1;
  if (Ya) {
    var Oo;
    if (Ya) {
      var Do = 'oninput' in document;
      if (!Do) {
        var kf = document.createElement('div');
        (kf.setAttribute('oninput', 'return;'), (Do = typeof kf.oninput == 'function'));
      }
      Oo = Do;
    } else Oo = !1;
    Hf = Oo && (!document.documentMode || 9 < document.documentMode);
  }
  function Uf() {
    $i && ($i.detachEvent('onpropertychange', qf), (Hi = $i = null));
  }
  function qf(e) {
    if (e.propertyName === 'value' && Wc(Hi)) {
      var t = [];
      (Lf(t, Hi, e, Ao(e)), Af(Mp, t));
    }
  }
  function Ep(e, t, a) {
    e === 'focusin'
      ? (Uf(), ($i = t), (Hi = a), $i.attachEvent('onpropertychange', qf))
      : e === 'focusout' && Uf();
  }
  function wp(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Wc(Hi);
  }
  function Np(e, t) {
    if (e === 'click') return Wc(t);
  }
  function zp(e, t) {
    if (e === 'input' || e === 'change') return Wc(t);
  }
  function Cp(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Kt = typeof Object.is == 'function' ? Object.is : Cp;
  function ki(e, t) {
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
  function Vf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Gf(e, t) {
    var a = Vf(e);
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
      a = Vf(a);
    }
  }
  function Yf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Yf(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Zf(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Vc(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Vc(e.document);
    }
    return t;
  }
  function Bo(e) {
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
  var Rp = Ya && 'documentMode' in document && 11 >= document.documentMode,
    Ul = null,
    Lo = null,
    Ui = null,
    $o = !1;
  function Xf(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    $o ||
      Ul == null ||
      Ul !== Vc(n) ||
      ((n = Ul),
      'selectionStart' in n && Bo(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Ui && ki(Ui, n)) ||
        ((Ui = n),
        (n = $s(Lo, 'onSelect')),
        0 < n.length &&
          ((t = new Kc('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: n }),
          (t.target = Ul))));
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
  var ql = {
      animationend: al('Animation', 'AnimationEnd'),
      animationiteration: al('Animation', 'AnimationIteration'),
      animationstart: al('Animation', 'AnimationStart'),
      transitionrun: al('Transition', 'TransitionRun'),
      transitionstart: al('Transition', 'TransitionStart'),
      transitioncancel: al('Transition', 'TransitionCancel'),
      transitionend: al('Transition', 'TransitionEnd'),
    },
    Ho = {},
    Kf = {};
  Ya &&
    ((Kf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete ql.animationend.animation,
      delete ql.animationiteration.animation,
      delete ql.animationstart.animation),
    'TransitionEvent' in window || delete ql.transitionend.transition);
  function nl(e) {
    if (Ho[e]) return Ho[e];
    if (!ql[e]) return e;
    var t = ql[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in Kf) return (Ho[e] = t[a]);
    return e;
  }
  var Qf = nl('animationend'),
    Wf = nl('animationiteration'),
    Jf = nl('animationstart'),
    Op = nl('transitionrun'),
    Dp = nl('transitionstart'),
    Bp = nl('transitioncancel'),
    Ff = nl('transitionend'),
    If = new Map(),
    ko =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  ko.push('scrollEnd');
  function va(e, t) {
    (If.set(e, t), el(t, [e]));
  }
  var Jc =
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
    Vl = 0,
    Uo = 0;
  function Fc() {
    for (var e = Vl, t = (Uo = Vl = 0); t < e; ) {
      var a = ca[t];
      ca[t++] = null;
      var n = ca[t];
      ca[t++] = null;
      var c = ca[t];
      ca[t++] = null;
      var r = ca[t];
      if (((ca[t++] = null), n !== null && c !== null)) {
        var h = n.pending;
        (h === null ? (c.next = c) : ((c.next = h.next), (h.next = c)), (n.pending = c));
      }
      r !== 0 && Pf(a, c, r);
    }
  }
  function Ic(e, t, a, n) {
    ((ca[Vl++] = e),
      (ca[Vl++] = t),
      (ca[Vl++] = a),
      (ca[Vl++] = n),
      (Uo |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function qo(e, t, a, n) {
    return (Ic(e, t, a, n), Pc(e));
  }
  function ll(e, t) {
    return (Ic(e, null, null, t), Pc(e));
  }
  function Pf(e, t, a) {
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
          ((c = 31 - gt(a)),
          (e = r.hiddenUpdates),
          (n = e[c]),
          n === null ? (e[c] = [t]) : n.push(t),
          (t.lane = a | 536870912)),
        r)
      : null;
  }
  function Pc(e) {
    if (50 < oc) throw ((oc = 0), (Jr = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Gl = {};
  function Lp(e, t, a, n) {
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
    return new Lp(e, t, a, n);
  }
  function Vo(e) {
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
  function ed(e, t) {
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
  function es(e, t, a, n, c, r) {
    var h = 0;
    if (((n = e), typeof e == 'function')) Vo(e) && (h = 1);
    else if (typeof e == 'string')
      h = qy(e, a, J.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case nt:
          return ((e = Qt(31, a, t, c)), (e.elementType = nt), (e.lanes = r), e);
        case D:
          return il(a.children, c, r, t);
        case R:
          ((h = 8), (c |= 24));
          break;
        case Z:
          return ((e = Qt(12, a, t, c | 2)), (e.elementType = Z), (e.lanes = r), e);
        case pe:
          return ((e = Qt(13, a, t, c)), (e.elementType = pe), (e.lanes = r), e);
        case Me:
          return ((e = Qt(19, a, t, c)), (e.elementType = Me), (e.lanes = r), e);
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
              case ne:
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
  function il(e, t, a, n) {
    return ((e = Qt(7, e, n, t)), (e.lanes = a), e);
  }
  function Go(e, t, a) {
    return ((e = Qt(6, e, null, t)), (e.lanes = a), e);
  }
  function td(e) {
    var t = Qt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Yo(e, t, a) {
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
  var ad = new WeakMap();
  function sa(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = ad.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: bt(t) }), ad.set(e, t), t);
    }
    return { value: e, source: t, stack: bt(t) };
  }
  var Yl = [],
    Zl = 0,
    ts = null,
    qi = 0,
    oa = [],
    ra = 0,
    pn = null,
    za = 1,
    Ca = '';
  function Xa(e, t) {
    ((Yl[Zl++] = qi), (Yl[Zl++] = ts), (ts = e), (qi = t));
  }
  function nd(e, t, a) {
    ((oa[ra++] = za), (oa[ra++] = Ca), (oa[ra++] = pn), (pn = e));
    var n = za;
    e = Ca;
    var c = 32 - gt(n) - 1;
    ((n &= ~(1 << c)), (a += 1));
    var r = 32 - gt(t) + c;
    if (30 < r) {
      var h = c - (c % 5);
      ((r = (n & ((1 << h) - 1)).toString(32)),
        (n >>= h),
        (c -= h),
        (za = (1 << (32 - gt(t) + c)) | (a << c) | n),
        (Ca = r + e));
    } else ((za = (1 << r) | (a << c) | n), (Ca = e));
  }
  function Zo(e) {
    e.return !== null && (Xa(e, 1), nd(e, 1, 0));
  }
  function Xo(e) {
    for (; e === ts; ) ((ts = Yl[--Zl]), (Yl[Zl] = null), (qi = Yl[--Zl]), (Yl[Zl] = null));
    for (; e === pn; )
      ((pn = oa[--ra]),
        (oa[ra] = null),
        (Ca = oa[--ra]),
        (oa[ra] = null),
        (za = oa[--ra]),
        (oa[ra] = null));
  }
  function ld(e, t) {
    ((oa[ra++] = za), (oa[ra++] = Ca), (oa[ra++] = pn), (za = t.id), (Ca = t.overflow), (pn = e));
  }
  var Et = null,
    Je = null,
    je = !1,
    yn = null,
    ua = !1,
    Ko = Error(o(519));
  function gn(e) {
    var t = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Vi(sa(t, e)), Ko);
  }
  function id(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[at] = e), (t[Mt] = n), a)) {
      case 'dialog':
        (ve('cancel', t), ve('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ve('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < uc.length; a++) ve(uc[a], t);
        break;
      case 'source':
        ve('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (ve('error', t), ve('load', t));
        break;
      case 'details':
        ve('toggle', t);
        break;
      case 'input':
        (ve('invalid', t),
          vf(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        ve('invalid', t);
        break;
      case 'textarea':
        (ve('invalid', t), bf(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      x0(t.textContent, a)
        ? (n.popover != null && (ve('beforetoggle', t), ve('toggle', t)),
          n.onScroll != null && ve('scroll', t),
          n.onScrollEnd != null && ve('scrollend', t),
          n.onClick != null && (t.onclick = Ga),
          (t = !0))
        : (t = !1),
      t || gn(e, !0));
  }
  function cd(e) {
    for (Et = e.return; Et; )
      switch (Et.tag) {
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
          Et = Et.return;
      }
  }
  function Xl(e) {
    if (e !== Et) return !1;
    if (!je) return (cd(e), (je = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || fu(e.type, e.memoizedProps))),
        (a = !a)),
      a && Je && gn(e),
      cd(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      Je = C0(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      Je = C0(e);
    } else
      t === 27
        ? ((t = Je), Cn(e.type) ? ((e = yu), (yu = null), (Je = e)) : (Je = t))
        : (Je = Et ? da(e.stateNode.nextSibling) : null);
    return !0;
  }
  function cl() {
    ((Je = Et = null), (je = !1));
  }
  function Qo() {
    var e = yn;
    return (e !== null && (Zt === null ? (Zt = e) : Zt.push.apply(Zt, e), (yn = null)), e);
  }
  function Vi(e) {
    yn === null ? (yn = [e]) : yn.push(e);
  }
  var Wo = x(null),
    sl = null,
    Ka = null;
  function vn(e, t, a) {
    (K(Wo, t._currentValue), (t._currentValue = a));
  }
  function Qa(e) {
    ((e._currentValue = Wo.current), H(Wo));
  }
  function Jo(e, t, a) {
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
  function Fo(e, t, a, n) {
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
                Jo(r.return, a, e),
                n || (h = null));
              break e;
            }
          r = v.next;
        }
      } else if (c.tag === 18) {
        if (((h = c.return), h === null)) throw Error(o(341));
        ((h.lanes |= a), (r = h.alternate), r !== null && (r.lanes |= a), Jo(h, a, e), (h = null));
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
  function Kl(e, t, a, n) {
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
      } else if (c === Te.current) {
        if (((h = c.alternate), h === null)) throw Error(o(387));
        h.memoizedState.memoizedState !== c.memoizedState.memoizedState &&
          (e !== null ? e.push(pc) : (e = [pc]));
      }
      c = c.return;
    }
    (e !== null && Fo(t, e, a, n), (t.flags |= 262144));
  }
  function as(e) {
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
    return sd(sl, e);
  }
  function ns(e, t) {
    return (sl === null && ol(e), sd(e, t));
  }
  function sd(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Ka === null)) {
      if (e === null) throw Error(o(308));
      ((Ka = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Ka = Ka.next = t;
    return a;
  }
  var $p =
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
    Hp = l.unstable_scheduleCallback,
    kp = l.unstable_NormalPriority,
    rt = {
      $$typeof: se,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Io() {
    return { controller: new $p(), data: new Map(), refCount: 0 };
  }
  function Gi(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Hp(kp, function () {
          e.controller.abort();
        }));
  }
  var Yi = null,
    Po = 0,
    Ql = 0,
    Wl = null;
  function Up(e, t) {
    if (Yi === null) {
      var a = (Yi = []);
      ((Po = 0),
        (Ql = au()),
        (Wl = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (Po++, t.then(od, od), t);
  }
  function od() {
    if (--Po === 0 && Yi !== null) {
      Wl !== null && (Wl.status = 'fulfilled');
      var e = Yi;
      ((Yi = null), (Ql = 0), (Wl = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function qp(e, t) {
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
  var rd = O.S;
  O.S = function (e, t) {
    ((Xm = Be()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Up(e, t),
      rd !== null && rd(e, t));
  };
  var rl = x(null);
  function er() {
    var e = rl.current;
    return e !== null ? e : Ge.pooledCache;
  }
  function ls(e, t) {
    t === null ? K(rl, rl.current) : K(rl, t.pool);
  }
  function ud() {
    var e = er();
    return e === null ? null : { parent: rt._currentValue, pool: e };
  }
  var Jl = Error(o(460)),
    tr = Error(o(474)),
    is = Error(o(542)),
    cs = { then: function () {} };
  function fd(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function dd(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(Ga, Ga), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), hd(e), e);
      default:
        if (typeof t.status == 'string') t.then(Ga, Ga);
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
            throw ((e = t.reason), hd(e), e);
        }
        throw ((fl = t), Jl);
    }
  }
  function ul(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((fl = a), Jl) : a;
    }
  }
  var fl = null;
  function md() {
    if (fl === null) throw Error(o(459));
    var e = fl;
    return ((fl = null), e);
  }
  function hd(e) {
    if (e === Jl || e === is) throw Error(o(483));
  }
  var Fl = null,
    Zi = 0;
  function ss(e) {
    var t = Zi;
    return ((Zi += 1), Fl === null && (Fl = []), dd(Fl, e, t));
  }
  function Xi(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function os(e, t) {
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
  function pd(e) {
    function t(M, j) {
      if (e) {
        var w = M.deletions;
        w === null ? ((M.deletions = [j]), (M.flags |= 16)) : w.push(j);
      }
    }
    function a(M, j) {
      if (!e) return null;
      for (; j !== null; ) (t(M, j), (j = j.sibling));
      return null;
    }
    function n(M) {
      for (var j = new Map(); M !== null; )
        (M.key !== null ? j.set(M.key, M) : j.set(M.index, M), (M = M.sibling));
      return j;
    }
    function c(M, j) {
      return ((M = Za(M, j)), (M.index = 0), (M.sibling = null), M);
    }
    function r(M, j, w) {
      return (
        (M.index = w),
        e
          ? ((w = M.alternate),
            w !== null
              ? ((w = w.index), w < j ? ((M.flags |= 67108866), j) : w)
              : ((M.flags |= 67108866), j))
          : ((M.flags |= 1048576), j)
      );
    }
    function h(M) {
      return (e && M.alternate === null && (M.flags |= 67108866), M);
    }
    function v(M, j, w, $) {
      return j === null || j.tag !== 6
        ? ((j = Go(w, M.mode, $)), (j.return = M), j)
        : ((j = c(j, w)), (j.return = M), j);
    }
    function S(M, j, w, $) {
      var ae = w.type;
      return ae === D
        ? B(M, j, w.props.children, $, w.key)
        : j !== null &&
            (j.elementType === ae ||
              (typeof ae == 'object' && ae !== null && ae.$$typeof === Re && ul(ae) === j.type))
          ? ((j = c(j, w.props)), Xi(j, w), (j.return = M), j)
          : ((j = es(w.type, w.key, w.props, null, M.mode, $)), Xi(j, w), (j.return = M), j);
    }
    function N(M, j, w, $) {
      return j === null ||
        j.tag !== 4 ||
        j.stateNode.containerInfo !== w.containerInfo ||
        j.stateNode.implementation !== w.implementation
        ? ((j = Yo(w, M.mode, $)), (j.return = M), j)
        : ((j = c(j, w.children || [])), (j.return = M), j);
    }
    function B(M, j, w, $, ae) {
      return j === null || j.tag !== 7
        ? ((j = il(w, M.mode, $, ae)), (j.return = M), j)
        : ((j = c(j, w)), (j.return = M), j);
    }
    function k(M, j, w) {
      if ((typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint')
        return ((j = Go('' + j, M.mode, w)), (j.return = M), j);
      if (typeof j == 'object' && j !== null) {
        switch (j.$$typeof) {
          case E:
            return ((w = es(j.type, j.key, j.props, null, M.mode, w)), Xi(w, j), (w.return = M), w);
          case T:
            return ((j = Yo(j, M.mode, w)), (j.return = M), j);
          case Re:
            return ((j = ul(j)), k(M, j, w));
        }
        if (ht(j) || Ie(j)) return ((j = il(j, M.mode, w, null)), (j.return = M), j);
        if (typeof j.then == 'function') return k(M, ss(j), w);
        if (j.$$typeof === se) return k(M, ns(M, j), w);
        os(M, j);
      }
      return null;
    }
    function z(M, j, w, $) {
      var ae = j !== null ? j.key : null;
      if ((typeof w == 'string' && w !== '') || typeof w == 'number' || typeof w == 'bigint')
        return ae !== null ? null : v(M, j, '' + w, $);
      if (typeof w == 'object' && w !== null) {
        switch (w.$$typeof) {
          case E:
            return w.key === ae ? S(M, j, w, $) : null;
          case T:
            return w.key === ae ? N(M, j, w, $) : null;
          case Re:
            return ((w = ul(w)), z(M, j, w, $));
        }
        if (ht(w) || Ie(w)) return ae !== null ? null : B(M, j, w, $, null);
        if (typeof w.then == 'function') return z(M, j, ss(w), $);
        if (w.$$typeof === se) return z(M, j, ns(M, w), $);
        os(M, w);
      }
      return null;
    }
    function C(M, j, w, $, ae) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((M = M.get(w) || null), v(j, M, '' + $, ae));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case E:
            return ((M = M.get($.key === null ? w : $.key) || null), S(j, M, $, ae));
          case T:
            return ((M = M.get($.key === null ? w : $.key) || null), N(j, M, $, ae));
          case Re:
            return (($ = ul($)), C(M, j, w, $, ae));
        }
        if (ht($) || Ie($)) return ((M = M.get(w) || null), B(j, M, $, ae, null));
        if (typeof $.then == 'function') return C(M, j, w, ss($), ae);
        if ($.$$typeof === se) return C(M, j, w, ns(j, $), ae);
        os(j, $);
      }
      return null;
    }
    function I(M, j, w, $) {
      for (
        var ae = null, Ne = null, ee = j, me = (j = 0), Se = null;
        ee !== null && me < w.length;
        me++
      ) {
        ee.index > me ? ((Se = ee), (ee = null)) : (Se = ee.sibling);
        var ze = z(M, ee, w[me], $);
        if (ze === null) {
          ee === null && (ee = Se);
          break;
        }
        (e && ee && ze.alternate === null && t(M, ee),
          (j = r(ze, j, me)),
          Ne === null ? (ae = ze) : (Ne.sibling = ze),
          (Ne = ze),
          (ee = Se));
      }
      if (me === w.length) return (a(M, ee), je && Xa(M, me), ae);
      if (ee === null) {
        for (; me < w.length; me++)
          ((ee = k(M, w[me], $)),
            ee !== null &&
              ((j = r(ee, j, me)), Ne === null ? (ae = ee) : (Ne.sibling = ee), (Ne = ee)));
        return (je && Xa(M, me), ae);
      }
      for (ee = n(ee); me < w.length; me++)
        ((Se = C(ee, M, me, w[me], $)),
          Se !== null &&
            (e && Se.alternate !== null && ee.delete(Se.key === null ? me : Se.key),
            (j = r(Se, j, me)),
            Ne === null ? (ae = Se) : (Ne.sibling = Se),
            (Ne = Se)));
      return (
        e &&
          ee.forEach(function (Ln) {
            return t(M, Ln);
          }),
        je && Xa(M, me),
        ae
      );
    }
    function ce(M, j, w, $) {
      if (w == null) throw Error(o(151));
      for (
        var ae = null, Ne = null, ee = j, me = (j = 0), Se = null, ze = w.next();
        ee !== null && !ze.done;
        me++, ze = w.next()
      ) {
        ee.index > me ? ((Se = ee), (ee = null)) : (Se = ee.sibling);
        var Ln = z(M, ee, ze.value, $);
        if (Ln === null) {
          ee === null && (ee = Se);
          break;
        }
        (e && ee && Ln.alternate === null && t(M, ee),
          (j = r(Ln, j, me)),
          Ne === null ? (ae = Ln) : (Ne.sibling = Ln),
          (Ne = Ln),
          (ee = Se));
      }
      if (ze.done) return (a(M, ee), je && Xa(M, me), ae);
      if (ee === null) {
        for (; !ze.done; me++, ze = w.next())
          ((ze = k(M, ze.value, $)),
            ze !== null &&
              ((j = r(ze, j, me)), Ne === null ? (ae = ze) : (Ne.sibling = ze), (Ne = ze)));
        return (je && Xa(M, me), ae);
      }
      for (ee = n(ee); !ze.done; me++, ze = w.next())
        ((ze = C(ee, M, me, ze.value, $)),
          ze !== null &&
            (e && ze.alternate !== null && ee.delete(ze.key === null ? me : ze.key),
            (j = r(ze, j, me)),
            Ne === null ? (ae = ze) : (Ne.sibling = ze),
            (Ne = ze)));
      return (
        e &&
          ee.forEach(function (Iy) {
            return t(M, Iy);
          }),
        je && Xa(M, me),
        ae
      );
    }
    function qe(M, j, w, $) {
      if (
        (typeof w == 'object' &&
          w !== null &&
          w.type === D &&
          w.key === null &&
          (w = w.props.children),
        typeof w == 'object' && w !== null)
      ) {
        switch (w.$$typeof) {
          case E:
            e: {
              for (var ae = w.key; j !== null; ) {
                if (j.key === ae) {
                  if (((ae = w.type), ae === D)) {
                    if (j.tag === 7) {
                      (a(M, j.sibling), ($ = c(j, w.props.children)), ($.return = M), (M = $));
                      break e;
                    }
                  } else if (
                    j.elementType === ae ||
                    (typeof ae == 'object' &&
                      ae !== null &&
                      ae.$$typeof === Re &&
                      ul(ae) === j.type)
                  ) {
                    (a(M, j.sibling), ($ = c(j, w.props)), Xi($, w), ($.return = M), (M = $));
                    break e;
                  }
                  a(M, j);
                  break;
                } else t(M, j);
                j = j.sibling;
              }
              w.type === D
                ? (($ = il(w.props.children, M.mode, $, w.key)), ($.return = M), (M = $))
                : (($ = es(w.type, w.key, w.props, null, M.mode, $)),
                  Xi($, w),
                  ($.return = M),
                  (M = $));
            }
            return h(M);
          case T:
            e: {
              for (ae = w.key; j !== null; ) {
                if (j.key === ae)
                  if (
                    j.tag === 4 &&
                    j.stateNode.containerInfo === w.containerInfo &&
                    j.stateNode.implementation === w.implementation
                  ) {
                    (a(M, j.sibling), ($ = c(j, w.children || [])), ($.return = M), (M = $));
                    break e;
                  } else {
                    a(M, j);
                    break;
                  }
                else t(M, j);
                j = j.sibling;
              }
              (($ = Yo(w, M.mode, $)), ($.return = M), (M = $));
            }
            return h(M);
          case Re:
            return ((w = ul(w)), qe(M, j, w, $));
        }
        if (ht(w)) return I(M, j, w, $);
        if (Ie(w)) {
          if (((ae = Ie(w)), typeof ae != 'function')) throw Error(o(150));
          return ((w = ae.call(w)), ce(M, j, w, $));
        }
        if (typeof w.then == 'function') return qe(M, j, ss(w), $);
        if (w.$$typeof === se) return qe(M, j, ns(M, w), $);
        os(M, w);
      }
      return (typeof w == 'string' && w !== '') || typeof w == 'number' || typeof w == 'bigint'
        ? ((w = '' + w),
          j !== null && j.tag === 6
            ? (a(M, j.sibling), ($ = c(j, w)), ($.return = M), (M = $))
            : (a(M, j), ($ = Go(w, M.mode, $)), ($.return = M), (M = $)),
          h(M))
        : a(M, j);
    }
    return function (M, j, w, $) {
      try {
        Zi = 0;
        var ae = qe(M, j, w, $);
        return ((Fl = null), ae);
      } catch (ee) {
        if (ee === Jl || ee === is) throw ee;
        var Ne = Qt(29, ee, null, M.mode);
        return ((Ne.lanes = $), (Ne.return = M), Ne);
      } finally {
      }
    };
  }
  var dl = pd(!0),
    yd = pd(!1),
    _n = !1;
  function ar(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function nr(e, t) {
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
      var c = n.pending;
      return (
        c === null ? (t.next = t) : ((t.next = c.next), (c.next = t)),
        (n.pending = t),
        (t = Pc(e)),
        Pf(e, null, a),
        t
      );
    }
    return (Ic(e, n, t, a), Pc(e));
  }
  function Ki(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), we(e, a));
    }
  }
  function lr(e, t) {
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
  var ir = !1;
  function Qi() {
    if (ir) {
      var e = Wl;
      if (e !== null) throw e;
    }
  }
  function Wi(e, t, a, n) {
    ir = !1;
    var c = e.updateQueue;
    _n = !1;
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
      var k = c.baseState;
      ((h = 0), (B = N = S = null), (v = r));
      do {
        var z = v.lane & -536870913,
          C = z !== v.lane;
        if (C ? (be & z) === z : (n & z) === z) {
          (z !== 0 && z === Ql && (ir = !0),
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
              (C = c.callbacks),
              C === null ? (c.callbacks = [z]) : C.push(z)));
        } else
          ((C = { lane: z, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            B === null ? ((N = B = C), (S = k)) : (B = B.next = C),
            (h |= z));
        if (((v = v.next), v === null)) {
          if (((v = c.shared.pending), v === null)) break;
          ((C = v),
            (v = C.next),
            (C.next = null),
            (c.lastBaseUpdate = C),
            (c.shared.pending = null));
        }
      } while (!0);
      (B === null && (S = k),
        (c.baseState = S),
        (c.firstBaseUpdate = N),
        (c.lastBaseUpdate = B),
        r === null && (c.shared.lanes = 0),
        (Mn |= h),
        (e.lanes = h),
        (e.memoizedState = k));
    }
  }
  function gd(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function vd(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) gd(a[e], t);
  }
  var Il = x(null),
    rs = x(0);
  function _d(e, t) {
    ((e = nn), K(rs, e), K(Il, t), (nn = e | t.baseLanes));
  }
  function cr() {
    (K(rs, nn), K(Il, Il.current));
  }
  function sr() {
    ((nn = rs.current), H(Il), H(rs));
  }
  var Wt = x(null),
    fa = null;
  function xn(e) {
    var t = e.alternate;
    (K(ct, ct.current & 1),
      K(Wt, e),
      fa === null && (t === null || Il.current !== null || t.memoizedState !== null) && (fa = e));
  }
  function or(e) {
    (K(ct, ct.current), K(Wt, e), fa === null && (fa = e));
  }
  function bd(e) {
    e.tag === 22 ? (K(ct, ct.current), K(Wt, e), fa === null && (fa = e)) : jn();
  }
  function jn() {
    (K(ct, ct.current), K(Wt, Wt.current));
  }
  function Jt(e) {
    (H(Wt), fa === e && (fa = null), H(ct));
  }
  var ct = x(0);
  function us(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || hu(a) || pu(a))) return t;
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
    fs = !1,
    Pl = !1,
    ml = !1,
    ds = 0,
    Ji = 0,
    ei = null,
    Vp = 0;
  function lt() {
    throw Error(o(321));
  }
  function rr(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!Kt(e[a], t[a])) return !1;
    return !0;
  }
  function ur(e, t, a, n, c, r) {
    return (
      (Wa = r),
      (ue = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (O.H = e === null || e.memoizedState === null ? nm : Tr),
      (ml = !1),
      (r = a(n, c)),
      (ml = !1),
      Pl && (r = xd(t, a, n, c)),
      Sd(e),
      r
    );
  }
  function Sd(e) {
    O.H = Pi;
    var t = ke !== null && ke.next !== null;
    if (((Wa = 0), (ut = ke = ue = null), (fs = !1), (Ji = 0), (ei = null), t)) throw Error(o(300));
    e === null || ft || ((e = e.dependencies), e !== null && as(e) && (ft = !0));
  }
  function xd(e, t, a, n) {
    ue = e;
    var c = 0;
    do {
      if ((Pl && (ei = null), (Ji = 0), (Pl = !1), 25 <= c)) throw Error(o(301));
      if (((c += 1), (ut = ke = null), e.updateQueue != null)) {
        var r = e.updateQueue;
        ((r.lastEffect = null),
          (r.events = null),
          (r.stores = null),
          r.memoCache != null && (r.memoCache.index = 0));
      }
      ((O.H = lm), (r = t(a, n)));
    } while (Pl);
    return r;
  }
  function Gp() {
    var e = O.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? Fi(t) : t),
      (e = e.useState()[0]),
      (ke !== null ? ke.memoizedState : null) !== e && (ue.flags |= 1024),
      t
    );
  }
  function fr() {
    var e = ds !== 0;
    return ((ds = 0), e);
  }
  function dr(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function mr(e) {
    if (fs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      fs = !1;
    }
    ((Wa = 0), (ut = ke = ue = null), (Pl = !1), (Ji = ds = 0), (ei = null));
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
      if (e === null) throw ue.alternate === null ? Error(o(467)) : Error(o(310));
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
  function ms() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Fi(e) {
    var t = Ji;
    return (
      (Ji += 1),
      ei === null && (ei = []),
      (e = dd(ei, e, t)),
      (t = ue),
      (ut === null ? t.memoizedState : ut.next) === null &&
        ((t = t.alternate), (O.H = t === null || t.memoizedState === null ? nm : Tr)),
      e
    );
  }
  function hs(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return Fi(e);
      if (e.$$typeof === se) return wt(e);
    }
    throw Error(o(438, String(e)));
  }
  function hr(e) {
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
              data: n.data.map(function (c) {
                return c.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = ms()), (ue.updateQueue = a)),
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
  function ps(e) {
    var t = st();
    return pr(t, ke, e);
  }
  function pr(e, t, a) {
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
        var k = N.lane & -536870913;
        if (k !== N.lane ? (be & k) === k : (Wa & k) === k) {
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
              k === Ql && (B = !0));
          else if ((Wa & z) === z) {
            ((N = N.next), z === Ql && (B = !0));
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
              S === null ? ((v = S = k), (h = r)) : (S = S.next = k),
              (ue.lanes |= z),
              (Mn |= z));
          ((k = N.action), ml && a(r, k), (r = N.hasEagerState ? N.eagerState : a(r, k)));
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
            S === null ? ((v = S = z), (h = r)) : (S = S.next = z),
            (ue.lanes |= k),
            (Mn |= k));
        N = N.next;
      } while (N !== null && N !== t);
      if (
        (S === null ? (h = r) : (S.next = v),
        !Kt(r, e.memoizedState) && ((ft = !0), B && ((a = Wl), a !== null)))
      )
        throw a;
      ((e.memoizedState = r), (e.baseState = h), (e.baseQueue = S), (n.lastRenderedState = r));
    }
    return (c === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function yr(e) {
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
      (Kt(r, t.memoizedState) || (ft = !0),
        (t.memoizedState = r),
        t.baseQueue === null && (t.baseState = r),
        (a.lastRenderedState = r));
    }
    return [r, n];
  }
  function jd(e, t, a) {
    var n = ue,
      c = st(),
      r = je;
    if (r) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var h = !Kt((ke || c).memoizedState, a);
    if (
      (h && ((c.memoizedState = a), (ft = !0)),
      (c = c.queue),
      _r(Md.bind(null, n, c, e), [e]),
      c.getSnapshot !== t || h || (ut !== null && ut.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ti(9, { destroy: void 0 }, Td.bind(null, n, c, a, t), null),
        Ge === null)
      )
        throw Error(o(349));
      r || (Wa & 127) !== 0 || Ad(n, t, a);
    }
    return a;
  }
  function Ad(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = ue.updateQueue),
      t === null
        ? ((t = ms()), (ue.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function Td(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), Ed(t) && wd(e));
  }
  function Md(e, t, a) {
    return a(function () {
      Ed(t) && wd(e);
    });
  }
  function Ed(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Kt(e, a);
    } catch {
      return !0;
    }
  }
  function wd(e) {
    var t = ll(e, 2);
    t !== null && Xt(t, e, 2);
  }
  function gr(e) {
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
  function Nd(e, t, a, n) {
    return ((e.baseState = a), pr(e, ke, typeof n == 'function' ? n : Ja));
  }
  function Yp(e, t, a, n, c) {
    if (vs(e)) throw Error(o(485));
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
      (O.T !== null ? a(!0) : (r.isTransition = !1),
        n(r),
        (a = t.pending),
        a === null
          ? ((r.next = t.pending = r), zd(t, r))
          : ((r.next = a.next), (t.pending = a.next = r)));
    }
  }
  function zd(e, t) {
    var a = t.action,
      n = t.payload,
      c = e.state;
    if (t.isTransition) {
      var r = O.T,
        h = {};
      O.T = h;
      try {
        var v = a(c, n),
          S = O.S;
        (S !== null && S(h, v), Cd(e, t, v));
      } catch (N) {
        vr(e, t, N);
      } finally {
        (r !== null && h.types !== null && (r.types = h.types), (O.T = r));
      }
    } else
      try {
        ((r = a(c, n)), Cd(e, t, r));
      } catch (N) {
        vr(e, t, N);
      }
  }
  function Cd(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            Rd(e, t, n);
          },
          function (n) {
            return vr(e, t, n);
          }
        )
      : Rd(e, t, a);
  }
  function Rd(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      Od(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), zd(e, a))));
  }
  function vr(e, t, a) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = a), Od(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function Od(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Dd(e, t) {
    return t;
  }
  function Bd(e, t) {
    if (je) {
      var a = Ge.formState;
      if (a !== null) {
        e: {
          var n = ue;
          if (je) {
            if (Je) {
              t: {
                for (var c = Je, r = ua; c.nodeType !== 8; ) {
                  if (!r) {
                    c = null;
                    break t;
                  }
                  if (((c = da(c.nextSibling)), c === null)) {
                    c = null;
                    break t;
                  }
                }
                ((r = c.data), (c = r === 'F!' || r === 'F' ? c : null));
              }
              if (c) {
                ((Je = da(c.nextSibling)), (n = c.data === 'F!'));
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
        lastRenderedReducer: Dd,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = em.bind(null, ue, n)),
      (n.dispatch = a),
      (n = gr(!1)),
      (r = Ar.bind(null, ue, !1, n.queue)),
      (n = Ht()),
      (c = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = c),
      (a = Yp.bind(null, ue, c, r, a)),
      (c.dispatch = a),
      (n.memoizedState = e),
      [t, a, !1]
    );
  }
  function Ld(e) {
    var t = st();
    return $d(t, ke, e);
  }
  function $d(e, t, a) {
    if (
      ((t = pr(e, t, Dd)[0]),
      (e = ps(Ja)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = Fi(t);
      } catch (h) {
        throw h === Jl ? is : h;
      }
    else n = t;
    t = st();
    var c = t.queue,
      r = c.dispatch;
    return (
      a !== t.memoizedState &&
        ((ue.flags |= 2048), ti(9, { destroy: void 0 }, Zp.bind(null, c, a), null)),
      [n, r, e]
    );
  }
  function Zp(e, t) {
    e.action = t;
  }
  function Hd(e) {
    var t = st(),
      a = ke;
    if (a !== null) return $d(t, a, e);
    (st(), (t = t.memoizedState), (a = st()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = e), [t, n, !1]);
  }
  function ti(e, t, a, n) {
    return (
      (e = { tag: e, create: a, deps: n, inst: t, next: null }),
      (t = ue.updateQueue),
      t === null && ((t = ms()), (ue.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((n = a.next), (a.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function kd() {
    return st().memoizedState;
  }
  function ys(e, t, a, n) {
    var c = Ht();
    ((ue.flags |= e),
      (c.memoizedState = ti(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function gs(e, t, a, n) {
    var c = st();
    n = n === void 0 ? null : n;
    var r = c.memoizedState.inst;
    ke !== null && n !== null && rr(n, ke.memoizedState.deps)
      ? (c.memoizedState = ti(t, r, a, n))
      : ((ue.flags |= e), (c.memoizedState = ti(1 | t, r, a, n)));
  }
  function Ud(e, t) {
    ys(8390656, 8, e, t);
  }
  function _r(e, t) {
    gs(2048, 8, e, t);
  }
  function Xp(e) {
    ue.flags |= 4;
    var t = ue.updateQueue;
    if (t === null) ((t = ms()), (ue.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function qd(e) {
    var t = st().memoizedState;
    return (
      Xp({ ref: t, nextImpl: e }),
      function () {
        if ((Ce & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Vd(e, t) {
    return gs(4, 2, e, t);
  }
  function Gd(e, t) {
    return gs(4, 4, e, t);
  }
  function Yd(e, t) {
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
  function Zd(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), gs(4, 4, Yd.bind(null, t, e), a));
  }
  function br() {}
  function Xd(e, t) {
    var a = st();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    return t !== null && rr(t, n[1]) ? n[0] : ((a.memoizedState = [e, t]), e);
  }
  function Kd(e, t) {
    var a = st();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    if (t !== null && rr(t, n[1])) return n[0];
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
  function Sr(e, t, a) {
    return a === void 0 || ((Wa & 1073741824) !== 0 && (be & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = Qm()), (ue.lanes |= e), (Mn |= e), a);
  }
  function Qd(e, t, a, n) {
    return Kt(a, t)
      ? a
      : Il.current !== null
        ? ((e = Sr(e, a, n)), Kt(e, t) || (ft = !0), e)
        : (Wa & 42) === 0 || ((Wa & 1073741824) !== 0 && (be & 261930) === 0)
          ? ((ft = !0), (e.memoizedState = a))
          : ((e = Qm()), (ue.lanes |= e), (Mn |= e), t);
  }
  function Wd(e, t, a, n, c) {
    var r = X.p;
    X.p = r !== 0 && 8 > r ? r : 8;
    var h = O.T,
      v = {};
    ((O.T = v), Ar(e, !1, t, a));
    try {
      var S = c(),
        N = O.S;
      if (
        (N !== null && N(v, S), S !== null && typeof S == 'object' && typeof S.then == 'function')
      ) {
        var B = qp(S, n);
        Ii(e, t, B, Pt(e));
      } else Ii(e, t, n, Pt(e));
    } catch (k) {
      Ii(e, t, { then: function () {}, status: 'rejected', reason: k }, Pt());
    } finally {
      ((X.p = r), h !== null && v.types !== null && (h.types = v.types), (O.T = h));
    }
  }
  function Kp() {}
  function xr(e, t, a, n) {
    if (e.tag !== 5) throw Error(o(476));
    var c = Jd(e).queue;
    Wd(
      e,
      c,
      t,
      le,
      a === null
        ? Kp
        : function () {
            return (Fd(e), a(n));
          }
    );
  }
  function Jd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: le,
      baseState: le,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ja,
        lastRenderedState: le,
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
  function Fd(e) {
    var t = Jd(e);
    (t.next === null && (t = e.alternate.memoizedState), Ii(e, t.next.queue, {}, Pt()));
  }
  function jr() {
    return wt(pc);
  }
  function Id() {
    return st().memoizedState;
  }
  function Pd() {
    return st().memoizedState;
  }
  function Qp(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Pt();
          e = bn(a);
          var n = Sn(t, e, a);
          (n !== null && (Xt(n, t, a), Ki(n, t, a)), (t = { cache: Io() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Wp(e, t, a) {
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
      vs(e) ? tm(t, a) : ((a = qo(e, t, a, n)), a !== null && (Xt(a, e, n), am(a, t, n))));
  }
  function em(e, t, a) {
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
    if (vs(e)) tm(t, c);
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
            return (Ic(e, t, c, 0), Ge === null && Fc(), !1);
        } catch {
        } finally {
        }
      if (((a = qo(e, t, c, n)), a !== null)) return (Xt(a, e, n), am(a, t, n), !0);
    }
    return !1;
  }
  function Ar(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: au(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      vs(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = qo(e, a, n, 2)), t !== null && Xt(t, e, 2));
  }
  function vs(e) {
    var t = e.alternate;
    return e === ue || (t !== null && t === ue);
  }
  function tm(e, t) {
    Pl = fs = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function am(e, t, a) {
    if ((a & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), we(e, a));
    }
  }
  var Pi = {
    readContext: wt,
    use: hs,
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
  Pi.useEffectEvent = lt;
  var nm = {
      readContext: wt,
      use: hs,
      useCallback: function (e, t) {
        return ((Ht().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: wt,
      useEffect: Ud,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), ys(4194308, 4, Yd.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return ys(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        ys(4, 2, e, t);
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
          var c = a(t);
          if (ml) {
            Tt(!0);
            try {
              a(t);
            } finally {
              Tt(!1);
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
          (e = e.dispatch = Wp.bind(null, ue, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Ht();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = gr(e);
        var t = e.queue,
          a = em.bind(null, ue, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: br,
      useDeferredValue: function (e, t) {
        var a = Ht();
        return Sr(a, e, t);
      },
      useTransition: function () {
        var e = gr(!1);
        return ((e = Wd.bind(null, ue, e.queue, !0, !1)), (Ht().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = ue,
          c = Ht();
        if (je) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = t()), Ge === null)) throw Error(o(349));
          (be & 127) !== 0 || Ad(n, t, a);
        }
        c.memoizedState = a;
        var r = { value: a, getSnapshot: t };
        return (
          (c.queue = r),
          Ud(Md.bind(null, n, r, e), [e]),
          (n.flags |= 2048),
          ti(9, { destroy: void 0 }, Td.bind(null, n, r, a, t), null),
          a
        );
      },
      useId: function () {
        var e = Ht(),
          t = Ge.identifierPrefix;
        if (je) {
          var a = Ca,
            n = za;
          ((a = (n & ~(1 << (32 - gt(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = ds++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = Vp++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: jr,
      useFormState: Bd,
      useActionState: Bd,
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
        return ((t.queue = a), (t = Ar.bind(null, ue, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: hr,
      useCacheRefresh: function () {
        return (Ht().memoizedState = Qp.bind(null, ue));
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
    Tr = {
      readContext: wt,
      use: hs,
      useCallback: Xd,
      useContext: wt,
      useEffect: _r,
      useImperativeHandle: Zd,
      useInsertionEffect: Vd,
      useLayoutEffect: Gd,
      useMemo: Kd,
      useReducer: ps,
      useRef: kd,
      useState: function () {
        return ps(Ja);
      },
      useDebugValue: br,
      useDeferredValue: function (e, t) {
        var a = st();
        return Qd(a, ke.memoizedState, e, t);
      },
      useTransition: function () {
        var e = ps(Ja)[0],
          t = st().memoizedState;
        return [typeof e == 'boolean' ? e : Fi(e), t];
      },
      useSyncExternalStore: jd,
      useId: Id,
      useHostTransitionStatus: jr,
      useFormState: Ld,
      useActionState: Ld,
      useOptimistic: function (e, t) {
        var a = st();
        return Nd(a, ke, e, t);
      },
      useMemoCache: hr,
      useCacheRefresh: Pd,
    };
  Tr.useEffectEvent = qd;
  var lm = {
    readContext: wt,
    use: hs,
    useCallback: Xd,
    useContext: wt,
    useEffect: _r,
    useImperativeHandle: Zd,
    useInsertionEffect: Vd,
    useLayoutEffect: Gd,
    useMemo: Kd,
    useReducer: yr,
    useRef: kd,
    useState: function () {
      return yr(Ja);
    },
    useDebugValue: br,
    useDeferredValue: function (e, t) {
      var a = st();
      return ke === null ? Sr(a, e, t) : Qd(a, ke.memoizedState, e, t);
    },
    useTransition: function () {
      var e = yr(Ja)[0],
        t = st().memoizedState;
      return [typeof e == 'boolean' ? e : Fi(e), t];
    },
    useSyncExternalStore: jd,
    useId: Id,
    useHostTransitionStatus: jr,
    useFormState: Hd,
    useActionState: Hd,
    useOptimistic: function (e, t) {
      var a = st();
      return ke !== null ? Nd(a, ke, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: hr,
    useCacheRefresh: Pd,
  };
  lm.useEffectEvent = qd;
  function Mr(e, t, a, n) {
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
        c = bn(n);
      ((c.payload = t),
        a != null && (c.callback = a),
        (t = Sn(e, c, n)),
        t !== null && (Xt(t, e, n), Ki(t, e, n)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var n = Pt(),
        c = bn(n);
      ((c.tag = 1),
        (c.payload = t),
        a != null && (c.callback = a),
        (t = Sn(e, c, n)),
        t !== null && (Xt(t, e, n), Ki(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Pt(),
        n = bn(a);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Sn(e, n, a)),
        t !== null && (Xt(t, e, a), Ki(t, e, a)));
    },
  };
  function im(e, t, a, n, c, r, h) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, r, h)
        : t.prototype && t.prototype.isPureReactComponent
          ? !ki(a, n) || !ki(c, r)
          : !0
    );
  }
  function cm(e, t, a, n) {
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
      for (var c in e) a[c] === void 0 && (a[c] = e[c]);
    }
    return a;
  }
  function sm(e) {
    Jc(e);
  }
  function om(e) {
    console.error(e);
  }
  function rm(e) {
    Jc(e);
  }
  function _s(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function um(e, t, a) {
    try {
      var n = e.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (c) {
      setTimeout(function () {
        throw c;
      });
    }
  }
  function wr(e, t, a) {
    return (
      (a = bn(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        _s(e, t);
      }),
      a
    );
  }
  function fm(e) {
    return ((e = bn(e)), (e.tag = 3), e);
  }
  function dm(e, t, a, n) {
    var c = a.type.getDerivedStateFromError;
    if (typeof c == 'function') {
      var r = n.value;
      ((e.payload = function () {
        return c(r);
      }),
        (e.callback = function () {
          um(t, a, n);
        }));
    }
    var h = a.stateNode;
    h !== null &&
      typeof h.componentDidCatch == 'function' &&
      (e.callback = function () {
        (um(t, a, n),
          typeof c != 'function' && (En === null ? (En = new Set([this])) : En.add(this)));
        var v = n.stack;
        this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' });
      });
  }
  function Jp(e, t, a, n, c) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && Kl(t, a, c, !0), (a = Wt.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              fa === null ? Cs() : a.alternate === null && it === 0 && (it = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = c),
              n === cs
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  Pr(e, n, c)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === cs
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  Pr(e, n, c)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (Pr(e, n, c), Cs(), !1);
    }
    if (je)
      return (
        (t = Wt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = c),
            n !== Ko && ((e = Error(o(422), { cause: n })), Vi(sa(e, a))))
          : (n !== Ko && ((t = Error(o(423), { cause: n })), Vi(sa(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (c &= -c),
            (e.lanes |= c),
            (n = sa(n, a)),
            (c = wr(e.stateNode, n, c)),
            lr(e, c),
            it !== 4 && (it = 2)),
        !1
      );
    var r = Error(o(520), { cause: n });
    if (((r = sa(r, a)), sc === null ? (sc = [r]) : sc.push(r), it !== 4 && (it = 2), t === null))
      return !0;
    ((n = sa(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = c & -c),
            (a.lanes |= e),
            (e = wr(a.stateNode, n, e)),
            lr(a, e),
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
                  (En === null || !En.has(r)))))
          )
            return (
              (a.flags |= 65536),
              (c &= -c),
              (a.lanes |= c),
              (c = fm(c)),
              dm(c, e, a, n),
              lr(a, c),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Nr = Error(o(461)),
    ft = !1;
  function Nt(e, t, a, n) {
    t.child = e === null ? yd(t, null, a, n) : dl(t, e.child, a, n);
  }
  function mm(e, t, a, n, c) {
    a = a.render;
    var r = t.ref;
    if ('ref' in n) {
      var h = {};
      for (var v in n) v !== 'ref' && (h[v] = n[v]);
    } else h = n;
    return (
      ol(t),
      (n = ur(e, t, a, h, r, c)),
      (v = fr()),
      e !== null && !ft
        ? (dr(e, t, c), Fa(e, t, c))
        : (je && v && Zo(t), (t.flags |= 1), Nt(e, t, n, c), t.child)
    );
  }
  function hm(e, t, a, n, c) {
    if (e === null) {
      var r = a.type;
      return typeof r == 'function' && !Vo(r) && r.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = r), pm(e, t, r, n, c))
        : ((e = es(a.type, null, n, t, t.mode, c)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((r = e.child), !$r(e, c))) {
      var h = r.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : ki), a(h, n) && e.ref === t.ref))
        return Fa(e, t, c);
    }
    return ((t.flags |= 1), (e = Za(r, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function pm(e, t, a, n, c) {
    if (e !== null) {
      var r = e.memoizedProps;
      if (ki(r, n) && e.ref === t.ref)
        if (((ft = !1), (t.pendingProps = n = r), $r(e, c))) (e.flags & 131072) !== 0 && (ft = !0);
        else return ((t.lanes = e.lanes), Fa(e, t, c));
    }
    return zr(e, t, a, n, c);
  }
  function ym(e, t, a, n) {
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
        return gm(e, t, r, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && ls(t, r !== null ? r.cachePool : null),
          r !== null ? _d(t, r) : cr(),
          bd(t));
      else return ((n = t.lanes = 536870912), gm(e, t, r !== null ? r.baseLanes | a : a, a, n));
    } else
      r !== null
        ? (ls(t, r.cachePool), _d(t, r), jn(), (t.memoizedState = null))
        : (e !== null && ls(t, null), cr(), jn());
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
  function gm(e, t, a, n, c) {
    var r = er();
    return (
      (r = r === null ? null : { parent: rt._currentValue, pool: r }),
      (t.memoizedState = { baseLanes: a, cachePool: r }),
      e !== null && ls(t, null),
      cr(),
      bd(t),
      e !== null && Kl(e, t, n, !0),
      (t.childLanes = c),
      null
    );
  }
  function bs(e, t) {
    return (
      (t = xs({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function vm(e, t, a) {
    return (
      dl(t, e.child, null, a),
      (e = bs(t, t.pendingProps)),
      (e.flags |= 2),
      Jt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Fp(e, t, a) {
    var n = t.pendingProps,
      c = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (je) {
        if (n.mode === 'hidden') return ((e = bs(t, n)), (t.lanes = 536870912), ec(null, e));
        if (
          (or(t),
          (e = Je)
            ? ((e = z0(e, ua)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: pn !== null ? { id: za, overflow: Ca } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = td(e)),
                (a.return = t),
                (t.child = a),
                (Et = t),
                (Je = null)))
            : (e = null),
          e === null)
        )
          throw gn(t);
        return ((t.lanes = 536870912), null);
      }
      return bs(t, n);
    }
    var r = e.memoizedState;
    if (r !== null) {
      var h = r.dehydrated;
      if ((or(t), c))
        if (t.flags & 256) ((t.flags &= -257), (t = vm(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if ((ft || Kl(e, t, a, !1), (c = (a & e.childLanes) !== 0), ft || c)) {
        if (((n = Ge), n !== null && ((h = We(n, a)), h !== 0 && h !== r.retryLane)))
          throw ((r.retryLane = h), ll(e, h), Xt(n, e, h), Nr);
        (Cs(), (t = vm(e, t, a)));
      } else
        ((e = r.treeContext),
          (Je = da(h.nextSibling)),
          (Et = t),
          (je = !0),
          (yn = null),
          (ua = !1),
          e !== null && ld(t, e),
          (t = bs(t, n)),
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
  function Ss(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function zr(e, t, a, n, c) {
    return (
      ol(t),
      (a = ur(e, t, a, n, void 0, c)),
      (n = fr()),
      e !== null && !ft
        ? (dr(e, t, c), Fa(e, t, c))
        : (je && n && Zo(t), (t.flags |= 1), Nt(e, t, a, c), t.child)
    );
  }
  function _m(e, t, a, n, c, r) {
    return (
      ol(t),
      (t.updateQueue = null),
      (a = xd(t, n, a, c)),
      Sd(e),
      (n = fr()),
      e !== null && !ft
        ? (dr(e, t, r), Fa(e, t, r))
        : (je && n && Zo(t), (t.flags |= 1), Nt(e, t, a, r), t.child)
    );
  }
  function bm(e, t, a, n, c) {
    if ((ol(t), t.stateNode === null)) {
      var r = Gl,
        h = a.contextType;
      (typeof h == 'object' && h !== null && (r = wt(h)),
        (r = new a(n, r)),
        (t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null),
        (r.updater = Er),
        (t.stateNode = r),
        (r._reactInternals = t),
        (r = t.stateNode),
        (r.props = n),
        (r.state = t.memoizedState),
        (r.refs = {}),
        ar(t),
        (h = a.contextType),
        (r.context = typeof h == 'object' && h !== null ? wt(h) : Gl),
        (r.state = t.memoizedState),
        (h = a.getDerivedStateFromProps),
        typeof h == 'function' && (Mr(t, a, h, n), (r.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof r.getSnapshotBeforeUpdate == 'function' ||
          (typeof r.UNSAFE_componentWillMount != 'function' &&
            typeof r.componentWillMount != 'function') ||
          ((h = r.state),
          typeof r.componentWillMount == 'function' && r.componentWillMount(),
          typeof r.UNSAFE_componentWillMount == 'function' && r.UNSAFE_componentWillMount(),
          h !== r.state && Er.enqueueReplaceState(r, r.state, null),
          Wi(t, n, r, c),
          Qi(),
          (r.state = t.memoizedState)),
        typeof r.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      r = t.stateNode;
      var v = t.memoizedProps,
        S = hl(a, v);
      r.props = S;
      var N = r.context,
        B = a.contextType;
      ((h = Gl), typeof B == 'object' && B !== null && (h = wt(B)));
      var k = a.getDerivedStateFromProps;
      ((B = typeof k == 'function' || typeof r.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        B ||
          (typeof r.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof r.componentWillReceiveProps != 'function') ||
          ((v || N !== h) && cm(t, r, n, h)),
        (_n = !1));
      var z = t.memoizedState;
      ((r.state = z),
        Wi(t, n, r, c),
        Qi(),
        (N = t.memoizedState),
        v || z !== N || _n
          ? (typeof k == 'function' && (Mr(t, a, k, n), (N = t.memoizedState)),
            (S = _n || im(t, a, S, n, z, N, h))
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
        nr(e, t),
        (h = t.memoizedProps),
        (B = hl(a, h)),
        (r.props = B),
        (k = t.pendingProps),
        (z = r.context),
        (N = a.contextType),
        (S = Gl),
        typeof N == 'object' && N !== null && (S = wt(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof r.getSnapshotBeforeUpdate == 'function') ||
          (typeof r.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof r.componentWillReceiveProps != 'function') ||
          ((h !== k || z !== S) && cm(t, r, n, S)),
        (_n = !1),
        (z = t.memoizedState),
        (r.state = z),
        Wi(t, n, r, c),
        Qi());
      var C = t.memoizedState;
      h !== k || z !== C || _n || (e !== null && e.dependencies !== null && as(e.dependencies))
        ? (typeof v == 'function' && (Mr(t, a, v, n), (C = t.memoizedState)),
          (B =
            _n ||
            im(t, a, B, n, z, C, S) ||
            (e !== null && e.dependencies !== null && as(e.dependencies)))
            ? (N ||
                (typeof r.UNSAFE_componentWillUpdate != 'function' &&
                  typeof r.componentWillUpdate != 'function') ||
                (typeof r.componentWillUpdate == 'function' && r.componentWillUpdate(n, C, S),
                typeof r.UNSAFE_componentWillUpdate == 'function' &&
                  r.UNSAFE_componentWillUpdate(n, C, S)),
              typeof r.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof r.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof r.componentDidUpdate != 'function' ||
                (h === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 4),
              typeof r.getSnapshotBeforeUpdate != 'function' ||
                (h === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = C)),
          (r.props = n),
          (r.state = C),
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
      Ss(e, t),
      (n = (t.flags & 128) !== 0),
      r || n
        ? ((r = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : r.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = dl(t, e.child, null, c)), (t.child = dl(t, null, a, c)))
            : Nt(e, t, a, c),
          (t.memoizedState = r.state),
          (e = t.child))
        : (e = Fa(e, t, c)),
      e
    );
  }
  function Sm(e, t, a, n) {
    return (cl(), (t.flags |= 256), Nt(e, t, a, n), t.child);
  }
  var Cr = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Rr(e) {
    return { baseLanes: e, cachePool: ud() };
  }
  function Or(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= It), e);
  }
  function xm(e, t, a) {
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
      if (je) {
        if (
          (c ? xn(t) : jn(),
          (e = Je)
            ? ((e = z0(e, ua)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: pn !== null ? { id: za, overflow: Ca } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = td(e)),
                (a.return = t),
                (t.child = a),
                (Et = t),
                (Je = null)))
            : (e = null),
          e === null)
        )
          throw gn(t);
        return (pu(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = n.children;
      return (
        (n = n.fallback),
        c
          ? (jn(),
            (c = t.mode),
            (v = xs({ mode: 'hidden', children: v }, c)),
            (n = il(n, c, a, null)),
            (v.return = t),
            (n.return = t),
            (v.sibling = n),
            (t.child = v),
            (n = t.child),
            (n.memoizedState = Rr(a)),
            (n.childLanes = Or(e, h, a)),
            (t.memoizedState = Cr),
            ec(null, n))
          : (xn(t), Dr(t, v))
      );
    }
    var S = e.memoizedState;
    if (S !== null && ((v = S.dehydrated), v !== null)) {
      if (r)
        t.flags & 256
          ? (xn(t), (t.flags &= -257), (t = Br(e, t, a)))
          : t.memoizedState !== null
            ? (jn(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (jn(),
              (v = n.fallback),
              (c = t.mode),
              (n = xs({ mode: 'visible', children: n.children }, c)),
              (v = il(v, c, a, null)),
              (v.flags |= 2),
              (n.return = t),
              (v.return = t),
              (n.sibling = v),
              (t.child = n),
              dl(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = Rr(a)),
              (n.childLanes = Or(e, h, a)),
              (t.memoizedState = Cr),
              (t = ec(null, n)));
      else if ((xn(t), pu(v))) {
        if (((h = v.nextSibling && v.nextSibling.dataset), h)) var N = h.dgst;
        ((h = N),
          (n = Error(o(419))),
          (n.stack = ''),
          (n.digest = h),
          Vi({ value: n, source: null, stack: null }),
          (t = Br(e, t, a)));
      } else if ((ft || Kl(e, t, a, !1), (h = (a & e.childLanes) !== 0), ft || h)) {
        if (((h = Ge), h !== null && ((n = We(h, a)), n !== 0 && n !== S.retryLane)))
          throw ((S.retryLane = n), ll(e, n), Xt(h, e, n), Nr);
        (hu(v) || Cs(), (t = Br(e, t, a)));
      } else
        hu(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = S.treeContext),
            (Je = da(v.nextSibling)),
            (Et = t),
            (je = !0),
            (yn = null),
            (ua = !1),
            e !== null && ld(t, e),
            (t = Dr(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return c
      ? (jn(),
        (v = n.fallback),
        (c = t.mode),
        (S = e.child),
        (N = S.sibling),
        (n = Za(S, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = S.subtreeFlags & 65011712),
        N !== null ? (v = Za(N, v)) : ((v = il(v, c, a, null)), (v.flags |= 2)),
        (v.return = t),
        (n.return = t),
        (n.sibling = v),
        (t.child = n),
        ec(null, n),
        (n = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = Rr(a))
          : ((c = v.cachePool),
            c !== null
              ? ((S = rt._currentValue), (c = c.parent !== S ? { parent: S, pool: S } : c))
              : (c = ud()),
            (v = { baseLanes: v.baseLanes | a, cachePool: c })),
        (n.memoizedState = v),
        (n.childLanes = Or(e, h, a)),
        (t.memoizedState = Cr),
        ec(e.child, n))
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
  function Dr(e, t) {
    return ((t = xs({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function xs(e, t) {
    return ((e = Qt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Br(e, t, a) {
    return (
      dl(t, e.child, null, a),
      (e = Dr(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function jm(e, t, a) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), Jo(e.return, t, a));
  }
  function Lr(e, t, a, n, c, r) {
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
  function Am(e, t, a) {
    var n = t.pendingProps,
      c = n.revealOrder,
      r = n.tail;
    n = n.children;
    var h = ct.current,
      v = (h & 2) !== 0;
    if (
      (v ? ((h = (h & 1) | 2), (t.flags |= 128)) : (h &= 1),
      K(ct, h),
      Nt(e, t, n, a),
      (n = je ? qi : 0),
      !v && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && jm(e, a, t);
        else if (e.tag === 19) jm(e, a, t);
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
          ((e = a.alternate), e !== null && us(e) === null && (c = a), (a = a.sibling));
        ((a = c),
          a === null ? ((c = t.child), (t.child = null)) : ((c = a.sibling), (a.sibling = null)),
          Lr(t, !1, c, a, r, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, c = t.child, t.child = null; c !== null; ) {
          if (((e = c.alternate), e !== null && us(e) === null)) {
            t.child = c;
            break;
          }
          ((e = c.sibling), (c.sibling = a), (a = c), (c = e));
        }
        Lr(t, !0, a, null, r, n);
        break;
      case 'together':
        Lr(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Fa(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Mn |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Kl(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = Za(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = Za(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function $r(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && as(e)));
  }
  function Ip(e, t, a) {
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
        if (t.memoizedState !== null) return ((t.flags |= 128), or(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (xn(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? xm(e, t, a)
              : (xn(t), (e = Fa(e, t, a)), e !== null ? e.sibling : null);
        xn(t);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (
          ((n = (a & t.childLanes) !== 0),
          n || (Kl(e, t, a, !1), (n = (a & t.childLanes) !== 0)),
          c)
        ) {
          if (n) return Am(e, t, a);
          t.flags |= 128;
        }
        if (
          ((c = t.memoizedState),
          c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
          K(ct, ct.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), ym(e, t, a, t.pendingProps));
      case 24:
        vn(t, rt, e.memoizedState.cache);
    }
    return Fa(e, t, a);
  }
  function Tm(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) ft = !0;
      else {
        if (!$r(e, a) && (t.flags & 128) === 0) return ((ft = !1), Ip(e, t, a));
        ft = (e.flags & 131072) !== 0;
      }
    else ((ft = !1), je && (t.flags & 1048576) !== 0 && nd(t, qi, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = ul(t.elementType)), (t.type = e), typeof e == 'function'))
            Vo(e)
              ? ((n = hl(e, n)), (t.tag = 1), (t = bm(null, t, e, n, a)))
              : ((t.tag = 0), (t = zr(null, t, e, n, a)));
          else {
            if (e != null) {
              var c = e.$$typeof;
              if (c === U) {
                ((t.tag = 11), (t = mm(null, t, e, n, a)));
                break e;
              } else if (c === ne) {
                ((t.tag = 14), (t = hm(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = Lt(e) || e), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return zr(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (c = hl(n, t.pendingProps)), bm(e, t, n, c, a));
      case 3:
        e: {
          if ((pt(t, t.stateNode.containerInfo), e === null)) throw Error(o(387));
          n = t.pendingProps;
          var r = t.memoizedState;
          ((c = r.element), nr(e, t), Wi(t, n, null, a));
          var h = t.memoizedState;
          if (
            ((n = h.cache),
            vn(t, rt, n),
            n !== r.cache && Fo(t, [rt], a, !0),
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
              t = Sm(e, t, n, a);
              break e;
            } else if (n !== c) {
              ((c = sa(Error(o(424)), t)), Vi(c), (t = Sm(e, t, n, a)));
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
                  Et = t,
                  je = !0,
                  yn = null,
                  ua = !0,
                  a = yd(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((cl(), n === c)) {
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
          Ss(e, t),
          e === null
            ? (a = L0(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : je ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = Hs(fe.current).createElement(a)),
                (n[at] = t),
                (n[Mt] = e),
                zt(n, a, e),
                St(n),
                (t.stateNode = n))
            : (t.memoizedState = L0(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          Ba(t),
          e === null &&
            je &&
            ((n = t.stateNode = O0(t.type, t.pendingProps, fe.current)),
            (Et = t),
            (ua = !0),
            (c = Je),
            Cn(t.type) ? ((yu = c), (Je = da(n.firstChild))) : (Je = c)),
          Nt(e, t, t.pendingProps.children, a),
          Ss(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            je &&
            ((c = n = Je) &&
              ((n = wy(n, t.type, t.pendingProps, ua)),
              n !== null
                ? ((t.stateNode = n), (Et = t), (Je = da(n.firstChild)), (ua = !1), (c = !0))
                : (c = !1)),
            c || gn(t)),
          Ba(t),
          (c = t.type),
          (r = t.pendingProps),
          (h = e !== null ? e.memoizedProps : null),
          (n = r.children),
          fu(c, r) ? (n = null) : h !== null && fu(c, h) && (t.flags |= 32),
          t.memoizedState !== null && ((c = ur(e, t, Gp, null, null, a)), (pc._currentValue = c)),
          Ss(e, t),
          Nt(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            je &&
            ((e = a = Je) &&
              ((a = Ny(a, t.pendingProps, ua)),
              a !== null ? ((t.stateNode = a), (Et = t), (Je = null), (e = !0)) : (e = !1)),
            e || gn(t)),
          null
        );
      case 13:
        return xm(e, t, a);
      case 4:
        return (
          pt(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = dl(t, null, n, a)) : Nt(e, t, n, a),
          t.child
        );
      case 11:
        return mm(e, t, t.type, t.pendingProps, a);
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
          (c = t.type._context),
          (n = t.pendingProps.children),
          ol(t),
          (c = wt(c)),
          (n = n(c)),
          (t.flags |= 1),
          Nt(e, t, n, a),
          t.child
        );
      case 14:
        return hm(e, t, t.type, t.pendingProps, a);
      case 15:
        return pm(e, t, t.type, t.pendingProps, a);
      case 19:
        return Am(e, t, a);
      case 31:
        return Fp(e, t, a);
      case 22:
        return ym(e, t, a, t.pendingProps);
      case 24:
        return (
          ol(t),
          (n = wt(rt)),
          e === null
            ? ((c = er()),
              c === null &&
                ((c = Ge),
                (r = Io()),
                (c.pooledCache = r),
                r.refCount++,
                r !== null && (c.pooledCacheLanes |= a),
                (c = r)),
              (t.memoizedState = { parent: n, cache: c }),
              ar(t),
              vn(t, rt, c))
            : ((e.lanes & a) !== 0 && (nr(e, t), Wi(t, null, null, a), Qi()),
              (c = e.memoizedState),
              (r = t.memoizedState),
              c.parent !== n
                ? ((c = { parent: n, cache: n }),
                  (t.memoizedState = c),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = c),
                  vn(t, rt, n))
                : ((n = r.cache), vn(t, rt, n), n !== c.cache && Fo(t, [rt], a, !0))),
          Nt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Ia(e) {
    e.flags |= 4;
  }
  function Hr(e, t, a, n, c) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (c & 335544128) === c))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Im()) e.flags |= 8192;
        else throw ((fl = cs), tr);
    } else e.flags &= -16777217;
  }
  function Mm(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !q0(t)))
      if (Im()) e.flags |= 8192;
      else throw ((fl = cs), tr);
  }
  function js(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Ni() : 536870912), (e.lanes |= t), (ii |= t)));
  }
  function tc(e, t) {
    if (!je)
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
  function Pp(e, t, a) {
    var n = t.pendingProps;
    switch ((Xo(t), t.tag)) {
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
            (Xl(t)
              ? Ia(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Qo())),
          Fe(t),
          null
        );
      case 26:
        var c = t.type,
          r = t.memoizedState;
        return (
          e === null
            ? (Ia(t), r !== null ? (Fe(t), Mm(t, r)) : (Fe(t), Hr(t, c, null, n, a)))
            : r
              ? r !== e.memoizedState
                ? (Ia(t), Fe(t), Mm(t, r))
                : (Fe(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Ia(t), Fe(t), Hr(t, c, e, n, a)),
          null
        );
      case 27:
        if ((Ea(t), (a = fe.current), (c = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Ia(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(o(166));
            return (Fe(t), null);
          }
          ((e = J.current), Xl(t) ? id(t) : ((e = O0(c, n, a)), (t.stateNode = e), Ia(t)));
        }
        return (Fe(t), null);
      case 5:
        if ((Ea(t), (c = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Ia(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(o(166));
            return (Fe(t), null);
          }
          if (((r = J.current), Xl(t))) id(t);
          else {
            var h = Hs(fe.current);
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
            ((r[at] = t), (r[Mt] = n));
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
            n && Ia(t);
          }
        }
        return (Fe(t), Hr(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Ia(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = fe.current), Xl(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (n = null), (c = Et), c !== null))
              switch (c.tag) {
                case 27:
                case 5:
                  n = c.memoizedProps;
              }
            ((e[at] = t),
              (e = !!(
                e.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                x0(e.nodeValue, a)
              )),
              e || gn(t, !0));
          } else ((e = Hs(e).createTextNode(n)), (e[at] = t), (t.stateNode = e));
        }
        return (Fe(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = Xl(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(o(557));
              e[at] = t;
            } else (cl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Fe(t), (e = !1));
          } else
            ((a = Qo()),
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
          if (((c = Xl(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!c) throw Error(o(318));
              if (((c = t.memoizedState), (c = c !== null ? c.dehydrated : null), !c))
                throw Error(o(317));
              c[at] = t;
            } else (cl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Fe(t), (c = !1));
          } else
            ((c = Qo()),
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
              js(t, t.updateQueue),
              Fe(t),
              null)
        );
      case 4:
        return (Ke(), e === null && cu(t.stateNode.containerInfo), Fe(t), null);
      case 10:
        return (Qa(t.type), Fe(t), null);
      case 19:
        if ((H(ct), (n = t.memoizedState), n === null)) return (Fe(t), null);
        if (((c = (t.flags & 128) !== 0), (r = n.rendering), r === null))
          if (c) tc(n, !1);
          else {
            if (it !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((r = us(e)), r !== null)) {
                  for (
                    t.flags |= 128,
                      tc(n, !1),
                      e = r.updateQueue,
                      t.updateQueue = e,
                      js(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (ed(a, e), (a = a.sibling));
                  return (K(ct, (ct.current & 1) | 2), je && Xa(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              Be() > ws &&
              ((t.flags |= 128), (c = !0), tc(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!c)
            if (((e = us(r)), e !== null)) {
              if (
                ((t.flags |= 128),
                (c = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                js(t, e),
                tc(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !r.alternate && !je)
              )
                return (Fe(t), null);
            } else
              2 * Be() - n.renderingStartTime > ws &&
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
            K(ct, c ? (a & 1) | 2 : a & 1),
            je && Xa(t, n.treeForkCount),
            e)
          : (Fe(t), null);
      case 22:
      case 23:
        return (
          Jt(t),
          sr(),
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
          a !== null && js(t, a.retryQueue),
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
    throw Error(o(156, t.tag));
  }
  function ey(e, t) {
    switch ((Xo(t), t.tag)) {
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
        return (Ea(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Jt(t), t.alternate === null)) throw Error(o(340));
          cl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Jt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(o(340));
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
          sr(),
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
  function Em(e, t) {
    switch ((Xo(t), t.tag)) {
      case 3:
        (Qa(rt), Ke());
        break;
      case 26:
      case 27:
      case 5:
        Ea(t);
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
        (Jt(t), sr(), e !== null && H(rl));
        break;
      case 24:
        Qa(rt);
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
  function An(e, t, a) {
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
  function wm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        vd(t, a);
      } catch (n) {
        $e(e, e.return, n);
      }
    }
  }
  function Nm(e, t, a) {
    ((a.props = hl(e.type, e.memoizedProps)), (a.state = e.memoizedState));
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
  function Ra(e, t) {
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
  function zm(e) {
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
  function kr(e, t, a) {
    try {
      var n = e.stateNode;
      (xy(n, e.type, a, t), (n[Mt] = t));
    } catch (c) {
      $e(e, e.return, c);
    }
  }
  function Cm(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Cn(e.type)) || e.tag === 4
    );
  }
  function Ur(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Cm(e.return)) return null;
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
  function qr(e, t, a) {
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
      for (qr(e, t, a), e = e.sibling; e !== null; ) (qr(e, t, a), (e = e.sibling));
  }
  function As(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && Cn(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (As(e, t, a), e = e.sibling; e !== null; ) (As(e, t, a), (e = e.sibling));
  }
  function Rm(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, c = t.attributes; c.length; ) t.removeAttributeNode(c[0]);
      (zt(t, n, a), (t[at] = e), (t[Mt] = a));
    } catch (r) {
      $e(e, e.return, r);
    }
  }
  var Pa = !1,
    dt = !1,
    Vr = !1,
    Om = typeof WeakSet == 'function' ? WeakSet : Set,
    xt = null;
  function ty(e, t) {
    if (((e = e.containerInfo), (ru = Zs), (e = Zf(e)), Bo(e))) {
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
              k = e,
              z = null;
            t: for (;;) {
              for (
                var C;
                k !== a || (c !== 0 && k.nodeType !== 3) || (v = h + c),
                  k !== r || (n !== 0 && k.nodeType !== 3) || (S = h + n),
                  k.nodeType === 3 && (h += k.nodeValue.length),
                  (C = k.firstChild) !== null;
              )
                ((z = k), (k = C));
              for (;;) {
                if (k === e) break t;
                if (
                  (z === a && ++N === c && (v = h),
                  z === r && ++B === n && (S = h),
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
    for (uu = { focusedElem: e, selectionRange: a }, Zs = !1, xt = t; xt !== null; )
      if (((t = xt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (xt = e));
      else
        for (; xt !== null; ) {
          switch (((t = xt), (r = t.alternate), (e = t.flags), t.tag)) {
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
                  var I = hl(a.type, c);
                  ((e = n.getSnapshotBeforeUpdate(I, r)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ce) {
                  $e(a, a.return, ce);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) mu(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      mu(e);
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
            ((e.return = t.return), (xt = e));
            break;
          }
          xt = t.return;
        }
  }
  function Dm(e, t, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (tn(e, a), n & 4 && ac(5, a));
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
            var c = hl(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(c, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (h) {
              $e(a, a.return, h);
            }
          }
        (n & 64 && wm(a), n & 512 && nc(a, a.return));
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
            vd(e, t);
          } catch (h) {
            $e(a, a.return, h);
          }
        }
        break;
      case 27:
        t === null && n & 4 && Rm(a);
      case 26:
      case 5:
        (tn(e, a), t === null && n & 4 && zm(a), n & 512 && nc(a, a.return));
        break;
      case 12:
        tn(e, a);
        break;
      case 31:
        (tn(e, a), n & 4 && $m(e, a));
        break;
      case 13:
        (tn(e, a),
          n & 4 && Hm(e, a),
          n & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = uy.bind(null, a)), zy(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || Pa), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || dt), (c = Pa));
          var r = dt;
          ((Pa = n),
            (dt = t) && !r ? an(e, a, (a.subtreeFlags & 8772) !== 0) : tn(e, a),
            (Pa = c),
            (dt = r));
        }
        break;
      case 30:
        break;
      default:
        tn(e, a);
    }
  }
  function Bm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Bm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && vo(t)),
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
    for (a = a.child; a !== null; ) (Lm(e, t, a), (a = a.sibling));
  }
  function Lm(e, t, a) {
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
          c = Vt;
        (Cn(a.type) && ((Pe = a.stateNode), (Vt = !1)),
          en(e, t, a),
          dc(a.stateNode),
          (Pe = n),
          (Vt = c));
        break;
      case 5:
        dt || Ra(a, t);
      case 6:
        if (((n = Pe), (c = Vt), (Pe = null), en(e, t, a), (Pe = n), (Vt = c), Pe !== null))
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
              w0(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              mi(e))
            : w0(Pe, a.stateNode));
        break;
      case 4:
        ((n = Pe),
          (c = Vt),
          (Pe = a.stateNode.containerInfo),
          (Vt = !0),
          en(e, t, a),
          (Pe = n),
          (Vt = c));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (An(2, a, t), dt || An(4, a, t), en(e, t, a));
        break;
      case 1:
        (dt ||
          (Ra(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && Nm(a, t, n)),
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
  function $m(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        mi(e);
      } catch (a) {
        $e(t, t.return, a);
      }
    }
  }
  function Hm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        mi(e);
      } catch (a) {
        $e(t, t.return, a);
      }
  }
  function ay(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Om()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Om()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Ts(e, t) {
    var a = ay(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var c = fy.bind(null, e, n);
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
        if (Pe === null) throw Error(o(160));
        (Lm(r, h, c),
          (Pe = null),
          (Vt = !1),
          (r = c.alternate),
          r !== null && (r.return = null),
          (c.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (km(t, e), (t = t.sibling));
  }
  var _a = null;
  function km(e, t) {
    var a = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Gt(t, e), Yt(e), n & 4 && (An(3, e, e.return), ac(3, e), An(5, e, e.return)));
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
        var c = _a;
        if ((Gt(t, e), Yt(e), n & 512 && (dt || a === null || Ra(a, a.return)), n & 4)) {
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
                          r[at] ||
                          r.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          r.hasAttribute('itemprop')) &&
                          ((r = c.createElement(n)),
                          c.head.insertBefore(r, c.querySelector('head > title'))),
                        zt(r, n, a),
                        (r[at] = e),
                        St(r),
                        (n = r));
                      break e;
                    case 'link':
                      var h = k0('link', 'href', c).get(n + (a.href || ''));
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
                      if ((h = k0('meta', 'content', c).get(n + (a.content || '')))) {
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
                  ((r[at] = e), St(r), (n = r));
                }
                e.stateNode = n;
              } else U0(c, e.type, e.stateNode);
            else e.stateNode = H0(c, n, e.memoizedProps);
          else
            r !== n
              ? (r === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : r.count--,
                n === null ? U0(c, e.type, e.stateNode) : H0(c, n, e.memoizedProps))
              : n === null && e.stateNode !== null && kr(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Gt(t, e),
          Yt(e),
          n & 512 && (dt || a === null || Ra(a, a.return)),
          a !== null && n & 4 && kr(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Gt(t, e), Yt(e), n & 512 && (dt || a === null || Ra(a, a.return)), e.flags & 32)) {
          c = e.stateNode;
          try {
            Ll(c, '');
          } catch (I) {
            $e(e, e.return, I);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((c = e.memoizedProps), kr(e, c, a !== null ? a.memoizedProps : c)),
          n & 1024 && (Vr = !0));
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
          ((qs = null),
          (c = _a),
          (_a = ks(t.containerInfo)),
          Gt(t, e),
          (_a = c),
          Yt(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            mi(t.containerInfo);
          } catch (I) {
            $e(e, e.return, I);
          }
        Vr && ((Vr = !1), Um(e));
        break;
      case 4:
        ((n = _a), (_a = ks(e.stateNode.containerInfo)), Gt(t, e), Yt(e), (_a = n));
        break;
      case 12:
        (Gt(t, e), Yt(e));
        break;
      case 31:
        (Gt(t, e),
          Yt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Ts(e, n))));
        break;
      case 13:
        (Gt(t, e),
          Yt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Es = Be()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Ts(e, n))));
        break;
      case 22:
        c = e.memoizedState !== null;
        var S = a !== null && a.memoizedState !== null,
          N = Pa,
          B = dt;
        if (((Pa = N || c), (dt = B || S), Gt(t, e), (dt = B), (Pa = N), Yt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = c ? t._visibility & -2 : t._visibility | 1,
              c && (a === null || S || Pa || dt || pl(e)),
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
                  S.stateNode.nodeValue = c ? '' : S.memoizedProps;
                } catch (I) {
                  $e(S, S.return, I);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                S = t;
                try {
                  var C = S.stateNode;
                  c ? N0(C, !0) : N0(S.stateNode, !1);
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
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), Ts(e, a))));
        break;
      case 19:
        (Gt(t, e),
          Yt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Ts(e, n))));
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
          if (Cm(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var c = a.stateNode,
              r = Ur(e);
            As(e, r, c);
            break;
          case 5:
            var h = a.stateNode;
            a.flags & 32 && (Ll(h, ''), (a.flags &= -33));
            var v = Ur(e);
            As(e, v, h);
            break;
          case 3:
          case 4:
            var S = a.stateNode.containerInfo,
              N = Ur(e);
            qr(e, N, S);
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
  function Um(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Um(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function tn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Dm(e, t.alternate, t), (t = t.sibling));
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
          (typeof a.componentWillUnmount == 'function' && Nm(t, t.return, a), pl(t));
          break;
        case 27:
          dc(t.stateNode);
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
        c = e,
        r = t,
        h = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          (an(c, r, a), ac(4, r));
          break;
        case 1:
          if ((an(c, r, a), (n = r), (c = n.stateNode), typeof c.componentDidMount == 'function'))
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
                for (c.shared.hiddenCallbacks = null, c = 0; c < S.length; c++) gd(S[c], v);
            } catch (N) {
              $e(n, n.return, N);
            }
          }
          (a && h & 64 && wm(r), nc(r, r.return));
          break;
        case 27:
          Rm(r);
        case 26:
        case 5:
          (an(c, r, a), a && n === null && h & 4 && zm(r), nc(r, r.return));
          break;
        case 12:
          an(c, r, a);
          break;
        case 31:
          (an(c, r, a), a && h & 4 && $m(c, r));
          break;
        case 13:
          (an(c, r, a), a && h & 4 && Hm(c, r));
          break;
        case 22:
          (r.memoizedState === null && an(c, r, a), nc(r, r.return));
          break;
        case 30:
          break;
        default:
          an(c, r, a);
      }
      t = t.sibling;
    }
  }
  function Gr(e, t) {
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
  function Yr(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Gi(e)));
  }
  function ba(e, t, a, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (qm(e, t, a, n), (t = t.sibling));
  }
  function qm(e, t, a, n) {
    var c = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (ba(e, t, a, n), c & 2048 && ac(9, t));
        break;
      case 1:
        ba(e, t, a, n);
        break;
      case 3:
        (ba(e, t, a, n),
          c & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Gi(e))));
        break;
      case 12:
        if (c & 2048) {
          (ba(e, t, a, n), (e = t.stateNode));
          try {
            var r = t.memoizedProps,
              h = r.id,
              v = r.onPostCommit;
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
        ((r = t.stateNode),
          (h = t.alternate),
          t.memoizedState !== null
            ? r._visibility & 2
              ? ba(e, t, a, n)
              : lc(e, t)
            : r._visibility & 2
              ? ba(e, t, a, n)
              : ((r._visibility |= 2), ai(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          c & 2048 && Gr(h, t));
        break;
      case 24:
        (ba(e, t, a, n), c & 2048 && Yr(t.alternate, t));
        break;
      default:
        ba(e, t, a, n);
    }
  }
  function ai(e, t, a, n, c) {
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
          (ai(r, h, v, S, c), ac(8, h));
          break;
        case 23:
          break;
        case 22:
          var B = h.stateNode;
          (h.memoizedState !== null
            ? B._visibility & 2
              ? ai(r, h, v, S, c)
              : lc(r, h)
            : ((B._visibility |= 2), ai(r, h, v, S, c)),
            c && N & 2048 && Gr(h.alternate, h));
          break;
        case 24:
          (ai(r, h, v, S, c), c && N & 2048 && Yr(h.alternate, h));
          break;
        default:
          ai(r, h, v, S, c);
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
            (lc(a, n), c & 2048 && Gr(n.alternate, n));
            break;
          case 24:
            (lc(a, n), c & 2048 && Yr(n.alternate, n));
            break;
          default:
            lc(a, n);
        }
        t = t.sibling;
      }
  }
  var ic = 8192;
  function ni(e, t, a) {
    if (e.subtreeFlags & ic) for (e = e.child; e !== null; ) (Vm(e, t, a), (e = e.sibling));
  }
  function Vm(e, t, a) {
    switch (e.tag) {
      case 26:
        (ni(e, t, a),
          e.flags & ic && e.memoizedState !== null && Vy(a, _a, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        ni(e, t, a);
        break;
      case 3:
      case 4:
        var n = _a;
        ((_a = ks(e.stateNode.containerInfo)), ni(e, t, a), (_a = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = ic), (ic = 16777216), ni(e, t, a), (ic = n))
            : ni(e, t, a));
        break;
      default:
        ni(e, t, a);
    }
  }
  function Gm(e) {
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
          ((xt = n), Zm(n, e));
        }
      Gm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Ym(e), (e = e.sibling));
  }
  function Ym(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (cc(e), e.flags & 2048 && An(9, e, e.return));
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
          ? ((t._visibility &= -3), Ms(e))
          : cc(e);
        break;
      default:
        cc(e);
    }
  }
  function Ms(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((xt = n), Zm(n, e));
        }
      Gm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (An(8, t, t.return), Ms(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Ms(t)));
          break;
        default:
          Ms(t);
      }
      e = e.sibling;
    }
  }
  function Zm(e, t) {
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
          Gi(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (xt = n));
      else
        e: for (a = e; xt !== null; ) {
          n = xt;
          var c = n.sibling,
            r = n.return;
          if ((Bm(n), n === a)) {
            xt = null;
            break e;
          }
          if (c !== null) {
            ((c.return = r), (xt = c));
            break e;
          }
          xt = r;
        }
    }
  }
  var ny = {
      getCacheForType: function (e) {
        var t = wt(rt),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return wt(rt).controller.signal;
      },
    },
    ly = typeof WeakMap == 'function' ? WeakMap : Map,
    Ce = 0,
    Ge = null,
    ge = null,
    be = 0,
    Le = 0,
    Ft = null,
    Tn = !1,
    li = !1,
    Zr = !1,
    nn = 0,
    it = 0,
    Mn = 0,
    yl = 0,
    Xr = 0,
    It = 0,
    ii = 0,
    sc = null,
    Zt = null,
    Kr = !1,
    Es = 0,
    Xm = 0,
    ws = 1 / 0,
    Ns = null,
    En = null,
    vt = 0,
    wn = null,
    ci = null,
    ln = 0,
    Qr = 0,
    Wr = null,
    Km = null,
    oc = 0,
    Jr = null;
  function Pt() {
    return (Ce & 2) !== 0 && be !== 0 ? be & -be : O.T !== null ? au() : he();
  }
  function Qm() {
    if (It === 0)
      if ((be & 536870912) === 0 || je) {
        var e = ka;
        ((ka <<= 1), (ka & 3932160) === 0 && (ka = 262144), (It = e));
      } else It = 536870912;
    return ((e = Wt.current), e !== null && (e.flags |= 32), It);
  }
  function Xt(e, t, a) {
    (((e === Ge && (Le === 2 || Le === 9)) || e.cancelPendingCommit !== null) &&
      (si(e, 0), Nn(e, be, It, !1)),
      W(e, a),
      ((Ce & 2) === 0 || e !== Ge) &&
        (e === Ge && ((Ce & 2) === 0 && (yl |= a), it === 4 && Nn(e, be, It, !1)), Oa(e)));
  }
  function Wm(e, t, a) {
    if ((Ce & 6) !== 0) throw Error(o(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Fn(e, t),
      c = n ? sy(e, t) : Ir(e, t, !0),
      r = n;
    do {
      if (c === 0) {
        li && !n && Nn(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), r && !iy(a))) {
          ((c = Ir(e, t, !1)), (r = !1));
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
              if ((S && (si(v, h).flags |= 256), (h = Ir(v, h, !1)), h !== 2)) {
                if (Zr && !S) {
                  ((v.errorRecoveryDisabledLanes |= r), (yl |= r), (c = 4));
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
          (si(e, 0), Nn(e, t, 0, !0));
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
              Nn(n, t, It, !Tn);
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
          if ((t & 62914560) === t && ((c = Es + 300 - Be()), 10 < c)) {
            if ((Nn(n, t, It, !Tn), qa(n, 0, !0) !== 0)) break e;
            ((ln = t),
              (n.timeoutHandle = M0(
                Jm.bind(null, n, a, Zt, Ns, Kr, t, It, yl, ii, Tn, r, 'Throttled', -0, 0),
                c
              )));
            break e;
          }
          Jm(n, a, Zt, Ns, Kr, t, It, yl, ii, Tn, r, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Oa(e);
  }
  function Jm(e, t, a, n, c, r, h, v, S, N, B, k, z, C) {
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
        Vm(t, r, k));
      var I = (r & 62914560) === r ? Es - Be() : (r & 4194048) === r ? Xm - Be() : 0;
      if (((I = Gy(k, I)), I !== null)) {
        ((ln = r),
          (e.cancelPendingCommit = I(l0.bind(null, e, t, r, a, n, c, h, v, S, B, k, null, z, C))),
          Nn(e, r, h, !N));
        return;
      }
    }
    l0(e, t, r, a, n, c, h, v, S);
  }
  function iy(e) {
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
  function Nn(e, t, a, n) {
    ((t &= ~Xr),
      (t &= ~yl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var c = t; 0 < c; ) {
      var r = 31 - gt(c),
        h = 1 << r;
      ((n[r] = -1), (c &= ~h));
    }
    a !== 0 && ye(e, a, t);
  }
  function zs() {
    return (Ce & 6) === 0 ? (rc(0), !1) : !0;
  }
  function Fr() {
    if (ge !== null) {
      if (Le === 0) var e = ge.return;
      else ((e = ge), (Ka = sl = null), mr(e), (Fl = null), (Zi = 0), (e = ge));
      for (; e !== null; ) (Em(e.alternate, e), (e = e.return));
      ge = null;
    }
  }
  function si(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), Ty(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (ln = 0),
      Fr(),
      (Ge = e),
      (ge = a = Za(e.current, null)),
      (be = t),
      (Le = 0),
      (Ft = null),
      (Tn = !1),
      (li = Fn(e, t)),
      (Zr = !1),
      (ii = It = Xr = yl = Mn = it = 0),
      (Zt = sc = null),
      (Kr = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var c = 31 - gt(n),
          r = 1 << c;
        ((t |= e[c]), (n &= ~r));
      }
    return ((nn = t), Fc(), a);
  }
  function Fm(e, t) {
    ((ue = null),
      (O.H = Pi),
      t === Jl || t === is
        ? ((t = md()), (Le = 3))
        : t === tr
          ? ((t = md()), (Le = 4))
          : (Le =
              t === Nr
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Ft = t),
      ge === null && ((it = 1), _s(e, sa(t, e.current))));
  }
  function Im() {
    var e = Wt.current;
    return e === null
      ? !0
      : (be & 4194048) === be
        ? fa === null
        : (be & 62914560) === be || (be & 536870912) !== 0
          ? e === fa
          : !1;
  }
  function Pm() {
    var e = O.H;
    return ((O.H = Pi), e === null ? Pi : e);
  }
  function e0() {
    var e = O.A;
    return ((O.A = ny), e);
  }
  function Cs() {
    ((it = 4),
      Tn || ((be & 4194048) !== be && Wt.current !== null) || (li = !0),
      ((Mn & 134217727) === 0 && (yl & 134217727) === 0) || Ge === null || Nn(Ge, be, It, !1));
  }
  function Ir(e, t, a) {
    var n = Ce;
    Ce |= 2;
    var c = Pm(),
      r = e0();
    ((Ge !== e || be !== t) && ((Ns = null), si(e, t)), (t = !1));
    var h = it;
    e: do
      try {
        if (Le !== 0 && ge !== null) {
          var v = ge,
            S = Ft;
          switch (Le) {
            case 8:
              (Fr(), (h = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Wt.current === null && (t = !0);
              var N = Le;
              if (((Le = 0), (Ft = null), oi(e, v, S, N), a && li)) {
                h = 0;
                break e;
              }
              break;
            default:
              ((N = Le), (Le = 0), (Ft = null), oi(e, v, S, N));
          }
        }
        (cy(), (h = it));
        break;
      } catch (B) {
        Fm(e, B);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Ka = sl = null),
      (Ce = n),
      (O.H = c),
      (O.A = r),
      ge === null && ((Ge = null), (be = 0), Fc()),
      h
    );
  }
  function cy() {
    for (; ge !== null; ) t0(ge);
  }
  function sy(e, t) {
    var a = Ce;
    Ce |= 2;
    var n = Pm(),
      c = e0();
    Ge !== e || be !== t ? ((Ns = null), (ws = Be() + 500), si(e, t)) : (li = Fn(e, t));
    e: do
      try {
        if (Le !== 0 && ge !== null) {
          t = ge;
          var r = Ft;
          t: switch (Le) {
            case 1:
              ((Le = 0), (Ft = null), oi(e, t, r, 1));
              break;
            case 2:
            case 9:
              if (fd(r)) {
                ((Le = 0), (Ft = null), a0(t));
                break;
              }
              ((t = function () {
                ((Le !== 2 && Le !== 9) || Ge !== e || (Le = 7), Oa(e));
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
              fd(r) ? ((Le = 0), (Ft = null), a0(t)) : ((Le = 0), (Ft = null), oi(e, t, r, 7));
              break;
            case 5:
              var h = null;
              switch (ge.tag) {
                case 26:
                  h = ge.memoizedState;
                case 5:
                case 27:
                  var v = ge;
                  if (h ? q0(h) : v.stateNode.complete) {
                    ((Le = 0), (Ft = null));
                    var S = v.sibling;
                    if (S !== null) ge = S;
                    else {
                      var N = v.return;
                      N !== null ? ((ge = N), Rs(N)) : (ge = null);
                    }
                    break t;
                  }
              }
              ((Le = 0), (Ft = null), oi(e, t, r, 5));
              break;
            case 6:
              ((Le = 0), (Ft = null), oi(e, t, r, 6));
              break;
            case 8:
              (Fr(), (it = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        oy();
        break;
      } catch (B) {
        Fm(e, B);
      }
    while (!0);
    return (
      (Ka = sl = null),
      (O.H = n),
      (O.A = c),
      (Ce = a),
      ge !== null ? 0 : ((Ge = null), (be = 0), Fc(), it)
    );
  }
  function oy() {
    for (; ge !== null && !tt(); ) t0(ge);
  }
  function t0(e) {
    var t = Tm(e.alternate, e, nn);
    ((e.memoizedProps = e.pendingProps), t === null ? Rs(e) : (ge = t));
  }
  function a0(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = _m(a, t, t.pendingProps, t.type, void 0, be);
        break;
      case 11:
        t = _m(a, t, t.pendingProps, t.type.render, t.ref, be);
        break;
      case 5:
        mr(t);
      default:
        (Em(a, t), (t = ge = ed(t, nn)), (t = Tm(a, t, nn)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Rs(e) : (ge = t));
  }
  function oi(e, t, a, n) {
    ((Ka = sl = null), mr(t), (Fl = null), (Zi = 0));
    var c = t.return;
    try {
      if (Jp(e, c, t, a, be)) {
        ((it = 1), _s(e, sa(a, e.current)), (ge = null));
        return;
      }
    } catch (r) {
      if (c !== null) throw ((ge = c), r);
      ((it = 1), _s(e, sa(a, e.current)), (ge = null));
      return;
    }
    t.flags & 32768
      ? (je || n === 1
          ? (e = !0)
          : li || (be & 536870912) !== 0
            ? (e = !1)
            : ((Tn = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Wt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        n0(t, e))
      : Rs(t);
  }
  function Rs(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        n0(t, Tn);
        return;
      }
      e = t.return;
      var a = Pp(t.alternate, t, nn);
      if (a !== null) {
        ge = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ge = t;
        return;
      }
      ge = t = e;
    } while (t !== null);
    it === 0 && (it = 5);
  }
  function n0(e, t) {
    do {
      var a = ey(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (ge = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ge = e;
        return;
      }
      ge = e = a;
    } while (e !== null);
    ((it = 6), (ge = null));
  }
  function l0(e, t, a, n, c, r, h, v, S) {
    e.cancelPendingCommit = null;
    do Os();
    while (vt !== 0);
    if ((Ce & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((r = t.lanes | t.childLanes),
        (r |= Uo),
        re(e, a, r, h, v, S),
        e === Ge && ((ge = Ge = null), (be = 0)),
        (ci = t),
        (wn = e),
        (ln = a),
        (Qr = r),
        (Wr = c),
        (Km = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            dy(mn, function () {
              return (r0(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = O.T), (O.T = null), (c = X.p), (X.p = 2), (h = Ce), (Ce |= 4));
        try {
          ty(e, t, a);
        } finally {
          ((Ce = h), (X.p = c), (O.T = n));
        }
      }
      ((vt = 1), i0(), c0(), s0());
    }
  }
  function i0() {
    if (vt === 1) {
      vt = 0;
      var e = wn,
        t = ci,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = X.p;
        X.p = 2;
        var c = Ce;
        Ce |= 4;
        try {
          km(t, e);
          var r = uu,
            h = Zf(e.containerInfo),
            v = r.focusedElem,
            S = r.selectionRange;
          if (h !== v && v && v.ownerDocument && Yf(v.ownerDocument.documentElement, v)) {
            if (S !== null && Bo(v)) {
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
                  var M = Gf(v, ce),
                    j = Gf(v, qe);
                  if (
                    M &&
                    j &&
                    (C.rangeCount !== 1 ||
                      C.anchorNode !== M.node ||
                      C.anchorOffset !== M.offset ||
                      C.focusNode !== j.node ||
                      C.focusOffset !== j.offset)
                  ) {
                    var w = k.createRange();
                    (w.setStart(M.node, M.offset),
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
          ((Zs = !!ru), (uu = ru = null));
        } finally {
          ((Ce = c), (X.p = n), (O.T = a));
        }
      }
      ((e.current = t), (vt = 2));
    }
  }
  function c0() {
    if (vt === 2) {
      vt = 0;
      var e = wn,
        t = ci,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = X.p;
        X.p = 2;
        var c = Ce;
        Ce |= 4;
        try {
          Dm(e, t.alternate, t);
        } finally {
          ((Ce = c), (X.p = n), (O.T = a));
        }
      }
      vt = 3;
    }
  }
  function s0() {
    if (vt === 4 || vt === 3) {
      ((vt = 0), Rt());
      var e = wn,
        t = ci,
        a = ln,
        n = Km;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (vt = 5)
        : ((vt = 0), (ci = wn = null), o0(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (
        (c === 0 && (En = null),
        Oe(a),
        (t = t.stateNode),
        yt && typeof yt.onCommitFiberRoot == 'function')
      )
        try {
          yt.onCommitFiberRoot(wa, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = O.T), (c = X.p), (X.p = 2), (O.T = null));
        try {
          for (var r = e.onRecoverableError, h = 0; h < n.length; h++) {
            var v = n[h];
            r(v.value, { componentStack: v.stack });
          }
        } finally {
          ((O.T = t), (X.p = c));
        }
      }
      ((ln & 3) !== 0 && Os(),
        Oa(e),
        (c = e.pendingLanes),
        (a & 261930) !== 0 && (c & 42) !== 0 ? (e === Jr ? oc++ : ((oc = 0), (Jr = e))) : (oc = 0),
        rc(0));
    }
  }
  function o0(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Gi(t)));
  }
  function Os() {
    return (i0(), c0(), s0(), r0());
  }
  function r0() {
    if (vt !== 5) return !1;
    var e = wn,
      t = Qr;
    Qr = 0;
    var a = Oe(ln),
      n = O.T,
      c = X.p;
    try {
      ((X.p = 32 > a ? 32 : a), (O.T = null), (a = Wr), (Wr = null));
      var r = wn,
        h = ln;
      if (((vt = 0), (ci = wn = null), (ln = 0), (Ce & 6) !== 0)) throw Error(o(331));
      var v = Ce;
      if (
        ((Ce |= 4),
        Ym(r.current),
        qm(r, r.current, h, a),
        (Ce = v),
        rc(0, !1),
        yt && typeof yt.onPostCommitFiberRoot == 'function')
      )
        try {
          yt.onPostCommitFiberRoot(wa, r);
        } catch {}
      return !0;
    } finally {
      ((X.p = c), (O.T = n), o0(e, t));
    }
  }
  function u0(e, t, a) {
    ((t = sa(a, t)),
      (t = wr(e.stateNode, t, 2)),
      (e = Sn(e, t, 2)),
      e !== null && (W(e, 2), Oa(e)));
  }
  function $e(e, t, a) {
    if (e.tag === 3) u0(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          u0(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (En === null || !En.has(n)))
          ) {
            ((e = sa(a, e)),
              (a = fm(2)),
              (n = Sn(t, a, 2)),
              n !== null && (dm(a, n, t, e), W(n, 2), Oa(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Pr(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new ly();
      var c = new Set();
      n.set(t, c);
    } else ((c = n.get(t)), c === void 0 && ((c = new Set()), n.set(t, c)));
    c.has(a) || ((Zr = !0), c.add(a), (e = ry.bind(null, e, t, a)), t.then(e, e));
  }
  function ry(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ge === e &&
        (be & a) === a &&
        (it === 4 || (it === 3 && (be & 62914560) === be && 300 > Be() - Es)
          ? (Ce & 2) === 0 && si(e, 0)
          : (Xr |= a),
        ii === be && (ii = 0)),
      Oa(e));
  }
  function f0(e, t) {
    (t === 0 && (t = Ni()), (e = ll(e, t)), e !== null && (W(e, t), Oa(e)));
  }
  function uy(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), f0(e, a));
  }
  function fy(e, t) {
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
    (n !== null && n.delete(t), f0(e, a));
  }
  function dy(e, t) {
    return At(e, t);
  }
  var Ds = null,
    ri = null,
    eu = !1,
    Bs = !1,
    tu = !1,
    zn = 0;
  function Oa(e) {
    (e !== ri && e.next === null && (ri === null ? (Ds = ri = e) : (ri = ri.next = e)),
      (Bs = !0),
      eu || ((eu = !0), hy()));
  }
  function rc(e, t) {
    if (!tu && Bs) {
      tu = !0;
      do
        for (var a = !1, n = Ds; n !== null; ) {
          if (e !== 0) {
            var c = n.pendingLanes;
            if (c === 0) var r = 0;
            else {
              var h = n.suspendedLanes,
                v = n.pingedLanes;
              ((r = (1 << (31 - gt(42 | e) + 1)) - 1),
                (r &= c & ~(h & ~v)),
                (r = r & 201326741 ? (r & 201326741) | 1 : r ? r | 2 : 0));
            }
            r !== 0 && ((a = !0), p0(n, r));
          } else
            ((r = be),
              (r = qa(
                n,
                n === Ge ? r : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (r & 3) === 0 || Fn(n, r) || ((a = !0), p0(n, r)));
          n = n.next;
        }
      while (a);
      tu = !1;
    }
  }
  function my() {
    d0();
  }
  function d0() {
    Bs = eu = !1;
    var e = 0;
    zn !== 0 && Ay() && (e = zn);
    for (var t = Be(), a = null, n = Ds; n !== null; ) {
      var c = n.next,
        r = m0(n, t);
      (r === 0
        ? ((n.next = null), a === null ? (Ds = c) : (a.next = c), c === null && (ri = a))
        : ((a = n), (e !== 0 || (r & 3) !== 0) && (Bs = !0)),
        (n = c));
    }
    ((vt !== 0 && vt !== 5) || rc(e), zn !== 0 && (zn = 0));
  }
  function m0(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        c = e.expirationTimes,
        r = e.pendingLanes & -62914561;
      0 < r;
    ) {
      var h = 31 - gt(r),
        v = 1 << h,
        S = c[h];
      (S === -1
        ? ((v & a) === 0 || (v & n) !== 0) && (c[h] = In(v, t))
        : S <= t && (e.expiredLanes |= v),
        (r &= ~v));
    }
    if (
      ((t = Ge),
      (a = be),
      (a = qa(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (Le === 2 || Le === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && He(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Fn(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && He(n), Oe(a))) {
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
        (n = h0.bind(null, e)),
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
  function h0(e, t) {
    if (vt !== 0 && vt !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (Os() && e.callbackNode !== a) return null;
    var n = be;
    return (
      (n = qa(e, e === Ge ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Wm(e, n, t),
          m0(e, Be()),
          e.callbackNode != null && e.callbackNode === a ? h0.bind(null, e) : null)
    );
  }
  function p0(e, t) {
    if (Os()) return null;
    Wm(e, t, !0);
  }
  function hy() {
    My(function () {
      (Ce & 6) !== 0 ? At(La, my) : d0();
    });
  }
  function au() {
    if (zn === 0) {
      var e = Ql;
      (e === 0 && ((e = Jn), (Jn <<= 1), (Jn & 261888) === 0 && (Jn = 256)), (zn = e));
    }
    return zn;
  }
  function y0(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Gc('' + e);
  }
  function g0(e, t) {
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
  function py(e, t, a, n, c) {
    if (t === 'submit' && a && a.stateNode === c) {
      var r = y0((c[Mt] || null).action),
        h = n.submitter;
      h &&
        ((t = (t = h[Mt] || null) ? y0(t.formAction) : h.getAttribute('formAction')),
        t !== null && ((r = t), (h = null)));
      var v = new Kc('action', 'action', null, n, c);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (zn !== 0) {
                  var S = h ? g0(c, h) : new FormData(c);
                  xr(a, { pending: !0, data: S, method: c.method, action: r }, null, S);
                }
              } else
                typeof r == 'function' &&
                  (v.preventDefault(),
                  (S = h ? g0(c, h) : new FormData(c)),
                  xr(a, { pending: !0, data: S, method: c.method, action: r }, r, S));
            },
            currentTarget: c,
          },
        ],
      });
    }
  }
  for (var nu = 0; nu < ko.length; nu++) {
    var lu = ko[nu],
      yy = lu.toLowerCase(),
      gy = lu[0].toUpperCase() + lu.slice(1);
    va(yy, 'on' + gy);
  }
  (va(Qf, 'onAnimationEnd'),
    va(Wf, 'onAnimationIteration'),
    va(Jf, 'onAnimationStart'),
    va('dblclick', 'onDoubleClick'),
    va('focusin', 'onFocus'),
    va('focusout', 'onBlur'),
    va(Op, 'onTransitionRun'),
    va(Dp, 'onTransitionStart'),
    va(Bp, 'onTransitionCancel'),
    va(Ff, 'onTransitionEnd'),
    Dl('onMouseEnter', ['mouseout', 'mouseover']),
    Dl('onMouseLeave', ['mouseout', 'mouseover']),
    Dl('onPointerEnter', ['pointerout', 'pointerover']),
    Dl('onPointerLeave', ['pointerout', 'pointerover']),
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
  var uc =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    vy = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(uc)
    );
  function v0(e, t) {
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
              Jc(B);
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
              Jc(B);
            }
            ((c.currentTarget = null), (r = S));
          }
      }
    }
  }
  function ve(e, t) {
    var a = t[go];
    a === void 0 && (a = t[go] = new Set());
    var n = e + '__bubble';
    a.has(n) || (_0(t, e, 2, !1), a.add(n));
  }
  function iu(e, t, a) {
    var n = 0;
    (t && (n |= 4), _0(a, e, n, t));
  }
  var Ls = '_reactListening' + Math.random().toString(36).slice(2);
  function cu(e) {
    if (!e[Ls]) {
      ((e[Ls] = !0),
        df.forEach(function (a) {
          a !== 'selectionchange' && (vy.has(a) || iu(a, !1, e), iu(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ls] || ((t[Ls] = !0), iu('selectionchange', !1, t));
    }
  }
  function _0(e, t, a, n) {
    switch (Q0(t)) {
      case 2:
        var c = Xy;
        break;
      case 8:
        c = Ky;
        break;
      default:
        c = Su;
    }
    ((a = c.bind(null, t, a, e)),
      (c = void 0),
      !Mo || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (c = !0),
      n
        ? c !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: c })
          : e.addEventListener(t, a, !0)
        : c !== void 0
          ? e.addEventListener(t, a, { passive: c })
          : e.addEventListener(t, a, !1));
  }
  function su(e, t, a, n, c) {
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
            if (((h = Cl(v)), h === null)) return;
            if (((S = h.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              n = r = h;
              continue e;
            }
            v = v.parentNode;
          }
        }
        n = n.return;
      }
    Af(function () {
      var N = r,
        B = Ao(a),
        k = [];
      e: {
        var z = If.get(e);
        if (z !== void 0) {
          var C = Kc,
            I = e;
          switch (e) {
            case 'keypress':
              if (Zc(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              C = fp;
              break;
            case 'focusin':
              ((I = 'focus'), (C = zo));
              break;
            case 'focusout':
              ((I = 'blur'), (C = zo));
              break;
            case 'beforeblur':
            case 'afterblur':
              C = zo;
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
              C = Ef;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              C = P1;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              C = hp;
              break;
            case Qf:
            case Wf:
            case Jf:
              C = ap;
              break;
            case Ff:
              C = yp;
              break;
            case 'scroll':
            case 'scrollend':
              C = F1;
              break;
            case 'wheel':
              C = vp;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              C = lp;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              C = Nf;
              break;
            case 'toggle':
            case 'beforetoggle':
              C = bp;
          }
          var ce = (t & 4) !== 0,
            qe = !ce && (e === 'scroll' || e === 'scrollend'),
            M = ce ? (z !== null ? z + 'Capture' : null) : z;
          ce = [];
          for (var j = N, w; j !== null; ) {
            var $ = j;
            if (
              ((w = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                w === null ||
                M === null ||
                (($ = Ri(j, M)), $ != null && ce.push(fc(j, $, w))),
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
            z && a !== jo && (I = a.relatedTarget || a.fromElement) && (Cl(I) || I[Na]))
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
                (I = I ? Cl(I) : null),
                I !== null &&
                  ((qe = d(I)), (ce = I.tag), I !== qe || (ce !== 5 && ce !== 27 && ce !== 6)) &&
                  (I = null))
              : ((C = null), (I = N)),
            C !== I)
          ) {
            if (
              ((ce = Ef),
              ($ = 'onMouseLeave'),
              (M = 'onMouseEnter'),
              (j = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((ce = Nf), ($ = 'onPointerLeave'), (M = 'onPointerEnter'), (j = 'pointer')),
              (qe = C == null ? z : Ci(C)),
              (w = I == null ? z : Ci(I)),
              (z = new ce($, j + 'leave', C, a, B)),
              (z.target = qe),
              (z.relatedTarget = w),
              ($ = null),
              Cl(B) === N &&
                ((ce = new ce(M, j + 'enter', I, a, B)),
                (ce.target = w),
                (ce.relatedTarget = qe),
                ($ = ce)),
              (qe = $),
              C && I)
            )
              t: {
                for (ce = _y, M = C, j = I, w = 0, $ = M; $; $ = ce($)) w++;
                $ = 0;
                for (var ae = j; ae; ae = ce(ae)) $++;
                for (; 0 < w - $; ) ((M = ce(M)), w--);
                for (; 0 < $ - w; ) ((j = ce(j)), $--);
                for (; w--; ) {
                  if (M === j || (j !== null && M === j.alternate)) {
                    ce = M;
                    break t;
                  }
                  ((M = ce(M)), (j = ce(j)));
                }
                ce = null;
              }
            else ce = null;
            (C !== null && b0(k, z, C, ce, !1), I !== null && qe !== null && b0(k, qe, I, ce, !0));
          }
        }
        e: {
          if (
            ((z = N ? Ci(N) : window),
            (C = z.nodeName && z.nodeName.toLowerCase()),
            C === 'select' || (C === 'input' && z.type === 'file'))
          )
            var Ne = $f;
          else if (Bf(z))
            if (Hf) Ne = zp;
            else {
              Ne = wp;
              var ee = Ep;
            }
          else
            ((C = z.nodeName),
              !C || C.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? N && xo(N.elementType) && (Ne = $f)
                : (Ne = Np));
          if (Ne && (Ne = Ne(e, N))) {
            Lf(k, Ne, a, B);
            break e;
          }
          (ee && ee(e, z, N),
            e === 'focusout' &&
              N &&
              z.type === 'number' &&
              N.memoizedProps.value != null &&
              So(z, 'number', z.value));
        }
        switch (((ee = N ? Ci(N) : window), e)) {
          case 'focusin':
            (Bf(ee) || ee.contentEditable === 'true') && ((Ul = ee), (Lo = N), (Ui = null));
            break;
          case 'focusout':
            Ui = Lo = Ul = null;
            break;
          case 'mousedown':
            $o = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            (($o = !1), Xf(k, a, B));
            break;
          case 'selectionchange':
            if (Rp) break;
          case 'keydown':
          case 'keyup':
            Xf(k, a, B);
        }
        var me;
        if (Ro)
          e: {
            switch (e) {
              case 'compositionstart':
                var Se = 'onCompositionStart';
                break e;
              case 'compositionend':
                Se = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                Se = 'onCompositionUpdate';
                break e;
            }
            Se = void 0;
          }
        else
          kl
            ? Of(e, a) && (Se = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (Se = 'onCompositionStart');
        (Se &&
          (zf &&
            a.locale !== 'ko' &&
            (kl || Se !== 'onCompositionStart'
              ? Se === 'onCompositionEnd' && kl && (me = Tf())
              : ((hn = B), (Eo = 'value' in hn ? hn.value : hn.textContent), (kl = !0))),
          (ee = $s(N, Se)),
          0 < ee.length &&
            ((Se = new wf(Se, e, null, a, B)),
            k.push({ event: Se, listeners: ee }),
            me ? (Se.data = me) : ((me = Df(a)), me !== null && (Se.data = me)))),
          (me = xp ? jp(e, a) : Ap(e, a)) &&
            ((Se = $s(N, 'onBeforeInput')),
            0 < Se.length &&
              ((ee = new wf('onBeforeInput', 'beforeinput', null, a, B)),
              k.push({ event: ee, listeners: Se }),
              (ee.data = me))),
          py(k, e, N, a, B));
      }
      v0(k, t);
    });
  }
  function fc(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function $s(e, t) {
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
  function _y(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function b0(e, t, a, n, c) {
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
  var by = /\r\n?/g,
    Sy = /\u0000|\uFFFD/g;
  function S0(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        by,
        `
`
      )
      .replace(Sy, '');
  }
  function x0(e, t) {
    return ((t = S0(t)), S0(e) === t);
  }
  function Ue(e, t, a, n, c, r) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || Ll(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && Ll(e, '' + n);
        break;
      case 'className':
        qc(e, 'class', n);
        break;
      case 'tabIndex':
        qc(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        qc(e, a, n);
        break;
      case 'style':
        xf(e, n, r);
        break;
      case 'data':
        if (t !== 'object') {
          qc(e, 'data', n);
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
        ((n = Gc('' + n)), e.setAttribute(a, n));
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
              ? (t !== 'input' && Ue(e, t, 'name', c.name, c, null),
                Ue(e, t, 'formEncType', c.formEncType, c, null),
                Ue(e, t, 'formMethod', c.formMethod, c, null),
                Ue(e, t, 'formTarget', c.formTarget, c, null))
              : (Ue(e, t, 'encType', c.encType, c, null),
                Ue(e, t, 'method', c.method, c, null),
                Ue(e, t, 'target', c.target, c, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = Gc('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = Ga);
        break;
      case 'onScroll':
        n != null && ve('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && ve('scrollend', e);
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
        ((a = Gc('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (ve('beforetoggle', e), ve('toggle', e), Uc(e, 'popover', n));
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
        Uc(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = W1.get(a) || a), Uc(e, a, n));
    }
  }
  function ou(e, t, a, n, c, r) {
    switch (a) {
      case 'style':
        xf(e, n, r);
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
          ? Ll(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && Ll(e, '' + n);
        break;
      case 'onScroll':
        n != null && ve('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && ve('scrollend', e);
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
        if (!mf.hasOwnProperty(a))
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
            a in e ? (e[a] = n) : n === !0 ? e.setAttribute(a, '') : Uc(e, a, n);
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
        (ve('error', e), ve('load', e));
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
                  Ue(e, t, r, h, a, null);
              }
          }
        (c && Ue(e, t, 'srcSet', a.srcSet, a, null), n && Ue(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        ve('invalid', e);
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
                  Ue(e, t, n, B, a, null);
              }
          }
        vf(e, r, v, S, N, h, c, !1);
        return;
      case 'select':
        (ve('invalid', e), (n = h = r = null));
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
                Ue(e, t, c, v, a, null);
            }
        ((t = r),
          (a = h),
          (e.multiple = !!n),
          t != null ? Bl(e, !!n, t, !1) : a != null && Bl(e, !!n, a, !0));
        return;
      case 'textarea':
        (ve('invalid', e), (r = c = n = null));
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
                Ue(e, t, h, v, a, null);
            }
        bf(e, n, c, r);
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
        (ve('beforetoggle', e), ve('toggle', e), ve('cancel', e), ve('close', e));
        break;
      case 'iframe':
      case 'object':
        ve('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < uc.length; n++) ve(uc[n], e);
        break;
      case 'image':
        (ve('error', e), ve('load', e));
        break;
      case 'details':
        ve('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (ve('error', e), ve('load', e));
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
                Ue(e, t, N, n, a, null);
            }
        return;
      default:
        if (xo(t)) {
          for (B in a)
            a.hasOwnProperty(B) && ((n = a[B]), n !== void 0 && ou(e, t, B, n, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((n = a[v]), n != null && Ue(e, t, v, n, a, null));
  }
  function xy(e, t, a, n) {
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
                r = C;
                break;
              case 'name':
                c = C;
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
                if (C != null) throw Error(o(137, t));
                break;
              default:
                C !== k && Ue(e, t, z, C, n, k);
            }
        }
        bo(e, h, v, S, N, B, r, c);
        return;
      case 'select':
        C = h = v = z = null;
        for (r in a)
          if (((S = a[r]), a.hasOwnProperty(r) && S != null))
            switch (r) {
              case 'value':
                break;
              case 'multiple':
                C = S;
              default:
                n.hasOwnProperty(r) || Ue(e, t, r, null, n, S);
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
                r !== S && Ue(e, t, c, r, n, S);
            }
        ((t = v),
          (a = h),
          (n = C),
          z != null
            ? Bl(e, !!a, z, !1)
            : !!n != !!a && (t != null ? Bl(e, !!a, t, !0) : Bl(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        C = z = null;
        for (v in a)
          if (((c = a[v]), a.hasOwnProperty(v) && c != null && !n.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Ue(e, t, v, null, n, c);
            }
        for (h in n)
          if (((c = n[h]), (r = a[h]), n.hasOwnProperty(h) && (c != null || r != null)))
            switch (h) {
              case 'value':
                z = c;
                break;
              case 'defaultValue':
                C = c;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (c != null) throw Error(o(91));
                break;
              default:
                c !== r && Ue(e, t, h, c, n, r);
            }
        _f(e, z, C);
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
                if (z != null) throw Error(o(137, t));
                break;
              default:
                Ue(e, t, N, z, n, C);
            }
        return;
      default:
        if (xo(t)) {
          for (var qe in a)
            ((z = a[qe]),
              a.hasOwnProperty(qe) &&
                z !== void 0 &&
                !n.hasOwnProperty(qe) &&
                ou(e, t, qe, void 0, n, z));
          for (B in n)
            ((z = n[B]),
              (C = a[B]),
              !n.hasOwnProperty(B) ||
                z === C ||
                (z === void 0 && C === void 0) ||
                ou(e, t, B, z, n, C));
          return;
        }
    }
    for (var M in a)
      ((z = a[M]),
        a.hasOwnProperty(M) && z != null && !n.hasOwnProperty(M) && Ue(e, t, M, null, n, z));
    for (k in n)
      ((z = n[k]),
        (C = a[k]),
        !n.hasOwnProperty(k) || z === C || (z == null && C == null) || Ue(e, t, k, z, n, C));
  }
  function j0(e) {
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
  function jy() {
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
        if (r && v && j0(h)) {
          for (h = 0, v = c.responseEnd, n += 1; n < a.length; n++) {
            var S = a[n],
              N = S.startTime;
            if (N > v) break;
            var B = S.transferSize,
              k = S.initiatorType;
            B && j0(k) && ((S = S.responseEnd), (h += B * (S < v ? 1 : (v - N) / (S - N))));
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
  var ru = null,
    uu = null;
  function Hs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function A0(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function T0(e, t) {
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
  function fu(e, t) {
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
  var du = null;
  function Ay() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === du ? !1 : ((du = e), !0)) : ((du = null), !1);
  }
  var M0 = typeof setTimeout == 'function' ? setTimeout : void 0,
    Ty = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    E0 = typeof Promise == 'function' ? Promise : void 0,
    My =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof E0 < 'u'
          ? function (e) {
              return E0.resolve(null).then(e).catch(Ey);
            }
          : M0;
  function Ey(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Cn(e) {
    return e === 'head';
  }
  function w0(e, t) {
    var a = t,
      n = 0;
    do {
      var c = a.nextSibling;
      if ((e.removeChild(a), c && c.nodeType === 8))
        if (((a = c.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (e.removeChild(c), mi(t));
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
    mi(t);
  }
  function N0(e, t) {
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
  function mu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (mu(a), vo(a));
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
  function wy(e, t, a, n) {
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
      if (((e = da(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Ny(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = da(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function z0(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = da(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function hu(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function pu(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function zy(e, t) {
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
  var yu = null;
  function C0(e) {
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
  function R0(e) {
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
  function O0(e, t, a) {
    switch (((t = Hs(a)), e)) {
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
    vo(e);
  }
  var ma = new Map(),
    D0 = new Set();
  function ks(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var cn = X.d;
  X.d = { f: Cy, r: Ry, D: Oy, C: Dy, L: By, m: Ly, X: Hy, S: $y, M: ky };
  function Cy() {
    var e = cn.f(),
      t = zs();
    return e || t;
  }
  function Ry(e) {
    var t = Rl(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Fd(t) : cn.r(e);
  }
  var ui = typeof document > 'u' ? null : document;
  function B0(e, t, a) {
    var n = ui;
    if (n && typeof t == 'string' && t) {
      var c = ia(t);
      ((c = 'link[rel="' + e + '"][href="' + c + '"]'),
        typeof a == 'string' && (c += '[crossorigin="' + a + '"]'),
        D0.has(c) ||
          (D0.add(c),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(c) === null &&
            ((t = n.createElement('link')), zt(t, 'link', e), St(t), n.head.appendChild(t))));
    }
  }
  function Oy(e) {
    (cn.D(e), B0('dns-prefetch', e, null));
  }
  function Dy(e, t) {
    (cn.C(e, t), B0('preconnect', e, t));
  }
  function By(e, t, a) {
    cn.L(e, t, a);
    var n = ui;
    if (n && e && t) {
      var c = 'link[rel="preload"][as="' + ia(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((c += '[imagesrcset="' + ia(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (c += '[imagesizes="' + ia(a.imageSizes) + '"]'))
        : (c += '[href="' + ia(e) + '"]');
      var r = c;
      switch (t) {
        case 'style':
          r = fi(e);
          break;
        case 'script':
          r = di(e);
      }
      ma.has(r) ||
        ((e = b(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        ma.set(r, e),
        n.querySelector(c) !== null ||
          (t === 'style' && n.querySelector(mc(r))) ||
          (t === 'script' && n.querySelector(hc(r))) ||
          ((t = n.createElement('link')), zt(t, 'link', e), St(t), n.head.appendChild(t)));
    }
  }
  function Ly(e, t) {
    cn.m(e, t);
    var a = ui;
    if (a && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        c = 'link[rel="modulepreload"][as="' + ia(n) + '"][href="' + ia(e) + '"]',
        r = c;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          r = di(e);
      }
      if (
        !ma.has(r) &&
        ((e = b({ rel: 'modulepreload', href: e }, t)), ma.set(r, e), a.querySelector(c) === null)
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
        ((n = a.createElement('link')), zt(n, 'link', e), St(n), a.head.appendChild(n));
      }
    }
  }
  function $y(e, t, a) {
    cn.S(e, t, a);
    var n = ui;
    if (n && e) {
      var c = Ol(n).hoistableStyles,
        r = fi(e);
      t = t || 'default';
      var h = c.get(r);
      if (!h) {
        var v = { loading: 0, preload: null };
        if ((h = n.querySelector(mc(r)))) v.loading = 5;
        else {
          ((e = b({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = ma.get(r)) && gu(e, a));
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
            Us(h, t, n));
        }
        ((h = { type: 'stylesheet', instance: h, count: 1, state: v }), c.set(r, h));
      }
    }
  }
  function Hy(e, t) {
    cn.X(e, t);
    var a = ui;
    if (a && e) {
      var n = Ol(a).hoistableScripts,
        c = di(e),
        r = n.get(c);
      r ||
        ((r = a.querySelector(hc(c))),
        r ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = ma.get(c)) && vu(e, t),
          (r = a.createElement('script')),
          St(r),
          zt(r, 'link', e),
          a.head.appendChild(r)),
        (r = { type: 'script', instance: r, count: 1, state: null }),
        n.set(c, r));
    }
  }
  function ky(e, t) {
    cn.M(e, t);
    var a = ui;
    if (a && e) {
      var n = Ol(a).hoistableScripts,
        c = di(e),
        r = n.get(c);
      r ||
        ((r = a.querySelector(hc(c))),
        r ||
          ((e = b({ src: e, async: !0, type: 'module' }, t)),
          (t = ma.get(c)) && vu(e, t),
          (r = a.createElement('script')),
          St(r),
          zt(r, 'link', e),
          a.head.appendChild(r)),
        (r = { type: 'script', instance: r, count: 1, state: null }),
        n.set(c, r));
    }
  }
  function L0(e, t, a, n) {
    var c = (c = fe.current) ? ks(c) : null;
    if (!c) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = fi(a.href)),
            (a = Ol(c).hoistableStyles),
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
          e = fi(a.href);
          var r = Ol(c).hoistableStyles,
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
                r || Uy(c, e, a, h.state))),
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
            ? ((t = di(a)),
              (a = Ol(c).hoistableScripts),
              (n = a.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function fi(e) {
    return 'href="' + ia(e) + '"';
  }
  function mc(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function $0(e) {
    return b({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function Uy(e, t, a, n) {
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
  function di(e) {
    return '[src="' + ia(e) + '"]';
  }
  function hc(e) {
    return 'script[async]' + e;
  }
  function H0(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + ia(a.href) + '"]');
          if (n) return ((t.instance = n), St(n), n);
          var c = b({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            St(n),
            zt(n, 'style', c),
            Us(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          c = fi(a.href);
          var r = e.querySelector(mc(c));
          if (r) return ((t.state.loading |= 4), (t.instance = r), St(r), r);
          ((n = $0(a)),
            (c = ma.get(c)) && gu(n, c),
            (r = (e.ownerDocument || e).createElement('link')),
            St(r));
          var h = r;
          return (
            (h._p = new Promise(function (v, S) {
              ((h.onload = v), (h.onerror = S));
            })),
            zt(r, 'link', n),
            (t.state.loading |= 4),
            Us(r, a.precedence, e),
            (t.instance = r)
          );
        case 'script':
          return (
            (r = di(a.src)),
            (c = e.querySelector(hc(r)))
              ? ((t.instance = c), St(c), c)
              : ((n = a),
                (c = ma.get(r)) && ((n = b({}, a)), vu(n, c)),
                (e = e.ownerDocument || e),
                (c = e.createElement('script')),
                St(c),
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
        ((n = t.instance), (t.state.loading |= 4), Us(n, a.precedence, e));
    return t.instance;
  }
  function Us(e, t, a) {
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
  function gu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function vu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var qs = null;
  function k0(e, t, a) {
    if (qs === null) {
      var n = new Map(),
        c = (qs = new Map());
      c.set(a, n);
    } else ((c = qs), (n = c.get(a)), n || ((n = new Map()), c.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), c = 0; c < a.length; c++) {
      var r = a[c];
      if (
        !(r[zi] || r[at] || (e === 'link' && r.getAttribute('rel') === 'stylesheet')) &&
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
  function U0(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function qy(e, t, a) {
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
  function q0(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function Vy(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var c = fi(n.href),
          r = t.querySelector(mc(c));
        if (r) {
          ((t = r._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Vs.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = r),
            St(r));
          return;
        }
        ((r = t.ownerDocument || t),
          (n = $0(n)),
          (c = ma.get(c)) && gu(n, c),
          (r = r.createElement('link')),
          St(r));
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
          (a = Vs.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var _u = 0;
  function Gy(e, t) {
    return (
      e.stylesheets && e.count === 0 && Ys(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Ys(e, e.stylesheets), e.unsuspend)) {
                var r = e.unsuspend;
                ((e.unsuspend = null), r());
              }
            }, 6e4 + t);
            0 < e.imgBytes && _u === 0 && (_u = 62500 * jy());
            var c = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Ys(e, e.stylesheets), e.unsuspend))
                ) {
                  var r = e.unsuspend;
                  ((e.unsuspend = null), r());
                }
              },
              (e.imgBytes > _u ? 50 : 800) + t
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
  function Vs() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Ys(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Gs = null;
  function Ys(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Gs = new Map()), t.forEach(Yy, e), (Gs = null), Vs.call(e)));
  }
  function Yy(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Gs.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), Gs.set(e, a));
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
        (n = Vs.bind(this)),
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
    _currentValue: le,
    _currentValue2: le,
    _threadCount: 0,
  };
  function Zy(e, t, a, n, c, r, h, v, S) {
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
      (this.onUncaughtError = c),
      (this.onCaughtError = r),
      (this.onRecoverableError = h),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = S),
      (this.incompleteTransitions = new Map()));
  }
  function V0(e, t, a, n, c, r, h, v, S, N, B, k) {
    return (
      (e = new Zy(e, t, a, h, S, N, B, k, v)),
      (t = 1),
      r === !0 && (t |= 24),
      (r = Qt(3, null, null, t)),
      (e.current = r),
      (r.stateNode = e),
      (t = Io()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (r.memoizedState = { element: n, isDehydrated: a, cache: t }),
      ar(r),
      e
    );
  }
  function G0(e) {
    return e ? ((e = Gl), e) : Gl;
  }
  function Y0(e, t, a, n, c, r) {
    ((c = G0(c)),
      n.context === null ? (n.context = c) : (n.pendingContext = c),
      (n = bn(t)),
      (n.payload = { element: a }),
      (r = r === void 0 ? null : r),
      r !== null && (n.callback = r),
      (a = Sn(e, n, t)),
      a !== null && (Xt(a, e, t), Ki(a, e, t)));
  }
  function Z0(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function bu(e, t) {
    (Z0(e, t), (e = e.alternate) && Z0(e, t));
  }
  function X0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ll(e, 67108864);
      (t !== null && Xt(t, e, 67108864), bu(e, 67108864));
    }
  }
  function K0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Pt();
      t = $t(t);
      var a = ll(e, t);
      (a !== null && Xt(a, e, t), bu(e, t));
    }
  }
  var Zs = !0;
  function Xy(e, t, a, n) {
    var c = O.T;
    O.T = null;
    var r = X.p;
    try {
      ((X.p = 2), Su(e, t, a, n));
    } finally {
      ((X.p = r), (O.T = c));
    }
  }
  function Ky(e, t, a, n) {
    var c = O.T;
    O.T = null;
    var r = X.p;
    try {
      ((X.p = 8), Su(e, t, a, n));
    } finally {
      ((X.p = r), (O.T = c));
    }
  }
  function Su(e, t, a, n) {
    if (Zs) {
      var c = xu(n);
      if (c === null) (su(e, t, n, Xs, a), W0(e, n));
      else if (Wy(c, e, t, a, n)) n.stopPropagation();
      else if ((W0(e, n), t & 4 && -1 < Qy.indexOf(e))) {
        for (; c !== null; ) {
          var r = Rl(c);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (((r = r.stateNode), r.current.memoizedState.isDehydrated)) {
                  var h = na(r.pendingLanes);
                  if (h !== 0) {
                    var v = r;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; h; ) {
                      var S = 1 << (31 - gt(h));
                      ((v.entanglements[1] |= S), (h &= ~S));
                    }
                    (Oa(r), (Ce & 6) === 0 && ((ws = Be() + 500), rc(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = ll(r, 2)), v !== null && Xt(v, r, 2), zs(), bu(r, 2));
            }
          if (((r = xu(n)), r === null && su(e, t, n, Xs, a), r === c)) break;
          c = r;
        }
        c !== null && n.stopPropagation();
      } else su(e, t, n, null, a);
    }
  }
  function xu(e) {
    return ((e = Ao(e)), ju(e));
  }
  var Xs = null;
  function ju(e) {
    if (((Xs = null), (e = Cl(e)), e !== null)) {
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
    return ((Xs = e), null);
  }
  function Q0(e) {
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
          case wi:
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
  var Au = !1,
    Rn = null,
    On = null,
    Dn = null,
    yc = new Map(),
    gc = new Map(),
    Bn = [],
    Qy =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function W0(e, t) {
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
        t !== null && ((t = Rl(t)), t !== null && X0(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        c !== null && t.indexOf(c) === -1 && t.push(c),
        e);
  }
  function Wy(e, t, a, n, c) {
    switch (t) {
      case 'focusin':
        return ((Rn = vc(Rn, e, t, a, n, c)), !0);
      case 'dragenter':
        return ((On = vc(On, e, t, a, n, c)), !0);
      case 'mouseover':
        return ((Dn = vc(Dn, e, t, a, n, c)), !0);
      case 'pointerover':
        var r = c.pointerId;
        return (yc.set(r, vc(yc.get(r) || null, e, t, a, n, c)), !0);
      case 'gotpointercapture':
        return ((r = c.pointerId), gc.set(r, vc(gc.get(r) || null, e, t, a, n, c)), !0);
    }
    return !1;
  }
  function J0(e) {
    var t = Cl(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = m(a)), t !== null)) {
            ((e.blockedOn = t),
              _e(e.priority, function () {
                K0(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = p(a)), t !== null)) {
            ((e.blockedOn = t),
              _e(e.priority, function () {
                K0(a);
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
  function Ks(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = xu(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((jo = n), a.target.dispatchEvent(n), (jo = null));
      } else return ((t = Rl(a)), t !== null && X0(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function F0(e, t, a) {
    Ks(e) && a.delete(t);
  }
  function Jy() {
    ((Au = !1),
      Rn !== null && Ks(Rn) && (Rn = null),
      On !== null && Ks(On) && (On = null),
      Dn !== null && Ks(Dn) && (Dn = null),
      yc.forEach(F0),
      gc.forEach(F0));
  }
  function Qs(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Au || ((Au = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, Jy)));
  }
  var Ws = null;
  function I0(e) {
    Ws !== e &&
      ((Ws = e),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        Ws === e && (Ws = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            c = e[t + 2];
          if (typeof n != 'function') {
            if (ju(n || a) === null) continue;
            break;
          }
          var r = Rl(a);
          r !== null &&
            (e.splice(t, 3),
            (t -= 3),
            xr(r, { pending: !0, data: c, method: a.method, action: n }, n, c));
        }
      }));
  }
  function mi(e) {
    function t(S) {
      return Qs(S, e);
    }
    (Rn !== null && Qs(Rn, e),
      On !== null && Qs(On, e),
      Dn !== null && Qs(Dn, e),
      yc.forEach(t),
      gc.forEach(t));
    for (var a = 0; a < Bn.length; a++) {
      var n = Bn[a];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < Bn.length && ((a = Bn[0]), a.blockedOn === null); )
      (J0(a), a.blockedOn === null && Bn.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var c = a[n],
          r = a[n + 1],
          h = c[Mt] || null;
        if (typeof r == 'function') h || I0(a);
        else if (h) {
          var v = null;
          if (r && r.hasAttribute('formAction')) {
            if (((c = r), (h = r[Mt] || null))) v = h.formAction;
            else if (ju(c) !== null) continue;
          } else v = h.action;
          (typeof v == 'function' ? (a[n + 1] = v) : (a.splice(n, 3), (n -= 3)), I0(a));
        }
      }
  }
  function P0() {
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
  function Tu(e) {
    this._internalRoot = e;
  }
  ((Js.prototype.render = Tu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var a = t.current,
        n = Pt();
      Y0(a, n, e, t, null, null);
    }),
    (Js.prototype.unmount = Tu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Y0(e.current, 2, null, e, null, null), zs(), (t[Na] = null));
        }
      }));
  function Js(e) {
    this._internalRoot = e;
  }
  Js.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = he();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Bn.length && t !== 0 && t < Bn[a].priority; a++);
      (Bn.splice(a, 0, e), a === 0 && J0(e));
    }
  };
  var eh = i.version;
  if (eh !== '19.2.5') throw Error(o(527, eh, '19.2.5'));
  X.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return ((e = y(t)), (e = e !== null ? _(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var Fy = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: O,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Fs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Fs.isDisabled && Fs.supportsFiber)
      try {
        ((wa = Fs.inject(Fy)), (yt = Fs));
      } catch {}
  }
  return (
    (bc.createRoot = function (e, t) {
      if (!f(e)) throw Error(o(299));
      var a = !1,
        n = '',
        c = sm,
        r = om,
        h = rm;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (c = t.onUncaughtError),
          t.onCaughtError !== void 0 && (r = t.onCaughtError),
          t.onRecoverableError !== void 0 && (h = t.onRecoverableError)),
        (t = V0(e, 1, !1, null, null, a, n, null, c, r, h, P0)),
        (e[Na] = t.current),
        cu(e),
        new Tu(t)
      );
    }),
    (bc.hydrateRoot = function (e, t, a) {
      if (!f(e)) throw Error(o(299));
      var n = !1,
        c = '',
        r = sm,
        h = om,
        v = rm,
        S = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (c = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (r = a.onUncaughtError),
          a.onCaughtError !== void 0 && (h = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (S = a.formState)),
        (t = V0(e, 1, !0, t, a ?? null, n, c, S, r, h, v, P0)),
        (t.context = G0(null)),
        (a = t.current),
        (n = Pt()),
        (n = $t(n)),
        (c = bn(n)),
        (c.callback = null),
        Sn(a, c, n),
        (a = n),
        (t.current.lanes = a),
        W(t, a),
        Oa(t),
        (e[Na] = t.current),
        cu(e),
        new Js(t)
      );
    }),
    (bc.version = '19.2.5'),
    bc
  );
}
var uh;
function ug() {
  if (uh) return Eu.exports;
  uh = 1;
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
  return (l(), (Eu.exports = rg()), Eu.exports);
}
var fg = ug(),
  q = tf();
const Is = tg(q);
function dg(l) {
  return 440 * Math.pow(2, (l - 69) / 12);
}
const mg = {
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
  const s = mg[i[1]];
  if (s === void 0) throw new Error(`Invalid note name: ${i[1]}`);
  const f = 12 + parseInt(i[2], 10) * 12 + s;
  return dg(f);
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
const hg = [L('A2'), L('C3'), L('E3')],
  pg = [L('E2'), L('G2'), L('B2')];
(L('D3'), L('F3'), L('A3'));
const yg = [L('G2'), L('B2'), L('D3')],
  gg = [L('C3'), L('E3'), L('G3')],
  vg = [L('B2'), L('D3'), L('F3')];
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
    const E = l.createBiquadFilter();
    ((E.type = 'lowpass'),
      (E.frequency.value = p),
      (E.Q.value = 0.8),
      y.connect(E).connect(_).connect(i));
  } else y.connect(_).connect(i);
  (y.start(f), y.stop(f + d + 0.02), g == null || g.push(y));
}
function Bc(l, i) {
  const s = Math.max(1, Math.floor(l.sampleRate * i)),
    o = l.createBuffer(1, s, l.sampleRate),
    f = o.getChannelData(0);
  let d = 74565;
  for (let m = 0; m < s; m++)
    ((d = (d * 1664525 + 1013904223) & 4294967295), (f[m] = d / 2147483648 - 1));
  return o;
}
function Dc(l, i, s, o, f) {
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
  p.buffer = Bc(l, 0.04);
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
function _g(l, i, s, o, f, d) {
  const m = l.createBufferSource();
  m.buffer = Bc(l, f + 0.01);
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
const bg = 100,
  xl = 60 / bg,
  Rc = xl * 4,
  Fh = 8,
  Sg = Rc * Fh,
  xg = 2,
  jg = 100,
  Ag = [L('A2'), L('A2'), L('G2'), L('G2'), L('C3'), L('C3'), L('E2'), L('E2')],
  fh = [L('A3'), L('C4'), L('E4'), L('A4'), L('G4'), L('E4'), L('C4'), L('A3')],
  dh = [
    [L('A3'), L('C4'), L('E4')],
    [L('G3'), L('B3'), L('D4')],
    [L('C3'), L('E3'), L('G3')],
    [L('E3'), L('G3'), L('B3')],
  ];
function Tg(l, i, s, o) {
  for (let f = 0; f < Fh; f++) {
    const d = s + f * Rc,
      m = Ag[f];
    (ya(l, i, 'sawtooth', m, d, xl * 1.8, 0.22, 300, o),
      ya(l, i, 'sawtooth', m, d + xl * 2, xl * 1.8, 0.22, 300, o),
      Dc(l, i, d, 0.35, o),
      Dc(l, i, d + xl * 2, 0.28, o));
    for (let p = 0; p < 8; p++) {
      const g = (f * 8 + p) % fh.length,
        y = d + p * xl * 0.5;
      ya(l, i, 'square', fh[g], y, xl * 0.4, 0.07, 2400, o);
    }
  }
  for (let f = 0; f < dh.length; f++) {
    const d = dh[f],
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
function Mg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + xg * Rc;
    for (; s < p; ) (Tg(l, i, s, f), (s += Sg));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, jg)));
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
const Eg = 100,
  on = 60 / Eg,
  af = on * 4,
  Ih = 8,
  Vn = af * Ih,
  wg = 2,
  Ng = 100,
  mh = [L('E5'), L('D5'), L('B4'), L('G4'), L('F#4'), L('E4'), L('D4'), L('B3')];
function hh(l, i, s, o, f) {
  const d = l.createBufferSource();
  d.buffer = Bc(l, 0.2);
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
function zg(l, i, s, o) {
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
      d.connect(g).connect(m).connect(i),
      d.start(s),
      d.stop(s + Vn + 0.05),
      o.push(d));
  }
  for (let d = 0; d < Ih; d++) {
    const m = s + d * af;
    for (let p = 0; p < 4; p++) {
      const g = m + p * on;
      (ya(l, i, 'sawtooth', L('E2'), g, on * 0.9, 0.22, 400, o),
        ya(l, i, 'sawtooth', L('B2'), g, on * 0.8, 0.1, 600, o));
    }
    (Dc(l, i, m, 0.5, o),
      Dc(l, i, m + on * 2, 0.45, o),
      hh(l, i, m + on, 0.4, o),
      hh(l, i, m + on * 3, 0.38, o));
  }
  const f = [...vg, L('C4')];
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
      m.connect(y).connect(p).connect(i),
      m.start(s),
      m.stop(s + Vn + 0.05),
      o.push(m));
  }
  for (let d = 0; d < mh.length; d++) {
    const m = s + d * on * 2;
    ya(l, i, 'sawtooth', mh[d], m, on * 1.6, 0.08, 2e3, o);
  }
  {
    const d = l.createBufferSource();
    d.buffer = Bc(l, Vn + 0.1);
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
function Cg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + wg * af;
    for (; s < p; ) (zg(l, i, s, f), (s += Vn));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, Ng)));
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
const Rg = 120,
  rn = 60 / Rg,
  nf = rn * 4,
  Ph = 8,
  no = nf * Ph,
  Og = 2,
  Dg = 100,
  Bg = [L('E2'), L('E2'), L('D2'), L('D2'), L('E2'), L('E2'), L('B1'), L('B1')],
  ph = [
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
function yh(l, i, s, o, f) {
  const d = l.createBufferSource();
  d.buffer = Bc(l, 0.15);
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
function Lg(l, i, s, o) {
  for (let d = 0; d < Ph; d++) {
    const m = s + d * nf,
      p = Bg[d];
    for (let g = 0; g < 4; g++) ya(l, i, 'sawtooth', p, m + g * rn, rn * 0.85, 0.26, 280, o);
    for (let g = 0; g < 4; g++) Dc(l, i, m + g * rn, 0.42, o);
    (yh(l, i, m + rn, 0.3, o), yh(l, i, m + rn * 3, 0.3, o));
    for (let g = 0; g < 8; g++) _g(l, i, m + g * rn * 0.5, 0.12, 0.08, o);
    for (let g = 0; g < 16; g++) {
      const y = (d * 16 + g) % ph.length,
        _ = m + g * rn * 0.25;
      ya(l, i, 'sawtooth', ph[y], _, rn * 0.22, 0.06, 3200, o);
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
      p.gain.setValueAtTime(0.06, s + no - 0.3),
      p.gain.exponentialRampToValueAtTime(1e-4, s + no));
    const g = l.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 1200),
      m.connect(g).connect(p).connect(i),
      m.start(s),
      m.stop(s + no + 0.05),
      o.push(m));
  }
}
function $g(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + Og * nf;
    for (; s < p; ) (Lg(l, i, s, f), (s += no));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, Dg)));
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
const Hg = 80,
  lo = 60 / Hg,
  co = lo * 4,
  kg = 8,
  io = co * kg,
  Ug = 2,
  qg = 100,
  gh = [hg, gg, yg, pg],
  Ru = [L('A3'), L('C4'), L('E4'), L('G4'), L('A4'), L('E4')];
function Vg(l, i, s, o) {
  {
    const f = l.createOscillator(),
      d = l.createGain();
    ((f.type = 'sine'), f.frequency.setValueAtTime(L('A2'), s));
    const m = 0.28;
    (d.gain.setValueAtTime(1e-4, s),
      d.gain.linearRampToValueAtTime(m, s + 0.5),
      d.gain.setValueAtTime(m, s + io - 0.5),
      d.gain.linearRampToValueAtTime(1e-4, s + io));
    const p = l.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 180),
      f.connect(p).connect(d).connect(i),
      f.start(s),
      f.stop(s + io + 0.05),
      o.push(f));
  }
  for (let f = 0; f < gh.length; f++) {
    const d = gh[f],
      m = s + f * co * 2,
      p = co * 2;
    for (const g of d) {
      const y = l.createOscillator(),
        _ = l.createGain();
      ((y.type = 'triangle'), y.frequency.setValueAtTime(g, m));
      const b = 0.1,
        A = 0.4,
        E = 0.6;
      (_.gain.setValueAtTime(1e-4, m),
        _.gain.linearRampToValueAtTime(b, m + A),
        _.gain.setValueAtTime(b, m + p - E),
        _.gain.exponentialRampToValueAtTime(1e-4, m + p));
      const T = l.createDelay(0.5);
      T.delayTime.value = 0.25;
      const D = l.createGain();
      D.gain.value = 0.2;
      const R = l.createBiquadFilter();
      ((R.type = 'lowpass'),
        (R.frequency.value = 2e3),
        y.connect(_).connect(i),
        y.connect(T).connect(R).connect(D).connect(i),
        y.start(m),
        y.stop(m + p + 0.5),
        o.push(y));
    }
  }
  for (let f = 0; f < Ru.length; f++) {
    const d = s + f * lo * 2;
    (ya(l, i, 'sawtooth', Ru[f], d, lo * 1.5, 0.09, 1800, o),
      ya(l, i, 'sine', Ru[f] * 0.5, d + 0.12, lo * 1.2, 0.05, 600, o));
  }
}
function Gg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + Ug * co;
    for (; s < p; ) (Vg(l, i, s, f), (s += io));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, qg)));
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
function Yg(l, i, s) {
  switch (l) {
    case 'title':
      return Gg(i, s);
    case 'base':
      return Mg(i, s);
    case 'battleNormal':
      return $g(i, s);
    case 'battleBoss':
      return Cg(i, s);
  }
}
function Zg(l, i) {
  const s = Math.max(1, Math.floor(l.sampleRate * i)),
    o = l.createBuffer(1, s, l.sampleRate),
    f = o.getChannelData(0);
  for (let d = 0; d < s; d++) f[d] = Math.random() * 2 - 1;
  return o;
}
function Ta(l, i, s, o, f) {
  const d = l.gain;
  (d.setValueAtTime(1e-4, i),
    d.linearRampToValueAtTime(s, i + o),
    d.exponentialRampToValueAtTime(1e-4, i + o + f));
}
function xe(l, i, s, o, f, d, m, p, g) {
  const y = l.createOscillator(),
    _ = l.createGain();
  ((y.type = s),
    y.frequency.setValueAtTime(o, f),
    g !== void 0 && y.frequency.exponentialRampToValueAtTime(Math.max(1e-4, g), f + m + p),
    Ta(_, f, d, m, p),
    y.connect(_).connect(i),
    y.start(f),
    y.stop(f + m + p + 0.02));
}
function Ma(l, i, s, o, f, d) {
  const m = l.createBufferSource();
  m.buffer = Zg(l, s);
  const p = l.createGain();
  if ((Ta(p, o, f, 0.002, s), d)) {
    const g = l.createBiquadFilter();
    ((g.type = d.type),
      (g.frequency.value = d.frequency),
      d.q !== void 0 && (g.Q.value = d.q),
      m.connect(g).connect(p).connect(i));
  } else m.connect(p).connect(i);
  m.start(o);
}
const Xg = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createOscillator(),
      d = l.createGain();
    ((o.type = 'sawtooth'),
      (f.type = 'sawtooth'),
      o.frequency.setValueAtTime(900, s),
      o.frequency.exponentialRampToValueAtTime(1500, s + 0.5),
      f.frequency.setValueAtTime(905, s),
      f.frequency.exponentialRampToValueAtTime(1510, s + 0.5),
      Ta(d, s, 0.28, 0.02, 0.5),
      o.connect(d),
      f.connect(d),
      d.connect(i),
      o.start(s),
      f.start(s),
      o.stop(s + 0.55),
      f.stop(s + 0.55));
  },
  Kg = (l, i, s) => {
    for (let o = 0; o < 4; o++) {
      const f = s + o * 0.12;
      (xe(l, i, 'sine', 110, f, 0.4, 0.005, 0.18, 35),
        Ma(l, i, 0.08, f, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  Qg = (l, i, s) => {
    (Ma(l, i, 0.4, s, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      xe(l, i, 'triangle', 3e3, s, 0.25, 0.005, 0.15, 1500),
      xe(l, i, 'sawtooth', 200, s + 0.05, 0.18, 0.005, 0.3, 80));
  },
  Wg = (l, i, s) => {
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
        Ta(m, f, 0.2, 0.002, 0.06),
        d.connect(p).connect(m).connect(i),
        d.start(f),
        d.stop(f + 0.08));
    }
  },
  Jg = (l, i, s) => {
    (Ma(l, i, 0.1, s, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      xe(l, i, 'triangle', 500, s, 0.18, 0.003, 0.08, 200));
  },
  Fg = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(80, s),
      o.frequency.linearRampToValueAtTime(160, s + 0.8),
      Ta(f, s, 0.3, 0.1, 0.7),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.85),
      xe(l, i, 'square', 320, s + 0.2, 0.15, 0.02, 0.4));
  },
  Ig = (l, i, s) => {
    (Ma(l, i, 0.5, s, 0.45, { type: 'lowpass', frequency: 1200 }),
      xe(l, i, 'sine', 90, s, 0.5, 0.005, 0.6, 30),
      xe(l, i, 'triangle', 1200, s + 0.1, 0.2, 0.02, 0.4, 2400),
      xe(l, i, 'triangle', 1600, s + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  Pg = (l, i, s) => {
    (xe(l, i, 'sine', 180, s, 0.3, 0.005, 0.12, 60),
      Ma(l, i, 0.08, s, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  ev = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(220, s),
      o.frequency.exponentialRampToValueAtTime(40, s + 1.2),
      Ta(f, s, 0.45, 0.02, 1.2),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 1.3),
      Ma(l, i, 0.8, s, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  tv = (l, i, s) => {
    (xe(l, i, 'triangle', 700, s, 0.22, 0.01, 0.18),
      xe(l, i, 'triangle', 1050, s + 0.12, 0.22, 0.01, 0.22));
  },
  av = (l, i, s) => {
    (xe(l, i, 'triangle', 600, s, 0.25, 0.01, 0.2),
      xe(l, i, 'triangle', 900, s + 0.12, 0.25, 0.01, 0.2),
      xe(l, i, 'triangle', 1350, s + 0.24, 0.3, 0.01, 0.45),
      xe(l, i, 'sine', 2400, s + 0.3, 0.15, 0.02, 0.5));
  },
  nv = (l, i, s) => {
    (xe(l, i, 'triangle', 600, s, 0.28, 0.01, 0.18),
      xe(l, i, 'triangle', 750, s + 0.12, 0.28, 0.01, 0.18),
      xe(l, i, 'triangle', 900, s + 0.24, 0.28, 0.01, 0.22),
      xe(l, i, 'triangle', 1200, s + 0.36, 0.32, 0.01, 0.5),
      xe(l, i, 'sine', 2400, s + 0.42, 0.18, 0.02, 0.6));
  },
  lv = (l, i, s) => {
    (xe(l, i, 'sawtooth', 300, s, 0.3, 0.02, 0.4, 220),
      xe(l, i, 'sawtooth', 220, s + 0.35, 0.3, 0.02, 0.5, 160),
      xe(l, i, 'sawtooth', 160, s + 0.8, 0.3, 0.02, 0.7, 80),
      Ma(l, i, 1, s, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  iv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(700, s),
      o.frequency.exponentialRampToValueAtTime(400, s + 0.4),
      Ta(f, s, 0.22, 0.02, 0.4),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.45),
      Ma(l, i, 0.5, s, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  cv = (l, i, s) => {
    xe(l, i, 'triangle', 1e3, s, 0.18, 0.003, 0.05);
  },
  sv = (l, i, s) => {
    (xe(l, i, 'triangle', 880, s, 0.2, 0.005, 0.08),
      xe(l, i, 'triangle', 1320, s + 0.06, 0.2, 0.005, 0.12));
  },
  ov = (l, i, s) => {
    (xe(l, i, 'square', 260, s, 0.18, 0.005, 0.07),
      xe(l, i, 'square', 200, s + 0.06, 0.18, 0.005, 0.1));
  },
  rv = (l, i, s) => {
    xe(l, i, 'triangle', 1400, s, 0.12, 0.003, 0.04);
  },
  uv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(500, s),
      o.frequency.exponentialRampToValueAtTime(1e3, s + 0.12),
      Ta(f, s, 0.18, 0.01, 0.12),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.15));
  },
  fv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(1e3, s),
      o.frequency.exponentialRampToValueAtTime(500, s + 0.1),
      Ta(f, s, 0.16, 0.005, 0.1),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.13));
  },
  dv = (l, i, s) => {
    (xe(l, i, 'sawtooth', 200, s, 0.3, 0.01, 0.35, 80),
      xe(l, i, 'triangle', 600, s + 0.05, 0.22, 0.01, 0.3, 1200),
      xe(l, i, 'triangle', 1200, s + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  mv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(1600, s),
      o.frequency.exponentialRampToValueAtTime(700, s + 0.08),
      (d.type = 'highpass'),
      (d.frequency.value = 800),
      Ta(f, s, 0.22, 0.003, 0.09),
      o.connect(d).connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.12));
  },
  hv = (l, i, s) => {
    (xe(l, i, 'sine', 130, s, 0.5, 0.01, 0.28, 40),
      Ma(l, i, 0.12, s, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  pv = (l, i, s) => {
    (Ma(l, i, 0.18, s, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      xe(l, i, 'triangle', 2200, s, 0.15, 0.002, 0.06, 1800));
  },
  yv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((o.type = 'square'),
      o.frequency.setValueAtTime(900, s),
      o.frequency.exponentialRampToValueAtTime(1400, s + 0.05),
      (d.type = 'bandpass'),
      (d.frequency.value = 1500),
      (d.Q.value = 3),
      Ta(f, s, 0.18, 0.002, 0.07),
      o.connect(d).connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.1),
      Ma(l, i, 0.05, s, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  gv = (l, i, s) => {
    (xe(l, i, 'triangle', 700, s, 0.18, 0.005, 0.05),
      xe(l, i, 'triangle', 1050, s + 0.04, 0.18, 0.005, 0.06));
  },
  vv = {
    laserShoot: mv,
    cannonShoot: hv,
    thunderShoot: pv,
    cutterShoot: yv,
    weaponSwitch: gv,
    activeLaser: Xg,
    activeCannon: Kg,
    activeThunder: Qg,
    activeCutter: Wg,
    enemyKill: Jg,
    bossWarn: Fg,
    bossKill: Ig,
    machineHit: Pg,
    machineDown: ev,
    waveClear: tv,
    tierClear: av,
    tap: cv,
    purchaseOk: sv,
    reject: ov,
    tabSwitch: rv,
    dialogOpen: uv,
    dialogClose: fv,
    launch: dv,
    resultClear: nv,
    resultGameOver: lv,
    resultRetreat: iv,
  },
  _v = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function vh(l) {
  return Math.max(0, Math.min(1, l));
}
class bv {
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
      o = _v[i];
    if (o !== void 0) {
      const d = this.lastPlayAt.get(i) ?? 0;
      if (s - d < o) return;
      this.lastPlayAt.set(i, s);
    }
    const f = vv[i];
    f(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(i) {
    ((this.seVolume = vh(i)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(i) {
    ((this.bgmVolume = vh(i)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
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
    const s = Yg(i, this.ctx, this.bgmGain);
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
const Xe = new bv(),
  Sv = '_content_11wqi_1',
  xv = { content: Sv },
  jv = '_tabBar_rhd8d_2',
  Av = '_fullWidth_rhd8d_9',
  Tv = '_tab_rhd8d_2',
  Mv = '_tabActive_rhd8d_54',
  Ev = '_tabDisabled_rhd8d_101',
  wv = '_tabIcon_rhd8d_107',
  Nv = '_tabLabel_rhd8d_114',
  zv = '_badge_rhd8d_119',
  Cv = '_badgeActive_rhd8d_137',
  Rv = '_indicator_rhd8d_158',
  ea = {
    tabBar: jv,
    fullWidth: Av,
    tab: Tv,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: Mv,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: Ev,
    tabIcon: wv,
    tabLabel: Nv,
    badge: zv,
    badgeActive: Cv,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Rv,
  },
  Ov = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Dv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Bv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Lv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  $v = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Hv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  kv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Uv = { screw: Hv, bolt: Dv, alloy: Ov, laser: $v, cannon: Bv, thunder: kv, cutter: Lv };
function qv(l, i) {
  return l.replace(/\swidth="\d+"/, ` width="${i}"`).replace(/\sheight="\d+"/, ` height="${i}"`);
}
function Ye({ name: l, size: i = 16, color: s = 'currentColor', className: o }) {
  const f = Uv[l];
  if (f)
    return u.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: s, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: qv(f, i) },
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
      const b = l.findIndex((R) => R.key === i);
      if (b < 0) return;
      const E = _.querySelectorAll('[role="tab"]')[b];
      if (!E) return;
      const T = _.getBoundingClientRect(),
        D = E.getBoundingClientRect();
      y({ left: D.left - T.left, width: D.width });
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
const Vv = '_shell_ka520_6',
  Gv = '_header_ka520_19',
  Yv = '_main_ka520_32',
  Zv = '_noScroll_ka520_43',
  Xv = '_footer_ka520_48',
  Kv = '_battle_ka520_61',
  hi = { shell: Vv, header: Gv, main: Yv, noScroll: Zv, footer: Xv, battle: Kv };
function El({ header: l, footer: i, children: s, noScroll: o = !1, variant: f = 'default' }) {
  return u.jsxs('div', {
    className: [hi.shell, f === 'battle' ? hi.battle : ''].filter(Boolean).join(' '),
    children: [
      l != null && u.jsx('header', { className: hi.header, children: l }),
      u.jsx('main', {
        className: [hi.main, o ? hi.noScroll : ''].filter(Boolean).join(' '),
        children: s,
      }),
      i != null && u.jsx('footer', { className: hi.footer, children: i }),
    ],
  });
}
const Qv = '_nav_4erx0_2',
  Wv = '_tab_4erx0_10',
  Jv = '_active_4erx0_33',
  Fv = '_iconWrap_4erx0_38',
  Iv = '_badge_4erx0_51',
  Sc = { nav: Qv, tab: Wv, active: Jv, iconWrap: Fv, badge: Iv },
  Pv = '_text_1wy1n_1',
  e_ = '_variant_heading_1_1wy1n_6',
  t_ = '_variant_heading_2_1wy1n_15',
  a_ = '_variant_heading_3_1wy1n_24',
  n_ = '_variant_body_1wy1n_33',
  l_ = '_variant_caption_1wy1n_41',
  i_ = '_variant_label_1wy1n_49',
  c_ = '_variant_numeric_l_1wy1n_58',
  s_ = '_variant_numeric_m_1wy1n_67',
  o_ = '_variant_numeric_s_1wy1n_76',
  r_ = '_color_default_1wy1n_85',
  u_ = '_color_mid_1wy1n_89',
  f_ = '_color_dim_1wy1n_93',
  d_ = '_color_disabled_1wy1n_97',
  m_ = '_color_primary_1wy1n_101',
  h_ = '_color_secondary_1wy1n_105',
  p_ = '_color_danger_1wy1n_109',
  y_ = '_color_success_1wy1n_113',
  g_ = '_color_warning_1wy1n_117',
  v_ = '_truncate_1wy1n_121',
  __ = '_align_left_1wy1n_128',
  b_ = '_align_center_1wy1n_132',
  S_ = '_align_right_1wy1n_136',
  xc = {
    text: Pv,
    variant_heading_1: e_,
    variant_heading_2: t_,
    variant_heading_3: a_,
    variant_body: n_,
    variant_caption: l_,
    variant_label: i_,
    variant_numeric_l: c_,
    variant_numeric_m: s_,
    variant_numeric_s: o_,
    color_default: r_,
    color_mid: u_,
    color_dim: f_,
    color_disabled: d_,
    color_primary: m_,
    color_secondary: h_,
    color_danger: p_,
    color_success: y_,
    color_warning: g_,
    truncate: v_,
    align_left: __,
    align_center: b_,
    align_right: S_,
  };
function x_(l) {
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
  const g = s ?? x_(l),
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
const j_ = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function Lc({ active: l, onChange: i, badges: s }) {
  return u.jsx('nav', {
    className: Sc.nav,
    'aria-label': 'メインナビゲーション',
    children: j_.map(({ key: o, label: f, iconName: d }) => {
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
const A_ = '_root_kv5uk_2',
  T_ = '_titleRow_kv5uk_8',
  M_ = '_left_kv5uk_17',
  E_ = '_center_kv5uk_24',
  w_ = '_right_kv5uk_33',
  N_ = '_currencies_kv5uk_42',
  z_ = '_actions_kv5uk_49',
  C_ = '_tabBarSlot_kv5uk_56',
  $n = {
    root: A_,
    titleRow: T_,
    left: M_,
    center: E_,
    right: w_,
    currencies: N_,
    actions: z_,
    tabBarSlot: C_,
  },
  R_ = '_root_i843c_2',
  O_ = '_icon_i843c_10',
  D_ = '_delta_i843c_30',
  B_ = '_deltaSm_i843c_37',
  L_ = '_deltaMd_i843c_41',
  $_ = '_deltaLg_i843c_45',
  H_ = '_subtle_i843c_50',
  k_ = '_currencyLabel_i843c_55',
  U_ = '_rankStamp_i843c_64',
  Da = {
    root: R_,
    icon: O_,
    delta: D_,
    deltaSm: B_,
    deltaMd: L_,
    deltaLg: $_,
    subtle: H_,
    currencyLabel: k_,
    rankStamp: U_,
  },
  q_ = '_root_1wxcz_1',
  V_ = '_sizeSm_1wxcz_13',
  G_ = '_sizeMd_1wxcz_17',
  Y_ = '_sizeLg_1wxcz_21',
  Z_ = '_sizeXl_1wxcz_25',
  X_ = '_affix_1wxcz_29',
  gl = { root: q_, sizeSm: V_, sizeMd: G_, sizeLg: Y_, sizeXl: Z_, affix: X_ };
function Yu(l) {
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
  return Yu(l);
}
function K_(l, i) {
  for (; i !== 0; ) {
    const s = i;
    ((i = l % i), (l = s));
  }
  return l;
}
function Q_(l) {
  const i = l.toString(),
    s = i.indexOf('.');
  if (s === -1) return { num: Math.round(l), den: 1 };
  const o = i.length - s - 1,
    f = Math.pow(10, o),
    d = Math.round(l * f),
    m = K_(Math.abs(d), f);
  return { num: d / m, den: f / m };
}
function W_(l) {
  let i = '',
    s = l;
  for (; s > 0; )
    ((s -= 1), (i = String.fromCharCode(65 + (s % 26)) + i), (s = Math.floor(s / 26)));
  return i;
}
const Bt = class Bt {
  constructor(i) {
    Sa(this, 'digits');
    this.digits = i;
  }
  static fromNumber(i) {
    if (i <= 0) return Bt.ZERO;
    const s = [];
    let o = Math.floor(i);
    for (; o > 0; ) (s.push(o % 1e3), (o = Math.floor(o / 1e3)));
    return new Bt(Yu(s));
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
    return new Bt(Yu(o));
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
    const { num: s, den: o } = Q_(i);
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
      f = W_(o),
      d = this.digits[i - 2] ?? 0,
      m = Math.floor(d / 10);
    return `${s}.${String(m).padStart(2, '0')}${f}`;
  }
};
Sa(Bt, 'ZERO', new Bt([]));
let Q = Bt;
function J_(l) {
  if (l === '') return 0;
  let i = 0;
  for (let s = 0; s < l.length; s++) i = i * 26 + (l.charCodeAt(s) - 65 + 1);
  return i;
}
function F_(l) {
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
function I_(l) {
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
function P_(l) {
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
  size: i = 'md',
  accentColor: s = 'scale',
  glow: o = !1,
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
    A = J_(b);
  let E, T;
  if (s === 'scale') {
    const Z = F_(A);
    ((E = Z.color), (T = o ? Z.glow : void 0));
  } else ((E = I_(s)), (T = o ? P_(s) : void 0));
  const D = { sm: gl.sizeSm, md: gl.sizeMd, lg: gl.sizeLg, xl: gl.sizeXl }[i],
    R = { color: E, ...(T != null ? { textShadow: T } : {}), ...p };
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
const eb = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  tb = { sm: 12, md: 16, lg: 22, xl: 28 };
function ab({ delta: l, sizeClass: i }) {
  const s = l === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return u.jsx('span', {
    className: `${Da.delta} ${i}`,
    style: { color: s },
    'aria-hidden': 'true',
    children: l,
  });
}
function Ti({
  currency: l,
  value: i,
  size: s = 'md',
  delta: o,
  showLabel: f,
  subtle: d,
  align: m = 'start',
  ranked: p,
}) {
  const g = typeof i == 'number' ? Q.fromNumber(i) : i,
    y = eb[l],
    _ = d ? 'var(--c-text-disabled)' : `var(${y.cssVar})`,
    b = o && !d ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: _ },
    A = { sm: Da.deltaSm, md: Da.deltaMd, lg: Da.deltaLg, xl: Da.deltaLg }[s],
    E = u.jsx(Ye, { name: l, size: tb[s], color: _, className: Da.icon }),
    T = u.jsxs(u.Fragment, {
      children: [
        o !== void 0 && !d && u.jsx(ab, { delta: o, sizeClass: A }),
        u.jsx(Yn, { value: g, size: s, accentColor: 'primary', style: b }),
      ],
    });
  return u.jsxs('span', {
    className: [Da.root, d ? Da.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${y.label} ${g.toDisplay()}`,
    children: [
      m === 'end'
        ? u.jsxs(u.Fragment, { children: [T, E] })
        : u.jsxs(u.Fragment, { children: [E, T] }),
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
const nb = '_iconButton_1fyi8_1',
  lb = '_round_1fyi8_23',
  ib = '_active_1fyi8_85',
  cb = '_iconWrap_1fyi8_113',
  pi = {
    iconButton: nb,
    round: lb,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: ib,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: cb,
  },
  sb = { sm: 14, md: 18, lg: 22 };
function Oc({
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
    y = typeof l == 'string' ? u.jsx(Ye, { name: l, size: sb[s] }) : l;
  return u.jsx('button', {
    type: 'button',
    className: [
      pi.iconButton,
      pi[`variant-${g}`],
      pi[`size-${s}`],
      f === 'round' ? pi.round : '',
      d ? pi.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: m,
    onClick: p,
    'aria-label': i,
    'aria-pressed': d,
    'aria-disabled': m,
    children: u.jsx('span', { className: pi.iconWrap, 'aria-hidden': 'true', children: y }),
  });
}
const _h = (l) => {
    let i;
    const s = new Set(),
      o = (y, _) => {
        const b = typeof y == 'function' ? y(i) : y;
        if (!Object.is(b, i)) {
          const A = i;
          ((i = (_ ?? (typeof b != 'object' || b === null)) ? b : Object.assign({}, i, b)),
            s.forEach((E) => E(i, A)));
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
  ob = (l) => (l ? _h(l) : _h),
  rb = (l) => l;
function ub(l, i = rb) {
  const s = Is.useSyncExternalStore(
    l.subscribe,
    Is.useCallback(() => i(l.getState()), [l, i]),
    Is.useCallback(() => i(l.getInitialState()), [l, i])
  );
  return (Is.useDebugValue(s), s);
}
const fb = (l) => {
    const i = ob(l),
      s = (o) => ub(i, o);
    return (Object.assign(s, i), s);
  },
  db = (l) => fb,
  e1 = [
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
function lf(l, i) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, i));
}
function dn(l) {
  return 1 + 0.1 * l;
}
function t1(l, i, s) {
  let o = 0;
  for (let f = 0; f < s; f++) o += lf(l, i + f);
  return o;
}
function a1(l, i, s) {
  let o = Q.ZERO,
    f = 0;
  for (;;) {
    const d = Q.fromNumber(lf(l, i + f)),
      m = o.add(d);
    if (m.gt(s) || ((o = m), f++, f >= 1e4)) break;
  }
  return { lvDelta: f, totalCost: o };
}
const bh = {
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
function mb(l, i, s) {
  return l.lt(i) ? i : l.gt(s) ? s : l;
}
const hb = (l, i) => ({
    ...bh,
    startRun: ({ initialWeapon: s, baseMachineMaxHp: o }) => {
      i().resetRunWorkshop();
      const f = i().runWorkshopLevels.hpMul,
        d = dn(f),
        m = o.mulNumber(d),
        p = i();
      l({
        isRunActive: !0,
        screw: Q.ZERO,
        machineHp: m,
        machineMaxHp: m,
        baseMachineMaxHp: o,
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
      (l(bh), i().resetRunWorkshop());
    },
    addScrew: (s) => l((o) => ({ screw: o.screw.add(s) })),
    spendScrew: (s) => {
      const o = i().screw;
      return o.lt(s) ? !1 : (l({ screw: o.sub(s) }), !0);
    },
    setMachineHp: (s) => l((o) => ({ machineHp: mb(s, Q.ZERO, o.machineMaxHp) })),
    damageHp: (s) =>
      l((o) => {
        const f = o.machineHp.sub(s);
        return { machineHp: f.lt(Q.ZERO) ? Q.ZERO : f };
      }),
    recalcMachineMaxHpFromHpMul: (s) => {
      const o = i(),
        f = o.machineMaxHp,
        d = o.machineHp,
        m = f.sub(d),
        p = m.lt(Q.ZERO) ? Q.ZERO : m,
        g = o.baseMachineMaxHp.mulNumber(dn(s)),
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
    triggerActive: (s) => (i().activeCdSec > 0 ? !1 : (l({ activeCdSec: Math.max(0, s) }), !0)),
    tickCooldowns: (s) =>
      l((o) => ({
        weaponSwitchCdSec: Math.max(0, o.weaponSwitchCdSec - s),
        activeCdSec: Math.max(0, o.activeCdSec - s),
      })),
  }),
  pb = { bolt: Q.ZERO, alloy: Q.ZERO },
  yb = (l, i) => ({
    ...pb,
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
    resetCurrencies: () => l({ bolt: Q.ZERO, alloy: Q.ZERO }),
  }),
  ji = 6,
  gb = { equippedPatches: new Map() },
  vb = (l, i) => ({
    ...gb,
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
  n1 = 'tower-like-game',
  so = 1,
  P = {
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
  l1 = {
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
  i1 = { id: 'singleton', bolt: [], alloy: [] },
  c1 = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  s1 = { id: 'singleton', bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 };
function o1() {
  return Object.fromEntries(ro.map((l) => [l, 0]));
}
const _b = { machineLevels: o1() },
  bb = (l) => ({
    ..._b,
    incrementMachineLv: (i) =>
      l((s) => ({ machineLevels: { ...s.machineLevels, [i]: s.machineLevels[i] + 1 } })),
    setMachineLv: (i, s) => l((o) => ({ machineLevels: { ...o.machineLevels, [i]: s } })),
    resetMachine: () => l({ machineLevels: o1() }),
  });
function Zu(l, i) {
  return `${l}#${i}`;
}
const Sb = { patches: new Map() },
  xb = (l, i) => ({
    ...Sb,
    addPatch: (s, o, f = 1) => {
      const d = Zu(s, o);
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
      const d = Zu(s, o),
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
  Sh = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  jb = (l) => ({
    ...Sh,
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
    resetProfile: (i) => l({ ...Sh, createdAt: i, lastPlayedAt: i }),
  }),
  r1 = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
  Ab = { runWorkshopLevels: r1 },
  Tb = (l, i) => ({
    ...Ab,
    upgradeRunWorkshop: (s, o) => {
      const f = e1.find((_) => _.key === s);
      if (f == null) return !1;
      const d = i().runWorkshopLevels[s];
      let m, p;
      if (o === 'max') {
        const _ = a1(f, d, i().screw);
        if (_.lvDelta === 0) return !1;
        ((m = _.lvDelta), (p = _.totalCost));
      } else ((m = o), (p = Q.fromNumber(t1(f, d, o))));
      if (!i().spendScrew(p)) return !1;
      const y = d + m;
      return (
        l((_) => ({ runWorkshopLevels: { ..._.runWorkshopLevels, [s]: y } })),
        s === 'hpMul' && i().recalcMachineMaxHpFromHpMul(y),
        !0
      );
    },
    resetRunWorkshop: () => l({ runWorkshopLevels: r1 }),
  }),
  xh = { bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  Mb = (l) => ({
    ...xh,
    setBgmVolume: (i) => l({ bgmVolume: Math.max(0, Math.min(1, i)) }),
    setSeVolume: (i) => l({ seVolume: Math.max(0, Math.min(1, i)) }),
    setVibrationEnabled: (i) => l({ vibrationEnabled: i }),
    resetSettings: () => l(xh),
  }),
  jh = { weaponLv: 0, initialWeapon: 'laser' },
  Eb = (l) => ({
    ...jh,
    incrementWeaponLv: () => l((i) => ({ weaponLv: i.weaponLv + 1 })),
    setWeaponLv: (i) => l({ weaponLv: i }),
    setInitialWeapon: (i) => l({ initialWeapon: i }),
    resetWeapons: () => l(jh),
  }),
  G = db()((...l) => ({
    ...jb(...l),
    ...yb(...l),
    ...bb(...l),
    ...Eb(...l),
    ...xb(...l),
    ...vb(...l),
    ...Mb(...l),
    ...hb(...l),
    ...Tb(...l),
  }));
function $c({ title: l, subtitle: i, onBack: s, currencies: o, tabBar: f, actions: d }) {
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
    className: $n.root,
    children: [
      u.jsxs('div', {
        className: $n.titleRow,
        children: [
          u.jsx('div', {
            className: $n.left,
            children:
              s != null &&
              u.jsx(Oc, {
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
              i != null &&
                u.jsx(Y, { variant: 'caption', color: 'dim', align: 'center', children: i }),
            ],
          }),
          u.jsxs('div', {
            className: $n.right,
            children: [
              _.length > 0 &&
                u.jsx('div', {
                  className: $n.currencies,
                  children: _.map((A) => u.jsx(Ti, { currency: A, value: b(A), size: 'sm' }, A)),
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
const wb = '_tab_1nc83_3',
  Nb = { tab: wb },
  zb = '_wrapper_1opqp_3',
  Cb = '_active_1opqp_12',
  Rb = '_card_1opqp_12',
  Ob = '_locked_1opqp_18',
  Db = '_tall_1opqp_34',
  Bb = '_iconTile_1opqp_37',
  Lb = '_headerText_1opqp_42',
  $b = '_description_1opqp_45',
  Hb = '_name_1opqp_48',
  kb = '_wide_1opqp_53',
  Ub = '_body_1opqp_61',
  qb = '_header_1opqp_42',
  Vb = '_statGrid_1opqp_121',
  Gb = '_statChip_1opqp_129',
  Yb = '_statLabel_1opqp_140',
  Zb = '_statValue_1opqp_147',
  Xb = '_lockedBadge_1opqp_158',
  Ct = {
    wrapper: zb,
    active: Cb,
    card: Rb,
    locked: Ob,
    tall: Db,
    iconTile: Bb,
    headerText: Lb,
    description: $b,
    name: Hb,
    wide: kb,
    body: Ub,
    header: qb,
    statGrid: Vb,
    statChip: Gb,
    statLabel: Yb,
    statValue: Zb,
    lockedBadge: Xb,
  },
  Kb = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function u1({
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
                          style: _.accent != null ? { color: Kb[_.accent] } : void 0,
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
const Ei = [
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
  Ah = 1e-9;
function Qb(l, i, s) {
  const o = Math.ceil(l * Math.pow(i, s) - Ah),
    f = Math.ceil(l * Math.pow(i, s - 1) - Ah);
  return Math.max(1, o - f);
}
function Tl(l, i) {
  switch (l.growthType) {
    case 'multiply': {
      let s = Math.ceil(l.baseValue);
      for (let o = 1; o <= i; o++) s += Qb(l.baseValue, l.growthFactor, o);
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
function cf(l, i) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, i));
}
function Ou(l, i, s) {
  let o = 0;
  for (let f = 0; f < s && !(l.maxLv != null && i + f >= l.maxLv); f++) o += cf(l, i + f);
  return o;
}
function Wb(l, i, s) {
  let o = 0,
    f = s,
    d = i;
  for (let m = 0; m < 1e4 && !(l.maxLv != null && d >= l.maxLv); m++) {
    const p = Q.fromNumber(cf(l, d));
    if (f.lt(p)) break;
    ((f = f.sub(p)), (d += 1), (o += 1));
  }
  return o;
}
function f1(l, i) {
  if (l.isZero()) return Q.ZERO;
  if (i <= 0) return l;
  if (i >= 1) return Q.ZERO;
  const s = 1 - i;
  return l.mulNumber(s);
}
function uo(l, i) {
  return l <= 0 ? !1 : l >= 1 ? !0 : i() < l;
}
function wl(l, i, s) {
  const { machine: o, weapon: f, isCrit: d } = l;
  let m = o.baseAttack.mulNumber(f.damageMultiplier);
  d && (m = m.mulNumber(o.critMultiplier));
  const p = m.sub(i),
    g = f1(p, s);
  return { rawDmg: m, finalDmg: g, isCrit: d };
}
function Jb(l, i) {
  const s = l.sub(i.defense);
  return f1(s, i.damageReduction);
}
const Fb = 0.5,
  Ib = 2,
  Pb = 30,
  e2 = 25,
  d1 = 5,
  t2 = 360 / d1,
  a2 = 3,
  n2 = 20;
function fo(l) {
  const i = Math.max(0, Math.floor(l)),
    s = Ib * Math.pow(1.02, i),
    o = Math.min(10, Fb * (1 + 0.03 * i)),
    f = Pb + 0.5 * i,
    d = n2 * (1 + 0.05 * i);
  return {
    attackPerSec: o,
    splashRadius: f,
    damageMul: s,
    volleyCdSec: e2,
    volleyDamageMul: d,
    volleyShots: d1,
  };
}
function Ai(l, i, s, o) {
  const f = l - s,
    d = i - o;
  return Math.sqrt(f * f + d * d);
}
function l2(l, i, s, o) {
  if (s.length === 0) return { hits: [], blastX: 50, blastY: 50 };
  const f = 50,
    d = 50;
  let m = s[0],
    p = Ai(f, d, m.position.x, m.position.y);
  for (let A = 1; A < s.length; A++) {
    const E = s[A],
      T = Ai(f, d, E.position.x, E.position.y);
    T < p && ((p = T), (m = E));
  }
  const g = m.position.x,
    y = m.position.y,
    _ = uo(l.critRate, o),
    b = [];
  for (const A of s)
    if (Ai(g, y, A.position.x, A.position.y) <= i.splashRadius) {
      const T = wl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: _ }, Q.ZERO, 0);
      b.push({ enemyId: A.id, damage: T.finalDmg, crit: _ });
    }
  return { hits: b, blastX: g, blastY: y };
}
function i2(l, i, s, o) {
  let m = 0;
  if (s.length > 0) {
    let b = s[0],
      A = Ai(50, 50, b.position.x, b.position.y);
    for (let D = 1; D < s.length; D++) {
      const R = s[D],
        Z = Ai(50, 50, R.position.x, R.position.y);
      Z < A && ((A = Z), (b = R));
    }
    const E = b.position.x - 50,
      T = b.position.y - 50;
    m = (Math.atan2(T, E) * 180) / Math.PI;
  }
  const g = (t2 * i.volleyShots) / i.volleyShots,
    y = i.splashRadius * a2,
    _ = [];
  for (let b = 0; b < i.volleyShots; b++) {
    const E = ((m + g * b) * Math.PI) / 180,
      T = Math.cos(E),
      D = Math.sin(E);
    let R = null,
      Z = -1 / 0;
    for (const pe of s) {
      const Me = pe.position.x - 50,
        ne = pe.position.y - 50,
        Re = Me * T + ne * D;
      Re > 0 && Re > Z && ((Z = Re), (R = pe));
    }
    let V, se;
    R !== null
      ? ((V = R.position.x), (se = R.position.y))
      : ((V = 50 + T * 100), (se = 50 + D * 100));
    const U = [];
    for (const pe of s)
      if (Ai(V, se, pe.position.x, pe.position.y) <= y) {
        const ne = wl(
          { machine: l, weapon: { damageMultiplier: i.damageMul * i.volleyDamageMul }, isCrit: !1 },
          Q.ZERO,
          0
        );
        U.push({ enemyId: pe.id, damage: ne.finalDmg });
      }
    _.push({ targetEnemyId: (R == null ? void 0 : R.id) ?? null, blastX: V, blastY: se, hits: U });
  }
  return { shots: _ };
}
const c2 = 2.5,
  s2 = 80,
  o2 = 1,
  r2 = 1.2;
function Hc(l) {
  const i = c2 * (1 + 0.03 * l),
    s = s2 + 0.5 * l,
    o = Math.floor(o2 + 0.05 * l),
    f = r2 * Math.pow(1.02, l);
  return {
    attackPerSec: i,
    orbitRadius: s,
    simultaneousHits: o,
    damageMul: f,
    overdriveCdSec: u2,
    overdriveDurationSec: f2,
    overdriveAttackSpeedMul: m1,
    overdriveDamageMul: 1,
  };
}
const u2 = 35,
  f2 = 8,
  m1 = 3;
function d2(l, i) {
  return l <= 0 ? Number.POSITIVE_INFINITY : (i / l) * 1e3;
}
function m2(l, i, s) {
  const o = (p) => ((p % 360) + 360) % 360,
    f = o(l),
    d = o(i);
  return o(f - d) <= s;
}
function h2(l, i, s, o, f, d = 2, m = 50, p = 50) {
  const g = 360 / d,
    y = [];
  for (let T = 0; T < d; T++) y.push(o + T * g);
  const A = s
      .filter((T) => {
        const D = T.position.x - m,
          R = T.position.y - p,
          Z = (Math.atan2(R, D) * 180) / Math.PI;
        return y.some((V) => m2(Z, V, g));
      })
      .slice(0, i.simultaneousHits)
      .map((T) => {
        const D = uo(l.critRate, f),
          R = wl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: D }, Q.ZERO, 0);
        return { enemyId: T.id, damage: R.finalDmg, crit: D };
      }),
    E = (((o + g) % 360) + 360) % 360;
  return { hits: A, angle: E };
}
function p2(l) {
  return {
    active: !0,
    remainingSec: l.overdriveDurationSec,
    attackSpeedMul: l.overdriveAttackSpeedMul,
    damageMul: l.overdriveDamageMul,
  };
}
function y2(l, i) {
  if (!l.active) return l;
  const s = l.remainingSec - i;
  return s <= 0
    ? { active: !1, remainingSec: 0, attackSpeedMul: 1, damageMul: 1 }
    : { ...l, remainingSec: s };
}
const g2 = 2.5,
  v2 = 0.4;
function mo(l) {
  const i = Math.max(0, l),
    s = g2 * (1 + 0.03 * i),
    o = Math.floor(1 + 0.1 * i),
    f = v2 * Math.pow(1.02, i),
    d = 10 * (1 + 0.05 * i);
  return { attackPerSec: s, pierce: o, damageMul: f, megaCdSec: _2, megaDamageMul: d };
}
const _2 = 20;
function b2(l, i, s, o) {
  if (s.length === 0) return { hits: [], beamX: 0, beamY: 0 };
  const f = s.slice(0, i.pierce),
    d = f.map((y) => {
      const _ = uo(l.critRate, o),
        b = wl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: _ }, Q.ZERO, 0);
      return { enemyId: y.id, damage: b.finalDmg, crit: _ };
    }),
    m = f[f.length - 1],
    p = m.position.x,
    g = m.position.y;
  return { hits: d, beamX: p, beamY: g };
}
const S2 = 6;
function x2(l, i, s, o = 0, f = 50, d = 50, m = S2) {
  if (s.length === 0) return { hits: [] };
  const p = (o * Math.PI) / 180,
    g = Math.cos(p),
    y = Math.sin(p),
    _ = m / 2,
    b = i.damageMul * i.megaDamageMul,
    A = [];
  for (const E of s) {
    const T = E.position.x - f,
      D = E.position.y - d;
    if (T * g + D * y <= 0) continue;
    const Z = -T * y + D * g;
    if (Math.abs(Z) > _) continue;
    const V = wl({ machine: l, weapon: { damageMultiplier: b }, isCrit: !1 }, Q.ZERO, 0);
    A.push({ enemyId: E.id, damage: V.finalDmg });
  }
  return { hits: A };
}
const j2 = 3,
  A2 = 0.9,
  T2 = 30,
  M2 = 0.18,
  E2 = 2.5;
function ho(l) {
  const i = Math.max(0, l),
    s = M2 * Math.pow(1.02, i),
    o = Math.min(10, E2 * (1 + 0.03 * i)),
    f = 15 * (1 + 0.05 * i);
  return {
    attackPerSec: o,
    chainCount: j2,
    chainFalloff: A2,
    damageMul: s,
    plasmaCdSec: T2,
    plasmaDamageMul: f,
  };
}
function w2(l, i, s, o) {
  if (s.length === 0) return { hits: [], path: [] };
  const f = s.slice(0, i.chainCount),
    d = [],
    m = [];
  for (const p of f) {
    const g = uo(l.critRate, o),
      y = wl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: g }, Q.ZERO, 0);
    (d.push({ enemyId: p.id, damage: y.finalDmg, crit: g }),
      m.push({ x: p.position.x, y: p.position.y }));
  }
  return { hits: d, path: m };
}
function N2(l, i, s) {
  if (s.length === 0) return { hits: [] };
  const o = [];
  for (let f = 0; f < s.length; f++) {
    const d = s[f],
      m = Math.pow(i.chainFalloff, f),
      p = i.damageMul * i.plasmaDamageMul * m,
      g = wl({ machine: l, weapon: { damageMultiplier: p }, isCrit: !1 }, Q.ZERO, 0);
    o.push({ enemyId: d.id, damage: g.finalDmg });
  }
  return { hits: o };
}
function Mi(l) {
  return Math.round(l * 10) / 10;
}
function po(l, i) {
  return Q.fromNumber(l).mulNumber(i).toString();
}
function h1(l) {
  const i = Ei.find((s) => s.key === 'baseAttack');
  return i != null ? Tl(i, l) : 1;
}
function p1(l) {
  const i = Ei.find((s) => s.key === 'range');
  return i != null ? Tl(i, l) : 150;
}
function y1(l, i, s) {
  const o = mo(l);
  return [
    { label: 'DMG', value: po(i, o.damageMul), accent: 'primary' },
    { label: '貫通', value: o.pierce },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Mi(o.attackPerSec), suffix: '/s' },
  ];
}
function g1(l, i, s) {
  const o = fo(l);
  return [
    { label: 'DMG', value: po(i, o.damageMul), accent: 'primary' },
    { label: '爆発半径', value: Mi(o.splashRadius), suffix: 'm' },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Mi(o.attackPerSec), suffix: '/s' },
  ];
}
function v1(l, i, s) {
  const o = ho(l);
  return [
    { label: 'DMG', value: po(i, o.damageMul), accent: 'primary' },
    { label: 'ターゲット数', value: o.chainCount },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Mi(o.attackPerSec), suffix: '/s' },
  ];
}
function _1(l, i) {
  const s = Hc(l);
  return [
    { label: 'DMG', value: po(i, s.damageMul), accent: 'primary' },
    { label: '回転半径', value: Mi(s.orbitRadius), suffix: 'm' },
    { label: '刃の数', value: s.simultaneousHits },
    { label: '回転速度', value: Mi(s.attackPerSec), suffix: '/s' },
  ];
}
const z2 = [
  { kind: 'laser', name: 'LASER', description: '弾速が速く貫通する', buildStats: y1 },
  { kind: 'cannon', name: 'CANNON', description: '爆発時に範囲内にもダメージ', buildStats: g1 },
  { kind: 'thunder', name: 'THUNDER', description: '複数の敵を同時に攻撃', buildStats: v1 },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシンの周辺を回転する刃で攻撃',
    buildStats: (l, i) => _1(l, i),
  },
];
function C2() {
  const l = G((f) => f.weaponLv),
    i = G((f) => f.machineLevels),
    s = h1(i.baseAttack),
    o = p1(i.range);
  return u.jsx('div', {
    className: Nb.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: z2.map((f) =>
      u.jsx(
        u1,
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
const R2 = '_tab_1oky8_3',
  O2 = '_topRow_1oky8_9',
  D2 = '_description_1oky8_15',
  B2 = '_previewCard_1oky8_21',
  L2 = '_previewLabel_1oky8_25',
  $2 = '_impactGrid_1oky8_32',
  H2 = '_impactRow_1oky8_37',
  k2 = '_impactRowBordered_1oky8_45',
  U2 = '_impactLabel_1oky8_49',
  q2 = '_impactValues_1oky8_55',
  V2 = '_arrow_1oky8_62',
  xa = {
    tab: R2,
    topRow: O2,
    description: D2,
    previewCard: B2,
    previewLabel: L2,
    impactGrid: $2,
    impactRow: H2,
    impactRowBordered: k2,
    impactLabel: U2,
    impactValues: q2,
    arrow: V2,
  },
  G2 = '_card_1403j_1',
  Y2 = '_interactive_1403j_97',
  Ac = {
    card: G2,
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
    interactive: Y2,
  };
function Nl({
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
const Z2 = '_root_168oy_2',
  X2 = '_header_168oy_15',
  K2 = '_iconWrap_168oy_22',
  Q2 = '_title_168oy_34',
  W2 = '_lvBadge_168oy_47',
  J2 = '_description_168oy_60',
  F2 = '_valueRow_168oy_66',
  I2 = '_valueBefore_168oy_74',
  P2 = '_valueAfter_168oy_83',
  eS = '_arrow_168oy_93',
  tS = '_buttons_168oy_100',
  aS = '_btnCol_168oy_105',
  nS = '_btn_168oy_105',
  lS = '_btnPrimary_168oy_132',
  iS = '_btnSecondary_168oy_139',
  cS = '_btnWarning_168oy_146',
  sS = '_costRow_168oy_172',
  oS = '_costNum_168oy_181',
  rS = '_costDisabled_168oy_190',
  mt = {
    root: Z2,
    header: X2,
    iconWrap: K2,
    title: Q2,
    lvBadge: W2,
    description: J2,
    valueRow: F2,
    valueBefore: I2,
    valueAfter: P2,
    arrow: eS,
    buttons: tS,
    btnCol: aS,
    btn: nS,
    btnPrimary: lS,
    btnSecondary: iS,
    btnWarning: cS,
    costRow: sS,
    costNum: oS,
    costDisabled: rS,
  },
  uS = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  fS = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  dS = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  mS = { primary: mt.btnPrimary, secondary: mt.btnSecondary, warning: mt.btnWarning },
  hS = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function Du(l) {
  return l instanceof Q ? l.toDisplay() : l.toLocaleString();
}
function sf({
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
  const E = y ?? dS[g],
    T = uS[E],
    D = o ?? T,
    R = mS[E],
    Z = hS[E];
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
              style: { color: T, boxShadow: fS[E] },
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
      i != null &&
        i.length > 0 &&
        u.jsx(Y, { variant: 'caption', color: 'dim', className: mt.description, children: i }),
      d != null &&
        u.jsxs('div', {
          className: mt.valueRow,
          children: [
            u.jsxs('span', { className: mt.valueBefore, children: [Du(d), p] }),
            m != null &&
              !b &&
              u.jsxs(u.Fragment, {
                children: [
                  u.jsx('span', { className: mt.arrow, children: '→' }),
                  u.jsxs('span', {
                    className: mt.valueAfter,
                    style: { color: T, textShadow: `0 0 5px ${Z}` },
                    children: [Du(m), p],
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
                      children: Du(V.cost),
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
function of(l) {
  const i = Math.ceil(200 * Math.pow(1.12, l));
  return Q.fromNumber(i);
}
function Th(l, i) {
  let s = Q.ZERO;
  for (let o = 0; o < i; o++) s = s.add(of(l + o));
  return s;
}
function pS(l, i) {
  let s = i,
    o = 0;
  for (;;) {
    const f = of(l + o);
    if (s.lt(f) || ((s = s.sub(f)), o++, o > 1e4)) break;
  }
  return o;
}
function Mh(l) {
  return Math.pow(1.02, l);
}
const Eh = { laser: 120 };
function yS(l) {
  const i = l + 1,
    s = Mh(l),
    o = Mh(i);
  return [
    { label: 'LASER DMG', before: Math.round(Eh.laser * s), after: Math.round(Eh.laser * o) },
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
function gS() {
  const l = G((T) => T.weaponLv),
    i = G((T) => T.alloy),
    s = G((T) => T.incrementWeaponLv),
    o = G((T) => T.setWeaponLv),
    f = G((T) => T.spendAlloy),
    d = of(l),
    m = Th(l, 5),
    p = pS(l, i),
    g = Th(l, p),
    y = !i.lt(d),
    _ = p >= 5,
    b = p >= 1,
    A = yS(l);
  function E(T) {
    T === '+1'
      ? f(d) && s()
      : T === '+5'
        ? f(m) && o(l + 5)
        : T === 'MAX' && p > 0 && f(g) && o(l + p);
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
          u.jsx(Ti, { currency: 'alloy', value: i, size: 'sm' }),
        ],
      }),
      u.jsx(sf, {
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
        onUpgrade: E,
      }),
      u.jsxs(Nl, {
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
const b1 = q.createContext(null);
function vS({ children: l, initialScreen: i }) {
  const [s, o] = q.useState(i ?? 'title'),
    f = q.useCallback((d) => {
      o(d);
    }, []);
  return u.jsx(b1.Provider, { value: { screen: s, navigate: f }, children: l });
}
function Zn() {
  const l = q.useContext(b1);
  if (!l) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return l;
}
const _S = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function bS(l = {}) {
  const { initialTab: i = 'details' } = l,
    [s, o] = q.useState(i),
    { screen: f, navigate: d } = Zn();
  return u.jsx(El, {
    header: u.jsx($c, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => d('preparation'),
      tabBar: u.jsx(oo, { tabs: _S, value: s, onChange: o, variant: 'underline', fullWidth: !0 }),
    }),
    footer: u.jsx(Lc, { active: f, onChange: (m) => d(m) }),
    children: u.jsxs('div', {
      className: xv.content,
      children: [s === 'details' && u.jsx(C2, {}), s === 'upgrade' && u.jsx(gS, {})],
    }),
  });
}
const SS = '_root_1ozz7_1',
  xS = '_battleFooter_1ozz7_10',
  jS = '_overlayLayer_1ozz7_14',
  Bu = { root: SS, battleFooter: xS, overlayLayer: jS },
  AS = {
    elite: { color: 'var(--c-warning)', label: 'ELITE', glow: '0 0 16px rgba(246,185,74,0.6)' },
    boss: { color: 'var(--c-danger)', label: 'BOSS', glow: '0 0 24px rgba(255,77,109,0.7)' },
    'battle-start': {
      color: 'var(--c-primary)',
      label: 'BATTLE START',
      glow: '0 0 20px rgba(80,220,255,0.7)',
    },
  };
function wh({ kind: l = 'elite', name: i, duration: s = 1600, onDone: o }) {
  const d = `app-${q.useId().replace(/:/g, '')}`,
    m = AS[l],
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
function TS({ waveNumber: l, duration: i = 1100, onDone: s }) {
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
const MS = '_root_paca6_3',
  ES = '_field_paca6_21',
  wS = '_rangeCircle_paca6_35',
  NS = '_machine_paca6_46',
  zS = '_machineRingOuter_paca6_59',
  CS = '_pin_paca6_69',
  RS = '_enemy_paca6_79',
  vl = {
    root: MS,
    field: ES,
    rangeCircle: wS,
    machine: NS,
    machineRingOuter: zS,
    pin: CS,
    enemy: RS,
  },
  OS = '_wrap_14rhu_1',
  DS = { wrap: OS };
function BS({
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
        className: `${p}-wrap ${DS.wrap}`,
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
const LS = '_shell_g836j_1',
  $S = '_inner_g836j_8',
  HS = '_ball_g836j_14',
  kS = '_highlight_g836j_23',
  Ps = { shell: LS, inner: $S, ball: HS, highlight: kS };
function US({
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
      E = setTimeout(() => {
        m == null || m();
      }, f + 20);
    return () => {
      (clearTimeout(A), clearTimeout(E));
    };
  }, []);
  const y = p ? s : l,
    _ = p ? o : i,
    b = (Math.atan2(o - i, s - l) * 180) / Math.PI;
  return u.jsx('div', {
    className: Ps.shell,
    style: {
      left: `${y}%`,
      top: `${_}%`,
      width: `${d}vmin`,
      height: `${d}vmin`,
      transition: `left ${f}ms cubic-bezier(.4,0,.6,1), top ${f}ms cubic-bezier(.4,0,.6,1)`,
    },
    children: u.jsxs('div', {
      className: Ps.inner,
      style: { transform: `rotate(${b}deg)` },
      children: [
        u.jsx('div', { className: Ps.ball }),
        u.jsx('div', {
          className: Ps.highlight,
          style: { width: `${d * 0.32}vmin`, height: `${d * 0.32}vmin` },
        }),
      ],
    }),
  });
}
const qS = '_svg_gil20_1',
  VS = { svg: qS };
function GS({
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
      const E = [];
      for (let T = 0; T < l.length - 1; T++) {
        const D = l[T],
          R = l[T + 1],
          Z = R.x - D.x,
          V = R.y - D.y,
          se = Math.hypot(Z, V) || 1,
          U = -V / se,
          pe = Z / se;
        T === 0 && E.push(D);
        for (let Me = 1; Me < f; Me++) {
          const ne = Me / f,
            Re = D.x + Z * ne,
            nt = D.y + V * ne,
            et = (Math.random() - 0.5) * 2 * o;
          E.push({ x: Re + U * et, y: nt + pe * et });
        }
        E.push(R);
      }
      return E.map((T, D) => `${D === 0 ? 'M' : 'L'}${T.x.toFixed(2)} ${T.y.toFixed(2)}`).join(' ');
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
        className: VS.svg,
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
function YS({
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
  const E = (o / (s * 2)) * 100,
    T = (o / (s * 4)) * 100,
    D = `
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
      height: ${E}%;
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
        const pe = 10 + U * 10;
        return `L ${pe + 4} ${V * 8} L ${pe + 8} ${V * 3.5} `;
      }).join(''),
    Z = [];
  for (let V = 0; V < f; V++) {
    const se = (360 / f) * V,
      U = 30 * A,
      pe = (U * Math.PI) / 180,
      Me = s * Math.cos(pe),
      ne = s * Math.sin(pe),
      Re = `M 0 0 L ${s} 0 A ${s} ${s} 0 0 ${U > 0 ? 1 : 0} ${Me.toFixed(2)} ${ne.toFixed(2)} Z`;
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
const ZS = '_root_14p1r_1',
  XS = { root: ZS };
function KS({ value: l, x: i, y: s, crit: o = !1, duration: f = 800, onDone: d }) {
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
        className: `${m} ${XS.root}`,
        onAnimationEnd: d,
        children: u.jsx(Yn, {
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
const QS = '_wrap_14rhu_1',
  WS = { wrap: QS },
  Nh = 8;
function JS({ x: l, y: i, color: s = 'var(--c-text-mid)', duration: o = 480, onDone: f }) {
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
    g = Array.from({ length: Nh }, (y, _) =>
      u.jsx('div', { className: `${d}-shard`, style: { '--a': `${(_ * 360) / Nh}deg` } }, _)
    );
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      u.jsxs('div', {
        className: `${d}-wrap ${WS.wrap}`,
        style: { left: `${l}%`, top: `${i}%` },
        onAnimationEnd: f,
        children: [u.jsx('div', { className: `${d}-flash` }), g],
      }),
    ],
  });
}
const FS = '_wrap_14rhu_1',
  IS = { wrap: FS };
function PS({ x: l, y: i, color: s = 'var(--c-primary-hi)', duration: o = 220, onDone: f }) {
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
        className: `${d}-w ${IS.wrap}`,
        style: { left: `${l}%`, top: `${i}%` },
        onAnimationEnd: f,
        children: u.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const ex = '_beam_14ieu_1',
  tx = { beam: ex };
function ax({
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
      u.jsx('div', { className: `${p} ${tx.beam}`, onAnimationEnd: m }),
    ],
  });
}
const nx = '_beam_14ieu_1',
  lx = { beam: nx };
function ix({
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
      u.jsx('div', { className: `${m} ${lx.beam}`, onAnimationEnd: d }),
    ],
  });
}
const cx = '_wrap_14rhu_1',
  sx = { wrap: cx };
function ox({ x: l, y: i, size: s = 80, color: o = 'var(--c-secondary)' }) {
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
        className: `${f}-w ${sx.wrap}`,
        children: [u.jsx('div', { className: `${f}-r1` }), u.jsx('div', { className: `${f}-r2` })],
      }),
    ],
  });
}
const rx = { screw: 'var(--c-screw)', bolt: 'var(--c-bolt)', alloy: 'var(--c-alloy)' };
function ux({ x: l, y: i, targetX: s, targetY: o, iconName: f, duration: d = 400, onDone: m }) {
  const g = `pk-${q.useId().replace(/:/g, '')}`,
    y = rx[f],
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
function fx({
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
      const T = [{ x: l, y: s }],
        R = (i - s) / d;
      for (let Z = 1; Z < d; Z++) {
        const V = s + R * Z,
          se = l + (Math.random() - 0.5) * 2 * m;
        T.push({ x: se, y: V });
      }
      return (
        T.push({ x: l, y: i }),
        T.map((Z, V) => `${V === 0 ? 'M' : 'L'}${Z.x.toFixed(2)} ${Z.y.toFixed(2)}`).join(' ')
      );
    }, []),
    b = Math.round(o * 0.35),
    A = Math.round(o * 0.65),
    E = `
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
      u.jsx('style', { dangerouslySetInnerHTML: { __html: E } }),
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
const dx = '_root_5xktu_1',
  mx = '_shape_5xktu_11',
  hx = '_hpBar_5xktu_22',
  px = '_hpFill_5xktu_32',
  eo = { root: dx, shape: mx, hpBar: hx, hpFill: px },
  yx = {
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
  gx = { standard: !1, swift: !0, tough: !1, elite: !1, miniboss: !0, boss: !0 };
function vx(l) {
  switch (l) {
    case 'frozen':
      return 'hue-rotate(180deg) saturate(1.6) brightness(1.05)';
    case 'burning':
      return 'hue-rotate(-25deg) saturate(1.4) brightness(1.1)';
    default:
      return 'none';
  }
}
function _x({ color: l }) {
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
function bx({ color: l }) {
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
function Sx({ color: l }) {
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
function xx({ color: l }) {
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
function jx({ color: l }) {
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
function Ax({ color: l }) {
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
const Tx = { standard: _x, swift: bx, tough: Sx, elite: xx, miniboss: jx, boss: Ax };
function Mx(l, i) {
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
function Ex({ type: l, size: i, hp: s, showHp: o, facing: f = 0, status: d = 'normal' }) {
  const m = yx[l],
    p = i ?? m.size,
    g = Tx[l],
    y = o ?? m.defaultHp,
    _ = gx[l] ? `${(f * 180) / Math.PI}deg` : '0deg',
    b = l === 'boss' ? 8 : l === 'miniboss' ? 6 : 4,
    A = { width: p, height: p },
    E = {
      width: p,
      height: p,
      color: m.color,
      filter: `drop-shadow(0 0 ${b}px ${m.glow}) ${vx(d)}`,
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
    className: eo.root,
    style: A,
    children: [
      u.jsx('div', { className: eo.shape, style: E, children: u.jsx(g, { color: m.color }) }),
      y &&
        s != null &&
        u.jsx('div', {
          className: eo.hpBar,
          style: T,
          children: u.jsx('div', { className: eo.hpFill, style: D }),
        }),
    ],
  });
}
function zh(l) {
  switch (l) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}
function wx({
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
  showOverdriveAura: E = !1,
  cutterRotateMs: T,
  range: D,
  dummyPins: R = [],
}) {
  const Z = i.x,
    V = i.y,
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
              style: { left: `${U.x}%`, top: `${U.y}%`, color: zh(U.kind) },
              'aria-hidden': !0,
              children: u.jsx(Ye, {
                name: 'target',
                size: U.kind === 'boss' ? 18 : U.kind === 'elite' ? 16 : 14,
                color: zh(U.kind),
              }),
            },
            U.id
          )
        ),
        l.map((U) => {
          const pe = Mx(U.kind, U.subtype),
            Me = U.frozenUntilMs != null,
            ne = U.burnUntilMs != null,
            Re = Me ? 'frozen' : ne ? 'burning' : 'normal',
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
              children: u.jsx(Ex, { type: pe, hp: Ve, status: Re, facing: Ie }),
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
        A && u.jsx(YS, { cx: Z, cy: V, rotateMs: T }),
        E && u.jsx(ox, { x: Z, y: V }),
        s.map((U) =>
          u.jsx(
            KS,
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
        o.map((U) =>
          u.jsx(PS, { x: U.x, y: U.y, onDone: () => (m == null ? void 0 : m(U.id)) }, U.id)
        ),
        f.map((U) =>
          u.jsx(JS, { x: U.x, y: U.y, onDone: () => (p == null ? void 0 : p(U.id)) }, U.id)
        ),
        _.map((U) =>
          u.jsx(
            ux,
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
                ax,
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
                US,
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
                BS,
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
                fx,
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
                GS,
                {
                  points: U.points,
                  delayMs: U.delayMs,
                  onDone: () => (y == null ? void 0 : y(U.id)),
                },
                U.id
              );
            case 'megaBeam':
              return u.jsx(
                ix,
                { x: U.x, y: U.y, angle: U.angle, onDone: () => (y == null ? void 0 : y(U.id)) },
                U.id
              );
          }
        }),
      ],
    }),
  });
}
const Nx = '_root_wr80h_2',
  zx = '_topRow_wr80h_13',
  Cx = '_weaponSlots_wr80h_21',
  Rx = '_activeArea_wr80h_29',
  Ox = '_activeButton_wr80h_37',
  Dx = '_activeDisabled_wr80h_57',
  Bx = '_modeToggle_wr80h_66',
  Lx = '_modeToggleOn_wr80h_89',
  $x = '_sheetToggleButton_wr80h_96',
  Hx = '_bottomRow_wr80h_108',
  kx = '_currencyArea_wr80h_115',
  Ux = '_sysButtons_wr80h_127',
  ha = {
    root: Nx,
    topRow: zx,
    weaponSlots: Cx,
    activeArea: Rx,
    activeButton: Ox,
    activeDisabled: Dx,
    modeToggle: Bx,
    modeToggleOn: Lx,
    sheetToggleButton: $x,
    bottomRow: Hx,
    currencyArea: kx,
    sysButtons: Ux,
  },
  qx = '_badge_4fy54_1',
  Vx = '_glow_4fy54_90',
  Gx = '_iconLeft_4fy54_118',
  Tc = {
    badge: qx,
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
    glow: Vx,
    iconLeft: Gx,
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
const Yx = '_root_x9cjr_1',
  Zx = '_svg_x9cjr_9',
  Xx = '_track_x9cjr_15',
  Kx = '_arc_x9cjr_19',
  Qx = '_center_x9cjr_28',
  Wx = '_labelText_x9cjr_37',
  yi = { root: Yx, svg: Zx, track: Xx, arc: Kx, center: Qx, labelText: Wx },
  Jx = { xs: 20, sm: 32, md: 48, lg: 64 },
  Fx = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  Ix = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function S1({
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
  const _ = typeof s == 'number' ? s : Jx[s],
    b =
      i != null
        ? Math.min(Math.max(0, l), Math.max(1, i)) / Math.max(1, i)
        : Math.min(Math.max(0, l), 100) / 100,
    A = i != null ? Math.min(Math.max(0, l), Math.max(1, i)) : l,
    E = i != null ? Math.max(1, i) : 100,
    T = Fx[o],
    D = d ? Ix[o] : void 0,
    R = _ / 2,
    Z = R - f / 2,
    V = 2 * Math.PI * Z,
    se = V * (1 - b),
    pe = m || p || y != null,
    Me = g ?? `${Math.round(b * 100)}%`;
  return u.jsxs('span', {
    className: yi.root,
    style: { width: _, height: _ },
    children: [
      u.jsxs('svg', {
        className: yi.svg,
        width: _,
        height: _,
        viewBox: `0 0 ${_} ${_}`,
        xmlns: 'http://www.w3.org/2000/svg',
        role: 'progressbar',
        'aria-valuenow': A,
        'aria-valuemin': 0,
        'aria-valuemax': E,
        'aria-label': g ?? `${A} / ${E}`,
        children: [
          u.jsx('circle', {
            className: yi.track,
            cx: R,
            cy: R,
            r: Z,
            fill: 'none',
            strokeWidth: f,
          }),
          u.jsx('circle', {
            className: yi.arc,
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
      pe &&
        u.jsx('span', {
          className: yi.center,
          children:
            y ?? u.jsx('span', { className: yi.labelText, style: { color: T }, children: Me }),
        }),
    ],
  });
}
const Px = '_root_afe45_2',
  e5 = '_swapDisabled_afe45_14',
  t5 = '_active_afe45_20',
  a5 = '_onCd_afe45_27',
  n5 = '_iconWrap_afe45_27',
  l5 = '_cdOverlay_afe45_47',
  i5 = '_cdProgress_afe45_57',
  c5 = '_swapOverlay_afe45_68',
  Hn = {
    root: Px,
    swapDisabled: e5,
    active: t5,
    onCd: a5,
    iconWrap: n5,
    cdOverlay: l5,
    cdProgress: i5,
    swapOverlay: c5,
  },
  s5 = { sm: 40, md: 52, lg: 64 },
  o5 = { sm: 18, md: 24, lg: 30 };
function r5({
  weapon: l,
  active: i = !1,
  ready: s = !1,
  cdProgress: o = 100,
  swapDisabled: f = !1,
  size: d = 'md',
  onClick: m,
}) {
  const p = s5[d],
    g = o5[d],
    y = o < 100,
    _ = [Hn.root, i ? Hn.active : '', y ? Hn.onCd : '', f ? Hn.swapDisabled : '']
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
        className: Hn.iconWrap,
        children: u.jsx(Ye, {
          name: l,
          size: g,
          color: i ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      y &&
        u.jsxs(u.Fragment, {
          children: [
            u.jsx('span', { className: Hn.cdOverlay, 'aria-hidden': 'true' }),
            u.jsx('span', {
              className: Hn.cdProgress,
              'aria-hidden': 'true',
              children: u.jsx(S1, {
                value: o,
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
const Ch = ['laser', 'cannon', 'thunder', 'cutter'];
function u5({
  screw: l,
  equippedWeapon: i,
  weaponCds: s,
  activeCd: o,
  activeMax: f,
  isAutoActive: d,
  onSwitchWeapon: m,
  onActivate: p,
  onToggleAuto: g,
  isPaused: y,
  onTogglePause: _,
  onOpenMenu: b,
  onOpenScreenSaver: A,
  isWorkshopOpen: E = !1,
  onToggleWorkshop: T,
}) {
  const D = o > 0,
    R = d || D,
    Z = Ch.some((V) => V !== i && (s[V] ?? 100) < 100);
  return u.jsxs('div', {
    className: ha.root,
    children: [
      T != null &&
        u.jsx('button', {
          type: 'button',
          className: ha.sheetToggleButton,
          onClick: T,
          'aria-expanded': E,
          'aria-label': E ? 'アップグレードを閉じる' : 'アップグレードを開く',
          children: u.jsx(kc, { text: 'アップグレード', variant: 'info', size: 'md', glow: !0 }),
        }),
      u.jsxs('div', {
        className: ha.topRow,
        children: [
          u.jsx('div', {
            className: ha.weaponSlots,
            children: Ch.map((V) =>
              u.jsx(
                r5,
                {
                  weapon: V,
                  active: V === i,
                  cdProgress: s[V] ?? 100,
                  swapDisabled: Z && V !== i,
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
                children: u.jsx(S1, {
                  value: D ? f - o : f,
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
            children: u.jsx(Ti, { currency: 'screw', value: l, size: 'lg' }),
          }),
          u.jsxs('div', {
            className: ha.sysButtons,
            children: [
              u.jsx(Oc, {
                icon: y ? 'play' : 'pause',
                label: y ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: y,
                onClick: _,
              }),
              u.jsx(Oc, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: b,
              }),
              u.jsx(Oc, {
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
const f5 = '_root_1y4n6_3',
  d5 = '_headerRow_1y4n6_13',
  m5 = '_hpValue_1y4n6_21',
  h5 = '_hpDivider_1y4n6_31',
  p5 = '_shieldBlock_1y4n6_36',
  y5 = '_srOnly_1y4n6_44',
  gi = { root: f5, headerRow: d5, hpValue: m5, hpDivider: h5, shieldBlock: p5, srOnly: y5 },
  g5 = '_root_1pi3d_2',
  v5 = '_sizeSm_1pi3d_11',
  _5 = '_sizeMd_1pi3d_15',
  b5 = '_sizeLg_1pi3d_19',
  S5 = '_fill_1pi3d_23',
  x5 = '_label_1pi3d_29',
  j5 = '_withTrailing_1pi3d_46',
  A5 = '_trailingLabel_1pi3d_56',
  kn = {
    root: g5,
    sizeSm: v5,
    sizeMd: _5,
    sizeLg: b5,
    fill: S5,
    label: x5,
    withTrailing: j5,
    trailingLabel: A5,
  },
  T5 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  M5 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function Rh({
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
    E = T5[s],
    T = g || f === 'neon' ? M5[s] : void 0,
    D = { sm: kn.sizeSm, md: kn.sizeMd, lg: kn.sizeLg }[o],
    R = {
      width: `${A}%`,
      backgroundColor: E,
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
const E5 = '_root_17jsg_2',
  w5 = '_boss_17jsg_10',
  N5 = '_header_17jsg_16',
  z5 = '_milestone_17jsg_23',
  C5 = '_milestoneText_17jsg_30',
  R5 = '_seconds_17jsg_40',
  O5 = '_timerTrack_17jsg_46',
  D5 = '_timerFill_17jsg_56',
  B5 = '_drainBar_17jsg_1',
  L5 = '_timerFillBoss_17jsg_74',
  $5 = '_timerFillPaused_17jsg_79',
  H5 = '_waveLabel_17jsg_102',
  ta = {
    root: E5,
    boss: w5,
    header: N5,
    milestone: z5,
    milestoneText: C5,
    seconds: R5,
    timerTrack: O5,
    timerFill: D5,
    drainBar: B5,
    timerFillBoss: L5,
    timerFillPaused: $5,
    'size-sm': '_size-sm_17jsg_98',
    waveLabel: H5,
    'size-md': '_size-md_17jsg_106',
    'size-lg': '_size-lg_17jsg_110',
  },
  k5 = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  };
function U5({
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
    y = o != null ? k5[o.kind] : null,
    _ = Math.max(1, s);
  return u.jsxs('div', {
    className: [ta.root, ta[`size-${d}`], g ? ta.boss : ''].filter(Boolean).join(' '),
    children: [
      u.jsxs('div', {
        className: ta.header,
        children: [
          u.jsx(kc, { text: `WAVE ${l}`, variant: 'tier' }),
          !p &&
            y != null &&
            o != null &&
            u.jsxs('span', {
              className: ta.milestone,
              style: { color: y.color },
              children: [
                u.jsx(Ye, { name: y.iconName, size: 12, color: y.color }),
                u.jsxs('span', { className: ta.milestoneText, children: [y.label, ' @', o.wave] }),
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
                children: [Math.ceil(i), 's'],
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
          'aria-valuenow': Math.max(0, i),
          children: u.jsx(q5, { secondsRemaining: i, secondsMax: _, isBoss: g, paused: m }, l),
        }),
    ],
  });
}
function q5({ secondsRemaining: l, secondsMax: i, isBoss: s, paused: o }) {
  const [f] = q.useState(() => {
      const m = Math.max(0, Math.min(1, l / i)),
        p = Math.max(0.01, l);
      return { initialScale: m, durationSec: p };
    }),
    d = [ta.timerFill, s ? ta.timerFillBoss : '', o ? ta.timerFillPaused : '']
      .filter(Boolean)
      .join(' ');
  return u.jsx('div', {
    className: d,
    style: { '--start-scale': f.initialScale, animationDuration: `${f.durationSec}s` },
  });
}
function V5({
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
  const E = _ ?? (y ? { wave: d, kind: 'boss' } : void 0),
    T = s != null && o != null,
    D = Oh(l, i),
    R = T ? Oh(s, o) : 0;
  return u.jsxs('div', {
    className: gi.root,
    role: 'group',
    'aria-label': 'バトル状態',
    children: [
      u.jsxs('div', {
        className: gi.headerRow,
        children: [
          u.jsx(kc, { variant: 'tier', tier: f, size: 'md', glow: !0 }),
          u.jsx(Y, { variant: 'label', color: 'dim', style: { fontSize: 10 }, children: 'HP' }),
          u.jsxs('span', {
            className: gi.hpValue,
            'aria-label': `HP ${l.toDisplay()} / ${i.toDisplay()}`,
            children: [
              u.jsx(Yn, {
                value: l,
                size: 'sm',
                accentColor: b ? 'danger' : 'text',
                glow: b,
                style: { fontSize: 14 },
              }),
              u.jsx('span', { className: gi.hpDivider, children: '/' }),
              u.jsx(Yn, { value: i, size: 'sm', accentColor: 'dim', style: { fontSize: 11 } }),
            ],
          }),
          T &&
            u.jsxs('span', {
              className: gi.shieldBlock,
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
      u.jsx(Rh, { value: D, max: 100, color: D <= 30 ? 'hp-low' : 'hp', size: 'md' }),
      T && u.jsx(Rh, { value: R, max: 100, color: 'shield', size: 'sm' }),
      u.jsx(U5, {
        waveNumber: d,
        secondsLeft: p,
        secondsMax: g,
        nextMilestone: E,
        showSeconds: !1,
        size: 'sm',
        paused: A,
        isBossWave: y,
      }),
      u.jsxs('span', { className: gi.srOnly, 'aria-hidden': 'false', children: [d, '/', m] }),
    ],
  });
}
function Oh(l, i) {
  const s = parseFloat(l.toString()),
    o = parseFloat(i.toString());
  return o === 0 ? 0 : Math.max(0, Math.min(100, (s / o) * 100));
}
const G5 = '_card_1o3jz_1',
  Y5 = '_header_1o3jz_8',
  Z5 = '_soundSection_1o3jz_13',
  X5 = '_sliderRow_1o3jz_19',
  K5 = '_sliderLabel_1o3jz_26',
  Q5 = '_sliderValue_1o3jz_31',
  W5 = '_divider_1o3jz_38',
  J5 = '_actions_1o3jz_44',
  ja = {
    card: G5,
    header: Y5,
    soundSection: Z5,
    sliderRow: X5,
    sliderLabel: K5,
    sliderValue: Q5,
    divider: W5,
    actions: J5,
  },
  F5 = '_button_1oo6e_1',
  I5 = '_fullWidth_1oo6e_109',
  P5 = '_iconLeft_1oo6e_113',
  e3 = '_iconRight_1oo6e_114',
  t3 = '_iconSpacer_1oo6e_120',
  a3 = '_label_1oo6e_124',
  sn = {
    button: F5,
    'variant-primary': '_variant-primary_1oo6e_28',
    'variant-secondary': '_variant-secondary_1oo6e_42',
    'variant-danger': '_variant-danger_1oo6e_56',
    'variant-ghost': '_variant-ghost_1oo6e_70',
    'size-sm': '_size-sm_1oo6e_85',
    'size-md': '_size-md_1oo6e_93',
    'size-lg': '_size-lg_1oo6e_101',
    fullWidth: I5,
    iconLeft: P5,
    iconRight: e3,
    iconSpacer: t3,
    label: a3,
  };
function kt({
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
    className: [sn.button, sn[`variant-${i}`], sn[`size-${s}`], o ? sn.fullWidth : '']
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
const n3 = '_overlay_1i1z1_12',
  l3 = '_fullscreen_1i1z1_21',
  i3 = '_absolute_1i1z1_27',
  c3 = '_alignCenter_1i1z1_33',
  s3 = '_alignTop_1i1z1_38',
  o3 = '_alignBottom_1i1z1_44',
  r3 = '_content_1i1z1_50',
  jl = {
    overlay: n3,
    fullscreen: l3,
    absolute: i3,
    alignCenter: c3,
    alignTop: s3,
    alignBottom: o3,
    content: r3,
  },
  u3 = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Dh = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  f3 = { center: jl.alignCenter, top: jl.alignTop, bottom: jl.alignBottom };
function rf({
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
    b = (D) => {
      D.stopPropagation();
    },
    A = u3[f],
    E = typeof p == 'number' ? p : (Dh[p] ?? Dh.overlay),
    T = {
      background: `rgba(2, 4, 10, ${A})`,
      zIndex: E,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...g,
    };
  return u.jsx('div', {
    className: [jl.overlay, l ? jl.fullscreen : jl.absolute, f3[m]].join(' '),
    style: T,
    onClick: _,
    role: 'presentation',
    'aria-modal': 'true',
    children: u.jsx('div', { className: jl.content, onClick: b, children: i }),
  });
}
const d3 = '_wrapper_131tr_1',
  m3 = '_disabled_131tr_5',
  h3 = '_input_131tr_18',
  to = {
    wrapper: d3,
    disabled: m3,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: h3,
  },
  Xu = ({
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
      className: [to.wrapper, to[`color-${d}`], m ? to.disabled : ''].join(' '),
      style: y,
      children: u.jsx('input', {
        type: 'range',
        className: to.input,
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
  p3 = '_dialog_49iek_13',
  y3 = '_card_49iek_20',
  g3 = '_titleRow_49iek_27',
  v3 = '_titleIcon_49iek_33',
  _3 = '_title_49iek_27',
  b3 = '_message_49iek_46',
  S3 = '_actions_49iek_50',
  x3 = '_variantDanger_49iek_57',
  Un = {
    dialog: p3,
    card: y3,
    titleRow: g3,
    titleIcon: v3,
    title: _3,
    message: b3,
    actions: S3,
    variantDanger: x3,
  };
function x1({
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
    ? u.jsx(rf, {
        open: l,
        onClose: p,
        dismissible: !0,
        children: u.jsx('div', {
          className: [Un.dialog, g === 'danger' ? Un.variantDanger : ''].filter(Boolean).join(' '),
          children: u.jsxs(Nl, {
            variant: 'elevated',
            padding: 'lg',
            className: Un.card,
            children: [
              u.jsxs('div', {
                className: Un.titleRow,
                children: [
                  o != null &&
                    u.jsx('span', {
                      className: Un.titleIcon,
                      'aria-hidden': 'true',
                      children: u.jsx(Ye, {
                        name: o,
                        size: 20,
                        color: g === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  u.jsx(Y, { variant: 'heading-3', as: 'h2', className: Un.title, children: i }),
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
function j3({
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
      u.jsx(rf, {
        open: l,
        onClose: m,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !p,
        children: u.jsxs(Nl, {
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
                      children: Math.round(i * 100).toString(),
                    }),
                  ],
                }),
                u.jsx(Xu, { value: i, min: 0, max: 1, step: 0.01, onChange: o, color: 'primary' }),
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
                u.jsx(Xu, { value: s, min: 0, max: 1, step: 0.01, onChange: f, color: 'primary' }),
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
      u.jsx(x1, {
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
const A3 = '_card_1fzt0_2',
  T3 = '_header_1fzt0_14',
  M3 = '_statusText_1fzt0_19',
  E3 = '_section_1fzt0_23',
  w3 = '_sectionTitle_1fzt0_29',
  N3 = '_statsGrid_1fzt0_35',
  z3 = '_statItem_1fzt0_41',
  C3 = '_rewardList_1fzt0_52',
  R3 = '_rewardCurrency_1fzt0_58',
  O3 = '_patchList_1fzt0_66',
  D3 = '_patchItem_1fzt0_72',
  B3 = '_actions_1fzt0_87',
  jt = {
    card: A3,
    header: T3,
    statusText: M3,
    section: E3,
    sectionTitle: w3,
    statsGrid: N3,
    statItem: z3,
    rewardList: C3,
    rewardCurrency: R3,
    patchList: O3,
    patchItem: D3,
    actions: B3,
  },
  L3 = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  $3 = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function H3(l) {
  const i = Math.floor(l / 60),
    s = Math.floor(l % 60);
  return `${i.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function k3({
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
  const g = L3[i],
    y = $3[i];
  return u.jsx(rf, {
    open: l,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: u.jsxs(Nl, {
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
                    u.jsx(Y, { variant: 'numeric-m', color: 'primary', children: o.toString() }),
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
                    u.jsx(Y, { variant: 'numeric-m', color: 'primary', children: H3(d) }),
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
                  children: u.jsx(Ti, { currency: 'bolt', value: m.bolt, size: 'lg' }),
                }),
                u.jsx('div', {
                  className: jt.rewardCurrency,
                  children: u.jsx(Ti, { currency: 'alloy', value: m.alloy, size: 'lg' }),
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
const U3 = '_root_1tank_3',
  q3 = '_inner_1tank_20',
  V3 = '_header_1tank_28',
  G3 = '_headerText_1tank_35',
  Y3 = '_grid_1tank_44',
  Mc = { root: U3, inner: q3, header: V3, headerText: G3, grid: Y3 };
function Z3({ open: l, screw: i, levels: s, onUpgrade: o, onClose: f }) {
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
                u.jsx(Ti, { currency: 'screw', value: i, size: 'md' }),
                f != null &&
                  u.jsx(Oc, {
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
              children: e1.map((d) => {
                const m = s[d.key],
                  p = dn(m),
                  g = dn(m + 1),
                  y = lf(d, m),
                  _ = t1(d, m, 5),
                  { totalCost: b, lvDelta: A } = a1(d, m, i),
                  E = Q.fromNumber(y),
                  T = Q.fromNumber(_),
                  D = i.gte(E),
                  R = i.gte(T),
                  Z = A > 0;
                return u.jsx(
                  sf,
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
                      { amount: '+1', cost: E, disabled: !D },
                      { amount: '+5', cost: T, disabled: !R },
                      { amount: 'MAX', cost: b, disabled: !Z },
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
const X3 = '_root_9fvdn_2',
  K3 = { root: X3 },
  Lu = [
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
function Q3({ items: l = [], showTower: i = !1, towerContent: s = null, cycleSeconds: o = 24 }) {
  const d = `ssfx-${q.useId().replace(/:/g, '')}`,
    m = Lu.map((b, A) => {
      const E = 100 / b.length,
        T = b
          .map(([D, R], Z) => {
            const V = Z * E;
            return `
          ${V}%               { left: ${D}%; top: ${R}%; opacity: 0; }
          ${(V + 3).toFixed(2)}%   { left: ${D}%; top: ${R}%; opacity: 1; }
          ${(V + E - 7).toFixed(2)}%  { left: ${D}%; top: ${R}%; opacity: 1; }
          ${(V + E - 3).toFixed(2)}%  { left: ${D}%; top: ${R}%; opacity: 0; }
        `;
          })
          .join('');
      return `@keyframes ${d}-drift-${A + 1} { ${T} 100% { opacity: 0; } }`;
    }).join(`
`),
    p = Lu.map(
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
        const E = (A % Lu.length) + 1,
          T = -(A * (o / Math.max(_.length, 1)));
        return u.jsx(
          'div',
          {
            className: `${d}-slot ${d}-p${E}${A === 0 ? ` ${d}-rm-show` : ''}`,
            style: { animationDelay: `${T}s` },
            children: b,
          },
          A
        );
      }),
    ],
  });
}
function W3({ open: l, onClose: i }) {
  return l
    ? u.jsx('div', {
        className: K3.root,
        onClick: i,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (s) => {
          (s.key === 'Enter' || s.key === ' ') && i();
        },
        children: u.jsx(Q3, {
          showTower: !0,
          towerContent: u.jsx(Ye, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
const Ml = { HP: 10, ATK: 2, SPD: 10, SPAWN_INTERVAL: 2, HP_GROWTH: 1.8, ATK_GROWTH: 1.4 };
function J3(l) {
  return l <= 10
    ? 1 + 0.074 * (l - 1)
    : l <= 20
      ? 1 + 0.074 * 9 + 0.133 * (l - 10)
      : 1 + 0.074 * 9 + 0.133 * 10 + 0.2 * (l - 20);
}
function F3(l) {
  return l <= 10
    ? 1 + 0.037 * (l - 1)
    : l <= 20
      ? 1 + 0.037 * 9 + 0.067 * (l - 10)
      : 1 + 0.037 * 9 + 0.067 * 10 + 0.1 * (l - 20);
}
function I3(l) {
  return l <= 10
    ? 1 + 0.019 * (l - 1)
    : l <= 20
      ? 1 + 0.019 * 9 + 0.033 * (l - 10)
      : 1 + 0.019 * 9 + 0.033 * 10 + 0.05 * (l - 20);
}
function P3(l) {
  return 1 + 0.2 * Math.max(0, l - 1);
}
function e4(l) {
  return Math.pow(1.5, Math.max(0, l - 1));
}
function t4(l) {
  let i = Q.fromNumber(Ml.HP);
  for (let s = 1; s < l; s++) i = i.mulNumber(Ml.HP_GROWTH);
  return i;
}
function a4(l) {
  let i = Q.fromNumber(Ml.ATK);
  for (let s = 1; s < l; s++) i = i.mulNumber(Ml.ATK_GROWTH);
  return i;
}
const n4 = { standard: 1, swift: 0.6, tough: 5 },
  l4 = { standard: 1, swift: 0.5, tough: 1 },
  i4 = { standard: 1, swift: 2, tough: 0.5 },
  c4 = { elite: 10, miniboss: 50, boss: 250 },
  s4 = { elite: 2.5, miniboss: 5, boss: 8 },
  o4 = {
    elite: { screw: 10, bolt: 10, alloyChance: 0.3, alloyAmount: 1 },
    miniboss: { screw: 50, bolt: 50, alloyChance: 1, alloyAmount: 1 },
    boss: { screw: 250, bolt: 250, alloyChance: 1, alloyAmount: 5 },
  },
  r4 = { standard: 1, swift: 2, tough: 5 },
  u4 = { standard: 1, swift: 2, tough: 5 };
function Bh(l, i, s, o) {
  const f = t4(l),
    d = a4(l),
    m = J3(i),
    p = F3(i),
    g = P3(i) * e4(l);
  if (s === 'normal') {
    const T = o ?? 'standard',
      D = f.mulNumber(n4[T]).mulNumber(m),
      R = d.mulNumber(l4[T]).mulNumber(p),
      Z = Ml.SPD * i4[T];
    return {
      kind: 'normal',
      subtype: T,
      hp: D,
      atk: R,
      speed: Z,
      reward: {
        screw: Math.max(1, Math.round(r4[T] * g)),
        bolt: u4[T],
        alloyChance: 0,
        alloyAmount: 0,
      },
    };
  }
  const y = s,
    _ = f.mulNumber(c4[y]).mulNumber(m),
    b = d.mulNumber(s4[y]).mulNumber(p),
    A = Ml.SPD,
    E = o4[y];
  return {
    kind: s,
    hp: _,
    atk: b,
    speed: A,
    reward: { ...E, screw: Math.max(1, Math.round(E.screw * g)) },
  };
}
function Lh(l, i, s, o) {
  const f = o() < 0.5 ? 0 : 100,
    d = o() * 100;
  return { ...l, id: i, spawnedAtMs: s, position: { x: f, y: d }, maxHp: l.hp };
}
const f4 = 30,
  Ku = 26;
function d4(l) {
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
function m4(l) {
  const i = [];
  for (let s = 1; s <= f4; s++) {
    const o = I3(s),
      f = Ml.SPAWN_INTERVAL / o,
      d = d4(s);
    let m;
    (s === 5 || s === 15 || s === 25
      ? (m = 'elite')
      : s === 10 || s === 20
        ? (m = 'miniboss')
        : s === 30 && (m = 'boss'),
      i.push({
        waveIndex: s,
        tier: l,
        durationSec: Ku,
        spawnIntervalSec: f,
        normalSpawnTable: d,
        eliteKind: m,
      }));
  }
  return i;
}
function h4(l, i, s, o, f) {
  const d = [],
    m = i / 1e3,
    p = s / 1e3,
    g = Math.floor(m / l.spawnIntervalSec),
    y = Math.floor(p / l.spawnIntervalSec),
    _ = g - y;
  for (let E = 0; E < _; E++) {
    const T = p4(l.normalSpawnTable, o),
      D = Bh(l.tier, l.waveIndex, 'normal', T);
    d.push(Lh(D, f(), i, o));
  }
  const A = l.durationSec - 1;
  if (l.eliteKind !== void 0 && p < A && m >= A) {
    const E = Bh(l.tier, l.waveIndex, l.eliteKind);
    d.push(Lh(E, f(), i, o));
  }
  return d;
}
function p4(l, i) {
  const s = i();
  let o = 0;
  for (const f of l) if (((o += f.weight), s < o)) return f.subtype;
  return l[l.length - 1].subtype;
}
const $h = 50,
  Hh = 50;
function y4(l, i, s) {
  if (l.frozenUntilMs != null && s != null && l.frozenUntilMs > s) return l;
  const o = $h - l.position.x,
    f = Hh - l.position.y,
    d = Math.sqrt(o * o + f * f);
  if (d <= 0) return l;
  const m = l.speed * i;
  if (m <= 0) return l;
  if (m >= d) return { ...l, position: { x: $h, y: Hh } };
  const p = m / d;
  return { ...l, position: { x: l.position.x + o * p, y: l.position.y + f * p } };
}
function vi(l, i, s) {
  const o = Ei.find((f) => f.key === l);
  return o == null ? s : Tl(o, i);
}
function $u({ machineMaxHp: l, machineLevels: i }) {
  return {
    baseAttack: Q.fromNumber(vi('baseAttack', i.baseAttack, 1)),
    defense: Q.fromNumber(vi('defense', i.defense, 1)),
    damageReduction: vi('damageReduction', i.damageReduction, 0),
    critRate: vi('critRate', i.critRate, 0),
    critMultiplier: vi('critMultiplier', i.critMultiplier, 1.5),
    maxHp: l.isZero() ? Q.fromNumber(1) : l,
    hpRegen: Q.fromNumber(vi('hpRegen', i.hpRegen, 1)),
  };
}
function g4(l, i) {
  switch (l) {
    case 'laser':
      return mo(i).attackPerSec;
    case 'cannon':
      return fo(i).attackPerSec;
    case 'thunder':
      return ho(i).attackPerSec;
    case 'cutter':
      return Hc(i).attackPerSec;
  }
}
function v4({
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
        hits: b2(s, g, o, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cannon': {
      const p = fo(i),
        g = { ...p, damageMul: p.damageMul * m },
        y = l2(s, g, o, f);
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
        hits: w2(s, g, o, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cutter': {
      const p = Hc(i),
        g = { ...p, damageMul: p.damageMul * m },
        y = h2(s, g, o, d, f);
      return {
        hits: y.hits.map((_) => ({ enemyId: _.enemyId, damage: _.damage, crit: _.crit })),
        cutterAngle: y.angle,
      };
    }
  }
}
function _4(l, i, s) {
  if (i.type !== 'onWaveClear') return null;
  const o = l.tier;
  return { boltGain: Q.fromNumber(5 * o) };
}
function b4(l, i, s) {
  if (i.type !== 'onDropRoll') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { dropMultiplier: 2 };
}
function S4(l, i, s) {
  return i.type !== 'onAttack' || i.enemyKind === 'normal'
    ? null
    : { damageMultiplier: 1 + 0.05 * l.tier };
}
function x4(l, i, s) {
  if (i.type !== 'onAttack') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { burnSec: 1 + 0.2 * o };
}
function j4(l, i, s) {
  if (i.type !== 'onHit') return null;
  const o = l.tier,
    f = 0.03,
    m = f + ((0.3 - f) * o) / (o + 20);
  return s() >= m ? null : { overrideReceivedDamage: Q.ZERO };
}
function A4(l, i, s) {
  if (i.type !== 'onAttack') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { extraShot: !0 };
}
function T4(l, i, s) {
  if (i.type !== 'onAttack') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { freeze: !0, freezeSec: 1 + 0.2 * o };
}
function M4(l, i, s) {
  if (i.type !== 'onAttack' || i.enemyKind !== 'normal') return null;
  const o = l.tier,
    f = 0.02,
    m = f + ((0.2 - f) * o) / (o + 20);
  return s() >= m ? null : { instantKill: !0 };
}
function E4(l, i, s) {
  if (i.type !== 'onKill') return null;
  const o = l.tier,
    f = Math.ceil(0.5 * o);
  return { heal: Q.fromNumber(f) };
}
function w4(l, i, s) {
  if (i.type !== 'onWaveClear') return null;
  const o = l.tier;
  return { heal: Q.fromNumber(5 * o) };
}
const N4 = {
  instantKill: M4,
  bossKiller: S4,
  doubleShot: A4,
  damageImmune: j4,
  killHeal: E4,
  shieldRegen: w4,
  bonusDrop: b4,
  boltCast: _4,
  freezeHit: T4,
  burnHit: x4,
};
function z4(l, i) {
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
    i.heal !== void 0 && (s.heal = (s.heal ?? Q.ZERO).add(i.heal)),
    i.shieldRecover !== void 0 && (s.shieldRecover = (s.shieldRecover ?? 0) + i.shieldRecover),
    i.dropMultiplier !== void 0 &&
      (s.dropMultiplier = (s.dropMultiplier ?? 1) + (i.dropMultiplier - 1)),
    i.boltGain !== void 0 && (s.boltGain = (s.boltGain ?? Q.ZERO).add(i.boltGain)),
    i.extraShot && (s.extraShot = !0),
    i.freeze && ((s.freeze = !0), (s.freezeSec = Math.max(s.freezeSec ?? 0, i.freezeSec ?? 0))),
    i.burnSec !== void 0 && (s.burnSec = Math.max(s.burnSec ?? 0, i.burnSec)),
    s
  );
}
function Ec(l, i, s) {
  let o = {};
  for (const f of l) {
    const d = N4[f.name];
    if (d === void 0) continue;
    const m = d(f, i, s);
    m !== null && (o = z4(o, m));
  }
  return o;
}
const C4 = { normal: 0, elite: 0.01, miniboss: 0.05, boss: 0.2 },
  Hu = [
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
function R4(l, i, s) {
  const o = C4[l] ?? 0;
  if (o <= 0) return !1;
  const f = Math.min(1, o * i);
  return s() < f;
}
function O4(l, i) {
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
function D4(l) {
  const i = Math.floor(l() * Hu.length);
  return Hu[Math.min(Hu.length - 1, i)];
}
function B4(l, i, s, o) {
  if (!R4(l, s, o)) return null;
  const f = O4(i, o);
  return { name: D4(o), tier: f };
}
const L4 = 1;
function $4(l, i) {
  if (i) return 0;
  const s = l / 1e3;
  return Math.min(L4, Math.max(0, s));
}
const H4 = 1;
function k4(l, i, s, o, f) {
  if (s >= o) {
    const d = Math.max(0, (i - H4) * 1e3);
    return l >= d && f === 0 ? 'advanceTier' : 'continue';
  }
  return l < i * 1e3 ? 'continue' : 'advanceWave';
}
function U4(l, i, s, o) {
  const f = l !== i;
  return { resetElapsed: f || s !== o, resetEnemies: f };
}
const un = 50,
  fn = 50;
function ao(l) {
  const i = l.x - un,
    s = l.y - fn;
  return Math.sqrt(i * i + s * s);
}
const j1 = 10,
  q4 = 5,
  V4 = 5;
function G4(l, i, s) {
  let o = l.x - i.x,
    f = l.y - i.y;
  const d = Math.sqrt(o * o + f * f);
  return (
    d === 0 ? ((o = 1), (f = 0)) : ((o /= d), (f /= d)),
    { x: Math.max(0, Math.min(100, l.x + o * s)), y: Math.max(0, Math.min(100, l.y + f * s)) }
  );
}
const A1 = 60,
  Y4 = 14,
  Z4 = {
    laser: 'laserShoot',
    cannon: 'cannonShoot',
    thunder: 'thunderShoot',
    cutter: 'cutterShoot',
  },
  X4 = {
    laser: 'activeLaser',
    cannon: 'activeCannon',
    thunder: 'activeThunder',
    cutter: 'activeCutter',
  },
  K4 = 0.5;
function Q4({ range: l, paused: i = !1 }) {
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
    E = q.useRef(0),
    T = q.useRef(0),
    D = q.useRef(0),
    R = q.useRef(0),
    Z = q.useRef(new Set()),
    V = q.useRef({ active: !1, remainingSec: 0, attackSpeedMul: 1, damageMul: 1 }),
    se = q.useRef([]),
    [U, pe] = q.useState([]),
    [Me, ne] = q.useState([]),
    [Re, nt] = q.useState([]),
    [et, Ve] = q.useState([]),
    [Ie, Ut] = q.useState([]),
    [Lt, ht] = q.useState([]),
    [O, X] = q.useState(0),
    [le, Ae] = q.useState(!1),
    Ee = G((de) => de.isRunActive),
    x = G((de) => de.currentTier),
    H = G((de) => de.currentWave),
    K = q.useMemo(() => m4(x), [x]),
    J = q.useRef(x),
    ie = q.useRef(H);
  q.useEffect(() => {
    const de = U4(J.current, x, ie.current, H);
    ((J.current = x),
      (ie.current = H),
      de.resetElapsed && ((d.current = 0), (m.current = 0), X(0)),
      de.resetEnemies && ((p.current = []), pe([]), (se.current = [])));
  }, [x, H]);
  const fe = q.useCallback((de) => {
      ne((_t) => _t.filter((Qe) => Qe.id !== de));
    }, []),
    Te = q.useCallback((de) => {
      nt((_t) => _t.filter((Qe) => Qe.id !== de));
    }, []),
    pt = q.useCallback((de) => {
      Ve((_t) => _t.filter((Qe) => Qe.id !== de));
    }, []),
    Ke = q.useCallback((de) => {
      Ut((_t) => _t.filter((Qe) => Qe.id !== de));
    }, []),
    Ba = q.useCallback((de) => {
      ht((_t) => _t.filter((Qe) => Qe.id !== de));
    }, []),
    Ea = q.useCallback(() => {
      const de = G.getState();
      if (de.activeCdSec > 0 || de.machineHp.isZero() || !de.isRunActive || !de.triggerActive(A1))
        return !1;
      Xe.play(X4[de.currentWeapon]);
      const Qe = $u({ machineMaxHp: de.machineMaxHp, machineLevels: de.machineLevels }),
        te = dn(de.runWorkshopLevels.attackMul),
        ga = [],
        ot = [],
        bt = (De) => {
          const At = new Map(De.map((He) => [He.enemyId, He]));
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
      switch (de.currentWeapon) {
        case 'laser': {
          const De = mo(de.weaponLv),
            At = { ...De, damageMul: De.damageMul * te };
          let He = 0;
          if (p.current.length > 0) {
            const Rt = p.current.reduce((La, $a) => (ao($a.position) < ao(La.position) ? $a : La)),
              Be = Rt.position.x - un,
              aa = Rt.position.y - fn;
            He = (Math.atan2(aa, Be) * 180) / Math.PI;
          }
          const tt = x2(Qe, At, p.current, He, un, fn);
          (bt(tt.hits.map((Rt) => ({ enemyId: Rt.enemyId, damage: Rt.damage }))),
            (E.current += 1),
            ot.push({ id: `pe-${E.current}`, kind: 'megaBeam', x: un, y: fn, angle: He }));
          break;
        }
        case 'cannon': {
          const De = fo(de.weaponLv),
            At = { ...De, damageMul: De.damageMul * te },
            He = i2(Qe, At, p.current),
            tt = 480,
            Rt = R.current;
          for (const Be of He.shots) {
            ((E.current += 1),
              ot.push({
                id: `pe-${E.current}`,
                kind: 'cannonShell',
                x1: un,
                y1: fn,
                x2: Be.blastX,
                y2: Be.blastY,
                durationMs: tt,
              }),
              (E.current += 1),
              ot.push({
                id: `pe-${E.current}`,
                kind: 'blast',
                x: Be.blastX,
                y: Be.blastY,
                delayMs: tt,
              }));
            for (const aa of Be.hits)
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
          const De = ho(de.weaponLv),
            At = { ...De, damageMul: De.damageMul * te },
            He = N2(Qe, At, p.current),
            tt = [{ x: un, y: fn }];
          for (const Rt of He.hits) {
            const Be = p.current.find((aa) => aa.id === Rt.enemyId);
            Be != null && tt.push({ x: Be.position.x, y: Be.position.y });
          }
          (tt.length > 1 &&
            ((E.current += 1), ot.push({ id: `pe-${E.current}`, kind: 'chain', points: tt })),
            bt(He.hits));
          break;
        }
        case 'cutter': {
          const De = Hc(de.weaponLv);
          ((V.current = p2(De)), Ae(!0));
          break;
        }
      }
      return (
        ga.length > 0 && ne((De) => [...De, ...ga]),
        ot.length > 0 && Ve((De) => [...De, ...ot]),
        !0
      );
    }, []);
  return (
    q.useEffect(() => {
      if (!Ee) return;
      const de = (_t) => {
        const Qe = _t - f.current;
        f.current = _t;
        const te = G.getState(),
          ga = te.machineHp.isZero(),
          ot = $4(Qe, te.isPaused || ga || s.current);
        if (ot > 0) {
          R.current += ot * 1e3;
          const bt = R.current,
            De = Array.from(te.equippedPatches.values());
          (te.tickCooldowns(ot),
            te.isAutoActive && te.activeCdSec <= 0 && Ea(),
            V.current.active && ((V.current = y2(V.current, ot)), V.current.active || Ae(!1)),
            (m.current = d.current),
            (d.current += ot * 1e3));
          const At = K[te.currentWave - 1];
          if (At != null) {
            const He = h4(
              At,
              d.current,
              m.current,
              Math.random,
              () => ((g.current += 1), `e-${te.currentTier}-${te.currentWave}-${g.current}`)
            );
            if (He.length > 0) {
              p.current = [...p.current, ...He];
              const W = He.filter((re) => re.kind !== 'normal');
              if (W.length > 0) {
                const re = W.map((ye) => {
                  D.current += 1;
                  const we = ye.kind,
                    We =
                      we === 'boss'
                        ? `TIER ${te.currentTier} BOSS`
                        : we === 'miniboss'
                          ? `MINI BOSS T${te.currentTier}W${te.currentWave}`
                          : `ELITE T${te.currentTier}W${te.currentWave}`;
                  return { id: `ap-${D.current}`, kind: we, name: We };
                });
                ht((ye) => [...ye, ...re]);
              }
            }
            ((p.current = p.current.map((W) => y4(W, ot, bt))),
              (p.current = p.current.map((W) => {
                let re = W;
                if (re.burnUntilMs != null && re.burnPerSec != null && re.burnUntilMs > bt) {
                  const we = re.burnPerSec.mulNumber(ot);
                  re = { ...re, hp: re.hp.sub(we) };
                }
                const ye = {};
                return (
                  re.frozenUntilMs != null && re.frozenUntilMs <= bt && (ye.frozenUntilMs = void 0),
                  re.burnUntilMs != null &&
                    re.burnUntilMs <= bt &&
                    ((ye.burnUntilMs = void 0), (ye.burnPerSec = void 0)),
                  Object.keys(ye).length > 0 && (re = { ...re, ...ye }),
                  re
                );
              })));
            const tt = [];
            se.current = se.current.filter((W) => (W.applyAtMs <= bt ? (tt.push(W), !1) : !0));
            const Rt = [];
            if (tt.length > 0) {
              const W = new Map(tt.map((re) => [re.enemyId, re]));
              p.current = p.current.map((re) => {
                const ye = W.get(re.id);
                if (ye == null) return re;
                let we = { ...re, hp: re.hp.sub(ye.damage) };
                if (ye.freeze && ye.freezeSec != null && ye.freezeSec > 0) {
                  const We = bt + ye.freezeSec * 1e3;
                  we = { ...we, frozenUntilMs: Math.max(we.frozenUntilMs ?? 0, We) };
                }
                if (ye.burnSec != null && ye.burnSec > 0) {
                  const We = bt + ye.burnSec * 1e3,
                    $t = ye.damage.mulNumber(0.3),
                    Oe = we.burnPerSec;
                  we = {
                    ...we,
                    burnUntilMs: Math.max(we.burnUntilMs ?? 0, We),
                    burnPerSec: Oe != null && Oe.gt($t) ? Oe : $t,
                  };
                }
                return we;
              });
              for (const re of tt) {
                const ye = p.current.find((we) => we.id === re.enemyId);
                ((b.current += 1),
                  Rt.push({
                    id: `de-${b.current}`,
                    x: (ye == null ? void 0 : ye.position.x) ?? 50,
                    y: (ye == null ? void 0 : ye.position.y) ?? 50,
                    value: re.damage,
                    crit: re.crit,
                  }));
              }
            }
            const Be = te.runWorkshopLevels.attackMul,
              aa = te.runWorkshopLevels.attackSpeedMul,
              La = dn(Be),
              $a = dn(aa),
              mn = g4(te.currentWeapon, te.weaponLv),
              wi = V.current.active ? V.current.attackSpeedMul : 1,
              Kn = Math.min(j1, mn * $a * wi),
              Qn = Kn > 0 ? 1e3 / Kn : 1 / 0;
            y.current += ot * 1e3;
            let zl = 0;
            const wa = 10,
              yt = [],
              Tt = [];
            for (; y.current >= Qn && zl < wa; ) {
              const W = te.currentWeapon === 'cutter' ? Y4 : l,
                re = p.current
                  .map((We) => ({ enemy: We, dist: ao(We.position) }))
                  .filter(({ dist: We }) => We <= W)
                  .sort((We, $t) => We.dist - $t.dist)
                  .map(({ enemy: We }) => We);
              if (re.length === 0) {
                y.current = Math.min(y.current, Qn);
                break;
              }
              ((y.current -= Qn), (zl += 1), Xe.play(Z4[te.currentWeapon]));
              const ye = $u({ machineMaxHp: te.machineMaxHp, machineLevels: te.machineLevels }),
                we = v4({
                  weapon: te.currentWeapon,
                  weaponLv: te.weaponLv,
                  machine: ye,
                  enemiesInRange: re,
                  rng: Math.random,
                  cutterAngleDeg: _.current,
                  attackMul: La,
                });
              if ((we.cutterAngle != null && (_.current = we.cutterAngle), we.hits.length > 0)) {
                const We = we.hits.map((Oe) => {
                  const he = p.current.find((at) => at.id === Oe.enemyId);
                  if (he == null) return { ...Oe, freeze: !1, freezeSec: void 0, burnSec: void 0 };
                  const _e = Ec(De, { type: 'onAttack', enemyKind: he.kind }, Math.random);
                  let Ze = Oe.damage;
                  return (
                    _e.damageMultiplier != null &&
                      _e.damageMultiplier !== 1 &&
                      (Ze = Ze.mulNumber(_e.damageMultiplier)),
                    _e.extraShot && (Ze = Ze.add(Oe.damage)),
                    _e.instantKill && (Ze = he.hp),
                    {
                      ...Oe,
                      damage: Ze,
                      freeze: _e.freeze === !0,
                      freezeSec: _e.freezeSec,
                      burnSec: _e.burnSec,
                    }
                  );
                });
                if (te.currentWeapon === 'cannon')
                  for (const he of We)
                    se.current.push({
                      enemyId: he.enemyId,
                      damage: he.damage,
                      crit: he.crit ?? !1,
                      freeze: he.freeze,
                      freezeSec: he.freezeSec,
                      burnSec: he.burnSec,
                      applyAtMs: bt + 480,
                    });
                else {
                  const Oe = new Map(We.map((he) => [he.enemyId, he]));
                  p.current = p.current.map((he) => {
                    const _e = Oe.get(he.id);
                    if (_e == null) return he;
                    let Ze = { ...he, hp: he.hp.sub(_e.damage) };
                    if (_e.freeze && _e.freezeSec != null && _e.freezeSec > 0) {
                      const at = bt + _e.freezeSec * 1e3;
                      Ze = { ...Ze, frozenUntilMs: Math.max(Ze.frozenUntilMs ?? 0, at) };
                    }
                    if (_e.burnSec != null && _e.burnSec > 0) {
                      const at = bt + _e.burnSec * 1e3,
                        Mt = _e.damage.mulNumber(0.3),
                        Na = Ze.burnPerSec;
                      Ze = {
                        ...Ze,
                        burnUntilMs: Math.max(Ze.burnUntilMs ?? 0, at),
                        burnPerSec: Na != null && Na.gt(Mt) ? Na : Mt,
                      };
                    }
                    return Ze;
                  });
                  for (const he of We) {
                    const _e = p.current.find((Ze) => Ze.id === he.enemyId);
                    ((b.current += 1),
                      yt.push({
                        id: `de-${b.current}`,
                        x: (_e == null ? void 0 : _e.position.x) ?? 50,
                        y: (_e == null ? void 0 : _e.position.y) ?? 50,
                        value: he.damage,
                        crit: he.crit,
                      }));
                  }
                }
                const $t = We.map((Oe) => p.current.find((he) => he.id === Oe.enemyId))
                  .filter((Oe) => Oe != null)
                  .map((Oe) => ({ x: Oe.position.x, y: Oe.position.y }));
                if (te.currentWeapon === 'laser')
                  for (const Oe of $t)
                    ((E.current += 1),
                      Tt.push({
                        id: `pj-${E.current}`,
                        kind: 'laser',
                        x1: un,
                        y1: fn,
                        x2: Oe.x,
                        y2: Oe.y,
                      }));
                else if (te.currentWeapon === 'cannon') {
                  const he = we.impactX,
                    _e = we.impactY;
                  he != null &&
                    _e != null &&
                    ((E.current += 1),
                    Tt.push({
                      id: `pj-${E.current}`,
                      kind: 'cannonShell',
                      x1: un,
                      y1: fn,
                      x2: he,
                      y2: _e,
                      durationMs: 480,
                    }),
                    (E.current += 1),
                    Tt.push({ id: `pj-${E.current}`, kind: 'blast', x: he, y: _e, delayMs: 480 }));
                } else if (te.currentWeapon === 'thunder' && $t.length > 0)
                  for (const he of $t)
                    ((E.current += 1),
                      Tt.push({
                        id: `pj-${E.current}`,
                        kind: 'thunderStrike',
                        x: he.x,
                        y: he.y,
                        durationMs: 320,
                      }));
              }
            }
            const gt = [...yt, ...Rt];
            (gt.length > 0 && ne((W) => [...W, ...gt]), Tt.length > 0 && Ve((W) => [...W, ...Tt]));
            const F = dn(te.runWorkshopLevels.screwGainMul),
              Wn = [],
              Ha = [],
              Jn = [];
            let ka = Q.ZERO,
              Ua = Q.ZERO,
              na = Q.ZERO,
              qa = Q.ZERO;
            for (const W of p.current)
              if (W.hp.lte(Q.ZERO)) {
                ((A.current += 1),
                  Wn.push({ id: `dh-${A.current}`, x: W.position.x, y: W.position.y }));
                const re = Ec(De, { type: 'onKill', enemyKind: W.kind }, Math.random);
                re.heal != null && (qa = qa.add(re.heal));
                const we =
                    Ec(
                      De,
                      {
                        type: 'onDropRoll',
                        baseDrops: {
                          screw: W.reward.screw,
                          bolt: W.reward.bolt,
                          alloy: W.reward.alloyAmount,
                        },
                      },
                      Math.random
                    ).dropMultiplier ?? 1,
                  We = W.reward.screw;
                We > 0 &&
                  ((ka = ka.add(Q.fromNumber(We * F * we))),
                  (T.current += 1),
                  Ha.push({
                    id: `pk-${T.current}`,
                    x: W.position.x,
                    y: W.position.y,
                    iconName: 'screw',
                  }));
                const $t = W.reward.bolt;
                ($t > 0 &&
                  (W.kind !== 'normal' || Math.random() < K4) &&
                  ((Ua = Ua.add(Q.fromNumber($t * we))),
                  (T.current += 1),
                  Ha.push({
                    id: `pk-${T.current}`,
                    x: W.position.x,
                    y: W.position.y,
                    iconName: 'bolt',
                  })),
                  W.reward.alloyChance > 0 &&
                    W.reward.alloyAmount > 0 &&
                    Math.random() < W.reward.alloyChance &&
                    ((na = na.add(Q.fromNumber(W.reward.alloyAmount * we))),
                    (T.current += 1),
                    Ha.push({
                      id: `pk-${T.current}`,
                      x: W.position.x,
                      y: W.position.y,
                      iconName: 'alloy',
                    })));
                const Oe =
                    Tl(
                      Ei.find((_e) => _e.key === 'patchDropRate'),
                      te.machineLevels.patchDropRate
                    ) * we,
                  he = B4(W.kind, te.currentTier, Oe, Math.random);
                (he != null && te.addPatch(he.name, he.tier, 1),
                  Xe.play(W.kind === 'boss' || W.kind === 'miniboss' ? 'bossKill' : 'enemyKill'));
              } else Jn.push(W);
            (qa.isZero() || te.setMachineHp(te.machineHp.add(qa)),
              Wn.length > 0 && ((p.current = Jn), nt((W) => [...W, ...Wn])),
              Ha.length > 0 && Ut((W) => [...W, ...Ha]),
              ka.isZero() || te.addScrew(ka),
              Ua.isZero() || te.addBolt(Ua),
              na.isZero() || te.addAlloy(na));
            const Fn = $u({ machineMaxHp: te.machineMaxHp, machineLevels: te.machineLevels });
            let In = Q.ZERO;
            const Ni = new Set();
            if (
              ((p.current = p.current.map((W) => {
                if (ao(W.position) > q4) return W;
                const ye = Jb(W.atk, Fn);
                return (
                  (In = In.add(ye.mulNumber(ot))),
                  Ni.add(W.id),
                  Z.current.has(W.id) ? W : { ...W, position: G4(W.position, { x: un, y: fn }, V4) }
                );
              })),
              (Z.current = Ni),
              !In.isZero())
            ) {
              const re =
                Ec(De, { type: 'onHit', receivedDamage: In }, Math.random).overrideReceivedDamage ??
                In;
              if (!re.isZero()) {
                const ye = te.machineHp;
                te.damageHp(re);
                const we = G.getState().machineHp;
                Xe.play(we.isZero() && !ye.isZero() ? 'machineDown' : 'machineHit');
              }
            }
            const Pn = k4(d.current, At.durationSec, te.currentWave, K.length, p.current.length);
            if (Pn === 'advanceWave' || Pn === 'advanceTier') {
              const W = Ec(De, { type: 'onWaveClear' }, Math.random);
              (W.heal != null && !W.heal.isZero() && te.setMachineHp(te.machineHp.add(W.heal)),
                W.boltGain != null && !W.boltGain.isZero() && te.addBolt(W.boltGain),
                Pn === 'advanceWave'
                  ? (te.advanceWave(), Xe.play('waveClear'))
                  : (te.advanceTier(), Xe.play('tierClear')),
                (d.current = 0),
                (m.current = 0));
            }
          }
        }
        (pe(p.current), X(d.current / 1e3), (o.current = requestAnimationFrame(de)));
      };
      return (
        (f.current = performance.now()),
        (o.current = requestAnimationFrame(de)),
        () => {
          o.current != null && (cancelAnimationFrame(o.current), (o.current = null));
        }
      );
    }, [Ee, K, l, Ea]),
    {
      enemies: U,
      damageEvents: Me,
      deathEvents: Re,
      projectileEvents: et,
      pickupEvents: Ie,
      appearanceEvents: Lt,
      waveElapsedSec: O,
      onDamageDone: fe,
      onDeathDone: Te,
      onProjectileDone: pt,
      onPickupDone: Ke,
      onAppearanceDone: Ba,
      fireActive: Ea,
      isOverdriveActive: le,
    }
  );
}
const kh = 30,
  W4 = 2;
function J4(l, i) {
  return l && i.lte(Q.ZERO) ? 'gameover' : null;
}
function F4() {
  const { navigate: l } = Zn(),
    i = G((F) => F.isRunActive),
    s = G((F) => F.screw),
    o = G((F) => F.bolt),
    f = G((F) => F.alloy),
    d = G((F) => F.runStartBolt),
    m = G((F) => F.runStartAlloy),
    p = G((F) => F.machineHp),
    g = G((F) => F.machineMaxHp),
    y = G((F) => F.currentTier),
    _ = G((F) => F.currentWave),
    b = G((F) => F.currentWeapon),
    A = G((F) => F.weaponLv),
    E = G((F) => F.activeCdSec),
    T = G((F) => F.isAutoActive),
    D = G((F) => F.isPaused),
    R = G((F) => F.runWorkshopLevels),
    Z = G((F) => F.bgmVolume),
    V = G((F) => F.seVolume),
    se = G((F) => F.setBgmVolume),
    U = G((F) => F.setSeVolume),
    pe = G((F) => F.setAutoActive),
    Me = G((F) => F.switchWeapon),
    ne = G((F) => F.setPaused),
    Re = G((F) => F.upgradeRunWorkshop),
    [nt, et] = q.useState(!1),
    [Ve, Ie] = q.useState(!1),
    [Ut, Lt] = q.useState(!1),
    [ht, O] = q.useState(!1),
    X = q.useRef(i);
  (q.useEffect(() => {
    (i && !X.current && O(!0), (X.current = i));
  }, [i]),
    q.useEffect(() => {
      _ === 30 ? Xe.playBgm('battleBoss') : Xe.playBgm('battleNormal');
    }, [_]));
  const le = q.useRef(_),
    [Ae, Ee] = q.useState(null);
  q.useEffect(() => {
    (le.current !== _ && Ee((F) => (F ?? 0) + 1), (le.current = _));
  }, [_]);
  const x = J4(i, p),
    [H, K] = q.useState(null),
    J = H ?? x,
    ie = J !== null,
    {
      enemies: fe,
      damageEvents: Te,
      deathEvents: pt,
      projectileEvents: Ke,
      pickupEvents: Ba,
      waveElapsedSec: Ea,
      onDamageDone: de,
      onDeathDone: _t,
      onProjectileDone: Qe,
      onPickupDone: te,
      appearanceEvents: ga,
      onAppearanceDone: ot,
      fireActive: bt,
      isOverdriveActive: De,
    } = Q4({ range: kh, paused: ie }),
    At = Math.max(0, Ku - Ea),
    He = [],
    tt = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    Rt = p,
    Be = g.isZero() ? Q.fromNumber(1) : g,
    aa = () => {
      (ne(!D), Xe.play('tap'));
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
    wi = () => {
      l('preparation');
    },
    Kn = (F, Wn) => {
      const Ha = Re(F, Wn);
      Xe.play(Ha ? 'purchaseOk' : 'reject');
    },
    Qn = (F) => {
      (Me(F), Xe.play('weaponSwitch'));
    },
    zl = () => {
      bt() || Xe.play('reject');
    },
    wa = o.sub(d),
    yt = f.sub(m),
    Tt = { bolt: wa.lt(Q.ZERO) ? Q.ZERO : wa, alloy: yt.lt(Q.ZERO) ? Q.ZERO : yt, patches: [] },
    gt = 30;
  return u.jsxs('div', {
    className: Bu.root,
    children: [
      u.jsx(El, {
        noScroll: !0,
        variant: 'battle',
        header: u.jsx(V5, {
          hpCurrent: Rt,
          hpMax: Be,
          tier: y,
          wave: _,
          totalWaves: gt,
          secondsRemaining: At,
          secondsTotal: Ku,
          isBossWave: _ === gt,
          paused: D || ie,
        }),
        footer: u.jsxs('div', {
          className: Bu.battleFooter,
          children: [
            u.jsx(Z3, {
              open: nt,
              screw: s,
              levels: R,
              onUpgrade: Kn,
              onClose: () => {
                et(!1);
              },
            }),
            u.jsx(u5, {
              screw: s,
              equippedWeapon: b,
              weaponCds: tt,
              activeCd: E,
              activeMax: A1,
              isAutoActive: T,
              onSwitchWeapon: Qn,
              onActivate: zl,
              onToggleAuto: pe,
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
        children: u.jsx(wx, {
          enemies: fe,
          damageEvents: Te,
          hitEvents: He,
          deathEvents: pt,
          projectileEvents: Ke,
          pickupEvents: Ba,
          onDamageDone: de,
          onDeathDone: _t,
          onProjectileDone: Qe,
          onPickupDone: te,
          showCutterOrbit: b === 'cutter' && i && !D && !ie,
          showOverdriveAura: De && i && !ie,
          cutterRotateMs: d2(
            Math.min(j1, Hc(A).attackPerSec * dn(R.attackSpeedMul) * (De ? m1 : 1)),
            W4
          ),
          range: kh,
        }),
      }),
      u.jsxs('div', {
        className: Bu.overlayLayer,
        'aria-live': 'polite',
        children: [
          u.jsx(j3, {
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
          ie &&
            u.jsx(k3, {
              open: ie,
              status: J,
              reachedTier: y,
              reachedWave: _,
              killed: 0,
              elapsedSec: 0,
              reward: Tt,
              onClose: wi,
            }),
          u.jsx(W3, {
            open: Ut,
            onClose: () => {
              Lt(!1);
            },
          }),
          ht &&
            u.jsx(wh, {
              kind: 'battle-start',
              onDone: () => {
                O(!1);
              },
            }),
          ga.map((F) =>
            u.jsx(
              wh,
              {
                kind: F.kind === 'miniboss' ? 'boss' : F.kind,
                name: F.name,
                onDone: () => ot(F.id),
              },
              F.id
            )
          ),
          Ae != null &&
            u.jsx(
              TS,
              {
                waveNumber: _,
                onDone: () => {
                  Ee(null);
                },
              },
              Ae
            ),
        ],
      }),
    ],
  });
}
const I4 = '_root_1420p_3',
  P4 = { root: I4 };
function ej() {
  const l = G((f) => f.machineLevels),
    i = G((f) => f.bolt),
    s = G((f) => f.incrementMachineLv),
    o = G((f) => f.spendBolt);
  return u.jsx('div', {
    className: P4.root,
    children: Ei.map((f) => {
      const d = l[f.key],
        m = f.maxLv != null && d >= f.maxLv,
        p = Tl(f, d),
        g = Tl(f, d + 1),
        y = (et) => (f.unit === '%' ? Math.round(et * 1e3) / 10 : et),
        _ = y(p),
        b = y(g),
        A = cf(f, d),
        E = Ou(f, d, 5),
        T = Q.fromNumber(A),
        D = Q.fromNumber(E),
        R = Wb(f, d, i),
        Z = f.maxLv != null ? f.maxLv - d : Number.POSITIVE_INFINITY,
        V = Math.min(R, Z),
        se = V > 0 ? Ou(f, d, V) : A,
        U = Q.fromNumber(se),
        pe = i.lt(T),
        Me = i.lt(D) || (f.maxLv != null && d + 5 > f.maxLv),
        ne = V < 1,
        Re = m
          ? []
          : [
              { amount: '+1', cost: T, disabled: pe },
              { amount: '+5', cost: D, disabled: Me },
              { amount: 'MAX', cost: U, disabled: ne },
            ],
        nt = (et) => {
          if (m) return;
          let Ve = 0;
          if ((et === '+1' ? (Ve = 1) : et === '+5' ? (Ve = 5) : et === 'MAX' && (Ve = V), Ve < 1))
            return;
          f.maxLv != null && (Ve = Math.min(Ve, f.maxLv - d));
          const Ie = Ou(f, d, Ve),
            Ut = Q.fromNumber(Ie);
          if (o(Ut)) for (let ht = 0; ht < Ve; ht++) s(f.key);
        };
      return u.jsx(
        sf,
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
function tj() {
  const { navigate: l } = Zn(),
    i = (s) => {
      l(s);
    };
  return u.jsx(El, {
    header: u.jsx($c, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: u.jsx(Lc, { active: 'machine', onChange: i }),
    children: u.jsx(ej, {}),
  });
}
const aj = () => u.jsx('div', { children: u.jsx('h1', { children: 'Not Found' }) }),
  nj = '_content_9srrg_1',
  lj = { content: nj },
  ij = '_root_1l9jp_1',
  cj = '_header_1l9jp_8',
  sj = '_headerTitleRow_1l9jp_15',
  oj = '_headerCount_1l9jp_21',
  rj = '_slotGrid_1l9jp_35',
  uj = '_emptyHint_1l9jp_41',
  _i = { root: ij, header: cj, headerTitleRow: sj, headerCount: oj, slotGrid: rj, emptyHint: uj },
  fj = '_wrapper_16mrg_3',
  dj = '_filled_16mrg_16',
  mj = '_empty_16mrg_25',
  hj = '_locked_16mrg_26',
  pj = '_slotInner_16mrg_59',
  yj = '_emptyIcon_16mrg_67',
  gj = '_emptyLabel_16mrg_74',
  qn = {
    wrapper: fj,
    filled: dj,
    empty: mj,
    locked: hj,
    slotInner: pj,
    emptyIcon: yj,
    emptyLabel: gj,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  },
  vj = '_root_12m2l_3',
  _j = '_selected_12m2l_15',
  bj = '_merging_12m2l_19',
  Sj = '_locked_12m2l_23',
  xj = '_disabled_12m2l_28',
  jj = '_card_12m2l_34',
  Aj = '_tierBadge_12m2l_46',
  Tj = '_count_12m2l_54',
  Mj = '_countZero_12m2l_74',
  Ej = '_iconWrap_12m2l_79',
  wj = '_name_12m2l_90',
  Nj = '_detail_12m2l_102',
  zj = '_trigger_12m2l_110',
  Cj = '_effect_12m2l_121',
  Rj = '_mergingBadge_12m2l_133',
  Dt = {
    root: vj,
    selected: _j,
    merging: bj,
    locked: Sj,
    disabled: xj,
    card: jj,
    tierBadge: Aj,
    count: Tj,
    countZero: Mj,
    iconWrap: Ej,
    name: wj,
    detail: Nj,
    trigger: zj,
    effect: Cj,
    mergingBadge: Rj,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  Oj = { sm: 22, md: 26, lg: 32 },
  Uh = { sm: 38, md: 44, lg: 52 };
function uf({
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
    E = `var(--c-patch-t${A})`,
    T = b != null && !y && !g,
    D = m ? { boxShadow: 'var(--glow-cyan-md)' } : p ? { boxShadow: 'var(--glow-purple-md)' } : {},
    R = {
      width: Uh[_],
      height: Uh[_],
      opacity: g ? 0.35 : 1,
      background: g ? 'var(--c-surface)' : `linear-gradient(135deg, ${E}22, ${E}08)`,
      border: g ? '1px solid var(--c-border-faint)' : `1px solid ${E}55`,
      filter: g ? 'none' : `drop-shadow(0 0 4px ${E}55)`,
    },
    Z = {
      background: o >= 2 ? `${E}22` : void 0,
      borderColor: o >= 2 ? E : void 0,
      color: o >= 2 ? E : void 0,
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
    children: u.jsxs(Nl, {
      variant: 'elevated',
      padding: 'sm',
      interactive: T,
      className: Dt.card,
      children: [
        !g &&
          u.jsx('span', {
            className: Dt.tierBadge,
            children: u.jsx(kc, { text: `T${A}`, variant: 'patch-tier', tier: s }),
          }),
        u.jsxs('span', {
          className: [Dt.count, o === 0 ? Dt.countZero : ''].filter(Boolean).join(' '),
          style: Z,
          children: ['×', g ? '?' : o],
        }),
        u.jsx('div', {
          className: Dt.iconWrap,
          style: R,
          children: u.jsx(Ye, {
            name: g ? 'close' : i,
            size: Oj[_],
            color: g ? 'var(--c-text-disabled)' : E,
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
function T1({ patch: l = null, slotIndex: i, locked: s = !1, size: o = 'md', onClick: f }) {
  const d = l != null,
    m = f != null && !s,
    p = i != null ? `Slot ${i}` : '',
    g = d
      ? `Slot ${i ?? ''}: ${l.name} (Tier ${l.tier})`
      : s
        ? `Slot ${i ?? ''} (locked)`.trim()
        : `Slot ${i ?? ''} (empty)`.trim(),
    y = d ? qn.filled : s ? qn.locked : qn.empty;
  return u.jsx('div', {
    className: [qn.wrapper, y, qn[`size-${o}`]].filter(Boolean).join(' '),
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
        ? u.jsx(uf, {
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
function Dj(l) {
  return Math.min(1 + l, ji);
}
const Bj = {
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
  Lj = {
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
  $j = {
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
function Hj({ overridePatches: l, overrideEquipped: i, overridePatchSlotsLv: s }) {
  const o = G((T) => T.patches),
    f = G((T) => T.equippedPatches),
    d = G((T) => T.machineLevels.patchSlots),
    m = G((T) => T.unequipPatch),
    p = l ?? o,
    g = i ?? f,
    _ = Dj(s ?? d),
    b = (T) => {
      const D = g.get(T);
      if (!D) return null;
      const R = `${D.name}#${D.tier}`,
        Z = p.get(R);
      return {
        patchId: R,
        name: D.name,
        iconName: Bj[D.name] ?? 'spark',
        tier: D.tier,
        trigger: Lj[D.name] ?? '常時',
        effect: $j[D.name] ?? '-',
        count: (Z == null ? void 0 : Z.count) ?? 0,
      };
    },
    A = (T) => {
      g.get(T) && m(T);
    },
    E = ji - _;
  return u.jsxs('div', {
    className: _i.root,
    children: [
      u.jsxs('div', {
        className: _i.header,
        children: [
          u.jsxs('div', {
            className: _i.headerTitleRow,
            children: [
              u.jsx(Y, { variant: 'heading-3', children: '装着スロット' }),
              u.jsxs(Y, {
                variant: 'caption',
                color: 'mid',
                className: _i.headerCount,
                children: [g.size, '/', _],
              }),
            ],
          }),
          u.jsxs(Y, {
            variant: 'caption',
            color: 'dim',
            children: ['(', ji, ' スロット中 ', E, ' ロック・', g.size, ' / ', _, ' ', '装着中)'],
          }),
        ],
      }),
      u.jsx('div', {
        className: _i.slotGrid,
        children: Array.from({ length: ji }, (T, D) => {
          const R = D >= _,
            Z = R ? null : b(D);
          return u.jsx(
            T1,
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
          className: _i.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const kj = '_root_16zq4_1',
  Uj = '_header_16zq4_8',
  qj = '_grid_16zq4_14',
  Vj = '_empty_16zq4_20',
  wc = { root: kj, header: Uj, grid: qj, empty: Vj },
  Gj = {
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
  Yj = {
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
  Zj = {
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
function Xj({ overridePatches: l, overrideEquipped: i, selectedId: s, onSelect: o }) {
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
                uf,
                {
                  patchId: b,
                  name: _.name,
                  iconName: Gj[_.name] ?? 'spark',
                  tier: _.tier,
                  count: _.count,
                  trigger: Yj[_.name] ?? '常時',
                  effect: Zj[_.name] ?? '-',
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
const Kj = '_root_1svx2_1',
  Qj = '_header_1svx2_8',
  Wj = '_tierControl_1svx2_14',
  Jj = '_tierStepperRow_1svx2_24',
  Fj = '_mergeList_1svx2_30',
  Ij = '_empty_1svx2_36',
  bi = { root: Kj, header: Qj, tierControl: Wj, tierStepperRow: Jj, mergeList: Fj, empty: Ij },
  Pj = '_stepper_1ouvh_1',
  eA = '_disabled_1ouvh_6',
  tA = '_btn_1ouvh_11',
  aA = '_value_1ouvh_38',
  Si = {
    stepper: Pj,
    disabled: eA,
    btn: tA,
    value: aA,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  nA = ({
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
  Qu = 5,
  lA = {
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
function M1(l, i) {
  const s = [];
  for (const o of l.values())
    o.tier < i &&
      o.count >= 2 &&
      s.push({ name: o.name, tier: o.tier, count: o.count, iconName: lA[o.name] ?? 'spark' });
  return s.sort((o, f) => o.tier - f.tier || o.name.localeCompare(f.name));
}
function iA(l, i) {
  let s = new Map(l),
    o = !0;
  for (; o; ) {
    o = !1;
    for (const f of Array.from(s.values())) {
      if (f.tier >= i || f.count < 2 || f.tier >= Qu) continue;
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
function cA({ overridePatches: l }) {
  const i = G((A) => A.patches),
    s = G((A) => A.addPatch),
    o = G((A) => A.consumePatch),
    f = G((A) => A.pruneEmptyPatches),
    d = l ?? i,
    m = Math.max(1, ...Array.from(d.values()).map((A) => A.tier)),
    [p, g] = q.useState(Math.min(m, Qu - 1)),
    y = M1(d, p + 1),
    _ = y.length > 0,
    b = () => {
      if (l) return;
      const A = iA(d, p + 1);
      for (const [E, T] of d) {
        const D = A.get(E),
          R = (D == null ? void 0 : D.count) ?? 0;
        R < T.count && o(T.name, T.tier, T.count - R);
      }
      for (const [E, T] of A) {
        const D = d.get(E),
          R = (D == null ? void 0 : D.count) ?? 0;
        T.count > R && s(T.name, T.tier, T.count - R);
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
              u.jsx(nA, { value: p, min: 1, max: Qu - 1, onChange: g }),
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
                    uf,
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
function sA(l) {
  return Math.min(1 + l, ji);
}
function oA() {
  const { navigate: l } = Zn(),
    [i, s] = q.useState('equip'),
    o = G((E) => E.equippedPatches),
    f = G((E) => E.patches),
    d = G((E) => E.machineLevels.patchSlots),
    m = sA(d),
    p = o.size,
    g = f.size,
    y = M1(f, 5).length,
    _ = (E) => {
      l(E);
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
    header: u.jsx($c, {
      title: 'パッチ庫',
      subtitle: `装着 ${p}/${m} ・ 在庫 ${g} 種`,
      onBack: b,
      currencies: [],
      tabBar: u.jsx(oo, { tabs: A, value: i, onChange: s, variant: 'underline', fullWidth: !0 }),
    }),
    footer: u.jsx(Lc, { active: 'patches', onChange: _ }),
    children: u.jsxs('div', {
      className: lj.content,
      children: [
        i === 'equip' && u.jsx(Hj, {}),
        i === 'inventory' && u.jsx(Xj, {}),
        i === 'merge' && u.jsx(cA, {}),
      ],
    }),
  });
}
const rA = '_footer_qoo97_1',
  uA = '_tabPanel_qoo97_7',
  qh = { footer: rA, tabPanel: uA },
  fA = '_wrapper_1lf9s_1',
  dA = '_header_1lf9s_7',
  mA = '_headerLabel_1lf9s_13',
  hA = '_empty_1lf9s_18',
  pA = '_emptyIcon_1lf9s_29',
  yA = '_grid_1lf9s_33',
  gA = '_note_1lf9s_39',
  _l = { wrapper: fA, header: dA, headerLabel: mA, empty: hA, emptyIcon: pA, grid: yA, note: gA },
  vA = {
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
function _A({ onOpenPatchScreen: l }) {
  const i = G((m) => m.equippedPatches),
    s = G((m) => m.machineLevels.patchSlots),
    o = Math.min(1 + s, ji),
    f = [];
  for (let m = 0; m < o; m++) {
    const p = i.get(m);
    if (p != null) {
      const g = vA[p.name],
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
    className: _l.wrapper,
    children: [
      u.jsxs('div', {
        className: _l.header,
        children: [
          u.jsxs(Y, {
            variant: 'caption',
            color: 'mid',
            className: _l.headerLabel,
            children: ['装着 ', d, ' / ', o],
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
              u.jsx(T1, { patch: m.patch, slotIndex: m.idx, onClick: l }, p)
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
const bA = '_wrapper_iebuz_1',
  SA = '_header_iebuz_7',
  xA = '_grid_iebuz_12',
  ku = { wrapper: bA, header: SA, grid: xA },
  jA = [
    { kind: 'laser', name: 'LASER', description: '高速直進ビーム。貫通で削る。', buildStats: y1 },
    { kind: 'cannon', name: 'CANNON', description: '範囲爆発で群れを薙ぐ。', buildStats: g1 },
    { kind: 'thunder', name: 'THUNDER', description: '同時 3 体を撃つ電撃。', buildStats: v1 },
    {
      kind: 'cutter',
      name: 'CUTTER',
      description: 'マシン周囲を旋回する斬撃。',
      buildStats: (l, i) => _1(l, i),
    },
  ];
function AA({ selectedWeapon: l, onSelect: i }) {
  const s = G((y) => y.initialWeapon),
    o = G((y) => y.setInitialWeapon),
    f = G((y) => y.machineLevels),
    d = h1(f.baseAttack),
    m = p1(f.range),
    p = l ?? s,
    g = (y) => {
      (o(y), i == null || i(y));
    };
  return u.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: ku.wrapper,
    children: [
      u.jsx('div', {
        className: ku.header,
        children: u.jsx(Y, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      u.jsx('div', {
        className: ku.grid,
        children: jA.map((y) =>
          u.jsx(
            u1,
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
const TA = '_wrapper_1rg1e_1',
  MA = '_sticky_1rg1e_15',
  EA = '_summary_1rg1e_19',
  wA = '_weaponInfo_1rg1e_29',
  NA = '_patchInfo_1rg1e_37',
  Nc = { wrapper: TA, sticky: MA, summary: EA, weaponInfo: wA, patchInfo: NA };
function zA({
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
      u.jsx(kt, {
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
const CA = '_wrapper_1ul9l_1',
  RA = '_header_1ul9l_7',
  OA = '_grid_1ul9l_14',
  DA = '_tierBtn_1ul9l_20',
  BA = '_active_1ul9l_35',
  LA = '_tierLabel_1ul9l_50',
  $A = '_frontierLabel_1ul9l_61',
  bl = {
    wrapper: CA,
    header: RA,
    grid: OA,
    tierBtn: DA,
    active: BA,
    tierLabel: LA,
    frontierLabel: $A,
  };
function HA({ selectedTier: l, onSelect: i }) {
  const s = G((m) => m.highestTier),
    o = Math.max(1, s),
    f = [];
  for (let m = 1; m <= o; m++) f.push(m);
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
          u.jsxs(Y, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', o] }),
        ],
      }),
      u.jsx('div', {
        className: bl.grid,
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
              className: [bl.tierBtn, p ? bl.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': y },
              onClick: () => (i == null ? void 0 : i(m)),
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
const kA = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function UA(l) {
  const { initialSelectedTier: i } = l,
    { navigate: s } = Zn(),
    [o, f] = q.useState('tier'),
    d = G((R) => R.highestTier),
    [m, p] = q.useState(i ?? Math.max(1, d)),
    g = G((R) => R.initialWeapon),
    _ = [...G((R) => R.equippedPatches).values()].length,
    b = G((R) => R.machineLevels),
    A = G((R) => R.startRun);
  function E() {
    const R = Ei.find((V) => V.key === 'maxHp'),
      Z = R != null ? Tl(R, b.maxHp) : 100;
    (A({ initialWeapon: g, baseMachineMaxHp: Q.fromNumber(Z) }), s('battle'));
  }
  const T = u.jsx($c, {
      title: '出撃準備',
      currencies: ['bolt', 'alloy'],
      tabBar: u.jsx(oo, { tabs: kA, value: o, onChange: f, variant: 'underline', fullWidth: !0 }),
    }),
    D = u.jsxs('div', {
      className: qh.footer,
      children: [
        u.jsx(zA, { tier: m, weaponKind: g, patchCount: _, sticky: !1, onLaunch: E }),
        u.jsx(Lc, { active: 'preparation', onChange: (R) => s(R) }),
      ],
    });
  return u.jsx(El, {
    header: T,
    footer: D,
    children: u.jsxs('div', {
      className: qh.tabPanel,
      children: [
        o === 'tier' && u.jsx(HA, { selectedTier: m, onSelect: p }),
        o === 'weapon' && u.jsx(AA, {}),
        o === 'patches' && u.jsx(_A, { onOpenPatchScreen: () => s('patches') }),
      ],
    }),
  });
}
const qA = '_content_8gsha_1',
  VA = { content: qA },
  GA = '_root_1b7n9_1',
  YA = '_header_1b7n9_8',
  ZA = '_storageCard_1b7n9_13',
  XA = '_storageRow_1b7n9_23',
  KA = '_divider_1b7n9_29',
  QA = '_section_1b7n9_34',
  WA = '_dangerSection_1b7n9_40',
  JA = '_sectionHeader_1b7n9_50',
  pa = {
    root: GA,
    header: YA,
    storageCard: ZA,
    storageRow: XA,
    divider: KA,
    section: QA,
    dangerSection: WA,
    sectionHeader: JA,
  },
  FA = '_wrapper_11b89_1',
  IA = '_disabled_11b89_6',
  PA = '_hiddenInput_11b89_11',
  eT = '_btn_11b89_15',
  tT = '_fileName_11b89_41',
  zc = { wrapper: FA, disabled: IA, hiddenInput: PA, btn: eT, fileName: tT },
  aT = ({
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
function nT({ storageInfo: l, onExport: i, onImport: s, onReset: o }) {
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
    b = async (E) => {
      if (!(!E || !s)) {
        p(!0);
        try {
          await s(E);
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
          u.jsx(kt, {
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
          u.jsx(aT, {
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
            disabled: !o,
          }),
        ],
      }),
      u.jsx(x1, {
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
const lT = '_root_1rbig_1',
  iT = '_header_1rbig_8',
  cT = '_section_1rbig_13',
  Uu = { root: lT, header: iT, section: cT },
  sT = '_wrapper_16nmz_9',
  oT = '_disabled_16nmz_15',
  rT = '_off_16nmz_31',
  uT = '_on_16nmz_35',
  fT = '_accent_primary_16nmz_35',
  dT = '_accent_secondary_16nmz_39',
  mT = '_accent_success_16nmz_43',
  hT = '_accent_disabled_16nmz_47',
  pT = '_size_md_16nmz_56',
  yT = '_knob_16nmz_60',
  gT = '_size_sm_16nmz_70',
  vT = '_labelGroup_16nmz_93',
  _T = '_label_16nmz_93',
  bT = '_description_16nmz_106',
  Aa = {
    wrapper: sT,
    disabled: oT,
    switch: '_switch_16nmz_22',
    off: rT,
    on: uT,
    accent_primary: fT,
    accent_secondary: dT,
    accent_success: mT,
    accent_disabled: hT,
    size_md: pT,
    knob: yT,
    size_sm: gT,
    labelGroup: vT,
    label: _T,
    description: bT,
  },
  E1 = ({
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
        (o || f) &&
          u.jsxs('span', {
            className: Aa.labelGroup,
            children: [
              o && u.jsx('span', { className: Aa.label, children: o }),
              f && u.jsx('span', { className: Aa.description, children: f }),
            ],
          }),
      ],
    });
  };
function ST({ overrideVibration: l, onVibrationChange: i }) {
  const s = G((m) => m.vibrationEnabled),
    o = G((m) => m.setVibrationEnabled),
    f = l ?? s,
    d = (m) => {
      i ? i(m) : o(m);
    };
  return u.jsxs('div', {
    className: Uu.root,
    children: [
      u.jsx('div', {
        className: Uu.header,
        children: u.jsx(Y, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      u.jsx('div', {
        className: Uu.section,
        children: u.jsx(E1, {
          checked: f,
          onChange: d,
          label: 'バイブレーション',
          description: '操作時に端末を振動させます',
        }),
      }),
    ],
  });
}
const xT = '_root_nuc5y_2',
  jT = '_muteRow_nuc5y_9',
  AT = '_muteLabelGroup_nuc5y_16',
  TT = '_sliderRow_nuc5y_24',
  MT = '_muted_nuc5y_29',
  ET = '_sliderIcon_nuc5y_29',
  wT = '_sliderArea_nuc5y_41',
  NT = '_sliderValue_nuc5y_46',
  Gn = {
    root: xT,
    muteRow: jT,
    muteLabelGroup: AT,
    sliderRow: TT,
    muted: MT,
    sliderIcon: ET,
    sliderArea: wT,
    sliderValue: NT,
  };
function Vh({ label: l, iconName: i, value: s, muted: o, onChange: f }) {
  return u.jsx(Nl, {
    variant: 'sunken',
    padding: 'md',
    children: u.jsxs('div', {
      className: [Gn.sliderRow, o ? Gn.muted : ''].filter(Boolean).join(' '),
      children: [
        u.jsx('span', { className: Gn.sliderIcon, children: u.jsx(Ye, { name: i, size: 16 }) }),
        u.jsx(Y, { variant: 'label', color: o ? 'dim' : 'mid', children: l }),
        u.jsx('div', {
          className: Gn.sliderArea,
          children: u.jsx(Xu, { value: s, min: 0, max: 1, step: 0.01, onChange: f, disabled: o }),
        }),
        u.jsx('span', {
          className: Gn.sliderValue,
          children: u.jsx(Yn, {
            value: Math.round(s * 100),
            size: 'sm',
            accentColor: o ? 'dim' : 'text',
          }),
        }),
      ],
    }),
  });
}
function zT({
  overrideBgmVolume: l,
  overrideSeVolume: i,
  overrideMute: s,
  onBgmChange: o,
  onSeChange: f,
  onMuteChange: d,
}) {
  const m = G((R) => R.bgmVolume),
    p = G((R) => R.seVolume),
    g = G((R) => R.setBgmVolume),
    y = G((R) => R.setSeVolume),
    _ = l ?? m,
    b = i ?? p,
    A = s ?? !1,
    E = (R) => {
      o ? o(R) : (g(R), Xe.setBgmVolume(A ? 0 : R));
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
      u.jsx(Nl, {
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
            u.jsx(E1, { checked: A, onChange: D, accent: 'primary' }),
          ],
        }),
      }),
      u.jsx(Vh, { label: 'BGM', iconName: 'play', value: _, muted: A, onChange: E }),
      u.jsx(Vh, { label: 'SE', iconName: 'spark', value: b, muted: A, onChange: T }),
    ],
  });
}
const Wu = (l, i) => i.some((s) => l instanceof s);
let Gh, Yh;
function CT() {
  return Gh || (Gh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function RT() {
  return (
    Yh ||
    (Yh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Ju = new WeakMap(),
  qu = new WeakMap(),
  yo = new WeakMap();
function OT(l) {
  const i = new Promise((s, o) => {
    const f = () => {
        (l.removeEventListener('success', d), l.removeEventListener('error', m));
      },
      d = () => {
        (s(Al(l.result)), f());
      },
      m = () => {
        (o(l.error), f());
      };
    (l.addEventListener('success', d), l.addEventListener('error', m));
  });
  return (yo.set(i, l), i);
}
function DT(l) {
  if (Ju.has(l)) return;
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
  Ju.set(l, i);
}
let Fu = {
  get(l, i, s) {
    if (l instanceof IDBTransaction) {
      if (i === 'done') return Ju.get(l);
      if (i === 'store')
        return s.objectStoreNames[1] ? void 0 : s.objectStore(s.objectStoreNames[0]);
    }
    return Al(l[i]);
  },
  set(l, i, s) {
    return ((l[i] = s), !0);
  },
  has(l, i) {
    return l instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in l;
  },
};
function w1(l) {
  Fu = l(Fu);
}
function BT(l) {
  return RT().includes(l)
    ? function (...i) {
        return (l.apply(Iu(this), i), Al(this.request));
      }
    : function (...i) {
        return Al(l.apply(Iu(this), i));
      };
}
function LT(l) {
  return typeof l == 'function'
    ? BT(l)
    : (l instanceof IDBTransaction && DT(l), Wu(l, CT()) ? new Proxy(l, Fu) : l);
}
function Al(l) {
  if (l instanceof IDBRequest) return OT(l);
  if (qu.has(l)) return qu.get(l);
  const i = LT(l);
  return (i !== l && (qu.set(l, i), yo.set(i, l)), i);
}
const Iu = (l) => yo.get(l);
function $T(l, i, { blocked: s, upgrade: o, blocking: f, terminated: d } = {}) {
  const m = indexedDB.open(l, i),
    p = Al(m);
  return (
    o &&
      m.addEventListener('upgradeneeded', (g) => {
        o(Al(m.result), g.oldVersion, g.newVersion, Al(m.transaction), g);
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
const HT = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  kT = ['put', 'add', 'delete', 'clear'],
  Vu = new Map();
function Zh(l, i) {
  if (!(l instanceof IDBDatabase && !(i in l) && typeof i == 'string')) return;
  if (Vu.get(i)) return Vu.get(i);
  const s = i.replace(/FromIndex$/, ''),
    o = i !== s,
    f = kT.includes(s);
  if (!(s in (o ? IDBIndex : IDBObjectStore).prototype) || !(f || HT.includes(s))) return;
  const d = async function (m, ...p) {
    const g = this.transaction(m, f ? 'readwrite' : 'readonly');
    let y = g.store;
    return (o && (y = y.index(p.shift())), (await Promise.all([y[s](...p), f && g.done]))[0]);
  };
  return (Vu.set(i, d), d);
}
w1((l) => ({
  ...l,
  get: (i, s, o) => Zh(i, s) || l.get(i, s, o),
  has: (i, s) => !!Zh(i, s) || l.has(i, s),
}));
const UT = ['continue', 'continuePrimaryKey', 'advance'],
  Xh = {},
  Pu = new WeakMap(),
  N1 = new WeakMap(),
  qT = {
    get(l, i) {
      if (!UT.includes(i)) return l[i];
      let s = Xh[i];
      return (
        s ||
          (s = Xh[i] =
            function (...o) {
              Pu.set(this, N1.get(this)[i](...o));
            }),
        s
      );
    },
  };
async function* VT(...l) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...l)), !i)) return;
  i = i;
  const s = new Proxy(i, qT);
  for (N1.set(s, i), yo.set(s, Iu(i)); i; )
    (yield s, (i = await (Pu.get(s) || i.continue())), Pu.delete(s));
}
function Kh(l, i) {
  return (
    (i === Symbol.asyncIterator && Wu(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && Wu(l, [IDBIndex, IDBObjectStore]))
  );
}
w1((l) => ({
  ...l,
  get(i, s, o) {
    return Kh(i, s) ? VT : l.get(i, s, o);
  },
  has(i, s) {
    return Kh(i, s) || l.has(i, s);
  },
}));
const GT = {
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
function YT(l, i, s, o) {
  for (let f = s + 1; f <= o; f++) {
    const d = GT[f];
    if (!d) throw new Error(`No migration registered for version ${f}`);
    d(l, i);
  }
}
let Cc = null;
async function ef() {
  return (
    Cc ||
    ((Cc = await $T(n1, so, {
      upgrade(l, i, s, o) {
        try {
          YT(l, o, i, s ?? so);
        } catch (f) {
          throw (console.error('[DB] Migration failed:', f), f);
        }
      },
    })),
    await ZT(Cc),
    Cc)
  );
}
async function ZT(l) {
  const i = l.transaction([P.profile, P.currencies, P.machine, P.weapons, P.settings], 'readwrite'),
    [s, o, f, d] = await Promise.all([
      i.objectStore(P.profile).get('singleton'),
      i.objectStore(P.currencies).get('singleton'),
      i.objectStore(P.weapons).get('singleton'),
      i.objectStore(P.settings).get('singleton'),
    ]),
    m = Date.now(),
    p = [];
  (s || p.push(i.objectStore(P.profile).put({ ...l1, createdAt: m, lastPlayedAt: m })),
    o || p.push(i.objectStore(P.currencies).put(i1)),
    f || p.push(i.objectStore(P.weapons).put(c1)),
    d || p.push(i.objectStore(P.settings).put(s1)));
  const g = i.objectStore(P.machine),
    y = await g.getAllKeys(),
    _ = new Set(y);
  for (const b of ro) _.has(b) || p.push(g.put({ key: b, lv: 0 }));
  (await Promise.all(p), await i.done);
}
async function XT(l, i) {
  await l.put(P.profile, i);
}
async function KT(l, i) {
  await l.put(P.currencies, i);
}
async function QT(l, i) {
  await l.put(P.machine, i);
}
async function WT(l, i) {
  await l.put(P.weapons, i);
}
async function JT(l, i) {
  await l.put(P.patches, i);
}
async function FT(l) {
  return l.getAll(P.equippedPatches);
}
async function IT(l, i) {
  const o = (await FT(l)).find((f) => f.name === i.name && f.slotIndex !== i.slotIndex);
  if (o) throw new Error(`Patch "${i.name}" is already equipped in slot ${o.slotIndex}`);
  await l.put(P.equippedPatches, i);
}
async function PT(l, i) {
  await l.put(P.settings, i);
}
async function z1(l) {
  const i = l.transaction(
      [P.profile, P.currencies, P.machine, P.weapons, P.patches, P.equippedPatches, P.settings],
      'readonly'
    ),
    [s, o, f, d, m, p, g] = await Promise.all([
      i.objectStore(P.profile).get('singleton'),
      i.objectStore(P.currencies).get('singleton'),
      i.objectStore(P.machine).getAll(),
      i.objectStore(P.weapons).get('singleton'),
      i.objectStore(P.patches).getAll(),
      i.objectStore(P.equippedPatches).getAll(),
      i.objectStore(P.settings).get('singleton'),
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
const C1 = 'tower-like-game:import-backups',
  eM = 3;
function tM() {
  try {
    const l = localStorage.getItem(C1);
    return l ? JSON.parse(l) : [];
  } catch {
    return [];
  }
}
function aM(l) {
  try {
    localStorage.setItem(C1, JSON.stringify(l));
  } catch (i) {
    console.warn('[DB] Failed to save backup to localStorage:', i);
  }
}
function nM(l) {
  const i = tM();
  i.unshift({ savedAt: Date.now(), data: l });
  const s = i.slice(0, eM);
  aM(s);
}
async function R1(l) {
  const i = await z1(l);
  return { formatVersion: 1, dbVersion: so, exportedAt: Date.now(), data: i };
}
async function lM(l, i) {
  if (i.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${i.formatVersion}`);
  try {
    const d = await R1(l);
    nM(d);
  } catch (d) {
    console.warn('[DB] Pre-import backup failed (proceeding anyway):', d);
  }
  const { data: s } = i,
    o = l.transaction(
      [P.profile, P.currencies, P.machine, P.weapons, P.patches, P.equippedPatches, P.settings],
      'readwrite'
    );
  await Promise.all([
    o.objectStore(P.profile).clear(),
    o.objectStore(P.currencies).clear(),
    o.objectStore(P.machine).clear(),
    o.objectStore(P.weapons).clear(),
    o.objectStore(P.patches).clear(),
    o.objectStore(P.equippedPatches).clear(),
    o.objectStore(P.settings).clear(),
  ]);
  const f = [
    o.objectStore(P.profile).put(s.profile),
    o.objectStore(P.currencies).put(s.currencies),
    o.objectStore(P.weapons).put(s.weapons),
    o.objectStore(P.settings).put(s.settings),
    ...s.machine.map((d) => o.objectStore(P.machine).put(d)),
    ...s.patches.map((d) => o.objectStore(P.patches).put(d)),
    ...s.equippedPatches.map((d) => o.objectStore(P.equippedPatches).put(d)),
  ];
  (await Promise.all(f), await o.done);
}
const iM = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function cM() {
  const { navigate: l } = Zn(),
    [i, s] = q.useState('sound'),
    o = async () => {
      const m = await ef(),
        p = await R1(m),
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
        y = await ef();
      (await lM(y, g), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(n1), window.location.reload());
    };
  return u.jsx(El, {
    header: u.jsx($c, {
      title: '設定',
      onBack: () => l('title'),
      currencies: [],
      tabBar: u.jsx(oo, { tabs: iM, value: i, onChange: s, fullWidth: !0 }),
    }),
    footer: u.jsx(Lc, { active: 'settings', onChange: l }),
    children: u.jsxs('div', {
      className: VA.content,
      children: [
        i === 'sound' && u.jsx(zT, {}),
        i === 'game' && u.jsx(ST, {}),
        i === 'data' && u.jsx(nT, { onExport: o, onImport: f, onReset: d }),
      ],
    }),
  });
}
const sM = '_layout_198wk_1',
  oM = '_heroWrap_198wk_12',
  Qh = { layout: sM, heroWrap: oM },
  rM = '_banner_sva4m_3',
  uM = '_bannerInfo_sva4m_24',
  Gu = { banner: rM, bannerInfo: uM };
function fM({ banner: l, onApply: i }) {
  return l === null
    ? null
    : l.kind === 'has-update'
      ? u.jsxs('div', {
          className: Gu.banner,
          role: 'status',
          'aria-live': 'polite',
          children: [
            u.jsx(Y, { variant: 'body', color: 'default', children: '新しいバージョンがあります' }),
            u.jsx(kt, { label: '更新', size: 'sm', variant: 'primary', onClick: i }),
          ],
        })
      : u.jsx('div', {
          className: `${Gu.banner} ${Gu.bannerInfo}`,
          role: 'status',
          'aria-live': 'polite',
          children: u.jsx(Y, {
            variant: 'body',
            color: 'dim',
            children: '現在のバージョンは最新です',
          }),
        });
}
const dM = '_root_5udm7_1',
  mM = { root: dM };
function hM({
  onResume: l,
  onNewGame: i,
  lastSavedAt: s,
  onCheckUpdate: o,
  isCheckingUpdate: f = !1,
}) {
  const m = G((p) => p.createdAt) > 0;
  return u.jsxs('div', {
    className: mM.root,
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
        onClick: i,
      }),
      o != null &&
        u.jsx(kt, {
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
const pM = '_root_qkflo_2',
  yM = '_title_qkflo_12',
  Wh = { root: pM, title: yM };
function gM({ title: l = 'NEON SPIRE', subtitle: i, version: s, tagline: o }) {
  return u.jsxs('header', {
    className: Wh.root,
    role: 'banner',
    children: [
      u.jsx('h1', { className: Wh.title, children: l }),
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
const vM = '_root_1szye_1',
  _M = '_ringOuter_1szye_9',
  bM = '_ringMiddle_1szye_17',
  SM = '_glowDisc_1szye_24',
  xM = '_cornerAccent_1szye_31',
  jM = '_icon_1szye_40',
  xi = { root: vM, ringOuter: _M, ringMiddle: bM, glowDisc: SM, cornerAccent: xM, icon: jM };
function AM({ size: l = 180, iconName: i = 'tower' }) {
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
const TM = 'modulepreload',
  MM = function (l) {
    return '/tower-like-game/' + l;
  },
  Jh = {},
  EM = function (i, s, o) {
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
          if (((y = MM(y)), y in Jh)) return;
          Jh[y] = !0;
          const _ = y.endsWith('.css'),
            b = _ ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${y}"]${b}`)) return;
          const A = document.createElement('link');
          if (
            ((A.rel = _ ? 'stylesheet' : TM),
            _ || (A.as = 'script'),
            (A.crossOrigin = ''),
            (A.href = y),
            g && A.setAttribute('nonce', g),
            document.head.appendChild(A),
            _)
          )
            return new Promise((E, T) => {
              (A.addEventListener('load', E),
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
      return i().catch(d);
    });
  };
function wM(l = {}) {
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
        ((p = await EM(async () => {
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
function NM(l = {}) {
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
      wM({
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
const zM = 2500,
  CM = 1500;
function RM() {
  const l = q.useRef(null),
    {
      needRefresh: [i],
      updateServiceWorker: s,
    } = NM({
      onRegisteredSW: (A, E) => {
        l.current = E ?? null;
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
            await new Promise((E) => {
              window.setTimeout(E, CM);
            }));
        } catch {}
        (f(!1),
          g.current ||
            (m(!0),
            p.current !== null && window.clearTimeout(p.current),
            (p.current = window.setTimeout(() => {
              (m(!1), (p.current = null));
            }, zM))));
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
function OM(l) {
  if (l < 0) return '今';
  const i = Math.floor(l / 1e3);
  if (i < 60) return '今';
  const s = Math.floor(i / 60);
  if (s < 60) return `${s} 分前`;
  const o = Math.floor(s / 60);
  return o < 24 ? `${o} 時間前` : `${Math.floor(o / 24)} 日前`;
}
function DM() {
  const { navigate: l } = Zn(),
    i = G((p) => p.createdAt),
    { banner: s, checkForUpdate: o, isChecking: f, applyUpdate: d } = RM(),
    m = q.useMemo(() => (i > 0 ? OM(Date.now() - i) : void 0), [i]);
  return u.jsx(El, {
    children: u.jsxs('div', {
      className: Qh.layout,
      children: [
        u.jsx(gM, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.2.0',
        }),
        u.jsx('div', { className: Qh.heroWrap, children: u.jsx(AM, {}) }),
        u.jsx(hM, {
          lastSavedAt: m,
          onResume: () => l('preparation'),
          onNewGame: () => l('preparation'),
          onCheckUpdate: () => void o(),
          isCheckingUpdate: f,
        }),
        u.jsx(fM, { banner: s, onApply: d }),
      ],
    }),
  });
}
const BM = {
  title: 'title',
  preparation: 'base',
  machine: 'base',
  armory: 'base',
  patches: 'base',
  settings: 'base',
  battle: 'battleNormal',
};
function LM(l, i) {
  (q.useEffect(() => {
    const s = () => {
      Xe.isInitialized() || (Xe.init(), Xe.setBgmVolume(l), Xe.setSeVolume(i));
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
      Xe.setSeVolume(i);
    }, [i]));
}
function $M() {
  const { screen: l } = Zn(),
    i = G((o) => o.bgmVolume),
    s = G((o) => o.seVolume);
  switch (
    (LM(i, s),
    q.useEffect(() => {
      Xe.playBgm(BM[l]);
    }, [l]),
    l)
  ) {
    case 'title':
      return u.jsx(DM, {});
    case 'preparation':
      return u.jsx(UA, {});
    case 'machine':
      return u.jsx(tj, {});
    case 'armory':
      return u.jsx(bS, {});
    case 'patches':
      return u.jsx(oA, {});
    case 'settings':
      return u.jsx(cM, {});
    case 'battle':
      return u.jsx(F4, {});
    default:
      return u.jsx(aj, {});
  }
}
async function Xn() {
  return ef();
}
async function HM() {
  const l = await Xn(),
    i = await z1(l),
    s = G.getState(),
    o = i.profile ?? l1;
  G.setState({
    highestTier: o.highestTier,
    highestWave: o.highestWave,
    totalPlayTimeSec: o.totalPlayTimeSec,
    totalRuns: o.totalRuns,
    totalEnemiesKilled: o.totalEnemiesKilled,
    createdAt: o.createdAt,
    lastPlayedAt: o.lastPlayedAt,
  });
  const f = i.currencies ?? i1;
  G.setState({ bolt: Q.fromJSON(f.bolt), alloy: Q.fromJSON(f.alloy) });
  const d = i.machine,
    m = { ...s.machineLevels };
  for (const E of ro) {
    const T = d.find((D) => D.key === E);
    m[E] = T ? T.lv : 0;
  }
  G.setState({ machineLevels: m });
  const p = i.weapons ?? c1;
  G.setState({ weaponLv: p.weaponLv, initialWeapon: p.initialWeapon });
  const g = i.patches,
    y = new Map();
  for (const E of g)
    E.count > 0 && y.set(Zu(E.name, E.tier), { name: E.name, tier: E.tier, count: E.count });
  G.setState({ patches: y });
  const _ = i.equippedPatches,
    b = new Map();
  for (const E of _) b.set(E.slotIndex, { name: E.name, tier: E.tier });
  G.setState({ equippedPatches: b });
  const A = i.settings ?? s1;
  G.setState({
    bgmVolume: A.bgmVolume,
    seVolume: A.seVolume,
    vibrationEnabled: A.vibrationEnabled,
  });
}
async function O1() {
  const l = await Xn(),
    { bolt: i, alloy: s } = G.getState();
  await KT(l, { id: 'singleton', bolt: i.toJSON(), alloy: s.toJSON() });
}
async function D1() {
  const l = await Xn(),
    { machineLevels: i } = G.getState();
  await Promise.all(ro.map((s) => QT(l, { key: s, lv: i[s] })));
}
async function B1() {
  const l = await Xn(),
    { weaponLv: i, initialWeapon: s } = G.getState();
  await WT(l, { id: 'singleton', weaponLv: i, initialWeapon: s });
}
async function L1() {
  const l = await Xn(),
    { bgmVolume: i, seVolume: s, vibrationEnabled: o } = G.getState();
  await PT(l, { id: 'singleton', bgmVolume: i, seVolume: s, vibrationEnabled: o });
}
async function $1() {
  const l = await Xn(),
    {
      highestTier: i,
      highestWave: s,
      totalPlayTimeSec: o,
      totalRuns: f,
      totalEnemiesKilled: d,
      createdAt: m,
      lastPlayedAt: p,
    } = G.getState();
  await XT(l, {
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
async function H1() {
  const l = await Xn(),
    { patches: i } = G.getState(),
    s = [];
  for (const o of i.values())
    o.count > 0 && s.push(JT(l, { name: o.name, tier: o.tier, count: o.count }));
  await Promise.all(s);
}
async function k1() {
  const l = await Xn(),
    { equippedPatches: i } = G.getState(),
    s = [];
  for (const [o, f] of i) s.push(IT(l, { slotIndex: o, name: f.name, tier: f.tier }));
  await Promise.all(s);
}
async function U1() {
  await Promise.all([$1(), O1(), D1(), B1(), H1(), k1(), L1()]);
}
function kM() {
  const l = () => {
    document.visibilityState === 'hidden' && U1();
  };
  return (
    document.addEventListener('visibilitychange', l),
    () => document.removeEventListener('visibilitychange', l)
  );
}
const UM = 500;
function Sl(l, i) {
  let s = null;
  return () => {
    (s != null && clearTimeout(s),
      (s = setTimeout(() => {
        i().catch((o) => {
          console.error(`[autosave:${l}] failed`, o);
        });
      }, UM)));
  };
}
function qM() {
  (kM(),
    window.addEventListener('beforeunload', () => {
      U1();
    }));
  const l = Sl('currencies', O1),
    i = Sl('machine', D1),
    s = Sl('weapons', B1),
    o = Sl('settings', L1),
    f = Sl('profile', $1),
    d = Sl('patches', H1),
    m = Sl('equippedPatches', k1);
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
const q1 = document.getElementById('root');
if (!q1) throw new Error('Failed to find #root element');
const VM = fg.createRoot(q1);
HM()
  .catch((l) => {
    console.error('[hydrateStore] failed', l);
  })
  .finally(() => {
    (qM(), VM.render(u.jsx(vS, { children: u.jsx($M, {}) })));
  });
