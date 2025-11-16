import tokensData from '../Token/tokens.json';

type TokenValue = string | number;
const visitedRefs = new Set<string>();

function resolveTokenPath(obj: any, path: string[]): any {
    let current: any = obj;
    for (const key of path) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return null;
        }
    }
    return current;
}

function getTokenValue(refPath: string): TokenValue {
    // Handle token references like {color.action.control.default} or {_colors.primitive.base.white}
    if (refPath.startsWith('{') && refPath.endsWith('}')) {
        const path = refPath.slice(1, -1);
        if (visitedRefs.has(path)) {
            console.warn(`Circular reference detected: ${path}`);
            return '';
        }
        visitedRefs.add(path);
        
        const parts = path.split('.');
        let valueObj: any = null;
        
        // Determine the namespace based on the first part
        if (parts[0] === '_colors') {
            // _colors.primitive.base.white -> Primitive/Core._colors.primitive.base.white
            const [_, ...rest] = parts;
            const primitivePath = ['Primitive', 'Core', '_colors', ...rest];
            valueObj = resolveTokenPath(tokensData, primitivePath);
        } else if (parts[0] === 'color') {
            // color.action.control.default -> Styles/Colors.color.action.control.default
            const stylesColorPath = ['Styles', 'Colors', ...parts];
            valueObj = resolveTokenPath(tokensData, stylesColorPath);
        } else if (parts[0] === 'radius') {
            // radius.button.base -> Styles/Radius.radius.button.base
            const stylesRadiusPath = ['Styles', 'Radius', ...parts];
            valueObj = resolveTokenPath(tokensData, stylesRadiusPath);
        } else if (parts[0] === 'space') {
            // space.element.lg -> Styles/Space.space.element.lg
            const stylesSpacePath = ['Styles', 'Space', ...parts];
            valueObj = resolveTokenPath(tokensData, stylesSpacePath);
        } else if (parts[0] === 'opacity') {
            // opacity.disabled -> Styles/Opacity.opacity.disabled
            const stylesOpacityPath = ['Styles', 'Opacity', ...parts];
            valueObj = resolveTokenPath(tokensData, stylesOpacityPath);
        } else if (parts[0] === 'border') {
            // border.input.default -> Styles/Border.border.input.default
            const stylesBorderPath = ['Styles', 'Border', ...parts];
            valueObj = resolveTokenPath(tokensData, stylesBorderPath);
        } else if (parts[0] === 'borderWidth') {
            // borderWidth.default -> Styles/Border.borderWidth.default
            const stylesBorderWidthPath = ['Styles', 'Border', ...parts];
            valueObj = resolveTokenPath(tokensData, stylesBorderWidthPath);
        } else if (parts[0] === 'tcb') {
            // tcb.ui.body.lg.base -> Styles/Typography.tcb.ui.body.lg.base
            const stylesTypographyPath = ['Styles', 'Typography', ...parts];
            valueObj = resolveTokenPath(tokensData, stylesTypographyPath);
        } else if (parts[0] === 'fontSize' || parts[0] === 'fontFamilies' || parts[0] === 'fontWeights' || parts[0] === 'lineHeights' || parts[0] === 'letterSpacing') {
            // Primitive/Core tokens
            const primitivePath = ['Primitive', 'Core', ...parts];
            valueObj = resolveTokenPath(tokensData, primitivePath);
        } else {
            // Try direct path first
            valueObj = resolveTokenPath(tokensData, parts);
        }
        
        visitedRefs.delete(path);
        
        if (valueObj && typeof valueObj === 'object' && 'value' in valueObj) {
            const value = valueObj.value;
            // Recursively resolve if it's another reference
            if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
                return getTokenValue(value);
            }
            return value;
        }
        
        return '';
    }
    
    const parts = refPath.split('.');
    const valueObj = resolveTokenPath(tokensData, parts);
    
    if (valueObj && typeof valueObj === 'object' && 'value' in valueObj) {
        const value = valueObj.value;
        // Recursively resolve if it's a reference
        if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
            return getTokenValue(value);
        }
        return value;
    }
    
    return valueObj ?? '';
}

function getToken(path: string): TokenValue {
    try {
        // Handle paths with slashes like "Components/Buttons.components.button.radius"
        const pathParts = path.split('.');
        const firstPart = pathParts[0];
        let actualPath: string[];
        
        // Check if first part contains a slash
        if (firstPart.includes('/')) {
            const [namespace, ...rest] = firstPart.split('/');
            actualPath = [namespace, ...rest, ...pathParts.slice(1)];
        } else {
            actualPath = pathParts;
        }
        
        const value = resolveTokenPath(tokensData, actualPath);
        if (value && typeof value === 'object' && 'value' in value) {
            const tokenValue = value.value;
            if (typeof tokenValue === 'string' && tokenValue.startsWith('{') && tokenValue.endsWith('}')) {
                return getTokenValue(tokenValue);
            }
            return tokenValue;
        }
        console.warn(`Token not found: ${path}`);
        return '';
    } catch (error) {
        console.error(`Error resolving token ${path}:`, error);
        return '';
    }
}

// Button Tokens
export const buttonTokens = {
    radius: (getToken('Components/Buttons.components.button.radius') as string) || '{radius.button.base}',
    primary: {
        textColor: {
            enabled: (getToken('Components/Buttons.components.button.primary.textColor.enabled') as string) || '{color.text.inverse}',
            disabled: (getToken('Components/Buttons.components.button.primary.textColor.disabled') as string) || '{color.text.disabled}',
        },
        background: {
            enabled: (getToken('Components/Buttons.components.button.primary.background.enabled') as string) || '{color.action.control.default}',
            focus: (getToken('Components/Buttons.components.button.primary.background.focus') as string) || '{color.action.control.focus}',
            pressed: (getToken('Components/Buttons.components.button.primary.background.pressed') as string) || '{color.action.control.pressed}',
            disabled: (getToken('Components/Buttons.components.button.primary.background.disabled') as string) || '{color.action.control.disabled}',
        },
    },
    padding: {
        x: {
            md: (getToken('Components/Buttons.components.button.padding.x.md') as string) || '{space.section.xl}',
        },
        y: {
            md: (getToken('Components/Buttons.components.button.padding.y.md') as string) || '{space.component.lg}',
        },
    },
    text: {
        textColor: {
            enabled: (getToken('Components/Buttons.components.button.text.textColor.enabled') as string) || '{color.action.control.default}',
            disabled: (getToken('Components/Buttons.components.button.text.textColor.disabled') as string) || '{color.text.disabled}',
        },
    },
    typography: getToken('Components/Buttons.components.button.text.md') || '{tcb.ui.body.lg.base}',
};

// Opacity Tokens
export const opacityTokens = {
    disabled: getToken('Styles/Opacity.opacity.disabled') as string | number,
};

// Textfield Tokens
export const textfieldTokens = {
    background: {
        enabled: (getToken('Components/Textfield.components.textfield.background.enabled') as string) || '{_colors.primitive.base.white}',
        disabled: (getToken('Components/Textfield.components.textfield.background.disabled') as string) || '{_colors.primitive.neutral.200}',
    },
    textColor: {
        enabled: (getToken('Components/Textfield.components.textfield.textColor.enabled') as string) || '{color.text.secondary}',
        fill: (getToken('Components/Textfield.components.textfield.textColor.fill') as string) || '{color.text.primary}',
        disabled: (getToken('Components/Textfield.components.textfield.textColor.disabled') as string) || '{color.text.disabled}',
    },
    borderColor: {
        enabled: (getToken('Components/Textfield.components.textfield.borderColor.enabled') as string) || '{color.border.default}',
        focus: (getToken('Components/Textfield.components.textfield.borderColor.focus') as string) || '{color.border.focus}',
        disabled: (getToken('Components/Textfield.components.textfield.borderColor.disabled') as string) || '{color.border.disabled}',
    },
    borderRadius: (getToken('Components/Textfield.components.textfield.borderRadius') as string) || '{radius.input.base}',
    border: {
        enabled: getToken('Components/Textfield.components.textfield.border.enabled') || '{border.input.default}',
        focus: getToken('Components/Textfield.components.textfield.border.focus') || '{border.input.focus}',
        disabled: getToken('Components/Textfield.components.textfield.border.disabled') || '{border.input.disabled}',
    },
    padding: {
        x: (getToken('Components/Textfield.components.textfield.padding.x') as string) || '{space.element.lg}',
        y: (getToken('Components/Textfield.components.textfield.padding.y') as string) || '{space.element.md}',
    },
    typography: getToken('Components/Textfield.components.textfield.text') || '{tcb.ui.body.lg.base}',
};

// Helper to convert token values to CSS values
export function tokenToPx(value: string | number): string {
    if (typeof value === 'number') {
        return `${value}px`;
    }
    if (typeof value === 'string') {
        // Check if it's a reference
        if (value.startsWith('{') && value.endsWith('}')) {
            const resolved = getTokenValue(value);
            return tokenToPx(resolved);
        }
        // If it's a number string, add px
        if (/^\d+$/.test(value)) {
            return `${value}px`;
        }
    }
    return String(value);
}

export function tokenToColor(value: string): string {
    if (!value) return '';
    // Handle references like {color.action.control.default} or {_colors.primitive.base.white}
    if (value.startsWith('{') && value.endsWith('}')) {
        return String(getTokenValue(value));
    }
    return value;
}

// Helper to get typography token values
export function getTypographyValue(typographyToken: any): {
    fontFamily?: string;
    fontWeight?: string | number;
    fontSize?: string;
    lineHeight?: string | number;
    letterSpacing?: string | number;
} {
    // Handle string references like "{tcb.ui.body.lg.base}"
    if (typeof typographyToken === 'string') {
        if (typographyToken.startsWith('{') && typographyToken.endsWith('}')) {
            const resolved = getTokenValue(typographyToken);
            // If resolved is still an object, recursively process it
            return getTypographyValue(resolved);
        }
        // If it's just a plain string, return empty
        return {};
    }
    
    if (!typographyToken || typeof typographyToken !== 'object') {
        return {};
    }

    // If it's a token object with a 'value' property, extract it
    let tokenValue = typographyToken;
    if (typographyToken.value && typeof typographyToken.value === 'object') {
        tokenValue = typographyToken.value;
    } else if (typographyToken.type === 'typography' && typographyToken.value) {
        tokenValue = typographyToken.value;
    }

    const result: any = {};
    
    if (tokenValue.fontFamily) {
        const family = typeof tokenValue.fontFamily === 'string' 
            ? tokenToColor(tokenValue.fontFamily) 
            : tokenValue.fontFamily;
        result.fontFamily = family;
    }
    
    if (tokenValue.fontWeight) {
        let weight: any = tokenValue.fontWeight;
        if (typeof weight === 'string' && (weight.startsWith('{') || weight.includes('.'))) {
            weight = getTokenValue(weight);
        }
        result.fontWeight = typeof weight === 'number' ? weight : (typeof weight === 'string' ? parseInt(weight) || 400 : 400);
    }
    
    if (tokenValue.fontSize) {
        const size = typeof tokenValue.fontSize === 'string'
            ? tokenToPx(tokenValue.fontSize)
            : tokenToPx(tokenValue.fontSize);
        result.fontSize = size;
    }
    
    if (tokenValue.lineHeight) {
        let lineHeight: any = tokenValue.lineHeight;
        if (typeof lineHeight === 'string' && (lineHeight.startsWith('{') || lineHeight.includes('.'))) {
            lineHeight = getTokenValue(lineHeight);
        }
        // Handle percentage line heights (e.g., "150%" or "1.5*100%")
        if (typeof lineHeight === 'string' && lineHeight.includes('*100%')) {
            const num = parseFloat(lineHeight.replace('*100%', '').trim());
            result.lineHeight = `${num * 100}%`;
        } else if (typeof lineHeight === 'number') {
            result.lineHeight = lineHeight;
        } else {
            result.lineHeight = lineHeight;
        }
    }
    
    if (tokenValue.letterSpacing) {
        let letterSpacing: any = tokenValue.letterSpacing;
        if (typeof letterSpacing === 'string' && (letterSpacing.startsWith('{') || letterSpacing.includes('.'))) {
            letterSpacing = getTokenValue(letterSpacing);
        }
        // Handle percentage letter spacing (e.g., "0*100%" or "-0.01*100%")
        if (typeof letterSpacing === 'string' && letterSpacing.includes('*100%')) {
            const num = parseFloat(letterSpacing.replace('*100%', '').trim());
            result.letterSpacing = `${num * 100}%`;
        } else {
            result.letterSpacing = letterSpacing;
        }
    }
    
    return result;
}

// Helper to get border token values
export function getBorderValue(borderToken: any): {
    color?: string;
    width?: string;
    style?: string;
} {
    // Handle string references like "{border.input.default}"
    if (typeof borderToken === 'string' && borderToken.startsWith('{') && borderToken.endsWith('}')) {
        const resolved = getTokenValue(borderToken);
        return getBorderValue(resolved);
    }
    
    if (!borderToken || typeof borderToken !== 'object') {
        return {};
    }

    // If it's a token object with a 'value' property, extract it
    let tokenValue = borderToken;
    if (borderToken.value && typeof borderToken.value === 'object') {
        tokenValue = borderToken.value;
    }

    const result: any = {};
    
    if (tokenValue.color) {
        result.color = tokenToColor(String(tokenValue.color));
    }
    
    if (tokenValue.width) {
        result.width = tokenToPx(tokenValue.width);
    }
    
    if (tokenValue.style) {
        result.style = String(tokenValue.style);
    }
    
    return result;
}

