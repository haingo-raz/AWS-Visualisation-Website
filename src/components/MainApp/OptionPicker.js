import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './OptionPicker.scss';

//open websocket connection
//let connection = new WebSocket("");

//log event upon open connection 
// connection.onopen = function (event) {
//     console.log("Connected: " + JSON.stringify(event));
// };

//case connection error
// connection.onerror = function (error) {
//     console.log("WebSocket Error: " + JSON.stringify(error));
// }

//upon message receival after team selection or table update 
// connection.onmessage = function (msg) {

//     let data = JSON.parse(msg.data);

//     console.log(data);

    //update NBA graph
    /*if (data.team_name == teamOption && 
        (data.table_name === "NBA" || data.table_name === "all")) {

        //create NBA visualisation   
        getNbaLabels(data);
    }*/

    //Update sentiment data chart 
    /*if (data.team_name == teamOption && 
        (data.table_name === "sentimentData" || data.table_name === "all")) {
        let sentimentData = data.sentiment_data;

        plotSentiment(sentimentData);
    }*/
// }


//function called upon selecting a team 
const handleData = (teamOption, tableName) => {
        
    //CUSTOM GET DATA 
    //message to send to the server
    let msgObject = {
        action: "getData", //called lambda function????? Which lambda function 
        team_name: teamOption,
        table_name: tableName //retrieve data from this table????????????
    };

    //send message
    // connection.send(JSON.stringify(msgObject));

    //console.log("Message sent: " + JSON.stringify(msgObject));
}

//Option picker component 
const OptionPicker = () => {
 
    return (
        <div className="optionPicker">
            <NavLink to='/' className='teams' onClick={handleData('all teams', 'all')}>All teams</NavLink>
            <NavLink to='/lakers' className='teams' onClick={handleData('allTeams', 'all')}>Los Angeles Lakers</NavLink>
            <NavLink to='/bulls' className='teams' onClick={handleData('Los Angeles Lakers', 'all')}>Chicago Bull</NavLink>
            <NavLink to='/warriors' className='teams' onClick={handleData('Golden State Warriors', 'all')}>Golden State Warriors</NavLink>
            <NavLink to='/celtics' className='teams' onClick={handleData('Boston Celtics', 'all')}>Boston Celtics</NavLink>
        </div>
    );
}

export default OptionPicker;

//Get NBA data / build graph
async function getNbaLabels(data){

    console.log(data);
}