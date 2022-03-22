import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List, Icon, Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';



function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(resp => {
      setActivities(resp.data);
    })
  }, []);

function handleSelectedActivity(id: string) {
  setSelectedActivity(activities.find(actv => actv.id === id))
}

function handleCancelledActivity() {
  setSelectedActivity(undefined);
}

  return (
    <>
      <NavBar/>
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelActivity={handleCancelledActivity}
        />
      </Container>
    </>
  );
}

export default App;
