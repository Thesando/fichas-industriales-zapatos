import 'bootstrap/dist/css/bootstrap.min.css';
import { useLoaderData, Link, NavLink } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
// import '../styles/index.css';
import { Suspense, useEffect, useState } from 'react';


/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Hydrogen | Home' }];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader({ context }) {
  // 1. Verificación más segura del entorno
  const isMockEnvironment = !context.storefront ||
    !context.storefront.storeDomain ||
    context.storefront.storeDomain.includes('mock.shop');

  if (isMockEnvironment) {
    return { collectionData: null, isMock: true };
  }

  // 2. Consulta solo en producción
  try {
    const { collection } = await context.storefront.query(`
      query NovedadesCollection {
        collection(handle: "novedades") {
          products(first: 4) {
            nodes {
              id
              title
              featuredImage {
                url(transform: {maxWidth: 300})
              }
            }
          }
        }
      }
    `);

    return {
      collectionData: collection || null,
      isMock: false
    };
  } catch (error) {
    return { collectionData: null, isMock: false };
  }
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({ context }) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({ context }) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */


  // 3. Evita hidratación incorrecta
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');

  }, []);
  const { collectionData, isMock } = useLoaderData();

  // 3. Renderizado condicional seguro
  if (isMock || !collectionData?.products?.nodes) {
    return null; // No renderizar nada en mock/error
  }

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

      <section className="novedades-section">
      <h5 className="text-center">NOVEDADES</h5>
      <div className="products-grid">
        {collectionData.products.nodes.map((product) => (
          <div key={product.id}>
            {product.featuredImage && (
              <img 
                src={product.featuredImage.url} 
                alt={product.title}
                width={300}
                height={300}
              />
            )}
            <h6>{product.title}</h6>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({ collection }) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 3) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

// Consulta para obtener la colección "Novedades" y sus productos
const NOVEDADES_QUERY = `#graphql
  query NovedadesCollection($handle: String!) {
    collection(handle: $handle) {
      products(first: 8, sortKey: CREATED_AT, reverse: true) {
        nodes {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
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