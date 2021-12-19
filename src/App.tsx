import {
  MakeGenerics,
  Outlet,
  ReactLocation,
  Router,
  useMatch
} from "react-location";
import "./styles.css";

type AppLocationGenerics = MakeGenerics<{
  LoaderData: { session: { isLoggedIn: boolean }; index: string };
}>;

const fetchAppData = async () => {
  await new Promise((r) => setTimeout(r, 100));
  return { session: { isLoggedIn: true } };
};

const fetchIndexData = async () => {
  await new Promise((r) => setTimeout(r, 3000));
  return { index: "Heavy Data" };
};

const App = () => {
  const {
    data: { session }
  } = useMatch<AppLocationGenerics>();

  if (!session) {
    return <>Error: Something happens...</>;
  }

  return (
    <div className="App">
      <p>LoggedIn: {session.isLoggedIn.toString()}</p>
      <Outlet />
    </div>
  );
};

const Index = () => {
  const {
    data: { index }
  } = useMatch<AppLocationGenerics>();

  if (!index) {
    return <>Error: Something happens...</>;
  }

  return <div>{index}</div>;
};

const Loading = () => {
  return <h1>Loading...</h1>;
};

const routes = [
  {
    element: <App />,
    loader: async () => {
      return await fetchAppData();
    },
    children: [
      {
        path: "/",
        element: <Index />,
        loader: async () => {
          return await fetchIndexData();
        }
      }
    ]
  }
];

export default function Root() {
  return (
    <Router
      location={new ReactLocation()}
      routes={routes}
      defaultPendingMs={500}
      defaultPendingElement={<Loading />}
    >
      <Outlet />
    </Router>
  );
}
