import * as React from 'react';
import Button from './components/button/Button';
import Textfield from './components/textfield/Textfield';

export default function App() {
  const [textfieldValue, setTextfieldValue] = React.useState('Sample text');

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>React Figma Code Connect - Component Preview</h1>
        <p style={styles.subtitle}>Preview of components connected to Figma design tokens</p>
      </header>

      <main style={styles.main}>
        {/* Button Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Button Component</h2>
          <div style={styles.componentGrid}>
            <div style={styles.componentCard}>
              <h3 style={styles.variantTitle}>Enabled</h3>
              <Button label="Click Me" variant="Enabled" />
            </div>
            <div style={styles.componentCard}>
              <h3 style={styles.variantTitle}>Hover</h3>
              <Button label="Hover Me" variant="Hover" />
            </div>
            <div style={styles.componentCard}>
              <h3 style={styles.variantTitle}>Disabled</h3>
              <Button label="Disabled" variant="Disabled" />
            </div>
          </div>

          <div style={styles.componentGrid}>
            <div style={styles.componentCard}>
              <h3 style={styles.variantTitle}>Small</h3>
              <Button label="Small Button" variant="Enabled" size="Small" />
            </div>
            <div style={styles.componentCard}>
              <h3 style={styles.variantTitle}>Medium</h3>
              <Button label="Medium Button" variant="Enabled" size="Medium" />
            </div>
            <div style={styles.componentCard}>
              <h3 style={styles.variantTitle}>Large</h3>
              <Button label="Large Button" variant="Enabled" size="Large" />
            </div>
          </div>

          {/* Button with Design Tokens from tokens.json */}
          <div style={styles.componentCard}>
            <h3 style={styles.variantTitle}>Using Design Tokens (from tokens.json)</h3>
            <p style={styles.description}>
              These buttons automatically use design tokens from tokens.json
            </p>
            <div style={styles.buttonRow}>
              <Button
                label="Primary Button"
                variant="Enabled"
              />
              <Button
                label="Hover State"
                variant="Hover"
              />
              <Button
                label="Disabled Button"
                variant="Disabled"
              />
            </div>
          </div>

          {/* Button with Custom Design Token Props */}
          <div style={styles.componentCard}>
            <h3 style={styles.variantTitle}>Custom Design Token Overrides</h3>
            <p style={styles.description}>
              These buttons override design tokens with custom values from Figma
            </p>
            <div style={styles.buttonRow}>
              <Button
                label="Custom Background"
                variant="Enabled"
                backgroundColor="{color.action.control.default}"
              />
              <Button
                label="Custom Border Radius"
                variant="Enabled"
                borderRadius="{radius.button.base}"
              />
              <Button
                label="Custom Padding"
                variant="Enabled"
                padding="12px 32px"
              />
            </div>
          </div>
        </section>

        {/* Textfield Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Textfield Component</h2>
          <div style={styles.componentGrid}>
            <div style={styles.componentCard}>
              <h3 style={styles.variantTitle}>Enabled</h3>
              <Textfield
                text={textfieldValue}
                variant="Enabled"
                placeholder="Enter text here..."
                onChange={(e) => setTextfieldValue(e.target.value)}
              />
            </div>
            <div style={styles.componentCard}>
              <h3 style={styles.variantTitle}>Focused</h3>
              <Textfield
                text={textfieldValue}
                variant="Focused"
                placeholder="Focused state"
                onChange={(e) => setTextfieldValue(e.target.value)}
              />
            </div>
            <div style={styles.componentCard}>
              <h3 style={styles.variantTitle}>Disabled</h3>
              <Textfield
                text={textfieldValue}
                variant="Disabled"
                placeholder="Disabled"
              />
            </div>
          </div>

          {/* Textfield with Design Tokens from tokens.json */}
          <div style={styles.componentCard}>
            <h3 style={styles.variantTitle}>Using Design Tokens (from tokens.json)</h3>
            <p style={styles.description}>
              These textfields automatically use design tokens from tokens.json
            </p>
            <div style={styles.inputRow}>
              <Textfield
                text={textfieldValue}
                variant="Enabled"
                placeholder="Enter text here..."
                onChange={(e) => setTextfieldValue(e.target.value)}
              />
              <Textfield
                text={textfieldValue}
                variant="Focused"
                placeholder="Focused state..."
                onChange={(e) => setTextfieldValue(e.target.value)}
              />
              <Textfield
                text={textfieldValue}
                variant="Disabled"
                placeholder="Disabled state..."
              />
            </div>
          </div>

          {/* Textfield with Custom Design Token Overrides */}
          <div style={styles.componentCard}>
            <h3 style={styles.variantTitle}>Custom Design Token Overrides</h3>
            <p style={styles.description}>
              These textfields override design tokens with custom values from Figma
            </p>
            <div style={styles.inputRow}>
              <Textfield
                text={textfieldValue}
                variant="Enabled"
                backgroundColor="{_colors.primitive.base.white}"
                borderColor="{color.border.focus}"
                onChange={(e) => setTextfieldValue(e.target.value)}
              />
              <Textfield
                text={textfieldValue}
                variant="Enabled"
                borderRadius="{radius.input.base}"
                padding="16px 24px"
                onChange={(e) => setTextfieldValue(e.target.value)}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#212529',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6c757d',
    margin: '0',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '24px',
    borderBottom: '2px solid #e9ecef',
    paddingBottom: '12px',
  },
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  componentCard: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #dee2e6',
  },
  variantTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  description: {
    fontSize: '12px',
    color: '#6c757d',
    marginBottom: '16px',
    fontStyle: 'italic',
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
};

