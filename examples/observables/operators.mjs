import { interval, Observable } from "rxjs";

const interval2 = (delayMs) => {
  return new Observable((s) => {
    let n = 0;
    const timer = setInterval(() => {
      console.log("n=" + n);
      s.next(n);
      n++;
    }, delayMs);

    return () => {
      clearInterval(timer);
    };
  });
};

const obs = interval(1000);

const subsricption = obs.subscribe(console.log);

setTimeout(() => {
  subsricption.unsubscribe();
}, 3500);
