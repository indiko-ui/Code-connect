# Code-connect
1. ในโค้ดเบส ให้ติดตั้งแพ็กเกจ:

    npm install @figma/code-connect
    npx figma connect

2. สร้างไฟล์ config (figma.config.json) ใน root project เพื่อกำหนด include, exclude, parser (React / Swift / compose) และ path alias ต่าง ๆ.
3. สำหรับแต่ละคอมโพเนนต์ในโค้ด ให้เขียนไฟล์ mapping เช่น
    import { Button } from './Button';
    figma.connect(Button, 'https://www.figma.com/file/xyz?node-id=...', {
    props: {
        label: figma.string('Button label'),
        disabled: figma.boolean('Disabled'),
        size: figma.enum('Size', { Large: 'large', Medium: 'medium', Small: 'small' }),
    },
    example: ({ label, disabled, size }) => (
        <Button size={size} disabled={disabled}>{label}</Button>
    ),
    });
5. เมื่อพร้อมแล้ว Publish mappings ให้ Figma ใช้งานได้ (คำสั่ง CLI หรือ push ผ่าน UI แล้ว)
6. ตรวจสอบใน Dev Mode ของ Figma ว่า component ที่เชื่อมโยงแล้วแสดงโค้ดจริง และค่าสมบูรณ์ (props/variants) ถูกต้อง