import * as React from 'react';
import { textfieldTokens, tokenToPx, tokenToColor, getTypographyValue, getBorderValue, opacityTokens } from '../../tokens';

export interface TextfieldProps {
    text?: string;
    variant?: 'Enabled' | 'Disabled' | 'Focused';
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // Design token props from Figma (strings from Figma properties)
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: string; // Can be "4px", "8px", etc.
    padding?: string; // Can be "8px 16px", "12px 24px", etc.
    fontSize?: string; // Can be "14px", "16px", etc.
}

export default function Textfield({
    text,
    variant = 'Enabled',
    placeholder = 'Enter text...',
    onChange,
    backgroundColor,
    textColor,
    borderColor,
    borderRadius,
    padding,
    fontSize,
}: TextfieldProps) {
    // Use design tokens from tokens.json if provided, otherwise fallback to Figma props or defaults
    const getBackgroundColor = () => {
        if (backgroundColor) return tokenToColor(backgroundColor);
        if (variant === 'Disabled') return tokenToColor(textfieldTokens.background.disabled);
        return tokenToColor(textfieldTokens.background.enabled);
    };

    const getTextColor = () => {
        if (textColor) return tokenToColor(textColor);
        if (variant === 'Disabled') return tokenToColor(textfieldTokens.textColor.disabled);
        if (text) return tokenToColor(textfieldTokens.textColor.fill);
        return tokenToColor(textfieldTokens.textColor.enabled);
    };

    const getBorderStyles = () => {
        if (borderColor) {
            return {
                border: `1px solid ${tokenToColor(borderColor)}`,
                borderWidth: undefined,
            };
        }
        
        let borderToken: any;
        if (variant === 'Focused') {
            borderToken = textfieldTokens.border.focus;
        } else if (variant === 'Disabled') {
            borderToken = textfieldTokens.border.disabled;
        } else {
            borderToken = textfieldTokens.border.enabled;
        }
        
        const border = getBorderValue(borderToken);
        return {
            border: border.color && border.width 
                ? `${border.width} ${border.style || 'solid'} ${border.color}`
                : `1px solid ${tokenToColor(variant === 'Focused' ? textfieldTokens.borderColor.focus : variant === 'Disabled' ? textfieldTokens.borderColor.disabled : textfieldTokens.borderColor.enabled)}`,
            borderWidth: border.width,
        };
    };

    const getBorderRadius = () => {
        if (borderRadius) return tokenToPx(borderRadius);
        return tokenToPx(textfieldTokens.borderRadius);
    };

    const getPadding = () => {
        if (padding) return padding;
        const paddingX = tokenToPx(textfieldTokens.padding.x);
        const paddingY = tokenToPx(textfieldTokens.padding.y);
        return `${paddingY} ${paddingX}`;
    };

    const getFontSize = () => {
        if (fontSize) return tokenToPx(fontSize);
        const typography = getTypographyValue(textfieldTokens.typography);
        if (typography.fontSize) return typography.fontSize;
        return '16px';
    };

    // Get typography and border styles from tokens
    const typography = getTypographyValue(textfieldTokens.typography);
    const borderStyles = getBorderStyles();

    const baseStyles: React.CSSProperties = {
        padding: getPadding(),
        fontSize: getFontSize(),
        fontFamily: typography.fontFamily || 'inherit',
        fontWeight: typography.fontWeight || 400,
        lineHeight: typography.lineHeight || 1.5,
        letterSpacing: typography.letterSpacing || 'normal',
        ...borderStyles,
        borderRadius: getBorderRadius(),
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        outline: variant === 'Focused' ? `2px solid ${tokenToColor(textfieldTokens.borderColor.focus)}40` : 'none',
        outlineOffset: variant === 'Focused' ? '2px' : '0',
        cursor: variant === 'Disabled' ? 'not-allowed' : 'text',
        opacity: variant === 'Disabled' ? (typeof opacityTokens.disabled === 'number' ? opacityTokens.disabled : parseFloat(String(opacityTokens.disabled)) || 0.48) : 1,
        transition: 'border-color 0.2s, border-width 0.2s, outline 0.2s',
        width: '100%',
        boxSizing: 'border-box',
    };

    return (
        <input
            type="text"
            value={text || ''}
            placeholder={placeholder}
            disabled={variant === 'Disabled'}
            style={baseStyles}
            readOnly={variant === 'Disabled'}
            onChange={onChange}
        />
    );
}

