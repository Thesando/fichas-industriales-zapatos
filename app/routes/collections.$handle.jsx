import { redirect } from '@shopify/remix-oxygen';
import { useLoaderData, Link } from '@remix-run/react';
import {
  getPaginationVariables,
  Image
} from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { useState } from 'react';
import '../styles/collections.css';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.collection.title ?? ''} Collection` }];
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
async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{ collection }] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: { handle, ...paginationVariables },
      // Add other queries here, so that they are loaded in parallel
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  return {
    collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({ context }) {
  return {};
}

export default function Collection() {
  /** @type {LoaderReturnData} */
  const { collection } = useLoaderData();
  const [selectedTags, setSelectedTags] = useState([]);
  const [isMenuFilterOpen, setIsMenuFilterOpen] = useState(false);
  const [activeTab1, setActiveTab1] = useState(null);
  const [activeTab2, setActiveTab2] = useState(null);
  const [showLines, setShowLines] = useState(false);
  const [showLines2, setShowLines2] = useState(false);


  const toggleLines = () => {
    setShowLines(!showLines);
  }

  const toggleLines2 = () => {
    setShowLines2(!showLines2);
  }

  // Filtramos los productos basados en los tags seleccionados
  const filteredProducts = selectedTags.length === 0
    ? collection.products.nodes
    : collection.products.nodes.filter(product =>
      selectedTags.every(tag => product.tags.includes(tag))
    );

  const toggleMenu = () => {
    setIsMenuFilterOpen(!isMenuFilterOpen);
    document.body.style.overflow = isMenuFilterOpen ? '' : 'hidden';
  };

  return (
    <div className="collection-page">
      <h1 className="collection-title">{collection.title}</h1>
      <div className="collection-content">
        {/* Sidebar de filtros */}
        <div className="filters-sidebar">
          {/* Pestaña Material Superior */}
          <div className="filter-tab">
            <div
              className="filter-tab-header"
              onClick={() => setActiveTab1(activeTab1 === 'material' ? null : 'material')}
            >
              <span>Material Superior</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`filter-tab-header-arrow ${activeTab1 ? 'open' : ''}`} viewBox="0 0 24 24">
                <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
              </svg>
            </div>

            {activeTab1 === 'material' && (
              <div className="filter-tab-content">
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('PVC (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('PVC (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'PVC (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'PVC (Material superior)']);
                      }
                    }}
                  />
                  PVC
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Cuero (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('Cuero (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Cuero (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Cuero (Material superior)']);
                      }
                    }}
                  />
                  Cuero
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Cuero impermeable (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('Cuero impermeable (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Cuero impermeable (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Cuero impermeable (Material superior)']);
                      }
                    }}
                  />
                  Cuero impermeable
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Microfibra (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('Microfibra (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Microfibra (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Microfibra (Material superior)']);
                      }
                    }}
                  />
                  Microfibra
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Tejido (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('Tejido (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Tejido (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Tejido (Material superior)']);
                      }
                    }}
                  />
                  Tejido
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Poliuterano (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('Poliuterano (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Poliuterano (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Poliuterano (Material superior)']);
                      }
                    }}
                  />
                  Poliuterano
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Nobuk (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('Nobuk (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Nobuk (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Nobuk (Material superior)']);
                      }
                    }}
                  />
                  Nobuk
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('PU (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('PU (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'PU (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'PU (Material superior)']);
                      }
                    }}
                  />
                  PU
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Cuero grasoso (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('Cuero grasoso (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Cuero grasoso (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Cuero grasoso (Material superior)']);
                      }
                    }}
                  />
                  Cuero grasoso
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Cuero grasoso (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('Cuero grasoso (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Cuero grasoso (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Cuero grasoso (Material superior)']);
                      }
                    }}
                  />
                  Cuero grasoso
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Crazy horse (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('Crazy horse (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Crazy horse (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Crazy horse (Material superior)']);
                      }
                    }}
                  />
                  Crazy horse
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Cuero liso (Material superior)')}
                    onChange={() => {
                      if (selectedTags.includes('Cuero liso (Material superior)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Cuero liso (Material superior)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Cuero liso (Material superior)']);
                      }
                    }}
                  />
                  Cuero liso
                </label>
              </div>
            )}
          </div>

          {/* Pestaña Puntera */}
          <div className="filter-tab" style={{ marginTop: '16px' }}>
            <div
              className="filter-tab-header"
              onClick={() => setActiveTab2(activeTab2 === 'puntera' ? null : 'puntera')}
            >
              <span>Puntera</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`filter-tab-header-arrow ${activeTab2 ? 'open' : ''}`} viewBox="0 0 24 24">
                <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
              </svg>
            </div>

            {activeTab2 === 'puntera' && (
              <div className="filter-tab-content">
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Plastico (Puntera)')}
                    onChange={() => {
                      if (selectedTags.includes('Plastico (Puntera)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Plastico (Puntera)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Plastico (Puntera)']);
                      }
                    }}
                  />
                  Plastico
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('No tiene (Puntera)')}
                    onChange={() => {
                      if (selectedTags.includes('No tiene (Puntera)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'No tiene (Puntera)'));
                      } else {
                        setSelectedTags([...selectedTags, 'No tiene (Puntera)']);
                      }
                    }}
                  />
                  No tiene
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Compuesto (Puntera)')}
                    onChange={() => {
                      if (selectedTags.includes('Compuesto (Puntera)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Compuesto (Puntera)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Compuesto (Puntera)']);
                      }
                    }}
                  />
                  Compuesto
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Armadura (Puntera)')}
                    onChange={() => {
                      if (selectedTags.includes('Armadura (Puntera)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Armadura (Puntera)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Armadura (Puntera)']);
                      }
                    }}
                  />
                  Armadura
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('Acero (Puntera)')}
                    onChange={() => {
                      if (selectedTags.includes('Acero (Puntera)')) {
                        setSelectedTags(selectedTags.filter(tag => tag !== 'Acero (Puntera)'));
                      } else {
                        setSelectedTags([...selectedTags, 'Acero (Puntera)']);
                      }
                    }}
                  />
                  Acero
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Grid de productos */}
        <div className="products-grid">
          {/*Filtros para menu mobile */}
          <div className="mobile-filter-container">
            <div className='filters-sidebar-mobile'>
              <button className='filter-button-mobile' onClick={toggleMenu}>Filtros</button>
            </div>
          </div>

          {/*Menu para filtros mobile */}

          {isMenuFilterOpen && (
            <div className='mobile-filter-menu-overlay'>
              <div className='mobile-filter-menu-container'>
                <div>
                  <button
                    className="close-menu-filter-button"
                    onClick={toggleMenu}
                  >
                    ×
                  </button>
                  <nav className='mobile-filter-nav'>

                    <div className='mobile-menu-filter-item' onClick={toggleLines}>
                      <span>Material superior</span><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`mobile-menu-filter-arrow ${showLines ? 'open' : ''}`}
                      >
                        <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
                      </svg>
                    </div>
                    {showLines && (
                      <>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('PVC (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('PVC (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'PVC (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'PVC (Material superior)']);
                              }
                            }} />
                          PVC
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Cuero (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('Cuero (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Cuero (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Cuero (Material superior)']);
                              }
                            }}
                          />
                          Cuero
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Cuero impermeable (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('Cuero impermeable (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Cuero impermeable (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Cuero impermeable (Material superior)']);
                              }
                            }}
                          />
                          Cuero impermeable
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Microfibra (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('Microfibra (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Microfibra (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Microfibra (Material superior)']);
                              }
                            }}
                          />
                          Microfibra
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Tejido (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('Tejido (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Tejido (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Tejido (Material superior)']);
                              }
                            }}
                          />
                          Tejido
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Poliuterano (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('Poliuterano (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Poliuterano (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Poliuterano (Material superior)']);
                              }
                            }}
                          />
                          Poliuterano
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Nobuk (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('Nobuk (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Nobuk (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Nobuk (Material superior)']);
                              }
                            }}
                          />
                          Nobuk
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('PU (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('PU (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'PU (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'PU (Material superior)']);
                              }
                            }}
                          />
                          PU
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Cuero grasoso (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('Cuero grasoso (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Cuero grasoso (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Cuero grasoso (Material superior)']);
                              }
                            }}
                          />
                          Cuero grasoso
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Cuero grasoso (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('Cuero grasoso (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Cuero grasoso (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Cuero grasoso (Material superior)']);
                              }
                            }}
                          />
                          Cuero grasoso
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Crazy horse (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('Crazy horse (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Crazy horse (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Crazy horse (Material superior)']);
                              }
                            }}
                          />
                          Crazy horse
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Cuero liso (Material superior)')}
                            onChange={() => {
                              if (selectedTags.includes('Cuero liso (Material superior)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Cuero liso (Material superior)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Cuero liso (Material superior)']);
                              }
                            }}
                          />
                          Cuero liso
                        </label>
                      </>
                    )}

                    <div className='mobile-menu-filter-item' onClick={toggleLines2}>
                      <span>Puntera</span><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`mobile-menu-filter-arrow ${showLines2 ? 'open' : ''}`}
                      >
                        <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
                      </svg>
                    </div>
                    {showLines2 && (
                      <>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Plastico (Puntera)')}
                            onChange={() => {
                              if (selectedTags.includes('Plastico (Puntera)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Plastico (Puntera)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Plastico (Puntera)']);
                              }
                            }}
                          />
                          Plastico
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('No tiene (Puntera)')}
                            onChange={() => {
                              if (selectedTags.includes('No tiene (Puntera)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'No tiene (Puntera)'));
                              } else {
                                setSelectedTags([...selectedTags, 'No tiene (Puntera)']);
                              }
                            }} />
                          No tiene
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Compuesto (Puntera)')}
                            onChange={() => {
                              if (selectedTags.includes('Compuesto (Puntera)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Compuesto (Puntera)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Compuesto (Puntera)']);
                              }
                            }}
                          />
                          Compuesto
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Armadura (Puntera)')}
                            onChange={() => {
                              if (selectedTags.includes('Armadura (Puntera)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Armadura (Puntera)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Armadura (Puntera)']);
                              }
                            }}
                          />
                          Armadura
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes('Acero (Puntera)')}
                            onChange={() => {
                              if (selectedTags.includes('Acero (Puntera)')) {
                                setSelectedTags(selectedTags.filter(tag => tag !== 'Acero (Puntera)'));
                              } else {
                                setSelectedTags([...selectedTags, 'Acero (Puntera)']);
                              }
                            }}
                          />
                          Acero
                        </label>
                      </>
                    )}

                  </nav>
                </div>
              </div>
            </div>
          )}


          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   product: ProductItemFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
function ProductItem({ product, loading }) {
  const variantUrl = useVariantUrl(product.handle);
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {product.featuredImage && (
        <Image
          alt={product.featuredImage.altText || product.title}
          aspectRatio="1/1"
          data={product.featuredImage}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h4>{product.title}</h4>
    </Link>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    tags
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
