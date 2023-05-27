import React, { useState } from 'react';
import Cover from '../Share/Cover';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import tab from './order.css'
import useMenu from '../../hooks/useMenu';
import Card from '../../Card/Card';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const { category } = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu] = useMenu()

    // console.log(category);
    const drinks = menu.filter(item => item.category === "drinks")
    const soup = menu.filter(item => item.category === "soup")
    const salad = menu.filter(item => item.category === "salad")
    const pizza = menu.filter(item => item.category === "pizza")
    const dessert = menu.filter(item => item.category === "dessert")
    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover imgs="https://i.ibb.co/VWyfB3G/banner2.jpg" title={"Order From"} subTitle="
           Would you like to try a dish?
            "></Cover>
            <div className="w-[95%] mx-auto text-center p-2">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList classID='tab'>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soups</Tab>
                        <Tab>Desserts</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>
                    <TabPanel>
                        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {
                                salad.map(item => <Card item={item} key={item._id}></Card>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {
                                pizza.map(item => <Card item={item} key={item._id}></Card>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soup}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={dessert}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    );
};

export default Order;