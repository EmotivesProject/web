import 'semantic-ui-css/semantic.min.css';

export const customViewports = {
  ipad: {
    name: 'iPad',
    styles: {
      height: '1024px',
      width: '768px',
    },
    type: 'tablet',
  },
  iPadSide: {
    name: 'iPad on the Side',
    styles: {
      height: '768px',
      width: '1024px',
    },
    type: 'tablet',
  },
  Desktop: {
    name: 'Standard Desktop',
    styles: {
      height: '1080px',
      width: '1920px',
    },
    type: 'tablet',
  },
};

export const parameters = {
  viewport: { viewports: customViewports },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}