import { NavLink, Link } from '@remix-run/react';
import '../styles/header-bracol.css';
import { useState } from 'react';

export function Header() {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLines, setShowLines] = useState(false);
  const [showLines2, setShowLines2] = useState(false);
  const [showLines3, setShowLines3] = useState(false);
  const [showLines4, setShowLines4] = useState(false);

  const toggleSubMenu = (menuKey) => {
    setOpenSubMenu(openSubMenu === menuKey ? null : menuKey);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? '' : 'hidden';
  };

  const toggleLines = () => {
    setShowLines(!showLines);
  }

  const toggleLines2 = () => {
    setShowLines2(!showLines2);
  }

  const toggleLines3 = () => {
    setShowLines3(!showLines3);
  }

  const toggleLines4 = () => {
    setShowLines4(!showLines4);
  }

  return (
    <header className="header-bracol">
      {/* Primera fila: imágenes alineadas a la derecha */}
      <div className="header-top-row">
        <div className="header-images">
          {/* Logo 1 */}
          <Link to="https://www.steelflex.pro/es/casa/" className="logo-link desktop-only">
            <img
              src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/steelflex_logo_800x800.png?v=1744929195"
              alt="Logo 1"
              className="header-img"
            />
          </Link>

          {/* Logo 2 */}
          <Link to="https://www.fujiwara.pro" className="logo-link desktop-only">
            <img
              src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/Fujiwara_logo_800x800.png?v=1744929195"
              alt="Logo 2"
              className="header-img"
            />
          </Link>

          {/* Logo 3 */}
          <Link to="https://worksafe.com.py/en/home/" className="logo-link desktop-only">
            <img
              src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/Worksafe_logo_800x800.png?v=1744929195"
              alt="Logo 3"
              className="header-img"
            />
          </Link>

          {/* Separador */}
          <span className="separator desktop-only">/</span>

          {/* Logo 4 */}
          <Link to="https://www.instagram.com/bracol.pro/" className="logo-link">
            <img
              src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/instagram_logo_800x800.png?v=1744929195"
              alt="Logo X"
              className="header-img"
            />
          </Link>

          {/* Logo 5 */}
          <Link to="https://www.linkedin.com/company/bracolpro/?originalSubdomain=br" className="logo-link">
            <img
              src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/linkedin_logo_800x800.png?v=1744929195"
              alt="Logo 5"
              className="header-img"
            />
          </Link>

          {/* Logo 6 */}
          <Link to="https://www.linkedin.com/company/bracolpro/?originalSubdomain=br" className="logo-link">
            <img
              src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/youtube_logo_blanco_800x800.png?v=1744929195"
              alt="Logo 6"
              className="header-img"
            />
          </Link>

          {/* Logo 7 */}
          <Link to="https://www.facebook.com/bracol.pro" className="logo-link">
            <img
              src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/facebook_logo_800x800.png?v=1744929195"
              alt="Logo 7"
              className="header-img"
            />
          </Link>
        </div>
      </div>

      {/* Segunda fila: logo, menú y barra de búsqueda */}
      <div className="header-bottom-row">
        {/* Logo */}
        <NavLink to="/" className="logo-link">
          <img
            src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/bracol_logo_800x800.png?v=1744929177" // URL de tu logo
            alt="Bracol"
            className="logo"
          />
        </NavLink>

        {/* Menú principal - oculto por defecto en movil */}
        <nav className="main-menu">
          <NavLink to="/" className="menu-item">Inicio</NavLink>

          <div className='menu-item-wrapper'>
            <div className="menu-item">
              Productos
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="keyboard-down-arrow">
                <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
              </svg>
              <div className='popover-menu'>
                <div className='popover-column'>
                  <h2>Lineas</h2>
                  <NavLink to="/collections/acqua-flex" className="popover-item">Acqua Flex</NavLink>
                  <NavLink to="/collections/acqua-lev" className="popover-item">Acqua Lev</NavLink>
                  <NavLink to="/productos/linea3" className="popover-item">Antiestetico</NavLink>
                  <NavLink to="/productos/linea4" className="popover-item">Blanco</NavLink>
                  <NavLink to="/productos/linea5" className="popover-item">Color</NavLink>
                  <NavLink to="/productos/linea6" className="popover-item">Conductor</NavLink>
                  <NavLink to="/productos/linea7" className="popover-item">Detroit</NavLink>
                  <NavLink to="/productos/linea8" className="popover-item">Ecobotas</NavLink>
                  <NavLink to="/productos/linea9" className="popover-item">Electricista</NavLink>
                  <NavLink to="/productos/linea10" className="popover-item">Ella</NavLink>
                  <NavLink to="/productos/linea11" className="popover-item">Femme</NavLink>
                  <NavLink to="/productos/linea12" className="popover-item">Horizonte</NavLink>
                  <NavLink to="/productos/linea13" className="popover-item">Fabricante</NavLink>
                  <NavLink to="/productos/linea14" className="popover-item">Moto safe</NavLink>
                  <NavLink to="/productos/linea15" className="popover-item">Nobuck</NavLink>
                  <NavLink to="/productos/linea16" className="popover-item">Servicio</NavLink>
                  <NavLink to="/productos/linea17" className="popover-item">Turin</NavLink>
                </div>
                <div className='popover-column'>
                  <h2>Categorías</h2>
                  <div className='popover-item has-submenu' onClick={() => toggleSubMenu('calzado')}>
                    <div>
                      <span>Calzado</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
                      </svg>
                    </div>
                    {openSubMenu === 'calzado' && (
                      <div className="submenu">
                        <NavLink to="/categoria/sapatos" className="submenu-item">Zapatos</NavLink>
                        <NavLink to="/categoria/tenis" className="submenu-item">Tenis</NavLink>
                        <NavLink to="/categoria/botinas" className="submenu-item">Botas</NavLink>
                        <NavLink to="/categoria/coturnos" className="submenu-item">Botines</NavLink>
                      </div>
                    )}
                  </div>

                  <div className='popover-item has-submenu' onClick={() => toggleSubMenu('impermeable')}>
                    <div>
                      <span>Calzado impermeable</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
                      </svg>
                    </div>
                    {openSubMenu === 'impermeable' && (
                      <div className="submenu">
                        <NavLink to="/categoria/impermeavel1" className="submenu-item">Bota impermeable</NavLink>
                        <NavLink to="/categoria/impermeavel2" className="submenu-item">Bota impermeable con polainas</NavLink>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='menu-item-wrapper'>
            <div className="menu-item">
              Segmentos
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="keyboard-down-arrow">
                <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
              </svg>
              <div className='popover-menu'>
                <div className='popover-column'>
                  <NavLink to="segmentos/linea1" className="popover-item">Agronegocios</NavLink>
                  <NavLink to="segmentos/linea2" className="popover-item">Construcción civil</NavLink>
                  <NavLink to="collections/industria-alimentaria" className="popover-item">Industria alimentaria</NavLink>
                  <NavLink to="segmentos/linea4" className="popover-item">Offshore</NavLink>
                  <NavLink to="segmentos/linea5" className="popover-item">Mineria</NavLink>
                  <NavLink to="segmentos/linea6" className="popover-item">Energia y telecomunicaciones</NavLink>
                  <NavLink to="segmentos/linea7" className="popover-item">Azucar y alcohol</NavLink>
                  <NavLink to="segmentos/linea8" className="popover-item">Automotor</NavLink>
                  <NavLink to="segmentos/linea9" className="popover-item">Bebidas</NavLink>
                  <NavLink to="segmentos/linea10" className="popover-item">Electronica</NavLink>
                  <NavLink to="segmentos/linea11" className="popover-item">Farmacéutica</NavLink>
                  <NavLink to="segmentos/linea12" className="popover-item">Hoteles/Restaurantes/Limpieza/Hospital</NavLink>
                  <NavLink to="segmentos/linea13" className="popover-item">Industria quimica</NavLink>
                  <NavLink to="segmentos/linea14" className="popover-item">Metalurgia/Industria de acero</NavLink>
                  <NavLink to="segmentos/linea15" className="popover-item">Uniformización/servicios</NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className='menu-item-wrapper'>
            <div className="menu-item">
              Bracol
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="keyboard-down-arrow">
                <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
              </svg>
              <div className='popover-menu'>
                <div className='popover-column'>
                  <NavLink to="about-bracol" className="popover-item">Sobre bracol</NavLink>
                </div>
              </div>
            </div>
          </div>

          <NavLink to="/become-a-distributor" className="menu-item">Conviértase en un distribuidor</NavLink>
        </nav>

        {/* Barra de búsqueda (decorativa) */}
        <div>
          <form
            action="/results"
            method="get"
            className="search-bar"
          >
            <input
              type="text"
              name="q"
              placeholder="Búsqueda por C.A., Código Bracol o Nombre."
              className="search-input"
            />
            <button type="submit" className="search-button">
              <svg className="lupa-icon" width="18" height="18" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
          </form>
        </div>

      </div>

      <div className=' header-bottom-row-mobile'>
        <div>
          <button
            className="mobile-menu-toggle"
            onClick={toggleMenu}>
            ☰
          </button>
          <NavLink to="/" className="logo-link">
            <img
              src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/bracol_logo_800x800.png?v=1744929177"
              alt="Bracol"
              className="logo"
            />
          </NavLink>
        </div>
        <div>
          <form
            action="/results"
            method="get"
            className="search-bar"
          >
            <input
              type="text"
              name="q"
              placeholder="Búsqueda por C.A., Código Bracol o Nombre."
              className="search-input"
            />
            <button type="submit" className="search-button">
              <svg className="lupa-icon" width="18" height="18" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-container">
            <div>
              <button
                className="close-menu-button"
                onClick={toggleMenu}
              >
                ×
              </button>
            </div>
            <nav className='mobile-nav'>
              <NavLink to="/" className="mobile-menu-item">Inicio</NavLink>

              <div className="mobile-menu-item" onClick={toggleLines}>
                <span>Líneas</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`mobile-menu-arrow ${showLines ? 'open' : ''}`}
                >
                  <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
                </svg>
              </div>
              {showLines && (
                <div className="mobile-submenu">
                  <NavLink to="/collections/acqua-flex" className="mobile-submenu-item" onClick={toggleMenu}>Acqua Flex</NavLink>
                  <NavLink to="/collections/acqua-lev" className="mobile-submenu-item" onClick={toggleMenu}>Acqua Lev</NavLink>
                  <NavLink to="/productos/linea3" className="mobile-submenu-item" onClick={toggleMenu}>Antiestetico</NavLink>
                  <NavLink to="/productos/linea4" className="mobile-submenu-item" onClick={toggleMenu}>Blanco</NavLink>
                  <NavLink to="/productos/linea5" className="mobile-submenu-item" onClick={toggleMenu}>Color</NavLink>
                  <NavLink to="/productos/linea6" className="mobile-submenu-item" onClick={toggleMenu}>Conductor</NavLink>
                  <NavLink to="/productos/linea7" className="mobile-submenu-item" onClick={toggleMenu}>Detroit</NavLink>
                  <NavLink to="/productos/linea8" className="mobile-submenu-item" onClick={toggleMenu}>Ecobotas</NavLink>
                  <NavLink to="/productos/linea9" className="mobile-submenu-item" onClick={toggleMenu}>Electricista</NavLink>
                  <NavLink to="/productos/linea10" className="mobile-submenu-item" onClick={toggleMenu}>Ella</NavLink>
                  <NavLink to="/productos/linea11" className="mobile-submenu-item" onClick={toggleMenu}>Femme</NavLink>
                  <NavLink to="/productos/linea12" className="mobile-submenu-item" onClick={toggleMenu}>Horizonte</NavLink>
                  <NavLink to="/productos/linea13" className="mobile-submenu-item" onClick={toggleMenu}>Fabricante</NavLink>
                  <NavLink to="/productos/linea14" className="mobile-submenu-item" onClick={toggleMenu}>Moto safe</NavLink>
                  <NavLink to="/productos/linea15" className="mobile-submenu-item" onClick={toggleMenu}>Nobuck</NavLink>
                  <NavLink to="/productos/linea16" className="mobile-submenu-item" onClick={toggleMenu}>Servicio</NavLink>
                  <NavLink to="/productos/linea17" className="mobile-submenu-item" onClick={toggleMenu}>Turin</NavLink>
                </div>
              )}

              <div className="mobile-menu-item" onClick={toggleLines2}>
                <span>Categorias</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`mobile-menu-arrow ${showLines2 ? 'open' : ''}`}
                >
                  <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
                </svg>
              </div>
              {showLines2 && (
                <div className="mobile-submenu">
                  <NavLink to="/categoria/sapatos" className="mobile-submenu-item">Zapatos</NavLink>
                  <NavLink to="/categoria/tenis" className="mobile-submenu-item">Tenis</NavLink>
                  <NavLink to="/categoria/botinas" className="mobile-submenu-item">Botas</NavLink>
                  <NavLink to="/categoria/coturnos" className="mobile-submenu-item">Botines</NavLink>
                  <NavLink to="/categoria/impermeavel1" className="mobile-submenu-item">Bota impermeable</NavLink>
                  <NavLink to="/categoria/impermeavel2" className="mobile-submenu-item">Bota impermeable con polainas</NavLink>
                </div>
              )}

              <div className="mobile-menu-item" onClick={toggleLines3}>
                <span>Segmentos</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`mobile-menu-arrow ${showLines3 ? 'open' : ''}`}
                >
                  <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
                </svg>
              </div>
              {showLines3 && (
                <div className="mobile-submenu">
                  <NavLink to="segmentos/linea2" className="mobile-submenu-item">Construcción civil</NavLink>
                  <NavLink to="segmentos/linea1" className="mobile-submenu-item">Agronegocios</NavLink>
                  <NavLink to="collections/industria-alimentaria" className="mobile-submenu-item">Industria alimentaria</NavLink>
                  <NavLink to="segmentos/linea4" className="mobile-submenu-item">Offshore</NavLink>
                  <NavLink to="segmentos/linea5" className="mobile-submenu-item">Mineria</NavLink>
                  <NavLink to="segmentos/linea6" className="mobile-submenu-item">Energia y telecomunicaciones</NavLink>
                  <NavLink to="segmentos/linea7" className="mobile-submenu-item">Azucar y alcohol</NavLink>
                  <NavLink to="segmentos/linea8" className="mobile-submenu-item">Automotor</NavLink>
                  <NavLink to="segmentos/linea9" className="mobile-submenu-item">Bebidas</NavLink>
                  <NavLink to="segmentos/linea10" className="mobile-submenu-item">Electronica</NavLink>
                  <NavLink to="segmentos/linea11" className="mobile-submenu-item">Farmacéutica</NavLink>
                  <NavLink to="segmentos/linea12" className="mobile-submenu-item">Hoteles/Restaurantes/Limpieza/Hospital</NavLink>
                  <NavLink to="segmentos/linea13" className="mobile-submenu-item">Industria quimica</NavLink>
                  <NavLink to="segmentos/linea14" className="mobile-submenu-item">Metalurgia/Industria de acero</NavLink>
                  <NavLink to="segmentos/linea15" className="mobile-submenu-item">Uniformización/servicios</NavLink>
                </div>
              )}

              <div className="mobile-menu-item" onClick={toggleLines4}>
                <span>Bracol</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`mobile-menu-arrow ${showLines4 ? 'open' : ''}`}
                >
                  <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>
                </svg>
              </div>
              {showLines4 && (
                <div className="mobile-submenu">
                  <NavLink to="about-bracol" className="mobile-submenu-item" onClick={toggleMenu}>Sobre bracol</NavLink>
                </div>
              )}

              <NavLink to="/become-a-distributor" className="mobile-menu-item">Conviertase en distribuidor</NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}