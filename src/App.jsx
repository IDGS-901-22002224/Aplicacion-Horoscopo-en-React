import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [sign, setSign] = useState('');
  const [description, setDescription] = useState('');
  const nameInputRef = useRef(null); 
  const dateInputRef = useRef(null); 

  const getZodiacSign = (day, month) => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Tauro';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Géminis';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cáncer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Escorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagitario';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricornio';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Acuario';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Piscis';
    return 'Desconocido';
  };

  const signDescriptions = {
    Aries: 'Aries es un signo de fuego, conocido por su energía, valentía y liderazgo. Son impulsivos y apasionados.',
    Tauro: 'Tauro es un signo de tierra, valorado por su estabilidad, paciencia y amor por las comodidades. Son persistentes y leales.',
    Géminis: 'Géminis es un signo de aire, caracterizado por su curiosidad, versatilidad y habilidades comunicativas. Son sociables y adaptables.',
    Cáncer: 'Cáncer es un signo de agua, emotivo y protector. Valoran la familia y el hogar, y son intuitivos y compasivos.',
    Leo: 'Leo es un signo de fuego, con carisma, creatividad y generosidad. Aman el centro de atención y son leales a sus seres queridos.',
    Virgo: 'Virgo es un signo de tierra, analítico y detallista. Son prácticos, trabajadores y buscan la perfección en todo.',
    Libra: 'Libra es un signo de aire, equilibrado y diplomático. Valoran la armonía, la belleza y las relaciones justas.',
    Escorpio: 'Escorpio es un signo de agua, intenso y misterioso. Son apasionados, determinados y tienen una gran profundidad emocional.',
    Sagitario: 'Sagitario es un signo de fuego, aventurero y optimista. Aman la libertad, los viajes y la búsqueda de conocimiento.',
    Capricornio: 'Capricornio es un signo de tierra, ambicioso y disciplinado. Son responsables y enfocados en lograr sus metas a largo plazo.',
    Acuario: 'Acuario es un signo de aire, innovador e independiente. Valoran la originalidad, la amistad y las causas humanitarias.',
    Piscis: 'Piscis es un signo de agua, soñador y empático. Son creativos, intuitivos y tienen una gran sensibilidad emocional.',
    Desconocido: 'No se pudo determinar el signo. Verifica la fecha ingresada.',
  };

  const signSymbols = {
    Aries: '/aries.png',
    Tauro: '/tauro.png',
    Géminis: '/geminis.png',
    Cáncer: '/cancer.png',
    Leo: '/leo.png',
    Virgo: '/virgo.png',
    Libra: '/libra.png',
    Escorpio: '/escorpio.png',
    Sagitario: '/sagitario.png',
    Capricornio: '/capricornio.png',
    Acuario: '/acuario.png',
    Piscis: '/piscis.png',
    Desconocido: '/unknown.png',
  };

  const handleCalculate = () => {
    if (!birthDate) {
      setSign('Desconocido');
      setDescription(signDescriptions['Desconocido']);
      return;
    }
    const date = new Date(birthDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    if (isNaN(day) || isNaN(month) || day < 1 || day > 31 || month < 1 || month > 12) {
      setSign('Desconocido');
      setDescription(signDescriptions['Desconocido']);
      return;
    }
    const calculatedSign = getZodiacSign(day, month);
    setSign(calculatedSign);
    setDescription(signDescriptions[calculatedSign]);
  };

  const handleNameInputClick = (e) => {
    e.stopPropagation(); 
    nameInputRef.current.focus();
  };

  const handleDateInputClick = (e) => {
    e.stopPropagation(); 
    dateInputRef.current.focus();
  };

  return (
    <div className="app-container">
      <div className="container">
        {/* Header */}
        <header className="app-header">
          <h1 className="display-4">Horóscopo React</h1>
        </header>

        {/* Main Layout - DOS COLUMNAS */}
        <div className="app-main">
          {/* LADO IZQUIERDO - Formulario */}
          <div className="col-md-6">
            <div className="form-card">
              <div className="form-row">
                <div className="form-group name-field">
                  <label className="form-label">Nombre:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onClick={handleNameInputClick}
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                    tabIndex="1"
                    autoComplete="off"
                    ref={nameInputRef}
                    autoFocus 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha de Nacimiento:</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    onClick={handleDateInputClick}
                    className="form-control"
                    tabIndex="2"
                    ref={dateInputRef}
                  />
                </div>
                <div className="form-group button-field">
                  <button
                    onClick={handleCalculate}
                    className="btn btn-primary w-100"
                    tabIndex="3"
                  >
                    Calcular Signo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DERECHO - Resultados */}
          <div className="col-md-6">
            <div className="result-card">
              {!sign && (
                <p className="text-muted">
                  Completa los datos para conocer tu signo zodiacal
                </p>
              )}
              {sign && (
                <div className="result-content">
                  <h2 className="sign-title">Tu signo es: {sign}</h2>
                  <img
                    src={signSymbols[sign]}
                    alt={sign}
                    className="sign-image"
                  />
                  <p className="result-description">
                    <strong>{name}:</strong> {description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;