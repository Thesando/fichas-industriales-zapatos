import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/become-a-distributo.css';
import '../styles/about-bracol.css';
import NewsLetterForm from '../components/NewsLetterForm.jsx';


export default function BecomeADistributor() {
    return (
        <section className="container-fluid my-5">
            <h1 className="text-center mb-4">Conviértase en un distribuidor</h1>

            <div className="row justify-content-center space-form">
                <form className="border p-4 rounded custom-form">
                    <div className="row">
                        {/* Columna izquierda - Primeros 4 inputs */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Nombre"
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="social"
                                    placeholder="Razón Social (opcional)"
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder="Ciudad"
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                />
                            </div>
                        </div>

                        {/* Columna derecha - Últimos 3 inputs */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Telefono Fijo (Opcional)"
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cnpj"
                                    placeholder="CNPJ (Opcional)"
                                />
                            </div>

                            <div className="mb-3">
                                <textarea
                                    className="form-control"
                                    id="message"
                                    rows="3"
                                    placeholder="Mensaje (Opcional)"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Botón de enviar - Centrado debajo de ambas columnas */}
                    <div className="row mt-3">
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary px-4">
                                Enviar Mensaje
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <NewsLetterForm />

        </section>
    );
}