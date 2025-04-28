'use server'

import { auth } from "@/lib/auth";
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
      return { success: true };
    } catch (error) {
      console.error("Failed to delete post:", error.message);
      return { success: false, error: error.message || "Failed to create project" };
    }
  }