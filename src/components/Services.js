import React, { Component } from 'react'
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from "react-icons/fa"
import Title from './Title'
export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail/>,
                title: "free cocktails",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, quidem!",
            },
            {
                icon: <FaHiking/>,
                title: "Free Hiking",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, quidem!",
            },
            {
                icon: <FaShuttleVan/>,
                title: "Free Shuttle",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, quidem!",
            },
            {
                icon: <FaBeer/>,
                title: "Strongest Beer",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, quidem!",
            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services"></Title>
                <div className="services-center">
                    {
                        // Map loops through each item in the state.services and return item that satisfy the inner function
                        this.state.services.map(
                            (item,index) => {
                                return (
                                <article key={index} className="service">
                                    <span>{item.icon}</span>
                                    <h6>{item.title}</h6>
                                    <p>{item.info}</p>
                                </article>
                                );
                            }
                        )
                    }
                </div>
            </section>
            
        )
    }
}
