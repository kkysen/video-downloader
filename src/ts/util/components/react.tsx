import * as React from "react";
import {Fragment, ReactNode} from "react";

export const renderNodes = function(nodes: ReactNode[]): ReactNode {
    return nodes.map((node, i) => <Fragment key={i}>{node}</Fragment>);
};

export const renderNodesObj = function(nodes: {[key: string]: ReactNode}): ReactNode {
    return renderNodes(Object.values(nodes));
};