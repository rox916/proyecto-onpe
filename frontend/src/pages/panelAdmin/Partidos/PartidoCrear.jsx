import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { X, PlusCircle } from "lucide-react";

export default function PartidoCrear({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    nombre: "",
    abreviatura: "",
    estado: "Activo",
  });

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      alert("Por favor ingresa el nombre del partido.");
      return;
    }
    onSave({ ...form, id: Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Fondo oscuro sin blur */}
      <div className="fixed inset-0 bg-black/40" />

      {/* Contenedor principal con animación */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 z-[10000] overflow-y-auto max-h-[90vh]"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-bold text-[#1A2C56]">Crear Nuevo Partido</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            title="Cerrar"
          >
            ×
          </button>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">

          {/* Nombre */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Nombre *</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
          </div>

          {/* Abreviatura */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Abreviatura *</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={form.abreviatura}
              onChange={(e) => setForm({ ...form, abreviatura: e.target.value })}
              required
            />
          </div>

          {/* Estado */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Estado</label>
            <select
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
            >
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              Crear Partido
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
