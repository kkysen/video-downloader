import {ReactElement} from "react";
import {hydrate, render} from "react-dom";
import {addExtensions} from "../extensions/allExtensions";
import {MaybePromise} from "../maybePromise/MaybePromise";
import {anyWindow, inBrowser} from "../window/anyWindow";

export const clientRootDivId = "client";

export const clientDataField = "clientData";

export const getClientJsonData = function <JsonData>(): JsonData {
    const json: string = anyWindow[clientDataField];
    return JSON.parse(json);
};

export interface ClientLoaderArgs<Data, JsonData> {
    deserialize: (jsonData: JsonData) => MaybePromise<Data>;
    create: (data: Data) => ReactElement<any>;
}

export interface ClientLoader<Data, JsonData> {
    readonly args: ClientLoaderArgs<Data, JsonData>;
    readonly load: () => void;
}

export const ClientLoader = {
    
    new<Data, JsonData>(args: ClientLoaderArgs<Data, JsonData>): ClientLoader<Data, JsonData> {
        const {deserialize, create} = args;
        const _load = async (): Promise<void> => {
            addExtensions();
            
            const data = await deserialize(getClientJsonData());
            const node = create(data);
            const clientRoot = document.getElementById(clientRootDivId);
            
            if (clientRoot) {
                console.log("hydrating");
                hydrate(node, clientRoot);
            } else {
                console.log("rendering");
                const clientContainer = document.body.appendDiv();
                clientContainer.id = clientRootDivId;
                render(node, clientContainer);
            }
        };
        
        const load = () => {
            (async () => {
                try {
                    await _load();
                } catch (e) {
                    console.error(e);
                }
            })();
        };
        
        inBrowser(load);
        
        return {
            args,
            load,
        };
    },
    
};