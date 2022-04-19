import { observer } from "mobx-react-lite";
import React from "react";
import { List, Image } from "semantic-ui-react";


export default observer(function ActivityListItemAttendee() {
    return (
        <List horizontal>
            <List.Item>
                <Image size="mini" circular src="/assests/user.png" />
            </List.Item>
            <List.Item>
                <Image size="mini" circular src="/assests/user.png" />
            </List.Item>
            <List.Item>
                <Image size="mini" circular src="/assests/user.png" />
            </List.Item>
        </List>
    )
})