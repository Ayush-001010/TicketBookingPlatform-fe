import React from "react";
import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import TopNavbar from "./Components/Navbar/TopNavbar/TopNavbar";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/Store";
import RailwayStation from "./Components/Master/RailwayStations/RailwayStation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddTrains from "./Components/Master/Trains/AddTrains";
import Home from "./Components/TrainBooking/Home";
import { socket } from "./socket";
import { useAppSelector } from "./Redux/Hooks";
import Authentication from "./Components/Authentication/Authentication";

const AppContent: React.FC = () => {
  const isLogIn = useAppSelector((state) => state.AuthenticationSlice.isLogin);
  const queryClient = new QueryClient();

  useEffect(() => {
    if (!isLogIn) {
      window.location.hash = "#/authentication"; // Fallback navigation method
    }
  }, [isLogIn]);

  socket.on("connect", () => console.log("Hey, I am connected to backend!!"));

  console.log("isLogIn", isLogIn);
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {isLogIn && <TopNavbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/RailwayStations" element={<RailwayStation />} />
          <Route path="/AddTrain" element={<AddTrains />} />
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
