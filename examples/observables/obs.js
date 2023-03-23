const rxjs = require("rxjs");

const { Observable } = rxjs;

const obs = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(undefined);
  subscriber.next({ toto: 123 });
  const timer = setTimeout(() => {
    console.log("toto");
    subscriber.next({ toto: 123 });
    subscriber.complete();
  }, 1000);
  //   subscriber.error(new Error("oups..."));

  return () => {
    console.log("on veut me tuer...");
    clearTimeout(timer);
  };
});

const subscription = obs.subscribe({
  next: (data) => {
    console.log("data: ", data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
});
setTimeout(() => {
  subscription.unsubscribe();
}, 1500);
