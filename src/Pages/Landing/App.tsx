import Advertism from "./Advertisment";
import PrinterList from "./PrinterList";
import Header_logo from "../../components/Header_Logo";
import Menu from "../../components/Menu";
import FindPrinter from "./FindPrinter";
import { useEffect } from "react";
import Slider from "../../components/Slider";

export default function App() {
  useEffect(() => {
    // Slider();
  }, []);
  return (
    <>
      <Header_logo />
      <main className="flex flex-col items-center overflow-y-auto">
        <div className=" flex w-full flex-col items-center sm:max-w-3xl ">
          <Advertism />
          <FindPrinter />
          <PrinterList />
        </div>
      </main>
    </>
  );
}
