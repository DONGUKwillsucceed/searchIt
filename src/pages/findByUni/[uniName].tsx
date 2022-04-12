import HeaderUniversity from "../../common/components/headerUniversity";
import { useRouter } from "next/router";

export default function () {
  const router = useRouter();
  console.log(router.query.uniName);
  return (
    <div className="mx-auto max-w-3xl">
      <HeaderUniversity uniName={router.query.uniName} />
    </div>
  );
}
