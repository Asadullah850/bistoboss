import React, { PureComponent } from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSerous from '../../hooks/useAxiosSerous';
import { FaWallet, FaUsers, FaProductHunt, FaTruckMoving } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, } from "recharts";



const AdminHome = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSerous()
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


    const { data: stats = {} } = useQuery({
        queryKey: ['admin-status'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats');
            return res.data;
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['chart-data'],
        queryFn: async () => {
            const res = await axiosSecure('/order-status')
            return res.data;

        }
    })

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <div className='w-full text-center h-screen'>
            <h2 className='text-xl font-semibold mt-2'>Hi, Welcome Back! {user?.displayName}</h2>
            <div className=" mt-2">
                <div className="stats shadow gap-2 text-white">

                    <div className="stat flex bg-gradient-to-r from-[#BC37FB] to-[#FCDBFF] ">
                        <div className="">
                            <FaWallet className=' text-xl my-[50%]'></FaWallet>
                        </div>
                        <div className="">
                            <div className="stat-value">${stats.revenue}</div>
                            <div className=" text-black font-semibold">Revenue</div>
                        </div>
                    </div>
                    <div className="stat flex bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]">
                        <div className="">
                            <FaUsers className=' text-xl my-[50%]'></FaUsers>
                        </div>
                        <div className="">
                            <div className="stat-value">{stats.user}</div>
                            <div className=" text-black font-semibold">Customers</div>
                        </div>
                    </div>
                    <div className="stat flex bg-gradient-to-r from-[#FE4880] to-[#FDE8C0]">
                        <div className="">
                            <FaProductHunt className=' text-xl my-[50%]'></FaProductHunt>
                        </div>
                        <div className="">
                            <div className="stat-value">{stats.products}</div>
                            <div className=" text-black font-semibold">Products</div>
                        </div>
                    </div>
                    <div className="stat flex bg-gradient-to-r from-[#4696f9] to-[#B6F7FF]">
                        <div className="">
                            <FaTruckMoving className=' text-xl my-[50%]'></FaTruckMoving>
                        </div>
                        <div className="">
                            <div className="stat-value">{stats.order}</div>
                            <div className=" text-black font-semibold">Orders</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar
                            dataKey="total"
                            fill="#8884d8"
                            shape={<TriangleBar />}
                            label={{ position: "top" }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 80]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="total"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;