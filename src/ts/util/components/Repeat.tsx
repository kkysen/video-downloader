import * as React from "react";
import {Fragment, ReactNode, SFC} from "react";
import {Range} from "../collections/Range";

export const Repeat: SFC<{times: number, render: () => ReactNode}> = ({times, render}) => {
    const node = render();
    return <>
        {Range.new(times).map(i => <Fragment key={i}>{node}</Fragment>)}
    </>;
};