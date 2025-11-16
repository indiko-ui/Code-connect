import figma from '@figma/code-connect/react';
import Button from './Button';

// Replace this URL with your actual Figma component URL
figma.connect(
    // 'https://www.figma.com/file/YOUR_FILE_ID?node-id=YOUR_NODE_ID'
    Button,
    'https://www.figma.com/file/xGTfXooDmNwkKcrDJVWPdG/Code-connect?node-id=0:1',
    {
        example: (props: {
            label: string;
            variant: 'Enabled' | 'Disabled' | 'Hover';
            backgroundColor?: string;
            textColor?: string;
            borderColor?: string;
            borderRadius?: string;
            padding?: string;
            fontSize?: string;
        }) => (
            <Button
                label={props.label}
                variant={props.variant}
                backgroundColor={props.backgroundColor}
                textColor={props.textColor}
                borderColor={props.borderColor}
                borderRadius={props.borderRadius}
                padding={props.padding}
                fontSize={props.fontSize}
            />
        ),
        props: {
            label: figma.string('Label'),
            variant: figma.enum('Variant', {
                Enabled: 'Enabled',
                Disabled: 'Disabled',
                Hover: 'Hover',
            }),
            backgroundColor: figma.string('Background'),
            textColor: figma.string('Text'),
            borderColor: figma.string('Border'),
            borderRadius: figma.string('Border Radius'),
            padding: figma.string('Padding'),
            fontSize: figma.string('Font Size'),
        },
    }
);