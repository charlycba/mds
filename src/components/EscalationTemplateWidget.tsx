import React, { useState } from 'react';
import { Copy, Check, FileText, Sparkles, RefreshCw, Table } from 'lucide-react';

interface EscalationItem {
  id: string;
  campo: string;
  descripcion: string;
  valor: string;
}

const DEFAULT_ITEMS: EscalationItem[] = [
  { id: 'problema', campo: 'Problema', descripcion: '[qué pasa, una línea]', valor: 'El usuario experimenta error 500 recurrente y cierre de sesión al guardar cambios en su perfil.' },
  { id: 'impacto', campo: 'Impacto', descripcion: '[usuarios/clientes afectados, funcionalidad]', valor: 'Sector de Ventas (aprox. 12 colaboradores bloqueados sin poder actualizar registros).' },
  { id: 'desdeCuando', campo: 'Desde cuándo', descripcion: '[fecha/hora]', valor: 'Hoy a partir de las 14:15 hs (UTC-3).' },
  { id: 'reproduccion', campo: 'Reproducción', descripcion: '[sí/no + pasos o condiciones]', valor: 'Sí: Login con usuario afectado > Mi Perfil > Modificar teléfono > Clic en Guardar > Da error 500.' },
  { id: 'yaProbado', campo: 'Ya probado', descripcion: '[lista de acciones y resultado de cad una]', valor: '1. Recarga forzada (Ctrl+F5) -> sin éxito. 2. Ventana en modo incógnito -> mismo error. 3. Verificación de rol en panel admin -> rol correcto.' },
  { id: 'descartado', campo: 'Descartado', descripcion: '[qué se descartó y por qué]', valor: 'Problema de conectividad o red local (se probó con red móvil externa y el fallo persiste).' },
  { id: 'evidencia', campo: 'Evidencia', descripcion: '[logs, capturas, IDs, enlaces]', valor: 'Captura adjunta en ticket, Request ID: req_98a72fb31c9d, User ID: #84920.' },
  { id: 'sospecha', campo: 'Sospecha', descripcion: '[hipótesis principal]', valor: 'Inconsistencia de esquema en base de datos tras el último release de la API de usuarios.' },
  { id: 'ultimoCambio', campo: 'Último cambio conocido', descripcion: '[deploy/config/dato reciente]', valor: 'Deploy v2.4.1 realizado hace 2 horas en producción.' },
  { id: 'seNecesita', campo: 'Se necesita', descripcion: '[qué se pide: fix, acceso, decisión, recurso]', valor: 'Revisión urgente de logs de backend por Tier 2 / DevOps y reinicio de microservicio de perfiles.' },
  { id: 'contactoUsuario', campo: 'Contacto del usuario', descripcion: '[nombre, cómo avisarle avances]', valor: 'Mariana Gómez (mariana.gomez@empresa.com / Slack: @mariana.gomez)' },
];

export const EscalationTemplateWidget: React.FC = () => {
  const [ticketId, setTicketId] = useState('INC-94821');
  const [severidad, setSeveridad] = useState('Sev2 (Alto impacto - Trabajo bloqueado)');
  const [items, setItems] = useState<EscalationItem[]>(DEFAULT_ITEMS);
  const [copiedFormat, setCopiedFormat] = useState<'text' | 'table' | null>(null);

  const handleFieldChange = (id: string, newVal: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, valor: newVal } : item))
    );
  };

  const getPlainText = () => {
    return `ESCALAMIENTO — [#${ticketId}] — [${severidad}]
======================================================================
${items.map((item) => `${item.campo.padEnd(24, ' ')}: ${item.valor}`).join('\n')}
======================================================================`;
  };

  const getMarkdownTable = () => {
    return `ESCALAMIENTO — [#${ticketId}] — [${severidad}]

| Campo | Detalle |
| :--- | :--- |
${items.map((item) => `| **${item.campo}** | ${item.valor.replace(/\|/g, '-')} |`).join('\n')}`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getPlainText());
    setCopiedFormat('text');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleCopyTable = () => {
    navigator.clipboard.writeText(getMarkdownTable());
    setCopiedFormat('table');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleReset = () => {
    setTicketId(`INC-${Math.floor(10000 + Math.random() * 90000)}`);
    setSeveridad('Sev2 (Alto impacto - Trabajo bloqueado)');
    setItems(DEFAULT_ITEMS);
  };

  return (
    <div
      id="escalation-template-widget"
      className="mt-8 bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00bed6]/15 text-[#00bed6] rounded-xl border border-[#00bed6]/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Plantilla Oficial de Comunicación de Escalamiento
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#00bed6]/20 text-[#8ee6f3] rounded-full border border-[#00bed6]/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Formato de 11 Campos
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Estructura oficial para derivar incidencias complejas al equipo de desarrollo (Tier 2/Tier 3).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 border border-slate-700/50"
            title="Resetear valores de ejemplo"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Ejemplo por defecto</span>
          </button>

          <button
            type="button"
            id="btn-copy-template-text"
            onClick={handleCopyText}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-lg ${
              copiedFormat === 'text'
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-[#008aab] hover:bg-[#00758d] text-white shadow-[#008aab]/30 active:scale-[0.98]'
            }`}
          >
            {copiedFormat === 'text' ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Texto Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Texto</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="btn-copy-template-table"
            onClick={handleCopyTable}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-lg ${
              copiedFormat === 'table'
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-[0.98]'
            }`}
          >
            {copiedFormat === 'table' ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Tabla Copiada!</span>
              </>
            ) : (
              <>
                <Table className="w-4 h-4" />
                <span>Copiar Tabla</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Ticket & Severidad Top Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
        <div>
          <label className="block text-slate-400 font-semibold text-xs mb-1">Ticket #ID</label>
          <input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 font-mono text-sm focus:outline-none focus:border-[#00bed6]"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-semibold text-xs mb-1">Severidad</label>
          <select
            value={severidad}
            onChange={(e) => setSeveridad(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-[#00bed6]"
          >
            <option value="Sev1: Usuario ve datos de otro usuario (Crítico)">Sev1: Usuario ve datos de otro usuario (Crítico)</option>
            <option value="Sev2 (Alto impacto - Trabajo bloqueado)">Sev2 (Alto impacto - Trabajo bloqueado)</option>
            <option value="Sev3 (Medio - Funcionalidad parcial con workaround)">Sev3 (Medio - Funcionalidad parcial con workaround)</option>
            <option value="Sev4 (Bajo - Consulta o mejora estética)">Sev4 (Bajo - Consulta o menor)</option>
          </select>
        </div>
      </div>

      {/* Interactive 11-Rows Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <th className="py-2.5 px-4 font-bold w-48 uppercase tracking-wider">Campo</th>
              <th className="py-2.5 px-4 font-bold uppercase tracking-wider">Valor / Detalle del Caso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2.5 px-4 align-top">
                  <div className="font-bold text-slate-200 text-sm">{item.campo}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{item.descripcion}</div>
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={item.valor}
                    onChange={(e) => handleFieldChange(item.id, e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-[#00bed6] text-xs transition-colors"
                    placeholder={item.descripcion}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Live Preview Box */}
      <div className="relative mt-4">
        <div className="text-[11px] font-mono text-slate-400 bg-slate-950 px-4 py-2 rounded-t-lg border-t border-x border-slate-800 flex items-center justify-between">
          <span>VISTA PREVIA DEL ESCALAMIENTO</span>
          <span className="text-slate-500">Listo para pegar en Jira / ServiceNow / Slack</span>
        </div>
        <pre className="p-4 bg-slate-950/90 text-slate-300 font-mono text-xs rounded-b-lg border border-slate-800 overflow-x-auto whitespace-pre leading-relaxed max-h-56 scrollbar-thin">
          {getPlainText()}
        </pre>
      </div>
    </div>
  );
};
