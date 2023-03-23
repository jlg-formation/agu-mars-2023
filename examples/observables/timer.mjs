import { interval, map, Observable, timer } from "rxjs";

const func = (obs) => {
  return new Observable((s) => {
    obs.subscribe({
      next: (data) => {
        s.next("Hello World");
      },
      error: (err) => s.error(),
      complete: () => s.complete(),
    });
  });
};
const repeat = map((x) => x + x + "");

timer(1000)
  .pipe(func, repeat, repeat, repeat, repeat, repeat, repeat)
  .subscribe(console.log);
