type ConnectionState = "none" | "waiting" | "active" | "done";

function isNull(value: any) {
  return value === undefined || value === null;
}

export class AsyncSnapshot<T, Error = Object> {
  private constructor(
    public readonly state: ConnectionState,
    public readonly data?: T,
    public readonly error?: Error
  ) {}

  get hasData() {
    return !isNull(this.data);
  }

  get hasError() {
    return !isNull(this.error);
  }

  public static none<T, Error = Object>() {
    return new AsyncSnapshot<T, Error>("none");
  }

  public static waiting<T, Error = Object>() {
    return new AsyncSnapshot<T, Error>("waiting");
  }

  public static withData<T, Error = Object>(state: ConnectionState, data?: T) {
    return new AsyncSnapshot<T, Error>(state, data);
  }

  public static withError<T, Error = Object>(
    state: ConnectionState,
    error: Error
  ) {
    return new AsyncSnapshot<T, Error>(state, undefined, error);
  }

  toString() {
    return `AsyncSnapshot<>(state: ${this.state}, data: ${this.data}, error: ${this.error})`;
  }
}
