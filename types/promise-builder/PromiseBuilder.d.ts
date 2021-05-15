import { ReactElement } from "react";
import { AsyncSnapshot } from "../async-snapshot";
export interface PromiseBuilderProps<T> {
    promise?: Promise<T>;
    children: (snapshot: AsyncSnapshot<T>) => ReactElement;
}
export declare function PromiseBuilder<T>(props: PromiseBuilderProps<T>): JSX.Element;
