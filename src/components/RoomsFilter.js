import React from 'react'

// useContext and Context Consumer do the same thing
import {useContext} from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title'

const getUnique = (arrayOfItems, objectName) => {

    // group all object values in all item.objectName in arrayOfItems
    const all_objects_value = arrayOfItems.map(item => item[objectName])
    // console.log("All object value in each Item", all_objects_value)

    //return a set of unique value
    return [...new Set(all_objects_value)]
}


// either use props rooms or context, in this case we use both
export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext)
    const {
        handlechange, type, capacity, price, 
        minPrice, maxPrice, minSize, maxSize,
        breakfast, pets
    } = context;


    let allUniqueTypes = getUnique(rooms,'type');
    allUniqueTypes = ['all', ...allUniqueTypes]
    // console.log("all unique types", allUniqueTypes)

    let allUniqueCapacity = getUnique(rooms, 'capacity');


    // rooms in context and props rooms are the same
    // two ways of passing data
    // console.log("rooms in Context",context.rooms)
    // console.log("Props rooms",rooms)


    return (
        <section className="filter-container">
            <Title title="search rooms"/>
            <form action="" className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select 
                    name="type" 
                    id="type" 
                    value={type}
                    className="form-control" 
                    onChange={handlechange}>
                       {
                           allUniqueTypes.map((item,index) => {
                               return <option value={item} key={index}>{item}</option>
                           })
                       }
                    </select>

                </div>
                {/* end select type */}

                {/* select guess*/}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select 
                    name="capacity" 
                    id="capacity" 
                    value={capacity}
                    className="form-control" 
                    onChange={handlechange}>
                       {
                           allUniqueCapacity.map((item,index) => {
                               return <option value={item} key={index}>{item}</option>
                           })
                       }
                    </select>

                </div>
                {/* end select guess */}

                {/* Room Price*/}
                <div className="form-group">
                    <label htmlFor="price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice}
                     id="price" value={price} onChange={handlechange}
                     className="form-control"/>
                </div>
                {/* End Room Price*/}

                {/* Size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" 
                        value={minSize} onChange={handlechange} className="size-input"/>
                        <input type="number" name="maxSize" id="size" 
                        value={maxSize} onChange={handlechange} className="size-input"/>
                    </div>
                </div>
                {/* End Size */}
                {/* Extra */}
                <div className="form-group">
                    {/* breakfast */}
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast"
                        onChange={handlechange} checked={breakfast}/>
                        <label htmlFor="breakfast">breakfast</label>

                    </div>

                    {/* Pets */}
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets"
                        onChange={handlechange} className="" checked={pets}/>
                        <label htmlFor="pets">pets</label>
                        
                    </div>
                </div>
            </form>
        </section>
    )
}
