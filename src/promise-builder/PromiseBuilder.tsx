import React, { ReactElement } from "react";
import { AsyncSnapshot } from "../async-snapshot";
import { usePromise } from "./usePromise";

export interface PromiseBuilderProps<T> {
  promise?: Promise<T>;
  children: (snapshot: AsyncSnapshot<T>) => ReactElement;
}

export function PromiseBuilder<T>(props: PromiseBuilderProps<T>) {
  const snapshot = usePromise(props.promise);

  return <>{props.children(snapshot)}</>;
}
