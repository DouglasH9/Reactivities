import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";


export default observer(function ActivityForm() {

    const history  = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading,
        loadOneActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
    });

    useEffect(() => {
        if (id) loadOneActivity(id).then(activity => setActivity(activity!))
    }, [id, loadOneActivity])

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };
            createActivity(newActivity).then( () => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then( () => history.push(`/activities/${activity.id}`))
        }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: value })
    }

    if (loadingInitial) return <LoadingComponents content="Loading activity..." />

    return (
        <>
            <Segment clearing>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <Form.Input placeholder="Title" value={activity.title} onChange={handleInputChange} name="title" />
                    <Form.TextArea placeholder="Description" value={activity.description} onChange={handleInputChange} name="description" />
                    <Form.Input placeholder="Category" value={activity.category} onChange={handleInputChange} name="category" />
                    <Form.Input type="date" placeholder="Date" value={activity.date} onChange={handleInputChange} name="date" />
                    <Form.Input placeholder="City" value={activity.city} onChange={handleInputChange} name="city" />
                    <Form.Input placeholder="Venue" value={activity.venue} onChange={handleInputChange} name="venue" />
                    <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                    <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
                </Form>
            </Segment>
        </>
    )
})
