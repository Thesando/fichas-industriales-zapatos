import { Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * @param {FooterProps}
 */
export function Footer({ footer: footerPromise, header, publicStoreDomain }) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            {footer?.menu && header.shop.primaryDomain?.url && (
              <FooterMenu
                menu={footer.menu}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            )}
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: string;
 * }}
 */
function FooterMenu() {
  return (
    <nav className="footer-menu" role="navigation">
      <div className="row w-100 m-0">
        {/* Columna WhatsApp */}
        <div className='col-12 col-md-4 footer-whatsapp mb-4 mb-md-0'>
          <h6 className='whatsapp-title'>Ponte en contacto con nosotros</h6>
          <span className='whatsapp-span'>por televentas</span>
          <a href="#" target='_blank' className='whatsapp-a'>8120301588</a>
        </div>

        {/* Columna Institucional */}
        <div className='col-12 col-md-4 footer-inst mb-4 mb-md-0'>
          <h6 className='inst-title'>Institucional</h6>
          <div className='d-block'>
            <ul className="list-unstyled text-center text-md-start">
              <li>
                <NavLink to="/about-bracol" className='nav-inst'>Sobre bracol</NavLink>
              </li>
              <li>
                <NavLink to="/become-a-distributor" className='nav-inst'>Conviértase en distribuidor</NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Columna Catálogos */}
        <div className='col-12 col-md-4 footer-categories'>
          <h6 className='catalog-title'>Catálogos</h6>
          <ul className="list-unstyled text-center text-md-start">
            <li>
              <NavLink to="/categorias" className='nav-inst'>Todas las categorías</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
