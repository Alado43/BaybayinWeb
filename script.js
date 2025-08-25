const { useState, useEffect, useRef } = React;

// Mock database for Baybayin characters
const baybayinData = {
  characters: [
    { id: 1, char: "ᜀ", latin: "A", example: "Aso (dog)", description: "The vowel 'A' in Baybayin" },
    { id: 2, char: "ᜁ", latin: "I/E", example: "Isda (fish)", description: "The vowel 'I' or 'E' in Baybayin" },
    { id: 3, char: "ᜂ", latin: "U/O", example: "Ulo (head)", description: "The vowel 'U' or 'O' in Baybayin" },
    { id: 4, char: "ᜃ", latin: "Ka", example: "Kama (bed)", description: "The consonant 'Ka' in Baybayin" },
    { id: 5, char: "ᜄ", latin: "Ga", example: "Gabi (night)", description: "The consonant 'Ga' in Baybayin" },
    { id: 6, char: "ᜅ", latin: "Nga", example: "Ngiti (smile)", description: "The consonant 'Nga' in Baybayin" },
    { id: 7, char: "ᜆ", latin: "Ta", example: "Tao (person)", description: "The consonant 'Ta' in Baybayin" },
    { id: 8, char: "ᜇ", latin: "Da", example: "Daan (road)", description: "The consonant 'Da' in Baybayin" },
    { id: 9, char: "ᜈ", latin: "Na", example: "Niyog (coconut)", description: "The consonant 'Na' in Baybayin" },
    { id: 10, char: "ᜉ", latin: "Pa", example: "Puso (heart)", description: "The consonant 'Pa' in Baybayin" },
    { id: 11, char: "ᜊ", latin: "Ba", example: "Bahay (house)", description: "The consonant 'Ba' in Baybayin" },
    { id: 12, char: "ᜋ", latin: "Ma", example: "Mata (eye)", description: "The consonant 'Ma' in Baybayin" },
    { id: 13, char: "ᜌ", latin: "Ya", example: "Yaman (wealth)", description: "The consonant 'Ya' in Baybayin" },
    { id: 14, char: "ᜎ", latin: "La", example: "Lupa (earth)", description: "The consonant 'La' in Baybayin" },
    { id: 15, char: "ᜏ", latin: "Wa", example: "Walis (broom)", description: "The consonant 'Wa' in Baybayin" },
    { id: 16, char: "ᜐ", latin: "Sa", example: "Saya (happiness)", description: "The consonant 'Sa' in Baybayin" },
    { id: 17, char: "ᜑ", latin: "Ha", example: "Halaman (plant)", description: "The consonant 'Ha' in Baybayin" },
  ],
  resources: [
    { id: 1, title: "Baybayin Font Collection", url: "#fonts", type: "fonts", description: "Download free Baybayin fonts for your computer" },
    { id: 2, title: "Baybayin Translator", url: "#translator", type: "app", description: "Translate Tagalog words to Baybayin characters" },
    { id: 3, title: "Baybayin History Documentary", url: "#documentaries", type: "video", description: "Documentary about the history of Baybayin" },
    { id: 4, title: "Baybayin Workshop", url: "#workshops", type: "event", description: "Online workshop for beginners" },
    { id: 5, title: "Baybayin Merchandise", url: "#merchandise", type: "shop", description: "T-shirts, stickers, and more with Baybayin designs" },
  ],
  news: [
    { id: 1, title: "New Bill Proposes Baybayin in Government Documents", date: "2023-02-13", summary: "A new bill in the Philippine Congress seeks to require the use of Baybayin in all government communications.", url: "https://legacy.senate.gov.ph/lis/bill_res.aspx?congress=19&q=SBN-1866" },
    { id: 2, title: "University Adds Baybayin to Curriculum", date: "2019-10-21", summary: "A leading Philippine university has announced it will include Baybayin studies in its Filipino language courses.", url: "https://upd.edu.ph/ibf-on-baybayin/" },
    { id: 3, title: "Baybayin Art Exhibit Opens in Manila", date: "2018-08-15", summary: "Contemporary artists showcase modern interpretations of Baybayin in a month-long exhibition.", url: "https://www.gmanetwork.com/news/lifestyle/content/664207/until-august-31-an-exhibit-on-baybayin-art-at-the-ncca-gallery/story/" },
  ],
  merchandise: [
    { id: 1, title: "Modernong Kultura Customizeable Logos", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80", description: "Modern Baybayin logo design", price: "Php250" },
    { id: 2, title: "Modernong Kultura Customizeable Signage", image: "https://images.unsplash.com/photo-1580983218765-f663bec07b37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1002&q=80", description: "Traditional Baybayin signage design", price: "Php200" },
    { id: 3, title: "Modernong Kultura Customizeable Tattoo", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&w=1064&q=80", description: "Baybayin-inspired tattoo designs", price: "Php300" },
    { id: 4, title: "Modernong Kultura Customizeable T-shirt", image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&w=1064&q=80", description: "Modern Baybayin t-shirt design", price: "Php199" },
  ],
  fonts: [
    { id: 1, name: "Baybayin Rounded", download: "https://www.fontspace.com/baybayin-rounded-font-f30348", description: "Modern Baybayin font with clean lines" },
    { id: 2, name: "Hiraya Baybayin", download: "https://www.fontspace.com/hiraya-baybayin-font-f99814", description: "Traditional style Baybayin font" },
    { id: 3, name: "Takimsilim Baybayin", download: "https://www.fontspace.com/takipsilim-baybayin-font-f99809", description: "Classic Baybayin font with historical accuracy" }
  ],
   documentaries: [
    { id: 1, title: "The History of Baybayin", videoId: "smvZZf1QEJA", description: "A comprehensive documentary about the origins and history of Baybayin" },
    { id: 2, title: "Baybayin: The Ancient Script", videoId: "dkh1oKaAqnU", description: "Exploring the cultural significance of Baybayin in Filipino heritage" },
    { id: 3, title: "Reviving Baybayin", videoId: "gObjQEWtmls", description: "How modern Filipinos are bringing back the ancient script" }
  ],
  workshops: [
    { id: 1, title: "Beginner's Baybayin Workshop", url: "https://docs.google.com/forms/d/e/1FAIpQLSehijyxuWcGSmpaVHODr2PYguZOKl35B4204DY4JPLO83wEJA/viewform?usp=dialog", description: "Learn the basics of reading and writing Baybayin", date: "Every Saturday, 2:00 PM" },
    { id: 2, title: "Baybayin Calligraphy Class", url: "#", description: "Master the art of beautiful Baybayin writing", date: "Every Sunday, 10:00 AM" },
    { id: 3, title: "Baybayin for Modern Design", url: "#", description: "Incorporating Baybayin into contemporary design work", date: "Every Friday, 6:00 PM" }
  ]
};

// Baybayin translation mapping
const baybayinMap = {
  'a': 'ᜀ', 'b': 'ᜊ', 'k': 'ᜃ', 'd': 'ᜇ', 'e': 'ᜁ', 'g': 'ᜄ', 'h': 'ᜑ', 'i': 'ᜁ',
  'l': 'ᜎ', 'm': 'ᜋ', 'n': 'ᜈ', 'ng': 'ᜅ', 'o': 'ᜂ', 'p': 'ᜉ', 'r': 'ᜇ', 's': 'ᜐ',
  't': 'ᜆ', 'u': 'ᜂ', 'w': 'ᜏ', 'y': 'ᜌ', ' ': ' '
};

// Mock API functions
const api = {
  getCharacters: () => Promise.resolve({ data: baybayinData.characters }),
  getResources: () => Promise.resolve({ data: baybayinData.resources }),
  getNews: () => Promise.resolve({ data: baybayinData.news }),
  getMerchandise: () => Promise.resolve({ data: baybayinData.merchandise }),
  submitContactForm: (data) => Promise.resolve({ data: { success: true, message: "Thank you for your message!" } }),
  submitResource: (data) => Promise.resolve({ data: { success: true, message: "Thank you for your resource submission!" } }),
  subscribeNewsletter: (email) => Promise.resolve({ data: { success: true, message: "Thank you for subscribing!" } })
};

// Slideshow Component
function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, image: "bg1.jpg" },
    { id: 2, image: "bg2.jpg" },
    { id: 3, image: "bg3.jpg" },
    { id: 3, image: "bg4.jpg" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        ></div>
      ))}
    </div>
  );
}

// Components
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-scroll text-2xl text-purple-600"></i>
            <span className="text-xl font-bold title-font modern-gradient-text">Modernong<span className="text-pink-500">Kultura</span></span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-purple-600 transition font-medium text-gray-800 hover:scale-105">Home</a>
            <a href="#learn" className="hover:text-purple-600 transition font-medium text-gray-800 hover:scale-105">Learn</a>
            <a href="#resources" className="hover:text-purple-600 transition font-medium text-gray-800 hover:scale-105">Resources</a>
            <a href="#merchandise" className="hover:text-purple-600 transition font-medium text-gray-800 hover:scale-105">Merchandise</a>
            <a href="#news" className="hover:text-purple-600 transition font-medium text-gray-800 hover:scale-105">News</a>
            <a href="#contact" className="hover:text-purple-600 transition font-medium text-gray-800 hover:scale-105">Contact</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-3 space-y-4 bg-white rounded-lg shadow-lg p-4">
            <a href="#home" className="block hover:text-purple-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#learn" className="block hover:text-purple-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>Learn</a>
            <a href="#resources" className="block hover:text-purple-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>Resources</a>
            <a href="#merchandise" className="block hover:text-purple-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>Merchandise</a>
            <a href="#news" className="block hover:text-purple-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>News</a>
            <a href="#contact" className="block hover:text-purple-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 md:py-40 relative overflow-hidden">
      {/* Background Slideshow */}
      <Slideshow />
      
      {/* Overlay to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-amber-700/20 z-1"></div>
      
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10 hero-content">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <i className="fas fa-sparkle mr-2"></i> Preserving Filipino Heritage
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Reviving the <span className="text-pink-300 squiggly-underline">Ancient Filipino Script</span>
          </h1>
          <p className="text-lg text-white mb-8">
            Baybayin is the pre-colonial writing system of the Philippines. Join us in preserving and promoting this important part of Filipino heritage.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#learn" className="modern-gradient-bg hover:bg-purple-600 text-white px-6 py-3 rounded-full font-medium transition shadow-lg hover:shadow-xl flex items-center">
              <i className="fas fa-book-open mr-2"></i> Start Learning
            </a>
            <a href="#resources" className="border-2 border-pink-300 text-pink-300 hover:bg-pink-300/10 px-6 py-3 rounded-full font-medium transition flex items-center">
              <i className="fas fa-compass mr-2"></i> Explore Resources
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="bg-white/90 p-8 rounded-2xl shadow-2xl floating transform rotate-3 glow-effect">
              <div className="baybayin-font text-center text-6xl mb-2 text-purple-800">ᜊᜌ᜔ᜊᜌᜒᜈ᜔</div>
              <p className="text-center text-gray-600 font-medium">"Baybayin" in Baybayin script</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-pink-200 text-pink-900 px-4 py-2 rounded-full shadow-lg floating" style={{ animationDelay: '2s' }}>
              <i className="fas fa-history mr-2"></i> Ancient Filipino Script
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-down">
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What is <span className="modern-gradient-text">Baybayin</span>?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the beauty and history of our ancient writing system.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition card-hover">
            <div className="text-purple-600 text-4xl mb-4">
              <i className="fas fa-history"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Historical Significance</h3>
            <p className="text-gray-700">
              Baybayin was used as far back as the 16th century and was the primary writing system before Spanish colonization. It represents an important part of pre-colonial Filipino identity.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition card-hover">
            <div className="text-purple-600 text-4xl mb-4">
              <i className="fas fa-language"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Writing System</h3>
            <p className="text-gray-700">
              Baybayin is an alphasyllabary where each character represents a consonant-vowel combination. It was traditionally written on bamboo or palm leaves using knives or styli.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition card-hover">
            <div className="text-purple-600 text-4xl mb-4">
              <i className="fas fa-heart"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Modern Revival</h3>
            <p className="text-gray-700">
              Today, there's a growing movement to revive Baybayin through education, digital technology, and art. It's seen as a way to reconnect with Filipino roots and cultural identity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PracticeWriting({ character }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#92400e');
  const [brushSize, setBrushSize] = useState(5);
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showGuide && character) {
      // Draw guide character
      ctx.font = '150px Noto Sans Tagalog';
      ctx.fillStyle = 'rgba(146, 64, 14, 0.1)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(character.char, canvas.width / 2, canvas.height / 2);
    }
  }, [character, showGuide]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showGuide && character) {
      // Redraw guide character
      ctx.font = '150px Noto Sans Tagalog';
      ctx.fillStyle = 'rgba(146, 64, 14, 0.1)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(character.char, canvas.width / 2, canvas.height / 2);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Practice Writing <span className="baybayin-font text-2xl">{character.char}</span></h3>

      <div className="practice-controls flex flex-wrap gap-4">
        <div className="flex items-center bg-purple-100 px-3 py-2 rounded-lg">
          <label htmlFor="color" className="mr-2 text-sm font-medium text-purple-900">Color:</label>
          <input 
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 cursor-pointer rounded-full border-2 border-purple-300"
          />
        </div>

        <div className="flex items-center bg-purple-100 px-3 py-2 rounded-lg">
          <label htmlFor="brushSize" className="mr-2 text-sm font-medium text-purple-900">Size:</label>
          <input 
            type="range"
            id="brushSize"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(e.target.value)}
            className="w-24 accent-purple-600"
          />
        </div>

        <button
          onClick={() => setShowGuide(!showGuide)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${showGuide ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          {showGuide ? 'Hide Guide' : 'Show Guide'}
        </button>

        <button
          onClick={clearCanvas}
          className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300"
        >
          <i className="fas fa-eraser mr-1"></i> Clear
        </button>
      </div>

      <div className="canvas-container bg-white rounded-xl shadow-md mt-4">
        <canvas
          id="drawing-canvas"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={(e) => {
            e.preventDefault();
            startDrawing(e.touches[0]);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            draw(e.touches[0]);
          }}
          onTouchEnd={stopDrawing}
        ></canvas>
      </div>

      <p className="text-sm text-gray-600 mt-2">
        <i className="fas fa-lightbulb text-purple-500 mr-1"></i> Tip: Try to trace the faint character guide. Turn it off when you're ready to practice on your own.
      </p>
    </div>
  );
}

function LearnBaybayin() {
  const [characters, setCharacters] = useState([]);
  const [selectedChar, setSelectedChar] = useState(null);
  const [showPractice, setShowPractice] = useState(false);

  useEffect(() => {
    api.getCharacters().then(response => {
      setCharacters(response.data);
      setSelectedChar(response.data[0]);
    });
  }, []);

  return (
    <section id="learn" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn <span className="modern-gradient-text">Baybayin</span> Characters</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the basic characters of the Baybayin script. Click on any character to learn more about it.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {characters.map(char => (
            <button
              key={char.id}
              onClick={() => {
                setSelectedChar(char);
                setShowPractice(false);
              }}
              className={`p-4 rounded-xl text-center transition-all ${selectedChar?.id === char.id ? 'modern-gradient-bg text-white shadow-lg scale-105' : 'bg-white hover:bg-purple-100 shadow-md hover:scale-105'}`}
            >
              <div className="baybayin-font text-5xl mb-1">{char.char}</div>
              <div className="text-sm font-medium">{char.latin}</div>
            </button>
          ))}
        </div>

        {selectedChar && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto card-hover">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-b from-purple-100 to-purple-200 flex items-center justify-center p-8">
                <div className="baybayin-font text-9xl text-purple-800">{selectedChar.char}</div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedChar.latin} - {selectedChar.char}</h3>
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                    <i className="fas fa-lightbulb mr-1"></i> Example
                  </span>
                  <span className="text-gray-700">{selectedChar.example}</span>
                </div>
                <p className="text-gray-700 mb-6">{selectedChar.description}</p>
                <button
                  onClick={() => setShowPractice(!showPractice)}
                  className="modern-gradient-bg hover:bg-purple-600 text-white px-6 py-2 rounded-full font-medium transition flex items-center"
                >
                  <i className={`fas ${showPractice ? 'fa-eye-slash' : 'fa-pencil-alt'} mr-2`}></i>
                  {showPractice ? 'Hide Practice' : 'Practice Writing'}
                </button>
              </div>
            </div>

            {showPractice && (
              <div className="p-8 border-t border-gray-200">
                <PracticeWriting character={selectedChar} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function BaybayinTranslator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const translateToBaybayin = (text) => {
    // Simple translation - in a real app, you'd need a more complex algorithm
    let result = '';
    text = text.toLowerCase();
    
    for (let i = 0; i < text.length; i++) {
      // Handle 'ng' combination
      if (i < text.length - 1 && text[i] === 'n' && text[i+1] === 'g') {
        result += baybayinMap['ng'] || '?';
        i++; // Skip the next character
      } else {
        result += baybayinMap[text[i]] || text[i];
      }
    }
    
    return result;
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setTranslatedText(translateToBaybayin(text));
  };

  return (
    <section id="translator" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Baybayin <span className="modern-gradient-text">Translator</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert Tagalog words to Baybayin characters. This tool helps you see how modern words would be written in the ancient script.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-2xl mx-auto translator-container">
          <div className="mb-6">
            <label htmlFor="tagalog-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Tagalog Text:
            </label>
            <textarea
              id="tagalog-input"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows="3"
              placeholder="Type Tagalog words here..."
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Baybayin Translation:</h3>
            <div className="translation-result baybayin-font">
              {translatedText || 'Translation will appear here...'}
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-2">
              <i className="fas fa-lightbulb text-amber-600 mr-2"></i> Translation Notes
            </h4>
            <p className="text-sm text-amber-700">
              This is a basic translator. For more accurate translations, consider that Baybayin is an abugida where each character represents a consonant-vowel combination. The translator handles common sounds but may not capture all nuances.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FontCollection() {
  return (
    <section id="fonts" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Baybayin <span className="modern-gradient-text">Font Collection</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download these free Baybayin fonts to use on your computer for design projects or personal use.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {baybayinData.fonts.map(font => (
            <div key={font.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition card-hover">
              <div className="p-6">
                <div className="modern-gradient-bg text-white p-3 rounded-full inline-block mb-4">
                  <i className="fas fa-font text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{font.name}</h3>
                <p className="text-gray-700 mb-4">{font.description}</p>
                <a 
                  href={font.download} 
                  className="modern-gradient-bg hover:bg-purple-600 text-white px-4 py-2 rounded-full font-medium transition inline-flex items-center"
                  download
                >
                  <i className="fas fa-download mr-2"></i> Download Font
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Documentaries() {
  return (
    <section id="documentaries" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Baybayin <span className="modern-gradient-text">Documentaries</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch these informative documentaries to learn about the history and cultural significance of Baybayin.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="video-gallery">
          {baybayinData.documentaries.map(doc => (
            <div key={doc.id} className="video-item">
              <div className="bg-black aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${doc.videoId}`}
                  title={doc.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-2">{doc.title}</h3>
                <p className="text-gray-700 text-sm">{doc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workshops() {
  return (
    <section id="workshops" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Baybayin <span className="modern-gradient-text">Workshops</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our online workshops to learn Baybayin from experts and connect with other enthusiasts.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="workshop-gallery">
          {baybayinData.workshops.map(workshop => (
            <div key={workshop.id} className="workshop-item">
              <div className="p-6">
                <div className="modern-gradient-bg text-white p-3 rounded-full inline-block mb-4">
                  <i className="fas fa-chalkboard-teacher text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{workshop.title}</h3>
                <p className="text-gray-700 mb-4">{workshop.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <i className="fas fa-clock mr-2"></i> {workshop.date}
                </div>
                <a 
                  href={workshop.url} 
                  className="modern-gradient-bg hover:bg-purple-600 text-white px-4 py-2 rounded-full font-medium transition inline-flex items-center"
                >
                  <i className="fas fa-calendar-check mr-2"></i> Register Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resourceName: '',
    resourceUrl: '',
    description: '',
    type: 'other'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.submitResource(formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting resource:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Thank you!</strong>
        <span className="block sm:inline"> Your resource has been submitted successfully.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white bg-opacity-90"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white bg-opacity-90"
        />
      </div>

      <div>
        <label htmlFor="resourceName" className="block text-sm font-medium text-white mb-1">Resource Name</label>
        <input
          type="text"
          id="resourceName"
          name="resourceName"
          value={formData.resourceName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white bg-opacity-90"
        />
      </div>

      <div>
        <label htmlFor="resourceUrl" className="block text-sm font-medium text-white mb-1">Resource URL</label>
        <input
          type="url"
          id="resourceUrl"
          name="resourceUrl"
          value={formData.resourceUrl}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white bg-opacity-90"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-white mb-1">Resource Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white bg-opacity-90"
        >
          <option value="fonts">Font</option>
          <option value="app">App</option>
          <option value="video">Video</option>
          <option value="event">Event</option>
          <option value="shop">Merchandise</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white bg-opacity-90"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-white hover:bg-gray-100 text-purple-700 px-6 py-3 rounded-full font-medium transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
        {isLoading ? 'Submitting...' : 'Submit Resource'}
      </button>
    </form>
  );
}

function MerchandiseGallery() {
  const [merchandise, setMerchandise] = useState([]);

  useEffect(() => {
    api.getMerchandise().then(response => {
      setMerchandise(response.data);
    });
  }, []);

  return (
    <section id="merchandise" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Baybayin <span className="modern-gradient-text">Merchandise</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Show your support for Baybayin with these beautifully designed products.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="merchandise-gallery">
          {merchandise.map(item => (
            <div key={item.id} className="merchandise-item">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="merchandise-image"
                />
                <div className="sticker top-4 right-4 bg-purple-600 text-white">
                  <i className="fas fa-tag mr-1"></i> {item.price}
                </div>
              </div>
              <div className="merchandise-info">
                <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                <p className="text-gray-700 mb-4 text-sm">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-bold">{item.price}</span>
                  <button className="modern-gradient-bg hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <i className="fas fa-cart-plus mr-2"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resources() {
  const [resources, setResources] = useState([]);
  const [showResourceForm, setShowResourceForm] = useState(false);

  useEffect(() => {
    api.getResources().then(response => {
      setResources(response.data);
    });
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'fonts': return 'fa-font';
      case 'app': return 'fa-mobile-screen';
      case 'video': return 'fa-video';
      case 'event': return 'fa-calendar-days';
      case 'shop': return 'fa-shirt';
      default: return 'fa-link';
    }
  };

  const handleResourceClick = (resource) => {
    // Scroll to the appropriate section based on resource type
    if (resource.type === 'fonts') {
      document.getElementById('fonts').scrollIntoView({ behavior: 'smooth' });
    } else if (resource.type === 'app') {
      document.getElementById('translator').scrollIntoView({ behavior: 'smooth' });
    } else if (resource.type === 'video') {
      document.getElementById('documentaries').scrollIntoView({ behavior: 'smooth' });
    } else if (resource.type === 'event') {
      document.getElementById('workshops').scrollIntoView({ behavior: 'smooth' });
    } else if (resource.type === 'shop') {
      document.getElementById('merchandise').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="resources" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Baybayin <span className="modern-gradient-text">Resources</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tools, apps, and materials to help you learn and use Baybayin in modern contexts.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(resource => (
            <div key={resource.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition card-hover bg-white">
              <div className="modern-gradient-bg p-4 flex items-center">
                <div className="bg-white text-purple-600 p-3 rounded-full mr-4">
                  <i className={`fas ${getIcon(resource.type)} text-xl`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{resource.title}</h3>
                  <p className="text-sm text-pink-100 capitalize">{resource.type}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{resource.description}</p>
                <button 
                  onClick={() => handleResourceClick(resource)}
                  className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center group"
                >
                  Learn more <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 modern-gradient-bg rounded-xl p-8 text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white bg-opacity-5 rounded-full"></div>
          
          <div className="md:flex items-center relative z-10">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Want to contribute?</h3>
              <p className="mb-4">We're always looking for more resources to help promote Baybayin. Share your project or resource with us!</p>
              <button
                onClick={() => setShowResourceForm(!showResourceForm)}
                className="bg-white text-purple-700 hover:bg-gray-100 px-6 py-2 rounded-full font-medium transition"
              >
                {showResourceForm ? <i className="fas fa-times mr-2"></i> : <i className="fas fa-plus mr-2"></i>}
                {showResourceForm ? 'Cancel' : 'Submit Resource'}
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <i className="fas fa-hands-helping text-6xl opacity-80 floating" style={{ animationDelay: '1s' }}></i>
            </div>
          </div>

          {showResourceForm && (
            <div className="mt-6 relative z-10">
              <ResourceForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    api.getNews().then(response => {
      setNews(response.data);
    });
  }, []);

  return (
    <section id="news" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Baybayin in the <span className="modern-gradient-text">News</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated on the latest developments in the Baybayin revival movement.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition card-hover">
              <div className="h-48 bg-gradient-to-r from-purple-100 to-pink-200 flex items-center justify-center relative">
                <i className="fas fa-newspaper text-6xl text-purple-600 opacity-30"></i>
                <div className="absolute top-4 left-4 bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-bold">
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.summary}</p>
                <a href={item.url} className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center group">
                  Read more <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-full font-medium transition flex items-center justify-center mx-auto">
            <i className="fas fa-newspaper mr-2"></i> View All News
          </button>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.submitContactForm(formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Thank you!</strong>
        <span className="block sm:inline"> Your message has been sent successfully.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full modern-gradient-bg hover:bg-purple-600 text-white px-6 py-3 rounded-full font-medium transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-paper-plane mr-2"></i>}
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.subscribeNewsletter(email);
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error("Error subscribing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
        Thank you for subscribing!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`modern-gradient-bg hover:bg-purple-600 text-white px-4 py-2 rounded-r-lg font-medium transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Subscribe'}
      </button>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get <span className="modern-gradient-text">Involved</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or want to collaborate? Reach out to us!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Contact Us</h3>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <ContactForm />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Connect With Us</h3>
            <div className="space-y-6">
              <div className="flex items-start bg-white p-6 rounded-xl shadow-md">
                <div className="modern-gradient-bg text-white p-3 rounded-full mr-4">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600">info@modernongkultura.org</p>
                </div>
              </div>

              <div className="flex items-start bg-white p-6 rounded-xl shadow-md">
                <div className="modern-gradient-bg text-white p-3 rounded-full mr-4">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <p className="text-gray-600">Modernong Kultura Center, Manila, Philippines</p>
                </div>
              </div>

              <div className="flex items-start bg-white p-6 rounded-xl shadow-md">
                <div className="modern-gradient-bg text-white p-3 rounded-full mr-4">
                  <i className="fas fa-hashtag"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Social Media</h4>
                  <div className="flex space-x-4 mt-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="modern-gradient-bg hover:bg-purple-600 text-white p-3 rounded-full transition social-icon">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="modern-gradient-bg hover:bg-purple-600 text-white p-3 rounded-full transition social-icon">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="modern-gradient-bg hover:bg-purple-600 text-white p-3 rounded-full transition social-icon">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="modern-gradient-bg hover:bg-purple-600 text-white p-3 rounded-full transition social-icon">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-semibold text-gray-900 mb-3">Join Our Newsletter</h4>
              <p className="text-gray-600 mb-4">Stay updated with Baybayin news, events, and learning resources.</p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-scroll text-2xl text-purple-200"></i>
              <span className="text-xl font-bold title-font">Modernong<span className="text-pink-200">Kultura</span></span>
            </div>
            <p className="text-purple-100">
              Dedicated to preserving and promoting the ancient Filipino script through education, technology, and cultural initiatives.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-200">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-pink-300 transition">Home</a></li>
              <li><a href="#learn" className="hover:text-pink-300 transition">Learn Baybayin</a></li>
              <li><a href="#resources" className="hover:text-pink-300 transition">Resources</a></li>
              <li><a href="#merchandise" className="hover:text-pink-300 transition">Merchandise</a></li>
              <li><a href="#news" className="hover:text-pink-300 transition">News</a></li>
              <li><a href="#contact" className="hover:text-pink-300 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-200">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#fonts" className="hover:text-pink-300 transition">Font Downloads</a></li>
              <li><a href="#translator" className="hover:text-pink-300 transition">Translator</a></li>
              <li><a href="#documentaries" className="hover:text-pink-300 transition">Documentaries</a></li>
              <li><a href="#workshops" className="hover:text-pink-300 transition">Workshops</a></li>
              <li><a href="#merchandise" className="hover:text-pink-300 transition">Merchandise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-200">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-purple-700 hover:bg-purple-600 text-white p-3 rounded-full transition social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-purple-700 hover:bg-purple-600 text-white p-3 rounded-full transition social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-purple-700 hover:bg-purple-600 text-white p-3 rounded-full transition social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-purple-700 hover:bg-purple-600 text-white p-3 rounded-full transition social-icon">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <p className="text-purple-100">
              info@modernongkultura.org<br />
              +63 912 345 6789
            </p>
          </div>
        </div>

        <div className="border-t border-purple-800 pt-8 text-center text-pink-200">
          <p>&copy; {new Date().getFullYear()} Modernong Kultura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />
      <Hero />
      <About />
      <LearnBaybayin />
      <Resources />
      <FontCollection />
      <BaybayinTranslator />
      <Documentaries />
      <Workshops />
      <MerchandiseGallery />
      <NewsSection />
      <Contact />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
