export interface EscalationField {
  label: string;
  placeholder: string;
  id: string;
  defaultValue: string;
}

export interface KnowledgeCardData {
  sintomas: string[];
  causas: string[];
  pasos: string[];
  prevencion: string[];
  // Metadata from official documentation
  tiempoEstimado?: string;
  aplicaA?: string;
  uso?: string;
  // Custom headers if applicable
  tituloSintomas?: string;
  tituloCausas?: string;
  tituloPasos?: string;
  tituloPrevencion?: string;
  // 5th RED CARD: "Si esto no funciona / Casos especiales"
  casosEspeciales?: string[];
  tituloCasosEspeciales?: string;
  // Escalation template table fields
  plantillaCamposEscalamiento?: EscalationField[];
}

export interface Subcategory {
  id: string;
  name: string;
  destacada?: boolean;
  tag?: string;
  descripcionBreve?: string;
  data: KnowledgeCardData;
}

export interface Category {
  id: string;
  name: string;
  shortDescription: string;
  iconName: 'users' | 'alert-circle' | 'shield-alert' | 'file-text';
  subcategories: Subcategory[];
}
