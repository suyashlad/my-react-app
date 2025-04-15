import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "./search-result.css";
import { getUserName, files, fav } from "../api";
import { CiFilter } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { TopToolbar, SortButton, CreateButton, ExportButton } from 'react-admin';



// Utility: Color by format
function color(format) {
  switch (format.toLowerCase()) {
    case "pdf":
      return "#d9534f";
    case "docx":
    case "doc":
      return "#0275d8";
    case "jpeg":
    case "jpg":
    case "png":
      return "#5cb85c";
    case "xlsx":
    case "xls":
      return "#f0ad4e";
    default:
      return "#6c757d";
  }
}

// Utility: Icon by format
function file_lg(format) {
  const lower = format.toLowerCase();
  if (["pdf"].includes(lower)) return "/icons/pdf.png";
  if (["doc", "docx"].includes(lower)) return "/icons/tsv1.png";
  if (["xls", "xlsx"].includes(lower)) return "/icons/excel (2).png";
  if (["jpeg", "jpg", "png", "mp4"].includes(lower)) return "/icons/mp4.png";
  if (["ppt", "pptx"].includes(lower)) return "/icons/tsv.png";
  if (["json"].includes(lower)) return "/icons/json.png";
  if (["tsv", "txt"].includes(lower)) return "/icons/tsv.png";
  return "/icons/file.png";
}

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId;
  const darkMode = location.state?.darkMode;
  const key_from_anth_page = location.state?.keyword || "";

  const [name, setName] = useState("User");
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [keyword, setkeyword] = useState(key_from_anth_page);
  const [page,setpage]=useState(1);
  const [crdperpage,setcrdperpage]=useState(12);

  const indstry = [...new Set(articles.map(value=>value.industry))];
  const file_format=[...new Set(articles.map(value=>value.format))];
  const source =[...new Set(articles.map(value=>value.source||"unknown"))];

  const [ind,setind]=useState('');
  const [forma,setforma]=useState('');
  const [date, setdate] = useState(location.state?.rec_view ? 'today' : '');

  const [datasrc,setdatasrc]=useState('');
  const [sort,setsort]=useState('');

  const rec_view = location.state?.rec_view;
  
  const [shfav, setshfav] = useState(location.state?.fav || false);

  const [exp, setexp] = useState(false);
  const descRef = useRef(null);
  const [overflo, setoverflo] = useState(false);
  
  useEffect(() => {
    if (userId) {
      getUserName(userId)
        .then((res) => setName(res.data.name))
        .catch(() => setName("User"));
    }

    files()
      .then((res) => {
        const all = res.data || [];
        setAllArticles(all);
        filt(all, key_from_anth_page);
      })
      .catch((err) => console.error("Failed to fetch articles:", err));
  }, [userId]);

  const filt = (list, keyword) => {
    const filtered = list.filter((article) =>
      article.title.toLowerCase().includes(keyword.toLowerCase()) ||
      article.description.toLowerCase().includes(keyword.toLowerCase())  ||
      article.format.toLowerCase().includes(keyword.toLowerCase()) ||
      article.author.toLowerCase().includes(keyword.toLowerCase()) ||
      article.date.toLowerCase().includes(keyword.toLowerCase()) 
    );
    setArticles(filtered);
  };

  useEffect(() => {
    const el = descRef.current;
    if (el && el.scrollHeight > el.clientHeight) {
      setoverflo(true);
    }
  }, []);

  const handleSearch = () => {
    filt(allArticles, keyword);
  };
  const [menuopt, setmenuopt] = useState({ anchor: null, index: null });

  const open = Boolean(menuopt);
  
const ITEM_HEIGHT = 48;
const options=['Settings','summrise','delete']
  const handleClick = (event) => {
    setmenuopt(event.currentTarget);
  };
  const handleClose = () => {
    setmenuopt(null);
  };
  
  
  const filt_articals = articles
  .filter(crd => {
    const file_dt= new Date(crd.date);
    const today = new Date();
    let dt_equle=true;
    if (date === "today")
    {
      dt_equle=file_dt.toDateString()===today.toDateString();
    }
    else if(date === "last_week")
    {
      const weekeg=new Date();
      weekeg.setDate(today.getDate() - 7);
      dt_equle = file_dt >= weekeg;
    }
    else if(date === "last_month")
      {
        const montheg=new Date();
        montheg.setDate(today.getMonth() - 1);
        dt_equle = file_dt >= montheg;
      }
    return (
      (ind === '' || crd.industry === ind) &&
      (forma === '' || crd.format === forma) &&
      (datasrc === '' || crd.source === datasrc) &&
      dt_equle&&
      (!shfav || crd.isFavorite)
    );
  })
  .sort((a, b) => {
    if (sort === "date_desc") return new Date(b.date) - new Date(a.date);
    if (sort === "date_asc") return new Date(a.date) - new Date(b.date);
    if (sort === "title_asc") return a.title.localeCompare(b.title);
    if (sort === "title_desc") return b.title.localeCompare(a.title);
    return 0;
  });
  
  const lastcrd =page * crdperpage;
  const firstcrd = lastcrd- crdperpage;
  const currentcrds=filt_articals.slice(firstcrd,lastcrd);
 const totalcrd=filt_articals.length;
 const handlefav = (file_id) => {
  fav(file_id)
    .then((res) => {
      if (res.data.success) {
        // Update allArticles
        const updatedArticles = allArticles.map((article) =>
          article.file_id === file_id
            ? { ...article, isFavorite: res.data.isFavorite }
            : article
        );

        setAllArticles(updatedArticles);

        // Re-run filter with current keyword to update UI instantly
        filt(updatedArticles, keyword);
      } else {
        console.error("Failed to toggle favorite status.");
      }
    })
    .catch((err) => {
      console.error("Error while updating favorite:", err);
    });
};


        
  let pages=[];
    for(let i=1;i<=Math.ceil(totalcrd/crdperpage);i++)
    {
        pages.push(i)
    }
    const clearFilters = () => {
      setind('');
      setforma('');
      setdate('');
      setdatasrc('');
      setshfav(false);
    };
    
    const areFiltersActive = ind || forma || date || datasrc || shfav;
    

  return (
    <div className={`d-flex flex-column search-wrapper ${darkMode ? "text-light al_drk" : "text-dark al_light"}`}>
      <div className="results-page">
        <header className="search-header">
          <nav className="nav flex w-full flex-row container-fluid ">
            <img id="sm-lg" src="/search_res_lo.png" alt="Logo" />
            <div className="nav-btn-div">
              <button
                id="lt"
                className="btn nav-btn btn-nav flex w-full flex-row"
                onClick={() =>
                  navigate("/Notification", {
                    state: { userId, darkMode, keyword: "recently_viewed" },
                  })
                }
              >
               <span>
               <img src={darkMode ? "/Recently_Viewed_dark.png" : "/not.png"} alt="Notification" />
               </span> <span className={`mx-2 ${darkMode ? "text-light" : "text-dark"}`}>Notification</span>
              </button>

              <button
                className="btn nav-btn btn-nav"
                onClick={() =>
                  navigate("/Setting", {
                    state: { userId, darkMode, keyword: "favorites" },
                  })
                }
              >
                <img src={darkMode ? "/Favorites_dark.png" : "/settings.png"} alt="Setting" />
                <span className={`mx-2 ${darkMode ? "text-light" : "text-dark"}`}>Setting</span>
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

          {/* Search Bar */}
          <div className="search-bar">
  <div className="search-input-wrapper">
    <input
      type="text"
      placeholder="Search..."
      value={keyword}
      onChange={(e) => setkeyword(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleSearch();
      }}
      className={darkMode ? "se-in-drk" : "se-in-light"}
    />
    {keyword && (
      <span 
      className="clear-btn" 
      onClick={() => {
        setkeyword("");
        filt(allArticles, "");
      }}
      style={{ cursor: 'pointer' }}
    >
      &times;
    </span>
    )}
  </div>
  <button onClick={handleSearch}>Search</button>
</div>

         
          <div className="filters" style={{ display: 'flex', alignItems: 'center' }}>
          {(ind || forma || date || datasrc || shfav) ? (
  <FaFilter 
  onClick={clearFilters}
  color="#FF8F43"
  size={20}
  style={{ cursor: 'pointer' ,borderColor:'black',marginLeft:'0.3%' }}
/>
) : (
  <CiFilter 
    onClick={clearFilters}
    size={25}
    style={{ cursor: 'pointer' }}  
  />
)}
  <Form.Select
    size="sm"
    value={ind}
    onChange={(e) => setind(e.target.value)}
    className="filt-sel"
  >
    <option value="">Industry</option>
    <option value="">none</option>
    {indstry.map((ind, index) => (
      <option key={index} value={ind}>
        {ind}
      </option>
    ))}
  </Form.Select>

  <div className="vertical-line"></div>
  <Form.Select
    size="sm"
    value={forma}
    onChange={(e) => setforma(e.target.value)}
 className="filt-sel"
  >
    <option style={{ overflow: 'hidden' }} value="">
      File Format
    </option>
    <option value="">none</option>
    {file_format.map((form, index) => (
      <option key={index} value={form}>
        {form}
      </option>
    ))}
  </Form.Select>

  <div className="vertical-line"></div>
  <Form.Select
    size="sm"
    value={date}
    onChange={(e) => setdate(e.target.value)}
     className="filt-sel"
  >
    <option value="">Date Range</option>
    <option value="">none</option>
    <option value="today">Today</option>
    <option value="last_week">Last Week</option>
    <option value="last_month">Last Month</option>
  </Form.Select>

  <div className="vertical-line"></div>
  <Form.Select
    size="sm"
    value={datasrc}
    onChange={(e) => setdatasrc(e.target.value)}
     className="filt-sel"
  >
    <option value="">Data Source</option>
    <option value="">none</option>
    {source.map((src, index) => (
      <option key={index} value={src}>
        {src}
      </option>
    ))}
  </Form.Select>

  <button
    className="btn"
    onClick={() => setshfav(!shfav)}
    style={{
      fontSize: '2rem', 
      color: '#FF8F43',
      border: 'none',
      marginLeft: '30%', 
    }}
  >
    {shfav ? '♥' : '♡'}
  </button>
</div>

        </header>

        {/* Results */}
        
        <div className="grid">
       <section className="results-info grid-row">
          <p className={`${darkMode? "text-light":"text-dark"}`}>{filt_articals.length} results {keyword && `for "${keyword}"`}</p>
          <Form.Select
          size="sm"
          style={{width: '120px',
            background: 'transparent',
            border: 'none',
            fontWeight: '500',
            color: '#343a40',
            cursor: 'pointer',
            outline: 'none',
            appearance: 'none',  }}
          value="sort"
          onChange={(e)=>setsort(e.target.value)}>
             <option value="">⇅  Sort By</option>
    <option value="date_desc">Newest First</option>
    <option value="date_asc">Oldest First</option>
    <option value="title_asc">Title A-Z</option>
    <option value="title_desc">Title Z-A</option>
          </Form.Select>
          
        </section>
       
        </div>
        

        <main className="results-grid">
        {currentcrds.map((article, index) => (
            <div className="result-card" key={index}>
              <div className="card-top">
                <img src={file_lg(article.format)} alt="File Type" className="file-icon" />
                <h3 className="title">{article.title}</h3>
               <div>
               <button className="fvr"  onClick={() => handlefav(article.file_id)} >
               {article.isFavorite ? '♥' : '♡'}
                </button>
                </div> 
              </div>
              <div className="card-insights">
                <div className="card-meta">
                  <p>{article.date} | {article.author}</p>
                  <div className="crd-dis-div">
  <p
    className={`card-description ${exp ? "expanded" : ""}`}
    ref={descRef}
    style={{
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: exp ? 'unset' : 3,
      overflow: exp ? 'hidden' : 'hidden',
    }}
  >
    {article.description}
  </p>

  {article.description.length > 150 && (  
    <button
      className="read-more-btn"
      onClick={() => setexp((prev) => !prev)}
    >
      {exp ? "Read Less" : "Read More"}
    </button>
  )}
</div>

                </div>
                <div className="card-tags">
                  <span className="file-format" style={{ backgroundColor: color(article.format), color: "white" }}>
                    {article.format}
                  </span>
                  <span className="read-time">{article.readTime}</span>
                </div>
              </div>
              <div className=" flex w-full flex-row">
              <button className=" btn download-button">Download</button>
              <IconButton
  aria-label="more"
  aria-controls={`menu-${index}`}
  aria-haspopup="true"
  onClick={(event) => setmenuopt({ anchor: event.currentTarget, index })}
  style={{marginLeft:'5%',backgroundColor:'#4545451A',marginTop:'7%'}}
>
  <MoreVertIcon />
</IconButton>
<Menu
  id={`menu-${index}`}
  anchorEl={menuopt?.index === index ? menuopt.anchor : null}
  keepMounted
  open={Boolean(menuopt && menuopt.index === index)}
  onClose={handleClose}
  style={{border:'none'}}
>
  {options.map((option) => (
    <MenuItem key={option} onClick={() => handleClick(option)}>
      {option}
    </MenuItem>
  ))}
</Menu>
              </div>
             
            </div>
          ))}
        </main>
        <Stack spacing={2} className="d-flex justify-content-center my-4 ml">
  <Pagination
    count={pages.length}
    page={page}
    onChange={(event, value) => setpage(value)}
    variant="outlined"
    color="primary"
    className="pag"
    sx={{
      '& .MuiPaginationItem-root': {
        color: 'black',
      border:  '#ff5722 ' ,// For outlined variant
      },
      '& .Mui-selected': {
        backgroundColor: '#ff5722',
        color: '#fff',
      },
    }}
  />
</Stack>

      </div>
    </div>
  );
}
