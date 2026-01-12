import React, { useState } from 'react';
import pacienteService from '../services/pacienteService.js';

function FormPaciente({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    endereco: '',
    alergias: '',
    observacoes: ''
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.cpf) return alert('Preencha nome e CPF');
    try {
      await pacienteService.create(form);
      onSave();
      onClose();
    } catch (error) {
      alert('Erro ao cadastrar paciente: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="w-full max-w-2xl card p-6 overflow-auto max-h-[85vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Novo Paciente</h3>
          <button onClick={onClose} className="text-2xl" aria-label="Fechar">&times;</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Nome completo" value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} className="p-2 border rounded" />
            <input placeholder="CPF" value={form.cpf} onChange={e=>setForm({...form, cpf:e.target.value})} className="p-2 border rounded" />
            <input placeholder="Telefone" value={form.telefone} onChange={e=>setForm({...form, telefone:e.target.value})} className="p-2 border rounded" />
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="p-2 border rounded" />
            <label className="block">Data de Nascimento
              <input type="date" value={form.dataNascimento} onChange={e=>setForm({...form, dataNascimento:e.target.value})} className="w-full p-2 border rounded" />
            </label>
          </div>
          <input placeholder="Endereço (Rua, Número, Bairro, Cidade)" value={form.endereco} onChange={e=>setForm({...form, endereco:e.target.value})} className="w-full p-2 border rounded" />
          <textarea placeholder="Alergias / Histórico Clínico Relevante" value={form.alergias} onChange={e=>setForm({...form, alergias:e.target.value})} className="w-full p-2 border rounded h-20"></textarea>
          <textarea placeholder="Observações Gerais" value={form.observacoes} onChange={e=>setForm({...form, observacoes:e.target.value})} className="w-full p-2 border rounded h-16"></textarea>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="py-2 px-4 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white">Cadastrar Paciente</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPaciente;