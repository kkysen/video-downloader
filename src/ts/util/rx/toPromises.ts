import {Observable} from "rxjs/index";

export const toPromises = function<T>(observable: Observable<T>): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const a: T[] = [];
        observable.subscribe(
            t => a.push(t),
            error => reject(error),
            () => resolve(a),
        );
    });
};