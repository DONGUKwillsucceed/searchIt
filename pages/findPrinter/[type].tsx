import Header_FindPrinter from "../../lib/components/Header_FindPrinter";
import SideScrollPrinterList from "../../lib/components/SideScrollPrinterList";
export default function FindByDistrict() {
  return (
    <>
      <Header_FindPrinter />
      <main className="mx-auto flex h-screen max-w-3xl flex-col">
        <div className="mt-9 w-full items-center pt-5 sm:max-w-3xl">
          <SideScrollPrinterList />
          <SideScrollPrinterList />
          <SideScrollPrinterList />
          <SideScrollPrinterList />
        </div>
      </main>
    </>
  );
}
