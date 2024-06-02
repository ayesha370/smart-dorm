// import React from 'react'
// import ProfileDisplayComponent from '../Components/ProfileDisplayComponent'

// import { Card, Button } from 'react-bootstrap'
// import { PersonCircle } from 'react-bootstrap-icons'

// const UserProfile = () => {
//   // Custom style for the profile information
//   const labelStyle = {
//     width: '100px', // Adjust this width as needed
//     textAlign: 'left',
//   }

//   const valueStyle = {
//     textAlign: 'left',
//     flexGrow: 1,
//   }

//   return (
//     <div
//       className='d-flex justify-content-center align-items-center'
//       style={{ height: '100vh' }}
//     >
//       <Card style={{ width: '40rem' }} className='text-center p-4'>
//         {' '}
//         {/* Slightly increased width */}
//         <Card.Body>
//           <PersonCircle size={150} className='mb-4' />
//           <div className='profile-info mb-3'>
//             <div className='d-flex mb-2'>
//               <div style={labelStyle}>
//                 <strong>Name:</strong>
//               </div>
//               <div style={valueStyle}>John Smith</div>
//             </div>
//             <div className='d-flex mb-2'>
//               <div style={labelStyle}>
//                 <strong>Room No:</strong>
//               </div>
//               <div style={valueStyle}>102 A</div>
//             </div>
//             <div className='d-flex mb-2'>
//               <div style={labelStyle}>
//                 <strong>Email:</strong>
//               </div>
//               <div style={valueStyle}>john24@gmail.com</div>
//             </div>
//           </div>
//           <Button variant='warning' className='mt-2'>
//             Update Profile
//           </Button>
//         </Card.Body>
//       </Card>
//     </div>
//   )
// }

// export default UserProfile
import React from 'react'
import Sidebar from '../Components/Sidebar'
import ProfileUserDisplayComponent from '../Components/ProfileUserDisplayComponent'
import Header from '../Components/HeaderUser'

const UserProfile = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div>
        <Header title='User Profile' />
        <ProfileUserDisplayComponent />
      </div>
    </div>
  )
}

export default UserProfile
