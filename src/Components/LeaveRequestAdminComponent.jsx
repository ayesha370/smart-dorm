import React, { useState, useEffect } from 'react'
import './LeaveRequestAdminComponent.css'

const LeaveRequestAdminComponent = () => {
  const [localRequests, setLocalRequests] = useState([])
  const [selectedRequests, setSelectedRequests] = useState([])

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    const response = await fetch(
      'http://localhost:3001/api/auth/leave-requests'
    ) // Adjust the URL based on your setup
    if (response.ok) {
      const requests = await response.json()
      setLocalRequests(
        requests.sort(
          (a, b) =>
            ['pending', 'approved', 'rejected'].indexOf(a.status) -
            ['pending', 'approved', 'rejected'].indexOf(b.status)
        )
      )
    }
  }

  const updateRequestStatus = async (newStatus) => {
    for (const requestId of selectedRequests) {
      await fetch(
        `http://localhost:3001/api/auth/leave-requests/${requestId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      )
    }
    setSelectedRequests([])
    fetchRequests() // Refresh the list
  }

  const handleSelectRequest = (id) => {
    setSelectedRequests((prev) =>
      prev.includes(id)
        ? prev.filter((requestId) => requestId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className='leave-request-admin'>
      <div className='leave-controls'>
        <button
          onClick={() => updateRequestStatus('approved')}
          disabled={selectedRequests.length === 0}
          className='approve'
        >
          Approve
        </button>
        <button
          onClick={() => updateRequestStatus('rejected')}
          disabled={selectedRequests.length === 0}
          className='reject'
        >
          Reject
        </button>
      </div>
      <div className='leave-table-container'>
        <table className='leave-table'>
          <thead>
            <tr>
              <th className='leave-checkbox'>Select</th>
              <th>Full Name</th>
              <th>Room Code</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {localRequests.length > 0 ? (
              localRequests.map((request) => (
                <tr key={request._id}>
                  <td >
                    <input
                      type='checkbox'
                      checked={selectedRequests.includes(request._id)}
                      onChange={() => handleSelectRequest(request._id)}
                    />
                  </td>
                  <td>{request.fullName}</td>
                  <td>{request.roomcode}</td>
                  <td>{new Date(request.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(request.toDate).toLocaleDateString()}</td>
                  <td>{request.reason}</td>
                  <td>{request.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='7' className='no-requests'>
                  No leave requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaveRequestAdminComponent
