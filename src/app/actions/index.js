'use server'

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createProject({ name, slug }) {
    try {
        await auth.api.createOrganization({
            headers: await headers(),
            body : {
                name,
                slug
            }
        })
      // revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.error("Failed to delete post:", error);
      return { success: false, error: "Failed to delete post" };
    }
  }