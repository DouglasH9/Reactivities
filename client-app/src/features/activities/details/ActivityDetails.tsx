import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailHeader from "./ActivityDetailsHeader";
import ActivityDetailSideBar from "./ActivityDetailSideBar";


export default observer( function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadOneActivity, loadingInitial, clearSelectedActivity} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect( () => {
        if (id) loadOneActivity(id);
        return () => clearSelectedActivity();
    }, [id, loadOneActivity, clearSelectedActivity]);

    if (loadingInitial || !activity) return <LoadingComponents />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={activity}/>
                <ActivityDetailInfo activity={activity} />
                <ActivityDetailChat activityId={activity.id} />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailSideBar activity={activity}/>
            </Grid.Column>
        </Grid>
    )
})