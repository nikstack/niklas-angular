import { BehaviorSubject, map, Observable } from "rxjs";

export default class State<T> {
  private readonly _processed: BehaviorSubject<T>

  constructor(
    startValue: T
  ) {
    this._plain = startValue;
    this._processed = new BehaviorSubject<T>(this._plain);
  }

  private _processor: (plain: T) => T = plain => plain;

  get processor(): ((plain: T) => T) {
    return this._processor;
  }

  set processor(value: ((plain: T) => T)) {
    this._processor = value;
  }

  get processed(): Observable<T> {
    return this._processed;
  }

  private _plain: T

  get plain(): T {
    return this._plain;
  }

  unsetProcessor() {
    this._processor = plain => plain;
  }

  set(value: T) {
    if (value === this._plain) {
      return;
    }
    this._plain = value;
    this._processed.next(this.processor(this.plain));
  }
}
