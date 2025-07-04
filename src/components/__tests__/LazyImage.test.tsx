import React from 'react';
import { render } from '@testing-library/react';
import LazyImage from '../LazyImage';

// Mock do react-intersection-observer
jest.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: true,
  }),
}));

describe('LazyImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o contêiner com classe correta', () => {
    const { container } = render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Imagem de teste"
        className="test-class"
      />
    );

    expect(container.firstChild).toHaveClass('test-class');
    expect(container.firstChild).toHaveClass('relative');
    expect(container.firstChild).toHaveClass('overflow-hidden');
  });

  it('deve mostrar placeholder inicialmente', () => {
    const { container } = render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Imagem de teste"
      />
    );

    // Verifica se o placeholder está presente
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('deve aplicar className corretamente', () => {
    const { container } = render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Imagem de teste"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
}); 