var requirejs, require, define;
! function(e) {
    function t(e, t) {
        return y.call(e, t)
    }

    function n(e, t) {
        var n, i, r, o, s, a, l, u, f, c, d, p = t && t.split("/"),
            m = h.map,
            v = m && m["*"] || {};
        if (e && "." === e.charAt(0))
            if (t) {
                for (e = e.split("/"), s = e.length - 1, h.nodeIdCompat && w.test(e[s]) && (e[s] = e[s].replace(w, "")), e = p.slice(0, p.length - 1).concat(e), f = 0; f < e.length; f += 1)
                    if (d = e[f], "." === d) e.splice(f, 1), f -= 1;
                    else if (".." === d) {
                    if (1 === f && (".." === e[2] || ".." === e[0])) break;
                    f > 0 && (e.splice(f - 1, 2), f -= 2)
                }
                e = e.join("/")
            } else 0 === e.indexOf("./") && (e = e.substring(2));
        if ((p || v) && m) {
            for (n = e.split("/"), f = n.length; f > 0; f -= 1) {
                if (i = n.slice(0, f).join("/"), p)
                    for (c = p.length; c > 0; c -= 1)
                        if (r = m[p.slice(0, c).join("/")], r && (r = r[i])) {
                            o = r, a = f;
                            break
                        }
                if (o) break;
                !l && v && v[i] && (l = v[i], u = f)
            }!o && l && (o = l, a = u), o && (n.splice(0, a, o), e = n.join("/"))
        }
        return e
    }

    function i(t, n) {
        return function() {
            var i = g.call(arguments, 0);
            return "string" != typeof i[0] && 1 === i.length && i.push(null), f.apply(e, i.concat([t, n]))
        }
    }

    function r(e) {
        return function(t) {
            return n(t, e)
        }
    }

    function o(e) {
        return function(t) {
            p[e] = t
        }
    }

    function s(n) {
        if (t(m, n)) {
            var i = m[n];
            delete m[n], v[n] = !0, u.apply(e, i)
        }
        if (!t(p, n) && !t(v, n)) throw new Error("No " + n);
        return p[n]
    }

    function a(e) {
        var t, n = e ? e.indexOf("!") : -1;
        return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
    }

    function l(e) {
        return function() {
            return h && h.config && h.config[e] || {}
        }
    }
    var u, f, c, d, p = {},
        m = {},
        h = {},
        v = {},
        y = Object.prototype.hasOwnProperty,
        g = [].slice,
        w = /\.js$/;
    c = function(e, t) {
        var i, o = a(e),
            l = o[0];
        return e = o[1], l && (l = n(l, t), i = s(l)), l ? e = i && i.normalize ? i.normalize(e, r(t)) : n(e, t) : (e = n(e, t), o = a(e), l = o[0], e = o[1], l && (i = s(l))), {
            f: l ? l + "!" + e : e,
            n: e,
            pr: l,
            p: i
        }
    }, d = {
        require: function(e) {
            return i(e)
        },
        exports: function(e) {
            var t = p[e];
            return "undefined" != typeof t ? t : p[e] = {}
        },
        module: function(e) {
            return {
                id: e,
                uri: "",
                exports: p[e],
                config: l(e)
            }
        }
    }, u = function(n, r, a, l) {
        var u, f, h, y, g, w, k = [],
            b = typeof a;
        if (l = l || n, "undefined" === b || "function" === b) {
            for (r = !r.length && a.length ? ["require", "exports", "module"] : r, g = 0; g < r.length; g += 1)
                if (y = c(r[g], l), f = y.f, "require" === f) k[g] = d.require(n);
                else if ("exports" === f) k[g] = d.exports(n), w = !0;
            else if ("module" === f) u = k[g] = d.module(n);
            else if (t(p, f) || t(m, f) || t(v, f)) k[g] = s(f);
            else {
                if (!y.p) throw new Error(n + " missing " + f);
                y.p.load(y.n, i(l, !0), o(f), {}), k[g] = p[f]
            }
            h = a ? a.apply(p[n], k) : void 0, n && (u && u.exports !== e && u.exports !== p[n] ? p[n] = u.exports : h === e && w || (p[n] = h))
        } else n && (p[n] = a)
    }, requirejs = require = f = function(t, n, i, r, o) {
        if ("string" == typeof t) return d[t] ? d[t](n) : s(c(t, n).f);
        if (!t.splice) {
            if (h = t, h.deps && f(h.deps, h.callback), !n) return;
            n.splice ? (t = n, n = i, i = null) : t = e
        }
        return n = n || function() {}, "function" == typeof i && (i = r, r = o), r ? u(e, t, n, i) : setTimeout(function() {
            u(e, t, n, i)
        }, 4), f
    }, f.config = function(e) {
        return f(e)
    }, requirejs._defined = p, define = function(e, n, i) {
        if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
        n.splice || (i = n, n = []), t(p, e) || t(m, e) || (m[e] = [e, n, i])
    }, define.amd = {
        jQuery: !0
    }
}(), define("lib/almond", function() {}),
    function(e, t) {
        "function" == typeof define && define.amd ? define("clock", [], t) : "object" == typeof module && module.exports ? module.exports = t() : e.Clock = t()
    }(this, function() {
        function e() {
            this.timeout = !1
        }
        return e.prototype = {
            offset: 0,
            get running() {
                return this.timeout !== !1
            },
            set running(e) {
                e ? this.start() : this.stop()
            },
            start: function() {
                function e() {
                    var i = new Date,
                        r = i.getTime() + t.offset + 500;
                    r -= r % 1e3, i.setTime(r), r < n && t.onbackwards(i), n = r, t.ontick(i);
                    var o = 1e3 - ((new Date).getTime() + t.offset) % 1e3;
                    o < 50 && (o += 1e3), t.timeout !== !1 && (t.timeout = setTimeout(e, o))
                }
                if (this.timeout === !1) {
                    var t = this,
                        n = (new Date).getTime() - 1e3;
                    t.timeout = 1, e()
                }
            },
            stop: function() {
                this.timeout !== !1 && (clearTimeout(this.timeout), this.timeout = !1)
            },
            ontick: function(e) {},
            onbackwards: function(e) {}
        }, e.zeropad = function(e) {
            return e < 10 ? "0" + e : e.toString()
        }, e.difference = function(e, t) {
            return e instanceof Date && (e = e.getTime()), t instanceof Date && (t = t.getTime()), new Timer.Interval(e - t)
        }, e.Interval = function(e) {
            this.isInPast = e < 0, e = Math.abs(e);
            var t = Math.floor(e / 1e3);
            this.millis = e - 1e3 * t, this.seconds = t % 60, t = Math.floor(t / 60), this.minutes = t % 60, t = Math.floor(t / 60), this.hours = t % 24, t = Math.floor(t / 24), this.days = t % 7, this.weeks = Math.floor(t / 7)
        }, e.Interval.prototype.toString = function() {
            return "[" + this.weeks + " weeks " + this.days + " days " + this.hours + " hours " + this.minutes + " minutes " + this.seconds + " seconds]"
        }, e
    }), define("ffxiv_countdown", ["clock"], function(e) {
        function t(e, t, n) {
            return arguments.length < 2 && (t = []), arguments.length < 3 && (n = !0), this.container = e, this.addBuiltins = n, "string" == typeof t ? void this.load(t) : void this._init(t)
        }
        return t.MAX_TIMER_AGE = (24*60*60*1000), t.prototype = {
            reload: function() {
                this.updateURL && this.load(this.updateURL)
            },
            load: function(e) {
                function t(e) {
                    console.log(e), i.container.appendChild(i.makeError(e))
                }
                this.updateURL = e;
                var n = new XMLHttpRequest,
                    i = this;
                e = e + (e.indexOf("?") >= 0 ? "&" : "?") + "v=" + Math.floor((new Date).getTime() / 36e5).toString(36);
                try {
                    n.open("GET", e), n.onreadystatechange = function() {
                        if (4 == n.readyState) {
                            var e = n.response;
                            if ("string" == typeof e) try {
                                e = JSON.parse(e)
                            } catch (e) {
                                return t("Unable to parse timer data."), void console.log(n.response)
                            }
                            if ("object" != typeof e) return t("Unable to parse timer data (bad JSON type)."), void console.log(n.response);
                            if (!1 in e) return t("No timers present in data sent from server."), void console.log(n.response);
                            i._init(e.timers)
                        }
                    }, n.responseType = "json", n.send(null)
                } catch (e) {
                    t("Unable to load timer data: " + e.toString()), i._init([])
                }
            },
            _init: function(n) {
                this.addBuiltins && n.push({
                    name: "Reset Semanal",
                    every: 6048e5,
                    offset: 4608e5
                }, {
                    name: "Reset Diário",
                    every: 864e5,
                    offset: 54e6
                }, {
            			name: "Stormblood - Acesso Antecipado",
            			start: "2017-06-16T02:00:00-0700"
            		}, {
            			name: "Stormblood - Lançamento",
            			start: "2017-06-20T00:00:00-0700"
            		});
                for (var i = (new Date).getTime(), r = i - t.MAX_TIMER_AGE, o = 0; o < n.length; o++) {
                    var s = n[o];
                    if ("end" in s && s.end <= r) n.splice(o, 1), o--;
                    else {
                        var a = this.makeTimer(s, "timer");
                        if (this.container.appendChild(a), s.div = a, s.every && ("offset" in s || (s.offset = 0), s.start = 0, s.end = (Math.floor((i - s.offset) / s.every) + 1) * s.every + s.offset), s.subtimers) {
                            for (var l = 0; l < s.subtimers.length; l++) {
                                var u = s.subtimers[l];
                                u.end || (u.end = s.end, u.type = (u.type ? u.type + " " : "") + "ends-with-parent"), u.type || (u.type = "");
                                var f = this.makeTimer(u, "subtimer");
                                a.appendChild(f), u.div = f
                            }
                            n.splice.apply(n, [o, 0].concat(s.subtimers)), o += s.subtimers.length
                        }
                    }
                }
                var c = new e;
                c.ontick = function(t) {
                    for (var i, t = t.getTime(), r = 0; r < n.length; r++) {
                        var o = n[r];
                        if (t <= o.start) o.div.className = o.beforeClass, i = new e.Interval(o.start - t + 1e3);
                        else if (t <= o.end) o.div.className = o.activeClass, i = new e.Interval(o.end - t + 1e3), o.removeOnActive && (n.splice(r, 1), r--, o.div.parentNode.removeChild(o.div));
                        else {
                            if (!o.every) {
                                o.div.className = o.afterClass, o.timerDiv.innerHTML = "Está no ar!", n.splice(r, 1), r--, o.removeOnComplete && o.div.parentNode.removeChild(o.div);
                                continue
                            }
                            o.end = (Math.floor((t + 1e3 - o.offset) / o.every) + 1) * o.every + o.offset, i = new e.Interval(o.end - t + 1e3)
                        }
                        var s = "";
                        i.weeks > 0 && (s = '<span class="semanas">' + i.weeks + (i.weeks > 1 ? " semanas" : " semana") + ", </span>"), i.days > 0 && (s += '<span class="dias">' + i.days + (i.days > 1 ? " dias" : " dia") + ", </span>"), s += '<span class="horas">' + e.zeropad(i.hours) + ":" + e.zeropad(i.minutes) + ":" + e.zeropad(i.seconds) + "</span>", o.timerDiv.innerHTML = s
                    }
                    0 == n.length && c.stop()
                }, c.start()
            },
            makeError: function(e) {
                var t = document.createElement("div");
                return t.className = "error", t.appendChild(document.createTextNode(e)), t
            },
            makeTimer: function(t, n) {
                "string" == typeof t.start && (t.start = Date.parse(t.start)), "string" == typeof t.end && (t.end = Date.parse(t.end));
                var i = document.createElement("div");
                i.className = n;
                var r = document.createElement("div");
                if (r.innerHTML = t.name, r.className = "title", i.appendChild(r), t.titleDiv = r, r = document.createElement("div"), r.className = "countdown", i.appendChild(r), t.timerDiv = r, t.type || (t.type = ""), t.beforeClass = n + " before " + t.type, t.activeClass = n + " active " + t.type, t.afterClass = n + " after " + t.type, "maintenance" == t.type || t.showDuration) {
                    r = document.createElement("div"), i.appendChild(r), r.className = "duration";
                    var o = new e.Interval(t.end - t.start),
                        s = [];
                    o.weeks > 0 && s.push(o.weeks + (o.weeks > 1 ? " semanas" : " semana")), o.days > 0 && s.push(o.days + (o.days > 1 ? " dias" : " dia")), o.hours > 0 && s.push(o.hours + (o.hours > 1 ? " horas" : " hora")), o.minutes > 0 && s.push(o.minutes + (o.minutes > 1 ? " minutos" : " minuto")), r.appendChild(document.createTextNode("Lasts " + s.join(", ")))
                }
                if (t.popover) {
                    var a = document.createElement("div");
                    a.className = "popover", a.innerHTML = t.popover, i.appendChild(a), i.onmouseenter = function(e) {
                        a.style.left = i.offsetLeft + "px", a.style.top = i.offsetTop + "px", a.className = "popover visible"
                    }, i.onmouseleave = function(e) {
                        a.className = "popover hidden"
                    }
                }
                return i
            }
        }, t
    }), requirejs.config({
        paths: {
            clock: "../clock"
        }
    }), requirejs(["ffxiv_countdown"], function(e) {
        function t() {
            new e(document.getElementById("eorzea-timers"))
        }
        "loading" != document.readyState ? t() : document.addEventListener("DOMContentLoaded", t)
    }), define("ffxiv_main", function() {});
