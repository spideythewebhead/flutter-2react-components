import React, { ReactElement } from "react";
import { AsyncSnapshot } from "../async-snapshot";
import { SubscribeParams, useStream } from "./useStream";

export interface StreamBuilderProps<Data, Error = Object> {
  subscribe?: (params: SubscribeParams<Data, Error>) => VoidFunction;
  children: (snapshot: AsyncSnapshot<Data, Error>) => ReactElement;
}

export function StreamBuilder<T>(props: StreamBuilderProps<T>) {
  const snapshot = useStream(props.subscribe);

  return <>{props.children(snapshot)}</>;
}
