import { ReactElement } from "react";
import { AsyncSnapshot } from "../async-snapshot";
import { SubscribeParams } from "./useStream";
export interface StreamBuilderProps<Data, Error = Object> {
    subscribe?: (params: SubscribeParams<Data, Error>) => VoidFunction;
    children: (snapshot: AsyncSnapshot<Data, Error>) => ReactElement;
}
export declare function StreamBuilder<T>(props: StreamBuilderProps<T>): JSX.Element;
