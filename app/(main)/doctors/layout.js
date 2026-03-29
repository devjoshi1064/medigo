// This layout component wraps all doctor-related pages, providing a consistent container and styling for the doctors section of the application. It ensures that all doctor pages have a uniform look and feel, with appropriate spacing and alignment. --- IGNORE ---
import React from 'react'

const DoctorsLayout = ({children}) => {
    return (
        <div className='container mx-auto px-4 py-12'>
            <div className="max-w-6xl mx-auto:"> {children}</div>
        </div>
    )
}

export default DoctorsLayout
