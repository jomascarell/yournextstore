export type FAQCategory = {
	id: string;
	title: string;
	questions: { question: string; answer: string }[];
};

export const faqCategories: FAQCategory[] = [
	{
		id: "orders",
		title: "Pedidos",
		questions: [
			{
				question: "¿Cómo hago un pedido?",
				answer:
					"Explora nuestros productos, añade artículos a tu carrito y procede al pago. Te guiaremos por el proceso de pago paso a paso.",
			},
			{
				question: "¿Puedo modificar o cancelar mi pedido después de realizarlo?",
				answer:
					"Una vez enviado un pedido, las modificaciones no son posibles en general. Si tu pedido aún no ha sido procesado, contáctanos lo antes posible e intentaremos atender tu solicitud.",
			},
			{
				question: "¿Cuánto tarda en procesarse un pedido?",
				answer:
					"La mayoría de los pedidos se procesan en 1–3 días laborables. Los tiempos de procesamiento pueden variar según la disponibilidad del producto y el volumen de pedidos. Recibirás un correo de confirmación una vez que tu pedido haya sido enviado.",
			},
			{
				question: "¿Puedo solicitar una factura de mi pedido?",
				answer:
					"Sí. Si necesitas una factura, asegúrate de proporcionar tus datos de facturación durante el proceso de pago. La factura se enviará a tu correo junto con la confirmación del pedido.",
			},
			{
				question: "¿Puedo añadir instrucciones especiales a mi pedido?",
				answer:
					"Si está disponible, puedes añadir notas o instrucciones especiales durante el proceso de pago. Busca el campo de notas del pedido antes de completar tu compra.",
			},
		],
	},
	{
		id: "payments",
		title: "Pagos",
		questions: [
			{
				question: "¿Qué métodos de pago aceptáis?",
				answer:
					"Aceptamos todas las tarjetas de crédito y débito principales, así como otros métodos de pago disponibles a través de nuestro proveedor de pagos seguro. Las opciones disponibles se muestran en el proceso de pago.",
			},
			{
				question: "¿Está segura mi información de pago?",
				answer:
					"Por supuesto. Todos los pagos se procesan a través de un proveedor de pagos con certificación PCI. Nunca almacenamos los datos completos de tu tarjeta en nuestros servidores.",
			},
			{
				question: "Mi pago ha fallado. ¿Qué debo hacer?",
				answer:
					"Primero, verifica que los datos de tu tarjeta sean correctos y que tengas fondos suficientes. Si el problema persiste, prueba con otro método de pago o contacta con tu banco. También puedes ponerte en contacto con nosotros para recibir ayuda.",
			},
			{
				question: "¿Cuándo se realizará el cargo?",
				answer:
					"El pago se procesa en el momento de la compra. En el caso de artículos de preventa, el cargo puede realizarse al hacer el pedido o cuando el artículo sea enviado, según el producto.",
			},
		],
	},
	{
		id: "shipping",
		title: "Envíos y entregas",
		questions: [
			{
				question: "¿Qué opciones de envío tenéis?",
				answer:
					"Ofrecemos opciones de envío estándar y urgente. Los métodos disponibles y los plazos estimados de entrega se muestran durante el proceso de pago según tu ubicación.",
			},
			{
				question: "¿Realizáis envíos internacionales?",
				answer:
					"Sí, enviamos a muchos países de todo el mundo. Las opciones de envío internacional y sus costes se calculan durante el proceso de pago según tu dirección de entrega.",
			},
			{
				question: "¿Cómo puedo rastrear mi pedido?",
				answer:
					"Una vez enviado tu pedido, recibirás un correo de confirmación con un número de seguimiento y un enlace para rastrear tu paquete en tiempo real.",
			},
			{
				question: "¿Qué debo hacer si mi paquete llega dañado?",
				answer:
					"Si tu pedido llega dañado, documenta el daño con fotos y contáctanos de inmediato. Trabajaremos contigo para resolver el problema lo antes posible.",
			},
			{
				question: "¿Puedo combinar varios pedidos para ahorrar en el envío?",
				answer:
					"Lamentablemente, no podemos combinar pedidos separados en un único envío. Para aprovechar los umbrales de envío gratuito, asegúrate de añadir todos los artículos a un solo pedido antes de finalizar la compra.",
			},
		],
	},
	{
		id: "returns",
		title: "Devoluciones y cambios",
		questions: [
			{
				question: "¿Cuál es vuestra política de devoluciones?",
				answer:
					"Aceptamos devoluciones en un plazo de 14 días desde la entrega. Los artículos deben estar sin usar, en su embalaje original y en el mismo estado en que fueron recibidos. Consulta nuestra página de política de devoluciones para más detalles.",
			},
			{
				question: "¿Cómo inicio una devolución?",
				answer:
					"Para iniciar una devolución, contacta con nuestro equipo de atención al cliente con tu número de pedido y el motivo de la devolución. Te proporcionaremos las instrucciones necesarias y, si corresponde, una etiqueta de envío para la devolución.",
			},
			{
				question: "¿Cómo funcionan los cambios?",
				answer:
					"Los cambios se gestionan como una devolución seguida de un nuevo pedido. Simplemente devuelve el artículo original y realiza un nuevo pedido con el artículo que desees.",
			},
			{
				question: "¿Cuánto tarda en llegar el reembolso?",
				answer:
					"Una vez recibido e inspeccionado el artículo devuelto, los reembolsos se procesan normalmente en un plazo de 5–10 días laborables. El importe se abonará en el método de pago original.",
			},
		],
	},
	{
		id: "discounts",
		title: "Descuentos y promociones",
		questions: [
			{
				question: "¿Ofrecéis descuentos para nuevos clientes?",
				answer:
					"¡Sí! Los nuevos clientes pueden suscribirse a nuestro boletín para recibir un descuento de bienvenida. Busca el formulario de suscripción en nuestra página de inicio.",
			},
			{
				question: "¿Cómo aplico un código de descuento?",
				answer:
					"Durante el proceso de pago encontrarás un campo para introducir tu código de descuento. Escribe el código y el descuento se aplicará automáticamente al total de tu pedido.",
			},
			{
				question: "¿Puedo usar varios códigos de descuento en un mismo pedido?",
				answer:
					"Solo se puede aplicar un código de descuento por pedido. El sistema utilizará automáticamente el código que ofrezca el mayor beneficio si se introducen varios.",
			},
		],
	},
];
