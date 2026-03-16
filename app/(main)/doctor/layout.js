import PageHeader from '@/components/page-header'
import { Stethoscope } from 'lucide-react'
import React from 'react'

const metadata = {
    title: "Doctor Verification",
    description: "Manage your appointments and availability"
}

const DoctorDashboardLayout = ({children}) => {
    return (
        <div className='container mx-auto py-24 px-4'>
            <PageHeader icon={<Stethoscope/>} title={"Doctor Dashboard"} /> 
            {children}
        </div>
    )
}

export default DoctorDashboardLayout
