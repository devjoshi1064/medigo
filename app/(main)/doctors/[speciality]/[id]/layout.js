import { getDoctorById } from '@/actions/appointments';
import PageHeader from '@/components/page-header';
import { redirect } from 'next/dist/server/api-utils';
import React from 'react'

export async function generateMetadata({ params }) {
    const {id} = await params;
    const doctor = await getDoctorById(id);

    return {
        title: `Dr. ${doctor.name} - MediGo`,
        description: `Book an appointment with Dr. ${doctor.name}, a specialist in ${doctor.speciality} with ${doctor.experience} years of experience at MediGo. View available time slots and manage your healthcare appointments with ease.`
    }
}

const DoctorProfilelayout = async ({ children,params}) => {
    const {id} = await params;
    const doctor = await getDoctorById(id);
    if (!doctor) {
        redirect("/doctors");
    }
    return (
        <div className='container mx-auto px-4 '>
            <PageHeader
                title={`Dr. ${doctor.name}`}
                backLink={`/doctors/${doctor.specialty}`}
                backLabel={`Back to ${doctor.specialty}`}
            />
            {children}
        </div>
    )
}

export default DoctorProfilelayout
