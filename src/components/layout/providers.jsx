'use client';
import ThemeProvider from './ThemeToggle/theme-provider';
export default function Providers({ children }) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {children}
      </ThemeProvider>
    </>
  );
}
