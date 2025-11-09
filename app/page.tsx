import Link from "next/link";

export default function Home() {
  return (
      <>
        {/* Header Section */}
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black">
              Feedback Collector
            </h1>
            <p className="mt-2 text-gray-600">
              Share your thoughts and help us improve
            </p>
          </div>
          <Link href="/feedback">
            <button className="border text-white font-medium bg-black hover:bg-black/80 px-4 py-2 rounded-md">
              View All Feedback
            </button>
          </Link>
        </header>

        {/* Main Content Section */}
        <section className="flex flex-col">
          {/* Feedback Form Component */}
        </section>
      </>
  );
}
