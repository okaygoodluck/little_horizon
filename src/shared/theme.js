import { Platform } from 'react-native';

export const Colors = {
  background: '#FDFCFB', // Tom pastel extremamente suave (bege quase branco)
  surface: '#FFFFFF', // Cards e elementos que saltam
  primary: '#5D9CEC', // Azul suave, acolhedor e premium
  secondary: '#FFB6B9', // Pêssego / Rosa suave
  success: '#48C774', // Verde calmo
  warning: '#FFDD57', // Amarelo
  error: '#FF6B6B', // Vermelho não agressivo
  textPrimary: '#2D3436', // Cinza escuro elegante
  textSecondary: '#636E72', // Cinza médio
  textTertiary: '#B2BEC3', // Cinza claro para hints
  border: '#DFE6E9',
};

export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const Border = {
  radius_s: 8,
  radius_m: 16,
  radius_l: 24,
  radius_pill: 9999,
};

// Sombras premium (Glassmorphism sutil / Soft shadow)
export const Shadows = {
  soft: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
    },
    android: {
      elevation: 3,
    },
    web: {
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    }
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
    },
    android: {
      elevation: 6,
    },
    web: {
      boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.08)',
    }
  }),
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textTertiary,
  },
};
