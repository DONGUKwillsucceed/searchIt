import Advertism from "./Advertisment";
import PrinterList from "./PrinterList";
import Header_logo from "../../components/Header_Logo";
import Menu from "../../components/Menu";
import FindPrinter from "./FindPrinter";

export default function App() {
  return (
    <>
      <Header_logo />
      <main className="mx-auto flex h-screen max-w-md flex-col pt-14">
        <Advertism />
        <FindPrinter />
        <PrinterList />
      </main>
      <Menu currentPage="Home" />
    </>
  );
}
