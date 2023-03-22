import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './OptionPicker.scss';

/* open websocket connection */
let connection = new WebSocket("");

/* when the connection opens, log the event */
connection.onopen = function (event) {
    console.log("Connected: " + JSON.stringify(event));
};

function OptionPicker() {

    const handleData = (teamOption) => {
        
        //CUSTOM GET DATA 
        //message to send to the server
        let msgObject = {
            action: "getData",/* API gateway route */
            team_name: currentTeam,
            table_name: "all" //retrieve all data
        };

       //send message
        connection.send(JSON.stringify(msgObject));

        console.log("Message sent: " + JSON.stringify(msgObject));
    }
     
    return (
        <div className="optionPicker">
            <NavLink to='/' className='teams' onClick={handleData('all teams')}>All teams</NavLink>
            <NavLink to='/lakers' className='teams' onClick={handleData('allTeams')}>Los Angeles Lakers</NavLink>
            <NavLink to='/bulls' className='teams' onClick={handleData('Los Angeles Lakers')}>Chicago Bull</NavLink>
            <NavLink to='/warriors' className='teams' onClick={handleData('Golden State Warriors')}>Golden State Warriors</NavLink>
            <NavLink to='/celtics' className='teams' onClick={handleData('Boston Celtics')}>Boston Celtics</NavLink>
        </div>
    );
}

export default OptionPicker;