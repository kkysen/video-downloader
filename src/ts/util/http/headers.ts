import {Response} from "express";

export const setBrotliHeaders = function(response: Response, type: "html" | "js", compressed: boolean): void {
    console.log(type);
    if (!compressed) {
        return;
    }
    response.setHeader("Vary", "Accept-Encoding");
    for (const [key, value] of Object.entries({
        Vary: "Accept-Encoding",
        "Content-Encoding": "br",
        "Content-Type": {
            "html": "text/html",
            "js": "text/javascript",
        }[type],
    })) {
        response.setHeader(key, value);
    }
};