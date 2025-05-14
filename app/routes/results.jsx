import 'bootstrap/dist/css/bootstrap.min.css';
import { useLoaderData } from '@remix-run/react';

export async function loader({request, context}) {
  const {storefront} = context;
  const url = new URL(request.url);
  const term = url.searchParams.get('q')?.toLowerCase() || '';

  if (!term) return {term, products: []};

  const query = `#graphql
    query BuscarProductos {
      products(first: 100) {
        nodes {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          metafields(identifiers: [
            {namespace: "custom", key: "ca"},
            {namespace: "custom", key: "numero_reducido"}
          ]) {
            key
            value
          }
        }
      }
    }
  `;

  try {
    const data = await storefront.query(query);

    if (!data || !data.products) {
      throw new Error('No se pudo obtener productos desde Shopify.');
    }

    const matches = data.products.nodes.filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(term);
      const metafieldMatch = product.metafields?.some((m) =>
        m.value?.toLowerCase().includes(term)
      );
      return titleMatch || metafieldMatch;
    });

    return {term, products: matches};
  } catch (error) {
    console.error('Error al cargar resultados:', error);
    throw new Response(`Error interno del servidor: ${error}`, {status: 500});
  }
}


export default function Results() {
    const { term, products } = useLoaderData();

    return (
        <div className="resultado-pagina">
            <h1>Resultados para: {term}</h1>
            {products.length === 0 ? (
                <p>No se encontraron resultados.</p>
            ) : (
                <div className="lista-productos">
                    {products.map((prod) => (
                        <div key={prod.id} className="producto">
                            <a href={`/products/${prod.handle}`}>
                                <img src={prod.featuredImage?.url} alt={prod.featuredImage?.altText} />
                                <h2>{prod.title}</h2>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}