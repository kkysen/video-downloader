"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const vidUrl = "https://vidcloud.icu/streaming.php?id=NDkyMTY=&title=Game%20Of%20Thrones%20-%20Season%201&typesub=SUB&sub_es=true&sub=L2dhbWUtb2YtdGhyb25lcy1zZWFzb24tMS1lcGlzb2RlLTEwLWZpcmUtYW5kLWJsb29kL2dhbWUtb2YtdGhyb25lcy1zZWFzb24tMS1lcGlzb2RlLTEwLWZpcmUtYW5kLWJsb29kLnZ0dA==";
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36";
exports.main = async function () {
    const response = axios_1.default({
        url: vidUrl,
        method: "GET",
        headers: {
            origin: "https://www9.fmovies.io",
            referrer: "https://www9.fmovies.io/watch/game-of-thrones-season-1-episode-10-fire-and-blood.html",
            authority: "vidcloud.icu",
            "user-agent": userAgent,
            cookie: "__cfduid=d2c05f8fcaa02dee579dd2d68f60c38e61534147762; tvshow=6kil5f9hrb39anecnmujal33h0; token=5b71548a83b54",
        },
    });
    const { data, status, statusText, headers } = await response;
    console.log({ status, statusText, headers });
    console.log(data.substring(0, 1000));
};
(async () => {
    await exports.main();
    if ("hello".includes("world")) {
        await fetch("https://vidcloud.icu/streaming.php?id=NDkyMTY=&title=Game%20Of%20Thrones%20-%20Season%201&typesub=SUB&sub_es=true&sub=L2dhbWUtb2YtdGhyb25lcy1zZWFzb24tMS1lcGlzb2RlLTEwLWZpcmUtYW5kLWJsb29kL2dhbWUtb2YtdGhyb25lcy1zZWFzb24tMS1lcGlzb2RlLTEwLWZpcmUtYW5kLWJsb29kLnZ0dA==", {
            "credentials": "include",
            "headers": {},
            "referrer": "https://www9.fmovies.io/watch/game-of-thrones-season-1-episode-10-fire-and-blood.html",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors"
        });
    }
})();
//# sourceMappingURL=fmovies.js.map