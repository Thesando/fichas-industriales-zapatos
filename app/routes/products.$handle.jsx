import { useLoaderData } from '@remix-run/react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductImage } from '~/components/ProductImage';
import { ProductForm } from '~/components/ProductForm';
import { useState } from 'react';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({ data }) => {
  return [
    { title: `Bracol | ${data?.product.title ?? ''}` },
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
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

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({ context, params }) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const { product } = useLoaderData();
  const [selectedImage, setSelectedImage] = useState(product?.images?.nodes?.[0] || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Método más seguro para metafields
  const getMetafieldValue = (namespace, key) => {
    return product?.metafields?.find(
      mf => mf?.namespace === namespace && mf?.key === key
    )?.value || null;
  };

  const reducedNumber = getMetafieldValue('custom', 'numero_reducido');
  const referenceNumber = getMetafieldValue('custom', 'referencia');
  const minNumber = getMetafieldValue('custom', 'min_number');
  const maxNumber = getMetafieldValue('custom', 'max_number');
  const CA = getMetafieldValue('custom', 'ca');
  const consultorCA = getMetafieldValue('custom', 'consultor_ca_link');
  const fichaEs = getMetafieldValue('custom', 'ficha_tecnica_es');
  const fichaEn = getMetafieldValue('custom', 'ficha_tecnica_en');
  const fichaPt = getMetafieldValue('custom', 'ficha_tecnica_pt');
  const fichaComercial = getMetafieldValue('custom', 'ficha_comercial');
  const techichalDescription = getMetafieldValue('custom', 'descripcion_tecnica');
  const color = getMetafieldValue('custom', 'color');
  const numeration = getMetafieldValue('custom', 'numeracion');
  const expiration = getMetafieldValue('custom', 'caducidad');
  const length = getMetafieldValue('custom', 'longitud');
  const size = getMetafieldValue('custom', 'altura');
  const weightPerFoot = getMetafieldValue('custom', 'peso_por_pie');
  const sb = getMetafieldValue('custom', 'sb');
  const E = getMetafieldValue('custom', 'ee');
  const FO = getMetafieldValue('custom', 'fo');
  const sra = getMetafieldValue('custom', 'sra');
  const horizontalStrips = getMetafieldValue('custom', 'tiras_horizontales');
  const impermeability = getMetafieldValue('custom', 'impermeabilidad');
  const sole = getMetafieldValue('custom', 'sole');
  const ankleGroove = getMetafieldValue('custom', 'ranura_del_tobillo');
  const innerLining = getMetafieldValue('custom', 'forro_interior');
  const nitrileFiller = getMetafieldValue('custom', 'carga_nitrilica');

  const iconosImage = product.metafields.find(
    mf => mf?.key === 'image_icons'
  )?.reference?.image;

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, descriptionHtml } = product;

  return (
    //Anteriromente este classname se llamaba product ... consideralo si tienes que regresar
    <div> {/* Contenedor principal como fila */}
      <div className='product'>
        {/* Columna de imágenes (izquierda) */}
        <div>
          {/* Imagen principal */}
          <img
            src={selectedImage.url}
            alt="Imagen principal"
            className='main-image-product'
          />

          {/* Contenedor de miniaturas - ¡Cambio clave aquí! */}
          <div className='secondary-images'>
            {product.images.nodes.slice(0, 7).map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt={`Miniatura ${image.altText || ''}`}
                className={`secondary-image-products`}
                onClick={() => setSelectedImage(image)}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Columna de detalles (derecha) */}
        <div className='detail-of-product'>
          <h1>{title}</h1>

          {reducedNumber && (
            <div className="metafield-row">
              <span className="metafield-reduced-number">Número reducido: {reducedNumber}</span>
            </div>
          )}

          {referenceNumber && (
            <div className="metafield-row">
              <span className="metafield-reference">Referencia: {referenceNumber}</span>
            </div>
          )}

          {iconosImage && (
            <img
              src={iconosImage.url}
              alt={iconosImage.altText || "Iconos del producto"}
              className="iconos-image"
              width="800"
              height="800"
            />
          )}

          <div className="product-description" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />

          {minNumber && maxNumber && (
            <div className="size-guide-container">
              {/* Columna izquierda */}
              <div className="size-info">
                <p className="label-size-column">Tamaño de columna</p>
                <p className="range-size-shoes">De {minNumber} a {maxNumber}</p>
              </div>

              {/* Columna derecha */}
              <div className="size-link">
                {/* Botón que abre el modal */}
                <button
                  className="guide-size-button"
                  onClick={() => setIsModalOpen(true)}
                >
                  Guía de tallas
                </button>
              </div>

              {/* Modal */}
              {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="modal-close-button"
                      onClick={() => setIsModalOpen(false)}
                    >
                      &times;
                    </button>
                    {/* Imagen responsiva (reemplaza con tu URL de Shopify) */}
                    <img
                      src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/tabla_de_medidas_800x800.png?v=1746548277"
                      alt="Guía de tallas"
                      className="responsive-image"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <hr className="line-break" />

          {CA && consultorCA && (
            <div className="consultant-container">
              {/* Texto "CA: 37455" */}
              <li className='product-approval-certificate'>
                <span className='certificate-span'>CA: </span>
                <div className='certificate-code'>{CA}</div>
              </li>

              {/* Botón "Consultor CA" */}
              <button className="consultant-button" onClick={() => {
                window.open(consultorCA, '_blank'); // Abre en nueva pestaña
              }}>
                Consultor CA
              </button>
            </div>
          )}

          {fichaEs && fichaEn && fichaPt && (
            <div className='custom-download-technical'>
              <button className='product-download-list' onClick={() => { window.open(fichaEs, '_blank') }}>Ficha técnica ES</button>
              <button className='product-download-list' onClick={() => { window.open(fichaEn, '_blank') }}>Ficha técnica EN</button>
              <button className='product-download-list' onClick={() => { window.open(fichaPt, '_blank') }}>Ficha técnica PT</button>
            </div>
          )}

          {fichaComercial && (
            <div className='custom-download-comercial'>
              <button className='product-comercial-list' onClick={() => { window.open(fichaComercial, '_blank') }}> Ficha comercial PT</button>
            </div>
          )}
        </div>
      </div>

      <div className='container-description'>
        <h3>Descripción tecnica</h3>

        {techichalDescription && (
          <p className='description-product'>{techichalDescription}</p>
        )}

        <div className='main-characteristics'>
          {color && (
            <p className='description-product'>Color: {color}</p>
          )}
          {numeration && (
            <p className='description-product'>Numeración: {numeration}</p>
          )}
          {expiration && (
            <p className='description-product'>Caducidad: {expiration}</p>
          )}
          {length && (
            <p className='description-product'>Longitud interior del zapato: {length}</p>
          )}
          {size && (
            <p className='description-product'>Altura del barril: {size}</p>
          )}
          {weightPerFoot && (
            <p className='description-product'>Peso por pie de zapato: {weightPerFoot}</p>
          )}
        </div>

        <h5>Lado tecnico</h5>
        <div className='main-characteristics'>
          {sb && (
            <p className='description-product'>SB - {sb}</p>
          )}
          {E && (
            <p className='description-product'>E - {E}</p>
          )}
          {FO && (
            <p className='description-product'>FO - {FO}</p>
          )}
          {sra && (
            <p className='description-product'>SRA - {sra} </p>
          )}
        </div>

        <h3>Detalles</h3>
        <ul className="details-list">
          {horizontalStrips && (
            <li className="detail-item">
              <strong>TIRAS HORIZONTALES:</strong> {horizontalStrips}
            </li>
          )}
          {impermeability && (
            <li className="detail-item">
              <strong>IMPERMEABILIDAD:</strong> {impermeability}
            </li>
          )}
          {sole && (
            <li className="detail-item">
            <strong>SUELA:</strong> {sole}
          </li>
          )}
          {ankleGroove && (
            <li className="detail-item">
            <strong>RANURA DEL TOBILLO:</strong> {ankleGroove}
          </li>
          )}
          {innerLining && (
            <li className="detail-item">
            <strong>FORRO INTERIOR:</strong> {innerLining}
          </li>
          )}
          {nitrileFiller && (
            <li className="detail-item">
            <strong>CARGA NITRÍLICA:</strong> {nitrileFiller}
          </li>
          )}
        </ul>
      </div>
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
     metafields(identifiers: [
    {namespace: "custom", key: "numero_reducido"},
    {namespace: "custom", key: "referencia"},
    {namespace: "custom", key: "image_icons"},
    {namespace: "custom", key: "min_number"},
    {namespace: "custom", key: "max_number"},
    {namespace: "custom", key: "ca"},
    {namespace: "custom", key: "consultor_ca_link"},
    {namespace: "custom", key: "ficha_tecnica_es"},
    {namespace: "custom", key: "ficha_tecnica_en"},
    {namespace: "custom", key: "ficha_tecnica_pt"},
    {namespace: "custom", key: "ficha_comercial"},
    {namespace: "custom", key: "descripcion_tecnica"},
    {namespace: "custom", key: "color"},
    {namespace: "custom", key: "numeracion"},
    {namespace: "custom", key: "caducidad"},
    {namespace: "custom", key: "longitud"},
    {namespace: "custom", key: "altura"},
    {namespace: "custom", key: "peso_por_pie"},
    {namespace: "custom", key: "sb"},
    {namespace: "custom", key: "ee"},
    {namespace: "custom", key: "fo"},
    {namespace: "custom", key: "sra"},
    {namespace: "custom", key: "tiras_horizontales"},
    {namespace: "custom", key: "impermeabilidad"},
    {namespace: "custom", key: "suela"},
    {namespace: "custom", key: "ranura_del_tobillo"},
    {namespace: "custom", key: "forro_interior"},
    {namespace: "custom", key: "carga_nitrilica"}
  ]) {
    namespace
    key
    value
    type
      reference {
        ... on MediaImage {
          image {
            url(transform: {maxWidth: 800})
            altText
          }
        }
      }
  }
    images(first: 10) {
    nodes {
      id
      url
      altText
    }
  }
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
