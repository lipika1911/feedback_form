"use client";

import { submitFeedback } from "@/app/actions";
import React, { useState } from "react";

export function FeedbackForm() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAction(formData: FormData) {
    setLoading(true);
    setMessage(null);

    try {
      const result = await submitFeedback(formData);

      if (result.success) {
        setMessage({ type: "success", text: "Thank you for your feedback!" });
      } else {
        throw new Error(result.error || "Failed to submit feedback");
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl border border-gray-200 shadow-md p-6">
      <div className="mb-4 flex justify-center">
        <h2 className="text-2xl font-semibold text-black">Send Us Your Feedback</h2>
      </div>

      <form action={handleAction} className="space-y-4">

        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-md text-black font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            className="w-full px-3 py-2 bg-white border border-gray-200 text-black placeholder-gray-400 rounded-md focus:outline-2 focus:outline-gray-200"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-md text-black font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="w-full px-3 py-2 bg-white border border-gray-200 text-black placeholder-gray-400 rounded-md focus:outline-2 focus:outline-gray-200"
          />
        </div>

        {/* Feedback Field */}
        <div className="space-y-2">
          <label htmlFor="feedback" className="text-md text-black font-semibold">
            Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            placeholder="Share your thoughts..."
            rows={4}
            required
            className="w-full px-3 py-2 bg-white border border-gray-200 text-md text-black placeholder-gray-400 rounded-md focus:outline-2 focus:outline-gray-200"
          />
        </div>

        {message && (
          <div
            className={`rounded-md p-3 text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-black py-2 px-4 rounded-md hover:bg-black/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}
