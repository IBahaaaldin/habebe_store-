'use client'



import React from 'react'
import { motion } from 'framer-motion'



export default function HeroText({ HEAD, SUBHEAD }: { HEAD?: string, SUBHEAD?: string }) {
    return (
        <div className="flex flex-col z-1 capitalize w-full items-center justify-center gap-4 mb-5" >
            <h3 className='md:text-8xl sm:text-7xl text-5xl flex flex-row flex-wrap items-center justify-center  gap-2'>
                {HEAD!.split(' ').map((word, index) => (
                    <span
                        key={index}
                        className='inline-block overflow-hidden text-nowrap'
                    >
                        <motion.span
                            initial={{ y: '100%' }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 1, delay: index * 0.06, ease: [0.165, 0.84, 0.44, 1] }}
                            viewport={{ once: true }}
                            className='inline-block'
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </h3>



            {SUBHEAD &&
                <h4 className='lg:text-lg flex flex-row flex-wrap  items-center justify-center gap-1.5 text-wrap text-zinc-300'>
                    {SUBHEAD.split(' ').map((word, index) => (
                        <span
                            key={index}
                            className='inline-block overflow-hidden text-nowrap'
                        >
                            <motion.span
                                initial={{ opacity: 0, filter: 'blur(5px)' }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1, delay: index * 0.06, ease: [0.165, 0.84, 0.44, 1] }}
                                viewport={{ once: true }}
                                className='inline-block'
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h4>
            }
        </div>
    )
}