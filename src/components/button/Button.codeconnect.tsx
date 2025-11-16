import * as React from 'react';
import figma from '@figma/code-connect/react';
import Button from './Button';

// Replace this URL with your actual Figma component URL
figma.connect(
    // 'https://www.figma.com/file/YOUR_FILE_ID?node-id=YOUR_NODE_ID'
    Button,
    'https://www.figma.com/file/xGTfXooDmNwkKcrDJVWPdG/Code-connect?node-id=0:1',
    {
        example: (props: { label: string; variant: 'Enabled' | 'Disabled' | 'Hover' }) => (
            <Button
                label={props.label}
                variant={props.variant}
            />
        ),
        props: {
            label: figma.string('Label'),
            variant: figma.enum('Variant', {
                Enabled: 'Enabled',
                Disabled: 'Disabled',
                Hover: 'Hover',
            }),
        },
    }
);