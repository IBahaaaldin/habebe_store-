'use client'



import React from 'react'
import { motion } from 'framer-motion'



export default function HeaderText({ HEAD, SUBHEAD }: { HEAD?: string, SUBHEAD?: string }) {
    return (
        <div className="flex flex-col z-1 capitalize items-start justify-start w-full gap-4 mb-5" >
            <h3 className=' lg:text-5xl text-4xl flex-wrap flex flex-row gap-2 font-bold'>
                {HEAD!.split(' ').map((word, index) => (
                    <span
                        key={index}
                        className='inline-block overflow-hidden '
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
                <h6 className='flex flex-row flex-wrap gap-1.5 text-wrap'>
                    {SUBHEAD.split(' ').map((word, index) => (
                        <span
                            key={index}
                            className='inline-block overflow-hidden'
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
                </h6>
            }
        </div>
    )
}