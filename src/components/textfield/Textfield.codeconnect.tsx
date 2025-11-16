import figma from '@figma/code-connect/react';
// @ts-ignore
import Textfield from './Textfield';

figma.connect(
    Textfield,
    'https://www.figma.com/file/xGTfXooDmNwkKcrDJVWPdG/Code-connect?node-id=12-41',
    {
        example: (props: { label: string; variant: 'Enabled' | 'Disabled' | 'Focused' }) => (
            <Textfield
                label={props.label}
                variant={props.variant}
            />
        ),
        props: {
            label: figma.string('Label'),
            variant: figma.enum('Variant', {
                Enabled: 'Enabled',
                Disabled: 'Disabled',
                Focused: 'Focused',
            }),
        },
    }
);