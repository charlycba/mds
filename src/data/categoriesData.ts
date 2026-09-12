import { Category } from '../types';

export const CATEGORIES_DATA: Category[] = [
  {
    id: 'cuentas-y-accesos',
    name: 'Cuentas y Accesos',
    shortDescription: 'Gestión de identidades, credenciales, perfiles y permisos de usuario',
    iconName: 'users',
    subcategories: [
      {
        id: 'perfil-y-datos-personales',
        name: 'Perfil y datos personales',
        descripcionBreve: 'Actualización de datos personales, correo, teléfono y campos de perfil.',
        data: {
          aplicaA: 'Todos los usuarios',
          uso: 'MDS - Resolución sin escalar',
          tituloSintomas: 'Síntomas Comunes',
          tituloCausas: 'Causas Probables',
          tituloPasos: 'Solución Paso a Paso',
          tituloPrevencion: 'Consejos de Prevención',
          sintomas: [
            '"Quiero cambiar mi información de usuario"',
            '"Necesito actualizar mi correo / mis datos personales"',
            '"Figuran datos viejos en mi perfil"'
          ],
          causas: [
            '1. El usuario cambió de información ej correo y no lo actualizó.',
            '2. El dato se cargó mal al momento del alta o de un cambio anterior.',
            '3. El perfil es de solo lectura: hay campos que el usuario no puede editar por su cuenta.',
            '4. Datos desactualizados que afectan otros flujos (2FA, correos del sistema).'
          ],
          pasos: [
            '1. Pedir al usuario qué dato quiere cambiar y el valor correcto (nunca deducirlo).',
            '2. Verificar identidad antes de modificar datos sensibles.',
            '3. Indicar el camino de autoservicio si existe: perfil / Mi cuenta en el panel de control.',
            '4. Si el campo no es editable por el usuario → Tier 2 actualiza en el panel de administración.',
            '5. Después de cualquier cambio de correo o teléfono, avisar que puede afectar 2FA y correos del sistema.',
            '6. Confirmar con el usuario que el dato quedó guardado y visible, y registrar el cambio en el ticket.'
          ],
          prevencion: [
            'Recordar a los usuarios mantener sus datos de contacto actualizados.',
            'Incluir la actualización de perfil en el onboarding y en cambios de puesto.'
          ]
        }
      },
      {
        id: 'creacion-alta-nuevo-usuario',
        name: 'Creación / alta de nuevo usuario',
        descripcionBreve: 'Proceso de aprovisionamiento de cuentas y bienvenida a nuevos colaboradores.',
        data: {
          aplicaA: 'Todos los usuarios',
          uso: 'MDS - Resolución sin escalar',
          tituloSintomas: 'Síntomas Comunes',
          tituloCausas: 'Causas Probables',
          tituloPasos: 'Solución Paso a Paso',
          tituloPrevencion: 'Consejos de Prevención',
          sintomas: [
            '"Necesito dar de alta a alguien"',
            '"Hay una persona nueva y no tiene usuario"',
            '"¿Cómo le creo el acceso a un compañero?"'
          ],
          causas: [
            '1. Ingreso de una persona nueva (empleado/colaborador).',
            '2. Necesidad de una cuenta temporal o de prueba.',
            '3. Usuario adicional para un cliente/empresa ya existente.'
          ],
          pasos: [
            '1. Confirmar el pedido de alta por un canal verificable.',
            '2. Reunir los datos mínimos del nuevo usuario (nombre, correo, empresa/sector, rol).',
            '3. Crear el usuario en el panel de administración.',
            '4. Asignar los roles básicos según el puesto.',
            '5. Definir el método de primer acceso (invitación, contraseña temporal).',
            '6. Verificar que el correo de alta llegue correctamente.',
            '7. Confirmar con el usuario que puede ingresar y que ve los módulos.'
          ],
          prevencion: [
            'Validar el proceso de altas/RRHH antes de crear usuarios.',
            'Asignar estrictamente los roles necesarios para evitar permisos excesivos.'
          ]
        }
      },
      {
        id: 'baja-desactivacion-usuario',
        name: 'Baja / desactivación de usuario',
        descripcionBreve: 'Revocación segura de credenciales, sesiones y desactivación de cuentas.',
        data: {
          aplicaA: 'Todos los usuarios',
          uso: 'MDS - Resolución sin escalar',
          tituloSintomas: 'Síntomas Comunes',
          tituloCausas: 'Causas Probables',
          tituloPasos: 'Solución Paso a Paso',
          tituloPrevencion: 'Consejos de Prevención',
          sintomas: [
            '"Ya no debería tener acceso"',
            '"Se desvinculó al Usuario y sigue teniendo permiso para entrar"',
            '"Necesito dar de baja a un usuario"'
          ],
          causas: [
            '1. Desvinculación o cambio de puesto de un empleado/colaborador.',
            '2. Pedido express del cliente o del responsable del área.',
            '3. Cuenta temporal o de prueba que debe dejar de estar activa.'
          ],
          pasos: [
            '1. Confirmar el pedido de baja por un canal verificable.',
            '2. Verificar identidad/legitimidad del solicitante.',
            '3. Desactivar la cuenta en el panel de administración.',
            '4. Revocar accesos asociados (sesiones, roles, tokens, API).',
            '5. Reasignar o transferir los datos/registros del usuario.',
            '6. Confirmar con el usuario que pierde acceso (validar intento de login fallido).',
            '7. Registrar la baja en el ticket (usuario, fecha, quién autorizó).'
          ],
          prevencion: [
            'Verificar siempre la legitimidad del solicitante antes de dar de baja.',
            'Asegurar la revocación total de sesiones, tokens e integraciones vinculadas.'
          ]
        }
      },
      {
        id: 'acceso-y-contrasenas',
        name: 'Acceso y contraseñas',
        descripcionBreve: 'Restablecimiento de claves, validación de credenciales y acceso bloqueado.',
        data: {
          aplicaA: 'Todos los usuarios',
          uso: 'MDS - Resolución sin escalar',
          tituloSintomas: 'Síntomas Comunes',
          tituloCausas: 'Causas Probables',
          tituloPasos: 'Solución Paso a Paso',
          tituloPrevencion: 'Consejos de Prevención',
          sintomas: [
            'No me deja entrar',
            'Olvidé mi contraseña'
          ],
          causas: [
            'Contraseña incorrecta u olvidada.',
            'Cuenta bloqueada por intentos fallidos (ver bloqueo).',
            'Correo de restablecimiento que no llega (ver correos).'
          ],
          pasos: [
            '1. Verificar que el usuario use el usuario/correo correcto (a veces entra con otro correo).',
            '2. Usar la opción "Olvidé mi contraseña" en la pantalla de login.',
            '3. Indicar revisar la carpeta de spam si no llega el enlace de restablecimiento.',
            '4. Si la cuenta aparece bloqueada, seguir la guía en Bloqueo de cuenta.',
            '5. Recomendar definir una contraseña segura con mayúsculas, números y símbolos.'
          ],
          prevencion: [
            'No compartir credenciales.',
            'Activar 2FA si está disponible.',
            'Guardar la contraseña en un gestor, no en notas personales.'
          ]
        }
      },
      {
        id: 'roles-y-permisos',
        name: 'Roles y permisos',
        descripcionBreve: 'Acceso restringido a módulos, permisos insuficientes y cambios de rol.',
        data: {
          aplicaA: 'Todos los usuarios',
          uso: 'MDS - Resolución sin escalar',
          tituloSintomas: 'Síntomas Comunes',
          tituloCausas: 'Causas Probables',
          tituloPasos: 'Solución Paso a Paso',
          tituloPrevencion: 'Consejos de Prevención',
          sintomas: [
            'No me deja entrar al módulo X',
            'Me dice que no tengo permisos pero mi compañero sí puede',
            'Necesito acceso a [módulo]'
          ],
          causas: [
            'Rol incorrecto o incompleto asignado al usuario.',
            'El usuario cambió de función interna y no se actualizó su rol.',
            'Permiso específico de un módulo no otorgado.'
          ],
          pasos: [
            '1. Preguntar qué módulo exacto y qué acción necesita (ver, crear, editar, borrar).',
            '2. Comparar con un usuario que sí tenga acceso para verificar su rol.',
            '3. Verificar en el panel de administración el rol actual del usuario.',
            '4. Si falta asignación, escalar a Tier 2 para ejecutar el cambio de rol.',
            '5. Confirmar con el usuario que ya visualiza el módulo correctamente.'
          ],
          prevencion: [
            'Definir una matriz de roles por puesto para no asignar permisos de más.',
            'Revisar roles cuando alguien cambia de puesto o se desvincula.',
            'Nunca otorgar permisos sin pedido verificable (ticket aprobado).'
          ]
        }
      },
      {
        id: 'sesion-y-verificacion-2fa',
        name: 'Sesión y verificación 2FA',
        descripcionBreve: 'Expiración constante de sesión, cookies y códigos 2FA no recibidos.',
        data: {
          aplicaA: 'Todos los usuarios',
          uso: 'MDS - Resolución sin escalar',
          tituloSintomas: 'Síntomas Comunes',
          tituloCausas: 'Causas Probables',
          tituloPasos: 'Solución Paso a Paso',
          tituloPrevencion: 'Consejos de Prevención',
          sintomas: [
            'Me saca todo el tiempo / expira la sesión',
            'Se me cierra la sesión sola',
            'No me llega el código de verificación'
          ],
          causas: [
            'Cookies del sitio bloqueadas o corruptas.',
            'Navegador desactualizado.',
            '2FA: correo/teléfono desactualizado o código en spam.',
            'Hora del equipo desincronizada (rompe validaciones de sesión).'
          ],
          pasos: [
            '1. Limpiar cookies del sitio en el navegador.',
            '2. Verificar que las cookies no estén bloqueadas para el dominio de la aplicación.',
            '3. Actualizar el navegador a la última versión disponible.',
            '4. Hacer clic en Reenviar código en la pantalla de login si no llega el código 2FA.',
            '5. Revisar la carpeta de spam o mensajes bloqueados.',
            '6. Activar Fecha y hora automática en el sistema operativo del equipo.'
          ],
          prevencion: [
            'Mantener el correo y teléfono de perfil siempre actualizados.',
            'Guardar los códigos de respaldo de 2FA en un lugar seguro.'
          ]
        }
      }
    ]
  },
  {
    id: 'incidentes-y-errores',
    name: 'Incidentes y Errores',
    shortDescription: 'Diagnóstico técnico, errores web, pantallas en blanco y timeouts',
    iconName: 'alert-circle',
    subcategories: [
      {
        id: 'errores-de-pagina-404',
        name: 'Errores de página (404 y similares)',
        descripcionBreve: 'Rutas rotas, enlaces antiguos o páginas inexistentes.',
        data: {
          aplicaA: 'Todos los usuarios',
          uso: 'L1 descarta error de URL/permiso antes de escalar',
          tituloSintomas: 'Síntomas Comunes',
          tituloCausas: 'Causas Probables',
          tituloPasos: 'Solución Paso a Paso',
          tituloPrevencion: 'Consejos de Prevención',
          sintomas: [
            '"La página no existe"',
            '"Me da error 404"',
            '"El link que me pasaron no anda"'
          ],
          causas: [
            'URL mal escrita o link viejo/desactualizado.',
            'La sección cambió de ruta o de nombre.',
            'El usuario no tiene permiso para esa sección.',
            'La página realmente no existe.'
          ],
          pasos: [
            '1. Pedir la URL exacta tal como la usó el usuario (idealmente captura).',
            '2. Revisar ortografía, espacios y mayúsculas del link.',
            '3. Pedir que navegue desde el menú de la app en vez de entrar por el link directo.',
            '4. Comparar con un usuario que sí puede ver esa sección.',
            '5. Verificar el rol/permisos del usuario.',
            '6. Recargar; si la sección es válida y el usuario tiene permiso pero igual da 404 → escalar a Tier 2 con la URL exacta.'
          ],
          prevencion: [
            'Entrar siempre por el menú de la app, no por links guardados.',
            'Avisar si un link interno deja de funcionar.'
          ]
        }
      },
      {
        id: 'navegador-cache-pantalla-en-blanco',
        name: 'Navegador, caché y pantalla en blanco',
        descripcionBreve: 'Pantalla en blanco, botones inactivos y problemas de caché local.',
        data: {
          aplicaA: 'Todos los usuarios',
          uso: 'MDS - Resolución sin escalar',
          tituloSintomas: 'Síntomas Comunes',
          tituloCausas: 'Causas Probables',
          tituloPasos: 'Solución Paso a Paso',
          tituloPrevencion: 'Consejos de Prevención',
          sintomas: [
            'La página no carga / se queda en blanco',
            'No veo los cambios que ya se publicaron',
            'El botón no hace nada'
          ],
          causas: [
            'Caché del navegador con versión vieja de la app.',
            'Navegador desactualizado o no soportado.',
            'Cookies/almacenamiento bloqueados.',
            'Problema de conexión del usuario.'
          ],
          pasos: [
            '1. Verificar que se utilice un navegador soportado (Chrome o Edge actualizados).',
            '2. Forzar la recarga del sitio presionando Ctrl+F5 (Windows) o Cmd+Shift+R (Mac).',
            '3. Limpiar la caché del sitio en la configuración del navegador.',
            '4. Probar acceder en modo incógnito para descartar interferencia de extensiones.',
            '5. Desactivar bloqueadores de contenido o extensiones de tipo adblocker.'
          ],
          prevencion: [
            'Usar siempre un navegador soportado y actualizado.',
            'Ante cualquier comportamiento anómalo, realizar recarga forzada (Ctrl+F5).'
          ]
        }
      },
      {
        id: 'datos-duplicados-o-incorrectos',
        name: 'Datos duplicados o incorrectos',
        descripcionBreve: 'Registros duplicados, clientes dobles o errores de carga en datos maestros.',
        data: {
          tiempoEstimado: '2 h',
          aplicaA: 'registros de clientes/usuarios/datos maestros',
          tituloSintomas: 'Síntomas (descripción del usuario)',
          tituloCausas: 'Causas Raíz Conocidas',
          tituloPasos: 'Pasos de Resolución',
          tituloPrevencion: 'Verificación Exitosa',
          sintomas: [
            '"Hay dos clientes iguales"',
            '"Está mal cargado / quedó mal el dato"',
            '"Aparece duplicado en el listado"'
          ],
          causas: [
            'Doble envío del formulario (doble clic o recarga al guardar).',
            'Carga manual duplicada por parte del usuario.',
            'Importación/migración ejecutada dos veces.',
            'Fusión de datos incompleta entre registros.'
          ],
          pasos: [
            '1. Identificar los registros exactos involucrados (IDs, no solo nombre).',
            '2. Confirmar con el usuario cuál es el correcto y qué debe quedar.',
            '3. Registrar el estado previo (captura) antes de tocar nada — un borrado/fusión es difícil de revertir.',
            '4. Corregir o fusionar en el panel de administración si aplica.',
            '5. Si no existe forma de corregirlo desde el panel → NO improvisar: reportar a Tier 2 con IDs y captura.',
            '6. Confirmar con el usuario que quedó un único registro correcto.'
          ],
          prevencion: [
            'Queda un solo registro con los datos correctos y el usuario lo ve bien en la app.'
          ],
          tituloCasosEspeciales: 'Si Esto No Funciona / Casos Especiales',
          casosEspeciales: [
            'Cualquier acción que borre o fusione datos requiere autorización del responsable y respaldo previo.',
            'Duplicados masivos (varios casos iguales) → posible bug de validación → escalar a Tier 2.',
            'Si el dato mal cargado es sensible → registrar quién lo cambió y a qué valor (trazabilidad).'
          ]
        }
      },
      {
        id: 'lentitud-timeout-plataforma',
        name: 'Lentitud / Timeout de la plataforma',
        descripcionBreve: 'Tiempos de respuesta lentos, cuelgues o timeouts del servidor.',
        data: {
          tiempoEstimado: '120 min',
          aplicaA: 'toda la plataforma',
          tituloSintomas: 'Síntomas (descripción del usuario)',
          tituloCausas: 'Causas Raíz Conocidas',
          tituloPasos: 'Pasos de Resolución',
          tituloPrevencion: 'Verificación Exitosa',
          sintomas: [
            '• "Está re lenta"',
            '• "Se queda cargando y después me tira error de tiempo"',
            '• "Todo tarda una eternidad"'
          ],
          causas: [
            '1. Problema del lado del cliente (caché, navegador, VPN).',
            '2. Horario pico / reportes pesados.',
            '3. Deploy reciente.',
            '4. Problema de infraestructura (servidor, base de datos).'
          ],
          pasos: [
            '1. Clasificar el alcance: ¿Desde cuándo?, ¿qué módulo?, ¿a cuántos usuarios?, ¿en qué red?',
            '2. Descartar lado cliente: limpiar caché, actualizar navegador, probar modo incógnito.',
            '3. Aislar red: probar con datos móviles.',
            '4. Si es solo un módulo → verificar corridas masivas.',
            '5. Si es generalizado → escalar a Tier 2 con hora exacta, módulos afectados y si hubo deploy reciente.',
            '6. Pedir medición: F12 → pestaña Red → tiempo de carga.'
          ],
          prevencion: [
            'La plataforma responde en tiempos normales para el usuario y para el resto.'
          ],
          tituloCasosEspeciales: 'Si Esto No Funciona / Casos Especiales',
          casosEspeciales: [
            'Generalizado + con deploy reciente → Tier 2 directo (revisión de performance/cambio).',
            'Solo un usuario con red mala → no bug; documentar en el ticket.'
          ]
        }
      },
      {
        id: 'error-500-algo-salio-mal',
        name: 'Error 500 / "Algo salió mal" al guardar',
        descripcionBreve: 'Fallos de servidor al enviar formularios o guardar cambios.',
        data: {
          tiempoEstimado: '240 min',
          aplicaA: 'todos los módulos con guardado',
          tituloSintomas: 'Síntomas (descripción del usuario)',
          tituloCausas: 'Causas Raíz Conocidas',
          tituloPasos: 'Pasos de Resolución',
          tituloPrevencion: 'Verificación Exitosa',
          sintomas: [
            '• "Me tira error al guardar"',
            '• "Sale \'algo salió mal\' cuando envío el formulario"',
            '• "La pantalla se queda en error después de apretar guardar"'
          ],
          causas: [
            '1. Error transitorio del servidor (timeout, reinicio, deploy).',
            '2. Bug en un módulo específico con ciertos datos.',
            '3. Dato inválido (caracteres especiales, tamaño).',
            '4. Fallo masivo.'
          ],
          pasos: [
            '1. Registrar evidencia mínima: hora exacta, módulo/pantalla, captura del error, ID de usuario.',
            '2. Reintentar 1 vez (puede ser transitorio).',
            '3. Preguntar si es masivo: Si varios reportan → avisar a Tier 2 de inmediato.',
            '4. Aislar: ¿pasa en otro navegador?, ¿con otro registro?',
            '5. Si se reproduce → escalar a Tier 2 con la plantilla de escalamiento.',
            '6. Workaround: guardar copia del contenido en un archivo local y reintentar más tarde.'
          ],
          prevencion: [
            'El guardado funciona y el usuario confirma que sus datos quedaron registrados.'
          ],
          tituloCasosEspeciales: 'Si Esto No Funciona / Casos Especiales',
          casosEspeciales: [
            'Reproducible + con evidencia → Tier 2 directo (bug).',
            'Masivo → incidente mayor, Plantilla de comunicación de escalamiento.'
          ]
        }
      },
      {
        id: 'no-llegan-correos-del-sistema',
        name: 'No llegan los correos del sistema',
        descripcionBreve: 'Problemas con notificaciones, alertas y restablecimiento de contraseñas.',
        data: {
          tiempoEstimado: '120 min',
          aplicaA: 'notificaciones, restablecimiento de contraseña, alertas',
          tituloSintomas: 'Síntomas (descripción del usuario)',
          tituloCausas: 'Causas Raíz Conocidas',
          tituloPasos: 'Pasos de Resolución',
          tituloPrevencion: 'Verificación Exitosa',
          sintomas: [
            '• "No me llegan los mails"',
            '• "No recibo las notificaciones"',
            '• "Me registré / pedí recuperar contraseña y no me llegó nada"'
          ],
          causas: [
            '1. Correo mal escrito.',
            '2. Correo en spam/cuarentena.',
            '3. Servicio de envío fallido.',
            '4. Política del servidor de correo del cliente.'
          ],
          pasos: [
            '1. Confirmar la dirección de correo real en el perfil del usuario.',
            '2. Pedir que revise spam / cuarentena / correo no deseado.',
            '3. Reenviar la notificación desde el sistema o panel de administración.',
            '4. Determinar alcance: Si afecta a varios → escalar a Tier 2.',
            '5. Probar con un correo alternativo para descartar bloqueo del proveedor del cliente.',
            '6. Sugerir agregar la dirección del sistema a la lista de remitentes seguros.'
          ],
          prevencion: [
            'El usuario recibe el correo esperado.'
          ],
          tituloCasosEspeciales: 'Si Esto No Funciona / Casos Especiales',
          casosEspeciales: [
            'Falla masiva → Escalar Tier 2 (servicio SMTP/proveedor).',
            'Un solo usuario y con correo alternativo tampoco recibe → escalar con evidencia.'
          ]
        }
      }
    ]
  },
  {
    id: 'seguridad',
    name: 'Seguridad',
    shortDescription: 'Incidentes críticos, bloqueos de seguridad y cuentas comprometidas',
    iconName: 'shield-alert',
    subcategories: [
      {
        id: 'sev1-usuario-ve-datos-de-otro-usuario',
        name: 'Sev1: Usuario ve datos de otro usuario',
        destacada: true,
        tag: 'CRÍTICO / SEV 1',
        descripcionBreve: 'Incidente de seguridad crítico por exposición o visibilidad cruzada de información privada.',
        data: {
          tiempoEstimado: '5 min',
          aplicaA: 'cualquier usuario, cualquier módulo',
          tituloSintomas: 'Síntomas (descripción del usuario)',
          tituloCausas: 'Causas Raíz Conocidas',
          tituloPasos: 'Pasos de Resolución',
          tituloPrevencion: 'Verificación Exitosa',
          sintomas: [
            '• "Veo datos de otra persona / de otra empresa"',
            '• "Me aparece información que no es mía"',
            '• "Al entrar veo el perfil/pedido de otro usuario"'
          ],
          causas: [
            '1. Error crítico de seguridad o lógica de negocio.'
          ],
          pasos: [
            '1. Registrar: hora exacta, usuario reportante, módulo/pantalla, captura mínima.',
            '2. Avisar de inmediato por el canal de Sev1 a: Tier 2 + líder técnico + gestión (Plantilla de comunicación de escalamiento).',
            '3. Pasar TODO el contexto con la plantilla de escalamiento (Plantilla de comunicación de escalamiento).',
            '4. Quedarse disponible para asistir al equipo técnico (el usuario está esperando).',
            '5. En caso de ser solucionado dar cierre al incidente.'
          ],
          prevencion: [
            'La resolución la define el equipo técnico; la mesa solo confirma al usuario final cuando se le autorice.'
          ],
          tituloCasosEspeciales: 'Si Esto No Funciona / Casos Especiales',
          casosEspeciales: [
            '• INCIDENTE DE SEGURIDAD — SEVERIDAD 1',
            '• NO tocar, modificar ni "arreglar" datos del sistema.',
            '• NO cerrar la sesión del usuario ni desbloquear/bloquear cuentas por cuenta propia.',
            '• NO comentar el caso con el usuario afectado ni con otros usuarios.',
            '• NO postear detalles en canales generales (solo canal de incidentes).'
          ]
        }
      },
      {
        id: 'bloqueo-de-cuenta',
        name: 'Bloqueo de cuenta',
        descripcionBreve: 'Cuentas deshabilitadas, límite de intentos o contraseña vencida.',
        data: {
          tiempoEstimado: '30 min',
          aplicaA: 'usuarios finales, roles estándar',
          tituloSintomas: 'Síntomas (descripción del usuario)',
          tituloCausas: 'Causas Raíz Conocidas',
          tituloPasos: 'Pasos de Resolución',
          tituloPrevencion: 'Verificación Exitosa',
          sintomas: [
            '• "Me dice usuario bloqueado"',
            '• "Mi cuenta está deshabilitada"',
            '• "No me deja entrar, dice que intente más tarde"'
          ],
          causas: [
            '1. Múltiples intentos fallidos.',
            '2. Desactivación manual por administrador.',
            '3. Contraseña vencida.'
          ],
          pasos: [
            '1. Verificar identidad del usuario.',
            '2. Revisar el panel de administración el motivo del bloqueo.',
            '3. Si fue por intentos fallidos → desbloquear la cuenta.',
            '4. Si fue desactivación manual → confirmar con quien la desactivó antes de reactivar.',
            '5. Forzar restablecimiento de contraseña.',
            '6. Verificar con el usuario que ya puede ingresar.'
          ],
          prevencion: [
            'El usuario ingresa correctamente con la nueva contraseña.'
          ],
          tituloCasosEspeciales: 'Si Esto No Funciona / Casos Especiales',
          casosEspeciales: [
            '• La cuenta no aparece → escalar a Tier 2.',
            '• Bloqueo masivo → escalar de inmediato a Tier 2/seguridad.',
            '• Sospecha de cuenta comprometida → NO desbloquear. Escalar de inmediato a Tier 2/seguridad.'
          ]
        }
      },
      {
        id: 'sospecha-de-cuenta-comprometida',
        name: 'Sospecha de cuenta comprometida',
        descripcionBreve: 'Accesos desconocidos, suplantación o modificación de datos no reconocida.',
        data: {
          tiempoEstimado: '1 h',
          aplicaA: 'Cualquier usuario',
          tituloSintomas: 'Síntomas (descripción del usuario)',
          tituloCausas: 'Causas Raíz Conocidas',
          tituloPasos: 'Pasos de Resolución',
          tituloPrevencion: 'Verificación Exitosa',
          sintomas: [
            'Entraron a mi cuenta',
            'Recibí un aviso de un acceso que no hice',
            'Me cambiaron datos / hay movimientos que no reconozco'
          ],
          causas: [
            'Contraseña filtrada, reutilizada o robada.',
            'Phishing (el usuario entregó sus credenciales).',
            'Sesión abierta en un equipo ajeno o compartido.',
            'Cuenta compartida entre varias personas.'
          ],
          pasos: [
            '1. No debatir con el usuario ni prometer resultados: actuar primero.',
            '2. Forzar cierre de TODAS las sesiones activas de la cuenta.',
            '3. Restablecer la contraseña y entregarla por canal seguro (no por chat abierto si es posible).',
            '4. Revisar actividad reciente: accesos, cambios de datos y operaciones no reconocidas.',
            '5. Verificar que el atacante no haya cambiado correo/teléfono de recuperación.',
            '6. Activar/revisar 2FA y recomendar códigos de respaldo.',
            '7. Registrar todo en el ticket: qué se hizo, a qué hora y con qué evidencia.'
          ],
          prevencion: [
            'El usuario ingresa con la nueva contraseña, no quedan sesiones ajenas y no hay actividad anómala posterior.'
          ],
          tituloCasosEspeciales: 'Si Esto No Funciona / Casos Especiales',
          casosEspeciales: [
            'El usuario ve datos de otra persona → es Sev1: seguir Sev1: Usuario ve datos de otro usuario de inmediato.',
            'El atacante cambió el correo/teléfono de recuperación → revertir con validación de identidad y revisar otros cambios.',
            'Sospecha de compromiso masivo (varias cuentas) → escalar como incidente de seguridad.'
          ]
        }
      }
    ]
  },
  {
    id: 'plantillas-y-escalamiento',
    name: 'Plantillas y escalamiento',
    shortDescription: 'Formato estándar de comunicación para escalamiento técnico a N2/N3',
    iconName: 'file-text',
    subcategories: [
      {
        id: 'plantilla-comunicacion-escalamiento',
        name: 'Plantilla de comunicación de escalamiento',
        descripcionBreve: 'Tabla estándar de 11 campos para derivar incidencias complejas al equipo de desarrollo e infraestructura.',
        data: {
          aplicaA: 'Incidentes que requieren Nivel 2, DevOps o Ingeniería',
          uso: 'MDS / L1 para escalamiento estructurado',
          tituloSintomas: 'Síntomas Comunes',
          tituloCausas: 'Causas Probables',
          tituloPasos: 'Solución Paso a Paso',
          tituloPrevencion: 'Consejos de Prevención',
          sintomas: [
            'La incidencia no pudo resolverse en Nivel 1 mediante los procedimientos habituales.',
            'Se detectó un bug de software, caída de API o degradación de base de datos.',
            'El tiempo límite de SLA de primer nivel está próximo a expirar.',
            'El problema impacta a múltiples usuarios o procesos de facturación críticos.'
          ],
          causas: [
            'Comportamiento errático del sistema que requiere inspección de código o logs de servidor.',
            'Necesidad de parches de datos directos (Data Fix) o despliegue de corrección urgente.',
            'Permisos administrativos de infraestructura no disponibles para el equipo de soporte base.'
          ],
          pasos: [
            '1. Llenar los 11 campos de la plantilla de escalamiento con información precisa.',
            '2. Asignar la severidad adecuada (Sev1, Sev2, Sev3) respetando la matriz de impacto.',
            '3. Adjuntar capturas de pantalla de la consola (F12), hora UTC exacta y Request ID.',
            '4. Notificar en el canal oficial de guardia de ingeniería con el enlace directo al ticket.',
            '5. Mantener informados a los usuarios involucrados sobre el estado de la investigación.'
          ],
          prevencion: [
            'Validar siempre la reproducibilidad del caso antes de efectuar el escalamiento.',
            'Incluir siempre los pasos detallados para que el desarrollador pueda replicar la falla.',
            'Documentar la solución en la base de conocimiento una vez que el ticket sea resuelto.'
          ],
          plantillaCamposEscalamiento: [
            { id: 'problema', label: 'Problema', placeholder: '[qué pasa, una línea]', defaultValue: 'El usuario no puede guardar cambios en su perfil y recibe error 500 recurrente.' },
            { id: 'impacto', label: 'Impacto', placeholder: '[usuarios/clientes afectados, funcionalidad]', defaultValue: '10 colaboradores del sector Comercial no pueden operar el módulo de ventas.' },
            { id: 'desdeCuando', label: 'Desde cuándo', placeholder: '[fecha/hora]', defaultValue: 'Hoy a partir de las 14:30 hs (UTC-3).' },
            { id: 'reproduccion', label: 'Reproducción', placeholder: '[sí/no + pasos o condiciones]', defaultValue: 'Sí: Ingresar con usuario afectado > Mi Perfil > Guardar > Da error 500.' },
            { id: 'yaProbado', label: 'Ya probado', placeholder: '[lista de acciones y resultado de cada una]', defaultValue: 'Limpieza de cookies y caché (sin éxito), prueba en modo incógnito (persiste).' },
            { id: 'descartado', label: 'Descartado', placeholder: '[qué se descartó y por qué]', defaultValue: 'Problema de red local (probado con datos móviles y persiste).' },
            { id: 'evidencia', label: 'Evidencia', placeholder: '[logs, capturas, IDs, enlaces]', defaultValue: 'Captura adjunta de error en consola (Network 500), User ID: #98421.' },
            { id: 'sospecha', label: 'Sospecha', placeholder: '[hipótesis principal]', defaultValue: 'Desajuste de esquema tras el último deploy en la tabla de usuarios.' },
            { id: 'ultimoCambio', label: 'Último cambio conocido', placeholder: '[deploy/config/dato reciente]', defaultValue: 'Deploy v2.4.1 liberado hace 2 horas.' },
            { id: 'seNecesita', label: 'Se necesita', placeholder: '[qué se pide: fix, acceso, decisión, recurso]', defaultValue: 'Revisión urgente de logs de backend e invalidación de caché de base de datos.' },
            { id: 'contactoUsuario', label: 'Contacto del usuario', placeholder: '[nombre, cómo avisarle avances]', defaultValue: 'Mariana Gómez (Slack: @mariana.gomez / Cel: +54 9 11 5555-0192)' }
          ]
        }
      }
    ]
  }
];
