import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import { IoIosSearch } from "react-icons/io";
import { BiHeart } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { UserContext } from '../../contexts/UserContext'


const Navbar = () => {
  const {state} = useContext(UserContext)
  const [search, setSearch] = useState("");
  const [found, setFound] = useState();


  useEffect(() => {
    if (search === "") {
      setFound([])
    }
    if (search) {
      searchHandler()
    }

  }, [search])

  function searchHandler() {
    fetch("/product/search", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search
      })
    }).then(res => {
      res.json().then(data => {
        if (data.found.length === 0) {
          setFound()
        }
        setFound(data.found)

      }).catch(err => {
        console.log(err)
      })
    })
  }


  return (
    <div className="navbar-container">
      <Link className="navbar-brand-container" to="/">
        <img src="https://res.cloudinary.com/dagwb842k/image/upload/v1636708437/logo_sg3ny3.png" alt="" />
      </Link>

      <div className="navbar-search-bar-container">
        <div className="navbar-search-icon-input-container">
          <div className="navbar-search-icon-container">
            <IoIosSearch />
          </div>
          <input type="text" className="" placeholder="Search for your product" value={search} onChange={(e) => { setSearch(e.target.value) }} />
        </div>
        {(found) && <div className="navbar-found-products">
          {found.map((each, index) => {
            return <Link className="navbar-found-each" to={`/product/${each._id}`} key={index} target="_blank">
              <div className="navbar-found-each-image-container"><img src={each.thumbnail} key={-index}></img></div>
              <p key={index*5}>{each.title}</p>
            </Link>
          })}
        </div>}
      </div>


      <div className="navbar-links-container">
        {(state) ? <><Link to="/profile" className="navbar-link"><BsFillPersonFill /> <p>Profile</p> </Link>
          <Link to="/wishlist" className="navbar-link"> <BiHeart /><p>Wishlist</p> </Link>
          <Link to="/cart" className="navbar-link"><BsCart /> <p>Cart</p> </Link></>
          : <Link to="/sign-in" className="navbar-link"><BsFillPersonFill /> <p>Sign In</p> </Link>}

      </div>




    </div>
  )
}

export default Navbar
