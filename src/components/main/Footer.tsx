'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Copyright from '@/components/CopyRight/Copyright';
import { Toolbar } from '@mui/material';
import { sections } from "@/tools/helper"

export default function Footer() {
  
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
      <Toolbar sx={{ borderTop: 1, borderColor: 'divider',justifyContent: 'center', overflowX: 'auto'  }}>
        <Box>
          
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
        </Box>
      </Toolbar>
        <Copyright />
      </Container>
    </Box>
  );
}
