import 'bootstrap/dist/css/bootstrap.min.css';
import { useLoaderData, Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
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

async function loadCriticalData({ context }) {
  const [{ collections }, novedadesResponse] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    context.storefront
      .query(NOVEDADES_COLLECTION_QUERY, {
        variables: { handle: "Novedades" },
      })
      .catch((err) => {
        console.error("Error obteniendo colección Novedades:", err);
        return { collection: null };
      }),
  ]);

  return {
    featuredCollection: collections.nodes[0],
    novedades: novedadesResponse?.collection ? novedadesResponse : null,
  };
}

function loadDeferredData({ context }) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const loaderData = useLoaderData();
  const novedades = loaderData?.novedades?.collection || null;

  useEffect(() => {
    // Solo se ejecuta en cliente
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      {/* Quinta sección: Novedades */}
      {typeof document !== 'undefined' && novedades?.products?.nodes?.length > 0 ? (
        <section className="container my-5">
          <h5 className="text-center text-uppercase fw-bold mb-4">Novedades Bracol</h5>
          <div className="row row-cols-2 row-cols-md-4 g-3">
            {novedades.products.nodes.map((product) => (
              <div className="col" key={product.id}>
                <a
                  href={`/products/${product.handle}`}
                  className="text-decoration-none text-dark"
                >
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
            ))}
          </div>
        </section>
      ) : (
        <></> // Nada si no hay datos o estamos en SSR
      )}
    </>
  );
}

// Componentes y queries adicionales
function FeaturedCollection({ collection }) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link className="featured-collection" to={`/collections/${collection.handle}`}>
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

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
  query RecommendedProducts($country: CountryCode, $language: LanguageCode)
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
