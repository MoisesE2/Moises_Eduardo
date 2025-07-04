import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PortfolioSection from '../PortfolioSection';

// Mock do hook usePortfolio
jest.mock('../../hooks/usePortfolio', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock do LazyImage
jest.mock('../LazyImage', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

import { jest } from '@jest/globals';

const mockUsePortfolio = jest.mocked(
  jest.requireActual('../../hooks/usePortfolio') as { default: jest.Mock }
).default;

describe('PortfolioSection - Integração', () => {
  const mockPortfolioData = [
    {
      id: '1',
      title: 'Projeto Frontend',
      imageUrl: 'https://example.com/frontend.jpg',
      description: 'Descrição do projeto frontend',
      videoUrl: 'https://example.com/video1.mp4',
      githubUrl: 'https://github.com/test/frontend',
      liveUrl: 'https://frontend.example.com',
      technologies: ['React', 'TypeScript', 'CSS'],
      category: 'frontend',
      featured: true,
    },
    {
      id: '2',
      title: 'Projeto Backend',
      imageUrl: 'https://example.com/backend.jpg',
      description: 'Descrição do projeto backend',
      videoUrl: 'https://example.com/video2.mp4',
      githubUrl: 'https://github.com/test/backend',
      technologies: ['Node.js', 'Express', 'MongoDB'],
      category: 'backend',
      featured: false,
    },
    {
      id: '3',
      title: 'Projeto Fullstack',
      imageUrl: 'https://example.com/fullstack.jpg',
      description: 'Descrição do projeto fullstack',
      videoUrl: 'https://example.com/video3.mp4',
      githubUrl: 'https://github.com/test/fullstack',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      category: 'fullstack',
      featured: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar lista de projetos com sucesso', async () => {
    mockUsePortfolio.mockReturnValue({
      portfolioItems: mockPortfolioData,
      loading: false,
      error: null,
      retry: jest.fn(),
      isApiError: false,
    });

    render(<PortfolioSection />);

    expect(screen.getByText('Portfólio')).toBeInTheDocument();
    expect(screen.getByText('Projeto Frontend')).toBeInTheDocument();
    expect(screen.getByText('Projeto Backend')).toBeInTheDocument();
    expect(screen.getByText('Projeto Fullstack')).toBeInTheDocument();
  });

  it('deve mostrar estado de loading', () => {
    mockUsePortfolio.mockReturnValue({
      portfolioItems: [],
      loading: true,
      error: null,
      retry: jest.fn(),
      isApiError: false,
    });

    render(<PortfolioSection />);

    expect(screen.getByText('Portfólio')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // spinner
  });

  it('deve mostrar estado de erro com botão de retry', async () => {
    const mockRetry = jest.fn();
    mockUsePortfolio.mockReturnValue({
      portfolioItems: [],
      loading: false,
      error: 'Erro ao carregar projetos',
      retry: mockRetry,
      isApiError: true,
    });

    render(<PortfolioSection />);

    expect(screen.getByText('Erro de Conectividade')).toBeInTheDocument();
    expect(screen.getByText('Tentar Novamente')).toBeInTheDocument();

    const retryButton = screen.getByText('Tentar Novamente');
    fireEvent.click(retryButton);

    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('deve filtrar projetos por categoria', async () => {
    mockUsePortfolio.mockReturnValue({
      portfolioItems: mockPortfolioData,
      loading: false,
      error: null,
      retry: jest.fn(),
      isApiError: false,
    });

    render(<PortfolioSection />);

    // Inicialmente deve mostrar todos os projetos
    expect(screen.getByText('Projeto Frontend')).toBeInTheDocument();
    expect(screen.getByText('Projeto Backend')).toBeInTheDocument();
    expect(screen.getByText('Projeto Fullstack')).toBeInTheDocument();

    // Filtrar por categoria frontend
    const frontendButton = screen.getByText('frontend');
    fireEvent.click(frontendButton);

    await waitFor(() => {
      expect(screen.getByText('Projeto Frontend')).toBeInTheDocument();
      expect(screen.queryByText('Projeto Backend')).not.toBeInTheDocument();
      expect(screen.queryByText('Projeto Fullstack')).not.toBeInTheDocument();
    });
  });

  it('deve abrir modal ao clicar em um projeto', async () => {
    mockUsePortfolio.mockReturnValue({
      portfolioItems: mockPortfolioData,
      loading: false,
      error: null,
      retry: jest.fn(),
      isApiError: false,
    });

    render(<PortfolioSection />);

    const projectCard = screen.getByText('Projeto Frontend').closest('div');
    fireEvent.click(projectCard!);

    await waitFor(() => {
      expect(screen.getByText('Descrição do projeto frontend')).toBeInTheDocument();
      expect(screen.getByText('Ver no GitHub')).toBeInTheDocument();
      expect(screen.getByText('Ver ao Vivo')).toBeInTheDocument();
    });
  });

  it('deve fechar modal ao clicar no botão X', async () => {
    mockUsePortfolio.mockReturnValue({
      portfolioItems: mockPortfolioData,
      loading: false,
      error: null,
      retry: jest.fn(),
      isApiError: false,
    });

    render(<PortfolioSection />);

    // Abrir modal
    const projectCard = screen.getByText('Projeto Frontend').closest('div');
    fireEvent.click(projectCard!);

    await waitFor(() => {
      expect(screen.getByText('Descrição do projeto frontend')).toBeInTheDocument();
    });

    // Fechar modal
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Descrição do projeto frontend')).not.toBeInTheDocument();
    });
  });

  it('deve mostrar categorias disponíveis', () => {
    mockUsePortfolio.mockReturnValue({
      portfolioItems: mockPortfolioData,
      loading: false,
      error: null,
      retry: jest.fn(),
      isApiError: false,
    });

    render(<PortfolioSection />);

    expect(screen.getByText('all')).toBeInTheDocument();
    expect(screen.getByText('frontend')).toBeInTheDocument();
    expect(screen.getByText('backend')).toBeInTheDocument();
    expect(screen.getByText('fullstack')).toBeInTheDocument();
  });

  it('deve mostrar tecnologias limitadas nos cards', () => {
    mockUsePortfolio.mockReturnValue({
      portfolioItems: mockPortfolioData,
      loading: false,
      error: null,
      retry: jest.fn(),
      isApiError: false,
    });

    render(<PortfolioSection />);

    // Projeto Frontend tem 3 tecnologias - deve mostrar todas
    expect(screen.getAllByText('React')).toHaveLength(2); // Frontend e Fullstack
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('CSS')).toBeInTheDocument();
  });

  it('deve mostrar links corretos no modal', async () => {
    mockUsePortfolio.mockReturnValue({
      portfolioItems: mockPortfolioData,
      loading: false,
      error: null,
      retry: jest.fn(),
      isApiError: false,
    });

    render(<PortfolioSection />);

    // Abrir modal do projeto frontend
    const projectCard = screen.getByText('Projeto Frontend').closest('div');
    fireEvent.click(projectCard!);

    await waitFor(() => {
      const githubLink = screen.getByText('Ver no GitHub').closest('a');
      const liveLink = screen.getByText('Ver ao Vivo').closest('a');
      
      expect(githubLink).toHaveAttribute('href', 'https://github.com/test/frontend');
      expect(liveLink).toHaveAttribute('href', 'https://frontend.example.com');
    });
  });

  it('deve lidar com projeto sem liveUrl', async () => {
    mockUsePortfolio.mockReturnValue({
      portfolioItems: mockPortfolioData,
      loading: false,
      error: null,
      retry: jest.fn(),
      isApiError: false,
    });

    render(<PortfolioSection />);

    // Abrir modal do projeto backend (sem liveUrl)
    const projectCard = screen.getByText('Projeto Backend').closest('div');
    fireEvent.click(projectCard!);

    await waitFor(() => {
      expect(screen.getByText('Ver no GitHub')).toBeInTheDocument();
      expect(screen.queryByText('Ver ao Vivo')).not.toBeInTheDocument();
    });
  });
}); 