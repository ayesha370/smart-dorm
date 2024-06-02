import './App.css';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import RoomAllocationUser from './Screens/RoomAllocationUser';
import LeaveRequestUser from './Screens/LeaveRequestUser';
import LostFoundUser from './Screens/LostFoundUser';
import LeaveRequestAdmin from './Screens/LeaveRequestAdmin';
import LostFoundAdmin from './Screens/LostFoundAdmin';
import RoomAllocationAdmin from './Screens/RoomAllocationAdmin';
import Settings from './Screens/Settings';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ChitChat from './Screens/ChitChat';
import ChitChatAdmin from './Screens/ChitChatAdmin';

import { AuthProvider } from './contexts/AuthContext'

import ProtectedRoute from './Components/ProtectedRoute';
import DashboardUser from './Screens/DashboardUser';
import DashboardAdmin from './Screens/DashboardAdmin';
import Unauthorized from './Components/Unauthorized';

import SettingsAdmin from './Screens/SettingsAdmin';
// import ChitChatAdmin from './Screens/ChitChatAdmin';
import AuthenticationHandler from './Components/AuthenticationHandler';
import Logout from './Components/Logout';
import UserProfile from './Screens/UserProfile';
import AdminProfile from './Screens/AdminProfile';
import AdminNotifications from './Screens/AdminNotifications';
import UserNotifications from './Screens/UserNotifications';
import LandingPage from './Screens/LandingPage';
import RoomStatus from './Screens/RoomAlloted';
import ForgotPassword from './Screens/ForgotPassword';
import ResetPassword from './Screens/ResetPassword';
import ConfirmEmail from './Screens/ConfirmEmail';

function App() {
  return (

      
      <div>
      <AuthProvider>
        <BrowserRouter>
        <AuthenticationHandler>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetId" element={<ResetPassword />} />
        <Route path="/confirm-email/:confirmToken" element={<ConfirmEmail />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<SettingsAdmin />} />
        <Route path="/chitchat" element={<ProtectedRoute roles={['user']}><ChitChat /></ProtectedRoute>} />
        <Route path="/chitchatadmin" element={<ProtectedRoute roles={['admin']}><ChitChatAdmin /></ProtectedRoute>} />
        

        <Route path="/" element={<LandingPage />} />
        

{/* 
        <Route path="/roomallocationuser"  element={<ProtectedRoute component={RoomAllocationUser} roles={['user']} />} />
        <Route path="/leaverequestuser"  element={<ProtectedRoute component={LeaveRequestUser} roles={['user']} />} />
        <Route path="/lostfounduser" element={<ProtectedRoute component={LostFoundUser} roles={['user']} />} />
        <Route path="/userdashboard"  element={<ProtectedRoute component={DashboardUser} roles={['user']} />}  />
        <Route path="/profile" element={<ProtectedRoute component={Profile} roles={['user']} />}/>
        <Route path="/chitchat" element={<ProtectedRoute component={ChitChat} roles={['user']} />} />
       
        

        <Route path="/leaverequestadmin" element={<ProtectedRoute component={LeaveRequestAdmin} roles={['admin']} />} />
        <Route path="/lostfoundadmin" element={<ProtectedRoute component={LostFoundAdmin} roles={['admin']} />} />
        <Route path="/roomallocationadmin" element={<ProtectedRoute component={RoomAllocationAdmin} roles={['admin']} />}/>
        <Route path="/admindashboard" element={<ProtectedRoute component={DashboardAdmin} roles={['admin']} />} />
        <Route path="/profileadmin" element={<ProtectedRoute component={ProfileAdmin} roles={['admin']} />} />
        <Route path="/chitchatadmin" element={<ProtectedRoute component={ChitChatAdmin} roles={['admin']} />} />
        
         */}

        <Route path="/roomallocationuser"  element={<ProtectedRoute roles={['user']}><RoomAllocationUser /></ProtectedRoute>} />
        <Route path="/leaverequestuser"  element={<ProtectedRoute roles={['user']}><LeaveRequestUser /></ProtectedRoute>} />
        <Route path="/lostfounduser" element={<ProtectedRoute roles={['user']}><LostFoundUser /></ProtectedRoute>} />
        <Route path="/userdashboard"  element={<ProtectedRoute roles={['user']}><DashboardUser /></ProtectedRoute>}  />
        {/* <Route path="/profile" element={<ProtectedRoute roles={['user']}><Profile /></ProtectedRoute>}/> */}
        <Route path="/userprofile"  element={<ProtectedRoute roles={['user']}><UserProfile /></ProtectedRoute>}  />
        <Route path="/usersettings"  element={<ProtectedRoute roles={['user']}><Settings /></ProtectedRoute>}  />
        <Route path="/usernotifications"  element={<ProtectedRoute roles={['user']}><UserNotifications /></ProtectedRoute>}  />



        <Route path="/leaverequestadmin" element={<ProtectedRoute roles={['admin']}><LeaveRequestAdmin /></ProtectedRoute>} />
        <Route path="/lostfoundadmin" element={<ProtectedRoute roles={['admin']}><LostFoundAdmin /></ProtectedRoute>} />
        <Route path="/roomallocationadmin" element={<ProtectedRoute roles={['admin']}><RoomAllocationAdmin /></ProtectedRoute>}/>
        <Route path="/admindashboard" element={<ProtectedRoute roles={['admin']}><DashboardAdmin /></ProtectedRoute>} />
        
        <Route path="/adminprofile"  element={<ProtectedRoute roles={['admin']}><AdminProfile /></ProtectedRoute>}  />
        <Route path="/adminsettings"  element={<ProtectedRoute roles={['admin']}><SettingsAdmin /></ProtectedRoute>}  />
        <Route path="/adminnotifications"  element={<ProtectedRoute roles={['admin']}><AdminNotifications /></ProtectedRoute>}  />
        
        <Route path="/room-status" element={<ProtectedRoute roles={['admin']}><RoomStatus/></ProtectedRoute>} />



        <Route path="/logout" element={<Logout />} />

        
        


      </Routes>
      </AuthenticationHandler>
      </BrowserRouter>
      </AuthProvider>
      </div>

    
  );
}

export default App;
