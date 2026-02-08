export function Card({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 font-bold text-2xl">{value}</div>
    </div>
  );
}

export function ActionBox({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-4 bg-white border border-gray-100 rounded-lg hover:shadow transition text-sm font-medium"
    >
      {title}
    </button>
  );
}

export function Modal({ title, onClose, onSave, children, submitText = 'Salvar' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 overflow-auto max-h-[85vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-600"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function formatBR(value) {
  return 'R$ ' + (Number(value) || 0)
    .toFixed(2)
    .replace('.', ',');
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}
