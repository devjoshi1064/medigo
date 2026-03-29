// This action function fetches a list of doctors based on the provided specialty. It queries the database for users with the role of "DOCTOR" and a verification status of "VERIFIED" that match the specified specialty. The results are ordered alphabetically by name. If an error occurs during the database query, it logs the error and returns an appropriate error message. --- IGNORE ---
"use server";

import { db } from '../lib/prisma.js';

export async function getDoctorsBySpecialty(specialty) {
    // Fetch doctors by specialty and verified status
    //
    try{
        const doctors = await db.user.findMany({
            where:{
                role:"DOCTOR",
                verificationStatus:"VERIFIED",
                specialty:specialty,
            },
            orderBy:{
                name:"asc",
            },
        });
        return {doctors};
        // Handle the case when no doctors are found
    }catch(error){
        console.error("Failed to fetch doctors by specialty:", error);
        return {error:"Failed to fetch doctors"};
        // You can also throw an error or return an empty array based on your application's needs
    }
}