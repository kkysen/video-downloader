import {ReactElement} from "react";
import {ElementByTag, ElementTag} from "../../types/ElementTags";
import {FauxElement} from "./FauxElement";

export interface FauxComponent<Real extends Element> {
    
    readonly element: Real;
    
    readonly render: () => ReactElement<any>;
    
}

export interface FauxComponentClass {
    
    "new"<K extends ElementTag>(tagName: K): FauxComponent<ElementByTag<K>>;
    
}

export const FauxComponent: FauxComponentClass = {
    
    new<K extends ElementTag>(tagName: K): FauxComponent<ElementByTag<K>> {
        const element = FauxElement.new(tagName);
        return {
            element,
            render: element.render,
        };
    },
    
};