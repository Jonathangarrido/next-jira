import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'

import '../styles/globals.css'
import { darkTheme, lightTheme } from '../themes'
import { UIProvider } from '../context/ui/UIProvider'
import { EntriesProvider } from '../context/entries'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  )
}

export default MyApp
