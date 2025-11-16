import { defineConfig } from '@figma/code-connect';

export default defineConfig({
    components: [
        {
            figmaComponent: 'Button',
            source: './src/components/button/Button.codeconnect.tsx',
        },
        {
            figmaComponent: 'Textfield',
            source: './src/components/textfield/Textfield.codeconnect.tsx',
        },
    ],
    include: ['src/**/*.codeconnect.tsx'],
    exclude: ['node_modules'],
});
