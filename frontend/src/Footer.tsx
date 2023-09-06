import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.scss'

interface FooterProps {
  githubUrl: string
  linkedinUrl: string
  email: string
}

const Footer: React.FC<FooterProps> = ({ githubUrl, linkedinUrl, email }) => {
  const mailtoLink = `mailto:${email}`;
  return (
    <footer className="bg-dark text-light">
      <Container>
        <Row className="social-links">
            <div >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={mailtoLink}>Email</a>
            </div>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer