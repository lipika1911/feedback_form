import Link from "next/link"
import { getAllFeedback } from "../actions" 
import { Feedback } from "@prisma/client" 

export default async function FeedbackPage() {
  const feedbacks: Feedback[] = await getAllFeedback()

  return (
      <>
        <div className="mb-8 flex items-center justify-between">
            <div  className="flex flex-col">
            <h1 className="text-3xl font-bold text-black">All Feedback</h1>
            <p className="mt-2 text-gray-600">
                Showing {feedbacks.length} feedback submission{feedbacks.length !== 1 ? "s" : ""}
            </p>
            </div>

            <Link
            href="/"
            className="border text-white font-medium bg-black hover:bg-black/80 px-4 py-2 rounded-md"
            >
            Back to Form
            </Link>
        </div>

        {/* Feedback List */}
        {feedbacks.length === 0 ? (
            <div className="max-w-4xl mx-auto flex items-center justify-center py-12 border border-gray-300 rounded-lg bg-white">
            <p className="text-gray-600">No feedback submissions yet.</p>
            </div>
        ) : (
            <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
            {feedbacks.map((feedback) => (
                <div
                key={feedback.id}
                className="border border-gray-300 rounded-lg bg-white shadow-sm p-6 transition hover:shadow-md"
                >
                <div className="flex items-start justify-between mb-3">
                    <div>
                    <h2 className="text-lg font-semibold text-gray-900">{feedback.name}</h2>
                    <p className="text-sm text-gray-500">{feedback.email}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                    </span>
                </div>
                <p className="whitespace-pre-wrap text-gray-800">{feedback.message}</p>
                </div>
            ))}
            </div>
        )}
    </>
  )
}
