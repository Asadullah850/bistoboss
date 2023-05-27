import React, { useEffect, useState } from 'react';
import MenuItems from './MenuItems';
import SectionTitel from '../Titel/SectionTitel';
import useMenu from '../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === "popular")

    return (
        <div>
            <SectionTitel subheader={"---- From 11.00am to 10.00 pm ----"}
                        header={"order Online"}>
                    </SectionTitel>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
                {
                    popular.map(item => <MenuItems key={item._id} item={item}></MenuItems>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;