'use client'



import { motion } from 'framer-motion'



export default function HeroText({ HEAD, SUBHEAD }: { HEAD?: string, SUBHEAD?: string }) {
    return (
        <div className="flex flex-col z-1 capitalize w-full items-start justify-start gap-1 mb-5" >
            <h2 className='flex flex-row flex-wrap items-start justify-start'>
                {HEAD!.split(' ').map((word, index) => (
                    <div
                        key={index}
                        className='inline-block overflow-hidden text-nowrap'
                    >
                        <motion.div
                            initial={{ y: '100%' }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 1, delay: index * 0.06, ease: [0.165, 0.84, 0.44, 1] }}
                            viewport={{ once: true }}
                            className='inline-block'
                        >
                            {word}
                        </motion.div>
                    </div>
                ))}
            </h2>



            {SUBHEAD &&
                <p className='flex flex-row flex-wrap items-start justify-start gap-x-1 text-wrap text-zinc-300'>
                    {SUBHEAD.split(' ').map((word, index) => (
                        <div
                            key={index}
                            className='inline-block overflow-hidden text-nowrap'
                        >
                            <motion.div
                                initial={{ opacity: 0, filter: 'blur(5px)' }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1, delay: index * 0.06, ease: [0.165, 0.84, 0.44, 1] }}
                                viewport={{ once: true }}
                                className='inline-block'
                            >
                                {word}
                            </motion.div>
                        </div>
                    ))}
                </p>
            }
        </div>
    )
}