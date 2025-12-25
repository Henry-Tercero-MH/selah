export const menuData = {
  categories: [
    {
      id: 'licuados',
      name: 'Deliciosos Licuados',
      icon: '🥤',
      description: 'Bebidas naturales y refrescantes'
    }
  ],
  items: [
    {
      id: 1,
      name: 'Licuado de Fresa',
      category: 'licuados',
      price: 15.00,
      currency: 'Q',
      description: 'Delicioso licuado de fresa fresca y cremoso',
      longDescription: 'Preparado con fresas frescas de temporada, leche y un toque de azúcar natural. Rico en vitamina C y antioxidantes.',
      color: 'var(--color-fresa)',
      icon: '🍓',
      popular: true,
      calories: 180,
      prepTime: '5 min',
      ingredients: ['Fresas frescas', 'Leche', 'Azúcar', 'Hielo'],
      tags: ['frutal', 'cremoso', 'vitaminas'],
      sizes: [
        { name: 'Regular', price: 15.00 },
        { name: 'Grande', price: 18.00 }
      ]
    },
    {
      id: 2,
      name: 'Licuado de Papaya',
      category: 'licuados',
      price: 13.00,
      currency: 'Q',
      description: 'Refrescante licuado de papaya natural',
      longDescription: 'Papaya fresca guatemalteca mezclada con leche y miel. Excelente para la digestión y rico en vitamina A.',
      color: 'var(--color-papaya)',
      icon: '🍊',
      popular: false,
      calories: 150,
      prepTime: '4 min',
      ingredients: ['Papaya fresca', 'Leche', 'Miel', 'Hielo'],
      tags: ['digestivo', 'natural', 'suave'],
      sizes: [
        { name: 'Regular', price: 13.00 },
        { name: 'Grande', price: 16.00 }
      ]
    },
    {
      id: 3,
      name: 'Licuado de Melón',
      category: 'licuados',
      price: 13.00,
      currency: 'Q',
      description: 'Suave y dulce licuado de melón',
      longDescription: 'Melón maduro con un toque de limón y menta. Perfecto para hidratarse en días calurosos.',
      color: 'var(--color-melon)',
      icon: '🍈',
      popular: false,
      calories: 140,
      prepTime: '4 min',
      ingredients: ['Melón', 'Limón', 'Menta', 'Hielo'],
      tags: ['refrescante', 'ligero', 'hidratante'],
      sizes: [
        { name: 'Regular', price: 13.00 },
        { name: 'Grande', price: 16.00 }
      ]
    },
    {
      id: 4,
      name: 'Licuado de Piña',
      category: 'licuados',
      price: 13.00,
      currency: 'Q',
      description: 'Tropical y refrescante licuado de piña',
      longDescription: 'Piña tropical guatemalteca con coco rallado y un toque de vainilla. Sabor caribeño irresistible.',
      color: 'var(--color-pina)',
      icon: '🍍',
      popular: false,
      calories: 170,
      prepTime: '5 min',
      ingredients: ['Piña fresca', 'Coco', 'Vainilla', 'Hielo'],
      tags: ['tropical', 'exótico', 'energético'],
      sizes: [
        { name: 'Regular', price: 13.00 },
        { name: 'Grande', price: 16.00 }
      ]
    },
    {
      id: 5,
      name: 'Licuado de Banano',
      category: 'licuados',
      price: 13.00,
      currency: 'Q',
      description: 'Cremoso y energético licuado de banano',
      longDescription: 'Banano maduro con leche, canela y miel. Alto en potasio, perfecto para iniciar el día con energía.',
      color: 'var(--color-banana)',
      icon: '🍌',
      popular: false,
      calories: 200,
      prepTime: '4 min',
      ingredients: ['Banano', 'Leche', 'Canela', 'Miel'],
      tags: ['energético', 'cremoso', 'nutritivo'],
      sizes: [
        { name: 'Regular', price: 13.00 },
        { name: 'Grande', price: 16.00 }
      ]
    },
    {
      id: 6,
      name: 'Frapuccino',
      category: 'licuados',
      price: 13.00,
      currency: 'Q',
      description: 'Delicioso frapuccino al estilo coreano',
      longDescription: 'Café espresso mezclado con leche, crema batida y jarabe de caramelo. Inspirado en las cafeterías de Seúl.',
      color: 'var(--color-primary)',
      icon: '☕',
      popular: true,
      calories: 250,
      prepTime: '6 min',
      ingredients: ['Café espresso', 'Leche', 'Crema', 'Caramelo'],
      tags: ['café', 'dulce', 'premium'],
      sizes: [
        { name: 'Regular', price: 13.00 },
        { name: 'Grande', price: 16.00 }
      ]
    },
    {
      id: 7,
      name: 'Mixtos',
      category: 'licuados',
      price: 15.00,
      currency: 'Q',
      description: 'Combinación de tus frutas favoritas',
      longDescription: 'Elige hasta 3 frutas de tu preferencia para crear tu licuado perfecto. ¡Personaliza tu bebida!',
      color: 'var(--color-mixto)',
      icon: '🍹',
      popular: true,
      calories: 190,
      prepTime: '6 min',
      ingredients: ['Frutas a elección', 'Leche', 'Endulzante', 'Hielo'],
      tags: ['personalizable', 'variado', 'único'],
      sizes: [
        { name: 'Regular', price: 15.00 },
        { name: 'Grande', price: 18.00 }
      ]
    }
  ]
};
