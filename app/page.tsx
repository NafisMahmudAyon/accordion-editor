'use client';
import { Button } from "aspect-ui";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <main className="text-center">
      <div className="text-display1 text-center mt-10 text-primary-600 font-bold">Accordion Builder</div>
      <Button className="mx-auto mt-10 px-10" onClick={() => { router.push('/dashboard') }}>Get Started</Button>
    </main>
  );
}
