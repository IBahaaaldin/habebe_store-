'use client'



import { motion } from 'framer-motion'



export default function HeaderText({ HEAD, SUBHEAD }: { HEAD?: string, SUBHEAD?: string }) {
    return (
        <div className="flex flex-col z-1 capitalize items-start justify-start w-full gap-1 mb-5" >
            <h3 className='font-normal flex-wrap flex flex-row md:gap-x-2 gap-x-1.5 leading-tight'>
                {HEAD!.split(' ').map((word, index) => (
                    <div
                        key={index}
                        className='inline-block overflow-hidden '
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
            </h3>



            {SUBHEAD &&
                <div className='flex flex-row flex-wrap gap-1.5 text-wrap'>
                    {SUBHEAD.split(' ').map((word, index) => (
                        <p
                            key={index}
                            className='inline-block overflow-hidden'
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
                        </p>
                    ))}
                </div>
            }
        </div>
    )
}



export function SmallHeaderText({ HEAD, SUBHEAD }: { HEAD?: React.ReactNode, SUBHEAD?: React.ReactNode }) {
    return (
        <div className="flex flex-col flex-wrap z-1 capitalize items-start justify-start gap-y-1 lg:max-w-sm w-full text-wrap mb-5" >
            {HEAD &&
                <h5 className='flex-wrap gap-x-1.5 text-nowrap flex flex-row w-full'>
                    {HEAD}
                </h5>
            }

            {SUBHEAD &&
                <span className='text-start opacity-80'>
                    {SUBHEAD}
                </span>
            }
        </div>
    )
}