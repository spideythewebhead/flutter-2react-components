import { useEffect, useState } from "react";
import { AsyncSnapshot } from "../async-snapshot";

export interface SubscribeParams<Data, Error> {
  onNext: (data: Data) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

export function useStream<T, Error = Object>(
  subscribe?: (params: SubscribeParams<T, Error>) => VoidFunction | undefined
) {
  const [state, setState] = useState<AsyncSnapshot<T, Error>>(
    AsyncSnapshot.none()
  );

  useEffect(() => {
    if (!subscribe) {
      setState(AsyncSnapshot.none());
      return;
    }

    setState(AsyncSnapshot.waiting());

    return subscribe({
      onNext(data) {
        setState(AsyncSnapshot.withData("active", data));
      },
      onError(error) {
        setState(AsyncSnapshot.withError("active", error));
      },
      onComplete() {
        setState((current) => AsyncSnapshot.withData("done", current.data));
      },
    });
  }, [subscribe]);

  return state;
}
