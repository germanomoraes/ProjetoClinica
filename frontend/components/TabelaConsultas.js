import React from 'react';

function TabelaConsultas({ consultas, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-sm text-gray-500">
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-left">Paciente</th>
            <th className="p-3 text-left">Dentista</th>
            <th className="p-3 text-right">Valor</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.length === 0 ? (
            <tr><td colSpan="6" className="text-center p-8 muted">Nenhuma consulta encontrada</td></tr>
          ) : consultas.map(a => (
            <tr key={a.id} className="border-t hover:bg-gray-50 text-sm">
              <td className="p-3 tiny">{a.date}</td>
              <td className="p-3">{a.patient}</td>
              <td className="p-3 tiny">{a.professional}</td>
              <td className="p-3 text-right font-semibold">{a.value ? `R$ ${a.value.toFixed(2)}` : '-'}</td>
              <td className="p-3 text-center">
                <span className={`px-3 py-1 rounded text-sm ${a.paid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>
                  {a.paid ? 'Pago' : 'Pendente'}
                </span>
              </td>
              <td className="p-3 text-center">
                <button onClick={() => onEdit(a)} className="text-blue-600 mr-2">Editar</button>
                <button onClick={() => onDelete(a.id)} className="text-red-600">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaConsultas;