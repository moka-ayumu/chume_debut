export function shallowPush(e) {
  if (!clickProccess && `./${pid}` != e) {
    clickProccess = true;
    if (pid == "main") {
      router.push(e, undefined, { shallow: true });
    } else {
      returnAnimation().then(() => {
        console.log("return done");
        router.push(e, undefined, { shallow: true });
      });
    }
  } else {
    console.log("clickProccess: TRUE");
  }
}
