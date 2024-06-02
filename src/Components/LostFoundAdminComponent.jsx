import React, { useState, useEffect } from 'react'
import './LostFoundAdminComponent.css'

const LostFoundAdminComponent = () => {
  const [localItems, setLocalItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await fetch(
      'http://localhost:3001/api/auth/lost-found-item'
    )
    if (response.ok) {
      const items = await response.json()
      setLocalItems(items.sort((a, b) => (a.status === 'not-found' ? -1 : 1)))
    } else {
      console.error('Failed to fetch lost and found items')
    }
  }

  const updateItemStatus = async (newStatus) => {
    for (const itemId of selectedItems) {
      await fetch(
        `http://localhost:3001/api/auth/lost-found-items/${itemId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      )
    }
    setSelectedItems([])
    fetchItems() // Refresh the list
  }

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id)
      }
      return [...prev, id]
    })
  }

  return (
    <div className='lost-found-admin'>
      <div className='lost-controls'>
        <button
          onClick={() => updateItemStatus('found')}
          disabled={selectedItems.length === 0}
          className='found'
        >
          Found
        </button>

        <button
          onClick={() => updateItemStatus('not-found')}
          disabled={selectedItems.length === 0}
          className='not-found'
        >
          Not Found
        </button>
      </div>
      <div className='lost-table-container'>
        <table className='lost-table'>
          <thead>
            <tr>
              <th className='lost-checkbox'>Select</th>
              <th>Name</th>
              <th>Room Number</th>
              <th>Date</th>
              <th>Item Reported</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {localItems.length > 0 ? (
              localItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type='checkbox'
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleSelectItem(item._id)}
                    />
                  </td>
                  <td>{item.fullName}</td>
                  <td>{item.roomcode}</td>
                  <td>{new Date(item.lostfoundDate).toLocaleDateString()}</td>
                  <td>{item.itemInfo}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='no-items'>
                  No items reported
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LostFoundAdminComponent
