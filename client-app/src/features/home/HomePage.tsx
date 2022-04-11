import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";


export default function HomePage() {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size="massive" src="/assets/booksLogo.png" alt="logo"
                    style={{marginBottom: 12}}/>
                    Book Club
                </Header>
                <Header as="h2" inverted content="Welcome to The Book Club!"/>
                <Button as={Link} to="/login" size="huge" inverted>
                    Let's see some books!
                </Button>
            </Container>
        </Segment>
    )
}