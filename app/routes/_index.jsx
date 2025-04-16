import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
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
function loadDeferredData({context}) {
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
  const data = useLoaderData();
  return (
    <div className="home">
      <FeaturedCollection collection={data.featuredCollection} />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore unde fugiat deleniti aspernatur dolor, eum tenetur ullam temporibus architecto, quas sunt praesentium optio a? Repudiandae impedit sint inventore itaque, quod nemo doloribus tempora, amet repellat, minus dolor iusto pariatur. Neque voluptas aliquid maxime accusantium nisi eum error eligendi. Voluptatem aperiam unde nobis ut temporibus eligendi ea quidem ad commodi error architecto numquam doloribus nemo qui repellendus, voluptates laboriosam vitae recusandae reiciendis facilis consectetur itaque quaerat voluptatibus officiis? Optio voluptates, laborum sunt hic sint earum blanditiis? Nostrum reprehenderit expedita cupiditate molestiae soluta enim quae, velit nesciunt animi dolor voluptates laudantium perferendis pariatur, delectus iste nihil non? Ea maxime laboriosam at nulla reprehenderit, laborum distinctio nihil illum autem sit sed perferendis consequatur ipsum, eos labore ipsam dolorem laudantium non eveniet a omnis est! Asperiores pariatur amet ullam vero repellat exercitationem. Fugiat voluptate quibusdam dolore veniam velit doloribus sint expedita reiciendis repudiandae maxime at a, unde dolorum cupiditate inventore eius veritatis nulla alias optio? Molestiae totam placeat nulla. Maiores facere impedit perferendis, praesentium ullam explicabo voluptas excepturi magnam ab ducimus architecto velit voluptate consequatur perspiciatis quod! Minus distinctio minima, ex in laudantium nihil libero obcaecati iste nesciunt magni cupiditate vitae enim labore et fuga omnis natus voluptatem vel! Exercitationem dignissimos quos sunt reprehenderit officia deserunt quod doloribus similique repellendus? Assumenda, soluta aspernatur, expedita libero quae sunt, itaque voluptatum dolor nihil minus voluptates distinctio! Quos harum qui veritatis cum quibusdam ducimus consectetur doloremque culpa! Iste officia minima dicta hic quasi eligendi expedita consequuntur assumenda at eius quae corrupti fuga placeat rerum libero, autem quisquam a facilis consectetur? Voluptate sapiente ex voluptatum autem asperiores corrupti necessitatibus culpa veritatis, perspiciatis error similique iure rerum recusandae quibusdam nulla architecto ratione saepe facilis at quam optio maxime! Non ullam officiis error vero incidunt commodi voluptates molestiae beatae, soluta fugit adipisci quia nobis harum velit consectetur vel ipsa rerum doloremque neque repellat a. Incidunt dolor at, tempore reiciendis labore, aut consequuntur magnam voluptate veniam, ad maxime laboriosam quam? Accusantium deserunt architecto ea dolorem debitis eum expedita ipsa alias quia eveniet perspiciatis, in accusamus, sapiente earum consequatur quo necessitatibus! Soluta dolorem a iure, quisquam voluptas illo accusantium ratione ea? Repudiandae consectetur debitis fugiat voluptatibus totam quis explicabo. Tempora modi excepturi unde vitae earum? Aspernatur unde, veniam fuga cumque laudantium earum repudiandae corporis obcaecati similique illo accusamus, laboriosam consequatur consequuntur tempora facere ab modi facilis minima a nam. Excepturi accusamus voluptatum saepe suscipit culpa, neque fugit, quia libero blanditiis hic aut tempore praesentium ad deserunt odio aspernatur officiis sed ratione minima ducimus error quos perferendis non! Sequi deleniti ipsa optio voluptates atque hic incidunt at ut iste quibusdam modi nisi veritatis repudiandae placeat sunt, reprehenderit autem. Delectus unde odio voluptas. Suscipit facere, distinctio earum dolorem quae, quia nostrum repudiandae, voluptatem sapiente cumque et porro neque. Molestiae odio cumque explicabo repellendus provident! Maiores fugit incidunt et ab exercitationem placeat magnam nobis delectus cupiditate molestiae porro error totam atque blanditiis eveniet, eos sint fuga cum culpa vitae dolorum sequi. Cumque voluptates excepturi aliquid. Ad dicta possimus harum eaque, esse eum iure sit ratione pariatur impedit rerum tempore sunt voluptas repudiandae aliquam cum dolore ipsum placeat, vitae vero? Assumenda consequatur optio temporibus ducimus est inventore vitae, distinctio fuga ab quibusdam magnam ipsam ullam sed maiores dolorem tempora sint voluptates velit, ex alias nemo iusto deserunt corrupti veritatis. Laboriosam eius autem perferendis incidunt cum minima suscipit, commodi obcaecati error aliquid, dolorum nemo et perspiciatis culpa harum aut aspernatur quis quas! Sunt excepturi atque expedita aliquid at mollitia possimus tenetur quia, molestiae tempore illo in et accusantium ullam rem cumque officia sint? Ab adipisci impedit repellat ad, deserunt maiores natus eaque architecto consequuntur nihil neque sit eius reiciendis velit, reprehenderit vel ullam, accusamus aspernatur. Sint eius officiis officia enim quo dolorum temporibus ipsa amet quam molestiae, aut alias vero repellat eum architecto quidem. Nobis esse, enim quam nam aliquid soluta cum eligendi odio quibusdam reiciendis voluptatum consequuntur. Quibusdam sed repellat animi! Rerum commodi eum aspernatur, sequi quis, modi veniam est, qui nobis esse voluptatibus. Nam error aliquam veniam omnis repellat obcaecati voluptatum ullam, sint quibusdam ab. Placeat, ratione nisi amet veritatis natus aliquid numquam unde alias cumque rem dolorum harum beatae molestias, veniam labore? Dolore consequuntur accusamus harum quam magni qui inventore, corrupti magnam modi labore, architecto nostrum nisi molestiae aliquam delectus consequatur ut unde sequi minus earum ipsam possimus dignissimos eaque expedita! Voluptatum cupiditate hic non quisquam similique. Blanditiis doloribus facilis maiores earum, voluptate dolore assumenda illo magnam aliquid. Soluta culpa quidem maxime commodi cupiditate velit at alias corporis laboriosam eum, ipsa et quisquam animi possimus, a rem assumenda, voluptatum magnam! Quam pariatur in ut, voluptates repellat asperiores blanditiis dolore fugit corrupti illo ipsa doloremque, nostrum corporis aspernatur laborum eaque, alias aperiam fugiat. Earum nihil velit fuga tenetur tempore officiis possimus. Nostrum distinctio cumque sequi, iure non mollitia similique nihil accusamus quo facere repellat fugit soluta, vero recusandae ipsam voluptate error voluptates, iusto ea. Accusantium qui, eius nihil placeat explicabo ex illum aliquam cum tempore mollitia inventore iste repudiandae laborum omnis consequatur itaque soluta non velit reiciendis iusto harum quas modi optio animi! Harum deleniti voluptas libero animi rerum saepe sed, officia, perspiciatis eos assumenda minus ab a, maiores in aliquid neque tempore et? Minima hic eos velit quod! Sunt quibusdam quos eaque! Vel recusandae repellendus porro, ipsum cum nostrum rem asperiores consectetur expedita culpa aliquam at quibusdam sed modi doloribus eligendi fugiat ab debitis? Dolore commodi fugiat possimus asperiores cupiditate et, cum, molestias animi doloremque deserunt qui? Assumenda aliquam, similique accusantium doloremque, officia dignissimos debitis veniam cupiditate voluptas quidem inventore, accusamus a iure. Dolor, odio inventore amet tenetur consequatur consectetur magni sit eos libero illum est a, deserunt maxime esse dolores? Perspiciatis aliquam maiores odio quos consequatur quod fugiat quia alias non autem. Magnam quidem nihil distinctio nam nemo, eius aliquam tenetur temporibus nulla at nobis praesentium ad accusantium a accusamus voluptatem reprehenderit sed pariatur error. Ex, totam iure. Dolorem libero dolores nesciunt maiores ea tempore dolor, similique maxime totam quibusdam explicabo laboriosam nemo.
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
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
    images(first: 1) {
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

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
