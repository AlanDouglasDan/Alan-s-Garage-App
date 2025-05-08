module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
        },
      ],
      [
        'module-resolver',
        {
          root: ['src'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@src': './src',
            '@store': './src/store',
            '@http': './src/http',
            '@providers': './src/providers',
          },
          extensions: ['.tsx', '.ts', 'json'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
