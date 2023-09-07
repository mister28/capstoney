import React from 'react'

import { Search, Star } from 'react-feather';
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    // one column for the left sidebar, right sidebar, and two for the middle
    <div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center"> 
        <Link to="/" className="mx-auto md:mx-0">
            <img src="/chirp-logo-v1-cropped.jpg" alt="Chrip Site logo" width={"80px"} className="ml-8" />
        </Link>

        <div className='col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0'>
            <div className='flex justify-between items-center'>
                <h2 className="font-bold text-2xl">Home</h2>
                <Star className=''/>
            </div>
        </div>


        <div className='px-0 md:px-6 mx-auto'>
            <Search className="absolute m-2"/>
            <input type="text" className='bg-blue-100 rounded-full py-2 px-8'/>
        </div>
    </div> 
  );
};

export default Navbar