import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
      {
        // <BrowserRouter> // we can ignore basename also
      }
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            {/* 
            * self closing tag:
            * <Route path="/" element={<Body />} /> */}
            <Route path="/" element={<Body />}>
              {/* 
            * same as above but with children:
            * 
          */}
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>

      {/* 
      <h1 className="text-3xl font-bold">
        Hello world!
      </h1> */}
    </>
  )
}

export default App;