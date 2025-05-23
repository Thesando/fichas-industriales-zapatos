import 'bootstrap/dist/css/bootstrap.min.css';
import { useLoaderData, Link, NavLink } from '@remix-run/react';
import '../styles/index.css';
import '../styles/about-bracol.css';
import { useEffect } from 'react';
import NewsLetterForm from '../components/NewsLetterForm.jsx';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Hydrogen | Home' }];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({ context }) {
  try {
    const [{ collection: topsCollection }, novedadesData] = await Promise.all([
      context.storefront.query(TOPS_PRODUCTS_QUERY),
      context.storefront.query(NOVEDADES_QUERY).catch(() => null), // ← Captura errores y devuelve null
    ]);

    return {
      topsProducts: topsCollection?.products?.nodes || [], // Fallback seguro
      novedadesProducts: novedadesData?.collection?.products?.nodes || [], // Fallback seguro
    };
  } catch (error) {
    console.error("Error en loadCriticalData:", error);
    return {
      featuredCollection: null,
      topsProducts: [],
      novedadesProducts: [], // Asegura que siempre haya un array
    };
  }
}

function TopsProducts({ products }) {
  if (!products?.length) return null;

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Productos Tops</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <Link to={`/products/${product.handle}`} className="text-decoration-none">
              <div className="card h-100">
                {product.featuredImage && (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function NovedadesSection({ products }) {
  // No renderizar si no hay productos
  if (!products?.length) return null;

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Novedades</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <Link to={`/products/${product.handle}`} className="text-decoration-none">
              <div className="card h-100">
                {product.featuredImage && (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Homepage() {
  /** @type {LoaderReturnData} */

  useEffect(() => {
    // Solo se ejecuta en el cliente
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const data = useLoaderData();

  return (
    <>
      <section className='first-index-section'>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/Imagen_1_carrousel_800x800.png?v=1747347162" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/Imagen_2_carrousel_800x800.png?v=1747347267" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/Imagen_3_carrousel_800x800.png?v=1747347301" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section className='container second-index-section my-1'>
        <div className="row g-0">
          {/* Aqua Lev */}
          <div className="col-md-6 mb-4">
            <div className="overflow-hidden rounded-start">
              <img
                src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/linha-detroit_800x800.png?v=1747671334"
                alt="Aqua Lev"
                className="w-100 img-fluid rounded-start custom-img"
              />
            </div>
            <div className="text-center mt-3">
              <h6 className='second-index-title'>Aqua Lev</h6>
              <p className='second-index-text'>Camine con seguridad y confianza con la linea Acqua-Lev</p>
              <NavLink to="/collections/acqua-lev" className="second-index-button">
                Ver más
              </NavLink>
            </div>
          </div>

          {/* Aqua Flex */}
          <div className="col-md-6 mb-4">
            <div className="overflow-hidden rounded-end">
              <img
                src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/linha-horizon_800x800.png?v=1747671334"
                alt="Aqua Flex"
                className="w-100 img-fluid rounded-end custom-img"
              />
            </div>
            <div className="text-center mt-3">
              <h6 className='second-index-title'>Aqua Flex</h6>
              <p className='second-index-text'>Camine con seguridad y confianza con la linea Acqua-flex</p>
              <NavLink to="/collections/acqua-flex" className="second-index-button">
                Ver más
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className='container third-section-index'>
        <div className='carrousel-third'>
          <h3 className='third-section-title text-center'>¿Qué estás buscando?</h3>
          <h3 className='third-section-title-2 text-center'>Nuestros segmentos</h3>

          <div className="row mt-4">
            {[
              { img: 'https://cdn.shopify.com/s/files/1/0688/5113/8848/files/banner-agronegocio_800x800.webp?v=1747677530', to: '/collections/agronegocio' },
              { img: 'https://cdn.shopify.com/s/files/1/0688/5113/8848/files/banner-energia-telecom_800x800.webp?v=1747677546', to: '/collections/energia-y-telecomunicaciones' },
              { img: 'https://cdn.shopify.com/s/files/1/0688/5113/8848/files/banner-offshore_800x800.webp?v=1747677546', to: '/collections/off-shore' },
              { img: 'https://cdn.shopify.com/s/files/1/0688/5113/8848/files/banner-mineracao_800x800.webp?v=1747677546', to: '/collections/mineria' },
              { img: 'https://cdn.shopify.com/s/files/1/0688/5113/8848/files/banner-alimenticia_800x800.webp?v=1747677546', to: '/collections/industria-alimentaria' },
              { img: 'https://cdn.shopify.com/s/files/1/0688/5113/8848/files/banner-construcao_800x800.webp?v=1747677546', to: '/construccion' },
            ].map((item, idx) => (
              <div key={idx} className="col-6 col-md-4 mb-4">
                <a href={item.to} className="d-block overflow-hidden image-hover-wrapper">
                  <img
                    src={item.img}
                    alt={`Segmento ${idx + 1}`}
                    className="img-fluid image-hover"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='container fourth-section-index'>
        <h5 className='fourth-title-index text-center'>Tu seguridad es lo primero</h5>
        <h6 className='fourth-title-index-2 text-center'>Principales tecnologías</h6>

        <div className='tecnologias-principales'>
          <div className='tecnologia-producto'>
            <div className='tech-airtech tech-img my-4' />
            <h4 className='fourth-section-title-index my-2'>AIRTECH</h4>
            <p className='fourth-section-text-index'>Tejido compuesto de tres capas que garantizan un rápido secado y evaporación de la humedad.</p>
          </div>
          <div className='tecnologia-producto'>
            <div className='tech-cordura tech-img my-4' />
            <h4 className='fourth-section-title-index my-2'>CORDURA</h4>
            <p className='fourth-section-text-index'>Compuesto por hilos de alta tenacidad, garantiza durabilidad, rápida limpieza y secado, y resistencia a la abrasión y al desgarro.</p>
          </div>
          <div className='tecnologia-producto'>
            <div className='tech-plantilla tech-img my-4' />
            <h4 className='fourth-section-title-index my-2'>Plantilla Soft Walk</h4>
            <p className='fourth-section-text-index'>Plantilla anatómica de confort fabricada en poliuretano poliéster con excelente absorción de impactos e increíble rendimiento.</p>
          </div>
        </div>
      </section>

      <section>
        <TopsProducts products={data.topsProducts} />
      </section>

      {/* <NovedadesSection products={data.novedadesProducts} /> Solo aparece si hay datos */}

      <NewsLetterForm />

    </>
  );
}

const TOPS_PRODUCTS_QUERY = `#graphql
  fragment TopsProduct on Product {
    id
    title
    handle
    featuredImage {
      url
      altText
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
  query TopsProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collection(handle: "tops") {
      products(first: 4) {
        nodes {
          ...TopsProduct
        }
      }
    }
  }
`;

const NOVEDADES_QUERY = `#graphql
  fragment NovedadProduct on Product {
    id
    title
    handle
    featuredImage {
      url
      altText
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
  query NovedadesProducts(
    $country: CountryCode, 
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: "novedades") {
      products(first: 4) {
        nodes {
          ...NovedadProduct
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */