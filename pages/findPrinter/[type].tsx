import Header_FindPrinter from "../../lib/components/Header_FindPrinter";
import SideScrollPrinterList from "../../lib/components/SideScrollPrinterList";
export default function FindByDistrict() {
  return (
    <>
      <Header_FindPrinter />
      <main className="mx-auto flex max-w-3xl flex-col">
        <div className="flex h-32 w-full items-center justify-center bg-gray-200">
          printer
        </div>
        <div className="scrollbar-thin mt-9 h-36 w-full items-center overflow-y-scroll pt-5 sm:max-w-3xl"></div>
      </main>
    </>
  );
}
