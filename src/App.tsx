import React, { useState } from "react";
import { useEffect } from "react";
import { data, HashRouter, Route, Routes } from "react-router-dom";
import TopNavbar from "./Components/Navbar/TopNavbar/TopNavbar";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/Store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddTrains from "./Components/Master/Trains/AddTrains";
import Home from "./Components/TrainBooking/Home";
import { socket } from "./socket";
import { useAppDispatch, useAppSelector } from "./Redux/Hooks";
import Authentication from "./Components/Authentication/Authentication";
import State from "./Components/Master/State/State";
import Stations from "./Components/Master/Stations/Stations";
import Successfull from "./Components/TrainBooking/Successfull/Successfull";
import UpcomingJournery from "./Components/Journery/UpcomingJourney/UpcomingJourney";
import useAuthentication from "./hooks/useAuthentication";
import { isSignIn } from "./Redux/Slices/Authentication";

const AppContent: React.FC = () => {
  const isLogIn = useAppSelector((state) => state.AuthenticationSlice.isLogin);
  const queryClient = new QueryClient();
  const { checkUserAlreadySignInOrNot } = useAuthentication();
  const dispatch = useAppDispatch();
  const [isLogInVal , setIsLogInVal] = useState<boolean>(false);
  const val = useAppSelector(state => state.AuthenticationSlice);

  useEffect(() => {
    setIsLogInVal(isLogIn);
    if (!isLogIn) {
      if (!window.location.href.includes("authentication")) {
        checkUserAlreadySignInOrNot().then((res) => {
          if (res.success) {
            setIsLogInVal(true);
            dispatch(isSignIn({ userEmail : res.data.UserEmail , IsAdmin : res.data.IsAdmin, isLogIn : true }))
          } else {
            window.location.hash = "#/authentication"; // Fallback navigation method
          }
        });
        return;
      }
      window.location.hash = "#/authentication"; // Fallback navigation method
    }
  }, [isLogIn]);

  socket.on("connect", () => console.log("Hey, I am connected to backend!!"));
  console.log(val);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {isLogInVal && <TopNavbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/AddTrain" element={<AddTrains />} />
          <Route path="/RailwayDetails" element={<State />} />
          <Route path="/RailwayDetails/:State" element={<Stations />} />
          <Route path="/success" element={<Successfull />} />
          <Route path="/UpcomingJourneys" element={<UpcomingJournery />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </Provider>
  );
};

export default App;
