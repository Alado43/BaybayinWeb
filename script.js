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
    { id: 1, title: "Baybayin Font Collection", url: "#resources", type: "fonts", description: "Download free Baybayin fonts for your computer" },
    { id: 2, title: "Learn Baybayin App", url: "#resources", type: "app", description: "Interactive mobile app for learning Baybayin" },
    { id: 3, title: "Baybayin History Documentary", url: "#resources", type: "video", description: "Documentary about the history of Baybayin" },
    { id: 4, title: "Baybayin Workshop", url: "#resources", type: "event", description: "Online workshop for beginners" },
    { id: 5, title: "Baybayin Merchandise", url: "#merchandise", type: "shop", description: "T-shirts, stickers, and more with Baybayin designs" },
  ],
  news: [
    { id: 1, title: "New Bill Proposes Baybayin in Government Documents", date: "2023-05-15", summary: "A new bill in the Philippine Congress seeks to require the use of Baybayin in all government communications.", url: "#news" },
    { id: 2, title: "University Adds Baybayin to Curriculum", date: "2023-04-22", summary: "A leading Philippine university has announced it will include Baybayin studies in its Filipino language courses.", url: "#news" },
    { id: 3, title: "Baybayin Art Exhibit Opens in Manila", date: "2023-03-10", summary: "Contemporary artists showcase modern interpretations of Baybayin in a month-long exhibition.", url: "#news" },
  ],
  merchandise: [
    { id: 1, title: "Modernong Kultura Customizeable Logos", image: "Logos.jpg", description: "Modern Baybayin logo design", price: "Php250" },
    { id: 2, title: "Modernong Kultura Customizeable Signage", image: "Signage.jpg", description: "Traditional Baybayin signage design", price: "Php200" },
    { id: 3, title: "Modernong Kultura Customizeable Tattoo", image: "Tattoo.jpg", description: "Baybayin-inspired tattoo designs", price: "Php300" },
    { id: 4, title: "Modernong Kultura Customizeable T-shirt", image: "T-shirt.jpg", description: "Modern Baybayin t-shirt design", price: "Php199" },
  ]
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

// Components
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-amber-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-scroll text-2xl text-amber-200"></i>
            <span className="text-xl font-bold">Baybayin<span className="text-amber-200">Revival</span></span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-amber-200 transition">Home</a>
            <a href="#learn" className="hover:text-amber-200 transition">Learn</a>
            <a href="#resources" className="hover:text-amber-200 transition">Resources</a>
            <a href="#merchandise" className="hover:text-amber-200 transition">Merchandise</a>
            <a href="#news" className="hover:text-amber-200 transition">News</a>
            <a href="#contact" className="hover:text-amber-200 transition">Contact</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-3 space-y-3">
            <a href="#home" className="block hover:text-amber-200 transition" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#learn" className="block hover:text-amber-200 transition" onClick={() => setMobileMenuOpen(false)}>Learn</a>
            <a href="#resources" className="block hover:text-amber-200 transition" onClick={() => setMobileMenuOpen(false)}>Resources</a>
            <a href="#merchandise" className="block hover:text-amber-200 transition" onClick={() => setMobileMenuOpen(false)}>Merchandise</a>
            <a href="#news" className="block hover:text-amber-200 transition" onClick={() => setMobileMenuOpen(false)}>News</a>
            <a href="#contact" className="block hover:text-amber-200 transition" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-pattern py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 mb-4">
            Reviving the <span className="typewriter text-amber-600">Ancient Filipino Script</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Baybayin is the pre-colonial writing system of the Philippines. Join us in preserving and promoting this important part of Filipino heritage.
          </p>
          <div className="flex space-x-4">
            <a href="#learn" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg">
              Start Learning
            </a>
            <a href="#resources" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-medium transition">
              Explore Resources
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="bg-white p-6 rounded-xl shadow-2xl floating transform rotate-3">
              <div className="baybayin-font text-center text-5xl mb-2">ᜊᜌ᜔ᜊᜌᜒᜈ᜔</div>
              <p className="text-center text-gray-600">"Baybayin" in Baybayin script</p>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-amber-200 text-amber-900 px-4 py-2 rounded-lg shadow-lg floating" style={{ animationDelay: '2s' }}>
              Ancient Filipino Script
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">What is Baybayin?</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-amber-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-amber-600 text-4xl mb-4">
              <i className="fas fa-history"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-900">Historical Significance</h3>
            <p className="text-gray-700">
              Baybayin was used as far back as the 16th century and was the primary writing system before Spanish colonization. It represents an important part of pre-colonial Filipino identity.
            </p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-amber-600 text-4xl mb-4">
              <i className="fas fa-language"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-900">Writing System</h3>
            <p className="text-gray-700">
              Baybayin is an alphasyllabary where each character represents a consonant-vowel combination. It was traditionally written on bamboo or palm leaves using knives or styli.
            </p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-amber-600 text-4xl mb-4">
              <i className="fas fa-heart"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-900">Modern Revival</h3>
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
  const [color, setColor] = useState('#000000');
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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(character.char, canvas.width / 2, canvas.height / 2);
    }
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-amber-900">Practice Writing {character.char}</h3>
      
      <div className="practice-controls">
        <div className="flex items-center">
          <label htmlFor="color" className="mr-2 text-sm">Color:</label>
          <input 
            type="color" 
            id="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)} 
            className="w-8 h-8 cursor-pointer"
          />
        </div>
        
        <div className="flex items-center">
          <label htmlFor="brushSize" className="mr-2 text-sm">Size:</label>
          <input 
            type="range" 
            id="brushSize" 
            min="1" 
            max="20" 
            value={brushSize} 
            onChange={(e) => setBrushSize(e.target.value)} 
            className="w-24"
          />
        </div>
        
        <button 
          onClick={() => setShowGuide(!showGuide)} 
          className={`px-3 py-1 rounded text-sm ${showGuide ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
        >
          {showGuide ? 'Hide Guide' : 'Show Guide'}
        </button>
        
        <button 
          onClick={clearCanvas} 
          className="px-3 py-1 rounded bg-gray-200 text-sm hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
      
      <div className="canvas-container">
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
      
      <p className="text-sm text-gray-600">
        Tip: Try to trace the faint character guide. Turn it off when you're ready to practice on your own.
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
    <section id="learn" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Learn Baybayin Characters</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the basic characters of the Baybayin script. Click on any character to learn more about it.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {characters.map(char => (
            <button
              key={char.id}
              onClick={() => {
                setSelectedChar(char);
                setShowPractice(false);
              }}
              className={`p-4 rounded-lg text-center transition ${selectedChar?.id === char.id ? 'bg-amber-500 text-white shadow-lg' : 'bg-white hover:bg-amber-100 shadow-md'}`}
            >
              <div className="baybayin-font text-4xl mb-1">{char.char}</div>
              <div className="text-sm font-medium">{char.latin}</div>
            </button>
          ))}
        </div>
        
        {selectedChar && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
            <div className="md:flex">
              <div className="md:w-1/3 bg-amber-100 flex items-center justify-center p-8">
                <div className="baybayin-font text-8xl text-amber-800">{selectedChar.char}</div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-amber-900 mb-2">{selectedChar.latin} - {selectedChar.char}</h3>
                <div className="mb-4">
                  <span className="inline-block bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                    Example
                  </span>
                  <span>{selectedChar.example}</span>
                </div>
                <p className="text-gray-700 mb-6">{selectedChar.description}</p>
                <button 
                  onClick={() => setShowPractice(!showPractice)} 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
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
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
      
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-white mb-1">Resource Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-white hover:bg-gray-100 text-amber-700 px-6 py-3 rounded-lg font-medium transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
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
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Baybayin Merchandise</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Show your support for Baybayin with these beautifully designed products.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>
        
        <div className="merchandise-gallery">
          {merchandise.map(item => (
            <div key={item.id} className="merchandise-item">
              <img 
                src={item.image} 
                alt={item.title}
                className="merchandise-image"
              />
              <div className="merchandise-info">
                <h3 className="font-bold text-lg text-amber-900">{item.title}</h3>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600 font-bold">{item.price}</span>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm">
                    Add to Cart
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
  
  return (
    <section id="resources" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Baybayin Resources</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tools, apps, and materials to help you learn and use Baybayin in modern contexts.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(resource => (
            <div key={resource.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-amber-100 p-4 flex items-center">
                <div className="bg-amber-600 text-white p-3 rounded-full mr-4">
                  <i className={`fas ${getIcon(resource.type)} text-xl`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-amber-900">{resource.title}</h3>
                  <p className="text-sm text-amber-800 capitalize">{resource.type}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-4">{resource.description}</p>
                <a href={resource.url} className="text-amber-600 hover:text-amber-800 font-medium inline-flex items-center">
                  Learn more <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white">
          <div className="md:flex items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Want to contribute?</h3>
              <p className="mb-4">We're always looking for more resources to help promote Baybayin. Share your project or resource with us!</p>
              <button 
                onClick={() => setShowResourceForm(!showResourceForm)} 
                className="bg-white text-amber-700 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition"
              >
                {showResourceForm ? 'Cancel' : 'Submit Resource'}
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <i className="fas fa-hands-helping text-6xl opacity-80"></i>
            </div>
          </div>
          
          {showResourceForm && (
            <div className="mt-6">
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
    <section id="news" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Baybayin in the News</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated on the latest developments in the Baybayin revival movement.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {news.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-amber-200 flex items-center justify-center">
                <i className="fas fa-newspaper text-6xl text-amber-700 opacity-50"></i>
              </div>
              <div className="p-6">
                <div className="text-sm text-amber-600 mb-2">{new Date(item.date).toLocaleDateString()}</div>
                <h3 className="text-xl font-bold mb-3 text-amber-900">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.summary}</p>
                <a href={item.url} className="text-amber-600 hover:text-amber-800 font-medium inline-flex items-center">
                  Read more <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-medium transition">
            View All News
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
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
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-lg font-medium transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isLoading ? '...' : 'Subscribe'}
      </button>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Get Involved</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or want to collaborate? Reach out to us!
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-amber-900">Contact Us</h3>
            <ContactForm />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 text-amber-900">Connect With Us</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <i className="fas fa-envelope text-amber-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600">info@baybayinrevival.org</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <i className="fas fa-map-marker-alt text-amber-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <p className="text-gray-600">Baybayin Cultural Center, Manila, Philippines</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <i className="fas fa-hashtag text-amber-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Social Media</h4>
                  <div className="flex space-x-4 mt-2">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-full transition">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-full transition">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-full transition">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-full transition">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
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
    <footer className="bg-amber-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-scroll text-2xl text-amber-200"></i>
              <span className="text-xl font-bold">Baybayin<span className="text-amber-200">Revival</span></span>
            </div>
            <p className="text-amber-100">
              Dedicated to preserving and promoting the ancient Filipino script through education, technology, and cultural initiatives.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-200">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-amber-300 transition">Home</a></li>
              <li><a href="#learn" className="hover:text-amber-300 transition">Learn Baybayin</a></li>
              <li><a href="#resources" className="hover:text-amber-300 transition">Resources</a></li>
              <li><a href="#merchandise" className="hover:text-amber-300 transition">Merchandise</a></li>
              <li><a href="#news" className="hover:text-amber-300 transition">News</a></li>
              <li><a href="#contact" className="hover:text-amber-300 transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-200">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#resources" className="hover:text-amber-300 transition">Font Downloads</a></li>
              <li><a href="#resources" className="hover:text-amber-300 transition">Learning Materials</a></li>
              <li><a href="#resources" className="hover:text-amber-300 transition">Research Papers</a></li>
              <li><a href="#merchandise" className="hover:text-amber-300 transition">Merchandise</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-200">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-amber-800 hover:bg-amber-700 text-white p-2 rounded-full transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-amber-800 hover:bg-amber-700 text-white p-2 rounded-full transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-amber-800 hover:bg-amber-700 text-white p-2 rounded-full transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-amber-800 hover:bg-amber-700 text-white p-2 rounded-full transition">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <p className="text-amber-100">
              info@baybayinrevival.org<br />
              +63 912 345 6789
            </p>
          </div>
        </div>
        
        <div className="border-t border-amber-800 pt-8 text-center text-amber-200">
          <p>&copy; {new Date().getFullYear()} Baybayin Revival. All rights reserved.</p>
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
      <MerchandiseGallery />
      <NewsSection />
      <Contact />
      <Footer />
    </div>
