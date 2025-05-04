import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-screen bg-slate-700 h-[70px] flex items-center justify-between '>
            <div className="w-[87%] md:container m-auto px-0 md:px-10 lg:mycontainer flex items-center justify-between text-white">

                <div className= 'text-[24px] md:text-2xl'>
                    <span className='text-green-600  text-[24px] md:text-2xl'>&lt; </span>
                    Pass
                    <span className='text-green-600  text-[24px] md:text-2xl'> OP/&gt;</span>
                    </div>
                <div className='flex justify-center items-center gap-1 bg-slate-900 rounded-full p-[5px] px-[6px]'>
                    <img className='w-6 md:w-7 invert' src="git-logo.png" alt="" />
                    <h2 className='font-bold text-[14px] md:text-[17px]'>GitHub</h2>
                </div>
            </div>
        </nav>
    )
}

export default Navbar 
