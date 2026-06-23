var tg = Object.defineProperty;
var eg = (l, i, s) =>
  i in l ? tg(l, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (l[i] = s);
var ba = (l, i, s) => eg(l, typeof i != 'symbol' ? i + '' : i, s);
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
function ag(l) {
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
 */ var nh;
function ng() {
  if (nh) return _c;
  nh = 1;
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
var lh;
function lg() {
  return (lh || ((lh = 1), (Mu.exports = ng())), Mu.exports);
}
var u = lg(),
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
 */ var ih;
function ig() {
  return (
    ih ||
      ((ih = 1),
      (function (l) {
        function i(O, K) {
          var lt = O.length;
          O.push(K);
          t: for (; 0 < lt; ) {
            var At = (lt - 1) >>> 1,
              wt = O[At];
            if (0 < f(wt, K)) ((O[At] = K), (O[lt] = wt), (lt = At));
            else break t;
          }
        }
        function s(O) {
          return O.length === 0 ? null : O[0];
        }
        function o(O) {
          if (O.length === 0) return null;
          var K = O[0],
            lt = O.pop();
          if (lt !== K) {
            O[0] = lt;
            t: for (var At = 0, wt = O.length, x = wt >>> 1; At < x; ) {
              var H = 2 * (At + 1) - 1,
                Q = O[H],
                J = H + 1,
                st = O[J];
              if (0 > f(Q, lt))
                J < wt && 0 > f(st, Q)
                  ? ((O[At] = st), (O[J] = lt), (At = J))
                  : ((O[At] = Q), (O[H] = lt), (At = H));
              else if (J < wt && 0 > f(st, lt)) ((O[At] = st), (O[J] = lt), (At = J));
              else break t;
            }
          }
          return K;
        }
        function f(O, K) {
          var lt = O.sortIndex - K.sortIndex;
          return lt !== 0 ? lt : O.id - K.id;
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
          G = typeof setTimeout == 'function' ? setTimeout : null,
          Y = typeof clearTimeout == 'function' ? clearTimeout : null,
          ct = typeof setImmediate < 'u' ? setImmediate : null;
        function U(O) {
          for (var K = s(y); K !== null; ) {
            if (K.callback === null) o(y);
            else if (K.startTime <= O) (o(y), (K.sortIndex = K.expirationTime), i(g, K));
            else break;
            K = s(y);
          }
        }
        function pt(O) {
          if (((D = !1), U(O), !T))
            if (s(g) !== null) ((T = !0), Mt || ((Mt = !0), ae()));
            else {
              var K = s(y);
              K !== null && oe(pt, K.startTime - O);
            }
        }
        var Mt = !1,
          at = -1,
          Ot = 5,
          ie = -1;
        function Pt() {
          return R ? !0 : !(l.unstable_now() - ie < Ot);
        }
        function Ht() {
          if (((R = !1), Mt)) {
            var O = l.unstable_now();
            ie = O;
            var K = !0;
            try {
              t: {
                ((T = !1), D && ((D = !1), Y(at), (at = -1)), (E = !0));
                var lt = A;
                try {
                  e: {
                    for (U(O), b = s(g); b !== null && !(b.expirationTime > O && Pt()); ) {
                      var At = b.callback;
                      if (typeof At == 'function') {
                        ((b.callback = null), (A = b.priorityLevel));
                        var wt = At(b.expirationTime <= O);
                        if (((O = l.unstable_now()), typeof wt == 'function')) {
                          ((b.callback = wt), U(O), (K = !0));
                          break e;
                        }
                        (b === s(g) && o(g), U(O));
                      } else o(g);
                      b = s(g);
                    }
                    if (b !== null) K = !0;
                    else {
                      var x = s(y);
                      (x !== null && oe(pt, x.startTime - O), (K = !1));
                    }
                  }
                  break t;
                } finally {
                  ((b = null), (A = lt), (E = !1));
                }
                K = void 0;
              }
            } finally {
              K ? ae() : (Mt = !1);
            }
          }
        }
        var ae;
        if (typeof ct == 'function')
          ae = function () {
            ct(Ht);
          };
        else if (typeof MessageChannel < 'u') {
          var Be = new MessageChannel(),
            ke = Be.port2;
          ((Be.port1.onmessage = Ht),
            (ae = function () {
              ke.postMessage(null);
            }));
        } else
          ae = function () {
            G(Ht, 0);
          };
        function oe(O, K) {
          at = G(function () {
            O(l.unstable_now());
          }, K);
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
              : (Ot = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return A;
          }),
          (l.unstable_next = function (O) {
            switch (A) {
              case 1:
              case 2:
              case 3:
                var K = 3;
                break;
              default:
                K = A;
            }
            var lt = A;
            A = K;
            try {
              return O();
            } finally {
              A = lt;
            }
          }),
          (l.unstable_requestPaint = function () {
            R = !0;
          }),
          (l.unstable_runWithPriority = function (O, K) {
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
            var lt = A;
            A = O;
            try {
              return K();
            } finally {
              A = lt;
            }
          }),
          (l.unstable_scheduleCallback = function (O, K, lt) {
            var At = l.unstable_now();
            switch (
              (typeof lt == 'object' && lt !== null
                ? ((lt = lt.delay), (lt = typeof lt == 'number' && 0 < lt ? At + lt : At))
                : (lt = At),
              O)
            ) {
              case 1:
                var wt = -1;
                break;
              case 2:
                wt = 250;
                break;
              case 5:
                wt = 1073741823;
                break;
              case 4:
                wt = 1e4;
                break;
              default:
                wt = 5e3;
            }
            return (
              (wt = lt + wt),
              (O = {
                id: _++,
                callback: K,
                priorityLevel: O,
                startTime: lt,
                expirationTime: wt,
                sortIndex: -1,
              }),
              lt > At
                ? ((O.sortIndex = lt),
                  i(y, O),
                  s(g) === null &&
                    O === s(y) &&
                    (D ? (Y(at), (at = -1)) : (D = !0), oe(pt, lt - At)))
                : ((O.sortIndex = wt), i(g, O), T || E || ((T = !0), Mt || ((Mt = !0), ae()))),
              O
            );
          }),
          (l.unstable_shouldYield = Pt),
          (l.unstable_wrapCallback = function (O) {
            var K = A;
            return function () {
              var lt = A;
              A = K;
              try {
                return O.apply(this, arguments);
              } finally {
                A = lt;
              }
            };
          }));
      })(Nu)),
    Nu
  );
}
var ch;
function cg() {
  return (ch || ((ch = 1), (wu.exports = ig())), wu.exports);
}
var zu = { exports: {} },
  ot = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sh;
function sg() {
  if (sh) return ot;
  sh = 1;
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
  function G(x, H, Q) {
    ((this.props = x), (this.context = H), (this.refs = R), (this.updater = Q || T));
  }
  ((G.prototype.isReactComponent = {}),
    (G.prototype.setState = function (x, H) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, H, 'setState');
    }),
    (G.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function Y() {}
  Y.prototype = G.prototype;
  function ct(x, H, Q) {
    ((this.props = x), (this.context = H), (this.refs = R), (this.updater = Q || T));
  }
  var U = (ct.prototype = new Y());
  ((U.constructor = ct), D(U, G.prototype), (U.isPureReactComponent = !0));
  var pt = Array.isArray;
  function Mt() {}
  var at = { H: null, A: null, T: null, S: null },
    Ot = Object.prototype.hasOwnProperty;
  function ie(x, H, Q) {
    var J = Q.ref;
    return { $$typeof: l, type: x, key: H, ref: J !== void 0 ? J : null, props: Q };
  }
  function Pt(x, H) {
    return ie(x.type, H, x.props);
  }
  function Ht(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === l;
  }
  function ae(x) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function (Q) {
        return H[Q];
      })
    );
  }
  var Be = /\/+/g;
  function ke(x, H) {
    return typeof x == 'object' && x !== null && x.key != null ? ae('' + x.key) : H.toString(36);
  }
  function oe(x) {
    switch (x.status) {
      case 'fulfilled':
        return x.value;
      case 'rejected':
        throw x.reason;
      default:
        switch (
          (typeof x.status == 'string'
            ? x.then(Mt, Mt)
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
  function O(x, H, Q, J, st) {
    var ft = typeof x;
    (ft === 'undefined' || ft === 'boolean') && (x = null);
    var Tt = !1;
    if (x === null) Tt = !0;
    else
      switch (ft) {
        case 'bigint':
        case 'string':
        case 'number':
          Tt = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case l:
            case i:
              Tt = !0;
              break;
            case _:
              return ((Tt = x._init), O(Tt(x._payload), H, Q, J, st));
          }
      }
    if (Tt)
      return (
        (st = st(x)),
        (Tt = J === '' ? '.' + ke(x, 0) : J),
        pt(st)
          ? ((Q = ''),
            Tt != null && (Q = Tt.replace(Be, '$&/') + '/'),
            O(st, H, Q, '', function (Da) {
              return Da;
            }))
          : st != null &&
            (Ht(st) &&
              (st = Pt(
                st,
                Q +
                  (st.key == null || (x && x.key === st.key)
                    ? ''
                    : ('' + st.key).replace(Be, '$&/') + '/') +
                  Tt
              )),
            H.push(st)),
        1
      );
    Tt = 0;
    var pe = J === '' ? '.' : J + ':';
    if (pt(x))
      for (var Xt = 0; Xt < x.length; Xt++)
        ((J = x[Xt]), (ft = pe + ke(J, Xt)), (Tt += O(J, H, Q, ft, st)));
    else if (((Xt = E(x)), typeof Xt == 'function'))
      for (x = Xt.call(x), Xt = 0; !(J = x.next()).done; )
        ((J = J.value), (ft = pe + ke(J, Xt++)), (Tt += O(J, H, Q, ft, st)));
    else if (ft === 'object') {
      if (typeof x.then == 'function') return O(oe(x), H, Q, J, st);
      throw (
        (H = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Tt;
  }
  function K(x, H, Q) {
    if (x == null) return x;
    var J = [],
      st = 0;
    return (
      O(x, J, '', '', function (ft) {
        return H.call(Q, ft, st++);
      }),
      J
    );
  }
  function lt(x) {
    if (x._status === -1) {
      var H = x._result;
      ((H = H()),
        H.then(
          function (Q) {
            (x._status === 0 || x._status === -1) && ((x._status = 1), (x._result = Q));
          },
          function (Q) {
            (x._status === 0 || x._status === -1) && ((x._status = 2), (x._result = Q));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = H)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var At =
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
    wt = {
      map: K,
      forEach: function (x, H, Q) {
        K(
          x,
          function () {
            H.apply(this, arguments);
          },
          Q
        );
      },
      count: function (x) {
        var H = 0;
        return (
          K(x, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (x) {
        return (
          K(x, function (H) {
            return H;
          }) || []
        );
      },
      only: function (x) {
        if (!Ht(x))
          throw Error('React.Children.only expected to receive a single React element child.');
        return x;
      },
    };
  return (
    (ot.Activity = b),
    (ot.Children = wt),
    (ot.Component = G),
    (ot.Fragment = s),
    (ot.Profiler = f),
    (ot.PureComponent = ct),
    (ot.StrictMode = o),
    (ot.Suspense = g),
    (ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = at),
    (ot.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return at.H.useMemoCache(x);
      },
    }),
    (ot.cache = function (x) {
      return function () {
        return x.apply(null, arguments);
      };
    }),
    (ot.cacheSignal = function () {
      return null;
    }),
    (ot.cloneElement = function (x, H, Q) {
      if (x == null) throw Error('The argument must be a React element, but you passed ' + x + '.');
      var J = D({}, x.props),
        st = x.key;
      if (H != null)
        for (ft in (H.key !== void 0 && (st = '' + H.key), H))
          !Ot.call(H, ft) ||
            ft === 'key' ||
            ft === '__self' ||
            ft === '__source' ||
            (ft === 'ref' && H.ref === void 0) ||
            (J[ft] = H[ft]);
      var ft = arguments.length - 2;
      if (ft === 1) J.children = Q;
      else if (1 < ft) {
        for (var Tt = Array(ft), pe = 0; pe < ft; pe++) Tt[pe] = arguments[pe + 2];
        J.children = Tt;
      }
      return ie(x.type, st, J);
    }),
    (ot.createContext = function (x) {
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
    (ot.createElement = function (x, H, Q) {
      var J,
        st = {},
        ft = null;
      if (H != null)
        for (J in (H.key !== void 0 && (ft = '' + H.key), H))
          Ot.call(H, J) && J !== 'key' && J !== '__self' && J !== '__source' && (st[J] = H[J]);
      var Tt = arguments.length - 2;
      if (Tt === 1) st.children = Q;
      else if (1 < Tt) {
        for (var pe = Array(Tt), Xt = 0; Xt < Tt; Xt++) pe[Xt] = arguments[Xt + 2];
        st.children = pe;
      }
      if (x && x.defaultProps)
        for (J in ((Tt = x.defaultProps), Tt)) st[J] === void 0 && (st[J] = Tt[J]);
      return ie(x, ft, st);
    }),
    (ot.createRef = function () {
      return { current: null };
    }),
    (ot.forwardRef = function (x) {
      return { $$typeof: p, render: x };
    }),
    (ot.isValidElement = Ht),
    (ot.lazy = function (x) {
      return { $$typeof: _, _payload: { _status: -1, _result: x }, _init: lt };
    }),
    (ot.memo = function (x, H) {
      return { $$typeof: y, type: x, compare: H === void 0 ? null : H };
    }),
    (ot.startTransition = function (x) {
      var H = at.T,
        Q = {};
      at.T = Q;
      try {
        var J = x(),
          st = at.S;
        (st !== null && st(Q, J),
          typeof J == 'object' && J !== null && typeof J.then == 'function' && J.then(Mt, At));
      } catch (ft) {
        At(ft);
      } finally {
        (H !== null && Q.types !== null && (H.types = Q.types), (at.T = H));
      }
    }),
    (ot.unstable_useCacheRefresh = function () {
      return at.H.useCacheRefresh();
    }),
    (ot.use = function (x) {
      return at.H.use(x);
    }),
    (ot.useActionState = function (x, H, Q) {
      return at.H.useActionState(x, H, Q);
    }),
    (ot.useCallback = function (x, H) {
      return at.H.useCallback(x, H);
    }),
    (ot.useContext = function (x) {
      return at.H.useContext(x);
    }),
    (ot.useDebugValue = function () {}),
    (ot.useDeferredValue = function (x, H) {
      return at.H.useDeferredValue(x, H);
    }),
    (ot.useEffect = function (x, H) {
      return at.H.useEffect(x, H);
    }),
    (ot.useEffectEvent = function (x) {
      return at.H.useEffectEvent(x);
    }),
    (ot.useId = function () {
      return at.H.useId();
    }),
    (ot.useImperativeHandle = function (x, H, Q) {
      return at.H.useImperativeHandle(x, H, Q);
    }),
    (ot.useInsertionEffect = function (x, H) {
      return at.H.useInsertionEffect(x, H);
    }),
    (ot.useLayoutEffect = function (x, H) {
      return at.H.useLayoutEffect(x, H);
    }),
    (ot.useMemo = function (x, H) {
      return at.H.useMemo(x, H);
    }),
    (ot.useOptimistic = function (x, H) {
      return at.H.useOptimistic(x, H);
    }),
    (ot.useReducer = function (x, H, Q) {
      return at.H.useReducer(x, H, Q);
    }),
    (ot.useRef = function (x) {
      return at.H.useRef(x);
    }),
    (ot.useState = function (x) {
      return at.H.useState(x);
    }),
    (ot.useSyncExternalStore = function (x, H, Q) {
      return at.H.useSyncExternalStore(x, H, Q);
    }),
    (ot.useTransition = function () {
      return at.H.useTransition();
    }),
    (ot.version = '19.2.5'),
    ot
  );
}
var oh;
function af() {
  return (oh || ((oh = 1), (zu.exports = sg())), zu.exports);
}
var Cu = { exports: {} },
  Re = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var rh;
function og() {
  if (rh) return Re;
  rh = 1;
  var l = af();
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
    (Re.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (Re.createPortal = function (g, y) {
      var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(i(299));
      return d(g, y, null, _);
    }),
    (Re.flushSync = function (g) {
      var y = m.T,
        _ = o.p;
      try {
        if (((m.T = null), (o.p = 2), g)) return g();
      } finally {
        ((m.T = y), (o.p = _), o.d.f());
      }
    }),
    (Re.preconnect = function (g, y) {
      typeof g == 'string' &&
        (y
          ? ((y = y.crossOrigin),
            (y = typeof y == 'string' ? (y === 'use-credentials' ? y : '') : void 0))
          : (y = null),
        o.d.C(g, y));
    }),
    (Re.prefetchDNS = function (g) {
      typeof g == 'string' && o.d.D(g);
    }),
    (Re.preinit = function (g, y) {
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
    (Re.preinitModule = function (g, y) {
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
    (Re.preload = function (g, y) {
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
    (Re.preloadModule = function (g, y) {
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
    (Re.requestFormReset = function (g) {
      o.d.r(g);
    }),
    (Re.unstable_batchedUpdates = function (g, y) {
      return g(y);
    }),
    (Re.useFormState = function (g, y, _) {
      return m.H.useFormState(g, y, _);
    }),
    (Re.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (Re.version = '19.2.5'),
    Re
  );
}
var uh;
function rg() {
  if (uh) return Cu.exports;
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
  return (l(), (Cu.exports = og()), Cu.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var fh;
function ug() {
  if (fh) return bc;
  fh = 1;
  var l = cg(),
    i = af(),
    s = rg();
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
  function m(t) {
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
    if (d(t) !== t) throw Error(o(188));
  }
  function y(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = d(t)), e === null)) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var a = t, n = e; ; ) {
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
          if (r === a) return (g(c), t);
          if (r === n) return (g(c), e);
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
  var b = Object.assign,
    A = Symbol.for('react.element'),
    E = Symbol.for('react.transitional.element'),
    T = Symbol.for('react.portal'),
    D = Symbol.for('react.fragment'),
    R = Symbol.for('react.strict_mode'),
    G = Symbol.for('react.profiler'),
    Y = Symbol.for('react.consumer'),
    ct = Symbol.for('react.context'),
    U = Symbol.for('react.forward_ref'),
    pt = Symbol.for('react.suspense'),
    Mt = Symbol.for('react.suspense_list'),
    at = Symbol.for('react.memo'),
    Ot = Symbol.for('react.lazy'),
    ie = Symbol.for('react.activity'),
    Pt = Symbol.for('react.memo_cache_sentinel'),
    Ht = Symbol.iterator;
  function ae(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (Ht && t[Ht]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var Be = Symbol.for('react.client.reference');
  function ke(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === Be ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case D:
        return 'Fragment';
      case G:
        return 'Profiler';
      case R:
        return 'StrictMode';
      case pt:
        return 'Suspense';
      case Mt:
        return 'SuspenseList';
      case ie:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case T:
          return 'Portal';
        case ct:
          return t.displayName || 'Context';
        case Y:
          return (t._context.displayName || 'Context') + '.Consumer';
        case U:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case at:
          return ((e = t.displayName || null), e !== null ? e : ke(t.type) || 'Memo');
        case Ot:
          ((e = t._payload), (t = t._init));
          try {
            return ke(t(e));
          } catch {}
      }
    return null;
  }
  var oe = Array.isArray,
    O = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    K = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    lt = { pending: !1, data: null, method: null, action: null },
    At = [],
    wt = -1;
  function x(t) {
    return { current: t };
  }
  function H(t) {
    0 > wt || ((t.current = At[wt]), (At[wt] = null), wt--);
  }
  function Q(t, e) {
    (wt++, (At[wt] = t.current), (t.current = e));
  }
  var J = x(null),
    st = x(null),
    ft = x(null),
    Tt = x(null);
  function pe(t, e) {
    switch ((Q(ft, e), Q(st, t), Q(J, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? M0(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = M0(e)), (t = E0(e, t)));
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
    (H(J), Q(J, t));
  }
  function Xt() {
    (H(J), H(st), H(ft));
  }
  function Da(t) {
    t.memoizedState !== null && Q(Tt, t);
    var e = J.current,
      a = E0(e, t.type);
    e !== a && (Q(st, t), Q(J, a));
  }
  function Ma(t) {
    (st.current === t && (H(J), H(st)), Tt.current === t && (H(Tt), (pc._currentValue = lt)));
  }
  var dt, ve;
  function Kt(t) {
    if (dt === void 0)
      try {
        throw Error();
      } catch (a) {
        var e = a.stack.trim().match(/\n( *(at )?)/);
        ((dt = (e && e[1]) || ''),
          (ve =
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
      dt +
      t +
      ve
    );
  }
  var et = !1;
  function ya(t, e) {
    if (!t || et) return '';
    et = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
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
                Reflect.construct(t, [], k);
              } else {
                try {
                  k.call();
                } catch (C) {
                  z = C;
                }
                t.call(k.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (C) {
                z = C;
              }
              (k = t()) && typeof k.catch == 'function' && k.catch(function () {});
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
                    t.displayName &&
                      B.includes('<anonymous>') &&
                      (B = B.replace('<anonymous>', t.displayName)),
                    B
                  );
                }
              while (1 <= n && 0 <= c);
            break;
          }
      }
    } finally {
      ((et = !1), (Error.prepareStackTrace = a));
    }
    return (a = t ? t.displayName || t.name : '') ? Kt(a) : '';
  }
  function re(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Kt(t.type);
      case 16:
        return Kt('Lazy');
      case 13:
        return t.child !== e && e !== null ? Kt('Suspense Fallback') : Kt('Suspense');
      case 19:
        return Kt('SuspenseList');
      case 0:
      case 15:
        return ya(t.type, !1);
      case 11:
        return ya(t.type.render, !1);
      case 1:
        return ya(t.type, !0);
      case 31:
        return Kt('Activity');
      default:
        return '';
    }
  }
  function ye(t) {
    try {
      var e = '',
        a = null;
      do ((e += re(t, a)), (a = t), (t = t.return));
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
  var kt = Object.prototype.hasOwnProperty,
    Ae = l.unstable_scheduleCallback,
    Ct = l.unstable_cancelCallback,
    te = l.unstable_shouldYield,
    Ce = l.unstable_requestPaint,
    Bt = l.unstable_now,
    ea = l.unstable_getCurrentPriorityLevel,
    Ba = l.unstable_ImmediatePriority,
    La = l.unstable_UserBlockingPriority,
    fn = l.unstable_NormalPriority,
    Ei = l.unstable_LowPriority,
    Zn = l.unstable_IdlePriority,
    Xn = l.log,
    Kn = l.unstable_setDisableYieldValue,
    Ea = null,
    _e = null;
  function be(t) {
    if ((typeof Xn == 'function' && Kn(t), _e && typeof _e.setStrictMode == 'function'))
      try {
        _e.setStrictMode(Ea, t);
      } catch {}
  }
  var Z = Math.clz32 ? Math.clz32 : Wn,
    wi = Math.log,
    Qn = Math.LN2;
  function Wn(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((wi(t) / Qn) | 0)) | 0);
  }
  var Jn = 256,
    $a = 262144,
    Ha = 4194304;
  function aa(t) {
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
  function ka(t, e, a) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var c = 0,
      r = t.suspendedLanes,
      h = t.pingedLanes;
    t = t.warmLanes;
    var v = n & 134217727;
    return (
      v !== 0
        ? ((n = v & ~r),
          n !== 0
            ? (c = aa(n))
            : ((h &= v), h !== 0 ? (c = aa(h)) : a || ((a = v & ~t), a !== 0 && (c = aa(a)))))
        : ((v = n & ~r),
          v !== 0
            ? (c = aa(v))
            : h !== 0
              ? (c = aa(h))
              : a || ((a = n & ~t), a !== 0 && (c = aa(a)))),
      c === 0
        ? 0
        : e !== 0 &&
            e !== c &&
            (e & r) === 0 &&
            ((r = c & -c), (a = e & -e), r >= a || (r === 32 && (a & 4194048) !== 0))
          ? e
          : c
    );
  }
  function Fn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function In(t, e) {
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
  function Ni() {
    var t = Ha;
    return ((Ha <<= 1), (Ha & 62914560) === 0 && (Ha = 4194304), t);
  }
  function Pn(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function F(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function rt(t, e, a, n, c, r) {
    var h = t.pendingLanes;
    ((t.pendingLanes = a),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= a),
      (t.entangledLanes &= a),
      (t.errorRecoveryDisabledLanes &= a),
      (t.shellSuspendCounter = 0));
    var v = t.entanglements,
      S = t.expirationTimes,
      N = t.hiddenUpdates;
    for (a = h & ~a; 0 < a; ) {
      var B = 31 - Z(a),
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
    (n !== 0 && yt(t, n, 0),
      r !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= r & ~(h & ~e)));
  }
  function yt(t, e, a) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var n = 31 - Z(e);
    ((t.entangledLanes |= e),
      (t.entanglements[n] = t.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function Et(t, e) {
    var a = (t.entangledLanes |= e);
    for (t = t.entanglements; a; ) {
      var n = 31 - Z(a),
        c = 1 << n;
      ((c & e) | (t[n] & e) && (t[n] |= e), (a &= ~c));
    }
  }
  function Qt(t, e) {
    var a = e & -e;
    return ((a = (a & 42) !== 0 ? 1 : Le(a)), (a & (t.suspendedLanes | e)) !== 0 ? 0 : a);
  }
  function Le(t) {
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
  function Dt(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function ht() {
    var t = K.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : J0(t.type));
  }
  function _t(t, e) {
    var a = K.p;
    try {
      return ((K.p = t), e());
    } finally {
      K.p = a;
    }
  }
  var Zt = Math.random().toString(36).slice(2),
    ee = '__reactFiber$' + Zt,
    Te = '__reactProps$' + Zt,
    wa = '__reactContainer$' + Zt,
    go = '__reactEvents$' + Zt,
    G1 = '__reactListeners$' + Zt,
    Y1 = '__reactHandles$' + Zt,
    mf = '__reactResources$' + Zt,
    zi = '__reactMarker$' + Zt;
  function vo(t) {
    (delete t[ee], delete t[Te], delete t[go], delete t[G1], delete t[Y1]);
  }
  function zl(t) {
    var e = t[ee];
    if (e) return e;
    for (var a = t.parentNode; a; ) {
      if ((e = a[wa] || a[ee])) {
        if (((a = e.alternate), e.child !== null || (a !== null && a.child !== null)))
          for (t = D0(t); t !== null; ) {
            if ((a = t[ee])) return a;
            t = D0(t);
          }
        return e;
      }
      ((t = a), (a = t.parentNode));
    }
    return null;
  }
  function Cl(t) {
    if ((t = t[ee] || t[wa])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function Ci(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Rl(t) {
    var e = t[mf];
    return (e || (e = t[mf] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function Se(t) {
    t[zi] = !0;
  }
  var hf = new Set(),
    pf = {};
  function tl(t, e) {
    (Ol(t, e), Ol(t + 'Capture', e));
  }
  function Ol(t, e) {
    for (pf[t] = e, t = 0; t < e.length; t++) hf.add(e[t]);
  }
  var Z1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    yf = {},
    gf = {};
  function X1(t) {
    return kt.call(gf, t)
      ? !0
      : kt.call(yf, t)
        ? !1
        : Z1.test(t)
          ? (gf[t] = !0)
          : ((yf[t] = !0), !1);
  }
  function kc(t, e, a) {
    if (X1(e))
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
  function Uc(t, e, a) {
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
  function Ua(t, e, a, n) {
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
  function na(t) {
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
  function vf(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function K1(t, e, a) {
    var n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var c = n.get,
        r = n.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return c.call(this);
          },
          set: function (h) {
            ((a = '' + h), r.call(this, h));
          },
        }),
        Object.defineProperty(t, e, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (h) {
            a = '' + h;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function _o(t) {
    if (!t._valueTracker) {
      var e = vf(t) ? 'checked' : 'value';
      t._valueTracker = K1(t, e, '' + t[e]);
    }
  }
  function _f(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(),
      n = '';
    return (
      t && (n = vf(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = n),
      t !== a ? (e.setValue(t), !0) : !1
    );
  }
  function qc(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Q1 = /[\n"\\]/g;
  function la(t) {
    return t.replace(Q1, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function bo(t, e, a, n, c, r, h, v) {
    ((t.name = ''),
      h != null && typeof h != 'function' && typeof h != 'symbol' && typeof h != 'boolean'
        ? (t.type = h)
        : t.removeAttribute('type'),
      e != null
        ? h === 'number'
          ? ((e === 0 && t.value === '') || t.value != e) && (t.value = '' + na(e))
          : t.value !== '' + na(e) && (t.value = '' + na(e))
        : (h !== 'submit' && h !== 'reset') || t.removeAttribute('value'),
      e != null
        ? So(t, h, na(e))
        : a != null
          ? So(t, h, na(a))
          : n != null && t.removeAttribute('value'),
      c == null && r != null && (t.defaultChecked = !!r),
      c != null && (t.checked = c && typeof c != 'function' && typeof c != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (t.name = '' + na(v))
        : t.removeAttribute('name'));
  }
  function bf(t, e, a, n, c, r, h, v) {
    if (
      (r != null &&
        typeof r != 'function' &&
        typeof r != 'symbol' &&
        typeof r != 'boolean' &&
        (t.type = r),
      e != null || a != null)
    ) {
      if (!((r !== 'submit' && r !== 'reset') || e != null)) {
        _o(t);
        return;
      }
      ((a = a != null ? '' + na(a) : ''),
        (e = e != null ? '' + na(e) : a),
        v || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((n = n ?? c),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (t.checked = v ? t.checked : !!n),
      (t.defaultChecked = !!n),
      h != null &&
        typeof h != 'function' &&
        typeof h != 'symbol' &&
        typeof h != 'boolean' &&
        (t.name = h),
      _o(t));
  }
  function So(t, e, a) {
    (e === 'number' && qc(t.ownerDocument) === t) ||
      t.defaultValue === '' + a ||
      (t.defaultValue = '' + a);
  }
  function Dl(t, e, a, n) {
    if (((t = t.options), e)) {
      e = {};
      for (var c = 0; c < a.length; c++) e['$' + a[c]] = !0;
      for (a = 0; a < t.length; a++)
        ((c = e.hasOwnProperty('$' + t[a].value)),
          t[a].selected !== c && (t[a].selected = c),
          c && n && (t[a].defaultSelected = !0));
    } else {
      for (a = '' + na(a), e = null, c = 0; c < t.length; c++) {
        if (t[c].value === a) {
          ((t[c].selected = !0), n && (t[c].defaultSelected = !0));
          return;
        }
        e !== null || t[c].disabled || (e = t[c]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Sf(t, e, a) {
    if (e != null && ((e = '' + na(e)), e !== t.value && (t.value = e), a == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? '' + na(a) : '';
  }
  function xf(t, e, a, n) {
    if (e == null) {
      if (n != null) {
        if (a != null) throw Error(o(92));
        if (oe(n)) {
          if (1 < n.length) throw Error(o(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (e = a));
    }
    ((a = na(e)),
      (t.defaultValue = a),
      (n = t.textContent),
      n === a && n !== '' && n !== null && (t.value = n),
      _o(t));
  }
  function Bl(t, e) {
    if (e) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var W1 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function jf(t, e, a) {
    var n = e.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : n
        ? t.setProperty(e, a)
        : typeof a != 'number' || a === 0 || W1.has(e)
          ? e === 'float'
            ? (t.cssFloat = a)
            : (t[e] = ('' + a).trim())
          : (t[e] = a + 'px');
  }
  function Af(t, e, a) {
    if (e != null && typeof e != 'object') throw Error(o(62));
    if (((t = t.style), a != null)) {
      for (var n in a)
        !a.hasOwnProperty(n) ||
          (e != null && e.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? t.setProperty(n, '')
            : n === 'float'
              ? (t.cssFloat = '')
              : (t[n] = ''));
      for (var c in e) ((n = e[c]), e.hasOwnProperty(c) && a[c] !== n && jf(t, c, n));
    } else for (var r in e) e.hasOwnProperty(r) && jf(t, r, e[r]);
  }
  function xo(t) {
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
  var J1 = new Map([
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
  function Vc(t) {
    return F1.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function qa() {}
  var jo = null;
  function Ao(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Ll = null,
    $l = null;
  function Tf(t) {
    var e = Cl(t);
    if (e && (t = e.stateNode)) {
      var a = t[Te] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (bo(
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
              a = a.querySelectorAll('input[name="' + la('' + e) + '"][type="radio"]'), e = 0;
              e < a.length;
              e++
            ) {
              var n = a[e];
              if (n !== t && n.form === t.form) {
                var c = n[Te] || null;
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
            for (e = 0; e < a.length; e++) ((n = a[e]), n.form === t.form && _f(n));
          }
          break t;
        case 'textarea':
          Sf(t, a.value, a.defaultValue);
          break t;
        case 'select':
          ((e = a.value), e != null && Dl(t, !!a.multiple, e, !1));
      }
    }
  }
  var To = !1;
  function Mf(t, e, a) {
    if (To) return t(e, a);
    To = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (
        ((To = !1),
        (Ll !== null || $l !== null) &&
          (Ns(), Ll && ((e = Ll), (t = $l), ($l = Ll = null), Tf(e), t)))
      )
        for (e = 0; e < t.length; e++) Tf(t[e]);
    }
  }
  function Ri(t, e) {
    var a = t.stateNode;
    if (a === null) return null;
    var n = a[Te] || null;
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
    if (a && typeof a != 'function') throw Error(o(231, e, typeof a));
    return a;
  }
  var Va = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Mo = !1;
  if (Va)
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
  var dn = null,
    Eo = null,
    Gc = null;
  function Ef() {
    if (Gc) return Gc;
    var t,
      e = Eo,
      a = e.length,
      n,
      c = 'value' in dn ? dn.value : dn.textContent,
      r = c.length;
    for (t = 0; t < a && e[t] === c[t]; t++);
    var h = a - t;
    for (n = 1; n <= h && e[a - n] === c[r - n]; n++);
    return (Gc = c.slice(t, 1 < n ? 1 - n : void 0));
  }
  function Yc(t) {
    var e = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Zc() {
    return !0;
  }
  function wf() {
    return !1;
  }
  function Ue(t) {
    function e(a, n, c, r, h) {
      ((this._reactName = a),
        (this._targetInst = c),
        (this.type = n),
        (this.nativeEvent = r),
        (this.target = h),
        (this.currentTarget = null));
      for (var v in t) t.hasOwnProperty(v) && ((a = t[v]), (this[v] = a ? a(r) : r[v]));
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
      b(e.prototype, {
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
      e
    );
  }
  var el = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Xc = Ue(el),
    Di = b({}, el, { view: 0, detail: 0 }),
    I1 = Ue(Di),
    wo,
    No,
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
      getModifierState: Co,
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
          : (t !== Bi &&
              (Bi && t.type === 'mousemove'
                ? ((wo = t.screenX - Bi.screenX), (No = t.screenY - Bi.screenY))
                : (No = wo = 0),
              (Bi = t)),
            wo);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : No;
      },
    }),
    Nf = Ue(Kc),
    P1 = b({}, Kc, { dataTransfer: 0 }),
    tp = Ue(P1),
    ep = b({}, Di, { relatedTarget: 0 }),
    zo = Ue(ep),
    ap = b({}, el, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    np = Ue(ap),
    lp = b({}, el, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    ip = Ue(lp),
    cp = b({}, el, { data: 0 }),
    zf = Ue(cp),
    sp = {
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
    op = {
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
    rp = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function up(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = rp[t]) ? !!e[t] : !1;
  }
  function Co() {
    return up;
  }
  var fp = b({}, Di, {
      key: function (t) {
        if (t.key) {
          var e = sp[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = Yc(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? op[t.keyCode] || 'Unidentified'
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
      charCode: function (t) {
        return t.type === 'keypress' ? Yc(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? Yc(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    dp = Ue(fp),
    mp = b({}, Kc, {
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
    Cf = Ue(mp),
    hp = b({}, Di, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Co,
    }),
    pp = Ue(hp),
    yp = b({}, el, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    gp = Ue(yp),
    vp = b({}, Kc, {
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
    _p = Ue(vp),
    bp = b({}, el, { newState: 0, oldState: 0 }),
    Sp = Ue(bp),
    xp = [9, 13, 27, 32],
    Ro = Va && 'CompositionEvent' in window,
    Li = null;
  Va && 'documentMode' in document && (Li = document.documentMode);
  var jp = Va && 'TextEvent' in window && !Li,
    Rf = Va && (!Ro || (Li && 8 < Li && 11 >= Li)),
    Of = ' ',
    Df = !1;
  function Bf(t, e) {
    switch (t) {
      case 'keyup':
        return xp.indexOf(e.keyCode) !== -1;
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
  function Lf(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var Hl = !1;
  function Ap(t, e) {
    switch (t) {
      case 'compositionend':
        return Lf(e);
      case 'keypress':
        return e.which !== 32 ? null : ((Df = !0), Of);
      case 'textInput':
        return ((t = e.data), t === Of && Df ? null : t);
      default:
        return null;
    }
  }
  function Tp(t, e) {
    if (Hl)
      return t === 'compositionend' || (!Ro && Bf(t, e))
        ? ((t = Ef()), (Gc = Eo = dn = null), (Hl = !1), t)
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
        return Rf && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var Mp = {
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
  function $f(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === 'input' ? !!Mp[t.type] : e === 'textarea';
  }
  function Hf(t, e, a, n) {
    (Ll ? ($l ? $l.push(n) : ($l = [n])) : (Ll = n),
      (e = Ls(e, 'onChange')),
      0 < e.length &&
        ((a = new Xc('onChange', 'change', null, a, n)), t.push({ event: a, listeners: e })));
  }
  var $i = null,
    Hi = null;
  function Ep(t) {
    b0(t, 0);
  }
  function Qc(t) {
    var e = Ci(t);
    if (_f(e)) return t;
  }
  function kf(t, e) {
    if (t === 'change') return e;
  }
  var Uf = !1;
  if (Va) {
    var Oo;
    if (Va) {
      var Do = 'oninput' in document;
      if (!Do) {
        var qf = document.createElement('div');
        (qf.setAttribute('oninput', 'return;'), (Do = typeof qf.oninput == 'function'));
      }
      Oo = Do;
    } else Oo = !1;
    Uf = Oo && (!document.documentMode || 9 < document.documentMode);
  }
  function Vf() {
    $i && ($i.detachEvent('onpropertychange', Gf), (Hi = $i = null));
  }
  function Gf(t) {
    if (t.propertyName === 'value' && Qc(Hi)) {
      var e = [];
      (Hf(e, Hi, t, Ao(t)), Mf(Ep, e));
    }
  }
  function wp(t, e, a) {
    t === 'focusin'
      ? (Vf(), ($i = e), (Hi = a), $i.attachEvent('onpropertychange', Gf))
      : t === 'focusout' && Vf();
  }
  function Np(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return Qc(Hi);
  }
  function zp(t, e) {
    if (t === 'click') return Qc(e);
  }
  function Cp(t, e) {
    if (t === 'input' || t === 'change') return Qc(e);
  }
  function Rp(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var Xe = typeof Object.is == 'function' ? Object.is : Rp;
  function ki(t, e) {
    if (Xe(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var a = Object.keys(t),
      n = Object.keys(e);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var c = a[n];
      if (!kt.call(e, c) || !Xe(t[c], e[c])) return !1;
    }
    return !0;
  }
  function Yf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Zf(t, e) {
    var a = Yf(t);
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
      a = Yf(a);
    }
  }
  function Xf(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? Xf(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function Kf(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = qc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow;
      else break;
      e = qc(t.document);
    }
    return e;
  }
  function Bo(t) {
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
  var Op = Va && 'documentMode' in document && 11 >= document.documentMode,
    kl = null,
    Lo = null,
    Ui = null,
    $o = !1;
  function Qf(t, e, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    $o ||
      kl == null ||
      kl !== qc(n) ||
      ((n = kl),
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
        (n = Ls(Lo, 'onSelect')),
        0 < n.length &&
          ((e = new Xc('onSelect', 'select', null, e, a)),
          t.push({ event: e, listeners: n }),
          (e.target = kl))));
  }
  function al(t, e) {
    var a = {};
    return (
      (a[t.toLowerCase()] = e.toLowerCase()),
      (a['Webkit' + t] = 'webkit' + e),
      (a['Moz' + t] = 'moz' + e),
      a
    );
  }
  var Ul = {
      animationend: al('Animation', 'AnimationEnd'),
      animationiteration: al('Animation', 'AnimationIteration'),
      animationstart: al('Animation', 'AnimationStart'),
      transitionrun: al('Transition', 'TransitionRun'),
      transitionstart: al('Transition', 'TransitionStart'),
      transitioncancel: al('Transition', 'TransitionCancel'),
      transitionend: al('Transition', 'TransitionEnd'),
    },
    Ho = {},
    Wf = {};
  Va &&
    ((Wf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Ul.animationend.animation,
      delete Ul.animationiteration.animation,
      delete Ul.animationstart.animation),
    'TransitionEvent' in window || delete Ul.transitionend.transition);
  function nl(t) {
    if (Ho[t]) return Ho[t];
    if (!Ul[t]) return t;
    var e = Ul[t],
      a;
    for (a in e) if (e.hasOwnProperty(a) && a in Wf) return (Ho[t] = e[a]);
    return t;
  }
  var Jf = nl('animationend'),
    Ff = nl('animationiteration'),
    If = nl('animationstart'),
    Dp = nl('transitionrun'),
    Bp = nl('transitionstart'),
    Lp = nl('transitioncancel'),
    Pf = nl('transitionend'),
    td = new Map(),
    ko =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  ko.push('scrollEnd');
  function ga(t, e) {
    (td.set(t, e), tl(e, [t]));
  }
  var Wc =
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
    ia = [],
    ql = 0,
    Uo = 0;
  function Jc() {
    for (var t = ql, e = (Uo = ql = 0); e < t; ) {
      var a = ia[e];
      ia[e++] = null;
      var n = ia[e];
      ia[e++] = null;
      var c = ia[e];
      ia[e++] = null;
      var r = ia[e];
      if (((ia[e++] = null), n !== null && c !== null)) {
        var h = n.pending;
        (h === null ? (c.next = c) : ((c.next = h.next), (h.next = c)), (n.pending = c));
      }
      r !== 0 && ed(a, c, r);
    }
  }
  function Fc(t, e, a, n) {
    ((ia[ql++] = t),
      (ia[ql++] = e),
      (ia[ql++] = a),
      (ia[ql++] = n),
      (Uo |= n),
      (t.lanes |= n),
      (t = t.alternate),
      t !== null && (t.lanes |= n));
  }
  function qo(t, e, a, n) {
    return (Fc(t, e, a, n), Ic(t));
  }
  function ll(t, e) {
    return (Fc(t, null, null, e), Ic(t));
  }
  function ed(t, e, a) {
    t.lanes |= a;
    var n = t.alternate;
    n !== null && (n.lanes |= a);
    for (var c = !1, r = t.return; r !== null; )
      ((r.childLanes |= a),
        (n = r.alternate),
        n !== null && (n.childLanes |= a),
        r.tag === 22 && ((t = r.stateNode), t === null || t._visibility & 1 || (c = !0)),
        (t = r),
        (r = r.return));
    return t.tag === 3
      ? ((r = t.stateNode),
        c &&
          e !== null &&
          ((c = 31 - Z(a)),
          (t = r.hiddenUpdates),
          (n = t[c]),
          n === null ? (t[c] = [e]) : n.push(e),
          (e.lane = a | 536870912)),
        r)
      : null;
  }
  function Ic(t) {
    if (50 < oc) throw ((oc = 0), (Jr = null), Error(o(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var Vl = {};
  function $p(t, e, a, n) {
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
  function Ke(t, e, a, n) {
    return new $p(t, e, a, n);
  }
  function Vo(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Ga(t, e) {
    var a = t.alternate;
    return (
      a === null
        ? ((a = Ke(t.tag, e, t.key, t.mode)),
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
  function ad(t, e) {
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
  function Pc(t, e, a, n, c, r) {
    var h = 0;
    if (((n = t), typeof t == 'function')) Vo(t) && (h = 1);
    else if (typeof t == 'string')
      h = Vy(t, a, J.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case ie:
          return ((t = Ke(31, a, e, c)), (t.elementType = ie), (t.lanes = r), t);
        case D:
          return il(a.children, c, r, e);
        case R:
          ((h = 8), (c |= 24));
          break;
        case G:
          return ((t = Ke(12, a, e, c | 2)), (t.elementType = G), (t.lanes = r), t);
        case pt:
          return ((t = Ke(13, a, e, c)), (t.elementType = pt), (t.lanes = r), t);
        case Mt:
          return ((t = Ke(19, a, e, c)), (t.elementType = Mt), (t.lanes = r), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case ct:
                h = 10;
                break t;
              case Y:
                h = 9;
                break t;
              case U:
                h = 11;
                break t;
              case at:
                h = 14;
                break t;
              case Ot:
                ((h = 16), (n = null));
                break t;
            }
          ((h = 29), (a = Error(o(130, t === null ? 'null' : typeof t, ''))), (n = null));
      }
    return ((e = Ke(h, a, e, c)), (e.elementType = t), (e.type = n), (e.lanes = r), e);
  }
  function il(t, e, a, n) {
    return ((t = Ke(7, t, n, e)), (t.lanes = a), t);
  }
  function Go(t, e, a) {
    return ((t = Ke(6, t, null, e)), (t.lanes = a), t);
  }
  function nd(t) {
    var e = Ke(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function Yo(t, e, a) {
    return (
      (e = Ke(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = a),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var ld = new WeakMap();
  function ca(t, e) {
    if (typeof t == 'object' && t !== null) {
      var a = ld.get(t);
      return a !== void 0 ? a : ((e = { value: t, source: e, stack: ye(e) }), ld.set(t, e), e);
    }
    return { value: t, source: e, stack: ye(e) };
  }
  var Gl = [],
    Yl = 0,
    ts = null,
    qi = 0,
    sa = [],
    oa = 0,
    mn = null,
    Na = 1,
    za = '';
  function Ya(t, e) {
    ((Gl[Yl++] = qi), (Gl[Yl++] = ts), (ts = t), (qi = e));
  }
  function id(t, e, a) {
    ((sa[oa++] = Na), (sa[oa++] = za), (sa[oa++] = mn), (mn = t));
    var n = Na;
    t = za;
    var c = 32 - Z(n) - 1;
    ((n &= ~(1 << c)), (a += 1));
    var r = 32 - Z(e) + c;
    if (30 < r) {
      var h = c - (c % 5);
      ((r = (n & ((1 << h) - 1)).toString(32)),
        (n >>= h),
        (c -= h),
        (Na = (1 << (32 - Z(e) + c)) | (a << c) | n),
        (za = r + t));
    } else ((Na = (1 << r) | (a << c) | n), (za = t));
  }
  function Zo(t) {
    t.return !== null && (Ya(t, 1), id(t, 1, 0));
  }
  function Xo(t) {
    for (; t === ts; ) ((ts = Gl[--Yl]), (Gl[Yl] = null), (qi = Gl[--Yl]), (Gl[Yl] = null));
    for (; t === mn; )
      ((mn = sa[--oa]),
        (sa[oa] = null),
        (za = sa[--oa]),
        (sa[oa] = null),
        (Na = sa[--oa]),
        (sa[oa] = null));
  }
  function cd(t, e) {
    ((sa[oa++] = Na), (sa[oa++] = za), (sa[oa++] = mn), (Na = e.id), (za = e.overflow), (mn = t));
  }
  var Me = null,
    Wt = null,
    jt = !1,
    hn = null,
    ra = !1,
    Ko = Error(o(519));
  function pn(t) {
    var e = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Vi(ca(e, t)), Ko);
  }
  function sd(t) {
    var e = t.stateNode,
      a = t.type,
      n = t.memoizedProps;
    switch (((e[ee] = t), (e[Te] = n), a)) {
      case 'dialog':
        (vt('cancel', e), vt('close', e));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        vt('load', e);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < uc.length; a++) vt(uc[a], e);
        break;
      case 'source':
        vt('error', e);
        break;
      case 'img':
      case 'image':
      case 'link':
        (vt('error', e), vt('load', e));
        break;
      case 'details':
        vt('toggle', e);
        break;
      case 'input':
        (vt('invalid', e),
          bf(e, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        vt('invalid', e);
        break;
      case 'textarea':
        (vt('invalid', e), xf(e, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      e.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      A0(e.textContent, a)
        ? (n.popover != null && (vt('beforetoggle', e), vt('toggle', e)),
          n.onScroll != null && vt('scroll', e),
          n.onScrollEnd != null && vt('scrollend', e),
          n.onClick != null && (e.onclick = qa),
          (e = !0))
        : (e = !1),
      e || pn(t, !0));
  }
  function od(t) {
    for (Me = t.return; Me; )
      switch (Me.tag) {
        case 5:
        case 31:
        case 13:
          ra = !1;
          return;
        case 27:
        case 3:
          ra = !0;
          return;
        default:
          Me = Me.return;
      }
  }
  function Zl(t) {
    if (t !== Me) return !1;
    if (!jt) return (od(t), (jt = !0), !1);
    var e = t.tag,
      a;
    if (
      ((a = e !== 3 && e !== 27) &&
        ((a = e === 5) &&
          ((a = t.type), (a = !(a !== 'form' && a !== 'button') || fu(t.type, t.memoizedProps))),
        (a = !a)),
      a && Wt && pn(t),
      od(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(o(317));
      Wt = O0(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(o(317));
      Wt = O0(t);
    } else
      e === 27
        ? ((e = Wt), Nn(t.type) ? ((t = yu), (yu = null), (Wt = t)) : (Wt = e))
        : (Wt = Me ? fa(t.stateNode.nextSibling) : null);
    return !0;
  }
  function cl() {
    ((Wt = Me = null), (jt = !1));
  }
  function Qo() {
    var t = hn;
    return (t !== null && (Ye === null ? (Ye = t) : Ye.push.apply(Ye, t), (hn = null)), t);
  }
  function Vi(t) {
    hn === null ? (hn = [t]) : hn.push(t);
  }
  var Wo = x(null),
    sl = null,
    Za = null;
  function yn(t, e, a) {
    (Q(Wo, e._currentValue), (e._currentValue = a));
  }
  function Xa(t) {
    ((t._currentValue = Wo.current), H(Wo));
  }
  function Jo(t, e, a) {
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
  function Fo(t, e, a, n) {
    var c = t.child;
    for (c !== null && (c.return = t); c !== null; ) {
      var r = c.dependencies;
      if (r !== null) {
        var h = c.child;
        r = r.firstContext;
        t: for (; r !== null; ) {
          var v = r;
          r = c;
          for (var S = 0; S < e.length; S++)
            if (v.context === e[S]) {
              ((r.lanes |= a),
                (v = r.alternate),
                v !== null && (v.lanes |= a),
                Jo(r.return, a, t),
                n || (h = null));
              break t;
            }
          r = v.next;
        }
      } else if (c.tag === 18) {
        if (((h = c.return), h === null)) throw Error(o(341));
        ((h.lanes |= a), (r = h.alternate), r !== null && (r.lanes |= a), Jo(h, a, t), (h = null));
      } else h = c.child;
      if (h !== null) h.return = c;
      else
        for (h = c; h !== null; ) {
          if (h === t) {
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
  function Xl(t, e, a, n) {
    t = null;
    for (var c = e, r = !1; c !== null; ) {
      if (!r) {
        if ((c.flags & 524288) !== 0) r = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var h = c.alternate;
        if (h === null) throw Error(o(387));
        if (((h = h.memoizedProps), h !== null)) {
          var v = c.type;
          Xe(c.pendingProps.value, h.value) || (t !== null ? t.push(v) : (t = [v]));
        }
      } else if (c === Tt.current) {
        if (((h = c.alternate), h === null)) throw Error(o(387));
        h.memoizedState.memoizedState !== c.memoizedState.memoizedState &&
          (t !== null ? t.push(pc) : (t = [pc]));
      }
      c = c.return;
    }
    (t !== null && Fo(e, t, a, n), (e.flags |= 262144));
  }
  function es(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Xe(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function ol(t) {
    ((sl = t), (Za = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function Ee(t) {
    return rd(sl, t);
  }
  function as(t, e) {
    return (sl === null && ol(t), rd(t, e));
  }
  function rd(t, e) {
    var a = e._currentValue;
    if (((e = { context: e, memoizedValue: a, next: null }), Za === null)) {
      if (t === null) throw Error(o(308));
      ((Za = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else Za = Za.next = e;
    return a;
  }
  var Hp =
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
    kp = l.unstable_scheduleCallback,
    Up = l.unstable_NormalPriority,
    ue = {
      $$typeof: ct,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Io() {
    return { controller: new Hp(), data: new Map(), refCount: 0 };
  }
  function Gi(t) {
    (t.refCount--,
      t.refCount === 0 &&
        kp(Up, function () {
          t.controller.abort();
        }));
  }
  var Yi = null,
    Po = 0,
    Kl = 0,
    Ql = null;
  function qp(t, e) {
    if (Yi === null) {
      var a = (Yi = []);
      ((Po = 0),
        (Kl = au()),
        (Ql = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (Po++, e.then(ud, ud), e);
  }
  function ud() {
    if (--Po === 0 && Yi !== null) {
      Ql !== null && (Ql.status = 'fulfilled');
      var t = Yi;
      ((Yi = null), (Kl = 0), (Ql = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Vp(t, e) {
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
      t.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = e));
          for (var c = 0; c < a.length; c++) (0, a[c])(e);
        },
        function (c) {
          for (n.status = 'rejected', n.reason = c, c = 0; c < a.length; c++) (0, a[c])(void 0);
        }
      ),
      n
    );
  }
  var fd = O.S;
  O.S = function (t, e) {
    ((Qm = Bt()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && qp(t, e),
      fd !== null && fd(t, e));
  };
  var rl = x(null);
  function tr() {
    var t = rl.current;
    return t !== null ? t : Gt.pooledCache;
  }
  function ns(t, e) {
    e === null ? Q(rl, rl.current) : Q(rl, e.pool);
  }
  function dd() {
    var t = tr();
    return t === null ? null : { parent: ue._currentValue, pool: t };
  }
  var Wl = Error(o(460)),
    er = Error(o(474)),
    ls = Error(o(542)),
    is = { then: function () {} };
  function md(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function hd(t, e, a) {
    switch (
      ((a = t[a]), a === void 0 ? t.push(e) : a !== e && (e.then(qa, qa), (e = a)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), yd(t), t);
      default:
        if (typeof e.status == 'string') e.then(qa, qa);
        else {
          if (((t = Gt), t !== null && 100 < t.shellSuspendCounter)) throw Error(o(482));
          ((t = e),
            (t.status = 'pending'),
            t.then(
              function (n) {
                if (e.status === 'pending') {
                  var c = e;
                  ((c.status = 'fulfilled'), (c.value = n));
                }
              },
              function (n) {
                if (e.status === 'pending') {
                  var c = e;
                  ((c.status = 'rejected'), (c.reason = n));
                }
              }
            ));
        }
        switch (e.status) {
          case 'fulfilled':
            return e.value;
          case 'rejected':
            throw ((t = e.reason), yd(t), t);
        }
        throw ((fl = e), Wl);
    }
  }
  function ul(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((fl = a), Wl) : a;
    }
  }
  var fl = null;
  function pd() {
    if (fl === null) throw Error(o(459));
    var t = fl;
    return ((fl = null), t);
  }
  function yd(t) {
    if (t === Wl || t === ls) throw Error(o(483));
  }
  var Jl = null,
    Zi = 0;
  function cs(t) {
    var e = Zi;
    return ((Zi += 1), Jl === null && (Jl = []), hd(Jl, t, e));
  }
  function Xi(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function ss(t, e) {
    throw e.$$typeof === A
      ? Error(o(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          o(
            31,
            t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t
          )
        ));
  }
  function gd(t) {
    function e(M, j) {
      if (t) {
        var w = M.deletions;
        w === null ? ((M.deletions = [j]), (M.flags |= 16)) : w.push(j);
      }
    }
    function a(M, j) {
      if (!t) return null;
      for (; j !== null; ) (e(M, j), (j = j.sibling));
      return null;
    }
    function n(M) {
      for (var j = new Map(); M !== null; )
        (M.key !== null ? j.set(M.key, M) : j.set(M.index, M), (M = M.sibling));
      return j;
    }
    function c(M, j) {
      return ((M = Ga(M, j)), (M.index = 0), (M.sibling = null), M);
    }
    function r(M, j, w) {
      return (
        (M.index = w),
        t
          ? ((w = M.alternate),
            w !== null
              ? ((w = w.index), w < j ? ((M.flags |= 67108866), j) : w)
              : ((M.flags |= 67108866), j))
          : ((M.flags |= 1048576), j)
      );
    }
    function h(M) {
      return (t && M.alternate === null && (M.flags |= 67108866), M);
    }
    function v(M, j, w, $) {
      return j === null || j.tag !== 6
        ? ((j = Go(w, M.mode, $)), (j.return = M), j)
        : ((j = c(j, w)), (j.return = M), j);
    }
    function S(M, j, w, $) {
      var nt = w.type;
      return nt === D
        ? B(M, j, w.props.children, $, w.key)
        : j !== null &&
            (j.elementType === nt ||
              (typeof nt == 'object' && nt !== null && nt.$$typeof === Ot && ul(nt) === j.type))
          ? ((j = c(j, w.props)), Xi(j, w), (j.return = M), j)
          : ((j = Pc(w.type, w.key, w.props, null, M.mode, $)), Xi(j, w), (j.return = M), j);
    }
    function N(M, j, w, $) {
      return j === null ||
        j.tag !== 4 ||
        j.stateNode.containerInfo !== w.containerInfo ||
        j.stateNode.implementation !== w.implementation
        ? ((j = Yo(w, M.mode, $)), (j.return = M), j)
        : ((j = c(j, w.children || [])), (j.return = M), j);
    }
    function B(M, j, w, $, nt) {
      return j === null || j.tag !== 7
        ? ((j = il(w, M.mode, $, nt)), (j.return = M), j)
        : ((j = c(j, w)), (j.return = M), j);
    }
    function k(M, j, w) {
      if ((typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint')
        return ((j = Go('' + j, M.mode, w)), (j.return = M), j);
      if (typeof j == 'object' && j !== null) {
        switch (j.$$typeof) {
          case E:
            return ((w = Pc(j.type, j.key, j.props, null, M.mode, w)), Xi(w, j), (w.return = M), w);
          case T:
            return ((j = Yo(j, M.mode, w)), (j.return = M), j);
          case Ot:
            return ((j = ul(j)), k(M, j, w));
        }
        if (oe(j) || ae(j)) return ((j = il(j, M.mode, w, null)), (j.return = M), j);
        if (typeof j.then == 'function') return k(M, cs(j), w);
        if (j.$$typeof === ct) return k(M, as(M, j), w);
        ss(M, j);
      }
      return null;
    }
    function z(M, j, w, $) {
      var nt = j !== null ? j.key : null;
      if ((typeof w == 'string' && w !== '') || typeof w == 'number' || typeof w == 'bigint')
        return nt !== null ? null : v(M, j, '' + w, $);
      if (typeof w == 'object' && w !== null) {
        switch (w.$$typeof) {
          case E:
            return w.key === nt ? S(M, j, w, $) : null;
          case T:
            return w.key === nt ? N(M, j, w, $) : null;
          case Ot:
            return ((w = ul(w)), z(M, j, w, $));
        }
        if (oe(w) || ae(w)) return nt !== null ? null : B(M, j, w, $, null);
        if (typeof w.then == 'function') return z(M, j, cs(w), $);
        if (w.$$typeof === ct) return z(M, j, as(M, w), $);
        ss(M, w);
      }
      return null;
    }
    function C(M, j, w, $, nt) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((M = M.get(w) || null), v(j, M, '' + $, nt));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case E:
            return ((M = M.get($.key === null ? w : $.key) || null), S(j, M, $, nt));
          case T:
            return ((M = M.get($.key === null ? w : $.key) || null), N(j, M, $, nt));
          case Ot:
            return (($ = ul($)), C(M, j, w, $, nt));
        }
        if (oe($) || ae($)) return ((M = M.get(w) || null), B(j, M, $, nt, null));
        if (typeof $.then == 'function') return C(M, j, w, cs($), nt);
        if ($.$$typeof === ct) return C(M, j, w, as(j, $), nt);
        ss(j, $);
      }
      return null;
    }
    function I(M, j, w, $) {
      for (
        var nt = null, Nt = null, tt = j, mt = (j = 0), St = null;
        tt !== null && mt < w.length;
        mt++
      ) {
        tt.index > mt ? ((St = tt), (tt = null)) : (St = tt.sibling);
        var zt = z(M, tt, w[mt], $);
        if (zt === null) {
          tt === null && (tt = St);
          break;
        }
        (t && tt && zt.alternate === null && e(M, tt),
          (j = r(zt, j, mt)),
          Nt === null ? (nt = zt) : (Nt.sibling = zt),
          (Nt = zt),
          (tt = St));
      }
      if (mt === w.length) return (a(M, tt), jt && Ya(M, mt), nt);
      if (tt === null) {
        for (; mt < w.length; mt++)
          ((tt = k(M, w[mt], $)),
            tt !== null &&
              ((j = r(tt, j, mt)), Nt === null ? (nt = tt) : (Nt.sibling = tt), (Nt = tt)));
        return (jt && Ya(M, mt), nt);
      }
      for (tt = n(tt); mt < w.length; mt++)
        ((St = C(tt, M, mt, w[mt], $)),
          St !== null &&
            (t && St.alternate !== null && tt.delete(St.key === null ? mt : St.key),
            (j = r(St, j, mt)),
            Nt === null ? (nt = St) : (Nt.sibling = St),
            (Nt = St)));
      return (
        t &&
          tt.forEach(function (Dn) {
            return e(M, Dn);
          }),
        jt && Ya(M, mt),
        nt
      );
    }
    function it(M, j, w, $) {
      if (w == null) throw Error(o(151));
      for (
        var nt = null, Nt = null, tt = j, mt = (j = 0), St = null, zt = w.next();
        tt !== null && !zt.done;
        mt++, zt = w.next()
      ) {
        tt.index > mt ? ((St = tt), (tt = null)) : (St = tt.sibling);
        var Dn = z(M, tt, zt.value, $);
        if (Dn === null) {
          tt === null && (tt = St);
          break;
        }
        (t && tt && Dn.alternate === null && e(M, tt),
          (j = r(Dn, j, mt)),
          Nt === null ? (nt = Dn) : (Nt.sibling = Dn),
          (Nt = Dn),
          (tt = St));
      }
      if (zt.done) return (a(M, tt), jt && Ya(M, mt), nt);
      if (tt === null) {
        for (; !zt.done; mt++, zt = w.next())
          ((zt = k(M, zt.value, $)),
            zt !== null &&
              ((j = r(zt, j, mt)), Nt === null ? (nt = zt) : (Nt.sibling = zt), (Nt = zt)));
        return (jt && Ya(M, mt), nt);
      }
      for (tt = n(tt); !zt.done; mt++, zt = w.next())
        ((zt = C(tt, M, mt, zt.value, $)),
          zt !== null &&
            (t && zt.alternate !== null && tt.delete(zt.key === null ? mt : zt.key),
            (j = r(zt, j, mt)),
            Nt === null ? (nt = zt) : (Nt.sibling = zt),
            (Nt = zt)));
      return (
        t &&
          tt.forEach(function (Py) {
            return e(M, Py);
          }),
        jt && Ya(M, mt),
        nt
      );
    }
    function Vt(M, j, w, $) {
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
            t: {
              for (var nt = w.key; j !== null; ) {
                if (j.key === nt) {
                  if (((nt = w.type), nt === D)) {
                    if (j.tag === 7) {
                      (a(M, j.sibling), ($ = c(j, w.props.children)), ($.return = M), (M = $));
                      break t;
                    }
                  } else if (
                    j.elementType === nt ||
                    (typeof nt == 'object' &&
                      nt !== null &&
                      nt.$$typeof === Ot &&
                      ul(nt) === j.type)
                  ) {
                    (a(M, j.sibling), ($ = c(j, w.props)), Xi($, w), ($.return = M), (M = $));
                    break t;
                  }
                  a(M, j);
                  break;
                } else e(M, j);
                j = j.sibling;
              }
              w.type === D
                ? (($ = il(w.props.children, M.mode, $, w.key)), ($.return = M), (M = $))
                : (($ = Pc(w.type, w.key, w.props, null, M.mode, $)),
                  Xi($, w),
                  ($.return = M),
                  (M = $));
            }
            return h(M);
          case T:
            t: {
              for (nt = w.key; j !== null; ) {
                if (j.key === nt)
                  if (
                    j.tag === 4 &&
                    j.stateNode.containerInfo === w.containerInfo &&
                    j.stateNode.implementation === w.implementation
                  ) {
                    (a(M, j.sibling), ($ = c(j, w.children || [])), ($.return = M), (M = $));
                    break t;
                  } else {
                    a(M, j);
                    break;
                  }
                else e(M, j);
                j = j.sibling;
              }
              (($ = Yo(w, M.mode, $)), ($.return = M), (M = $));
            }
            return h(M);
          case Ot:
            return ((w = ul(w)), Vt(M, j, w, $));
        }
        if (oe(w)) return I(M, j, w, $);
        if (ae(w)) {
          if (((nt = ae(w)), typeof nt != 'function')) throw Error(o(150));
          return ((w = nt.call(w)), it(M, j, w, $));
        }
        if (typeof w.then == 'function') return Vt(M, j, cs(w), $);
        if (w.$$typeof === ct) return Vt(M, j, as(M, w), $);
        ss(M, w);
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
        var nt = Vt(M, j, w, $);
        return ((Jl = null), nt);
      } catch (tt) {
        if (tt === Wl || tt === ls) throw tt;
        var Nt = Ke(29, tt, null, M.mode);
        return ((Nt.lanes = $), (Nt.return = M), Nt);
      } finally {
      }
    };
  }
  var dl = gd(!0),
    vd = gd(!1),
    gn = !1;
  function ar(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function nr(t, e) {
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
  function vn(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function _n(t, e, a) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Rt & 2) !== 0)) {
      var c = n.pending;
      return (
        c === null ? (e.next = e) : ((e.next = c.next), (c.next = e)),
        (n.pending = e),
        (e = Ic(t)),
        ed(t, null, a),
        e
      );
    }
    return (Fc(t, n, e, a), Ic(t));
  }
  function Ki(t, e, a) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (a & 4194048) !== 0))) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (a |= n), (e.lanes = a), Et(t, a));
    }
  }
  function lr(t, e) {
    var a = t.updateQueue,
      n = t.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var c = null,
        r = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var h = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (r === null ? (c = r = h) : (r = r.next = h), (a = a.next));
        } while (a !== null);
        r === null ? (c = r = e) : (r = r.next = e);
      } else c = r = e;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: r,
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
  var ir = !1;
  function Qi() {
    if (ir) {
      var t = Ql;
      if (t !== null) throw t;
    }
  }
  function Wi(t, e, a, n) {
    ir = !1;
    var c = t.updateQueue;
    gn = !1;
    var r = c.firstBaseUpdate,
      h = c.lastBaseUpdate,
      v = c.shared.pending;
    if (v !== null) {
      c.shared.pending = null;
      var S = v,
        N = S.next;
      ((S.next = null), h === null ? (r = N) : (h.next = N), (h = S));
      var B = t.alternate;
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
        if (C ? (bt & z) === z : (n & z) === z) {
          (z !== 0 && z === Kl && (ir = !0),
            B !== null &&
              (B = B.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          t: {
            var I = t,
              it = v;
            z = e;
            var Vt = a;
            switch (it.tag) {
              case 1:
                if (((I = it.payload), typeof I == 'function')) {
                  k = I.call(Vt, k, z);
                  break t;
                }
                k = I;
                break t;
              case 3:
                I.flags = (I.flags & -65537) | 128;
              case 0:
                if (
                  ((I = it.payload), (z = typeof I == 'function' ? I.call(Vt, k, z) : I), z == null)
                )
                  break t;
                k = b({}, k, z);
                break t;
              case 2:
                gn = !0;
            }
          }
          ((z = v.callback),
            z !== null &&
              ((t.flags |= 64),
              C && (t.flags |= 8192),
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
        (An |= h),
        (t.lanes = h),
        (t.memoizedState = k));
    }
  }
  function _d(t, e) {
    if (typeof t != 'function') throw Error(o(191, t));
    t.call(e);
  }
  function bd(t, e) {
    var a = t.callbacks;
    if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) _d(a[t], e);
  }
  var Fl = x(null),
    os = x(0);
  function Sd(t, e) {
    ((t = en), Q(os, t), Q(Fl, e), (en = t | e.baseLanes));
  }
  function cr() {
    (Q(os, en), Q(Fl, Fl.current));
  }
  function sr() {
    ((en = os.current), H(Fl), H(os));
  }
  var Qe = x(null),
    ua = null;
  function bn(t) {
    var e = t.alternate;
    (Q(ce, ce.current & 1),
      Q(Qe, t),
      ua === null && (e === null || Fl.current !== null || e.memoizedState !== null) && (ua = t));
  }
  function or(t) {
    (Q(ce, ce.current), Q(Qe, t), ua === null && (ua = t));
  }
  function xd(t) {
    t.tag === 22 ? (Q(ce, ce.current), Q(Qe, t), ua === null && (ua = t)) : Sn();
  }
  function Sn() {
    (Q(ce, ce.current), Q(Qe, Qe.current));
  }
  function We(t) {
    (H(Qe), ua === t && (ua = null), H(ce));
  }
  var ce = x(0);
  function rs(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || hu(a) || pu(a))) return e;
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
  var Ka = 0,
    ut = null,
    Ut = null,
    fe = null,
    us = !1,
    Il = !1,
    ml = !1,
    fs = 0,
    Ji = 0,
    Pl = null,
    Gp = 0;
  function ne() {
    throw Error(o(321));
  }
  function rr(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++) if (!Xe(t[a], e[a])) return !1;
    return !0;
  }
  function ur(t, e, a, n, c, r) {
    return (
      (Ka = r),
      (ut = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (O.H = t === null || t.memoizedState === null ? im : Tr),
      (ml = !1),
      (r = a(n, c)),
      (ml = !1),
      Il && (r = Ad(e, a, n, c)),
      jd(t),
      r
    );
  }
  function jd(t) {
    O.H = Pi;
    var e = Ut !== null && Ut.next !== null;
    if (((Ka = 0), (fe = Ut = ut = null), (us = !1), (Ji = 0), (Pl = null), e)) throw Error(o(300));
    t === null || de || ((t = t.dependencies), t !== null && es(t) && (de = !0));
  }
  function Ad(t, e, a, n) {
    ut = t;
    var c = 0;
    do {
      if ((Il && (Pl = null), (Ji = 0), (Il = !1), 25 <= c)) throw Error(o(301));
      if (((c += 1), (fe = Ut = null), t.updateQueue != null)) {
        var r = t.updateQueue;
        ((r.lastEffect = null),
          (r.events = null),
          (r.stores = null),
          r.memoCache != null && (r.memoCache.index = 0));
      }
      ((O.H = cm), (r = e(a, n)));
    } while (Il);
    return r;
  }
  function Yp() {
    var t = O.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? Fi(e) : e),
      (t = t.useState()[0]),
      (Ut !== null ? Ut.memoizedState : null) !== t && (ut.flags |= 1024),
      e
    );
  }
  function fr() {
    var t = fs !== 0;
    return ((fs = 0), t);
  }
  function dr(t, e, a) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~a));
  }
  function mr(t) {
    if (us) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      us = !1;
    }
    ((Ka = 0), (fe = Ut = ut = null), (Il = !1), (Ji = fs = 0), (Pl = null));
  }
  function $e() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (fe === null ? (ut.memoizedState = fe = t) : (fe = fe.next = t), fe);
  }
  function se() {
    if (Ut === null) {
      var t = ut.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ut.next;
    var e = fe === null ? ut.memoizedState : fe.next;
    if (e !== null) ((fe = e), (Ut = t));
    else {
      if (t === null) throw ut.alternate === null ? Error(o(467)) : Error(o(310));
      ((Ut = t),
        (t = {
          memoizedState: Ut.memoizedState,
          baseState: Ut.baseState,
          baseQueue: Ut.baseQueue,
          queue: Ut.queue,
          next: null,
        }),
        fe === null ? (ut.memoizedState = fe = t) : (fe = fe.next = t));
    }
    return fe;
  }
  function ds() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Fi(t) {
    var e = Ji;
    return (
      (Ji += 1),
      Pl === null && (Pl = []),
      (t = hd(Pl, t, e)),
      (e = ut),
      (fe === null ? e.memoizedState : fe.next) === null &&
        ((e = e.alternate), (O.H = e === null || e.memoizedState === null ? im : Tr)),
      t
    );
  }
  function ms(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return Fi(t);
      if (t.$$typeof === ct) return Ee(t);
    }
    throw Error(o(438, String(t)));
  }
  function hr(t) {
    var e = null,
      a = ut.updateQueue;
    if ((a !== null && (e = a.memoCache), e == null)) {
      var n = ut.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (e = {
              data: n.data.map(function (c) {
                return c.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      a === null && ((a = ds()), (ut.updateQueue = a)),
      (a.memoCache = e),
      (a = e.data[e.index]),
      a === void 0)
    )
      for (a = e.data[e.index] = Array(t), n = 0; n < t; n++) a[n] = Pt;
    return (e.index++, a);
  }
  function Qa(t, e) {
    return typeof e == 'function' ? e(t) : e;
  }
  function hs(t) {
    var e = se();
    return pr(e, Ut, t);
  }
  function pr(t, e, a) {
    var n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = a;
    var c = t.baseQueue,
      r = n.pending;
    if (r !== null) {
      if (c !== null) {
        var h = c.next;
        ((c.next = r.next), (r.next = h));
      }
      ((e.baseQueue = c = r), (n.pending = null));
    }
    if (((r = t.baseState), c === null)) t.memoizedState = r;
    else {
      e = c.next;
      var v = (h = null),
        S = null,
        N = e,
        B = !1;
      do {
        var k = N.lane & -536870913;
        if (k !== N.lane ? (bt & k) === k : (Ka & k) === k) {
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
              k === Kl && (B = !0));
          else if ((Ka & z) === z) {
            ((N = N.next), z === Kl && (B = !0));
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
              (ut.lanes |= z),
              (An |= z));
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
            (ut.lanes |= k),
            (An |= k));
        N = N.next;
      } while (N !== null && N !== e);
      if (
        (S === null ? (h = r) : (S.next = v),
        !Xe(r, t.memoizedState) && ((de = !0), B && ((a = Ql), a !== null)))
      )
        throw a;
      ((t.memoizedState = r), (t.baseState = h), (t.baseQueue = S), (n.lastRenderedState = r));
    }
    return (c === null && (n.lanes = 0), [t.memoizedState, n.dispatch]);
  }
  function yr(t) {
    var e = se(),
      a = e.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = t;
    var n = a.dispatch,
      c = a.pending,
      r = e.memoizedState;
    if (c !== null) {
      a.pending = null;
      var h = (c = c.next);
      do ((r = t(r, h.action)), (h = h.next));
      while (h !== c);
      (Xe(r, e.memoizedState) || (de = !0),
        (e.memoizedState = r),
        e.baseQueue === null && (e.baseState = r),
        (a.lastRenderedState = r));
    }
    return [r, n];
  }
  function Td(t, e, a) {
    var n = ut,
      c = se(),
      r = jt;
    if (r) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = e();
    var h = !Xe((Ut || c).memoizedState, a);
    if (
      (h && ((c.memoizedState = a), (de = !0)),
      (c = c.queue),
      _r(wd.bind(null, n, c, t), [t]),
      c.getSnapshot !== e || h || (fe !== null && fe.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ti(9, { destroy: void 0 }, Ed.bind(null, n, c, a, e), null),
        Gt === null)
      )
        throw Error(o(349));
      r || (Ka & 127) !== 0 || Md(n, e, a);
    }
    return a;
  }
  function Md(t, e, a) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: a }),
      (e = ut.updateQueue),
      e === null
        ? ((e = ds()), (ut.updateQueue = e), (e.stores = [t]))
        : ((a = e.stores), a === null ? (e.stores = [t]) : a.push(t)));
  }
  function Ed(t, e, a, n) {
    ((e.value = a), (e.getSnapshot = n), Nd(e) && zd(t));
  }
  function wd(t, e, a) {
    return a(function () {
      Nd(e) && zd(t);
    });
  }
  function Nd(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !Xe(t, a);
    } catch {
      return !0;
    }
  }
  function zd(t) {
    var e = ll(t, 2);
    e !== null && Ze(e, t, 2);
  }
  function gr(t) {
    var e = $e();
    if (typeof t == 'function') {
      var a = t;
      if (((t = a()), ml)) {
        be(!0);
        try {
          a();
        } finally {
          be(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qa,
        lastRenderedState: t,
      }),
      e
    );
  }
  function Cd(t, e, a, n) {
    return ((t.baseState = a), pr(t, Ut, typeof n == 'function' ? n : Qa));
  }
  function Zp(t, e, a, n, c) {
    if (gs(t)) throw Error(o(485));
    if (((t = e.action), t !== null)) {
      var r = {
        payload: c,
        action: t,
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
        (a = e.pending),
        a === null
          ? ((r.next = e.pending = r), Rd(e, r))
          : ((r.next = a.next), (e.pending = a.next = r)));
    }
  }
  function Rd(t, e) {
    var a = e.action,
      n = e.payload,
      c = t.state;
    if (e.isTransition) {
      var r = O.T,
        h = {};
      O.T = h;
      try {
        var v = a(c, n),
          S = O.S;
        (S !== null && S(h, v), Od(t, e, v));
      } catch (N) {
        vr(t, e, N);
      } finally {
        (r !== null && h.types !== null && (r.types = h.types), (O.T = r));
      }
    } else
      try {
        ((r = a(c, n)), Od(t, e, r));
      } catch (N) {
        vr(t, e, N);
      }
  }
  function Od(t, e, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            Dd(t, e, n);
          },
          function (n) {
            return vr(t, e, n);
          }
        )
      : Dd(t, e, a);
  }
  function Dd(t, e, a) {
    ((e.status = 'fulfilled'),
      (e.value = a),
      Bd(e),
      (t.state = a),
      (e = t.pending),
      e !== null &&
        ((a = e.next), a === e ? (t.pending = null) : ((a = a.next), (e.next = a), Rd(t, a))));
  }
  function vr(t, e, a) {
    var n = t.pending;
    if (((t.pending = null), n !== null)) {
      n = n.next;
      do ((e.status = 'rejected'), (e.reason = a), Bd(e), (e = e.next));
      while (e !== n);
    }
    t.action = null;
  }
  function Bd(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Ld(t, e) {
    return e;
  }
  function $d(t, e) {
    if (jt) {
      var a = Gt.formState;
      if (a !== null) {
        t: {
          var n = ut;
          if (jt) {
            if (Wt) {
              e: {
                for (var c = Wt, r = ra; c.nodeType !== 8; ) {
                  if (!r) {
                    c = null;
                    break e;
                  }
                  if (((c = fa(c.nextSibling)), c === null)) {
                    c = null;
                    break e;
                  }
                }
                ((r = c.data), (c = r === 'F!' || r === 'F' ? c : null));
              }
              if (c) {
                ((Wt = fa(c.nextSibling)), (n = c.data === 'F!'));
                break t;
              }
            }
            pn(n);
          }
          n = !1;
        }
        n && (e = a[0]);
      }
    }
    return (
      (a = $e()),
      (a.memoizedState = a.baseState = e),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ld,
        lastRenderedState: e,
      }),
      (a.queue = n),
      (a = am.bind(null, ut, n)),
      (n.dispatch = a),
      (n = gr(!1)),
      (r = Ar.bind(null, ut, !1, n.queue)),
      (n = $e()),
      (c = { state: e, dispatch: null, action: t, pending: null }),
      (n.queue = c),
      (a = Zp.bind(null, ut, c, r, a)),
      (c.dispatch = a),
      (n.memoizedState = t),
      [e, a, !1]
    );
  }
  function Hd(t) {
    var e = se();
    return kd(e, Ut, t);
  }
  function kd(t, e, a) {
    if (
      ((e = pr(t, e, Ld)[0]),
      (t = hs(Qa)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var n = Fi(e);
      } catch (h) {
        throw h === Wl ? ls : h;
      }
    else n = e;
    e = se();
    var c = e.queue,
      r = c.dispatch;
    return (
      a !== e.memoizedState &&
        ((ut.flags |= 2048), ti(9, { destroy: void 0 }, Xp.bind(null, c, a), null)),
      [n, r, t]
    );
  }
  function Xp(t, e) {
    t.action = e;
  }
  function Ud(t) {
    var e = se(),
      a = Ut;
    if (a !== null) return kd(e, a, t);
    (se(), (e = e.memoizedState), (a = se()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = t), [e, n, !1]);
  }
  function ti(t, e, a, n) {
    return (
      (t = { tag: t, create: a, deps: n, inst: e, next: null }),
      (e = ut.updateQueue),
      e === null && ((e = ds()), (ut.updateQueue = e)),
      (a = e.lastEffect),
      a === null
        ? (e.lastEffect = t.next = t)
        : ((n = a.next), (a.next = t), (t.next = n), (e.lastEffect = t)),
      t
    );
  }
  function qd() {
    return se().memoizedState;
  }
  function ps(t, e, a, n) {
    var c = $e();
    ((ut.flags |= t),
      (c.memoizedState = ti(1 | e, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function ys(t, e, a, n) {
    var c = se();
    n = n === void 0 ? null : n;
    var r = c.memoizedState.inst;
    Ut !== null && n !== null && rr(n, Ut.memoizedState.deps)
      ? (c.memoizedState = ti(e, r, a, n))
      : ((ut.flags |= t), (c.memoizedState = ti(1 | e, r, a, n)));
  }
  function Vd(t, e) {
    ps(8390656, 8, t, e);
  }
  function _r(t, e) {
    ys(2048, 8, t, e);
  }
  function Kp(t) {
    ut.flags |= 4;
    var e = ut.updateQueue;
    if (e === null) ((e = ds()), (ut.updateQueue = e), (e.events = [t]));
    else {
      var a = e.events;
      a === null ? (e.events = [t]) : a.push(t);
    }
  }
  function Gd(t) {
    var e = se().memoizedState;
    return (
      Kp({ ref: e, nextImpl: t }),
      function () {
        if ((Rt & 2) !== 0) throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function Yd(t, e) {
    return ys(4, 2, t, e);
  }
  function Zd(t, e) {
    return ys(4, 4, t, e);
  }
  function Xd(t, e) {
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
  function Kd(t, e, a) {
    ((a = a != null ? a.concat([t]) : null), ys(4, 4, Xd.bind(null, e, t), a));
  }
  function br() {}
  function Qd(t, e) {
    var a = se();
    e = e === void 0 ? null : e;
    var n = a.memoizedState;
    return e !== null && rr(e, n[1]) ? n[0] : ((a.memoizedState = [t, e]), t);
  }
  function Wd(t, e) {
    var a = se();
    e = e === void 0 ? null : e;
    var n = a.memoizedState;
    if (e !== null && rr(e, n[1])) return n[0];
    if (((n = t()), ml)) {
      be(!0);
      try {
        t();
      } finally {
        be(!1);
      }
    }
    return ((a.memoizedState = [n, e]), n);
  }
  function Sr(t, e, a) {
    return a === void 0 || ((Ka & 1073741824) !== 0 && (bt & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = a), (t = Jm()), (ut.lanes |= t), (An |= t), a);
  }
  function Jd(t, e, a, n) {
    return Xe(a, e)
      ? a
      : Fl.current !== null
        ? ((t = Sr(t, a, n)), Xe(t, e) || (de = !0), t)
        : (Ka & 42) === 0 || ((Ka & 1073741824) !== 0 && (bt & 261930) === 0)
          ? ((de = !0), (t.memoizedState = a))
          : ((t = Jm()), (ut.lanes |= t), (An |= t), e);
  }
  function Fd(t, e, a, n, c) {
    var r = K.p;
    K.p = r !== 0 && 8 > r ? r : 8;
    var h = O.T,
      v = {};
    ((O.T = v), Ar(t, !1, e, a));
    try {
      var S = c(),
        N = O.S;
      if (
        (N !== null && N(v, S), S !== null && typeof S == 'object' && typeof S.then == 'function')
      ) {
        var B = Vp(S, n);
        Ii(t, e, B, Ie(t));
      } else Ii(t, e, n, Ie(t));
    } catch (k) {
      Ii(t, e, { then: function () {}, status: 'rejected', reason: k }, Ie());
    } finally {
      ((K.p = r), h !== null && v.types !== null && (h.types = v.types), (O.T = h));
    }
  }
  function Qp() {}
  function xr(t, e, a, n) {
    if (t.tag !== 5) throw Error(o(476));
    var c = Id(t).queue;
    Fd(
      t,
      c,
      e,
      lt,
      a === null
        ? Qp
        : function () {
            return (Pd(t), a(n));
          }
    );
  }
  function Id(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: lt,
      baseState: lt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qa,
        lastRenderedState: lt,
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
          lastRenderedReducer: Qa,
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
  function Pd(t) {
    var e = Id(t);
    (e.next === null && (e = t.alternate.memoizedState), Ii(t, e.next.queue, {}, Ie()));
  }
  function jr() {
    return Ee(pc);
  }
  function tm() {
    return se().memoizedState;
  }
  function em() {
    return se().memoizedState;
  }
  function Wp(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var a = Ie();
          t = vn(a);
          var n = _n(e, t, a);
          (n !== null && (Ze(n, e, a), Ki(n, e, a)), (e = { cache: Io() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function Jp(t, e, a) {
    var n = Ie();
    ((a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      gs(t) ? nm(e, a) : ((a = qo(t, e, a, n)), a !== null && (Ze(a, t, n), lm(a, e, n))));
  }
  function am(t, e, a) {
    var n = Ie();
    Ii(t, e, a, n);
  }
  function Ii(t, e, a, n) {
    var c = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (gs(t)) nm(e, c);
    else {
      var r = t.alternate;
      if (
        t.lanes === 0 &&
        (r === null || r.lanes === 0) &&
        ((r = e.lastRenderedReducer), r !== null)
      )
        try {
          var h = e.lastRenderedState,
            v = r(h, a);
          if (((c.hasEagerState = !0), (c.eagerState = v), Xe(v, h)))
            return (Fc(t, e, c, 0), Gt === null && Jc(), !1);
        } catch {
        } finally {
        }
      if (((a = qo(t, e, c, n)), a !== null)) return (Ze(a, t, n), lm(a, e, n), !0);
    }
    return !1;
  }
  function Ar(t, e, a, n) {
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
      gs(t))
    ) {
      if (e) throw Error(o(479));
    } else ((e = qo(t, a, n, 2)), e !== null && Ze(e, t, 2));
  }
  function gs(t) {
    var e = t.alternate;
    return t === ut || (e !== null && e === ut);
  }
  function nm(t, e) {
    Il = us = !0;
    var a = t.pending;
    (a === null ? (e.next = e) : ((e.next = a.next), (a.next = e)), (t.pending = e));
  }
  function lm(t, e, a) {
    if ((a & 4194048) !== 0) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (a |= n), (e.lanes = a), Et(t, a));
    }
  }
  var Pi = {
    readContext: Ee,
    use: ms,
    useCallback: ne,
    useContext: ne,
    useEffect: ne,
    useImperativeHandle: ne,
    useLayoutEffect: ne,
    useInsertionEffect: ne,
    useMemo: ne,
    useReducer: ne,
    useRef: ne,
    useState: ne,
    useDebugValue: ne,
    useDeferredValue: ne,
    useTransition: ne,
    useSyncExternalStore: ne,
    useId: ne,
    useHostTransitionStatus: ne,
    useFormState: ne,
    useActionState: ne,
    useOptimistic: ne,
    useMemoCache: ne,
    useCacheRefresh: ne,
  };
  Pi.useEffectEvent = ne;
  var im = {
      readContext: Ee,
      use: ms,
      useCallback: function (t, e) {
        return (($e().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: Ee,
      useEffect: Vd,
      useImperativeHandle: function (t, e, a) {
        ((a = a != null ? a.concat([t]) : null), ps(4194308, 4, Xd.bind(null, e, t), a));
      },
      useLayoutEffect: function (t, e) {
        return ps(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        ps(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var a = $e();
        e = e === void 0 ? null : e;
        var n = t();
        if (ml) {
          be(!0);
          try {
            t();
          } finally {
            be(!1);
          }
        }
        return ((a.memoizedState = [n, e]), n);
      },
      useReducer: function (t, e, a) {
        var n = $e();
        if (a !== void 0) {
          var c = a(e);
          if (ml) {
            be(!0);
            try {
              a(e);
            } finally {
              be(!1);
            }
          }
        } else c = e;
        return (
          (n.memoizedState = n.baseState = c),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: c,
          }),
          (n.queue = t),
          (t = t.dispatch = Jp.bind(null, ut, t)),
          [n.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = $e();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = gr(t);
        var e = t.queue,
          a = am.bind(null, ut, e);
        return ((e.dispatch = a), [t.memoizedState, a]);
      },
      useDebugValue: br,
      useDeferredValue: function (t, e) {
        var a = $e();
        return Sr(a, t, e);
      },
      useTransition: function () {
        var t = gr(!1);
        return ((t = Fd.bind(null, ut, t.queue, !0, !1)), ($e().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, a) {
        var n = ut,
          c = $e();
        if (jt) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = e()), Gt === null)) throw Error(o(349));
          (bt & 127) !== 0 || Md(n, e, a);
        }
        c.memoizedState = a;
        var r = { value: a, getSnapshot: e };
        return (
          (c.queue = r),
          Vd(wd.bind(null, n, r, t), [t]),
          (n.flags |= 2048),
          ti(9, { destroy: void 0 }, Ed.bind(null, n, r, a, e), null),
          a
        );
      },
      useId: function () {
        var t = $e(),
          e = Gt.identifierPrefix;
        if (jt) {
          var a = za,
            n = Na;
          ((a = (n & ~(1 << (32 - Z(n) - 1))).toString(32) + a),
            (e = '_' + e + 'R_' + a),
            (a = fs++),
            0 < a && (e += 'H' + a.toString(32)),
            (e += '_'));
        } else ((a = Gp++), (e = '_' + e + 'r_' + a.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: jr,
      useFormState: $d,
      useActionState: $d,
      useOptimistic: function (t) {
        var e = $e();
        e.memoizedState = e.baseState = t;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = a), (e = Ar.bind(null, ut, !0, a)), (a.dispatch = e), [t, e]);
      },
      useMemoCache: hr,
      useCacheRefresh: function () {
        return ($e().memoizedState = Wp.bind(null, ut));
      },
      useEffectEvent: function (t) {
        var e = $e(),
          a = { impl: t };
        return (
          (e.memoizedState = a),
          function () {
            if ((Rt & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Tr = {
      readContext: Ee,
      use: ms,
      useCallback: Qd,
      useContext: Ee,
      useEffect: _r,
      useImperativeHandle: Kd,
      useInsertionEffect: Yd,
      useLayoutEffect: Zd,
      useMemo: Wd,
      useReducer: hs,
      useRef: qd,
      useState: function () {
        return hs(Qa);
      },
      useDebugValue: br,
      useDeferredValue: function (t, e) {
        var a = se();
        return Jd(a, Ut.memoizedState, t, e);
      },
      useTransition: function () {
        var t = hs(Qa)[0],
          e = se().memoizedState;
        return [typeof t == 'boolean' ? t : Fi(t), e];
      },
      useSyncExternalStore: Td,
      useId: tm,
      useHostTransitionStatus: jr,
      useFormState: Hd,
      useActionState: Hd,
      useOptimistic: function (t, e) {
        var a = se();
        return Cd(a, Ut, t, e);
      },
      useMemoCache: hr,
      useCacheRefresh: em,
    };
  Tr.useEffectEvent = Gd;
  var cm = {
    readContext: Ee,
    use: ms,
    useCallback: Qd,
    useContext: Ee,
    useEffect: _r,
    useImperativeHandle: Kd,
    useInsertionEffect: Yd,
    useLayoutEffect: Zd,
    useMemo: Wd,
    useReducer: yr,
    useRef: qd,
    useState: function () {
      return yr(Qa);
    },
    useDebugValue: br,
    useDeferredValue: function (t, e) {
      var a = se();
      return Ut === null ? Sr(a, t, e) : Jd(a, Ut.memoizedState, t, e);
    },
    useTransition: function () {
      var t = yr(Qa)[0],
        e = se().memoizedState;
      return [typeof t == 'boolean' ? t : Fi(t), e];
    },
    useSyncExternalStore: Td,
    useId: tm,
    useHostTransitionStatus: jr,
    useFormState: Ud,
    useActionState: Ud,
    useOptimistic: function (t, e) {
      var a = se();
      return Ut !== null ? Cd(a, Ut, t, e) : ((a.baseState = t), [t, a.queue.dispatch]);
    },
    useMemoCache: hr,
    useCacheRefresh: em,
  };
  cm.useEffectEvent = Gd;
  function Mr(t, e, a, n) {
    ((e = t.memoizedState),
      (a = a(n, e)),
      (a = a == null ? e : b({}, e, a)),
      (t.memoizedState = a),
      t.lanes === 0 && (t.updateQueue.baseState = a));
  }
  var Er = {
    enqueueSetState: function (t, e, a) {
      t = t._reactInternals;
      var n = Ie(),
        c = vn(n);
      ((c.payload = e),
        a != null && (c.callback = a),
        (e = _n(t, c, n)),
        e !== null && (Ze(e, t, n), Ki(e, t, n)));
    },
    enqueueReplaceState: function (t, e, a) {
      t = t._reactInternals;
      var n = Ie(),
        c = vn(n);
      ((c.tag = 1),
        (c.payload = e),
        a != null && (c.callback = a),
        (e = _n(t, c, n)),
        e !== null && (Ze(e, t, n), Ki(e, t, n)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var a = Ie(),
        n = vn(a);
      ((n.tag = 2),
        e != null && (n.callback = e),
        (e = _n(t, n, a)),
        e !== null && (Ze(e, t, a), Ki(e, t, a)));
    },
  };
  function sm(t, e, a, n, c, r, h) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(n, r, h)
        : e.prototype && e.prototype.isPureReactComponent
          ? !ki(a, n) || !ki(c, r)
          : !0
    );
  }
  function om(t, e, a, n) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(a, n),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(a, n),
      e.state !== t && Er.enqueueReplaceState(e, e.state, null));
  }
  function hl(t, e) {
    var a = e;
    if ('ref' in e) {
      a = {};
      for (var n in e) n !== 'ref' && (a[n] = e[n]);
    }
    if ((t = t.defaultProps)) {
      a === e && (a = b({}, a));
      for (var c in t) a[c] === void 0 && (a[c] = t[c]);
    }
    return a;
  }
  function rm(t) {
    Wc(t);
  }
  function um(t) {
    console.error(t);
  }
  function fm(t) {
    Wc(t);
  }
  function vs(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function dm(t, e, a) {
    try {
      var n = t.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (c) {
      setTimeout(function () {
        throw c;
      });
    }
  }
  function wr(t, e, a) {
    return (
      (a = vn(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        vs(t, e);
      }),
      a
    );
  }
  function mm(t) {
    return ((t = vn(t)), (t.tag = 3), t);
  }
  function hm(t, e, a, n) {
    var c = a.type.getDerivedStateFromError;
    if (typeof c == 'function') {
      var r = n.value;
      ((t.payload = function () {
        return c(r);
      }),
        (t.callback = function () {
          dm(e, a, n);
        }));
    }
    var h = a.stateNode;
    h !== null &&
      typeof h.componentDidCatch == 'function' &&
      (t.callback = function () {
        (dm(e, a, n),
          typeof c != 'function' && (Tn === null ? (Tn = new Set([this])) : Tn.add(this)));
        var v = n.stack;
        this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' });
      });
  }
  function Fp(t, e, a, n, c) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((e = a.alternate), e !== null && Xl(e, a, c, !0), (a = Qe.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              ua === null ? zs() : a.alternate === null && le === 0 && (le = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = c),
              n === is
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null ? (a.updateQueue = new Set([n])) : e.add(n),
                  Pr(t, n, c)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === is
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = e))
                    : ((a = e.retryQueue), a === null ? (e.retryQueue = new Set([n])) : a.add(n)),
                  Pr(t, n, c)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (Pr(t, n, c), zs(), !1);
    }
    if (jt)
      return (
        (e = Qe.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = c),
            n !== Ko && ((t = Error(o(422), { cause: n })), Vi(ca(t, a))))
          : (n !== Ko && ((e = Error(o(423), { cause: n })), Vi(ca(e, a))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (c &= -c),
            (t.lanes |= c),
            (n = ca(n, a)),
            (c = wr(t.stateNode, n, c)),
            lr(t, c),
            le !== 4 && (le = 2)),
        !1
      );
    var r = Error(o(520), { cause: n });
    if (((r = ca(r, a)), sc === null ? (sc = [r]) : sc.push(r), le !== 4 && (le = 2), e === null))
      return !0;
    ((n = ca(n, a)), (a = e));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (t = c & -c),
            (a.lanes |= t),
            (t = wr(a.stateNode, n, t)),
            lr(a, t),
            !1
          );
        case 1:
          if (
            ((e = a.type),
            (r = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == 'function' ||
                (r !== null &&
                  typeof r.componentDidCatch == 'function' &&
                  (Tn === null || !Tn.has(r)))))
          )
            return (
              (a.flags |= 65536),
              (c &= -c),
              (a.lanes |= c),
              (c = mm(c)),
              hm(c, t, a, n),
              lr(a, c),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Nr = Error(o(461)),
    de = !1;
  function we(t, e, a, n) {
    e.child = t === null ? vd(e, null, a, n) : dl(e, t.child, a, n);
  }
  function pm(t, e, a, n, c) {
    a = a.render;
    var r = e.ref;
    if ('ref' in n) {
      var h = {};
      for (var v in n) v !== 'ref' && (h[v] = n[v]);
    } else h = n;
    return (
      ol(e),
      (n = ur(t, e, a, h, r, c)),
      (v = fr()),
      t !== null && !de
        ? (dr(t, e, c), Wa(t, e, c))
        : (jt && v && Zo(e), (e.flags |= 1), we(t, e, n, c), e.child)
    );
  }
  function ym(t, e, a, n, c) {
    if (t === null) {
      var r = a.type;
      return typeof r == 'function' && !Vo(r) && r.defaultProps === void 0 && a.compare === null
        ? ((e.tag = 15), (e.type = r), gm(t, e, r, n, c))
        : ((t = Pc(a.type, null, n, e, e.mode, c)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((r = t.child), !$r(t, c))) {
      var h = r.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : ki), a(h, n) && t.ref === e.ref))
        return Wa(t, e, c);
    }
    return ((e.flags |= 1), (t = Ga(r, n)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function gm(t, e, a, n, c) {
    if (t !== null) {
      var r = t.memoizedProps;
      if (ki(r, n) && t.ref === e.ref)
        if (((de = !1), (e.pendingProps = n = r), $r(t, c))) (t.flags & 131072) !== 0 && (de = !0);
        else return ((e.lanes = t.lanes), Wa(t, e, c));
    }
    return zr(t, e, a, n, c);
  }
  function vm(t, e, a, n) {
    var c = n.children,
      r = t !== null ? t.memoizedState : null;
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
        if (((r = r !== null ? r.baseLanes | a : a), t !== null)) {
          for (n = e.child = t.child, c = 0; n !== null; )
            ((c = c | n.lanes | n.childLanes), (n = n.sibling));
          n = c & ~r;
        } else ((n = 0), (e.child = null));
        return _m(t, e, r, a, n);
      }
      if ((a & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && ns(e, r !== null ? r.cachePool : null),
          r !== null ? Sd(e, r) : cr(),
          xd(e));
      else return ((n = e.lanes = 536870912), _m(t, e, r !== null ? r.baseLanes | a : a, a, n));
    } else
      r !== null
        ? (ns(e, r.cachePool), Sd(e, r), Sn(), (e.memoizedState = null))
        : (t !== null && ns(e, null), cr(), Sn());
    return (we(t, e, c, a), e.child);
  }
  function tc(t, e) {
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
  function _m(t, e, a, n, c) {
    var r = tr();
    return (
      (r = r === null ? null : { parent: ue._currentValue, pool: r }),
      (e.memoizedState = { baseLanes: a, cachePool: r }),
      t !== null && ns(e, null),
      cr(),
      xd(e),
      t !== null && Xl(t, e, n, !0),
      (e.childLanes = c),
      null
    );
  }
  function _s(t, e) {
    return (
      (e = Ss({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function bm(t, e, a) {
    return (
      dl(e, t.child, null, a),
      (t = _s(e, e.pendingProps)),
      (t.flags |= 2),
      We(e),
      (e.memoizedState = null),
      t
    );
  }
  function Ip(t, e, a) {
    var n = e.pendingProps,
      c = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (jt) {
        if (n.mode === 'hidden') return ((t = _s(e, n)), (e.lanes = 536870912), tc(null, t));
        if (
          (or(e),
          (t = Wt)
            ? ((t = R0(t, ra)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: mn !== null ? { id: Na, overflow: za } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = nd(t)),
                (a.return = e),
                (e.child = a),
                (Me = e),
                (Wt = null)))
            : (t = null),
          t === null)
        )
          throw pn(e);
        return ((e.lanes = 536870912), null);
      }
      return _s(e, n);
    }
    var r = t.memoizedState;
    if (r !== null) {
      var h = r.dehydrated;
      if ((or(e), c))
        if (e.flags & 256) ((e.flags &= -257), (e = bm(t, e, a)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(o(558));
      else if ((de || Xl(t, e, a, !1), (c = (a & t.childLanes) !== 0), de || c)) {
        if (((n = Gt), n !== null && ((h = Qt(n, a)), h !== 0 && h !== r.retryLane)))
          throw ((r.retryLane = h), ll(t, h), Ze(n, t, h), Nr);
        (zs(), (e = bm(t, e, a)));
      } else
        ((t = r.treeContext),
          (Wt = fa(h.nextSibling)),
          (Me = e),
          (jt = !0),
          (hn = null),
          (ra = !1),
          t !== null && cd(e, t),
          (e = _s(e, n)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = Ga(t.child, { mode: n.mode, children: n.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function bs(t, e) {
    var a = e.ref;
    if (a === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (t === null || t.ref !== a) && (e.flags |= 4194816);
    }
  }
  function zr(t, e, a, n, c) {
    return (
      ol(e),
      (a = ur(t, e, a, n, void 0, c)),
      (n = fr()),
      t !== null && !de
        ? (dr(t, e, c), Wa(t, e, c))
        : (jt && n && Zo(e), (e.flags |= 1), we(t, e, a, c), e.child)
    );
  }
  function Sm(t, e, a, n, c, r) {
    return (
      ol(e),
      (e.updateQueue = null),
      (a = Ad(e, n, a, c)),
      jd(t),
      (n = fr()),
      t !== null && !de
        ? (dr(t, e, r), Wa(t, e, r))
        : (jt && n && Zo(e), (e.flags |= 1), we(t, e, a, r), e.child)
    );
  }
  function xm(t, e, a, n, c) {
    if ((ol(e), e.stateNode === null)) {
      var r = Vl,
        h = a.contextType;
      (typeof h == 'object' && h !== null && (r = Ee(h)),
        (r = new a(n, r)),
        (e.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null),
        (r.updater = Er),
        (e.stateNode = r),
        (r._reactInternals = e),
        (r = e.stateNode),
        (r.props = n),
        (r.state = e.memoizedState),
        (r.refs = {}),
        ar(e),
        (h = a.contextType),
        (r.context = typeof h == 'object' && h !== null ? Ee(h) : Vl),
        (r.state = e.memoizedState),
        (h = a.getDerivedStateFromProps),
        typeof h == 'function' && (Mr(e, a, h, n), (r.state = e.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof r.getSnapshotBeforeUpdate == 'function' ||
          (typeof r.UNSAFE_componentWillMount != 'function' &&
            typeof r.componentWillMount != 'function') ||
          ((h = r.state),
          typeof r.componentWillMount == 'function' && r.componentWillMount(),
          typeof r.UNSAFE_componentWillMount == 'function' && r.UNSAFE_componentWillMount(),
          h !== r.state && Er.enqueueReplaceState(r, r.state, null),
          Wi(e, n, r, c),
          Qi(),
          (r.state = e.memoizedState)),
        typeof r.componentDidMount == 'function' && (e.flags |= 4194308),
        (n = !0));
    } else if (t === null) {
      r = e.stateNode;
      var v = e.memoizedProps,
        S = hl(a, v);
      r.props = S;
      var N = r.context,
        B = a.contextType;
      ((h = Vl), typeof B == 'object' && B !== null && (h = Ee(B)));
      var k = a.getDerivedStateFromProps;
      ((B = typeof k == 'function' || typeof r.getSnapshotBeforeUpdate == 'function'),
        (v = e.pendingProps !== v),
        B ||
          (typeof r.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof r.componentWillReceiveProps != 'function') ||
          ((v || N !== h) && om(e, r, n, h)),
        (gn = !1));
      var z = e.memoizedState;
      ((r.state = z),
        Wi(e, n, r, c),
        Qi(),
        (N = e.memoizedState),
        v || z !== N || gn
          ? (typeof k == 'function' && (Mr(e, a, k, n), (N = e.memoizedState)),
            (S = gn || sm(e, a, S, n, z, N, h))
              ? (B ||
                  (typeof r.UNSAFE_componentWillMount != 'function' &&
                    typeof r.componentWillMount != 'function') ||
                  (typeof r.componentWillMount == 'function' && r.componentWillMount(),
                  typeof r.UNSAFE_componentWillMount == 'function' &&
                    r.UNSAFE_componentWillMount()),
                typeof r.componentDidMount == 'function' && (e.flags |= 4194308))
              : (typeof r.componentDidMount == 'function' && (e.flags |= 4194308),
                (e.memoizedProps = n),
                (e.memoizedState = N)),
            (r.props = n),
            (r.state = N),
            (r.context = h),
            (n = S))
          : (typeof r.componentDidMount == 'function' && (e.flags |= 4194308), (n = !1)));
    } else {
      ((r = e.stateNode),
        nr(t, e),
        (h = e.memoizedProps),
        (B = hl(a, h)),
        (r.props = B),
        (k = e.pendingProps),
        (z = r.context),
        (N = a.contextType),
        (S = Vl),
        typeof N == 'object' && N !== null && (S = Ee(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof r.getSnapshotBeforeUpdate == 'function') ||
          (typeof r.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof r.componentWillReceiveProps != 'function') ||
          ((h !== k || z !== S) && om(e, r, n, S)),
        (gn = !1),
        (z = e.memoizedState),
        (r.state = z),
        Wi(e, n, r, c),
        Qi());
      var C = e.memoizedState;
      h !== k || z !== C || gn || (t !== null && t.dependencies !== null && es(t.dependencies))
        ? (typeof v == 'function' && (Mr(e, a, v, n), (C = e.memoizedState)),
          (B =
            gn ||
            sm(e, a, B, n, z, C, S) ||
            (t !== null && t.dependencies !== null && es(t.dependencies)))
            ? (N ||
                (typeof r.UNSAFE_componentWillUpdate != 'function' &&
                  typeof r.componentWillUpdate != 'function') ||
                (typeof r.componentWillUpdate == 'function' && r.componentWillUpdate(n, C, S),
                typeof r.UNSAFE_componentWillUpdate == 'function' &&
                  r.UNSAFE_componentWillUpdate(n, C, S)),
              typeof r.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof r.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
            : (typeof r.componentDidUpdate != 'function' ||
                (h === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 4),
              typeof r.getSnapshotBeforeUpdate != 'function' ||
                (h === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = n),
              (e.memoizedState = C)),
          (r.props = n),
          (r.state = C),
          (r.context = S),
          (n = B))
        : (typeof r.componentDidUpdate != 'function' ||
            (h === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 4),
          typeof r.getSnapshotBeforeUpdate != 'function' ||
            (h === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 1024),
          (n = !1));
    }
    return (
      (r = n),
      bs(t, e),
      (n = (e.flags & 128) !== 0),
      r || n
        ? ((r = e.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : r.render()),
          (e.flags |= 1),
          t !== null && n
            ? ((e.child = dl(e, t.child, null, c)), (e.child = dl(e, null, a, c)))
            : we(t, e, a, c),
          (e.memoizedState = r.state),
          (t = e.child))
        : (t = Wa(t, e, c)),
      t
    );
  }
  function jm(t, e, a, n) {
    return (cl(), (e.flags |= 256), we(t, e, a, n), e.child);
  }
  var Cr = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Rr(t) {
    return { baseLanes: t, cachePool: dd() };
  }
  function Or(t, e, a) {
    return ((t = t !== null ? t.childLanes & ~a : 0), e && (t |= Fe), t);
  }
  function Am(t, e, a) {
    var n = e.pendingProps,
      c = !1,
      r = (e.flags & 128) !== 0,
      h;
    if (
      ((h = r) || (h = t !== null && t.memoizedState === null ? !1 : (ce.current & 2) !== 0),
      h && ((c = !0), (e.flags &= -129)),
      (h = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (jt) {
        if (
          (c ? bn(e) : Sn(),
          (t = Wt)
            ? ((t = R0(t, ra)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: mn !== null ? { id: Na, overflow: za } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = nd(t)),
                (a.return = e),
                (e.child = a),
                (Me = e),
                (Wt = null)))
            : (t = null),
          t === null)
        )
          throw pn(e);
        return (pu(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var v = n.children;
      return (
        (n = n.fallback),
        c
          ? (Sn(),
            (c = e.mode),
            (v = Ss({ mode: 'hidden', children: v }, c)),
            (n = il(n, c, a, null)),
            (v.return = e),
            (n.return = e),
            (v.sibling = n),
            (e.child = v),
            (n = e.child),
            (n.memoizedState = Rr(a)),
            (n.childLanes = Or(t, h, a)),
            (e.memoizedState = Cr),
            tc(null, n))
          : (bn(e), Dr(e, v))
      );
    }
    var S = t.memoizedState;
    if (S !== null && ((v = S.dehydrated), v !== null)) {
      if (r)
        e.flags & 256
          ? (bn(e), (e.flags &= -257), (e = Br(t, e, a)))
          : e.memoizedState !== null
            ? (Sn(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (Sn(),
              (v = n.fallback),
              (c = e.mode),
              (n = Ss({ mode: 'visible', children: n.children }, c)),
              (v = il(v, c, a, null)),
              (v.flags |= 2),
              (n.return = e),
              (v.return = e),
              (n.sibling = v),
              (e.child = n),
              dl(e, t.child, null, a),
              (n = e.child),
              (n.memoizedState = Rr(a)),
              (n.childLanes = Or(t, h, a)),
              (e.memoizedState = Cr),
              (e = tc(null, n)));
      else if ((bn(e), pu(v))) {
        if (((h = v.nextSibling && v.nextSibling.dataset), h)) var N = h.dgst;
        ((h = N),
          (n = Error(o(419))),
          (n.stack = ''),
          (n.digest = h),
          Vi({ value: n, source: null, stack: null }),
          (e = Br(t, e, a)));
      } else if ((de || Xl(t, e, a, !1), (h = (a & t.childLanes) !== 0), de || h)) {
        if (((h = Gt), h !== null && ((n = Qt(h, a)), n !== 0 && n !== S.retryLane)))
          throw ((S.retryLane = n), ll(t, n), Ze(h, t, n), Nr);
        (hu(v) || zs(), (e = Br(t, e, a)));
      } else
        hu(v)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = S.treeContext),
            (Wt = fa(v.nextSibling)),
            (Me = e),
            (jt = !0),
            (hn = null),
            (ra = !1),
            t !== null && cd(e, t),
            (e = Dr(e, n.children)),
            (e.flags |= 4096));
      return e;
    }
    return c
      ? (Sn(),
        (v = n.fallback),
        (c = e.mode),
        (S = t.child),
        (N = S.sibling),
        (n = Ga(S, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = S.subtreeFlags & 65011712),
        N !== null ? (v = Ga(N, v)) : ((v = il(v, c, a, null)), (v.flags |= 2)),
        (v.return = e),
        (n.return = e),
        (n.sibling = v),
        (e.child = n),
        tc(null, n),
        (n = e.child),
        (v = t.child.memoizedState),
        v === null
          ? (v = Rr(a))
          : ((c = v.cachePool),
            c !== null
              ? ((S = ue._currentValue), (c = c.parent !== S ? { parent: S, pool: S } : c))
              : (c = dd()),
            (v = { baseLanes: v.baseLanes | a, cachePool: c })),
        (n.memoizedState = v),
        (n.childLanes = Or(t, h, a)),
        (e.memoizedState = Cr),
        tc(t.child, n))
      : (bn(e),
        (a = t.child),
        (t = a.sibling),
        (a = Ga(a, { mode: 'visible', children: n.children })),
        (a.return = e),
        (a.sibling = null),
        t !== null &&
          ((h = e.deletions), h === null ? ((e.deletions = [t]), (e.flags |= 16)) : h.push(t)),
        (e.child = a),
        (e.memoizedState = null),
        a);
  }
  function Dr(t, e) {
    return ((e = Ss({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function Ss(t, e) {
    return ((t = Ke(22, t, null, e)), (t.lanes = 0), t);
  }
  function Br(t, e, a) {
    return (
      dl(e, t.child, null, a),
      (t = Dr(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function Tm(t, e, a) {
    t.lanes |= e;
    var n = t.alternate;
    (n !== null && (n.lanes |= e), Jo(t.return, e, a));
  }
  function Lr(t, e, a, n, c, r) {
    var h = t.memoizedState;
    h === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: c,
          treeForkCount: r,
        })
      : ((h.isBackwards = e),
        (h.rendering = null),
        (h.renderingStartTime = 0),
        (h.last = n),
        (h.tail = a),
        (h.tailMode = c),
        (h.treeForkCount = r));
  }
  function Mm(t, e, a) {
    var n = e.pendingProps,
      c = n.revealOrder,
      r = n.tail;
    n = n.children;
    var h = ce.current,
      v = (h & 2) !== 0;
    if (
      (v ? ((h = (h & 1) | 2), (e.flags |= 128)) : (h &= 1),
      Q(ce, h),
      we(t, e, n, a),
      (n = jt ? qi : 0),
      !v && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Tm(t, a, e);
        else if (t.tag === 19) Tm(t, a, e);
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
    switch (c) {
      case 'forwards':
        for (a = e.child, c = null; a !== null; )
          ((t = a.alternate), t !== null && rs(t) === null && (c = a), (a = a.sibling));
        ((a = c),
          a === null ? ((c = e.child), (e.child = null)) : ((c = a.sibling), (a.sibling = null)),
          Lr(e, !1, c, a, r, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, c = e.child, e.child = null; c !== null; ) {
          if (((t = c.alternate), t !== null && rs(t) === null)) {
            e.child = c;
            break;
          }
          ((t = c.sibling), (c.sibling = a), (a = c), (c = t));
        }
        Lr(e, !0, a, null, r, n);
        break;
      case 'together':
        Lr(e, !1, null, null, void 0, n);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Wa(t, e, a) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (An |= e.lanes), (a & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Xl(t, e, a, !1), (a & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(o(153));
    if (e.child !== null) {
      for (t = e.child, a = Ga(t, t.pendingProps), e.child = a, a.return = e; t.sibling !== null; )
        ((t = t.sibling), (a = a.sibling = Ga(t, t.pendingProps)), (a.return = e));
      a.sibling = null;
    }
    return e.child;
  }
  function $r(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && es(t)));
  }
  function Pp(t, e, a) {
    switch (e.tag) {
      case 3:
        (pe(e, e.stateNode.containerInfo), yn(e, ue, t.memoizedState.cache), cl());
        break;
      case 27:
      case 5:
        Da(e);
        break;
      case 4:
        pe(e, e.stateNode.containerInfo);
        break;
      case 10:
        yn(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), or(e), null);
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (bn(e), (e.flags |= 128), null)
            : (a & e.child.childLanes) !== 0
              ? Am(t, e, a)
              : (bn(e), (t = Wa(t, e, a)), t !== null ? t.sibling : null);
        bn(e);
        break;
      case 19:
        var c = (t.flags & 128) !== 0;
        if (
          ((n = (a & e.childLanes) !== 0),
          n || (Xl(t, e, a, !1), (n = (a & e.childLanes) !== 0)),
          c)
        ) {
          if (n) return Mm(t, e, a);
          e.flags |= 128;
        }
        if (
          ((c = e.memoizedState),
          c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
          Q(ce, ce.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), vm(t, e, a, e.pendingProps));
      case 24:
        yn(e, ue, t.memoizedState.cache);
    }
    return Wa(t, e, a);
  }
  function Em(t, e, a) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) de = !0;
      else {
        if (!$r(t, a) && (e.flags & 128) === 0) return ((de = !1), Pp(t, e, a));
        de = (t.flags & 131072) !== 0;
      }
    else ((de = !1), jt && (e.flags & 1048576) !== 0 && id(e, qi, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (((t = ul(e.elementType)), (e.type = t), typeof t == 'function'))
            Vo(t)
              ? ((n = hl(t, n)), (e.tag = 1), (e = xm(null, e, t, n, a)))
              : ((e.tag = 0), (e = zr(null, e, t, n, a)));
          else {
            if (t != null) {
              var c = t.$$typeof;
              if (c === U) {
                ((e.tag = 11), (e = pm(null, e, t, n, a)));
                break t;
              } else if (c === at) {
                ((e.tag = 14), (e = ym(null, e, t, n, a)));
                break t;
              }
            }
            throw ((e = ke(t) || t), Error(o(306, e, '')));
          }
        }
        return e;
      case 0:
        return zr(t, e, e.type, e.pendingProps, a);
      case 1:
        return ((n = e.type), (c = hl(n, e.pendingProps)), xm(t, e, n, c, a));
      case 3:
        t: {
          if ((pe(e, e.stateNode.containerInfo), t === null)) throw Error(o(387));
          n = e.pendingProps;
          var r = e.memoizedState;
          ((c = r.element), nr(t, e), Wi(e, n, null, a));
          var h = e.memoizedState;
          if (
            ((n = h.cache),
            yn(e, ue, n),
            n !== r.cache && Fo(e, [ue], a, !0),
            Qi(),
            (n = h.element),
            r.isDehydrated)
          )
            if (
              ((r = { element: n, isDehydrated: !1, cache: h.cache }),
              (e.updateQueue.baseState = r),
              (e.memoizedState = r),
              e.flags & 256)
            ) {
              e = jm(t, e, n, a);
              break t;
            } else if (n !== c) {
              ((c = ca(Error(o(424)), e)), Vi(c), (e = jm(t, e, n, a)));
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
                Wt = fa(t.firstChild),
                  Me = e,
                  jt = !0,
                  hn = null,
                  ra = !0,
                  a = vd(e, null, n, a),
                  e.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((cl(), n === c)) {
              e = Wa(t, e, a);
              break t;
            }
            we(t, e, n, a);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          bs(t, e),
          t === null
            ? (a = H0(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = a)
              : jt ||
                ((a = e.type),
                (t = e.pendingProps),
                (n = $s(ft.current).createElement(a)),
                (n[ee] = e),
                (n[Te] = t),
                Ne(n, a, t),
                Se(n),
                (e.stateNode = n))
            : (e.memoizedState = H0(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          Da(e),
          t === null &&
            jt &&
            ((n = e.stateNode = B0(e.type, e.pendingProps, ft.current)),
            (Me = e),
            (ra = !0),
            (c = Wt),
            Nn(e.type) ? ((yu = c), (Wt = fa(n.firstChild))) : (Wt = c)),
          we(t, e, e.pendingProps.children, a),
          bs(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            jt &&
            ((c = n = Wt) &&
              ((n = Ny(n, e.type, e.pendingProps, ra)),
              n !== null
                ? ((e.stateNode = n), (Me = e), (Wt = fa(n.firstChild)), (ra = !1), (c = !0))
                : (c = !1)),
            c || pn(e)),
          Da(e),
          (c = e.type),
          (r = e.pendingProps),
          (h = t !== null ? t.memoizedProps : null),
          (n = r.children),
          fu(c, r) ? (n = null) : h !== null && fu(c, h) && (e.flags |= 32),
          e.memoizedState !== null && ((c = ur(t, e, Yp, null, null, a)), (pc._currentValue = c)),
          bs(t, e),
          we(t, e, n, a),
          e.child
        );
      case 6:
        return (
          t === null &&
            jt &&
            ((t = a = Wt) &&
              ((a = zy(a, e.pendingProps, ra)),
              a !== null ? ((e.stateNode = a), (Me = e), (Wt = null), (t = !0)) : (t = !1)),
            t || pn(e)),
          null
        );
      case 13:
        return Am(t, e, a);
      case 4:
        return (
          pe(e, e.stateNode.containerInfo),
          (n = e.pendingProps),
          t === null ? (e.child = dl(e, null, n, a)) : we(t, e, n, a),
          e.child
        );
      case 11:
        return pm(t, e, e.type, e.pendingProps, a);
      case 7:
        return (we(t, e, e.pendingProps, a), e.child);
      case 8:
        return (we(t, e, e.pendingProps.children, a), e.child);
      case 12:
        return (we(t, e, e.pendingProps.children, a), e.child);
      case 10:
        return ((n = e.pendingProps), yn(e, e.type, n.value), we(t, e, n.children, a), e.child);
      case 9:
        return (
          (c = e.type._context),
          (n = e.pendingProps.children),
          ol(e),
          (c = Ee(c)),
          (n = n(c)),
          (e.flags |= 1),
          we(t, e, n, a),
          e.child
        );
      case 14:
        return ym(t, e, e.type, e.pendingProps, a);
      case 15:
        return gm(t, e, e.type, e.pendingProps, a);
      case 19:
        return Mm(t, e, a);
      case 31:
        return Ip(t, e, a);
      case 22:
        return vm(t, e, a, e.pendingProps);
      case 24:
        return (
          ol(e),
          (n = Ee(ue)),
          t === null
            ? ((c = tr()),
              c === null &&
                ((c = Gt),
                (r = Io()),
                (c.pooledCache = r),
                r.refCount++,
                r !== null && (c.pooledCacheLanes |= a),
                (c = r)),
              (e.memoizedState = { parent: n, cache: c }),
              ar(e),
              yn(e, ue, c))
            : ((t.lanes & a) !== 0 && (nr(t, e), Wi(e, null, null, a), Qi()),
              (c = t.memoizedState),
              (r = e.memoizedState),
              c.parent !== n
                ? ((c = { parent: n, cache: n }),
                  (e.memoizedState = c),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = c),
                  yn(e, ue, n))
                : ((n = r.cache), yn(e, ue, n), n !== c.cache && Fo(e, [ue], a, !0))),
          we(t, e, e.pendingProps.children, a),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function Ja(t) {
    t.flags |= 4;
  }
  function Hr(t, e, a, n, c) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (c & 335544128) === c))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (t0()) t.flags |= 8192;
        else throw ((fl = is), er);
    } else t.flags &= -16777217;
  }
  function wm(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !G0(e)))
      if (t0()) t.flags |= 8192;
      else throw ((fl = is), er);
  }
  function xs(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? Ni() : 536870912), (t.lanes |= e), (li |= e)));
  }
  function ec(t, e) {
    if (!jt)
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
  function Jt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      a = 0,
      n = 0;
    if (e)
      for (var c = t.child; c !== null; )
        ((a |= c.lanes | c.childLanes),
          (n |= c.subtreeFlags & 65011712),
          (n |= c.flags & 65011712),
          (c.return = t),
          (c = c.sibling));
    else
      for (c = t.child; c !== null; )
        ((a |= c.lanes | c.childLanes),
          (n |= c.subtreeFlags),
          (n |= c.flags),
          (c.return = t),
          (c = c.sibling));
    return ((t.subtreeFlags |= n), (t.childLanes = a), e);
  }
  function ty(t, e, a) {
    var n = e.pendingProps;
    switch ((Xo(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Jt(e), null);
      case 1:
        return (Jt(e), null);
      case 3:
        return (
          (a = e.stateNode),
          (n = null),
          t !== null && (n = t.memoizedState.cache),
          e.memoizedState.cache !== n && (e.flags |= 2048),
          Xa(ue),
          Xt(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (Zl(e)
              ? Ja(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Qo())),
          Jt(e),
          null
        );
      case 26:
        var c = e.type,
          r = e.memoizedState;
        return (
          t === null
            ? (Ja(e), r !== null ? (Jt(e), wm(e, r)) : (Jt(e), Hr(e, c, null, n, a)))
            : r
              ? r !== t.memoizedState
                ? (Ja(e), Jt(e), wm(e, r))
                : (Jt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== n && Ja(e), Jt(e), Hr(e, c, t, n, a)),
          null
        );
      case 27:
        if ((Ma(e), (a = ft.current), (c = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && Ja(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(o(166));
            return (Jt(e), null);
          }
          ((t = J.current), Zl(e) ? sd(e) : ((t = B0(c, n, a)), (e.stateNode = t), Ja(e)));
        }
        return (Jt(e), null);
      case 5:
        if ((Ma(e), (c = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && Ja(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(o(166));
            return (Jt(e), null);
          }
          if (((r = J.current), Zl(e))) sd(e);
          else {
            var h = $s(ft.current);
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
            ((r[ee] = e), (r[Te] = n));
            t: for (h = e.child; h !== null; ) {
              if (h.tag === 5 || h.tag === 6) r.appendChild(h.stateNode);
              else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                ((h.child.return = h), (h = h.child));
                continue;
              }
              if (h === e) break t;
              for (; h.sibling === null; ) {
                if (h.return === null || h.return === e) break t;
                h = h.return;
              }
              ((h.sibling.return = h.return), (h = h.sibling));
            }
            e.stateNode = r;
            t: switch ((Ne(r, c, n), c)) {
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
            n && Ja(e);
          }
        }
        return (Jt(e), Hr(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, a), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== n && Ja(e);
        else {
          if (typeof n != 'string' && e.stateNode === null) throw Error(o(166));
          if (((t = ft.current), Zl(e))) {
            if (((t = e.stateNode), (a = e.memoizedProps), (n = null), (c = Me), c !== null))
              switch (c.tag) {
                case 27:
                case 5:
                  n = c.memoizedProps;
              }
            ((t[ee] = e),
              (t = !!(
                t.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                A0(t.nodeValue, a)
              )),
              t || pn(e, !0));
          } else ((t = $s(t).createTextNode(n)), (t[ee] = e), (e.stateNode = t));
        }
        return (Jt(e), null);
      case 31:
        if (((a = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((n = Zl(e)), a !== null)) {
            if (t === null) {
              if (!n) throw Error(o(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(o(557));
              t[ee] = e;
            } else (cl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (Jt(e), (t = !1));
          } else
            ((a = Qo()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a),
              (t = !0));
          if (!t) return e.flags & 256 ? (We(e), e) : (We(e), null);
          if ((e.flags & 128) !== 0) throw Error(o(558));
        }
        return (Jt(e), null);
      case 13:
        if (
          ((n = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((c = Zl(e)), n !== null && n.dehydrated !== null)) {
            if (t === null) {
              if (!c) throw Error(o(318));
              if (((c = e.memoizedState), (c = c !== null ? c.dehydrated : null), !c))
                throw Error(o(317));
              c[ee] = e;
            } else (cl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (Jt(e), (c = !1));
          } else
            ((c = Qo()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c),
              (c = !0));
          if (!c) return e.flags & 256 ? (We(e), e) : (We(e), null);
        }
        return (
          We(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = a), e)
            : ((a = n !== null),
              (t = t !== null && t.memoizedState !== null),
              a &&
                ((n = e.child),
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
              a !== t && a && (e.child.flags |= 8192),
              xs(e, e.updateQueue),
              Jt(e),
              null)
        );
      case 4:
        return (Xt(), t === null && cu(e.stateNode.containerInfo), Jt(e), null);
      case 10:
        return (Xa(e.type), Jt(e), null);
      case 19:
        if ((H(ce), (n = e.memoizedState), n === null)) return (Jt(e), null);
        if (((c = (e.flags & 128) !== 0), (r = n.rendering), r === null))
          if (c) ec(n, !1);
          else {
            if (le !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((r = rs(t)), r !== null)) {
                  for (
                    e.flags |= 128,
                      ec(n, !1),
                      t = r.updateQueue,
                      e.updateQueue = t,
                      xs(e, t),
                      e.subtreeFlags = 0,
                      t = a,
                      a = e.child;
                    a !== null;
                  )
                    (ad(a, t), (a = a.sibling));
                  return (Q(ce, (ce.current & 1) | 2), jt && Ya(e, n.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            n.tail !== null &&
              Bt() > Es &&
              ((e.flags |= 128), (c = !0), ec(n, !1), (e.lanes = 4194304));
          }
        else {
          if (!c)
            if (((t = rs(r)), t !== null)) {
              if (
                ((e.flags |= 128),
                (c = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                xs(e, t),
                ec(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !r.alternate && !jt)
              )
                return (Jt(e), null);
            } else
              2 * Bt() - n.renderingStartTime > Es &&
                a !== 536870912 &&
                ((e.flags |= 128), (c = !0), ec(n, !1), (e.lanes = 4194304));
          n.isBackwards
            ? ((r.sibling = e.child), (e.child = r))
            : ((t = n.last), t !== null ? (t.sibling = r) : (e.child = r), (n.last = r));
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = Bt()),
            (t.sibling = null),
            (a = ce.current),
            Q(ce, c ? (a & 1) | 2 : a & 1),
            jt && Ya(e, n.treeForkCount),
            t)
          : (Jt(e), null);
      case 22:
      case 23:
        return (
          We(e),
          sr(),
          (n = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== n && (e.flags |= 8192)
            : n && (e.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Jt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Jt(e),
          (a = e.updateQueue),
          a !== null && xs(e, a.retryQueue),
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
          t !== null && H(rl),
          null
        );
      case 24:
        return (
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          Xa(ue),
          Jt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function ey(t, e) {
    switch ((Xo(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          Xa(ue),
          Xt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (Ma(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((We(e), e.alternate === null)) throw Error(o(340));
          cl();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((We(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(o(340));
          cl();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (H(ce), null);
      case 4:
        return (Xt(), null);
      case 10:
        return (Xa(e.type), null);
      case 22:
      case 23:
        return (
          We(e),
          sr(),
          t !== null && H(rl),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (Xa(ue), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Nm(t, e) {
    switch ((Xo(e), e.tag)) {
      case 3:
        (Xa(ue), Xt());
        break;
      case 26:
      case 27:
      case 5:
        Ma(e);
        break;
      case 4:
        Xt();
        break;
      case 31:
        e.memoizedState !== null && We(e);
        break;
      case 13:
        We(e);
        break;
      case 19:
        H(ce);
        break;
      case 10:
        Xa(e.type);
        break;
      case 22:
      case 23:
        (We(e), sr(), t !== null && H(rl));
        break;
      case 24:
        Xa(ue);
    }
  }
  function ac(t, e) {
    try {
      var a = e.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var c = n.next;
        a = c;
        do {
          if ((a.tag & t) === t) {
            n = void 0;
            var r = a.create,
              h = a.inst;
            ((n = r()), (h.destroy = n));
          }
          a = a.next;
        } while (a !== c);
      }
    } catch (v) {
      $t(e, e.return, v);
    }
  }
  function xn(t, e, a) {
    try {
      var n = e.updateQueue,
        c = n !== null ? n.lastEffect : null;
      if (c !== null) {
        var r = c.next;
        n = r;
        do {
          if ((n.tag & t) === t) {
            var h = n.inst,
              v = h.destroy;
            if (v !== void 0) {
              ((h.destroy = void 0), (c = e));
              var S = a,
                N = v;
              try {
                N();
              } catch (B) {
                $t(c, S, B);
              }
            }
          }
          n = n.next;
        } while (n !== r);
      }
    } catch (B) {
      $t(e, e.return, B);
    }
  }
  function zm(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        bd(e, a);
      } catch (n) {
        $t(t, t.return, n);
      }
    }
  }
  function Cm(t, e, a) {
    ((a.props = hl(t.type, t.memoizedProps)), (a.state = t.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      $t(t, e, n);
    }
  }
  function nc(t, e) {
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
    } catch (c) {
      $t(t, e, c);
    }
  }
  function Ca(t, e) {
    var a = t.ref,
      n = t.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (c) {
          $t(t, e, c);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (c) {
          $t(t, e, c);
        }
      else a.current = null;
  }
  function Rm(t) {
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
    } catch (c) {
      $t(t, t.return, c);
    }
  }
  function kr(t, e, a) {
    try {
      var n = t.stateNode;
      (jy(n, t.type, a, e), (n[Te] = e));
    } catch (c) {
      $t(t, t.return, c);
    }
  }
  function Om(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Nn(t.type)) || t.tag === 4
    );
  }
  function Ur(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Om(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && Nn(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function qr(t, e, a) {
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
            a != null || e.onclick !== null || (e.onclick = qa)));
    else if (
      n !== 4 &&
      (n === 27 && Nn(t.type) && ((a = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (qr(t, e, a), t = t.sibling; t !== null; ) (qr(t, e, a), (t = t.sibling));
  }
  function js(t, e, a) {
    var n = t.tag;
    if (n === 5 || n === 6) ((t = t.stateNode), e ? a.insertBefore(t, e) : a.appendChild(t));
    else if (n !== 4 && (n === 27 && Nn(t.type) && (a = t.stateNode), (t = t.child), t !== null))
      for (js(t, e, a), t = t.sibling; t !== null; ) (js(t, e, a), (t = t.sibling));
  }
  function Dm(t) {
    var e = t.stateNode,
      a = t.memoizedProps;
    try {
      for (var n = t.type, c = e.attributes; c.length; ) e.removeAttributeNode(c[0]);
      (Ne(e, n, a), (e[ee] = t), (e[Te] = a));
    } catch (r) {
      $t(t, t.return, r);
    }
  }
  var Fa = !1,
    me = !1,
    Vr = !1,
    Bm = typeof WeakSet == 'function' ? WeakSet : Set,
    xe = null;
  function ay(t, e) {
    if (((t = t.containerInfo), (ru = Ys), (t = Kf(t)), Bo(t))) {
      if ('selectionStart' in t) var a = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          a = ((a = t.ownerDocument) && a.defaultView) || window;
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
              break t;
            }
            var h = 0,
              v = -1,
              S = -1,
              N = 0,
              B = 0,
              k = t,
              z = null;
            e: for (;;) {
              for (
                var C;
                k !== a || (c !== 0 && k.nodeType !== 3) || (v = h + c),
                  k !== r || (n !== 0 && k.nodeType !== 3) || (S = h + n),
                  k.nodeType === 3 && (h += k.nodeValue.length),
                  (C = k.firstChild) !== null;
              )
                ((z = k), (k = C));
              for (;;) {
                if (k === t) break e;
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
    for (uu = { focusedElem: t, selectionRange: a }, Ys = !1, xe = e; xe !== null; )
      if (((e = xe), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = e), (xe = t));
      else
        for (; xe !== null; ) {
          switch (((e = xe), (r = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (a = 0; a < t.length; a++) ((c = t[a]), (c.ref.impl = c.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && r !== null) {
                ((t = void 0),
                  (a = e),
                  (c = r.memoizedProps),
                  (r = r.memoizedState),
                  (n = a.stateNode));
                try {
                  var I = hl(a.type, c);
                  ((t = n.getSnapshotBeforeUpdate(I, r)),
                    (n.__reactInternalSnapshotBeforeUpdate = t));
                } catch (it) {
                  $t(a, a.return, it);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (a = t.nodeType), a === 9)) mu(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      mu(t);
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
            ((t.return = e.return), (xe = t));
            break;
          }
          xe = e.return;
        }
  }
  function Lm(t, e, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Pa(t, a), n & 4 && ac(5, a));
        break;
      case 1:
        if ((Pa(t, a), n & 4))
          if (((t = a.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (h) {
              $t(a, a.return, h);
            }
          else {
            var c = hl(a.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(c, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (h) {
              $t(a, a.return, h);
            }
          }
        (n & 64 && zm(a), n & 512 && nc(a, a.return));
        break;
      case 3:
        if ((Pa(t, a), n & 64 && ((t = a.updateQueue), t !== null))) {
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
            bd(t, e);
          } catch (h) {
            $t(a, a.return, h);
          }
        }
        break;
      case 27:
        e === null && n & 4 && Dm(a);
      case 26:
      case 5:
        (Pa(t, a), e === null && n & 4 && Rm(a), n & 512 && nc(a, a.return));
        break;
      case 12:
        Pa(t, a);
        break;
      case 31:
        (Pa(t, a), n & 4 && km(t, a));
        break;
      case 13:
        (Pa(t, a),
          n & 4 && Um(t, a),
          n & 64 &&
            ((t = a.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((a = fy.bind(null, a)), Cy(t, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || Fa), !n)) {
          ((e = (e !== null && e.memoizedState !== null) || me), (c = Fa));
          var r = me;
          ((Fa = n),
            (me = e) && !r ? tn(t, a, (a.subtreeFlags & 8772) !== 0) : Pa(t, a),
            (Fa = c),
            (me = r));
        }
        break;
      case 30:
        break;
      default:
        Pa(t, a);
    }
  }
  function $m(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), $m(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && vo(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var It = null,
    qe = !1;
  function Ia(t, e, a) {
    for (a = a.child; a !== null; ) (Hm(t, e, a), (a = a.sibling));
  }
  function Hm(t, e, a) {
    if (_e && typeof _e.onCommitFiberUnmount == 'function')
      try {
        _e.onCommitFiberUnmount(Ea, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (me || Ca(a, e),
          Ia(t, e, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        me || Ca(a, e);
        var n = It,
          c = qe;
        (Nn(a.type) && ((It = a.stateNode), (qe = !1)),
          Ia(t, e, a),
          dc(a.stateNode),
          (It = n),
          (qe = c));
        break;
      case 5:
        me || Ca(a, e);
      case 6:
        if (((n = It), (c = qe), (It = null), Ia(t, e, a), (It = n), (qe = c), It !== null))
          if (qe)
            try {
              (It.nodeType === 9
                ? It.body
                : It.nodeName === 'HTML'
                  ? It.ownerDocument.body
                  : It
              ).removeChild(a.stateNode);
            } catch (r) {
              $t(a, e, r);
            }
          else
            try {
              It.removeChild(a.stateNode);
            } catch (r) {
              $t(a, e, r);
            }
        break;
      case 18:
        It !== null &&
          (qe
            ? ((t = It),
              z0(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                a.stateNode
              ),
              di(t))
            : z0(It, a.stateNode));
        break;
      case 4:
        ((n = It),
          (c = qe),
          (It = a.stateNode.containerInfo),
          (qe = !0),
          Ia(t, e, a),
          (It = n),
          (qe = c));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (xn(2, a, e), me || xn(4, a, e), Ia(t, e, a));
        break;
      case 1:
        (me ||
          (Ca(a, e), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && Cm(a, e, n)),
          Ia(t, e, a));
        break;
      case 21:
        Ia(t, e, a);
        break;
      case 22:
        ((me = (n = me) || a.memoizedState !== null), Ia(t, e, a), (me = n));
        break;
      default:
        Ia(t, e, a);
    }
  }
  function km(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        di(t);
      } catch (a) {
        $t(e, e.return, a);
      }
    }
  }
  function Um(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        di(t);
      } catch (a) {
        $t(e, e.return, a);
      }
  }
  function ny(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new Bm()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new Bm()),
          e
        );
      default:
        throw Error(o(435, t.tag));
    }
  }
  function As(t, e) {
    var a = ny(t);
    e.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var c = dy.bind(null, t, n);
        n.then(c, c);
      }
    });
  }
  function Ve(t, e) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var c = a[n],
          r = t,
          h = e,
          v = h;
        t: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (Nn(v.type)) {
                ((It = v.stateNode), (qe = !1));
                break t;
              }
              break;
            case 5:
              ((It = v.stateNode), (qe = !1));
              break t;
            case 3:
            case 4:
              ((It = v.stateNode.containerInfo), (qe = !0));
              break t;
          }
          v = v.return;
        }
        if (It === null) throw Error(o(160));
        (Hm(r, h, c),
          (It = null),
          (qe = !1),
          (r = c.alternate),
          r !== null && (r.return = null),
          (c.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (qm(e, t), (e = e.sibling));
  }
  var va = null;
  function qm(t, e) {
    var a = t.alternate,
      n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Ve(e, t), Ge(t), n & 4 && (xn(3, t, t.return), ac(3, t), xn(5, t, t.return)));
        break;
      case 1:
        (Ve(e, t),
          Ge(t),
          n & 512 && (me || a === null || Ca(a, a.return)),
          n & 64 &&
            Fa &&
            ((t = t.updateQueue),
            t !== null &&
              ((n = t.callbacks),
              n !== null &&
                ((a = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var c = va;
        if ((Ve(e, t), Ge(t), n & 512 && (me || a === null || Ca(a, a.return)), n & 4)) {
          var r = a !== null ? a.memoizedState : null;
          if (((n = t.memoizedState), a === null))
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  ((n = t.type), (a = t.memoizedProps), (c = c.ownerDocument || c));
                  e: switch (n) {
                    case 'title':
                      ((r = c.getElementsByTagName('title')[0]),
                        (!r ||
                          r[zi] ||
                          r[ee] ||
                          r.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          r.hasAttribute('itemprop')) &&
                          ((r = c.createElement(n)),
                          c.head.insertBefore(r, c.querySelector('head > title'))),
                        Ne(r, n, a),
                        (r[ee] = t),
                        Se(r),
                        (n = r));
                      break t;
                    case 'link':
                      var h = q0('link', 'href', c).get(n + (a.href || ''));
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
                            break e;
                          }
                      }
                      ((r = c.createElement(n)), Ne(r, n, a), c.head.appendChild(r));
                      break;
                    case 'meta':
                      if ((h = q0('meta', 'content', c).get(n + (a.content || '')))) {
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
                            break e;
                          }
                      }
                      ((r = c.createElement(n)), Ne(r, n, a), c.head.appendChild(r));
                      break;
                    default:
                      throw Error(o(468, n));
                  }
                  ((r[ee] = t), Se(r), (n = r));
                }
                t.stateNode = n;
              } else V0(c, t.type, t.stateNode);
            else t.stateNode = U0(c, n, t.memoizedProps);
          else
            r !== n
              ? (r === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : r.count--,
                n === null ? V0(c, t.type, t.stateNode) : U0(c, n, t.memoizedProps))
              : n === null && t.stateNode !== null && kr(t, t.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Ve(e, t),
          Ge(t),
          n & 512 && (me || a === null || Ca(a, a.return)),
          a !== null && n & 4 && kr(t, t.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Ve(e, t), Ge(t), n & 512 && (me || a === null || Ca(a, a.return)), t.flags & 32)) {
          c = t.stateNode;
          try {
            Bl(c, '');
          } catch (I) {
            $t(t, t.return, I);
          }
        }
        (n & 4 &&
          t.stateNode != null &&
          ((c = t.memoizedProps), kr(t, c, a !== null ? a.memoizedProps : c)),
          n & 1024 && (Vr = !0));
        break;
      case 6:
        if ((Ve(e, t), Ge(t), n & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          ((n = t.memoizedProps), (a = t.stateNode));
          try {
            a.nodeValue = n;
          } catch (I) {
            $t(t, t.return, I);
          }
        }
        break;
      case 3:
        if (
          ((Us = null),
          (c = va),
          (va = Hs(e.containerInfo)),
          Ve(e, t),
          (va = c),
          Ge(t),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            di(e.containerInfo);
          } catch (I) {
            $t(t, t.return, I);
          }
        Vr && ((Vr = !1), Vm(t));
        break;
      case 4:
        ((n = va), (va = Hs(t.stateNode.containerInfo)), Ve(e, t), Ge(t), (va = n));
        break;
      case 12:
        (Ve(e, t), Ge(t));
        break;
      case 31:
        (Ve(e, t),
          Ge(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), As(t, n))));
        break;
      case 13:
        (Ve(e, t),
          Ge(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Ms = Bt()),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), As(t, n))));
        break;
      case 22:
        c = t.memoizedState !== null;
        var S = a !== null && a.memoizedState !== null,
          N = Fa,
          B = me;
        if (((Fa = N || c), (me = B || S), Ve(e, t), (me = B), (Fa = N), Ge(t), n & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = c ? e._visibility & -2 : e._visibility | 1,
              c && (a === null || S || Fa || me || pl(t)),
              a = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (a === null) {
                S = a = e;
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
                  $t(S, S.return, I);
                }
              }
            } else if (e.tag === 6) {
              if (a === null) {
                S = e;
                try {
                  S.stateNode.nodeValue = c ? '' : S.memoizedProps;
                } catch (I) {
                  $t(S, S.return, I);
                }
              }
            } else if (e.tag === 18) {
              if (a === null) {
                S = e;
                try {
                  var C = S.stateNode;
                  c ? C0(C, !0) : C0(S.stateNode, !1);
                } catch (I) {
                  $t(S, S.return, I);
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
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), As(t, a))));
        break;
      case 19:
        (Ve(e, t),
          Ge(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), As(t, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Ve(e, t), Ge(t));
    }
  }
  function Ge(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var a, n = t.return; n !== null; ) {
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
              r = Ur(t);
            js(t, r, c);
            break;
          case 5:
            var h = a.stateNode;
            a.flags & 32 && (Bl(h, ''), (a.flags &= -33));
            var v = Ur(t);
            js(t, v, h);
            break;
          case 3:
          case 4:
            var S = a.stateNode.containerInfo,
              N = Ur(t);
            qr(t, N, S);
            break;
          default:
            throw Error(o(161));
        }
      } catch (B) {
        $t(t, t.return, B);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Vm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (Vm(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function Pa(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (Lm(t, e.alternate, e), (e = e.sibling));
  }
  function pl(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (xn(4, e, e.return), pl(e));
          break;
        case 1:
          Ca(e, e.return);
          var a = e.stateNode;
          (typeof a.componentWillUnmount == 'function' && Cm(e, e.return, a), pl(e));
          break;
        case 27:
          dc(e.stateNode);
        case 26:
        case 5:
          (Ca(e, e.return), pl(e));
          break;
        case 22:
          e.memoizedState === null && pl(e);
          break;
        case 30:
          pl(e);
          break;
        default:
          pl(e);
      }
      t = t.sibling;
    }
  }
  function tn(t, e, a) {
    for (a = a && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate,
        c = t,
        r = e,
        h = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          (tn(c, r, a), ac(4, r));
          break;
        case 1:
          if ((tn(c, r, a), (n = r), (c = n.stateNode), typeof c.componentDidMount == 'function'))
            try {
              c.componentDidMount();
            } catch (N) {
              $t(n, n.return, N);
            }
          if (((n = r), (c = n.updateQueue), c !== null)) {
            var v = n.stateNode;
            try {
              var S = c.shared.hiddenCallbacks;
              if (S !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < S.length; c++) _d(S[c], v);
            } catch (N) {
              $t(n, n.return, N);
            }
          }
          (a && h & 64 && zm(r), nc(r, r.return));
          break;
        case 27:
          Dm(r);
        case 26:
        case 5:
          (tn(c, r, a), a && n === null && h & 4 && Rm(r), nc(r, r.return));
          break;
        case 12:
          tn(c, r, a);
          break;
        case 31:
          (tn(c, r, a), a && h & 4 && km(c, r));
          break;
        case 13:
          (tn(c, r, a), a && h & 4 && Um(c, r));
          break;
        case 22:
          (r.memoizedState === null && tn(c, r, a), nc(r, r.return));
          break;
        case 30:
          break;
        default:
          tn(c, r, a);
      }
      e = e.sibling;
    }
  }
  function Gr(t, e) {
    var a = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (a = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== a && (t != null && t.refCount++, a != null && Gi(a)));
  }
  function Yr(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Gi(t)));
  }
  function _a(t, e, a, n) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Gm(t, e, a, n), (e = e.sibling));
  }
  function Gm(t, e, a, n) {
    var c = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (_a(t, e, a, n), c & 2048 && ac(9, e));
        break;
      case 1:
        _a(t, e, a, n);
        break;
      case 3:
        (_a(t, e, a, n),
          c & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Gi(t))));
        break;
      case 12:
        if (c & 2048) {
          (_a(t, e, a, n), (t = e.stateNode));
          try {
            var r = e.memoizedProps,
              h = r.id,
              v = r.onPostCommit;
            typeof v == 'function' &&
              v(h, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (S) {
            $t(e, e.return, S);
          }
        } else _a(t, e, a, n);
        break;
      case 31:
        _a(t, e, a, n);
        break;
      case 13:
        _a(t, e, a, n);
        break;
      case 23:
        break;
      case 22:
        ((r = e.stateNode),
          (h = e.alternate),
          e.memoizedState !== null
            ? r._visibility & 2
              ? _a(t, e, a, n)
              : lc(t, e)
            : r._visibility & 2
              ? _a(t, e, a, n)
              : ((r._visibility |= 2), ei(t, e, a, n, (e.subtreeFlags & 10256) !== 0 || !1)),
          c & 2048 && Gr(h, e));
        break;
      case 24:
        (_a(t, e, a, n), c & 2048 && Yr(e.alternate, e));
        break;
      default:
        _a(t, e, a, n);
    }
  }
  function ei(t, e, a, n, c) {
    for (c = c && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var r = t,
        h = e,
        v = a,
        S = n,
        N = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          (ei(r, h, v, S, c), ac(8, h));
          break;
        case 23:
          break;
        case 22:
          var B = h.stateNode;
          (h.memoizedState !== null
            ? B._visibility & 2
              ? ei(r, h, v, S, c)
              : lc(r, h)
            : ((B._visibility |= 2), ei(r, h, v, S, c)),
            c && N & 2048 && Gr(h.alternate, h));
          break;
        case 24:
          (ei(r, h, v, S, c), c && N & 2048 && Yr(h.alternate, h));
          break;
        default:
          ei(r, h, v, S, c);
      }
      e = e.sibling;
    }
  }
  function lc(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var a = t,
          n = e,
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
        e = e.sibling;
      }
  }
  var ic = 8192;
  function ai(t, e, a) {
    if (t.subtreeFlags & ic) for (t = t.child; t !== null; ) (Ym(t, e, a), (t = t.sibling));
  }
  function Ym(t, e, a) {
    switch (t.tag) {
      case 26:
        (ai(t, e, a),
          t.flags & ic && t.memoizedState !== null && Gy(a, va, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        ai(t, e, a);
        break;
      case 3:
      case 4:
        var n = va;
        ((va = Hs(t.stateNode.containerInfo)), ai(t, e, a), (va = n));
        break;
      case 22:
        t.memoizedState === null &&
          ((n = t.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = ic), (ic = 16777216), ai(t, e, a), (ic = n))
            : ai(t, e, a));
        break;
      default:
        ai(t, e, a);
    }
  }
  function Zm(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function cc(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var n = e[a];
          ((xe = n), Km(n, t));
        }
      Zm(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Xm(t), (t = t.sibling));
  }
  function Xm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (cc(t), t.flags & 2048 && xn(9, t, t.return));
        break;
      case 3:
        cc(t);
        break;
      case 12:
        cc(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), Ts(t))
          : cc(t);
        break;
      default:
        cc(t);
    }
  }
  function Ts(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var n = e[a];
          ((xe = n), Km(n, t));
        }
      Zm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (xn(8, e, e.return), Ts(e));
          break;
        case 22:
          ((a = e.stateNode), a._visibility & 2 && ((a._visibility &= -3), Ts(e)));
          break;
        default:
          Ts(e);
      }
      t = t.sibling;
    }
  }
  function Km(t, e) {
    for (; xe !== null; ) {
      var a = xe;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          xn(8, a, e);
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
      if (((n = a.child), n !== null)) ((n.return = a), (xe = n));
      else
        t: for (a = t; xe !== null; ) {
          n = xe;
          var c = n.sibling,
            r = n.return;
          if (($m(n), n === a)) {
            xe = null;
            break t;
          }
          if (c !== null) {
            ((c.return = r), (xe = c));
            break t;
          }
          xe = r;
        }
    }
  }
  var ly = {
      getCacheForType: function (t) {
        var e = Ee(ue),
          a = e.data.get(t);
        return (a === void 0 && ((a = t()), e.data.set(t, a)), a);
      },
      cacheSignal: function () {
        return Ee(ue).controller.signal;
      },
    },
    iy = typeof WeakMap == 'function' ? WeakMap : Map,
    Rt = 0,
    Gt = null,
    gt = null,
    bt = 0,
    Lt = 0,
    Je = null,
    jn = !1,
    ni = !1,
    Zr = !1,
    en = 0,
    le = 0,
    An = 0,
    yl = 0,
    Xr = 0,
    Fe = 0,
    li = 0,
    sc = null,
    Ye = null,
    Kr = !1,
    Ms = 0,
    Qm = 0,
    Es = 1 / 0,
    ws = null,
    Tn = null,
    ge = 0,
    Mn = null,
    ii = null,
    an = 0,
    Qr = 0,
    Wr = null,
    Wm = null,
    oc = 0,
    Jr = null;
  function Ie() {
    return (Rt & 2) !== 0 && bt !== 0 ? bt & -bt : O.T !== null ? au() : ht();
  }
  function Jm() {
    if (Fe === 0)
      if ((bt & 536870912) === 0 || jt) {
        var t = $a;
        (($a <<= 1), ($a & 3932160) === 0 && ($a = 262144), (Fe = t));
      } else Fe = 536870912;
    return ((t = Qe.current), t !== null && (t.flags |= 32), Fe);
  }
  function Ze(t, e, a) {
    (((t === Gt && (Lt === 2 || Lt === 9)) || t.cancelPendingCommit !== null) &&
      (ci(t, 0), En(t, bt, Fe, !1)),
      F(t, a),
      ((Rt & 2) === 0 || t !== Gt) &&
        (t === Gt && ((Rt & 2) === 0 && (yl |= a), le === 4 && En(t, bt, Fe, !1)), Ra(t)));
  }
  function Fm(t, e, a) {
    if ((Rt & 6) !== 0) throw Error(o(327));
    var n = (!a && (e & 127) === 0 && (e & t.expiredLanes) === 0) || Fn(t, e),
      c = n ? oy(t, e) : Ir(t, e, !0),
      r = n;
    do {
      if (c === 0) {
        ni && !n && En(t, e, 0, !1);
        break;
      } else {
        if (((a = t.current.alternate), r && !cy(a))) {
          ((c = Ir(t, e, !1)), (r = !1));
          continue;
        }
        if (c === 2) {
          if (((r = e), t.errorRecoveryDisabledLanes & r)) var h = 0;
          else
            ((h = t.pendingLanes & -536870913), (h = h !== 0 ? h : h & 536870912 ? 536870912 : 0));
          if (h !== 0) {
            e = h;
            t: {
              var v = t;
              c = sc;
              var S = v.current.memoizedState.isDehydrated;
              if ((S && (ci(v, h).flags |= 256), (h = Ir(v, h, !1)), h !== 2)) {
                if (Zr && !S) {
                  ((v.errorRecoveryDisabledLanes |= r), (yl |= r), (c = 4));
                  break t;
                }
                ((r = Ye), (Ye = c), r !== null && (Ye === null ? (Ye = r) : Ye.push.apply(Ye, r)));
              }
              c = h;
            }
            if (((r = !1), c !== 2)) continue;
          }
        }
        if (c === 1) {
          (ci(t, 0), En(t, e, 0, !0));
          break;
        }
        t: {
          switch (((n = t), (r = c), r)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              En(n, e, Fe, !jn);
              break t;
            case 2:
              Ye = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && ((c = Ms + 300 - Bt()), 10 < c)) {
            if ((En(n, e, Fe, !jn), ka(n, 0, !0) !== 0)) break t;
            ((an = e),
              (n.timeoutHandle = w0(
                Im.bind(null, n, a, Ye, ws, Kr, e, Fe, yl, li, jn, r, 'Throttled', -0, 0),
                c
              )));
            break t;
          }
          Im(n, a, Ye, ws, Kr, e, Fe, yl, li, jn, r, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ra(t);
  }
  function Im(t, e, a, n, c, r, h, v, S, N, B, k, z, C) {
    if (((t.timeoutHandle = -1), (k = e.subtreeFlags), k & 8192 || (k & 16785408) === 16785408)) {
      ((k = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: qa,
      }),
        Ym(e, r, k));
      var I = (r & 62914560) === r ? Ms - Bt() : (r & 4194048) === r ? Qm - Bt() : 0;
      if (((I = Yy(k, I)), I !== null)) {
        ((an = r),
          (t.cancelPendingCommit = I(c0.bind(null, t, e, r, a, n, c, h, v, S, B, k, null, z, C))),
          En(t, r, h, !N));
        return;
      }
    }
    c0(t, e, r, a, n, c, h, v, S);
  }
  function cy(t) {
    for (var e = t; ; ) {
      var a = e.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        e.flags & 16384 &&
        ((a = e.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var c = a[n],
            r = c.getSnapshot;
          c = c.value;
          try {
            if (!Xe(r(), c)) return !1;
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
  function En(t, e, a, n) {
    ((e &= ~Xr),
      (e &= ~yl),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      n && (t.warmLanes |= e),
      (n = t.expirationTimes));
    for (var c = e; 0 < c; ) {
      var r = 31 - Z(c),
        h = 1 << r;
      ((n[r] = -1), (c &= ~h));
    }
    a !== 0 && yt(t, a, e);
  }
  function Ns() {
    return (Rt & 6) === 0 ? (rc(0), !1) : !0;
  }
  function Fr() {
    if (gt !== null) {
      if (Lt === 0) var t = gt.return;
      else ((t = gt), (Za = sl = null), mr(t), (Jl = null), (Zi = 0), (t = gt));
      for (; t !== null; ) (Nm(t.alternate, t), (t = t.return));
      gt = null;
    }
  }
  function ci(t, e) {
    var a = t.timeoutHandle;
    (a !== -1 && ((t.timeoutHandle = -1), My(a)),
      (a = t.cancelPendingCommit),
      a !== null && ((t.cancelPendingCommit = null), a()),
      (an = 0),
      Fr(),
      (Gt = t),
      (gt = a = Ga(t.current, null)),
      (bt = e),
      (Lt = 0),
      (Je = null),
      (jn = !1),
      (ni = Fn(t, e)),
      (Zr = !1),
      (li = Fe = Xr = yl = An = le = 0),
      (Ye = sc = null),
      (Kr = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var c = 31 - Z(n),
          r = 1 << c;
        ((e |= t[c]), (n &= ~r));
      }
    return ((en = e), Jc(), a);
  }
  function Pm(t, e) {
    ((ut = null),
      (O.H = Pi),
      e === Wl || e === ls
        ? ((e = pd()), (Lt = 3))
        : e === er
          ? ((e = pd()), (Lt = 4))
          : (Lt =
              e === Nr
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (Je = e),
      gt === null && ((le = 1), vs(t, ca(e, t.current))));
  }
  function t0() {
    var t = Qe.current;
    return t === null
      ? !0
      : (bt & 4194048) === bt
        ? ua === null
        : (bt & 62914560) === bt || (bt & 536870912) !== 0
          ? t === ua
          : !1;
  }
  function e0() {
    var t = O.H;
    return ((O.H = Pi), t === null ? Pi : t);
  }
  function a0() {
    var t = O.A;
    return ((O.A = ly), t);
  }
  function zs() {
    ((le = 4),
      jn || ((bt & 4194048) !== bt && Qe.current !== null) || (ni = !0),
      ((An & 134217727) === 0 && (yl & 134217727) === 0) || Gt === null || En(Gt, bt, Fe, !1));
  }
  function Ir(t, e, a) {
    var n = Rt;
    Rt |= 2;
    var c = e0(),
      r = a0();
    ((Gt !== t || bt !== e) && ((ws = null), ci(t, e)), (e = !1));
    var h = le;
    t: do
      try {
        if (Lt !== 0 && gt !== null) {
          var v = gt,
            S = Je;
          switch (Lt) {
            case 8:
              (Fr(), (h = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Qe.current === null && (e = !0);
              var N = Lt;
              if (((Lt = 0), (Je = null), si(t, v, S, N), a && ni)) {
                h = 0;
                break t;
              }
              break;
            default:
              ((N = Lt), (Lt = 0), (Je = null), si(t, v, S, N));
          }
        }
        (sy(), (h = le));
        break;
      } catch (B) {
        Pm(t, B);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (Za = sl = null),
      (Rt = n),
      (O.H = c),
      (O.A = r),
      gt === null && ((Gt = null), (bt = 0), Jc()),
      h
    );
  }
  function sy() {
    for (; gt !== null; ) n0(gt);
  }
  function oy(t, e) {
    var a = Rt;
    Rt |= 2;
    var n = e0(),
      c = a0();
    Gt !== t || bt !== e ? ((ws = null), (Es = Bt() + 500), ci(t, e)) : (ni = Fn(t, e));
    t: do
      try {
        if (Lt !== 0 && gt !== null) {
          e = gt;
          var r = Je;
          e: switch (Lt) {
            case 1:
              ((Lt = 0), (Je = null), si(t, e, r, 1));
              break;
            case 2:
            case 9:
              if (md(r)) {
                ((Lt = 0), (Je = null), l0(e));
                break;
              }
              ((e = function () {
                ((Lt !== 2 && Lt !== 9) || Gt !== t || (Lt = 7), Ra(t));
              }),
                r.then(e, e));
              break t;
            case 3:
              Lt = 7;
              break t;
            case 4:
              Lt = 5;
              break t;
            case 7:
              md(r) ? ((Lt = 0), (Je = null), l0(e)) : ((Lt = 0), (Je = null), si(t, e, r, 7));
              break;
            case 5:
              var h = null;
              switch (gt.tag) {
                case 26:
                  h = gt.memoizedState;
                case 5:
                case 27:
                  var v = gt;
                  if (h ? G0(h) : v.stateNode.complete) {
                    ((Lt = 0), (Je = null));
                    var S = v.sibling;
                    if (S !== null) gt = S;
                    else {
                      var N = v.return;
                      N !== null ? ((gt = N), Cs(N)) : (gt = null);
                    }
                    break e;
                  }
              }
              ((Lt = 0), (Je = null), si(t, e, r, 5));
              break;
            case 6:
              ((Lt = 0), (Je = null), si(t, e, r, 6));
              break;
            case 8:
              (Fr(), (le = 6));
              break t;
            default:
              throw Error(o(462));
          }
        }
        ry();
        break;
      } catch (B) {
        Pm(t, B);
      }
    while (!0);
    return (
      (Za = sl = null),
      (O.H = n),
      (O.A = c),
      (Rt = a),
      gt !== null ? 0 : ((Gt = null), (bt = 0), Jc(), le)
    );
  }
  function ry() {
    for (; gt !== null && !te(); ) n0(gt);
  }
  function n0(t) {
    var e = Em(t.alternate, t, en);
    ((t.memoizedProps = t.pendingProps), e === null ? Cs(t) : (gt = e));
  }
  function l0(t) {
    var e = t,
      a = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Sm(a, e, e.pendingProps, e.type, void 0, bt);
        break;
      case 11:
        e = Sm(a, e, e.pendingProps, e.type.render, e.ref, bt);
        break;
      case 5:
        mr(e);
      default:
        (Nm(a, e), (e = gt = ad(e, en)), (e = Em(a, e, en)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? Cs(t) : (gt = e));
  }
  function si(t, e, a, n) {
    ((Za = sl = null), mr(e), (Jl = null), (Zi = 0));
    var c = e.return;
    try {
      if (Fp(t, c, e, a, bt)) {
        ((le = 1), vs(t, ca(a, t.current)), (gt = null));
        return;
      }
    } catch (r) {
      if (c !== null) throw ((gt = c), r);
      ((le = 1), vs(t, ca(a, t.current)), (gt = null));
      return;
    }
    e.flags & 32768
      ? (jt || n === 1
          ? (t = !0)
          : ni || (bt & 536870912) !== 0
            ? (t = !1)
            : ((jn = t = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Qe.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        i0(e, t))
      : Cs(e);
  }
  function Cs(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        i0(e, jn);
        return;
      }
      t = e.return;
      var a = ty(e.alternate, e, en);
      if (a !== null) {
        gt = a;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        gt = e;
        return;
      }
      gt = e = t;
    } while (e !== null);
    le === 0 && (le = 5);
  }
  function i0(t, e) {
    do {
      var a = ey(t.alternate, t);
      if (a !== null) {
        ((a.flags &= 32767), (gt = a));
        return;
      }
      if (
        ((a = t.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        gt = t;
        return;
      }
      gt = t = a;
    } while (t !== null);
    ((le = 6), (gt = null));
  }
  function c0(t, e, a, n, c, r, h, v, S) {
    t.cancelPendingCommit = null;
    do Rs();
    while (ge !== 0);
    if ((Rt & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (
        ((r = e.lanes | e.childLanes),
        (r |= Uo),
        rt(t, a, r, h, v, S),
        t === Gt && ((gt = Gt = null), (bt = 0)),
        (ii = e),
        (Mn = t),
        (an = a),
        (Qr = r),
        (Wr = c),
        (Wm = n),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            my(fn, function () {
              return (f0(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (n = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = O.T), (O.T = null), (c = K.p), (K.p = 2), (h = Rt), (Rt |= 4));
        try {
          ay(t, e, a);
        } finally {
          ((Rt = h), (K.p = c), (O.T = n));
        }
      }
      ((ge = 1), s0(), o0(), r0());
    }
  }
  function s0() {
    if (ge === 1) {
      ge = 0;
      var t = Mn,
        e = ii,
        a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = K.p;
        K.p = 2;
        var c = Rt;
        Rt |= 4;
        try {
          qm(e, t);
          var r = uu,
            h = Kf(t.containerInfo),
            v = r.focusedElem,
            S = r.selectionRange;
          if (h !== v && v && v.ownerDocument && Xf(v.ownerDocument.documentElement, v)) {
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
                    it = Math.min(S.start, I),
                    Vt = S.end === void 0 ? it : Math.min(S.end, I);
                  !C.extend && it > Vt && ((h = Vt), (Vt = it), (it = h));
                  var M = Zf(v, it),
                    j = Zf(v, Vt);
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
                      it > Vt
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
          ((Ys = !!ru), (uu = ru = null));
        } finally {
          ((Rt = c), (K.p = n), (O.T = a));
        }
      }
      ((t.current = e), (ge = 2));
    }
  }
  function o0() {
    if (ge === 2) {
      ge = 0;
      var t = Mn,
        e = ii,
        a = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = K.p;
        K.p = 2;
        var c = Rt;
        Rt |= 4;
        try {
          Lm(t, e.alternate, e);
        } finally {
          ((Rt = c), (K.p = n), (O.T = a));
        }
      }
      ge = 3;
    }
  }
  function r0() {
    if (ge === 4 || ge === 3) {
      ((ge = 0), Ce());
      var t = Mn,
        e = ii,
        a = an,
        n = Wm;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (ge = 5)
        : ((ge = 0), (ii = Mn = null), u0(t, t.pendingLanes));
      var c = t.pendingLanes;
      if (
        (c === 0 && (Tn = null),
        Dt(a),
        (e = e.stateNode),
        _e && typeof _e.onCommitFiberRoot == 'function')
      )
        try {
          _e.onCommitFiberRoot(Ea, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((e = O.T), (c = K.p), (K.p = 2), (O.T = null));
        try {
          for (var r = t.onRecoverableError, h = 0; h < n.length; h++) {
            var v = n[h];
            r(v.value, { componentStack: v.stack });
          }
        } finally {
          ((O.T = e), (K.p = c));
        }
      }
      ((an & 3) !== 0 && Rs(),
        Ra(t),
        (c = t.pendingLanes),
        (a & 261930) !== 0 && (c & 42) !== 0 ? (t === Jr ? oc++ : ((oc = 0), (Jr = t))) : (oc = 0),
        rc(0));
    }
  }
  function u0(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Gi(e)));
  }
  function Rs() {
    return (s0(), o0(), r0(), f0());
  }
  function f0() {
    if (ge !== 5) return !1;
    var t = Mn,
      e = Qr;
    Qr = 0;
    var a = Dt(an),
      n = O.T,
      c = K.p;
    try {
      ((K.p = 32 > a ? 32 : a), (O.T = null), (a = Wr), (Wr = null));
      var r = Mn,
        h = an;
      if (((ge = 0), (ii = Mn = null), (an = 0), (Rt & 6) !== 0)) throw Error(o(331));
      var v = Rt;
      if (
        ((Rt |= 4),
        Xm(r.current),
        Gm(r, r.current, h, a),
        (Rt = v),
        rc(0, !1),
        _e && typeof _e.onPostCommitFiberRoot == 'function')
      )
        try {
          _e.onPostCommitFiberRoot(Ea, r);
        } catch {}
      return !0;
    } finally {
      ((K.p = c), (O.T = n), u0(t, e));
    }
  }
  function d0(t, e, a) {
    ((e = ca(a, e)),
      (e = wr(t.stateNode, e, 2)),
      (t = _n(t, e, 2)),
      t !== null && (F(t, 2), Ra(t)));
  }
  function $t(t, e, a) {
    if (t.tag === 3) d0(t, t, a);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          d0(e, t, a);
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Tn === null || !Tn.has(n)))
          ) {
            ((t = ca(a, t)),
              (a = mm(2)),
              (n = _n(e, a, 2)),
              n !== null && (hm(a, n, e, t), F(n, 2), Ra(n)));
            break;
          }
        }
        e = e.return;
      }
  }
  function Pr(t, e, a) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new iy();
      var c = new Set();
      n.set(e, c);
    } else ((c = n.get(e)), c === void 0 && ((c = new Set()), n.set(e, c)));
    c.has(a) || ((Zr = !0), c.add(a), (t = uy.bind(null, t, e, a)), e.then(t, t));
  }
  function uy(t, e, a) {
    var n = t.pingCache;
    (n !== null && n.delete(e),
      (t.pingedLanes |= t.suspendedLanes & a),
      (t.warmLanes &= ~a),
      Gt === t &&
        (bt & a) === a &&
        (le === 4 || (le === 3 && (bt & 62914560) === bt && 300 > Bt() - Ms)
          ? (Rt & 2) === 0 && ci(t, 0)
          : (Xr |= a),
        li === bt && (li = 0)),
      Ra(t));
  }
  function m0(t, e) {
    (e === 0 && (e = Ni()), (t = ll(t, e)), t !== null && (F(t, e), Ra(t)));
  }
  function fy(t) {
    var e = t.memoizedState,
      a = 0;
    (e !== null && (a = e.retryLane), m0(t, a));
  }
  function dy(t, e) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode,
          c = t.memoizedState;
        c !== null && (a = c.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (n !== null && n.delete(e), m0(t, a));
  }
  function my(t, e) {
    return Ae(t, e);
  }
  var Os = null,
    oi = null,
    tu = !1,
    Ds = !1,
    eu = !1,
    wn = 0;
  function Ra(t) {
    (t !== oi && t.next === null && (oi === null ? (Os = oi = t) : (oi = oi.next = t)),
      (Ds = !0),
      tu || ((tu = !0), py()));
  }
  function rc(t, e) {
    if (!eu && Ds) {
      eu = !0;
      do
        for (var a = !1, n = Os; n !== null; ) {
          if (t !== 0) {
            var c = n.pendingLanes;
            if (c === 0) var r = 0;
            else {
              var h = n.suspendedLanes,
                v = n.pingedLanes;
              ((r = (1 << (31 - Z(42 | t) + 1)) - 1),
                (r &= c & ~(h & ~v)),
                (r = r & 201326741 ? (r & 201326741) | 1 : r ? r | 2 : 0));
            }
            r !== 0 && ((a = !0), g0(n, r));
          } else
            ((r = bt),
              (r = ka(
                n,
                n === Gt ? r : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (r & 3) === 0 || Fn(n, r) || ((a = !0), g0(n, r)));
          n = n.next;
        }
      while (a);
      eu = !1;
    }
  }
  function hy() {
    h0();
  }
  function h0() {
    Ds = tu = !1;
    var t = 0;
    wn !== 0 && Ty() && (t = wn);
    for (var e = Bt(), a = null, n = Os; n !== null; ) {
      var c = n.next,
        r = p0(n, e);
      (r === 0
        ? ((n.next = null), a === null ? (Os = c) : (a.next = c), c === null && (oi = a))
        : ((a = n), (t !== 0 || (r & 3) !== 0) && (Ds = !0)),
        (n = c));
    }
    ((ge !== 0 && ge !== 5) || rc(t), wn !== 0 && (wn = 0));
  }
  function p0(t, e) {
    for (
      var a = t.suspendedLanes,
        n = t.pingedLanes,
        c = t.expirationTimes,
        r = t.pendingLanes & -62914561;
      0 < r;
    ) {
      var h = 31 - Z(r),
        v = 1 << h,
        S = c[h];
      (S === -1
        ? ((v & a) === 0 || (v & n) !== 0) && (c[h] = In(v, e))
        : S <= e && (t.expiredLanes |= v),
        (r &= ~v));
    }
    if (
      ((e = Gt),
      (a = bt),
      (a = ka(t, t === e ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (n = t.callbackNode),
      a === 0 || (t === e && (Lt === 2 || Lt === 9)) || t.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Ct(n), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((a & 3) === 0 || Fn(t, a)) {
      if (((e = a & -a), e === t.callbackPriority)) return e;
      switch ((n !== null && Ct(n), Dt(a))) {
        case 2:
        case 8:
          a = La;
          break;
        case 32:
          a = fn;
          break;
        case 268435456:
          a = Zn;
          break;
        default:
          a = fn;
      }
      return (
        (n = y0.bind(null, t)),
        (a = Ae(a, n)),
        (t.callbackPriority = e),
        (t.callbackNode = a),
        e
      );
    }
    return (
      n !== null && n !== null && Ct(n),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function y0(t, e) {
    if (ge !== 0 && ge !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var a = t.callbackNode;
    if (Rs() && t.callbackNode !== a) return null;
    var n = bt;
    return (
      (n = ka(t, t === Gt ? n : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Fm(t, n, e),
          p0(t, Bt()),
          t.callbackNode != null && t.callbackNode === a ? y0.bind(null, t) : null)
    );
  }
  function g0(t, e) {
    if (Rs()) return null;
    Fm(t, e, !0);
  }
  function py() {
    Ey(function () {
      (Rt & 6) !== 0 ? Ae(Ba, hy) : h0();
    });
  }
  function au() {
    if (wn === 0) {
      var t = Kl;
      (t === 0 && ((t = Jn), (Jn <<= 1), (Jn & 261888) === 0 && (Jn = 256)), (wn = t));
    }
    return wn;
  }
  function v0(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : Vc('' + t);
  }
  function _0(t, e) {
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
  function yy(t, e, a, n, c) {
    if (e === 'submit' && a && a.stateNode === c) {
      var r = v0((c[Te] || null).action),
        h = n.submitter;
      h &&
        ((e = (e = h[Te] || null) ? v0(e.formAction) : h.getAttribute('formAction')),
        e !== null && ((r = e), (h = null)));
      var v = new Xc('action', 'action', null, n, c);
      t.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (wn !== 0) {
                  var S = h ? _0(c, h) : new FormData(c);
                  xr(a, { pending: !0, data: S, method: c.method, action: r }, null, S);
                }
              } else
                typeof r == 'function' &&
                  (v.preventDefault(),
                  (S = h ? _0(c, h) : new FormData(c)),
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
      gy = lu.toLowerCase(),
      vy = lu[0].toUpperCase() + lu.slice(1);
    ga(gy, 'on' + vy);
  }
  (ga(Jf, 'onAnimationEnd'),
    ga(Ff, 'onAnimationIteration'),
    ga(If, 'onAnimationStart'),
    ga('dblclick', 'onDoubleClick'),
    ga('focusin', 'onFocus'),
    ga('focusout', 'onBlur'),
    ga(Dp, 'onTransitionRun'),
    ga(Bp, 'onTransitionStart'),
    ga(Lp, 'onTransitionCancel'),
    ga(Pf, 'onTransitionEnd'),
    Ol('onMouseEnter', ['mouseout', 'mouseover']),
    Ol('onMouseLeave', ['mouseout', 'mouseover']),
    Ol('onPointerEnter', ['pointerout', 'pointerover']),
    Ol('onPointerLeave', ['pointerout', 'pointerover']),
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
    _y = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(uc)
    );
  function b0(t, e) {
    e = (e & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var n = t[a],
        c = n.event;
      n = n.listeners;
      t: {
        var r = void 0;
        if (e)
          for (var h = n.length - 1; 0 <= h; h--) {
            var v = n[h],
              S = v.instance,
              N = v.currentTarget;
            if (((v = v.listener), S !== r && c.isPropagationStopped())) break t;
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
              break t;
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
  function vt(t, e) {
    var a = e[go];
    a === void 0 && (a = e[go] = new Set());
    var n = t + '__bubble';
    a.has(n) || (S0(e, t, 2, !1), a.add(n));
  }
  function iu(t, e, a) {
    var n = 0;
    (e && (n |= 4), S0(a, t, n, e));
  }
  var Bs = '_reactListening' + Math.random().toString(36).slice(2);
  function cu(t) {
    if (!t[Bs]) {
      ((t[Bs] = !0),
        hf.forEach(function (a) {
          a !== 'selectionchange' && (_y.has(a) || iu(a, !1, t), iu(a, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Bs] || ((e[Bs] = !0), iu('selectionchange', !1, e));
    }
  }
  function S0(t, e, a, n) {
    switch (J0(e)) {
      case 2:
        var c = Ky;
        break;
      case 8:
        c = Qy;
        break;
      default:
        c = Su;
    }
    ((a = c.bind(null, e, a, t)),
      (c = void 0),
      !Mo || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (c = !0),
      n
        ? c !== void 0
          ? t.addEventListener(e, a, { capture: !0, passive: c })
          : t.addEventListener(e, a, !0)
        : c !== void 0
          ? t.addEventListener(e, a, { passive: c })
          : t.addEventListener(e, a, !1));
  }
  function su(t, e, a, n, c) {
    var r = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (;;) {
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
            if (((h = zl(v)), h === null)) return;
            if (((S = h.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              n = r = h;
              continue t;
            }
            v = v.parentNode;
          }
        }
        n = n.return;
      }
    Mf(function () {
      var N = r,
        B = Ao(a),
        k = [];
      t: {
        var z = td.get(t);
        if (z !== void 0) {
          var C = Xc,
            I = t;
          switch (t) {
            case 'keypress':
              if (Yc(a) === 0) break t;
            case 'keydown':
            case 'keyup':
              C = dp;
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
              if (a.button === 2) break t;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              C = Nf;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              C = tp;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              C = pp;
              break;
            case Jf:
            case Ff:
            case If:
              C = np;
              break;
            case Pf:
              C = gp;
              break;
            case 'scroll':
            case 'scrollend':
              C = I1;
              break;
            case 'wheel':
              C = _p;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              C = ip;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              C = Cf;
              break;
            case 'toggle':
            case 'beforetoggle':
              C = Sp;
          }
          var it = (e & 4) !== 0,
            Vt = !it && (t === 'scroll' || t === 'scrollend'),
            M = it ? (z !== null ? z + 'Capture' : null) : z;
          it = [];
          for (var j = N, w; j !== null; ) {
            var $ = j;
            if (
              ((w = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                w === null ||
                M === null ||
                (($ = Ri(j, M)), $ != null && it.push(fc(j, $, w))),
              Vt)
            )
              break;
            j = j.return;
          }
          0 < it.length && ((z = new C(z, I, null, a, B)), k.push({ event: z, listeners: it }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((z = t === 'mouseover' || t === 'pointerover'),
            (C = t === 'mouseout' || t === 'pointerout'),
            z && a !== jo && (I = a.relatedTarget || a.fromElement) && (zl(I) || I[wa]))
          )
            break t;
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
                (I = I ? zl(I) : null),
                I !== null &&
                  ((Vt = d(I)), (it = I.tag), I !== Vt || (it !== 5 && it !== 27 && it !== 6)) &&
                  (I = null))
              : ((C = null), (I = N)),
            C !== I)
          ) {
            if (
              ((it = Nf),
              ($ = 'onMouseLeave'),
              (M = 'onMouseEnter'),
              (j = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((it = Cf), ($ = 'onPointerLeave'), (M = 'onPointerEnter'), (j = 'pointer')),
              (Vt = C == null ? z : Ci(C)),
              (w = I == null ? z : Ci(I)),
              (z = new it($, j + 'leave', C, a, B)),
              (z.target = Vt),
              (z.relatedTarget = w),
              ($ = null),
              zl(B) === N &&
                ((it = new it(M, j + 'enter', I, a, B)),
                (it.target = w),
                (it.relatedTarget = Vt),
                ($ = it)),
              (Vt = $),
              C && I)
            )
              e: {
                for (it = by, M = C, j = I, w = 0, $ = M; $; $ = it($)) w++;
                $ = 0;
                for (var nt = j; nt; nt = it(nt)) $++;
                for (; 0 < w - $; ) ((M = it(M)), w--);
                for (; 0 < $ - w; ) ((j = it(j)), $--);
                for (; w--; ) {
                  if (M === j || (j !== null && M === j.alternate)) {
                    it = M;
                    break e;
                  }
                  ((M = it(M)), (j = it(j)));
                }
                it = null;
              }
            else it = null;
            (C !== null && x0(k, z, C, it, !1), I !== null && Vt !== null && x0(k, Vt, I, it, !0));
          }
        }
        t: {
          if (
            ((z = N ? Ci(N) : window),
            (C = z.nodeName && z.nodeName.toLowerCase()),
            C === 'select' || (C === 'input' && z.type === 'file'))
          )
            var Nt = kf;
          else if ($f(z))
            if (Uf) Nt = Cp;
            else {
              Nt = Np;
              var tt = wp;
            }
          else
            ((C = z.nodeName),
              !C || C.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? N && xo(N.elementType) && (Nt = kf)
                : (Nt = zp));
          if (Nt && (Nt = Nt(t, N))) {
            Hf(k, Nt, a, B);
            break t;
          }
          (tt && tt(t, z, N),
            t === 'focusout' &&
              N &&
              z.type === 'number' &&
              N.memoizedProps.value != null &&
              So(z, 'number', z.value));
        }
        switch (((tt = N ? Ci(N) : window), t)) {
          case 'focusin':
            ($f(tt) || tt.contentEditable === 'true') && ((kl = tt), (Lo = N), (Ui = null));
            break;
          case 'focusout':
            Ui = Lo = kl = null;
            break;
          case 'mousedown':
            $o = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            (($o = !1), Qf(k, a, B));
            break;
          case 'selectionchange':
            if (Op) break;
          case 'keydown':
          case 'keyup':
            Qf(k, a, B);
        }
        var mt;
        if (Ro)
          t: {
            switch (t) {
              case 'compositionstart':
                var St = 'onCompositionStart';
                break t;
              case 'compositionend':
                St = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                St = 'onCompositionUpdate';
                break t;
            }
            St = void 0;
          }
        else
          Hl
            ? Bf(t, a) && (St = 'onCompositionEnd')
            : t === 'keydown' && a.keyCode === 229 && (St = 'onCompositionStart');
        (St &&
          (Rf &&
            a.locale !== 'ko' &&
            (Hl || St !== 'onCompositionStart'
              ? St === 'onCompositionEnd' && Hl && (mt = Ef())
              : ((dn = B), (Eo = 'value' in dn ? dn.value : dn.textContent), (Hl = !0))),
          (tt = Ls(N, St)),
          0 < tt.length &&
            ((St = new zf(St, t, null, a, B)),
            k.push({ event: St, listeners: tt }),
            mt ? (St.data = mt) : ((mt = Lf(a)), mt !== null && (St.data = mt)))),
          (mt = jp ? Ap(t, a) : Tp(t, a)) &&
            ((St = Ls(N, 'onBeforeInput')),
            0 < St.length &&
              ((tt = new zf('onBeforeInput', 'beforeinput', null, a, B)),
              k.push({ event: tt, listeners: St }),
              (tt.data = mt))),
          yy(k, t, N, a, B));
      }
      b0(k, e);
    });
  }
  function fc(t, e, a) {
    return { instance: t, listener: e, currentTarget: a };
  }
  function Ls(t, e) {
    for (var a = e + 'Capture', n = []; t !== null; ) {
      var c = t,
        r = c.stateNode;
      if (
        ((c = c.tag),
        (c !== 5 && c !== 26 && c !== 27) ||
          r === null ||
          ((c = Ri(t, a)),
          c != null && n.unshift(fc(t, c, r)),
          (c = Ri(t, e)),
          c != null && n.push(fc(t, c, r))),
        t.tag === 3)
      )
        return n;
      t = t.return;
    }
    return [];
  }
  function by(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function x0(t, e, a, n, c) {
    for (var r = e._reactName, h = []; a !== null && a !== n; ) {
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
    h.length !== 0 && t.push({ event: e, listeners: h });
  }
  var Sy = /\r\n?/g,
    xy = /\u0000|\uFFFD/g;
  function j0(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        Sy,
        `
`
      )
      .replace(xy, '');
  }
  function A0(t, e) {
    return ((e = j0(e)), j0(t) === e);
  }
  function qt(t, e, a, n, c, r) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? e === 'body' || (e === 'textarea' && n === '') || Bl(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && e !== 'body' && Bl(t, '' + n);
        break;
      case 'className':
        Uc(t, 'class', n);
        break;
      case 'tabIndex':
        Uc(t, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Uc(t, a, n);
        break;
      case 'style':
        Af(t, n, r);
        break;
      case 'data':
        if (e !== 'object') {
          Uc(t, 'data', n);
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
        ((n = Vc('' + n)), t.setAttribute(a, n));
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
          typeof r == 'function' &&
            (a === 'formAction'
              ? (e !== 'input' && qt(t, e, 'name', c.name, c, null),
                qt(t, e, 'formEncType', c.formEncType, c, null),
                qt(t, e, 'formMethod', c.formMethod, c, null),
                qt(t, e, 'formTarget', c.formTarget, c, null))
              : (qt(t, e, 'encType', c.encType, c, null),
                qt(t, e, 'method', c.method, c, null),
                qt(t, e, 'target', c.target, c, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          t.removeAttribute(a);
          break;
        }
        ((n = Vc('' + n)), t.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (t.onclick = qa);
        break;
      case 'onScroll':
        n != null && vt('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && vt('scrollend', t);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(o(61));
          if (((a = n.__html), a != null)) {
            if (c.children != null) throw Error(o(60));
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
        ((a = Vc('' + n)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (vt('beforetoggle', t), vt('toggle', t), kc(t, 'popover', n));
        break;
      case 'xlinkActuate':
        Ua(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        Ua(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        Ua(t, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        Ua(t, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        Ua(t, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        Ua(t, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        Ua(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        Ua(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        Ua(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        kc(t, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = J1.get(a) || a), kc(t, a, n));
    }
  }
  function ou(t, e, a, n, c, r) {
    switch (a) {
      case 'style':
        Af(t, n, r);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(o(61));
          if (((a = n.__html), a != null)) {
            if (c.children != null) throw Error(o(60));
            t.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? Bl(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && Bl(t, '' + n);
        break;
      case 'onScroll':
        n != null && vt('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && vt('scrollend', t);
        break;
      case 'onClick':
        n != null && (t.onclick = qa);
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
          t: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((c = a.endsWith('Capture')),
              (e = a.slice(2, c ? a.length - 7 : void 0)),
              (r = t[Te] || null),
              (r = r != null ? r[a] : null),
              typeof r == 'function' && t.removeEventListener(e, r, c),
              typeof n == 'function')
            ) {
              (typeof r != 'function' &&
                r !== null &&
                (a in t ? (t[a] = null) : t.hasAttribute(a) && t.removeAttribute(a)),
                t.addEventListener(e, n, c));
              break t;
            }
            a in t ? (t[a] = n) : n === !0 ? t.setAttribute(a, '') : kc(t, a, n);
          }
    }
  }
  function Ne(t, e, a) {
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
        (vt('error', t), vt('load', t));
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
                  throw Error(o(137, e));
                default:
                  qt(t, e, r, h, a, null);
              }
          }
        (c && qt(t, e, 'srcSet', a.srcSet, a, null), n && qt(t, e, 'src', a.src, a, null));
        return;
      case 'input':
        vt('invalid', t);
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
                  if (B != null) throw Error(o(137, e));
                  break;
                default:
                  qt(t, e, n, B, a, null);
              }
          }
        bf(t, r, v, S, N, h, c, !1);
        return;
      case 'select':
        (vt('invalid', t), (n = h = r = null));
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
                qt(t, e, c, v, a, null);
            }
        ((e = r),
          (a = h),
          (t.multiple = !!n),
          e != null ? Dl(t, !!n, e, !1) : a != null && Dl(t, !!n, a, !0));
        return;
      case 'textarea':
        (vt('invalid', t), (r = c = n = null));
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
                qt(t, e, h, v, a, null);
            }
        xf(t, n, c, r);
        return;
      case 'option':
        for (S in a)
          if (a.hasOwnProperty(S) && ((n = a[S]), n != null))
            switch (S) {
              case 'selected':
                t.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                qt(t, e, S, n, a, null);
            }
        return;
      case 'dialog':
        (vt('beforetoggle', t), vt('toggle', t), vt('cancel', t), vt('close', t));
        break;
      case 'iframe':
      case 'object':
        vt('load', t);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < uc.length; n++) vt(uc[n], t);
        break;
      case 'image':
        (vt('error', t), vt('load', t));
        break;
      case 'details':
        vt('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (vt('error', t), vt('load', t));
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
                throw Error(o(137, e));
              default:
                qt(t, e, N, n, a, null);
            }
        return;
      default:
        if (xo(e)) {
          for (B in a)
            a.hasOwnProperty(B) && ((n = a[B]), n !== void 0 && ou(t, e, B, n, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((n = a[v]), n != null && qt(t, e, v, n, a, null));
  }
  function jy(t, e, a, n) {
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
                n.hasOwnProperty(C) || qt(t, e, C, null, n, k);
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
                if (C != null) throw Error(o(137, e));
                break;
              default:
                C !== k && qt(t, e, z, C, n, k);
            }
        }
        bo(t, h, v, S, N, B, r, c);
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
                n.hasOwnProperty(r) || qt(t, e, r, null, n, S);
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
                r !== S && qt(t, e, c, r, n, S);
            }
        ((e = v),
          (a = h),
          (n = C),
          z != null
            ? Dl(t, !!a, z, !1)
            : !!n != !!a && (e != null ? Dl(t, !!a, e, !0) : Dl(t, !!a, a ? [] : '', !1)));
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
                qt(t, e, v, null, n, c);
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
                c !== r && qt(t, e, h, c, n, r);
            }
        Sf(t, z, C);
        return;
      case 'option':
        for (var I in a)
          if (((z = a[I]), a.hasOwnProperty(I) && z != null && !n.hasOwnProperty(I)))
            switch (I) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                qt(t, e, I, null, n, z);
            }
        for (S in n)
          if (((z = n[S]), (C = a[S]), n.hasOwnProperty(S) && z !== C && (z != null || C != null)))
            switch (S) {
              case 'selected':
                t.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                qt(t, e, S, z, n, C);
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
        for (var it in a)
          ((z = a[it]),
            a.hasOwnProperty(it) && z != null && !n.hasOwnProperty(it) && qt(t, e, it, null, n, z));
        for (N in n)
          if (((z = n[N]), (C = a[N]), n.hasOwnProperty(N) && z !== C && (z != null || C != null)))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(o(137, e));
                break;
              default:
                qt(t, e, N, z, n, C);
            }
        return;
      default:
        if (xo(e)) {
          for (var Vt in a)
            ((z = a[Vt]),
              a.hasOwnProperty(Vt) &&
                z !== void 0 &&
                !n.hasOwnProperty(Vt) &&
                ou(t, e, Vt, void 0, n, z));
          for (B in n)
            ((z = n[B]),
              (C = a[B]),
              !n.hasOwnProperty(B) ||
                z === C ||
                (z === void 0 && C === void 0) ||
                ou(t, e, B, z, n, C));
          return;
        }
    }
    for (var M in a)
      ((z = a[M]),
        a.hasOwnProperty(M) && z != null && !n.hasOwnProperty(M) && qt(t, e, M, null, n, z));
    for (k in n)
      ((z = n[k]),
        (C = a[k]),
        !n.hasOwnProperty(k) || z === C || (z == null && C == null) || qt(t, e, k, z, n, C));
  }
  function T0(t) {
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
  function Ay() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var c = a[n],
          r = c.transferSize,
          h = c.initiatorType,
          v = c.duration;
        if (r && v && T0(h)) {
          for (h = 0, v = c.responseEnd, n += 1; n < a.length; n++) {
            var S = a[n],
              N = S.startTime;
            if (N > v) break;
            var B = S.transferSize,
              k = S.initiatorType;
            B && T0(k) && ((S = S.responseEnd), (h += B * (S < v ? 1 : (v - N) / (S - N))));
          }
          if ((--n, (e += (8 * (r + h)) / (c.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var ru = null,
    uu = null;
  function $s(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function M0(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function E0(t, e) {
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
  function fu(t, e) {
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
  var du = null;
  function Ty() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === du ? !1 : ((du = t), !0)) : ((du = null), !1);
  }
  var w0 = typeof setTimeout == 'function' ? setTimeout : void 0,
    My = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    N0 = typeof Promise == 'function' ? Promise : void 0,
    Ey =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof N0 < 'u'
          ? function (t) {
              return N0.resolve(null).then(t).catch(wy);
            }
          : w0;
  function wy(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Nn(t) {
    return t === 'head';
  }
  function z0(t, e) {
    var a = e,
      n = 0;
    do {
      var c = a.nextSibling;
      if ((t.removeChild(a), c && c.nodeType === 8))
        if (((a = c.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (t.removeChild(c), di(e));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') dc(t.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = t.ownerDocument.head), dc(a));
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
        } else a === 'body' && dc(t.ownerDocument.body);
      a = c;
    } while (a);
    di(e);
  }
  function C0(t, e) {
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
  function mu(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var a = e;
      switch (((e = e.nextSibling), a.nodeName)) {
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
      t.removeChild(a);
    }
  }
  function Ny(t, e, a, n) {
    for (; t.nodeType === 1; ) {
      var c = a;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (n) {
        if (!t[zi])
          switch (e) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break;
              return t;
            case 'link':
              if (
                ((r = t.getAttribute('rel')),
                r === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break;
              if (
                r !== c.rel ||
                t.getAttribute('href') !== (c.href == null || c.href === '' ? null : c.href) ||
                t.getAttribute('crossorigin') !== (c.crossOrigin == null ? null : c.crossOrigin) ||
                t.getAttribute('title') !== (c.title == null ? null : c.title)
              )
                break;
              return t;
            case 'style':
              if (t.hasAttribute('data-precedence')) break;
              return t;
            case 'script':
              if (
                ((r = t.getAttribute('src')),
                (r !== (c.src == null ? null : c.src) ||
                  t.getAttribute('type') !== (c.type == null ? null : c.type) ||
                  t.getAttribute('crossorigin') !==
                    (c.crossOrigin == null ? null : c.crossOrigin)) &&
                  r &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === 'input' && t.type === 'hidden') {
        var r = c.name == null ? null : '' + c.name;
        if (c.type === 'hidden' && t.getAttribute('name') === r) return t;
      } else return t;
      if (((t = fa(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function zy(t, e, a) {
    if (e === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !a) ||
        ((t = fa(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function R0(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = fa(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function hu(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function pu(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function Cy(t, e) {
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
  function fa(t) {
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
  var yu = null;
  function O0(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === '/$' || a === '/&') {
          if (e === 0) return fa(t.nextSibling);
          e--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function D0(t) {
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
  function B0(t, e, a) {
    switch (((e = $s(a)), t)) {
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
  function dc(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    vo(t);
  }
  var da = new Map(),
    L0 = new Set();
  function Hs(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var nn = K.d;
  K.d = { f: Ry, r: Oy, D: Dy, C: By, L: Ly, m: $y, X: ky, S: Hy, M: Uy };
  function Ry() {
    var t = nn.f(),
      e = Ns();
    return t || e;
  }
  function Oy(t) {
    var e = Cl(t);
    e !== null && e.tag === 5 && e.type === 'form' ? Pd(e) : nn.r(t);
  }
  var ri = typeof document > 'u' ? null : document;
  function $0(t, e, a) {
    var n = ri;
    if (n && typeof e == 'string' && e) {
      var c = la(e);
      ((c = 'link[rel="' + t + '"][href="' + c + '"]'),
        typeof a == 'string' && (c += '[crossorigin="' + a + '"]'),
        L0.has(c) ||
          (L0.add(c),
          (t = { rel: t, crossOrigin: a, href: e }),
          n.querySelector(c) === null &&
            ((e = n.createElement('link')), Ne(e, 'link', t), Se(e), n.head.appendChild(e))));
    }
  }
  function Dy(t) {
    (nn.D(t), $0('dns-prefetch', t, null));
  }
  function By(t, e) {
    (nn.C(t, e), $0('preconnect', t, e));
  }
  function Ly(t, e, a) {
    nn.L(t, e, a);
    var n = ri;
    if (n && t && e) {
      var c = 'link[rel="preload"][as="' + la(e) + '"]';
      e === 'image' && a && a.imageSrcSet
        ? ((c += '[imagesrcset="' + la(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (c += '[imagesizes="' + la(a.imageSizes) + '"]'))
        : (c += '[href="' + la(t) + '"]');
      var r = c;
      switch (e) {
        case 'style':
          r = ui(t);
          break;
        case 'script':
          r = fi(t);
      }
      da.has(r) ||
        ((t = b(
          { rel: 'preload', href: e === 'image' && a && a.imageSrcSet ? void 0 : t, as: e },
          a
        )),
        da.set(r, t),
        n.querySelector(c) !== null ||
          (e === 'style' && n.querySelector(mc(r))) ||
          (e === 'script' && n.querySelector(hc(r))) ||
          ((e = n.createElement('link')), Ne(e, 'link', t), Se(e), n.head.appendChild(e)));
    }
  }
  function $y(t, e) {
    nn.m(t, e);
    var a = ri;
    if (a && t) {
      var n = e && typeof e.as == 'string' ? e.as : 'script',
        c = 'link[rel="modulepreload"][as="' + la(n) + '"][href="' + la(t) + '"]',
        r = c;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          r = fi(t);
      }
      if (
        !da.has(r) &&
        ((t = b({ rel: 'modulepreload', href: t }, e)), da.set(r, t), a.querySelector(c) === null)
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
        ((n = a.createElement('link')), Ne(n, 'link', t), Se(n), a.head.appendChild(n));
      }
    }
  }
  function Hy(t, e, a) {
    nn.S(t, e, a);
    var n = ri;
    if (n && t) {
      var c = Rl(n).hoistableStyles,
        r = ui(t);
      e = e || 'default';
      var h = c.get(r);
      if (!h) {
        var v = { loading: 0, preload: null };
        if ((h = n.querySelector(mc(r)))) v.loading = 5;
        else {
          ((t = b({ rel: 'stylesheet', href: t, 'data-precedence': e }, a)),
            (a = da.get(r)) && gu(t, a));
          var S = (h = n.createElement('link'));
          (Se(S),
            Ne(S, 'link', t),
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
            ks(h, e, n));
        }
        ((h = { type: 'stylesheet', instance: h, count: 1, state: v }), c.set(r, h));
      }
    }
  }
  function ky(t, e) {
    nn.X(t, e);
    var a = ri;
    if (a && t) {
      var n = Rl(a).hoistableScripts,
        c = fi(t),
        r = n.get(c);
      r ||
        ((r = a.querySelector(hc(c))),
        r ||
          ((t = b({ src: t, async: !0 }, e)),
          (e = da.get(c)) && vu(t, e),
          (r = a.createElement('script')),
          Se(r),
          Ne(r, 'link', t),
          a.head.appendChild(r)),
        (r = { type: 'script', instance: r, count: 1, state: null }),
        n.set(c, r));
    }
  }
  function Uy(t, e) {
    nn.M(t, e);
    var a = ri;
    if (a && t) {
      var n = Rl(a).hoistableScripts,
        c = fi(t),
        r = n.get(c);
      r ||
        ((r = a.querySelector(hc(c))),
        r ||
          ((t = b({ src: t, async: !0, type: 'module' }, e)),
          (e = da.get(c)) && vu(t, e),
          (r = a.createElement('script')),
          Se(r),
          Ne(r, 'link', t),
          a.head.appendChild(r)),
        (r = { type: 'script', instance: r, count: 1, state: null }),
        n.set(c, r));
    }
  }
  function H0(t, e, a, n) {
    var c = (c = ft.current) ? Hs(c) : null;
    if (!c) throw Error(o(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((e = ui(a.href)),
            (a = Rl(c).hoistableStyles),
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
          t = ui(a.href);
          var r = Rl(c).hoistableStyles,
            h = r.get(t);
          if (
            (h ||
              ((c = c.ownerDocument || c),
              (h = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              r.set(t, h),
              (r = c.querySelector(mc(t))) && !r._p && ((h.instance = r), (h.state.loading = 5)),
              da.has(t) ||
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
                da.set(t, a),
                r || qy(c, t, a, h.state))),
            e && n === null)
          )
            throw Error(o(528, ''));
          return h;
        }
        if (e && n !== null) throw Error(o(529, ''));
        return null;
      case 'script':
        return (
          (e = a.async),
          (a = a.src),
          typeof a == 'string' && e && typeof e != 'function' && typeof e != 'symbol'
            ? ((e = fi(a)),
              (a = Rl(c).hoistableScripts),
              (n = a.get(e)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(e, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, t));
    }
  }
  function ui(t) {
    return 'href="' + la(t) + '"';
  }
  function mc(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function k0(t) {
    return b({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function qy(t, e, a, n) {
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
        Ne(e, 'link', a),
        Se(e),
        t.head.appendChild(e));
  }
  function fi(t) {
    return '[src="' + la(t) + '"]';
  }
  function hc(t) {
    return 'script[async]' + t;
  }
  function U0(t, e, a) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var n = t.querySelector('style[data-href~="' + la(a.href) + '"]');
          if (n) return ((e.instance = n), Se(n), n);
          var c = b({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (t.ownerDocument || t).createElement('style')),
            Se(n),
            Ne(n, 'style', c),
            ks(n, a.precedence, t),
            (e.instance = n)
          );
        case 'stylesheet':
          c = ui(a.href);
          var r = t.querySelector(mc(c));
          if (r) return ((e.state.loading |= 4), (e.instance = r), Se(r), r);
          ((n = k0(a)),
            (c = da.get(c)) && gu(n, c),
            (r = (t.ownerDocument || t).createElement('link')),
            Se(r));
          var h = r;
          return (
            (h._p = new Promise(function (v, S) {
              ((h.onload = v), (h.onerror = S));
            })),
            Ne(r, 'link', n),
            (e.state.loading |= 4),
            ks(r, a.precedence, t),
            (e.instance = r)
          );
        case 'script':
          return (
            (r = fi(a.src)),
            (c = t.querySelector(hc(r)))
              ? ((e.instance = c), Se(c), c)
              : ((n = a),
                (c = da.get(r)) && ((n = b({}, a)), vu(n, c)),
                (t = t.ownerDocument || t),
                (c = t.createElement('script')),
                Se(c),
                Ne(c, 'link', n),
                t.head.appendChild(c),
                (e.instance = c))
          );
        case 'void':
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === 'stylesheet' &&
        (e.state.loading & 4) === 0 &&
        ((n = e.instance), (e.state.loading |= 4), ks(n, a.precedence, t));
    return e.instance;
  }
  function ks(t, e, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        c = n.length ? n[n.length - 1] : null,
        r = c,
        h = 0;
      h < n.length;
      h++
    ) {
      var v = n[h];
      if (v.dataset.precedence === e) r = v;
      else if (r !== c) break;
    }
    r
      ? r.parentNode.insertBefore(t, r.nextSibling)
      : ((e = a.nodeType === 9 ? a.head : a), e.insertBefore(t, e.firstChild));
  }
  function gu(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function vu(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Us = null;
  function q0(t, e, a) {
    if (Us === null) {
      var n = new Map(),
        c = (Us = new Map());
      c.set(a, n);
    } else ((c = Us), (n = c.get(a)), n || ((n = new Map()), c.set(a, n)));
    if (n.has(t)) return n;
    for (n.set(t, null), a = a.getElementsByTagName(t), c = 0; c < a.length; c++) {
      var r = a[c];
      if (
        !(r[zi] || r[ee] || (t === 'link' && r.getAttribute('rel') === 'stylesheet')) &&
        r.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var h = r.getAttribute(e) || '';
        h = t + h;
        var v = n.get(h);
        v ? v.push(r) : n.set(h, [r]);
      }
    }
    return n;
  }
  function V0(t, e, a) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(a, e === 'title' ? t.querySelector('head > title') : null));
  }
  function Vy(t, e, a) {
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
  function G0(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function Gy(t, e, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var c = ui(n.href),
          r = e.querySelector(mc(c));
        if (r) {
          ((e = r._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = qs.bind(t)), e.then(t, t)),
            (a.state.loading |= 4),
            (a.instance = r),
            Se(r));
          return;
        }
        ((r = e.ownerDocument || e),
          (n = k0(n)),
          (c = da.get(c)) && gu(n, c),
          (r = r.createElement('link')),
          Se(r));
        var h = r;
        ((h._p = new Promise(function (v, S) {
          ((h.onload = v), (h.onerror = S));
        })),
          Ne(r, 'link', n),
          (a.instance = r));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(a, e),
        (e = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (t.count++,
          (a = qs.bind(t)),
          e.addEventListener('load', a),
          e.addEventListener('error', a)));
    }
  }
  var _u = 0;
  function Yy(t, e) {
    return (
      t.stylesheets && t.count === 0 && Gs(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((t.stylesheets && Gs(t, t.stylesheets), t.unsuspend)) {
                var r = t.unsuspend;
                ((t.unsuspend = null), r());
              }
            }, 6e4 + e);
            0 < t.imgBytes && _u === 0 && (_u = 62500 * Ay());
            var c = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && Gs(t, t.stylesheets), t.unsuspend))
                ) {
                  var r = t.unsuspend;
                  ((t.unsuspend = null), r());
                }
              },
              (t.imgBytes > _u ? 50 : 800) + e
            );
            return (
              (t.unsuspend = a),
              function () {
                ((t.unsuspend = null), clearTimeout(n), clearTimeout(c));
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
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Vs = null;
  function Gs(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Vs = new Map()), e.forEach(Zy, t), (Vs = null), qs.call(t)));
  }
  function Zy(t, e) {
    if (!(e.state.loading & 4)) {
      var a = Vs.get(t);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), Vs.set(t, a));
        for (
          var c = t.querySelectorAll('link[data-precedence],style[data-precedence]'), r = 0;
          r < c.length;
          r++
        ) {
          var h = c[r];
          (h.nodeName === 'LINK' || h.getAttribute('media') !== 'not all') &&
            (a.set(h.dataset.precedence, h), (n = h));
        }
        n && a.set(null, n);
      }
      ((c = e.instance),
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
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var pc = {
    $$typeof: ct,
    Provider: null,
    Consumer: null,
    _currentValue: lt,
    _currentValue2: lt,
    _threadCount: 0,
  };
  function Xy(t, e, a, n, c, r, h, v, S) {
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
  function Y0(t, e, a, n, c, r, h, v, S, N, B, k) {
    return (
      (t = new Xy(t, e, a, h, S, N, B, k, v)),
      (e = 1),
      r === !0 && (e |= 24),
      (r = Ke(3, null, null, e)),
      (t.current = r),
      (r.stateNode = t),
      (e = Io()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (r.memoizedState = { element: n, isDehydrated: a, cache: e }),
      ar(r),
      t
    );
  }
  function Z0(t) {
    return t ? ((t = Vl), t) : Vl;
  }
  function X0(t, e, a, n, c, r) {
    ((c = Z0(c)),
      n.context === null ? (n.context = c) : (n.pendingContext = c),
      (n = vn(e)),
      (n.payload = { element: a }),
      (r = r === void 0 ? null : r),
      r !== null && (n.callback = r),
      (a = _n(t, n, e)),
      a !== null && (Ze(a, t, e), Ki(a, t, e)));
  }
  function K0(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function bu(t, e) {
    (K0(t, e), (t = t.alternate) && K0(t, e));
  }
  function Q0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = ll(t, 67108864);
      (e !== null && Ze(e, t, 67108864), bu(t, 67108864));
    }
  }
  function W0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ie();
      e = Le(e);
      var a = ll(t, e);
      (a !== null && Ze(a, t, e), bu(t, e));
    }
  }
  var Ys = !0;
  function Ky(t, e, a, n) {
    var c = O.T;
    O.T = null;
    var r = K.p;
    try {
      ((K.p = 2), Su(t, e, a, n));
    } finally {
      ((K.p = r), (O.T = c));
    }
  }
  function Qy(t, e, a, n) {
    var c = O.T;
    O.T = null;
    var r = K.p;
    try {
      ((K.p = 8), Su(t, e, a, n));
    } finally {
      ((K.p = r), (O.T = c));
    }
  }
  function Su(t, e, a, n) {
    if (Ys) {
      var c = xu(n);
      if (c === null) (su(t, e, n, Zs, a), F0(t, n));
      else if (Jy(c, t, e, a, n)) n.stopPropagation();
      else if ((F0(t, n), e & 4 && -1 < Wy.indexOf(t))) {
        for (; c !== null; ) {
          var r = Cl(c);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (((r = r.stateNode), r.current.memoizedState.isDehydrated)) {
                  var h = aa(r.pendingLanes);
                  if (h !== 0) {
                    var v = r;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; h; ) {
                      var S = 1 << (31 - Z(h));
                      ((v.entanglements[1] |= S), (h &= ~S));
                    }
                    (Ra(r), (Rt & 6) === 0 && ((Es = Bt() + 500), rc(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = ll(r, 2)), v !== null && Ze(v, r, 2), Ns(), bu(r, 2));
            }
          if (((r = xu(n)), r === null && su(t, e, n, Zs, a), r === c)) break;
          c = r;
        }
        c !== null && n.stopPropagation();
      } else su(t, e, n, null, a);
    }
  }
  function xu(t) {
    return ((t = Ao(t)), ju(t));
  }
  var Zs = null;
  function ju(t) {
    if (((Zs = null), (t = zl(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var a = e.tag;
        if (a === 13) {
          if (((t = m(e)), t !== null)) return t;
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
    return ((Zs = t), null);
  }
  function J0(t) {
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
        switch (ea()) {
          case Ba:
            return 2;
          case La:
            return 8;
          case fn:
          case Ei:
            return 32;
          case Zn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Au = !1,
    zn = null,
    Cn = null,
    Rn = null,
    yc = new Map(),
    gc = new Map(),
    On = [],
    Wy =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function F0(t, e) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        zn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Cn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Rn = null;
        break;
      case 'pointerover':
      case 'pointerout':
        yc.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        gc.delete(e.pointerId);
    }
  }
  function vc(t, e, a, n, c, r) {
    return t === null || t.nativeEvent !== r
      ? ((t = {
          blockedOn: e,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: r,
          targetContainers: [c],
        }),
        e !== null && ((e = Cl(e)), e !== null && Q0(e)),
        t)
      : ((t.eventSystemFlags |= n),
        (e = t.targetContainers),
        c !== null && e.indexOf(c) === -1 && e.push(c),
        t);
  }
  function Jy(t, e, a, n, c) {
    switch (e) {
      case 'focusin':
        return ((zn = vc(zn, t, e, a, n, c)), !0);
      case 'dragenter':
        return ((Cn = vc(Cn, t, e, a, n, c)), !0);
      case 'mouseover':
        return ((Rn = vc(Rn, t, e, a, n, c)), !0);
      case 'pointerover':
        var r = c.pointerId;
        return (yc.set(r, vc(yc.get(r) || null, t, e, a, n, c)), !0);
      case 'gotpointercapture':
        return ((r = c.pointerId), gc.set(r, vc(gc.get(r) || null, t, e, a, n, c)), !0);
    }
    return !1;
  }
  function I0(t) {
    var e = zl(t.target);
    if (e !== null) {
      var a = d(e);
      if (a !== null) {
        if (((e = a.tag), e === 13)) {
          if (((e = m(a)), e !== null)) {
            ((t.blockedOn = e),
              _t(t.priority, function () {
                W0(a);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = p(a)), e !== null)) {
            ((t.blockedOn = e),
              _t(t.priority, function () {
                W0(a);
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
  function Xs(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = xu(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((jo = n), a.target.dispatchEvent(n), (jo = null));
      } else return ((e = Cl(a)), e !== null && Q0(e), (t.blockedOn = a), !1);
      e.shift();
    }
    return !0;
  }
  function P0(t, e, a) {
    Xs(t) && a.delete(e);
  }
  function Fy() {
    ((Au = !1),
      zn !== null && Xs(zn) && (zn = null),
      Cn !== null && Xs(Cn) && (Cn = null),
      Rn !== null && Xs(Rn) && (Rn = null),
      yc.forEach(P0),
      gc.forEach(P0));
  }
  function Ks(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      Au || ((Au = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, Fy)));
  }
  var Qs = null;
  function th(t) {
    Qs !== t &&
      ((Qs = t),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        Qs === t && (Qs = null);
        for (var e = 0; e < t.length; e += 3) {
          var a = t[e],
            n = t[e + 1],
            c = t[e + 2];
          if (typeof n != 'function') {
            if (ju(n || a) === null) continue;
            break;
          }
          var r = Cl(a);
          r !== null &&
            (t.splice(e, 3),
            (e -= 3),
            xr(r, { pending: !0, data: c, method: a.method, action: n }, n, c));
        }
      }));
  }
  function di(t) {
    function e(S) {
      return Ks(S, t);
    }
    (zn !== null && Ks(zn, t),
      Cn !== null && Ks(Cn, t),
      Rn !== null && Ks(Rn, t),
      yc.forEach(e),
      gc.forEach(e));
    for (var a = 0; a < On.length; a++) {
      var n = On[a];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < On.length && ((a = On[0]), a.blockedOn === null); )
      (I0(a), a.blockedOn === null && On.shift());
    if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var c = a[n],
          r = a[n + 1],
          h = c[Te] || null;
        if (typeof r == 'function') h || th(a);
        else if (h) {
          var v = null;
          if (r && r.hasAttribute('formAction')) {
            if (((c = r), (h = r[Te] || null))) v = h.formAction;
            else if (ju(c) !== null) continue;
          } else v = h.action;
          (typeof v == 'function' ? (a[n + 1] = v) : (a.splice(n, 3), (n -= 3)), th(a));
        }
      }
  }
  function eh() {
    function t(r) {
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
    function e() {
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
        navigation.addEventListener('navigate', t),
        navigation.addEventListener('navigatesuccess', e),
        navigation.addEventListener('navigateerror', e),
        setTimeout(a, 100),
        function () {
          ((n = !0),
            navigation.removeEventListener('navigate', t),
            navigation.removeEventListener('navigatesuccess', e),
            navigation.removeEventListener('navigateerror', e),
            c !== null && (c(), (c = null)));
        }
      );
    }
  }
  function Tu(t) {
    this._internalRoot = t;
  }
  ((Ws.prototype.render = Tu.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(o(409));
      var a = e.current,
        n = Ie();
      X0(a, n, t, e, null, null);
    }),
    (Ws.prototype.unmount = Tu.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (X0(t.current, 2, null, t, null, null), Ns(), (e[wa] = null));
        }
      }));
  function Ws(t) {
    this._internalRoot = t;
  }
  Ws.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = ht();
      t = { blockedOn: null, target: t, priority: e };
      for (var a = 0; a < On.length && e !== 0 && e < On[a].priority; a++);
      (On.splice(a, 0, t), a === 0 && I0(t));
    }
  };
  var ah = i.version;
  if (ah !== '19.2.5') throw Error(o(527, ah, '19.2.5'));
  K.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(o(188))
        : ((t = Object.keys(t).join(',')), Error(o(268, t)));
    return ((t = y(e)), (t = t !== null ? _(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Iy = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: O,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Js = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Js.isDisabled && Js.supportsFiber)
      try {
        ((Ea = Js.inject(Iy)), (_e = Js));
      } catch {}
  }
  return (
    (bc.createRoot = function (t, e) {
      if (!f(t)) throw Error(o(299));
      var a = !1,
        n = '',
        c = rm,
        r = um,
        h = fm;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (n = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (c = e.onUncaughtError),
          e.onCaughtError !== void 0 && (r = e.onCaughtError),
          e.onRecoverableError !== void 0 && (h = e.onRecoverableError)),
        (e = Y0(t, 1, !1, null, null, a, n, null, c, r, h, eh)),
        (t[wa] = e.current),
        cu(t),
        new Tu(e)
      );
    }),
    (bc.hydrateRoot = function (t, e, a) {
      if (!f(t)) throw Error(o(299));
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
        (e = Y0(t, 1, !0, e, a ?? null, n, c, S, r, h, v, eh)),
        (e.context = Z0(null)),
        (a = e.current),
        (n = Ie()),
        (n = Le(n)),
        (c = vn(n)),
        (c.callback = null),
        _n(a, c, n),
        (a = n),
        (e.current.lanes = a),
        F(e, a),
        Ra(e),
        (t[wa] = e.current),
        cu(t),
        new Ws(e)
      );
    }),
    (bc.version = '19.2.5'),
    bc
  );
}
var dh;
function fg() {
  if (dh) return Eu.exports;
  dh = 1;
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
  return (l(), (Eu.exports = ug()), Eu.exports);
}
var dg = fg(),
  q = af();
const Fs = ag(q);
function mg(l) {
  return 440 * Math.pow(2, (l - 69) / 12);
}
const hg = {
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
  const s = hg[i[1]];
  if (s === void 0) throw new Error(`Invalid note name: ${i[1]}`);
  const f = 12 + parseInt(i[2], 10) * 12 + s;
  return mg(f);
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
const pg = [L('A2'), L('C3'), L('E3')],
  yg = [L('E2'), L('G2'), L('B2')];
(L('D3'), L('F3'), L('A3'));
const gg = [L('G2'), L('B2'), L('D3')],
  vg = [L('C3'), L('E3'), L('G3')],
  _g = [L('B2'), L('D3'), L('F3')];
function pa(l, i, s, o, f, d, m, p, g) {
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
function bg(l, i, s, o, f, d) {
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
const Sg = 100,
  xl = 60 / Sg,
  Rc = xl * 4,
  Ph = 8,
  xg = Rc * Ph,
  jg = 2,
  Ag = 100,
  Tg = [L('A2'), L('A2'), L('G2'), L('G2'), L('C3'), L('C3'), L('E2'), L('E2')],
  mh = [L('A3'), L('C4'), L('E4'), L('A4'), L('G4'), L('E4'), L('C4'), L('A3')],
  hh = [
    [L('A3'), L('C4'), L('E4')],
    [L('G3'), L('B3'), L('D4')],
    [L('C3'), L('E3'), L('G3')],
    [L('E3'), L('G3'), L('B3')],
  ];
function Mg(l, i, s, o) {
  for (let f = 0; f < Ph; f++) {
    const d = s + f * Rc,
      m = Tg[f];
    (pa(l, i, 'sawtooth', m, d, xl * 1.8, 0.22, 300, o),
      pa(l, i, 'sawtooth', m, d + xl * 2, xl * 1.8, 0.22, 300, o),
      Oc(l, i, d, 0.35, o),
      Oc(l, i, d + xl * 2, 0.28, o));
    for (let p = 0; p < 8; p++) {
      const g = (f * 8 + p) % mh.length,
        y = d + p * xl * 0.5;
      pa(l, i, 'square', mh[g], y, xl * 0.4, 0.07, 2400, o);
    }
  }
  for (let f = 0; f < hh.length; f++) {
    const d = hh[f],
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
function Eg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + jg * Rc;
    for (; s < p; ) (Mg(l, i, s, f), (s += xg));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, Ag)));
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
const wg = 100,
  cn = 60 / wg,
  nf = cn * 4,
  t1 = 8,
  Un = nf * t1,
  Ng = 2,
  zg = 100,
  ph = [L('E5'), L('D5'), L('B4'), L('G4'), L('F#4'), L('E4'), L('D4'), L('B3')];
function yh(l, i, s, o, f) {
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
    pa(l, i, 'sine', 120, s, 0.12, o * 0.5, 300, f));
}
function Cg(l, i, s, o) {
  {
    const d = l.createOscillator(),
      m = l.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(L('E1'), s));
    const p = 0.35;
    (m.gain.setValueAtTime(1e-4, s),
      m.gain.linearRampToValueAtTime(p, s + 0.3),
      m.gain.setValueAtTime(p, s + Un - 0.3),
      m.gain.linearRampToValueAtTime(1e-4, s + Un));
    const g = l.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 120),
      d.connect(g).connect(m).connect(i),
      d.start(s),
      d.stop(s + Un + 0.05),
      o.push(d));
  }
  for (let d = 0; d < t1; d++) {
    const m = s + d * nf;
    for (let p = 0; p < 4; p++) {
      const g = m + p * cn;
      (pa(l, i, 'sawtooth', L('E2'), g, cn * 0.9, 0.22, 400, o),
        pa(l, i, 'sawtooth', L('B2'), g, cn * 0.8, 0.1, 600, o));
    }
    (Oc(l, i, m, 0.5, o),
      Oc(l, i, m + cn * 2, 0.45, o),
      yh(l, i, m + cn, 0.4, o),
      yh(l, i, m + cn * 3, 0.38, o));
  }
  const f = [..._g, L('C4')];
  for (const d of f) {
    const m = l.createOscillator(),
      p = l.createGain();
    ((m.type = 'sawtooth'), m.frequency.setValueAtTime(d, s));
    const g = 0.07;
    (p.gain.setValueAtTime(1e-4, s),
      p.gain.linearRampToValueAtTime(g, s + 0.8),
      p.gain.setValueAtTime(g, s + Un - 0.8),
      p.gain.exponentialRampToValueAtTime(1e-4, s + Un));
    const y = l.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 900),
      m.connect(y).connect(p).connect(i),
      m.start(s),
      m.stop(s + Un + 0.05),
      o.push(m));
  }
  for (let d = 0; d < ph.length; d++) {
    const m = s + d * cn * 2;
    pa(l, i, 'sawtooth', ph[d], m, cn * 1.6, 0.08, 2e3, o);
  }
  {
    const d = l.createBufferSource();
    d.buffer = Dc(l, Un + 0.1);
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
function Rg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + Ng * nf;
    for (; s < p; ) (Cg(l, i, s, f), (s += Un));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, zg)));
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
const Og = 120,
  sn = 60 / Og,
  lf = sn * 4,
  e1 = 8,
  ao = lf * e1,
  Dg = 2,
  Bg = 100,
  Lg = [L('E2'), L('E2'), L('D2'), L('D2'), L('E2'), L('E2'), L('B1'), L('B1')],
  gh = [
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
function vh(l, i, s, o, f) {
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
    pa(l, i, 'triangle', 200, s, 0.08, o * 0.4, void 0, f));
}
function $g(l, i, s, o) {
  for (let d = 0; d < e1; d++) {
    const m = s + d * lf,
      p = Lg[d];
    for (let g = 0; g < 4; g++) pa(l, i, 'sawtooth', p, m + g * sn, sn * 0.85, 0.26, 280, o);
    for (let g = 0; g < 4; g++) Oc(l, i, m + g * sn, 0.42, o);
    (vh(l, i, m + sn, 0.3, o), vh(l, i, m + sn * 3, 0.3, o));
    for (let g = 0; g < 8; g++) bg(l, i, m + g * sn * 0.5, 0.12, 0.08, o);
    for (let g = 0; g < 16; g++) {
      const y = (d * 16 + g) % gh.length,
        _ = m + g * sn * 0.25;
      pa(l, i, 'sawtooth', gh[y], _, sn * 0.22, 0.06, 3200, o);
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
function Hg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + Dg * lf;
    for (; s < p; ) ($g(l, i, s, f), (s += ao));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, Bg)));
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
const kg = 80,
  no = 60 / kg,
  io = no * 4,
  Ug = 8,
  lo = io * Ug,
  qg = 2,
  Vg = 100,
  _h = [pg, vg, gg, yg],
  Ru = [L('A3'), L('C4'), L('E4'), L('G4'), L('A4'), L('E4')];
function Gg(l, i, s, o) {
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
  for (let f = 0; f < _h.length; f++) {
    const d = _h[f],
      m = s + f * io * 2,
      p = io * 2;
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
    const d = s + f * no * 2;
    (pa(l, i, 'sawtooth', Ru[f], d, no * 1.5, 0.09, 1800, o),
      pa(l, i, 'sine', Ru[f] * 0.5, d + 0.12, no * 1.2, 0.05, 600, o));
  }
}
function Yg(l, i) {
  let s = 0,
    o = null;
  const f = [];
  function d() {
    const p = l.currentTime + qg * io;
    for (; s < p; ) (Gg(l, i, s, f), (s += lo));
  }
  return {
    start() {
      ((s = l.currentTime),
        d(),
        (o = setInterval(() => {
          d();
        }, Vg)));
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
function Zg(l, i, s) {
  switch (l) {
    case 'title':
      return Yg(i, s);
    case 'base':
      return Eg(i, s);
    case 'battleNormal':
      return Hg(i, s);
    case 'battleBoss':
      return Rg(i, s);
  }
}
function Xg(l, i) {
  const s = Math.max(1, Math.floor(l.sampleRate * i)),
    o = l.createBuffer(1, s, l.sampleRate),
    f = o.getChannelData(0);
  for (let d = 0; d < s; d++) f[d] = Math.random() * 2 - 1;
  return o;
}
function Aa(l, i, s, o, f) {
  const d = l.gain;
  (d.setValueAtTime(1e-4, i),
    d.linearRampToValueAtTime(s, i + o),
    d.exponentialRampToValueAtTime(1e-4, i + o + f));
}
function xt(l, i, s, o, f, d, m, p, g) {
  const y = l.createOscillator(),
    _ = l.createGain();
  ((y.type = s),
    y.frequency.setValueAtTime(o, f),
    g !== void 0 && y.frequency.exponentialRampToValueAtTime(Math.max(1e-4, g), f + m + p),
    Aa(_, f, d, m, p),
    y.connect(_).connect(i),
    y.start(f),
    y.stop(f + m + p + 0.02));
}
function Ta(l, i, s, o, f, d) {
  const m = l.createBufferSource();
  m.buffer = Xg(l, s);
  const p = l.createGain();
  if ((Aa(p, o, f, 0.002, s), d)) {
    const g = l.createBiquadFilter();
    ((g.type = d.type),
      (g.frequency.value = d.frequency),
      d.q !== void 0 && (g.Q.value = d.q),
      m.connect(g).connect(p).connect(i));
  } else m.connect(p).connect(i);
  m.start(o);
}
const Kg = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createOscillator(),
      d = l.createGain();
    ((o.type = 'sawtooth'),
      (f.type = 'sawtooth'),
      o.frequency.setValueAtTime(900, s),
      o.frequency.exponentialRampToValueAtTime(1500, s + 0.5),
      f.frequency.setValueAtTime(905, s),
      f.frequency.exponentialRampToValueAtTime(1510, s + 0.5),
      Aa(d, s, 0.28, 0.02, 0.5),
      o.connect(d),
      f.connect(d),
      d.connect(i),
      o.start(s),
      f.start(s),
      o.stop(s + 0.55),
      f.stop(s + 0.55));
  },
  Qg = (l, i, s) => {
    for (let o = 0; o < 4; o++) {
      const f = s + o * 0.12;
      (xt(l, i, 'sine', 110, f, 0.4, 0.005, 0.18, 35),
        Ta(l, i, 0.08, f, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  Wg = (l, i, s) => {
    (Ta(l, i, 0.4, s, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      xt(l, i, 'triangle', 3e3, s, 0.25, 0.005, 0.15, 1500),
      xt(l, i, 'sawtooth', 200, s + 0.05, 0.18, 0.005, 0.3, 80));
  },
  Jg = (l, i, s) => {
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
        Aa(m, f, 0.2, 0.002, 0.06),
        d.connect(p).connect(m).connect(i),
        d.start(f),
        d.stop(f + 0.08));
    }
  },
  Fg = (l, i, s) => {
    (Ta(l, i, 0.1, s, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      xt(l, i, 'triangle', 500, s, 0.18, 0.003, 0.08, 200));
  },
  Ig = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(80, s),
      o.frequency.linearRampToValueAtTime(160, s + 0.8),
      Aa(f, s, 0.3, 0.1, 0.7),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.85),
      xt(l, i, 'square', 320, s + 0.2, 0.15, 0.02, 0.4));
  },
  Pg = (l, i, s) => {
    (Ta(l, i, 0.5, s, 0.45, { type: 'lowpass', frequency: 1200 }),
      xt(l, i, 'sine', 90, s, 0.5, 0.005, 0.6, 30),
      xt(l, i, 'triangle', 1200, s + 0.1, 0.2, 0.02, 0.4, 2400),
      xt(l, i, 'triangle', 1600, s + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  tv = (l, i, s) => {
    (xt(l, i, 'sine', 180, s, 0.3, 0.005, 0.12, 60),
      Ta(l, i, 0.08, s, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  ev = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(220, s),
      o.frequency.exponentialRampToValueAtTime(40, s + 1.2),
      Aa(f, s, 0.45, 0.02, 1.2),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 1.3),
      Ta(l, i, 0.8, s, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  av = (l, i, s) => {
    (xt(l, i, 'triangle', 700, s, 0.22, 0.01, 0.18),
      xt(l, i, 'triangle', 1050, s + 0.12, 0.22, 0.01, 0.22));
  },
  nv = (l, i, s) => {
    (xt(l, i, 'triangle', 600, s, 0.25, 0.01, 0.2),
      xt(l, i, 'triangle', 900, s + 0.12, 0.25, 0.01, 0.2),
      xt(l, i, 'triangle', 1350, s + 0.24, 0.3, 0.01, 0.45),
      xt(l, i, 'sine', 2400, s + 0.3, 0.15, 0.02, 0.5));
  },
  lv = (l, i, s) => {
    (xt(l, i, 'triangle', 600, s, 0.28, 0.01, 0.18),
      xt(l, i, 'triangle', 750, s + 0.12, 0.28, 0.01, 0.18),
      xt(l, i, 'triangle', 900, s + 0.24, 0.28, 0.01, 0.22),
      xt(l, i, 'triangle', 1200, s + 0.36, 0.32, 0.01, 0.5),
      xt(l, i, 'sine', 2400, s + 0.42, 0.18, 0.02, 0.6));
  },
  iv = (l, i, s) => {
    (xt(l, i, 'sawtooth', 300, s, 0.3, 0.02, 0.4, 220),
      xt(l, i, 'sawtooth', 220, s + 0.35, 0.3, 0.02, 0.5, 160),
      xt(l, i, 'sawtooth', 160, s + 0.8, 0.3, 0.02, 0.7, 80),
      Ta(l, i, 1, s, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  cv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(700, s),
      o.frequency.exponentialRampToValueAtTime(400, s + 0.4),
      Aa(f, s, 0.22, 0.02, 0.4),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.45),
      Ta(l, i, 0.5, s, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  sv = (l, i, s) => {
    xt(l, i, 'triangle', 1e3, s, 0.18, 0.003, 0.05);
  },
  ov = (l, i, s) => {
    (xt(l, i, 'triangle', 880, s, 0.2, 0.005, 0.08),
      xt(l, i, 'triangle', 1320, s + 0.06, 0.2, 0.005, 0.12));
  },
  rv = (l, i, s) => {
    (xt(l, i, 'square', 260, s, 0.18, 0.005, 0.07),
      xt(l, i, 'square', 200, s + 0.06, 0.18, 0.005, 0.1));
  },
  uv = (l, i, s) => {
    xt(l, i, 'triangle', 1400, s, 0.12, 0.003, 0.04);
  },
  fv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(500, s),
      o.frequency.exponentialRampToValueAtTime(1e3, s + 0.12),
      Aa(f, s, 0.18, 0.01, 0.12),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.15));
  },
  dv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(1e3, s),
      o.frequency.exponentialRampToValueAtTime(500, s + 0.1),
      Aa(f, s, 0.16, 0.005, 0.1),
      o.connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.13));
  },
  mv = (l, i, s) => {
    (xt(l, i, 'sawtooth', 200, s, 0.3, 0.01, 0.35, 80),
      xt(l, i, 'triangle', 600, s + 0.05, 0.22, 0.01, 0.3, 1200),
      xt(l, i, 'triangle', 1200, s + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  hv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(1600, s),
      o.frequency.exponentialRampToValueAtTime(700, s + 0.08),
      (d.type = 'highpass'),
      (d.frequency.value = 800),
      Aa(f, s, 0.22, 0.003, 0.09),
      o.connect(d).connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.12));
  },
  pv = (l, i, s) => {
    (xt(l, i, 'sine', 130, s, 0.5, 0.01, 0.28, 40),
      Ta(l, i, 0.12, s, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  yv = (l, i, s) => {
    (Ta(l, i, 0.18, s, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      xt(l, i, 'triangle', 2200, s, 0.15, 0.002, 0.06, 1800));
  },
  gv = (l, i, s) => {
    const o = l.createOscillator(),
      f = l.createGain(),
      d = l.createBiquadFilter();
    ((o.type = 'square'),
      o.frequency.setValueAtTime(900, s),
      o.frequency.exponentialRampToValueAtTime(1400, s + 0.05),
      (d.type = 'bandpass'),
      (d.frequency.value = 1500),
      (d.Q.value = 3),
      Aa(f, s, 0.18, 0.002, 0.07),
      o.connect(d).connect(f).connect(i),
      o.start(s),
      o.stop(s + 0.1),
      Ta(l, i, 0.05, s, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  vv = (l, i, s) => {
    (xt(l, i, 'triangle', 700, s, 0.18, 0.005, 0.05),
      xt(l, i, 'triangle', 1050, s + 0.04, 0.18, 0.005, 0.06));
  },
  _v = {
    laserShoot: hv,
    cannonShoot: pv,
    thunderShoot: yv,
    cutterShoot: gv,
    weaponSwitch: vv,
    activeLaser: Kg,
    activeCannon: Qg,
    activeThunder: Wg,
    activeCutter: Jg,
    enemyKill: Fg,
    bossWarn: Ig,
    bossKill: Pg,
    machineHit: tv,
    machineDown: ev,
    waveClear: av,
    tierClear: nv,
    tap: sv,
    purchaseOk: ov,
    reject: rv,
    tabSwitch: uv,
    dialogOpen: fv,
    dialogClose: dv,
    launch: mv,
    resultClear: lv,
    resultGameOver: iv,
    resultRetreat: cv,
  },
  bv = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function bh(l) {
  return Math.max(0, Math.min(1, l));
}
class Sv {
  constructor() {
    ba(this, 'ctx', null);
    ba(this, 'seGain', null);
    ba(this, 'bgmGain', null);
    ba(this, 'masterGain', null);
    ba(this, 'lastPlayAt', new Map());
    ba(this, 'seVolume', 0.7);
    ba(this, 'bgmVolume', 0.5);
    ba(this, 'currentBgm', null);
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
      o = bv[i];
    if (o !== void 0) {
      const d = this.lastPlayAt.get(i) ?? 0;
      if (s - d < o) return;
      this.lastPlayAt.set(i, s);
    }
    const f = _v[i];
    f(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(i) {
    ((this.seVolume = bh(i)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(i) {
    ((this.bgmVolume = bh(i)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
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
    const s = Zg(i, this.ctx, this.bgmGain);
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
const Ft = new Sv(),
  xv = '_content_11wqi_1',
  jv = { content: xv },
  Av = '_tabBar_rhd8d_2',
  Tv = '_fullWidth_rhd8d_9',
  Mv = '_tab_rhd8d_2',
  Ev = '_tabActive_rhd8d_54',
  wv = '_tabDisabled_rhd8d_101',
  Nv = '_tabIcon_rhd8d_107',
  zv = '_tabLabel_rhd8d_114',
  Cv = '_badge_rhd8d_119',
  Rv = '_badgeActive_rhd8d_137',
  Ov = '_indicator_rhd8d_158',
  Pe = {
    tabBar: Av,
    fullWidth: Tv,
    tab: Mv,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: Ev,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: wv,
    tabIcon: Nv,
    tabLabel: zv,
    badge: Cv,
    badgeActive: Rv,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Ov,
  },
  Dv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Bv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Lv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  $v = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Hv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  kv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Uv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  qv = { screw: kv, bolt: Bv, alloy: Dv, laser: Hv, cannon: Lv, thunder: Uv, cutter: $v };
function Vv(l, i) {
  return l.replace(/\swidth="\d+"/, ` width="${i}"`).replace(/\sheight="\d+"/, ` height="${i}"`);
}
function Yt({ name: l, size: i = 16, color: s = 'currentColor', className: o }) {
  const f = qv[l];
  if (f)
    return u.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: s, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: Vv(f, i) },
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
        Pe.tabBar,
        Pe[`variant-${o}`],
        Pe[`size-${f}`],
        Pe[`align-${m}`],
        d ? Pe.fullWidth : '',
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
              className: [Pe.tab, b ? Pe.tabActive : '', _.disabled === !0 ? Pe.tabDisabled : '']
                .filter(Boolean)
                .join(' '),
              onClick: () => {
                _.disabled !== !0 && s(_.key);
              },
              children: [
                _.iconName != null &&
                  u.jsx('span', {
                    className: Pe.tabIcon,
                    'aria-hidden': 'true',
                    children: u.jsx(Yt, { name: _.iconName, size: f === 'sm' ? 12 : 14 }),
                  }),
                u.jsx('span', { className: Pe.tabLabel, children: _.label }),
                _.badge != null &&
                  u.jsx('span', {
                    className: [Pe.badge, b ? Pe.badgeActive : ''].filter(Boolean).join(' '),
                    children: _.badge,
                  }),
              ],
            },
            _.key
          );
        }),
        o === 'underline' &&
          u.jsx('span', {
            className: Pe.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${g.left}px)`, width: g.width },
          }),
      ],
    })
  );
}
const Gv = '_shell_ka520_6',
  Yv = '_header_ka520_19',
  Zv = '_main_ka520_32',
  Xv = '_noScroll_ka520_43',
  Kv = '_footer_ka520_48',
  Qv = '_battle_ka520_61',
  mi = { shell: Gv, header: Yv, main: Zv, noScroll: Xv, footer: Kv, battle: Qv };
function El({ header: l, footer: i, children: s, noScroll: o = !1, variant: f = 'default' }) {
  return u.jsxs('div', {
    className: [mi.shell, f === 'battle' ? mi.battle : ''].filter(Boolean).join(' '),
    children: [
      l != null && u.jsx('header', { className: mi.header, children: l }),
      u.jsx('main', {
        className: [mi.main, o ? mi.noScroll : ''].filter(Boolean).join(' '),
        children: s,
      }),
      i != null && u.jsx('footer', { className: mi.footer, children: i }),
    ],
  });
}
const Wv = '_nav_4erx0_2',
  Jv = '_tab_4erx0_10',
  Fv = '_active_4erx0_33',
  Iv = '_iconWrap_4erx0_38',
  Pv = '_badge_4erx0_51',
  Sc = { nav: Wv, tab: Jv, active: Fv, iconWrap: Iv, badge: Pv },
  t_ = '_text_1wy1n_1',
  e_ = '_variant_heading_1_1wy1n_6',
  a_ = '_variant_heading_2_1wy1n_15',
  n_ = '_variant_heading_3_1wy1n_24',
  l_ = '_variant_body_1wy1n_33',
  i_ = '_variant_caption_1wy1n_41',
  c_ = '_variant_label_1wy1n_49',
  s_ = '_variant_numeric_l_1wy1n_58',
  o_ = '_variant_numeric_m_1wy1n_67',
  r_ = '_variant_numeric_s_1wy1n_76',
  u_ = '_color_default_1wy1n_85',
  f_ = '_color_mid_1wy1n_89',
  d_ = '_color_dim_1wy1n_93',
  m_ = '_color_disabled_1wy1n_97',
  h_ = '_color_primary_1wy1n_101',
  p_ = '_color_secondary_1wy1n_105',
  y_ = '_color_danger_1wy1n_109',
  g_ = '_color_success_1wy1n_113',
  v_ = '_color_warning_1wy1n_117',
  __ = '_truncate_1wy1n_121',
  b_ = '_align_left_1wy1n_128',
  S_ = '_align_center_1wy1n_132',
  x_ = '_align_right_1wy1n_136',
  xc = {
    text: t_,
    variant_heading_1: e_,
    variant_heading_2: a_,
    variant_heading_3: n_,
    variant_body: l_,
    variant_caption: i_,
    variant_label: c_,
    variant_numeric_l: s_,
    variant_numeric_m: o_,
    variant_numeric_s: r_,
    color_default: u_,
    color_mid: f_,
    color_dim: d_,
    color_disabled: m_,
    color_primary: h_,
    color_secondary: p_,
    color_danger: y_,
    color_success: g_,
    color_warning: v_,
    truncate: __,
    align_left: b_,
    align_center: S_,
    align_right: x_,
  };
function j_(l) {
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
function X({
  variant: l = 'body',
  children: i,
  as: s,
  color: o = 'default',
  className: f,
  truncate: d,
  align: m,
  style: p,
}) {
  const g = s ?? j_(l),
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
const A_ = [
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
    children: A_.map(({ key: o, label: f, iconName: d }) => {
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
                u.jsx(Yt, {
                  name: d,
                  size: 22,
                  color: m ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                p != null &&
                  u.jsx('span', { className: Sc.badge, 'aria-hidden': 'true', children: p }),
              ],
            }),
            u.jsx(X, { variant: 'caption', color: m ? 'primary' : 'dim', children: f }),
          ],
        },
        o
      );
    }),
  });
}
const T_ = '_root_kv5uk_2',
  M_ = '_titleRow_kv5uk_8',
  E_ = '_left_kv5uk_17',
  w_ = '_center_kv5uk_24',
  N_ = '_right_kv5uk_33',
  z_ = '_currencies_kv5uk_42',
  C_ = '_actions_kv5uk_49',
  R_ = '_tabBarSlot_kv5uk_56',
  Bn = {
    root: T_,
    titleRow: M_,
    left: E_,
    center: w_,
    right: N_,
    currencies: z_,
    actions: C_,
    tabBarSlot: R_,
  },
  O_ = '_root_i843c_2',
  D_ = '_icon_i843c_10',
  B_ = '_delta_i843c_30',
  L_ = '_deltaSm_i843c_37',
  $_ = '_deltaMd_i843c_41',
  H_ = '_deltaLg_i843c_45',
  k_ = '_subtle_i843c_50',
  U_ = '_currencyLabel_i843c_55',
  q_ = '_rankStamp_i843c_64',
  Oa = {
    root: O_,
    icon: D_,
    delta: B_,
    deltaSm: L_,
    deltaMd: $_,
    deltaLg: H_,
    subtle: k_,
    currencyLabel: U_,
    rankStamp: q_,
  },
  V_ = '_root_1wxcz_1',
  G_ = '_sizeSm_1wxcz_13',
  Y_ = '_sizeMd_1wxcz_17',
  Z_ = '_sizeLg_1wxcz_21',
  X_ = '_sizeXl_1wxcz_25',
  K_ = '_affix_1wxcz_29',
  gl = { root: V_, sizeSm: G_, sizeMd: Y_, sizeLg: Z_, sizeXl: X_, affix: K_ };
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
function Q_(l, i) {
  for (; i !== 0; ) {
    const s = i;
    ((i = l % i), (l = s));
  }
  return l;
}
function W_(l) {
  const i = l.toString(),
    s = i.indexOf('.');
  if (s === -1) return { num: Math.round(l), den: 1 };
  const o = i.length - s - 1,
    f = Math.pow(10, o),
    d = Math.round(l * f),
    m = Q_(Math.abs(d), f);
  return { num: d / m, den: f / m };
}
function J_(l) {
  let i = '',
    s = l;
  for (; s > 0; )
    ((s -= 1), (i = String.fromCharCode(65 + (s % 26)) + i), (s = Math.floor(s / 26)));
  return i;
}
const De = class De {
  constructor(i) {
    ba(this, 'digits');
    this.digits = i;
  }
  static fromNumber(i) {
    if (i <= 0) return De.ZERO;
    const s = [];
    let o = Math.floor(i);
    for (; o > 0; ) (s.push(o % 1e3), (o = Math.floor(o / 1e3)));
    return new De(Yu(s));
  }
  static fromString(i) {
    const s = i.trim();
    if (s === '' || s === '0') return De.ZERO;
    const o = [];
    let f = s.length;
    for (; f > 0; ) {
      const d = Math.max(0, f - 3);
      (o.push(parseInt(s.slice(d, f), 10)), (f = d));
    }
    return new De(Yu(o));
  }
  static fromJSON(i) {
    return new De(jc([...i]));
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
    return (m > 0 && d.push(m), new De(jc(d)));
  }
  sub(i) {
    if (this.compare(i) <= 0) return De.ZERO;
    const s = this.digits,
      o = i.digits,
      f = new Array(s.length).fill(0);
    let d = 0;
    for (let m = 0; m < s.length; m++) {
      let p = (s[m] ?? 0) - (o[m] ?? 0) - d;
      (p < 0 ? ((p += 1e3), (d = 1)) : (d = 0), (f[m] = p));
    }
    return new De(jc(f));
  }
  mulInt(i) {
    if (i <= 0 || this.isZero()) return De.ZERO;
    const s = this.digits,
      o = new Array(s.length).fill(0);
    let f = 0;
    for (let d = 0; d < s.length; d++) {
      const m = s[d] * i + f;
      ((o[d] = m % 1e3), (f = Math.floor(m / 1e3)));
    }
    for (; f > 0; ) (o.push(f % 1e3), (f = Math.floor(f / 1e3)));
    return new De(jc(o));
  }
  divInt(i) {
    if (i <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return De.ZERO;
    const s = this.digits,
      o = new Array(s.length).fill(0);
    let f = 0;
    for (let d = s.length - 1; d >= 0; d--) {
      const m = f * 1e3 + (s[d] ?? 0);
      ((o[d] = Math.floor(m / i)), (f = m % i));
    }
    return (f > 0 && (o[0] += 1), new De(jc(o)));
  }
  mulRational(i, s) {
    return this.mulInt(i).divInt(s);
  }
  mulNumber(i) {
    const { num: s, den: o } = W_(i);
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
      f = J_(o),
      d = this.digits[i - 2] ?? 0,
      m = Math.floor(d / 10);
    return `${s}.${String(m).padStart(2, '0')}${f}`;
  }
};
ba(De, 'ZERO', new De([]));
let W = De;
function F_(l) {
  if (l === '') return 0;
  let i = 0;
  for (let s = 0; s < l.length; s++) i = i * 26 + (l.charCodeAt(s) - 65 + 1);
  return i;
}
function I_(l) {
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
function P_(l) {
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
function tb(l) {
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
function Vn({
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
    A = F_(b);
  let E, T;
  if (s === 'scale') {
    const G = I_(A);
    ((E = G.color), (T = o ? G.glow : void 0));
  } else ((E = P_(s)), (T = o ? tb(s) : void 0));
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
  ab = { sm: 12, md: 16, lg: 22, xl: 28 };
function nb({ delta: l, sizeClass: i }) {
  const s = l === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return u.jsx('span', {
    className: `${Oa.delta} ${i}`,
    style: { color: s },
    'aria-hidden': 'true',
    children: l,
  });
}
function Ai({
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
    y = eb[l],
    _ = d ? 'var(--c-text-disabled)' : `var(${y.cssVar})`,
    b = o && !d ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: _ },
    A = { sm: Oa.deltaSm, md: Oa.deltaMd, lg: Oa.deltaLg, xl: Oa.deltaLg }[s],
    E = u.jsx(Yt, { name: l, size: ab[s], color: _, className: Oa.icon }),
    T = u.jsxs(u.Fragment, {
      children: [
        o !== void 0 && !d && u.jsx(nb, { delta: o, sizeClass: A }),
        u.jsx(Vn, { value: g, size: s, accentColor: 'primary', style: b }),
      ],
    });
  return u.jsxs('span', {
    className: [Oa.root, d ? Oa.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${y.label} ${g.toDisplay()}`,
    children: [
      m === 'end'
        ? u.jsxs(u.Fragment, { children: [T, E] })
        : u.jsxs(u.Fragment, { children: [E, T] }),
      f && u.jsx('span', { className: Oa.currencyLabel, 'aria-hidden': 'true', children: y.label }),
      p !== void 0 &&
        p !== '' &&
        u.jsx('span', {
          className: Oa.rankStamp,
          'data-rank': p,
          'aria-label': `rank ${p}`,
          children: p,
        }),
    ],
  });
}
const lb = '_iconButton_1fyi8_1',
  ib = '_round_1fyi8_23',
  cb = '_active_1fyi8_85',
  sb = '_iconWrap_1fyi8_113',
  hi = {
    iconButton: lb,
    round: ib,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: cb,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: sb,
  },
  ob = { sm: 14, md: 18, lg: 22 };
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
    y = typeof l == 'string' ? u.jsx(Yt, { name: l, size: ob[s] }) : l;
  return u.jsx('button', {
    type: 'button',
    className: [
      hi.iconButton,
      hi[`variant-${g}`],
      hi[`size-${s}`],
      f === 'round' ? hi.round : '',
      d ? hi.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: m,
    onClick: p,
    'aria-label': i,
    'aria-pressed': d,
    'aria-disabled': m,
    children: u.jsx('span', { className: hi.iconWrap, 'aria-hidden': 'true', children: y }),
  });
}
const Sh = (l) => {
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
  rb = (l) => (l ? Sh(l) : Sh),
  ub = (l) => l;
function fb(l, i = ub) {
  const s = Fs.useSyncExternalStore(
    l.subscribe,
    Fs.useCallback(() => i(l.getState()), [l, i]),
    Fs.useCallback(() => i(l.getInitialState()), [l, i])
  );
  return (Fs.useDebugValue(s), s);
}
const db = (l) => {
    const i = rb(l),
      s = (o) => fb(i, o);
    return (Object.assign(s, i), s);
  },
  mb = (l) => db,
  a1 = [
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
function cf(l, i) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, i));
}
function un(l) {
  return 1 + 0.1 * l;
}
function n1(l, i, s) {
  let o = 0;
  for (let f = 0; f < s; f++) o += cf(l, i + f);
  return o;
}
function l1(l, i, s) {
  let o = W.ZERO,
    f = 0;
  for (;;) {
    const d = W.fromNumber(cf(l, i + f)),
      m = o.add(d);
    if (m.gt(s) || ((o = m), f++, f >= 1e4)) break;
  }
  return { lvDelta: f, totalCost: o };
}
const Zu = 3,
  sf = 60,
  xh = {
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
function hb(l, i, s) {
  return l.lt(i) ? i : l.gt(s) ? s : l;
}
const pb = (l, i) => ({
    ...xh,
    startRun: ({ initialWeapon: s, baseMachineMaxHp: o }) => {
      i().resetRunWorkshop();
      const f = i().runWorkshopLevels.hpMul,
        d = un(f),
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
        activeCdSec: sf,
        isAutoActive: !1,
        isPaused: !1,
        runStartBolt: p.bolt,
        runStartAlloy: p.alloy,
      });
    },
    endRun: () => {
      (l(xh), i().resetRunWorkshop());
    },
    addScrew: (s) => l((o) => ({ screw: o.screw.add(s) })),
    spendScrew: (s) => {
      const o = i().screw;
      return o.lt(s) ? !1 : (l({ screw: o.sub(s) }), !0);
    },
    setMachineHp: (s) => l((o) => ({ machineHp: hb(s, W.ZERO, o.machineMaxHp) })),
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
        g = o.baseMachineMaxHp.mulNumber(un(s)),
        y = g.sub(p),
        _ = y.lt(W.ZERO) ? W.ZERO : y;
      l({ machineMaxHp: g, machineHp: _ });
    },
    advanceWave: () => l((s) => ({ currentWave: s.currentWave + 1 })),
    advanceTier: () => l((s) => ({ currentTier: s.currentTier + 1, currentWave: 1 })),
    switchWeapon: (s) => {
      const o = i();
      o.weaponSwitchCdSec > 0 ||
        (o.currentWeapon !== s && l({ currentWeapon: s, weaponSwitchCdSec: Zu }));
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
  yb = { bolt: W.ZERO, alloy: W.ZERO },
  gb = (l, i) => ({
    ...yb,
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
  xi = 6,
  vb = { equippedPatches: new Map() },
  _b = (l, i) => ({
    ...vb,
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
  i1 = 'tower-like-game',
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
  c1 = {
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
  s1 = { id: 'singleton', bolt: [], alloy: [] },
  o1 = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  r1 = { id: 'singleton', bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 };
function u1() {
  return Object.fromEntries(ro.map((l) => [l, 0]));
}
const bb = { machineLevels: u1() },
  Sb = (l) => ({
    ...bb,
    incrementMachineLv: (i) =>
      l((s) => ({ machineLevels: { ...s.machineLevels, [i]: s.machineLevels[i] + 1 } })),
    setMachineLv: (i, s) => l((o) => ({ machineLevels: { ...o.machineLevels, [i]: s } })),
    resetMachine: () => l({ machineLevels: u1() }),
  });
function Xu(l, i) {
  return `${l}#${i}`;
}
const xb = { patches: new Map() },
  jb = (l, i) => ({
    ...xb,
    addPatch: (s, o, f = 1) => {
      const d = Xu(s, o);
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
      const d = Xu(s, o),
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
  jh = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  Ab = (l) => ({
    ...jh,
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
    resetProfile: (i) => l({ ...jh, createdAt: i, lastPlayedAt: i }),
  }),
  f1 = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
  Tb = { runWorkshopLevels: f1 },
  Mb = (l, i) => ({
    ...Tb,
    upgradeRunWorkshop: (s, o) => {
      const f = a1.find((_) => _.key === s);
      if (f == null) return !1;
      const d = i().runWorkshopLevels[s];
      let m, p;
      if (o === 'max') {
        const _ = l1(f, d, i().screw);
        if (_.lvDelta === 0) return !1;
        ((m = _.lvDelta), (p = _.totalCost));
      } else ((m = o), (p = W.fromNumber(n1(f, d, o))));
      if (!i().spendScrew(p)) return !1;
      const y = d + m;
      return (
        l((_) => ({ runWorkshopLevels: { ..._.runWorkshopLevels, [s]: y } })),
        s === 'hpMul' && i().recalcMachineMaxHpFromHpMul(y),
        !0
      );
    },
    resetRunWorkshop: () => l({ runWorkshopLevels: f1 }),
  }),
  Ah = { bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  Eb = (l) => ({
    ...Ah,
    setBgmVolume: (i) => l({ bgmVolume: Math.max(0, Math.min(1, i)) }),
    setSeVolume: (i) => l({ seVolume: Math.max(0, Math.min(1, i)) }),
    setVibrationEnabled: (i) => l({ vibrationEnabled: i }),
    resetSettings: () => l(Ah),
  }),
  Th = { weaponLv: 0, initialWeapon: 'laser' },
  wb = (l) => ({
    ...Th,
    incrementWeaponLv: () => l((i) => ({ weaponLv: i.weaponLv + 1 })),
    setWeaponLv: (i) => l({ weaponLv: i }),
    setInitialWeapon: (i) => l({ initialWeapon: i }),
    resetWeapons: () => l(Th),
  }),
  V = mb()((...l) => ({
    ...Ab(...l),
    ...gb(...l),
    ...Sb(...l),
    ...wb(...l),
    ...jb(...l),
    ..._b(...l),
    ...Eb(...l),
    ...pb(...l),
    ...Mb(...l),
  }));
function Lc({ title: l, subtitle: i, onBack: s, currencies: o, tabBar: f, actions: d }) {
  const m = V((A) => A.bolt),
    p = V((A) => A.alloy),
    g = V((A) => A.screw),
    y = V((A) => A.isRunActive),
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
    className: Bn.root,
    children: [
      u.jsxs('div', {
        className: Bn.titleRow,
        children: [
          u.jsx('div', {
            className: Bn.left,
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
            className: Bn.center,
            children: [
              u.jsx(X, { variant: 'heading-3', truncate: !0, align: 'center', children: l }),
              i != null &&
                u.jsx(X, { variant: 'caption', color: 'dim', align: 'center', children: i }),
            ],
          }),
          u.jsxs('div', {
            className: Bn.right,
            children: [
              _.length > 0 &&
                u.jsx('div', {
                  className: Bn.currencies,
                  children: _.map((A) => u.jsx(Ai, { currency: A, value: b(A), size: 'sm' }, A)),
                }),
              d != null && u.jsx('div', { className: Bn.actions, children: d }),
            ],
          }),
        ],
      }),
      f != null && u.jsx('div', { className: Bn.tabBarSlot, children: f }),
    ],
  });
}
const Nb = '_tab_1nc83_3',
  zb = { tab: Nb },
  Cb = '_wrapper_1opqp_3',
  Rb = '_active_1opqp_12',
  Ob = '_card_1opqp_12',
  Db = '_locked_1opqp_18',
  Bb = '_tall_1opqp_34',
  Lb = '_iconTile_1opqp_37',
  $b = '_headerText_1opqp_42',
  Hb = '_description_1opqp_45',
  kb = '_name_1opqp_48',
  Ub = '_wide_1opqp_53',
  qb = '_body_1opqp_61',
  Vb = '_header_1opqp_42',
  Gb = '_statGrid_1opqp_121',
  Yb = '_statChip_1opqp_129',
  Zb = '_statLabel_1opqp_140',
  Xb = '_statValue_1opqp_147',
  Kb = '_lockedBadge_1opqp_158',
  ze = {
    wrapper: Cb,
    active: Rb,
    card: Ob,
    locked: Db,
    tall: Bb,
    iconTile: Lb,
    headerText: $b,
    description: Hb,
    name: kb,
    wide: Ub,
    body: qb,
    header: Vb,
    statGrid: Gb,
    statChip: Yb,
    statLabel: Zb,
    statValue: Xb,
    lockedBadge: Kb,
  },
  Qb = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function d1({
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
    className: [ze.wrapper, d ? ze.active : '', m ? ze.locked : '', g ? ze.wide : ze.tall]
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
      className: ze.card,
      style: y ? { cursor: 'pointer' } : void 0,
      children: [
        u.jsx('div', {
          className: ze.iconTile,
          'aria-hidden': !0,
          children: u.jsx(Yt, { name: l, size: g ? 40 : 52 }),
        }),
        u.jsxs('div', {
          className: ze.body,
          children: [
            u.jsx('div', {
              className: ze.header,
              children: u.jsxs('div', {
                className: ze.headerText,
                children: [
                  u.jsx('span', { className: ze.name, children: i }),
                  s != null &&
                    s.length > 0 &&
                    u.jsx('span', { className: ze.description, children: s }),
                ],
              }),
            }),
            !m &&
              o.length > 0 &&
              u.jsx('div', {
                className: ze.statGrid,
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
                      className: ze.statChip,
                      children: [
                        u.jsx('span', { className: ze.statLabel, children: _.label }),
                        u.jsx('span', {
                          className: ze.statValue,
                          style: _.accent != null ? { color: Qb[_.accent] } : void 0,
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
                className: ze.lockedBadge,
                children: [
                  u.jsx(Yt, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
                  u.jsx(X, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
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
  Mh = 1e-9;
function Wb(l, i, s) {
  const o = Math.ceil(l * Math.pow(i, s) - Mh),
    f = Math.ceil(l * Math.pow(i, s - 1) - Mh);
  return Math.max(1, o - f);
}
function Tl(l, i) {
  switch (l.growthType) {
    case 'multiply': {
      let s = Math.ceil(l.baseValue);
      for (let o = 1; o <= i; o++) s += Wb(l.baseValue, l.growthFactor, o);
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
function of(l, i) {
  return Math.ceil(l.baseCost * Math.pow(l.costGrowth, i));
}
function Ou(l, i, s) {
  let o = 0;
  for (let f = 0; f < s && !(l.maxLv != null && i + f >= l.maxLv); f++) o += of(l, i + f);
  return o;
}
function Jb(l, i, s) {
  let o = 0,
    f = s,
    d = i;
  for (let m = 0; m < 1e4 && !(l.maxLv != null && d >= l.maxLv); m++) {
    const p = W.fromNumber(of(l, d));
    if (f.lt(p)) break;
    ((f = f.sub(p)), (d += 1), (o += 1));
  }
  return o;
}
function m1(l, i) {
  if (l.isZero()) return W.ZERO;
  if (i <= 0) return l;
  if (i >= 1) return W.ZERO;
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
    g = m1(p, s);
  return { rawDmg: m, finalDmg: g, isCrit: d };
}
function Fb(l, i) {
  const s = l.sub(i.defense);
  return m1(s, i.damageReduction);
}
const Ib = 0.5,
  Pb = 2,
  t2 = 30,
  e2 = 25,
  h1 = 5,
  a2 = 360 / h1,
  n2 = 3,
  l2 = 20;
function fo(l) {
  const i = Math.max(0, Math.floor(l)),
    s = Pb * Math.pow(1.02, i),
    o = Math.min(10, Ib * (1 + 0.03 * i)),
    f = t2 + 0.5 * i,
    d = l2 * (1 + 0.05 * i);
  return {
    attackPerSec: o,
    splashRadius: f,
    damageMul: s,
    volleyCdSec: e2,
    volleyDamageMul: d,
    volleyShots: h1,
  };
}
function ji(l, i, s, o) {
  const f = l - s,
    d = i - o;
  return Math.sqrt(f * f + d * d);
}
function i2(l, i, s, o) {
  if (s.length === 0) return { hits: [], blastX: 50, blastY: 50 };
  const f = 50,
    d = 50;
  let m = s[0],
    p = ji(f, d, m.position.x, m.position.y);
  for (let A = 1; A < s.length; A++) {
    const E = s[A],
      T = ji(f, d, E.position.x, E.position.y);
    T < p && ((p = T), (m = E));
  }
  const g = m.position.x,
    y = m.position.y,
    _ = uo(l.critRate, o),
    b = [];
  for (const A of s)
    if (ji(g, y, A.position.x, A.position.y) <= i.splashRadius) {
      const T = wl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: _ }, W.ZERO, 0);
      b.push({ enemyId: A.id, damage: T.finalDmg, crit: _ });
    }
  return { hits: b, blastX: g, blastY: y };
}
function c2(l, i, s, o) {
  let m = 0;
  if (s.length > 0) {
    let b = s[0],
      A = ji(50, 50, b.position.x, b.position.y);
    for (let D = 1; D < s.length; D++) {
      const R = s[D],
        G = ji(50, 50, R.position.x, R.position.y);
      G < A && ((A = G), (b = R));
    }
    const E = b.position.x - 50,
      T = b.position.y - 50;
    m = (Math.atan2(T, E) * 180) / Math.PI;
  }
  const g = (a2 * i.volleyShots) / i.volleyShots,
    y = i.splashRadius * n2,
    _ = [];
  for (let b = 0; b < i.volleyShots; b++) {
    const E = ((m + g * b) * Math.PI) / 180,
      T = Math.cos(E),
      D = Math.sin(E);
    let R = null,
      G = -1 / 0;
    for (const pt of s) {
      const Mt = pt.position.x - 50,
        at = pt.position.y - 50,
        Ot = Mt * T + at * D;
      Ot > 0 && Ot > G && ((G = Ot), (R = pt));
    }
    let Y, ct;
    R !== null
      ? ((Y = R.position.x), (ct = R.position.y))
      : ((Y = 50 + T * 100), (ct = 50 + D * 100));
    const U = [];
    for (const pt of s)
      if (ji(Y, ct, pt.position.x, pt.position.y) <= y) {
        const at = wl(
          { machine: l, weapon: { damageMultiplier: i.damageMul * i.volleyDamageMul }, isCrit: !1 },
          W.ZERO,
          0
        );
        U.push({ enemyId: pt.id, damage: at.finalDmg });
      }
    _.push({ targetEnemyId: (R == null ? void 0 : R.id) ?? null, blastX: Y, blastY: ct, hits: U });
  }
  return { shots: _ };
}
const s2 = 2.5,
  o2 = 80,
  r2 = 1,
  u2 = 1.2;
function $c(l) {
  const i = s2 * (1 + 0.03 * l),
    s = o2 + 0.5 * l,
    o = Math.floor(r2 + 0.05 * l),
    f = u2 * Math.pow(1.02, l);
  return {
    attackPerSec: i,
    orbitRadius: s,
    simultaneousHits: o,
    damageMul: f,
    overdriveCdSec: f2,
    overdriveDurationSec: d2,
    overdriveAttackSpeedMul: p1,
    overdriveDamageMul: 1,
  };
}
const f2 = 35,
  d2 = 8,
  p1 = 3;
function m2(l, i) {
  return l <= 0 ? Number.POSITIVE_INFINITY : (i / l) * 1e3;
}
function h2(l, i, s) {
  const o = (p) => ((p % 360) + 360) % 360,
    f = o(l),
    d = o(i);
  return o(f - d) <= s;
}
function p2(l, i, s, o, f, d = 2, m = 50, p = 50) {
  const g = 360 / d,
    y = [];
  for (let T = 0; T < d; T++) y.push(o + T * g);
  const A = s
      .filter((T) => {
        const D = T.position.x - m,
          R = T.position.y - p,
          G = (Math.atan2(R, D) * 180) / Math.PI;
        return y.some((Y) => h2(G, Y, g));
      })
      .slice(0, i.simultaneousHits)
      .map((T) => {
        const D = uo(l.critRate, f),
          R = wl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: D }, W.ZERO, 0);
        return { enemyId: T.id, damage: R.finalDmg, crit: D };
      }),
    E = (((o + g) % 360) + 360) % 360;
  return { hits: A, angle: E };
}
function y2(l) {
  return {
    active: !0,
    remainingSec: l.overdriveDurationSec,
    attackSpeedMul: l.overdriveAttackSpeedMul,
    damageMul: l.overdriveDamageMul,
  };
}
function g2(l, i) {
  if (!l.active) return l;
  const s = l.remainingSec - i;
  return s <= 0
    ? { active: !1, remainingSec: 0, attackSpeedMul: 1, damageMul: 1 }
    : { ...l, remainingSec: s };
}
const v2 = 2.5,
  _2 = 0.4;
function mo(l) {
  const i = Math.max(0, l),
    s = v2 * (1 + 0.03 * i),
    o = Math.floor(1 + 0.1 * i),
    f = _2 * Math.pow(1.02, i),
    d = 10 * (1 + 0.05 * i);
  return { attackPerSec: s, pierce: o, damageMul: f, megaCdSec: b2, megaDamageMul: d };
}
const b2 = 20;
function S2(l, i, s, o) {
  if (s.length === 0) return { hits: [], beamX: 0, beamY: 0 };
  const f = s.slice(0, i.pierce),
    d = f.map((y) => {
      const _ = uo(l.critRate, o),
        b = wl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: _ }, W.ZERO, 0);
      return { enemyId: y.id, damage: b.finalDmg, crit: _ };
    }),
    m = f[f.length - 1],
    p = m.position.x,
    g = m.position.y;
  return { hits: d, beamX: p, beamY: g };
}
const x2 = 6;
function j2(l, i, s, o = 0, f = 50, d = 50, m = x2) {
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
    const G = -T * y + D * g;
    if (Math.abs(G) > _) continue;
    const Y = wl({ machine: l, weapon: { damageMultiplier: b }, isCrit: !1 }, W.ZERO, 0);
    A.push({ enemyId: E.id, damage: Y.finalDmg });
  }
  return { hits: A };
}
const A2 = 3,
  T2 = 0.9,
  M2 = 30,
  E2 = 0.18,
  w2 = 2.5;
function ho(l) {
  const i = Math.max(0, l),
    s = E2 * Math.pow(1.02, i),
    o = Math.min(10, w2 * (1 + 0.03 * i)),
    f = 15 * (1 + 0.05 * i);
  return {
    attackPerSec: o,
    chainCount: A2,
    chainFalloff: T2,
    damageMul: s,
    plasmaCdSec: M2,
    plasmaDamageMul: f,
  };
}
function N2(l, i, s, o) {
  if (s.length === 0) return { hits: [], path: [] };
  const f = s.slice(0, i.chainCount),
    d = [],
    m = [];
  for (const p of f) {
    const g = uo(l.critRate, o),
      y = wl({ machine: l, weapon: { damageMultiplier: i.damageMul }, isCrit: g }, W.ZERO, 0);
    (d.push({ enemyId: p.id, damage: y.finalDmg, crit: g }),
      m.push({ x: p.position.x, y: p.position.y }));
  }
  return { hits: d, path: m };
}
function z2(l, i, s) {
  if (s.length === 0) return { hits: [] };
  const o = [];
  for (let f = 0; f < s.length; f++) {
    const d = s[f],
      m = Math.pow(i.chainFalloff, f),
      p = i.damageMul * i.plasmaDamageMul * m,
      g = wl({ machine: l, weapon: { damageMultiplier: p }, isCrit: !1 }, W.ZERO, 0);
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
function y1(l) {
  const i = Mi.find((s) => s.key === 'baseAttack');
  return i != null ? Tl(i, l) : 1;
}
function g1(l) {
  const i = Mi.find((s) => s.key === 'range');
  return i != null ? Tl(i, l) : 150;
}
function v1(l, i, s) {
  const o = mo(l);
  return [
    { label: 'DMG', value: po(i, o.damageMul), accent: 'primary' },
    { label: '貫通', value: o.pierce },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Ti(o.attackPerSec), suffix: '/s' },
  ];
}
function _1(l, i, s) {
  const o = fo(l);
  return [
    { label: 'DMG', value: po(i, o.damageMul), accent: 'primary' },
    { label: '爆発半径', value: Ti(o.splashRadius), suffix: 'm' },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Ti(o.attackPerSec), suffix: '/s' },
  ];
}
function b1(l, i, s) {
  const o = ho(l);
  return [
    { label: 'DMG', value: po(i, o.damageMul), accent: 'primary' },
    { label: 'ターゲット数', value: o.chainCount },
    { label: '射程', value: s, suffix: 'm' },
    { label: '連射速度', value: Ti(o.attackPerSec), suffix: '/s' },
  ];
}
function S1(l, i) {
  const s = $c(l);
  return [
    { label: 'DMG', value: po(i, s.damageMul), accent: 'primary' },
    { label: '回転半径', value: Ti(s.orbitRadius), suffix: 'm' },
    { label: '刃の数', value: s.simultaneousHits },
    { label: '回転速度', value: Ti(s.attackPerSec), suffix: '/s' },
  ];
}
const C2 = [
  { kind: 'laser', name: 'LASER', description: '弾速が速く貫通する', buildStats: v1 },
  { kind: 'cannon', name: 'CANNON', description: '爆発時に範囲内にもダメージ', buildStats: _1 },
  { kind: 'thunder', name: 'THUNDER', description: '複数の敵を同時に攻撃', buildStats: b1 },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシンの周辺を回転する刃で攻撃',
    buildStats: (l, i) => S1(l, i),
  },
];
function R2() {
  const l = V((f) => f.weaponLv),
    i = V((f) => f.machineLevels),
    s = y1(i.baseAttack),
    o = g1(i.range);
  return u.jsx('div', {
    className: zb.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: C2.map((f) =>
      u.jsx(
        d1,
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
const O2 = '_tab_1oky8_3',
  D2 = '_topRow_1oky8_9',
  B2 = '_description_1oky8_15',
  L2 = '_previewCard_1oky8_21',
  $2 = '_previewLabel_1oky8_25',
  H2 = '_impactGrid_1oky8_32',
  k2 = '_impactRow_1oky8_37',
  U2 = '_impactRowBordered_1oky8_45',
  q2 = '_impactLabel_1oky8_49',
  V2 = '_impactValues_1oky8_55',
  G2 = '_arrow_1oky8_62',
  Sa = {
    tab: O2,
    topRow: D2,
    description: B2,
    previewCard: L2,
    previewLabel: $2,
    impactGrid: H2,
    impactRow: k2,
    impactRowBordered: U2,
    impactLabel: q2,
    impactValues: V2,
    arrow: G2,
  },
  Y2 = '_card_1403j_1',
  Z2 = '_interactive_1403j_97',
  Ac = {
    card: Y2,
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
    interactive: Z2,
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
const X2 = '_root_168oy_2',
  K2 = '_header_168oy_15',
  Q2 = '_iconWrap_168oy_22',
  W2 = '_title_168oy_34',
  J2 = '_lvBadge_168oy_47',
  F2 = '_description_168oy_60',
  I2 = '_valueRow_168oy_66',
  P2 = '_valueBefore_168oy_74',
  tS = '_valueAfter_168oy_83',
  eS = '_arrow_168oy_93',
  aS = '_buttons_168oy_100',
  nS = '_btnCol_168oy_105',
  lS = '_btn_168oy_105',
  iS = '_btnPrimary_168oy_132',
  cS = '_btnSecondary_168oy_139',
  sS = '_btnWarning_168oy_146',
  oS = '_costRow_168oy_172',
  rS = '_costNum_168oy_181',
  uS = '_costDisabled_168oy_190',
  he = {
    root: X2,
    header: K2,
    iconWrap: Q2,
    title: W2,
    lvBadge: J2,
    description: F2,
    valueRow: I2,
    valueBefore: P2,
    valueAfter: tS,
    arrow: eS,
    buttons: aS,
    btnCol: nS,
    btn: lS,
    btnPrimary: iS,
    btnSecondary: cS,
    btnWarning: sS,
    costRow: oS,
    costNum: rS,
    costDisabled: uS,
  },
  fS = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  dS = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  mS = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  hS = { primary: he.btnPrimary, secondary: he.btnSecondary, warning: he.btnWarning },
  pS = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function Du(l) {
  return l instanceof W ? l.toDisplay() : l.toLocaleString();
}
function rf({
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
  const E = y ?? mS[g],
    T = fS[E],
    D = o ?? T,
    R = hS[E],
    G = pS[E];
  return u.jsxs('div', {
    className: he.root,
    role: 'group',
    'aria-label': l,
    'data-maxed': b,
    children: [
      u.jsxs('div', {
        className: he.header,
        children: [
          s != null &&
            u.jsx('span', {
              className: he.iconWrap,
              children: u.jsx(Yt, { name: s, size: 14, color: D }),
            }),
          u.jsx('span', { className: he.title, children: l }),
          f != null &&
            !b &&
            u.jsx('span', {
              className: he.lvBadge,
              style: { color: T, boxShadow: dS[E] },
              children: f,
            }),
          b &&
            u.jsx('span', {
              className: he.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      i != null &&
        i.length > 0 &&
        u.jsx(X, { variant: 'caption', color: 'dim', className: he.description, children: i }),
      d != null &&
        u.jsxs('div', {
          className: he.valueRow,
          children: [
            u.jsxs('span', { className: he.valueBefore, children: [Du(d), p] }),
            m != null &&
              !b &&
              u.jsxs(u.Fragment, {
                children: [
                  u.jsx('span', { className: he.arrow, children: '→' }),
                  u.jsxs('span', {
                    className: he.valueAfter,
                    style: { color: T, textShadow: `0 0 5px ${G}` },
                    children: [Du(m), p],
                  }),
                ],
              }),
          ],
        }),
      !b &&
        _.length > 0 &&
        u.jsx('div', {
          className: he.buttons,
          style: { gridTemplateColumns: `repeat(${_.length}, 1fr)` },
          children: _.map((Y) => {
            const ct = Y.disabled === !0;
            return u.jsxs(
              'div',
              {
                className: he.btnCol,
                children: [
                  u.jsx('button', {
                    type: 'button',
                    className: `${he.btn} ${R}`,
                    disabled: ct,
                    onClick: ct ? void 0 : () => (A == null ? void 0 : A(Y.amount)),
                    children: Y.amount,
                  }),
                  u.jsx('div', {
                    className: he.costRow,
                    children: u.jsx('span', {
                      className: `${he.costNum} ${ct ? he.costDisabled : ''}`,
                      children: Du(Y.cost),
                    }),
                  }),
                ],
              },
              Y.amount
            );
          }),
        }),
    ],
  });
}
function uf(l) {
  const i = Math.ceil(200 * Math.pow(1.12, l));
  return W.fromNumber(i);
}
function Eh(l, i) {
  let s = W.ZERO;
  for (let o = 0; o < i; o++) s = s.add(uf(l + o));
  return s;
}
function yS(l, i) {
  let s = i,
    o = 0;
  for (;;) {
    const f = uf(l + o);
    if (s.lt(f) || ((s = s.sub(f)), o++, o > 1e4)) break;
  }
  return o;
}
function wh(l) {
  return Math.pow(1.02, l);
}
const Nh = { laser: 120 };
function gS(l) {
  const i = l + 1,
    s = wh(l),
    o = wh(i);
  return [
    { label: 'LASER DMG', before: Math.round(Nh.laser * s), after: Math.round(Nh.laser * o) },
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
function vS() {
  const l = V((T) => T.weaponLv),
    i = V((T) => T.alloy),
    s = V((T) => T.incrementWeaponLv),
    o = V((T) => T.setWeaponLv),
    f = V((T) => T.spendAlloy),
    d = uf(l),
    m = Eh(l, 5),
    p = yS(l, i),
    g = Eh(l, p),
    y = !i.lt(d),
    _ = p >= 5,
    b = p >= 1,
    A = gS(l);
  function E(T) {
    T === '+1'
      ? f(d) && s()
      : T === '+5'
        ? f(m) && o(l + 5)
        : T === 'MAX' && p > 0 && f(g) && o(l + p);
  }
  return u.jsxs('div', {
    className: Sa.tab,
    role: 'tabpanel',
    'aria-label': '武器強化',
    children: [
      u.jsxs('div', {
        className: Sa.topRow,
        children: [
          u.jsx(X, {
            variant: 'caption',
            color: 'mid',
            className: Sa.description,
            children: '全 4 武器に共通で効く強化です。',
          }),
          u.jsx(Ai, { currency: 'alloy', value: i, size: 'sm' }),
        ],
      }),
      u.jsx(rf, {
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
        className: Sa.previewCard,
        children: [
          u.jsx(X, {
            variant: 'label',
            color: 'dim',
            className: Sa.previewLabel,
            children: '次 Lv での効果プレビュー',
          }),
          u.jsx('div', {
            className: Sa.impactGrid,
            children: A.map((T, D) =>
              u.jsxs(
                'div',
                {
                  className: [Sa.impactRow, D > 0 ? Sa.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    u.jsx(X, {
                      variant: 'caption',
                      color: 'mid',
                      className: Sa.impactLabel,
                      children: T.label,
                    }),
                    u.jsxs('span', {
                      className: Sa.impactValues,
                      children: [
                        u.jsx(Vn, {
                          value: T.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: T.suffix,
                          decimals: T.suffix === 'm' ? 1 : 0,
                        }),
                        u.jsx('span', { className: Sa.arrow, children: '→' }),
                        u.jsx(Vn, {
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
const x1 = q.createContext(null);
function _S({ children: l, initialScreen: i }) {
  const [s, o] = q.useState(i ?? 'title'),
    f = q.useCallback((d) => {
      o(d);
    }, []);
  return u.jsx(x1.Provider, { value: { screen: s, navigate: f }, children: l });
}
function Gn() {
  const l = q.useContext(x1);
  if (!l) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return l;
}
const bS = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function SS(l = {}) {
  const { initialTab: i = 'details' } = l,
    [s, o] = q.useState(i),
    { screen: f, navigate: d } = Gn();
  return u.jsx(El, {
    header: u.jsx(Lc, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => d('preparation'),
      tabBar: u.jsx(oo, { tabs: bS, value: s, onChange: o, variant: 'underline', fullWidth: !0 }),
    }),
    footer: u.jsx(Bc, { active: f, onChange: (m) => d(m) }),
    children: u.jsxs('div', {
      className: jv.content,
      children: [s === 'details' && u.jsx(R2, {}), s === 'upgrade' && u.jsx(vS, {})],
    }),
  });
}
const xS = '_root_1ozz7_1',
  jS = '_battleFooter_1ozz7_10',
  AS = '_overlayLayer_1ozz7_14',
  Bu = { root: xS, battleFooter: jS, overlayLayer: AS },
  TS = {
    elite: { color: 'var(--c-warning)', label: 'ELITE', glow: '0 0 16px rgba(246,185,74,0.6)' },
    boss: { color: 'var(--c-danger)', label: 'BOSS', glow: '0 0 24px rgba(255,77,109,0.7)' },
    'battle-start': {
      color: 'var(--c-primary)',
      label: 'BATTLE START',
      glow: '0 0 20px rgba(80,220,255,0.7)',
    },
  };
function zh({ kind: l = 'elite', name: i, duration: s = 1600, onDone: o }) {
  const d = `app-${q.useId().replace(/:/g, '')}`,
    m = TS[l],
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
              u.jsx(X, {
                variant: 'label',
                className: `${d}-label`,
                style: { color: m.color, fontSize: 12, letterSpacing: '0.32em' },
                children: m.label,
              }),
              i != null &&
                i !== '' &&
                u.jsx(X, {
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
function MS({ waveNumber: l, duration: i = 1100, onDone: s }) {
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
            u.jsx(X, {
              variant: 'label',
              color: 'primary',
              style: { fontSize: 11 },
              children: 'WAVE',
            }),
            u.jsx(X, {
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
const ES = '_root_paca6_3',
  wS = '_field_paca6_21',
  NS = '_rangeCircle_paca6_35',
  zS = '_machine_paca6_46',
  CS = '_machineRingOuter_paca6_59',
  RS = '_pin_paca6_69',
  OS = '_enemy_paca6_79',
  vl = {
    root: ES,
    field: wS,
    rangeCircle: NS,
    machine: zS,
    machineRingOuter: CS,
    pin: RS,
    enemy: OS,
  },
  DS = '_wrap_14rhu_1',
  BS = { wrap: DS };
function LS({
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
        className: `${p}-wrap ${BS.wrap}`,
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
const $S = '_shell_g836j_1',
  HS = '_inner_g836j_8',
  kS = '_ball_g836j_14',
  US = '_highlight_g836j_23',
  Is = { shell: $S, inner: HS, ball: kS, highlight: US };
function qS({
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
const VS = '_svg_gil20_1',
  GS = { svg: VS };
function YS({
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
          G = R.x - D.x,
          Y = R.y - D.y,
          ct = Math.hypot(G, Y) || 1,
          U = -Y / ct,
          pt = G / ct;
        T === 0 && E.push(D);
        for (let Mt = 1; Mt < f; Mt++) {
          const at = Mt / f,
            Ot = D.x + G * at,
            ie = D.y + Y * at,
            Pt = (Math.random() - 0.5) * 2 * o;
          E.push({ x: Ot + U * Pt, y: ie + pt * Pt });
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
        className: GS.svg,
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
function ZS({
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
      const Y = setTimeout(y, g);
      return () => {
        clearTimeout(Y);
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
    R = (Y) =>
      `M 10 ${Y * 3.5} ` +
      Array.from({ length: 9 }, (ct, U) => {
        const pt = 10 + U * 10;
        return `L ${pt + 4} ${Y * 8} L ${pt + 8} ${Y * 3.5} `;
      }).join(''),
    G = [];
  for (let Y = 0; Y < f; Y++) {
    const ct = (360 / f) * Y,
      U = 30 * A,
      pt = (U * Math.PI) / 180,
      Mt = s * Math.cos(pt),
      at = s * Math.sin(pt),
      Ot = `M 0 0 L ${s} 0 A ${s} ${s} 0 0 ${U > 0 ? 1 : 0} ${Mt.toFixed(2)} ${at.toFixed(2)} Z`;
    (G.push(
      u.jsx(
        'svg',
        {
          className: `${b}-sweep`,
          viewBox: `0 0 ${s} ${s}`,
          style: { transform: `rotate(${ct - U}deg)`, transformOrigin: '0 0' },
          preserveAspectRatio: 'none',
          children: u.jsx('path', { d: Ot, fill: p, opacity: 0.18 }),
        },
        `sweep-${Y}`
      )
    ),
      G.push(
        u.jsxs(
          'svg',
          {
            className: `${b}-blade`,
            viewBox: '0 -10 100 20',
            style: { transform: `rotate(${ct}deg)` },
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
          `blade-${Y}`
        )
      ));
  }
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: D } }),
      u.jsxs('div', {
        className: `${b}-hub`,
        children: [u.jsx('div', { className: `${b}-orbit` }), G],
      }),
    ],
  });
}
const XS = '_root_14p1r_1',
  KS = { root: XS };
function QS({ value: l, x: i, y: s, crit: o = !1, duration: f = 800, onDone: d }) {
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
        className: `${m} ${KS.root}`,
        onAnimationEnd: d,
        children: u.jsx(Vn, {
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
const WS = '_wrap_14rhu_1',
  JS = { wrap: WS },
  Ch = 8;
function FS({ x: l, y: i, color: s = 'var(--c-text-mid)', duration: o = 480, onDone: f }) {
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
    g = Array.from({ length: Ch }, (y, _) =>
      u.jsx('div', { className: `${d}-shard`, style: { '--a': `${(_ * 360) / Ch}deg` } }, _)
    );
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      u.jsxs('div', {
        className: `${d}-wrap ${JS.wrap}`,
        style: { left: `${l}%`, top: `${i}%` },
        onAnimationEnd: f,
        children: [u.jsx('div', { className: `${d}-flash` }), g],
      }),
    ],
  });
}
const IS = '_wrap_14rhu_1',
  PS = { wrap: IS };
function tx({ x: l, y: i, color: s = 'var(--c-primary-hi)', duration: o = 220, onDone: f }) {
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
        className: `${d}-w ${PS.wrap}`,
        style: { left: `${l}%`, top: `${i}%` },
        onAnimationEnd: f,
        children: u.jsx('div', { className: `${d}-d` }),
      }),
    ],
  });
}
const ex = '_beam_14ieu_1',
  ax = { beam: ex };
function nx({
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
      u.jsx('div', { className: `${p} ${ax.beam}`, onAnimationEnd: m }),
    ],
  });
}
const lx = '_beam_14ieu_1',
  ix = { beam: lx };
function cx({
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
      u.jsx('div', { className: `${m} ${ix.beam}`, onAnimationEnd: d }),
    ],
  });
}
const sx = '_wrap_14rhu_1',
  ox = { wrap: sx };
function rx({ x: l, y: i, size: s = 80, color: o = 'var(--c-secondary)' }) {
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
        className: `${f}-w ${ox.wrap}`,
        children: [u.jsx('div', { className: `${f}-r1` }), u.jsx('div', { className: `${f}-r2` })],
      }),
    ],
  });
}
const ux = { screw: 'var(--c-screw)', bolt: 'var(--c-bolt)', alloy: 'var(--c-alloy)' };
function fx({ x: l, y: i, targetX: s, targetY: o, iconName: f, duration: d = 400, onDone: m }) {
  const g = `pk-${q.useId().replace(/:/g, '')}`,
    y = ux[f],
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
      u.jsx('div', { className: g, onAnimationEnd: m, children: u.jsx(Yt, { name: f, size: 18 }) }),
    ],
  });
}
function dx({
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
      for (let G = 1; G < d; G++) {
        const Y = s + R * G,
          ct = l + (Math.random() - 0.5) * 2 * m;
        T.push({ x: ct, y: Y });
      }
      return (
        T.push({ x: l, y: i }),
        T.map((G, Y) => `${Y === 0 ? 'M' : 'L'}${G.x.toFixed(2)} ${G.y.toFixed(2)}`).join(' ')
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
const mx = '_root_5xktu_1',
  hx = '_shape_5xktu_11',
  px = '_hpBar_5xktu_22',
  yx = '_hpFill_5xktu_32',
  Ps = { root: mx, shape: hx, hpBar: px, hpFill: yx },
  gx = {
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
  vx = { standard: !1, swift: !0, tough: !1, elite: !1, miniboss: !0, boss: !0 };
function _x(l) {
  switch (l) {
    case 'frozen':
      return 'hue-rotate(180deg) saturate(1.6) brightness(1.05)';
    case 'burning':
      return 'hue-rotate(-25deg) saturate(1.4) brightness(1.1)';
    default:
      return 'none';
  }
}
function bx({ color: l }) {
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
function Sx({ color: l }) {
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
function xx({ color: l }) {
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
function jx({ color: l }) {
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
function Ax({ color: l }) {
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
function Tx({ color: l }) {
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
const Mx = { standard: bx, swift: Sx, tough: xx, elite: jx, miniboss: Ax, boss: Tx };
function Ex(l, i) {
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
function wx({ type: l, size: i, hp: s, showHp: o, facing: f = 0, status: d = 'normal' }) {
  const m = gx[l],
    p = i ?? m.size,
    g = Mx[l],
    y = o ?? m.defaultHp,
    _ = vx[l] ? `${(f * 180) / Math.PI}deg` : '0deg',
    b = l === 'boss' ? 8 : l === 'miniboss' ? 6 : 4,
    A = { width: p, height: p },
    E = {
      width: p,
      height: p,
      color: m.color,
      filter: `drop-shadow(0 0 ${b}px ${m.glow}) ${_x(d)}`,
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
    className: Ps.root,
    style: A,
    children: [
      u.jsx('div', { className: Ps.shape, style: E, children: u.jsx(g, { color: m.color }) }),
      y &&
        s != null &&
        u.jsx('div', {
          className: Ps.hpBar,
          style: T,
          children: u.jsx('div', { className: Ps.hpFill, style: D }),
        }),
    ],
  });
}
function Rh(l) {
  switch (l) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}
function Nx({
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
  const G = i.x,
    Y = i.y,
    ct = D * 2;
  return u.jsx('div', {
    className: vl.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: u.jsxs('div', {
      className: vl.field,
      children: [
        u.jsx('div', {
          className: vl.rangeCircle,
          style: { left: `${G}%`, top: `${Y}%`, width: `${ct}%`, height: `${ct}%` },
          'aria-hidden': !0,
        }),
        R.map((U) =>
          u.jsx(
            'div',
            {
              className: vl.pin,
              style: { left: `${U.x}%`, top: `${U.y}%`, color: Rh(U.kind) },
              'aria-hidden': !0,
              children: u.jsx(Yt, {
                name: 'target',
                size: U.kind === 'boss' ? 18 : U.kind === 'elite' ? 16 : 14,
                color: Rh(U.kind),
              }),
            },
            U.id
          )
        ),
        l.map((U) => {
          const pt = Ex(U.kind, U.subtype),
            Mt = U.frozenUntilMs != null,
            at = U.burnUntilMs != null,
            Ot = Mt ? 'frozen' : at ? 'burning' : 'normal',
            ie = parseFloat(U.hp.toString()),
            Pt = Math.max(1e-4, parseFloat(U.maxHp.toString())),
            Ht = Math.max(0, Math.min(1, ie / Pt)),
            ae = Math.atan2(Y - U.position.y, G - U.position.x);
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
              children: u.jsx(wx, { type: pt, hp: Ht, status: Ot, facing: ae }),
            },
            U.id
          );
        }),
        u.jsxs('div', {
          className: vl.machine,
          style: { left: `${G}%`, top: `${Y}%` },
          'aria-label': 'マシン',
          children: [
            u.jsx('span', { className: vl.machineRingOuter, 'aria-hidden': !0 }),
            u.jsx(Yt, { name: 'tower', size: 22, color: 'var(--c-primary)' }),
          ],
        }),
        A && u.jsx(ZS, { cx: G, cy: Y, rotateMs: T }),
        E && u.jsx(rx, { x: G, y: Y }),
        s.map((U) =>
          u.jsx(
            QS,
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
          u.jsx(tx, { x: U.x, y: U.y, onDone: () => (m == null ? void 0 : m(U.id)) }, U.id)
        ),
        f.map((U) =>
          u.jsx(FS, { x: U.x, y: U.y, onDone: () => (p == null ? void 0 : p(U.id)) }, U.id)
        ),
        _.map((U) =>
          u.jsx(
            fx,
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
                nx,
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
                qS,
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
                LS,
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
                dx,
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
                YS,
                {
                  points: U.points,
                  delayMs: U.delayMs,
                  onDone: () => (y == null ? void 0 : y(U.id)),
                },
                U.id
              );
            case 'megaBeam':
              return u.jsx(
                cx,
                { x: U.x, y: U.y, angle: U.angle, onDone: () => (y == null ? void 0 : y(U.id)) },
                U.id
              );
          }
        }),
      ],
    }),
  });
}
const zx = '_root_wr80h_2',
  Cx = '_topRow_wr80h_13',
  Rx = '_weaponSlots_wr80h_21',
  Ox = '_activeArea_wr80h_29',
  Dx = '_activeButton_wr80h_37',
  Bx = '_activeDisabled_wr80h_57',
  Lx = '_modeToggle_wr80h_66',
  $x = '_modeToggleOn_wr80h_89',
  Hx = '_sheetToggleButton_wr80h_96',
  kx = '_bottomRow_wr80h_108',
  Ux = '_currencyArea_wr80h_115',
  qx = '_sysButtons_wr80h_127',
  ma = {
    root: zx,
    topRow: Cx,
    weaponSlots: Rx,
    activeArea: Ox,
    activeButton: Dx,
    activeDisabled: Bx,
    modeToggle: Lx,
    modeToggleOn: $x,
    sheetToggleButton: Hx,
    bottomRow: kx,
    currencyArea: Ux,
    sysButtons: qx,
  },
  Vx = '_badge_4fy54_1',
  Gx = '_glow_4fy54_90',
  Yx = '_iconLeft_4fy54_118',
  Tc = {
    badge: Vx,
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
    glow: Gx,
    iconLeft: Yx,
  };
function Hc({
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
const Zx = '_root_x9cjr_1',
  Xx = '_svg_x9cjr_9',
  Kx = '_track_x9cjr_15',
  Qx = '_arc_x9cjr_19',
  Wx = '_center_x9cjr_28',
  Jx = '_labelText_x9cjr_37',
  pi = { root: Zx, svg: Xx, track: Kx, arc: Qx, center: Wx, labelText: Jx },
  Fx = { xs: 20, sm: 32, md: 48, lg: 64 },
  Ix = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  Px = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function j1({
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
  const _ = typeof s == 'number' ? s : Fx[s],
    b =
      i != null
        ? Math.min(Math.max(0, l), Math.max(1, i)) / Math.max(1, i)
        : Math.min(Math.max(0, l), 100) / 100,
    A = i != null ? Math.min(Math.max(0, l), Math.max(1, i)) : l,
    E = i != null ? Math.max(1, i) : 100,
    T = Ix[o],
    D = d ? Px[o] : void 0,
    R = _ / 2,
    G = R - f / 2,
    Y = 2 * Math.PI * G,
    ct = Y * (1 - b),
    pt = m || p || y != null,
    Mt = g ?? `${Math.round(b * 100)}%`;
  return u.jsxs('span', {
    className: pi.root,
    style: { width: _, height: _ },
    children: [
      u.jsxs('svg', {
        className: pi.svg,
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
            className: pi.track,
            cx: R,
            cy: R,
            r: G,
            fill: 'none',
            strokeWidth: f,
          }),
          u.jsx('circle', {
            className: pi.arc,
            cx: R,
            cy: R,
            r: G,
            fill: 'none',
            stroke: T,
            strokeWidth: f,
            strokeLinecap: 'round',
            strokeDasharray: Y,
            strokeDashoffset: ct,
            style: D != null ? { filter: `drop-shadow(0 0 4px ${T})` } : void 0,
            transform: `rotate(-90 ${R} ${R})`,
          }),
        ],
      }),
      pt &&
        u.jsx('span', {
          className: pi.center,
          children:
            y ?? u.jsx('span', { className: pi.labelText, style: { color: T }, children: Mt }),
        }),
    ],
  });
}
const t5 = '_root_afe45_2',
  e5 = '_swapDisabled_afe45_14',
  a5 = '_active_afe45_20',
  n5 = '_onCd_afe45_27',
  l5 = '_iconWrap_afe45_27',
  i5 = '_cdOverlay_afe45_47',
  c5 = '_cdProgress_afe45_57',
  s5 = '_swapOverlay_afe45_68',
  Ln = {
    root: t5,
    swapDisabled: e5,
    active: a5,
    onCd: n5,
    iconWrap: l5,
    cdOverlay: i5,
    cdProgress: c5,
    swapOverlay: s5,
  },
  o5 = { sm: 40, md: 52, lg: 64 },
  r5 = { sm: 18, md: 24, lg: 30 };
function u5({
  weapon: l,
  active: i = !1,
  ready: s = !1,
  cdProgress: o = 100,
  swapDisabled: f = !1,
  size: d = 'md',
  onClick: m,
}) {
  const p = o5[d],
    g = r5[d],
    y = o < 100,
    _ = [Ln.root, i ? Ln.active : '', y ? Ln.onCd : '', f ? Ln.swapDisabled : '']
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
        className: Ln.iconWrap,
        children: u.jsx(Yt, {
          name: l,
          size: g,
          color: i ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      y &&
        u.jsxs(u.Fragment, {
          children: [
            u.jsx('span', { className: Ln.cdOverlay, 'aria-hidden': 'true' }),
            u.jsx('span', {
              className: Ln.cdProgress,
              'aria-hidden': 'true',
              children: u.jsx(j1, {
                value: o,
                max: 100,
                size: p - 4,
                color: 'cd',
                thickness: d === 'sm' ? 2 : 3,
              }),
            }),
          ],
        }),
      f && u.jsx('span', { className: Ln.swapOverlay, 'aria-hidden': 'true' }),
    ],
  });
}
const Oh = ['laser', 'cannon', 'thunder', 'cutter'];
function f5({
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
  onOpenScreenSaver: b,
  isWorkshopOpen: A = !1,
  onToggleWorkshop: E,
}) {
  const T = o > 0,
    D = d || T,
    R = Oh.some((G) => G !== i && (s[G] ?? 100) < 100);
  return u.jsxs('div', {
    className: ma.root,
    children: [
      E != null &&
        u.jsx('button', {
          type: 'button',
          className: ma.sheetToggleButton,
          onClick: E,
          'aria-expanded': A,
          'aria-label': A ? 'アップグレードを閉じる' : 'アップグレードを開く',
          children: u.jsx(Hc, { text: 'アップグレード', variant: 'info', size: 'md', glow: !0 }),
        }),
      u.jsxs('div', {
        className: ma.topRow,
        children: [
          u.jsx('div', {
            className: ma.weaponSlots,
            children: Oh.map((G) =>
              u.jsx(
                u5,
                {
                  weapon: G,
                  active: G === i,
                  cdProgress: s[G] ?? 100,
                  swapDisabled: R && G !== i,
                  size: 'md',
                  onClick: () => {
                    m(G);
                  },
                },
                G
              )
            ),
          }),
          u.jsxs('div', {
            className: ma.activeArea,
            children: [
              u.jsx('button', {
                type: 'button',
                className: [ma.activeButton, D ? ma.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: D ? void 0 : p,
                disabled: D,
                'aria-label': `アクティブスキル発動${T ? ' (クールダウン中)' : d ? ' (自動モード)' : ''}`,
                children: u.jsx(j1, {
                  value: T ? f - o : f,
                  max: f > 0 ? f : 1,
                  size: 64,
                  color: T ? 'cd' : 'primary',
                  glow: !T && !d,
                  thickness: 4,
                  children: u.jsx(Yt, {
                    name: 'lightning',
                    size: 26,
                    color: D ? 'var(--c-text-disabled)' : 'var(--c-secondary)',
                  }),
                }),
              }),
              u.jsx('button', {
                type: 'button',
                className: [ma.modeToggle, d ? ma.modeToggleOn : ''].filter(Boolean).join(' '),
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
        className: ma.bottomRow,
        children: [
          u.jsx('div', {
            className: ma.currencyArea,
            children: u.jsx(Ai, { currency: 'screw', value: l, size: 'lg' }),
          }),
          u.jsxs('div', {
            className: ma.sysButtons,
            children: [
              u.jsx(co, {
                icon: y ? 'play' : 'pause',
                label: y ? '再開 (メニューを閉じる)' : '一時停止 (メニューを開く)',
                size: 'md',
                variant: 'ghost',
                active: y,
                onClick: _,
              }),
              u.jsx(co, {
                icon: 'ice',
                label: 'スクリーンセーバーを起動',
                size: 'md',
                variant: 'ghost',
                onClick: b,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const d5 = '_root_1y4n6_3',
  m5 = '_headerRow_1y4n6_13',
  h5 = '_hpValue_1y4n6_21',
  p5 = '_hpDivider_1y4n6_31',
  y5 = '_shieldBlock_1y4n6_36',
  g5 = '_srOnly_1y4n6_44',
  yi = { root: d5, headerRow: m5, hpValue: h5, hpDivider: p5, shieldBlock: y5, srOnly: g5 },
  v5 = '_root_1pi3d_2',
  _5 = '_sizeSm_1pi3d_11',
  b5 = '_sizeMd_1pi3d_15',
  S5 = '_sizeLg_1pi3d_19',
  x5 = '_fill_1pi3d_23',
  j5 = '_label_1pi3d_29',
  A5 = '_withTrailing_1pi3d_46',
  T5 = '_trailingLabel_1pi3d_56',
  $n = {
    root: v5,
    sizeSm: _5,
    sizeMd: b5,
    sizeLg: S5,
    fill: x5,
    label: j5,
    withTrailing: A5,
    trailingLabel: T5,
  },
  M5 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  E5 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function Dh({
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
    E = M5[s],
    T = g || f === 'neon' ? E5[s] : void 0,
    D = { sm: $n.sizeSm, md: $n.sizeMd, lg: $n.sizeLg }[o],
    R = {
      width: `${A}%`,
      backgroundColor: E,
      ...(T != null ? { boxShadow: T } : {}),
      ...(y ? { marginLeft: 'auto' } : {}),
    },
    G = m ?? `${b} / ${_}`,
    Y = u.jsxs('div', {
      className: `${$n.root} ${D}`,
      role: 'progressbar',
      'aria-valuenow': b,
      'aria-valuemin': 0,
      'aria-valuemax': _,
      'aria-label': m ?? `${b} / ${_}`,
      children: [
        u.jsx('div', { className: $n.fill, style: R }),
        d && u.jsx('span', { className: $n.label, children: G }),
      ],
    });
  return p == null
    ? Y
    : u.jsxs('div', {
        className: $n.withTrailing,
        children: [Y, u.jsx('span', { className: $n.trailingLabel, children: p })],
      });
}
const w5 = '_root_17jsg_2',
  N5 = '_boss_17jsg_10',
  z5 = '_header_17jsg_16',
  C5 = '_milestone_17jsg_23',
  R5 = '_milestoneText_17jsg_30',
  O5 = '_seconds_17jsg_40',
  D5 = '_timerTrack_17jsg_46',
  B5 = '_timerFill_17jsg_56',
  L5 = '_drainBar_17jsg_1',
  $5 = '_timerFillBoss_17jsg_74',
  H5 = '_timerFillPaused_17jsg_79',
  k5 = '_waveLabel_17jsg_102',
  ta = {
    root: w5,
    boss: N5,
    header: z5,
    milestone: C5,
    milestoneText: R5,
    seconds: O5,
    timerTrack: D5,
    timerFill: B5,
    drainBar: L5,
    timerFillBoss: $5,
    timerFillPaused: H5,
    'size-sm': '_size-sm_17jsg_98',
    waveLabel: k5,
    'size-md': '_size-md_17jsg_106',
    'size-lg': '_size-lg_17jsg_110',
  },
  U5 = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  };
function q5({
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
    y = o != null ? U5[o.kind] : null,
    _ = Math.max(1, s);
  return u.jsxs('div', {
    className: [ta.root, ta[`size-${d}`], g ? ta.boss : ''].filter(Boolean).join(' '),
    children: [
      u.jsxs('div', {
        className: ta.header,
        children: [
          u.jsx(Hc, { text: `WAVE ${l}`, variant: 'tier' }),
          !p &&
            y != null &&
            o != null &&
            u.jsxs('span', {
              className: ta.milestone,
              style: { color: y.color },
              children: [
                u.jsx(Yt, { name: y.iconName, size: 12, color: y.color }),
                u.jsxs('span', { className: ta.milestoneText, children: [y.label, ' @', o.wave] }),
              ],
            }),
          p &&
            u.jsxs('span', {
              className: ta.milestone,
              style: { color: 'var(--c-secondary)' },
              children: [
                u.jsx(Yt, { name: 'skull', size: 12, color: 'var(--c-secondary)' }),
                u.jsx('span', { className: ta.milestoneText, children: 'BOSS WAVE' }),
              ],
            }),
          f &&
            !p &&
            u.jsx('span', {
              className: ta.seconds,
              children: u.jsxs(X, {
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
          children: u.jsx(V5, { secondsRemaining: i, secondsMax: _, isBoss: g, paused: m }, l),
        }),
    ],
  });
}
function V5({ secondsRemaining: l, secondsMax: i, isBoss: s, paused: o }) {
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
function G5({
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
    D = Bh(l, i),
    R = T ? Bh(s, o) : 0;
  return u.jsxs('div', {
    className: yi.root,
    role: 'group',
    'aria-label': 'バトル状態',
    children: [
      u.jsxs('div', {
        className: yi.headerRow,
        children: [
          u.jsx(Hc, { variant: 'tier', tier: f, size: 'md', glow: !0 }),
          u.jsx(X, { variant: 'label', color: 'dim', style: { fontSize: 10 }, children: 'HP' }),
          u.jsxs('span', {
            className: yi.hpValue,
            'aria-label': `HP ${l.toDisplay()} / ${i.toDisplay()}`,
            children: [
              u.jsx(Vn, {
                value: l,
                size: 'sm',
                accentColor: b ? 'danger' : 'text',
                glow: b,
                style: { fontSize: 14 },
              }),
              u.jsx('span', { className: yi.hpDivider, children: '/' }),
              u.jsx(Vn, { value: i, size: 'sm', accentColor: 'dim', style: { fontSize: 11 } }),
            ],
          }),
          T &&
            u.jsxs('span', {
              className: yi.shieldBlock,
              children: [
                u.jsx(X, {
                  variant: 'label',
                  color: 'primary',
                  style: { fontSize: 9.5 },
                  children: 'SHLD',
                }),
                u.jsx(Vn, {
                  value: s,
                  size: 'sm',
                  accentColor: 'primary',
                  style: { fontSize: 11 },
                }),
              ],
            }),
        ],
      }),
      u.jsx(Dh, { value: D, max: 100, color: D <= 30 ? 'hp-low' : 'hp', size: 'md' }),
      T && u.jsx(Dh, { value: R, max: 100, color: 'shield', size: 'sm' }),
      u.jsx(q5, {
        waveNumber: d,
        secondsLeft: p,
        secondsMax: g,
        nextMilestone: E,
        showSeconds: !1,
        size: 'sm',
        paused: A,
        isBossWave: y,
      }),
      u.jsxs('span', { className: yi.srOnly, 'aria-hidden': 'false', children: [d, '/', m] }),
    ],
  });
}
function Bh(l, i) {
  const s = parseFloat(l.toString()),
    o = parseFloat(i.toString());
  return o === 0 ? 0 : Math.max(0, Math.min(100, (s / o) * 100));
}
const Y5 = '_card_1o3jz_1',
  Z5 = '_header_1o3jz_8',
  X5 = '_soundSection_1o3jz_13',
  K5 = '_sliderRow_1o3jz_19',
  Q5 = '_sliderLabel_1o3jz_26',
  W5 = '_sliderValue_1o3jz_31',
  J5 = '_divider_1o3jz_38',
  F5 = '_actions_1o3jz_44',
  xa = {
    card: Y5,
    header: Z5,
    soundSection: X5,
    sliderRow: K5,
    sliderLabel: Q5,
    sliderValue: W5,
    divider: J5,
    actions: F5,
  },
  I5 = '_button_1oo6e_1',
  P5 = '_fullWidth_1oo6e_109',
  t3 = '_iconLeft_1oo6e_113',
  e3 = '_iconRight_1oo6e_114',
  a3 = '_iconSpacer_1oo6e_120',
  n3 = '_label_1oo6e_124',
  ln = {
    button: I5,
    'variant-primary': '_variant-primary_1oo6e_28',
    'variant-secondary': '_variant-secondary_1oo6e_42',
    'variant-danger': '_variant-danger_1oo6e_56',
    'variant-ghost': '_variant-ghost_1oo6e_70',
    'size-sm': '_size-sm_1oo6e_85',
    'size-md': '_size-md_1oo6e_93',
    'size-lg': '_size-lg_1oo6e_101',
    fullWidth: P5,
    iconLeft: t3,
    iconRight: e3,
    iconSpacer: a3,
    label: n3,
  };
function He({
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
    className: [ln.button, ln[`variant-${i}`], ln[`size-${s}`], o ? ln.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: m,
    onClick: p,
    'aria-disabled': m,
    children: [
      f != null && u.jsx('span', { className: ln.iconLeft, 'aria-hidden': 'true', children: f }),
      u.jsx('span', { className: ln.label, children: l }),
      d != null
        ? u.jsx('span', { className: ln.iconRight, 'aria-hidden': 'true', children: d })
        : f != null
          ? u.jsx('span', {
              className: `${ln.iconRight} ${ln.iconSpacer}`,
              'aria-hidden': 'true',
              children: f,
            })
          : null,
    ],
  });
}
const l3 = '_overlay_1i1z1_12',
  i3 = '_fullscreen_1i1z1_21',
  c3 = '_absolute_1i1z1_27',
  s3 = '_alignCenter_1i1z1_33',
  o3 = '_alignTop_1i1z1_38',
  r3 = '_alignBottom_1i1z1_44',
  u3 = '_content_1i1z1_50',
  jl = {
    overlay: l3,
    fullscreen: i3,
    absolute: c3,
    alignCenter: s3,
    alignTop: o3,
    alignBottom: r3,
    content: u3,
  },
  f3 = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Lh = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  d3 = { center: jl.alignCenter, top: jl.alignTop, bottom: jl.alignBottom };
function ff({
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
    A = f3[f],
    E = typeof p == 'number' ? p : (Lh[p] ?? Lh.overlay),
    T = {
      background: `rgba(2, 4, 10, ${A})`,
      zIndex: E,
      ...(d > 0 ? { backdropFilter: `blur(${d}px)` } : {}),
      ...g,
    };
  return u.jsx('div', {
    className: [jl.overlay, l ? jl.fullscreen : jl.absolute, d3[m]].join(' '),
    style: T,
    onClick: _,
    role: 'presentation',
    'aria-modal': 'true',
    children: u.jsx('div', { className: jl.content, onClick: b, children: i }),
  });
}
const m3 = '_wrapper_131tr_1',
  h3 = '_disabled_131tr_5',
  p3 = '_input_131tr_18',
  to = {
    wrapper: m3,
    disabled: h3,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: p3,
  },
  Ku = ({
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
  y3 = '_dialog_49iek_13',
  g3 = '_card_49iek_20',
  v3 = '_titleRow_49iek_27',
  _3 = '_titleIcon_49iek_33',
  b3 = '_title_49iek_27',
  S3 = '_message_49iek_46',
  x3 = '_actions_49iek_50',
  j3 = '_variantDanger_49iek_57',
  Hn = {
    dialog: y3,
    card: g3,
    titleRow: v3,
    titleIcon: _3,
    title: b3,
    message: S3,
    actions: x3,
    variantDanger: j3,
  };
function A1({
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
    ? u.jsx(ff, {
        open: l,
        onClose: p,
        dismissible: !0,
        children: u.jsx('div', {
          className: [Hn.dialog, g === 'danger' ? Hn.variantDanger : ''].filter(Boolean).join(' '),
          children: u.jsxs(Nl, {
            variant: 'elevated',
            padding: 'lg',
            className: Hn.card,
            children: [
              u.jsxs('div', {
                className: Hn.titleRow,
                children: [
                  o != null &&
                    u.jsx('span', {
                      className: Hn.titleIcon,
                      'aria-hidden': 'true',
                      children: u.jsx(Yt, {
                        name: o,
                        size: 20,
                        color: g === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  u.jsx(X, { variant: 'heading-3', as: 'h2', className: Hn.title, children: i }),
                ],
              }),
              s != null &&
                s.length > 0 &&
                u.jsx(X, { variant: 'body', color: 'mid', className: Hn.message, children: s }),
              u.jsxs('div', {
                className: Hn.actions,
                children: [
                  u.jsx(He, { label: d, variant: 'ghost', fullWidth: !0, onClick: p }),
                  u.jsx(He, {
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
function A3({
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
      u.jsx(ff, {
        open: l,
        onClose: m,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !p,
        children: u.jsxs(Nl, {
          variant: 'elevated',
          padding: 'lg',
          className: xa.card,
          children: [
            u.jsx('div', {
              className: xa.header,
              children: u.jsx(X, {
                variant: 'heading-2',
                as: 'h2',
                align: 'center',
                children: 'メニュー',
              }),
            }),
            u.jsxs('div', {
              className: xa.soundSection,
              children: [
                u.jsxs('div', {
                  className: xa.sliderRow,
                  children: [
                    u.jsx(X, {
                      variant: 'label',
                      color: 'mid',
                      className: xa.sliderLabel,
                      children: 'BGM',
                    }),
                    u.jsx(X, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: xa.sliderValue,
                      children: Math.round(i * 100).toString(),
                    }),
                  ],
                }),
                u.jsx(Ku, { value: i, min: 0, max: 1, step: 0.01, onChange: o, color: 'primary' }),
                u.jsxs('div', {
                  className: xa.sliderRow,
                  children: [
                    u.jsx(X, {
                      variant: 'label',
                      color: 'mid',
                      className: xa.sliderLabel,
                      children: 'SE',
                    }),
                    u.jsx(X, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: xa.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                u.jsx(Ku, { value: s, min: 0, max: 1, step: 0.01, onChange: f, color: 'primary' }),
              ],
            }),
            u.jsx('div', { className: xa.divider, role: 'separator' }),
            u.jsxs('div', {
              className: xa.actions,
              children: [
                u.jsx(He, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: y }),
                u.jsx(He, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: m }),
              ],
            }),
          ],
        }),
      }),
      u.jsx(A1, {
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
const T3 = '_card_1fzt0_2',
  M3 = '_header_1fzt0_14',
  E3 = '_statusText_1fzt0_19',
  w3 = '_section_1fzt0_23',
  N3 = '_sectionTitle_1fzt0_29',
  z3 = '_statsGrid_1fzt0_35',
  C3 = '_statItem_1fzt0_41',
  R3 = '_rewardList_1fzt0_52',
  O3 = '_rewardCurrency_1fzt0_58',
  D3 = '_patchList_1fzt0_66',
  B3 = '_patchItem_1fzt0_72',
  L3 = '_actions_1fzt0_87',
  je = {
    card: T3,
    header: M3,
    statusText: E3,
    section: w3,
    sectionTitle: N3,
    statsGrid: z3,
    statItem: C3,
    rewardList: R3,
    rewardCurrency: O3,
    patchList: D3,
    patchItem: B3,
    actions: L3,
  },
  $3 = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  H3 = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function k3(l) {
  const i = Math.floor(l / 60),
    s = Math.floor(l % 60);
  return `${i.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function U3({
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
  const g = $3[i],
    y = H3[i];
  return u.jsx(ff, {
    open: l,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: u.jsxs(Nl, {
      variant: 'elevated',
      padding: 'lg',
      className: je.card,
      children: [
        u.jsx('div', {
          className: je.header,
          children: u.jsx(X, {
            variant: 'heading-1',
            as: 'h2',
            color: y,
            align: 'center',
            className: je.statusText,
            children: g,
          }),
        }),
        u.jsxs('div', {
          className: je.section,
          children: [
            u.jsx(X, {
              variant: 'label',
              color: 'mid',
              className: je.sectionTitle,
              children: 'バトル記録',
            }),
            u.jsxs('div', {
              className: je.statsGrid,
              children: [
                u.jsxs('div', {
                  className: je.statItem,
                  children: [
                    u.jsx(X, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    u.jsx(X, { variant: 'numeric-m', color: 'primary', children: s.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: je.statItem,
                  children: [
                    u.jsx(X, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    u.jsx(X, { variant: 'numeric-m', color: 'primary', children: o.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: je.statItem,
                  children: [
                    u.jsx(X, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    u.jsx(X, { variant: 'numeric-m', color: 'primary', children: f.toString() }),
                  ],
                }),
                u.jsxs('div', {
                  className: je.statItem,
                  children: [
                    u.jsx(X, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    u.jsx(X, { variant: 'numeric-m', color: 'primary', children: k3(d) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        u.jsxs('div', {
          className: je.section,
          children: [
            u.jsx(X, {
              variant: 'label',
              color: 'mid',
              className: je.sectionTitle,
              children: '獲得',
            }),
            u.jsxs('div', {
              className: je.rewardList,
              children: [
                u.jsx('div', {
                  className: je.rewardCurrency,
                  children: u.jsx(Ai, { currency: 'bolt', value: m.bolt, size: 'lg' }),
                }),
                u.jsx('div', {
                  className: je.rewardCurrency,
                  children: u.jsx(Ai, { currency: 'alloy', value: m.alloy, size: 'lg' }),
                }),
                m.patches.length > 0 &&
                  u.jsx('div', {
                    className: je.patchList,
                    children: m.patches.map((_, b) =>
                      u.jsxs(
                        'div',
                        {
                          className: je.patchItem,
                          children: [
                            u.jsx(X, { variant: 'body', truncate: !0, children: _.name }),
                            u.jsxs(X, {
                              variant: 'caption',
                              color: 'mid',
                              children: ['Tier ', _.tier.toString()],
                            }),
                            u.jsxs(X, {
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
                  u.jsx(X, { variant: 'caption', color: 'dim', children: 'パッチドロップなし' }),
              ],
            }),
          ],
        }),
        u.jsx('div', {
          className: je.actions,
          children: u.jsx(He, {
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
const q3 = '_root_1tank_3',
  V3 = '_inner_1tank_20',
  G3 = '_header_1tank_28',
  Y3 = '_headerText_1tank_35',
  Z3 = '_grid_1tank_44',
  Mc = { root: q3, inner: V3, header: G3, headerText: Y3, grid: Z3 };
function X3({ open: l, screw: i, levels: s, onUpgrade: o, onClose: f }) {
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
                    u.jsx(X, {
                      variant: 'heading-3',
                      style: { fontSize: 14, lineHeight: 1.2 },
                      children: 'ラン中ワークショップ',
                    }),
                    u.jsx(X, {
                      variant: 'caption',
                      color: 'dim',
                      style: { fontSize: 10.5 },
                      children: 'ラン終了で全リセット',
                    }),
                  ],
                }),
                u.jsx(Ai, { currency: 'screw', value: i, size: 'md' }),
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
              children: a1.map((d) => {
                const m = s[d.key],
                  p = un(m),
                  g = un(m + 1),
                  y = cf(d, m),
                  _ = n1(d, m, 5),
                  { totalCost: b, lvDelta: A } = l1(d, m, i),
                  E = W.fromNumber(y),
                  T = W.fromNumber(_),
                  D = i.gte(E),
                  R = i.gte(T),
                  G = A > 0;
                return u.jsx(
                  rf,
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
                      { amount: 'MAX', cost: b, disabled: !G },
                    ],
                    onUpgrade: (Y) => {
                      Y === '+1'
                        ? o(d.key, 1)
                        : Y === '+5'
                          ? o(d.key, 5)
                          : Y === 'MAX' && o(d.key, 'max');
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
const K3 = '_root_9fvdn_2',
  Q3 = { root: K3 },
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
function W3({ items: l = [], showTower: i = !1, towerContent: s = null, cycleSeconds: o = 24 }) {
  const d = `ssfx-${q.useId().replace(/:/g, '')}`,
    m = Lu.map((b, A) => {
      const E = 100 / b.length,
        T = b
          .map(([D, R], G) => {
            const Y = G * E;
            return `
          ${Y}%               { left: ${D}%; top: ${R}%; opacity: 0; }
          ${(Y + 3).toFixed(2)}%   { left: ${D}%; top: ${R}%; opacity: 1; }
          ${(Y + E - 7).toFixed(2)}%  { left: ${D}%; top: ${R}%; opacity: 1; }
          ${(Y + E - 3).toFixed(2)}%  { left: ${D}%; top: ${R}%; opacity: 0; }
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
function J3({ open: l, onClose: i }) {
  return l
    ? u.jsx('div', {
        className: Q3.root,
        onClick: i,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (s) => {
          (s.key === 'Enter' || s.key === ' ') && i();
        },
        children: u.jsx(W3, {
          showTower: !0,
          towerContent: u.jsx(Yt, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
const Ml = { HP: 10, ATK: 2, SPD: 10, SPAWN_INTERVAL: 2, HP_GROWTH: 1.8, ATK_GROWTH: 1.4 };
function F3(l) {
  return l <= 10
    ? 1 + 0.074 * (l - 1)
    : l <= 20
      ? 1 + 0.074 * 9 + 0.133 * (l - 10)
      : 1 + 0.074 * 9 + 0.133 * 10 + 0.2 * (l - 20);
}
function I3(l) {
  return l <= 10
    ? 1 + 0.037 * (l - 1)
    : l <= 20
      ? 1 + 0.037 * 9 + 0.067 * (l - 10)
      : 1 + 0.037 * 9 + 0.067 * 10 + 0.1 * (l - 20);
}
function P3(l) {
  return l <= 10
    ? 1 + 0.019 * (l - 1)
    : l <= 20
      ? 1 + 0.019 * 9 + 0.033 * (l - 10)
      : 1 + 0.019 * 9 + 0.033 * 10 + 0.05 * (l - 20);
}
function t4(l) {
  return 1 + 0.2 * Math.max(0, l - 1);
}
function e4(l) {
  return Math.pow(1.5, Math.max(0, l - 1));
}
function a4(l) {
  let i = W.fromNumber(Ml.HP);
  for (let s = 1; s < l; s++) i = i.mulNumber(Ml.HP_GROWTH);
  return i;
}
function n4(l) {
  let i = W.fromNumber(Ml.ATK);
  for (let s = 1; s < l; s++) i = i.mulNumber(Ml.ATK_GROWTH);
  return i;
}
const l4 = { standard: 1, swift: 0.6, tough: 5 },
  i4 = { standard: 1, swift: 0.5, tough: 1 },
  c4 = { standard: 1, swift: 2, tough: 0.5 },
  s4 = { elite: 10, miniboss: 50, boss: 250 },
  o4 = { elite: 2.5, miniboss: 5, boss: 8 },
  r4 = {
    elite: { screw: 10, bolt: 10, alloyChance: 0.3, alloyAmount: 1 },
    miniboss: { screw: 50, bolt: 50, alloyChance: 1, alloyAmount: 1 },
    boss: { screw: 250, bolt: 250, alloyChance: 1, alloyAmount: 5 },
  },
  u4 = { standard: 1, swift: 2, tough: 5 },
  f4 = { standard: 1, swift: 2, tough: 5 };
function $h(l, i, s, o) {
  const f = a4(l),
    d = n4(l),
    m = F3(i),
    p = I3(i),
    g = t4(i) * e4(l);
  if (s === 'normal') {
    const T = o ?? 'standard',
      D = f.mulNumber(l4[T]).mulNumber(m),
      R = d.mulNumber(i4[T]).mulNumber(p),
      G = Ml.SPD * c4[T];
    return {
      kind: 'normal',
      subtype: T,
      hp: D,
      atk: R,
      speed: G,
      reward: {
        screw: Math.max(1, Math.round(u4[T] * g)),
        bolt: f4[T],
        alloyChance: 0,
        alloyAmount: 0,
      },
    };
  }
  const y = s,
    _ = f.mulNumber(s4[y]).mulNumber(m),
    b = d.mulNumber(o4[y]).mulNumber(p),
    A = Ml.SPD,
    E = r4[y];
  return {
    kind: s,
    hp: _,
    atk: b,
    speed: A,
    reward: { ...E, screw: Math.max(1, Math.round(E.screw * g)) },
  };
}
function Hh(l, i, s, o) {
  const f = o() < 0.5 ? 0 : 100,
    d = o() * 100;
  return { ...l, id: i, spawnedAtMs: s, position: { x: f, y: d }, maxHp: l.hp };
}
const d4 = 30,
  Qu = 26;
function m4(l) {
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
function h4(l) {
  const i = [];
  for (let s = 1; s <= d4; s++) {
    const o = P3(s),
      f = Ml.SPAWN_INTERVAL / o,
      d = m4(s);
    let m;
    (s === 5 || s === 15 || s === 25
      ? (m = 'elite')
      : s === 10 || s === 20
        ? (m = 'miniboss')
        : s === 30 && (m = 'boss'),
      i.push({
        waveIndex: s,
        tier: l,
        durationSec: Qu,
        spawnIntervalSec: f,
        normalSpawnTable: d,
        eliteKind: m,
      }));
  }
  return i;
}
function p4(l, i, s, o, f) {
  const d = [],
    m = i / 1e3,
    p = s / 1e3,
    g = Math.floor(m / l.spawnIntervalSec),
    y = Math.floor(p / l.spawnIntervalSec),
    _ = g - y;
  for (let E = 0; E < _; E++) {
    const T = y4(l.normalSpawnTable, o),
      D = $h(l.tier, l.waveIndex, 'normal', T);
    d.push(Hh(D, f(), i, o));
  }
  const A = l.durationSec - 1;
  if (l.eliteKind !== void 0 && p < A && m >= A) {
    const E = $h(l.tier, l.waveIndex, l.eliteKind);
    d.push(Hh(E, f(), i, o));
  }
  return d;
}
function y4(l, i) {
  const s = i();
  let o = 0;
  for (const f of l) if (((o += f.weight), s < o)) return f.subtype;
  return l[l.length - 1].subtype;
}
const kh = 50,
  Uh = 50;
function g4(l, i, s) {
  if (l.frozenUntilMs != null && s != null && l.frozenUntilMs > s) return l;
  const o = kh - l.position.x,
    f = Uh - l.position.y,
    d = Math.sqrt(o * o + f * f);
  if (d <= 0) return l;
  const m = l.speed * i;
  if (m <= 0) return l;
  if (m >= d) return { ...l, position: { x: kh, y: Uh } };
  const p = m / d;
  return { ...l, position: { x: l.position.x + o * p, y: l.position.y + f * p } };
}
function gi(l, i, s) {
  const o = Mi.find((f) => f.key === l);
  return o == null ? s : Tl(o, i);
}
function $u({ machineMaxHp: l, machineLevels: i }) {
  return {
    baseAttack: W.fromNumber(gi('baseAttack', i.baseAttack, 1)),
    defense: W.fromNumber(gi('defense', i.defense, 1)),
    damageReduction: gi('damageReduction', i.damageReduction, 0),
    critRate: gi('critRate', i.critRate, 0),
    critMultiplier: gi('critMultiplier', i.critMultiplier, 1.5),
    maxHp: l.isZero() ? W.fromNumber(1) : l,
    hpRegen: W.fromNumber(gi('hpRegen', i.hpRegen, 1)),
  };
}
function v4(l, i) {
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
function _4({
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
        hits: S2(s, g, o, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cannon': {
      const p = fo(i),
        g = { ...p, damageMul: p.damageMul * m },
        y = i2(s, g, o, f);
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
        hits: N2(s, g, o, f).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cutter': {
      const p = $c(i),
        g = { ...p, damageMul: p.damageMul * m },
        y = p2(s, g, o, d, f);
      return {
        hits: y.hits.map((_) => ({ enemyId: _.enemyId, damage: _.damage, crit: _.crit })),
        cutterAngle: y.angle,
      };
    }
  }
}
function b4(l, i, s) {
  if (i.type !== 'onWaveClear') return null;
  const o = l.tier;
  return { boltGain: W.fromNumber(5 * o) };
}
function S4(l, i, s) {
  if (i.type !== 'onDropRoll') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { dropMultiplier: 2 };
}
function x4(l, i, s) {
  return i.type !== 'onAttack' || i.enemyKind === 'normal'
    ? null
    : { damageMultiplier: 1 + 0.05 * l.tier };
}
function j4(l, i, s) {
  if (i.type !== 'onAttack') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { burnSec: 1 + 0.2 * o };
}
function A4(l, i, s) {
  if (i.type !== 'onHit') return null;
  const o = l.tier,
    f = 0.03,
    m = f + ((0.3 - f) * o) / (o + 20);
  return s() >= m ? null : { overrideReceivedDamage: W.ZERO };
}
function T4(l, i, s) {
  if (i.type !== 'onAttack') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { extraShot: !0 };
}
function M4(l, i, s) {
  if (i.type !== 'onAttack') return null;
  const o = l.tier,
    f = 0.05,
    m = f + ((0.5 - f) * o) / (o + 20);
  return s() >= m ? null : { freeze: !0, freezeSec: 1 + 0.2 * o };
}
function E4(l, i, s) {
  if (i.type !== 'onAttack' || i.enemyKind !== 'normal') return null;
  const o = l.tier,
    f = 0.02,
    m = f + ((0.2 - f) * o) / (o + 20);
  return s() >= m ? null : { instantKill: !0 };
}
function w4(l, i, s) {
  if (i.type !== 'onKill') return null;
  const o = l.tier,
    f = Math.ceil(0.5 * o);
  return { heal: W.fromNumber(f) };
}
function N4(l, i, s) {
  if (i.type !== 'onWaveClear') return null;
  const o = l.tier;
  return { heal: W.fromNumber(5 * o) };
}
const z4 = {
  instantKill: E4,
  bossKiller: x4,
  doubleShot: T4,
  damageImmune: A4,
  killHeal: w4,
  shieldRegen: N4,
  bonusDrop: S4,
  boltCast: b4,
  freezeHit: M4,
  burnHit: j4,
};
function C4(l, i) {
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
    const d = z4[f.name];
    if (d === void 0) continue;
    const m = d(f, i, s);
    m !== null && (o = C4(o, m));
  }
  return o;
}
const R4 = { normal: 0, elite: 0.01, miniboss: 0.05, boss: 0.2 },
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
function O4(l, i, s) {
  const o = R4[l] ?? 0;
  if (o <= 0) return !1;
  const f = Math.min(1, o * i);
  return s() < f;
}
function D4(l, i) {
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
function B4(l) {
  const i = Math.floor(l() * Hu.length);
  return Hu[Math.min(Hu.length - 1, i)];
}
function L4(l, i, s, o) {
  if (!O4(l, s, o)) return null;
  const f = D4(i, o);
  return { name: B4(o), tier: f };
}
const $4 = 1;
function H4(l, i) {
  if (i) return 0;
  const s = l / 1e3;
  return Math.min($4, Math.max(0, s));
}
const k4 = 1;
function U4(l, i, s, o, f) {
  if (s >= o) {
    const d = Math.max(0, (i - k4) * 1e3);
    return l >= d && f === 0 ? 'advanceTier' : 'continue';
  }
  return l < i * 1e3 ? 'continue' : 'advanceWave';
}
function q4(l, i, s, o) {
  const f = l !== i;
  return { resetElapsed: f || s !== o, resetEnemies: f };
}
const on = 50,
  rn = 50;
function eo(l) {
  const i = l.x - on,
    s = l.y - rn;
  return Math.sqrt(i * i + s * s);
}
const T1 = 10,
  V4 = 5,
  G4 = 5;
function Y4(l, i, s) {
  let o = l.x - i.x,
    f = l.y - i.y;
  const d = Math.sqrt(o * o + f * f);
  return (
    d === 0 ? ((o = 1), (f = 0)) : ((o /= d), (f /= d)),
    { x: Math.max(0, Math.min(100, l.x + o * s)), y: Math.max(0, Math.min(100, l.y + f * s)) }
  );
}
const Z4 = 14,
  X4 = {
    laser: 'laserShoot',
    cannon: 'cannonShoot',
    thunder: 'thunderShoot',
    cutter: 'cutterShoot',
  },
  K4 = {
    laser: 'activeLaser',
    cannon: 'activeCannon',
    thunder: 'activeThunder',
    cutter: 'activeCutter',
  },
  Q4 = 0.5;
function W4({ range: l, paused: i = !1 }) {
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
    G = q.useRef(new Set()),
    Y = q.useRef({ active: !1, remainingSec: 0, attackSpeedMul: 1, damageMul: 1 }),
    ct = q.useRef([]),
    [U, pt] = q.useState([]),
    [Mt, at] = q.useState([]),
    [Ot, ie] = q.useState([]),
    [Pt, Ht] = q.useState([]),
    [ae, Be] = q.useState([]),
    [ke, oe] = q.useState([]),
    [O, K] = q.useState(0),
    [lt, At] = q.useState(!1),
    wt = V((dt) => dt.isRunActive),
    x = V((dt) => dt.currentTier),
    H = V((dt) => dt.currentWave),
    Q = q.useMemo(() => h4(x), [x]),
    J = q.useRef(x),
    st = q.useRef(H);
  q.useEffect(() => {
    const dt = q4(J.current, x, st.current, H);
    ((J.current = x),
      (st.current = H),
      dt.resetElapsed && ((d.current = 0), (m.current = 0), K(0)),
      dt.resetEnemies && ((p.current = []), pt([]), (ct.current = [])));
  }, [x, H]);
  const ft = q.useCallback((dt) => {
      at((ve) => ve.filter((Kt) => Kt.id !== dt));
    }, []),
    Tt = q.useCallback((dt) => {
      ie((ve) => ve.filter((Kt) => Kt.id !== dt));
    }, []),
    pe = q.useCallback((dt) => {
      Ht((ve) => ve.filter((Kt) => Kt.id !== dt));
    }, []),
    Xt = q.useCallback((dt) => {
      Be((ve) => ve.filter((Kt) => Kt.id !== dt));
    }, []),
    Da = q.useCallback((dt) => {
      oe((ve) => ve.filter((Kt) => Kt.id !== dt));
    }, []),
    Ma = q.useCallback(() => {
      const dt = V.getState();
      if (dt.activeCdSec > 0 || dt.machineHp.isZero() || !dt.isRunActive || !dt.triggerActive(sf))
        return !1;
      Ft.play(K4[dt.currentWeapon]);
      const Kt = $u({ machineMaxHp: dt.machineMaxHp, machineLevels: dt.machineLevels }),
        et = un(dt.runWorkshopLevels.attackMul),
        ya = [],
        re = [],
        ye = (kt) => {
          const Ae = new Map(kt.map((Ct) => [Ct.enemyId, Ct]));
          p.current = p.current.map((Ct) => {
            const te = Ae.get(Ct.id);
            return te == null
              ? Ct
              : ((b.current += 1),
                ya.push({
                  id: `de-${b.current}`,
                  x: Ct.position.x,
                  y: Ct.position.y,
                  value: te.damage,
                  crit: te.crit ?? !1,
                }),
                { ...Ct, hp: Ct.hp.sub(te.damage) });
          });
        };
      switch (dt.currentWeapon) {
        case 'laser': {
          const kt = mo(dt.weaponLv),
            Ae = { ...kt, damageMul: kt.damageMul * et };
          let Ct = 0;
          if (p.current.length > 0) {
            const Ce = p.current.reduce((Ba, La) => (eo(La.position) < eo(Ba.position) ? La : Ba)),
              Bt = Ce.position.x - on,
              ea = Ce.position.y - rn;
            Ct = (Math.atan2(ea, Bt) * 180) / Math.PI;
          }
          const te = j2(Kt, Ae, p.current, Ct, on, rn);
          (ye(te.hits.map((Ce) => ({ enemyId: Ce.enemyId, damage: Ce.damage }))),
            (E.current += 1),
            re.push({ id: `pe-${E.current}`, kind: 'megaBeam', x: on, y: rn, angle: Ct }));
          break;
        }
        case 'cannon': {
          const kt = fo(dt.weaponLv),
            Ae = { ...kt, damageMul: kt.damageMul * et },
            Ct = c2(Kt, Ae, p.current),
            te = 480,
            Ce = R.current;
          for (const Bt of Ct.shots) {
            ((E.current += 1),
              re.push({
                id: `pe-${E.current}`,
                kind: 'cannonShell',
                x1: on,
                y1: rn,
                x2: Bt.blastX,
                y2: Bt.blastY,
                durationMs: te,
              }),
              (E.current += 1),
              re.push({
                id: `pe-${E.current}`,
                kind: 'blast',
                x: Bt.blastX,
                y: Bt.blastY,
                delayMs: te,
              }));
            for (const ea of Bt.hits)
              ct.current.push({
                enemyId: ea.enemyId,
                damage: ea.damage,
                crit: !1,
                freeze: !1,
                applyAtMs: Ce + te,
              });
          }
          break;
        }
        case 'thunder': {
          const kt = ho(dt.weaponLv),
            Ae = { ...kt, damageMul: kt.damageMul * et },
            Ct = z2(Kt, Ae, p.current),
            te = [{ x: on, y: rn }];
          for (const Ce of Ct.hits) {
            const Bt = p.current.find((ea) => ea.id === Ce.enemyId);
            Bt != null && te.push({ x: Bt.position.x, y: Bt.position.y });
          }
          (te.length > 1 &&
            ((E.current += 1), re.push({ id: `pe-${E.current}`, kind: 'chain', points: te })),
            ye(Ct.hits));
          break;
        }
        case 'cutter': {
          const kt = $c(dt.weaponLv);
          ((Y.current = y2(kt)), At(!0));
          break;
        }
      }
      return (
        ya.length > 0 && at((kt) => [...kt, ...ya]),
        re.length > 0 && Ht((kt) => [...kt, ...re]),
        !0
      );
    }, []);
  return (
    q.useEffect(() => {
      if (!wt) return;
      const dt = (ve) => {
        const Kt = ve - f.current;
        f.current = ve;
        const et = V.getState(),
          ya = et.machineHp.isZero(),
          re = H4(Kt, et.isPaused || ya || s.current);
        if (re > 0) {
          R.current += re * 1e3;
          const ye = R.current,
            kt = Array.from(et.equippedPatches.values());
          (et.tickCooldowns(re),
            et.isAutoActive && et.activeCdSec <= 0 && Ma(),
            Y.current.active && ((Y.current = g2(Y.current, re)), Y.current.active || At(!1)),
            (m.current = d.current),
            (d.current += re * 1e3));
          const Ae = Q[et.currentWave - 1];
          if (Ae != null) {
            const Ct = p4(
              Ae,
              d.current,
              m.current,
              Math.random,
              () => ((g.current += 1), `e-${et.currentTier}-${et.currentWave}-${g.current}`)
            );
            if (Ct.length > 0) {
              p.current = [...p.current, ...Ct];
              const F = Ct.filter((rt) => rt.kind !== 'normal');
              if (F.length > 0) {
                const rt = F.map((yt) => {
                  D.current += 1;
                  const Et = yt.kind,
                    Qt =
                      Et === 'boss'
                        ? `TIER ${et.currentTier} BOSS`
                        : Et === 'miniboss'
                          ? `MINI BOSS T${et.currentTier}W${et.currentWave}`
                          : `ELITE T${et.currentTier}W${et.currentWave}`;
                  return { id: `ap-${D.current}`, kind: Et, name: Qt };
                });
                oe((yt) => [...yt, ...rt]);
              }
            }
            ((p.current = p.current.map((F) => g4(F, re, ye))),
              (p.current = p.current.map((F) => {
                let rt = F;
                if (rt.burnUntilMs != null && rt.burnPerSec != null && rt.burnUntilMs > ye) {
                  const Et = rt.burnPerSec.mulNumber(re);
                  rt = { ...rt, hp: rt.hp.sub(Et) };
                }
                const yt = {};
                return (
                  rt.frozenUntilMs != null && rt.frozenUntilMs <= ye && (yt.frozenUntilMs = void 0),
                  rt.burnUntilMs != null &&
                    rt.burnUntilMs <= ye &&
                    ((yt.burnUntilMs = void 0), (yt.burnPerSec = void 0)),
                  Object.keys(yt).length > 0 && (rt = { ...rt, ...yt }),
                  rt
                );
              })));
            const te = [];
            ct.current = ct.current.filter((F) => (F.applyAtMs <= ye ? (te.push(F), !1) : !0));
            const Ce = [];
            if (te.length > 0) {
              const F = new Map(te.map((rt) => [rt.enemyId, rt]));
              p.current = p.current.map((rt) => {
                const yt = F.get(rt.id);
                if (yt == null) return rt;
                let Et = { ...rt, hp: rt.hp.sub(yt.damage) };
                if (yt.freeze && yt.freezeSec != null && yt.freezeSec > 0) {
                  const Qt = ye + yt.freezeSec * 1e3;
                  Et = { ...Et, frozenUntilMs: Math.max(Et.frozenUntilMs ?? 0, Qt) };
                }
                if (yt.burnSec != null && yt.burnSec > 0) {
                  const Qt = ye + yt.burnSec * 1e3,
                    Le = yt.damage.mulNumber(0.3),
                    Dt = Et.burnPerSec;
                  Et = {
                    ...Et,
                    burnUntilMs: Math.max(Et.burnUntilMs ?? 0, Qt),
                    burnPerSec: Dt != null && Dt.gt(Le) ? Dt : Le,
                  };
                }
                return Et;
              });
              for (const rt of te) {
                const yt = p.current.find((Et) => Et.id === rt.enemyId);
                ((b.current += 1),
                  Ce.push({
                    id: `de-${b.current}`,
                    x: (yt == null ? void 0 : yt.position.x) ?? 50,
                    y: (yt == null ? void 0 : yt.position.y) ?? 50,
                    value: rt.damage,
                    crit: rt.crit,
                  }));
              }
            }
            const Bt = et.runWorkshopLevels.attackMul,
              ea = et.runWorkshopLevels.attackSpeedMul,
              Ba = un(Bt),
              La = un(ea),
              fn = v4(et.currentWeapon, et.weaponLv),
              Ei = Y.current.active ? Y.current.attackSpeedMul : 1,
              Zn = Math.min(T1, fn * La * Ei),
              Xn = Zn > 0 ? 1e3 / Zn : 1 / 0;
            y.current += re * 1e3;
            let Kn = 0;
            const Ea = 10,
              _e = [],
              be = [];
            for (; y.current >= Xn && Kn < Ea; ) {
              const F = et.currentWeapon === 'cutter' ? Z4 : l,
                rt = p.current
                  .map((Qt) => ({ enemy: Qt, dist: eo(Qt.position) }))
                  .filter(({ dist: Qt }) => Qt <= F)
                  .sort((Qt, Le) => Qt.dist - Le.dist)
                  .map(({ enemy: Qt }) => Qt);
              if (rt.length === 0) {
                y.current = Math.min(y.current, Xn);
                break;
              }
              ((y.current -= Xn), (Kn += 1), Ft.play(X4[et.currentWeapon]));
              const yt = $u({ machineMaxHp: et.machineMaxHp, machineLevels: et.machineLevels }),
                Et = _4({
                  weapon: et.currentWeapon,
                  weaponLv: et.weaponLv,
                  machine: yt,
                  enemiesInRange: rt,
                  rng: Math.random,
                  cutterAngleDeg: _.current,
                  attackMul: Ba,
                });
              if ((Et.cutterAngle != null && (_.current = Et.cutterAngle), Et.hits.length > 0)) {
                const Qt = Et.hits.map((Dt) => {
                  const ht = p.current.find((ee) => ee.id === Dt.enemyId);
                  if (ht == null) return { ...Dt, freeze: !1, freezeSec: void 0, burnSec: void 0 };
                  const _t = Ec(kt, { type: 'onAttack', enemyKind: ht.kind }, Math.random);
                  let Zt = Dt.damage;
                  return (
                    _t.damageMultiplier != null &&
                      _t.damageMultiplier !== 1 &&
                      (Zt = Zt.mulNumber(_t.damageMultiplier)),
                    _t.extraShot && (Zt = Zt.add(Dt.damage)),
                    _t.instantKill && (Zt = ht.hp),
                    {
                      ...Dt,
                      damage: Zt,
                      freeze: _t.freeze === !0,
                      freezeSec: _t.freezeSec,
                      burnSec: _t.burnSec,
                    }
                  );
                });
                if (et.currentWeapon === 'cannon')
                  for (const ht of Qt)
                    ct.current.push({
                      enemyId: ht.enemyId,
                      damage: ht.damage,
                      crit: ht.crit ?? !1,
                      freeze: ht.freeze,
                      freezeSec: ht.freezeSec,
                      burnSec: ht.burnSec,
                      applyAtMs: ye + 480,
                    });
                else {
                  const Dt = new Map(Qt.map((ht) => [ht.enemyId, ht]));
                  p.current = p.current.map((ht) => {
                    const _t = Dt.get(ht.id);
                    if (_t == null) return ht;
                    let Zt = { ...ht, hp: ht.hp.sub(_t.damage) };
                    if (_t.freeze && _t.freezeSec != null && _t.freezeSec > 0) {
                      const ee = ye + _t.freezeSec * 1e3;
                      Zt = { ...Zt, frozenUntilMs: Math.max(Zt.frozenUntilMs ?? 0, ee) };
                    }
                    if (_t.burnSec != null && _t.burnSec > 0) {
                      const ee = ye + _t.burnSec * 1e3,
                        Te = _t.damage.mulNumber(0.3),
                        wa = Zt.burnPerSec;
                      Zt = {
                        ...Zt,
                        burnUntilMs: Math.max(Zt.burnUntilMs ?? 0, ee),
                        burnPerSec: wa != null && wa.gt(Te) ? wa : Te,
                      };
                    }
                    return Zt;
                  });
                  for (const ht of Qt) {
                    const _t = p.current.find((Zt) => Zt.id === ht.enemyId);
                    ((b.current += 1),
                      _e.push({
                        id: `de-${b.current}`,
                        x: (_t == null ? void 0 : _t.position.x) ?? 50,
                        y: (_t == null ? void 0 : _t.position.y) ?? 50,
                        value: ht.damage,
                        crit: ht.crit,
                      }));
                  }
                }
                const Le = Qt.map((Dt) => p.current.find((ht) => ht.id === Dt.enemyId))
                  .filter((Dt) => Dt != null)
                  .map((Dt) => ({ x: Dt.position.x, y: Dt.position.y }));
                if (et.currentWeapon === 'laser')
                  for (const Dt of Le)
                    ((E.current += 1),
                      be.push({
                        id: `pj-${E.current}`,
                        kind: 'laser',
                        x1: on,
                        y1: rn,
                        x2: Dt.x,
                        y2: Dt.y,
                      }));
                else if (et.currentWeapon === 'cannon') {
                  const ht = Et.impactX,
                    _t = Et.impactY;
                  ht != null &&
                    _t != null &&
                    ((E.current += 1),
                    be.push({
                      id: `pj-${E.current}`,
                      kind: 'cannonShell',
                      x1: on,
                      y1: rn,
                      x2: ht,
                      y2: _t,
                      durationMs: 480,
                    }),
                    (E.current += 1),
                    be.push({ id: `pj-${E.current}`, kind: 'blast', x: ht, y: _t, delayMs: 480 }));
                } else if (et.currentWeapon === 'thunder' && Le.length > 0)
                  for (const ht of Le)
                    ((E.current += 1),
                      be.push({
                        id: `pj-${E.current}`,
                        kind: 'thunderStrike',
                        x: ht.x,
                        y: ht.y,
                        durationMs: 320,
                      }));
              }
            }
            const Z = [..._e, ...Ce];
            (Z.length > 0 && at((F) => [...F, ...Z]), be.length > 0 && Ht((F) => [...F, ...be]));
            const wi = un(et.runWorkshopLevels.screwGainMul),
              Qn = [],
              Wn = [],
              Jn = [];
            let $a = W.ZERO,
              Ha = W.ZERO,
              aa = W.ZERO,
              ka = W.ZERO;
            for (const F of p.current)
              if (F.hp.lte(W.ZERO)) {
                ((A.current += 1),
                  Qn.push({ id: `dh-${A.current}`, x: F.position.x, y: F.position.y }));
                const rt = Ec(kt, { type: 'onKill', enemyKind: F.kind }, Math.random);
                rt.heal != null && (ka = ka.add(rt.heal));
                const Et =
                    Ec(
                      kt,
                      {
                        type: 'onDropRoll',
                        baseDrops: {
                          screw: F.reward.screw,
                          bolt: F.reward.bolt,
                          alloy: F.reward.alloyAmount,
                        },
                      },
                      Math.random
                    ).dropMultiplier ?? 1,
                  Qt = F.reward.screw;
                Qt > 0 &&
                  (($a = $a.add(W.fromNumber(Qt * wi * Et))),
                  (T.current += 1),
                  Wn.push({
                    id: `pk-${T.current}`,
                    x: F.position.x,
                    y: F.position.y,
                    iconName: 'screw',
                  }));
                const Le = F.reward.bolt;
                (Le > 0 &&
                  (F.kind !== 'normal' || Math.random() < Q4) &&
                  ((Ha = Ha.add(W.fromNumber(Le * Et))),
                  (T.current += 1),
                  Wn.push({
                    id: `pk-${T.current}`,
                    x: F.position.x,
                    y: F.position.y,
                    iconName: 'bolt',
                  })),
                  F.reward.alloyChance > 0 &&
                    F.reward.alloyAmount > 0 &&
                    Math.random() < F.reward.alloyChance &&
                    ((aa = aa.add(W.fromNumber(F.reward.alloyAmount * Et))),
                    (T.current += 1),
                    Wn.push({
                      id: `pk-${T.current}`,
                      x: F.position.x,
                      y: F.position.y,
                      iconName: 'alloy',
                    })));
                const Dt =
                    Tl(
                      Mi.find((_t) => _t.key === 'patchDropRate'),
                      et.machineLevels.patchDropRate
                    ) * Et,
                  ht = L4(F.kind, et.currentTier, Dt, Math.random);
                (ht != null && et.addPatch(ht.name, ht.tier, 1),
                  Ft.play(F.kind === 'boss' || F.kind === 'miniboss' ? 'bossKill' : 'enemyKill'));
              } else Jn.push(F);
            (ka.isZero() || et.setMachineHp(et.machineHp.add(ka)),
              Qn.length > 0 && ((p.current = Jn), ie((F) => [...F, ...Qn])),
              Wn.length > 0 && Be((F) => [...F, ...Wn]),
              $a.isZero() || et.addScrew($a),
              Ha.isZero() || et.addBolt(Ha),
              aa.isZero() || et.addAlloy(aa));
            const Fn = $u({ machineMaxHp: et.machineMaxHp, machineLevels: et.machineLevels });
            let In = W.ZERO;
            const Ni = new Set();
            if (
              ((p.current = p.current.map((F) => {
                if (eo(F.position) > V4) return F;
                const yt = Fb(F.atk, Fn);
                return (
                  (In = In.add(yt.mulNumber(re))),
                  Ni.add(F.id),
                  G.current.has(F.id) ? F : { ...F, position: Y4(F.position, { x: on, y: rn }, G4) }
                );
              })),
              (G.current = Ni),
              !In.isZero())
            ) {
              const rt =
                Ec(kt, { type: 'onHit', receivedDamage: In }, Math.random).overrideReceivedDamage ??
                In;
              if (!rt.isZero()) {
                const yt = et.machineHp;
                et.damageHp(rt);
                const Et = V.getState().machineHp;
                Ft.play(Et.isZero() && !yt.isZero() ? 'machineDown' : 'machineHit');
              }
            }
            const Pn = U4(d.current, Ae.durationSec, et.currentWave, Q.length, p.current.length);
            if (Pn === 'advanceWave' || Pn === 'advanceTier') {
              const F = Ec(kt, { type: 'onWaveClear' }, Math.random);
              (F.heal != null && !F.heal.isZero() && et.setMachineHp(et.machineHp.add(F.heal)),
                F.boltGain != null && !F.boltGain.isZero() && et.addBolt(F.boltGain),
                Pn === 'advanceWave'
                  ? (et.advanceWave(), Ft.play('waveClear'))
                  : (et.advanceTier(), Ft.play('tierClear')),
                (d.current = 0),
                (m.current = 0));
            }
          }
        }
        (pt(p.current), K(d.current / 1e3), (o.current = requestAnimationFrame(dt)));
      };
      return (
        (f.current = performance.now()),
        (o.current = requestAnimationFrame(dt)),
        () => {
          o.current != null && (cancelAnimationFrame(o.current), (o.current = null));
        }
      );
    }, [wt, Q, l, Ma]),
    {
      enemies: U,
      damageEvents: Mt,
      deathEvents: Ot,
      projectileEvents: Pt,
      pickupEvents: ae,
      appearanceEvents: ke,
      waveElapsedSec: O,
      onDamageDone: ft,
      onDeathDone: Tt,
      onProjectileDone: pe,
      onPickupDone: Xt,
      onAppearanceDone: Da,
      fireActive: Ma,
      isOverdriveActive: lt,
    }
  );
}
const qh = 30,
  J4 = 2;
function F4(l, i) {
  return l && i.lte(W.ZERO) ? 'gameover' : null;
}
function I4() {
  const { navigate: l } = Gn(),
    i = V((Z) => Z.isRunActive),
    s = V((Z) => Z.screw),
    o = V((Z) => Z.bolt),
    f = V((Z) => Z.alloy),
    d = V((Z) => Z.runStartBolt),
    m = V((Z) => Z.runStartAlloy),
    p = V((Z) => Z.machineHp),
    g = V((Z) => Z.machineMaxHp),
    y = V((Z) => Z.currentTier),
    _ = V((Z) => Z.currentWave),
    b = V((Z) => Z.currentWeapon),
    A = V((Z) => Z.weaponLv),
    E = V((Z) => Z.activeCdSec),
    T = V((Z) => Z.isAutoActive),
    D = V((Z) => Z.isPaused),
    R = V((Z) => Z.runWorkshopLevels),
    G = V((Z) => Z.bgmVolume),
    Y = V((Z) => Z.seVolume),
    ct = V((Z) => Z.setBgmVolume),
    U = V((Z) => Z.setSeVolume),
    pt = V((Z) => Z.setAutoActive),
    Mt = V((Z) => Z.switchWeapon),
    at = V((Z) => Z.setPaused),
    Ot = V((Z) => Z.upgradeRunWorkshop),
    ie = V((Z) => Z.weaponSwitchCdSec),
    [Pt, Ht] = q.useState(!1),
    [ae, Be] = q.useState(!1),
    [ke, oe] = q.useState(!1),
    O = q.useRef(i);
  (q.useEffect(() => {
    (i && !O.current && oe(!0), (O.current = i));
  }, [i]),
    q.useEffect(() => {
      _ === 30 ? Ft.playBgm('battleBoss') : Ft.playBgm('battleNormal');
    }, [_]));
  const K = q.useRef(_),
    [lt, At] = q.useState(null);
  q.useEffect(() => {
    (K.current !== _ && At((Z) => (Z ?? 0) + 1), (K.current = _));
  }, [_]);
  const wt = F4(i, p),
    [x, H] = q.useState(null),
    Q = x ?? wt,
    J = Q !== null,
    {
      enemies: st,
      damageEvents: ft,
      deathEvents: Tt,
      projectileEvents: pe,
      pickupEvents: Xt,
      waveElapsedSec: Da,
      onDamageDone: Ma,
      onDeathDone: dt,
      onProjectileDone: ve,
      onPickupDone: Kt,
      appearanceEvents: et,
      onAppearanceDone: ya,
      fireActive: re,
      isOverdriveActive: ye,
    } = W4({ range: qh, paused: J }),
    kt = Math.max(0, Qu - Da),
    Ae = [],
    Ct = Math.max(0, Math.min(100, ((Zu - ie) / Zu) * 100)),
    te = {
      laser: b === 'laser' ? 100 : Ct,
      cannon: b === 'cannon' ? 100 : Ct,
      thunder: b === 'thunder' ? 100 : Ct,
      cutter: b === 'cutter' ? 100 : Ct,
    },
    Ce = p,
    Bt = g.isZero() ? W.fromNumber(1) : g,
    ea = () => {
      const Z = !D;
      (at(Z), Ft.play(Z ? 'dialogOpen' : 'tap'));
    },
    Ba = () => {
      (Be(!0), Ft.play('dialogOpen'));
    },
    La = () => {
      (at(!1), H('retreat'), Ft.play('resultRetreat'));
    },
    fn = () => {
      l('preparation');
    },
    Ei = (Z, wi) => {
      const Qn = Ot(Z, wi);
      Ft.play(Qn ? 'purchaseOk' : 'reject');
    },
    Zn = (Z) => {
      (Mt(Z), Ft.play('weaponSwitch'));
    },
    Xn = () => {
      re() || Ft.play('reject');
    },
    Kn = o.sub(d),
    Ea = f.sub(m),
    _e = { bolt: Kn.lt(W.ZERO) ? W.ZERO : Kn, alloy: Ea.lt(W.ZERO) ? W.ZERO : Ea, patches: [] },
    be = 30;
  return u.jsxs('div', {
    className: Bu.root,
    children: [
      u.jsx(El, {
        noScroll: !0,
        variant: 'battle',
        header: u.jsx(G5, {
          hpCurrent: Ce,
          hpMax: Bt,
          tier: y,
          wave: _,
          totalWaves: be,
          secondsRemaining: kt,
          secondsTotal: Qu,
          isBossWave: _ === be,
          paused: D || J,
        }),
        footer: u.jsxs('div', {
          className: Bu.battleFooter,
          children: [
            u.jsx(X3, {
              open: Pt,
              screw: s,
              levels: R,
              onUpgrade: Ei,
              onClose: () => {
                Ht(!1);
              },
            }),
            u.jsx(f5, {
              screw: s,
              equippedWeapon: b,
              weaponCds: te,
              activeCd: E,
              activeMax: sf,
              isAutoActive: T,
              onSwitchWeapon: Zn,
              onActivate: Xn,
              onToggleAuto: pt,
              isPaused: D,
              onTogglePause: ea,
              onOpenScreenSaver: Ba,
              isWorkshopOpen: Pt,
              onToggleWorkshop: () => {
                Ht((Z) => !Z);
              },
            }),
          ],
        }),
        children: u.jsx(Nx, {
          enemies: st,
          damageEvents: ft,
          hitEvents: Ae,
          deathEvents: Tt,
          projectileEvents: pe,
          pickupEvents: Xt,
          onDamageDone: Ma,
          onDeathDone: dt,
          onProjectileDone: ve,
          onPickupDone: Kt,
          showCutterOrbit: b === 'cutter' && i && !D && !J,
          showOverdriveAura: ye && i && !J,
          cutterRotateMs: m2(
            Math.min(T1, $c(A).attackPerSec * un(R.attackSpeedMul) * (ye ? p1 : 1)),
            J4
          ),
          range: qh,
        }),
      }),
      u.jsxs('div', {
        className: Bu.overlayLayer,
        'aria-live': 'polite',
        children: [
          u.jsx(A3, {
            open: D,
            bgmVolume: G,
            seVolume: Y,
            onBgmChange: ct,
            onSeChange: U,
            onRetreat: La,
            onClose: () => {
              at(!1);
            },
          }),
          J &&
            u.jsx(U3, {
              open: J,
              status: Q,
              reachedTier: y,
              reachedWave: _,
              killed: 0,
              elapsedSec: 0,
              reward: _e,
              onClose: fn,
            }),
          u.jsx(J3, {
            open: ae,
            onClose: () => {
              Be(!1);
            },
          }),
          ke &&
            u.jsx(zh, {
              kind: 'battle-start',
              onDone: () => {
                oe(!1);
              },
            }),
          et.map((Z) =>
            u.jsx(
              zh,
              {
                kind: Z.kind === 'miniboss' ? 'boss' : Z.kind,
                name: Z.name,
                onDone: () => ya(Z.id),
              },
              Z.id
            )
          ),
          lt != null &&
            u.jsx(
              MS,
              {
                waveNumber: _,
                onDone: () => {
                  At(null);
                },
              },
              lt
            ),
        ],
      }),
    ],
  });
}
const P4 = '_root_1420p_3',
  tj = { root: P4 };
function ej() {
  const l = V((f) => f.machineLevels),
    i = V((f) => f.bolt),
    s = V((f) => f.incrementMachineLv),
    o = V((f) => f.spendBolt);
  return u.jsx('div', {
    className: tj.root,
    children: Mi.map((f) => {
      const d = l[f.key],
        m = f.maxLv != null && d >= f.maxLv,
        p = Tl(f, d),
        g = Tl(f, d + 1),
        y = (Pt) => (f.unit === '%' ? Math.round(Pt * 1e3) / 10 : Pt),
        _ = y(p),
        b = y(g),
        A = of(f, d),
        E = Ou(f, d, 5),
        T = W.fromNumber(A),
        D = W.fromNumber(E),
        R = Jb(f, d, i),
        G = f.maxLv != null ? f.maxLv - d : Number.POSITIVE_INFINITY,
        Y = Math.min(R, G),
        ct = Y > 0 ? Ou(f, d, Y) : A,
        U = W.fromNumber(ct),
        pt = i.lt(T),
        Mt = i.lt(D) || (f.maxLv != null && d + 5 > f.maxLv),
        at = Y < 1,
        Ot = m
          ? []
          : [
              { amount: '+1', cost: T, disabled: pt },
              { amount: '+5', cost: D, disabled: Mt },
              { amount: 'MAX', cost: U, disabled: at },
            ],
        ie = (Pt) => {
          if (m) return;
          let Ht = 0;
          if ((Pt === '+1' ? (Ht = 1) : Pt === '+5' ? (Ht = 5) : Pt === 'MAX' && (Ht = Y), Ht < 1))
            return;
          f.maxLv != null && (Ht = Math.min(Ht, f.maxLv - d));
          const ae = Ou(f, d, Ht),
            Be = W.fromNumber(ae);
          if (o(Be)) for (let oe = 0; oe < Ht; oe++) s(f.key);
        };
      return u.jsx(
        rf,
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
          options: Ot,
          onUpgrade: ie,
        },
        f.key
      );
    }),
  });
}
function aj() {
  const { navigate: l } = Gn(),
    i = (s) => {
      l(s);
    };
  return u.jsx(El, {
    header: u.jsx(Lc, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: u.jsx(Bc, { active: 'machine', onChange: i }),
    children: u.jsx(ej, {}),
  });
}
const nj = () => u.jsx('div', { children: u.jsx('h1', { children: 'Not Found' }) }),
  lj = '_content_9srrg_1',
  ij = { content: lj },
  cj = '_root_1l9jp_1',
  sj = '_header_1l9jp_8',
  oj = '_headerTitleRow_1l9jp_15',
  rj = '_headerCount_1l9jp_21',
  uj = '_slotGrid_1l9jp_35',
  fj = '_emptyHint_1l9jp_41',
  vi = { root: cj, header: sj, headerTitleRow: oj, headerCount: rj, slotGrid: uj, emptyHint: fj },
  dj = '_wrapper_16mrg_3',
  mj = '_filled_16mrg_16',
  hj = '_empty_16mrg_25',
  pj = '_locked_16mrg_26',
  yj = '_slotInner_16mrg_59',
  gj = '_emptyIcon_16mrg_67',
  vj = '_emptyLabel_16mrg_74',
  kn = {
    wrapper: dj,
    filled: mj,
    empty: hj,
    locked: pj,
    slotInner: yj,
    emptyIcon: gj,
    emptyLabel: vj,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  },
  _j = '_root_12m2l_3',
  bj = '_selected_12m2l_15',
  Sj = '_merging_12m2l_19',
  xj = '_locked_12m2l_23',
  jj = '_disabled_12m2l_28',
  Aj = '_card_12m2l_34',
  Tj = '_tierBadge_12m2l_46',
  Mj = '_count_12m2l_54',
  Ej = '_countZero_12m2l_74',
  wj = '_iconWrap_12m2l_79',
  Nj = '_name_12m2l_90',
  zj = '_detail_12m2l_102',
  Cj = '_trigger_12m2l_110',
  Rj = '_effect_12m2l_121',
  Oj = '_mergingBadge_12m2l_133',
  Oe = {
    root: _j,
    selected: bj,
    merging: Sj,
    locked: xj,
    disabled: jj,
    card: Aj,
    tierBadge: Tj,
    count: Mj,
    countZero: Ej,
    iconWrap: wj,
    name: Nj,
    detail: zj,
    trigger: Cj,
    effect: Rj,
    mergingBadge: Oj,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  Dj = { sm: 22, md: 26, lg: 32 },
  Vh = { sm: 38, md: 44, lg: 52 };
function df({
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
      width: Vh[_],
      height: Vh[_],
      opacity: g ? 0.35 : 1,
      background: g ? 'var(--c-surface)' : `linear-gradient(135deg, ${E}22, ${E}08)`,
      border: g ? '1px solid var(--c-border-faint)' : `1px solid ${E}55`,
      filter: g ? 'none' : `drop-shadow(0 0 4px ${E}55)`,
    },
    G = {
      background: o >= 2 ? `${E}22` : void 0,
      borderColor: o >= 2 ? E : void 0,
      color: o >= 2 ? E : void 0,
    };
  return u.jsx('div', {
    className: [
      Oe.root,
      m ? Oe.selected : '',
      p ? Oe.merging : '',
      g ? Oe.locked : '',
      y ? Oe.disabled : '',
      Oe[`size-${_}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: D,
    onClick: T ? b : void 0,
    role: T ? 'button' : void 0,
    tabIndex: T ? 0 : void 0,
    onKeyDown: T
      ? (Y) => {
          (Y.key === 'Enter' || Y.key === ' ') && (Y.preventDefault(), b == null || b());
        }
      : void 0,
    'aria-pressed': T ? m : void 0,
    'aria-disabled': y || g ? !0 : void 0,
    children: u.jsxs(Nl, {
      variant: 'elevated',
      padding: 'sm',
      interactive: T,
      className: Oe.card,
      children: [
        !g &&
          u.jsx('span', {
            className: Oe.tierBadge,
            children: u.jsx(Hc, { text: `T${A}`, variant: 'patch-tier', tier: s }),
          }),
        u.jsxs('span', {
          className: [Oe.count, o === 0 ? Oe.countZero : ''].filter(Boolean).join(' '),
          style: G,
          children: ['×', g ? '?' : o],
        }),
        u.jsx('div', {
          className: Oe.iconWrap,
          style: R,
          children: u.jsx(Yt, {
            name: g ? 'close' : i,
            size: Dj[_],
            color: g ? 'var(--c-text-disabled)' : E,
          }),
        }),
        u.jsx(X, {
          variant: 'caption',
          color: g ? 'dim' : 'text',
          className: Oe.name,
          children: g ? '???' : l,
        }),
        !g &&
          u.jsxs('div', {
            className: Oe.detail,
            children: [
              u.jsx('span', { className: Oe.trigger, children: f }),
              u.jsx('span', { className: Oe.effect, children: d }),
            ],
          }),
        p && u.jsx('span', { className: Oe.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
function M1({ patch: l = null, slotIndex: i, locked: s = !1, size: o = 'md', onClick: f }) {
  const d = l != null,
    m = f != null && !s,
    p = i != null ? `Slot ${i}` : '',
    g = d
      ? `Slot ${i ?? ''}: ${l.name} (Tier ${l.tier})`
      : s
        ? `Slot ${i ?? ''} (locked)`.trim()
        : `Slot ${i ?? ''} (empty)`.trim(),
    y = d ? kn.filled : s ? kn.locked : kn.empty;
  return u.jsx('div', {
    className: [kn.wrapper, y, kn[`size-${o}`]].filter(Boolean).join(' '),
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
        ? u.jsx(df, {
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
            className: kn.slotInner,
            children: [
              u.jsx('span', {
                className: kn.emptyIcon,
                children: u.jsx(Yt, {
                  name: s ? 'close' : 'plus',
                  size: 28,
                  color: s ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              u.jsx('span', { className: kn.emptyLabel, children: s ? 'LOCKED' : p }),
            ],
          }),
  });
}
function Bj(l) {
  return Math.min(1 + l, xi);
}
const Lj = {
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
  $j = {
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
  Hj = {
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
function kj({ overridePatches: l, overrideEquipped: i, overridePatchSlotsLv: s }) {
  const o = V((T) => T.patches),
    f = V((T) => T.equippedPatches),
    d = V((T) => T.machineLevels.patchSlots),
    m = V((T) => T.unequipPatch),
    p = l ?? o,
    g = i ?? f,
    _ = Bj(s ?? d),
    b = (T) => {
      const D = g.get(T);
      if (!D) return null;
      const R = `${D.name}#${D.tier}`,
        G = p.get(R);
      return {
        patchId: R,
        name: D.name,
        iconName: Lj[D.name] ?? 'spark',
        tier: D.tier,
        trigger: $j[D.name] ?? '常時',
        effect: Hj[D.name] ?? '-',
        count: (G == null ? void 0 : G.count) ?? 0,
      };
    },
    A = (T) => {
      g.get(T) && m(T);
    },
    E = xi - _;
  return u.jsxs('div', {
    className: vi.root,
    children: [
      u.jsxs('div', {
        className: vi.header,
        children: [
          u.jsxs('div', {
            className: vi.headerTitleRow,
            children: [
              u.jsx(X, { variant: 'heading-3', children: '装着スロット' }),
              u.jsxs(X, {
                variant: 'caption',
                color: 'mid',
                className: vi.headerCount,
                children: [g.size, '/', _],
              }),
            ],
          }),
          u.jsxs(X, {
            variant: 'caption',
            color: 'dim',
            children: ['(', xi, ' スロット中 ', E, ' ロック・', g.size, ' / ', _, ' ', '装着中)'],
          }),
        ],
      }),
      u.jsx('div', {
        className: vi.slotGrid,
        children: Array.from({ length: xi }, (T, D) => {
          const R = D >= _,
            G = R ? null : b(D);
          return u.jsx(
            M1,
            { slotIndex: D + 1, patch: G, locked: R, size: 'md', onClick: R ? void 0 : () => A(D) },
            D
          );
        }),
      }),
      g.size === 0 &&
        _ > 0 &&
        u.jsx(X, {
          variant: 'caption',
          color: 'dim',
          className: vi.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const Uj = '_root_16zq4_1',
  qj = '_header_16zq4_8',
  Vj = '_grid_16zq4_14',
  Gj = '_empty_16zq4_20',
  wc = { root: Uj, header: qj, grid: Vj, empty: Gj },
  Yj = {
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
  Zj = {
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
  Xj = {
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
function Kj({ overridePatches: l, overrideEquipped: i, selectedId: s, onSelect: o }) {
  const f = V((_) => _.patches),
    d = V((_) => _.equippedPatches),
    m = l ?? f,
    p = i ?? d,
    g = new Set(Array.from(p.values()).map((_) => _.name)),
    y = Array.from(m.values());
  return y.length === 0
    ? u.jsx('div', {
        className: wc.root,
        children: u.jsx('div', {
          className: wc.empty,
          children: u.jsx(X, {
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
              u.jsx(X, { variant: 'heading-3', children: 'パッチ在庫' }),
              u.jsxs(X, { variant: 'caption', color: 'dim', children: [y.length, ' 種類'] }),
            ],
          }),
          u.jsx('div', {
            className: wc.grid,
            children: y.map((_) => {
              const b = `${_.name}#${_.tier}`,
                A = g.has(_.name);
              return u.jsx(
                df,
                {
                  patchId: b,
                  name: _.name,
                  iconName: Yj[_.name] ?? 'spark',
                  tier: _.tier,
                  count: _.count,
                  trigger: Zj[_.name] ?? '常時',
                  effect: Xj[_.name] ?? '-',
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
const Qj = '_root_1svx2_1',
  Wj = '_header_1svx2_8',
  Jj = '_tierControl_1svx2_14',
  Fj = '_tierStepperRow_1svx2_24',
  Ij = '_mergeList_1svx2_30',
  Pj = '_empty_1svx2_36',
  _i = { root: Qj, header: Wj, tierControl: Jj, tierStepperRow: Fj, mergeList: Ij, empty: Pj },
  tA = '_stepper_1ouvh_1',
  eA = '_disabled_1ouvh_6',
  aA = '_btn_1ouvh_11',
  nA = '_value_1ouvh_38',
  bi = {
    stepper: tA,
    disabled: eA,
    btn: aA,
    value: nA,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  lA = ({
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
      className: [bi.stepper, bi[`size-${d}`], m ? bi.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        u.jsx('button', {
          type: 'button',
          className: bi.btn,
          onClick: y,
          disabled: m || !p,
          'aria-label': '減少',
          children: '−',
        }),
        u.jsx('span', {
          className: bi.value,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          children: l,
        }),
        u.jsx('button', {
          type: 'button',
          className: bi.btn,
          onClick: _,
          disabled: m || !g,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  Wu = 5,
  iA = {
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
function E1(l, i) {
  const s = [];
  for (const o of l.values())
    o.tier < i &&
      o.count >= 2 &&
      s.push({ name: o.name, tier: o.tier, count: o.count, iconName: iA[o.name] ?? 'spark' });
  return s.sort((o, f) => o.tier - f.tier || o.name.localeCompare(f.name));
}
function cA(l, i) {
  let s = new Map(l),
    o = !0;
  for (; o; ) {
    o = !1;
    for (const f of Array.from(s.values())) {
      if (f.tier >= i || f.count < 2 || f.tier >= Wu) continue;
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
function sA({ overridePatches: l }) {
  const i = V((A) => A.patches),
    s = V((A) => A.addPatch),
    o = V((A) => A.consumePatch),
    f = V((A) => A.pruneEmptyPatches),
    d = l ?? i,
    m = Math.max(1, ...Array.from(d.values()).map((A) => A.tier)),
    [p, g] = q.useState(Math.min(m, Wu - 1)),
    y = E1(d, p + 1),
    _ = y.length > 0,
    b = () => {
      if (l) return;
      const A = cA(d, p + 1);
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
    className: _i.root,
    children: [
      u.jsx('div', {
        className: _i.header,
        children: u.jsx(X, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      u.jsxs('div', {
        className: _i.tierControl,
        children: [
          u.jsx(X, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          u.jsxs('div', {
            className: _i.tierStepperRow,
            children: [
              u.jsx(lA, { value: p, min: 1, max: Wu - 1, onChange: g }),
              u.jsxs(X, {
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
                className: _i.mergeList,
                children: y.map((A) =>
                  u.jsx(
                    df,
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
              u.jsx(He, {
                label: `一括合成 (${y.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: b,
              }),
            ],
          })
        : u.jsxs('div', {
            className: _i.empty,
            children: [
              u.jsx(X, { variant: 'body', color: 'dim', children: '合成可能なパッチがありません' }),
              u.jsx(X, {
                variant: 'caption',
                color: 'dim',
                children: '同じ Tier のパッチが 2 個以上あると合成できます',
              }),
            ],
          }),
    ],
  });
}
function oA(l) {
  return Math.min(1 + l, xi);
}
function rA() {
  const { navigate: l } = Gn(),
    [i, s] = q.useState('equip'),
    o = V((E) => E.equippedPatches),
    f = V((E) => E.patches),
    d = V((E) => E.machineLevels.patchSlots),
    m = oA(d),
    p = o.size,
    g = f.size,
    y = E1(f, 5).length,
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
    header: u.jsx(Lc, {
      title: 'パッチ庫',
      subtitle: `装着 ${p}/${m} ・ 在庫 ${g} 種`,
      onBack: b,
      currencies: [],
      tabBar: u.jsx(oo, { tabs: A, value: i, onChange: s, variant: 'underline', fullWidth: !0 }),
    }),
    footer: u.jsx(Bc, { active: 'patches', onChange: _ }),
    children: u.jsxs('div', {
      className: ij.content,
      children: [
        i === 'equip' && u.jsx(kj, {}),
        i === 'inventory' && u.jsx(Kj, {}),
        i === 'merge' && u.jsx(sA, {}),
      ],
    }),
  });
}
const uA = '_footer_qoo97_1',
  fA = '_tabPanel_qoo97_7',
  Gh = { footer: uA, tabPanel: fA },
  dA = '_wrapper_1lf9s_1',
  mA = '_header_1lf9s_7',
  hA = '_headerLabel_1lf9s_13',
  pA = '_empty_1lf9s_18',
  yA = '_emptyIcon_1lf9s_29',
  gA = '_grid_1lf9s_33',
  vA = '_note_1lf9s_39',
  _l = { wrapper: dA, header: mA, headerLabel: hA, empty: pA, emptyIcon: yA, grid: gA, note: vA },
  _A = {
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
function bA({ onOpenPatchScreen: l }) {
  const i = V((m) => m.equippedPatches),
    s = V((m) => m.machineLevels.patchSlots),
    o = Math.min(1 + s, xi),
    f = [];
  for (let m = 0; m < o; m++) {
    const p = i.get(m);
    if (p != null) {
      const g = _A[p.name],
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
          u.jsxs(X, {
            variant: 'caption',
            color: 'mid',
            className: _l.headerLabel,
            children: ['装着 ', d, ' / ', o],
          }),
          l != null &&
            u.jsx(He, {
              label: '装備変更',
              variant: 'ghost',
              size: 'sm',
              iconRight: u.jsx(Yt, { name: 'chevron-right', size: 14 }),
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
                children: u.jsx(Yt, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              u.jsx(X, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              l != null &&
                u.jsx(He, {
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
              u.jsx(M1, { patch: m.patch, slotIndex: m.idx, onClick: l }, p)
            ),
          }),
      u.jsx(X, {
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
const SA = '_wrapper_iebuz_1',
  xA = '_header_iebuz_7',
  jA = '_grid_iebuz_12',
  ku = { wrapper: SA, header: xA, grid: jA },
  AA = [
    { kind: 'laser', name: 'LASER', description: '高速直進ビーム。貫通で削る。', buildStats: v1 },
    { kind: 'cannon', name: 'CANNON', description: '範囲爆発で群れを薙ぐ。', buildStats: _1 },
    { kind: 'thunder', name: 'THUNDER', description: '同時 3 体を撃つ電撃。', buildStats: b1 },
    {
      kind: 'cutter',
      name: 'CUTTER',
      description: 'マシン周囲を旋回する斬撃。',
      buildStats: (l, i) => S1(l, i),
    },
  ];
function TA({ selectedWeapon: l, onSelect: i }) {
  const s = V((y) => y.initialWeapon),
    o = V((y) => y.setInitialWeapon),
    f = V((y) => y.machineLevels),
    d = y1(f.baseAttack),
    m = g1(f.range),
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
        children: u.jsx(X, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      u.jsx('div', {
        className: ku.grid,
        children: AA.map((y) =>
          u.jsx(
            d1,
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
const MA = '_wrapper_1rg1e_1',
  EA = '_sticky_1rg1e_15',
  wA = '_summary_1rg1e_19',
  NA = '_weaponInfo_1rg1e_29',
  zA = '_patchInfo_1rg1e_37',
  Nc = { wrapper: MA, sticky: EA, summary: wA, weaponInfo: NA, patchInfo: zA };
function CA({
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
          l != null && u.jsx(Hc, { variant: 'tier', tier: l, size: 'sm' }),
          i != null &&
            u.jsxs('span', {
              className: Nc.weaponInfo,
              children: [
                u.jsx(Yt, { name: i, size: 14 }),
                u.jsx(X, { variant: 'label', color: 'primary', children: i.toUpperCase() }),
              ],
            }),
          u.jsxs('span', {
            className: Nc.patchInfo,
            children: [
              u.jsx(Yt, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              u.jsxs(X, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', s] }),
            ],
          }),
        ],
      }),
      u.jsx(He, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: o,
        iconLeft: u.jsx(Yt, { name: 'tower', size: 18 }),
        onClick: f,
      }),
    ],
  });
}
const RA = '_wrapper_1ul9l_1',
  OA = '_header_1ul9l_7',
  DA = '_grid_1ul9l_14',
  BA = '_tierBtn_1ul9l_20',
  LA = '_active_1ul9l_35',
  $A = '_tierLabel_1ul9l_50',
  HA = '_frontierLabel_1ul9l_61',
  bl = {
    wrapper: RA,
    header: OA,
    grid: DA,
    tierBtn: BA,
    active: LA,
    tierLabel: $A,
    frontierLabel: HA,
  };
function kA({ selectedTier: l, onSelect: i }) {
  const s = V((m) => m.highestTier),
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
          u.jsx(X, {
            variant: 'caption',
            color: 'mid',
            children: '到達済み Tier を選んで出撃します。',
          }),
          u.jsxs(X, { variant: 'numeric-s', color: 'dim', children: ['最大 Tier ', o] }),
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
const UA = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function qA(l) {
  const { initialSelectedTier: i } = l,
    { navigate: s } = Gn(),
    [o, f] = q.useState('tier'),
    d = V((R) => R.highestTier),
    [m, p] = q.useState(i ?? Math.max(1, d)),
    g = V((R) => R.initialWeapon),
    _ = [...V((R) => R.equippedPatches).values()].length,
    b = V((R) => R.machineLevels),
    A = V((R) => R.startRun);
  function E() {
    const R = Mi.find((Y) => Y.key === 'maxHp'),
      G = R != null ? Tl(R, b.maxHp) : 100;
    (A({ initialWeapon: g, baseMachineMaxHp: W.fromNumber(G) }), s('battle'));
  }
  const T = u.jsx(Lc, {
      title: '出撃準備',
      currencies: ['bolt', 'alloy'],
      tabBar: u.jsx(oo, { tabs: UA, value: o, onChange: f, variant: 'underline', fullWidth: !0 }),
    }),
    D = u.jsxs('div', {
      className: Gh.footer,
      children: [
        u.jsx(CA, { tier: m, weaponKind: g, patchCount: _, sticky: !1, onLaunch: E }),
        u.jsx(Bc, { active: 'preparation', onChange: (R) => s(R) }),
      ],
    });
  return u.jsx(El, {
    header: T,
    footer: D,
    children: u.jsxs('div', {
      className: Gh.tabPanel,
      children: [
        o === 'tier' && u.jsx(kA, { selectedTier: m, onSelect: p }),
        o === 'weapon' && u.jsx(TA, {}),
        o === 'patches' && u.jsx(bA, { onOpenPatchScreen: () => s('patches') }),
      ],
    }),
  });
}
const VA = '_content_8gsha_1',
  GA = { content: VA },
  YA = '_root_1b7n9_1',
  ZA = '_header_1b7n9_8',
  XA = '_storageCard_1b7n9_13',
  KA = '_storageRow_1b7n9_23',
  QA = '_divider_1b7n9_29',
  WA = '_section_1b7n9_34',
  JA = '_dangerSection_1b7n9_40',
  FA = '_sectionHeader_1b7n9_50',
  ha = {
    root: YA,
    header: ZA,
    storageCard: XA,
    storageRow: KA,
    divider: QA,
    section: WA,
    dangerSection: JA,
    sectionHeader: FA,
  },
  IA = '_wrapper_11b89_1',
  PA = '_disabled_11b89_6',
  tT = '_hiddenInput_11b89_11',
  eT = '_btn_11b89_15',
  aT = '_fileName_11b89_41',
  zc = { wrapper: IA, disabled: PA, hiddenInput: tT, btn: eT, fileName: aT },
  nT = ({
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
function lT({ storageInfo: l, onExport: i, onImport: s, onReset: o }) {
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
    className: ha.root,
    children: [
      u.jsx('div', {
        className: ha.header,
        children: u.jsx(X, { variant: 'heading-3', children: 'データ管理' }),
      }),
      l &&
        u.jsxs('div', {
          className: ha.storageCard,
          children: [
            u.jsx(X, { variant: 'label', color: 'mid', children: 'ストレージ使用量' }),
            u.jsxs('div', {
              className: ha.storageRow,
              children: [
                u.jsx(X, { variant: 'numeric-l', children: l.usedKb }),
                u.jsx(X, { variant: 'caption', color: 'dim', children: 'KB' }),
              ],
            }),
            u.jsxs(X, {
              variant: 'caption',
              color: 'dim',
              children: ['セーブスロット: ', l.slots, ' / 最終保存: ', l.lastSavedAt],
            }),
          ],
        }),
      u.jsx('div', { className: ha.divider }),
      u.jsxs('div', {
        className: ha.section,
        children: [
          u.jsxs('div', {
            className: ha.sectionHeader,
            children: [
              u.jsx(X, { variant: 'label', color: 'mid', children: 'エクスポート' }),
              u.jsx(X, {
                variant: 'caption',
                color: 'dim',
                children: 'セーブデータを JSON ファイルとしてダウンロード',
              }),
            ],
          }),
          u.jsx(He, {
            label: g ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: _,
            disabled: g || !i,
          }),
        ],
      }),
      u.jsxs('div', {
        className: ha.section,
        children: [
          u.jsxs('div', {
            className: ha.sectionHeader,
            children: [
              u.jsx(X, { variant: 'label', color: 'mid', children: 'インポート' }),
              u.jsx(X, {
                variant: 'caption',
                color: 'dim',
                children: 'JSON ファイルからセーブデータを復元（上書き）',
              }),
            ],
          }),
          u.jsx(nT, {
            accept: 'application/json',
            onChange: b,
            label: m ? 'インポート中...' : 'ファイルを選択してインポート',
            disabled: m || !s,
          }),
        ],
      }),
      u.jsx('div', { className: ha.divider }),
      u.jsxs('div', {
        className: ha.dangerSection,
        children: [
          u.jsxs('div', {
            className: ha.sectionHeader,
            children: [
              u.jsx(X, { variant: 'label', color: 'mid', children: 'データリセット' }),
              u.jsx(X, {
                variant: 'caption',
                color: 'dim',
                children: 'すべてのデータを削除します。この操作は取り消せません。',
              }),
            ],
          }),
          u.jsx(He, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => d(!0),
            disabled: !o,
          }),
        ],
      }),
      u.jsx(A1, {
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
const iT = '_root_1rbig_1',
  cT = '_header_1rbig_8',
  sT = '_section_1rbig_13',
  Uu = { root: iT, header: cT, section: sT },
  oT = '_wrapper_16nmz_9',
  rT = '_disabled_16nmz_15',
  uT = '_off_16nmz_31',
  fT = '_on_16nmz_35',
  dT = '_accent_primary_16nmz_35',
  mT = '_accent_secondary_16nmz_39',
  hT = '_accent_success_16nmz_43',
  pT = '_accent_disabled_16nmz_47',
  yT = '_size_md_16nmz_56',
  gT = '_knob_16nmz_60',
  vT = '_size_sm_16nmz_70',
  _T = '_labelGroup_16nmz_93',
  bT = '_label_16nmz_93',
  ST = '_description_16nmz_106',
  ja = {
    wrapper: oT,
    disabled: rT,
    switch: '_switch_16nmz_22',
    off: uT,
    on: fT,
    accent_primary: dT,
    accent_secondary: mT,
    accent_success: hT,
    accent_disabled: pT,
    size_md: yT,
    knob: gT,
    size_sm: vT,
    labelGroup: _T,
    label: bT,
    description: ST,
  },
  w1 = ({
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
      className: [ja.wrapper, p ? ja.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': p,
      children: [
        u.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': l,
          'aria-disabled': p,
          className: [ja.switch, l ? ja.on : ja.off, ja[`size_${m}`], ja[`accent_${d}`]]
            .filter(Boolean)
            .join(' '),
          onClick: g,
          disabled: p,
          children: u.jsx('span', { className: ja.knob }),
        }),
        (o || f) &&
          u.jsxs('span', {
            className: ja.labelGroup,
            children: [
              o && u.jsx('span', { className: ja.label, children: o }),
              f && u.jsx('span', { className: ja.description, children: f }),
            ],
          }),
      ],
    });
  };
function xT({ overrideVibration: l, onVibrationChange: i }) {
  const s = V((m) => m.vibrationEnabled),
    o = V((m) => m.setVibrationEnabled),
    f = l ?? s,
    d = (m) => {
      i ? i(m) : o(m);
    };
  return u.jsxs('div', {
    className: Uu.root,
    children: [
      u.jsx('div', {
        className: Uu.header,
        children: u.jsx(X, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      u.jsx('div', {
        className: Uu.section,
        children: u.jsx(w1, {
          checked: f,
          onChange: d,
          label: 'バイブレーション',
          description: '操作時に端末を振動させます',
        }),
      }),
    ],
  });
}
const jT = '_root_nuc5y_2',
  AT = '_muteRow_nuc5y_9',
  TT = '_muteLabelGroup_nuc5y_16',
  MT = '_sliderRow_nuc5y_24',
  ET = '_muted_nuc5y_29',
  wT = '_sliderIcon_nuc5y_29',
  NT = '_sliderArea_nuc5y_41',
  zT = '_sliderValue_nuc5y_46',
  qn = {
    root: jT,
    muteRow: AT,
    muteLabelGroup: TT,
    sliderRow: MT,
    muted: ET,
    sliderIcon: wT,
    sliderArea: NT,
    sliderValue: zT,
  };
function Yh({ label: l, iconName: i, value: s, muted: o, onChange: f }) {
  return u.jsx(Nl, {
    variant: 'sunken',
    padding: 'md',
    children: u.jsxs('div', {
      className: [qn.sliderRow, o ? qn.muted : ''].filter(Boolean).join(' '),
      children: [
        u.jsx('span', { className: qn.sliderIcon, children: u.jsx(Yt, { name: i, size: 16 }) }),
        u.jsx(X, { variant: 'label', color: o ? 'dim' : 'mid', children: l }),
        u.jsx('div', {
          className: qn.sliderArea,
          children: u.jsx(Ku, { value: s, min: 0, max: 1, step: 0.01, onChange: f, disabled: o }),
        }),
        u.jsx('span', {
          className: qn.sliderValue,
          children: u.jsx(Vn, {
            value: Math.round(s * 100),
            size: 'sm',
            accentColor: o ? 'dim' : 'text',
          }),
        }),
      ],
    }),
  });
}
function CT({
  overrideBgmVolume: l,
  overrideSeVolume: i,
  overrideMute: s,
  onBgmChange: o,
  onSeChange: f,
  onMuteChange: d,
}) {
  const m = V((R) => R.bgmVolume),
    p = V((R) => R.seVolume),
    g = V((R) => R.setBgmVolume),
    y = V((R) => R.setSeVolume),
    _ = l ?? m,
    b = i ?? p,
    A = s ?? !1,
    E = (R) => {
      o ? o(R) : (g(R), Ft.setBgmVolume(A ? 0 : R));
    },
    T = (R) => {
      f ? f(R) : (y(R), Ft.setSeVolume(A ? 0 : R));
    },
    D = (R) => {
      d ? d(R) : (Ft.setBgmVolume(R ? 0 : _), Ft.setSeVolume(R ? 0 : b));
    };
  return u.jsxs('div', {
    className: qn.root,
    role: 'tabpanel',
    'aria-label': 'サウンド設定',
    children: [
      u.jsx(Nl, {
        variant: 'sunken',
        padding: 'md',
        children: u.jsxs('div', {
          className: qn.muteRow,
          children: [
            u.jsxs('span', {
              className: qn.muteLabelGroup,
              children: [
                u.jsx(X, { variant: 'label', color: 'mid', children: 'ミュート' }),
                u.jsx(X, { variant: 'caption', color: 'dim', children: '全サウンドを一時停止' }),
              ],
            }),
            u.jsx(w1, { checked: A, onChange: D, accent: 'primary' }),
          ],
        }),
      }),
      u.jsx(Yh, { label: 'BGM', iconName: 'play', value: _, muted: A, onChange: E }),
      u.jsx(Yh, { label: 'SE', iconName: 'spark', value: b, muted: A, onChange: T }),
    ],
  });
}
const Ju = (l, i) => i.some((s) => l instanceof s);
let Zh, Xh;
function RT() {
  return Zh || (Zh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function OT() {
  return (
    Xh ||
    (Xh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Fu = new WeakMap(),
  qu = new WeakMap(),
  yo = new WeakMap();
function DT(l) {
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
function BT(l) {
  if (Fu.has(l)) return;
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
  Fu.set(l, i);
}
let Iu = {
  get(l, i, s) {
    if (l instanceof IDBTransaction) {
      if (i === 'done') return Fu.get(l);
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
function N1(l) {
  Iu = l(Iu);
}
function LT(l) {
  return OT().includes(l)
    ? function (...i) {
        return (l.apply(Pu(this), i), Al(this.request));
      }
    : function (...i) {
        return Al(l.apply(Pu(this), i));
      };
}
function $T(l) {
  return typeof l == 'function'
    ? LT(l)
    : (l instanceof IDBTransaction && BT(l), Ju(l, RT()) ? new Proxy(l, Iu) : l);
}
function Al(l) {
  if (l instanceof IDBRequest) return DT(l);
  if (qu.has(l)) return qu.get(l);
  const i = $T(l);
  return (i !== l && (qu.set(l, i), yo.set(i, l)), i);
}
const Pu = (l) => yo.get(l);
function HT(l, i, { blocked: s, upgrade: o, blocking: f, terminated: d } = {}) {
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
const kT = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  UT = ['put', 'add', 'delete', 'clear'],
  Vu = new Map();
function Kh(l, i) {
  if (!(l instanceof IDBDatabase && !(i in l) && typeof i == 'string')) return;
  if (Vu.get(i)) return Vu.get(i);
  const s = i.replace(/FromIndex$/, ''),
    o = i !== s,
    f = UT.includes(s);
  if (!(s in (o ? IDBIndex : IDBObjectStore).prototype) || !(f || kT.includes(s))) return;
  const d = async function (m, ...p) {
    const g = this.transaction(m, f ? 'readwrite' : 'readonly');
    let y = g.store;
    return (o && (y = y.index(p.shift())), (await Promise.all([y[s](...p), f && g.done]))[0]);
  };
  return (Vu.set(i, d), d);
}
N1((l) => ({
  ...l,
  get: (i, s, o) => Kh(i, s) || l.get(i, s, o),
  has: (i, s) => !!Kh(i, s) || l.has(i, s),
}));
const qT = ['continue', 'continuePrimaryKey', 'advance'],
  Qh = {},
  tf = new WeakMap(),
  z1 = new WeakMap(),
  VT = {
    get(l, i) {
      if (!qT.includes(i)) return l[i];
      let s = Qh[i];
      return (
        s ||
          (s = Qh[i] =
            function (...o) {
              tf.set(this, z1.get(this)[i](...o));
            }),
        s
      );
    },
  };
async function* GT(...l) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...l)), !i)) return;
  i = i;
  const s = new Proxy(i, VT);
  for (z1.set(s, i), yo.set(s, Pu(i)); i; )
    (yield s, (i = await (tf.get(s) || i.continue())), tf.delete(s));
}
function Wh(l, i) {
  return (
    (i === Symbol.asyncIterator && Ju(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && Ju(l, [IDBIndex, IDBObjectStore]))
  );
}
N1((l) => ({
  ...l,
  get(i, s, o) {
    return Wh(i, s) ? GT : l.get(i, s, o);
  },
  has(i, s) {
    return Wh(i, s) || l.has(i, s);
  },
}));
const YT = {
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
function ZT(l, i, s, o) {
  for (let f = s + 1; f <= o; f++) {
    const d = YT[f];
    if (!d) throw new Error(`No migration registered for version ${f}`);
    d(l, i);
  }
}
let Cc = null;
async function ef() {
  return (
    Cc ||
    ((Cc = await HT(i1, so, {
      upgrade(l, i, s, o) {
        try {
          ZT(l, o, i, s ?? so);
        } catch (f) {
          throw (console.error('[DB] Migration failed:', f), f);
        }
      },
    })),
    await XT(Cc),
    Cc)
  );
}
async function XT(l) {
  const i = l.transaction([P.profile, P.currencies, P.machine, P.weapons, P.settings], 'readwrite'),
    [s, o, f, d] = await Promise.all([
      i.objectStore(P.profile).get('singleton'),
      i.objectStore(P.currencies).get('singleton'),
      i.objectStore(P.weapons).get('singleton'),
      i.objectStore(P.settings).get('singleton'),
    ]),
    m = Date.now(),
    p = [];
  (s || p.push(i.objectStore(P.profile).put({ ...c1, createdAt: m, lastPlayedAt: m })),
    o || p.push(i.objectStore(P.currencies).put(s1)),
    f || p.push(i.objectStore(P.weapons).put(o1)),
    d || p.push(i.objectStore(P.settings).put(r1)));
  const g = i.objectStore(P.machine),
    y = await g.getAllKeys(),
    _ = new Set(y);
  for (const b of ro) _.has(b) || p.push(g.put({ key: b, lv: 0 }));
  (await Promise.all(p), await i.done);
}
async function KT(l, i) {
  await l.put(P.profile, i);
}
async function QT(l, i) {
  await l.put(P.currencies, i);
}
async function WT(l, i) {
  await l.put(P.machine, i);
}
async function JT(l, i) {
  await l.put(P.weapons, i);
}
async function FT(l, i) {
  await l.put(P.patches, i);
}
async function IT(l) {
  return l.getAll(P.equippedPatches);
}
async function PT(l, i) {
  const o = (await IT(l)).find((f) => f.name === i.name && f.slotIndex !== i.slotIndex);
  if (o) throw new Error(`Patch "${i.name}" is already equipped in slot ${o.slotIndex}`);
  await l.put(P.equippedPatches, i);
}
async function tM(l, i) {
  await l.put(P.settings, i);
}
async function C1(l) {
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
const R1 = 'tower-like-game:import-backups',
  eM = 3;
function aM() {
  try {
    const l = localStorage.getItem(R1);
    return l ? JSON.parse(l) : [];
  } catch {
    return [];
  }
}
function nM(l) {
  try {
    localStorage.setItem(R1, JSON.stringify(l));
  } catch (i) {
    console.warn('[DB] Failed to save backup to localStorage:', i);
  }
}
function lM(l) {
  const i = aM();
  i.unshift({ savedAt: Date.now(), data: l });
  const s = i.slice(0, eM);
  nM(s);
}
async function O1(l) {
  const i = await C1(l);
  return { formatVersion: 1, dbVersion: so, exportedAt: Date.now(), data: i };
}
async function iM(l, i) {
  if (i.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${i.formatVersion}`);
  try {
    const d = await O1(l);
    lM(d);
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
const cM = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function sM() {
  const { navigate: l } = Gn(),
    [i, s] = q.useState('sound'),
    o = async () => {
      const m = await ef(),
        p = await O1(m),
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
      (await iM(y, g), window.location.reload());
    },
    d = async () => {
      (indexedDB.deleteDatabase(i1), window.location.reload());
    };
  return u.jsx(El, {
    header: u.jsx(Lc, {
      title: '設定',
      onBack: () => l('title'),
      currencies: [],
      tabBar: u.jsx(oo, { tabs: cM, value: i, onChange: s, fullWidth: !0 }),
    }),
    footer: u.jsx(Bc, { active: 'settings', onChange: l }),
    children: u.jsxs('div', {
      className: GA.content,
      children: [
        i === 'sound' && u.jsx(CT, {}),
        i === 'game' && u.jsx(xT, {}),
        i === 'data' && u.jsx(lT, { onExport: o, onImport: f, onReset: d }),
      ],
    }),
  });
}
const oM = '_layout_198wk_1',
  rM = '_heroWrap_198wk_12',
  Jh = { layout: oM, heroWrap: rM },
  uM = '_banner_sva4m_3',
  fM = '_bannerInfo_sva4m_24',
  Gu = { banner: uM, bannerInfo: fM };
function dM({ banner: l, onApply: i }) {
  return l === null
    ? null
    : l.kind === 'has-update'
      ? u.jsxs('div', {
          className: Gu.banner,
          role: 'status',
          'aria-live': 'polite',
          children: [
            u.jsx(X, { variant: 'body', color: 'default', children: '新しいバージョンがあります' }),
            u.jsx(He, { label: '更新', size: 'sm', variant: 'primary', onClick: i }),
          ],
        })
      : u.jsx('div', {
          className: `${Gu.banner} ${Gu.bannerInfo}`,
          role: 'status',
          'aria-live': 'polite',
          children: u.jsx(X, {
            variant: 'body',
            color: 'dim',
            children: '現在のバージョンは最新です',
          }),
        });
}
const mM = '_root_5udm7_1',
  hM = { root: mM };
function pM({
  onResume: l,
  onNewGame: i,
  lastSavedAt: s,
  onCheckUpdate: o,
  isCheckingUpdate: f = !1,
}) {
  const m = V((p) => p.createdAt) > 0;
  return u.jsxs('div', {
    className: hM.root,
    children: [
      u.jsx(He, {
        label: m ? '続きから' : '続きから (セーブなし)',
        variant: m ? 'primary' : 'ghost',
        size: 'lg',
        fullWidth: !0,
        disabled: !m,
        iconLeft: u.jsx(Yt, { name: 'play', size: 18 }),
        onClick: l,
      }),
      m &&
        s != null &&
        u.jsx(X, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
          children: '最終セーブ: ' + s,
        }),
      u.jsx(He, {
        label: '新規開始',
        variant: m ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: u.jsx(Yt, { name: 'plus', size: 18 }),
        onClick: i,
      }),
      o != null &&
        u.jsx(He, {
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
const yM = '_root_qkflo_2',
  gM = '_title_qkflo_12',
  Fh = { root: yM, title: gM };
function vM({ title: l = 'NEON SPIRE', subtitle: i, version: s, tagline: o }) {
  return u.jsxs('header', {
    className: Fh.root,
    role: 'banner',
    children: [
      u.jsx('h1', { className: Fh.title, children: l }),
      i != null &&
        u.jsx(X, {
          variant: 'label',
          color: 'mid',
          align: 'center',
          style: { fontSize: 11, letterSpacing: '0.24em' },
          children: i,
        }),
      o != null &&
        u.jsx(X, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { marginTop: 4, fontSize: 11 },
          children: o,
        }),
      s != null &&
        u.jsx(X, {
          variant: 'numeric-s',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10, marginTop: 6, opacity: 0.7 },
          children: s,
        }),
    ],
  });
}
const _M = '_root_1szye_1',
  bM = '_ringOuter_1szye_9',
  SM = '_ringMiddle_1szye_17',
  xM = '_glowDisc_1szye_24',
  jM = '_cornerAccent_1szye_31',
  AM = '_icon_1szye_40',
  Si = { root: _M, ringOuter: bM, ringMiddle: SM, glowDisc: xM, cornerAccent: jM, icon: AM };
function TM({ size: l = 180, iconName: i = 'tower' }) {
  return u.jsxs('div', {
    className: Si.root,
    style: { width: l, height: l },
    role: 'presentation',
    'aria-hidden': 'true',
    children: [
      u.jsx('div', { className: Si.ringOuter }),
      u.jsx('div', { className: Si.ringMiddle }),
      u.jsx('div', { className: Si.glowDisc }),
      [0, 90, 180, 270].map((s) =>
        u.jsx(
          'div',
          {
            className: Si.cornerAccent,
            style: { transform: `rotate(${s}deg) translate(${l / 2 - 5}px) rotate(45deg)` },
          },
          s
        )
      ),
      u.jsx('span', {
        className: Si.icon,
        children: u.jsx(Yt, { name: i, size: Math.round(l * 0.49) }),
      }),
    ],
  });
}
const MM = 'modulepreload',
  EM = function (l) {
    return '/tower-like-game/' + l;
  },
  Ih = {},
  wM = function (i, s, o) {
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
          if (((y = EM(y)), y in Ih)) return;
          Ih[y] = !0;
          const _ = y.endsWith('.css'),
            b = _ ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${y}"]${b}`)) return;
          const A = document.createElement('link');
          if (
            ((A.rel = _ ? 'stylesheet' : MM),
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
function NM(l = {}) {
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
        ((p = await wM(async () => {
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
function zM(l = {}) {
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
      NM({
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
const CM = 2500,
  RM = 1500;
function OM() {
  const l = q.useRef(null),
    {
      needRefresh: [i],
      updateServiceWorker: s,
    } = zM({
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
              window.setTimeout(E, RM);
            }));
        } catch {}
        (f(!1),
          g.current ||
            (m(!0),
            p.current !== null && window.clearTimeout(p.current),
            (p.current = window.setTimeout(() => {
              (m(!1), (p.current = null));
            }, CM))));
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
function DM(l) {
  if (l < 0) return '今';
  const i = Math.floor(l / 1e3);
  if (i < 60) return '今';
  const s = Math.floor(i / 60);
  if (s < 60) return `${s} 分前`;
  const o = Math.floor(s / 60);
  return o < 24 ? `${o} 時間前` : `${Math.floor(o / 24)} 日前`;
}
function BM() {
  const { navigate: l } = Gn(),
    i = V((p) => p.createdAt),
    { banner: s, checkForUpdate: o, isChecking: f, applyUpdate: d } = OM(),
    m = q.useMemo(() => (i > 0 ? DM(Date.now() - i) : void 0), [i]);
  return u.jsx(El, {
    children: u.jsxs('div', {
      className: Jh.layout,
      children: [
        u.jsx(vM, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.2.0',
        }),
        u.jsx('div', { className: Jh.heroWrap, children: u.jsx(TM, {}) }),
        u.jsx(pM, {
          lastSavedAt: m,
          onResume: () => l('preparation'),
          onNewGame: () => l('preparation'),
          onCheckUpdate: () => void o(),
          isCheckingUpdate: f,
        }),
        u.jsx(dM, { banner: s, onApply: d }),
      ],
    }),
  });
}
const LM = {
  title: 'title',
  preparation: 'base',
  machine: 'base',
  armory: 'base',
  patches: 'base',
  settings: 'base',
  battle: 'battleNormal',
};
function $M(l, i) {
  (q.useEffect(() => {
    const s = () => {
      Ft.isInitialized() || (Ft.init(), Ft.setBgmVolume(l), Ft.setSeVolume(i));
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
      Ft.setBgmVolume(l);
    }, [l]),
    q.useEffect(() => {
      Ft.setSeVolume(i);
    }, [i]));
}
function HM() {
  const { screen: l } = Gn(),
    i = V((o) => o.bgmVolume),
    s = V((o) => o.seVolume);
  switch (
    ($M(i, s),
    q.useEffect(() => {
      Ft.playBgm(LM[l]);
    }, [l]),
    l)
  ) {
    case 'title':
      return u.jsx(BM, {});
    case 'preparation':
      return u.jsx(qA, {});
    case 'machine':
      return u.jsx(aj, {});
    case 'armory':
      return u.jsx(SS, {});
    case 'patches':
      return u.jsx(rA, {});
    case 'settings':
      return u.jsx(sM, {});
    case 'battle':
      return u.jsx(I4, {});
    default:
      return u.jsx(nj, {});
  }
}
async function Yn() {
  return ef();
}
async function kM() {
  const l = await Yn(),
    i = await C1(l),
    s = V.getState(),
    o = i.profile ?? c1;
  V.setState({
    highestTier: o.highestTier,
    highestWave: o.highestWave,
    totalPlayTimeSec: o.totalPlayTimeSec,
    totalRuns: o.totalRuns,
    totalEnemiesKilled: o.totalEnemiesKilled,
    createdAt: o.createdAt,
    lastPlayedAt: o.lastPlayedAt,
  });
  const f = i.currencies ?? s1;
  V.setState({ bolt: W.fromJSON(f.bolt), alloy: W.fromJSON(f.alloy) });
  const d = i.machine,
    m = { ...s.machineLevels };
  for (const E of ro) {
    const T = d.find((D) => D.key === E);
    m[E] = T ? T.lv : 0;
  }
  V.setState({ machineLevels: m });
  const p = i.weapons ?? o1;
  V.setState({ weaponLv: p.weaponLv, initialWeapon: p.initialWeapon });
  const g = i.patches,
    y = new Map();
  for (const E of g)
    E.count > 0 && y.set(Xu(E.name, E.tier), { name: E.name, tier: E.tier, count: E.count });
  V.setState({ patches: y });
  const _ = i.equippedPatches,
    b = new Map();
  for (const E of _) b.set(E.slotIndex, { name: E.name, tier: E.tier });
  V.setState({ equippedPatches: b });
  const A = i.settings ?? r1;
  V.setState({
    bgmVolume: A.bgmVolume,
    seVolume: A.seVolume,
    vibrationEnabled: A.vibrationEnabled,
  });
}
async function D1() {
  const l = await Yn(),
    { bolt: i, alloy: s } = V.getState();
  await QT(l, { id: 'singleton', bolt: i.toJSON(), alloy: s.toJSON() });
}
async function B1() {
  const l = await Yn(),
    { machineLevels: i } = V.getState();
  await Promise.all(ro.map((s) => WT(l, { key: s, lv: i[s] })));
}
async function L1() {
  const l = await Yn(),
    { weaponLv: i, initialWeapon: s } = V.getState();
  await JT(l, { id: 'singleton', weaponLv: i, initialWeapon: s });
}
async function $1() {
  const l = await Yn(),
    { bgmVolume: i, seVolume: s, vibrationEnabled: o } = V.getState();
  await tM(l, { id: 'singleton', bgmVolume: i, seVolume: s, vibrationEnabled: o });
}
async function H1() {
  const l = await Yn(),
    {
      highestTier: i,
      highestWave: s,
      totalPlayTimeSec: o,
      totalRuns: f,
      totalEnemiesKilled: d,
      createdAt: m,
      lastPlayedAt: p,
    } = V.getState();
  await KT(l, {
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
async function k1() {
  const l = await Yn(),
    { patches: i } = V.getState(),
    s = [];
  for (const o of i.values())
    o.count > 0 && s.push(FT(l, { name: o.name, tier: o.tier, count: o.count }));
  await Promise.all(s);
}
async function U1() {
  const l = await Yn(),
    { equippedPatches: i } = V.getState(),
    s = [];
  for (const [o, f] of i) s.push(PT(l, { slotIndex: o, name: f.name, tier: f.tier }));
  await Promise.all(s);
}
async function q1() {
  await Promise.all([H1(), D1(), B1(), L1(), k1(), U1(), $1()]);
}
function UM() {
  const l = () => {
    document.visibilityState === 'hidden' && q1();
  };
  return (
    document.addEventListener('visibilitychange', l),
    () => document.removeEventListener('visibilitychange', l)
  );
}
const qM = 500;
function Sl(l, i) {
  let s = null;
  return () => {
    (s != null && clearTimeout(s),
      (s = setTimeout(() => {
        i().catch((o) => {
          console.error(`[autosave:${l}] failed`, o);
        });
      }, qM)));
  };
}
function VM() {
  (UM(),
    window.addEventListener('beforeunload', () => {
      q1();
    }));
  const l = Sl('currencies', D1),
    i = Sl('machine', B1),
    s = Sl('weapons', L1),
    o = Sl('settings', $1),
    f = Sl('profile', H1),
    d = Sl('patches', k1),
    m = Sl('equippedPatches', U1);
  V.subscribe((p, g) => {
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
const V1 = document.getElementById('root');
if (!V1) throw new Error('Failed to find #root element');
const GM = dg.createRoot(V1);
kM()
  .catch((l) => {
    console.error('[hydrateStore] failed', l);
  })
  .finally(() => {
    (VM(), GM.render(u.jsx(_S, { children: u.jsx(HM, {}) })));
  });
