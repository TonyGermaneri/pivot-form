/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false, performance: false*/
define(['./util.js'], function (util) {
    'use strict';
    var ce = util.createElement;
    function dialogModule(args) {
        args = args || {};
        var self = {},
            intf = ce('div', null, {className: 'dialog'});
        self.intf = intf;
        // a rough area were bandit pixels hang out
        self.borderZone = 5;
        function resizeMouseHover(ev) {
            if (self.moving) { return; }
            self.borderResizeCursor = 'auto';
            self.borderResizeMode = undefined;
            var b = self.borderZone,
                x = ev.layerX,
                y = ev.layerY,
                height = intf.offsetHeight,
                width = intf.offsetWidth,
                n = y < b,
                w = x < b,
                e = x - width + b > 0,
                s = y - height + b > 0,
                m = y < self.titleBar.offsetHeight;
            self.borderResizeMode = {n: n, s: s, e: e, w: w, m: m};
            if (n && w) {
                self.borderResizeCursor = 'nwse-resize';
            } else if (n && e) {
                self.borderResizeCursor = 'nesw-resize';
            } else if (s && w) {
                self.borderResizeCursor = 'nesw-resize';
            } else if (s && e) {
                self.borderResizeCursor = 'nwse-resize';
            } else if (n) {
                self.borderResizeCursor = 'ns-resize';
            } else if (s) {
                self.borderResizeCursor = 'ns-resize';
            } else if (e) {
                self.borderResizeCursor = 'ew-resize';
            } else if (w) {
                self.borderResizeCursor = 'ew-resize';
            }
            intf.style.cursor = self.borderResizeCursor;
        }
        function moveResizeDialog(e) {
            var s = self.startMove,
                r = self.borderResizeMode,
                deltaY = (e.clientY -  s.clientY),
                deltaX = (e.clientX -  s.clientX);
            intf.classList.add('noselect');
            if (r.n || r.s || r.e || r.w) {
                if (r.n) {
                    intf.style.top = s.offsetTop + deltaY + 'px';
                    intf.style.height = s.offsetHeight - deltaY + 'px';
                }
                if (r.s) {
                    intf.style.height = s.offsetHeight + deltaY + 'px';
                }
                if (r.w) {
                    intf.style.left = s.offsetLeft + deltaX + 'px';
                    intf.style.width = s.offsetWidth - deltaX + 'px';
                }
                if (r.e) {
                    intf.style.width = s.offsetWidth + deltaX + 'px';
                }
            } else if (r.m) {
                intf.style.top = s.offsetTop + deltaY + 'px';
                intf.style.left = s.offsetLeft + deltaX + 'px';
            }
            e.stopPropagation();
        }
        function center(verticalAlso) {
            intf.style.left = (window.innerWidth / 2) - (self.intf.offsetWidth / 2) + 'px';
            if (verticalAlso) {
                intf.style.top = (window.innerHeight / 2) - (self.intf.offsetHeight / 2) + 'px';
            } else {
                intf.style.top = '20px';
            }
        }
        function endMove(e) {
            self.moving = false;
            intf.classList.remove('noselect');
            document.removeEventListener('mouseup', endMove);
            document.removeEventListener('mousemove', moveResizeDialog);
        }
        function beginDialogMove(e) {
            self.moving = true;
            self.startMove = {
                clientX: e.clientX,
                clientY: e.clientY,
                offsetWidth: intf.offsetWidth,
                offsetHeight: intf.offsetHeight,
                offsetLeft: intf.offsetLeft,
                offsetTop: intf.offsetTop,
            };
            document.addEventListener('mouseup', endMove);
            document.addEventListener('mousemove', moveResizeDialog);
        }
        function init() {
            self.modal = ce('div', intf, {className: 'dialog-modal'});
            self.titleBar = ce('div', intf, {className: 'dialog-title-bar'});
            self.title = ce('span', self.titleBar, {className: 'dialog-title', innerHTML: args.title || '' });
            self.content = ce('div', intf, {className: 'dialog-content'});
            self.card = ce('div', null, {className: 'dialog-card'});
            self.controlBoxMinimize = ce('div', self.titleBar, {className: 'dialog-minimize'});
            self.controlBoxMaximize = ce('div', self.titleBar, {className: 'dialog-maximize'});
            self.controlBoxClose = ce('div', self.titleBar, {className: 'dialog-close'});
            self.titleBar.addEventListener('mousedown', beginDialogMove);
            intf.addEventListener('mousedown', beginDialogMove);
            intf.addEventListener('mousemove', resizeMouseHover);
            // interface
            intf.content = self.content;
            intf.card = self.card;
            intf.titleBar = self.titleBar;
            Object.defineProperty(intf, 'title', {
                get: function () {
                    return self.title;
                }
            });
            intf.controlBoxMinimize = self.controlBoxMinimize;
            intf.controlBoxMaximize = self.controlBoxMaximize;
            intf.controlBoxClose = self.controlBoxClose;
            intf.center = center;
            Object.defineProperty(self.titleBar, 'value', {
                get: function () {
                    return self.title.innerHTML;
                },
                set: function (value) {
                    self.card.innerHTML = value;
                    self.title.innerHTML = value;
                }
            });
        }
        init();
        return intf;
    }
    return dialogModule;
});
