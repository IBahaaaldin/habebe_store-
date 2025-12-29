import React from 'react';

export interface MenuItem {
    label: string;
    url: string;
    image?: string;
}

export interface MenuCollectionProps {
    menuItems: MenuItem[];
    className?: string;
}

const MenuCollection: React.FC<MenuCollectionProps> = ({ menuItems }) => {
    if (!menuItems || menuItems.length === 0) {
        return null;
    }

    return (
        <nav>
            <ul className="flex flex-row gap-5 overflow-scroll HIDDEN_SCROLL">
                {menuItems.map((item, index) => (
                    <li key={index} className="group relative aspect-square overflow-hidden rounded-3xl bg-orange-500 lg:min-w-25 lg:min-h-25 min-w-20 min-h-20">
                        <a href={item.url} className="block h-full w-full">
                            {item.image && (
                                <img
                                    src={'https://images.pexels.com/photos/35130806/pexels-photo-35130806.jpeg'}
                                    alt={item.label}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 grayscale"
                                />
                            )}


                            <div className="absolute inset-0 bg-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-70" />

                            <span className="z-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-sm text-xs font-bold text-white">
                                {item.label}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MenuCollection;