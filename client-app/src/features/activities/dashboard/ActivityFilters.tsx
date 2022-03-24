import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";


export default function ActivityFilters() {


    return (
        <>
            <Menu vertical size="large" style={{ width: "100%", marginTop: 27 }}>
                <Header icon="filter" attached color="purple" content="Filters" />
                <Menu.Item content="All Activities" />
                <Menu.Item content="I'll be going" />
                <Menu.Item content="I'm hosting" />
            </Menu>
            <Header/>
            <Calendar/>
        </>

    )
}