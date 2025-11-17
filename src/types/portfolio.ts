import { z } from 'zod';

// Constantes para categorias conhecidas
export const PORTFOLIO_CATEGORIES = ['frontend', 'backend', 'mobile', 'web', 'app', 'system'] as const;
export type PortfolioCategory = typeof PORTFOLIO_CATEGORIES[number];

// Schema otimizado com validações específicas
export const PortfolioItemSchema = z.object({
  id: z.coerce.string(), // Coerce converte automaticamente number para string
  title: z.string().trim().min(1),
  imageUrl: z.string().url().or(z.string().min(1)), // Aceita URL ou caminho local
  description: z.string().trim().min(10),
  videoUrl: z.string().url().or(z.string().min(1)).optional(), // Opcional - nem todos os projetos têm vídeo
  liveUrl: z.string().url().optional().or(z.literal('')), // URL válida ou string vazia
  githubUrl: z.string().url(), // Sempre deve ser URL válida
  technologies: z.array(z.string().trim().min(1)).min(1),
  category: z.string().trim().min(1),
  featured: z.boolean().default(false) // Valor padrão
});

// Schema simplificado para resposta da API
export const PortfolioApiResponseSchema = z.union([
  z.array(PortfolioItemSchema), // Resposta direta com array
  z.object({
    data: z.array(PortfolioItemSchema),
    success: z.boolean().optional(),
    message: z.string().optional()
  })
]);

// Tipos inferidos
export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;
export type PortfolioApiResponse = z.infer<typeof PortfolioApiResponseSchema>;

// Função otimizada para validação
export const validatePortfolioItems = (data: unknown): PortfolioItem[] => {
  // Primeiro, tenta validar como array direto
  const arrayResult = z.array(PortfolioItemSchema).safeParse(data);
  if (arrayResult.success) {
    return arrayResult.data;
  }

  // Se não funcionou, tenta como objeto com propriedade data
  const objectResult = z.object({ data: z.array(PortfolioItemSchema) }).safeParse(data);
  if (objectResult.success) {
    return objectResult.data.data;
  }

  // Se ambos falharam, retorna erro mais específico
  throw new Error(`Formato de dados inválido: ${arrayResult.error.message}`);
};

// Função para validar um único item (útil para formulários)
export const validatePortfolioItem = (item: unknown): PortfolioItem => {
  const result = PortfolioItemSchema.safeParse(item);
  if (!result.success) {
    throw new Error(`Item inválido: ${result.error.issues[0].message}`);
  }
  return result.data;
};

// Helper para verificar se uma categoria é válida
export const isValidCategory = (category: string): category is PortfolioCategory => {
  return PORTFOLIO_CATEGORIES.includes(category as PortfolioCategory);
};

// Schema para criação de novo item (alguns campos opcionais)
export const CreatePortfolioItemSchema = PortfolioItemSchema.partial({
  id: true,
  featured: true,
  liveUrl: true
});

export type CreatePortfolioItem = z.infer<typeof CreatePortfolioItemSchema>; 