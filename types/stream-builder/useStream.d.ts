import { AsyncSnapshot } from "../async-snapshot";
export interface SubscribeParams<Data, Error> {
    onNext: (data: Data) => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
}
export declare function useStream<T, Error = Object>(subscribe?: (params: SubscribeParams<T, Error>) => VoidFunction | undefined): AsyncSnapshot<T, Error>;
