/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/ts/VideoDownloader/client/appClient.ts","vendors~app"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/VideoDownloader/client/appClient.ts":
/*!****************************************************!*\
  !*** ./src/ts/VideoDownloader/client/appClient.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ClientLoader_1 = __webpack_require__(/*! ../../util/ssr/ClientLoader */ \"./src/ts/util/ssr/ClientLoader.ts\");\nconst Data_1 = __webpack_require__(/*! ../share/data/Data */ \"./src/ts/VideoDownloader/share/data/Data.ts\");\nconst JsonDataSource_1 = __webpack_require__(/*! ../share/data/source/JsonDataSource */ \"./src/ts/VideoDownloader/share/data/source/JsonDataSource.ts\");\nconst App_1 = __webpack_require__(/*! ../ssr/components/app/App */ \"./src/ts/VideoDownloader/ssr/components/app/App.tsx\");\nexports.appLoader = ClientLoader_1.ClientLoader.new({\n    create: App_1.createApp,\n    deserialize: () => Data_1.getAppData(JsonDataSource_1.jsonDataSource),\n});\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/client/appClient.ts?");

/***/ }),

/***/ "./src/ts/VideoDownloader/share/data/Data.ts":
/*!***************************************************!*\
  !*** ./src/ts/VideoDownloader/share/data/Data.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DataAccessor_1 = __webpack_require__(/*! ./access/DataAccessor */ \"./src/ts/VideoDownloader/share/data/access/DataAccessor.ts\");\nconst Show_1 = __webpack_require__(/*! ./access/Show */ \"./src/ts/VideoDownloader/share/data/access/Show.ts\");\nconst dataAccessors = { shows: Show_1.shows };\nexports.data = DataAccessor_1.DataAccessor.data(dataAccessors);\nexports.getAppData = function (sources) {\n    // data.refresh();\n    return exports.data.get(sources);\n};\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/share/data/Data.ts?");

/***/ }),

/***/ "./src/ts/VideoDownloader/share/data/access/DataAccessor.ts":
/*!******************************************************************!*\
  !*** ./src/ts/VideoDownloader/share/data/access/DataAccessor.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DataAccessor_1 = __webpack_require__(/*! ../../../../util/data/DataAccessor */ \"./src/ts/util/data/DataAccessor.ts\");\nexports.DataAccessor = DataAccessor_1.DataAccessorFactory.for();\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/share/data/access/DataAccessor.ts?");

/***/ }),

/***/ "./src/ts/VideoDownloader/share/data/access/Show.ts":
/*!**********************************************************!*\
  !*** ./src/ts/VideoDownloader/share/data/access/Show.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst utils_1 = __webpack_require__(/*! ../../../../util/functional/utils */ \"./src/ts/util/functional/utils.ts\");\nconst DataAccessor_1 = __webpack_require__(/*! ./DataAccessor */ \"./src/ts/VideoDownloader/share/data/access/DataAccessor.ts\");\nexports.shows = DataAccessor_1.DataAccessor.new({\n    source: e => e.shows,\n    parse: ([name, seasons]) => ({\n        name,\n        seasons: seasons.map((episodes, i) => ({\n            number: i + 1,\n            episodes: episodes.map(([name, url, videoServerUrl], i) => ({\n                number: i + 1,\n                name,\n                url,\n                videoServerUrl,\n            })),\n        })),\n    }),\n    create: utils_1.identity,\n    by: {},\n}, {});\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/share/data/access/Show.ts?");

/***/ }),

/***/ "./src/ts/VideoDownloader/share/data/source/JsonDataSource.ts":
/*!********************************************************************!*\
  !*** ./src/ts/VideoDownloader/share/data/source/JsonDataSource.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst cache_1 = __webpack_require__(/*! ../../../../util/cache/cache */ \"./src/ts/util/cache/cache.ts\");\nconst ClientLoader_1 = __webpack_require__(/*! ../../../../util/ssr/ClientLoader */ \"./src/ts/util/ssr/ClientLoader.ts\");\nexports.createJsonDataSource = function (getJsonData) {\n    return () => getJsonData().mapFields(e => cache_1.getter(e));\n};\nexports.jsonDataSource = exports.createJsonDataSource(() => ClientLoader_1.getClientJsonData());\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/share/data/source/JsonDataSource.ts?");

/***/ }),

/***/ "./src/ts/VideoDownloader/ssr/components/app/App.tsx":
/*!***********************************************************!*\
  !*** ./src/ts/VideoDownloader/ssr/components/app/App.tsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst anyWindow_1 = __webpack_require__(/*! ../../../../util/window/anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nconst VideoDownloads_1 = __webpack_require__(/*! ./VideoDownloads */ \"./src/ts/VideoDownloader/ssr/components/app/VideoDownloads.tsx\");\nexports.App = ({ data }) => {\n    anyWindow_1.globals({ data });\n    if (anyWindow_1.isBrowser) {\n        window.addEventListener(\"message\", console.log);\n    }\n    return React.createElement(\"div\", { style: { margin: 25 } },\n        React.createElement(\"button\", { onClick: () => console.log(data) }, \"Button\"),\n        React.createElement(VideoDownloads_1.VideoDownloads, { shows: data.shows }));\n};\nexports.createApp = function (data) {\n    return React.createElement(exports.App, { data: data });\n};\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/ssr/components/app/App.tsx?");

/***/ }),

/***/ "./src/ts/VideoDownloader/ssr/components/app/EpisodeDownload.tsx":
/*!***********************************************************************!*\
  !*** ./src/ts/VideoDownloader/ssr/components/app/EpisodeDownload.tsx ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst iframe_1 = __webpack_require__(/*! ../../../../util/sandbox/iframe */ \"./src/ts/util/sandbox/iframe.ts\");\nconst anyWindow_1 = __webpack_require__(/*! ../../../../util/window/anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nconst RawVideoDownload_1 = __webpack_require__(/*! ./RawVideoDownload */ \"./src/ts/VideoDownloader/ssr/components/app/RawVideoDownload.tsx\");\nclass EpisodeDownload extends react_1.Component {\n    constructor(props) {\n        super(props);\n        this.state = {};\n        anyWindow_1.inBrowser(async () => {\n            const { number, name, url, videoServerUrl } = this.props.episode;\n            window.addEventListener(\"message\", ({ data }) => {\n                const { url: downloadUrl, href } = data;\n                if (downloadUrl && href === videoServerUrl) {\n                    console.log({ url, downloadUrl });\n                    this.setState({ url: downloadUrl });\n                }\n            });\n            if (number > 1 || name !== \"Winter is Coming\") {\n                return;\n            }\n            console.log(url);\n            const iframe = await iframe_1.createIframeSandbox(videoServerUrl);\n        });\n    }\n    render() {\n        const { props: { episode: { name, number } }, state: { url } } = this;\n        // TODO add loading spinner\n        return React.createElement(\"div\", null,\n            \"Episode \",\n            number,\n            \": \",\n            name,\n            url && React.createElement(RawVideoDownload_1.RawVideoDownload, { url: url }));\n    }\n}\nexports.EpisodeDownload = EpisodeDownload;\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/ssr/components/app/EpisodeDownload.tsx?");

/***/ }),

/***/ "./src/ts/VideoDownloader/ssr/components/app/RawVideoDownload.tsx":
/*!************************************************************************!*\
  !*** ./src/ts/VideoDownloader/ssr/components/app/RawVideoDownload.tsx ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nclass RawVideoDownload extends react_1.Component {\n    constructor(props) {\n        super(props);\n    }\n    render() {\n        return React.createElement(\"div\", null, this.props.url);\n    }\n}\nexports.RawVideoDownload = RawVideoDownload;\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/ssr/components/app/RawVideoDownload.tsx?");

/***/ }),

/***/ "./src/ts/VideoDownloader/ssr/components/app/SeasonDownload.tsx":
/*!**********************************************************************!*\
  !*** ./src/ts/VideoDownloader/ssr/components/app/SeasonDownload.tsx ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst EpisodeDownload_1 = __webpack_require__(/*! ./EpisodeDownload */ \"./src/ts/VideoDownloader/ssr/components/app/EpisodeDownload.tsx\");\nexports.SeasonDownload = ({ season: { number, episodes } }) => React.createElement(\"div\", null,\n    \"Season \",\n    number,\n    episodes.map((episode, i) => React.createElement(EpisodeDownload_1.EpisodeDownload, { episode: episode, key: i })));\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/ssr/components/app/SeasonDownload.tsx?");

/***/ }),

/***/ "./src/ts/VideoDownloader/ssr/components/app/ShowDownload.tsx":
/*!********************************************************************!*\
  !*** ./src/ts/VideoDownloader/ssr/components/app/ShowDownload.tsx ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst SeasonDownload_1 = __webpack_require__(/*! ./SeasonDownload */ \"./src/ts/VideoDownloader/ssr/components/app/SeasonDownload.tsx\");\nexports.ShowDownload = ({ show: { name, seasons } }) => React.createElement(\"div\", null,\n    name,\n    seasons.map((season, i) => React.createElement(SeasonDownload_1.SeasonDownload, { season: season, key: i })));\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/ssr/components/app/ShowDownload.tsx?");

/***/ }),

/***/ "./src/ts/VideoDownloader/ssr/components/app/VideoDownloads.tsx":
/*!**********************************************************************!*\
  !*** ./src/ts/VideoDownloader/ssr/components/app/VideoDownloads.tsx ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst ShowDownload_1 = __webpack_require__(/*! ./ShowDownload */ \"./src/ts/VideoDownloader/ssr/components/app/ShowDownload.tsx\");\nexports.VideoDownloads = ({ shows }) => React.createElement(\"div\", null, shows.all.map((show, i) => React.createElement(ShowDownload_1.ShowDownload, { show: show, key: i })));\n\n\n//# sourceURL=webpack:///./src/ts/VideoDownloader/ssr/components/app/VideoDownloads.tsx?");

/***/ }),

/***/ "./src/ts/util/cache/cache.ts":
/*!************************************!*\
  !*** ./src/ts/util/cache/cache.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getter = function (t) {\n    return () => t;\n};\nexports.makeGetter = function () {\n    return exports.getter;\n};\nexports.cache = function (getter) {\n    return exports.refreshableCache(getter).get;\n};\nexports.refreshableCache = function (getter, onRefresh = () => {\n}) {\n    let cache;\n    const get = ((...args) => cache !== undefined ? cache : (cache = getter(...args)));\n    const refresh = () => {\n        cache = undefined;\n        onRefresh();\n    };\n    return {\n        get,\n        refresh,\n        getRefreshed: ((...args) => {\n            refresh();\n            return get(...args);\n        }),\n    };\n};\nexports.asyncCache = function (getter, onRefresh) {\n    return exports.refreshableAsyncCache(getter, onRefresh).get;\n};\nexports.refreshableAsyncCache = function (getter, onRefresh = () => {\n}) {\n    let cache;\n    const refresh = () => {\n        cache = undefined;\n        onRefresh();\n    };\n    const get = (args) => cache !== undefined ? cache : cache = (async () => cache = await getter(args))();\n    return {\n        get,\n        refresh,\n        getRefreshed: async (args) => {\n            refresh();\n            return await get(args);\n        },\n    };\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/cache/cache.ts?");

/***/ }),

/***/ "./src/ts/util/collections/query/All.ts":
/*!**********************************************!*\
  !*** ./src/ts/util/collections/query/All.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.All = {\n    of(a, bySample) {\n        const map = (key) => new Map(a.map(e => [e[key], e]));\n        const mapBy = (key) => {\n            const byMap = map(key);\n            return (by) => byMap.get(by);\n        };\n        const maps = Object.keys(bySample)\n            .map(key => [key, mapBy(key)]);\n        const byMap = maps.toObject();\n        return {\n            all: a,\n            by: Object.assign(byMap, {\n                index: (i) => a[i],\n            }),\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/collections/query/All.ts?");

/***/ }),

/***/ "./src/ts/util/data/DataAccessor.ts":
/*!******************************************!*\
  !*** ./src/ts/util/data/DataAccessor.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst cache_1 = __webpack_require__(/*! ../cache/cache */ \"./src/ts/util/cache/cache.ts\");\nconst All_1 = __webpack_require__(/*! ../collections/query/All */ \"./src/ts/util/collections/query/All.ts\");\nconst objectFields_1 = __webpack_require__(/*! ../object/objectFields */ \"./src/ts/util/object/objectFields.ts\");\nconst isType_1 = __webpack_require__(/*! ../types/isType */ \"./src/ts/util/types/isType.ts\");\nexports.DataAccessorFactory = {\n    for() {\n        return {\n            new: ({ source, parse, preParsed = () => [], create, by }, argsGetter) => {\n                return cache_1.refreshableAsyncCache(async (sources) => {\n                    const args = await objectFields_1.objectFields.awaitRefreshableCaches(argsGetter, sources);\n                    const raw = await source(sources)(args);\n                    const parsed = raw.map(parse);\n                    // do it twice so index is correct 2nd time\n                    const a = [\n                        ...parsed.filter((e, i) => create(e, i, args)),\n                        ...preParsed(args),\n                    ].mapFilter((e, i) => create(e, i, args));\n                    return {\n                        ...All_1.All.of(a, by),\n                        parsed,\n                        raw,\n                    };\n                });\n            },\n            mapped: (create, by, argsGetter) => {\n                return cache_1.refreshableAsyncCache(async (source) => {\n                    return All_1.All.of(create(await objectFields_1.objectFields.awaitRefreshableCaches(argsGetter, source)), by);\n                });\n            },\n            data: (dataAccessors) => {\n                return cache_1.refreshableAsyncCache((source) => {\n                    const _source = isType_1.isFunction(source) ? source() : source;\n                    const dataPromises = dataAccessors.mapFields(e => e.get(_source));\n                    return objectFields_1.objectFields.awaitAll(dataPromises);\n                }, () => Object.values(dataAccessors).forEach(e => e.refresh()));\n            },\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/data/DataAccessor.ts?");

/***/ }),

/***/ "./src/ts/util/extensions/allExtensions.ts":
/*!*************************************************!*\
  !*** ./src/ts/util/extensions/allExtensions.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst compare_1 = __webpack_require__(/*! ../misc/compare */ \"./src/ts/util/misc/compare.ts\");\nconst equals_1 = __webpack_require__(/*! ../misc/equals */ \"./src/ts/util/misc/equals.ts\");\nconst mapFields_1 = __webpack_require__(/*! ../object/mapFields */ \"./src/ts/util/object/mapFields.ts\");\nconst Truthy_1 = __webpack_require__(/*! ../types/Truthy */ \"./src/ts/util/types/Truthy.ts\");\nconst anyWindow_1 = __webpack_require__(/*! ../window/anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nconst extensionsConfig_1 = __webpack_require__(/*! ./extensionsConfig */ \"./src/ts/util/extensions/extensionsConfig.ts\");\nconst immutableDescriptor = Object.freeze({\n    writable: extensionsConfig_1.writableExtensions,\n    enumerable: false,\n    configurable: true,\n});\nconst defineSharedProperties = function (obj, sharedDescriptor, propertyValues, overwrite = true) {\n    const properties = Object.getOwnPropertyDescriptors(propertyValues);\n    Object.entries(properties).forEach(([propertyName, property]) => {\n        if (!overwrite && obj[propertyName]) {\n            return;\n        }\n        property = { ...property, ...sharedDescriptor };\n        if (property.get || property.set) {\n            delete property.writable;\n        }\n        properties[propertyName] = property;\n    });\n    Object.defineProperties(obj, properties);\n};\ndefineSharedProperties(Object, immutableDescriptor, {\n    defineSharedProperties,\n    defineImmutableProperties(obj, propertyValues, overwrite = true) {\n        defineSharedProperties(obj, immutableDescriptor, propertyValues, overwrite);\n    },\n});\nObject.defineImmutableProperties(Object, {\n    allKeys(t) {\n        return [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];\n    },\n    allValues(t) {\n        return Object.allKeys(t).map(key => t[key]);\n    },\n    allEntries(t) {\n        return Object.allKeys(t).map(key => [key, t[key]]);\n    },\n    definePolyfillProperties(obj, propertyValues) {\n        Object.defineImmutableProperties(obj, propertyValues, false);\n    },\n    getPrototypeChain(object) {\n        const chain = [];\n        for (let o = object; o !== null; o = Object.getPrototypeOf(o)) {\n            chain.push(o);\n        }\n        return chain;\n    },\n    getAllPropertyNames(object) {\n        return Array.from(new Set(Object.getPrototypeChain(object)\n            .flatMap(proto => Object.getOwnPropertyNames(proto))));\n    },\n    assignProperties(target, ...sources) {\n        for (const source of sources) {\n            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));\n        }\n    },\n    getting(key) {\n        return o => o[key];\n    },\n    deleting(key) {\n        return o => {\n            delete o[key];\n            return o;\n        };\n    },\n});\nObject.defineImmutableProperties(Object.prototype, {\n    _hasProperty(property) {\n        for (let o = this; o !== null; o = Object.getPrototypeOf(o)) {\n            if (o.hasOwnProperty(property)) {\n                return true;\n            }\n        }\n        return false;\n    },\n    freeze() {\n        return Object.freeze(this);\n    },\n    seal() {\n        return Object.seal(this);\n    },\n    shallowClone() {\n        return Object.assign(Object.create(null), this);\n    },\n    fullClone() {\n        return Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));\n    },\n    mapFields(mapper) {\n        return mapFields_1.mapFields(this, mapper);\n    },\n    freezeFields() {\n        for (const value of Object.values(this)) {\n            value.freeze();\n        }\n        return this;\n    }\n});\nObject.defineImmutableProperties(Function, {\n    compose(...funcs) {\n        const numFuncs = funcs.length;\n        if (numFuncs === 0) {\n            return () => undefined;\n        }\n        const [firstFunc, ...restFunc] = funcs;\n        if (numFuncs === 1) {\n            return firstFunc();\n        }\n        return function (...args) {\n            let result = firstFunc();\n            for (const func of funcs) {\n                result = func(result);\n            }\n            return result;\n        };\n    },\n});\nObject.defineImmutableProperties(Function.prototype, {\n    then_(nextFunc) {\n        return (arg) => nextFunc(this(arg));\n    },\n    applyReturning() {\n        return (arg) => {\n            this(arg);\n            return arg;\n        };\n    },\n    mapping() {\n        return array => array.map(this);\n    },\n    applying() {\n        return array => this(...array);\n    },\n    timed() {\n        const timer = (...args) => {\n            const { name } = this;\n            console.time(name);\n            const returnValue = this(...args);\n            console.timeEnd(name);\n            return returnValue;\n        };\n        return timer.named(\"timing_\" + this.name);\n    },\n    setName(name) {\n        Object.defineProperties(this, {\n            name: {\n                value: name,\n            },\n        });\n    },\n    named(name) {\n        this.setName(name);\n        return this;\n    },\n    negate() {\n        return ((...args) => !this(...args));\n    },\n});\nObject.defineImmutableProperties(Array.prototype, {\n    size() {\n        return this.length;\n    },\n    last() {\n        return this[this.length - 1];\n    },\n    clear() {\n        this.length = 0;\n    },\n    removeAt(index) {\n        return this.splice(index, 1)[0];\n    },\n    remove(value, equals) {\n        const i = !equals ? this.indexOf(value) : this.findIndex(equals_1.equals.bind(equals, value));\n        if (i !== -1) {\n            return this.removeAt(i);\n        }\n    },\n    add(index, value) {\n        this.splice(index, 0, value);\n    },\n    addAll(values, index = this.length) {\n        if (index === this.length) {\n            this.push(...values);\n        }\n        else {\n            this.splice(index, 0, ...values);\n        }\n    },\n    applyOn(func) {\n        return func(this);\n    },\n    callOn(func) {\n        return func(...this);\n    },\n    toObject(noPrototype = false) {\n        let o = noPrototype ? Object.create(null) : {};\n        for (const [k, v] of this) {\n            o[k] = v;\n        }\n        return o;\n    },\n    sortBy(key) {\n        return this.sort(compare_1.cmp.byNumber(key));\n    },\n    random() {\n        return this[Math.floor(Math.random() * this.length)];\n    },\n    mapCall() {\n        return this.map(f => f());\n    },\n    callEach(u) {\n        this.forEach(f => f(u));\n    },\n    async asyncForEach(func) {\n        await Promise.all(this.map(func));\n    },\n    mapFilter(map) {\n        return this.map(map).filter(Truthy_1.truthy);\n    },\n    asyncMap(map) {\n        return Promise.all(this.map(map));\n    },\n    async asyncFilter(filter) {\n        return (await Promise.all(this.map(async (value, index, array) => ({ value, filtered: await filter(value, index, array) })))).filter(e => e.filtered).map(e => e.value);\n    },\n    async asyncMapFilter(map) {\n        return (await Promise.all(this.map(map))).filter(Truthy_1.truthy);\n    },\n    readOnly() {\n        return this;\n    },\n    _() {\n        return this;\n    },\n});\nObject.definePolyfillProperties(Array.prototype, {\n    flatMap(flatMap, thisArg) {\n        if (thisArg) {\n            flatMap = flatMap.bind(thisArg);\n        }\n        return [].concat(...this.map(flatMap));\n    },\n    flatten(depth = -1) {\n        // TODO faster flatten polyfill\n        return depth === 0\n            ? this\n            : this.reduce((a, e) => a.concat(Array.isArray(e) ? e.flatten(depth - 1) : e), []);\n    },\n});\nconst nativeSlice = String.prototype.slice;\nObject.defineImmutableProperties(String.prototype, {\n    equals(s) {\n        return this === s;\n    },\n    boundEquals() {\n        return s => this === s;\n    },\n    // allow negative indices for end\n    slice(start = 0, end = this.length) {\n        if (end < 0) {\n            end = this.length + end;\n        }\n        return nativeSlice.call(this, start, end);\n    },\n});\nObject.defineImmutableProperties(Number, {\n    isNumber(n) {\n        return !Number.isNaN(n);\n    },\n    toPixels(n) {\n        return Math.round(n) + \"px\";\n    },\n});\nObject.defineImmutableProperties(Map.prototype, {\n    map(map) {\n        return new Map([...this].map(([k, v]) => [k, map(v, k)]));\n    },\n});\nObject.defineImmutableProperties(Set.prototype, {\n    map(map) {\n        return new Set([...this].map(map));\n    },\n});\n// don't touch RegExp.prototype,\n// since modifying it will bail out of RegExp's fast paths.\nif (anyWindow_1.isBrowser) {\n    Object.defineImmutableProperties(Node.prototype, {\n        appendBefore(node) {\n            const { parentNode } = this;\n            parentNode && parentNode.insertBefore(node, this);\n            return node;\n        },\n        appendAfter(node) {\n            const { nextSibling } = this;\n            nextSibling && nextSibling.appendBefore(node);\n            return node;\n        },\n    });\n    Object.defineImmutableProperties(Element.prototype, {\n        clearHTML() {\n            this.innerHTML = \"\";\n        },\n        setAttributes(attributes) {\n            for (const [attribute, value] of Object.entries(attributes)) {\n                if (value) {\n                    this.setAttribute(attribute, value.toString());\n                }\n            }\n        },\n    });\n    Object.defineImmutableProperties(HTMLElement.prototype, {\n        appendTo(parent) {\n            parent.appendChild(this);\n            return this;\n        },\n        appendNewElement(tagName) {\n            return this.appendChild(document.createElement(tagName));\n        },\n        appendDiv() {\n            return this.appendNewElement(\"div\");\n        },\n        appendButton(buttonText) {\n            const button = this.appendNewElement(\"button\");\n            button.innerText = buttonText;\n            return button;\n        },\n        appendBr() {\n            return this.appendNewElement(\"br\");\n        },\n        withInnerText(text) {\n            this.innerText = text;\n            return this;\n        },\n        withInnerHTML(html) {\n            this.innerHTML = html;\n            return this;\n        },\n    });\n    Object.defineImmutableProperties(HTMLIFrameElement.prototype, {\n        activate() {\n            this.appendTo(document.body);\n            return this;\n        },\n    });\n}\nexports.addExtensions = function () {\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/extensions/allExtensions.ts?");

/***/ }),

/***/ "./src/ts/util/extensions/extensionsConfig.ts":
/*!****************************************************!*\
  !*** ./src/ts/util/extensions/extensionsConfig.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.writableExtensions = false;\n\n\n//# sourceURL=webpack:///./src/ts/util/extensions/extensionsConfig.ts?");

/***/ }),

/***/ "./src/ts/util/functional/utils.ts":
/*!*****************************************!*\
  !*** ./src/ts/util/functional/utils.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.identity = (t) => t;\n\n\n//# sourceURL=webpack:///./src/ts/util/functional/utils.ts?");

/***/ }),

/***/ "./src/ts/util/hash/fnv1a.ts":
/*!***********************************!*\
  !*** ./src/ts/util/hash/fnv1a.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst OFFSET_BASIS_32 = 2166136261;\nexports.fnv1a = function (s) {\n    let hash = OFFSET_BASIS_32;\n    for (let i = 0; i < s.length; i++) {\n        hash ^= s.charCodeAt(i);\n        // 32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16777619\n        // Using bitshift for accuracy and performance. Numbers in JS suck.\n        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);\n    }\n    return hash | 0;\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/hash/fnv1a.ts?");

/***/ }),

/***/ "./src/ts/util/misc/compare.ts":
/*!*************************************!*\
  !*** ./src/ts/util/misc/compare.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar cmp;\n(function (cmp) {\n    cmp.byNumber = function (keyExtractor) {\n        return (t1, t2) => keyExtractor(t1) - keyExtractor(t2);\n    };\n    cmp.byNumeric = function (keyExtractor) {\n        return cmp.byNumber(keyExtractor.then_(e => e.valueOf()));\n    };\n    cmp.byString = function (keyExtractor) {\n        return (t1, t2) => {\n            const k1 = keyExtractor(t1);\n            const k2 = keyExtractor(t2);\n            return k1 === k2 ? 0 : k1 < k2 ? -1 : 1;\n        };\n    };\n})(cmp = exports.cmp || (exports.cmp = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/compare.ts?");

/***/ }),

/***/ "./src/ts/util/misc/equals.ts":
/*!************************************!*\
  !*** ./src/ts/util/misc/equals.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst hash_1 = __webpack_require__(/*! ./hash */ \"./src/ts/util/misc/hash.ts\");\nconst regex_1 = __webpack_require__(/*! ./regex */ \"./src/ts/util/misc/regex.ts\");\nvar equals;\n(function (equals_1) {\n    const _referential = Object.is;\n    equals_1.referential = function () {\n        return _referential;\n    };\n    equals_1.bind = function (equals, t1) {\n        return t2 => equals(t1, t2);\n    };\n    equals_1.by = function (keyExtractor) {\n        return (t1, t2) => keyExtractor(t1) === keyExtractor(t2);\n    };\n    const _default = function (t1, t2) {\n        return _referential(t1, t2) || equals_1.by(hash_1.hash.referential())(t1, t2);\n    };\n    equals_1.default_ = function () {\n        return _default;\n    };\n    const isReferentialEqualitySource = (() => {\n        const twoArgs = /\\(([^\\s,]*)\\s*,\\s*([^\\s)]*)\\)/;\n        const equality = /\\s*\\1\\s*===\\s*\\2/;\n        const functionBody = regex_1.regex.join(/\\s*{\\s*return/, equality, /\\s*;\\s*}/);\n        const func = regex_1.regex.join(/function\\s*/, twoArgs, functionBody);\n        const arrow = /\\s*=>/;\n        const arrowFuncWithBody = regex_1.regex.join(twoArgs, arrow, functionBody);\n        const arrowFunc = regex_1.regex.join(twoArgs, arrow, equality);\n        return s => [arrowFunc, arrowFuncWithBody, func].some(regex => regex.test(s));\n    })();\n    equals_1.fast = function (equals) {\n        // means equals is using referential equality, don't repeat\n        // double checking referential equality is cheap except for strings\n        const _referential = equals_1.referential();\n        if (equals === _referential || isReferentialEqualitySource(equals.toString())) {\n            return _referential;\n        }\n        return (t1, t2) => t1 === t2 || equals(t1, t2);\n    };\n})(equals = exports.equals || (exports.equals = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/equals.ts?");

/***/ }),

/***/ "./src/ts/util/misc/hash.ts":
/*!**********************************!*\
  !*** ./src/ts/util/misc/hash.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst utils_1 = __webpack_require__(/*! ../functional/utils */ \"./src/ts/util/functional/utils.ts\");\nconst fnv1a_1 = __webpack_require__(/*! ../hash/fnv1a */ \"./src/ts/util/hash/fnv1a.ts\");\nconst isType_1 = __webpack_require__(/*! ../types/isType */ \"./src/ts/util/types/isType.ts\");\nvar hash;\n(function (hash_1) {\n    hash_1.referential = function () {\n        return utils_1.identity;\n    };\n    hash_1.default_ = function () {\n        return JSON.stringify;\n    };\n    hash_1.makeNumber = function (hash) {\n        return isType_1.isNumber(hash) ? hash : fnv1a_1.fnv1a(isType_1.isString(hash) ? hash : hash_1.default_()(hash));\n    };\n})(hash = exports.hash || (exports.hash = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/hash.ts?");

/***/ }),

/***/ "./src/ts/util/misc/regex.ts":
/*!***********************************!*\
  !*** ./src/ts/util/misc/regex.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar regex;\n(function (regex_1) {\n    regex_1.toSource = function (regExp) {\n        const { source, flags } = regExp;\n        return `/${source}/${flags}`;\n    };\n    regex_1.join = function (...regexes) {\n        const source = regexes.map(e => e.source).join(\"\");\n        const flagChars = regexes.map(e => e.flags).join(\"\").split(\"\");\n        const flags = flagChars && [...new Set(flagChars)].join(\"\");\n        return new RegExp(source, flags);\n    };\n    regex_1.matchAll = function (regex, s) {\n        if (!regex.global) {\n            throw new Error(\"trying to matchAll with non global regex\");\n        }\n        const matches = [];\n        let match;\n        while (match = regex.exec(s)) {\n            matches.push(match);\n        }\n        return matches;\n    };\n})(regex = exports.regex || (exports.regex = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/regex.ts?");

/***/ }),

/***/ "./src/ts/util/misc/utils.ts":
/*!***********************************!*\
  !*** ./src/ts/util/misc/utils.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.capitalize = function (word) {\n    return word.length === 0\n        ? \"\"\n        : word[0].toUpperCase() + word.slice(1);\n};\nexports.joinWords = function (words) {\n    const _words = [...words];\n    switch (_words.length) {\n        case 0:\n            return \"\";\n        case 1:\n            return _words[0];\n        case 2:\n            return _words[0] + \" and \" + _words[1];\n        default:\n            const lastWord = _words.pop();\n            return _words.join(\", \") + \", and \" + lastWord;\n    }\n};\nexports.camelCase = (() => {\n    // from react-faux-dom/lib/utils/camelCase.js\n    const hyphenPattern = /-+([a-z])/gi;\n    return function (s) {\n        hyphenPattern.lastIndex = 0;\n        return s.replace(hyphenPattern, (match, c, offset) => {\n            return offset === 0 ? c : c.toUpperCase();\n        });\n    };\n})();\nexports.separateClassName = function (className) {\n    return className.replace(/([A-Z])/g, \" $1\").trim();\n};\nexports.separateFunctionName = function (functionName) {\n    const [first, ...rest] = exports.separateClassName(functionName).split(\" \");\n    return [exports.capitalize(first), ...rest].join(\" \");\n};\nexports.joinNodes = function (nodes, node) {\n    if (nodes.length < 2) {\n        return nodes;\n    }\n    const joinedNodes = [];\n    for (let i = 0, j = 0; i < nodes.length; i++) {\n        joinedNodes.push(nodes[i]);\n        joinedNodes.push(node && node.shallowClone());\n    }\n    joinedNodes.pop();\n    return joinedNodes;\n};\nexports.singletonAsArray = function (singletonOrArray) {\n    return Array.isArray(singletonOrArray) ? singletonOrArray : [singletonOrArray];\n};\nexports.filterInput = function (input, charFilter) {\n    input.value = input.value.split(\"\").filter(charFilter).join(\"\");\n};\n/**\n * Check if a single character string is a allowDigits.\n *\n * @param {string} char a single character string\n * @returns {boolean} if the character is a allowDigits 0-9\n */\nexports.isDigit = function (char) {\n    return !Number.isNaN(parseInt(char));\n};\nexports.onlyDigitsInput = function (input) {\n    exports.filterInput(input, exports.isDigit);\n};\nexports.sleep = function (seconds) {\n    return new Promise(resolve => setTimeout(resolve, seconds * 1000));\n};\nconst regExpLiteralPattern = /\\/([^\\/]+)\\/([gimuy]*)/;\nexports.isRegExpLiteral = function (regex) {\n    return regExpLiteralPattern.test(regex);\n};\nexports.parseRegExpLiteral = function (regex) {\n    const match = regExpLiteralPattern.exec(regex);\n    if (match) {\n        const [, pattern, flags] = match;\n        return new RegExp(pattern, flags);\n    }\n    else {\n        return undefined;\n    }\n};\nexports.escapeRegExp = function (literal, flags) {\n    return new RegExp(literal.replace(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g, \"\\\\$&\"), flags);\n};\nclass NotImplementedError extends Error {\n}\nexports.NotImplementedError = NotImplementedError;\nexports.lowerBound = function (min, n) {\n    return Math.max(min, n);\n};\nexports.upperBound = function (max, n) {\n    return Math.min(max, n);\n};\nexports.bound = function (min, max, n) {\n    return exports.lowerBound(min, exports.upperBound(max, n));\n};\nexports.boundSurrounding = function (min, max, center, halfSize) {\n    return [exports.lowerBound(min, center - halfSize), exports.upperBound(max, center + halfSize)];\n};\nexports.snippet = function (s, center, halfSize) {\n    const [start, end] = exports.boundSurrounding(0, s.length, center, halfSize);\n    return s.slice(start, end);\n};\nexports.boolAsInt = function (bool) {\n    return bool ? 1 : 0;\n};\nexports.moduloIndexer = function (a) {\n    return i => a[i % a.length];\n};\n/**\n * Make an array non-holey.\n *\n * @param {T[]} a holey array\n * @returns {T[]} a blasphemous array\n */\nexports.makeBlasphemous = function (a) {\n    return Object.values(a);\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/utils.ts?");

/***/ }),

/***/ "./src/ts/util/misc/when.ts":
/*!**********************************!*\
  !*** ./src/ts/util/misc/when.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.when = function (bool) {\n    return f => bool && f();\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/when.ts?");

/***/ }),

/***/ "./src/ts/util/object/mapFields.ts":
/*!*****************************************!*\
  !*** ./src/ts/util/object/mapFields.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.mapFields = function (obj, mapper) {\n    const mapped = {};\n    for (const [key, value] of Object.entries(obj)) {\n        mapped[key] = mapper(value);\n    }\n    return mapped;\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/object/mapFields.ts?");

/***/ }),

/***/ "./src/ts/util/object/objectFields.ts":
/*!********************************************!*\
  !*** ./src/ts/util/object/objectFields.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isType_1 = __webpack_require__(/*! ../types/isType */ \"./src/ts/util/types/isType.ts\");\nvar objectFields;\n(function (objectFields) {\n    objectFields.map = function (t, mapper) {\n        return t.mapFields(mapper);\n    };\n    objectFields.callEach = function (functions) {\n        return objectFields.map(functions, f => f());\n    };\n    objectFields.callEachArgs = function (functions, args) {\n        return objectFields.map(functions, f => f(args));\n    };\n    objectFields.awaitAll = function (promises) {\n        if (!Object.values(promises).some(isType_1.isPromise)) {\n            return promises;\n        }\n        return (async () => (await Object.entries(promises)\n            .asyncMap(async ([key, promise]) => [key, await promise])).toObject())();\n    };\n    objectFields.awaitGetters = function (asyncGetters) {\n        return objectFields.awaitAll(objectFields.callEach(asyncGetters));\n    };\n    objectFields.awaitFunctions = function (asyncFunctions, args) {\n        return objectFields.awaitAll(objectFields.callEachArgs(asyncFunctions, args));\n    };\n    objectFields.awaitRefreshableCaches = function (caches, args) {\n        return objectFields.awaitAll(objectFields.map(caches, e => e.get(args)));\n    };\n})(objectFields = exports.objectFields || (exports.objectFields = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/object/objectFields.ts?");

/***/ }),

/***/ "./src/ts/util/sandbox/iframe.ts":
/*!***************************************!*\
  !*** ./src/ts/util/sandbox/iframe.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createIframeSandbox = function (src) {\n    const iframe = document.createElement(\"iframe\");\n    iframe.src = src;\n    iframe.hidden = true;\n    const activatedIframe = iframe.activate();\n    return new Promise((resolve, reject) => {\n        iframe.onload = () => {\n            resolve(activatedIframe);\n        };\n        iframe.onerror = reject;\n    });\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/sandbox/iframe.ts?");

/***/ }),

/***/ "./src/ts/util/ssr/ClientLoader.ts":
/*!*****************************************!*\
  !*** ./src/ts/util/ssr/ClientLoader.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_dom_1 = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\nconst allExtensions_1 = __webpack_require__(/*! ../extensions/allExtensions */ \"./src/ts/util/extensions/allExtensions.ts\");\nconst anyWindow_1 = __webpack_require__(/*! ../window/anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nexports.clientRootDivId = \"client\";\nexports.clientDataField = \"clientData\";\nexports.getClientJsonData = function () {\n    const json = anyWindow_1.anyWindow[exports.clientDataField];\n    return JSON.parse(json);\n};\nexports.ClientLoader = {\n    new(args) {\n        const { deserialize, create } = args;\n        const _load = async () => {\n            allExtensions_1.addExtensions();\n            const data = await deserialize(exports.getClientJsonData());\n            const node = create(data);\n            const clientRoot = document.getElementById(exports.clientRootDivId);\n            if (clientRoot) {\n                console.log(\"hydrating\");\n                react_dom_1.hydrate(node, clientRoot);\n            }\n            else {\n                console.log(\"rendering\");\n                const clientContainer = document.body.appendDiv();\n                clientContainer.id = exports.clientRootDivId;\n                react_dom_1.render(node, clientContainer);\n            }\n        };\n        const load = () => {\n            (async () => {\n                try {\n                    await _load();\n                }\n                catch (e) {\n                    console.error(e);\n                }\n            })();\n        };\n        anyWindow_1.inBrowser(load);\n        return {\n            args,\n            load,\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/ssr/ClientLoader.ts?");

/***/ }),

/***/ "./src/ts/util/types/Truthy.ts":
/*!*************************************!*\
  !*** ./src/ts/util/types/Truthy.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.truthy = function (value) {\n    return !!value;\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/types/Truthy.ts?");

/***/ }),

/***/ "./src/ts/util/types/isType.ts":
/*!*************************************!*\
  !*** ./src/ts/util/types/isType.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst utils_1 = __webpack_require__(/*! ../misc/utils */ \"./src/ts/util/misc/utils.ts\");\nexports.isNativeType = function (type) {\n    const typeName = `[object ${utils_1.capitalize(type)}]`;\n    const toString = Object.prototype.toString;\n    return (o) => toString.call(o) === typeName;\n};\n// can use isNativeType for all, but some can be optimized\nexports.isNull = (o) => o === null;\nexports.isUndefined = (o) => o === undefined;\nexports.isBoolean = (o) => o === true || o === false;\nexports.isNumber = exports.isNativeType(\"number\");\nexports.isString = exports.isNativeType(\"string\");\nexports.isFunction = exports.isNativeType(\"Function\"); // TODO can this be optimized?\nexports.isArray = Array.isArray;\nexports.isReadonlyArray = Array.isArray;\nexports.isRegExp = exports.isNativeType(\"RegExp\");\nexports.isDate = exports.isNativeType(\"Date\");\nexports.isObject = exports.isNativeType(\"object\");\nexports._isTruthy = (o) => !!o;\nexports.isTruthy = () => exports._isTruthy;\nexports.isByConstructor = function (constructor) {\n    return (o) => o.constructor === constructor;\n};\nexports.isDataView = exports.isByConstructor(DataView);\nexports.isArrayBuffer = exports.isByConstructor(ArrayBuffer);\nexports.isPromise = exports.isByConstructor(Promise);\n\n\n//# sourceURL=webpack:///./src/ts/util/types/isType.ts?");

/***/ }),

/***/ "./src/ts/util/window/anyWindow.ts":
/*!*****************************************!*\
  !*** ./src/ts/util/window/anyWindow.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst when_1 = __webpack_require__(/*! ../misc/when */ \"./src/ts/util/misc/when.ts\");\nexports.isBrowser = typeof window !== \"undefined\";\nexports.inBrowser = when_1.when(exports.isBrowser);\nexports.anyWindow = exports.isBrowser ? window : global;\nexports.globals = function (o) {\n    Object.assign(exports.anyWindow, o);\n};\nexports.globalProperties = function (o) {\n    Object.assignProperties(exports.anyWindow, o);\n};\nexports.globals({ globals: exports.globals, globalProperties: exports.globalProperties });\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/ts/util/window/anyWindow.ts?");

/***/ })

/******/ });