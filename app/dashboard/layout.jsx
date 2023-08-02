import React from 'react'
import Navbar from '@/components/navbar'

export const metadata = {
    title: 'Presence | Dashboard',
    description: 'Attendence Tracking Application',
}

function DashboardLayout({ children }) {
    return (<>
        <main>
            {children}
        </main>
    </>
    )
}

export default DashboardLayout