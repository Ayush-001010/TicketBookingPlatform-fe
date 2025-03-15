import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import TopNavbar from "./Components/Navbar/TopNavbar/TopNavbar";
import SignInPage from "./Components/Authentication/SignIn/SignInPage";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/Store";
import RailwayStation from "./Components/Master/RailwayStations/RailwayStation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddTrains from "./Components/Master/Trains/AddTrains";
import Home from "./Components/TrainBooking/Home";
import { socket } from "./socket";

const App: React.FC<{}> = () => {
  const queryClient = new QueryClient();

  socket.on("connect" , ()=>console.log("Hey I am connect to backend!!"));
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <HashRouter>
            <TopNavbar />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/signIn" element={<SignInPage />} />
              <Route path="/RailwayStations" element={<RailwayStation />} />
              <Route path="/AddTrain" element={<AddTrains />} />
            </Routes>
          </HashRouter>
        </div>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
