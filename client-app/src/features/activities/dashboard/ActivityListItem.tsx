import {format} from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
    activity: Activity,
}


export default function ActivityListItem({activity}: Props) {

    return (
        <Segment.Group>
            <Segment>
                {activity.isCancelled && 
                    <Label 
                        attached="top"
                        color="red"
                        content="Cancelled"
                        style={{textAlign: "center"}}
                    />
                }
                <Item.Group>
                    <Item>
                        <Item.Image 
                            size="tiny" 
                            circular src={activity.host?.image || "/assets/user.png"}
                            style={{marginBottom: 3}}
                        />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`} >
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Chosen by <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
                            {/* {console.log(`${activity.isHost} ${activity.isGoing}`)} */}
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color="purple">
                                        You chose this book
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color="pink">
                                        You are reading this book
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock"/> {format(activity.date!, "dd MMM yyyy h:mm aa")}
                    <Icon name="marker"/> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    id="activityViewBtn"
                    as={Link}
                    to={`activities/${activity.id}`}
                    floated="right"
                    content="View"
                />
            </Segment>
        </Segment.Group>
    )
}