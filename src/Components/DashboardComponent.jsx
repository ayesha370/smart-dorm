import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { HouseDoorFill, ListTask, PeopleFill } from 'react-bootstrap-icons'

const DashboardComponent = () => {
  // If your header has a different height, change this value accordingly
  const headerHeight = '60px'
  // Style for the cards
  const cardStyle = { backgroundColor: '#f8f9fa' } // Bootstrap's light grey

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '50%', // This will cover the upper half of the screen
          backgroundColor: 'orange',
          zIndex: -1,
        }}
      ></div>
      <div className='container' style={{ paddingTop: headerHeight }}>
        <h1 className='text-left mb-4'>Admin Dashboard</h1>
        <Row xs={1} md={3} className='g-4'>
          {/* Students Card */}
          <Col>
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-center'>
                  <span>Total Students</span>
                  <PeopleFill /> {/* Icon for total students */}
                </Card.Title>
                <Card.Text className='text-start'>
                  <h2>320</h2>
                  <p>Enrolled this year</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Total Rooms Card */}
          <Col>
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-center'>
                  <span>Total Rooms</span>
                  <HouseDoorFill /> {/* Icon for total rooms */}
                </Card.Title>
                <Card.Text className='text-start'>
                  <h2>150</h2>
                  <p>All dorm rooms</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Available Rooms Card */}
          <Col>
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-center'>
                  <span>Available Rooms</span>
                  <ListTask /> {/* Icon for available rooms */}
                </Card.Title>
                <Card.Text className='text-start'>
                  <h2>30</h2>
                  <p>Rooms free</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DashboardComponent