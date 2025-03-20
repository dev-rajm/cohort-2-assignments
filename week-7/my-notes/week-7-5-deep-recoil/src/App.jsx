import { RecoilRoot, useRecoilValue } from "recoil";
import {
  networkAtom,
  jobsAtom,
  notificationsAtom,
  messagingAtom,
  totalNotificationSelector,
} from "./store/atom/atoms";

function App() {
  return (
    <>
      <RecoilRoot>
        <MainApp />
      </RecoilRoot>
    </>
  );
}

function MainApp() {
  // Access the value of atoms accordingly
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsNotificationCount = useRecoilValue(jobsAtom);
  const notificationCount = useRecoilValue(notificationsAtom);
  const messageCount = useRecoilValue(messagingAtom);

  // Ugly approach to stop re-calculating the total notification count
  // Better approach is to use selectors in recoil, which do similar like useMemo
  // const totalNotificationCount = useMemo(() => {
  //   return (
  //     networkNotificationCount +
  //     jobsNotificationCount +
  //     notificationCount +
  //     messageCount
  //   );
  // }, [
  //   networkNotificationCount,
  //   jobsNotificationCount,
  //   notificationCount,
  //   messageCount,
  // ]);

  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  return (
    <>
      <button>Home</button>
      <button>
        My network (
        {networkNotificationCount >= 100 ? "99+" : networkNotificationCount})
      </button>
      <button>
        Jobs ({jobsNotificationCount >= 100 ? "99+" : jobsNotificationCount})
      </button>
      <button>Messaging ({messageCount >= 100 ? "99+" : messageCount})</button>
      <button>
        Notification ({notificationCount >= 100 ? "99+" : notificationCount})
      </button>
      <button>Me ({totalNotificationCount})</button>
    </>
  );
}

export default App;
