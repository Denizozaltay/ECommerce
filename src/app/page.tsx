import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <p>Ana Sayfa</p>
      <Link href={"/products"}>Products</Link>
    </>
  );
}
