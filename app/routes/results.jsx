import 'bootstrap/dist/css/bootstrap.min.css';
import {useLoaderData} from '@remix-run/react';

export async function loader({request, context}) {
  const {storefront} = context;
  const url = new URL(request.url);
  const term = url.searchParams.get('q')?.toLowerCase() || '';

  if (!term) return {term, products: []};

  const query = `#graphql
    query BuscarProductos($term: String!) {
      products(first: 100) {
        nodes {
          id
          title
          handle
          metafields(identifiers: [
            {namespace: "custom", key: "ca"},
            {namespace: "custom", key: "numero_reducido"}
          ]) {
            key
            value
          }
          featuredImage {
            url
            altText
          }
        }
      }
    }
  `;

  const {products} = await storefront.query(query, {variables: {term}});

  const matches = products.nodes.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(term);
    const metafieldMatch = product.metafields.some((m) =>
      m.value?.toLowerCase().includes(term)
    );
    return titleMatch || metafieldMatch;
  });

  return {term, products: matches};
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