import 'bootstrap/dist/css/bootstrap.min.css';
import { useLoaderData, Link, NavLink } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
//import '../styles/index.css';


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
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({ context }) {
  try {
    const [{ collections }, { collection: topsCollection }, novedadesData] = await Promise.all([
      context.storefront.query(FEATURED_COLLECTION_QUERY),
      context.storefront.query(TOPS_PRODUCTS_QUERY),
      context.storefront.query(NOVEDADES_QUERY).catch(() => null), // ← Captura errores y devuelve null
    ]);

    return {
      featuredCollection: collections.nodes[0],
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
                  <p className="card-text">
                    {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                  </p>
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
                  <p className="card-text">
                    {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                  </p>
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

  // useEffect(() => {
  //   // Solo se ejecuta en el cliente
  //   import('bootstrap/dist/js/bootstrap.bundle.min.js');
  // }, []);

  const data = useLoaderData();

  return (
    <>
      

      {/* <section>
        <TopsProducts products={data.topsProducts} />
      </section> */}

      <NovedadesSection products={data.novedadesProducts} /> {/* Solo aparece si hay datos */}

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