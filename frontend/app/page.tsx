import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <main className="flex flex-col items-center justify-center gap-8 px-8 py-16">
        {/* Title */}
        <h1 className="text-7xl font-bold text-white tracking-wider">
          VirCads
        </h1>
        
        {/* Image Container */}
        <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src="/ppe-storage.png"
            alt="PPE and Environment Setup - Forensics Storage Room"
            width={1920}
            height={1080}
            priority
            className="w-full h-auto"
          />
        </div>
      </main>
    </div>
  );
}
