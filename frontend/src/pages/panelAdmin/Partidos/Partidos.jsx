import React, { useState, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Flag } from "lucide-react";
import PartidoCrear from "./PartidoCrear";
import PartidoEditar from "./PartidoEditar";
import PartidoEliminar from "./PartidoEliminar";

// IMPORTAR LOGOS LOCALES
import logoFP from "../../../assets/logos/fuerza_popular.png";
import logoAP from "../../../assets/logos/accion-popular.png";
import logoRP from "../../../assets/logos/renovacion_popular.png";
import logoAN from "../../../assets/logos/ahora_nacion.png";
import logoAPP from "../../../assets/logos/app.png";
import logoAvanza from "../../../assets/logos/avanza_pais.png";
import logoPais from "../../../assets/logos/pais_para_todos.png";
import logoGente from "../../../assets/logos/primero_la_gente.png";


const initialPartidos = [
  { id: 1, nombre: "Fuerza Popular", abreviatura: "FP", logo: null, estado: "Activo" },
  { id: 2, nombre: "Acción Popular", abreviatura: "AP", logo: null, estado: "Activo" },
  { id: 3, nombre: "Renovación Popular", abreviatura: "RP", logo: null, estado: "Inactivo" },
];

const logosPorPartido = {
  "Fuerza Popular": logoFP,
  "Acción Popular": logoAP,
  "Renovación Popular": logoRP,
  "Ahora Nación": logoAN,
  "Alianza para el Progreso": logoAPP,
  "Avanza País": logoAvanza,
  "País para Todos": logoPais,
  "Primero la Gente": logoGente,
};


export default function Partidos() {
  const [partidos, setPartidos] = useState(initialPartidos);
  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  // FILTRO
  const filtered = useMemo(
    () =>
      partidos.filter((p) =>
        `${p.nombre} ${p.abreviatura}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [partidos, search]
  );

  // CRUD
  const handleCreate = (data) => {
    setPartidos([...partidos, { ...data, id: Date.now() }]);
    setModalCreate(false);
  };

  const handleEdit = (data) => {
    setPartidos(partidos.map((p) => (p.id === data.id ? data : p)));
    setModalEdit(false);
  };

  const handleDelete = () => {
    setPartidos(partidos.filter((p) => p.id !== selected.id));
    setModalDelete(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Flag className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Partidos Políticos</h1>
            <p className="text-sm text-gray-600">Gestión de organizaciones políticas registradas.</p>
          </div>
        </div>

        <button
          onClick={() => setModalCreate(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all font-medium"
        >
          <Plus className="w-5 h-5" /> Nuevo Partido
        </button>
      </div>

      {/* BUSQUEDA */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o abreviatura..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                
                {/* CABECERA */}
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Logo
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Nombre del Partido
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Abreviatura
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Estado
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Acciones
                    </th>
                </tr>
                </thead>

                {/* CUERPO */}
                <tbody className="bg-white divide-y divide-gray-100">
                {filtered.length === 0 ? (
                    <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                        <Flag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">No se encontraron partidos</p>
                    </td>
                    </tr>
                ) : (
                    filtered.map((p) => (
                    <tr
                        key={p.id}
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200"
                    >
                        {/* ID */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                        #{p.id}
                        </td>

                        {/* Logo */}
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-14 h-14 rounded-lg shadow-sm border bg-white overflow-hidden flex items-center justify-center">
                            {logosPorPartido[p.nombre] ? (
                            <img 
                                src={logosPorPartido[p.nombre]} 
                                alt={`Logo ${p.nombre}`}
                                className="w-full h-full object-contain p-1"
                            />
                            ) : (
                            <span className="text-blue-600 font-bold text-xl">{p.abreviatura}</span>
                            )}
                        </div>
                        </td>


                        {/* Nombre */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {p.nombre}
                        </td>

                        {/* Abreviatura */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {p.abreviatura}
                        </td>

                        {/* Estado */}
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            p.estado === "Activo"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                            {p.estado}
                        </span>
                        </td>

                        {/* Acciones */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">

                            <button
                            onClick={() => {
                                setSelected(p);
                                setModalEdit(true);
                            }}
                            className="p-2 text-gray-400 hover:text-white hover:bg-green-500 rounded-lg transition-all duration-200 hover:scale-110"
                            >
                            <Edit className="w-5 h-5" />
                            </button>

                            <button
                            onClick={() => {
                                setSelected(p);
                                setModalDelete(true);
                            }}
                            className="p-2 text-gray-400 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-110"
                            >
                            <Trash2 className="w-5 h-5" />
                            </button>

                        </div>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>

            </table>
            </div>
      </div>

      {/* MODALES */}
      <PartidoCrear isOpen={modalCreate} onClose={() => setModalCreate(false)} onSave={handleCreate} />
      <PartidoEditar isOpen={modalEdit} onClose={() => setModalEdit(false)} onSave={handleEdit} partido={selected} />
      <PartidoEliminar isOpen={modalDelete} onClose={() => setModalDelete(false)} onConfirm={handleDelete} partido={selected} />

    </motion.div>
  );
}
