import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List, Icon, Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';



function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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

function handleFormOpen(id?: string) {
  id ? handleSelectedActivity(id) : handleCancelledActivity();
  setEditMode(true);
}

function handleFormClose() {
  setEditMode(false);
}

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelActivity={handleCancelledActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
        />
      </Container>
    </>
  );
}

export default App;
