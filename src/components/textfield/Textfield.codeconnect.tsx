import figma from '@figma/code-connect/react';
// @ts-ignore
import Textfield from './Textfield';

figma.connect(
    Textfield,
    'https://www.figma.com/file/xGTfXooDmNwkKcrDJVWPdG/Code-connect?node-id=12-41',
    {
        example: (props: { text: string; variant: 'Enabled' | 'Disabled' | 'Focused' }) => (
            <Textfield
                text={props.text}
                variant={props.variant}
            />
        ),
        props: {
            text: figma.string('Text'),
            variant: figma.enum('Variant', {
                Enabled: 'Enabled',
                Disabled: 'Disabled',
                Focused: 'Focused',
            }),
        },
    }
);