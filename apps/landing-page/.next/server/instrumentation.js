"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "instrumentation";
exports.ids = ["instrumentation"];
exports.modules = {

/***/ "./src/env.ts":
/*!********************!*\
  !*** ./src/env.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   env: () => (/* binding */ env)\n/* harmony export */ });\n/* harmony import */ var _t3_oss_env_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @t3-oss/env-nextjs */ \"@t3-oss/env-nextjs\");\n/* harmony import */ var _t3_oss_env_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_t3_oss_env_nextjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zod */ \"zod\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst env = (0,_t3_oss_env_nextjs__WEBPACK_IMPORTED_MODULE_0__.createEnv)({\n    server: {\n        /**\n     * Next.js environment variables\n     */ NODE_ENV: zod__WEBPACK_IMPORTED_MODULE_1__.z.enum([\n            \"development\",\n            \"production\"\n        ]),\n        NEXT_RUNTIME: zod__WEBPACK_IMPORTED_MODULE_1__.z.enum([\n            \"nodejs\",\n            \"edge\"\n        ]).optional()\n    },\n    client: {},\n    runtimeEnv: {\n        NODE_ENV: \"development\",\n        NEXT_RUNTIME: \"nodejs\"\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW52LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQThDO0FBQ3ZCO0FBRWhCLE1BQU1FLE1BQU1GLDZEQUFTQSxDQUFDO0lBQzNCRyxRQUFRO1FBQ047O0tBRUMsR0FDREMsVUFBVUgsa0NBQUNBLENBQUNJLEtBQUs7WUFBQztZQUFlO1NBQWE7UUFDOUNDLGNBQWNMLGtDQUFDQSxDQUFDSSxLQUFLO1lBQUM7WUFBVTtTQUFPLEVBQUVFO0lBQzNDO0lBQ0FDLFFBQVEsQ0FBQztJQUNUQyxZQUFZO1FBQ1ZMLFVBYko7UUFjSUUsY0FBY0ksUUFBd0JKO0lBQ3hDO0FBQ0YsR0FBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2xhbmRpbmctcGFnZS8uL3NyYy9lbnYudHM/NzFiOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVFbnYgfSBmcm9tICdAdDMtb3NzL2Vudi1uZXh0anMnXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJ1xuXG5leHBvcnQgY29uc3QgZW52ID0gY3JlYXRlRW52KHtcbiAgc2VydmVyOiB7XG4gICAgLyoqXG4gICAgICogTmV4dC5qcyBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAgICAgKi9cbiAgICBOT0RFX0VOVjogei5lbnVtKFsnZGV2ZWxvcG1lbnQnLCAncHJvZHVjdGlvbiddKSxcbiAgICBORVhUX1JVTlRJTUU6IHouZW51bShbJ25vZGVqcycsICdlZGdlJ10pLm9wdGlvbmFsKCksXG4gIH0sXG4gIGNsaWVudDoge30sXG4gIHJ1bnRpbWVFbnY6IHtcbiAgICBOT0RFX0VOVjogcHJvY2Vzcy5lbnYuTk9ERV9FTlYsXG4gICAgTkVYVF9SVU5USU1FOiBwcm9jZXNzLmVudi5ORVhUX1JVTlRJTUUsXG4gIH0sXG59KVxuIl0sIm5hbWVzIjpbImNyZWF0ZUVudiIsInoiLCJlbnYiLCJzZXJ2ZXIiLCJOT0RFX0VOViIsImVudW0iLCJORVhUX1JVTlRJTUUiLCJvcHRpb25hbCIsImNsaWVudCIsInJ1bnRpbWVFbnYiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/env.ts\n");

/***/ }),

/***/ "./src/instrumentation.ts":
/*!********************************!*\
  !*** ./src/instrumentation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\n/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env */ \"./src/env.ts\");\n/* eslint-disable no-console */ // import config from './cms.config'\n\nasync function register() {\n    if (_env__WEBPACK_IMPORTED_MODULE_0__.env.NEXT_RUNTIME === \"nodejs\") {\n    // await import('next-cms').then((mod) => {\n    //   mod.bootstrap(config)\n    // })\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5zdHJ1bWVudGF0aW9uLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTZCLEdBRTdCLG9DQUFvQztBQUNUO0FBRXBCLGVBQWVDO0lBQ3BCLElBQUlELHFDQUFHQSxDQUFDRSxpQkFBaUIsVUFBVTtJQUNqQywyQ0FBMkM7SUFDM0MsMEJBQTBCO0lBQzFCLEtBQUs7SUFDUDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGFuZGluZy1wYWdlLy4vc3JjL2luc3RydW1lbnRhdGlvbi50cz80ZmFiIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuLy8gaW1wb3J0IGNvbmZpZyBmcm9tICcuL2Ntcy5jb25maWcnXG5pbXBvcnQgeyBlbnYgfSBmcm9tICcuL2VudidcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xuICBpZiAoZW52Lk5FWFRfUlVOVElNRSA9PT0gJ25vZGVqcycpIHtcbiAgICAvLyBhd2FpdCBpbXBvcnQoJ25leHQtY21zJykudGhlbigobW9kKSA9PiB7XG4gICAgLy8gICBtb2QuYm9vdHN0cmFwKGNvbmZpZylcbiAgICAvLyB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiZW52IiwicmVnaXN0ZXIiLCJORVhUX1JVTlRJTUUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/instrumentation.ts\n");

/***/ }),

/***/ "@t3-oss/env-nextjs":
/*!*************************************!*\
  !*** external "@t3-oss/env-nextjs" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@t3-oss/env-nextjs");

/***/ }),

/***/ "zod":
/*!**********************!*\
  !*** external "zod" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("zod");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/instrumentation.ts"));
module.exports = __webpack_exports__;

})();