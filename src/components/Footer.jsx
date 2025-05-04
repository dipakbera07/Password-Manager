import React from 'react'

const Footer = () => {
    return (
        <footer className='w-screen  h-[50px] flex items-center justify-between  '>
            <div className=" m-auto flex items-center flex-col justify-center">

                <div className='text-[19px] '>
                    <span className='text-green-600 text-[19px]'>&lt; </span>
                    Pass
                    <span className='text-green-600 text-[19px]'> OP/&gt;</span>
                </div>
                <div>
                    <p className=' text-[11px]'>Created by Dipak Bera </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
