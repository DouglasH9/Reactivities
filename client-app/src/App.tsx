import React, { useEffect, useState } from 'react';
import './App.css';
// import 'semantic-ui-css/semantic.min.css'; 
import { Header, List } from 'semantic-ui-react';
import axios from 'axios';



function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(resp => {
      console.log(resp);
      setActivities(resp.data);
    })
  }, []);

  return (
    <div>
      <Header as="h2" icon="user" content="Reactivities"/>
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
