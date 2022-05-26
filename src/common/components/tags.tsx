export default function Tags(props: { tagName: string }) {
  return (
    <div className="w-fit rounded-full bg-gray-100 px-3 py-2 text-xs text-gray-600">
      #{props.tagName}
    </div>
  );
}
