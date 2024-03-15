import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/images/medplusLogo.webp";
import { Link, useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { BiLogoYoutube } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search?.value;
    if (searchQuery) {
      console.log("Search query:", searchQuery);
      navigate(`/search?search=${searchQuery}`);
      setSearchVisible(false);
    }
  };

  const handleMenuClick = () => {
    setMenu(true);
  };

  const handleCloseClick = () => {
    setMenu(false);
  };

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <>
      <div className="flex justify-between md:h-[11vh] h-[8vh] items-center m-2 lg:m-0 lg:p-2 bg-white">
        <div>
          <Link to="/">
            <img className="h-12 mt-2 md:h-14 md:mt-4" src={logo} alt="logo" />
          </Link>
        </div>

        <ul className="hidden lg:flex gap-8 font-semibold mr-20 text-sm cursor-pointer">
          <Link to="/">
            <li className="hover:text-blue-400">HOME</li>
          </Link>
          <Link to="/about">
            <li className="hover:text-blue-400">ABOUT US</li>
          </Link>
          <Link to="/products">
            <li className="hover:text-blue-400">PRODUCTS</li>
          </Link>
          <Link to="/stores">
            <li className="hover:text-blue-400">OUR STORES</li>
          </Link>
          <Link to="blogs">
            <li className="hover:text-blue-400">BLOGS</li>
          </Link>
          <Link to="/contact">
            <li className="hover:text-blue-400">CONTACT US</li>
          </Link>
        </ul>
        <Link className="hidden md:block" to="/upload">
          <h1 className="font-semibold text-red-500 mr-10 hover:text-green-500 cursor-pointer">
            Upload Prescription
          </h1>
        </Link>
        <div className="flex gap-5 mr-5">
          <div className="mr-3 cursor-pointer" onClick={handleSearchClick}>
            <RiSearchLine size={20} />
          </div>
          <div className="gap-5 hidden md:flex">
            <BiLogoFacebookCircle
              size={18}
              className="hover:text-green-400 cursor-pointer"
            />
            <FaSquareXTwitter
              size={18}
              className="hover:text-green-400 cursor-pointer"
            />
            <BiLogoInstagramAlt
              size={18}
              className="hover:text-green-400 cursor-pointer"
            />
            <BiLogoLinkedinSquare
              size={18}
              className="hover:text-green-400 cursor-pointer"
            />
            <BiLogoYoutube
              size={18}
              className="hover:text-green-400 cursor-pointer"
            />
          </div>
        </div>
        <div
          className="lg:hidden flex bg-gray-200 rounded-sm items-center gap-2 m-2 p-2 cursor-pointer"
          onMouseDown={handleMenuClick}
        >
          <GiHamburgerMenu />
          <h1 className="text-xs hover:text-green-500">MENU</h1>
        </div>
      </div>
      {menu && (
        <div className="lg:hidden block fixed bg-[#121519fa] h-[100vh] w-[40%] top-0 right-0 z-10 animate">
          <div
            className="flex mr-2 p-2 justify-end cursor-pointer"
            onMouseDown={handleCloseClick}
          >
            <IoIosClose color="white" />
          </div>
          <div className="flex flex-col justify-center items-start w-full text-white text-xl p-5 cursor-pointer">
            <Link className="border-t-2 border-gray-700 w-full" to="/">
              <h1 className="hover:text-green-500 py-2 w-full">Home</h1>
            </Link>
            <Link className="border-t-2 border-gray-700 w-full" to="/about">
              <h1 className="hover:text-green-500 py-2 w-full">About Us</h1>
            </Link>
            <Link className="border-t-2 border-gray-700 w-full" to="/products">
              <h1 className="hover:text-green-500 py-2 w-full">Products</h1>
            </Link>
            <Link className="border-t-2 border-gray-700 w-full" to="/stores">
              <h1 className="hover:text-green-500 py-2 w-full">Our Stores</h1>
            </Link>
            <Link className="border-t-2 border-gray-700 w-full" to="/blogs">
              <h1 className="hover:text-green-500 py-2">Blogs</h1>
            </Link>
            <Link
              className="border-b-2 border-t-2 border-gray-700 w-full"
              to="/contact"
            >
              <h1 className="hover:text-green-500 py-2 w-full">Contact Us</h1>
            </Link>
          </div>
        </div>
      )}
      {searchVisible}
      <form
        ref={searchRef}
        role="search"
        method="get"
        className={`relative ${searchVisible ? "block" : "hidden"}`}
        onSubmit={handleSearchSubmit}
      >
        <input
          type="search"
          className="modal-field appearance-none border border-gray-300 rounded-lg py-2 px-4 block w-full leading-normal focus:outline-none focus:border-blue-500"
          placeholder="Search"
          name="search"
          autoComplete="off"
          title="Search for..."
          aria-label="Search for..."
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center bg-blue-500 text-white rounded-full h-8 w-8 p-2 focus:outline-none focus:bg-blue-600"
            aria-label="Search button"
            onClick={() => setSearchVisible(false)}
          >
            <RiSearchLine size={20} />
          </button>
        </div>
        <input type="hidden" name="post_type" value="product" />
      </form>
    </>
  );
};

export default Header;
