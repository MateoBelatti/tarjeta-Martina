import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { CalendarHeart, Gem, Gift, CheckCircle, Camera, MapPin, Copy } from 'lucide-react';
import presentacionImg from './assets/presentacion.png';
import qr from "./assets/qr-code.png";

const datosEvento = {
  nombre: "Martina",
  edad: "15",
  fraseBienvenida: "Hay momentos que solo ocurren una vez en la vida. Me encantaría compartir este con vos.",
  fechaEvento: "Sábado 12 de Septiembre 2026",
  horaEvento: "21:00",
  fechaDate: "2026-09-12T21:00:00",
  dressCode: "ELEGANTE SPORT",
  aliasMp: "martu121212",
  fechaLimiteRsvp: "1 de Septiembre",
  urlGoogleFormEmbed: "https://docs.google.com/forms/d/e/1FAIpQLSfkGoS9gAfwmazUfG-OMAUou_m1huTvoyJFyKfdXQSgFY3Zrg/viewform?usp=header",
  nombreLugar: "Salón ACA Unidad Turistica Las Grutas",
  direccion: "Bariloche 98",
  lat: "-40.807302",
  lng: "-65.081739"
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Divider = () => (
  <div className="w-16 h-[1px] bg-current mx-auto my-6 opacity-50"></div>
);

const Section = ({ children, bgLila = false, id }: { children: React.ReactNode, bgLila?: boolean, id?: string }) => (
  <section 
    id={id}
    className={`min-h-screen flex flex-col justify-center items-center py-16 px-6 ${bgLila ? 'bg-lila text-white' : 'bg-white text-gray-800'}`}
  >
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center text-center"
    >
      {children}
    </motion.div>
  </section>
);

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 mt-8 justify-center">
      {[
        { label: 'DÍAS', value: timeLeft.days },
        { label: 'HORAS', value: timeLeft.hours },
        { label: 'MINUTOS', value: timeLeft.minutes },
        { label: 'SEGUNDOS', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center w-20 md:w-24">
          <div className="text-5xl md:text-6xl font-display mb-1">{String(item.value).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm tracking-widest">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default function InvitacionMartina() {
  const [copied, setCopied] = useState(false);
  const [ingresado, setIngresado] = useState(false);

  const handleCopyAlias = () => {
    navigator.clipboard.writeText(datosEvento.aliasMp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      {!ingresado ? (
        <motion.div 
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-serif text-gray-800"
        >
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-[0.2em] mb-6 text-gray-600">
            Mis 15 {datosEvento.nombre}
          </h1>
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] max-w-sm mx-auto mb-10 text-gray-500 leading-relaxed">
            Quiero invitarte a compartir una de las noches más importantes de mi vida.
          </p>
          <button 
            onClick={() => setIngresado(true)}
            className="bg-[#BFA9B9] text-white px-10 py-3 rounded uppercase tracking-widest text-sm hover:bg-opacity-90 transition-all shadow-sm"
          >
            Ingresar
          </button>
        </motion.div>
      ) : (
        <motion.div 
          key="invitacion"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full min-h-screen bg-white overflow-hidden relative font-serif"
        >
      
      {/* 1. Hero */}
      <section className="relative min-h-screen flex flex-col">
        <div className="flex-grow relative w-full h-[70vh] md:h-[85vh]">
          <img src={presentacionImg} alt="Hero" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {/* <p className="text-xl md:text-3xl tracking-[0.3em] uppercase mb-4">Mis</p>
              <h1 className="text-8xl md:text-[10rem] font-display leading-none mb-4">{datosEvento.edad}</h1>
              <h2 className="text-6xl md:text-8xl font-display italic capitalize">{datosEvento.nombre}</h2> */}
            </motion.div>
          </div>
        </div>
        <div className="bg-white text-gray-800 p-10 md:p-16 text-center flex items-center justify-center h-[30vh] md:h-[15vh]">
          <motion.p variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg md:text-2xl max-w-3xl leading-relaxed mx-auto">
            <b>
                "{datosEvento.fraseBienvenida}"
            </b>
          </motion.p>
        </div>
      </section>

      {/* 2. Contador */}
      <Section bgLila>
        <CalendarHeart size={48} strokeWidth={1.5} className="mb-6" />
        <h2 className="text-4xl md:text-5xl tracking-[0.2em] uppercase font-display">¿Cuándo?</h2>
        <Divider />
        <p className="text-3xl md:text-4xl mb-2">{datosEvento.fechaEvento}</p>
        <p className="text-2xl md:text-3xl tracking-widest">{datosEvento.horaEvento} HS</p>
        <Countdown targetDate={datosEvento.fechaDate} />
      </Section>

      {/* 7. Ubicación */}
      <Section>
        <MapPin size={40} strokeWidth={1} className="mb-6 text-lila" />
        <h2 className="text-3xl tracking-[0.2em] uppercase font-display text-gray-800">¿Dónde?</h2>
        <Divider />
        <h3 className="text-2xl font-display mb-2">{datosEvento.nombreLugar}</h3>
        <p className="text-lg mb-8 text-gray-600">{datosEvento.direccion}</p>
        
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${datosEvento.lat},${datosEvento.lng}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-lila text-white px-8 py-3 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-opacity-90 transition-all shadow-md"
        >
          <MapPin size={18} />
          Ver ubicación
        </a>
      </Section>


      {/* 3. Dress Code */}
      <Section bgLila>
        <Gem size={40} strokeWidth={1} className="mb-6" />
        <h2 className="text-3xl tracking-[0.2em] uppercase font-display">Dress Code</h2>
        <Divider />
        <p className="text-xl tracking-[0.1em]">{datosEvento.dressCode}</p>
      </Section>

      {/* 4. Regalos */}
      <Section>
        <Gift size={40} strokeWidth={1} className="mb-6 text-lila" />
        <h2 className="text-3xl tracking-[0.2em] uppercase font-display text-gray-800">Regalos</h2>
        <Divider />
        <p className="text-lg text-center leading-relaxed mb-8 text-gray-600">
          Nada es más importante que tu presencia, pero si deseas hacerme un presente podés depositarlo en la urna que se encontrará en el salón, o hacer una transferencia al siguiente alias:
        </p>
        
        <div className="border border-lila rounded-xl p-6 w-full max-w-sm flex flex-col items-center gap-4 bg-gray-50 relative">
          <p className="font-mono font-bold text-xl text-gray-800">{datosEvento.aliasMp}</p>
          <button 
            onClick={handleCopyAlias}
            className="flex items-center gap-2 bg-lila text-white px-6 py-2 rounded-full uppercase tracking-wider text-sm hover:bg-opacity-90 transition-all"
          >
            <Copy size={16} />
            Copiar alias
          </button>
          {copied && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-10 bg-gray-800 text-white text-xs px-3 py-1 rounded-md"
            >
              ¡Alias copiado!
            </motion.div>
          )}
        </div>
        
        {/* Placeholder para QR opcional */}
        {/* <img src="/qr-mp.png" alt="QR Mercado Pago" className="w-32 h-32 mt-8 rounded-lg shadow-sm object-cover" /> */}
      </Section>

      {/* 5. RSVP */}
      <Section bgLila>
        <CheckCircle size={40} strokeWidth={1} className="mb-6" />
        <h2 className="text-3xl tracking-[0.2em] uppercase font-display leading-snug">¡Confirmá tu asistencia!</h2>
        <Divider />
        <p className="text-lg mb-8 uppercase tracking-wider">Antes del {datosEvento.fechaLimiteRsvp}</p>
        
        <div className="w-full max-w-3xl bg-white p-2 md:p-6 rounded-2xl shadow-lg">
          <iframe 
            src={datosEvento.urlGoogleFormEmbed} 
            width="100%" 
            height="500" 
            frameBorder="0" 
            className="rounded-xl bg-white"
            title="RSVP Form"
          >
            Cargando…
          </iframe>
        </div>
      </Section>

      {/* 6. Fotos */}
      <Section>
        <Camera size={40} strokeWidth={1} className="mb-6 text-lila" />
        <h2 className="text-3xl tracking-[0.2em] uppercase font-display text-gray-800">Fotos</h2>
        <Divider />
        <p className="text-lg text-center leading-relaxed mb-8 text-gray-600">
          Podés subir tus fotos durante la noche en este QR
        </p>
        <img 
          src={qr} 
          alt="QR para subir fotos" 
          className="w-48 h-48 rounded-xl shadow-md border-2 border-gray-100 object-cover" 
        />
      </Section>

      

        </motion.div>
      )}
    </AnimatePresence>
  );
}
