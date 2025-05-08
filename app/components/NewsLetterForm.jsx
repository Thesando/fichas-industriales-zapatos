import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewsletterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value.trim();
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
      return;
    }

    // Obtener correos del localStorage
    const storedEmails = JSON.parse(localStorage.getItem('newsletterEmails') || '[]');

    // Verificar duplicados
    if (storedEmails.includes(email)) {
      toast.warning('¡Este correo ya está registrado!', {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    const form = e.target;
    const formData = new FormData(form);

    try {
      // 1. Guardar localmente primero
      localStorage.setItem(
        'newsletterEmails',
        JSON.stringify([...storedEmails, email])
      );

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
          autoClose: 3000,
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
  };

  return (
    <section className='container-fluid py-5 eight-section'>
      <div className='row justify-content-center'>
        <div className='col-12 text-center mb-3'>
          <h6 className='text-uppercase text-spacing-60 newsletter'>NEWSLETTER</h6>
          <p className='newsletter2'>RECIBA NOVEDADES</p>
        </div>
        <div className='col-lg-6 col-md-8 col-sm-10 offset-lg-1'>
          <form
            autoComplete="off"
            method="post"
            onSubmit={handleSubmit}
            className="w-100"
            style={{ maxWidth: 'none' }}
          >
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
  );
}