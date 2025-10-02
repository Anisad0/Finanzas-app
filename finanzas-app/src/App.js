import React, { useState } from "react";

function App() {
  const [ingresos] = useState(1200);
  const [ahorroMeta] = useState(0.4); // 40%
  const ahorro = ingresos * ahorroMeta;

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>💰 Finanzas Personales</h1>
      <p><b>Ingresos mensuales:</b> S/. {ingresos}</p>
      <p><b>Meta de ahorro (40%):</b> S/. {ahorro}</p>
      <progress value={ahorro} max={ingresos}></progress>
      <p>
        {ahorro >= ingresos * 0.4
          ? "🎉 ¡Meta alcanzada o superada!"
          : "Aún no alcanzas la meta, sigue ahorrando."}
      </p>
    </div>
  );
}

export default App;