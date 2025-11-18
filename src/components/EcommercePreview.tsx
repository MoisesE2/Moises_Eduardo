import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useThemeStyles } from "../hooks/useThemeStyles";
import LazyImage from "./LazyImage";

interface EcommercePreviewProps {
  className?: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  imageUrl: string;
  badge?: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const EcommercePreview: React.FC<EcommercePreviewProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState<boolean>(false);

  // Produtos de comida
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Pizza Margherita",
      price: "R$ 39,90",
      oldPrice: "R$ 49,90",
      imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      badge: "Novo",
      category: "Pizzas"
    },
    {
      id: 2,
      name: "Hambúrguer Artesanal",
      price: "R$ 32,90",
      oldPrice: "R$ 42,90",
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      badge: "-20%",
      category: "Lanches"
    },
    {
      id: 3,
      name: "Combo Sushi",
      price: "R$ 59,90",
      imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      category: "Sushi"
    },
    {
      id: 4,
      name: "Burrito Mexicano",
      price: "R$ 28,90",
      imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
      category: "Lanches"
    },
    {
      id: 5,
      name: "Pasta Carbonara",
      price: "R$ 35,90",
      imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
      badge: "Novo",
      category: "Massas"
    },
    {
      id: 6,
      name: "Lasagna Italiana",
      price: "R$ 42,90",
      imageUrl: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop",
      badge: "Novo",
      category: "Massas"
    }
  ];

  const categories = ["Todos", "Pizzas", "Lanches", "Sushi", "Bebidas", "Massas", "Saladas"];

  // Filtrar produtos por categoria e busca
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Adicionar ao carrinho
  const handleAddToCart = (product: Product) => {
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1000);

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Calcular total de itens no carrinho
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calcular preço total do carrinho
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  };

  const totalPrice = calculateTotal();

  // Aumentar quantidade
  const increaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Diminuir quantidade
  const decreaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remover item do carrinho
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Limpar carrinho
  const clearCart = () => {
    setCart([]);
  };

  // Abrir modal do carrinho
  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  // Fechar modal do carrinho
  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  // Alternar menu de categorias
  const toggleCategoriesMenu = () => {
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  };

  // Selecionar categoria e fechar menu
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoriesMenuOpen(false);
  };

  // Fechar menu de categorias ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCategoriesMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.categories-menu')) {
          setIsCategoriesMenuOpen(false);
        }
      }
    };

    if (isCategoriesMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoriesMenuOpen]);

  return (
    <div className={`${className} w-full max-w-[360px] sm:max-w-2xl mx-auto px-1 sm:px-2 md:px-0`}>
      {/* Browser Frame */}
      <div className={`relative rounded-t-xl sm:rounded-t-2xl overflow-hidden shadow-2xl ${
        isDark 
          ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-gray-200 to-gray-300'
      }`}>
        {/* Browser Bar */}
        <div className={`flex items-center gap-1 sm:gap-2 px-1.5 sm:px-4 py-1 sm:py-2 ${
          isDark ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <div className="flex gap-0.5 sm:gap-1.5">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          </div>
          <div className={`flex-1 mx-1 sm:mx-4 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs truncate ${
            isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'
          }`}>
            delivery.saborbrasil.com
          </div>
        </div>

        {/* Screen Content */}
        <div className={`relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 to-black' 
            : 'bg-gradient-to-br from-white to-gray-50'
        }`}>
          <div className={`max-h-[600px] overflow-y-auto relative ${
            isCartModalOpen ? 'overflow-hidden' : ''
          }`}>
            {/* Header */}
            <header className={`sticky top-0 z-20 backdrop-blur-xl border-b ${
              isDark 
                ? 'bg-gray-900/90 border-gray-800/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <div className="container mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-3">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg`}>
                      🍕
                    </div>
                    <span className={`text-sm sm:text-lg font-bold truncate ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      SaborBrasil
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-4">
                    <button className={`relative p-1 sm:p-2 rounded-lg active:bg-gray-200/30 hover:bg-gray-200/20 transition-colors touch-manipulation ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span className="text-sm sm:text-lg">🔍</span>
                    </button>
                    <button 
                      className={`relative p-1 sm:p-2 rounded-lg active:bg-gray-200/30 hover:bg-gray-200/20 transition-colors touch-manipulation ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                      onClick={openCartModal}
                    >
                      <span className="text-sm sm:text-lg">🛒</span>
                      {cartItemCount > 0 && (
                        <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 rounded-full text-white text-[9px] sm:text-[10px] flex items-center justify-center animate-pulse font-bold">
                          {cartItemCount > 9 ? '9+' : cartItemCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className={`relative flex items-center gap-1 sm:gap-2 ${
                  isDark ? 'bg-gray-800/50' : 'bg-gray-100'
                } rounded-lg px-2 sm:px-3 py-1.5 sm:py-2`}>
                  <span className="text-gray-400 text-sm sm:text-base">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar pratos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`flex-1 bg-transparent text-xs sm:text-sm outline-none ${
                      isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className={`text-gray-400 active:text-gray-600 hover:text-gray-600 transition-colors p-1 touch-manipulation`}
                      aria-label="Limpar busca"
                    >
                      <span className="text-sm sm:text-base">✕</span>
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium whitespace-nowrap transition-all active:scale-95 touch-manipulation ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                          : isDark
                          ? 'bg-gray-800/50 text-gray-300 active:bg-gray-700/50'
                          : 'bg-gray-100 text-gray-700 active:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            {/* Hero Banner */}
            <section className={`container mx-auto px-2 sm:px-4 md:px-6 py-3 sm:py-4 ${
              isDark ? 'bg-gradient-to-r from-orange-900/30 to-red-900/30' : 'bg-gradient-to-r from-orange-100 to-red-100'
            } rounded-xl sm:rounded-2xl mx-1.5 sm:mx-4 mt-3 sm:mt-4 mb-4 sm:mb-6 relative overflow-hidden`}>
              <div className="text-center py-3 sm:py-4 relative z-10">
                <h2 className={`text-sm sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  🔥 Oferta Especial
                </h2>
                <p className={`text-[10px] sm:text-xs md:text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Até 30% OFF em pedidos acima de R$ 50
                </p>
                <div className={`text-[9px] sm:text-xs mt-0.5 sm:mt-1 ${
                  isDark ? 'text-orange-300' : 'text-orange-700'
                }`}>
                  Delivery grátis na primeira compra!
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 text-4xl sm:text-5xl md:text-6xl">🍕</div>
                <div className="absolute bottom-0 left-0 text-4xl sm:text-5xl md:text-6xl">🍔</div>
              </div>
            </section>

            {/* Products Grid */}
            <section className="container mx-auto px-1.5 sm:px-4 md:px-6 pb-4 sm:pb-6">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
                  {filteredProducts.map((product) => {
                    const isInCart = cart.some((item) => item.id === product.id);
                    const cartItem = cart.find((item) => item.id === product.id);
                    const justAdded = addedToCart === product.id;

                    return (
                      <div
                        key={product.id}
                        className={`group relative p-1.5 sm:p-3 rounded-lg sm:rounded-xl border transition-all active:scale-95 hover:shadow-lg hover:-translate-y-1 touch-manipulation ${
                          justAdded ? 'ring-2 ring-green-500 ring-offset-1 sm:ring-offset-2' : ''
                        } ${
                          isDark 
                            ? 'bg-gray-800/50 border-gray-700 active:border-orange-500/50' 
                            : 'bg-white border-gray-200 active:border-orange-300 active:shadow-orange-100'
                        }`}
                      >
                        {/* Badge */}
                        {product.badge && (
                          <div className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-[10px] font-bold z-10 shadow-lg ${
                            product.badge === "Novo"
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}>
                            {product.badge}
                          </div>
                        )}

                        {/* Product Image */}
                        <div className={`w-full h-20 sm:h-28 rounded-lg mb-1 sm:mb-2 overflow-hidden ${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                        } group-active:scale-105 transition-transform`}>
                          <LazyImage
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            placeholder="🍽️"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-1 sm:space-y-2">
                          <h3 className={`text-[10px] sm:text-xs font-semibold line-clamp-2 leading-tight ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {product.name}
                          </h3>
                          
                          {/* Price */}
                          <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap">
                            <span className={`text-xs sm:text-base font-bold ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {product.price}
                            </span>
                            {product.oldPrice && (
                              <span className={`text-[9px] sm:text-[10px] line-through ${
                                isDark ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                {product.oldPrice}
                              </span>
                            )}
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`w-full py-1 sm:py-2 rounded-lg text-[9px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-0.5 sm:gap-1 active:scale-95 touch-manipulation ${
                              justAdded
                                ? 'bg-green-500 text-white scale-105'
                                : isInCart
                                ? 'bg-orange-700 text-white active:shadow-lg'
                                : 'bg-gradient-to-r from-orange-600 to-red-600 text-white active:shadow-lg'
                            }`}
                          >
                            {justAdded ? (
                              <>
                                <span>✓</span>
                                Adicionado!
                              </>
                            ) : isInCart ? (
                              <>
                                <span>🛒</span>
                                {cartItem?.quantity} no carrinho
                              </>
                            ) : (
                              <>
                                <span>🛒</span>
                                Adicionar
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={`text-center py-12 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-sm">Nenhum produto encontrado</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("Todos");
                    }}
                    className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
                      isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </section>

            {/* Bottom Navigation */}
            <div className={`sticky bottom-0 border-t backdrop-blur-xl ${
              isDark 
                ? 'bg-gray-900/90 border-gray-800/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <div className="container mx-auto px-1.5 sm:px-4 py-1.5 sm:py-2">
                <div className="flex items-center justify-around">
                  <button 
                    onClick={() => {
                      setSelectedCategory("Todos");
                      setSearchQuery("");
                    }}
                    className={`flex flex-col items-center gap-0.5 active:scale-95 touch-manipulation ${
                      selectedCategory === "Todos" && !searchQuery
                        ? isDark ? 'text-orange-400' : 'text-orange-600'
                        : isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    <span className="text-base sm:text-lg">🏠</span>
                    <span className="text-[8px] sm:text-[9px]">Home</span>
                  </button>
                  <div className="relative categories-menu">
                      <button 
                        onClick={toggleCategoriesMenu}
                        className={`flex flex-col items-center gap-0.5 relative active:scale-95 touch-manipulation ${
                          isCategoriesMenuOpen
                            ? isDark ? 'text-orange-400' : 'text-orange-600'
                            : isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <span className="text-base sm:text-lg">📂</span>
                        <span className="text-[8px] sm:text-[9px]">Categorias</span>
                      </button>

                    {/* Dropdown de Categorias */}
                    {isCategoriesMenuOpen && (
                      <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 rounded-xl border shadow-2xl animate-scale-in ${
                        isDark
                          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-orange-900/30'
                          : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-orange-900/50'
                      }`}>
                        <div className="p-2 space-y-1">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => handleCategorySelect(category)}
                              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                selectedCategory === category
                                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                                  : isDark
                                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{category}</span>
                                {selectedCategory === category && (
                                  <span className="text-xs">✓</span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                        {/* Seta apontando para baixo */}
                        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full ${
                          isDark ? 'text-gray-800' : 'text-white'
                        }`}>
                          <div className="w-3 h-3 border-l border-b rotate-45 ${
                            isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                          }"></div>
                        </div>
                      </div>
                    )}
                  </div>
                      <button 
                        onClick={openCartModal}
                        className={`relative flex flex-col items-center gap-0.5 active:scale-95 touch-manipulation ${
                          cartItemCount > 0
                            ? isDark ? 'text-orange-400' : 'text-orange-600'
                            : isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <span className="text-base sm:text-lg">🛒</span>
                        {cartItemCount > 0 && (
                          <span className="absolute -top-0.5 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 rounded-full text-white text-[8px] sm:text-[9px] flex items-center justify-center animate-pulse font-bold">
                            {cartItemCount > 9 ? '9+' : cartItemCount}
                          </span>
                        )}
                        <span className="text-[8px] sm:text-[9px]">Carrinho</span>
                      </button>
                      <button 
                        onClick={() => alert("Área do perfil")}
                        className={`flex flex-col items-center gap-0.5 active:scale-95 touch-manipulation ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <span className="text-base sm:text-lg">👤</span>
                        <span className="text-[8px] sm:text-[9px]">Perfil</span>
                      </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal do Carrinho - Dentro do E-commerce */}
          {isCartModalOpen && (
            <div
              className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in"
              onClick={closeCartModal}
            >
              <div
                className={`rounded-xl sm:rounded-2xl max-w-sm w-full max-h-[85vh] sm:max-h-[500px] overflow-hidden border shadow-2xl mx-2 sm:mx-0 ${
                  isDark
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-orange-900/30'
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-300 shadow-orange-900/50'
                } animate-scale-in`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header do Modal */}
                <div className={`flex items-center justify-between p-3 sm:p-4 border-b ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h2 className={`text-lg sm:text-xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    🛒 Carrinho ({cartItemCount})
                  </h2>
                  <button
                    onClick={closeCartModal}
                    className={`text-xl sm:text-2xl transition-colors active:scale-95 touch-manipulation p-1 ${
                      isDark
                        ? 'text-gray-400 active:text-orange-400'
                        : 'text-gray-600 active:text-orange-600'
                    }`}
                    aria-label="Fechar carrinho"
                  >
                    &times;
                  </button>
                </div>

                {/* Conteúdo do Carrinho */}
                <div className="overflow-y-auto max-h-[calc(85vh-200px)] sm:max-h-[400px] p-3 sm:p-4">
                  {cart.length > 0 ? (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border ${
                            isDark
                              ? 'bg-gray-800/50 border-gray-700'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          {/* Imagem do Produto */}
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <LazyImage
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              placeholder="🍽️"
                            />
                          </div>

                          {/* Info do Produto */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-sm font-semibold truncate ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {item.name}
                            </h3>
                            <p className={`text-sm font-bold mt-1 ${
                              isDark ? 'text-orange-400' : 'text-orange-600'
                            }`}>
                              {item.price}
                            </p>

                          {/* Controles de Quantidade */}
                          <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-xs sm:text-sm font-bold transition-colors active:scale-95 touch-manipulation ${
                                isDark
                                  ? 'bg-gray-700 text-white active:bg-gray-600'
                                  : 'bg-gray-200 text-gray-700 active:bg-gray-300'
                              }`}
                              aria-label="Diminuir quantidade"
                            >
                              −
                            </button>
                            <span className={`text-xs sm:text-sm font-semibold min-w-[20px] sm:min-w-[24px] text-center ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-xs sm:text-sm font-bold transition-colors active:scale-95 touch-manipulation ${
                                isDark
                                  ? 'bg-orange-600 text-white active:bg-orange-700'
                                  : 'bg-orange-500 text-white active:bg-orange-600'
                              }`}
                              aria-label="Aumentar quantidade"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className={`ml-auto px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs transition-colors active:scale-95 touch-manipulation ${
                                isDark
                                  ? 'bg-red-900/50 text-red-400 active:bg-red-900'
                                  : 'bg-red-100 text-red-600 active:bg-red-200'
                              }`}
                              aria-label="Remover item"
                            >
                              Remover
                            </button>
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`text-center py-12 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <div className="text-5xl mb-4">🛒</div>
                      <p className="text-sm font-medium">Carrinho vazio</p>
                      <p className="text-xs mt-2">Adicione produtos para começar</p>
                    </div>
                  )}
                </div>

                {/* Footer do Modal */}
                {cart.length > 0 && (
                  <div className={`p-3 sm:p-4 border-t ${
                    isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    {/* Total */}
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <span className={`text-sm sm:text-base font-semibold ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Total:
                      </span>
                      <span className={`text-lg sm:text-xl font-bold ${
                        isDark ? 'text-orange-400' : 'text-orange-600'
                      }`}>
                        R$ {totalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={clearCart}
                        className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors active:scale-95 touch-manipulation ${
                          isDark
                            ? 'bg-gray-700 text-gray-300 active:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 active:bg-gray-300'
                        }`}
                      >
                        Limpar
                      </button>
                      <button
                        onClick={() => {
                          alert(`Pedido finalizado! Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}`);
                          clearCart();
                          closeCartModal();
                        }}
                        className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-600 to-red-600 text-white active:shadow-lg active:scale-95 transition-all touch-manipulation`}
                      >
                        Finalizar Pedido
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default EcommercePreview;
