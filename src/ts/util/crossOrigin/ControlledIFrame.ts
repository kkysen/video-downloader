import {createIframeSandbox} from "../sandbox/iframe";
import {PendingPromise} from "../sandbox/SandboxMessenger";
import {inBrowser, isBrowser} from "../window/anyWindow";

export interface ControlledIFrame {
    
    <T, R>(f: (t: T) => R, t: T): Promise<R>;
    
    <R>(f: () => R): Promise<R>;
    
}

export const ControlledIFrame = {
    
    new: async (src: string): Promise<ControlledIFrame> => {
        if (!isBrowser) {
            return (<T, R>(f: (t: T) => R, t: T): Promise<R> => {
                return Promise.resolve(f(t));
            }) as ControlledIFrame;
        }
        const iframe = await createIframeSandbox(src);
        const window = iframe.contentWindow;
        let nextId = 0;
        const promises: Map<number, PendingPromise> = new Map();
        addEventListener("message", ({data: {id, evaluated}}) => {
            const promise = promises.get(id as number);
            promise && promise.resolve(evaluated);
        });
        return (<T, R>(f: (t: T) => R, t: T): Promise<R> => {
            const id = nextId++;
            window.postMessage({id, evaluate: f.toString(), args: t}, "*");
            return new Promise((resolve, reject) => {
                promises.set(id, {resolve, reject});
            });
        }) as ControlledIFrame;
    }
    
};