import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingelHotel from "./components/SingelHotel/SingelHotel";

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingelHotel/>} />
          <Route />
        </Route>
      </Routes>
    </HotelsProvider >
  );
}

export default App;
