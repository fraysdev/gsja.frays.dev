export {};

declare global {
  interface Window {
    c: (n: number) => void;
  }
}
