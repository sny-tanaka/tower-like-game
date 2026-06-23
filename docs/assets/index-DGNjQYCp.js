var Gy = Object.defineProperty;
var Zy = (l, c, s) =>
  c in l ? Gy(l, c, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (l[c] = s);
var ua = (l, c, s) => Zy(l, typeof c != 'symbol' ? c + '' : c, s);
(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const f of document.querySelectorAll('link[rel="modulepreload"]')) u(f);
  new MutationObserver((f) => {
    for (const d of f)
      if (d.type === 'childList')
        for (const h of d.addedNodes) h.tagName === 'LINK' && h.rel === 'modulepreload' && u(h);
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
  function u(f) {
    if (f.ep) return;
    f.ep = !0;
    const d = s(f);
    fetch(f.href, d);
  }
})();
function Yy(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, 'default') ? l.default : l;
}
var fr = { exports: {} },
  ic = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wm;
function Xy() {
  if (Wm) return ic;
  Wm = 1;
  var l = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.fragment');
  function s(u, f, d) {
    var h = null;
    if ((d !== void 0 && (h = '' + d), f.key !== void 0 && (h = '' + f.key), 'key' in f)) {
      d = {};
      for (var p in f) p !== 'key' && (d[p] = f[p]);
    } else d = f;
    return ((f = d.ref), { $$typeof: l, type: u, key: h, ref: f !== void 0 ? f : null, props: d });
  }
  return ((ic.Fragment = c), (ic.jsx = s), (ic.jsxs = s), ic);
}
var Jm;
function Qy() {
  return (Jm || ((Jm = 1), (fr.exports = Xy())), fr.exports);
}
var r = Qy(),
  dr = { exports: {} },
  cc = {},
  mr = { exports: {} },
  hr = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fm;
function Ky() {
  return (
    Fm ||
      ((Fm = 1),
      (function (l) {
        function c(O, Z) {
          var at = O.length;
          O.push(Z);
          t: for (; 0 < at; ) {
            var bt = (at - 1) >>> 1,
              Tt = O[bt];
            if (0 < f(Tt, Z)) ((O[bt] = Z), (O[at] = Tt), (at = bt));
            else break t;
          }
        }
        function s(O) {
          return O.length === 0 ? null : O[0];
        }
        function u(O) {
          if (O.length === 0) return null;
          var Z = O[0],
            at = O.pop();
          if (at !== Z) {
            O[0] = at;
            t: for (var bt = 0, Tt = O.length, j = Tt >>> 1; bt < j; ) {
              var H = 2 * (bt + 1) - 1,
                k = O[H],
                Y = H + 1,
                nt = O[Y];
              if (0 > f(k, at))
                Y < Tt && 0 > f(nt, k)
                  ? ((O[bt] = nt), (O[Y] = at), (bt = Y))
                  : ((O[bt] = k), (O[H] = at), (bt = H));
              else if (Y < Tt && 0 > f(nt, at)) ((O[bt] = nt), (O[Y] = at), (bt = Y));
              else break t;
            }
          }
          return Z;
        }
        function f(O, Z) {
          var at = O.sortIndex - Z.sortIndex;
          return at !== 0 ? at : O.id - Z.id;
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
          var h = Date,
            p = h.now();
          l.unstable_now = function () {
            return h.now() - p;
          };
        }
        var g = [],
          y = [],
          _ = 1,
          S = null,
          T = 3,
          z = !1,
          E = !1,
          q = !1,
          B = !1,
          F = typeof setTimeout == 'function' ? setTimeout : null,
          C = typeof clearTimeout == 'function' ? clearTimeout : null,
          ot = typeof setImmediate < 'u' ? setImmediate : null;
        function Lt(O) {
          for (var Z = s(y); Z !== null; ) {
            if (Z.callback === null) u(y);
            else if (Z.startTime <= O) (u(y), (Z.sortIndex = Z.expirationTime), c(g, Z));
            else break;
            Z = s(y);
          }
        }
        function Zt(O) {
          if (((q = !1), Lt(O), !E))
            if (s(g) !== null) ((E = !0), At || ((At = !0), Kt()));
            else {
              var Z = s(y);
              Z !== null && It(Zt, Z.startTime - O);
            }
        }
        var At = !1,
          it = -1,
          qt = 5,
          Ft = -1;
        function Yt() {
          return B ? !0 : !(l.unstable_now() - Ft < qt);
        }
        function Qt() {
          if (((B = !1), At)) {
            var O = l.unstable_now();
            Ft = O;
            var Z = !0;
            try {
              t: {
                ((E = !1), q && ((q = !1), C(it), (it = -1)), (z = !0));
                var at = T;
                try {
                  e: {
                    for (Lt(O), S = s(g); S !== null && !(S.expirationTime > O && Yt()); ) {
                      var bt = S.callback;
                      if (typeof bt == 'function') {
                        ((S.callback = null), (T = S.priorityLevel));
                        var Tt = bt(S.expirationTime <= O);
                        if (((O = l.unstable_now()), typeof Tt == 'function')) {
                          ((S.callback = Tt), Lt(O), (Z = !0));
                          break e;
                        }
                        (S === s(g) && u(g), Lt(O));
                      } else u(g);
                      S = s(g);
                    }
                    if (S !== null) Z = !0;
                    else {
                      var j = s(y);
                      (j !== null && It(Zt, j.startTime - O), (Z = !1));
                    }
                  }
                  break t;
                } finally {
                  ((S = null), (T = at), (z = !1));
                }
                Z = void 0;
              }
            } finally {
              Z ? Kt() : (At = !1);
            }
          }
        }
        var Kt;
        if (typeof ot == 'function')
          Kt = function () {
            ot(Qt);
          };
        else if (typeof MessageChannel < 'u') {
          var Ee = new MessageChannel(),
            ee = Ee.port2;
          ((Ee.port1.onmessage = Qt),
            (Kt = function () {
              ee.postMessage(null);
            }));
        } else
          Kt = function () {
            F(Qt, 0);
          };
        function It(O, Z) {
          it = F(function () {
            O(l.unstable_now());
          }, Z);
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
              : (qt = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return T;
          }),
          (l.unstable_next = function (O) {
            switch (T) {
              case 1:
              case 2:
              case 3:
                var Z = 3;
                break;
              default:
                Z = T;
            }
            var at = T;
            T = Z;
            try {
              return O();
            } finally {
              T = at;
            }
          }),
          (l.unstable_requestPaint = function () {
            B = !0;
          }),
          (l.unstable_runWithPriority = function (O, Z) {
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
            var at = T;
            T = O;
            try {
              return Z();
            } finally {
              T = at;
            }
          }),
          (l.unstable_scheduleCallback = function (O, Z, at) {
            var bt = l.unstable_now();
            switch (
              (typeof at == 'object' && at !== null
                ? ((at = at.delay), (at = typeof at == 'number' && 0 < at ? bt + at : bt))
                : (at = bt),
              O)
            ) {
              case 1:
                var Tt = -1;
                break;
              case 2:
                Tt = 250;
                break;
              case 5:
                Tt = 1073741823;
                break;
              case 4:
                Tt = 1e4;
                break;
              default:
                Tt = 5e3;
            }
            return (
              (Tt = at + Tt),
              (O = {
                id: _++,
                callback: Z,
                priorityLevel: O,
                startTime: at,
                expirationTime: Tt,
                sortIndex: -1,
              }),
              at > bt
                ? ((O.sortIndex = at),
                  c(y, O),
                  s(g) === null &&
                    O === s(y) &&
                    (q ? (C(it), (it = -1)) : (q = !0), It(Zt, at - bt)))
                : ((O.sortIndex = Tt), c(g, O), E || z || ((E = !0), At || ((At = !0), Kt()))),
              O
            );
          }),
          (l.unstable_shouldYield = Yt),
          (l.unstable_wrapCallback = function (O) {
            var Z = T;
            return function () {
              var at = T;
              T = Z;
              try {
                return O.apply(this, arguments);
              } finally {
                T = at;
              }
            };
          }));
      })(hr)),
    hr
  );
}
var Im;
function Wy() {
  return (Im || ((Im = 1), (mr.exports = Ky())), mr.exports);
}
var pr = { exports: {} },
  ct = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pm;
function Jy() {
  if (Pm) return ct;
  Pm = 1;
  var l = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.portal'),
    s = Symbol.for('react.fragment'),
    u = Symbol.for('react.strict_mode'),
    f = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    p = Symbol.for('react.forward_ref'),
    g = Symbol.for('react.suspense'),
    y = Symbol.for('react.memo'),
    _ = Symbol.for('react.lazy'),
    S = Symbol.for('react.activity'),
    T = Symbol.iterator;
  function z(j) {
    return j === null || typeof j != 'object'
      ? null
      : ((j = (T && j[T]) || j['@@iterator']), typeof j == 'function' ? j : null);
  }
  var E = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    q = Object.assign,
    B = {};
  function F(j, H, k) {
    ((this.props = j), (this.context = H), (this.refs = B), (this.updater = k || E));
  }
  ((F.prototype.isReactComponent = {}),
    (F.prototype.setState = function (j, H) {
      if (typeof j != 'object' && typeof j != 'function' && j != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, j, H, 'setState');
    }),
    (F.prototype.forceUpdate = function (j) {
      this.updater.enqueueForceUpdate(this, j, 'forceUpdate');
    }));
  function C() {}
  C.prototype = F.prototype;
  function ot(j, H, k) {
    ((this.props = j), (this.context = H), (this.refs = B), (this.updater = k || E));
  }
  var Lt = (ot.prototype = new C());
  ((Lt.constructor = ot), q(Lt, F.prototype), (Lt.isPureReactComponent = !0));
  var Zt = Array.isArray;
  function At() {}
  var it = { H: null, A: null, T: null, S: null },
    qt = Object.prototype.hasOwnProperty;
  function Ft(j, H, k) {
    var Y = k.ref;
    return { $$typeof: l, type: j, key: H, ref: Y !== void 0 ? Y : null, props: k };
  }
  function Yt(j, H) {
    return Ft(j.type, H, j.props);
  }
  function Qt(j) {
    return typeof j == 'object' && j !== null && j.$$typeof === l;
  }
  function Kt(j) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      j.replace(/[=:]/g, function (k) {
        return H[k];
      })
    );
  }
  var Ee = /\/+/g;
  function ee(j, H) {
    return typeof j == 'object' && j !== null && j.key != null ? Kt('' + j.key) : H.toString(36);
  }
  function It(j) {
    switch (j.status) {
      case 'fulfilled':
        return j.value;
      case 'rejected':
        throw j.reason;
      default:
        switch (
          (typeof j.status == 'string'
            ? j.then(At, At)
            : ((j.status = 'pending'),
              j.then(
                function (H) {
                  j.status === 'pending' && ((j.status = 'fulfilled'), (j.value = H));
                },
                function (H) {
                  j.status === 'pending' && ((j.status = 'rejected'), (j.reason = H));
                }
              )),
          j.status)
        ) {
          case 'fulfilled':
            return j.value;
          case 'rejected':
            throw j.reason;
        }
    }
    throw j;
  }
  function O(j, H, k, Y, nt) {
    var X = typeof j;
    (X === 'undefined' || X === 'boolean') && (j = null);
    var vt = !1;
    if (j === null) vt = !0;
    else
      switch (X) {
        case 'bigint':
        case 'string':
        case 'number':
          vt = !0;
          break;
        case 'object':
          switch (j.$$typeof) {
            case l:
            case c:
              vt = !0;
              break;
            case _:
              return ((vt = j._init), O(vt(j._payload), H, k, Y, nt));
          }
      }
    if (vt)
      return (
        (nt = nt(j)),
        (vt = Y === '' ? '.' + ee(j, 0) : Y),
        Zt(nt)
          ? ((k = ''),
            vt != null && (k = vt.replace(Ee, '$&/') + '/'),
            O(nt, H, k, '', function (De) {
              return De;
            }))
          : nt != null &&
            (Qt(nt) &&
              (nt = Yt(
                nt,
                k +
                  (nt.key == null || (j && j.key === nt.key)
                    ? ''
                    : ('' + nt.key).replace(Ee, '$&/') + '/') +
                  vt
              )),
            H.push(nt)),
        1
      );
    vt = 0;
    var $t = Y === '' ? '.' : Y + ':';
    if (Zt(j))
      for (var _t = 0; _t < j.length; _t++)
        ((Y = j[_t]), (X = $t + ee(Y, _t)), (vt += O(Y, H, k, X, nt)));
    else if (((_t = z(j)), typeof _t == 'function'))
      for (j = _t.call(j), _t = 0; !(Y = j.next()).done; )
        ((Y = Y.value), (X = $t + ee(Y, _t++)), (vt += O(Y, H, k, X, nt)));
    else if (X === 'object') {
      if (typeof j.then == 'function') return O(It(j), H, k, Y, nt);
      throw (
        (H = String(j)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(j).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return vt;
  }
  function Z(j, H, k) {
    if (j == null) return j;
    var Y = [],
      nt = 0;
    return (
      O(j, Y, '', '', function (X) {
        return H.call(k, X, nt++);
      }),
      Y
    );
  }
  function at(j) {
    if (j._status === -1) {
      var H = j._result;
      ((H = H()),
        H.then(
          function (k) {
            (j._status === 0 || j._status === -1) && ((j._status = 1), (j._result = k));
          },
          function (k) {
            (j._status === 0 || j._status === -1) && ((j._status = 2), (j._result = k));
          }
        ),
        j._status === -1 && ((j._status = 0), (j._result = H)));
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var bt =
      typeof reportError == 'function'
        ? reportError
        : function (j) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var H = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof j == 'object' && j !== null && typeof j.message == 'string'
                    ? String(j.message)
                    : String(j),
                error: j,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', j);
              return;
            }
            console.error(j);
          },
    Tt = {
      map: Z,
      forEach: function (j, H, k) {
        Z(
          j,
          function () {
            H.apply(this, arguments);
          },
          k
        );
      },
      count: function (j) {
        var H = 0;
        return (
          Z(j, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (j) {
        return (
          Z(j, function (H) {
            return H;
          }) || []
        );
      },
      only: function (j) {
        if (!Qt(j))
          throw Error('React.Children.only expected to receive a single React element child.');
        return j;
      },
    };
  return (
    (ct.Activity = S),
    (ct.Children = Tt),
    (ct.Component = F),
    (ct.Fragment = s),
    (ct.Profiler = f),
    (ct.PureComponent = ot),
    (ct.StrictMode = u),
    (ct.Suspense = g),
    (ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = it),
    (ct.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (j) {
        return it.H.useMemoCache(j);
      },
    }),
    (ct.cache = function (j) {
      return function () {
        return j.apply(null, arguments);
      };
    }),
    (ct.cacheSignal = function () {
      return null;
    }),
    (ct.cloneElement = function (j, H, k) {
      if (j == null) throw Error('The argument must be a React element, but you passed ' + j + '.');
      var Y = q({}, j.props),
        nt = j.key;
      if (H != null)
        for (X in (H.key !== void 0 && (nt = '' + H.key), H))
          !qt.call(H, X) ||
            X === 'key' ||
            X === '__self' ||
            X === '__source' ||
            (X === 'ref' && H.ref === void 0) ||
            (Y[X] = H[X]);
      var X = arguments.length - 2;
      if (X === 1) Y.children = k;
      else if (1 < X) {
        for (var vt = Array(X), $t = 0; $t < X; $t++) vt[$t] = arguments[$t + 2];
        Y.children = vt;
      }
      return Ft(j.type, nt, Y);
    }),
    (ct.createContext = function (j) {
      return (
        (j = {
          $$typeof: h,
          _currentValue: j,
          _currentValue2: j,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (j.Provider = j),
        (j.Consumer = { $$typeof: d, _context: j }),
        j
      );
    }),
    (ct.createElement = function (j, H, k) {
      var Y,
        nt = {},
        X = null;
      if (H != null)
        for (Y in (H.key !== void 0 && (X = '' + H.key), H))
          qt.call(H, Y) && Y !== 'key' && Y !== '__self' && Y !== '__source' && (nt[Y] = H[Y]);
      var vt = arguments.length - 2;
      if (vt === 1) nt.children = k;
      else if (1 < vt) {
        for (var $t = Array(vt), _t = 0; _t < vt; _t++) $t[_t] = arguments[_t + 2];
        nt.children = $t;
      }
      if (j && j.defaultProps)
        for (Y in ((vt = j.defaultProps), vt)) nt[Y] === void 0 && (nt[Y] = vt[Y]);
      return Ft(j, X, nt);
    }),
    (ct.createRef = function () {
      return { current: null };
    }),
    (ct.forwardRef = function (j) {
      return { $$typeof: p, render: j };
    }),
    (ct.isValidElement = Qt),
    (ct.lazy = function (j) {
      return { $$typeof: _, _payload: { _status: -1, _result: j }, _init: at };
    }),
    (ct.memo = function (j, H) {
      return { $$typeof: y, type: j, compare: H === void 0 ? null : H };
    }),
    (ct.startTransition = function (j) {
      var H = it.T,
        k = {};
      it.T = k;
      try {
        var Y = j(),
          nt = it.S;
        (nt !== null && nt(k, Y),
          typeof Y == 'object' && Y !== null && typeof Y.then == 'function' && Y.then(At, bt));
      } catch (X) {
        bt(X);
      } finally {
        (H !== null && k.types !== null && (H.types = k.types), (it.T = H));
      }
    }),
    (ct.unstable_useCacheRefresh = function () {
      return it.H.useCacheRefresh();
    }),
    (ct.use = function (j) {
      return it.H.use(j);
    }),
    (ct.useActionState = function (j, H, k) {
      return it.H.useActionState(j, H, k);
    }),
    (ct.useCallback = function (j, H) {
      return it.H.useCallback(j, H);
    }),
    (ct.useContext = function (j) {
      return it.H.useContext(j);
    }),
    (ct.useDebugValue = function () {}),
    (ct.useDeferredValue = function (j, H) {
      return it.H.useDeferredValue(j, H);
    }),
    (ct.useEffect = function (j, H) {
      return it.H.useEffect(j, H);
    }),
    (ct.useEffectEvent = function (j) {
      return it.H.useEffectEvent(j);
    }),
    (ct.useId = function () {
      return it.H.useId();
    }),
    (ct.useImperativeHandle = function (j, H, k) {
      return it.H.useImperativeHandle(j, H, k);
    }),
    (ct.useInsertionEffect = function (j, H) {
      return it.H.useInsertionEffect(j, H);
    }),
    (ct.useLayoutEffect = function (j, H) {
      return it.H.useLayoutEffect(j, H);
    }),
    (ct.useMemo = function (j, H) {
      return it.H.useMemo(j, H);
    }),
    (ct.useOptimistic = function (j, H) {
      return it.H.useOptimistic(j, H);
    }),
    (ct.useReducer = function (j, H, k) {
      return it.H.useReducer(j, H, k);
    }),
    (ct.useRef = function (j) {
      return it.H.useRef(j);
    }),
    (ct.useState = function (j) {
      return it.H.useState(j);
    }),
    (ct.useSyncExternalStore = function (j, H, k) {
      return it.H.useSyncExternalStore(j, H, k);
    }),
    (ct.useTransition = function () {
      return it.H.useTransition();
    }),
    (ct.version = '19.2.5'),
    ct
  );
}
var th;
function qr() {
  return (th || ((th = 1), (pr.exports = Jy())), pr.exports);
}
var yr = { exports: {} },
  xe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var eh;
function Fy() {
  if (eh) return xe;
  eh = 1;
  var l = qr();
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
  var u = {
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
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: S == null ? null : '' + S,
      children: g,
      containerInfo: y,
      implementation: _,
    };
  }
  var h = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, y) {
    if (g === 'font') return '';
    if (typeof y == 'string') return y === 'use-credentials' ? y : '';
  }
  return (
    (xe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u),
    (xe.createPortal = function (g, y) {
      var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(c(299));
      return d(g, y, null, _);
    }),
    (xe.flushSync = function (g) {
      var y = h.T,
        _ = u.p;
      try {
        if (((h.T = null), (u.p = 2), g)) return g();
      } finally {
        ((h.T = y), (u.p = _), u.d.f());
      }
    }),
    (xe.preconnect = function (g, y) {
      typeof g == 'string' &&
        (y
          ? ((y = y.crossOrigin),
            (y = typeof y == 'string' ? (y === 'use-credentials' ? y : '') : void 0))
          : (y = null),
        u.d.C(g, y));
    }),
    (xe.prefetchDNS = function (g) {
      typeof g == 'string' && u.d.D(g);
    }),
    (xe.preinit = function (g, y) {
      if (typeof g == 'string' && y && typeof y.as == 'string') {
        var _ = y.as,
          S = p(_, y.crossOrigin),
          T = typeof y.integrity == 'string' ? y.integrity : void 0,
          z = typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0;
        _ === 'style'
          ? u.d.S(g, typeof y.precedence == 'string' ? y.precedence : void 0, {
              crossOrigin: S,
              integrity: T,
              fetchPriority: z,
            })
          : _ === 'script' &&
            u.d.X(g, {
              crossOrigin: S,
              integrity: T,
              fetchPriority: z,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
      }
    }),
    (xe.preinitModule = function (g, y) {
      if (typeof g == 'string')
        if (typeof y == 'object' && y !== null) {
          if (y.as == null || y.as === 'script') {
            var _ = p(y.as, y.crossOrigin);
            u.d.M(g, {
              crossOrigin: _,
              integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
          }
        } else y == null && u.d.M(g);
    }),
    (xe.preload = function (g, y) {
      if (typeof g == 'string' && typeof y == 'object' && y !== null && typeof y.as == 'string') {
        var _ = y.as,
          S = p(_, y.crossOrigin);
        u.d.L(g, _, {
          crossOrigin: S,
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
    (xe.preloadModule = function (g, y) {
      if (typeof g == 'string')
        if (y) {
          var _ = p(y.as, y.crossOrigin);
          u.d.m(g, {
            as: typeof y.as == 'string' && y.as !== 'script' ? y.as : void 0,
            crossOrigin: _,
            integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
          });
        } else u.d.m(g);
    }),
    (xe.requestFormReset = function (g) {
      u.d.r(g);
    }),
    (xe.unstable_batchedUpdates = function (g, y) {
      return g(y);
    }),
    (xe.useFormState = function (g, y, _) {
      return h.H.useFormState(g, y, _);
    }),
    (xe.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (xe.version = '19.2.5'),
    xe
  );
}
var ah;
function Iy() {
  if (ah) return yr.exports;
  ah = 1;
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
  return (l(), (yr.exports = Fy()), yr.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var nh;
function Py() {
  if (nh) return cc;
  nh = 1;
  var l = Wy(),
    c = qr(),
    s = Iy();
  function u(t) {
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
  function f(t) {
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
  function p(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (d(t) !== t) throw Error(u(188));
  }
  function y(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = d(t)), e === null)) throw Error(u(188));
      return e !== t ? null : t;
    }
    for (var a = t, n = e; ; ) {
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
          if (o === a) return (g(i), t);
          if (o === n) return (g(i), e);
          o = o.sibling;
        }
        throw Error(u(188));
      }
      if (a.return !== n.return) ((a = i), (n = o));
      else {
        for (var m = !1, v = i.child; v; ) {
          if (v === a) {
            ((m = !0), (a = i), (n = o));
            break;
          }
          if (v === n) {
            ((m = !0), (n = i), (a = o));
            break;
          }
          v = v.sibling;
        }
        if (!m) {
          for (v = o.child; v; ) {
            if (v === a) {
              ((m = !0), (a = o), (n = i));
              break;
            }
            if (v === n) {
              ((m = !0), (n = o), (a = i));
              break;
            }
            v = v.sibling;
          }
          if (!m) throw Error(u(189));
        }
      }
      if (a.alternate !== n) throw Error(u(190));
    }
    if (a.tag !== 3) throw Error(u(188));
    return a.stateNode.current === a ? t : e;
  }
  function _(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = _(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var S = Object.assign,
    T = Symbol.for('react.element'),
    z = Symbol.for('react.transitional.element'),
    E = Symbol.for('react.portal'),
    q = Symbol.for('react.fragment'),
    B = Symbol.for('react.strict_mode'),
    F = Symbol.for('react.profiler'),
    C = Symbol.for('react.consumer'),
    ot = Symbol.for('react.context'),
    Lt = Symbol.for('react.forward_ref'),
    Zt = Symbol.for('react.suspense'),
    At = Symbol.for('react.suspense_list'),
    it = Symbol.for('react.memo'),
    qt = Symbol.for('react.lazy'),
    Ft = Symbol.for('react.activity'),
    Yt = Symbol.for('react.memo_cache_sentinel'),
    Qt = Symbol.iterator;
  function Kt(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (Qt && t[Qt]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var Ee = Symbol.for('react.client.reference');
  function ee(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === Ee ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case q:
        return 'Fragment';
      case F:
        return 'Profiler';
      case B:
        return 'StrictMode';
      case Zt:
        return 'Suspense';
      case At:
        return 'SuspenseList';
      case Ft:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case E:
          return 'Portal';
        case ot:
          return t.displayName || 'Context';
        case C:
          return (t._context.displayName || 'Context') + '.Consumer';
        case Lt:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case it:
          return ((e = t.displayName || null), e !== null ? e : ee(t.type) || 'Memo');
        case qt:
          ((e = t._payload), (t = t._init));
          try {
            return ee(t(e));
          } catch {}
      }
    return null;
  }
  var It = Array.isArray,
    O = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Z = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    at = { pending: !1, data: null, method: null, action: null },
    bt = [],
    Tt = -1;
  function j(t) {
    return { current: t };
  }
  function H(t) {
    0 > Tt || ((t.current = bt[Tt]), (bt[Tt] = null), Tt--);
  }
  function k(t, e) {
    (Tt++, (bt[Tt] = t.current), (t.current = e));
  }
  var Y = j(null),
    nt = j(null),
    X = j(null),
    vt = j(null);
  function $t(t, e) {
    switch ((k(X, e), k(nt, t), k(Y, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? vm(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = vm(e)), (t = _m(e, t)));
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
    (H(Y), k(Y, t));
  }
  function _t() {
    (H(Y), H(nt), H(X));
  }
  function De(t) {
    t.memoizedState !== null && k(vt, t);
    var e = Y.current,
      a = _m(e, t.type);
    e !== a && (k(nt, t), k(Y, a));
  }
  function ya(t) {
    (nt.current === t && (H(Y), H(nt)), vt.current === t && (H(vt), (ec._currentValue = at)));
  }
  var Ta, Ea;
  function Ye(t) {
    if (Ta === void 0)
      try {
        throw Error();
      } catch (a) {
        var e = a.stack.trim().match(/\n( *(at )?)/);
        ((Ta = (e && e[1]) || ''),
          (Ea =
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
      Ta +
      t +
      Ea
    );
  }
  var On = !1;
  function Bn(t, e) {
    if (!t || On) return '';
    On = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var U = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(U.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(U, []);
                } catch (R) {
                  var w = R;
                }
                Reflect.construct(t, [], U);
              } else {
                try {
                  U.call();
                } catch (R) {
                  w = R;
                }
                t.call(U.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                w = R;
              }
              (U = t()) && typeof U.catch == 'function' && U.catch(function () {});
            }
          } catch (R) {
            if (R && w && typeof R.stack == 'string') return [R.stack, w.stack];
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
        m = o[0],
        v = o[1];
      if (m && v) {
        var b = m.split(`
`),
          N = v.split(`
`);
        for (i = n = 0; n < b.length && !b[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; i < N.length && !N[i].includes('DetermineComponentFrameRoot'); ) i++;
        if (n === b.length || i === N.length)
          for (n = b.length - 1, i = N.length - 1; 1 <= n && 0 <= i && b[n] !== N[i]; ) i--;
        for (; 1 <= n && 0 <= i; n--, i--)
          if (b[n] !== N[i]) {
            if (n !== 1 || i !== 1)
              do
                if ((n--, i--, 0 > i || b[n] !== N[i])) {
                  var D =
                    `
` + b[n].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      D.includes('<anonymous>') &&
                      (D = D.replace('<anonymous>', t.displayName)),
                    D
                  );
                }
              while (1 <= n && 0 <= i);
            break;
          }
      }
    } finally {
      ((On = !1), (Error.prepareStackTrace = a));
    }
    return (a = t ? t.displayName || t.name : '') ? Ye(a) : '';
  }
  function di(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ye(t.type);
      case 16:
        return Ye('Lazy');
      case 13:
        return t.child !== e && e !== null ? Ye('Suspense Fallback') : Ye('Suspense');
      case 19:
        return Ye('SuspenseList');
      case 0:
      case 15:
        return Bn(t.type, !1);
      case 11:
        return Bn(t.type.render, !1);
      case 1:
        return Bn(t.type, !0);
      case 31:
        return Ye('Activity');
      default:
        return '';
    }
  }
  function ml(t) {
    try {
      var e = '',
        a = null;
      do ((e += di(t, a)), (a = t), (t = t.return));
      while (t);
      return e;
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
  var Dn = Object.prototype.hasOwnProperty,
    Ja = l.unstable_scheduleCallback,
    Ma = l.unstable_cancelCallback,
    hl = l.unstable_shouldYield,
    mi = l.unstable_requestPaint,
    de = l.unstable_now,
    ga = l.unstable_getCurrentPriorityLevel,
    Ln = l.unstable_ImmediatePriority,
    pl = l.unstable_UserBlockingPriority,
    ia = l.unstable_NormalPriority,
    va = l.unstable_LowPriority,
    $n = l.unstable_IdlePriority,
    Na = l.log,
    I = l.unstable_setDisableYieldValue,
    Me = null,
    ae = null;
  function _a(t) {
    if ((typeof Na == 'function' && I(t), ae && typeof ae.setStrictMode == 'function'))
      try {
        ae.setStrictMode(Me, t);
      } catch {}
  }
  var re = Math.clz32 ? Math.clz32 : rt,
    hi = Math.log,
    tt = Math.LN2;
  function rt(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((hi(t) / tt) | 0)) | 0);
  }
  var St = 256,
    Ht = 262144,
    kt = 4194304;
  function ne(t) {
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
  function Mt(t, e, a) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var i = 0,
      o = t.suspendedLanes,
      m = t.pingedLanes;
    t = t.warmLanes;
    var v = n & 134217727;
    return (
      v !== 0
        ? ((n = v & ~o),
          n !== 0
            ? (i = ne(n))
            : ((m &= v), m !== 0 ? (i = ne(m)) : a || ((a = v & ~t), a !== 0 && (i = ne(a)))))
        : ((v = n & ~o),
          v !== 0
            ? (i = ne(v))
            : m !== 0
              ? (i = ne(m))
              : a || ((a = n & ~t), a !== 0 && (i = ne(a)))),
      i === 0
        ? 0
        : e !== 0 &&
            e !== i &&
            (e & o) === 0 &&
            ((o = i & -i), (a = e & -e), o >= a || (o === 32 && (a & 4194048) !== 0))
          ? e
          : i
    );
  }
  function ft(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function zt(t, e) {
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
  function le() {
    var t = kt;
    return ((kt <<= 1), (kt & 62914560) === 0 && (kt = 4194304), t);
  }
  function wa(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function Fa(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function pi(t, e, a, n, i, o) {
    var m = t.pendingLanes;
    ((t.pendingLanes = a),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= a),
      (t.entangledLanes &= a),
      (t.errorRecoveryDisabledLanes &= a),
      (t.shellSuspendCounter = 0));
    var v = t.entanglements,
      b = t.expirationTimes,
      N = t.hiddenUpdates;
    for (a = m & ~a; 0 < a; ) {
      var D = 31 - re(a),
        U = 1 << D;
      ((v[D] = 0), (b[D] = -1));
      var w = N[D];
      if (w !== null)
        for (N[D] = null, D = 0; D < w.length; D++) {
          var R = w[D];
          R !== null && (R.lane &= -536870913);
        }
      a &= ~U;
    }
    (n !== 0 && Pr(t, n, 0),
      o !== 0 && i === 0 && t.tag !== 0 && (t.suspendedLanes |= o & ~(m & ~e)));
  }
  function Pr(t, e, a) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var n = 31 - re(e);
    ((t.entangledLanes |= e),
      (t.entanglements[n] = t.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function tf(t, e) {
    var a = (t.entangledLanes |= e);
    for (t = t.entanglements; a; ) {
      var n = 31 - re(a),
        i = 1 << n;
      ((i & e) | (t[n] & e) && (t[n] |= e), (a &= ~i));
    }
  }
  function ef(t, e) {
    var a = e & -e;
    return ((a = (a & 42) !== 0 ? 1 : Ps(a)), (a & (t.suspendedLanes | e)) !== 0 ? 0 : a);
  }
  function Ps(t) {
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
  function to(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function af() {
    var t = Z.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Vm(t.type));
  }
  function nf(t, e) {
    var a = Z.p;
    try {
      return ((Z.p = t), e());
    } finally {
      Z.p = a;
    }
  }
  var Ia = Math.random().toString(36).slice(2),
    ye = '__reactFiber$' + Ia,
    Ne = '__reactProps$' + Ia,
    yl = '__reactContainer$' + Ia,
    eo = '__reactEvents$' + Ia,
    R1 = '__reactListeners$' + Ia,
    O1 = '__reactHandles$' + Ia,
    lf = '__reactResources$' + Ia,
    yi = '__reactMarker$' + Ia;
  function ao(t) {
    (delete t[ye], delete t[Ne], delete t[eo], delete t[R1], delete t[O1]);
  }
  function gl(t) {
    var e = t[ye];
    if (e) return e;
    for (var a = t.parentNode; a; ) {
      if ((e = a[yl] || a[ye])) {
        if (((a = e.alternate), e.child !== null || (a !== null && a.child !== null)))
          for (t = Em(t); t !== null; ) {
            if ((a = t[ye])) return a;
            t = Em(t);
          }
        return e;
      }
      ((t = a), (a = t.parentNode));
    }
    return null;
  }
  function vl(t) {
    if ((t = t[ye] || t[yl])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function gi(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(u(33));
  }
  function _l(t) {
    var e = t[lf];
    return (e || (e = t[lf] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function me(t) {
    t[yi] = !0;
  }
  var cf = new Set(),
    sf = {};
  function Hn(t, e) {
    (bl(t, e), bl(t + 'Capture', e));
  }
  function bl(t, e) {
    for (sf[t] = e, t = 0; t < e.length; t++) cf.add(e[t]);
  }
  var B1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    of = {},
    uf = {};
  function D1(t) {
    return Dn.call(uf, t)
      ? !0
      : Dn.call(of, t)
        ? !1
        : B1.test(t)
          ? (uf[t] = !0)
          : ((of[t] = !0), !1);
  }
  function Ec(t, e, a) {
    if (D1(e))
      if (a === null) t.removeAttribute(e);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
            t.removeAttribute(e);
            return;
          case 'boolean':
            var n = e.toLowerCase().slice(0, 5);
            if (n !== 'data-' && n !== 'aria-') {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, '' + a);
      }
  }
  function Mc(t, e, a) {
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
  function za(t, e, a, n) {
    if (n === null) t.removeAttribute(a);
    else {
      switch (typeof n) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(e, a, '' + n);
    }
  }
  function Xe(t) {
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
  function rf(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function L1(t, e, a) {
    var n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var i = n.get,
        o = n.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return i.call(this);
          },
          set: function (m) {
            ((a = '' + m), o.call(this, m));
          },
        }),
        Object.defineProperty(t, e, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (m) {
            a = '' + m;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function no(t) {
    if (!t._valueTracker) {
      var e = rf(t) ? 'checked' : 'value';
      t._valueTracker = L1(t, e, '' + t[e]);
    }
  }
  function ff(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(),
      n = '';
    return (
      t && (n = rf(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = n),
      t !== a ? (e.setValue(t), !0) : !1
    );
  }
  function Nc(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var $1 = /[\n"\\]/g;
  function Qe(t) {
    return t.replace($1, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function lo(t, e, a, n, i, o, m, v) {
    ((t.name = ''),
      m != null && typeof m != 'function' && typeof m != 'symbol' && typeof m != 'boolean'
        ? (t.type = m)
        : t.removeAttribute('type'),
      e != null
        ? m === 'number'
          ? ((e === 0 && t.value === '') || t.value != e) && (t.value = '' + Xe(e))
          : t.value !== '' + Xe(e) && (t.value = '' + Xe(e))
        : (m !== 'submit' && m !== 'reset') || t.removeAttribute('value'),
      e != null
        ? io(t, m, Xe(e))
        : a != null
          ? io(t, m, Xe(a))
          : n != null && t.removeAttribute('value'),
      i == null && o != null && (t.defaultChecked = !!o),
      i != null && (t.checked = i && typeof i != 'function' && typeof i != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (t.name = '' + Xe(v))
        : t.removeAttribute('name'));
  }
  function df(t, e, a, n, i, o, m, v) {
    if (
      (o != null &&
        typeof o != 'function' &&
        typeof o != 'symbol' &&
        typeof o != 'boolean' &&
        (t.type = o),
      e != null || a != null)
    ) {
      if (!((o !== 'submit' && o !== 'reset') || e != null)) {
        no(t);
        return;
      }
      ((a = a != null ? '' + Xe(a) : ''),
        (e = e != null ? '' + Xe(e) : a),
        v || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((n = n ?? i),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (t.checked = v ? t.checked : !!n),
      (t.defaultChecked = !!n),
      m != null &&
        typeof m != 'function' &&
        typeof m != 'symbol' &&
        typeof m != 'boolean' &&
        (t.name = m),
      no(t));
  }
  function io(t, e, a) {
    (e === 'number' && Nc(t.ownerDocument) === t) ||
      t.defaultValue === '' + a ||
      (t.defaultValue = '' + a);
  }
  function Sl(t, e, a, n) {
    if (((t = t.options), e)) {
      e = {};
      for (var i = 0; i < a.length; i++) e['$' + a[i]] = !0;
      for (a = 0; a < t.length; a++)
        ((i = e.hasOwnProperty('$' + t[a].value)),
          t[a].selected !== i && (t[a].selected = i),
          i && n && (t[a].defaultSelected = !0));
    } else {
      for (a = '' + Xe(a), e = null, i = 0; i < t.length; i++) {
        if (t[i].value === a) {
          ((t[i].selected = !0), n && (t[i].defaultSelected = !0));
          return;
        }
        e !== null || t[i].disabled || (e = t[i]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function mf(t, e, a) {
    if (e != null && ((e = '' + Xe(e)), e !== t.value && (t.value = e), a == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? '' + Xe(a) : '';
  }
  function hf(t, e, a, n) {
    if (e == null) {
      if (n != null) {
        if (a != null) throw Error(u(92));
        if (It(n)) {
          if (1 < n.length) throw Error(u(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (e = a));
    }
    ((a = Xe(e)),
      (t.defaultValue = a),
      (n = t.textContent),
      n === a && n !== '' && n !== null && (t.value = n),
      no(t));
  }
  function xl(t, e) {
    if (e) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var H1 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function pf(t, e, a) {
    var n = e.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : n
        ? t.setProperty(e, a)
        : typeof a != 'number' || a === 0 || H1.has(e)
          ? e === 'float'
            ? (t.cssFloat = a)
            : (t[e] = ('' + a).trim())
          : (t[e] = a + 'px');
  }
  function yf(t, e, a) {
    if (e != null && typeof e != 'object') throw Error(u(62));
    if (((t = t.style), a != null)) {
      for (var n in a)
        !a.hasOwnProperty(n) ||
          (e != null && e.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? t.setProperty(n, '')
            : n === 'float'
              ? (t.cssFloat = '')
              : (t[n] = ''));
      for (var i in e) ((n = e[i]), e.hasOwnProperty(i) && a[i] !== n && pf(t, i, n));
    } else for (var o in e) e.hasOwnProperty(o) && pf(t, o, e[o]);
  }
  function co(t) {
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
  var U1 = new Map([
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
    q1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function wc(t) {
    return q1.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Ca() {}
  var so = null;
  function oo(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var jl = null,
    Al = null;
  function gf(t) {
    var e = vl(t);
    if (e && (t = e.stateNode)) {
      var a = t[Ne] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (lo(
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
              a = a.querySelectorAll('input[name="' + Qe('' + e) + '"][type="radio"]'), e = 0;
              e < a.length;
              e++
            ) {
              var n = a[e];
              if (n !== t && n.form === t.form) {
                var i = n[Ne] || null;
                if (!i) throw Error(u(90));
                lo(
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
            for (e = 0; e < a.length; e++) ((n = a[e]), n.form === t.form && ff(n));
          }
          break t;
        case 'textarea':
          mf(t, a.value, a.defaultValue);
          break t;
        case 'select':
          ((e = a.value), e != null && Sl(t, !!a.multiple, e, !1));
      }
    }
  }
  var uo = !1;
  function vf(t, e, a) {
    if (uo) return t(e, a);
    uo = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (
        ((uo = !1),
        (jl !== null || Al !== null) &&
          (ys(), jl && ((e = jl), (t = Al), (Al = jl = null), gf(e), t)))
      )
        for (e = 0; e < t.length; e++) gf(t[e]);
    }
  }
  function vi(t, e) {
    var a = t.stateNode;
    if (a === null) return null;
    var n = a[Ne] || null;
    if (n === null) return null;
    a = n[e];
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
        ((n = !n.disabled) ||
          ((t = t.type),
          (n = !(t === 'button' || t === 'input' || t === 'select' || t === 'textarea'))),
          (t = !n));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != 'function') throw Error(u(231, e, typeof a));
    return a;
  }
  var Ra = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    ro = !1;
  if (Ra)
    try {
      var _i = {};
      (Object.defineProperty(_i, 'passive', {
        get: function () {
          ro = !0;
        },
      }),
        window.addEventListener('test', _i, _i),
        window.removeEventListener('test', _i, _i));
    } catch {
      ro = !1;
    }
  var Pa = null,
    fo = null,
    zc = null;
  function _f() {
    if (zc) return zc;
    var t,
      e = fo,
      a = e.length,
      n,
      i = 'value' in Pa ? Pa.value : Pa.textContent,
      o = i.length;
    for (t = 0; t < a && e[t] === i[t]; t++);
    var m = a - t;
    for (n = 1; n <= m && e[a - n] === i[o - n]; n++);
    return (zc = i.slice(t, 1 < n ? 1 - n : void 0));
  }
  function Cc(t) {
    var e = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Rc() {
    return !0;
  }
  function bf() {
    return !1;
  }
  function we(t) {
    function e(a, n, i, o, m) {
      ((this._reactName = a),
        (this._targetInst = i),
        (this.type = n),
        (this.nativeEvent = o),
        (this.target = m),
        (this.currentTarget = null));
      for (var v in t) t.hasOwnProperty(v) && ((a = t[v]), (this[v] = a ? a(o) : o[v]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? Rc
          : bf),
        (this.isPropagationStopped = bf),
        this
      );
    }
    return (
      S(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = Rc));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Rc));
        },
        persist: function () {},
        isPersistent: Rc,
      }),
      e
    );
  }
  var Un = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Oc = we(Un),
    bi = S({}, Un, { view: 0, detail: 0 }),
    k1 = we(bi),
    mo,
    ho,
    Si,
    Bc = S({}, bi, {
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
      getModifierState: yo,
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
          : (t !== Si &&
              (Si && t.type === 'mousemove'
                ? ((mo = t.screenX - Si.screenX), (ho = t.screenY - Si.screenY))
                : (ho = mo = 0),
              (Si = t)),
            mo);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : ho;
      },
    }),
    Sf = we(Bc),
    V1 = S({}, Bc, { dataTransfer: 0 }),
    G1 = we(V1),
    Z1 = S({}, bi, { relatedTarget: 0 }),
    po = we(Z1),
    Y1 = S({}, Un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    X1 = we(Y1),
    Q1 = S({}, Un, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    K1 = we(Q1),
    W1 = S({}, Un, { data: 0 }),
    xf = we(W1),
    J1 = {
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
    F1 = {
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
    I1 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function P1(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = I1[t]) ? !!e[t] : !1;
  }
  function yo() {
    return P1;
  }
  var tp = S({}, bi, {
      key: function (t) {
        if (t.key) {
          var e = J1[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = Cc(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? F1[t.keyCode] || 'Unidentified'
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
      getModifierState: yo,
      charCode: function (t) {
        return t.type === 'keypress' ? Cc(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? Cc(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    ep = we(tp),
    ap = S({}, Bc, {
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
    jf = we(ap),
    np = S({}, bi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: yo,
    }),
    lp = we(np),
    ip = S({}, Un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    cp = we(ip),
    sp = S({}, Bc, {
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
    op = we(sp),
    up = S({}, Un, { newState: 0, oldState: 0 }),
    rp = we(up),
    fp = [9, 13, 27, 32],
    go = Ra && 'CompositionEvent' in window,
    xi = null;
  Ra && 'documentMode' in document && (xi = document.documentMode);
  var dp = Ra && 'TextEvent' in window && !xi,
    Af = Ra && (!go || (xi && 8 < xi && 11 >= xi)),
    Tf = ' ',
    Ef = !1;
  function Mf(t, e) {
    switch (t) {
      case 'keyup':
        return fp.indexOf(e.keyCode) !== -1;
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
  function Nf(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var Tl = !1;
  function mp(t, e) {
    switch (t) {
      case 'compositionend':
        return Nf(e);
      case 'keypress':
        return e.which !== 32 ? null : ((Ef = !0), Tf);
      case 'textInput':
        return ((t = e.data), t === Tf && Ef ? null : t);
      default:
        return null;
    }
  }
  function hp(t, e) {
    if (Tl)
      return t === 'compositionend' || (!go && Mf(t, e))
        ? ((t = _f()), (zc = fo = Pa = null), (Tl = !1), t)
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
        return Af && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var pp = {
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
  function wf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === 'input' ? !!pp[t.type] : e === 'textarea';
  }
  function zf(t, e, a, n) {
    (jl ? (Al ? Al.push(n) : (Al = [n])) : (jl = n),
      (e = js(e, 'onChange')),
      0 < e.length &&
        ((a = new Oc('onChange', 'change', null, a, n)), t.push({ event: a, listeners: e })));
  }
  var ji = null,
    Ai = null;
  function yp(t) {
    dm(t, 0);
  }
  function Dc(t) {
    var e = gi(t);
    if (ff(e)) return t;
  }
  function Cf(t, e) {
    if (t === 'change') return e;
  }
  var Rf = !1;
  if (Ra) {
    var vo;
    if (Ra) {
      var _o = 'oninput' in document;
      if (!_o) {
        var Of = document.createElement('div');
        (Of.setAttribute('oninput', 'return;'), (_o = typeof Of.oninput == 'function'));
      }
      vo = _o;
    } else vo = !1;
    Rf = vo && (!document.documentMode || 9 < document.documentMode);
  }
  function Bf() {
    ji && (ji.detachEvent('onpropertychange', Df), (Ai = ji = null));
  }
  function Df(t) {
    if (t.propertyName === 'value' && Dc(Ai)) {
      var e = [];
      (zf(e, Ai, t, oo(t)), vf(yp, e));
    }
  }
  function gp(t, e, a) {
    t === 'focusin'
      ? (Bf(), (ji = e), (Ai = a), ji.attachEvent('onpropertychange', Df))
      : t === 'focusout' && Bf();
  }
  function vp(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return Dc(Ai);
  }
  function _p(t, e) {
    if (t === 'click') return Dc(e);
  }
  function bp(t, e) {
    if (t === 'input' || t === 'change') return Dc(e);
  }
  function Sp(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var Le = typeof Object.is == 'function' ? Object.is : Sp;
  function Ti(t, e) {
    if (Le(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var a = Object.keys(t),
      n = Object.keys(e);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var i = a[n];
      if (!Dn.call(e, i) || !Le(t[i], e[i])) return !1;
    }
    return !0;
  }
  function Lf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function $f(t, e) {
    var a = Lf(t);
    t = 0;
    for (var n; a; ) {
      if (a.nodeType === 3) {
        if (((n = t + a.textContent.length), t <= e && n >= e)) return { node: a, offset: e - t };
        t = n;
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
      a = Lf(a);
    }
  }
  function Hf(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? Hf(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function Uf(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Nc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow;
      else break;
      e = Nc(t.document);
    }
    return e;
  }
  function bo(t) {
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
  var xp = Ra && 'documentMode' in document && 11 >= document.documentMode,
    El = null,
    So = null,
    Ei = null,
    xo = !1;
  function qf(t, e, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    xo ||
      El == null ||
      El !== Nc(n) ||
      ((n = El),
      'selectionStart' in n && bo(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Ei && Ti(Ei, n)) ||
        ((Ei = n),
        (n = js(So, 'onSelect')),
        0 < n.length &&
          ((e = new Oc('onSelect', 'select', null, e, a)),
          t.push({ event: e, listeners: n }),
          (e.target = El))));
  }
  function qn(t, e) {
    var a = {};
    return (
      (a[t.toLowerCase()] = e.toLowerCase()),
      (a['Webkit' + t] = 'webkit' + e),
      (a['Moz' + t] = 'moz' + e),
      a
    );
  }
  var Ml = {
      animationend: qn('Animation', 'AnimationEnd'),
      animationiteration: qn('Animation', 'AnimationIteration'),
      animationstart: qn('Animation', 'AnimationStart'),
      transitionrun: qn('Transition', 'TransitionRun'),
      transitionstart: qn('Transition', 'TransitionStart'),
      transitioncancel: qn('Transition', 'TransitionCancel'),
      transitionend: qn('Transition', 'TransitionEnd'),
    },
    jo = {},
    kf = {};
  Ra &&
    ((kf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Ml.animationend.animation,
      delete Ml.animationiteration.animation,
      delete Ml.animationstart.animation),
    'TransitionEvent' in window || delete Ml.transitionend.transition);
  function kn(t) {
    if (jo[t]) return jo[t];
    if (!Ml[t]) return t;
    var e = Ml[t],
      a;
    for (a in e) if (e.hasOwnProperty(a) && a in kf) return (jo[t] = e[a]);
    return t;
  }
  var Vf = kn('animationend'),
    Gf = kn('animationiteration'),
    Zf = kn('animationstart'),
    jp = kn('transitionrun'),
    Ap = kn('transitionstart'),
    Tp = kn('transitioncancel'),
    Yf = kn('transitionend'),
    Xf = new Map(),
    Ao =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Ao.push('scrollEnd');
  function ca(t, e) {
    (Xf.set(t, e), Hn(e, [t]));
  }
  var Lc =
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
    Ke = [],
    Nl = 0,
    To = 0;
  function $c() {
    for (var t = Nl, e = (To = Nl = 0); e < t; ) {
      var a = Ke[e];
      Ke[e++] = null;
      var n = Ke[e];
      Ke[e++] = null;
      var i = Ke[e];
      Ke[e++] = null;
      var o = Ke[e];
      if (((Ke[e++] = null), n !== null && i !== null)) {
        var m = n.pending;
        (m === null ? (i.next = i) : ((i.next = m.next), (m.next = i)), (n.pending = i));
      }
      o !== 0 && Qf(a, i, o);
    }
  }
  function Hc(t, e, a, n) {
    ((Ke[Nl++] = t),
      (Ke[Nl++] = e),
      (Ke[Nl++] = a),
      (Ke[Nl++] = n),
      (To |= n),
      (t.lanes |= n),
      (t = t.alternate),
      t !== null && (t.lanes |= n));
  }
  function Eo(t, e, a, n) {
    return (Hc(t, e, a, n), Uc(t));
  }
  function Vn(t, e) {
    return (Hc(t, null, null, e), Uc(t));
  }
  function Qf(t, e, a) {
    t.lanes |= a;
    var n = t.alternate;
    n !== null && (n.lanes |= a);
    for (var i = !1, o = t.return; o !== null; )
      ((o.childLanes |= a),
        (n = o.alternate),
        n !== null && (n.childLanes |= a),
        o.tag === 22 && ((t = o.stateNode), t === null || t._visibility & 1 || (i = !0)),
        (t = o),
        (o = o.return));
    return t.tag === 3
      ? ((o = t.stateNode),
        i &&
          e !== null &&
          ((i = 31 - re(a)),
          (t = o.hiddenUpdates),
          (n = t[i]),
          n === null ? (t[i] = [e]) : n.push(e),
          (e.lane = a | 536870912)),
        o)
      : null;
  }
  function Uc(t) {
    if (50 < Ki) throw ((Ki = 0), (Du = null), Error(u(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var wl = {};
  function Ep(t, e, a, n) {
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
      (this.mode = n),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function $e(t, e, a, n) {
    return new Ep(t, e, a, n);
  }
  function Mo(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Oa(t, e) {
    var a = t.alternate;
    return (
      a === null
        ? ((a = $e(t.tag, e, t.key, t.mode)),
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
  function Kf(t, e) {
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
  function qc(t, e, a, n, i, o) {
    var m = 0;
    if (((n = t), typeof t == 'function')) Mo(t) && (m = 1);
    else if (typeof t == 'string')
      m = Cy(t, a, Y.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case Ft:
          return ((t = $e(31, a, e, i)), (t.elementType = Ft), (t.lanes = o), t);
        case q:
          return Gn(a.children, i, o, e);
        case B:
          ((m = 8), (i |= 24));
          break;
        case F:
          return ((t = $e(12, a, e, i | 2)), (t.elementType = F), (t.lanes = o), t);
        case Zt:
          return ((t = $e(13, a, e, i)), (t.elementType = Zt), (t.lanes = o), t);
        case At:
          return ((t = $e(19, a, e, i)), (t.elementType = At), (t.lanes = o), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case ot:
                m = 10;
                break t;
              case C:
                m = 9;
                break t;
              case Lt:
                m = 11;
                break t;
              case it:
                m = 14;
                break t;
              case qt:
                ((m = 16), (n = null));
                break t;
            }
          ((m = 29), (a = Error(u(130, t === null ? 'null' : typeof t, ''))), (n = null));
      }
    return ((e = $e(m, a, e, i)), (e.elementType = t), (e.type = n), (e.lanes = o), e);
  }
  function Gn(t, e, a, n) {
    return ((t = $e(7, t, n, e)), (t.lanes = a), t);
  }
  function No(t, e, a) {
    return ((t = $e(6, t, null, e)), (t.lanes = a), t);
  }
  function Wf(t) {
    var e = $e(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function wo(t, e, a) {
    return (
      (e = $e(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = a),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var Jf = new WeakMap();
  function We(t, e) {
    if (typeof t == 'object' && t !== null) {
      var a = Jf.get(t);
      return a !== void 0 ? a : ((e = { value: t, source: e, stack: ml(e) }), Jf.set(t, e), e);
    }
    return { value: t, source: e, stack: ml(e) };
  }
  var zl = [],
    Cl = 0,
    kc = null,
    Mi = 0,
    Je = [],
    Fe = 0,
    tn = null,
    ba = 1,
    Sa = '';
  function Ba(t, e) {
    ((zl[Cl++] = Mi), (zl[Cl++] = kc), (kc = t), (Mi = e));
  }
  function Ff(t, e, a) {
    ((Je[Fe++] = ba), (Je[Fe++] = Sa), (Je[Fe++] = tn), (tn = t));
    var n = ba;
    t = Sa;
    var i = 32 - re(n) - 1;
    ((n &= ~(1 << i)), (a += 1));
    var o = 32 - re(e) + i;
    if (30 < o) {
      var m = i - (i % 5);
      ((o = (n & ((1 << m) - 1)).toString(32)),
        (n >>= m),
        (i -= m),
        (ba = (1 << (32 - re(e) + i)) | (a << i) | n),
        (Sa = o + t));
    } else ((ba = (1 << o) | (a << i) | n), (Sa = t));
  }
  function zo(t) {
    t.return !== null && (Ba(t, 1), Ff(t, 1, 0));
  }
  function Co(t) {
    for (; t === kc; ) ((kc = zl[--Cl]), (zl[Cl] = null), (Mi = zl[--Cl]), (zl[Cl] = null));
    for (; t === tn; )
      ((tn = Je[--Fe]),
        (Je[Fe] = null),
        (Sa = Je[--Fe]),
        (Je[Fe] = null),
        (ba = Je[--Fe]),
        (Je[Fe] = null));
  }
  function If(t, e) {
    ((Je[Fe++] = ba), (Je[Fe++] = Sa), (Je[Fe++] = tn), (ba = e.id), (Sa = e.overflow), (tn = t));
  }
  var ge = null,
    Vt = null,
    gt = !1,
    en = null,
    Ie = !1,
    Ro = Error(u(519));
  function an(t) {
    var e = Error(
      u(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Ni(We(e, t)), Ro);
  }
  function Pf(t) {
    var e = t.stateNode,
      a = t.type,
      n = t.memoizedProps;
    switch (((e[ye] = t), (e[Ne] = n), a)) {
      case 'dialog':
        (mt('cancel', e), mt('close', e));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        mt('load', e);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Ji.length; a++) mt(Ji[a], e);
        break;
      case 'source':
        mt('error', e);
        break;
      case 'img':
      case 'image':
      case 'link':
        (mt('error', e), mt('load', e));
        break;
      case 'details':
        mt('toggle', e);
        break;
      case 'input':
        (mt('invalid', e),
          df(e, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        mt('invalid', e);
        break;
      case 'textarea':
        (mt('invalid', e), hf(e, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      e.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      ym(e.textContent, a)
        ? (n.popover != null && (mt('beforetoggle', e), mt('toggle', e)),
          n.onScroll != null && mt('scroll', e),
          n.onScrollEnd != null && mt('scrollend', e),
          n.onClick != null && (e.onclick = Ca),
          (e = !0))
        : (e = !1),
      e || an(t, !0));
  }
  function td(t) {
    for (ge = t.return; ge; )
      switch (ge.tag) {
        case 5:
        case 31:
        case 13:
          Ie = !1;
          return;
        case 27:
        case 3:
          Ie = !0;
          return;
        default:
          ge = ge.return;
      }
  }
  function Rl(t) {
    if (t !== ge) return !1;
    if (!gt) return (td(t), (gt = !0), !1);
    var e = t.tag,
      a;
    if (
      ((a = e !== 3 && e !== 27) &&
        ((a = e === 5) &&
          ((a = t.type), (a = !(a !== 'form' && a !== 'button') || Ju(t.type, t.memoizedProps))),
        (a = !a)),
      a && Vt && an(t),
      td(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(u(317));
      Vt = Tm(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(u(317));
      Vt = Tm(t);
    } else
      e === 27
        ? ((e = Vt), gn(t.type) ? ((t = er), (er = null), (Vt = t)) : (Vt = e))
        : (Vt = ge ? ta(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Zn() {
    ((Vt = ge = null), (gt = !1));
  }
  function Oo() {
    var t = en;
    return (t !== null && (Oe === null ? (Oe = t) : Oe.push.apply(Oe, t), (en = null)), t);
  }
  function Ni(t) {
    en === null ? (en = [t]) : en.push(t);
  }
  var Bo = j(null),
    Yn = null,
    Da = null;
  function nn(t, e, a) {
    (k(Bo, e._currentValue), (e._currentValue = a));
  }
  function La(t) {
    ((t._currentValue = Bo.current), H(Bo));
  }
  function Do(t, e, a) {
    for (; t !== null; ) {
      var n = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), n !== null && (n.childLanes |= e))
          : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e),
        t === a)
      )
        break;
      t = t.return;
    }
  }
  function Lo(t, e, a, n) {
    var i = t.child;
    for (i !== null && (i.return = t); i !== null; ) {
      var o = i.dependencies;
      if (o !== null) {
        var m = i.child;
        o = o.firstContext;
        t: for (; o !== null; ) {
          var v = o;
          o = i;
          for (var b = 0; b < e.length; b++)
            if (v.context === e[b]) {
              ((o.lanes |= a),
                (v = o.alternate),
                v !== null && (v.lanes |= a),
                Do(o.return, a, t),
                n || (m = null));
              break t;
            }
          o = v.next;
        }
      } else if (i.tag === 18) {
        if (((m = i.return), m === null)) throw Error(u(341));
        ((m.lanes |= a), (o = m.alternate), o !== null && (o.lanes |= a), Do(m, a, t), (m = null));
      } else m = i.child;
      if (m !== null) m.return = i;
      else
        for (m = i; m !== null; ) {
          if (m === t) {
            m = null;
            break;
          }
          if (((i = m.sibling), i !== null)) {
            ((i.return = m.return), (m = i));
            break;
          }
          m = m.return;
        }
      i = m;
    }
  }
  function Ol(t, e, a, n) {
    t = null;
    for (var i = e, o = !1; i !== null; ) {
      if (!o) {
        if ((i.flags & 524288) !== 0) o = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var m = i.alternate;
        if (m === null) throw Error(u(387));
        if (((m = m.memoizedProps), m !== null)) {
          var v = i.type;
          Le(i.pendingProps.value, m.value) || (t !== null ? t.push(v) : (t = [v]));
        }
      } else if (i === vt.current) {
        if (((m = i.alternate), m === null)) throw Error(u(387));
        m.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
          (t !== null ? t.push(ec) : (t = [ec]));
      }
      i = i.return;
    }
    (t !== null && Lo(e, t, a, n), (e.flags |= 262144));
  }
  function Vc(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Le(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Xn(t) {
    ((Yn = t), (Da = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function ve(t) {
    return ed(Yn, t);
  }
  function Gc(t, e) {
    return (Yn === null && Xn(t), ed(t, e));
  }
  function ed(t, e) {
    var a = e._currentValue;
    if (((e = { context: e, memoizedValue: a, next: null }), Da === null)) {
      if (t === null) throw Error(u(308));
      ((Da = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else Da = Da.next = e;
    return a;
  }
  var Mp =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (a, n) {
                  t.push(n);
                },
              });
            this.abort = function () {
              ((e.aborted = !0),
                t.forEach(function (a) {
                  return a();
                }));
            };
          },
    Np = l.unstable_scheduleCallback,
    wp = l.unstable_NormalPriority,
    ie = {
      $$typeof: ot,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function $o() {
    return { controller: new Mp(), data: new Map(), refCount: 0 };
  }
  function wi(t) {
    (t.refCount--,
      t.refCount === 0 &&
        Np(wp, function () {
          t.controller.abort();
        }));
  }
  var zi = null,
    Ho = 0,
    Bl = 0,
    Dl = null;
  function zp(t, e) {
    if (zi === null) {
      var a = (zi = []);
      ((Ho = 0),
        (Bl = ku()),
        (Dl = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (Ho++, e.then(ad, ad), e);
  }
  function ad() {
    if (--Ho === 0 && zi !== null) {
      Dl !== null && (Dl.status = 'fulfilled');
      var t = zi;
      ((zi = null), (Bl = 0), (Dl = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Cp(t, e) {
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
      t.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = e));
          for (var i = 0; i < a.length; i++) (0, a[i])(e);
        },
        function (i) {
          for (n.status = 'rejected', n.reason = i, i = 0; i < a.length; i++) (0, a[i])(void 0);
        }
      ),
      n
    );
  }
  var nd = O.S;
  O.S = function (t, e) {
    ((q0 = de()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && zp(t, e),
      nd !== null && nd(t, e));
  };
  var Qn = j(null);
  function Uo() {
    var t = Qn.current;
    return t !== null ? t : Bt.pooledCache;
  }
  function Zc(t, e) {
    e === null ? k(Qn, Qn.current) : k(Qn, e.pool);
  }
  function ld() {
    var t = Uo();
    return t === null ? null : { parent: ie._currentValue, pool: t };
  }
  var Ll = Error(u(460)),
    qo = Error(u(474)),
    Yc = Error(u(542)),
    Xc = { then: function () {} };
  function id(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function cd(t, e, a) {
    switch (
      ((a = t[a]), a === void 0 ? t.push(e) : a !== e && (e.then(Ca, Ca), (e = a)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), od(t), t);
      default:
        if (typeof e.status == 'string') e.then(Ca, Ca);
        else {
          if (((t = Bt), t !== null && 100 < t.shellSuspendCounter)) throw Error(u(482));
          ((t = e),
            (t.status = 'pending'),
            t.then(
              function (n) {
                if (e.status === 'pending') {
                  var i = e;
                  ((i.status = 'fulfilled'), (i.value = n));
                }
              },
              function (n) {
                if (e.status === 'pending') {
                  var i = e;
                  ((i.status = 'rejected'), (i.reason = n));
                }
              }
            ));
        }
        switch (e.status) {
          case 'fulfilled':
            return e.value;
          case 'rejected':
            throw ((t = e.reason), od(t), t);
        }
        throw ((Wn = e), Ll);
    }
  }
  function Kn(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((Wn = a), Ll) : a;
    }
  }
  var Wn = null;
  function sd() {
    if (Wn === null) throw Error(u(459));
    var t = Wn;
    return ((Wn = null), t);
  }
  function od(t) {
    if (t === Ll || t === Yc) throw Error(u(483));
  }
  var $l = null,
    Ci = 0;
  function Qc(t) {
    var e = Ci;
    return ((Ci += 1), $l === null && ($l = []), cd($l, t, e));
  }
  function Ri(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function Kc(t, e) {
    throw e.$$typeof === T
      ? Error(u(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          u(
            31,
            t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t
          )
        ));
  }
  function ud(t) {
    function e(A, x) {
      if (t) {
        var M = A.deletions;
        M === null ? ((A.deletions = [x]), (A.flags |= 16)) : M.push(x);
      }
    }
    function a(A, x) {
      if (!t) return null;
      for (; x !== null; ) (e(A, x), (x = x.sibling));
      return null;
    }
    function n(A) {
      for (var x = new Map(); A !== null; )
        (A.key !== null ? x.set(A.key, A) : x.set(A.index, A), (A = A.sibling));
      return x;
    }
    function i(A, x) {
      return ((A = Oa(A, x)), (A.index = 0), (A.sibling = null), A);
    }
    function o(A, x, M) {
      return (
        (A.index = M),
        t
          ? ((M = A.alternate),
            M !== null
              ? ((M = M.index), M < x ? ((A.flags |= 67108866), x) : M)
              : ((A.flags |= 67108866), x))
          : ((A.flags |= 1048576), x)
      );
    }
    function m(A) {
      return (t && A.alternate === null && (A.flags |= 67108866), A);
    }
    function v(A, x, M, $) {
      return x === null || x.tag !== 6
        ? ((x = No(M, A.mode, $)), (x.return = A), x)
        : ((x = i(x, M)), (x.return = A), x);
    }
    function b(A, x, M, $) {
      var et = M.type;
      return et === q
        ? D(A, x, M.props.children, $, M.key)
        : x !== null &&
            (x.elementType === et ||
              (typeof et == 'object' && et !== null && et.$$typeof === qt && Kn(et) === x.type))
          ? ((x = i(x, M.props)), Ri(x, M), (x.return = A), x)
          : ((x = qc(M.type, M.key, M.props, null, A.mode, $)), Ri(x, M), (x.return = A), x);
    }
    function N(A, x, M, $) {
      return x === null ||
        x.tag !== 4 ||
        x.stateNode.containerInfo !== M.containerInfo ||
        x.stateNode.implementation !== M.implementation
        ? ((x = wo(M, A.mode, $)), (x.return = A), x)
        : ((x = i(x, M.children || [])), (x.return = A), x);
    }
    function D(A, x, M, $, et) {
      return x === null || x.tag !== 7
        ? ((x = Gn(M, A.mode, $, et)), (x.return = A), x)
        : ((x = i(x, M)), (x.return = A), x);
    }
    function U(A, x, M) {
      if ((typeof x == 'string' && x !== '') || typeof x == 'number' || typeof x == 'bigint')
        return ((x = No('' + x, A.mode, M)), (x.return = A), x);
      if (typeof x == 'object' && x !== null) {
        switch (x.$$typeof) {
          case z:
            return ((M = qc(x.type, x.key, x.props, null, A.mode, M)), Ri(M, x), (M.return = A), M);
          case E:
            return ((x = wo(x, A.mode, M)), (x.return = A), x);
          case qt:
            return ((x = Kn(x)), U(A, x, M));
        }
        if (It(x) || Kt(x)) return ((x = Gn(x, A.mode, M, null)), (x.return = A), x);
        if (typeof x.then == 'function') return U(A, Qc(x), M);
        if (x.$$typeof === ot) return U(A, Gc(A, x), M);
        Kc(A, x);
      }
      return null;
    }
    function w(A, x, M, $) {
      var et = x !== null ? x.key : null;
      if ((typeof M == 'string' && M !== '') || typeof M == 'number' || typeof M == 'bigint')
        return et !== null ? null : v(A, x, '' + M, $);
      if (typeof M == 'object' && M !== null) {
        switch (M.$$typeof) {
          case z:
            return M.key === et ? b(A, x, M, $) : null;
          case E:
            return M.key === et ? N(A, x, M, $) : null;
          case qt:
            return ((M = Kn(M)), w(A, x, M, $));
        }
        if (It(M) || Kt(M)) return et !== null ? null : D(A, x, M, $, null);
        if (typeof M.then == 'function') return w(A, x, Qc(M), $);
        if (M.$$typeof === ot) return w(A, x, Gc(A, M), $);
        Kc(A, M);
      }
      return null;
    }
    function R(A, x, M, $, et) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((A = A.get(M) || null), v(x, A, '' + $, et));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case z:
            return ((A = A.get($.key === null ? M : $.key) || null), b(x, A, $, et));
          case E:
            return ((A = A.get($.key === null ? M : $.key) || null), N(x, A, $, et));
          case qt:
            return (($ = Kn($)), R(A, x, M, $, et));
        }
        if (It($) || Kt($)) return ((A = A.get(M) || null), D(x, A, $, et, null));
        if (typeof $.then == 'function') return R(A, x, M, Qc($), et);
        if ($.$$typeof === ot) return R(A, x, M, Gc(x, $), et);
        Kc(x, $);
      }
      return null;
    }
    function W(A, x, M, $) {
      for (
        var et = null, xt = null, P = x, ut = (x = 0), pt = null;
        P !== null && ut < M.length;
        ut++
      ) {
        P.index > ut ? ((pt = P), (P = null)) : (pt = P.sibling);
        var jt = w(A, P, M[ut], $);
        if (jt === null) {
          P === null && (P = pt);
          break;
        }
        (t && P && jt.alternate === null && e(A, P),
          (x = o(jt, x, ut)),
          xt === null ? (et = jt) : (xt.sibling = jt),
          (xt = jt),
          (P = pt));
      }
      if (ut === M.length) return (a(A, P), gt && Ba(A, ut), et);
      if (P === null) {
        for (; ut < M.length; ut++)
          ((P = U(A, M[ut], $)),
            P !== null && ((x = o(P, x, ut)), xt === null ? (et = P) : (xt.sibling = P), (xt = P)));
        return (gt && Ba(A, ut), et);
      }
      for (P = n(P); ut < M.length; ut++)
        ((pt = R(P, A, ut, M[ut], $)),
          pt !== null &&
            (t && pt.alternate !== null && P.delete(pt.key === null ? ut : pt.key),
            (x = o(pt, x, ut)),
            xt === null ? (et = pt) : (xt.sibling = pt),
            (xt = pt)));
      return (
        t &&
          P.forEach(function (xn) {
            return e(A, xn);
          }),
        gt && Ba(A, ut),
        et
      );
    }
    function lt(A, x, M, $) {
      if (M == null) throw Error(u(151));
      for (
        var et = null, xt = null, P = x, ut = (x = 0), pt = null, jt = M.next();
        P !== null && !jt.done;
        ut++, jt = M.next()
      ) {
        P.index > ut ? ((pt = P), (P = null)) : (pt = P.sibling);
        var xn = w(A, P, jt.value, $);
        if (xn === null) {
          P === null && (P = pt);
          break;
        }
        (t && P && xn.alternate === null && e(A, P),
          (x = o(xn, x, ut)),
          xt === null ? (et = xn) : (xt.sibling = xn),
          (xt = xn),
          (P = pt));
      }
      if (jt.done) return (a(A, P), gt && Ba(A, ut), et);
      if (P === null) {
        for (; !jt.done; ut++, jt = M.next())
          ((jt = U(A, jt.value, $)),
            jt !== null &&
              ((x = o(jt, x, ut)), xt === null ? (et = jt) : (xt.sibling = jt), (xt = jt)));
        return (gt && Ba(A, ut), et);
      }
      for (P = n(P); !jt.done; ut++, jt = M.next())
        ((jt = R(P, A, ut, jt.value, $)),
          jt !== null &&
            (t && jt.alternate !== null && P.delete(jt.key === null ? ut : jt.key),
            (x = o(jt, x, ut)),
            xt === null ? (et = jt) : (xt.sibling = jt),
            (xt = jt)));
      return (
        t &&
          P.forEach(function (Vy) {
            return e(A, Vy);
          }),
        gt && Ba(A, ut),
        et
      );
    }
    function Ot(A, x, M, $) {
      if (
        (typeof M == 'object' &&
          M !== null &&
          M.type === q &&
          M.key === null &&
          (M = M.props.children),
        typeof M == 'object' && M !== null)
      ) {
        switch (M.$$typeof) {
          case z:
            t: {
              for (var et = M.key; x !== null; ) {
                if (x.key === et) {
                  if (((et = M.type), et === q)) {
                    if (x.tag === 7) {
                      (a(A, x.sibling), ($ = i(x, M.props.children)), ($.return = A), (A = $));
                      break t;
                    }
                  } else if (
                    x.elementType === et ||
                    (typeof et == 'object' &&
                      et !== null &&
                      et.$$typeof === qt &&
                      Kn(et) === x.type)
                  ) {
                    (a(A, x.sibling), ($ = i(x, M.props)), Ri($, M), ($.return = A), (A = $));
                    break t;
                  }
                  a(A, x);
                  break;
                } else e(A, x);
                x = x.sibling;
              }
              M.type === q
                ? (($ = Gn(M.props.children, A.mode, $, M.key)), ($.return = A), (A = $))
                : (($ = qc(M.type, M.key, M.props, null, A.mode, $)),
                  Ri($, M),
                  ($.return = A),
                  (A = $));
            }
            return m(A);
          case E:
            t: {
              for (et = M.key; x !== null; ) {
                if (x.key === et)
                  if (
                    x.tag === 4 &&
                    x.stateNode.containerInfo === M.containerInfo &&
                    x.stateNode.implementation === M.implementation
                  ) {
                    (a(A, x.sibling), ($ = i(x, M.children || [])), ($.return = A), (A = $));
                    break t;
                  } else {
                    a(A, x);
                    break;
                  }
                else e(A, x);
                x = x.sibling;
              }
              (($ = wo(M, A.mode, $)), ($.return = A), (A = $));
            }
            return m(A);
          case qt:
            return ((M = Kn(M)), Ot(A, x, M, $));
        }
        if (It(M)) return W(A, x, M, $);
        if (Kt(M)) {
          if (((et = Kt(M)), typeof et != 'function')) throw Error(u(150));
          return ((M = et.call(M)), lt(A, x, M, $));
        }
        if (typeof M.then == 'function') return Ot(A, x, Qc(M), $);
        if (M.$$typeof === ot) return Ot(A, x, Gc(A, M), $);
        Kc(A, M);
      }
      return (typeof M == 'string' && M !== '') || typeof M == 'number' || typeof M == 'bigint'
        ? ((M = '' + M),
          x !== null && x.tag === 6
            ? (a(A, x.sibling), ($ = i(x, M)), ($.return = A), (A = $))
            : (a(A, x), ($ = No(M, A.mode, $)), ($.return = A), (A = $)),
          m(A))
        : a(A, x);
    }
    return function (A, x, M, $) {
      try {
        Ci = 0;
        var et = Ot(A, x, M, $);
        return (($l = null), et);
      } catch (P) {
        if (P === Ll || P === Yc) throw P;
        var xt = $e(29, P, null, A.mode);
        return ((xt.lanes = $), (xt.return = A), xt);
      } finally {
      }
    };
  }
  var Jn = ud(!0),
    rd = ud(!1),
    ln = !1;
  function ko(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Vo(t, e) {
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
  function cn(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function sn(t, e, a) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Et & 2) !== 0)) {
      var i = n.pending;
      return (
        i === null ? (e.next = e) : ((e.next = i.next), (i.next = e)),
        (n.pending = e),
        (e = Uc(t)),
        Qf(t, null, a),
        e
      );
    }
    return (Hc(t, n, e, a), Uc(t));
  }
  function Oi(t, e, a) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (a & 4194048) !== 0))) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (a |= n), (e.lanes = a), tf(t, a));
    }
  }
  function Go(t, e) {
    var a = t.updateQueue,
      n = t.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var i = null,
        o = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var m = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (o === null ? (i = o = m) : (o = o.next = m), (a = a.next));
        } while (a !== null);
        o === null ? (i = o = e) : (o = o.next = e);
      } else i = o = e;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: o,
        shared: n.shared,
        callbacks: n.callbacks,
      }),
        (t.updateQueue = a));
      return;
    }
    ((t = a.lastBaseUpdate),
      t === null ? (a.firstBaseUpdate = e) : (t.next = e),
      (a.lastBaseUpdate = e));
  }
  var Zo = !1;
  function Bi() {
    if (Zo) {
      var t = Dl;
      if (t !== null) throw t;
    }
  }
  function Di(t, e, a, n) {
    Zo = !1;
    var i = t.updateQueue;
    ln = !1;
    var o = i.firstBaseUpdate,
      m = i.lastBaseUpdate,
      v = i.shared.pending;
    if (v !== null) {
      i.shared.pending = null;
      var b = v,
        N = b.next;
      ((b.next = null), m === null ? (o = N) : (m.next = N), (m = b));
      var D = t.alternate;
      D !== null &&
        ((D = D.updateQueue),
        (v = D.lastBaseUpdate),
        v !== m && (v === null ? (D.firstBaseUpdate = N) : (v.next = N), (D.lastBaseUpdate = b)));
    }
    if (o !== null) {
      var U = i.baseState;
      ((m = 0), (D = N = b = null), (v = o));
      do {
        var w = v.lane & -536870913,
          R = w !== v.lane;
        if (R ? (ht & w) === w : (n & w) === w) {
          (w !== 0 && w === Bl && (Zo = !0),
            D !== null &&
              (D = D.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          t: {
            var W = t,
              lt = v;
            w = e;
            var Ot = a;
            switch (lt.tag) {
              case 1:
                if (((W = lt.payload), typeof W == 'function')) {
                  U = W.call(Ot, U, w);
                  break t;
                }
                U = W;
                break t;
              case 3:
                W.flags = (W.flags & -65537) | 128;
              case 0:
                if (
                  ((W = lt.payload), (w = typeof W == 'function' ? W.call(Ot, U, w) : W), w == null)
                )
                  break t;
                U = S({}, U, w);
                break t;
              case 2:
                ln = !0;
            }
          }
          ((w = v.callback),
            w !== null &&
              ((t.flags |= 64),
              R && (t.flags |= 8192),
              (R = i.callbacks),
              R === null ? (i.callbacks = [w]) : R.push(w)));
        } else
          ((R = { lane: w, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            D === null ? ((N = D = R), (b = U)) : (D = D.next = R),
            (m |= w));
        if (((v = v.next), v === null)) {
          if (((v = i.shared.pending), v === null)) break;
          ((R = v),
            (v = R.next),
            (R.next = null),
            (i.lastBaseUpdate = R),
            (i.shared.pending = null));
        }
      } while (!0);
      (D === null && (b = U),
        (i.baseState = b),
        (i.firstBaseUpdate = N),
        (i.lastBaseUpdate = D),
        o === null && (i.shared.lanes = 0),
        (dn |= m),
        (t.lanes = m),
        (t.memoizedState = U));
    }
  }
  function fd(t, e) {
    if (typeof t != 'function') throw Error(u(191, t));
    t.call(e);
  }
  function dd(t, e) {
    var a = t.callbacks;
    if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) fd(a[t], e);
  }
  var Hl = j(null),
    Wc = j(0);
  function md(t, e) {
    ((t = Ya), k(Wc, t), k(Hl, e), (Ya = t | e.baseLanes));
  }
  function Yo() {
    (k(Wc, Ya), k(Hl, Hl.current));
  }
  function Xo() {
    ((Ya = Wc.current), H(Hl), H(Wc));
  }
  var He = j(null),
    Pe = null;
  function on(t) {
    var e = t.alternate;
    (k(Pt, Pt.current & 1),
      k(He, t),
      Pe === null && (e === null || Hl.current !== null || e.memoizedState !== null) && (Pe = t));
  }
  function Qo(t) {
    (k(Pt, Pt.current), k(He, t), Pe === null && (Pe = t));
  }
  function hd(t) {
    t.tag === 22 ? (k(Pt, Pt.current), k(He, t), Pe === null && (Pe = t)) : un();
  }
  function un() {
    (k(Pt, Pt.current), k(He, He.current));
  }
  function Ue(t) {
    (H(He), Pe === t && (Pe = null), H(Pt));
  }
  var Pt = j(0);
  function Jc(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Pu(a) || tr(a))) return e;
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
  var $a = 0,
    st = null,
    Ct = null,
    ce = null,
    Fc = !1,
    Ul = !1,
    Fn = !1,
    Ic = 0,
    Li = 0,
    ql = null,
    Rp = 0;
  function Wt() {
    throw Error(u(321));
  }
  function Ko(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++) if (!Le(t[a], e[a])) return !1;
    return !0;
  }
  function Wo(t, e, a, n, i, o) {
    return (
      ($a = o),
      (st = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (O.H = t === null || t.memoizedState === null ? Fd : ru),
      (Fn = !1),
      (o = a(n, i)),
      (Fn = !1),
      Ul && (o = yd(e, a, n, i)),
      pd(t),
      o
    );
  }
  function pd(t) {
    O.H = Ui;
    var e = Ct !== null && Ct.next !== null;
    if ((($a = 0), (ce = Ct = st = null), (Fc = !1), (Li = 0), (ql = null), e)) throw Error(u(300));
    t === null || se || ((t = t.dependencies), t !== null && Vc(t) && (se = !0));
  }
  function yd(t, e, a, n) {
    st = t;
    var i = 0;
    do {
      if ((Ul && (ql = null), (Li = 0), (Ul = !1), 25 <= i)) throw Error(u(301));
      if (((i += 1), (ce = Ct = null), t.updateQueue != null)) {
        var o = t.updateQueue;
        ((o.lastEffect = null),
          (o.events = null),
          (o.stores = null),
          o.memoCache != null && (o.memoCache.index = 0));
      }
      ((O.H = Id), (o = e(a, n)));
    } while (Ul);
    return o;
  }
  function Op() {
    var t = O.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? $i(e) : e),
      (t = t.useState()[0]),
      (Ct !== null ? Ct.memoizedState : null) !== t && (st.flags |= 1024),
      e
    );
  }
  function Jo() {
    var t = Ic !== 0;
    return ((Ic = 0), t);
  }
  function Fo(t, e, a) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~a));
  }
  function Io(t) {
    if (Fc) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      Fc = !1;
    }
    (($a = 0), (ce = Ct = st = null), (Ul = !1), (Li = Ic = 0), (ql = null));
  }
  function Te() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (ce === null ? (st.memoizedState = ce = t) : (ce = ce.next = t), ce);
  }
  function te() {
    if (Ct === null) {
      var t = st.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ct.next;
    var e = ce === null ? st.memoizedState : ce.next;
    if (e !== null) ((ce = e), (Ct = t));
    else {
      if (t === null) throw st.alternate === null ? Error(u(467)) : Error(u(310));
      ((Ct = t),
        (t = {
          memoizedState: Ct.memoizedState,
          baseState: Ct.baseState,
          baseQueue: Ct.baseQueue,
          queue: Ct.queue,
          next: null,
        }),
        ce === null ? (st.memoizedState = ce = t) : (ce = ce.next = t));
    }
    return ce;
  }
  function Pc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function $i(t) {
    var e = Li;
    return (
      (Li += 1),
      ql === null && (ql = []),
      (t = cd(ql, t, e)),
      (e = st),
      (ce === null ? e.memoizedState : ce.next) === null &&
        ((e = e.alternate), (O.H = e === null || e.memoizedState === null ? Fd : ru)),
      t
    );
  }
  function ts(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return $i(t);
      if (t.$$typeof === ot) return ve(t);
    }
    throw Error(u(438, String(t)));
  }
  function Po(t) {
    var e = null,
      a = st.updateQueue;
    if ((a !== null && (e = a.memoCache), e == null)) {
      var n = st.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (e = {
              data: n.data.map(function (i) {
                return i.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      a === null && ((a = Pc()), (st.updateQueue = a)),
      (a.memoCache = e),
      (a = e.data[e.index]),
      a === void 0)
    )
      for (a = e.data[e.index] = Array(t), n = 0; n < t; n++) a[n] = Yt;
    return (e.index++, a);
  }
  function Ha(t, e) {
    return typeof e == 'function' ? e(t) : e;
  }
  function es(t) {
    var e = te();
    return tu(e, Ct, t);
  }
  function tu(t, e, a) {
    var n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = a;
    var i = t.baseQueue,
      o = n.pending;
    if (o !== null) {
      if (i !== null) {
        var m = i.next;
        ((i.next = o.next), (o.next = m));
      }
      ((e.baseQueue = i = o), (n.pending = null));
    }
    if (((o = t.baseState), i === null)) t.memoizedState = o;
    else {
      e = i.next;
      var v = (m = null),
        b = null,
        N = e,
        D = !1;
      do {
        var U = N.lane & -536870913;
        if (U !== N.lane ? (ht & U) === U : ($a & U) === U) {
          var w = N.revertLane;
          if (w === 0)
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
              U === Bl && (D = !0));
          else if (($a & w) === w) {
            ((N = N.next), w === Bl && (D = !0));
            continue;
          } else
            ((U = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null,
            }),
              b === null ? ((v = b = U), (m = o)) : (b = b.next = U),
              (st.lanes |= w),
              (dn |= w));
          ((U = N.action), Fn && a(o, U), (o = N.hasEagerState ? N.eagerState : a(o, U)));
        } else
          ((w = {
            lane: U,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null,
          }),
            b === null ? ((v = b = w), (m = o)) : (b = b.next = w),
            (st.lanes |= U),
            (dn |= U));
        N = N.next;
      } while (N !== null && N !== e);
      if (
        (b === null ? (m = o) : (b.next = v),
        !Le(o, t.memoizedState) && ((se = !0), D && ((a = Dl), a !== null)))
      )
        throw a;
      ((t.memoizedState = o), (t.baseState = m), (t.baseQueue = b), (n.lastRenderedState = o));
    }
    return (i === null && (n.lanes = 0), [t.memoizedState, n.dispatch]);
  }
  function eu(t) {
    var e = te(),
      a = e.queue;
    if (a === null) throw Error(u(311));
    a.lastRenderedReducer = t;
    var n = a.dispatch,
      i = a.pending,
      o = e.memoizedState;
    if (i !== null) {
      a.pending = null;
      var m = (i = i.next);
      do ((o = t(o, m.action)), (m = m.next));
      while (m !== i);
      (Le(o, e.memoizedState) || (se = !0),
        (e.memoizedState = o),
        e.baseQueue === null && (e.baseState = o),
        (a.lastRenderedState = o));
    }
    return [o, n];
  }
  function gd(t, e, a) {
    var n = st,
      i = te(),
      o = gt;
    if (o) {
      if (a === void 0) throw Error(u(407));
      a = a();
    } else a = e();
    var m = !Le((Ct || i).memoizedState, a);
    if (
      (m && ((i.memoizedState = a), (se = !0)),
      (i = i.queue),
      lu(bd.bind(null, n, i, t), [t]),
      i.getSnapshot !== e || m || (ce !== null && ce.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        kl(9, { destroy: void 0 }, _d.bind(null, n, i, a, e), null),
        Bt === null)
      )
        throw Error(u(349));
      o || ($a & 127) !== 0 || vd(n, e, a);
    }
    return a;
  }
  function vd(t, e, a) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: a }),
      (e = st.updateQueue),
      e === null
        ? ((e = Pc()), (st.updateQueue = e), (e.stores = [t]))
        : ((a = e.stores), a === null ? (e.stores = [t]) : a.push(t)));
  }
  function _d(t, e, a, n) {
    ((e.value = a), (e.getSnapshot = n), Sd(e) && xd(t));
  }
  function bd(t, e, a) {
    return a(function () {
      Sd(e) && xd(t);
    });
  }
  function Sd(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !Le(t, a);
    } catch {
      return !0;
    }
  }
  function xd(t) {
    var e = Vn(t, 2);
    e !== null && Be(e, t, 2);
  }
  function au(t) {
    var e = Te();
    if (typeof t == 'function') {
      var a = t;
      if (((t = a()), Fn)) {
        _a(!0);
        try {
          a();
        } finally {
          _a(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ha,
        lastRenderedState: t,
      }),
      e
    );
  }
  function jd(t, e, a, n) {
    return ((t.baseState = a), tu(t, Ct, typeof n == 'function' ? n : Ha));
  }
  function Bp(t, e, a, n, i) {
    if (ls(t)) throw Error(u(485));
    if (((t = e.action), t !== null)) {
      var o = {
        payload: i,
        action: t,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (m) {
          o.listeners.push(m);
        },
      };
      (O.T !== null ? a(!0) : (o.isTransition = !1),
        n(o),
        (a = e.pending),
        a === null
          ? ((o.next = e.pending = o), Ad(e, o))
          : ((o.next = a.next), (e.pending = a.next = o)));
    }
  }
  function Ad(t, e) {
    var a = e.action,
      n = e.payload,
      i = t.state;
    if (e.isTransition) {
      var o = O.T,
        m = {};
      O.T = m;
      try {
        var v = a(i, n),
          b = O.S;
        (b !== null && b(m, v), Td(t, e, v));
      } catch (N) {
        nu(t, e, N);
      } finally {
        (o !== null && m.types !== null && (o.types = m.types), (O.T = o));
      }
    } else
      try {
        ((o = a(i, n)), Td(t, e, o));
      } catch (N) {
        nu(t, e, N);
      }
  }
  function Td(t, e, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            Ed(t, e, n);
          },
          function (n) {
            return nu(t, e, n);
          }
        )
      : Ed(t, e, a);
  }
  function Ed(t, e, a) {
    ((e.status = 'fulfilled'),
      (e.value = a),
      Md(e),
      (t.state = a),
      (e = t.pending),
      e !== null &&
        ((a = e.next), a === e ? (t.pending = null) : ((a = a.next), (e.next = a), Ad(t, a))));
  }
  function nu(t, e, a) {
    var n = t.pending;
    if (((t.pending = null), n !== null)) {
      n = n.next;
      do ((e.status = 'rejected'), (e.reason = a), Md(e), (e = e.next));
      while (e !== n);
    }
    t.action = null;
  }
  function Md(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Nd(t, e) {
    return e;
  }
  function wd(t, e) {
    if (gt) {
      var a = Bt.formState;
      if (a !== null) {
        t: {
          var n = st;
          if (gt) {
            if (Vt) {
              e: {
                for (var i = Vt, o = Ie; i.nodeType !== 8; ) {
                  if (!o) {
                    i = null;
                    break e;
                  }
                  if (((i = ta(i.nextSibling)), i === null)) {
                    i = null;
                    break e;
                  }
                }
                ((o = i.data), (i = o === 'F!' || o === 'F' ? i : null));
              }
              if (i) {
                ((Vt = ta(i.nextSibling)), (n = i.data === 'F!'));
                break t;
              }
            }
            an(n);
          }
          n = !1;
        }
        n && (e = a[0]);
      }
    }
    return (
      (a = Te()),
      (a.memoizedState = a.baseState = e),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Nd,
        lastRenderedState: e,
      }),
      (a.queue = n),
      (a = Kd.bind(null, st, n)),
      (n.dispatch = a),
      (n = au(!1)),
      (o = uu.bind(null, st, !1, n.queue)),
      (n = Te()),
      (i = { state: e, dispatch: null, action: t, pending: null }),
      (n.queue = i),
      (a = Bp.bind(null, st, i, o, a)),
      (i.dispatch = a),
      (n.memoizedState = t),
      [e, a, !1]
    );
  }
  function zd(t) {
    var e = te();
    return Cd(e, Ct, t);
  }
  function Cd(t, e, a) {
    if (
      ((e = tu(t, e, Nd)[0]),
      (t = es(Ha)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var n = $i(e);
      } catch (m) {
        throw m === Ll ? Yc : m;
      }
    else n = e;
    e = te();
    var i = e.queue,
      o = i.dispatch;
    return (
      a !== e.memoizedState &&
        ((st.flags |= 2048), kl(9, { destroy: void 0 }, Dp.bind(null, i, a), null)),
      [n, o, t]
    );
  }
  function Dp(t, e) {
    t.action = e;
  }
  function Rd(t) {
    var e = te(),
      a = Ct;
    if (a !== null) return Cd(e, a, t);
    (te(), (e = e.memoizedState), (a = te()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = t), [e, n, !1]);
  }
  function kl(t, e, a, n) {
    return (
      (t = { tag: t, create: a, deps: n, inst: e, next: null }),
      (e = st.updateQueue),
      e === null && ((e = Pc()), (st.updateQueue = e)),
      (a = e.lastEffect),
      a === null
        ? (e.lastEffect = t.next = t)
        : ((n = a.next), (a.next = t), (t.next = n), (e.lastEffect = t)),
      t
    );
  }
  function Od() {
    return te().memoizedState;
  }
  function as(t, e, a, n) {
    var i = Te();
    ((st.flags |= t),
      (i.memoizedState = kl(1 | e, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function ns(t, e, a, n) {
    var i = te();
    n = n === void 0 ? null : n;
    var o = i.memoizedState.inst;
    Ct !== null && n !== null && Ko(n, Ct.memoizedState.deps)
      ? (i.memoizedState = kl(e, o, a, n))
      : ((st.flags |= t), (i.memoizedState = kl(1 | e, o, a, n)));
  }
  function Bd(t, e) {
    as(8390656, 8, t, e);
  }
  function lu(t, e) {
    ns(2048, 8, t, e);
  }
  function Lp(t) {
    st.flags |= 4;
    var e = st.updateQueue;
    if (e === null) ((e = Pc()), (st.updateQueue = e), (e.events = [t]));
    else {
      var a = e.events;
      a === null ? (e.events = [t]) : a.push(t);
    }
  }
  function Dd(t) {
    var e = te().memoizedState;
    return (
      Lp({ ref: e, nextImpl: t }),
      function () {
        if ((Et & 2) !== 0) throw Error(u(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function Ld(t, e) {
    return ns(4, 2, t, e);
  }
  function $d(t, e) {
    return ns(4, 4, t, e);
  }
  function Hd(t, e) {
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
  function Ud(t, e, a) {
    ((a = a != null ? a.concat([t]) : null), ns(4, 4, Hd.bind(null, e, t), a));
  }
  function iu() {}
  function qd(t, e) {
    var a = te();
    e = e === void 0 ? null : e;
    var n = a.memoizedState;
    return e !== null && Ko(e, n[1]) ? n[0] : ((a.memoizedState = [t, e]), t);
  }
  function kd(t, e) {
    var a = te();
    e = e === void 0 ? null : e;
    var n = a.memoizedState;
    if (e !== null && Ko(e, n[1])) return n[0];
    if (((n = t()), Fn)) {
      _a(!0);
      try {
        t();
      } finally {
        _a(!1);
      }
    }
    return ((a.memoizedState = [n, e]), n);
  }
  function cu(t, e, a) {
    return a === void 0 || (($a & 1073741824) !== 0 && (ht & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = a), (t = V0()), (st.lanes |= t), (dn |= t), a);
  }
  function Vd(t, e, a, n) {
    return Le(a, e)
      ? a
      : Hl.current !== null
        ? ((t = cu(t, a, n)), Le(t, e) || (se = !0), t)
        : ($a & 42) === 0 || (($a & 1073741824) !== 0 && (ht & 261930) === 0)
          ? ((se = !0), (t.memoizedState = a))
          : ((t = V0()), (st.lanes |= t), (dn |= t), e);
  }
  function Gd(t, e, a, n, i) {
    var o = Z.p;
    Z.p = o !== 0 && 8 > o ? o : 8;
    var m = O.T,
      v = {};
    ((O.T = v), uu(t, !1, e, a));
    try {
      var b = i(),
        N = O.S;
      if (
        (N !== null && N(v, b), b !== null && typeof b == 'object' && typeof b.then == 'function')
      ) {
        var D = Cp(b, n);
        Hi(t, e, D, Ve(t));
      } else Hi(t, e, n, Ve(t));
    } catch (U) {
      Hi(t, e, { then: function () {}, status: 'rejected', reason: U }, Ve());
    } finally {
      ((Z.p = o), m !== null && v.types !== null && (m.types = v.types), (O.T = m));
    }
  }
  function $p() {}
  function su(t, e, a, n) {
    if (t.tag !== 5) throw Error(u(476));
    var i = Zd(t).queue;
    Gd(
      t,
      i,
      e,
      at,
      a === null
        ? $p
        : function () {
            return (Yd(t), a(n));
          }
    );
  }
  function Zd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: at,
      baseState: at,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ha,
        lastRenderedState: at,
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
          lastRenderedReducer: Ha,
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
  function Yd(t) {
    var e = Zd(t);
    (e.next === null && (e = t.alternate.memoizedState), Hi(t, e.next.queue, {}, Ve()));
  }
  function ou() {
    return ve(ec);
  }
  function Xd() {
    return te().memoizedState;
  }
  function Qd() {
    return te().memoizedState;
  }
  function Hp(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var a = Ve();
          t = cn(a);
          var n = sn(e, t, a);
          (n !== null && (Be(n, e, a), Oi(n, e, a)), (e = { cache: $o() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function Up(t, e, a) {
    var n = Ve();
    ((a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ls(t) ? Wd(e, a) : ((a = Eo(t, e, a, n)), a !== null && (Be(a, t, n), Jd(a, e, n))));
  }
  function Kd(t, e, a) {
    var n = Ve();
    Hi(t, e, a, n);
  }
  function Hi(t, e, a, n) {
    var i = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ls(t)) Wd(e, i);
    else {
      var o = t.alternate;
      if (
        t.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = e.lastRenderedReducer), o !== null)
      )
        try {
          var m = e.lastRenderedState,
            v = o(m, a);
          if (((i.hasEagerState = !0), (i.eagerState = v), Le(v, m)))
            return (Hc(t, e, i, 0), Bt === null && $c(), !1);
        } catch {
        } finally {
        }
      if (((a = Eo(t, e, i, n)), a !== null)) return (Be(a, t, n), Jd(a, e, n), !0);
    }
    return !1;
  }
  function uu(t, e, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: ku(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ls(t))
    ) {
      if (e) throw Error(u(479));
    } else ((e = Eo(t, a, n, 2)), e !== null && Be(e, t, 2));
  }
  function ls(t) {
    var e = t.alternate;
    return t === st || (e !== null && e === st);
  }
  function Wd(t, e) {
    Ul = Fc = !0;
    var a = t.pending;
    (a === null ? (e.next = e) : ((e.next = a.next), (a.next = e)), (t.pending = e));
  }
  function Jd(t, e, a) {
    if ((a & 4194048) !== 0) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (a |= n), (e.lanes = a), tf(t, a));
    }
  }
  var Ui = {
    readContext: ve,
    use: ts,
    useCallback: Wt,
    useContext: Wt,
    useEffect: Wt,
    useImperativeHandle: Wt,
    useLayoutEffect: Wt,
    useInsertionEffect: Wt,
    useMemo: Wt,
    useReducer: Wt,
    useRef: Wt,
    useState: Wt,
    useDebugValue: Wt,
    useDeferredValue: Wt,
    useTransition: Wt,
    useSyncExternalStore: Wt,
    useId: Wt,
    useHostTransitionStatus: Wt,
    useFormState: Wt,
    useActionState: Wt,
    useOptimistic: Wt,
    useMemoCache: Wt,
    useCacheRefresh: Wt,
  };
  Ui.useEffectEvent = Wt;
  var Fd = {
      readContext: ve,
      use: ts,
      useCallback: function (t, e) {
        return ((Te().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: ve,
      useEffect: Bd,
      useImperativeHandle: function (t, e, a) {
        ((a = a != null ? a.concat([t]) : null), as(4194308, 4, Hd.bind(null, e, t), a));
      },
      useLayoutEffect: function (t, e) {
        return as(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        as(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var a = Te();
        e = e === void 0 ? null : e;
        var n = t();
        if (Fn) {
          _a(!0);
          try {
            t();
          } finally {
            _a(!1);
          }
        }
        return ((a.memoizedState = [n, e]), n);
      },
      useReducer: function (t, e, a) {
        var n = Te();
        if (a !== void 0) {
          var i = a(e);
          if (Fn) {
            _a(!0);
            try {
              a(e);
            } finally {
              _a(!1);
            }
          }
        } else i = e;
        return (
          (n.memoizedState = n.baseState = i),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: i,
          }),
          (n.queue = t),
          (t = t.dispatch = Up.bind(null, st, t)),
          [n.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = Te();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = au(t);
        var e = t.queue,
          a = Kd.bind(null, st, e);
        return ((e.dispatch = a), [t.memoizedState, a]);
      },
      useDebugValue: iu,
      useDeferredValue: function (t, e) {
        var a = Te();
        return cu(a, t, e);
      },
      useTransition: function () {
        var t = au(!1);
        return ((t = Gd.bind(null, st, t.queue, !0, !1)), (Te().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, a) {
        var n = st,
          i = Te();
        if (gt) {
          if (a === void 0) throw Error(u(407));
          a = a();
        } else {
          if (((a = e()), Bt === null)) throw Error(u(349));
          (ht & 127) !== 0 || vd(n, e, a);
        }
        i.memoizedState = a;
        var o = { value: a, getSnapshot: e };
        return (
          (i.queue = o),
          Bd(bd.bind(null, n, o, t), [t]),
          (n.flags |= 2048),
          kl(9, { destroy: void 0 }, _d.bind(null, n, o, a, e), null),
          a
        );
      },
      useId: function () {
        var t = Te(),
          e = Bt.identifierPrefix;
        if (gt) {
          var a = Sa,
            n = ba;
          ((a = (n & ~(1 << (32 - re(n) - 1))).toString(32) + a),
            (e = '_' + e + 'R_' + a),
            (a = Ic++),
            0 < a && (e += 'H' + a.toString(32)),
            (e += '_'));
        } else ((a = Rp++), (e = '_' + e + 'r_' + a.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: ou,
      useFormState: wd,
      useActionState: wd,
      useOptimistic: function (t) {
        var e = Te();
        e.memoizedState = e.baseState = t;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = a), (e = uu.bind(null, st, !0, a)), (a.dispatch = e), [t, e]);
      },
      useMemoCache: Po,
      useCacheRefresh: function () {
        return (Te().memoizedState = Hp.bind(null, st));
      },
      useEffectEvent: function (t) {
        var e = Te(),
          a = { impl: t };
        return (
          (e.memoizedState = a),
          function () {
            if ((Et & 2) !== 0) throw Error(u(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ru = {
      readContext: ve,
      use: ts,
      useCallback: qd,
      useContext: ve,
      useEffect: lu,
      useImperativeHandle: Ud,
      useInsertionEffect: Ld,
      useLayoutEffect: $d,
      useMemo: kd,
      useReducer: es,
      useRef: Od,
      useState: function () {
        return es(Ha);
      },
      useDebugValue: iu,
      useDeferredValue: function (t, e) {
        var a = te();
        return Vd(a, Ct.memoizedState, t, e);
      },
      useTransition: function () {
        var t = es(Ha)[0],
          e = te().memoizedState;
        return [typeof t == 'boolean' ? t : $i(t), e];
      },
      useSyncExternalStore: gd,
      useId: Xd,
      useHostTransitionStatus: ou,
      useFormState: zd,
      useActionState: zd,
      useOptimistic: function (t, e) {
        var a = te();
        return jd(a, Ct, t, e);
      },
      useMemoCache: Po,
      useCacheRefresh: Qd,
    };
  ru.useEffectEvent = Dd;
  var Id = {
    readContext: ve,
    use: ts,
    useCallback: qd,
    useContext: ve,
    useEffect: lu,
    useImperativeHandle: Ud,
    useInsertionEffect: Ld,
    useLayoutEffect: $d,
    useMemo: kd,
    useReducer: eu,
    useRef: Od,
    useState: function () {
      return eu(Ha);
    },
    useDebugValue: iu,
    useDeferredValue: function (t, e) {
      var a = te();
      return Ct === null ? cu(a, t, e) : Vd(a, Ct.memoizedState, t, e);
    },
    useTransition: function () {
      var t = eu(Ha)[0],
        e = te().memoizedState;
      return [typeof t == 'boolean' ? t : $i(t), e];
    },
    useSyncExternalStore: gd,
    useId: Xd,
    useHostTransitionStatus: ou,
    useFormState: Rd,
    useActionState: Rd,
    useOptimistic: function (t, e) {
      var a = te();
      return Ct !== null ? jd(a, Ct, t, e) : ((a.baseState = t), [t, a.queue.dispatch]);
    },
    useMemoCache: Po,
    useCacheRefresh: Qd,
  };
  Id.useEffectEvent = Dd;
  function fu(t, e, a, n) {
    ((e = t.memoizedState),
      (a = a(n, e)),
      (a = a == null ? e : S({}, e, a)),
      (t.memoizedState = a),
      t.lanes === 0 && (t.updateQueue.baseState = a));
  }
  var du = {
    enqueueSetState: function (t, e, a) {
      t = t._reactInternals;
      var n = Ve(),
        i = cn(n);
      ((i.payload = e),
        a != null && (i.callback = a),
        (e = sn(t, i, n)),
        e !== null && (Be(e, t, n), Oi(e, t, n)));
    },
    enqueueReplaceState: function (t, e, a) {
      t = t._reactInternals;
      var n = Ve(),
        i = cn(n);
      ((i.tag = 1),
        (i.payload = e),
        a != null && (i.callback = a),
        (e = sn(t, i, n)),
        e !== null && (Be(e, t, n), Oi(e, t, n)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var a = Ve(),
        n = cn(a);
      ((n.tag = 2),
        e != null && (n.callback = e),
        (e = sn(t, n, a)),
        e !== null && (Be(e, t, a), Oi(e, t, a)));
    },
  };
  function Pd(t, e, a, n, i, o, m) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(n, o, m)
        : e.prototype && e.prototype.isPureReactComponent
          ? !Ti(a, n) || !Ti(i, o)
          : !0
    );
  }
  function t0(t, e, a, n) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(a, n),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(a, n),
      e.state !== t && du.enqueueReplaceState(e, e.state, null));
  }
  function In(t, e) {
    var a = e;
    if ('ref' in e) {
      a = {};
      for (var n in e) n !== 'ref' && (a[n] = e[n]);
    }
    if ((t = t.defaultProps)) {
      a === e && (a = S({}, a));
      for (var i in t) a[i] === void 0 && (a[i] = t[i]);
    }
    return a;
  }
  function e0(t) {
    Lc(t);
  }
  function a0(t) {
    console.error(t);
  }
  function n0(t) {
    Lc(t);
  }
  function is(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function l0(t, e, a) {
    try {
      var n = t.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function mu(t, e, a) {
    return (
      (a = cn(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        is(t, e);
      }),
      a
    );
  }
  function i0(t) {
    return ((t = cn(t)), (t.tag = 3), t);
  }
  function c0(t, e, a, n) {
    var i = a.type.getDerivedStateFromError;
    if (typeof i == 'function') {
      var o = n.value;
      ((t.payload = function () {
        return i(o);
      }),
        (t.callback = function () {
          l0(e, a, n);
        }));
    }
    var m = a.stateNode;
    m !== null &&
      typeof m.componentDidCatch == 'function' &&
      (t.callback = function () {
        (l0(e, a, n),
          typeof i != 'function' && (mn === null ? (mn = new Set([this])) : mn.add(this)));
        var v = n.stack;
        this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' });
      });
  }
  function qp(t, e, a, n, i) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((e = a.alternate), e !== null && Ol(e, a, i, !0), (a = He.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Pe === null ? gs() : a.alternate === null && Jt === 0 && (Jt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = i),
              n === Xc
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null ? (a.updateQueue = new Set([n])) : e.add(n),
                  Hu(t, n, i)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === Xc
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = e))
                    : ((a = e.retryQueue), a === null ? (e.retryQueue = new Set([n])) : a.add(n)),
                  Hu(t, n, i)),
              !1
            );
        }
        throw Error(u(435, a.tag));
      }
      return (Hu(t, n, i), gs(), !1);
    }
    if (gt)
      return (
        (e = He.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = i),
            n !== Ro && ((t = Error(u(422), { cause: n })), Ni(We(t, a))))
          : (n !== Ro && ((e = Error(u(423), { cause: n })), Ni(We(e, a))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (i &= -i),
            (t.lanes |= i),
            (n = We(n, a)),
            (i = mu(t.stateNode, n, i)),
            Go(t, i),
            Jt !== 4 && (Jt = 2)),
        !1
      );
    var o = Error(u(520), { cause: n });
    if (((o = We(o, a)), Qi === null ? (Qi = [o]) : Qi.push(o), Jt !== 4 && (Jt = 2), e === null))
      return !0;
    ((n = We(n, a)), (a = e));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (t = i & -i),
            (a.lanes |= t),
            (t = mu(a.stateNode, n, t)),
            Go(a, t),
            !1
          );
        case 1:
          if (
            ((e = a.type),
            (o = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == 'function' ||
                (o !== null &&
                  typeof o.componentDidCatch == 'function' &&
                  (mn === null || !mn.has(o)))))
          )
            return (
              (a.flags |= 65536),
              (i &= -i),
              (a.lanes |= i),
              (i = i0(i)),
              c0(i, t, a, n),
              Go(a, i),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var hu = Error(u(461)),
    se = !1;
  function _e(t, e, a, n) {
    e.child = t === null ? rd(e, null, a, n) : Jn(e, t.child, a, n);
  }
  function s0(t, e, a, n, i) {
    a = a.render;
    var o = e.ref;
    if ('ref' in n) {
      var m = {};
      for (var v in n) v !== 'ref' && (m[v] = n[v]);
    } else m = n;
    return (
      Xn(e),
      (n = Wo(t, e, a, m, o, i)),
      (v = Jo()),
      t !== null && !se
        ? (Fo(t, e, i), Ua(t, e, i))
        : (gt && v && zo(e), (e.flags |= 1), _e(t, e, n, i), e.child)
    );
  }
  function o0(t, e, a, n, i) {
    if (t === null) {
      var o = a.type;
      return typeof o == 'function' && !Mo(o) && o.defaultProps === void 0 && a.compare === null
        ? ((e.tag = 15), (e.type = o), u0(t, e, o, n, i))
        : ((t = qc(a.type, null, n, e, e.mode, i)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((o = t.child), !xu(t, i))) {
      var m = o.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Ti), a(m, n) && t.ref === e.ref))
        return Ua(t, e, i);
    }
    return ((e.flags |= 1), (t = Oa(o, n)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function u0(t, e, a, n, i) {
    if (t !== null) {
      var o = t.memoizedProps;
      if (Ti(o, n) && t.ref === e.ref)
        if (((se = !1), (e.pendingProps = n = o), xu(t, i))) (t.flags & 131072) !== 0 && (se = !0);
        else return ((e.lanes = t.lanes), Ua(t, e, i));
    }
    return pu(t, e, a, n, i);
  }
  function r0(t, e, a, n) {
    var i = n.children,
      o = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      n.mode === 'hidden')
    ) {
      if ((e.flags & 128) !== 0) {
        if (((o = o !== null ? o.baseLanes | a : a), t !== null)) {
          for (n = e.child = t.child, i = 0; n !== null; )
            ((i = i | n.lanes | n.childLanes), (n = n.sibling));
          n = i & ~o;
        } else ((n = 0), (e.child = null));
        return f0(t, e, o, a, n);
      }
      if ((a & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Zc(e, o !== null ? o.cachePool : null),
          o !== null ? md(e, o) : Yo(),
          hd(e));
      else return ((n = e.lanes = 536870912), f0(t, e, o !== null ? o.baseLanes | a : a, a, n));
    } else
      o !== null
        ? (Zc(e, o.cachePool), md(e, o), un(), (e.memoizedState = null))
        : (t !== null && Zc(e, null), Yo(), un());
    return (_e(t, e, i, a), e.child);
  }
  function qi(t, e) {
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
  function f0(t, e, a, n, i) {
    var o = Uo();
    return (
      (o = o === null ? null : { parent: ie._currentValue, pool: o }),
      (e.memoizedState = { baseLanes: a, cachePool: o }),
      t !== null && Zc(e, null),
      Yo(),
      hd(e),
      t !== null && Ol(t, e, n, !0),
      (e.childLanes = i),
      null
    );
  }
  function cs(t, e) {
    return (
      (e = os({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function d0(t, e, a) {
    return (
      Jn(e, t.child, null, a),
      (t = cs(e, e.pendingProps)),
      (t.flags |= 2),
      Ue(e),
      (e.memoizedState = null),
      t
    );
  }
  function kp(t, e, a) {
    var n = e.pendingProps,
      i = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (gt) {
        if (n.mode === 'hidden') return ((t = cs(e, n)), (e.lanes = 536870912), qi(null, t));
        if (
          (Qo(e),
          (t = Vt)
            ? ((t = Am(t, Ie)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: tn !== null ? { id: ba, overflow: Sa } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Wf(t)),
                (a.return = e),
                (e.child = a),
                (ge = e),
                (Vt = null)))
            : (t = null),
          t === null)
        )
          throw an(e);
        return ((e.lanes = 536870912), null);
      }
      return cs(e, n);
    }
    var o = t.memoizedState;
    if (o !== null) {
      var m = o.dehydrated;
      if ((Qo(e), i))
        if (e.flags & 256) ((e.flags &= -257), (e = d0(t, e, a)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(u(558));
      else if ((se || Ol(t, e, a, !1), (i = (a & t.childLanes) !== 0), se || i)) {
        if (((n = Bt), n !== null && ((m = ef(n, a)), m !== 0 && m !== o.retryLane)))
          throw ((o.retryLane = m), Vn(t, m), Be(n, t, m), hu);
        (gs(), (e = d0(t, e, a)));
      } else
        ((t = o.treeContext),
          (Vt = ta(m.nextSibling)),
          (ge = e),
          (gt = !0),
          (en = null),
          (Ie = !1),
          t !== null && If(e, t),
          (e = cs(e, n)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = Oa(t.child, { mode: n.mode, children: n.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function ss(t, e) {
    var a = e.ref;
    if (a === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(u(284));
      (t === null || t.ref !== a) && (e.flags |= 4194816);
    }
  }
  function pu(t, e, a, n, i) {
    return (
      Xn(e),
      (a = Wo(t, e, a, n, void 0, i)),
      (n = Jo()),
      t !== null && !se
        ? (Fo(t, e, i), Ua(t, e, i))
        : (gt && n && zo(e), (e.flags |= 1), _e(t, e, a, i), e.child)
    );
  }
  function m0(t, e, a, n, i, o) {
    return (
      Xn(e),
      (e.updateQueue = null),
      (a = yd(e, n, a, i)),
      pd(t),
      (n = Jo()),
      t !== null && !se
        ? (Fo(t, e, o), Ua(t, e, o))
        : (gt && n && zo(e), (e.flags |= 1), _e(t, e, a, o), e.child)
    );
  }
  function h0(t, e, a, n, i) {
    if ((Xn(e), e.stateNode === null)) {
      var o = wl,
        m = a.contextType;
      (typeof m == 'object' && m !== null && (o = ve(m)),
        (o = new a(n, o)),
        (e.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null),
        (o.updater = du),
        (e.stateNode = o),
        (o._reactInternals = e),
        (o = e.stateNode),
        (o.props = n),
        (o.state = e.memoizedState),
        (o.refs = {}),
        ko(e),
        (m = a.contextType),
        (o.context = typeof m == 'object' && m !== null ? ve(m) : wl),
        (o.state = e.memoizedState),
        (m = a.getDerivedStateFromProps),
        typeof m == 'function' && (fu(e, a, m, n), (o.state = e.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof o.getSnapshotBeforeUpdate == 'function' ||
          (typeof o.UNSAFE_componentWillMount != 'function' &&
            typeof o.componentWillMount != 'function') ||
          ((m = o.state),
          typeof o.componentWillMount == 'function' && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == 'function' && o.UNSAFE_componentWillMount(),
          m !== o.state && du.enqueueReplaceState(o, o.state, null),
          Di(e, n, o, i),
          Bi(),
          (o.state = e.memoizedState)),
        typeof o.componentDidMount == 'function' && (e.flags |= 4194308),
        (n = !0));
    } else if (t === null) {
      o = e.stateNode;
      var v = e.memoizedProps,
        b = In(a, v);
      o.props = b;
      var N = o.context,
        D = a.contextType;
      ((m = wl), typeof D == 'object' && D !== null && (m = ve(D)));
      var U = a.getDerivedStateFromProps;
      ((D = typeof U == 'function' || typeof o.getSnapshotBeforeUpdate == 'function'),
        (v = e.pendingProps !== v),
        D ||
          (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof o.componentWillReceiveProps != 'function') ||
          ((v || N !== m) && t0(e, o, n, m)),
        (ln = !1));
      var w = e.memoizedState;
      ((o.state = w),
        Di(e, n, o, i),
        Bi(),
        (N = e.memoizedState),
        v || w !== N || ln
          ? (typeof U == 'function' && (fu(e, a, U, n), (N = e.memoizedState)),
            (b = ln || Pd(e, a, b, n, w, N, m))
              ? (D ||
                  (typeof o.UNSAFE_componentWillMount != 'function' &&
                    typeof o.componentWillMount != 'function') ||
                  (typeof o.componentWillMount == 'function' && o.componentWillMount(),
                  typeof o.UNSAFE_componentWillMount == 'function' &&
                    o.UNSAFE_componentWillMount()),
                typeof o.componentDidMount == 'function' && (e.flags |= 4194308))
              : (typeof o.componentDidMount == 'function' && (e.flags |= 4194308),
                (e.memoizedProps = n),
                (e.memoizedState = N)),
            (o.props = n),
            (o.state = N),
            (o.context = m),
            (n = b))
          : (typeof o.componentDidMount == 'function' && (e.flags |= 4194308), (n = !1)));
    } else {
      ((o = e.stateNode),
        Vo(t, e),
        (m = e.memoizedProps),
        (D = In(a, m)),
        (o.props = D),
        (U = e.pendingProps),
        (w = o.context),
        (N = a.contextType),
        (b = wl),
        typeof N == 'object' && N !== null && (b = ve(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof o.getSnapshotBeforeUpdate == 'function') ||
          (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof o.componentWillReceiveProps != 'function') ||
          ((m !== U || w !== b) && t0(e, o, n, b)),
        (ln = !1),
        (w = e.memoizedState),
        (o.state = w),
        Di(e, n, o, i),
        Bi());
      var R = e.memoizedState;
      m !== U || w !== R || ln || (t !== null && t.dependencies !== null && Vc(t.dependencies))
        ? (typeof v == 'function' && (fu(e, a, v, n), (R = e.memoizedState)),
          (D =
            ln ||
            Pd(e, a, D, n, w, R, b) ||
            (t !== null && t.dependencies !== null && Vc(t.dependencies)))
            ? (N ||
                (typeof o.UNSAFE_componentWillUpdate != 'function' &&
                  typeof o.componentWillUpdate != 'function') ||
                (typeof o.componentWillUpdate == 'function' && o.componentWillUpdate(n, R, b),
                typeof o.UNSAFE_componentWillUpdate == 'function' &&
                  o.UNSAFE_componentWillUpdate(n, R, b)),
              typeof o.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof o.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
            : (typeof o.componentDidUpdate != 'function' ||
                (m === t.memoizedProps && w === t.memoizedState) ||
                (e.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != 'function' ||
                (m === t.memoizedProps && w === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = n),
              (e.memoizedState = R)),
          (o.props = n),
          (o.state = R),
          (o.context = b),
          (n = D))
        : (typeof o.componentDidUpdate != 'function' ||
            (m === t.memoizedProps && w === t.memoizedState) ||
            (e.flags |= 4),
          typeof o.getSnapshotBeforeUpdate != 'function' ||
            (m === t.memoizedProps && w === t.memoizedState) ||
            (e.flags |= 1024),
          (n = !1));
    }
    return (
      (o = n),
      ss(t, e),
      (n = (e.flags & 128) !== 0),
      o || n
        ? ((o = e.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : o.render()),
          (e.flags |= 1),
          t !== null && n
            ? ((e.child = Jn(e, t.child, null, i)), (e.child = Jn(e, null, a, i)))
            : _e(t, e, a, i),
          (e.memoizedState = o.state),
          (t = e.child))
        : (t = Ua(t, e, i)),
      t
    );
  }
  function p0(t, e, a, n) {
    return (Zn(), (e.flags |= 256), _e(t, e, a, n), e.child);
  }
  var yu = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function gu(t) {
    return { baseLanes: t, cachePool: ld() };
  }
  function vu(t, e, a) {
    return ((t = t !== null ? t.childLanes & ~a : 0), e && (t |= ke), t);
  }
  function y0(t, e, a) {
    var n = e.pendingProps,
      i = !1,
      o = (e.flags & 128) !== 0,
      m;
    if (
      ((m = o) || (m = t !== null && t.memoizedState === null ? !1 : (Pt.current & 2) !== 0),
      m && ((i = !0), (e.flags &= -129)),
      (m = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (gt) {
        if (
          (i ? on(e) : un(),
          (t = Vt)
            ? ((t = Am(t, Ie)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: tn !== null ? { id: ba, overflow: Sa } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Wf(t)),
                (a.return = e),
                (e.child = a),
                (ge = e),
                (Vt = null)))
            : (t = null),
          t === null)
        )
          throw an(e);
        return (tr(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var v = n.children;
      return (
        (n = n.fallback),
        i
          ? (un(),
            (i = e.mode),
            (v = os({ mode: 'hidden', children: v }, i)),
            (n = Gn(n, i, a, null)),
            (v.return = e),
            (n.return = e),
            (v.sibling = n),
            (e.child = v),
            (n = e.child),
            (n.memoizedState = gu(a)),
            (n.childLanes = vu(t, m, a)),
            (e.memoizedState = yu),
            qi(null, n))
          : (on(e), _u(e, v))
      );
    }
    var b = t.memoizedState;
    if (b !== null && ((v = b.dehydrated), v !== null)) {
      if (o)
        e.flags & 256
          ? (on(e), (e.flags &= -257), (e = bu(t, e, a)))
          : e.memoizedState !== null
            ? (un(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (un(),
              (v = n.fallback),
              (i = e.mode),
              (n = os({ mode: 'visible', children: n.children }, i)),
              (v = Gn(v, i, a, null)),
              (v.flags |= 2),
              (n.return = e),
              (v.return = e),
              (n.sibling = v),
              (e.child = n),
              Jn(e, t.child, null, a),
              (n = e.child),
              (n.memoizedState = gu(a)),
              (n.childLanes = vu(t, m, a)),
              (e.memoizedState = yu),
              (e = qi(null, n)));
      else if ((on(e), tr(v))) {
        if (((m = v.nextSibling && v.nextSibling.dataset), m)) var N = m.dgst;
        ((m = N),
          (n = Error(u(419))),
          (n.stack = ''),
          (n.digest = m),
          Ni({ value: n, source: null, stack: null }),
          (e = bu(t, e, a)));
      } else if ((se || Ol(t, e, a, !1), (m = (a & t.childLanes) !== 0), se || m)) {
        if (((m = Bt), m !== null && ((n = ef(m, a)), n !== 0 && n !== b.retryLane)))
          throw ((b.retryLane = n), Vn(t, n), Be(m, t, n), hu);
        (Pu(v) || gs(), (e = bu(t, e, a)));
      } else
        Pu(v)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = b.treeContext),
            (Vt = ta(v.nextSibling)),
            (ge = e),
            (gt = !0),
            (en = null),
            (Ie = !1),
            t !== null && If(e, t),
            (e = _u(e, n.children)),
            (e.flags |= 4096));
      return e;
    }
    return i
      ? (un(),
        (v = n.fallback),
        (i = e.mode),
        (b = t.child),
        (N = b.sibling),
        (n = Oa(b, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = b.subtreeFlags & 65011712),
        N !== null ? (v = Oa(N, v)) : ((v = Gn(v, i, a, null)), (v.flags |= 2)),
        (v.return = e),
        (n.return = e),
        (n.sibling = v),
        (e.child = n),
        qi(null, n),
        (n = e.child),
        (v = t.child.memoizedState),
        v === null
          ? (v = gu(a))
          : ((i = v.cachePool),
            i !== null
              ? ((b = ie._currentValue), (i = i.parent !== b ? { parent: b, pool: b } : i))
              : (i = ld()),
            (v = { baseLanes: v.baseLanes | a, cachePool: i })),
        (n.memoizedState = v),
        (n.childLanes = vu(t, m, a)),
        (e.memoizedState = yu),
        qi(t.child, n))
      : (on(e),
        (a = t.child),
        (t = a.sibling),
        (a = Oa(a, { mode: 'visible', children: n.children })),
        (a.return = e),
        (a.sibling = null),
        t !== null &&
          ((m = e.deletions), m === null ? ((e.deletions = [t]), (e.flags |= 16)) : m.push(t)),
        (e.child = a),
        (e.memoizedState = null),
        a);
  }
  function _u(t, e) {
    return ((e = os({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function os(t, e) {
    return ((t = $e(22, t, null, e)), (t.lanes = 0), t);
  }
  function bu(t, e, a) {
    return (
      Jn(e, t.child, null, a),
      (t = _u(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function g0(t, e, a) {
    t.lanes |= e;
    var n = t.alternate;
    (n !== null && (n.lanes |= e), Do(t.return, e, a));
  }
  function Su(t, e, a, n, i, o) {
    var m = t.memoizedState;
    m === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: i,
          treeForkCount: o,
        })
      : ((m.isBackwards = e),
        (m.rendering = null),
        (m.renderingStartTime = 0),
        (m.last = n),
        (m.tail = a),
        (m.tailMode = i),
        (m.treeForkCount = o));
  }
  function v0(t, e, a) {
    var n = e.pendingProps,
      i = n.revealOrder,
      o = n.tail;
    n = n.children;
    var m = Pt.current,
      v = (m & 2) !== 0;
    if (
      (v ? ((m = (m & 1) | 2), (e.flags |= 128)) : (m &= 1),
      k(Pt, m),
      _e(t, e, n, a),
      (n = gt ? Mi : 0),
      !v && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && g0(t, a, e);
        else if (t.tag === 19) g0(t, a, e);
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
    switch (i) {
      case 'forwards':
        for (a = e.child, i = null; a !== null; )
          ((t = a.alternate), t !== null && Jc(t) === null && (i = a), (a = a.sibling));
        ((a = i),
          a === null ? ((i = e.child), (e.child = null)) : ((i = a.sibling), (a.sibling = null)),
          Su(e, !1, i, a, o, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, i = e.child, e.child = null; i !== null; ) {
          if (((t = i.alternate), t !== null && Jc(t) === null)) {
            e.child = i;
            break;
          }
          ((t = i.sibling), (i.sibling = a), (a = i), (i = t));
        }
        Su(e, !0, a, null, o, n);
        break;
      case 'together':
        Su(e, !1, null, null, void 0, n);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Ua(t, e, a) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (dn |= e.lanes), (a & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Ol(t, e, a, !1), (a & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(u(153));
    if (e.child !== null) {
      for (t = e.child, a = Oa(t, t.pendingProps), e.child = a, a.return = e; t.sibling !== null; )
        ((t = t.sibling), (a = a.sibling = Oa(t, t.pendingProps)), (a.return = e));
      a.sibling = null;
    }
    return e.child;
  }
  function xu(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Vc(t)));
  }
  function Vp(t, e, a) {
    switch (e.tag) {
      case 3:
        ($t(e, e.stateNode.containerInfo), nn(e, ie, t.memoizedState.cache), Zn());
        break;
      case 27:
      case 5:
        De(e);
        break;
      case 4:
        $t(e, e.stateNode.containerInfo);
        break;
      case 10:
        nn(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), Qo(e), null);
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (on(e), (e.flags |= 128), null)
            : (a & e.child.childLanes) !== 0
              ? y0(t, e, a)
              : (on(e), (t = Ua(t, e, a)), t !== null ? t.sibling : null);
        on(e);
        break;
      case 19:
        var i = (t.flags & 128) !== 0;
        if (
          ((n = (a & e.childLanes) !== 0),
          n || (Ol(t, e, a, !1), (n = (a & e.childLanes) !== 0)),
          i)
        ) {
          if (n) return v0(t, e, a);
          e.flags |= 128;
        }
        if (
          ((i = e.memoizedState),
          i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          k(Pt, Pt.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), r0(t, e, a, e.pendingProps));
      case 24:
        nn(e, ie, t.memoizedState.cache);
    }
    return Ua(t, e, a);
  }
  function _0(t, e, a) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) se = !0;
      else {
        if (!xu(t, a) && (e.flags & 128) === 0) return ((se = !1), Vp(t, e, a));
        se = (t.flags & 131072) !== 0;
      }
    else ((se = !1), gt && (e.flags & 1048576) !== 0 && Ff(e, Mi, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (((t = Kn(e.elementType)), (e.type = t), typeof t == 'function'))
            Mo(t)
              ? ((n = In(t, n)), (e.tag = 1), (e = h0(null, e, t, n, a)))
              : ((e.tag = 0), (e = pu(null, e, t, n, a)));
          else {
            if (t != null) {
              var i = t.$$typeof;
              if (i === Lt) {
                ((e.tag = 11), (e = s0(null, e, t, n, a)));
                break t;
              } else if (i === it) {
                ((e.tag = 14), (e = o0(null, e, t, n, a)));
                break t;
              }
            }
            throw ((e = ee(t) || t), Error(u(306, e, '')));
          }
        }
        return e;
      case 0:
        return pu(t, e, e.type, e.pendingProps, a);
      case 1:
        return ((n = e.type), (i = In(n, e.pendingProps)), h0(t, e, n, i, a));
      case 3:
        t: {
          if (($t(e, e.stateNode.containerInfo), t === null)) throw Error(u(387));
          n = e.pendingProps;
          var o = e.memoizedState;
          ((i = o.element), Vo(t, e), Di(e, n, null, a));
          var m = e.memoizedState;
          if (
            ((n = m.cache),
            nn(e, ie, n),
            n !== o.cache && Lo(e, [ie], a, !0),
            Bi(),
            (n = m.element),
            o.isDehydrated)
          )
            if (
              ((o = { element: n, isDehydrated: !1, cache: m.cache }),
              (e.updateQueue.baseState = o),
              (e.memoizedState = o),
              e.flags & 256)
            ) {
              e = p0(t, e, n, a);
              break t;
            } else if (n !== i) {
              ((i = We(Error(u(424)), e)), Ni(i), (e = p0(t, e, n, a)));
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
                Vt = ta(t.firstChild),
                  ge = e,
                  gt = !0,
                  en = null,
                  Ie = !0,
                  a = rd(e, null, n, a),
                  e.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((Zn(), n === i)) {
              e = Ua(t, e, a);
              break t;
            }
            _e(t, e, n, a);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          ss(t, e),
          t === null
            ? (a = zm(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = a)
              : gt ||
                ((a = e.type),
                (t = e.pendingProps),
                (n = As(X.current).createElement(a)),
                (n[ye] = e),
                (n[Ne] = t),
                be(n, a, t),
                me(n),
                (e.stateNode = n))
            : (e.memoizedState = zm(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          De(e),
          t === null &&
            gt &&
            ((n = e.stateNode = Mm(e.type, e.pendingProps, X.current)),
            (ge = e),
            (Ie = !0),
            (i = Vt),
            gn(e.type) ? ((er = i), (Vt = ta(n.firstChild))) : (Vt = i)),
          _e(t, e, e.pendingProps.children, a),
          ss(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            gt &&
            ((i = n = Vt) &&
              ((n = vy(n, e.type, e.pendingProps, Ie)),
              n !== null
                ? ((e.stateNode = n), (ge = e), (Vt = ta(n.firstChild)), (Ie = !1), (i = !0))
                : (i = !1)),
            i || an(e)),
          De(e),
          (i = e.type),
          (o = e.pendingProps),
          (m = t !== null ? t.memoizedProps : null),
          (n = o.children),
          Ju(i, o) ? (n = null) : m !== null && Ju(i, m) && (e.flags |= 32),
          e.memoizedState !== null && ((i = Wo(t, e, Op, null, null, a)), (ec._currentValue = i)),
          ss(t, e),
          _e(t, e, n, a),
          e.child
        );
      case 6:
        return (
          t === null &&
            gt &&
            ((t = a = Vt) &&
              ((a = _y(a, e.pendingProps, Ie)),
              a !== null ? ((e.stateNode = a), (ge = e), (Vt = null), (t = !0)) : (t = !1)),
            t || an(e)),
          null
        );
      case 13:
        return y0(t, e, a);
      case 4:
        return (
          $t(e, e.stateNode.containerInfo),
          (n = e.pendingProps),
          t === null ? (e.child = Jn(e, null, n, a)) : _e(t, e, n, a),
          e.child
        );
      case 11:
        return s0(t, e, e.type, e.pendingProps, a);
      case 7:
        return (_e(t, e, e.pendingProps, a), e.child);
      case 8:
        return (_e(t, e, e.pendingProps.children, a), e.child);
      case 12:
        return (_e(t, e, e.pendingProps.children, a), e.child);
      case 10:
        return ((n = e.pendingProps), nn(e, e.type, n.value), _e(t, e, n.children, a), e.child);
      case 9:
        return (
          (i = e.type._context),
          (n = e.pendingProps.children),
          Xn(e),
          (i = ve(i)),
          (n = n(i)),
          (e.flags |= 1),
          _e(t, e, n, a),
          e.child
        );
      case 14:
        return o0(t, e, e.type, e.pendingProps, a);
      case 15:
        return u0(t, e, e.type, e.pendingProps, a);
      case 19:
        return v0(t, e, a);
      case 31:
        return kp(t, e, a);
      case 22:
        return r0(t, e, a, e.pendingProps);
      case 24:
        return (
          Xn(e),
          (n = ve(ie)),
          t === null
            ? ((i = Uo()),
              i === null &&
                ((i = Bt),
                (o = $o()),
                (i.pooledCache = o),
                o.refCount++,
                o !== null && (i.pooledCacheLanes |= a),
                (i = o)),
              (e.memoizedState = { parent: n, cache: i }),
              ko(e),
              nn(e, ie, i))
            : ((t.lanes & a) !== 0 && (Vo(t, e), Di(e, null, null, a), Bi()),
              (i = t.memoizedState),
              (o = e.memoizedState),
              i.parent !== n
                ? ((i = { parent: n, cache: n }),
                  (e.memoizedState = i),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = i),
                  nn(e, ie, n))
                : ((n = o.cache), nn(e, ie, n), n !== i.cache && Lo(e, [ie], a, !0))),
          _e(t, e, e.pendingProps.children, a),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(u(156, e.tag));
  }
  function qa(t) {
    t.flags |= 4;
  }
  function ju(t, e, a, n, i) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (i & 335544128) === i))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (X0()) t.flags |= 8192;
        else throw ((Wn = Xc), qo);
    } else t.flags &= -16777217;
  }
  function b0(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !Dm(e)))
      if (X0()) t.flags |= 8192;
      else throw ((Wn = Xc), qo);
  }
  function us(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? le() : 536870912), (t.lanes |= e), (Yl |= e)));
  }
  function ki(t, e) {
    if (!gt)
      switch (t.tailMode) {
        case 'hidden':
          e = t.tail;
          for (var a = null; e !== null; ) (e.alternate !== null && (a = e), (e = e.sibling));
          a === null ? (t.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = t.tail;
          for (var n = null; a !== null; ) (a.alternate !== null && (n = a), (a = a.sibling));
          n === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (n.sibling = null);
      }
  }
  function Gt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      a = 0,
      n = 0;
    if (e)
      for (var i = t.child; i !== null; )
        ((a |= i.lanes | i.childLanes),
          (n |= i.subtreeFlags & 65011712),
          (n |= i.flags & 65011712),
          (i.return = t),
          (i = i.sibling));
    else
      for (i = t.child; i !== null; )
        ((a |= i.lanes | i.childLanes),
          (n |= i.subtreeFlags),
          (n |= i.flags),
          (i.return = t),
          (i = i.sibling));
    return ((t.subtreeFlags |= n), (t.childLanes = a), e);
  }
  function Gp(t, e, a) {
    var n = e.pendingProps;
    switch ((Co(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Gt(e), null);
      case 1:
        return (Gt(e), null);
      case 3:
        return (
          (a = e.stateNode),
          (n = null),
          t !== null && (n = t.memoizedState.cache),
          e.memoizedState.cache !== n && (e.flags |= 2048),
          La(ie),
          _t(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (Rl(e)
              ? qa(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Oo())),
          Gt(e),
          null
        );
      case 26:
        var i = e.type,
          o = e.memoizedState;
        return (
          t === null
            ? (qa(e), o !== null ? (Gt(e), b0(e, o)) : (Gt(e), ju(e, i, null, n, a)))
            : o
              ? o !== t.memoizedState
                ? (qa(e), Gt(e), b0(e, o))
                : (Gt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== n && qa(e), Gt(e), ju(e, i, t, n, a)),
          null
        );
      case 27:
        if ((ya(e), (a = X.current), (i = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && qa(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(u(166));
            return (Gt(e), null);
          }
          ((t = Y.current), Rl(e) ? Pf(e) : ((t = Mm(i, n, a)), (e.stateNode = t), qa(e)));
        }
        return (Gt(e), null);
      case 5:
        if ((ya(e), (i = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && qa(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(u(166));
            return (Gt(e), null);
          }
          if (((o = Y.current), Rl(e))) Pf(e);
          else {
            var m = As(X.current);
            switch (o) {
              case 1:
                o = m.createElementNS('http://www.w3.org/2000/svg', i);
                break;
              case 2:
                o = m.createElementNS('http://www.w3.org/1998/Math/MathML', i);
                break;
              default:
                switch (i) {
                  case 'svg':
                    o = m.createElementNS('http://www.w3.org/2000/svg', i);
                    break;
                  case 'math':
                    o = m.createElementNS('http://www.w3.org/1998/Math/MathML', i);
                    break;
                  case 'script':
                    ((o = m.createElement('div')),
                      (o.innerHTML = '<script><\/script>'),
                      (o = o.removeChild(o.firstChild)));
                    break;
                  case 'select':
                    ((o =
                      typeof n.is == 'string'
                        ? m.createElement('select', { is: n.is })
                        : m.createElement('select')),
                      n.multiple ? (o.multiple = !0) : n.size && (o.size = n.size));
                    break;
                  default:
                    o =
                      typeof n.is == 'string'
                        ? m.createElement(i, { is: n.is })
                        : m.createElement(i);
                }
            }
            ((o[ye] = e), (o[Ne] = n));
            t: for (m = e.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6) o.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                ((m.child.return = m), (m = m.child));
                continue;
              }
              if (m === e) break t;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === e) break t;
                m = m.return;
              }
              ((m.sibling.return = m.return), (m = m.sibling));
            }
            e.stateNode = o;
            t: switch ((be(o, i, n), i)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                n = !!n.autoFocus;
                break t;
              case 'img':
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && qa(e);
          }
        }
        return (Gt(e), ju(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, a), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== n && qa(e);
        else {
          if (typeof n != 'string' && e.stateNode === null) throw Error(u(166));
          if (((t = X.current), Rl(e))) {
            if (((t = e.stateNode), (a = e.memoizedProps), (n = null), (i = ge), i !== null))
              switch (i.tag) {
                case 27:
                case 5:
                  n = i.memoizedProps;
              }
            ((t[ye] = e),
              (t = !!(
                t.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                ym(t.nodeValue, a)
              )),
              t || an(e, !0));
          } else ((t = As(t).createTextNode(n)), (t[ye] = e), (e.stateNode = t));
        }
        return (Gt(e), null);
      case 31:
        if (((a = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((n = Rl(e)), a !== null)) {
            if (t === null) {
              if (!n) throw Error(u(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(u(557));
              t[ye] = e;
            } else (Zn(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (Gt(e), (t = !1));
          } else
            ((a = Oo()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a),
              (t = !0));
          if (!t) return e.flags & 256 ? (Ue(e), e) : (Ue(e), null);
          if ((e.flags & 128) !== 0) throw Error(u(558));
        }
        return (Gt(e), null);
      case 13:
        if (
          ((n = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((i = Rl(e)), n !== null && n.dehydrated !== null)) {
            if (t === null) {
              if (!i) throw Error(u(318));
              if (((i = e.memoizedState), (i = i !== null ? i.dehydrated : null), !i))
                throw Error(u(317));
              i[ye] = e;
            } else (Zn(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (Gt(e), (i = !1));
          } else
            ((i = Oo()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i),
              (i = !0));
          if (!i) return e.flags & 256 ? (Ue(e), e) : (Ue(e), null);
        }
        return (
          Ue(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = a), e)
            : ((a = n !== null),
              (t = t !== null && t.memoizedState !== null),
              a &&
                ((n = e.child),
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
              a !== t && a && (e.child.flags |= 8192),
              us(e, e.updateQueue),
              Gt(e),
              null)
        );
      case 4:
        return (_t(), t === null && Yu(e.stateNode.containerInfo), Gt(e), null);
      case 10:
        return (La(e.type), Gt(e), null);
      case 19:
        if ((H(Pt), (n = e.memoizedState), n === null)) return (Gt(e), null);
        if (((i = (e.flags & 128) !== 0), (o = n.rendering), o === null))
          if (i) ki(n, !1);
          else {
            if (Jt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((o = Jc(t)), o !== null)) {
                  for (
                    e.flags |= 128,
                      ki(n, !1),
                      t = o.updateQueue,
                      e.updateQueue = t,
                      us(e, t),
                      e.subtreeFlags = 0,
                      t = a,
                      a = e.child;
                    a !== null;
                  )
                    (Kf(a, t), (a = a.sibling));
                  return (k(Pt, (Pt.current & 1) | 2), gt && Ba(e, n.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            n.tail !== null &&
              de() > hs &&
              ((e.flags |= 128), (i = !0), ki(n, !1), (e.lanes = 4194304));
          }
        else {
          if (!i)
            if (((t = Jc(o)), t !== null)) {
              if (
                ((e.flags |= 128),
                (i = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                us(e, t),
                ki(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !o.alternate && !gt)
              )
                return (Gt(e), null);
            } else
              2 * de() - n.renderingStartTime > hs &&
                a !== 536870912 &&
                ((e.flags |= 128), (i = !0), ki(n, !1), (e.lanes = 4194304));
          n.isBackwards
            ? ((o.sibling = e.child), (e.child = o))
            : ((t = n.last), t !== null ? (t.sibling = o) : (e.child = o), (n.last = o));
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = de()),
            (t.sibling = null),
            (a = Pt.current),
            k(Pt, i ? (a & 1) | 2 : a & 1),
            gt && Ba(e, n.treeForkCount),
            t)
          : (Gt(e), null);
      case 22:
      case 23:
        return (
          Ue(e),
          Xo(),
          (n = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== n && (e.flags |= 8192)
            : n && (e.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Gt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Gt(e),
          (a = e.updateQueue),
          a !== null && us(e, a.retryQueue),
          (a = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          (n = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          n !== a && (e.flags |= 2048),
          t !== null && H(Qn),
          null
        );
      case 24:
        return (
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          La(ie),
          Gt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, e.tag));
  }
  function Zp(t, e) {
    switch ((Co(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          La(ie),
          _t(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (ya(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((Ue(e), e.alternate === null)) throw Error(u(340));
          Zn();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((Ue(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(u(340));
          Zn();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (H(Pt), null);
      case 4:
        return (_t(), null);
      case 10:
        return (La(e.type), null);
      case 22:
      case 23:
        return (
          Ue(e),
          Xo(),
          t !== null && H(Qn),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (La(ie), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function S0(t, e) {
    switch ((Co(e), e.tag)) {
      case 3:
        (La(ie), _t());
        break;
      case 26:
      case 27:
      case 5:
        ya(e);
        break;
      case 4:
        _t();
        break;
      case 31:
        e.memoizedState !== null && Ue(e);
        break;
      case 13:
        Ue(e);
        break;
      case 19:
        H(Pt);
        break;
      case 10:
        La(e.type);
        break;
      case 22:
      case 23:
        (Ue(e), Xo(), t !== null && H(Qn));
        break;
      case 24:
        La(ie);
    }
  }
  function Vi(t, e) {
    try {
      var a = e.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        a = i;
        do {
          if ((a.tag & t) === t) {
            n = void 0;
            var o = a.create,
              m = a.inst;
            ((n = o()), (m.destroy = n));
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (v) {
      wt(e, e.return, v);
    }
  }
  function rn(t, e, a) {
    try {
      var n = e.updateQueue,
        i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var o = i.next;
        n = o;
        do {
          if ((n.tag & t) === t) {
            var m = n.inst,
              v = m.destroy;
            if (v !== void 0) {
              ((m.destroy = void 0), (i = e));
              var b = a,
                N = v;
              try {
                N();
              } catch (D) {
                wt(i, b, D);
              }
            }
          }
          n = n.next;
        } while (n !== o);
      }
    } catch (D) {
      wt(e, e.return, D);
    }
  }
  function x0(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        dd(e, a);
      } catch (n) {
        wt(t, t.return, n);
      }
    }
  }
  function j0(t, e, a) {
    ((a.props = In(t.type, t.memoizedProps)), (a.state = t.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      wt(t, e, n);
    }
  }
  function Gi(t, e) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof a == 'function' ? (t.refCleanup = a(n)) : (a.current = n);
      }
    } catch (i) {
      wt(t, e, i);
    }
  }
  function xa(t, e) {
    var a = t.ref,
      n = t.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (i) {
          wt(t, e, i);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (i) {
          wt(t, e, i);
        }
      else a.current = null;
  }
  function A0(t) {
    var e = t.type,
      a = t.memoizedProps,
      n = t.stateNode;
    try {
      t: switch (e) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && n.focus();
          break t;
        case 'img':
          a.src ? (n.src = a.src) : a.srcSet && (n.srcset = a.srcSet);
      }
    } catch (i) {
      wt(t, t.return, i);
    }
  }
  function Au(t, e, a) {
    try {
      var n = t.stateNode;
      (dy(n, t.type, a, e), (n[Ne] = e));
    } catch (i) {
      wt(t, t.return, i);
    }
  }
  function T0(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && gn(t.type)) || t.tag === 4
    );
  }
  function Tu(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || T0(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && gn(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Eu(t, e, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
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
            a != null || e.onclick !== null || (e.onclick = Ca)));
    else if (
      n !== 4 &&
      (n === 27 && gn(t.type) && ((a = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (Eu(t, e, a), t = t.sibling; t !== null; ) (Eu(t, e, a), (t = t.sibling));
  }
  function rs(t, e, a) {
    var n = t.tag;
    if (n === 5 || n === 6) ((t = t.stateNode), e ? a.insertBefore(t, e) : a.appendChild(t));
    else if (n !== 4 && (n === 27 && gn(t.type) && (a = t.stateNode), (t = t.child), t !== null))
      for (rs(t, e, a), t = t.sibling; t !== null; ) (rs(t, e, a), (t = t.sibling));
  }
  function E0(t) {
    var e = t.stateNode,
      a = t.memoizedProps;
    try {
      for (var n = t.type, i = e.attributes; i.length; ) e.removeAttributeNode(i[0]);
      (be(e, n, a), (e[ye] = t), (e[Ne] = a));
    } catch (o) {
      wt(t, t.return, o);
    }
  }
  var ka = !1,
    oe = !1,
    Mu = !1,
    M0 = typeof WeakSet == 'function' ? WeakSet : Set,
    he = null;
  function Yp(t, e) {
    if (((t = t.containerInfo), (Ku = Cs), (t = Uf(t)), bo(t))) {
      if ('selectionStart' in t) var a = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          a = ((a = t.ownerDocument) && a.defaultView) || window;
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
              break t;
            }
            var m = 0,
              v = -1,
              b = -1,
              N = 0,
              D = 0,
              U = t,
              w = null;
            e: for (;;) {
              for (
                var R;
                U !== a || (i !== 0 && U.nodeType !== 3) || (v = m + i),
                  U !== o || (n !== 0 && U.nodeType !== 3) || (b = m + n),
                  U.nodeType === 3 && (m += U.nodeValue.length),
                  (R = U.firstChild) !== null;
              )
                ((w = U), (U = R));
              for (;;) {
                if (U === t) break e;
                if (
                  (w === a && ++N === i && (v = m),
                  w === o && ++D === n && (b = m),
                  (R = U.nextSibling) !== null)
                )
                  break;
                ((U = w), (w = U.parentNode));
              }
              U = R;
            }
            a = v === -1 || b === -1 ? null : { start: v, end: b };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Wu = { focusedElem: t, selectionRange: a }, Cs = !1, he = e; he !== null; )
      if (((e = he), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = e), (he = t));
      else
        for (; he !== null; ) {
          switch (((e = he), (o = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (a = 0; a < t.length; a++) ((i = t[a]), (i.ref.impl = i.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && o !== null) {
                ((t = void 0),
                  (a = e),
                  (i = o.memoizedProps),
                  (o = o.memoizedState),
                  (n = a.stateNode));
                try {
                  var W = In(a.type, i);
                  ((t = n.getSnapshotBeforeUpdate(W, o)),
                    (n.__reactInternalSnapshotBeforeUpdate = t));
                } catch (lt) {
                  wt(a, a.return, lt);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (a = t.nodeType), a === 9)) Iu(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Iu(t);
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
              if ((t & 1024) !== 0) throw Error(u(163));
          }
          if (((t = e.sibling), t !== null)) {
            ((t.return = e.return), (he = t));
            break;
          }
          he = e.return;
        }
  }
  function N0(t, e, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Ga(t, a), n & 4 && Vi(5, a));
        break;
      case 1:
        if ((Ga(t, a), n & 4))
          if (((t = a.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (m) {
              wt(a, a.return, m);
            }
          else {
            var i = In(a.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(i, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (m) {
              wt(a, a.return, m);
            }
          }
        (n & 64 && x0(a), n & 512 && Gi(a, a.return));
        break;
      case 3:
        if ((Ga(t, a), n & 64 && ((t = a.updateQueue), t !== null))) {
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
            dd(t, e);
          } catch (m) {
            wt(a, a.return, m);
          }
        }
        break;
      case 27:
        e === null && n & 4 && E0(a);
      case 26:
      case 5:
        (Ga(t, a), e === null && n & 4 && A0(a), n & 512 && Gi(a, a.return));
        break;
      case 12:
        Ga(t, a);
        break;
      case 31:
        (Ga(t, a), n & 4 && C0(t, a));
        break;
      case 13:
        (Ga(t, a),
          n & 4 && R0(t, a),
          n & 64 &&
            ((t = a.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((a = ty.bind(null, a)), by(t, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || ka), !n)) {
          ((e = (e !== null && e.memoizedState !== null) || oe), (i = ka));
          var o = oe;
          ((ka = n),
            (oe = e) && !o ? Za(t, a, (a.subtreeFlags & 8772) !== 0) : Ga(t, a),
            (ka = i),
            (oe = o));
        }
        break;
      case 30:
        break;
      default:
        Ga(t, a);
    }
  }
  function w0(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), w0(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && ao(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var Xt = null,
    ze = !1;
  function Va(t, e, a) {
    for (a = a.child; a !== null; ) (z0(t, e, a), (a = a.sibling));
  }
  function z0(t, e, a) {
    if (ae && typeof ae.onCommitFiberUnmount == 'function')
      try {
        ae.onCommitFiberUnmount(Me, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (oe || xa(a, e),
          Va(t, e, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        oe || xa(a, e);
        var n = Xt,
          i = ze;
        (gn(a.type) && ((Xt = a.stateNode), (ze = !1)),
          Va(t, e, a),
          Ii(a.stateNode),
          (Xt = n),
          (ze = i));
        break;
      case 5:
        oe || xa(a, e);
      case 6:
        if (((n = Xt), (i = ze), (Xt = null), Va(t, e, a), (Xt = n), (ze = i), Xt !== null))
          if (ze)
            try {
              (Xt.nodeType === 9
                ? Xt.body
                : Xt.nodeName === 'HTML'
                  ? Xt.ownerDocument.body
                  : Xt
              ).removeChild(a.stateNode);
            } catch (o) {
              wt(a, e, o);
            }
          else
            try {
              Xt.removeChild(a.stateNode);
            } catch (o) {
              wt(a, e, o);
            }
        break;
      case 18:
        Xt !== null &&
          (ze
            ? ((t = Xt),
              xm(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                a.stateNode
              ),
              Pl(t))
            : xm(Xt, a.stateNode));
        break;
      case 4:
        ((n = Xt),
          (i = ze),
          (Xt = a.stateNode.containerInfo),
          (ze = !0),
          Va(t, e, a),
          (Xt = n),
          (ze = i));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (rn(2, a, e), oe || rn(4, a, e), Va(t, e, a));
        break;
      case 1:
        (oe ||
          (xa(a, e), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && j0(a, e, n)),
          Va(t, e, a));
        break;
      case 21:
        Va(t, e, a);
        break;
      case 22:
        ((oe = (n = oe) || a.memoizedState !== null), Va(t, e, a), (oe = n));
        break;
      default:
        Va(t, e, a);
    }
  }
  function C0(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Pl(t);
      } catch (a) {
        wt(e, e.return, a);
      }
    }
  }
  function R0(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Pl(t);
      } catch (a) {
        wt(e, e.return, a);
      }
  }
  function Xp(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new M0()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new M0()),
          e
        );
      default:
        throw Error(u(435, t.tag));
    }
  }
  function fs(t, e) {
    var a = Xp(t);
    e.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var i = ey.bind(null, t, n);
        n.then(i, i);
      }
    });
  }
  function Ce(t, e) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var i = a[n],
          o = t,
          m = e,
          v = m;
        t: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (gn(v.type)) {
                ((Xt = v.stateNode), (ze = !1));
                break t;
              }
              break;
            case 5:
              ((Xt = v.stateNode), (ze = !1));
              break t;
            case 3:
            case 4:
              ((Xt = v.stateNode.containerInfo), (ze = !0));
              break t;
          }
          v = v.return;
        }
        if (Xt === null) throw Error(u(160));
        (z0(o, m, i),
          (Xt = null),
          (ze = !1),
          (o = i.alternate),
          o !== null && (o.return = null),
          (i.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (O0(e, t), (e = e.sibling));
  }
  var sa = null;
  function O0(t, e) {
    var a = t.alternate,
      n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Ce(e, t), Re(t), n & 4 && (rn(3, t, t.return), Vi(3, t), rn(5, t, t.return)));
        break;
      case 1:
        (Ce(e, t),
          Re(t),
          n & 512 && (oe || a === null || xa(a, a.return)),
          n & 64 &&
            ka &&
            ((t = t.updateQueue),
            t !== null &&
              ((n = t.callbacks),
              n !== null &&
                ((a = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var i = sa;
        if ((Ce(e, t), Re(t), n & 512 && (oe || a === null || xa(a, a.return)), n & 4)) {
          var o = a !== null ? a.memoizedState : null;
          if (((n = t.memoizedState), a === null))
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  ((n = t.type), (a = t.memoizedProps), (i = i.ownerDocument || i));
                  e: switch (n) {
                    case 'title':
                      ((o = i.getElementsByTagName('title')[0]),
                        (!o ||
                          o[yi] ||
                          o[ye] ||
                          o.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          o.hasAttribute('itemprop')) &&
                          ((o = i.createElement(n)),
                          i.head.insertBefore(o, i.querySelector('head > title'))),
                        be(o, n, a),
                        (o[ye] = t),
                        me(o),
                        (n = o));
                      break t;
                    case 'link':
                      var m = Om('link', 'href', i).get(n + (a.href || ''));
                      if (m) {
                        for (var v = 0; v < m.length; v++)
                          if (
                            ((o = m[v]),
                            o.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              o.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              o.getAttribute('title') === (a.title == null ? null : a.title) &&
                              o.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            m.splice(v, 1);
                            break e;
                          }
                      }
                      ((o = i.createElement(n)), be(o, n, a), i.head.appendChild(o));
                      break;
                    case 'meta':
                      if ((m = Om('meta', 'content', i).get(n + (a.content || '')))) {
                        for (v = 0; v < m.length; v++)
                          if (
                            ((o = m[v]),
                            o.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              o.getAttribute('name') === (a.name == null ? null : a.name) &&
                              o.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              o.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              o.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            m.splice(v, 1);
                            break e;
                          }
                      }
                      ((o = i.createElement(n)), be(o, n, a), i.head.appendChild(o));
                      break;
                    default:
                      throw Error(u(468, n));
                  }
                  ((o[ye] = t), me(o), (n = o));
                }
                t.stateNode = n;
              } else Bm(i, t.type, t.stateNode);
            else t.stateNode = Rm(i, n, t.memoizedProps);
          else
            o !== n
              ? (o === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : o.count--,
                n === null ? Bm(i, t.type, t.stateNode) : Rm(i, n, t.memoizedProps))
              : n === null && t.stateNode !== null && Au(t, t.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Ce(e, t),
          Re(t),
          n & 512 && (oe || a === null || xa(a, a.return)),
          a !== null && n & 4 && Au(t, t.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Ce(e, t), Re(t), n & 512 && (oe || a === null || xa(a, a.return)), t.flags & 32)) {
          i = t.stateNode;
          try {
            xl(i, '');
          } catch (W) {
            wt(t, t.return, W);
          }
        }
        (n & 4 &&
          t.stateNode != null &&
          ((i = t.memoizedProps), Au(t, i, a !== null ? a.memoizedProps : i)),
          n & 1024 && (Mu = !0));
        break;
      case 6:
        if ((Ce(e, t), Re(t), n & 4)) {
          if (t.stateNode === null) throw Error(u(162));
          ((n = t.memoizedProps), (a = t.stateNode));
          try {
            a.nodeValue = n;
          } catch (W) {
            wt(t, t.return, W);
          }
        }
        break;
      case 3:
        if (
          ((Ms = null),
          (i = sa),
          (sa = Ts(e.containerInfo)),
          Ce(e, t),
          (sa = i),
          Re(t),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Pl(e.containerInfo);
          } catch (W) {
            wt(t, t.return, W);
          }
        Mu && ((Mu = !1), B0(t));
        break;
      case 4:
        ((n = sa), (sa = Ts(t.stateNode.containerInfo)), Ce(e, t), Re(t), (sa = n));
        break;
      case 12:
        (Ce(e, t), Re(t));
        break;
      case 31:
        (Ce(e, t),
          Re(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), fs(t, n))));
        break;
      case 13:
        (Ce(e, t),
          Re(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (ms = de()),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), fs(t, n))));
        break;
      case 22:
        i = t.memoizedState !== null;
        var b = a !== null && a.memoizedState !== null,
          N = ka,
          D = oe;
        if (((ka = N || i), (oe = D || b), Ce(e, t), (oe = D), (ka = N), Re(t), n & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = i ? e._visibility & -2 : e._visibility | 1,
              i && (a === null || b || ka || oe || Pn(t)),
              a = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (a === null) {
                b = a = e;
                try {
                  if (((o = b.stateNode), i))
                    ((m = o.style),
                      typeof m.setProperty == 'function'
                        ? m.setProperty('display', 'none', 'important')
                        : (m.display = 'none'));
                  else {
                    v = b.stateNode;
                    var U = b.memoizedProps.style,
                      w = U != null && U.hasOwnProperty('display') ? U.display : null;
                    v.style.display = w == null || typeof w == 'boolean' ? '' : ('' + w).trim();
                  }
                } catch (W) {
                  wt(b, b.return, W);
                }
              }
            } else if (e.tag === 6) {
              if (a === null) {
                b = e;
                try {
                  b.stateNode.nodeValue = i ? '' : b.memoizedProps;
                } catch (W) {
                  wt(b, b.return, W);
                }
              }
            } else if (e.tag === 18) {
              if (a === null) {
                b = e;
                try {
                  var R = b.stateNode;
                  i ? jm(R, !0) : jm(b.stateNode, !1);
                } catch (W) {
                  wt(b, b.return, W);
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
        n & 4 &&
          ((n = t.updateQueue),
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), fs(t, a))));
        break;
      case 19:
        (Ce(e, t),
          Re(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), fs(t, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Ce(e, t), Re(t));
    }
  }
  function Re(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var a, n = t.return; n !== null; ) {
          if (T0(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(u(160));
        switch (a.tag) {
          case 27:
            var i = a.stateNode,
              o = Tu(t);
            rs(t, o, i);
            break;
          case 5:
            var m = a.stateNode;
            a.flags & 32 && (xl(m, ''), (a.flags &= -33));
            var v = Tu(t);
            rs(t, v, m);
            break;
          case 3:
          case 4:
            var b = a.stateNode.containerInfo,
              N = Tu(t);
            Eu(t, N, b);
            break;
          default:
            throw Error(u(161));
        }
      } catch (D) {
        wt(t, t.return, D);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function B0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (B0(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function Ga(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (N0(t, e.alternate, e), (e = e.sibling));
  }
  function Pn(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (rn(4, e, e.return), Pn(e));
          break;
        case 1:
          xa(e, e.return);
          var a = e.stateNode;
          (typeof a.componentWillUnmount == 'function' && j0(e, e.return, a), Pn(e));
          break;
        case 27:
          Ii(e.stateNode);
        case 26:
        case 5:
          (xa(e, e.return), Pn(e));
          break;
        case 22:
          e.memoizedState === null && Pn(e);
          break;
        case 30:
          Pn(e);
          break;
        default:
          Pn(e);
      }
      t = t.sibling;
    }
  }
  function Za(t, e, a) {
    for (a = a && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate,
        i = t,
        o = e,
        m = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          (Za(i, o, a), Vi(4, o));
          break;
        case 1:
          if ((Za(i, o, a), (n = o), (i = n.stateNode), typeof i.componentDidMount == 'function'))
            try {
              i.componentDidMount();
            } catch (N) {
              wt(n, n.return, N);
            }
          if (((n = o), (i = n.updateQueue), i !== null)) {
            var v = n.stateNode;
            try {
              var b = i.shared.hiddenCallbacks;
              if (b !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < b.length; i++) fd(b[i], v);
            } catch (N) {
              wt(n, n.return, N);
            }
          }
          (a && m & 64 && x0(o), Gi(o, o.return));
          break;
        case 27:
          E0(o);
        case 26:
        case 5:
          (Za(i, o, a), a && n === null && m & 4 && A0(o), Gi(o, o.return));
          break;
        case 12:
          Za(i, o, a);
          break;
        case 31:
          (Za(i, o, a), a && m & 4 && C0(i, o));
          break;
        case 13:
          (Za(i, o, a), a && m & 4 && R0(i, o));
          break;
        case 22:
          (o.memoizedState === null && Za(i, o, a), Gi(o, o.return));
          break;
        case 30:
          break;
        default:
          Za(i, o, a);
      }
      e = e.sibling;
    }
  }
  function Nu(t, e) {
    var a = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (a = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== a && (t != null && t.refCount++, a != null && wi(a)));
  }
  function wu(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && wi(t)));
  }
  function oa(t, e, a, n) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (D0(t, e, a, n), (e = e.sibling));
  }
  function D0(t, e, a, n) {
    var i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (oa(t, e, a, n), i & 2048 && Vi(9, e));
        break;
      case 1:
        oa(t, e, a, n);
        break;
      case 3:
        (oa(t, e, a, n),
          i & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && wi(t))));
        break;
      case 12:
        if (i & 2048) {
          (oa(t, e, a, n), (t = e.stateNode));
          try {
            var o = e.memoizedProps,
              m = o.id,
              v = o.onPostCommit;
            typeof v == 'function' &&
              v(m, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (b) {
            wt(e, e.return, b);
          }
        } else oa(t, e, a, n);
        break;
      case 31:
        oa(t, e, a, n);
        break;
      case 13:
        oa(t, e, a, n);
        break;
      case 23:
        break;
      case 22:
        ((o = e.stateNode),
          (m = e.alternate),
          e.memoizedState !== null
            ? o._visibility & 2
              ? oa(t, e, a, n)
              : Zi(t, e)
            : o._visibility & 2
              ? oa(t, e, a, n)
              : ((o._visibility |= 2), Vl(t, e, a, n, (e.subtreeFlags & 10256) !== 0 || !1)),
          i & 2048 && Nu(m, e));
        break;
      case 24:
        (oa(t, e, a, n), i & 2048 && wu(e.alternate, e));
        break;
      default:
        oa(t, e, a, n);
    }
  }
  function Vl(t, e, a, n, i) {
    for (i = i && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var o = t,
        m = e,
        v = a,
        b = n,
        N = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          (Vl(o, m, v, b, i), Vi(8, m));
          break;
        case 23:
          break;
        case 22:
          var D = m.stateNode;
          (m.memoizedState !== null
            ? D._visibility & 2
              ? Vl(o, m, v, b, i)
              : Zi(o, m)
            : ((D._visibility |= 2), Vl(o, m, v, b, i)),
            i && N & 2048 && Nu(m.alternate, m));
          break;
        case 24:
          (Vl(o, m, v, b, i), i && N & 2048 && wu(m.alternate, m));
          break;
        default:
          Vl(o, m, v, b, i);
      }
      e = e.sibling;
    }
  }
  function Zi(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var a = t,
          n = e,
          i = n.flags;
        switch (n.tag) {
          case 22:
            (Zi(a, n), i & 2048 && Nu(n.alternate, n));
            break;
          case 24:
            (Zi(a, n), i & 2048 && wu(n.alternate, n));
            break;
          default:
            Zi(a, n);
        }
        e = e.sibling;
      }
  }
  var Yi = 8192;
  function Gl(t, e, a) {
    if (t.subtreeFlags & Yi) for (t = t.child; t !== null; ) (L0(t, e, a), (t = t.sibling));
  }
  function L0(t, e, a) {
    switch (t.tag) {
      case 26:
        (Gl(t, e, a),
          t.flags & Yi && t.memoizedState !== null && Ry(a, sa, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Gl(t, e, a);
        break;
      case 3:
      case 4:
        var n = sa;
        ((sa = Ts(t.stateNode.containerInfo)), Gl(t, e, a), (sa = n));
        break;
      case 22:
        t.memoizedState === null &&
          ((n = t.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Yi), (Yi = 16777216), Gl(t, e, a), (Yi = n))
            : Gl(t, e, a));
        break;
      default:
        Gl(t, e, a);
    }
  }
  function $0(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function Xi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var n = e[a];
          ((he = n), U0(n, t));
        }
      $0(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (H0(t), (t = t.sibling));
  }
  function H0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Xi(t), t.flags & 2048 && rn(9, t, t.return));
        break;
      case 3:
        Xi(t);
        break;
      case 12:
        Xi(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), ds(t))
          : Xi(t);
        break;
      default:
        Xi(t);
    }
  }
  function ds(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var n = e[a];
          ((he = n), U0(n, t));
        }
      $0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (rn(8, e, e.return), ds(e));
          break;
        case 22:
          ((a = e.stateNode), a._visibility & 2 && ((a._visibility &= -3), ds(e)));
          break;
        default:
          ds(e);
      }
      t = t.sibling;
    }
  }
  function U0(t, e) {
    for (; he !== null; ) {
      var a = he;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          rn(8, a, e);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          wi(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (he = n));
      else
        t: for (a = t; he !== null; ) {
          n = he;
          var i = n.sibling,
            o = n.return;
          if ((w0(n), n === a)) {
            he = null;
            break t;
          }
          if (i !== null) {
            ((i.return = o), (he = i));
            break t;
          }
          he = o;
        }
    }
  }
  var Qp = {
      getCacheForType: function (t) {
        var e = ve(ie),
          a = e.data.get(t);
        return (a === void 0 && ((a = t()), e.data.set(t, a)), a);
      },
      cacheSignal: function () {
        return ve(ie).controller.signal;
      },
    },
    Kp = typeof WeakMap == 'function' ? WeakMap : Map,
    Et = 0,
    Bt = null,
    dt = null,
    ht = 0,
    Nt = 0,
    qe = null,
    fn = !1,
    Zl = !1,
    zu = !1,
    Ya = 0,
    Jt = 0,
    dn = 0,
    tl = 0,
    Cu = 0,
    ke = 0,
    Yl = 0,
    Qi = null,
    Oe = null,
    Ru = !1,
    ms = 0,
    q0 = 0,
    hs = 1 / 0,
    ps = null,
    mn = null,
    fe = 0,
    hn = null,
    Xl = null,
    Xa = 0,
    Ou = 0,
    Bu = null,
    k0 = null,
    Ki = 0,
    Du = null;
  function Ve() {
    return (Et & 2) !== 0 && ht !== 0 ? ht & -ht : O.T !== null ? ku() : af();
  }
  function V0() {
    if (ke === 0)
      if ((ht & 536870912) === 0 || gt) {
        var t = Ht;
        ((Ht <<= 1), (Ht & 3932160) === 0 && (Ht = 262144), (ke = t));
      } else ke = 536870912;
    return ((t = He.current), t !== null && (t.flags |= 32), ke);
  }
  function Be(t, e, a) {
    (((t === Bt && (Nt === 2 || Nt === 9)) || t.cancelPendingCommit !== null) &&
      (Ql(t, 0), pn(t, ht, ke, !1)),
      Fa(t, a),
      ((Et & 2) === 0 || t !== Bt) &&
        (t === Bt && ((Et & 2) === 0 && (tl |= a), Jt === 4 && pn(t, ht, ke, !1)), ja(t)));
  }
  function G0(t, e, a) {
    if ((Et & 6) !== 0) throw Error(u(327));
    var n = (!a && (e & 127) === 0 && (e & t.expiredLanes) === 0) || ft(t, e),
      i = n ? Fp(t, e) : $u(t, e, !0),
      o = n;
    do {
      if (i === 0) {
        Zl && !n && pn(t, e, 0, !1);
        break;
      } else {
        if (((a = t.current.alternate), o && !Wp(a))) {
          ((i = $u(t, e, !1)), (o = !1));
          continue;
        }
        if (i === 2) {
          if (((o = e), t.errorRecoveryDisabledLanes & o)) var m = 0;
          else
            ((m = t.pendingLanes & -536870913), (m = m !== 0 ? m : m & 536870912 ? 536870912 : 0));
          if (m !== 0) {
            e = m;
            t: {
              var v = t;
              i = Qi;
              var b = v.current.memoizedState.isDehydrated;
              if ((b && (Ql(v, m).flags |= 256), (m = $u(v, m, !1)), m !== 2)) {
                if (zu && !b) {
                  ((v.errorRecoveryDisabledLanes |= o), (tl |= o), (i = 4));
                  break t;
                }
                ((o = Oe), (Oe = i), o !== null && (Oe === null ? (Oe = o) : Oe.push.apply(Oe, o)));
              }
              i = m;
            }
            if (((o = !1), i !== 2)) continue;
          }
        }
        if (i === 1) {
          (Ql(t, 0), pn(t, e, 0, !0));
          break;
        }
        t: {
          switch (((n = t), (o = i), o)) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              pn(n, e, ke, !fn);
              break t;
            case 2:
              Oe = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((e & 62914560) === e && ((i = ms + 300 - de()), 10 < i)) {
            if ((pn(n, e, ke, !fn), Mt(n, 0, !0) !== 0)) break t;
            ((Xa = e),
              (n.timeoutHandle = bm(
                Z0.bind(null, n, a, Oe, ps, Ru, e, ke, tl, Yl, fn, o, 'Throttled', -0, 0),
                i
              )));
            break t;
          }
          Z0(n, a, Oe, ps, Ru, e, ke, tl, Yl, fn, o, null, -0, 0);
        }
      }
      break;
    } while (!0);
    ja(t);
  }
  function Z0(t, e, a, n, i, o, m, v, b, N, D, U, w, R) {
    if (((t.timeoutHandle = -1), (U = e.subtreeFlags), U & 8192 || (U & 16785408) === 16785408)) {
      ((U = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ca,
      }),
        L0(e, o, U));
      var W = (o & 62914560) === o ? ms - de() : (o & 4194048) === o ? q0 - de() : 0;
      if (((W = Oy(U, W)), W !== null)) {
        ((Xa = o),
          (t.cancelPendingCommit = W(I0.bind(null, t, e, o, a, n, i, m, v, b, D, U, null, w, R))),
          pn(t, o, m, !N));
        return;
      }
    }
    I0(t, e, o, a, n, i, m, v, b);
  }
  function Wp(t) {
    for (var e = t; ; ) {
      var a = e.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        e.flags & 16384 &&
        ((a = e.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var i = a[n],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!Le(o(), i)) return !1;
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
  function pn(t, e, a, n) {
    ((e &= ~Cu),
      (e &= ~tl),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      n && (t.warmLanes |= e),
      (n = t.expirationTimes));
    for (var i = e; 0 < i; ) {
      var o = 31 - re(i),
        m = 1 << o;
      ((n[o] = -1), (i &= ~m));
    }
    a !== 0 && Pr(t, a, e);
  }
  function ys() {
    return (Et & 6) === 0 ? (Wi(0), !1) : !0;
  }
  function Lu() {
    if (dt !== null) {
      if (Nt === 0) var t = dt.return;
      else ((t = dt), (Da = Yn = null), Io(t), ($l = null), (Ci = 0), (t = dt));
      for (; t !== null; ) (S0(t.alternate, t), (t = t.return));
      dt = null;
    }
  }
  function Ql(t, e) {
    var a = t.timeoutHandle;
    (a !== -1 && ((t.timeoutHandle = -1), py(a)),
      (a = t.cancelPendingCommit),
      a !== null && ((t.cancelPendingCommit = null), a()),
      (Xa = 0),
      Lu(),
      (Bt = t),
      (dt = a = Oa(t.current, null)),
      (ht = e),
      (Nt = 0),
      (qe = null),
      (fn = !1),
      (Zl = ft(t, e)),
      (zu = !1),
      (Yl = ke = Cu = tl = dn = Jt = 0),
      (Oe = Qi = null),
      (Ru = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var i = 31 - re(n),
          o = 1 << i;
        ((e |= t[i]), (n &= ~o));
      }
    return ((Ya = e), $c(), a);
  }
  function Y0(t, e) {
    ((st = null),
      (O.H = Ui),
      e === Ll || e === Yc
        ? ((e = sd()), (Nt = 3))
        : e === qo
          ? ((e = sd()), (Nt = 4))
          : (Nt =
              e === hu
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (qe = e),
      dt === null && ((Jt = 1), is(t, We(e, t.current))));
  }
  function X0() {
    var t = He.current;
    return t === null
      ? !0
      : (ht & 4194048) === ht
        ? Pe === null
        : (ht & 62914560) === ht || (ht & 536870912) !== 0
          ? t === Pe
          : !1;
  }
  function Q0() {
    var t = O.H;
    return ((O.H = Ui), t === null ? Ui : t);
  }
  function K0() {
    var t = O.A;
    return ((O.A = Qp), t);
  }
  function gs() {
    ((Jt = 4),
      fn || ((ht & 4194048) !== ht && He.current !== null) || (Zl = !0),
      ((dn & 134217727) === 0 && (tl & 134217727) === 0) || Bt === null || pn(Bt, ht, ke, !1));
  }
  function $u(t, e, a) {
    var n = Et;
    Et |= 2;
    var i = Q0(),
      o = K0();
    ((Bt !== t || ht !== e) && ((ps = null), Ql(t, e)), (e = !1));
    var m = Jt;
    t: do
      try {
        if (Nt !== 0 && dt !== null) {
          var v = dt,
            b = qe;
          switch (Nt) {
            case 8:
              (Lu(), (m = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              He.current === null && (e = !0);
              var N = Nt;
              if (((Nt = 0), (qe = null), Kl(t, v, b, N), a && Zl)) {
                m = 0;
                break t;
              }
              break;
            default:
              ((N = Nt), (Nt = 0), (qe = null), Kl(t, v, b, N));
          }
        }
        (Jp(), (m = Jt));
        break;
      } catch (D) {
        Y0(t, D);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (Da = Yn = null),
      (Et = n),
      (O.H = i),
      (O.A = o),
      dt === null && ((Bt = null), (ht = 0), $c()),
      m
    );
  }
  function Jp() {
    for (; dt !== null; ) W0(dt);
  }
  function Fp(t, e) {
    var a = Et;
    Et |= 2;
    var n = Q0(),
      i = K0();
    Bt !== t || ht !== e ? ((ps = null), (hs = de() + 500), Ql(t, e)) : (Zl = ft(t, e));
    t: do
      try {
        if (Nt !== 0 && dt !== null) {
          e = dt;
          var o = qe;
          e: switch (Nt) {
            case 1:
              ((Nt = 0), (qe = null), Kl(t, e, o, 1));
              break;
            case 2:
            case 9:
              if (id(o)) {
                ((Nt = 0), (qe = null), J0(e));
                break;
              }
              ((e = function () {
                ((Nt !== 2 && Nt !== 9) || Bt !== t || (Nt = 7), ja(t));
              }),
                o.then(e, e));
              break t;
            case 3:
              Nt = 7;
              break t;
            case 4:
              Nt = 5;
              break t;
            case 7:
              id(o) ? ((Nt = 0), (qe = null), J0(e)) : ((Nt = 0), (qe = null), Kl(t, e, o, 7));
              break;
            case 5:
              var m = null;
              switch (dt.tag) {
                case 26:
                  m = dt.memoizedState;
                case 5:
                case 27:
                  var v = dt;
                  if (m ? Dm(m) : v.stateNode.complete) {
                    ((Nt = 0), (qe = null));
                    var b = v.sibling;
                    if (b !== null) dt = b;
                    else {
                      var N = v.return;
                      N !== null ? ((dt = N), vs(N)) : (dt = null);
                    }
                    break e;
                  }
              }
              ((Nt = 0), (qe = null), Kl(t, e, o, 5));
              break;
            case 6:
              ((Nt = 0), (qe = null), Kl(t, e, o, 6));
              break;
            case 8:
              (Lu(), (Jt = 6));
              break t;
            default:
              throw Error(u(462));
          }
        }
        Ip();
        break;
      } catch (D) {
        Y0(t, D);
      }
    while (!0);
    return (
      (Da = Yn = null),
      (O.H = n),
      (O.A = i),
      (Et = a),
      dt !== null ? 0 : ((Bt = null), (ht = 0), $c(), Jt)
    );
  }
  function Ip() {
    for (; dt !== null && !hl(); ) W0(dt);
  }
  function W0(t) {
    var e = _0(t.alternate, t, Ya);
    ((t.memoizedProps = t.pendingProps), e === null ? vs(t) : (dt = e));
  }
  function J0(t) {
    var e = t,
      a = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = m0(a, e, e.pendingProps, e.type, void 0, ht);
        break;
      case 11:
        e = m0(a, e, e.pendingProps, e.type.render, e.ref, ht);
        break;
      case 5:
        Io(e);
      default:
        (S0(a, e), (e = dt = Kf(e, Ya)), (e = _0(a, e, Ya)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? vs(t) : (dt = e));
  }
  function Kl(t, e, a, n) {
    ((Da = Yn = null), Io(e), ($l = null), (Ci = 0));
    var i = e.return;
    try {
      if (qp(t, i, e, a, ht)) {
        ((Jt = 1), is(t, We(a, t.current)), (dt = null));
        return;
      }
    } catch (o) {
      if (i !== null) throw ((dt = i), o);
      ((Jt = 1), is(t, We(a, t.current)), (dt = null));
      return;
    }
    e.flags & 32768
      ? (gt || n === 1
          ? (t = !0)
          : Zl || (ht & 536870912) !== 0
            ? (t = !1)
            : ((fn = t = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = He.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        F0(e, t))
      : vs(e);
  }
  function vs(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        F0(e, fn);
        return;
      }
      t = e.return;
      var a = Gp(e.alternate, e, Ya);
      if (a !== null) {
        dt = a;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        dt = e;
        return;
      }
      dt = e = t;
    } while (e !== null);
    Jt === 0 && (Jt = 5);
  }
  function F0(t, e) {
    do {
      var a = Zp(t.alternate, t);
      if (a !== null) {
        ((a.flags &= 32767), (dt = a));
        return;
      }
      if (
        ((a = t.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        dt = t;
        return;
      }
      dt = t = a;
    } while (t !== null);
    ((Jt = 6), (dt = null));
  }
  function I0(t, e, a, n, i, o, m, v, b) {
    t.cancelPendingCommit = null;
    do _s();
    while (fe !== 0);
    if ((Et & 6) !== 0) throw Error(u(327));
    if (e !== null) {
      if (e === t.current) throw Error(u(177));
      if (
        ((o = e.lanes | e.childLanes),
        (o |= To),
        pi(t, a, o, m, v, b),
        t === Bt && ((dt = Bt = null), (ht = 0)),
        (Xl = e),
        (hn = t),
        (Xa = a),
        (Ou = o),
        (Bu = i),
        (k0 = n),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            ay(ia, function () {
              return (nm(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (n = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = O.T), (O.T = null), (i = Z.p), (Z.p = 2), (m = Et), (Et |= 4));
        try {
          Yp(t, e, a);
        } finally {
          ((Et = m), (Z.p = i), (O.T = n));
        }
      }
      ((fe = 1), P0(), tm(), em());
    }
  }
  function P0() {
    if (fe === 1) {
      fe = 0;
      var t = hn,
        e = Xl,
        a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = Z.p;
        Z.p = 2;
        var i = Et;
        Et |= 4;
        try {
          O0(e, t);
          var o = Wu,
            m = Uf(t.containerInfo),
            v = o.focusedElem,
            b = o.selectionRange;
          if (m !== v && v && v.ownerDocument && Hf(v.ownerDocument.documentElement, v)) {
            if (b !== null && bo(v)) {
              var N = b.start,
                D = b.end;
              if ((D === void 0 && (D = N), 'selectionStart' in v))
                ((v.selectionStart = N), (v.selectionEnd = Math.min(D, v.value.length)));
              else {
                var U = v.ownerDocument || document,
                  w = (U && U.defaultView) || window;
                if (w.getSelection) {
                  var R = w.getSelection(),
                    W = v.textContent.length,
                    lt = Math.min(b.start, W),
                    Ot = b.end === void 0 ? lt : Math.min(b.end, W);
                  !R.extend && lt > Ot && ((m = Ot), (Ot = lt), (lt = m));
                  var A = $f(v, lt),
                    x = $f(v, Ot);
                  if (
                    A &&
                    x &&
                    (R.rangeCount !== 1 ||
                      R.anchorNode !== A.node ||
                      R.anchorOffset !== A.offset ||
                      R.focusNode !== x.node ||
                      R.focusOffset !== x.offset)
                  ) {
                    var M = U.createRange();
                    (M.setStart(A.node, A.offset),
                      R.removeAllRanges(),
                      lt > Ot
                        ? (R.addRange(M), R.extend(x.node, x.offset))
                        : (M.setEnd(x.node, x.offset), R.addRange(M)));
                  }
                }
              }
            }
            for (U = [], R = v; (R = R.parentNode); )
              R.nodeType === 1 && U.push({ element: R, left: R.scrollLeft, top: R.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < U.length; v++) {
              var $ = U[v];
              (($.element.scrollLeft = $.left), ($.element.scrollTop = $.top));
            }
          }
          ((Cs = !!Ku), (Wu = Ku = null));
        } finally {
          ((Et = i), (Z.p = n), (O.T = a));
        }
      }
      ((t.current = e), (fe = 2));
    }
  }
  function tm() {
    if (fe === 2) {
      fe = 0;
      var t = hn,
        e = Xl,
        a = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = Z.p;
        Z.p = 2;
        var i = Et;
        Et |= 4;
        try {
          N0(t, e.alternate, e);
        } finally {
          ((Et = i), (Z.p = n), (O.T = a));
        }
      }
      fe = 3;
    }
  }
  function em() {
    if (fe === 4 || fe === 3) {
      ((fe = 0), mi());
      var t = hn,
        e = Xl,
        a = Xa,
        n = k0;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (fe = 5)
        : ((fe = 0), (Xl = hn = null), am(t, t.pendingLanes));
      var i = t.pendingLanes;
      if (
        (i === 0 && (mn = null),
        to(a),
        (e = e.stateNode),
        ae && typeof ae.onCommitFiberRoot == 'function')
      )
        try {
          ae.onCommitFiberRoot(Me, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((e = O.T), (i = Z.p), (Z.p = 2), (O.T = null));
        try {
          for (var o = t.onRecoverableError, m = 0; m < n.length; m++) {
            var v = n[m];
            o(v.value, { componentStack: v.stack });
          }
        } finally {
          ((O.T = e), (Z.p = i));
        }
      }
      ((Xa & 3) !== 0 && _s(),
        ja(t),
        (i = t.pendingLanes),
        (a & 261930) !== 0 && (i & 42) !== 0 ? (t === Du ? Ki++ : ((Ki = 0), (Du = t))) : (Ki = 0),
        Wi(0));
    }
  }
  function am(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), wi(e)));
  }
  function _s() {
    return (P0(), tm(), em(), nm());
  }
  function nm() {
    if (fe !== 5) return !1;
    var t = hn,
      e = Ou;
    Ou = 0;
    var a = to(Xa),
      n = O.T,
      i = Z.p;
    try {
      ((Z.p = 32 > a ? 32 : a), (O.T = null), (a = Bu), (Bu = null));
      var o = hn,
        m = Xa;
      if (((fe = 0), (Xl = hn = null), (Xa = 0), (Et & 6) !== 0)) throw Error(u(331));
      var v = Et;
      if (
        ((Et |= 4),
        H0(o.current),
        D0(o, o.current, m, a),
        (Et = v),
        Wi(0, !1),
        ae && typeof ae.onPostCommitFiberRoot == 'function')
      )
        try {
          ae.onPostCommitFiberRoot(Me, o);
        } catch {}
      return !0;
    } finally {
      ((Z.p = i), (O.T = n), am(t, e));
    }
  }
  function lm(t, e, a) {
    ((e = We(a, e)),
      (e = mu(t.stateNode, e, 2)),
      (t = sn(t, e, 2)),
      t !== null && (Fa(t, 2), ja(t)));
  }
  function wt(t, e, a) {
    if (t.tag === 3) lm(t, t, a);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          lm(e, t, a);
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (mn === null || !mn.has(n)))
          ) {
            ((t = We(a, t)),
              (a = i0(2)),
              (n = sn(e, a, 2)),
              n !== null && (c0(a, n, e, t), Fa(n, 2), ja(n)));
            break;
          }
        }
        e = e.return;
      }
  }
  function Hu(t, e, a) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new Kp();
      var i = new Set();
      n.set(e, i);
    } else ((i = n.get(e)), i === void 0 && ((i = new Set()), n.set(e, i)));
    i.has(a) || ((zu = !0), i.add(a), (t = Pp.bind(null, t, e, a)), e.then(t, t));
  }
  function Pp(t, e, a) {
    var n = t.pingCache;
    (n !== null && n.delete(e),
      (t.pingedLanes |= t.suspendedLanes & a),
      (t.warmLanes &= ~a),
      Bt === t &&
        (ht & a) === a &&
        (Jt === 4 || (Jt === 3 && (ht & 62914560) === ht && 300 > de() - ms)
          ? (Et & 2) === 0 && Ql(t, 0)
          : (Cu |= a),
        Yl === ht && (Yl = 0)),
      ja(t));
  }
  function im(t, e) {
    (e === 0 && (e = le()), (t = Vn(t, e)), t !== null && (Fa(t, e), ja(t)));
  }
  function ty(t) {
    var e = t.memoizedState,
      a = 0;
    (e !== null && (a = e.retryLane), im(t, a));
  }
  function ey(t, e) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode,
          i = t.memoizedState;
        i !== null && (a = i.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    (n !== null && n.delete(e), im(t, a));
  }
  function ay(t, e) {
    return Ja(t, e);
  }
  var bs = null,
    Wl = null,
    Uu = !1,
    Ss = !1,
    qu = !1,
    yn = 0;
  function ja(t) {
    (t !== Wl && t.next === null && (Wl === null ? (bs = Wl = t) : (Wl = Wl.next = t)),
      (Ss = !0),
      Uu || ((Uu = !0), ly()));
  }
  function Wi(t, e) {
    if (!qu && Ss) {
      qu = !0;
      do
        for (var a = !1, n = bs; n !== null; ) {
          if (t !== 0) {
            var i = n.pendingLanes;
            if (i === 0) var o = 0;
            else {
              var m = n.suspendedLanes,
                v = n.pingedLanes;
              ((o = (1 << (31 - re(42 | t) + 1)) - 1),
                (o &= i & ~(m & ~v)),
                (o = o & 201326741 ? (o & 201326741) | 1 : o ? o | 2 : 0));
            }
            o !== 0 && ((a = !0), um(n, o));
          } else
            ((o = ht),
              (o = Mt(
                n,
                n === Bt ? o : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (o & 3) === 0 || ft(n, o) || ((a = !0), um(n, o)));
          n = n.next;
        }
      while (a);
      qu = !1;
    }
  }
  function ny() {
    cm();
  }
  function cm() {
    Ss = Uu = !1;
    var t = 0;
    yn !== 0 && hy() && (t = yn);
    for (var e = de(), a = null, n = bs; n !== null; ) {
      var i = n.next,
        o = sm(n, e);
      (o === 0
        ? ((n.next = null), a === null ? (bs = i) : (a.next = i), i === null && (Wl = a))
        : ((a = n), (t !== 0 || (o & 3) !== 0) && (Ss = !0)),
        (n = i));
    }
    ((fe !== 0 && fe !== 5) || Wi(t), yn !== 0 && (yn = 0));
  }
  function sm(t, e) {
    for (
      var a = t.suspendedLanes,
        n = t.pingedLanes,
        i = t.expirationTimes,
        o = t.pendingLanes & -62914561;
      0 < o;
    ) {
      var m = 31 - re(o),
        v = 1 << m,
        b = i[m];
      (b === -1
        ? ((v & a) === 0 || (v & n) !== 0) && (i[m] = zt(v, e))
        : b <= e && (t.expiredLanes |= v),
        (o &= ~v));
    }
    if (
      ((e = Bt),
      (a = ht),
      (a = Mt(t, t === e ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (n = t.callbackNode),
      a === 0 || (t === e && (Nt === 2 || Nt === 9)) || t.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Ma(n), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((a & 3) === 0 || ft(t, a)) {
      if (((e = a & -a), e === t.callbackPriority)) return e;
      switch ((n !== null && Ma(n), to(a))) {
        case 2:
        case 8:
          a = pl;
          break;
        case 32:
          a = ia;
          break;
        case 268435456:
          a = $n;
          break;
        default:
          a = ia;
      }
      return (
        (n = om.bind(null, t)),
        (a = Ja(a, n)),
        (t.callbackPriority = e),
        (t.callbackNode = a),
        e
      );
    }
    return (
      n !== null && n !== null && Ma(n),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function om(t, e) {
    if (fe !== 0 && fe !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var a = t.callbackNode;
    if (_s() && t.callbackNode !== a) return null;
    var n = ht;
    return (
      (n = Mt(t, t === Bt ? n : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      n === 0
        ? null
        : (G0(t, n, e),
          sm(t, de()),
          t.callbackNode != null && t.callbackNode === a ? om.bind(null, t) : null)
    );
  }
  function um(t, e) {
    if (_s()) return null;
    G0(t, e, !0);
  }
  function ly() {
    yy(function () {
      (Et & 6) !== 0 ? Ja(Ln, ny) : cm();
    });
  }
  function ku() {
    if (yn === 0) {
      var t = Bl;
      (t === 0 && ((t = St), (St <<= 1), (St & 261888) === 0 && (St = 256)), (yn = t));
    }
    return yn;
  }
  function rm(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : wc('' + t);
  }
  function fm(t, e) {
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
  function iy(t, e, a, n, i) {
    if (e === 'submit' && a && a.stateNode === i) {
      var o = rm((i[Ne] || null).action),
        m = n.submitter;
      m &&
        ((e = (e = m[Ne] || null) ? rm(e.formAction) : m.getAttribute('formAction')),
        e !== null && ((o = e), (m = null)));
      var v = new Oc('action', 'action', null, n, i);
      t.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (yn !== 0) {
                  var b = m ? fm(i, m) : new FormData(i);
                  su(a, { pending: !0, data: b, method: i.method, action: o }, null, b);
                }
              } else
                typeof o == 'function' &&
                  (v.preventDefault(),
                  (b = m ? fm(i, m) : new FormData(i)),
                  su(a, { pending: !0, data: b, method: i.method, action: o }, o, b));
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var Vu = 0; Vu < Ao.length; Vu++) {
    var Gu = Ao[Vu],
      cy = Gu.toLowerCase(),
      sy = Gu[0].toUpperCase() + Gu.slice(1);
    ca(cy, 'on' + sy);
  }
  (ca(Vf, 'onAnimationEnd'),
    ca(Gf, 'onAnimationIteration'),
    ca(Zf, 'onAnimationStart'),
    ca('dblclick', 'onDoubleClick'),
    ca('focusin', 'onFocus'),
    ca('focusout', 'onBlur'),
    ca(jp, 'onTransitionRun'),
    ca(Ap, 'onTransitionStart'),
    ca(Tp, 'onTransitionCancel'),
    ca(Yf, 'onTransitionEnd'),
    bl('onMouseEnter', ['mouseout', 'mouseover']),
    bl('onMouseLeave', ['mouseout', 'mouseover']),
    bl('onPointerEnter', ['pointerout', 'pointerover']),
    bl('onPointerLeave', ['pointerout', 'pointerover']),
    Hn('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Hn(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Hn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Hn('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Hn(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Hn(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Ji =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    oy = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Ji)
    );
  function dm(t, e) {
    e = (e & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var n = t[a],
        i = n.event;
      n = n.listeners;
      t: {
        var o = void 0;
        if (e)
          for (var m = n.length - 1; 0 <= m; m--) {
            var v = n[m],
              b = v.instance,
              N = v.currentTarget;
            if (((v = v.listener), b !== o && i.isPropagationStopped())) break t;
            ((o = v), (i.currentTarget = N));
            try {
              o(i);
            } catch (D) {
              Lc(D);
            }
            ((i.currentTarget = null), (o = b));
          }
        else
          for (m = 0; m < n.length; m++) {
            if (
              ((v = n[m]),
              (b = v.instance),
              (N = v.currentTarget),
              (v = v.listener),
              b !== o && i.isPropagationStopped())
            )
              break t;
            ((o = v), (i.currentTarget = N));
            try {
              o(i);
            } catch (D) {
              Lc(D);
            }
            ((i.currentTarget = null), (o = b));
          }
      }
    }
  }
  function mt(t, e) {
    var a = e[eo];
    a === void 0 && (a = e[eo] = new Set());
    var n = t + '__bubble';
    a.has(n) || (mm(e, t, 2, !1), a.add(n));
  }
  function Zu(t, e, a) {
    var n = 0;
    (e && (n |= 4), mm(a, t, n, e));
  }
  var xs = '_reactListening' + Math.random().toString(36).slice(2);
  function Yu(t) {
    if (!t[xs]) {
      ((t[xs] = !0),
        cf.forEach(function (a) {
          a !== 'selectionchange' && (oy.has(a) || Zu(a, !1, t), Zu(a, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[xs] || ((e[xs] = !0), Zu('selectionchange', !1, e));
    }
  }
  function mm(t, e, a, n) {
    switch (Vm(e)) {
      case 2:
        var i = Ly;
        break;
      case 8:
        i = $y;
        break;
      default:
        i = cr;
    }
    ((a = i.bind(null, e, a, t)),
      (i = void 0),
      !ro || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (i = !0),
      n
        ? i !== void 0
          ? t.addEventListener(e, a, { capture: !0, passive: i })
          : t.addEventListener(e, a, !0)
        : i !== void 0
          ? t.addEventListener(e, a, { passive: i })
          : t.addEventListener(e, a, !1));
  }
  function Xu(t, e, a, n, i) {
    var o = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (;;) {
        if (n === null) return;
        var m = n.tag;
        if (m === 3 || m === 4) {
          var v = n.stateNode.containerInfo;
          if (v === i) break;
          if (m === 4)
            for (m = n.return; m !== null; ) {
              var b = m.tag;
              if ((b === 3 || b === 4) && m.stateNode.containerInfo === i) return;
              m = m.return;
            }
          for (; v !== null; ) {
            if (((m = gl(v)), m === null)) return;
            if (((b = m.tag), b === 5 || b === 6 || b === 26 || b === 27)) {
              n = o = m;
              continue t;
            }
            v = v.parentNode;
          }
        }
        n = n.return;
      }
    vf(function () {
      var N = o,
        D = oo(a),
        U = [];
      t: {
        var w = Xf.get(t);
        if (w !== void 0) {
          var R = Oc,
            W = t;
          switch (t) {
            case 'keypress':
              if (Cc(a) === 0) break t;
            case 'keydown':
            case 'keyup':
              R = ep;
              break;
            case 'focusin':
              ((W = 'focus'), (R = po));
              break;
            case 'focusout':
              ((W = 'blur'), (R = po));
              break;
            case 'beforeblur':
            case 'afterblur':
              R = po;
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
              R = Sf;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              R = G1;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              R = lp;
              break;
            case Vf:
            case Gf:
            case Zf:
              R = X1;
              break;
            case Yf:
              R = cp;
              break;
            case 'scroll':
            case 'scrollend':
              R = k1;
              break;
            case 'wheel':
              R = op;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              R = K1;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              R = jf;
              break;
            case 'toggle':
            case 'beforetoggle':
              R = rp;
          }
          var lt = (e & 4) !== 0,
            Ot = !lt && (t === 'scroll' || t === 'scrollend'),
            A = lt ? (w !== null ? w + 'Capture' : null) : w;
          lt = [];
          for (var x = N, M; x !== null; ) {
            var $ = x;
            if (
              ((M = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                M === null ||
                A === null ||
                (($ = vi(x, A)), $ != null && lt.push(Fi(x, $, M))),
              Ot)
            )
              break;
            x = x.return;
          }
          0 < lt.length && ((w = new R(w, W, null, a, D)), U.push({ event: w, listeners: lt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((w = t === 'mouseover' || t === 'pointerover'),
            (R = t === 'mouseout' || t === 'pointerout'),
            w && a !== so && (W = a.relatedTarget || a.fromElement) && (gl(W) || W[yl]))
          )
            break t;
          if (
            (R || w) &&
            ((w =
              D.window === D
                ? D
                : (w = D.ownerDocument)
                  ? w.defaultView || w.parentWindow
                  : window),
            R
              ? ((W = a.relatedTarget || a.toElement),
                (R = N),
                (W = W ? gl(W) : null),
                W !== null &&
                  ((Ot = d(W)), (lt = W.tag), W !== Ot || (lt !== 5 && lt !== 27 && lt !== 6)) &&
                  (W = null))
              : ((R = null), (W = N)),
            R !== W)
          ) {
            if (
              ((lt = Sf),
              ($ = 'onMouseLeave'),
              (A = 'onMouseEnter'),
              (x = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((lt = jf), ($ = 'onPointerLeave'), (A = 'onPointerEnter'), (x = 'pointer')),
              (Ot = R == null ? w : gi(R)),
              (M = W == null ? w : gi(W)),
              (w = new lt($, x + 'leave', R, a, D)),
              (w.target = Ot),
              (w.relatedTarget = M),
              ($ = null),
              gl(D) === N &&
                ((lt = new lt(A, x + 'enter', W, a, D)),
                (lt.target = M),
                (lt.relatedTarget = Ot),
                ($ = lt)),
              (Ot = $),
              R && W)
            )
              e: {
                for (lt = uy, A = R, x = W, M = 0, $ = A; $; $ = lt($)) M++;
                $ = 0;
                for (var et = x; et; et = lt(et)) $++;
                for (; 0 < M - $; ) ((A = lt(A)), M--);
                for (; 0 < $ - M; ) ((x = lt(x)), $--);
                for (; M--; ) {
                  if (A === x || (x !== null && A === x.alternate)) {
                    lt = A;
                    break e;
                  }
                  ((A = lt(A)), (x = lt(x)));
                }
                lt = null;
              }
            else lt = null;
            (R !== null && hm(U, w, R, lt, !1), W !== null && Ot !== null && hm(U, Ot, W, lt, !0));
          }
        }
        t: {
          if (
            ((w = N ? gi(N) : window),
            (R = w.nodeName && w.nodeName.toLowerCase()),
            R === 'select' || (R === 'input' && w.type === 'file'))
          )
            var xt = Cf;
          else if (wf(w))
            if (Rf) xt = bp;
            else {
              xt = vp;
              var P = gp;
            }
          else
            ((R = w.nodeName),
              !R || R.toLowerCase() !== 'input' || (w.type !== 'checkbox' && w.type !== 'radio')
                ? N && co(N.elementType) && (xt = Cf)
                : (xt = _p));
          if (xt && (xt = xt(t, N))) {
            zf(U, xt, a, D);
            break t;
          }
          (P && P(t, w, N),
            t === 'focusout' &&
              N &&
              w.type === 'number' &&
              N.memoizedProps.value != null &&
              io(w, 'number', w.value));
        }
        switch (((P = N ? gi(N) : window), t)) {
          case 'focusin':
            (wf(P) || P.contentEditable === 'true') && ((El = P), (So = N), (Ei = null));
            break;
          case 'focusout':
            Ei = So = El = null;
            break;
          case 'mousedown':
            xo = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((xo = !1), qf(U, a, D));
            break;
          case 'selectionchange':
            if (xp) break;
          case 'keydown':
          case 'keyup':
            qf(U, a, D);
        }
        var ut;
        if (go)
          t: {
            switch (t) {
              case 'compositionstart':
                var pt = 'onCompositionStart';
                break t;
              case 'compositionend':
                pt = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                pt = 'onCompositionUpdate';
                break t;
            }
            pt = void 0;
          }
        else
          Tl
            ? Mf(t, a) && (pt = 'onCompositionEnd')
            : t === 'keydown' && a.keyCode === 229 && (pt = 'onCompositionStart');
        (pt &&
          (Af &&
            a.locale !== 'ko' &&
            (Tl || pt !== 'onCompositionStart'
              ? pt === 'onCompositionEnd' && Tl && (ut = _f())
              : ((Pa = D), (fo = 'value' in Pa ? Pa.value : Pa.textContent), (Tl = !0))),
          (P = js(N, pt)),
          0 < P.length &&
            ((pt = new xf(pt, t, null, a, D)),
            U.push({ event: pt, listeners: P }),
            ut ? (pt.data = ut) : ((ut = Nf(a)), ut !== null && (pt.data = ut)))),
          (ut = dp ? mp(t, a) : hp(t, a)) &&
            ((pt = js(N, 'onBeforeInput')),
            0 < pt.length &&
              ((P = new xf('onBeforeInput', 'beforeinput', null, a, D)),
              U.push({ event: P, listeners: pt }),
              (P.data = ut))),
          iy(U, t, N, a, D));
      }
      dm(U, e);
    });
  }
  function Fi(t, e, a) {
    return { instance: t, listener: e, currentTarget: a };
  }
  function js(t, e) {
    for (var a = e + 'Capture', n = []; t !== null; ) {
      var i = t,
        o = i.stateNode;
      if (
        ((i = i.tag),
        (i !== 5 && i !== 26 && i !== 27) ||
          o === null ||
          ((i = vi(t, a)),
          i != null && n.unshift(Fi(t, i, o)),
          (i = vi(t, e)),
          i != null && n.push(Fi(t, i, o))),
        t.tag === 3)
      )
        return n;
      t = t.return;
    }
    return [];
  }
  function uy(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function hm(t, e, a, n, i) {
    for (var o = e._reactName, m = []; a !== null && a !== n; ) {
      var v = a,
        b = v.alternate,
        N = v.stateNode;
      if (((v = v.tag), b !== null && b === n)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        N === null ||
        ((b = N),
        i
          ? ((N = vi(a, o)), N != null && m.unshift(Fi(a, N, b)))
          : i || ((N = vi(a, o)), N != null && m.push(Fi(a, N, b)))),
        (a = a.return));
    }
    m.length !== 0 && t.push({ event: e, listeners: m });
  }
  var ry = /\r\n?/g,
    fy = /\u0000|\uFFFD/g;
  function pm(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        ry,
        `
`
      )
      .replace(fy, '');
  }
  function ym(t, e) {
    return ((e = pm(e)), pm(t) === e);
  }
  function Rt(t, e, a, n, i, o) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? e === 'body' || (e === 'textarea' && n === '') || xl(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && e !== 'body' && xl(t, '' + n);
        break;
      case 'className':
        Mc(t, 'class', n);
        break;
      case 'tabIndex':
        Mc(t, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Mc(t, a, n);
        break;
      case 'style':
        yf(t, n, o);
        break;
      case 'data':
        if (e !== 'object') {
          Mc(t, 'data', n);
          break;
        }
      case 'src':
      case 'href':
        if (n === '' && (e !== 'a' || a !== 'href')) {
          t.removeAttribute(a);
          break;
        }
        if (n == null || typeof n == 'function' || typeof n == 'symbol' || typeof n == 'boolean') {
          t.removeAttribute(a);
          break;
        }
        ((n = wc('' + n)), t.setAttribute(a, n));
        break;
      case 'action':
      case 'formAction':
        if (typeof n == 'function') {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == 'function' &&
            (a === 'formAction'
              ? (e !== 'input' && Rt(t, e, 'name', i.name, i, null),
                Rt(t, e, 'formEncType', i.formEncType, i, null),
                Rt(t, e, 'formMethod', i.formMethod, i, null),
                Rt(t, e, 'formTarget', i.formTarget, i, null))
              : (Rt(t, e, 'encType', i.encType, i, null),
                Rt(t, e, 'method', i.method, i, null),
                Rt(t, e, 'target', i.target, i, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          t.removeAttribute(a);
          break;
        }
        ((n = wc('' + n)), t.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (t.onclick = Ca);
        break;
      case 'onScroll':
        n != null && mt('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && mt('scrollend', t);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(u(61));
          if (((a = n.__html), a != null)) {
            if (i.children != null) throw Error(u(60));
            t.innerHTML = a;
          }
        }
        break;
      case 'multiple':
        t.multiple = n && typeof n != 'function' && typeof n != 'symbol';
        break;
      case 'muted':
        t.muted = n && typeof n != 'function' && typeof n != 'symbol';
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
          t.removeAttribute('xlink:href');
          break;
        }
        ((a = wc('' + n)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
          ? t.setAttribute(a, '' + n)
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
        n && typeof n != 'function' && typeof n != 'symbol'
          ? t.setAttribute(a, '')
          : t.removeAttribute(a);
        break;
      case 'capture':
      case 'download':
        n === !0
          ? t.setAttribute(a, '')
          : n !== !1 && n != null && typeof n != 'function' && typeof n != 'symbol'
            ? t.setAttribute(a, n)
            : t.removeAttribute(a);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        n != null && typeof n != 'function' && typeof n != 'symbol' && !isNaN(n) && 1 <= n
          ? t.setAttribute(a, n)
          : t.removeAttribute(a);
        break;
      case 'rowSpan':
      case 'start':
        n == null || typeof n == 'function' || typeof n == 'symbol' || isNaN(n)
          ? t.removeAttribute(a)
          : t.setAttribute(a, n);
        break;
      case 'popover':
        (mt('beforetoggle', t), mt('toggle', t), Ec(t, 'popover', n));
        break;
      case 'xlinkActuate':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        za(t, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        za(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        za(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        za(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Ec(t, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = U1.get(a) || a), Ec(t, a, n));
    }
  }
  function Qu(t, e, a, n, i, o) {
    switch (a) {
      case 'style':
        yf(t, n, o);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(u(61));
          if (((a = n.__html), a != null)) {
            if (i.children != null) throw Error(u(60));
            t.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? xl(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && xl(t, '' + n);
        break;
      case 'onScroll':
        n != null && mt('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && mt('scrollend', t);
        break;
      case 'onClick':
        n != null && (t.onclick = Ca);
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
        if (!sf.hasOwnProperty(a))
          t: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((i = a.endsWith('Capture')),
              (e = a.slice(2, i ? a.length - 7 : void 0)),
              (o = t[Ne] || null),
              (o = o != null ? o[a] : null),
              typeof o == 'function' && t.removeEventListener(e, o, i),
              typeof n == 'function')
            ) {
              (typeof o != 'function' &&
                o !== null &&
                (a in t ? (t[a] = null) : t.hasAttribute(a) && t.removeAttribute(a)),
                t.addEventListener(e, n, i));
              break t;
            }
            a in t ? (t[a] = n) : n === !0 ? t.setAttribute(a, '') : Ec(t, a, n);
          }
    }
  }
  function be(t, e, a) {
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
        (mt('error', t), mt('load', t));
        var n = !1,
          i = !1,
          o;
        for (o in a)
          if (a.hasOwnProperty(o)) {
            var m = a[o];
            if (m != null)
              switch (o) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  i = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(u(137, e));
                default:
                  Rt(t, e, o, m, a, null);
              }
          }
        (i && Rt(t, e, 'srcSet', a.srcSet, a, null), n && Rt(t, e, 'src', a.src, a, null));
        return;
      case 'input':
        mt('invalid', t);
        var v = (o = m = i = null),
          b = null,
          N = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var D = a[n];
            if (D != null)
              switch (n) {
                case 'name':
                  i = D;
                  break;
                case 'type':
                  m = D;
                  break;
                case 'checked':
                  b = D;
                  break;
                case 'defaultChecked':
                  N = D;
                  break;
                case 'value':
                  o = D;
                  break;
                case 'defaultValue':
                  v = D;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (D != null) throw Error(u(137, e));
                  break;
                default:
                  Rt(t, e, n, D, a, null);
              }
          }
        df(t, o, v, b, N, m, i, !1);
        return;
      case 'select':
        (mt('invalid', t), (n = m = o = null));
        for (i in a)
          if (a.hasOwnProperty(i) && ((v = a[i]), v != null))
            switch (i) {
              case 'value':
                o = v;
                break;
              case 'defaultValue':
                m = v;
                break;
              case 'multiple':
                n = v;
              default:
                Rt(t, e, i, v, a, null);
            }
        ((e = o),
          (a = m),
          (t.multiple = !!n),
          e != null ? Sl(t, !!n, e, !1) : a != null && Sl(t, !!n, a, !0));
        return;
      case 'textarea':
        (mt('invalid', t), (o = i = n = null));
        for (m in a)
          if (a.hasOwnProperty(m) && ((v = a[m]), v != null))
            switch (m) {
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
                if (v != null) throw Error(u(91));
                break;
              default:
                Rt(t, e, m, v, a, null);
            }
        hf(t, n, i, o);
        return;
      case 'option':
        for (b in a)
          if (a.hasOwnProperty(b) && ((n = a[b]), n != null))
            switch (b) {
              case 'selected':
                t.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                Rt(t, e, b, n, a, null);
            }
        return;
      case 'dialog':
        (mt('beforetoggle', t), mt('toggle', t), mt('cancel', t), mt('close', t));
        break;
      case 'iframe':
      case 'object':
        mt('load', t);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < Ji.length; n++) mt(Ji[n], t);
        break;
      case 'image':
        (mt('error', t), mt('load', t));
        break;
      case 'details':
        mt('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (mt('error', t), mt('load', t));
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
                throw Error(u(137, e));
              default:
                Rt(t, e, N, n, a, null);
            }
        return;
      default:
        if (co(e)) {
          for (D in a)
            a.hasOwnProperty(D) && ((n = a[D]), n !== void 0 && Qu(t, e, D, n, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((n = a[v]), n != null && Rt(t, e, v, n, a, null));
  }
  function dy(t, e, a, n) {
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
        var i = null,
          o = null,
          m = null,
          v = null,
          b = null,
          N = null,
          D = null;
        for (R in a) {
          var U = a[R];
          if (a.hasOwnProperty(R) && U != null)
            switch (R) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                b = U;
              default:
                n.hasOwnProperty(R) || Rt(t, e, R, null, n, U);
            }
        }
        for (var w in n) {
          var R = n[w];
          if (((U = a[w]), n.hasOwnProperty(w) && (R != null || U != null)))
            switch (w) {
              case 'type':
                o = R;
                break;
              case 'name':
                i = R;
                break;
              case 'checked':
                N = R;
                break;
              case 'defaultChecked':
                D = R;
                break;
              case 'value':
                m = R;
                break;
              case 'defaultValue':
                v = R;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (R != null) throw Error(u(137, e));
                break;
              default:
                R !== U && Rt(t, e, w, R, n, U);
            }
        }
        lo(t, m, v, b, N, D, o, i);
        return;
      case 'select':
        R = m = v = w = null;
        for (o in a)
          if (((b = a[o]), a.hasOwnProperty(o) && b != null))
            switch (o) {
              case 'value':
                break;
              case 'multiple':
                R = b;
              default:
                n.hasOwnProperty(o) || Rt(t, e, o, null, n, b);
            }
        for (i in n)
          if (((o = n[i]), (b = a[i]), n.hasOwnProperty(i) && (o != null || b != null)))
            switch (i) {
              case 'value':
                w = o;
                break;
              case 'defaultValue':
                v = o;
                break;
              case 'multiple':
                m = o;
              default:
                o !== b && Rt(t, e, i, o, n, b);
            }
        ((e = v),
          (a = m),
          (n = R),
          w != null
            ? Sl(t, !!a, w, !1)
            : !!n != !!a && (e != null ? Sl(t, !!a, e, !0) : Sl(t, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        R = w = null;
        for (v in a)
          if (((i = a[v]), a.hasOwnProperty(v) && i != null && !n.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Rt(t, e, v, null, n, i);
            }
        for (m in n)
          if (((i = n[m]), (o = a[m]), n.hasOwnProperty(m) && (i != null || o != null)))
            switch (m) {
              case 'value':
                w = i;
                break;
              case 'defaultValue':
                R = i;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (i != null) throw Error(u(91));
                break;
              default:
                i !== o && Rt(t, e, m, i, n, o);
            }
        mf(t, w, R);
        return;
      case 'option':
        for (var W in a)
          if (((w = a[W]), a.hasOwnProperty(W) && w != null && !n.hasOwnProperty(W)))
            switch (W) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                Rt(t, e, W, null, n, w);
            }
        for (b in n)
          if (((w = n[b]), (R = a[b]), n.hasOwnProperty(b) && w !== R && (w != null || R != null)))
            switch (b) {
              case 'selected':
                t.selected = w && typeof w != 'function' && typeof w != 'symbol';
                break;
              default:
                Rt(t, e, b, w, n, R);
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
        for (var lt in a)
          ((w = a[lt]),
            a.hasOwnProperty(lt) && w != null && !n.hasOwnProperty(lt) && Rt(t, e, lt, null, n, w));
        for (N in n)
          if (((w = n[N]), (R = a[N]), n.hasOwnProperty(N) && w !== R && (w != null || R != null)))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (w != null) throw Error(u(137, e));
                break;
              default:
                Rt(t, e, N, w, n, R);
            }
        return;
      default:
        if (co(e)) {
          for (var Ot in a)
            ((w = a[Ot]),
              a.hasOwnProperty(Ot) &&
                w !== void 0 &&
                !n.hasOwnProperty(Ot) &&
                Qu(t, e, Ot, void 0, n, w));
          for (D in n)
            ((w = n[D]),
              (R = a[D]),
              !n.hasOwnProperty(D) ||
                w === R ||
                (w === void 0 && R === void 0) ||
                Qu(t, e, D, w, n, R));
          return;
        }
    }
    for (var A in a)
      ((w = a[A]),
        a.hasOwnProperty(A) && w != null && !n.hasOwnProperty(A) && Rt(t, e, A, null, n, w));
    for (U in n)
      ((w = n[U]),
        (R = a[U]),
        !n.hasOwnProperty(U) || w === R || (w == null && R == null) || Rt(t, e, U, w, n, R));
  }
  function gm(t) {
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
  function my() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var i = a[n],
          o = i.transferSize,
          m = i.initiatorType,
          v = i.duration;
        if (o && v && gm(m)) {
          for (m = 0, v = i.responseEnd, n += 1; n < a.length; n++) {
            var b = a[n],
              N = b.startTime;
            if (N > v) break;
            var D = b.transferSize,
              U = b.initiatorType;
            D && gm(U) && ((b = b.responseEnd), (m += D * (b < v ? 1 : (v - N) / (b - N))));
          }
          if ((--n, (e += (8 * (o + m)) / (i.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var Ku = null,
    Wu = null;
  function As(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function vm(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function _m(t, e) {
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
  function Ju(t, e) {
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
  var Fu = null;
  function hy() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === Fu ? !1 : ((Fu = t), !0)) : ((Fu = null), !1);
  }
  var bm = typeof setTimeout == 'function' ? setTimeout : void 0,
    py = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Sm = typeof Promise == 'function' ? Promise : void 0,
    yy =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Sm < 'u'
          ? function (t) {
              return Sm.resolve(null).then(t).catch(gy);
            }
          : bm;
  function gy(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function gn(t) {
    return t === 'head';
  }
  function xm(t, e) {
    var a = e,
      n = 0;
    do {
      var i = a.nextSibling;
      if ((t.removeChild(a), i && i.nodeType === 8))
        if (((a = i.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (t.removeChild(i), Pl(e));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') Ii(t.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = t.ownerDocument.head), Ii(a));
          for (var o = a.firstChild; o; ) {
            var m = o.nextSibling,
              v = o.nodeName;
            (o[yi] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && o.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(o),
              (o = m));
          }
        } else a === 'body' && Ii(t.ownerDocument.body);
      a = i;
    } while (a);
    Pl(e);
  }
  function jm(t, e) {
    var a = t;
    t = 0;
    do {
      var n = a.nextSibling;
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
        n && n.nodeType === 8)
      )
        if (((a = n.data), a === '/$')) {
          if (t === 0) break;
          t--;
        } else (a !== '$' && a !== '$?' && a !== '$~' && a !== '$!') || t++;
      a = n;
    } while (a);
  }
  function Iu(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var a = e;
      switch (((e = e.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Iu(a), ao(a));
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
  function vy(t, e, a, n) {
    for (; t.nodeType === 1; ) {
      var i = a;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (n) {
        if (!t[yi])
          switch (e) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break;
              return t;
            case 'link':
              if (
                ((o = t.getAttribute('rel')),
                o === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break;
              if (
                o !== i.rel ||
                t.getAttribute('href') !== (i.href == null || i.href === '' ? null : i.href) ||
                t.getAttribute('crossorigin') !== (i.crossOrigin == null ? null : i.crossOrigin) ||
                t.getAttribute('title') !== (i.title == null ? null : i.title)
              )
                break;
              return t;
            case 'style':
              if (t.hasAttribute('data-precedence')) break;
              return t;
            case 'script':
              if (
                ((o = t.getAttribute('src')),
                (o !== (i.src == null ? null : i.src) ||
                  t.getAttribute('type') !== (i.type == null ? null : i.type) ||
                  t.getAttribute('crossorigin') !==
                    (i.crossOrigin == null ? null : i.crossOrigin)) &&
                  o &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === 'input' && t.type === 'hidden') {
        var o = i.name == null ? null : '' + i.name;
        if (i.type === 'hidden' && t.getAttribute('name') === o) return t;
      } else return t;
      if (((t = ta(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function _y(t, e, a) {
    if (e === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !a) ||
        ((t = ta(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Am(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = ta(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Pu(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function tr(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function by(t, e) {
    var a = t.ownerDocument;
    if (t.data === '$~') t._reactRetry = e;
    else if (t.data !== '$?' || a.readyState !== 'loading') e();
    else {
      var n = function () {
        (e(), a.removeEventListener('DOMContentLoaded', n));
      };
      (a.addEventListener('DOMContentLoaded', n), (t._reactRetry = n));
    }
  }
  function ta(t) {
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
  var er = null;
  function Tm(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === '/$' || a === '/&') {
          if (e === 0) return ta(t.nextSibling);
          e--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Em(t) {
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
  function Mm(t, e, a) {
    switch (((e = As(a)), t)) {
      case 'html':
        if (((t = e.documentElement), !t)) throw Error(u(452));
        return t;
      case 'head':
        if (((t = e.head), !t)) throw Error(u(453));
        return t;
      case 'body':
        if (((t = e.body), !t)) throw Error(u(454));
        return t;
      default:
        throw Error(u(451));
    }
  }
  function Ii(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    ao(t);
  }
  var ea = new Map(),
    Nm = new Set();
  function Ts(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var Qa = Z.d;
  Z.d = { f: Sy, r: xy, D: jy, C: Ay, L: Ty, m: Ey, X: Ny, S: My, M: wy };
  function Sy() {
    var t = Qa.f(),
      e = ys();
    return t || e;
  }
  function xy(t) {
    var e = vl(t);
    e !== null && e.tag === 5 && e.type === 'form' ? Yd(e) : Qa.r(t);
  }
  var Jl = typeof document > 'u' ? null : document;
  function wm(t, e, a) {
    var n = Jl;
    if (n && typeof e == 'string' && e) {
      var i = Qe(e);
      ((i = 'link[rel="' + t + '"][href="' + i + '"]'),
        typeof a == 'string' && (i += '[crossorigin="' + a + '"]'),
        Nm.has(i) ||
          (Nm.add(i),
          (t = { rel: t, crossOrigin: a, href: e }),
          n.querySelector(i) === null &&
            ((e = n.createElement('link')), be(e, 'link', t), me(e), n.head.appendChild(e))));
    }
  }
  function jy(t) {
    (Qa.D(t), wm('dns-prefetch', t, null));
  }
  function Ay(t, e) {
    (Qa.C(t, e), wm('preconnect', t, e));
  }
  function Ty(t, e, a) {
    Qa.L(t, e, a);
    var n = Jl;
    if (n && t && e) {
      var i = 'link[rel="preload"][as="' + Qe(e) + '"]';
      e === 'image' && a && a.imageSrcSet
        ? ((i += '[imagesrcset="' + Qe(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (i += '[imagesizes="' + Qe(a.imageSizes) + '"]'))
        : (i += '[href="' + Qe(t) + '"]');
      var o = i;
      switch (e) {
        case 'style':
          o = Fl(t);
          break;
        case 'script':
          o = Il(t);
      }
      ea.has(o) ||
        ((t = S(
          { rel: 'preload', href: e === 'image' && a && a.imageSrcSet ? void 0 : t, as: e },
          a
        )),
        ea.set(o, t),
        n.querySelector(i) !== null ||
          (e === 'style' && n.querySelector(Pi(o))) ||
          (e === 'script' && n.querySelector(tc(o))) ||
          ((e = n.createElement('link')), be(e, 'link', t), me(e), n.head.appendChild(e)));
    }
  }
  function Ey(t, e) {
    Qa.m(t, e);
    var a = Jl;
    if (a && t) {
      var n = e && typeof e.as == 'string' ? e.as : 'script',
        i = 'link[rel="modulepreload"][as="' + Qe(n) + '"][href="' + Qe(t) + '"]',
        o = i;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          o = Il(t);
      }
      if (
        !ea.has(o) &&
        ((t = S({ rel: 'modulepreload', href: t }, e)), ea.set(o, t), a.querySelector(i) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(tc(o))) return;
        }
        ((n = a.createElement('link')), be(n, 'link', t), me(n), a.head.appendChild(n));
      }
    }
  }
  function My(t, e, a) {
    Qa.S(t, e, a);
    var n = Jl;
    if (n && t) {
      var i = _l(n).hoistableStyles,
        o = Fl(t);
      e = e || 'default';
      var m = i.get(o);
      if (!m) {
        var v = { loading: 0, preload: null };
        if ((m = n.querySelector(Pi(o)))) v.loading = 5;
        else {
          ((t = S({ rel: 'stylesheet', href: t, 'data-precedence': e }, a)),
            (a = ea.get(o)) && ar(t, a));
          var b = (m = n.createElement('link'));
          (me(b),
            be(b, 'link', t),
            (b._p = new Promise(function (N, D) {
              ((b.onload = N), (b.onerror = D));
            })),
            b.addEventListener('load', function () {
              v.loading |= 1;
            }),
            b.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            Es(m, e, n));
        }
        ((m = { type: 'stylesheet', instance: m, count: 1, state: v }), i.set(o, m));
      }
    }
  }
  function Ny(t, e) {
    Qa.X(t, e);
    var a = Jl;
    if (a && t) {
      var n = _l(a).hoistableScripts,
        i = Il(t),
        o = n.get(i);
      o ||
        ((o = a.querySelector(tc(i))),
        o ||
          ((t = S({ src: t, async: !0 }, e)),
          (e = ea.get(i)) && nr(t, e),
          (o = a.createElement('script')),
          me(o),
          be(o, 'link', t),
          a.head.appendChild(o)),
        (o = { type: 'script', instance: o, count: 1, state: null }),
        n.set(i, o));
    }
  }
  function wy(t, e) {
    Qa.M(t, e);
    var a = Jl;
    if (a && t) {
      var n = _l(a).hoistableScripts,
        i = Il(t),
        o = n.get(i);
      o ||
        ((o = a.querySelector(tc(i))),
        o ||
          ((t = S({ src: t, async: !0, type: 'module' }, e)),
          (e = ea.get(i)) && nr(t, e),
          (o = a.createElement('script')),
          me(o),
          be(o, 'link', t),
          a.head.appendChild(o)),
        (o = { type: 'script', instance: o, count: 1, state: null }),
        n.set(i, o));
    }
  }
  function zm(t, e, a, n) {
    var i = (i = X.current) ? Ts(i) : null;
    if (!i) throw Error(u(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((e = Fl(a.href)),
            (a = _l(i).hoistableStyles),
            (n = a.get(e)),
            n || ((n = { type: 'style', instance: null, count: 0, state: null }), a.set(e, n)),
            n)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          a.rel === 'stylesheet' &&
          typeof a.href == 'string' &&
          typeof a.precedence == 'string'
        ) {
          t = Fl(a.href);
          var o = _l(i).hoistableStyles,
            m = o.get(t);
          if (
            (m ||
              ((i = i.ownerDocument || i),
              (m = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              o.set(t, m),
              (o = i.querySelector(Pi(t))) && !o._p && ((m.instance = o), (m.state.loading = 5)),
              ea.has(t) ||
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
                ea.set(t, a),
                o || zy(i, t, a, m.state))),
            e && n === null)
          )
            throw Error(u(528, ''));
          return m;
        }
        if (e && n !== null) throw Error(u(529, ''));
        return null;
      case 'script':
        return (
          (e = a.async),
          (a = a.src),
          typeof a == 'string' && e && typeof e != 'function' && typeof e != 'symbol'
            ? ((e = Il(a)),
              (a = _l(i).hoistableScripts),
              (n = a.get(e)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(e, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(u(444, t));
    }
  }
  function Fl(t) {
    return 'href="' + Qe(t) + '"';
  }
  function Pi(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function Cm(t) {
    return S({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function zy(t, e, a, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + ']')
      ? (n.loading = 1)
      : ((e = t.createElement('link')),
        (n.preload = e),
        e.addEventListener('load', function () {
          return (n.loading |= 1);
        }),
        e.addEventListener('error', function () {
          return (n.loading |= 2);
        }),
        be(e, 'link', a),
        me(e),
        t.head.appendChild(e));
  }
  function Il(t) {
    return '[src="' + Qe(t) + '"]';
  }
  function tc(t) {
    return 'script[async]' + t;
  }
  function Rm(t, e, a) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var n = t.querySelector('style[data-href~="' + Qe(a.href) + '"]');
          if (n) return ((e.instance = n), me(n), n);
          var i = S({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (t.ownerDocument || t).createElement('style')),
            me(n),
            be(n, 'style', i),
            Es(n, a.precedence, t),
            (e.instance = n)
          );
        case 'stylesheet':
          i = Fl(a.href);
          var o = t.querySelector(Pi(i));
          if (o) return ((e.state.loading |= 4), (e.instance = o), me(o), o);
          ((n = Cm(a)),
            (i = ea.get(i)) && ar(n, i),
            (o = (t.ownerDocument || t).createElement('link')),
            me(o));
          var m = o;
          return (
            (m._p = new Promise(function (v, b) {
              ((m.onload = v), (m.onerror = b));
            })),
            be(o, 'link', n),
            (e.state.loading |= 4),
            Es(o, a.precedence, t),
            (e.instance = o)
          );
        case 'script':
          return (
            (o = Il(a.src)),
            (i = t.querySelector(tc(o)))
              ? ((e.instance = i), me(i), i)
              : ((n = a),
                (i = ea.get(o)) && ((n = S({}, a)), nr(n, i)),
                (t = t.ownerDocument || t),
                (i = t.createElement('script')),
                me(i),
                be(i, 'link', n),
                t.head.appendChild(i),
                (e.instance = i))
          );
        case 'void':
          return null;
        default:
          throw Error(u(443, e.type));
      }
    else
      e.type === 'stylesheet' &&
        (e.state.loading & 4) === 0 &&
        ((n = e.instance), (e.state.loading |= 4), Es(n, a.precedence, t));
    return e.instance;
  }
  function Es(t, e, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        i = n.length ? n[n.length - 1] : null,
        o = i,
        m = 0;
      m < n.length;
      m++
    ) {
      var v = n[m];
      if (v.dataset.precedence === e) o = v;
      else if (o !== i) break;
    }
    o
      ? o.parentNode.insertBefore(t, o.nextSibling)
      : ((e = a.nodeType === 9 ? a.head : a), e.insertBefore(t, e.firstChild));
  }
  function ar(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function nr(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Ms = null;
  function Om(t, e, a) {
    if (Ms === null) {
      var n = new Map(),
        i = (Ms = new Map());
      i.set(a, n);
    } else ((i = Ms), (n = i.get(a)), n || ((n = new Map()), i.set(a, n)));
    if (n.has(t)) return n;
    for (n.set(t, null), a = a.getElementsByTagName(t), i = 0; i < a.length; i++) {
      var o = a[i];
      if (
        !(o[yi] || o[ye] || (t === 'link' && o.getAttribute('rel') === 'stylesheet')) &&
        o.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var m = o.getAttribute(e) || '';
        m = t + m;
        var v = n.get(m);
        v ? v.push(o) : n.set(m, [o]);
      }
    }
    return n;
  }
  function Bm(t, e, a) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(a, e === 'title' ? t.querySelector('head > title') : null));
  }
  function Cy(t, e, a) {
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
  function Dm(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function Ry(t, e, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var i = Fl(n.href),
          o = e.querySelector(Pi(i));
        if (o) {
          ((e = o._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = Ns.bind(t)), e.then(t, t)),
            (a.state.loading |= 4),
            (a.instance = o),
            me(o));
          return;
        }
        ((o = e.ownerDocument || e),
          (n = Cm(n)),
          (i = ea.get(i)) && ar(n, i),
          (o = o.createElement('link')),
          me(o));
        var m = o;
        ((m._p = new Promise(function (v, b) {
          ((m.onload = v), (m.onerror = b));
        })),
          be(o, 'link', n),
          (a.instance = o));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(a, e),
        (e = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (t.count++,
          (a = Ns.bind(t)),
          e.addEventListener('load', a),
          e.addEventListener('error', a)));
    }
  }
  var lr = 0;
  function Oy(t, e) {
    return (
      t.stylesheets && t.count === 0 && zs(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((t.stylesheets && zs(t, t.stylesheets), t.unsuspend)) {
                var o = t.unsuspend;
                ((t.unsuspend = null), o());
              }
            }, 6e4 + e);
            0 < t.imgBytes && lr === 0 && (lr = 62500 * my());
            var i = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && zs(t, t.stylesheets), t.unsuspend))
                ) {
                  var o = t.unsuspend;
                  ((t.unsuspend = null), o());
                }
              },
              (t.imgBytes > lr ? 50 : 800) + e
            );
            return (
              (t.unsuspend = a),
              function () {
                ((t.unsuspend = null), clearTimeout(n), clearTimeout(i));
              }
            );
          }
        : null
    );
  }
  function Ns() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) zs(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var ws = null;
  function zs(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (ws = new Map()), e.forEach(By, t), (ws = null), Ns.call(t)));
  }
  function By(t, e) {
    if (!(e.state.loading & 4)) {
      var a = ws.get(t);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), ws.set(t, a));
        for (
          var i = t.querySelectorAll('link[data-precedence],style[data-precedence]'), o = 0;
          o < i.length;
          o++
        ) {
          var m = i[o];
          (m.nodeName === 'LINK' || m.getAttribute('media') !== 'not all') &&
            (a.set(m.dataset.precedence, m), (n = m));
        }
        n && a.set(null, n);
      }
      ((i = e.instance),
        (m = i.getAttribute('data-precedence')),
        (o = a.get(m) || n),
        o === n && a.set(null, i),
        a.set(m, i),
        this.count++,
        (n = Ns.bind(this)),
        i.addEventListener('load', n),
        i.addEventListener('error', n),
        o
          ? o.parentNode.insertBefore(i, o.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(i, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var ec = {
    $$typeof: ot,
    Provider: null,
    Consumer: null,
    _currentValue: at,
    _currentValue2: at,
    _threadCount: 0,
  };
  function Dy(t, e, a, n, i, o, m, v, b) {
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
      (this.expirationTimes = wa(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = wa(0)),
      (this.hiddenUpdates = wa(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = i),
      (this.onCaughtError = o),
      (this.onRecoverableError = m),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = b),
      (this.incompleteTransitions = new Map()));
  }
  function Lm(t, e, a, n, i, o, m, v, b, N, D, U) {
    return (
      (t = new Dy(t, e, a, m, b, N, D, U, v)),
      (e = 1),
      o === !0 && (e |= 24),
      (o = $e(3, null, null, e)),
      (t.current = o),
      (o.stateNode = t),
      (e = $o()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (o.memoizedState = { element: n, isDehydrated: a, cache: e }),
      ko(o),
      t
    );
  }
  function $m(t) {
    return t ? ((t = wl), t) : wl;
  }
  function Hm(t, e, a, n, i, o) {
    ((i = $m(i)),
      n.context === null ? (n.context = i) : (n.pendingContext = i),
      (n = cn(e)),
      (n.payload = { element: a }),
      (o = o === void 0 ? null : o),
      o !== null && (n.callback = o),
      (a = sn(t, n, e)),
      a !== null && (Be(a, t, e), Oi(a, t, e)));
  }
  function Um(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function ir(t, e) {
    (Um(t, e), (t = t.alternate) && Um(t, e));
  }
  function qm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Vn(t, 67108864);
      (e !== null && Be(e, t, 67108864), ir(t, 67108864));
    }
  }
  function km(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ve();
      e = Ps(e);
      var a = Vn(t, e);
      (a !== null && Be(a, t, e), ir(t, e));
    }
  }
  var Cs = !0;
  function Ly(t, e, a, n) {
    var i = O.T;
    O.T = null;
    var o = Z.p;
    try {
      ((Z.p = 2), cr(t, e, a, n));
    } finally {
      ((Z.p = o), (O.T = i));
    }
  }
  function $y(t, e, a, n) {
    var i = O.T;
    O.T = null;
    var o = Z.p;
    try {
      ((Z.p = 8), cr(t, e, a, n));
    } finally {
      ((Z.p = o), (O.T = i));
    }
  }
  function cr(t, e, a, n) {
    if (Cs) {
      var i = sr(n);
      if (i === null) (Xu(t, e, n, Rs, a), Gm(t, n));
      else if (Uy(i, t, e, a, n)) n.stopPropagation();
      else if ((Gm(t, n), e & 4 && -1 < Hy.indexOf(t))) {
        for (; i !== null; ) {
          var o = vl(i);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (((o = o.stateNode), o.current.memoizedState.isDehydrated)) {
                  var m = ne(o.pendingLanes);
                  if (m !== 0) {
                    var v = o;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; m; ) {
                      var b = 1 << (31 - re(m));
                      ((v.entanglements[1] |= b), (m &= ~b));
                    }
                    (ja(o), (Et & 6) === 0 && ((hs = de() + 500), Wi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = Vn(o, 2)), v !== null && Be(v, o, 2), ys(), ir(o, 2));
            }
          if (((o = sr(n)), o === null && Xu(t, e, n, Rs, a), o === i)) break;
          i = o;
        }
        i !== null && n.stopPropagation();
      } else Xu(t, e, n, null, a);
    }
  }
  function sr(t) {
    return ((t = oo(t)), or(t));
  }
  var Rs = null;
  function or(t) {
    if (((Rs = null), (t = gl(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var a = e.tag;
        if (a === 13) {
          if (((t = h(e)), t !== null)) return t;
          t = null;
        } else if (a === 31) {
          if (((t = p(e)), t !== null)) return t;
          t = null;
        } else if (a === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((Rs = t), null);
  }
  function Vm(t) {
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
        switch (ga()) {
          case Ln:
            return 2;
          case pl:
            return 8;
          case ia:
          case va:
            return 32;
          case $n:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ur = !1,
    vn = null,
    _n = null,
    bn = null,
    ac = new Map(),
    nc = new Map(),
    Sn = [],
    Hy =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Gm(t, e) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        vn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        _n = null;
        break;
      case 'mouseover':
      case 'mouseout':
        bn = null;
        break;
      case 'pointerover':
      case 'pointerout':
        ac.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        nc.delete(e.pointerId);
    }
  }
  function lc(t, e, a, n, i, o) {
    return t === null || t.nativeEvent !== o
      ? ((t = {
          blockedOn: e,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: o,
          targetContainers: [i],
        }),
        e !== null && ((e = vl(e)), e !== null && qm(e)),
        t)
      : ((t.eventSystemFlags |= n),
        (e = t.targetContainers),
        i !== null && e.indexOf(i) === -1 && e.push(i),
        t);
  }
  function Uy(t, e, a, n, i) {
    switch (e) {
      case 'focusin':
        return ((vn = lc(vn, t, e, a, n, i)), !0);
      case 'dragenter':
        return ((_n = lc(_n, t, e, a, n, i)), !0);
      case 'mouseover':
        return ((bn = lc(bn, t, e, a, n, i)), !0);
      case 'pointerover':
        var o = i.pointerId;
        return (ac.set(o, lc(ac.get(o) || null, t, e, a, n, i)), !0);
      case 'gotpointercapture':
        return ((o = i.pointerId), nc.set(o, lc(nc.get(o) || null, t, e, a, n, i)), !0);
    }
    return !1;
  }
  function Zm(t) {
    var e = gl(t.target);
    if (e !== null) {
      var a = d(e);
      if (a !== null) {
        if (((e = a.tag), e === 13)) {
          if (((e = h(a)), e !== null)) {
            ((t.blockedOn = e),
              nf(t.priority, function () {
                km(a);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = p(a)), e !== null)) {
            ((t.blockedOn = e),
              nf(t.priority, function () {
                km(a);
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
  function Os(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = sr(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((so = n), a.target.dispatchEvent(n), (so = null));
      } else return ((e = vl(a)), e !== null && qm(e), (t.blockedOn = a), !1);
      e.shift();
    }
    return !0;
  }
  function Ym(t, e, a) {
    Os(t) && a.delete(e);
  }
  function qy() {
    ((ur = !1),
      vn !== null && Os(vn) && (vn = null),
      _n !== null && Os(_n) && (_n = null),
      bn !== null && Os(bn) && (bn = null),
      ac.forEach(Ym),
      nc.forEach(Ym));
  }
  function Bs(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      ur || ((ur = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, qy)));
  }
  var Ds = null;
  function Xm(t) {
    Ds !== t &&
      ((Ds = t),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        Ds === t && (Ds = null);
        for (var e = 0; e < t.length; e += 3) {
          var a = t[e],
            n = t[e + 1],
            i = t[e + 2];
          if (typeof n != 'function') {
            if (or(n || a) === null) continue;
            break;
          }
          var o = vl(a);
          o !== null &&
            (t.splice(e, 3),
            (e -= 3),
            su(o, { pending: !0, data: i, method: a.method, action: n }, n, i));
        }
      }));
  }
  function Pl(t) {
    function e(b) {
      return Bs(b, t);
    }
    (vn !== null && Bs(vn, t),
      _n !== null && Bs(_n, t),
      bn !== null && Bs(bn, t),
      ac.forEach(e),
      nc.forEach(e));
    for (var a = 0; a < Sn.length; a++) {
      var n = Sn[a];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Sn.length && ((a = Sn[0]), a.blockedOn === null); )
      (Zm(a), a.blockedOn === null && Sn.shift());
    if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var i = a[n],
          o = a[n + 1],
          m = i[Ne] || null;
        if (typeof o == 'function') m || Xm(a);
        else if (m) {
          var v = null;
          if (o && o.hasAttribute('formAction')) {
            if (((i = o), (m = o[Ne] || null))) v = m.formAction;
            else if (or(i) !== null) continue;
          } else v = m.action;
          (typeof v == 'function' ? (a[n + 1] = v) : (a.splice(n, 3), (n -= 3)), Xm(a));
        }
      }
  }
  function Qm() {
    function t(o) {
      o.canIntercept &&
        o.info === 'react-transition' &&
        o.intercept({
          handler: function () {
            return new Promise(function (m) {
              return (i = m);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function e() {
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
        navigation.addEventListener('navigate', t),
        navigation.addEventListener('navigatesuccess', e),
        navigation.addEventListener('navigateerror', e),
        setTimeout(a, 100),
        function () {
          ((n = !0),
            navigation.removeEventListener('navigate', t),
            navigation.removeEventListener('navigatesuccess', e),
            navigation.removeEventListener('navigateerror', e),
            i !== null && (i(), (i = null)));
        }
      );
    }
  }
  function rr(t) {
    this._internalRoot = t;
  }
  ((Ls.prototype.render = rr.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(u(409));
      var a = e.current,
        n = Ve();
      Hm(a, n, t, e, null, null);
    }),
    (Ls.prototype.unmount = rr.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (Hm(t.current, 2, null, t, null, null), ys(), (e[yl] = null));
        }
      }));
  function Ls(t) {
    this._internalRoot = t;
  }
  Ls.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = af();
      t = { blockedOn: null, target: t, priority: e };
      for (var a = 0; a < Sn.length && e !== 0 && e < Sn[a].priority; a++);
      (Sn.splice(a, 0, t), a === 0 && Zm(t));
    }
  };
  var Km = c.version;
  if (Km !== '19.2.5') throw Error(u(527, Km, '19.2.5'));
  Z.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(u(188))
        : ((t = Object.keys(t).join(',')), Error(u(268, t)));
    return ((t = y(e)), (t = t !== null ? _(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var ky = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: O,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var $s = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$s.isDisabled && $s.supportsFiber)
      try {
        ((Me = $s.inject(ky)), (ae = $s));
      } catch {}
  }
  return (
    (cc.createRoot = function (t, e) {
      if (!f(t)) throw Error(u(299));
      var a = !1,
        n = '',
        i = e0,
        o = a0,
        m = n0;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (n = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (i = e.onUncaughtError),
          e.onCaughtError !== void 0 && (o = e.onCaughtError),
          e.onRecoverableError !== void 0 && (m = e.onRecoverableError)),
        (e = Lm(t, 1, !1, null, null, a, n, null, i, o, m, Qm)),
        (t[yl] = e.current),
        Yu(t),
        new rr(e)
      );
    }),
    (cc.hydrateRoot = function (t, e, a) {
      if (!f(t)) throw Error(u(299));
      var n = !1,
        i = '',
        o = e0,
        m = a0,
        v = n0,
        b = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (i = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (o = a.onUncaughtError),
          a.onCaughtError !== void 0 && (m = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (b = a.formState)),
        (e = Lm(t, 1, !0, e, a ?? null, n, i, b, o, m, v, Qm)),
        (e.context = $m(null)),
        (a = e.current),
        (n = Ve()),
        (n = Ps(n)),
        (i = cn(n)),
        (i.callback = null),
        sn(a, i, n),
        (a = n),
        (e.current.lanes = a),
        Fa(e, a),
        ja(e),
        (t[yl] = e.current),
        Yu(t),
        new Ls(e)
      );
    }),
    (cc.version = '19.2.5'),
    cc
  );
}
var lh;
function tg() {
  if (lh) return dr.exports;
  lh = 1;
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
  return (l(), (dr.exports = Py()), dr.exports);
}
var eg = tg(),
  G = qr();
const Hs = Yy(G);
function ag(l) {
  return 440 * Math.pow(2, (l - 69) / 12);
}
const ng = {
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
  const s = ng[c[1]];
  if (s === void 0) throw new Error(`Invalid note name: ${c[1]}`);
  const f = 12 + parseInt(c[2], 10) * 12 + s;
  return ag(f);
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
const lg = [L('A2'), L('C3'), L('E3')],
  ig = [L('E2'), L('G2'), L('B2')];
(L('D3'), L('F3'), L('A3'));
const cg = [L('G2'), L('B2'), L('D3')],
  sg = [L('C3'), L('E3'), L('G3')],
  og = [L('B2'), L('D3'), L('F3')];
function la(l, c, s, u, f, d, h, p, g) {
  const y = l.createOscillator(),
    _ = l.createGain();
  ((y.type = s), y.frequency.setValueAtTime(u, f));
  const S = 0.01,
    T = Math.min(0.08, d * 0.4);
  if (
    (_.gain.setValueAtTime(1e-4, f),
    _.gain.linearRampToValueAtTime(h, f + S),
    _.gain.setValueAtTime(h, f + d - T),
    _.gain.exponentialRampToValueAtTime(1e-4, f + d),
    p !== void 0)
  ) {
    const z = l.createBiquadFilter();
    ((z.type = 'lowpass'),
      (z.frequency.value = p),
      (z.Q.value = 0.8),
      y.connect(z).connect(_).connect(c));
  } else y.connect(_).connect(c);
  (y.start(f), y.stop(f + d + 0.02), g == null || g.push(y));
}
function xc(l, c) {
  const s = Math.max(1, Math.floor(l.sampleRate * c)),
    u = l.createBuffer(1, s, l.sampleRate),
    f = u.getChannelData(0);
  let d = 74565;
  for (let h = 0; h < s; h++)
    ((d = (d * 1664525 + 1013904223) & 4294967295), (f[h] = d / 2147483648 - 1));
  return u;
}
function bc(l, c, s, u, f) {
  const d = l.createOscillator(),
    h = l.createGain();
  ((d.type = 'sine'),
    d.frequency.setValueAtTime(80, s),
    d.frequency.exponentialRampToValueAtTime(30, s + 0.12),
    h.gain.setValueAtTime(u, s),
    h.gain.exponentialRampToValueAtTime(1e-4, s + 0.18),
    d.connect(h).connect(c),
    d.start(s),
    d.stop(s + 0.22),
    f == null || f.push(d));
  const p = l.createBufferSource();
  p.buffer = xc(l, 0.04);
  const g = l.createGain(),
    y = l.createBiquadFilter();
  ((y.type = 'highpass'),
    (y.frequency.value = 400),
    g.gain.setValueAtTime(u * 0.3, s),
    g.gain.exponentialRampToValueAtTime(1e-4, s + 0.04),
    p.connect(y).connect(g).connect(c),
    p.start(s),
    f == null || f.push(p));
}
function ug(l, c, s, u, f, d) {
  const h = l.createBufferSource();
  h.buffer = xc(l, f + 0.01);
  const p = l.createGain(),
    g = l.createBiquadFilter();
  ((g.type = 'highpass'),
    (g.frequency.value = 6e3),
    p.gain.setValueAtTime(u, s),
    p.gain.exponentialRampToValueAtTime(1e-4, s + f),
    h.connect(g).connect(p).connect(c),
    h.start(s),
    d == null || d.push(h));
}
const rg = 100,
  cl = 60 / rg,
  vc = cl * 4,
  Yh = 8,
  fg = vc * Yh,
  dg = 2,
  mg = 100,
  hg = [L('A2'), L('A2'), L('G2'), L('G2'), L('C3'), L('C3'), L('E2'), L('E2')],
  ih = [L('A3'), L('C4'), L('E4'), L('A4'), L('G4'), L('E4'), L('C4'), L('A3')],
  ch = [
    [L('A3'), L('C4'), L('E4')],
    [L('G3'), L('B3'), L('D4')],
    [L('C3'), L('E3'), L('G3')],
    [L('E3'), L('G3'), L('B3')],
  ];
function pg(l, c, s, u) {
  for (let f = 0; f < Yh; f++) {
    const d = s + f * vc,
      h = hg[f];
    (la(l, c, 'sawtooth', h, d, cl * 1.8, 0.22, 300, u),
      la(l, c, 'sawtooth', h, d + cl * 2, cl * 1.8, 0.22, 300, u),
      bc(l, c, d, 0.35, u),
      bc(l, c, d + cl * 2, 0.28, u));
    for (let p = 0; p < 8; p++) {
      const g = (f * 8 + p) % ih.length,
        y = d + p * cl * 0.5;
      la(l, c, 'square', ih[g], y, cl * 0.4, 0.07, 2400, u);
    }
  }
  for (let f = 0; f < ch.length; f++) {
    const d = ch[f],
      h = s + f * vc * 2,
      p = vc * 2;
    for (const g of d) {
      const y = l.createOscillator(),
        _ = l.createGain();
      ((y.type = 'triangle'), y.frequency.setValueAtTime(g, h));
      const S = 0.08;
      (_.gain.setValueAtTime(1e-4, h),
        _.gain.linearRampToValueAtTime(S, h + 0.15),
        _.gain.setValueAtTime(S, h + p - 0.2),
        _.gain.exponentialRampToValueAtTime(1e-4, h + p),
        y.connect(_).connect(c),
        y.start(h),
        y.stop(h + p + 0.05),
        u.push(y));
    }
  }
}
function yg(l, c) {
  let s = 0,
    u = null;
  const f = [];
  function d() {
    const p = l.currentTime + dg * vc;
    for (; s < p; ) (pg(l, c, s, f), (s += fg));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (u = setInterval(() => {
          d();
        }, mg)));
    },
    stop() {
      u !== null && (clearInterval(u), (u = null));
      const h = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(h);
        } catch {}
      f.length = 0;
    },
  };
}
const gg = 100,
  Ka = 60 / gg,
  kr = Ka * 4,
  Xh = 8,
  Nn = kr * Xh,
  vg = 2,
  _g = 100,
  sh = [L('E5'), L('D5'), L('B4'), L('G4'), L('F#4'), L('E4'), L('D4'), L('B3')];
function oh(l, c, s, u, f) {
  const d = l.createBufferSource();
  d.buffer = xc(l, 0.2);
  const h = l.createGain(),
    p = l.createBiquadFilter();
  ((p.type = 'bandpass'),
    (p.frequency.value = 900),
    (p.Q.value = 0.6),
    h.gain.setValueAtTime(u, s),
    h.gain.exponentialRampToValueAtTime(1e-4, s + 0.18),
    d.connect(p).connect(h).connect(c),
    d.start(s),
    f.push(d),
    la(l, c, 'sine', 120, s, 0.12, u * 0.5, 300, f));
}
function bg(l, c, s, u) {
  {
    const d = l.createOscillator(),
      h = l.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(L('E1'), s));
    const p = 0.35;
    (h.gain.setValueAtTime(1e-4, s),
      h.gain.linearRampToValueAtTime(p, s + 0.3),
      h.gain.setValueAtTime(p, s + Nn - 0.3),
      h.gain.linearRampToValueAtTime(1e-4, s + Nn));
    const g = l.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 120),
      d.connect(g).connect(h).connect(c),
      d.start(s),
      d.stop(s + Nn + 0.05),
      u.push(d));
  }
  for (let d = 0; d < Xh; d++) {
    const h = s + d * kr;
    for (let p = 0; p < 4; p++) {
      const g = h + p * Ka;
      (la(l, c, 'sawtooth', L('E2'), g, Ka * 0.9, 0.22, 400, u),
        la(l, c, 'sawtooth', L('B2'), g, Ka * 0.8, 0.1, 600, u));
    }
    (bc(l, c, h, 0.5, u),
      bc(l, c, h + Ka * 2, 0.45, u),
      oh(l, c, h + Ka, 0.4, u),
      oh(l, c, h + Ka * 3, 0.38, u));
  }
  const f = [...og, L('C4')];
  for (const d of f) {
    const h = l.createOscillator(),
      p = l.createGain();
    ((h.type = 'sawtooth'), h.frequency.setValueAtTime(d, s));
    const g = 0.07;
    (p.gain.setValueAtTime(1e-4, s),
      p.gain.linearRampToValueAtTime(g, s + 0.8),
      p.gain.setValueAtTime(g, s + Nn - 0.8),
      p.gain.exponentialRampToValueAtTime(1e-4, s + Nn));
    const y = l.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 900),
      h.connect(y).connect(p).connect(c),
      h.start(s),
      h.stop(s + Nn + 0.05),
      u.push(h));
  }
  for (let d = 0; d < sh.length; d++) {
    const h = s + d * Ka * 2;
    la(l, c, 'sawtooth', sh[d], h, Ka * 1.6, 0.08, 2e3, u);
  }
  {
    const d = l.createBufferSource();
    d.buffer = xc(l, Nn + 0.1);
    const h = l.createGain(),
      p = l.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 200),
      h.gain.setValueAtTime(0.04, s),
      d.connect(p).connect(h).connect(c),
      d.start(s),
      u.push(d));
  }
}
function Sg(l, c) {
  let s = 0,
    u = null;
  const f = [];
  function d() {
    const p = l.currentTime + vg * kr;
    for (; s < p; ) (bg(l, c, s, f), (s += Nn));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (u = setInterval(() => {
          d();
        }, _g)));
    },
    stop() {
      u !== null && (clearInterval(u), (u = null));
      const h = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(h);
        } catch {}
      f.length = 0;
    },
  };
}
const xg = 120,
  Wa = 60 / xg,
  Vr = Wa * 4,
  Qh = 8,
  Vs = Vr * Qh,
  jg = 2,
  Ag = 100,
  Tg = [L('E2'), L('E2'), L('D2'), L('D2'), L('E2'), L('E2'), L('B1'), L('B1')],
  uh = [
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
function rh(l, c, s, u, f) {
  const d = l.createBufferSource();
  d.buffer = xc(l, 0.15);
  const h = l.createGain(),
    p = l.createBiquadFilter();
  ((p.type = 'bandpass'),
    (p.frequency.value = 1800),
    (p.Q.value = 0.8),
    h.gain.setValueAtTime(u, s),
    h.gain.exponentialRampToValueAtTime(1e-4, s + 0.13),
    d.connect(p).connect(h).connect(c),
    d.start(s),
    f.push(d),
    la(l, c, 'triangle', 200, s, 0.08, u * 0.4, void 0, f));
}
function Eg(l, c, s, u) {
  for (let d = 0; d < Qh; d++) {
    const h = s + d * Vr,
      p = Tg[d];
    for (let g = 0; g < 4; g++) la(l, c, 'sawtooth', p, h + g * Wa, Wa * 0.85, 0.26, 280, u);
    for (let g = 0; g < 4; g++) bc(l, c, h + g * Wa, 0.42, u);
    (rh(l, c, h + Wa, 0.3, u), rh(l, c, h + Wa * 3, 0.3, u));
    for (let g = 0; g < 8; g++) ug(l, c, h + g * Wa * 0.5, 0.12, 0.08, u);
    for (let g = 0; g < 16; g++) {
      const y = (d * 16 + g) % uh.length,
        _ = h + g * Wa * 0.25;
      la(l, c, 'sawtooth', uh[y], _, Wa * 0.22, 0.06, 3200, u);
    }
  }
  const f = [L('E3'), L('G3'), L('B3')];
  for (const d of f) {
    const h = l.createOscillator(),
      p = l.createGain();
    ((h.type = 'triangle'),
      h.frequency.setValueAtTime(d, s),
      p.gain.setValueAtTime(1e-4, s),
      p.gain.linearRampToValueAtTime(0.06, s + 0.2),
      p.gain.setValueAtTime(0.06, s + Vs - 0.3),
      p.gain.exponentialRampToValueAtTime(1e-4, s + Vs));
    const g = l.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 1200),
      h.connect(g).connect(p).connect(c),
      h.start(s),
      h.stop(s + Vs + 0.05),
      u.push(h));
  }
}
function Mg(l, c) {
  let s = 0,
    u = null;
  const f = [];
  function d() {
    const p = l.currentTime + jg * Vr;
    for (; s < p; ) (Eg(l, c, s, f), (s += Vs));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (u = setInterval(() => {
          d();
        }, Ag)));
    },
    stop() {
      u !== null && (clearInterval(u), (u = null));
      const h = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(h);
        } catch {}
      f.length = 0;
    },
  };
}
const Ng = 80,
  Gs = 60 / Ng,
  Ys = Gs * 4,
  wg = 8,
  Zs = Ys * wg,
  zg = 2,
  Cg = 100,
  fh = [lg, sg, cg, ig],
  gr = [L('A3'), L('C4'), L('E4'), L('G4'), L('A4'), L('E4')];
function Rg(l, c, s, u) {
  {
    const f = l.createOscillator(),
      d = l.createGain();
    ((f.type = 'sine'), f.frequency.setValueAtTime(L('A2'), s));
    const h = 0.28;
    (d.gain.setValueAtTime(1e-4, s),
      d.gain.linearRampToValueAtTime(h, s + 0.5),
      d.gain.setValueAtTime(h, s + Zs - 0.5),
      d.gain.linearRampToValueAtTime(1e-4, s + Zs));
    const p = l.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 180),
      f.connect(p).connect(d).connect(c),
      f.start(s),
      f.stop(s + Zs + 0.05),
      u.push(f));
  }
  for (let f = 0; f < fh.length; f++) {
    const d = fh[f],
      h = s + f * Ys * 2,
      p = Ys * 2;
    for (const g of d) {
      const y = l.createOscillator(),
        _ = l.createGain();
      ((y.type = 'triangle'), y.frequency.setValueAtTime(g, h));
      const S = 0.1,
        T = 0.4,
        z = 0.6;
      (_.gain.setValueAtTime(1e-4, h),
        _.gain.linearRampToValueAtTime(S, h + T),
        _.gain.setValueAtTime(S, h + p - z),
        _.gain.exponentialRampToValueAtTime(1e-4, h + p));
      const E = l.createDelay(0.5);
      E.delayTime.value = 0.25;
      const q = l.createGain();
      q.gain.value = 0.2;
      const B = l.createBiquadFilter();
      ((B.type = 'lowpass'),
        (B.frequency.value = 2e3),
        y.connect(_).connect(c),
        y.connect(E).connect(B).connect(q).connect(c),
        y.start(h),
        y.stop(h + p + 0.5),
        u.push(y));
    }
  }
  for (let f = 0; f < gr.length; f++) {
    const d = s + f * Gs * 2;
    (la(l, c, 'sawtooth', gr[f], d, Gs * 1.5, 0.09, 1800, u),
      la(l, c, 'sine', gr[f] * 0.5, d + 0.12, Gs * 1.2, 0.05, 600, u));
  }
}
function Og(l, c) {
  let s = 0,
    u = null;
  const f = [];
  function d() {
    const p = l.currentTime + zg * Ys;
    for (; s < p; ) (Rg(l, c, s, f), (s += Zs));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (u = setInterval(() => {
          d();
        }, Cg)));
    },
    stop() {
      u !== null && (clearInterval(u), (u = null));
      const h = l.currentTime + 0.05;
      for (const p of f)
        try {
          p.stop(h);
        } catch {}
      f.length = 0;
    },
  };
}
function Bg(l, c, s) {
  switch (l) {
    case 'title':
      return Og(c, s);
    case 'base':
      return yg(c, s);
    case 'battleNormal':
      return Mg(c, s);
    case 'battleBoss':
      return Sg(c, s);
  }
}
function Dg(l, c) {
  const s = Math.max(1, Math.floor(l.sampleRate * c)),
    u = l.createBuffer(1, s, l.sampleRate),
    f = u.getChannelData(0);
  for (let d = 0; d < s; d++) f[d] = Math.random() * 2 - 1;
  return u;
}
function ha(l, c, s, u, f) {
  const d = l.gain;
  (d.setValueAtTime(1e-4, c),
    d.linearRampToValueAtTime(s, c + u),
    d.exponentialRampToValueAtTime(1e-4, c + u + f));
}
function yt(l, c, s, u, f, d, h, p, g) {
  const y = l.createOscillator(),
    _ = l.createGain();
  ((y.type = s),
    y.frequency.setValueAtTime(u, f),
    g !== void 0 && y.frequency.exponentialRampToValueAtTime(Math.max(1e-4, g), f + h + p),
    ha(_, f, d, h, p),
    y.connect(_).connect(c),
    y.start(f),
    y.stop(f + h + p + 0.02));
}
function pa(l, c, s, u, f, d) {
  const h = l.createBufferSource();
  h.buffer = Dg(l, s);
  const p = l.createGain();
  if ((ha(p, u, f, 0.002, s), d)) {
    const g = l.createBiquadFilter();
    ((g.type = d.type),
      (g.frequency.value = d.frequency),
      d.q !== void 0 && (g.Q.value = d.q),
      h.connect(g).connect(p).connect(c));
  } else h.connect(p).connect(c);
  h.start(u);
}
const Lg = (l, c, s) => {
    const u = l.createOscillator(),
      f = l.createOscillator(),
      d = l.createGain();
    ((u.type = 'sawtooth'),
      (f.type = 'sawtooth'),
      u.frequency.setValueAtTime(900, s),
      u.frequency.exponentialRampToValueAtTime(1500, s + 0.5),
      f.frequency.setValueAtTime(905, s),
      f.frequency.exponentialRampToValueAtTime(1510, s + 0.5),
      ha(d, s, 0.28, 0.02, 0.5),
      u.connect(d),
      f.connect(d),
      d.connect(c),
      u.start(s),
      f.start(s),
      u.stop(s + 0.55),
      f.stop(s + 0.55));
  },
  $g = (l, c, s) => {
    for (let u = 0; u < 4; u++) {
      const f = s + u * 0.12;
      (yt(l, c, 'sine', 110, f, 0.4, 0.005, 0.18, 35),
        pa(l, c, 0.08, f, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  Hg = (l, c, s) => {
    (pa(l, c, 0.4, s, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      yt(l, c, 'triangle', 3e3, s, 0.25, 0.005, 0.15, 1500),
      yt(l, c, 'sawtooth', 200, s + 0.05, 0.18, 0.005, 0.3, 80));
  },
  Ug = (l, c, s) => {
    for (let u = 0; u < 5; u++) {
      const f = s + u * 0.07,
        d = l.createOscillator(),
        h = l.createGain(),
        p = l.createBiquadFilter();
      ((d.type = 'square'),
        d.frequency.setValueAtTime(1100 + u * 60, f),
        d.frequency.exponentialRampToValueAtTime(1700 + u * 60, f + 0.04),
        (p.type = 'bandpass'),
        (p.frequency.value = 1600),
        (p.Q.value = 4),
        ha(h, f, 0.2, 0.002, 0.06),
        d.connect(p).connect(h).connect(c),
        d.start(f),
        d.stop(f + 0.08));
    }
  },
  qg = (l, c, s) => {
    (pa(l, c, 0.1, s, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      yt(l, c, 'triangle', 500, s, 0.18, 0.003, 0.08, 200));
  },
  kg = (l, c, s) => {
    const u = l.createOscillator(),
      f = l.createGain();
    ((u.type = 'sawtooth'),
      u.frequency.setValueAtTime(80, s),
      u.frequency.linearRampToValueAtTime(160, s + 0.8),
      ha(f, s, 0.3, 0.1, 0.7),
      u.connect(f).connect(c),
      u.start(s),
      u.stop(s + 0.85),
      yt(l, c, 'square', 320, s + 0.2, 0.15, 0.02, 0.4));
  },
  Vg = (l, c, s) => {
    (pa(l, c, 0.5, s, 0.45, { type: 'lowpass', frequency: 1200 }),
      yt(l, c, 'sine', 90, s, 0.5, 0.005, 0.6, 30),
      yt(l, c, 'triangle', 1200, s + 0.1, 0.2, 0.02, 0.4, 2400),
      yt(l, c, 'triangle', 1600, s + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  Gg = (l, c, s) => {
    (yt(l, c, 'sine', 180, s, 0.3, 0.005, 0.12, 60),
      pa(l, c, 0.08, s, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  Zg = (l, c, s) => {
    const u = l.createOscillator(),
      f = l.createGain();
    ((u.type = 'sawtooth'),
      u.frequency.setValueAtTime(220, s),
      u.frequency.exponentialRampToValueAtTime(40, s + 1.2),
      ha(f, s, 0.45, 0.02, 1.2),
      u.connect(f).connect(c),
      u.start(s),
      u.stop(s + 1.3),
      pa(l, c, 0.8, s, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  Yg = (l, c, s) => {
    (yt(l, c, 'triangle', 700, s, 0.22, 0.01, 0.18),
      yt(l, c, 'triangle', 1050, s + 0.12, 0.22, 0.01, 0.22));
  },
  Xg = (l, c, s) => {
    (yt(l, c, 'triangle', 600, s, 0.25, 0.01, 0.2),
      yt(l, c, 'triangle', 900, s + 0.12, 0.25, 0.01, 0.2),
      yt(l, c, 'triangle', 1350, s + 0.24, 0.3, 0.01, 0.45),
      yt(l, c, 'sine', 2400, s + 0.3, 0.15, 0.02, 0.5));
  },
  Qg = (l, c, s) => {
    (yt(l, c, 'triangle', 600, s, 0.28, 0.01, 0.18),
      yt(l, c, 'triangle', 750, s + 0.12, 0.28, 0.01, 0.18),
      yt(l, c, 'triangle', 900, s + 0.24, 0.28, 0.01, 0.22),
      yt(l, c, 'triangle', 1200, s + 0.36, 0.32, 0.01, 0.5),
      yt(l, c, 'sine', 2400, s + 0.42, 0.18, 0.02, 0.6));
  },
  Kg = (l, c, s) => {
    (yt(l, c, 'sawtooth', 300, s, 0.3, 0.02, 0.4, 220),
      yt(l, c, 'sawtooth', 220, s + 0.35, 0.3, 0.02, 0.5, 160),
      yt(l, c, 'sawtooth', 160, s + 0.8, 0.3, 0.02, 0.7, 80),
      pa(l, c, 1, s, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  Wg = (l, c, s) => {
    const u = l.createOscillator(),
      f = l.createGain();
    ((u.type = 'triangle'),
      u.frequency.setValueAtTime(700, s),
      u.frequency.exponentialRampToValueAtTime(400, s + 0.4),
      ha(f, s, 0.22, 0.02, 0.4),
      u.connect(f).connect(c),
      u.start(s),
      u.stop(s + 0.45),
      pa(l, c, 0.5, s, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  Jg = (l, c, s) => {
    yt(l, c, 'triangle', 1e3, s, 0.18, 0.003, 0.05);
  },
  Fg = (l, c, s) => {
    (yt(l, c, 'triangle', 880, s, 0.2, 0.005, 0.08),
      yt(l, c, 'triangle', 1320, s + 0.06, 0.2, 0.005, 0.12));
  },
  Ig = (l, c, s) => {
    (yt(l, c, 'square', 260, s, 0.18, 0.005, 0.07),
      yt(l, c, 'square', 200, s + 0.06, 0.18, 0.005, 0.1));
  },
  Pg = (l, c, s) => {
    yt(l, c, 'triangle', 1400, s, 0.12, 0.003, 0.04);
  },
  tv = (l, c, s) => {
    const u = l.createOscillator(),
      f = l.createGain();
    ((u.type = 'triangle'),
      u.frequency.setValueAtTime(500, s),
      u.frequency.exponentialRampToValueAtTime(1e3, s + 0.12),
      ha(f, s, 0.18, 0.01, 0.12),
      u.connect(f).connect(c),
      u.start(s),
      u.stop(s + 0.15));
  },
  ev = (l, c, s) => {
    const u = l.createOscillator(),
      f = l.createGain();
    ((u.type = 'triangle'),
      u.frequency.setValueAtTime(1e3, s),
      u.frequency.exponentialRampToValueAtTime(500, s + 0.1),
      ha(f, s, 0.16, 0.005, 0.1),
      u.connect(f).connect(c),
      u.start(s),
      u.stop(s + 0.13));
  },
  av = (l, c, s) => {
    (yt(l, c, 'sawtooth', 200, s, 0.3, 0.01, 0.35, 80),
      yt(l, c, 'triangle', 600, s + 0.05, 0.22, 0.01, 0.3, 1200),
      yt(l, c, 'triangle', 1200, s + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  nv = (l, c, s) => {
    const u = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((u.type = 'sawtooth'),
      u.frequency.setValueAtTime(1600, s),
      u.frequency.exponentialRampToValueAtTime(700, s + 0.08),
      (d.type = 'highpass'),
      (d.frequency.value = 800),
      ha(f, s, 0.22, 0.003, 0.09),
      u.connect(d).connect(f).connect(c),
      u.start(s),
      u.stop(s + 0.12));
  },
  lv = (l, c, s) => {
    (yt(l, c, 'sine', 130, s, 0.5, 0.01, 0.28, 40),
      pa(l, c, 0.12, s, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  iv = (l, c, s) => {
    (pa(l, c, 0.18, s, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      yt(l, c, 'triangle', 2200, s, 0.15, 0.002, 0.06, 1800));
  },
  cv = (l, c, s) => {
    const u = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((u.type = 'square'),
      u.frequency.setValueAtTime(900, s),
      u.frequency.exponentialRampToValueAtTime(1400, s + 0.05),
      (d.type = 'bandpass'),
      (d.frequency.value = 1500),
      (d.Q.value = 3),
      ha(f, s, 0.18, 0.002, 0.07),
      u.connect(d).connect(f).connect(c),
      u.start(s),
      u.stop(s + 0.1),
      pa(l, c, 0.05, s, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  sv = (l, c, s) => {
    (yt(l, c, 'triangle', 700, s, 0.18, 0.005, 0.05),
      yt(l, c, 'triangle', 1050, s + 0.04, 0.18, 0.005, 0.06));
  },
  ov = {
    laserShoot: nv,
    cannonShoot: lv,
    thunderShoot: iv,
    cutterShoot: cv,
    weaponSwitch: sv,
    activeLaser: Lg,
    activeCannon: $g,
    activeThunder: Hg,
    activeCutter: Ug,
    enemyKill: qg,
    bossWarn: kg,
    bossKill: Vg,
    machineHit: Gg,
    machineDown: Zg,
    waveClear: Yg,
    tierClear: Xg,
    tap: Jg,
    purchaseOk: Fg,
    reject: Ig,
    tabSwitch: Pg,
    dialogOpen: tv,
    dialogClose: ev,
    launch: av,
    resultClear: Qg,
    resultGameOver: Kg,
    resultRetreat: Wg,
  },
  uv = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function dh(l) {
  return Math.max(0, Math.min(1, l));
}
class rv {
  constructor() {
    ua(this, 'ctx', null);
    ua(this, 'seGain', null);
    ua(this, 'bgmGain', null);
    ua(this, 'masterGain', null);
    ua(this, 'lastPlayAt', new Map());
    ua(this, 'seVolume', 0.7);
    ua(this, 'bgmVolume', 0.5);
    ua(this, 'currentBgm', null);
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
      u = uv[c];
    if (u !== void 0) {
      const d = this.lastPlayAt.get(c) ?? 0;
      if (s - d < u) return;
      this.lastPlayAt.set(c, s);
    }
    const f = ov[c];
    f(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(c) {
    ((this.seVolume = dh(c)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(c) {
    ((this.bgmVolume = dh(c)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
  }
  getSeVolume() {
    return this.seVolume;
  }
  getBgmVolume() {
    return this.bgmVolume;
  }
  playBgm(c) {
    var u;
    if (
      !this.ctx ||
      !this.bgmGain ||
      (this.ctx.state === 'suspended' && this.ctx.resume(),
      ((u = this.currentBgm) == null ? void 0 : u.id) === c)
    )
      return;
    this.currentBgm != null && (this.currentBgm.track.stop(), (this.currentBgm = null));
    const s = Bg(c, this.ctx, this.bgmGain);
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
const Dt = new rv(),
  fv = '_content_11wqi_1',
  dv = { content: fv },
  mv = '_tabBar_rhd8d_2',
  hv = '_fullWidth_rhd8d_9',
  pv = '_tab_rhd8d_2',
  yv = '_tabActive_rhd8d_54',
  gv = '_tabDisabled_rhd8d_101',
  vv = '_tabIcon_rhd8d_107',
  _v = '_tabLabel_rhd8d_114',
  bv = '_badge_rhd8d_119',
  Sv = '_badgeActive_rhd8d_137',
  xv = '_indicator_rhd8d_158',
  Ge = {
    tabBar: mv,
    fullWidth: hv,
    tab: pv,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: yv,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: gv,
    tabIcon: vv,
    tabLabel: _v,
    badge: bv,
    badgeActive: Sv,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: xv,
  },
  jv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Av = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Tv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Ev = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Mv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Nv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  wv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  zv = { screw: Nv, bolt: Av, alloy: jv, laser: Mv, cannon: Tv, thunder: wv, cutter: Ev };
function Cv(l, c) {
  return l.replace(/\swidth="\d+"/, ` width="${c}"`).replace(/\sheight="\d+"/, ` height="${c}"`);
}
function Ut({ name: l, size: c = 16, color: s = 'currentColor', className: u }) {
  const f = zv[l];
  if (f)
    return r.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: u,
      style: { display: 'inline-flex', color: s, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: Cv(f, c) },
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
    className: u,
    'aria-hidden': !0,
  };
  switch (l) {
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
function Qs({
  tabs: l,
  value: c,
  onChange: s,
  variant: u = 'underline',
  size: f = 'md',
  fullWidth: d = !1,
  align: h = 'start',
}) {
  const p = G.useRef(null),
    [g, y] = G.useState({ left: 0, width: 0 });
  return (
    G.useEffect(() => {
      const _ = p.current;
      if (!_) return;
      const S = l.findIndex((B) => B.key === c);
      if (S < 0) return;
      const z = _.querySelectorAll('[role="tab"]')[S];
      if (!z) return;
      const E = _.getBoundingClientRect(),
        q = z.getBoundingClientRect();
      y({ left: q.left - E.left, width: q.width });
    }, [c, l]),
    r.jsxs('div', {
      ref: p,
      role: 'tablist',
      className: [
        Ge.tabBar,
        Ge[`variant-${u}`],
        Ge[`size-${f}`],
        Ge[`align-${h}`],
        d ? Ge.fullWidth : '',
      ]
        .filter(Boolean)
        .join(' '),
      children: [
        l.map((_) => {
          const S = _.key === c;
          return r.jsxs(
            'button',
            {
              type: 'button',
              role: 'tab',
              'aria-selected': S,
              disabled: _.disabled === !0,
              className: [Ge.tab, S ? Ge.tabActive : '', _.disabled === !0 ? Ge.tabDisabled : '']
                .filter(Boolean)
                .join(' '),
              onClick: () => {
                _.disabled !== !0 && s(_.key);
              },
              children: [
                _.iconName != null &&
                  r.jsx('span', {
                    className: Ge.tabIcon,
                    'aria-hidden': 'true',
                    children: r.jsx(Ut, { name: _.iconName, size: f === 'sm' ? 12 : 14 }),
                  }),
                r.jsx('span', { className: Ge.tabLabel, children: _.label }),
                _.badge != null &&
                  r.jsx('span', {
                    className: [Ge.badge, S ? Ge.badgeActive : ''].filter(Boolean).join(' '),
                    children: _.badge,
                  }),
              ],
            },
            _.key
          );
        }),
        u === 'underline' &&
          r.jsx('span', {
            className: Ge.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${g.left}px)`, width: g.width },
          }),
      ],
    })
  );
}
const Rv = '_shell_ka520_6',
  Ov = '_header_ka520_19',
  Bv = '_main_ka520_32',
  Dv = '_noScroll_ka520_43',
  Lv = '_footer_ka520_48',
  $v = '_battle_ka520_61',
  ti = { shell: Rv, header: Ov, main: Bv, noScroll: Dv, footer: Lv, battle: $v };
function fl({ header: l, footer: c, children: s, noScroll: u = !1, variant: f = 'default' }) {
  return r.jsxs('div', {
    className: [ti.shell, f === 'battle' ? ti.battle : ''].filter(Boolean).join(' '),
    children: [
      l != null && r.jsx('header', { className: ti.header, children: l }),
      r.jsx('main', {
        className: [ti.main, u ? ti.noScroll : ''].filter(Boolean).join(' '),
        children: s,
      }),
      c != null && r.jsx('footer', { className: ti.footer, children: c }),
    ],
  });
}
const Hv = '_nav_4erx0_2',
  Uv = '_tab_4erx0_10',
  qv = '_active_4erx0_33',
  kv = '_iconWrap_4erx0_38',
  Vv = '_badge_4erx0_51',
  sc = { nav: Hv, tab: Uv, active: qv, iconWrap: kv, badge: Vv },
  Gv = '_text_1wy1n_1',
  Zv = '_variant_heading_1_1wy1n_6',
  Yv = '_variant_heading_2_1wy1n_15',
  Xv = '_variant_heading_3_1wy1n_24',
  Qv = '_variant_body_1wy1n_33',
  Kv = '_variant_caption_1wy1n_41',
  Wv = '_variant_label_1wy1n_49',
  Jv = '_variant_numeric_l_1wy1n_58',
  Fv = '_variant_numeric_m_1wy1n_67',
  Iv = '_variant_numeric_s_1wy1n_76',
  Pv = '_color_default_1wy1n_85',
  t_ = '_color_mid_1wy1n_89',
  e_ = '_color_dim_1wy1n_93',
  a_ = '_color_disabled_1wy1n_97',
  n_ = '_color_primary_1wy1n_101',
  l_ = '_color_secondary_1wy1n_105',
  i_ = '_color_danger_1wy1n_109',
  c_ = '_color_success_1wy1n_113',
  s_ = '_color_warning_1wy1n_117',
  o_ = '_truncate_1wy1n_121',
  u_ = '_align_left_1wy1n_128',
  r_ = '_align_center_1wy1n_132',
  f_ = '_align_right_1wy1n_136',
  oc = {
    text: Gv,
    variant_heading_1: Zv,
    variant_heading_2: Yv,
    variant_heading_3: Xv,
    variant_body: Qv,
    variant_caption: Kv,
    variant_label: Wv,
    variant_numeric_l: Jv,
    variant_numeric_m: Fv,
    variant_numeric_s: Iv,
    color_default: Pv,
    color_mid: t_,
    color_dim: e_,
    color_disabled: a_,
    color_primary: n_,
    color_secondary: l_,
    color_danger: i_,
    color_success: c_,
    color_warning: s_,
    truncate: o_,
    align_left: u_,
    align_center: r_,
    align_right: f_,
  };
function d_(l) {
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
function Q({
  variant: l = 'body',
  children: c,
  as: s,
  color: u = 'default',
  className: f,
  truncate: d,
  align: h,
  style: p,
}) {
  const g = s ?? d_(l),
    y = l.replace(/-/g, '_'),
    _ = u === 'text' ? 'default' : u;
  return r.jsx(g, {
    className: [
      oc.text,
      oc[`variant_${y}`],
      oc[`color_${_}`],
      d ? oc.truncate : '',
      h ? oc[`align_${h}`] : '',
      f,
    ]
      .filter(Boolean)
      .join(' '),
    style: p,
    children: c,
  });
}
const m_ = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function jc({ active: l, onChange: c, badges: s }) {
  return r.jsx('nav', {
    className: sc.nav,
    'aria-label': 'メインナビゲーション',
    children: m_.map(({ key: u, label: f, iconName: d }) => {
      const h = u === l,
        p = s == null ? void 0 : s[u];
      return r.jsxs(
        'button',
        {
          type: 'button',
          className: [sc.tab, h ? sc.active : ''].filter(Boolean).join(' '),
          onClick: () => c(u),
          'aria-current': h ? 'page' : void 0,
          'aria-label': f,
          children: [
            r.jsxs('span', {
              className: sc.iconWrap,
              children: [
                r.jsx(Ut, {
                  name: d,
                  size: 22,
                  color: h ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                p != null &&
                  r.jsx('span', { className: sc.badge, 'aria-hidden': 'true', children: p }),
              ],
            }),
            r.jsx(Q, { variant: 'caption', color: h ? 'primary' : 'dim', children: f }),
          ],
        },
        u
      );
    }),
  });
}
const h_ = '_root_kv5uk_2',
  p_ = '_titleRow_kv5uk_8',
  y_ = '_left_kv5uk_17',
  g_ = '_center_kv5uk_24',
  v_ = '_right_kv5uk_33',
  __ = '_currencies_kv5uk_42',
  b_ = '_actions_kv5uk_49',
  S_ = '_tabBarSlot_kv5uk_56',
  jn = {
    root: h_,
    titleRow: p_,
    left: y_,
    center: g_,
    right: v_,
    currencies: __,
    actions: b_,
    tabBarSlot: S_,
  },
  x_ = '_root_i843c_2',
  j_ = '_icon_i843c_10',
  A_ = '_delta_i843c_30',
  T_ = '_deltaSm_i843c_37',
  E_ = '_deltaMd_i843c_41',
  M_ = '_deltaLg_i843c_45',
  N_ = '_subtle_i843c_50',
  w_ = '_currencyLabel_i843c_55',
  z_ = '_rankStamp_i843c_64',
  Aa = {
    root: x_,
    icon: j_,
    delta: A_,
    deltaSm: T_,
    deltaMd: E_,
    deltaLg: M_,
    subtle: N_,
    currencyLabel: w_,
    rankStamp: z_,
  },
  C_ = '_root_1wxcz_1',
  R_ = '_sizeSm_1wxcz_13',
  O_ = '_sizeMd_1wxcz_17',
  B_ = '_sizeLg_1wxcz_21',
  D_ = '_sizeXl_1wxcz_25',
  L_ = '_affix_1wxcz_29',
  el = { root: C_, sizeSm: R_, sizeMd: O_, sizeLg: B_, sizeXl: D_, affix: L_ };
function Mr(l) {
  let c = l.length;
  for (; c > 0 && l[c - 1] === 0; ) c--;
  return l.slice(0, c);
}
function uc(l) {
  let c = 0;
  for (let s = 0; s < l.length; s++) {
    const u = Math.floor(l[s] + c);
    ((l[s] = u % 1e3), (c = Math.floor(u / 1e3)));
  }
  for (; c > 0; ) (l.push(c % 1e3), (c = Math.floor(c / 1e3)));
  return Mr(l);
}
function $_(l, c) {
  for (; c !== 0; ) {
    const s = c;
    ((c = l % c), (l = s));
  }
  return l;
}
function H_(l) {
  const c = l.toString(),
    s = c.indexOf('.');
  if (s === -1) return { num: Math.round(l), den: 1 };
  const u = c.length - s - 1,
    f = Math.pow(10, u),
    d = Math.round(l * f),
    h = $_(Math.abs(d), f);
  return { num: d / h, den: f / h };
}
function U_(l) {
  let c = '',
    s = l;
  for (; s > 0; )
    ((s -= 1), (c = String.fromCharCode(65 + (s % 26)) + c), (s = Math.floor(s / 26)));
  return c;
}
const Ae = class Ae {
  constructor(c) {
    ua(this, 'digits');
    this.digits = c;
  }
  static fromNumber(c) {
    if (c <= 0) return Ae.ZERO;
    const s = [];
    let u = Math.floor(c);
    for (; u > 0; ) (s.push(u % 1e3), (u = Math.floor(u / 1e3)));
    return new Ae(Mr(s));
  }
  static fromString(c) {
    const s = c.trim();
    if (s === '' || s === '0') return Ae.ZERO;
    const u = [];
    let f = s.length;
    for (; f > 0; ) {
      const d = Math.max(0, f - 3);
      (u.push(parseInt(s.slice(d, f), 10)), (f = d));
    }
    return new Ae(Mr(u));
  }
  static fromJSON(c) {
    return new Ae(uc([...c]));
  }
  add(c) {
    const s = this.digits,
      u = c.digits,
      f = Math.max(s.length, u.length),
      d = new Array(f).fill(0);
    let h = 0;
    for (let p = 0; p < f; p++) {
      const g = (s[p] ?? 0) + (u[p] ?? 0) + h;
      ((d[p] = g % 1e3), (h = Math.floor(g / 1e3)));
    }
    return (h > 0 && d.push(h), new Ae(uc(d)));
  }
  sub(c) {
    if (this.compare(c) <= 0) return Ae.ZERO;
    const s = this.digits,
      u = c.digits,
      f = new Array(s.length).fill(0);
    let d = 0;
    for (let h = 0; h < s.length; h++) {
      let p = (s[h] ?? 0) - (u[h] ?? 0) - d;
      (p < 0 ? ((p += 1e3), (d = 1)) : (d = 0), (f[h] = p));
    }
    return new Ae(uc(f));
  }
  mulInt(c) {
    if (c <= 0 || this.isZero()) return Ae.ZERO;
    const s = this.digits,
      u = new Array(s.length).fill(0);
    let f = 0;
    for (let d = 0; d < s.length; d++) {
      const h = s[d] * c + f;
      ((u[d] = h % 1e3), (f = Math.floor(h / 1e3)));
    }
    for (; f > 0; ) (u.push(f % 1e3), (f = Math.floor(f / 1e3)));
    return new Ae(uc(u));
  }
  divInt(c) {
    if (c <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return Ae.ZERO;
    const s = this.digits,
      u = new Array(s.length).fill(0);
    let f = 0;
    for (let d = s.length - 1; d >= 0; d--) {
      const h = f * 1e3 + (s[d] ?? 0);
      ((u[d] = Math.floor(h / c)), (f = h % c));
    }
    return (f > 0 && (u[0] += 1), new Ae(uc(u)));
  }
  mulRational(c, s) {
    return this.mulInt(c).divInt(s);
  }
  mulNumber(c) {
    const { num: s, den: u } = H_(c);
    return this.mulRational(s, u);
  }
  compare(c) {
    const s = this.digits,
      u = c.digits;
    if (s.length !== u.length) return s.length < u.length ? -1 : 1;
    for (let f = s.length - 1; f >= 0; f--) {
      const d = s[f] ?? 0,
        h = u[f] ?? 0;
      if (d < h) return -1;
      if (d > h) return 1;
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
    for (let u = c - 2; u >= 0; u--) s += String(this.digits[u]).padStart(3, '0');
    return s;
  }
  toDisplay() {
    if (this.digits.length === 0) return '0';
    const c = this.digits.length,
      s = this.digits[c - 1];
    if (c === 1) return String(s);
    const u = c - 1,
      f = U_(u),
      d = this.digits[c - 2] ?? 0,
      h = Math.floor(d / 10);
    return `${s}.${String(h).padStart(2, '0')}${f}`;
  }
};
ua(Ae, 'ZERO', new Ae([]));
let K = Ae;
function q_(l) {
  if (l === '') return 0;
  let c = 0;
  for (let s = 0; s < l.length; s++) c = c * 26 + (l.charCodeAt(s) - 65 + 1);
  return c;
}
function k_(l) {
  if (l <= 0) return { color: 'var(--c-text)', glow: '0 0 6px rgba(232,239,255,0.35)' };
  const c = Math.min(1, (l - 1) / 19),
    s = 195 + c * 100,
    u = 0.86 - c * 0.14,
    f = 0.13 + c * 0.07,
    d = `oklch(${u.toFixed(3)} ${f.toFixed(3)} ${s.toFixed(1)})`,
    h = Math.min(0.95, u + 0.05),
    p = f + 0.05,
    g = `oklch(${h.toFixed(3)} ${p.toFixed(3)} ${s.toFixed(1)} / 0.55)`;
  return { color: d, glow: `0 0 8px ${g}` };
}
function V_(l) {
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
function G_(l) {
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
function zn({
  value: l,
  size: c = 'md',
  accentColor: s = 'scale',
  glow: u = !1,
  prefix: f,
  suffix: d,
  decimals: h,
  style: p,
}) {
  const g = typeof l == 'number' ? K.fromNumber(l) : l;
  let y;
  h != null && typeof l == 'number' ? (y = l.toFixed(h)) : (y = g.toDisplay());
  const _ = y.match(/^[\d.]+([A-Z]*)$/),
    S = _ ? _[1] : '',
    T = q_(S);
  let z, E;
  if (s === 'scale') {
    const F = k_(T);
    ((z = F.color), (E = u ? F.glow : void 0));
  } else ((z = V_(s)), (E = u ? G_(s) : void 0));
  const q = { sm: el.sizeSm, md: el.sizeMd, lg: el.sizeLg, xl: el.sizeXl }[c],
    B = { color: z, ...(E != null ? { textShadow: E } : {}), ...p };
  return r.jsxs('span', {
    className: `${el.root} ${q}`,
    style: B,
    children: [
      f != null && r.jsx('span', { className: el.affix, children: f }),
      y,
      d != null && r.jsx('span', { className: el.affix, children: d }),
    ],
  });
}
const Z_ = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  Y_ = { sm: 12, md: 16, lg: 22, xl: 28 };
function X_({ delta: l, sizeClass: c }) {
  const s = l === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return r.jsx('span', {
    className: `${Aa.delta} ${c}`,
    style: { color: s },
    'aria-hidden': 'true',
    children: l,
  });
}
function ri({
  currency: l,
  value: c,
  size: s = 'md',
  delta: u,
  showLabel: f,
  subtle: d,
  align: h = 'start',
  ranked: p,
}) {
  const g = typeof c == 'number' ? K.fromNumber(c) : c,
    y = Z_[l],
    _ = d ? 'var(--c-text-disabled)' : `var(${y.cssVar})`,
    S = u && !d ? { color: u === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: _ },
    T = { sm: Aa.deltaSm, md: Aa.deltaMd, lg: Aa.deltaLg, xl: Aa.deltaLg }[s],
    z = r.jsx(Ut, { name: l, size: Y_[s], color: _, className: Aa.icon }),
    E = r.jsxs(r.Fragment, {
      children: [
        u !== void 0 && !d && r.jsx(X_, { delta: u, sizeClass: T }),
        r.jsx(zn, { value: g, size: s, accentColor: 'primary', style: S }),
      ],
    });
  return r.jsxs('span', {
    className: [Aa.root, d ? Aa.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${y.label} ${g.toDisplay()}`,
    children: [
      h === 'end'
        ? r.jsxs(r.Fragment, { children: [E, z] })
        : r.jsxs(r.Fragment, { children: [z, E] }),
      f && r.jsx('span', { className: Aa.currencyLabel, 'aria-hidden': 'true', children: y.label }),
      p !== void 0 &&
        p !== '' &&
        r.jsx('span', {
          className: Aa.rankStamp,
          'data-rank': p,
          'aria-label': `rank ${p}`,
          children: p,
        }),
    ],
  });
}
const Q_ = '_iconButton_1fyi8_1',
  K_ = '_round_1fyi8_23',
  W_ = '_active_1fyi8_85',
  J_ = '_iconWrap_1fyi8_113',
  ei = {
    iconButton: Q_,
    round: K_,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: W_,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: J_,
  },
  F_ = { sm: 14, md: 18, lg: 22 };
function _c({
  icon: l,
  label: c,
  size: s = 'md',
  variant: u = 'ghost',
  shape: f = 'square',
  active: d = !1,
  disabled: h = !1,
  onClick: p,
}) {
  const g = u === 'default' ? 'ghost' : u,
    y = typeof l == 'string' ? r.jsx(Ut, { name: l, size: F_[s] }) : l;
  return r.jsx('button', {
    type: 'button',
    className: [
      ei.iconButton,
      ei[`variant-${g}`],
      ei[`size-${s}`],
      f === 'round' ? ei.round : '',
      d ? ei.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: p,
    'aria-label': c,
    'aria-pressed': d,
    'aria-disabled': h,
    children: r.jsx('span', { className: ei.iconWrap, 'aria-hidden': 'true', children: y }),
  });
}
const mh = (l) => {
    let c;
    const s = new Set(),
      u = (y, _) => {
        const S = typeof y == 'function' ? y(c) : y;
        if (!Object.is(S, c)) {
          const T = c;
          ((c = (_ ?? (typeof S != 'object' || S === null)) ? S : Object.assign({}, c, S)),
            s.forEach((z) => z(c, T)));
        }
      },
      f = () => c,
      p = {
        setState: u,
        getState: f,
        getInitialState: () => g,
        subscribe: (y) => (s.add(y), () => s.delete(y)),
      },
      g = (c = l(u, f, p));
    return p;
  },
  I_ = (l) => (l ? mh(l) : mh),
  P_ = (l) => l;
function tb(l, c = P_) {
  const s = Hs.useSyncExternalStore(
    l.subscribe,
    Hs.useCallback(() => c(l.getState()), [l, c]),
    Hs.useCallback(() => c(l.getInitialState()), [l, c])
  );
  return (Hs.useDebugValue(s), s);
}
const eb = (l) => {
    const c = I_(l),
      s = (u) => tb(c, u);
    return (Object.assign(s, c), s);
  },
  ab = (l) => eb,
  Kh = [
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
function Gr(l, c) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, c));
}
function ol(l) {
  return 1 + 0.1 * l;
}
function Wh(l, c, s) {
  let u = 0;
  for (let f = 0; f < s; f++) u += Gr(l, c + f);
  return u;
}
function Jh(l, c, s) {
  let u = K.ZERO,
    f = 0;
  for (;;) {
    const d = K.fromNumber(Gr(l, c + f)),
      h = u.add(d);
    if (h.gt(s) || ((u = h), f++, f >= 1e4)) break;
  }
  return { lvDelta: f, totalCost: u };
}
const hh = {
  isRunActive: !1,
  screw: K.ZERO,
  machineHp: K.ZERO,
  machineMaxHp: K.ZERO,
  baseMachineMaxHp: K.ZERO,
  currentTier: 1,
  currentWave: 1,
  currentWeapon: 'laser',
  weaponSwitchCdSec: 0,
  activeCdSec: 0,
  isAutoActive: !1,
  isPaused: !1,
  runStartBolt: K.ZERO,
  runStartAlloy: K.ZERO,
};
function nb(l, c, s) {
  return l.lt(c) ? c : l.gt(s) ? s : l;
}
const lb = (l, c) => ({
    ...hh,
    startRun: ({ initialWeapon: s, baseMachineMaxHp: u }) => {
      const f = c().runWorkshopLevels.hpMul,
        d = ol(f),
        h = u.mulNumber(d),
        p = c();
      (l({
        isRunActive: !0,
        screw: K.ZERO,
        machineHp: h,
        machineMaxHp: h,
        baseMachineMaxHp: u,
        currentTier: 1,
        currentWave: 1,
        currentWeapon: s,
        weaponSwitchCdSec: 0,
        activeCdSec: 0,
        isAutoActive: !1,
        isPaused: !1,
        runStartBolt: p.bolt,
        runStartAlloy: p.alloy,
      }),
        c().resetRunWorkshop());
    },
    endRun: () => {
      (l(hh), c().resetRunWorkshop());
    },
    addScrew: (s) => l((u) => ({ screw: u.screw.add(s) })),
    spendScrew: (s) => {
      const u = c().screw;
      return u.lt(s) ? !1 : (l({ screw: u.sub(s) }), !0);
    },
    setMachineHp: (s) => l((u) => ({ machineHp: nb(s, K.ZERO, u.machineMaxHp) })),
    damageHp: (s) =>
      l((u) => {
        const f = u.machineHp.sub(s);
        return { machineHp: f.lt(K.ZERO) ? K.ZERO : f };
      }),
    recalcMachineMaxHpFromHpMul: (s) => {
      const u = c(),
        f = u.machineMaxHp,
        d = u.machineHp,
        h = f.sub(d),
        p = h.lt(K.ZERO) ? K.ZERO : h,
        g = u.baseMachineMaxHp.mulNumber(ol(s)),
        y = g.sub(p),
        _ = y.lt(K.ZERO) ? K.ZERO : y;
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
      l((u) => ({
        weaponSwitchCdSec: Math.max(0, u.weaponSwitchCdSec - s),
        activeCdSec: Math.max(0, u.activeCdSec - s),
      })),
  }),
  ib = { bolt: K.ZERO, alloy: K.ZERO },
  cb = (l, c) => ({
    ...ib,
    addBolt: (s) => l((u) => ({ bolt: u.bolt.add(s) })),
    spendBolt: (s) => {
      const u = c().bolt;
      return u.lt(s) ? !1 : (l({ bolt: u.sub(s) }), !0);
    },
    addAlloy: (s) => l((u) => ({ alloy: u.alloy.add(s) })),
    spendAlloy: (s) => {
      const u = c().alloy;
      return u.lt(s) ? !1 : (l({ alloy: u.sub(s) }), !0);
    },
    resetCurrencies: () => l({ bolt: K.ZERO, alloy: K.ZERO }),
  }),
  ui = 6,
  sb = { equippedPatches: new Map() },
  ob = (l, c) => ({
    ...sb,
    equipPatch: (s, u, f) => {
      const d = c().equippedPatches;
      for (const [h, p] of d) if (p.name === u && h !== s) return !1;
      return (
        l((h) => {
          const p = new Map(h.equippedPatches);
          return (p.set(s, { name: u, tier: f }), { equippedPatches: p });
        }),
        !0
      );
    },
    unequipPatch: (s) => {
      l((u) => {
        const f = new Map(u.equippedPatches);
        return (f.delete(s), { equippedPatches: f });
      });
    },
    clearEquippedPatches: () => l({ equippedPatches: new Map() }),
  }),
  Fh = 'tower-like-game',
  Xs = 1,
  J = {
    profile: 'profile',
    currencies: 'currencies',
    machine: 'machine',
    weapons: 'weapons',
    patches: 'patches',
    equippedPatches: 'equippedPatches',
    settings: 'settings',
  },
  Ks = [
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
  Ih = {
    id: 'singleton',
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    schemaVersion: Xs,
  },
  Ph = { id: 'singleton', bolt: [], alloy: [] },
  t1 = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  e1 = { id: 'singleton', bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 };
function a1() {
  return Object.fromEntries(Ks.map((l) => [l, 0]));
}
const ub = { machineLevels: a1() },
  rb = (l) => ({
    ...ub,
    incrementMachineLv: (c) =>
      l((s) => ({ machineLevels: { ...s.machineLevels, [c]: s.machineLevels[c] + 1 } })),
    setMachineLv: (c, s) => l((u) => ({ machineLevels: { ...u.machineLevels, [c]: s } })),
    resetMachine: () => l({ machineLevels: a1() }),
  });
function Nr(l, c) {
  return `${l}#${c}`;
}
const fb = { patches: new Map() },
  db = (l, c) => ({
    ...fb,
    addPatch: (s, u, f = 1) => {
      const d = Nr(s, u);
      l((h) => {
        const p = new Map(h.patches),
          g = p.get(d);
        return (
          g ? p.set(d, { ...g, count: g.count + f }) : p.set(d, { name: s, tier: u, count: f }),
          { patches: p }
        );
      });
    },
    consumePatch: (s, u, f = 1) => {
      const d = Nr(s, u),
        h = c().patches.get(d);
      return !h || h.count < f
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
        const u = new Map(s.patches);
        for (const [f, d] of u) d.count <= 0 && u.delete(f);
        return { patches: u };
      });
    },
    resetPatches: () => l({ patches: new Map() }),
  }),
  ph = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  mb = (l) => ({
    ...ph,
    updateHighest: (c, s) =>
      l((u) =>
        c > u.highestTier
          ? { highestTier: c, highestWave: s }
          : c === u.highestTier
            ? { highestWave: Math.max(u.highestWave, s) }
            : {}
      ),
    addPlayTimeSec: (c) => l((s) => ({ totalPlayTimeSec: s.totalPlayTimeSec + c })),
    incrementRuns: () => l((c) => ({ totalRuns: c.totalRuns + 1 })),
    addEnemiesKilled: (c) => l((s) => ({ totalEnemiesKilled: s.totalEnemiesKilled + c })),
    setLastPlayedAt: (c) => l({ lastPlayedAt: c }),
    resetProfile: (c) => l({ ...ph, createdAt: c, lastPlayedAt: c }),
  }),
  n1 = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
  hb = { runWorkshopLevels: n1 },
  pb = (l, c) => ({
    ...hb,
    upgradeRunWorkshop: (s, u) => {
      const f = Kh.find((_) => _.key === s);
      if (f == null) return !1;
      const d = c().runWorkshopLevels[s];
      let h, p;
      if (u === 'max') {
        const _ = Jh(f, d, c().screw);
        if (_.lvDelta === 0) return !1;
        ((h = _.lvDelta), (p = _.totalCost));
      } else ((h = u), (p = K.fromNumber(Wh(f, d, u))));
      if (!c().spendScrew(p)) return !1;
      const y = d + h;
      return (
        l((_) => ({ runWorkshopLevels: { ..._.runWorkshopLevels, [s]: y } })),
        s === 'hpMul' && c().recalcMachineMaxHpFromHpMul(y),
        !0
      );
    },
    resetRunWorkshop: () => l({ runWorkshopLevels: n1 }),
  }),
  yh = { bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  yb = (l) => ({
    ...yh,
    setBgmVolume: (c) => l({ bgmVolume: Math.max(0, Math.min(1, c)) }),
    setSeVolume: (c) => l({ seVolume: Math.max(0, Math.min(1, c)) }),
    setVibrationEnabled: (c) => l({ vibrationEnabled: c }),
    resetSettings: () => l(yh),
  }),
  gh = { weaponLv: 0, initialWeapon: 'laser' },
  gb = (l) => ({
    ...gh,
    incrementWeaponLv: () => l((c) => ({ weaponLv: c.weaponLv + 1 })),
    setWeaponLv: (c) => l({ weaponLv: c }),
    setInitialWeapon: (c) => l({ initialWeapon: c }),
    resetWeapons: () => l(gh),
  }),
  V = ab()((...l) => ({
    ...mb(...l),
    ...cb(...l),
    ...rb(...l),
    ...gb(...l),
    ...db(...l),
    ...ob(...l),
    ...yb(...l),
    ...lb(...l),
    ...pb(...l),
  }));
function Ac({ title: l, subtitle: c, onBack: s, currencies: u, tabBar: f, actions: d }) {
  const h = V((T) => T.bolt),
    p = V((T) => T.alloy),
    g = V((T) => T.screw),
    y = V((T) => T.isRunActive),
    _ = (u ?? []).filter((T) => (T === 'screw' ? y : !0));
  function S(T) {
    switch (T) {
      case 'bolt':
        return h;
      case 'alloy':
        return p;
      case 'screw':
        return g;
    }
  }
  return r.jsxs('div', {
    className: jn.root,
    children: [
      r.jsxs('div', {
        className: jn.titleRow,
        children: [
          r.jsx('div', {
            className: jn.left,
            children:
              s != null &&
              r.jsx(_c, {
                icon: 'chevron-left',
                label: '戻る',
                variant: 'ghost',
                size: 'md',
                onClick: s,
              }),
          }),
          r.jsxs('div', {
            className: jn.center,
            children: [
              r.jsx(Q, { variant: 'heading-3', truncate: !0, align: 'center', children: l }),
              c != null &&
                r.jsx(Q, { variant: 'caption', color: 'dim', align: 'center', children: c }),
            ],
          }),
          r.jsxs('div', {
            className: jn.right,
            children: [
              _.length > 0 &&
                r.jsx('div', {
                  className: jn.currencies,
                  children: _.map((T) => r.jsx(ri, { currency: T, value: S(T), size: 'sm' }, T)),
                }),
              d != null && r.jsx('div', { className: jn.actions, children: d }),
            ],
          }),
        ],
      }),
      f != null && r.jsx('div', { className: jn.tabBarSlot, children: f }),
    ],
  });
}
const vb = '_tab_1nc83_3',
  _b = { tab: vb },
  bb = '_wrapper_1opqp_3',
  Sb = '_active_1opqp_12',
  xb = '_card_1opqp_12',
  jb = '_locked_1opqp_18',
  Ab = '_tall_1opqp_34',
  Tb = '_iconTile_1opqp_37',
  Eb = '_headerText_1opqp_42',
  Mb = '_description_1opqp_45',
  Nb = '_name_1opqp_48',
  wb = '_wide_1opqp_53',
  zb = '_body_1opqp_61',
  Cb = '_header_1opqp_42',
  Rb = '_statGrid_1opqp_121',
  Ob = '_statChip_1opqp_129',
  Bb = '_statLabel_1opqp_140',
  Db = '_statValue_1opqp_147',
  Lb = '_lockedBadge_1opqp_158',
  Se = {
    wrapper: bb,
    active: Sb,
    card: xb,
    locked: jb,
    tall: Ab,
    iconTile: Tb,
    headerText: Eb,
    description: Mb,
    name: Nb,
    wide: wb,
    body: zb,
    header: Cb,
    statGrid: Rb,
    statChip: Ob,
    statLabel: Bb,
    statValue: Db,
    lockedBadge: Lb,
  },
  $b = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function l1({
  weapon: l,
  name: c,
  description: s,
  stats: u,
  layout: f = 'tall',
  active: d = !1,
  locked: h = !1,
  onClick: p,
}) {
  const g = f === 'wide',
    y = p != null && !h;
  return r.jsx('div', {
    className: [Se.wrapper, d ? Se.active : '', h ? Se.locked : '', g ? Se.wide : Se.tall]
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
    children: r.jsxs('div', {
      className: Se.card,
      style: y ? { cursor: 'pointer' } : void 0,
      children: [
        r.jsx('div', {
          className: Se.iconTile,
          'aria-hidden': !0,
          children: r.jsx(Ut, { name: l, size: g ? 40 : 52 }),
        }),
        r.jsxs('div', {
          className: Se.body,
          children: [
            r.jsx('div', {
              className: Se.header,
              children: r.jsxs('div', {
                className: Se.headerText,
                children: [
                  r.jsx('span', { className: Se.name, children: c }),
                  s != null &&
                    s.length > 0 &&
                    r.jsx('span', { className: Se.description, children: s }),
                ],
              }),
            }),
            !h &&
              u.length > 0 &&
              r.jsx('div', {
                className: Se.statGrid,
                children: u.map((_) => {
                  const S =
                    _.suffix != null
                      ? `${typeof _.value == 'number' ? _.value.toLocaleString() : _.value}${_.suffix}`
                      : typeof _.value == 'number'
                        ? _.value.toLocaleString()
                        : _.value;
                  return r.jsxs(
                    'div',
                    {
                      className: Se.statChip,
                      children: [
                        r.jsx('span', { className: Se.statLabel, children: _.label }),
                        r.jsx('span', {
                          className: Se.statValue,
                          style: _.accent != null ? { color: $b[_.accent] } : void 0,
                          children: S,
                        }),
                      ],
                    },
                    _.label
                  );
                }),
              }),
            h &&
              r.jsxs('div', {
                className: Se.lockedBadge,
                children: [
                  r.jsx(Ut, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
                  r.jsx(Q, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
const Ws = [
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
function Sc(l, c) {
  switch (l.growthType) {
    case 'multiply':
      return Math.ceil(l.baseValue * Math.pow(l.growthFactor, c));
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
function Zr(l, c) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, c));
}
function vr(l, c, s) {
  let u = 0;
  for (let f = 0; f < s && !(l.maxLv != null && c + f >= l.maxLv); f++) u += Zr(l, c + f);
  return u;
}
function Hb(l, c, s) {
  let u = 0,
    f = s,
    d = c;
  for (let h = 0; h < 1e4 && !(l.maxLv != null && d >= l.maxLv); h++) {
    const p = K.fromNumber(Zr(l, d));
    if (f.lt(p)) break;
    ((f = f.sub(p)), (d += 1), (u += 1));
  }
  return u;
}
function i1(l, c) {
  if (l.isZero()) return K.ZERO;
  if (c <= 0) return l;
  if (c >= 1) return K.ZERO;
  const s = 1 - c;
  return l.mulNumber(s);
}
function Js(l, c) {
  return l <= 0 ? !1 : l >= 1 ? !0 : c() < l;
}
function Fs(l, c, s) {
  const { machine: u, weapon: f, isCrit: d } = l;
  let h = u.baseAttack.mulNumber(f.damageMultiplier);
  d && (h = h.mulNumber(u.critMultiplier));
  const p = h.sub(c),
    g = i1(p, s);
  return { rawDmg: h, finalDmg: g, isCrit: d };
}
function Ub(l, c) {
  const s = l.sub(c.defense);
  return i1(s, c.damageReduction);
}
const qb = 0.5,
  kb = 2,
  Vb = 30,
  Gb = 25,
  Zb = 5,
  Yb = 20;
function Yr(l) {
  const c = Math.max(0, Math.floor(l)),
    s = kb * Math.pow(1.02, c),
    u = Math.min(10, qb * (1 + 0.03 * c)),
    f = Vb + 0.5 * c,
    d = Yb * (1 + 0.05 * c);
  return {
    attackPerSec: u,
    splashRadius: f,
    damageMul: s,
    volleyCdSec: Gb,
    volleyDamageMul: d,
    volleyShots: Zb,
  };
}
function _r(l, c, s, u) {
  const f = l - s,
    d = c - u;
  return Math.sqrt(f * f + d * d);
}
function Xb(l, c, s, u) {
  if (s.length === 0) return { hits: [], blastX: 50, blastY: 50 };
  const f = 50,
    d = 50;
  let h = s[0],
    p = _r(f, d, h.position.x, h.position.y);
  for (let T = 1; T < s.length; T++) {
    const z = s[T],
      E = _r(f, d, z.position.x, z.position.y);
    E < p && ((p = E), (h = z));
  }
  const g = h.position.x,
    y = h.position.y,
    _ = Js(l.critRate, u),
    S = [];
  for (const T of s)
    if (_r(g, y, T.position.x, T.position.y) <= c.splashRadius) {
      const E = Fs({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: _ }, K.ZERO, 0);
      S.push({ enemyId: T.id, damage: E.finalDmg, crit: _ });
    }
  return { hits: S, blastX: g, blastY: y };
}
const Qb = 5,
  Kb = 80,
  Wb = 1,
  Jb = 0.6;
function Xr(l) {
  const c = Qb * (1 + 0.03 * l),
    s = Kb + 0.5 * l,
    u = Math.floor(Wb + 0.05 * l),
    f = Jb * Math.pow(1.02, l);
  return {
    attackPerSec: c,
    orbitRadius: s,
    simultaneousHits: u,
    damageMul: f,
    overdriveCdSec: Fb,
    overdriveDurationSec: Ib,
    overdriveAttackSpeedMul: Pb,
    overdriveDamageMul: 1,
  };
}
const Fb = 35,
  Ib = 8,
  Pb = 3;
function t2(l, c, s, u, f) {
  const h = s.slice(0, c.simultaneousHits).map((g) => {
      const y = Js(l.critRate, f),
        _ = Fs({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: y }, K.ZERO, 0);
      return { enemyId: g.id, damage: _.finalDmg, crit: y };
    }),
    p = (u + 360 / c.attackPerSec) % 360;
  return { hits: h, angle: p };
}
const e2 = 2.5,
  a2 = 0.4;
function Qr(l) {
  const c = Math.max(0, l),
    s = e2 * (1 + 0.03 * c),
    u = Math.floor(1 + 0.1 * c),
    f = a2 * Math.pow(1.02, c),
    d = 10 * (1 + 0.05 * c);
  return { attackPerSec: s, pierce: u, damageMul: f, megaCdSec: n2, megaDamageMul: d };
}
const n2 = 20;
function l2(l, c, s, u) {
  if (s.length === 0) return { hits: [], beamX: 0, beamY: 0 };
  const f = s.slice(0, c.pierce),
    d = f.map((y) => {
      const _ = Js(l.critRate, u),
        S = Fs({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: _ }, K.ZERO, 0);
      return { enemyId: y.id, damage: S.finalDmg, crit: _ };
    }),
    h = f[f.length - 1],
    p = h.position.x,
    g = h.position.y;
  return { hits: d, beamX: p, beamY: g };
}
const i2 = 3,
  c2 = 0.9,
  s2 = 30,
  o2 = 0.18,
  u2 = 2.5;
function Kr(l) {
  const c = Math.max(0, l),
    s = o2 * Math.pow(1.02, c),
    u = Math.min(10, u2 * (1 + 0.03 * c)),
    f = 15 * (1 + 0.05 * c);
  return {
    attackPerSec: u,
    chainCount: i2,
    chainFalloff: c2,
    damageMul: s,
    plasmaCdSec: s2,
    plasmaDamageMul: f,
  };
}
function r2(l, c, s, u) {
  if (s.length === 0) return { hits: [], path: [] };
  const f = s.slice(0, c.chainCount),
    d = [],
    h = [];
  for (const p of f) {
    const g = Js(l.critRate, u),
      y = Fs({ machine: l, weapon: { damageMultiplier: c.damageMul }, isCrit: g }, K.ZERO, 0);
    (d.push({ enemyId: p.id, damage: y.finalDmg, crit: g }),
      h.push({ x: p.position.x, y: p.position.y }));
  }
  return { hits: d, path: h };
}
function fi(l) {
  return Math.round(l * 10) / 10;
}
function c1(l) {
  const c = Ws.find((s) => s.key === 'baseAttack');
  return c != null ? Sc(c, l) : 1;
}
function s1(l) {
  const c = Ws.find((s) => s.key === 'range');
  return c != null ? Sc(c, l) : 150;
}
function o1(l, c, s) {
  const u = Qr(l);
  return [
    { label: 'DMG', value: Math.round(c * u.damageMul), accent: 'primary' },
    { label: '貫通', value: u.pierce },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射', value: fi(u.attackPerSec), suffix: '/s' },
  ];
}
function u1(l, c, s) {
  const u = Yr(l);
  return [
    { label: 'DMG', value: Math.round(c * u.damageMul), accent: 'primary' },
    { label: '半径', value: fi(u.splashRadius), suffix: 'm' },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射', value: fi(u.attackPerSec), suffix: '/s' },
  ];
}
function r1(l, c, s) {
  const u = Kr(l);
  return [
    { label: 'DMG', value: Math.round(c * u.damageMul), accent: 'primary' },
    { label: 'ターゲット数', value: u.chainCount },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射', value: fi(u.attackPerSec), suffix: '/s' },
  ];
}
function f1(l, c) {
  const s = Xr(l);
  return [
    { label: 'DMG', value: Math.round(c * s.damageMul), accent: 'primary' },
    { label: '旋回半径', value: fi(s.orbitRadius), suffix: 'm' },
    { label: '同時', value: s.simultaneousHits },
    { label: '旋回速度', value: fi(s.attackPerSec), suffix: '/s' },
  ];
}
const f2 = [
  { kind: 'laser', name: 'LASER', description: '高速直進ビーム。', buildStats: o1 },
  { kind: 'cannon', name: 'CANNON', description: '範囲爆発。', buildStats: u1 },
  { kind: 'thunder', name: 'THUNDER', description: '同時 3 体攻撃。', buildStats: r1 },
  { kind: 'cutter', name: 'CUTTER', description: '旋回斬撃。', buildStats: (l, c) => f1(l, c) },
];
function d2() {
  const l = V((f) => f.weaponLv),
    c = V((f) => f.machineLevels),
    s = c1(c.baseAttack),
    u = s1(c.range);
  return r.jsx('div', {
    className: _b.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: f2.map((f) =>
      r.jsx(
        l1,
        {
          weapon: f.kind,
          name: f.name,
          description: f.description,
          stats: f.buildStats(l, s, u),
          layout: 'wide',
        },
        f.kind
      )
    ),
  });
}
const m2 = '_tab_1oky8_3',
  h2 = '_topRow_1oky8_9',
  p2 = '_description_1oky8_15',
  y2 = '_previewCard_1oky8_21',
  g2 = '_previewLabel_1oky8_25',
  v2 = '_impactGrid_1oky8_32',
  _2 = '_impactRow_1oky8_37',
  b2 = '_impactRowBordered_1oky8_45',
  S2 = '_impactLabel_1oky8_49',
  x2 = '_impactValues_1oky8_55',
  j2 = '_arrow_1oky8_62',
  ra = {
    tab: m2,
    topRow: h2,
    description: p2,
    previewCard: y2,
    previewLabel: g2,
    impactGrid: v2,
    impactRow: _2,
    impactRowBordered: b2,
    impactLabel: S2,
    impactValues: x2,
    arrow: j2,
  },
  A2 = '_card_1403j_1',
  T2 = '_interactive_1403j_97',
  rc = {
    card: A2,
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
    interactive: T2,
  };
function dl({
  children: l,
  variant: c = 'default',
  interactive: s = !1,
  padding: u = 'md',
  radius: f,
  className: d,
}) {
  const h = [
    rc.card,
    rc[`variant-${c}`],
    rc[`padding-${u}`],
    f != null ? rc[`radius-${f}`] : '',
    s ? rc.interactive : '',
    d ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return r.jsx('div', { className: h, children: l });
}
const E2 = '_root_168oy_2',
  M2 = '_header_168oy_15',
  N2 = '_iconWrap_168oy_22',
  w2 = '_title_168oy_34',
  z2 = '_lvBadge_168oy_47',
  C2 = '_description_168oy_60',
  R2 = '_valueRow_168oy_66',
  O2 = '_valueBefore_168oy_74',
  B2 = '_valueAfter_168oy_83',
  D2 = '_arrow_168oy_93',
  L2 = '_buttons_168oy_100',
  $2 = '_btnCol_168oy_105',
  H2 = '_btn_168oy_105',
  U2 = '_btnPrimary_168oy_132',
  q2 = '_btnSecondary_168oy_139',
  k2 = '_btnWarning_168oy_146',
  V2 = '_costRow_168oy_172',
  G2 = '_costNum_168oy_181',
  Z2 = '_costDisabled_168oy_190',
  ue = {
    root: E2,
    header: M2,
    iconWrap: N2,
    title: w2,
    lvBadge: z2,
    description: C2,
    valueRow: R2,
    valueBefore: O2,
    valueAfter: B2,
    arrow: D2,
    buttons: L2,
    btnCol: $2,
    btn: H2,
    btnPrimary: U2,
    btnSecondary: q2,
    btnWarning: k2,
    costRow: V2,
    costNum: G2,
    costDisabled: Z2,
  },
  Y2 = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  X2 = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  Q2 = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  K2 = { primary: ue.btnPrimary, secondary: ue.btnSecondary, warning: ue.btnWarning },
  W2 = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function br(l) {
  return l instanceof K ? l.toDisplay() : l.toLocaleString();
}
function Wr({
  title: l,
  description: c,
  iconName: s,
  iconColor: u,
  currentLabel: f,
  before: d,
  after: h,
  beforeSuffix: p = '',
  currency: g = 'bolt',
  accent: y,
  options: _ = [],
  maxed: S = !1,
  onUpgrade: T,
}) {
  const z = y ?? Q2[g],
    E = Y2[z],
    q = u ?? E,
    B = K2[z],
    F = W2[z];
  return r.jsxs('div', {
    className: ue.root,
    role: 'group',
    'aria-label': l,
    'data-maxed': S,
    children: [
      r.jsxs('div', {
        className: ue.header,
        children: [
          s != null &&
            r.jsx('span', {
              className: ue.iconWrap,
              children: r.jsx(Ut, { name: s, size: 14, color: q }),
            }),
          r.jsx('span', { className: ue.title, children: l }),
          f != null &&
            !S &&
            r.jsx('span', {
              className: ue.lvBadge,
              style: { color: E, boxShadow: X2[z] },
              children: f,
            }),
          S &&
            r.jsx('span', {
              className: ue.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      c != null &&
        c.length > 0 &&
        r.jsx(Q, { variant: 'caption', color: 'dim', className: ue.description, children: c }),
      d != null &&
        r.jsxs('div', {
          className: ue.valueRow,
          children: [
            r.jsxs('span', { className: ue.valueBefore, children: [br(d), p] }),
            h != null &&
              !S &&
              r.jsxs(r.Fragment, {
                children: [
                  r.jsx('span', { className: ue.arrow, children: '→' }),
                  r.jsxs('span', {
                    className: ue.valueAfter,
                    style: { color: E, textShadow: `0 0 5px ${F}` },
                    children: [br(h), p],
                  }),
                ],
              }),
          ],
        }),
      !S &&
        _.length > 0 &&
        r.jsx('div', {
          className: ue.buttons,
          style: { gridTemplateColumns: `repeat(${_.length}, 1fr)` },
          children: _.map((C) => {
            const ot = C.disabled === !0;
            return r.jsxs(
              'div',
              {
                className: ue.btnCol,
                children: [
                  r.jsx('button', {
                    type: 'button',
                    className: `${ue.btn} ${B}`,
                    disabled: ot,
                    onClick: ot ? void 0 : () => (T == null ? void 0 : T(C.amount)),
                    children: C.amount,
                  }),
                  r.jsx('div', {
                    className: ue.costRow,
                    children: r.jsx('span', {
                      className: `${ue.costNum} ${ot ? ue.costDisabled : ''}`,
                      children: br(C.cost),
                    }),
                  }),
                ],
              },
              C.amount
            );
          }),
        }),
    ],
  });
}
function Jr(l) {
  const c = Math.ceil(200 * Math.pow(1.12, l));
  return K.fromNumber(c);
}
function vh(l, c) {
  let s = K.ZERO;
  for (let u = 0; u < c; u++) s = s.add(Jr(l + u));
  return s;
}
function J2(l, c) {
  let s = c,
    u = 0;
  for (;;) {
    const f = Jr(l + u);
    if (s.lt(f) || ((s = s.sub(f)), u++, u > 1e4)) break;
  }
  return u;
}
function _h(l) {
  return Math.pow(1.02, l);
}
const bh = { laser: 120 };
function F2(l) {
  const c = l + 1,
    s = _h(l),
    u = _h(c);
  return [
    { label: 'LASER DMG', before: Math.round(bh.laser * s), after: Math.round(bh.laser * u) },
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
function I2() {
  const l = V((E) => E.weaponLv),
    c = V((E) => E.alloy),
    s = V((E) => E.incrementWeaponLv),
    u = V((E) => E.setWeaponLv),
    f = V((E) => E.spendAlloy),
    d = Jr(l),
    h = vh(l, 5),
    p = J2(l, c),
    g = vh(l, p),
    y = !c.lt(d),
    _ = p >= 5,
    S = p >= 1,
    T = F2(l);
  function z(E) {
    E === '+1'
      ? f(d) && s()
      : E === '+5'
        ? f(h) && u(l + 5)
        : E === 'MAX' && p > 0 && f(g) && u(l + p);
  }
  return r.jsxs('div', {
    className: ra.tab,
    role: 'tabpanel',
    'aria-label': '武器強化',
    children: [
      r.jsxs('div', {
        className: ra.topRow,
        children: [
          r.jsx(Q, {
            variant: 'caption',
            color: 'mid',
            className: ra.description,
            children: '全 4 武器に共通で効く強化です。',
          }),
          r.jsx(ri, { currency: 'alloy', value: c, size: 'sm' }),
        ],
      }),
      r.jsx(Wr, {
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
          { amount: '+5', cost: h, disabled: !_ },
          { amount: 'MAX', cost: g, disabled: !S },
        ],
        onUpgrade: z,
      }),
      r.jsxs(dl, {
        variant: 'sunken',
        padding: 'md',
        className: ra.previewCard,
        children: [
          r.jsx(Q, {
            variant: 'label',
            color: 'dim',
            className: ra.previewLabel,
            children: '次 Lv での効果プレビュー',
          }),
          r.jsx('div', {
            className: ra.impactGrid,
            children: T.map((E, q) =>
              r.jsxs(
                'div',
                {
                  className: [ra.impactRow, q > 0 ? ra.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    r.jsx(Q, {
                      variant: 'caption',
                      color: 'mid',
                      className: ra.impactLabel,
                      children: E.label,
                    }),
                    r.jsxs('span', {
                      className: ra.impactValues,
                      children: [
                        r.jsx(zn, {
                          value: E.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: E.suffix,
                          decimals: E.suffix === 'm' ? 1 : 0,
                        }),
                        r.jsx('span', { className: ra.arrow, children: '→' }),
                        r.jsx(zn, {
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
const d1 = G.createContext(null);
function P2({ children: l, initialScreen: c }) {
  const [s, u] = G.useState(c ?? 'title'),
    f = G.useCallback((d) => {
      u(d);
    }, []);
  return r.jsx(d1.Provider, { value: { screen: s, navigate: f }, children: l });
}
function Cn() {
  const l = G.useContext(d1);
  if (!l) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return l;
}
const tS = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function eS(l = {}) {
  const { initialTab: c = 'details' } = l,
    [s, u] = G.useState(c),
    { screen: f, navigate: d } = Cn();
  return r.jsx(fl, {
    header: r.jsx(Ac, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => d('preparation'),
      tabBar: r.jsx(Qs, { tabs: tS, value: s, onChange: u, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(jc, { active: f, onChange: (h) => d(h) }),
    children: r.jsxs('div', {
      className: dv.content,
      children: [s === 'details' && r.jsx(d2, {}), s === 'upgrade' && r.jsx(I2, {})],
    }),
  });
}
const aS = '_root_1ozz7_1',
  nS = '_battleFooter_1ozz7_10',
  lS = '_overlayLayer_1ozz7_14',
  Sr = { root: aS, battleFooter: nS, overlayLayer: lS },
  iS = {
    elite: { color: 'var(--c-warning)', label: 'ELITE', glow: '0 0 16px rgba(246,185,74,0.6)' },
    boss: { color: 'var(--c-danger)', label: 'BOSS', glow: '0 0 24px rgba(255,77,109,0.7)' },
    'battle-start': {
      color: 'var(--c-primary)',
      label: 'BATTLE START',
      glow: '0 0 20px rgba(80,220,255,0.7)',
    },
  };
function cS({ kind: l = 'elite', name: c, duration: s = 1600, onDone: u }) {
  const d = `app-${G.useId().replace(/:/g, '')}`,
    h = iS[l],
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
      background: ${h.color};
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
        linear-gradient(90deg, transparent, color-mix(in srgb, ${h.color} 20%, transparent) 50%, transparent),
        linear-gradient(0deg, rgba(10,15,28,0.85), rgba(10,15,28,0.85));
      border-top: 1px solid ${h.color};
      border-bottom: 1px solid ${h.color};
      box-shadow: ${h.glow};
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
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      r.jsxs('div', {
        className: `${d}-w`,
        onAnimationEnd: u,
        children: [
          r.jsx('div', { className: `${d}-fl` }),
          r.jsxs('div', {
            className: `${d}-bd`,
            children: [
              r.jsx(Q, {
                variant: 'label',
                className: `${d}-label`,
                style: { color: h.color, fontSize: 12, letterSpacing: '0.32em' },
                children: h.label,
              }),
              c != null &&
                c !== '' &&
                r.jsx(Q, {
                  variant: 'heading-1',
                  className: `${d}-name`,
                  style: {
                    color: 'var(--c-text)',
                    fontSize: 22,
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 700,
                    textShadow: h.glow,
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
function sS({ waveNumber: l, duration: c = 1100, onDone: s }) {
  const f = `wv-${G.useId().replace(/:/g, '')}`,
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
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: d } }),
      r.jsx('div', {
        className: `${f}-w`,
        onAnimationEnd: s,
        children: r.jsxs('div', {
          className: `${f}-b`,
          children: [
            r.jsx(Q, {
              variant: 'label',
              color: 'primary',
              style: { fontSize: 11 },
              children: 'WAVE',
            }),
            r.jsx(Q, {
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
const oS = '_root_1375f_3',
  uS = '_rangeCircle_1375f_15',
  rS = '_machine_1375f_27',
  fS = '_machineRingOuter_1375f_40',
  dS = '_pin_1375f_50',
  mS = '_enemy_1375f_60',
  ai = { root: oS, rangeCircle: uS, machine: rS, machineRingOuter: fS, pin: dS, enemy: mS },
  hS = '_wrap_14rhu_1',
  pS = { wrap: hS };
function yS({
  x: l,
  y: c,
  radius: s = 12,
  color: u = 'var(--c-warning)',
  duration: f = 520,
  delayMs: d = 0,
  onDone: h,
}) {
  const p = G.useId().replace(/:/g, 'bl'),
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
      border: 3px solid ${u};
      box-shadow: 0 0 24px ${u}aa, inset 0 0 24px ${u}66;
      animation: ${p}-ring ${f}ms ${d}ms var(--ease-out) both;
    }
    .${p}-flash {
      position: absolute; left: 0; top: 0;
      width: ${s * 2}vmin; height: ${s * 2}vmin; border-radius: 50%;
      background: radial-gradient(circle, ${u} 0%, transparent 60%);
      animation: ${p}-flash ${g}ms ${d}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${p}-ring, .${p}-flash { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: y } }),
      r.jsxs('div', {
        className: `${p}-wrap ${pS.wrap}`,
        style: { left: `${l}%`, top: `${c}%` },
        onAnimationEnd: h,
        children: [
          r.jsx('div', { className: `${p}-flash` }),
          r.jsx('div', { className: `${p}-ring` }),
        ],
      }),
    ],
  });
}
const gS = '_shell_g836j_1',
  vS = '_inner_g836j_8',
  _S = '_ball_g836j_14',
  bS = '_highlight_g836j_23',
  Us = { shell: gS, inner: vS, ball: _S, highlight: bS };
function SS({
  x1: l = 50,
  y1: c = 50,
  x2: s = 80,
  y2: u = 20,
  duration: f = 480,
  size: d = 3.4,
  onDone: h,
}) {
  const [p, g] = G.useState(!1);
  G.useEffect(() => {
    const T = setTimeout(() => {
        g(!0);
      }, 20),
      z = setTimeout(() => {
        h == null || h();
      }, f + 20);
    return () => {
      (clearTimeout(T), clearTimeout(z));
    };
  }, []);
  const y = p ? s : l,
    _ = p ? u : c,
    S = (Math.atan2(u - c, s - l) * 180) / Math.PI;
  return r.jsx('div', {
    className: Us.shell,
    style: {
      left: `${y}%`,
      top: `${_}%`,
      width: `${d}vmin`,
      height: `${d}vmin`,
      transition: `left ${f}ms cubic-bezier(.4,0,.6,1), top ${f}ms cubic-bezier(.4,0,.6,1)`,
    },
    children: r.jsxs('div', {
      className: Us.inner,
      style: { transform: `rotate(${S}deg)` },
      children: [
        r.jsx('div', { className: Us.ball }),
        r.jsx('div', {
          className: Us.highlight,
          style: { width: `${d * 0.32}vmin`, height: `${d * 0.32}vmin` },
        }),
      ],
    }),
  });
}
const xS = '_svg_gil20_1',
  jS = { svg: xS };
function AS({
  points: l,
  color: c = 'var(--c-primary)',
  segmentMs: s = 90,
  jaggedness: u = 2.2,
  subdivisions: f = 4,
  delayMs: d = 0,
  onDone: h,
}) {
  const g = `chn-${G.useId().replace(/:/g, '')}`,
    y = l.length >= 2,
    _ = G.useMemo(() => {
      if (!y) return '';
      const z = [];
      for (let E = 0; E < l.length - 1; E++) {
        const q = l[E],
          B = l[E + 1],
          F = B.x - q.x,
          C = B.y - q.y,
          ot = Math.hypot(F, C) || 1,
          Lt = -C / ot,
          Zt = F / ot;
        E === 0 && z.push(q);
        for (let At = 1; At < f; At++) {
          const it = At / f,
            qt = q.x + F * it,
            Ft = q.y + C * it,
            Yt = (Math.random() - 0.5) * 2 * u;
          z.push({ x: qt + Lt * Yt, y: Ft + Zt * Yt });
        }
        z.push(B);
      }
      return z.map((E, q) => `${q === 0 ? 'M' : 'L'}${E.x.toFixed(2)} ${E.y.toFixed(2)}`).join(' ');
    }, []);
  if (!y) return null;
  const S = (l.length - 1) * s + 200,
    T = `
    @keyframes ${g}-draw {
      0%   { stroke-dashoffset: 300; opacity: 1; }
      80%  { stroke-dashoffset: 0;   opacity: 1; }
      100% { stroke-dashoffset: 0;   opacity: 0; }
    }
    .${g} { animation: ${g}-draw ${S}ms ${d}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${g} { animation-duration: 1ms; opacity: 0; } }
  `;
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: T } }),
      r.jsxs('svg', {
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none',
        className: jS.svg,
        onAnimationEnd: h,
        children: [
          r.jsx('path', {
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
          r.jsx('path', {
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
function TS({
  cx: l = 50,
  cy: c = 50,
  length: s = 14,
  thickness: u = 2.2,
  blades: f = 2,
  rotateMs: d = 1300,
  direction: h = 'cw',
  color: p = 'var(--c-primary)',
  duration: g,
  onDone: y,
}) {
  const S = `ct-${G.useId().replace(/:/g, '')}`,
    T = h === 'ccw' ? -1 : 1;
  G.useEffect(() => {
    if (g != null && y != null) {
      const B = setTimeout(y, g);
      return () => {
        clearTimeout(B);
      };
    }
  }, [g, y]);
  const z = `
    @keyframes ${S}-spin { to { transform: translate(-50%, -50%) rotate(${360 * T}deg); } }
    @keyframes ${S}-trail-pulse {
      0%, 100% { opacity: 0.18; }
      50%      { opacity: 0.36; }
    }
    .${S}-hub {
      position: absolute;
      left: ${l}%; top: ${c}%;
      width: ${s * 2}vmin; height: ${s * 2}vmin;
      transform: translate(-50%, -50%);
      animation: ${S}-spin ${d}ms linear infinite;
      pointer-events: none;
      z-index: var(--z-fx-field);
    }
    .${S}-orbit {
      position: absolute; inset: 0; border-radius: 50%;
      border: 1px dashed ${p};
      opacity: 0.22;
      animation: ${S}-trail-pulse ${Math.round(d * 0.7)}ms ease-in-out infinite;
    }
    .${S}-blade {
      position: absolute;
      left: 50%; top: 50%;
      width: ${s}vmin;
      height: ${u}vmin;
      margin-top: -${u / 2}vmin;
      transform-origin: 0 50%;
      filter: drop-shadow(0 0 4px ${p}) drop-shadow(0 0 10px ${p}66);
      color: ${p};
    }
    .${S}-sweep {
      position: absolute;
      left: 50%; top: 50%;
      width: ${s}vmin; height: ${s}vmin;
      transform-origin: 0 0;
      pointer-events: none;
      opacity: 0.35;
    }
    @media (prefers-reduced-motion: reduce) {
      .${S}-hub, .${S}-orbit { animation-duration: 30s; }
    }
  `,
    E = (B) =>
      `M 10 ${B * 3.5} ` +
      Array.from({ length: 9 }, (F, C) => {
        const ot = 10 + C * 10;
        return `L ${ot + 4} ${B * 8} L ${ot + 8} ${B * 3.5} `;
      }).join(''),
    q = [];
  for (let B = 0; B < f; B++) {
    const F = (360 / f) * B,
      C = 30 * T,
      ot = (C * Math.PI) / 180,
      Lt = s * Math.cos(ot),
      Zt = s * Math.sin(ot),
      At = `M 0 0 L ${s} 0 A ${s} ${s} 0 0 ${C > 0 ? 1 : 0} ${Lt.toFixed(2)} ${Zt.toFixed(2)} Z`;
    (q.push(
      r.jsx(
        'svg',
        {
          className: `${S}-sweep`,
          viewBox: `0 0 ${s} ${s}`,
          style: { transform: `rotate(${F - C}deg)`, transformOrigin: '0 0' },
          preserveAspectRatio: 'none',
          children: r.jsx('path', { d: At, fill: p, opacity: 0.18 }),
        },
        `sweep-${B}`
      )
    ),
      q.push(
        r.jsxs(
          'svg',
          {
            className: `${S}-blade`,
            viewBox: '0 -10 100 20',
            style: { transform: `rotate(${F}deg)` },
            preserveAspectRatio: 'none',
            children: [
              r.jsx('rect', {
                x: 4,
                y: -3.5,
                width: 92,
                height: 7,
                fill: 'rgba(0,0,0,0.4)',
                stroke: p,
                strokeWidth: 1.2,
              }),
              r.jsx('rect', { x: 6, y: -1.5, width: 88, height: 3, fill: p, opacity: 0.55 }),
              r.jsx('path', {
                d: E(-1),
                fill: p,
                opacity: 0.85,
                stroke: p,
                strokeWidth: 0.6,
                strokeLinejoin: 'round',
              }),
              r.jsx('path', {
                d: E(1),
                fill: p,
                opacity: 0.85,
                stroke: p,
                strokeWidth: 0.6,
                strokeLinejoin: 'round',
              }),
              r.jsx('circle', { cx: 2, cy: 0, r: 3, fill: p }),
              r.jsx('circle', { cx: 2, cy: 0, r: 1.5, fill: '#fff' }),
              r.jsx('polygon', { points: '94,0 100,-3 98,0 100,3', fill: '#fff', opacity: 0.85 }),
            ],
          },
          `blade-${B}`
        )
      ));
  }
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: z } }),
      r.jsxs('div', {
        className: `${S}-hub`,
        children: [r.jsx('div', { className: `${S}-orbit` }), q],
      }),
    ],
  });
}
const ES = '_root_14p1r_1',
  MS = { root: ES };
function NS({ value: l, x: c, y: s, crit: u = !1, duration: f = 800, onDone: d }) {
  const h = G.useId().replace(/:/g, 'dp'),
    p = `
    @keyframes ${h}-pop {
      0%   { transform: translate(-50%, 0) scale(${u ? 0.6 : 0.8}); opacity: 0; }
      15%  { transform: translate(-50%, -4px) scale(${u ? 1.15 : 1}); opacity: 1; }
      100% { transform: translate(-50%, -28px) scale(${u ? 1 : 0.95}); opacity: 0; }
    }
    .${h} {
      position: absolute;
      left: ${c}%;
      top: ${s}%;
      animation: ${h}-pop ${f}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
      filter: drop-shadow(0 0 4px ${u ? 'rgba(246,185,74,0.7)' : 'rgba(255,255,255,0.45)'});
    }
    @media (prefers-reduced-motion: reduce) {
      .${h} { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      r.jsx('div', {
        className: `${h} ${MS.root}`,
        onAnimationEnd: d,
        children: r.jsx(zn, {
          value: l,
          size: u ? 'lg' : 'md',
          accentColor: u ? 'warning' : 'scale',
          glow: !0,
          style: u ? { fontSize: 22, fontWeight: 700 } : { fontSize: 16, fontWeight: 600 },
        }),
      }),
    ],
  });
}
const wS = '_wrap_14rhu_1',
  zS = { wrap: wS },
  Sh = 8;
function CS({ x: l, y: c, color: s = 'var(--c-text-mid)', duration: u = 480, onDone: f }) {
  const d = G.useId().replace(/:/g, 'ed'),
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
      animation: ${d}-flash ${u}ms var(--ease-out) both;
    }
    .${d}-shard {
      position: absolute; left: 0; top: 0;
      width: 4px; height: 4px;
      background: ${s};
      box-shadow: 0 0 4px ${s};
      animation: ${d}-shard ${u}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${d}-flash, .${d}-shard { animation-duration: 1ms; opacity: 0; }
    }
  `,
    g = Array.from({ length: Sh }, (y, _) =>
      r.jsx('div', { className: `${d}-shard`, style: { '--a': `${(_ * 360) / Sh}deg` } }, _)
    );
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      r.jsxs('div', {
        className: `${d}-wrap ${zS.wrap}`,
        style: { left: `${l}%`, top: `${c}%` },
        onAnimationEnd: f,
        children: [r.jsx('div', { className: `${d}-flash` }), g],
      }),
    ],
  });
}
const RS = '_wrap_14rhu_1',
  OS = { wrap: RS };
function BS({ x: l, y: c, color: s = 'var(--c-primary-hi)', duration: u = 220, onDone: f }) {
  const d = G.useId().replace(/:/g, 'eh'),
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
      animation: ${d}-f ${u}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${d}-d { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: h } }),
      r.jsx('div', {
        className: `${d}-w ${OS.wrap}`,
        style: { left: `${l}%`, top: `${c}%` },
        onAnimationEnd: f,
        children: r.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const DS = '_beam_14ieu_1',
  LS = { beam: DS };
function $S({
  x1: l,
  y1: c,
  x2: s,
  y2: u,
  color: f = 'var(--c-primary)',
  duration: d = 220,
  onDone: h,
}) {
  const p = G.useId().replace(/:/g, 'lb'),
    g = s - l,
    y = u - c,
    _ = Math.hypot(g, y),
    S = (Math.atan2(y, g) * 180) / Math.PI,
    T = `
    @keyframes ${p}-beam {
      0%   { transform: rotate(${S}deg) scaleX(0); opacity: 1; }
      30%  { transform: rotate(${S}deg) scaleX(1); opacity: 1; }
      100% { transform: rotate(${S}deg) scaleX(1); opacity: 0; }
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
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: T } }),
      r.jsx('div', { className: `${p} ${LS.beam}`, onAnimationEnd: h }),
    ],
  });
}
const HS = { screw: 'var(--c-screw)', bolt: 'var(--c-bolt)', alloy: 'var(--c-alloy)' };
function US({ x: l, y: c, targetX: s, targetY: u, iconName: f, duration: d = 400, onDone: h }) {
  const g = `pk-${G.useId().replace(/:/g, '')}`,
    y = HS[f],
    _ = (l + s) / 2,
    S = Math.min(l, s, c, u) - 8,
    T = `
    @keyframes ${g}-arc {
      0%   { left: ${l}%;       top: ${c}%;       transform: translate(-50%, -50%) scale(1);   opacity: 1; }
      40%  { left: ${_}%;    top: ${S}%;    transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
      100% { left: ${s}%; top: ${u}%; transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
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
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: T } }),
      r.jsx('div', { className: g, onAnimationEnd: h, children: r.jsx(Ut, { name: f, size: 18 }) }),
    ],
  });
}
function qS({
  x: l = 50,
  y: c = 60,
  fromY: s = 0,
  duration: u = 320,
  color: f = 'var(--c-primary)',
  segments: d = 7,
  jaggedness: h = 3.5,
  onDone: p,
}) {
  const y = `thn-${G.useId().replace(/:/g, '')}`,
    _ = G.useMemo(() => {
      const E = [{ x: l, y: s }],
        B = (c - s) / d;
      for (let F = 1; F < d; F++) {
        const C = s + B * F,
          ot = l + (Math.random() - 0.5) * 2 * h;
        E.push({ x: ot, y: C });
      }
      return (
        E.push({ x: l, y: c }),
        E.map((F, C) => `${C === 0 ? 'M' : 'L'}${F.x.toFixed(2)} ${F.y.toFixed(2)}`).join(' ')
      );
    }, []),
    S = Math.round(u * 0.35),
    T = Math.round(u * 0.65),
    z = `
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
    .${y}-bolt { animation: ${y}-strike ${S}ms var(--ease-out) both; }
    .${y}-bolt-glow { animation: ${y}-strike-glow ${S}ms var(--ease-out) both; }
    .${y}-flash {
      position: absolute; left: ${l}%; top: ${c}%;
      width: 8vmin; height: 8vmin; border-radius: 50%;
      background: radial-gradient(circle, #fff 0%, ${f} 30%, transparent 70%);
      box-shadow: 0 0 20px ${f}, 0 0 40px ${f}88;
      animation: ${y}-flash ${T}ms ${S}ms var(--ease-out) both;
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
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: z } }),
      r.jsxs('svg', {
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none',
        className: `${y}-svg`,
        children: [
          r.jsx('path', {
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
          r.jsx('path', {
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
      r.jsx('div', { className: `${y}-flash`, onAnimationEnd: p }),
    ],
  });
}
const kS = '_root_5xktu_1',
  VS = '_shape_5xktu_11',
  GS = '_hpBar_5xktu_22',
  ZS = '_hpFill_5xktu_32',
  qs = { root: kS, shape: VS, hpBar: GS, hpFill: ZS },
  YS = {
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
  XS = { standard: !1, swift: !0, tough: !1, elite: !1, miniboss: !0, boss: !0 };
function QS(l) {
  switch (l) {
    case 'frozen':
      return 'hue-rotate(180deg) saturate(1.6) brightness(1.05)';
    case 'burning':
      return 'hue-rotate(-25deg) saturate(1.4) brightness(1.1)';
    default:
      return 'none';
  }
}
function KS({ color: l }) {
  return r.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      r.jsx('polygon', {
        points: '0,-46 40,-23 40,23 0,46 -40,23 -40,-23',
        fill: 'rgba(0,0,0,0.35)',
        stroke: l,
        strokeWidth: 6,
        strokeLinejoin: 'round',
      }),
      r.jsx('polygon', {
        points: '0,-22 19,-11 19,11 0,22 -19,11 -19,-11',
        fill: l,
        opacity: 0.55,
      }),
    ],
  });
}
function WS({ color: l }) {
  return r.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      r.jsx('polygon', {
        points: '46,0 -28,-34 -10,0 -28,34',
        fill: 'rgba(0,0,0,0.35)',
        stroke: l,
        strokeWidth: 6,
        strokeLinejoin: 'round',
      }),
      r.jsx('line', {
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
function JS({ color: l }) {
  return r.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      r.jsx('rect', {
        x: -42,
        y: -42,
        width: 84,
        height: 84,
        rx: 16,
        fill: 'rgba(0,0,0,0.4)',
        stroke: l,
        strokeWidth: 8,
      }),
      r.jsx('rect', {
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
      r.jsx('rect', { x: -10, y: -10, width: 20, height: 20, fill: l, opacity: 0.7 }),
    ],
  });
}
function FS({ color: l }) {
  return r.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      r.jsx('polygon', {
        points: '0,-46 46,0 0,46 -46,0',
        fill: 'rgba(0,0,0,0.4)',
        stroke: l,
        strokeWidth: 6,
        strokeLinejoin: 'round',
      }),
      r.jsx('polygon', {
        points: '0,-28 28,0 0,28 -28,0',
        fill: 'none',
        stroke: l,
        strokeWidth: 3,
        opacity: 0.7,
      }),
      r.jsx('polygon', { points: '0,-12 12,0 0,12 -12,0', fill: l, opacity: 0.85 }),
    ],
  });
}
function IS({ color: l }) {
  return r.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      [0, 90, 180, 270].map((c) =>
        r.jsx(
          'polygon',
          { points: '46,-6 46,6 56,0', transform: `rotate(${c})`, fill: l, opacity: 0.6 },
          c
        )
      ),
      r.jsx('polygon', {
        points: '-28,-46 28,-46 46,-28 46,28 28,46 -28,46 -46,28 -46,-28',
        fill: 'rgba(0,0,0,0.45)',
        stroke: l,
        strokeWidth: 6,
        strokeLinejoin: 'round',
      }),
      r.jsx('rect', { x: -22, y: -4, width: 44, height: 8, fill: l, opacity: 0.65 }),
      r.jsx('rect', { x: -4, y: -22, width: 8, height: 44, fill: l, opacity: 0.65 }),
      r.jsx('circle', { cx: 0, cy: 0, r: 8, fill: l }),
    ],
  });
}
function PS({ color: l }) {
  return r.jsxs('svg', {
    viewBox: '-50 -50 100 100',
    width: '100%',
    height: '100%',
    children: [
      [0, 60, 120, 180, 240, 300].map((c) =>
        r.jsx(
          'polygon',
          { points: '0,-48 6,-30 -6,-30', transform: `rotate(${c})`, fill: l, opacity: 0.7 },
          c
        )
      ),
      r.jsx('polygon', {
        points: '0,-34 30,-17 30,17 0,34 -30,17 -30,-17',
        fill: 'rgba(0,0,0,0.5)',
        stroke: l,
        strokeWidth: 5,
        strokeLinejoin: 'round',
      }),
      r.jsx('circle', {
        cx: 0,
        cy: 0,
        r: 18,
        fill: 'none',
        stroke: l,
        strokeWidth: 3,
        opacity: 0.7,
      }),
      r.jsx('circle', { cx: 0, cy: 0, r: 10, fill: l }),
      r.jsx('circle', { cx: 0, cy: 0, r: 4, fill: 'rgba(255,255,255,0.85)' }),
    ],
  });
}
const tx = { standard: KS, swift: WS, tough: JS, elite: FS, miniboss: IS, boss: PS };
function ex(l, c) {
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
function ax({ type: l, size: c, hp: s, showHp: u, facing: f = 0, status: d = 'normal' }) {
  const h = YS[l],
    p = c ?? h.size,
    g = tx[l],
    y = u ?? h.defaultHp,
    _ = XS[l] ? `${(f * 180) / Math.PI}deg` : '0deg',
    S = l === 'boss' ? 8 : l === 'miniboss' ? 6 : 4,
    T = { width: p, height: p },
    z = {
      width: p,
      height: p,
      color: h.color,
      filter: `drop-shadow(0 0 ${S}px ${h.glow}) ${QS(d)}`,
      transform: `rotate(${_})`,
    },
    E = { width: p + 4, height: l === 'boss' ? 4 : 3 },
    q = {
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
  return r.jsxs('div', {
    role: 'img',
    'aria-label': `${l} enemy`,
    'data-enemy-type': l,
    'data-status': d,
    className: qs.root,
    style: T,
    children: [
      r.jsx('div', { className: qs.shape, style: z, children: r.jsx(g, { color: h.color }) }),
      y &&
        s != null &&
        r.jsx('div', {
          className: qs.hpBar,
          style: E,
          children: r.jsx('div', { className: qs.hpFill, style: q }),
        }),
    ],
  });
}
function xh(l) {
  switch (l) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}
function nx({
  enemies: l,
  machinePosition: c = { x: 50, y: 50 },
  damageEvents: s,
  hitEvents: u,
  deathEvents: f,
  onDamageDone: d,
  onHitDone: h,
  onDeathDone: p,
  projectileEvents: g = [],
  onProjectileDone: y,
  pickupEvents: _ = [],
  onPickupDone: S,
  showCutterOrbit: T = !1,
  range: z,
  dummyPins: E = [],
}) {
  const q = c.x,
    B = c.y,
    F = z * 2;
  return r.jsxs('div', {
    className: ai.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: [
      r.jsx('div', {
        className: ai.rangeCircle,
        style: { left: `${q}%`, top: `${B}%`, width: `${F}%` },
        'aria-hidden': !0,
      }),
      E.map((C) =>
        r.jsx(
          'div',
          {
            className: ai.pin,
            style: { left: `${C.x}%`, top: `${C.y}%`, color: xh(C.kind) },
            'aria-hidden': !0,
            children: r.jsx(Ut, {
              name: 'target',
              size: C.kind === 'boss' ? 18 : C.kind === 'elite' ? 16 : 14,
              color: xh(C.kind),
            }),
          },
          C.id
        )
      ),
      l.map((C) => {
        const ot = ex(C.kind, C.subtype),
          Lt = C.frozenUntilMs != null,
          Zt = C.burnUntilMs != null,
          At = Lt ? 'frozen' : Zt ? 'burning' : 'normal',
          it = parseFloat(C.hp.toString()),
          qt = Math.max(1e-4, parseFloat(C.maxHp.toString())),
          Ft = Math.max(0, Math.min(1, it / qt)),
          Yt = Math.atan2(B - C.position.y, q - C.position.x);
        return r.jsx(
          'div',
          {
            className: ai.enemy,
            style: {
              left: `${C.position.x}%`,
              top: `${C.position.y}%`,
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            },
            children: r.jsx(ax, { type: ot, hp: Ft, status: At, facing: Yt }),
          },
          C.id
        );
      }),
      r.jsxs('div', {
        className: ai.machine,
        style: { left: `${q}%`, top: `${B}%` },
        'aria-label': 'マシン',
        children: [
          r.jsx('span', { className: ai.machineRingOuter, 'aria-hidden': !0 }),
          r.jsx(Ut, { name: 'tower', size: 22, color: 'var(--c-primary)' }),
        ],
      }),
      T && r.jsx(TS, { cx: q, cy: B }),
      s.map((C) =>
        r.jsx(
          NS,
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
      u.map((C) =>
        r.jsx(BS, { x: C.x, y: C.y, onDone: () => (h == null ? void 0 : h(C.id)) }, C.id)
      ),
      f.map((C) =>
        r.jsx(CS, { x: C.x, y: C.y, onDone: () => (p == null ? void 0 : p(C.id)) }, C.id)
      ),
      _.map((C) =>
        r.jsx(
          US,
          {
            x: C.x,
            y: C.y,
            targetX: 50,
            targetY: 4,
            iconName: C.iconName,
            onDone: () => (S == null ? void 0 : S(C.id)),
          },
          C.id
        )
      ),
      g.map((C) => {
        switch (C.kind) {
          case 'laser':
            return r.jsx(
              $S,
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
            return r.jsx(
              SS,
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
            return r.jsx(
              yS,
              { x: C.x, y: C.y, delayMs: C.delayMs, onDone: () => (y == null ? void 0 : y(C.id)) },
              C.id
            );
          case 'thunderStrike':
            return r.jsx(
              qS,
              {
                x: C.x,
                y: C.y,
                duration: C.durationMs,
                onDone: () => (y == null ? void 0 : y(C.id)),
              },
              C.id
            );
          case 'chain':
            return r.jsx(
              AS,
              {
                points: C.points,
                delayMs: C.delayMs,
                onDone: () => (y == null ? void 0 : y(C.id)),
              },
              C.id
            );
        }
      }),
    ],
  });
}
const lx = '_root_1oybt_2',
  ix = '_topRow_1oybt_13',
  cx = '_weaponSlots_1oybt_21',
  sx = '_activeArea_1oybt_29',
  ox = '_activeButton_1oybt_37',
  ux = '_activeDisabled_1oybt_57',
  rx = '_modeToggle_1oybt_66',
  fx = '_modeToggleOn_1oybt_89',
  dx = '_sheetToggleButton_1oybt_96',
  mx = '_bottomRow_1oybt_108',
  hx = '_currencyArea_1oybt_114',
  px = '_sysButtons_1oybt_126',
  aa = {
    root: lx,
    topRow: ix,
    weaponSlots: cx,
    activeArea: sx,
    activeButton: ox,
    activeDisabled: ux,
    modeToggle: rx,
    modeToggleOn: fx,
    sheetToggleButton: dx,
    bottomRow: mx,
    currencyArea: hx,
    sysButtons: px,
  },
  yx = '_badge_4fy54_1',
  gx = '_glow_4fy54_90',
  vx = '_iconLeft_4fy54_118',
  fc = {
    badge: yx,
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
    glow: gx,
    iconLeft: vx,
  };
function Tc({
  text: l,
  variant: c = 'neutral',
  tier: s,
  size: u = 'md',
  glow: f = !1,
  iconLeft: d,
}) {
  let h;
  const p = c === 'default' ? 'neutral' : c;
  if (p === 'tier' && s != null) {
    const y = Math.min(Math.max(1, Math.floor(s)), 12);
    h = { '--badge-color': `var(--c-tier-${Math.min(y, 10)})` };
  } else
    p === 'patch-tier' &&
      s != null &&
      (h = { '--badge-color': `var(--c-patch-t${Math.min(Math.max(1, Math.floor(s)), 5)})` });
  let g = l;
  return (
    g == null &&
      (p === 'tier' && s != null
        ? (g = `T${s}`)
        : p === 'patch-tier' && s != null
          ? (g = `T${s}`)
          : (g = '')),
    r.jsxs('span', {
      className: [fc.badge, fc[`variant-${p}`], fc[`size-${u}`], f ? fc.glow : '']
        .filter(Boolean)
        .join(' '),
      style: h,
      children: [
        d != null && r.jsx('span', { className: fc.iconLeft, 'aria-hidden': 'true', children: d }),
        g,
      ],
    })
  );
}
const _x = '_root_x9cjr_1',
  bx = '_svg_x9cjr_9',
  Sx = '_track_x9cjr_15',
  xx = '_arc_x9cjr_19',
  jx = '_center_x9cjr_28',
  Ax = '_labelText_x9cjr_37',
  ni = { root: _x, svg: bx, track: Sx, arc: xx, center: jx, labelText: Ax },
  Tx = { xs: 20, sm: 32, md: 48, lg: 64 },
  Ex = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  Mx = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function m1({
  value: l,
  max: c,
  size: s = 24,
  color: u = 'primary',
  thickness: f = 3,
  glow: d = !1,
  showLabel: h = !1,
  withLabel: p = !1,
  label: g,
  children: y,
}) {
  const _ = typeof s == 'number' ? s : Tx[s],
    S =
      c != null
        ? Math.min(Math.max(0, l), Math.max(1, c)) / Math.max(1, c)
        : Math.min(Math.max(0, l), 100) / 100,
    T = c != null ? Math.min(Math.max(0, l), Math.max(1, c)) : l,
    z = c != null ? Math.max(1, c) : 100,
    E = Ex[u],
    q = d ? Mx[u] : void 0,
    B = _ / 2,
    F = B - f / 2,
    C = 2 * Math.PI * F,
    ot = C * (1 - S),
    Zt = h || p || y != null,
    At = g ?? `${Math.round(S * 100)}%`;
  return r.jsxs('span', {
    className: ni.root,
    style: { width: _, height: _ },
    children: [
      r.jsxs('svg', {
        className: ni.svg,
        width: _,
        height: _,
        viewBox: `0 0 ${_} ${_}`,
        xmlns: 'http://www.w3.org/2000/svg',
        role: 'progressbar',
        'aria-valuenow': T,
        'aria-valuemin': 0,
        'aria-valuemax': z,
        'aria-label': g ?? `${T} / ${z}`,
        children: [
          r.jsx('circle', {
            className: ni.track,
            cx: B,
            cy: B,
            r: F,
            fill: 'none',
            strokeWidth: f,
          }),
          r.jsx('circle', {
            className: ni.arc,
            cx: B,
            cy: B,
            r: F,
            fill: 'none',
            stroke: E,
            strokeWidth: f,
            strokeLinecap: 'round',
            strokeDasharray: C,
            strokeDashoffset: ot,
            style: q != null ? { filter: `drop-shadow(0 0 4px ${E})` } : void 0,
            transform: `rotate(-90 ${B} ${B})`,
          }),
        ],
      }),
      Zt &&
        r.jsx('span', {
          className: ni.center,
          children:
            y ?? r.jsx('span', { className: ni.labelText, style: { color: E }, children: At }),
        }),
    ],
  });
}
const Nx = '_root_afe45_2',
  wx = '_swapDisabled_afe45_14',
  zx = '_active_afe45_20',
  Cx = '_onCd_afe45_27',
  Rx = '_iconWrap_afe45_27',
  Ox = '_cdOverlay_afe45_47',
  Bx = '_cdProgress_afe45_57',
  Dx = '_swapOverlay_afe45_68',
  An = {
    root: Nx,
    swapDisabled: wx,
    active: zx,
    onCd: Cx,
    iconWrap: Rx,
    cdOverlay: Ox,
    cdProgress: Bx,
    swapOverlay: Dx,
  },
  Lx = { sm: 40, md: 52, lg: 64 },
  $x = { sm: 18, md: 24, lg: 30 };
function Hx({
  weapon: l,
  active: c = !1,
  ready: s = !1,
  cdProgress: u = 100,
  swapDisabled: f = !1,
  size: d = 'md',
  onClick: h,
}) {
  const p = Lx[d],
    g = $x[d],
    y = u < 100,
    _ = [An.root, c ? An.active : '', y ? An.onCd : '', f ? An.swapDisabled : '']
      .filter(Boolean)
      .join(' ');
  return r.jsxs('button', {
    type: 'button',
    className: _,
    style: { width: p, height: p, minWidth: p, minHeight: p },
    onClick: f ? void 0 : h,
    disabled: f && h == null,
    'aria-label': `${l} weapon slot${c ? ' (active)' : ''}${y ? ` (cooldown ${u}%)` : s ? ' (ready)' : ''}`,
    'aria-pressed': c,
    children: [
      r.jsx('span', {
        className: An.iconWrap,
        children: r.jsx(Ut, {
          name: l,
          size: g,
          color: c ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      y &&
        r.jsxs(r.Fragment, {
          children: [
            r.jsx('span', { className: An.cdOverlay, 'aria-hidden': 'true' }),
            r.jsx('span', {
              className: An.cdProgress,
              'aria-hidden': 'true',
              children: r.jsx(m1, {
                value: u,
                max: 100,
                size: p - 4,
                color: 'cd',
                thickness: d === 'sm' ? 2 : 3,
              }),
            }),
          ],
        }),
      f && r.jsx('span', { className: An.swapOverlay, 'aria-hidden': 'true' }),
    ],
  });
}
const jh = ['laser', 'cannon', 'thunder', 'cutter'];
function Ux({
  screw: l,
  equippedWeapon: c,
  weaponCds: s,
  activeCd: u,
  activeMax: f,
  isAutoActive: d,
  onSwitchWeapon: h,
  onActivate: p,
  onToggleAuto: g,
  isPaused: y,
  onTogglePause: _,
  onOpenMenu: S,
  onOpenScreenSaver: T,
  isWorkshopOpen: z = !1,
  onToggleWorkshop: E,
}) {
  const q = u > 0,
    B = d || q,
    F = jh.some((C) => C !== c && (s[C] ?? 100) < 100);
  return r.jsxs('div', {
    className: aa.root,
    children: [
      E != null &&
        r.jsx('button', {
          type: 'button',
          className: aa.sheetToggleButton,
          onClick: E,
          'aria-expanded': z,
          'aria-label': z ? 'アップグレードを閉じる' : 'アップグレードを開く',
          children: r.jsx(Tc, { text: 'アップグレード', variant: 'info', size: 'md', glow: !0 }),
        }),
      r.jsxs('div', {
        className: aa.topRow,
        children: [
          r.jsx('div', {
            className: aa.weaponSlots,
            children: jh.map((C) =>
              r.jsx(
                Hx,
                {
                  weapon: C,
                  active: C === c,
                  cdProgress: s[C] ?? 100,
                  swapDisabled: F && C !== c,
                  size: 'md',
                  onClick: () => {
                    h(C);
                  },
                },
                C
              )
            ),
          }),
          r.jsxs('div', {
            className: aa.activeArea,
            children: [
              r.jsx('button', {
                type: 'button',
                className: [aa.activeButton, B ? aa.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: B ? void 0 : p,
                disabled: B,
                'aria-label': `アクティブスキル発動${q ? ' (クールダウン中)' : d ? ' (自動モード)' : ''}`,
                children: r.jsx(m1, {
                  value: q ? u : f,
                  max: f > 0 ? f : 1,
                  size: 64,
                  color: q ? 'cd' : 'primary',
                  glow: !q && !d,
                  thickness: 4,
                  children: r.jsx(Ut, {
                    name: 'lightning',
                    size: 26,
                    color: B ? 'var(--c-text-disabled)' : 'var(--c-secondary)',
                  }),
                }),
              }),
              r.jsx('button', {
                type: 'button',
                className: [aa.modeToggle, d ? aa.modeToggleOn : ''].filter(Boolean).join(' '),
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
        className: aa.bottomRow,
        children: [
          r.jsx('div', {
            className: aa.currencyArea,
            children: r.jsx(ri, { currency: 'screw', value: l, size: 'lg' }),
          }),
          r.jsxs('div', {
            className: aa.sysButtons,
            children: [
              r.jsx(_c, {
                icon: y ? 'play' : 'pause',
                label: y ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: y,
                onClick: _,
              }),
              r.jsx(_c, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: S,
              }),
              r.jsx(_c, {
                icon: 'ice',
                label: 'スクリーンセーバーを起動',
                size: 'md',
                variant: 'ghost',
                onClick: T,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const qx = '_root_1y4n6_3',
  kx = '_headerRow_1y4n6_13',
  Vx = '_hpValue_1y4n6_21',
  Gx = '_hpDivider_1y4n6_31',
  Zx = '_shieldBlock_1y4n6_36',
  Yx = '_srOnly_1y4n6_44',
  li = { root: qx, headerRow: kx, hpValue: Vx, hpDivider: Gx, shieldBlock: Zx, srOnly: Yx },
  Xx = '_root_1pi3d_2',
  Qx = '_sizeSm_1pi3d_11',
  Kx = '_sizeMd_1pi3d_15',
  Wx = '_sizeLg_1pi3d_19',
  Jx = '_fill_1pi3d_23',
  Fx = '_label_1pi3d_29',
  Ix = '_withTrailing_1pi3d_46',
  Px = '_trailingLabel_1pi3d_56',
  Tn = {
    root: Xx,
    sizeSm: Qx,
    sizeMd: Kx,
    sizeLg: Wx,
    fill: Jx,
    label: Fx,
    withTrailing: Ix,
    trailingLabel: Px,
  },
  t5 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  e5 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function Ah({
  value: l,
  max: c,
  color: s = 'primary',
  size: u = 'md',
  variant: f = 'solid',
  showLabel: d = !1,
  label: h,
  trailingLabel: p,
  glow: g = !1,
  reverse: y = !1,
}) {
  const _ = Math.max(1, c),
    S = Math.min(Math.max(0, l), _),
    T = (S / _) * 100,
    z = t5[s],
    E = g || f === 'neon' ? e5[s] : void 0,
    q = { sm: Tn.sizeSm, md: Tn.sizeMd, lg: Tn.sizeLg }[u],
    B = {
      width: `${T}%`,
      backgroundColor: z,
      ...(E != null ? { boxShadow: E } : {}),
      ...(y ? { marginLeft: 'auto' } : {}),
    },
    F = h ?? `${S} / ${_}`,
    C = r.jsxs('div', {
      className: `${Tn.root} ${q}`,
      role: 'progressbar',
      'aria-valuenow': S,
      'aria-valuemin': 0,
      'aria-valuemax': _,
      'aria-label': h ?? `${S} / ${_}`,
      children: [
        r.jsx('div', { className: Tn.fill, style: B }),
        d && r.jsx('span', { className: Tn.label, children: F }),
      ],
    });
  return p == null
    ? C
    : r.jsxs('div', {
        className: Tn.withTrailing,
        children: [C, r.jsx('span', { className: Tn.trailingLabel, children: p })],
      });
}
const a5 = '_root_lwzi1_2',
  n5 = '_boss_lwzi1_10',
  l5 = '_header_lwzi1_16',
  i5 = '_milestone_lwzi1_23',
  c5 = '_milestoneText_lwzi1_30',
  s5 = '_seconds_lwzi1_40',
  o5 = '_timerTrack_lwzi1_46',
  u5 = '_timerFill_lwzi1_56',
  r5 = '_drainBar_lwzi1_1',
  f5 = '_timerFillBoss_lwzi1_69',
  d5 = '_timerFillPaused_lwzi1_74',
  m5 = '_waveLabel_lwzi1_95',
  ma = {
    root: a5,
    boss: n5,
    header: l5,
    milestone: i5,
    milestoneText: c5,
    seconds: s5,
    timerTrack: o5,
    timerFill: u5,
    drainBar: r5,
    timerFillBoss: f5,
    timerFillPaused: d5,
    'size-sm': '_size-sm_lwzi1_91',
    waveLabel: m5,
    'size-md': '_size-md_lwzi1_99',
    'size-lg': '_size-lg_lwzi1_103',
  },
  h5 = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  };
function p5({
  waveNumber: l,
  secondsLeft: c,
  secondsMax: s,
  nextMilestone: u,
  showSeconds: f = !0,
  size: d = 'md',
  paused: h = !1,
}) {
  const p = (u == null ? void 0 : u.kind) === 'boss',
    g = u != null ? h5[u.kind] : null,
    y = Math.max(1, s);
  return r.jsxs('div', {
    className: [ma.root, ma[`size-${d}`], p ? ma.boss : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: ma.header,
        children: [
          r.jsx(Tc, { text: `WAVE ${l}`, variant: 'tier' }),
          g != null &&
            u != null &&
            r.jsxs('span', {
              className: ma.milestone,
              style: { color: g.color },
              children: [
                r.jsx(Ut, { name: g.iconName, size: 12, color: g.color }),
                r.jsxs('span', { className: ma.milestoneText, children: [g.label, ' @', u.wave] }),
              ],
            }),
          f &&
            r.jsx('span', {
              className: ma.seconds,
              children: r.jsxs(Q, {
                variant: 'numeric-s',
                color: 'mid',
                children: [Math.ceil(c), 's'],
              }),
            }),
        ],
      }),
      r.jsx('div', {
        className: ma.timerTrack,
        role: 'progressbar',
        'aria-label': `Wave ${l} timer`,
        'aria-valuemin': 0,
        'aria-valuemax': y,
        'aria-valuenow': Math.max(0, c),
        children: r.jsx(y5, { secondsRemaining: c, secondsMax: y, isBoss: p, paused: h }, l),
      }),
    ],
  });
}
function y5({ secondsRemaining: l, secondsMax: c, isBoss: s, paused: u }) {
  const [f] = G.useState(() => {
      const h = Math.max(0, Math.min(100, (l / c) * 100)),
        p = Math.max(0.01, l);
      return { initialWidthPct: h, durationSec: p };
    }),
    d = [ma.timerFill, s ? ma.timerFillBoss : '', u ? ma.timerFillPaused : '']
      .filter(Boolean)
      .join(' ');
  return r.jsx('div', {
    className: d,
    style: { width: `${f.initialWidthPct}%`, animationDuration: `${f.durationSec}s` },
  });
}
function g5({
  hpCurrent: l,
  hpMax: c,
  shieldCurrent: s,
  shieldMax: u,
  tier: f,
  wave: d,
  totalWaves: h,
  secondsRemaining: p,
  secondsTotal: g,
  isBossWave: y = !1,
  nextMilestone: _,
  damaging: S = !1,
  paused: T = !1,
}) {
  const z = _ ?? (y ? { wave: d, kind: 'boss' } : void 0),
    E = s != null && u != null,
    q = Th(l, c),
    B = E ? Th(s, u) : 0;
  return r.jsxs('div', {
    className: li.root,
    role: 'group',
    'aria-label': 'バトル状態',
    children: [
      r.jsxs('div', {
        className: li.headerRow,
        children: [
          r.jsx(Tc, { variant: 'tier', tier: f, size: 'md', glow: !0 }),
          r.jsx(Q, { variant: 'label', color: 'dim', style: { fontSize: 10 }, children: 'HP' }),
          r.jsxs('span', {
            className: li.hpValue,
            'aria-label': `HP ${l.toDisplay()} / ${c.toDisplay()}`,
            children: [
              r.jsx(zn, {
                value: l,
                size: 'sm',
                accentColor: S ? 'danger' : 'text',
                glow: S,
                style: { fontSize: 14 },
              }),
              r.jsx('span', { className: li.hpDivider, children: '/' }),
              r.jsx(zn, { value: c, size: 'sm', accentColor: 'dim', style: { fontSize: 11 } }),
            ],
          }),
          E &&
            r.jsxs('span', {
              className: li.shieldBlock,
              children: [
                r.jsx(Q, {
                  variant: 'label',
                  color: 'primary',
                  style: { fontSize: 9.5 },
                  children: 'SHLD',
                }),
                r.jsx(zn, {
                  value: s,
                  size: 'sm',
                  accentColor: 'primary',
                  style: { fontSize: 11 },
                }),
              ],
            }),
        ],
      }),
      r.jsx(Ah, { value: q, max: 100, color: q <= 30 ? 'hp-low' : 'hp', size: 'md' }),
      E && r.jsx(Ah, { value: B, max: 100, color: 'shield', size: 'sm' }),
      r.jsx(p5, {
        waveNumber: d,
        secondsLeft: p,
        secondsMax: g,
        nextMilestone: z,
        showSeconds: !1,
        size: 'sm',
        paused: T,
      }),
      r.jsxs('span', { className: li.srOnly, 'aria-hidden': 'false', children: [d, '/', h] }),
    ],
  });
}
function Th(l, c) {
  const s = parseFloat(l.toString()),
    u = parseFloat(c.toString());
  return u === 0 ? 0 : Math.max(0, Math.min(100, (s / u) * 100));
}
const v5 = '_card_1o3jz_1',
  _5 = '_header_1o3jz_8',
  b5 = '_soundSection_1o3jz_13',
  S5 = '_sliderRow_1o3jz_19',
  x5 = '_sliderLabel_1o3jz_26',
  j5 = '_sliderValue_1o3jz_31',
  A5 = '_divider_1o3jz_38',
  T5 = '_actions_1o3jz_44',
  fa = {
    card: v5,
    header: _5,
    soundSection: b5,
    sliderRow: S5,
    sliderLabel: x5,
    sliderValue: j5,
    divider: A5,
    actions: T5,
  },
  E5 = '_button_10kfo_1',
  M5 = '_fullWidth_10kfo_109',
  N5 = '_iconLeft_10kfo_113',
  w5 = '_iconRight_10kfo_114',
  z5 = '_label_10kfo_120',
  al = {
    button: E5,
    'variant-primary': '_variant-primary_10kfo_28',
    'variant-secondary': '_variant-secondary_10kfo_42',
    'variant-danger': '_variant-danger_10kfo_56',
    'variant-ghost': '_variant-ghost_10kfo_70',
    'size-sm': '_size-sm_10kfo_85',
    'size-md': '_size-md_10kfo_93',
    'size-lg': '_size-lg_10kfo_101',
    fullWidth: M5,
    iconLeft: N5,
    iconRight: w5,
    label: z5,
  };
function Ze({
  label: l,
  variant: c = 'primary',
  size: s = 'md',
  fullWidth: u = !1,
  iconLeft: f,
  iconRight: d,
  disabled: h = !1,
  onClick: p,
  type: g = 'button',
}) {
  return r.jsxs('button', {
    type: g,
    className: [al.button, al[`variant-${c}`], al[`size-${s}`], u ? al.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: p,
    'aria-disabled': h,
    children: [
      f != null && r.jsx('span', { className: al.iconLeft, 'aria-hidden': 'true', children: f }),
      r.jsx('span', { className: al.label, children: l }),
      d != null && r.jsx('span', { className: al.iconRight, 'aria-hidden': 'true', children: d }),
    ],
  });
}
const C5 = '_overlay_1i1z1_12',
  R5 = '_fullscreen_1i1z1_21',
  O5 = '_absolute_1i1z1_27',
  B5 = '_alignCenter_1i1z1_33',
  D5 = '_alignTop_1i1z1_38',
  L5 = '_alignBottom_1i1z1_44',
  $5 = '_content_1i1z1_50',
  sl = {
    overlay: C5,
    fullscreen: R5,
    absolute: O5,
    alignCenter: B5,
    alignTop: D5,
    alignBottom: L5,
    content: $5,
  },
  H5 = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Eh = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  U5 = { center: sl.alignCenter, top: sl.alignTop, bottom: sl.alignBottom };
function Fr({
  fullscreen: l = !0,
  children: c,
  onClose: s,
  dismissible: u = !0,
  dimLevel: f = 'normal',
  blur: d = 0,
  align: h = 'center',
  zIndex: p = 'overlay',
  style: g,
  open: y,
}) {
  const _ = () => {
      u && s && s();
    },
    S = (q) => {
      q.stopPropagation();
    },
    T = H5[f],
    z = typeof p == 'number' ? p : (Eh[p] ?? Eh.overlay),
    E = {
      background: `rgba(2, 4, 10, ${T})`,
      zIndex: z,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...g,
    };
  return r.jsx('div', {
    className: [sl.overlay, l ? sl.fullscreen : sl.absolute, U5[h]].join(' '),
    style: E,
    onClick: _,
    role: 'presentation',
    'aria-modal': 'true',
    children: r.jsx('div', { className: sl.content, onClick: S, children: c }),
  });
}
const q5 = '_wrapper_131tr_1',
  k5 = '_disabled_131tr_5',
  V5 = '_input_131tr_18',
  ks = {
    wrapper: q5,
    disabled: k5,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: V5,
  },
  wr = ({
    value: l,
    min: c = 0,
    max: s = 1,
    step: u = 0.01,
    onChange: f,
    color: d = 'primary',
    disabled: h = !1,
  }) => {
    const p = s === c ? 0 : ((l - c) / (s - c)) * 100,
      g = (_) => {
        h || f(parseFloat(_.target.value));
      },
      y = { '--slider-fill-pct': `${p}%` };
    return r.jsx('div', {
      className: [ks.wrapper, ks[`color-${d}`], h ? ks.disabled : ''].join(' '),
      style: y,
      children: r.jsx('input', {
        type: 'range',
        className: ks.input,
        min: c,
        max: s,
        step: u,
        value: l,
        onChange: g,
        disabled: h,
        'aria-valuenow': l,
        'aria-valuemin': c,
        'aria-valuemax': s,
      }),
    });
  },
  G5 = '_dialog_49iek_13',
  Z5 = '_card_49iek_20',
  Y5 = '_titleRow_49iek_27',
  X5 = '_titleIcon_49iek_33',
  Q5 = '_title_49iek_27',
  K5 = '_message_49iek_46',
  W5 = '_actions_49iek_50',
  J5 = '_variantDanger_49iek_57',
  En = {
    dialog: G5,
    card: Z5,
    titleRow: Y5,
    titleIcon: X5,
    title: Q5,
    message: K5,
    actions: W5,
    variantDanger: J5,
  };
function h1({
  open: l,
  title: c,
  message: s,
  iconName: u,
  confirmLabel: f = '確定',
  cancelLabel: d = 'キャンセル',
  onConfirm: h,
  onCancel: p,
  variant: g = 'default',
}) {
  return l
    ? r.jsx(Fr, {
        open: l,
        onClose: p,
        dismissible: !0,
        children: r.jsx('div', {
          className: [En.dialog, g === 'danger' ? En.variantDanger : ''].filter(Boolean).join(' '),
          children: r.jsxs(dl, {
            variant: 'elevated',
            padding: 'lg',
            className: En.card,
            children: [
              r.jsxs('div', {
                className: En.titleRow,
                children: [
                  u != null &&
                    r.jsx('span', {
                      className: En.titleIcon,
                      'aria-hidden': 'true',
                      children: r.jsx(Ut, {
                        name: u,
                        size: 20,
                        color: g === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  r.jsx(Q, { variant: 'heading-3', as: 'h2', className: En.title, children: c }),
                ],
              }),
              s != null &&
                s.length > 0 &&
                r.jsx(Q, { variant: 'body', color: 'mid', className: En.message, children: s }),
              r.jsxs('div', {
                className: En.actions,
                children: [
                  r.jsx(Ze, { label: d, variant: 'ghost', fullWidth: !0, onClick: p }),
                  r.jsx(Ze, {
                    label: f,
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
function F5({
  open: l,
  bgmVolume: c,
  seVolume: s,
  onBgmChange: u,
  onSeChange: f,
  onRetreat: d,
  onClose: h,
}) {
  const [p, g] = G.useState(!1);
  if (!l) return null;
  const y = () => {
      g(!0);
    },
    _ = () => {
      (g(!1), d());
    },
    S = () => {
      g(!1);
    };
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx(Fr, {
        open: l,
        onClose: h,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !p,
        children: r.jsxs(dl, {
          variant: 'elevated',
          padding: 'lg',
          className: fa.card,
          children: [
            r.jsx('div', {
              className: fa.header,
              children: r.jsx(Q, {
                variant: 'heading-2',
                as: 'h2',
                align: 'center',
                children: 'メニュー',
              }),
            }),
            r.jsxs('div', {
              className: fa.soundSection,
              children: [
                r.jsxs('div', {
                  className: fa.sliderRow,
                  children: [
                    r.jsx(Q, {
                      variant: 'label',
                      color: 'mid',
                      className: fa.sliderLabel,
                      children: 'BGM',
                    }),
                    r.jsx(Q, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: fa.sliderValue,
                      children: Math.round(c * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(wr, { value: c, min: 0, max: 1, step: 0.01, onChange: u, color: 'primary' }),
                r.jsxs('div', {
                  className: fa.sliderRow,
                  children: [
                    r.jsx(Q, {
                      variant: 'label',
                      color: 'mid',
                      className: fa.sliderLabel,
                      children: 'SE',
                    }),
                    r.jsx(Q, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: fa.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(wr, { value: s, min: 0, max: 1, step: 0.01, onChange: f, color: 'primary' }),
              ],
            }),
            r.jsx('div', { className: fa.divider, role: 'separator' }),
            r.jsxs('div', {
              className: fa.actions,
              children: [
                r.jsx(Ze, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: y }),
                r.jsx(Ze, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: h }),
              ],
            }),
          ],
        }),
      }),
      r.jsx(h1, {
        open: p,
        title: '撤退しますか？',
        message: 'バトルを終了して撤退します。獲得リソースはリザルト画面で確認できます。',
        confirmLabel: '撤退する',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: _,
        onCancel: S,
      }),
    ],
  });
}
const I5 = '_card_1fzt0_2',
  P5 = '_header_1fzt0_14',
  t3 = '_statusText_1fzt0_19',
  e3 = '_section_1fzt0_23',
  a3 = '_sectionTitle_1fzt0_29',
  n3 = '_statsGrid_1fzt0_35',
  l3 = '_statItem_1fzt0_41',
  i3 = '_rewardList_1fzt0_52',
  c3 = '_rewardCurrency_1fzt0_58',
  s3 = '_patchList_1fzt0_66',
  o3 = '_patchItem_1fzt0_72',
  u3 = '_actions_1fzt0_87',
  pe = {
    card: I5,
    header: P5,
    statusText: t3,
    section: e3,
    sectionTitle: a3,
    statsGrid: n3,
    statItem: l3,
    rewardList: i3,
    rewardCurrency: c3,
    patchList: s3,
    patchItem: o3,
    actions: u3,
  },
  r3 = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  f3 = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function d3(l) {
  const c = Math.floor(l / 60),
    s = Math.floor(l % 60);
  return `${c.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function m3({
  open: l,
  status: c,
  reachedTier: s,
  reachedWave: u,
  killed: f,
  elapsedSec: d,
  reward: h,
  onClose: p,
}) {
  if (!l) return null;
  const g = r3[c],
    y = f3[c];
  return r.jsx(Fr, {
    open: l,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: r.jsxs(dl, {
      variant: 'elevated',
      padding: 'lg',
      className: pe.card,
      children: [
        r.jsx('div', {
          className: pe.header,
          children: r.jsx(Q, {
            variant: 'heading-1',
            as: 'h2',
            color: y,
            align: 'center',
            className: pe.statusText,
            children: g,
          }),
        }),
        r.jsxs('div', {
          className: pe.section,
          children: [
            r.jsx(Q, {
              variant: 'label',
              color: 'mid',
              className: pe.sectionTitle,
              children: 'バトル記録',
            }),
            r.jsxs('div', {
              className: pe.statsGrid,
              children: [
                r.jsxs('div', {
                  className: pe.statItem,
                  children: [
                    r.jsx(Q, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    r.jsx(Q, { variant: 'numeric-m', color: 'primary', children: s.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: pe.statItem,
                  children: [
                    r.jsx(Q, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    r.jsx(Q, { variant: 'numeric-m', color: 'primary', children: u.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: pe.statItem,
                  children: [
                    r.jsx(Q, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    r.jsx(Q, { variant: 'numeric-m', color: 'primary', children: f.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: pe.statItem,
                  children: [
                    r.jsx(Q, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    r.jsx(Q, { variant: 'numeric-m', color: 'primary', children: d3(d) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        r.jsxs('div', {
          className: pe.section,
          children: [
            r.jsx(Q, {
              variant: 'label',
              color: 'mid',
              className: pe.sectionTitle,
              children: '獲得',
            }),
            r.jsxs('div', {
              className: pe.rewardList,
              children: [
                r.jsx('div', {
                  className: pe.rewardCurrency,
                  children: r.jsx(ri, { currency: 'bolt', value: h.bolt, size: 'lg' }),
                }),
                r.jsx('div', {
                  className: pe.rewardCurrency,
                  children: r.jsx(ri, { currency: 'alloy', value: h.alloy, size: 'lg' }),
                }),
                h.patches.length > 0 &&
                  r.jsx('div', {
                    className: pe.patchList,
                    children: h.patches.map((_, S) =>
                      r.jsxs(
                        'div',
                        {
                          className: pe.patchItem,
                          children: [
                            r.jsx(Q, { variant: 'body', truncate: !0, children: _.name }),
                            r.jsxs(Q, {
                              variant: 'caption',
                              color: 'mid',
                              children: ['Tier ', _.tier.toString()],
                            }),
                            r.jsxs(Q, {
                              variant: 'numeric-s',
                              color: 'secondary',
                              children: ['x', _.count.toString()],
                            }),
                          ],
                        },
                        S
                      )
                    ),
                  }),
                h.patches.length === 0 &&
                  r.jsx(Q, { variant: 'caption', color: 'dim', children: 'パッチドロップなし' }),
              ],
            }),
          ],
        }),
        r.jsx('div', {
          className: pe.actions,
          children: r.jsx(Ze, {
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
const h3 = '_root_1tank_3',
  p3 = '_inner_1tank_20',
  y3 = '_header_1tank_28',
  g3 = '_headerText_1tank_35',
  v3 = '_grid_1tank_44',
  dc = { root: h3, inner: p3, header: y3, headerText: g3, grid: v3 };
function _3({ open: l, screw: c, levels: s, onUpgrade: u, onClose: f }) {
  return l
    ? r.jsx('section', {
        className: dc.root,
        role: 'dialog',
        'aria-modal': 'false',
        'aria-label': 'ラン中ワークショップ',
        children: r.jsxs('div', {
          className: dc.inner,
          children: [
            r.jsxs('div', {
              className: dc.header,
              children: [
                r.jsxs('div', {
                  className: dc.headerText,
                  children: [
                    r.jsx(Q, {
                      variant: 'heading-3',
                      style: { fontSize: 14, lineHeight: 1.2 },
                      children: 'ラン中ワークショップ',
                    }),
                    r.jsx(Q, {
                      variant: 'caption',
                      color: 'dim',
                      style: { fontSize: 10.5 },
                      children: 'ラン終了で全リセット',
                    }),
                  ],
                }),
                r.jsx(ri, { currency: 'screw', value: c, size: 'md' }),
                f != null &&
                  r.jsx(_c, {
                    icon: 'chevron-down',
                    label: '閉じる',
                    variant: 'ghost',
                    size: 'sm',
                    onClick: f,
                  }),
              ],
            }),
            r.jsx('div', {
              className: dc.grid,
              children: Kh.map((d) => {
                const h = s[d.key],
                  p = ol(h),
                  g = ol(h + 1),
                  y = Gr(d, h),
                  _ = Wh(d, h, 5),
                  { totalCost: S, lvDelta: T } = Jh(d, h, c),
                  z = K.fromNumber(y),
                  E = K.fromNumber(_),
                  q = c.gte(z),
                  B = c.gte(E),
                  F = T > 0;
                return r.jsx(
                  Wr,
                  {
                    title: d.title,
                    iconName: d.iconName,
                    currentLabel: `Lv ${h}`,
                    before: Math.round(p * 10) / 10,
                    after: Math.round(g * 10) / 10,
                    beforeSuffix: '×',
                    currency: 'screw',
                    accent: 'warning',
                    options: [
                      { amount: '+1', cost: z, disabled: !q },
                      { amount: '+5', cost: E, disabled: !B },
                      { amount: 'MAX', cost: S, disabled: !F },
                    ],
                    onUpgrade: (C) => {
                      C === '+1'
                        ? u(d.key, 1)
                        : C === '+5'
                          ? u(d.key, 5)
                          : C === 'MAX' && u(d.key, 'max');
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
const b3 = '_root_9fvdn_2',
  S3 = { root: b3 },
  xr = [
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
function x3({ items: l = [], showTower: c = !1, towerContent: s = null, cycleSeconds: u = 24 }) {
  const d = `ssfx-${G.useId().replace(/:/g, '')}`,
    h = xr.map((S, T) => {
      const z = 100 / S.length,
        E = S.map(([q, B], F) => {
          const C = F * z;
          return `
          ${C}%               { left: ${q}%; top: ${B}%; opacity: 0; }
          ${(C + 3).toFixed(2)}%   { left: ${q}%; top: ${B}%; opacity: 1; }
          ${(C + z - 7).toFixed(2)}%  { left: ${q}%; top: ${B}%; opacity: 1; }
          ${(C + z - 3).toFixed(2)}%  { left: ${q}%; top: ${B}%; opacity: 0; }
        `;
        }).join('');
      return `@keyframes ${d}-drift-${T + 1} { ${E} 100% { opacity: 0; } }`;
    }).join(`
`),
    p = xr.map(
      (S, T) => `.${d}-p${T + 1} { animation: ${d}-drift-${T + 1} ${u}s linear infinite; }`
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
    y = r.jsxs('div', {
      className: `${d}-tower`,
      children: [
        r.jsx('div', { className: `${d}-tower-r1` }),
        r.jsx('div', { className: `${d}-tower-r2` }),
        r.jsx('div', { className: `${d}-tower-core`, children: s }),
      ],
    }),
    _ = c ? [y, ...l] : [...l];
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
      _.map((S, T) => {
        const z = (T % xr.length) + 1,
          E = -(T * (u / Math.max(_.length, 1)));
        return r.jsx(
          'div',
          {
            className: `${d}-slot ${d}-p${z}${T === 0 ? ` ${d}-rm-show` : ''}`,
            style: { animationDelay: `${E}s` },
            children: S,
          },
          T
        );
      }),
    ],
  });
}
function j3({ open: l, onClose: c }) {
  return l
    ? r.jsx('div', {
        className: S3.root,
        onClick: c,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (s) => {
          (s.key === 'Enter' || s.key === ' ') && c();
        },
        children: r.jsx(x3, {
          showTower: !0,
          towerContent: r.jsx(Ut, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
const rl = { HP: 10, ATK: 2, SPD: 10, SPAWN_INTERVAL: 2, HP_GROWTH: 1.8, ATK_GROWTH: 1.4 };
function A3(l) {
  return l <= 10
    ? 1 + 0.074 * (l - 1)
    : l <= 20
      ? 1 + 0.074 * 9 + 0.133 * (l - 10)
      : 1 + 0.074 * 9 + 0.133 * 10 + 0.2 * (l - 20);
}
function T3(l) {
  return l <= 10
    ? 1 + 0.037 * (l - 1)
    : l <= 20
      ? 1 + 0.037 * 9 + 0.067 * (l - 10)
      : 1 + 0.037 * 9 + 0.067 * 10 + 0.1 * (l - 20);
}
function E3(l) {
  return l <= 10
    ? 1 + 0.019 * (l - 1)
    : l <= 20
      ? 1 + 0.019 * 9 + 0.033 * (l - 10)
      : 1 + 0.019 * 9 + 0.033 * 10 + 0.05 * (l - 20);
}
function M3(l) {
  let c = K.fromNumber(rl.HP);
  for (let s = 1; s < l; s++) c = c.mulNumber(rl.HP_GROWTH);
  return c;
}
function N3(l) {
  let c = K.fromNumber(rl.ATK);
  for (let s = 1; s < l; s++) c = c.mulNumber(rl.ATK_GROWTH);
  return c;
}
const w3 = { standard: 1, swift: 0.6, tough: 5 },
  z3 = { standard: 1, swift: 0.5, tough: 1 },
  C3 = { standard: 1, swift: 2, tough: 0.5 },
  R3 = { elite: 10, miniboss: 50, boss: 250 },
  O3 = { elite: 2.5, miniboss: 5, boss: 8 },
  B3 = {
    elite: { screw: 10, bolt: 10, alloyChance: 0.3, alloyAmount: 1 },
    miniboss: { screw: 50, bolt: 50, alloyChance: 1, alloyAmount: 1 },
    boss: { screw: 250, bolt: 250, alloyChance: 1, alloyAmount: 5 },
  },
  D3 = { standard: 1, swift: 2, tough: 5 },
  L3 = { standard: 1, swift: 2, tough: 5 };
function Mh(l, c, s, u) {
  const f = M3(l),
    d = N3(l),
    h = A3(c),
    p = T3(c);
  if (s === 'normal') {
    const z = u ?? 'standard',
      E = f.mulNumber(w3[z]).mulNumber(h),
      q = d.mulNumber(z3[z]).mulNumber(p),
      B = rl.SPD * C3[z];
    return {
      kind: 'normal',
      subtype: z,
      hp: E,
      atk: q,
      speed: B,
      reward: { screw: D3[z], bolt: L3[z], alloyChance: 0, alloyAmount: 0 },
    };
  }
  const g = s,
    y = f.mulNumber(R3[g]).mulNumber(h),
    _ = d.mulNumber(O3[g]).mulNumber(p),
    S = rl.SPD,
    T = B3[g];
  return { kind: s, hp: y, atk: _, speed: S, reward: { ...T } };
}
function Nh(l, c, s, u) {
  const f = u() < 0.5 ? 0 : 100,
    d = u() * 100;
  return { ...l, id: c, spawnedAtMs: s, position: { x: f, y: d }, maxHp: l.hp };
}
const $3 = 30,
  zr = 26;
function H3(l) {
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
function U3(l) {
  const c = [];
  for (let s = 1; s <= $3; s++) {
    const u = E3(s),
      f = rl.SPAWN_INTERVAL / u,
      d = H3(s);
    let h;
    (s === 5 || s === 15 || s === 25
      ? (h = 'elite')
      : s === 10 || s === 20
        ? (h = 'miniboss')
        : s === 30 && (h = 'boss'),
      c.push({
        waveIndex: s,
        tier: l,
        durationSec: zr,
        spawnIntervalSec: f,
        normalSpawnTable: d,
        eliteKind: h,
      }));
  }
  return c;
}
function q3(l, c, s, u, f) {
  const d = [],
    h = c / 1e3,
    p = s / 1e3,
    g = Math.floor(h / l.spawnIntervalSec),
    y = Math.floor(p / l.spawnIntervalSec),
    _ = g - y;
  for (let z = 0; z < _; z++) {
    const E = k3(l.normalSpawnTable, u),
      q = Mh(l.tier, l.waveIndex, 'normal', E);
    d.push(Nh(q, f(), c, u));
  }
  const T = l.durationSec - 1;
  if (l.eliteKind !== void 0 && p < T && h >= T) {
    const z = Mh(l.tier, l.waveIndex, l.eliteKind);
    d.push(Nh(z, f(), c, u));
  }
  return d;
}
function k3(l, c) {
  const s = c();
  let u = 0;
  for (const f of l) if (((u += f.weight), s < u)) return f.subtype;
  return l[l.length - 1].subtype;
}
const wh = 50,
  zh = 50;
function V3(l, c, s) {
  if (l.frozenUntilMs != null && s != null && l.frozenUntilMs > s) return l;
  const u = wh - l.position.x,
    f = zh - l.position.y,
    d = Math.sqrt(u * u + f * f);
  if (d <= 0) return l;
  const h = l.speed * c;
  if (h <= 0) return l;
  if (h >= d) return { ...l, position: { x: wh, y: zh } };
  const p = h / d;
  return { ...l, position: { x: l.position.x + u * p, y: l.position.y + f * p } };
}
const G3 = 10,
  Z3 = 0.05,
  Y3 = 1.5;
function Ch({ machineMaxHp: l }) {
  return {
    baseAttack: K.fromNumber(G3),
    defense: K.ZERO,
    damageReduction: 0,
    critRate: Z3,
    critMultiplier: Y3,
    maxHp: l.isZero() ? K.fromNumber(1) : l,
    hpRegen: K.ZERO,
  };
}
function X3(l, c) {
  switch (l) {
    case 'laser':
      return Qr(c).attackPerSec;
    case 'cannon':
      return Yr(c).attackPerSec;
    case 'thunder':
      return Kr(c).attackPerSec;
    case 'cutter':
      return Xr(c).attackPerSec;
  }
}
function Q3({
  weapon: l,
  weaponLv: c,
  machine: s,
  enemiesInRange: u,
  rng: f,
  cutterAngleDeg: d = 0,
  attackMul: h,
}) {
  switch (l) {
    case 'laser': {
      const p = Qr(c),
        g = { ...p, damageMul: p.damageMul * h };
      return {
        hits: l2(s, g, u, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cannon': {
      const p = Yr(c),
        g = { ...p, damageMul: p.damageMul * h };
      return {
        hits: Xb(s, g, u, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'thunder': {
      const p = Kr(c),
        g = { ...p, damageMul: p.damageMul * h };
      return {
        hits: r2(s, g, u, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cutter': {
      const p = Xr(c),
        g = { ...p, damageMul: p.damageMul * h };
      return {
        hits: t2(s, g, u, d, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
  }
}
function K3(l, c, s) {
  if (c.type !== 'onWaveClear') return null;
  const u = l.tier;
  return { boltGain: K.fromNumber(5 * u) };
}
function W3(l, c, s) {
  if (c.type !== 'onDropRoll') return null;
  const u = l.tier,
    f = 0.05,
    h = f + ((0.5 - f) * u) / (u + 20);
  return s() >= h ? null : { dropMultiplier: 2 };
}
function J3(l, c, s) {
  return c.type !== 'onAttack' || c.enemyKind === 'normal'
    ? null
    : { damageMultiplier: 1 + 0.05 * l.tier };
}
function F3(l, c, s) {
  if (c.type !== 'onAttack') return null;
  const u = l.tier,
    f = 0.05,
    h = f + ((0.5 - f) * u) / (u + 20);
  return s() >= h ? null : { burnSec: 1 + 0.2 * u };
}
function I3(l, c, s) {
  if (c.type !== 'onHit') return null;
  const u = l.tier,
    f = 0.03,
    h = f + ((0.3 - f) * u) / (u + 20);
  return s() >= h ? null : { overrideReceivedDamage: K.ZERO };
}
function P3(l, c, s) {
  if (c.type !== 'onAttack') return null;
  const u = l.tier,
    f = 0.05,
    h = f + ((0.5 - f) * u) / (u + 20);
  return s() >= h ? null : { extraShot: !0 };
}
function t4(l, c, s) {
  if (c.type !== 'onAttack') return null;
  const u = l.tier,
    f = 0.05,
    h = f + ((0.5 - f) * u) / (u + 20);
  return s() >= h ? null : { freeze: !0, freezeSec: 1 + 0.2 * u };
}
function e4(l, c, s) {
  if (c.type !== 'onAttack' || c.enemyKind !== 'normal') return null;
  const u = l.tier,
    f = 0.02,
    h = f + ((0.2 - f) * u) / (u + 20);
  return s() >= h ? null : { instantKill: !0 };
}
function a4(l, c, s) {
  if (c.type !== 'onKill') return null;
  const u = l.tier,
    f = Math.ceil(0.5 * u);
  return { heal: K.fromNumber(f) };
}
function n4(l, c, s) {
  if (c.type !== 'onWaveClear') return null;
  const u = l.tier;
  return { heal: K.fromNumber(5 * u) };
}
const l4 = {
  instantKill: e4,
  bossKiller: J3,
  doubleShot: P3,
  damageImmune: I3,
  killHeal: a4,
  shieldRegen: n4,
  bonusDrop: W3,
  boltCast: K3,
  freezeHit: t4,
  burnHit: F3,
};
function i4(l, c) {
  const s = { ...l };
  if (
    (c.damageMultiplier !== void 0 &&
      (s.damageMultiplier = (s.damageMultiplier ?? 1) + (c.damageMultiplier - 1)),
    c.instantKill && (s.instantKill = !0),
    c.overrideReceivedDamage !== void 0)
  )
    if (s.overrideReceivedDamage === void 0) s.overrideReceivedDamage = c.overrideReceivedDamage;
    else {
      const u = s.overrideReceivedDamage,
        f = c.overrideReceivedDamage;
      s.overrideReceivedDamage = u.lte(f) ? u : f;
    }
  return (
    c.heal !== void 0 && (s.heal = (s.heal ?? K.ZERO).add(c.heal)),
    c.shieldRecover !== void 0 && (s.shieldRecover = (s.shieldRecover ?? 0) + c.shieldRecover),
    c.dropMultiplier !== void 0 &&
      (s.dropMultiplier = (s.dropMultiplier ?? 1) + (c.dropMultiplier - 1)),
    c.boltGain !== void 0 && (s.boltGain = (s.boltGain ?? K.ZERO).add(c.boltGain)),
    c.extraShot && (s.extraShot = !0),
    c.freeze && ((s.freeze = !0), (s.freezeSec = Math.max(s.freezeSec ?? 0, c.freezeSec ?? 0))),
    c.burnSec !== void 0 && (s.burnSec = Math.max(s.burnSec ?? 0, c.burnSec)),
    s
  );
}
function mc(l, c, s) {
  let u = {};
  for (const f of l) {
    const d = l4[f.name];
    if (d === void 0) continue;
    const h = d(f, c, s);
    h !== null && (u = i4(u, h));
  }
  return u;
}
const c4 = 1;
function s4(l, c) {
  if (c) return 0;
  const s = l / 1e3;
  return Math.min(c4, Math.max(0, s));
}
function o4(l, c, s, u) {
  return l < c * 1e3 ? 'continue' : s >= u ? 'advanceTier' : 'advanceWave';
}
function u4(l, c, s, u) {
  const f = l !== c;
  return { resetElapsed: f || s !== u, resetEnemies: f };
}
const Cr = 50,
  Rr = 50;
function Rh(l) {
  const c = l.x - Cr,
    s = l.y - Rr;
  return Math.sqrt(c * c + s * s);
}
const r4 = 10,
  f4 = 5,
  d4 = 30,
  m4 = 14,
  h4 = {
    laser: 'laserShoot',
    cannon: 'cannonShoot',
    thunder: 'thunderShoot',
    cutter: 'cutterShoot',
  },
  p4 = {
    laser: 'activeLaser',
    cannon: 'activeCannon',
    thunder: 'activeThunder',
    cutter: 'activeCutter',
  },
  y4 = 0.5;
function g4({ range: l, paused: c = !1 }) {
  const s = G.useRef(c);
  s.current = c;
  const u = G.useRef(null),
    f = G.useRef(0),
    d = G.useRef(0),
    h = G.useRef(0),
    p = G.useRef([]),
    g = G.useRef(0),
    y = G.useRef(0),
    _ = G.useRef(0),
    S = G.useRef(0),
    T = G.useRef(0),
    z = G.useRef(0),
    E = G.useRef(0),
    q = G.useRef(0),
    B = G.useRef([]),
    [F, C] = G.useState([]),
    [ot, Lt] = G.useState([]),
    [Zt, At] = G.useState([]),
    [it, qt] = G.useState([]),
    [Ft, Yt] = G.useState([]),
    [Qt, Kt] = G.useState(0),
    Ee = V((k) => k.isRunActive),
    ee = V((k) => k.currentTier),
    It = V((k) => k.currentWave),
    O = G.useMemo(() => U3(ee), [ee]),
    Z = G.useRef(ee),
    at = G.useRef(It);
  G.useEffect(() => {
    const k = u4(Z.current, ee, at.current, It);
    ((Z.current = ee),
      (at.current = It),
      k.resetElapsed && ((d.current = 0), (h.current = 0), Kt(0)),
      k.resetEnemies && ((p.current = []), C([]), (B.current = [])));
  }, [ee, It]);
  const bt = G.useCallback((k) => {
      Lt((Y) => Y.filter((nt) => nt.id !== k));
    }, []),
    Tt = G.useCallback((k) => {
      At((Y) => Y.filter((nt) => nt.id !== k));
    }, []),
    j = G.useCallback((k) => {
      qt((Y) => Y.filter((nt) => nt.id !== k));
    }, []),
    H = G.useCallback((k) => {
      Yt((Y) => Y.filter((nt) => nt.id !== k));
    }, []);
  return (
    G.useEffect(() => {
      if (!Ee) return;
      const k = (Y) => {
        const nt = Y - f.current;
        f.current = Y;
        const X = V.getState(),
          vt = X.machineHp.isZero(),
          $t = s4(nt, X.isPaused || vt || s.current);
        if ($t > 0) {
          q.current += $t * 1e3;
          const _t = q.current,
            De = Array.from(X.equippedPatches.values());
          (X.tickCooldowns($t),
            X.isAutoActive &&
              X.activeCdSec <= 0 &&
              X.triggerActive(d4) &&
              Dt.play(p4[X.currentWeapon]),
            (h.current = d.current),
            (d.current += $t * 1e3));
          const ya = O[X.currentWave - 1];
          if (ya != null) {
            const Ta = q3(
              ya,
              d.current,
              h.current,
              Math.random,
              () => ((g.current += 1), `e-${X.currentTier}-${X.currentWave}-${g.current}`)
            );
            (Ta.length > 0 && (p.current = [...p.current, ...Ta]),
              (p.current = p.current.map((tt) => V3(tt, $t, _t))),
              (p.current = p.current.map((tt) => {
                let rt = tt;
                if (rt.burnUntilMs != null && rt.burnPerSec != null && rt.burnUntilMs > _t) {
                  const Ht = rt.burnPerSec.mulNumber($t);
                  rt = { ...rt, hp: rt.hp.sub(Ht) };
                }
                const St = {};
                return (
                  rt.frozenUntilMs != null && rt.frozenUntilMs <= _t && (St.frozenUntilMs = void 0),
                  rt.burnUntilMs != null &&
                    rt.burnUntilMs <= _t &&
                    ((St.burnUntilMs = void 0), (St.burnPerSec = void 0)),
                  Object.keys(St).length > 0 && (rt = { ...rt, ...St }),
                  rt
                );
              })));
            const Ea = [];
            B.current = B.current.filter((tt) => (tt.applyAtMs <= _t ? (Ea.push(tt), !1) : !0));
            const Ye = [];
            if (Ea.length > 0) {
              const tt = new Map(Ea.map((rt) => [rt.enemyId, rt]));
              p.current = p.current.map((rt) => {
                const St = tt.get(rt.id);
                if (St == null) return rt;
                let Ht = { ...rt, hp: rt.hp.sub(St.damage) };
                if (St.freeze && St.freezeSec != null && St.freezeSec > 0) {
                  const kt = _t + St.freezeSec * 1e3;
                  Ht = { ...Ht, frozenUntilMs: Math.max(Ht.frozenUntilMs ?? 0, kt) };
                }
                if (St.burnSec != null && St.burnSec > 0) {
                  const kt = _t + St.burnSec * 1e3,
                    ne = St.damage.mulNumber(0.3),
                    Mt = Ht.burnPerSec;
                  Ht = {
                    ...Ht,
                    burnUntilMs: Math.max(Ht.burnUntilMs ?? 0, kt),
                    burnPerSec: Mt != null && Mt.gt(ne) ? Mt : ne,
                  };
                }
                return Ht;
              });
              for (const rt of Ea) {
                const St = p.current.find((Ht) => Ht.id === rt.enemyId);
                ((S.current += 1),
                  Ye.push({
                    id: `de-${S.current}`,
                    x: (St == null ? void 0 : St.position.x) ?? 50,
                    y: (St == null ? void 0 : St.position.y) ?? 50,
                    value: rt.damage,
                    crit: rt.crit,
                  }));
              }
            }
            const On = X.runWorkshopLevels.attackMul,
              Bn = X.runWorkshopLevels.attackSpeedMul,
              di = ol(On),
              ml = ol(Bn),
              Dn = X3(X.currentWeapon, X.weaponLv),
              Ja = Math.min(r4, Dn * ml),
              Ma = Ja > 0 ? 1e3 / Ja : 1 / 0;
            y.current += $t * 1e3;
            let hl = 0;
            const mi = 10,
              de = [],
              ga = [];
            for (; y.current >= Ma && hl < mi; ) {
              const tt = X.currentWeapon === 'cutter' ? m4 : l,
                rt = p.current
                  .map((kt) => ({ enemy: kt, dist: Rh(kt.position) }))
                  .filter(({ dist: kt }) => kt <= tt)
                  .sort((kt, ne) => kt.dist - ne.dist)
                  .map(({ enemy: kt }) => kt);
              if (rt.length === 0) {
                y.current = Math.min(y.current, Ma);
                break;
              }
              ((y.current -= Ma), (hl += 1), Dt.play(h4[X.currentWeapon]));
              const St = Ch({ machineMaxHp: X.machineMaxHp }),
                Ht = Q3({
                  weapon: X.currentWeapon,
                  weaponLv: X.weaponLv,
                  machine: St,
                  enemiesInRange: rt,
                  rng: Math.random,
                  cutterAngleDeg: _.current,
                  attackMul: di,
                });
              if (Ht.hits.length > 0) {
                const kt = Ht.hits.map((Mt) => {
                  const ft = p.current.find((wa) => wa.id === Mt.enemyId);
                  if (ft == null) return { ...Mt, freeze: !1, freezeSec: void 0, burnSec: void 0 };
                  const zt = mc(De, { type: 'onAttack', enemyKind: ft.kind }, Math.random);
                  let le = Mt.damage;
                  return (
                    zt.damageMultiplier != null &&
                      zt.damageMultiplier !== 1 &&
                      (le = le.mulNumber(zt.damageMultiplier)),
                    zt.extraShot && (le = le.add(Mt.damage)),
                    zt.instantKill && (le = ft.hp),
                    {
                      ...Mt,
                      damage: le,
                      freeze: zt.freeze === !0,
                      freezeSec: zt.freezeSec,
                      burnSec: zt.burnSec,
                    }
                  );
                });
                if (X.currentWeapon === 'cannon')
                  for (const ft of kt)
                    B.current.push({
                      enemyId: ft.enemyId,
                      damage: ft.damage,
                      crit: ft.crit ?? !1,
                      freeze: ft.freeze,
                      freezeSec: ft.freezeSec,
                      burnSec: ft.burnSec,
                      applyAtMs: _t + 480,
                    });
                else {
                  const Mt = new Map(kt.map((ft) => [ft.enemyId, ft]));
                  p.current = p.current.map((ft) => {
                    const zt = Mt.get(ft.id);
                    if (zt == null) return ft;
                    let le = { ...ft, hp: ft.hp.sub(zt.damage) };
                    if (zt.freeze && zt.freezeSec != null && zt.freezeSec > 0) {
                      const wa = _t + zt.freezeSec * 1e3;
                      le = { ...le, frozenUntilMs: Math.max(le.frozenUntilMs ?? 0, wa) };
                    }
                    if (zt.burnSec != null && zt.burnSec > 0) {
                      const wa = _t + zt.burnSec * 1e3,
                        Fa = zt.damage.mulNumber(0.3),
                        pi = le.burnPerSec;
                      le = {
                        ...le,
                        burnUntilMs: Math.max(le.burnUntilMs ?? 0, wa),
                        burnPerSec: pi != null && pi.gt(Fa) ? pi : Fa,
                      };
                    }
                    return le;
                  });
                  for (const ft of kt) {
                    const zt = p.current.find((le) => le.id === ft.enemyId);
                    ((S.current += 1),
                      de.push({
                        id: `de-${S.current}`,
                        x: (zt == null ? void 0 : zt.position.x) ?? 50,
                        y: (zt == null ? void 0 : zt.position.y) ?? 50,
                        value: ft.damage,
                        crit: ft.crit,
                      }));
                  }
                }
                const ne = kt
                  .map((Mt) => p.current.find((ft) => ft.id === Mt.enemyId))
                  .filter((Mt) => Mt != null)
                  .map((Mt) => ({ x: Mt.position.x, y: Mt.position.y }));
                if (X.currentWeapon === 'laser')
                  for (const Mt of ne)
                    ((z.current += 1),
                      ga.push({
                        id: `pj-${z.current}`,
                        kind: 'laser',
                        x1: Cr,
                        y1: Rr,
                        x2: Mt.x,
                        y2: Mt.y,
                      }));
                else if (X.currentWeapon === 'cannon')
                  for (const ft of ne)
                    ((z.current += 1),
                      ga.push({
                        id: `pj-${z.current}`,
                        kind: 'cannonShell',
                        x1: Cr,
                        y1: Rr,
                        x2: ft.x,
                        y2: ft.y,
                        durationMs: 480,
                      }),
                      (z.current += 1),
                      ga.push({
                        id: `pj-${z.current}`,
                        kind: 'blast',
                        x: ft.x,
                        y: ft.y,
                        delayMs: 480,
                      }));
                else if (X.currentWeapon === 'thunder' && ne.length > 0)
                  for (const ft of ne)
                    ((z.current += 1),
                      ga.push({
                        id: `pj-${z.current}`,
                        kind: 'thunderStrike',
                        x: ft.x,
                        y: ft.y,
                        durationMs: 320,
                      }));
              }
            }
            const Ln = [...de, ...Ye];
            (Ln.length > 0 && Lt((tt) => [...tt, ...Ln]),
              ga.length > 0 && qt((tt) => [...tt, ...ga]));
            const pl = ol(X.runWorkshopLevels.screwGainMul),
              ia = [],
              va = [],
              $n = [];
            let Na = K.ZERO,
              I = K.ZERO,
              Me = K.ZERO,
              ae = K.ZERO;
            for (const tt of p.current)
              if (tt.hp.lte(K.ZERO)) {
                ((T.current += 1),
                  ia.push({ id: `dh-${T.current}`, x: tt.position.x, y: tt.position.y }));
                const rt = mc(De, { type: 'onKill', enemyKind: tt.kind }, Math.random);
                rt.heal != null && (ae = ae.add(rt.heal));
                const Ht =
                    mc(
                      De,
                      {
                        type: 'onDropRoll',
                        baseDrops: {
                          screw: tt.reward.screw,
                          bolt: tt.reward.bolt,
                          alloy: tt.reward.alloyAmount,
                        },
                      },
                      Math.random
                    ).dropMultiplier ?? 1,
                  kt = tt.reward.screw;
                kt > 0 &&
                  ((Na = Na.add(K.fromNumber(kt * pl * Ht))),
                  (E.current += 1),
                  va.push({
                    id: `pk-${E.current}`,
                    x: tt.position.x,
                    y: tt.position.y,
                    iconName: 'screw',
                  }));
                const ne = tt.reward.bolt;
                (ne > 0 &&
                  (tt.kind !== 'normal' || Math.random() < y4) &&
                  ((I = I.add(K.fromNumber(ne * Ht))),
                  (E.current += 1),
                  va.push({
                    id: `pk-${E.current}`,
                    x: tt.position.x,
                    y: tt.position.y,
                    iconName: 'bolt',
                  })),
                  tt.reward.alloyChance > 0 &&
                    tt.reward.alloyAmount > 0 &&
                    Math.random() < tt.reward.alloyChance &&
                    ((Me = Me.add(K.fromNumber(tt.reward.alloyAmount * Ht))),
                    (E.current += 1),
                    va.push({
                      id: `pk-${E.current}`,
                      x: tt.position.x,
                      y: tt.position.y,
                      iconName: 'alloy',
                    })),
                  Dt.play(tt.kind === 'boss' || tt.kind === 'miniboss' ? 'bossKill' : 'enemyKill'));
              } else $n.push(tt);
            (ae.isZero() || X.setMachineHp(X.machineHp.add(ae)),
              ia.length > 0 && ((p.current = $n), At((tt) => [...tt, ...ia])),
              va.length > 0 && Yt((tt) => [...tt, ...va]),
              Na.isZero() || X.addScrew(Na),
              I.isZero() || X.addBolt(I),
              Me.isZero() || X.addAlloy(Me));
            const _a = Ch({ machineMaxHp: X.machineMaxHp });
            let re = K.ZERO;
            for (const tt of p.current)
              if (Rh(tt.position) <= f4) {
                const rt = Ub(tt.atk, _a);
                re = re.add(rt.mulNumber($t));
              }
            if (!re.isZero()) {
              const rt =
                mc(De, { type: 'onHit', receivedDamage: re }, Math.random).overrideReceivedDamage ??
                re;
              if (!rt.isZero()) {
                const St = X.machineHp;
                X.damageHp(rt);
                const Ht = V.getState().machineHp;
                Dt.play(Ht.isZero() && !St.isZero() ? 'machineDown' : 'machineHit');
              }
            }
            const hi = o4(d.current, ya.durationSec, X.currentWave, O.length);
            if (hi === 'advanceWave' || hi === 'advanceTier') {
              const tt = mc(De, { type: 'onWaveClear' }, Math.random);
              (tt.heal != null && !tt.heal.isZero() && X.setMachineHp(X.machineHp.add(tt.heal)),
                tt.boltGain != null && !tt.boltGain.isZero() && X.addBolt(tt.boltGain),
                hi === 'advanceWave'
                  ? (X.advanceWave(), Dt.play('waveClear'))
                  : (X.advanceTier(), Dt.play('tierClear')));
            }
          }
        }
        (C(p.current), Kt(d.current / 1e3), (u.current = requestAnimationFrame(k)));
      };
      return (
        (f.current = performance.now()),
        (u.current = requestAnimationFrame(k)),
        () => {
          u.current != null && (cancelAnimationFrame(u.current), (u.current = null));
        }
      );
    }, [Ee, O, l]),
    {
      enemies: F,
      damageEvents: ot,
      deathEvents: Zt,
      projectileEvents: it,
      pickupEvents: Ft,
      waveElapsedSec: Qt,
      onDamageDone: bt,
      onDeathDone: Tt,
      onProjectileDone: j,
      onPickupDone: H,
    }
  );
}
const Oh = 30,
  Bh = 30;
function v4(l, c) {
  return l && c.lte(K.ZERO) ? 'gameover' : null;
}
function _4() {
  const { navigate: l } = Cn(),
    c = V((I) => I.isRunActive),
    s = V((I) => I.screw),
    u = V((I) => I.bolt),
    f = V((I) => I.alloy),
    d = V((I) => I.runStartBolt),
    h = V((I) => I.runStartAlloy),
    p = V((I) => I.machineHp),
    g = V((I) => I.machineMaxHp),
    y = V((I) => I.currentTier),
    _ = V((I) => I.currentWave),
    S = V((I) => I.currentWeapon),
    T = V((I) => I.activeCdSec),
    z = V((I) => I.isAutoActive),
    E = V((I) => I.isPaused),
    q = V((I) => I.runWorkshopLevels),
    B = V((I) => I.bgmVolume),
    F = V((I) => I.seVolume),
    C = V((I) => I.setBgmVolume),
    ot = V((I) => I.setSeVolume),
    Lt = V((I) => I.setAutoActive),
    Zt = V((I) => I.switchWeapon),
    At = V((I) => I.setPaused),
    it = V((I) => I.upgradeRunWorkshop),
    qt = V((I) => I.triggerActive),
    [Ft, Yt] = G.useState(!1),
    [Qt, Kt] = G.useState(!1),
    [Ee, ee] = G.useState(!1),
    [It, O] = G.useState(!1);
  (G.useEffect(() => {
    c && O(!0);
  }, [c]),
    G.useEffect(() => {
      _ === 30 ? Dt.playBgm('battleBoss') : Dt.playBgm('battleNormal');
    }, [_]));
  const Z = G.useRef(_),
    [at, bt] = G.useState(null);
  G.useEffect(() => {
    (Z.current !== _ && bt((I) => (I ?? 0) + 1), (Z.current = _));
  }, [_]);
  const Tt = v4(c, p),
    [j, H] = G.useState(null),
    k = j ?? Tt,
    Y = k !== null,
    {
      enemies: nt,
      damageEvents: X,
      deathEvents: vt,
      projectileEvents: $t,
      pickupEvents: _t,
      waveElapsedSec: De,
      onDamageDone: ya,
      onDeathDone: Ta,
      onProjectileDone: Ea,
      onPickupDone: Ye,
    } = g4({ range: Bh, paused: Y }),
    On = Math.max(0, zr - De),
    Bn = [],
    di = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    ml = p,
    Dn = g.isZero() ? K.fromNumber(1) : g,
    Ja = () => {
      (At(!E), Dt.play('tap'));
    },
    Ma = () => {
      (Kt(!0), Dt.play('dialogOpen'));
    },
    hl = () => {
      (ee(!0), Dt.play('dialogOpen'));
    },
    mi = () => {
      (Kt(!1), H('retreat'), Dt.play('resultRetreat'));
    },
    de = () => {
      l('preparation');
    },
    ga = (I, Me) => {
      const ae = it(I, Me);
      Dt.play(ae ? 'purchaseOk' : 'reject');
    },
    Ln = (I) => {
      (Zt(I), Dt.play('weaponSwitch'));
    },
    pl = () => {
      if (!qt(Oh)) {
        Dt.play('reject');
        return;
      }
      const Me =
        S === 'laser'
          ? 'activeLaser'
          : S === 'cannon'
            ? 'activeCannon'
            : S === 'thunder'
              ? 'activeThunder'
              : 'activeCutter';
      Dt.play(Me);
    },
    ia = u.sub(d),
    va = f.sub(h),
    $n = { bolt: ia.lt(K.ZERO) ? K.ZERO : ia, alloy: va.lt(K.ZERO) ? K.ZERO : va, patches: [] },
    Na = 30;
  return r.jsxs('div', {
    className: Sr.root,
    children: [
      r.jsx(fl, {
        noScroll: !0,
        variant: 'battle',
        header: r.jsx(g5, {
          hpCurrent: ml,
          hpMax: Dn,
          tier: y,
          wave: _,
          totalWaves: Na,
          secondsRemaining: On,
          secondsTotal: zr,
          isBossWave: _ === Na,
          paused: E || Y,
        }),
        footer: r.jsxs('div', {
          className: Sr.battleFooter,
          children: [
            r.jsx(_3, {
              open: Ft,
              screw: s,
              levels: q,
              onUpgrade: ga,
              onClose: () => {
                Yt(!1);
              },
            }),
            r.jsx(Ux, {
              screw: s,
              equippedWeapon: S,
              weaponCds: di,
              activeCd: T,
              activeMax: Oh,
              isAutoActive: z,
              onSwitchWeapon: Ln,
              onActivate: pl,
              onToggleAuto: Lt,
              isPaused: E,
              onTogglePause: Ja,
              onOpenMenu: Ma,
              onOpenScreenSaver: hl,
              isWorkshopOpen: Ft,
              onToggleWorkshop: () => {
                Yt((I) => !I);
              },
            }),
          ],
        }),
        children: r.jsx(nx, {
          enemies: nt,
          damageEvents: X,
          hitEvents: Bn,
          deathEvents: vt,
          projectileEvents: $t,
          pickupEvents: _t,
          onDamageDone: ya,
          onDeathDone: Ta,
          onProjectileDone: Ea,
          onPickupDone: Ye,
          showCutterOrbit: S === 'cutter' && c && !E && !Y,
          range: Bh,
        }),
      }),
      r.jsxs('div', {
        className: Sr.overlayLayer,
        'aria-live': 'polite',
        children: [
          r.jsx(F5, {
            open: Qt,
            bgmVolume: B,
            seVolume: F,
            onBgmChange: C,
            onSeChange: ot,
            onRetreat: mi,
            onClose: () => {
              Kt(!1);
            },
          }),
          Y &&
            r.jsx(m3, {
              open: Y,
              status: k,
              reachedTier: y,
              reachedWave: _,
              killed: 0,
              elapsedSec: 0,
              reward: $n,
              onClose: de,
            }),
          r.jsx(j3, {
            open: Ee,
            onClose: () => {
              ee(!1);
            },
          }),
          It &&
            r.jsx(cS, {
              kind: 'battle-start',
              onDone: () => {
                O(!1);
              },
            }),
          at != null &&
            r.jsx(
              sS,
              {
                waveNumber: _,
                onDone: () => {
                  bt(null);
                },
              },
              at
            ),
        ],
      }),
    ],
  });
}
const b4 = '_root_1420p_3',
  S4 = { root: b4 };
function x4() {
  const l = V((f) => f.machineLevels),
    c = V((f) => f.bolt),
    s = V((f) => f.incrementMachineLv),
    u = V((f) => f.spendBolt);
  return r.jsx('div', {
    className: S4.root,
    children: Ws.map((f) => {
      const d = l[f.key],
        h = f.maxLv != null && d >= f.maxLv,
        p = Sc(f, d),
        g = Sc(f, d + 1),
        y = (Yt) => (f.unit === '%' ? Math.round(Yt * 1e3) / 10 : Yt),
        _ = y(p),
        S = y(g),
        T = Zr(f, d),
        z = vr(f, d, 5),
        E = K.fromNumber(T),
        q = K.fromNumber(z),
        B = Hb(f, d, c),
        F = f.maxLv != null ? f.maxLv - d : Number.POSITIVE_INFINITY,
        C = Math.min(B, F),
        ot = C > 0 ? vr(f, d, C) : T,
        Lt = K.fromNumber(ot),
        Zt = c.lt(E),
        At = c.lt(q) || (f.maxLv != null && d + 5 > f.maxLv),
        it = C < 1,
        qt = h
          ? []
          : [
              { amount: '+1', cost: E, disabled: Zt },
              { amount: '+5', cost: q, disabled: At },
              { amount: 'MAX', cost: Lt, disabled: it },
            ],
        Ft = (Yt) => {
          if (h) return;
          let Qt = 0;
          if ((Yt === '+1' ? (Qt = 1) : Yt === '+5' ? (Qt = 5) : Yt === 'MAX' && (Qt = C), Qt < 1))
            return;
          f.maxLv != null && (Qt = Math.min(Qt, f.maxLv - d));
          const Kt = vr(f, d, Qt),
            Ee = K.fromNumber(Kt);
          if (u(Ee)) for (let It = 0; It < Qt; It++) s(f.key);
        };
      return r.jsx(
        Wr,
        {
          title: f.title,
          iconName: f.iconName,
          currentLabel: `Lv ${d}`,
          before: _,
          after: h ? void 0 : S,
          beforeSuffix: f.unit ?? '',
          currency: 'bolt',
          accent: 'primary',
          maxed: h,
          options: qt,
          onUpgrade: Ft,
        },
        f.key
      );
    }),
  });
}
function j4() {
  const { navigate: l } = Cn(),
    c = (s) => {
      l(s);
    };
  return r.jsx(fl, {
    header: r.jsx(Ac, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: r.jsx(jc, { active: 'machine', onChange: c }),
    children: r.jsx(x4, {}),
  });
}
const A4 = () => r.jsx('div', { children: r.jsx('h1', { children: 'Not Found' }) }),
  T4 = '_content_9srrg_1',
  E4 = { content: T4 },
  M4 = '_root_1l9jp_1',
  N4 = '_header_1l9jp_8',
  w4 = '_headerTitleRow_1l9jp_15',
  z4 = '_headerCount_1l9jp_21',
  C4 = '_slotGrid_1l9jp_35',
  R4 = '_emptyHint_1l9jp_41',
  ii = { root: M4, header: N4, headerTitleRow: w4, headerCount: z4, slotGrid: C4, emptyHint: R4 },
  O4 = '_wrapper_16mrg_3',
  B4 = '_filled_16mrg_16',
  D4 = '_empty_16mrg_25',
  L4 = '_locked_16mrg_26',
  $4 = '_slotInner_16mrg_59',
  H4 = '_emptyIcon_16mrg_67',
  U4 = '_emptyLabel_16mrg_74',
  Mn = {
    wrapper: O4,
    filled: B4,
    empty: D4,
    locked: L4,
    slotInner: $4,
    emptyIcon: H4,
    emptyLabel: U4,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  },
  q4 = '_root_12m2l_3',
  k4 = '_selected_12m2l_15',
  V4 = '_merging_12m2l_19',
  G4 = '_locked_12m2l_23',
  Z4 = '_disabled_12m2l_28',
  Y4 = '_card_12m2l_34',
  X4 = '_tierBadge_12m2l_46',
  Q4 = '_count_12m2l_54',
  K4 = '_countZero_12m2l_74',
  W4 = '_iconWrap_12m2l_79',
  J4 = '_name_12m2l_90',
  F4 = '_detail_12m2l_102',
  I4 = '_trigger_12m2l_110',
  P4 = '_effect_12m2l_121',
  tj = '_mergingBadge_12m2l_133',
  je = {
    root: q4,
    selected: k4,
    merging: V4,
    locked: G4,
    disabled: Z4,
    card: Y4,
    tierBadge: X4,
    count: Q4,
    countZero: K4,
    iconWrap: W4,
    name: J4,
    detail: F4,
    trigger: I4,
    effect: P4,
    mergingBadge: tj,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  ej = { sm: 22, md: 26, lg: 32 },
  Dh = { sm: 38, md: 44, lg: 52 };
function Ir({
  name: l,
  iconName: c,
  tier: s,
  count: u,
  trigger: f,
  effect: d,
  selected: h = !1,
  merging: p = !1,
  locked: g = !1,
  disabled: y = !1,
  size: _ = 'md',
  onClick: S,
}) {
  const T = Math.min(Math.max(1, Math.floor(s)), 5),
    z = `var(--c-patch-t${T})`,
    E = S != null && !y && !g,
    q = h ? { boxShadow: 'var(--glow-cyan-md)' } : p ? { boxShadow: 'var(--glow-purple-md)' } : {},
    B = {
      width: Dh[_],
      height: Dh[_],
      opacity: g ? 0.35 : 1,
      background: g ? 'var(--c-surface)' : `linear-gradient(135deg, ${z}22, ${z}08)`,
      border: g ? '1px solid var(--c-border-faint)' : `1px solid ${z}55`,
      filter: g ? 'none' : `drop-shadow(0 0 4px ${z}55)`,
    },
    F = {
      background: u >= 2 ? `${z}22` : void 0,
      borderColor: u >= 2 ? z : void 0,
      color: u >= 2 ? z : void 0,
    };
  return r.jsx('div', {
    className: [
      je.root,
      h ? je.selected : '',
      p ? je.merging : '',
      g ? je.locked : '',
      y ? je.disabled : '',
      je[`size-${_}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: q,
    onClick: E ? S : void 0,
    role: E ? 'button' : void 0,
    tabIndex: E ? 0 : void 0,
    onKeyDown: E
      ? (C) => {
          (C.key === 'Enter' || C.key === ' ') && (C.preventDefault(), S == null || S());
        }
      : void 0,
    'aria-pressed': E ? h : void 0,
    'aria-disabled': y || g ? !0 : void 0,
    children: r.jsxs(dl, {
      variant: 'elevated',
      padding: 'sm',
      interactive: E,
      className: je.card,
      children: [
        !g &&
          r.jsx('span', {
            className: je.tierBadge,
            children: r.jsx(Tc, { text: `T${T}`, variant: 'patch-tier', tier: s }),
          }),
        r.jsxs('span', {
          className: [je.count, u === 0 ? je.countZero : ''].filter(Boolean).join(' '),
          style: F,
          children: ['×', g ? '?' : u],
        }),
        r.jsx('div', {
          className: je.iconWrap,
          style: B,
          children: r.jsx(Ut, {
            name: g ? 'close' : c,
            size: ej[_],
            color: g ? 'var(--c-text-disabled)' : z,
          }),
        }),
        r.jsx(Q, {
          variant: 'caption',
          color: g ? 'dim' : 'text',
          className: je.name,
          children: g ? '???' : l,
        }),
        !g &&
          r.jsxs('div', {
            className: je.detail,
            children: [
              r.jsx('span', { className: je.trigger, children: f }),
              r.jsx('span', { className: je.effect, children: d }),
            ],
          }),
        p && r.jsx('span', { className: je.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
function p1({ patch: l = null, slotIndex: c, locked: s = !1, size: u = 'md', onClick: f }) {
  const d = l != null,
    h = f != null && !s,
    p = c != null ? `Slot ${c}` : '',
    g = d
      ? `Slot ${c ?? ''}: ${l.name} (Tier ${l.tier})`
      : s
        ? `Slot ${c ?? ''} (locked)`.trim()
        : `Slot ${c ?? ''} (empty)`.trim(),
    y = d ? Mn.filled : s ? Mn.locked : Mn.empty;
  return r.jsx('div', {
    className: [Mn.wrapper, y, Mn[`size-${u}`]].filter(Boolean).join(' '),
    role: h ? 'button' : void 0,
    tabIndex: h ? 0 : void 0,
    'aria-label': g,
    'aria-disabled': s ? !0 : void 0,
    onClick: h ? f : void 0,
    onKeyDown: h
      ? (_) => {
          (_.key === 'Enter' || _.key === ' ') && (_.preventDefault(), f == null || f());
        }
      : void 0,
    children:
      d && l != null
        ? r.jsx(Ir, {
            patchId: l.patchId,
            name: l.name,
            iconName: l.iconName,
            tier: l.tier,
            count: l.count,
            trigger: l.trigger,
            effect: l.effect,
            size: u,
          })
        : r.jsxs('div', {
            className: Mn.slotInner,
            children: [
              r.jsx('span', {
                className: Mn.emptyIcon,
                children: r.jsx(Ut, {
                  name: s ? 'close' : 'plus',
                  size: 28,
                  color: s ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              r.jsx('span', { className: Mn.emptyLabel, children: s ? 'LOCKED' : p }),
            ],
          }),
  });
}
function aj(l) {
  return Math.min(1 + l, ui);
}
const nj = {
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
  lj = {
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
  ij = {
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
function cj({ overridePatches: l, overrideEquipped: c, overridePatchSlotsLv: s }) {
  const u = V((E) => E.patches),
    f = V((E) => E.equippedPatches),
    d = V((E) => E.machineLevels.patchSlots),
    h = V((E) => E.unequipPatch),
    p = l ?? u,
    g = c ?? f,
    _ = aj(s ?? d),
    S = (E) => {
      const q = g.get(E);
      if (!q) return null;
      const B = `${q.name}#${q.tier}`,
        F = p.get(B);
      return {
        patchId: B,
        name: q.name,
        iconName: nj[q.name] ?? 'spark',
        tier: q.tier,
        trigger: lj[q.name] ?? '常時',
        effect: ij[q.name] ?? '-',
        count: (F == null ? void 0 : F.count) ?? 0,
      };
    },
    T = (E) => {
      g.get(E) && h(E);
    },
    z = ui - _;
  return r.jsxs('div', {
    className: ii.root,
    children: [
      r.jsxs('div', {
        className: ii.header,
        children: [
          r.jsxs('div', {
            className: ii.headerTitleRow,
            children: [
              r.jsx(Q, { variant: 'heading-3', children: '装着スロット' }),
              r.jsxs(Q, {
                variant: 'caption',
                color: 'mid',
                className: ii.headerCount,
                children: [g.size, '/', _],
              }),
            ],
          }),
          r.jsxs(Q, {
            variant: 'caption',
            color: 'dim',
            children: ['(', ui, ' スロット中 ', z, ' ロック・', g.size, ' / ', _, ' ', '装着中)'],
          }),
        ],
      }),
      r.jsx('div', {
        className: ii.slotGrid,
        children: Array.from({ length: ui }, (E, q) => {
          const B = q >= _,
            F = B ? null : S(q);
          return r.jsx(
            p1,
            { slotIndex: q + 1, patch: F, locked: B, size: 'md', onClick: B ? void 0 : () => T(q) },
            q
          );
        }),
      }),
      g.size === 0 &&
        _ > 0 &&
        r.jsx(Q, {
          variant: 'caption',
          color: 'dim',
          className: ii.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const sj = '_root_16zq4_1',
  oj = '_header_16zq4_8',
  uj = '_grid_16zq4_14',
  rj = '_empty_16zq4_20',
  hc = { root: sj, header: oj, grid: uj, empty: rj },
  fj = {
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
  dj = {
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
  mj = {
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
function hj({ overridePatches: l, overrideEquipped: c, selectedId: s, onSelect: u }) {
  const f = V((_) => _.patches),
    d = V((_) => _.equippedPatches),
    h = l ?? f,
    p = c ?? d,
    g = new Set(Array.from(p.values()).map((_) => _.name)),
    y = Array.from(h.values());
  return y.length === 0
    ? r.jsx('div', {
        className: hc.root,
        children: r.jsx('div', {
          className: hc.empty,
          children: r.jsx(Q, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : r.jsxs('div', {
        className: hc.root,
        children: [
          r.jsxs('div', {
            className: hc.header,
            children: [
              r.jsx(Q, { variant: 'heading-3', children: 'パッチ在庫' }),
              r.jsxs(Q, { variant: 'caption', color: 'dim', children: [y.length, ' 種類'] }),
            ],
          }),
          r.jsx('div', {
            className: hc.grid,
            children: y.map((_) => {
              const S = `${_.name}#${_.tier}`,
                T = g.has(_.name);
              return r.jsx(
                Ir,
                {
                  patchId: S,
                  name: _.name,
                  iconName: fj[_.name] ?? 'spark',
                  tier: _.tier,
                  count: _.count,
                  trigger: dj[_.name] ?? '常時',
                  effect: mj[_.name] ?? '-',
                  selected: s === S,
                  locked: T,
                  onClick: u ? () => u(s === S ? null : S) : void 0,
                },
                S
              );
            }),
          }),
        ],
      });
}
const pj = '_root_1svx2_1',
  yj = '_header_1svx2_8',
  gj = '_tierControl_1svx2_14',
  vj = '_tierStepperRow_1svx2_24',
  _j = '_mergeList_1svx2_30',
  bj = '_empty_1svx2_36',
  ci = { root: pj, header: yj, tierControl: gj, tierStepperRow: vj, mergeList: _j, empty: bj },
  Sj = '_stepper_1ouvh_1',
  xj = '_disabled_1ouvh_6',
  jj = '_btn_1ouvh_11',
  Aj = '_value_1ouvh_38',
  si = {
    stepper: Sj,
    disabled: xj,
    btn: jj,
    value: Aj,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  Tj = ({
    value: l,
    min: c,
    max: s,
    step: u = 1,
    onChange: f,
    size: d = 'md',
    disabled: h = !1,
  }) => {
    const p = l - u >= c,
      g = l + u <= s,
      y = () => {
        h || !p || f(Math.max(c, l - u));
      },
      _ = () => {
        h || !g || f(Math.min(s, l + u));
      };
    return r.jsxs('div', {
      className: [si.stepper, si[`size-${d}`], h ? si.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        r.jsx('button', {
          type: 'button',
          className: si.btn,
          onClick: y,
          disabled: h || !p,
          'aria-label': '減少',
          children: '−',
        }),
        r.jsx('span', {
          className: si.value,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          children: l,
        }),
        r.jsx('button', {
          type: 'button',
          className: si.btn,
          onClick: _,
          disabled: h || !g,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  Or = 5,
  Ej = {
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
function y1(l, c) {
  const s = [];
  for (const u of l.values())
    u.tier < c &&
      u.count >= 2 &&
      s.push({ name: u.name, tier: u.tier, count: u.count, iconName: Ej[u.name] ?? 'spark' });
  return s.sort((u, f) => u.tier - f.tier || u.name.localeCompare(f.name));
}
function Mj(l, c) {
  let s = new Map(l),
    u = !0;
  for (; u; ) {
    u = !1;
    for (const f of Array.from(s.values())) {
      if (f.tier >= c || f.count < 2 || f.tier >= Or) continue;
      const d = `${f.name}#${f.tier}`,
        h = Math.floor(f.count / 2),
        p = f.count % 2,
        g = f.tier + 1,
        y = `${f.name}#${g}`,
        _ = s.get(y),
        S = ((_ == null ? void 0 : _.count) ?? 0) + h;
      ((s = new Map(s)),
        p === 0 ? s.delete(d) : s.set(d, { ...f, count: p }),
        s.set(y, { name: f.name, tier: g, count: S }),
        (u = !0));
    }
  }
  return s;
}
function Nj({ overridePatches: l }) {
  const c = V((T) => T.patches),
    s = V((T) => T.addPatch),
    u = V((T) => T.consumePatch),
    f = V((T) => T.pruneEmptyPatches),
    d = l ?? c,
    h = Math.max(1, ...Array.from(d.values()).map((T) => T.tier)),
    [p, g] = G.useState(Math.min(h, Or - 1)),
    y = y1(d, p + 1),
    _ = y.length > 0,
    S = () => {
      if (l) return;
      const T = Mj(d, p + 1);
      for (const [z, E] of d) {
        const q = T.get(z),
          B = (q == null ? void 0 : q.count) ?? 0;
        B < E.count && u(E.name, E.tier, E.count - B);
      }
      for (const [z, E] of T) {
        const q = d.get(z),
          B = (q == null ? void 0 : q.count) ?? 0;
        E.count > B && s(E.name, E.tier, E.count - B);
      }
      f();
    };
  return r.jsxs('div', {
    className: ci.root,
    children: [
      r.jsx('div', {
        className: ci.header,
        children: r.jsx(Q, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      r.jsxs('div', {
        className: ci.tierControl,
        children: [
          r.jsx(Q, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          r.jsxs('div', {
            className: ci.tierStepperRow,
            children: [
              r.jsx(Tj, { value: p, min: 1, max: Or - 1, onChange: g }),
              r.jsxs(Q, {
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
                className: ci.mergeList,
                children: y.map((T) =>
                  r.jsx(
                    Ir,
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
              r.jsx(Ze, {
                label: `一括合成 (${y.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: S,
              }),
            ],
          })
        : r.jsxs('div', {
            className: ci.empty,
            children: [
              r.jsx(Q, { variant: 'body', color: 'dim', children: '合成可能なパッチがありません' }),
              r.jsx(Q, {
                variant: 'caption',
                color: 'dim',
                children: '同じ Tier のパッチが 2 個以上あると合成できます',
              }),
            ],
          }),
    ],
  });
}
function wj(l) {
  return Math.min(1 + l, ui);
}
function zj() {
  const { navigate: l } = Cn(),
    [c, s] = G.useState('equip'),
    u = V((z) => z.equippedPatches),
    f = V((z) => z.patches),
    d = V((z) => z.machineLevels.patchSlots),
    h = wj(d),
    p = u.size,
    g = f.size,
    y = y1(f, 5).length,
    _ = (z) => {
      l(z);
    },
    S = () => {
      l('preparation');
    },
    T = [
      { key: 'equip', label: '装着', badge: `${p}/${h}` },
      { key: 'inventory', label: '所持', badge: g > 0 ? g : void 0 },
      { key: 'merge', label: '合成', badge: y > 0 ? y : void 0 },
    ];
  return r.jsx(fl, {
    header: r.jsx(Ac, {
      title: 'パッチ庫',
      subtitle: `装着 ${p}/${h} ・ 在庫 ${g} 種`,
      onBack: S,
      currencies: [],
      tabBar: r.jsx(Qs, { tabs: T, value: c, onChange: s, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(jc, { active: 'patches', onChange: _ }),
    children: r.jsxs('div', {
      className: E4.content,
      children: [
        c === 'equip' && r.jsx(cj, {}),
        c === 'inventory' && r.jsx(hj, {}),
        c === 'merge' && r.jsx(Nj, {}),
      ],
    }),
  });
}
const Cj = '_footer_qoo97_1',
  Rj = '_tabPanel_qoo97_7',
  Lh = { footer: Cj, tabPanel: Rj },
  Oj = '_wrapper_1lf9s_1',
  Bj = '_header_1lf9s_7',
  Dj = '_headerLabel_1lf9s_13',
  Lj = '_empty_1lf9s_18',
  $j = '_emptyIcon_1lf9s_29',
  Hj = '_grid_1lf9s_33',
  Uj = '_note_1lf9s_39',
  nl = { wrapper: Oj, header: Bj, headerLabel: Dj, empty: Lj, emptyIcon: $j, grid: Hj, note: Uj },
  qj = {
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
function kj({ onOpenPatchScreen: l }) {
  const c = V((h) => h.equippedPatches),
    s = V((h) => h.machineLevels.patchSlots),
    u = Math.min(1 + s, ui),
    f = [];
  for (let h = 0; h < u; h++) {
    const p = c.get(h);
    if (p != null) {
      const g = qj[p.name],
        y = {
          patchId: `${p.name}#${p.tier}`,
          name: g.name,
          iconName: g.iconName,
          tier: p.tier,
          trigger: g.trigger,
          effect: g.effect,
          count: 1,
        };
      f.push({ kind: 'filled', patch: y, idx: h + 1 });
    } else f.push({ kind: 'empty', patch: null, idx: h + 1 });
  }
  const d = [...c.values()].length;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '装着パッチ',
    className: nl.wrapper,
    children: [
      r.jsxs('div', {
        className: nl.header,
        children: [
          r.jsxs(Q, {
            variant: 'caption',
            color: 'mid',
            className: nl.headerLabel,
            children: ['装着 ', d, ' / ', u],
          }),
          l != null &&
            r.jsx(Ze, {
              label: '装備変更',
              variant: 'ghost',
              size: 'sm',
              iconRight: r.jsx(Ut, { name: 'chevron-right', size: 14 }),
              onClick: l,
            }),
        ],
      }),
      d === 0
        ? r.jsxs('div', {
            className: nl.empty,
            children: [
              r.jsx('span', {
                className: nl.emptyIcon,
                children: r.jsx(Ut, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              r.jsx(Q, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              l != null &&
                r.jsx(Ze, {
                  label: 'パッチ庫を開く',
                  variant: 'secondary',
                  size: 'sm',
                  onClick: l,
                }),
            ],
          })
        : r.jsx('div', {
            className: nl.grid,
            children: f.map((h, p) =>
              r.jsx(p1, { patch: h.patch, slotIndex: h.idx, onClick: l }, p)
            ),
          }),
      r.jsx(Q, {
        variant: 'caption',
        color: 'dim',
        align: 'center',
        as: 'p',
        className: nl.note,
        children: '変更はパッチ庫で行えます',
      }),
    ],
  });
}
const Vj = '_wrapper_iebuz_1',
  Gj = '_header_iebuz_7',
  Zj = '_grid_iebuz_12',
  jr = { wrapper: Vj, header: Gj, grid: Zj },
  Yj = [
    { kind: 'laser', name: 'LASER', description: '高速直進ビーム。貫通で削る。', buildStats: o1 },
    { kind: 'cannon', name: 'CANNON', description: '範囲爆発で群れを薙ぐ。', buildStats: u1 },
    { kind: 'thunder', name: 'THUNDER', description: '同時 3 体を撃つ電撃。', buildStats: r1 },
    {
      kind: 'cutter',
      name: 'CUTTER',
      description: 'マシン周囲を旋回する斬撃。',
      buildStats: (l, c) => f1(l, c),
    },
  ];
function Xj({ selectedWeapon: l, onSelect: c }) {
  const s = V((y) => y.initialWeapon),
    u = V((y) => y.setInitialWeapon),
    f = V((y) => y.machineLevels),
    d = c1(f.baseAttack),
    h = s1(f.range),
    p = l ?? s,
    g = (y) => {
      (u(y), c == null || c(y));
    };
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: jr.wrapper,
    children: [
      r.jsx('div', {
        className: jr.header,
        children: r.jsx(Q, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      r.jsx('div', {
        className: jr.grid,
        children: Yj.map((y) =>
          r.jsx(
            l1,
            {
              weapon: y.kind,
              name: y.name,
              description: y.description,
              stats: y.buildStats(0, d, h),
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
const Qj = '_wrapper_1rg1e_1',
  Kj = '_sticky_1rg1e_15',
  Wj = '_summary_1rg1e_19',
  Jj = '_weaponInfo_1rg1e_29',
  Fj = '_patchInfo_1rg1e_37',
  pc = { wrapper: Qj, sticky: Kj, summary: Wj, weaponInfo: Jj, patchInfo: Fj };
function Ij({
  tier: l,
  weaponKind: c,
  patchCount: s = 0,
  disabled: u = !1,
  onLaunch: f,
  sticky: d = !0,
}) {
  return r.jsxs('div', {
    role: 'group',
    'aria-label': '出撃',
    className: [pc.wrapper, d ? pc.sticky : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: pc.summary,
        children: [
          l != null && r.jsx(Tc, { variant: 'tier', tier: l, size: 'sm' }),
          c != null &&
            r.jsxs('span', {
              className: pc.weaponInfo,
              children: [
                r.jsx(Ut, { name: c, size: 14 }),
                r.jsx(Q, { variant: 'label', color: 'primary', children: c.toUpperCase() }),
              ],
            }),
          r.jsxs('span', {
            className: pc.patchInfo,
            children: [
              r.jsx(Ut, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              r.jsxs(Q, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', s] }),
            ],
          }),
        ],
      }),
      r.jsx(Ze, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: u,
        iconLeft: r.jsx(Ut, { name: 'tower', size: 18 }),
        onClick: f,
      }),
    ],
  });
}
const Pj = '_wrapper_1ul9l_1',
  tA = '_header_1ul9l_7',
  eA = '_grid_1ul9l_14',
  aA = '_tierBtn_1ul9l_20',
  nA = '_active_1ul9l_35',
  lA = '_tierLabel_1ul9l_50',
  iA = '_frontierLabel_1ul9l_61',
  ll = {
    wrapper: Pj,
    header: tA,
    grid: eA,
    tierBtn: aA,
    active: nA,
    tierLabel: lA,
    frontierLabel: iA,
  };
function cA({ selectedTier: l, onSelect: c }) {
  const s = V((h) => h.highestTier),
    u = Math.max(1, s),
    f = [];
  for (let h = 1; h <= u; h++) f.push(h);
  const d = (h) => `var(--c-tier-${Math.max(1, Math.min(10, h))})`;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': 'Tier 選択',
    className: ll.wrapper,
    children: [
      r.jsxs('div', {
        className: ll.header,
        children: [
          r.jsx(Q, {
            variant: 'caption',
            color: 'mid',
            children: '到達済み Tier を選んで出撃します。',
          }),
          r.jsxs(Q, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', u] }),
        ],
      }),
      r.jsx('div', {
        className: ll.grid,
        children: f.map((h) => {
          const p = h === l,
            g = h === u,
            y = d(h);
          return r.jsxs(
            'button',
            {
              type: 'button',
              'aria-pressed': p,
              'data-active': p,
              'data-frontier': g,
              className: [ll.tierBtn, p ? ll.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': y },
              onClick: () => (c == null ? void 0 : c(h)),
              children: [
                r.jsxs('span', { className: ll.tierLabel, children: ['T', h] }),
                g && !p && r.jsx('span', { className: ll.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            h
          );
        }),
      }),
    ],
  });
}
const sA = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function oA(l) {
  const { initialSelectedTier: c } = l,
    { navigate: s } = Cn(),
    [u, f] = G.useState('tier'),
    d = V((B) => B.highestTier),
    [h, p] = G.useState(c ?? Math.max(1, d)),
    g = V((B) => B.initialWeapon),
    _ = [...V((B) => B.equippedPatches).values()].length,
    S = V((B) => B.machineLevels),
    T = V((B) => B.startRun);
  function z() {
    const B = Ws.find((C) => C.key === 'maxHp'),
      F = B != null ? Sc(B, S.maxHp) : 100;
    (T({ initialWeapon: g, baseMachineMaxHp: K.fromNumber(F) }), s('battle'));
  }
  const E = r.jsx(Ac, {
      title: '出撃準備',
      currencies: ['bolt', 'alloy'],
      tabBar: r.jsx(Qs, { tabs: sA, value: u, onChange: f, variant: 'underline', fullWidth: !0 }),
    }),
    q = r.jsxs('div', {
      className: Lh.footer,
      children: [
        r.jsx(Ij, { tier: h, weaponKind: g, patchCount: _, sticky: !1, onLaunch: z }),
        r.jsx(jc, { active: 'preparation', onChange: (B) => s(B) }),
      ],
    });
  return r.jsx(fl, {
    header: E,
    footer: q,
    children: r.jsxs('div', {
      className: Lh.tabPanel,
      children: [
        u === 'tier' && r.jsx(cA, { selectedTier: h, onSelect: p }),
        u === 'weapon' && r.jsx(Xj, {}),
        u === 'patches' && r.jsx(kj, { onOpenPatchScreen: () => s('patches') }),
      ],
    }),
  });
}
const uA = '_content_8gsha_1',
  rA = { content: uA },
  fA = '_root_1b7n9_1',
  dA = '_header_1b7n9_8',
  mA = '_storageCard_1b7n9_13',
  hA = '_storageRow_1b7n9_23',
  pA = '_divider_1b7n9_29',
  yA = '_section_1b7n9_34',
  gA = '_dangerSection_1b7n9_40',
  vA = '_sectionHeader_1b7n9_50',
  na = {
    root: fA,
    header: dA,
    storageCard: mA,
    storageRow: hA,
    divider: pA,
    section: yA,
    dangerSection: gA,
    sectionHeader: vA,
  },
  _A = '_wrapper_11b89_1',
  bA = '_disabled_11b89_6',
  SA = '_hiddenInput_11b89_11',
  xA = '_btn_11b89_15',
  jA = '_fileName_11b89_41',
  yc = { wrapper: _A, disabled: bA, hiddenInput: SA, btn: xA, fileName: jA },
  AA = ({
    accept: l = 'application/json',
    onChange: c,
    label: s = 'ファイルを選択',
    disabled: u = !1,
  }) => {
    const f = G.useRef(null),
      [d, h] = G.useState(null),
      p = () => {
        var y;
        u || (y = f.current) == null || y.click();
      },
      g = (y) => {
        var S;
        const _ = ((S = y.target.files) == null ? void 0 : S[0]) ?? null;
        (h((_ == null ? void 0 : _.name) ?? null), c(_), f.current && (f.current.value = ''));
      };
    return r.jsxs('div', {
      className: [yc.wrapper, u ? yc.disabled : ''].join(' '),
      children: [
        r.jsx('input', {
          ref: f,
          type: 'file',
          accept: l,
          className: yc.hiddenInput,
          onChange: g,
          disabled: u,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        r.jsx('button', {
          type: 'button',
          className: yc.btn,
          onClick: p,
          disabled: u,
          children: s,
        }),
        d && r.jsx('span', { className: yc.fileName, title: d, children: d }),
      ],
    });
  };
function TA({ storageInfo: l, onExport: c, onImport: s, onReset: u }) {
  const [f, d] = G.useState(!1),
    [h, p] = G.useState(!1),
    [g, y] = G.useState(!1),
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
    S = async (z) => {
      if (!(!z || !s)) {
        p(!0);
        try {
          await s(z);
        } finally {
          p(!1);
        }
      }
    },
    T = async () => {
      (d(!1), u && (await u()));
    };
  return r.jsxs('div', {
    className: na.root,
    children: [
      r.jsx('div', {
        className: na.header,
        children: r.jsx(Q, { variant: 'heading-3', children: 'データ管理' }),
      }),
      l &&
        r.jsxs('div', {
          className: na.storageCard,
          children: [
            r.jsx(Q, { variant: 'label', color: 'mid', children: 'ストレージ使用量' }),
            r.jsxs('div', {
              className: na.storageRow,
              children: [
                r.jsx(Q, { variant: 'numeric-l', children: l.usedKb }),
                r.jsx(Q, { variant: 'caption', color: 'dim', children: 'KB' }),
              ],
            }),
            r.jsxs(Q, {
              variant: 'caption',
              color: 'dim',
              children: ['セーブスロット: ', l.slots, ' / 最終保存: ', l.lastSavedAt],
            }),
          ],
        }),
      r.jsx('div', { className: na.divider }),
      r.jsxs('div', {
        className: na.section,
        children: [
          r.jsxs('div', {
            className: na.sectionHeader,
            children: [
              r.jsx(Q, { variant: 'label', color: 'mid', children: 'エクスポート' }),
              r.jsx(Q, {
                variant: 'caption',
                color: 'dim',
                children: 'セーブデータを JSON ファイルとしてダウンロード',
              }),
            ],
          }),
          r.jsx(Ze, {
            label: g ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: _,
            disabled: g || !c,
          }),
        ],
      }),
      r.jsxs('div', {
        className: na.section,
        children: [
          r.jsxs('div', {
            className: na.sectionHeader,
            children: [
              r.jsx(Q, { variant: 'label', color: 'mid', children: 'インポート' }),
              r.jsx(Q, {
                variant: 'caption',
                color: 'dim',
                children: 'JSON ファイルからセーブデータを復元（上書き）',
              }),
            ],
          }),
          r.jsx(AA, {
            accept: 'application/json',
            onChange: S,
            label: h ? 'インポート中...' : 'ファイルを選択してインポート',
            disabled: h || !s,
          }),
        ],
      }),
      r.jsx('div', { className: na.divider }),
      r.jsxs('div', {
        className: na.dangerSection,
        children: [
          r.jsxs('div', {
            className: na.sectionHeader,
            children: [
              r.jsx(Q, { variant: 'label', color: 'mid', children: 'データリセット' }),
              r.jsx(Q, {
                variant: 'caption',
                color: 'dim',
                children: 'すべてのデータを削除します。この操作は取り消せません。',
              }),
            ],
          }),
          r.jsx(Ze, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => d(!0),
            disabled: !u,
          }),
        ],
      }),
      r.jsx(h1, {
        open: f,
        title: 'データをリセットしますか？',
        message: 'すべてのセーブデータが削除されます。この操作は取り消せません。',
        iconName: 'skull',
        confirmLabel: 'リセットする',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: T,
        onCancel: () => d(!1),
      }),
    ],
  });
}
const EA = '_root_1rbig_1',
  MA = '_header_1rbig_8',
  NA = '_section_1rbig_13',
  Ar = { root: EA, header: MA, section: NA },
  wA = '_wrapper_16nmz_9',
  zA = '_disabled_16nmz_15',
  CA = '_off_16nmz_31',
  RA = '_on_16nmz_35',
  OA = '_accent_primary_16nmz_35',
  BA = '_accent_secondary_16nmz_39',
  DA = '_accent_success_16nmz_43',
  LA = '_accent_disabled_16nmz_47',
  $A = '_size_md_16nmz_56',
  HA = '_knob_16nmz_60',
  UA = '_size_sm_16nmz_70',
  qA = '_labelGroup_16nmz_93',
  kA = '_label_16nmz_93',
  VA = '_description_16nmz_106',
  da = {
    wrapper: wA,
    disabled: zA,
    switch: '_switch_16nmz_22',
    off: CA,
    on: RA,
    accent_primary: OA,
    accent_secondary: BA,
    accent_success: DA,
    accent_disabled: LA,
    size_md: $A,
    knob: HA,
    size_sm: UA,
    labelGroup: qA,
    label: kA,
    description: VA,
  },
  g1 = ({
    checked: l,
    onChange: c,
    disabled: s = !1,
    label: u,
    description: f,
    accent: d = 'primary',
    size: h = 'md',
  }) => {
    const p = s || d === 'disabled',
      g = () => {
        p || c(!l);
      };
    return r.jsxs('label', {
      className: [da.wrapper, p ? da.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': p,
      children: [
        r.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': l,
          'aria-disabled': p,
          className: [da.switch, l ? da.on : da.off, da[`size_${h}`], da[`accent_${d}`]]
            .filter(Boolean)
            .join(' '),
          onClick: g,
          disabled: p,
          children: r.jsx('span', { className: da.knob }),
        }),
        (u || f) &&
          r.jsxs('span', {
            className: da.labelGroup,
            children: [
              u && r.jsx('span', { className: da.label, children: u }),
              f && r.jsx('span', { className: da.description, children: f }),
            ],
          }),
      ],
    });
  };
function GA({ overrideVibration: l, onVibrationChange: c }) {
  const s = V((h) => h.vibrationEnabled),
    u = V((h) => h.setVibrationEnabled),
    f = l ?? s,
    d = (h) => {
      c ? c(h) : u(h);
    };
  return r.jsxs('div', {
    className: Ar.root,
    children: [
      r.jsx('div', {
        className: Ar.header,
        children: r.jsx(Q, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      r.jsx('div', {
        className: Ar.section,
        children: r.jsx(g1, {
          checked: f,
          onChange: d,
          label: 'バイブレーション',
          description: '操作時に端末を振動させます',
        }),
      }),
    ],
  });
}
const ZA = '_root_nuc5y_2',
  YA = '_muteRow_nuc5y_9',
  XA = '_muteLabelGroup_nuc5y_16',
  QA = '_sliderRow_nuc5y_24',
  KA = '_muted_nuc5y_29',
  WA = '_sliderIcon_nuc5y_29',
  JA = '_sliderArea_nuc5y_41',
  FA = '_sliderValue_nuc5y_46',
  wn = {
    root: ZA,
    muteRow: YA,
    muteLabelGroup: XA,
    sliderRow: QA,
    muted: KA,
    sliderIcon: WA,
    sliderArea: JA,
    sliderValue: FA,
  };
function $h({ label: l, iconName: c, value: s, muted: u, onChange: f }) {
  return r.jsx(dl, {
    variant: 'sunken',
    padding: 'md',
    children: r.jsxs('div', {
      className: [wn.sliderRow, u ? wn.muted : ''].filter(Boolean).join(' '),
      children: [
        r.jsx('span', { className: wn.sliderIcon, children: r.jsx(Ut, { name: c, size: 16 }) }),
        r.jsx(Q, { variant: 'label', color: u ? 'dim' : 'mid', children: l }),
        r.jsx('div', {
          className: wn.sliderArea,
          children: r.jsx(wr, { value: s, min: 0, max: 1, step: 0.01, onChange: f, disabled: u }),
        }),
        r.jsx('span', {
          className: wn.sliderValue,
          children: r.jsx(zn, {
            value: Math.round(s * 100),
            size: 'sm',
            accentColor: u ? 'dim' : 'text',
          }),
        }),
      ],
    }),
  });
}
function IA({
  overrideBgmVolume: l,
  overrideSeVolume: c,
  overrideMute: s,
  onBgmChange: u,
  onSeChange: f,
  onMuteChange: d,
}) {
  const h = V((B) => B.bgmVolume),
    p = V((B) => B.seVolume),
    g = V((B) => B.setBgmVolume),
    y = V((B) => B.setSeVolume),
    _ = l ?? h,
    S = c ?? p,
    T = s ?? !1,
    z = (B) => {
      u ? u(B) : (g(B), Dt.setBgmVolume(T ? 0 : B));
    },
    E = (B) => {
      f ? f(B) : (y(B), Dt.setSeVolume(T ? 0 : B));
    },
    q = (B) => {
      d ? d(B) : (Dt.setBgmVolume(B ? 0 : _), Dt.setSeVolume(B ? 0 : S));
    };
  return r.jsxs('div', {
    className: wn.root,
    role: 'tabpanel',
    'aria-label': 'サウンド設定',
    children: [
      r.jsx(dl, {
        variant: 'sunken',
        padding: 'md',
        children: r.jsxs('div', {
          className: wn.muteRow,
          children: [
            r.jsxs('span', {
              className: wn.muteLabelGroup,
              children: [
                r.jsx(Q, { variant: 'label', color: 'mid', children: 'ミュート' }),
                r.jsx(Q, { variant: 'caption', color: 'dim', children: '全サウンドを一時停止' }),
              ],
            }),
            r.jsx(g1, { checked: T, onChange: q, accent: 'primary' }),
          ],
        }),
      }),
      r.jsx($h, { label: 'BGM', iconName: 'play', value: _, muted: T, onChange: z }),
      r.jsx($h, { label: 'SE', iconName: 'spark', value: S, muted: T, onChange: E }),
    ],
  });
}
const Br = (l, c) => c.some((s) => l instanceof s);
let Hh, Uh;
function PA() {
  return Hh || (Hh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function tT() {
  return (
    Uh ||
    (Uh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Dr = new WeakMap(),
  Tr = new WeakMap(),
  Is = new WeakMap();
function eT(l) {
  const c = new Promise((s, u) => {
    const f = () => {
        (l.removeEventListener('success', d), l.removeEventListener('error', h));
      },
      d = () => {
        (s(ul(l.result)), f());
      },
      h = () => {
        (u(l.error), f());
      };
    (l.addEventListener('success', d), l.addEventListener('error', h));
  });
  return (Is.set(c, l), c);
}
function aT(l) {
  if (Dr.has(l)) return;
  const c = new Promise((s, u) => {
    const f = () => {
        (l.removeEventListener('complete', d),
          l.removeEventListener('error', h),
          l.removeEventListener('abort', h));
      },
      d = () => {
        (s(), f());
      },
      h = () => {
        (u(l.error || new DOMException('AbortError', 'AbortError')), f());
      };
    (l.addEventListener('complete', d),
      l.addEventListener('error', h),
      l.addEventListener('abort', h));
  });
  Dr.set(l, c);
}
let Lr = {
  get(l, c, s) {
    if (l instanceof IDBTransaction) {
      if (c === 'done') return Dr.get(l);
      if (c === 'store')
        return s.objectStoreNames[1] ? void 0 : s.objectStore(s.objectStoreNames[0]);
    }
    return ul(l[c]);
  },
  set(l, c, s) {
    return ((l[c] = s), !0);
  },
  has(l, c) {
    return l instanceof IDBTransaction && (c === 'done' || c === 'store') ? !0 : c in l;
  },
};
function v1(l) {
  Lr = l(Lr);
}
function nT(l) {
  return tT().includes(l)
    ? function (...c) {
        return (l.apply($r(this), c), ul(this.request));
      }
    : function (...c) {
        return ul(l.apply($r(this), c));
      };
}
function lT(l) {
  return typeof l == 'function'
    ? nT(l)
    : (l instanceof IDBTransaction && aT(l), Br(l, PA()) ? new Proxy(l, Lr) : l);
}
function ul(l) {
  if (l instanceof IDBRequest) return eT(l);
  if (Tr.has(l)) return Tr.get(l);
  const c = lT(l);
  return (c !== l && (Tr.set(l, c), Is.set(c, l)), c);
}
const $r = (l) => Is.get(l);
function iT(l, c, { blocked: s, upgrade: u, blocking: f, terminated: d } = {}) {
  const h = indexedDB.open(l, c),
    p = ul(h);
  return (
    u &&
      h.addEventListener('upgradeneeded', (g) => {
        u(ul(h.result), g.oldVersion, g.newVersion, ul(h.transaction), g);
      }),
    s && h.addEventListener('blocked', (g) => s(g.oldVersion, g.newVersion, g)),
    p
      .then((g) => {
        (d && g.addEventListener('close', () => d()),
          f && g.addEventListener('versionchange', (y) => f(y.oldVersion, y.newVersion, y)));
      })
      .catch(() => {}),
    p
  );
}
const cT = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  sT = ['put', 'add', 'delete', 'clear'],
  Er = new Map();
function qh(l, c) {
  if (!(l instanceof IDBDatabase && !(c in l) && typeof c == 'string')) return;
  if (Er.get(c)) return Er.get(c);
  const s = c.replace(/FromIndex$/, ''),
    u = c !== s,
    f = sT.includes(s);
  if (!(s in (u ? IDBIndex : IDBObjectStore).prototype) || !(f || cT.includes(s))) return;
  const d = async function (h, ...p) {
    const g = this.transaction(h, f ? 'readwrite' : 'readonly');
    let y = g.store;
    return (u && (y = y.index(p.shift())), (await Promise.all([y[s](...p), f && g.done]))[0]);
  };
  return (Er.set(c, d), d);
}
v1((l) => ({
  ...l,
  get: (c, s, u) => qh(c, s) || l.get(c, s, u),
  has: (c, s) => !!qh(c, s) || l.has(c, s),
}));
const oT = ['continue', 'continuePrimaryKey', 'advance'],
  kh = {},
  Hr = new WeakMap(),
  _1 = new WeakMap(),
  uT = {
    get(l, c) {
      if (!oT.includes(c)) return l[c];
      let s = kh[c];
      return (
        s ||
          (s = kh[c] =
            function (...u) {
              Hr.set(this, _1.get(this)[c](...u));
            }),
        s
      );
    },
  };
async function* rT(...l) {
  let c = this;
  if ((c instanceof IDBCursor || (c = await c.openCursor(...l)), !c)) return;
  c = c;
  const s = new Proxy(c, uT);
  for (_1.set(s, c), Is.set(s, $r(c)); c; )
    (yield s, (c = await (Hr.get(s) || c.continue())), Hr.delete(s));
}
function Vh(l, c) {
  return (
    (c === Symbol.asyncIterator && Br(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (c === 'iterate' && Br(l, [IDBIndex, IDBObjectStore]))
  );
}
v1((l) => ({
  ...l,
  get(c, s, u) {
    return Vh(c, s) ? rT : l.get(c, s, u);
  },
  has(c, s) {
    return Vh(c, s) || l.has(c, s);
  },
}));
const fT = {
  1: (l) => {
    (l.createObjectStore(J.profile, { keyPath: 'id' }),
      l.createObjectStore(J.currencies, { keyPath: 'id' }),
      l.createObjectStore(J.machine, { keyPath: 'key' }),
      l.createObjectStore(J.weapons, { keyPath: 'id' }),
      l
        .createObjectStore(J.patches, { keyPath: ['name', 'tier'] })
        .createIndex('byName', 'name', { unique: !1 }),
      l.createObjectStore(J.equippedPatches, { keyPath: 'slotIndex' }),
      l.createObjectStore(J.settings, { keyPath: 'id' }));
  },
};
function dT(l, c, s, u) {
  for (let f = s + 1; f <= u; f++) {
    const d = fT[f];
    if (!d) throw new Error(`No migration registered for version ${f}`);
    d(l, c);
  }
}
let gc = null;
async function Ur() {
  return (
    gc ||
    ((gc = await iT(Fh, Xs, {
      upgrade(l, c, s, u) {
        try {
          dT(l, u, c, s ?? Xs);
        } catch (f) {
          throw (console.error('[DB] Migration failed:', f), f);
        }
      },
    })),
    await mT(gc),
    gc)
  );
}
async function mT(l) {
  const c = l.transaction([J.profile, J.currencies, J.machine, J.weapons, J.settings], 'readwrite'),
    [s, u, f, d] = await Promise.all([
      c.objectStore(J.profile).get('singleton'),
      c.objectStore(J.currencies).get('singleton'),
      c.objectStore(J.weapons).get('singleton'),
      c.objectStore(J.settings).get('singleton'),
    ]),
    h = Date.now(),
    p = [];
  (s || p.push(c.objectStore(J.profile).put({ ...Ih, createdAt: h, lastPlayedAt: h })),
    u || p.push(c.objectStore(J.currencies).put(Ph)),
    f || p.push(c.objectStore(J.weapons).put(t1)),
    d || p.push(c.objectStore(J.settings).put(e1)));
  const g = c.objectStore(J.machine),
    y = await g.getAllKeys(),
    _ = new Set(y);
  for (const S of Ks) _.has(S) || p.push(g.put({ key: S, lv: 0 }));
  (await Promise.all(p), await c.done);
}
async function hT(l, c) {
  await l.put(J.profile, c);
}
async function pT(l, c) {
  await l.put(J.currencies, c);
}
async function yT(l, c) {
  await l.put(J.machine, c);
}
async function gT(l, c) {
  await l.put(J.weapons, c);
}
async function vT(l, c) {
  await l.put(J.patches, c);
}
async function _T(l) {
  return l.getAll(J.equippedPatches);
}
async function bT(l, c) {
  const u = (await _T(l)).find((f) => f.name === c.name && f.slotIndex !== c.slotIndex);
  if (u) throw new Error(`Patch "${c.name}" is already equipped in slot ${u.slotIndex}`);
  await l.put(J.equippedPatches, c);
}
async function ST(l, c) {
  await l.put(J.settings, c);
}
async function b1(l) {
  const c = l.transaction(
      [J.profile, J.currencies, J.machine, J.weapons, J.patches, J.equippedPatches, J.settings],
      'readonly'
    ),
    [s, u, f, d, h, p, g] = await Promise.all([
      c.objectStore(J.profile).get('singleton'),
      c.objectStore(J.currencies).get('singleton'),
      c.objectStore(J.machine).getAll(),
      c.objectStore(J.weapons).get('singleton'),
      c.objectStore(J.patches).getAll(),
      c.objectStore(J.equippedPatches).getAll(),
      c.objectStore(J.settings).get('singleton'),
    ]);
  if ((await c.done, !s || !u || !d || !g))
    throw new Error(
      '[DB] loadSaveState: Required singleton record is missing. Run openDatabase() first.'
    );
  return {
    profile: s,
    currencies: u,
    machine: f,
    weapons: d,
    patches: h,
    equippedPatches: p,
    settings: g,
  };
}
const S1 = 'tower-like-game:import-backups',
  xT = 3;
function jT() {
  try {
    const l = localStorage.getItem(S1);
    return l ? JSON.parse(l) : [];
  } catch {
    return [];
  }
}
function AT(l) {
  try {
    localStorage.setItem(S1, JSON.stringify(l));
  } catch (c) {
    console.warn('[DB] Failed to save backup to localStorage:', c);
  }
}
function TT(l) {
  const c = jT();
  c.unshift({ savedAt: Date.now(), data: l });
  const s = c.slice(0, xT);
  AT(s);
}
async function x1(l) {
  const c = await b1(l);
  return { formatVersion: 1, dbVersion: Xs, exportedAt: Date.now(), data: c };
}
async function ET(l, c) {
  if (c.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${c.formatVersion}`);
  try {
    const d = await x1(l);
    TT(d);
  } catch (d) {
    console.warn('[DB] Pre-import backup failed (proceeding anyway):', d);
  }
  const { data: s } = c,
    u = l.transaction(
      [J.profile, J.currencies, J.machine, J.weapons, J.patches, J.equippedPatches, J.settings],
      'readwrite'
    );
  await Promise.all([
    u.objectStore(J.profile).clear(),
    u.objectStore(J.currencies).clear(),
    u.objectStore(J.machine).clear(),
    u.objectStore(J.weapons).clear(),
    u.objectStore(J.patches).clear(),
    u.objectStore(J.equippedPatches).clear(),
    u.objectStore(J.settings).clear(),
  ]);
  const f = [
    u.objectStore(J.profile).put(s.profile),
    u.objectStore(J.currencies).put(s.currencies),
    u.objectStore(J.weapons).put(s.weapons),
    u.objectStore(J.settings).put(s.settings),
    ...s.machine.map((d) => u.objectStore(J.machine).put(d)),
    ...s.patches.map((d) => u.objectStore(J.patches).put(d)),
    ...s.equippedPatches.map((d) => u.objectStore(J.equippedPatches).put(d)),
  ];
  (await Promise.all(f), await u.done);
}
const MT = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function NT() {
  const { navigate: l } = Cn(),
    [c, s] = G.useState('sound'),
    u = async () => {
      const h = await Ur(),
        p = await x1(h),
        g = JSON.stringify(p, null, 2),
        y = new Blob([g], { type: 'application/json' }),
        _ = URL.createObjectURL(y),
        S = document.createElement('a');
      ((S.href = _),
        (S.download = `neon-spire-save-${new Date().toISOString().slice(0, 10)}.json`),
        S.click(),
        URL.revokeObjectURL(_));
    },
    f = async (h) => {
      const p = await h.text(),
        g = JSON.parse(p),
        y = await Ur();
      (await ET(y, g), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(Fh), window.location.reload());
    };
  return r.jsx(fl, {
    header: r.jsx(Ac, {
      title: '設定',
      onBack: () => l('title'),
      currencies: [],
      tabBar: r.jsx(Qs, { tabs: MT, value: c, onChange: s, fullWidth: !0 }),
    }),
    footer: r.jsx(jc, { active: 'settings', onChange: l }),
    children: r.jsxs('div', {
      className: rA.content,
      children: [
        c === 'sound' && r.jsx(IA, {}),
        c === 'game' && r.jsx(GA, {}),
        c === 'data' && r.jsx(TA, { onExport: u, onImport: f, onReset: d }),
      ],
    }),
  });
}
const wT = '_layout_198wk_1',
  zT = '_heroWrap_198wk_12',
  Gh = { layout: wT, heroWrap: zT },
  CT = '_root_5udm7_1',
  RT = { root: CT };
function OT({ onResume: l, onNewGame: c, lastSavedAt: s }) {
  const f = V((d) => d.createdAt) > 0;
  return r.jsxs('div', {
    className: RT.root,
    children: [
      r.jsx(Ze, {
        label: f ? '続きから' : '続きから (セーブなし)',
        variant: f ? 'primary' : 'ghost',
        size: 'lg',
        fullWidth: !0,
        disabled: !f,
        iconLeft: r.jsx(Ut, { name: 'play', size: 18 }),
        onClick: l,
      }),
      f &&
        s != null &&
        r.jsx(Q, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
          children: '最終セーブ: ' + s,
        }),
      r.jsx(Ze, {
        label: '新規開始',
        variant: f ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: r.jsx(Ut, { name: 'plus', size: 18 }),
        onClick: c,
      }),
    ],
  });
}
const BT = '_root_qkflo_2',
  DT = '_title_qkflo_12',
  Zh = { root: BT, title: DT };
function LT({ title: l = 'NEON SPIRE', subtitle: c, version: s, tagline: u }) {
  return r.jsxs('header', {
    className: Zh.root,
    role: 'banner',
    children: [
      r.jsx('h1', { className: Zh.title, children: l }),
      c != null &&
        r.jsx(Q, {
          variant: 'label',
          color: 'mid',
          align: 'center',
          style: { fontSize: 11, letterSpacing: '0.24em' },
          children: c,
        }),
      u != null &&
        r.jsx(Q, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { marginTop: 4, fontSize: 11 },
          children: u,
        }),
      s != null &&
        r.jsx(Q, {
          variant: 'numeric-s',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10, marginTop: 6, opacity: 0.7 },
          children: s,
        }),
    ],
  });
}
const $T = '_root_1szye_1',
  HT = '_ringOuter_1szye_9',
  UT = '_ringMiddle_1szye_17',
  qT = '_glowDisc_1szye_24',
  kT = '_cornerAccent_1szye_31',
  VT = '_icon_1szye_40',
  oi = { root: $T, ringOuter: HT, ringMiddle: UT, glowDisc: qT, cornerAccent: kT, icon: VT };
function GT({ size: l = 180, iconName: c = 'tower' }) {
  return r.jsxs('div', {
    className: oi.root,
    style: { width: l, height: l },
    role: 'presentation',
    'aria-hidden': 'true',
    children: [
      r.jsx('div', { className: oi.ringOuter }),
      r.jsx('div', { className: oi.ringMiddle }),
      r.jsx('div', { className: oi.glowDisc }),
      [0, 90, 180, 270].map((s) =>
        r.jsx(
          'div',
          {
            className: oi.cornerAccent,
            style: { transform: `rotate(${s}deg) translate(${l / 2 - 5}px) rotate(45deg)` },
          },
          s
        )
      ),
      r.jsx('span', {
        className: oi.icon,
        children: r.jsx(Ut, { name: c, size: Math.round(l * 0.49) }),
      }),
    ],
  });
}
function ZT(l) {
  if (l < 0) return '今';
  const c = Math.floor(l / 1e3);
  if (c < 60) return '今';
  const s = Math.floor(c / 60);
  if (s < 60) return `${s} 分前`;
  const u = Math.floor(s / 60);
  return u < 24 ? `${u} 時間前` : `${Math.floor(u / 24)} 日前`;
}
function YT() {
  const { navigate: l } = Cn(),
    c = V((u) => u.createdAt),
    s = G.useMemo(() => (c > 0 ? ZT(Date.now() - c) : void 0), [c]);
  return r.jsx(fl, {
    children: r.jsxs('div', {
      className: Gh.layout,
      children: [
        r.jsx(LT, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.1.0',
        }),
        r.jsx('div', { className: Gh.heroWrap, children: r.jsx(GT, {}) }),
        r.jsx(OT, {
          lastSavedAt: s,
          onResume: () => l('preparation'),
          onNewGame: () => l('preparation'),
        }),
      ],
    }),
  });
}
const XT = {
  title: 'title',
  preparation: 'base',
  machine: 'base',
  armory: 'base',
  patches: 'base',
  settings: 'base',
  battle: 'battleNormal',
};
function QT(l, c) {
  (G.useEffect(() => {
    const s = () => {
      Dt.isInitialized() || (Dt.init(), Dt.setBgmVolume(l), Dt.setSeVolume(c));
    };
    return (
      window.addEventListener('pointerdown', s, { once: !0 }),
      window.addEventListener('keydown', s, { once: !0 }),
      () => {
        (window.removeEventListener('pointerdown', s), window.removeEventListener('keydown', s));
      }
    );
  }, []),
    G.useEffect(() => {
      Dt.setBgmVolume(l);
    }, [l]),
    G.useEffect(() => {
      Dt.setSeVolume(c);
    }, [c]));
}
function KT() {
  const { screen: l } = Cn(),
    c = V((u) => u.bgmVolume),
    s = V((u) => u.seVolume);
  switch (
    (QT(c, s),
    G.useEffect(() => {
      Dt.playBgm(XT[l]);
    }, [l]),
    l)
  ) {
    case 'title':
      return r.jsx(YT, {});
    case 'preparation':
      return r.jsx(oA, {});
    case 'machine':
      return r.jsx(j4, {});
    case 'armory':
      return r.jsx(eS, {});
    case 'patches':
      return r.jsx(zj, {});
    case 'settings':
      return r.jsx(NT, {});
    case 'battle':
      return r.jsx(_4, {});
    default:
      return r.jsx(A4, {});
  }
}
async function Rn() {
  return Ur();
}
async function WT() {
  const l = await Rn(),
    c = await b1(l),
    s = V.getState(),
    u = c.profile ?? Ih;
  V.setState({
    highestTier: u.highestTier,
    highestWave: u.highestWave,
    totalPlayTimeSec: u.totalPlayTimeSec,
    totalRuns: u.totalRuns,
    totalEnemiesKilled: u.totalEnemiesKilled,
    createdAt: u.createdAt,
    lastPlayedAt: u.lastPlayedAt,
  });
  const f = c.currencies ?? Ph;
  V.setState({ bolt: K.fromJSON(f.bolt), alloy: K.fromJSON(f.alloy) });
  const d = c.machine,
    h = { ...s.machineLevels };
  for (const z of Ks) {
    const E = d.find((q) => q.key === z);
    h[z] = E ? E.lv : 0;
  }
  V.setState({ machineLevels: h });
  const p = c.weapons ?? t1;
  V.setState({ weaponLv: p.weaponLv, initialWeapon: p.initialWeapon });
  const g = c.patches,
    y = new Map();
  for (const z of g)
    z.count > 0 && y.set(Nr(z.name, z.tier), { name: z.name, tier: z.tier, count: z.count });
  V.setState({ patches: y });
  const _ = c.equippedPatches,
    S = new Map();
  for (const z of _) S.set(z.slotIndex, { name: z.name, tier: z.tier });
  V.setState({ equippedPatches: S });
  const T = c.settings ?? e1;
  V.setState({
    bgmVolume: T.bgmVolume,
    seVolume: T.seVolume,
    vibrationEnabled: T.vibrationEnabled,
  });
}
async function j1() {
  const l = await Rn(),
    { bolt: c, alloy: s } = V.getState();
  await pT(l, { id: 'singleton', bolt: c.toJSON(), alloy: s.toJSON() });
}
async function A1() {
  const l = await Rn(),
    { machineLevels: c } = V.getState();
  await Promise.all(Ks.map((s) => yT(l, { key: s, lv: c[s] })));
}
async function T1() {
  const l = await Rn(),
    { weaponLv: c, initialWeapon: s } = V.getState();
  await gT(l, { id: 'singleton', weaponLv: c, initialWeapon: s });
}
async function E1() {
  const l = await Rn(),
    { bgmVolume: c, seVolume: s, vibrationEnabled: u } = V.getState();
  await ST(l, { id: 'singleton', bgmVolume: c, seVolume: s, vibrationEnabled: u });
}
async function M1() {
  const l = await Rn(),
    {
      highestTier: c,
      highestWave: s,
      totalPlayTimeSec: u,
      totalRuns: f,
      totalEnemiesKilled: d,
      createdAt: h,
      lastPlayedAt: p,
    } = V.getState();
  await hT(l, {
    id: 'singleton',
    highestTier: c,
    highestWave: s,
    totalPlayTimeSec: u,
    totalRuns: f,
    totalEnemiesKilled: d,
    createdAt: h,
    lastPlayedAt: p,
    schemaVersion: 1,
  });
}
async function N1() {
  const l = await Rn(),
    { patches: c } = V.getState(),
    s = [];
  for (const u of c.values())
    u.count > 0 && s.push(vT(l, { name: u.name, tier: u.tier, count: u.count }));
  await Promise.all(s);
}
async function w1() {
  const l = await Rn(),
    { equippedPatches: c } = V.getState(),
    s = [];
  for (const [u, f] of c) s.push(bT(l, { slotIndex: u, name: f.name, tier: f.tier }));
  await Promise.all(s);
}
async function z1() {
  await Promise.all([M1(), j1(), A1(), T1(), N1(), w1(), E1()]);
}
function JT() {
  const l = () => {
    document.visibilityState === 'hidden' && z1();
  };
  return (
    document.addEventListener('visibilitychange', l),
    () => document.removeEventListener('visibilitychange', l)
  );
}
const FT = 500;
function il(l, c) {
  let s = null;
  return () => {
    (s != null && clearTimeout(s),
      (s = setTimeout(() => {
        c().catch((u) => {
          console.error(`[autosave:${l}] failed`, u);
        });
      }, FT)));
  };
}
function IT() {
  (JT(),
    window.addEventListener('beforeunload', () => {
      z1();
    }));
  const l = il('currencies', j1),
    c = il('machine', A1),
    s = il('weapons', T1),
    u = il('settings', E1),
    f = il('profile', M1),
    d = il('patches', N1),
    h = il('equippedPatches', w1);
  V.subscribe((p, g) => {
    ((p.bolt !== g.bolt || p.alloy !== g.alloy) && l(),
      p.machineLevels !== g.machineLevels && c(),
      (p.weaponLv !== g.weaponLv || p.initialWeapon !== g.initialWeapon) && s(),
      (p.bgmVolume !== g.bgmVolume ||
        p.seVolume !== g.seVolume ||
        p.vibrationEnabled !== g.vibrationEnabled) &&
        u(),
      (p.highestTier !== g.highestTier ||
        p.highestWave !== g.highestWave ||
        p.totalPlayTimeSec !== g.totalPlayTimeSec ||
        p.totalRuns !== g.totalRuns ||
        p.totalEnemiesKilled !== g.totalEnemiesKilled ||
        p.lastPlayedAt !== g.lastPlayedAt) &&
        f(),
      p.patches !== g.patches && d(),
      p.equippedPatches !== g.equippedPatches && h());
  });
}
const C1 = document.getElementById('root');
if (!C1) throw new Error('Failed to find #root element');
const PT = eg.createRoot(C1);
WT()
  .catch((l) => {
    console.error('[hydrateStore] failed', l);
  })
  .finally(() => {
    (IT(), PT.render(r.jsx(P2, { children: r.jsx(KT, {}) })));
  });
