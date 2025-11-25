/**
 * Utilidades compartidas para los componentes de candidatos
 * CORREGIDO: Usa rutas estáticas a /public/images/ y /public/logos/
 */

import { LOGOS_PARTIDOS } from "../../../../constants/electoralConstants";

// Mapa de fotos por nombre del candidato (Rutas a public/images)
export const fotosPorNombre = {
  "Julio Chávez": "/images/Julio_Chavez.jpg",
  "Rafael López Aliaga": "/images/rafael_lopez_aliaga.jpg",
  "Keiko Fujimori": "/images/keiko_fujimori.jpg",
  "César Acuña": "/images/cesar_acuna.jpg",
  "Carlos Álvarez": "/images/carlos_alvarez.jpg",
  "Alfonso López Chau": "/images/alfonso_lopez_chau.jpg",
  "Phillip Butters": "/images/phillip_butters.jpg",
  "Marisol Pérez Tello": "/images/marisol_perez_tello.jpg",
  "Norma Yarrow": "/images/norma_yarrow_lumbreras.jpg",
  "Norma Yarrow Lumbreras": "/images/norma_yarrow_lumbreras.jpg",
  "José Cueto": "/images/jose_cueto_aservi.jpg",
  "José Cueto Aservi": "/images/jose_cueto_aservi.jpg",
  "Jorge Montoya": "/images/jorge_montoya_manrique.jpg",
  "Jorge Montoya Manrique": "/images/jorge_montoya_manrique.jpg",
};

// Mapa de logos por nombre del partido (Rutas a public/logos)
// NOTA: Asegúrate de mover también tu carpeta 'logos' a 'public/'
export const logosPorPartido = {
  "Acción Popular": "/logos/accion-popular.png",
  "Renovación Popular": "/logos/renovacion_popular.png",
  "Fuerza Popular": "/logos/fuerza_popular.png",
  "Alianza para el Progreso": "/logos/app.png",
  "País para Todos": "/logos/pais_para_todos.png",
  "Ahora Nación": "/logos/ahora_nacion.png",
  "Avanza País": "/logos/avanza_pais.png",
  "Primero la Gente": "/logos/primero_la_gente.png",
};

// Función para obtener foto de candidato
export const getFotoCandidato = (candidato) => {
  // Si ya tiene foto y no es una URL externa, usarla
  if (candidato.foto && typeof candidato.foto === 'string' && !candidato.foto.includes('http') && !candidato.foto.includes('pravatar') && !candidato.foto.includes('dicebear')) {
    return candidato.foto;
  }
  // Buscar por nombre
  return fotosPorNombre[candidato.nombre] || null;
};

// Función para obtener logo de partido
export const getLogoPartido = (partido) => {
  // Intenta buscar en el mapa local, o usa la constante, o devuelve null
  return logosPorPartido[partido] || LOGOS_PARTIDOS[partido] || null;
};

// Función para obtener las iniciales del partido para el símbolo
export const getPartidoSimbolo = (partido) => {
  if (!partido) return "??";
  const palabras = partido.split(" ");
  if (palabras.length >= 2) {
    return palabras[0][0] + palabras[1][0];
  }
  return partido.substring(0, 2).toUpperCase();
};

// Función para obtener un color basado en el nombre del partido
export const getPartidoColor = (partido) => {
  if (!partido) return "bg-gray-500";
  const colors = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
    "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-indigo-500",
    "bg-teal-500", "bg-cyan-500", "bg-amber-500", "bg-lime-500"
  ];
  const index = partido.length % colors.length;
  return colors[index];
};

// Función para mapear candidato del backend al formato del frontend
export const mapearCandidatoDesdeBackend = (candidatoBackend, partidosMap) => {
  // Validar que candidatoBackend sea un objeto válido
  if (!candidatoBackend || typeof candidatoBackend !== 'object') {
    throw new Error("Candidato inválido: debe ser un objeto");
  }
  
  // Detectar el tipo de modelo basado en los campos presentes
  const esCongresista = candidatoBackend.nombres !== undefined && candidatoBackend.apellidos !== undefined && candidatoBackend.region !== undefined;
  const esParlamentario = candidatoBackend.nombres !== undefined && candidatoBackend.apellidos !== undefined && candidatoBackend.region === undefined && candidatoBackend.dni !== undefined;
  const esPresidente = candidatoBackend.nombres !== undefined && candidatoBackend.apellidos !== undefined && candidatoBackend.dni === undefined;
  
  // Obtener ID del partido según el modelo
  let idPartido = null;
  if (candidatoBackend.idPartido) {
    idPartido = candidatoBackend.idPartido;
  } else if (candidatoBackend.partidoPolitico) {
    // Si viene como objeto anidado
    idPartido = candidatoBackend.partidoPolitico.idPartido || candidatoBackend.partidoPolitico.id;
  }
  
  const nombrePartido = partidosMap && idPartido 
    ? (partidosMap[idPartido] || "Sin partido")
    : "Sin partido";
  
  // Construir nombre completo según el modelo
  let nombreCompleto = "";
  if (esCongresista || esParlamentario || esPresidente) {
    // Modelos con nombres y apellidos separados
    nombreCompleto = `${candidatoBackend.nombres || ""} ${candidatoBackend.apellidos || ""}`.trim();
  } else {
    // Modelo general con nombreCompleto
    nombreCompleto = candidatoBackend.nombreCompleto || candidatoBackend.nombre || "";
  }
  
  // Obtener ID según el modelo
  const id = candidatoBackend.idCandidato || candidatoBackend.id || null;
  
  // Obtener foto según el modelo
  const foto = candidatoBackend.fotoUrl || candidatoBackend.foto || "";
  
  // Obtener distrito/región según el modelo
  const distrito = candidatoBackend.region || candidatoBackend.distrito || "";
  
  return {
    id: id,
    idCandidato: id,
    nombre: nombreCompleto,
    nombreCompleto: nombreCompleto,
    partidoPolitico: nombrePartido,
    idPartido: idPartido,
    cargo: candidatoBackend.cargo || (esCongresista ? "Congresista" : esParlamentario ? "Parlamentario Andino" : ""),
    distrito: distrito,
    foto: foto,
    estado: candidatoBackend.estado || "Activo",
    biografia: candidatoBackend.biografia || "",
    propuestas: Array.isArray(candidatoBackend.propuestas) ? candidatoBackend.propuestas : [],
    numeroLista: candidatoBackend.numeroEnLista || candidatoBackend.numeroLista || 0,
    dni: candidatoBackend.dni || "",
  };
};