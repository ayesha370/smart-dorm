import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../Components/SidebarAdmin'
import RoomAllocationAdminComponent from '../Components/RoomAllocationAdminComponent'
import RoomAllocationForm from '../Components/RoomAllocationForm'
import Header from '../Components/HeaderAdmin'

const RoomAllocationAdmin = () => {
  const [allocations, setAllocations] = useState([])

  const fetchAllocations = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/auth/roomallocation/all'
      ) // Make sure this endpoint is correct
      const data = await response.json()
      if (data && data.allocations) {
        setAllocations(data.allocations)
        console.log('Fetched Allocations:', data.allocations)
      }
    } catch (error) {
      console.error('Failed to fetch allocations:', error)
    }
  }
  useEffect(() => {
    fetchAllocations()
  }, [])

 
return (
    <div style={{ display: 'flex', width: '100%' }}> 
      <SidebarAdmin />
      <div style={{ flex: 1, overflow: 'hidden' }}> 
        <Header title='Room Allocation' />
        <RoomAllocationForm />
        <RoomAllocationAdminComponent
          allocationsProp={allocations}
          fetchAllocations={fetchAllocations}
        />
      </div>
    </div>
  )
}

export default RoomAllocationAdmin
