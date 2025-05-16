import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
import React, { useState } from 'react'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
  
  interface WelcomeProps {
    fullname: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';
  
  export const WelcomeEmail = ({
    fullname,
  }: WelcomeProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          Center for Career and Entrepreneurship Development.
        </Preview>
        <Container style={container}>
          <Img
            src={`https://cced.unila.ac.id/assets/media/logos/logo-1-sticky.webp`}
            width="320"
            height="100"
            alt="Koala"
            style={logo}
          />
          <Text style={paragraph}>Halo {fullname},</Text>
          <Text style={paragraph}>
            Tekan tombol dibawah ini untuk konfirmasi lupa password.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href="https://getkoala.com">
              Konfirmasi
            </Button>
          </Section>
          <Text style={paragraph}>
            Hormat Kami,
            <br />
            CCED Universitas Lampung
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            470 Noor Ave STE B #1148, South San Francisco, CA 94080
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  WelcomeEmail.PreviewProps = {
    fullname: 'Ujang',
  } as WelcomeProps;
  
  export default WelcomeEmail;
  
  const main = {
    backgroundColor: '#ffffff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
  };
  
  const logo = {
    margin: '0 auto',
  };
  
  const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
  };
  
  const btnContainer = {
    textAlign: 'center' as const,
  };
  
  const button = {
    backgroundColor: '#5F51E8',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
  };
  
  const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
  };
  
  const footer = {
    color: '#8898aa',
    fontSize: '12px',
  };
  