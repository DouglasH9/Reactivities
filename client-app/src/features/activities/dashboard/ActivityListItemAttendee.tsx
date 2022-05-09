import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { List, Image, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    attendees: Profile[];
}


export default observer(function ActivityListItemAttendee({ attendees }: Props) {

    const styles = {
        borderColor: "purple",
        borderWidth: 2
    }

    return (
        <List horizontal>
            {attendees.map(attendee => (
                <Popup
                    hoverable
                    key={attendee.username}
                    trigger={
                        <List.Item 
                            key={attendee.username} 
                            as={Link} 
                            to={`/profiles/${attendee.username}`}>
                            <Image 
                                size="mini" 
                                circular src={attendee.image || "client-app/public/user.png"}
                                bordered
                                style={attendee.following ? styles : null}
                            />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
                
            ))}
        </List>
    )
})