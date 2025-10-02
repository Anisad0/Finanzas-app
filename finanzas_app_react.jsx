import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const categorias = ["Alimentación", "Transporte", "Entretenimiento", "Ahorro", "Otros"];
const colores = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function App() {
  const [movimientos, setMovimientos] = useState([]);
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState("Gasto");
  const [categoria, setCategoria] = useState("Alimentación");

  const ingresos = movimientos.filter(m => m.tipo === "Ingreso").reduce((a,b) => a + b.monto, 0);
  const gastos = movimientos.filter(m => m.tipo === "Gasto").reduce((a,b) => a + b.monto, 0);
  const saldo = ingresos - gastos;

  const handleAdd = () => {
    if (!monto) return;
    setMovimientos([...movimientos, { tipo, categoria, monto: parseFloat(monto) }]);
    setMonto("");
  };

  const dataGrafico = categorias.map((cat, i) => ({
    name: cat,
    value: movimientos.filter(m => m.categoria === cat && m.tipo === "Gasto").reduce((a,b) => a + b.monto, 0)
  }));

  const metaAhorro = 480; // 40% de 1200
  const ahorro = movimientos.filter(m => m.categoria === "Ahorro").reduce((a,b) => a + b.monto, 0);
  const porcentaje = (ahorro / metaAhorro) * 100;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">💰 Finanzas Personales</h1>
      <div className="bg-white p-4 rounded-2xl shadow mb-4">
        <p><strong>Saldo disponible:</strong> S/. {saldo}</p>
        <p><strong>Ingresos:</strong> S/. {ingresos}</p>
        <p><strong>Gastos:</strong> S/. {gastos}</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow mb-4">
        <h2 className="font-bold mb-2">Distribución de Gastos</h2>
        <PieChart width={300} height={250}>
          <Pie data={dataGrafico} cx={150} cy={100} outerRadius={80} dataKey="value">
            {dataGrafico.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow mb-4">
        <h2 className="font-bold mb-2">Registrar Movimiento</h2>
        <input
          type="number"
          value={monto}
          onChange={e => setMonto(e.target.value)}
          placeholder="Monto"
          className="border p-2 rounded mr-2"
        />
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="border p-2 rounded mr-2">
          <option>Ingreso</option>
          <option>Gasto</option>
        </select>
        <select value={categoria} onChange={e => setCategoria(e.target.value)} className="border p-2 rounded mr-2">
          {categorias.map(c => <option key={c}>{c}</option>)}
        </select>
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow mb-4">
        <h2 className="font-bold mb-2">Historial</h2>
        <ul>
          {movimientos.map((m, i) => (
            <li key={i} className="border-b py-1">{m.tipo} - {m.categoria}: S/. {m.monto}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="font-bold mb-2">Meta de Ahorro (40% = S/. 480)</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div className={`h-4 rounded-full ${porcentaje >= 100 ? 'bg-yellow-400' : 'bg-green-500'}`} style={{width: `${Math.min(porcentaje, 100)}%`}}></div>
        </div>
        <p>{ahorro} / {metaAhorro} ({Math.round(porcentaje)}%)</p>
        {porcentaje >= 100 && <p className="text-yellow-600 font-bold">🎉 ¡Meta superada!</p>}
      </div>
    </div>
  );
}
