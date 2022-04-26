import React from "react";
import { Tab } from "semantic-ui-react";

export default function ProfileContent() {
    const panes = [
        {menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane>},
        {menuItem: "Photos", render: () => <Tab.Pane>Photo Content</Tab.Pane>},
        {menuItem: "Books", render: () => <Tab.Pane>Books Content</Tab.Pane>},
        {menuItem: "Followers", render: () => <Tab.Pane>Followers Content</Tab.Pane>},
        {menuItem: "Following", render: () => <Tab.Pane>Following Content</Tab.Pane>},
    ]

    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition="right"
            panes={panes}
        />
    )
}