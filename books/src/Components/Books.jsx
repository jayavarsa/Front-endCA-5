// importing required modules and files
import React, { useState, useEffect } from 'react';
import kal from '../assets/kal.png'
import star from "../assets/star.png";
import { Link } from 'react-router-dom';
import { BiSearch, BiArrowBack } from 'react-icons/bi';

// main functional component
function Books() {
//  setting state for search input value and books array 
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);

  
// code to fetch data from the api
  useEffect(() => {
    fetch('https://reactnd-books-api.udacity.com/books', {
      headers: {
        'Authorization': 'whatever-you-want'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setBooks(data.books);
      console.log(books)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  },[]);

//    function that handles search event
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // filtre books name according to the input giving  by user
  const searchbyBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

//   event which handles the scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

// Code to make nav bar responsive and animated
  const toggleMenu = () => {
    const navbarMenu = document.getElementById("menu");
    const bgOverlay = document.querySelector(".overlay");
    navbarMenu.classList.toggle("is-active");
    bgOverlay.classList.toggle("is-active");
  };

  const closeMenu = () => {
    const navbarMenu = document.getElementById("menu");
    const bgOverlay = document.querySelector(".overlay");
    navbarMenu.classList.remove("is-active");
    bgOverlay.classList.remove("is-active");
  };

  const toggleSearch = () => {
    const searchBlock = document.querySelector(".search-block");
    searchBlock.classList.add("is-active");
  };

  const closeSearch = () => {
    const searchBlock = document.querySelector(".search-block");
    searchBlock.classList.remove("is-active");
    setSearchTerm('');

  };

  return (
    <>  
    {/* nav bar  */}
      <nav className={`navbar container ${scrolled ? 'shadow' : ''}`}> 
        <a  className="brand"> <img src={kal} alt="" /> </a> 
        <div className="burger" id="burger" onClick={toggleMenu}>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
        </div>
        <span className="overlay"></span>
        <div className="menu" id="menu">
            <ul className="menu-inner">
            <li className="menu-item" ><a onClick={()=>{window.location.reload()}} className="menu-link"  href="#">Home</a></li>
            <li className="menu-item" ><a  className="menu-link"  href=""><Link to={"/signup"}>Sign up</Link></a></li>
            <li className="menu-item"><a className="menu-link" href="https://www.linkedin.com/in/jayavarsanr/" target="_blank" rel="noopener noreferrer">Creator</a></li>
            </ul>
        </div>
        <span onClick={toggleSearch}><BiSearch className="search-toggle" /></span>
        <div className="search-block">
            <form className="search-form">
                <span  onClick={closeSearch}><BiArrowBack className="search-cancel" /></span>
            <input id="search-bar" type="search" value={searchTerm} onChange={handleSearch} name="search" className="search-input" placeholder="Search here..." />
            </form>
        </div>
      </nav>
      {/* main div for the books */}
      <div className='books'>
        {/* divs for each books */}
        {searchbyBooks.map((book) => (
          <div key={book.id} className='one_book'>
            <div className='thum'>
              <img src={book.imageLinks.thumbnail} alt={book.title} />
            </div>
            <div className='dis'>
              <h5>{book.title}</h5>
            </div>
            <div className='rating_div'>
              <span>{book.averageRating ? book.averageRating.toFixed(1) : (Math.random() * 4 + 1).toFixed(1)}</span>
              <img src={star} alt="Rating" />
              <span>Free</span>
            </div>
          </div>  
        ))}
      </div>
      {/* footer section */}
      <footer>
        <p>Made by Jayavarsan</p>
      </footer>
    </>
  );
}

export default Books;
