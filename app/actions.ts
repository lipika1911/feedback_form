'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function submitFeedback(formData: FormData) {
  const name = formData.get("name")?.toString()
  const email = formData.get("email")?.toString()
  const feedback = formData.get("feedback")?.toString()

  if (!name || !email || !feedback) {
    throw new Error("Missing required fields")
  }

  try {
    const newFeedback = await prisma.feedback.create({
      data: {
        name,
        email,
        message: feedback,
      },
    })

    revalidatePath("/feedbacks")

    return { success: true, data: newFeedback }
  } catch (error) {
    console.error("Error creating feedback:", error)
    return { success: false, error: "Failed to create feedback" }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllFeedback() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return feedbacks
  } catch (error) {
    console.error("Error fetching feedback:", error)
    return []
  } finally {
    await prisma.$disconnect()
  }
}