import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='bg-white shadow'>
        <div className='max-w-7xl px-4 py-6 mx-auto'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-bold text-indigo-500'>Image Analyzer</h1>
            <div className='flex items-center gap-4'>
              <Link href={'#'} className='transition-all hover:text-indigo-400'>Home</Link>
              <Link href={'#How-it-Works'} className='transition-all hover:text-indigo-400'>How it Works</Link>
              <Link href={'#Feature'} className='transition-all hover:text-indigo-400'>Feature</Link>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header