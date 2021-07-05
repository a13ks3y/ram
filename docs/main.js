(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/oleksiismirnov/Documents/js/ram/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Qd3U":
/*!*************************!*\
  !*** ./src/app/rick.ts ***!
  \*************************/
/*! exports provided: Rick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rick", function() { return Rick; });
/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell */ "rv8r");

class Rick {
    // todo do not use angular injection here, use regular object passed from universe and screen component, create interface
    constructor(audioService) {
        this.audioService = audioService;
        this.portalZoom = 0.1;
        this.lastPortalUse = 0;
        this.state = 'idle';
        this.dx = 0;
        this.dy = 0;
        this.x = 0;
        this.y = 0;
    }
    render(ctx) {
        switch (this.state) {
            case 'idle':
                this.renderIdle(ctx);
                break;
            case 'portal':
                this.renderPortal(ctx);
                break;
            case 'portal_idle':
                this.renderIdle(ctx);
                this.renderPortal(ctx);
                break;
            case 'falling':
            case 'jumping':
                this.renderFalling(ctx);
                break;
        }
    }
    logic(dtt) {
        const nx = this.dx * dtt;
        const ny = this.dy * dtt;
        this.x += this.dx / dtt;
        this.y += this.dy / dtt;
        switch (this.state) {
            case 'portal':
                this.portalZoom += 0.081;
                if (this.portalZoom >= 1.75) {
                    this.state = 'portal_idle';
                    this.dx = 0.2;
                }
                break;
            case 'portal_idle':
                break;
            case 'falling':
                break;
            case 'jumping':
                if (this.jumpStartY - this.y > Rick.SIZE * 8) {
                    console.log('PEPAKA!', this.jumpStartY, this.y);
                    this.state = 'falling';
                }
                break;
        }
    }
    setStateIdle() {
        this.state = 'idle';
        this.portalZoom = 0;
        this.dx = 0;
        this.dy = 0;
    }
    portalOut(destX = this.x, destY = this.y) {
        if (Date.now() - this.lastPortalUse >= 5000) {
            this.hide();
            this.goToCell(destX, destY);
            this.lastPortalUse = Date.now();
            const startPromise = this.audioService.play('portal-gun');
            return startPromise.then((result) => {
                this.state = 'portal';
                this.x -= Rick.SIZE / 4;
                this.portalX = this.x;
                result.endPromise.then(() => {
                    this.setStateIdle();
                });
            });
        }
        else {
            return Promise.reject('Recharging!');
        }
    }
    renderIdle(ctx) {
        const SIZE = Rick.SIZE;
        const x = this.x;
        const y = this.y;
        ctx.fillStyle = '#a3cfea'; // hair
        ctx.fillRect(x + SIZE / 8, y, SIZE / 1.5, SIZE / 2);
        ctx.fillStyle = '#d3c7b8'; // skin (head/face)
        ctx.fillRect(x + SIZE / 8, y + SIZE / 2, SIZE / 1.5, SIZE / 2);
        ctx.fillStyle = '#ffffff'; // skin (head/face)
        ctx.fillRect(x, this.y + SIZE, SIZE, SIZE);
        ctx.fillStyle = '#79643a'; // pants
        ctx.fillRect(x + SIZE / 8, y + SIZE * 2, SIZE / 2, SIZE);
        ctx.fillStyle = '#3a3a3a'; // boots
        ctx.fillRect(x + SIZE / 8, y + SIZE * 3, SIZE / 2 + SIZE / 4, SIZE / 4);
    }
    renderPortal(ctx) {
        ctx.fillStyle = '#0f0';
        //ctx.fillRect(this.portalX - Rick.SIZE / 8, this.y - Rick.SIZE / 4, Rick.SIZE * 2, this.portalZoom / 2);
        ctx.beginPath();
        ctx.ellipse(this.portalX, this.y + Rick.SIZE * 2, Rick.SIZE * this.portalZoom, Rick.SIZE / 2, 90 * Math.PI / 180, 0, 2 * Math.PI);
        ctx.fill();
    }
    hide() {
        this.state = 'hidden';
    }
    goToCell(x, y) {
        this.x = x;
        this.y = y;
    }
    renderFalling(ctx) {
        this.renderIdle(ctx);
        ctx.fillStyle = ['#fff', '#bbb', '#ccc', '#eee'][~~(Math.random() * 4)];
        const COUNT = ~~(Math.random() * 10);
        for (let i = 0; i < COUNT; i++) {
            ctx.fillRect(this.x + ~~(Math.random() * i), this.y + ~~(Math.random() * i), 1, 1);
        }
    }
    setStateFalling() {
        this.state = 'falling';
        this.dy = 5;
    }
    multiply(numberA, numberB) {
        return numberA * numberB;
    }
    jump() {
        this.state = 'jumping';
        this.jumpDy = this.dy;
        this.jumpStartY = this.y;
        this.dy = -32;
    }
}
Rick.SIZE = _cell__WEBPACK_IMPORTED_MODULE_0__["Cell"].CELL_WIDTH / 4;


/***/ }),

/***/ "SK7b":
/*!*****************************!*\
  !*** ./src/app/universe.ts ***!
  \*****************************/
/*! exports provided: Universe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Universe", function() { return Universe; });
/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell */ "rv8r");

// Необходимо придумать соглашение о наименовании координат. Например:
// Абсолютные, относительные, координаты ячейки - это все лучше не путать
// Пусть координаты ячейки (cell) это будут не "x" и "y", а "c" и "r" (column, row)
// Просто x и y пусть всегда означают абсолютные координаты (от левого верхнего угла Вселенной)
// "ox" "oy" пусть обозначают относительные координаты (от левого верхнего угла канвы)
// "cx" "cy" пусть будут координатами центра (в остальных случаях левый верхний угол)
class Universe {
    constructor(initialWidth, initialHeight, rick = null) {
        this.cells = [];
        this.width = initialWidth;
        this.height = initialHeight;
        this.rick = rick;
        const CELL_TYPES = [
            _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Air,
            _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Air,
            _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Air,
            _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Ground,
            _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Ground,
            _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Fire,
            _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Uranium
        ];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                //const type = CELL_TYPES[~~(Math.random() * CELL_TYPES.length)]
                const type = Math.random() > 0.5 ? _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Air : _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Ground;
                this.cells.push(new _cell__WEBPACK_IMPORTED_MODULE_0__["Cell"](type, x, y));
            }
        }
        const firstAirCell = this.cells.find(cell => cell.type == _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Air);
        if (this.rick && firstAirCell) {
            this.rick.goToCell(firstAirCell.x, firstAirCell.y);
        }
    }
    render(ctx) {
        this.cells.forEach(cell => cell.render(ctx));
        this.rick && this.rick.render(ctx);
    }
    logic(dtt) {
        this.cells.forEach(cell => cell.logic(dtt));
        this.rick && this.rick.logic(dtt);
        try {
            const rickCell = this.getCell(this.rick.x, this.rick.y);
            if (!rickCell)
                throw new Error('rickCell is null!!!');
            const bottomCell = this.getCell(this.rick.x, this.rick.y + 1);
            if (!bottomCell) {
                throw new Error('Bottom cell is null!!!');
            }
            if (bottomCell.type === _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Air) {
                this.rick.setStateFalling();
            }
            else {
                this.rick.setStateIdle();
            }
            if (rickCell.type !== _cell__WEBPACK_IMPORTED_MODULE_0__["CellType"].Air) {
                // ???
                console.log('it is not AIR!!!');
            }
        }
        catch (e) {
            //console.error(e);
        }
        //@todo: code below should not throw exxeptions!
    }
    getCell(x, y) {
        return this.cells.find(cell => x === cell.x && y === cell.y);
    }
    mn(x, y) {
        const mn = [
            { x: -1, y: -1 },
            { x: 0, y: -1 },
            { x: 1, y: -1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: -1, y: 1 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
        ];
        return mn.map((offset) => {
            const ox = offset.x + x;
            const oy = offset.y + y;
            return this.getCell(ox, oy);
        });
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _audio_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio.service */ "hz2C");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");





function AppComponent_audio_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "audio", 1);
} if (rf & 2) {
    const track_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", track_r1.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("id", "audio-", track_r1.name, "");
} }
class AppComponent {
    constructor(audioService) {
        this.audioService = audioService;
        this.title = 'ram';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_audio_service__WEBPACK_IMPORTED_MODULE_1__["AudioService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["ram-root"]], decls: 2, vars: 1, consts: [[3, "src", "id", 4, "ngFor", "ngForOf"], [3, "src", "id"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, AppComponent_audio_0_Template, 1, 2, "audio", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.audioService.tracks);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQubGVzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ram-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.less']
            }]
    }], function () { return [{ type: _audio_service__WEBPACK_IMPORTED_MODULE_1__["AudioService"] }]; }, null); })();


/***/ }),

/***/ "YbDW":
/*!********************************************!*\
  !*** ./src/app/screen/screen.component.ts ***!
  \********************************************/
/*! exports provided: ScreenComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenComponent", function() { return ScreenComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _universe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../universe */ "SK7b");
/* harmony import */ var _rick__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rick */ "Qd3U");
/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cell */ "rv8r");
/* harmony import */ var _audio_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../audio.service */ "hz2C");






class ScreenComponent {
    constructor(audioService) {
        this.audioService = audioService;
        this.editMode = true;
    }
    ngOnInit() {
        this.rick = new _rick__WEBPACK_IMPORTED_MODULE_2__["Rick"](this.audioService);
        this.rick.hide();
        this.universe = new _universe__WEBPACK_IMPORTED_MODULE_1__["Universe"](32, 8, this.rick);
        const canvas = document.getElementById('ctx');
        this.ctx = canvas.getContext('2d');
        canvas.addEventListener('click', this.click.bind(this));
        document.body.addEventListener('keydown', this.keydown.bind(this));
        document.body.addEventListener('keyup', this.keyup.bind(this));
        this.lastTick = Date.now();
        this.render();
        setTimeout(() => {
            this.rick.portalOut().then(() => {
                console.log('portal Outed!');
            });
        }, 333);
    }
    click(e) {
        const mx = e.offsetX;
        const my = e.offsetY;
        const x = ~~(mx / _cell__WEBPACK_IMPORTED_MODULE_3__["Cell"].CELL_WIDTH);
        const y = ~~(my / _cell__WEBPACK_IMPORTED_MODULE_3__["Cell"].CELL_HEIGHT);
        const cell = this.universe.getCell(x, y);
        if (cell && cell.type === _cell__WEBPACK_IMPORTED_MODULE_3__["CellType"].Air) {
            this.rick.portalOut(cell.x, cell.y).catch(() => {
                console.log('todo show that portal gun is locked, it can shoot only each N seconds');
            });
        }
    }
    keydown(e) {
        switch (e.key) {
            case 'ArrowRight':
                this.rick.dx = 2.7;
                break;
            case 'ArrowLeft':
                this.rick.dx = -2.7;
                break;
        }
    }
    keyup(e) {
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                this.rick.dx = 0;
                break;
            case 'ArrowUp':
                this.rick.jump();
                break;
        }
    }
    render() {
        const dt = Date.now() - this.lastTick;
        const dtt = dt / 1000 * 60;
        const ctx = this.ctx;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.universe.logic(dtt);
        this.universe.render(ctx);
        this.lastTick = Date.now();
        requestAnimationFrame(this.render.bind(this));
    }
}
ScreenComponent.ɵfac = function ScreenComponent_Factory(t) { return new (t || ScreenComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_audio_service__WEBPACK_IMPORTED_MODULE_4__["AudioService"])); };
ScreenComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ScreenComponent, selectors: [["ram-screen"]], decls: 1, vars: 0, consts: [["id", "ctx", "width", "640", "height", "480"]], template: function ScreenComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "canvas", 0);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NjcmVlbi9zY3JlZW4uY29tcG9uZW50Lmxlc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ScreenComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ram-screen',
                templateUrl: './screen.component.html',
                styleUrls: ['./screen.component.less']
            }]
    }], function () { return [{ type: _audio_service__WEBPACK_IMPORTED_MODULE_4__["AudioService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _screen_screen_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./screen/screen.component */ "YbDW");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _screen_screen_component__WEBPACK_IMPORTED_MODULE_4__["ScreenComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _screen_screen_component__WEBPACK_IMPORTED_MODULE_4__["ScreenComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "hz2C":
/*!**********************************!*\
  !*** ./src/app/audio.service.ts ***!
  \**********************************/
/*! exports provided: AudioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioService", function() { return AudioService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AudioService {
    constructor() {
        // @todo: make private? intorduce getter/setter? controll over UI/congig/both?
        this.muted = true;
        this.tracks = [
            {
                name: 'portal-gun',
                url: 'assets/sfx-portal-gun.mp3'
            }
        ];
    }
    // todo: unit-test it!
    play(trackName) {
        if (this.muted)
            return Promise.resolve({ endPromise: Promise.resolve() });
        const trackElement = document.getElementById(`audio-${trackName}`);
        if (!trackElement)
            throw new Error(`No element with id: audio-${trackName}`);
        const startPromise = new Promise((startResolve) => {
            trackElement && trackElement.play().then(() => {
                const endPromise = new Promise((endResolve) => {
                    setTimeout(() => {
                        trackElement.pause();
                        trackElement.currentTime = 0;
                        endResolve();
                    }, trackElement.duration * 1000);
                });
                startResolve({ endPromise });
            });
        });
        return startPromise;
    }
}
AudioService.ɵfac = function AudioService_Factory(t) { return new (t || AudioService)(); };
AudioService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AudioService, factory: AudioService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AudioService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "rv8r":
/*!*************************!*\
  !*** ./src/app/cell.ts ***!
  \*************************/
/*! exports provided: CellType, Cell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CellType", function() { return CellType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
var CellType;
(function (CellType) {
    CellType[CellType["Air"] = 0] = "Air";
    CellType[CellType["Ground"] = 1] = "Ground";
    CellType[CellType["Water"] = 2] = "Water";
    CellType[CellType["Fire"] = 3] = "Fire";
    CellType[CellType["Uranium"] = 4] = "Uranium";
})(CellType || (CellType = {}));
class Cell {
    constructor(type = CellType.Air, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
    }
    render(ctx) {
        ctx.fillStyle = Cell.COLORS[this.type];
        ctx.fillRect(this.x * Cell.CELL_WIDTH, this.y * Cell.CELL_HEIGHT, Cell.CELL_WIDTH, Cell.CELL_HEIGHT);
    }
    logic(dtt) {
    }
}
Cell.CELL_WIDTH = 72;
Cell.CELL_HEIGHT = 72;
Cell.COLORS = [
    '#50ddff',
    '#f90',
    '#00f',
    '#f00',
    '#0f0' // Uranium
];


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _screen_screen_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./screen/screen.component */ "YbDW");





const routes = [
    {
        path: '**',
        component: _screen_screen_component__WEBPACK_IMPORTED_MODULE_2__["ScreenComponent"]
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map