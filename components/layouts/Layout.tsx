import { Box } from '@mui/material'
import Head from 'next/head'
import { FC } from 'react'
import { Navbar } from '../ui'
import { Sidebar } from '../ui/Sidebar'

interface Props {
  title?: string
}

export const Layout: FC<Props> = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <Box sx={{ padding: '10px 20px' }}>{children}</Box>
    </Box>
  )
}
