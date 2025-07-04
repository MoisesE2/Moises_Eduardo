/**
 * Utilitário para resolver URLs de imagens
 * Converte URLs relativos para absolutos baseados no ambiente
 */

/**
 * Resolve URL de imagem considerando se é relativo ou absoluto
 * @param imageUrl - URL da imagem que pode ser relativo ou absoluto
 * @returns URL absoluto da imagem
 */
export const resolveImageUrl = (imageUrl: string): string => {
  // Se já é um URL absoluto (http/https), retorna como está
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Se é um URL relativo que começa com /, remove a barra inicial
  // para que funcione corretamente com o Vite
  if (imageUrl.startsWith('/')) {
    return imageUrl.substring(1);
  }
  
  // Se não tem barra inicial, retorna como está
  return imageUrl;
};

/**
 * Resolve URL de vídeo considerando se é relativo ou absoluto
 * @param videoUrl - URL do vídeo que pode ser relativo ou absoluto  
 * @returns URL absoluto do vídeo
 */
export const resolveVideoUrl = (videoUrl: string): string => {
  // Se já é um URL absoluto (http/https), retorna como está
  if (videoUrl.startsWith('http://') || videoUrl.startsWith('https://')) {
    return videoUrl;
  }
  
  // Se é um URL relativo que começa com /, remove a barra inicial
  if (videoUrl.startsWith('/')) {
    return videoUrl.substring(1);
  }
  
  // Se não tem barra inicial, retorna como está
  return videoUrl;
}; 