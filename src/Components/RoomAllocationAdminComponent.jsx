import React, { useState, useEffect } from 'react'
import './RoomAllocationAdminComponent.css'

const RoomAllocationAdminComponent = ({
  allocationsProp = [],
  fetchAllocations,
}) => {
  const [allocations, setAllocations] = useState(allocationsProp)
  const [selectedAllocations, setSelectedAllocations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const allocationsPerPage = 10

  const indexOfLastAllocation = currentPage * allocationsPerPage
  const indexOfFirstAllocation = indexOfLastAllocation - allocationsPerPage
  const currentAllocations = allocations.slice(
    indexOfFirstAllocation,
    indexOfLastAllocation
  )

  useEffect(() => {
    console.log('Fetched Allocations:', allocationsProp)
    setAllocations(allocationsProp)
  }, [allocationsProp])

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleSelectAllocation = (allocationId) => {
    setSelectedAllocations((prev) => {
      if (prev.includes(allocationId)) {
        return prev.filter((id) => id !== allocationId)
      }
      return [...prev, allocationId]
    })
  }

  const handleAllocationAction = async (action) => {
    for (const allocId of selectedAllocations) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/auth/roomallocation/update/${allocId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: action }),
          }
        )
        const result = await response.json()
        if (result.updatedAllocation) {
          await fetchAllocations() // Refetch allocations after update
        }
      } catch (error) {
        console.error('Error updating allocation status:', error)
      }
    }

    setSelectedAllocations([]) // Reset selection
  }

  return (
    <div className='room-allocation-admin'>
      <div className='room-controls'>
        <button
          onClick={() => handleAllocationAction('accepted')}
          disabled={selectedAllocations.length === 0}
          className='confirm'
        >
          Accept
        </button>
        <button
          onClick={() => handleAllocationAction('rejected')}
          disabled={selectedAllocations.length === 0}
          className='cancel'
        >
          Reject
        </button>
      </div>
      <div className='room-table-container'>
        <table className='room-table'>
          <thead>
            <tr>
              <th className='room-checkbox'>Select</th>
              <th>Email</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Room Type</th>
              <th>Room Number</th>
              <th>Additional Requests</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentAllocations.map((allocation) => (
              <tr
                key={
                  allocation._id /* Change to match your allocation object's unique ID */
                }
              >
                <td>
                  <input
                    type='checkbox'
                    checked={selectedAllocations.includes(allocation._id)}
                    onChange={() => handleSelectAllocation(allocation._id)}
                  />
                </td>
                <td>{allocation.email}</td>
                <td>{allocation.fromDate}</td>
                <td>{allocation.toDate}</td>
                <td>{allocation.roomType}</td>
                <td>{allocation.roomNumber}</td>
                <td>{allocation.additionalRequest}</td>
                <td>{allocation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  )
}

export default RoomAllocationAdminComponent
