var xv = Object.defineProperty;
var jv = (i, s, u) =>
  s in i ? xv(i, s, { enumerable: !0, configurable: !0, writable: !0, value: u }) : (i[s] = u);
var ea = (i, s, u) => jv(i, typeof s != 'symbol' ? s + '' : s, u);
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) o(d);
  new MutationObserver((d) => {
    for (const f of d)
      if (f.type === 'childList')
        for (const h of f.addedNodes) h.tagName === 'LINK' && h.rel === 'modulepreload' && o(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(d) {
    const f = {};
    return (
      d.integrity && (f.integrity = d.integrity),
      d.referrerPolicy && (f.referrerPolicy = d.referrerPolicy),
      d.crossOrigin === 'use-credentials'
        ? (f.credentials = 'include')
        : d.crossOrigin === 'anonymous'
          ? (f.credentials = 'omit')
          : (f.credentials = 'same-origin'),
      f
    );
  }
  function o(d) {
    if (d.ep) return;
    d.ep = !0;
    const f = u(d);
    fetch(d.href, f);
  }
})();
function Av(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, 'default') ? i.default : i;
}
var Wo = { exports: {} },
  Hi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zh;
function Tv() {
  if (zh) return Hi;
  zh = 1;
  var i = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.fragment');
  function u(o, d, f) {
    var h = null;
    if ((f !== void 0 && (h = '' + f), d.key !== void 0 && (h = '' + d.key), 'key' in d)) {
      f = {};
      for (var p in d) p !== 'key' && (f[p] = d[p]);
    } else f = d;
    return ((d = f.ref), { $$typeof: i, type: o, key: h, ref: d !== void 0 ? d : null, props: f });
  }
  return ((Hi.Fragment = s), (Hi.jsx = u), (Hi.jsxs = u), Hi);
}
var Ch;
function Ev() {
  return (Ch || ((Ch = 1), (Wo.exports = Tv())), Wo.exports);
}
var r = Ev(),
  Fo = { exports: {} },
  qi = {},
  Io = { exports: {} },
  Po = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Rh;
function Nv() {
  return (
    Rh ||
      ((Rh = 1),
      (function (i) {
        function s(w, $) {
          var ee = w.length;
          w.push($);
          e: for (; 0 < ee; ) {
            var ye = (ee - 1) >>> 1,
              ge = w[ye];
            if (0 < d(ge, $)) ((w[ye] = $), (w[ee] = ge), (ee = ye));
            else break e;
          }
        }
        function u(w) {
          return w.length === 0 ? null : w[0];
        }
        function o(w) {
          if (w.length === 0) return null;
          var $ = w[0],
            ee = w.pop();
          if (ee !== $) {
            w[0] = ee;
            e: for (var ye = 0, ge = w.length, x = ge >>> 1; ye < x; ) {
              var L = 2 * (ye + 1) - 1,
                G = w[L],
                Y = L + 1,
                ae = w[Y];
              if (0 > d(G, ee))
                Y < ge && 0 > d(ae, G)
                  ? ((w[ye] = ae), (w[Y] = ee), (ye = Y))
                  : ((w[ye] = G), (w[L] = ee), (ye = L));
              else if (Y < ge && 0 > d(ae, ee)) ((w[ye] = ae), (w[Y] = ee), (ye = Y));
              else break e;
            }
          }
          return $;
        }
        function d(w, $) {
          var ee = w.sortIndex - $.sortIndex;
          return ee !== 0 ? ee : w.id - $.id;
        }
        if (
          ((i.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var f = performance;
          i.unstable_now = function () {
            return f.now();
          };
        } else {
          var h = Date,
            p = h.now();
          i.unstable_now = function () {
            return h.now() - p;
          };
        }
        var y = [],
          g = [],
          _ = 1,
          j = null,
          T = 3,
          z = !1,
          C = !1,
          U = !1,
          q = !1,
          F = typeof setTimeout == 'function' ? setTimeout : null,
          I = typeof clearTimeout == 'function' ? clearTimeout : null,
          de = typeof setImmediate < 'u' ? setImmediate : null;
        function Se(w) {
          for (var $ = u(g); $ !== null; ) {
            if ($.callback === null) o(g);
            else if ($.startTime <= w) (o(g), ($.sortIndex = $.expirationTime), s(y, $));
            else break;
            $ = u(g);
          }
        }
        function et(w) {
          if (((U = !1), Se(w), !C))
            if (u(y) !== null) ((C = !0), qe || ((qe = !0), He()));
            else {
              var $ = u(g);
              $ !== null && tt(et, $.startTime - w);
            }
        }
        var qe = !1,
          P = -1,
          we = 5,
          ke = -1;
        function le() {
          return q ? !0 : !(i.unstable_now() - ke < we);
        }
        function Te() {
          if (((q = !1), qe)) {
            var w = i.unstable_now();
            ke = w;
            var $ = !0;
            try {
              e: {
                ((C = !1), U && ((U = !1), I(P), (P = -1)), (z = !0));
                var ee = T;
                try {
                  t: {
                    for (Se(w), j = u(y); j !== null && !(j.expirationTime > w && le()); ) {
                      var ye = j.callback;
                      if (typeof ye == 'function') {
                        ((j.callback = null), (T = j.priorityLevel));
                        var ge = ye(j.expirationTime <= w);
                        if (((w = i.unstable_now()), typeof ge == 'function')) {
                          ((j.callback = ge), Se(w), ($ = !0));
                          break t;
                        }
                        (j === u(y) && o(y), Se(w));
                      } else o(y);
                      j = u(y);
                    }
                    if (j !== null) $ = !0;
                    else {
                      var x = u(g);
                      (x !== null && tt(et, x.startTime - w), ($ = !1));
                    }
                  }
                  break e;
                } finally {
                  ((j = null), (T = ee), (z = !1));
                }
                $ = void 0;
              }
            } finally {
              $ ? He() : (qe = !1);
            }
          }
        }
        var He;
        if (typeof de == 'function')
          He = function () {
            de(Te);
          };
        else if (typeof MessageChannel < 'u') {
          var ht = new MessageChannel(),
            yt = ht.port2;
          ((ht.port1.onmessage = Te),
            (He = function () {
              yt.postMessage(null);
            }));
        } else
          He = function () {
            F(Te, 0);
          };
        function tt(w, $) {
          P = F(function () {
            w(i.unstable_now());
          }, $);
        }
        ((i.unstable_IdlePriority = 5),
          (i.unstable_ImmediatePriority = 1),
          (i.unstable_LowPriority = 4),
          (i.unstable_NormalPriority = 3),
          (i.unstable_Profiling = null),
          (i.unstable_UserBlockingPriority = 2),
          (i.unstable_cancelCallback = function (w) {
            w.callback = null;
          }),
          (i.unstable_forceFrameRate = function (w) {
            0 > w || 125 < w
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (we = 0 < w ? Math.floor(1e3 / w) : 5);
          }),
          (i.unstable_getCurrentPriorityLevel = function () {
            return T;
          }),
          (i.unstable_next = function (w) {
            switch (T) {
              case 1:
              case 2:
              case 3:
                var $ = 3;
                break;
              default:
                $ = T;
            }
            var ee = T;
            T = $;
            try {
              return w();
            } finally {
              T = ee;
            }
          }),
          (i.unstable_requestPaint = function () {
            q = !0;
          }),
          (i.unstable_runWithPriority = function (w, $) {
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
            var ee = T;
            T = w;
            try {
              return $();
            } finally {
              T = ee;
            }
          }),
          (i.unstable_scheduleCallback = function (w, $, ee) {
            var ye = i.unstable_now();
            switch (
              (typeof ee == 'object' && ee !== null
                ? ((ee = ee.delay), (ee = typeof ee == 'number' && 0 < ee ? ye + ee : ye))
                : (ee = ye),
              w)
            ) {
              case 1:
                var ge = -1;
                break;
              case 2:
                ge = 250;
                break;
              case 5:
                ge = 1073741823;
                break;
              case 4:
                ge = 1e4;
                break;
              default:
                ge = 5e3;
            }
            return (
              (ge = ee + ge),
              (w = {
                id: _++,
                callback: $,
                priorityLevel: w,
                startTime: ee,
                expirationTime: ge,
                sortIndex: -1,
              }),
              ee > ye
                ? ((w.sortIndex = ee),
                  s(g, w),
                  u(y) === null && w === u(g) && (U ? (I(P), (P = -1)) : (U = !0), tt(et, ee - ye)))
                : ((w.sortIndex = ge), s(y, w), C || z || ((C = !0), qe || ((qe = !0), He()))),
              w
            );
          }),
          (i.unstable_shouldYield = le),
          (i.unstable_wrapCallback = function (w) {
            var $ = T;
            return function () {
              var ee = T;
              T = $;
              try {
                return w.apply(this, arguments);
              } finally {
                T = ee;
              }
            };
          }));
      })(Po)),
    Po
  );
}
var wh;
function Mv() {
  return (wh || ((wh = 1), (Io.exports = Nv())), Io.exports);
}
var er = { exports: {} },
  ie = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Oh;
function zv() {
  if (Oh) return ie;
  Oh = 1;
  var i = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.portal'),
    u = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    d = Symbol.for('react.profiler'),
    f = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    p = Symbol.for('react.forward_ref'),
    y = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    _ = Symbol.for('react.lazy'),
    j = Symbol.for('react.activity'),
    T = Symbol.iterator;
  function z(x) {
    return x === null || typeof x != 'object'
      ? null
      : ((x = (T && x[T]) || x['@@iterator']), typeof x == 'function' ? x : null);
  }
  var C = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    U = Object.assign,
    q = {};
  function F(x, L, G) {
    ((this.props = x), (this.context = L), (this.refs = q), (this.updater = G || C));
  }
  ((F.prototype.isReactComponent = {}),
    (F.prototype.setState = function (x, L) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, L, 'setState');
    }),
    (F.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function I() {}
  I.prototype = F.prototype;
  function de(x, L, G) {
    ((this.props = x), (this.context = L), (this.refs = q), (this.updater = G || C));
  }
  var Se = (de.prototype = new I());
  ((Se.constructor = de), U(Se, F.prototype), (Se.isPureReactComponent = !0));
  var et = Array.isArray;
  function qe() {}
  var P = { H: null, A: null, T: null, S: null },
    we = Object.prototype.hasOwnProperty;
  function ke(x, L, G) {
    var Y = G.ref;
    return { $$typeof: i, type: x, key: L, ref: Y !== void 0 ? Y : null, props: G };
  }
  function le(x, L) {
    return ke(x.type, L, x.props);
  }
  function Te(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === i;
  }
  function He(x) {
    var L = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function (G) {
        return L[G];
      })
    );
  }
  var ht = /\/+/g;
  function yt(x, L) {
    return typeof x == 'object' && x !== null && x.key != null ? He('' + x.key) : L.toString(36);
  }
  function tt(x) {
    switch (x.status) {
      case 'fulfilled':
        return x.value;
      case 'rejected':
        throw x.reason;
      default:
        switch (
          (typeof x.status == 'string'
            ? x.then(qe, qe)
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
  function w(x, L, G, Y, ae) {
    var ce = typeof x;
    (ce === 'undefined' || ce === 'boolean') && (x = null);
    var oe = !1;
    if (x === null) oe = !0;
    else
      switch (ce) {
        case 'bigint':
        case 'string':
        case 'number':
          oe = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case i:
            case s:
              oe = !0;
              break;
            case _:
              return ((oe = x._init), w(oe(x._payload), L, G, Y, ae));
          }
      }
    if (oe)
      return (
        (ae = ae(x)),
        (oe = Y === '' ? '.' + yt(x, 0) : Y),
        et(ae)
          ? ((G = ''),
            oe != null && (G = oe.replace(ht, '$&/') + '/'),
            w(ae, L, G, '', function (ca) {
              return ca;
            }))
          : ae != null &&
            (Te(ae) &&
              (ae = le(
                ae,
                G +
                  (ae.key == null || (x && x.key === ae.key)
                    ? ''
                    : ('' + ae.key).replace(ht, '$&/') + '/') +
                  oe
              )),
            L.push(ae)),
        1
      );
    oe = 0;
    var We = Y === '' ? '.' : Y + ':';
    if (et(x))
      for (var Ee = 0; Ee < x.length; Ee++)
        ((Y = x[Ee]), (ce = We + yt(Y, Ee)), (oe += w(Y, L, G, ce, ae)));
    else if (((Ee = z(x)), typeof Ee == 'function'))
      for (x = Ee.call(x), Ee = 0; !(Y = x.next()).done; )
        ((Y = Y.value), (ce = We + yt(Y, Ee++)), (oe += w(Y, L, G, ce, ae)));
    else if (ce === 'object') {
      if (typeof x.then == 'function') return w(tt(x), L, G, Y, ae);
      throw (
        (L = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (L === '[object Object]' ? 'object with keys {' + Object.keys(x).join(', ') + '}' : L) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return oe;
  }
  function $(x, L, G) {
    if (x == null) return x;
    var Y = [],
      ae = 0;
    return (
      w(x, Y, '', '', function (ce) {
        return L.call(G, ce, ae++);
      }),
      Y
    );
  }
  function ee(x) {
    if (x._status === -1) {
      var L = x._result;
      ((L = L()),
        L.then(
          function (G) {
            (x._status === 0 || x._status === -1) && ((x._status = 1), (x._result = G));
          },
          function (G) {
            (x._status === 0 || x._status === -1) && ((x._status = 2), (x._result = G));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = L)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var ye =
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
    ge = {
      map: $,
      forEach: function (x, L, G) {
        $(
          x,
          function () {
            L.apply(this, arguments);
          },
          G
        );
      },
      count: function (x) {
        var L = 0;
        return (
          $(x, function () {
            L++;
          }),
          L
        );
      },
      toArray: function (x) {
        return (
          $(x, function (L) {
            return L;
          }) || []
        );
      },
      only: function (x) {
        if (!Te(x))
          throw Error('React.Children.only expected to receive a single React element child.');
        return x;
      },
    };
  return (
    (ie.Activity = j),
    (ie.Children = ge),
    (ie.Component = F),
    (ie.Fragment = u),
    (ie.Profiler = d),
    (ie.PureComponent = de),
    (ie.StrictMode = o),
    (ie.Suspense = y),
    (ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P),
    (ie.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return P.H.useMemoCache(x);
      },
    }),
    (ie.cache = function (x) {
      return function () {
        return x.apply(null, arguments);
      };
    }),
    (ie.cacheSignal = function () {
      return null;
    }),
    (ie.cloneElement = function (x, L, G) {
      if (x == null) throw Error('The argument must be a React element, but you passed ' + x + '.');
      var Y = U({}, x.props),
        ae = x.key;
      if (L != null)
        for (ce in (L.key !== void 0 && (ae = '' + L.key), L))
          !we.call(L, ce) ||
            ce === 'key' ||
            ce === '__self' ||
            ce === '__source' ||
            (ce === 'ref' && L.ref === void 0) ||
            (Y[ce] = L[ce]);
      var ce = arguments.length - 2;
      if (ce === 1) Y.children = G;
      else if (1 < ce) {
        for (var oe = Array(ce), We = 0; We < ce; We++) oe[We] = arguments[We + 2];
        Y.children = oe;
      }
      return ke(x.type, ae, Y);
    }),
    (ie.createContext = function (x) {
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
        (x.Consumer = { $$typeof: f, _context: x }),
        x
      );
    }),
    (ie.createElement = function (x, L, G) {
      var Y,
        ae = {},
        ce = null;
      if (L != null)
        for (Y in (L.key !== void 0 && (ce = '' + L.key), L))
          we.call(L, Y) && Y !== 'key' && Y !== '__self' && Y !== '__source' && (ae[Y] = L[Y]);
      var oe = arguments.length - 2;
      if (oe === 1) ae.children = G;
      else if (1 < oe) {
        for (var We = Array(oe), Ee = 0; Ee < oe; Ee++) We[Ee] = arguments[Ee + 2];
        ae.children = We;
      }
      if (x && x.defaultProps)
        for (Y in ((oe = x.defaultProps), oe)) ae[Y] === void 0 && (ae[Y] = oe[Y]);
      return ke(x, ce, ae);
    }),
    (ie.createRef = function () {
      return { current: null };
    }),
    (ie.forwardRef = function (x) {
      return { $$typeof: p, render: x };
    }),
    (ie.isValidElement = Te),
    (ie.lazy = function (x) {
      return { $$typeof: _, _payload: { _status: -1, _result: x }, _init: ee };
    }),
    (ie.memo = function (x, L) {
      return { $$typeof: g, type: x, compare: L === void 0 ? null : L };
    }),
    (ie.startTransition = function (x) {
      var L = P.T,
        G = {};
      P.T = G;
      try {
        var Y = x(),
          ae = P.S;
        (ae !== null && ae(G, Y),
          typeof Y == 'object' && Y !== null && typeof Y.then == 'function' && Y.then(qe, ye));
      } catch (ce) {
        ye(ce);
      } finally {
        (L !== null && G.types !== null && (L.types = G.types), (P.T = L));
      }
    }),
    (ie.unstable_useCacheRefresh = function () {
      return P.H.useCacheRefresh();
    }),
    (ie.use = function (x) {
      return P.H.use(x);
    }),
    (ie.useActionState = function (x, L, G) {
      return P.H.useActionState(x, L, G);
    }),
    (ie.useCallback = function (x, L) {
      return P.H.useCallback(x, L);
    }),
    (ie.useContext = function (x) {
      return P.H.useContext(x);
    }),
    (ie.useDebugValue = function () {}),
    (ie.useDeferredValue = function (x, L) {
      return P.H.useDeferredValue(x, L);
    }),
    (ie.useEffect = function (x, L) {
      return P.H.useEffect(x, L);
    }),
    (ie.useEffectEvent = function (x) {
      return P.H.useEffectEvent(x);
    }),
    (ie.useId = function () {
      return P.H.useId();
    }),
    (ie.useImperativeHandle = function (x, L, G) {
      return P.H.useImperativeHandle(x, L, G);
    }),
    (ie.useInsertionEffect = function (x, L) {
      return P.H.useInsertionEffect(x, L);
    }),
    (ie.useLayoutEffect = function (x, L) {
      return P.H.useLayoutEffect(x, L);
    }),
    (ie.useMemo = function (x, L) {
      return P.H.useMemo(x, L);
    }),
    (ie.useOptimistic = function (x, L) {
      return P.H.useOptimistic(x, L);
    }),
    (ie.useReducer = function (x, L, G) {
      return P.H.useReducer(x, L, G);
    }),
    (ie.useRef = function (x) {
      return P.H.useRef(x);
    }),
    (ie.useState = function (x) {
      return P.H.useState(x);
    }),
    (ie.useSyncExternalStore = function (x, L, G) {
      return P.H.useSyncExternalStore(x, L, G);
    }),
    (ie.useTransition = function () {
      return P.H.useTransition();
    }),
    (ie.version = '19.2.5'),
    ie
  );
}
var Dh;
function _r() {
  return (Dh || ((Dh = 1), (er.exports = zv())), er.exports);
}
var tr = { exports: {} },
  ft = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bh;
function Cv() {
  if (Bh) return ft;
  Bh = 1;
  var i = _r();
  function s(y) {
    var g = 'https://react.dev/errors/' + y;
    if (1 < arguments.length) {
      g += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var _ = 2; _ < arguments.length; _++) g += '&args[]=' + encodeURIComponent(arguments[_]);
    }
    return (
      'Minified React error #' +
      y +
      '; visit ' +
      g +
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
    d = Symbol.for('react.portal');
  function f(y, g, _) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: j == null ? null : '' + j,
      children: y,
      containerInfo: g,
      implementation: _,
    };
  }
  var h = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(y, g) {
    if (y === 'font') return '';
    if (typeof g == 'string') return g === 'use-credentials' ? g : '';
  }
  return (
    (ft.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (ft.createPortal = function (y, g) {
      var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(s(299));
      return f(y, g, null, _);
    }),
    (ft.flushSync = function (y) {
      var g = h.T,
        _ = o.p;
      try {
        if (((h.T = null), (o.p = 2), y)) return y();
      } finally {
        ((h.T = g), (o.p = _), o.d.f());
      }
    }),
    (ft.preconnect = function (y, g) {
      typeof y == 'string' &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
          : (g = null),
        o.d.C(y, g));
    }),
    (ft.prefetchDNS = function (y) {
      typeof y == 'string' && o.d.D(y);
    }),
    (ft.preinit = function (y, g) {
      if (typeof y == 'string' && g && typeof g.as == 'string') {
        var _ = g.as,
          j = p(_, g.crossOrigin),
          T = typeof g.integrity == 'string' ? g.integrity : void 0,
          z = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
        _ === 'style'
          ? o.d.S(y, typeof g.precedence == 'string' ? g.precedence : void 0, {
              crossOrigin: j,
              integrity: T,
              fetchPriority: z,
            })
          : _ === 'script' &&
            o.d.X(y, {
              crossOrigin: j,
              integrity: T,
              fetchPriority: z,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
      }
    }),
    (ft.preinitModule = function (y, g) {
      if (typeof y == 'string')
        if (typeof g == 'object' && g !== null) {
          if (g.as == null || g.as === 'script') {
            var _ = p(g.as, g.crossOrigin);
            o.d.M(y, {
              crossOrigin: _,
              integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
          }
        } else g == null && o.d.M(y);
    }),
    (ft.preload = function (y, g) {
      if (typeof y == 'string' && typeof g == 'object' && g !== null && typeof g.as == 'string') {
        var _ = g.as,
          j = p(_, g.crossOrigin);
        o.d.L(y, _, {
          crossOrigin: j,
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
    (ft.preloadModule = function (y, g) {
      if (typeof y == 'string')
        if (g) {
          var _ = p(g.as, g.crossOrigin);
          o.d.m(y, {
            as: typeof g.as == 'string' && g.as !== 'script' ? g.as : void 0,
            crossOrigin: _,
            integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          });
        } else o.d.m(y);
    }),
    (ft.requestFormReset = function (y) {
      o.d.r(y);
    }),
    (ft.unstable_batchedUpdates = function (y, g) {
      return y(g);
    }),
    (ft.useFormState = function (y, g, _) {
      return h.H.useFormState(y, g, _);
    }),
    (ft.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (ft.version = '19.2.5'),
    ft
  );
}
var Lh;
function Rv() {
  if (Lh) return tr.exports;
  Lh = 1;
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (s) {
        console.error(s);
      }
  }
  return (i(), (tr.exports = Cv()), tr.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hh;
function wv() {
  if (Hh) return qi;
  Hh = 1;
  var i = Mv(),
    s = _r(),
    u = Rv();
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
  function d(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function f(e) {
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
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (f(e) !== e) throw Error(o(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = f(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var a = e, n = t; ; ) {
      var l = a.return;
      if (l === null) break;
      var c = l.alternate;
      if (c === null) {
        if (((n = l.return), n !== null)) {
          a = n;
          continue;
        }
        break;
      }
      if (l.child === c.child) {
        for (c = l.child; c; ) {
          if (c === a) return (y(l), e);
          if (c === n) return (y(l), t);
          c = c.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== n.return) ((a = l), (n = c));
      else {
        for (var m = !1, v = l.child; v; ) {
          if (v === a) {
            ((m = !0), (a = l), (n = c));
            break;
          }
          if (v === n) {
            ((m = !0), (n = l), (a = c));
            break;
          }
          v = v.sibling;
        }
        if (!m) {
          for (v = c.child; v; ) {
            if (v === a) {
              ((m = !0), (a = c), (n = l));
              break;
            }
            if (v === n) {
              ((m = !0), (n = c), (a = l));
              break;
            }
            v = v.sibling;
          }
          if (!m) throw Error(o(189));
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
  var j = Object.assign,
    T = Symbol.for('react.element'),
    z = Symbol.for('react.transitional.element'),
    C = Symbol.for('react.portal'),
    U = Symbol.for('react.fragment'),
    q = Symbol.for('react.strict_mode'),
    F = Symbol.for('react.profiler'),
    I = Symbol.for('react.consumer'),
    de = Symbol.for('react.context'),
    Se = Symbol.for('react.forward_ref'),
    et = Symbol.for('react.suspense'),
    qe = Symbol.for('react.suspense_list'),
    P = Symbol.for('react.memo'),
    we = Symbol.for('react.lazy'),
    ke = Symbol.for('react.activity'),
    le = Symbol.for('react.memo_cache_sentinel'),
    Te = Symbol.iterator;
  function He(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Te && e[Te]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var ht = Symbol.for('react.client.reference');
  function yt(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === ht ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case U:
        return 'Fragment';
      case F:
        return 'Profiler';
      case q:
        return 'StrictMode';
      case et:
        return 'Suspense';
      case qe:
        return 'SuspenseList';
      case ke:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case C:
          return 'Portal';
        case de:
          return e.displayName || 'Context';
        case I:
          return (e._context.displayName || 'Context') + '.Consumer';
        case Se:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case P:
          return ((t = e.displayName || null), t !== null ? t : yt(e.type) || 'Memo');
        case we:
          ((t = e._payload), (e = e._init));
          try {
            return yt(e(t));
          } catch {}
      }
    return null;
  }
  var tt = Array.isArray,
    w = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ee = { pending: !1, data: null, method: null, action: null },
    ye = [],
    ge = -1;
  function x(e) {
    return { current: e };
  }
  function L(e) {
    0 > ge || ((e.current = ye[ge]), (ye[ge] = null), ge--);
  }
  function G(e, t) {
    (ge++, (ye[ge] = e.current), (e.current = t));
  }
  var Y = x(null),
    ae = x(null),
    ce = x(null),
    oe = x(null);
  function We(e, t) {
    switch ((G(ce, t), G(ae, e), G(Y, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Im(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Im(t)), (e = Pm(t, e)));
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
    (L(Y), G(Y, e));
  }
  function Ee() {
    (L(Y), L(ae), L(ce));
  }
  function ca(e) {
    e.memoizedState !== null && G(oe, e);
    var t = Y.current,
      a = Pm(t, e.type);
    t !== a && (G(ae, e), G(Y, a));
  }
  function Ne(e) {
    (ae.current === e && (L(Y), L(ae)), oe.current === e && (L(oe), (Oi._currentValue = ee)));
  }
  var gt, Oa;
  function Ye(e) {
    if (gt === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((gt = (t && t[1]) || ''),
          (Oa =
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
      gt +
      e +
      Oa
    );
  }
  var Fe = !1;
  function pt(e, t) {
    if (!e || Fe) return '';
    Fe = !0;
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
                  var M = R;
                }
                Reflect.construct(e, [], H);
              } else {
                try {
                  H.call();
                } catch (R) {
                  M = R;
                }
                e.call(H.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                M = R;
              }
              (H = e()) && typeof H.catch == 'function' && H.catch(function () {});
            }
          } catch (R) {
            if (R && M && typeof R.stack == 'string') return [R.stack, M.stack];
          }
          return [null, null];
        },
      };
      n.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var l = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, 'name');
      l &&
        l.configurable &&
        Object.defineProperty(n.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var c = n.DetermineComponentFrameRoot(),
        m = c[0],
        v = c[1];
      if (m && v) {
        var b = m.split(`
`),
          N = v.split(`
`);
        for (l = n = 0; n < b.length && !b[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; l < N.length && !N[l].includes('DetermineComponentFrameRoot'); ) l++;
        if (n === b.length || l === N.length)
          for (n = b.length - 1, l = N.length - 1; 1 <= n && 0 <= l && b[n] !== N[l]; ) l--;
        for (; 1 <= n && 0 <= l; n--, l--)
          if (b[n] !== N[l]) {
            if (n !== 1 || l !== 1)
              do
                if ((n--, l--, 0 > l || b[n] !== N[l])) {
                  var O =
                    `
` + b[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      O.includes('<anonymous>') &&
                      (O = O.replace('<anonymous>', e.displayName)),
                    O
                  );
                }
              while (1 <= n && 0 <= l);
            break;
          }
      }
    } finally {
      ((Fe = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? Ye(a) : '';
  }
  function Qn(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ye(e.type);
      case 16:
        return Ye('Lazy');
      case 13:
        return e.child !== t && t !== null ? Ye('Suspense Fallback') : Ye('Suspense');
      case 19:
        return Ye('SuspenseList');
      case 0:
      case 15:
        return pt(e.type, !1);
      case 11:
        return pt(e.type.render, !1);
      case 1:
        return pt(e.type, !0);
      case 31:
        return Ye('Activity');
      default:
        return '';
    }
  }
  function Bs(e) {
    try {
      var t = '',
        a = null;
      do ((t += Qn(e, a)), (a = e), (e = e.return));
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
  var tc = Object.prototype.hasOwnProperty,
    Q = i.unstable_scheduleCallback,
    vn = i.unstable_cancelCallback,
    Ls = i.unstable_shouldYield,
    t1 = i.unstable_requestPaint,
    Et = i.unstable_now,
    a1 = i.unstable_getCurrentPriorityLevel,
    zr = i.unstable_ImmediatePriority,
    Cr = i.unstable_UserBlockingPriority,
    ac = i.unstable_NormalPriority,
    n1 = i.unstable_LowPriority,
    Rr = i.unstable_IdlePriority,
    l1 = i.log,
    i1 = i.unstable_setDisableYieldValue,
    Zl = null,
    Nt = null;
  function Da(e) {
    if ((typeof l1 == 'function' && i1(e), Nt && typeof Nt.setStrictMode == 'function'))
      try {
        Nt.setStrictMode(Zl, e);
      } catch {}
  }
  var Mt = Math.clz32 ? Math.clz32 : u1,
    c1 = Math.log,
    s1 = Math.LN2;
  function u1(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((c1(e) / s1) | 0)) | 0);
  }
  var nc = 256,
    lc = 262144,
    ic = 4194304;
  function yn(e) {
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
  function cc(e, t, a) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var l = 0,
      c = e.suspendedLanes,
      m = e.pingedLanes;
    e = e.warmLanes;
    var v = n & 134217727;
    return (
      v !== 0
        ? ((n = v & ~c),
          n !== 0
            ? (l = yn(n))
            : ((m &= v), m !== 0 ? (l = yn(m)) : a || ((a = v & ~e), a !== 0 && (l = yn(a)))))
        : ((v = n & ~c),
          v !== 0
            ? (l = yn(v))
            : m !== 0
              ? (l = yn(m))
              : a || ((a = n & ~e), a !== 0 && (l = yn(a)))),
      l === 0
        ? 0
        : t !== 0 &&
            t !== l &&
            (t & c) === 0 &&
            ((c = l & -l), (a = t & -t), c >= a || (c === 32 && (a & 4194048) !== 0))
          ? t
          : l
    );
  }
  function Xl(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function o1(e, t) {
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
  function wr() {
    var e = ic;
    return ((ic <<= 1), (ic & 62914560) === 0 && (ic = 4194304), e);
  }
  function Hs(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Ql(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function r1(e, t, a, n, l, c) {
    var m = e.pendingLanes;
    ((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0));
    var v = e.entanglements,
      b = e.expirationTimes,
      N = e.hiddenUpdates;
    for (a = m & ~a; 0 < a; ) {
      var O = 31 - Mt(a),
        H = 1 << O;
      ((v[O] = 0), (b[O] = -1));
      var M = N[O];
      if (M !== null)
        for (N[O] = null, O = 0; O < M.length; O++) {
          var R = M[O];
          R !== null && (R.lane &= -536870913);
        }
      a &= ~H;
    }
    (n !== 0 && Or(e, n, 0),
      c !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(m & ~t)));
  }
  function Or(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - Mt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function Dr(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var n = 31 - Mt(a),
        l = 1 << n;
      ((l & t) | (e[n] & t) && (e[n] |= t), (a &= ~l));
    }
  }
  function Br(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : qs(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function qs(e) {
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
  function Us(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Lr() {
    var e = $.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : xh(e.type));
  }
  function Hr(e, t) {
    var a = $.p;
    try {
      return (($.p = e), t());
    } finally {
      $.p = a;
    }
  }
  var Ba = Math.random().toString(36).slice(2),
    it = '__reactFiber$' + Ba,
    _t = '__reactProps$' + Ba,
    Kn = '__reactContainer$' + Ba,
    Gs = '__reactEvents$' + Ba,
    f1 = '__reactListeners$' + Ba,
    d1 = '__reactHandles$' + Ba,
    qr = '__reactResources$' + Ba,
    Kl = '__reactMarker$' + Ba;
  function Vs(e) {
    (delete e[it], delete e[_t], delete e[Gs], delete e[f1], delete e[d1]);
  }
  function Jn(e) {
    var t = e[it];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Kn] || a[it])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = ch(e); e !== null; ) {
            if ((a = e[it])) return a;
            e = ch(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function Wn(e) {
    if ((e = e[it] || e[Kn])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Jl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Fn(e) {
    var t = e[qr];
    return (t || (t = e[qr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function at(e) {
    e[Kl] = !0;
  }
  var Ur = new Set(),
    Gr = {};
  function gn(e, t) {
    (In(e, t), In(e + 'Capture', t));
  }
  function In(e, t) {
    for (Gr[e] = t, e = 0; e < t.length; e++) Ur.add(t[e]);
  }
  var m1 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Vr = {},
    $r = {};
  function h1(e) {
    return tc.call($r, e)
      ? !0
      : tc.call(Vr, e)
        ? !1
        : m1.test(e)
          ? ($r[e] = !0)
          : ((Vr[e] = !0), !1);
  }
  function sc(e, t, a) {
    if (h1(t))
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
  function uc(e, t, a) {
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
  function da(e, t, a, n) {
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
  function Ut(e) {
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
  function kr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function p1(e, t, a) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var l = n.get,
        c = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (m) {
            ((a = '' + m), c.call(this, m));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (m) {
            a = '' + m;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function $s(e) {
    if (!e._valueTracker) {
      var t = kr(e) ? 'checked' : 'value';
      e._valueTracker = p1(e, t, '' + e[t]);
    }
  }
  function Yr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      n = '';
    return (
      e && (n = kr(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function oc(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var v1 = /[\n"\\]/g;
  function Gt(e) {
    return e.replace(v1, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function ks(e, t, a, n, l, c, m, v) {
    ((e.name = ''),
      m != null && typeof m != 'function' && typeof m != 'symbol' && typeof m != 'boolean'
        ? (e.type = m)
        : e.removeAttribute('type'),
      t != null
        ? m === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Ut(t))
          : e.value !== '' + Ut(t) && (e.value = '' + Ut(t))
        : (m !== 'submit' && m !== 'reset') || e.removeAttribute('value'),
      t != null
        ? Ys(e, m, Ut(t))
        : a != null
          ? Ys(e, m, Ut(a))
          : n != null && e.removeAttribute('value'),
      l == null && c != null && (e.defaultChecked = !!c),
      l != null && (e.checked = l && typeof l != 'function' && typeof l != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (e.name = '' + Ut(v))
        : e.removeAttribute('name'));
  }
  function Zr(e, t, a, n, l, c, m, v) {
    if (
      (c != null &&
        typeof c != 'function' &&
        typeof c != 'symbol' &&
        typeof c != 'boolean' &&
        (e.type = c),
      t != null || a != null)
    ) {
      if (!((c !== 'submit' && c !== 'reset') || t != null)) {
        $s(e);
        return;
      }
      ((a = a != null ? '' + Ut(a) : ''),
        (t = t != null ? '' + Ut(t) : a),
        v || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? l),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = v ? e.checked : !!n),
      (e.defaultChecked = !!n),
      m != null &&
        typeof m != 'function' &&
        typeof m != 'symbol' &&
        typeof m != 'boolean' &&
        (e.name = m),
      $s(e));
  }
  function Ys(e, t, a) {
    (t === 'number' && oc(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function Pn(e, t, a, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < a.length; l++) t['$' + a[l]] = !0;
      for (a = 0; a < e.length; a++)
        ((l = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== l && (e[a].selected = l),
          l && n && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + Ut(a), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === a) {
          ((e[l].selected = !0), n && (e[l].defaultSelected = !0));
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Xr(e, t, a) {
    if (t != null && ((t = '' + Ut(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + Ut(a) : '';
  }
  function Qr(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(o(92));
        if (tt(n)) {
          if (1 < n.length) throw Error(o(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = Ut(t)),
      (e.defaultValue = a),
      (n = e.textContent),
      n === a && n !== '' && n !== null && (e.value = n),
      $s(e));
  }
  function el(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var y1 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Kr(e, t, a) {
    var n = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || y1.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function Jr(e, t, a) {
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
      for (var l in t) ((n = t[l]), t.hasOwnProperty(l) && a[l] !== n && Kr(e, l, n));
    } else for (var c in t) t.hasOwnProperty(c) && Kr(e, c, t[c]);
  }
  function Zs(e) {
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
  var g1 = new Map([
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
    _1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function rc(e) {
    return _1.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function ma() {}
  var Xs = null;
  function Qs(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var tl = null,
    al = null;
  function Wr(e) {
    var t = Wn(e);
    if (t && (e = t.stateNode)) {
      var a = e[_t] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (ks(
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
              a = a.querySelectorAll('input[name="' + Gt('' + t) + '"][type="radio"]'), t = 0;
              t < a.length;
              t++
            ) {
              var n = a[t];
              if (n !== e && n.form === e.form) {
                var l = n[_t] || null;
                if (!l) throw Error(o(90));
                ks(
                  n,
                  l.value,
                  l.defaultValue,
                  l.defaultValue,
                  l.checked,
                  l.defaultChecked,
                  l.type,
                  l.name
                );
              }
            }
            for (t = 0; t < a.length; t++) ((n = a[t]), n.form === e.form && Yr(n));
          }
          break e;
        case 'textarea':
          Xr(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && Pn(e, !!a.multiple, t, !1));
      }
    }
  }
  var Ks = !1;
  function Fr(e, t, a) {
    if (Ks) return e(t, a);
    Ks = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Ks = !1),
        (tl !== null || al !== null) &&
          (Fc(), tl && ((t = tl), (e = al), (al = tl = null), Wr(t), e)))
      )
        for (t = 0; t < e.length; t++) Wr(e[t]);
    }
  }
  function Wl(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var n = a[_t] || null;
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
  var ha = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Js = !1;
  if (ha)
    try {
      var Fl = {};
      (Object.defineProperty(Fl, 'passive', {
        get: function () {
          Js = !0;
        },
      }),
        window.addEventListener('test', Fl, Fl),
        window.removeEventListener('test', Fl, Fl));
    } catch {
      Js = !1;
    }
  var La = null,
    Ws = null,
    fc = null;
  function Ir() {
    if (fc) return fc;
    var e,
      t = Ws,
      a = t.length,
      n,
      l = 'value' in La ? La.value : La.textContent,
      c = l.length;
    for (e = 0; e < a && t[e] === l[e]; e++);
    var m = a - e;
    for (n = 1; n <= m && t[a - n] === l[c - n]; n++);
    return (fc = l.slice(e, 1 < n ? 1 - n : void 0));
  }
  function dc(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function mc() {
    return !0;
  }
  function Pr() {
    return !1;
  }
  function bt(e) {
    function t(a, n, l, c, m) {
      ((this._reactName = a),
        (this._targetInst = l),
        (this.type = n),
        (this.nativeEvent = c),
        (this.target = m),
        (this.currentTarget = null));
      for (var v in e) e.hasOwnProperty(v) && ((a = e[v]), (this[v] = a ? a(c) : c[v]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? mc
          : Pr),
        (this.isPropagationStopped = Pr),
        this
      );
    }
    return (
      j(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = mc));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = mc));
        },
        persist: function () {},
        isPersistent: mc,
      }),
      t
    );
  }
  var _n = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    hc = bt(_n),
    Il = j({}, _n, { view: 0, detail: 0 }),
    b1 = bt(Il),
    Fs,
    Is,
    Pl,
    pc = j({}, Il, {
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
      getModifierState: eu,
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
          : (e !== Pl &&
              (Pl && e.type === 'mousemove'
                ? ((Fs = e.screenX - Pl.screenX), (Is = e.screenY - Pl.screenY))
                : (Is = Fs = 0),
              (Pl = e)),
            Fs);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Is;
      },
    }),
    ef = bt(pc),
    S1 = j({}, pc, { dataTransfer: 0 }),
    x1 = bt(S1),
    j1 = j({}, Il, { relatedTarget: 0 }),
    Ps = bt(j1),
    A1 = j({}, _n, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    T1 = bt(A1),
    E1 = j({}, _n, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    N1 = bt(E1),
    M1 = j({}, _n, { data: 0 }),
    tf = bt(M1),
    z1 = {
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
    C1 = {
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
    R1 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function w1(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = R1[e]) ? !!t[e] : !1;
  }
  function eu() {
    return w1;
  }
  var O1 = j({}, Il, {
      key: function (e) {
        if (e.key) {
          var t = z1[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = dc(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? C1[e.keyCode] || 'Unidentified'
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
      getModifierState: eu,
      charCode: function (e) {
        return e.type === 'keypress' ? dc(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? dc(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    D1 = bt(O1),
    B1 = j({}, pc, {
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
    af = bt(B1),
    L1 = j({}, Il, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: eu,
    }),
    H1 = bt(L1),
    q1 = j({}, _n, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    U1 = bt(q1),
    G1 = j({}, pc, {
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
    V1 = bt(G1),
    $1 = j({}, _n, { newState: 0, oldState: 0 }),
    k1 = bt($1),
    Y1 = [9, 13, 27, 32],
    tu = ha && 'CompositionEvent' in window,
    ei = null;
  ha && 'documentMode' in document && (ei = document.documentMode);
  var Z1 = ha && 'TextEvent' in window && !ei,
    nf = ha && (!tu || (ei && 8 < ei && 11 >= ei)),
    lf = ' ',
    cf = !1;
  function sf(e, t) {
    switch (e) {
      case 'keyup':
        return Y1.indexOf(t.keyCode) !== -1;
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
  function uf(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var nl = !1;
  function X1(e, t) {
    switch (e) {
      case 'compositionend':
        return uf(t);
      case 'keypress':
        return t.which !== 32 ? null : ((cf = !0), lf);
      case 'textInput':
        return ((e = t.data), e === lf && cf ? null : e);
      default:
        return null;
    }
  }
  function Q1(e, t) {
    if (nl)
      return e === 'compositionend' || (!tu && sf(e, t))
        ? ((e = Ir()), (fc = Ws = La = null), (nl = !1), e)
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
        return nf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var K1 = {
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
  function of(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!K1[e.type] : t === 'textarea';
  }
  function rf(e, t, a, n) {
    (tl ? (al ? al.push(n) : (al = [n])) : (tl = n),
      (t = ls(t, 'onChange')),
      0 < t.length &&
        ((a = new hc('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var ti = null,
    ai = null;
  function J1(e) {
    Xm(e, 0);
  }
  function vc(e) {
    var t = Jl(e);
    if (Yr(t)) return e;
  }
  function ff(e, t) {
    if (e === 'change') return t;
  }
  var df = !1;
  if (ha) {
    var au;
    if (ha) {
      var nu = 'oninput' in document;
      if (!nu) {
        var mf = document.createElement('div');
        (mf.setAttribute('oninput', 'return;'), (nu = typeof mf.oninput == 'function'));
      }
      au = nu;
    } else au = !1;
    df = au && (!document.documentMode || 9 < document.documentMode);
  }
  function hf() {
    ti && (ti.detachEvent('onpropertychange', pf), (ai = ti = null));
  }
  function pf(e) {
    if (e.propertyName === 'value' && vc(ai)) {
      var t = [];
      (rf(t, ai, e, Qs(e)), Fr(J1, t));
    }
  }
  function W1(e, t, a) {
    e === 'focusin'
      ? (hf(), (ti = t), (ai = a), ti.attachEvent('onpropertychange', pf))
      : e === 'focusout' && hf();
  }
  function F1(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return vc(ai);
  }
  function I1(e, t) {
    if (e === 'click') return vc(t);
  }
  function P1(e, t) {
    if (e === 'input' || e === 'change') return vc(t);
  }
  function ep(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var zt = typeof Object.is == 'function' ? Object.is : ep;
  function ni(e, t) {
    if (zt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      n = Object.keys(t);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var l = a[n];
      if (!tc.call(t, l) || !zt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function vf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function yf(e, t) {
    var a = vf(e);
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
      a = vf(a);
    }
  }
  function gf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? gf(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function _f(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = oc(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = oc(e.document);
    }
    return t;
  }
  function lu(e) {
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
  var tp = ha && 'documentMode' in document && 11 >= document.documentMode,
    ll = null,
    iu = null,
    li = null,
    cu = !1;
  function bf(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    cu ||
      ll == null ||
      ll !== oc(n) ||
      ((n = ll),
      'selectionStart' in n && lu(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (li && ni(li, n)) ||
        ((li = n),
        (n = ls(iu, 'onSelect')),
        0 < n.length &&
          ((t = new hc('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: n }),
          (t.target = ll))));
  }
  function bn(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var il = {
      animationend: bn('Animation', 'AnimationEnd'),
      animationiteration: bn('Animation', 'AnimationIteration'),
      animationstart: bn('Animation', 'AnimationStart'),
      transitionrun: bn('Transition', 'TransitionRun'),
      transitionstart: bn('Transition', 'TransitionStart'),
      transitioncancel: bn('Transition', 'TransitionCancel'),
      transitionend: bn('Transition', 'TransitionEnd'),
    },
    su = {},
    Sf = {};
  ha &&
    ((Sf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete il.animationend.animation,
      delete il.animationiteration.animation,
      delete il.animationstart.animation),
    'TransitionEvent' in window || delete il.transitionend.transition);
  function Sn(e) {
    if (su[e]) return su[e];
    if (!il[e]) return e;
    var t = il[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in Sf) return (su[e] = t[a]);
    return e;
  }
  var xf = Sn('animationend'),
    jf = Sn('animationiteration'),
    Af = Sn('animationstart'),
    ap = Sn('transitionrun'),
    np = Sn('transitionstart'),
    lp = Sn('transitioncancel'),
    Tf = Sn('transitionend'),
    Ef = new Map(),
    uu =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  uu.push('scrollEnd');
  function Ft(e, t) {
    (Ef.set(e, t), gn(t, [e]));
  }
  var yc =
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
    Vt = [],
    cl = 0,
    ou = 0;
  function gc() {
    for (var e = cl, t = (ou = cl = 0); t < e; ) {
      var a = Vt[t];
      Vt[t++] = null;
      var n = Vt[t];
      Vt[t++] = null;
      var l = Vt[t];
      Vt[t++] = null;
      var c = Vt[t];
      if (((Vt[t++] = null), n !== null && l !== null)) {
        var m = n.pending;
        (m === null ? (l.next = l) : ((l.next = m.next), (m.next = l)), (n.pending = l));
      }
      c !== 0 && Nf(a, l, c);
    }
  }
  function _c(e, t, a, n) {
    ((Vt[cl++] = e),
      (Vt[cl++] = t),
      (Vt[cl++] = a),
      (Vt[cl++] = n),
      (ou |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function ru(e, t, a, n) {
    return (_c(e, t, a, n), bc(e));
  }
  function xn(e, t) {
    return (_c(e, null, null, t), bc(e));
  }
  function Nf(e, t, a) {
    e.lanes |= a;
    var n = e.alternate;
    n !== null && (n.lanes |= a);
    for (var l = !1, c = e.return; c !== null; )
      ((c.childLanes |= a),
        (n = c.alternate),
        n !== null && (n.childLanes |= a),
        c.tag === 22 && ((e = c.stateNode), e === null || e._visibility & 1 || (l = !0)),
        (e = c),
        (c = c.return));
    return e.tag === 3
      ? ((c = e.stateNode),
        l &&
          t !== null &&
          ((l = 31 - Mt(a)),
          (e = c.hiddenUpdates),
          (n = e[l]),
          n === null ? (e[l] = [t]) : n.push(t),
          (t.lane = a | 536870912)),
        c)
      : null;
  }
  function bc(e) {
    if (50 < Ei) throw ((Ei = 0), (bo = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var sl = {};
  function ip(e, t, a, n) {
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
  function Ct(e, t, a, n) {
    return new ip(e, t, a, n);
  }
  function fu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function pa(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = Ct(e.tag, t, e.key, e.mode)),
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
  function Mf(e, t) {
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
  function Sc(e, t, a, n, l, c) {
    var m = 0;
    if (((n = e), typeof e == 'function')) fu(e) && (m = 1);
    else if (typeof e == 'string')
      m = rv(e, a, Y.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case ke:
          return ((e = Ct(31, a, t, l)), (e.elementType = ke), (e.lanes = c), e);
        case U:
          return jn(a.children, l, c, t);
        case q:
          ((m = 8), (l |= 24));
          break;
        case F:
          return ((e = Ct(12, a, t, l | 2)), (e.elementType = F), (e.lanes = c), e);
        case et:
          return ((e = Ct(13, a, t, l)), (e.elementType = et), (e.lanes = c), e);
        case qe:
          return ((e = Ct(19, a, t, l)), (e.elementType = qe), (e.lanes = c), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case de:
                m = 10;
                break e;
              case I:
                m = 9;
                break e;
              case Se:
                m = 11;
                break e;
              case P:
                m = 14;
                break e;
              case we:
                ((m = 16), (n = null));
                break e;
            }
          ((m = 29), (a = Error(o(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Ct(m, a, t, l)), (t.elementType = e), (t.type = n), (t.lanes = c), t);
  }
  function jn(e, t, a, n) {
    return ((e = Ct(7, e, n, t)), (e.lanes = a), e);
  }
  function du(e, t, a) {
    return ((e = Ct(6, e, null, t)), (e.lanes = a), e);
  }
  function zf(e) {
    var t = Ct(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function mu(e, t, a) {
    return (
      (t = Ct(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Cf = new WeakMap();
  function $t(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = Cf.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: Bs(t) }), Cf.set(e, t), t);
    }
    return { value: e, source: t, stack: Bs(t) };
  }
  var ul = [],
    ol = 0,
    xc = null,
    ii = 0,
    kt = [],
    Yt = 0,
    Ha = null,
    sa = 1,
    ua = '';
  function va(e, t) {
    ((ul[ol++] = ii), (ul[ol++] = xc), (xc = e), (ii = t));
  }
  function Rf(e, t, a) {
    ((kt[Yt++] = sa), (kt[Yt++] = ua), (kt[Yt++] = Ha), (Ha = e));
    var n = sa;
    e = ua;
    var l = 32 - Mt(n) - 1;
    ((n &= ~(1 << l)), (a += 1));
    var c = 32 - Mt(t) + l;
    if (30 < c) {
      var m = l - (l % 5);
      ((c = (n & ((1 << m) - 1)).toString(32)),
        (n >>= m),
        (l -= m),
        (sa = (1 << (32 - Mt(t) + l)) | (a << l) | n),
        (ua = c + e));
    } else ((sa = (1 << c) | (a << l) | n), (ua = e));
  }
  function hu(e) {
    e.return !== null && (va(e, 1), Rf(e, 1, 0));
  }
  function pu(e) {
    for (; e === xc; ) ((xc = ul[--ol]), (ul[ol] = null), (ii = ul[--ol]), (ul[ol] = null));
    for (; e === Ha; )
      ((Ha = kt[--Yt]),
        (kt[Yt] = null),
        (ua = kt[--Yt]),
        (kt[Yt] = null),
        (sa = kt[--Yt]),
        (kt[Yt] = null));
  }
  function wf(e, t) {
    ((kt[Yt++] = sa), (kt[Yt++] = ua), (kt[Yt++] = Ha), (sa = t.id), (ua = t.overflow), (Ha = e));
  }
  var ct = null,
    De = null,
    ve = !1,
    qa = null,
    Zt = !1,
    vu = Error(o(519));
  function Ua(e) {
    var t = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (ci($t(t, e)), vu);
  }
  function Of(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[it] = e), (t[_t] = n), a)) {
      case 'dialog':
        (fe('cancel', t), fe('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        fe('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Mi.length; a++) fe(Mi[a], t);
        break;
      case 'source':
        fe('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (fe('error', t), fe('load', t));
        break;
      case 'details':
        fe('toggle', t);
        break;
      case 'input':
        (fe('invalid', t),
          Zr(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        fe('invalid', t);
        break;
      case 'textarea':
        (fe('invalid', t), Qr(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      Wm(t.textContent, a)
        ? (n.popover != null && (fe('beforetoggle', t), fe('toggle', t)),
          n.onScroll != null && fe('scroll', t),
          n.onScrollEnd != null && fe('scrollend', t),
          n.onClick != null && (t.onclick = ma),
          (t = !0))
        : (t = !1),
      t || Ua(e, !0));
  }
  function Df(e) {
    for (ct = e.return; ct; )
      switch (ct.tag) {
        case 5:
        case 31:
        case 13:
          Zt = !1;
          return;
        case 27:
        case 3:
          Zt = !0;
          return;
        default:
          ct = ct.return;
      }
  }
  function rl(e) {
    if (e !== ct) return !1;
    if (!ve) return (Df(e), (ve = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || Bo(e.type, e.memoizedProps))),
        (a = !a)),
      a && De && Ua(e),
      Df(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      De = ih(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      De = ih(e);
    } else
      t === 27
        ? ((t = De), Pa(e.type) ? ((e = Go), (Go = null), (De = e)) : (De = t))
        : (De = ct ? Qt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function An() {
    ((De = ct = null), (ve = !1));
  }
  function yu() {
    var e = qa;
    return (e !== null && (At === null ? (At = e) : At.push.apply(At, e), (qa = null)), e);
  }
  function ci(e) {
    qa === null ? (qa = [e]) : qa.push(e);
  }
  var gu = x(null),
    Tn = null,
    ya = null;
  function Ga(e, t, a) {
    (G(gu, t._currentValue), (t._currentValue = a));
  }
  function ga(e) {
    ((e._currentValue = gu.current), L(gu));
  }
  function _u(e, t, a) {
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
  function bu(e, t, a, n) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null; ) {
      var c = l.dependencies;
      if (c !== null) {
        var m = l.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var v = c;
          c = l;
          for (var b = 0; b < t.length; b++)
            if (v.context === t[b]) {
              ((c.lanes |= a),
                (v = c.alternate),
                v !== null && (v.lanes |= a),
                _u(c.return, a, e),
                n || (m = null));
              break e;
            }
          c = v.next;
        }
      } else if (l.tag === 18) {
        if (((m = l.return), m === null)) throw Error(o(341));
        ((m.lanes |= a), (c = m.alternate), c !== null && (c.lanes |= a), _u(m, a, e), (m = null));
      } else m = l.child;
      if (m !== null) m.return = l;
      else
        for (m = l; m !== null; ) {
          if (m === e) {
            m = null;
            break;
          }
          if (((l = m.sibling), l !== null)) {
            ((l.return = m.return), (m = l));
            break;
          }
          m = m.return;
        }
      l = m;
    }
  }
  function fl(e, t, a, n) {
    e = null;
    for (var l = t, c = !1; l !== null; ) {
      if (!c) {
        if ((l.flags & 524288) !== 0) c = !0;
        else if ((l.flags & 262144) !== 0) break;
      }
      if (l.tag === 10) {
        var m = l.alternate;
        if (m === null) throw Error(o(387));
        if (((m = m.memoizedProps), m !== null)) {
          var v = l.type;
          zt(l.pendingProps.value, m.value) || (e !== null ? e.push(v) : (e = [v]));
        }
      } else if (l === oe.current) {
        if (((m = l.alternate), m === null)) throw Error(o(387));
        m.memoizedState.memoizedState !== l.memoizedState.memoizedState &&
          (e !== null ? e.push(Oi) : (e = [Oi]));
      }
      l = l.return;
    }
    (e !== null && bu(t, e, a, n), (t.flags |= 262144));
  }
  function jc(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!zt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function En(e) {
    ((Tn = e), (ya = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function st(e) {
    return Bf(Tn, e);
  }
  function Ac(e, t) {
    return (Tn === null && En(e), Bf(e, t));
  }
  function Bf(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), ya === null)) {
      if (e === null) throw Error(o(308));
      ((ya = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else ya = ya.next = t;
    return a;
  }
  var cp =
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
    sp = i.unstable_scheduleCallback,
    up = i.unstable_NormalPriority,
    Ze = {
      $$typeof: de,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Su() {
    return { controller: new cp(), data: new Map(), refCount: 0 };
  }
  function si(e) {
    (e.refCount--,
      e.refCount === 0 &&
        sp(up, function () {
          e.controller.abort();
        }));
  }
  var ui = null,
    xu = 0,
    dl = 0,
    ml = null;
  function op(e, t) {
    if (ui === null) {
      var a = (ui = []);
      ((xu = 0),
        (dl = Eo()),
        (ml = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (xu++, t.then(Lf, Lf), t);
  }
  function Lf() {
    if (--xu === 0 && ui !== null) {
      ml !== null && (ml.status = 'fulfilled');
      var e = ui;
      ((ui = null), (dl = 0), (ml = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function rp(e, t) {
    var a = [],
      n = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (l) {
          a.push(l);
        },
      };
    return (
      e.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = t));
          for (var l = 0; l < a.length; l++) (0, a[l])(t);
        },
        function (l) {
          for (n.status = 'rejected', n.reason = l, l = 0; l < a.length; l++) (0, a[l])(void 0);
        }
      ),
      n
    );
  }
  var Hf = w.S;
  w.S = function (e, t) {
    ((bm = Et()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && op(e, t),
      Hf !== null && Hf(e, t));
  };
  var Nn = x(null);
  function ju() {
    var e = Nn.current;
    return e !== null ? e : Re.pooledCache;
  }
  function Tc(e, t) {
    t === null ? G(Nn, Nn.current) : G(Nn, t.pool);
  }
  function qf() {
    var e = ju();
    return e === null ? null : { parent: Ze._currentValue, pool: e };
  }
  var hl = Error(o(460)),
    Au = Error(o(474)),
    Ec = Error(o(542)),
    Nc = { then: function () {} };
  function Uf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Gf(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(ma, ma), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), $f(e), e);
      default:
        if (typeof t.status == 'string') t.then(ma, ma);
        else {
          if (((e = Re), e !== null && 100 < e.shellSuspendCounter)) throw Error(o(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (n) {
                if (t.status === 'pending') {
                  var l = t;
                  ((l.status = 'fulfilled'), (l.value = n));
                }
              },
              function (n) {
                if (t.status === 'pending') {
                  var l = t;
                  ((l.status = 'rejected'), (l.reason = n));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), $f(e), e);
        }
        throw ((zn = t), hl);
    }
  }
  function Mn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((zn = a), hl) : a;
    }
  }
  var zn = null;
  function Vf() {
    if (zn === null) throw Error(o(459));
    var e = zn;
    return ((zn = null), e);
  }
  function $f(e) {
    if (e === hl || e === Ec) throw Error(o(483));
  }
  var pl = null,
    oi = 0;
  function Mc(e) {
    var t = oi;
    return ((oi += 1), pl === null && (pl = []), Gf(pl, e, t));
  }
  function ri(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function zc(e, t) {
    throw t.$$typeof === T
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function kf(e) {
    function t(A, S) {
      if (e) {
        var E = A.deletions;
        E === null ? ((A.deletions = [S]), (A.flags |= 16)) : E.push(S);
      }
    }
    function a(A, S) {
      if (!e) return null;
      for (; S !== null; ) (t(A, S), (S = S.sibling));
      return null;
    }
    function n(A) {
      for (var S = new Map(); A !== null; )
        (A.key !== null ? S.set(A.key, A) : S.set(A.index, A), (A = A.sibling));
      return S;
    }
    function l(A, S) {
      return ((A = pa(A, S)), (A.index = 0), (A.sibling = null), A);
    }
    function c(A, S, E) {
      return (
        (A.index = E),
        e
          ? ((E = A.alternate),
            E !== null
              ? ((E = E.index), E < S ? ((A.flags |= 67108866), S) : E)
              : ((A.flags |= 67108866), S))
          : ((A.flags |= 1048576), S)
      );
    }
    function m(A) {
      return (e && A.alternate === null && (A.flags |= 67108866), A);
    }
    function v(A, S, E, B) {
      return S === null || S.tag !== 6
        ? ((S = du(E, A.mode, B)), (S.return = A), S)
        : ((S = l(S, E)), (S.return = A), S);
    }
    function b(A, S, E, B) {
      var J = E.type;
      return J === U
        ? O(A, S, E.props.children, B, E.key)
        : S !== null &&
            (S.elementType === J ||
              (typeof J == 'object' && J !== null && J.$$typeof === we && Mn(J) === S.type))
          ? ((S = l(S, E.props)), ri(S, E), (S.return = A), S)
          : ((S = Sc(E.type, E.key, E.props, null, A.mode, B)), ri(S, E), (S.return = A), S);
    }
    function N(A, S, E, B) {
      return S === null ||
        S.tag !== 4 ||
        S.stateNode.containerInfo !== E.containerInfo ||
        S.stateNode.implementation !== E.implementation
        ? ((S = mu(E, A.mode, B)), (S.return = A), S)
        : ((S = l(S, E.children || [])), (S.return = A), S);
    }
    function O(A, S, E, B, J) {
      return S === null || S.tag !== 7
        ? ((S = jn(E, A.mode, B, J)), (S.return = A), S)
        : ((S = l(S, E)), (S.return = A), S);
    }
    function H(A, S, E) {
      if ((typeof S == 'string' && S !== '') || typeof S == 'number' || typeof S == 'bigint')
        return ((S = du('' + S, A.mode, E)), (S.return = A), S);
      if (typeof S == 'object' && S !== null) {
        switch (S.$$typeof) {
          case z:
            return ((E = Sc(S.type, S.key, S.props, null, A.mode, E)), ri(E, S), (E.return = A), E);
          case C:
            return ((S = mu(S, A.mode, E)), (S.return = A), S);
          case we:
            return ((S = Mn(S)), H(A, S, E));
        }
        if (tt(S) || He(S)) return ((S = jn(S, A.mode, E, null)), (S.return = A), S);
        if (typeof S.then == 'function') return H(A, Mc(S), E);
        if (S.$$typeof === de) return H(A, Ac(A, S), E);
        zc(A, S);
      }
      return null;
    }
    function M(A, S, E, B) {
      var J = S !== null ? S.key : null;
      if ((typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint')
        return J !== null ? null : v(A, S, '' + E, B);
      if (typeof E == 'object' && E !== null) {
        switch (E.$$typeof) {
          case z:
            return E.key === J ? b(A, S, E, B) : null;
          case C:
            return E.key === J ? N(A, S, E, B) : null;
          case we:
            return ((E = Mn(E)), M(A, S, E, B));
        }
        if (tt(E) || He(E)) return J !== null ? null : O(A, S, E, B, null);
        if (typeof E.then == 'function') return M(A, S, Mc(E), B);
        if (E.$$typeof === de) return M(A, S, Ac(A, E), B);
        zc(A, E);
      }
      return null;
    }
    function R(A, S, E, B, J) {
      if ((typeof B == 'string' && B !== '') || typeof B == 'number' || typeof B == 'bigint')
        return ((A = A.get(E) || null), v(S, A, '' + B, J));
      if (typeof B == 'object' && B !== null) {
        switch (B.$$typeof) {
          case z:
            return ((A = A.get(B.key === null ? E : B.key) || null), b(S, A, B, J));
          case C:
            return ((A = A.get(B.key === null ? E : B.key) || null), N(S, A, B, J));
          case we:
            return ((B = Mn(B)), R(A, S, E, B, J));
        }
        if (tt(B) || He(B)) return ((A = A.get(E) || null), O(S, A, B, J, null));
        if (typeof B.then == 'function') return R(A, S, E, Mc(B), J);
        if (B.$$typeof === de) return R(A, S, E, Ac(S, B), J);
        zc(S, B);
      }
      return null;
    }
    function Z(A, S, E, B) {
      for (
        var J = null, _e = null, X = S, ue = (S = 0), he = null;
        X !== null && ue < E.length;
        ue++
      ) {
        X.index > ue ? ((he = X), (X = null)) : (he = X.sibling);
        var be = M(A, X, E[ue], B);
        if (be === null) {
          X === null && (X = he);
          break;
        }
        (e && X && be.alternate === null && t(A, X),
          (S = c(be, S, ue)),
          _e === null ? (J = be) : (_e.sibling = be),
          (_e = be),
          (X = he));
      }
      if (ue === E.length) return (a(A, X), ve && va(A, ue), J);
      if (X === null) {
        for (; ue < E.length; ue++)
          ((X = H(A, E[ue], B)),
            X !== null && ((S = c(X, S, ue)), _e === null ? (J = X) : (_e.sibling = X), (_e = X)));
        return (ve && va(A, ue), J);
      }
      for (X = n(X); ue < E.length; ue++)
        ((he = R(X, A, ue, E[ue], B)),
          he !== null &&
            (e && he.alternate !== null && X.delete(he.key === null ? ue : he.key),
            (S = c(he, S, ue)),
            _e === null ? (J = he) : (_e.sibling = he),
            (_e = he)));
      return (
        e &&
          X.forEach(function (ln) {
            return t(A, ln);
          }),
        ve && va(A, ue),
        J
      );
    }
    function te(A, S, E, B) {
      if (E == null) throw Error(o(151));
      for (
        var J = null, _e = null, X = S, ue = (S = 0), he = null, be = E.next();
        X !== null && !be.done;
        ue++, be = E.next()
      ) {
        X.index > ue ? ((he = X), (X = null)) : (he = X.sibling);
        var ln = M(A, X, be.value, B);
        if (ln === null) {
          X === null && (X = he);
          break;
        }
        (e && X && ln.alternate === null && t(A, X),
          (S = c(ln, S, ue)),
          _e === null ? (J = ln) : (_e.sibling = ln),
          (_e = ln),
          (X = he));
      }
      if (be.done) return (a(A, X), ve && va(A, ue), J);
      if (X === null) {
        for (; !be.done; ue++, be = E.next())
          ((be = H(A, be.value, B)),
            be !== null &&
              ((S = c(be, S, ue)), _e === null ? (J = be) : (_e.sibling = be), (_e = be)));
        return (ve && va(A, ue), J);
      }
      for (X = n(X); !be.done; ue++, be = E.next())
        ((be = R(X, A, ue, be.value, B)),
          be !== null &&
            (e && be.alternate !== null && X.delete(be.key === null ? ue : be.key),
            (S = c(be, S, ue)),
            _e === null ? (J = be) : (_e.sibling = be),
            (_e = be)));
      return (
        e &&
          X.forEach(function (Sv) {
            return t(A, Sv);
          }),
        ve && va(A, ue),
        J
      );
    }
    function Ce(A, S, E, B) {
      if (
        (typeof E == 'object' &&
          E !== null &&
          E.type === U &&
          E.key === null &&
          (E = E.props.children),
        typeof E == 'object' && E !== null)
      ) {
        switch (E.$$typeof) {
          case z:
            e: {
              for (var J = E.key; S !== null; ) {
                if (S.key === J) {
                  if (((J = E.type), J === U)) {
                    if (S.tag === 7) {
                      (a(A, S.sibling), (B = l(S, E.props.children)), (B.return = A), (A = B));
                      break e;
                    }
                  } else if (
                    S.elementType === J ||
                    (typeof J == 'object' && J !== null && J.$$typeof === we && Mn(J) === S.type)
                  ) {
                    (a(A, S.sibling), (B = l(S, E.props)), ri(B, E), (B.return = A), (A = B));
                    break e;
                  }
                  a(A, S);
                  break;
                } else t(A, S);
                S = S.sibling;
              }
              E.type === U
                ? ((B = jn(E.props.children, A.mode, B, E.key)), (B.return = A), (A = B))
                : ((B = Sc(E.type, E.key, E.props, null, A.mode, B)),
                  ri(B, E),
                  (B.return = A),
                  (A = B));
            }
            return m(A);
          case C:
            e: {
              for (J = E.key; S !== null; ) {
                if (S.key === J)
                  if (
                    S.tag === 4 &&
                    S.stateNode.containerInfo === E.containerInfo &&
                    S.stateNode.implementation === E.implementation
                  ) {
                    (a(A, S.sibling), (B = l(S, E.children || [])), (B.return = A), (A = B));
                    break e;
                  } else {
                    a(A, S);
                    break;
                  }
                else t(A, S);
                S = S.sibling;
              }
              ((B = mu(E, A.mode, B)), (B.return = A), (A = B));
            }
            return m(A);
          case we:
            return ((E = Mn(E)), Ce(A, S, E, B));
        }
        if (tt(E)) return Z(A, S, E, B);
        if (He(E)) {
          if (((J = He(E)), typeof J != 'function')) throw Error(o(150));
          return ((E = J.call(E)), te(A, S, E, B));
        }
        if (typeof E.then == 'function') return Ce(A, S, Mc(E), B);
        if (E.$$typeof === de) return Ce(A, S, Ac(A, E), B);
        zc(A, E);
      }
      return (typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint'
        ? ((E = '' + E),
          S !== null && S.tag === 6
            ? (a(A, S.sibling), (B = l(S, E)), (B.return = A), (A = B))
            : (a(A, S), (B = du(E, A.mode, B)), (B.return = A), (A = B)),
          m(A))
        : a(A, S);
    }
    return function (A, S, E, B) {
      try {
        oi = 0;
        var J = Ce(A, S, E, B);
        return ((pl = null), J);
      } catch (X) {
        if (X === hl || X === Ec) throw X;
        var _e = Ct(29, X, null, A.mode);
        return ((_e.lanes = B), (_e.return = A), _e);
      } finally {
      }
    };
  }
  var Cn = kf(!0),
    Yf = kf(!1),
    Va = !1;
  function Tu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Eu(e, t) {
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
  function $a(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ka(e, t, a) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (xe & 2) !== 0)) {
      var l = n.pending;
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (n.pending = t),
        (t = bc(e)),
        Nf(e, null, a),
        t
      );
    }
    return (_c(e, n, t, a), bc(e));
  }
  function fi(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), Dr(e, a));
    }
  }
  function Nu(e, t) {
    var a = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var l = null,
        c = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var m = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (c === null ? (l = c = m) : (c = c.next = m), (a = a.next));
        } while (a !== null);
        c === null ? (l = c = t) : (c = c.next = t);
      } else l = c = t;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: c,
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
  var Mu = !1;
  function di() {
    if (Mu) {
      var e = ml;
      if (e !== null) throw e;
    }
  }
  function mi(e, t, a, n) {
    Mu = !1;
    var l = e.updateQueue;
    Va = !1;
    var c = l.firstBaseUpdate,
      m = l.lastBaseUpdate,
      v = l.shared.pending;
    if (v !== null) {
      l.shared.pending = null;
      var b = v,
        N = b.next;
      ((b.next = null), m === null ? (c = N) : (m.next = N), (m = b));
      var O = e.alternate;
      O !== null &&
        ((O = O.updateQueue),
        (v = O.lastBaseUpdate),
        v !== m && (v === null ? (O.firstBaseUpdate = N) : (v.next = N), (O.lastBaseUpdate = b)));
    }
    if (c !== null) {
      var H = l.baseState;
      ((m = 0), (O = N = b = null), (v = c));
      do {
        var M = v.lane & -536870913,
          R = M !== v.lane;
        if (R ? (me & M) === M : (n & M) === M) {
          (M !== 0 && M === dl && (Mu = !0),
            O !== null &&
              (O = O.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          e: {
            var Z = e,
              te = v;
            M = t;
            var Ce = a;
            switch (te.tag) {
              case 1:
                if (((Z = te.payload), typeof Z == 'function')) {
                  H = Z.call(Ce, H, M);
                  break e;
                }
                H = Z;
                break e;
              case 3:
                Z.flags = (Z.flags & -65537) | 128;
              case 0:
                if (
                  ((Z = te.payload), (M = typeof Z == 'function' ? Z.call(Ce, H, M) : Z), M == null)
                )
                  break e;
                H = j({}, H, M);
                break e;
              case 2:
                Va = !0;
            }
          }
          ((M = v.callback),
            M !== null &&
              ((e.flags |= 64),
              R && (e.flags |= 8192),
              (R = l.callbacks),
              R === null ? (l.callbacks = [M]) : R.push(M)));
        } else
          ((R = { lane: M, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            O === null ? ((N = O = R), (b = H)) : (O = O.next = R),
            (m |= M));
        if (((v = v.next), v === null)) {
          if (((v = l.shared.pending), v === null)) break;
          ((R = v),
            (v = R.next),
            (R.next = null),
            (l.lastBaseUpdate = R),
            (l.shared.pending = null));
        }
      } while (!0);
      (O === null && (b = H),
        (l.baseState = b),
        (l.firstBaseUpdate = N),
        (l.lastBaseUpdate = O),
        c === null && (l.shared.lanes = 0),
        (Ka |= m),
        (e.lanes = m),
        (e.memoizedState = H));
    }
  }
  function Zf(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function Xf(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) Zf(a[e], t);
  }
  var vl = x(null),
    Cc = x(0);
  function Qf(e, t) {
    ((e = Na), G(Cc, e), G(vl, t), (Na = e | t.baseLanes));
  }
  function zu() {
    (G(Cc, Na), G(vl, vl.current));
  }
  function Cu() {
    ((Na = Cc.current), L(vl), L(Cc));
  }
  var Rt = x(null),
    Xt = null;
  function Ya(e) {
    var t = e.alternate;
    (G(Ve, Ve.current & 1),
      G(Rt, e),
      Xt === null && (t === null || vl.current !== null || t.memoizedState !== null) && (Xt = e));
  }
  function Ru(e) {
    (G(Ve, Ve.current), G(Rt, e), Xt === null && (Xt = e));
  }
  function Kf(e) {
    e.tag === 22 ? (G(Ve, Ve.current), G(Rt, e), Xt === null && (Xt = e)) : Za();
  }
  function Za() {
    (G(Ve, Ve.current), G(Rt, Rt.current));
  }
  function wt(e) {
    (L(Rt), Xt === e && (Xt = null), L(Ve));
  }
  var Ve = x(0);
  function Rc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || qo(a) || Uo(a))) return t;
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
  var _a = 0,
    se = null,
    Me = null,
    Xe = null,
    wc = !1,
    yl = !1,
    Rn = !1,
    Oc = 0,
    hi = 0,
    gl = null,
    fp = 0;
  function Ue() {
    throw Error(o(321));
  }
  function wu(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!zt(e[a], t[a])) return !1;
    return !0;
  }
  function Ou(e, t, a, n, l, c) {
    return (
      (_a = c),
      (se = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (w.H = e === null || e.memoizedState === null ? Rd : Ku),
      (Rn = !1),
      (c = a(n, l)),
      (Rn = !1),
      yl && (c = Wf(t, a, n, l)),
      Jf(e),
      c
    );
  }
  function Jf(e) {
    w.H = yi;
    var t = Me !== null && Me.next !== null;
    if (((_a = 0), (Xe = Me = se = null), (wc = !1), (hi = 0), (gl = null), t)) throw Error(o(300));
    e === null || Qe || ((e = e.dependencies), e !== null && jc(e) && (Qe = !0));
  }
  function Wf(e, t, a, n) {
    se = e;
    var l = 0;
    do {
      if ((yl && (gl = null), (hi = 0), (yl = !1), 25 <= l)) throw Error(o(301));
      if (((l += 1), (Xe = Me = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((w.H = wd), (c = t(a, n)));
    } while (yl);
    return c;
  }
  function dp() {
    var e = w.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? pi(t) : t),
      (e = e.useState()[0]),
      (Me !== null ? Me.memoizedState : null) !== e && (se.flags |= 1024),
      t
    );
  }
  function Du() {
    var e = Oc !== 0;
    return ((Oc = 0), e);
  }
  function Bu(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Lu(e) {
    if (wc) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      wc = !1;
    }
    ((_a = 0), (Xe = Me = se = null), (yl = !1), (hi = Oc = 0), (gl = null));
  }
  function vt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Xe === null ? (se.memoizedState = Xe = e) : (Xe = Xe.next = e), Xe);
  }
  function $e() {
    if (Me === null) {
      var e = se.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Me.next;
    var t = Xe === null ? se.memoizedState : Xe.next;
    if (t !== null) ((Xe = t), (Me = e));
    else {
      if (e === null) throw se.alternate === null ? Error(o(467)) : Error(o(310));
      ((Me = e),
        (e = {
          memoizedState: Me.memoizedState,
          baseState: Me.baseState,
          baseQueue: Me.baseQueue,
          queue: Me.queue,
          next: null,
        }),
        Xe === null ? (se.memoizedState = Xe = e) : (Xe = Xe.next = e));
    }
    return Xe;
  }
  function Dc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function pi(e) {
    var t = hi;
    return (
      (hi += 1),
      gl === null && (gl = []),
      (e = Gf(gl, e, t)),
      (t = se),
      (Xe === null ? t.memoizedState : Xe.next) === null &&
        ((t = t.alternate), (w.H = t === null || t.memoizedState === null ? Rd : Ku)),
      e
    );
  }
  function Bc(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return pi(e);
      if (e.$$typeof === de) return st(e);
    }
    throw Error(o(438, String(e)));
  }
  function Hu(e) {
    var t = null,
      a = se.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var n = se.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (t = {
              data: n.data.map(function (l) {
                return l.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = Dc()), (se.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = le;
    return (t.index++, a);
  }
  function ba(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Lc(e) {
    var t = $e();
    return qu(t, Me, e);
  }
  function qu(e, t, a) {
    var n = e.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = a;
    var l = e.baseQueue,
      c = n.pending;
    if (c !== null) {
      if (l !== null) {
        var m = l.next;
        ((l.next = c.next), (c.next = m));
      }
      ((t.baseQueue = l = c), (n.pending = null));
    }
    if (((c = e.baseState), l === null)) e.memoizedState = c;
    else {
      t = l.next;
      var v = (m = null),
        b = null,
        N = t,
        O = !1;
      do {
        var H = N.lane & -536870913;
        if (H !== N.lane ? (me & H) === H : (_a & H) === H) {
          var M = N.revertLane;
          if (M === 0)
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
              H === dl && (O = !0));
          else if ((_a & M) === M) {
            ((N = N.next), M === dl && (O = !0));
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
              b === null ? ((v = b = H), (m = c)) : (b = b.next = H),
              (se.lanes |= M),
              (Ka |= M));
          ((H = N.action), Rn && a(c, H), (c = N.hasEagerState ? N.eagerState : a(c, H)));
        } else
          ((M = {
            lane: H,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null,
          }),
            b === null ? ((v = b = M), (m = c)) : (b = b.next = M),
            (se.lanes |= H),
            (Ka |= H));
        N = N.next;
      } while (N !== null && N !== t);
      if (
        (b === null ? (m = c) : (b.next = v),
        !zt(c, e.memoizedState) && ((Qe = !0), O && ((a = ml), a !== null)))
      )
        throw a;
      ((e.memoizedState = c), (e.baseState = m), (e.baseQueue = b), (n.lastRenderedState = c));
    }
    return (l === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function Uu(e) {
    var t = $e(),
      a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var n = a.dispatch,
      l = a.pending,
      c = t.memoizedState;
    if (l !== null) {
      a.pending = null;
      var m = (l = l.next);
      do ((c = e(c, m.action)), (m = m.next));
      while (m !== l);
      (zt(c, t.memoizedState) || (Qe = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (a.lastRenderedState = c));
    }
    return [c, n];
  }
  function Ff(e, t, a) {
    var n = se,
      l = $e(),
      c = ve;
    if (c) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var m = !zt((Me || l).memoizedState, a);
    if (
      (m && ((l.memoizedState = a), (Qe = !0)),
      (l = l.queue),
      $u(ed.bind(null, n, l, e), [e]),
      l.getSnapshot !== t || m || (Xe !== null && Xe.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        _l(9, { destroy: void 0 }, Pf.bind(null, n, l, a, t), null),
        Re === null)
      )
        throw Error(o(349));
      c || (_a & 127) !== 0 || If(n, t, a);
    }
    return a;
  }
  function If(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = se.updateQueue),
      t === null
        ? ((t = Dc()), (se.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function Pf(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), td(t) && ad(e));
  }
  function ed(e, t, a) {
    return a(function () {
      td(t) && ad(e);
    });
  }
  function td(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !zt(e, a);
    } catch {
      return !0;
    }
  }
  function ad(e) {
    var t = xn(e, 2);
    t !== null && Tt(t, e, 2);
  }
  function Gu(e) {
    var t = vt();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Rn)) {
        Da(!0);
        try {
          a();
        } finally {
          Da(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ba,
        lastRenderedState: e,
      }),
      t
    );
  }
  function nd(e, t, a, n) {
    return ((e.baseState = a), qu(e, Me, typeof n == 'function' ? n : ba));
  }
  function mp(e, t, a, n, l) {
    if (Uc(e)) throw Error(o(485));
    if (((e = t.action), e !== null)) {
      var c = {
        payload: l,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (m) {
          c.listeners.push(m);
        },
      };
      (w.T !== null ? a(!0) : (c.isTransition = !1),
        n(c),
        (a = t.pending),
        a === null
          ? ((c.next = t.pending = c), ld(t, c))
          : ((c.next = a.next), (t.pending = a.next = c)));
    }
  }
  function ld(e, t) {
    var a = t.action,
      n = t.payload,
      l = e.state;
    if (t.isTransition) {
      var c = w.T,
        m = {};
      w.T = m;
      try {
        var v = a(l, n),
          b = w.S;
        (b !== null && b(m, v), id(e, t, v));
      } catch (N) {
        Vu(e, t, N);
      } finally {
        (c !== null && m.types !== null && (c.types = m.types), (w.T = c));
      }
    } else
      try {
        ((c = a(l, n)), id(e, t, c));
      } catch (N) {
        Vu(e, t, N);
      }
  }
  function id(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            cd(e, t, n);
          },
          function (n) {
            return Vu(e, t, n);
          }
        )
      : cd(e, t, a);
  }
  function cd(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      sd(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), ld(e, a))));
  }
  function Vu(e, t, a) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = a), sd(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function sd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function ud(e, t) {
    return t;
  }
  function od(e, t) {
    if (ve) {
      var a = Re.formState;
      if (a !== null) {
        e: {
          var n = se;
          if (ve) {
            if (De) {
              t: {
                for (var l = De, c = Zt; l.nodeType !== 8; ) {
                  if (!c) {
                    l = null;
                    break t;
                  }
                  if (((l = Qt(l.nextSibling)), l === null)) {
                    l = null;
                    break t;
                  }
                }
                ((c = l.data), (l = c === 'F!' || c === 'F' ? l : null));
              }
              if (l) {
                ((De = Qt(l.nextSibling)), (n = l.data === 'F!'));
                break e;
              }
            }
            Ua(n);
          }
          n = !1;
        }
        n && (t = a[0]);
      }
    }
    return (
      (a = vt()),
      (a.memoizedState = a.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ud,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = Md.bind(null, se, n)),
      (n.dispatch = a),
      (n = Gu(!1)),
      (c = Qu.bind(null, se, !1, n.queue)),
      (n = vt()),
      (l = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = l),
      (a = mp.bind(null, se, l, c, a)),
      (l.dispatch = a),
      (n.memoizedState = e),
      [t, a, !1]
    );
  }
  function rd(e) {
    var t = $e();
    return fd(t, Me, e);
  }
  function fd(e, t, a) {
    if (
      ((t = qu(e, t, ud)[0]),
      (e = Lc(ba)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = pi(t);
      } catch (m) {
        throw m === hl ? Ec : m;
      }
    else n = t;
    t = $e();
    var l = t.queue,
      c = l.dispatch;
    return (
      a !== t.memoizedState &&
        ((se.flags |= 2048), _l(9, { destroy: void 0 }, hp.bind(null, l, a), null)),
      [n, c, e]
    );
  }
  function hp(e, t) {
    e.action = t;
  }
  function dd(e) {
    var t = $e(),
      a = Me;
    if (a !== null) return fd(t, a, e);
    ($e(), (t = t.memoizedState), (a = $e()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = e), [t, n, !1]);
  }
  function _l(e, t, a, n) {
    return (
      (e = { tag: e, create: a, deps: n, inst: t, next: null }),
      (t = se.updateQueue),
      t === null && ((t = Dc()), (se.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((n = a.next), (a.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function md() {
    return $e().memoizedState;
  }
  function Hc(e, t, a, n) {
    var l = vt();
    ((se.flags |= e),
      (l.memoizedState = _l(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function qc(e, t, a, n) {
    var l = $e();
    n = n === void 0 ? null : n;
    var c = l.memoizedState.inst;
    Me !== null && n !== null && wu(n, Me.memoizedState.deps)
      ? (l.memoizedState = _l(t, c, a, n))
      : ((se.flags |= e), (l.memoizedState = _l(1 | t, c, a, n)));
  }
  function hd(e, t) {
    Hc(8390656, 8, e, t);
  }
  function $u(e, t) {
    qc(2048, 8, e, t);
  }
  function pp(e) {
    se.flags |= 4;
    var t = se.updateQueue;
    if (t === null) ((t = Dc()), (se.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function pd(e) {
    var t = $e().memoizedState;
    return (
      pp({ ref: t, nextImpl: e }),
      function () {
        if ((xe & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function vd(e, t) {
    return qc(4, 2, e, t);
  }
  function yd(e, t) {
    return qc(4, 4, e, t);
  }
  function gd(e, t) {
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
  function _d(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), qc(4, 4, gd.bind(null, t, e), a));
  }
  function ku() {}
  function bd(e, t) {
    var a = $e();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    return t !== null && wu(t, n[1]) ? n[0] : ((a.memoizedState = [e, t]), e);
  }
  function Sd(e, t) {
    var a = $e();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    if (t !== null && wu(t, n[1])) return n[0];
    if (((n = e()), Rn)) {
      Da(!0);
      try {
        e();
      } finally {
        Da(!1);
      }
    }
    return ((a.memoizedState = [n, t]), n);
  }
  function Yu(e, t, a) {
    return a === void 0 || ((_a & 1073741824) !== 0 && (me & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = xm()), (se.lanes |= e), (Ka |= e), a);
  }
  function xd(e, t, a, n) {
    return zt(a, t)
      ? a
      : vl.current !== null
        ? ((e = Yu(e, a, n)), zt(e, t) || (Qe = !0), e)
        : (_a & 42) === 0 || ((_a & 1073741824) !== 0 && (me & 261930) === 0)
          ? ((Qe = !0), (e.memoizedState = a))
          : ((e = xm()), (se.lanes |= e), (Ka |= e), t);
  }
  function jd(e, t, a, n, l) {
    var c = $.p;
    $.p = c !== 0 && 8 > c ? c : 8;
    var m = w.T,
      v = {};
    ((w.T = v), Qu(e, !1, t, a));
    try {
      var b = l(),
        N = w.S;
      if (
        (N !== null && N(v, b), b !== null && typeof b == 'object' && typeof b.then == 'function')
      ) {
        var O = rp(b, n);
        vi(e, t, O, Bt(e));
      } else vi(e, t, n, Bt(e));
    } catch (H) {
      vi(e, t, { then: function () {}, status: 'rejected', reason: H }, Bt());
    } finally {
      (($.p = c), m !== null && v.types !== null && (m.types = v.types), (w.T = m));
    }
  }
  function vp() {}
  function Zu(e, t, a, n) {
    if (e.tag !== 5) throw Error(o(476));
    var l = Ad(e).queue;
    jd(
      e,
      l,
      t,
      ee,
      a === null
        ? vp
        : function () {
            return (Td(e), a(n));
          }
    );
  }
  function Ad(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ee,
      baseState: ee,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ba,
        lastRenderedState: ee,
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
          lastRenderedReducer: ba,
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
  function Td(e) {
    var t = Ad(e);
    (t.next === null && (t = e.alternate.memoizedState), vi(e, t.next.queue, {}, Bt()));
  }
  function Xu() {
    return st(Oi);
  }
  function Ed() {
    return $e().memoizedState;
  }
  function Nd() {
    return $e().memoizedState;
  }
  function yp(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Bt();
          e = $a(a);
          var n = ka(t, e, a);
          (n !== null && (Tt(n, t, a), fi(n, t, a)), (t = { cache: Su() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function gp(e, t, a) {
    var n = Bt();
    ((a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Uc(e) ? zd(t, a) : ((a = ru(e, t, a, n)), a !== null && (Tt(a, e, n), Cd(a, t, n))));
  }
  function Md(e, t, a) {
    var n = Bt();
    vi(e, t, a, n);
  }
  function vi(e, t, a, n) {
    var l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Uc(e)) zd(t, l);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var m = t.lastRenderedState,
            v = c(m, a);
          if (((l.hasEagerState = !0), (l.eagerState = v), zt(v, m)))
            return (_c(e, t, l, 0), Re === null && gc(), !1);
        } catch {
        } finally {
        }
      if (((a = ru(e, t, l, n)), a !== null)) return (Tt(a, e, n), Cd(a, t, n), !0);
    }
    return !1;
  }
  function Qu(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: Eo(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Uc(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = ru(e, a, n, 2)), t !== null && Tt(t, e, 2));
  }
  function Uc(e) {
    var t = e.alternate;
    return e === se || (t !== null && t === se);
  }
  function zd(e, t) {
    yl = wc = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function Cd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), Dr(e, a));
    }
  }
  var yi = {
    readContext: st,
    use: Bc,
    useCallback: Ue,
    useContext: Ue,
    useEffect: Ue,
    useImperativeHandle: Ue,
    useLayoutEffect: Ue,
    useInsertionEffect: Ue,
    useMemo: Ue,
    useReducer: Ue,
    useRef: Ue,
    useState: Ue,
    useDebugValue: Ue,
    useDeferredValue: Ue,
    useTransition: Ue,
    useSyncExternalStore: Ue,
    useId: Ue,
    useHostTransitionStatus: Ue,
    useFormState: Ue,
    useActionState: Ue,
    useOptimistic: Ue,
    useMemoCache: Ue,
    useCacheRefresh: Ue,
  };
  yi.useEffectEvent = Ue;
  var Rd = {
      readContext: st,
      use: Bc,
      useCallback: function (e, t) {
        return ((vt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: st,
      useEffect: hd,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), Hc(4194308, 4, gd.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return Hc(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Hc(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = vt();
        t = t === void 0 ? null : t;
        var n = e();
        if (Rn) {
          Da(!0);
          try {
            e();
          } finally {
            Da(!1);
          }
        }
        return ((a.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, a) {
        var n = vt();
        if (a !== void 0) {
          var l = a(t);
          if (Rn) {
            Da(!0);
            try {
              a(t);
            } finally {
              Da(!1);
            }
          }
        } else l = t;
        return (
          (n.memoizedState = n.baseState = l),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: l,
          }),
          (n.queue = e),
          (e = e.dispatch = gp.bind(null, se, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = vt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Gu(e);
        var t = e.queue,
          a = Md.bind(null, se, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: ku,
      useDeferredValue: function (e, t) {
        var a = vt();
        return Yu(a, e, t);
      },
      useTransition: function () {
        var e = Gu(!1);
        return ((e = jd.bind(null, se, e.queue, !0, !1)), (vt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = se,
          l = vt();
        if (ve) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = t()), Re === null)) throw Error(o(349));
          (me & 127) !== 0 || If(n, t, a);
        }
        l.memoizedState = a;
        var c = { value: a, getSnapshot: t };
        return (
          (l.queue = c),
          hd(ed.bind(null, n, c, e), [e]),
          (n.flags |= 2048),
          _l(9, { destroy: void 0 }, Pf.bind(null, n, c, a, t), null),
          a
        );
      },
      useId: function () {
        var e = vt(),
          t = Re.identifierPrefix;
        if (ve) {
          var a = ua,
            n = sa;
          ((a = (n & ~(1 << (32 - Mt(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = Oc++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = fp++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Xu,
      useFormState: od,
      useActionState: od,
      useOptimistic: function (e) {
        var t = vt();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = a), (t = Qu.bind(null, se, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: Hu,
      useCacheRefresh: function () {
        return (vt().memoizedState = yp.bind(null, se));
      },
      useEffectEvent: function (e) {
        var t = vt(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((xe & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Ku = {
      readContext: st,
      use: Bc,
      useCallback: bd,
      useContext: st,
      useEffect: $u,
      useImperativeHandle: _d,
      useInsertionEffect: vd,
      useLayoutEffect: yd,
      useMemo: Sd,
      useReducer: Lc,
      useRef: md,
      useState: function () {
        return Lc(ba);
      },
      useDebugValue: ku,
      useDeferredValue: function (e, t) {
        var a = $e();
        return xd(a, Me.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Lc(ba)[0],
          t = $e().memoizedState;
        return [typeof e == 'boolean' ? e : pi(e), t];
      },
      useSyncExternalStore: Ff,
      useId: Ed,
      useHostTransitionStatus: Xu,
      useFormState: rd,
      useActionState: rd,
      useOptimistic: function (e, t) {
        var a = $e();
        return nd(a, Me, e, t);
      },
      useMemoCache: Hu,
      useCacheRefresh: Nd,
    };
  Ku.useEffectEvent = pd;
  var wd = {
    readContext: st,
    use: Bc,
    useCallback: bd,
    useContext: st,
    useEffect: $u,
    useImperativeHandle: _d,
    useInsertionEffect: vd,
    useLayoutEffect: yd,
    useMemo: Sd,
    useReducer: Uu,
    useRef: md,
    useState: function () {
      return Uu(ba);
    },
    useDebugValue: ku,
    useDeferredValue: function (e, t) {
      var a = $e();
      return Me === null ? Yu(a, e, t) : xd(a, Me.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Uu(ba)[0],
        t = $e().memoizedState;
      return [typeof e == 'boolean' ? e : pi(e), t];
    },
    useSyncExternalStore: Ff,
    useId: Ed,
    useHostTransitionStatus: Xu,
    useFormState: dd,
    useActionState: dd,
    useOptimistic: function (e, t) {
      var a = $e();
      return Me !== null ? nd(a, Me, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: Hu,
    useCacheRefresh: Nd,
  };
  wd.useEffectEvent = pd;
  function Ju(e, t, a, n) {
    ((t = e.memoizedState),
      (a = a(n, t)),
      (a = a == null ? t : j({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var Wu = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var n = Bt(),
        l = $a(n);
      ((l.payload = t),
        a != null && (l.callback = a),
        (t = ka(e, l, n)),
        t !== null && (Tt(t, e, n), fi(t, e, n)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var n = Bt(),
        l = $a(n);
      ((l.tag = 1),
        (l.payload = t),
        a != null && (l.callback = a),
        (t = ka(e, l, n)),
        t !== null && (Tt(t, e, n), fi(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Bt(),
        n = $a(a);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = ka(e, n, a)),
        t !== null && (Tt(t, e, a), fi(t, e, a)));
    },
  };
  function Od(e, t, a, n, l, c, m) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, c, m)
        : t.prototype && t.prototype.isPureReactComponent
          ? !ni(a, n) || !ni(l, c)
          : !0
    );
  }
  function Dd(e, t, a, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, n),
      t.state !== e && Wu.enqueueReplaceState(t, t.state, null));
  }
  function wn(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var n in t) n !== 'ref' && (a[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = j({}, a));
      for (var l in e) a[l] === void 0 && (a[l] = e[l]);
    }
    return a;
  }
  function Bd(e) {
    yc(e);
  }
  function Ld(e) {
    console.error(e);
  }
  function Hd(e) {
    yc(e);
  }
  function Gc(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function qd(e, t, a) {
    try {
      var n = e.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Fu(e, t, a) {
    return (
      (a = $a(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Gc(e, t);
      }),
      a
    );
  }
  function Ud(e) {
    return ((e = $a(e)), (e.tag = 3), e);
  }
  function Gd(e, t, a, n) {
    var l = a.type.getDerivedStateFromError;
    if (typeof l == 'function') {
      var c = n.value;
      ((e.payload = function () {
        return l(c);
      }),
        (e.callback = function () {
          qd(t, a, n);
        }));
    }
    var m = a.stateNode;
    m !== null &&
      typeof m.componentDidCatch == 'function' &&
      (e.callback = function () {
        (qd(t, a, n),
          typeof l != 'function' && (Ja === null ? (Ja = new Set([this])) : Ja.add(this)));
        var v = n.stack;
        this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' });
      });
  }
  function _p(e, t, a, n, l) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && fl(t, a, l, !0), (a = Rt.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Xt === null ? Ic() : a.alternate === null && Ge === 0 && (Ge = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = l),
              n === Nc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  jo(e, n, l)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === Nc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  jo(e, n, l)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (jo(e, n, l), Ic(), !1);
    }
    if (ve)
      return (
        (t = Rt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = l),
            n !== vu && ((e = Error(o(422), { cause: n })), ci($t(e, a))))
          : (n !== vu && ((t = Error(o(423), { cause: n })), ci($t(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (l &= -l),
            (e.lanes |= l),
            (n = $t(n, a)),
            (l = Fu(e.stateNode, n, l)),
            Nu(e, l),
            Ge !== 4 && (Ge = 2)),
        !1
      );
    var c = Error(o(520), { cause: n });
    if (((c = $t(c, a)), Ti === null ? (Ti = [c]) : Ti.push(c), Ge !== 4 && (Ge = 2), t === null))
      return !0;
    ((n = $t(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = l & -l),
            (a.lanes |= e),
            (e = Fu(a.stateNode, n, e)),
            Nu(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (c = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (c !== null &&
                  typeof c.componentDidCatch == 'function' &&
                  (Ja === null || !Ja.has(c)))))
          )
            return (
              (a.flags |= 65536),
              (l &= -l),
              (a.lanes |= l),
              (l = Ud(l)),
              Gd(l, e, a, n),
              Nu(a, l),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Iu = Error(o(461)),
    Qe = !1;
  function ut(e, t, a, n) {
    t.child = e === null ? Yf(t, null, a, n) : Cn(t, e.child, a, n);
  }
  function Vd(e, t, a, n, l) {
    a = a.render;
    var c = t.ref;
    if ('ref' in n) {
      var m = {};
      for (var v in n) v !== 'ref' && (m[v] = n[v]);
    } else m = n;
    return (
      En(t),
      (n = Ou(e, t, a, m, c, l)),
      (v = Du()),
      e !== null && !Qe
        ? (Bu(e, t, l), Sa(e, t, l))
        : (ve && v && hu(t), (t.flags |= 1), ut(e, t, n, l), t.child)
    );
  }
  function $d(e, t, a, n, l) {
    if (e === null) {
      var c = a.type;
      return typeof c == 'function' && !fu(c) && c.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = c), kd(e, t, c, n, l))
        : ((e = Sc(a.type, null, n, t, t.mode, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((c = e.child), !co(e, l))) {
      var m = c.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : ni), a(m, n) && e.ref === t.ref))
        return Sa(e, t, l);
    }
    return ((t.flags |= 1), (e = pa(c, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function kd(e, t, a, n, l) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (ni(c, n) && e.ref === t.ref)
        if (((Qe = !1), (t.pendingProps = n = c), co(e, l))) (e.flags & 131072) !== 0 && (Qe = !0);
        else return ((t.lanes = e.lanes), Sa(e, t, l));
    }
    return Pu(e, t, a, n, l);
  }
  function Yd(e, t, a, n) {
    var l = n.children,
      c = e !== null ? e.memoizedState : null;
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
        if (((c = c !== null ? c.baseLanes | a : a), e !== null)) {
          for (n = t.child = e.child, l = 0; n !== null; )
            ((l = l | n.lanes | n.childLanes), (n = n.sibling));
          n = l & ~c;
        } else ((n = 0), (t.child = null));
        return Zd(e, t, c, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Tc(t, c !== null ? c.cachePool : null),
          c !== null ? Qf(t, c) : zu(),
          Kf(t));
      else return ((n = t.lanes = 536870912), Zd(e, t, c !== null ? c.baseLanes | a : a, a, n));
    } else
      c !== null
        ? (Tc(t, c.cachePool), Qf(t, c), Za(), (t.memoizedState = null))
        : (e !== null && Tc(t, null), zu(), Za());
    return (ut(e, t, l, a), t.child);
  }
  function gi(e, t) {
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
  function Zd(e, t, a, n, l) {
    var c = ju();
    return (
      (c = c === null ? null : { parent: Ze._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: a, cachePool: c }),
      e !== null && Tc(t, null),
      zu(),
      Kf(t),
      e !== null && fl(e, t, n, !0),
      (t.childLanes = l),
      null
    );
  }
  function Vc(e, t) {
    return (
      (t = kc({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Xd(e, t, a) {
    return (
      Cn(t, e.child, null, a),
      (e = Vc(t, t.pendingProps)),
      (e.flags |= 2),
      wt(t),
      (t.memoizedState = null),
      e
    );
  }
  function bp(e, t, a) {
    var n = t.pendingProps,
      l = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (ve) {
        if (n.mode === 'hidden') return ((e = Vc(t, n)), (t.lanes = 536870912), gi(null, e));
        if (
          (Ru(t),
          (e = De)
            ? ((e = lh(e, Zt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Ha !== null ? { id: sa, overflow: ua } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = zf(e)),
                (a.return = t),
                (t.child = a),
                (ct = t),
                (De = null)))
            : (e = null),
          e === null)
        )
          throw Ua(t);
        return ((t.lanes = 536870912), null);
      }
      return Vc(t, n);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var m = c.dehydrated;
      if ((Ru(t), l))
        if (t.flags & 256) ((t.flags &= -257), (t = Xd(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if ((Qe || fl(e, t, a, !1), (l = (a & e.childLanes) !== 0), Qe || l)) {
        if (((n = Re), n !== null && ((m = Br(n, a)), m !== 0 && m !== c.retryLane)))
          throw ((c.retryLane = m), xn(e, m), Tt(n, e, m), Iu);
        (Ic(), (t = Xd(e, t, a)));
      } else
        ((e = c.treeContext),
          (De = Qt(m.nextSibling)),
          (ct = t),
          (ve = !0),
          (qa = null),
          (Zt = !1),
          e !== null && wf(t, e),
          (t = Vc(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = pa(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function $c(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Pu(e, t, a, n, l) {
    return (
      En(t),
      (a = Ou(e, t, a, n, void 0, l)),
      (n = Du()),
      e !== null && !Qe
        ? (Bu(e, t, l), Sa(e, t, l))
        : (ve && n && hu(t), (t.flags |= 1), ut(e, t, a, l), t.child)
    );
  }
  function Qd(e, t, a, n, l, c) {
    return (
      En(t),
      (t.updateQueue = null),
      (a = Wf(t, n, a, l)),
      Jf(e),
      (n = Du()),
      e !== null && !Qe
        ? (Bu(e, t, c), Sa(e, t, c))
        : (ve && n && hu(t), (t.flags |= 1), ut(e, t, a, c), t.child)
    );
  }
  function Kd(e, t, a, n, l) {
    if ((En(t), t.stateNode === null)) {
      var c = sl,
        m = a.contextType;
      (typeof m == 'object' && m !== null && (c = st(m)),
        (c = new a(n, c)),
        (t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = Wu),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = n),
        (c.state = t.memoizedState),
        (c.refs = {}),
        Tu(t),
        (m = a.contextType),
        (c.context = typeof m == 'object' && m !== null ? st(m) : sl),
        (c.state = t.memoizedState),
        (m = a.getDerivedStateFromProps),
        typeof m == 'function' && (Ju(t, a, m, n), (c.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof c.getSnapshotBeforeUpdate == 'function' ||
          (typeof c.UNSAFE_componentWillMount != 'function' &&
            typeof c.componentWillMount != 'function') ||
          ((m = c.state),
          typeof c.componentWillMount == 'function' && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == 'function' && c.UNSAFE_componentWillMount(),
          m !== c.state && Wu.enqueueReplaceState(c, c.state, null),
          mi(t, n, c, l),
          di(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      c = t.stateNode;
      var v = t.memoizedProps,
        b = wn(a, v);
      c.props = b;
      var N = c.context,
        O = a.contextType;
      ((m = sl), typeof O == 'object' && O !== null && (m = st(O)));
      var H = a.getDerivedStateFromProps;
      ((O = typeof H == 'function' || typeof c.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        O ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((v || N !== m) && Dd(t, c, n, m)),
        (Va = !1));
      var M = t.memoizedState;
      ((c.state = M),
        mi(t, n, c, l),
        di(),
        (N = t.memoizedState),
        v || M !== N || Va
          ? (typeof H == 'function' && (Ju(t, a, H, n), (N = t.memoizedState)),
            (b = Va || Od(t, a, b, n, M, N, m))
              ? (O ||
                  (typeof c.UNSAFE_componentWillMount != 'function' &&
                    typeof c.componentWillMount != 'function') ||
                  (typeof c.componentWillMount == 'function' && c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == 'function' &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = N)),
            (c.props = n),
            (c.state = N),
            (c.context = m),
            (n = b))
          : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((c = t.stateNode),
        Eu(e, t),
        (m = t.memoizedProps),
        (O = wn(a, m)),
        (c.props = O),
        (H = t.pendingProps),
        (M = c.context),
        (N = a.contextType),
        (b = sl),
        typeof N == 'object' && N !== null && (b = st(N)),
        (v = a.getDerivedStateFromProps),
        (N = typeof v == 'function' || typeof c.getSnapshotBeforeUpdate == 'function') ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((m !== H || M !== b) && Dd(t, c, n, b)),
        (Va = !1),
        (M = t.memoizedState),
        (c.state = M),
        mi(t, n, c, l),
        di());
      var R = t.memoizedState;
      m !== H || M !== R || Va || (e !== null && e.dependencies !== null && jc(e.dependencies))
        ? (typeof v == 'function' && (Ju(t, a, v, n), (R = t.memoizedState)),
          (O =
            Va ||
            Od(t, a, O, n, M, R, b) ||
            (e !== null && e.dependencies !== null && jc(e.dependencies)))
            ? (N ||
                (typeof c.UNSAFE_componentWillUpdate != 'function' &&
                  typeof c.componentWillUpdate != 'function') ||
                (typeof c.componentWillUpdate == 'function' && c.componentWillUpdate(n, R, b),
                typeof c.UNSAFE_componentWillUpdate == 'function' &&
                  c.UNSAFE_componentWillUpdate(n, R, b)),
              typeof c.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof c.componentDidUpdate != 'function' ||
                (m === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != 'function' ||
                (m === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = R)),
          (c.props = n),
          (c.state = R),
          (c.context = b),
          (n = O))
        : (typeof c.componentDidUpdate != 'function' ||
            (m === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != 'function' ||
            (m === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (c = n),
      $c(e, t),
      (n = (t.flags & 128) !== 0),
      c || n
        ? ((c = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : c.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = Cn(t, e.child, null, l)), (t.child = Cn(t, null, a, l)))
            : ut(e, t, a, l),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = Sa(e, t, l)),
      e
    );
  }
  function Jd(e, t, a, n) {
    return (An(), (t.flags |= 256), ut(e, t, a, n), t.child);
  }
  var eo = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function to(e) {
    return { baseLanes: e, cachePool: qf() };
  }
  function ao(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Dt), e);
  }
  function Wd(e, t, a) {
    var n = t.pendingProps,
      l = !1,
      c = (t.flags & 128) !== 0,
      m;
    if (
      ((m = c) || (m = e !== null && e.memoizedState === null ? !1 : (Ve.current & 2) !== 0),
      m && ((l = !0), (t.flags &= -129)),
      (m = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (ve) {
        if (
          (l ? Ya(t) : Za(),
          (e = De)
            ? ((e = lh(e, Zt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Ha !== null ? { id: sa, overflow: ua } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = zf(e)),
                (a.return = t),
                (t.child = a),
                (ct = t),
                (De = null)))
            : (e = null),
          e === null)
        )
          throw Ua(t);
        return (Uo(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = n.children;
      return (
        (n = n.fallback),
        l
          ? (Za(),
            (l = t.mode),
            (v = kc({ mode: 'hidden', children: v }, l)),
            (n = jn(n, l, a, null)),
            (v.return = t),
            (n.return = t),
            (v.sibling = n),
            (t.child = v),
            (n = t.child),
            (n.memoizedState = to(a)),
            (n.childLanes = ao(e, m, a)),
            (t.memoizedState = eo),
            gi(null, n))
          : (Ya(t), no(t, v))
      );
    }
    var b = e.memoizedState;
    if (b !== null && ((v = b.dehydrated), v !== null)) {
      if (c)
        t.flags & 256
          ? (Ya(t), (t.flags &= -257), (t = lo(e, t, a)))
          : t.memoizedState !== null
            ? (Za(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Za(),
              (v = n.fallback),
              (l = t.mode),
              (n = kc({ mode: 'visible', children: n.children }, l)),
              (v = jn(v, l, a, null)),
              (v.flags |= 2),
              (n.return = t),
              (v.return = t),
              (n.sibling = v),
              (t.child = n),
              Cn(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = to(a)),
              (n.childLanes = ao(e, m, a)),
              (t.memoizedState = eo),
              (t = gi(null, n)));
      else if ((Ya(t), Uo(v))) {
        if (((m = v.nextSibling && v.nextSibling.dataset), m)) var N = m.dgst;
        ((m = N),
          (n = Error(o(419))),
          (n.stack = ''),
          (n.digest = m),
          ci({ value: n, source: null, stack: null }),
          (t = lo(e, t, a)));
      } else if ((Qe || fl(e, t, a, !1), (m = (a & e.childLanes) !== 0), Qe || m)) {
        if (((m = Re), m !== null && ((n = Br(m, a)), n !== 0 && n !== b.retryLane)))
          throw ((b.retryLane = n), xn(e, n), Tt(m, e, n), Iu);
        (qo(v) || Ic(), (t = lo(e, t, a)));
      } else
        qo(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = b.treeContext),
            (De = Qt(v.nextSibling)),
            (ct = t),
            (ve = !0),
            (qa = null),
            (Zt = !1),
            e !== null && wf(t, e),
            (t = no(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return l
      ? (Za(),
        (v = n.fallback),
        (l = t.mode),
        (b = e.child),
        (N = b.sibling),
        (n = pa(b, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = b.subtreeFlags & 65011712),
        N !== null ? (v = pa(N, v)) : ((v = jn(v, l, a, null)), (v.flags |= 2)),
        (v.return = t),
        (n.return = t),
        (n.sibling = v),
        (t.child = n),
        gi(null, n),
        (n = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = to(a))
          : ((l = v.cachePool),
            l !== null
              ? ((b = Ze._currentValue), (l = l.parent !== b ? { parent: b, pool: b } : l))
              : (l = qf()),
            (v = { baseLanes: v.baseLanes | a, cachePool: l })),
        (n.memoizedState = v),
        (n.childLanes = ao(e, m, a)),
        (t.memoizedState = eo),
        gi(e.child, n))
      : (Ya(t),
        (a = e.child),
        (e = a.sibling),
        (a = pa(a, { mode: 'visible', children: n.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((m = t.deletions), m === null ? ((t.deletions = [e]), (t.flags |= 16)) : m.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function no(e, t) {
    return ((t = kc({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function kc(e, t) {
    return ((e = Ct(22, e, null, t)), (e.lanes = 0), e);
  }
  function lo(e, t, a) {
    return (
      Cn(t, e.child, null, a),
      (e = no(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Fd(e, t, a) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), _u(e.return, t, a));
  }
  function io(e, t, a, n, l, c) {
    var m = e.memoizedState;
    m === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: l,
          treeForkCount: c,
        })
      : ((m.isBackwards = t),
        (m.rendering = null),
        (m.renderingStartTime = 0),
        (m.last = n),
        (m.tail = a),
        (m.tailMode = l),
        (m.treeForkCount = c));
  }
  function Id(e, t, a) {
    var n = t.pendingProps,
      l = n.revealOrder,
      c = n.tail;
    n = n.children;
    var m = Ve.current,
      v = (m & 2) !== 0;
    if (
      (v ? ((m = (m & 1) | 2), (t.flags |= 128)) : (m &= 1),
      G(Ve, m),
      ut(e, t, n, a),
      (n = ve ? ii : 0),
      !v && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Fd(e, a, t);
        else if (e.tag === 19) Fd(e, a, t);
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
    switch (l) {
      case 'forwards':
        for (a = t.child, l = null; a !== null; )
          ((e = a.alternate), e !== null && Rc(e) === null && (l = a), (a = a.sibling));
        ((a = l),
          a === null ? ((l = t.child), (t.child = null)) : ((l = a.sibling), (a.sibling = null)),
          io(t, !1, l, a, c, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Rc(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = a), (a = l), (l = e));
        }
        io(t, !0, a, null, c, n);
        break;
      case 'together':
        io(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Sa(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Ka |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((fl(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = pa(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = pa(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function co(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && jc(e)));
  }
  function Sp(e, t, a) {
    switch (t.tag) {
      case 3:
        (We(t, t.stateNode.containerInfo), Ga(t, Ze, e.memoizedState.cache), An());
        break;
      case 27:
      case 5:
        ca(t);
        break;
      case 4:
        We(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ga(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Ru(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Ya(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? Wd(e, t, a)
              : (Ya(t), (e = Sa(e, t, a)), e !== null ? e.sibling : null);
        Ya(t);
        break;
      case 19:
        var l = (e.flags & 128) !== 0;
        if (
          ((n = (a & t.childLanes) !== 0),
          n || (fl(e, t, a, !1), (n = (a & t.childLanes) !== 0)),
          l)
        ) {
          if (n) return Id(e, t, a);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null && ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          G(Ve, Ve.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Yd(e, t, a, t.pendingProps));
      case 24:
        Ga(t, Ze, e.memoizedState.cache);
    }
    return Sa(e, t, a);
  }
  function Pd(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Qe = !0;
      else {
        if (!co(e, a) && (t.flags & 128) === 0) return ((Qe = !1), Sp(e, t, a));
        Qe = (e.flags & 131072) !== 0;
      }
    else ((Qe = !1), ve && (t.flags & 1048576) !== 0 && Rf(t, ii, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = Mn(t.elementType)), (t.type = e), typeof e == 'function'))
            fu(e)
              ? ((n = wn(e, n)), (t.tag = 1), (t = Kd(null, t, e, n, a)))
              : ((t.tag = 0), (t = Pu(null, t, e, n, a)));
          else {
            if (e != null) {
              var l = e.$$typeof;
              if (l === Se) {
                ((t.tag = 11), (t = Vd(null, t, e, n, a)));
                break e;
              } else if (l === P) {
                ((t.tag = 14), (t = $d(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = yt(e) || e), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return Pu(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (l = wn(n, t.pendingProps)), Kd(e, t, n, l, a));
      case 3:
        e: {
          if ((We(t, t.stateNode.containerInfo), e === null)) throw Error(o(387));
          n = t.pendingProps;
          var c = t.memoizedState;
          ((l = c.element), Eu(e, t), mi(t, n, null, a));
          var m = t.memoizedState;
          if (
            ((n = m.cache),
            Ga(t, Ze, n),
            n !== c.cache && bu(t, [Ze], a, !0),
            di(),
            (n = m.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: n, isDehydrated: !1, cache: m.cache }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              t = Jd(e, t, n, a);
              break e;
            } else if (n !== l) {
              ((l = $t(Error(o(424)), t)), ci(l), (t = Jd(e, t, n, a)));
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
                De = Qt(e.firstChild),
                  ct = t,
                  ve = !0,
                  qa = null,
                  Zt = !0,
                  a = Yf(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((An(), n === l)) {
              t = Sa(e, t, a);
              break e;
            }
            ut(e, t, n, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          $c(e, t),
          e === null
            ? (a = rh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : ve ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = is(ce.current).createElement(a)),
                (n[it] = t),
                (n[_t] = e),
                ot(n, a, e),
                at(n),
                (t.stateNode = n))
            : (t.memoizedState = rh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          ca(t),
          e === null &&
            ve &&
            ((n = t.stateNode = sh(t.type, t.pendingProps, ce.current)),
            (ct = t),
            (Zt = !0),
            (l = De),
            Pa(t.type) ? ((Go = l), (De = Qt(n.firstChild))) : (De = l)),
          ut(e, t, t.pendingProps.children, a),
          $c(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            ve &&
            ((l = n = De) &&
              ((n = Fp(n, t.type, t.pendingProps, Zt)),
              n !== null
                ? ((t.stateNode = n), (ct = t), (De = Qt(n.firstChild)), (Zt = !1), (l = !0))
                : (l = !1)),
            l || Ua(t)),
          ca(t),
          (l = t.type),
          (c = t.pendingProps),
          (m = e !== null ? e.memoizedProps : null),
          (n = c.children),
          Bo(l, c) ? (n = null) : m !== null && Bo(l, m) && (t.flags |= 32),
          t.memoizedState !== null && ((l = Ou(e, t, dp, null, null, a)), (Oi._currentValue = l)),
          $c(e, t),
          ut(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            ve &&
            ((e = a = De) &&
              ((a = Ip(a, t.pendingProps, Zt)),
              a !== null ? ((t.stateNode = a), (ct = t), (De = null), (e = !0)) : (e = !1)),
            e || Ua(t)),
          null
        );
      case 13:
        return Wd(e, t, a);
      case 4:
        return (
          We(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = Cn(t, null, n, a)) : ut(e, t, n, a),
          t.child
        );
      case 11:
        return Vd(e, t, t.type, t.pendingProps, a);
      case 7:
        return (ut(e, t, t.pendingProps, a), t.child);
      case 8:
        return (ut(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (ut(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((n = t.pendingProps), Ga(t, t.type, n.value), ut(e, t, n.children, a), t.child);
      case 9:
        return (
          (l = t.type._context),
          (n = t.pendingProps.children),
          En(t),
          (l = st(l)),
          (n = n(l)),
          (t.flags |= 1),
          ut(e, t, n, a),
          t.child
        );
      case 14:
        return $d(e, t, t.type, t.pendingProps, a);
      case 15:
        return kd(e, t, t.type, t.pendingProps, a);
      case 19:
        return Id(e, t, a);
      case 31:
        return bp(e, t, a);
      case 22:
        return Yd(e, t, a, t.pendingProps);
      case 24:
        return (
          En(t),
          (n = st(Ze)),
          e === null
            ? ((l = ju()),
              l === null &&
                ((l = Re),
                (c = Su()),
                (l.pooledCache = c),
                c.refCount++,
                c !== null && (l.pooledCacheLanes |= a),
                (l = c)),
              (t.memoizedState = { parent: n, cache: l }),
              Tu(t),
              Ga(t, Ze, l))
            : ((e.lanes & a) !== 0 && (Eu(e, t), mi(t, null, null, a), di()),
              (l = e.memoizedState),
              (c = t.memoizedState),
              l.parent !== n
                ? ((l = { parent: n, cache: n }),
                  (t.memoizedState = l),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = l),
                  Ga(t, Ze, n))
                : ((n = c.cache), Ga(t, Ze, n), n !== l.cache && bu(t, [Ze], a, !0))),
          ut(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function xa(e) {
    e.flags |= 4;
  }
  function so(e, t, a, n, l) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (l & 335544128) === l))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Em()) e.flags |= 8192;
        else throw ((zn = Nc), Au);
    } else e.flags &= -16777217;
  }
  function em(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !ph(t)))
      if (Em()) e.flags |= 8192;
      else throw ((zn = Nc), Au);
  }
  function Yc(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? wr() : 536870912), (e.lanes |= t), (jl |= t)));
  }
  function _i(e, t) {
    if (!ve)
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
  function Be(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      n = 0;
    if (t)
      for (var l = e.child; l !== null; )
        ((a |= l.lanes | l.childLanes),
          (n |= l.subtreeFlags & 65011712),
          (n |= l.flags & 65011712),
          (l.return = e),
          (l = l.sibling));
    else
      for (l = e.child; l !== null; )
        ((a |= l.lanes | l.childLanes),
          (n |= l.subtreeFlags),
          (n |= l.flags),
          (l.return = e),
          (l = l.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = a), t);
  }
  function xp(e, t, a) {
    var n = t.pendingProps;
    switch ((pu(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Be(t), null);
      case 1:
        return (Be(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          ga(Ze),
          Ee(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (rl(t)
              ? xa(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), yu())),
          Be(t),
          null
        );
      case 26:
        var l = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (xa(t), c !== null ? (Be(t), em(t, c)) : (Be(t), so(t, l, null, n, a)))
            : c
              ? c !== e.memoizedState
                ? (xa(t), Be(t), em(t, c))
                : (Be(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && xa(t), Be(t), so(t, l, e, n, a)),
          null
        );
      case 27:
        if ((Ne(t), (a = ce.current), (l = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && xa(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(o(166));
            return (Be(t), null);
          }
          ((e = Y.current), rl(t) ? Of(t) : ((e = sh(l, n, a)), (t.stateNode = e), xa(t)));
        }
        return (Be(t), null);
      case 5:
        if ((Ne(t), (l = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && xa(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(o(166));
            return (Be(t), null);
          }
          if (((c = Y.current), rl(t))) Of(t);
          else {
            var m = is(ce.current);
            switch (c) {
              case 1:
                c = m.createElementNS('http://www.w3.org/2000/svg', l);
                break;
              case 2:
                c = m.createElementNS('http://www.w3.org/1998/Math/MathML', l);
                break;
              default:
                switch (l) {
                  case 'svg':
                    c = m.createElementNS('http://www.w3.org/2000/svg', l);
                    break;
                  case 'math':
                    c = m.createElementNS('http://www.w3.org/1998/Math/MathML', l);
                    break;
                  case 'script':
                    ((c = m.createElement('div')),
                      (c.innerHTML = '<script><\/script>'),
                      (c = c.removeChild(c.firstChild)));
                    break;
                  case 'select':
                    ((c =
                      typeof n.is == 'string'
                        ? m.createElement('select', { is: n.is })
                        : m.createElement('select')),
                      n.multiple ? (c.multiple = !0) : n.size && (c.size = n.size));
                    break;
                  default:
                    c =
                      typeof n.is == 'string'
                        ? m.createElement(l, { is: n.is })
                        : m.createElement(l);
                }
            }
            ((c[it] = t), (c[_t] = n));
            e: for (m = t.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6) c.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                ((m.child.return = m), (m = m.child));
                continue;
              }
              if (m === t) break e;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === t) break e;
                m = m.return;
              }
              ((m.sibling.return = m.return), (m = m.sibling));
            }
            t.stateNode = c;
            e: switch ((ot(c, l, n), l)) {
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
            n && xa(t);
          }
        }
        return (Be(t), so(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && xa(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = ce.current), rl(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (n = null), (l = ct), l !== null))
              switch (l.tag) {
                case 27:
                case 5:
                  n = l.memoizedProps;
              }
            ((e[it] = t),
              (e = !!(
                e.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                Wm(e.nodeValue, a)
              )),
              e || Ua(t, !0));
          } else ((e = is(e).createTextNode(n)), (e[it] = t), (t.stateNode = e));
        }
        return (Be(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = rl(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(o(557));
              e[it] = t;
            } else (An(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Be(t), (e = !1));
          } else
            ((a = yu()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (wt(t), t) : (wt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return (Be(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((l = rl(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (((l = t.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
                throw Error(o(317));
              l[it] = t;
            } else (An(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Be(t), (l = !1));
          } else
            ((l = yu()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
              (l = !0));
          if (!l) return t.flags & 256 ? (wt(t), t) : (wt(t), null);
        }
        return (
          wt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = n !== null),
              (e = e !== null && e.memoizedState !== null),
              a &&
                ((n = t.child),
                (l = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (l = n.alternate.memoizedState.cachePool.pool),
                (c = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (c = n.memoizedState.cachePool.pool),
                c !== l && (n.flags |= 2048)),
              a !== e && a && (t.child.flags |= 8192),
              Yc(t, t.updateQueue),
              Be(t),
              null)
        );
      case 4:
        return (Ee(), e === null && Co(t.stateNode.containerInfo), Be(t), null);
      case 10:
        return (ga(t.type), Be(t), null);
      case 19:
        if ((L(Ve), (n = t.memoizedState), n === null)) return (Be(t), null);
        if (((l = (t.flags & 128) !== 0), (c = n.rendering), c === null))
          if (l) _i(n, !1);
          else {
            if (Ge !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((c = Rc(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      _i(n, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      Yc(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (Mf(a, e), (a = a.sibling));
                  return (G(Ve, (Ve.current & 1) | 2), ve && va(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              Et() > Jc &&
              ((t.flags |= 128), (l = !0), _i(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!l)
            if (((e = Rc(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (l = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Yc(t, e),
                _i(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !c.alternate && !ve)
              )
                return (Be(t), null);
            } else
              2 * Et() - n.renderingStartTime > Jc &&
                a !== 536870912 &&
                ((t.flags |= 128), (l = !0), _i(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((c.sibling = t.child), (t.child = c))
            : ((e = n.last), e !== null ? (e.sibling = c) : (t.child = c), (n.last = c));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = Et()),
            (e.sibling = null),
            (a = Ve.current),
            G(Ve, l ? (a & 1) | 2 : a & 1),
            ve && va(t, n.treeForkCount),
            e)
          : (Be(t), null);
      case 22:
      case 23:
        return (
          wt(t),
          Cu(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Be(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Be(t),
          (a = t.updateQueue),
          a !== null && Yc(t, a.retryQueue),
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
          e !== null && L(Nn),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          ga(Ze),
          Be(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function jp(e, t) {
    switch ((pu(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          ga(Ze),
          Ee(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Ne(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((wt(t), t.alternate === null)) throw Error(o(340));
          An();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((wt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(o(340));
          An();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (L(Ve), null);
      case 4:
        return (Ee(), null);
      case 10:
        return (ga(t.type), null);
      case 22:
      case 23:
        return (
          wt(t),
          Cu(),
          e !== null && L(Nn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (ga(Ze), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function tm(e, t) {
    switch ((pu(t), t.tag)) {
      case 3:
        (ga(Ze), Ee());
        break;
      case 26:
      case 27:
      case 5:
        Ne(t);
        break;
      case 4:
        Ee();
        break;
      case 31:
        t.memoizedState !== null && wt(t);
        break;
      case 13:
        wt(t);
        break;
      case 19:
        L(Ve);
        break;
      case 10:
        ga(t.type);
        break;
      case 22:
      case 23:
        (wt(t), Cu(), e !== null && L(Nn));
        break;
      case 24:
        ga(Ze);
    }
  }
  function bi(e, t) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var l = n.next;
        a = l;
        do {
          if ((a.tag & e) === e) {
            n = void 0;
            var c = a.create,
              m = a.inst;
            ((n = c()), (m.destroy = n));
          }
          a = a.next;
        } while (a !== l);
      }
    } catch (v) {
      Ae(t, t.return, v);
    }
  }
  function Xa(e, t, a) {
    try {
      var n = t.updateQueue,
        l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var c = l.next;
        n = c;
        do {
          if ((n.tag & e) === e) {
            var m = n.inst,
              v = m.destroy;
            if (v !== void 0) {
              ((m.destroy = void 0), (l = t));
              var b = a,
                N = v;
              try {
                N();
              } catch (O) {
                Ae(l, b, O);
              }
            }
          }
          n = n.next;
        } while (n !== c);
      }
    } catch (O) {
      Ae(t, t.return, O);
    }
  }
  function am(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Xf(t, a);
      } catch (n) {
        Ae(e, e.return, n);
      }
    }
  }
  function nm(e, t, a) {
    ((a.props = wn(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      Ae(e, t, n);
    }
  }
  function Si(e, t) {
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
    } catch (l) {
      Ae(e, t, l);
    }
  }
  function oa(e, t) {
    var a = e.ref,
      n = e.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (l) {
          Ae(e, t, l);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (l) {
          Ae(e, t, l);
        }
      else a.current = null;
  }
  function lm(e) {
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
    } catch (l) {
      Ae(e, e.return, l);
    }
  }
  function uo(e, t, a) {
    try {
      var n = e.stateNode;
      (Zp(n, e.type, a, t), (n[_t] = t));
    } catch (l) {
      Ae(e, e.return, l);
    }
  }
  function im(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Pa(e.type)) || e.tag === 4
    );
  }
  function oo(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || im(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && Pa(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ro(e, t, a) {
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
            a != null || t.onclick !== null || (t.onclick = ma)));
    else if (
      n !== 4 &&
      (n === 27 && Pa(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (ro(e, t, a), e = e.sibling; e !== null; ) (ro(e, t, a), (e = e.sibling));
  }
  function Zc(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && Pa(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (Zc(e, t, a), e = e.sibling; e !== null; ) (Zc(e, t, a), (e = e.sibling));
  }
  function cm(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, l = t.attributes; l.length; ) t.removeAttributeNode(l[0]);
      (ot(t, n, a), (t[it] = e), (t[_t] = a));
    } catch (c) {
      Ae(e, e.return, c);
    }
  }
  var ja = !1,
    Ke = !1,
    fo = !1,
    sm = typeof WeakSet == 'function' ? WeakSet : Set,
    nt = null;
  function Ap(e, t) {
    if (((e = e.containerInfo), (Oo = ds), (e = _f(e)), lu(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var l = n.anchorOffset,
              c = n.focusNode;
            n = n.focusOffset;
            try {
              (a.nodeType, c.nodeType);
            } catch {
              a = null;
              break e;
            }
            var m = 0,
              v = -1,
              b = -1,
              N = 0,
              O = 0,
              H = e,
              M = null;
            t: for (;;) {
              for (
                var R;
                H !== a || (l !== 0 && H.nodeType !== 3) || (v = m + l),
                  H !== c || (n !== 0 && H.nodeType !== 3) || (b = m + n),
                  H.nodeType === 3 && (m += H.nodeValue.length),
                  (R = H.firstChild) !== null;
              )
                ((M = H), (H = R));
              for (;;) {
                if (H === e) break t;
                if (
                  (M === a && ++N === l && (v = m),
                  M === c && ++O === n && (b = m),
                  (R = H.nextSibling) !== null)
                )
                  break;
                ((H = M), (M = H.parentNode));
              }
              H = R;
            }
            a = v === -1 || b === -1 ? null : { start: v, end: b };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Do = { focusedElem: e, selectionRange: a }, ds = !1, nt = t; nt !== null; )
      if (((t = nt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (nt = e));
      else
        for (; nt !== null; ) {
          switch (((t = nt), (c = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (a = 0; a < e.length; a++) ((l = e[a]), (l.ref.impl = l.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                ((e = void 0),
                  (a = t),
                  (l = c.memoizedProps),
                  (c = c.memoizedState),
                  (n = a.stateNode));
                try {
                  var Z = wn(a.type, l);
                  ((e = n.getSnapshotBeforeUpdate(Z, c)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (te) {
                  Ae(a, a.return, te);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) Ho(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Ho(e);
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
            ((e.return = t.return), (nt = e));
            break;
          }
          nt = t.return;
        }
  }
  function um(e, t, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Ta(e, a), n & 4 && bi(5, a));
        break;
      case 1:
        if ((Ta(e, a), n & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (m) {
              Ae(a, a.return, m);
            }
          else {
            var l = wn(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(l, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (m) {
              Ae(a, a.return, m);
            }
          }
        (n & 64 && am(a), n & 512 && Si(a, a.return));
        break;
      case 3:
        if ((Ta(e, a), n & 64 && ((e = a.updateQueue), e !== null))) {
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
            Xf(e, t);
          } catch (m) {
            Ae(a, a.return, m);
          }
        }
        break;
      case 27:
        t === null && n & 4 && cm(a);
      case 26:
      case 5:
        (Ta(e, a), t === null && n & 4 && lm(a), n & 512 && Si(a, a.return));
        break;
      case 12:
        Ta(e, a);
        break;
      case 31:
        (Ta(e, a), n & 4 && fm(e, a));
        break;
      case 13:
        (Ta(e, a),
          n & 4 && dm(e, a),
          n & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = Op.bind(null, a)), Pp(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || ja), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || Ke), (l = ja));
          var c = Ke;
          ((ja = n),
            (Ke = t) && !c ? Ea(e, a, (a.subtreeFlags & 8772) !== 0) : Ta(e, a),
            (ja = l),
            (Ke = c));
        }
        break;
      case 30:
        break;
      default:
        Ta(e, a);
    }
  }
  function om(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), om(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Vs(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Le = null,
    St = !1;
  function Aa(e, t, a) {
    for (a = a.child; a !== null; ) (rm(e, t, a), (a = a.sibling));
  }
  function rm(e, t, a) {
    if (Nt && typeof Nt.onCommitFiberUnmount == 'function')
      try {
        Nt.onCommitFiberUnmount(Zl, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (Ke || oa(a, t),
          Aa(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        Ke || oa(a, t);
        var n = Le,
          l = St;
        (Pa(a.type) && ((Le = a.stateNode), (St = !1)),
          Aa(e, t, a),
          Ci(a.stateNode),
          (Le = n),
          (St = l));
        break;
      case 5:
        Ke || oa(a, t);
      case 6:
        if (((n = Le), (l = St), (Le = null), Aa(e, t, a), (Le = n), (St = l), Le !== null))
          if (St)
            try {
              (Le.nodeType === 9
                ? Le.body
                : Le.nodeName === 'HTML'
                  ? Le.ownerDocument.body
                  : Le
              ).removeChild(a.stateNode);
            } catch (c) {
              Ae(a, t, c);
            }
          else
            try {
              Le.removeChild(a.stateNode);
            } catch (c) {
              Ae(a, t, c);
            }
        break;
      case 18:
        Le !== null &&
          (St
            ? ((e = Le),
              ah(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              Rl(e))
            : ah(Le, a.stateNode));
        break;
      case 4:
        ((n = Le),
          (l = St),
          (Le = a.stateNode.containerInfo),
          (St = !0),
          Aa(e, t, a),
          (Le = n),
          (St = l));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Xa(2, a, t), Ke || Xa(4, a, t), Aa(e, t, a));
        break;
      case 1:
        (Ke ||
          (oa(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && nm(a, t, n)),
          Aa(e, t, a));
        break;
      case 21:
        Aa(e, t, a);
        break;
      case 22:
        ((Ke = (n = Ke) || a.memoizedState !== null), Aa(e, t, a), (Ke = n));
        break;
      default:
        Aa(e, t, a);
    }
  }
  function fm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Rl(e);
      } catch (a) {
        Ae(t, t.return, a);
      }
    }
  }
  function dm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Rl(e);
      } catch (a) {
        Ae(t, t.return, a);
      }
  }
  function Tp(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new sm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new sm()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Xc(e, t) {
    var a = Tp(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var l = Dp.bind(null, e, n);
        n.then(l, l);
      }
    });
  }
  function xt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var l = a[n],
          c = e,
          m = t,
          v = m;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (Pa(v.type)) {
                ((Le = v.stateNode), (St = !1));
                break e;
              }
              break;
            case 5:
              ((Le = v.stateNode), (St = !1));
              break e;
            case 3:
            case 4:
              ((Le = v.stateNode.containerInfo), (St = !0));
              break e;
          }
          v = v.return;
        }
        if (Le === null) throw Error(o(160));
        (rm(c, m, l),
          (Le = null),
          (St = !1),
          (c = l.alternate),
          c !== null && (c.return = null),
          (l.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (mm(t, e), (t = t.sibling));
  }
  var It = null;
  function mm(e, t) {
    var a = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (xt(t, e), jt(e), n & 4 && (Xa(3, e, e.return), bi(3, e), Xa(5, e, e.return)));
        break;
      case 1:
        (xt(t, e),
          jt(e),
          n & 512 && (Ke || a === null || oa(a, a.return)),
          n & 64 &&
            ja &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var l = It;
        if ((xt(t, e), jt(e), n & 512 && (Ke || a === null || oa(a, a.return)), n & 4)) {
          var c = a !== null ? a.memoizedState : null;
          if (((n = e.memoizedState), a === null))
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  ((n = e.type), (a = e.memoizedProps), (l = l.ownerDocument || l));
                  t: switch (n) {
                    case 'title':
                      ((c = l.getElementsByTagName('title')[0]),
                        (!c ||
                          c[Kl] ||
                          c[it] ||
                          c.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          c.hasAttribute('itemprop')) &&
                          ((c = l.createElement(n)),
                          l.head.insertBefore(c, l.querySelector('head > title'))),
                        ot(c, n, a),
                        (c[it] = e),
                        at(c),
                        (n = c));
                      break e;
                    case 'link':
                      var m = mh('link', 'href', l).get(n + (a.href || ''));
                      if (m) {
                        for (var v = 0; v < m.length; v++)
                          if (
                            ((c = m[v]),
                            c.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              c.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              c.getAttribute('title') === (a.title == null ? null : a.title) &&
                              c.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            m.splice(v, 1);
                            break t;
                          }
                      }
                      ((c = l.createElement(n)), ot(c, n, a), l.head.appendChild(c));
                      break;
                    case 'meta':
                      if ((m = mh('meta', 'content', l).get(n + (a.content || '')))) {
                        for (v = 0; v < m.length; v++)
                          if (
                            ((c = m[v]),
                            c.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              c.getAttribute('name') === (a.name == null ? null : a.name) &&
                              c.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              c.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              c.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            m.splice(v, 1);
                            break t;
                          }
                      }
                      ((c = l.createElement(n)), ot(c, n, a), l.head.appendChild(c));
                      break;
                    default:
                      throw Error(o(468, n));
                  }
                  ((c[it] = e), at(c), (n = c));
                }
                e.stateNode = n;
              } else hh(l, e.type, e.stateNode);
            else e.stateNode = dh(l, n, e.memoizedProps);
          else
            c !== n
              ? (c === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : c.count--,
                n === null ? hh(l, e.type, e.stateNode) : dh(l, n, e.memoizedProps))
              : n === null && e.stateNode !== null && uo(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (xt(t, e),
          jt(e),
          n & 512 && (Ke || a === null || oa(a, a.return)),
          a !== null && n & 4 && uo(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((xt(t, e), jt(e), n & 512 && (Ke || a === null || oa(a, a.return)), e.flags & 32)) {
          l = e.stateNode;
          try {
            el(l, '');
          } catch (Z) {
            Ae(e, e.return, Z);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((l = e.memoizedProps), uo(e, l, a !== null ? a.memoizedProps : l)),
          n & 1024 && (fo = !0));
        break;
      case 6:
        if ((xt(t, e), jt(e), n & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((n = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = n;
          } catch (Z) {
            Ae(e, e.return, Z);
          }
        }
        break;
      case 3:
        if (
          ((us = null),
          (l = It),
          (It = cs(t.containerInfo)),
          xt(t, e),
          (It = l),
          jt(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Rl(t.containerInfo);
          } catch (Z) {
            Ae(e, e.return, Z);
          }
        fo && ((fo = !1), hm(e));
        break;
      case 4:
        ((n = It), (It = cs(e.stateNode.containerInfo)), xt(t, e), jt(e), (It = n));
        break;
      case 12:
        (xt(t, e), jt(e));
        break;
      case 31:
        (xt(t, e),
          jt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Xc(e, n))));
        break;
      case 13:
        (xt(t, e),
          jt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Kc = Et()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Xc(e, n))));
        break;
      case 22:
        l = e.memoizedState !== null;
        var b = a !== null && a.memoizedState !== null,
          N = ja,
          O = Ke;
        if (((ja = N || l), (Ke = O || b), xt(t, e), (Ke = O), (ja = N), jt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = l ? t._visibility & -2 : t._visibility | 1,
              l && (a === null || b || ja || Ke || On(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                b = a = t;
                try {
                  if (((c = b.stateNode), l))
                    ((m = c.style),
                      typeof m.setProperty == 'function'
                        ? m.setProperty('display', 'none', 'important')
                        : (m.display = 'none'));
                  else {
                    v = b.stateNode;
                    var H = b.memoizedProps.style,
                      M = H != null && H.hasOwnProperty('display') ? H.display : null;
                    v.style.display = M == null || typeof M == 'boolean' ? '' : ('' + M).trim();
                  }
                } catch (Z) {
                  Ae(b, b.return, Z);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                b = t;
                try {
                  b.stateNode.nodeValue = l ? '' : b.memoizedProps;
                } catch (Z) {
                  Ae(b, b.return, Z);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                b = t;
                try {
                  var R = b.stateNode;
                  l ? nh(R, !0) : nh(b.stateNode, !1);
                } catch (Z) {
                  Ae(b, b.return, Z);
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
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), Xc(e, a))));
        break;
      case 19:
        (xt(t, e),
          jt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Xc(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (xt(t, e), jt(e));
    }
  }
  function jt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, n = e.return; n !== null; ) {
          if (im(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var l = a.stateNode,
              c = oo(e);
            Zc(e, c, l);
            break;
          case 5:
            var m = a.stateNode;
            a.flags & 32 && (el(m, ''), (a.flags &= -33));
            var v = oo(e);
            Zc(e, v, m);
            break;
          case 3:
          case 4:
            var b = a.stateNode.containerInfo,
              N = oo(e);
            ro(e, N, b);
            break;
          default:
            throw Error(o(161));
        }
      } catch (O) {
        Ae(e, e.return, O);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function hm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (hm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Ta(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (um(e, t.alternate, t), (t = t.sibling));
  }
  function On(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Xa(4, t, t.return), On(t));
          break;
        case 1:
          oa(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && nm(t, t.return, a), On(t));
          break;
        case 27:
          Ci(t.stateNode);
        case 26:
        case 5:
          (oa(t, t.return), On(t));
          break;
        case 22:
          t.memoizedState === null && On(t);
          break;
        case 30:
          On(t);
          break;
        default:
          On(t);
      }
      e = e.sibling;
    }
  }
  function Ea(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        l = e,
        c = t,
        m = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (Ea(l, c, a), bi(4, c));
          break;
        case 1:
          if ((Ea(l, c, a), (n = c), (l = n.stateNode), typeof l.componentDidMount == 'function'))
            try {
              l.componentDidMount();
            } catch (N) {
              Ae(n, n.return, N);
            }
          if (((n = c), (l = n.updateQueue), l !== null)) {
            var v = n.stateNode;
            try {
              var b = l.shared.hiddenCallbacks;
              if (b !== null)
                for (l.shared.hiddenCallbacks = null, l = 0; l < b.length; l++) Zf(b[l], v);
            } catch (N) {
              Ae(n, n.return, N);
            }
          }
          (a && m & 64 && am(c), Si(c, c.return));
          break;
        case 27:
          cm(c);
        case 26:
        case 5:
          (Ea(l, c, a), a && n === null && m & 4 && lm(c), Si(c, c.return));
          break;
        case 12:
          Ea(l, c, a);
          break;
        case 31:
          (Ea(l, c, a), a && m & 4 && fm(l, c));
          break;
        case 13:
          (Ea(l, c, a), a && m & 4 && dm(l, c));
          break;
        case 22:
          (c.memoizedState === null && Ea(l, c, a), Si(c, c.return));
          break;
        case 30:
          break;
        default:
          Ea(l, c, a);
      }
      t = t.sibling;
    }
  }
  function mo(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && si(a)));
  }
  function ho(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && si(e)));
  }
  function Pt(e, t, a, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (pm(e, t, a, n), (t = t.sibling));
  }
  function pm(e, t, a, n) {
    var l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Pt(e, t, a, n), l & 2048 && bi(9, t));
        break;
      case 1:
        Pt(e, t, a, n);
        break;
      case 3:
        (Pt(e, t, a, n),
          l & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && si(e))));
        break;
      case 12:
        if (l & 2048) {
          (Pt(e, t, a, n), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              m = c.id,
              v = c.onPostCommit;
            typeof v == 'function' &&
              v(m, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (b) {
            Ae(t, t.return, b);
          }
        } else Pt(e, t, a, n);
        break;
      case 31:
        Pt(e, t, a, n);
        break;
      case 13:
        Pt(e, t, a, n);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (m = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? Pt(e, t, a, n)
              : xi(e, t)
            : c._visibility & 2
              ? Pt(e, t, a, n)
              : ((c._visibility |= 2), bl(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          l & 2048 && mo(m, t));
        break;
      case 24:
        (Pt(e, t, a, n), l & 2048 && ho(t.alternate, t));
        break;
      default:
        Pt(e, t, a, n);
    }
  }
  function bl(e, t, a, n, l) {
    for (l = l && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e,
        m = t,
        v = a,
        b = n,
        N = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          (bl(c, m, v, b, l), bi(8, m));
          break;
        case 23:
          break;
        case 22:
          var O = m.stateNode;
          (m.memoizedState !== null
            ? O._visibility & 2
              ? bl(c, m, v, b, l)
              : xi(c, m)
            : ((O._visibility |= 2), bl(c, m, v, b, l)),
            l && N & 2048 && mo(m.alternate, m));
          break;
        case 24:
          (bl(c, m, v, b, l), l && N & 2048 && ho(m.alternate, m));
          break;
        default:
          bl(c, m, v, b, l);
      }
      t = t.sibling;
    }
  }
  function xi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          n = t,
          l = n.flags;
        switch (n.tag) {
          case 22:
            (xi(a, n), l & 2048 && mo(n.alternate, n));
            break;
          case 24:
            (xi(a, n), l & 2048 && ho(n.alternate, n));
            break;
          default:
            xi(a, n);
        }
        t = t.sibling;
      }
  }
  var ji = 8192;
  function Sl(e, t, a) {
    if (e.subtreeFlags & ji) for (e = e.child; e !== null; ) (vm(e, t, a), (e = e.sibling));
  }
  function vm(e, t, a) {
    switch (e.tag) {
      case 26:
        (Sl(e, t, a),
          e.flags & ji && e.memoizedState !== null && fv(a, It, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Sl(e, t, a);
        break;
      case 3:
      case 4:
        var n = It;
        ((It = cs(e.stateNode.containerInfo)), Sl(e, t, a), (It = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = ji), (ji = 16777216), Sl(e, t, a), (ji = n))
            : Sl(e, t, a));
        break;
      default:
        Sl(e, t, a);
    }
  }
  function ym(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Ai(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((nt = n), _m(n, e));
        }
      ym(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (gm(e), (e = e.sibling));
  }
  function gm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Ai(e), e.flags & 2048 && Xa(9, e, e.return));
        break;
      case 3:
        Ai(e);
        break;
      case 12:
        Ai(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Qc(e))
          : Ai(e);
        break;
      default:
        Ai(e);
    }
  }
  function Qc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((nt = n), _m(n, e));
        }
      ym(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Xa(8, t, t.return), Qc(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Qc(t)));
          break;
        default:
          Qc(t);
      }
      e = e.sibling;
    }
  }
  function _m(e, t) {
    for (; nt !== null; ) {
      var a = nt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Xa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          si(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (nt = n));
      else
        e: for (a = e; nt !== null; ) {
          n = nt;
          var l = n.sibling,
            c = n.return;
          if ((om(n), n === a)) {
            nt = null;
            break e;
          }
          if (l !== null) {
            ((l.return = c), (nt = l));
            break e;
          }
          nt = c;
        }
    }
  }
  var Ep = {
      getCacheForType: function (e) {
        var t = st(Ze),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return st(Ze).controller.signal;
      },
    },
    Np = typeof WeakMap == 'function' ? WeakMap : Map,
    xe = 0,
    Re = null,
    re = null,
    me = 0,
    je = 0,
    Ot = null,
    Qa = !1,
    xl = !1,
    po = !1,
    Na = 0,
    Ge = 0,
    Ka = 0,
    Dn = 0,
    vo = 0,
    Dt = 0,
    jl = 0,
    Ti = null,
    At = null,
    yo = !1,
    Kc = 0,
    bm = 0,
    Jc = 1 / 0,
    Wc = null,
    Ja = null,
    Ie = 0,
    Wa = null,
    Al = null,
    Ma = 0,
    go = 0,
    _o = null,
    Sm = null,
    Ei = 0,
    bo = null;
  function Bt() {
    return (xe & 2) !== 0 && me !== 0 ? me & -me : w.T !== null ? Eo() : Lr();
  }
  function xm() {
    if (Dt === 0)
      if ((me & 536870912) === 0 || ve) {
        var e = lc;
        ((lc <<= 1), (lc & 3932160) === 0 && (lc = 262144), (Dt = e));
      } else Dt = 536870912;
    return ((e = Rt.current), e !== null && (e.flags |= 32), Dt);
  }
  function Tt(e, t, a) {
    (((e === Re && (je === 2 || je === 9)) || e.cancelPendingCommit !== null) &&
      (Tl(e, 0), Fa(e, me, Dt, !1)),
      Ql(e, a),
      ((xe & 2) === 0 || e !== Re) &&
        (e === Re && ((xe & 2) === 0 && (Dn |= a), Ge === 4 && Fa(e, me, Dt, !1)), ra(e)));
  }
  function jm(e, t, a) {
    if ((xe & 6) !== 0) throw Error(o(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Xl(e, t),
      l = n ? Cp(e, t) : xo(e, t, !0),
      c = n;
    do {
      if (l === 0) {
        xl && !n && Fa(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), c && !Mp(a))) {
          ((l = xo(e, t, !1)), (c = !1));
          continue;
        }
        if (l === 2) {
          if (((c = t), e.errorRecoveryDisabledLanes & c)) var m = 0;
          else
            ((m = e.pendingLanes & -536870913), (m = m !== 0 ? m : m & 536870912 ? 536870912 : 0));
          if (m !== 0) {
            t = m;
            e: {
              var v = e;
              l = Ti;
              var b = v.current.memoizedState.isDehydrated;
              if ((b && (Tl(v, m).flags |= 256), (m = xo(v, m, !1)), m !== 2)) {
                if (po && !b) {
                  ((v.errorRecoveryDisabledLanes |= c), (Dn |= c), (l = 4));
                  break e;
                }
                ((c = At), (At = l), c !== null && (At === null ? (At = c) : At.push.apply(At, c)));
              }
              l = m;
            }
            if (((c = !1), l !== 2)) continue;
          }
        }
        if (l === 1) {
          (Tl(e, 0), Fa(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (c = l), c)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Fa(n, t, Dt, !Qa);
              break e;
            case 2:
              At = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((l = Kc + 300 - Et()), 10 < l)) {
            if ((Fa(n, t, Dt, !Qa), cc(n, 0, !0) !== 0)) break e;
            ((Ma = t),
              (n.timeoutHandle = eh(
                Am.bind(null, n, a, At, Wc, yo, t, Dt, Dn, jl, Qa, c, 'Throttled', -0, 0),
                l
              )));
            break e;
          }
          Am(n, a, At, Wc, yo, t, Dt, Dn, jl, Qa, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    ra(e);
  }
  function Am(e, t, a, n, l, c, m, v, b, N, O, H, M, R) {
    if (((e.timeoutHandle = -1), (H = t.subtreeFlags), H & 8192 || (H & 16785408) === 16785408)) {
      ((H = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ma,
      }),
        vm(t, c, H));
      var Z = (c & 62914560) === c ? Kc - Et() : (c & 4194048) === c ? bm - Et() : 0;
      if (((Z = dv(H, Z)), Z !== null)) {
        ((Ma = c),
          (e.cancelPendingCommit = Z(wm.bind(null, e, t, c, a, n, l, m, v, b, O, H, null, M, R))),
          Fa(e, c, m, !N));
        return;
      }
    }
    wm(e, t, c, a, n, l, m, v, b);
  }
  function Mp(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var l = a[n],
            c = l.getSnapshot;
          l = l.value;
          try {
            if (!zt(c(), l)) return !1;
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
  function Fa(e, t, a, n) {
    ((t &= ~vo),
      (t &= ~Dn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var l = t; 0 < l; ) {
      var c = 31 - Mt(l),
        m = 1 << c;
      ((n[c] = -1), (l &= ~m));
    }
    a !== 0 && Or(e, a, t);
  }
  function Fc() {
    return (xe & 6) === 0 ? (Ni(0), !1) : !0;
  }
  function So() {
    if (re !== null) {
      if (je === 0) var e = re.return;
      else ((e = re), (ya = Tn = null), Lu(e), (pl = null), (oi = 0), (e = re));
      for (; e !== null; ) (tm(e.alternate, e), (e = e.return));
      re = null;
    }
  }
  function Tl(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), Kp(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (Ma = 0),
      So(),
      (Re = e),
      (re = a = pa(e.current, null)),
      (me = t),
      (je = 0),
      (Ot = null),
      (Qa = !1),
      (xl = Xl(e, t)),
      (po = !1),
      (jl = Dt = vo = Dn = Ka = Ge = 0),
      (At = Ti = null),
      (yo = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var l = 31 - Mt(n),
          c = 1 << l;
        ((t |= e[l]), (n &= ~c));
      }
    return ((Na = t), gc(), a);
  }
  function Tm(e, t) {
    ((se = null),
      (w.H = yi),
      t === hl || t === Ec
        ? ((t = Vf()), (je = 3))
        : t === Au
          ? ((t = Vf()), (je = 4))
          : (je =
              t === Iu
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Ot = t),
      re === null && ((Ge = 1), Gc(e, $t(t, e.current))));
  }
  function Em() {
    var e = Rt.current;
    return e === null
      ? !0
      : (me & 4194048) === me
        ? Xt === null
        : (me & 62914560) === me || (me & 536870912) !== 0
          ? e === Xt
          : !1;
  }
  function Nm() {
    var e = w.H;
    return ((w.H = yi), e === null ? yi : e);
  }
  function Mm() {
    var e = w.A;
    return ((w.A = Ep), e);
  }
  function Ic() {
    ((Ge = 4),
      Qa || ((me & 4194048) !== me && Rt.current !== null) || (xl = !0),
      ((Ka & 134217727) === 0 && (Dn & 134217727) === 0) || Re === null || Fa(Re, me, Dt, !1));
  }
  function xo(e, t, a) {
    var n = xe;
    xe |= 2;
    var l = Nm(),
      c = Mm();
    ((Re !== e || me !== t) && ((Wc = null), Tl(e, t)), (t = !1));
    var m = Ge;
    e: do
      try {
        if (je !== 0 && re !== null) {
          var v = re,
            b = Ot;
          switch (je) {
            case 8:
              (So(), (m = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Rt.current === null && (t = !0);
              var N = je;
              if (((je = 0), (Ot = null), El(e, v, b, N), a && xl)) {
                m = 0;
                break e;
              }
              break;
            default:
              ((N = je), (je = 0), (Ot = null), El(e, v, b, N));
          }
        }
        (zp(), (m = Ge));
        break;
      } catch (O) {
        Tm(e, O);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (ya = Tn = null),
      (xe = n),
      (w.H = l),
      (w.A = c),
      re === null && ((Re = null), (me = 0), gc()),
      m
    );
  }
  function zp() {
    for (; re !== null; ) zm(re);
  }
  function Cp(e, t) {
    var a = xe;
    xe |= 2;
    var n = Nm(),
      l = Mm();
    Re !== e || me !== t ? ((Wc = null), (Jc = Et() + 500), Tl(e, t)) : (xl = Xl(e, t));
    e: do
      try {
        if (je !== 0 && re !== null) {
          t = re;
          var c = Ot;
          t: switch (je) {
            case 1:
              ((je = 0), (Ot = null), El(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (Uf(c)) {
                ((je = 0), (Ot = null), Cm(t));
                break;
              }
              ((t = function () {
                ((je !== 2 && je !== 9) || Re !== e || (je = 7), ra(e));
              }),
                c.then(t, t));
              break e;
            case 3:
              je = 7;
              break e;
            case 4:
              je = 5;
              break e;
            case 7:
              Uf(c) ? ((je = 0), (Ot = null), Cm(t)) : ((je = 0), (Ot = null), El(e, t, c, 7));
              break;
            case 5:
              var m = null;
              switch (re.tag) {
                case 26:
                  m = re.memoizedState;
                case 5:
                case 27:
                  var v = re;
                  if (m ? ph(m) : v.stateNode.complete) {
                    ((je = 0), (Ot = null));
                    var b = v.sibling;
                    if (b !== null) re = b;
                    else {
                      var N = v.return;
                      N !== null ? ((re = N), Pc(N)) : (re = null);
                    }
                    break t;
                  }
              }
              ((je = 0), (Ot = null), El(e, t, c, 5));
              break;
            case 6:
              ((je = 0), (Ot = null), El(e, t, c, 6));
              break;
            case 8:
              (So(), (Ge = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        Rp();
        break;
      } catch (O) {
        Tm(e, O);
      }
    while (!0);
    return (
      (ya = Tn = null),
      (w.H = n),
      (w.A = l),
      (xe = a),
      re !== null ? 0 : ((Re = null), (me = 0), gc(), Ge)
    );
  }
  function Rp() {
    for (; re !== null && !Ls(); ) zm(re);
  }
  function zm(e) {
    var t = Pd(e.alternate, e, Na);
    ((e.memoizedProps = e.pendingProps), t === null ? Pc(e) : (re = t));
  }
  function Cm(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Qd(a, t, t.pendingProps, t.type, void 0, me);
        break;
      case 11:
        t = Qd(a, t, t.pendingProps, t.type.render, t.ref, me);
        break;
      case 5:
        Lu(t);
      default:
        (tm(a, t), (t = re = Mf(t, Na)), (t = Pd(a, t, Na)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Pc(e) : (re = t));
  }
  function El(e, t, a, n) {
    ((ya = Tn = null), Lu(t), (pl = null), (oi = 0));
    var l = t.return;
    try {
      if (_p(e, l, t, a, me)) {
        ((Ge = 1), Gc(e, $t(a, e.current)), (re = null));
        return;
      }
    } catch (c) {
      if (l !== null) throw ((re = l), c);
      ((Ge = 1), Gc(e, $t(a, e.current)), (re = null));
      return;
    }
    t.flags & 32768
      ? (ve || n === 1
          ? (e = !0)
          : xl || (me & 536870912) !== 0
            ? (e = !1)
            : ((Qa = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Rt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Rm(t, e))
      : Pc(t);
  }
  function Pc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Rm(t, Qa);
        return;
      }
      e = t.return;
      var a = xp(t.alternate, t, Na);
      if (a !== null) {
        re = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        re = t;
        return;
      }
      re = t = e;
    } while (t !== null);
    Ge === 0 && (Ge = 5);
  }
  function Rm(e, t) {
    do {
      var a = jp(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (re = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        re = e;
        return;
      }
      re = e = a;
    } while (e !== null);
    ((Ge = 6), (re = null));
  }
  function wm(e, t, a, n, l, c, m, v, b) {
    e.cancelPendingCommit = null;
    do es();
    while (Ie !== 0);
    if ((xe & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= ou),
        r1(e, a, c, m, v, b),
        e === Re && ((re = Re = null), (me = 0)),
        (Al = t),
        (Wa = e),
        (Ma = a),
        (go = c),
        (_o = l),
        (Sm = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Bp(ac, function () {
              return (Hm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = w.T), (w.T = null), (l = $.p), ($.p = 2), (m = xe), (xe |= 4));
        try {
          Ap(e, t, a);
        } finally {
          ((xe = m), ($.p = l), (w.T = n));
        }
      }
      ((Ie = 1), Om(), Dm(), Bm());
    }
  }
  function Om() {
    if (Ie === 1) {
      Ie = 0;
      var e = Wa,
        t = Al,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = w.T), (w.T = null));
        var n = $.p;
        $.p = 2;
        var l = xe;
        xe |= 4;
        try {
          mm(t, e);
          var c = Do,
            m = _f(e.containerInfo),
            v = c.focusedElem,
            b = c.selectionRange;
          if (m !== v && v && v.ownerDocument && gf(v.ownerDocument.documentElement, v)) {
            if (b !== null && lu(v)) {
              var N = b.start,
                O = b.end;
              if ((O === void 0 && (O = N), 'selectionStart' in v))
                ((v.selectionStart = N), (v.selectionEnd = Math.min(O, v.value.length)));
              else {
                var H = v.ownerDocument || document,
                  M = (H && H.defaultView) || window;
                if (M.getSelection) {
                  var R = M.getSelection(),
                    Z = v.textContent.length,
                    te = Math.min(b.start, Z),
                    Ce = b.end === void 0 ? te : Math.min(b.end, Z);
                  !R.extend && te > Ce && ((m = Ce), (Ce = te), (te = m));
                  var A = yf(v, te),
                    S = yf(v, Ce);
                  if (
                    A &&
                    S &&
                    (R.rangeCount !== 1 ||
                      R.anchorNode !== A.node ||
                      R.anchorOffset !== A.offset ||
                      R.focusNode !== S.node ||
                      R.focusOffset !== S.offset)
                  ) {
                    var E = H.createRange();
                    (E.setStart(A.node, A.offset),
                      R.removeAllRanges(),
                      te > Ce
                        ? (R.addRange(E), R.extend(S.node, S.offset))
                        : (E.setEnd(S.node, S.offset), R.addRange(E)));
                  }
                }
              }
            }
            for (H = [], R = v; (R = R.parentNode); )
              R.nodeType === 1 && H.push({ element: R, left: R.scrollLeft, top: R.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < H.length; v++) {
              var B = H[v];
              ((B.element.scrollLeft = B.left), (B.element.scrollTop = B.top));
            }
          }
          ((ds = !!Oo), (Do = Oo = null));
        } finally {
          ((xe = l), ($.p = n), (w.T = a));
        }
      }
      ((e.current = t), (Ie = 2));
    }
  }
  function Dm() {
    if (Ie === 2) {
      Ie = 0;
      var e = Wa,
        t = Al,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = w.T), (w.T = null));
        var n = $.p;
        $.p = 2;
        var l = xe;
        xe |= 4;
        try {
          um(e, t.alternate, t);
        } finally {
          ((xe = l), ($.p = n), (w.T = a));
        }
      }
      Ie = 3;
    }
  }
  function Bm() {
    if (Ie === 4 || Ie === 3) {
      ((Ie = 0), t1());
      var e = Wa,
        t = Al,
        a = Ma,
        n = Sm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ie = 5)
        : ((Ie = 0), (Al = Wa = null), Lm(e, e.pendingLanes));
      var l = e.pendingLanes;
      if (
        (l === 0 && (Ja = null),
        Us(a),
        (t = t.stateNode),
        Nt && typeof Nt.onCommitFiberRoot == 'function')
      )
        try {
          Nt.onCommitFiberRoot(Zl, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = w.T), (l = $.p), ($.p = 2), (w.T = null));
        try {
          for (var c = e.onRecoverableError, m = 0; m < n.length; m++) {
            var v = n[m];
            c(v.value, { componentStack: v.stack });
          }
        } finally {
          ((w.T = t), ($.p = l));
        }
      }
      ((Ma & 3) !== 0 && es(),
        ra(e),
        (l = e.pendingLanes),
        (a & 261930) !== 0 && (l & 42) !== 0 ? (e === bo ? Ei++ : ((Ei = 0), (bo = e))) : (Ei = 0),
        Ni(0));
    }
  }
  function Lm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), si(t)));
  }
  function es() {
    return (Om(), Dm(), Bm(), Hm());
  }
  function Hm() {
    if (Ie !== 5) return !1;
    var e = Wa,
      t = go;
    go = 0;
    var a = Us(Ma),
      n = w.T,
      l = $.p;
    try {
      (($.p = 32 > a ? 32 : a), (w.T = null), (a = _o), (_o = null));
      var c = Wa,
        m = Ma;
      if (((Ie = 0), (Al = Wa = null), (Ma = 0), (xe & 6) !== 0)) throw Error(o(331));
      var v = xe;
      if (
        ((xe |= 4),
        gm(c.current),
        pm(c, c.current, m, a),
        (xe = v),
        Ni(0, !1),
        Nt && typeof Nt.onPostCommitFiberRoot == 'function')
      )
        try {
          Nt.onPostCommitFiberRoot(Zl, c);
        } catch {}
      return !0;
    } finally {
      (($.p = l), (w.T = n), Lm(e, t));
    }
  }
  function qm(e, t, a) {
    ((t = $t(a, t)),
      (t = Fu(e.stateNode, t, 2)),
      (e = ka(e, t, 2)),
      e !== null && (Ql(e, 2), ra(e)));
  }
  function Ae(e, t, a) {
    if (e.tag === 3) qm(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          qm(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Ja === null || !Ja.has(n)))
          ) {
            ((e = $t(a, e)),
              (a = Ud(2)),
              (n = ka(t, a, 2)),
              n !== null && (Gd(a, n, t, e), Ql(n, 2), ra(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function jo(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new Np();
      var l = new Set();
      n.set(t, l);
    } else ((l = n.get(t)), l === void 0 && ((l = new Set()), n.set(t, l)));
    l.has(a) || ((po = !0), l.add(a), (e = wp.bind(null, e, t, a)), t.then(e, e));
  }
  function wp(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Re === e &&
        (me & a) === a &&
        (Ge === 4 || (Ge === 3 && (me & 62914560) === me && 300 > Et() - Kc)
          ? (xe & 2) === 0 && Tl(e, 0)
          : (vo |= a),
        jl === me && (jl = 0)),
      ra(e));
  }
  function Um(e, t) {
    (t === 0 && (t = wr()), (e = xn(e, t)), e !== null && (Ql(e, t), ra(e)));
  }
  function Op(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), Um(e, a));
  }
  function Dp(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode,
          l = e.memoizedState;
        l !== null && (a = l.retryLane);
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
    (n !== null && n.delete(t), Um(e, a));
  }
  function Bp(e, t) {
    return Q(e, t);
  }
  var ts = null,
    Nl = null,
    Ao = !1,
    as = !1,
    To = !1,
    Ia = 0;
  function ra(e) {
    (e !== Nl && e.next === null && (Nl === null ? (ts = Nl = e) : (Nl = Nl.next = e)),
      (as = !0),
      Ao || ((Ao = !0), Hp()));
  }
  function Ni(e, t) {
    if (!To && as) {
      To = !0;
      do
        for (var a = !1, n = ts; n !== null; ) {
          if (e !== 0) {
            var l = n.pendingLanes;
            if (l === 0) var c = 0;
            else {
              var m = n.suspendedLanes,
                v = n.pingedLanes;
              ((c = (1 << (31 - Mt(42 | e) + 1)) - 1),
                (c &= l & ~(m & ~v)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((a = !0), km(n, c));
          } else
            ((c = me),
              (c = cc(
                n,
                n === Re ? c : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (c & 3) === 0 || Xl(n, c) || ((a = !0), km(n, c)));
          n = n.next;
        }
      while (a);
      To = !1;
    }
  }
  function Lp() {
    Gm();
  }
  function Gm() {
    as = Ao = !1;
    var e = 0;
    Ia !== 0 && Qp() && (e = Ia);
    for (var t = Et(), a = null, n = ts; n !== null; ) {
      var l = n.next,
        c = Vm(n, t);
      (c === 0
        ? ((n.next = null), a === null ? (ts = l) : (a.next = l), l === null && (Nl = a))
        : ((a = n), (e !== 0 || (c & 3) !== 0) && (as = !0)),
        (n = l));
    }
    ((Ie !== 0 && Ie !== 5) || Ni(e), Ia !== 0 && (Ia = 0));
  }
  function Vm(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        l = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;
    ) {
      var m = 31 - Mt(c),
        v = 1 << m,
        b = l[m];
      (b === -1
        ? ((v & a) === 0 || (v & n) !== 0) && (l[m] = o1(v, t))
        : b <= t && (e.expiredLanes |= v),
        (c &= ~v));
    }
    if (
      ((t = Re),
      (a = me),
      (a = cc(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (je === 2 || je === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && vn(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Xl(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && vn(n), Us(a))) {
        case 2:
        case 8:
          a = Cr;
          break;
        case 32:
          a = ac;
          break;
        case 268435456:
          a = Rr;
          break;
        default:
          a = ac;
      }
      return (
        (n = $m.bind(null, e)),
        (a = Q(a, n)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      n !== null && n !== null && vn(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function $m(e, t) {
    if (Ie !== 0 && Ie !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (es() && e.callbackNode !== a) return null;
    var n = me;
    return (
      (n = cc(e, e === Re ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (jm(e, n, t),
          Vm(e, Et()),
          e.callbackNode != null && e.callbackNode === a ? $m.bind(null, e) : null)
    );
  }
  function km(e, t) {
    if (es()) return null;
    jm(e, t, !0);
  }
  function Hp() {
    Jp(function () {
      (xe & 6) !== 0 ? Q(zr, Lp) : Gm();
    });
  }
  function Eo() {
    if (Ia === 0) {
      var e = dl;
      (e === 0 && ((e = nc), (nc <<= 1), (nc & 261888) === 0 && (nc = 256)), (Ia = e));
    }
    return Ia;
  }
  function Ym(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : rc('' + e);
  }
  function Zm(e, t) {
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
  function qp(e, t, a, n, l) {
    if (t === 'submit' && a && a.stateNode === l) {
      var c = Ym((l[_t] || null).action),
        m = n.submitter;
      m &&
        ((t = (t = m[_t] || null) ? Ym(t.formAction) : m.getAttribute('formAction')),
        t !== null && ((c = t), (m = null)));
      var v = new hc('action', 'action', null, n, l);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (Ia !== 0) {
                  var b = m ? Zm(l, m) : new FormData(l);
                  Zu(a, { pending: !0, data: b, method: l.method, action: c }, null, b);
                }
              } else
                typeof c == 'function' &&
                  (v.preventDefault(),
                  (b = m ? Zm(l, m) : new FormData(l)),
                  Zu(a, { pending: !0, data: b, method: l.method, action: c }, c, b));
            },
            currentTarget: l,
          },
        ],
      });
    }
  }
  for (var No = 0; No < uu.length; No++) {
    var Mo = uu[No],
      Up = Mo.toLowerCase(),
      Gp = Mo[0].toUpperCase() + Mo.slice(1);
    Ft(Up, 'on' + Gp);
  }
  (Ft(xf, 'onAnimationEnd'),
    Ft(jf, 'onAnimationIteration'),
    Ft(Af, 'onAnimationStart'),
    Ft('dblclick', 'onDoubleClick'),
    Ft('focusin', 'onFocus'),
    Ft('focusout', 'onBlur'),
    Ft(ap, 'onTransitionRun'),
    Ft(np, 'onTransitionStart'),
    Ft(lp, 'onTransitionCancel'),
    Ft(Tf, 'onTransitionEnd'),
    In('onMouseEnter', ['mouseout', 'mouseover']),
    In('onMouseLeave', ['mouseout', 'mouseover']),
    In('onPointerEnter', ['pointerout', 'pointerover']),
    In('onPointerLeave', ['pointerout', 'pointerover']),
    gn('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    gn(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    gn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    gn('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    gn(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    gn(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Mi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Vp = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Mi)
    );
  function Xm(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var n = e[a],
        l = n.event;
      n = n.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var m = n.length - 1; 0 <= m; m--) {
            var v = n[m],
              b = v.instance,
              N = v.currentTarget;
            if (((v = v.listener), b !== c && l.isPropagationStopped())) break e;
            ((c = v), (l.currentTarget = N));
            try {
              c(l);
            } catch (O) {
              yc(O);
            }
            ((l.currentTarget = null), (c = b));
          }
        else
          for (m = 0; m < n.length; m++) {
            if (
              ((v = n[m]),
              (b = v.instance),
              (N = v.currentTarget),
              (v = v.listener),
              b !== c && l.isPropagationStopped())
            )
              break e;
            ((c = v), (l.currentTarget = N));
            try {
              c(l);
            } catch (O) {
              yc(O);
            }
            ((l.currentTarget = null), (c = b));
          }
      }
    }
  }
  function fe(e, t) {
    var a = t[Gs];
    a === void 0 && (a = t[Gs] = new Set());
    var n = e + '__bubble';
    a.has(n) || (Qm(t, e, 2, !1), a.add(n));
  }
  function zo(e, t, a) {
    var n = 0;
    (t && (n |= 4), Qm(a, e, n, t));
  }
  var ns = '_reactListening' + Math.random().toString(36).slice(2);
  function Co(e) {
    if (!e[ns]) {
      ((e[ns] = !0),
        Ur.forEach(function (a) {
          a !== 'selectionchange' && (Vp.has(a) || zo(a, !1, e), zo(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ns] || ((t[ns] = !0), zo('selectionchange', !1, t));
    }
  }
  function Qm(e, t, a, n) {
    switch (xh(t)) {
      case 2:
        var l = pv;
        break;
      case 8:
        l = vv;
        break;
      default:
        l = Zo;
    }
    ((a = l.bind(null, t, a, e)),
      (l = void 0),
      !Js || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (l = !0),
      n
        ? l !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: l })
          : e.addEventListener(t, a, !0)
        : l !== void 0
          ? e.addEventListener(t, a, { passive: l })
          : e.addEventListener(t, a, !1));
  }
  function Ro(e, t, a, n, l) {
    var c = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var m = n.tag;
        if (m === 3 || m === 4) {
          var v = n.stateNode.containerInfo;
          if (v === l) break;
          if (m === 4)
            for (m = n.return; m !== null; ) {
              var b = m.tag;
              if ((b === 3 || b === 4) && m.stateNode.containerInfo === l) return;
              m = m.return;
            }
          for (; v !== null; ) {
            if (((m = Jn(v)), m === null)) return;
            if (((b = m.tag), b === 5 || b === 6 || b === 26 || b === 27)) {
              n = c = m;
              continue e;
            }
            v = v.parentNode;
          }
        }
        n = n.return;
      }
    Fr(function () {
      var N = c,
        O = Qs(a),
        H = [];
      e: {
        var M = Ef.get(e);
        if (M !== void 0) {
          var R = hc,
            Z = e;
          switch (e) {
            case 'keypress':
              if (dc(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              R = D1;
              break;
            case 'focusin':
              ((Z = 'focus'), (R = Ps));
              break;
            case 'focusout':
              ((Z = 'blur'), (R = Ps));
              break;
            case 'beforeblur':
            case 'afterblur':
              R = Ps;
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
              R = ef;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              R = x1;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              R = H1;
              break;
            case xf:
            case jf:
            case Af:
              R = T1;
              break;
            case Tf:
              R = U1;
              break;
            case 'scroll':
            case 'scrollend':
              R = b1;
              break;
            case 'wheel':
              R = V1;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              R = N1;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              R = af;
              break;
            case 'toggle':
            case 'beforetoggle':
              R = k1;
          }
          var te = (t & 4) !== 0,
            Ce = !te && (e === 'scroll' || e === 'scrollend'),
            A = te ? (M !== null ? M + 'Capture' : null) : M;
          te = [];
          for (var S = N, E; S !== null; ) {
            var B = S;
            if (
              ((E = B.stateNode),
              (B = B.tag),
              (B !== 5 && B !== 26 && B !== 27) ||
                E === null ||
                A === null ||
                ((B = Wl(S, A)), B != null && te.push(zi(S, B, E))),
              Ce)
            )
              break;
            S = S.return;
          }
          0 < te.length && ((M = new R(M, Z, null, a, O)), H.push({ event: M, listeners: te }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((M = e === 'mouseover' || e === 'pointerover'),
            (R = e === 'mouseout' || e === 'pointerout'),
            M && a !== Xs && (Z = a.relatedTarget || a.fromElement) && (Jn(Z) || Z[Kn]))
          )
            break e;
          if (
            (R || M) &&
            ((M =
              O.window === O
                ? O
                : (M = O.ownerDocument)
                  ? M.defaultView || M.parentWindow
                  : window),
            R
              ? ((Z = a.relatedTarget || a.toElement),
                (R = N),
                (Z = Z ? Jn(Z) : null),
                Z !== null &&
                  ((Ce = f(Z)), (te = Z.tag), Z !== Ce || (te !== 5 && te !== 27 && te !== 6)) &&
                  (Z = null))
              : ((R = null), (Z = N)),
            R !== Z)
          ) {
            if (
              ((te = ef),
              (B = 'onMouseLeave'),
              (A = 'onMouseEnter'),
              (S = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((te = af), (B = 'onPointerLeave'), (A = 'onPointerEnter'), (S = 'pointer')),
              (Ce = R == null ? M : Jl(R)),
              (E = Z == null ? M : Jl(Z)),
              (M = new te(B, S + 'leave', R, a, O)),
              (M.target = Ce),
              (M.relatedTarget = E),
              (B = null),
              Jn(O) === N &&
                ((te = new te(A, S + 'enter', Z, a, O)),
                (te.target = E),
                (te.relatedTarget = Ce),
                (B = te)),
              (Ce = B),
              R && Z)
            )
              t: {
                for (te = $p, A = R, S = Z, E = 0, B = A; B; B = te(B)) E++;
                B = 0;
                for (var J = S; J; J = te(J)) B++;
                for (; 0 < E - B; ) ((A = te(A)), E--);
                for (; 0 < B - E; ) ((S = te(S)), B--);
                for (; E--; ) {
                  if (A === S || (S !== null && A === S.alternate)) {
                    te = A;
                    break t;
                  }
                  ((A = te(A)), (S = te(S)));
                }
                te = null;
              }
            else te = null;
            (R !== null && Km(H, M, R, te, !1), Z !== null && Ce !== null && Km(H, Ce, Z, te, !0));
          }
        }
        e: {
          if (
            ((M = N ? Jl(N) : window),
            (R = M.nodeName && M.nodeName.toLowerCase()),
            R === 'select' || (R === 'input' && M.type === 'file'))
          )
            var _e = ff;
          else if (of(M))
            if (df) _e = P1;
            else {
              _e = F1;
              var X = W1;
            }
          else
            ((R = M.nodeName),
              !R || R.toLowerCase() !== 'input' || (M.type !== 'checkbox' && M.type !== 'radio')
                ? N && Zs(N.elementType) && (_e = ff)
                : (_e = I1));
          if (_e && (_e = _e(e, N))) {
            rf(H, _e, a, O);
            break e;
          }
          (X && X(e, M, N),
            e === 'focusout' &&
              N &&
              M.type === 'number' &&
              N.memoizedProps.value != null &&
              Ys(M, 'number', M.value));
        }
        switch (((X = N ? Jl(N) : window), e)) {
          case 'focusin':
            (of(X) || X.contentEditable === 'true') && ((ll = X), (iu = N), (li = null));
            break;
          case 'focusout':
            li = iu = ll = null;
            break;
          case 'mousedown':
            cu = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((cu = !1), bf(H, a, O));
            break;
          case 'selectionchange':
            if (tp) break;
          case 'keydown':
          case 'keyup':
            bf(H, a, O);
        }
        var ue;
        if (tu)
          e: {
            switch (e) {
              case 'compositionstart':
                var he = 'onCompositionStart';
                break e;
              case 'compositionend':
                he = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                he = 'onCompositionUpdate';
                break e;
            }
            he = void 0;
          }
        else
          nl
            ? sf(e, a) && (he = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (he = 'onCompositionStart');
        (he &&
          (nf &&
            a.locale !== 'ko' &&
            (nl || he !== 'onCompositionStart'
              ? he === 'onCompositionEnd' && nl && (ue = Ir())
              : ((La = O), (Ws = 'value' in La ? La.value : La.textContent), (nl = !0))),
          (X = ls(N, he)),
          0 < X.length &&
            ((he = new tf(he, e, null, a, O)),
            H.push({ event: he, listeners: X }),
            ue ? (he.data = ue) : ((ue = uf(a)), ue !== null && (he.data = ue)))),
          (ue = Z1 ? X1(e, a) : Q1(e, a)) &&
            ((he = ls(N, 'onBeforeInput')),
            0 < he.length &&
              ((X = new tf('onBeforeInput', 'beforeinput', null, a, O)),
              H.push({ event: X, listeners: he }),
              (X.data = ue))),
          qp(H, e, N, a, O));
      }
      Xm(H, t);
    });
  }
  function zi(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function ls(e, t) {
    for (var a = t + 'Capture', n = []; e !== null; ) {
      var l = e,
        c = l.stateNode;
      if (
        ((l = l.tag),
        (l !== 5 && l !== 26 && l !== 27) ||
          c === null ||
          ((l = Wl(e, a)),
          l != null && n.unshift(zi(e, l, c)),
          (l = Wl(e, t)),
          l != null && n.push(zi(e, l, c))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function $p(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Km(e, t, a, n, l) {
    for (var c = t._reactName, m = []; a !== null && a !== n; ) {
      var v = a,
        b = v.alternate,
        N = v.stateNode;
      if (((v = v.tag), b !== null && b === n)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        N === null ||
        ((b = N),
        l
          ? ((N = Wl(a, c)), N != null && m.unshift(zi(a, N, b)))
          : l || ((N = Wl(a, c)), N != null && m.push(zi(a, N, b)))),
        (a = a.return));
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var kp = /\r\n?/g,
    Yp = /\u0000|\uFFFD/g;
  function Jm(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        kp,
        `
`
      )
      .replace(Yp, '');
  }
  function Wm(e, t) {
    return ((t = Jm(t)), Jm(e) === t);
  }
  function ze(e, t, a, n, l, c) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || el(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && el(e, '' + n);
        break;
      case 'className':
        uc(e, 'class', n);
        break;
      case 'tabIndex':
        uc(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        uc(e, a, n);
        break;
      case 'style':
        Jr(e, n, c);
        break;
      case 'data':
        if (t !== 'object') {
          uc(e, 'data', n);
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
        ((n = rc('' + n)), e.setAttribute(a, n));
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
          typeof c == 'function' &&
            (a === 'formAction'
              ? (t !== 'input' && ze(e, t, 'name', l.name, l, null),
                ze(e, t, 'formEncType', l.formEncType, l, null),
                ze(e, t, 'formMethod', l.formMethod, l, null),
                ze(e, t, 'formTarget', l.formTarget, l, null))
              : (ze(e, t, 'encType', l.encType, l, null),
                ze(e, t, 'method', l.method, l, null),
                ze(e, t, 'target', l.target, l, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = rc('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = ma);
        break;
      case 'onScroll':
        n != null && fe('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && fe('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(o(61));
          if (((a = n.__html), a != null)) {
            if (l.children != null) throw Error(o(60));
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
        ((a = rc('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (fe('beforetoggle', e), fe('toggle', e), sc(e, 'popover', n));
        break;
      case 'xlinkActuate':
        da(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        da(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        da(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        da(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        da(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        da(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        da(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        da(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        da(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        sc(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = g1.get(a) || a), sc(e, a, n));
    }
  }
  function wo(e, t, a, n, l, c) {
    switch (a) {
      case 'style':
        Jr(e, n, c);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(o(61));
          if (((a = n.__html), a != null)) {
            if (l.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? el(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && el(e, '' + n);
        break;
      case 'onScroll':
        n != null && fe('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && fe('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = ma);
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
        if (!Gr.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((l = a.endsWith('Capture')),
              (t = a.slice(2, l ? a.length - 7 : void 0)),
              (c = e[_t] || null),
              (c = c != null ? c[a] : null),
              typeof c == 'function' && e.removeEventListener(t, c, l),
              typeof n == 'function')
            ) {
              (typeof c != 'function' &&
                c !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, n, l));
              break e;
            }
            a in e ? (e[a] = n) : n === !0 ? e.setAttribute(a, '') : sc(e, a, n);
          }
    }
  }
  function ot(e, t, a) {
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
        (fe('error', e), fe('load', e));
        var n = !1,
          l = !1,
          c;
        for (c in a)
          if (a.hasOwnProperty(c)) {
            var m = a[c];
            if (m != null)
              switch (c) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  l = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(o(137, t));
                default:
                  ze(e, t, c, m, a, null);
              }
          }
        (l && ze(e, t, 'srcSet', a.srcSet, a, null), n && ze(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        fe('invalid', e);
        var v = (c = m = l = null),
          b = null,
          N = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var O = a[n];
            if (O != null)
              switch (n) {
                case 'name':
                  l = O;
                  break;
                case 'type':
                  m = O;
                  break;
                case 'checked':
                  b = O;
                  break;
                case 'defaultChecked':
                  N = O;
                  break;
                case 'value':
                  c = O;
                  break;
                case 'defaultValue':
                  v = O;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (O != null) throw Error(o(137, t));
                  break;
                default:
                  ze(e, t, n, O, a, null);
              }
          }
        Zr(e, c, v, b, N, m, l, !1);
        return;
      case 'select':
        (fe('invalid', e), (n = m = c = null));
        for (l in a)
          if (a.hasOwnProperty(l) && ((v = a[l]), v != null))
            switch (l) {
              case 'value':
                c = v;
                break;
              case 'defaultValue':
                m = v;
                break;
              case 'multiple':
                n = v;
              default:
                ze(e, t, l, v, a, null);
            }
        ((t = c),
          (a = m),
          (e.multiple = !!n),
          t != null ? Pn(e, !!n, t, !1) : a != null && Pn(e, !!n, a, !0));
        return;
      case 'textarea':
        (fe('invalid', e), (c = l = n = null));
        for (m in a)
          if (a.hasOwnProperty(m) && ((v = a[m]), v != null))
            switch (m) {
              case 'value':
                n = v;
                break;
              case 'defaultValue':
                l = v;
                break;
              case 'children':
                c = v;
                break;
              case 'dangerouslySetInnerHTML':
                if (v != null) throw Error(o(91));
                break;
              default:
                ze(e, t, m, v, a, null);
            }
        Qr(e, n, l, c);
        return;
      case 'option':
        for (b in a)
          if (a.hasOwnProperty(b) && ((n = a[b]), n != null))
            switch (b) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                ze(e, t, b, n, a, null);
            }
        return;
      case 'dialog':
        (fe('beforetoggle', e), fe('toggle', e), fe('cancel', e), fe('close', e));
        break;
      case 'iframe':
      case 'object':
        fe('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < Mi.length; n++) fe(Mi[n], e);
        break;
      case 'image':
        (fe('error', e), fe('load', e));
        break;
      case 'details':
        fe('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (fe('error', e), fe('load', e));
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
                ze(e, t, N, n, a, null);
            }
        return;
      default:
        if (Zs(t)) {
          for (O in a)
            a.hasOwnProperty(O) && ((n = a[O]), n !== void 0 && wo(e, t, O, n, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((n = a[v]), n != null && ze(e, t, v, n, a, null));
  }
  function Zp(e, t, a, n) {
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
        var l = null,
          c = null,
          m = null,
          v = null,
          b = null,
          N = null,
          O = null;
        for (R in a) {
          var H = a[R];
          if (a.hasOwnProperty(R) && H != null)
            switch (R) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                b = H;
              default:
                n.hasOwnProperty(R) || ze(e, t, R, null, n, H);
            }
        }
        for (var M in n) {
          var R = n[M];
          if (((H = a[M]), n.hasOwnProperty(M) && (R != null || H != null)))
            switch (M) {
              case 'type':
                c = R;
                break;
              case 'name':
                l = R;
                break;
              case 'checked':
                N = R;
                break;
              case 'defaultChecked':
                O = R;
                break;
              case 'value':
                m = R;
                break;
              case 'defaultValue':
                v = R;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (R != null) throw Error(o(137, t));
                break;
              default:
                R !== H && ze(e, t, M, R, n, H);
            }
        }
        ks(e, m, v, b, N, O, c, l);
        return;
      case 'select':
        R = m = v = M = null;
        for (c in a)
          if (((b = a[c]), a.hasOwnProperty(c) && b != null))
            switch (c) {
              case 'value':
                break;
              case 'multiple':
                R = b;
              default:
                n.hasOwnProperty(c) || ze(e, t, c, null, n, b);
            }
        for (l in n)
          if (((c = n[l]), (b = a[l]), n.hasOwnProperty(l) && (c != null || b != null)))
            switch (l) {
              case 'value':
                M = c;
                break;
              case 'defaultValue':
                v = c;
                break;
              case 'multiple':
                m = c;
              default:
                c !== b && ze(e, t, l, c, n, b);
            }
        ((t = v),
          (a = m),
          (n = R),
          M != null
            ? Pn(e, !!a, M, !1)
            : !!n != !!a && (t != null ? Pn(e, !!a, t, !0) : Pn(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        R = M = null;
        for (v in a)
          if (((l = a[v]), a.hasOwnProperty(v) && l != null && !n.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                ze(e, t, v, null, n, l);
            }
        for (m in n)
          if (((l = n[m]), (c = a[m]), n.hasOwnProperty(m) && (l != null || c != null)))
            switch (m) {
              case 'value':
                M = l;
                break;
              case 'defaultValue':
                R = l;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (l != null) throw Error(o(91));
                break;
              default:
                l !== c && ze(e, t, m, l, n, c);
            }
        Xr(e, M, R);
        return;
      case 'option':
        for (var Z in a)
          if (((M = a[Z]), a.hasOwnProperty(Z) && M != null && !n.hasOwnProperty(Z)))
            switch (Z) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                ze(e, t, Z, null, n, M);
            }
        for (b in n)
          if (((M = n[b]), (R = a[b]), n.hasOwnProperty(b) && M !== R && (M != null || R != null)))
            switch (b) {
              case 'selected':
                e.selected = M && typeof M != 'function' && typeof M != 'symbol';
                break;
              default:
                ze(e, t, b, M, n, R);
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
        for (var te in a)
          ((M = a[te]),
            a.hasOwnProperty(te) && M != null && !n.hasOwnProperty(te) && ze(e, t, te, null, n, M));
        for (N in n)
          if (((M = n[N]), (R = a[N]), n.hasOwnProperty(N) && M !== R && (M != null || R != null)))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (M != null) throw Error(o(137, t));
                break;
              default:
                ze(e, t, N, M, n, R);
            }
        return;
      default:
        if (Zs(t)) {
          for (var Ce in a)
            ((M = a[Ce]),
              a.hasOwnProperty(Ce) &&
                M !== void 0 &&
                !n.hasOwnProperty(Ce) &&
                wo(e, t, Ce, void 0, n, M));
          for (O in n)
            ((M = n[O]),
              (R = a[O]),
              !n.hasOwnProperty(O) ||
                M === R ||
                (M === void 0 && R === void 0) ||
                wo(e, t, O, M, n, R));
          return;
        }
    }
    for (var A in a)
      ((M = a[A]),
        a.hasOwnProperty(A) && M != null && !n.hasOwnProperty(A) && ze(e, t, A, null, n, M));
    for (H in n)
      ((M = n[H]),
        (R = a[H]),
        !n.hasOwnProperty(H) || M === R || (M == null && R == null) || ze(e, t, H, M, n, R));
  }
  function Fm(e) {
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
  function Xp() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var l = a[n],
          c = l.transferSize,
          m = l.initiatorType,
          v = l.duration;
        if (c && v && Fm(m)) {
          for (m = 0, v = l.responseEnd, n += 1; n < a.length; n++) {
            var b = a[n],
              N = b.startTime;
            if (N > v) break;
            var O = b.transferSize,
              H = b.initiatorType;
            O && Fm(H) && ((b = b.responseEnd), (m += O * (b < v ? 1 : (v - N) / (b - N))));
          }
          if ((--n, (t += (8 * (c + m)) / (l.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var Oo = null,
    Do = null;
  function is(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Im(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Pm(e, t) {
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
  function Bo(e, t) {
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
  var Lo = null;
  function Qp() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Lo ? !1 : ((Lo = e), !0)) : ((Lo = null), !1);
  }
  var eh = typeof setTimeout == 'function' ? setTimeout : void 0,
    Kp = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    th = typeof Promise == 'function' ? Promise : void 0,
    Jp =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof th < 'u'
          ? function (e) {
              return th.resolve(null).then(e).catch(Wp);
            }
          : eh;
  function Wp(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Pa(e) {
    return e === 'head';
  }
  function ah(e, t) {
    var a = t,
      n = 0;
    do {
      var l = a.nextSibling;
      if ((e.removeChild(a), l && l.nodeType === 8))
        if (((a = l.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (e.removeChild(l), Rl(t));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') Ci(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), Ci(a));
          for (var c = a.firstChild; c; ) {
            var m = c.nextSibling,
              v = c.nodeName;
            (c[Kl] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && c.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(c),
              (c = m));
          }
        } else a === 'body' && Ci(e.ownerDocument.body);
      a = l;
    } while (a);
    Rl(t);
  }
  function nh(e, t) {
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
  function Ho(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Ho(a), Vs(a));
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
  function Fp(e, t, a, n) {
    for (; e.nodeType === 1; ) {
      var l = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Kl])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((c = e.getAttribute('rel')),
                c === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                c !== l.rel ||
                e.getAttribute('href') !== (l.href == null || l.href === '' ? null : l.href) ||
                e.getAttribute('crossorigin') !== (l.crossOrigin == null ? null : l.crossOrigin) ||
                e.getAttribute('title') !== (l.title == null ? null : l.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((c = e.getAttribute('src')),
                (c !== (l.src == null ? null : l.src) ||
                  e.getAttribute('type') !== (l.type == null ? null : l.type) ||
                  e.getAttribute('crossorigin') !==
                    (l.crossOrigin == null ? null : l.crossOrigin)) &&
                  c &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var c = l.name == null ? null : '' + l.name;
        if (l.type === 'hidden' && e.getAttribute('name') === c) return e;
      } else return e;
      if (((e = Qt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Ip(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = Qt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function lh(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Qt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function qo(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function Uo(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function Pp(e, t) {
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
  function Qt(e) {
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
  var Go = null;
  function ih(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '/$' || a === '/&') {
          if (t === 0) return Qt(e.nextSibling);
          t--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function ch(e) {
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
  function sh(e, t, a) {
    switch (((t = is(a)), e)) {
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
  function Ci(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Vs(e);
  }
  var Kt = new Map(),
    uh = new Set();
  function cs(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var za = $.d;
  $.d = { f: ev, r: tv, D: av, C: nv, L: lv, m: iv, X: sv, S: cv, M: uv };
  function ev() {
    var e = za.f(),
      t = Fc();
    return e || t;
  }
  function tv(e) {
    var t = Wn(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Td(t) : za.r(e);
  }
  var Ml = typeof document > 'u' ? null : document;
  function oh(e, t, a) {
    var n = Ml;
    if (n && typeof t == 'string' && t) {
      var l = Gt(t);
      ((l = 'link[rel="' + e + '"][href="' + l + '"]'),
        typeof a == 'string' && (l += '[crossorigin="' + a + '"]'),
        uh.has(l) ||
          (uh.add(l),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(l) === null &&
            ((t = n.createElement('link')), ot(t, 'link', e), at(t), n.head.appendChild(t))));
    }
  }
  function av(e) {
    (za.D(e), oh('dns-prefetch', e, null));
  }
  function nv(e, t) {
    (za.C(e, t), oh('preconnect', e, t));
  }
  function lv(e, t, a) {
    za.L(e, t, a);
    var n = Ml;
    if (n && e && t) {
      var l = 'link[rel="preload"][as="' + Gt(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((l += '[imagesrcset="' + Gt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (l += '[imagesizes="' + Gt(a.imageSizes) + '"]'))
        : (l += '[href="' + Gt(e) + '"]');
      var c = l;
      switch (t) {
        case 'style':
          c = zl(e);
          break;
        case 'script':
          c = Cl(e);
      }
      Kt.has(c) ||
        ((e = j(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        Kt.set(c, e),
        n.querySelector(l) !== null ||
          (t === 'style' && n.querySelector(Ri(c))) ||
          (t === 'script' && n.querySelector(wi(c))) ||
          ((t = n.createElement('link')), ot(t, 'link', e), at(t), n.head.appendChild(t)));
    }
  }
  function iv(e, t) {
    za.m(e, t);
    var a = Ml;
    if (a && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        l = 'link[rel="modulepreload"][as="' + Gt(n) + '"][href="' + Gt(e) + '"]',
        c = l;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          c = Cl(e);
      }
      if (
        !Kt.has(c) &&
        ((e = j({ rel: 'modulepreload', href: e }, t)), Kt.set(c, e), a.querySelector(l) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(wi(c))) return;
        }
        ((n = a.createElement('link')), ot(n, 'link', e), at(n), a.head.appendChild(n));
      }
    }
  }
  function cv(e, t, a) {
    za.S(e, t, a);
    var n = Ml;
    if (n && e) {
      var l = Fn(n).hoistableStyles,
        c = zl(e);
      t = t || 'default';
      var m = l.get(c);
      if (!m) {
        var v = { loading: 0, preload: null };
        if ((m = n.querySelector(Ri(c)))) v.loading = 5;
        else {
          ((e = j({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Kt.get(c)) && Vo(e, a));
          var b = (m = n.createElement('link'));
          (at(b),
            ot(b, 'link', e),
            (b._p = new Promise(function (N, O) {
              ((b.onload = N), (b.onerror = O));
            })),
            b.addEventListener('load', function () {
              v.loading |= 1;
            }),
            b.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            ss(m, t, n));
        }
        ((m = { type: 'stylesheet', instance: m, count: 1, state: v }), l.set(c, m));
      }
    }
  }
  function sv(e, t) {
    za.X(e, t);
    var a = Ml;
    if (a && e) {
      var n = Fn(a).hoistableScripts,
        l = Cl(e),
        c = n.get(l);
      c ||
        ((c = a.querySelector(wi(l))),
        c ||
          ((e = j({ src: e, async: !0 }, t)),
          (t = Kt.get(l)) && $o(e, t),
          (c = a.createElement('script')),
          at(c),
          ot(c, 'link', e),
          a.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(l, c));
    }
  }
  function uv(e, t) {
    za.M(e, t);
    var a = Ml;
    if (a && e) {
      var n = Fn(a).hoistableScripts,
        l = Cl(e),
        c = n.get(l);
      c ||
        ((c = a.querySelector(wi(l))),
        c ||
          ((e = j({ src: e, async: !0, type: 'module' }, t)),
          (t = Kt.get(l)) && $o(e, t),
          (c = a.createElement('script')),
          at(c),
          ot(c, 'link', e),
          a.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(l, c));
    }
  }
  function rh(e, t, a, n) {
    var l = (l = ce.current) ? cs(l) : null;
    if (!l) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = zl(a.href)),
            (a = Fn(l).hoistableStyles),
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
          e = zl(a.href);
          var c = Fn(l).hoistableStyles,
            m = c.get(e);
          if (
            (m ||
              ((l = l.ownerDocument || l),
              (m = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              c.set(e, m),
              (c = l.querySelector(Ri(e))) && !c._p && ((m.instance = c), (m.state.loading = 5)),
              Kt.has(e) ||
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
                Kt.set(e, a),
                c || ov(l, e, a, m.state))),
            t && n === null)
          )
            throw Error(o(528, ''));
          return m;
        }
        if (t && n !== null) throw Error(o(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = Cl(a)),
              (a = Fn(l).hoistableScripts),
              (n = a.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function zl(e) {
    return 'href="' + Gt(e) + '"';
  }
  function Ri(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function fh(e) {
    return j({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function ov(e, t, a, n) {
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
        ot(t, 'link', a),
        at(t),
        e.head.appendChild(t));
  }
  function Cl(e) {
    return '[src="' + Gt(e) + '"]';
  }
  function wi(e) {
    return 'script[async]' + e;
  }
  function dh(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + Gt(a.href) + '"]');
          if (n) return ((t.instance = n), at(n), n);
          var l = j({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            at(n),
            ot(n, 'style', l),
            ss(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          l = zl(a.href);
          var c = e.querySelector(Ri(l));
          if (c) return ((t.state.loading |= 4), (t.instance = c), at(c), c);
          ((n = fh(a)),
            (l = Kt.get(l)) && Vo(n, l),
            (c = (e.ownerDocument || e).createElement('link')),
            at(c));
          var m = c;
          return (
            (m._p = new Promise(function (v, b) {
              ((m.onload = v), (m.onerror = b));
            })),
            ot(c, 'link', n),
            (t.state.loading |= 4),
            ss(c, a.precedence, e),
            (t.instance = c)
          );
        case 'script':
          return (
            (c = Cl(a.src)),
            (l = e.querySelector(wi(c)))
              ? ((t.instance = l), at(l), l)
              : ((n = a),
                (l = Kt.get(c)) && ((n = j({}, a)), $o(n, l)),
                (e = e.ownerDocument || e),
                (l = e.createElement('script')),
                at(l),
                ot(l, 'link', n),
                e.head.appendChild(l),
                (t.instance = l))
          );
        case 'void':
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((n = t.instance), (t.state.loading |= 4), ss(n, a.precedence, e));
    return t.instance;
  }
  function ss(e, t, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        l = n.length ? n[n.length - 1] : null,
        c = l,
        m = 0;
      m < n.length;
      m++
    ) {
      var v = n[m];
      if (v.dataset.precedence === t) c = v;
      else if (c !== l) break;
    }
    c
      ? c.parentNode.insertBefore(e, c.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function Vo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function $o(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var us = null;
  function mh(e, t, a) {
    if (us === null) {
      var n = new Map(),
        l = (us = new Map());
      l.set(a, n);
    } else ((l = us), (n = l.get(a)), n || ((n = new Map()), l.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), l = 0; l < a.length; l++) {
      var c = a[l];
      if (
        !(c[Kl] || c[it] || (e === 'link' && c.getAttribute('rel') === 'stylesheet')) &&
        c.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var m = c.getAttribute(t) || '';
        m = e + m;
        var v = n.get(m);
        v ? v.push(c) : n.set(m, [c]);
      }
    }
    return n;
  }
  function hh(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function rv(e, t, a) {
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
  function ph(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function fv(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var l = zl(n.href),
          c = t.querySelector(Ri(l));
        if (c) {
          ((t = c._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = os.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = c),
            at(c));
          return;
        }
        ((c = t.ownerDocument || t),
          (n = fh(n)),
          (l = Kt.get(l)) && Vo(n, l),
          (c = c.createElement('link')),
          at(c));
        var m = c;
        ((m._p = new Promise(function (v, b) {
          ((m.onload = v), (m.onerror = b));
        })),
          ot(c, 'link', n),
          (a.instance = c));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = os.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var ko = 0;
  function dv(e, t) {
    return (
      e.stylesheets && e.count === 0 && fs(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && fs(e, e.stylesheets), e.unsuspend)) {
                var c = e.unsuspend;
                ((e.unsuspend = null), c());
              }
            }, 6e4 + t);
            0 < e.imgBytes && ko === 0 && (ko = 62500 * Xp());
            var l = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && fs(e, e.stylesheets), e.unsuspend))
                ) {
                  var c = e.unsuspend;
                  ((e.unsuspend = null), c());
                }
              },
              (e.imgBytes > ko ? 50 : 800) + t
            );
            return (
              (e.unsuspend = a),
              function () {
                ((e.unsuspend = null), clearTimeout(n), clearTimeout(l));
              }
            );
          }
        : null
    );
  }
  function os() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) fs(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var rs = null;
  function fs(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (rs = new Map()), t.forEach(mv, e), (rs = null), os.call(e)));
  }
  function mv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = rs.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), rs.set(e, a));
        for (
          var l = e.querySelectorAll('link[data-precedence],style[data-precedence]'), c = 0;
          c < l.length;
          c++
        ) {
          var m = l[c];
          (m.nodeName === 'LINK' || m.getAttribute('media') !== 'not all') &&
            (a.set(m.dataset.precedence, m), (n = m));
        }
        n && a.set(null, n);
      }
      ((l = t.instance),
        (m = l.getAttribute('data-precedence')),
        (c = a.get(m) || n),
        c === n && a.set(null, l),
        a.set(m, l),
        this.count++,
        (n = os.bind(this)),
        l.addEventListener('load', n),
        l.addEventListener('error', n),
        c
          ? c.parentNode.insertBefore(l, c.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(l, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Oi = {
    $$typeof: de,
    Provider: null,
    Consumer: null,
    _currentValue: ee,
    _currentValue2: ee,
    _threadCount: 0,
  };
  function hv(e, t, a, n, l, c, m, v, b) {
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
      (this.expirationTimes = Hs(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Hs(0)),
      (this.hiddenUpdates = Hs(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = l),
      (this.onCaughtError = c),
      (this.onRecoverableError = m),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = b),
      (this.incompleteTransitions = new Map()));
  }
  function vh(e, t, a, n, l, c, m, v, b, N, O, H) {
    return (
      (e = new hv(e, t, a, m, b, N, O, H, v)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = Ct(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = Su()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: n, isDehydrated: a, cache: t }),
      Tu(c),
      e
    );
  }
  function yh(e) {
    return e ? ((e = sl), e) : sl;
  }
  function gh(e, t, a, n, l, c) {
    ((l = yh(l)),
      n.context === null ? (n.context = l) : (n.pendingContext = l),
      (n = $a(t)),
      (n.payload = { element: a }),
      (c = c === void 0 ? null : c),
      c !== null && (n.callback = c),
      (a = ka(e, n, t)),
      a !== null && (Tt(a, e, t), fi(a, e, t)));
  }
  function _h(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Yo(e, t) {
    (_h(e, t), (e = e.alternate) && _h(e, t));
  }
  function bh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = xn(e, 67108864);
      (t !== null && Tt(t, e, 67108864), Yo(e, 67108864));
    }
  }
  function Sh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Bt();
      t = qs(t);
      var a = xn(e, t);
      (a !== null && Tt(a, e, t), Yo(e, t));
    }
  }
  var ds = !0;
  function pv(e, t, a, n) {
    var l = w.T;
    w.T = null;
    var c = $.p;
    try {
      (($.p = 2), Zo(e, t, a, n));
    } finally {
      (($.p = c), (w.T = l));
    }
  }
  function vv(e, t, a, n) {
    var l = w.T;
    w.T = null;
    var c = $.p;
    try {
      (($.p = 8), Zo(e, t, a, n));
    } finally {
      (($.p = c), (w.T = l));
    }
  }
  function Zo(e, t, a, n) {
    if (ds) {
      var l = Xo(n);
      if (l === null) (Ro(e, t, n, ms, a), jh(e, n));
      else if (gv(l, e, t, a, n)) n.stopPropagation();
      else if ((jh(e, n), t & 4 && -1 < yv.indexOf(e))) {
        for (; l !== null; ) {
          var c = Wn(l);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var m = yn(c.pendingLanes);
                  if (m !== 0) {
                    var v = c;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; m; ) {
                      var b = 1 << (31 - Mt(m));
                      ((v.entanglements[1] |= b), (m &= ~b));
                    }
                    (ra(c), (xe & 6) === 0 && ((Jc = Et() + 500), Ni(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = xn(c, 2)), v !== null && Tt(v, c, 2), Fc(), Yo(c, 2));
            }
          if (((c = Xo(n)), c === null && Ro(e, t, n, ms, a), c === l)) break;
          l = c;
        }
        l !== null && n.stopPropagation();
      } else Ro(e, t, n, null, a);
    }
  }
  function Xo(e) {
    return ((e = Qs(e)), Qo(e));
  }
  var ms = null;
  function Qo(e) {
    if (((ms = null), (e = Jn(e)), e !== null)) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = h(t)), e !== null)) return e;
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
    return ((ms = e), null);
  }
  function xh(e) {
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
        switch (a1()) {
          case zr:
            return 2;
          case Cr:
            return 8;
          case ac:
          case n1:
            return 32;
          case Rr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ko = !1,
    en = null,
    tn = null,
    an = null,
    Di = new Map(),
    Bi = new Map(),
    nn = [],
    yv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function jh(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        en = null;
        break;
      case 'dragenter':
      case 'dragleave':
        tn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        an = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Di.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Bi.delete(t.pointerId);
    }
  }
  function Li(e, t, a, n, l, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: c,
          targetContainers: [l],
        }),
        t !== null && ((t = Wn(t)), t !== null && bh(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e);
  }
  function gv(e, t, a, n, l) {
    switch (t) {
      case 'focusin':
        return ((en = Li(en, e, t, a, n, l)), !0);
      case 'dragenter':
        return ((tn = Li(tn, e, t, a, n, l)), !0);
      case 'mouseover':
        return ((an = Li(an, e, t, a, n, l)), !0);
      case 'pointerover':
        var c = l.pointerId;
        return (Di.set(c, Li(Di.get(c) || null, e, t, a, n, l)), !0);
      case 'gotpointercapture':
        return ((c = l.pointerId), Bi.set(c, Li(Bi.get(c) || null, e, t, a, n, l)), !0);
    }
    return !1;
  }
  function Ah(e) {
    var t = Jn(e.target);
    if (t !== null) {
      var a = f(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = h(a)), t !== null)) {
            ((e.blockedOn = t),
              Hr(e.priority, function () {
                Sh(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = p(a)), t !== null)) {
            ((e.blockedOn = t),
              Hr(e.priority, function () {
                Sh(a);
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
  function hs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Xo(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((Xs = n), a.target.dispatchEvent(n), (Xs = null));
      } else return ((t = Wn(a)), t !== null && bh(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function Th(e, t, a) {
    hs(e) && a.delete(t);
  }
  function _v() {
    ((Ko = !1),
      en !== null && hs(en) && (en = null),
      tn !== null && hs(tn) && (tn = null),
      an !== null && hs(an) && (an = null),
      Di.forEach(Th),
      Bi.forEach(Th));
  }
  function ps(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ko || ((Ko = !0), i.unstable_scheduleCallback(i.unstable_NormalPriority, _v)));
  }
  var vs = null;
  function Eh(e) {
    vs !== e &&
      ((vs = e),
      i.unstable_scheduleCallback(i.unstable_NormalPriority, function () {
        vs === e && (vs = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            l = e[t + 2];
          if (typeof n != 'function') {
            if (Qo(n || a) === null) continue;
            break;
          }
          var c = Wn(a);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Zu(c, { pending: !0, data: l, method: a.method, action: n }, n, l));
        }
      }));
  }
  function Rl(e) {
    function t(b) {
      return ps(b, e);
    }
    (en !== null && ps(en, e),
      tn !== null && ps(tn, e),
      an !== null && ps(an, e),
      Di.forEach(t),
      Bi.forEach(t));
    for (var a = 0; a < nn.length; a++) {
      var n = nn[a];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < nn.length && ((a = nn[0]), a.blockedOn === null); )
      (Ah(a), a.blockedOn === null && nn.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var l = a[n],
          c = a[n + 1],
          m = l[_t] || null;
        if (typeof c == 'function') m || Eh(a);
        else if (m) {
          var v = null;
          if (c && c.hasAttribute('formAction')) {
            if (((l = c), (m = c[_t] || null))) v = m.formAction;
            else if (Qo(l) !== null) continue;
          } else v = m.action;
          (typeof v == 'function' ? (a[n + 1] = v) : (a.splice(n, 3), (n -= 3)), Eh(a));
        }
      }
  }
  function Nh() {
    function e(c) {
      c.canIntercept &&
        c.info === 'react-transition' &&
        c.intercept({
          handler: function () {
            return new Promise(function (m) {
              return (l = m);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (l !== null && (l(), (l = null)), n || setTimeout(a, 20));
    }
    function a() {
      if (!n && !navigation.transition) {
        var c = navigation.currentEntry;
        c &&
          c.url != null &&
          navigation.navigate(c.url, {
            state: c.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var n = !1,
        l = null;
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
            l !== null && (l(), (l = null)));
        }
      );
    }
  }
  function Jo(e) {
    this._internalRoot = e;
  }
  ((ys.prototype.render = Jo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var a = t.current,
        n = Bt();
      gh(a, n, e, t, null, null);
    }),
    (ys.prototype.unmount = Jo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (gh(e.current, 2, null, e, null, null), Fc(), (t[Kn] = null));
        }
      }));
  function ys(e) {
    this._internalRoot = e;
  }
  ys.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Lr();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < nn.length && t !== 0 && t < nn[a].priority; a++);
      (nn.splice(a, 0, e), a === 0 && Ah(e));
    }
  };
  var Mh = s.version;
  if (Mh !== '19.2.5') throw Error(o(527, Mh, '19.2.5'));
  $.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return ((e = g(t)), (e = e !== null ? _(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var bv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: w,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var gs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!gs.isDisabled && gs.supportsFiber)
      try {
        ((Zl = gs.inject(bv)), (Nt = gs));
      } catch {}
  }
  return (
    (qi.createRoot = function (e, t) {
      if (!d(e)) throw Error(o(299));
      var a = !1,
        n = '',
        l = Bd,
        c = Ld,
        m = Hd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (l = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (m = t.onRecoverableError)),
        (t = vh(e, 1, !1, null, null, a, n, null, l, c, m, Nh)),
        (e[Kn] = t.current),
        Co(e),
        new Jo(t)
      );
    }),
    (qi.hydrateRoot = function (e, t, a) {
      if (!d(e)) throw Error(o(299));
      var n = !1,
        l = '',
        c = Bd,
        m = Ld,
        v = Hd,
        b = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (l = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (c = a.onUncaughtError),
          a.onCaughtError !== void 0 && (m = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (b = a.formState)),
        (t = vh(e, 1, !0, t, a ?? null, n, l, b, c, m, v, Nh)),
        (t.context = yh(null)),
        (a = t.current),
        (n = Bt()),
        (n = qs(n)),
        (l = $a(n)),
        (l.callback = null),
        ka(a, l, n),
        (a = n),
        (t.current.lanes = a),
        Ql(t, a),
        ra(t),
        (e[Kn] = t.current),
        Co(e),
        new ys(t)
      );
    }),
    (qi.version = '19.2.5'),
    qi
  );
}
var qh;
function Ov() {
  if (qh) return Fo.exports;
  qh = 1;
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (s) {
        console.error(s);
      }
  }
  return (i(), (Fo.exports = wv()), Fo.exports);
}
var Dv = Ov(),
  ne = _r();
const _s = Av(ne),
  Bv = '_content_11wqi_1',
  Lv = { content: Bv },
  Hv = '_tabBar_rhd8d_2',
  qv = '_fullWidth_rhd8d_9',
  Uv = '_tab_rhd8d_2',
  Gv = '_tabActive_rhd8d_54',
  Vv = '_tabDisabled_rhd8d_101',
  $v = '_tabIcon_rhd8d_107',
  kv = '_tabLabel_rhd8d_114',
  Yv = '_badge_rhd8d_119',
  Zv = '_badgeActive_rhd8d_137',
  Xv = '_indicator_rhd8d_158',
  Lt = {
    tabBar: Hv,
    fullWidth: qv,
    tab: Uv,
    'align-start': '_align-start_rhd8d_17',
    'align-center': '_align-center_rhd8d_21',
    'align-end': '_align-end_rhd8d_25',
    'variant-underline': '_variant-underline_rhd8d_32',
    tabActive: Gv,
    'variant-pill': '_variant-pill_rhd8d_64',
    tabDisabled: Vv,
    tabIcon: $v,
    tabLabel: kv,
    badge: Yv,
    badgeActive: Zv,
    'size-sm': '_size-sm_rhd8d_145',
    indicator: Xv,
  },
  Qv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  Kv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Jv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Wv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path>
    <path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path>
  </g>
</svg>
`,
  Fv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect>
  <path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
</svg>
`,
  Iv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse>
  <path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,
  Pv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
  <polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>
</svg>
`,
  ey = { screw: Iv, bolt: Kv, alloy: Qv, laser: Fv, cannon: Jv, thunder: Pv, cutter: Wv };
function ty(i, s) {
  return i.replace(/\swidth="\d+"/, ` width="${s}"`).replace(/\sheight="\d+"/, ` height="${s}"`);
}
function Oe({ name: i, size: s = 16, color: u = 'currentColor', className: o }) {
  const d = ey[i];
  if (d)
    return r.jsx('span', {
      role: 'img',
      'aria-hidden': !0,
      className: o,
      style: { display: 'inline-flex', color: u, lineHeight: 0 },
      dangerouslySetInnerHTML: { __html: ty(d, s) },
    });
  const f = {
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
  switch (i) {
    case 'close':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('line', { x1: '4', y1: '4', x2: '20', y2: '20' }),
          r.jsx('line', { x1: '20', y1: '4', x2: '4', y2: '20' }),
        ],
      });
    case 'menu':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('line', { x1: '3', y1: '7', x2: '21', y2: '7' }),
          r.jsx('line', { x1: '3', y1: '12', x2: '21', y2: '12' }),
          r.jsx('line', { x1: '3', y1: '17', x2: '21', y2: '17' }),
        ],
      });
    case 'settings':
      return r.jsxs('svg', {
        ...f,
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
        ...f,
        children: r.jsx('polygon', {
          points: '12,4 20,20 4,20',
          fill: u,
          stroke: u,
          strokeLinejoin: 'round',
        }),
      });
    case 'shield':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('path', {
          d: 'M12 3 L20 6.5 V12 C20 16.5 16.5 19.5 12 21 C7.5 19.5 4 16.5 4 12 V6.5 Z',
        }),
      });
    case 'heart':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('path', {
          d: 'M12 21 C12 21 4 14.5 4 9 C4 6.2 6.2 4 9 4 C10.4 4 11.7 4.6 12 5.5 C12.3 4.6 13.6 4 15 4 C17.8 4 20 6.2 20 9 C20 14.5 12 21 12 21Z',
        }),
      });
    case 'flame':
      return r.jsxs('svg', {
        ...f,
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
        ...f,
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
        ...f,
        children: r.jsx('polygon', {
          points: '13,3 6,13 11,13 11,21 18,11 13,11',
          fill: u,
          stroke: 'none',
        }),
      });
    case 'skull':
      return r.jsxs('svg', {
        ...f,
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
        ...f,
        children: r.jsx('polygon', {
          points: '12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10',
          fill: u,
          stroke: 'none',
        }),
      });
    case 'target':
      return r.jsxs('svg', {
        ...f,
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
        ...f,
        children: r.jsx('polygon', { points: '6,4 20,12 6,20', fill: u, stroke: 'none' }),
      });
    case 'pause':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('rect', { x: '5', y: '4', width: '5', height: '16', fill: u, stroke: 'none' }),
          r.jsx('rect', { x: '14', y: '4', width: '5', height: '16', fill: u, stroke: 'none' }),
        ],
      });
    case 'chevron-left':
      return r.jsx('svg', { ...f, children: r.jsx('polyline', { points: '15,5 9,12 15,19' }) });
    case 'chevron-right':
      return r.jsx('svg', { ...f, children: r.jsx('polyline', { points: '9,5 15,12 9,19' }) });
    case 'chevron-up':
      return r.jsx('svg', { ...f, children: r.jsx('polyline', { points: '5,15 12,9 19,15' }) });
    case 'chevron-down':
      return r.jsx('svg', { ...f, children: r.jsx('polyline', { points: '5,9 12,15 19,9' }) });
    case 'check':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('polyline', { points: '4,12 9,17 20,6', strokeWidth: '2.5' }),
      });
    case 'plus':
      return r.jsxs('svg', {
        ...f,
        children: [
          r.jsx('line', { x1: '12', y1: '4', x2: '12', y2: '20', strokeWidth: '2.5' }),
          r.jsx('line', { x1: '4', y1: '12', x2: '20', y2: '12', strokeWidth: '2.5' }),
        ],
      });
    case 'minus':
      return r.jsx('svg', {
        ...f,
        children: r.jsx('line', { x1: '4', y1: '12', x2: '20', y2: '12', strokeWidth: '2.5' }),
      });
    case 'info':
      return r.jsxs('svg', {
        ...f,
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
        ...f,
        children: [
          r.jsx('line', { x1: '12', y1: '19', x2: '12', y2: '5', strokeWidth: '2' }),
          r.jsx('polyline', { points: '6,11 12,5 18,11', strokeWidth: '2' }),
        ],
      });
    default:
      return null;
  }
}
function Ns({
  tabs: i,
  value: s,
  onChange: u,
  variant: o = 'underline',
  size: d = 'md',
  fullWidth: f = !1,
  align: h = 'start',
}) {
  const p = ne.useRef(null),
    [y, g] = ne.useState({ left: 0, width: 0 });
  return (
    ne.useEffect(() => {
      const _ = p.current;
      if (!_) return;
      const j = i.findIndex((q) => q.key === s);
      if (j < 0) return;
      const z = _.querySelectorAll('[role="tab"]')[j];
      if (!z) return;
      const C = _.getBoundingClientRect(),
        U = z.getBoundingClientRect();
      g({ left: U.left - C.left, width: U.width });
    }, [s, i]),
    r.jsxs('div', {
      ref: p,
      role: 'tablist',
      className: [
        Lt.tabBar,
        Lt[`variant-${o}`],
        Lt[`size-${d}`],
        Lt[`align-${h}`],
        f ? Lt.fullWidth : '',
      ]
        .filter(Boolean)
        .join(' '),
      children: [
        i.map((_) => {
          const j = _.key === s;
          return r.jsxs(
            'button',
            {
              type: 'button',
              role: 'tab',
              'aria-selected': j,
              disabled: _.disabled === !0,
              className: [Lt.tab, j ? Lt.tabActive : '', _.disabled === !0 ? Lt.tabDisabled : '']
                .filter(Boolean)
                .join(' '),
              onClick: () => {
                _.disabled !== !0 && u(_.key);
              },
              children: [
                _.iconName != null &&
                  r.jsx('span', {
                    className: Lt.tabIcon,
                    'aria-hidden': 'true',
                    children: r.jsx(Oe, { name: _.iconName, size: d === 'sm' ? 12 : 14 }),
                  }),
                r.jsx('span', { className: Lt.tabLabel, children: _.label }),
                _.badge != null &&
                  r.jsx('span', {
                    className: [Lt.badge, j ? Lt.badgeActive : ''].filter(Boolean).join(' '),
                    children: _.badge,
                  }),
              ],
            },
            _.key
          );
        }),
        o === 'underline' &&
          r.jsx('span', {
            className: Lt.indicator,
            'aria-hidden': 'true',
            style: { transform: `translateX(${y.left}px)`, width: y.width },
          }),
      ],
    })
  );
}
const ay = '_shell_ka520_6',
  ny = '_header_ka520_19',
  ly = '_main_ka520_32',
  iy = '_noScroll_ka520_43',
  cy = '_footer_ka520_48',
  sy = '_battle_ka520_61',
  wl = { shell: ay, header: ny, main: ly, noScroll: iy, footer: cy, battle: sy };
function Zn({ header: i, footer: s, children: u, noScroll: o = !1, variant: d = 'default' }) {
  return r.jsxs('div', {
    className: [wl.shell, d === 'battle' ? wl.battle : ''].filter(Boolean).join(' '),
    children: [
      i != null && r.jsx('header', { className: wl.header, children: i }),
      r.jsx('main', {
        className: [wl.main, o ? wl.noScroll : ''].filter(Boolean).join(' '),
        children: u,
      }),
      s != null && r.jsx('footer', { className: wl.footer, children: s }),
    ],
  });
}
const uy = '_nav_4erx0_2',
  oy = '_tab_4erx0_10',
  ry = '_active_4erx0_33',
  fy = '_iconWrap_4erx0_38',
  dy = '_badge_4erx0_51',
  Ui = { nav: uy, tab: oy, active: ry, iconWrap: fy, badge: dy },
  my = '_text_1wy1n_1',
  hy = '_variant_heading_1_1wy1n_6',
  py = '_variant_heading_2_1wy1n_15',
  vy = '_variant_heading_3_1wy1n_24',
  yy = '_variant_body_1wy1n_33',
  gy = '_variant_caption_1wy1n_41',
  _y = '_variant_label_1wy1n_49',
  by = '_variant_numeric_l_1wy1n_58',
  Sy = '_variant_numeric_m_1wy1n_67',
  xy = '_variant_numeric_s_1wy1n_76',
  jy = '_color_default_1wy1n_85',
  Ay = '_color_mid_1wy1n_89',
  Ty = '_color_dim_1wy1n_93',
  Ey = '_color_disabled_1wy1n_97',
  Ny = '_color_primary_1wy1n_101',
  My = '_color_secondary_1wy1n_105',
  zy = '_color_danger_1wy1n_109',
  Cy = '_color_success_1wy1n_113',
  Ry = '_color_warning_1wy1n_117',
  wy = '_truncate_1wy1n_121',
  Oy = '_align_left_1wy1n_128',
  Dy = '_align_center_1wy1n_132',
  By = '_align_right_1wy1n_136',
  Gi = {
    text: my,
    variant_heading_1: hy,
    variant_heading_2: py,
    variant_heading_3: vy,
    variant_body: yy,
    variant_caption: gy,
    variant_label: _y,
    variant_numeric_l: by,
    variant_numeric_m: Sy,
    variant_numeric_s: xy,
    color_default: jy,
    color_mid: Ay,
    color_dim: Ty,
    color_disabled: Ey,
    color_primary: Ny,
    color_secondary: My,
    color_danger: zy,
    color_success: Cy,
    color_warning: Ry,
    truncate: wy,
    align_left: Oy,
    align_center: Dy,
    align_right: By,
  };
function Ly(i) {
  switch (i) {
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
  variant: i = 'body',
  children: s,
  as: u,
  color: o = 'default',
  className: d,
  truncate: f,
  align: h,
  style: p,
}) {
  const y = u ?? Ly(i),
    g = i.replace(/-/g, '_'),
    _ = o === 'text' ? 'default' : o;
  return r.jsx(y, {
    className: [
      Gi.text,
      Gi[`variant_${g}`],
      Gi[`color_${_}`],
      f ? Gi.truncate : '',
      h ? Gi[`align_${h}`] : '',
      d,
    ]
      .filter(Boolean)
      .join(' '),
    style: p,
    children: s,
  });
}
const Hy = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];
function Ii({ active: i, onChange: s, badges: u }) {
  return r.jsx('nav', {
    className: Ui.nav,
    'aria-label': 'メインナビゲーション',
    children: Hy.map(({ key: o, label: d, iconName: f }) => {
      const h = o === i,
        p = u == null ? void 0 : u[o];
      return r.jsxs(
        'button',
        {
          type: 'button',
          className: [Ui.tab, h ? Ui.active : ''].filter(Boolean).join(' '),
          onClick: () => s(o),
          'aria-current': h ? 'page' : void 0,
          'aria-label': d,
          children: [
            r.jsxs('span', {
              className: Ui.iconWrap,
              children: [
                r.jsx(Oe, {
                  name: f,
                  size: 22,
                  color: h ? 'var(--c-primary)' : 'var(--c-text-dim)',
                }),
                p != null &&
                  r.jsx('span', { className: Ui.badge, 'aria-hidden': 'true', children: p }),
              ],
            }),
            r.jsx(V, { variant: 'caption', color: h ? 'primary' : 'dim', children: d }),
          ],
        },
        o
      );
    }),
  });
}
const qy = '_root_kv5uk_2',
  Uy = '_titleRow_kv5uk_8',
  Gy = '_left_kv5uk_17',
  Vy = '_center_kv5uk_24',
  $y = '_right_kv5uk_33',
  ky = '_currencies_kv5uk_42',
  Yy = '_actions_kv5uk_49',
  Zy = '_tabBarSlot_kv5uk_56',
  cn = {
    root: qy,
    titleRow: Uy,
    left: Gy,
    center: Vy,
    right: $y,
    currencies: ky,
    actions: Yy,
    tabBarSlot: Zy,
  },
  Xy = '_root_i843c_2',
  Qy = '_icon_i843c_10',
  Ky = '_delta_i843c_30',
  Jy = '_deltaSm_i843c_37',
  Wy = '_deltaMd_i843c_41',
  Fy = '_deltaLg_i843c_45',
  Iy = '_subtle_i843c_50',
  Py = '_currencyLabel_i843c_55',
  eg = '_rankStamp_i843c_64',
  fa = {
    root: Xy,
    icon: Qy,
    delta: Ky,
    deltaSm: Jy,
    deltaMd: Wy,
    deltaLg: Fy,
    subtle: Iy,
    currencyLabel: Py,
    rankStamp: eg,
  },
  tg = '_root_1wxcz_1',
  ag = '_sizeSm_1wxcz_13',
  ng = '_sizeMd_1wxcz_17',
  lg = '_sizeLg_1wxcz_21',
  ig = '_sizeXl_1wxcz_25',
  cg = '_affix_1wxcz_29',
  Bn = { root: tg, sizeSm: ag, sizeMd: ng, sizeLg: lg, sizeXl: ig, affix: cg };
function fr(i) {
  let s = i.length;
  for (; s > 0 && i[s - 1] === 0; ) s--;
  return i.slice(0, s);
}
function Vi(i) {
  let s = 0;
  for (let u = 0; u < i.length; u++) {
    const o = Math.floor(i[u] + s);
    ((i[u] = o % 1e3), (s = Math.floor(o / 1e3)));
  }
  for (; s > 0; ) (i.push(s % 1e3), (s = Math.floor(s / 1e3)));
  return fr(i);
}
function sg(i, s) {
  for (; s !== 0; ) {
    const u = s;
    ((s = i % s), (i = u));
  }
  return i;
}
function ug(i) {
  const s = i.toString(),
    u = s.indexOf('.');
  if (u === -1) return { num: Math.round(i), den: 1 };
  const o = s.length - u - 1,
    d = Math.pow(10, o),
    f = Math.round(i * d),
    h = sg(Math.abs(f), d);
  return { num: f / h, den: d / h };
}
function og(i) {
  let s = '',
    u = i;
  for (; u > 0; )
    ((u -= 1), (s = String.fromCharCode(65 + (u % 26)) + s), (u = Math.floor(u / 26)));
  return s;
}
const mt = class mt {
  constructor(s) {
    ea(this, 'digits');
    this.digits = s;
  }
  static fromNumber(s) {
    if (s <= 0) return mt.ZERO;
    const u = [];
    let o = Math.floor(s);
    for (; o > 0; ) (u.push(o % 1e3), (o = Math.floor(o / 1e3)));
    return new mt(fr(u));
  }
  static fromString(s) {
    const u = s.trim();
    if (u === '' || u === '0') return mt.ZERO;
    const o = [];
    let d = u.length;
    for (; d > 0; ) {
      const f = Math.max(0, d - 3);
      (o.push(parseInt(u.slice(f, d), 10)), (d = f));
    }
    return new mt(fr(o));
  }
  static fromJSON(s) {
    return new mt(Vi([...s]));
  }
  add(s) {
    const u = this.digits,
      o = s.digits,
      d = Math.max(u.length, o.length),
      f = new Array(d).fill(0);
    let h = 0;
    for (let p = 0; p < d; p++) {
      const y = (u[p] ?? 0) + (o[p] ?? 0) + h;
      ((f[p] = y % 1e3), (h = Math.floor(y / 1e3)));
    }
    return (h > 0 && f.push(h), new mt(Vi(f)));
  }
  sub(s) {
    if (this.compare(s) <= 0) return mt.ZERO;
    const u = this.digits,
      o = s.digits,
      d = new Array(u.length).fill(0);
    let f = 0;
    for (let h = 0; h < u.length; h++) {
      let p = (u[h] ?? 0) - (o[h] ?? 0) - f;
      (p < 0 ? ((p += 1e3), (f = 1)) : (f = 0), (d[h] = p));
    }
    return new mt(Vi(d));
  }
  mulInt(s) {
    if (s <= 0 || this.isZero()) return mt.ZERO;
    const u = this.digits,
      o = new Array(u.length).fill(0);
    let d = 0;
    for (let f = 0; f < u.length; f++) {
      const h = u[f] * s + d;
      ((o[f] = h % 1e3), (d = Math.floor(h / 1e3)));
    }
    for (; d > 0; ) (o.push(d % 1e3), (d = Math.floor(d / 1e3)));
    return new mt(Vi(o));
  }
  divInt(s) {
    if (s <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return mt.ZERO;
    const u = this.digits,
      o = new Array(u.length).fill(0);
    let d = 0;
    for (let f = u.length - 1; f >= 0; f--) {
      const h = d * 1e3 + (u[f] ?? 0);
      ((o[f] = Math.floor(h / s)), (d = h % s));
    }
    return (d > 0 && (o[0] += 1), new mt(Vi(o)));
  }
  mulRational(s, u) {
    return this.mulInt(s).divInt(u);
  }
  mulNumber(s) {
    const { num: u, den: o } = ug(s);
    return this.mulRational(u, o);
  }
  compare(s) {
    const u = this.digits,
      o = s.digits;
    if (u.length !== o.length) return u.length < o.length ? -1 : 1;
    for (let d = u.length - 1; d >= 0; d--) {
      const f = u[d] ?? 0,
        h = o[d] ?? 0;
      if (f < h) return -1;
      if (f > h) return 1;
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
      d = og(o),
      f = this.digits[s - 2] ?? 0,
      h = Math.floor(f / 10);
    return `${u}.${String(h).padStart(2, '0')}${d}`;
  }
};
ea(mt, 'ZERO', new mt([]));
let W = mt;
function rg(i) {
  if (i === '') return 0;
  let s = 0;
  for (let u = 0; u < i.length; u++) s = s * 26 + (i.charCodeAt(u) - 65 + 1);
  return s;
}
function fg(i) {
  if (i <= 0) return { color: 'var(--c-text)', glow: '0 0 6px rgba(232,239,255,0.35)' };
  const s = Math.min(1, (i - 1) / 19),
    u = 195 + s * 100,
    o = 0.86 - s * 0.14,
    d = 0.13 + s * 0.07,
    f = `oklch(${o.toFixed(3)} ${d.toFixed(3)} ${u.toFixed(1)})`,
    h = Math.min(0.95, o + 0.05),
    p = d + 0.05,
    y = `oklch(${h.toFixed(3)} ${p.toFixed(3)} ${u.toFixed(1)} / 0.55)`;
  return { color: f, glow: `0 0 8px ${y}` };
}
function dg(i) {
  switch (i) {
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
function mg(i) {
  switch (i) {
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
function hn({
  value: i,
  size: s = 'md',
  accentColor: u = 'scale',
  glow: o = !1,
  prefix: d,
  suffix: f,
  decimals: h,
  style: p,
}) {
  const y = typeof i == 'number' ? W.fromNumber(i) : i;
  let g;
  h != null && typeof i == 'number' ? (g = i.toFixed(h)) : (g = y.toDisplay());
  const _ = g.match(/^[\d.]+([A-Z]*)$/),
    j = _ ? _[1] : '',
    T = rg(j);
  let z, C;
  if (u === 'scale') {
    const F = fg(T);
    ((z = F.color), (C = o ? F.glow : void 0));
  } else ((z = dg(u)), (C = o ? mg(u) : void 0));
  const U = { sm: Bn.sizeSm, md: Bn.sizeMd, lg: Bn.sizeLg, xl: Bn.sizeXl }[s],
    q = { color: z, ...(C != null ? { textShadow: C } : {}), ...p };
  return r.jsxs('span', {
    className: `${Bn.root} ${U}`,
    style: q,
    children: [
      d != null && r.jsx('span', { className: Bn.affix, children: d }),
      g,
      f != null && r.jsx('span', { className: Bn.affix, children: f }),
    ],
  });
}
const hg = {
    screw: { cssVar: '--c-screw', label: 'screw' },
    bolt: { cssVar: '--c-bolt', label: 'bolt' },
    alloy: { cssVar: '--c-alloy', label: 'alloy' },
  },
  pg = { sm: 12, md: 16, lg: 22, xl: 28 };
function vg({ delta: i, sizeClass: s }) {
  const u = i === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return r.jsx('span', {
    className: `${fa.delta} ${s}`,
    style: { color: u },
    'aria-hidden': 'true',
    children: i,
  });
}
function kl({
  currency: i,
  value: s,
  size: u = 'md',
  delta: o,
  showLabel: d,
  subtle: f,
  align: h = 'start',
  ranked: p,
}) {
  const y = typeof s == 'number' ? W.fromNumber(s) : s,
    g = hg[i],
    _ = f ? 'var(--c-text-disabled)' : `var(${g.cssVar})`,
    j = o && !f ? { color: o === '+' ? 'var(--c-success)' : 'var(--c-danger)' } : { color: _ },
    T = { sm: fa.deltaSm, md: fa.deltaMd, lg: fa.deltaLg, xl: fa.deltaLg }[u],
    z = r.jsx(Oe, { name: i, size: pg[u], color: _, className: fa.icon }),
    C = r.jsxs(r.Fragment, {
      children: [
        o !== void 0 && !f && r.jsx(vg, { delta: o, sizeClass: T }),
        r.jsx(hn, { value: y, size: u, accentColor: 'primary', style: j }),
      ],
    });
  return r.jsxs('span', {
    className: [fa.root, f ? fa.subtle : ''].filter(Boolean).join(' '),
    role: 'img',
    'aria-label': `${g.label} ${y.toDisplay()}`,
    children: [
      h === 'end'
        ? r.jsxs(r.Fragment, { children: [C, z] })
        : r.jsxs(r.Fragment, { children: [z, C] }),
      d && r.jsx('span', { className: fa.currencyLabel, 'aria-hidden': 'true', children: g.label }),
      p !== void 0 &&
        p !== '' &&
        r.jsx('span', {
          className: fa.rankStamp,
          'data-rank': p,
          'aria-label': `rank ${p}`,
          children: p,
        }),
    ],
  });
}
const yg = '_iconButton_1fyi8_1',
  gg = '_round_1fyi8_23',
  _g = '_active_1fyi8_85',
  bg = '_iconWrap_1fyi8_113',
  Ol = {
    iconButton: yg,
    round: gg,
    'variant-primary': '_variant-primary_1fyi8_27',
    'variant-secondary': '_variant-secondary_1fyi8_41',
    'variant-ghost': '_variant-ghost_1fyi8_55',
    'variant-danger': '_variant-danger_1fyi8_71',
    active: _g,
    'size-sm': '_size-sm_1fyi8_98',
    'size-md': '_size-md_1fyi8_103',
    'size-lg': '_size-lg_1fyi8_108',
    iconWrap: bg,
  },
  Sg = { sm: 14, md: 18, lg: 22 };
function Ji({
  icon: i,
  label: s,
  size: u = 'md',
  variant: o = 'ghost',
  shape: d = 'square',
  active: f = !1,
  disabled: h = !1,
  onClick: p,
}) {
  const y = o === 'default' ? 'ghost' : o,
    g = typeof i == 'string' ? r.jsx(Oe, { name: i, size: Sg[u] }) : i;
  return r.jsx('button', {
    type: 'button',
    className: [
      Ol.iconButton,
      Ol[`variant-${y}`],
      Ol[`size-${u}`],
      d === 'round' ? Ol.round : '',
      f ? Ol.active : '',
    ]
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: p,
    'aria-label': s,
    'aria-pressed': f,
    'aria-disabled': h,
    children: r.jsx('span', { className: Ol.iconWrap, 'aria-hidden': 'true', children: g }),
  });
}
const Uh = (i) => {
    let s;
    const u = new Set(),
      o = (g, _) => {
        const j = typeof g == 'function' ? g(s) : g;
        if (!Object.is(j, s)) {
          const T = s;
          ((s = (_ ?? (typeof j != 'object' || j === null)) ? j : Object.assign({}, s, j)),
            u.forEach((z) => z(s, T)));
        }
      },
      d = () => s,
      p = {
        setState: o,
        getState: d,
        getInitialState: () => y,
        subscribe: (g) => (u.add(g), () => u.delete(g)),
      },
      y = (s = i(o, d, p));
    return p;
  },
  xg = (i) => (i ? Uh(i) : Uh),
  jg = (i) => i;
function Ag(i, s = jg) {
  const u = _s.useSyncExternalStore(
    i.subscribe,
    _s.useCallback(() => s(i.getState()), [i, s]),
    _s.useCallback(() => s(i.getInitialState()), [i, s])
  );
  return (_s.useDebugValue(u), u);
}
const Tg = (i) => {
    const s = xg(i),
      u = (o) => Ag(s, o);
    return (Object.assign(u, s), u);
  },
  Eg = (i) => Tg,
  N0 = [
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
function br(i, s) {
  return Math.ceil(i.baseCost * Math.pow(i.costGrowth, s));
}
function $n(i) {
  return 1 + 0.1 * i;
}
function M0(i, s, u) {
  let o = 0;
  for (let d = 0; d < u; d++) o += br(i, s + d);
  return o;
}
function z0(i, s, u) {
  let o = W.ZERO,
    d = 0;
  for (;;) {
    const f = W.fromNumber(br(i, s + d)),
      h = o.add(f);
    if (h.gt(u) || ((o = h), d++, d >= 1e4)) break;
  }
  return { lvDelta: d, totalCost: o };
}
const Gh = {
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
  gameSpeed: 1,
  isPaused: !1,
};
function Ng(i, s, u) {
  return i.lt(s) ? s : i.gt(u) ? u : i;
}
const Mg = (i, s) => ({
    ...Gh,
    startRun: ({ initialWeapon: u, baseMachineMaxHp: o, gameSpeed: d }) => {
      const f = s().runWorkshopLevels.hpMul,
        h = $n(f),
        p = o.mulNumber(h);
      (i({
        isRunActive: !0,
        screw: W.ZERO,
        machineHp: p,
        machineMaxHp: p,
        baseMachineMaxHp: o,
        currentTier: 1,
        currentWave: 1,
        currentWeapon: u,
        weaponSwitchCdSec: 0,
        activeCdSec: 0,
        isAutoActive: !1,
        gameSpeed: d,
        isPaused: !1,
      }),
        s().resetRunWorkshop());
    },
    endRun: () => {
      (i(Gh), s().resetRunWorkshop());
    },
    addScrew: (u) => i((o) => ({ screw: o.screw.add(u) })),
    spendScrew: (u) => {
      const o = s().screw;
      return o.lt(u) ? !1 : (i({ screw: o.sub(u) }), !0);
    },
    setMachineHp: (u) => i((o) => ({ machineHp: Ng(u, W.ZERO, o.machineMaxHp) })),
    damageHp: (u) =>
      i((o) => {
        const d = o.machineHp.sub(u);
        return { machineHp: d.lt(W.ZERO) ? W.ZERO : d };
      }),
    recalcMachineMaxHpFromHpMul: (u) => {
      const o = s(),
        d = o.machineMaxHp,
        f = o.machineHp,
        h = d.sub(f),
        p = h.lt(W.ZERO) ? W.ZERO : h,
        y = o.baseMachineMaxHp.mulNumber($n(u)),
        g = y.sub(p),
        _ = g.lt(W.ZERO) ? W.ZERO : g;
      i({ machineMaxHp: y, machineHp: _ });
    },
    advanceWave: () => i((u) => ({ currentWave: u.currentWave + 1 })),
    advanceTier: () => i((u) => ({ currentTier: u.currentTier + 1, currentWave: 1 })),
    switchWeapon: (u) => i({ currentWeapon: u }),
    setWeaponSwitchCd: (u) => i({ weaponSwitchCdSec: Math.max(0, u) }),
    setActiveCd: (u) => i({ activeCdSec: Math.max(0, u) }),
    setAutoActive: (u) => i({ isAutoActive: u }),
    setPaused: (u) => i({ isPaused: u }),
    setGameSpeed: (u) => i({ gameSpeed: u }),
    triggerActive: (u) => (s().activeCdSec > 0 ? !1 : (i({ activeCdSec: Math.max(0, u) }), !0)),
    tickCooldowns: (u) =>
      i((o) => ({
        weaponSwitchCdSec: Math.max(0, o.weaponSwitchCdSec - u),
        activeCdSec: Math.max(0, o.activeCdSec - u),
      })),
  }),
  zg = { bolt: W.ZERO, alloy: W.ZERO },
  Cg = (i, s) => ({
    ...zg,
    addBolt: (u) => i((o) => ({ bolt: o.bolt.add(u) })),
    spendBolt: (u) => {
      const o = s().bolt;
      return o.lt(u) ? !1 : (i({ bolt: o.sub(u) }), !0);
    },
    addAlloy: (u) => i((o) => ({ alloy: o.alloy.add(u) })),
    spendAlloy: (u) => {
      const o = s().alloy;
      return o.lt(u) ? !1 : (i({ alloy: o.sub(u) }), !0);
    },
    resetCurrencies: () => i({ bolt: W.ZERO, alloy: W.ZERO }),
  }),
  $l = 6,
  Rg = { equippedPatches: new Map() },
  wg = (i, s) => ({
    ...Rg,
    equipPatch: (u, o, d) => {
      const f = s().equippedPatches;
      for (const [h, p] of f) if (p.name === o && h !== u) return !1;
      return (
        i((h) => {
          const p = new Map(h.equippedPatches);
          return (p.set(u, { name: o, tier: d }), { equippedPatches: p });
        }),
        !0
      );
    },
    unequipPatch: (u) => {
      i((o) => {
        const d = new Map(o.equippedPatches);
        return (d.delete(u), { equippedPatches: d });
      });
    },
    clearEquippedPatches: () => i({ equippedPatches: new Map() }),
  }),
  C0 = 'tower-like-game',
  As = 1,
  K = {
    profile: 'profile',
    currencies: 'currencies',
    machine: 'machine',
    weapons: 'weapons',
    patches: 'patches',
    equippedPatches: 'equippedPatches',
    settings: 'settings',
  },
  R0 = [
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
  Og = {
    id: 'singleton',
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    schemaVersion: As,
  },
  Dg = { id: 'singleton', bolt: [], alloy: [] },
  Bg = { id: 'singleton', weaponLv: 0, initialWeapon: 'laser' },
  Lg = {
    id: 'singleton',
    defaultGameSpeed: 1,
    bgmVolume: 0.8,
    seVolume: 0.8,
    vibrationEnabled: !0,
  };
function w0() {
  return Object.fromEntries(R0.map((i) => [i, 0]));
}
const Hg = { machineLevels: w0() },
  qg = (i) => ({
    ...Hg,
    incrementMachineLv: (s) =>
      i((u) => ({ machineLevels: { ...u.machineLevels, [s]: u.machineLevels[s] + 1 } })),
    setMachineLv: (s, u) => i((o) => ({ machineLevels: { ...o.machineLevels, [s]: u } })),
    resetMachine: () => i({ machineLevels: w0() }),
  });
function Vh(i, s) {
  return `${i}#${s}`;
}
const Ug = { patches: new Map() },
  Gg = (i, s) => ({
    ...Ug,
    addPatch: (u, o, d = 1) => {
      const f = Vh(u, o);
      i((h) => {
        const p = new Map(h.patches),
          y = p.get(f);
        return (
          y ? p.set(f, { ...y, count: y.count + d }) : p.set(f, { name: u, tier: o, count: d }),
          { patches: p }
        );
      });
    },
    consumePatch: (u, o, d = 1) => {
      const f = Vh(u, o),
        h = s().patches.get(f);
      return !h || h.count < d
        ? !1
        : (i((p) => {
            const y = new Map(p.patches),
              g = y.get(f);
            if (!g) return {};
            const _ = g.count - d;
            return (_ <= 0 ? y.delete(f) : y.set(f, { ...g, count: _ }), { patches: y });
          }),
          !0);
    },
    pruneEmptyPatches: () => {
      i((u) => {
        const o = new Map(u.patches);
        for (const [d, f] of o) f.count <= 0 && o.delete(d);
        return { patches: o };
      });
    },
    resetPatches: () => i({ patches: new Map() }),
  }),
  $h = {
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
  },
  Vg = (i) => ({
    ...$h,
    updateHighest: (s, u) =>
      i((o) =>
        s > o.highestTier
          ? { highestTier: s, highestWave: u }
          : s === o.highestTier
            ? { highestWave: Math.max(o.highestWave, u) }
            : {}
      ),
    addPlayTimeSec: (s) => i((u) => ({ totalPlayTimeSec: u.totalPlayTimeSec + s })),
    incrementRuns: () => i((s) => ({ totalRuns: s.totalRuns + 1 })),
    addEnemiesKilled: (s) => i((u) => ({ totalEnemiesKilled: u.totalEnemiesKilled + s })),
    setLastPlayedAt: (s) => i({ lastPlayedAt: s }),
    resetProfile: (s) => i({ ...$h, createdAt: s, lastPlayedAt: s }),
  }),
  O0 = { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
  $g = { runWorkshopLevels: O0 },
  kg = (i, s) => ({
    ...$g,
    upgradeRunWorkshop: (u, o) => {
      const d = N0.find((_) => _.key === u);
      if (d == null) return !1;
      const f = s().runWorkshopLevels[u];
      let h, p;
      if (o === 'max') {
        const _ = z0(d, f, s().screw);
        if (_.lvDelta === 0) return !1;
        ((h = _.lvDelta), (p = _.totalCost));
      } else ((h = o), (p = W.fromNumber(M0(d, f, o))));
      if (!s().spendScrew(p)) return !1;
      const g = f + h;
      return (
        i((_) => ({ runWorkshopLevels: { ..._.runWorkshopLevels, [u]: g } })),
        u === 'hpMul' && s().recalcMachineMaxHpFromHpMul(g),
        !0
      );
    },
    resetRunWorkshop: () => i({ runWorkshopLevels: O0 }),
  }),
  kh = { defaultGameSpeed: 1, bgmVolume: 0.8, seVolume: 0.8, vibrationEnabled: !0 },
  Yg = (i) => ({
    ...kh,
    setDefaultGameSpeed: (s) => i({ defaultGameSpeed: s }),
    setBgmVolume: (s) => i({ bgmVolume: Math.max(0, Math.min(1, s)) }),
    setSeVolume: (s) => i({ seVolume: Math.max(0, Math.min(1, s)) }),
    setVibrationEnabled: (s) => i({ vibrationEnabled: s }),
    resetSettings: () => i(kh),
  }),
  Yh = { weaponLv: 0, initialWeapon: 'laser' },
  Zg = (i) => ({
    ...Yh,
    incrementWeaponLv: () => i((s) => ({ weaponLv: s.weaponLv + 1 })),
    setWeaponLv: (s) => i({ weaponLv: s }),
    setInitialWeapon: (s) => i({ initialWeapon: s }),
    resetWeapons: () => i(Yh),
  }),
  k = Eg()((...i) => ({
    ...Vg(...i),
    ...Cg(...i),
    ...qg(...i),
    ...Zg(...i),
    ...Gg(...i),
    ...wg(...i),
    ...Yg(...i),
    ...Mg(...i),
    ...kg(...i),
  }));
function Pi({ title: i, subtitle: s, onBack: u, currencies: o, tabBar: d, actions: f }) {
  const h = k((T) => T.bolt),
    p = k((T) => T.alloy),
    y = k((T) => T.screw),
    g = k((T) => T.isRunActive),
    _ = (o ?? []).filter((T) => (T === 'screw' ? g : !0));
  function j(T) {
    switch (T) {
      case 'bolt':
        return h;
      case 'alloy':
        return p;
      case 'screw':
        return y;
    }
  }
  return r.jsxs('div', {
    className: cn.root,
    children: [
      r.jsxs('div', {
        className: cn.titleRow,
        children: [
          r.jsx('div', {
            className: cn.left,
            children:
              u != null &&
              r.jsx(Ji, {
                icon: 'chevron-left',
                label: '戻る',
                variant: 'ghost',
                size: 'md',
                onClick: u,
              }),
          }),
          r.jsxs('div', {
            className: cn.center,
            children: [
              r.jsx(V, { variant: 'heading-3', truncate: !0, align: 'center', children: i }),
              s != null &&
                r.jsx(V, { variant: 'caption', color: 'dim', align: 'center', children: s }),
            ],
          }),
          r.jsxs('div', {
            className: cn.right,
            children: [
              _.length > 0 &&
                r.jsx('div', {
                  className: cn.currencies,
                  children: _.map((T) => r.jsx(kl, { currency: T, value: j(T), size: 'sm' }, T)),
                }),
              f != null && r.jsx('div', { className: cn.actions, children: f }),
            ],
          }),
        ],
      }),
      d != null && r.jsx('div', { className: cn.tabBarSlot, children: d }),
    ],
  });
}
const Xg = '_tab_1nc83_3',
  Qg = { tab: Xg },
  Kg = '_wrapper_1opqp_3',
  Jg = '_active_1opqp_12',
  Wg = '_card_1opqp_12',
  Fg = '_locked_1opqp_18',
  Ig = '_tall_1opqp_34',
  Pg = '_iconTile_1opqp_37',
  e_ = '_headerText_1opqp_42',
  t_ = '_description_1opqp_45',
  a_ = '_name_1opqp_48',
  n_ = '_wide_1opqp_53',
  l_ = '_body_1opqp_61',
  i_ = '_header_1opqp_42',
  c_ = '_statGrid_1opqp_121',
  s_ = '_statChip_1opqp_129',
  u_ = '_statLabel_1opqp_140',
  o_ = '_statValue_1opqp_147',
  r_ = '_lockedBadge_1opqp_158',
  rt = {
    wrapper: Kg,
    active: Jg,
    card: Wg,
    locked: Fg,
    tall: Ig,
    iconTile: Pg,
    headerText: e_,
    description: t_,
    name: a_,
    wide: n_,
    body: l_,
    header: i_,
    statGrid: c_,
    statChip: s_,
    statLabel: u_,
    statValue: o_,
    lockedBadge: r_,
  },
  f_ = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  };
function D0({
  weapon: i,
  name: s,
  description: u,
  stats: o,
  layout: d = 'tall',
  active: f = !1,
  locked: h = !1,
  onClick: p,
}) {
  const y = d === 'wide',
    g = p != null && !h;
  return r.jsx('div', {
    className: [rt.wrapper, f ? rt.active : '', h ? rt.locked : '', y ? rt.wide : rt.tall]
      .filter(Boolean)
      .join(' '),
    onClick: g ? p : void 0,
    role: g ? 'button' : void 0,
    tabIndex: g ? 0 : void 0,
    onKeyDown: g
      ? (_) => {
          (_.key === 'Enter' || _.key === ' ') && (_.preventDefault(), p());
        }
      : void 0,
    'aria-pressed': p != null ? f : void 0,
    children: r.jsxs('div', {
      className: rt.card,
      style: g ? { cursor: 'pointer' } : void 0,
      children: [
        r.jsx('div', {
          className: rt.iconTile,
          'aria-hidden': !0,
          children: r.jsx(Oe, { name: i, size: y ? 40 : 52 }),
        }),
        r.jsxs('div', {
          className: rt.body,
          children: [
            r.jsx('div', {
              className: rt.header,
              children: r.jsxs('div', {
                className: rt.headerText,
                children: [
                  r.jsx('span', { className: rt.name, children: s }),
                  u != null &&
                    u.length > 0 &&
                    r.jsx('span', { className: rt.description, children: u }),
                ],
              }),
            }),
            !h &&
              o.length > 0 &&
              r.jsx('div', {
                className: rt.statGrid,
                children: o.map((_) => {
                  const j =
                    _.suffix != null
                      ? `${typeof _.value == 'number' ? _.value.toLocaleString() : _.value}${_.suffix}`
                      : typeof _.value == 'number'
                        ? _.value.toLocaleString()
                        : _.value;
                  return r.jsxs(
                    'div',
                    {
                      className: rt.statChip,
                      children: [
                        r.jsx('span', { className: rt.statLabel, children: _.label }),
                        r.jsx('span', {
                          className: rt.statValue,
                          style: _.accent != null ? { color: f_[_.accent] } : void 0,
                          children: j,
                        }),
                      ],
                    },
                    _.label
                  );
                }),
              }),
            h &&
              r.jsxs('div', {
                className: rt.lockedBadge,
                children: [
                  r.jsx(Oe, { name: 'close', size: 14, color: 'var(--c-text-disabled)' }),
                  r.jsx(V, { variant: 'caption', color: 'dim', children: 'LOCKED' }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
function Ms(i) {
  return Math.pow(1.02, i);
}
function zs(i, s) {
  return Math.min(10, i * (1 + 0.03 * s));
}
const Cs = { laser: 120, cannon: 480, thunder: 84, cutter: 62 },
  Rs = { laser: 1, cannon: 0.5, thunder: 0.7, cutter: 2 },
  Sr = { laser: 580, thunder: 420, cannon: 520 };
function d_(i) {
  const s = Math.round(Cs.laser * Ms(i)),
    u = Math.floor(1 + 0.1 * i),
    o = Math.round(zs(Rs.laser, i) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '貫通', value: u },
    { label: '射程', value: Sr.laser, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function m_(i) {
  const s = Math.round(Cs.cannon * Ms(i)),
    u = Math.round((30 + 0.5 * i) * 10) / 10,
    o = Math.round(zs(Rs.cannon, i) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '半径', value: u, suffix: 'm' },
    { label: '射程', value: Sr.cannon, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function h_(i) {
  const s = Math.round(Cs.thunder * Ms(i)),
    u = Math.floor(7 + 0.1 * i),
    o = Math.round(zs(Rs.thunder, i) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '連鎖', value: u },
    { label: '射程', value: Sr.thunder, suffix: 'm' },
    { label: '連射', value: o, suffix: '/s' },
  ];
}
function p_(i) {
  const s = Math.round(Cs.cutter * Ms(i)),
    u = Math.round((80 + 0.5 * i) * 10) / 10,
    o = Math.floor(1 + 0.05 * i),
    d = Math.round(zs(Rs.cutter, i) * 10) / 10;
  return [
    { label: 'DMG', value: s, accent: 'primary' },
    { label: '旋回', value: u, suffix: 'm' },
    { label: '同時', value: o },
    { label: '連射', value: d, suffix: '/s' },
  ];
}
const v_ = [
  { kind: 'laser', name: 'LASER', description: '高速直進ビーム。', buildStats: d_ },
  { kind: 'cannon', name: 'CANNON', description: '範囲爆発。', buildStats: m_ },
  { kind: 'thunder', name: 'THUNDER', description: '連鎖電撃。', buildStats: h_ },
  { kind: 'cutter', name: 'CUTTER', description: '旋回斬撃。', buildStats: p_ },
];
function y_() {
  const i = k((s) => s.weaponLv);
  return r.jsx('div', {
    className: Qg.tab,
    role: 'tabpanel',
    'aria-label': '武器詳細',
    children: v_.map((s) =>
      r.jsx(
        D0,
        {
          weapon: s.kind,
          name: s.name,
          description: s.description,
          stats: s.buildStats(i),
          layout: 'wide',
        },
        s.kind
      )
    ),
  });
}
const g_ = '_tab_1oky8_3',
  __ = '_topRow_1oky8_9',
  b_ = '_description_1oky8_15',
  S_ = '_previewCard_1oky8_21',
  x_ = '_previewLabel_1oky8_25',
  j_ = '_impactGrid_1oky8_32',
  A_ = '_impactRow_1oky8_37',
  T_ = '_impactRowBordered_1oky8_45',
  E_ = '_impactLabel_1oky8_49',
  N_ = '_impactValues_1oky8_55',
  M_ = '_arrow_1oky8_62',
  ta = {
    tab: g_,
    topRow: __,
    description: b_,
    previewCard: S_,
    previewLabel: x_,
    impactGrid: j_,
    impactRow: A_,
    impactRowBordered: T_,
    impactLabel: E_,
    impactValues: N_,
    arrow: M_,
  },
  z_ = '_card_1403j_1',
  C_ = '_interactive_1403j_97',
  $i = {
    card: z_,
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
    interactive: C_,
  };
function Xn({
  children: i,
  variant: s = 'default',
  interactive: u = !1,
  padding: o = 'md',
  radius: d,
  className: f,
}) {
  const h = [
    $i.card,
    $i[`variant-${s}`],
    $i[`padding-${o}`],
    d != null ? $i[`radius-${d}`] : '',
    u ? $i.interactive : '',
    f ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return r.jsx('div', { className: h, children: i });
}
const R_ = '_root_168oy_2',
  w_ = '_header_168oy_15',
  O_ = '_iconWrap_168oy_22',
  D_ = '_title_168oy_34',
  B_ = '_lvBadge_168oy_47',
  L_ = '_description_168oy_60',
  H_ = '_valueRow_168oy_66',
  q_ = '_valueBefore_168oy_74',
  U_ = '_valueAfter_168oy_83',
  G_ = '_arrow_168oy_93',
  V_ = '_buttons_168oy_100',
  $_ = '_btnCol_168oy_105',
  k_ = '_btn_168oy_105',
  Y_ = '_btnPrimary_168oy_132',
  Z_ = '_btnSecondary_168oy_139',
  X_ = '_btnWarning_168oy_146',
  Q_ = '_costRow_168oy_172',
  K_ = '_costNum_168oy_181',
  J_ = '_costDisabled_168oy_190',
  Je = {
    root: R_,
    header: w_,
    iconWrap: O_,
    title: D_,
    lvBadge: B_,
    description: L_,
    valueRow: H_,
    valueBefore: q_,
    valueAfter: U_,
    arrow: G_,
    buttons: V_,
    btnCol: $_,
    btn: k_,
    btnPrimary: Y_,
    btnSecondary: Z_,
    btnWarning: X_,
    costRow: Q_,
    costNum: K_,
    costDisabled: J_,
  },
  W_ = {
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    warning: 'var(--c-warning)',
  },
  F_ = { primary: 'var(--glow-cyan-sm)', secondary: 'var(--glow-purple-sm)', warning: 'none' },
  I_ = { bolt: 'primary', alloy: 'secondary', screw: 'warning' },
  P_ = { primary: Je.btnPrimary, secondary: Je.btnSecondary, warning: Je.btnWarning },
  e2 = {
    primary: 'rgba(78, 228, 246, 0.55)',
    secondary: 'rgba(169, 107, 255, 0.55)',
    warning: 'rgba(246, 185, 74, 0.55)',
  };
function ar(i) {
  return i instanceof W ? i.toDisplay() : i.toLocaleString();
}
function xr({
  title: i,
  description: s,
  iconName: u,
  iconColor: o,
  currentLabel: d,
  before: f,
  after: h,
  beforeSuffix: p = '',
  currency: y = 'bolt',
  accent: g,
  options: _ = [],
  maxed: j = !1,
  onUpgrade: T,
}) {
  const z = g ?? I_[y],
    C = W_[z],
    U = o ?? C,
    q = P_[z],
    F = e2[z];
  return r.jsxs('div', {
    className: Je.root,
    role: 'group',
    'aria-label': i,
    'data-maxed': j,
    children: [
      r.jsxs('div', {
        className: Je.header,
        children: [
          u != null &&
            r.jsx('span', {
              className: Je.iconWrap,
              children: r.jsx(Oe, { name: u, size: 14, color: U }),
            }),
          r.jsx('span', { className: Je.title, children: i }),
          d != null &&
            !j &&
            r.jsx('span', {
              className: Je.lvBadge,
              style: { color: C, boxShadow: F_[z] },
              children: d,
            }),
          j &&
            r.jsx('span', {
              className: Je.lvBadge,
              style: { color: 'var(--c-success)', boxShadow: 'var(--glow-success-md)' },
              children: 'MAX',
            }),
        ],
      }),
      s != null &&
        s.length > 0 &&
        r.jsx(V, { variant: 'caption', color: 'dim', className: Je.description, children: s }),
      f != null &&
        r.jsxs('div', {
          className: Je.valueRow,
          children: [
            r.jsxs('span', { className: Je.valueBefore, children: [ar(f), p] }),
            h != null &&
              !j &&
              r.jsxs(r.Fragment, {
                children: [
                  r.jsx('span', { className: Je.arrow, children: '→' }),
                  r.jsxs('span', {
                    className: Je.valueAfter,
                    style: { color: C, textShadow: `0 0 5px ${F}` },
                    children: [ar(h), p],
                  }),
                ],
              }),
          ],
        }),
      !j &&
        _.length > 0 &&
        r.jsx('div', {
          className: Je.buttons,
          style: { gridTemplateColumns: `repeat(${_.length}, 1fr)` },
          children: _.map((I) => {
            const de = I.disabled === !0;
            return r.jsxs(
              'div',
              {
                className: Je.btnCol,
                children: [
                  r.jsx('button', {
                    type: 'button',
                    className: `${Je.btn} ${q}`,
                    disabled: de,
                    onClick: de ? void 0 : () => (T == null ? void 0 : T(I.amount)),
                    children: I.amount,
                  }),
                  r.jsx('div', {
                    className: Je.costRow,
                    children: r.jsx('span', {
                      className: `${Je.costNum} ${de ? Je.costDisabled : ''}`,
                      children: ar(I.cost),
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
function jr(i) {
  const s = Math.ceil(200 * Math.pow(1.12, i));
  return W.fromNumber(s);
}
function Zh(i, s) {
  let u = W.ZERO;
  for (let o = 0; o < s; o++) u = u.add(jr(i + o));
  return u;
}
function t2(i, s) {
  let u = s,
    o = 0;
  for (;;) {
    const d = jr(i + o);
    if (u.lt(d) || ((u = u.sub(d)), o++, o > 1e4)) break;
  }
  return o;
}
function Xh(i) {
  return Math.pow(1.02, i);
}
const Qh = { laser: 120 };
function a2(i) {
  const s = i + 1,
    u = Xh(i),
    o = Xh(s);
  return [
    { label: 'LASER DMG', before: Math.round(Qh.laser * u), after: Math.round(Qh.laser * o) },
    {
      label: 'CANNON 半径',
      before: Math.round((30 + 0.5 * i) * 10) / 10,
      after: Math.round((30 + 0.5 * s) * 10) / 10,
      suffix: 'm',
    },
    { label: 'THUNDER 連鎖', before: Math.floor(7 + 0.1 * i), after: Math.floor(7 + 0.1 * s) },
    { label: 'CUTTER 同時', before: Math.floor(1 + 0.05 * i), after: Math.floor(1 + 0.05 * s) },
  ];
}
function n2() {
  const i = k((C) => C.weaponLv),
    s = k((C) => C.alloy),
    u = k((C) => C.incrementWeaponLv),
    o = k((C) => C.setWeaponLv),
    d = k((C) => C.spendAlloy),
    f = jr(i),
    h = Zh(i, 5),
    p = t2(i, s),
    y = Zh(i, p),
    g = !s.lt(f),
    _ = p >= 5,
    j = p >= 1,
    T = a2(i);
  function z(C) {
    C === '+1'
      ? d(f) && u()
      : C === '+5'
        ? d(h) && o(i + 5)
        : C === 'MAX' && p > 0 && d(y) && o(i + p);
  }
  return r.jsxs('div', {
    className: ta.tab,
    role: 'tabpanel',
    'aria-label': '武器強化',
    children: [
      r.jsxs('div', {
        className: ta.topRow,
        children: [
          r.jsx(V, {
            variant: 'caption',
            color: 'mid',
            className: ta.description,
            children: '全 4 武器に共通で効く強化です。',
          }),
          r.jsx(kl, { currency: 'alloy', value: s, size: 'sm' }),
        ],
      }),
      r.jsx(xr, {
        title: '武器強化 Lv',
        iconName: 'spark',
        iconColor: 'var(--c-secondary)',
        currentLabel: `Lv ${i}`,
        before: i,
        after: i + 1,
        currency: 'alloy',
        accent: 'secondary',
        options: [
          { amount: '+1', cost: f, disabled: !g },
          { amount: '+5', cost: h, disabled: !_ },
          { amount: 'MAX', cost: y, disabled: !j },
        ],
        onUpgrade: z,
      }),
      r.jsxs(Xn, {
        variant: 'sunken',
        padding: 'md',
        className: ta.previewCard,
        children: [
          r.jsx(V, {
            variant: 'label',
            color: 'dim',
            className: ta.previewLabel,
            children: '次 Lv での効果プレビュー',
          }),
          r.jsx('div', {
            className: ta.impactGrid,
            children: T.map((C, U) =>
              r.jsxs(
                'div',
                {
                  className: [ta.impactRow, U > 0 ? ta.impactRowBordered : '']
                    .filter(Boolean)
                    .join(' '),
                  children: [
                    r.jsx(V, {
                      variant: 'caption',
                      color: 'mid',
                      className: ta.impactLabel,
                      children: C.label,
                    }),
                    r.jsxs('span', {
                      className: ta.impactValues,
                      children: [
                        r.jsx(hn, {
                          value: C.before,
                          size: 'sm',
                          accentColor: 'dim',
                          suffix: C.suffix,
                          decimals: C.suffix === 'm' ? 1 : 0,
                        }),
                        r.jsx('span', { className: ta.arrow, children: '→' }),
                        r.jsx(hn, {
                          value: C.after,
                          size: 'sm',
                          accentColor: 'secondary',
                          suffix: C.suffix,
                          decimals: C.suffix === 'm' ? 1 : 0,
                        }),
                      ],
                    }),
                  ],
                },
                C.label
              )
            ),
          }),
        ],
      }),
    ],
  });
}
const B0 = ne.createContext(null);
function l2({ children: i, initialScreen: s }) {
  const [u, o] = ne.useState(s ?? 'title'),
    d = ne.useCallback((f) => {
      o(f);
    }, []);
  return r.jsx(B0.Provider, { value: { screen: u, navigate: d }, children: i });
}
function pn() {
  const i = ne.useContext(B0);
  if (!i) throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  return i;
}
const i2 = [
  { key: 'details', label: '詳細' },
  { key: 'upgrade', label: '強化' },
];
function c2(i = {}) {
  const { initialTab: s = 'details' } = i,
    [u, o] = ne.useState(s),
    { screen: d, navigate: f } = pn();
  return r.jsx(Zn, {
    header: r.jsx(Pi, {
      title: '武器庫',
      currencies: ['bolt', 'alloy'],
      onBack: () => f('preparation'),
      tabBar: r.jsx(Ns, { tabs: i2, value: u, onChange: o, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(Ii, { active: d, onChange: (h) => f(h) }),
    children: r.jsxs('div', {
      className: Lv.content,
      children: [u === 'details' && r.jsx(y_, {}), u === 'upgrade' && r.jsx(n2, {})],
    }),
  });
}
const s2 = '_root_1ozz7_1',
  u2 = '_battleFooter_1ozz7_10',
  o2 = '_overlayLayer_1ozz7_14',
  nr = { root: s2, battleFooter: u2, overlayLayer: o2 },
  r2 = '_root_1375f_3',
  f2 = '_rangeCircle_1375f_15',
  d2 = '_machine_1375f_27',
  m2 = '_machineRingOuter_1375f_40',
  h2 = '_pin_1375f_50',
  p2 = '_enemy_1375f_60',
  v2 = '_enemyUpper_1375f_71',
  y2 = '_enemyHpBar_1375f_74',
  sn = {
    root: r2,
    rangeCircle: f2,
    machine: d2,
    machineRingOuter: m2,
    pin: h2,
    enemy: p2,
    enemyUpper: v2,
    enemyHpBar: y2,
  },
  g2 = '_root_14p1r_1',
  _2 = { root: g2 };
function b2({ value: i, x: s, y: u, crit: o = !1, duration: d = 800, onDone: f }) {
  const h = ne.useId().replace(/:/g, 'dp'),
    p = `
    @keyframes ${h}-pop {
      0%   { transform: translate(-50%, 0) scale(${o ? 0.6 : 0.8}); opacity: 0; }
      15%  { transform: translate(-50%, -4px) scale(${o ? 1.15 : 1}); opacity: 1; }
      100% { transform: translate(-50%, -28px) scale(${o ? 1 : 0.95}); opacity: 0; }
    }
    .${h} {
      position: absolute;
      left: ${s}%;
      top: ${u}%;
      animation: ${h}-pop ${d}ms var(--ease-out) both;
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
      r.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      r.jsx('div', {
        className: `${h} ${_2.root}`,
        onAnimationEnd: f,
        children: r.jsx(hn, {
          value: i,
          size: o ? 'lg' : 'md',
          accentColor: o ? 'warning' : 'scale',
          glow: !0,
          style: o ? { fontSize: 22, fontWeight: 700 } : { fontSize: 16, fontWeight: 600 },
        }),
      }),
    ],
  });
}
const S2 = '_wrap_14rhu_1',
  x2 = { wrap: S2 },
  Kh = 8;
function j2({ x: i, y: s, color: u = 'var(--c-text-mid)', duration: o = 480, onDone: d }) {
  const f = ne.useId().replace(/:/g, 'ed'),
    p = `
    @keyframes ${f}-flash {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0; }
      30%  { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
    }
    @keyframes ${f}-shard {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)     scale(1);   opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) translateY(-22px) scale(0.3); opacity: 0; }
    }
    .${f}-wrap  { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${f}-flash {
      position: absolute; left: 0; top: 0;
      width: 18px; height: 18px; border-radius: 50%;
      background: radial-gradient(circle, ${u === 'var(--c-text-mid)' ? 'rgba(167,184,216,0.9)' : u}, transparent 65%);
      animation: ${f}-flash ${o}ms var(--ease-out) both;
    }
    .${f}-shard {
      position: absolute; left: 0; top: 0;
      width: 4px; height: 4px;
      background: ${u};
      box-shadow: 0 0 4px ${u};
      animation: ${f}-shard ${o}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${f}-flash, .${f}-shard { animation-duration: 1ms; opacity: 0; }
    }
  `,
    y = Array.from({ length: Kh }, (g, _) =>
      r.jsx('div', { className: `${f}-shard`, style: { '--a': `${(_ * 360) / Kh}deg` } }, _)
    );
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: p } }),
      r.jsxs('div', {
        className: `${f}-wrap ${x2.wrap}`,
        style: { left: `${i}%`, top: `${s}%` },
        onAnimationEnd: d,
        children: [r.jsx('div', { className: `${f}-flash` }), y],
      }),
    ],
  });
}
const A2 = '_wrap_14rhu_1',
  T2 = { wrap: A2 };
function E2({ x: i, y: s, color: u = 'var(--c-primary-hi)', duration: o = 220, onDone: d }) {
  const f = ne.useId().replace(/:/g, 'eh'),
    h = `
    @keyframes ${f}-f {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
    }
    .${f}-w { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${f}-d {
      position: absolute;
      left: 0; top: 0;
      width: 12px; height: 12px;
      border-radius: 50%;
      background: radial-gradient(circle, ${u}, transparent 60%);
      animation: ${f}-f ${o}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${f}-d { animation-duration: 1ms; opacity: 0; }
    }
  `;
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: h } }),
      r.jsx('div', {
        className: `${f}-w ${T2.wrap}`,
        style: { left: `${i}%`, top: `${s}%` },
        onAnimationEnd: d,
        children: r.jsx('div', { className: `${f}-d` }),
      }),
    ],
  });
}
const N2 = '_root_2lc0r_2',
  M2 = '_boss_2lc0r_12',
  z2 = '_elite_2lc0r_16',
  C2 = '_sizeSm_2lc0r_21',
  R2 = '_sizeMd_2lc0r_25',
  w2 = '_sizeLg_2lc0r_29',
  O2 = '_header_2lc0r_35',
  D2 = '_headerRight_2lc0r_42',
  B2 = '_hpText_2lc0r_50',
  wa = {
    root: N2,
    boss: M2,
    elite: z2,
    sizeSm: C2,
    sizeMd: R2,
    sizeLg: w2,
    header: O2,
    headerRight: D2,
    hpText: B2,
  },
  L2 = '_badge_4fy54_1',
  H2 = '_glow_4fy54_90',
  q2 = '_iconLeft_4fy54_118',
  ki = {
    badge: L2,
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
    glow: H2,
    iconLeft: q2,
  };
function Yl({
  text: i,
  variant: s = 'neutral',
  tier: u,
  size: o = 'md',
  glow: d = !1,
  iconLeft: f,
}) {
  let h;
  const p = s === 'default' ? 'neutral' : s;
  if (p === 'tier' && u != null) {
    const g = Math.min(Math.max(1, Math.floor(u)), 12);
    h = { '--badge-color': `var(--c-tier-${Math.min(g, 10)})` };
  } else
    p === 'patch-tier' &&
      u != null &&
      (h = { '--badge-color': `var(--c-patch-t${Math.min(Math.max(1, Math.floor(u)), 5)})` });
  let y = i;
  return (
    y == null &&
      (p === 'tier' && u != null
        ? (y = `T${u}`)
        : p === 'patch-tier' && u != null
          ? (y = `T${u}`)
          : (y = '')),
    r.jsxs('span', {
      className: [ki.badge, ki[`variant-${p}`], ki[`size-${o}`], d ? ki.glow : '']
        .filter(Boolean)
        .join(' '),
      style: h,
      children: [
        f != null && r.jsx('span', { className: ki.iconLeft, 'aria-hidden': 'true', children: f }),
        y,
      ],
    })
  );
}
const U2 = '_root_1pi3d_2',
  G2 = '_sizeSm_1pi3d_11',
  V2 = '_sizeMd_1pi3d_15',
  $2 = '_sizeLg_1pi3d_19',
  k2 = '_fill_1pi3d_23',
  Y2 = '_label_1pi3d_29',
  Z2 = '_withTrailing_1pi3d_46',
  X2 = '_trailingLabel_1pi3d_56',
  un = {
    root: U2,
    sizeSm: G2,
    sizeMd: V2,
    sizeLg: $2,
    fill: k2,
    label: Y2,
    withTrailing: Z2,
    trailingLabel: X2,
  },
  Q2 = {
    hp: 'var(--c-hp)',
    'hp-low': 'var(--c-hp-low)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    shield: 'var(--c-shield)',
    xp: 'var(--c-warning)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
  },
  K2 = {
    hp: 'var(--glow-success-md)',
    'hp-low': 'var(--glow-danger-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    shield: 'var(--glow-cyan-md)',
    xp: '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)',
    primary: 'var(--glow-cyan-md)',
    secondary: 'var(--glow-purple-md)',
  };
function Ts({
  value: i,
  max: s,
  color: u = 'primary',
  size: o = 'md',
  variant: d = 'solid',
  showLabel: f = !1,
  label: h,
  trailingLabel: p,
  glow: y = !1,
  reverse: g = !1,
}) {
  const _ = Math.max(1, s),
    j = Math.min(Math.max(0, i), _),
    T = (j / _) * 100,
    z = Q2[u],
    C = y || d === 'neon' ? K2[u] : void 0,
    U = { sm: un.sizeSm, md: un.sizeMd, lg: un.sizeLg }[o],
    q = {
      width: `${T}%`,
      backgroundColor: z,
      ...(C != null ? { boxShadow: C } : {}),
      ...(g ? { marginLeft: 'auto' } : {}),
    },
    F = h ?? `${j} / ${_}`,
    I = r.jsxs('div', {
      className: `${un.root} ${U}`,
      role: 'progressbar',
      'aria-valuenow': j,
      'aria-valuemin': 0,
      'aria-valuemax': _,
      'aria-label': h ?? `${j} / ${_}`,
      children: [
        r.jsx('div', { className: un.fill, style: q }),
        f && r.jsx('span', { className: un.label, children: F }),
      ],
    });
  return p == null
    ? I
    : r.jsxs('div', {
        className: un.withTrailing,
        children: [I, r.jsx('span', { className: un.trailingLabel, children: p })],
      });
}
function J2(i, s) {
  if (s.isZero()) return 0;
  const u = parseFloat(i.toString()),
    o = parseFloat(s.toString());
  return o === 0 || isNaN(o) ? 0 : Math.min(1e3, Math.max(0, Math.round((u / o) * 1e3)));
}
const W2 = { sm: wa.sizeSm, md: wa.sizeMd, lg: wa.sizeLg };
function F2({
  name: i,
  variant: s,
  current: u,
  max: o,
  tier: d,
  size: f = 'md',
  showValue: h = !0,
  type: p,
  currentHp: y,
  maxHp: g,
}) {
  const _ = s ?? p ?? 'normal',
    j = u ?? y ?? 0,
    T = o ?? g ?? 0,
    z = typeof j == 'number' ? W.fromNumber(j) : j,
    C = typeof T == 'number' ? W.fromNumber(T) : T,
    U = J2(z, C),
    q = U <= 250,
    F = q ? 'hp-low' : 'hp',
    I = f === 'lg' ? 'lg' : f === 'sm' ? 'sm' : 'md';
  let de;
  return (
    _ === 'boss'
      ? (de = { boxShadow: 'var(--glow-danger-md)' })
      : _ === 'elite' && (de = { boxShadow: 'var(--glow-purple-md)' }),
    r.jsxs('div', {
      className: [wa.root, _ === 'boss' ? wa.boss : '', _ === 'elite' ? wa.elite : '', W2[f]]
        .filter(Boolean)
        .join(' '),
      style: de,
      children: [
        r.jsxs('div', {
          className: wa.header,
          children: [
            r.jsx(V, { variant: 'label', color: 'mid', children: i }),
            r.jsxs('div', {
              className: wa.headerRight,
              children: [
                _ === 'normal' &&
                  d !== void 0 &&
                  r.jsxs(V, { variant: 'numeric-s', color: 'dim', children: ['T', d] }),
                (_ === 'elite' || _ === 'boss') &&
                  r.jsx(Yl, { text: _.toUpperCase(), variant: _, glow: _ === 'boss' }),
              ],
            }),
          ],
        }),
        r.jsx(Ts, { value: U, max: 1e3, color: F, size: I, glow: q }),
        h &&
          r.jsx('div', {
            className: wa.hpText,
            children: r.jsxs(V, {
              variant: 'numeric-s',
              color: q ? 'danger' : 'mid',
              children: [z.toDisplay(), ' / ', C.toDisplay()],
            }),
          }),
      ],
    })
  );
}
const I2 = [
  { id: 'p1', x: 30, y: 22, kind: 'normal' },
  { id: 'p2', x: 65, y: 18, kind: 'normal' },
  { id: 'p3', x: 50, y: 30, kind: 'elite' },
  { id: 'p4', x: 78, y: 38, kind: 'normal' },
  { id: 'p5', x: 22, y: 50, kind: 'normal' },
  { id: 'p6', x: 60, y: 72, kind: 'boss' },
];
function P2(i) {
  switch (i) {
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
function eb(i) {
  return i !== 'normal';
}
function tb(i) {
  return i === 'boss' ? 'boss' : i === 'elite' || i === 'miniboss' ? 'elite' : 'normal';
}
function ab(i) {
  switch (i) {
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
function Jh(i) {
  switch (i) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}
function nb({
  enemies: i,
  machinePosition: s = { x: 50, y: 50 },
  damageEvents: u,
  hitEvents: o,
  deathEvents: d,
  onDamageDone: f,
  onHitDone: h,
  onDeathDone: p,
  range: y,
  dummyPins: g = I2,
}) {
  const _ = s.x,
    j = s.y,
    T = y * 2;
  return r.jsxs('div', {
    className: sn.root,
    role: 'img',
    'aria-label': 'バトルフィールド',
    children: [
      r.jsx('div', {
        className: sn.rangeCircle,
        style: { left: `${_}%`, top: `${j}%`, width: `${T}%` },
        'aria-hidden': !0,
      }),
      g.map((z) =>
        r.jsx(
          'div',
          {
            className: sn.pin,
            style: { left: `${z.x}%`, top: `${z.y}%`, color: Jh(z.kind) },
            'aria-hidden': !0,
            children: r.jsx(Oe, {
              name: 'target',
              size: z.kind === 'boss' ? 18 : z.kind === 'elite' ? 16 : 14,
              color: Jh(z.kind),
            }),
          },
          z.id
        )
      ),
      i.map((z) => {
        const C = eb(z.kind),
          U = ab(z.kind),
          q = z.kind === 'boss' ? 32 : z.kind === 'miniboss' ? 28 : 22;
        return r.jsxs(
          'div',
          {
            className: [sn.enemy, C ? sn.enemyUpper : ''].filter(Boolean).join(' '),
            style: { left: `${z.position.x}%`, top: `${z.position.y}%` },
            'aria-label': `${z.kind}`,
            children: [
              r.jsx(Oe, { name: P2(z.kind), size: q, color: U }),
              C &&
                r.jsx('div', {
                  className: sn.enemyHpBar,
                  children: r.jsx(F2, {
                    name: z.kind,
                    variant: tb(z.kind),
                    current: z.hp,
                    max: z.hp,
                    size: z.kind === 'boss' ? 'lg' : 'sm',
                    showValue: !1,
                  }),
                }),
            ],
          },
          z.id
        );
      }),
      r.jsxs('div', {
        className: sn.machine,
        style: { left: `${_}%`, top: `${j}%` },
        'aria-label': 'マシン',
        children: [
          r.jsx('span', { className: sn.machineRingOuter, 'aria-hidden': !0 }),
          r.jsx(Oe, { name: 'tower', size: 22, color: 'var(--c-primary)' }),
        ],
      }),
      u.map((z) =>
        r.jsx(
          b2,
          {
            value: Number(z.value.toString()),
            x: z.x,
            y: z.y,
            crit: z.crit,
            onDone: () => (f == null ? void 0 : f(z.id)),
          },
          z.id
        )
      ),
      o.map((z) =>
        r.jsx(E2, { x: z.x, y: z.y, onDone: () => (h == null ? void 0 : h(z.id)) }, z.id)
      ),
      d.map((z) =>
        r.jsx(j2, { x: z.x, y: z.y, onDone: () => (p == null ? void 0 : p(z.id)) }, z.id)
      ),
    ],
  });
}
const lb = '_root_1oybt_2',
  ib = '_topRow_1oybt_13',
  cb = '_weaponSlots_1oybt_21',
  sb = '_activeArea_1oybt_29',
  ub = '_activeButton_1oybt_37',
  ob = '_activeDisabled_1oybt_57',
  rb = '_modeToggle_1oybt_66',
  fb = '_modeToggleOn_1oybt_89',
  db = '_sheetToggleButton_1oybt_96',
  mb = '_bottomRow_1oybt_108',
  hb = '_currencyArea_1oybt_114',
  pb = '_speedArea_1oybt_119',
  vb = '_sysButtons_1oybt_126',
  Ht = {
    root: lb,
    topRow: ib,
    weaponSlots: cb,
    activeArea: sb,
    activeButton: ub,
    activeDisabled: ob,
    modeToggle: rb,
    modeToggleOn: fb,
    sheetToggleButton: db,
    bottomRow: mb,
    currencyArea: hb,
    speedArea: pb,
    sysButtons: vb,
  },
  yb = '_root_x9cjr_1',
  gb = '_svg_x9cjr_9',
  _b = '_track_x9cjr_15',
  bb = '_arc_x9cjr_19',
  Sb = '_center_x9cjr_28',
  xb = '_labelText_x9cjr_37',
  Dl = { root: yb, svg: gb, track: _b, arc: bb, center: Sb, labelText: xb },
  jb = { xs: 20, sm: 32, md: 48, lg: 64 },
  Ab = {
    hp: 'var(--c-hp)',
    cd: 'var(--c-cd)',
    wave: 'var(--c-wave)',
    primary: 'var(--c-primary)',
    warning: 'var(--c-warning)',
  },
  Tb = {
    hp: 'var(--glow-success-md)',
    cd: 'var(--glow-cyan-md)',
    wave: 'var(--glow-purple-md)',
    primary: 'var(--glow-cyan-md)',
    warning: '0 0 12px rgba(246,185,74,0.55)',
  };
function L0({
  value: i,
  max: s,
  size: u = 24,
  color: o = 'primary',
  thickness: d = 3,
  glow: f = !1,
  showLabel: h = !1,
  withLabel: p = !1,
  label: y,
  children: g,
}) {
  const _ = typeof u == 'number' ? u : jb[u],
    j =
      s != null
        ? Math.min(Math.max(0, i), Math.max(1, s)) / Math.max(1, s)
        : Math.min(Math.max(0, i), 100) / 100,
    T = s != null ? Math.min(Math.max(0, i), Math.max(1, s)) : i,
    z = s != null ? Math.max(1, s) : 100,
    C = Ab[o],
    U = f ? Tb[o] : void 0,
    q = _ / 2,
    F = q - d / 2,
    I = 2 * Math.PI * F,
    de = I * (1 - j),
    et = h || p || g != null,
    qe = y ?? `${Math.round(j * 100)}%`;
  return r.jsxs('span', {
    className: Dl.root,
    style: { width: _, height: _ },
    children: [
      r.jsxs('svg', {
        className: Dl.svg,
        width: _,
        height: _,
        viewBox: `0 0 ${_} ${_}`,
        xmlns: 'http://www.w3.org/2000/svg',
        role: 'progressbar',
        'aria-valuenow': T,
        'aria-valuemin': 0,
        'aria-valuemax': z,
        'aria-label': y ?? `${T} / ${z}`,
        children: [
          r.jsx('circle', {
            className: Dl.track,
            cx: q,
            cy: q,
            r: F,
            fill: 'none',
            strokeWidth: d,
          }),
          r.jsx('circle', {
            className: Dl.arc,
            cx: q,
            cy: q,
            r: F,
            fill: 'none',
            stroke: C,
            strokeWidth: d,
            strokeLinecap: 'round',
            strokeDasharray: I,
            strokeDashoffset: de,
            style: U != null ? { filter: `drop-shadow(0 0 4px ${C})` } : void 0,
            transform: `rotate(-90 ${q} ${q})`,
          }),
        ],
      }),
      et &&
        r.jsx('span', {
          className: Dl.center,
          children:
            g ?? r.jsx('span', { className: Dl.labelText, style: { color: C }, children: qe }),
        }),
    ],
  });
}
const Eb = '_root_8pbri_1',
  Nb = '_disabled_8pbri_8',
  Mb = '_segment_8pbri_13',
  zb = '_selected_8pbri_27',
  Cb = '_unselected_8pbri_33',
  Bl = {
    root: Eb,
    disabled: Nb,
    segment: Mb,
    selected: zb,
    unselected: Cb,
    'size-sm': '_size-sm_8pbri_42',
    'size-md': '_size-md_8pbri_47',
  },
  H0 = ({ options: i, value: s, onChange: u, size: o = 'md', disabled: d = !1 }) =>
    r.jsx('div', {
      className: [Bl.root, Bl[`size-${o}`], d ? Bl.disabled : ''].join(' '),
      role: 'group',
      children: i.map((f) => {
        const h = f.value === s;
        return r.jsx(
          'button',
          {
            type: 'button',
            role: 'radio',
            'aria-checked': h,
            className: [Bl.segment, h ? Bl.selected : Bl.unselected].join(' '),
            onClick: () => {
              d || u(f.value);
            },
            disabled: d,
            children: f.label,
          },
          String(f.value)
        );
      }),
    }),
  Rb = '_root_afe45_2',
  wb = '_swapDisabled_afe45_14',
  Ob = '_active_afe45_20',
  Db = '_onCd_afe45_27',
  Bb = '_iconWrap_afe45_27',
  Lb = '_cdOverlay_afe45_47',
  Hb = '_cdProgress_afe45_57',
  qb = '_swapOverlay_afe45_68',
  on = {
    root: Rb,
    swapDisabled: wb,
    active: Ob,
    onCd: Db,
    iconWrap: Bb,
    cdOverlay: Lb,
    cdProgress: Hb,
    swapOverlay: qb,
  },
  Ub = { sm: 40, md: 52, lg: 64 },
  Gb = { sm: 18, md: 24, lg: 30 };
function Vb({
  weapon: i,
  active: s = !1,
  ready: u = !1,
  cdProgress: o = 100,
  swapDisabled: d = !1,
  size: f = 'md',
  onClick: h,
}) {
  const p = Ub[f],
    y = Gb[f],
    g = o < 100,
    _ = [on.root, s ? on.active : '', g ? on.onCd : '', d ? on.swapDisabled : '']
      .filter(Boolean)
      .join(' ');
  return r.jsxs('button', {
    type: 'button',
    className: _,
    style: { width: p, height: p, minWidth: p, minHeight: p },
    onClick: d ? void 0 : h,
    disabled: d && h == null,
    'aria-label': `${i} weapon slot${s ? ' (active)' : ''}${g ? ` (cooldown ${o}%)` : u ? ' (ready)' : ''}`,
    'aria-pressed': s,
    children: [
      r.jsx('span', {
        className: on.iconWrap,
        children: r.jsx(Oe, {
          name: i,
          size: y,
          color: s ? 'var(--c-primary)' : 'var(--c-text-mid)',
        }),
      }),
      g &&
        r.jsxs(r.Fragment, {
          children: [
            r.jsx('span', { className: on.cdOverlay, 'aria-hidden': 'true' }),
            r.jsx('span', {
              className: on.cdProgress,
              'aria-hidden': 'true',
              children: r.jsx(L0, {
                value: o,
                max: 100,
                size: p - 4,
                color: 'cd',
                thickness: f === 'sm' ? 2 : 3,
              }),
            }),
          ],
        }),
      d && r.jsx('span', { className: on.swapOverlay, 'aria-hidden': 'true' }),
    ],
  });
}
const Wh = ['laser', 'cannon', 'thunder', 'cutter'],
  $b = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
  ];
function kb({
  screw: i,
  equippedWeapon: s,
  weaponCds: u,
  activeCd: o,
  activeMax: d,
  isAutoActive: f,
  onSwitchWeapon: h,
  onActivate: p,
  onToggleAuto: y,
  gameSpeed: g,
  onSpeedChange: _,
  isPaused: j,
  onTogglePause: T,
  onOpenMenu: z,
  onOpenScreenSaver: C,
  isWorkshopOpen: U = !1,
  onToggleWorkshop: q,
}) {
  const F = o > 0,
    I = f || F,
    de = Wh.some((Se) => Se !== s && (u[Se] ?? 100) < 100);
  return r.jsxs('div', {
    className: Ht.root,
    children: [
      q != null &&
        r.jsx('button', {
          type: 'button',
          className: Ht.sheetToggleButton,
          onClick: q,
          'aria-expanded': U,
          'aria-label': U ? 'アップグレードを閉じる' : 'アップグレードを開く',
          children: r.jsx(Yl, { text: 'アップグレード', variant: 'info', size: 'md', glow: !0 }),
        }),
      r.jsxs('div', {
        className: Ht.topRow,
        children: [
          r.jsx('div', {
            className: Ht.weaponSlots,
            children: Wh.map((Se) =>
              r.jsx(
                Vb,
                {
                  weapon: Se,
                  active: Se === s,
                  cdProgress: u[Se] ?? 100,
                  swapDisabled: de && Se !== s,
                  size: 'md',
                  onClick: () => {
                    h(Se);
                  },
                },
                Se
              )
            ),
          }),
          r.jsxs('div', {
            className: Ht.activeArea,
            children: [
              r.jsx('button', {
                type: 'button',
                className: [Ht.activeButton, I ? Ht.activeDisabled : ''].filter(Boolean).join(' '),
                onClick: I ? void 0 : p,
                disabled: I,
                'aria-label': `アクティブスキル発動${F ? ' (クールダウン中)' : f ? ' (自動モード)' : ''}`,
                children: r.jsx(L0, {
                  value: F ? o : d,
                  max: d > 0 ? d : 1,
                  size: 64,
                  color: F ? 'cd' : 'primary',
                  glow: !F && !f,
                  thickness: 4,
                  children: r.jsx(Oe, {
                    name: 'lightning',
                    size: 26,
                    color: I ? 'var(--c-text-disabled)' : 'var(--c-secondary)',
                  }),
                }),
              }),
              r.jsx('button', {
                type: 'button',
                className: [Ht.modeToggle, f ? Ht.modeToggleOn : ''].filter(Boolean).join(' '),
                onClick: () => y(!f),
                'aria-pressed': f,
                'aria-label': f
                  ? 'アクティブスキルを手動モードに切り替え'
                  : 'アクティブスキルを自動モードに切り替え',
                children: f ? 'AUTO' : 'MANUAL',
              }),
            ],
          }),
        ],
      }),
      r.jsxs('div', {
        className: Ht.bottomRow,
        children: [
          r.jsx('div', {
            className: Ht.currencyArea,
            children: r.jsx(kl, { currency: 'screw', value: i, size: 'lg' }),
          }),
          r.jsx('div', {
            className: Ht.speedArea,
            children: r.jsx(H0, { options: $b, value: g, onChange: _, size: 'sm' }),
          }),
          r.jsxs('div', {
            className: Ht.sysButtons,
            children: [
              r.jsx(Ji, {
                icon: j ? 'play' : 'pause',
                label: j ? '再開' : '一時停止',
                size: 'md',
                variant: 'ghost',
                active: j,
                onClick: T,
              }),
              r.jsx(Ji, {
                icon: 'menu',
                label: 'メニューを開く',
                size: 'md',
                variant: 'ghost',
                onClick: z,
              }),
              r.jsx(Ji, {
                icon: 'ice',
                label: 'スクリーンセーバーを起動',
                size: 'md',
                variant: 'ghost',
                onClick: C,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const Yb = '_root_1y4n6_3',
  Zb = '_headerRow_1y4n6_13',
  Xb = '_hpValue_1y4n6_21',
  Qb = '_hpDivider_1y4n6_31',
  Kb = '_shieldBlock_1y4n6_36',
  Jb = '_srOnly_1y4n6_44',
  Ll = { root: Yb, headerRow: Zb, hpValue: Xb, hpDivider: Qb, shieldBlock: Kb, srOnly: Jb },
  Wb = '_root_1r2fw_2',
  Fb = '_boss_1r2fw_10',
  Ib = '_header_1r2fw_16',
  Pb = '_milestone_1r2fw_23',
  eS = '_milestoneText_1r2fw_30',
  tS = '_seconds_1r2fw_40',
  aS = '_waveLabel_1r2fw_50',
  Ln = {
    root: Wb,
    boss: Fb,
    header: Ib,
    milestone: Pb,
    milestoneText: eS,
    seconds: tS,
    'size-sm': '_size-sm_1r2fw_46',
    waveLabel: aS,
    'size-md': '_size-md_1r2fw_54',
    'size-lg': '_size-lg_1r2fw_58',
  },
  nS = {
    elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
    boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
    'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
  };
function lS({
  waveNumber: i,
  secondsLeft: s,
  secondsMax: u,
  nextMilestone: o,
  showSeconds: d = !0,
  size: f = 'md',
}) {
  const h = (o == null ? void 0 : o.kind) === 'boss',
    p = o != null ? nS[o.kind] : null;
  return r.jsxs('div', {
    className: [Ln.root, Ln[`size-${f}`], h ? Ln.boss : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Ln.header,
        children: [
          r.jsx(Yl, { text: `WAVE ${i}`, variant: 'tier' }),
          p != null &&
            o != null &&
            r.jsxs('span', {
              className: Ln.milestone,
              style: { color: p.color },
              children: [
                r.jsx(Oe, { name: p.iconName, size: 12, color: p.color }),
                r.jsxs('span', { className: Ln.milestoneText, children: [p.label, ' @', o.wave] }),
              ],
            }),
          d &&
            r.jsx('span', {
              className: Ln.seconds,
              children: r.jsxs(V, { variant: 'numeric-s', color: 'mid', children: [s, 's'] }),
            }),
        ],
      }),
      r.jsx(Ts, {
        value: s,
        max: Math.max(1, u),
        color: h ? 'secondary' : 'wave',
        size: f === 'lg' ? 'md' : 'sm',
        glow: h,
      }),
    ],
  });
}
function iS({
  hpCurrent: i,
  hpMax: s,
  shieldCurrent: u,
  shieldMax: o,
  tier: d,
  wave: f,
  totalWaves: h,
  secondsRemaining: p,
  secondsTotal: y,
  isBossWave: g = !1,
  nextMilestone: _,
  damaging: j = !1,
}) {
  const T = _ ?? (g ? { wave: f, kind: 'boss' } : void 0),
    z = u != null && o != null,
    C = Fh(i, s),
    U = z ? Fh(u, o) : 0;
  return r.jsxs('div', {
    className: Ll.root,
    role: 'group',
    'aria-label': 'バトル状態',
    children: [
      r.jsxs('div', {
        className: Ll.headerRow,
        children: [
          r.jsx(Yl, { variant: 'tier', tier: d, size: 'md', glow: !0 }),
          r.jsx(V, { variant: 'label', color: 'dim', style: { fontSize: 10 }, children: 'HP' }),
          r.jsxs('span', {
            className: Ll.hpValue,
            'aria-label': `HP ${i.toDisplay()} / ${s.toDisplay()}`,
            children: [
              r.jsx(hn, {
                value: i,
                size: 'sm',
                accentColor: j ? 'danger' : 'text',
                glow: j,
                style: { fontSize: 14 },
              }),
              r.jsx('span', { className: Ll.hpDivider, children: '/' }),
              r.jsx(hn, { value: s, size: 'sm', accentColor: 'dim', style: { fontSize: 11 } }),
            ],
          }),
          z &&
            r.jsxs('span', {
              className: Ll.shieldBlock,
              children: [
                r.jsx(V, {
                  variant: 'label',
                  color: 'primary',
                  style: { fontSize: 9.5 },
                  children: 'SHLD',
                }),
                r.jsx(hn, {
                  value: u,
                  size: 'sm',
                  accentColor: 'primary',
                  style: { fontSize: 11 },
                }),
              ],
            }),
        ],
      }),
      r.jsx(Ts, { value: C, max: 100, color: C <= 30 ? 'hp-low' : 'hp', size: 'md' }),
      z && r.jsx(Ts, { value: U, max: 100, color: 'shield', size: 'sm' }),
      r.jsx(lS, {
        waveNumber: f,
        secondsLeft: p,
        secondsMax: y,
        nextMilestone: T,
        showSeconds: !1,
        size: 'sm',
      }),
      r.jsxs('span', { className: Ll.srOnly, 'aria-hidden': 'false', children: [f, '/', h] }),
    ],
  });
}
function Fh(i, s) {
  const u = parseFloat(i.toString()),
    o = parseFloat(s.toString());
  return o === 0 ? 0 : Math.max(0, Math.min(100, (u / o) * 100));
}
const cS = '_card_1o3jz_1',
  sS = '_header_1o3jz_8',
  uS = '_soundSection_1o3jz_13',
  oS = '_sliderRow_1o3jz_19',
  rS = '_sliderLabel_1o3jz_26',
  fS = '_sliderValue_1o3jz_31',
  dS = '_divider_1o3jz_38',
  mS = '_actions_1o3jz_44',
  aa = {
    card: cS,
    header: sS,
    soundSection: uS,
    sliderRow: oS,
    sliderLabel: rS,
    sliderValue: fS,
    divider: dS,
    actions: mS,
  },
  hS = '_button_10kfo_1',
  pS = '_fullWidth_10kfo_109',
  vS = '_iconLeft_10kfo_113',
  yS = '_iconRight_10kfo_114',
  gS = '_label_10kfo_120',
  Hn = {
    button: hS,
    'variant-primary': '_variant-primary_10kfo_28',
    'variant-secondary': '_variant-secondary_10kfo_42',
    'variant-danger': '_variant-danger_10kfo_56',
    'variant-ghost': '_variant-ghost_10kfo_70',
    'size-sm': '_size-sm_10kfo_85',
    'size-md': '_size-md_10kfo_93',
    'size-lg': '_size-lg_10kfo_101',
    fullWidth: pS,
    iconLeft: vS,
    iconRight: yS,
    label: gS,
  };
function qt({
  label: i,
  variant: s = 'primary',
  size: u = 'md',
  fullWidth: o = !1,
  iconLeft: d,
  iconRight: f,
  disabled: h = !1,
  onClick: p,
  type: y = 'button',
}) {
  return r.jsxs('button', {
    type: y,
    className: [Hn.button, Hn[`variant-${s}`], Hn[`size-${u}`], o ? Hn.fullWidth : '']
      .filter(Boolean)
      .join(' '),
    disabled: h,
    onClick: p,
    'aria-disabled': h,
    children: [
      d != null && r.jsx('span', { className: Hn.iconLeft, 'aria-hidden': 'true', children: d }),
      r.jsx('span', { className: Hn.label, children: i }),
      f != null && r.jsx('span', { className: Hn.iconRight, 'aria-hidden': 'true', children: f }),
    ],
  });
}
const _S = '_overlay_1i1z1_12',
  bS = '_fullscreen_1i1z1_21',
  SS = '_absolute_1i1z1_27',
  xS = '_alignCenter_1i1z1_33',
  jS = '_alignTop_1i1z1_38',
  AS = '_alignBottom_1i1z1_44',
  TS = '_content_1i1z1_50',
  Vn = {
    overlay: _S,
    fullscreen: bS,
    absolute: SS,
    alignCenter: xS,
    alignTop: jS,
    alignBottom: AS,
    content: TS,
  },
  ES = { soft: 0.45, normal: 0.6, heavy: 0.8 },
  Ih = {
    sheet: 'var(--z-sheet)',
    dialog: 'var(--z-dialog)',
    overlay: 'var(--z-overlay)',
    toast: 'var(--z-toast)',
  },
  NS = { center: Vn.alignCenter, top: Vn.alignTop, bottom: Vn.alignBottom };
function Ar({
  fullscreen: i = !0,
  children: s,
  onClose: u,
  dismissible: o = !0,
  dimLevel: d = 'normal',
  blur: f = 0,
  align: h = 'center',
  zIndex: p = 'overlay',
  style: y,
  open: g,
}) {
  const _ = () => {
      o && u && u();
    },
    j = (U) => {
      U.stopPropagation();
    },
    T = ES[d],
    z = typeof p == 'number' ? p : (Ih[p] ?? Ih.overlay),
    C = {
      background: `rgba(2, 4, 10, ${T})`,
      zIndex: z,
      ...(f > 0 ? { backdropFilter: `blur(${f}px)` } : {}),
      ...y,
    };
  return r.jsx('div', {
    className: [Vn.overlay, i ? Vn.fullscreen : Vn.absolute, NS[h]].join(' '),
    style: C,
    onClick: _,
    role: 'presentation',
    'aria-modal': 'true',
    children: r.jsx('div', { className: Vn.content, onClick: j, children: s }),
  });
}
const MS = '_wrapper_131tr_1',
  zS = '_disabled_131tr_5',
  CS = '_input_131tr_18',
  bs = {
    wrapper: MS,
    disabled: zS,
    'color-primary': '_color-primary_131tr_9',
    'color-secondary': '_color-secondary_131tr_13',
    input: CS,
  },
  dr = ({
    value: i,
    min: s = 0,
    max: u = 1,
    step: o = 0.01,
    onChange: d,
    color: f = 'primary',
    disabled: h = !1,
  }) => {
    const p = u === s ? 0 : ((i - s) / (u - s)) * 100,
      y = (_) => {
        h || d(parseFloat(_.target.value));
      },
      g = { '--slider-fill-pct': `${p}%` };
    return r.jsx('div', {
      className: [bs.wrapper, bs[`color-${f}`], h ? bs.disabled : ''].join(' '),
      style: g,
      children: r.jsx('input', {
        type: 'range',
        className: bs.input,
        min: s,
        max: u,
        step: o,
        value: i,
        onChange: y,
        disabled: h,
        'aria-valuenow': i,
        'aria-valuemin': s,
        'aria-valuemax': u,
      }),
    });
  },
  RS = '_dialog_49iek_13',
  wS = '_card_49iek_20',
  OS = '_titleRow_49iek_27',
  DS = '_titleIcon_49iek_33',
  BS = '_title_49iek_27',
  LS = '_message_49iek_46',
  HS = '_actions_49iek_50',
  qS = '_variantDanger_49iek_57',
  rn = {
    dialog: RS,
    card: wS,
    titleRow: OS,
    titleIcon: DS,
    title: BS,
    message: LS,
    actions: HS,
    variantDanger: qS,
  };
function q0({
  open: i,
  title: s,
  message: u,
  iconName: o,
  confirmLabel: d = '確定',
  cancelLabel: f = 'キャンセル',
  onConfirm: h,
  onCancel: p,
  variant: y = 'default',
}) {
  return i
    ? r.jsx(Ar, {
        open: i,
        onClose: p,
        dismissible: !0,
        children: r.jsx('div', {
          className: [rn.dialog, y === 'danger' ? rn.variantDanger : ''].filter(Boolean).join(' '),
          children: r.jsxs(Xn, {
            variant: 'elevated',
            padding: 'lg',
            className: rn.card,
            children: [
              r.jsxs('div', {
                className: rn.titleRow,
                children: [
                  o != null &&
                    r.jsx('span', {
                      className: rn.titleIcon,
                      'aria-hidden': 'true',
                      children: r.jsx(Oe, {
                        name: o,
                        size: 20,
                        color: y === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)',
                      }),
                    }),
                  r.jsx(V, { variant: 'heading-3', as: 'h2', className: rn.title, children: s }),
                ],
              }),
              u != null &&
                u.length > 0 &&
                r.jsx(V, { variant: 'body', color: 'mid', className: rn.message, children: u }),
              r.jsxs('div', {
                className: rn.actions,
                children: [
                  r.jsx(qt, { label: f, variant: 'ghost', fullWidth: !0, onClick: p }),
                  r.jsx(qt, {
                    label: d,
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
function US({
  open: i,
  bgmVolume: s,
  seVolume: u,
  onBgmChange: o,
  onSeChange: d,
  onRetreat: f,
  onClose: h,
}) {
  const [p, y] = ne.useState(!1);
  if (!i) return null;
  const g = () => {
      y(!0);
    },
    _ = () => {
      (y(!1), f());
    },
    j = () => {
      y(!1);
    };
  return r.jsxs(r.Fragment, {
    children: [
      r.jsx(Ar, {
        open: i,
        onClose: h,
        dimLevel: 'heavy',
        blur: 4,
        dismissible: !p,
        children: r.jsxs(Xn, {
          variant: 'elevated',
          padding: 'lg',
          className: aa.card,
          children: [
            r.jsx('div', {
              className: aa.header,
              children: r.jsx(V, {
                variant: 'heading-2',
                as: 'h2',
                align: 'center',
                children: 'メニュー',
              }),
            }),
            r.jsxs('div', {
              className: aa.soundSection,
              children: [
                r.jsxs('div', {
                  className: aa.sliderRow,
                  children: [
                    r.jsx(V, {
                      variant: 'label',
                      color: 'mid',
                      className: aa.sliderLabel,
                      children: 'BGM',
                    }),
                    r.jsx(V, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: aa.sliderValue,
                      children: Math.round(s * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(dr, { value: s, min: 0, max: 1, step: 0.01, onChange: o, color: 'primary' }),
                r.jsxs('div', {
                  className: aa.sliderRow,
                  children: [
                    r.jsx(V, {
                      variant: 'label',
                      color: 'mid',
                      className: aa.sliderLabel,
                      children: 'SE',
                    }),
                    r.jsx(V, {
                      variant: 'numeric-s',
                      color: 'primary',
                      className: aa.sliderValue,
                      children: Math.round(u * 100).toString(),
                    }),
                  ],
                }),
                r.jsx(dr, { value: u, min: 0, max: 1, step: 0.01, onChange: d, color: 'primary' }),
              ],
            }),
            r.jsx('div', { className: aa.divider, role: 'separator' }),
            r.jsxs('div', {
              className: aa.actions,
              children: [
                r.jsx(qt, { label: '撤退', variant: 'danger', fullWidth: !0, onClick: g }),
                r.jsx(qt, { label: '閉じる', variant: 'ghost', fullWidth: !0, onClick: h }),
              ],
            }),
          ],
        }),
      }),
      r.jsx(q0, {
        open: p,
        title: '撤退しますか？',
        message: 'バトルを終了して撤退します。獲得リソースはリザルト画面で確認できます。',
        confirmLabel: '撤退する',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: _,
        onCancel: j,
      }),
    ],
  });
}
const GS = '_card_1fzt0_2',
  VS = '_header_1fzt0_14',
  $S = '_statusText_1fzt0_19',
  kS = '_section_1fzt0_23',
  YS = '_sectionTitle_1fzt0_29',
  ZS = '_statsGrid_1fzt0_35',
  XS = '_statItem_1fzt0_41',
  QS = '_rewardList_1fzt0_52',
  KS = '_rewardCurrency_1fzt0_58',
  JS = '_patchList_1fzt0_66',
  WS = '_patchItem_1fzt0_72',
  FS = '_actions_1fzt0_87',
  lt = {
    card: GS,
    header: VS,
    statusText: $S,
    section: kS,
    sectionTitle: YS,
    statsGrid: ZS,
    statItem: XS,
    rewardList: QS,
    rewardCurrency: KS,
    patchList: JS,
    patchItem: WS,
    actions: FS,
  },
  IS = { clear: 'クリア', gameover: '全滅', retreat: '撤退' },
  PS = { clear: 'success', gameover: 'danger', retreat: 'warning' };
function ex(i) {
  const s = Math.floor(i / 60),
    u = Math.floor(i % 60);
  return `${s.toString().padStart(2, '0')}:${u.toString().padStart(2, '0')}`;
}
function tx({
  open: i,
  status: s,
  reachedTier: u,
  reachedWave: o,
  killed: d,
  elapsedSec: f,
  reward: h,
  onClose: p,
}) {
  if (!i) return null;
  const y = IS[s],
    g = PS[s];
  return r.jsx(Ar, {
    open: i,
    onClose: void 0,
    dimLevel: 'heavy',
    blur: 4,
    dismissible: !1,
    children: r.jsxs(Xn, {
      variant: 'elevated',
      padding: 'lg',
      className: lt.card,
      children: [
        r.jsx('div', {
          className: lt.header,
          children: r.jsx(V, {
            variant: 'heading-1',
            as: 'h2',
            color: g,
            align: 'center',
            className: lt.statusText,
            children: y,
          }),
        }),
        r.jsxs('div', {
          className: lt.section,
          children: [
            r.jsx(V, {
              variant: 'label',
              color: 'mid',
              className: lt.sectionTitle,
              children: 'バトル記録',
            }),
            r.jsxs('div', {
              className: lt.statsGrid,
              children: [
                r.jsxs('div', {
                  className: lt.statItem,
                  children: [
                    r.jsx(V, { variant: 'caption', color: 'dim', children: '到達 Tier' }),
                    r.jsx(V, { variant: 'numeric-m', color: 'primary', children: u.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: lt.statItem,
                  children: [
                    r.jsx(V, { variant: 'caption', color: 'dim', children: '到達 Wave' }),
                    r.jsx(V, { variant: 'numeric-m', color: 'primary', children: o.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: lt.statItem,
                  children: [
                    r.jsx(V, { variant: 'caption', color: 'dim', children: '撃破数' }),
                    r.jsx(V, { variant: 'numeric-m', color: 'primary', children: d.toString() }),
                  ],
                }),
                r.jsxs('div', {
                  className: lt.statItem,
                  children: [
                    r.jsx(V, { variant: 'caption', color: 'dim', children: '所要時間' }),
                    r.jsx(V, { variant: 'numeric-m', color: 'primary', children: ex(f) }),
                  ],
                }),
              ],
            }),
          ],
        }),
        r.jsxs('div', {
          className: lt.section,
          children: [
            r.jsx(V, {
              variant: 'label',
              color: 'mid',
              className: lt.sectionTitle,
              children: '獲得',
            }),
            r.jsxs('div', {
              className: lt.rewardList,
              children: [
                r.jsx('div', {
                  className: lt.rewardCurrency,
                  children: r.jsx(kl, { currency: 'bolt', value: h.bolt, size: 'lg' }),
                }),
                r.jsx('div', {
                  className: lt.rewardCurrency,
                  children: r.jsx(kl, { currency: 'alloy', value: h.alloy, size: 'lg' }),
                }),
                h.patches.length > 0 &&
                  r.jsx('div', {
                    className: lt.patchList,
                    children: h.patches.map((_, j) =>
                      r.jsxs(
                        'div',
                        {
                          className: lt.patchItem,
                          children: [
                            r.jsx(V, { variant: 'body', truncate: !0, children: _.name }),
                            r.jsxs(V, {
                              variant: 'caption',
                              color: 'mid',
                              children: ['Tier ', _.tier.toString()],
                            }),
                            r.jsxs(V, {
                              variant: 'numeric-s',
                              color: 'secondary',
                              children: ['x', _.count.toString()],
                            }),
                          ],
                        },
                        j
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
          className: lt.actions,
          children: r.jsx(qt, {
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
const ax = '_root_1tank_3',
  nx = '_inner_1tank_20',
  lx = '_header_1tank_28',
  ix = '_headerText_1tank_35',
  cx = '_grid_1tank_44',
  Yi = { root: ax, inner: nx, header: lx, headerText: ix, grid: cx };
function sx({ open: i, screw: s, levels: u, onUpgrade: o, onClose: d }) {
  return i
    ? r.jsx('section', {
        className: Yi.root,
        role: 'dialog',
        'aria-modal': 'false',
        'aria-label': 'ラン中ワークショップ',
        children: r.jsxs('div', {
          className: Yi.inner,
          children: [
            r.jsxs('div', {
              className: Yi.header,
              children: [
                r.jsxs('div', {
                  className: Yi.headerText,
                  children: [
                    r.jsx(V, {
                      variant: 'heading-3',
                      style: { fontSize: 14, lineHeight: 1.2 },
                      children: 'ラン中ワークショップ',
                    }),
                    r.jsx(V, {
                      variant: 'caption',
                      color: 'dim',
                      style: { fontSize: 10.5 },
                      children: 'ラン終了で全リセット',
                    }),
                  ],
                }),
                r.jsx(kl, { currency: 'screw', value: s, size: 'md' }),
                d != null &&
                  r.jsx(Ji, {
                    icon: 'chevron-down',
                    label: '閉じる',
                    variant: 'ghost',
                    size: 'sm',
                    onClick: d,
                  }),
              ],
            }),
            r.jsx('div', {
              className: Yi.grid,
              children: N0.map((f) => {
                const h = u[f.key],
                  p = $n(h),
                  y = $n(h + 1),
                  g = br(f, h),
                  _ = M0(f, h, 5),
                  { totalCost: j, lvDelta: T } = z0(f, h, s),
                  z = W.fromNumber(g),
                  C = W.fromNumber(_),
                  U = s.gte(z),
                  q = s.gte(C),
                  F = T > 0;
                return r.jsx(
                  xr,
                  {
                    title: f.title,
                    iconName: f.iconName,
                    currentLabel: `Lv ${h}`,
                    before: Math.round(p * 10) / 10,
                    after: Math.round(y * 10) / 10,
                    beforeSuffix: '×',
                    currency: 'screw',
                    accent: 'warning',
                    options: [
                      { amount: '+1', cost: z, disabled: !U },
                      { amount: '+5', cost: C, disabled: !q },
                      { amount: 'MAX', cost: j, disabled: !F },
                    ],
                    onUpgrade: (I) => {
                      I === '+1'
                        ? o(f.key, 1)
                        : I === '+5'
                          ? o(f.key, 5)
                          : I === 'MAX' && o(f.key, 'max');
                    },
                  },
                  f.key
                );
              }),
            }),
          ],
        }),
      })
    : null;
}
const ux = '_root_9fvdn_2',
  ox = { root: ux },
  lr = [
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
function rx({ items: i = [], showTower: s = !1, towerContent: u = null, cycleSeconds: o = 24 }) {
  const f = `ssfx-${ne.useId().replace(/:/g, '')}`,
    h = lr.map((j, T) => {
      const z = 100 / j.length,
        C = j
          .map(([U, q], F) => {
            const I = F * z;
            return `
          ${I}%               { left: ${U}%; top: ${q}%; opacity: 0; }
          ${(I + 3).toFixed(2)}%   { left: ${U}%; top: ${q}%; opacity: 1; }
          ${(I + z - 7).toFixed(2)}%  { left: ${U}%; top: ${q}%; opacity: 1; }
          ${(I + z - 3).toFixed(2)}%  { left: ${U}%; top: ${q}%; opacity: 0; }
        `;
          })
          .join('');
      return `@keyframes ${f}-drift-${T + 1} { ${C} 100% { opacity: 0; } }`;
    }).join(`
`),
    p = lr.map(
      (j, T) => `.${f}-p${T + 1} { animation: ${f}-drift-${T + 1} ${o}s linear infinite; }`
    ).join(`
`),
    y = `
    .${f}-slot {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
      will-change: left, top, opacity;
    }
    ${p}
    ${h}

    /* tower composite (rings + glow pulse + slow rotation) */
    @keyframes ${f}-rot   { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
    @keyframes ${f}-rot-r { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    @keyframes ${f}-pulse {
      0%, 100% { transform: scale(1);    opacity: 1; }
      50%      { transform: scale(1.08); opacity: 0.85; }
    }
    @keyframes ${f}-glow {
      0%, 100% { filter: drop-shadow(0 0 8px rgba(78,228,246,0.55)) drop-shadow(0 0 16px rgba(78,228,246,0.25)); }
      50%      { filter: drop-shadow(0 0 14px rgba(78,228,246,0.85)) drop-shadow(0 0 32px rgba(78,228,246,0.5)); }
    }
    .${f}-tower {
      position: relative;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .${f}-tower-r1 {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 1px solid var(--c-primary);
      box-shadow: var(--glow-cyan-md), inset 0 0 32px rgba(78,228,246,0.18);
      animation: ${f}-rot 18s linear infinite;
    }
    .${f}-tower-r2 {
      position: absolute;
      inset: 14px;
      border-radius: 50%;
      border: 1px dashed rgba(169,107,255,0.6);
      animation: ${f}-rot-r 24s linear infinite;
    }
    .${f}-tower-core {
      color: var(--c-primary-hi);
      animation: ${f}-pulse 3.6s var(--ease-default) infinite, ${f}-glow 3.6s var(--ease-default) infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .${f}-slot { animation: none !important; opacity: 0.55 !important; }
      .${f}-slot:not(.${f}-rm-show) { display: none; }
      .${f}-rm-show { position: relative; transform: none; left: auto; top: auto; }
      .${f}-tower-r1, .${f}-tower-r2, .${f}-tower-core { animation: none !important; }
    }
  `,
    g = r.jsxs('div', {
      className: `${f}-tower`,
      children: [
        r.jsx('div', { className: `${f}-tower-r1` }),
        r.jsx('div', { className: `${f}-tower-r2` }),
        r.jsx('div', { className: `${f}-tower-core`, children: u }),
      ],
    }),
    _ = s ? [g, ...i] : [...i];
  return r.jsxs('div', {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    'data-screen-saver-fx': f,
    children: [
      r.jsx('style', { dangerouslySetInnerHTML: { __html: y } }),
      _.map((j, T) => {
        const z = (T % lr.length) + 1,
          C = -(T * (o / Math.max(_.length, 1)));
        return r.jsx(
          'div',
          {
            className: `${f}-slot ${f}-p${z}${T === 0 ? ` ${f}-rm-show` : ''}`,
            style: { animationDelay: `${C}s` },
            children: j,
          },
          T
        );
      }),
    ],
  });
}
function fx({ open: i, onClose: s }) {
  return i
    ? r.jsx('div', {
        className: ox.root,
        onClick: s,
        role: 'button',
        'aria-label': 'スクリーンセーバーを終了',
        tabIndex: 0,
        onKeyDown: (u) => {
          (u.key === 'Enter' || u.key === ' ') && s();
        },
        children: r.jsx(rx, {
          showTower: !0,
          towerContent: r.jsx(Oe, { name: 'tower', size: 88 }),
        }),
      })
    : null;
}
function U0(i, s) {
  if (i.isZero()) return W.ZERO;
  if (s <= 0) return i;
  if (s >= 1) return W.ZERO;
  const u = 1 - s;
  return i.mulNumber(u);
}
function ws(i, s) {
  return i <= 0 ? !1 : i >= 1 ? !0 : s() < i;
}
function Os(i, s, u) {
  const { machine: o, weapon: d, isCrit: f } = i;
  let h = o.baseAttack.mulNumber(d.damageMultiplier);
  f && (h = h.mulNumber(o.critMultiplier));
  const p = h.sub(s),
    y = U0(p, u);
  return { rawDmg: h, finalDmg: y, isCrit: f };
}
function dx(i, s) {
  const u = i.sub(s.defense);
  return U0(u, s.damageReduction);
}
const Ph = 50,
  e0 = 50;
function mx(i, s) {
  const u = Ph - i.position.x,
    o = e0 - i.position.y,
    d = Math.sqrt(u * u + o * o);
  if (d <= 0) return i;
  const f = i.speed * s;
  if (f <= 0) return i;
  if (f >= d) return { ...i, position: { x: Ph, y: e0 } };
  const h = f / d;
  return { ...i, position: { x: i.position.x + u * h, y: i.position.y + o * h } };
}
const hx = 10,
  px = 0.05,
  vx = 1.5;
function t0({ machineMaxHp: i }) {
  return {
    baseAttack: W.fromNumber(hx),
    defense: W.ZERO,
    damageReduction: 0,
    critRate: px,
    critMultiplier: vx,
    maxHp: i.isZero() ? W.fromNumber(1) : i,
    hpRegen: W.ZERO,
  };
}
const yx = 0.5,
  gx = 30,
  _x = 25,
  bx = 5,
  Sx = 20;
function G0(i) {
  const s = Math.max(0, Math.floor(i)),
    u = Math.pow(1.02, s),
    o = Math.min(10, yx * (1 + 0.03 * s)),
    d = gx + 0.5 * s,
    f = Sx * (1 + 0.05 * s);
  return {
    attackPerSec: o,
    splashRadius: d,
    damageMul: u,
    volleyCdSec: _x,
    volleyDamageMul: f,
    volleyShots: bx,
  };
}
function ir(i, s, u, o) {
  const d = i - u,
    f = s - o;
  return Math.sqrt(d * d + f * f);
}
function xx(i, s, u, o) {
  if (u.length === 0) return { hits: [], blastX: 0, blastY: 50 };
  const d = 0,
    f = 50;
  let h = u[0],
    p = ir(d, f, h.position.x, h.position.y);
  for (let T = 1; T < u.length; T++) {
    const z = u[T],
      C = ir(d, f, z.position.x, z.position.y);
    C > p && ((p = C), (h = z));
  }
  const y = h.position.x,
    g = h.position.y,
    _ = ws(i.critRate, o),
    j = [];
  for (const T of u)
    if (ir(y, g, T.position.x, T.position.y) <= s.splashRadius) {
      const C = Os({ machine: i, weapon: { damageMultiplier: s.damageMul }, isCrit: _ }, W.ZERO, 0);
      j.push({ enemyId: T.id, damage: C.finalDmg, crit: _ });
    }
  return { hits: j, blastX: y, blastY: g };
}
function V0(i) {
  const d = 2 * (1 + 0.03 * i),
    f = 80 + 0.5 * i,
    h = Math.floor(1 + 0.05 * i),
    p = Math.pow(1.02, i);
  return {
    attackPerSec: d,
    orbitRadius: f,
    simultaneousHits: h,
    damageMul: p,
    overdriveCdSec: 35,
    overdriveDurationSec: 8,
    overdriveAttackSpeedMul: 3,
    overdriveDamageMul: 1,
  };
}
function jx(i, s, u, o, d) {
  const h = u.slice(0, s.simultaneousHits).map((y) => {
      const g = ws(i.critRate, d),
        _ = Os({ machine: i, weapon: { damageMultiplier: s.damageMul }, isCrit: g }, W.ZERO, 0);
      return { enemyId: y.id, damage: _.finalDmg, crit: g };
    }),
    p = (o + 360 / s.attackPerSec) % 360;
  return { hits: h, angle: p };
}
function $0(i) {
  const s = Math.max(0, i),
    u = 1 * (1 + 0.03 * s),
    o = Math.floor(1 + 0.1 * s),
    d = Math.pow(1.02, s),
    f = 20,
    h = 10 * (1 + 0.05 * s);
  return { attackPerSec: u, pierce: o, damageMul: d, megaCdSec: f, megaDamageMul: h };
}
function Ax(i, s, u, o) {
  if (u.length === 0) return { hits: [], beamX: 0, beamY: 0 };
  const d = u.slice(0, s.pierce),
    f = d.map((g) => {
      const _ = ws(i.critRate, o),
        j = Os({ machine: i, weapon: { damageMultiplier: s.damageMul }, isCrit: _ }, W.ZERO, 0);
      return { enemyId: g.id, damage: j.finalDmg, crit: _ };
    }),
    h = d[d.length - 1],
    p = h.position.x,
    y = h.position.y;
  return { hits: f, beamX: p, beamY: y };
}
function k0(i) {
  const s = Math.max(0, i),
    u = Math.pow(1.02, s),
    o = Math.min(10, 0.7 * (1 + 0.03 * s)),
    d = 3,
    f = 0.9,
    h = 30,
    p = 15 * (1 + 0.05 * s);
  return {
    attackPerSec: o,
    chainCount: d,
    chainFalloff: f,
    damageMul: u,
    plasmaCdSec: h,
    plasmaDamageMul: p,
  };
}
function Tx(i, s, u, o) {
  if (u.length === 0) return { hits: [], path: [] };
  const d = u.slice(0, s.chainCount),
    f = [],
    h = [];
  for (let p = 0; p < d.length; p++) {
    const y = d[p],
      g = Math.pow(s.chainFalloff, p),
      _ = s.damageMul * g,
      j = ws(i.critRate, o),
      T = Os({ machine: i, weapon: { damageMultiplier: _ }, isCrit: j }, W.ZERO, 0);
    (f.push({ enemyId: y.id, damage: T.finalDmg, crit: j }),
      h.push({ x: y.position.x, y: y.position.y }));
  }
  return { hits: f, path: h };
}
function Ex(i, s) {
  switch (i) {
    case 'laser':
      return $0(s).attackPerSec;
    case 'cannon':
      return G0(s).attackPerSec;
    case 'thunder':
      return k0(s).attackPerSec;
    case 'cutter':
      return V0(s).attackPerSec;
  }
}
function Nx({
  weapon: i,
  weaponLv: s,
  machine: u,
  enemiesInRange: o,
  rng: d,
  cutterAngleDeg: f = 0,
  attackMul: h,
}) {
  switch (i) {
    case 'laser': {
      const p = $0(s),
        y = { ...p, damageMul: p.damageMul * h };
      return {
        hits: Ax(u, y, o, d).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cannon': {
      const p = G0(s),
        y = { ...p, damageMul: p.damageMul * h };
      return {
        hits: xx(u, y, o, d).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'thunder': {
      const p = k0(s),
        y = { ...p, damageMul: p.damageMul * h };
      return {
        hits: Tx(u, y, o, d).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
    case 'cutter': {
      const p = V0(s),
        y = { ...p, damageMul: p.damageMul * h };
      return {
        hits: jx(u, y, o, f, d).hits.map((_) => ({
          enemyId: _.enemyId,
          damage: _.damage,
          crit: _.crit,
        })),
      };
    }
  }
}
const Yn = { HP: 10, ATK: 2, SPD: 30, SPAWN_INTERVAL: 0.5, HP_GROWTH: 1.8, ATK_GROWTH: 1.4 };
function Mx(i) {
  return i <= 10
    ? 1 + 0.074 * (i - 1)
    : i <= 20
      ? 1 + 0.074 * 9 + 0.133 * (i - 10)
      : 1 + 0.074 * 9 + 0.133 * 10 + 0.2 * (i - 20);
}
function zx(i) {
  return i <= 10
    ? 1 + 0.037 * (i - 1)
    : i <= 20
      ? 1 + 0.037 * 9 + 0.067 * (i - 10)
      : 1 + 0.037 * 9 + 0.067 * 10 + 0.1 * (i - 20);
}
function Cx(i) {
  return i <= 10
    ? 1 + 0.019 * (i - 1)
    : i <= 20
      ? 1 + 0.019 * 9 + 0.033 * (i - 10)
      : 1 + 0.019 * 9 + 0.033 * 10 + 0.05 * (i - 20);
}
function Rx(i) {
  let s = W.fromNumber(Yn.HP);
  for (let u = 1; u < i; u++) s = s.mulNumber(Yn.HP_GROWTH);
  return s;
}
function wx(i) {
  let s = W.fromNumber(Yn.ATK);
  for (let u = 1; u < i; u++) s = s.mulNumber(Yn.ATK_GROWTH);
  return s;
}
const Ox = { standard: 1, swift: 0.6, tough: 5 },
  Dx = { standard: 1, swift: 0.5, tough: 1 },
  Bx = { standard: 1, swift: 2, tough: 0.5 },
  Lx = { elite: 10, miniboss: 50, boss: 250 },
  Hx = { elite: 2.5, miniboss: 5, boss: 8 },
  qx = { standard: 1, swift: 2, tough: 5 },
  Ux = { standard: 1, swift: 2, tough: 5 };
function a0(i, s, u, o) {
  const d = Rx(i),
    f = wx(i),
    h = Mx(s),
    p = zx(s);
  if (u === 'normal') {
    const q = o ?? 'standard',
      F = d.mulNumber(Ox[q]).mulNumber(h),
      I = f.mulNumber(Dx[q]).mulNumber(p),
      de = Yn.SPD * Bx[q];
    return {
      kind: 'normal',
      subtype: q,
      hp: F,
      atk: I,
      speed: de,
      reward: { screw: qx[q], bolt: Ux[q], alloyChance: 0, alloyAmount: 0 },
    };
  }
  const y = u,
    g = d.mulNumber(Lx[y]).mulNumber(h),
    _ = f.mulNumber(Hx[y]).mulNumber(p),
    j = Yn.SPD;
  let T, z, C, U;
  return (
    u === 'elite'
      ? ((T = 10), (z = 10), (C = 0.3), (U = 1))
      : u === 'miniboss'
        ? ((T = 50), (z = 50), (C = 1), (U = 1))
        : ((T = 250), (z = 250), (C = 1), (U = 5)),
    {
      kind: u,
      hp: g,
      atk: _,
      speed: j,
      reward: { screw: T, bolt: z, alloyChance: C, alloyAmount: U },
    }
  );
}
function n0(i, s, u, o) {
  const d = o() < 0.5 ? 0 : 100,
    f = o() * 100;
  return { ...i, id: s, spawnedAtMs: u, position: { x: d, y: f } };
}
const Gx = 30,
  Vx = 26;
function $x(i) {
  return i <= 4
    ? [{ subtype: 'standard', weight: 1 }]
    : i <= 9
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
function kx(i) {
  const s = [];
  for (let u = 1; u <= Gx; u++) {
    const o = Cx(u),
      d = Yn.SPAWN_INTERVAL / o,
      f = $x(u);
    let h;
    (u === 5 || u === 15 || u === 25
      ? (h = 'elite')
      : u === 10 || u === 20
        ? (h = 'miniboss')
        : u === 30 && (h = 'boss'),
      s.push({
        waveIndex: u,
        tier: i,
        durationSec: Vx,
        spawnIntervalSec: d,
        normalSpawnTable: f,
        eliteKind: h,
      }));
  }
  return s;
}
function Yx(i, s, u, o, d) {
  const f = [],
    h = s / 1e3,
    p = u / 1e3,
    y = Math.floor(h / i.spawnIntervalSec),
    g = Math.floor(p / i.spawnIntervalSec),
    _ = y - g;
  for (let z = 0; z < _; z++) {
    const C = Zx(i.normalSpawnTable, o),
      U = a0(i.tier, i.waveIndex, 'normal', C);
    f.push(n0(U, d(), s, o));
  }
  const T = i.durationSec - 1;
  if (i.eliteKind !== void 0 && p < T && h >= T) {
    const z = a0(i.tier, i.waveIndex, i.eliteKind);
    f.push(n0(z, d(), s, o));
  }
  return f;
}
function Zx(i, s) {
  const u = s();
  let o = 0;
  for (const d of i) if (((o += d.weight), u < o)) return d.subtype;
  return i[i.length - 1].subtype;
}
function Xx(i) {
  return 440 * Math.pow(2, (i - 69) / 12);
}
const Qx = {
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
function D(i) {
  const s = i.match(/^([A-G]#?b?)(\d)$/);
  if (!s) throw new Error(`Invalid note: ${i}`);
  const u = Qx[s[1]];
  if (u === void 0) throw new Error(`Invalid note name: ${s[1]}`);
  const d = 12 + parseInt(s[2], 10) * 12 + u;
  return Xx(d);
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
const Kx = [D('A2'), D('C3'), D('E3')],
  Jx = [D('E2'), D('G2'), D('B2')];
(D('D3'), D('F3'), D('A3'));
const Wx = [D('G2'), D('B2'), D('D3')],
  Fx = [D('C3'), D('E3'), D('G3')],
  Ix = [D('B2'), D('D3'), D('F3')];
function Wt(i, s, u, o, d, f, h, p) {
  const y = i.createOscillator(),
    g = i.createGain();
  ((y.type = u), y.frequency.setValueAtTime(o, d));
  const _ = 0.01,
    j = Math.min(0.08, f * 0.4);
  if (
    (g.gain.setValueAtTime(1e-4, d),
    g.gain.linearRampToValueAtTime(h, d + _),
    g.gain.setValueAtTime(h, d + f - j),
    g.gain.exponentialRampToValueAtTime(1e-4, d + f),
    p !== void 0)
  ) {
    const T = i.createBiquadFilter();
    ((T.type = 'lowpass'),
      (T.frequency.value = p),
      (T.Q.value = 0.8),
      y.connect(T).connect(g).connect(s));
  } else y.connect(g).connect(s);
  (y.start(d), y.stop(d + f + 0.02));
}
function ec(i, s) {
  const u = Math.max(1, Math.floor(i.sampleRate * s)),
    o = i.createBuffer(1, u, i.sampleRate),
    d = o.getChannelData(0);
  let f = 74565;
  for (let h = 0; h < u; h++)
    ((f = (f * 1664525 + 1013904223) & 4294967295), (d[h] = f / 2147483648 - 1));
  return o;
}
function Fi(i, s, u, o) {
  const d = i.createOscillator(),
    f = i.createGain();
  ((d.type = 'sine'),
    d.frequency.setValueAtTime(80, u),
    d.frequency.exponentialRampToValueAtTime(30, u + 0.12),
    f.gain.setValueAtTime(o, u),
    f.gain.exponentialRampToValueAtTime(1e-4, u + 0.18),
    d.connect(f).connect(s),
    d.start(u),
    d.stop(u + 0.22));
  const h = i.createBufferSource();
  h.buffer = ec(i, 0.04);
  const p = i.createGain(),
    y = i.createBiquadFilter();
  ((y.type = 'highpass'),
    (y.frequency.value = 400),
    p.gain.setValueAtTime(o * 0.3, u),
    p.gain.exponentialRampToValueAtTime(1e-4, u + 0.04),
    h.connect(y).connect(p).connect(s),
    h.start(u));
}
function Px(i, s, u, o, d) {
  const f = i.createBufferSource();
  f.buffer = ec(i, d + 0.01);
  const h = i.createGain(),
    p = i.createBiquadFilter();
  ((p.type = 'highpass'),
    (p.frequency.value = 6e3),
    h.gain.setValueAtTime(o, u),
    h.gain.exponentialRampToValueAtTime(1e-4, u + d),
    f.connect(p).connect(h).connect(s),
    f.start(u));
}
const e3 = 100,
  Gn = 60 / e3,
  Wi = Gn * 4,
  Y0 = 8,
  t3 = Wi * Y0,
  a3 = 2,
  n3 = 100,
  l3 = [D('A2'), D('A2'), D('G2'), D('G2'), D('C3'), D('C3'), D('E2'), D('E2')],
  l0 = [D('A3'), D('C4'), D('E4'), D('A4'), D('G4'), D('E4'), D('C4'), D('A3')],
  i0 = [
    [D('A3'), D('C4'), D('E4')],
    [D('G3'), D('B3'), D('D4')],
    [D('C3'), D('E3'), D('G3')],
    [D('E3'), D('G3'), D('B3')],
  ];
function i3(i, s, u, o) {
  for (let d = 0; d < Y0; d++) {
    const f = u + d * Wi,
      h = l3[d];
    (Wt(i, s, 'sawtooth', h, f, Gn * 1.8, 0.22, 300),
      Wt(i, s, 'sawtooth', h, f + Gn * 2, Gn * 1.8, 0.22, 300),
      Fi(i, s, f, 0.35),
      Fi(i, s, f + Gn * 2, 0.28));
    for (let p = 0; p < 8; p++) {
      const y = (d * 8 + p) % l0.length,
        g = f + p * Gn * 0.5;
      Wt(i, s, 'square', l0[y], g, Gn * 0.4, 0.07, 2400);
    }
  }
  for (let d = 0; d < i0.length; d++) {
    const f = i0[d],
      h = u + d * Wi * 2,
      p = Wi * 2;
    for (const y of f) {
      const g = i.createOscillator(),
        _ = i.createGain();
      ((g.type = 'triangle'), g.frequency.setValueAtTime(y, h));
      const j = 0.08;
      (_.gain.setValueAtTime(1e-4, h),
        _.gain.linearRampToValueAtTime(j, h + 0.15),
        _.gain.setValueAtTime(j, h + p - 0.2),
        _.gain.exponentialRampToValueAtTime(1e-4, h + p),
        g.connect(_).connect(s),
        g.start(h),
        g.stop(h + p + 0.05),
        o.push(g));
    }
  }
}
function c3(i, s) {
  let u = 0,
    o = null;
  const d = [];
  function f() {
    const p = i.currentTime + a3 * Wi;
    for (; u < p; ) (i3(i, s, u, d), (u += t3));
  }
  return {
    start() {
      ((u = i.currentTime),
        f(),
        (o = setInterval(() => {
          f();
        }, n3)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = i.currentTime + 0.05;
      for (const p of d)
        try {
          p.stop(h);
        } catch {}
      d.length = 0;
    },
  };
}
const s3 = 100,
  Ca = 60 / s3,
  Tr = Ca * 4,
  Z0 = 8,
  dn = Tr * Z0,
  u3 = 2,
  o3 = 100,
  c0 = [D('E5'), D('D5'), D('B4'), D('G4'), D('F#4'), D('E4'), D('D4'), D('B3')];
function s0(i, s, u, o) {
  const d = i.createBufferSource();
  d.buffer = ec(i, 0.2);
  const f = i.createGain(),
    h = i.createBiquadFilter();
  ((h.type = 'bandpass'),
    (h.frequency.value = 900),
    (h.Q.value = 0.6),
    f.gain.setValueAtTime(o, u),
    f.gain.exponentialRampToValueAtTime(1e-4, u + 0.18),
    d.connect(h).connect(f).connect(s),
    d.start(u),
    Wt(i, s, 'sine', 120, u, 0.12, o * 0.5, 300));
}
function r3(i, s, u, o) {
  {
    const f = i.createOscillator(),
      h = i.createGain();
    ((f.type = 'sine'), f.frequency.setValueAtTime(D('E1'), u));
    const p = 0.35;
    (h.gain.setValueAtTime(1e-4, u),
      h.gain.linearRampToValueAtTime(p, u + 0.3),
      h.gain.setValueAtTime(p, u + dn - 0.3),
      h.gain.linearRampToValueAtTime(1e-4, u + dn));
    const y = i.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 120),
      f.connect(y).connect(h).connect(s),
      f.start(u),
      f.stop(u + dn + 0.05),
      o.push(f));
  }
  for (let f = 0; f < Z0; f++) {
    const h = u + f * Tr;
    for (let p = 0; p < 4; p++) {
      const y = h + p * Ca;
      (Wt(i, s, 'sawtooth', D('E2'), y, Ca * 0.9, 0.22, 400),
        Wt(i, s, 'sawtooth', D('B2'), y, Ca * 0.8, 0.1, 600));
    }
    (Fi(i, s, h, 0.5),
      Fi(i, s, h + Ca * 2, 0.45),
      s0(i, s, h + Ca, 0.4),
      s0(i, s, h + Ca * 3, 0.38));
  }
  const d = [...Ix, D('C4')];
  for (const f of d) {
    const h = i.createOscillator(),
      p = i.createGain();
    ((h.type = 'sawtooth'), h.frequency.setValueAtTime(f, u));
    const y = 0.07;
    (p.gain.setValueAtTime(1e-4, u),
      p.gain.linearRampToValueAtTime(y, u + 0.8),
      p.gain.setValueAtTime(y, u + dn - 0.8),
      p.gain.exponentialRampToValueAtTime(1e-4, u + dn));
    const g = i.createBiquadFilter();
    ((g.type = 'lowpass'),
      (g.frequency.value = 900),
      h.connect(g).connect(p).connect(s),
      h.start(u),
      h.stop(u + dn + 0.05),
      o.push(h));
  }
  for (let f = 0; f < c0.length; f++) {
    const h = u + f * Ca * 2;
    Wt(i, s, 'sawtooth', c0[f], h, Ca * 1.6, 0.08, 2e3);
  }
  {
    const f = i.createBufferSource();
    f.buffer = ec(i, dn + 0.1);
    const h = i.createGain(),
      p = i.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 200),
      h.gain.setValueAtTime(0.04, u),
      f.connect(p).connect(h).connect(s),
      f.start(u),
      o.push(f));
  }
}
function f3(i, s) {
  let u = 0,
    o = null;
  const d = [];
  function f() {
    const p = i.currentTime + u3 * Tr;
    for (; u < p; ) (r3(i, s, u, d), (u += dn));
  }
  return {
    start() {
      ((u = i.currentTime),
        f(),
        (o = setInterval(() => {
          f();
        }, o3)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = i.currentTime + 0.05;
      for (const p of d)
        try {
          p.stop(h);
        } catch {}
      d.length = 0;
    },
  };
}
const d3 = 120,
  Ra = 60 / d3,
  Er = Ra * 4,
  X0 = 8,
  Ss = Er * X0,
  m3 = 2,
  h3 = 100,
  p3 = [D('E2'), D('E2'), D('D2'), D('D2'), D('E2'), D('E2'), D('B1'), D('B1')],
  u0 = [
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
function o0(i, s, u, o) {
  const d = i.createBufferSource();
  d.buffer = ec(i, 0.15);
  const f = i.createGain(),
    h = i.createBiquadFilter();
  ((h.type = 'bandpass'),
    (h.frequency.value = 1800),
    (h.Q.value = 0.8),
    f.gain.setValueAtTime(o, u),
    f.gain.exponentialRampToValueAtTime(1e-4, u + 0.13),
    d.connect(h).connect(f).connect(s),
    d.start(u),
    Wt(i, s, 'triangle', 200, u, 0.08, o * 0.4));
}
function v3(i, s, u, o) {
  for (let f = 0; f < X0; f++) {
    const h = u + f * Er,
      p = p3[f];
    for (let y = 0; y < 4; y++) Wt(i, s, 'sawtooth', p, h + y * Ra, Ra * 0.85, 0.26, 280);
    for (let y = 0; y < 4; y++) Fi(i, s, h + y * Ra, 0.42);
    (o0(i, s, h + Ra, 0.3), o0(i, s, h + Ra * 3, 0.3));
    for (let y = 0; y < 8; y++) Px(i, s, h + y * Ra * 0.5, 0.12, 0.08);
    for (let y = 0; y < 16; y++) {
      const g = (f * 16 + y) % u0.length,
        _ = h + y * Ra * 0.25;
      Wt(i, s, 'sawtooth', u0[g], _, Ra * 0.22, 0.06, 3200);
    }
  }
  const d = [D('E3'), D('G3'), D('B3')];
  for (const f of d) {
    const h = i.createOscillator(),
      p = i.createGain();
    ((h.type = 'triangle'),
      h.frequency.setValueAtTime(f, u),
      p.gain.setValueAtTime(1e-4, u),
      p.gain.linearRampToValueAtTime(0.06, u + 0.2),
      p.gain.setValueAtTime(0.06, u + Ss - 0.3),
      p.gain.exponentialRampToValueAtTime(1e-4, u + Ss));
    const y = i.createBiquadFilter();
    ((y.type = 'lowpass'),
      (y.frequency.value = 1200),
      h.connect(y).connect(p).connect(s),
      h.start(u),
      h.stop(u + Ss + 0.05),
      o.push(h));
  }
}
function y3(i, s) {
  let u = 0,
    o = null;
  const d = [];
  function f() {
    const p = i.currentTime + m3 * Er;
    for (; u < p; ) (v3(i, s, u, d), (u += Ss));
  }
  return {
    start() {
      ((u = i.currentTime),
        f(),
        (o = setInterval(() => {
          f();
        }, h3)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = i.currentTime + 0.05;
      for (const p of d)
        try {
          p.stop(h);
        } catch {}
      d.length = 0;
    },
  };
}
const g3 = 80,
  xs = 60 / g3,
  Es = xs * 4,
  _3 = 8,
  js = Es * _3,
  b3 = 2,
  S3 = 100,
  r0 = [Kx, Fx, Wx, Jx],
  cr = [D('A3'), D('C4'), D('E4'), D('G4'), D('A4'), D('E4')];
function x3(i, s, u, o) {
  {
    const d = i.createOscillator(),
      f = i.createGain();
    ((d.type = 'sine'), d.frequency.setValueAtTime(D('A2'), u));
    const h = 0.28;
    (f.gain.setValueAtTime(1e-4, u),
      f.gain.linearRampToValueAtTime(h, u + 0.5),
      f.gain.setValueAtTime(h, u + js - 0.5),
      f.gain.linearRampToValueAtTime(1e-4, u + js));
    const p = i.createBiquadFilter();
    ((p.type = 'lowpass'),
      (p.frequency.value = 180),
      d.connect(p).connect(f).connect(s),
      d.start(u),
      d.stop(u + js + 0.05),
      o.push(d));
  }
  for (let d = 0; d < r0.length; d++) {
    const f = r0[d],
      h = u + d * Es * 2,
      p = Es * 2;
    for (const y of f) {
      const g = i.createOscillator(),
        _ = i.createGain();
      ((g.type = 'triangle'), g.frequency.setValueAtTime(y, h));
      const j = 0.1,
        T = 0.4,
        z = 0.6;
      (_.gain.setValueAtTime(1e-4, h),
        _.gain.linearRampToValueAtTime(j, h + T),
        _.gain.setValueAtTime(j, h + p - z),
        _.gain.exponentialRampToValueAtTime(1e-4, h + p));
      const C = i.createDelay(0.5);
      C.delayTime.value = 0.25;
      const U = i.createGain();
      U.gain.value = 0.2;
      const q = i.createBiquadFilter();
      ((q.type = 'lowpass'),
        (q.frequency.value = 2e3),
        g.connect(_).connect(s),
        g.connect(C).connect(q).connect(U).connect(s),
        g.start(h),
        g.stop(h + p + 0.5),
        o.push(g));
    }
  }
  for (let d = 0; d < cr.length; d++) {
    const f = u + d * xs * 2;
    (Wt(i, s, 'sawtooth', cr[d], f, xs * 1.5, 0.09, 1800),
      Wt(i, s, 'sine', cr[d] * 0.5, f + 0.12, xs * 1.2, 0.05, 600));
  }
}
function j3(i, s) {
  let u = 0,
    o = null;
  const d = [];
  function f() {
    const p = i.currentTime + b3 * Es;
    for (; u < p; ) (x3(i, s, u, d), (u += js));
  }
  return {
    start() {
      ((u = i.currentTime),
        f(),
        (o = setInterval(() => {
          f();
        }, S3)));
    },
    stop() {
      o !== null && (clearInterval(o), (o = null));
      const h = i.currentTime + 0.05;
      for (const p of d)
        try {
          p.stop(h);
        } catch {}
      d.length = 0;
    },
  };
}
function A3(i, s, u) {
  switch (i) {
    case 'title':
      return j3(s, u);
    case 'base':
      return c3(s, u);
    case 'battleNormal':
      return y3(s, u);
    case 'battleBoss':
      return f3(s, u);
  }
}
function T3(i, s) {
  const u = Math.max(1, Math.floor(i.sampleRate * s)),
    o = i.createBuffer(1, u, i.sampleRate),
    d = o.getChannelData(0);
  for (let f = 0; f < u; f++) d[f] = Math.random() * 2 - 1;
  return o;
}
function la(i, s, u, o, d) {
  const f = i.gain;
  (f.setValueAtTime(1e-4, s),
    f.linearRampToValueAtTime(u, s + o),
    f.exponentialRampToValueAtTime(1e-4, s + o + d));
}
function pe(i, s, u, o, d, f, h, p, y) {
  const g = i.createOscillator(),
    _ = i.createGain();
  ((g.type = u),
    g.frequency.setValueAtTime(o, d),
    y !== void 0 && g.frequency.exponentialRampToValueAtTime(Math.max(1e-4, y), d + h + p),
    la(_, d, f, h, p),
    g.connect(_).connect(s),
    g.start(d),
    g.stop(d + h + p + 0.02));
}
function ia(i, s, u, o, d, f) {
  const h = i.createBufferSource();
  h.buffer = T3(i, u);
  const p = i.createGain();
  if ((la(p, o, d, 0.002, u), f)) {
    const y = i.createBiquadFilter();
    ((y.type = f.type),
      (y.frequency.value = f.frequency),
      f.q !== void 0 && (y.Q.value = f.q),
      h.connect(y).connect(p).connect(s));
  } else h.connect(p).connect(s);
  h.start(o);
}
const E3 = (i, s, u) => {
    const o = i.createOscillator(),
      d = i.createOscillator(),
      f = i.createGain();
    ((o.type = 'sawtooth'),
      (d.type = 'sawtooth'),
      o.frequency.setValueAtTime(900, u),
      o.frequency.exponentialRampToValueAtTime(1500, u + 0.5),
      d.frequency.setValueAtTime(905, u),
      d.frequency.exponentialRampToValueAtTime(1510, u + 0.5),
      la(f, u, 0.28, 0.02, 0.5),
      o.connect(f),
      d.connect(f),
      f.connect(s),
      o.start(u),
      d.start(u),
      o.stop(u + 0.55),
      d.stop(u + 0.55));
  },
  N3 = (i, s, u) => {
    for (let o = 0; o < 4; o++) {
      const d = u + o * 0.12;
      (pe(i, s, 'sine', 110, d, 0.4, 0.005, 0.18, 35),
        ia(i, s, 0.08, d, 0.25, { type: 'lowpass', frequency: 700 }));
    }
  },
  M3 = (i, s, u) => {
    (ia(i, s, 0.4, u, 0.45, { type: 'bandpass', frequency: 2500, q: 2 }),
      pe(i, s, 'triangle', 3e3, u, 0.25, 0.005, 0.15, 1500),
      pe(i, s, 'sawtooth', 200, u + 0.05, 0.18, 0.005, 0.3, 80));
  },
  z3 = (i, s, u) => {
    for (let o = 0; o < 5; o++) {
      const d = u + o * 0.07,
        f = i.createOscillator(),
        h = i.createGain(),
        p = i.createBiquadFilter();
      ((f.type = 'square'),
        f.frequency.setValueAtTime(1100 + o * 60, d),
        f.frequency.exponentialRampToValueAtTime(1700 + o * 60, d + 0.04),
        (p.type = 'bandpass'),
        (p.frequency.value = 1600),
        (p.Q.value = 4),
        la(h, d, 0.2, 0.002, 0.06),
        f.connect(p).connect(h).connect(s),
        f.start(d),
        f.stop(d + 0.08));
    }
  },
  C3 = (i, s, u) => {
    (ia(i, s, 0.1, u, 0.25, { type: 'bandpass', frequency: 1500, q: 3 }),
      pe(i, s, 'triangle', 500, u, 0.18, 0.003, 0.08, 200));
  },
  R3 = (i, s, u) => {
    const o = i.createOscillator(),
      d = i.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(80, u),
      o.frequency.linearRampToValueAtTime(160, u + 0.8),
      la(d, u, 0.3, 0.1, 0.7),
      o.connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.85),
      pe(i, s, 'square', 320, u + 0.2, 0.15, 0.02, 0.4));
  },
  w3 = (i, s, u) => {
    (ia(i, s, 0.5, u, 0.45, { type: 'lowpass', frequency: 1200 }),
      pe(i, s, 'sine', 90, u, 0.5, 0.005, 0.6, 30),
      pe(i, s, 'triangle', 1200, u + 0.1, 0.2, 0.02, 0.4, 2400),
      pe(i, s, 'triangle', 1600, u + 0.2, 0.18, 0.02, 0.3, 3200));
  },
  O3 = (i, s, u) => {
    (pe(i, s, 'sine', 180, u, 0.3, 0.005, 0.12, 60),
      ia(i, s, 0.08, u, 0.18, { type: 'bandpass', frequency: 600, q: 2 }));
  },
  D3 = (i, s, u) => {
    const o = i.createOscillator(),
      d = i.createGain();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(220, u),
      o.frequency.exponentialRampToValueAtTime(40, u + 1.2),
      la(d, u, 0.45, 0.02, 1.2),
      o.connect(d).connect(s),
      o.start(u),
      o.stop(u + 1.3),
      ia(i, s, 0.8, u, 0.25, { type: 'lowpass', frequency: 800 }));
  },
  B3 = (i, s, u) => {
    (pe(i, s, 'triangle', 700, u, 0.22, 0.01, 0.18),
      pe(i, s, 'triangle', 1050, u + 0.12, 0.22, 0.01, 0.22));
  },
  L3 = (i, s, u) => {
    (pe(i, s, 'triangle', 600, u, 0.25, 0.01, 0.2),
      pe(i, s, 'triangle', 900, u + 0.12, 0.25, 0.01, 0.2),
      pe(i, s, 'triangle', 1350, u + 0.24, 0.3, 0.01, 0.45),
      pe(i, s, 'sine', 2400, u + 0.3, 0.15, 0.02, 0.5));
  },
  H3 = (i, s, u) => {
    (pe(i, s, 'triangle', 600, u, 0.28, 0.01, 0.18),
      pe(i, s, 'triangle', 750, u + 0.12, 0.28, 0.01, 0.18),
      pe(i, s, 'triangle', 900, u + 0.24, 0.28, 0.01, 0.22),
      pe(i, s, 'triangle', 1200, u + 0.36, 0.32, 0.01, 0.5),
      pe(i, s, 'sine', 2400, u + 0.42, 0.18, 0.02, 0.6));
  },
  q3 = (i, s, u) => {
    (pe(i, s, 'sawtooth', 300, u, 0.3, 0.02, 0.4, 220),
      pe(i, s, 'sawtooth', 220, u + 0.35, 0.3, 0.02, 0.5, 160),
      pe(i, s, 'sawtooth', 160, u + 0.8, 0.3, 0.02, 0.7, 80),
      ia(i, s, 1, u, 0.15, { type: 'lowpass', frequency: 600 }));
  },
  U3 = (i, s, u) => {
    const o = i.createOscillator(),
      d = i.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(700, u),
      o.frequency.exponentialRampToValueAtTime(400, u + 0.4),
      la(d, u, 0.22, 0.02, 0.4),
      o.connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.45),
      ia(i, s, 0.5, u, 0.1, { type: 'highpass', frequency: 2e3 }));
  },
  G3 = (i, s, u) => {
    pe(i, s, 'triangle', 1e3, u, 0.18, 0.003, 0.05);
  },
  V3 = (i, s, u) => {
    (pe(i, s, 'triangle', 880, u, 0.2, 0.005, 0.08),
      pe(i, s, 'triangle', 1320, u + 0.06, 0.2, 0.005, 0.12));
  },
  $3 = (i, s, u) => {
    (pe(i, s, 'square', 260, u, 0.18, 0.005, 0.07),
      pe(i, s, 'square', 200, u + 0.06, 0.18, 0.005, 0.1));
  },
  k3 = (i, s, u) => {
    pe(i, s, 'triangle', 1400, u, 0.12, 0.003, 0.04);
  },
  Y3 = (i, s, u) => {
    const o = i.createOscillator(),
      d = i.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(500, u),
      o.frequency.exponentialRampToValueAtTime(1e3, u + 0.12),
      la(d, u, 0.18, 0.01, 0.12),
      o.connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.15));
  },
  Z3 = (i, s, u) => {
    const o = i.createOscillator(),
      d = i.createGain();
    ((o.type = 'triangle'),
      o.frequency.setValueAtTime(1e3, u),
      o.frequency.exponentialRampToValueAtTime(500, u + 0.1),
      la(d, u, 0.16, 0.005, 0.1),
      o.connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.13));
  },
  X3 = (i, s, u) => {
    (pe(i, s, 'sawtooth', 200, u, 0.3, 0.01, 0.35, 80),
      pe(i, s, 'triangle', 600, u + 0.05, 0.22, 0.01, 0.3, 1200),
      pe(i, s, 'triangle', 1200, u + 0.15, 0.2, 0.01, 0.4, 2e3));
  },
  Q3 = (i, s, u) => {
    const o = i.createOscillator(),
      d = i.createGain(),
      f = i.createBiquadFilter();
    ((o.type = 'sawtooth'),
      o.frequency.setValueAtTime(1600, u),
      o.frequency.exponentialRampToValueAtTime(700, u + 0.08),
      (f.type = 'highpass'),
      (f.frequency.value = 800),
      la(d, u, 0.22, 0.003, 0.09),
      o.connect(f).connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.12));
  },
  K3 = (i, s, u) => {
    (pe(i, s, 'sine', 130, u, 0.5, 0.01, 0.28, 40),
      ia(i, s, 0.12, u, 0.35, { type: 'lowpass', frequency: 900 }));
  },
  J3 = (i, s, u) => {
    (ia(i, s, 0.18, u, 0.4, { type: 'bandpass', frequency: 3500, q: 4 }),
      pe(i, s, 'triangle', 2200, u, 0.15, 0.002, 0.06, 1800));
  },
  W3 = (i, s, u) => {
    const o = i.createOscillator(),
      d = i.createGain(),
      f = i.createBiquadFilter();
    ((o.type = 'square'),
      o.frequency.setValueAtTime(900, u),
      o.frequency.exponentialRampToValueAtTime(1400, u + 0.05),
      (f.type = 'bandpass'),
      (f.frequency.value = 1500),
      (f.Q.value = 3),
      la(d, u, 0.18, 0.002, 0.07),
      o.connect(f).connect(d).connect(s),
      o.start(u),
      o.stop(u + 0.1),
      ia(i, s, 0.05, u, 0.12, { type: 'highpass', frequency: 4e3 }));
  },
  F3 = (i, s, u) => {
    (pe(i, s, 'triangle', 700, u, 0.18, 0.005, 0.05),
      pe(i, s, 'triangle', 1050, u + 0.04, 0.18, 0.005, 0.06));
  },
  I3 = {
    laserShoot: Q3,
    cannonShoot: K3,
    thunderShoot: J3,
    cutterShoot: W3,
    weaponSwitch: F3,
    activeLaser: E3,
    activeCannon: N3,
    activeThunder: M3,
    activeCutter: z3,
    enemyKill: C3,
    bossWarn: R3,
    bossKill: w3,
    machineHit: O3,
    machineDown: D3,
    waveClear: B3,
    tierClear: L3,
    tap: G3,
    purchaseOk: V3,
    reject: $3,
    tabSwitch: k3,
    dialogOpen: Y3,
    dialogClose: Z3,
    launch: X3,
    resultClear: H3,
    resultGameOver: q3,
    resultRetreat: U3,
  },
  P3 = {
    laserShoot: 50,
    cutterShoot: 60,
    thunderShoot: 70,
    cannonShoot: 80,
    enemyKill: 40,
    machineHit: 100,
  };
function f0(i) {
  return Math.max(0, Math.min(1, i));
}
class e5 {
  constructor() {
    ea(this, 'ctx', null);
    ea(this, 'seGain', null);
    ea(this, 'bgmGain', null);
    ea(this, 'masterGain', null);
    ea(this, 'lastPlayAt', new Map());
    ea(this, 'seVolume', 0.7);
    ea(this, 'bgmVolume', 0.5);
    ea(this, 'currentBgm', null);
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
      o = P3[s];
    if (o !== void 0) {
      const f = this.lastPlayAt.get(s) ?? 0;
      if (u - f < o) return;
      this.lastPlayAt.set(s, u);
    }
    const d = I3[s];
    d(this.ctx, this.seGain, this.ctx.currentTime);
  }
  setSeVolume(s) {
    ((this.seVolume = f0(s)), this.seGain && (this.seGain.gain.value = this.seVolume));
  }
  setBgmVolume(s) {
    ((this.bgmVolume = f0(s)), this.bgmGain && (this.bgmGain.gain.value = this.bgmVolume));
  }
  getSeVolume() {
    return this.seVolume;
  }
  getBgmVolume() {
    return this.bgmVolume;
  }
  playBgm(s) {
    var o, d;
    if (
      !this.ctx ||
      !this.bgmGain ||
      (this.ctx.state === 'suspended' && this.ctx.resume(),
      ((o = this.currentBgm) == null ? void 0 : o.id) === s)
    )
      return;
    (d = this.currentBgm) == null || d.track.stop();
    const u = A3(s, this.ctx, this.bgmGain);
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
const Pe = new e5(),
  t5 = 1;
function a5(i, s, u) {
  if (u) return 0;
  const o = (i * s) / 1e3;
  return Math.min(t5, Math.max(0, o));
}
function n5(i, s, u, o) {
  return i < s * 1e3 ? 'continue' : u >= o ? 'advanceTier' : 'advanceWave';
}
const l5 = 50,
  i5 = 50;
function d0(i) {
  const s = i.x - l5,
    u = i.y - i5;
  return Math.sqrt(s * s + u * u);
}
const c5 = 10,
  s5 = 5,
  u5 = 30,
  o5 = {
    laser: 'laserShoot',
    cannon: 'cannonShoot',
    thunder: 'thunderShoot',
    cutter: 'cutterShoot',
  },
  r5 = {
    laser: 'activeLaser',
    cannon: 'activeCannon',
    thunder: 'activeThunder',
    cutter: 'activeCutter',
  };
function f5({ range: i }) {
  const s = ne.useRef(null),
    u = ne.useRef(0),
    o = ne.useRef(0),
    d = ne.useRef(0),
    f = ne.useRef([]),
    h = ne.useRef(0),
    p = ne.useRef(0),
    y = ne.useRef(0),
    g = ne.useRef(0),
    _ = ne.useRef(0),
    [j, T] = ne.useState([]),
    [z, C] = ne.useState([]),
    [U, q] = ne.useState([]),
    F = k((P) => P.isRunActive),
    I = k((P) => P.currentTier),
    de = k((P) => P.currentWave),
    Se = ne.useMemo(() => kx(I), [I]);
  ne.useEffect(() => {
    ((o.current = 0), (d.current = 0), (f.current = []), T([]));
  }, [I, de]);
  const et = ne.useCallback((P) => {
      C((we) => we.filter((ke) => ke.id !== P));
    }, []),
    qe = ne.useCallback((P) => {
      q((we) => we.filter((ke) => ke.id !== P));
    }, []);
  return (
    ne.useEffect(() => {
      if (!F) return;
      const P = (we) => {
        const ke = we - u.current;
        u.current = we;
        const le = k.getState(),
          Te = a5(ke, le.gameSpeed, le.isPaused);
        if (Te > 0) {
          (le.tickCooldowns(Te),
            le.isAutoActive &&
              le.activeCdSec <= 0 &&
              le.triggerActive(u5) &&
              Pe.play(r5[le.currentWeapon]),
            (d.current = o.current),
            (o.current += Te * 1e3));
          const He = Se[le.currentWave - 1];
          if (He != null) {
            const ht = Yx(
              He,
              o.current,
              d.current,
              Math.random,
              () => ((h.current += 1), `e-${le.currentTier}-${le.currentWave}-${h.current}`)
            );
            (ht.length > 0 && (f.current = [...f.current, ...ht]),
              (f.current = f.current.map((Ne) => mx(Ne, Te))));
            const yt = le.runWorkshopLevels.attackMul,
              tt = le.runWorkshopLevels.attackSpeedMul,
              w = $n(yt),
              $ = $n(tt),
              ee = Ex(le.currentWeapon, le.weaponLv),
              ye = Math.min(c5, ee * $),
              ge = ye > 0 ? 1e3 / ye : 1 / 0;
            p.current += Te * 1e3;
            let x = 0;
            const L = 10,
              G = [];
            for (; p.current >= ge && x < L; ) {
              const Ne = f.current
                .map((Ye) => ({ enemy: Ye, dist: d0(Ye.position) }))
                .filter(({ dist: Ye }) => Ye <= i)
                .sort((Ye, Fe) => Ye.dist - Fe.dist)
                .map(({ enemy: Ye }) => Ye);
              if (Ne.length === 0) {
                p.current = Math.min(p.current, ge);
                break;
              }
              ((p.current -= ge), (x += 1), Pe.play(o5[le.currentWeapon]));
              const gt = t0({ machineMaxHp: le.machineMaxHp }),
                Oa = Nx({
                  weapon: le.currentWeapon,
                  weaponLv: le.weaponLv,
                  machine: gt,
                  enemiesInRange: Ne,
                  rng: Math.random,
                  cutterAngleDeg: y.current,
                  attackMul: w,
                });
              if (Oa.hits.length > 0) {
                const Ye = new Map(Oa.hits.map((Fe) => [Fe.enemyId, Fe]));
                f.current = f.current.map((Fe) => {
                  const pt = Ye.get(Fe.id);
                  return pt == null ? Fe : { ...Fe, hp: Fe.hp.sub(pt.damage) };
                });
                for (const Fe of Oa.hits) {
                  const pt = f.current.find((Qn) => Qn.id === Fe.enemyId);
                  ((g.current += 1),
                    G.push({
                      id: `de-${g.current}`,
                      x: (pt == null ? void 0 : pt.position.x) ?? 50,
                      y: (pt == null ? void 0 : pt.position.y) ?? 50,
                      value: Fe.damage,
                      crit: Fe.crit,
                    }));
                }
              }
            }
            G.length > 0 && C((Ne) => [...Ne, ...G]);
            const Y = $n(le.runWorkshopLevels.screwGainMul),
              ae = [],
              ce = [];
            let oe = W.ZERO;
            for (const Ne of f.current)
              if (Ne.hp.lte(W.ZERO)) {
                ((_.current += 1),
                  ae.push({ id: `dh-${_.current}`, x: Ne.position.x, y: Ne.position.y }));
                const gt = Ne.reward.screw;
                (gt > 0 && (oe = oe.add(W.fromNumber(gt * Y))),
                  Pe.play(Ne.kind === 'boss' || Ne.kind === 'miniboss' ? 'bossKill' : 'enemyKill'));
              } else ce.push(Ne);
            (ae.length > 0 && ((f.current = ce), q((Ne) => [...Ne, ...ae])),
              oe.isZero() || le.addScrew(oe));
            const We = t0({ machineMaxHp: le.machineMaxHp });
            let Ee = W.ZERO;
            for (const Ne of f.current)
              if (d0(Ne.position) <= s5) {
                const gt = dx(Ne.atk, We);
                Ee = Ee.add(gt.mulNumber(Te));
              }
            if (!Ee.isZero()) {
              const Ne = le.machineHp;
              le.damageHp(Ee);
              const gt = k.getState().machineHp;
              Pe.play(gt.isZero() && !Ne.isZero() ? 'machineDown' : 'machineHit');
            }
            const ca = n5(o.current, He.durationSec, le.currentWave, Se.length);
            ca === 'advanceWave'
              ? (le.advanceWave(), Pe.play('waveClear'))
              : ca === 'advanceTier' && (le.advanceTier(), Pe.play('tierClear'));
          }
        }
        (T(f.current), (s.current = requestAnimationFrame(P)));
      };
      return (
        (u.current = performance.now()),
        (s.current = requestAnimationFrame(P)),
        () => {
          s.current != null && (cancelAnimationFrame(s.current), (s.current = null));
        }
      );
    }, [F, Se, i]),
    { enemies: j, damageEvents: z, deathEvents: U, onDamageDone: et, onDeathDone: qe }
  );
}
const m0 = 30,
  h0 = 30;
function d5(i, s) {
  return i && s.lte(W.ZERO) ? 'gameover' : null;
}
function m5() {
  const { navigate: i } = pn(),
    s = k((Q) => Q.isRunActive),
    u = k((Q) => Q.screw),
    o = k((Q) => Q.machineHp),
    d = k((Q) => Q.machineMaxHp),
    f = k((Q) => Q.currentTier),
    h = k((Q) => Q.currentWave),
    p = k((Q) => Q.currentWeapon),
    y = k((Q) => Q.activeCdSec),
    g = k((Q) => Q.isAutoActive),
    _ = k((Q) => Q.gameSpeed),
    j = k((Q) => Q.isPaused),
    T = k((Q) => Q.runWorkshopLevels),
    z = k((Q) => Q.bgmVolume),
    C = k((Q) => Q.seVolume),
    U = k((Q) => Q.setBgmVolume),
    q = k((Q) => Q.setSeVolume),
    F = k((Q) => Q.setAutoActive),
    I = k((Q) => Q.switchWeapon),
    de = k((Q) => Q.setPaused),
    Se = k((Q) => Q.setGameSpeed),
    et = k((Q) => Q.upgradeRunWorkshop),
    qe = k((Q) => Q.triggerActive),
    [P, we] = ne.useState(!1),
    [ke, le] = ne.useState(!1),
    [Te, He] = ne.useState(!1),
    {
      enemies: ht,
      damageEvents: yt,
      deathEvents: tt,
      onDamageDone: w,
      onDeathDone: $,
    } = f5({ range: h0 }),
    ee = [],
    ye = { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    ge = d5(s, o),
    [x, L] = ne.useState(null),
    G = x ?? ge,
    Y = G !== null,
    ae = o,
    ce = d.isZero() ? W.fromNumber(1) : d,
    oe = (Q) => {
      (Se(Q), Pe.play('tap'));
    },
    We = () => {
      (de(!j), Pe.play('tap'));
    },
    Ee = () => {
      (le(!0), Pe.play('dialogOpen'));
    },
    ca = () => {
      (He(!0), Pe.play('dialogOpen'));
    },
    Ne = () => {
      (le(!1), L('retreat'), Pe.play('resultRetreat'));
    },
    gt = () => {
      i('preparation');
    },
    Oa = (Q, vn) => {
      const Ls = et(Q, vn);
      Pe.play(Ls ? 'purchaseOk' : 'reject');
    },
    Ye = (Q) => {
      (I(Q), Pe.play('weaponSwitch'));
    },
    Fe = () => {
      if (!qe(m0)) {
        Pe.play('reject');
        return;
      }
      const vn =
        p === 'laser'
          ? 'activeLaser'
          : p === 'cannon'
            ? 'activeCannon'
            : p === 'thunder'
              ? 'activeThunder'
              : 'activeCutter';
      Pe.play(vn);
    },
    pt = { bolt: W.ZERO, alloy: W.ZERO, patches: [] },
    Qn = 30;
  return r.jsxs('div', {
    className: nr.root,
    children: [
      r.jsx(Zn, {
        noScroll: !0,
        variant: 'battle',
        header: r.jsx(iS, {
          hpCurrent: ae,
          hpMax: ce,
          tier: f,
          wave: h,
          totalWaves: Qn,
          secondsRemaining: 20,
          secondsTotal: 30,
          isBossWave: h === Qn,
        }),
        footer: r.jsxs('div', {
          className: nr.battleFooter,
          children: [
            r.jsx(sx, {
              open: P,
              screw: u,
              levels: T,
              onUpgrade: Oa,
              onClose: () => {
                we(!1);
              },
            }),
            r.jsx(kb, {
              screw: u,
              equippedWeapon: p,
              weaponCds: ye,
              activeCd: y,
              activeMax: m0,
              isAutoActive: g,
              onSwitchWeapon: Ye,
              onActivate: Fe,
              onToggleAuto: F,
              gameSpeed: _,
              onSpeedChange: oe,
              isPaused: j,
              onTogglePause: We,
              onOpenMenu: Ee,
              onOpenScreenSaver: ca,
              isWorkshopOpen: P,
              onToggleWorkshop: () => {
                we((Q) => !Q);
              },
            }),
          ],
        }),
        children: r.jsx(nb, {
          enemies: ht,
          damageEvents: yt,
          hitEvents: ee,
          deathEvents: tt,
          onDamageDone: w,
          onDeathDone: $,
          range: h0,
        }),
      }),
      r.jsxs('div', {
        className: nr.overlayLayer,
        'aria-live': 'polite',
        children: [
          r.jsx(US, {
            open: ke,
            bgmVolume: z,
            seVolume: C,
            onBgmChange: U,
            onSeChange: q,
            onRetreat: Ne,
            onClose: () => {
              le(!1);
            },
          }),
          Y &&
            r.jsx(tx, {
              open: Y,
              status: G,
              reachedTier: f,
              reachedWave: h,
              killed: 0,
              elapsedSec: 0,
              reward: pt,
              onClose: gt,
            }),
          r.jsx(fx, {
            open: Te,
            onClose: () => {
              He(!1);
            },
          }),
        ],
      }),
    ],
  });
}
const h5 = [
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
function p0(i, s) {
  switch (i.growthType) {
    case 'multiply':
      return Math.ceil(i.baseValue * Math.pow(i.growthFactor, s));
    case 'linear':
    case 'fixed_step':
      return i.baseValue + i.growthFactor * s;
    case 'asymptotic':
      return 1 - 1 / (1 + i.growthFactor * s);
    case 'asymptotic_half':
      return 0.5 * (1 - 1 / (1 + i.growthFactor * s));
    case 'range_asymptotic': {
      const d = i.growthFactor * s;
      return Math.ceil(150 + 250 * (1 - 1 / (1 + d)));
    }
    default:
      return i.baseValue;
  }
}
function Nr(i, s) {
  return Math.ceil(i.baseCost * Math.pow(i.costGrowth, s));
}
function sr(i, s, u) {
  let o = 0;
  for (let d = 0; d < u && !(i.maxLv != null && s + d >= i.maxLv); d++) o += Nr(i, s + d);
  return o;
}
function p5(i, s, u) {
  let o = 0,
    d = u,
    f = s;
  for (let h = 0; h < 1e4 && !(i.maxLv != null && f >= i.maxLv); h++) {
    const p = W.fromNumber(Nr(i, f));
    if (d.lt(p)) break;
    ((d = d.sub(p)), (f += 1), (o += 1));
  }
  return o;
}
const v5 = '_root_1420p_3',
  y5 = { root: v5 };
function g5() {
  const i = k((d) => d.machineLevels),
    s = k((d) => d.bolt),
    u = k((d) => d.incrementMachineLv),
    o = k((d) => d.spendBolt);
  return r.jsx('div', {
    className: y5.root,
    children: h5.map((d) => {
      const f = i[d.key],
        h = d.maxLv != null && f >= d.maxLv,
        p = p0(d, f),
        y = p0(d, f + 1),
        g = (le) => (d.unit === '%' ? Math.round(le * 1e3) / 10 : le),
        _ = g(p),
        j = g(y),
        T = Nr(d, f),
        z = sr(d, f, 5),
        C = W.fromNumber(T),
        U = W.fromNumber(z),
        q = p5(d, f, s),
        F = d.maxLv != null ? d.maxLv - f : Number.POSITIVE_INFINITY,
        I = Math.min(q, F),
        de = I > 0 ? sr(d, f, I) : T,
        Se = W.fromNumber(de),
        et = s.lt(C),
        qe = s.lt(U) || (d.maxLv != null && f + 5 > d.maxLv),
        P = I < 1,
        we = h
          ? []
          : [
              { amount: '+1', cost: C, disabled: et },
              { amount: '+5', cost: U, disabled: qe },
              { amount: 'MAX', cost: Se, disabled: P },
            ],
        ke = (le) => {
          if (h) return;
          let Te = 0;
          if ((le === '+1' ? (Te = 1) : le === '+5' ? (Te = 5) : le === 'MAX' && (Te = I), Te < 1))
            return;
          d.maxLv != null && (Te = Math.min(Te, d.maxLv - f));
          const He = sr(d, f, Te),
            ht = W.fromNumber(He);
          if (o(ht)) for (let tt = 0; tt < Te; tt++) u(d.key);
        };
      return r.jsx(
        xr,
        {
          title: d.title,
          iconName: d.iconName,
          currentLabel: `Lv ${f}`,
          before: _,
          after: h ? void 0 : j,
          beforeSuffix: d.unit ?? '',
          currency: 'bolt',
          accent: 'primary',
          maxed: h,
          options: we,
          onUpgrade: ke,
        },
        d.key
      );
    }),
  });
}
function _5() {
  const { navigate: i } = pn(),
    s = (u) => {
      i(u);
    };
  return r.jsx(Zn, {
    header: r.jsx(Pi, { title: 'マシン強化', currencies: ['bolt'] }),
    footer: r.jsx(Ii, { active: 'machine', onChange: s }),
    children: r.jsx(g5, {}),
  });
}
const b5 = () => r.jsx('div', { children: r.jsx('h1', { children: 'Not Found' }) }),
  S5 = '_content_9srrg_1',
  x5 = { content: S5 },
  j5 = '_root_1l9jp_1',
  A5 = '_header_1l9jp_8',
  T5 = '_headerTitleRow_1l9jp_15',
  E5 = '_headerCount_1l9jp_21',
  N5 = '_slotGrid_1l9jp_35',
  M5 = '_emptyHint_1l9jp_41',
  Hl = { root: j5, header: A5, headerTitleRow: T5, headerCount: E5, slotGrid: N5, emptyHint: M5 },
  z5 = '_wrapper_16mrg_3',
  C5 = '_filled_16mrg_16',
  R5 = '_empty_16mrg_25',
  w5 = '_locked_16mrg_26',
  O5 = '_slotInner_16mrg_59',
  D5 = '_emptyIcon_16mrg_67',
  B5 = '_emptyLabel_16mrg_74',
  fn = {
    wrapper: z5,
    filled: C5,
    empty: R5,
    locked: w5,
    slotInner: O5,
    emptyIcon: D5,
    emptyLabel: B5,
    'size-sm': '_size-sm_16mrg_86',
    'size-md': '_size-md_16mrg_90',
    'size-lg': '_size-lg_16mrg_94',
  },
  L5 = '_root_12m2l_3',
  H5 = '_selected_12m2l_15',
  q5 = '_merging_12m2l_19',
  U5 = '_locked_12m2l_23',
  G5 = '_disabled_12m2l_28',
  V5 = '_card_12m2l_34',
  $5 = '_tierBadge_12m2l_46',
  k5 = '_count_12m2l_54',
  Y5 = '_countZero_12m2l_74',
  Z5 = '_iconWrap_12m2l_79',
  X5 = '_name_12m2l_90',
  Q5 = '_detail_12m2l_102',
  K5 = '_trigger_12m2l_110',
  J5 = '_effect_12m2l_121',
  W5 = '_mergingBadge_12m2l_133',
  dt = {
    root: L5,
    selected: H5,
    merging: q5,
    locked: U5,
    disabled: G5,
    card: V5,
    tierBadge: $5,
    count: k5,
    countZero: Y5,
    iconWrap: Z5,
    name: X5,
    detail: Q5,
    trigger: K5,
    effect: J5,
    mergingBadge: W5,
    'size-sm': '_size-sm_12m2l_152',
    'size-md': '_size-md_12m2l_162',
    'size-lg': '_size-lg_12m2l_173',
  },
  F5 = { sm: 22, md: 26, lg: 32 },
  v0 = { sm: 38, md: 44, lg: 52 };
function Mr({
  name: i,
  iconName: s,
  tier: u,
  count: o,
  trigger: d,
  effect: f,
  selected: h = !1,
  merging: p = !1,
  locked: y = !1,
  disabled: g = !1,
  size: _ = 'md',
  onClick: j,
}) {
  const T = Math.min(Math.max(1, Math.floor(u)), 5),
    z = `var(--c-patch-t${T})`,
    C = j != null && !g && !y,
    U = h ? { boxShadow: 'var(--glow-cyan-md)' } : p ? { boxShadow: 'var(--glow-purple-md)' } : {},
    q = {
      width: v0[_],
      height: v0[_],
      opacity: y ? 0.35 : 1,
      background: y ? 'var(--c-surface)' : `linear-gradient(135deg, ${z}22, ${z}08)`,
      border: y ? '1px solid var(--c-border-faint)' : `1px solid ${z}55`,
      filter: y ? 'none' : `drop-shadow(0 0 4px ${z}55)`,
    },
    F = {
      background: o >= 2 ? `${z}22` : void 0,
      borderColor: o >= 2 ? z : void 0,
      color: o >= 2 ? z : void 0,
    };
  return r.jsx('div', {
    className: [
      dt.root,
      h ? dt.selected : '',
      p ? dt.merging : '',
      y ? dt.locked : '',
      g ? dt.disabled : '',
      dt[`size-${_}`],
    ]
      .filter(Boolean)
      .join(' '),
    style: U,
    onClick: C ? j : void 0,
    role: C ? 'button' : void 0,
    tabIndex: C ? 0 : void 0,
    onKeyDown: C
      ? (I) => {
          (I.key === 'Enter' || I.key === ' ') && (I.preventDefault(), j == null || j());
        }
      : void 0,
    'aria-pressed': C ? h : void 0,
    'aria-disabled': g || y ? !0 : void 0,
    children: r.jsxs(Xn, {
      variant: 'elevated',
      padding: 'sm',
      interactive: C,
      className: dt.card,
      children: [
        !y &&
          r.jsx('span', {
            className: dt.tierBadge,
            children: r.jsx(Yl, { text: `T${T}`, variant: 'patch-tier', tier: u }),
          }),
        r.jsxs('span', {
          className: [dt.count, o === 0 ? dt.countZero : ''].filter(Boolean).join(' '),
          style: F,
          children: ['×', y ? '?' : o],
        }),
        r.jsx('div', {
          className: dt.iconWrap,
          style: q,
          children: r.jsx(Oe, {
            name: y ? 'close' : s,
            size: F5[_],
            color: y ? 'var(--c-text-disabled)' : z,
          }),
        }),
        r.jsx(V, {
          variant: 'caption',
          color: y ? 'dim' : 'text',
          className: dt.name,
          children: y ? '???' : i,
        }),
        !y &&
          r.jsxs('div', {
            className: dt.detail,
            children: [
              r.jsx('span', { className: dt.trigger, children: d }),
              r.jsx('span', { className: dt.effect, children: f }),
            ],
          }),
        p && r.jsx('span', { className: dt.mergingBadge, children: '合成中' }),
      ],
    }),
  });
}
function Q0({ patch: i = null, slotIndex: s, locked: u = !1, size: o = 'md', onClick: d }) {
  const f = i != null,
    h = d != null && !u,
    p = s != null ? `Slot ${s}` : '',
    y = f
      ? `Slot ${s ?? ''}: ${i.name} (Tier ${i.tier})`
      : u
        ? `Slot ${s ?? ''} (locked)`.trim()
        : `Slot ${s ?? ''} (empty)`.trim(),
    g = f ? fn.filled : u ? fn.locked : fn.empty;
  return r.jsx('div', {
    className: [fn.wrapper, g, fn[`size-${o}`]].filter(Boolean).join(' '),
    role: h ? 'button' : void 0,
    tabIndex: h ? 0 : void 0,
    'aria-label': y,
    'aria-disabled': u ? !0 : void 0,
    onClick: h ? d : void 0,
    onKeyDown: h
      ? (_) => {
          (_.key === 'Enter' || _.key === ' ') && (_.preventDefault(), d == null || d());
        }
      : void 0,
    children:
      f && i != null
        ? r.jsx(Mr, {
            patchId: i.patchId,
            name: i.name,
            iconName: i.iconName,
            tier: i.tier,
            count: i.count,
            trigger: i.trigger,
            effect: i.effect,
            size: o,
          })
        : r.jsxs('div', {
            className: fn.slotInner,
            children: [
              r.jsx('span', {
                className: fn.emptyIcon,
                children: r.jsx(Oe, {
                  name: u ? 'close' : 'plus',
                  size: 28,
                  color: u ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
                }),
              }),
              r.jsx('span', { className: fn.emptyLabel, children: u ? 'LOCKED' : p }),
            ],
          }),
  });
}
function I5(i) {
  return Math.min(1 + i, $l);
}
const P5 = {
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
  e4 = {
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
  t4 = {
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
function a4({ overridePatches: i, overrideEquipped: s, overridePatchSlotsLv: u }) {
  const o = k((C) => C.patches),
    d = k((C) => C.equippedPatches),
    f = k((C) => C.machineLevels.patchSlots),
    h = k((C) => C.unequipPatch),
    p = i ?? o,
    y = s ?? d,
    _ = I5(u ?? f),
    j = (C) => {
      const U = y.get(C);
      if (!U) return null;
      const q = `${U.name}#${U.tier}`,
        F = p.get(q);
      return {
        patchId: q,
        name: U.name,
        iconName: P5[U.name] ?? 'spark',
        tier: U.tier,
        trigger: e4[U.name] ?? '常時',
        effect: t4[U.name] ?? '-',
        count: (F == null ? void 0 : F.count) ?? 0,
      };
    },
    T = (C) => {
      y.get(C) && h(C);
    },
    z = $l - _;
  return r.jsxs('div', {
    className: Hl.root,
    children: [
      r.jsxs('div', {
        className: Hl.header,
        children: [
          r.jsxs('div', {
            className: Hl.headerTitleRow,
            children: [
              r.jsx(V, { variant: 'heading-3', children: '装着スロット' }),
              r.jsxs(V, {
                variant: 'caption',
                color: 'mid',
                className: Hl.headerCount,
                children: [y.size, '/', _],
              }),
            ],
          }),
          r.jsxs(V, {
            variant: 'caption',
            color: 'dim',
            children: ['(', $l, ' スロット中 ', z, ' ロック・', y.size, ' / ', _, ' ', '装着中)'],
          }),
        ],
      }),
      r.jsx('div', {
        className: Hl.slotGrid,
        children: Array.from({ length: $l }, (C, U) => {
          const q = U >= _,
            F = q ? null : j(U);
          return r.jsx(
            Q0,
            { slotIndex: U + 1, patch: F, locked: q, size: 'md', onClick: q ? void 0 : () => T(U) },
            U
          );
        }),
      }),
      y.size === 0 &&
        _ > 0 &&
        r.jsx(V, {
          variant: 'caption',
          color: 'dim',
          className: Hl.emptyHint,
          children: 'パッチ庫からパッチを選んで装着してください',
        }),
    ],
  });
}
const n4 = '_root_16zq4_1',
  l4 = '_header_16zq4_8',
  i4 = '_grid_16zq4_14',
  c4 = '_empty_16zq4_20',
  Zi = { root: n4, header: l4, grid: i4, empty: c4 },
  s4 = {
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
  u4 = {
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
  o4 = {
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
function r4({ overridePatches: i, overrideEquipped: s, selectedId: u, onSelect: o }) {
  const d = k((_) => _.patches),
    f = k((_) => _.equippedPatches),
    h = i ?? d,
    p = s ?? f,
    y = new Set(Array.from(p.values()).map((_) => _.name)),
    g = Array.from(h.values());
  return g.length === 0
    ? r.jsx('div', {
        className: Zi.root,
        children: r.jsx('div', {
          className: Zi.empty,
          children: r.jsx(V, {
            variant: 'body',
            color: 'dim',
            children: 'パッチを所持していません',
          }),
        }),
      })
    : r.jsxs('div', {
        className: Zi.root,
        children: [
          r.jsxs('div', {
            className: Zi.header,
            children: [
              r.jsx(V, { variant: 'heading-3', children: 'パッチ在庫' }),
              r.jsxs(V, { variant: 'caption', color: 'dim', children: [g.length, ' 種類'] }),
            ],
          }),
          r.jsx('div', {
            className: Zi.grid,
            children: g.map((_) => {
              const j = `${_.name}#${_.tier}`,
                T = y.has(_.name);
              return r.jsx(
                Mr,
                {
                  patchId: j,
                  name: _.name,
                  iconName: s4[_.name] ?? 'spark',
                  tier: _.tier,
                  count: _.count,
                  trigger: u4[_.name] ?? '常時',
                  effect: o4[_.name] ?? '-',
                  selected: u === j,
                  locked: T,
                  onClick: o ? () => o(u === j ? null : j) : void 0,
                },
                j
              );
            }),
          }),
        ],
      });
}
const f4 = '_root_1svx2_1',
  d4 = '_header_1svx2_8',
  m4 = '_tierControl_1svx2_14',
  h4 = '_tierStepperRow_1svx2_24',
  p4 = '_mergeList_1svx2_30',
  v4 = '_empty_1svx2_36',
  ql = { root: f4, header: d4, tierControl: m4, tierStepperRow: h4, mergeList: p4, empty: v4 },
  y4 = '_stepper_1ouvh_1',
  g4 = '_disabled_1ouvh_6',
  _4 = '_btn_1ouvh_11',
  b4 = '_value_1ouvh_38',
  Ul = {
    stepper: y4,
    disabled: g4,
    btn: _4,
    value: b4,
    'size-sm': '_size-sm_1ouvh_45',
    'size-md': '_size-md_1ouvh_55',
  },
  S4 = ({
    value: i,
    min: s,
    max: u,
    step: o = 1,
    onChange: d,
    size: f = 'md',
    disabled: h = !1,
  }) => {
    const p = i - o >= s,
      y = i + o <= u,
      g = () => {
        h || !p || d(Math.max(s, i - o));
      },
      _ = () => {
        h || !y || d(Math.min(u, i + o));
      };
    return r.jsxs('div', {
      className: [Ul.stepper, Ul[`size-${f}`], h ? Ul.disabled : ''].join(' '),
      role: 'group',
      'aria-label': '数値増減',
      children: [
        r.jsx('button', {
          type: 'button',
          className: Ul.btn,
          onClick: g,
          disabled: h || !p,
          'aria-label': '減少',
          children: '−',
        }),
        r.jsx('span', {
          className: Ul.value,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          children: i,
        }),
        r.jsx('button', {
          type: 'button',
          className: Ul.btn,
          onClick: _,
          disabled: h || !y,
          'aria-label': '増加',
          children: '＋',
        }),
      ],
    });
  },
  mr = 5,
  x4 = {
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
function K0(i, s) {
  const u = [];
  for (const o of i.values())
    o.tier < s &&
      o.count >= 2 &&
      u.push({ name: o.name, tier: o.tier, count: o.count, iconName: x4[o.name] ?? 'spark' });
  return u.sort((o, d) => o.tier - d.tier || o.name.localeCompare(d.name));
}
function j4(i, s) {
  let u = new Map(i),
    o = !0;
  for (; o; ) {
    o = !1;
    for (const d of Array.from(u.values())) {
      if (d.tier >= s || d.count < 2 || d.tier >= mr) continue;
      const f = `${d.name}#${d.tier}`,
        h = Math.floor(d.count / 2),
        p = d.count % 2,
        y = d.tier + 1,
        g = `${d.name}#${y}`,
        _ = u.get(g),
        j = ((_ == null ? void 0 : _.count) ?? 0) + h;
      ((u = new Map(u)),
        p === 0 ? u.delete(f) : u.set(f, { ...d, count: p }),
        u.set(g, { name: d.name, tier: y, count: j }),
        (o = !0));
    }
  }
  return u;
}
function A4({ overridePatches: i }) {
  const s = k((T) => T.patches),
    u = k((T) => T.addPatch),
    o = k((T) => T.consumePatch),
    d = k((T) => T.pruneEmptyPatches),
    f = i ?? s,
    h = Math.max(1, ...Array.from(f.values()).map((T) => T.tier)),
    [p, y] = ne.useState(Math.min(h, mr - 1)),
    g = K0(f, p + 1),
    _ = g.length > 0,
    j = () => {
      if (i) return;
      const T = j4(f, p + 1);
      for (const [z, C] of f) {
        const U = T.get(z),
          q = (U == null ? void 0 : U.count) ?? 0;
        q < C.count && o(C.name, C.tier, C.count - q);
      }
      for (const [z, C] of T) {
        const U = f.get(z),
          q = (U == null ? void 0 : U.count) ?? 0;
        C.count > q && u(C.name, C.tier, C.count - q);
      }
      d();
    };
  return r.jsxs('div', {
    className: ql.root,
    children: [
      r.jsx('div', {
        className: ql.header,
        children: r.jsx(V, { variant: 'heading-3', children: 'パッチ合成' }),
      }),
      r.jsxs('div', {
        className: ql.tierControl,
        children: [
          r.jsx(V, { variant: 'label', color: 'mid', children: '合成上限 Tier' }),
          r.jsxs('div', {
            className: ql.tierStepperRow,
            children: [
              r.jsx(S4, { value: p, min: 1, max: mr - 1, onChange: y }),
              r.jsxs(V, {
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
                className: ql.mergeList,
                children: g.map((T) =>
                  r.jsx(
                    Mr,
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
              r.jsx(qt, {
                label: `一括合成 (${g.length} 種類)`,
                variant: 'primary',
                fullWidth: !0,
                onClick: j,
              }),
            ],
          })
        : r.jsxs('div', {
            className: ql.empty,
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
function T4(i) {
  return Math.min(1 + i, $l);
}
function E4() {
  const { navigate: i } = pn(),
    [s, u] = ne.useState('equip'),
    o = k((z) => z.equippedPatches),
    d = k((z) => z.patches),
    f = k((z) => z.machineLevels.patchSlots),
    h = T4(f),
    p = o.size,
    y = d.size,
    g = K0(d, 5).length,
    _ = (z) => {
      i(z);
    },
    j = () => {
      i('preparation');
    },
    T = [
      { key: 'equip', label: '装着', badge: `${p}/${h}` },
      { key: 'inventory', label: '所持', badge: y > 0 ? y : void 0 },
      { key: 'merge', label: '合成', badge: g > 0 ? g : void 0 },
    ];
  return r.jsx(Zn, {
    header: r.jsx(Pi, {
      title: 'パッチ庫',
      subtitle: `装着 ${p}/${h} ・ 在庫 ${y} 種`,
      onBack: j,
      currencies: [],
      tabBar: r.jsx(Ns, { tabs: T, value: s, onChange: u, variant: 'underline', fullWidth: !0 }),
    }),
    footer: r.jsx(Ii, { active: 'patches', onChange: _ }),
    children: r.jsxs('div', {
      className: x5.content,
      children: [
        s === 'equip' && r.jsx(a4, {}),
        s === 'inventory' && r.jsx(r4, {}),
        s === 'merge' && r.jsx(A4, {}),
      ],
    }),
  });
}
const N4 = '_footer_qoo97_1',
  M4 = '_tabPanel_qoo97_7',
  y0 = { footer: N4, tabPanel: M4 },
  z4 = '_wrapper_1lf9s_1',
  C4 = '_header_1lf9s_7',
  R4 = '_headerLabel_1lf9s_13',
  w4 = '_empty_1lf9s_18',
  O4 = '_emptyIcon_1lf9s_29',
  D4 = '_grid_1lf9s_33',
  B4 = '_note_1lf9s_39',
  qn = { wrapper: z4, header: C4, headerLabel: R4, empty: w4, emptyIcon: O4, grid: D4, note: B4 },
  L4 = {
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
function H4({ onOpenPatchScreen: i }) {
  const s = k((h) => h.equippedPatches),
    u = k((h) => h.machineLevels.patchSlots),
    o = Math.min(1 + u, $l),
    d = [];
  for (let h = 0; h < o; h++) {
    const p = s.get(h);
    if (p != null) {
      const y = L4[p.name],
        g = {
          patchId: `${p.name}#${p.tier}`,
          name: y.name,
          iconName: y.iconName,
          tier: p.tier,
          trigger: y.trigger,
          effect: y.effect,
          count: 1,
        };
      d.push({ kind: 'filled', patch: g, idx: h + 1 });
    } else d.push({ kind: 'empty', patch: null, idx: h + 1 });
  }
  const f = [...s.values()].length;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '装着パッチ',
    className: qn.wrapper,
    children: [
      r.jsxs('div', {
        className: qn.header,
        children: [
          r.jsxs(V, {
            variant: 'caption',
            color: 'mid',
            className: qn.headerLabel,
            children: ['装着 ', f, ' / ', o],
          }),
          i != null &&
            r.jsx(qt, {
              label: '装備変更',
              variant: 'ghost',
              size: 'sm',
              iconRight: r.jsx(Oe, { name: 'chevron-right', size: 14 }),
              onClick: i,
            }),
        ],
      }),
      f === 0
        ? r.jsxs('div', {
            className: qn.empty,
            children: [
              r.jsx('span', {
                className: qn.emptyIcon,
                children: r.jsx(Oe, { name: 'plus', size: 24, color: 'var(--c-text-dim)' }),
              }),
              r.jsx(V, {
                variant: 'body',
                color: 'dim',
                align: 'center',
                children: 'パッチが装着されていません',
              }),
              i != null &&
                r.jsx(qt, {
                  label: 'パッチ庫を開く',
                  variant: 'secondary',
                  size: 'sm',
                  onClick: i,
                }),
            ],
          })
        : r.jsx('div', {
            className: qn.grid,
            children: d.map((h, p) =>
              r.jsx(Q0, { patch: h.patch, slotIndex: h.idx, onClick: i }, p)
            ),
          }),
      r.jsx(V, {
        variant: 'caption',
        color: 'dim',
        align: 'center',
        as: 'p',
        className: qn.note,
        children: '変更はパッチ庫で行えます',
      }),
    ],
  });
}
const q4 = '_wrapper_iebuz_1',
  U4 = '_header_iebuz_7',
  G4 = '_grid_iebuz_12',
  ur = { wrapper: q4, header: U4, grid: G4 },
  V4 = [
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
function $4({ selectedWeapon: i, onSelect: s }) {
  const u = k((h) => h.initialWeapon),
    o = k((h) => h.setInitialWeapon),
    d = i ?? u,
    f = (h) => {
      (o(h), s == null || s(h));
    };
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': '初期武器選択',
    className: ur.wrapper,
    children: [
      r.jsx('div', {
        className: ur.header,
        children: r.jsx(V, {
          variant: 'caption',
          color: 'mid',
          children: 'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。',
        }),
      }),
      r.jsx('div', {
        className: ur.grid,
        children: V4.map((h) =>
          r.jsx(
            D0,
            {
              weapon: h.kind,
              name: h.name,
              description: h.description,
              stats: h.stats,
              layout: 'tall',
              active: h.kind === d,
              onClick: () => f(h.kind),
            },
            h.kind
          )
        ),
      }),
    ],
  });
}
const k4 = '_wrapper_1rg1e_1',
  Y4 = '_sticky_1rg1e_15',
  Z4 = '_summary_1rg1e_19',
  X4 = '_weaponInfo_1rg1e_29',
  Q4 = '_patchInfo_1rg1e_37',
  Xi = { wrapper: k4, sticky: Y4, summary: Z4, weaponInfo: X4, patchInfo: Q4 };
function K4({
  tier: i,
  weaponKind: s,
  patchCount: u = 0,
  disabled: o = !1,
  onLaunch: d,
  sticky: f = !0,
}) {
  return r.jsxs('div', {
    role: 'group',
    'aria-label': '出撃',
    className: [Xi.wrapper, f ? Xi.sticky : ''].filter(Boolean).join(' '),
    children: [
      r.jsxs('div', {
        className: Xi.summary,
        children: [
          i != null && r.jsx(Yl, { variant: 'tier', tier: i, size: 'sm' }),
          s != null &&
            r.jsxs('span', {
              className: Xi.weaponInfo,
              children: [
                r.jsx(Oe, { name: s, size: 14 }),
                r.jsx(V, { variant: 'label', color: 'primary', children: s.toUpperCase() }),
              ],
            }),
          r.jsxs('span', {
            className: Xi.patchInfo,
            children: [
              r.jsx(Oe, { name: 'spark', size: 12, color: 'var(--c-text-dim)' }),
              r.jsxs(V, { variant: 'numeric-s', color: 'dim', children: ['PATCH ×', u] }),
            ],
          }),
        ],
      }),
      r.jsx(qt, {
        label: '出撃',
        variant: 'primary',
        size: 'lg',
        fullWidth: !0,
        disabled: o,
        iconLeft: r.jsx(Oe, { name: 'tower', size: 18 }),
        onClick: d,
      }),
    ],
  });
}
const J4 = '_wrapper_1ul9l_1',
  W4 = '_header_1ul9l_7',
  F4 = '_grid_1ul9l_14',
  I4 = '_tierBtn_1ul9l_20',
  P4 = '_active_1ul9l_35',
  ej = '_tierLabel_1ul9l_50',
  tj = '_frontierLabel_1ul9l_61',
  Un = {
    wrapper: J4,
    header: W4,
    grid: F4,
    tierBtn: I4,
    active: P4,
    tierLabel: ej,
    frontierLabel: tj,
  };
function aj({ selectedTier: i, onSelect: s }) {
  const u = k((h) => h.highestTier),
    o = Math.max(1, u),
    d = [];
  for (let h = 1; h <= o; h++) d.push(h);
  const f = (h) => `var(--c-tier-${Math.max(1, Math.min(10, h))})`;
  return r.jsxs('div', {
    role: 'tabpanel',
    'aria-label': 'Tier 選択',
    className: Un.wrapper,
    children: [
      r.jsxs('div', {
        className: Un.header,
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
        className: Un.grid,
        children: d.map((h) => {
          const p = h === i,
            y = h === o,
            g = f(h);
          return r.jsxs(
            'button',
            {
              type: 'button',
              'aria-pressed': p,
              'data-active': p,
              'data-frontier': y,
              className: [Un.tierBtn, p ? Un.active : ''].filter(Boolean).join(' '),
              style: { '--tier-color': g },
              onClick: () => (s == null ? void 0 : s(h)),
              children: [
                r.jsxs('span', { className: Un.tierLabel, children: ['T', h] }),
                y && !p && r.jsx('span', { className: Un.frontierLabel, children: 'FRONTIER' }),
              ],
            },
            h
          );
        }),
      }),
    ],
  });
}
const nj = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];
function lj(i) {
  const { initialSelectedTier: s } = i,
    { navigate: u } = pn(),
    [o, d] = ne.useState('tier'),
    f = k((C) => C.highestTier),
    [h, p] = ne.useState(s ?? Math.max(1, f)),
    y = k((C) => C.initialWeapon),
    _ = [...k((C) => C.equippedPatches).values()].length;
  function j() {
    u('battle');
  }
  const T = r.jsx(Pi, {
      title: '出撃準備',
      currencies: ['screw', 'bolt', 'alloy'],
      tabBar: r.jsx(Ns, { tabs: nj, value: o, onChange: d, variant: 'underline', fullWidth: !0 }),
    }),
    z = r.jsxs('div', {
      className: y0.footer,
      children: [
        r.jsx(K4, { tier: h, weaponKind: y, patchCount: _, sticky: !1, onLaunch: j }),
        r.jsx(Ii, { active: 'preparation', onChange: (C) => u(C) }),
      ],
    });
  return r.jsx(Zn, {
    header: T,
    footer: z,
    children: r.jsxs('div', {
      className: y0.tabPanel,
      children: [
        o === 'tier' && r.jsx(aj, { selectedTier: h, onSelect: p }),
        o === 'weapon' && r.jsx($4, {}),
        o === 'patches' && r.jsx(H4, { onOpenPatchScreen: () => u('patches') }),
      ],
    }),
  });
}
const ij = '_content_8gsha_1',
  cj = { content: ij },
  sj = '_root_1b7n9_1',
  uj = '_header_1b7n9_8',
  oj = '_storageCard_1b7n9_13',
  rj = '_storageRow_1b7n9_23',
  fj = '_divider_1b7n9_29',
  dj = '_section_1b7n9_34',
  mj = '_dangerSection_1b7n9_40',
  hj = '_sectionHeader_1b7n9_50',
  Jt = {
    root: sj,
    header: uj,
    storageCard: oj,
    storageRow: rj,
    divider: fj,
    section: dj,
    dangerSection: mj,
    sectionHeader: hj,
  },
  pj = '_wrapper_11b89_1',
  vj = '_disabled_11b89_6',
  yj = '_hiddenInput_11b89_11',
  gj = '_btn_11b89_15',
  _j = '_fileName_11b89_41',
  Qi = { wrapper: pj, disabled: vj, hiddenInput: yj, btn: gj, fileName: _j },
  bj = ({
    accept: i = 'application/json',
    onChange: s,
    label: u = 'ファイルを選択',
    disabled: o = !1,
  }) => {
    const d = ne.useRef(null),
      [f, h] = ne.useState(null),
      p = () => {
        var g;
        o || (g = d.current) == null || g.click();
      },
      y = (g) => {
        var j;
        const _ = ((j = g.target.files) == null ? void 0 : j[0]) ?? null;
        (h((_ == null ? void 0 : _.name) ?? null), s(_), d.current && (d.current.value = ''));
      };
    return r.jsxs('div', {
      className: [Qi.wrapper, o ? Qi.disabled : ''].join(' '),
      children: [
        r.jsx('input', {
          ref: d,
          type: 'file',
          accept: i,
          className: Qi.hiddenInput,
          onChange: y,
          disabled: o,
          'aria-hidden': 'true',
          tabIndex: -1,
        }),
        r.jsx('button', {
          type: 'button',
          className: Qi.btn,
          onClick: p,
          disabled: o,
          children: u,
        }),
        f && r.jsx('span', { className: Qi.fileName, title: f, children: f }),
      ],
    });
  };
function Sj({ storageInfo: i, onExport: s, onImport: u, onReset: o }) {
  const [d, f] = ne.useState(!1),
    [h, p] = ne.useState(!1),
    [y, g] = ne.useState(!1),
    _ = async () => {
      if (s) {
        g(!0);
        try {
          await s();
        } finally {
          g(!1);
        }
      }
    },
    j = async (z) => {
      if (!(!z || !u)) {
        p(!0);
        try {
          await u(z);
        } finally {
          p(!1);
        }
      }
    },
    T = async () => {
      (f(!1), o && (await o()));
    };
  return r.jsxs('div', {
    className: Jt.root,
    children: [
      r.jsx('div', {
        className: Jt.header,
        children: r.jsx(V, { variant: 'heading-3', children: 'データ管理' }),
      }),
      i &&
        r.jsxs('div', {
          className: Jt.storageCard,
          children: [
            r.jsx(V, { variant: 'label', color: 'mid', children: 'ストレージ使用量' }),
            r.jsxs('div', {
              className: Jt.storageRow,
              children: [
                r.jsx(V, { variant: 'numeric-l', children: i.usedKb }),
                r.jsx(V, { variant: 'caption', color: 'dim', children: 'KB' }),
              ],
            }),
            r.jsxs(V, {
              variant: 'caption',
              color: 'dim',
              children: ['セーブスロット: ', i.slots, ' / 最終保存: ', i.lastSavedAt],
            }),
          ],
        }),
      r.jsx('div', { className: Jt.divider }),
      r.jsxs('div', {
        className: Jt.section,
        children: [
          r.jsxs('div', {
            className: Jt.sectionHeader,
            children: [
              r.jsx(V, { variant: 'label', color: 'mid', children: 'エクスポート' }),
              r.jsx(V, {
                variant: 'caption',
                color: 'dim',
                children: 'セーブデータを JSON ファイルとしてダウンロード',
              }),
            ],
          }),
          r.jsx(qt, {
            label: y ? 'エクスポート中...' : 'エクスポート',
            variant: 'secondary',
            fullWidth: !0,
            onClick: _,
            disabled: y || !s,
          }),
        ],
      }),
      r.jsxs('div', {
        className: Jt.section,
        children: [
          r.jsxs('div', {
            className: Jt.sectionHeader,
            children: [
              r.jsx(V, { variant: 'label', color: 'mid', children: 'インポート' }),
              r.jsx(V, {
                variant: 'caption',
                color: 'dim',
                children: 'JSON ファイルからセーブデータを復元（上書き）',
              }),
            ],
          }),
          r.jsx(bj, {
            accept: 'application/json',
            onChange: j,
            label: h ? 'インポート中...' : 'ファイルを選択してインポート',
            disabled: h || !u,
          }),
        ],
      }),
      r.jsx('div', { className: Jt.divider }),
      r.jsxs('div', {
        className: Jt.dangerSection,
        children: [
          r.jsxs('div', {
            className: Jt.sectionHeader,
            children: [
              r.jsx(V, { variant: 'label', color: 'mid', children: 'データリセット' }),
              r.jsx(V, {
                variant: 'caption',
                color: 'dim',
                children: 'すべてのデータを削除します。この操作は取り消せません。',
              }),
            ],
          }),
          r.jsx(qt, {
            label: '全データをリセット',
            variant: 'danger',
            fullWidth: !0,
            onClick: () => f(!0),
            disabled: !o,
          }),
        ],
      }),
      r.jsx(q0, {
        open: d,
        title: 'データをリセットしますか？',
        message: 'すべてのセーブデータが削除されます。この操作は取り消せません。',
        iconName: 'skull',
        confirmLabel: 'リセットする',
        cancelLabel: 'キャンセル',
        variant: 'danger',
        onConfirm: T,
        onCancel: () => f(!1),
      }),
    ],
  });
}
const xj = '_root_1rbig_1',
  jj = '_header_1rbig_8',
  Aj = '_section_1rbig_13',
  Tj = '_sectionHeader_1rbig_20',
  Ej = '_divider_1rbig_26',
  Gl = { root: xj, header: jj, section: Aj, sectionHeader: Tj, divider: Ej },
  Nj = '_wrapper_16nmz_9',
  Mj = '_disabled_16nmz_15',
  zj = '_off_16nmz_31',
  Cj = '_on_16nmz_35',
  Rj = '_accent_primary_16nmz_35',
  wj = '_accent_secondary_16nmz_39',
  Oj = '_accent_success_16nmz_43',
  Dj = '_accent_disabled_16nmz_47',
  Bj = '_size_md_16nmz_56',
  Lj = '_knob_16nmz_60',
  Hj = '_size_sm_16nmz_70',
  qj = '_labelGroup_16nmz_93',
  Uj = '_label_16nmz_93',
  Gj = '_description_16nmz_106',
  na = {
    wrapper: Nj,
    disabled: Mj,
    switch: '_switch_16nmz_22',
    off: zj,
    on: Cj,
    accent_primary: Rj,
    accent_secondary: wj,
    accent_success: Oj,
    accent_disabled: Dj,
    size_md: Bj,
    knob: Lj,
    size_sm: Hj,
    labelGroup: qj,
    label: Uj,
    description: Gj,
  },
  J0 = ({
    checked: i,
    onChange: s,
    disabled: u = !1,
    label: o,
    description: d,
    accent: f = 'primary',
    size: h = 'md',
  }) => {
    const p = u || f === 'disabled',
      y = () => {
        p || s(!i);
      };
    return r.jsxs('label', {
      className: [na.wrapper, p ? na.disabled : ''].filter(Boolean).join(' '),
      'aria-disabled': p,
      children: [
        r.jsx('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': i,
          'aria-disabled': p,
          className: [na.switch, i ? na.on : na.off, na[`size_${h}`], na[`accent_${f}`]]
            .filter(Boolean)
            .join(' '),
          onClick: y,
          disabled: p,
          children: r.jsx('span', { className: na.knob }),
        }),
        (o || d) &&
          r.jsxs('span', {
            className: na.labelGroup,
            children: [
              o && r.jsx('span', { className: na.label, children: o }),
              d && r.jsx('span', { className: na.description, children: d }),
            ],
          }),
      ],
    });
  },
  Vj = [
    { label: '×1', value: 1 },
    { label: '×2', value: 2 },
    { label: '×3', value: 3 },
  ];
function $j({ overrideVibration: i, overrideSpeed: s, onVibrationChange: u, onSpeedChange: o }) {
  const d = k((T) => T.vibrationEnabled),
    f = k((T) => T.defaultGameSpeed),
    h = k((T) => T.setVibrationEnabled),
    p = k((T) => T.setDefaultGameSpeed),
    y = i ?? d,
    g = s ?? f,
    _ = (T) => {
      u ? u(T) : h(T);
    },
    j = (T) => {
      o ? o(T) : p(T);
    };
  return r.jsxs('div', {
    className: Gl.root,
    children: [
      r.jsx('div', {
        className: Gl.header,
        children: r.jsx(V, { variant: 'heading-3', children: 'ゲーム設定' }),
      }),
      r.jsx('div', {
        className: Gl.section,
        children: r.jsx(J0, {
          checked: y,
          onChange: _,
          label: 'バイブレーション',
          description: '操作時に端末を振動させます',
        }),
      }),
      r.jsx('div', { className: Gl.divider }),
      r.jsxs('div', {
        className: Gl.section,
        children: [
          r.jsxs('div', {
            className: Gl.sectionHeader,
            children: [
              r.jsx(V, { variant: 'label', color: 'mid', children: '初期速度倍率' }),
              r.jsx(V, { variant: 'caption', color: 'dim', children: 'ゲーム開始時の速度' }),
            ],
          }),
          r.jsx(H0, { options: Vj, value: g, onChange: j }),
        ],
      }),
    ],
  });
}
const kj = '_root_nuc5y_2',
  Yj = '_muteRow_nuc5y_9',
  Zj = '_muteLabelGroup_nuc5y_16',
  Xj = '_sliderRow_nuc5y_24',
  Qj = '_muted_nuc5y_29',
  Kj = '_sliderIcon_nuc5y_29',
  Jj = '_sliderArea_nuc5y_41',
  Wj = '_sliderValue_nuc5y_46',
  mn = {
    root: kj,
    muteRow: Yj,
    muteLabelGroup: Zj,
    sliderRow: Xj,
    muted: Qj,
    sliderIcon: Kj,
    sliderArea: Jj,
    sliderValue: Wj,
  };
function g0({ label: i, iconName: s, value: u, muted: o, onChange: d }) {
  return r.jsx(Xn, {
    variant: 'sunken',
    padding: 'md',
    children: r.jsxs('div', {
      className: [mn.sliderRow, o ? mn.muted : ''].filter(Boolean).join(' '),
      children: [
        r.jsx('span', { className: mn.sliderIcon, children: r.jsx(Oe, { name: s, size: 16 }) }),
        r.jsx(V, { variant: 'label', color: o ? 'dim' : 'mid', children: i }),
        r.jsx('div', {
          className: mn.sliderArea,
          children: r.jsx(dr, { value: u, min: 0, max: 1, step: 0.01, onChange: d, disabled: o }),
        }),
        r.jsx('span', {
          className: mn.sliderValue,
          children: r.jsx(hn, {
            value: Math.round(u * 100),
            size: 'sm',
            accentColor: o ? 'dim' : 'text',
          }),
        }),
      ],
    }),
  });
}
function Fj({
  overrideBgmVolume: i,
  overrideSeVolume: s,
  overrideMute: u,
  onBgmChange: o,
  onSeChange: d,
  onMuteChange: f,
}) {
  const h = k((q) => q.bgmVolume),
    p = k((q) => q.seVolume),
    y = k((q) => q.setBgmVolume),
    g = k((q) => q.setSeVolume),
    _ = i ?? h,
    j = s ?? p,
    T = u ?? !1,
    z = (q) => {
      o ? o(q) : (y(q), Pe.setBgmVolume(T ? 0 : q));
    },
    C = (q) => {
      d ? d(q) : (g(q), Pe.setSeVolume(T ? 0 : q));
    },
    U = (q) => {
      f ? f(q) : (Pe.setBgmVolume(q ? 0 : _), Pe.setSeVolume(q ? 0 : j));
    };
  return r.jsxs('div', {
    className: mn.root,
    role: 'tabpanel',
    'aria-label': 'サウンド設定',
    children: [
      r.jsx(Xn, {
        variant: 'sunken',
        padding: 'md',
        children: r.jsxs('div', {
          className: mn.muteRow,
          children: [
            r.jsxs('span', {
              className: mn.muteLabelGroup,
              children: [
                r.jsx(V, { variant: 'label', color: 'mid', children: 'ミュート' }),
                r.jsx(V, { variant: 'caption', color: 'dim', children: '全サウンドを一時停止' }),
              ],
            }),
            r.jsx(J0, { checked: T, onChange: U, accent: 'primary' }),
          ],
        }),
      }),
      r.jsx(g0, { label: 'BGM', iconName: 'play', value: _, muted: T, onChange: z }),
      r.jsx(g0, { label: 'SE', iconName: 'spark', value: j, muted: T, onChange: C }),
    ],
  });
}
const hr = (i, s) => s.some((u) => i instanceof u);
let _0, b0;
function Ij() {
  return _0 || (_0 = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Pj() {
  return (
    b0 ||
    (b0 = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const pr = new WeakMap(),
  or = new WeakMap(),
  Ds = new WeakMap();
function eA(i) {
  const s = new Promise((u, o) => {
    const d = () => {
        (i.removeEventListener('success', f), i.removeEventListener('error', h));
      },
      f = () => {
        (u(kn(i.result)), d());
      },
      h = () => {
        (o(i.error), d());
      };
    (i.addEventListener('success', f), i.addEventListener('error', h));
  });
  return (Ds.set(s, i), s);
}
function tA(i) {
  if (pr.has(i)) return;
  const s = new Promise((u, o) => {
    const d = () => {
        (i.removeEventListener('complete', f),
          i.removeEventListener('error', h),
          i.removeEventListener('abort', h));
      },
      f = () => {
        (u(), d());
      },
      h = () => {
        (o(i.error || new DOMException('AbortError', 'AbortError')), d());
      };
    (i.addEventListener('complete', f),
      i.addEventListener('error', h),
      i.addEventListener('abort', h));
  });
  pr.set(i, s);
}
let vr = {
  get(i, s, u) {
    if (i instanceof IDBTransaction) {
      if (s === 'done') return pr.get(i);
      if (s === 'store')
        return u.objectStoreNames[1] ? void 0 : u.objectStore(u.objectStoreNames[0]);
    }
    return kn(i[s]);
  },
  set(i, s, u) {
    return ((i[s] = u), !0);
  },
  has(i, s) {
    return i instanceof IDBTransaction && (s === 'done' || s === 'store') ? !0 : s in i;
  },
};
function W0(i) {
  vr = i(vr);
}
function aA(i) {
  return Pj().includes(i)
    ? function (...s) {
        return (i.apply(yr(this), s), kn(this.request));
      }
    : function (...s) {
        return kn(i.apply(yr(this), s));
      };
}
function nA(i) {
  return typeof i == 'function'
    ? aA(i)
    : (i instanceof IDBTransaction && tA(i), hr(i, Ij()) ? new Proxy(i, vr) : i);
}
function kn(i) {
  if (i instanceof IDBRequest) return eA(i);
  if (or.has(i)) return or.get(i);
  const s = nA(i);
  return (s !== i && (or.set(i, s), Ds.set(s, i)), s);
}
const yr = (i) => Ds.get(i);
function lA(i, s, { blocked: u, upgrade: o, blocking: d, terminated: f } = {}) {
  const h = indexedDB.open(i, s),
    p = kn(h);
  return (
    o &&
      h.addEventListener('upgradeneeded', (y) => {
        o(kn(h.result), y.oldVersion, y.newVersion, kn(h.transaction), y);
      }),
    u && h.addEventListener('blocked', (y) => u(y.oldVersion, y.newVersion, y)),
    p
      .then((y) => {
        (f && y.addEventListener('close', () => f()),
          d && y.addEventListener('versionchange', (g) => d(g.oldVersion, g.newVersion, g)));
      })
      .catch(() => {}),
    p
  );
}
const iA = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  cA = ['put', 'add', 'delete', 'clear'],
  rr = new Map();
function S0(i, s) {
  if (!(i instanceof IDBDatabase && !(s in i) && typeof s == 'string')) return;
  if (rr.get(s)) return rr.get(s);
  const u = s.replace(/FromIndex$/, ''),
    o = s !== u,
    d = cA.includes(u);
  if (!(u in (o ? IDBIndex : IDBObjectStore).prototype) || !(d || iA.includes(u))) return;
  const f = async function (h, ...p) {
    const y = this.transaction(h, d ? 'readwrite' : 'readonly');
    let g = y.store;
    return (o && (g = g.index(p.shift())), (await Promise.all([g[u](...p), d && y.done]))[0]);
  };
  return (rr.set(s, f), f);
}
W0((i) => ({
  ...i,
  get: (s, u, o) => S0(s, u) || i.get(s, u, o),
  has: (s, u) => !!S0(s, u) || i.has(s, u),
}));
const sA = ['continue', 'continuePrimaryKey', 'advance'],
  x0 = {},
  gr = new WeakMap(),
  F0 = new WeakMap(),
  uA = {
    get(i, s) {
      if (!sA.includes(s)) return i[s];
      let u = x0[s];
      return (
        u ||
          (u = x0[s] =
            function (...o) {
              gr.set(this, F0.get(this)[s](...o));
            }),
        u
      );
    },
  };
async function* oA(...i) {
  let s = this;
  if ((s instanceof IDBCursor || (s = await s.openCursor(...i)), !s)) return;
  s = s;
  const u = new Proxy(s, uA);
  for (F0.set(u, s), Ds.set(u, yr(s)); s; )
    (yield u, (s = await (gr.get(u) || s.continue())), gr.delete(u));
}
function j0(i, s) {
  return (
    (s === Symbol.asyncIterator && hr(i, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (s === 'iterate' && hr(i, [IDBIndex, IDBObjectStore]))
  );
}
W0((i) => ({
  ...i,
  get(s, u, o) {
    return j0(s, u) ? oA : i.get(s, u, o);
  },
  has(s, u) {
    return j0(s, u) || i.has(s, u);
  },
}));
const rA = {
  1: (i) => {
    (i.createObjectStore(K.profile, { keyPath: 'id' }),
      i.createObjectStore(K.currencies, { keyPath: 'id' }),
      i.createObjectStore(K.machine, { keyPath: 'key' }),
      i.createObjectStore(K.weapons, { keyPath: 'id' }),
      i
        .createObjectStore(K.patches, { keyPath: ['name', 'tier'] })
        .createIndex('byName', 'name', { unique: !1 }),
      i.createObjectStore(K.equippedPatches, { keyPath: 'slotIndex' }),
      i.createObjectStore(K.settings, { keyPath: 'id' }));
  },
};
function fA(i, s, u, o) {
  for (let d = u + 1; d <= o; d++) {
    const f = rA[d];
    if (!f) throw new Error(`No migration registered for version ${d}`);
    f(i, s);
  }
}
let Ki = null;
async function A0() {
  return (
    Ki ||
    ((Ki = await lA(C0, As, {
      upgrade(i, s, u, o) {
        try {
          fA(i, o, s, u ?? As);
        } catch (d) {
          throw (console.error('[DB] Migration failed:', d), d);
        }
      },
    })),
    await dA(Ki),
    Ki)
  );
}
async function dA(i) {
  const s = i.transaction([K.profile, K.currencies, K.machine, K.weapons, K.settings], 'readwrite'),
    [u, o, d, f] = await Promise.all([
      s.objectStore(K.profile).get('singleton'),
      s.objectStore(K.currencies).get('singleton'),
      s.objectStore(K.weapons).get('singleton'),
      s.objectStore(K.settings).get('singleton'),
    ]),
    h = Date.now(),
    p = [];
  (u || p.push(s.objectStore(K.profile).put({ ...Og, createdAt: h, lastPlayedAt: h })),
    o || p.push(s.objectStore(K.currencies).put(Dg)),
    d || p.push(s.objectStore(K.weapons).put(Bg)),
    f || p.push(s.objectStore(K.settings).put(Lg)));
  const y = s.objectStore(K.machine),
    g = await y.getAllKeys(),
    _ = new Set(g);
  for (const j of R0) _.has(j) || p.push(y.put({ key: j, lv: 0 }));
  (await Promise.all(p), await s.done);
}
async function mA(i) {
  const s = i.transaction(
      [K.profile, K.currencies, K.machine, K.weapons, K.patches, K.equippedPatches, K.settings],
      'readonly'
    ),
    [u, o, d, f, h, p, y] = await Promise.all([
      s.objectStore(K.profile).get('singleton'),
      s.objectStore(K.currencies).get('singleton'),
      s.objectStore(K.machine).getAll(),
      s.objectStore(K.weapons).get('singleton'),
      s.objectStore(K.patches).getAll(),
      s.objectStore(K.equippedPatches).getAll(),
      s.objectStore(K.settings).get('singleton'),
    ]);
  if ((await s.done, !u || !o || !f || !y))
    throw new Error(
      '[DB] loadSaveState: Required singleton record is missing. Run openDatabase() first.'
    );
  return {
    profile: u,
    currencies: o,
    machine: d,
    weapons: f,
    patches: h,
    equippedPatches: p,
    settings: y,
  };
}
const I0 = 'tower-like-game:import-backups',
  hA = 3;
function pA() {
  try {
    const i = localStorage.getItem(I0);
    return i ? JSON.parse(i) : [];
  } catch {
    return [];
  }
}
function vA(i) {
  try {
    localStorage.setItem(I0, JSON.stringify(i));
  } catch (s) {
    console.warn('[DB] Failed to save backup to localStorage:', s);
  }
}
function yA(i) {
  const s = pA();
  s.unshift({ savedAt: Date.now(), data: i });
  const u = s.slice(0, hA);
  vA(u);
}
async function P0(i) {
  const s = await mA(i);
  return { formatVersion: 1, dbVersion: As, exportedAt: Date.now(), data: s };
}
async function gA(i, s) {
  if (s.formatVersion !== 1) throw new Error(`Unsupported formatVersion: ${s.formatVersion}`);
  try {
    const f = await P0(i);
    yA(f);
  } catch (f) {
    console.warn('[DB] Pre-import backup failed (proceeding anyway):', f);
  }
  const { data: u } = s,
    o = i.transaction(
      [K.profile, K.currencies, K.machine, K.weapons, K.patches, K.equippedPatches, K.settings],
      'readwrite'
    );
  await Promise.all([
    o.objectStore(K.profile).clear(),
    o.objectStore(K.currencies).clear(),
    o.objectStore(K.machine).clear(),
    o.objectStore(K.weapons).clear(),
    o.objectStore(K.patches).clear(),
    o.objectStore(K.equippedPatches).clear(),
    o.objectStore(K.settings).clear(),
  ]);
  const d = [
    o.objectStore(K.profile).put(u.profile),
    o.objectStore(K.currencies).put(u.currencies),
    o.objectStore(K.weapons).put(u.weapons),
    o.objectStore(K.settings).put(u.settings),
    ...u.machine.map((f) => o.objectStore(K.machine).put(f)),
    ...u.patches.map((f) => o.objectStore(K.patches).put(f)),
    ...u.equippedPatches.map((f) => o.objectStore(K.equippedPatches).put(f)),
  ];
  (await Promise.all(d), await o.done);
}
const _A = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];
function bA() {
  const { navigate: i } = pn(),
    [s, u] = ne.useState('sound'),
    o = async () => {
      const h = await A0(),
        p = await P0(h),
        y = JSON.stringify(p, null, 2),
        g = new Blob([y], { type: 'application/json' }),
        _ = URL.createObjectURL(g),
        j = document.createElement('a');
      ((j.href = _),
        (j.download = `neon-spire-save-${new Date().toISOString().slice(0, 10)}.json`),
        j.click(),
        URL.revokeObjectURL(_));
    },
    d = async (h) => {
      const p = await h.text(),
        y = JSON.parse(p),
        g = await A0();
      (await gA(g, y), window.location.reload());
    },
    f = async () => {
      (indexedDB.deleteDatabase(C0), window.location.reload());
    };
  return r.jsx(Zn, {
    header: r.jsx(Pi, {
      title: '設定',
      onBack: () => i('title'),
      currencies: [],
      tabBar: r.jsx(Ns, { tabs: _A, value: s, onChange: u, fullWidth: !0 }),
    }),
    footer: r.jsx(Ii, { active: 'settings', onChange: i }),
    children: r.jsxs('div', {
      className: cj.content,
      children: [
        s === 'sound' && r.jsx(Fj, {}),
        s === 'game' && r.jsx($j, {}),
        s === 'data' && r.jsx(Sj, { onExport: o, onImport: d, onReset: f }),
      ],
    }),
  });
}
const SA = '_layout_198wk_1',
  xA = '_heroWrap_198wk_12',
  T0 = { layout: SA, heroWrap: xA },
  jA = '_root_5udm7_1',
  AA = { root: jA };
function TA({ onResume: i, onNewGame: s, lastSavedAt: u }) {
  const d = k((f) => f.createdAt) > 0;
  return r.jsxs('div', {
    className: AA.root,
    children: [
      r.jsx(qt, {
        label: d ? '続きから' : '続きから (セーブなし)',
        variant: d ? 'primary' : 'ghost',
        size: 'lg',
        fullWidth: !0,
        disabled: !d,
        iconLeft: r.jsx(Oe, { name: 'play', size: 18 }),
        onClick: i,
      }),
      d &&
        u != null &&
        r.jsx(V, {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
          children: '最終セーブ: ' + u,
        }),
      r.jsx(qt, {
        label: '新規開始',
        variant: d ? 'ghost' : 'primary',
        size: 'lg',
        fullWidth: !0,
        iconLeft: r.jsx(Oe, { name: 'plus', size: 18 }),
        onClick: s,
      }),
    ],
  });
}
const EA = '_root_qkflo_2',
  NA = '_title_qkflo_12',
  E0 = { root: EA, title: NA };
function MA({ title: i = 'NEON SPIRE', subtitle: s, version: u, tagline: o }) {
  return r.jsxs('header', {
    className: E0.root,
    role: 'banner',
    children: [
      r.jsx('h1', { className: E0.title, children: i }),
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
const zA = '_root_1szye_1',
  CA = '_ringOuter_1szye_9',
  RA = '_ringMiddle_1szye_17',
  wA = '_glowDisc_1szye_24',
  OA = '_cornerAccent_1szye_31',
  DA = '_icon_1szye_40',
  Vl = { root: zA, ringOuter: CA, ringMiddle: RA, glowDisc: wA, cornerAccent: OA, icon: DA };
function BA({ size: i = 180, iconName: s = 'tower' }) {
  return r.jsxs('div', {
    className: Vl.root,
    style: { width: i, height: i },
    role: 'presentation',
    'aria-hidden': 'true',
    children: [
      r.jsx('div', { className: Vl.ringOuter }),
      r.jsx('div', { className: Vl.ringMiddle }),
      r.jsx('div', { className: Vl.glowDisc }),
      [0, 90, 180, 270].map((u) =>
        r.jsx(
          'div',
          {
            className: Vl.cornerAccent,
            style: { transform: `rotate(${u}deg) translate(${i / 2 - 5}px) rotate(45deg)` },
          },
          u
        )
      ),
      r.jsx('span', {
        className: Vl.icon,
        children: r.jsx(Oe, { name: s, size: Math.round(i * 0.49) }),
      }),
    ],
  });
}
function LA(i) {
  if (i < 0) return '今';
  const s = Math.floor(i / 1e3);
  if (s < 60) return '今';
  const u = Math.floor(s / 60);
  if (u < 60) return `${u} 分前`;
  const o = Math.floor(u / 60);
  return o < 24 ? `${o} 時間前` : `${Math.floor(o / 24)} 日前`;
}
function HA() {
  const { navigate: i } = pn(),
    s = k((o) => o.createdAt),
    u = ne.useMemo(() => (s > 0 ? LA(Date.now() - s) : void 0), [s]);
  return r.jsx(Zn, {
    children: r.jsxs('div', {
      className: T0.layout,
      children: [
        r.jsx(MA, {
          subtitle: 'TOWER DEFENSE × INFINITE TIER',
          tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
          version: 'v0.1.0',
        }),
        r.jsx('div', { className: T0.heroWrap, children: r.jsx(BA, {}) }),
        r.jsx(TA, {
          lastSavedAt: u,
          onResume: () => i('preparation'),
          onNewGame: () => i('preparation'),
        }),
      ],
    }),
  });
}
function qA() {
  const { screen: i } = pn();
  switch (i) {
    case 'title':
      return r.jsx(HA, {});
    case 'preparation':
      return r.jsx(lj, {});
    case 'machine':
      return r.jsx(_5, {});
    case 'armory':
      return r.jsx(c2, {});
    case 'patches':
      return r.jsx(E4, {});
    case 'settings':
      return r.jsx(bA, {});
    case 'battle':
      return r.jsx(m5, {});
    default:
      return r.jsx(b5, {});
  }
}
const e1 = document.getElementById('root');
if (!e1) throw new Error('Failed to find #root element');
Dv.createRoot(e1).render(r.jsx(l2, { children: r.jsx(qA, {}) }));
