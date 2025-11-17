// Servicio para consumir la API pública de ubigeos de Perú
// API: eApi Perú - https://docs.e-api.net.pe/free/ubigeos.html

const UBIGEOS_API_BASE_URL = "https://api.e-api.net.pe";

/**
 * Obtiene todas las provincias de un departamento
 * @param {string} departamento - Nombre del departamento
 * @returns {Promise<Array>} Lista de provincias
 */
export const obtenerProvinciasPorDepartamento = async (departamento) => {
  try {
    // La API de eApi requiere el código del departamento o nombre
    // Vamos a usar un endpoint alternativo o transformar los datos
    const response = await fetch(`${UBIGEOS_API_BASE_URL}/ubigeos/departamento/${encodeURIComponent(departamento)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Si la API no funciona, usamos datos locales como fallback
      throw new Error("API no disponible, usando datos locales");
    }

    const data = await response.json();
    
    // Extraer provincias únicas del resultado
    const provincias = [...new Set(data.map(item => item.provincia))];
    return provincias.sort();
  } catch (error) {
    console.warn("Error al obtener provincias de la API, usando fallback:", error);
    // Fallback a datos locales
    return obtenerProvinciasLocal(departamento);
  }
};

/**
 * Obtiene todos los distritos de una provincia
 * @param {string} departamento - Nombre del departamento
 * @param {string} provincia - Nombre de la provincia
 * @returns {Promise<Array>} Lista de distritos
 */
export const obtenerDistritosPorProvincia = async (departamento, provincia) => {
  try {
    const response = await fetch(
      `${UBIGEOS_API_BASE_URL}/ubigeos/departamento/${encodeURIComponent(departamento)}/provincia/${encodeURIComponent(provincia)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("API no disponible, usando datos locales");
    }

    const data = await response.json();
    
    // Extraer distritos únicos del resultado
    const distritos = [...new Set(data.map(item => item.distrito))];
    return distritos.sort();
  } catch (error) {
    console.warn("Error al obtener distritos de la API, usando fallback:", error);
    // Fallback a datos locales
    return obtenerDistritosLocal(departamento, provincia);
  }
};

/**
 * Fallback: Obtiene provincias desde datos locales
 */
const obtenerProvinciasLocal = (departamento) => {
  // Importar dinámicamente para evitar problemas de carga
  return import("../data/ubigeos.json")
    .then((module) => {
      const ubigeosData = module.default;
      if (ubigeosData[departamento]) {
        return Object.keys(ubigeosData[departamento]).sort();
      }
      return [];
    })
    .catch(() => []);
};

/**
 * Fallback: Obtiene distritos desde datos locales
 */
const obtenerDistritosLocal = (departamento, provincia) => {
  return import("../data/ubigeos.json")
    .then((module) => {
      const ubigeosData = module.default;
      if (ubigeosData[departamento]?.[provincia]) {
        return ubigeosData[departamento][provincia].sort();
      }
      return [];
    })
    .catch(() => []);
};

