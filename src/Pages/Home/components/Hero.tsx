import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
  id="hero"
  sx={(theme) => ({
    width: '100%',
    backgroundImage:
      theme.palette.mode === 'light'
        ? 'linear-gradient(180deg, #CEE5FD, #FFF), url(/path/to/your/image.jpg)'
        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)}), url(../../../StaticFiles/benedicto_background.jpg)`,
    backgroundSize: 'cover, 100% 20%',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'center, center',
  })}
>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
              color: '#0235AE'
            }}
          >
            Benedicto&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: '#FE5A02'
              }}
            >
              College
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
           As the preferred higher educational institution in the Asia-Pacific, Benedicto College will be a globally competitive institution and a catalyst in nation-building, creating a better quality of life and developing productive members of the society.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
           
            <Button variant="contained" color="primary" size='large'>
              Enroll Now
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        
      </Container>
    </Box>
  );
}
