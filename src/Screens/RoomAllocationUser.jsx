import React from "react";
import Sidebar from "../Components/Sidebar";
import RoomAllocationUserComponent from "../Components/RoomAllocationUserComponent";
import Header from '../Components/HeaderUser'



const RoomAllocationUser = () => {
    return (
        <div style={{ display: 'flex' }}>
                <Sidebar/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', height: '100vh' }}>
        <Header title='Room Allocation Portal' />
                <RoomAllocationUserComponent/>
            </div>
        </div>
    )
}

export default RoomAllocationUser;