import * as React from 'react';
import { buttonTokens, tokenToPx, tokenToColor, getTypographyValue, opacityTokens } from '../../tokens';

export interface ButtonProps {
    label?: string;
    variant?: 'Enabled' | 'Disabled' | 'Hover';
    size?: 'Small' | 'Medium' | 'Large';
    disabled?: boolean;
    children?: React.ReactNode;
    // Design token props from Figma (strings from Figma properties)
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: string; // Can be "4px", "8px", etc.
    padding?: string; // Can be "8px 16px", "12px 24px", etc.
    fontSize?: string; // Can be "14px", "16px", etc.
}

export default function Button({
    label,
    variant = 'Enabled',
    size = 'Medium',
    disabled = false,
    children,
    backgroundColor,
    textColor,
    borderColor,
    borderRadius,
    padding,
    fontSize,
}: ButtonProps) {
    // Use design tokens from tokens.json if provided, otherwise fallback to Figma props or defaults
    const getBackgroundColor = () => {
        if (backgroundColor) return tokenToColor(backgroundColor);
        if (variant === 'Disabled') return tokenToColor(buttonTokens.primary.background.disabled);
        if (variant === 'Hover') return tokenToColor(buttonTokens.primary.background.pressed);
        return tokenToColor(buttonTokens.primary.background.enabled);
    };

    const getTextColor = () => {
        if (textColor) return tokenToColor(textColor);
        if (variant === 'Disabled') return tokenToColor(buttonTokens.primary.textColor.disabled);
        return tokenToColor(buttonTokens.primary.textColor.enabled);
    };

    const getBorderColor = () => {
        if (borderColor) return tokenToColor(borderColor);
        return 'transparent';
    };

    const getBorderRadius = () => {
        if (borderRadius) return tokenToPx(borderRadius);
        return tokenToPx(buttonTokens.radius);
    };

    const getPadding = () => {
        if (padding) return padding;
        const paddingX = tokenToPx(buttonTokens.padding.x.md);
        const paddingY = tokenToPx(buttonTokens.padding.y.md);
        return `${paddingY} ${paddingX}`;
    };

    const getFontSize = () => {
        if (fontSize) return tokenToPx(fontSize);
        const typography = getTypographyValue(buttonTokens.typography);
        if (typography.fontSize) return typography.fontSize;
        if (size === 'Small') return '14px';
        if (size === 'Large') return '18px';
        return '16px';
    };

    // Get typography styles from tokens
    const typography = getTypographyValue(buttonTokens.typography);

    const baseStyles: React.CSSProperties = {
        padding: getPadding(),
        fontSize: getFontSize(),
        fontFamily: typography.fontFamily || 'inherit',
        fontWeight: typography.fontWeight || 400,
        lineHeight: typography.lineHeight || 1.5,
        letterSpacing: typography.letterSpacing || 'normal',
        border: borderColor ? `1px solid ${getBorderColor()}` : 'none',
        borderRadius: getBorderRadius(),
        cursor: disabled || variant === 'Disabled' ? 'not-allowed' : 'pointer',
        opacity: disabled || variant === 'Disabled' ? (typeof opacityTokens.disabled === 'number' ? opacityTokens.disabled : parseFloat(String(opacityTokens.disabled)) || 0.48) : 1,
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        transition: 'background-color 0.2s, border-color 0.2s',
    };
    
    return (
        <button
        style={baseStyles}
        disabled={disabled || variant === 'Disabled'}
        onMouseEnter={(e) => {
            if (!disabled && variant !== 'Disabled') {
                e.currentTarget.style.backgroundColor = backgroundColor 
                    ? tokenToColor(backgroundColor) 
                    : tokenToColor(buttonTokens.primary.background.pressed);
            }
        }}
        onMouseLeave={(e) => {
            if (!disabled && variant !== 'Disabled') {
                e.currentTarget.style.backgroundColor = getBackgroundColor();
            }
        }}
        >
        {children || label || 'Button'}
        </button>
    );
}

