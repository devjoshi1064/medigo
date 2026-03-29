// about this page
// This page component fetches doctors based on the speciality provided in the URL parameters. If no speciality is provided, it redirects to the main doctors page. It handles errors gracefully and displays a message if no doctors are found for the given speciality.
"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Verifies if current user has admin role
 */

export async function verifyAdmin() {
    const { userId } = await auth();
    if (!userId) {
        return false;
    }
    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });
        return user?.role === "ADMIN";
    } catch (error) {
        console.error("Faild to varify admin:", error);
        return false;
    }
}

export async function getPendingDoctors() {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized")

    try {
        const pendingDoctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "PENDING",
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return { doctors: pendingDoctors };
    } catch (error) {
        throw new Error("Failed to fetch pending doctors");
    }
}

export async function getVerifyDoctors() {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized")

    try {
        const verifyedDoctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return { doctors: verifyedDoctors };
    } catch (error) {
        throw new Error("Failed to fetch verified Doctors");
    }
}

export async function updateDoctorStatus(formData) {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized")

    const doctorId = formData.get("doctorId")
    const status = formData.get("status")

    if (!doctorId || !["VERIFIED", "REJECTED"].includes(status)) {
        throw new Error("Invalid input")
    }

    try {
        await db.user.update({
            where: {
                id: doctorId,
            },
            data: {
                verificationStatus: status,
            },
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to update doctor status:", error)
        throw new Error(`Failed to update doctor status:${error.message}`)
    }
}

export async function updateDoctorActiveStatus(formData) {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized")

    const doctorId = formData.get("doctorId")
    const suspend = formData.get("suspend")==="true";

    if(!doctorId){
        throw new Error("Doctors id is required");
    }

    try {
        const status = suspend ? "PENDING" : "VERIFIED";

        await db.user.update({
            where: {
                id: doctorId,
            },
            data: {
                verificationStatus: status,
            },
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        throw new Error(`Failed to update doctor status:${error.message}`)
    }
}