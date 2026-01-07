import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../ThemeProvider";
import logo from "../../assets/logo.png";
import { Search, Sun, Moon, Heart, ShoppingCart, Menu, X, User, ChevronDown } from "lucide-react";
import CartSidebar from "./CartSidebar";
import LogOut from "../LogOut";
import { useAuth } from "../AuthContext";

const Nav = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [openProductCategory, setOpenProductCategory] = useState(null);
  const dropdownTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  // const [user, setUser] = useState(null);


  // Search typing effect
  const itemTexts = useMemo(() => ["hoddies..", "pullovers..", "t-shirts.."], []);
  const typingSpeed = 100,
    deletingSpeed = 60,
    delayAfterDeleting = 500,
    delayBeforeFirstDelete = 2000,
    delayAfterWordTyped = 2400;
  const currentTextRef = useRef("");
  const isDeletingRef = useRef(false);
  const currentItemIndexRef = useRef(0);
  const [placeholder, setPlaceholder] = useState("Search for hoddies...");

  const type = useCallback(() => {
    const currentItem = itemTexts[currentItemIndexRef.current];
    const currentTextLength = currentTextRef.current.length;

    if (isDeletingRef.current) {
      currentTextRef.current = currentTextRef.current.slice(0, currentTextLength - 1);
      setPlaceholder(`Search for ${currentTextRef.current}`);
      if (currentTextRef.current.length === 0) {
        isDeletingRef.current = false;
        currentItemIndexRef.current = (currentItemIndexRef.current + 1) % itemTexts.length;
        setTimeout(type, delayAfterDeleting);
      } else {
        setTimeout(type, deletingSpeed);
      }
    } else {
      currentTextRef.current = currentItem.slice(0, currentTextLength + 1);
      setPlaceholder(`Search for ${currentTextRef.current}`);
      if (currentTextRef.current.length === currentItem.length) {
        isDeletingRef.current = true;
        setTimeout(type, delayAfterWordTyped);
      } else {
        setTimeout(type, typingSpeed);
      }
    }
  }, [itemTexts]);

  useEffect(() => {
    const timeoutId = setTimeout(type, delayBeforeFirstDelete);
    return () => clearTimeout(timeoutId);
  }, [type]);

  // Fetch data with error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesRes, productCategoriesRes, productsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/categories"),
          axios.get("http://localhost:8000/api/product-categories"),
          axios.get("http://localhost:8000/api/products")
        ]);

        setCategories(categoriesRes.data || []);
        setProductCategories(productCategoriesRes.data || []);
        setProducts(productsRes.data || []);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isDesktopSearch = desktopSearchRef.current?.contains(e.target);
      const isMobileSearch = mobileSearchRef.current?.contains(e.target);

      if (!isDesktopSearch && !isMobileSearch) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get search suggestions - ONLY PRODUCT TITLES
  const getSearchSuggestions = useCallback((term) => {
    if (!term.trim() || !products.length) return [];

    const termLower = term.toLowerCase();
    const suggestions = [];

    // Only add product names - using product_title from API
    products.forEach(product => {
      if (product && product.product_title &&
        product.product_title.toLowerCase().includes(termLower)) {
        suggestions.push({
          type: 'product',
          id: product.product_id,
          name: product.product_title
        });
      }
    });

    // Remove duplicates and limit to 10
    return suggestions.slice(0, 10);
  }, [products]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Show suggestions after 1+ characters
    if (value.length >= 1) {
      setSearchSuggestions(getSearchSuggestions(value));
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      navigate(`/search-page?q=${encodeURIComponent(trimmedTerm)}`);
      setSearchTerm("");
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setMobileMenuOpen(false);
    }
  };

  // Handle suggestion click - ONLY SETS SEARCH TEXT
  const handleSuggestionClick = (suggestion) => {
    if (!suggestion) return;

    // Set the suggestion name in the search input
    setSearchTerm(suggestion.name);

    // Close suggestions
    setShowSuggestions(false);
  };

  // Filtered data - updated to use product_id
  const filteredProductCategories = openCategory
    ? productCategories.filter((pc) =>
      products.some(p => p && pc && p.p_cat_id === pc.p_cat_id && p.cat_id === openCategory.cat_id)
    )
    : [];

  const filteredProducts = openProductCategory && openCategory
    ? [...new Map(
      products
        .filter(
          (p) =>
            p &&
            p.p_cat_id === openProductCategory.p_cat_id &&
            // Add this line to filter by main category
            p.cat_id === openCategory.cat_id
        )
        .map(p => [p.product_id, p])
    ).values()]
    : [];


  const handleCategoryMouseEnter = (category) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenCategory(category);
    setOpenProductCategory(null);
  };

  const handleCategoryMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenCategory(null);
      setOpenProductCategory(null);
    }, 200);
  };

  const handleProductCategoryMouseEnter = (pCat) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenProductCategory(pCat);
  };

  const handleProductCategoryMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenProductCategory(null);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#171e28] shadow-sm">
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Top Bar */}
      <nav className="hidden sm:flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-black text-black dark:text-white text-sm">
        <div className="ml-auto flex space-x-6 mr-4">
          <a href="#about" className="hover:underline">About</a>
          <a href="#help" className="hover:underline">Help</a>

          {!user ? (
            <Link to="/login" className="hover:underline">Sign In</Link>
          ) : (
            <div className="relative">
              <button
                className="flex items-center hover:underline font-bold"
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              >
                <User size={16} className="mr-1" />
                {user.first_name} {user.last_name}
                <ChevronDown size={16} className="ml-1" />
              </button>
              {isAccountDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1a202c] shadow-lg rounded-lg p-4 z-50"
                  onMouseLeave={() => setIsAccountDropdownOpen(false)}
                >
                  <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-2">
                    {user?.first_name} {user?.last_name}
                  </h3>

                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <input
                        type="button"
                        readOnly
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <Link
                        to="/my-account"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-indigo-400 cursor-pointer"
                      >
                        Manage My Account
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <input
                        type="button"
                        readOnly
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <Link
                        to="/my-orders"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-indigo-400 cursor-pointer"
                      >
                        My Orders
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <input
                        type="button"
                        readOnly
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <Link
                        to="/my-wishlist"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-indigo-400 cursor-pointer"
                      >
                        My Wishlist
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <input
                        type="button"
                        readOnly
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <Link
                        to="/my-reviews"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-indigo-400 cursor-pointer"
                      >
                        My Reviews
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <input
                        type="button"
                        readOnly
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <Link
                        to="/my-returns"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-indigo-400 cursor-pointer"
                      >
                        My Returns & Cancellations
                      </Link>
                    </li>

                    <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <LogOut />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="flex justify-between items-center px-4 py-3 sm:py-4">
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-black dark:text-white" /> : <Menu className="w-6 h-6 text-black dark:text-white" />}
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0 ml-12 sm:ml-0" aria-label="Home">
          <img src={logo} alt="Logo" className="sm:w-12 sm:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-6 lg:space-x-8 items-center font-DM sans mx-4">

          {categories.map((cat) => (
            <div
              key={cat.cat_id}
              className="relative group"
              onMouseEnter={() => handleCategoryMouseEnter(cat)}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <button className="nav-link font-bold text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-300 cursor-pointer">
                {cat.cat_title}
              </button>

              {openCategory?.cat_id === cat.cat_id && filteredProductCategories.length > 0 && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-xl rounded-lg p-4 z-50 flex flex-col space-y-3">
                  {filteredProductCategories.map((pCat) => (
                    <div
                      key={pCat.p_cat_id}
                      onMouseEnter={() => handleProductCategoryMouseEnter(pCat)}
                      onMouseLeave={handleProductCategoryMouseLeave}
                      className="cursor-pointer"
                    >
                      <Link
                        to={`/search-page?main_category=${openCategory.cat_id}&category=${pCat.p_cat_id}`}
                        className="text-sm font-semibold mb-2 text-gray-700 dark:text-white hover:underline block"
                        onClick={() => setOpenCategory(null)}
                      >
                        {pCat.p_cat_title}
                      </Link>

                      {openProductCategory?.p_cat_id === pCat.p_cat_id && (
                        <ul className="text-xs space-y-1 max-h-48 overflow-y-auto">
                          {filteredProducts.map((prod) => (
                            <li key={prod.product_id}>
                              {/* <Link
          to={`/product/${prod.product_id}`}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          {prod.product_title}
        </Link> */}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

        </nav>

        {/* Search, Theme, Cart Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
          {/* Desktop Search with Suggestions */}
          <div className="hidden sm:block relative w-64 lg:w-72" ref={desktopSearchRef}>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => searchTerm.length >= 1 && setShowSuggestions(true)}
                placeholder={placeholder}
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 dark:placeholder-gray-400"
                aria-label="Search products"
              />
              <Search
                onClick={() => {
                  const trimmedTerm = searchTerm.trim();
                  if (trimmedTerm) {
                    navigate(`/search-page?q=${encodeURIComponent(trimmedTerm)}`);
                    setSearchTerm("");
                    setShowSuggestions(false);
                  }
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-400 cursor-pointer"
                aria-label="Search icon"
              />
            </form>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                {searchSuggestions.length > 0 ? (
                  searchSuggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.type}-${suggestion.id}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                    >
                      <Search className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {suggestion.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
                    No matching products found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              document.documentElement.classList.toggle("dark");
            }}
            className="icon-button"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Wishlist */}
          <Link to="/my-wishlist" className="icon-button text-black dark:text-white hover:text-gray-400" aria-label="Wishlist">
            <Heart className="w-5 h-5" />
          </Link>

          {/* Cart */}
          <Link to="/cart"
            className="icon-button relative text-black dark:text-white hover:text-gray-400"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar with Suggestions */}
      <div className="sm:hidden px-4 py-2 border-t border-gray-200 dark:border-gray-700" ref={mobileSearchRef}>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.length >= 1 && setShowSuggestions(true)}
              placeholder={placeholder}
              className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 dark:placeholder-gray-400"
              aria-label="Search products"
            />
            <Search
              onClick={() => {
                const trimmedTerm = searchTerm.trim();
                if (trimmedTerm) {
                  navigate(`/search-page?q=${encodeURIComponent(trimmedTerm)}`);
                  setSearchTerm("");
                  setShowSuggestions(false);
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-400 cursor-pointer"
              aria-label="Search icon"
            />
          </div>
        </form>

        {/* Mobile Search Suggestions */}
        {showSuggestions && (
          <div className="absolute z-50 w-[calc(100%-2rem)] left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1">
            {searchSuggestions.length > 0 ? (
              searchSuggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.type}-${suggestion.id}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                >
                  <Search className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {suggestion.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 dark:text-gray-400">
                No matching products found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="sm:hidden bg-white dark:bg-[#171e28] px-4 pb-6">
          <ul className="space-y-4 font-DM sans pt-2">

            {/* Categories with collapsible submenus */}
            {categories.map((cat) => (
              <li key={cat.cat_id}>
                <button
                  onClick={() =>
                    setOpenCategory(openCategory?.cat_id === cat.cat_id ? null : cat)
                  }
                  className="w-full text-left font-semibold flex justify-between items-center py-2"
                >
                  {cat.cat_title}
                  <span>{openCategory?.cat_id === cat.cat_id ? "▲" : "▼"}</span>
                </button>
                {openCategory?.cat_id === cat.cat_id && (
                  <ul className="pl-4 mt-2 space-y-3 border-l border-gray-200 dark:border-gray-700">
                    {productCategories
                      .filter((pc) =>
                        products.some(
                          (p) => p && pc && p.p_cat_id === pc.p_cat_id && p.cat_id === cat.cat_id
                        )
                      )
                      .map((pCat) => (
                        <li key={pCat.p_cat_id} className="py-1">
                          <Link
                            to={`/search-page?main_category=${cat.cat_id}&category=${pCat.p_cat_id}`}
                            className="font-semibold block text-gray-700 dark:text-gray-300"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {pCat.p_cat_title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}

            <li>
              <Link
                to="/collections"
                className="block py-2 font-semibold text-gray-900 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                to="/sale"
                className="block py-2 font-semibold text-gray-900 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sale
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Nav;