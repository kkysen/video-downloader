import * as React from "react";
import {SFC} from "react";
import {Repeat} from "./Repeat";

export const Br: SFC<{times?: number}> = ({times = 1}) => <Repeat times={times} render={() => <br/>}/>;