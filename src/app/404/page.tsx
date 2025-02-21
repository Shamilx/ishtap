import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-2 bg-[#242424] text-white">
      <h2 className="font-bold text-xl">Not Found</h2>
      <p className="text-red-600">Could not find requested resource</p>
      <Link href="/" className="bg-primary px-6 py-2 rounded-2xl">Return Home</Link>
    </div>
  );
}
