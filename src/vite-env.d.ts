/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TOKEN: string;
    // 다른 환경 변수가 있다면 여기에 추가합니다.
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }