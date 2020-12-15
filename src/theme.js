import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#000000',
    textSecondary: '#808080',
    appBar: '#9697a8',
    appBarText: '#282829',
    primary: '#f5f5f5',
    backdrop: '#d5d5dd',
    buttonText: 'white',
  },
  fontSizes: {
    body: 14,
    subheading: 18,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
