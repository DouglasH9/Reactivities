import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from "uuid";
import agent from '../API/agent';
import LoadingComponents from './LoadingComponents';



function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(resp => {
      let activities: Activity[] = [];
      resp.forEach(activity => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
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

function handleCreateOrEdit(activity: Activity) {
  setSubmitting(true);
  if (activity.id) {
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(act => act.id !== activity.id, activity)])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  } else {
    activity.id = uuid();
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }
}

function handleDeleteActivity(id: string) {
  setSubmitting(true);
  agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(act => act.id !== id)]);
    setSubmitting(false);
  })
}

if (loading) return <LoadingComponents content='Loading app'/>

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
          createOrEdit={handleCreateOrEdit}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
