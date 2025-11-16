import figma from '@figma/code-connect/react';
// @ts-ignore
import Textfield from './Textfield';

figma.connect(
    Textfield,
    'https://www.figma.com/file/xGTfXooDmNwkKcrDJVWPdG/Code-connect?node-id=12-41',
    {
        props: {
            text: figma.string('Text'),
            variant: figma.enum('Variant', {
                Enabled: 'Enabled',
                Disabled: 'Disabled',
                Focused: 'Focused',
            }),
            backgroundColor: figma.string('Background'),
            textColor: figma.string('Text'),
            borderColor: figma.string('Border'),
            borderRadius: figma.string('Border Radius'),
            padding: figma.string('Padding'),
            fontSize: figma.string('Font Size'),
        },
        example: (props: {
            text: string;
            variant: 'Enabled' | 'Disabled' | 'Focused';
            backgroundColor?: string;
            textColor?: string;
            borderColor?: string;
            borderRadius?: string;
            padding?: string;
            fontSize?: string;
        }) => (
            <Textfield
                text={props.text}
                variant={props.variant}
                backgroundColor={props.backgroundColor}
                textColor={props.textColor}
                borderColor={props.borderColor}
                borderRadius={props.borderRadius}
                padding={props.padding}
                fontSize={props.fontSize}
            />
        )
    }
);