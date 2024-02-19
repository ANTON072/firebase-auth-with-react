/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CSSProperties,
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";

import useInterval from "../hooks/useInterval";

export type LoadingBarRef = {
  continuousStart: () => void;
  complete: () => void;
};

const COLOR = "red";
const LOADER_SPEED = 500;
const TRANSITION_TIME = 300;
const WAITING_TIME = 300;

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomValue = (min: number, max: number) =>
  Math.random() * (max - min + 1) + min;

const initialLoaderStyle: CSSProperties = {
  height: "100%",
  background: COLOR,
  transition: `all ${LOADER_SPEED}ms ease`,
  width: "0%",
};

const loaderContainerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "2px",
  backgroundColor: "transparent",
  zIndex: 99999999999,
  width: `100%`,
};

const initialShadowStyles: CSSProperties = {
  boxShadow: `0  0 10px ${COLOR}, 0 0 10px ${COLOR}`,
  width: "5%",
  opacity: 1,
  position: "absolute",
  height: "100%",
  transition: `all ${LOADER_SPEED}ms ease`,
  transform: "rotate(3deg) translate(0px, -4px)",
  left: "-10rem",
};

const LoadingBar = forwardRef<LoadingBarRef, {}>((props, ref) => {
  const isMounted = useRef(false);
  const [localProgress, localProgressSet] = useState<number>(0);

  const pressedContinuous = useRef({ active: false });

  const [loaderStyle, loaderStyleSet] =
    useState<CSSProperties>(initialLoaderStyle);

  const [shadowStyle, shadowStyleSet] =
    useState<CSSProperties>(initialShadowStyles);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const checkIfFull = (_progress: number) => {
    if (_progress >= 100) {
      // ちょっと待つ
      loaderStyleSet({
        ...loaderStyle,
        width: "100%",
      });
      shadowStyleSet({
        ...shadowStyle,
        left: `${_progress - 10}%`,
      });
      setTimeout(() => {
        if (!isMounted.current) {
          return;
        }

        loaderStyleSet({
          ...loaderStyle,
          opacity: 0,
          width: "100%",
          transition: `all ${TRANSITION_TIME}ms ease-out`,
        });

        setTimeout(() => {
          if (!isMounted.current) {
            return;
          }

          if (pressedContinuous.current.active) {
            localProgressSet(0);
            pressedContinuous.current.active = false;
            checkIfFull(0);
          }
        }, TRANSITION_TIME);
      }, WAITING_TIME);
    } else {
      loaderStyleSet((_loaderStyle) => ({
        ...loaderStyle,
        width: `${_progress}%`,
        opacity: 1,
        transition: _progress > 0 ? `all ${LOADER_SPEED}ms ease` : "",
      }));
      shadowStyleSet({
        ...shadowStyle,
        left: `${_progress - 5.5}%`,
        transition: _progress > 0 ? `all ${LOADER_SPEED}ms ease` : "",
      });
    }
  };

  // 親コンポーネントにカスタムrefハンドルを公開する
  // https://ja.react.dev/reference/react/useImperativeHandle#exposing-a-custom-ref-handle-to-the-parent-component
  useImperativeHandle(ref, () => ({
    continuousStart() {
      const val = randomInt(10, 20);

      pressedContinuous.current.active = true;

      localProgressSet(val);
      checkIfFull(val);
    },
    complete() {
      localProgressSet(100);
      checkIfFull(100);
    },
  }));

  useInterval(() => {
    const minValue = Math.min(10, (100 - localProgress) / 5);
    const maxValue = Math.min(20, (100 - localProgress) / 3);

    const random = randomValue(minValue, maxValue);

    if (localProgress + random < 95) {
      localProgressSet(localProgress + random);
      checkIfFull(localProgress + random);
    }
  }, pressedContinuous.current.active);

  return (
    <div style={loaderContainerStyle}>
      <div style={loaderStyle}>
        <div style={shadowStyle} />
      </div>
    </div>
  );
});

export default LoadingBar;
