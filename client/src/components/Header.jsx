import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
       <div className=' mt-20 p-4'>
            <img src={assets.header_img} alt="" className=' w-36 h-36 rounded-full mb-6' />
            <h1 className="">Hello Developer <img src={assets.hand_wave} className=' w-8 aspect-square' alt="" /></h1>
            <h2>Welcome to our app</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut inventore voluptate cum velit deleniti maiores odio? Provident, amet quam quaerat modi reiciendis, ipsa unde maxime ad ab, iste quia.</p>
       </div>
  )
}

export default Header