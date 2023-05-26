import React from 'react';
import Banner from './Banner/Banner';
import Sweeper from './Sweeper';
import SectionTitel from '../Titel/SectionTitel';
import PopularMenu from '../PopulaeMenu/PopularMenu';
import MenuItems from '../PopulaeMenu/MenuItems';
import Testimonials from './TESTIMONIALS/TESTIMONIALS';

const Home = () => {
    return (
        <div>
            <div className="mb-5">
                <Banner></Banner>
            </div>
            <Sweeper></Sweeper>
            <div className="">
                <div className="">
                    <SectionTitel subheader={"---- From 11.00am to 10.00 pm ----"}
                        header={"order Online"}>
                    </SectionTitel>
                </div>
                <div className=" h-[350px]">
                    <div className=" text-center mb-20">
                        <div className="absolute ">
                            <img src="https://i.ibb.co/drvk65d/chef-service.jpg" alt="" srcset="" />
                        </div>
                        <div className="w-[80%] mx-auto relative top-40 bg-white p-5">
                            <h1 className='my-3 text-4xl '>Bistro Boss</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
          
            <PopularMenu></PopularMenu>
            </div>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;