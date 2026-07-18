export function registerSW() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered:", registration);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
}

export async function askNotificationPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) return "denied";
  try {
    const status = await Notification.requestPermission();
    return status;
  } catch (err) {
    return "denied";
  }
}

export async function notify(title: string, options?: NotificationOptions) {
  if (!("serviceWorker" in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (reg && typeof reg.showNotification === "function") {
      reg.showNotification(title, options || {});
    }
  } catch (err) {
    console.warn("Notification failed:", err);
  }
}
