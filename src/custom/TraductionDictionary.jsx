import { createContext, useContext, useState } from "react";

export const TraductionDictionaryContext = createContext();

export const TraductionDictionaryProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  const traduction = {
    es: {
      title: "MUNDO MATERO",
      description: "Conseguí los mejores mates, termos, bombillas y materas.",
      carouselTitle: "¡NUESTROS PRODUCTOS MÁS VENDIDOS!",
      prev: "Anterior",
      next: "Siguiente",
      home: "INICIO",
      register: "Registrarme",
      login: "Iniciar Sesión",
      contact: "CONTACTANOS",
      phone: "+54 2474181222",
      email: "materos@gmail.com",
      address: "Zeballos 1341, Rosario",
      offersPayments: "OFERTAS Y PAGOS",
      freeShipping: "ENVIOS GRATIS A TODO EL PAIS",
      installments: "3 CUOTAS SIN INTERES",
      warranty: "6 MESES DE GARANTíA",
      socialMedia: "REDES SOCIALES",
      instagram: "INSTAGRAM",
      facebook: "FACEBOOK",
      twitter: "TWITTER",
      terms: "© 2024. Términos y Condiciones.",
      aboutUsTitle: "Sobre Nosotros",
      aboutUsContent: `Bienvenidos a Mundo Matero, tu tienda en línea especializada en todo
      lo relacionado con el mate. Somos apasionados por esta tradición tan
      arraigada en nuestra cultura, y nos dedicamos a ofrecer los mejores
      productos para que disfrutes de un buen mate en cualquier momento y
      lugar.`,
    },
    en: {
      title: "MUNDO MATERO",
      description: "Get the best mates, thermoses, straws, and mate holders.",
      carouselTitle: "OUR BEST SELLING PRODUCTS!",
      prev: "Previous",
      next: "Next",
      home: "HOME",
      register: "Register",
      login: "Login",
      contact: "CONTACT US",
      phone: "+54 2474181222",
      email: "materos@gmail.com",
      address: "Zeballos 1341, Rosario",
      offersPayments: "OFFERS AND PAYMENTS",
      freeShipping: "FREE SHIPPING NATIONWIDE",
      installments: "3 INTEREST-FREE INSTALLMENTS",
      warranty: "6 MONTHS WARRANTY",
      socialMedia: "SOCIAL MEDIA",
      instagram: "INSTAGRAM",
      facebook: "FACEBOOK",
      twitter: "TWITTER",
      terms: "© 2024. Terms and Conditions.",
      aboutUsTitle: "About Us",
      aboutUsContent: `Welcome to Mate World, your online store specializing in everything
      related to mate. We are passionate about this tradition so
      deeply rooted in our culture, and we are dedicated to offering the best
      products so you can enjoy a good mate anytime and
      anywhere.`,
    },
  };

  const t = (key) => traduction[language][key] || key;

  return (
    <TraductionDictionaryContext.Provider value={{ t, setLanguage }}>
      {children}
    </TraductionDictionaryContext.Provider>
  );
};

export const useTraduction = () => useContext(TraductionDictionaryContext);
