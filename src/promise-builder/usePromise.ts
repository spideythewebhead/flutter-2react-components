import { useEffect, useState } from "react";
import { AsyncSnapshot } from "../async-snapshot";

export function usePromise<T>(promise?: Promise<T>) {
  const [state, setState] = useState<AsyncSnapshot<T>>(AsyncSnapshot.none());

  useEffect(() => {
    if (!promise) {
      setState(AsyncSnapshot.none());
      return;
    }

    setState(AsyncSnapshot.waiting());

    let changed = false;

    promise
      .then((value) => {
        if (!changed) {
          setState(AsyncSnapshot.withData("done", value));
        }
      })
      .catch((error) => {
        if (!changed) {
          setState(AsyncSnapshot.withError("done", error));
        }
      });

    return () => {
      changed = true;
    };
  }, [promise]);

  return state;
}
