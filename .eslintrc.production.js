module.exports = {
  extends: ['./eslint.config.js'],
  rules: {
    // Relaxar regras para builds de produção
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-require-imports': 'warn',
    'react-refresh/only-export-components': 'warn',
    'no-useless-escape': 'warn',
    
    // Manter apenas erros críticos
    'no-undef': 'error',
    'no-unused-vars': 'off', // Deixar apenas o do typescript-eslint
    'no-console': 'off',
  },
  
  // Configurações específicas para testes
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.test.*'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
}; 