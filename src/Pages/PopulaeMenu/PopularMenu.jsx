import React, { useEffect, useState } from 'react';
import MenuItems from './MenuItems';
import SectionTitel from '../Titel/SectionTitel';

const PopularMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                const popular = menu.filter(item => item.category === 'popular')
                setMenu(popular);
                setLoading(false);

            });
    }, [])

    return (
        <div>
            <SectionTitel subheader={"---- Check it out----"} header={" from our menu "}></SectionTitel>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
                {
                    menu.map(item => <MenuItems key={item._id} item={item}></MenuItems>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;