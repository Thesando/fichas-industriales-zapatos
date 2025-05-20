import 'bootstrap/dist/css/bootstrap.min.css';
import { useLoaderData, Link, NavLink } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
//import '../styles/index.css';
import { useEffect } from 'react';


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
  const [{ collections }, { collection: novedades }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    context.storefront.query(NOVEDADES_COLLECTION_QUERY, {
      variables: { handle: "Novedades" }, // Usa el "handle" correcto
    }),
  ]);


  return {
    featuredCollection: collections.nodes[0],
    novedades
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

  const { novedades } = useLoaderData();

  useEffect(() => {
    // Solo se ejecuta en el cliente
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>


      <section className="container my-5">
        <h5 className="text-center text-uppercase fw-bold mb-4">Novedades Bracol</h5>
        <div className="row row-cols-2 row-cols-md-4 g-3">
          {novedades?.products?.nodes?.length > 0 ? (
            novedades.products.nodes.map((product) => (
              <div className="col" key={product.id}>
                <a href={`/products/${product.handle}`} className="text-decoration-none text-dark">
                  <div className="card h-100 border-0 shadow-sm">
                    <img
                      src={product.featuredImage?.url}
                      alt={product.featuredImage?.altText || product.title}
                      className="card-img-top"
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                    <div className="card-body text-center">
                      <h6 className="card-title fw-semibold">{product.title}</h6>
                    </div>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No hay productos disponibles por ahora.</p>
          )}
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

const NOVEDADES_COLLECTION_QUERY = `#graphql
  query NovedadesCollection($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      title
      products(first: 10) {
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
