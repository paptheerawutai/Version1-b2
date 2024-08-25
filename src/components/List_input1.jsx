import React, { useState, useEffect } from 'react';
import './css/Listinput1.css';

function List_input1() {
    const [input, setInput] = useState([]);
    const [sensors, setSensors] = useState([
      { id: 'X111', name: 'Mold Lock', status: 'Normal' },
      { id: 'X116', name: 'Pump OFF', status: 'Alarm' },
      { id: 'X101', name: 'Ejector Return', status: 'Normal' },
      { id: 'X110', name: 'Front Door', status: 'Normal' },
      { id: 'X109', name: 'Wait Suction', status: 'Alarm' },
      { id: 'X130', name: 'Sefty 3 Axis', status: 'Normal' },
      { id: 'Y230', name: 'Heater OFF', status: 'Alarm' },
      { id: 'Y121', name: 'Robot Run', status: 'Normal' },
    ]);
  
    useEffect(() => {
      const socket = new WebSocket('http://localhost:8080/') || new WebSocket('http://192.168.1.34:8080/');
  
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setInput(data);
        } else {
            console.log("ERR")
          console.error('WebSocket response is not an array:', data);
        }
      };
  
  
      return () => {
        socket.close();
      };
    }, []);
  
    useEffect(() => {
      updateSensorStatus();
    }, [input]);
  
    const updateSensorStatus = () => {
      const sensorKeys = ['input_1', 'input_2', 'input_3', 'input_4', 'input_5', 'input_6', 'input_7', 'input_8', 'input_9'];
      const updatedSensors = sensors.map((sensor, index) => {
        if (index < sensorKeys.length && input[0] && input[0][sensorKeys[index]] !== undefined) {
          return { ...sensor, status: input[0][sensorKeys[index]] === 1 ? 'Alarm' : 'Normal' };
        }
        return sensor;
      });
      setSensors(updatedSensors);
    };
  
    return (
      <div className="app-container">
        <Header />
        <div className="status-grid">
          {sensors.map(sensor => (
            <StatusCard key={sensor.id} status={sensor.status} label={sensor.name} />
          ))}
        </div>
      </div>
    );
  }
  
  function Header() {
    return (
      <div className="header">
        <button className="menu-btn">☰</button>
        <div className="header-buttons">
          <button className="header-btn">Alarm list</button>
          <button className="header-btn">Chatbot</button>
        </div>
      </div>
    );
  }
  
  function StatusCard({ status, label }) {
    return (
      <div className={`status-card ${status.toLowerCase()}`}>
        <div className={`status-icon ${status.toLowerCase()}`}>{status.charAt(0)}</div>
        <div className="status-label">{label}</div>
      </div>
    );
  }

export default List_input1;
