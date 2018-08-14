import * as React from "react";
import {Children, CSSProperties, SFC} from "react";

export const StyleGroup: SFC<{style: CSSProperties}> = ({style, children}) => <>
    {Children.map(children, (child, i) => <span key={i} style={style}>{child}</span>)}
</>;