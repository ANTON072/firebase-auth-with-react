import { useState, useSyncExternalStore } from "react";

import { FirebaseApp, initializeApp } from "firebase/app";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOs89nz08JfXMTEVMKeAobr4jnfdn-kS8",
  authDomain: "fir-auth-with-react-19c71.firebaseapp.com",
  projectId: "fir-auth-with-react-19c71",
  storageBucket: "fir-auth-with-react-19c71.appspot.com",
  messagingSenderId: "641069045081",
  appId: "1:641069045081:web:c0686ebdb3286bbb806848",
};

export interface AuthState {
  status: "loading" | "login" | "logout";
  user: User | undefined;
}

export const initialState: AuthState = {
  status: "loading",
  user: undefined,
};

const getStore = (app: FirebaseApp) => {
  let state: AuthState = initialState;

  return {
    // コンポーネントが必要とするストアにあるデータのスナップショットを返す関数
    getSnapshot: () => state,
    // ストアのデータの初期スナップショットを返す
    // サーバーレンダリング中、およびクライアント上でのサーバーレンダリングされたコンテンツのハイドレーション中にのみ使用される
    getServerSnapshot: () => initialState,
    // ストアにサブスクライブを開始する
    subscribe: (callback: () => void) => {
      const auth = getAuth(app);
      // 戻り値で購読を解除が可能
      // https://firebase.google.com/docs/reference/js/auth.auth.md?hl=ja#authonauthstatechanged
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
          state = {
            status: "login",
            user,
          };
        } else {
          state = {
            status: "logout",
            user: undefined,
          };
        }
        callback();
      });

      return () => {
        unsubscribe();
      };
    },
  };
};

const useFirebaseAuthState = () => {
  const app = initializeApp(firebaseConfig);
  const [store] = useState(() => getStore(app));

  const state = useSyncExternalStore<AuthState>(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  return state;
};

export default useFirebaseAuthState;
