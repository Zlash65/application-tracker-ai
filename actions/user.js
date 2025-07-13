"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(
      async (tx) => {
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            mobile: data.mobile,
            location: data.location,
            linkedin: data.linkedin,
            github: data.github,
            portfolio: data.portfolio,
            industry: data.industry,
            subIndustries: {
              set: data.subIndustries
            },
            experience: data.experience,
            bio: data.bio,
            skills: {
              set: data.skills
            },
            isOnboarded: true,
          },
        });

        return { updatedUser };
      },
      {
        timeout: 10000,
      }
    );

    revalidatePath("/");
    return result.updatedUser;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        isOnboarded: true,
        email: true,
      },
    });

    if (!user) throw new Error("User not found");

    return {
      isOnboarded: user.isOnboarded,
      email: user.email || null,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
