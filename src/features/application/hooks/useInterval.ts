import { useEffect, useRef } from "react";

const noop = () => {};

const useInterval = (
  callback: () => void,
  isActive: boolean,
  // 即時実行
  immediate: boolean = false
) => {
  const savedCallback = useRef(noop);

  // レンダー毎にコールバックを保存
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (!immediate || !isActive) return;
    savedCallback.current();
  }, [immediate]);

  useEffect(() => {
    if (!isActive) return undefined;
    const tick = () => savedCallback.current();
    const raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);
};

export default useInterval;
