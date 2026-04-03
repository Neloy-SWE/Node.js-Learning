import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>
      {
        // <BrowserRouter> // we can ignore basename also
      }
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
           <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* 
      <h1 className="text-3xl font-bold">
        Hello world!
      </h1> */}
    </>
  )
}

export default App;