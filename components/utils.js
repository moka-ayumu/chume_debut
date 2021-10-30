export function shallowPush(e) {
  if (!clickProccess && `/${pid}` != e) {
    clickProccess = true;
    if (pid == "main") {
      router.push(e, undefined, { shallow: true });
    } else {
      returnAnimation().then(() => {
        router.push(e, undefined, { shallow: true });
      });
    }
  } else {
  }
}
