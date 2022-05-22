import Link from "next/link";

export default function (props: { linkTo: string; content: string }) {
  // const router = useRouter();

  return (
    <Link href={props.linkTo}>
      <button className="bg-primary w-full rounded py-4 px-3 text-sm text-white ">
        {props.content}
      </button>
    </Link>
  );
}
