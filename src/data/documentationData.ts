export interface DocCard {
  title: string;
  desc: string;
  tag: string;
  iconName: string;
}

export interface DocumentationItem {
  id: string;
  title: string;
  category: 'documentacion' | 'documentacion-extra';
  badge: string;
  tagline: string;
  iconName: string;
  sourceUrl: string;
  cards: [DocCard, DocCard, DocCard, DocCard];
  fullText: {
    sectionTitle: string;
    paragraphs: string[];
  }[];
}

export const DOCUMENTACION_ITEMS: DocumentationItem[] = [
  {
    "id": "aviso-legal",
    "title": "Aviso Legal",
    "category": "documentacion",
    "badge": "LSSI-CE & Ley 34/2002",
    "tagline": "Titularidad oficial de dDesign Canarias, identificación fiscal y condiciones generales de uso del portal.",
    "iconName": "Scale",
    "sourceUrl": "https://designcanarias.com/aviso-legal/",
    "cards": [
      {
        "title": "Titularidad & CIF",
        "desc": "Cristina Rodríguez Yanes (dDesign Canarias), NIF 43382485T, con domicilio fiscal en C/ Barranco San Juan, 28, 38350 Tacoronte, Santa Cruz de Tenerife.",
        "tag": "Art. 10 LSSI-CE",
        "iconName": "Building2"
      },
      {
        "title": "Propiedad Intelectual",
        "desc": "Diseños, logotipos, textos, imágenes, productos digitales y nombres comerciales protegidos; prohibida su reproducción sin autorización.",
        "tag": "RDL 1/1996",
        "iconName": "ShieldCheck"
      },
      {
        "title": "Condiciones de Navegación",
        "desc": "El usuario se compromete al uso adecuado de contenidos y servicios, absteniéndose de actividades ilícitas o vulneraciones del sistema.",
        "tag": "Uso Conforme",
        "iconName": "CheckCircle2"
      },
      {
        "title": "Fuero & Jurisdicción",
        "desc": "Cualquier controversia derivada de la utilización del sitio web se someterá a los Juzgados y Tribunales de Santa Cruz de Tenerife.",
        "tag": "Tribunales Tenerife",
        "iconName": "Scale"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Aviso Legal",
        "paragraphs": [
          "En cumplimiento con el deber de información recogido en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa que el presente sitio web www.designcanarias.com (en adelante, el Sitio Web ) es titularidad de:",
          "Titular: Cristina Rodríguez Yanes",
          "Nombre comercial: dDesign Canarias",
          "NIF: 43382485T",
          "Domicilio: C/ Barranco San Juan, 28, 38350 Tacoronte, Santa Cruz de Tenerife, España",
          "Correo electrónico: info@designcanarias.com",
          "Teléfono: +34 641 50 17 73",
          "1. Objeto del sitio web",
          "El presente Sitio Web tiene como finalidad ofrecer información sobre los servicios de diseño gráfico, impresión y diseño 3D, así como la posibilidad de solicitar presupuestos personalizados y adquirir determinados productos a través de su tienda online."
        ]
      },
      {
        "sectionTitle": "2. Condiciones de uso",
        "paragraphs": [
          "El acceso y uso del Sitio Web atribuye la condición de usuario, lo que implica la aceptación plena de las condiciones de uso vigentes en cada momento. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos, evitando actuaciones ilícitas, lesivas de derechos o que puedan dañar la web o sus sistemas."
        ]
      },
      {
        "sectionTitle": "3. Propiedad intelectual e industrial",
        "paragraphs": [
          "Todos los contenidos del Sitio Web (diseños, logotipos, textos, imágenes, productos digitales, nombres comerciales y demás elementos) son propiedad de dDesign Canarias o de sus legítimos titulares, quedando prohibida su reproducción total o parcial sin autorización expresa.",
          "El usuario se compromete a respetar los derechos de Propiedad Intelectual e Industrial."
        ]
      },
      {
        "sectionTitle": "4. Enlaces externos",
        "paragraphs": [
          "El Sitio Web puede contener enlaces a sitios de terceros. dDesign Canarias no se hace responsable del contenido, políticas o prácticas de dichos sitios externos."
        ]
      },
      {
        "sectionTitle": "5. Responsabilidad",
        "paragraphs": [
          "dDesign Canarias no garantiza la disponibilidad continua del Sitio Web, aunque procurará evitar interrupciones o errores técnicos. No se responsabiliza de los daños o perjuicios derivados del uso de la información contenida en este sitio ni de las decisiones basadas en ella."
        ]
      },
      {
        "sectionTitle": "6. Política de protección de datos",
        "paragraphs": [
          "dDesign Canarias cumple con la normativa vigente en materia de protección de datos personales (Reglamento (UE) 2016/679 – RGPD y Ley Orgánica 3/2018 – LOPDGDD). Los datos personales que se recaben a través de los formularios de contacto o pedido se tratarán conforme a lo establecido en la Política de Privacidad ."
        ]
      },
      {
        "sectionTitle": "7. Legislación aplicable y jurisdicción",
        "paragraphs": [
          "La relación entre el usuario y el titular del sitio web se regirá por la normativa española vigente. Cualquier controversia que pudiera derivarse será sometida a los Juzgados y Tribunales de Santa Cruz de Tenerife , salvo que la ley disponga lo contrario."
        ]
      },
      {
        "sectionTitle": "8. Contacto",
        "paragraphs": [
          "Para cualquier duda o consulta sobre este aviso legal o los servicios ofrecidos, puede contactar con nosotros en el correo info@designcanarias.com ."
        ]
      }
    ]
  },
  {
    "id": "terminos-condiciones",
    "title": "Términos y condiciones",
    "category": "documentacion",
    "badge": "Marco Contractual 2026",
    "tagline": "Condiciones vinculantes para navegación, transacciones comerciales, cuentas de usuario y servicios.",
    "iconName": "FileText",
    "sourceUrl": "https://designcanarias.com/declaracion-de-privacidad/",
    "cards": [
      {
        "title": "Vinculación Contractual",
        "desc": "El registro, acceso o utilización del sitio web formaliza la aceptación íntegra de las condiciones de contratación y uso del catálogo.",
        "tag": "Cláusula 2",
        "iconName": "FileCheck"
      },
      {
        "title": "Desistimiento 14 Días",
        "desc": "Derecho legal de rescisión en 14 días para servicios generales no iniciados, con excepciones específicas para productos personalizados.",
        "tag": "Cláusula 9.1",
        "iconName": "RotateCcw"
      },
      {
        "title": "Límite de Responsabilidad",
        "desc": "La responsabilidad de dDesign Canarias se limitará en su conjunto al precio total pagado por el cliente por el producto o servicio adquirido.",
        "tag": "Cláusula 12",
        "iconName": "ShieldAlert"
      },
      {
        "title": "Ley Aplicable",
        "desc": "El contrato se rige e interpreta conforme a las leyes vigentes del Reino de España y la normativa de la Comunidad Autónoma de Canarias.",
        "tag": "Cláusula 21/24",
        "iconName": "Scale"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Términos y condiciones",
        "paragraphs": [
          "Los términos y condiciones se actualizaron por última vez el 22 de October de 2025"
        ]
      },
      {
        "sectionTitle": "1. Introducción",
        "paragraphs": [
          "Estos Términos y condiciones se aplican a este sitio web y a las transacciones relacionadas con nuestros productos y servicios. Usted puede estar obligado por contratos adicionales relacionados con su relación con nosotros o con cualquier producto o servicio que reciba de nosotros. Si alguna de las disposiciones de los contratos adicionales entra en conflicto con alguna de las disposiciones de estas Condiciones, las disposiciones de estos contratos adicionales prevalecerán."
        ]
      },
      {
        "sectionTitle": "2. Vinculación",
        "paragraphs": [
          "Al registrarse en este sitio web, acceder a él o utilizarlo de cualquier otro modo, usted acepta someterse a las condiciones que se exponen a continuación. El mero uso de este sitio web implica el conocimiento y la aceptación de estos Términos y condiciones. En algunos casos particulares, también podemos pedirle que lo acepte explícitamente."
        ]
      },
      {
        "sectionTitle": "3. Comunicación electrónica",
        "paragraphs": [
          "Al utilizar este sitio web o comunicarse con nosotros por medios electrónicos, usted acepta y reconoce que podemos comunicarnos con usted electrónicamente en nuestro sitio web o enviarle un correo electrónico, y acepta que todos los acuerdos, avisos, divulgaciones y otras comunicaciones que le proporcionemos electrónicamente satisfacen cualquier requisito legal, incluido, entre otros, el requisito de que dichas comunicaciones sean por escrito."
        ]
      },
      {
        "sectionTitle": "4. Propiedad intelectual",
        "paragraphs": [
          "Nosotros o nuestros licenciantes poseemos y controlamos todos los derechos de autor y otros derechos de propiedad intelectual en el sitio web, y los datos, la información y otros recursos mostrados por o accesibles dentro del sitio web.",
          "4.1 Todos los derechos están reservados",
          "A menos que el contenido específico indique lo contrario, no se le concede una licencia ni ningún otro derecho en virtud de los derechos de autor, marcas comerciales, patentes u otros derechos de propiedad intelectual. Esto significa que usted no utilizará, copiará, reproducirá, ejecutará, mostrará, distribuirá, incrustará en cualquier medio electrónico, alterará, realizará ingeniería inversa, descompilará, transferirá, descargará, transmitirá, monetizará, venderá, comercializará o hará uso de cualquier recurso de este sitio web en cualquier forma, sin nuestro permiso previo por escrito, excepto y sólo en la medida en que se estipule lo contrario en normas de leyes obligatorias (como el derecho de cita)."
        ]
      },
      {
        "sectionTitle": "5. Boletín de noticias",
        "paragraphs": [
          "No obstante lo anterior, usted puede reenviar nuestro boletín de noticias en formato electrónico a otras personas que puedan estar interesadas en visitar nuestro sitio web."
        ]
      },
      {
        "sectionTitle": "6. Propiedad de terceros",
        "paragraphs": [
          "Nuestro sitio web puede incluir hipervínculos u otras referencias a sitios web de terceros. No controlamos ni revisamos el contenido de los sitios web de terceros a los que se accede desde este sitio web. Los productos o servicios ofrecidos por otros sitios web estarán sujetos a los Términos y Condiciones aplicables de esos terceros. Las opiniones expresadas o el material que aparece en esos sitios web no son necesariamente compartidas o respaldadas por nosotros.",
          "No seremos responsables de las prácticas de privacidad o del contenido de estos sitios. Usted asume todos los riesgos asociados al uso de estos sitios web y de cualquier servicio de terceros relacionado. No aceptaremos ninguna responsabilidad por cualquier pérdida o daño, sea cual sea la forma en que se produzca, que resulte de la divulgación por su parte de información personal a terceros."
        ]
      },
      {
        "sectionTitle": "7. Uso responsable",
        "paragraphs": [
          "Al visitar nuestro sitio web, usted se compromete a utilizarlo sólo para los fines previstos y según lo permitido por estos Términos, cualquier contrato adicional con nosotros, y aplicables leyes, reglamentos y prácticas en línea generalmente aceptadas y directrices de la industria. No debe usar nuestro sitio web o nuestros servicios para utilizar, publicar o distribuir cualquier material que consista en (o esté vinculado a) software informático malicioso; utilizar los datos recogidos en nuestro sitio web para cualquier actividad de marketing directo, o llevar a cabo cualquier actividad de recopilación de datos sistemática o automatizada en o en relación con nuestro sitio web.",
          "Está estrictamente prohibido realizar cualquier actividad que provoque o pueda provocar daños en el sitio web o que interfiera en su funcionamiento, disponibilidad o accesibilidad."
        ]
      },
      {
        "sectionTitle": "8. Registro",
        "paragraphs": [
          "Puede registrarse para obtener una cuenta en nuestro sitio web. Durante este proceso, es posible que se le pida que elija una contraseña. Usted es responsable de mantener la confidencialidad de las contraseñas y la información de la cuenta y se compromete a no compartir sus contraseñas, la información de la cuenta o el acceso seguro a nuestro sitio web o servicios con ninguna otra persona. No debe permitir que ninguna otra persona use su cuenta para acceder al sitio web porque usted es responsable de todas las actividades que ocurren a través del uso de sus contraseñas o cuentas. Debe notificarnos inmediatamente si tiene conocimiento de la divulgación de su contraseña.",
          "Después de la cancelación de la cuenta, usted no intentará registrar una nueva cuenta sin nuestro permiso."
        ]
      },
      {
        "sectionTitle": "9. Política de Devoluciones y Reembolsos",
        "paragraphs": [
          "9.1 Derecho de desistimiento",
          "Tiene derecho a rescindir el contrato en un plazo de 14 días sin indicar el motivo.",
          "El plazo de desistimiento expirará transcurridos 14 días desde la celebración del contrato.",
          "Para ejercer tu derecho de desistimiento, debes informarnos de tu decisión de desistir de este contrato mediante una declaración inequívoca. Para ello, puedes utilizar la función de desistimiento disponible . No obstante, eres libre de expresar tu intención de desistir del contrato mediante una declaración inequívoca de cualquier otra forma adecuada.",
          "Te enviaremos sin demora un acuse de recibo de dicha renuncia en un soporte duradero (por ejemplo, por correo electrónico).",
          "Para cumplir el plazo de desistimiento, basta con que envíe su comunicación sobre el ejercicio del derecho de desistimiento antes de que expire el plazo de desistimiento.",
          "9.2 Consecuencias de la retirada",
          "Si rescindes el contrato, te reembolsaremos todos los pagos que hayamos recibido, incluidos los gastos de entrega (a excepción de los gastos suplementarios resultantes de tu elección de un tipo de entrega distinto al tipo de entrega estándar menos costoso que ofrezcamos), sin ninguna demora indebida y, en cualquier caso, a más tardar en 14 días a partir del día en que se nos informe de tu decisión de rescindir el contrato. Realizaremos dicho reembolso utilizando el mismo medio de pago que usted utilizó para la transacción inicial, a menos que haya acordado expresamente lo contrario; en cualquier caso, usted no incurrirá en ninguna comisión como resultado de dicho reembolso.",
          "Si ha solicitado el inicio de la ejecución de los servicios durante el periodo de desistimiento, deberá abonarnos un importe proporcional a lo prestado hasta que nos haya comunicado su desistimiento de este contrato, en comparación con la cobertura total del mismo.",
          "Por favor, ten en cuenta que hay algunas excepciones legales al derecho de desistimiento y, por tanto, algunos artículos no se pueden devolver o cambiar. Le informaremos si esto se aplica a su caso particular."
        ]
      },
      {
        "sectionTitle": "10. Envío de ideas",
        "paragraphs": [
          "No envíe ideas, inventos, trabajos de autoría u otra información que pueda considerarse su propia propiedad intelectual y que le gustaría presentarnos, a menos que primero hayamos firmado un acuerdo con respecto a la propiedad intelectual o un acuerdo de no divulgación. Si nos lo comunica en ausencia de dicho acuerdo por escrito, nos concede una licencia mundial, irrevocable, no exclusiva y libre de derechos de autor para utilizar, reproducir, almacenar, adaptar, publicar, traducir y distribuir su contenido en cualquier medio existente o futuro."
        ]
      },
      {
        "sectionTitle": "11. Terminación de uso",
        "paragraphs": [
          "Podemos, a nuestra entera discreción, modificar o interrumpir en cualquier momento el acceso, temporal o permanentemente, al sitio web o a cualquier Servicio del mismo. Usted acepta que no seremos responsables ante usted ni ante ningún tercero por cualquier modificación, suspensión o interrupción de su acceso o uso del sitio web o de cualquier contenido que pueda haber compartido en el sitio web. Usted no tendrá derecho a ninguna compensación ni a ningún otro pago, ni siquiera si se pierden de forma permanente determinadas funciones, configuraciones y/o cualquier Contenido con el que haya contribuido o en el que haya confiado. No debe eludir o evitar, o intentar eludir o evitar, cualquier medida de restricción de acceso en nuestro sitio web."
        ]
      },
      {
        "sectionTitle": "12. Garantías y responsabilidad",
        "paragraphs": [
          "Nada de lo dispuesto en esta sección limitará o excluirá cualquier garantía implícita por ley que fuera ilegal limitar o excluir. Este sitio web y todo su contenido se proporcionan \"tal cual\" y \"según disponibilidad\" y pueden incluir inexactitudes o errores tipográficos. Renunciamos expresamente a toda garantía de cualquier tipo, ya sea expresa o implícita, en cuanto a la disponibilidad, precisión o integridad del Contenido. No garantizamos que:",
          "• este sitio web o nuestros productos o servicios cumplirán con sus requisitos;",
          "• este sitio web estará disponible de forma ininterrumpida, oportuna, segura o sin errores;",
          "• la calidad de cualquier producto o servicio adquirido u obtenido por usted a través de este sitio web satisfará sus expectativas.",
          "Nada de lo contenido en este sitio web constituye o pretende constituir un asesoramiento jurídico, financiero o médico de ningún tipo. Si necesita asesoramiento, debe consultar a un profesional adecuado.",
          "Las siguientes disposiciones de esta sección se aplicarán en la medida máxima permitida por la ley aplicable y no limitarán ni excluirán nuestra responsabilidad con respecto a cualquier asunto que sería ilícito o ilegal para nosotros limitar o excluir nuestra responsabilidad. En ningún caso seremos responsables de cualquier daño directo o indirecto (incluyendo cualquier daño por pérdida de beneficios o ingresos, pérdida o corrupción de datos, software o base de datos, o pérdida o daño a la propiedad o a los datos) incurridos por usted o por cualquier tercero, que surja de su acceso o uso de nuestro sitio web.",
          "Salvo en la medida en que cualquier contrato adicional establezca expresamente lo contrario, nuestra responsabilidad máxima hacia usted por todos los daños que surjan o estén relacionados con el sitio web o con cualquier producto o servicio comercializado o vendido a través del sitio web, independientemente de la forma de acción legal que imponga la responsabilidad (ya sea por contrato, equidad, negligencia, conducta intencionada, agravio o cualquier otra forma) se limitará al precio total que usted nos pagó para comprar dichos productos o servicios o utilizar el sitio web. Dicho límite se aplicará en conjunto a todas sus reclamaciones, acciones y causas de acción de cualquier tipo y naturaleza."
        ]
      },
      {
        "sectionTitle": "13. Privacidad",
        "paragraphs": [
          "Para acceder a nuestro sitio web y/o servicios, es posible que se le pida que proporcione cierta información sobre usted como parte del proceso de registro. Usted se compromete a que toda la información que proporcione sea siempre precisa, correcta y actualizada.",
          "Nos tomamos muy en serio sus datos personales y nos comprometemos a proteger su privacidad. No utilizaremos su dirección de correo electrónico para enviar mensajes no solicitados. Cualquier correo electrónico que le enviemos solo estará relacionado con el suministro de productos o servicios acordados.",
          "Hemos desarrollado una política para abordar cualquier preocupación sobre la privacidad que pueda tener. Para obtener más información, consulta nuestra Declaración de privacidad y nuestra Política de cookies ."
        ]
      },
      {
        "sectionTitle": "14. Accesibilidad",
        "paragraphs": [
          "Nos comprometemos a que los contenidos que ofrecemos sean accesibles para las personas con discapacidad. Si tiene una discapacidad y no puede acceder a cualquier parte de nuestro sitio web debido a su discapacidad, le pedimos que nos avise incluyendo una descripción detallada del problema que ha encontrado. Si el problema es fácilmente identificable y se puede resolver de acuerdo con las herramientas y técnicas de la tecnología de la información estándar del sector, lo resolveremos rápidamente."
        ]
      },
      {
        "sectionTitle": "15. Restricciones a la exportación / Cumplimiento legal",
        "paragraphs": [
          "Se prohíbe el acceso al sitio web desde territorios o países donde el Contenido o la compra de los productos o Servicios vendidos en el sitio web es ilegal. No puede utilizar este sitio web infringiendo las leyes y reglamentos de exportación de España."
        ]
      },
      {
        "sectionTitle": "16. Asignación",
        "paragraphs": [
          "Usted no puede ceder, transferir o subcontratar ninguno de sus derechos y/u obligaciones en virtud de estos Términos y condiciones, en su totalidad o en parte, a ningún tercero sin nuestro consentimiento previo por escrito. Cualquier supuesta asignación en violación de esta sección será nula y sin efecto."
        ]
      },
      {
        "sectionTitle": "17. Incumplimientos de estos Términos y condiciones",
        "paragraphs": [
          "Sin perjuicio de los demás derechos que nos asisten en virtud de los presentes Términos y Condiciones, si usted incumple estos Términos y Condiciones de cualquier manera, podremos tomar las medidas que consideremos oportunas para hacer frente al incumplimiento, incluyendo la suspensión temporal o permanente de su acceso al sitio web, poniéndonos en contacto con su proveedor de servicios de Internet para solicitarle que bloquee su acceso al sitio web, y/o iniciar acciones legales contra usted."
        ]
      },
      {
        "sectionTitle": "18. Fuerza mayor (Force majeure)",
        "paragraphs": [
          "Excepto en el caso de las obligaciones de pago de dinero, ningún retraso, fallo u omisión por parte de cualquiera de las partes en el cumplimiento o la observancia de cualquiera de sus obligaciones en virtud del presente documento se considerará un incumplimiento de estos Términos y condiciones si, y mientras, dicho retraso, fallo u omisión se deba a una causa más allá del control razonable de dicha parte."
        ]
      },
      {
        "sectionTitle": "19. Indemnización",
        "paragraphs": [
          "Usted se compromete a indemnizarnos, defendernos y eximirnos de toda reclamación, responsabilidad, daños, pérdidas y gastos, relacionados con la violación de estas condiciones y de las leyes aplicables, incluidos los derechos de propiedad intelectual y los derechos de privacidad. Usted nos reembolsará sin demora los daños, pérdidas, costes y gastos relacionados con dichas reclamaciones o derivados de ellas."
        ]
      },
      {
        "sectionTitle": "20. Renuncia",
        "paragraphs": [
          "El incumplimiento de cualquiera de las disposiciones establecidas en estos Términos y condiciones y en cualquier Acuerdo, o la falta de ejercicio de cualquier opción de interrupción, no se interpretará como una renuncia a dichas disposiciones y no afectará a la validez de estos Términos y Condiciones o de cualquier Acuerdo o cualquier parte del mismo, ni al derecho posterior de hacer cumplir todas y cada una de las disposiciones."
        ]
      },
      {
        "sectionTitle": "21. Idioma",
        "paragraphs": [
          "Estos Términos y Condiciones se interpretarán y analizarán exclusivamente en Español; castellano. Todas las notificaciones y la correspondencia se redactarán exclusivamente en ese idioma."
        ]
      },
      {
        "sectionTitle": "22. Acuerdo completo",
        "paragraphs": [
          "Estos Términos y condiciones, junto con nuestra declaración de privacidad y nuestra política de cookies , constituyen el acuerdo completo entre tú y Cristina Rodríguez Yanes en relación con el uso de este sitio web."
        ]
      },
      {
        "sectionTitle": "23. Actualización de los presentes Términos y Condiciones",
        "paragraphs": [
          "Es posible que actualicemos estos Términos y Condiciones de vez en cuando. La fecha indicada al principio de estas Condiciones Generales es la última fecha de revisión. Le notificaremos por escrito cualquier cambio o actualización, y los Términos y Condiciones revisados entrarán en vigor a partir de la fecha en que le enviemos dicha notificación. El uso continuado de este sitio web tras la publicación de cambios o actualizaciones se considerará un aviso de su aceptación de cumplir y estar sujeto por estos Términos y Condiciones. Para solicitar una versión anterior de estos Términos y condiciones, póngase en contacto con nosotros."
        ]
      },
      {
        "sectionTitle": "24. Elección de ley y jurisdicción",
        "paragraphs": [
          "Estos Términos y Condiciones se regirán por las leyes de España. Cualquier disputa relacionada con estos Términos y Condiciones estará sujeta a la jurisdicción de los tribunales de España. Si un tribunal u otra autoridad considera que alguna parte o disposición de estos Términos y Condiciones es inválida y/o inaplicable en virtud de la legislación vigente, dicha parte o disposición será modificada, eliminada y/o aplicada en la mayor medida permitida para hacer efectiva la intención de estos Términos y Condiciones. Las demás disposiciones no se verán afectadas."
        ]
      },
      {
        "sectionTitle": "25. Información del contacto",
        "paragraphs": [
          "Este sitio web es propiedad y está gestionado por Cristina Rodríguez Yanes.",
          "Puedes contactar con nosotros en relación a estos términos y condiciones escribiéndonos o enviándonos un correo electrónico a la siguiente dirección: info@designcanarias.com",
          "C/barranco san Juan, 28 | Tacoronte"
        ]
      },
      {
        "sectionTitle": "26. Descargar",
        "paragraphs": [
          "También puedes descargar nuestros Términos y condiciones en PDF."
        ]
      }
    ]
  },
  {
    "id": "descargo-responsabilidad",
    "title": "Descargo de responsabilidad",
    "category": "documentacion",
    "badge": "Exoneración & Garantías",
    "tagline": "Límites de responsabilidad, exactitud informativa, enlaces a terceros y disponibilidad del servicio.",
    "iconName": "AlertTriangle",
    "sourceUrl": "https://designcanarias.com/descargo-de-responsabilidad/",
    "cards": [
      {
        "title": "Finalidad Informativa",
        "desc": "El contenido tiene finalidad meramente informativa y comercial. No constituye asesoramiento vinculante ni suplanta recomendaciones técnicas.",
        "tag": "Cláusula 1",
        "iconName": "Eye"
      },
      {
        "title": "Uso Bajo Propia Cuenta",
        "desc": "El usuario navega bajo su exclusiva responsabilidad. dDesign Canarias no responde por decisiones adoptadas en base a contenidos web.",
        "tag": "Cláusula 2",
        "iconName": "AlertCircle"
      },
      {
        "title": "Enlaces a Terceros",
        "desc": "No se asume responsabilidad alguna por el contenido, políticas de privacidad o disponibilidad de plataformas y sitios externos enlazados.",
        "tag": "Cláusula 3",
        "iconName": "ExternalLink"
      },
      {
        "title": "Variación de Precios",
        "desc": "Las tarifas y ofertas pueden actualizarse sin previo aviso; la adquisición final queda sujeta a la disponibilidad efectiva de taller.",
        "tag": "Cláusula 5",
        "iconName": "Receipt"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Descargo de responsabilidad",
        "paragraphs": [
          "El presente descargo de responsabilidad regula el uso del sitio web www.designcanarias.com (en adelante, “el Sitio Web” ), titularidad de Cristina Rodríguez Yanes (en adelante, dDesign Canarias ).",
          "1. Finalidad del Sitio Web",
          "El contenido de este Sitio Web tiene una finalidad meramente informativa y comercial. La información, imágenes, precios, productos y servicios mostrados pueden estar sujetos a cambios o actualizaciones sin previo aviso. dDesign Canarias no garantiza la exactitud ni la actualidad de los contenidos en todo momento."
        ]
      },
      {
        "sectionTitle": "2. Responsabilidad por el uso del sitio",
        "paragraphs": [
          "El usuario accede y utiliza este Sitio Web bajo su exclusiva responsabilidad. dDesign Canarias no será responsable de los daños o perjuicios derivados del acceso, uso o mala utilización de los contenidos o de la información publicada, ni de las consecuencias que pudieran derivarse de su aplicación práctica."
        ]
      },
      {
        "sectionTitle": "3. Enlaces externos",
        "paragraphs": [
          "El Sitio Web puede contener enlaces a sitios web de terceros. Estos enlaces tienen como único objetivo facilitar el acceso a fuentes de información relacionadas. dDesign Canarias no se responsabiliza del contenido, exactitud, legalidad o disponibilidad de dichos sitios externos ni de los daños o pérdidas derivados de su uso."
        ]
      },
      {
        "sectionTitle": "4. Responsabilidad por fallos técnicos o interrupciones",
        "paragraphs": [
          "dDesign Canarias no garantiza la disponibilidad continua del Sitio Web ni la ausencia de errores técnicos. No se hace responsable de los daños o perjuicios ocasionados por fallos en el sistema, virus, interrupciones o cualquier otra circunstancia ajena a su control."
        ]
      },
      {
        "sectionTitle": "5. Responsabilidad sobre los precios y productos",
        "paragraphs": [
          "Los precios y características de los productos o servicios mostrados en el Sitio Web pueden variar sin previo aviso. Los precios visibles en la web son orientativos y pueden no incluir impuestos o gastos adicionales. El precio final será confirmado tras la revisión y aceptación del presupuesto."
        ]
      },
      {
        "sectionTitle": "6. Propiedad intelectual",
        "paragraphs": [
          "Todos los contenidos del Sitio Web, incluidos textos, imágenes, logotipos, diseños y materiales gráficos, son propiedad de dDesign Canarias o de sus respectivos titulares. Se prohíbe la reproducción, distribución o modificación total o parcial sin autorización expresa."
        ]
      },
      {
        "sectionTitle": "7. Modificaciones del descargo de responsabilidad",
        "paragraphs": [
          "dDesign Canarias se reserva el derecho de modificar en cualquier momento este descargo de responsabilidad para adaptarlo a novedades legislativas o cambios en la prestación de servicios."
        ]
      },
      {
        "sectionTitle": "8. Legislación aplicable",
        "paragraphs": [
          "Este descargo de responsabilidad se rige por la legislación española. Para cualquier conflicto o discrepancia que pudiera surgir, ambas partes se someten expresamente a los Juzgados y Tribunales de Santa Cruz de Tenerife , salvo disposición legal en contrario."
        ]
      }
    ]
  },
  {
    "id": "politica-privacidad",
    "title": "Política de privacidad",
    "category": "documentacion",
    "badge": "RGPD (UE) & LOPDGDD",
    "tagline": "Tratamiento de datos personales por Cristina Rodríguez Yanes (dDesign Canarias) y derechos ARCO.",
    "iconName": "ShieldCheck",
    "sourceUrl": "https://designcanarias.com/politica-de-privacidad/",
    "cards": [
      {
        "title": "Responsable del Tratamiento",
        "desc": "Cristina Rodríguez Yanes (dDesign Canarias), C/ Barranco San Juan, 28, Tacoronte, Santa Cruz de Tenerife. Contacto: info@designcanarias.com.",
        "tag": "Responsable RGPD",
        "iconName": "Building2"
      },
      {
        "title": "Finalidades del Fichero",
        "desc": "Gestión operativa de encargos de imprenta y diseño, facturación tributaria, atención de incidencias y envíos comerciales previa autorización.",
        "tag": "Finalidad Lícita",
        "iconName": "CheckCircle2"
      },
      {
        "title": "Ejercicio de Derechos",
        "desc": "Acceso, rectificación, supresión, limitación, portabilidad y oposición remitiendo escrito y documento identificativo a info@designcanarias.com.",
        "tag": "Derechos ARCO+",
        "iconName": "Lock"
      },
      {
        "title": "Seguridad de Datos",
        "desc": "Comunicaciones cifradas mediante protocolo SSL/TLS y custodia segura de ficheros contra accesos no autorizados o alteraciones.",
        "tag": "Cifrado SSL",
        "iconName": "ShieldCheck"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Política de privacidad",
        "paragraphs": [
          "En dDesign Canarias , propiedad de Cristina Rodríguez Yanes (NIF 43382485T), nos comprometemos a proteger y respetar la privacidad de nuestros usuarios. Esta política explica cómo recopilamos, usamos y protegemos su información personal al utilizar nuestra web www.designcanarias.com ."
        ]
      },
      {
        "sectionTitle": "1. Responsable del tratamiento",
        "paragraphs": [
          "Nombre legal: Cristina Rodríguez Yanes",
          "Nombre comercial: dDesign Canarias",
          "Dirección: C/Barranco San Juan, 28, Tacoronte",
          "Correo electrónico: info@designcanarias.com",
          "Teléfono: +34 641 50 17 73"
        ]
      },
      {
        "sectionTitle": "2. Datos que recopilamos",
        "paragraphs": [
          "Recopilamos información personal cuando usted:",
          "• Rellena un formulario de contacto o de presupuesto.",
          "• Realiza un pedido o solicita un diseño personalizado.",
          "• Se suscribe a nuestro boletín o se comunica con nosotros por correo electrónico. Los datos que podemos recopilar incluyen su nombre, correo electrónico, dirección, teléfono, datos de facturación y cualquier información adicional necesaria para la prestación del servicio."
        ]
      },
      {
        "sectionTitle": "3. Finalidad del tratamiento",
        "paragraphs": [
          "Los datos personales se utilizan para:",
          "• Gestionar presupuestos, pedidos o servicios solicitados.",
          "• Comunicarnos con el usuario sobre su solicitud o cuenta.",
          "• Emitir facturas, comprobantes o documentación legal.",
          "• Enviar información comercial, siempre con consentimiento previo."
        ]
      },
      {
        "sectionTitle": "4. Base legal para el tratamiento",
        "paragraphs": [
          "El tratamiento de sus datos se basa en:",
          "• El cumplimiento de una obligación contractual o precontractual.",
          "• El consentimiento del usuario para comunicaciones o suscripciones.",
          "• El interés legítimo de dDesign Canarias para mejorar sus servicios."
        ]
      },
      {
        "sectionTitle": "5. Conservación de los datos",
        "paragraphs": [
          "Sus datos se conservarán durante el tiempo necesario para cumplir con las finalidades descritas o mientras existan obligaciones legales o contractuales derivadas de los servicios prestados."
        ]
      },
      {
        "sectionTitle": "6. Derechos del usuario",
        "paragraphs": [
          "Puede ejercer sus derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad dirigiendo una solicitud a info@designcanarias.com adjuntando una copia de su documento de identidad."
        ]
      },
      {
        "sectionTitle": "7. Comunicación de datos a terceros",
        "paragraphs": [
          "No compartimos sus datos con terceros salvo obligación legal o para la correcta prestación del servicio (por ejemplo, empresas de transporte o servicios de pago seguro)."
        ]
      },
      {
        "sectionTitle": "8. Seguridad de la información",
        "paragraphs": [
          "Aplicamos medidas técnicas y organizativas adecuadas para garantizar la seguridad y confidencialidad de los datos, evitando su pérdida, alteración o acceso no autorizado."
        ]
      },
      {
        "sectionTitle": "9. Política de cookies",
        "paragraphs": [
          "Para más información sobre el uso de cookies, consulte nuestra Política de Cookies ."
        ]
      },
      {
        "sectionTitle": "10. Modificaciones de la política",
        "paragraphs": [
          "dDesign Canarias se reserva el derecho a modificar esta Política de Privacidad para adaptarla a cambios legales o de funcionamiento. Las actualizaciones se publicarán en esta misma página."
        ]
      },
      {
        "sectionTitle": "📧 Contacto en materia de privacidad",
        "paragraphs": [
          "Si tiene dudas sobre esta política o sobre el tratamiento de sus datos personales, puede escribirnos a info@designcanarias.com ."
        ]
      }
    ]
  },
  {
    "id": "politica-cookies",
    "title": "Política de cookies (UE)",
    "category": "documentacion",
    "badge": "Directiva ePrivacy UE",
    "tagline": "Uso de cookies técnicas, analíticas y de preferencias conforme a la normativa comunitaria europea.",
    "iconName": "Cookie",
    "sourceUrl": "https://designcanarias.com/politica-de-cookies-ue/",
    "cards": [
      {
        "title": "Cookies Técnicas",
        "desc": "Esenciales para el funcionamiento correcto de la web, la persistencia del carrito de pedidos y la seguridad de la navegación del usuario.",
        "tag": "Funcionales",
        "iconName": "Sliders"
      },
      {
        "title": "Analítica y Métricas",
        "desc": "Medición anónima de tráfico e interacción para optimizar la velocidad del portal y la estructura de navegación en Canarias.",
        "tag": "Estadísticas",
        "iconName": "Layers"
      },
      {
        "title": "Consentimiento Activo",
        "desc": "Mecanismo Complianz de aceptación o rechazo modular por categorías previo a la carga de cualquier script no indispensable.",
        "tag": "Panel de Control",
        "iconName": "Cookie"
      },
      {
        "title": "Configuración en Browser",
        "desc": "El usuario puede en cualquier momento bloquear, eliminar o consultar cookies mediante las opciones de privacidad de su navegador.",
        "tag": "Gestión de Cookies",
        "iconName": "Lock"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Política de cookies (UE)",
        "paragraphs": [
          "Esta política de cookies fue actualizada por última vez el 23 de octubre de 2025 y se aplica a los ciudadanos y residentes legales permanentes del Espacio Económico Europeo y Suiza."
        ]
      },
      {
        "sectionTitle": "1. Introducción",
        "paragraphs": [
          "Nuestra web, https://designcanarias.com (en adelante: «la web») utiliza cookies y otras tecnologías relacionadas (para mayor comodidad, todas las tecnologías se denominan «cookies»). Las cookies también son colocadas por terceros a los que hemos contratado. En el siguiente documento te informamos sobre el uso de cookies en nuestra web."
        ]
      },
      {
        "sectionTitle": "2. ¿Qué son las cookies?",
        "paragraphs": [
          "Una cookie es un pequeño archivo que se envía junto con las páginas de esta web y que tu navegador almacena en el disco duro de su ordenador u otro dispositivo. La información almacenada puede ser devuelta a nuestros servidores o a los servidores de terceros apropiados durante una visita posterior."
        ]
      },
      {
        "sectionTitle": "3. ¿Qué son los scripts?",
        "paragraphs": [
          "Un script es un fragmento de código de programa que se utiliza para hacer que nuestra web funcione correctamente y de forma interactiva. Este código se ejecuta en nuestro servidor o en tu dispositivo."
        ]
      },
      {
        "sectionTitle": "4. ¿Qué es una baliza web?",
        "paragraphs": [
          "Una baliza web (o una etiqueta de píxel) es una pequeña e invisible pieza de texto o imagen en una web que se utiliza para monitorear el tráfico en una web. Para ello, se almacenan varios datos sobre usted mediante estas balizas web."
        ]
      },
      {
        "sectionTitle": "5.1 Cookies técnicas o funcionales",
        "paragraphs": [
          "Algunas cookies aseguran que ciertas partes de la web funcionen correctamente y que tus preferencias de usuario sigan recordándose. Al colocar cookies funcionales, te facilitamos la visita a nuestra web. De esta manera, no necesitas introducir repetidamente la misma información cuando visitas nuestra web y, por ejemplo, los artículos permanecen en tu cesta de la compra hasta que hayas pagado. Podemos colocar estas cookies sin tu consentimiento."
        ]
      },
      {
        "sectionTitle": "5.2 Cookies de estadísticas",
        "paragraphs": [
          "Utilizamos cookies estadísticas para optimizar la experiencia de la web para nuestros usuarios. Con estas cookies estadísticas obtenemos información sobre el uso de nuestra web. Te pedimos tu permiso para colocar cookies de estadísticas."
        ]
      },
      {
        "sectionTitle": "5.3 Cookies de marketing/seguimiento",
        "paragraphs": [
          "Las cookies de marketing/seguimiento son cookies, o cualquier otra forma de almacenamiento local, usadas para crear perfiles de usuario para mostrar publicidad o para hacer el seguimiento del usuario en esta web o en varias webs con fines de marketing similares."
        ]
      },
      {
        "sectionTitle": "5.4 Redes sociales",
        "paragraphs": [
          "En nuestra web hemos incluido contenido de Instagram, Facebook, WhatsApp y TikTok para promover páginas web (p.ej.: «Me gusta», «Pinear») o compartir (p.ej.: «tuitear») en redes sociales como Instagram, Facebook, WhatsApp y TikTok. Este contenido está incrustado con código derivado de Instagram, Facebook, WhatsApp y TikTok y guarda cookies. Este contenido podría procesar cierta información para anuncios personalizados.",
          "Por favor lea la política de privacidad de estas redes sociales (que puede cambiar frecuentemente) para saber que hacen con sus datos (personales) que procesan usando estas cookies. Los datos que reciben son anonimizados lo máximo posible. Instagram, Facebook, WhatsApp y TikTok están ubicados en los Estados Unidos."
        ]
      },
      {
        "sectionTitle": "Elementor",
        "paragraphs": [
          "Estadísticas (anónimas)",
          "Consent to service elementor"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Elementor para creación de contenido. Leer más acerca de Elementor"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Estos datos no se comparten con terceros."
        ]
      },
      {
        "sectionTitle": "Estadísticas (anónimas)",
        "paragraphs": [
          "Nombre",
          "elementor",
          "Caducidad",
          "persistente",
          "Función",
          "Guardar acciones hechas por usuarios en el sitio web"
        ]
      },
      {
        "sectionTitle": "WordPress",
        "paragraphs": [
          "Funcional",
          "Consent to service wordpress"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos WordPress para desarrollo de sitios web. Leer más acerca de WordPress"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Estos datos no se comparten con terceros."
        ]
      },
      {
        "sectionTitle": "Funcional",
        "paragraphs": [
          "Nombre",
          "wpEmojiSettingsSupports",
          "Caducidad",
          "sesión",
          "Función",
          "Guardar detalles del navegador",
          "Nombre",
          "wp-settings-*",
          "Caducidad",
          "persistent",
          "Función",
          "Store user preferences",
          "Nombre",
          "wp-settings-time-*",
          "Caducidad",
          "1 year",
          "Función",
          "Store user preferences",
          "Nombre",
          "wordpress_logged_in_*",
          "Caducidad",
          "persistent",
          "Función",
          "Store logged in users",
          "Nombre",
          "wordpress_test_cookie",
          "Caducidad",
          "sesión",
          "Función",
          "Chequear si se pueden instalar cookies",
          "Nombre",
          "wp_lang",
          "Caducidad",
          "sesión",
          "Función",
          "Guardar configuraciones de lenguaje"
        ]
      },
      {
        "sectionTitle": "Sourcebuster JS",
        "paragraphs": [
          "Estadísticas",
          "Consent to service sourcebuster-js"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Sourcebuster JS para seguimiento de visitantes. Leer más acerca de Sourcebuster JS"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Estos datos no se comparten con terceros."
        ]
      },
      {
        "sectionTitle": "Estadísticas",
        "paragraphs": [
          "Nombre",
          "sbjs_migrations",
          "Caducidad",
          "6 months",
          "Función",
          "Store the user's usage history",
          "Nombre",
          "sbjs_current_add",
          "Caducidad",
          "6 months",
          "Función",
          "Store and count pageviews",
          "Nombre",
          "sbjs_first_add",
          "Caducidad",
          "6 months",
          "Función",
          "Store and count pageviews",
          "Nombre",
          "sbjs_current",
          "Caducidad",
          "6 months",
          "Función",
          "Store browser details",
          "Nombre",
          "sbjs_first",
          "Caducidad",
          "session",
          "Función",
          "Store and track interaction",
          "Nombre",
          "sbjs_udata",
          "Caducidad",
          "6 months",
          "Función",
          "Store a unique session ID",
          "Nombre",
          "sbjs_session",
          "Caducidad",
          "30 minutes",
          "Función",
          "Store and count pageviews"
        ]
      },
      {
        "sectionTitle": "Active Campaign",
        "paragraphs": [
          "Marketing",
          "Consent to service active-campaign"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Active Campaign para marketing automatizado (marketing por email automático). Leer más acerca de Active Campaign"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Para más información, por favor, lee la política de privacidad de Active Campaign ."
        ]
      },
      {
        "sectionTitle": "Marketing",
        "paragraphs": [
          "Nombre",
          "prism_*",
          "Caducidad",
          "2 años",
          "Función",
          "Store and track interaction"
        ]
      },
      {
        "sectionTitle": "Adobe Fonts",
        "paragraphs": [
          "Marketing",
          "Consent to service adobe-fonts"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Adobe Fonts para mostrar fuentes web. Leer más acerca de Adobe Fonts"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Para más información, por favor, lee la política de privacidad de Adobe Fonts ."
        ]
      },
      {
        "sectionTitle": "Marketing",
        "paragraphs": [
          "Nombre",
          "Adobe Fonts API",
          "Caducidad",
          "nada",
          "Función",
          "Solicitar la dirección IP del usuario"
        ]
      },
      {
        "sectionTitle": "Google reCAPTCHA",
        "paragraphs": [
          "Marketing",
          "Consent to service google-recaptcha"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Google reCAPTCHA para prevención de spam. Leer más acerca de Google reCAPTCHA"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Para más información, por favor, lee la política de privacidad de Google reCAPTCHA ."
        ]
      },
      {
        "sectionTitle": "Marketing",
        "paragraphs": [
          "Nombre",
          "rc::c",
          "Caducidad",
          "sesión",
          "Función",
          "Filtrar solicitudes de bots",
          "Nombre",
          "rc::b",
          "Caducidad",
          "sesión",
          "Función",
          "Filtrar solicitudes de bots",
          "Nombre",
          "rc::a",
          "Caducidad",
          "persistente",
          "Función",
          "Filtrar solicitudes de bots"
        ]
      },
      {
        "sectionTitle": "Google Maps",
        "paragraphs": [
          "Marketing",
          "Consent to service google-maps"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Google Maps para mostrar mapas. Leer más acerca de Google Maps"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Para más información, por favor, lee la política de privacidad de Google Maps ."
        ]
      },
      {
        "sectionTitle": "Marketing",
        "paragraphs": [
          "Nombre",
          "Google Maps API",
          "Caducidad",
          "nada",
          "Función",
          "Solicitar la dirección IP del usuario"
        ]
      },
      {
        "sectionTitle": "YouTube",
        "paragraphs": [
          "Marketing",
          "Consent to service youtube"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos YouTube para mostrar video. Leer más acerca de YouTube"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Para más información, por favor, lee la política de privacidad de YouTube ."
        ]
      },
      {
        "sectionTitle": "Marketing",
        "paragraphs": [
          "Nombre",
          "GPS",
          "Caducidad",
          "sesión",
          "Función",
          "Guardar datos de ubicación",
          "Nombre",
          "VISITOR_INFO1_LIVE",
          "Caducidad",
          "6 meses",
          "Función",
          "Habilitar la publicación de anuncios o retargeting",
          "Nombre",
          "YSC",
          "Caducidad",
          "sesión",
          "Función",
          "Store and track interaction",
          "Nombre",
          "PREF",
          "Caducidad",
          "8 meses",
          "Función",
          "Guardar las preferencias de los usuarios"
        ]
      },
      {
        "sectionTitle": "Facebook",
        "paragraphs": [
          "Marketing, Funcional",
          "Consent to service facebook"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Facebook para mostrar publicaciones sociales recientes y/o botones sociales para compartir en redes sociales. Leer más acerca de Facebook"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Para más información, por favor, lee la política de privacidad de Facebook ."
        ]
      },
      {
        "sectionTitle": "Marketing",
        "paragraphs": [
          "Nombre",
          "_fbc",
          "Caducidad",
          "2 años",
          "Función",
          "Almacenar la última visita",
          "Nombre",
          "fbm*",
          "Caducidad",
          "1 año",
          "Función",
          "Guardar detalles de la cuenta",
          "Nombre",
          "Caducidad",
          "3 meses",
          "Función",
          "Almacena una ID de sesión única",
          "Nombre",
          "Caducidad",
          "3 meses",
          "Función",
          "Habilitar la publicación de anuncios o retargeting",
          "Nombre",
          "act",
          "Caducidad",
          "90 días",
          "Función",
          "Mantener los usuarios logeados",
          "Nombre",
          "_fbp",
          "Caducidad",
          "3 meses",
          "Función",
          "Almacenar y realizar un seguimiento de las visitas a través de múltiples sitios web",
          "Nombre",
          "datr",
          "Caducidad",
          "2 años",
          "Función",
          "Proporcionar prevención de fraude",
          "Nombre",
          "c_user",
          "Caducidad",
          "30 días",
          "Función",
          "Almacenar un ID de usuario único",
          "Nombre",
          "Caducidad",
          "2 años",
          "Función",
          "Guardar detalles del navegador",
          "Nombre",
          "*_fbm_",
          "Caducidad",
          "1 año",
          "Función",
          "Guardar detalles de la cuenta"
        ]
      },
      {
        "sectionTitle": "Funcional",
        "paragraphs": [
          "Nombre",
          "Caducidad",
          "1 semana",
          "Función",
          "Determinar la resolución de pantalla",
          "Nombre",
          "csm",
          "Caducidad",
          "90 días",
          "Función",
          "Proporcionar prevención de fraude",
          "Nombre",
          "actppresence",
          "Caducidad",
          "sesión",
          "Función",
          "Almacenar y rastrear si la pestaña del navegador está activa"
        ]
      },
      {
        "sectionTitle": "WhatsApp",
        "paragraphs": [
          "Funcional",
          "Consent to service whatsapp"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos WhatsApp para soporte por chat. Leer más acerca de WhatsApp"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Para más información, por favor, lee la política de privacidad de WhatsApp ."
        ]
      },
      {
        "sectionTitle": "Funcional",
        "paragraphs": [
          "Nombre",
          "wa_lang_pref",
          "Caducidad",
          "6 días",
          "Función",
          "Guardar configuraciones de lenguaje",
          "Nombre",
          "wa_ul",
          "Caducidad",
          "sesión",
          "Función",
          "Provide access"
        ]
      },
      {
        "sectionTitle": "TikTok",
        "paragraphs": [
          "Marketing, Funcional",
          "Consent to service tiktok"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos TikTok para mostrar video. Leer más acerca de TikTok"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Para más información, por favor, lee la política de privacidad de TikTok ."
        ]
      },
      {
        "sectionTitle": "Marketing",
        "paragraphs": [
          "Nombre",
          "s_v_web_id",
          "Caducidad",
          "sesión",
          "Función",
          "Almacenar si el usuario ha visto contenido incrustado",
          "Nombre",
          "MONITOR_WEB_ID",
          "Caducidad",
          "3 meses",
          "Función",
          "Almacenar si el usuario ha visto contenido incrustado",
          "Nombre",
          "tt_webid",
          "Caducidad",
          "1 año",
          "Función",
          "Almacenar si el usuario ha visto contenido incrustado",
          "Nombre",
          "tt_webid_v2",
          "Caducidad",
          "1 año",
          "Función",
          "Almacenar si el usuario ha visto contenido incrustado",
          "Nombre",
          "ttwid",
          "Caducidad",
          "1 año",
          "Función",
          "Almacenar si el usuario ha visto contenido incrustado",
          "Nombre",
          "webapp_launch_mode",
          "Caducidad",
          "sesión",
          "Función",
          "Almacenar si el usuario ha visto contenido incrustado",
          "Nombre",
          "webapp_session_id",
          "Caducidad",
          "sesión",
          "Función",
          "Almacena una ID de sesión única",
          "Nombre",
          "webapp-session-referer",
          "Caducidad",
          "sesión",
          "Función",
          "Guardar el sitio web de referencia",
          "Nombre",
          "webapp_tiktok_privious",
          "Caducidad",
          "sesión",
          "Función",
          "Almacenar si el usuario ha visto contenido incrustado",
          "Nombre",
          "webapp_extra_data",
          "Caducidad",
          "sesión",
          "Función",
          "Proporcionar funcionalidad entre páginas",
          "Nombre",
          "webapp_original_traffic_type",
          "Caducidad",
          "sesión",
          "Función",
          "Almacenar si el usuario ha visto contenido incrustado",
          "Nombre",
          "guide-login-config",
          "Caducidad",
          "persistente",
          "Función",
          "Almacenar un ID de usuario único",
          "Nombre",
          "__tea_cache_tokens_*",
          "Caducidad",
          "persistente",
          "Función",
          "Almacena una ID de sesión única"
        ]
      },
      {
        "sectionTitle": "Funcional",
        "paragraphs": [
          "Nombre",
          "csrf_session_id",
          "Caducidad",
          "sesión",
          "Función",
          "Proporcionar protección contra los piratas informáticos",
          "Nombre",
          "tt_csrf_token",
          "Caducidad",
          "sesión",
          "Función",
          "Proporcionar protección contra los piratas informáticos",
          "Nombre",
          "_abck",
          "Caducidad",
          "1 año",
          "Función",
          "Proporcionar protección contra los piratas informáticos",
          "Nombre",
          "__tea_cache_first_*",
          "Caducidad",
          "persistente",
          "Función",
          "Cargar la funcionalidad de equilibrio de carga",
          "Nombre",
          "webapp-newuser",
          "Caducidad",
          "persistente",
          "Función",
          "Almacenar primera visita al sitio web",
          "Nombre",
          "autoplay-config",
          "Caducidad",
          "persistente",
          "Función",
          "Guardar la configuración",
          "Nombre",
          "webapp-video-mute",
          "Caducidad",
          "persistente",
          "Función",
          "Guardar la configuración"
        ]
      },
      {
        "sectionTitle": "Propósito pendiente de investigación",
        "paragraphs": [
          "Nombre",
          "Caducidad",
          "persistente",
          "Función"
        ]
      },
      {
        "sectionTitle": "Complianz",
        "paragraphs": [
          "Funcional",
          "Consent to service complianz"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Complianz para gestión del consentimiento de cookies. Leer más acerca de Complianz"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Estos datos no se comparten con terceros. Para más información, por favor, lee la política de privacidad de Complianz ."
        ]
      },
      {
        "sectionTitle": "Funcional",
        "paragraphs": [
          "Nombre",
          "cmplz_functional",
          "Caducidad",
          "365 días",
          "Función",
          "Store cookie consent preferences",
          "Nombre",
          "cmplz_statistics",
          "Caducidad",
          "365 días",
          "Función",
          "Store cookie consent preferences",
          "Nombre",
          "cmplz_preferences",
          "Caducidad",
          "365 días",
          "Función",
          "Store cookie consent preferences",
          "Nombre",
          "cmplz_marketing",
          "Caducidad",
          "365 días",
          "Función",
          "Store cookie consent preferences",
          "Nombre",
          "cmplz_consented_services",
          "Caducidad",
          "365 días",
          "Función",
          "Store cookie consent preferences",
          "Nombre",
          "cmplz_policy_id",
          "Caducidad",
          "365 días",
          "Función",
          "Store accepted cookie policy ID",
          "Nombre",
          "cmplz_banner-status",
          "Caducidad",
          "365 días",
          "Función",
          "Store if the cookie banner has been dismissed"
        ]
      },
      {
        "sectionTitle": "Google Analytics",
        "paragraphs": [
          "Estadísticas",
          "Consent to service google-analytics"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Google Analytics para estadísticas del sitio web. Leer más acerca de Google Analytics"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Para más información, por favor, lee la política de privacidad de Google Analytics ."
        ]
      },
      {
        "sectionTitle": "Estadísticas",
        "paragraphs": [
          "Nombre",
          "_ga",
          "Caducidad",
          "2 años",
          "Función",
          "Contar y rastrear páginas vistas",
          "Nombre",
          "_ga_*",
          "Caducidad",
          "1 año",
          "Función",
          "Contar y rastrear páginas vistas"
        ]
      },
      {
        "sectionTitle": "Matomo",
        "paragraphs": [
          "Estadísticas (anónimas)",
          "Consent to service matomo"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Matomo para estadísticas del sitio web. Leer más acerca de Matomo"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Estos datos no se comparten con terceros."
        ]
      },
      {
        "sectionTitle": "Estadísticas (anónimas)",
        "paragraphs": [
          "Nombre",
          "_pk_ref*",
          "Caducidad",
          "6 meses",
          "Función",
          "Guardar ID's de referidos",
          "Nombre",
          "_pk_id*",
          "Caducidad",
          "13 meses",
          "Función",
          "Almacenar un ID de usuario único",
          "Nombre",
          "_pk_ses*",
          "Caducidad",
          "sesión",
          "Función",
          "Almacena una ID de sesión única"
        ]
      },
      {
        "sectionTitle": "Automattic",
        "paragraphs": [
          "Estadísticas",
          "Consent to service automattic"
        ]
      },
      {
        "sectionTitle": "Uso",
        "paragraphs": [
          "Usamos Automattic para desarrollo de sitios web. Leer más acerca de Automattic"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Para más información, por favor, lee la política de privacidad de Automattic ."
        ]
      },
      {
        "sectionTitle": "Estadísticas",
        "paragraphs": [
          "Nombre",
          "tk_qs",
          "Caducidad",
          "30 minutos",
          "Función",
          "Proporcionar funcionalidad entre páginas"
        ]
      },
      {
        "sectionTitle": "Fancy Product Designer",
        "paragraphs": [
          "Funcional",
          "Consent to service fancy-product-designer"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Estos datos no se comparten con terceros."
        ]
      },
      {
        "sectionTitle": "Funcional",
        "paragraphs": [
          "Nombre",
          "fpd-storage",
          "Caducidad",
          "sesión",
          "Función",
          "Guardar la configuración"
        ]
      },
      {
        "sectionTitle": "WooCommerce",
        "paragraphs": [
          "Funcional",
          "Consent to service woocommerce"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Estos datos no se comparten con terceros."
        ]
      },
      {
        "sectionTitle": "Funcional",
        "paragraphs": [
          "Nombre",
          "wc_cart_hash_*",
          "Caducidad",
          "sesión",
          "Función",
          "Guardar artículos en el carrito de compras",
          "Nombre",
          "wc_fragments_*",
          "Caducidad",
          "persistente",
          "Función"
        ]
      },
      {
        "sectionTitle": "Polylang",
        "paragraphs": [
          "Funcional",
          "Consent to service polylang"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "Estos datos no se comparten con terceros."
        ]
      },
      {
        "sectionTitle": "Funcional",
        "paragraphs": [
          "Nombre",
          "pll_language",
          "Caducidad",
          "persistent",
          "Función",
          "Store language settings"
        ]
      },
      {
        "sectionTitle": "Varios",
        "paragraphs": [
          "Propósito pendiente de investigación",
          "Consent to service varios"
        ]
      },
      {
        "sectionTitle": "Compartir datos",
        "paragraphs": [
          "El intercambio de datos está pendiente de investigación"
        ]
      },
      {
        "sectionTitle": "Propósito pendiente de investigación",
        "paragraphs": [
          "Nombre",
          "uf_reports_to_send",
          "Caducidad",
          "Función",
          "Nombre",
          "tours",
          "Caducidad",
          "Función",
          "Nombre",
          "modalShown",
          "Caducidad",
          "Función",
          "Nombre",
          "uf_completed",
          "Caducidad",
          "Función",
          "Nombre",
          "uf_banners",
          "Caducidad",
          "Función",
          "Nombre",
          "wdp-pre-sso-state",
          "Caducidad",
          "Función",
          "Nombre",
          "e_kit-elements-defaults",
          "Caducidad",
          "Función",
          "Nombre",
          "wp_consent_marketing",
          "Caducidad",
          "Función",
          "Nombre",
          "wp_consent_statistics",
          "Caducidad",
          "Función",
          "Nombre",
          "wp_consent_statistics-anonymous",
          "Caducidad",
          "Función",
          "Nombre",
          "wp_consent_preferences",
          "Caducidad",
          "Función",
          "Nombre",
          "wp_consent_functional",
          "Caducidad",
          "Función",
          "Nombre",
          "uf_smartTips",
          "Caducidad",
          "Función",
          "Nombre",
          "_pk_ref_14115_069b",
          "Caducidad",
          "Función",
          "Nombre",
          "usetiful-visitor-ident",
          "Caducidad",
          "Función",
          "Nombre",
          "uf_collapsed",
          "Caducidad",
          "Función",
          "Nombre",
          "devkitCurrentChecklist",
          "Caducidad",
          "Función",
          "Nombre",
          "e_library",
          "Caducidad",
          "Función",
          "Nombre",
          "featurebaseGlobalAuth",
          "Caducidad",
          "Función",
          "Nombre",
          "mp_tab_id_mixpanel_150605b3b9f979922f2ac5a52e2dcfe9",
          "Caducidad",
          "Función",
          "Nombre",
          "mp_gen_new_tab_id_mixpanel_150605b3b9f979922f2ac5a52e2dcfe9",
          "Caducidad",
          "Función",
          "Nombre",
          "woosw_key",
          "Caducidad",
          "Función",
          "Nombre",
          "wds-seo-metabox",
          "Caducidad",
          "Función",
          "Nombre",
          "localTimeZone",
          "Caducidad",
          "Función",
          "Nombre",
          "woosw_data_YEQIWZ",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.166.0_0cf03cc9bf54d193dd07c863c60061d4_modules::search-console::searchanalytics::370",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.166.0_0cf03cc9bf54d193dd07c863c60061d4_modules::search-console::searchanalytics::21f",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.166.0_0cf03cc9bf54d193dd07c863c60061d4_modules::analytics-4::report::59cc309ccb2d4c3",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.166.0_0cf03cc9bf54d193dd07c863c60061d4_modules::analytics-4::report::31afd511b0bfe01",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.166.0_0cf03cc9bf54d193dd07c863c60061d4_modules::analytics-4::report::a0e73362aa05d23",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.166.0_0cf03cc9bf54d193dd07c863c60061d4_modules::analytics-4::report::9e723a743de908e",
          "Caducidad",
          "Función",
          "Nombre",
          "woocommerce_items_in_cart",
          "Caducidad",
          "Función",
          "Nombre",
          "woocommerce_cart_hash",
          "Caducidad",
          "Función",
          "Nombre",
          "wp_woocommerce_session_b1466bb8c1ee2a410c4b292d1a77e042",
          "Caducidad",
          "Función",
          "Nombre",
          "storeApiNonce",
          "Caducidad",
          "Función",
          "Nombre",
          "wpcode_scroll_position",
          "Caducidad",
          "Función",
          "Nombre",
          "storeApiCartData",
          "Caducidad",
          "Función",
          "Nombre",
          "storeApiCartHash",
          "Caducidad",
          "Función",
          "Nombre",
          "cmplz_cookie_data",
          "Caducidad",
          "365 días",
          "Función",
          "Nombre",
          "wp-autosave-1",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.168.0_f9fd202c6af6e438866a18c1e9fbc45b_modules::analytics-4::report::177dcf8cfbbf46b",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.168.0_f9fd202c6af6e438866a18c1e9fbc45b_modules::search-console::searchanalytics::3d4",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.168.0_f9fd202c6af6e438866a18c1e9fbc45b_modules::search-console::searchanalytics::d0c",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.168.0_f9fd202c6af6e438866a18c1e9fbc45b_modules::analytics-4::report::08ba5bdb333ea07",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.168.0_f9fd202c6af6e438866a18c1e9fbc45b_modules::analytics-4::report::71ede406407226a",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.168.0_f9fd202c6af6e438866a18c1e9fbc45b_modules::analytics-4::report::7a288e4b6fb063b",
          "Caducidad",
          "Función",
          "Nombre",
          "_lscache_vary",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.171.0_89dbede33d7f4d552199cec5fb75fa83_modules::search-console::searchanalytics::c57",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.171.0_89dbede33d7f4d552199cec5fb75fa83_modules::analytics-4::report::62dc9afb6e9f6e3",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.171.0_89dbede33d7f4d552199cec5fb75fa83_modules::analytics-4::report::f86e825895e424f",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.171.0_89dbede33d7f4d552199cec5fb75fa83_modules::analytics-4::report::e4cc1f842a83a13",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.171.0_89dbede33d7f4d552199cec5fb75fa83_modules::analytics-4::report::5a86a78f3d807db",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.171.0_89dbede33d7f4d552199cec5fb75fa83_modules::search-console::searchanalytics::9e5",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.171.0_89dbede33d7f4d552199cec5fb75fa83_modules::analytics-4::report::013f4e2c6eb7926",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.173.0_5837bf48a50eedb400baa93dcfe726a9_modules::analytics-4::report::a13a44e906b5961",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.173.0_5837bf48a50eedb400baa93dcfe726a9_modules::analytics-4::report::b4154d5a457d8ec",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.173.0_5837bf48a50eedb400baa93dcfe726a9_modules::search-console::searchanalytics::426",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.173.0_5837bf48a50eedb400baa93dcfe726a9_modules::analytics-4::report::6fa97894ed2c231",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.173.0_5837bf48a50eedb400baa93dcfe726a9_modules::search-console::searchanalytics::ccf",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.173.0_5837bf48a50eedb400baa93dcfe726a9_modules::analytics-4::report::68aff36c302eb5b",
          "Caducidad",
          "Función",
          "Nombre",
          "googlesitekit_1.173.0_5837bf48a50eedb400baa93dcfe726a9_modules::analytics-4::report::8b01b01e4ee523e",
          "Caducidad",
          "Función"
        ]
      },
      {
        "sectionTitle": "7. Consentimiento",
        "paragraphs": [
          "Cuando visites nuestra web por primera vez, te mostraremos una ventana emergente con una explicación sobre las cookies. Tan pronto como hagas clic en «Guardar preferencias», aceptas que usemos las categorías de cookies y plugins que has seleccionado en la ventana emergente, tal y como se describe en esta política de cookies. Puedes desactivar el uso de cookies a través de tu navegador, pero, por favor, ten en cuenta que nuestra web puede dejar de funcionar correctamente."
        ]
      },
      {
        "sectionTitle": "7.1 Gestiona tus ajustes de consentimiento",
        "paragraphs": [
          "Has cargado la política de cookies sin compatibilidad con JavaScript. En AMP, puedes utilizar el botón de gestionar el consentimiento en la parte inferior de la página."
        ]
      },
      {
        "sectionTitle": "8. Activación/desactivación y borrado de cookies",
        "paragraphs": [
          "Puedes utilizar tu navegador de Internet para eliminar las cookies de forma automática o manual. También puedes especificar que ciertas cookies no pueden ser colocadas. Otra opción es cambiar los ajustes de tu navegador de Internet para que recibas un mensaje cada vez que se coloca una cookie. Para obtener más información sobre estas opciones, consulta las instrucciones de la sección «Ayuda» de tu navegador.",
          "Ten en cuenta que nuestra web puede no funcionar correctamente si todas las cookies están desactivadas. Si borras las cookies de tu navegador, se volverán a colocar después de tu consentimiento cuando vuelvas a visitar nuestras webs."
        ]
      },
      {
        "sectionTitle": "9. Tus derechos con respecto a los datos personales",
        "paragraphs": [
          "Tienes los siguientes derechos con respecto a tus datos personales:",
          "• Tiene derecho a saber por qué se necesitan tus datos personales, qué sucederá con ellos y durante cuánto tiempo se conservarán.",
          "• Derecho de acceso: tienes derecho a acceder a tus datos personales que conocemos.",
          "• Derecho de rectificación: tienes derecho a completar, rectificar, borrar o bloquear tus datos personales cuando lo desees.",
          "• Si nos das tu consentimiento para procesar tus datos, tienes derecho a revocar dicho consentimiento y a que se eliminen tus datos personales.",
          "• Derecho de cesión de tus datos: tienes derecho a solicitar todos tus datos personales al responsable del tratamiento y a transferirlos íntegramente a otro responsable del tratamiento.",
          "• Derecho de oposición: puedes oponerte al tratamiento de tus datos. Nosotros cumplimos con esto, a menos que existan motivos justificados para el procesamiento.",
          "Para ejercer estos derechos, por favor, contacta con nosotros. Por favor, consulta los detalles de contacto en la parte inferior de esta política de cookies. Si tienes alguna queja sobre cómo gestionamos tus datos, nos gustaría que nos la hicieras saber, pero también tienes derecho a enviar una queja a la autoridad supervisora (la autoridad de protección de datos)."
        ]
      },
      {
        "sectionTitle": "10. Datos de contacto",
        "paragraphs": [
          "Para preguntas y/o comentarios sobre nuestra política de cookies y esta declaración, por favor, contacta con nosotros usando los siguientes datos de contacto:",
          "Cristina Rodríguez Yanes",
          "C/barranco san Juan, 28 | Tacoronte",
          "España",
          "Web: https://designcanarias.com",
          "Correo electrónico: info@ ex.com designcanarias.com",
          "Número de teléfono: 641501773",
          "Esta política de cookies se ha sincronizado con cookiedatabase.org el 22 de octubre de 2025."
        ]
      }
    ]
  },
  {
    "id": "condiciones-canarias",
    "title": "Condiciones específicas para Canarias",
    "category": "documentacion",
    "badge": "Régimen Fiscal IGIC & REF",
    "tagline": "Regulación singular para las 8 Islas Canarias: impuestos IGIC, logística interinsular y aduanas.",
    "iconName": "MapPin",
    "sourceUrl": "https://designcanarias.com/condiciones-especificas-para-canarias/",
    "cards": [
      {
        "title": "Impuestos y Régimen IGIC",
        "desc": "Facturación adaptada al Régimen Económico y Fiscal de Canarias (REF), con desglose del IGIC aplicable a clientes del archipiélago.",
        "tag": "Régimen REF",
        "iconName": "Receipt"
      },
      {
        "title": "Envíos Interinsulares",
        "desc": "Red de distribución especializada que cubre Tenerife, Gran Canaria, Lanzarote, Fuerteventura, La Palma, La Gomera, El Hierro y La Graciosa.",
        "tag": "8 Islas Canarias",
        "iconName": "Truck"
      },
      {
        "title": "Normativa Aduanera",
        "desc": "El tránsito interinsular canario carece de trabas aduaneras interiores. Envíos peninsulares e internacionales sometidos a control de aduanas.",
        "tag": "Tráfico Local",
        "iconName": "FileCheck"
      },
      {
        "title": "Atención Local Tenerife",
        "desc": "Instalaciones de diseño e impresión con atención directa desde Tacoronte, Santa Cruz de Tenerife (+34 641 50 17 73).",
        "tag": "Sede Física",
        "iconName": "Building2"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Condiciones específicas para Canarias",
        "paragraphs": [
          "En dDesign Canarias tenemos en cuenta las particularidades fiscales, logísticas y legales de las Islas Canarias. Estas condiciones se aplican exclusivamente a pedidos con destino a cualquier isla del archipiélago."
        ]
      },
      {
        "sectionTitle": "1. Impuestos y precios",
        "paragraphs": [
          "Todos los precios mostrados para clientes de Canarias incluyen el IGIC (Impuesto General Indirecto Canario) en lugar del IVA. Actualmente, el tipo general aplicable es del 7%, salvo productos o servicios con tipo reducido o exento."
        ]
      },
      {
        "sectionTitle": "2. Envíos y plazos",
        "paragraphs": [
          "Los pedidos con destino a las Islas Canarias se gestionan con transportistas especializados que aseguran la correcta llegada del pedido. Los plazos estimados de entrega son de 1 a 3 días laborables una vez enviado el pedido desde nuestro almacén.",
          "El coste de envío se calcula automáticamente en función del peso, dimensiones y destino dentro del archipiélago. Se aplicarán tasas adicionales si el transportista requiere servicios especiales o aduanas locales."
        ]
      },
      {
        "sectionTitle": "3. Aduanas y normativa local",
        "paragraphs": [
          "Todos los productos enviados a Canarias pueden estar sujetos a controles aduaneros. dDesign Canarias se encarga de los trámites habituales, pero cualquier impuesto o tasa extraordinaria será responsabilidad del cliente."
        ]
      },
      {
        "sectionTitle": "4. Productos personalizados",
        "paragraphs": [
          "Los pedidos de diseño personalizado o fabricados a medida seguirán el mismo procedimiento que el resto de España, con la particularidad de que los tiempos de entrega pueden variar ligeramente debido a transporte interinsular."
        ]
      },
      {
        "sectionTitle": "5. Cambios y devoluciones",
        "paragraphs": [
          "Las devoluciones de productos estándar están sujetas a nuestra política general, pero para Canarias se aplicarán costes de transporte específicos si el producto debe ser devuelto a nuestro almacén en Tenerife. Los productos personalizados no son retornables salvo defecto de fabricación."
        ]
      },
      {
        "sectionTitle": "6. Contacto para clientes de Canarias",
        "paragraphs": [
          "Para cualquier consulta específica relacionada con envíos, impuestos o pedidos personalizados desde Canarias, puede contactarnos:",
          "dDesign Canarias",
          "Correo electrónico: info@designcanarias.com",
          "Teléfono: +34 641 50 17 73"
        ]
      }
    ]
  }
];

export const DOCUMENTACION_EXTRA_ITEMS: DocumentationItem[] = [
  {
    "id": "politica-redes-sociales",
    "title": "Política de redes sociales",
    "category": "documentacion-extra",
    "badge": "Canales Oficiales & Moderación",
    "tagline": "Normas de interacción, conducta de usuarios y privacidad en Facebook, Instagram y perfiles oficiales.",
    "iconName": "Share2",
    "sourceUrl": "https://designcanarias.com/politica-de-redes-sociales/",
    "cards": [
      {
        "title": "Canales Oficiales",
        "desc": "Presencia verificada en Instagram, Facebook, Twitter y LinkedIn para exhibir proyectos de taller, novedades y promociones exclusivas.",
        "tag": "Perfiles Oficiales",
        "iconName": "Share2"
      },
      {
        "title": "Pautas de Convivencia",
        "desc": "Se fomenta el debate constructivo. Queda expresamente prohibido contenido ofensivo, vejatorio, spam o publicidad no autorizada.",
        "tag": "Comportamiento",
        "iconName": "ShieldAlert"
      },
      {
        "title": "Moderación & Bloqueo",
        "desc": "dDesign Canarias se reserva el derecho de suprimir comentarios infractores y bloquear a usuarios que reiteren faltas de respeto.",
        "tag": "Moderación Activa",
        "iconName": "AlertCircle"
      },
      {
        "title": "Privacidad de Seguidores",
        "desc": "El tratamiento de interacciones y datos se ajusta a la Política de Privacidad de la empresa; no se comparten datos con fines espurios.",
        "tag": "Datos Protegidos",
        "iconName": "Lock"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Política de redes sociales",
        "paragraphs": [
          "En dDesign Canarias utilizamos redes sociales para comunicarnos con nuestros clientes, compartir novedades, promociones y contenido relacionado con nuestros servicios de diseño e impresión. Esta política establece las normas de uso y el tratamiento de la información en nuestras plataformas sociales."
        ]
      },
      {
        "sectionTitle": "1. Uso de las redes sociales",
        "paragraphs": [
          "Los canales oficiales de dDesign Canarias incluyen, pero no se limitan a: Facebook, Instagram, Twitter y LinkedIn. Nuestro objetivo es ofrecer información útil y actualizada sobre nuestros productos, servicios y promociones."
        ]
      },
      {
        "sectionTitle": "2. Comportamiento en nuestras redes",
        "paragraphs": [
          "• Se permite la participación respetuosa de usuarios mediante comentarios, mensajes y reacciones.",
          "• No se tolerará contenido ofensivo, discriminatorio, spam, publicidad no autorizada ni mensajes ilegales.",
          "• Nos reservamos el derecho de eliminar publicaciones o comentarios que incumplan estas normas."
        ]
      },
      {
        "sectionTitle": "3. Protección de datos",
        "paragraphs": [
          "Los datos compartidos en nuestras redes sociales serán tratados conforme a la Política de Privacidad de nuestra web. Nunca compartiremos información personal de nuestros usuarios sin su consentimiento."
        ]
      },
      {
        "sectionTitle": "4. Enlaces a terceros",
        "paragraphs": [
          "Nuestras redes pueden contener enlaces a páginas externas. dDesign Canarias no se responsabiliza de la privacidad ni del contenido de sitios de terceros."
        ]
      },
      {
        "sectionTitle": "5. Contacto",
        "paragraphs": [
          "Para consultas, sugerencias o incidencias relacionadas con nuestras redes sociales, puede contactarnos en:",
          "dDesign Canarias",
          "Correo electrónico: info@designcanarias.com",
          "Teléfono: +34 641 50 17 73"
        ]
      }
    ]
  },
  {
    "id": "politica-accesibilidad",
    "title": "Política de accesibilidad web",
    "category": "documentacion-extra",
    "badge": "Pautas WCAG 2.1 AA",
    "tagline": "Compromiso de acceso universal, estándares técnicos multimedia y canales de soporte accesible.",
    "iconName": "Sliders",
    "sourceUrl": "https://designcanarias.com/politica-de-accesibilidad-web/",
    "cards": [
      {
        "title": "Acceso Universal",
        "desc": "Diseño centrado en garantizar la inclusión digital para que cualquier usuario, sin distinción de capacidades, navegue con facilidad.",
        "tag": "Inclusión Digital",
        "iconName": "Eye"
      },
      {
        "title": "Medidas Técnicas WCAG",
        "desc": "Jerarquía tipográfica semántica, contraste cromático optimizado, soporte de lectura por pantalla y navegación integral mediante teclado.",
        "tag": "Estándar WCAG 2.1",
        "iconName": "Sliders"
      },
      {
        "title": "Accesibilidad Multimedia",
        "desc": "Incorporación progresiva de descripciones en imágenes (alt-text) y transcripciones de elementos gráficos o audiovisuales.",
        "tag": "Contenido Adaptado",
        "iconName": "Palette"
      },
      {
        "title": "Canal de Soporte Accesible",
        "desc": "Asistencia prioritaria para usuarios con dificultades en info@designcanarias.com y teléfono +34 641 50 17 73 para solventar barreras.",
        "tag": "Soporte Dedicado",
        "iconName": "MessageCircle"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Política de accesibilidad web",
        "paragraphs": [
          "En dDesign Canarias nos comprometemos a ofrecer una experiencia de navegación accesible para todas las personas, incluyendo usuarios con discapacidad, cumpliendo con la normativa vigente en España y las pautas de accesibilidad WCAG 2.1."
        ]
      },
      {
        "sectionTitle": "1. Compromiso con la accesibilidad",
        "paragraphs": [
          "Nuestro objetivo es que todos los visitantes puedan acceder a la información, productos y servicios sin barreras, utilizando herramientas de asistencia como lectores de pantalla, teclados, lupas digitales u otros dispositivos."
        ]
      },
      {
        "sectionTitle": "2. Medidas adoptadas",
        "paragraphs": [
          "• Uso de etiquetas semánticas y encabezados correctamente estructurados.",
          "• Contraste adecuado de colores para facilitar la lectura.",
          "• Textos alternativos en imágenes importantes y decorativas.",
          "• Navegación clara y consistente en toda la web.",
          "• Adaptación de formularios y botones para su uso mediante teclado."
        ]
      },
      {
        "sectionTitle": "3. Contenido multimedia",
        "paragraphs": [
          "Cuando se publiquen vídeos o audios, se proporcionarán subtítulos, transcripciones o descripciones según la disponibilidad, garantizando la comprensión de la información para todos los usuarios."
        ]
      },
      {
        "sectionTitle": "4. Excepciones",
        "paragraphs": [
          "Aunque nos esforzamos por cumplir con los estándares de accesibilidad, algunos elementos de terceros (widgets, plugins o contenidos externos) pueden no ser totalmente accesibles. Estamos trabajando para minimizarlos y mejorar la experiencia de todos los usuarios."
        ]
      },
      {
        "sectionTitle": "5. Contacto para incidencias de accesibilidad",
        "paragraphs": [
          "Si encuentra dificultades para acceder a cualquier contenido o funcionalidad de nuestra web, puede contactarnos para recibir asistencia o reportar incidencias:",
          "dDesign Canarias",
          "Correo electrónico: info@designcanarias.com",
          "Teléfono: +34 641 50 17 73"
        ]
      }
    ]
  },
  {
    "id": "politica-presupuestos",
    "title": "Política de presupuesto / pedidos personalizados",
    "category": "documentacion-extra",
    "badge": "Producción a Medida",
    "tagline": "Condiciones de cotización, confirmación previa, aprobación de pruebas y fabricación personalizada.",
    "iconName": "Receipt",
    "sourceUrl": "https://designcanarias.com/politica-de-presupuesto-pedidos-personalizados/",
    "cards": [
      {
        "title": "Validez de Cotización",
        "desc": "Cada presupuesto formulado cuenta con especificaciones de tirada, materiales y costes con una vigencia fijada de 15 días naturales.",
        "tag": "15 Días Validez",
        "iconName": "Clock"
      },
      {
        "title": "Aceptación y Anticipo",
        "desc": "La fabricación y orden de acopio de materiales se activa una vez el cliente aprueba el presupuesto y abona el importe fijado.",
        "tag": "Fase Fabricación",
        "iconName": "Receipt"
      },
      {
        "title": "Exclusión de Desistimiento",
        "desc": "Por su naturaleza exclusiva a medida, los artículos personalizados no admiten cancelación ni devolución tras su entrada en taller.",
        "tag": "Art. 103.c RDL",
        "iconName": "AlertTriangle"
      },
      {
        "title": "Revisiones de Maqueta",
        "desc": "Cualquier alteración sustancial requerida con posterioridad al envío del presupuesto implicará reajuste de tarifas y calendario de entrega.",
        "tag": "Modificaciones",
        "iconName": "Sparkles"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Política de presupuesto / pedidos personalizados",
        "paragraphs": [
          "En dDesign Canarias ofrecemos productos y servicios personalizados de diseño e impresión. Todos los pedidos de este tipo se gestionan mediante un sistema de presupuesto previo para garantizar que el cliente reciba exactamente lo que desea y que el precio final refleje correctamente los materiales, tiempo y complejidad del diseño."
        ]
      },
      {
        "sectionTitle": "1. Cómo funciona el presupuesto",
        "paragraphs": [
          "• El cliente selecciona el producto y realiza el diseño o configuración mediante nuestro sistema “Tú Diseñas” .",
          "• Al finalizar el pedido, el precio puede aparecer como 0€ o provisional, indicando que se trata de un presupuesto.",
          "• El equipo de dDesign Canarias revisará el pedido, verificará los detalles y enviará un presupuesto definitivo por correo electrónico."
        ]
      },
      {
        "sectionTitle": "2. Confirmación y pago",
        "paragraphs": [
          "El cliente debe confirmar el presupuesto antes de proceder al pago. Una vez aceptado, se generará la factura correspondiente y se iniciará la producción del pedido."
        ]
      },
      {
        "sectionTitle": "3. Productos personalizados",
        "paragraphs": [
          "Todos los pedidos personalizados o fabricados bajo especificaciones del cliente no pueden ser cancelados ni devueltos, salvo en caso de defecto de fabricación o error atribuible a dDesign Canarias . En caso de incidencia, se gestionará la devolución, sustitución o corrección del producto."
        ]
      },
      {
        "sectionTitle": "4. Plazos de entrega",
        "paragraphs": [
          "Los plazos de entrega para productos personalizados se indican en el presupuesto y pueden variar según la complejidad del diseño y la carga de producción. Todos los plazos se calculan a partir de la confirmación del presupuesto y el pago."
        ]
      },
      {
        "sectionTitle": "5. Cambios en el diseño",
        "paragraphs": [
          "Cualquier modificación en el diseño después de enviado el presupuesto puede implicar ajustes en el precio y el tiempo de entrega. Se notificará al cliente antes de realizar cualquier cambio o coste adicional."
        ]
      },
      {
        "sectionTitle": "6. Contacto",
        "paragraphs": [
          "Para consultas sobre presupuestos, cambios en pedidos o incidencias, puede contactarnos:",
          "dDesign Canarias",
          "Correo electrónico: info@designcanarias.com",
          "Teléfono: +34 641 50 17 73"
        ]
      }
    ]
  },
  {
    "id": "politica-precios-impuestos",
    "title": "Política de precios e impuestos",
    "category": "documentacion-extra",
    "badge": "Tarificación & Facturación",
    "tagline": "Desglose de precios en euros (€), aplicación del IGIC canario, validez de tarifas y facturas digitales.",
    "iconName": "CreditCard",
    "sourceUrl": "https://designcanarias.com/politica-de-precios-e-impuestos/",
    "cards": [
      {
        "title": "Precios Oficiales en €",
        "desc": "Tarifas mostradas en euros (€) con desglose de impuestos canarios (IGIC) o indicación de régimen de exención fiscal según corresponda.",
        "tag": "Moneda Euro (€)",
        "iconName": "CreditCard"
      },
      {
        "title": "Ajuste por Materias Primas",
        "desc": "Las tarifas pueden revisarse periódicamente debido a costes de materias primas o transporte; las órdenes formalizadas no sufren aumentos.",
        "tag": "Garantía de Tarifa",
        "iconName": "Sliders"
      },
      {
        "title": "Pasarelas Seguras",
        "desc": "Aceptación de pagos con tarjeta de crédito/débito encriptada, Bizum para empresas o transferencia bancaria antes de la entrega.",
        "tag": "Pago Encriptado",
        "iconName": "Lock"
      },
      {
        "title": "Facturación Electrónica",
        "desc": "Generación y envío automático de factura digital completa al correo electrónico del cliente tras confirmarse la transacción comercial.",
        "tag": "Factura Digital",
        "iconName": "FileText"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Política de precios e impuestos",
        "paragraphs": [
          "En dDesign Canarias trabajamos con precios transparentes y actualizados. Todos los precios mostrados en nuestra web incluyen los impuestos aplicables según la normativa vigente en España y Canarias ."
        ]
      },
      {
        "sectionTitle": "1. Precios de los productos",
        "paragraphs": [
          "Los precios de nuestros productos y servicios se indican en euros (€) e incluyen el IGIC (Impuesto General Indirecto Canario) para las ventas dentro de las Islas Canarias.",
          "Para pedidos con destino a la Península, Baleares, Ceuta, Melilla o países de la Unión Europea , los precios se mostrarán con el IVA correspondiente o se aplicarán según el régimen fiscal vigente en el territorio de destino.",
          "En caso de que se produzca un error tipográfico o técnico en el precio mostrado, dDesign Canarias se reserva el derecho de modificar o cancelar el pedido, notificando al cliente antes de realizar cualquier cargo o envío."
        ]
      },
      {
        "sectionTitle": "2. Variaciones de precio",
        "paragraphs": [
          "Los precios pueden variar sin previo aviso debido a cambios en los costes de materiales, transporte o impuestos. No obstante, los precios confirmados en un pedido ya realizado no se verán afectados."
        ]
      },
      {
        "sectionTitle": "3. Presupuestos personalizados",
        "paragraphs": [
          "Los productos que requieren diseño o personalización se ofrecen mediante un sistema de presupuesto . El precio final será confirmado por nuestro equipo una vez revisado el diseño o los requerimientos del cliente.",
          "Los presupuestos tendrán una validez de 15 días naturales a partir de su fecha de emisión, salvo que se indique lo contrario."
        ]
      },
      {
        "sectionTitle": "4. Impuestos aplicables",
        "paragraphs": [
          "• Islas Canarias: se aplica IGIC (actualmente 7%).",
          "• Península y Baleares: se aplica IVA según la legislación española (actualmente 21%).",
          "• Ceuta y Melilla: las operaciones pueden estar exentas o sujetas a tasas locales.",
          "• Unión Europea: los envíos a empresas registradas con número de IVA intracomunitario pueden estar exentos de impuestos."
        ]
      },
      {
        "sectionTitle": "5. Facturación",
        "paragraphs": [
          "Todos los pedidos incluyen una factura digital que será enviada al correo electrónico indicado durante la compra. En caso de necesitar factura con datos fiscales específicos, el cliente deberá facilitar dicha información antes de realizar el pago."
        ]
      },
      {
        "sectionTitle": "6. Descuentos y promociones",
        "paragraphs": [
          "Los descuentos o códigos promocionales no son acumulables y se aplicarán únicamente dentro del periodo de validez establecido. Las promociones pueden ser modificadas o canceladas sin previo aviso."
        ]
      },
      {
        "sectionTitle": "7. Contacto",
        "paragraphs": [
          "Si tiene alguna duda sobre los precios, impuestos o condiciones de facturación, puede ponerse en contacto con nosotros:",
          "dDesign Canarias",
          "Correo electrónico: info@designcanarias.com",
          "Teléfono: +34 641 50 17 73"
        ]
      }
    ]
  },
  {
    "id": "politica-envio-entrega",
    "title": "Política de envío y entrega",
    "category": "documentacion-extra",
    "badge": "Logística & Plazos de Taller",
    "tagline": "Tiempos de producción en taller, plazos de transporte interinsular y recepción de mercancía.",
    "iconName": "Truck",
    "sourceUrl": "https://designcanarias.com/politica-de-envio-y-entrega/",
    "cards": [
      {
        "title": "Plazos de Fabricación",
        "desc": "Los trabajos a medida precisan habitualmente de 3 a 7 días hábiles de procesado artesanal en taller previo a la entrega al transportista.",
        "tag": "Taller 3-7 Días",
        "iconName": "Clock"
      },
      {
        "title": "Distribución Insular",
        "desc": "Entregas en Tenerife en 24-48h laborables; resto de islas Canarias entre 48-72h. Península e internacionales con plazos sujetos a aduana.",
        "tag": "Canarias 24-72h",
        "iconName": "Truck"
      },
      {
        "title": "Tránsito Sin DUA Interior",
        "desc": "Los portes entre islas canarias operan como tráficos locales sin tasas arancelarias intermedias ni retenciones de mercancía.",
        "tag": "Envíos Locales",
        "iconName": "CheckCircle2"
      },
      {
        "title": "Notificación de Incidencias",
        "desc": "Revisión obligatoria del paquete a la recepción. Roturas o daños de transporte deben comunicarse en un plazo improrrogable de 24-48h.",
        "tag": "Aviso en 48h",
        "iconName": "AlertCircle"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Política de envío y entrega",
        "paragraphs": [
          "En dDesign Canarias realizamos envíos a toda España , garantizando un servicio seguro, puntual y con seguimiento en todo momento. Trabajamos con empresas de transporte reconocidas para asegurar que cada pedido llegue en perfectas condiciones. Todos nuestros pedidos se preparan y se envían desde Tenerife, cuidando cada detalle para que tus productos lleguen en perfecto estado, dondequiera que estés."
        ]
      },
      {
        "sectionTitle": "1. Plazos de preparación",
        "paragraphs": [
          "Los pedidos se procesan una vez confirmado el pago. Los productos personalizados o fabricados a medida requieren un tiempo adicional de producción. El tiempo estimado de preparación es de 2 a 10 días laborables, según el tipo de producto o complejidad del diseño."
        ]
      },
      {
        "sectionTitle": "2. Plazos de envío",
        "paragraphs": [
          "Una vez completada la preparación, los plazos estimados de entrega son los siguientes:",
          "• Canarias: 24 – 72 horas laborables",
          "• Península: 3 – 7 días laborables",
          "• Andorra: 5 – 10 días laborables",
          "Estos plazos son orientativos y pueden variar por causas externas (festivos, aduanas, condiciones climáticas o saturación del transportista)."
        ]
      },
      {
        "sectionTitle": "Envíos dentro de Canarias",
        "paragraphs": [
          "Los envíos entre islas se consideran locales y no requieren trámites aduaneros. Los precios son finales y no incluyen cargos adicionales:",
          "• Tenerife: envío gratuito",
          "• Gran Canaria, La Palma, La Gomera y El Hierro: 9 € hasta 2 kg (+2,50 €/kg adicional)",
          "• Lanzarote y Fuerteventura: 10 € hasta 2 kg (+3,50 €/kg adicional)",
          "• Envío gratuito en pedidos superiores a 70 €"
        ]
      },
      {
        "sectionTitle": "Envíos a Península",
        "paragraphs": [
          "• Tarifa plana: 29,90 € hasta 2 kg (para pedidos de hasta 200 €)",
          "• Todos los envíos incluyen los trámites aduaneros y el IVA correspondiente en destino"
        ]
      },
      {
        "sectionTitle": "Envíos a Andorra",
        "paragraphs": [
          "• Tarifa plana: 49,90 € hasta 2 kg (para pedidos de hasta 200 €)",
          "• Los precios incluyen el despacho de exportación e importación y el IGI andorrano"
        ]
      },
      {
        "sectionTitle": "4. Impuestos",
        "paragraphs": [
          "Los precios de los productos se muestran sin IGIC, ya que nuestra actividad está exenta por franquicia fiscal en Canarias. Todos los importes de envío incluyen los impuestos y trámites necesarios según el destino."
        ]
      },
      {
        "sectionTitle": "5. Seguimiento del pedido",
        "paragraphs": [
          "Una vez que el pedido haya sido enviado, el cliente recibirá un correo electrónico con el número de seguimiento y el enlace correspondiente para consultar el estado del envío en tiempo real."
        ]
      },
      {
        "sectionTitle": "6. Entrega",
        "paragraphs": [
          "Las entregas se realizan en la dirección indicada por el cliente durante el proceso de compra. Es responsabilidad del cliente verificar que los datos sean correctos y completos. En caso de error en la dirección, dDesign Canarias no se hará responsable de los retrasos o costes adicionales.",
          "Si el cliente no se encuentra disponible en el momento de la entrega, la empresa de transporte intentará una nueva entrega o dejará aviso para concertar la recogida."
        ]
      },
      {
        "sectionTitle": "7. Incidencias en el transporte",
        "paragraphs": [
          "Si el paquete llega dañado o manipulado, el cliente debe notificarlo de inmediato al transportista al momento de la entrega y a dDesign Canarias dentro de las 24 horas posteriores al recibir el pedido, adjuntando fotografías del estado del paquete y del producto."
        ]
      },
      {
        "sectionTitle": "8. Información adicional",
        "paragraphs": [
          "• Todos los envíos cuentan con número de seguimiento",
          "• Si necesitas un envío urgente o personalizado, contáctanos antes de realizar tu pedido",
          "• En caso de incidencias o dudas sobre tu envío, estaremos encantados de ayudarte"
        ]
      },
      {
        "sectionTitle": "9. Contacto",
        "paragraphs": [
          "dDesign Canarias Correo electrónico: info@designcanarias.com"
        ]
      }
    ]
  },
  {
    "id": "politica-devoluciones",
    "title": "Política de devoluciones y reembolsos",
    "category": "documentacion-extra",
    "badge": "Art. 103.c RDL 1/2007",
    "tagline": "Derecho de desistimiento en catálogo estándar y exclusión legal estricta para piezas personalizadas.",
    "iconName": "RotateCcw",
    "sourceUrl": "https://designcanarias.com/politica-de-devoluciones-y-reembolsos/",
    "cards": [
      {
        "title": "Excepción Personalizados",
        "desc": "Conforme al Art. 103.c del RDL 1/2007, no existe derecho de desistimiento en piezas confeccionadas conforme a especificaciones del consumidor.",
        "tag": "Art. 103.c RDL",
        "iconName": "ShieldAlert"
      },
      {
        "title": "14 Días Productos Estándar",
        "desc": "Para mercancía estándar de catálogo sin customizar, rige el plazo legal de 14 días naturales desde la entrega física para desistir.",
        "tag": "Desistimiento 14d",
        "iconName": "RotateCcw"
      },
      {
        "title": "Reposición por Tara",
        "desc": "Si el pedido exhibe error atribuible a imprenta o defecto de fábrica, se repondrá sin coste aportando prueba fotográfica del daño.",
        "tag": "Garantía Taller",
        "iconName": "CheckCircle2"
      },
      {
        "title": "Plazos de Abono",
        "desc": "Los reembolsos conformados se abonan en 7 a 14 días laborables a través del mismo procedimiento de pago utilizado en la contratación.",
        "tag": "Reembolso Seguro",
        "iconName": "CreditCard"
      }
    ],
    "fullText": [
      {
        "sectionTitle": "Política de devoluciones y reembolsos",
        "paragraphs": [
          "En dDesign Canarias trabajamos para ofrecer productos de diseño e impresión personalizados con la máxima calidad. Sin embargo, entendemos que pueden surgir incidencias o solicitudes de devolución. A continuación, se detallan las condiciones y procedimientos aplicables según la legislación vigente en España (Real Decreto Legislativo 1/2007, de 16 de noviembre)."
        ]
      },
      {
        "sectionTitle": "1. Productos personalizados o bajo pedido",
        "paragraphs": [
          "De acuerdo con el artículo 103.c del Real Decreto Legislativo 1/2007, no se aceptan devoluciones ni reembolsos en productos personalizados o fabricados según las especificaciones del cliente (por ejemplo: diseños personalizados, impresiones a medida o productos configurados mediante el sistema “Tú Diseñas” ).",
          "Solo se aceptarán devoluciones en estos casos si el producto presenta un defecto de fabricación o error imputable a dDesign Canarias ."
        ]
      },
      {
        "sectionTitle": "2. Productos no personalizados",
        "paragraphs": [
          "En el caso de productos no personalizados, el cliente dispone de un plazo de 14 días naturales desde la recepción del pedido para ejercer su derecho de desistimiento, siempre que el producto se encuentre en perfecto estado, sin usar y en su embalaje original.",
          "El cliente deberá comunicar su intención de devolver el producto enviando un correo electrónico a info@designcanarias.com indicando el número de pedido, nombre completo y motivo de la devolución."
        ]
      },
      {
        "sectionTitle": "3. Productos defectuosos o error en el pedido",
        "paragraphs": [
          "Si el producto recibido presenta defectos, daños en el transporte o no corresponde con el pedido realizado, el cliente deberá notificarlo dentro de las 48 horas posteriores a la entrega . En este caso, dDesign Canarias asumirá los gastos de recogida y sustitución sin coste adicional.",
          "Será necesario aportar fotografías claras del defecto o error para poder gestionar correctamente la reclamación."
        ]
      },
      {
        "sectionTitle": "4. Procedimiento de devolución",
        "paragraphs": [
          "Una vez aprobada la solicitud de devolución, se indicarán las instrucciones para el envío del producto. El artículo deberá ser devuelto en su embalaje original, con todos los accesorios y en las mismas condiciones en las que fue recibido.",
          "Los reembolsos, cuando correspondan, se efectuarán mediante el mismo método de pago utilizado en la compra, en un plazo máximo de 7 a 14 días laborables desde la recepción y verificación del producto devuelto."
        ]
      },
      {
        "sectionTitle": "5. Gastos de envío",
        "paragraphs": [
          "Los gastos de envío asociados a devoluciones por desistimiento (no defectos o errores) correrán a cargo del cliente. En caso de error o producto defectuoso, los costes serán asumidos por dDesign Canarias ."
        ]
      },
      {
        "sectionTitle": "6. Contacto",
        "paragraphs": [
          "Para cualquier consulta o gestión relacionada con devoluciones o reembolsos, puede contactarnos en:",
          "dDesign Canarias",
          "Correo electrónico: info@designcanarias.com",
          "Teléfono: +34 641 50 17 73"
        ]
      },
      {
        "sectionTitle": "7. Legislación aplicable",
        "paragraphs": [
          "Esta política se rige por la legislación española, en especial la Ley General para la Defensa de los Consumidores y Usuarios. En caso de conflicto, las partes se someterán a los Juzgados y Tribunales de Santa Cruz de Tenerife ."
        ]
      }
    ]
  }
];
