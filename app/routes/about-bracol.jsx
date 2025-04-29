import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/about-bracol.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AboutBracol() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = event.target.elements.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error('Por favor, introduce un correo electrónico válido.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return; // No enviamos el formulario si no es válido
    }

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mnndnwlp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Se registró correctamente el correo', {
          position: "top-right",
          autoClose: 3000, // 3 segundos
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        form.reset();
      } else {
        toast.error('Ocurrió un error. Por favor intenta de nuevo', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('Error al enviar: ', error);
    }
  }

  return (
    <>
      <div className="hero-section">
        <img
          src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/imagen_1_de_bracol_800x800.jpg?v=1745254176"
          alt="Imagen hero Bracol"
          className="hero-img"
        />
      </div>

      <div className="container-fluid my-5">
        <div className="row align-items-center">
          {/* Primera columna: Texto */}
          <div className="col-md-12 col-lg-6">
            <div className="text-content px-4">
              <h1 className="fw-bold section-title-about-bracol">Sobre Bracol</h1>
              <h2 className="slogan">PROTEGER A QUIENES MUEVEN EL MUNDO CON ESTILO.</h2>
              <p className="description">
                Somos una marca especializada con tradición en productos que garantizan la seguridad de los trabajadores en diversos sectores.
              </p>
              <p className="description">
                Evitamos lo ordinario y lo trivial para convertirnos en una referencia en el segmento.
              </p>
              <p className="description">
                Creemos en la innovación, combinando diseño y seguridad.
              </p>
            </div>
          </div>

          {/* Segunda columna: Imagen */}
          <div className="col-md-12 col-lg-6 overflow-hidden">
            <img
              src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/gif_sobre_bracol_2_800x800.gif?v=1745258274"
              className="img-fluid img-video"
              alt="Imagen Bracol"
            />
          </div>
        </div>
      </div>

      <section className="container-fluid p-0 third-section">
        <div className="row g-0">
          {/* Primer video - Dailymotion */}
          <div className="col-md-6 video-container">
            <h2 className="video-title d-none d-md-block">Nuestra manifiesto</h2>
            <div className="ratio ratio-16x9">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/ncdKzL316Qs?si=gmRN_nIi5gmwNYTa" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </div>

          {/* Segundo video - YouTube */}
          <div className="col-md-6 video-container">
            <h2 className="video-title d-none d-md-block">Conoce a Bracol</h2>
            <div className="ratio ratio-16x9">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/ji4ipQux3wU?si=lGH4eHvbvD1kAloz" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid py-5 fourth-section">
        <div className="row g-0">
          {/* MISIÓN */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4 section-box">
            <h2 className="mission-title bg-black text-white px-4 py-2">Misión</h2>
            <p className="mission-text mt-3">
              Producción y comercialización de calzado de seguridad que garantiza protección, comodidad y calidad de forma innovadora y sostenible.
            </p>
          </div>

          {/* VISIÓN */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4 section-box">
            <h2 className="mission-title bg-black text-white px-4 py-2">Visión</h2>
            <p className="mission-text mt-3">
              Aportar innovación y calidad en el segmento del calzado de seguridad.
            </p>
          </div>
        </div>
      </section>

      <section className='container-fluid py-5 sixth-section'>
        <div className='row g-0'>
          <div className='container d-flex flex-column justify-content-center align-items-center text-center p-4 section-box'>
            <h2 className="mission-title bg-black text-white px-4 py-2">Valores</h2>
            <div className='font-sans text-4 text-center h5 d-flex w-100 flex-wrap justify-content-around'>
              <div className='col-md-5 d-flex flex-column align-items-center mb-4 pl-0'>
                <h3 className='text-3 text-uppercase valores-title mt-3'>Sentido de propiedad</h3>
                <p className='valores-text'>Compromiso con resultados sostenibles</p>
              </div>
              <div className='col-md-5 d-flex flex-column align-items-center mb-4 pl-0'>
                <h3 className='text-3 text-uppercase valores-title mt-3'>Innovación</h3>
                <p className='valores-text'>En nuestros productos, soluciones, procesos y servicios</p>
              </div>
              <div className='col-md-5 d-flex flex-column align-items-center mb-4 pl-0'>
                <h3 className='text-3 text-uppercase valores-title mt-3'>Colaboración</h3>
                <p className='valores-text'>Sinergia y cooperación entre personas y equipos en la construcción de soluciones.</p>
              </div>
              <div className='col-md-5 d-flex flex-column align-items-center mb-4 pl-0'>
                <h3 className='text-3 text-uppercase valores-title mt-3'>Calidad</h3>
                <p className='valores-text'>Lo que producimos</p>
              </div>
              <div className='col-md-5 d-flex flex-column align-items-center mb-4 pl-0'>
                <h3 className='text-3 text-uppercase valores-title mt-3'>Ética e integridad</h3>
                <p className='valores-text'>En las relaciones, hacer siempre lo correcto, con ética y transparencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container-fluid py-5 seventh-section'>
        <div className='row g-0'>
          <div className='col-md-12 col-lg-5 ciudades'>
            <img src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/ciudades_principales_800x800.png?v=1745358470" className='img-fluid' alt="Imagenes-ciudades" />
          </div>
          <div className='col-md-12 col-lg-6 py-5'>
            <h2 className='diplay-3 text-uppercase text-center text-lg-left py-5 py-lg-0 our-business'>Nuestro negocio</h2>
            <p className='text-4 font-sans text-center text-lg-left business-text'>Somos reconocidos por la calidad de nuestros productos y servicios, con una oficina comercial en São Paulo y tres unidades de producción en Brasil y una en Paraguay.</p>
            <div className='row'>
              <div className='col-sm-2 col-md-6 text-center px-4 py-3'>
                <p className='mb-0 font-sans text-4 invisible'> Colaboradores</p>
                <p className='mb-0'>
                  <span className='text-3 display-3 business-result'>+2 MIL</span>
                </p>
                <p className='font-sans text-4 business-text'>empleados en cuatro plantas de Brasil y Paraguay.</p>
              </div>
              <div className='col-sm-2 col-md-6 text-center px-4 py-3'>
                <p className='mb-0 font-sans text-4 business-text'> Capacidad de producción:</p>
                <p className='mb-0'>
                  <span className='text-3 display-3 business-result'>15 Millones</span>
                </p>
                <p className='font-sans text-4 business-text'>de pares al año, incluido el calzado de seguridad y las botas impermeables.</p>
              </div>
              <div className='col-sm-2 col-md-6 text-center px-4 py-3'>
                <p className='mb-0 font-sans text-4 business-text'>Distribuimos en más de</p>
                <p className='mb-0'>
                  <span className='text-3 display-3 business-result'>20 paises</span>
                </p>
                <p className='font-sans text-4 business-text'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, corporis!</p>
              </div>
              <div className='col-sm-2 col-md-6 text-center px-4 py-3'>
                <p className='mb-0 font-sans text-4 business-text'>Nuestras marcas</p>
                <div className='row d-flex flex-wrap'>
                  <div className='col-12 col-sm-6 py-3 d-flex justify-content-center align-items-center align-items-end px-3'>
                    <img src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/bracol-logo-rojo_800x800.png?v=1745426636" alt="bracol-rojo" className='img-fluid' />
                  </div>
                  <div className='col-12 col-sm-6 py-3 d-flex justify-content-center align-items-center align-items-end px-3'>
                    <img src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/fujiwara-logo-rojo_800x800.png?v=1745426655" alt="bracol-rojo" className='img-fluid' />
                  </div>
                  <div className='col-12 col-sm-6 py-3 d-flex justify-content-center align-items-center align-items-end px-3'>
                    <img src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/steelflex-logo-rojo_800x800.png?v=1745426670" alt="bracol-rojo" className='img-fluid' />
                  </div>
                  <div className='col-12 col-sm-6 py-3 d-flex justify-content-center align-items-center align-items-end px-3'>
                    <img src="https://cdn.shopify.com/s/files/1/0688/5113/8848/files/worksafe-logo-rojo_800x800.png?v=1745426756" alt="bracol-rojo" className='img-fluid' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container-fluid py-5 eight-section'>
        <div className='row justify-content-center'>
          <div className='col-12 text-center mb-3'>
            <h6 className='text-uppercase text-spacing-60 newsletter'>NEWSLETTER</h6>
            <p className='newsletter2'>RECIBA NOVEDADES</p>
          </div>
          <div className='col-lg-6 col-md-8 col-sm-10 offset-lg-1'>
            <form autoComplete="off" method="post" onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 'none' }}>
              <div className='d-flex flex-column flex-sm-row'>
                <input
                  type="email"
                  name="email"
                  id="email_news"
                  placeholder="Inserte su email"
                  className="form-control newsletter-input"
                />
                <button
                  className="btn btn-primary newsletter-btn"
                  type="submit"
                >
                  Enviar
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
