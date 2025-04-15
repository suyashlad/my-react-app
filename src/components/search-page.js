import React, { useState,useEffect  } from "react";
import './search-page.css';
import { useLocation,useNavigate  } from "react-router-dom";
import { getUserName, whatnew } from "../api";
{/*
 import './search.css';

  */ }


export default function FrontPage() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const userId = location.state?.userId;
  const [name, setName] = useState("User");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const fav=true;
  const rec_view=true;
const [articles, setArticles] = useState([]);
const [startIndex, setStartIndex] = useState(0);
const [visibleIndices, setVisibleIndices] = useState([0, 1, 2]);


  useEffect(() => {
    if (userId) {
      getUserName(userId)
        .then((res) => setName(res.data.name))
        .catch((err) => {
          console.error("Failed to fetch user name:", err);
          setName("User");
        });
    }
  
    whatnew()
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Failed to fetch articles:", err));
  }, [userId]);
  
  return (
    <div className={`  d-flex flex-column align-items-center   al search-wrapper
       ${darkMode ? " text-light" : " text-dark"}  `} style={darkMode ? { backgroundColor: "#454545" } : {backgroundColor : "#FFFFFF"}} >
      <div id="rect-3"></div>
      <div id="rect-2"></div>
      <div id="cir"></div>
    <div>
    <button
  id="drk"
  className={`btn fixed-bottom theme-toggle ${darkMode ? 'dark' : 'light'}`}
  onClick={() => setDarkMode(!darkMode)}
>
  <div className={`toggle-content ${darkMode ? 'move-right' : 'move-left'}`}>
    <img
      src={darkMode ? "dark.png" : "light.png"}
      alt="theme-icon"
      className="theme-icon"
    />
    
  </div>
  <span className="toggle-label">{darkMode ? "Dark" : "Light"}</span>
</button></div> 
      {/* Navbar */}
      
      <nav className="nav flex  w-full  flex-row container-fluid fixed-top" >
       
    
        <button id="bt-sm-lg" className={`btn  mb-0 R-0    float-right img-fluid b1`}><img id="sm-lg"src={darkMode ? "logo_small_dark.png":"/logo_small.png"} alt="Recently viewed" className="w-4 h-4" /></button>
       
            <div className="nav-btn-div">
              <button
                id="lt"
                className="btn nav-btn btn-nav flex w-full flex-row"
                onClick={() =>
                  navigate("/search-results", {
                    state: { userId, darkMode, rec_view },
                  })
                }
              >
               <span>
               <img src={darkMode ? "/Recently_Viewed_dark.png" : "/Recently Viewed.png"} alt="Recently_viewed" />
               </span> <span className={`mx-2 ${darkMode ? "text-light" : "text-dark"}`}>Recently_viewed</span>
              </button>

              <button
                className="btn nav-btn btn-nav"
                onClick={() =>
                  navigate("/search-results", {
                    state: { userId, darkMode,fav },
                  })
                }
              >
                <img src={darkMode ? "/Favorites_dark.png" : "/Favorites.png"} alt="favorites" />
                <span className={`mx-2 ${darkMode ? "text-light" : "text-dark"}`}>favorites</span>
              </button>

              <button className="btn nav-btn btn-nav"
              onClick={() =>
                navigate("/Dashboard", {
                  state: { userId, darkMode },
                })
              }>
                <img src={darkMode ? "/log_in_dark.png" : "/Log In.png"} alt="Profile" />
                <span className={`mx-2 ${darkMode ? "text-light" : "text-dark"}`}>{name}</span>
              </button>
            </div>
          </nav>
    
      {/* Main Content */}
      <div className="flex flex-col items-center text-center t-100% w-full max-w-4xl pt-3 pb-3 mb-3" id="in">
     <img src={darkMode ? "/logo_big_dark.png":"/logo_big.png"} alt="ClarityPull Logo" id="lo_lg" />
       <div id="nm" > 
        <img src={darkMode ? "/name_dark.png" : "/name.png" } alt="ClarityPull Logo" id="lo_nm" />
        </div>
        {/* Search Bar */}
        <div id="lo-nm-div"className=" flex items-center bg-orange-100 mx-auto rounded-lg w-full max-w-xl shadow-md mt-4">
       {/*  <img id="se" src={darkMode ? "/se_dark.png":"/se.png"} alt="ClarityPull Logo" className=" mx-6" />
        */ }</div>
       <div className="se-div">
  <div className="se-input-wrapper">
   
    <input
      type="search"
      id="se-input"
      placeholder="Article name or keywords..."
  value={searchKeyword}
  onChange={(e) => setSearchKeyword(e.target.value)}
      className={`${darkMode ? "se-in-drk" : "se-in-light"}`}
      
    />
  </div>
  <button
  className="se-btn-drk"
  onClick={() => {
    navigate("/search-results", {
      state: {
        userId,
        darkMode,
        keyword: searchKeyword.trim(),
      },
    });
  }}
>
  Search
</button>
</div>


          
          </div>  
        {/* Cards */}
     <div id="new">
  {/* What's New Button */}
  <div id="wn">
    <button className="wn-btn">
      <img src={darkMode ? "/wn_dark.png" : "/wn.png"} alt="What's New" />
    </button>
  </div>

  {/* What's New Cards 
  <div className="cards-container  " id="wn-crd">
  {articles.slice(0, 3).map((article, index) => (
    <div key={index} className={`card ${darkMode ? "card-dark" : "card-light"}`}>
     <div className={`close-btn ${darkMode ? "close-btn-drk" : "close-btn-light"}`} id={`close-btn- ${darkMode ? "cls-div-drk" : "cls-div-lit"}`} > 
       <button className={`close-btn ${darkMode ? "close-btn-drk" : "close-btn-light"}`} id={`close-btn- ${darkMode ? "cls-bt-drk" : "cls-bt-lit"}`}>&times;</button></div>
      <div className="card-header">
        <div className="author-info">
        <img
          src={darkMode ? `/g${index + 1}_dark.png` : `/g${index + 1}.png`}
          alt={`Article ${index + 1}`}
          className="author-image"
        />
          <div className="author-meta">
            <h4 className="article-title">{article.title}</h4>
          </div>
        </div>
       
      </div>
      <div></div>
      <p className="article-description">{article.description}</p>
      <p className={`article-date`} id="wn-auther-info">{article.date} • {article.author}</p>
    </div>
  ))}
</div>*/}
<div className="cards-container" id="wn-crd">
  {visibleIndices.map((index, cardIndex) => {
    // If the index is null, don't render anything (this card is exhausted)
    if (index === null) return <div key={cardIndex} className="card empty-card" />;

    const article = articles[index];
    if (!article) return null;

    return (
      <div key={cardIndex} className={`card ${darkMode ? "card-dark" : "card-light"}`}>
        <div className="close-btn-wrapper">
          <button
            onClick={() => {
  setVisibleIndices((prev) => {
    const used = new Set(prev.filter((i) => i !== null));
    const allIndices = Array.from({ length: articles.length }, (_, i) => i);

    // Find the first unused index
    const nextIndex = allIndices.find(i => !used.has(i));

    // If no unused index left, hide the card
    if (nextIndex === undefined) {
      const updated = [...prev];
      updated[cardIndex] = null;
      return updated;
    }

    // Replace this card with the new article
    const updated = [...prev];
    updated[cardIndex] = nextIndex;
    return updated;
  });
}}

            className={`close-btn ${darkMode ? "close-btn-drk" : "close-btn-light"}`}
          >
            &times;
          </button>
        </div>
        <span ><img
              src={darkMode ? `/g${cardIndex + 1}_dark.png` : `/g${cardIndex + 1}.png`}
              alt={`Article ${cardIndex + 1}`}
              className="author-image"
              id="auth-img"
            /></span>
        <span className="crd-txt"><div className={`card-header ${darkMode ? "crd-hdr-drk":"crd-hdr-light"}`}>
          <div className="author-info">
            
            <div className="author-meta">
              <h4 className="article-title">{article.title}</h4>
            </div>
          </div>
        </div>
        <p className="article-description">{article.description}</p>
        <p className="article-date" id={`wn-auther-info ${darkMode ? "wn-auth-drk" : "wn-auth-light"}`}>
          {article.date} • {article.author}
        </p></span>
        
      </div>
    );
  })}
</div>





</div>

      

      <footer>
      

</footer>

   </div>
  );
}
