import Header_FindPrinter from "../../components/Header_FindPrinter";
import PrinterList from "../Landing/PrinterList";

export default function FindByUni() {
  return (
    <>
      <Header_FindPrinter />
      <main className="mx-auto flex h-screen max-w-md flex-col pt-14">
        <PrinterList />
        <PrinterList />
      </main>
    </>
  );
}
