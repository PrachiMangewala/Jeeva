import data from './data';

function App() {
  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Jeeva</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbar-nav-scroll" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="/">Home</a>
              <a className="nav-link" href="/">Products</a>
              <a className="nav-link" href="/">About Us</a>
              <a className="nav-link" href="/">Contact Us</a>
            </div>
          </div>
          <a className="navbar-brand" href="#">Cart</a>
          <a className="navbar-brand" href="#">Sign In</a>
        </div>
      </nav>
      <main>
        <div className="container-fluid header" style={{
          backgroundImage: "url(/images/bg-1.jpg)", backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}>
          <div className="content">
            <img src="/images/jeeva.png" alt="" className="logo" />
            <p>we thrive to sustain and to provide a way of life</p>
          </div>
        </div>

        <div className="container d-flex flex-row my-5">
          <div className=" left-container container">
            <h1>Products We Have</h1>
            <a className="nav-link" href="/">Toothbrush</a>
            <a className="nav-link" href="/">Comb</a>
            <a className="nav-link" href="/">Ear Buds</a>
          </div>
          <div className="container">
            <h1>Why Bamboo</h1>
            <p>
              Bamboo, technically is a type of grass which grows everywhere in the world except for the areas with extremely cold climates.The species of bamboo that we know today evolved from prehistoric grasses between thirty and forty million years ago.
            <br />
            India is the world’s second largest cultivator of bamboo after China. About 50 percent of India’s bamboo resources are in the North Eastern States which has 63 species of bamboo in this region, hence producing the finest bamboo artisans. Despite all this, the country’s share in the global bamboo trade and commerce is only 4%
            <br />
            Through history, wood has become more and more scarce, simply because to produce a full grown tree can take up to sixty years, and another sixty years-time for a replacement, unlike some species of bamboo which equal in height and width to full-matured tree but take as little as sixty days to mature completely.
            <br />
            Bamboo products such as arrows, paper, building materials, and books existed as far back as about seven thousand years. Even in the early years, bamboo had been used in many ways, not to mention the traditional use of bamboo in the daily life of the early people especially in Asia.
          </p>
          </div>
        </div>

        <div className="container my-3">
          <div className="my-5 center"><h1>Featured Products</h1></div>
          <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
            {
              data.products.map((product) => (
                <div key={product._id} className="card mt-2 mb-2" style={{ width: "18rem" }} >
                    <div>
                      <img className="card-img-top" src={product.image} alt={product.name} />
                    </div>
                    <div className="card-body">
                      <div className="card-title">
                        <a href={`/product/${product._id}`} className="nav-link">{product.name}</a>
                      </div>
                    </div>
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
