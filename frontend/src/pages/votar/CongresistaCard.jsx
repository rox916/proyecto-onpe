import { motion } from "framer-motion";
import { CheckCircle, Eye } from "lucide-react";

export default function CongresistaCard({ 
  candidato, 
  estaSeleccionado, 
  onSelect, 
  onVerDetalles, 
  darkMode 
}) {
  // --- IMAGEN POR DEFECTO ---
  // Asegúrate de guardar tu imagen 'congresista.jpg' como 'default_congresista.jpg'
  // en la carpeta: frontend/public/images/
  const DEFAULT_IMAGE = "/images/default_congresista.jpg";

  // --- NORMALIZACIÓN DE DATOS ---
  // Esto permite que la tarjeta funcione con cualquier tipo de candidato (Presidente, Congresista, Andino)
  const foto = candidato.fotoUrl || candidato.foto;
  const nombre = candidato.nombres || candidato.nombre || "Candidato";
  const apellidos = candidato.apellidos || "";
  const partido = candidato.nombrePartido || candidato.partidoNombre || "Sin partido";
  
  // Detecta el logo donde sea que venga
  const logoPartido = candidato.imagenPartido || candidato.partidoLogo || candidato.partidoSimbolo;
  
  // Si no tiene región (ej. Parlamento Andino), mostramos "Nacional"
  const distrito = candidato.region || candidato.distrito || "Nacional";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(candidato.id, nombre)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all ${
        estaSeleccionado
          ? `ring-4 ring-green-400 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`
          : `border-2 ${darkMode ? "border-gray-700 bg-gray-800 hover:border-blue-500" : "border-gray-300 bg-white hover:border-blue-500"}`
      }`}
    >
      {/* Icono de Check (Solo si está seleccionado) */}
      {estaSeleccionado && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-3 right-3 z-10"
        >
          <CheckCircle size={36} className="text-white bg-green-500 rounded-full" strokeWidth={3} />
        </motion.div>
      )}

      {/* FOTO DEL CANDIDATO (Con Fallback Inteligente) */}
      <div className={`relative h-56 overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
        <img
          // 1. Usa la foto real, si no existe usa el default
          src={foto || DEFAULT_IMAGE}
          alt={nombre}
          className={`w-full h-full object-cover object-top transition-all ${
            estaSeleccionado ? "" : "grayscale hover:grayscale-0"
          }`}
          // 2. Si la foto real da error 404, cambia al default automáticamente
          onError={(e) => {
            e.target.onerror = null; // Previene bucles
            e.target.src = DEFAULT_IMAGE;
          }}
        />
      </div>

      {/* Nombre */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
        <p className="text-white text-lg font-bold text-center truncate">
          {nombre} {apellidos}
        </p>
      </div>

      {/* Info */}
      <div className={`p-4 space-y-3 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        
        {/* Distrito / Región */}
        <div className="text-center">
          <span className={`inline-block px-3 py-2 rounded-md text-sm font-semibold ${darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"}`}>
            {distrito}
          </span>
        </div>

        {/* Logo y Nombre del Partido */}
        <div className="flex flex-col items-center justify-center gap-2">
          {logoPartido ? (
            <div className="h-10 w-full flex items-center justify-center">
              <img 
                src={logoPartido} 
                alt="Partido" 
                className="h-full object-contain" 
                onError={(e) => e.target.style.display = 'none'} // Ocultar si falla el logo
              />
            </div>
          ) : (
             <span className="text-xs text-gray-400 font-bold">SIN LOGO</span>
          )}
          
          <p className={`text-sm font-bold uppercase text-center ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
            {partido}
          </p>
        </div>

        {/* Propuestas (Resumen) */}
        <div className={`border-t pt-3 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <p className={`text-xs font-bold mb-2 uppercase ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Propuestas:
          </p>
          <div className="space-y-1">
            {(candidato.propuestas && candidato.propuestas.length > 0) ? (
                candidato.propuestas.slice(0, 2).map((prop, i) => (
                  <p key={i} className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    • {prop}
                  </p>
                ))
            ) : (
                <p className={`text-xs italic ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    No hay propuestas registradas.
                </p>
            )}
          </div>
        </div>

        {/* Botón Detalles */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVerDetalles(candidato);
          }}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-blue-300" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          <Eye className="w-4 h-4" />
          Ver Detalles
        </button>
      </div>
    </motion.div>
  );
}