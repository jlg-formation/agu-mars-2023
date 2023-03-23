const rxjs = require("rxjs");

const { Subject } = rxjs;

const subject = new Subject();
subject.next(34);

setTimeout(() => {
  subject.next(56);
  subject.complete();
}, 1000);

const s1 = subject.subscribe({
  next: (data) => {
    console.log("s1 data: ", data);
  },
  error: (err) => {
    console.log("s1 err: ", err);
  },
  complete: () => {
    console.log("s1 complete");
  },
});
const s2 = subject.subscribe({
  next: (data) => {
    console.log("s2 data: ", data);
  },
  error: (err) => {
    console.log("s2 err: ", err);
  },
  complete: () => {
    console.log("s2 complete");
  },
});
