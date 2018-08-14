import * as React from "react";
import {ReactElement, ReactNode} from "react";

export const wrapInDivId = function(node: ReactNode, id: string): ReactElement<any> {
    return <div id={id}>{node}</div>;
};