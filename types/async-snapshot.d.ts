declare type ConnectionState = "none" | "waiting" | "active" | "done";
export declare class AsyncSnapshot<T, Error = Object> {
    readonly state: ConnectionState;
    readonly data?: T | undefined;
    readonly error?: Error | undefined;
    private constructor();
    get hasData(): boolean;
    get hasError(): boolean;
    static none<T, Error = Object>(): AsyncSnapshot<T, Error>;
    static waiting<T, Error = Object>(): AsyncSnapshot<T, Error>;
    static withData<T, Error = Object>(state: ConnectionState, data?: T): AsyncSnapshot<T, Error>;
    static withError<T, Error = Object>(state: ConnectionState, error: Error): AsyncSnapshot<T, Error>;
    toString(): string;
}
export {};
