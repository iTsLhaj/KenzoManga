import React from 'react';



const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 py-10 min-h-96 mt-48">
            <div className="bg-gray-100">
                <div className="max-w-screen-xl px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
                    <div className="p-5">
                        <div className="text-md uppercase text-indigo-600 font-bold">Follow Us</div>
                        <div className="flex space-x-4 mt-3">
                            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-discord"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="text-md uppercase text-indigo-600 font-bold">Resources</div>
                        <a className="my-3 block" href="/">
                            Home <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/discover">
                            Discover <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/about">
                            About <span className="text-purple-600 text-xs p-1">New</span>
                        </a>
                    </div>
                    <div className="p-5">
                        <div className="text-md uppercase text-indigo-600 font-bold">Support</div>
                        <a className="my-3 block" href="/#">
                            Support ?! <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                    </div>
                    <div className="p-5">
                        <div className="text-md uppercase text-indigo-600 font-bold">Contact us</div>
                        <a className="my-3 block" href="/#">
                            105, St Mehdi Ben Berka -ex Cimetière, résid. Arrajaa, Casablanca
                            <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="mailto:">
                            dont.contact@us.please.com <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                    </div>
                </div>
                <div className="bg-gray-100 pt-3">
                    <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col max-w-screen-lg items-center">
                        
                        <p className="pt-2 text-center">
                            All rights reserved &copy; 2025 OZEN Community.
                            <br />
                            All trademarks and logos are property of their respective owners.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
