interface Lottie {
  id: number,
  name: string,
  source: string
}
interface Lotties {
  lotties: Array<Lottie>
}

interface Callback {
  (bAvailable: boolean): void
}
interface Window {
  appRouter(packageName: string, path: string, params?: object, confirm?: string): void;
  channelReady(callback: Callback);
}