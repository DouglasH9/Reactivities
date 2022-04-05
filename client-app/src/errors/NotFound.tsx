import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment>
            <Header>
                <Icon name="search" />
                Oops! Looked high and low and couldn't find this!
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/activities" primary>
                    Go back to the Books
                </Button>
            </Segment.Inline>
        </Segment>
    )
}