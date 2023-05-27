import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from './Cover';
import SectionTitel from '../Titel/SectionTitel';
import PopularMenu from '../PopulaeMenu/PopularMenu';
import useMenu from '../../hooks/useMenu';
import MenuCategory from './MenuCategory';


const Menu = () => {
    const [menu] = useMenu()
    // console.log(menu);
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const offered = menu.filter(item => item.category === 'offered')
    const soup = menu.filter(item => item.category === 'soup')
    const popular = menu.filter(item => item.category === 'popular')
    // console.log(popular);

    return (

        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover imgs={'https://i.ibb.co/4fkFgJ5/banner3.jpg'} title={"Our menu "} subTitle="
            Would you like to try a dish?
            "></Cover>
            {/*  */}
            <SectionTitel subheader={"--- Don't Miss ---"}
                header={"todays offer"}>
            </SectionTitel>
            <MenuCategory items={offered}  coverImg='https://i.ibb.co/VWyfB3G/banner2.jpg' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} title='offered'></MenuCategory>
            {/*  */}
            {/*  */}
            <SectionTitel subheader={"---DESSERT ---"}
                header={""}>
            </SectionTitel>
            <MenuCategory items={dessert} coverImg='https://i.ibb.co/Brm2jt4/soup-bg.jpg' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} title='dessert'></MenuCategory>
            {/*  */}
            {/*  */}
            <SectionTitel subheader={"---PIZZA ---"}
                header={""}>
            </SectionTitel>
            <MenuCategory items={pizza} coverImg='https://i.ibb.co/FWYxvv7/category-pizza.jpg' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} title='pizza'></MenuCategory>
            {/*  */}
            {/*  */}
            <SectionTitel subheader={"---SALADS ---"}
                header={""}>
            </SectionTitel>
            <MenuCategory items={salad} coverImg='https://i.ibb.co/R24w3Fv/salad-bg.jpg' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} title='salad'></MenuCategory>
            {/*  */}
            <SectionTitel subheader={"--- SOUPS ---"}
                header={""}>
            </SectionTitel>
            <MenuCategory items={soup}  coverImg='https://i.ibb.co/Brm2jt4/soup-bg.jpg' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} title='soup'></MenuCategory>


        </div>
    );
};

export default Menu;