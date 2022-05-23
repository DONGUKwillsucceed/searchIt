export default function Review(props: {
  name: string;
  date: string;
  content: string;
  state: string;
}) {
  return (
    <div className="bg-secondary font-Suit mb-4 flex flex-col rounded-md p-4 text-sm">
      <div className="flex justify-between pb-3">
        <div className="text-gray-500">{props.name}</div>
        <div className="text-gray-300">{props.date}</div>
      </div>
      <div className="text-xs text-gray-500">{props.content}</div>
      <div className="flex w-full flex-row-reverse">{props.state}</div>
    </div>
  );
}
