import React, { Component } from 'react'
import items from './data';
//import Client from './Contentful.js'


// Firt create a context object
// we can pass a default value React.createContext(defaultValue);
const RoomContext= React.createContext();

class RoomProvider extends Component {
    state={
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    getData = async ()=>{
        try{
            // this block of code is for contentful user
            // let response = await Client.getEntries({
            //          'content_type': 'beachHotelResort'
            //          order: "sys.createAt" //set orders of item in json by date
            //          order: "fields.price" //set orders of item in json by price in fields
            //          order: "-fields.price" //the dash is for reverse order
            //      });
            // let rooms = this.formatData(response.items);

            let rooms = this.formatData(items);

            // return only room objects that have property "featured: true"
            let featuredRooms = rooms.filter(room => room.featured === true);
    
            let maxPrice = Math.max(...rooms.map(item => item.price))
            let maxSize = Math.max(...rooms.map(item => item.size))
    
    
            // setState triggers re-rendering
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            })                
        }
        catch(error) 
        {
            console.log(error);
        }
    }


    // compoenentDidMount is called whenever the page is rendered successfully
    componentDidMount()
    {
        this.getData();
    }

    handlechange = event => {
        const target = event.target

        const value = (target.type === 'checkbox')
                        ? target.checked 
                        : target.value;
        const name = event.target.name;
        // console.log(`Event Type: ${event.type}, Target: ${target}, value: ${value}, name: ${name}`);

        this.setState({
            // use [variable] or [`${variable}`] to set value for an unknown existing object in state
            [name]: value
        }, this.filterRooms)
    }
    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize,
            breakfast, pets
        } = this.state


        //All rooms
        let tempRooms =[...rooms]
        //cast capacity to int
        capacity = parseInt(capacity)
        
        //filter by type
        if(type !=='all'){
            tempRooms = tempRooms.filter(room => room.type===type)
        }

        //filter by capacity
        if(capacity !== 1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }
        
        //filter by price
        tempRooms = tempRooms.filter(room => room['price'] < price)

        //filter by size
        tempRooms = tempRooms.filter(room => room['size'] >minSize && room['size']<maxSize)

        //filter by breakfast
        if(breakfast === true)
        {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        //filter by pets
        if(pets === true)
        {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        this.setState({
            sortedRooms: tempRooms
        })
    }

    formatData(data){
        let tempItems=items.map(
            item => {
                let id = item.sys.id;


                // images store all direct image url
                let images = item.fields.images.map(
                    image => {
                        return image.fields.file.url;
                    }
                )

                //room contain all objects IN item.field, images, id
                //NOTE: room does not contain item.field itself after destructure
                let room = {...item.fields, images, id}
                return room;
            }
        )
        return tempItems;
    }

    getRoom = (slug) =>{
        let tempRooms = [...this.state.rooms];
        // find: returns the object of 1st match
        // filter: returns the array of matches 
        const room = tempRooms.find((room)=> room.slug === slug);
        return room;
    }


    render() {
        return (
            // ...this.state will return greeting and name, not state itself
            <RoomContext.Provider value={
                {...this.state, 
                getRoom: this.getRoom,
                handlechange: this.handlechange
                }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;


// ************** High order component **************
export function withRoomConsumer(Component)
{
    return function ConsumerWrapper(props)
    {
        return <RoomConsumer>
                    {
                        (value)=> <Component {...props} context={value } />
                    }
                </RoomConsumer>
    }
}
export {RoomProvider, RoomConsumer, RoomContext};