import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from './Cover';
import SectionTitel from '../Titel/SectionTitel';
import PopularMenu from '../PopulaeMenu/PopularMenu';
import useMenu from '../../hooks/useMenu';
import MenuCategory from './MenuCategory';


const Menu = () => {
    const [menu] = useMenu()
    console.log(menu);
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const offered = menu.filter(item => item.category === 'offered')
    const soup = menu.filter(item => item.category === 'soup')
    const popular = menu.filter(item => item.category === 'popular')
    console.log(popular);

    return (

        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover imgs={'https://i.ibb.co/4fkFgJ5/banner3.jpg'} title={"Our menu "} subTitle="
            Would you like to try a dish?
            "></Cover>
            <SectionTitel subheader={"Don't Miss"}
                header={"todays offer"}>
            </SectionTitel>
            <MenuCategory items={offered}  coverImg=''></MenuCategory>
            <Cover imgs={'https://i.ibb.co/Y0MKkMj/banner.jpg'} title={"DESSERTS"} subTitle="
            Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            "></Cover>
            <MenuCategory items={dessert}  coverImg=''></MenuCategory>
            <Cover imgs={'https://i.ibb.co/FWYxvv7/category-pizza.jpg'} title={"PIZZA"} subTitle="
            Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            "></Cover>
            <MenuCategory items={pizza}  coverImg=''></MenuCategory>
            <Cover imgs={'https://i.ibb.co/R24w3Fv/salad-bg.jpg'} title={"SALADS"} subTitle="
            Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            "></Cover>
            <MenuCategory items={salad}  coverImg=''></MenuCategory>
            <Cover imgs={'https://i.ibb.co/Brm2jt4/soup-bg.jpg'} title={"SALADS"} subTitle="
            Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            "></Cover>
            <MenuCategory items={soup}  coverImg=''></MenuCategory>


        </div>
    );
};

export default Menu;