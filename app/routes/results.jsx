import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/results.css';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request, context }) {
    const { storefront } = context;
    const url = new URL(request.url);
    const term = url.searchParams.get('q')?.toLowerCase() || '';

    if (!term) return { term, products: [] };

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

            const metafieldMatch = product.metafields?.some(
                (m) => m?.value && m.value.toLowerCase().includes(term)
            );

            return titleMatch || metafieldMatch;
        });

        return { term, products: matches };
    } catch (error) {
        console.error('Error al cargar resultados:', error);
        throw new Response(`Error interno del servidor: ${error}`, { status: 500 });
    }
}


export default function Results() {
    const { term, products } = useLoaderData();

    return (
        <div className="resultado-pagina my-2 mx-5">
            <h1>Resultados para: {term}</h1>
            {products.length === 0 ? (
                <p>No se encontraron resultados.</p>
            ) : (
                <div className="row lista-productos">
                    {products.map((prod) => (
                        <div key={prod.id} className="col-12 col-sm-6 col-md-4 mb-4">
                            <div className="card h-100 product-search">
                                <a href={`/products/${prod.handle}`} className="text-decoration-none text-dark">
                                    <img
                                        src={prod.featuredImage?.url}
                                        alt={prod.featuredImage?.altText}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h2 className="h6 card-title">{prod.title}</h2>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}