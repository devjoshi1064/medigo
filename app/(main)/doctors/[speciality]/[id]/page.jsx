
import { getDoctorById , getAvailableTimeSolts } from '@/actions/appointments';
import { DoctorProfile } from "./_components/doctor-profile";
import { redirect } from "next/navigation";

export default async function DoctorProfilePage({ params }) {
    const { id } = await params;

    try {

        const doctor = await getDoctorById(id);
        const [doctorData, slotsData] = await Promise.all([
            getDoctorById(id),
            getAvailableTimeSolts(id),
        ]);

        return (
            <DoctorProfile
                doctor={doctor}
                availableDays={slotsData.days || []}
            />
        );
    } catch (error) {
        console.error("Error loading doctor profile:", error);
        redirect("/doctors");
    }
}