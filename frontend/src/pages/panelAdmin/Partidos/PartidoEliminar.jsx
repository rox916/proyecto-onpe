import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";

export default function PartidoEliminar({ isOpen, onClose, onConfirm, partido }) {

  // Bloquear el scroll del body mientras el modal esté abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen || !partido) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      
      {/* Fondo oscuro sin blur */}
      <div className="fixed inset-0 bg-black/40" />

      {/* Contenedor principal del modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 z-[10000] overflow-y-auto max-h-[90vh]"
      >

        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-bold text-red-600">Eliminar Partido</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* MENSAJE */}
        <p className="text-gray-700">
          ¿Estás seguro de eliminar el partido{" "}
          <strong>{partido.nombre}</strong>?
        </p>

        {/* BOTONES */}
        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>

      </motion.div>
    </div>
  );
}
